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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  bookSchema,
  BookFormData,
  BookFormInput,
} from "@/lib/validations/book.schema";

import { updateBook } from "@/services/book.service";
import { Book } from "@/types/book";
import { useEffect } from "react";

import { toast } from "sonner";

interface EditBookDrawerProps {
  book: Book;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBookUpdated?: () => void;
}

export default function EditBookDrawer({
  book,
  open,
  onOpenChange,
  onBookUpdated,
}: EditBookDrawerProps) {

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    } = useForm<BookFormInput, any, BookFormData>({
    resolver: zodResolver(bookSchema),
    });

    useEffect(() => {
        if (book) {
            reset({
              title: book.title,
              author: book.author,
              description: book.description,
              genre: book.genre,
              tags: book.tags.join(", "),
              estimatedReadingTime: book.estimatedReadingTime,
              progress: book.progress,
            });
        }
        }, [book, reset]);

  const onSubmit = async (data: BookFormData) => {
    try {
      await updateBook(book._id, {
        title: data.title,
        author: data.author,
        description: data.description,
        genre: data.genre,
        tags: data.tags
          .split(",")
          .map(tag => tag.trim())
          .filter(Boolean),
        estimatedReadingTime: data.estimatedReadingTime,
        progress: data.progress,
      });

      toast.success("Book updated successfully!");

      onBookUpdated?.();
      onOpenChange(false);

      onBookUpdated?.();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update book"
        );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>

      <SheetContent className="w-[650px] sm:max-w-[650px] overflow-y-auto px-8">
        <SheetHeader className="pb-6 border-b">

  <SheetTitle className="text-3xl font-serif font-semibold">
    Edit Book
  </SheetTitle>

  <p className="text-muted-foreground mt-2">
    Update your book information.
  </p>

</SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          <div>
            <Label className="mb-2 block text-sm font-medium">Book Title</Label>

            <Input
            className="h-12 rounded-xl"
              placeholder="Atomic Habits"
              {...register("title")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.title?.message}
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Author</Label>

            <Input
              className="h-12 rounded-xl"
              placeholder="James Clear"
              {...register("author")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.author?.message}
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Description</Label>

            <Textarea
              rows={6}
              className="rounded-xl resize-none"
              placeholder="Write something..."
              {...register("description")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.description?.message}
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Genre</Label>

            <Input
              className="h-12 rounded-xl"
              placeholder="Self Help"
              {...register("genre")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.genre?.message}
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Tags</Label>

            <Input
              className="h-12 rounded-xl"
              placeholder="productivity, habits"
              {...register("tags")}
            />
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">
              Estimated Reading Time (Hours)
            </Label>

            <Input
              className="h-12 rounded-xl"
              type="number"
              placeholder="8"
              {...register("estimatedReadingTime")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.estimatedReadingTime?.message}
            </p>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium">Reading Progress (%)</Label>

            <Input
            className="h-12 rounded-xl"
              type="number"
              min={0}
              max={100}
              {...register("progress")}
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.progress?.message}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl"
          >
            {isSubmitting ? "Updating..." : "Update Book"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}