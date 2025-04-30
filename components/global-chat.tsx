"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Minimize2, Maximize2, Heart } from "lucide-react"
import { sendMessage, getMessages } from "@/lib/actions/message-actions"

type Message = {
  id: string
  sender: "user" | "partner"
  text: string
  time: string
}

export default function GlobalChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      fetchMessages()
    }
  }, [isOpen, isMinimized])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen, isMinimized])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const fetchedMessages = await getMessages()
      setMessages(fetchedMessages)
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages([...messages, newMessage])
      setMessage("")

      try {
        await sendMessage(message)
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-rose-500 hover:bg-rose-600 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card
          className={`fixed bottom-6 right-6 w-80 shadow-lg transition-all duration-300 border-rose-200 dark:border-rose-900 ${
            isMinimized ? "h-14" : "h-96"
          }`}
        >
          <CardHeader className="p-3 flex flex-row items-center justify-between bg-gradient-to-r from-rose-400 to-pink-500 dark:from-rose-600 dark:to-pink-700 text-white rounded-t-lg">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Chat with Partner
            </CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                onClick={toggleMinimize}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:text-white hover:bg-white/20"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 h-[calc(100%-7rem)] overflow-y-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-rose-500"></div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.length === 0 ? (
                      <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-4">
                        No messages yet. Say hello to your partner!
                      </p>
                    ) : (
                      messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs opacity-70 text-right mt-1">{msg.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-3 pt-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1 border-rose-200 dark:border-rose-900 focus-visible:ring-rose-500"
                  />
                  <Button type="submit" size="icon" className="bg-rose-500 hover:bg-rose-600">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}

