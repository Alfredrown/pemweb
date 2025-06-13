"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type BookingStatus = "pending" | "ongoing" | "done";

interface BookingData {
  layanan_id: number;
  name: string;
  nim: string;
  phone: string;
  game: number; // tv_id
  startTime: string;
  endTime: string;
  status: BookingStatus;
}

export default function GameCornerTable() {
  const [activityData, setActivityData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = async (searchTerm = "") => {
    setLoading(true);
  
    try {
      const res = await fetch(`/api/admin/gamedata?search=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error("Failed to fetch data");
  
      const result = await res.json();
      console.log("Fetched data from backend:", result.data); // Log the data for debugging
  
      // Only map and set data if the result contains valid entries
      const mapped = result.data
        .filter((item: any) => item.mahasiswa?.nama) // Ensure only valid entries are included
        .map((item: any) => ({
          layanan_id: item.layanan_id,
          name: item.mahasiswa.nama, // No fallback to "Unknown"
          nim: item.mahasiswa.nim,
          phone: item.mahasiswa.no_telp,
          game: item.game_corner_tv_id,
          startTime: item.waktu_mulai_layanan,
          endTime: item.waktu_selesai_layanan,
          status: item.status,
        }));
  
      setActivityData(mapped); // Update state with the filtered data
    } catch (error) {
      console.error("Error fetching data:", error);
      setActivityData([]); // Clear data if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    fetchData(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "done":
        return <Badge className="bg-[#e5e8eb] text-[#61758a]">Session Ended</Badge>;
      case "ongoing":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#d0f0c0] text-black">Playing</Badge>
            <Button
              size="sm"
              className="bg-[#0a80ed] hover:bg-[#0f59d2] text-white text-xs px-3 py-1 h-6"
            >
              Done
            </Button>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#fff9c4] text-black">Waiting</Badge>
            <Button
              size="sm"
              variant="outline"
              className="text-[#0a80ed] border-[#0a80ed] hover:bg-[#e3f2fd] text-xs px-3 py-1 h-6"
            >
              Cancel
            </Button>
          </div>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="px-6 py-8">
        <h1 className="text-[#0a80ed] text-2xl font-semibold mb-2">Activity Overview/Game Corner</h1>

        <div className="flex items-center gap-4">
          <a href="/admin/gamedata" className="text-[#0a80ed] hover:underline text-lg font-medium">
            Game Corner
          </a>
          <a href="/admin/sekredata" className="text-[#0a80ed] hover:underline text-lg font-medium">
            Sekretariat
          </a>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61758a] w-4 h-4" />
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown} // Trigger search on Enter key
            className="pl-10 bg-white border-[#e5e8eb] text-[#121417] placeholder:text-[#61758a]"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a80ed] hover:bg-[#0f59d2] text-white px-4 py-2"
          >
            Search
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#e5e8eb] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f0f2f5] border-b border-[#e5e8eb]">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">Name</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">NIM</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">Phone</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">TV</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">Start</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">End</th>
                  <th className="text-left p-4 text-sm font-medium text-[#121417]">Status</th>
                </tr>
              </thead>
              <tbody>
  {loading ? (
    <tr>
      <td colSpan={7} className="p-4 text-center text-[#61758a]">
        Loading...
      </td>
    </tr>
  ) : (
    activityData.map((row) => (
      <tr key={row.layanan_id} className="border-b border-[#e5e8eb] hover:bg-[#f0f2f5]/50">
        <td className="p-4 text-sm text-[#61758a]">{row.name}</td>
        <td className="p-4 text-sm text-[#61758a]">{row.nim}</td>
        <td className="p-4 text-sm text-[#61758a]">{row.phone}</td>
        <td className="p-4 text-sm text-[#61758a]">{row.game}</td>
        <td className="p-4 text-sm text-[#61758a]">{row.startTime}</td>
        <td className="p-4 text-sm text-[#61758a]">{row.endTime}</td>
        <td className="p-4">{getStatusBadge(row.status)}</td>
      </tr>
    ))
  )}
</tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}