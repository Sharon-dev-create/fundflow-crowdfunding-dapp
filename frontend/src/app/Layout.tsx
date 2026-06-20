import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../providers/Providers";
import { Navbar } from "../components/shared/Navbar";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FundFlow — Decentralized Crowdfunding",
  description:
    "Secure crowdfunding powered by milestone-based smart contracts. Fund innovation through transparent escrow.",
  keywords: ["crowdfunding", "Web3", "Ethereum", "DeFi", "escrow", "milestones"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}