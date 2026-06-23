
import { Address } from "viem";
import { createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const CONTRACT_ADDRESS =
  "0xYOUR_DEPLOYED_CONTRACT_ADDRESS" as const satisfies Address;

export const crowdfundingAbi = [

  {
    name: "campaignCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getCampaign",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "creator",               type: "address"  },
          { name: "title",                 type: "string"   },
          { name: "description",           type: "string"   },
          { name: "goal",                  type: "uint256"  },
          { name: "raisedAmount",          type: "uint256"  },
          { name: "deadline",              type: "uint256"  },
          { name: "status",                type: "uint8"    },
          { name: "contributorCount",      type: "uint256"  },
          { name: "currentMilestoneIndex", type: "uint256"  },
          { name: "exists",                type: "bool"     },
        ],
      },
    ],
  },
  {
    name: "getMilestones",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "title",          type: "string"  },
          { name: "amount",         type: "uint256" },
          { name: "completed",      type: "bool"    },
          { name: "approved",       type: "bool"    },
          { name: "requested",      type: "bool"    },
          { name: "votingDeadline", type: "uint256" },
          { name: "approvalVotes",  type: "uint256" },
          { name: "rejectionVotes", type: "uint256" },
        ],
      },
    ],
  },
  {
    name: "getContribution",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "campaignId",   type: "uint256" },
      { name: "contributor",  type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getVoteStatus",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "campaignId",      type: "uint256" },
      { name: "milestoneIndex",  type: "uint256" },
      { name: "user",            type: "address" },
    ],
    outputs: [
      { name: "voted",      type: "bool"    },
      { name: "approvals",  type: "uint256" },
      { name: "rejections", type: "uint256" },
    ],
  },
  {
    name: "isEligibleForRefund",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "campaignId", type: "uint256" },
      { name: "user",       type: "address" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "getContributors",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [{ name: "", type: "address[]" }],
  },

  {
    name: "createCampaign",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "title",            type: "string"   },
      { name: "description",      type: "string"   },
      { name: "goal",             type: "uint256"  },
      { name: "duration",         type: "uint256"  },
      { name: "milestoneTitles",  type: "string[]" },
      { name: "milestoneAmounts", type: "uint256[]"},
    ],
    outputs: [{ name: "campaignId", type: "uint256" }],
  },
  {
    name: "contribute",
    type: "function",
    stateMutability: "payable",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [],
  },
  {
    name: "vote",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "campaignId",     type: "uint256" },
      { name: "milestoneIndex", type: "uint256" },
      { name: "voteOption",     type: "uint8"   },
    ],
    outputs: [],
  },
  {
    name: "requestMilestoneRelease",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "campaignId",     type: "uint256" },
      { name: "milestoneIndex", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "finalizeMilestone",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "campaignId",     type: "uint256" },
      { name: "milestoneIndex", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "claimRefund",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [],
  },
  {
    name: "updateCampaignStatus",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [{ name: "campaignId", type: "uint256" }],
    outputs: [],
  },

  {
    name: "CampaignCreated",
    type: "event",
    inputs: [
      { name: "campaignId",     type: "uint256", indexed: true  },
      { name: "creator",        type: "address", indexed: true  },
      { name: "title",          type: "string",  indexed: false },
      { name: "goal",           type: "uint256", indexed: false },
      { name: "deadline",       type: "uint256", indexed: false },
      { name: "milestoneCount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "ContributionReceived",
    type: "event",
    inputs: [
      { name: "campaignId",   type: "uint256", indexed: true  },
      { name: "contributor",  type: "address", indexed: true  },
      { name: "amount",       type: "uint256", indexed: false },
      { name: "totalRaised",  type: "uint256", indexed: false },
      { name: "badgeTokenId", type: "uint256", indexed: false },
    ],
  },
  {
    name: "VoteCast",
    type: "event",
    inputs: [
      { name: "campaignId",     type: "uint256", indexed: true  },
      { name: "milestoneIndex", type: "uint256", indexed: true  },
      { name: "voter",          type: "address", indexed: true  },
      { name: "vote",           type: "uint8",   indexed: false },
      { name: "approvalVotes",  type: "uint256", indexed: false },
      { name: "rejectionVotes", type: "uint256", indexed: false },
    ],
  },
  {
    name: "MilestoneApproved",
    type: "event",
    inputs: [
      { name: "campaignId",     type: "uint256", indexed: true  },
      { name: "milestoneIndex", type: "uint256", indexed: true  },
      { name: "title",          type: "string",  indexed: false },
      { name: "amount",         type: "uint256", indexed: false },
    ],
  },
  {
    name: "FundsReleased",
    type: "event",
    inputs: [
      { name: "campaignId", type: "uint256", indexed: true  },
      { name: "creator",    type: "address", indexed: true  },
      { name: "amount",     type: "uint256", indexed: false },
    ],
  },
  {
    name: "RefundClaimed",
    type: "event",
    inputs: [
      { name: "campaignId",  type: "uint256", indexed: true  },
      { name: "contributor", type: "address", indexed: true  },
      { name: "amount",      type: "uint256", indexed: false },
    ],
  },
] as const;

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    process.env.NEXT_PUBLIC_RPC_URL ??
      "https://rpc.ankr.com/eth_sepolia"
  ),
});


