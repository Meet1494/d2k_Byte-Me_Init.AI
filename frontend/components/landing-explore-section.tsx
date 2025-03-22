"use client"
import EventCard from "@/components/event-card"

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
    category: "Art",
    price: 1500,
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
    category: "Food",
    price: 5000,
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
    category: "Workshop",
    price: 7500,
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
    category: "Gaming",
    price: 1200,
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
    category: "Wellness",
    price: 12000,
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
    category: "Science",
    price: 3500,
  },
]

export default function ExploreSection({ showLoginRequiredToast }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Discover New Experiences</h2>
        <p className="text-muted-foreground mb-8">Unique events and activities to expand your horizons.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {explorationEvents.map((event) => (
            <EventCard key={event.id} event={event} showLoginRequiredToast={showLoginRequiredToast} />
          ))}
        </div>
      </div>
    </section>
  )
}

