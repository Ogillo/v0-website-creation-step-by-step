import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

async function uploadOne(supabase: ReturnType<typeof getAdminSupabase>, bucket: string, folder: string | undefined, file: File) {
  const safe = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "_")
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`
  const path = folder ? `${folder}/${unique}` : unique
  const buf = await file.arrayBuffer()
  const blob = new Blob([buf], { type: file.type })
  
  // Use 'upsert: true' to overwrite if name conflict (unlikely with unique timestamp)
  // Ensure bucket exists or handle error if it doesn't (assuming buckets exist per setup)
  const { error, data } = await supabase.storage.from(bucket).upload(path, blob, { 
    contentType: file.type, 
    cacheControl: "3600", 
    upsert: true 
  })

  if (error) {
    console.error("Supabase upload error:", error)
    throw new Error(`Upload failed: ${error.message}`)
  }

  const url = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
  const thumbUrl = `${url}?width=400`
  return { path, url, thumbUrl, size: file.size }
}

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  
  try {
    const form = await req.formData()
    const bucket = String(form.get("bucket") || "gallery")
    const folder = String(form.get("folder") || "") || undefined
    
    // Handle 'files' (multiple) or 'file' (single)
    let files = form.getAll("files").filter((f) => f instanceof File) as File[]
    if (files.length === 0) {
       const singleFile = form.get("file")
       if (singleFile instanceof File) {
           files = [singleFile]
       }
    }

    if (files.length === 0) {
        return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const supabase = getAdminSupabase()
    
    // Verify bucket exists (optional, but good for debugging)
    // const { data: buckets } = await supabase.storage.listBuckets()
    // if (!buckets?.find(b => b.name === bucket)) {
    //    return NextResponse.json({ error: `Bucket '${bucket}' does not exist` }, { status: 400 })
    // }

    const concurrency = 4
    const results: any[] = []
    for (let i = 0; i < files.length; i += concurrency) {
      const slice = files.slice(i, i + concurrency)
      const chunk = await Promise.all(slice.map((f) => uploadOne(supabase, bucket, folder, f)))
      results.push(...chunk)
    }

    return NextResponse.json({ files: results, success: true })
  } catch (e: any) {
    console.error("Upload route error:", e)
    return NextResponse.json({ error: e.message || "Upload failed" }, { status: 500 })
  }
}
