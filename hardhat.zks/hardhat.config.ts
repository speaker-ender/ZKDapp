import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
// import "tsconfig-paths/register";
import "@typechain/hardhat";
// import "@nomiclabs/hardhat-ethers";
// import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
// import "hardhat-gas-reporter";
// import "hardhat-deploy";
// import "hardhat-deploy-ethers";
// import "solidity-coverage";

// dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  zkSyncDeploy: {
    zkSyncNetwork: "http://127.0.0.1:3050",
    ethNetwork: "http://127.0.0.1:8545",
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
