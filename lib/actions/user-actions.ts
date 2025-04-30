"use server"

import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"
import { getCurrentUser } from "./auth-actions"

export async function getPartnerStatus() {
  try {
    const user = await getCurrentUser()
    if (!user || !user.partnerId) {
      throw new Error("Unauthorized or no partner connected")
    }

    const client = await clientPromise
    const db = client.db("couples_app")

    const partner = await db.collection("users").findOne({ _id: new ObjectId(user.partnerId) })
    if (!partner) {
      throw new Error("Partner not found")
    }

    // Check if partner is online (active in the last 5 minutes)
    const fiveMinutesAgo = new Date()
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5)

    const isOnline = partner.lastActive > fiveMinutesAgo

    // Format last active time
    const lastActive = formatLastActive(partner.lastActive)

    return {
      name: partner.name,
      isOnline,
      lastActive,
    }
  } catch (error) {
    console.error("Error getting partner status:", error)
    throw error
  }
}

function formatLastActive(date: Date) {
  const now = new Date()
  const diffMs = now.getTime() - new Date(date).getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`

  return new Date(date).toLocaleDateString()
}

export async function updateLastActive() {
  try {
    const user = await getCurrentUser()
    if (!user) return

    const client = await clientPromise
    const db = client.db("couples_app")

    await db.collection("users").updateOne({ _id: new ObjectId(user.id) }, { $set: { lastActive: new Date() } })
  } catch (error) {
    console.error("Error updating last active:", error)
  }
}

