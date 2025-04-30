import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Play, Pause, SkipForward, SkipBack, Music } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"

export default function PlaylistPage() {
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shared Playlist</h1>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Song
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Suspense fallback={<Loading />}>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 rounded-md flex items-center justify-center mr-4">
                        <Music className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Our Song</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Artist Name</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center p-3 bg-rose-50 dark:bg-rose-900/20 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 rounded-md flex items-center justify-center mr-4">
                        <Music className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">First Date Memory</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Artist Name</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pause className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 rounded-md flex items-center justify-center mr-4">
                        <Music className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Road Trip Favorite</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Artist Name</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 rounded-md flex items-center justify-center mr-4">
                        <Music className="h-5 w-5 text-rose-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Anniversary Dance</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Artist Name</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Now Playing</h2>
                <div className="flex flex-col items-center">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                    <Music className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="font-medium text-lg">First Date Memory</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Artist Name</p>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
                    <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: "45%" }}></div>
                  </div>

                  <div className="flex justify-between w-full text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>1:30</span>
                    <span>3:45</span>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Button variant="ghost" size="icon">
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button size="icon" className="bg-rose-500 hover:bg-rose-600 h-12 w-12 rounded-full">
                      <Pause className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SkipForward className="h-5 w-5" />
                    </Button>
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

