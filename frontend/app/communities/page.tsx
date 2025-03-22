"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, MessageSquare, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Mock community data
const mockCommunities = [
  {
    eventId: 101,
    eventTitle: "Taylor Swift: The Eras Tour",
    joinedAt: "2023-06-15T10:30:00Z",
    members: 1245,
    lastActive: "2 minutes ago",
    image: "/placeholder.svg?height=300&width=400",
    unreadMessages: 5,
  },
  {
    eventId: 102,
    eventTitle: "NBA Finals: Lakers vs Celtics",
    joinedAt: "2023-07-20T14:45:00Z",
    members: 876,
    lastActive: "1 hour ago",
    image: "/placeholder.svg?height=300&width=400",
    unreadMessages: 0,
  },
  {
    eventId: 103,
    eventTitle: "World Cup Finals: Team A vs Team B",
    joinedAt: "2023-08-01T09:15:00Z",
    members: 2134,
    lastActive: "3 hours ago",
    image: "/placeholder.svg?height=300&width=400",
    unreadMessages: 12,
  },
]

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get communities from localStorage
    const storedCommunities = JSON.parse(localStorage.getItem("eventCommunities") || "[]")

    // If no communities in localStorage, use mock data
    if (storedCommunities.length === 0) {
      localStorage.setItem("eventCommunities", JSON.stringify(mockCommunities))
      setCommunities(mockCommunities)
    } else {
      setCommunities(storedCommunities)
    }

    setLoading(false)
  }, [])

  const handleLeaveCommunity = (eventId: number) => {
    // Remove community from localStorage
    const updatedCommunities = communities.filter((c) => c.eventId !== eventId)
    localStorage.setItem("eventCommunities", JSON.stringify(updatedCommunities))
    setCommunities(updatedCommunities)

    toast({
      title: "Left community",
      description: "You have successfully left the community.",
      className: "toast-info",
    })
  }

  // Add the handleRSVP function to handle RSVP button clicks
  const handleRSVP = (eventTitle: string) => {
    // Add the user to the event's attendee list (in a real app, this would be a database operation)

    // Show success toast
    toast({
      title: "RSVP Successful!",
      description: `You're now attending the ${eventTitle}. We've added you to the event group.`,
      className: "toast-success",
    })

    // Add this event to communities if not already there
    const communities = JSON.parse(localStorage.getItem("eventCommunities") || "[]")

    // Check if a community with a similar name already exists
    const communityExists = communities.some((community: any) =>
      community.eventTitle.toLowerCase().includes(eventTitle.toLowerCase()),
    )

    if (!communityExists) {
      // Create a new community for this event
      const newCommunity = {
        eventId: Date.now(), // Generate a unique ID
        eventTitle: eventTitle,
        joinedAt: new Date().toISOString(),
        members: Math.floor(Math.random() * 100) + 50, // Random number of members
        lastActive: "just now",
        image: "/placeholder.svg?height=300&width=400",
        unreadMessages: 3, // Start with some unread messages
      }

      communities.push(newCommunity)
      localStorage.setItem("eventCommunities", JSON.stringify(communities))

      // Update the communities state to reflect the change immediately
      setCommunities(communities)
    }
  }

  if (loading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-white">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-white">My Communities</h1>
          <p className="text-white/80">Connect with other event attendees and stay updated with event news.</p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-white/10 text-white">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary">
              All Communities
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-primary">
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {communities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((community) => (
                  <Card key={community.eventId} className="card-glass overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src={community.image || "/placeholder.svg?height=300&width=400"}
                        alt={community.eventTitle}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-bold text-lg text-white line-clamp-1">{community.eventTitle}</h3>
                        <div className="flex items-center text-sm text-white/80">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{community.members.toLocaleString()} members</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1 text-white/60" />
                          <span className="text-sm text-white/80">Last active: {community.lastActive}</span>
                        </div>
                        {community.unreadMessages > 0 && (
                          <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                            {community.unreadMessages} new
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleLeaveCommunity(community.eventId)}>
                          Leave
                        </Button>
                        <Link href={`/communities/${community.eventId}`}>
                          <Button size="sm" className="gradient-bg hover:opacity-90">
                            Open Chat
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/5 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-white">No communities joined</h3>
                <p className="text-white/80 mb-4">You haven't joined any event communities yet.</p>
                <Link href="/events/stadium">
                  <Button className="gradient-bg hover:opacity-90">Explore Events</Button>
                </Link>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {communities.length > 0 ? (
                  <div className="space-y-4">
                    {communities.map((community) => (
                      <Link
                        key={community.eventId}
                        href={`/communities/${community.eventId}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="relative w-12 h-12 rounded-md overflow-hidden mr-3">
                            <Image
                              src={community.image || "/placeholder.svg?height=100&width=100"}
                              alt={community.eventTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{community.eventTitle}</h3>
                            <p className="text-sm text-white/60">Last active: {community.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {community.unreadMessages > 0 && (
                            <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                              {community.unreadMessages}
                            </div>
                          )}
                          <ChevronRight className="h-5 w-5 text-white/60" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/80 mb-4">You haven't joined any event communities yet.</p>
                    <Link href="/events/stadium">
                      <Button className="gradient-bg hover:opacity-90">Explore Events</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="card-glass mb-8">
          <CardHeader>
            <CardTitle>Upcoming Community Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-white/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">Taylor Swift Fan Meetup</h3>
                  <Badge className="bg-primary text-white">Tomorrow</Badge>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Join fellow Swifties for a pre-concert meetup at Central Park. Bring your friendship bracelets!
                </p>
                <div className="flex items-center text-sm text-white/60 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>September 21, 2023 - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-background w-8 h-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs border-2 border-background">
                      +42
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="gradient-bg hover:opacity-90"
                    onClick={() => handleRSVP("Taylor Swift Fan Meetup")}
                  >
                    RSVP
                  </Button>
                </div>
              </div>

              <div className="p-4 border border-white/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">NBA Finals Watch Party</h3>
                  <Badge className="bg-primary text-white">Next Week</Badge>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Watch the finals with other fans at Sports Bar & Grill. First drink is on us!
                </p>
                <div className="flex items-center text-sm text-white/60 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>October 9, 2023 - 6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <Avatar key={i} className="border-2 border-background w-8 h-8">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs border-2 border-background">
                      +28
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="gradient-bg hover:opacity-90"
                    onClick={() => handleRSVP("NBA Finals Watch Party")}
                  >
                    RSVP
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

