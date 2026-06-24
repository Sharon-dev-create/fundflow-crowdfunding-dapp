"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { Wallet, ExternalLink, AlertTriangle } from "lucide-react";
import {
  useWalletContributions,
  useRefundEligibility,
  useRefund,
} from "@/hooks/useContract";
import { CampaignWithId, CampaignStatus } from "@/lib/contract";
import {
  formatEth,
  formatPercent,
  daysRemaining,
  etherscanAddr,
  formatAddress,
  statusColor,
} from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

// ── Types ─────────────────────────────────────────────────────────────────────
type BackedEntry = {
  campaign: CampaignWithId;
  contribution: bigint | undefined;
};

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner({ color = "#ffb4ab" }: { color?: string }) {
  return (
    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0110 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Refund button — isolated so each campaign gets its own hook call ──────────
function RefundButton({ campaign }: { campaign: CampaignWithId }) {
  // useRefundEligibility returns wagmi's useReadContract shape: { data, isLoading, ... }
  const { data: eligible } = useRefundEligibility(campaign.id);
  const { refund, isPending } = useRefund();

  if (!eligible) return null;

  return (
    <button
      onClick={() => refund(campaign.id)}
      disabled={isPending}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600,
        border: "1px solid rgba(255,180,171,0.3)", background: "rgba(255,180,171,0.08)",
        color: "#ffb4ab", cursor: isPending ? "not-allowed" : "pointer",
        opacity: isPending ? 0.6 : 1, transition: "all 0.2s",
      }}
    >
      {isPending ? <Spinner /> : <AlertTriangle size={12} />}
      {isPending ? "Processing…" : "Claim Refund"}
    </button>
  );
}

