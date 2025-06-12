"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GameCornerBooking() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [activeGame, setActiveGame] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    nim: "",
    phoneNumber: "",
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const games = [
    { id: 1, name: "Game 1" },
    { id: 2, name: "Game 2" },
    { id: 3, name: "Game 3" },
    { id: 4, name: "Game 4" },
    { id: 5, name: "Game 5" },
    { id: 6, name: "Game 6" },
  ];

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
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchAvailability = async () => {
    if (activeGame === null) {
      alert("Please select a game first.");
      return;
    }
    setIsLoading(true);
    setBookedSlots([]);
    try {
      const response = await fetch("/api/layanan");
      if (!response.ok) {
        throw new Error("Failed to fetch data from server");
      }
      const result = await response.json();
      const timeSlotStatuses = result.timeSlotStatuses || {};

      const gameTimeSlots = timeSlotStatuses[activeGame] || {};
      const bookedTimeStrings = Object.keys(gameTimeSlots).filter(
        (time) => gameTimeSlots[time] === "ongoing" || gameTimeSlots[time] === "pending"
      );

      setBookedSlots(bookedTimeStrings);
    } catch (error) {
      console.error("Failed to fetch and process availability:", error);
      alert("Could not load booking data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameSelect = (gameId: number) => {
    setActiveGame(gameId);
    setSelectedSlot("");
    setBookedSlots([]);
  };

  const handleBooking = async () => {
    if (
      !formData.name ||
      !formData.nim ||
      !formData.phoneNumber ||
      activeGame === null ||
      !selectedSlot
    ) {
      alert("Please fill in all fields and select a game and time slot.");
      return;
    }
    if (bookedSlots.includes(selectedSlot)) {
      alert(
        "This time slot is already booked. Please fetch the latest availability and select another slot."
      );
      return;
    }
    const selectedDate = new Date();
    const [hour, minute] = selectedSlot.split(":");
    selectedDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
    const isoTime = selectedDate.toISOString();
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
    });
    const result = await response.json();
    if (!response.ok) {
      alert(result.message || "Booking failed");
    } else {
      alert("Booking successful!");
      fetchAvailability();
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <main className="max-w-4xl px-6 py-12 mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-[#212121] text-3xl font-bold mb-4">
            Game Corner Booking
          </h1>
          <p className="text-gray-500 mb-6">
            Select a game, fetch its available time slots, and book your session.
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div>
            <Label
              htmlFor="name"
              className="text-[#212121] font-medium mb-2 block"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label
              htmlFor="nim"
              className="text-[#212121] font-medium mb-2 block"
            >
              NIM
            </Label>
            <Input
              id="nim"
              placeholder="Enter your NIM"
              value={formData.nim}
              onChange={(e) => handleInputChange("nim", e.target.value)}
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-[#212121] font-medium mb-2 block"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
          </div>
        </div>

        <div className="p-6 mb-8 border rounded-lg">
          <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
            <h2 className="text-[#212121] text-xl font-semibold">
              Select Game
            </h2>
            <Button
              onClick={fetchAvailability}
              disabled={isLoading || activeGame === null}
              className="bg-[#0a80ed] hover:bg-[#0f59d2] text-white w-full md:w-auto"
            >
              {isLoading ? "Fetching..." : "Fetch Availability"}
            </Button>
          </div>

          <div className="flex flex-wrap justify-center mb-6 border-b border-[#e5e8eb]">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameSelect(game.id)}
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

          <div className="grid grid-cols-3 gap-3 mb-8 sm:grid-cols-4 md:grid-cols-5">
            {timeSlots.map((slot, index) => {
              const isBooked = bookedSlots.includes(slot);
              return (
                <Button
                  key={index}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  onClick={() => !isBooked && setSelectedSlot(slot)}
                  disabled={isBooked}
                  className={`h-12 text-base transition-all ${
                    selectedSlot === slot
                      ? "bg-[#0a80ed] hover:bg-[#0f59d2] text-white border-[#0a80ed] ring-2 ring-offset-2 ring-[#0a80ed]"
                      : isBooked
                      ? "bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed line-through"
                      : "bg-[#f0f2f5] hover:bg-[#e5e8eb] text-[#61758a] border-[#d9d9d9]"
                  }`}
                >
                  {slot}
                </Button>
              );
            })}
          </div>

          <div className="flex justify-end">
          <Button
  onClick={handleBooking}
  disabled={!activeGame || !selectedSlot} // Hanya disable jika game atau slot belum dipilih
  className={`px-6 py-3 text-lg ${
    !activeGame || !selectedSlot
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-[#0a80ed] hover:bg-[#0f59d2] text-white"
  }`}
>
  Book Selected Slot
</Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#61758a] text-sm">
            After completing your booking, please leave your Student ID Card to
            the security officer.
          </p>
        </div>
      </main>
    </div>
  );
}