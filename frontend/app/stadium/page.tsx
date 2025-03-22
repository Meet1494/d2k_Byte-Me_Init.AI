"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// Update the stadium events data with Indian events and pricing
const stadiumEvents = [
  {
    id: 1,
    title: "ICC T20 World Cup: India vs Australia",
    type: "Sports",
    date: "October 15, 2023",
    time: "7:30 PM",
    location: "Wankhede Stadium, Mumbai",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "The ultimate showdown between India and Australia in the ICC T20 World Cup. Don't miss this historic match!",
    capacity: "33,000",
    minPrice: 1999,
    maxPrice: 15999,
  },
  {
    id: 2,
    title: "Justin Bieber Justice World Tour",
    type: "Concert",
    date: "December 22, 2023",
    time: "8:00 PM",
    location: "Jawaharlal Nehru Stadium, New Delhi",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "Experience Justin Bieber's record-breaking Justice World Tour live in concert. A three-hour journey through his musical career.",
    capacity: "60,000",
    minPrice: 4999,
    maxPrice: 24999,
  },
  {
    id: 3,
    title: "IPL Finals: Mumbai Indians vs Chennai Super Kings",
    type: "Sports",
    date: "May 28, 2024",
    time: "7:00 PM",
    location: "Narendra Modi Stadium, Ahmedabad",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "The legendary rivalry continues as Mumbai Indians face off against Chennai Super Kings in the IPL Finals.",
    capacity: "132,000",
    minPrice: 2999,
    maxPrice: 25999,
  },
]

// Update the stadium sections with Indian pricing
const stadiumSections = {
  concert: [
    { id: "vip", name: "VIP Front Stage", price: 24999, available: 50, capacity: 100, color: "#8b5cf6" },
    { id: "premium", name: "Premium", price: 14999, available: 200, capacity: 500, color: "#a855f7" },
    { id: "floor", name: "Floor Standing", price: 9999, available: 1000, capacity: 2000, color: "#d946ef" },
    { id: "lower-tier", name: "Lower Tier", price: 7999, available: 5000, capacity: 10000, color: "#ec4899" },
    { id: "middle-tier", name: "Middle Tier", price: 5999, available: 15000, capacity: 30000, color: "#f472b6" },
    { id: "upper-tier", name: "Upper Tier", price: 4999, available: 20000, capacity: 40000, color: "#fb7185" },
  ],
  sports: [
    { id: "courtside", name: "Courtside", price: 25999, available: 100, capacity: 200, color: "#8b5cf6" },
    { id: "box-seats", name: "Box Seats", price: 15999, available: 500, capacity: 1000, color: "#a855f7" },
    { id: "lower-level", name: "Lower Level", price: 9999, available: 3000, capacity: 5000, color: "#d946ef" },
    { id: "club-level", name: "Club Level", price: 5999, available: 5000, capacity: 10000, color: "#ec4899" },
    { id: "upper-level", name: "Upper Level", price: 3999, available: 10000, capacity: 20000, color: "#f472b6" },
    { id: "nosebleed", name: "Nosebleed", price: 1999, available: 20000, capacity: 40000, color: "#fb7185" },
  ],
}