// ── Individual backed campaign card ──────────────────────────────────────────
function BackedCard({
  campaign,
  contribution,
  index,
}: {
  campaign: CampaignWithId;
  contribution: bigint;
  index: number;
}) {
  const pct  = formatPercent(campaign.raisedAmount, campaign.goal);
  const days = daysRemaining(campaign.deadline);
  const share =
    campaign.raisedAmount > 0n
      ? Math.round(Number((contribution * 10000n) / campaign.raisedAmount) / 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
    >
      <div
        style={{
          background: "rgba(15,23,42,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          transition: "border-color 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)")
        }
      >
        {/* Status colour band */}
        <div style={{ height: 3, background: `linear-gradient(90deg,${statusColor(campaign.status)},${statusColor(campaign.status)}44)` }} />

        <div style={{ padding: 24 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link
                href={`/campaigns/${campaign.id}`}
                style={{ color: "#dae2fd", fontWeight: 600, fontSize: 16, textDecoration: "none", letterSpacing: "-0.01em", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
              >
                {campaign.title}
              </Link>
              <div style={{ color: "#c7c4d7", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>
                Campaign #{campaign.id.toString()}
              </div>
            </div>
            <StatusPill status={campaign.status} />
          </div>

          {/* Contribution grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
            <div style={{ background: "rgba(78,222,163,0.06)", border: "1px solid rgba(78,222,163,0.15)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ color: "#c7c4d7", fontSize: 10, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Your Contribution</div>
              <div style={{ color: "#4edea3", fontWeight: 700, fontSize: 18, fontFamily: "JetBrains Mono, monospace" }}>
                {formatEth(contribution)}
                <span style={{ fontSize: 12, color: "#c7c4d7", fontWeight: 400, marginLeft: 4 }}>ETH</span>
              </div>
              <div style={{ color: "#c7c4d7", fontSize: 11, marginTop: 4 }}>{share}% of total raised</div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ color: "#c7c4d7", fontSize: 10, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Campaign Total</div>
              <div style={{ color: "#dae2fd", fontWeight: 700, fontSize: 18, fontFamily: "JetBrains Mono, monospace" }}>
                {formatEth(campaign.raisedAmount)}
                <span style={{ fontSize: 12, color: "#c7c4d7", fontWeight: 400, marginLeft: 4 }}>ETH</span>
              </div>
              <div style={{ color: "#c7c4d7", fontSize: 11, marginTop: 4 }}>of {formatEth(campaign.goal)} ETH goal</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#c7c4d7", marginBottom: 6 }}>
              <span>Funding progress</span>
              <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{pct}%</span>
            </div>
            <ProgressBar percent={pct} height={6} />
          </div>

          {/* Footer row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ color: "#c7c4d7", fontSize: 12 }}>
                {campaign.status === CampaignStatus.Active ? `${days}d remaining` : "Ended"}
              </span>
              <span style={{ color: "#c7c4d7", fontSize: 12 }}>
                {campaign.contributorCount.toString()} backers
              </span>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <RefundButton campaign={campaign} />
              <Link
                href={`/campaigns/${campaign.id}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", color: "#c7c4d7", textDecoration: "none" }}
              >
                View <ExternalLink size={11} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BackerPage() {
  const { address, isConnected } = useAccount();

  // useWalletContributions returns { backed: BackedEntry[], isLoading: boolean }
  const { backed, isLoading } = useWalletContributions();

  const totalContributed: bigint = backed.reduce(
    (sum: bigint, b: BackedEntry) => sum + (b.contribution ?? 0n),
    0n
  );
  const activeBacked  = backed.filter((b: BackedEntry) => b.campaign.status === CampaignStatus.Active).length;
  const successBacked = backed.filter((b: BackedEntry) => b.campaign.status === CampaignStatus.Completed).length;
  const hasVotingRights = backed.some((b: BackedEntry) => b.campaign.status === CampaignStatus.Successful);

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px" }}>
        <EmptyState
          icon={<Wallet size={26} />}
          title="Connect your wallet"
          description="Connect a wallet to see your backed campaigns and voting rights."
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 96px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(78,222,163,0.08)", border: "1px solid rgba(78,222,163,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4edea3" }}>
            <Wallet size={17} />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#dae2fd", letterSpacing: "-0.015em" }}>
            Backer Portfolio
          </h1>
        </div>
        <div style={{ paddingLeft: 46 }}>
          <a
            href={etherscanAddr(address!)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4cd7f6", fontSize: 12, fontFamily: "JetBrains Mono, monospace", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            {formatAddress(address!)}
            <ExternalLink size={10} />
          </a>
        </div>
      </motion.div>

      {/* Stats row */}
      {!isLoading && backed.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 32 }}
        >
          {(
            [
              { label: "Total Backed",     value: `${formatEth(totalContributed, 3)} ETH`, accent: "#4edea3" },
              { label: "Campaigns Backed", value: backed.length.toString(),                accent: "#c0c1ff" },
              { label: "Active",           value: activeBacked.toString(),                 accent: "#4cd7f6" },
              { label: "Completed",        value: successBacked.toString(),                accent: "#4edea3" },
            ] as { label: string; value: string; accent: string }[]
          ).map(({ label, value, accent }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              <div style={{ color: "#c7c4d7", fontSize: 10, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</div>
              <div style={{ color: accent, fontSize: 22, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ marginTop: 12, height: 2, borderRadius: 999, background: `linear-gradient(90deg,${accent}50,transparent)` }} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Voting rights banner */}
      {!isLoading && hasVotingRights && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ display: "flex", gap: 10, padding: "12px 16px", background: "rgba(192,193,255,0.05)", border: "1px solid rgba(192,193,255,0.15)", borderRadius: 12, marginBottom: 24 }}
        >
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(192,193,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
            <span style={{ color: "#c0c1ff", fontSize: 11, fontWeight: 700 }}>!</span>
          </div>
          <p style={{ color: "#c7c4d7", fontSize: 13, lineHeight: 1.55 }}>
            You have <strong style={{ color: "#c0c1ff" }}>voting rights</strong> on campaigns with an active milestone request. Visit a campaign to cast your vote.
          </p>
        </motion.div>
      )}

      {/* List */}
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <Skeleton height={18} width="55%" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <Skeleton height={70} />
                <Skeleton height={70} />
              </div>
              <Skeleton height={6} />
            </div>
          ))}
        </div>
      ) : backed.length === 0 ? (
        <EmptyState
          icon={<Wallet size={26} />}
          title="No backed campaigns yet"
          description="Explore campaigns and contribute ETH to start building your backer portfolio."
          action={
            <Link
              href="/campaigns"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 22px", borderRadius: 8, textDecoration: "none", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#dae2fd", fontWeight: 600, fontSize: 14, marginTop: 4 }}
            >
              Explore Campaigns
            </Link>
          }
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {backed.map((b: BackedEntry, i: number) => (
            <BackedCard
              key={b.campaign.id.toString()}
              campaign={b.campaign}
              contribution={b.contribution!}
              index={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}