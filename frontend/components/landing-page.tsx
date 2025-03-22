"use client"

import { useEffect } from "react"
import HeroSection from "@/components/landing-hero-section"
import RecommendedEvents from "@/components/landing-recommended-events"
import TrendingEvents from "@/components/landing-trending-events"
import SocialConnections from "@/components/landing-social-connections"
import ExploreSection from "@/components/landing-explore-section"
import LandingHeader from "@/components/landing-header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function LandingPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    // Set up default user credentials if they don't exist
    if (!localStorage.getItem("userCredentials")) {
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          email: "user@example.com",
          password: "password123",
        }),
      )
    }

    // If user is already logged in, redirect to dashboard
    if (isLoggedIn) {
      router.push("/dashboard")
    }
  }, [router])

  // Function to show login required toast
  const showLoginRequiredToast = () => {
    toast({
      title: "Login Required",
      description: "You need to login to book tickets!",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
        <div className="pt-16">
          <HeroSection showLoginRequiredToast={showLoginRequiredToast} />
          <RecommendedEvents showLoginRequiredToast={showLoginRequiredToast} />
          <TrendingEvents showLoginRequiredToast={showLoginRequiredToast} />
          <SocialConnections showLoginRequiredToast={showLoginRequiredToast} />
          <ExploreSection showLoginRequiredToast={showLoginRequiredToast} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

