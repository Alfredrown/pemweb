import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    // Ambil semua data dulu tanpa filter search
    const { data: allData, error } = await supabase
      .from("layanan")
      .select(`
        layanan_id,
        waktu_mulai_layanan,
        waktu_selesai_layanan,
        status,
        sekretariat_room_id,
        mahasiswa:mahasiswa_nim (nama, nim, no_telp)
      `)
      .not("sekretariat_room_id", "is", null)
      .order("waktu_mulai_layanan", { ascending: false });

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return NextResponse.json({ message: "Failed to fetch data", error }, { status: 500 });
    }

    // Filter di JavaScript jika ada search term
    let filteredData = allData || [];
    
    if (search && search.trim() !== "") {
      filteredData = allData?.filter((item: any) => {
        const nama = item.mahasiswa?.nama?.toLowerCase() || '';
        const nim = item.mahasiswa?.nim?.toString() || '';
        const roomId = item.sekretariat_room_id?.toString() || '';
        const searchLower = search.toLowerCase().trim();
        
        return nama.includes(searchLower) || 
               nim.includes(searchLower) || 
               roomId.includes(searchLower);
      }) || [];
    }

    console.log("Search term:", search);
    console.log("Filtered data count:", filteredData.length);
    
    return NextResponse.json({ data: filteredData }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

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

    return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
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
      status: "ongoing",
    });

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