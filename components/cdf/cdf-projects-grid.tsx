
import { MapPin, Calendar, Tag } from "lucide-react"

interface CDFProjectsGridProps {
    projects: any[]
}

export function CDFProjectsGrid({ projects }: CDFProjectsGridProps) {
    if (!projects || projects.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                <p className="text-gray-500">No projects data available yet.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden flex flex-col h-full">
                    {/* Project Image (Placeholder if null) */}
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                        {project.image_url ? (
                            <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                <span className="text-xs font-medium">No Image</span>
                            </div>
                        )}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                            {project.status}
                        </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <div className="mb-2">
                            <span className="inline-block px-2 py-1 rounded-md bg-[#FFD700]/10 text-[#B8860B] text-xs font-medium mb-2">
                                {project.sector}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                                {project.title}
                            </h3>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                            {project.description || "No description provided."}
                        </p>

                        <div className="mt-auto space-y-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center text-xs text-gray-500">
                                <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                {project.location || "Location not specified"}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                                {project.financial_year}
                            </div>
                            {project.amount && (
                                <div className="flex items-center text-xs font-medium text-black">
                                    <Tag className="h-3.5 w-3.5 mr-2 text-[#FFD700]" />
                                    KSh {Number(project.amount).toLocaleString()}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
