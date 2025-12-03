import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { StatCard } from "@/components/ui/stat-card"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Baby, Heart, Stethoscope, Apple, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function ChildSurvivalPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Child Survival Intervention"
        subtitle="Supporting mothers and children through the most critical early years"
        description="Our Child Survival Intervention program provides comprehensive support from pregnancy through age 5, ensuring healthy development during the most vulnerable period of life."
        backgroundImage="/mother-and-baby-in-kenya-health-program.png"
      />

      {/* About */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
              Program Overview
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif text-lg text-muted-foreground mb-6 max-w-[680px] mx-auto">
                The Child Survival Intervention (CSI) program focuses on the critical window from pregnancy through age
                5, when proper nutrition, healthcare, and early childhood development have the greatest impact on a
                child's future. We work closely with mothers and families to ensure every child has the best possible
                start in life.
              </p>
              <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
                Through partnerships with local health facilities and trained community health workers, we provide
                comprehensive support that addresses both immediate needs and long-term development goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Program Impact</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              See how our Child Survival Intervention program is making a difference in the lives of mothers and
              children.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="50+"
              label="Mothers Supported"
              description="Receiving prenatal and postnatal care"
              icon={<Heart className="w-6 h-6 text-primary" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="100+"
              label="Children Enrolled"
              description="Ages 0-5 in our program"
              icon={<Baby className="w-6 h-6 text-primary" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="95%"
              label="Health Improvement"
              description="Children meeting growth milestones"
              icon={<Stethoscope className="w-6 h-6 text-primary" />}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <StatCard
              value="100%"
              label="Nutrition Support"
              description="Families receiving nutrition education"
              icon={<Apple className="w-6 h-6 text-primary" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Program Components</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              Our comprehensive approach addresses all aspects of early childhood development and maternal health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Healthcare Services</h3>
              <p className="font-serif text-muted-foreground">
                Regular health checkups, immunizations, growth monitoring, and treatment for common childhood illnesses.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Apple className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Nutrition Support</h3>
              <p className="font-serif text-muted-foreground">
                Nutrition education, supplementary feeding programs, and support for breastfeeding mothers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Early Learning</h3>
              <p className="font-serif text-muted-foreground">
                Age-appropriate learning activities, play-based education, and school readiness preparation.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Maternal Care</h3>
              <p className="font-serif text-muted-foreground">
                Prenatal care, safe delivery support, postnatal care, and family planning education.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Family Support</h3>
              <p className="font-serif text-muted-foreground">
                Parenting education, family counseling, and support groups for mothers and caregivers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Baby className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Child Protection</h3>
              <p className="font-serif text-muted-foreground">
                Safety education, child protection training, and advocacy for children's rights and wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-8">Success Story</h2>
            <div className="bg-background border border-border rounded-lg p-8">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-6"></div>
              <blockquote className="font-serif text-lg text-muted-foreground mb-6 italic">
                "When I was pregnant with my first child, I was scared and didn't know what to expect. The CSI program
                connected me with a community health worker who guided me through my pregnancy and taught me how to care
                for my baby. Now my daughter is healthy and thriving, and I'm helping other mothers in our community."
              </blockquote>
              <cite className="font-sans font-semibold text-foreground">- Sarah, CSI Program Participant</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-4">How You Can Help</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-[680px] mx-auto">
              There are many ways to support our Child Survival Intervention program and help give children the best
              start in life.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Monthly Giving</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Support ongoing healthcare and nutrition programs with a monthly donation.
              </p>
              <Link href="/get-involved" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Give Monthly
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Volunteer</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Join our team as a community health worker or program assistant.
              </p>
              <Link href="/get-involved" className="bg-secondary text-secondary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Volunteer
              </Link>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Medical Support</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Healthcare professionals can provide training and medical expertise.
              </p>
              <Link href="/get-involved" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Support Child Survival"
        description="Help us give every child the healthy start they deserve. Your support provides critical healthcare, nutrition, and early development services."
        primaryCta={{ text: "Donate Now", href: "/donate" }}
        variant="primary"
      />

      <SiteFooter />
    </div>
  )
}
