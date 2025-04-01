import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

interface ArtworkParams {
  slug: string;
}

// Generate static paths for all artwork pages
export async function generateStaticParams() {
  try {
    const contentDirectory = path.join(process.cwd(), "content", "artwork");

    if (!fs.existsSync(contentDirectory)) {
      return [];
    }

    const filenames = fs.readdirSync(contentDirectory);

    return filenames
      .filter(
        (filename) => filename.endsWith(".md") || filename.endsWith(".mdx")
      )
      .map((filename) => ({
        slug: filename.replace(/\.(md|mdx)$/, ""),
      }));
  } catch (error) {
    console.error("Error generating artwork params:", error);
    return [];
  }
}

// Generate metadata for the page based on artwork details
export async function generateMetadata({ params }: { params: ArtworkParams }) {
  const artwork = await getArtworkBySlug(params.slug);

  if (!artwork) {
    return {
      title: "Artwork Not Found",
      description: "The requested artwork could not be found.",
    };
  }

  return {
    title: `${artwork.title} | Art Gallery`,
    description: artwork.description,
  };
}

// Get artwork data by slug
async function getArtworkBySlug(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "artwork",
      `${slug}.md`
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      id: slug,
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
      content,
    };
  } catch (error) {
    console.error(`Error getting artwork ${slug}:`, error);
    return null;
  }
}

export default async function ArtworkPage({
  params,
}: {
  params: ArtworkParams;
}) {
  const artwork = await getArtworkBySlug(params.slug);

  if (!artwork) {
    notFound();
  }

  const dimensions = `${artwork.dimensions.width} × ${artwork.dimensions.height} ${artwork.dimensions.unit}`;

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={artwork.images[0]}
            alt={artwork.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{artwork.title}</h1>
          <p className="mt-4 text-xl font-semibold">
            {formatPrice(artwork.price)}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-medium">Details</h2>
            <dl className="mt-2 space-y-2">
              <div className="flex">
                <dt className="w-24 text-muted-foreground">Medium:</dt>
                <dd>{artwork.medium}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-muted-foreground">Dimensions:</dt>
                <dd>{dimensions}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-muted-foreground">Created:</dt>
                <dd>{new Date(artwork.createdAt).getFullYear()}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-muted-foreground">Status:</dt>
                <dd>{artwork.available ? "Available" : "Sold"}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-2">{artwork.description}</p>
          </div>

          {artwork.available && (
            <button className="mt-8 w-full rounded-md bg-primary px-6 py-3 text-lg font-medium text-primary-foreground">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
