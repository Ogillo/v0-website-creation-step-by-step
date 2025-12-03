"use client"
import Link from "next/link"
import { useState } from "react"
import { AdminSidebar } from "@/components/admin/UI/AdminSidebar"
import { MobileDrawer } from "@/components/admin/UI/MobileDrawer"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-card">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" aria-label="Open navigation" onClick={() => setOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/" className="text-sm">← Back to Website</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/gallery" className="btn-secondary">Upload image</Link>
            <Link href="/admin/content" className="btn-secondary">Create story</Link>
            <Link href="/admin/content" className="btn-secondary">Create event</Link>
          </div>
        </div>
      </header>
      <div className="flex">
        <aside className="hidden lg:block w-64 border-r bg-[#F5F3FF]">
          <AdminSidebar />
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
      <MobileDrawer open={open} onOpenChange={setOpen}>
        <AdminSidebar onNavigate={() => setOpen(false)} />
      </MobileDrawer>
    </div>
  )
}

