import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"
import UploadMedia from "@/components/upload-media"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 dark:from-gray-900 dark:to-rose-950">
      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">Media Gallery</h1>
          </div>
          <UploadMedia />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* This would be replaced with actual data from the database */}
            {Array.from({ length: 12 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-md transition-all border-rose-100 dark:border-rose-900 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Memory+${index + 1}`}
                      alt={`Memory ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                      <h3 className="text-white font-medium">Beautiful Memory</h3>
                      <p className="text-white/80 text-sm">Added on March 15, 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="overflow-hidden group hover:shadow-md transition-all border-rose-100 dark:border-rose-900 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-dashed flex items-center justify-center">
              <CardContent className="p-0 w-full h-full">
                <div className="flex flex-col items-center justify-center h-full aspect-square p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-2">
                    <Plus className="h-6 w-6 text-rose-500" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Add New Memory</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Upload photos and videos</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Suspense>
      </main>

      <GlobalChat />
    </div>
  )
}

