"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import Layout from "@/layouts/AuthLayout";

interface ForgotPasswordPayload {
  ForgotPasswordEmail: string;
}

export default function ForgotPasswordPage() {
  const [forgotPasswordForm, setForgotPasswordForm] =
    useState<ForgotPasswordPayload>({
      ForgotPasswordEmail: "",
    });

  const handleForgotPasswordInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setForgotPasswordForm(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as ForgotPasswordPayload,
    );
  };

  const handleForgotPasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Forgot password payload", forgotPasswordForm);
  };

  return (
    <Layout cardTitle="Forgot Password">
      <p className="mb-4 text-sm text-gray-600">
        Enter account email. We send password reset link.
      </p>

      <form className="space-y-4" onSubmit={handleForgotPasswordSubmit}>
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={18} />
            Email
          </label>
          <input
            type="email"
            name="ForgotPasswordEmail"
            placeholder="you@example.com"
            value={forgotPasswordForm.ForgotPasswordEmail}
            onChange={handleForgotPasswordInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95"
        >
          <Send size={18} />
          SEND RESET LINK
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remember password?{" "}
        <Link
          href="/polaris/auth/login"
          className="font-semibold text-[#3B4FBF] hover:underline"
        >
          Go to login
        </Link>
      </p>
    </Layout>
  );
}
