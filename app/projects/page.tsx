import Image from "next/image"
import { CheckCircle, Clock } from "lucide-react"

export const metadata = {
  title: "Projects - Hon. Amb. CPA Benjamin Kipkirui Langat, CBS",
  description: "View ongoing and completed development projects in Ainamoi Constituency.",
}

const projects = [
  {
    title: "Kapsoit-Ainamoi Road Upgrade",
    status: "completed",
    category: "Infrastructure",
    description:
      "Tarmacking of the main road connecting Kapsoit to Ainamoi town center, improving access for farmers and traders.",
    image: "/kenya-road-construction-tarmac.jpg",
    year: "2023",
  },
  {
    title: "Chepkoiyo Primary School Classroom Block",
    status: "completed",
    category: "Education",
    description:
      "Construction of a modern 4-classroom block with furniture and learning materials for Chepkoiyo Primary School.",
    image: "/kenya-school-classroom-building.jpg",
    year: "2023",
  },
  {
    title: "Ainamoi Health Center Upgrade",
    status: "ongoing",
    category: "Healthcare",
    description:
      "Upgrading Ainamoi Health Center to a fully-equipped facility with maternity wing and laboratory services.",
    image: "/kenya-health-center-hospital.jpg",
    year: "2024",
  },
  {
    title: "Youth Empowerment Training Center",
    status: "ongoing",
    category: "Youth",
    description: "Construction of a vocational training center for youth skills development in various trades.",
    image: "/vocational-training-center-africa.jpg",
    year: "2024",
  },
  {
    title: "Water Supply Project - Kipchimchim",
    status: "completed",
    category: "Water",
    description: "Installation of water supply system serving over 2,000 households in Kipchimchim area.",
    image: "/rural-water-supply-project-kenya.jpg",
    year: "2022",
  },
  {
    title: "Kapkatet Bridge Construction",
    status: "ongoing",
    category: "Infrastructure",
    description: "Construction of a modern bridge over River Kipsonoi to improve connectivity for farming communities.",
    image: "/bridge-construction-kenya-river.jpg",
    year: "2024",
  },
]

export default function ProjectsPage() {
  const completedProjects = projects.filter((p) => p.status === "completed")
  const ongoingProjects = projects.filter((p) => p.status === "ongoing")

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
            <p className="text-3xl font-bold text-black">5</p>
            <p className="text-gray-700 text-sm">Sectors</p>
          </div>
        </div>

        {/* Ongoing Projects */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-6 w-6 text-[#FFD700]" />
            <h2 className="text-2xl font-bold text-black">Ongoing Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
              >
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-[#FFD700] text-black text-xs px-2 py-1 rounded font-semibold">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="h-4 w-4 text-[#FFD700]" />
                    In Progress - {project.year}
                  </div>
                  <h3 className="font-semibold text-black mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Completed Projects */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="h-6 w-6 text-[#FFD700]" />
            <h2 className="text-2xl font-bold text-black">Completed Projects</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFD700]"
              >
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded font-semibold">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <CheckCircle className="h-4 w-4 text-[#FFD700]" />
                    Completed - {project.year}
                  </div>
                  <h3 className="font-semibold text-black mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
