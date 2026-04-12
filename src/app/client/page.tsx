"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ClientPage() {
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
              Client Overview
            </span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            Meridian Nexus Group Ltd - Operations & Requirements
          </p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                About Meridian Nexus Group Ltd
              </h2>
              <p>
                Meridian Nexus Group Ltd is a Managed Talent-as-a-Service (TaaS)
                agency operating in the modern gig economy space. The
                organization connects, manages, and empowers freelancers while
                facilitating seamless project delivery to enterprise and
                mid-market clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Core Operations
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Freelancer acquisition and onboarding</li>
                <li>Service delivery management and coordination</li>
                <li>Client relationship and project management</li>
                <li>Financial settlement and payout processing</li>
                <li>Community building and engagement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Business Challenge
              </h2>
              <p className="text-amber-300 font-medium mb-2">
                Disconnected tools causing financial drift and operational
                blindness
              </p>
              <p>
                The organization faces critical challenges due to fragmented
                technology infrastructure, leading to incomplete financial
                visibility and operational inefficiencies across the entire
                freelancer lifecycle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Key Requirements
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>
                  Unified ledger system for comprehensive financial tracking
                </li>
                <li>Real-time operational visibility and reporting</li>
                <li>Seamless freelancer lifecycle management</li>
                <li>Reliable audit trails and compliance documentation</li>
                <li>Scalable architecture for growth</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
