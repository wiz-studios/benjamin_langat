"use client"

import { useState } from "react"
import { Twitter, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SocialPost {
  id: string
  platform: "twitter" | "facebook"
  content: string
  date: string
  likes: number
  comments: number
  shares: number
}

const socialPosts: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    content:
      "Proud to announce the completion of 15km of tarmac roads in Ainamoi Constituency. This infrastructure will transform our communities and boost economic activity. #AinaoiDevelopment #KenyaKwanza",
    date: "2 hours ago",
    likes: 245,
    comments: 32,
    shares: 18,
  },
  {
    id: "2",
    platform: "facebook",
    content:
      "Today I visited Kapsoit Secondary School to distribute education bursaries to over 200 students. Education remains our top priority for empowering the youth of Ainamoi.",
    date: "5 hours ago",
    likes: 532,
    comments: 67,
    shares: 45,
  },
  {
    id: "3",
    platform: "twitter",
    content:
      "In Parliament today, we passed crucial amendments to the Finance Bill that will benefit small businesses and reduce the tax burden on farmers. Great day for Kenya! 🇰🇪",
    date: "1 day ago",
    likes: 412,
    comments: 89,
    shares: 76,
  },
  {
    id: "4",
    platform: "facebook",
    content:
      "The new Kipchimchim Health Center is now operational! With modern equipment and trained staff, our community now has access to quality healthcare closer to home. Thank you to all stakeholders who made this possible.",
    date: "2 days ago",
    likes: 721,
    comments: 124,
    shares: 93,
  },
  {
    id: "5",
    platform: "twitter",
    content:
      "Meeting with youth leaders from all 6 wards to discuss employment opportunities and skills development programs. Our young people are the future of Ainamoi! #YouthEmpowerment",
    date: "3 days ago",
    likes: 189,
    comments: 28,
    shares: 15,
  },
  {
    id: "6",
    platform: "facebook",
    content:
      "Groundbreaking ceremony for the new market in Kapkugerwet Ward. This modern facility will provide better trading conditions for our farmers and traders.",
    date: "4 days ago",
    likes: 456,
    comments: 78,
    shares: 34,
  },
]

export function SocialMediaFeeds() {
  const [filter, setFilter] = useState<"all" | "twitter" | "facebook">("all")

  const filteredPosts = filter === "all" ? socialPosts : socialPosts.filter((post) => post.platform === filter)

  const PlatformIcon = ({ platform }: { platform: "twitter" | "facebook" }) => {
    return platform === "twitter" ? <Twitter className="h-5 w-5" /> : <Facebook className="h-5 w-5" />
  }

  return (
    <section className="py-16 bg-[#F5F5F5] dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-4">Latest Updates</h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
          Follow Hon. Benjamin Langat on social media for the latest news and updates.
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className={
              filter === "all" ? "bg-[#FFD700] text-black hover:bg-[#E6C200]" : "border-black dark:border-white"
            }
          >
            All
          </Button>
          <Button
            variant={filter === "twitter" ? "default" : "outline"}
            onClick={() => setFilter("twitter")}
            className={
              filter === "twitter" ? "bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]" : "border-black dark:border-white"
            }
          >
            <Twitter className="h-4 w-4 mr-2" /> Twitter
          </Button>
          <Button
            variant={filter === "facebook" ? "default" : "outline"}
            onClick={() => setFilter("facebook")}
            className={
              filter === "facebook" ? "bg-[#4267B2] text-white hover:bg-[#365899]" : "border-black dark:border-white"
            }
          >
            <Facebook className="h-4 w-4 mr-2" /> Facebook
          </Button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${post.platform === "twitter" ? "bg-[#1DA1F2]" : "bg-[#4267B2]"
                    }`}
                >
                  <PlatformIcon platform={post.platform} />
                  <span className="sr-only">{post.platform}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-black dark:text-white">Hon. Benjamin Langat</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">• {post.date}</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="text-red-500">❤</span> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" /> {post.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <span>↗</span> {post.shares}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Follow Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <Button asChild className="bg-[#1DA1F2] text-white hover:bg-[#1a8cd8]">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-4 w-4 mr-2" /> Follow on Twitter
            </a>
          </Button>
          <Button asChild className="bg-[#4267B2] text-white hover:bg-[#365899]">
            <a href="https://www.facebook.com/AmbBenjaminLangat" target="_blank" rel="noopener noreferrer">
              <Facebook className="h-4 w-4 mr-2" /> Follow on Facebook
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
