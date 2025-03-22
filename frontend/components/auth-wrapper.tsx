"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Check if user is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)
  }, [])

  // Don't show header on landing page or when loading
  if (isLoading) return children

  // Don't show header on landing page
  if (!isLoggedIn && pathname === "/") return children

  // Don't show header on facial auth page
  if (pathname === "/facial-auth") return children

  // Show header on all other pages when logged in
  if (isLoggedIn) {
    return (
      <>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </>
    )
  }

  // Default case - just render children
  return children
}

