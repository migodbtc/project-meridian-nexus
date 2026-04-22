"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { Mail, Send } from "lucide-react";
import { useFormStatus } from "react-dom";
import Layout from "@/layouts/AuthLayout";
import { isValidEmailFormat } from "@/utils/validation/auth";
import { queueFlashToast, showErrorToast } from "@/utils/toast";
import { ForgotPasswordPayload } from "@/types/auth";

/**
 * SubmitButton component that displays the password reset submit button.
 * Shows loading state ("SENDING...") while form submission is pending.
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
      <Send size={18} />
      {pending ? "SENDING..." : "SEND RESET LINK"}
    </button>
  );
}

/**
 * ForgotPasswordPage component for users to request a password reset.
 * Validates email format and submits to the API for reset link delivery.
 * On error, displays toast notification.
 */
export default function ForgotPasswordPage() {
  // External Hooks/Contexts
  const router = useRouter();

  // Form State
  const [forgotPasswordForm, setForgotPasswordForm] =
    useState<ForgotPasswordPayload>({
      ForgotPasswordEmail: "",
    });
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Handler Actions
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

  // Handler Actions (Async)
  const forgotPasswordAction = async (
    prevState: string[],
    forgotPasswordFormData: FormData,
  ) => {
    void prevState;

    const email = (forgotPasswordFormData.get("ForgotPasswordEmail") || "")
      .toString()
      .trim();

    const errors: string[] = [];

    if (!isValidEmailFormat(email)) {
      errors.push("Email: invalid email format.");
    }

    if (errors.length > 0) return errors;

    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ForgotPasswordEmail: email }),
      });

      const data = await res.json();

      if (!data.success)
        return data.errors || [data.error || "Failed to send reset link"];

      queueFlashToast({
        type: "success",
        title: "Reset link sent",
        description: "Check your email for a password reset link.",
      });
      setIsRedirecting(true);
      setTimeout(() => {
        router.push("/polaris/auth/login");
      }, 500);

      return [];
    } catch (err) {
      console.error("Forgot password error:", err);
      return ["An error occurred. Please try again."];
    }
  };

  // Action State
  const [forgotPasswordErrors, action] = useActionState(
    forgotPasswordAction,
    [],
  );

  // Effects
  useEffect(() => {
    if (forgotPasswordErrors.length === 0) return;
    showErrorToast("Error encountered!", forgotPasswordErrors.join(" "));
  }, [forgotPasswordErrors]);

  return (
    <Layout cardTitle="Forgot Password">
      <div className={isRedirecting ? "pointer-events-none opacity-50" : ""}>
        <p className="mb-4 text-sm text-gray-600">
          Enter your account email on the input, and we will send you the
          password reset link to the associated email address.
        </p>

        <form className="space-y-4" action={action}>
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
              autoComplete="email"
              disabled={isRedirecting}
              className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <SubmitButton isRedirecting={isRedirecting} />
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
      </div>
    </Layout>
  );
}
