
import { Wallet, CheckCircle, TrendingUp, FolderOpen, AlertCircle, Loader2 } from "lucide-react"

interface CDFStatsProps {
    allocations: any[]
    projects: any[]
}

export function CDFStats({ allocations, projects }: CDFStatsProps) {
    // Calculate Totals
    const totalAllocated = allocations.reduce((sum, a) => sum + Number(a.amount_allocated), 0)
    const totalDisbursed = allocations.reduce((sum, a) => sum + Number(a.amount_disbursed), 0)

    // Calculate Project Statuses
    const totalProjects = projects.length
    const completedProjects = projects.filter(p => p.status === 'Completed').length
    const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Allocation */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#FFD700]">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Allocation</p>
                        <h3 className="text-2xl font-bold text-black mt-1">
                            KSh {(totalAllocated / 1000000).toFixed(1)}M
                        </h3>
                    </div>
                    <div className="bg-[#FFD700]/10 p-3 rounded-full">
                        <Wallet className="h-6 w-6 text-[#FFD700]" />
                    </div>
                </div>
                <p className="text-xs text-gray-500">Since 2022</p>
            </div>

            {/* Total Disbursed */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Disbursed Funds</p>
                        <h3 className="text-2xl font-bold text-black mt-1">
                            KSh {(totalDisbursed / 1000000).toFixed(1)}M
                        </h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500">
                    {totalAllocated > 0 ? ((totalDisbursed / totalAllocated) * 100).toFixed(1) : 0}% of Allocation
                </p>
            </div>

            {/* Projects Overview */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Projects</p>
                        <h3 className="text-2xl font-bold text-black mt-1">
                            {totalProjects}
                        </h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FolderOpen className="h-6 w-6 text-blue-600" />
                    </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" /> {completedProjects} Done
                    </span>
                    <span className="flex items-center gap-1">
                        <Loader2 className="h-3 w-3 text-blue-500" /> {ongoingProjects} Ongoing
                    </span>
                </div>
            </div>

            {/* Disbursement Rate/Efficiency (Optional - or Active Years) */}
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Avg. Annual Allocation</p>
                        <h3 className="text-2xl font-bold text-black mt-1">
                            KSh {(allocations.length > 0 ? (totalAllocated / allocations.length) / 1000000 : 0).toFixed(1)}M
                        </h3>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                </div>
                <p className="text-xs text-gray-500">Per Financial Year</p>
            </div>
        </div>
    )
}
