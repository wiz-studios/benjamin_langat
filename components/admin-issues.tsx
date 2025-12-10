"use client"

import { useEffect, useState } from "react"
import { getIssues, updateIssueStatus } from "@/lib/actions/issues"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, MapPin, Phone, User, Calendar, ExternalLink } from "lucide-react"

type Issue = {
    id: string
    title: string
    description: string
    category: string
    status: string
    priority: string
    ward: string
    reporter_name?: string
    reporter_phone?: string
    location_lat?: number
    location_lng?: number
    image_url?: string
    created_at: string
}

export function AdminIssues() {
    const [issues, setIssues] = useState<Issue[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchIssues()
    }, [])

    async function fetchIssues() {
        setLoading(true)
        const result = await getIssues()
        if (result.success && result.data) {
            setIssues(result.data as Issue[])
        }
        setLoading(false)
    }

    async function handleStatusChange(id: string, newStatus: string) {
        setUpdating(id)
        const result = await updateIssueStatus(id, newStatus)
        if (result.success) {
            setIssues(issues.map(i => i.id === id ? { ...i, status: newStatus } : i))
        }
        setUpdating(null)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Received": return "bg-gray-500"
            case "Under Review": return "bg-blue-500"
            case "Forwarded": return "bg-purple-500"
            case "Resolved": return "bg-green-500"
            default: return "bg-gray-500"
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical": return "bg-red-600"
            case "High": return "bg-orange-500"
            case "Normal": return "bg-blue-400"
            default: return "bg-gray-400"
        }
    }

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Reported Issues ({issues.length})</CardTitle>
                        <Button variant="outline" onClick={fetchIssues} size="sm">Refresh</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {issues.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No issues reported yet.</p>
                        ) : (
                            issues.map((issue) => (
                                <div key={issue.id} className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
                                    {/* Image Preview */}
                                    {issue.image_url && (
                                        <div className="w-full md:w-48 h-32 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100">
                                            <img src={issue.image_url} alt="Issue" className="object-cover w-full h-full" />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <h3 className="font-bold text-lg">{issue.title}</h3>
                                            <div className="flex gap-2">
                                                <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(issue.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold text-black dark:text-white px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">{issue.category}</span>
                                            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {issue.ward}</span>
                                            {issue.reporter_name && issue.reporter_name !== "Anonymous" && (
                                                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {issue.reporter_name}</span>
                                            )}
                                            {issue.reporter_phone && (
                                                <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {issue.reporter_phone}</span>
                                            )}
                                            {(issue.location_lat && issue.location_lng) && (
                                                <a
                                                    href={`https://www.google.com/maps?q=${issue.location_lat},${issue.location_lng}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-600 underline flex items-center gap-1 hover:text-blue-800"
                                                >
                                                    <ExternalLink className="h-3 w-3" /> View Map
                                                </a>
                                            )}
                                        </div>

                                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{issue.description}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="w-full md:w-48 flex-shrink-0 flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4">
                                        <label className="text-xs font-semibold text-gray-500">Update Status</label>
                                        <Select
                                            value={issue.status}
                                            onValueChange={(val) => handleStatusChange(issue.id, val)}
                                            disabled={updating === issue.id}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Received">Received</SelectItem>
                                                <SelectItem value="Under Review">Under Review</SelectItem>
                                                <SelectItem value="Forwarded">Forwarded</SelectItem>
                                                <SelectItem value="Resolved">Resolved</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {updating === issue.id && <span className="text-xs text-center text-blue-500 animate-pulse">Updating...</span>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
