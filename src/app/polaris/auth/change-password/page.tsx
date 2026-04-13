"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import Layout from "@/layouts/AuthLayout";
import {
  passesPasswordRule,
  PASSWORD_RULE_MESSAGE,
} from "@/utils/validation/auth";

interface ChangePasswordPayload {
  ChangeCurrentPassword: string;
  ChangeNewPassword: string;
  ChangeConfirmNewPassword: string;
}

const MOCK_CURRENT_PASSWORD = "Password123";

export default function ChangePasswordPage() {
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordPayload>({
      ChangeCurrentPassword: "",
      ChangeNewPassword: "",
      ChangeConfirmNewPassword: "",
    });
  const [changePasswordErrors, setChangePasswordErrors] = useState<string[]>(
    [],
  );

  const handleChangePasswordInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    if (changePasswordErrors.length > 0) {
      setChangePasswordErrors([]);
    }

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

    const errors: string[] = [];

    // Placeholder check until auth/session verification is wired up.
    if (changePasswordForm.ChangeCurrentPassword !== MOCK_CURRENT_PASSWORD) {
      errors.push("Current Password: old password is incorrect.");
    }

    if (!passesPasswordRule(changePasswordForm.ChangeNewPassword)) {
      errors.push(`New Password: ${PASSWORD_RULE_MESSAGE}`);
    }

    if (
      changePasswordForm.ChangeNewPassword !==
      changePasswordForm.ChangeConfirmNewPassword
    ) {
      errors.push("Confirm New Password: must match New Password.");
    }

    if (errors.length > 0) {
      setChangePasswordErrors(errors);
      return;
    }

    setChangePasswordErrors([]);
    console.log("Change password payload", changePasswordForm);
  };

  return (
    <Layout cardTitle="Change Password">
      <form className="space-y-4" onSubmit={handleChangePasswordSubmit}>
        {changePasswordErrors.length > 0 && (
          <div
            role="alert"
            className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          >
            <p className="font-semibold">Invalid input fields:</p>
            <ul className="mt-1 list-disc pl-5">
              {changePasswordErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Current password
          </label>
          <input
            type="password"
            name="ChangeCurrentPassword"
            placeholder="Current password"
            value={changePasswordForm.ChangeCurrentPassword}
            onChange={handleChangePasswordInputChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
          <p className="mt-1 text-xs text-gray-500">
            Demo only for now: current password is Password123.
          </p>
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
            name="ChangeConfirmNewPassword"
            placeholder="Confirm new password"
            value={changePasswordForm.ChangeConfirmNewPassword}
            onChange={handleChangePasswordInputChange}
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
