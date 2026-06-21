"use client";
const MAP: Record<number, { label: string; color: string; bg: string }> = {
  0: { label: "Active", color: "#4cd7f6", bg: "rgba(76,215,246,0.1)" },
  1: { label: "Successful", color: "#4edea3", bg: "rgba(78,222,163,0.1)" },
  2: { label: "Failed", color: "#ffb4ab", bg: "rgba(255,180,171,0.1)" },
  3: { label: "Completed", color: "#c0c1ff", bg: "rgba(192,193,255,0.1)" },
};
export function StatusPill({ status }: { status: number }) {
  const s = MAP[status] ?? { label: "Unknown", color: "#c7c4d7", bg: "rgba(199,196,215,0.1)" };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, background: s.bg, border: `1px solid ${s.color}30`, color: s.color, fontSize: 11, fontWeight: 500, fontFamily: "JetBrains Mono, monospace", letterSpacing: "0.04em", textTransform: "uppercase" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {s.label}
    </span>
  );
}
