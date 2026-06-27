const { run, network } = require("hardhat");
const fs   = require("fs");
const path = require("path");

async function main() {
  const artifactPath = path.resolve(__dirname, "../deployment.json");

  if (!fs.existsSync(artifactPath)) {
    throw new Error("deployment.json not found. Run deploy script first.");
  }

  const { contracts, deployer, platformFeeBps } = JSON.parse(
    fs.readFileSync(artifactPath, "utf-8")
  );

  console.log(`Verifying on ${network.name}…\n`);

  for (const [name, address] of [
    ["CrowdfundingEscrow", contracts.CrowdfundingEscrow],
    ["BackerBadge",        contracts.BackerBadge],
  ]) {
    console.log(`Verifying ${name}…`);
    try {
      await run("verify:verify", {
        address,
        constructorArguments:
          name === "CrowdfundingEscrow"
            ? [deployer, platformFeeBps]
            : [deployer],
      });
      console.log(`✔ ${name} verified\n`);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Already Verified")) {
        console.log(`✔ Already verified\n`);
      } else {
        console.error(`✗ Failed: ${msg}\n`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
