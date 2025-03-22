"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import HeroSection from "@/components/hero-section"
import RecommendedEvents from "@/components/recommended-events"
import TrendingEvents from "@/components/trending-events"
import SocialConnections from "@/components/social-connections"
import ExploreSection from "@/components/explore-section"

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    // If not logged in, redirect to landing page
    if (!isLoggedIn) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="pt-16">
      <HeroSection />
      <RecommendedEvents />
      <TrendingEvents />
      <SocialConnections />
      <ExploreSection />
    </div>
  )
}

