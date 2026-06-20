"use client";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  level?: 1 | 2;
  glow?: string;
}

export function GlassCard({ children, className = "", hover = false, level = 1, glow, style, ...props }: GlassCardProps) {
  const base = level === 2
    ? { background: "rgba(33, 75, 181, 0.88)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.12)" }
    : { background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={hover ? { y: -2, boxShadow: `0 12px 40px rgba(0,0,0,0.45)${glow ? `, 0 0 24px ${glow}` : ""}` } : undefined}
      className={`rounded-card ${className}`}
      style={{ ...base, boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

