import { TreasuryCard } from "../components/TreasuryCard";
import { ProtocolStats } from "../components/ProtocolStats";
import { StakeForm } from "../components/StakeForm";
import { StakeList } from "../components/StakeList";

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-on-surface">
          Staking Dashboard
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Sepolia Testnet · Live contract data
        </p>
      </div>

      {/* Top metrics */}
      <TreasuryCard />

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left rail */}
        <div className="xl:col-span-4 space-y-6">
          <StakeForm />
          <ProtocolStats />
        </div>

        {/* Main content */}
        <div className="xl:col-span-8">
          <StakeList />
        </div>
      </div>
    </div>
  );
}