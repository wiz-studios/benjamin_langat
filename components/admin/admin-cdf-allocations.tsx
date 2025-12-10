"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

interface CDFAllocation {
    id: string
    financial_year: string
    amount_allocated: number
    amount_disbursed: number
    status: string
}

export function AdminCDFAllocations() {
    const [allocations, setAllocations] = useState<CDFAllocation[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<CDFAllocation | null>(null)
    const [saving, setSaving] = useState(false)
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        financial_year: "",
        amount_allocated: 0,
        amount_disbursed: 0,
        status: "Allocated",
    })

    useEffect(() => {
        fetchAllocations()
    }, [])

    const fetchAllocations = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("cdf_allocations")
            .select("*")
            .order("financial_year", { ascending: false })

        if (!error && data) {
            setAllocations(data)
        }
        setLoading(false)
    }

    const handleOpenDialog = (item: CDFAllocation | null = null) => {
        if (item) {
            setEditingItem(item)
            setFormData({
                financial_year: item.financial_year,
                amount_allocated: item.amount_allocated,
                amount_disbursed: item.amount_disbursed,
                status: item.status,
            })
        } else {
            setEditingItem(null)
            setFormData({
                financial_year: "",
                amount_allocated: 0,
                amount_disbursed: 0,
                status: "Allocated",
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
                .from("cdf_allocations")
                .update(formData)
                .eq("id", editingItem.id)

            if (!error) {
                toast({ title: "Success", description: "Allocation updated successfully" })
                fetchAllocations()
                setDialogOpen(false)
            } else {
                toast({ title: "Error", description: "Failed to update", variant: "destructive" })
            }
        } else {
            const { error } = await supabase.from("cdf_allocations").insert(formData)

            if (!error) {
                toast({ title: "Success", description: "Allocation created successfully" })
                fetchAllocations()
                setDialogOpen(false)
            } else {
                toast({ title: "Error", description: "Failed to create", variant: "destructive" })
            }
        }

        setSaving(false)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this allocation?")) return

        const supabase = createClient()
        const { error } = await supabase.from("cdf_allocations").delete().eq("id", id)

        if (!error) {
            toast({ title: "Success", description: "Allocation deleted successfully" })
            fetchAllocations()
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
                    Add Allocation
                </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Financial Year</TableHead>
                            <TableHead>Allocated</TableHead>
                            <TableHead>Disbursed</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {allocations.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.financial_year}</TableCell>
                                <TableCell>KSh {item.amount_allocated.toLocaleString()}</TableCell>
                                <TableCell>KSh {item.amount_disbursed.toLocaleString()}</TableCell>
                                <TableCell>
                                    <span className="inline-flex px-2 py-1 rounded text-xs bg-green-100 text-green-800">
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
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Allocation" : "Add Allocation"}</DialogTitle>
                        <DialogDescription>Enter the CDF allocation details</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="financial_year">Financial Year</Label>
                            <Input
                                id="financial_year"
                                value={formData.financial_year}
                                onChange={(e) => setFormData({ ...formData, financial_year: e.target.value })}
                                placeholder="2024/2025"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="amount_allocated">Amount Allocated (KSh)</Label>
                            <Input
                                id="amount_allocated"
                                type="number"
                                step="0.01"
                                value={formData.amount_allocated}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount_allocated: parseFloat(e.target.value) })
                                }
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="amount_disbursed">Amount Disbursed (KSh)</Label>
                            <Input
                                id="amount_disbursed"
                                type="number"
                                step="0.01"
                                value={formData.amount_disbursed}
                                onChange={(e) =>
                                    setFormData({ ...formData, amount_disbursed: parseFloat(e.target.value) })
                                }
                                required
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
