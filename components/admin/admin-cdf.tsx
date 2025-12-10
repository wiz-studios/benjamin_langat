"use client"

import { useState } from "react"
import { AdminCDFAllocations } from "@/components/admin/admin-cdf-allocations"
import { AdminCDFProjects } from "@/components/admin/admin-cdf-projects"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, FolderKanban } from "lucide-react"

export function AdminCDF() {
    const [activeTab, setActiveTab] = useState<"allocations" | "projects">("allocations")

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex gap-2 mb-6">
                    <Button
                        onClick={() => setActiveTab("allocations")}
                        className={
                            activeTab === "allocations"
                                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                                : "bg-white text-black border border-black hover:bg-gray-100"
                        }
                    >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Allocations
                    </Button>
                    <Button
                        onClick={() => setActiveTab("projects")}
                        className={
                            activeTab === "projects"
                                ? "bg-[#FFD700] text-black hover:bg-[#E6C200]"
                                : "bg-white text-black border border-black hover:bg-gray-100"
                        }
                    >
                        <FolderKanban className="h-4 w-4 mr-2" />
                        Projects
                    </Button>
                </div>

                {activeTab === "allocations" && <AdminCDFAllocations />}
                {activeTab === "projects" && <AdminCDFProjects />}
            </CardContent>
        </Card>
    )
}
