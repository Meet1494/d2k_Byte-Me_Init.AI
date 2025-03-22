"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

// Update the mock exploration events data with Indian experiences
const explorationEvents = [
  {
    id: 1,
    title: "Immersive Van Gogh Exhibition",
    date: "September 10-30, 2023",
    location: "World Trade Centre, Mumbai",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Step inside the iconic works of Van Gogh in this breathtaking digital experience",
    description:
      "Experience the works of Vincent van Gogh like never before in this immersive digital art exhibition. Walk through giant projections of his most famous paintings and be surrounded by his post-impressionist genius.",
  },
  {
    id: 2,
    title: "Masterclass with Chef Sanjeev Kapoor",
    date: "August 12, 2023",
    location: "The Oberoi, New Delhi",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Learn the secrets of Indian cuisine from a legendary chef",
    description:
      "Join Chef Sanjeev Kapoor for an intimate cooking class where you'll learn to prepare authentic Indian dishes using traditional techniques and fresh, seasonal ingredients. Perfect for food enthusiasts of all skill levels.",
  },
  {
    id: 3,
    title: "Himalayan Survival Workshop",
    date: "October 18-20, 2023",
    location: "Rishikesh, Uttarakhand",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Discover essential outdoor skills in the beautiful Himalayas",
    description:
      "Learn practical wilderness survival skills including fire-making, shelter building, navigation, and foraging for food. This hands-on workshop takes place in the stunning Himalayan foothills with expert guides.",
  },
  {
    id: 4,
    title: "Virtual Reality Gaming Tournament",
    date: "November 25, 2023",
    location: "Phoenix Marketcity, Bengaluru",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Compete in cutting-edge VR games for amazing prizes",
    description:
      "Step into the future of gaming at this VR tournament featuring the latest technology and games. Compete against other players in immersive virtual worlds for a chance to win tech prizes and gaming gear.",
  },
  {
    id: 5,
    title: "Aerial Yoga Retreat",
    date: "December 15-17, 2023",
    location: "Ishavilas Wellness Retreat, Goa",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Elevate your yoga practice with this transformative aerial experience",
    description:
      "Combine traditional yoga with aerial arts in this unique retreat. Suspended in silk hammocks, you'll achieve deeper stretches, build core strength, and experience the joy of flying while surrounded by Goa's beautiful beaches.",
  },
  {
    id: 6,
    title: "Astronomy Night: Meteor Shower",
    date: "December 13, 2023",
    location: "Nubra Valley, Ladakh",
    image: "/placeholder.svg?height=400&width=600",
    tagline: "Witness the spectacular Geminid meteor shower with expert astronomers",
    description:
      "Join astronomers for a special viewing of the Geminid meteor shower, one of the most spectacular celestial events of the year. Use professional telescopes and learn about the night sky in this unforgettable experience.",
  },
]

// Update the handleBookNow function to use ₹ symbol

export default function ExploreSection() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const { toast } = useToast()

  const handleCardFlip = (id: number) => {
    setFlippedCard(flippedCard === id ? null : id)
  }

  const handleBookNow = (eventTitle: string) => {
    toast({
      title: "Ticket booked successfully!",
      description: `You've booked a ticket for ${eventTitle}.`,
      className: "toast-success",
    })
    setFlippedCard(null)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Discover New Experiences</h2>
        <p className="text-muted-foreground mb-8">Unique events and activities to expand your horizons.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorationEvents.map((event) => (
            <div
              key={event.id}
              className="relative h-[400px] perspective-1000"
              onMouseEnter={() => handleCardFlip(event.id)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`absolute w-full h-full transition-all duration-500 preserve-3d ${
                  flippedCard === event.id ? "rotate-y-180" : ""
                }`}
                style={{
                  transform: flippedCard === event.id ? "rotateY(180deg)" : "rotateY(0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front of card */}
                <div
                  className="absolute w-full h-full backface-hidden rounded-lg overflow-hidden shadow-md"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="relative w-full h-full">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center text-sm mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-sm italic">"{event.tagline}"</p>
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div
                  className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow">{event.description}</p>
                  <Button className="w-full gradient-bg hover:opacity-90" onClick={() => handleBookNow(event.title)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

