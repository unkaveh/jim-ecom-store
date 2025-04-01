"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { Artwork } from "@/types/artwork";

interface ArtworkGridProps {
  artworks: Artwork[];
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No artworks found. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {artworks.map((artwork) => (
        <Link key={artwork.id} href={`/artwork/${artwork.id}`}>
          <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={artwork.images[0]}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-1">{artwork.title}</CardTitle>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {artwork.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="font-semibold">{formatPrice(artwork.price)}</p>
              {!artwork.available && (
                <span className="ml-auto text-sm text-muted-foreground">
                  Sold
                </span>
              )}
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
