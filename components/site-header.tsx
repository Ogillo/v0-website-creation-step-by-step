"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "@/components/icons"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/60 shadow-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="KE 258 Lwanda CDC Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-sans font-semibold text-foreground">KE 258 Lwanda CDC</div>
              <div className="font-serif text-xs text-muted-foreground">Child Development Centre</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/about" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              About
            </Link>

            {/* Programs Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                className="px-4 py-2 flex items-center space-x-1 font-serif text-foreground hover:text-primary transition-colors"
              >
                <span>Programs</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {isProgramsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg py-2">
                  <Link
                    href="/programs/child-survival"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted"
                  >
                    Child Survival Intervention
                  </Link>
                  <Link
                    href="/programs/sponsorship"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted"
                  >
                    Child Development through Sponsorship
                  </Link>
                  <Link
                    href="/programs/youth-development"
                    className="block px-4 py-2 font-serif text-sm text-foreground hover:bg-muted"
                  >
                    Youth Development
                  </Link>
                </div>
              )}
            </div>

            <Link href="/get-involved" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              Get Involved
            </Link>
            <Link href="/stories" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              Stories
            </Link>
            <Link href="/gallery" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="px-4 py-2 font-serif text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Donate Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/donate"
              className="btn-primary"
            >
              Donate
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-serif text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="font-serif text-foreground hover:text-primary">
                About
              </Link>
              <Link href="/programs" className="font-serif text-foreground hover:text-primary">
                Programs
              </Link>
              <Link href="/get-involved" className="font-serif text-foreground hover:text-primary">
                Get Involved
              </Link>
              <Link href="/stories" className="font-serif text-foreground hover:text-primary">
                Stories
              </Link>
              <Link href="/gallery" className="font-serif text-foreground hover:text-primary">
                Gallery
              </Link>
              <Link href="/contact" className="font-serif text-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
