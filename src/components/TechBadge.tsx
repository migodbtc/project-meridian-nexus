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

interface TechBadgeProps {
  name: string;
  variant?: "default" | "highlight";
  tooltip?: string;
  onMouseEnter?: (
    e: React.MouseEvent<HTMLSpanElement>,
    content: string,
  ) => void;
  onMouseLeave?: () => void;
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
  "Next.js":
    "React framework for production with Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes. Enables full-stack JavaScript applications with optimized performance and SEO.",
  Nextjs:
    "React framework for production with Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes. Enables full-stack JavaScript applications with optimized performance and SEO.",
  Supabase:
    "Open-source Firebase alternative built on PostgreSQL. Provides real-time databases, authentication, storage, and edge functions with a user-friendly dashboard and powerful APIs.",
  Vercel:
    "Cloud platform purpose-built for Next.js and frontend applications. Offers global edge network, serverless functions, automatic deployments from Git, and integrated analytics.",
  "Tailwind CSS":
    "Utility-first CSS framework that accelerates UI development. Provides low-level utility classes for building complex, responsive designs without writing custom CSS.",
  Tailwind:
    "Utility-first CSS framework that accelerates UI development. Provides low-level utility classes for building complex, responsive designs without writing custom CSS.",
  "Lucide React":
    "Comprehensive icon library with 400+ beautiful, customizable SVG icons designed for React applications. Consistent visual language with multiple size and styling options.",
  Lucide:
    "Comprehensive icon library with 400+ beautiful, customizable SVG icons designed for React applications. Consistent visual language with multiple size and styling options.",
  "Framer Motion":
    "Powerful animation library for React enabling smooth, gesture-driven interactions and complex animation sequences. Simplifies advanced motion design with an intuitive API.",
  Framer:
    "Powerful animation library for React enabling smooth, gesture-driven interactions and complex animation sequences. Simplifies advanced motion design with an intuitive API.",
};

export default function TechBadge({
  name,
  variant = "default",
  tooltip,
  onMouseEnter,
  onMouseLeave,
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
    <span
      className={`${baseStyles} ${variantStyles[variant]}`}
      onMouseEnter={(e) => onMouseEnter?.(e, tooltipContent)}
      onMouseLeave={onMouseLeave}
    >
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
  );
}
