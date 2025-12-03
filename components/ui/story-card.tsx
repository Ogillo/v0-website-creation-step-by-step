import Link from "next/link"
import { Calendar } from "@/components/icons"

interface StoryCardProps {
  title: string
  excerpt: string
  href: string
  date: string
  author?: string
  imageUrl?: string
  category?: string
}

export function StoryCard({ title, excerpt, href, date, author, imageUrl, category }: StoryCardProps) {
  return (
    <article className="bg-card border border-border rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="bg-muted">
          <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-64 object-cover" />
        </div>
      )}

      <div className="p-6">
        {category && (
          <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-[10px] text-xs font-medium mb-3">
            {category}
          </span>
        )}

        <h3 className="font-sans text-xl font-semibold text-foreground mb-3 line-clamp-2">
          <Link href={href} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </h3>

        <p className="font-serif text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="font-serif">{date}</span>
            </div>
          </div>

          <Link href={href} className="font-serif font-medium text-primary hover:text-primary/80 transition-colors">
            Read More
          </Link>
        </div>
      </div>
    </article>
  )
}
