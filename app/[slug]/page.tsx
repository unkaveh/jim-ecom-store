import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { CMSPage } from "@/components/cms-page";

interface PageParams {
  slug: string;
}

// Generate static paths for all CMS pages
export async function generateStaticParams() {
  try {
    const contentDirectory = path.join(process.cwd(), "content", "pages");

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
    console.error("Error generating page params:", error);
    return [];
  }
}

// Generate metadata for the page based on page details
export async function generateMetadata({ params }: { params: PageParams }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  return {
    title: `${page.title} | Art Gallery`,
    description: page.description,
  };
}

// Get page data by slug
async function getPageBySlug(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      featuredImage: data.featuredImage || "",
      content,
    };
  } catch (error) {
    console.error(`Error getting page ${slug}:`, error);
    return null;
  }
}

export default async function DynamicPage({ params }: { params: PageParams }) {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="container mx-auto py-12 px-4 md:px-6">
      <CMSPage
        title={page.title}
        content={page.content}
        featuredImage={page.featuredImage}
      />
    </main>
  );
}
