"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  images: string[]
  captions?: string[]
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState<Omit<BlogPost, "id">>({
    slug: "",
    title: "",
    date: new Date().toISOString().split("T")[0],
    excerpt: "",
    content: "",
    images: [""],
    captions: [""]
  })

  // Supabase client
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("date", { ascending: false })

      if (error) throw error
      if (data) setPosts(data)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase.from("blog_posts").delete().eq("id", id)
        if (error) throw error
        setPosts(posts.filter((post) => post.id !== id))
      } catch (error) {
        console.error("Failed to delete post:", error)
        alert("Error deleting post")
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(formData)
          .eq("id", editingPost.id)

        if (error) throw error

        setPosts(posts.map((post) =>
          post.id === editingPost.id ? { ...post, ...formData } : post
        ))
        setEditingPost(null)
      } else {
        // Add new post
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(formData)
          .select()
          .single()

        if (error) throw error
        if (data) {
          setPosts([data, ...posts])
          setIsAdding(false)
        }
      }
      resetForm()
    } catch (error) {
      console.error("Failed to save post:", error)
      alert("Error saving post")
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setIsAdding(false)
    setFormData({
      slug: post.slug,
      title: post.title,
      date: post.date,
      excerpt: post.excerpt,
      content: post.content,
      images: post.images || [],
      captions: post.captions || [],
    })
  }

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      date: new Date().toISOString().split("T")[0],
      excerpt: "",
      content: "",
      images: [""],
      captions: [""],
    })
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Manage Blog Posts</h2>
        {!isAdding && !editingPost && (
          <Button
            onClick={() => {
              setIsAdding(true)
              resetForm()
            }}
            className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        )}
      </div>

      {/* Form */}
      {(isAdding || editingPost) && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-black mb-4">{editingPost ? "Edit Post" : "Add New Post"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-black font-medium">
                Title
              </Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }}
                className="bg-white border-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-black font-medium">
                Slug
              </Label>
              <Input
                id="slug"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-white border-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-black font-medium">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white border-black"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-black font-medium">Images & Captions</Label>
              {formData.images.map((img, index) => (
                <div key={index} className="space-y-2 p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex gap-2">
                    <Input
                      required
                      value={img}
                      onChange={(e) => {
                        const newImages = [...formData.images]
                        newImages[index] = e.target.value
                        setFormData({ ...formData, images: newImages })
                      }}
                      placeholder="Image URL (e.g. /blogs/MyPhoto.jpg)"
                      className="bg-white border-black"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newImages = formData.images.filter((_, i) => i !== index)
                          const newCaptions = (formData.captions || []).filter((_, i) => i !== index)
                          setFormData({ ...formData, images: newImages, captions: newCaptions })
                        }}
                        className="px-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    value={formData.captions?.[index] || ""}
                    onChange={(e) => {
                      const newCaptions = [...(formData.captions || [])]
                      while (newCaptions.length <= index) newCaptions.push("")
                      newCaptions[index] = e.target.value
                      setFormData({ ...formData, captions: newCaptions })
                    }}
                    placeholder={`Caption for Image ${index + 1} (Optional)`}
                    className="bg-white border-gray-300 text-sm"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormData({
                  ...formData,
                  images: [...formData.images, ""],
                  captions: [...(formData.captions || []), ""]
                })}
                className="w-full border-dashed border-black text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Image
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-black font-medium">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="bg-white border-black resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-black font-medium">
              Content
            </Label>
            <Textarea
              id="content"
              required
              rows={8}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-white border-black resize-none"
              placeholder="Use **text** for bold, separate paragraphs with blank lines"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium">
              {editingPost ? "Update Post" : "Add Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAdding(false)
                setEditingPost(null)
                resetForm()
              }}
              className="border-black text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5]">
            <tr>
              <th className="text-left px-4 py-3 text-black font-semibold">Title</th>
              <th className="text-left px-4 py-3 text-black font-semibold hidden md:table-cell">Date</th>
              <th className="text-right px-4 py-3 text-black font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id} className={index % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"}>
                <td className="px-4 py-3 text-black">{post.title}</td>
                <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{post.date}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(post)}
                      className="bg-[#FFD700] text-black hover:bg-[#E6C200]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
