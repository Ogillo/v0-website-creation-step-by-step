import type React from "react"
interface StatCardProps {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ value, label, description, icon }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 text-center">
      {icon && (
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">{icon}</div>
      )}

      <div className="font-sans text-3xl font-bold text-primary mb-2">{value}</div>
      <div className="font-sans font-semibold text-foreground mb-1">{label}</div>

      {description && <p className="font-serif text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
