"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, User } from "lucide-react"

export default function Component() {
  const [selectedRoom, setSelectedRoom] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const secretariatRooms = [
    "2.1 Badan Eksekutif Mahasiswa (BEM)",
    "2.2 Dewan Perwakilan Mahasiswa (DPM)",
    "2.3 Himpunan Mahasiswa Departemen Teknik Informatika (HIMDTIF)",
    "2.4 Keluarga Besar Mahasiswa Departemen Sistem Informasi (KBMDSI)",
    "2.5 Basic Computing Community (BCC)",
    "2.6 RAION Community",
    "2.7 POROS",
    "2.8 POROS",
    "2.9 ROBOTIK",
    "2.10 GDSC",
    "2.11 BNCC",
    "2.12 LPM-DISPLAY",
    "2.13 K-RISMA",
    "2.14 OPTIK",
    "2.15 PKM DANIEL",
    "2.16 KMK",
    "2.17 KE-AMD",
    "2.18 DEVGIRLS",
    "2.19 DM KAZOKU",
  ]

  const filteredRooms = secretariatRooms.filter((room) => room.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Main Content */}
      <main className="max-w-2xl px-6 py-8 mx-auto">
        {/* Title and Date */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[#121417] mb-4">LO/LOF Secretariat</h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="px-3 py-1 bg-[#f0f2f5] rounded-md text-sm text-[#61758a]">May 19, 2025</div>
            <div className="px-3 py-1 bg-[#f0f2f5] rounded-md text-sm text-[#61758a]">09:32 AM</div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="mb-8 space-y-6">
          <div>
            <Label htmlFor="name" className="text-[#121417] font-medium mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              className="bg-[#f0f2f5] border-0 text-[#61758a] placeholder:text-[#858585]"
            />
          </div>

          <div>
            <Label htmlFor="nim" className="text-[#121417] font-medium mb-2 block">
              NIM/NIP
            </Label>
            <Input
              id="nim"
              placeholder="Enter your NIM/NIP"
              className="bg-[#f0f2f5] border-0 text-[#61758a] placeholder:text-[#858585]"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-[#121417] font-medium mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              className="bg-[#f0f2f5] border-0 text-[#61758a] placeholder:text-[#858585]"
            />
          </div>
        </div>

        {/* Available Secretariat */}
        <div>
          <Label className="text-[#121417] font-medium mb-4 block">Available Secretariat</Label>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#858585] w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#f0f2f5] border-0 text-[#61758a] placeholder:text-[#858585]"
            />
          </div>

          {/* Room List */}
          <div className="mb-8 space-y-2 overflow-y-auto max-h-96">
            {filteredRooms.map((room) => (
              <div
                key={room}
                onClick={() => setSelectedRoom(room)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedRoom === room ? "bg-[#0a80ed] text-white" : "bg-[#e5e8eb] text-[#61758a] hover:bg-[#d9d9d9]"
                }`}
              >
                {room}
              </div>
            ))}
          </div>

          {/* Book Button */}
          <Button className="w-full bg-[#0a80ed] hover:bg-[#0f59d2] text-white py-3 rounded-md">
            Book Selected Room
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-[#61758a] mt-6">
          After completing your booking, please leave your Student ID Card to the security officer.
        </p>
      </main>
    </div>
  )
}
