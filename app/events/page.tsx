import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

export default function EventsPage() {
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
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                    Annual Child Development Celebration
                  </h3>
                  <p className="font-serif text-muted-foreground mb-4">
                    Join us for our annual celebration showcasing the achievements of our sponsored children, featuring
                    performances, testimonies, and community fellowship.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-serif">March 15, 2025</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-serif">2:00 PM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-serif">FGCK Lwanda Church</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-2">
                    Youth Skills Training Workshop
                  </h3>
                  <p className="font-serif text-muted-foreground mb-4">
                    A hands-on workshop for youth participants focusing on vocational skills, entrepreneurship, and
                    leadership development.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-serif">February 28, 2025</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-serif">9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span className="font-serif">Youth Ages 18-25</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-sans text-xl font-semibold text-foreground mb-2">Community Health Fair</h3>
                  <p className="font-serif text-muted-foreground mb-4">
                    Free health screenings, nutrition education, and wellness resources for families in our Child
                    Survival Intervention program.
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-serif">February 14, 2025</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-serif">8:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-serif">Community Center</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-sans text-3xl font-bold text-foreground mb-8">Recent Events</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/children-performing-at-kenya-community-event.png"
                  alt="Children performing at community celebration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans font-semibold text-foreground mb-2">Christmas Celebration 2024</h3>
                <p className="font-serif text-sm text-muted-foreground">
                  Our annual Christmas celebration brought joy and gifts to over 200 children and families.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/graduation-ceremony-kenya-children.png"
                  alt="Graduation ceremony"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans font-semibold text-foreground mb-2">Youth Graduation Ceremony</h3>
                <p className="font-serif text-sm text-muted-foreground">
                  Celebrating 25 youth who completed their vocational training programs.
                </p>
              </div>
            </div>

            <div className="bg-card rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted">
                <img
                  src="/community-garden-harvest-kenya.png"
                  alt="Community garden harvest"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-sans font-semibold text-foreground mb-2">Harvest Festival</h3>
                <p className="font-serif text-sm text-muted-foreground">
                  Celebrating the success of our community garden and nutrition programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