export default function StadiumEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(stadiumEvents[0])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const { toast } = useToast()

  const handleEventChange = (eventId: number) => {
    const event = stadiumEvents.find((e) => e.id === eventId)
    if (event) {
      setSelectedEvent(event)
      setSelectedSection(null)
      setQuantity(1)
    }
  }

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId === selectedSection ? null : sectionId)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleBookTickets = () => {
    if (!selectedSection) {
      toast({
        title: "Please select a section",
        description: "You need to select a seating section before booking.",
        className: "toast-warning",
      })
      return
    }

    // Store booking details in localStorage for the success page
    const eventType = selectedEvent.type.toLowerCase()
    const section = stadiumSections[eventType === "concert" ? "concert" : "sports"].find(
      (s) => s.id === selectedSection,
    )

    // Create a comprehensive booking details object
    const bookingDetails = {
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventType: selectedEvent.type,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      eventLocation: selectedEvent.location,
      eventImage: selectedEvent.image,
      eventDescription: selectedEvent.description,
      section: section?.name,
      sectionId: selectedSection,
      sectionColor: section?.color,
      quantity: quantity,
      price: section ? section.price * quantity : 0,
      serviceFee: section ? section.price * quantity * 0.15 : 0,
      totalPrice: section ? section.price * quantity * 1.15 : 0,
      bookingTime: new Date().toISOString(),
      bookingReference: `TF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    }

    // Store booking details in localStorage
    localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))
    console.log("Booking details stored:", bookingDetails)

    // Dispatch custom event to update communities in header
    window.dispatchEvent(new Event("localStorageChange"))

    // Navigate to facial authentication page
    router.push("/facial-auth")
  }

  // Get the appropriate sections based on event type
  const eventType = selectedEvent.type.toLowerCase()
  const sections = stadiumSections[eventType === "concert" ? "concert" : "sports"]

  // Calculate total price
  const selectedSectionData = sections.find((s) => s.id === selectedSection)
  const totalPrice = selectedSectionData ? selectedSectionData.price * quantity : 0

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/explore" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Events
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-white">Stadium Events</h1>
          <p className="text-white/80">Select your preferred event and seating section.</p>
        </div>

        {/* Event Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stadiumEvents.map((event) => (
            <Card
              key={event.id}
              className={`overflow-hidden cursor-pointer transition-all ${
                selectedEvent.id === event.id ? "ring-2 ring-primary scale-[1.02]" : "opacity-80 hover:opacity-100"
              } card-glass`}
              onClick={() => handleEventChange(event.id)}
            >
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary text-white">{event.type}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-sm text-white/80 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-white/80 mb-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-sm text-white/80 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Capacity: {event.capacity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Select Your Seats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
                  <p className="text-white/80 mb-4">{selectedEvent.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-white/60" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-white/60" />
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-white/60" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>

                {/* Stadium Visualization */}
                <div className="relative w-full h-[400px] bg-black/20 rounded-lg mb-6 overflow-hidden">
                  {selectedEvent.type === "Concert" ? (
                    <ConcertStadiumMap
                      selectedSection={selectedSection}
                      onSectionSelect={handleSectionSelect}
                      sections={sections}
                    />
                  ) : (
                    <SportsStadiumMap
                      selectedSection={selectedSection}
                      onSectionSelect={handleSectionSelect}
                      sections={sections}
                    />
                  )}
                </div>

                {/* Section Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedSection === section.id ? "bg-primary text-white" : "bg-white/10 hover:bg-white/20"
                      }`}
                      onClick={() => handleSectionSelect(section.id)}
                    >
                      <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: section.color }} />
                        <span className="font-medium">{section.name}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>₹{section.price.toFixed(2)}</span>
                        <span>{section.available} available</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="card-glass sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Selected Section</h3>
                  {selectedSection ? (
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <p className="font-bold">{sections.find((s) => s.id === selectedSection)?.name}</p>
                      <p className="text-sm text-white/80">
                        ₹{sections.find((s) => s.id === selectedSection)?.price.toFixed(2)} per ticket
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-white/10 rounded-lg text-white/60">
                      <p>No section selected</p>
                      <p className="text-sm">Please select a section from the stadium map</p>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Quantity</h3>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 font-bold">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= 10}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Maximum 10 tickets per booking</p>
                </div>

                <div className="border-t border-white/20 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service Fee</span>
                    <span>₹{(totalPrice * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>₹{(totalPrice * 1.15).toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full gradient-bg hover:opacity-90 text-white"
                  size="lg"
                  onClick={handleBookTickets}
                  disabled={!selectedSection}
                >
                  Book Tickets
                </Button>

                <p className="text-xs text-white/60 text-center">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StadiumMapProps {
  selectedSection: string | null
  onSectionSelect: (sectionId: string) => void
  sections: Array<{
    id: string
    name: string
    price: number
    available: number
    capacity: number
    color: string
  }>
}

function ConcertStadiumMap({ selectedSection, onSectionSelect, sections }: StadiumMapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TooltipProvider>
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Stage */}
          <rect x="250" y="50" width="300" height="80" rx="10" fill="#333" />
          <text x="400" y="95" textAnchor="middle" fill="white" fontSize="24">
            STAGE
          </text>

          {/* VIP Front Stage */}
          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="250"
                y="150"
                width="300"
                height="50"
                rx="5"
                className={`stadium-section ${selectedSection === "vip" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "vip")?.color || "#ccc"}
                onClick={() => onSectionSelect("vip")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">VIP Front Stage</p>
              <p>₹{sections.find((s) => s.id === "vip")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Premium */}
          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="200"
                y="220"
                width="400"
                height="60"
                rx="5"
                className={`stadium-section ${selectedSection === "premium" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "premium")?.color || "#ccc"}
                onClick={() => onSectionSelect("premium")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Premium</p>
              <p>₹{sections.find((s) => s.id === "premium")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Floor Standing */}
          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="150"
                y="300"
                width="500"
                height="80"
                rx="5"
                className={`stadium-section ${selectedSection === "floor" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "floor")?.color || "#ccc"}
                onClick={() => onSectionSelect("floor")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Floor Standing</p>
              <p>₹{sections.find((s) => s.id === "floor")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Lower Tier */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M100,400 L700,400 C700,450 650,480 400,480 C150,480 100,450 100,400 Z"
                className={`stadium-section ${selectedSection === "lower-tier" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "lower-tier")?.color || "#ccc"}
                onClick={() => onSectionSelect("lower-tier")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Lower Tier</p>
              <p>₹{sections.find((s) => s.id === "lower-tier")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Middle Tier */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M50,500 L750,500 C750,520 700,540 400,540 C100,540 50,520 50,500 Z"
                className={`stadium-section ${selectedSection === "middle-tier" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "middle-tier")?.color || "#ccc"}
                onClick={() => onSectionSelect("middle-tier")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Middle Tier</p>
              <p>₹{sections.find((s) => s.id === "middle-tier")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Upper Tier */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M25,550 L775,550 C775,570 700,590 400,590 C100,590 25,570 25,550 Z"
                className={`stadium-section ${selectedSection === "upper-tier" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "upper-tier")?.color || "#ccc"}
                onClick={() => onSectionSelect("upper-tier")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Upper Tier</p>
              <p>₹{sections.find((s) => s.id === "upper-tier")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>
        </svg>
      </TooltipProvider>
    </div>
  )
}

function SportsStadiumMap({ selectedSection, onSectionSelect, sections }: StadiumMapProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <TooltipProvider>
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Court/Field */}
          <rect x="200" y="150" width="400" height="250" rx="0" fill="#1e293b" stroke="#475569" strokeWidth="4" />
          <rect x="250" y="175" width="300" height="200" rx="0" fill="#334155" stroke="#475569" strokeWidth="2" />
          <circle cx="400" cy="275" r="50" fill="none" stroke="#475569" strokeWidth="2" />

          {/* Courtside */}
          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="150"
                y="125"
                width="500"
                height="25"
                rx="0"
                className={`stadium-section ${selectedSection === "courtside" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "courtside")?.color || "#ccc"}
                onClick={() => onSectionSelect("courtside")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Courtside</p>
              <p>₹{sections.find((s) => s.id === "courtside")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="150"
                y="400"
                width="500"
                height="25"
                rx="0"
                className={`stadium-section ${selectedSection === "courtside" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "courtside")?.color || "#ccc"}
                onClick={() => onSectionSelect("courtside")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Courtside</p>
              <p>₹{sections.find((s) => s.id === "courtside")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="150"
                y="150"
                width="25"
                height="250"
                rx="0"
                className={`stadium-section ${selectedSection === "courtside" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "courtside")?.color || "#ccc"}
                onClick={() => onSectionSelect("courtside")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Courtside</p>
              <p>₹{sections.find((s) => s.id === "courtside")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="625"
                y="150"
                width="25"
                height="250"
                rx="0"
                className={`stadium-section ${selectedSection === "courtside" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "courtside")?.color || "#ccc"}
                onClick={() => onSectionSelect("courtside")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Courtside</p>
              <p>₹{sections.find((s) => s.id === "courtside")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Box Seats */}
          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="100"
                y="100"
                width="600"
                height="25"
                rx="0"
                className={`stadium-section ${selectedSection === "box-seats" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "box-seats")?.color || "#ccc"}
                onClick={() => onSectionSelect("box-seats")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Box Seats</p>
              <p>₹{sections.find((s) => s.id === "box-seats")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="100"
                y="425"
                width="600"
                height="25"
                rx="0"
                className={`stadium-section ${selectedSection === "box-seats" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "box-seats")?.color || "#ccc"}
                onClick={() => onSectionSelect("box-seats")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Box Seats</p>
              <p>₹{sections.find((s) => s.id === "box-seats")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="100"
                y="125"
                width="50"
                height="300"
                rx="0"
                className={`stadium-section ${selectedSection === "box-seats" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "box-seats")?.color || "#ccc"}
                onClick={() => onSectionSelect("box-seats")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Box Seats</p>
              <p>₹{sections.find((s) => s.id === "box-seats")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <rect
                x="650"
                y="125"
                width="50"
                height="300"
                rx="0"
                className={`stadium-section ${selectedSection === "box-seats" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "box-seats")?.color || "#ccc"}
                onClick={() => onSectionSelect("box-seats")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Box Seats</p>
              <p>₹{sections.find((s) => s.id === "box-seats")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Lower Level */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M50,75 L750,75 L750,100 L50,100 Z"
                className={`stadium-section ${selectedSection === "lower-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "lower-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("lower-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Lower Level</p>
              <p>₹{sections.find((s) => s.id === "lower-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M50,450 L750,450 L750,475 L50,475 Z"
                className={`stadium-section ${selectedSection === "lower-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "lower-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("lower-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Lower Level</p>
              <p>₹{sections.find((s) => s.id === "lower-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M50,100 L100,100 L100,450 L50,450 Z"
                className={`stadium-section ${selectedSection === "lower-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "lower-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("lower-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Lower Level</p>
              <p>₹{sections.find((s) => s.id === "lower-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M700,100 L750,100 L750,450 L700,450 Z"
                className={`stadium-section ${selectedSection === "lower-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "lower-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("lower-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Lower Level</p>
              <p>₹{sections.find((s) => s.id === "lower-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Club Level */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M25,50 L775,50 L775,75 L25,75 Z"
                className={`stadium-section ${selectedSection === "club-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "club-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("club-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Club Level</p>
              <p>₹{sections.find((s) => s.id === "club-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M25,75 L50,75 L50,475 L25,475 Z"
                className={`stadium-section ${selectedSection === "club-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "club-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("club-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Club Level</p>
              <p>₹{sections.find((s) => s.id === "club-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M750,75 L775,75 L775,475 L750,475 Z"
                className={`stadium-section ${selectedSection === "club-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "club-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("club-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Club Level</p>
              <p>₹{sections.find((s) => s.id === "club-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Upper Level */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M0,25 L800,25 L800,50 L0,50 Z"
                className={`stadium-section ${selectedSection === "upper-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "upper-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("upper-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Upper Level</p>
              <p>₹{sections.find((s) => s.id === "upper-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M0,500 L800,500 L800,525 L0,525 Z"
                className={`stadium-section ${selectedSection === "upper-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "upper-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("upper-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Upper Level</p>
              <p>₹{sections.find((s) => s.id === "upper-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M0,50 L25,50 L25,500 L0,500 Z"
                className={`stadium-section ${selectedSection === "upper-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "upper-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("upper-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Upper Level</p>
              <p>₹{sections.find((s) => s.id === "upper-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M775,50 L800,50 L800,500 L775,500 Z"
                className={`stadium-section ${selectedSection === "upper-level" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "upper-level")?.color || "#ccc"}
                onClick={() => onSectionSelect("upper-level")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Upper Level</p>
              <p>₹{sections.find((s) => s.id === "upper-level")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          {/* Nosebleed */}
          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M0,0 L800,0 L800,25 L0,25 Z"
                className={`stadium-section ${selectedSection === "nosebleed" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "nosebleed")?.color || "#ccc"}
                onClick={() => onSectionSelect("nosebleed")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Nosebleed</p>
              <p>₹{sections.find((s) => s.id === "nosebleed")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <path
                d="M0,525 L800,525 L800,550 L0,550 Z"
                className={`stadium-section ${selectedSection === "nosebleed" ? "selected" : ""}`}
                fill={sections.find((s) => s.id === "nosebleed")?.color || "#ccc"}
                onClick={() => onSectionSelect("nosebleed")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-bold">Nosebleed</p>
              <p>₹{sections.find((s) => s.id === "nosebleed")?.price.toFixed(2)}</p>
            </TooltipContent>
          </Tooltip>
        </svg>
      </TooltipProvider>
    </div>
  )
}