export enum CampaignStatus {
  Active     = 0,
  Successful = 1,
  Failed     = 2,
  Completed  = 3,
}

/** Vote options passed to vote() */
export enum VoteOption {
  Approve = 0,
  Reject  = 1,
}

/** Mirrors the Campaign struct returned by getCampaign() */
export type Campaign = {
  creator:               Address;
  title:                 string;
  description:           string;
  goal:                  bigint;
  raisedAmount:          bigint;   // field name used by all components
  deadline:              bigint;
  status:                number;
  contributorCount:      bigint;
  currentMilestoneIndex: bigint;
  exists:                boolean;
};

/** Campaign + its on-chain ID — used by CampaignCard, ContributionPanel, etc. */
export type CampaignWithId = Campaign & { id: bigint };

/** Mirrors the Milestone struct returned by getMilestones() */
export type Milestone = {
  title:          string;
  amount:         bigint;
  completed:      boolean;
  approved:       boolean;
  requested:      boolean;
  votingDeadline: bigint;
  approvalVotes:  bigint;
  rejectionVotes: bigint;
};
=======
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
} from "viem";
import { sepolia } from "viem/chains";

/* =====================================================
   CONTRACT CONFIG
===================================================== */

export const CONTRACT_ADDRESS =
  "0xYOUR_DEPLOYED_CONTRACT_ADDRESS" as const;

/* =====================================================
   ABI
   Replace with your exact ABI
===================================================== */

export const fundFlowAbi = [
  // paste ABI here
] as const;

/* =====================================================
   CLIENTS
===================================================== */

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

export function getWalletClient() {
  if (typeof window === "undefined") return null;

  return createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum),
  });
}

/* =====================================================
   TYPES
===================================================== */

/**
 * Raw campaign returned directly from contract.
 */
export type Campaign = {
  creator: string;
  title: string;
  description: string;
  goal: bigint;
  raised: bigint;
  deadline: bigint;
  contributorCount: bigint;
  claimed: boolean;
  status: number;
};

/**
 * Campaign with ID attached.
 *
 * This is the type used by CampaignCard.tsx
 */
export type CampaignWithId = Campaign & {
  id: bigint;
};

/* =====================================================
   MAPPERS
===================================================== */

/**
 * Converts contract tuple into strongly typed object.
 *
 * Adjust indexes to match your contract.
 */
export function mapCampaign(
  id: bigint,
  raw: readonly [
    string,
    string,
    string,
    bigint,
    bigint,
    bigint,
    bigint,
    boolean,
    number
  ]
): CampaignWithId {
  return {
    id,

    creator: raw[0],
    title: raw[1],
    description: raw[2],

    goal: raw[3],
    raised: raw[4],

    deadline: raw[5],

    contributorCount: raw[6],

    claimed: raw[7],

    status: raw[8],
  };
}

/* =====================================================
   READ FUNCTIONS
===================================================== */

export async function getCampaign(
  id: bigint
): Promise<CampaignWithId> {
  const raw = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "getCampaign",
    args: [id],
  });

  return mapCampaign(id, raw as any);
}

export async function getCampaignCount(): Promise<bigint> {
  return await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "campaignCount",
  });
}

export async function getAllCampaigns(): Promise<CampaignWithId[]> {
  const count = await getCampaignCount();

  const campaigns = await Promise.all(
    Array.from({ length: Number(count) }, (_, i) =>
      getCampaign(BigInt(i + 1))
    )
  );

  return campaigns;
}

/* =====================================================
   WRITE FUNCTIONS
===================================================== */

export async function createCampaign(
  title: string,
  description: string,
  goal: bigint,
  deadline: bigint
) {
  const walletClient = getWalletClient();

  if (!walletClient) {
    throw new Error("Wallet not available");
  }

  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "createCampaign",
    account,
    args: [
      title,
      description,
      goal,
      deadline,
    ],
  });
}

export async function contribute(
  campaignId: bigint,
  amount: bigint
) {
  const walletClient = getWalletClient();

  if (!walletClient) {
    throw new Error("Wallet not available");
  }

  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "contribute",
    account,
    args: [campaignId],
    value: amount,
  });
}

export async function claimFunds(
  campaignId: bigint
) {
  const walletClient = getWalletClient();

  if (!walletClient) {
    throw new Error("Wallet not available");
  }

  const [account] = await walletClient.getAddresses();

  return walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "claimFunds",
    account,
    args: [campaignId],
  });
}

/* =====================================================
   HELPERS
===================================================== */

export function isCampaignActive(
  campaign: CampaignWithId
): boolean {
  return campaign.status === 0;
}

export function progressPercent(
  campaign: CampaignWithId
): number {
  if (campaign.goal === 0n) return 0;

  return Math.min(
    100,
    Number((campaign.raisedAmount * 100n) / campaign.goal)
  );
}

export function hasEnded(
  campaign: CampaignWithId
): boolean {
  return (
    Number(campaign.deadline) <
    Math.floor(Date.now() / 1000)
  );
}

