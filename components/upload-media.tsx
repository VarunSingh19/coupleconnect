"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Film } from "lucide-react"
import { uploadMedia } from "@/lib/actions/media-actions"

export default function UploadMedia() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Create preview
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
      // Set default title from filename
      if (!title) {
        setTitle(file.name.split(".")[0])
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!fileInputRef.current?.files?.length) {
      return
    }

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append("file", fileInputRef.current.files[0])
      formData.append("title", title)
      formData.append("description", description)

      await uploadMedia(formData)

      // Reset form and close dialog
      setTitle("")
      setDescription("")
      setPreview(null)
      setIsOpen(false)

      // Refresh the page to show the new media
      window.location.reload()
    } catch (error) {
      console.error("Error uploading media:", error)
      alert("Failed to upload media. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rose-500 hover:bg-rose-600">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>Share photos and videos with your partner</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Choose File</Label>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                accept="image/*,video/*"
                onChange={handleFileChange}
                required
                className="cursor-pointer"
              />
            </div>
          </div>

          {preview && (
            <div className="relative aspect-video rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
              {preview.startsWith("data:image") ? (
                <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Film className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for your media"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

