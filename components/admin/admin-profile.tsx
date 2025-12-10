"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import { sanitizeHTML } from "@/lib/sanitize"

export function AdminProfile() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const { toast } = useToast()

    const [profile, setProfile] = useState({
        name: "",
        title: "",
        bio: "",
        photo: "",
        email: "",
        phone: "",
        birth_date: "",
        social_links: {
            twitter: "",
            facebook: "",
            instagram: "",
            linkedin: "",
        },
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("politician")
            .select("*")
            .single()

        if (error) {
            toast({
                title: "Error",
                description: "Failed to load profile data",
                variant: "destructive",
            })
        } else if (data) {
            setProfile({
                name: (data as any).name || "",
                title: (data as any).title || "",
                bio: (data as any).bio || "",
                photo: (data as any).photo || "",
                email: (data as any).email || "",
                phone: (data as any).phone || "",
                birth_date: (data as any).birth_date || "",
                social_links: (data as any).social_links || {
                    twitter: "",
                    facebook: "",
                    instagram: "",
                    linkedin: "",
                },
            })
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const supabase = createClient()
        // Sanitize HTML before saving
        const sanitizedBio = sanitizeHTML(profile.bio)

        const { error } = await supabase
            .from("politician")
            .update({
                name: profile.name,
                title: profile.title,
                bio: sanitizedBio,
                photo: profile.photo,
                email: profile.email,
                phone: profile.phone,
                birth_date: profile.birth_date,
                social_links: profile.social_links,
            } as any) // Extended fields not in generated types
            .eq("id", ((await supabase.from("politician").select("id").single()).data as any)?.id as string)

        setSaving(false)

        if (error) {
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            })
        } else {
            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
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
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    MP Profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={profile.title}
                                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <Label htmlFor="bio">Biography</Label>
                        <RichTextEditor
                            value={profile.bio}
                            onChange={(html) => setProfile({ ...profile, bio: html })}
                            placeholder="Enter biography with rich text formatting..."
                        />
                    </div>

                    {/* Photo URL */}
                    <div>
                        <Label htmlFor="photo">Photo URL</Label>
                        <Input
                            id="photo"
                            value={profile.photo}
                            onChange={(e) => setProfile({ ...profile, photo: e.target.value })}
                            placeholder="/path/to/photo.jpg"
                        />
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Birth Date */}
                    <div>
                        <Label htmlFor="birth_date">Birth Date</Label>
                        <Input
                            id="birth_date"
                            value={profile.birth_date}
                            onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
                            placeholder="e.g., 24th November 1976"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="space-y-2">
                        <Label>Social Media Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="twitter" className="text-sm text-gray-600">
                                    Twitter
                                </Label>
                                <Input
                                    id="twitter"
                                    value={profile.social_links.twitter}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            social_links: { ...profile.social_links, twitter: e.target.value },
                                        })
                                    }
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="facebook" className="text-sm text-gray-600">
                                    Facebook
                                </Label>
                                <Input
                                    id="facebook"
                                    value={profile.social_links.facebook}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            social_links: { ...profile.social_links, facebook: e.target.value },
                                        })
                                    }
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="instagram" className="text-sm text-gray-600">
                                    Instagram
                                </Label>
                                <Input
                                    id="instagram"
                                    value={profile.social_links.instagram}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            social_links: { ...profile.social_links, instagram: e.target.value },
                                        })
                                    }
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <Label htmlFor="linkedin" className="text-sm text-gray-600">
                                    LinkedIn
                                </Label>
                                <Input
                                    id="linkedin"
                                    value={profile.social_links.linkedin}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            social_links: { ...profile.social_links, linkedin: e.target.value },
                                        })
                                    }
                                    placeholder="https://linkedin.com/..."
                                />
                            </div>
                        </div>
                    </div>

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
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
