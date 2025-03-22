import Link from "next/link"
import { Button } from "@/components/ui/button"

const CommunitiesPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Communities</h1>
      <p className="mb-5">Explore different communities and find events happening near you.</p>

      {/* Example Community Section - Replace with dynamic data */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Local Sports Community</h2>
        <p className="mb-3">
          Join fellow sports enthusiasts to discuss games, share highlights, and organize local meetups.
        </p>
        <Link href="/stadium">
          <Button className="gradient-bg hover:opacity-90">Explore Events</Button>
        </Link>
      </div>

      {/* Add more community sections here */}
    </div>
  )
}

export default CommunitiesPage

