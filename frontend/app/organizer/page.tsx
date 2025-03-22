"use client"

import type React from "react"

import { useState } from "react"
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  AlertTriangle,
  TrendingUp,
  DollarSign,
  MessageSquare,
  PlusCircle,
  Calendar,
  MapPin,
  Tag,
  Users,
  Ticket,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Mock data for charts
const trendData = [
  { month: "Jan", popularity: 65, attendance: 45 },
  { month: "Feb", popularity: 59, attendance: 40 },
  { month: "Mar", popularity: 80, attendance: 60 },
  { month: "Apr", popularity: 81, attendance: 65 },
  { month: "May", popularity: 56, attendance: 48 },
  { month: "Jun", popularity: 55, attendance: 50 },
  { month: "Jul", popularity: 40, attendance: 35 },
  { month: "Aug", popularity: 70, attendance: 62 },
  { month: "Sep", popularity: 90, attendance: 78 },
  { month: "Oct", popularity: 95, attendance: 85 },
  { month: "Nov", popularity: 75, attendance: 70 },
  { month: "Dec", popularity: 85, attendance: 80 },
]

const salesData = [
  { month: "Jan", projected: 400000, actual: 240000 },
  { month: "Feb", projected: 300000, actual: 139800 },
  { month: "Mar", projected: 200000, actual: 980000 },
  { month: "Apr", projected: 278000, actual: 390800 },
  { month: "May", projected: 189000, actual: 480000 },
  { month: "Jun", projected: 239000, actual: 380000 },
]

const sentimentData = [
  { name: "Positive", value: 65, color: "#4ade80" },
  { name: "Neutral", value: 25, color: "#94a3b8" },
  { name: "Negative", value: 10, color: "#f87171" },
]

const COLORS = ["#4ade80", "#94a3b8", "#f87171"]

// Word cloud data
const positiveKeywords = ["Amazing", "Excellent", "Fun", "Engaging", "Professional", "Organized"]
const negativeKeywords = ["Expensive", "Crowded", "Late", "Disorganized"]

