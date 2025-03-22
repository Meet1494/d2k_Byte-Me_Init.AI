"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

// Mock user events data
const upcomingEvents = [
  {
    id: 1,
    title: "Tech Innovation Summit",
    date: "September 12-14, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Tech Campus, San Francisco",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    ticketType: "VIP Pass",
    ticketId: "TIS-VIP-12345",
    price: 199.99,
    purchaseDate: "July 15, 2023",
  },
  {
    id: 2,
    title: "Jazz Festival",
    date: "August 5-7, 2023",
    time: "6:00 PM - 11:00 PM",
    location: "Central Park, New York",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    ticketType: "General Admission",
    ticketId: "JF-GA-67890",
    price: 85.0,
    purchaseDate: "July 10, 2023",
  },
  {
    id: 3,
    title: "Wine Tasting Tour",
    date: "August 20, 2023",
    time: "2:00 PM - 6:00 PM",
    location: "Napa Valley, California",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    ticketType: "Premium Experience",
    ticketId: "WTT-PE-24680",
    price: 120.0,
    purchaseDate: "July 5, 2023",
  },
]

const pastEvents = [
  {
    id: 101,
    title: "Modern Art Exhibition",
    date: "June 15-20, 2023",
    time: "10:00 AM - 8:00 PM",
    location: "Art Gallery, Chicago",
    image: "/placeholder.svg?height=300&width=400",
    category: "Art",
    ticketType: "General Admission",
    ticketId: "MAE-GA-13579",
    price: 25.0,
    purchaseDate: "June 1, 2023",
  },
  {
    id: 102,
    title: "Rock Concert: The Rolling Stones",
    date: "May 28, 2023",
    time: "7:30 PM - 11:00 PM",
    location: "Stadium, Los Angeles",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    ticketType: "Front Row",
    ticketId: "RC-FR-97531",
    price: 250.0,
    purchaseDate: "April 15, 2023",
  },
  {
    id: 103,
    title: "Food Festival",
    date: "April 8-10, 2023",
    time: "11:00 AM - 9:00 PM",
    location: "Downtown, Miami",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    ticketType: "Weekend Pass",
    ticketId: "FF-WP-86420",
    price: 75.0,
    purchaseDate: "March 20, 2023",
  },
]

export default function MyEventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [isTicketOpen, setIsTicketOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleViewTicket = (event: any) => {
    setSelectedEvent(event)
    setIsTicketOpen(true)
  }

  const handleCancelTicket = (event: any) => {
    setSelectedEvent(event)
    setIsCancelDialogOpen(true)
  }

  const confirmCancelTicket = () => {
    toast({
      title: "Ticket cancelled",
      description: `Your ticket for ${selectedEvent?.title} has been cancelled.`,
      className: "toast-info",
    })
    setIsCancelDialogOpen(false)
  }

  const handleDownloadTicket = () => {
    toast({
      title: "Ticket downloaded",
      description: "Your ticket has been downloaded successfully.",
      className: "toast-success",
    })
  }

  const handleShareTicket = () => {
    toast({
      title: "Ticket shared",
      description: "A link to your ticket has been copied to clipboard.",
      className: "toast-success",
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Events</h1>
          <p className="text-muted-foreground">Manage your upcoming and past event tickets.</p>
        </div>

        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-white">{event.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xs text-muted-foreground block">Ticket Type</span>
                          <span className="font-medium">{event.ticketType}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground block">Price</span>
                          <span className="font-medium">${event.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 gradient-bg hover:opacity-90" onClick={() => handleViewTicket(event)}>
                          View Ticket
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={() => handleCancelTicket(event)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                <p className="text-muted-foreground mb-4">You don't have any upcoming events booked.</p>
                <Button onClick={() => (window.location.href = "/explore")}>Explore Events</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-background/80">
                          {event.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-xs text-muted-foreground block">Ticket Type</span>
                          <span className="font-medium">{event.ticketType}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-muted-foreground block">Price</span>
                          <span className="font-medium">${event.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline" onClick={() => handleViewTicket(event)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No past events</h3>
                <p className="text-muted-foreground mb-4">You haven't attended any events yet.</p>
                <Button onClick={() => (window.location.href = "/explore")}>Explore Events</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Ticket Dialog */}
        <Dialog open={isTicketOpen} onOpenChange={setIsTicketOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Event Ticket</DialogTitle>
              <DialogDescription>Your ticket details for {selectedEvent?.title}</DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <div className="mt-4">
                <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 border rounded-lg mb-4">
                  <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium block">{selectedEvent.date}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time:</span>
                      <span className="font-medium block">{selectedEvent.time}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium block">{selectedEvent.location}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ticket Type:</span>
                      <span className="font-medium block">{selectedEvent.ticketType}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ticket ID:</span>
                      <span className="font-medium block">{selectedEvent.ticketId}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Purchase Date:</span>
                      <span className="font-medium block">{selectedEvent.purchaseDate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium block">${selectedEvent.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" className="flex items-center" onClick={handleDownloadTicket}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex items-center" onClick={handleShareTicket}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Cancel Ticket Dialog */}
        <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Ticket</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your ticket for {selectedEvent?.title}?
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Please note that cancellation policies may apply. You may receive a full or partial refund depending on
                the event's cancellation policy.
              </p>
              <div className="flex justify-between">
                <DialogClose asChild>
                  <Button variant="outline">Keep Ticket</Button>
                </DialogClose>
                <Button variant="destructive" onClick={confirmCancelTicket}>
                  Cancel Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

