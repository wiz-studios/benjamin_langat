import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"

interface BlogPostViewProps {
  post: {
    title: string
    date: string
    images?: string[]
    image?: string // For backward compatibility
    captions?: string[]
    content: string
  }
}

export function BlogPostView({ post }: BlogPostViewProps) {
  const images = post.images || (post.image ? [post.image] : [])

  return (
    <article className="max-w-6xl mx-auto px-4">
      <Button asChild variant="ghost" className="mb-6 text-black hover:text-[#FFD700] hover:bg-transparent">
        <Link href="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </Button>





      <h1 className="text-3xl md:text-5xl font-bold text-black mb-6 text-balance leading-tight">{post.title}</h1>

      <div className="flex items-center text-gray-500 text-sm mb-8 border-b border-gray-200 pb-6">
        <Calendar className="h-4 w-4 mr-2" />
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* Image Strip - 4 images in one row, same size */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {images.map((img, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-md bg-gray-100 group">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${post.title} - ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {post.captions?.[index] && (
                <p className="text-xs text-center text-gray-500 font-medium italic">
                  {post.captions[index]}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {post.content.split("\n\n").map((paragraph, index) => {
          if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
            return (
              <h2 key={index} className="text-xl font-semibold text-black mt-6 mb-3">
                {paragraph.replace(/\*\*/g, "")}
              </h2>
            )
          }
          if (paragraph.startsWith("- ") || paragraph.startsWith("1. ")) {
            const items = paragraph.split("\n")
            return (
              <ul key={index} className="list-disc list-inside text-gray-700 space-y-2 my-4">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^[-\d.]\s*/, "").replace(/\*\*/g, "")}</li>
                ))}
              </ul>
            )
          }
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph
                .split(/\*\*(.*?)\*\*/)
                .map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
            </p>
          )
        })}
      </div>
    </article>
  )
}
