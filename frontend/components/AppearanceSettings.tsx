"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Monitor, Moon, Sun } from "lucide-react";

export default function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Appearance
      </h2>

      <p className="mt-2 text-muted-foreground">
        Choose how Bindery looks.
      </p>

      <div className="mt-6 flex gap-4">

        <div className="flex gap-3">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
            className="min-w-28"
          >
            <Sun className="mr-2 h-4 w-4" />
            Light
          </Button>

          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
            className="min-w-28"
          >
            <Moon className="mr-2 h-4 w-4" />
            Dark
          </Button>

          <Button
            variant={theme === "system" ? "default" : "outline"}
            onClick={() => setTheme("system")}
            className="min-w-28"
          >
            <Monitor className="mr-2 h-4 w-4" />
            System
          </Button>
        </div>

      </div>

    </div>
  );
}