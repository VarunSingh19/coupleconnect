import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import clientPromise from "@/lib/mongodb"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await uploadImage(file)

    // Save reference in MongoDB
    const client = await clientPromise
    const db = client.db("couples_app")

    const mediaItem = {
      userId: session.user.id,
      title: formData.get("title") || file.name,
      description: formData.get("description") || "",
      mediaType: file.type.startsWith("image/") ? "image" : "video",
      url: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
      createdAt: new Date(),
    }

    await db.collection("media").insertOne(mediaItem)

    return NextResponse.json({ success: true, media: mediaItem })
  } catch (error) {
    console.error("Error uploading media:", error)
    return NextResponse.json({ error: "Failed to upload media" }, { status: 500 })
  }
}

