import { createClient } from "@/lib/supabase/server"
import { GalleryGrid } from "@/components/gallery-grid"

export const metadata = {
  title: "Gallery - Hon. Amb. CPA Benjamin Kipkirui Langat, CBS",
  description:
    "Photo gallery showcasing the work and activities of Hon. Amb. CPA Benjamin Kipkirui Langat, CBS in Ainamoi Constituency and beyond.",
}

export default async function GalleryPage() {
  const supabase = await createClient()

  // Fetch albums with their images
  const { data: albumsData } = await supabase
    .from("gallery_albums")
    .select(`
      *,
      images:gallery_images(*)
    `)
    .order("order", { ascending: true })

  // Transform data if necessary (e.g. sorting images)
  const albums = (albumsData || []).map((album) => ({
    ...album,
    images: (album.images || []).sort((a: any, b: any) => a.order - b.order),
  }))

  return (
    <main className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A visual journey through the work, events, and development activities across Ainamoi Constituency. Click on
            any image to view it in full size.
          </p>
        </div>

        <GalleryGrid albums={albums} />
      </div>
    </main>
  )
}
