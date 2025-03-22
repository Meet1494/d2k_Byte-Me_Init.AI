"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import Link from "next/link"

// Update the mock friends data with Indian events
const friends = [
  {
    id: 1,
    name: "Arjun Sharma",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 101,
      title: "Arijit Singh Live in Concert",
      date: "September 15, 2023",
      location: "Jawaharlal Nehru Stadium, Delhi",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Experience the soulful voice of Arijit Singh live in concert as he performs his greatest hits from Bollywood and beyond.",
    },
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 102,
      title: "Goa Food & Wine Festival",
      date: "October 8, 2023",
      location: "Cavelossim Beach, Goa",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Sample the finest wines and Goan cuisine from local and international producers in the beautiful beaches of Goa.",
    },
  },
  {
    id: 3,
    name: "Rahul Mehta",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 103,
      title: "Bengaluru Tech Summit",
      date: "November 20, 2023",
      location: "Bangalore International Exhibition Centre",
      image: "/placeholder.svg?height=300&width=400",
      description: "Connect with founders, investors, and tech enthusiasts at this premier startup networking event.",
    },
  },
  {
    id: 4,
    name: "Neha Gupta",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 104,
      title: "Kochi-Muziris Biennale",
      date: "December 12, 2023",
      location: "Fort Kochi, Kerala",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Explore groundbreaking works from emerging and established artists at India's largest contemporary art exhibition.",
    },
  },
  {
    id: 5,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 105,
      title: "Mumbai Marathon",
      date: "January 21, 2024",
      location: "Chhatrapati Shivaji Terminus, Mumbai",
      image: "/placeholder.svg?height=300&width=400",
      description: "Join thousands of runners in this annual marathon through the historic streets of Mumbai.",
    },
  },
  {
    id: 6,
    name: "Ananya Reddy",
    avatar: "/placeholder.svg?height=100&width=100",
    event: {
      id: 106,
      title: "Comedy Night with Vir Das",
      date: "August 15, 2023",
      location: "The Comedy Store, Mumbai",
      image: "/placeholder.svg?height=300&width=400",
      description: "Enjoy a night of laughter with Vir Das performing his latest stand-up routine.",
    },
  },
]

export default function SocialConnections({ showLoginRequiredToast }) {
  const [selectedFriend, setSelectedFriend] = useState<(typeof friends)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAvatarClick = (friend: (typeof friends)[0]) => {
    setSelectedFriend(friend)
    setIsDialogOpen(true)
  }

  const handleJoinEvent = () => {
    showLoginRequiredToast()
    setIsDialogOpen(false)
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Events Your Friends Are Attending</h2>
        <p className="text-muted-foreground mb-8">Join your friends at these upcoming events.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex flex-col items-center text-center cursor-pointer"
              onClick={() => handleAvatarClick(friend)}
            >
              <Avatar className="h-20 w-20 mb-3 hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src={friend.avatar} alt={friend.name} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-sm mb-1">{friend.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{friend.event.title}</p>
            </div>
          ))}
        </div>
        <Link href="/stadium">
          <Button className="gradient-bg hover:opacity-90 mt-4">Explore Events</Button>
        </Link>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Event Details</DialogTitle>
              <DialogDescription>{selectedFriend?.name} is attending this event</DialogDescription>
            </DialogHeader>
            {selectedFriend && (
              <div className="mt-4">
                <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={selectedFriend.event.image || "/placeholder.svg"}
                    alt={selectedFriend.event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{selectedFriend.event.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{selectedFriend.event.date}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedFriend.event.location}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{selectedFriend.event.description}</p>
                <div className="flex justify-between">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleJoinEvent}>Join Event</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

