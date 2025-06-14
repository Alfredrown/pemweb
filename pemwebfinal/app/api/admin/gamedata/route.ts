import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const { data, error } = await supabase
    .from("layanan")
    .select(`
      layanan_id,
      waktu_mulai_layanan,
      waktu_selesai_layanan,
      status,
      game_corner_tv_id,
      mahasiswa:mahasiswa_nim (
        nama,
        nim,
        no_telp
      )
    `)
    .is("sekretariat_room_id", null) // Ensure this is correct
    .not("game_corner_tv_id", "is", null) // Ensure this is correct
    .ilike("mahasiswa.nama", `%${search}%`) // Search by name
    .order("waktu_mulai_layanan", { ascending: false });

  if (error) {
    console.error("Error fetching data from Supabase:", error);
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 500 });
  }

  console.log("Fetched data:", data); // Log the data for debugging
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    console.log("Updating status:", { id, status }); // Debug log

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("layanan")
      .update({ status: status })
      .eq("layanan_id", id)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error); // Debug log
      return NextResponse.json(
        { 
          message: "Failed to update status", 
          error: error.message 
        }, 
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { message: "Record not found" }, 
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Status updated successfully",
        data: data 
      }, 
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error:", error); // Debug log
    return NextResponse.json(
      { 
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  // Hapus booking
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("layanan")
      .delete()
      .eq("id", id);

    if (error) {
      return NextResponse.json({ message: "Failed to delete booking", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}