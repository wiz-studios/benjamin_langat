import { notFound } from "next/navigation"
import { BlogPostView } from "@/components/blog-post-view"
import { createClient } from "@/lib/supabase/server"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  images: string[]
  captions: string[]
}

// Make this route dynamic so new posts appear without rebuild
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()

  const post = data as BlogPost | null

  if (error || !post) {
    return {
      title: "Post Not Found",
    }
  }

  const imageUrl = post.images?.[0]

  return {
    title: `${post.title} - Hon. Benjamin Langat`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single()

  const post = data as BlogPost | null

  if (error || !post) {
    notFound()
  }

  return (
    <main className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogPostView post={post} />
      </div>
    </main>
  )
}
