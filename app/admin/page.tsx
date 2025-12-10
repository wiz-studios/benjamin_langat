"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { AdminBlog } from "@/components/admin-blog"
import { AdminGallery } from "@/components/admin-gallery"
import { Newspaper, ImageIcon, LogOut } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"blog" | "gallery">("blog")

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="border-black text-black hover:bg-black hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab("blog")}
            className={
              activeTab === "blog"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <Newspaper className="h-4 w-4 mr-2" />
            Blog Posts
          </Button>
          <Button
            onClick={() => setActiveTab("gallery")}
            className={
              activeTab === "gallery"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Gallery
          </Button>
        </div>

        {/* Content */}
        {activeTab === "blog" ? <AdminBlog /> : <AdminGallery />}
      </div>
    </main>
  )
}
