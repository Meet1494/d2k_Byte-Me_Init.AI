"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  MapPin,
  Settings,
  Edit,
  Mail,
  Phone,
  LocateIcon as LocationIcon,
  Ticket,
  Heart,
  Clock,
  ChevronRight,
  Eye,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Event enthusiast and music lover. Always looking for the next great experience!",
  avatar: "/placeholder.svg?height=200&width=200",
  joinDate: "January 2022",
  eventsAttended: 24,
  upcomingEvents: 3,
}

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "September 12-14, 2023",
    location: "Tech Campus, San Francisco",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Jazz Festival",
    date: "August 5-7, 2023",
    location: "Central Park, New York",
    image: "/placeholder.svg?height=300&width=400",
  },
]

// Mock wishlist events
const wishlistEvents = [
  {
    id: 101,
    title: "Wine Tasting Tour",
    date: "November 18, 2023",
    location: "Napa Valley, California",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 102,
    title: "Fashion Week",
    date: "October 5-12, 2023",
    location: "Fashion District, New York",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 103,
    title: "International Film Festival",
    date: "September 15-25, 2023",
    location: "Various Theaters, Toronto",
    image: "/placeholder.svg?height=300&width=400",
  },
]

// Mock recent activity
const recentActivity = [
  {
    id: 1,
    type: "booked",
    event: "Tech Innovation Summit",
    date: "July 15, 2023",
  },
  {
    id: 2,
    type: "wishlist",
    event: "Fashion Week",
    date: "July 10, 2023",
  },
  {
    id: 3,
    type: "viewed",
    event: "Wine Tasting Tour",
    date: "July 8, 2023",
  },
  {
    id: 4,
    type: "booked",
    event: "Jazz Festival",
    date: "July 5, 2023",
  },
  {
    id: 5,
    type: "wishlist",
    event: "International Film Festival",
    date: "July 3, 2023",
  },
]

export default function ProfilePage() {
  const { toast } = useToast()

  const handleEditProfile = () => {
    toast({
      title: "Edit profile",
      description: "Profile editing functionality will be available soon.",
      className: "toast-info",
    })
  }

  const handleRemoveFromWishlist = (eventTitle: string) => {
    toast({
      title: "Removed from wishlist",
      description: `${eventTitle} has been removed from your wishlist.`,
      className: "toast-info",
    })
  }

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleEditProfile}>
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{userData.bio}</p>

              <div className="w-full space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.phone}</span>
                </div>
                <div className="flex items-center">
                  <LocationIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{userData.location}</span>
                </div>
              </div>

              <div className="w-full border-t mt-6 pt-6 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-2xl font-bold">{userData.eventsAttended}</p>
                  <p className="text-xs text-muted-foreground">Events Attended</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{userData.upcomingEvents}</p>
                  <p className="text-xs text-muted-foreground">Upcoming</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{wishlistEvents.length}</p>
                  <p className="text-xs text-muted-foreground">Wishlist</p>
                </div>
              </div>

              <div className="w-full mt-6">
                <Link href="/profile/settings">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <Ticket className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{userData.eventsAttended}</p>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{userData.upcomingEvents}</p>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <Heart className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{wishlistEvents.length}</p>
                  <p className="text-sm text-muted-foreground">Wishlist Items</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="upcoming">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Upcoming Events Tab */}
              <TabsContent value="upcoming">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {upcomingEvents.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="flex gap-4 items-center">
                            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span className="line-clamp-1">{event.date}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            </div>
                            <Link href="/my-events">
                              <Button size="sm">View</Button>
                            </Link>
                          </div>
                        ))}
                        <div className="pt-2">
                          <Link href="/my-events">
                            <Button variant="outline" className="w-full">
                              View All Events
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">You don't have any upcoming events.</p>
                        <Link href="/explore">
                          <Button>Explore Events</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlistEvents.length > 0 ? (
                      <div className="space-y-4">
                        {wishlistEvents.map((event) => (
                          <div key={event.id} className="flex gap-4 items-center">
                            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm line-clamp-1">{event.title}</h3>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span className="line-clamp-1">{event.date}</span>
                              </div>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" onClick={() => handleRemoveFromWishlist(event.title)}>
                                <X className="h-4 w-4" />
                              </Button>
                              <Button size="sm" onClick={() => handleBookNow(event.title)}>
                                Book
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                        <Link href="/explore">
                          <Button>Explore Events</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className="mt-0.5">
                            {activity.type === "booked" && (
                              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <Ticket className="h-4 w-4 text-green-600 dark:text-green-400" />
                              </div>
                            )}
                            {activity.type === "wishlist" && (
                              <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <Heart className="h-4 w-4 text-red-600 dark:text-red-400" />
                              </div>
                            )}
                            {activity.type === "viewed" && (
                              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <Eye className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">
                              {activity.type === "booked" && "You booked tickets for "}
                              {activity.type === "wishlist" && "You added to wishlist "}
                              {activity.type === "viewed" && "You viewed details for "}
                              <span className="font-medium">{activity.event}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {activity.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

