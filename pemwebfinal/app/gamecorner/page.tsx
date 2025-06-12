"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GameCornerBooking() {
  const [selectedSlot, setSelectedSlot] = useState("")
  const [activeGame, setActiveGame] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    phoneNumber: "",
  })

  const games = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" },
    { id: 3, name: "Game 3" },
    { id: 4, name: "Game 4" },
    { id: 5, name: "Game 5" },
    { id: 6, name: "Game 6" },
  ]

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  const isValidNim = (nim: string) => {
    return nim.length >= 5 && nim.substring(2, 5) === "515"
  }
  

  const handleBooking = async () => {
    if (!formData.name || !formData.nim || !formData.phoneNumber || activeGame === null || !selectedSlot) {
      alert("Please fill in all fields.")
      return
    }
    
    if (!isValidNim(formData.nim)) {
      alert("Only students with NIM containing '515' in positions 3-5 can book.")
      return
  }

    // Build datetime string
    const selectedDate = new Date()
    const [hour, minute] = selectedSlot.split(":")
    selectedDate.setHours(parseInt(hour))
    selectedDate.setMinutes(parseInt(minute))
    selectedDate.setSeconds(0)

    const isoTime = selectedDate.toISOString()

    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        nim: formData.nim,
        phoneNumber: formData.phoneNumber,
        game: activeGame,
        time: isoTime,
      }),
    })

    const result = await response.json()
    if (!response.ok) {
      alert(result.message || "Booking failed")
    } else {
      alert("Booking successful!")
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <main className="max-w-4xl px-6 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-[##212121] text-3xl font-bold mb-6">Game Corner Booking</h1>
        </div>

        <div className="mb-12 space-y-6">
          <div>
            <Label htmlFor="name" className="text-[#212121] font-medium mb-2 block">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="nim" className="text-[##212121] font-medium mb-2 block">NIM</Label>
            <Input
              id="nim"
              placeholder="Enter your NIM"
              value={formData.nim}
              onChange={(e) => handleInputChange("nim", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-[#212121] font-medium mb-2 block">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-[#212121] text-xl font-semibold mb-6">Available Time Slots</h2>

          <div className="flex space-x-0 mb-6 border-b border-[#e5e8eb]">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeGame === game.id
                    ? "border-[#212121] text-[#212121]"
                    : "border-transparent text-[#61758a] hover:text-[#3e3e3e]"
                }`}
              >
                {game.name}
              </button>
            ))}
          </div>

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

          <div className="flex justify-end">
            <Button
              onClick={handleBooking}
              className="bg-[#0a80ed] hover:bg-[#0f59d2] text-white px-6 py-3"
            >
              Book Selected Slot
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#61758a] text-sm">
            After completing your booking, please leave your Student ID Card to the security officer.
          </p>
        </div>
      </main>
    </div>
  )
}
