import { createPublicClient, createWalletClient, http, custom } from "viem";
import { sepolia } from "wagmi/chains";



export const CONTRACT_ADDRESS =
  "0xYourDeployedFundFlowContractAddressHere";

/* -------------------------------------------------------
   ABI (FundFlow Crowdfunding Contract)
-------------------------------------------------------- */

export const fundFlowAbi = [
  {
    type: "function",
    name: "createCampaign",
    stateMutability: "nonpayable",
    inputs: [
      { name: "goal", type: "uint256" },
      { name: "duration", type: "uint256" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "contribute",
    stateMutability: "payable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "withdraw",
    stateMutability: "nonpayable",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "getCampaign",
    stateMutability: "view",
    inputs: [{ name: "id", type: "uint256" }],
    outputs: [
      { name: "creator", type: "address" },
      { name: "goal", type: "uint256" },
      { name: "raised", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "claimed", type: "bool" },
      { name: "status", type: "uint8" }
    ]
  },
  {
    type: "function",
    name: "getCampaignCount",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }]
  }
] as const;

/* -------------------------------------------------------
   CLIENTS
-------------------------------------------------------- */
export type CampaignWithId = {
  id: bigint;

  creator: string;
  goal: bigint;
  raised: bigint;
  deadline: bigint;
  claimed: boolean;
  status: number;
};

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http()
});

function getWalletClient() {
  if (typeof window === "undefined") return null;

  return createWalletClient({
    chain: sepolia,
    transport: custom((window as any).ethereum)
  });
}

/* -------------------------------------------------------
   READ FUNCTIONS
-------------------------------------------------------- */

export async function getCampaign(id: bigint) {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "getCampaign",
    args: [id]
  });
}

export async function getCampaignCount() {
  return publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "getCampaignCount",
    args: [id],
  });

   return formatCampaign(id, raw);
}

/* -------------------------------------------------------
   WRITE FUNCTIONS
-------------------------------------------------------- */

export async function createCampaign(goal: bigint, duration: bigint) {
  const wallet = getWalletClient();
  if (!wallet) throw new Error("Wallet not connected");

  const [account] = await wallet.getAddresses();

  return wallet.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "createCampaign",
    args: [goal, duration]
  });
}

export async function contribute(id: bigint, value: bigint) {
  const wallet = getWalletClient();
  if (!wallet) throw new Error("Wallet not connected");

  const [account] = await wallet.getAddresses();

  return wallet.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "contribute",
    args: [id],
    value
  });
}

export async function withdraw(id: bigint) {
  const wallet = getWalletClient();
  if (!wallet) throw new Error("Wallet not connected");

  const [account] = await wallet.getAddresses();

  return wallet.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    abi: fundFlowAbi,
    functionName: "withdraw",
    args: [id]
  });
}

/* -------------------------------------------------------
   OPTIONAL HELPERS (UI FRIENDLY)
-------------------------------------------------------- */

export type Campaign = {
  creator: string;
  goal: bigint;
  raised: bigint;
  deadline: bigint;
  claimed: boolean;
  status: number;
};

export function formatCampaign(
  id: bigint,
  raw: readonly [string, bigint, bigint, bigint, boolean, number]
): CampaignWithId {
  return {
    id,

    creator: raw[0],
    goal: raw[1],
    raised: raw[2],
    deadline: raw[3],
    claimed: raw[4],
    status: raw[5],
  };
}