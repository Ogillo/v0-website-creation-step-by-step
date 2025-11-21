"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit } from "@/components/icons"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getSupabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"
import { toast } from "sonner"

type StoryRow = Database["public"]["Tables"]["stories"]["Row"]
type EventRow = Database["public"]["Tables"]["events"]["Row"]
type ProgramRow = Database["public"]["Tables"]["programs"]["Row"]

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<"stories" | "events" | "programs">("stories")
  const [stories, setStories] = useState<StoryRow[]>([])
  const [events, setEvents] = useState<EventRow[]>([])
  const [programs, setPrograms] = useState<ProgramRow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [open, setOpen] = useState(false)
  const [editingType, setEditingType] = useState<"stories" | "events" | "programs" | null>(null)
  const [editingItem, setEditingItem] = useState<any | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const supabase = useMemo(() => getSupabase(), [])

  const tabs = [
    { id: "stories", label: "Stories" },
    { id: "events", label: "Events" },
    { id: "programs", label: "Programs" },
  ]

  useEffect(() => {
    const fetchAll = async () => {
      if (!supabase) return
      setLoading(true)
      setError(null)
      try {
        const [storiesRes, eventsRes, programsRes] = await Promise.all([
          supabase.from("stories").select("*").order("created_at", { ascending: false }),
          supabase.from("events").select("*").order("created_at", { ascending: false }),
          supabase.from("programs").select("*").order("updated_at", { ascending: false }),
        ])
        setStories(storiesRes.data || [])
        setEvents(eventsRes.data || [])
        setPrograms(programsRes.data || [])
      } catch (e) {
        setError("Failed to load content")
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [supabase])

  const openEditor = (type: "stories" | "events" | "programs", item: any) => {
    setEditingType(type)
    setEditingItem(item)
    setOpen(true)
  }

  const titleFor = (item: any) => item.title
  const statusForStory = (item: StoryRow) => (item.is_published ? "Published" : "Draft")
  const statusForEvent = (item: EventRow) => item.status
  const dateForStory = (item: StoryRow) => item.created_at || item.publication_date
  const dateForEvent = (item: EventRow) => item.created_at

  const participantsForProgram = (item: ProgramRow) => item.current_enrollment

  return (
    <div className="space-y-6" ref={scrollRef}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage stories, events, and programs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={`Search ${activeTab}...`} className="pl-10" />
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">{activeTab === "programs" ? "Participants" : "Date"}</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading && (
                <tr>
                  <td className="px-6 py-4" colSpan={4}>
                    Loading...
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td className="px-6 py-4" colSpan={4}>
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && activeTab === "stories" &&
                stories.map((story) => (
                  <tr key={story.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{titleFor(story)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${story.is_published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{statusForStory(story)}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{dateForStory(story)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditor("stories", story)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!loading && !error && activeTab === "events" &&
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{titleFor(event)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${event.status === "Scheduled" || event.status === "Ongoing" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>{statusForEvent(event)}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{dateForEvent(event)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditor("events", event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!loading && !error && activeTab === "programs" &&
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{titleFor(program)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">{program.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{participantsForProgram(program)} participants</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditor("programs", program)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {editingType}</DialogTitle>
          </DialogHeader>

          {editingItem && (
            <EditorForm
              type={editingType as any}
              item={editingItem}
              onSaved={async () => {
                setOpen(false)
                if (!supabase) return
                const [storiesRes, eventsRes, programsRes] = await Promise.all([
                  supabase.from("stories").select("*").order("created_at", { ascending: false }),
                  supabase.from("events").select("*").order("created_at", { ascending: false }),
                  supabase.from("programs").select("*").order("updated_at", { ascending: false }),
                ])
                setStories(storiesRes.data || [])
                setEvents(eventsRes.data || [])
                setPrograms(programsRes.data || [])
                if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollTop
              }}
            />
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EditorForm({
  type,
  item,
  onSaved,
}: {
  type: "stories" | "events" | "programs"
  item: any
  onSaved: () => void
}) {
  const supabase = getSupabase()
  const [title, setTitle] = useState(item.title || "")
  const [content, setContent] = useState((item.content as string) || (item.description as string) || "")
  const [tags, setTags] = useState<string[]>(Array.isArray(item.tags) ? item.tags : item.tag ? [item.tag] : [])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [mediaPaths, setMediaPaths] = useState<string[]>(
    Array.isArray(item.images) ? item.images : item.media_path ? [item.media_path] : []
  )

  const [existingTags, setExistingTags] = useState<string[]>([])

  useEffect(() => {
    const loadTags = async () => {
      if (!supabase) return
      const s = await supabase.from("stories").select("tag")
      const tagsSet = new Set<string>()
      ;(s.data || []).forEach((row: any) => {
        if (row.tag) tagsSet.add(row.tag)
      })
      setExistingTags(Array.from(tagsSet))
    }
    loadTags()
  }, [supabase])

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const uploaded: string[] = []
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData()
        fd.append("file", files[i])
        fd.append("folder", type)
        const res = await fetch("/api/upload", { method: "POST", body: fd })
        const json = await res.json()
        if (json.pathname) uploaded.push(json.pathname)
      }
      setMediaPaths((prev) => [...prev, ...uploaded])
    } catch (e) {
      toast.error("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const onSave = async () => {
    if (!supabase) return
    if (!title.trim()) {
      toast.error("Title is required")
      return
    }
    if (!content.trim()) {
      toast.error("Content is required")
      return
    }
    setSaving(true)
    try {
      if (type === "stories") {
        const update: Partial<StoryRow> = {
          title,
          content,
          images: mediaPaths,
          tag: tags[0] || null,
        } as any
        const { error } = await supabase.from("stories").update(update).eq("id", item.id)
        if (error) throw error
      } else if (type === "events") {
        const update: Partial<EventRow> = {
          title,
          description: content,
          media_path: mediaPaths[0] || null,
        }
        const { error } = await supabase.from("events").update(update).eq("id", item.id)
        if (error) throw error
      } else if (type === "programs") {
        const update: Partial<ProgramRow> = {
          description: content,
          name: title,
        }
        const { error } = await supabase.from("programs").update(update).eq("id", item.id)
        if (error) throw error
      }
      toast.success("Saved successfully")
      onSaved()
    } catch (e) {
      toast.error("Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      </div>
      <div>
        <label className="block text-sm font-medium">Content</label>
        <div
          className="min-h-32 w-full rounded-md border p-3 bg-input"
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent((e.target as HTMLDivElement).innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Media Uploads</label>
        <input type="file" multiple accept="image/*,video/*" onChange={(e) => onUpload(e.target.files)} />
        <div className="flex flex-wrap gap-2 mt-2">
          {mediaPaths.map((p) => (
            <span key={p} className="text-xs bg-muted px-2 py-1 rounded">{p}</span>
          ))}
        </div>
        {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Tags</label>
        <div className="grid grid-cols-2 gap-2">
          {existingTags.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={tags.includes(t)}
                onChange={(e) => {
                  setTags((prev) => (e.target.checked ? [...prev, t] : prev.filter((x) => x !== t)))
                }}
              />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSaved}>Cancel</Button>
        <Button onClick={onSave} disabled={saving || uploading}>{saving ? "Saving..." : "Save"}</Button>
      </div>
    </div>
  )
}
