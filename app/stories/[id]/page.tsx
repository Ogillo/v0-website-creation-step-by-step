import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getSupabase } from "@/lib/supabase/client"

export default async function StoryDetailPage({ params }: { params: { id: string } }) {
  const supabase = getSupabase()
  let story: any | null = null
  if (supabase) {
    const res = await supabase.from("stories").select("id, title, content, story_date, tag, images, is_published").eq("id", params.id).single()
    story = res.data
  }
  const imageUrl = (() => {
    if (!supabase || !story || !Array.isArray(story.images) || story.images.length === 0) return undefined
    return supabase.storage.from("gallery").getPublicUrl(story.images[0]).data.publicUrl
  })()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative py-24">
        {imageUrl && (
          <div className="absolute inset-0 -z-10">
            <img src={imageUrl} alt={story?.title || "Story"} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        <div className="container mx-auto px-4">
          <div className="max-w-[680px]">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">{story?.title || "Story"}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              {story?.story_date && <span>{new Date(story.story_date).toLocaleDateString()}</span>}
              {story?.tag && <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-[10px]">{story.tag}</span>}
            </div>
            <div className="prose max-w-[680px]">
              <div dangerouslySetInnerHTML={{ __html: story?.content || "" }} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
