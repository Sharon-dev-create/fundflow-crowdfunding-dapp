"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { LayoutDashboard, PlusCircle, ExternalLink, ChevronRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  useWalletCampaigns,
  useMilestones,
  useRequestMilestone,
  useFinalizeMilestone,
} from "@/hooks/useContract";
import { CampaignWithId, CampaignStatus, Milestone } from "@/lib/contract";
import {
  formatEth,
  formatPercent,
  formatAddress,
  daysRemaining,
  etherscanAddr,
  statusColor,
} from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner({ color = "#c0c1ff" }: { color?: string }) {
  return (
    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="3" strokeOpacity="0.25" />
      <path d="M12 2a10 10 0 0110 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ── Milestone row inside campaign card ────────────────────────────────────────
function MilestoneRow({
  campaignId,
  milestone,
  index,
  currentIndex,
  isCreator,
}: {
  campaignId: bigint;
  milestone: Milestone;
  index: number;
  currentIndex: bigint;
  isCreator: boolean;
}) {
  const { request,  isPending: requesting  } = useRequestMilestone();
  const { finalize, isPending: finalizing  } = useFinalizeMilestone();

  const isCurrent = BigInt(index) === currentIndex;
  const now       = BigInt(Math.floor(Date.now() / 1000));
  const canFinalize = milestone.requested && !milestone.completed && milestone.votingDeadline > 0n && now > milestone.votingDeadline;
  const canRequest  = isCreator && isCurrent && !milestone.requested && !milestone.completed;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        background: isCurrent && !milestone.approved
          ? "rgba(192,193,255,0.04)"
          : "rgba(255,255,255,0.02)",
        border: isCurrent && !milestone.approved
          ? "1px solid rgba(192,193,255,0.12)"
          : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Status dot */}
      <div style={{ flexShrink: 0 }}>
        {milestone.approved ? (
          <CheckCircle size={16} color="#4edea3" />
        ) : milestone.requested ? (
          <Clock size={16} color="#c0c1ff" />
        ) : (
          <div style={{ width: 16, height: 16, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          </div>
        )}
      </div>

      {/* Title + amount */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: milestone.approved ? "#c7c4d7" : "#dae2fd", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {milestone.title}
        </div>
        <div style={{ color: milestone.approved ? "#4edea3" : "#c7c4d7", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginTop: 2 }}>
          {formatEth(milestone.amount)} ETH
          {milestone.approved && " · Released"}
          {milestone.requested && !milestone.completed && " · Voting open"}
        </div>
      </div>

      {/* Actions */}
      {canRequest && (
        <button
          onClick={() => request(campaignId, BigInt(index))}
          disabled={requesting}
          style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600,
            border: "1px solid rgba(192,193,255,0.3)", background: "rgba(192,193,255,0.08)",
            color: "#c0c1ff", cursor: requesting ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
          }}
        >
          {requesting ? <Spinner /> : null}
          {requesting ? "Requesting…" : "Request Release"}
        </button>
      )}

      {canFinalize && (
        <button
          onClick={() => finalize(campaignId, BigInt(index))}
          disabled={finalizing}
          style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 11, fontWeight: 600,
            border: "1px solid rgba(78,222,163,0.3)", background: "rgba(78,222,163,0.08)",
            color: "#4edea3", cursor: finalizing ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
          }}
        >
          {finalizing ? <Spinner color="#4edea3" /> : null}
          {finalizing ? "Finalizing…" : "Finalize Vote"}
        </button>
      )}
    </div>
  );
}

