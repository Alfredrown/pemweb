"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GameCornerBooking() {
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM")
  const [activeGame, setActiveGame] = useState("Game 1")
  const [formData, setFormData] = useState({
    name: "",
    nimNip: "",
    phoneNumber: "",
  })

  const games = ["Game 1", "Game 2", "Game 3", "Game 4", "Game 5", "Game 6"]

  const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "13:00 PM",
    "14:00 PM",
    "15:00 PM",
    "16:00 PM",
    "17:00 PM",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">

      {/* Main Content */}
      <main className="max-w-4xl px-6 py-12 mx-auto">
        {/* Title and Date/Time */}
        <div className="mb-12 text-center">
          <h1 className="text-[#000000] text-3xl font-bold mb-6">Game Corner Booking</h1>
          <div className="flex justify-center space-x-4">
            <span className="px-4 py-2 bg-[#f0f2f5] text-[#61758a] rounded-full text-sm">May 19, 2025</span>
            <span className="px-4 py-2 bg-[#f0f2f5] text-[#61758a] rounded-full text-sm">09:32 AM</span>
          </div>
        </div>

        {/* Form */}
        <div className="mb-12 space-y-6">
          <div>
            <Label htmlFor="name" className="text-[#000000] font-medium mb-2 block">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full border-[#d9d9d9] focus:border-[#0a80ed] focus:ring-[#0a80ed]"
            />
          </div>

          <div>
            <Label htmlFor="nim-nip" className="text-[#000000] font-medium mb-2 block">
              NIM/NIP
            </Label>
            <Input
              id="nim-nip"
              placeholder="Enter your NIM/NIP"
              value={formData.nimNip}
              onChange={(e) => handleInputChange("nimNip", e.target.value)}
              className="w-full border-[#d9d9d9] focus:border-[#0a80ed] focus:ring-[#0a80ed]"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-[#000000] font-medium mb-2 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="w-full border-[#d9d9d9] focus:border-[#0a80ed] focus:ring-[#0a80ed]"
            />
          </div>
        </div>

        {/* Available Time Slots */}
        <div className="mb-8">
          <h2 className="text-[#000000] text-xl font-semibold mb-6">Available Time Slots</h2>

          {/* Game Tabs */}
          <div className="flex space-x-0 mb-6 border-b border-[#e5e8eb]">
            {games.map((game) => (
              <button
                key={game}
                onClick={() => setActiveGame(game)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeGame === game
                    ? "border-[#000000] text-[#000000]"
                    : "border-transparent text-[#61758a] hover:text-[#3e3e3e]"
                }`}
              >
                {game}
              </button>
            ))}
          </div>

          {/* Time Slot Grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            {timeSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedSlot === slot ? "default" : "outline"}
                onClick={() => setSelectedSlot(slot)}
                className={`h-12 ${
                  selectedSlot === slot
                    ? "bg-[#0a80ed] hover:bg-[#0f59d2] text-white border-[#0a80ed]"
                    : "bg-[#f0f2f5] hover:bg-[#e5e8eb] text-[#61758a] border-[#d9d9d9]"
                }`}
              >
                {slot}
              </Button>
            ))}
          </div>

          {/* Book Button */}
          <div className="flex justify-end">
            <Button className="bg-[#0a80ed] hover:bg-[#0f59d2] text-white px-6 py-3">Book Selected Slot</Button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-[#61758a] text-sm">
            After completing your booking, please leave your Student ID Card to the security officer.
            
          </p>
        </div>
      </main>
    </div>
  )
}
