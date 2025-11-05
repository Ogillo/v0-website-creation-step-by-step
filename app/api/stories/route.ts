import { type NextRequest, NextResponse } from "next/server"

// GET /api/stories - Fetch all stories with optional filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    console.log("[v0] Fetching stories with params:", { category, featured, limit })

    // TODO: Replace with actual database query
    // For now, return mock data
    const mockStories = [
      {
        id: "1",
        title: "Grace's Journey to Education",
        excerpt: "How sponsorship changed one girl's life forever",
        content: "Grace was just 7 years old when she joined our Child Sponsorship Program...",
        category: "education",
        imageUrl: "/african-girl-studying.jpg",
        author: "Sarah Kimani",
        date: "2024-01-15",
        featured: true,
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Community Health Initiative Success",
        excerpt: "Our Child Survival Program reaches 500 families",
        content: "Through our partnership with Compassion International...",
        category: "community",
        imageUrl: "/community-health-kenya.jpg",
        author: "Dr. James Omondi",
        date: "2024-01-10",
        featured: true,
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
      },
      {
        id: "3",
        title: "Youth Leadership Training Graduation",
        excerpt: "25 young leaders complete our development program",
        content: "This month, we celebrated the graduation of 25 young people...",
        category: "celebrations",
        imageUrl: "/youth-graduation-kenya.jpg",
        author: "Peter Mwangi",
        date: "2024-01-05",
        featured: false,
        createdAt: "2024-01-05T10:00:00Z",
        updatedAt: "2024-01-05T10:00:00Z",
      },
    ]

    // Apply filters
    let filteredStories = mockStories

    if (category && category !== "all") {
      filteredStories = filteredStories.filter((story) => story.category === category)
    }

    if (featured === "true") {
      filteredStories = filteredStories.filter((story) => story.featured)
    }

    if (limit) {
      filteredStories = filteredStories.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredStories,
      count: filteredStories.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching stories:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch stories" }, { status: 500 })
  }
}

// POST /api/stories - Create a new story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Creating new story:", body)

    // TODO: Validate input and save to database
    const newStory = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newStory,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error creating story:", error)
    return NextResponse.json({ success: false, error: "Failed to create story" }, { status: 500 })
  }
}
