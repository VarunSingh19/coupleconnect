"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

type Task = {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate: string
  category: string
  assignedTo: string
}

export default function TaskList() {
  // In a real app, these would be fetched from your database
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Plan weekend date",
      description: "Research restaurants and activities for Saturday",
      completed: false,
      dueDate: "2023-12-15",
      category: "Date Night",
      assignedTo: "user",
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "Get ingredients for dinner this week",
      completed: true,
      dueDate: "2023-12-10",
      category: "Shopping",
      assignedTo: "partner",
    },
    {
      id: 3,
      title: "Book anniversary dinner",
      description: "Make reservations at our favorite restaurant",
      completed: false,
      dueDate: "2023-12-20",
      category: "Anniversary",
      assignedTo: "user",
    },
  ])

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">No tasks for today. Add one to get started!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg ${
              task.completed ? "bg-gray-50 dark:bg-gray-800/50" : "bg-white dark:bg-gray-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-medium ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
                  >
                    {task.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="h-8 w-8 text-gray-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    Due: {task.dueDate}
                  </Badge>
                  <Badge className="bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100 text-xs">
                    {task.category}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Assigned to: {task.assignedTo === "user" ? "You" : "Partner"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

