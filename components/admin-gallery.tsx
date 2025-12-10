"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, Plus, FolderOpen, ImageIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface AlbumImage {
  id: string
  src: string
  caption: string
  order?: number
}

interface Album {
  id: string
  name: string
  description: string
  cover_image: string
  images: AlbumImage[]
  order?: number
}

// Map database fields to UI if needed, or use snake_case in UI?
// The UI used camelCase: coverImage. DB has cover_image.
// I will use cover_image in the interface and map it or update UI to use cover_image.
// Updating UI to use cover_image is cleaner.

export function AdminGallery() {
  const [albums, setAlbums] = useState<Album[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null)
  const [isAddingAlbum, setIsAddingAlbum] = useState(false)
  const [isAddingImage, setIsAddingImage] = useState(false)
  const [editingImage, setEditingImage] = useState<AlbumImage | null>(null)

  const [albumFormData, setAlbumFormData] = useState({
    name: "",
    description: "",
    cover_image: "",
  })

  const [imageFormData, setImageFormData] = useState({
    src: "",
    caption: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from("gallery_albums")
        .select(`
          *,
          images:gallery_images(*)
        `)
        .order("order", { ascending: true })

      if (error) throw error

      // Transform images ordering
      const formattedAlbums = (data || []).map((album: any) => ({
        ...album,
        images: (album.images || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      }))

      setAlbums(formattedAlbums)
    } catch (error) {
      console.error("Failed to fetch albums:", error)
    }
  }

  // Album Management
  const handleAlbumSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingAlbum) {
        // Update
        const { error } = await supabase
          .from("gallery_albums")
          .update(albumFormData)
          .eq("id", editingAlbum.id)

        if (error) throw error

        const updatedAlbums = albums.map((album) =>
          album.id === editingAlbum.id
            ? { ...album, ...albumFormData }
            : album
        )
        setAlbums(updatedAlbums)
        setEditingAlbum(null)
      } else {
        // Create
        // Determine new order
        const maxOrder = Math.max(0, ...albums.map(a => a.order || 0))

        const { data, error } = await supabase
          .from("gallery_albums")
          .insert({
            ...albumFormData,
            order: maxOrder + 1
          })
          .select()
          .single()

        if (error) throw error

        const newAlbum = { ...data, images: [] }
        setAlbums([...albums, newAlbum])
        setIsAddingAlbum(false)
      }
      resetAlbumForm()
    } catch (error) {
      console.error("Error saving album:", error)
      alert("Error saving album")
    }
  }

  const handleEditAlbum = (album: Album) => {
    setEditingAlbum(album)
    setIsAddingAlbum(false)
    setAlbumFormData({
      name: album.name,
      description: album.description,
      cover_image: album.cover_image,
    })
  }

  const handleDeleteAlbum = async (id: string) => {
    if (confirm("Are you sure you want to delete this album and all its images?")) {
      try {
        const { error } = await supabase.from("gallery_albums").delete().eq("id", id)
        if (error) throw error

        setAlbums(albums.filter((album) => album.id !== id))
        if (selectedAlbum?.id === id) setSelectedAlbum(null)
      } catch (error) {
        console.error("Error deleting album:", error)
        alert("Error deleting album")
      }
    }
  }

  const resetAlbumForm = () => {
    setAlbumFormData({
      name: "",
      description: "",
      cover_image: "",
    })
  }

  // Image Management
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAlbum) return

    try {
      if (editingImage) {
        // Update Image
        const { error } = await supabase
          .from("gallery_images")
          .update(imageFormData)
          .eq("id", editingImage.id)

        if (error) throw error

        const updatedImages = selectedAlbum.images.map(img =>
          img.id === editingImage.id ? { ...img, ...imageFormData } : img
        )

        const updatedAlbum = { ...selectedAlbum, images: updatedImages }
        updateAlbumInState(updatedAlbum)
        setEditingImage(null)
      } else {
        // Add Image
        // Determine order
        const maxOrder = Math.max(0, ...selectedAlbum.images.map(i => i.order || 0))

        const { data, error } = await supabase
          .from("gallery_images")
          .insert({
            album_id: selectedAlbum.id,
            ...imageFormData,
            order: maxOrder + 1
          })
          .select()
          .single()

        if (error) throw error

        const updatedAlbum = {
          ...selectedAlbum,
          images: [...selectedAlbum.images, data] // data includes id
        }
        updateAlbumInState(updatedAlbum)
        setIsAddingImage(false)
      }
      resetImageForm()
    } catch (error) {
      console.error("Error saving image:", error)
      alert("Error saving image")
    }
  }

  const updateAlbumInState = (updatedAlbum: Album) => {
    setAlbums(albums.map(a => a.id === updatedAlbum.id ? updatedAlbum : a))
    setSelectedAlbum(updatedAlbum)
  }

  const handleEditImage = (image: AlbumImage) => {
    setEditingImage(image)
    setIsAddingImage(false)
    setImageFormData({
      src: image.src,
      caption: image.caption,
    })
  }

  const handleDeleteImage = async (imageId: string) => {
    if (!selectedAlbum) return
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const { error } = await supabase.from("gallery_images").delete().eq("id", imageId)
        if (error) throw error

        const updatedAlbum = {
          ...selectedAlbum,
          images: selectedAlbum.images.filter(i => i.id !== imageId)
        }
        updateAlbumInState(updatedAlbum)
      } catch (error) {
        console.error("Error deleting image:", error)
        alert("Error deleting image")
      }
    }
  }

  const resetImageForm = () => {
    setImageFormData({
      src: "",
      caption: "",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">Manage Gallery Albums</h2>
        {!selectedAlbum && !isAddingAlbum && !editingAlbum && (
          <Button
            onClick={() => {
              setIsAddingAlbum(true)
              resetAlbumForm()
            }}
            className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Album
          </Button>
        )}
        {selectedAlbum && (
          <Button onClick={() => setSelectedAlbum(null)} variant="outline" className="border-black text-black">
            ← Back to Albums
          </Button>
        )}
      </div>

      {/* Album Form */}
      {(isAddingAlbum || editingAlbum) && (
        <form onSubmit={handleAlbumSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-black mb-4">
            {editingAlbum ? "Edit Album" : "Create New Album"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black font-medium">
                Album Name
              </Label>
              <Input
                id="name"
                required
                value={albumFormData.name}
                onChange={(e) => setAlbumFormData({ ...albumFormData, name: e.target.value })}
                placeholder="e.g. KKK Cup 2025"
                className="bg-white border-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-black font-medium">
                Cover Image URL
              </Label>
              <Input
                id="coverImage"
                required
                value={albumFormData.cover_image}
                onChange={(e) => setAlbumFormData({ ...albumFormData, cover_image: e.target.value })}
                placeholder="/blogs/cover.jpg"
                className="bg-white border-black"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-black font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              required
              value={albumFormData.description}
              onChange={(e) => setAlbumFormData({ ...albumFormData, description: e.target.value })}
              placeholder="Brief description of this album"
              className="bg-white border-black resize-none"
              rows={2}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium">
              {editingAlbum ? "Update Album" : "Create Album"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsAddingAlbum(false)
                setEditingAlbum(null)
                resetAlbumForm()
              }}
              className="border-black text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Albums Grid */}
      {!selectedAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {albums.map((album) => (
            <div key={album.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={album.cover_image || "/placeholder.svg"} alt={album.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {album.images.length}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-black mb-1">{album.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{album.description}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedAlbum(album)}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    <FolderOpen className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleEditAlbum(album)}
                    className="bg-[#FFD700] text-black hover:bg-[#E6C200]"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteAlbum(album.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Album Images View */}
      {selectedAlbum && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-black">{selectedAlbum.name}</h3>
            <p className="text-gray-600">{selectedAlbum.description}</p>
            <p className="text-sm text-gray-500 mt-2">{selectedAlbum.images.length} images</p>
          </div>

          {!isAddingImage && !editingImage && (
            <Button
              onClick={() => {
                setIsAddingImage(true)
                resetImageForm()
              }}
              className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Image to Album
            </Button>
          )}

          {/* Image Form */}
          {(isAddingImage || editingImage) && (
            <form onSubmit={handleImageSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-black mb-4">
                {editingImage ? "Edit Image" : "Add New Image"}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="src" className="text-black font-medium">
                  Image URL
                </Label>
                <Input
                  id="src"
                  required
                  value={imageFormData.src}
                  onChange={(e) => setImageFormData({ ...imageFormData, src: e.target.value })}
                  placeholder="/blogs/image.jpg"
                  className="bg-white border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="caption" className="text-black font-medium">
                  Caption
                </Label>
                <Input
                  id="caption"
                  required
                  value={imageFormData.caption}
                  onChange={(e) => setImageFormData({ ...imageFormData, caption: e.target.value })}
                  placeholder="Image description"
                  className="bg-white border-black"
                />
              </div>

              {imageFormData.src && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={imageFormData.src || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="bg-[#FFD700] text-black hover:bg-[#E6C200] font-medium">
                  {editingImage ? "Update Image" : "Add Image"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingImage(false)
                    setEditingImage(null)
                    resetImageForm()
                  }}
                  className="border-black text-black hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedAlbum.images.map((image) => (
              <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={image.src || "/placeholder.svg"} alt={image.caption} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-700 line-clamp-2 mb-3">{image.caption}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleEditImage(image)}
                      className="flex-1 bg-[#FFD700] text-black hover:bg-[#E6C200]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteImage(image.id)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
