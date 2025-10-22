"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Copy, Check, Image as ImageIcon } from "@/components/icons"

interface UploadedImage {
  url: string
  pathname: string
  filename: string
  size: number
  uploadedAt: string
}

export default function ImageManagementPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState("general")
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const folders = ["general", "programs", "stories", "events", "team", "gallery", "hero"]

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const response = await fetch("/api/images/list")
      const data = await response.json()
      setImages(data.files || [])
    } catch (error) {
      console.error("Failed to load images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", selectedFolder)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        await loadImages()
      } else {
        alert("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch("/api/images/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (response.ok) {
        await loadImages()
      } else {
        alert("Delete failed")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Delete failed")
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const filteredImages = images.filter((img) => img.pathname.includes(`ke258/${selectedFolder}/`))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Image Management</h1>
          <p className="text-muted-foreground">Upload and manage images for the KE 258 website</p>
        </div>

        {/* Upload Section */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="folder">Folder</Label>
              <select
                id="folder"
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              >
                {folders.map((folder) => (
                  <option key={folder} value={folder}>
                    {folder}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="file">Select Image</Label>
              <Input
                id="file"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="mt-1"
              />
            </div>
            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
          </div>
        </Card>

        {/* Folder Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {folders.map((folder) => (
            <Button
              key={folder}
              variant={selectedFolder === folder ? "default" : "outline"}
              onClick={() => setSelectedFolder(folder)}
              className="whitespace-nowrap"
            >
              {folder}
            </Button>
          ))}
        </div>

        {/* Images Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading images...</p>
        ) : filteredImages.length === 0 ? (
          <Card className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No images in this folder yet. Upload your first image above.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card key={image.url} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <p className="font-medium truncate" title={image.filename}>
                      {image.filename}
                    </p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(image.size)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(image.url)} className="flex-1">
                      {copiedUrl === image.url ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy URL
                        </>
                      )}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(image.url)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Instructions */}
        <Card className="mt-8 p-6 bg-muted/50">
          <h3 className="font-semibold mb-2">How to use uploaded images:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Upload your images using the form above</li>
            <li>Click "Copy URL" to copy the image URL to your clipboard</li>
            <li>Replace placeholder images in your code with the copied URL</li>
            <li>
              Example: Change <code className="bg-background px-1 rounded">src="/placeholder.svg"</code> to{" "}
              <code className="bg-background px-1 rounded">src="[your-blob-url]"</code>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  )
}
