import { createClient } from "@/lib/supabase/server"
import { BlogList } from "@/components/blog-list"

export const metadata = {
  title: "Blog - Hon. Amb. CPA Benjamin Kipkirui Langat, CBS",
  description:
    "Read the latest news, updates, and insights from Hon. Amb. CPA Benjamin Kipkirui Langat, CBS, Member of Parliament for Ainamoi Constituency.",
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false })

  return (
    <main className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, development updates, and insights from Ainamoi Constituency and the work
            of your Member of Parliament.
          </p>
        </div>

        <BlogList posts={posts || []} />
      </div>
    </main>
  )
}
