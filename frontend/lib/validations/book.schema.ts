import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "Title is required"),
  author: z.string().min(2, "Author is required"),
  description: z.string().min(10, "Description is required"),
  genre: z.string().min(2, "Genre is required"),
  tags: z.string(),
  progress: z.coerce.number().min(0).max(100),
  estimatedReadingTime: z.coerce
    .number()
    .min(1, "Reading time is required"),
});

export type BookFormData = z.output<typeof bookSchema>;
export type BookFormInput = z.input<typeof bookSchema>;