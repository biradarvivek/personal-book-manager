"use client";

import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export default function ReadingProgress({
  books,
}: Props) {
  const goal = 20;

  const completed = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const progress = Math.min(
    Math.round((completed / goal) * 100),
    100
  );

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Reading Goal
          </h2>

          <p className="mt-2 text-muted-foreground">
            Track your yearly reading target.
          </p>

        </div>

        <div className="text-right">

          <h3 className="text-4xl font-bold">
            {completed}/{goal}
          </h3>

          <p className="text-muted-foreground">
            Books Completed
          </p>

        </div>

      </div>

      <div className="mt-8">

        <div className="mb-3 flex justify-between">

          <span>Progress</span>

          <span>{progress}%</span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-muted">

          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </section>
  );
}