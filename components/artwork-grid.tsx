"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import { Artwork } from '@/types/artwork';

export function ArtworkGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    // This would be replaced with actual CMS data fetching
    const fetchArtworks = async () => {
      // Temporary mock data
      const mockArtworks: Artwork[] = [
        {
          id: '1',
          title: 'Abstract Harmony',
          description: 'A vibrant exploration of color and form',
          price: 1200,
          images: ['https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&h=1000'],
          dimensions: { width: 30, height: 40, unit: 'inches' },
          medium: 'Acrylic on Canvas',
          createdAt: '2024-01-15',
          available: true,
        },
        // Add more mock artworks here
      ];
      setArtworks(mockArtworks);
    };

    fetchArtworks();
  }, []);

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
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}