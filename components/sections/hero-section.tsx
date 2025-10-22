import { Button } from "@/components/ui/button"

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
          <div className="absolute inset-0 bg-background/60" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-bold text-foreground mb-6">{title}</h1>

          <p className="font-serif text-xl md:text-2xl text-muted-foreground mb-8">{subtitle}</p>

          {description && (
            <p className="font-serif text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">{description}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                {primaryCta.text}
              </Button>
            )}
            {secondaryCta && (
              <Button size="lg" variant="outline">
                {secondaryCta.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
