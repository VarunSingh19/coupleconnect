import { Suspense } from "react"
import Link from "next/link"
import { Heart, Film, Image, CheckSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import GlobalChat from "@/components/global-chat"
import DailyNote from "@/components/daily-note"
import Loading from "@/components/loading"
import PartnerStatus from "@/components/partner-status"
import UpcomingEvents from "@/components/upcoming-events"
import RecentMemories from "@/components/recent-memories"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 dark:from-gray-900 dark:to-rose-950">
      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Couples Connect</h1>
          </div>
          <nav className="hidden md:flex space-x-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Home</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/movies">Movies</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tasks">Tasks</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/calendar">Calendar</Link>
            </Button>
          </nav>
          <Button variant="outline" size="sm" className="md:hidden">
            Menu
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<Loading />}>
              <DailyNote />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<Loading />}>
              <PartnerStatus />
            </Suspense>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<Loading />}>
              <RecentMemories />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<Loading />}>
              <UpcomingEvents />
            </Suspense>
          </div>
        </div>

        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-900 dark:text-white">Connect Together</h2>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-serif">
                <Image className="h-5 w-5 text-rose-500" />
                <span>Media Gallery</span>
              </CardTitle>
              <CardDescription>Share your special moments</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-800 dark:to-gray-900 rounded-md">
              <p className="text-gray-500 dark:text-gray-400 text-sm">View your latest photos</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-rose-500 hover:bg-rose-600">
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-serif">
                <Film className="h-5 w-5 text-rose-500" />
                <span>Movie Viewer</span>
              </CardTitle>
              <CardDescription>Watch together in sync</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-800 dark:to-gray-900 rounded-md">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Continue watching together</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-rose-500 hover:bg-rose-600">
                <Link href="/movies">Watch Together</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-serif">
                <CheckSquare className="h-5 w-5 text-rose-500" />
                <span>Tasks & To-Dos</span>
              </CardTitle>
              <CardDescription>Manage your shared tasks</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-800 dark:to-gray-900 rounded-md">
              <p className="text-gray-500 dark:text-gray-400 text-sm">3 tasks need attention</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-rose-500 hover:bg-rose-600">
                <Link href="/tasks">Manage Tasks</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-serif">
                <Clock className="h-5 w-5 text-rose-500" />
                <span>Timeline</span>
              </CardTitle>
              <CardDescription>Your relationship journey</CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 dark:from-gray-800 dark:to-gray-900 rounded-md">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Relive your special moments</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-rose-500 hover:bg-rose-600">
                <Link href="/timeline">View Timeline</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </main>

      <GlobalChat />
    </div>
  )
}

