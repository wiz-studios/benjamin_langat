
"use client"

import { BarChart3, PieChart, TrendingUp } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell
} from "recharts"

interface CDFChartsProps {
    allocations: any[]
    projects: any[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a855f7', '#ec4899'];

export function CDFCharts({ allocations, projects }: CDFChartsProps) {
    // Process Allocation Data for Charts
    // Sort allocations by financial year
    const sortedAllocations = [...allocations].sort((a, b) => a.financial_year.localeCompare(b.financial_year))

    const allocationData = sortedAllocations.map(a => ({
        year: a.financial_year,
        allocation: (Number(a.amount_allocated) / 1000000).toFixed(2),
        disbursed: (Number(a.amount_disbursed) / 1000000).toFixed(2)
    }))

    // Process Project Data for Sector Pie Chart
    const sectorMap = new Map<string, number>()
    projects.forEach(p => {
        const current = sectorMap.get(p.sector) || 0
        sectorMap.set(p.sector, current + 1) // Count projects per sector
        // Alternatively sum amounts: sectorMap.set(p.sector, current + Number(p.amount))
    })

    const sectorData = Array.from(sectorMap.entries()).map(([name, value]) => ({
        name,
        value
    }))

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Allocation vs Disbursement Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#FFD700]" />
                    Allocation vs Disbursement
                </h2>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={allocationData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis
                                label={{ value: 'Million KSh', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `KSh ${value}M`}
                            />
                            <Tooltip
                                formatter={(value: any) => [`KSh ${value}M`, undefined]}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="allocation" fill="#FFD700" name="Allocated" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="disbursed" fill="#22c55e" name="Disbursed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Sector Distribution Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    Projects by Sector
                </h2>
                <div className="h-[300px] w-full flex items-center justify-center">
                    {sectorData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                            <PieChart className="h-12 w-12 mb-2 opacity-20" />
                            <p>No project data available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
