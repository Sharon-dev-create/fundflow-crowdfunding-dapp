"use client";
export function ProgressBar({ percent, height = 6, animated = true }: { percent: number; height?: number; animated?: boolean }) {
  return (
    <div style={{ width: "100%", height, borderRadius: 999, background: "rgba(255,255,255,0.06)", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.min(100, percent)}%`,
          background: "linear-gradient(90deg,#4cd7f6,#4edea3)",
          borderRadius: 999,
          transition: animated ? "width 0.8s cubic-bezier(0.4,0,0.2,1)" : "none",
          boxShadow: "0 0 8px rgba(78,222,163,0.4)",
        }}
      />
    </div>
  );
}