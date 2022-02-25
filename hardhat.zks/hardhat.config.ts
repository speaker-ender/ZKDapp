import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "tsconfig-paths/register";
import "@typechain/hardhat";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  zkSyncDeploy: {
    zkSyncNetwork: "https://zksync2-testnet.zksync.dev",
    ethNetwork: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
  },
  zksolc: {
    version: "0.1.0",
    compilerSource: "docker",
    settings: {
      optimizer: {
        enabled: true,
      },
      experimental: {
        dockerImage: "matterlabs/zksolc"
      }
    },
  },
};

export default config;
