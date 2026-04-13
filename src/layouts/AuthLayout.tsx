"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type LayoutProps = {
  cardTitle: string;
  children: ReactNode;
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Layout({
  cardTitle,
  children,
  showBack = false,
  backHref = "/polaris",
  backLabel = "Back",
}: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 py-12 font-sans">
      <motion.div
        className="flex w-full max-w-lg flex-col items-center gap-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.4 }}
      >
        {showBack ? (
          <div className="w-full">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-700"
            >
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </div>
        ) : null}

        <div className="text-center">
          <p className="text-sm text-slate-700">The unified TaaS web engine</p>
          <h1 className="text-5xl font-bold">
            <span className="bg-linear-to-r from-[#3B4FBF] to-amber-400 bg-clip-text text-transparent">
              POLARIS
            </span>
          </h1>
        </div>

        <motion.div
          className="w-full rounded-xl border-2 border-slate-300 p-8"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
        >
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">
            {cardTitle}
          </h2>
          {children}
        </motion.div>
      </motion.div>

      <motion.footer
        className="mt-8 text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        © 2026 Communeye Software
      </motion.footer>
    </div>
  );
}
