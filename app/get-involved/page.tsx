"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { Heart, Users, Briefcase, Clock, Globe, Shield, BookOpen, Hand as Hands } from "lucide-react"
import Link from "next/link"

export default function GetInvolvedPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Get Involved"
        subtitle="Join us in transforming lives and building hope in Lwanda"
        description="There are many meaningful ways to support our mission and make a lasting impact in the lives of vulnerable children and families. Find the perfect way for you to get involved."
        backgroundImage="/volunteers-working-with-children-in-kenya.png"
      />

      {/* Volunteer Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Volunteer Opportunities</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Make a direct impact by sharing your time, skills, and passion with our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Education Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Help with tutoring, teaching assistance, library support, and educational activities.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 4-6 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Teaching experience preferred
                </p>
              </div>
              <Link href="/contact?reason=education" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Healthcare Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Assist with health screenings, nutrition programs, and community health education.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 6-8 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Medical or nursing background
                </p>
              </div>
              <Link href="/contact?reason=healthcare" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Youth Mentoring</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Mentor young adults in leadership development, vocational training, and life skills.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 3-4 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Leadership or professional experience
                </p>
              </div>
              <Link href="/contact?reason=mentoring" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Administrative Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Help with office tasks, data entry, communications, and program coordination.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> Flexible schedule
                </p>
                <p>
                  <strong>Skills Needed:</strong> Computer skills, organization
                </p>
              </div>
              <Link href="/contact?reason=admin" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Hands className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Skills Training</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Teach vocational skills like tailoring, carpentry, computer skills, or agriculture.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> 2-3 hours per week
                </p>
                <p>
                  <strong>Skills Needed:</strong> Specific trade expertise
                </p>
              </div>
              <Link href="/contact?reason=skills" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-3">Event Support</h3>
              <p className="font-serif text-muted-foreground mb-4">
                Help organize and run special events, celebrations, and community gatherings.
              </p>
              <div className="text-sm text-muted-foreground mb-4">
                <p>
                  <strong>Time Commitment:</strong> Event-based
                </p>
                <p>
                  <strong>Skills Needed:</strong> Event planning experience helpful
                </p>
              </div>
              <Link href="/contact?reason=events" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Get Involved */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">Other Ways to Support</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Not everyone can volunteer on-site, but there are many other meaningful ways to support our mission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Prayer Partnership</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Join our prayer team and receive regular prayer requests for our children, families, and programs.
              </p>
              <Link href="/contact?reason=prayer" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Join Prayer Team
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Church Partnership</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Connect your church or organization with our ministry for ongoing partnership and support.
              </p>
              <Link href="/contact?reason=church" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Partner with Us
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Advocacy</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Spread awareness about our work and advocate for vulnerable children in your community.
              </p>
              <Link href="/contact?reason=advocacy" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Become Advocate
              </Link>
            </div>

            <div className="bg-card rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Corporate Support</h3>
              <p className="font-serif text-muted-foreground mb-6">
                Partner with us through corporate sponsorship, employee volunteering, or in-kind donations.
              </p>
              <Link href="/contact?reason=corporate" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:opacity-90 transition">
                Corporate Info
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground mb-4">How to Apply</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Our volunteer application process ensures the safety of our children while matching your skills with our
              needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                1
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Submit Application</h3>
              <p className="font-serif text-muted-foreground">
                Complete our volunteer application form with your background, skills, and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                2
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Background Check</h3>
              <p className="font-serif text-muted-foreground">
                All volunteers undergo background screening to ensure child safety and protection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-sans font-bold text-xl">
                3
              </div>
              <h3 className="font-sans text-xl font-semibold text-foreground mb-4">Orientation & Training</h3>
              <p className="font-serif text-muted-foreground">
                Attend orientation and receive training specific to your volunteer role and our safeguarding policies.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-sans text-lg font-semibold text-foreground mb-3">Child Protection Commitment</h3>
              <p className="font-serif text-muted-foreground">
                All volunteers must agree to our child protection and safeguarding policies. The safety and dignity of
                our children is our highest priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Make a Difference?"
        description="Join our community of volunteers, partners, and supporters who are transforming lives in Lwanda. Every contribution matters."
        primaryCta={{ text: "Apply to Volunteer", href: "/contact" }}
        secondaryCta={{ text: "Donate Instead", href: "/donate" }}
        variant="primary"
      />

      <NewsletterSignup />
      <SiteFooter />
    </div>
  )
}
