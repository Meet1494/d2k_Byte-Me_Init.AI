// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Calendar, MapPin, Star, Clock, Sparkles, History, ThumbsUp, Filter, ChevronDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { useToast } from "@/components/ui/use-toast"
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

// // Mock data for personalized recommendations
// const personalizedRecommendations = [
//   {
//     id: 1,
//     title: "Arijit Singh Live in Concert",
//     date: "September 15, 2023",
//     time: "7:00 PM",
//     location: "Jawaharlal Nehru Stadium, Delhi",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 3999,
//     matchScore: 98,
//     reason: "Based on your interest in Arijit Singh",
//   },
//   {
//     id: 2,
//     title: "Coldplay Music of the Spheres Tour",
//     date: "January 22, 2024",
//     time: "8:00 PM",
//     location: "DY Patil Stadium, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 9999,
//     matchScore: 95,
//     reason: "Based on your interest in Coldplay",
//   },
//   {
//     id: 3,
//     title: "Sunburn Festival Goa",
//     date: "December 28-30, 2023",
//     time: "4:00 PM onwards",
//     location: "Vagator Beach, Goa",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 8999,
//     matchScore: 92,
//     reason: "Because you attended Sunburn Festival 2022",
//   },
//   {
//     id: 4,
//     title: "A.R. Rahman Live Concert",
//     date: "October 12, 2023",
//     time: "7:30 PM",
//     location: "Jawaharlal Nehru Stadium, Chennai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 4500,
//     matchScore: 90,
//     reason: "Based on your interest in A.R. Rahman",
//   },
//   {
//     id: 5,
//     title: "NH7 Weekender",
//     date: "December 2-4, 2023",
//     time: "3:00 PM onwards",
//     location: "Mahalaxmi Lawns, Pune",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 4999,
//     matchScore: 88,
//     reason: "Because you attended NH7 Weekender 2022",
//   },
//   {
//     id: 6,
//     title: "Vir Das Comedy Tour",
//     date: "August 15, 2023",
//     time: "8:00 PM",
//     location: "The Comedy Store, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Comedy",
//     price: 1999,
//     matchScore: 85,
//     reason: "Based on your search for Comedy Show",
//   },
//   {
//     id: 7,
//     title: "IPL 2024: Mumbai Indians vs Chennai Super Kings",
//     date: "April 10, 2024",
//     time: "7:30 PM",
//     location: "Wankhede Stadium, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Sports",
//     price: 2500,
//     matchScore: 82,
//     reason: "Based on your interest in cricket events",
//   },
//   {
//     id: 8,
//     title: "Zakir Khan Stand-up Comedy",
//     date: "October 5, 2023",
//     time: "8:30 PM",
//     location: "Indira Gandhi Indoor Stadium, Delhi",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Comedy",
//     price: 1800,
//     matchScore: 80,
//     reason: "Based on your interest in comedy shows",
//   },
//   {
//     id: 9,
//     title: "Diljit Dosanjh Dil-Luminati Tour",
//     date: "November 18, 2023",
//     time: "7:00 PM",
//     location: "Jawaharlal Nehru Stadium, Delhi",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 3500,
//     matchScore: 78,
//     reason: "Based on your music preferences",
//   },
// ]

// // Mock data for new releases
// const newReleases = [
//   {
//     id: 101,
//     title: "Ed Sheeran Mathematics Tour India",
//     date: "March 15-16, 2024",
//     location: "Jawaharlal Nehru Stadium, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 9999,
//     daysAgo: 2,
//     reason: "Matches your music preferences",
//   },
//   {
//     id: 102,
//     title: "Delhi Food & Music Festival",
//     date: "August 5-7, 2023",
//     location: "Jawaharlal Nehru Stadium, Delhi",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Food & Music",
//     price: 2500,
//     daysAgo: 3,
//     reason: "Matches your search for Food Festival",
//   },
//   {
//     id: 103,
//     title: "Zakir Hussain & Masters of Percussion",
//     date: "November 10, 2023",
//     location: "NCPA, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 3500,
//     daysAgo: 5,
//     reason: "Expanding your music preferences",
//   },
//   {
//     id: 104,
//     title: "Prateek Kuhad India Tour",
//     date: "September 30, 2023",
//     location: "Phoenix Marketcity, Bengaluru",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 2999,
//     daysAgo: 7,
//     reason: "Matches your music preferences",
//   },
//   {
//     id: 105,
//     title: "FIFA World Cup Qualifier: India vs Qatar",
//     date: "October 8, 2023",
//     location: "Salt Lake Stadium, Kolkata",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Sports",
//     price: 1500,
//     daysAgo: 1,
//     reason: "New sporting event in your area",
//   },
//   {
//     id: 106,
//     title: "Cirque du Soleil: BAZZAR",
//     date: "November 25-December 10, 2023",
//     location: "MMRDA Grounds, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Entertainment",
//     price: 5000,
//     daysAgo: 4,
//     reason: "Unique entertainment experience",
//   },
// ]

