"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  registerSchema,
  LoginFormData,
  RegisterFormData,
} from "@/lib/validations/auth.schema";

import { login, register } from "@/services/auth.service";

import { toast } from "sonner";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const isLogin = type === "login";

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | RegisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data: LoginFormData | RegisterFormData) => {
    try {
      setLoading(true);

      if (isLogin) {
        await login(data as LoginFormData);

        toast.success("Login Successful");
      } else {
        const registerData = data as RegisterFormData;

        await register({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        });

        toast.success("Account Created");
      }

      const redirectPath = "/dashboard";

      toast.success(
        isLogin ? "Login successful!" : "Account created successfully!"
      );

      router.push(redirectPath);

      setTimeout(() => {
        router.refresh();
      }, 100);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-xl">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <BookOpen size={28} />
        </div>

        <h1 className="text-4xl font-bold text-foreground">
          Bindery
        </h1>

        <h2 className="mt-3 text-3xl font-bold text-foreground">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="mt-2 text-center text-muted-foreground">
          {isLogin
            ? "Sign in to continue your reading journey."
            : "Start building your personal library today."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {!isLogin && (
          <div>
            <Input
              placeholder="Full Name"
              {...registerField("name")}
            />

            <p className="mt-1 text-sm text-red-500">
              {"name" in errors && errors.name?.message}
            </p>
          </div>
        )}

        <div>
          <Input
            type="email"
            placeholder="Email Address"
            {...registerField("email")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...registerField("password")}
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        {!isLogin && (
          <div>
            <Input
              type="password"
              placeholder="Confirm Password"
              {...registerField("confirmPassword")}
            />

            <p className="mt-1 text-sm text-red-500">
              {"confirmPassword" in errors &&
                errors.confirmPassword?.message}
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-2xl text-base"
        >
          {loading
            ? "Please wait..."
            : isLogin
              ? "Sign In"
              : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
}