// ── Campaign management card ──────────────────────────────────────────────────
function CreatorCampaignCard({ campaign }: { campaign: CampaignWithId }) {
  const { data: miles } = useMilestones(campaign.id);
  const milestones = (miles ?? []) as Milestone[];
  const pct = formatPercent(campaign.raisedAmount, campaign.goal);
  const days = daysRemaining(campaign.deadline);
  const released = milestones.filter(m => m.approved).reduce((s, m) => s + m.amount, 0n);

  return (
    <div
      style={{
        background: "rgba(15,23,42,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Color band */}
      <div style={{ height: 3, background: `linear-gradient(90deg,${statusColor(campaign.status)},${statusColor(campaign.status)}44)` }} />

      <div style={{ padding: 24 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Link
              href={`/campaigns/${campaign.id}`}
              style={{
                color: "#dae2fd", fontWeight: 600, fontSize: 16,
                textDecoration: "none", letterSpacing: "-0.01em",
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {campaign.title}
              <ChevronRight size={14} color="#c7c4d7" />
            </Link>
            <div style={{ color: "#c7c4d7", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginTop: 4 }}>
              Campaign #{campaign.id.toString()}
            </div>
          </div>
          <StatusPill status={campaign.status} />
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))", gap: 12, marginBottom: 16 }}>
          {[
            { label: "Raised",     value: `${formatEth(campaign.raisedAmount)} ETH`, color: "#4edea3" },
            { label: "Goal",       value: `${formatEth(campaign.goal)} ETH`,          color: "#dae2fd" },
            { label: "Released",   value: `${formatEth(released)} ETH`,               color: "#c0c1ff" },
            { label: campaign.status === 0 ? "Days left" : "Status",
              value: campaign.status === 0 ? `${days}d` : ["Active","Successful","Failed","Completed"][campaign.status],
              color: campaign.status === 0 && days < 3 ? "#ffb4ab" : "#c7c4d7" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: "10px 12px" }}>
              <div style={{ color: "#c7c4d7", fontSize: 10, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{label}</div>
              <div style={{ color, fontWeight: 600, fontSize: 14 }}>{value}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#c7c4d7", marginBottom: 6 }}>
            <span>Funding progress</span>
            <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{pct}%</span>
          </div>
          <ProgressBar percent={pct} height={6} />
        </div>

        {/* Milestones */}
        {milestones.length > 0 && (
          <div>
            <div style={{ color: "#c7c4d7", fontSize: 11, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
              Milestones — {milestones.filter(m => m.approved).length}/{milestones.length} complete
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {milestones.map((m, i) => (
                <MilestoneRow
                  key={i}
                  campaignId={campaign.id}
                  milestone={m}
                  index={i}
                  currentIndex={campaign.currentMilestoneIndex}
                  isCreator
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const { created, isLoading } = useWalletCampaigns();

  // Aggregate stats
  const totalRaised  = created.reduce((s, c) => s + c.raisedAmount, 0n);
  const totalGoal    = created.reduce((s, c) => s + c.goal, 0n);
  const activeCount  = created.filter(c => c.status === CampaignStatus.Active).length;
  const doneCount    = created.filter(c => c.status === CampaignStatus.Completed).length;

  if (!isConnected) {
    return (
      <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px" }}>
        <EmptyState
          icon={<LayoutDashboard size={26} />}
          title="Connect your wallet"
          description="Connect a wallet to view and manage your campaigns."
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 96px" }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(192,193,255,0.08)", border: "1px solid rgba(192,193,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c0c1ff" }}>
                <LayoutDashboard size={17} />
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 700, color: "#dae2fd", letterSpacing: "-0.015em" }}>Creator Dashboard</h1>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 46 }}>
              <a
                href={etherscanAddr(address!)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#4cd7f6", fontSize: 12, fontFamily: "JetBrains Mono, monospace", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}
              >
                {formatAddress(address!)}
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          <Link
            href="/create"
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "10px 20px", borderRadius: 8, textDecoration: "none",
              background: "linear-gradient(135deg,#c0c1ff,#8083ff)",
              color: "#07006c", fontWeight: 600, fontSize: 14,
              boxShadow: "0 4px 16px rgba(192,193,255,0.2)",
            }}
          >
            <PlusCircle size={15} /> New Campaign
          </Link>
        </div>
      </motion.div>

      {/* Summary stats */}
      {!isLoading && created.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 32 }}
        >
          {[
            { label: "Campaigns",   value: created.length.toString(),     accent: "#c0c1ff" },
            { label: "Total Raised",value: `${formatEth(totalRaised, 3)} ETH`, accent: "#4edea3" },
            { label: "Total Goal",  value: `${formatEth(totalGoal, 3)} ETH`,   accent: "#c7c4d7" },
            { label: "Active",      value: activeCount.toString(),         accent: "#4cd7f6" },
            { label: "Completed",   value: doneCount.toString(),           accent: "#4edea3" },
          ].map(({ label, value, accent }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.04 }}
              style={{
                background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 14, padding: "18px 20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ color: "#c7c4d7", fontSize: 10, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</div>
              <div style={{ color: accent, fontSize: 22, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", letterSpacing: "-0.02em" }}>{value}</div>
              <div style={{ marginTop: 12, height: 2, borderRadius: 999, background: `linear-gradient(90deg,${accent}50,transparent)` }} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Campaign list */}
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {[0, 1].map(i => (
            <div key={i} style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
              <Skeleton height={20} width="50%" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
                {[0,1,2,3].map(j => <Skeleton key={j} height={56} />)}
              </div>
              <Skeleton height={6} />
              <Skeleton height={42} />
              <Skeleton height={42} />
            </div>
          ))}
        </div>
      ) : created.length === 0 ? (
        <EmptyState
          icon={<PlusCircle size={26} />}
          title="No campaigns yet"
          description="Launch your first campaign and start raising funds with milestone-based escrow."
          action={
            <Link
              href="/create"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "11px 22px", borderRadius: 8, textDecoration: "none",
                background: "linear-gradient(135deg,#c0c1ff,#8083ff)",
                color: "#07006c", fontWeight: 600, fontSize: 14, marginTop: 4,
              }}
            >
              <PlusCircle size={15} /> Create Campaign
            </Link>
          }
        />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {created.map((c, i) => (
            <motion.div
              key={c.id.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <CreatorCampaignCard campaign={c} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}