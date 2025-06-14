import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, nim, phoneNumber, game, time } = body

    if (!name || !nim || !phoneNumber || !game || !time) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const { data: existingMahasiswa, error: mahasiswaError } = await supabase
      .from("mahasiswa")
      .select("*")
      .eq("nim", nim)
      .maybeSingle()

    if (mahasiswaError) {
      console.error("Error fetching mahasiswa:", mahasiswaError)
    }

    if (!existingMahasiswa) {
      const { error: insertMhsError } = await supabase.from("mahasiswa").insert([
        {
          nim: nim,
          nama: name,
          no_telp: phoneNumber,
        },
      ])

      if (insertMhsError) {
        console.error("Error inserting mahasiswa:", insertMhsError)
        return NextResponse.json(
          { message: "Failed to insert mahasiswa", error: insertMhsError },
          { status: 500 }
        )
      }
    }

    const { data: existingBooking, error: bookingError } = await supabase
      .from("layanan")
      .select("*")
      .eq("game_corner_tv_id", game)
      .eq("waktu_mulai_layanan", time)
      .maybeSingle()

    if (bookingError) {
      console.error("Error checking booking:", bookingError)
    }

    if (existingBooking) {
      return NextResponse.json(
        { message: "Slot already booked for this game and time" },
        { status: 409 }
      )
    }

    const timeStart = new Date(time)
    const timeEnd = new Date(timeStart.getTime() + 60 * 60 * 1000)

    const { error: insertLayananError } = await supabase.from("layanan").insert([
      {
        waktu_mulai_layanan: timeStart.toISOString(),
        waktu_selesai_layanan: timeEnd.toISOString(),
        mahasiswa_nim: nim,
        game_corner_tv_id: game,
        status: "ongoing",
      },
    ])

    if (insertLayananError) {
      console.error("Error inserting layanan:", insertLayananError)
      return NextResponse.json(
        { message: "Failed to save layanan", error: insertLayananError },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: "Booking successful" }, { status: 200 })
  } catch (error) {
    console.error("Unexpected error in POST /api/book:", error)
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    )
  }
}

