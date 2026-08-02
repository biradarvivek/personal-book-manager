"use client";

import { useEffect, useState } from "react";

import { getMe } from "@/services/auth.service";
import { getBooks } from "@/services/book.service";

import {
  User,
  Mail,
  Calendar,
  BookOpen,
} from "lucide-react";

import { Book } from "@/types/book";

interface UserData {
  name: string;
  email: string;
  createdAt: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, booksData] = await Promise.all([
          getMe(),
          getBooks(),
        ]);

        setUser(userData);
        setBooks(booksData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your personal account information.
        </p>

      </div>

      <div className="rounded-3xl border bg-card p-8 shadow-sm">

        <div className="mb-10 flex items-center gap-6">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">

            {user?.name.charAt(0).toUpperCase()}

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              {user?.name}
            </h2>

            <p className="text-muted-foreground">
              {user?.email}
            </p>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div className="flex items-center gap-4 rounded-2xl border p-5">

            <User className="text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Name
              </p>

              <h3 className="font-semibold">
                {user?.name}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border p-5">

            <Mail className="text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Email
              </p>

              <h3 className="font-semibold">
                {user?.email}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border p-5">

            <Calendar className="text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Joined
              </p>

              <h3 className="font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </h3>

            </div>

          </div>

          <div className="flex items-center gap-4 rounded-2xl border p-5">

            <BookOpen className="text-primary" />

            <div>

              <p className="text-sm text-muted-foreground">
                Total Books
              </p>

              <h3 className="font-semibold">
                {books.length}
              </h3>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}