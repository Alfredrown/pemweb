import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, User } from "lucide-react"

export default function Component() {
  const activityData = [
    {
      name: "Sabita Khansa Dewi",
      nim: "235150201111025",
      phone: "081774928336",
      game: "1",
      timeSlot: "08:00 AM",
      date: "May 19, 2025",
      status: "Session Ended",
    },
    {
      name: "Alfredo Radhinal Mukhtar",
      nim: "235150201111021",
      phone: "081273469229",
      game: "2",
      timeSlot: "08:00 AM",
      date: "May 19, 2025",
      status: "Session Ended",
    },
    {
      name: "Sandhika Rizqi Ramadhan",
      nim: "235150200111021",
      phone: "081733927583",
      game: "3",
      timeSlot: "08:00 AM",
      date: "May 19, 2025",
      status: "Session Ended",
    },
    {
      name: "Githapati Prabuja",
      nim: "235150201111053",
      phone: "081270244300",
      game: "4",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Playing",
    },
    {
      name: "Exel Boy Alfanso",
      nim: "235150201111019",
      phone: "081922467228",
      game: "5",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Playing",
    },
    {
      name: "Nova Kurnia Putri",
      nim: "235150701111027",
      phone: "087752682222",
      game: "6",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Playing",
    },
    {
      name: "Mutiara Shabrina",
      nim: "235150201111027",
      phone: "081355667788",
      game: "3",
      timeSlot: "10:00 AM",
      date: "May 19, 2025",
      status: "Waiting",
    },
    {
      name: "Jefri Satria",
      nim: "235150201111026",
      phone: "081322754996",
      game: "2",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Waiting",
    },
    {
      name: "Kayla Angeline",
      nim: "235150200111019",
      phone: "085367841111",
      game: "5",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Waiting",
    },
    {
      name: "Denis Saputra",
      nim: "235150701111026",
      phone: "081266458971",
      game: "6",
      timeSlot: "09:00 AM",
      date: "May 19, 2025",
      status: "Canceled",
    },
    {
      name: "Adit Bagaskoro",
      nim: "235150201111028",
      phone: "081772639917",
      game: "1",
      timeSlot: "10:00 AM",
      date: "May 19, 2025",
      status: "Waiting",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Session Ended":
        return (
          <Badge variant="secondary" className="bg-[#e5e8eb] text-[#61758a] hover:bg-[#e5e8eb]">
            Session Ended
          </Badge>
        )
      case "Playing":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#d0f0c0] text-[#000000] hover:bg-[#d0f0c0]">Playing</Badge>
            <Button size="sm" className="bg-[#0a80ed] hover:bg-[#0f59d2] text-white text-xs px-3 py-1 h-6">
              Done
            </Button>
          </div>
        )
      case "Waiting":
        return (
          <div className="flex items-center gap-2">
            <Badge className="bg-[#fff9c4] text-[#000000] hover:bg-[#fff9c4]">Waiting</Badge>
            <Button
              size="sm"
              variant="outline"
              className="text-[#0a80ed] border-[#0a80ed] hover:bg-[#e3f2fd] text-xs px-3 py-1 h-6"
            >
              Cancle
            </Button>
          </div>
        )
      case "Canceled":
        return <Badge className="bg-[#f8bbd0] text-[#000000] hover:bg-[#f8bbd0]">Canceled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#ffffff] border-b border-[#e5e8eb]">
        <div className="flex items-center">
          <div className="text-[#0f59d2] font-bold text-xl">FILKOM</div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[#121417] text-sm">Game Corner</span>
          <span className="text-[#121417] text-sm">LOLOF Secretariat</span>
          <div className="w-8 h-8 bg-[#0f59d2] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        {/* Activity Overview Header */}
        <div className="mb-6">
          <h1 className="text-[#0a80ed] text-2xl font-semibold mb-2">Activity Overview</h1>
          <h2 className="text-[#121417] text-lg font-medium">Game Corner</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
          <Card className="bg-[#f0f2f5] border-[#e5e8eb]">
            <CardContent className="p-6">
              <div className="text-[#121417] text-sm font-medium mb-2">Game Corner In Use</div>
              <div className="text-[#0a80ed] text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-[#f0f2f5] border-[#e5e8eb]">
            <CardContent className="p-6">
              <div className="text-[#121417] text-sm font-medium mb-2">Game Corner In Use</div>
              <div className="text-[#0a80ed] text-3xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card className="bg-[#f0f2f5] border-[#e5e8eb]">
            <CardContent className="p-6">
              <div className="text-[#121417] text-sm font-medium mb-2">Total Usage This Month</div>
              <div className="text-[#0a80ed] text-3xl font-bold">143</div>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#61758a] w-4 h-4" />
          <Input
            placeholder="Search"
            className="pl-10 bg-[#ffffff] border-[#e5e8eb] text-[#121417] placeholder:text-[#61758a]"
          />
        </div>

        {/* Data Table */}
        <div className="bg-[#ffffff] border border-[#e5e8eb] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f0f2f5] border-b border-[#e5e8eb]">
                <tr>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Name</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">NIM/NIP</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Phone Number</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Game</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Time Slot</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Date</th>
                  <th className="text-left p-4 text-[#121417] font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((row, index) => (
                  <tr key={index} className="border-b border-[#e5e8eb] hover:bg-[#f0f2f5]/50">
                    <td className="p-4 text-[#61758a] text-sm">{row.name}</td>
                    <td className="p-4 text-[#61758a] text-sm">{row.nim}</td>
                    <td className="p-4 text-[#61758a] text-sm">{row.phone}</td>
                    <td className="p-4 text-[#61758a] text-sm">{row.game}</td>
                    <td className="p-4 text-[#61758a] text-sm">{row.timeSlot}</td>
                    <td className="p-4 text-[#61758a] text-sm">{row.date}</td>
                    <td className="p-4">{getStatusBadge(row.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
