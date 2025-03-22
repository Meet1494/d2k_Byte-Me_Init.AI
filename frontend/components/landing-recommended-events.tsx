"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"

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
    price: 8999,
    description:
      "Experience India's biggest electronic dance music festival featuring world-renowned DJs, stunning visuals, and an electric atmosphere on the beautiful beaches of Goa.",
  },
  {
    id: 2,
    title: "India Art Fair",
    date: "February 8-10, 2024",
    location: "NSIC Exhibition Grounds, Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Art",
    reason: "Based on your interest in Modern Art",
    price: 1500,
    description:
      "India's premier modern and contemporary art fair showcasing galleries, artists, and collectors from across South Asia and around the world.",
  },
  {
    id: 3,
    title: "Hornbill Festival",
    date: "December 1-10, 2023",
    location: "Kisama Heritage Village, Nagaland",
    image: "/placeholder.svg?height=300&width=400",
    category: "Culture",
    reason: "Based on your interest in Cultural Events",
    price: 2000,
    description:
      "Known as the 'Festival of Festivals,' this 10-day cultural extravaganza celebrates the heritage and traditions of Nagaland's 16 major tribes with music, dance, food, and crafts.",
  },
  {
    id: 4,
    title: "India Tech Summit 2023",
    date: "September 5-7, 2023",
    location: "Bangalore International Exhibition Centre",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    reason: "Based on your interest in Technology",
    price: 5999,
    description:
      "Connect with tech leaders, innovators, and investors at India's largest technology conference featuring keynotes, workshops, and networking opportunities.",
  },
  {
    id: 5,
    title: "Prithvi Theatre Festival",
    date: "November 3-12, 2023",
    location: "Prithvi Theatre, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Theater",
    reason: "Based on your interest in Theatre",
    price: 1200,
    description:
      "A celebration of theatrical arts featuring performances by renowned theater groups from across India, workshops, and discussions with industry veterans.",
  },
  {
    id: 6,
    title: "International Wine & Food Festival",
    date: "October 18-20, 2023",
    location: "The Leela Palace, Bengaluru",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food & Drink",
    reason: "Based on your interest in Culinary Arts",
    price: 3500,
    description:
      "Indulge in a gastronomic journey with tastings of premium wines from around the world paired with gourmet cuisine prepared by award-winning chefs.",
  },
  {
    id: 7,
    title: "Photography Masterclass with Raghu Rai",
    date: "August 12-13, 2023",
    location: "India Habitat Centre, Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Workshop",
    reason: "Based on your interest in Photography",
    price: 7500,
    description:
      "Learn from the legendary photographer Raghu Rai in this intensive two-day masterclass covering documentary photography, composition, and visual storytelling.",
  },
  {
    id: 8,
    title: "New Year's Eve at Taj Mahal Palace",
    date: "December 31, 2023",
    location: "Taj Mahal Palace, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Celebration",
    reason: "Based on your previous New Year's events",
    price: 12000,
    description:
      "Ring in the New Year in style at Mumbai's iconic Taj Mahal Palace with gourmet dining, live entertainment, and a spectacular view of the fireworks over the Gateway of India.",
  },
]

export default function RecommendedEvents({ showLoginRequiredToast }) {
  const [visibleEvents, setVisibleEvents] = useState(4)
  const [loading, setLoading] = useState(false)

  const handleShowMore = () => {
    setLoading(true)

    // Simulate loading delay
    setTimeout(() => {
      setVisibleEvents(Math.min(visibleEvents + 4, recommendedEvents.length))
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Recommended for You</h2>
        <p className="text-muted-foreground mb-8">Events curated based on your preferences and past activities.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedEvents.slice(0, visibleEvents).map((event) => (
            <EventCard key={event.id} event={event} showLoginRequiredToast={showLoginRequiredToast} />
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

