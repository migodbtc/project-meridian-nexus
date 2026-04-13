"use client";

import { ArrowLeft, User, Code, Mail, ExternalLink } from "lucide-react";
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

export default function DeveloperPage() {
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
          <p className="text-slate-400 text-lg mb-2">About the Developer</p>
          <div className="flex items-center gap-3 mb-2">
            <User className="text-[#3B4FBF]" size={32} />
            <h1 className="text-4xl font-bold">Communeye Software</h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Full-stack development and digital solutions studio
          </p>

          <div className="space-y-8 text-slate-300">
            <div className="grid grid-cols-2 gap-6 w-full">
              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                transition={{ duration: 0.4, delay: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-[#3B4FBF]" size={24} />
                  <h2 className="text-2xl font-semibold text-slate-200">
                    Overview
                  </h2>
                </div>
                <p className="text-justify">
                  Communeye Software is a software solutions brand that aims to
                  create solutions by producing case studies like this and
                  engineering solutions for real businesses. Founded by Miguel
                  Justin in 2026, the main premise of the software is to deliver
                  a robust and streamlined software solution that is practical,
                  increases efficiency, and is user-friendly.
                </p>
              </motion.section>

              <motion.section
                initial="hidden"
                whileInView="visible"
                variants={containerVariants}
                transition={{ duration: 0.4, delay: 0.15 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-[#3B4FBF]" size={24} />
                  <h2 className="text-2xl font-semibold text-slate-200">
                    Connect
                  </h2>
                </div>
                <div className="space-y-4">
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Code className="text-[#3B4FBF]" size={20} />
                    <div>
                      <p className="font-semibold text-slate-300">
                        Founder's Academic GitHub
                      </p>
                      <p className="text-slate-400">@mxgodbtc</p>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <Code className="text-[#3B4FBF]" size={20} />
                    <div>
                      <p className="font-semibold text-slate-300">
                        Official Instagram Page
                      </p>
                      <p className="text-slate-400">@communeye.software</p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
