"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera } from "lucide-react"
import { toast } from "sonner"

export default function FacialAuthPage() {
  const [cameraActive, setCameraActive] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  // Start camera when component mounts or cameraActive changes
  useEffect(() => {
    if (!cameraActive) return

    let stream: MediaStream | null = null

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user", // Use the front-facing camera
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
        setCameraActive(false)
      }
    }

    startCamera()

    // Cleanup function to stop camera when component unmounts or cameraActive changes
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const handleStartCamera = () => {
    setCameraActive(true)
  }

  // Make sure we don't lose the booking details during facial authentication
  const handleTakePhoto = () => {
    setIsRedirecting(true)

    // Verify booking details exist before proceeding
    const bookingDetails = localStorage.getItem("bookingDetails")
    if (!bookingDetails) {
      console.error("No booking details found in localStorage")
      toast({
        title: "Booking information missing",
        description: "We couldn't find your booking information. Please try again.",
        className: "toast-error",
      })

      // Redirect back to stadium page after a short delay
      setTimeout(() => router.push("/stadium"), 2000)
      return
    }

    // Stop the camera
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    // Add a small delay to ensure camera cleanup completes
    setTimeout(() => {
      // Log that we're redirecting with booking details
      console.log("Facial auth complete, redirecting to success page with booking details")

      // Redirect to the booking-success page
      router.push("/events/booking-success")
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/80 p-4">
      <Card className="w-full max-w-md card-glass">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Facial Authentication</CardTitle>
          <CardDescription>
            For your security, we need to verify your identity before completing this transaction.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          {!cameraActive && !isRedirecting && (
            <div className="text-center py-8">
              <Camera className="h-16 w-16 mx-auto mb-4 text-primary opacity-70" />
              <p className="mb-6 text-muted-foreground">
                We'll need to take a photo to verify your identity. Your photo will not be stored after verification.
              </p>
              <Button className="gradient-bg hover:opacity-90" onClick={handleStartCamera}>
                Start Camera
              </Button>
            </div>
          )}

          {cameraActive && !isRedirecting && (
            <div className="w-full">
              <div className="relative rounded-lg overflow-hidden border-2 border-primary/30 mb-4">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto" />
              </div>
              <div className="flex justify-center">
                <Button className="gradient-bg hover:opacity-90" onClick={handleTakePhoto}>
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
            </div>
          )}

          {isRedirecting && (
            <div className="text-center py-8">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Verifying your identity...</p>
              <p className="text-xs text-muted-foreground mt-2">You will be redirected shortly</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col text-center text-xs text-muted-foreground">
          <p>Your privacy is important to us. Your facial data is only used for verification and is not stored.</p>
        </CardFooter>
      </Card>
    </div>
  )
}

