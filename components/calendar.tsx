"use client"

import { useState } from "react"

type Event = {
  date: string
  title: string
  type: "anniversary" | "birthday" | "date" | "reminder"
}

export default function Calendar() {
  // In a real app, these would be fetched from your database
  const [events] = useState<Event[]>([
    { date: "2023-12-15", title: "Movie Night", type: "date" },
    { date: "2023-12-20", title: "Anniversary Dinner", type: "anniversary" },
    { date: "2023-12-28", title: "Partner's Birthday", type: "birthday" },
  ])

  // Generate calendar days for December 2023
  const days = []
  const firstDay = new Date(2023, 11, 1).getDay() // 0 = Sunday, 1 = Monday, etc.
  const daysInMonth = 31

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    days.push({ day: null, events: [] })
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `2023-12-${i.toString().padStart(2, "0")}`
    const dayEvents = events.filter((event) => event.date === dateStr)
    days.push({ day: i, events: dayEvents })
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "anniversary":
        return "bg-rose-500"
      case "birthday":
        return "bg-blue-500"
      case "date":
        return "bg-purple-500"
      case "reminder":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-medium text-sm py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[80px] p-1 border rounded-md ${
              day.day ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"
            }`}
          >
            {day.day && (
              <>
                <div className="text-right text-sm mb-1">{day.day}</div>
                <div className="space-y-1">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`text-xs p-1 rounded text-white ${getEventColor(event.type)}`}
                      title={event.title}
                    >
                      {event.title.length > 12 ? `${event.title.substring(0, 10)}...` : event.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

