"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Send,
  Info,
  Phone,
  Video,
  Paperclip,
  Smile,
  ImageIcon,
  Users,
  Calendar,
  MapPin,
  Star,
  Heart,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"

// Mock user data
const mockUsers = [
  { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg?height=100&width=100&text=SJ" },
  { id: 2, name: "Michael Chen", avatar: "/placeholder.svg?height=100&width=100&text=MC" },
  { id: 3, name: "Emma Wilson", avatar: "/placeholder.svg?height=100&width=100&text=EW" },
  { id: 4, name: "David Kim", avatar: "/placeholder.svg?height=100&width=100&text=DK" },
  { id: 5, name: "Olivia Martinez", avatar: "/placeholder.svg?height=100&width=100&text=OM" },
  { id: 6, name: "James Taylor", avatar: "/placeholder.svg?height=100&width=100&text=JT" },
  { id: 7, name: "Sophia Lee", avatar: "/placeholder.svg?height=100&width=100&text=SL" },
  { id: 8, name: "Ethan Brown", avatar: "/placeholder.svg?height=100&width=100&text=EB" },
  { id: 9, name: "Ava Garcia", avatar: "/placeholder.svg?height=100&width=100&text=AG" },
  { id: 10, name: "Noah Williams", avatar: "/placeholder.svg?height=100&width=100&text=NW" },
]

// Mock messages for different communities
const mockMessages = {
  "101": [
    {
      id: 1,
      userId: 3,
      text: "Hey everyone! So excited for the Taylor Swift concert! 🎵",
      timestamp: "2023-09-10T14:30:00Z",
    },
    { id: 2, userId: 5, text: "Me too! I've been waiting for this for months!", timestamp: "2023-09-10T14:32:00Z" },
    { id: 3, userId: 2, text: "Does anyone know what time the doors open?", timestamp: "2023-09-10T14:35:00Z" },
    { id: 4, userId: 7, text: "I think it's 6:30 PM, but let me double check...", timestamp: "2023-09-10T14:37:00Z" },
    { id: 5, userId: 7, text: "Just checked the ticket - doors open at 6:00 PM!", timestamp: "2023-09-10T14:38:00Z" },
    { id: 6, userId: 2, text: "Thanks for checking! 👍", timestamp: "2023-09-10T14:40:00Z" },
    { id: 7, userId: 1, text: "Is anyone planning to get there early for merch?", timestamp: "2023-09-10T14:45:00Z" },
    {
      id: 8,
      userId: 9,
      text: "Yes! I heard the lines get crazy long. I'm planning to be there at 4:30.",
      timestamp: "2023-09-10T14:47:00Z",
    },
    {
      id: 9,
      userId: 4,
      text: "That's a good idea. The merch sells out fast at her shows.",
      timestamp: "2023-09-10T14:50:00Z",
    },
    {
      id: 10,
      userId: 8,
      text: "What section is everyone sitting in? I'm in Section 224.",
      timestamp: "2023-09-10T14:55:00Z",
    },
    {
      id: 11,
      userId: 6,
      text: "I'm in the floor section! So excited to be close to the stage!",
      timestamp: "2023-09-10T14:57:00Z",
    },
    {
      id: 12,
      userId: 3,
      text: "I'm in 118, pretty close to the stage but on the side.",
      timestamp: "2023-09-10T15:00:00Z",
    },
    { id: 13, userId: 10, text: "Anyone know if we're allowed to bring signs?", timestamp: "2023-09-10T15:05:00Z" },
    {
      id: 14,
      userId: 5,
      text: "Yes, but they have size restrictions. I think it's nothing larger than 11x17 inches.",
      timestamp: "2023-09-10T15:08:00Z",
    },
    { id: 15, userId: 1, text: "And no poles or sticks attached to signs!", timestamp: "2023-09-10T15:10:00Z" },
  ],
  "102": [
    { id: 1, userId: 8, text: "Lakers vs Celtics! This is going to be epic! 🏀", timestamp: "2023-09-15T10:20:00Z" },
    { id: 2, userId: 4, text: "The rivalry continues! Who's everyone rooting for?", timestamp: "2023-09-15T10:22:00Z" },
    { id: 3, userId: 2, text: "Lakers all the way! 💜💛", timestamp: "2023-09-15T10:25:00Z" },
    { id: 4, userId: 9, text: "Celtics fan here! ☘️", timestamp: "2023-09-15T10:27:00Z" },
    { id: 5, userId: 6, text: "This is my first NBA game in person. Any tips?", timestamp: "2023-09-15T10:30:00Z" },
    {
      id: 6,
      userId: 1,
      text: "Get there early to watch warm-ups! It's really cool to see the players up close.",
      timestamp: "2023-09-15T10:32:00Z",
    },
    {
      id: 7,
      userId: 3,
      text: "And the food is expensive, so eat before or bring snacks if they allow it.",
      timestamp: "2023-09-15T10:35:00Z",
    },
    {
      id: 8,
      userId: 7,
      text: "Anyone know if LeBron is playing? I heard he might be injured.",
      timestamp: "2023-09-15T10:40:00Z",
    },
    {
      id: 9,
      userId: 10,
      text: "He was listed as probable on the injury report, so he'll likely play.",
      timestamp: "2023-09-15T10:42:00Z",
    },
    {
      id: 10,
      userId: 5,
      text: "I'm so excited to see Tatum play. He's been on fire lately!",
      timestamp: "2023-09-15T10:45:00Z",
    },
  ],
  "103": [
    {
      id: 1,
      userId: 6,
      text: "World Cup Finals! Who's ready for the match of the year? ⚽",
      timestamp: "2023-09-20T09:15:00Z",
    },
    {
      id: 2,
      userId: 2,
      text: "I can't believe we got tickets! This is a once in a lifetime experience.",
      timestamp: "2023-09-20T09:17:00Z",
    },
    {
      id: 3,
      userId: 9,
      text: "Team A all the way! They've been unstoppable this tournament.",
      timestamp: "2023-09-20T09:20:00Z",
    },
    {
      id: 4,
      userId: 4,
      text: "I'm rooting for Team B! The underdogs always make for a better story.",
      timestamp: "2023-09-20T09:22:00Z",
    },
    {
      id: 5,
      userId: 7,
      text: "Does anyone know if there are any pre-game festivities?",
      timestamp: "2023-09-20T09:25:00Z",
    },
    {
      id: 6,
      userId: 1,
      text: "Yes! There's a fan zone opening 5 hours before kickoff with games, food, and entertainment.",
      timestamp: "2023-09-20T09:27:00Z",
    },
    {
      id: 7,
      userId: 10,
      text: "I heard parking is going to be a nightmare. Anyone planning to use public transport?",
      timestamp: "2023-09-20T09:30:00Z",
    },
    {
      id: 8,
      userId: 3,
      text: "Definitely taking the train. They're adding extra services for the match.",
      timestamp: "2023-09-20T09:32:00Z",
    },
    {
      id: 9,
      userId: 5,
      text: "I'm flying in from out of town. Anyone know good hotels near the stadium?",
      timestamp: "2023-09-20T09:35:00Z",
    },
    {
      id: 10,
      userId: 8,
      text: "The Marriott is about a 10-minute walk and they still had rooms last I checked.",
      timestamp: "2023-09-20T09:37:00Z",
    },
    { id: 11, userId: 2, text: "Anyone bringing flags or banners?", timestamp: "2023-09-20T09:40:00Z" },
    {
      id: 12,
      userId: 6,
      text: "I've got a huge flag! Look for me in the north stand!",
      timestamp: "2023-09-20T09:42:00Z",
    },
  ],
}

// Mock community details
const mockCommunityDetails = {
  "101": {
    eventId: 101,
    eventTitle: "Taylor Swift: The Eras Tour",
    date: "September 22, 2023",
    location: "MetLife Stadium, New Jersey",
    image: "/placeholder.svg?height=300&width=400",
    members: 1245,
  },
  "102": {
    eventId: 102,
    eventTitle: "NBA Finals: Lakers vs Celtics",
    date: "October 10, 2023",
    location: "Madison Square Garden, New York",
    image: "/placeholder.svg?height=300&width=400",
    members: 876,
  },
  "103": {
    eventId: 103,
    eventTitle: "World Cup Finals: Team A vs Team B",
    date: "August 15, 2023",
    location: "National Stadium, New York",
    image: "/placeholder.svg?height=300&width=400",
    members: 2134,
  },
}

export default function CommunityPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [communityId, setCommunityId] = useState<string>("")
  const [community, setCommunity] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (params.id) {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      setCommunityId(id)

      // Get community details
      const communityDetails = mockCommunityDetails[id as keyof typeof mockCommunityDetails]
      if (!communityDetails) {
        router.push("/communities")
        return
      }

      setCommunity(communityDetails)

      // Get messages
      const communityMessages = mockMessages[id as keyof typeof mockMessages] || []
      setMessages(communityMessages)

      // Set users
      setUsers(mockUsers)

      // Set current user (random for demo)
      setCurrentUser(mockUsers[0])
    }
  }, [params.id, router])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add new message
    const newMsg = {
      id: messages.length + 1,
      userId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    toast({
      title: "Message sent",
      description: "Your message has been sent to the community.",
      className: "toast-success",
    })
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!community) {
    return null // Loading or redirect will happen
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-card/40 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between sticky top-16 z-10 shadow-glass">
          <div className="flex items-center">
            <Link href="/communities" className="mr-3">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-md overflow-hidden mr-3">
                <Image
                  src={community.image || "/placeholder.svg?height=100&width=100"}
                  alt={community.eventTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="font-bold text-white">{community.eventTitle}</h1>
                <p className="text-xs text-white/60">{community.members} members</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10 mr-1">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10 mr-1">
              <Video className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={() => setIsInfoOpen(true)}
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-card/30">
          {/* Animated background elements */}
          <div className="fixed -z-10 top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="fixed -z-10 bottom-1/4 right-1/4 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float"></div>

          {messages.map((message) => {
            const user = users.find((u) => u.id === message.userId)
            const isCurrentUser = user?.id === currentUser?.id

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                {!isCurrentUser && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 border border-white/10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {user?.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
                  {!isCurrentUser && <span className="text-xs text-white/60 mb-1">{user?.name}</span>}
                  <div className={`chat-bubble ${isCurrentUser ? "sent" : "received"}`}>
                    <p>{message.text}</p>
                  </div>
                  <span className="text-xs text-white/40 mt-1">{formatTimestamp(message.timestamp)}</span>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-card/40 backdrop-blur-xl border-t border-white/10 p-4 sticky bottom-0 shadow-glass">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/10 mr-2">
              <ImageIcon className="h-5 w-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 search-bar rounded-full pr-10"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 absolute right-1 top-1 text-white hover:bg-white/10"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </div>
            <Button
              className="ml-2 gradient-bg-animated hover:opacity-90 rounded-full"
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Community Info Sheet */}
      <Sheet open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <SheetContent className="card-glass border-white/10 w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-white">Community Info</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="relative h-40 rounded-lg overflow-hidden card-glass">
              <Image
                src={community.image || "/placeholder.svg?height=300&width=400"}
                alt={community.eventTitle}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="text-xl font-bold text-white gradient-text">{community.eventTitle}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium text-white/60">Event Date</h3>
                  <p className="text-white">{community.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium text-white/60">Location</h3>
                  <p className="text-white">{community.location}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="text-sm font-medium text-white/60">Members</h3>
                  <p className="text-white">{community.members} people</p>
                </div>
              </div>
            </div>

            <div className="card-glass rounded-lg p-4 border border-white/10">
              <h3 className="text-sm font-medium text-white/60 mb-3">Community Features</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  <span className="text-sm">Event Updates</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                  <Users className="h-4 w-4 mr-2 text-blue-400" />
                  <span className="text-sm">Meet Attendees</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                  <Heart className="h-4 w-4 mr-2 text-red-400" />
                  <span className="text-sm">Exclusive Content</span>
                </div>
                <div className="flex items-center p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                  <Share2 className="h-4 w-4 mr-2 text-green-400" />
                  <span className="text-sm">Share Experiences</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/60 mb-3">Active Members</h3>
              <div className="grid grid-cols-4 gap-2">
                {users.slice(0, 8).map((user) => (
                  <div key={user.id} className="flex flex-col items-center">
                    <Avatar className="h-12 w-12 mb-1 border border-white/10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-primary text-white">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-white text-center truncate w-full">{user.name.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-center">
                <Button variant="link" className="text-primary hover:text-accent transition-colors">
                  View All Members
                </Button>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                Leave Community
              </Button>
              <Button className="gradient-bg-animated hover:opacity-90">Invite Friends</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

