"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  image: string
  caption: string
}

export function Modal({ isOpen, onClose, image, caption }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-[#FFD700] text-black hover:bg-[#E6C200]"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="max-w-5xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="relative w-full aspect-video">
          <Image src={image || "/placeholder.svg"} alt={caption} fill className="object-contain" />
        </div>
        <div className="bg-black/80 py-3 px-4 mt-2 rounded">
          <p className="text-white text-center">{caption}</p>
        </div>
      </div>
    </div>
  )
}
