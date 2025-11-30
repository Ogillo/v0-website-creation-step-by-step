"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, Video, Search, Play } from "@/components/icons"
import { getSupabase } from "@/lib/supabase/client"

export default function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [items, setItems] = useState<{ title: string; url: string; path: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const supabase = getSupabase()
        if (!supabase) throw new Error("Supabase not configured")
        const bucket = process.env.NEXT_PUBLIC_GALLERY_BUCKET || "gallery"
        const { data, error } = await supabase.storage.from(bucket).list("", { recursive: true })
        if (error) throw error
        const mapped = (data || []).filter((f) => f.name).map((f) => {
          const url = supabase.storage.from(bucket).getPublicUrl(f.name).data.publicUrl
          return { title: f.name, url, path: f.name }
        })
        setItems(mapped)
      } catch (err) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchImages()
  }, [])

  const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const categories: any[] = []

  const mediaTypes: any[] = []

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-bold mb-6 text-foreground">Gallery</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-muted-foreground">
            Capturing moments of transformation, celebration, and hope in our community development journey.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center space-x-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="text-center text-sm text-muted-foreground">Images load dynamically from Supabase Storage.</div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Loading gallery...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.path}
                  className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedMedia({ type: "image", title: item.title, url: item.url, date: "" })}
                >
                  {/* Media Preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-primary" />
                  </div>

                  {/* Overlay with title and type */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                    </div>
                  </div>

                  {/* Media type indicator */}
                  <div className="absolute top-3 right-3">
                    <ImageIcon className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">No media found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-sans mb-2">500+</div>
              <div className="text-lg">Photos Captured</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">50+</div>
              <div className="text-lg">Video Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">15+</div>
              <div className="text-lg">Years Documented</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">1000+</div>
              <div className="text-lg">Lives Captured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Viewer Modal */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {selectedMedia && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {selectedMedia.type === "image" ? (
                  <ImageIcon className="h-16 w-16 text-primary" />
                ) : (
                  <div className="text-center space-y-4">
                    <Video className="h-16 w-16 text-primary mx-auto" />
                    <Button className="bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-2" />
                      Play Video
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-sans font-bold">{selectedMedia.title}</h2>
                  <Badge>{selectedMedia.category.replace("-", " ")}</Badge>
                </div>

                <p className="text-muted-foreground">{selectedMedia.description}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Captured on {new Date(selectedMedia.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}
