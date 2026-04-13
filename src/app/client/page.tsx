"use client";

import {
  ArrowLeft,
  Building2,
  Users,
  Zap,
  CheckCircle2,
  SearchCode,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export default function ClientPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#0F1117] font-sans">
      <main className="flex flex-1 w-full max-w-7xl gap-3 flex-col items-center py-32 px-16 sm:items-start">
        <Link href="/">
          <motion.button
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 hover:cursor-pointer transition-colors mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowLeft size={20} />
            Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ duration: 0.4 }}
        >
          <p className="text-slate-400 text-lg mb-2">Client Information</p>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="text-[#3B4FBF]" size={32} />
            <h1 className="text-4xl font-bold">Meridian Nexus Group Ltd</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Operations, requirements, and business challenges
          </p>

          <div className="space-y-8 text-slate-300">
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="text-[#3B4FBF]" size={24} />
                <h2 className="text-2xl font-semibold text-slate-200">
                  About the Client
                </h2>
              </div>
              <p className="text-justify">
                In this case study, Meridian Nexus Group Ltd commissioned the
                development of a custom business management platform to support
                their expanding client and project portfolio. The client is
                modeled after real-world TaaS agencies and Filipino agencies
                alike. As stated in the study, the organization sought a unified
                solution to replace the fragmented tools they had been relying
                on and bring operational consistency across the entire company.
              </p>
            </motion.section>

            <div className="grid grid-cols-3 gap-6 w-full">
              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                transition={{ duration: 0.4, delay: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="text-[#3B4FBF]" size={24} />
                  <h2 className="text-2xl font-semibold text-slate-200">
                    Core Operations
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    "Freelancer acquisition and onboarding",
                    "Service delivery management and coordination",
                    "Client relationship and project management",
                    "Financial settlement and payout processing",
                    "Community building and engagement",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-slate-200 shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <SearchCode className="text-[#3B4FBF]" size={24} />
                  <h2 className="text-2xl font-semibold text-slate-200">
                    Business Challenge
                  </h2>
                </div>
                <p className="text-slate-300 mb-4 text-justify">
                  The main challenge was the fragmented tools causing
                  inefficiencies and communication gaps
                </p>
                <p className="text-justify">
                  The agency was juggling between project management tools, time
                  trackers, client portals, and invoicing software. This
                  fragmentation led to inefficiencies, data silos, and
                  communication gaps between teams and clients.
                </p>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-[#3B4FBF]" size={24} />
                  <h2 className="text-2xl font-semibold text-slate-200">
                    Key Requirements
                  </h2>
                </div>
                <div className="space-y-3">
                  {[
                    "Unified ledger system for comprehensive financial tracking",
                    "Real-time operational visibility and reporting",
                    "Seamless freelancer lifecycle management",
                    "Reliable audit trails and compliance documentation",
                    "Scalable architecture for growth",
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={20}
                        className="text-slate-200 shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
