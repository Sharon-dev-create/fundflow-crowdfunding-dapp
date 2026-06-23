"use client";

import { useCallback, useEffect, useState } from "react";
import {
  publicClient,
  CONTRACT_ADDRESS,
  crowdfundingAbi,
  CampaignWithId,
  Campaign,
  Milestone,
} from "@/lib/contract";

/* =====================================================
   INTERNAL SAFE CONTRACT CALL WRAPPER
===================================================== */

async function read<T>(
  functionName: string,
  args: any[] = []
): Promise<T> {
  return (await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: crowdfundingAbi,
    functionName: functionName as any,
    args,
  })) as T;
}

/* =====================================================
   CAMPAIGN COUNT
===================================================== */

export function useCampaignCount() {
  const [count, setCount] = useState<bigint>(0n);
  const [loading, setLoading] = useState(true);

  const fetchCount = useCallback(async () => {
    try {
      setLoading(true);
      const result = await read<bigint>("campaignCount");
      setCount(result);
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
   SINGLE CAMPAIGN
===================================================== */

export function useCampaign(id?: bigint) {
  const [campaign, setCampaign] = useState<CampaignWithId | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCampaign = useCallback(async () => {
    if (id === undefined) return;

    try {
      setLoading(true);

      const result = await read<any>("getCampaign", [id]);

      setCampaign({
        id,
        creator: result.creator,
        title: result.title,
        description: result.description,
        goal: result.goal,
        raisedAmount: result.raisedAmount,
        deadline: result.deadline,
        status: result.status,
        contributorCount: result.contributorCount,
        currentMilestoneIndex: result.currentMilestoneIndex,
        exists: result.exists,
      });
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
   ALL CAMPAIGNS
===================================================== */

export function useAllCampaigns() {
  const [campaigns, setCampaigns] = useState<CampaignWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);

      const count = await read<bigint>("campaignCount");

      const results: CampaignWithId[] = [];

      for (let i = 0n; i < count; i++) {
        const c = await read<any>("getCampaign", [i + 1n]);

        results.push({
          id: i + 1n,
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
      }

      setCampaigns(results);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { campaigns, loading, refetch: fetchAll };
}

/* =====================================================
   MILESTONES
===================================================== */

export function useMilestones(id?: bigint) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMilestones = useCallback(async () => {
    if (id === undefined) return;

    try {
      setLoading(true);

      const result = await read<Milestone[]>("getMilestones", [id]);

      setMilestones(result);
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
   SIMPLE STATS (DERIVED LAYER)
===================================================== */

export function useCampaignStats() {
  const { count, loading } = useCampaignCount();

  return {
    totalCampaigns: count,
    isLoading: loading,
  };
}

/* =====================================================
   REFUND CHECK (UTILITY HOOK)
===================================================== */

export function useRefundEligibility(
  campaignId?: bigint,
  user?: `0x${string}`
) {
  const [eligible, setEligible] = useState(false);

  const check = useCallback(async () => {
    if (!campaignId || !user) return;

    const result = await read<boolean>("isEligibleForRefund", [
      campaignId,
      user,
    ]);

    setEligible(result);
  }, [campaignId, user]);

  useEffect(() => {
    check();
  }, [check]);

  return { eligible, refetch: check };
}