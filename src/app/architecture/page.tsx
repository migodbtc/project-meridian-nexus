"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#0F1117] font-sans">
      <main className="flex flex-1 w-full max-w-7xl gap-3 flex-col items-center py-32 px-16 sm:items-start">
        <Link href="/">
          <motion.button
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-linear-to-r from-[#3B4FBF] to-amber-400 bg-clip-text text-transparent">
              System Architecture
            </span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Technologies, Tools, & Building Blocks
          </p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Tech Stack Overview
              </h2>
              <p>
                The unified web engine is built on a modern, scalable technology
                stack designed for high performance, reliability, and
                maintainability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Frontend Layer
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Next.js 16.2.3</strong> - React framework with SSR/SSG
                  capabilities
                </li>
                <li>
                  <strong>React 19.2.4</strong> - UI library with server/client
                  components
                </li>
                <li>
                  <strong>Tailwind CSS v4</strong> - Utility-first styling
                  framework
                </li>
                <li>
                  <strong>Framer Motion v12.38.0</strong> - Animation library
                </li>
                <li>
                  <strong>Lucide React v1.8.0</strong> - Icon system
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Backend Layer
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Supabase</strong> - PostgreSQL database with real-time
                  subscriptions
                </li>
                <li>
                  <strong>Next.js API Routes</strong> - Serverless backend
                  functions
                </li>
                <li>Authentication and authorization services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Infrastructure
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  <strong>Vercel</strong> - Edge-first cloud platform for
                  deployment
                </li>
                <li>Global CDN for optimized content delivery</li>
                <li>Continuous deployment from Git</li>
                <li>Automatic scaling and error tracking</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Key Architectural Principles
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Full-stack TypeScript for type safety and developer experience
                </li>
                <li>
                  Server and client component separation for optimal performance
                </li>
                <li>Real-time data synchronization through Supabase</li>
                <li>Responsive design with mobile-first approach</li>
                <li>
                  Accessibility and performance-optimized component architecture
                </li>
              </ul>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
