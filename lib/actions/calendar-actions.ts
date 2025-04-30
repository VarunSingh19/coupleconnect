"use server"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "./auth-actions"

export async function getUpcomingEvents(limit = 3) {
  try {
    const user = await getCurrentUser()
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const events = await db
      .collection("events")
      .find({
        $or: [{ userId: user.id }, { userId: user.partnerId }],
        date: { $gte: today },
      })
      .sort({ date: 1 })
      .limit(limit)
      .toArray()

    return events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      date: event.date.toISOString(),
      type: event.type,
    }))
  } catch (error) {
    console.error("Error getting upcoming events:", error)
    return []
  }
}

export async function getAllEvents() {
  try {
    const user = await getCurrentUser()
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    const events = await db
      .collection("events")
      .find({
        $or: [{ userId: user.id }, { userId: user.partnerId }],
      })
      .sort({ date: 1 })
      .toArray()

    return events.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      type: event.type,
      userId: event.userId,
    }))
  } catch (error) {
    console.error("Error getting all events:", error)
    return []
  }
}

export async function createEvent(formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const title = formData.get("title") as string
    const description = (formData.get("description") as string) || ""
    const dateString = formData.get("date") as string
    const type = (formData.get("type") as string) || "reminder"

    if (!title || !dateString) {
      throw new Error("Title and date are required")
    }

    const date = new Date(dateString)

    const client = await clientPromise
    const db = client.db("couples_app")

    const event = {
      userId: user.id,
      title,
      description,
      date,
      type,
      createdAt: new Date(),
    }

    const result = await db.collection("events").insertOne(event)

    return {
      success: true,
      event: {
        id: result.insertedId.toString(),
        title,
        date: date.toISOString(),
        type,
      },
    }
  } catch (error) {
    console.error("Error creating event:", error)
    throw error
  }
}

