import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CardProps {
  title: string
  description: string
  image?: string
  href?: string
  buttonText?: string
  icon?: React.ReactNode
}

export function Card({ title, description, image, href, buttonText, icon }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100">
      {image && (
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
      )}
      <div className="p-6">
        {icon && <div className="mb-4 text-[#FFD700]">{icon}</div>}
        <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
        {href && buttonText && (
          <Button asChild className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium">
            <Link href={href}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
