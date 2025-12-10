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
import { Card, CardContent } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2, Plus, Edit, Trash2, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { sanitizeHTML } from "@/lib/sanitize"

interface MPUpdate {
    id: string
    title: string
    category: string
    description: string | null
    date: string
    image_url: string | null
    status: string
    created_at: string
}

export function AdminUpdates() {
    const [updates, setUpdates] = useState<MPUpdate[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingUpdate, setEditingUpdate] = useState<MPUpdate | null>(null)
    const [saving, setSaving] = useState(false)
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        title: "",
        category: "Achievement",
        description: "",
        date: "",
        image_url: "",
        status: "Completed",
    })

    useEffect(() => {
        fetchUpdates()
    }, [])

    const fetchUpdates = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("mp_updates")
            .select("*")
            .order("date", { ascending: false })

        if (!error && data) {
            setUpdates(data)
        }
        setLoading(false)
    }

    const handleOpenDialog = (update: MPUpdate | null = null) => {
        if (update) {
            setEditingUpdate(update)
            setFormData({
                title: update.title,
                category: update.category,
                description: update.description || "",
                date: update.date,
                image_url: update.image_url || "",
                status: update.status,
            })
        } else {
            setEditingUpdate(null)
            setFormData({
                title: "",
                category: "Achievement",
                description: "",
                date: "",
                image_url: "",
                status: "Completed",
            })
        }
        setDialogOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()

        if (editingUpdate) {
            // Update
            const { error } = await supabase
                .from("mp_updates")
                .update({
                    title: formData.title,
                    category: formData.category,
                    description: sanitizeHTML(formData.description),
                    date: formData.date,
                    image_url: formData.image_url,
                    status: formData.status,
                } as any)
                .eq("id", editingUpdate.id)

            if (error) {
                toast({
                    title: "Error",
                    description: "Failed to update item",
                    variant: "destructive",
                })
            } else {
                toast({ title: "Success", description: "Update saved successfully" })
                fetchUpdates()
                setDialogOpen(false)
            }
        } else {
            // Insert
            const { error } = await supabase.from("mp_updates").insert({
                title: formData.title,
                category: formData.category,
                description: sanitizeHTML(formData.description),
                date: formData.date,
                image_url: formData.image_url,
                status: formData.status,
            } as any)

            if (error) {
                toast({
                    title: "Error",
                    description: "Failed to create update",
                    variant: "destructive",
                })
            } else {
                toast({ title: "Success", description: "Update created successfully" })
                fetchUpdates()
                setDialogOpen(false)
            }
        }

        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this update?")) return

        const supabase = createClient()
        const { error } = await supabase.from("mp_updates").delete().eq("id", id)

        if (error) {
            toast({
                title: "Error",
                description: "Failed to delete update",
                variant: "destructive",
            })
        } else {
            toast({ title: "Success", description: "Update deleted successfully" })
            fetchUpdates()
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-[#FFD700]" />
            </div>
        )
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <h2 className="text-xl font-bold">MP Updates & Accomplishments</h2>
                    </div>
                    <Button
                        onClick={() => handleOpenDialog()}
                        className="bg-[#FFD700] text-black hover:bg-[#E6C200]"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Update
                    </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {updates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                                        No updates yet. Click "Add Update" to create one.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                updates.map((update) => (
                                    <TableRow key={update.id}>
                                        <TableCell>{new Date(update.date).toLocaleDateString()}</TableCell>
                                        <TableCell className="font-medium">{update.title}</TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                                                {update.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded text-xs ${update.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : update.status === "Ongoing"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-800"
                                                    }`}
                                            >
                                                {update.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenDialog(update)}
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(update.id)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Add/Edit Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingUpdate ? "Edit Update" : "Add New Update"}</DialogTitle>
                            <DialogDescription>
                                {editingUpdate
                                    ? "Update the details below"
                                    : "Create a new MP update or accomplishment"}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Project Start">Project Start</SelectItem>
                                            <SelectItem value="Completion">Completion</SelectItem>
                                            <SelectItem value="Achievement">Achievement</SelectItem>
                                            <SelectItem value="Event">Event</SelectItem>
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

                            <div>
                                <Label htmlFor="date">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <RichTextEditor
                                    value={formData.description}
                                    onChange={(html) => setFormData({ ...formData, description: html })}
                                    placeholder="Enter description with rich text formatting..."
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
            </CardContent>
        </Card>
    )
}
