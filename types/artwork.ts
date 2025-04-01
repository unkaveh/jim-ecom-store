export interface Artwork {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  dimensions: {
    width: number;
    height: number;
    unit: string;
  };
  medium: string;
  createdAt: string;
  available: boolean;
}
