"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Image as ImageIcon, Video, Search, Play } from "@/components/icons"

export default function Gallery() {
  const [filter, setFilter] = useState("all")
  const [mediaType, setMediaType] = useState("all")
  const [selectedMedia, setSelectedMedia] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const galleryItems = [
    {
      id: 1,
      type: "image",
      title: "Children Learning in Classroom",
      category: "education",
      description: "Students engaged in interactive learning session",
      url: "/children-learning-in-kenya-classroom.png",
      date: "2024-02-15",
      tags: ["classroom", "learning", "children"],
    },
    {
      id: 2,
      type: "video",
      title: "Child Sponsorship Impact Story",
      category: "sponsorship",
      description: "Heartwarming story of transformation through sponsorship",
      url: "/placeholder.svg",
      thumbnailUrl: "/placeholder.svg",
      duration: "3:45",
      date: "2024-02-10",
      tags: ["sponsorship", "transformation", "story"],
    },
    {
      id: 3,
      type: "image",
      title: "Community Celebration",
      category: "celebrations",
      description: "Annual community gathering and cultural celebration",
      url: "/children-and-families-in-lwanda-kenya-community.png",
      date: "2024-01-20",
      tags: ["community", "celebration", "culture"],
    },
    {
      id: 4,
      type: "image",
      title: "Computer Training Session",
      category: "education",
      description: "Youth learning essential computer skills",
      url: "/young-adults-in-kenya-leadership-training.png",
      date: "2024-01-15",
      tags: ["computer", "training", "youth", "skills"],
    },
    {
      id: 5,
      type: "video",
      title: "Health Fair Activities",
      category: "community-work",
      description: "Community health fair providing free medical services",
      url: "/placeholder.svg",
      thumbnailUrl: "/placeholder.svg",
      duration: "2:30",
      date: "2024-01-10",
      tags: ["health", "community", "medical"],
    },
    {
      id: 6,
      type: "image",
      title: "Graduation Day 2023",
      category: "celebrations",
      description: "Proud graduates celebrating their achievements",
      url: "/young-woman-in-kenya-graduation-ceremony.png",
      date: "2023-12-10",
      tags: ["graduation", "achievement", "celebration"],
    },
    {
      id: 7,
      type: "image",
      title: "Health Program Support",
      category: "education",
      description: "Teaching sustainable health practices",
      url: "/mother-and-baby-in-kenya-health-program.png",
      date: "2023-11-25",
      tags: ["health", "support", "sustainability"],
    },
    {
      id: 8,
      type: "video",
      title: "Day in the Life at Lwanda CDC",
      category: "sponsorship",
      description: "Follow a typical day at our development center",
      url: "/placeholder.svg",
      thumbnailUrl: "/placeholder.svg",
      duration: "5:20",
      date: "2023-11-15",
      tags: ["daily-life", "center", "activities"],
    },
    {
      id: 9,
      type: "image",
      title: "Volunteer Engagement",
      category: "education",
      description: "Volunteers making a difference in our community",
      url: "/volunteers-working-with-children-in-kenya.png",
      date: "2023-10-30",
      tags: ["volunteers", "engagement", "community"],
    },
    {
      id: 10,
      type: "image",
      title: "Community Service Project",
      category: "community-work",
      description: "Youth participating in community development",
      url: "/young-adults-leading-community-meeting-in-kenya.png",
      date: "2023-10-15",
      tags: ["service", "community", "youth"],
    },
    {
      id: 11,
      type: "video",
      title: "Testimonial from Sarah",
      category: "sponsorship",
      description: "A sponsored child shares her journey and dreams",
      url: "/placeholder.svg",
      thumbnailUrl: "/placeholder.svg",
      duration: "4:15",
      date: "2023-09-20",
      tags: ["testimonial", "child", "dreams"],
    },
    {
      id: 12,
      type: "image",
      title: "Mother and Child Care",
      category: "celebrations",
      description: "Celebrating healthy mothers and children",
      url: "/mother-holding-healthy-baby-in-kenya-clinic.png",
      date: "2023-09-10",
      tags: ["health", "mothers", "children", "care"],
    },
  ]

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter
    const matchesType = mediaType === "all" || item.type === mediaType
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesType && matchesSearch
  })

  const categories = [
    { key: "all", label: "All Categories" },
    { key: "education", label: "Education" },
    { key: "sponsorship", label: "Sponsorship" },
    { key: "celebrations", label: "Celebrations" },
    { key: "community-work", label: "Community Work" },
  ]

  const mediaTypes = [
    { key: "all", label: "All Media" },
    { key: "image", label: "Images" },
    { key: "video", label: "Videos" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-bold mb-6 text-foreground">Gallery</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-muted-foreground">
            Capturing moments of transformation, celebration, and hope in our community development journey.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center space-x-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search gallery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={filter === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(category.key)}
                >
                  {category.label}
                </Button>
              ))}
            </div>

            {/* Media Type Filters */}
            <div className="flex justify-center space-x-2">
              {mediaTypes.map((type) => (
                <Button
                  key={type.key}
                  variant={mediaType === type.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMediaType(type.key)}
                >
                  <span>{type.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedMedia(item)}
                >
                  {/* Media Preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    {item.type === "image" ? (
                      <ImageIcon className="h-12 w-12 text-primary" />
                    ) : (
                      <div className="relative">
                        <Video className="h-12 w-12 text-primary" />
                        <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Overlay with title and type */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.category.replace("-", " ")}
                        </Badge>
                        {item.type === "video" && item.duration && (
                          <Badge variant="outline" className="text-xs text-white border-white">
                            {item.duration}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                      <p className="text-xs opacity-80 mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </div>

                  {/* Media type indicator */}
                  <div className="absolute top-3 right-3">
                    {item.type === "image" ? (
                      <ImageIcon className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                    ) : (
                      <Video className="h-5 w-5 text-white bg-black/50 rounded p-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-sans text-xl font-semibold text-foreground mb-2">No media found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-sans mb-2">500+</div>
              <div className="text-lg">Photos Captured</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">50+</div>
              <div className="text-lg">Video Stories</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">15+</div>
              <div className="text-lg">Years Documented</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-sans mb-2">1000+</div>
              <div className="text-lg">Lives Captured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Viewer Modal */}
      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          {selectedMedia && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {selectedMedia.type === "image" ? (
                  <ImageIcon className="h-16 w-16 text-primary" />
                ) : (
                  <div className="text-center space-y-4">
                    <Video className="h-16 w-16 text-primary mx-auto" />
                    <Button className="bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-2" />
                      Play Video
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-sans font-bold">{selectedMedia.title}</h2>
                  <Badge>{selectedMedia.category.replace("-", " ")}</Badge>
                </div>

                <p className="text-muted-foreground">{selectedMedia.description}</p>

                <div className="flex flex-wrap gap-2">
                  {selectedMedia.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  Captured on {new Date(selectedMedia.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}
