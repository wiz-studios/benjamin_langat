"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Video {
  id: string
  title: string
  thumbnail: string
  youtubeId: string
  duration: string
  category: string
}

const videos: Video[] = [
  {
    id: "1",
    title: "Parliamentary Address on Finance Bill 2024",
    thumbnail: "/parliament-kenya-speech.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:45",
    category: "Parliament",
  },
  {
    id: "2",
    title: "Ainamoi Road Construction Launch",
    thumbnail: "/road-construction-kenya.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:30",
    category: "Projects",
  },
  {
    id: "3",
    title: "Community Health Center Opening Ceremony",
    thumbnail: "/hospital-opening-kenya.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15:20",
    category: "Healthcare",
  },
  {
    id: "4",
    title: "Education Bursary Distribution 2024",
    thumbnail: "/education-scholarship-kenya.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:15",
    category: "Education",
  },
  {
    id: "5",
    title: "Interview on Economic Development Plans",
    thumbnail: "/tv-interview-kenya-politician.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "22:00",
    category: "Interviews",
  },
  {
    id: "6",
    title: "Youth Empowerment Program Launch",
    thumbnail: "/youth-program-kenya.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "14:30",
    category: "Community",
  },
]

const categories = ["All", "Parliament", "Projects", "Healthcare", "Education", "Interviews", "Community"]

export function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredVideos = activeCategory === "All" ? videos : videos.filter((v) => v.category === activeCategory)

  return (
    <section className="py-16 bg-[#F5F5F5] dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-4">Video Gallery</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-2xl mx-auto">
          Watch speeches, project launches, and community events featuring Hon. Benjamin Langat.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-[#FFD700] text-black"
                  : "bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-[#FFD700] hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center">
                    <Play className="h-8 w-8 text-black ml-1" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 bg-[#FFD700] text-black text-xs px-2 py-1 rounded font-medium">
                  {video.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black dark:text-white line-clamp-2">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white hover:bg-[#FFD700] hover:text-black"
                onClick={() => setSelectedVideo(null)}
              >
                <X className="h-8 w-8" />
              </Button>
              <div className="bg-black rounded-xl overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white">{selectedVideo.title}</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
