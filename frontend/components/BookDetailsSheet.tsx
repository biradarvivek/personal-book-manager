"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  Heart,
  Pencil,
  Trash2,
  Clock3,
  BookOpen,
} from "lucide-react";

import EditBookDrawer from "@/components/EditBookDrawer";
import { Book } from "@/types/book";
import { toggleFavorite } from "@/services/book.service";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book | null;
  onBookUpdated?: () => void;
  onDelete: (id: string) => void;
}

export default function BookDetailsSheet({
  open,
  onOpenChange,
  book,
  onBookUpdated,
  onDelete,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);



  if (!book) return null;


  const handleFavorite = async () => {
    try {
      await toggleFavorite(book._id);

      toast.success("Favorite updated");

      onBookUpdated?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update favorite"
      );
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-[650px] sm:max-w-[650px] overflow-y-auto px-8">

          <SheetHeader>
            <SheetTitle>Book Details</SheetTitle>
          </SheetHeader>

          <div className="mt-10 space-y-10 pb-8">

            <div className="flex justify-center">

              <div className="flex h-60 w-40  justify-center pb-2 flex-col rounded-[30px] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-7 text-white shadow-2xl">

                <div>

                  <p className="text-xs uppercase tracking-[0.3em] opacity-70">

                    Bindery

                  </p>

                </div>

                <div>

                  <h2 className="text-3xl font-bold leading-tight">

                    {book.title}

                  </h2>

                  <p className="mt-4 text-base opacity-80">

                    {book.author}

                  </p>

                </div>

              </div>

            </div>


            <div className="space-y-2 text-center">

              <h2 className="text-4xl font-bold leading-tight">

                {book.title}

              </h2>

              <p className="text-base text-muted-foreground">

                {book.author}

              </p>

              <div className="flex justify-center gap-2 pt-2">

                <Badge className="rounded-full px-5 py-1">

                  {book.status}

                </Badge>

                <Badge
                  variant="secondary"
                  className="rounded-full px-4 py-1"
                >

                  {book.genre}

                </Badge>

              </div>

            </div>

            <Separator />

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <h3 className="text-lg font-semibold">

                  Reading Progress

                </h3>

                <span className="text-lg font-bold text-primary">

                  {book.progress}%

                </span>

              </div>

              <Progress
                value={book.progress}
                className="h-2"
              />

            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl border p-5">

                <p className="mb-2 text-sm text-muted-foreground">

                  Genre

                </p>

                <h3 className="text-lg font-semibold">

                  {book.genre}

                </h3>

              </div>

              <div className="rounded-2xl border p-5">

                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">

                  <Clock3 size={16} />

                  Reading Time

                </div>

                <h3 className="text-lg font-semibold">

                  {book.estimatedReadingTime} hrs

                </h3>

              </div>

            </div>

            <Separator />

            <div>

              <h3 className="mb-4 text-lg font-semibold">

                Tags

              </h3>

              <div className="flex flex-wrap gap-3">

                {book.tags.map((tag) => (

                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full px-4 py-2"
                  >

                    #{tag}

                  </Badge>

                ))}

              </div>

            </div>

            <Separator />


            <div>

              <h3 className="mb-3 text-lg font-semibold">
                About this Book
              </h3>

              <div className="rounded-2xl border bg-muted/30 p-5">

                <p className="leading-7 text-muted-foreground">

                  {book.description || "No description available."}

                </p>

              </div>

            </div>

            <Separator />

            <div>

              <h3 className="mb-3 text-lg font-semibold">
                Personal Notes
              </h3>

              <div className="rounded-2xl border bg-muted/30 p-5">

                <p className="whitespace-pre-wrap leading-7 text-muted-foreground">

                  {book.notes || "You haven't written any notes yet."}

                </p>

              </div>

            </div>

            <Separator />

            <div>

              <h3 className="mb-4 text-lg font-semibold">
                Book Information
              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between rounded-2xl border p-4">

                  <span className="text-muted-foreground">

                    Status

                  </span>

                  <Badge>

                    {book.status}

                  </Badge>

                </div>

                <div className="flex items-center justify-between rounded-2xl border p-4">

                  <span className="text-muted-foreground">

                    Progress

                  </span>

                  <span className="font-semibold">

                    {book.progress}%

                  </span>

                </div>

                <div className="flex items-center justify-between rounded-2xl border p-4">

                  <span className="text-muted-foreground">

                    Reading Time

                  </span>

                  <span className="font-semibold">

                    {book.estimatedReadingTime} hrs

                  </span>

                </div>

                <div className="flex items-center justify-between rounded-2xl border p-4">

                  <span className="text-muted-foreground">

                    Favorite

                  </span>

                  <Heart
                    size={18}
                    className={
                      book.favorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }
                  />

                </div>

              </div>

            </div>

            <Separator />


            <div className="space-y-3">

              <Button
                variant="outline"
                onClick={handleFavorite}
                className="h-12 w-full justify-start rounded-2xl"
              >

                <Heart
                  className={`mr-3 h-5 w-5 ${book.favorite
                      ? "fill-red-500 text-red-500"
                      : ""
                    }`}
                />

                {book.favorite
                  ? "Remove from Favorites"
                  : "Add to Favorites"}

              </Button>

              <Button
                onClick={() => setEditOpen(true)}
                className="h-12 w-full justify-start rounded-2xl"
              >

                <Pencil className="mr-3 h-5 w-5" />

                Edit Book

              </Button>

              <Button
                variant="destructive"
                onClick={() => onDelete(book._id)}
                className="h-12 w-full justify-start rounded-2xl"
              >

                <Trash2 className="mr-3 h-5 w-5" />

                Delete Book

              </Button>

            </div>

          </div>

        </SheetContent>

      </Sheet>

      <EditBookDrawer
        book={book}
        open={editOpen}
        onOpenChange={setEditOpen}
        onBookUpdated={() => {
          onBookUpdated?.();
          setEditOpen(false);
          onOpenChange(false);
        }}
      />

    </>
  );
}