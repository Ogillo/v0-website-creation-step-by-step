import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StoryCard } from "@/components/ui/story-card"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { getSupabase } from "@/lib/supabase/client"

export default async function StoriesPage({ searchParams }: { searchParams?: Record<string, string> }) {
  const page = Number(searchParams?.page || 1)
  const limit = 9
  const from = (page - 1) * limit
  const to = from + limit - 1
  const supabase = getSupabase()
  let data: any[] | null = null
  if (supabase) {
    const res = await supabase
      .from("stories")
      .select("title, content, story_date, tag, images, is_published")
      .eq("is_published", true)
      .order("story_date", { ascending: false })
      .range(from, to)
    data = res.data
  }

  const items = (data || []).map((s: any) => {
    const img = Array.isArray(s.images) && s.images.length > 0 ? s.images[0] : undefined
    const imageUrl = supabase && img ? supabase.storage.from("gallery").getPublicUrl(img).data.publicUrl : undefined
    return {
      title: s.title,
      excerpt: typeof s.content === "string" ? s.content.slice(0, 160) : "",
      href: "/stories",
      date: s.story_date ? new Date(s.story_date).toLocaleDateString() : "",
      author: undefined,
      category: s.tag || undefined,
      imageUrl,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Stories of Transformation</h1>
            <p className="font-serif text-lg text-muted-foreground">
              Witness how God is working through our programs to transform lives, build hope, and create lasting change
              in our community. Each story represents a life touched by love and empowered for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <StoryCard
                key={i}
                title={item.title}
                excerpt={item.excerpt}
                href={item.href}
                date={item.date}
                author={item.author}
                category={item.category}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            {page > 1 && (
              <a href={`/stories?page=${page - 1}`} className="bg-muted text-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Previous
              </a>
            )}
            {(data || []).length === limit && (
              <a href={`/stories?page=${page + 1}`} className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Next
              </a>
            )}
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <SiteFooter />
    </div>
  )
}
