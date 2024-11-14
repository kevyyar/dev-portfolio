import { mkdir, writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const publicPath = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(publicPath, { recursive: true });
    } catch (error) {
      console.error("Error creating uploads directory:", error);
    }

    // Sanitize filename and ensure unique name
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a safe filename
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
    const filename = `${Date.now()}-${originalName}`;

    // Write the file
    const filePath = path.join(publicPath, filename);
    await writeFile(filePath, buffer);

    console.log("File saved successfully:", filePath);

    return NextResponse.json({
      success: true,
      filename: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: (error as Error).message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
