"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock, Users, CreditCard, MessageSquare, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BookingSuccessPage() {
  const [countdown, setCountdown] = useState(5)
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [joinCommunity, setJoinCommunity] = useState(false)
  const [communityMembers, setCommunityMembers] = useState<any[]>([])
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Get booking details from localStorage
    const details = localStorage.getItem("bookingDetails")
    console.log("Retrieved booking details:", details)

    if (details) {
      try {
        const parsedDetails = JSON.parse(details)
        console.log("Parsed booking details:", parsedDetails)
        setBookingDetails(parsedDetails)

        // Automatically create and join the community for the booked event
        const communities = JSON.parse(localStorage.getItem("eventCommunities") || "[]")

        // Check if already a member
        if (!communities.some((c: any) => c.eventId === parsedDetails.eventId)) {
          communities.push({
            eventId: parsedDetails.eventId,
            eventTitle: parsedDetails.eventTitle,
            joinedAt: new Date().toISOString(),
            members: Math.floor(Math.random() * 500) + 100, // Random number of members
            image: parsedDetails.eventImage || "/placeholder.svg?height=300&width=400",
            lastActive: "just now",
            unreadMessages: 0,
          })
          localStorage.setItem("eventCommunities", JSON.stringify(communities))

          // Show toast notification about joining the community
          toast({
            title: "Community joined automatically!",
            description: `You've been added to the community for ${parsedDetails.eventTitle}.`,
            className: "toast-success",
          })
        }

        // Don't remove the booking details yet - keep them for reference
        // We'll let the user navigate away naturally
      } catch (error) {
        console.error("Error parsing booking details:", error)
        toast({
          title: "Error loading booking details",
          description: "There was a problem loading your booking information.",
          className: "toast-error",
        })
        // If there's an error, redirect back to stadium page
        setTimeout(() => router.push("/stadium"), 3000)
      }
    } else {
      // If no booking details, show error and redirect
      console.error("No booking details found in localStorage")
      toast({
        title: "Booking information not found",
        description: "We couldn't find your booking information. Redirecting to events page...",
        className: "toast-error",
      })
      // Redirect to stadium page after a short delay
      setTimeout(() => router.push("/stadium"), 3000)
    }

    // Generate random community members
    setCommunityMembers([
      { id: 1, name: "Sarah J.", avatar: "/placeholder.svg?height=40&width=40&text=SJ" },
      { id: 2, name: "Michael C.", avatar: "/placeholder.svg?height=40&width=40&text=MC" },
      { id: 3, name: "Emma W.", avatar: "/placeholder.svg?height=40&width=40&text=EW" },
      { id: 4, name: "David K.", avatar: "/placeholder.svg?height=40&width=40&text=DK" },
      { id: 5, name: "Olivia M.", avatar: "/placeholder.svg?height=40&width=40&text=OM" },
    ])

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Only redirect if user hasn't chosen to join community
          if (!joinCommunity) {
            router.push("/my-events")
          }
          return 0
        }
        return prev - 1
      })
    }, 10000)

    return () => clearInterval(timer)
  }, [router, toast])

  // Update the handleJoinCommunity function to show a different message since we already joined automatically
  const handleJoinCommunity = () => {
    setJoinCommunity(true)

    toast({
      title: "Navigating to community",
      description: `Opening the community chat for ${bookingDetails.eventTitle}.`,
      className: "toast-info",
    })

    // Redirect to community page
    setTimeout(() => {
      router.push(`/communities/${bookingDetails.eventId}`)
    }, 1000)
  }

  if (!bookingDetails) {
    return null // Loading or redirect will happen
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute -z-10 top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute -z-10 bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -z-10 top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full blur-3xl animate-float-fast"></div>

          <Card className="card-glass overflow-hidden border-white/10 shadow-glow">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary via-accent to-secondary p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <Check className="h-10 w-10 text-white" />
                    <div className="absolute inset-0 rounded-full border-4 border-white animate-pulse-subtle"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2 glow-text">Booking Successful!</h1>
                <p className="text-white/90 text-lg">
                  Your tickets have been booked and confirmation has been sent to your email.
                </p>
              </div>

              <div className="p-8 space-y-8">
                {bookingDetails ? (
                  <div className="card-glass rounded-xl p-6 border border-white/10">
                    <h2 className="text-2xl font-bold mb-4 gradient-text">{bookingDetails.eventTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium text-white">{bookingDetails.eventDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-medium text-white">{bookingDetails.eventTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium text-white">{bookingDetails.eventLocation}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Tickets</p>
                          <p className="font-medium text-white">
                            {bookingDetails.quantity} x {bookingDetails.section}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <div className="flex items-start">
                        <CreditCard className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Payment</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-muted-foreground mr-4">Subtotal:</span>
                                <span className="text-sm text-white">₹{bookingDetails.price?.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm text-muted-foreground mr-4">Service Fee:</span>
                                <span className="text-sm text-white">₹{bookingDetails.serviceFee?.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span className="mr-4">Total:</span>
                                <span>₹{bookingDetails.totalPrice?.toFixed(2)}</span>
                              </div>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                              Paid Successfully
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Booking Reference:{" "}
                            {bookingDetails.bookingReference ||
                              `TF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Booked on: {new Date(bookingDetails.bookingTime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card-glass rounded-xl p-6 border border-white/10 text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h2 className="text-xl font-bold mb-2">Loading booking details...</h2>
                    <p className="text-muted-foreground">Please wait while we retrieve your booking information.</p>
                  </div>
                )}

                <div className="card-glass rounded-xl p-6 border border-white/10 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/10 rounded-full blur-xl"></div>
                  <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <MessageSquare className="h-6 w-6 mr-3 text-accent" />
                      <h3 className="text-xl font-bold gradient-text">Join the Event Community</h3>
                    </div>

                    <p className="text-white/80 mb-6">
                      Connect with other attendees, share your excitement, and stay updated with event news.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Community Members</p>
                        <div className="flex -space-x-2">
                          {communityMembers.map((member) => (
                            <Avatar key={member.id} className="border-2 border-background w-10 h-10">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="bg-primary text-white">
                                {member.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 text-accent text-xs border-2 border-background">
                            +{Math.floor(Math.random() * 100) + 50}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="gradient-bg-animated hover:opacity-90 w-full md:w-auto"
                        size="lg"
                        onClick={handleJoinCommunity}
                      >
                        <span>Join Community</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-white/10 hover:bg-white/20 transition-colors">#EventUpdates</Badge>
                      <Badge className="bg-white/10 hover:bg-white/20 transition-colors">#MeetAttendees</Badge>
                      <Badge className="bg-white/10 hover:bg-white/20 transition-colors">#ExclusiveContent</Badge>
                      <Badge className="bg-white/10 hover:bg-white/20 transition-colors">#Discussions</Badge>
                    </div>
                  </div>
                </div>

                {!joinCommunity && (
                  <div className="text-center">
                    <p className="text-muted-foreground animate-pulse-subtle">
                      Redirecting to My Events in {countdown} seconds...
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 transition-colors"
                    onClick={() => router.push("/my-events")}
                  >
                    View My Tickets
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 transition-colors"
                    onClick={() => router.push("/explore")}
                  >
                    Explore More Events
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

