"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, MapPin, Search, Filter, Music, Film, Utensils, Palette, Dumbbell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

// Update the mock events data with Indian events and pricing
const allEvents = [
  {
    id: 1,
    title: "Lollapalooza India",
    date: "2024-01-27",
    location: "Mahalaxmi Race Course, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    price: 8999,
    tags: ["festival", "outdoor", "music"],
  },
  {
    id: 2,
    title: "International Food & Wine Expo",
    date: "2023-08-05",
    location: "Pragati Maidan, New Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    price: 2500,
    tags: ["food", "wine", "expo"],
  },
  {
    id: 3,
    title: "Bengaluru Tech Summit",
    date: "2023-11-12",
    location: "Bangalore International Exhibition Centre",
    image: "/placeholder.svg?height=300&width=400",
    category: "Technology",
    price: 5999,
    tags: ["tech", "innovation", "conference"],
  },
  {
    id: 4,
    title: "Kochi-Muziris Biennale",
    date: "2023-12-12",
    location: "Fort Kochi, Kerala",
    image: "/placeholder.svg?height=300&width=400",
    category: "Art",
    price: 1500,
    tags: ["art", "exhibition", "culture"],
  },
  {
    id: 5,
    title: "A.R. Rahman Live Concert",
    date: "2023-10-12",
    location: "Jawaharlal Nehru Stadium, Chennai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    price: 4500,
    tags: ["concert", "music", "performance"],
  },
  {
    id: 6,
    title: "Delhi Half Marathon",
    date: "2023-11-05",
    location: "India Gate, New Delhi",
    image: "/placeholder.svg?height=300&width=400",
    category: "Sports",
    price: 2000,
    tags: ["sports", "marathon", "fitness"],
  },
  {
    id: 7,
    title: "Nashik Wine Tasting Tour",
    date: "2023-11-18",
    location: "Sula Vineyards, Nashik",
    image: "/placeholder.svg?height=300&width=400",
    category: "Food",
    price: 3500,
    tags: ["wine", "tasting", "tour"],
  },
  {
    id: 8,
    title: "Sunburn Festival",
    date: "2023-12-28",
    location: "Vagator Beach, Goa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Music",
    price: 4999,
    tags: ["electronic", "music", "festival"],
  },
  {
    id: 9,
    title: "Comic Con India",
    date: "2023-12-10",
    location: "IEML, Greater Noida",
    image: "/placeholder.svg?height=300&width=400",
    category: "Entertainment",
    price: 1999,
    tags: ["comics", "convention", "cosplay"],
  },
  {
    id: 10,
    title: "International Film Festival of India",
    date: "2023-11-20",
    location: "Kala Academy, Goa",
    image: "/placeholder.svg?height=300&width=400",
    category: "Film",
    price: 3000,
    tags: ["film", "festival", "international"],
  },
  {
    id: 11,
    title: "Lakme Fashion Week",
    date: "2023-10-11",
    location: "Jio World Convention Centre, Mumbai",
    image: "/placeholder.svg?height=300&width=400",
    category: "Fashion",
    price: 7500,
    tags: ["fashion", "runway", "design"],
  },
  {
    id: 12,
    title: "Yoga Retreat in Rishikesh",
    date: "2023-09-20",
    location: "Parmarth Niketan, Rishikesh",
    image: "/placeholder.svg?height=300&width=400",
    category: "Wellness",
    price: 15000,
    tags: ["yoga", "wellness", "retreat"],
  },
]

// Update locations to Indian cities
const locations = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Goa"]

