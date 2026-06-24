"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Clock, Target } from "lucide-react";
import { CampaignWithId } from "@/lib/contract";
import { formatEth, formatPercent, formatAddress, daysRemaining, statusColor, statusLabel } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";

export function CampaignCard({ campaign, index = 0 }: { campaign: CampaignWithId; index?: number }) {
  const pct = formatPercent(campaign.raisedAmount, campaign.goal);
  const days = daysRemaining(campaign.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <Link href={`/campaigns/${campaign.id}`} className="block h-full" style={{ textDecoration: "none" }}>
        <div className="h-full flex flex-col" style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(192,193,255,0.2)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(192,193,255,0.1)"; }}
          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)"; }}
        >
          {/* Color band */}
          <div style={{ height: 4, background: `linear-gradient(90deg,${statusColor(campaign.status)},${statusColor(campaign.status)}44)` }} />

          <div className="flex flex-col flex-1 p-6 gap-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div style={{ color: "#dae2fd", fontWeight: 600, fontSize: 16, lineHeight: 1.3, marginBottom: 4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                  {campaign.title}
                </div>
                <div style={{ color: "#c7c4d7", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
                  by {formatAddress(campaign.creator)}
                </div>
              </div>
              <StatusPill status={campaign.status} />
            </div>

            {/* Description */}
            <div style={{ color: "#c7c4d7", fontSize: 13, lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", flex: 1 }}>
              {campaign.description}
            </div>

            {/* Progress */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span style={{ color: "#4edea3", fontWeight: 600, fontSize: 20, fontFamily: "JetBrains Mono, monospace" }}>{formatEth(campaign.raisedAmount)} <span style={{ fontSize: 13, color: "#c7c4d7", fontWeight: 400 }}>ETH</span></span>
                <span style={{ color: "#c7c4d7", fontSize: 12 }}>{pct}%</span>
              </div>
              <ProgressBar percent={pct} />
              <div style={{ color: "#c7c4d7", fontSize: 12, marginTop: 6 }}>of {formatEth(campaign.goal)} ETH goal</div>
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-1.5" style={{ color: "#c7c4d7", fontSize: 12 }}>
                <Users size={12} />
                <span>{campaign.contributorCount.toString()} backers</span>
              </div>
              <div className="flex items-center gap-1.5" style={{ color: campaign.status === 0 && days < 3 ? "#ffb4ab" : "#c7c4d7", fontSize: 12 }}>
                <Clock size={12} />
                <span>{campaign.status === 0 ? `${days}d left` : "Ended"}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto" style={{ color: "#c7c4d7", fontSize: 12 }}>
                <Target size={12} />
                <span>#{campaign.id.toString()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}