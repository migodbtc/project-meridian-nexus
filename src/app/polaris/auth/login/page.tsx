"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Check, Lock, LogIn, Mail } from "lucide-react";
import { useFormStatus } from "react-dom";
import Layout from "@/layouts/AuthLayout";
import { isValidEmailFormat } from "@/utils/validation/auth";
import { LoginPayload } from "@/types/auth";
import { queueFlashToast, showErrorToast, useFlashToast } from "@/utils/toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogIn size={18} />
      {pending ? "SIGNING IN..." : "SIGN IN"}
    </button>
  );
}

function LoginPageContent() {
  const router = useRouter();
  useFlashToast();
  const [loginForm, setLoginForm] = useState<LoginPayload>({
    LoginEmail: "",
    LoginPassword: "",
    LoginRememberMe: false,
  });

  const handleLoginInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setLoginForm(
      (prev) =>
        ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }) as LoginPayload,
    );
  };

  const loginAction = async (prevState: string[], loginFormData: FormData) => {
    void prevState;
    void loginFormData;

    const errors: string[] = [];

    if (!isValidEmailFormat(loginForm.LoginEmail)) {
      errors.push("Email: invalid email format.");
    }

    if (errors.length > 0) return errors;

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (!res.ok) return [data.error || "Login failed"];

      queueFlashToast({
        type: "success",
        title: "Login success!",
        description: "Authentication is a success, welcome back to Polaris!",
      });
      router.push("/polaris/dash");
      return [];
    } catch (err) {
      console.error("Login error:", err);
      return ["An error occurred. Please try again."];
    }
  };

  const [loginErrors, action] = useActionState(loginAction, []);

  useEffect(() => {
    if (loginErrors.length === 0) return;
    showErrorToast("Error encountered!", loginErrors.join(" "));
  }, [loginErrors]);

  return (
    <Layout cardTitle="Login to Polaris">
      <form className="space-y-4" action={action}>
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={18} />
            Email
          </label>
          <input
            type="email"
            name="LoginEmail"
            placeholder="you@example.com"
            value={loginForm.LoginEmail}
            onChange={handleLoginInputChange}
            autoComplete="email"
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Password
          </label>
          <input
            type="password"
            name="LoginPassword"
            placeholder="••••••••"
            value={loginForm.LoginPassword}
            onChange={handleLoginInputChange}
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              name="LoginRememberMe"
              className="peer sr-only"
              checked={loginForm.LoginRememberMe}
              onChange={handleLoginInputChange}
            />
            <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 transition peer-checked:border-[#3B4FBF] peer-checked:bg-[#3B4FBF]">
              <Check size={13} className="text-white" />
            </span>
            Remember me
          </label>

          <Link
            href="/polaris/auth/forgot-password"
            className="text-sm text-[#3B4FBF] transition hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <SubmitButton />
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/polaris/auth/register"
          className="font-semibold text-[#3B4FBF] hover:underline"
        >
          Sign up
        </Link>
      </p>
      <p className="text-center text-sm text-gray-500">
        Want to go back to the main page? Click{" "}
        <Link href="/" className="font-semibold text-[#3B4FBF] hover:underline">
          here
        </Link>
      </p>
    </Layout>
  );
}

export default function LoginPage() {
  return <LoginPageContent />;
}
