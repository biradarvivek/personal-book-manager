"use client";

import { Book } from "@/types/book";
import {
  BookOpen,
  Clock3,
  Heart,
  CheckCircle,
} from "lucide-react";

interface Props {
  books: Book[];
}

export default function ReadingOverview({
  books,
}: Props) {
  const totalBooks = books.length;

  const completed = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const favorites = books.filter(
    (book) => book.favorite
  ).length;

  const totalHours = books.reduce(
    (sum, book) => sum + book.estimatedReadingTime,
    0
  );

  const stats = [
    {
      title: "Books Read",
      value: completed,
      icon: CheckCircle,
    },
    {
      title: "Total Books",
      value: totalBooks,
      icon: BookOpen,
    },
    {
      title: "Favorites",
      value: favorites,
      icon: Heart,
    },
    {
      title: "Reading Hours",
      value: totalHours,
      icon: Clock3,
    },
  ];

  return (
    <section className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-muted-foreground">
          Insights into your reading habits.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border bg-card p-6 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <Icon className="text-primary" />

                <span className="text-4xl font-bold">
                  {item.value}
                </span>

              </div>

              <p className="mt-5 text-muted-foreground">
                {item.title}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}