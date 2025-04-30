"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"
import { getUpcomingEvents } from "@/lib/actions/calendar-actions"

type Event = {
  id: string
  title: string
  date: string
  type: "anniversary" | "birthday" | "date" | "reminder"
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setIsLoading(true)
        const upcomingEvents = await getUpcomingEvents()
        setEvents(upcomingEvents)
      } catch (error) {
        console.error("Error fetching upcoming events:", error)
        // Set placeholder data
        setEvents([
          { id: "1", title: "Movie Night", date: "2023-12-15", type: "date" },
          { id: "2", title: "Anniversary Dinner", date: "2023-12-20", type: "anniversary" },
          { id: "3", title: "Partner's Birthday", date: "2023-12-28", type: "birthday" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUpcomingEvents()
  }, [])

  const getEventStyles = (type: string) => {
    switch (type) {
      case "anniversary":
        return "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
      case "birthday":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
      case "date":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400"
      default:
        return "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-serif">Upcoming Events</CardTitle>
        <Button size="sm" className="bg-rose-500 hover:bg-rose-600" asChild>
          <Link href="/calendar">
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-rose-100 dark:bg-rose-900/20 rounded-md animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {events.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                No upcoming events. Add one to get started!
              </p>
            ) : (
              events.map((event) => (
                <div key={event.id} className={`p-3 border rounded-lg ${getEventStyles(event.type)}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <h3 className="font-medium">{event.title}</h3>
                    </div>
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

