"use client";

interface PageLevelTooltipProps {
  content: string | null;
  position: { x: number; y: number };
  isMounted: boolean;
  isVisible: boolean;
}

export default function PageLevelTooltip({
  content,
  position,
  isMounted,
  isVisible,
}: PageLevelTooltipProps) {
  if (!isMounted || !isVisible || !content) return null;

  return (
    <div
      className="fixed bg-slate-900 text-slate-100 text-xs rounded-lg z-50 pointer-events-none border border-slate-700 shadow-lg max-w-sm px-3 py-2 wrap-break-word"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, calc(-100% - 8px))",
      }}
    >
      <p>{content}</p>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
    </div>
  );
}
