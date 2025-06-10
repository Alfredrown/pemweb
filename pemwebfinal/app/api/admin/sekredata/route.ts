import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  // Ambil semua data booking sekre
  const { data, error } = await supabase
    .from("sekre_booking")
    .select("*, mahasiswa:nim (nama, no_telp)")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ message: "Failed to fetch data", error }, { status: 500 });
  }
  return NextResponse.json({ data }, { status: 200 });
}

export async function PATCH(req: NextRequest) {
  // Update status booking sekre (Done/Returned)
  try {
    const body = await req.json();
    const { id, status } = body; // id = id sekre_booking

    if (!id || !status) {
      return NextResponse.json({ message: "ID and status required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("sekre_booking")
      .update({ status })
      .eq("id", id);

    if (error) {
      return NextResponse.json({ message: "Failed to update status", error }, { status: 500 });
    }

    return NextResponse.json({ message: "Status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  // Hapus booking sekre
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("sekre_booking")
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