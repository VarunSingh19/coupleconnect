import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"
import Calendar from "@/components/calendar"

export default function CalendarPage() {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shared Calendar</h1>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>December 2023</CardTitle>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Loading />}>
                  <Calendar />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Anniversary Dinner</h3>
                      <span className="text-sm text-rose-600 dark:text-rose-400">Dec 20</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Reservation at 7:30 PM at La Belle Restaurant
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Movie Night</h3>
                      <span className="text-sm text-gray-500">Dec 15</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Watch the new release together at home
                    </p>
                  </div>

                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Partner's Birthday</h3>
                      <span className="text-sm text-gray-500">Dec 28</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Don't forget to prepare a surprise!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <GlobalChat />
    </div>
  )
}

