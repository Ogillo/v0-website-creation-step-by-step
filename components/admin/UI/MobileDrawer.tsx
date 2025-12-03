"use client"
import { ReactNode } from "react"

export function MobileDrawer({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: ReactNode }) {
  return open ? (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/30" onClick={() => onOpenChange(false)} aria-label="Close navigation overlay" />
      <div className="absolute top-0 left-0 h-full w-80 bg-[#F5F3FF] border-r p-4" role="document">{children}</div>
    </div>
  ) : null
}
