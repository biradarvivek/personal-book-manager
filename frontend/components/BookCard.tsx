"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

import { Book } from "@/types/book";
import BookDetailsSheet from "./BookDetailsSheet";
import { deleteBook } from "@/services/book.service";

interface BookCardProps {
  book: Book;
  onBookUpdated: () => void;
}

export default function BookCard({
  book,
  onBookUpdated,
}: BookCardProps) {
  const [openDetails, setOpenDetails] = useState(false);

  const handleDelete = (id: string) => {
  toast.warning("Delete Book?", {
    description: "This action cannot be undone.",
    action: {
      label: "Delete",
      onClick: async () => {
        try {
          await deleteBook(id);

          toast.success("Book deleted successfully");

          setOpenDetails(false);
          onBookUpdated();
        } catch (error: any) {
          toast.error(
            error.response?.data?.message || "Failed to delete book"
          );
        }
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => {},
    },
  });
};
  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.25 }}
        className="group overflow-hidden rounded-3xl border bg-card shadow-sm hover:shadow-xl"
      >
        {/* Cover */}

        <div className="h-64 bg-gradient-to-br from-violet-500 to-indigo-600 p-6 text-white">
          <div className="flex h-full flex-col justify-between">
            <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
              {book.status}
            </span>

            <div>
              <h2 className="text-2xl font-bold">
                {book.title}
              </h2>

              <p className="mt-2 text-white/80">
                {book.author}
              </p>
            </div>
          </div>
        </div>


        <div className="space-y-3 p-5">
          <div className="flex gap-1">
            {Array.from({ length: book.rating }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          <button
            onClick={() => setOpenDetails(true)}
            className="w-full rounded-xl bg-primary py-3 text-white transition hover:opacity-90"
          >
            View Details
          </button>
        </div>
      </motion.div>

      <BookDetailsSheet
        open={openDetails}
        onOpenChange={setOpenDetails}
        book={book}
        onBookUpdated={onBookUpdated}
        onDelete={handleDelete}
      />
    </>
  );
}