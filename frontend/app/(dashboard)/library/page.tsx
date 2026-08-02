"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import BookCard from "@/components/BookCard";
import LibraryFilters from "@/components/LibraryFilters";
import AddBookDrawer from "@/components/AddBookDrawer";

import { getBooks } from "@/services/book.service";
import { Book } from "@/types/book";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
const [genre, setGenre] = useState("All");
const [favorite, setFavorite] = useState(false);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const genres = [...new Set(books.map((book) => book.genre))];

  const filteredBooks = useMemo(() => {
  return books.filter((book) => {
    const query = search.toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);

    const matchesStatus =
      status === "All" || book.status === status;

    const matchesGenre =
      genre === "All" || book.genre === genre;

    const matchesFavorite =
      !favorite || book.favorite;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesGenre &&
      matchesFavorite
    );
  });
}, [books, search, status, genre, favorite]);

  return (
    <div className="space-y-8">


      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-5xl font-bold">
            My Library
          </h1>

          <p className="mt-2 text-muted-foreground">
            Organize and manage your personal collection.
          </p>
        </div>

        <AddBookDrawer onBookAdded={fetchBooks} />
      </div>


      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author..."
          className="h-12 w-full rounded-2xl border bg-card pl-11 pr-4 outline-none focus:border-primary"
        />

      </div>

      <LibraryFilters
        status={status}
        setStatus={setStatus}
        genre={genre}
        setGenre={setGenre}
        favorite={favorite}
        setFavorite={setFavorite}
        genres={genres}
      />

      {loading ? (
        <div className="py-20 text-center">
          Loading books...
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="rounded-3xl border border-dashed py-20 text-center">

          <h2 className="text-2xl font-semibold">
            No Books Found 📚
          </h2>

          <p className="mt-3 text-muted-foreground">
            Try searching with another title or author.
          </p>

        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {filteredBooks.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onBookUpdated={fetchBooks}
            />
          ))}

        </div>
      )}
    </div>
  );
}