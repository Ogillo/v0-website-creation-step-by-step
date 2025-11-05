import { type NextRequest, NextResponse } from "next/server"

// POST /api/contact - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    console.log("[v0] Contact form submission:", { name, email, subject })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // TODO: Save to database
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      subject,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    }

    // TODO: Send email notification to admin

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us. We will respond within 24 hours.",
        data: submission,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error processing contact form:", error)
    return NextResponse.json({ success: false, error: "Failed to submit contact form" }, { status: 500 })
  }
}
