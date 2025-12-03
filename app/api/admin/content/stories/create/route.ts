import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await req.json()
  const supabase = getAdminSupabase()
  let slug = String(body.slug || (body.title || "").toLowerCase().replace(/\s+/g, "-").slice(0, 240))
  const { data: existing } = await supabase.from("stories").select("id").eq("slug", slug).limit(1)
  if (existing && existing.length) slug = `${slug}-${Date.now().toString().slice(-4)}`
  const { error } = await supabase.from("stories").insert({ title: body.title, slug, excerpt: body.excerpt || null, tags: body.tags || [], featured_image_path: body.featured_image_path || null, media_paths: body.media_paths || [], content: body.content || "", publish_date: body.publish_date || null, is_published: !!body.is_published })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true, slug })
}
