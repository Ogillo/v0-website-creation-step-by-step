import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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
    <section className="relative py-20 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30" />
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center">
          <div className="max-w-none mx-auto text-center animate-fadeIn">
            <h1 className="font-sans text-4xl md:text-[64px] font-bold text-white mb-6">{title}</h1>

            <p className="font-serif text-[20px] text-white mb-8">{subtitle}</p>

            {description && (
              <p className="font-serif text-lg text-white mb-12 max-w-[680px] mx-auto">{description}</p>
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
