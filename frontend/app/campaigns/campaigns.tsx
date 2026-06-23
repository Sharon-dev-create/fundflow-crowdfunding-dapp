"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { useCampaigns } from "@/hooks/useContract";
import { CampaignCard } from "@/components/campaign/CampaignCard";

const FILTERS = ["All", "Active", "Successful", "Failed", "Completed"] as const;
type Filter = typeof FILTERS[number];

const STATUS_MAP: Record<Filter, number | null> = {
  All: null, Active: 0, Successful: 1, Failed: 2, Completed: 3,
};

function CardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ height: 3, borderRadius: 999, background: "rgba(255,255,255,0.06)" }} />
      {[22, 13, 60, 6, 12].map((h, i) => (
        <div
          key={i}
          style={{
            height: h,
            width: i === 1 ? "48%" : i === 4 ? "65%" : "100%",
            borderRadius: 6,
            background:
              "linear-gradient(90deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function CampaignsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const { campaigns, isLoading } = useCampaigns();

  const filtered = useMemo(() => {
    let list = [...campaigns];
    if (STATUS_MAP[filter] !== null)
      list = list.filter((c) => c.status === STATUS_MAP[filter]);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [campaigns, filter, search]);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 80px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{ marginBottom: 40 }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(192,193,255,0.08)",
              border: "1px solid rgba(192,193,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c0c1ff",
            }}
          >
            <LayoutGrid size={17} />
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#dae2fd",
              letterSpacing: "-0.015em",
            }}
          >
            Explore Campaigns
          </h1>
        </div>
        <p style={{ color: "#c7c4d7", fontSize: 15, paddingLeft: 46 }}>
          Discover projects building with transparent milestone escrow
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
        style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search
            size={14}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#c7c4d7",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search campaigns…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 38px",
              background: "rgba(15,23,42,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: focused
                ? "1px solid rgba(192,193,255,0.4)"
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow: focused ? "0 0 0 3px rgba(192,193,255,0.07)" : "none",
              borderRadius: 8,
              color: "#dae2fd",
              fontSize: 14,
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "9px 18px",
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: active
                    ? "rgba(192,193,255,0.12)"
                    : "rgba(255,255,255,0.04)",
                  border: active
                    ? "1px solid rgba(192,193,255,0.32)"
                    : "1px solid rgba(255,255,255,0.07)",
                  color: active ? "#c0c1ff" : "#c7c4d7",
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Results meta */}
      {!isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            color: "#c7c4d7",
            fontSize: 13,
          }}
        >
          <SlidersHorizontal size={12} />
          <span>
            {filtered.length} campaign{filtered.length !== 1 ? "s" : ""}
            {search && ` matching "${search}"`}
          </span>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <CardSkeleton key={i} index={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "80px 24px",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "rgba(192,193,255,0.07)",
              border: "1px solid rgba(192,193,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c0c1ff",
            }}
          >
            <Search size={26} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{ color: "#dae2fd", fontWeight: 600, fontSize: 17, marginBottom: 8 }}
            >
              No campaigns found
            </div>
            <div
              style={{
                color: "#c7c4d7",
                fontSize: 14,
                maxWidth: 340,
                lineHeight: 1.6,
              }}
            >
              {search
                ? `No results for "${search}". Try a different search term.`
                : "No campaigns match this filter yet."}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {filtered.map((c, i) => (
            <CampaignCard key={c.id.toString()} campaign={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}