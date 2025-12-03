"use client"
import { useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import FileInput from "@/components/admin/UI/FileInput"
import { Button } from "@/components/ui/button"

export default function ImageUploader({ preset, bucket, folder }: { preset: "hero" | "gallery"; bucket: string; folder?: string }) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const upload = async () => {
    setUploading(true)
    try {
      setProgress(5)
      const fd = new FormData()
      files.forEach((f) => fd.append("files", f))
      fd.append("bucket", bucket)
      if (folder) fd.append("folder", folder)
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const res = await fetch("/api/admin/images/upload", { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {}, body: fd })
      const json = await res.json()
      if (res.ok) {
        setProgress(100)
        setFiles([])
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <FileInput 
        multiple 
        onChange={setFiles} 
        value={files}
        accept="image/*"
        label={`Upload ${preset === 'hero' ? 'Hero' : 'Gallery'} Images`}
      />
      <Button 
        className="w-full sm:w-auto" 
        onClick={upload} 
        disabled={!files.length || uploading} 
        isLoading={uploading}
        variant="admin"
      >
        {uploading ? "Uploading..." : "Start Upload"}
      </Button>
      {uploading && (
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      )}
    </div>
  )
}
