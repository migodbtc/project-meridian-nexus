"use client";

import {
  ArrowLeft,
  Layers,
  CheckCircle2,
  Code,
  Database,
  Cloud,
  Zap,
  Palette,
  Sparkles,
  Feather,
  GitBranch,
  ExternalLink,
  Workflow,
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

const techIconMap: Record<string, React.ReactNode> = {
  "Next.js": <Zap size={18} />,
  React: <Code size={18} />,
  "Tailwind CSS": <Palette size={18} />,
  "Framer Motion": <Sparkles size={18} />,
  "Lucide React": <Feather size={18} />,
  PostgreSQL: <Database size={18} />,
  Supabase: <Database size={18} />,
  TypeScript: <Code size={18} />,
  Vercel: <Cloud size={18} />,
};

const toolIconMap: Record<string, React.ReactNode> = {
  Git: <GitBranch size={18} />,
  GitHub: <ExternalLink size={18} />,
  "GitHub Workflows": <Workflow size={18} />,
};

export default function ArchitecturePage() {
  const techStack = [
    {
      name: "Next.js",
      description: "React framework for production with SSR and SSG",
      version: "16.2.3",
    },
    {
      name: "React",
      description: "UI library with server/client components",
      version: "19.2.4",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework",
      version: "4.0.0",
    },
    {
      name: "Framer Motion",
      description: "Animation library for React",
      version: "12.38.0",
    },
    {
      name: "Lucide React",
      description: "Icon library for React",
      version: "1.8.0",
    },
    {
      name: "PostgreSQL",
      description: "Relational database system",
      version: "Latest",
    },
    {
      name: "Supabase",
      description: "Firebase alternative with PostgreSQL",
      version: "-",
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript superset",
      version: "Latest",
    },
    {
      name: "Vercel",
      description: "Cloud deployment platform",
      version: "-",
    },
  ];

  const tools = [
    { name: "Git", description: "Version control system" },
    { name: "GitHub", description: "Repository hosting and collaboration" },
    { name: "GitHub Workflows", description: "CI/CD automation" },
  ];

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
          <p className="text-slate-400 text-lg mb-2">System Architecture</p>
          <div className="flex items-center gap-3 mb-2">
            <Layers className="text-[#3B4FBF]" size={32} />
            <h1 className="text-4xl font-bold">
              Technologies, Tools, & Building Blocks
            </h1>
          </div>
          <p className="text-slate-500 text-sm mb-8">
            Learn more about the tech stack used in the project
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
                <Code className="text-[#3B4FBF]" size={24} />
                <h2 className="text-2xl font-semibold text-slate-200">
                  Technologies
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Technology
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Version
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {techStack.map((tech, i) => (
                      <motion.tr
                        key={i}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="border-b border-slate-700/50 hover:bg-slate-900/30 transition"
                      >
                        <td className="py-3 px-4 text-slate-200 font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-[#3B4FBF]">
                              {techIconMap[tech.name]}
                            </span>
                            {tech.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {tech.description}
                        </td>
                        <td className="py-3 px-4 text-slate-500">
                          {tech.version}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>

            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={containerVariants}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="text-[#3B4FBF]" size={24} />
                <h2 className="text-2xl font-semibold text-slate-200">Tools</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Tool
                      </th>
                      <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tools.map((tool, i) => (
                      <motion.tr
                        key={i}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="border-b border-slate-700/50 hover:bg-slate-900/30 transition"
                      >
                        <td className="py-3 px-4 text-slate-200 font-medium">
                          <div className="flex items-center gap-2">
                            <span className="text-[#3B4FBF]">
                              {toolIconMap[tool.name]}
                            </span>
                            {tool.name}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {tool.description}
                        </td>
                      </motion.tr>
                    ))}
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
