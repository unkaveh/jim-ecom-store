"use client";
import { ArtworkGrid } from "@/components/artwork-grid";
import { Hero } from "@/components/hero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;

      if (hash.includes("confirmation_token")) {
        const token = hash.split("=")[1];
        window.location.href = `/admin#confirmation_token=${token}`;
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
