"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Vote, Zap, RefreshCw } from "lucide-react";
import { useCampaigns, useCampaignStats } from "@/hooks/useContract";
import { CampaignCard } from "@/components/campaign/CampaignCard";
import { formatEth } from "@/lib/utils";

// ── Reusable stat card ────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "24px 28px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          color: "#c7c4d7",
          fontSize: 11,
          fontFamily: "JetBrains Mono, monospace",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: accent,
          fontSize: 32,
          fontWeight: 700,
          fontFamily: "JetBrains Mono, monospace",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          marginTop: 16,
          height: 2,
          borderRadius: 999,
          background: `linear-gradient(90deg,${accent}55,transparent)`,
        }}
      />
    </div>
  );
}

// ── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 28,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(192,193,255,0.08)",
          border: "1px solid rgba(192,193,255,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c0c1ff",
          marginBottom: 18,
        }}
      >
        <Icon size={20} />
      </div>
      <h3
        style={{
          color: "#dae2fd",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 8,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p style={{ color: "#c7c4d7", fontSize: 14, lineHeight: 1.65 }}>
        {description}
      </p>
    </motion.div>
  );
}

// ── How-it-works step ─────────────────────────────────────────────────────────
function Step({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 28,
      }}
    >
      <div
        style={{
          color: "#c0c1ff",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "JetBrains Mono, monospace",
          opacity: 0.35,
          marginBottom: 14,
          lineHeight: 1,
        }}
      >
        {number}
      </div>
      <div
        style={{
          color: "#dae2fd",
          fontWeight: 600,
          fontSize: 16,
          marginBottom: 8,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      <div style={{ color: "#c7c4d7", fontSize: 14, lineHeight: 1.65 }}>
        {description}
      </div>
    </motion.div>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          height: 4,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 8,
        }}
      />
      {[22, 14, 80, 6].map((h, i) => (
        <div
          key={i}
          style={{
            height: h,
            width: i === 1 ? "50%" : "100%",
            borderRadius: 6,
            background:
              "linear-gradient(90deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.08) 50%,rgba(255,255,255,0.04) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { campaigns, isLoading } = useCampaigns();
  const { totalRaised, activeCount, successCount, totalCampaigns } =
    useCampaignStats();

  // Top 3 by raised amount
  const featured = [...campaigns]
    .sort((a, b) => Number(b.raisedAmount - a.raisedAmount))
    .slice(0, 3);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{ position: "relative", overflow: "hidden", padding: "96px 24px 80px" }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -240,
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 900,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(192,193,255,0.055) 0%,transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 80,
              left: "18%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(78,222,163,0.035) 0%,transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 40,
              right: "12%",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(76,215,246,0.035) 0%,transparent 65%)",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                borderRadius: 9999,
                background: "rgba(192,193,255,0.07)",
                border: "1px solid rgba(192,193,255,0.18)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4edea3",
                  display: "inline-block",
                  boxShadow: "0 0 6px #4edea3",
                }}
              />
              <span
                style={{
                  color: "#c0c1ff",
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                Live on Ethereum Sepolia
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              fontSize: "clamp(36px,5.5vw,60px)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "#dae2fd",
              textAlign: "center",
              maxWidth: 780,
              margin: "0 auto 24px",
            }}
          >
            Fund Innovation Through{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg,#c0c1ff 0%,#4cd7f6 55%,#4edea3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Transparent Escrow
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              fontSize: 18,
              color: "#c7c4d7",
              lineHeight: 1.65,
              textAlign: "center",
              maxWidth: 540,
              margin: "0 auto 44px",
            }}
          >
            Secure crowdfunding powered by milestone-based smart contracts.
            Backers stay in control — every fund release requires a vote.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/campaigns"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 8,
                textDecoration: "none",
                background: "linear-gradient(135deg,#c0c1ff,#8083ff)",
                color: "#07006c",
                fontWeight: 700,
                fontSize: 15,
                boxShadow: "0 4px 20px rgba(192,193,255,0.22)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 8px 28px rgba(192,193,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 4px 20px rgba(192,193,255,0.22)";
              }}
            >
              Explore Campaigns <ArrowRight size={16} />
            </Link>
            <Link
              href="/create"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: 8,
                textDecoration: "none",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#dae2fd",
                fontWeight: 600,
                fontSize: 15,
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.09)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.12)";
              }}
            >
              Launch a Campaign
            </Link>
          </motion.div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 16,
              marginTop: 72,
            }}
          >
            <StatCard
              label="Total Raised"
              value={`${formatEth(totalRaised, 2)} ETH`}
              accent="#4edea3"
            />
            <StatCard
              label="Active Campaigns"
              value={activeCount.toString()}
              accent="#4cd7f6"
            />
            <StatCard
              label="Completed Projects"
              value={successCount.toString()}
              accent="#c0c1ff"
            />
            <StatCard
              label="Total Campaigns"
              value={totalCampaigns.toString()}
              accent="#c7c4d7"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(13,19,46,0.45)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#dae2fd",
                letterSpacing: "-0.015em",
                marginBottom: 12,
              }}
            >
              Built for Trust
            </motion.h2>
            <p style={{ color: "#c7c4d7", fontSize: 16, maxWidth: 460, margin: "0 auto" }}>
              Every mechanism is designed to protect backers while giving
              creators the tools to build.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 20,
            }}
          >
            <FeatureCard
              index={0}
              icon={Shield}
              title="Escrow Security"
              description="All funds are locked in a non-custodial smart contract. Creators only receive payouts after contributor approval — never before."
            />
            <FeatureCard
              index={1}
              icon={Vote}
              title="Milestone Voting"
              description="Contributors vote on every milestone release. More than 50% approval is required before any ETH leaves the escrow contract."
            />
            <FeatureCard
              index={2}
              icon={Zap}
              title="Instant Settlement"
              description="Approved milestones trigger instant, trustless on-chain transfers. No delays, no intermediaries, no disputes."
            />
            <FeatureCard
              index={3}
              icon={RefreshCw}
              title="Guaranteed Refunds"
              description="If a campaign fails to reach its funding goal, every contributor can claim a full refund — automatically, on-chain."
            />
          </div>
        </div>
      </section>

      {/* ── Featured campaigns ────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 36,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#dae2fd",
                  letterSpacing: "-0.015em",
                  marginBottom: 4,
                }}
              >
                Featured Campaigns
              </motion.h2>
              <p style={{ color: "#c7c4d7", fontSize: 14 }}>
                The most-funded projects on the platform
              </p>
            </div>
            <Link
              href="/campaigns"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#c0c1ff",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
              }
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                gap: 20,
              }}
            >
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 24px",
                color: "#c7c4d7",
              }}
            >
              No campaigns yet.{" "}
              <Link href="/create" style={{ color: "#c0c1ff" }}>
                Be the first to launch one.
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                gap: 20,
              }}
            >
              {featured.map((c, i) => (
                <CampaignCard key={c.id.toString()} campaign={c} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px",
          background: "rgba(13,19,46,0.45)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#dae2fd",
                letterSpacing: "-0.015em",
                marginBottom: 12,
              }}
            >
              How It Works
            </motion.h2>
            <p style={{ color: "#c7c4d7", fontSize: 16 }}>
              Four steps from idea to funded project
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            <Step
              index={0}
              number="01"
              title="Creator Launches"
              description="Define your goal, campaign duration, and milestone breakdown. Every milestone has a target amount attached."
            />
            <Step
              index={1}
              number="02"
              title="Backers Fund"
              description="Contributors send ETH directly to the smart contract. Funds are locked in escrow — not held by FundFlow."
            />
            <Step
              index={2}
              number="03"
              title="Milestone Requested"
              description="When a milestone is complete, the creator requests release. A 3-day voting window opens automatically."
            />
            <Step
              index={3}
              number="04"
              title="Contributors Vote"
              description="Backers approve or reject. If majority approves, funds release instantly to the creator on-chain."
            />
          </div>
        </div>
      </section>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(15,23,42,0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(192,193,255,0.12)",
              borderRadius: 20,
              padding: "56px 40px",
              textAlign: "center",
              boxShadow:
                "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Inner glow */}
            <div
              style={{
                position: "absolute",
                top: -120,
                left: "50%",
                transform: "translateX(-50%)",
                width: 600,
                height: 300,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(192,193,255,0.07) 0%,transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <h2
              style={{
                fontSize: "clamp(24px,3vw,38px)",
                fontWeight: 700,
                color: "#dae2fd",
                letterSpacing: "-0.015em",
                marginBottom: 16,
                position: "relative",
              }}
            >
              Ready to launch your project?
            </h2>
            <p
              style={{
                color: "#c7c4d7",
                fontSize: 16,
                maxWidth: 480,
                margin: "0 auto 36px",
                lineHeight: 1.6,
                position: "relative",
              }}
            >
              Create a campaign in minutes. Your backers get full transparency
              and vote on every milestone.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
                position: "relative",
              }}
            >
              <Link
                href="/create"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: "linear-gradient(135deg,#c0c1ff,#8083ff)",
                  color: "#07006c",
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: "0 4px 20px rgba(192,193,255,0.22)",
                }}
              >
                Launch a Campaign <ArrowRight size={15} />
              </Link>
              <Link
                href="/campaigns"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 28px",
                  borderRadius: 8,
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#dae2fd",
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                Explore First
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 7,
                background: "linear-gradient(135deg,#c0c1ff,#8083ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5L14 5v6L8 14.5L2 11V5L8 1.5Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span
              style={{ color: "#dae2fd", fontWeight: 600, fontSize: 14 }}
            >
              FundFlow
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { href: "/campaigns", label: "Explore" },
              { href: "/create",    label: "Launch"  },
              { href: "/dashboard", label: "Creator" },
              { href: "/backer",    label: "Portfolio"},
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  color: "#c7c4d7",
                  fontSize: 13,
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#dae2fd")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = "#c7c4d7")
                }
              >
                {label}
              </Link>
            ))}
          </div>
          <span style={{ color: "#464554", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
            Ethereum Sepolia Testnet
          </span>
        </div>
      </footer>
    </div>
  );
}