import { type NextRequest, NextResponse } from "next/server"

// GET /api/stories/[id] - Fetch a single story
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    console.log("[v0] Fetching story:", id)

    // TODO: Replace with actual database query
    const mockStory = {
      id,
      title: "Grace's Journey to Education",
      excerpt: "How sponsorship changed one girl's life forever",
      content:
        "Grace was just 7 years old when she joined our Child Sponsorship Program. Coming from a family struggling to make ends meet, education seemed like a distant dream. But through the generous support of her sponsor and our partnership with Compassion International, Grace not only completed primary school but is now excelling in secondary school. Her story is a testament to the transformative power of child sponsorship.",
      category: "education",
      imageUrl: "/african-girl-studying.jpg",
      author: "Sarah Kimani",
      date: "2024-01-15",
      featured: true,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    }

    return NextResponse.json({
      success: true,
      data: mockStory,
    })
  } catch (error) {
    console.error("[v0] Error fetching story:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch story" }, { status: 500 })
  }
}

// PUT /api/stories/[id] - Update a story
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await request.json()
    console.log("[v0] Updating story:", id, body)

    // TODO: Validate and update in database
    const updatedStory = {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedStory,
    })
  } catch (error) {
    console.error("[v0] Error updating story:", error)
    return NextResponse.json({ success: false, error: "Failed to update story" }, { status: 500 })
  }
}

// DELETE /api/stories/[id] - Delete a story
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    console.log("[v0] Deleting story:", id)

    // TODO: Delete from database

    return NextResponse.json({
      success: true,
      message: "Story deleted successfully",
    })
  } catch (error) {
    console.error("[v0] Error deleting story:", error)
    return NextResponse.json({ success: false, error: "Failed to delete story" }, { status: 500 })
  }
}
