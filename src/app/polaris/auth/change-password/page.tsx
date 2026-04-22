"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import { useFormStatus } from "react-dom";
import Layout from "@/layouts/AuthLayout";
import { showErrorToast, queueFlashToast } from "@/utils/toast";
import { ChangePasswordPayload } from "@/types/auth";

/**
 * SubmitButton component that displays the password update submit button.
 * Shows loading state ("UPDATING...") while form submission is pending.
 */
function SubmitButton({ isRedirecting }: { isRedirecting: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isRedirecting;
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <KeyRound size={18} />
      {pending ? "UPDATING..." : "UPDATE PASSWORD"}
    </button>
  );
}

/**
 * ChangePasswordPage component for authenticated users to update their password.
 * Validates current password, new password, and confirmation match before submitting to the API.
 * On success, redirects to settings page; on error, displays toast notification.
 */
export default function ChangePasswordPage() {
  // External Hooks/Contexts
  const router = useRouter();

  // Form State
  const [changePasswordForm, setChangePasswordForm] =
    useState<ChangePasswordPayload>({
      ChangeCurrentPassword: "",
      ChangeNewPassword: "",
      ChangeConfirmNewPassword: "",
    });
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handler Actions
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

  // Handler Actions (Async)
  const changePasswordAction = async (
    prevState: string[],
    changePasswordFormData: FormData,
  ) => {
    void prevState;
    void changePasswordFormData;

    const errors: string[] = [];

    if (!changePasswordForm.ChangeCurrentPassword) {
      errors.push("Current password is required");
    }

    if (!changePasswordForm.ChangeNewPassword) {
      errors.push("New password is required");
    }

    if (!changePasswordForm.ChangeConfirmNewPassword) {
      errors.push("Password confirmation is required");
    }

    if (
      changePasswordForm.ChangeNewPassword !==
      changePasswordForm.ChangeConfirmNewPassword
    ) {
      errors.push("New passwords do not match");
    }

    if (errors.length > 0) return errors;

    try {
      const response = await fetch("/api/auth/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: changePasswordForm.ChangeCurrentPassword,
          newPassword: changePasswordForm.ChangeNewPassword,
          confirmPassword: changePasswordForm.ChangeConfirmNewPassword,
        }),
      });

      const result = await response.json();

      if (!result.success)
        return result.errors || ["Failed to change password"];

      queueFlashToast({
        type: "success",
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/polaris/dash/settings");
      }, 500);
      return [];
    } catch (err) {
      console.error("Change password error:", err);
      return ["An error occurred. Please try again."];
    }
  };

  // Action State
  const [changePasswordErrors, action] = useActionState(
    changePasswordAction,
    [],
  );

  // Effects
  useEffect(() => {
    if (changePasswordErrors.length === 0) return;
    showErrorToast("Error encountered!", changePasswordErrors.join(" "));
  }, [changePasswordErrors]);

  return (
    <Layout cardTitle="Change Password">
      <div className={isRedirecting ? "pointer-events-none opacity-50" : ""}>
        <form className="space-y-4" action={action}>
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
              disabled={isRedirecting}
              className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isRedirecting}
              className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isRedirecting}
              className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <SubmitButton isRedirecting={isRedirecting} />
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Okay with your password?{" "}
          <Link
            href="/polaris/dash/settings"
            className="font-semibold text-[#3B4FBF] hover:underline"
          >
            Back to Settings
          </Link>
        </p>
      </div>
    </Layout>
  );
}