// // Mock data for similar events
// const similarEvents = [
//   {
//     id: 201,
//     title: "Bacardi NH7 Weekender Shillong",
//     date: "November 5-6, 2023",
//     location: "Shillong, Meghalaya",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 4500,
//     similarTo: "NH7 Weekender 2022",
//     similarity: "Same festival, different city",
//   },
//   {
//     id: 202,
//     title: "Vh1 Supersonic",
//     date: "February 16-18, 2024",
//     location: "Pune",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 5999,
//     similarTo: "Sunburn Festival 2022",
//     similarity: "Similar electronic music festival",
//   },
//   {
//     id: 203,
//     title: "Magnetic Fields Festival",
//     date: "December 15-17, 2023",
//     location: "Alsisar Mahal, Rajasthan",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 7999,
//     similarTo: "Sunburn Festival 2022",
//     similarity: "Boutique music festival experience",
//   },
//   {
//     id: 204,
//     title: "Echoes of Earth",
//     date: "December 2-3, 2023",
//     location: "Bengaluru",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 3999,
//     similarTo: "NH7 Weekender 2022",
//     similarity: "Multi-genre music festival",
//   },
//   {
//     id: 205,
//     title: "Lollapalooza India",
//     date: "January 27-28, 2024",
//     location: "Mahalaxmi Race Course, Mumbai",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 8999,
//     similarTo: "Sunburn Festival 2022",
//     similarity: "International music festival",
//   },
//   {
//     id: 206,
//     title: "Ziro Festival of Music",
//     date: "September 28-October 1, 2023",
//     location: "Ziro Valley, Arunachal Pradesh",
//     image: "/placeholder.svg?height=300&width=400",
//     category: "Music",
//     price: 6500,
//     similarTo: "NH7 Weekender 2022",
//     similarity: "Outdoor music festival in a scenic location",
//   },
// ]

// // Mock user preferences
// const userPreferences = {
//   favoriteGenres: ["Rock", "Pop", "Electronic", "Hip Hop", "Classical"],
//   favoriteArtists: ["Arijit Singh", "A.R. Rahman", "Coldplay", "Diljit Dosanjh", "Ed Sheeran"],
//   favoriteVenues: ["DY Patil Stadium", "Jawaharlal Nehru Stadium", "Wankhede Stadium"],
//   recentSearches: ["Music Festival", "Comedy Show", "Food Festival", "Cricket Match", "Concert"],
//   attendedEvents: [
//     {
//       id: 901,
//       title: "NH7 Weekender 2022",
//       date: "December 3-5, 2022",
//       location: "Pune",
//       image: "/placeholder.svg?height=300&width=400",
//     },
//     {
//       id: 902,
//       title: "Sunburn Festival 2022",
//       date: "December 28-30, 2022",
//       location: "Goa",
//       image: "/placeholder.svg?height=300&width=400",
//     },
//     {
//       id: 903,
//       title: "IPL 2022: Mumbai Indians vs Delhi Capitals",
//       date: "April 2, 2022",
//       location: "Wankhede Stadium, Mumbai",
//       image: "/placeholder.svg?height=300&width=400",
//     },
//   ],
// }

// export default function RecommendedPage() {
//   const [activeTab, setActiveTab] = useState("personalized")
//   const [selectedEvent, setSelectedEvent] = useState<any>(null)
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false)
//   const [sortOption, setSortOption] = useState("match")
//   const [filteredRecommendations, setFilteredRecommendations] = useState(personalizedRecommendations)
//   const [events, setEvents] = useState([]);
//   const [category, setCategory] = useState("hot_events");
//   const { toast } = useToast()
  

//   // Fetch data from API
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/data/1");
//       const data = await response.json();
//       setEvents(data[category]);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };
//   // Show a welcome toast when the page loads
//   useEffect(() => {
//     toast({
//       title: "Welcome to your personalized recommendations!",
//       description: "We've curated events just for you based on your preferences and history.",
//       className: "toast-info",
//     })
//   }, [toast])

