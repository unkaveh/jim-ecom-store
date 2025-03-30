"use client";

import Link from 'next/link';
import { ShoppingCart, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/components/cart-provider';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Palette className="h-6 w-6" />
            <span className="text-xl font-bold">Art Gallery</span>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/collection" className="text-muted-foreground hover:text-foreground">
              Collection
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}