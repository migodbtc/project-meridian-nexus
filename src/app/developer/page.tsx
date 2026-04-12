"use client";

import { ArrowLeft, User } from "lucide-react";
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
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="text-[#3B4FBF]" size={24} />
                <h2 className="text-2xl font-semibold text-slate-200">
                  Overview
                </h2>
              </div>
              <p>
                Communeye Software is a boutique software development studio
                specializing in full-stack web applications, cloud architecture,
                and innovative digital solutions for enterprise clients.
              </p>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <User className="text-[#3B4FBF]" size={24} />
                <h2 className="text-2xl font-semibold text-slate-200">
                  Contact & Links
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Socials
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <motion.tr
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="border-b border-slate-700/50 hover:bg-slate-900/30 transition"
                    >
                      <td className="py-3 px-4 text-slate-400">
                        <span className="text-slate-500">GitHub</span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        <span className="text-slate-500">
                          @mxgodbtc (Founder GitHub)
                        </span>
                      </td>
                    </motion.tr>
                    <motion.tr
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      transition={{ duration: 0.3 }}
                      viewport={{ once: true }}
                      className="border-b border-slate-700/50 hover:bg-slate-900/30 transition"
                    >
                      <td className="py-3 px-4 text-slate-400">
                        <span className="text-slate-500">
                          Your GitHub username
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        <span className="text-slate-500">
                          @communeye.software (Official Page)
                        </span>
                      </td>
                    </motion.tr>
                  </tbody>
                </table>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
