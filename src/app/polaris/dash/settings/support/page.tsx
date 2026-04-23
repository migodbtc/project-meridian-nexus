"use client";

import Link from "next/link";
import {
  MessageSquareText,
  Mail,
  Code,
  Package,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const openModal = (type: "privacy" | "terms") => (e: any) => {
    e?.preventDefault();
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Support</h2>
        <p className="mt-1 text-sm text-slate-500">
          Help, references, and project context.
        </p>
      </div>

      <div className="text-sm flex flex-col gap-2">
        <h3 className="font-semibold text-slate-800">Contacts</h3>
        <p className="w-full text-slate-700">
          Reach out to the developer with the information below.
        </p>
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="w-full flex flex-row gap-2">
            <MessageSquareText size={20} />
            Instagram Page
          </div>
          <div className="w-full">
            <Link
              href="https://www.instagram.com/communeye.software"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B4FBF] font-semibold hover:underline"
            >
              @communeye.software
            </Link>
          </div>
          <div className="w-full flex flex-row gap-2">
            <Mail size={20} />
            Email Address
          </div>
          <div className="w-full">communeye@proton.me</div>
          <div className="w-full flex flex-row gap-2">
            <Code size={20} />
            Founder GitHub
          </div>
          <div className="w-full">@mxgo.dbtc</div>
        </div>
      </div>

      <div className="text-sm flex flex-col gap-2">
        <h3 className="font-semibold text-slate-800">System Information</h3>
        <p className="w-full text-slate-700">
          Information regarding the system can be found here
        </p>
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="w-full flex flex-row gap-2">
            <Package size={20} />
            App Version
          </div>
          <div className="w-full">1.0.0</div>

          <div className="w-full flex flex-row gap-2">
            <ShieldCheck size={20} />
            Privacy Policy
          </div>
          <div className="w-full">
            <a
              href="#"
              onClick={openModal("privacy")}
              className="text-[#3B4FBF] font-semibold hover:underline"
            >
              here
            </a>
          </div>

          <div className="w-full flex flex-row gap-2">
            <FileText size={20} />
            Terms of Service
          </div>
          <div className="w-full">
            <a
              href="#"
              onClick={openModal("terms")}
              className="text-[#3B4FBF] font-semibold hover:underline"
            >
              here
            </a>
          </div>
        </div>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 max-w-2xl rounded-lg bg-white p-6">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                {modalType === "privacy"
                  ? "Privacy Policy"
                  : "Terms of Service"}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-4 text-sm text-slate-700">
              <p>
                Placeholder content for the{" "}
                {modalType === "privacy"
                  ? "Privacy Policy"
                  : "Terms of Service"}
                .
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="inline-flex items-center gap-2 rounded-lg bg-[#3B4FBF] px-4 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
