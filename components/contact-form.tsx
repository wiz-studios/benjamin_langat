"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Log to console
    console.log("Contact Form Submission:", formData)

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]")
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem("contactSubmissions", JSON.stringify(submissions))

    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", location: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  if (isSubmitted) {
    return (
      <div className="bg-[#FFD700]/10 border border-[#FFD700] rounded-lg p-8 text-center">
        <CheckCircle className="h-12 w-12 text-[#FFD700] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-black mb-2">Thank You!</h3>
        <p className="text-gray-700">Your message has been received. We will get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-black font-medium">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your full name"
          className="bg-white border-black focus:ring-[#FFD700] focus:border-[#FFD700]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-black font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email address"
          className="bg-white border-black focus:ring-[#FFD700] focus:border-[#FFD700]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-black font-medium">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
          className="bg-white border-black focus:ring-[#FFD700] focus:border-[#FFD700]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-black font-medium">
          Location
        </Label>
        <Input
          id="location"
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Enter your location (e.g., Ward, Village)"
          className="bg-white border-black focus:ring-[#FFD700] focus:border-[#FFD700]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-black font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Write your message here..."
          className="bg-white border-black focus:ring-[#FFD700] focus:border-[#FFD700] resize-none"
        />
      </div>

      <Button type="submit" className="w-full bg-[#FFD700] text-black hover:bg-[#E6C200] font-semibold">
        Send Message
      </Button>
    </form>
  )
}
