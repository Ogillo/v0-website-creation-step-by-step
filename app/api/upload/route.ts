import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Upload request received")

    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "general"

    console.log("[v0] File details:", {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      folder,
    })

    if (!file) {
      console.log("[v0] No file provided in request")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Upload to Vercel Blob with organized folder structure
    const filename = `ke258/${folder}/${Date.now()}-${file.name}`

    console.log("[v0] Uploading to Blob with filename:", filename)

    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("[v0] Upload successful:", { url: blob.url, pathname: blob.pathname })

    const responseData = {
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
      pathname: blob.pathname,
    }

    return NextResponse.json(responseData, { status: 200 })
  } catch (error) {
    console.error("[v0] Upload error details:", error instanceof Error ? error.message : String(error))
    console.error("[v0] Full error:", error)
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
