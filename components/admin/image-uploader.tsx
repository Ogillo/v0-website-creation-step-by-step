"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { getSupabase } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

export function ImageUploader() {
  const [buckets, setBuckets] = useState<string[]>([])
  const [folders, setFolders] = useState<string[]>([])
  const [bucket, setBucket] = useState("")
  const [folder, setFolder] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successUrl, setSuccessUrl] = useState<string | null>(null)
  const [dropActive, setDropActive] = useState(false)

  useEffect(() => {
    const init = async () => {
      try {
        const resBuckets = await fetch("/api/storage/buckets")
        const jsonBuckets = await resBuckets.json()
        if (jsonBuckets.error) throw new Error(jsonBuckets.error)
        const ids = (jsonBuckets.buckets || []).map((b: any) => b.id)
        setBuckets(ids)
        const initial = ids[0] || ""
        setBucket(initial)
        if (initial) {
          const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(initial)}&prefix=`)
          const jsonFolders = await resFolders.json()
          if (jsonFolders.error) throw new Error(jsonFolders.error)
          const fList: string[] = jsonFolders.folders || []
          setFolders(fList)
          setFolder(fList[0] || "")
        }
      } catch (e) {
        setErrorMsg("Failed to load storage configuration")
      }
    }
    init()
  }, [])

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    if (!f) return
    const allowed = ["image/jpeg", "image/png", "image/webp"]
    if (!allowed.includes(f.type)) {
      setErrorMsg("Unsupported file type")
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg("File too large")
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setSuccessUrl(null)
    setErrorMsg(null)
  }

  const doUpload = async () => {
    try {
      if (!file || !bucket) return
      setUploading(true)
      setProgress(10)
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token
      if (!token) throw new Error("Admin access required")
      const fd = new FormData()
      fd.append("file", file)
      fd.append("bucket", bucket)
      fd.append("folder", folder)
      const res = await fetch("/api/upload-image", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Upload failed")
      setProgress(100)
      setSuccessUrl(json.url)
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bucket">Bucket</Label>
          <select id="bucket" value={bucket} onChange={async (e) => {
            const b = e.target.value
            setBucket(b)
            setFolders([])
            setFolder("")
            setSuccessUrl(null)
            const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(b)}&prefix=`)
            const jsonFolders = await resFolders.json()
            const fList: string[] = jsonFolders.folders || []
            setFolders(fList)
            setFolder(fList[0] || "")
          }} className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background">
            {buckets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="folder">Folder</Label>
          <select id="folder" value={folder} onChange={(e) => setFolder(e.target.value)} className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background">
            {folders.length === 0 ? <option value="">(root)</option> : folders.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="file">Select Image</Label>
          <Input id="file" type="file" accept="image/jpeg,image/png,image/webp" onChange={onFileSelect} className="mt-1" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <div>
          <div className="border rounded-lg p-3 flex items-center justify-center bg-muted h-48">
            {preview ? <img src={preview} className="w-48 h-48 object-cover rounded-lg" /> : <span className="text-muted-foreground text-sm">No preview</span>}
          </div>
          <div className={cn("mt-3 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-muted/40", dropActive ? "border-primary bg-primary/10" : "border-muted")} onDragOver={(e) => { e.preventDefault(); setDropActive(true) }} onDragLeave={() => setDropActive(false)} onDrop={(e) => { e.preventDefault(); setDropActive(false); const f = e.dataTransfer.files?.[0]; if (!f) return; const ev = { target: { files: [f] } } as any; onFileSelect(ev) }}>
            <p className="text-sm text-muted-foreground">Drag & drop an image here or use the file picker</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Button type="button" onClick={doUpload} disabled={!file || !bucket || uploading}>{uploading ? "Uploading..." : "Upload"}</Button>
          {progress > 0 && <div className="w-40 bg-muted h-2 rounded"><div className="bg-primary h-2 rounded" style={{ width: `${progress}%` }} /></div>}
        </div>
        <div>
          <div className="border rounded-lg p-3 flex items-center justify-center bg-muted h-48">
            {successUrl ? <img src={successUrl} className="w-48 h-48 object-cover rounded-lg" /> : <span className="text-muted-foreground text-sm">No uploaded image</span>}
          </div>
          {successUrl && <div className="mt-3 flex gap-2"><Button variant="outline" type="button" onClick={() => navigator.clipboard.writeText(successUrl)}>Copy URL</Button></div>}
        </div>
      </div>
      {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}
    </Card>
  )
}
