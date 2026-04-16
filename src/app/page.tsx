"use client";

import { Compass, MenuIcon, Building2, Layers, User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import TechBadge from "@/components/TechBadge";
import InfoBadge from "@/components/InfoBadge";
import PageLevelTooltip from "@/components/PageLevelTooltip";

export default function Home() {
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTooltipEnter = (
    e: React.MouseEvent<HTMLSpanElement>,
    content: string,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      content,
      x: rect.left + rect.width / 2,
      y: rect.top + window.scrollY,
    });
  };

  const handleTooltipLeave = () => {
    setTooltip(null);
  };
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-[#0F1117] ">
      <PageLevelTooltip
        content={tooltip?.content || null}
        position={tooltip ? { x: tooltip.x, y: tooltip.y } : { x: 0, y: 0 }}
        isMounted={isMounted}
        isVisible={tooltip !== null}
      />
      <main className="flex flex-1 w-full max-w-7xl gap-3 flex-col items-center py-16 px-16  sm:items-start">
        <motion.div
          className="flex items-center justify-left gap-3 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Compass size={56} className="text-[#3B4FBF] shrink-0" />
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">
              Welcome to{" "}
              <span className="bg-linear-to-r from-[#3B4FBF] to-amber-400 bg-clip-text text-transparent">
                Project North Star!
              </span>
            </h1>
            <p className="text-slate-400 italic text-xs">
              Hover the badges for more information!
            </p>
          </div>
        </motion.div>
        <motion.p
          className="text-justify text-sm text-slate-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          Project North Star is a{" "}
          <InfoBadge
            name="product case study"
            tooltip="A comprehensive exploration of real-world business challenges and solutions"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          built around a mock client named{" "}
          <InfoBadge
            name="Meridian Nexus Group Ltd"
            tooltip="The fictional client organization used for this comprehensive case study"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />
          . Meridian Nexus Group Ltd is a{" "}
          <InfoBadge
            name="Managed Talent-as-a-Service (TaaS) agency"
            tooltip="A platform connecting and managing freelancers with clients for project delivery"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />
          , helping and coaching freelancers with their servicing, managing the
          deals between freelancer and clients, building a community around
          like-minded individuals, and more. This project explores a real-world
          business challenge:{" "}
          <span className="text-amber-300 font-medium">
            disconnected tools causing financial drift and operational blindness
          </span>{" "}
          across a freelancer-driven organization.
        </motion.p>
        <motion.p
          className="text-justify text-sm text-slate-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        >
          The project aims to not only address the client requirements by
          building a sophisticated web application, but also to offer an
          intuitive, in-depth simulation of the TaaS unified web engine by
          deploying it into the public cloud. The unified web engine is a{" "}
          <TechBadge
            name="Next.js"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          +{" "}
          <TechBadge
            name="Supabase"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          +{" "}
          <TechBadge
            name="Vercel"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          application utilizing libraries such as{" "}
          <TechBadge
            name="Tailwind CSS"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />
          ,{" "}
          <TechBadge
            name="Lucide React"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          icons, and{" "}
          <TechBadge
            name="Framer Motion"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />{" "}
          animations, among others. The engine aims to{" "}
          <span className="text-amber-300 font-medium">
            centralize the entire freelancer lifecycle
          </span>{" "}
          — from acquisition and training, to project delivery and payout — into
          a single, auditable financial ledger.
        </motion.p>

        <motion.div
          className="w-full mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
        >
          <div className="flex items-center gap-2">
            <MenuIcon className="text-[#3B4FBF]" />
            <h2 className="text-2xl font-semibold">Navigation</h2>
          </div>
          {/* Card index */}
          <div className="w-full grid grid-cols-2 grid-rows-3 gap-1">
            <motion.div
              className="col-span-1 row-span-3 p-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
            >
              <Link href="/polaris">
                <div
                  className="flex h-full items-center rounded-xl hover:cursor-pointer transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0 border border-slate-700 bg-slate-900/20 hover:border-indigo-500/60 text-slate-400 hover:text-slate-200 "
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(30, 30, 50, 0.7), rgba(30, 30, 50, 0.5)), url(/pexels-fotios-photos-811587.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                >
                  <div className="flex flex-col h-full justify-center px-6 py-3 rounded-lg bg-linear-to-r from-black/50 to-transparent">
                    <Zap size={24} className="text-amber-400 mb-1" />
                    <h3 className="text-lg text-slate-300">Visit Engine</h3>
                    <p className="text-2xl font-bold text-slate-200 ">
                      Explore the TaaS platform
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="min-h-36 p-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1.0 }}
            >
              <Link href="/client">
                <div
                  className="flex h-full items-center rounded-xl hover:cursor-pointer transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0 border border-slate-700 bg-slate-900/20 hover:border-indigo-500/60 text-slate-400 hover:text-slate-200"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(30, 30, 50, 0.7), rgba(30, 30, 50, 0.5)), url(/pexels-felicity-tai-7964468.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                >
                  <div className="flex flex-col h-full justify-center px-6 py-3 rounded-lg bg-linear-to-r from-black/50 to-transparent">
                    <Building2 size={24} className="text-amber-400 mb-1" />
                    <h3 className="text-sm text-slate-300">
                      The client and its operations & requirements
                    </h3>
                    <p className="text-lg font-bold text-slate-200 ">
                      Meridian Nexus Group Ltd.
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="min-h-36 p-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
            >
              <Link href="/architecture">
                <div
                  className="flex h-full items-center rounded-xl hover:cursor-pointer transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0 border border-slate-700 bg-slate-900/20 hover:border-indigo-500/60 text-slate-400 hover:text-slate-200"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(30, 30, 50, 0.7), rgba(30, 30, 50, 0.5)), url(/pexels-pixabay-247791.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                >
                  <div className="flex flex-col h-full justify-center px-6 py-3 rounded-lg bg-linear-to-r from-black/50 to-transparent">
                    <Layers size={24} className="text-amber-400 mb-1" />
                    <h3 className="text-sm text-slate-300">
                      The system architecture and infrastructure
                    </h3>
                    <p className="text-lg font-bold text-slate-200 ">
                      Technologies, Tools, & Building Blocks
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              className="min-h-36 p-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 1.4 }}
            >
              <Link href="/developer">
                <div
                  className="flex h-full items-center rounded-xl hover:cursor-pointer transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0 border border-slate-700 bg-slate-900/20 hover:border-indigo-500/60 text-slate-400 hover:text-slate-200"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(30, 30, 50, 0.7), rgba(30, 30, 50, 0.5)), url(/6231268270099074472.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "brightness(0.95)",
                  }}
                >
                  <div className="flex flex-col h-full justify-center px-6 py-3 rounded-lg bg-linear-to-r from-black/50 to-transparent">
                    <User size={24} className="text-amber-400 mb-1" />
                    <h3 className="text-sm text-slate-300">
                      All about the project developer
                    </h3>
                    <p className="text-lg font-bold text-slate-200 ">
                      Communeye Software
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
