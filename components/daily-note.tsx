"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { getDailyNote } from "@/lib/actions/note-actions"

export default function DailyNote() {
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDailyNote = async () => {
      try {
        setIsLoading(true)
        const dailyNote = await getDailyNote()
        setNote(dailyNote.text)
      } catch (error) {
        console.error("Error fetching daily note:", error)
        setNote("Your partner loves you very much!")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDailyNote()
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900">
        <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
          <div className="animate-pulse flex space-x-4 w-full">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-rose-200 dark:bg-rose-800/50 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-rose-200 dark:bg-rose-800/50 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <Heart className="h-8 w-8 text-rose-400 animate-pulse" />
            <Heart className="h-6 w-6 text-rose-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-xl font-semibold mb-2 font-serif text-gray-900 dark:text-white">Daily Love Note</h2>
          <p className="text-gray-700 dark:text-gray-300 italic">{note}</p>
        </div>
      </CardContent>
    </Card>
  )
}

