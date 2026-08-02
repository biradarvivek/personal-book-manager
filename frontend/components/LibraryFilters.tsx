"use client";

import { Heart } from "lucide-react";

interface LibraryFiltersProps {
  status: string;
  setStatus: (value: string) => void;
  genre: string;
  setGenre: (value: string) => void;
  favorite: boolean;
  setFavorite: (value: boolean) => void;
  genres: string[];
}

export default function LibraryFilters({
  status,
  setStatus,
  genre,
  setGenre,
  favorite,
  setFavorite,
  genres,
}: LibraryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">


      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary"
      >
        <option value="All">All Status</option>
        <option value="Want to Read">Want to Read</option>
        <option value="Reading">Reading</option>
        <option value="Completed">Completed</option>
      </select>


      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary"
      >
        <option value="All">All Genres</option>

        {genres.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
  onClick={() => setFavorite(!favorite)}
  className={`flex items-center gap-2 rounded-xl border border-border px-5 py-3 transition-colors ${
    favorite
      ? "bg-primary text-primary-foreground"
      : "bg-card text-foreground hover:bg-muted"
  }`}
>
  <Heart
    size={18}
    className={favorite ? "fill-current" : ""}
  />
  Favorites
</button>

    </div>
  );
}