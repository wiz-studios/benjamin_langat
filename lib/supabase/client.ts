import { createBrowserClient } from '@supabase/ssr'

export type Database = {
    public: {
        Tables: {
            politician: {
                Row: {
                    id: string
                    name: string
                    title: string
                    bio: string
                    photo: string
                    email: string
                    phone: string
                    social_links: Record<string, string>
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['politician']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['politician']['Insert']>
            }
            blog_posts: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    date: string
                    excerpt: string
                    content: string
                    images: string[]
                    captions: string[]
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
            }
            gallery_albums: {
                Row: {
                    id: string
                    name: string
                    description: string
                    cover_image: string
                    order: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['gallery_albums']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['gallery_albums']['Insert']>
            }
            gallery_images: {
                Row: {
                    id: string
                    album_id: string
                    src: string
                    caption: string
                    order: number
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['gallery_images']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['gallery_images']['Insert']>
            }
            issues: {
                Row: {
                    id: string
                    title: string
                    description: string
                    category: string
                    status: string
                    priority: string
                    ward: string
                    location_lat: number | null
                    location_lng: number | null
                    image_url: string | null
                    reporter_name: string | null
                    reporter_phone: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['issues']['Row'], 'id' | 'created_at' | 'updated_at' | 'status' | 'priority'> & {
                    status?: string
                    priority?: string
                }
                Update: Partial<Database['public']['Tables']['issues']['Insert']>
            }
            cdf_allocations: {
                Row: {
                    id: string
                    financial_year: string
                    amount_allocated: number
                    amount_disbursed: number
                    status: string
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['cdf_allocations']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['cdf_allocations']['Insert']>
            }
            cdf_projects: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    sector: string
                    financial_year: string | null
                    amount: number | null
                    status: string
                    location: string | null
                    image_url: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['cdf_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['cdf_projects']['Insert']>
            }
        }
    }
}

export const createClient = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key) {
        console.error('❌ Supabase Client Error: Missing environment variables', { url: !!url, key: !!key })
    }

    return createBrowserClient<Database>(
        url!,
        key!
    )
}
