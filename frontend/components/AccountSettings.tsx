"use client";

import { useEffect, useState } from "react";

import { Mail, User } from "lucide-react";

import { getMe } from "@/services/auth.service";

interface UserData {
  name: string;
  email: string;
}

export default function AccountSettings() {
  const [user, setUser] = useState<UserData | null>(null);

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
    <div className="rounded-3xl border bg-card p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Account Information
      </h2>

      <p className="mt-2 text-muted-foreground">
        Your account details.
      </p>

      <div className="mt-8 space-y-6">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-primary/10 p-3">

            <User className="text-primary" />

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Name
            </p>

            <h3 className="font-semibold">
              {user?.name || "Loading..."}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-primary/10 p-3">

            <Mail className="text-primary" />

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <h3 className="font-semibold">
              {user?.email || "Loading..."}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}