"use client";

import { User, Save, Lock } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useProfile } from "@/utils/hooks/useProfile";

type SaveActionState = { ok: boolean; message: string };

export default function AccountPage() {
  const { profile, loading, error, fetchProfile, updateProfile } = useProfile();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const [saveState, formAction, isPending] = useActionState<
    SaveActionState,
    FormData
  >(
    async (_previousState, formData) => {
      const getOptional = (name: string) => {
        const value = formData.get(name);
        if (typeof value !== "string") return null;

        const trimmed = value.trim();
        return trimmed.length > 0 ? trimmed : null;
      };

      const updated = await updateProfile({
        first_name: getOptional("first_name"),
        middle_name: getOptional("middle_name"),
        last_name: getOptional("last_name"),
        username: getOptional("username"),
        phone: getOptional("phone"),
        birthday: getOptional("birthday"),
        bio: getOptional("bio"),
      });

      if (updated) {
        return { ok: true, message: "Your account details were saved." };
      }

      return { ok: false, message: "Please review your profile values." };
    },
    { ok: false, message: "" },
  );

  useEffect(() => {
    if (!saveState.message) return;
    if (saveState.ok) {
      showSuccessToast("Profile updated", saveState.message);
      return;
    }
    showErrorToast("Update failed", saveState.message);
  }, [saveState]);

  if (loading)
    return (
      <div className="w-full text-sm font-medium text-slate-500">
        Loading profile...
      </div>
    );

  return (
    <form
      className="space-y-6"
      key={profile?.updated_at ?? "profile-form"}
      action={formAction}
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-800 flex flex-row gap-2">
          <User size={24} className="text-[#3B4FBF]" />
          Account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Modify your account & profile details here, and view other important
          personal information in relation to the application.
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          Credentials
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-700">
            Email Address <span className="text-rose-600">*</span>
            <input
              type="email"
              defaultValue={profile?.email ?? ""}
              readOnly
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
            />
          </label>

          <label className="block text-sm text-slate-700">
            Role <span className="text-rose-600">*</span>
            <div className="mt-1">
              <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                {profile?.role ?? "guest"}
              </span>
            </div>
          </label>

          <label className="block text-sm text-slate-700 md:col-span-2">
            User ID <span className="text-rose-600">*</span>
            <span className="mt-1 block rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-xs text-slate-700">
              {profile?.id ?? "Unavailable"}
            </span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">
          Profile Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-700">
            First Name
            <input
              type="text"
              name="first_name"
              placeholder="Your first name here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.first_name ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700">
            Middle Name
            <input
              type="text"
              name="middle_name"
              placeholder="Your middle name here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.middle_name ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700">
            Last Name
            <input
              type="text"
              name="last_name"
              placeholder="Your last name here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.last_name ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700">
            Username
            <input
              type="text"
              name="username"
              placeholder="Your username here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.username ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700">
            Phone
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.phone ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700">
            Birthday
            <input
              type="date"
              name="birthday"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.birthday ?? ""}
            />
          </label>

          <label className="block text-sm text-slate-700 md:col-span-2">
            Bio
            <textarea
              name="bio"
              rows={3}
              placeholder="Your short bio here..."
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#3B4FBF]"
              defaultValue={profile?.bio ?? ""}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-[#3B4FBF] px-4 py-2 text-sm font-semibold text-white transition hover:cursor-pointer hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={15} />
          {isPending ? "Saving..." : "Save Changes"}
        </button>

        <div className="flex flex-row gap-2">
          <a
            href="/polaris/auth/change-password"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:cursor-pointer hover:bg-slate-50"
          >
            <Lock size={15} />
            Change Password
          </a>
        </div>
      </div>
    </form>
  );
}