//   // Sort recommendations when sort option changes
//   useEffect(() => {
//     const sorted = [...personalizedRecommendations]

//     if (sortOption === "match") {
//       sorted.sort((a, b) => b.matchScore - a.matchScore)
//     } else if (sortOption === "date") {
//       sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     } else if (sortOption === "price-low") {
//       sorted.sort((a, b) => a.price - b.price)
//     } else if (sortOption === "price-high") {
//       sorted.sort((a, b) => b.price - a.price)
//     }

//     setFilteredRecommendations(sorted)
//   }, [sortOption])

//   const handleViewDetails = (event: any) => {
//     setSelectedEvent(event)
//     setIsDetailsOpen(true)
//   }

//   const handleBookNow = (eventTitle: string) => {
//     // Find the event
//     const event =
//       selectedEvent ||
//       personalizedRecommendations.find((e) => e.title === eventTitle) ||
//       newReleases.find((e) => e.title === eventTitle) ||
//       similarEvents.find((e) => e.title === eventTitle)

//     if (!event) return

//     // Add to cart
//     const cartItem = {
//       id: event.id,
//       title: event.title,
//       date: event.date,
//       time: event.time || "7:00 PM", // Default time if not provided
//       location: event.location,
//       image: event.image,
//       category: event.category,
//       price: event.price,
//       quantity: 1,
//     }

//     // Get existing cart
//     const existingCart = JSON.parse(localStorage.getItem("tufanTicketCart") || "[]")

//     // Check if item already exists in cart
//     const existingItemIndex = existingCart.findIndex((item: any) => item.id === event.id)

//     if (existingItemIndex >= 0) {
//       // Increment quantity if item already exists
//       existingCart[existingItemIndex].quantity += 1
//     } else {
//       // Add new item to cart
//       existingCart.push(cartItem)
//     }

//     // Save updated cart
//     localStorage.setItem("tufanTicketCart", JSON.stringify(existingCart))

//     // Dispatch custom event to update cart count in header
//     window.dispatchEvent(new Event("cartUpdated"))

//     toast({
//       title: "Added to cart!",
//       description: `${event.title} has been added to your cart.`,
//       className: "toast-success",
//     })

//     // Close the details sheet if open
//     if (isDetailsOpen) {
//       setIsDetailsOpen(false)
//     }
//   }

//   const handleRefreshRecommendations = () => {
//     // Simulate refreshing recommendations by slightly randomizing match scores
//     const refreshed = personalizedRecommendations.map((rec) => ({
//       ...rec,
//       matchScore: Math.max(70, Math.min(99, rec.matchScore + Math.floor(Math.random() * 11) - 5)),
//     }))

//     // Sort according to current sort option
//     const sorted = [...refreshed]
//     if (sortOption === "match") {
//       sorted.sort((a, b) => b.matchScore - a.matchScore)
//     } else if (sortOption === "date") {
//       sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
//     } else if (sortOption === "price-low") {
//       sorted.sort((a, b) => a.price - b.price)
//     } else if (sortOption === "price-high") {
//       sorted.sort((a, b) => b.price - a.price)
//     }

//     setFilteredRecommendations(sorted)

//     toast({
//       title: "Recommendations refreshed!",
//       description: "We've updated your recommendations based on your latest activity.",
//       className: "toast-success",
//     })
//   }

//   return (
//     <div className="pt-24 pb-16">
//       <div className="container mx-auto px-4">
//         {/* Hero Section */}
//         <div className="mb-10 text-center">
//           <h1 className="text-4xl font-bold mb-4 gradient-text">Your Personalized Recommendations</h1>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Discover events tailored just for you, powered by our AI recommendation engine that learns from your
//             preferences and activity.
//           </p>
//         </div>

