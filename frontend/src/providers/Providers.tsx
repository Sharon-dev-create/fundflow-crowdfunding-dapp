"use client";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { wagmiConfig, queryClient } from "@/lib/wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#c0c1ff",
            accentColorForeground: "#07006c",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "large",
          })}
          showRecentTransactions
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "rgba(23,31,51,0.95)",
                color: "#dae2fd",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "12px",
                fontSize: "0.875rem",
                fontFamily: "Inter, sans-serif",
                maxWidth: "420px",
              },
              success: { iconTheme: { primary: "#4edea3", secondary: "#003824" } },
              error: { iconTheme: { primary: "#ffb4ab", secondary: "#690005" } },
              loading: { iconTheme: { primary: "#c0c1ff", secondary: "#07006c" } },
            }}
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}