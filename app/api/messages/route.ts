import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import clientPromise from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    // Get messages between the user and their partner
    const messages = await db
      .collection("messages")
      .find({
        $or: [
          { senderId: session.user.id, receiverId: (session.user as any).partnerId },
          { senderId: (session.user as any).partnerId, receiverId: session.user.id },
        ],
      })
      .sort({ createdAt: 1 })
      .toArray()

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Error fetching messages:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const client = await clientPromise
    const db = client.db("couples_app")

    const message = {
      senderId: session.user.id,
      receiverId: (session.user as any).partnerId,
      text: data.text,
      createdAt: new Date(),
    }

    const result = await db.collection("messages").insertOne(message)

    return NextResponse.json({ success: true, message: { ...message, _id: result.insertedId } })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}

