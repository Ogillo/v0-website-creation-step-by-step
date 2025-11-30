"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Trash2, Copy, Check, Image as ImageIcon } from "@/components/icons"
import { getSupabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { ImageUploader } from "@/components/admin/image-uploader"
import { ImageGallery } from "@/components/admin/image-gallery"

interface UploadedImage {
  url: string
  pathname: string
  filename: string
  size: number
  uploadedAt: string
  bucket: string
  thumbUrl?: string
}

export default function ImageManagementPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedBucket, setSelectedBucket] = useState<string>("")
  const [selectedFolder, setSelectedFolder] = useState<string>("")
  const [buckets, setBuckets] = useState<string[]>([])
  const [folders, setFolders] = useState<string[]>([])
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [selectOpen, setSelectOpen] = useState(false)
  const [selectLoading, setSelectLoading] = useState(false)
  const [selectError, setSelectError] = useState<string | null>(null)
  const [selectFiles, setSelectFiles] = useState<UploadedImage[]>([])
  const [adminFile, setAdminFile] = useState<File | null>(null)
  const [dropActive, setDropActive] = useState(false)


  useEffect(() => {
    const init = async () => {
      try {
        // Fetch buckets
        const resBuckets = await fetch("/api/storage/buckets")
        const jsonBuckets = await resBuckets.json()
        if (jsonBuckets.error) throw new Error(jsonBuckets.error)
        const bucketIds: string[] = (jsonBuckets.buckets || []).map((b: any) => b.id)
        setBuckets(bucketIds)
        const initialBucket = bucketIds[0] || ""
        setSelectedBucket(initialBucket)
        // Fetch folders for initial bucket
        if (initialBucket) {
          const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(initialBucket)}&prefix=`)
          const jsonFolders = await resFolders.json()
          if (jsonFolders.error) throw new Error(jsonFolders.error)
          const folderList: string[] = jsonFolders.folders || []
          setFolders(folderList)
          const initialFolder = folderList[0] || ""
          setSelectedFolder(initialFolder)
          if (initialFolder) await loadImages(initialBucket, initialFolder)
          else setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (e) {
        console.error("Init error:", e)
        setErrorMsg("Failed to load buckets/folders")
        setLoading(false)
      }
    }
    init()
  }, [])

  const loadImages = async (bucket?: string, folder?: string) => {
    try {
      setLoading(true)
      const selectedB = bucket ?? selectedBucket
      const selectedF = folder ?? selectedFolder
      if (!selectedB) throw new Error("No bucket selected")
      const params = new URLSearchParams({ bucket: selectedB })
      if (selectedF) params.set("folder", selectedF)
      const res = await fetch(`/api/images/list?${params.toString()}`)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      const files: UploadedImage[] = (json.files || [])
      setImages(files)
    } catch (error) {
      console.error("Failed to load images:", error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErrorMsg(null)

    if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)) {
      setErrorMsg("Only JPG, PNG, GIF, WEBP allowed")
      e.target.value = ""
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Max size 5MB")
      e.target.value = ""
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        if (img.width < 100 || img.height < 100) {
          setErrorMsg("Image too small (min 100x100)")
          return
        }
      }
      if (typeof reader.result === "string") setPreviewUrl(reader.result)
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
    setAdminFile(file)
  }

  const handleUploadClick = async () => {
    try {
      await ensureAdmin()
      if (!adminFile) {
        setErrorMsg("Select an image first")
        return
      }
      if (!selectedBucket) {
        setErrorMsg("Select a bucket")
        return
      }
      setUploading(true)
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      const folderPath = selectedFolder || ""
      const processed = await processImage(adminFile)
      const objectPath = folderPath ? `${folderPath}/${processed.name}` : processed.name
      await uploadWithRetry(supabase, selectedBucket, objectPath, processed.blob, processed.type)
      await fetch("/api/images/record", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bucket: selectedBucket,
          path: objectPath,
          filename: processed.name,
          size: processed.blob.size,
          width: processed.width,
          height: processed.height,
          uploadedAt: new Date().toISOString(),
        }),
      })
      await loadImages(selectedBucket, folderPath)
      setAdminFile(null)
      setPreviewUrl(null)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (image: UploadedImage) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      const { error } = await supabase.storage.from(image.bucket).remove([image.pathname])
      if (error) throw error
      await loadImages()
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

  const filteredImages = images

  const openSelectFromStorage = async () => {
    try {
      setSelectError(null)
      setSelectLoading(true)
      setSelectOpen(true)
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      if (!selectedBucket) throw new Error("No bucket selected")
      const folderPath = selectedFolder || ""
      const { data, error } = await supabase.storage.from(selectedBucket).list(folderPath, { recursive: true, sortBy: { column: "name", order: "asc" } })
      if (error) throw error
      const files = (data || [])
        .filter((f) => f.name)
        .map((f) => {
          const path = folderPath ? `${folderPath}/${f.name}` : f.name
          const url = supabase.storage.from(selectedBucket).getPublicUrl(path).data.publicUrl
          const thumbUrl = supabase.storage.from(selectedBucket).getPublicUrl(path, { transform: { width: 320, height: 200, quality: 70 } }).data.publicUrl
          return { url, pathname: path, filename: f.name, size: f.metadata?.size ?? 0, uploadedAt: f.updated_at ?? "", bucket: selectedBucket, thumbUrl }
        })
      setSelectFiles(files)
    } catch (err) {
      setSelectError("Unable to load folder contents")
      setSelectFiles([])
    } finally {
      setSelectLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Image Management</h1>
          <p className="text-muted-foreground">Upload and manage images for the KE 258 website</p>
        </div>

        <ImageUploader />

        {/* Folder Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(folders.length ? folders : [""]).map((folder) => (
            <Button
              key={folder || "root"}
              variant={selectedFolder === folder ? "default" : "outline"}
              onClick={async () => {
                setSelectedFolder(folder)
                await loadImages(selectedBucket, folder)
              }}
              className="whitespace-nowrap"
            >
              {folder || "(root)"}
            </Button>
          ))}
        </div>

        <ImageGallery />

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
        <Dialog open={selectOpen} onOpenChange={setSelectOpen}>
          <DialogContent className="max-w-3xl">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Select from {selectedFolder}</h2>
              <p className="text-sm text-muted-foreground">Files are loaded from Supabase Storage</p>
            </div>
            {selectLoading ? (
              <div className="text-center py-8">
                <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground mt-2">Loading...</p>
              </div>
            ) : selectError ? (
              <p className="text-destructive">{selectError}</p>
            ) : selectFiles.length === 0 ? (
              <p className="text-muted-foreground">No files found in this folder</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectFiles.map((file) => (
                  <Card key={file.pathname} className="overflow-hidden cursor-pointer" onClick={() => { setPreviewUrl(file.url); setSelectOpen(false) }}>
                    <img src={file.thumbUrl || file.url} alt={file.filename} className="w-full h-40 object-cover" />
                    <div className="p-3 text-sm truncate">{file.filename}</div>
                  </Card>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
  const ensureAdmin = async () => {
    const supabase = getSupabase()
    if (!supabase) throw new Error("Supabase not configured")
    const { data } = await supabase.auth.getSession()
    const role = (data?.session?.user?.app_metadata as any)?.role || (data?.session?.user?.user_metadata as any)?.role
    if (role !== "admin") throw new Error("Not authorized: admin role required")
  }

  const processImage = (file: File): Promise<{ blob: Blob; width: number; height: number; type: string; name: string }> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const reader = new FileReader()
      reader.onload = () => {
        img.onload = () => {
          const maxW = 1920
          const maxH = 1080
          let w = img.width
          let h = img.height
          const ratio = Math.min(1, Math.min(maxW / w, maxH / h))
          w = Math.round(w * ratio)
          h = Math.round(h * ratio)
          const canvas = document.createElement("canvas")
          canvas.width = w
          canvas.height = h
          const ctx = canvas.getContext("2d")
          if (!ctx) return reject(new Error("Canvas unsupported"))
          ctx.drawImage(img, 0, 0, w, h)
          const targetType = file.type === "image/webp" ? "image/webp" : file.type
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error("Failed to create blob"))
              resolve({ blob, width: w, height: h, type: targetType, name: file.name })
            },
            targetType,
            0.9,
          )
        }
        img.onerror = () => reject(new Error("Invalid image"))
        img.src = reader.result as string
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsDataURL(file)
    })
  }

  const uploadWithRetry = async (supabase: ReturnType<typeof getSupabase>, bucket: string, path: string, blob: Blob, contentType: string, retries = 2) => {
    let lastErr: any = null
    for (let i = 0; i <= retries; i++) {
      const { error } = await supabase!.storage.from(bucket).upload(path, blob, {
        upsert: false,
        contentType,
        cacheControl: "86400",
      })
      if (!error) return true
      lastErr = error
      await new Promise((r) => setTimeout(r, 500 * (i + 1)))
    }
    throw new Error(lastErr?.message || "Upload failed")
  }
