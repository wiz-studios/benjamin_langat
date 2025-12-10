"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { Loader2, MapPin, Camera, CheckCircle } from "lucide-react"
import { submitIssue } from "@/lib/actions/issues"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

const WARDS = [
    "Kapsoit",
    "Ainamoi",
    "Kapkugerwet",
    "Kipchebor",
    "Kipchimchim",
    "Kapsaos",
]

const CATEGORIES = [
    "Roads",
    "Water",
    "Education",
    "Health",
    "Security",
    "Other",
]

const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Please provide more detail (at least 20 characters)"),
    category: z.string({ required_error: "Please select a category" }),
    ward: z.string({ required_error: "Please select your ward" }),
    reporter_name: z.string().optional(),
    reporter_phone: z.string().optional(),
    location_lat: z.number().optional(),
    location_lng: z.number().optional(),
    image_url: z.string().optional(),
})

export function IssueForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)
    const [isGettingLocation, setIsGettingLocation] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            reporter_name: "",
            reporter_phone: "",
        },
    })

    async function getLocation() {
        setIsGettingLocation(true)
        setLocationError(null)

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser")
            setIsGettingLocation(false)
            return
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                form.setValue("location_lat", position.coords.latitude)
                form.setValue("location_lng", position.coords.longitude)
                setIsGettingLocation(false)
            },
            (error) => {
                setLocationError("Unable to retrieve your location")
                setIsGettingLocation(false)
            }
        )
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploadingImage(true)
            const supabase = createClient()
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('issue-attachments')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            const { data: { publicUrl } } = supabase.storage
                .from('issue-attachments')
                .getPublicUrl(filePath)

            setImagePreview(publicUrl)
            form.setValue("image_url", publicUrl)
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Error uploading image")
        } finally {
            setUploadingImage(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            const result = await submitIssue(values)
            if (result.success) {
                setIsSuccess(true)
                form.reset()
                setImagePreview(null)
            } else {
                alert("Failed to submit issue. Please try again.")
            }
        } catch (error) {
            console.error(error)
            alert("An unexpected error occurred.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-20 w-20 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Thank you for bringing this to our attention. Your issue Reference ID has been generated and forwarded to the MP's office.
                </p>
                <Button onClick={() => setIsSuccess(false)} className="bg-[#FFD700] text-black hover:bg-[#E6C200]">
                    Submit Another Issue
                </Button>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="ward"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ward</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Ward" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {WARDS.map((ward) => (
                                            <SelectItem key={ward} value={ward}>
                                                {ward}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Issue Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Broken water pipe at Market" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the issue in detail..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Location Section */}
                    <div className="space-y-2">
                        <FormLabel>Location</FormLabel>
                        <div className="flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={getLocation}
                                disabled={isGettingLocation}
                                className="w-full flex items-center gap-2"
                            >
                                {isGettingLocation ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                                {form.watch("location_lat") ? "Location Captured ✓" : "Use My GPS Location"}
                            </Button>
                            {locationError && <p className="text-sm text-red-500">{locationError}</p>}
                            {form.watch("location_lat") && (
                                <p className="text-xs text-gray-500">
                                    Lat: {form.watch("location_lat")?.toFixed(6)}, Lng: {form.watch("location_lng")?.toFixed(6)}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-2">
                        <FormLabel>Attach Photo (Optional)</FormLabel>
                        <div className="flex flex-col gap-2">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                            />
                            {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
                            {imagePreview && (
                                <div className="relative h-40 w-full rounded-md overflow-hidden border">
                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="reporter_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reporter_phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="+254 7..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full bg-[#FFD700] text-black hover:bg-[#E6C200] font-bold text-lg" disabled={isSubmitting || uploadingImage}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                        "Submit Report"
                    )}
                </Button>
            </form>
        </Form>
    )
}
