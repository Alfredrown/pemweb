import { Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  const activityData = [
    {
      name: "Sabita Khansa Dewi",
      nim: "235150201111025",
      phone: "081749928336",
      room: "2.1",
      timeStamp: "08:35 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Alfredo Radhinal Mukhtar",
      nim: "235150201111021",
      phone: "081273469229",
      room: "2.10",
      timeStamp: "08:44 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Sandhika Rizqi Ramadhan",
      nim: "235150200111021",
      phone: "081733925283",
      room: "2.14",
      timeStamp: "08:50 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Githapati Prabuja",
      nim: "235150201111053",
      phone: "08127024300",
      room: "2.19",
      timeStamp: "09:14 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Exel Boy Alfanso",
      nim: "235150201111019",
      phone: "081922467228",
      room: "2.6",
      timeStamp: "09:19 AM",
      date: "May 19, 2025",
      status: "Returned",
    },
    {
      name: "Nova Kurnia Putri",
      nim: "235150701111027",
      phone: "087752682222",
      room: "2.12",
      timeStamp: "09:46 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Mutiara Shabrina",
      nim: "235150201111027",
      phone: "081355667788",
      room: "2.11",
      timeStamp: "10:02 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Jefri Satria",
      nim: "235150201111026",
      phone: "081322754996",
      room: "2.17",
      timeStamp: "10:15 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Kayla Angeline",
      nim: "235150200111019",
      phone: "085367841111",
      room: "2.2",
      timeStamp: "10:18 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Denis Saputra",
      nim: "235150701111026",
      phone: "081266458971",
      room: "2.5",
      timeStamp: "10:39 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
    {
      name: "Adit Bagaskoro",
      nim: "235150201111028",
      phone: "081772639915",
      room: "2.6",
      timeStamp: "10:40 AM",
      date: "May 19, 2025",
      status: "In Use",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Use":
        return (
          <Badge
            variant="secondary"
            className="bg-[#d0f0c0] text-[#000000] hover:bg-[#d0f0c0] border-0 rounded-full px-3 py-1"
          >
            In Use
          </Badge>
        )
      case "Done":
        return (
          <Badge
            variant="secondary"
            className="bg-[#0a80ed] text-[#ffffff] hover:bg-[#0a80ed] border-0 rounded-full px-3 py-1"
          >
            Done
          </Badge>
        )
      case "Returned":
        return (
          <Badge
            variant="secondary"
            className="bg-[#d9d9d9] text-[#000000] hover:bg-[#d9d9d9] border-0 rounded-full px-3 py-1"
          >
            Returned
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="px-3 py-1 rounded-full">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <main className="px-6 py-8">
        <div className="mb-6 pb-8">
        <h1 className="text-[#0a80ed] text-2xl font-semibold mb-2">Activity Overview</h1>
          <div className="flex items-center gap-4">
          <h2 className="text-[#121417] text-lg font-medium">
            <a href="/admin/gamedata" className="hover:underline text-[#0a80ed]">Game Corner</a>
            </h2>
            <h2 className="text-[#121417] text-lg font-medium">
            <a href="/admin/sekredata" className="hover:underline text-[#0a80ed]">Sekretariat</a>
            </h2>
          </div>

       
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#61758a] w-5 h-5" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-3 w-full border border-[#e5e8eb] rounded-lg bg-[#ffffff] text-[#121417] placeholder:text-[#61758a] focus:border-[#0a80ed] focus:ring-1 focus:ring-[#0a80ed]"
            />
          </div>

          {/* Data Table */}
          <div className="bg-[#ffffff] border border-[#e5e8eb] rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#e5e8eb]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">NIM/NIP</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Phone Number</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Room</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#121417]">Time Stamp</th>
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
        </div>
      </main>
    </div>
  )
}
