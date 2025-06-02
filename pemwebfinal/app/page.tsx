import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Search, Package } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Main Content */}
      <main className="px-6 py-8 mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div
            className="relative overflow-hidden bg-center bg-cover rounded-2xl h-96"
            style={{
              backgroundImage: "url('/images/campus-hero.png')",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <div className="text-center text-white">
                <h1 className="mb-4 text-5xl font-bold">Good Morning, FILKOM!</h1>
                <p className="text-xl opacity-90">Everything You Need Starts Here.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#121417] mb-4">What Would You Like to Do Today?</h2>
          <p className="text-[#61758a] text-lg mb-12">
            Explore our services to discover more features designed to enhance your experience.
          </p>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 grid-cols-2 gap-6">
            
            {/* Game Corner Booking */}
            <Card className="border border-[#e5e8eb] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Calendar className="w-8 h-8 text-[#61758a]" />
                </div>
                <h3 className="text-xl font-semibold text-[#121417] mb-2">Game Corner Booking</h3>
                <p className="text-[#61758a] text-sm">Reserve game corner slots for recreational activities.</p>
              </CardContent>
            </Card>

            {/* LO/LOF Secretariat */}
            <Card className="border border-[#e5e8eb] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Users className="w-8 h-8 text-[#61758a]" />
                </div>
                <h3 className="text-xl font-semibold text-[#121417] mb-2">LO/LOF Secretariat</h3>
                <p className="text-[#61758a] text-sm">Book now and take your organization to the next level.</p>
              </CardContent>
            </Card>

            {/* Lost and Found Reporting */}
            {/* <Card className="border border-[#e5e8eb] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Search className="w-8 h-8 text-[#61758a]" />
                </div>
                <h3 className="text-xl font-semibold text-[#121417] mb-2">Lost and Found Reporting</h3>
                <p className="text-[#61758a] text-sm">Report lost items and search for found items.</p>
              </CardContent>
            </Card> */}

            {/* Item Deposit */}
            {/* <Card className="border border-[#e5e8eb] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Package className="w-8 h-8 text-[#61758a]" />
                </div>
                <h3 className="text-xl font-semibold text-[#121417] mb-2">Item Deposit</h3>
                <p className="text-[#61758a] text-sm">Securely deposit and manage your personal belongings.</p>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </main>
    </div>
  )
}
