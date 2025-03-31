"use client";
import { ArtworkGrid } from "@/components/artwork-grid";
import { Hero } from "@/components/hero";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Wait until the page is mounted (client-side)
    if (typeof window !== "undefined") {
      const hash = window.location.hash;

      // Look for confirmation token
      if (hash.includes("confirmation_token")) {
        const token = hash.split("=")[1];
        router.push(`/admin#confirmation_token=${token}`);
      }
    }
  }, []);
  return (
    <div className="space-y-12">
      <Hero />
      <ArtworkGrid />
    </div>
  );
}
