import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Target, Eye, Users } from "lucide-react"
import { getHeroImage } from "@/lib/hero"

export default async function AboutPage() {
  const heroUrl = await getHeroImage("about", "/children-and-families-in-lwanda-kenya-community.png")

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Our Story"
        subtitle="Empowering vulnerable children in Lwanda, Kenya since 2015"
        description="KE 258 Lwanda Child Development Centre exists to see that vulnerable needy children in the community are empowered socially, economically and physically to release them from poverty in Jesus' name."
        backgroundImage={heroUrl}
      />

      {/* Our Story */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">Our Beginning</h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                KE 258 FGCK Lwanda Child Development Centre started in 2015 under FGCK Lwanda Local Church Assembly in
                partnership with Compassion International. What began as a vision to serve vulnerable children in our
                community has grown into a comprehensive ministry touching hundreds of lives.
              </p>
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                We began with the Child Development through Sponsorship Program and have since expanded to include three
                core ministries that address the holistic needs of children and families from pregnancy through young
                adulthood.
              </p>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Our work is rooted in faith, driven by love, and sustained by the generous support of sponsors,
                partners, and community members who believe every child deserves hope and opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="font-serif text-muted-foreground">
                KE258 exists to see that vulnerable needy children in the community are empowered socially, economically
                and physically to release them from poverty in Jesus' name and are raised to be a God-fearing
                generation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="font-serif text-muted-foreground">
                A community with morally and spiritually upright generation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-foreground mb-4">Our Values</h3>
              <ul className="font-serif text-muted-foreground space-y-2">
                <li>• Integrity</li>
                <li>• Teamwork</li>
                <li>• Excellence</li>
                <li>• Servant Leadership</li>
                <li>• Commitment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Dedicated leaders committed to serving our community and empowering the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-8xl mx-auto">
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"Fredrick Odiwuor Mwenje"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Project Director"}</p>
            </div>
             <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"MOses Ojwang'"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Project Accountant"}</p>
            </div>
             <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"Rev. Samson Otare"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Project Patron/Pastor"}</p>
            </div>
             <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"Magaret Christine"}</h3>
              <p className="text-sm text-muted-foreground mb-4">{"Project Social Worker"}</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
