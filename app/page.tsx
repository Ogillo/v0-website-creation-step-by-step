import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { ProgramCard } from "@/components/ui/program-card"
import { StatCard } from "@/components/ui/stat-card"
import { StoryCard } from "@/components/ui/story-card"
import { Heart, Users, GraduationCap, Baby, Calendar, TrendingUp } from "@/components/icons"

export default function HomePage() {
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
        backgroundImage="/children-playing-in-kenya-community-center.png"
      />

      {/* Impact Statistics */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact Since 2015</h2>
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Our Programs</h2>
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
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Stories of Transformation</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Witness how God is working through our programs to transform lives and build hope in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StoryCard
              title="From Struggle to Success: Mary's Journey"
              excerpt="Through the Child Development Program, Mary overcame challenges to become a community leader and role model for other young women."
              href="/stories/marys-journey"
              date="December 2024"
              category="Child Development"
              imageUrl="/young-woman-in-kenya-graduation-ceremony.png"
            />
            <StoryCard
              title="Building Stronger Families Through CSI"
              excerpt="The Child Survival Intervention program helped the Ochieng family access healthcare and nutrition support during their most vulnerable time."
              href="/stories/ochieng-family"
              date="November 2024"
              category="Child Survival"
              imageUrl="/mother-and-child-at-health-clinic-in-kenya.png"
            />
            <StoryCard
              title="Youth Leadership in Action"
              excerpt="Former program participants are now leading community initiatives and mentoring the next generation of leaders."
              href="/stories/youth-leadership"
              date="October 2024"
              category="Youth Development"
              imageUrl="/young-adults-leading-community-meeting-in-kenya.png"
            />
          </div>

          <div className="text-center mt-12">
            <a
              href="/stories"
              className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <span>Read More Stories</span>
            </a>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Our Partners</h2>
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

      <SiteFooter />
    </div>
  )
}
