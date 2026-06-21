"use client";
export function Skeleton({ width = "100%", height = 16, className = "" }: { width?: string | number; height?: string | number; className?: string }) {
  return (
    <div className={className} style={{ width, height, borderRadius: 8, background: "linear-gradient(90deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 100%)", backgroundSize: "200% 100%", animation: "shimmer 2s infinite" }} />
  );
}

export function CampaignCardSkeleton() {
  return (
    <div style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <Skeleton height={160} style={{ borderRadius: 12 }} />
      <Skeleton height={20} width="70%" />
      <Skeleton height={14} width="40%" />
      <Skeleton height={6} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton height={12} width="30%" />
        <Skeleton height={12} width="20%" />
      </div>
    </div>
  );
}
