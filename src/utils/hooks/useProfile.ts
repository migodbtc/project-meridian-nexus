"use client";

import { useCallback, useState } from "react";
import type { ProfileResponse, ProfileUpdatePayload } from "@/types/profile";

export function useProfile() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/settings/profile");

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      const data: ProfileResponse = await response.json();
      setProfile(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch profile";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (payload: ProfileUpdatePayload) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          (Array.isArray(data?.errors) && data.errors.join(" ")) ||
          data?.error ||
          `HTTP ${response.status}`;
        throw new Error(message);
      }

      const updated = data.profile as ProfileResponse;
      setProfile(updated);
      return updated;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
      return null;
    } finally {
      setSaving(false);
    }
  }, []);

  return { profile, loading, saving, error, fetchProfile, updateProfile };
}
