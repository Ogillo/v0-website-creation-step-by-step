import { type NextRequest, NextResponse } from "next/server"

// GET /api/events - Fetch all events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    console.log("[v0] Fetching events with params:", { status, category, limit })

    // Mock data
    const mockEvents = [
      {
        id: "1",
        title: "Annual Fundraising Gala",
        description: "Join us for an evening of celebration and giving",
        date: "2024-03-15",
        time: "18:00",
        location: "Lwanda Community Center",
        imageUrl: "/fundraising-gala-kenya.jpg",
        category: "fundraising",
        registrationRequired: true,
        maxAttendees: 200,
        currentAttendees: 87,
        status: "upcoming",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
      },
      {
        id: "2",
        title: "Volunteer Training Workshop",
        description: "Learn how to make a difference in children's lives",
        date: "2024-02-20",
        time: "09:00",
        location: "KE 258 Training Room",
        imageUrl: "/volunteer-training-session.png",
        category: "training",
        registrationRequired: true,
        maxAttendees: 30,
        currentAttendees: 22,
        status: "upcoming",
        createdAt: "2024-01-05T10:00:00Z",
        updatedAt: "2024-01-05T10:00:00Z",
      },
    ]

    let filteredEvents = mockEvents

    if (status && status !== "all") {
      filteredEvents = filteredEvents.filter((event) => event.status === status)
    }

    if (category && category !== "all") {
      filteredEvents = filteredEvents.filter((event) => event.category === category)
    }

    if (limit) {
      filteredEvents = filteredEvents.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredEvents,
      count: filteredEvents.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching events:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 })
  }
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Creating new event:", body)

    const newEvent = {
      id: Date.now().toString(),
      ...body,
      currentAttendees: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(
      {
        success: true,
        data: newEvent,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error creating event:", error)
    return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 })
  }
}
