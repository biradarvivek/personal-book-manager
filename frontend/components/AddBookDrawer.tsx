"use client";

import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  BookOpen,
  User,
  FileText,
  Tag,
  Clock3,
  Plus,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  bookSchema,
  BookFormData,
  BookFormInput,
} from "@/lib/validations/book.schema";

import { createBook } from "@/services/book.service";

import { toast } from "sonner";

interface AddBookDrawerProps {
  onBookAdded?: () => void;
}

export default function AddBookDrawer({
  onBookAdded,
}: AddBookDrawerProps) {
  const [open, setOpen] = useState(false);

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<BookFormInput, any, BookFormData>({
  resolver: zodResolver(bookSchema),
  defaultValues: {
    progress: 0,
  },
});

  const onSubmit = async (data: BookFormData) => {
    console.log("Form submitted:", data);
    try {
      await createBook({
        title: data.title,
        author: data.author,
        description: data.description,
        genre: data.genre,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        estimatedReadingTime: data.estimatedReadingTime,
        status: "Want to Read",
        progress: 0,
        favorite: false,
        rating: 0,
        notes: "",
      });

      toast.success("Book added successfully!");

      reset();
      setOpen(false);

      onBookAdded?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to add book"
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button className="rounded-2xl px-6 py-6 shadow-sm">
            <Plus className="mr-2 h-5 w-5" />
            Add Book
          </Button>
        }
      />

      <SheetContent className="w-full max-w-2xl overflow-y-auto px-0">
        <SheetHeader className="border-b px-6 py-6">
          <SheetTitle className="text-3xl font-bold">
            Add New Book
          </SheetTitle>

          <p className="text-sm text-muted-foreground">
            Fill in the details below to add a new book to your personal
            library.
          </p>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6 px-6 pb-28"
        >
          {/* Title */}

          <div className="space-y-3 rounded-2xl border bg-card p-6">
            <Label className="flex items-center gap-2 font-semibold">
              <BookOpen size={18} />
              Book Title
            </Label>

            <Input
              placeholder="Atomic Habits"
              className="h-11 rounded-xl border-0 bg-muted shadow-none"
              {...register("title")}
            />

            <p className="text-sm text-red-500">
              {errors.title?.message}
            </p>
          </div>

          {/* Author */}

          <div className="space-y-3 rounded-2xl border bg-card p-6">
            <Label className="flex items-center gap-2 font-semibold">
              <User size={18} />
              Author
            </Label>

            <Input
              placeholder="James Clear"
              className="h-11 rounded-xl border-0 bg-muted shadow-none"
              {...register("author")}
            />

            <p className="text-sm text-red-500">
              {errors.author?.message}
            </p>
          </div>

          {/* Description */}

          <div className="space-y-3 rounded-2xl border bg-card p-6">
            <Label className="flex items-center gap-2 font-semibold">
              <FileText size={18} />
              Description
            </Label>

            <Textarea
              rows={6}
              placeholder="Write a short description about this book..."
              className="resize-none rounded-xl border-0 bg-muted shadow-none"
              {...register("description")}
            />

            <p className="text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          {/* Genre & Reading Time */}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3 rounded-2xl border bg-card p-6">
              <Label className="flex items-center gap-2 font-semibold">
                <Tag size={18} />
                Genre
              </Label>

              <Input
                placeholder="Self Help"
                className="h-11 rounded-xl border-0 bg-muted shadow-none"
                {...register("genre")}
              />

              <p className="text-sm text-red-500">
                {errors.genre?.message}
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border bg-card p-6">
              <Label className="flex items-center gap-2 font-semibold">
                <Clock3 size={18} />
                Reading Time
              </Label>

              <Input
                type="number"
                placeholder="8 Hours"
                className="h-11 rounded-xl border-0 bg-muted shadow-none"
                {...register("estimatedReadingTime")}
              />

              <p className="text-sm text-red-500">
                {errors.estimatedReadingTime?.message}
              </p>
            </div>
          </div>

          {/* Tags */}

          <div className="space-y-3 rounded-2xl border bg-card p-6">
            <Label className="flex items-center gap-2 font-semibold">
              <Tag size={18} />
              Tags
            </Label>

            <Input
              placeholder="productivity, habits, mindset"
              className="h-11 rounded-xl border-0 bg-muted shadow-none"
              {...register("tags")}
            />

            <p className="text-xs text-muted-foreground">
              Separate multiple tags using commas.
            </p>
          </div>

          {/* Sticky Footer */}

          <div className="sticky bottom-0 px-6 py-5">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl text-base font-semibold"
            >
              {isSubmitting ? "Saving Book..." : "Save Book"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}