"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { AdminBlog } from "@/components/admin-blog"
import { AdminGallery } from "@/components/admin-gallery"
import { AdminIssues } from "@/components/admin-issues"
import { AdminProfile } from "@/components/admin/admin-profile"
import { AdminUpdates } from "@/components/admin/admin-updates"
import { AdminCDF } from "@/components/admin/admin-cdf"
import { Newspaper, ImageIcon, LogOut, AlertCircle, User, Calendar, DollarSign } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"profile" | "updates" | "cdf" | "blog" | "gallery" | "issues">("profile")

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
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            onClick={() => setActiveTab("profile")}
            className={
              activeTab === "profile"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button
            onClick={() => setActiveTab("updates")}
            className={
              activeTab === "updates"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <Calendar className="h-4 w-4 mr-2" />
            MP Updates
          </Button>
          <Button
            onClick={() => setActiveTab("cdf")}
            className={
              activeTab === "cdf"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <DollarSign className="h-4 w-4 mr-2" />
            NG-CDF
          </Button>
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
          <Button
            onClick={() => setActiveTab("issues")}
            className={
              activeTab === "issues"
                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                : "bg-white text-black border border-black hover:bg-gray-100"
            }
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Issues
          </Button>
        </div>

        {/* Content */}
        {activeTab === "profile" && <AdminProfile />}
        {activeTab === "updates" && <AdminUpdates />}
        {activeTab === "cdf" && <AdminCDF />}
        {activeTab === "blog" && <AdminBlog />}
        {activeTab === "gallery" && <AdminGallery />}
        {activeTab === "issues" && <AdminIssues />}
      </div>
    </main>
  )
}
