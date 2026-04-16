"use client";

import { Compass, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [isMinimal, setIsMinimal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsMinimal(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isMinimal
          ? "bg-linear-to-b from-black/50 to-transparent"
          : "bg-linear-to-b from-black/20 to-[#0F1117]"
      } ${isMinimal ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {!isMinimal && (
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-200">
                Project North Star
              </span>
              <span className="text-sm text-slate-400">
                Technical Case Study by Communeye Software
              </span>
            </div>
          )}
          {isMinimal && <Compass size={28} className="text-[#3B4FBF]" />}
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/polaris/auth/login"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-indigo-500/60 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <LogIn size={18} />
            {!isMinimal && <span className="text-sm">Login</span>}
          </Link>
          <Link
            href="/polaris/auth/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-indigo-500/60 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <UserPlus size={18} />
            {!isMinimal && <span className="text-sm">Register</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
