"use client";

import React, { useState, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {isMounted && isVisible && (
        <span className="absolute bottom-full left-1/2 mb-2 px-3 py-2 bg-slate-900 text-slate-100 text-xs rounded-lg whitespace-nowrap transform -translate-x-1/2 z-50 pointer-events-none border border-slate-700 shadow-lg max-w-2xl">
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
        </span>
      )}
    </span>
  );
}
