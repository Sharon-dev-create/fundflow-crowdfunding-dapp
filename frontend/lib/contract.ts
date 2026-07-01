import { Address, createPublicClient, http } from "viem";
import { sepolia } from "viem/chains";

export const CONTRACT_ADDRESS =
  "0xfBce23Ce8133fC7f41E56e8D7E1EeE22c11752FB" as const satisfies Address;

export const crowdfundingAbi = [
  // ── Reads ─────────────────────────────────────────
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
          { name: "creator",               type: "address" },
          { name: "title",                 type: "string"  },
          { name: "description",           type: "string"  },
          { name: "goal",                  type: "uint256" },
          { name: "raisedAmount",          type: "uint256" },
          { name: "deadline",              type: "uint256" },
          { name: "status",                type: "uint8"   },
          { name: "contributorCount",      type: "uint256" },
          { name: "currentMilestoneIndex", type: "uint256" },
          { name: "exists",                type: "bool"    },
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
      { name: "campaignId",  type: "uint256" },
      { name: "contributor", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getVoteStatus",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "campaignId",     type: "uint256" },
      { name: "milestoneIndex", type: "uint256" },
      { name: "user",           type: "address" },
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

  // ── Writes ────────────────────────────────────────
  {
    name: "createCampaign",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "title",            type: "string"    },
      { name: "description",      type: "string"    },
      { name: "goal",             type: "uint256"   },
      { name: "duration",         type: "uint256"   },
      { name: "milestoneTitles",  type: "string[]"  },
      { name: "milestoneAmounts", type: "uint256[]" },
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

  // ── Events ────────────────────────────────────────
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
    process.env.NEXT_PUBLIC_RPC_URL ?? "https://sepolia.drpc.org"
  ),
});


export enum CampaignStatus {
  Active     = 0,
  Successful = 1,
  Failed     = 2,
  Completed  = 3,
}

export enum VoteOption {
  Approve = 0,
  Reject  = 1,
}

export type Campaign = {
  creator:               Address;
  title:                 string;
  description:           string;
  goal:                  bigint;
  raisedAmount:          bigint;
  deadline:              bigint;
  status:                number;
  contributorCount:      bigint;
  currentMilestoneIndex: bigint;
  exists:                boolean;
};

export type CampaignWithId = Campaign & { id: bigint };

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