export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  tags: string[];
  rating: number;
  status: "Want to Read" | "Reading" | "Completed";
  progress: number;
  estimatedReadingTime: number;
  favorite: boolean;
  notes: string;
  createdAt: string;
  updatedAt: string;
}