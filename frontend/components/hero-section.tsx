"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Search,
  Music,
  Film,
  Utensils,
  Palette,
  Dumbbell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

// Mock carousel data
const carouselItems = [
  {
    id: 3,
    title: "TufanTicket : Ticket book karo tufan ki speed pe",
    date: "",
    location: "",
    isGlassEffect: true,
  },
  {
    id: 1,
    title: "Arijit Singh Live in Concert",
    date: "July 15-17, 2023",
    location: "DY Patil Stadium, Mumbai",
    image: "/placeholder.svg?height=600&width=1200",
  },
  {
    id: 2,
    title: "Delhi Food & Music Festival",
    date: "August 5-7, 2023",
    location: "Jawaharlal Nehru Stadium, Delhi",
    image: "/placeholder.svg?height=600&width=1200",
  },
]

// Event categories
const eventCategories = [
  { value: "music", label: "Music", icon: <Music className="h-4 w-4 mr-2" /> },
  { value: "film", label: "Film & Media", icon: <Film className="h-4 w-4 mr-2" /> },
  { value: "food", label: "Food & Drink", icon: <Utensils className="h-4 w-4 mr-2" /> },
  { value: "art", label: "Art & Culture", icon: <Palette className="h-4 w-4 mr-2" /> },
  { value: "sports", label: "Sports & Fitness", icon: <Dumbbell className="h-4 w-4 mr-2" /> },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("")
  const carouselRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000) // Keep at 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Update carousel position when currentSlide changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * (100 / carouselItems.length)}%)`
    }
  }, [currentSlide])

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
  }

  const handleBookNow = () => {
    toast({
      title: "Event added to your cart!",
      description: `You've added ${carouselItems[currentSlide].title} to your cart.`,
      className: "toast-success",
    })
  }

  const handleExplore = () => {
    // Store search parameters in localStorage for the explore page to use
    const searchParams = {
      location: location || "",
      date: date ? format(date, "yyyy-MM-dd") : "",
      category: category || "",
    }
    localStorage.setItem("searchParams", JSON.stringify(searchParams))

    // Navigate to explore page
    window.location.href = "/explore"

    toast({
      title: "Showing results",
      description: `Showing results for ${location || "all locations"} and ${category || "all categories"}.`,
      className: "toast-info",
    })
  }

  return (
    <section className="relative w-full">
      {/* Carousel */}
      <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
        <div
          ref={carouselRef}
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ width: `${carouselItems.length * 100}%` }}
        >
          {carouselItems.map((item, index) => (
            <div key={item.id} className="relative h-full" style={{ width: `${100 / carouselItems.length}%` }}>
              {item.isGlassEffect ? (
                <div className="absolute inset-0 card-glass flex flex-col items-center justify-center p-6">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 gradient-text text-center">{item.title}</h2>
                  <p className="text-xl md:text-2xl text-white/80 text-center max-w-2xl">
                    Experience lightning-fast ticket booking with AI-powered recommendations
                  </p>
                  <Button
                    className="mt-8 gradient-bg-animated hover:opacity-90 text-white px-8 py-6 text-lg"
                    onClick={handleExplore}
                  >
                    Explore Events Now
                  </Button>
                </div>
              ) : (
                <>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">{item.title}</h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-6">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white" onClick={handleBookNow}>
                      Book Now
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 relative -mt-16 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Location"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Category" />
                </SelectTrigger>
                <SelectContent>
                  {eventCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center">
                        {category.icon}
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full gradient-bg hover:opacity-90" onClick={handleExplore}>
              <Search className="mr-2 h-4 w-4" />
              Explore Events
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

