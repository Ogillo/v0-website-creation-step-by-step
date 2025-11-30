import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  subtitle: string
  description?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-white/20" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-6xl font-bold text-gray-900 mb-6">{title}</h1>

            <p className="font-serif text-xl md:text-2xl text-gray-900 mb-8">{subtitle}</p>

            {description && (
              <p className="font-serif text-lg text-gray-900 mb-12 max-w-2xl mx-auto">{description}</p>
            )}

            <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
              {primaryCta && (
                <Button asChild className="btn-primary mt-0">
                  <Link href={primaryCta.href || "#sponsor"}>{primaryCta.text}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild className="btn-secondary mt-0">
                  <Link href={secondaryCta.href || "#story"}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
