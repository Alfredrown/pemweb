import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase
      .from("layanan")
      .select(`
        game_corner_tv_id,
        jam:game_corner(jam),
        status
      `);

    if (error) {
      console.error("Error fetching joined data:", error);
      return NextResponse.json(
        { message: "Failed to fetch joined data", error },
        { status: 500 }
      );
    }

    // Jika tabel layanan kosong, kembalikan semua slot waktu sebagai "available"
    const timeSlotStatuses: { [key: number]: { [key: string]: string } } = {};
    if (!data || data.length === 0) {
      for (let gameId = 1; gameId <= 6; gameId++) {
        timeSlotStatuses[gameId] = {};
        ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].forEach((slot) => {
          timeSlotStatuses[gameId][slot] = "available";
        });
      }
    } else {
      data.forEach((entry) => {
        const tvId = entry.game_corner_tv_id;
        const timeSlot = entry.jam;
        const status = entry.status || "available";

        if (!timeSlotStatuses[tvId]) {
          timeSlotStatuses[tvId] = {};
        }

        timeSlotStatuses[tvId][timeSlot as unknown as string] = status;
      });
    }

    return NextResponse.json({ timeSlotStatuses }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET /api/layanan:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}