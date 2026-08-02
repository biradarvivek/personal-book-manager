"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { Book } from "@/types/book";

interface ContinueReadingProps {
  books: Book[];
}

export default function ContinueReading({
  books,
}: ContinueReadingProps) {
  const currentBook = books
    .filter((book) => book.status === "Reading")
    .sort((a, b) => b.progress - a.progress)[0];

  if (!currentBook) {
    return (
      <section className="rounded-3xl border border-dashed py-20 text-center">
        <h2 className="flex items-center justify-center gap-3 text-2xl font-bold">
          No Book In Progress
          <BookOpen className="h-10 w-10 text-violet-600 dark:text-violet-400" />
        </h2>

        <p className="mt-3 text-muted-foreground">
          Start reading a book to continue your journey.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            Continue Reading
          </h2>

          <p className="mt-1 text-muted-foreground">
            Pick up where you left off.
          </p>

        </div>

        <button className="flex items-center gap-2 font-medium text-primary transition hover:gap-3">

          View All

          <ArrowRight size={18} />

        </button>

      </div>


      <div className="overflow-hidden rounded-[32px] border bg-card shadow-sm transition hover:shadow-xl">

        <div className="flex">

          <div className="flex h-72 w-56 items-center justify-center bg-gradient-to-br from-violet-500 via-indigo-500 to-blue-600">

            <div className="space-y-3 px-6 text-center text-white">

              <h2 className="text-3xl font-bold">
                {currentBook.title}
              </h2>

              <p className="text-white/80">
                {currentBook.author}
              </p>

            </div>

          </div>

          <div className="flex flex-1 flex-col justify-between p-8">

            <div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">

                {currentBook.status}

              </span>

              <h2 className="mt-5 text-4xl font-bold">
                {currentBook.title}
              </h2>

              <p className="mt-2 text-lg text-muted-foreground">
                {currentBook.author}
              </p>

              <p className="mt-6 max-w-xl leading-7 text-muted-foreground">

                {currentBook.description}

              </p>

            </div>

            <div className="mt-10">

              <div className="mb-3 flex justify-between">

                <span className="text-sm">
                  Reading Progress
                </span>

                <span className="font-medium">
                  {currentBook.progress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{
                    width: `${currentBook.progress}%`,
                  }}
                />

              </div>

              <div className="mt-3 flex justify-between text-sm text-muted-foreground">

                <span>
                  {currentBook.estimatedReadingTime} hrs
                </span>

                <span>
                  {currentBook.genre}
                </span>

              </div>

              <button className="mt-8 rounded-2xl bg-primary px-6 py-3 font-medium text-white transition hover:scale-105">

                Resume Reading

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}