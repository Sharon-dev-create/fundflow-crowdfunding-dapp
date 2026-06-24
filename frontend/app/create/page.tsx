"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount } from "wagmi";
import { PlusCircle, Trash2, Info, ArrowRight } from "lucide-react";
import { useCreateCampaign } from "@/hooks/useContract";

type MilestoneField = { title: string; amount: string };

const DURATIONS = [
  { label: "7 days",  value: 7  * 86400 },
  { label: "14 days", value: 14 * 86400 },
  { label: "30 days", value: 30 * 86400 },
  { label: "60 days", value: 60 * 86400 },
  { label: "90 days", value: 90 * 86400 },
];

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          color: "#c7c4d7",
          fontSize: 12,
          fontFamily: "JetBrains Mono, monospace",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </label>
      {children}
      {hint && !error && (
        <p style={{ color: "#c7c4d7", fontSize: 12, opacity: 0.65 }}>{hint}</p>
      )}
      {error && (
        <p style={{ color: "#ffb4ab", fontSize: 12 }}>{error}</p>
      )}
    </div>
  );
}

const inputStyle = (focused: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "12px 16px",
  background: "rgba(6,14,32,0.6)",
  border: focused
    ? "1px solid rgba(192,193,255,0.5)"
    : "1px solid rgba(255,255,255,0.08)",
  boxShadow: focused ? "0 0 0 3px rgba(192,193,255,0.07)" : "none",
  borderRadius: 8,
  color: "#dae2fd",
  fontSize: 15,
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "inherit",
});

