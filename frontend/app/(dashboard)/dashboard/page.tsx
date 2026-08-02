"use client";

import { useEffect, useState } from "react";

import Hero from "@/components/Hero";
import ContinueReading from "@/components/ContinueReading";
import Bookshelf from "@/components/Bookshelf";
import ReadingJourney from "@/components/ReadingJourney";

import { getBooks } from "@/services/book.service";
import { Book } from "@/types/book";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <Hero books={books} />

      <ContinueReading books={books} />

      <Bookshelf books={books} />

      <ReadingJourney books={books} />
    </div>
  );
}