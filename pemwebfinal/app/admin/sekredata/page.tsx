"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type BookingStatus = "pending" | "ongoing" | "done" | string;

interface Activity {
  name: string
  nim: string
  phone: string
  room: string
  timeStamp: string
  date: string
  status: BookingStatus
  layananId: number 
}

export default function Component() {
  const [activityData, setActivityData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const fetchData = async (searchTerm = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/sekredata?search=${encodeURIComponent(searchTerm)}`)
      if (!res.ok) throw new Error("Failed to fetch data")

      const { data } = await res.json()
      console.log("Raw data from API:", data) // Debug log
      
      setActivityData(
        Array.isArray(data)
          ? data.map((item: any) => ({
              name: item.mahasiswa?.nama || "-",
              nim: item.mahasiswa?.nim || "-",
              phone: item.mahasiswa?.no_telp || "-",
              room: item.sekretariat_room_id?.toString() || "-",
              timeStamp: item.waktu_mulai_layanan
                ? new Date(item.waktu_mulai_layanan).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "-",
              date: item.waktu_mulai_layanan
                ? new Date(item.waktu_mulai_layanan).toLocaleDateString()
                : "-",
              status: item.status || "-",
              layananId: item.layanan_id,
            }))
          : []
      )
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSearch = () => {
    fetchData(search);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  const getStatusBadge = (status: string, layananId: number) => {
    switch (status.toLowerCase()) {
      case "done":
        return <Badge className="bg-[#e5e8eb] text-[#61758a]">Session Ended</Badge>;
      case "ongoing":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#d0f0c0] text-black">In Use</Badge>
            <Button
              size="sm"
              onClick={() => handleStatusUpdate(layananId, "done")}
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
              onClick={() => handleStatusUpdate(layananId, "done")}
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

  const handleStatusUpdate = async (layananId: number, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/sekredata", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: layananId,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Refresh data setelah update
      const res = await fetch("/api/admin/sekredata");
      if (res.ok) {
        const { data } = await res.json();
        setActivityData(
          Array.isArray(data)
            ? data.map((item: any) => ({
                name: item.mahasiswa?.nama || "-",
                nim: item.mahasiswa?.nim || "-",
                phone: item.mahasiswa?.no_telp || "-",
                room: item.sekretariat_room_id?.toString() || "-",
                timeStamp: item.waktu_mulai_layanan
                  ? new Date(item.waktu_mulai_layanan).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                  : "-",
                date: item.waktu_mulai_layanan
                  ? new Date(item.waktu_mulai_layanan).toLocaleDateString()
                  : "-",
                status: item.status || "-",
                layananId: item.layanan_id, // Tambahkan layanan_id untuk referensi
              }))
            : []
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  // Filter pencarian
 
  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="px-6 py-8">
        <div className="mb-6 pb-8">
          <h1 className="text-[#0a80ed] text-2xl font-semibold mb-2">Activity Overview/Sekretariat</h1>
          
          <div className="flex items-center gap-4">
            <a href="/admin/gamedata" className="text-[#0a80ed] hover:underline text-lg font-medium">Game Corner</a>
            <a href="/admin/sekredata" className="text-[#0a80ed] hover:underline text-lg font-medium">Sekretariat</a>
          </div>

          {/* Search Bar dengan Button */}
          <div className="relative my-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#61758a] w-4 h-4" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-20 py-3 w-full border border-[#e5e8eb] rounded-lg bg-white"
            />
            <Button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0a80ed] hover:bg-[#0f59d2] text-white px-4 py-2"
            >
              Search
            </Button>
          </div>

          {loading ? (
            <p className="text-[#61758a]">Loading data...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="bg-white border border-[#e5e8eb] rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#e5e8eb]">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">NIM/NIP</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Room</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e8eb]">
                    {activityData.map((item, index) => (
                      <tr key={index} className="hover:bg-[#e3f2fd] transition-colors">
                        <td className="px-6 py-4 text-sm text-[#121417]">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-[#61758a]">{item.nim}</td>
                        <td className="px-6 py-4 text-sm text-[#61758a]">{item.phone}</td>
                        <td className="px-6 py-4 text-sm text-[#61758a]">{item.room}</td>
                        <td className="px-6 py-4 text-sm text-[#61758a]">{item.timeStamp}</td>
                        <td className="px-6 py-4 text-sm text-[#61758a]">{item.date}</td>
                        <td className="px-6 py-4">{getStatusBadge(item.status, item.layananId)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}