import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ArtworkGrid } from "@/components/artwork-grid";
import { Artwork } from "@/types/artwork";

export const metadata = {
  title: "Gallery | Art Gallery",
  description: "Browse our collection of fine art and contemporary artworks.",
};

async function getArtworks(): Promise<Artwork[]> {
  try {
    const contentDirectory = path.join(process.cwd(), "content", "artwork");

    // Check if directory exists
    if (!fs.existsSync(contentDirectory)) {
      return [];
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

    return artworks;
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const artworks = await getArtworks();

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Art Gallery</h1>
        <p className="mt-4 text-muted-foreground">
          Browse our collection of contemporary artworks
        </p>
      </div>

      <ArtworkGrid artworks={artworks} />
    </main>
  );
}