// Event categories
const eventCategories = [
  { value: "music", label: "Music", icon: <Music className="h-4 w-4 mr-2" /> },
  { value: "film", label: "Film & Media", icon: <Film className="h-4 w-4 mr-2" /> },
  { value: "food", label: "Food & Drink", icon: <Utensils className="h-4 w-4 mr-2" /> },
  { value: "art", label: "Art & Culture", icon: <Palette className="h-4 w-4 mr-2" /> },
  { value: "sports", label: "Sports & Fitness", icon: <Dumbbell className="h-4 w-4 mr-2" /> },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 400])
  const [filteredEvents, setFilteredEvents] = useState(allEvents)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const { toast } = useToast()

  // Add useEffect to load search parameters from localStorage
  useEffect(() => {
    // Get search parameters from localStorage if they exist
    const storedParams = localStorage.getItem("searchParams")
    if (storedParams) {
      const params = JSON.parse(storedParams)

      // Set search parameters
      if (params.searchQuery) setSearchQuery(params.searchQuery)
      if (params.location) setSelectedLocations([params.location])
      if (params.category) setSelectedCategories([params.category])
      if (params.date) setSelectedDate(new Date(params.date))

      // Clear stored parameters after using them
      localStorage.removeItem("searchParams")
    }

    let filtered = [...allEvents]

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Date filter
    if (selectedDate) {
      const dateStr = format(selectedDate, "yyyy-MM-dd")
      filtered = filtered.filter((event) => event.date === dateStr)
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((event) =>
        selectedCategories.some((cat) => event.category.toLowerCase() === cat.toLowerCase()),
      )
    }

    // Location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((event) => selectedLocations.some((loc) => event.location.includes(loc)))
    }

    // Price range filter
    filtered = filtered.filter((event) => event.price >= priceRange[0] && event.price <= priceRange[1])

    setFilteredEvents(filtered)

    // Count active filters
    let count = 0
    if (searchQuery) count++
    if (selectedDate) count++
    if (selectedCategories.length > 0) count++
    if (selectedLocations.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < 400) count++
    setActiveFilters(count)
  }, [searchQuery, selectedDate, selectedCategories, selectedLocations, priceRange])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleLocationToggle = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDate(undefined)
    setSelectedCategories([])
    setSelectedLocations([])
    setPriceRange([0, 400])
    toast({
      title: "Filters cleared",
      description: "All filters have been reset.",
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
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden md:block w-64 sticky top-24">
            <div className="bg-card rounded-lg shadow-sm p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  Clear All
                </Button>
              </div>

              {/* Date Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Date</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  {eventCategories.map((category) => (
                    <div key={category.value} className="flex items-center">
                      <Checkbox
                        id={`category-${category.value}`}
                        checked={selectedCategories.includes(category.value)}
                        onCheckedChange={() => handleCategoryToggle(category.value)}
                      />
                      <Label
                        htmlFor={`category-${category.value}`}
                        className="ml-2 flex items-center text-sm font-normal"
                      >
                        {category.icon}
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={`location-${location}`}
                        checked={selectedLocations.includes(location)}
                        onCheckedChange={() => handleLocationToggle(location)}
                      />
                      <Label htmlFor={`location-${location}`} className="ml-2 text-sm font-normal">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 400]}
                  min={0}
                  max={15000}
                  step={100}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Filter Bar */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events, locations, categories..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Mobile Filter Button */}
              <div className="md:hidden">
                <Button variant="outline" className="w-full" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilters > 0 && <Badge className="ml-2 bg-primary text-white">{activeFilters}</Badge>}
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="md:hidden mb-6 bg-card rounded-lg shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)} className="h-8 px-2">
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Date Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Date</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {eventCategories.map((category) => (
                      <div key={category.value} className="flex items-center">
                        <Checkbox
                          id={`mobile-category-${category.value}`}
                          checked={selectedCategories.includes(category.value)}
                          onCheckedChange={() => handleCategoryToggle(category.value)}
                        />
                        <Label
                          htmlFor={`mobile-category-${category.value}`}
                          className="ml-2 flex items-center text-sm font-normal"
                        >
                          {category.icon}
                          {category.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Location</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {locations.map((location) => (
                      <div key={location} className="flex items-center">
                        <Checkbox
                          id={`mobile-location-${location}`}
                          checked={selectedLocations.includes(location)}
                          onCheckedChange={() => handleLocationToggle(location)}
                        />
                        <Label htmlFor={`mobile-location-${location}`} className="ml-2 text-sm font-normal">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Price Range</h3>
                  <Slider
                    defaultValue={[0, 400]}
                    min={0}
                    max={15000}
                    step={100}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button className="flex-1 gradient-bg hover:opacity-90" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Explore Events</h1>
              <p className="text-muted-foreground">
                {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
                {activeFilters > 0 ? " matching your filters" : ""}
              </p>
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden card-hover">
                    <div className="relative h-48">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">
                        {event.category}
                      </Badge>
                      <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {new Date(event.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">₹{event.price.toFixed(2)}</span>
                        <Button size="sm" onClick={() => handleBookNow(event.title)}>
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-lg font-medium mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to find more events.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

