import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  // Ambil semua data booking sekre (join ke mahasiswa dan sekretariat)
  const { data, error } = await supabase
    .from("layanan")
    .select(`
      layanan_id,
      waktu_mulai_layanan,
      waktu_selesai_layanan,
      status,
      mahasiswa:mahasiswa_nim (nama, nim, no_telp),
      sekretariat:sekretariat_room_id (room_id, nama_ruangan)
    `)
    .not("sekretariat_room_id", "is", null)
    .order("waktu_mulai_layanan", { ascending: false });

  if (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 500 });
  }
  
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  // Update status booking sekre (Done/Returned)
  try {
    const body = await req.json();
    const { id, status } = body; // id = layanan_id

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("layanan")
      .update({ status })
      .eq("layanan_id", id);

    if (error) {
      return NextResponse.json({ message: "Failed to update status", error }, { status: 500 });
    }

    const { nim, room_id, waktu_mulai_layanan, waktu_selesai_layanan } = body;

    const { error: insertBookingError } = await supabase.from("layanan").insert([
      {
        mahasiswa_nim: nim,
        sekretariat_room_id: room_id,
        waktu_mulai_layanan,
        waktu_selesai_layanan,
        status: "ongoing",
      },
    ]);

    if (insertBookingError) {
      // Tampilkan error detail di terminal/server log
      console.error("Error inserting booking:", insertBookingError);
      // Kirim error detail ke frontend (bisa dilihat di Network tab)
      return NextResponse.json(
        { message: "Failed to save booking", error: insertBookingError },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("POST /api/sekre called");
  try {
    const body = await req.json();
    const { name, nim, phoneNumber, room_id, waktu_mulai_layanan, waktu_selesai_layanan } = body;

    if (!name || !nim || !phoneNumber || !room_id || !waktu_mulai_layanan || !waktu_selesai_layanan) {
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
      .from("layanan")
      .select("*")
      .eq("sekretariat_room_id", room_id)
      .eq("waktu_mulai_layanan", waktu_mulai_layanan)
      .maybeSingle();

    if (bookingError) {
      console.error("Error checking booking:", bookingError);
    }

    if (existingBooking) {
      return NextResponse.json({ message: "Slot already booked for this room and time" }, { status: 409 });
    }

    console.log("Booking sekre insert data:", {
      mahasiswa_nim: nim,
      sekretariat_room_id: room_id,
      waktu_mulai_layanan,
      waktu_selesai_layanan,
      status: "In Use",
    });

    const { error: insertBookingError } = await supabase.from("layanan").insert([
      {
        mahasiswa_nim: nim,
        sekretariat_room_id: room_id,
        waktu_mulai_layanan,
        waktu_selesai_layanan,
        status: "In Use",
      },
    ]);

    if (insertBookingError) {
      console.error("Error inserting booking:", insertBookingError);
      return NextResponse.json({ message: "Failed to save booking", error: insertBookingError }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking successful" }, { status: 200 });
  
  } catch (error) {
    console.error("Unexpected error in POST /api/sekre:", error);
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Hapus booking sekre
  try {
    const body = await req.json();
    const { id } = body; // id = layanan_id

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("layanan")
      .delete()
      .eq("layanan_id", id);

    if (error) {
      return NextResponse.json({ message: "Failed to delete booking", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}