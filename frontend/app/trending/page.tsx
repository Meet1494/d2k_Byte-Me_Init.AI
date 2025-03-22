"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, TrendingUp, ArrowUp, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

// Mock trending events data
const trendingEvents = [
  {
    id: 1,
    title: "Ed Sheeran Mathematics Tour India",
    date: "March 15-16, 2024",
    location: "Jawaharlal Nehru Stadium, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    price: 9999,
    trendingRank: 1,
    percentageIncrease: 85,
    attendees: 45000,
    timeLeft: "3 months",
  },
  {
    id: 2,
    title: "Comic Con India",
    date: "December 10-12, 2023",
    location: "IEML, Greater Noida",
    image: "/placeholder.svg?height=300&width=400",
    category: "Entertainment",
    price: 1999,
    trendingRank: 2,
    percentageIncrease: 72,
    attendees: 25000,
    timeLeft: "2 weeks",
  },
  {
    id: 3,
    title: "International Film Festival of India",
    date: "November 20-28, 2023",
    location: "Kala Academy, Goa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Film",
    price: 3000,
    trendingRank: 3,
    percentageIncrease: 65,
    attendees: 12000,
    timeLeft: "1 month",
  },
  {
    id: 4,
    title: "Lakme Fashion Week",
    date: "October 11-15, 2023",
    location: "Jio World Convention Centre, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fashion",
    price: 7500,
    trendingRank: 4,
    percentageIncrease: 58,
    attendees: 8500,
    timeLeft: "2 months",
  },
  {
    id: 5,
    title: "Mumbai Marathon",
    date: "January 21, 2024",
    location: "Chhatrapati Shivaji Terminus, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sports",
    price: 2000,
    trendingRank: 5,
    percentageIncrease: 52,
    attendees: 20000,
    timeLeft: "3 months",
  },
]

// Mock trending by category
const trendingByCategory = {
  music: [
    {
      id: 101,
      title: "Jazz Festival",
      date: "August 5-7, 2023",
      location: "Central Park, New York",
      image: "/placeholder.svg?height=300&width=400",
      category: "Music",
      price: 85.0,
      trendingRank: 1,
      percentageIncrease: 78,
      attendees: 3800,
      timeLeft: "2 weeks",
    },
    {
      id: 102,
      title: "Rock Concert: The Rolling Stones",
      date: "August 15, 2023",
      location: "Madison Square Garden, New York",
      image: "/placeholder.svg?height=300&width=400",
      category: "Music",
      price: 120.0,
      trendingRank: 2,
      percentageIncrease: 65,
      attendees: 20000,
      timeLeft: "3 weeks",
    },
  ],
  sports: [
    {
      id: 201,
      title: "Basketball Championship",
      date: "July 28-30, 2023",
      location: "Sports Arena, Los Angeles",
      image: "/placeholder.svg?height=300&width=400",
      category: "Sports",
      price: 95.0,
      trendingRank: 1,
      percentageIncrease: 70,
      attendees: 18000,
      timeLeft: "1 week",
    },
    {
      id: 202,
      title: "Tennis Open",
      date: "August 20-27, 2023",
      location: "Tennis Center, Miami",
      image: "/placeholder.svg?height=300&width=400",
      category: "Sports",
      price: 110.0,
      trendingRank: 2,
      percentageIncrease: 62,
      attendees: 12000,
      timeLeft: "1 month",
    },
  ],
  food: [
    {
      id: 301,
      title: "Culinary Festival",
      date: "September 2-4, 2023",
      location: "Food Park, Chicago",
      image: "/placeholder.svg?height=300&width=400",
      category: "Food",
      price: 45.0,
      trendingRank: 1,
      percentageIncrease: 75,
      attendees: 8500,
      timeLeft: "1 month",
    },
    {
      id: 302,
      title: "Wine & Cheese Festival",
      date: "September 8, 2023",
      location: "Vineyard Park, Napa Valley",
      image: "/placeholder.svg?height=300&width=400",
      category: "Food",
      price: 65.0,
      trendingRank: 2,
      percentageIncrease: 60,
      attendees: 5000,
      timeLeft: "1.5 months",
    },
  ],
  art: [
    {
      id: 401,
      title: "Modern Art Exhibition",
      date: "October 15-30, 2023",
      location: "Art Gallery, San Francisco",
      image: "/placeholder.svg?height=300&width=400",
      category: "Art",
      price: 35.0,
      trendingRank: 1,
      percentageIncrease: 68,
      attendees: 7500,
      timeLeft: "2.5 months",
    },
    {
      id: 402,
      title: "Sculpture Showcase",
      date: "November 10-20, 2023",
      location: "Museum of Fine Arts, Boston",
      image: "/placeholder.svg?height=300&width=400",
      category: "Art",
      price: 30.0,
      trendingRank: 2,
      percentageIncrease: 55,
      attendees: 6000,
      timeLeft: "3 months",
    },
  ],
  technology: [
    {
      id: 501,
      title: "Tech Startup Conference",
      date: "October 20, 2023",
      location: "Innovation Center, San Francisco",
      image: "/placeholder.svg?height=300&width=400",
      category: "Technology",
      price: 150.0,
      trendingRank: 1,
      percentageIncrease: 80,
      attendees: 5000,
      timeLeft: "2.5 months",
    },
    {
      id: 502,
      title: "AI & Machine Learning Summit",
      date: "November 15-17, 2023",
      location: "Tech Campus, Seattle",
      image: "/placeholder.svg?height=300&width=400",
      category: "Technology",
      price: 180.0,
      trendingRank: 2,
      percentageIncrease: 72,
      attendees: 3500,
      timeLeft: "3 months",
    },
  ],
}

export default function TrendingPage() {
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  const handleBookNow = (eventTitle: string) => {
    toast({
      title: "Event added to your cart!",
      description: `You've added ${eventTitle} to your cart.`,
      className: "toast-success",
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Trending Events</h1>
          <p className="text-muted-foreground">Discover the hottest events that are gaining popularity right now.</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
            <TabsTrigger value="sports">Sports</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingEvents.map((event) => (
                <TrendingEventCard key={event.id} event={event} onBookNow={handleBookNow} />
              ))}
            </div>
          </TabsContent>

          {Object.entries(trendingByCategory).map(([category, events]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <TrendingEventCard key={event.id} event={event} onBookNow={handleBookNow} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 p-6 bg-card rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Why These Events Are Trending</h2>
          <p className="text-muted-foreground mb-6">
            Our AI-powered algorithm analyzes various factors to determine trending events, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-semibold">Ticket Sales Velocity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                How quickly tickets are being purchased compared to similar events.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-semibold">Social Engagement</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                The amount of social media buzz and user interactions related to the event.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="font-semibold">Time Sensitivity</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Events happening soon with high demand receive higher trending scores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TrendingEventCardProps {
  event: (typeof trendingEvents)[0]
  onBookNow: (eventTitle: string) => void
}

function TrendingEventCard({ event, onBookNow }: TrendingEventCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-white flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />#{event.trendingRank}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{event.category}</Badge>
          <div className="flex items-center text-green-500 text-sm font-medium">
            <ArrowUp className="h-3 w-3 mr-1" />
            {event.percentageIncrease}%
          </div>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">{event.attendees.toLocaleString()} attendees</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Starts in {event.timeLeft}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">₹{event.price.toFixed(2)}</span>
          <Button onClick={() => onBookNow(event.title)} className="gradient-bg hover:opacity-90">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

