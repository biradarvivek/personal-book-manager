"use client";

import { Book } from "@/types/book";

interface Props {
  books: Book[];
}

export default function ReadingStatus({
  books,
}: Props) {
  const want = books.filter(
    (book) => book.status === "Want to Read"
  ).length;

  const reading = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const completed = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const total = books.length || 1;

  const statuses = [
    {
      label: "Want to Read",
      value: want,
    },
    {
      label: "Reading",
      value: reading,
    },
    {
      label: "Completed",
      value: completed,
    },
  ];

  return (
    <section className="rounded-3xl border bg-card p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Books by Status
      </h2>

      <div className="mt-8 space-y-6">

        {statuses.map((status) => {

          const percent = Math.round(
            (status.value / total) * 100
          );

          return (

            <div key={status.label}>

              <div className="mb-2 flex justify-between">

                <span>{status.label}</span>

                <span>
                  {status.value} ({percent}%)
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-muted">

                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}