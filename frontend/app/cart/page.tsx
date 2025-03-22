"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, MapPin, Clock, Trash2, Plus, Minus, CreditCard, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Cart item type
interface CartItem {
  id: number
  title: string
  date: string
  time: string
  location: string
  image: string
  category: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("tufanTicketCart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    setIsLoading(false)
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("tufanTicketCart", JSON.stringify(cartItems))

      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }, [cartItems, isLoading])

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Calculate service fee (15% of subtotal)
  const serviceFee = subtotal * 0.15

  // Calculate total
  const total = subtotal + serviceFee

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, Math.min(10, item.quantity + change))
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "The event has been removed from your cart.",
      className: "toast-info",
    })
  }

  const handleClearCart = () => {
    setCartItems([])

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      className: "toast-info",
    })
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add events to your cart before checking out.",
        className: "toast-warning",
      })
      return
    }

    setIsPaymentDialogOpen(true)
  }

  const handlePaymentSubmit = () => {
    setIsProcessing(true)

    // Redirect to facial authentication page
    router.push("/facial-auth")
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            Your Cart
            {cartItems.length > 0 && <Badge className="ml-2 bg-primary text-white">{cartItems.length}</Badge>}
          </h1>
          <p className="text-muted-foreground">Review your selected events before checkout.</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden card-glass">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                              <Badge variant="outline" className="mb-2">
                                {item.category}
                              </Badge>
                              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{item.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{item.time}</span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{item.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-lg font-bold mb-2">₹{(item.price * item.quantity).toFixed(2)}</div>
                              <div className="flex items-center gap-2 mb-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => handleQuantityChange(item.id, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-full"
                                  onClick={() => handleQuantityChange(item.id, 1)}
                                  disabled={item.quantity >= 10}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive/80"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="text-muted-foreground" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="card-glass sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span>₹{serviceFee.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2 bg-white/10" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full gradient-bg hover:opacity-90 text-white" size="lg" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>

                  <div className="mt-6 text-center">
                    <Link href="/explore" className="text-sm text-primary hover:text-primary/80">
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="font-medium mb-2">Secure Checkout</h4>
                    <p className="text-xs text-muted-foreground">
                      Your payment information is processed securely. We do not store credit card details nor have
                      access to your credit card information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-card/30 backdrop-blur-sm rounded-lg border border-white/10">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any events to your cart yet.</p>
            <Link href="/explore">
              <Button className="gradient-bg hover:opacity-90">Explore Events</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>Enter your payment details to complete the booking.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="debit-card">Debit Card</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="net-banking">Net Banking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input id="upi-id" placeholder="username@upi" />
              </div>
            )}

            {paymentMethod === "net-banking" && (
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <Select>
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select your bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sbi">State Bank of India</SelectItem>
                    <SelectItem value="hdfc">HDFC Bank</SelectItem>
                    <SelectItem value="icici">ICICI Bank</SelectItem>
                    <SelectItem value="axis">Axis Bank</SelectItem>
                    <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between font-bold">
                <span>Total Amount:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button className="gradient-bg hover:opacity-90" onClick={handlePaymentSubmit} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay ₹{total.toFixed(2)}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

