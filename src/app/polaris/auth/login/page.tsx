"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Check, Lock, LogIn, Mail } from "lucide-react";
import Layout from "@/layouts/AuthLayout";

interface LoginPayload {
  LoginEmail: string;
  LoginPassword: string;
  LoginRememberMe: boolean;
}

export default function LoginPage() {
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

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login payload", loginForm);
  };

  return (
    <Layout cardTitle="Login to Polaris">
      <form className="space-y-4" onSubmit={handleLoginSubmit}>
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

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95"
        >
          <LogIn size={18} />
          SIGN IN
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/polaris/auth/register"
          className="font-semibold text-[#3B4FBF] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </Layout>
  );
}
