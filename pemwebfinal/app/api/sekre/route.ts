import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, nim, phoneNumber, room, time, date } = body;

    if (!name || !nim || !phoneNumber || !room || !time || !date) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Cek mahasiswa
    const { data: existingMahasiswa, error: mahasiswaError } = await supabase
      .from("mahasiswa")
      .select("*")
      .eq("nim", nim)
      .maybeSingle();

    if (mahasiswaError) {
      console.error("Error fetching mahasiswa:", mahasiswaError);
    }

    if (!existingMahasiswa) {
      const { error: insertMhsError } = await supabase.from("mahasiswa").insert([
        {
          nim: nim,
          nama: name,
          no_telp: phoneNumber,
        },
      ]);
      if (insertMhsError) {
        return NextResponse.json({ message: "Failed to insert mahasiswa", error: insertMhsError }, { status: 500 });
      }
    }

    // Cek slot ruangan
    const { data: existingBooking, error: bookingError } = await supabase
      .from("sekre_booking")
      .select("*")
      .eq("room", room)
      .eq("date", date)
      .eq("time", time)
      .maybeSingle();

    if (bookingError) {
      console.error("Error checking booking:", bookingError);
    }

    if (existingBooking) {
      return NextResponse.json({ message: "Slot already booked for this room and time" }, { status: 409 });
    }

    // Insert booking
    const { error: insertBookingError } = await supabase.from("sekre_booking").insert([
      {
        nim,
        room,
        date,
        time,
        status: "In Use",
      },
    ]);

    if (insertBookingError) {
      return NextResponse.json({ message: "Failed to save booking", error: insertBookingError }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}

export async function GET() {
  // Untuk admin: ambil semua data booking sekre
  const { data, error } = await supabase.from("sekre_booking").select("*");
  if (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}