"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { Check, Lock, Mail, UserPlus } from "lucide-react";
import Layout from "@/layouts/AuthLayout";
import {
  isValidEmailFormat,
  passesPasswordRule,
  PASSWORD_RULE_MESSAGE,
} from "@/utils/validation/auth";

interface RegisterPayload {
  RegisterEmail: string;
  RegisterPassword: string;
  RegisterConfirmPassword: string;
  RegisterAgreeToTerms: boolean;
}

export default function RegisterPage() {
  const [registerForm, setRegisterForm] = useState<RegisterPayload>({
    RegisterEmail: "",
    RegisterPassword: "",
    RegisterConfirmPassword: "",
    RegisterAgreeToTerms: false,
  });
  const [registerErrors, setRegisterErrors] = useState<string[]>([]);

  const handleRegisterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    if (registerErrors.length > 0) {
      setRegisterErrors([]);
    }

    setRegisterForm(
      (prev) =>
        ({
          ...prev,
          [name]: type === "checkbox" ? checked : value,
        }) as RegisterPayload,
    );
  };

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: string[] = [];

    if (!isValidEmailFormat(registerForm.RegisterEmail)) {
      errors.push("Email: invalid email format.");
    }

    if (!passesPasswordRule(registerForm.RegisterPassword)) {
      errors.push(`Password: ${PASSWORD_RULE_MESSAGE}`);
    }

    if (
      registerForm.RegisterPassword !== registerForm.RegisterConfirmPassword
    ) {
      errors.push("Confirm Password: must match Password.");
    }

    if (errors.length > 0) {
      setRegisterErrors(errors);
      return;
    }

    setRegisterErrors([]);
    alert("You thought you was do somethin 🤣🤣🫵🫵");
    console.log("Register payload", registerForm);
  };

  return (
    <Layout cardTitle="Register">
      <form className="space-y-4" onSubmit={handleRegisterSubmit}>
        {registerErrors.length > 0 && (
          <div
            role="alert"
            className="rounded-lg border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800"
          >
            <p className="font-semibold">Invalid input fields:</p>
            <ul className="mt-1 list-disc pl-5">
              {registerErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail size={18} />
            Email
          </label>
          <input
            type="email"
            name="RegisterEmail"
            placeholder="you@example.com"
            value={registerForm.RegisterEmail}
            onChange={handleRegisterInputChange}
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
            name="RegisterPassword"
            placeholder="Create password"
            value={registerForm.RegisterPassword}
            onChange={handleRegisterInputChange}
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Lock size={18} />
            Confirm password
          </label>
          <input
            type="password"
            name="RegisterConfirmPassword"
            placeholder="Repeat password"
            value={registerForm.RegisterConfirmPassword}
            onChange={handleRegisterInputChange}
            className="w-full rounded-lg border border-gray-300 text-slate-800 px-4 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            name="RegisterAgreeToTerms"
            className="peer sr-only"
            checked={registerForm.RegisterAgreeToTerms}
            onChange={handleRegisterInputChange}
          />
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 transition peer-checked:border-[#3B4FBF] peer-checked:bg-[#3B4FBF]">
            <Check size={13} className="text-white" />
          </span>
          I agree to terms and privacy policy
        </label>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#3B4FBF] to-amber-400 py-2 font-semibold text-white transition hover:opacity-95"
        >
          <UserPlus size={18} />
          CREATE ACCOUNT
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Already have account?{" "}
        <Link
          href="/polaris/auth/login"
          className="font-semibold text-[#3B4FBF] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </Layout>
  );
}
