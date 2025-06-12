"use client"

import { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

type BookingStatus = "pending" | "ongoing" | "done";

interface Activity {
  name: string
  nim: string
  phone: string
  room: string
  timeStamp: string
  date: string
  status: BookingStatus
}

export default function Component() {
  const [activityData, setActivityData] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/sekredata")
        if (!res.ok) throw new Error("Failed to fetch data")

        const data = await res.json()
        setActivityData(Array.isArray(data) ? data : [])
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge className="bg-yellow-400 text-black rounded-full px-3 py-1">Pending</Badge>
      case "ongoing":
        return <Badge className="bg-green-500 text-white rounded-full px-3 py-1">Ongoing</Badge>
      case "done":
        return <Badge className="bg-blue-600 text-white rounded-full px-3 py-1">Done</Badge>
      default:
        return <Badge className="bg-gray-400 text-white rounded-full px-3 py-1">{status}</Badge>
    }
  }
  

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="px-6 py-8">
        <div className="mb-6 pb-8">
          <h1 className="text-[#0a80ed] text-2xl font-semibold mb-2">Activity Overview/Sekretariat</h1>
          <div className="flex items-center gap-4">
            <a href="/admin/gamedata" className="text-[#0a80ed] hover:underline text-lg font-medium">Game Corner</a>
            <a href="/admin/sekredata" className="text-[#0a80ed] hover:underline text-lg font-medium">Sekretariat</a>
          </div>

          <div className="relative my-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#61758a] w-5 h-5" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 w-full border border-[#e5e8eb] rounded-lg bg-white"
            />
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
                        <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
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
