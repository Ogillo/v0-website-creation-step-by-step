import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { ProgramCard } from "@/components/ui/program-card"
import { StatCard } from "@/components/ui/stat-card"
import { StoryCard } from "@/components/ui/story-card"
import { Heart, Users, GraduationCap, Baby, Calendar, TrendingUp } from "@/components/icons"
import { getSupabase } from "@/lib/supabase/client"

export default async function HomePage() {
  const supabase = getSupabase()
  let data: any[] | null = null
  if (supabase) {
    const res = await supabase
      .from("stories")
      .select("title, content, story_date, tag, images")
      .order("story_date", { ascending: false })
      .limit(3)
    data = res.data
  }

  const heroBucket = process.env.NEXT_PUBLIC_HERO_BUCKET || "hero"
  let heroImageUrl: string | undefined = undefined
  if (supabase) {
    const searchBases = ["", "ke258", "ke258/hero"]
    for (const base of searchBases) {
      const { data: files } = await supabase.storage.from(heroBucket).list(base, { recursive: true })
      const match = (files || []).find((f: any) => f.name && (f.name === "hero_image" || f.name.startsWith("hero_image.")))
      if (match) {
        const path = base ? `${base}/${match.name}` : match.name
        heroImageUrl = supabase.storage.from(heroBucket).getPublicUrl(path).data.publicUrl
        break
      }
    }
  }

  const stories = (data || []).map((s: any) => {
    const img = Array.isArray(s.images) && s.images.length > 0 ? s.images[0] : undefined
    const imageUrl = supabase && img ? supabase.storage.from("gallery").getPublicUrl(img).data.publicUrl : undefined
    return {
      title: s.title,
      excerpt: typeof s.content === "string" ? s.content.slice(0, 160) : "",
      href: "/stories",
      date: s.story_date ? new Date(s.story_date).toLocaleDateString() : "",
      category: s.tag || undefined,
      imageUrl,
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <HeroSection
        title="Empowering Children, Transforming Communities"
        subtitle="Building hope and opportunity for vulnerable children in Lwanda, Kenya"
        description="Through faith-based programs in partnership with Compassion International and FGCK, we're raising a God-fearing generation equipped to break the cycle of poverty."
        primaryCta={{ text: "Sponsor a Child", href: "/programs/sponsorship" }}
        secondaryCta={{ text: "Learn Our Story", href: "/about" }}
        backgroundImage={heroImageUrl}
      />

      {/* Impact Statistics */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Impact Since 2015</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              See how God is working through our community to transform lives and build hope.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              value="{# Children Supported}"
              label="Children Supported"
              description="Through our three core programs"
              icon={<Heart className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="9"
              label="Years of Service"
              description="Since our founding in 2015"
              icon={<Calendar className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="3"
              label="Core Programs"
              description="Comprehensive child development"
              icon={<GraduationCap className="w-6 h-6 text-primary" />}
            />
            <StatCard
              value="100+"
              label="Families Reached"
              description="Building stronger communities"
              icon={<Users className="w-6 h-6 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Programs</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Three comprehensive ministries working together to empower children from birth through young adulthood.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProgramCard
              title="Child Survival Intervention"
              description="Supporting mothers and children from pregnancy through age 5 with healthcare, nutrition, and early childhood development."
              href="/programs/child-survival"
              icon={<Baby className="w-6 h-6 text-primary" />}
              stats="Ages 0-5 • Health & Nutrition Focus"
            />
            <ProgramCard
              title="Child Development through Sponsorship"
              description="Comprehensive development for children ages 3-18 through education, spiritual growth, and life skills training."
              href="/programs/sponsorship"
              icon={<GraduationCap className="w-6 h-6 text-primary" />}
              stats="Ages 3-18 • Education & Spiritual Growth"
            />
            <ProgramCard
              title="Youth Development"
              description="Empowering young adults with vocational training, leadership skills, and opportunities for community impact."
              href="/programs/youth-development"
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              stats="Ages 18+ • Leadership & Skills Training"
            />
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Stories of Transformation</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Witness how God is working through our programs to transform lives and build hope in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <StoryCard
                key={i}
                title={s.title}
                excerpt={s.excerpt}
                href={s.href}
                date={s.date}
                category={s.category}
                imageUrl={s.imageUrl}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/stories" className="btn-primary">
              Read More Stories
            </a>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Our Partners</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Working together with trusted organizations to maximize our impact and ensure sustainable change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Compassion International</h3>
              <p className="font-serif text-muted-foreground">
                Our primary partner in child development, providing resources, training, and global support for our
                programs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Full Gospel Churches of Kenya</h3>
              <p className="font-serif text-muted-foreground">
                Our local church assembly provides spiritual foundation, community connection, and ongoing pastoral
                support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CtaBanner
        title="Join Us in Transforming Lives"
        description="Every child deserves hope, opportunity, and the chance to reach their God-given potential. Your support makes transformation possible."
        primaryCta={{ text: "Donate Now", href: "/donate" }}
        secondaryCta={{ text: "Get Involved", href: "/get-involved" }}
        variant="primary"
      />

      {/* Newsletter Signup */}
      <NewsletterSignup />

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 text-center">Reach Out</h2>
            <p className="font-serif text-muted-foreground">We would love to hear from you. Send us a message.</p>
          </div>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="contact-name">Name</label>
              <input id="contact-name" type="text" className="w-full mt-1 px-4 py-3 border border-border rounded-lg bg-input" aria-label="Name" />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="contact-email">Email</label>
              <input id="contact-email" type="email" className="w-full mt-1 px-4 py-3 border border-border rounded-lg bg-input" aria-label="Email" />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="contact-message">Message</label>
              <textarea id="contact-message" rows={5} className="w-full mt-1 px-4 py-3 border border-border rounded-lg bg-input" aria-label="Message" />
            </div>
            <div className="text-center">
              <button type="submit" className="btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
