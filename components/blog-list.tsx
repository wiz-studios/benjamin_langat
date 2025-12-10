import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  images?: string[]
  image?: string
}

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedPosts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
        >
          <div className="relative h-48 w-full">
            <Image
              src={post.images?.[0] || post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h2 className="text-xl font-semibold text-black mb-2 line-clamp-2">{post.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <Button asChild className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium">
              <Link href={`/blog/${post.slug}`}>Read More</Link>
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
