"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"

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
    description:
      "Experience Coldplay's spectacular Music of the Spheres World Tour featuring their greatest hits and new music in an immersive, planet-friendly concert production.",
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
    description:
      "India's largest pop culture event bringing together comics, movies, TV shows, merchandise, gaming and cosplay in an exciting 3-day extravaganza.",
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
    description:
      "One of Asia's oldest and India's biggest film festivals showcasing a selection of the best films from India and around the world.",
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
    description:
      "India's premier fashion event showcasing the latest collections from top designers and emerging talent in the fashion industry.",
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
    description:
      "Asia's largest marathon and a World Athletics Gold Label Road Race that brings together elite athletes, amateur runners, and charity fundraisers.",
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
    description:
      "India's happiest music festival featuring multiple stages with performances by Indian and international artists across various genres.",
  },
]

export default function TrendingEvents({ showLoginRequiredToast }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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
            <div key={event.id} className="flex-shrink-0 w-[300px]">
              <EventCard event={event} showLoginRequiredToast={showLoginRequiredToast} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

