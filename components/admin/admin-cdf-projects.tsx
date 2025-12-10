"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { sanitizeHTML } from "@/lib/sanitize"

interface CDFProject {
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

export function AdminCDFProjects() {
    const [projects, setProjects] = useState<CDFProject[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<CDFProject | null>(null)
    const [saving, setSaving] = useState(false)
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        sector: "Education",
        financial_year: "",
        amount: 0,
        status: "Planned",
        location: "",
        image_url: "",
    })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
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

    const handleOpenDialog = (item: CDFProject | null = null) => {
        if (item) {
            setEditingItem(item)
            setFormData({
                title: item.title,
                description: item.description || "",
                sector: item.sector,
                financial_year: item.financial_year || "",
                amount: item.amount || 0,
                status: item.status,
                location: item.location || "",
                image_url: item.image_url || "",
            })
        } else {
            setEditingItem(null)
            setFormData({
                title: "",
                description: "",
                sector: "Education",
                financial_year: "",
                amount: 0,
                status: "Planned",
                location: "",
                image_url: "",
            })
        }
        setDialogOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()

        if (editingItem) {
            const { error } = await supabase
                .from("cdf_projects")
                .update({
                    title: formData.title,
                    description: sanitizeHTML(formData.description),
                    sector: formData.sector,
                    financial_year: formData.financial_year,
                    amount: formData.amount,
                    status: formData.status,
                    location: formData.location,
                    image_url: formData.image_url,
                } as any)
                .eq("id", editingItem.id)

            if (!error) {
                toast({ title: "Success", description: "Project updated successfully" })
                fetchProjects()
                setDialogOpen(false)
            } else {
                toast({ title: "Error", description: "Failed to update", variant: "destructive" })
            }
        } else {
            const { error } = await supabase.from("cdf_projects").insert({
                title: formData.title,
                description: sanitizeHTML(formData.description),
                sector: formData.sector,
                financial_year: formData.financial_year,
                amount: formData.amount,
                status: formData.status,
                location: formData.location,
                image_url: formData.image_url,
            } as any)

            if (!error) {
                toast({ title: "Success", description: "Project created successfully" })
                fetchProjects()
                setDialogOpen(false)
            } else {
                toast({ title: "Error", description: "Failed to create", variant: "destructive" })
            }
        }

        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return

        const supabase = createClient()
        const { error } = await supabase.from("cdf_projects").delete().eq("id", id)

        if (!error) {
            toast({ title: "Success", description: "Project deleted successfully" })
            fetchProjects()
        } else {
            toast({ title: "Error", description: "Failed to delete", variant: "destructive" })
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button
                    onClick={() => handleOpenDialog()}
                    size="sm"
                    className="bg-[#FFD700] text-black hover:bg-[#E6C200]"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                    No projects yet. Click "Add Project" to create one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.sector}</TableCell>
                                    <TableCell>KSh {item.amount?.toLocaleString() || "N/A"}</TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex px-2 py-1 rounded text-xs ${item.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : item.status === "Ongoing"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(item)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
                        <DialogDescription>Enter the CDF project details</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <RichTextEditor
                                value={formData.description}
                                onChange={(html) => setFormData({ ...formData, description: html })}
                                placeholder="Enter project description with rich text formatting..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="sector">Sector</Label>
                                <Select
                                    value={formData.sector}
                                    onValueChange={(value) => setFormData({ ...formData, sector: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Education">Education</SelectItem>
                                        <SelectItem value="Health">Health</SelectItem>
                                        <SelectItem value="Water">Water</SelectItem>
                                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                                        <SelectItem value="Security">Security</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                        <SelectItem value="Environment">Environment</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Planned">Planned</SelectItem>
                                        <SelectItem value="Ongoing">Ongoing</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="financial_year">Financial Year</Label>
                                <Input
                                    id="financial_year"
                                    value={formData.financial_year}
                                    onChange={(e) => setFormData({ ...formData, financial_year: e.target.value })}
                                    placeholder="2024/2025"
                                />
                            </div>

                            <div>
                                <Label htmlFor="amount">Amount (KSh)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="image_url">Image URL (optional)</Label>
                            <Input
                                id="image_url"
                                value={formData.image_url}
                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="bg-[#FFD700] text-black hover:bg-[#E6C200]"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
