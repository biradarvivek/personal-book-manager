"use client";

import { Flame, Target, BookOpen, Heart } from "lucide-react";
import { Book } from "@/types/book";

interface HeroProps {
  books: Book[];
}

export default function Hero({ books }: HeroProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const goal = 20;

  const completed = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const reading = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const favorites = books.filter(
    (book) => book.favorite
  ).length;

  const progress = Math.min(
    Math.round((completed / goal) * 100),
    100
  );

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#5B4AE6] via-[#6F5CF6] to-[#8B7BFF] p-10 text-white shadow-xl">


      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">


        <div className="max-w-xl">

          <span className="text-lg text-white/80">
            {greeting}, Vivek
          </span>

          <h1 className="mt-3 text-5xl font-bold leading-tight">
            You've completed {completed}
            <br />
            of your {goal} book goal.
          </h1>

          <p className="mt-5 max-w-lg text-lg text-white/80">
            Every page you read builds knowledge.
            Keep your reading streak alive.
          </p>


          <div className="mt-8">

            <div className="mb-2 flex justify-between text-sm">

              <span>Reading Goal</span>

              <span>{progress}%</span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white/20">

              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>


          <div className="mt-8 grid grid-cols-4 gap-8">

            <div className="flex items-center gap-3">

              <Target className="text-yellow-300" />

              <div>

                <h3 className="text-3xl font-bold">
                  {goal}
                </h3>

                <p className="text-sm text-white/70">
                  Goal
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <BookOpen className="text-cyan-300" />

              <div>

                <h3 className="text-3xl font-bold">
                  {reading}
                </h3>

                <p className="text-sm text-white/70">
                  Reading
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Flame className="text-orange-300" />

              <div>

                <h3 className="text-3xl font-bold">
                  {completed}
                </h3>

                <p className="text-sm text-white/70">
                  Completed
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <Heart className="text-pink-300" />

              <div>

                <h3 className="text-3xl font-bold">
                  {favorites}
                </h3>

                <p className="text-sm text-white/70">
                  Favorites
                </p>

              </div>

            </div>

          </div>

        </div>


        <div className="relative hidden h-72 w-72 items-center justify-center lg:flex">

          <div className="absolute h-72 w-72 rounded-full bg-white/5" />

          <div className="absolute bottom-10 flex">

            <div className="h-36 w-24 rounded-l-xl bg-white/10 backdrop-blur-md shadow-xl" />

            <div className="h-36 w-24 rounded-r-xl bg-white/15 backdrop-blur-md shadow-xl" />

          </div>

          <div className="absolute bottom-12 right-4 flex gap-2 opacity-60">

            <div className="h-32 w-8 rounded-lg bg-white/20" />

            <div className="h-36 w-8 rounded-lg bg-white/15" />

            <div className="h-28 w-8 rounded-lg bg-white/25" />

          </div>

          <div className="absolute left-6 top-16 h-10 w-10 rounded-full border-2 border-white/20" />

          <div className="absolute right-8 top-8 opacity-30">

            <div className="h-5 w-5 rounded-full bg-white/30" />

            <div className="mx-auto mt-1 h-12 w-1 rounded-full bg-white/30" />

          </div>

        </div>

      </div>

    </section>
  );
}