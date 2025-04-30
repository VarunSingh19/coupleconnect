"use server"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "./auth-actions"

export async function sendMessage(text: string) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    const message = {
      senderId: user.id,
      receiverId: user.partnerId,
      text,
      createdAt: new Date(),
    }

    await db.collection("messages").insertOne(message)

    return { success: true }
  } catch (error) {
    console.error("Error sending message:", error)
    throw error
  }
}

export async function getMessages() {
  try {
    const user = await getCurrentUser()
    if (!user || !user.partnerId) {
      return []
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    const messages = await db
      .collection("messages")
      .find({
        $or: [
          { senderId: user.id, receiverId: user.partnerId },
          { senderId: user.partnerId, receiverId: user.id },
        ],
      })
      .sort({ createdAt: 1 })
      .limit(50)
      .toArray()

    return messages.map((msg) => ({
      id: msg._id.toString(),
      sender: msg.senderId === user.id ? "user" : "partner",
      text: msg.text,
      time: new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }))
  } catch (error) {
    console.error("Error getting messages:", error)
    return []
  }
}

