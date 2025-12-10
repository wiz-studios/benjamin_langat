"use client"

import { useState } from "react"
import Image from "next/image"
import { AlbumView } from "./album-view"
import { ImageIcon } from "lucide-react"

interface AlbumImage {
  id: string
  src: string
  caption: string
}

interface Album {
  id: string
  name: string
  description: string
  coverImage?: string
  cover_image?: string
  images: AlbumImage[]
}

interface GalleryGridProps {
  albums: Album[]
}

export function GalleryGrid({ albums }: GalleryGridProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {albums.map((album) => (
          <button
            key={album.id}
            onClick={() => setSelectedAlbum(album)}
            className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white"
          >
            {/* Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={(album.coverImage || album.cover_image || album.images[0]?.src) || "/placeholder.svg"}
                alt={album.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Image Count Badge */}
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <ImageIcon className="h-4 w-4" />
                {album.images.length}
              </div>
            </div>

            {/* Album Info */}
            <div className="p-4 text-left">
              <h3 className="text-lg font-bold text-black mb-1 group-hover:text-[#FFD700] transition-colors">
                {album.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{album.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selectedAlbum && (
        <AlbumView
          isOpen={!!selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
          albumName={selectedAlbum.name}
          images={selectedAlbum.images}
        />
      )}
    </>
  )
}
