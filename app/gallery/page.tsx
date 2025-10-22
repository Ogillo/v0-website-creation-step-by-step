import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/sections/hero-section"
import Image from "next/image"

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "/children-playing-in-kenya-community-center.png",
      alt: "Children playing in community center",
      category: "Community",
    },
    {
      src: "/children-learning-in-kenya-classroom.png",
      alt: "Children learning in classroom",
      category: "Education",
    },
    {
      src: "/mother-and-baby-in-kenya-health-program.png",
      alt: "Mother and baby in health program",
      category: "Health",
    },
    {
      src: "/sponsored-children-in-kenya-classroom.png",
      alt: "Sponsored children in classroom",
      category: "Sponsorship",
    },
    {
      src: "/young-adults-in-kenya-leadership-training.png",
      alt: "Young adults in leadership training",
      category: "Youth Development",
    },
    {
      src: "/volunteers-working-with-children-in-kenya.png",
      alt: "Volunteers working with children",
      category: "Volunteers",
    },
    {
      src: "/children-and-families-in-lwanda-kenya-community.png",
      alt: "Children and families in community",
      category: "Community",
    },
    {
      src: "/mother-holding-healthy-baby-in-kenya-clinic.png",
      alt: "Mother holding healthy baby",
      category: "Health",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <HeroSection
        title="Photo Gallery"
        subtitle="Moments from our community"
        description="See the faces and stories behind our work. These photos capture the joy, hope, and transformation happening in Lwanda."
        backgroundImage="/children-playing-in-kenya-community-center.png"
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-4">Our Community</h2>
            <p className="font-serif text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore photos from our programs, events, and the vibrant community of Lwanda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square bg-muted cursor-pointer"
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <div className="w-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-sans font-semibold">{image.alt}</p>
                    <p className="font-serif text-sm opacity-90">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
