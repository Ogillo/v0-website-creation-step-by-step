import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Heart, Target, Eye, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Our Story"
        subtitle="Empowering vulnerable children in Lwanda, Kenya since 2015"
        description="KE 258 Lwanda Child Development Centre exists to see that vulnerable needy children in the community are empowered socially, economically and physically to release them from poverty in Jesus' name."
        backgroundImage="/children-and-families-in-lwanda-kenya-community.png"
      />

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Our Beginning</h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6">
                KE 258 FGCK Lwanda Child Development Centre started in 2015 under FGCK Lwanda Local Church Assembly in
                partnership with Compassion International. What began as a vision to serve vulnerable children in our
                community has grown into a comprehensive ministry touching hundreds of lives.
              </p>
              <p className="font-serif text-lg text-muted-foreground mb-6">
                We began with the Child Development through Sponsorship Program and have since expanded to include three
                core ministries that address the holistic needs of children and families from pregnancy through young
                adulthood.
              </p>
              <p className="font-serif text-lg text-muted-foreground">
                Our work is rooted in faith, driven by love, and sustained by the generous support of sponsors,
                partners, and community members who believe every child deserves hope and opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Leadership Team</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated leaders committed to serving our community and empowering the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"{Director Name}"}</h3>
              <p className="font-serif text-primary font-medium mb-3">Executive Director</p>
              <p className="font-serif text-sm text-muted-foreground">
                Leading our mission with passion and dedication to child development.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"{Program Manager Name}"}</h3>
              <p className="font-serif text-primary font-medium mb-3">Program Manager</p>
              <p className="font-serif text-sm text-muted-foreground">
                Overseeing daily operations and program implementation.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">{"{Pastor Name}"}</h3>
              <p className="font-serif text-primary font-medium mb-3">Spiritual Coordinator</p>
              <p className="font-serif text-sm text-muted-foreground">
                Providing spiritual guidance and pastoral care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partnerships</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Strong partnerships enable us to provide comprehensive support and sustainable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-primary" />
              </div>
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-4">Compassion International</h3>
              <p className="font-serif text-muted-foreground">
                Our primary partner providing resources, training, and global support. Through Compassion's child
                sponsorship model, we're able to offer comprehensive development programs that address the physical,
                emotional, social, and spiritual needs of children.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-secondary" />
              </div>
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-4">Full Gospel Churches of Kenya</h3>
              <p className="font-serif text-muted-foreground">
                Operating under FGCK Lwanda Local Church Assembly, we benefit from strong spiritual foundation,
                community connections, and ongoing pastoral support. This partnership ensures our programs are deeply
                rooted in faith and community values.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Partner With Us"
        description="Join us in our mission to empower vulnerable children and transform communities through faith-based development programs."
        primaryCta={{ text: "Get Involved", href: "/get-involved" }}
        secondaryCta={{ text: "Contact Us", href: "/contact" }}
      />

      <SiteFooter />
    </div>
  )
}
