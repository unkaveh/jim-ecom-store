"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavPage {
  slug: string;
  title: string;
}

export function SiteNavigation() {
  const [pages, setPages] = useState<NavPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function fetchPages() {
      fetch("/api/pages")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to fetch pages");
        })
        .then((data) => {
          setPages(data);
        })
        .catch((error) => {
          console.error("Error fetching pages:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchPages();
  }, []);

  return (
    <nav className="flex items-center space-x-8">
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>

      <Link
        href="/artwork"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Gallery
      </Link>

      {!loading &&
        pages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {page.title}
          </Link>
        ))}

      <Link
        href="/cart"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Cart
      </Link>
    </nav>
  );
}
