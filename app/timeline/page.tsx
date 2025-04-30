import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"

export default function TimelinePage() {
  // In a real app, these would be fetched from your database
  const events = [
    {
      id: 1,
      title: "First Date",
      date: "2022-01-15",
      description: "Our first coffee date at that cute café downtown.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "First Trip Together",
      date: "2022-04-10",
      description: "Weekend getaway to the mountains. It was magical!",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Moving In Together",
      date: "2022-08-22",
      description: "Started our life together in our first shared apartment.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "One Year Anniversary",
      date: "2023-01-15",
      description: "Celebrated one amazing year together with a fancy dinner.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Relationship Timeline</h1>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Memory
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-rose-300 dark:bg-rose-800"></div>

            <div className="space-y-12">
              {events.map((event, index) => (
                <div key={event.id} className="relative">
                  {/* Date marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white z-10">
                    {index + 1}
                  </div>

                  {/* Content card - alternating sides */}
                  <div className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"} relative`}>
                    <Card className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                      <CardContent className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Suspense>
      </main>

      <GlobalChat />
    </div>
  )
}