//         {/* Preferences Summary */}
//         <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 mb-10 border border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
//             <h2 className="text-2xl font-bold">Your Preference Profile</h2>
//             <Button onClick={handleRefreshRecommendations} className="gradient-bg hover:opacity-90">
//               <Sparkles className="mr-2 h-4 w-4" />
//               Refresh Recommendations
//             </Button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Genres</h3>
//               <div className="flex flex-wrap gap-2">
//                 {userPreferences.favoriteGenres.map((genre, index) => (
//                   <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
//                     {genre}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Artists</h3>
//               <div className="flex flex-wrap gap-2">
//                 {userPreferences.favoriteArtists.map((artist, index) => (
//                   <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
//                     {artist}
//                   </Badge>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h3>
//               <div className="flex flex-wrap gap-2">
//                 {userPreferences.recentSearches.map((search, index) => (
//                   <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
//                     {search}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs for different recommendation types */}
//         <Tabs defaultValue="personalized" value={activeTab} onValueChange={setActiveTab} className="mb-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//             <TabsList className="grid grid-cols-3 w-full sm:w-auto">
//               <TabsTrigger value="personalized" className="px-4">
//                 <Sparkles className="h-4 w-4 mr-2" />
//                 For You
//               </TabsTrigger>
//               <TabsTrigger value="new" className="px-4">
//                 <Star className="h-4 w-4 mr-2" />
//                 New Releases
//               </TabsTrigger>
//               <TabsTrigger value="similar" className="px-4">
//                 <History className="h-4 w-4 mr-2" />
//                 Similar Events
//               </TabsTrigger>
//             </TabsList>

//             {activeTab === "personalized" && (
//               <div className="flex items-center w-full sm:w-auto">
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" className="w-full sm:w-auto">
//                       <Filter className="h-4 w-4 mr-2" />
//                       Sort By
//                       <ChevronDown className="h-4 w-4 ml-2" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem onClick={() => setSortOption("match")}>
//                       Match Score (Highest First)
//                     </DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortOption("date")}>Date (Soonest First)</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price (Low to High)</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price (High to Low)</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             )}
//           </div>

//           {/* Personalized Recommendations Tab */}
//           <TabsContent value="personalized">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredRecommendations.map((event) => (
//                 <Card key={event.id} className="overflow-hidden card-hover">
//                   <div className="relative h-48">
//                     <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
//                     <div className="absolute top-2 right-2">
//                       <Badge className="bg-primary text-white">{event.matchScore}% Match</Badge>
//                     </div>
//                   </div>
//                   <CardContent className="p-4">
//                     <Badge variant="outline" className="mb-2">
//                       {event.category}
//                     </Badge>
//                     <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
//                     <div className="flex items-center text-sm text-muted-foreground mb-1">
//                       <Calendar className="h-4 w-4 mr-1" />
//                       <span>{event.date}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-muted-foreground mb-1">
//                       <Clock className="h-4 w-4 mr-1" />
//                       <span>{event.time}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-muted-foreground mb-3">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span className="line-clamp-1">{event.location}</span>
//                     </div>
//                     <div className="flex items-center text-xs text-primary mb-4">
//                       <ThumbsUp className="h-3 w-3 mr-1" />
//                       <span>{event.reason}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold">₹{event.price.toFixed(2)}</span>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
//                           Details
//                         </Button>
//                         <Button
//                           size="sm"
//                           className="gradient-bg hover:opacity-90"
//                           onClick={() => handleBookNow(event.title)}
//                         >
//                           Book
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* New Releases Tab */}
//           <TabsContent value="new">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {newReleases.map((event) => (
//                 <Card key={event.id} className="overflow-hidden card-hover">
//                   <div className="relative h-48">
//                     <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
//                     <div className="absolute top-2 right-2">
//                       <Badge className="bg-accent text-white">New • {event.daysAgo}d ago</Badge>
//                     </div>
//                   </div>
//                   <CardContent className="p-4">
//                     <Badge variant="outline" className="mb-2">
//                       {event.category}
//                     </Badge>
//                     <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
//                     <div className="flex items-center text-sm text-muted-foreground mb-1">
//                       <Calendar className="h-4 w-4 mr-1" />
//                       <span>{event.date}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-muted-foreground mb-3">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span className="line-clamp-1">{event.location}</span>
//                     </div>
//                     <div className="flex items-center text-xs text-primary mb-4">
//                       <ThumbsUp className="h-3 w-3 mr-1" />
//                       <span>{event.reason}</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold">₹{event.price.toFixed(2)}</span>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
//                           Details
//                         </Button>
//                         <Button
//                           size="sm"
//                           className="gradient-bg hover:opacity-90"
//                           onClick={() => handleBookNow(event.title)}
//                         >
//                           Book
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>

