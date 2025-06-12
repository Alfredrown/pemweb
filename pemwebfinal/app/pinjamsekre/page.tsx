"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, User } from "lucide-react"

export default function Component() {
  const [selectedRoom, setSelectedRoom] = useState<{ room_id: number; nama_ruangan: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("")

const secretariatRooms = [
  { room_id: 21, nama_ruangan: "2.1 Badan Eksekutif Mahasiswa (BEM)" },
  { room_id: 22, nama_ruangan: "2.2 Dewan Perwakilan Mahasiswa (DPM)" },
  { room_id: 23, nama_ruangan: "2.3 Himpunan Mahasiswa Departemen Teknik Informatika (HIMDTIF)" },
  { room_id: 24, nama_ruangan: "2.4 Keluarga Besar Mahasiswa Departemen Sistem Informasi (KBMDSI)" },
  { room_id: 25, nama_ruangan: "2.5 Basic Computing Community (BCC)" },
  { room_id: 26, nama_ruangan: "2.6 RAION Community" },
  { room_id: 27, nama_ruangan: "2.7 POROS" },
  { room_id: 28, nama_ruangan: "2.8 POROS" },
  { room_id: 29, nama_ruangan: "2.9 ROBOTIK" },
  { room_id: 210, nama_ruangan: "2.10 GDSC" },
  { room_id: 211, nama_ruangan: "2.11 BCC" },
  { room_id: 212, nama_ruangan: "2.12 LPM-DISPLAY" },
  { room_id: 213, nama_ruangan: "2.13 K-RISMA" },
  { room_id: 214, nama_ruangan: "2.14 OPTIK" },
  { room_id: 215, nama_ruangan: "2.15 PKM DANIEL" },
  { room_id: 216, nama_ruangan: "2.16 KMK" },
  { room_id: 217, nama_ruangan: "2.17 LKI-AMD" },
  { room_id: 218, nama_ruangan: "2.18 DEVGIRLS" },
  { room_id: 219, nama_ruangan: "2.19 DAI KAZOKU" },
];

const filteredRooms = secretariatRooms.filter((room) =>
    room.nama_ruangan.toLowerCase().includes(searchTerm.toLowerCase())
  );

const [formData, setFormData] = useState({
  name: "",
  nim: "",
  phoneNumber: "",
});
const [message, setMessage] = useState<string | null>(null);
const [loading, setLoading] = useState(false);

const handleInputChange = (field: string, value: string) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};

const handleBooking = async () => {
  if (
    !formData.name ||
    !formData.nim ||
    !formData.phoneNumber ||
    !selectedRoom
  ) {
    setMessage("Please fill in all fields and select a room.");
    return;
  }

  setLoading(true);
  setMessage(null);

  // Contoh: waktu mulai sekarang, selesai 1 jam kemudian
  const waktu_mulai_layanan = new Date();
  const waktu_selesai_layanan = new Date(waktu_mulai_layanan.getTime() + 60 * 60 * 1000);

  const res = await fetch("/api/sekre", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      nim: formData.nim,
      phoneNumber: formData.phoneNumber,
      room_id: selectedRoom.room_id,
      waktu_mulai_layanan: waktu_mulai_layanan.toISOString(),
      waktu_selesai_layanan: waktu_selesai_layanan.toISOString(),
    }),
  });

  const data = await res.json();
  setLoading(false);
  setMessage(data.message || (res.ok ? "Booking successful!" : "Booking failed"));
};

 const datehours= new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Main Content */}
      <main className="max-w-2xl px-6 py-8 mx-auto">
        {/* Title and Date */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-[#121417] mb-4">LO/LOF Secretariat</h1>
            <div className="flex items-center justify-center space-x-4">
            <div className="px-3 py-1 bg-[#f0f2f5] rounded-md text-sm text-[#61758a]">{datehours}</div>
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
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
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
              value={formData.nim}
              onChange={(e) => handleInputChange("nim", e.target.value)}
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
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className="bg-[#f0f2f5] border-0 text-[#61758a] placeholder:text-[#858585]"
            />
          </div>
        </div>  x

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
                key={room.room_id}
                onClick={() => setSelectedRoom(room)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedRoom?.room_id === room.room_id
                    ? "bg-[#0a80ed] text-white"
                    : "bg-[#e5e8eb] text-[#61758a] hover:bg-[#d9d9d9]"
                }`}
              >
                {room.nama_ruangan}
              </div>
            ))}
          </div>

          {/* Book Button */}
            <Button
              className="w-full bg-[#0a80ed] hover:bg-[#0f59d2] text-white py-3 rounded-md"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Selected Room"}
            </Button>
            {message && (
              <div className="mt-4 text-center text-sm text-[#0a80ed]">{message}</div>
            )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-[#61758a] mt-6">
          After completing your booking, please leave your Student ID Card to the security officer.
        </p>
      </main>
    </div>
  )
}
