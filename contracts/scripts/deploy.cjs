const { ethers, network } = require("hardhat");
const fs   = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("═".repeat(56));
  console.log("  FundFlow Deployment");
  console.log("═".repeat(56));
  console.log("Network :", network.name);
  console.log("Deployer:", deployer.address);
  console.log("Balance :", ethers.formatEther(
    await ethers.provider.getBalance(deployer.address)
  ), "ETH");
  console.log("─".repeat(56));

  const PLATFORM_FEE_BPS = Number(process.env.PLATFORM_FEE_BPS ?? 250);

  // 1. Deploy CrowdfundingEscrow
  console.log(`\n[1/4] Deploying CrowdfundingEscrow (fee: ${PLATFORM_FEE_BPS} bps)…`);
  const Escrow  = await ethers.getContractFactory("CrowdfundingEscrow");
  const escrow  = await Escrow.deploy(deployer.address, PLATFORM_FEE_BPS);
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("      ✔ CrowdfundingEscrow:", escrowAddress);

  // 2. Deploy BackerBadge
  console.log("\n[2/4] Deploying BackerBadge…");
  const Badge  = await ethers.getContractFactory("BackerBadge");
  const badge  = await Badge.deploy(deployer.address);
  await badge.waitForDeployment();
  const badgeAddress = await badge.getAddress();
  console.log("      ✔ BackerBadge:", badgeAddress);

  // 3. Link contracts
  console.log("\n[3/4] Linking contracts…");
  await (await escrow.setBackerBadgeContract(badgeAddress)).wait();
  await (await badge.setEscrowContract(escrowAddress)).wait();
  console.log("      ✔ Contracts linked");

  // 4. Save artifact
  console.log("\n[4/4] Saving deployment artifact…");
  const chainId = (await ethers.provider.getNetwork()).chainId.toString();

  const artifact = {
    network:        network.name,
    chainId,
    deployer:       deployer.address,
    timestamp:      new Date().toISOString(),
    platformFeeBps: PLATFORM_FEE_BPS,
    contracts: {
      CrowdfundingEscrow: escrowAddress,
      BackerBadge:        badgeAddress,
    },
  };

  fs.writeFileSync(
    path.resolve(__dirname, "../deployment.json"),
    JSON.stringify(artifact, null, 2)
  );
  console.log("      ✔ Saved to deployment.json");

  console.log("\n" + "═".repeat(56));
  console.log("  Deployment complete");
  console.log("═".repeat(56));
  console.log("CrowdfundingEscrow :", escrowAddress);
  console.log("BackerBadge        :", badgeAddress);

  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log(`\n  Verify:\n  npx hardhat verify --network ${network.name} ${escrowAddress} "${deployer.address}" "${PLATFORM_FEE_BPS}"`);
    console.log(`  npx hardhat verify --network ${network.name} ${badgeAddress} "${deployer.address}"`);
  }

  console.log(`\n  Add to frontend .env:\n  NEXT_PUBLIC_CONTRACT_ADDRESS=${escrowAddress}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
