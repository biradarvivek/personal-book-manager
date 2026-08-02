"use client";

import { BookOpen, Clock3, LibraryBig } from "lucide-react";

export default function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden rounded-[32px] bg-gradient-to-br from-[#5B4AE6] via-[#6C63FF] to-[#8B7BFF] p-10 text-white lg:flex lg:w-[45%] lg:flex-col lg:justify-between">


      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />


      <div className="relative z-10">

        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

          <BookOpen size={32} />

        </div>

        <h1 className="text-5xl font-bold">
          Bindery
        </h1>

        <p className="mt-6 max-w-sm text-lg leading-8 text-white/80">
          Organize your books, track your reading progress,
          and build your personal digital library.
        </p>

      </div>


      <div className="relative z-10 mt-12 flex items-end justify-center gap-4">

        <div className="h-40 w-16 rounded-t-md bg-white/15 backdrop-blur" />

        <div className="h-52 w-20 rounded-t-md bg-white/25 backdrop-blur" />

        <div className="h-44 w-16 rounded-t-md bg-white/20 backdrop-blur" />

      </div>

      {/* Stats */}

      <div className="relative z-10 mt-12 grid grid-cols-3 gap-4">

        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

          <LibraryBig />

          <h2 className="mt-3 text-2xl font-bold">
            500+
          </h2>

          <p className="text-sm text-white/70">
            Books
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

          <BookOpen />

          <h2 className="mt-3 text-2xl font-bold">
            30
          </h2>

          <p className="text-sm text-white/70">
            Genres
          </p>

        </div>

        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

          <Clock3 />

          <h2 className="mt-3 text-2xl font-bold">
            120h
          </h2>

          <p className="text-sm text-white/70">
            Reading
          </p>

        </div>

      </div>

    </div>
  );
}