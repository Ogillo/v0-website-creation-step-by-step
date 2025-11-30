import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CtaBannerProps {
  title: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  variant?: "default" | "primary" | "secondary"
}

export function CtaBanner({ title, description, primaryCta, secondaryCta, variant = "default" }: CtaBannerProps) {
  const bgClass = {
    default: "bg-card",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
  }[variant]

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold mb-6">{title}</h2>
          <p className="font-serif text-lg mb-8 opacity-90">{description}</p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link href={primaryCta.href || "#sponsor"}>{primaryCta.text}</Link>
            </Button>
            {secondaryCta && (
              <Button asChild className="btn-primary">
                <Link href={secondaryCta.href || "#story"}>{secondaryCta.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
