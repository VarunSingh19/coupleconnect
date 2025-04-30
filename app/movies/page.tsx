import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Play, Plus } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"

export default function MoviesPage() {
  // In a real app, these would be fetched from your database
  const movies = [
    { id: 1, title: "Our Favorite Movie", thumbnail: "/placeholder.svg?height=200&width=350", progress: 65 },
    { id: 2, title: "Anniversary Trip Video", thumbnail: "/placeholder.svg?height=200&width=350", progress: 30 },
    { id: 3, title: "Holiday Memories", thumbnail: "/placeholder.svg?height=200&width=350", progress: 0 },
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Movie Viewer</h1>
          </div>
          <Button className="bg-rose-500 hover:bg-rose-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Movie
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Add a Movie from Drive</h2>
              <div className="flex gap-2">
                <Input placeholder="Paste your Google Drive link here..." className="flex-1" />
                <Button>Import</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Your Movies</h2>
          <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <Card key={movie.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={movie.thumbnail || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button size="icon" className="rounded-full bg-rose-500 hover:bg-rose-600">
                          <Play className="h-5 w-5" />
                        </Button>
                      </div>
                      {movie.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                          <div className="h-full bg-rose-500" style={{ width: `${movie.progress}%` }}></div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{movie.title}</h3>
                      {movie.progress > 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{movie.progress}% watched</p>
                      ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Not started</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
        </section>
      </main>

      <GlobalChat />
    </div>
  )
}

