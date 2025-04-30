import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Calendar, Tag } from "lucide-react"
import Loading from "@/components/loading"
import GlobalChat from "@/components/global-chat"
import TaskList from "@/components/task-list"

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-rose-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white dark:bg-gray-950 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks & To-Dos</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Loading />}>
                  <TaskList />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Task title" />
                  </div>
                  <div>
                    <textarea
                      className="w-full min-h-[100px] p-2 border rounded-md bg-transparent"
                      placeholder="Task description"
                    ></textarea>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due Date
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <Tag className="h-4 w-4 mr-2" />
                      Category
                    </Button>
                  </div>
                  <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <GlobalChat />
    </div>
  )
}

