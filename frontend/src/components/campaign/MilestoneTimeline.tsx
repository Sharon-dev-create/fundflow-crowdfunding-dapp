"use client";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock, ChevronRight } from "lucide-react";
import { Milestone } from "@/lib/contract";
import { formatEth } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

type Props = { milestones: Milestone[]; currentIndex: bigint; contributorCount: bigint; };

export function MilestoneTimeline({ milestones, currentIndex, contributorCount }: Props) {
  const cur = Number(currentIndex);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {milestones.map((m, i) => {
        const isDone = m.approved;
        const isCurrent = !isDone && i === cur && m.requested;
        const isPending = !isDone && i === cur && !m.requested;
        const isUpcoming = i > cur;

        const totalVotes = Number(m.approvalVotes) + Number(m.rejectionVotes);
        const approvalPct = totalVotes > 0 ? Math.round((Number(m.approvalVotes) / totalVotes) * 100) : 0;
        const quorum = contributorCount > 0n ? Math.round((totalVotes / Number(contributorCount)) * 100) : 0;

        let dotColor = "#464554";
        let label = "Upcoming";
        if (isDone) { dotColor = "#4edea3"; label = "Approved"; }
        else if (isCurrent) { dotColor = "#c0c1ff"; label = "Voting"; }
        else if (isPending) { dotColor = "#4cd7f6"; label = "Pending Request"; }

        return (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} style={{ display: "flex", gap: 16, paddingBottom: i < milestones.length - 1 ? 32 : 0, position: "relative" }}>
            {/* Connector line */}
            {i < milestones.length - 1 && (
              <div style={{ position: "absolute", left: 11, top: 24, bottom: 0, width: 1, background: isDone ? "linear-gradient(180deg,#4edea3,rgba(78,222,163,0.2))" : "rgba(255,255,255,0.06)" }} />
            )}

            {/* Dot */}
            <div style={{ position: "relative", zIndex: 1, flexShrink: 0 }}>
              {isDone ? (
                <CheckCircle size={24} color="#4edea3" fill="rgba(78,222,163,0.15)" />
              ) : isCurrent ? (
                <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #c0c1ff", background: "rgba(192,193,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#c0c1ff", display: "inline-block" }} />
                </div>
              ) : (
                <Circle size={24} color={isUpcoming ? "#464554" : "#4cd7f6"} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span style={{ color: isDone ? "#dae2fd" : isUpcoming ? "#c7c4d7" : "#dae2fd", fontWeight: 600, fontSize: 15 }}>{m.title}</span>
                <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 11, fontFamily: "JetBrains Mono, monospace", background: `${dotColor}18`, color: dotColor, border: `1px solid ${dotColor}30` }}>{label}</span>
              </div>
              <div style={{ color: "#4edea3", fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{formatEth(m.amount)} ETH</div>

              {/* Voting info */}
              {(isCurrent || isDone) && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="flex justify-between text-xs" style={{ color: "#c7c4d7" }}>
                    <span>Approval votes</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace" }}>{m.approvalVotes.toString()} / {m.rejectionVotes.toString()} rejected</span>
                  </div>
                  <ProgressBar percent={approvalPct} height={4} />
                  <div className="flex justify-between" style={{ fontSize: 11, color: "#c7c4d7", fontFamily: "JetBrains Mono, monospace" }}>
                    <span>{approvalPct}% approve</span>
                    <span>Quorum: {quorum}%</span>
                  </div>
                  {isCurrent && m.votingDeadline > 0n && (
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#4cd7f6", fontSize: 12 }}>
                      <Clock size={12} />
                      <span>Deadline: {new Date(Number(m.votingDeadline) * 1000).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}