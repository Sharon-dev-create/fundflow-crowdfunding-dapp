"use client";

import { useCallback } from "react";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWriteContract,
} from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { parseEther } from "viem";
import { sepolia } from "wagmi/chains";
import toast from "react-hot-toast";

import {
  CONTRACT_ADDRESS,
  crowdfundingAbi,
  Campaign,
  CampaignWithId,
  Milestone,
  VoteOption,
} from "@/lib/contract";
import { etherscanTx } from "@/lib/utils";

// ── Shared contract base ──────────────────────────────────────────────────────
const CONTRACT = {
  address: CONTRACT_ADDRESS,
  abi: crowdfundingAbi,
  chainId: sepolia.id,
} as const;

// ── Shared write helper ───────────────────────────────────────────────────────
// Plain .ts file — NO JSX. Toast messages are strings only.
function useTxWriter() {
  const qc = useQueryClient();
  const { writeContractAsync } = useWriteContract();

  return useCallback(
    async (
      args: Parameters<typeof writeContractAsync>[0],
      loadingMsg: string,
      successMsg: string
    ): Promise<`0x${string}`> => {
      const toastId = toast.loading(loadingMsg);
      try {
        const hash = await writeContractAsync(args);

        // Plain string — no JSX in a .ts file
        toast.success(
          `${successMsg} View: ${etherscanTx(hash)}`,
          { id: toastId, duration: 6000 }
        );

        setTimeout(() => qc.invalidateQueries(), 3000);
        return hash;
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Transaction failed";
        toast.error(
          msg.includes("User rejected") ? "Transaction rejected." : msg.slice(0, 100),
          { id: toastId }
        );
        throw e;
      }
    },
    [writeContractAsync, qc]
  );
}

/* =============================================================================
   READ HOOKS
============================================================================= */

export function useCampaignCount() {
  return useReadContract({
    ...CONTRACT,
    functionName: "campaignCount",
    query: { refetchInterval: 15_000 },
  });
}

export function useCampaign(id: bigint) {
  return useReadContract({
    ...CONTRACT,
    functionName: "getCampaign",
    args: [id],
    query: {
      enabled: id > 0n,
      refetchInterval: 12_000,
    },
  });
}

export function useCampaigns() {
  const { data: count } = useCampaignCount();
  const total = Number(count ?? 0n);

  const contracts = Array.from({ length: total }, (_, i) => ({
    ...CONTRACT,
    functionName: "getCampaign" as const,
    args: [BigInt(i + 1)] as const,
  }));

  const results = useReadContracts({
    contracts,
    query: {
      enabled: total > 0,
      refetchInterval: 15_000,
    },
  });

  const campaigns = (results.data ?? [])
    .map((r, i) =>
      r.status === "success"
        ? ({ id: BigInt(i + 1), ...(r.result as Campaign) } as CampaignWithId)
        : null
    )
    .filter((c): c is CampaignWithId => c !== null)
    .reverse();

  return {
    campaigns,
    isLoading: results.isLoading,
    refetch: results.refetch,
  };
}

export function useCampaignStats() {
  const { campaigns, isLoading } = useCampaigns();

  const totalRaised    = campaigns.reduce((sum, c) => sum + c.raisedAmount, 0n);
  const activeCount    = campaigns.filter((c) => c.status === 0).length;
  const successCount   = campaigns.filter((c) => c.status === 3).length;
  const totalCampaigns = campaigns.length;

  return { totalRaised, activeCount, successCount, totalCampaigns, isLoading };
}

export function useMilestones(campaignId: bigint) {
  return useReadContract({
    ...CONTRACT,
    functionName: "getMilestones",
    args: [campaignId],
    query: {
      enabled: campaignId > 0n,
      refetchInterval: 12_000,
    },
  });
}

export function useContribution(campaignId: bigint) {
  const { address } = useAccount();
  return useReadContract({
    ...CONTRACT,
    functionName: "getContribution",
    args: address ? [campaignId, address] : undefined,
    query: {
      enabled: !!address && campaignId > 0n,
      refetchInterval: 15_000,
    },
  });
}

export function useContributors(campaignId: bigint) {
  return useReadContract({
    ...CONTRACT,
    functionName: "getContributors",
    args: [campaignId],
    query: { enabled: campaignId > 0n },
  });
}

