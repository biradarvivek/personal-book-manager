"use client";

import { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { getMe } from "@/services/auth.service";

interface User {
  name: string;
  email: string;
}

interface AppNavbarProps {
  onMenuClick: () => void;
}

export default function AppNavbar({
  onMenuClick,
}: AppNavbarProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="sticky top-0 z-30 mb-8 flex h-20 items-center justify-between rounded-3xl border border-border/50 bg-background/80 px-4 shadow-sm backdrop-blur-xl sm:px-8">

      <button
        onClick={onMenuClick}
        className="rounded-xl border p-2 lg:hidden"
      >
        <Menu size={22} />
      </button>

      <div className="ml-auto flex items-center gap-5">

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border bg-card transition hover:bg-muted">
          <Bell size={20} />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-10 w-px bg-border sm:block" />

        <div className="flex items-center gap-4 rounded-2xl border bg-card px-3 py-2 shadow-sm sm:px-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-bold text-white">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div className="hidden leading-tight sm:block">

            <h3 className="font-semibold">

              {user?.name ?? "Loading..."}

            </h3>

            <p className="text-sm text-muted-foreground">

              {user?.email}

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}