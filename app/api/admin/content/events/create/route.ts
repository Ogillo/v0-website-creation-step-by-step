import { NextResponse } from "next/server"
import { getAdminSupabase, adminAuth } from "@/lib/supabase/admin"

export async function POST(req: Request) {
  const auth = await adminAuth(req)
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: 401 })
  const body = await req.json()
  const supabase = getAdminSupabase()
  const { error } = await supabase.from("events").insert({ title: body.title, event_time: body.event_time || null, event_date: body.event_date || null, location: body.location || null, capacity: body.capacity || null, media_paths: body.media_paths || [], content: body.content || "", is_published: !!body.is_published })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
