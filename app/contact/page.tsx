"use client"
import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getSupabase } from "@/lib/supabase/client"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus(null)
    const supabase = getSupabase()
    if (!supabase) {
      setStatus("Configuration error. Please try again later.")
      setSubmitting(false)
      return
    }
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    })
    if (error) {
      setStatus("Failed to send. Please try again.")
    } else {
      setStatus("Message sent successfully.")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Contact Us"
        subtitle="We'd love to hear from you"
        description="Have questions about our programs, want to volunteer, or need more information? Get in touch with our team."
        backgroundImage="/children-playing-in-kenya-community-center.png"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="font-sans text-3xl font-bold text-foreground mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Location</h3>
                    <p className="font-serif text-muted-foreground">Lwanda, Kenya</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Email</h3>
                    <p className="font-serif text-muted-foreground">{"{contact@ke258lwanda.org}"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Phone</h3>
                    <p className="font-serif text-muted-foreground">{"{+254 XXX XXX XXX}"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-1">Office Hours</h3>
                    <p className="font-serif text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="font-sans text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-sans font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-foreground mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-sans font-medium text-foreground mb-2">Message</label>
                  <textarea
                    placeholder="Your message..."
                    rows={5}
                    className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-sans font-semibold hover:opacity-90 transition-opacity"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
                {status && <p className="text-center font-serif text-sm text-muted-foreground">{status}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Have More Questions?"
        description="Check out our FAQ page or reach out to our team directly. We're here to help!"
        primaryCta={{ text: "View FAQ", href: "/faq" }}
        secondaryCta={{ text: "Get Involved", href: "/get-involved" }}
      />

      <SiteFooter />
    </div>
  )
}
