"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";

const NAV = [
  { href: "/campaigns", label: "Explore" },
  { href: "/create", label: "Launch" },
  { href: "/dashboard", label: "Creator" },
  { href: "/backer", label: "Portfolio" },
];

export function Navbar() {
  const path = usePathname();
  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(11,19,38,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }} className="h-16 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#c0c1ff,#8083ff)" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L14 5v6L8 14.5L2 11V5L8 1.5Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/><path d="M5 7l3 2 3-2" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ color: "#dae2fd", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em" }}>FundFlow</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ href, label }) => {
            const active = path === href || path.startsWith(href + "/");
            return (
              <Link key={href} href={href} className="relative px-3.5 py-1.5 text-sm rounded-btn transition-colors duration-150" style={{ color: active ? "#dae2fd" : "#c7c4d7" }}>
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-btn" style={{ background: "rgba(192,193,255,0.09)" }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{label}</span>
              </Link>
            );
          })}
        </nav>

        <ConnectButton.Custom>
          {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
            const connected = mounted && account && chain;
            return (
              <div {...(!mounted && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none" as const } })}>
                {!connected ? (
                  <button onClick={openConnectModal} style={{ background: "rgba(192,193,255,0.08)", border: "1px solid rgba(192,193,255,0.22)", color: "#c0c1ff", borderRadius: 8, padding: "7px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c7c4d7", display: "inline-block" }} />
                    Connect Wallet
                  </button>
                ) : chain.unsupported ? (
                  <button onClick={openChainModal} style={{ background: "rgba(255,180,171,0.1)", border: "1px solid rgba(255,180,171,0.25)", color: "#ffb4ab", borderRadius: 8, padding: "7px 16px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    ⚠ Wrong network
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={openChainModal} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#c7c4d7", fontSize: 12, fontFamily: "JetBrains Mono, monospace", cursor: "pointer" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4edea3", display: "inline-block" }} />
                      {chain.name}
                    </button>
                    <button onClick={openAccountModal} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#dae2fd", fontSize: 12, fontFamily: "JetBrains Mono, monospace", cursor: "pointer" }}>
                      {account.displayName}
                      {account.displayBalance && <span style={{ color: "#c7c4d7" }}>{account.displayBalance}</span>}
                    </button>
                  </div>
                )}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {NAV.map(({ href, label }) => {
          const active = path === href || path.startsWith(href + "/");
          return (
            <Link key={href} href={href} style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, whiteSpace: "nowrap", background: active ? "rgba(192,193,255,0.1)" : "transparent", color: active ? "#c0c1ff" : "#c7c4d7", border: active ? "1px solid rgba(192,193,255,0.2)" : "1px solid transparent" }}>{label}</Link>
          );
        })}
      </div>
    </header>
  );
}

