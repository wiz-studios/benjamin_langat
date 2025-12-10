"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AlbumImage {
    id: string
    src: string
    caption: string
}

interface AlbumViewProps {
    isOpen: boolean
    onClose: () => void
    albumName: string
    images: AlbumImage[]
    initialImageIndex?: number
}

export function AlbumView({ isOpen, onClose, albumName, images, initialImageIndex = 0 }: AlbumViewProps) {
    const [currentIndex, setCurrentIndex] = useState(initialImageIndex)

    if (!isOpen) return null

    const currentImage = images[currentIndex]
    const canGoPrev = currentIndex > 0
    const canGoNext = currentIndex < images.length - 1

    const handlePrev = () => {
        if (canGoPrev) setCurrentIndex(currentIndex - 1)
    }

    const handleNext = () => {
        if (canGoNext) setCurrentIndex(currentIndex + 1)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev()
        if (e.key === "ArrowRight") handleNext()
        if (e.key === "Escape") onClose()
    }

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {/* Close Button */}
            <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            >
                <X className="h-6 w-6" />
            </Button>

            {/* Album Title */}
            <div className="absolute top-4 left-4 text-white z-10">
                <h2 className="text-xl font-bold">{albumName}</h2>
                <p className="text-sm text-gray-300">
                    {currentIndex + 1} / {images.length}
                </p>
            </div>

            {/* Main Content */}
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Previous Button */}
                {canGoPrev && (
                    <Button
                        onClick={handlePrev}
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 text-white hover:bg-white/10 z-10"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>
                )}

                {/* Image */}
                <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center gap-6">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={currentImage.src}
                            alt={currentImage.caption}
                            width={1200}
                            height={800}
                            className="object-contain max-h-[65vh]"
                            priority
                        />
                    </div>
                    {currentImage.caption && (
                        <div className="bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg max-w-3xl mx-auto border border-white/20">
                            <p className="text-white text-lg font-medium text-center leading-relaxed">
                                {currentImage.caption}
                            </p>
                        </div>
                    )}
                </div>

                {/* Next Button */}
                {canGoNext && (
                    <Button
                        onClick={handleNext}
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 text-white hover:bg-white/10 z-10"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                )}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
                {images.map((img, index) => (
                    <button
                        key={img.id}
                        onClick={(e) => {
                            e.stopPropagation()
                            setCurrentIndex(index)
                        }}
                        className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${index === currentIndex ? "border-[#FFD700] scale-110" : "border-white/30 hover:border-white/60"
                            }`}
                    >
                        <Image src={img.src} alt={img.caption} fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    )
}
