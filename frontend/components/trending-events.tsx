"use client"

import { useRef } from "react"
import Image from "next/image"
import { Calendar, MapPin, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"

// Mock trending events data
const trendingEvents = [
  {
    id: 1,
    title: "Coldplay Music of the Spheres World Tour",
    date: "January 22-24, 2024",
    time: "8:00 PM",
    location: "DY Patil Stadium, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    trendingLocation: "Mumbai",
    price: 9999,
  },
  {
    id: 2,
    title: "Comic Con India",
    date: "December 10-12, 2023",
    time: "10:00 AM",
    location: "IEML, Greater Noida",
    image: "/placeholder.svg?height=300&width=400",
    category: "Entertainment",
    trendingLocation: "Delhi NCR",
    price: 1999,
  },
  {
    id: 3,
    title: "International Film Festival of India",
    date: "November 20-28, 2023",
    time: "11:00 AM",
    location: "Kala Academy, Goa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Film",
    trendingLocation: "Goa",
    price: 3000,
  },
  {
    id: 4,
    title: "Lakme Fashion Week",
    date: "October 11-15, 2023",
    time: "2:00 PM",
    location: "Jio World Convention Centre, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fashion",
    trendingLocation: "Mumbai",
    price: 7500,
  },
  {
    id: 5,
    title: "Mumbai Marathon",
    date: "January 21, 2024",
    time: "5:30 AM",
    location: "Chhatrapati Shivaji Terminus, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sports",
    trendingLocation: "Mumbai",
    price: 2000,
  },
  {
    id: 6,
    title: "NH7 Weekender",
    date: "December 2-4, 2023",
    time: "3:00 PM",
    location: "Mahalaxmi Lawns, Pune",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    trendingLocation: "Pune",
    price: 4999,
  },
]

export default function TrendingEvents() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 340 // Approximate card width + gap

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  const handleBookNow = (event: any) => {
    // Add to cart
    const cartItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      category: event.category,
      price: event.price,
      quantity: 1,
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("tufanTicketCart") || "[]")

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === event.id)

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      existingCart[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      existingCart.push(cartItem)
    }

    // Save updated cart
    localStorage.setItem("tufanTicketCart", JSON.stringify(existingCart))

    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart!",
      description: `${event.title} has been added to your cart.`,
      className: "toast-success",
    })
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Trending Near You</h2>
            <p className="text-muted-foreground">Popular events that are gaining attention in your area.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => handleScroll("left")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleScroll("right")}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingEvents.map((event) => (
            <Card key={event.id} className="flex-shrink-0 w-[300px] overflow-hidden">
              <div className="relative h-40">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Trending
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This event is trending in {event.trendingLocation}!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <Button className="w-full" onClick={() => handleBookNow(event)}>
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

