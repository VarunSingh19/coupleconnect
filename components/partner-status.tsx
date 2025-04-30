"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserRound, Clock } from "lucide-react"
import { getPartnerStatus } from "@/lib/actions/user-actions"

export default function PartnerStatus() {
  const [partnerName, setPartnerName] = useState("")
  const [isOnline, setIsOnline] = useState(false)
  const [lastActive, setLastActive] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPartnerStatus = async () => {
      try {
        setIsLoading(true)
        const status = await getPartnerStatus()
        setPartnerName(status.name)
        setIsOnline(status.isOnline)
        setLastActive(status.lastActive)
      } catch (error) {
        console.error("Error fetching partner status:", error)
        setPartnerName("Your Partner")
        setIsOnline(false)
        setLastActive("a few hours ago")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPartnerStatus()
    const interval = setInterval(fetchPartnerStatus, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-serif">Partner Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse flex items-center space-x-4">
            <div className="rounded-full bg-rose-200 dark:bg-rose-800/50 h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-rose-200 dark:bg-rose-800/50 rounded w-1/2"></div>
              <div className="h-3 bg-rose-200 dark:bg-rose-800/50 rounded w-1/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-rose-100 dark:border-rose-900 hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif">Partner Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <UserRound className="h-10 w-10 text-gray-700 dark:text-gray-300" />
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              } ring-2 ring-white dark:ring-gray-900`}
            ></span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{partnerName}</p>
            {isOnline ? (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 border-green-200 dark:border-green-800"
              >
                Online now
              </Badge>
            ) : (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>Last active {lastActive}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

