"use client";
import { ReactNode } from "react";
export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div style={{ textAlign: "center", padding: "64px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(192,193,255,0.08)", border: "1px solid rgba(192,193,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0c1ff" }}>{icon}</div>
      <div>
        <div style={{ color: "#dae2fd", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{title}</div>
        {description && <div style={{ color: "#c7c4d7", fontSize: 14, maxWidth: 360, margin: "0 auto", lineHeight: 1.6 }}>{description}</div>}
      </div>
      {action}
    </div>
  );
}