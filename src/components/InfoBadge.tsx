import React from "react";
import {
  BookOpen,
  Building2,
  HandshakeIcon,
  type LucideIcon,
} from "lucide-react";
import Tooltip from "./Tooltip";

interface InfoBadgeProps {
  name: string;
  tooltip: string;
}

const infoIconMap: Record<string, LucideIcon> = {
  "product case study": BookOpen,
  "Meridian Nexus Group Ltd": Building2,
  "Managed Talent-as-a-Service (TaaS) agency": HandshakeIcon,
};

export default function InfoBadge({ name, tooltip }: InfoBadgeProps) {
  const Icon = infoIconMap[name] || BookOpen;

  const baseStyles =
    "inline-flex items-center gap-1.5 px-3 py-0.5 text-xs font-semibold whitespace-nowrap rounded-full hover:cursor-pointer transition hover:scale-105";

  const variantStyles =
    "bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-slate-200 border border-indigo-500/40 hover:border-purple-400/50 hover:bg-gradient-to-r hover:from-indigo-500/30 hover:to-purple-500/20";

  return (
    <Tooltip content={tooltip}>
      <span className={`${baseStyles} ${variantStyles}`}>
        <Icon size={14} className="text-indigo-400" />
        {name}
      </span>
    </Tooltip>
  );
}
