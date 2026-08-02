"use client";

import { useEffect, useState } from "react";

import ReadingOverview from "@/components/ReadingOverview";
import ReadingProgress from "@/components/ReadingProgress";
import ReadingStatus from "@/components/ReadingStatus";
import FavoriteGenre from "@/components/FavoriteGenre";

import { getBooks } from "@/services/book.service";
import { Book } from "@/types/book";

export default function AnalyticsPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <ReadingOverview books={books} />

      <ReadingProgress books={books} />

      <ReadingStatus books={books} />

      <FavoriteGenre books={books} />

    </div>
  );
}