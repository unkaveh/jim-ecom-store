import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const contentDirectory = path.join(process.cwd(), "content", "artwork");

    // Check if directory exists
    if (!fs.existsSync(contentDirectory)) {
      return NextResponse.json([], { status: 200 });
    }

    const filenames = fs.readdirSync(contentDirectory);

    const artworks = filenames
      .filter(
        (filename) => filename.endsWith(".md") || filename.endsWith(".mdx")
      )
      .map((filename) => {
        const filePath = path.join(contentDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);

        // Extract slug/id from filename
        const id = filename.replace(/\.(md|mdx)$/, "");

        // Process the data
        return {
          id,
          title: data.title || "",
          description: data.description || "",
          price: parseFloat(data.price) || 0,
          images: data.images || [],
          dimensions: {
            width: data.width || 0,
            height: data.height || 0,
            unit: data.unit || "inches",
          },
          medium: data.medium || "",
          createdAt: data.createdAt || "",
          available: data.available !== undefined ? data.available : true,
        };
      })
      // Sort by creation date (most recent first)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return NextResponse.json(artworks);
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return NextResponse.json(
      { error: "Failed to fetch artwork data" },
      { status: 500 }
    );
  }
}
