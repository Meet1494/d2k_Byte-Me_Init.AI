"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, MapPin, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function EventCard({ event, showLoginRequiredToast = null }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCardClick = () => {
    setIsDialogOpen(true)
  }

  const handleBookNow = () => {
    if (showLoginRequiredToast) {
      showLoginRequiredToast()
      return
    }

    // Add to cart
    const cartItem = {
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time || "7:00 PM", // Default time if not provided
      location: event.location,
      image: event.image,
      category: event.category,
      price: event.price || Math.floor(Math.random() * 5000) + 1000, // Random price if not provided
      quantity: 1,
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("tufanTicketCart") || "[]")

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item) => item.id === event.id)

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      existingCart[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      existingCart.push(cartItem)
    }

    // Save updated cart
    localStorage.setItem("tufanTicketCart", JSON.stringify(existingCart))

    // Dispatch custom event to update cart count in header
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart!",
      description: `${event.title} has been added to your cart.`,
      className: "toast-success",
    })

    setIsDialogOpen(false)
  }

  const handleCheckout = () => {
    // Add to cart first
    handleBookNow()

    // Then navigate to cart
    router.push("/cart")
  }

  return (
    <>
      <Card
        className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={handleCardClick}
      >
        <div className="relative h-48">
          <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
          {event.category && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/80 dark:bg-black/80">
                {event.category}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{event.date}</span>
          </div>
          {event.time && (
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </CardContent>
        {event.reason && (
          <CardFooter className="p-4 pt-0 border-t">
            <div className="flex items-center text-xs text-muted-foreground">
              <Tag className="h-3 w-3 mr-1" />
              <span>{event.reason}</span>
            </div>
          </CardFooter>
        )}
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription>{event.category && `Category: ${event.category}`}</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="relative h-56 rounded-md overflow-hidden">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{event.date}</span>
              </div>

              {event.time && (
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
              )}

              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{event.location}</span>
              </div>
            </div>

            {event.description && (
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-1">About this event</h4>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            )}

            {event.reason && (
              <div className="pt-2 flex items-start">
                <Tag className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium">Recommended because</h4>
                  <p className="text-sm text-muted-foreground">{event.reason}</p>
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-bold">₹{event.price || "1999.00"}</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" onClick={handleBookNow}>
                  Add to Cart
                </Button>
                <Button className="gradient-bg hover:opacity-90" onClick={handleCheckout}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

