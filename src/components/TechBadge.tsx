import React from "react";
import {
  Zap,
  Database,
  Cloud,
  Palette,
  Feather,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Tooltip from "./Tooltip";

interface TechBadgeProps {
  name: string;
  variant?: "default" | "highlight";
  tooltip?: string;
}

const techIconMap: Record<string, LucideIcon> = {
  "Next.js": Zap,
  Nextjs: Zap,
  Supabase: Database,
  Vercel: Cloud,
  "Tailwind CSS": Palette,
  Tailwind: Palette,
  "Lucide React": Feather,
  Lucide: Feather,
  "Framer Motion": Sparkles,
  Framer: Sparkles,
};

const techDescriptions: Record<string, string> = {
  "Next.js": "React framework for production with SSR and SSG",
  Nextjs: "React framework for production with SSR and SSG",
  Supabase: "Open-source Firebase alternative with PostgreSQL",
  Vercel: "Cloud platform optimized for Next.js deployment",
  "Tailwind CSS": "Utility-first CSS framework for rapid UI design",
  Tailwind: "Utility-first CSS framework for rapid UI design",
  "Lucide React": "Beautiful, consistent icon library for React",
  Lucide: "Beautiful, consistent icon library for React",
  "Framer Motion": "Animation library for React with gesture support",
  Framer: "Animation library for React with gesture support",
};

export default function TechBadge({
  name,
  variant = "default",
  tooltip,
}: TechBadgeProps) {
  const Icon = techIconMap[name] || Feather;
  const tooltipContent =
    tooltip || techDescriptions[name] || `Technology: ${name}`;

  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold whitespace-nowrap rounded-full hover:cursor-pointer transition hover:scale-105";

  const variantStyles = {
    default:
      "bg-gradient-to-r from-[#3B4FBF]/20 to-amber-400/10 text-slate-200 border border-[#3B4FBF]/40 hover:border-amber-400/50 hover:bg-gradient-to-r hover:from-[#3B4FBF]/30 hover:to-amber-400/20",
    highlight:
      "bg-gradient-to-r from-[#3B4FBF] to-amber-400 text-white border border-amber-300/50 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-400/20",
  };

  return (
    <Tooltip content={tooltipContent}>
      <span className={`${baseStyles} ${variantStyles[variant]}`}>
        <Icon
          size={14}
          className={
            variant === "highlight"
              ? "text-white"
              : "text-[#3B4FBF] group-hover:text-amber-400"
          }
        />
        {name}
      </span>
    </Tooltip>
  );
}
