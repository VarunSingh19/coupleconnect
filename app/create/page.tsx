"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { createUser } from "@/lib/actions/auth-actions"

export default function CreatePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [connectionCode, setConnectionCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await createUser(formData)
      if (result.success) {
        setConnectionCode(result.connectionCode)
        setStep(2)
      } else {
        setError(result.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(connectionCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const continueToApp = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-100 dark:from-gray-900 dark:to-rose-950 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-rose-100 dark:border-rose-900">
        <CardHeader className="space-y-1">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <CardTitle className="text-2xl font-serif">Create Your Connection</CardTitle>
          </div>
          <CardDescription>
            {step === 1
              ? "Create your account to start connecting with your partner"
              : "Share this code with your partner to connect"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-rose-500 hover:bg-rose-600" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>
              <div className="flex justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-rose-600 hover:underline">
                    login
                  </Link>{" "}or{" "}

                  <Link href="/join" className="text-rose-600 hover:underline">
                    Join them
                  </Link>

                </p>
              </div>
            </form>
          ) : (
            <div className="space-y-6 py-4">
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your connection code:</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="bg-rose-50 dark:bg-rose-950 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
                    <p className="text-2xl font-mono font-bold tracking-wider text-rose-700 dark:text-rose-300">
                      {connectionCode}
                    </p>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="border-rose-200 dark:border-rose-800"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share this code with your partner so they can join your connection.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  They'll need to use the "Join Partner" option and enter this code.
                </p>
              </div>
            </div>
          )}
        </CardContent>

        {step === 2 && (
          <CardFooter>
            <Button onClick={continueToApp} className="w-full bg-rose-500 hover:bg-rose-600">
              Continue to App
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

