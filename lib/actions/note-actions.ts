"use server"

import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "./auth-actions"

const affirmations = [
  "I'm so grateful to have you in my life. You make every day brighter.",
  "Your smile is my favorite part of the day.",
  "Thank you for always being there for me, through thick and thin.",
  "I love the way you make me laugh, even on my worst days.",
  "You inspire me to be a better person every single day.",
  "I cherish every moment we spend together.",
  "Your love gives me strength and courage to face any challenge.",
  "I'm proud of the relationship we've built together.",
  "You understand me like no one else does.",
  "I fall in love with you more and more each day.",
]

export async function getDailyNote() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    // Check if there's a custom note for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const customNote = await db.collection("notes").findOne({
      receiverId: user.id,
      createdAt: { $gte: today },
    })

    if (customNote) {
      return { text: customNote.text }
    }

    // If no custom note, return a random affirmation
    const randomIndex = Math.floor(Math.random() * affirmations.length)
    return { text: affirmations[randomIndex] }
  } catch (error) {
    console.error("Error getting daily note:", error)
    // Return a fallback note
    return { text: "Every day with you is a blessing." }
  }
}

export async function createNote(receiverId: string, text: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      throw new Error("Unauthorized")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    await db.collection("notes").insertOne({
      senderId: user.id,
      receiverId,
      text,
      createdAt: new Date(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error creating note:", error)
    throw error
  }
}

