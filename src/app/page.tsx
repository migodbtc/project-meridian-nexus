"use client";

import { Compass, MenuIcon } from "lucide-react";
import { motion } from "framer-motion";
import TechBadge from "@/components/TechBadge";
import InfoBadge from "@/components/InfoBadge";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#0F1117] font-sans">
      <main className="flex flex-1 w-full max-w-7xl gap-3 flex-col items-center py-32 px-16  sm:items-start">
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
          />{" "}
          built around a mock client named{" "}
          <InfoBadge
            name="Meridian Nexus Group Ltd"
            tooltip="The fictional client organization used for this comprehensive case study"
          />
          . Meridian Nexus Group Ltd is a{" "}
          <InfoBadge
            name="Managed Talent-as-a-Service (TaaS) agency"
            tooltip="A platform connecting and managing freelancers with clients for project delivery"
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
          <TechBadge name="Next.js" /> + <TechBadge name="Supabase" /> +{" "}
          <TechBadge name="Vercel" /> application utilizing libraries such as{" "}
          <TechBadge name="Tailwind CSS" />, <TechBadge name="Lucide React" />{" "}
          icons, and <TechBadge name="Framer Motion" /> animations, among
          others. The engine aims to{" "}
          <span className="text-amber-300 font-medium">
            centralize the entire freelancer lifecycle
          </span>{" "}
          — from acquisition and training, to project delivery and payout — into
          a single, auditable financial ledger.
        </motion.p>

        <div className="w-full mt-4">
          <div className="flex items-center gap-2">
            <MenuIcon className="text-[#3B4FBF]" />
            <h2 className="text-2xl font-semibold">Navigation</h2>
          </div>
          {/* Card index */}
          <div className="w-full grid grid-cols-2 grid-rows-3 gap-2">
            <div className="col-span-1 row-span-3 bg-red-200">Large card</div>
            <div className="bg-blue-200 h-36">Card 1</div>
            <div className="bg-blue-200 h-36">Card 2</div>
            <div className="bg-blue-200 h-36">Card 3</div>
          </div>
        </div>
      </main>
    </div>
  );
}
