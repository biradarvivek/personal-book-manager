"use client";

import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export default function FavoriteGenre({
  books,
}: Props) {

  const genreMap: Record<string, number> = {};

  books.forEach((book) => {
    genreMap[book.genre] =
      (genreMap[book.genre] || 0) + 1;
  });

  const favoriteGenre =
    Object.entries(genreMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Favorite Genre
      </h2>

      {favoriteGenre ? (
        <div className="mt-8">

          <h3 className="text-5xl font-bold text-primary">
            {favoriteGenre[0]}
          </h3>

          <p className="mt-3 text-muted-foreground">
            {favoriteGenre[1]} book(s) in this genre
          </p>

        </div>
      ) : (
        <p className="mt-6 text-muted-foreground">
          No books available.
        </p>
      )}

    </section>
  );
}