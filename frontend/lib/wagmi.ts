"use client";
import { getDefaultConfig,
  metaMaskWallet,
  coinbaseWallet,
  rainbowWallet,
  walletConnectWallet
 } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
import { http } from "wagmi";
import { QueryClient } from "@tanstack/react-query";

export const wagmiConfig = getDefaultConfig({
  appName: "FundFlow",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "demo",
  chains: [sepolia],
  transports: { [sepolia.id]: http(process.env.NEXT_PUBLIC_RPC_URL ?? "https://rpc.ankr.com/eth_sepolia") },
  ssr: false,
});

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 12_000, gcTime: 5 * 60_000, retry: 2 } },
});