"use client"
import { useEffect, useState } from "react"
import { getSupabaseBrowser } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export default function EventList() {
  const [items, setItems] = useState<any[]>([])
  useEffect(() => {
    const load = async () => {
      const supabase = getSupabaseBrowser()
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      const res = await fetch(`/api/admin/content/events/list?page=1&limit=20`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      const json = await res.json()
      setItems(json.items || [])
    }
    load()
  }, [])
  return (
    <div className="rounded-lg border p-4">
      <div className="font-medium mb-2">Events</div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{it.title}</div>
            </div>
            <div className="flex gap-2"><Button variant="outline">Edit</Button><Button variant="outline">Delete</Button></div>
          </div>
        ))}
        {!items.length && <div className="text-sm text-muted-foreground">No events</div>}
      </div>
    </div>
  )
}
