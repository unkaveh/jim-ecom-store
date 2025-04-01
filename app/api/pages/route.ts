import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function GET() {
  try {
    const contentDirectory = path.join(process.cwd(), "content", "pages");

    // Check if directory exists
    if (!fs.existsSync(contentDirectory)) {
      return NextResponse.json([], { status: 200 });
    }

    const filenames = fs.readdirSync(contentDirectory);

    const pages = filenames
      .filter(
        (filename) => filename.endsWith(".md") || filename.endsWith(".mdx")
      )
      .map((filename) => {
        const filePath = path.join(contentDirectory, filename);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);

        // Extract slug/id from filename
        const slug = filename.replace(/\.(md|mdx)$/, "");

        // Process the data
        return {
          slug,
          title: data.title || "",
          description: data.description || "",
          featuredImage: data.featuredImage || "",
          content: content || "",
        };
      });

    return NextResponse.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch page data" },
      { status: 500 }
    );
  }
}
