"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Book } from "@/types/book";

interface BookshelfProps {
  books: Book[];
}

const themes = [
  "from-orange-500 to-red-500",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-green-700",
  "from-violet-500 to-purple-700",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-sky-700",
  "from-amber-500 to-yellow-600",
];

export default function Bookshelf({
  books,
}: BookshelfProps) {
  return (
    <section className="space-y-8">

      <div className="flex items-end justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            My Library
          </h2>

          <p className="mt-1 text-muted-foreground">
            Your personal collection
          </p>

        </div>

        <button className="flex items-center gap-2 font-medium text-primary">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

      <div className="rounded-[32px] border bg-card p-10 shadow-sm">

        {books.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            No books in your library.
          </div>
        ) : (
          <>
            <div className="flex items-end justify-center gap-5 overflow-x-auto overflow-y-visible pb-2 pt-6">

              {books.map((book, index) => {

                const theme = themes[index % themes.length];

                const height = 190 + (index % 5) * 15;

                return (

                  <motion.div
                    key={book._id}
                    whileHover={{
                      y: -15,
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group cursor-pointer flex-shrink-0"
                  >

                    <div
                      style={{
                        height,
                        width: 68,
                      }}
                      className={`relative overflow-hidden rounded-t-md bg-gradient-to-b ${theme} shadow-xl`}
                    >


                      <div className="absolute left-1 top-0 h-full w-[2px] bg-white/30" />


                      <div className="absolute inset-0 flex flex-col justify-between p-3">

                        <p className="rotate-180 text-xs font-semibold tracking-wide text-white [writing-mode:vertical-rl]">

                          {book.title}

                        </p>

                        <div className="h-1 rounded-full bg-white/20">

                          <div
                            className="h-full rounded-full bg-white"
                            style={{
                              width: `${book.progress}%`,
                            }}
                          />

                        </div>

                      </div>

                      <div className="absolute right-2 top-2 rounded-full bg-black/20 px-2 py-1 text-[10px] text-white opacity-0 backdrop-blur transition group-hover:opacity-100">

                        {book.status}

                      </div>

                    </div>

                  </motion.div>

                );

              })}

            </div>

            <div className="mt-2 h-4 rounded-full bg-gradient-to-b from-stone-300 to-stone-500 shadow-inner" />
          </>
        )}

      </div>

    </section>
  );
}