export default function CreatePage() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { create, isPending } = useCreateCampaign();

  const [title,       setTitle]       = useState("");
  const [description, setDescription] = useState("");
  const [goal,        setGoal]        = useState("");
  const [duration,    setDuration]    = useState(DURATIONS[2].value); // 30d default
  const [milestones,  setMilestones]  = useState<MilestoneField[]>([
    { title: "", amount: "" },
    { title: "", amount: "" },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<Record<string, boolean>>({});

  // ── Milestone helpers ───────────────────────────────────────────────────────
  const addMilestone = () => {
    if (milestones.length >= 10) return;
    setMilestones((m) => [...m, { title: "", amount: "" }]);
  };

  const removeMilestone = (i: number) => {
    if (milestones.length <= 1) return;
    setMilestones((m) => m.filter((_, idx) => idx !== i));
  };

  const updateMilestone = (i: number, field: keyof MilestoneField, val: string) => {
    setMilestones((m) => m.map((ms, idx) => idx === i ? { ...ms, [field]: val } : ms));
  };

  // ── Totals ──────────────────────────────────────────────────────────────────
  const msTotal = milestones.reduce((s, m) => s + (parseFloat(m.amount) || 0), 0);
  const goalNum = parseFloat(goal) || 0;
  const msDiff  = Math.abs(msTotal - goalNum);
  const msMatch = goalNum > 0 && msDiff < 0.0001;

  // ── Validate ────────────────────────────────────────────────────────────────
  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!title.trim())                      e.title       = "Title is required";
    if (!description.trim())                e.description = "Description is required";
    if (!goal || parseFloat(goal) <= 0)     e.goal        = "Goal must be greater than 0";
    if (!msMatch)                           e.milestones  = `Milestone amounts must sum to goal (currently ${msTotal.toFixed(4)} ETH)`;
    milestones.forEach((m, i) => {
      if (!m.title.trim())   e[`ms_title_${i}`]  = "Title required";
      if (!m.amount || parseFloat(m.amount) <= 0) e[`ms_amount_${i}`] = "Amount required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || isPending) return;
    try {
      await create({
        title,
        description,
        goal,
        duration,
        milestoneTitles:  milestones.map((m) => m.title),
        milestoneAmounts: milestones.map((m) => m.amount),
      });
      router.push("/campaigns");
    } catch {
      /* toast handled in hook */
    }
  }

  const f = (key: string) => ({
    onFocus: () => setFocused((p) => ({ ...p, [key]: true })),
    onBlur:  () => setFocused((p) => ({ ...p, [key]: false })),
  });

  if (!isConnected) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: "80px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "48px 32px",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "rgba(192,193,255,0.08)",
              border: "1px solid rgba(192,193,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c0c1ff",
              margin: "0 auto 20px",
            }}
          >
            <PlusCircle size={24} />
          </div>
          <h2 style={{ color: "#dae2fd", fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
            Connect your wallet
          </h2>
          <p style={{ color: "#c7c4d7", fontSize: 14, lineHeight: 1.6 }}>
            You need to connect a wallet to create a campaign.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px 96px" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 36 }}
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
            <PlusCircle size={17} />
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: "#dae2fd",
              letterSpacing: "-0.015em",
            }}
          >
            Launch a Campaign
          </h1>
        </div>
        <p style={{ color: "#c7c4d7", fontSize: 14, paddingLeft: 46 }}>
          Define your project, goal, and milestone payment schedule.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 32,
            marginBottom: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              color: "#c7c4d7",
              fontSize: 11,
              fontFamily: "JetBrains Mono, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            Campaign Details
          </div>

          {/* Title */}
          <Field label="Campaign Title" error={errors.title}>
            <input
              type="text"
              placeholder="e.g. Open-source DeFi analytics dashboard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              {...f("title")}
              style={inputStyle(!!focused.title)}
            />
          </Field>

          {/* Description */}
          <Field
            label="Description"
            hint="Explain your project, why it matters, and what you'll build."
            error={errors.description}
          >
            <textarea
              rows={5}
              placeholder="Describe your project in detail…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              {...f("desc")}
              style={{
                ...inputStyle(!!focused.desc),
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </Field>

          {/* Goal + Duration */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            <Field
              label="Funding Goal (ETH)"
              hint="Must equal sum of milestones"
              error={errors.goal}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="1.0"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  {...f("goal")}
                  style={{ ...inputStyle(!!focused.goal), paddingRight: 52 }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#c7c4d7",
                    fontSize: 13,
                    fontFamily: "JetBrains Mono, monospace",
                    pointerEvents: "none",
                  }}
                >
                  ETH
                </span>
              </div>
            </Field>

            <Field label="Campaign Duration">
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{
                  ...inputStyle(false),
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                {DURATIONS.map((d) => (
                  <option key={d.value} value={d.value} style={{ background: "#171f33" }}>
                    {d.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: errors.milestones
              ? "1px solid rgba(255,180,171,0.3)"
              : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 32,
            marginBottom: 20,
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 16,
              marginBottom: 24,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                color: "#c7c4d7",
                fontSize: 11,
                fontFamily: "JetBrains Mono, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              Milestones ({milestones.length}/10)
            </span>
            {/* Running total */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  color: msMatch ? "#4edea3" : "#c7c4d7",
                  fontSize: 12,
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                Total: {msTotal.toFixed(4)} ETH
                {goalNum > 0 && ` / ${goalNum.toFixed(4)} ETH`}
              </span>
              {msMatch && (
                <span style={{ color: "#4edea3", fontSize: 11 }}>✓</span>
              )}
            </div>
          </div>

          {/* Info banner */}
          <div
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 14px",
              background: "rgba(76,215,246,0.05)",
              border: "1px solid rgba(76,215,246,0.15)",
              borderRadius: 10,
              marginBottom: 24,
            }}
          >
            <Info size={13} color="#4cd7f6" style={{ marginTop: 1, flexShrink: 0 }} />
            <p style={{ color: "#c7c4d7", fontSize: 12, lineHeight: 1.55 }}>
              Milestone amounts must add up to your funding goal exactly. Each
              milestone releases funds only after a contributor vote.
            </p>
          </div>

          {/* Milestone rows */}
          <AnimatePresence initial={false}>
            {milestones.map((ms, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden", marginBottom: 16 }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    padding: 16,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  {/* Milestone number */}
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "rgba(192,193,255,0.1)",
                      border: "1px solid rgba(192,193,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c0c1ff",
                      fontSize: 12,
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: 600,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {i + 1}
                  </div>

                  <div style={{ flex: 1, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {/* Title */}
                    <div style={{ flex: 2, minWidth: 140 }}>
                      <input
                        type="text"
                        placeholder="Milestone title"
                        value={ms.title}
                        onChange={(e) => updateMilestone(i, "title", e.target.value)}
                        onFocus={() => setFocused((p) => ({ ...p, [`ms_t_${i}`]: true }))}
                        onBlur={() =>  setFocused((p) => ({ ...p, [`ms_t_${i}`]: false }))}
                        style={{
                          ...inputStyle(!!focused[`ms_t_${i}`]),
                          fontSize: 14,
                          padding: "10px 14px",
                        }}
                      />
                      {errors[`ms_title_${i}`] && (
                        <p style={{ color: "#ffb4ab", fontSize: 11, marginTop: 4 }}>
                          {errors[`ms_title_${i}`]}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div style={{ flex: 1, minWidth: 110, position: "relative" }}>
                      <input
                        type="number"
                        step="0.0001"
                        min="0"
                        placeholder="0.0000"
                        value={ms.amount}
                        onChange={(e) => updateMilestone(i, "amount", e.target.value)}
                        onFocus={() => setFocused((p) => ({ ...p, [`ms_a_${i}`]: true }))}
                        onBlur={() =>  setFocused((p) => ({ ...p, [`ms_a_${i}`]: false }))}
                        style={{
                          ...inputStyle(!!focused[`ms_a_${i}`]),
                          fontSize: 14,
                          padding: "10px 48px 10px 14px",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#c7c4d7",
                          fontSize: 12,
                          fontFamily: "JetBrains Mono, monospace",
                          pointerEvents: "none",
                        }}
                      >
                        ETH
                      </span>
                      {errors[`ms_amount_${i}`] && (
                        <p style={{ color: "#ffb4ab", fontSize: 11, marginTop: 4 }}>
                          {errors[`ms_amount_${i}`]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Remove */}
                  {milestones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMilestone(i)}
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        border: "1px solid rgba(255,180,171,0.2)",
                        background: "rgba(255,180,171,0.06)",
                        color: "#ffb4ab",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        marginTop: 2,
                        transition: "all 0.15s",
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add milestone */}
          {milestones.length < 10 && (
            <button
              type="button"
              onClick={addMilestone}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: 8,
                border: "1px dashed rgba(192,193,255,0.2)",
                background: "transparent",
                color: "#c0c1ff",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "all 0.15s",
                marginTop: 4,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(192,193,255,0.05)";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(192,193,255,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "rgba(192,193,255,0.2)";
              }}
            >
              <PlusCircle size={14} /> Add milestone
            </button>
          )}

          {errors.milestones && (
            <p style={{ color: "#ffb4ab", fontSize: 12, marginTop: 12 }}>
              {errors.milestones}
            </p>
          )}
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <button
            type="submit"
            disabled={isPending}
            style={{
              width: "100%",
              padding: "15px 0",
              borderRadius: 8,
              border: "none",
              background: isPending
                ? "rgba(192,193,255,0.15)"
                : "linear-gradient(135deg,#c0c1ff,#8083ff)",
              color: isPending ? "#c7c4d7" : "#07006c",
              fontWeight: 700,
              fontSize: 16,
              cursor: isPending ? "not-allowed" : "pointer",
              opacity: isPending ? 0.6 : 1,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow: isPending ? "none" : "0 4px 20px rgba(192,193,255,0.2)",
            }}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Creating campaign…
              </>
            ) : (
              <>
                Launch Campaign <ArrowRight size={16} />
              </>
            )}
          </button>
          <p
            style={{
              color: "#c7c4d7",
              fontSize: 12,
              textAlign: "center",
              marginTop: 12,
              opacity: 0.65,
            }}
          >
            Submitting will open your wallet for confirmation. Gas fees apply.
          </p>
        </motion.div>
      </form>
    </div>
  );
}