export function useVoteStatus(campaignId: bigint, milestoneIndex: bigint) {
  const { address } = useAccount();
  return useReadContract({
    ...CONTRACT,
    functionName: "getVoteStatus",
    args: address ? [campaignId, milestoneIndex, address] : undefined,
    query: {
      enabled: !!address && campaignId > 0n,
      refetchInterval: 10_000,
    },
  });
}

export function useRefundEligibility(campaignId: bigint) {
  const { address } = useAccount();
  return useReadContract({
    ...CONTRACT,
    functionName: "isEligibleForRefund",
    args: address ? [campaignId, address] : undefined,
    query: {
      enabled: !!address && campaignId > 0n,
      refetchInterval: 15_000,
    },
  });
}

export function useWalletCampaigns() {
  const { address } = useAccount();
  const { campaigns, isLoading } = useCampaigns();

  const created = campaigns.filter(
    (c) => c.creator.toLowerCase() === address?.toLowerCase()
  );

  return { created, isLoading };
}

export function useWalletContributions() {
  const { address } = useAccount();
  const { campaigns, isLoading } = useCampaigns();

  const ids = campaigns.map((c) => c.id);

  const results = useReadContracts({
    contracts: address
      ? ids.map((id) => ({
          ...CONTRACT,
          functionName: "getContribution" as const,
          args: [id, address] as const,
        }))
      : [],
    query: {
      enabled: !!address && ids.length > 0,
    },
  });

  const backed = campaigns
    .map((c, i) => ({
      campaign: c,
      contribution: results.data?.[i]?.result as bigint | undefined,
    }))
    .filter((x) => x.contribution !== undefined && x.contribution > 0n);

  return { backed, isLoading: isLoading || results.isLoading };
}

/* =============================================================================
   WRITE HOOKS
============================================================================= */

export function useCreateCampaign() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const create = useCallback(
    async (params: {
      title: string;
      description: string;
      goal: string;
      duration: number;
      milestoneTitles: string[];
      milestoneAmounts: string[];
    }) =>
      tx(
        {
          ...CONTRACT,
          functionName: "createCampaign",
          args: [
            params.title,
            params.description,
            parseEther(params.goal),
            BigInt(params.duration),
            params.milestoneTitles,
            params.milestoneAmounts.map((a) => parseEther(a)),
          ],
        },
        "Creating campaign…",
        "Campaign created!"
      ),
    [tx]
  );

  return { create, isPending };
}

export function useContribute() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const contribute = useCallback(
    async (campaignId: bigint, amountEth: string) =>
      tx(
        {
          ...CONTRACT,
          functionName: "contribute",
          args: [campaignId],
          value: parseEther(amountEth),
        },
        `Contributing ${amountEth} ETH…`,
        `Contributed ${amountEth} ETH!`
      ),
    [tx]
  );

  return { contribute, isPending };
}

export function useVote() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const vote = useCallback(
    async (campaignId: bigint, milestoneIndex: bigint, option: VoteOption) =>
      tx(
        {
          ...CONTRACT,
          functionName: "vote",
          args: [campaignId, milestoneIndex, option],
        },
        "Casting vote…",
        "Vote cast!"
      ),
    [tx]
  );

  return { vote, isPending };
}

export function useRequestMilestone() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const request = useCallback(
    async (campaignId: bigint, milestoneIndex: bigint) =>
      tx(
        {
          ...CONTRACT,
          functionName: "requestMilestoneRelease",
          args: [campaignId, milestoneIndex],
        },
        "Requesting milestone release…",
        "Milestone release requested!"
      ),
    [tx]
  );

  return { request, isPending };
}

export function useFinalizeMilestone() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const finalize = useCallback(
    async (campaignId: bigint, milestoneIndex: bigint) =>
      tx(
        {
          ...CONTRACT,
          functionName: "finalizeMilestone",
          args: [campaignId, milestoneIndex],
        },
        "Finalizing milestone…",
        "Milestone finalized!"
      ),
    [tx]
  );

  return { finalize, isPending };
}

export function useRefund() {
  const tx = useTxWriter();
  const { isPending } = useWriteContract();

  const refund = useCallback(
    async (campaignId: bigint) =>
      tx(
        {
          ...CONTRACT,
          functionName: "claimRefund",
          args: [campaignId],
        },
        "Claiming refund…",
        "Refund claimed!"
      ),
    [tx]
  );

  return { refund, isPending };
}

// Re-export types
export type { Campaign, CampaignWithId, Milestone };