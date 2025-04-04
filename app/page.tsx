import { ArtworkGrid } from "@/components/artwork-grid";
import { Hero } from "@/components/hero";
import { IdentityRedirect } from "@/components/identity-redirect";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Artwork } from "@/types/artwork";

// Reuse the same artwork fetching logic
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

    // Limit to 3 featured items for homepage
    return artworks.slice(0, 3);
  } catch (error) {
    console.error("Error fetching artwork:", error);
    return [];
  }
}

export default async function Home() {
  const artworks = await getArtworks();

  return (
    <div className="space-y-12">
      <IdentityRedirect />
      <Hero />
      <section className="container mx-auto py-12 px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Featured Artwork
        </h2>
        <ArtworkGrid artworks={artworks} />
      </section>
    </div>
  );
}
