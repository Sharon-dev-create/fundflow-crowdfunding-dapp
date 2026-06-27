// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();
require("dotenv").config();

const PRIVATE_KEY   = process.env.PRIVATE_KEY       || "0x" + "0".repeat(64);
const SEPOLIA_RPC   = process.env.SEPOLIA_RPC_URL   || "https://rpc.ankr.com/eth_sepolia";
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type {import('hardhat/config').HardhatUserConfig} */
module.exports = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true,
      evmVersion: "cancun",
    },
  },

  networks: {
    hardhat:  { chainId: 31337 },
    localhost: { url: "http://127.0.0.1:8545", chainId: 31337 },
    sepolia: {
      url:      SEPOLIA_RPC,
      accounts: [PRIVATE_KEY],
      chainId:  11155111,
    },
  },

  etherscan: {
    apiKey: { sepolia: ETHERSCAN_KEY },
  },

  gasReporter: {
    enabled:    process.env.REPORT_GAS === "true",
    currency:   "USD",
    outputFile: "gas-report.txt",
    noColors:   true,
  },

  paths: {
    sources:   "./contracts",
    tests:     "./test",
    cache:     "./cache",
    artifacts: "./artifacts",
  },

  mocha: { timeout: 60000 },
};