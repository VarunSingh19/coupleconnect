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

    // Get tasks for both the user and their partner
    const tasks = await db
      .collection("tasks")
      .find({
        $or: [{ userId: session.user.id }, { userId: (session.user as any).partnerId }],
      })
      .sort({ dueDate: 1 })
      .toArray()

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
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

    const task = {
      userId: session.user.id,
      title: data.title,
      description: data.description || "",
      completed: false,
      dueDate: data.dueDate || null,
      category: data.category || "General",
      assignedTo: data.assignedTo || session.user.id,
      createdAt: new Date(),
    }

    const result = await db.collection("tasks").insertOne(task)

    return NextResponse.json({ success: true, task: { ...task, _id: result.insertedId } })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

