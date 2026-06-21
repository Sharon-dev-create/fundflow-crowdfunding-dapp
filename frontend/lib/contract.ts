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
    Number((campaign.raised * 100n) / campaign.goal)
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