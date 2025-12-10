"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { CheckCircle, Clock, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Project {
  id: string
  title: string
  description: string | null
  sector: string
  financial_year: string | null
  amount: number | null
  status: string
  location: string | null
  image_url: string | null
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("cdf_projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && data) {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const completedProjects = projects.filter((p) => p.status === "Completed")
  const ongoingProjects = projects.filter((p) => p.status === "Ongoing")
  const plannedProjects = projects.filter((p) => p.status === "Planned")

  // Count unique sectors
  const uniqueSectors = new Set(projects.map((p) => p.sector)).size

  if (loading) {
    return (
      <main className="py-16 bg-white min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#FFD700]" />
      </main>
    )
  }

  return (
    <main className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Development Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tracking the progress of development initiatives across Ainamoi Constituency, from infrastructure to
            education and healthcare.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-[#FFD700]/20 border border-[#FFD700] rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-black">{completedProjects.length}</p>
            <p className="text-gray-700 text-sm">Completed</p>
          </div>
          <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-black">{ongoingProjects.length}</p>
            <p className="text-gray-700 text-sm">Ongoing</p>
          </div>
          <div className="bg-[#FFD700]/20 border border-[#FFD700] rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-black">{projects.length}</p>
            <p className="text-gray-700 text-sm">Total Projects</p>
          </div>
          <div className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-black">{uniqueSectors}</p>
            <p className="text-gray-700 text-sm">Sectors</p>
          </div>
        </div>

        {/* Ongoing Projects */}
        {ongoingProjects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-[#FFD700]" />
              <h2 className="text-2xl font-bold text-black">Ongoing Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#FFD700] text-black text-xs px-2 py-1 rounded font-semibold">
                      {project.sector}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 text-[#FFD700]" />
                      In Progress {project.financial_year ? `- ${project.financial_year}` : ""}
                    </div>
                    <h3 className="font-semibold text-black mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    {project.amount && (
                      <p className="text-sm text-gray-700 mt-2 font-medium">
                        Budget: KSh {project.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle className="h-6 w-6 text-[#FFD700]" />
              <h2 className="text-2xl font-bold text-black">Completed Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded font-semibold">
                      {project.sector}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <CheckCircle className="h-4 w-4 text-[#FFD700]" />
                      Completed {project.financial_year ? `- ${project.financial_year}` : ""}
                    </div>
                    <h3 className="font-semibold text-black mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    {project.amount && (
                      <p className="text-sm text-gray-700 mt-2 font-medium">
                        Budget: KSh {project.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Planned Projects */}
        {plannedProjects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="h-6 w-6 text-gray-400" />
              <h2 className="text-2xl font-bold text-black">Planned Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plannedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gray-500 text-white text-xs px-2 py-1 rounded font-semibold">
                      {project.sector}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      Planned {project.financial_year ? `- ${project.financial_year}` : ""}
                    </div>
                    <h3 className="font-semibold text-black mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm">{project.description}</p>
                    {project.amount && (
                      <p className="text-sm text-gray-700 mt-2 font-medium">
                        Budget: KSh {project.amount.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No projects found. Check back soon!</p>
          </div>
        )}
      </div>
    </main>
  )
}
