import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-background px-6 py-24 shadow-xl sm:px-12 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
      <div className="relative mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Discover Unique Artworks
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Explore our curated collection of original artworks from talented artists around the world.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg">
            <Palette className="mr-2 h-5 w-5" />
            Browse Collection
          </Button>
        </div>
      </div>
    </div>
  );
}