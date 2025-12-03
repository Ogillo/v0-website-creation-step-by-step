export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="p-4 space-y-2">
      <a className="block px-3 py-2 rounded hover:bg-muted" href="/admin" onClick={onNavigate}>Dashboard</a>
      <a className="block px-3 py-2 rounded hover:bg-muted" href="/admin/gallery" onClick={onNavigate}>Gallery</a>
      <a className="block px-3 py-2 rounded hover:bg-muted" href="/admin/content" onClick={onNavigate}>Content</a>
    </nav>
  )
}

