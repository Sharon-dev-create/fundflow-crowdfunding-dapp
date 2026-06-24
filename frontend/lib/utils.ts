import { formatEther } from "viem";

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatEth(value: bigint | undefined, decimals = 4): string {
  if (value === undefined || value === null) return "—";
  return parseFloat(formatEther(value)).toFixed(decimals);
}

export function formatAddress(addr: string): string {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function formatPercent(raised: bigint, goal: bigint): number {
  if (goal === 0n) return 0;
  return Math.min(100, Math.round(Number((raised * 10000n) / goal) / 100));
}

export function daysRemaining(deadline: bigint): number {
  const now = Math.floor(Date.now() / 1000);
  const diff = Number(deadline) - now;
  return Math.max(0, Math.ceil(diff / 86400));
}

export function timeAgo(ts: bigint): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - Number(ts);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function formatDeadline(deadline: bigint): string {
  return new Date(Number(deadline) * 1000).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function statusLabel(status: number): string {
  return ["Active", "Successful", "Failed", "Completed"][status] ?? "Unknown";
}

export function statusColor(status: number): string {
  return ["#4cd7f6", "#4edea3", "#ffb4ab", "#c0c1ff"][status] ?? "#c7c4d7";
}

export function etherscanTx(hash: string): string {
  return `https://sepolia.etherscan.io/tx/${hash}`;
}

export function etherscanAddr(addr: string): string {
  return `https://sepolia.etherscan.io/address/${addr}`;
}