export default function OrganizerDashboard() {
  const [currentPrice, setCurrentPrice] = useState(1500)
  const [optimalPrice, setOptimalPrice] = useState(2000)
  const [projectedAttendance, setProjectedAttendance] = useState(500)
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false)
  const [isAnomalyDetailsOpen, setIsAnomalyDetailsOpen] = useState(false)
  const [isEventIdeasOpen, setIsEventIdeasOpen] = useState(false)
  const { toast } = useToast()

  const handlePriceChange = (value: number[]) => {
    const newPrice = value[0]
    setCurrentPrice(newPrice)

    // Simulate attendance projection based on price
    const baseAttendance = 1000
    const priceFactorinc = 1 - (newPrice - 30) / 100
    const newAttendance = Math.round(baseAttendance * priceFactorinc)
    setProjectedAttendance(newAttendance)

  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Event created successfully!",
      description: "Your new event has been published.",
      className: "toast-success",
    })
    setIsCreateEventOpen(false)
  }

  const handleViewAnomalyDetails = () => {
    setIsAnomalyDetailsOpen(true)
    toast({
      title: "Anomaly detected",
      description: "Unusual spike in ticket sales for Summer Music Festival.",
      className: "toast-warning",
    })
  }

  const handleGenerateEventIdeas = () => {
    setIsEventIdeasOpen(true)
    toast({
      title: "Sentiment analysis ready",
      description: "Check insights for your event planning.",
      className: "toast-info",
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Organizer Dashboard</h1>
            <p className="text-muted-foreground">Manage your events and gain insights with AI-powered analytics.</p>
          </div>
          <Button className="gradient-bg hover:opacity-90" onClick={() => setIsCreateEventOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        {/* Seasonal Popularity Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Seasonal Popularity Trends</CardTitle>
              <CardDescription>Track popularity and attendance trends over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="popularity"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Popularity Score"
                    />
                    <Line type="monotone" dataKey="attendance" stroke="#82ca9d" name="Attendance Rate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Anomaly Detection */}
          <Card>
            <CardHeader className="bg-amber-50 dark:bg-amber-950/20">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                  Anomaly Detection
                </CardTitle>
                <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  Alert
                </Badge>
              </div>
              <CardDescription>Real-time notifications for unusual trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-1">Unusual Spike in Ticket Sales</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Summer Music Festival is selling 3x faster than projected. Consider increasing capacity.
                  </p>
                  <Button variant="outline" size="sm" onClick={handleViewAnomalyDetails}>
                    View Details
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-1">Pricing Opportunity</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Tech Conference tickets are in high demand. Consider premium pricing tiers.
                  </p>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Sales and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales Velocity</CardTitle>
              <CardDescription>Projected vs. actual ticket sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="projected" fill="#8884d8" name="Projected Sales" />
                    <Bar dataKey="actual" fill="#82ca9d" name="Actual Sales" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Expected peak sales period:</span>
                  <span className="font-medium">September 15-20</span>
                </div>
                <Button className="w-full mt-4">Boost Sales</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Strategy Optimization</CardTitle>
              <CardDescription>AI-recommended price adjustments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Current Price</span>
                    <span className="text-sm font-bold">₹{currentPrice}</span>
                  </div>
                  <Slider defaultValue={[1500]} max={5000} min={500} step={100} onValueChange={handlePriceChange} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹500</span>
                    <span>₹5000</span>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">Projected Attendance</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{projectedAttendance}</div>
                  <div className="text-xs text-muted-foreground">
                    {currentPrice < optimalPrice
                      ? "Increase price for optimal revenue"
                      : "Current price may reduce attendance"}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm font-medium text-green-500" >Optimal price</span>
                  </div>
                  <span className="font-bold text-green-500">₹{optimalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sentiment Analysis</CardTitle>
              <CardDescription>Public sentiment about your events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Top Keywords</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {positiveKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {negativeKeywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={handleGenerateEventIdeas}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Generate Event Ideas
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Create Event Dialog */}
        <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>Fill in the details to create your new event.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateEvent}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="event-name">Event Name</Label>
                  <Input id="event-name" placeholder="Enter event name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="event-date">Date</Label>
                    <Input id="event-date" type="date" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-time">Time</Label>
                    <Input id="event-time" type="time" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-location">Location</Label>
                  <Input id="event-location" placeholder="Enter venue and address" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Art & Culture</SelectItem>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="sports">Sports & Fitness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-price">Ticket Price (₹)</Label>
                  <Input id="event-price" type="number" min="0" placeholder="0.00" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-capacity">Capacity</Label>
                  <Input id="event-capacity" type="number" min="1" placeholder="100" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Describe your event"
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Create Event</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Anomaly Details Dialog */}
        <Dialog open={isAnomalyDetailsOpen} onOpenChange={setIsAnomalyDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Anomaly Details</DialogTitle>
              <DialogDescription>Unusual spike in ticket sales detected</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-amber-50 dark:bg-amber-950/20">
                <h3 className="font-semibold mb-2">Summer Music Festival</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Expected sales:</span>
                    <span className="font-medium block">150 tickets/day</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current sales:</span>
                    <span className="font-medium block">450 tickets/day</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Anomaly detected:</span>
                    <span className="font-medium block">March 21, 2023</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium block">98%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">AI Analysis</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  This spike coincides with a viral social media post by influencer @MusicLover (2.5M followers)
                  mentioning your event. Consider the following actions:
                </p>
                <ul className="text-sm space-y-1 list-disc pl-5 text-muted-foreground">
                  <li>Increase venue capacity if possible</li>
                  <li>Add premium ticket tiers</li>
                  <li>Prepare additional staff for the event</li>
                  <li>Contact the influencer for potential partnership</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">Ignore</Button>
                <Button>Take Action</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Event Ideas Dialog */}
        <Dialog open={isEventIdeasOpen} onOpenChange={setIsEventIdeasOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>AI-Generated Event Ideas</DialogTitle>
              <DialogDescription>Based on sentiment analysis and market trends</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    High Potential
                  </Badge>
                  <h3 className="font-semibold">Interactive Art Installation</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  An immersive art experience combining digital projections with physical installations. Visitors can
                  interact with the art through motion sensors and mobile apps.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Optimal timing: Spring</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Urban gallery spaces</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Art, Technology</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Young professionals</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-3 w-3 mr-1" />
                    <span>₹2500-4500 price point</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Use This Idea
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    High Potential
                  </Badge>
                  <h3 className="font-semibold">Culinary Fusion Festival</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  A weekend food festival featuring local chefs creating fusion dishes that blend different cultural
                  cuisines. Include cooking demonstrations, tastings, and competitions.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Optimal timing: Summer</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Outdoor venue</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Food, Culture</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Foodies, families</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-3 w-3 mr-1" />
                    <span>₹1500-3000 price point</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Use This Idea
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Medium Potential
                  </Badge>
                  <h3 className="font-semibold">Tech Startup Pitch Night</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  An evening event where local startups pitch their ideas to investors and the audience. Include
                  networking opportunities and expert panels.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Optimal timing: Quarterly</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>Co-working spaces</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>Technology, Business</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Entrepreneurs, investors</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket className="h-3 w-3 mr-1" />
                    <span>₹50000-10000 price point</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Use This Idea
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEventIdeasOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