//           {/* Similar Events Tab */}
//           <TabsContent value="similar">
//             <div className="mb-6">
//               <h3 className="text-xl font-bold mb-4">Based on Events You've Attended</h3>
//               <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
//                 {userPreferences.attendedEvents?.map((event) => (
//                   <div key={event.id} className="flex-shrink-0 w-48">
//                     <div className="relative h-24 w-full rounded-lg overflow-hidden mb-2">
//                       <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
//                     </div>
//                     <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
//                     <p className="text-xs text-muted-foreground">{event.date}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {similarEvents.map((event) => (
//                 <Card key={event.id} className="overflow-hidden card-hover">
//                   <div className="relative h-48">
//                     <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
//                   </div>
//                   <CardContent className="p-4">
//                     <Badge variant="outline" className="mb-2">
//                       {event.category}
//                     </Badge>
//                     <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
//                     <div className="flex items-center text-sm text-muted-foreground mb-1">
//                       <Calendar className="h-4 w-4 mr-1" />
//                       <span>{event.date}</span>
//                     </div>
//                     <div className="flex items-center text-sm text-muted-foreground mb-3">
//                       <MapPin className="h-4 w-4 mr-1" />
//                       <span className="line-clamp-1">{event.location}</span>
//                     </div>
//                     <div className="p-2 bg-primary/10 rounded-md mb-4">
//                       <p className="text-xs">
//                         <span className="font-medium">Similar to:</span> {event.similarTo}
//                       </p>
//                       <p className="text-xs text-muted-foreground">{event.similarity}</p>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold">₹{event.price.toFixed(2)}</span>
//                       <div className="flex gap-2">
//                         <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
//                           Details
//                         </Button>
//                         <Button
//                           size="sm"
//                           className="gradient-bg hover:opacity-90"
//                           onClick={() => handleBookNow(event.title)}
//                         >
//                           Book
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* How Recommendations Work Section */}
//         <div className="mt-16 bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
//           <h2 className="text-2xl font-bold mb-6 text-center">How Our Recommendation System Works</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
//                 <ThumbsUp className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-bold mb-2">Preference Learning</h3>
//               <p className="text-sm text-muted-foreground">
//                 Our AI analyzes your likes, searches, and browsing patterns to understand your unique preferences.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
//                 <History className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-bold mb-2">Event History</h3>
//               <p className="text-sm text-muted-foreground">
//                 We consider events you've attended in the past to suggest similar experiences you might enjoy.
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
//                 <Sparkles className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-bold mb-2">Personalized Matching</h3>
//               <p className="text-sm text-muted-foreground">
//                 Our algorithm calculates a match score for each event based on how well it aligns with your interests.
//               </p>
//             </div>
//           </div>

//           <div className="mt-8 text-center">
//             <Link href="/explore">
//               <Button className="gradient-bg hover:opacity-90">Explore More Events</Button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Event Details Sheet */}
//       <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <SheetContent className="card-glass border-white/10 w-full sm:max-w-md">
//           <SheetHeader>
//             <SheetTitle>Event Details</SheetTitle>
//             <SheetDescription>
//               {selectedEvent?.matchScore && `${selectedEvent.matchScore}% match for you`}
//             </SheetDescription>
//           </SheetHeader>

//           {selectedEvent && (
//             <div className="mt-6 space-y-6">
//               <div className="relative h-48 rounded-lg overflow-hidden">
//                 <Image
//                   src={selectedEvent.image || "/placeholder.svg"}
//                   alt={selectedEvent.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div>
//                 <Badge variant="outline" className="mb-2">
//                   {selectedEvent.category}
//                 </Badge>
//                 <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span>{selectedEvent.date}</span>
//                   </div>
//                   {selectedEvent.time && (
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
//                       <span>{selectedEvent.time}</span>
//                     </div>
//                   )}
//                   <div className="flex items-center">
//                     <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
//                     <span>{selectedEvent.location}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 bg-primary/10 rounded-lg">
//                 <h3 className="font-medium mb-2">Why We Recommend This</h3>
//                 <p className="text-sm">{selectedEvent.reason || selectedEvent.similarity}</p>
//                 {selectedEvent.similarTo && (
//                   <p className="text-sm mt-2">
//                     <span className="font-medium">Similar to:</span> {selectedEvent.similarTo}
//                   </p>
//                 )}
//               </div>

