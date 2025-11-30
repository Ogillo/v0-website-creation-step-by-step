import type React from "react"
import Link from "next/link"
import { ArrowRight } from "@/components/icons"

interface ProgramCardProps {
  title: string
  description: string
  href: string
  icon?: React.ReactNode
  stats?: string
}

export function ProgramCard({ title, description, href, icon, stats }: ProgramCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      {icon && <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">{icon}</div>}

      <h3 className="font-sans text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="font-serif text-muted-foreground mb-4">{description}</p>

      {stats && (
        <div className="bg-muted rounded-lg p-3 mb-4">
          <span className="font-sans text-sm font-medium text-foreground">{stats}</span>
        </div>
      )}

      <Link
        href={href}
        className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
      >
        <span className="font-serif font-medium">Learn More</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
