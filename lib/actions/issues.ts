"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Define the type for the issue data
export type IssueData = {
    title: string
    description: string
    category: string
    ward: string
    reporter_name?: string
    reporter_phone?: string
    location_lat?: number
    location_lng?: number
    image_url?: string
}

export async function submitIssue(data: IssueData) {
    try {
        const supabase = await createClient()

        // We use the 'issues' table we defined in the implementation plan
        const { error } = await supabase.from("issues").insert({
            title: data.title,
            description: data.description,
            category: data.category,
            ward: data.ward,
            reporter_name: data.reporter_name || "Anonymous",
            reporter_phone: data.reporter_phone ?? null,
            location_lat: data.location_lat ?? null,
            location_lng: data.location_lng ?? null,
            image_url: data.image_url ?? null,
            // Status and Priority have defaults in DB ('Received', 'Normal')
        })

        if (error) {
            console.error("Supabase Error:", error)
            return { success: false, error: error.message }
        }

        // Revalidate the admin issues page if it exists/cached
        revalidatePath("/admin")

        return { success: true }
    } catch (error) {
        console.error("Server Action Error:", error)
        return { success: false, error: "Internal Server Error" }
    }
}

export async function getIssues() {
    try {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from("issues")
            .select("*")
            .order("created_at", { ascending: false })

        if (error) throw error
        return { success: true, data }
    } catch (error) {
        console.error("Error fetching issues:", error)
        return { success: false, error: "Failed to fetch issues", data: [] }
    }
}

export async function updateIssueStatus(id: string, status: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from("issues")
            .update({ status })
            .eq("id", id)

        if (error) throw error

        revalidatePath("/admin")
        return { success: true }
    } catch (error) {
        console.error("Error updating issue:", error)
        return { success: false, error: "Failed to update issue" }
    }
}
