import { useEffect, useState, useCallback } from "react";
import {
  publicClient,
  CONTRACT_ADDRESS,
  crowdfundingAbi,
  CampaignWithId,
  Milestone,
} from "@/lib/contract";

/* =====================================================
   HOOK: Get campaign count
===================================================== */

export function useCampaignCount() {
  const [count, setCount] = useState<bigint>(0n);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(async () => {
    try {
      setLoading(true);

      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: crowdfundingAbi,
        functionName: "campaignCount",
      });

      setCount(result as bigint);
    } catch (err) {
      console.error("useCampaignCount error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);

  return { count, loading, refetch: fetchCount };
}

/* =====================================================
   HOOK: Get single campaign
===================================================== */

export function useCampaign(id: bigint | undefined) {
  const [campaign, setCampaign] = useState<CampaignWithId | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCampaign = useCallback(async () => {
    if (id === undefined) return;

    try {
      setLoading(true);

      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: crowdfundingAbi,
        functionName: "getCampaign",
        args: [id],
      });

      const c = result as any;

      setCampaign({
        id,
        creator: c.creator,
        title: c.title,
        description: c.description,
        goal: c.goal,
        raisedAmount: c.raisedAmount,
        deadline: c.deadline,
        status: c.status,
        contributorCount: c.contributorCount,
        currentMilestoneIndex: c.currentMilestoneIndex,
        exists: c.exists,
      });
    } catch (err) {
      console.error("useCampaign error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCampaign();
  }, [fetchCampaign]);

  return { campaign, loading, refetch: fetchCampaign };
}

/* =====================================================
   HOOK: Get milestones
===================================================== */

export function useMilestones(id: bigint | undefined) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMilestones = useCallback(async () => {
    if (id === undefined) return;

    try {
      setLoading(true);

      const result = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: crowdfundingAbi,
        functionName: "getMilestones",
        args: [id],
      });

      setMilestones(result as Milestone[]);
    } catch (err) {
      console.error("useMilestones error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  return { milestones, loading, refetch: fetchMilestones };
}

/* =====================================================
   HOOK: Campaign stats (derived)
===================================================== */

export function useCampaignStats() {
  const { count, loading } = useCampaignCount();

  return {
    totalCampaigns: count,
    isLoading: loading,
  };
}