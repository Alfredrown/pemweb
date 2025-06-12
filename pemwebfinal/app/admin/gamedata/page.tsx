"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"

type BookingStatus = "pending" | "ongoing" | "done";

interface BookingData {
  layanan_id: number
  name: string
  nim: string
  phone: string
  game: number // tv_id
  startTime: string
  endTime: string
  status: BookingStatus
}

export default function GameCornerTable() {
  const [activityData, setActivityData] = useState<BookingData[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

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
        .is("sekretariat_room_id", null)
        .not("game_corner_tv_id", "is", null)
        .order("waktu_mulai_layanan", { ascending: false })

      if (error) {
        console.error("Error fetching data:", error.message)
      } else {
        const mapped = data.map((item: any) => ({
          layanan_id: item.layanan_id,
          name: item.mahasiswa.nama,
          nim: item.mahasiswa.nim,
          phone: item.mahasiswa.no_telp,
          game: item.game_corner_tv_id,
          startTime: item.waktu_mulai_layanan,
          endTime: item.waktu_selesai_layanan,
          status: item.status,
        }))
        setActivityData(mapped)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

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
            <a href="/admin/gamedata" className="text-[#0a80ed] hover:underline text-lg font-medium">Game Corner</a>
            <a href="/admin/sekredata" className="text-[#0a80ed] hover:underline text-lg font-medium">Sekretariat</a>
          </div>
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
          <Card className="bg-[#f0f2f5] border-[#e5e8eb]">
            <CardContent className="p-6">
              <div className="text-sm text-[#121417] font-medium mb-2">Currently Playing</div>
              <div className="text-3xl text-[#0a80ed] font-bold">
                {activityData.filter((d) => d.status === "ongoing").length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#f0f2f5] border-[#e5e8eb]">
            <CardContent className="p-6">
              <div className="text-sm text-[#121417] font-medium mb-2">Total Bookings</div>
              <div className="text-3xl text-[#0a80ed] font-bold">{activityData.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#61758a] w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10 bg-white border-[#e5e8eb] text-[#121417] placeholder:text-[#61758a]"
          />
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
                    <td colSpan={7} className="p-4 text-center text-[#61758a]">Loading...</td>
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
  )
}
