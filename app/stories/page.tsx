import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StoryCard } from "@/components/ui/story-card"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page Header */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">Stories of Transformation</h1>
            <p className="font-serif text-lg text-muted-foreground">
              Witness how God is working through our programs to transform lives, build hope, and create lasting change
              in our community. Each story represents a life touched by love and empowered for the future.
            </p>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StoryCard
              title="From Struggle to Success: Mary's Journey"
              excerpt="Through the Child Development Program, Mary overcame challenges to become a community leader and role model for other young women in Lwanda."
              href="/stories/marys-journey"
              date="December 2024"
              author="Program Staff"
              category="Child Development"
              imageUrl="/young-woman-in-kenya-graduation-ceremony.png"
            />

            <StoryCard
              title="Building Stronger Families Through CSI"
              excerpt="The Child Survival Intervention program helped the Ochieng family access healthcare and nutrition support during their most vulnerable time."
              href="/stories/ochieng-family"
              date="November 2024"
              author="Health Coordinator"
              category="Child Survival"
              imageUrl="/mother-and-child-at-health-clinic-in-kenya.png"
            />

            <StoryCard
              title="Youth Leadership in Action"
              excerpt="Former program participants are now leading community initiatives and mentoring the next generation of leaders in Lwanda."
              href="/stories/youth-leadership"
              date="October 2024"
              author="Youth Coordinator"
              category="Youth Development"
              imageUrl="/young-adults-leading-community-meeting-in-kenya.png"
            />

            <StoryCard
              title="A Mother's Gratitude: Sarah's Story"
              excerpt="Sarah shares how the Child Survival program supported her through pregnancy and helped her baby thrive in the crucial early months."
              href="/stories/sarahs-story"
              date="September 2024"
              author="CSI Team"
              category="Child Survival"
              imageUrl="/mother-holding-healthy-baby-in-kenya-clinic.png"
            />

            <StoryCard
              title="Education Opens Doors: James's Achievement"
              excerpt="With sponsorship support, James excelled in his studies and is now pursuing higher education to become a teacher in his community."
              href="/stories/james-achievement"
              date="August 2024"
              author="Education Coordinator"
              category="Child Development"
              imageUrl="/young-man-with-books-in-kenya-school.png"
            />

            <StoryCard
              title="Community Garden Brings Hope"
              excerpt="How our nutrition program's community garden is providing fresh food and teaching valuable skills to families in Lwanda."
              href="/stories/community-garden"
              date="July 2024"
              author="Nutrition Team"
              category="Community Impact"
              imageUrl="/community-garden-with-vegetables-in-kenya.png"
            />
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      <NewsletterSignup />
      <SiteFooter />
    </div>
  )
}
