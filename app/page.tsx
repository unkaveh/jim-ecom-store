import { ArtworkGrid } from '@/components/artwork-grid';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <div className="space-y-12">
      <Hero />
      <ArtworkGrid />
    </div>
  );
}