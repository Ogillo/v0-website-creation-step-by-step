import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">KE</span>
              </div>
              <div>
                <div className="font-sans font-semibold text-foreground">KE 258 Lwanda CDC</div>
                <div className="font-serif text-sm text-muted-foreground">Child Development Centre</div>
              </div>
            </div>
            <p className="font-serif text-muted-foreground mb-4 max-w-md">
              Empowering vulnerable children in Lwanda, Kenya through faith-based programs in partnership with
              Compassion International and Full Gospel Churches of Kenya.
            </p>

            {/* Partnership Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="bg-background border border-border rounded-lg px-3 py-2">
                <span className="font-serif text-sm text-muted-foreground">In partnership with</span>
                <div className="font-sans font-medium text-foreground">Compassion International</div>
              </div>
              <div className="bg-background border border-border rounded-lg px-3 py-2">
                <span className="font-serif text-sm text-muted-foreground">Under</span>
                <div className="font-sans font-medium text-foreground">FGCK Lwanda</div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/compassion-international-logo.png"
                  alt="Compassion International"
                  width={120}
                  height={120}
                  className="h-20 w-auto object-contain"
                />
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-semibold text-foreground mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/programs" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                Our Programs
              </Link>
              <Link
                href="/get-involved"
                className="font-serif text-muted-foreground hover:text-primary transition-colors"
              >
                Get Involved
              </Link>
              <Link href="/stories" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                Stories
              </Link>
              <Link href="/events" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/reports" className="font-serif text-muted-foreground hover:text-primary transition-colors">
                Reports
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans font-semibold text-foreground mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <span className="font-serif text-muted-foreground text-sm">Lwanda, Kenya</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="font-serif text-muted-foreground text-sm">{"{Phone Number}"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="font-serif text-muted-foreground text-sm">{"{Contact Email}"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-serif text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 KE 258 Lwanda Child Development Centre. All rights reserved.
          </p>
          <nav className="flex space-x-6">
            <Link href="/privacy" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/safeguarding" className="font-serif text-sm text-muted-foreground hover:text-primary">
              Safeguarding
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
