"use client";

import {
  CalendarDays,
  BookOpen,
} from "lucide-react";

import { Book } from "@/types/book";

interface ReadingJourneyProps {
  books: Book[];
}

export default function ReadingJourney({
  books,
}: ReadingJourneyProps) {

  const recentBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold">
          Reading Journey
        </h2>

        <p className="text-muted-foreground">
          Recently added books.
        </p>

      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-sm">

        {recentBooks.length === 0 ? (

          <div className="py-12 text-center text-muted-foreground">
            No recent activity.
          </div>

        ) : (

          recentBooks.map((book, index) => (

            <div
              key={book._id}
              className={`flex gap-4 ${
                index !== recentBooks.length - 1
                  ? "mb-6 border-b pb-6"
                  : ""
              }`}
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">

                <BookOpen size={20} />

              </div>

              <div className="flex-1">

                <h4 className="font-semibold">
                  Added "{book.title}"
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  by {book.author}
                </p>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">

                  <CalendarDays size={15} />

                  {new Date(book.createdAt).toLocaleDateString()}

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}