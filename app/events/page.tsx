import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getSupabase } from "@/lib/supabase/client"

export default async function EventsPage() {
  const supabase = getSupabase()
  let data: any[] | null = null
  if (supabase) {
    const res = await supabase
      .from("events")
      .select("title, description, event_time, event_date, location, media_path")
      .order("event_date", { ascending: true })
    data = res.data
  }

  const today = new Date()
  const upcoming = (data || []).filter((e: any) => e.event_date && new Date(e.event_date) >= today)
  const past = (data || []).filter((e: any) => e.event_date && new Date(e.event_date) < today).reverse()

  const toPublicUrl = (path?: string) => {
    if (!path) return undefined
    if (!supabase) return undefined
    const { data } = supabase.storage.from("gallery").getPublicUrl(path)
    return data.publicUrl
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Community Events</h1>
            <p className="font-serif text-lg text-muted-foreground">
              Join us for special events, celebrations, and community gatherings that bring our families together and
              showcase the amazing work happening in our programs.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
          <div className="space-y-6">
            {upcoming.map((e: any, i: number) => (
              <div key={i} className="bg-card border border-border rounded-[16px] p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{e.title}</h3>
                    <p className="font-serif text-muted-foreground mb-4">{e.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-serif">
                          {e.event_date ? new Date(e.event_date).toLocaleDateString() : ""}
                        </span>
                      </div>
                      {e.event_time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-serif">{e.event_time}</span>
                        </div>
                      )}
                      {e.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span className="font-serif">{e.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Dialog>
                      <DialogTrigger className="bg-primary text-primary-foreground px-6 py-2 rounded-[10px] font-medium hover:bg-primary/90 transition">
                        Learn More
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-sans text-2xl">{e.title}</DialogTitle>
                          <DialogDescription className="font-serif">{e.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="aspect-video bg-muted rounded-[12px] overflow-hidden">
                            <img src={toPublicUrl(e.media_path) || "/placeholder.svg"} alt={e.title} className="w-full h-full object-cover" />
                          </div>
                          {e.location && (
                            <div className="rounded-[12px] overflow-hidden border">
                              <iframe
                                title="Event Map"
                                src={`https://www.google.com/maps?q=${encodeURIComponent(e.location)}&output=embed`}
                                className="w-full h-64"
                              />
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Recent Events</h2>

          <div className="grid grid-cols-12 gap-6">
            {past.map((e: any, i: number) => (
              <div key={i} className="bg-card rounded-[16px] overflow-hidden col-span-12 md:col-span-6 lg:col-span-4">
                <div className="aspect-video bg-muted">
                  <img
                    src={toPublicUrl(e.media_path) || "/placeholder.svg"}
                    alt={e.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-sans font-semibold text-foreground mb-2">{e.title}</h3>
                  <p className="font-serif text-sm text-muted-foreground max-w-[680px]">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
