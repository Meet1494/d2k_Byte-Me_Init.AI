"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Search,
  User,
  Menu,
  X,
  LogOut,
  Settings,
  ShoppingBag,
  Users,
  MessageSquare,
  ChevronRight,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Update the navigation links to point to the new stadium page path
const navLinks = [
  { name: "Home", href: "/dashboard" },
  { name: "Explore", href: "/explore" },
  { name: "Recommended", href: "/recommended" },
  { name: "Trending", href: "/trending" },
  { name: "Sports Events", href: "/stadium" },
  { name: "My Events", href: "/my-events" },
  { name: "Communities", href: "/communities" },
  { name: "For Organizers", href: "/organizer" },
]

// Mock communities data
const mockCommunities = [
  {
    eventId: 101,
    eventTitle: "Taylor Swift: The Eras Tour",
    image: "/placeholder.svg?height=100&width=100",
    unreadMessages: 5,
    lastActive: "2 minutes ago",
  },
  {
    eventId: 102,
    eventTitle: "NBA Finals: Lakers vs Celtics",
    image: "/placeholder.svg?height=100&width=100",
    unreadMessages: 0,
    lastActive: "1 hour ago",
  },
  {
    eventId: 103,
    eventTitle: "World Cup Finals: Team A vs Team B",
    image: "/placeholder.svg?height=100&width=100",
    unreadMessages: 12,
    lastActive: "3 hours ago",
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [hasNotification, setHasNotification] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [communities, setCommunities] = useState<any[]>([])
  const [cartItemCount, setCartItemCount] = useState(0)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const { toast } = useToast()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Get communities from localStorage or use mock data
  useEffect(() => {
    const loadCommunities = () => {
      const storedCommunities = JSON.parse(localStorage.getItem("eventCommunities") || "[]")
      if (storedCommunities.length === 0) {
        setCommunities(mockCommunities)
      } else {
        setCommunities(storedCommunities)
      }
    }

    // Load communities initially
    loadCommunities()

    // Set up event listener for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "eventCommunities") {
        loadCommunities()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Create a custom event listener for local changes
    const handleCustomStorageChange = () => {
      loadCommunities()
    }

    window.addEventListener("localStorageChange", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("localStorageChange", handleCustomStorageChange)
    }
  }, [])

  // Load cart items count
  useEffect(() => {
    const loadCartItems = () => {
      const storedCart = localStorage.getItem("tufanTicketCart")
      if (storedCart) {
        const cartItems = JSON.parse(storedCart)
        setCartItemCount(cartItems.length)
      } else {
        setCartItemCount(0)
      }
    }

    // Load cart items initially
    loadCartItems()

    // Listen for cart updates
    const handleCartUpdated = () => {
      loadCartItems()
    }

    window.addEventListener("cartUpdated", handleCartUpdated)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdated)
    }
  }, [])

  // Simulate notifications - reduced frequency
  useEffect(() => {
    // Simulate getting a notification after 30 seconds
    const timer = setTimeout(() => {
      setHasNotification(true)
    }, 30000)

    return () => clearTimeout(timer)
  }, [])

  // Mock search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      // Mock AI-powered suggestions
      const suggestions = [
        `${searchQuery} events near you`,
        `${searchQuery} concerts`,
        `${searchQuery} workshops`,
        `Popular ${searchQuery} events`,
      ].filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      setSearchSuggestions(suggestions)
    } else {
      setSearchSuggestions([])
    }
  }, [searchQuery])

  const handleNotificationClick = () => {
    setNotificationsOpen(true)
    setHasNotification(false)
  }

  const handleLogout = () => {
    // Remove logged in status
    localStorage.removeItem("isLoggedIn")

    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      className: "toast-info",
    })
    router.push("/")
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New Event Recommendation",
      description: "We found a new event that matches your interests!",
      time: "Just now",
      unread: true,
    },
    {
      id: 2,
      title: "Price Drop Alert",
      description: "Tickets for 'Summer Music Festival' are now 20% off!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 3,
      title: "Event Reminder",
      description: "Your event 'Tech Conference' starts tomorrow at 9 AM.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: 4,
      title: "Friend Invitation",
      description: "Alex invited you to join 'Wine Tasting Tour'.",
      time: "2 days ago",
      unread: false,
    },
  ]

  const totalUnreadMessages = communities.reduce((total, community) => total + community.unreadMessages, 0)

  // Update the search functionality in the header
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Store search query in localStorage
      localStorage.setItem(
        "searchParams",
        JSON.stringify({
          searchQuery: searchQuery,
        }),
      )

      // Navigate to explore page
      router.push("/explore")
      setSearchSuggestions([])
    }
  }

  // Add a function to dispatch custom event when localStorage changes
  // Add this function after the existing functions in the component
  const dispatchStorageEvent = () => {
    window.dispatchEvent(new Event("localStorageChange"))
  }

  return (
    <>
      {/* Background elements */}
      <div className="bg-mesh"></div>
      <div className="bg-grid"></div>
      <div className="bg-noise"></div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center">
              <h1 className="text-2xl font-bold gradient-text-animated">TufanTicket</h1>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`nav-item ${pathname === link.href ? "active" : ""}`}
                  >
                    {link.name}
                    {link.name === "Communities" && communities.length > 0 && (
                      <span className="community-badge">{communities.length}</span>
                    )}
                  </Link>
                ))}
              </nav>
            )}

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search events, artists..."
                    className="w-[200px] lg:w-[300px] pl-10 pr-4 rounded-full search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                  />
                </div>

                {/* Search Suggestions */}
                {searchSuggestions.length > 0 && (
                  <div className="absolute top-full mt-1 w-full bg-card/90 backdrop-blur-md border border-white/10 rounded-md shadow-glass z-10">
                    <ul className="py-1">
                      {searchSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm transition-colors"
                          onClick={() => {
                            setSearchQuery(suggestion)
                            setSearchSuggestions([])
                            handleSearch()
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Communities Dropdown */}
              {!isMobile && communities.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Users className="h-5 w-5" />
                      {totalUnreadMessages > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-white text-xs flex items-center justify-center">
                          {totalUnreadMessages}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72 bg-card/90 backdrop-blur-md border border-white/10">
                    <div className="p-2">
                      <h3 className="font-semibold text-sm mb-2">My Communities</h3>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {communities.map((community) => (
                          <Link
                            key={community.eventId}
                            href={`/communities/${community.eventId}`}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-primary/10 transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="relative w-8 h-8 rounded-md overflow-hidden mr-2">
                                <Image
                                  src={community.image || "/placeholder.svg"}
                                  alt={community.eventTitle}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium line-clamp-1">{community.eventTitle}</p>
                                <p className="text-xs text-muted-foreground">{community.lastActive}</p>
                              </div>
                            </div>
                            {community.unreadMessages > 0 && (
                              <Badge className="bg-accent text-white">{community.unreadMessages}</Badge>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/10">
                        <Link
                          href="/communities"
                          className="flex items-center justify-between text-sm text-primary hover:text-accent transition-colors"
                        >
                          <span>View All Communities</span>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Notification Bell */}
              <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                    <Bell className="h-5 w-5" />
                    {hasNotification && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent animate-pulse-subtle" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="card-glass border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white">Notifications</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg card-glass-hover ${notification.unread ? "border-accent/50 bg-accent/5" : ""}`}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-sm">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              {/* User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card/90 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-start p-2">
                    <Avatar className="h-10 w-10 mr-2 border border-white/20">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
                    <Link href="/profile" className="flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
                    <Link href="/my-events" className="flex w-full items-center">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
                    <Link href="/communities" className="flex w-full items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>My Communities</span>
                      {totalUnreadMessages > 0 && (
                        <Badge className="ml-auto bg-accent text-white">{totalUnreadMessages}</Badge>
                      )}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10">
                    <Link href="/profile/settings" className="flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobile && mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-card/90 backdrop-blur-md border border-white/10 rounded-lg">
              <div className="relative mb-4 px-4">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events, artists..."
                  className="w-full pl-8 pr-4 rounded-full search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <nav className="flex flex-col space-y-1 px-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between p-2 rounded-md ${
                      pathname === link.href ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
                    } transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {link.name === "Communities" && communities.length > 0 && (
                      <Badge className="bg-accent text-white">{communities.length}</Badge>
                    )}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  className={`flex items-center justify-between p-2 rounded-md ${
                    pathname === "/cart" ? "bg-primary/20 text-primary" : "hover:bg-primary/10"
                  } transition-colors`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart
                  </span>
                  {cartItemCount > 0 && <Badge className="bg-primary text-white">{cartItemCount}</Badge>}
                </Link>
              </nav>

              {communities.length > 0 && (
                <div className="mt-4 pt-4 border-t border-white/10 px-4">
                  <h3 className="text-sm font-medium mb-2">My Communities</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {communities.map((community) => (
                      <Link
                        key={community.eventId}
                        href={`/communities/${community.eventId}`}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-primary/10 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <div className="relative w-8 h-8 rounded-md overflow-hidden mr-2">
                            <Image
                              src={community.image || "/placeholder.svg"}
                              alt={community.eventTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-sm font-medium line-clamp-1">{community.eventTitle}</p>
                        </div>
                        {community.unreadMessages > 0 && (
                          <Badge className="bg-accent text-white">{community.unreadMessages}</Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  )
}

