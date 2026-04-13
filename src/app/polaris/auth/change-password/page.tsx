"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import Layout from "@/layouts/AuthLayout";

interface ChangePasswordPayload {
  ChangeNewPassword: string;
}

export default function ChangePasswordPage() {
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordPayload>({
      ChangeNewPassword: "",
    });

  const handleChangePasswordInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setChangePasswordForm(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        }) as ChangePasswordPayload,
    );
  };

  const handleChangePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Change password payload", changePasswordForm);
  };

  return (
    <Layout cardTitle="Change Password">
      <form className="space-y-4" onSubmit={handleChangePasswordSubmit}>
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Current password
          </label>
          <input
            type="password"
            placeholder="Current password"
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            New password
          </label>
          <input
            type="password"
            name="ChangeNewPassword"
            placeholder="New password"
            value={changePasswordForm.ChangeNewPassword}
            onChange={handleChangePasswordInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Confirm new password
          </label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95"
        >
          <KeyRound size={18} />
          UPDATE PASSWORD
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Need reset link instead?{" "}
        <Link
          href="/polaris/auth/forgot-password"
          className="font-semibold text-[#3B4FBF] hover:underline"
        >
          Forgot password
        </Link>
      </p>
    </Layout>
  );
}
