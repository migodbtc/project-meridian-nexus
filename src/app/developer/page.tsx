"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DeveloperPage() {
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
              About the Developer
            </span>
          </h1>
          <p className="text-slate-300 text-lg mb-8">Communeye Software</p>

          <div className="space-y-6 text-slate-300">
            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Overview
              </h2>
              <p>
                Communeye Software is a boutique software development studio
                specializing in full-stack web applications, cloud architecture,
                and innovative digital solutions for enterprise clients.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Expertise
              </h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Full-stack web application development</li>
                <li>Modern React and Next.js applications</li>
                <li>Cloud infrastructure and deployment</li>
                <li>Database design and optimization</li>
                <li>UI/UX design and implementation</li>
                <li>Real-time applications and data synchronization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Project North Star
              </h2>
              <p>
                This comprehensive case study represents a deep dive into
                enterprise application development, addressing real-world
                business challenges through innovative technology solutions. The
                project demonstrates best practices in UI/UX design, state
                management, real-time data synchronization, and scalable cloud
                architecture.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-200 mb-3">
                Contact & Links
              </h2>
              <p>
                For inquiries about Communeye Software or to explore potential
                collaborations, please visit our official channels or reach out
                directly.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
