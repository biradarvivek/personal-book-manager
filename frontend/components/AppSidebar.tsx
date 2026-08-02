"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BookOpen,
  LayoutDashboard,
  Library,
  BarChart3,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";

import { logout } from "@/services/auth.service";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Library",
    href: "/library",
    icon: Library,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

interface AppSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AppSidebar({
  open,
  onClose,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />


      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-border
          bg-background
          px-5
          py-6
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <div className="mb-4 flex justify-end lg:hidden">
          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-muted"
          >
            <X size={22} />
          </button>
        </div>


        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BookOpen size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Bindery
            </h1>

            <p className="text-sm text-muted-foreground">
              Your Personal Library
            </p>
          </div>
        </div>


        <nav className="mt-12 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:bg-white hover:text-primary hover:shadow-md"
                }`}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-3 font-medium text-red-500 transition-all hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}