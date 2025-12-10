"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { FileText, Download, ShieldCheck, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CDFStats } from "@/components/cdf/cdf-stats"
import { CDFCharts } from "@/components/cdf/cdf-charts"
import { CDFProjectsGrid } from "@/components/cdf/cdf-projects-grid"

// Explicitly define types until Supabase types are fully propagated or for local usage
interface Allocations {
    id: string
    financial_year: string
    amount_allocated: number
    amount_disbursed: number
    status: string
}
interface Projects {
    id: string
    title: string
    description: string
    sector: string
    financial_year: string
    amount: number
    status: string
    location: string
    image_url: string
}

export default function CDFPage() {
    const [allocations, setAllocations] = useState<Allocations[]>([])
    const [projects, setProjects] = useState<Projects[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const supabase = createClient()

            // Fetch Allocations
            const { data: allocData } = await supabase
                .from('cdf_allocations')
                .select('*')
                .order('financial_year', { ascending: false })

            // Fetch Projects
            const { data: projData } = await supabase
                .from('cdf_projects')
                .select('*')
                .order('created_at', { ascending: false })

            if (allocData) setAllocations(allocData as any)
            if (projData) setProjects(projData as any)

            setLoading(false)
        }

        fetchData()
    }, [])

    const handleDownloadReport = () => {
        // Simple CSV export logic
        const headers = ["Financial Year", "Allocated", "Disbursed", "Status"]
        const csvContent = [
            headers.join(","),
            ...allocations.map(a =>
                `${a.financial_year},${a.amount_allocated},${a.amount_disbursed},${a.status}`
            )
        ].join("\n")

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", "cdf_report.csv")
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <main className="py-16 bg-[#F5F5F5] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        NG-CDF Transparency Dashboard
                    </h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Tracking development funds and projects in Ainamoi Constituency from 2008 to present.
                    </p>
                </div>

                {/* Disclaimer / Legal Notice */}
                <div className="bg-white rounded-xl p-6 shadow-md mb-8 border-l-4 border-[#FFD700]">
                    <h2 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-[#FFD700]" />
                        Official Sources & Transparency
                    </h2>
                    <div className="text-gray-700 text-sm leading-relaxed space-y-2">
                        <p className="font-semibold text-black">
                            Ainamoi NG-CDF — Official allocations & disbursements (selected recent years)
                        </p>
                        <p>
                            The figures below are taken from the{" "}
                            <a href="https://ainamoi.ngcdf.go.ke/allocations/" target="_blank" className="text-blue-600 hover:underline">
                                Ainamoi NG-CDF office publications
                            </a>{" "}
                            and the{" "}
                            <a href="https://www.oagkenya.go.ke" target="_blank" className="text-blue-600 hover:underline">
                                Auditor-General’s reports
                            </a>.
                        </p>
                        <p>
                            They represent <em>allocated</em> NG-CDF amounts per fiscal year and <em>confirmed disbursement transfers</em> published by the constituency office. This is not yet a full audit-grade ledger for 2008–present; we are collecting and publishing official source documents as they become available.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <p className="text-gray-500 animate-pulse">Loading dashboard data...</p>
                    </div>
                ) : (
                    <>
                        <CDFStats allocations={allocations} projects={projects} />

                        <CDFCharts allocations={allocations} projects={projects} />

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-black mb-6">Notable Projects</h2>
                            <CDFProjectsGrid projects={projects} />
                        </div>
                    </>
                )}

                {/* Additional Resources Footer */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-12">
                    <h3 className="text-lg font-semibold text-black mb-3">Official Resources & Audit Reports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://www.oagkenya.go.ke/wp-content/uploads/2022/08/Ainamoi-NGCDF-2019-2020.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-start gap-3 border border-blue-100"
                        >
                            <FileText className="h-5 w-5 text-[#FFD700] mt-1" />
                            <div>
                                <p className="font-semibold text-black text-sm">Ainamoi NGCDF Audit (2019–2020)</p>
                                <p className="text-xs text-gray-500">Office of the Auditor General</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </a>

                        <a
                            href="https://www.parliament.go.ke/sites/default/files/2023-03/Report%20of%20the%20Auditor-General%20and%20Financial%20Statements%20for%20%20Ainamoi%20Constituency%20for%20the%20year%20ended%2030th%20June%2C%202021.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-start gap-3 border border-blue-100"
                        >
                            <FileText className="h-5 w-5 text-[#FFD700] mt-1" />
                            <div>
                                <p className="font-semibold text-black text-sm">Auditor-General Report (2021)</p>
                                <p className="text-xs text-gray-500">Parliament of Kenya</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </a>

                        <a
                            href="https://libraryir.parliament.go.ke/items/cc2302c2-c40f-4c2f-8a37-6d24fbd126a6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-start gap-3 border border-blue-100"
                        >
                             <FileText className="h-5 w-5 text-[#FFD700] mt-1" />
                            <div>
                                <p className="font-semibold text-black text-sm">Auditor-General Report (2023)</p>
                                <p className="text-xs text-gray-500">Parliament Library</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </a>

                         <a
                            href="https://ainamoi.ngcdf.go.ke/allocations/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all flex items-start gap-3 border border-blue-100"
                        >
                            <ShieldCheck className="h-5 w-5 text-green-600 mt-1" />
                            <div>
                                <p className="font-semibold text-black text-sm">Official Allocations Page</p>
                                <p className="text-xs text-gray-500">Ainamoi NG-CDF Website</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}
