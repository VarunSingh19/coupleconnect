"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { getRecentMedia } from "@/lib/actions/media-actions"

type MediaItem = {
  id: string
  title: string
  url: string
  createdAt: string
}

export default function RecentMemories() {
  const [memories, setMemories] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentMedia = async () => {
      try {
        setIsLoading(true)
        const media = await getRecentMedia()
        setMemories(media)
      } catch (error) {
        console.error("Error fetching recent media:", error)
        // Set placeholder data
        setMemories([
          { id: "1", title: "Beach Day", url: "/placeholder.svg?height=300&width=400", createdAt: "2023-06-15" },
          { id: "2", title: "Dinner Date", url: "/placeholder.svg?height=300&width=400", createdAt: "2023-07-22" },
          { id: "3", title: "Hiking Trip", url: "/placeholder.svg?height=300&width=400", createdAt: "2023-08-05" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecentMedia()
  }, [])

  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-serif">Recent Memories</CardTitle>
        <Button size="sm" className="bg-rose-500 hover:bg-rose-600" asChild>
          <Link href="/gallery">
            <Plus className="h-4 w-4 mr-1" />
            Add New
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-rose-100 dark:bg-rose-900/20 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {memories.map((memory) => (
              <div key={memory.id} className="relative aspect-square rounded-md overflow-hidden group">
                <Image
                  src={memory.url || "/placeholder.svg"}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <p className="text-white text-xs p-2 truncate w-full">{memory.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

