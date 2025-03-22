"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

// Update the mock recommended events data with Indian events
const recommendedEvents = [
  {
    id: 1,
    title: "Sunburn Festival Goa",
    date: "December 28-30, 2023",
    location: "Vagator Beach, Goa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    reason: "Based on your interest in EDM",
  },
  {
    id: 2,
    title: "India Art Fair",
    date: "February 8-10, 2024",
    location: "NSIC Exhibition Grounds, Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Art",
    reason: "Based on your interest in Modern Art",
  },
  {
    id: 3,
    title: "Hornbill Festival",
    date: "December 1-10, 2023",
    location: "Kisama Heritage Village, Nagaland",
    image: "/placeholder.svg?height=300&width=400",
    category: "Culture",
    reason: "Based on your interest in Cultural Events",
  },
  {
    id: 4,
    title: "India Tech Summit 2023",
    date: "September 5-7, 2023",
    location: "Bangalore International Exhibition Centre",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    reason: "Based on your interest in Technology",
  },
  {
    id: 5,
    title: "Prithvi Theatre Festival",
    date: "November 3-12, 2023",
    location: "Prithvi Theatre, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Theater",
    reason: "Based on your interest in Theatre",
  },
  {
    id: 6,
    title: "International Wine & Food Festival",
    date: "October 18-20, 2023",
    location: "The Leela Palace, Bengaluru",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food & Drink",
    reason: "Based on your interest in Culinary Arts",
  },
  {
    id: 7,
    title: "Photography Masterclass with Raghu Rai",
    date: "August 12-13, 2023",
    location: "India Habitat Centre, Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Workshop",
    reason: "Based on your interest in Photography",
  },
  {
    id: 8,
    title: "New Year's Eve at Taj Mahal Palace",
    date: "December 31, 2023",
    location: "Taj Mahal Palace, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Celebration",
    reason: "Based on your previous New Year's events",
  },
]

export default function RecommendedEvents() {
  const [visibleEvents, setVisibleEvents] = useState(4)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleShowMore = () => {
    setLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setVisibleEvents(Math.min(visibleEvents + 4, recommendedEvents.length))
      setLoading(false)
    }, 1000)
  }

  const handleQuickBook = (event: any) => {
    // Add to cart
    const cartItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      time: "7:00 PM", // Default time
      location: event.location,
      image: event.image,
      category: event.category,
      price: Math.floor(Math.random() * 5000) + 1000, // Random price between 1000-6000
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
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
        <p className="text-muted-foreground mb-8">Events curated based on your preferences and past activities.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedEvents.slice(0, visibleEvents).map((event) => (
            <Card key={event.id} className="overflow-hidden group">
              <div className="relative h-48">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button className="bg-primary hover:bg-primary/90" onClick={() => handleQuickBook(event)}>
                    Quick Book
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className="mb-2">
                  {event.category}
                </Badge>
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Tag className="h-3 w-3 mr-1" />
                  <span>{event.reason}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {visibleEvents < recommendedEvents.length && (
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg" onClick={handleShowMore} disabled={loading}>
              {loading ? "Loading..." : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