//               <div className="pt-4 border-t border-white/10">
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <p className="text-sm text-muted-foreground">Ticket Price</p>
//                     <p className="text-xl font-bold">₹{selectedEvent.price.toFixed(2)}</p>
//                   </div>
//                   <Button className="gradient-bg hover:opacity-90" onClick={() => handleBookNow(selectedEvent.title)}>
//                     Book Now
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }







"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Star, Clock, Sparkles, History, ThumbsUp, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

export default function RecommendedPage() {
  const [activeTab, setActiveTab] = useState("personalized")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [sortOption, setSortOption] = useState("match")
  const [eventsData, setEventsData] = useState({
    hot_events: [],
    nearby_events: [],
    you_might_like: []
  })
  const [filteredRecommendations, setFilteredRecommendations] = useState([])
  const { toast } = useToast()
  
  // Fetch data from API
  const fetchEventsData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/data/1')
      const data = await response.json()
      
      // Format the data to match the component's expected structure
      const formattedHotEvents = data.hot_events.map((event, index) => ({
        id: `hot-${index}`,
        title: event.event_name,
        category: event.event_type,
        location: event.city,
        price: event.price,
        matchScore: Math.round(event.popularity_score * 100),
        date: event.event_name.split(' ').pop(), // Extracting year from event name
        time: "7:00 PM", // Default time since it's not in JSON
        image: "/placeholder.svg", // Placeholder since no image in JSON
        reason: "Based on popularity score"
      }))

      const formattedNearbyEvents = data.nearby_events.map((event, index) => ({
        id: `nearby-${index}`,
        title: event.event_name,
        category: event.event_type,
        location: `${event.city} (${event.distance.toFixed(1)}km)`,
        price: event.price,
        date: event.event_name.split(' ').pop(),
        time: "7:00 PM",
        image: "/placeholder.svg",
        reason: "Based on your location"
      }))

      const formattedYouMightLike = data.you_might_like.map((event, index) => ({
        id: `like-${index}`,
        title: event.event_name,
        category: event.event_type,
        location: event.city,
        price: event.price,
        date: event.event_name.split(' ').pop(),
        time: "7:00 PM",
        image: "/placeholder.svg",
        reason: "Based on your preferences"
      }))

      setEventsData({
        hot_events: formattedHotEvents,
        nearby_events: formattedNearbyEvents,
        you_might_like: formattedYouMightLike
      })
      setFilteredRecommendations(formattedYouMightLike) // Default to "For You" tab
    } catch (error) {
      console.error('Error fetching events:', error)
      toast({
        title: "Error",
        description: "Failed to load events data",
        variant: "destructive"
      })
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchEventsData()
    toast({
      title: "Welcome to your personalized recommendations!",
      description: "We've curated events just for you based on your preferences and history.",
      className: "toast-info",
    })
  }, [toast])

  // Sort recommendations when sort option changes (only for "For You" tab)
  useEffect(() => {
    if (activeTab === "personalized") {
      const sorted = [...eventsData.you_might_like]
      if (sortOption === "match") {
        sorted.sort((a, b) => b.matchScore - a.matchScore)
      } else if (sortOption === "date") {
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      } else if (sortOption === "price-low") {
        sorted.sort((a, b) => a.price - b.price)
      } else if (sortOption === "price-high") {
        sorted.sort((a, b) => b.price - a.price)
      }
      setFilteredRecommendations(sorted)
    }
  }, [sortOption, activeTab, eventsData.you_might_like])

  // Update filtered recommendations when tab changes
  useEffect(() => {
    if (activeTab === "personalized") {
      setFilteredRecommendations(eventsData.you_might_like)
    } else if (activeTab === "new") {
      setFilteredRecommendations(eventsData.hot_events)
    } else if (activeTab === "similar") {
      setFilteredRecommendations(eventsData.nearby_events)
    }
  }, [activeTab, eventsData])

  const handleViewDetails = (event: any) => {
    setSelectedEvent(event)
    setIsDetailsOpen(true)
  }

  const handleBookNow = (eventTitle: string) => {
    const event = selectedEvent || 
      eventsData.hot_events.find((e) => e.title === eventTitle) ||
      eventsData.nearby_events.find((e) => e.title === eventTitle) ||
      eventsData.you_might_like.find((e) => e.title === eventTitle)

    if (!event) return

    const cartItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      category: event.category,
      price: event.price,
      quantity: 1,
    }

    const existingCart = JSON.parse(localStorage.getItem("tufanTicketCart") || "[]")
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === event.id)

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem("tufanTicketCart", JSON.stringify(existingCart))
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart!",
      description: `${event.title} has been added to your cart.`,
      className: "toast-success",
    })

    if (isDetailsOpen) {
      setIsDetailsOpen(false)
    }
  }

  const handleRefreshRecommendations = () => {
    fetchEventsData()
    toast({
      title: "Recommendations refreshed!",
      description: "We've updated your recommendations based on the latest data.",
      className: "toast-success",
    })
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Your Personalized Recommendations</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover events tailored just for you, powered by our AI recommendation engine that learns from your
            preferences and activity.
          </p>
        </div>

        {/* Preferences Summary - Using static data since not provided in JSON */}
        <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 mb-10 border border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold">Your Preference Profile</h2>
            <Button onClick={handleRefreshRecommendations} className="gradient-bg hover:opacity-90">
              <Sparkles className="mr-2 h-4 w-4" />
              Refresh Recommendations
            </Button>
          </div>
          {/* Static preferences since not in JSON */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Genres</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Concert</Badge>
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Dance</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Favorite Artists</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Various</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">Bollywood</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for different recommendation types */}
        <Tabs defaultValue="personalized" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="personalized" className="px-4">
                <Sparkles className="h-4 w-4 mr-2" />
                For You
              </TabsTrigger>
              <TabsTrigger value="new" className="px-4">
                <Star className="h-4 w-4 mr-2" />
                New Releases
              </TabsTrigger>
              <TabsTrigger value="similar" className="px-4">
                <History className="h-4 w-4 mr-2" />
                Nearby Events
              </TabsTrigger>
            </TabsList>

            {activeTab === "personalized" && (
              <div className="flex items-center w-full sm:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      Sort By
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortOption("match")}>
                      Match Score (Highest First)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("date")}>Date (Soonest First)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-low")}>Price (Low to High)</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("price-high")}>Price (High to Low)</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Personalized Recommendations Tab */}
          <TabsContent value="personalized">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover">
                  <div className="relative h-48">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white">{event.matchScore}% Match</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{event.category}</Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-primary mb-4">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span>{event.reason}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">₹{event.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="gradient-bg hover:opacity-90"
                          onClick={() => handleBookNow(event.title)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* New Releases Tab */}
          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover">
                  <div className="relative h-48">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-accent text-white">Hot Event</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{event.category}</Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-primary mb-4">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span>{event.reason}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">₹{event.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="gradient-bg hover:opacity-90"
                          onClick={() => handleBookNow(event.title)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Nearby Events Tab */}
          <TabsContent value="similar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((event) => (
                <Card key={event.id} className="overflow-hidden card-hover">
                  <div className="relative h-48">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{event.category}</Badge>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-primary mb-4">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span>{event.reason}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">₹{event.price.toFixed(2)}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(event)}>
                          Details
                        </Button>
                        <Button
                          size="sm"
                          className="gradient-bg hover:opacity-90"
                          onClick={() => handleBookNow(event.title)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Rest of the component remains the same */}
        {/* How Recommendations Work Section */}
        <div className="mt-16 bg-card/30 backdrop-blur-sm rounded-xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center">How Our Recommendation System Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <ThumbsUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Preference Learning</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your likes, searches, and browsing patterns to understand your unique preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <History className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Event History</h3>
              <p className="text-sm text-muted-foreground">
                We consider events you've attended in the past to suggest similar experiences you might enjoy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Personalized Matching</h3>
              <p className="text-sm text-muted-foreground">
                Our algorithm calculates a match score for each event based on how well it aligns with your interests.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/explore">
              <Button className="gradient-bg hover:opacity-90">Explore More Events</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Sheet */}
      <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <SheetContent className="card-glass border-white/10 w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Event Details</SheetTitle>
            <SheetDescription>
              {selectedEvent?.matchScore && `${selectedEvent.matchScore}% match for you`}
            </SheetDescription>
          </SheetHeader>

          {selectedEvent && (
            <div className="mt-6 space-y-6">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <Badge variant="outline" className="mb-2">{selectedEvent.category}</Badge>
                <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg">
                <h3 className="font-medium mb-2">Why We Recommend This</h3>
                <p className="text-sm">{selectedEvent.reason}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Price</p>
                    <p className="text-xl font-bold">₹{selectedEvent.price.toFixed(2)}</p>
                  </div>
                  <Button className="gradient-bg hover:opacity-90" onClick={() => handleBookNow(selectedEvent.title)}>
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}