"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { Zap, ExternalLink, Target, TrendingUp, Users, Clock } from "lucide-react";
import { CampaignWithId, CampaignStatus } from "@/lib/contract";
import { useContribute, useContribution } from "@/hooks/useContract";
import { formatEth, formatPercent, daysRemaining, formatDeadline } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusPill } from "@/components/ui/StatusPill";

const PRESETS = ["0.01", "0.05", "0.1", "0.5"];

export function ContributionPanel({ campaign }: { campaign: CampaignWithId }) {
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const { isConnected } = useAccount();
  const { contribute } = useContribute();
  const { data: myContribution } = useContribution(campaign.id);

  const pct = formatPercent(campaign.raisedAmount, campaign.goal);
  const days = daysRemaining(campaign.deadline);
  const isActive = campaign.status === CampaignStatus.Active;
  const numAmount = parseFloat(amount);
  const valid = !isNaN(numAmount) && numAmount > 0;

  const handleContribute = async () => {
    if (!valid || loading) return;
    setLoading(true);
    try {
      const hash = await contribute(campaign.id, amount);
      if (hash) { setTxHash(hash as string); setAmount(""); }
    } catch { /* toast handled in hook */ }
    finally { setLoading(false); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats card */}
      <div style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ color: "#c7c4d7", fontSize: 13, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em" }}>Campaign Stats</span>
          <StatusPill status={campaign.status} />
        </div>

        {/* Big raised number */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ color: "#4edea3", fontSize: 32, fontWeight: 700, fontFamily: "JetBrains Mono, monospace", letterSpacing: "-0.02em" }}>
            {formatEth(campaign.raisedAmount)}
            <span style={{ fontSize: 16, color: "#c7c4d7", fontWeight: 400, marginLeft: 6 }}>ETH</span>
          </div>
          <div style={{ color: "#c7c4d7", fontSize: 13, marginTop: 2 }}>raised of {formatEth(campaign.goal)} ETH goal</div>
        </div>

        <ProgressBar percent={pct} height={8} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          {[
            { icon: TrendingUp, label: "Funded", value: `${pct}%` },
            { icon: Users, label: "Backers", value: campaign.contributorCount.toString() },
            { icon: Clock, label: isActive ? "Days left" : "Ended", value: isActive ? `${days}d` : "—" },
            { icon: Target, label: "Deadline", value: formatDeadline(campaign.deadline) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#c7c4d7", fontSize: 11, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                <Icon size={10} />{label}
              </div>
              <div style={{ color: "#dae2fd", fontWeight: 600, fontSize: 15 }}>{value}</div>
            </div>
          ))}
        </div>

        {myContribution && myContribution > 0n && (
          <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(78,222,163,0.08)", border: "1px solid rgba(78,222,163,0.2)", borderRadius: 10, display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#4edea3", fontSize: 13 }}>Your contribution</span>
            <span style={{ color: "#4edea3", fontSize: 13, fontFamily: "JetBrains Mono, monospace", fontWeight: 600 }}>{formatEth(myContribution)} ETH</span>
          </div>
        )}
      </div>

      {/* Contribute form */}
      {isActive && (
        <div style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
          <div style={{ color: "#c7c4d7", fontSize: 13, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Back this campaign</div>

          {/* Presets */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
            {PRESETS.map(p => (
              <button key={p} onClick={() => setAmount(p)}
                style={{ padding: "7px 0", borderRadius: 8, fontSize: 13, fontFamily: "JetBrains Mono, monospace", cursor: "pointer", transition: "all 0.15s", background: amount === p ? "rgba(192,193,255,0.15)" : "rgba(255,255,255,0.04)", border: amount === p ? "1px solid rgba(192,193,255,0.35)" : "1px solid rgba(255,255,255,0.07)", color: amount === p ? "#c0c1ff" : "#c7c4d7" }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ position: "relative", marginBottom: 16 }}>
            <input
              type="number" step="0.0001" min="0" placeholder="0.0000"
              value={amount} onChange={e => setAmount(e.target.value)}
              onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              disabled={!isConnected || loading}
              style={{ width: "100%", padding: "14px 52px 14px 16px", background: "rgba(6,14,32,0.6)", border: focused ? "1px solid rgba(192,193,255,0.5)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "#dae2fd", fontSize: 18, fontFamily: "JetBrains Mono, monospace", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: focused ? "0 0 0 3px rgba(192,193,255,0.08)" : "none" }}
            />
            <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#c7c4d7", fontSize: 14, fontFamily: "JetBrains Mono, monospace" }}>ETH</span>
          </div>

          <button onClick={handleContribute} disabled={!isConnected || !valid || loading}
            style={{ width: "100%", padding: "14px 0", borderRadius: 8, border: "none", cursor: (!isConnected || !valid || loading) ? "not-allowed" : "pointer", background: (!isConnected || !valid || loading) ? "rgba(192,193,255,0.15)" : "linear-gradient(135deg,#c0c1ff,#8083ff)", color: (!isConnected || !valid || loading) ? "#c7c4d7" : "#07006c", fontWeight: 600, fontSize: 15, opacity: (!isConnected || !valid || loading) ? 0.5 : 1, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? (
              <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>Confirming…</>
            ) : !isConnected ? "Connect wallet to contribute" : (
              <><Zap size={16} />Contribute ETH</>
            )}
          </button>

          <AnimatePresence>
            {txHash && (
              <motion.a initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12, padding: "8px 12px", background: "rgba(78,222,163,0.06)", border: "1px solid rgba(78,222,163,0.2)", borderRadius: 8, color: "#4edea3", fontSize: 12, fontFamily: "JetBrains Mono, monospace", textDecoration: "none" }}>
                <ExternalLink size={12} />View transaction on Etherscan
              </motion.a>
            )}
          </AnimatePresence>

          <p style={{ color: "#c7c4d7", fontSize: 11, textAlign: "center", marginTop: 12, lineHeight: 1.5, opacity: 0.7 }}>A 2.5% platform fee applies. Funds held in escrow until milestones are approved.</p>
        </div>
      )}
    </div>
  );
}