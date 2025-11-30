"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { getSupabase } from "@/lib/supabase/client"
import { Copy, Trash2 } from "@/components/icons"

interface Item {
  fileName: string
  fileUrl: string
  size: number
  uploadedAt: string
}

export function ImageGallery() {
  const [buckets, setBuckets] = useState<string[]>([])
  const [folders, setFolders] = useState<string[]>([])
  const [bucket, setBucket] = useState("")
  const [folder, setFolder] = useState("")
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

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
          const initialFolder = fList[0] || ""
          setFolder(initialFolder)
          await loadItems(initial, initialFolder)
        }
      } catch (e) {
        setErrorMsg("Failed to load storage configuration")
      }
    }
    init()
  }, [])

  const loadItems = async (b?: string, f?: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/get-images?bucket=${encodeURIComponent(b || bucket)}&folder=${encodeURIComponent(f || folder)}`)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setItems(json.files || [])
    } catch (e) {
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (fileName: string) => {
    try {
      const supabase = getSupabase()
      if (!supabase) throw new Error("Supabase not configured")
      const { data: sessionData } = await supabase.auth.getSession()
      const token = sessionData?.session?.access_token
      if (!token) throw new Error("Admin access required")
      const res = await fetch(`/api/delete-image`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bucket, folder, fileName }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Delete failed")
      await loadItems()
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Delete failed")
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
            const resFolders = await fetch(`/api/storage/folders?bucket=${encodeURIComponent(b)}&prefix=`)
            const jsonFolders = await resFolders.json()
            const fList: string[] = jsonFolders.folders || []
            setFolders(fList)
            const first = fList[0] || ""
            setFolder(first)
            await loadItems(b, first)
          }} className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background">
            {buckets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="folder">Folder</Label>
          <select id="folder" value={folder} onChange={async (e) => { const f = e.target.value; setFolder(f); await loadItems(bucket, f) }} className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background">
            {folders.length === 0 ? <option value="">(root)</option> : folders.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading images...</p>
      ) : items.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No images in this folder</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((image) => (
            <Card key={image.fileUrl} className="overflow-hidden">
              <div className="relative bg-muted">
                <img src={image.fileUrl} alt={image.fileName} className="w-full h-64 object-cover rounded-t-lg" />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="font-medium truncate" title={image.fileName}>{image.fileName}</p>
                  <p className="text-sm text-muted-foreground">{image.size} B</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(image.fileUrl)} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(image.fileName)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}
    </Card>
  )
}
