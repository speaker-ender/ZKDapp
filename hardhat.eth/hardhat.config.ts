import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import { NETWORKS } from '../chains';
import "tsconfig-paths/register";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.11",
  defaultNetwork: 'hardhat',
  networks: NETWORKS,
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: process.env.MAIN_ADDRESS || 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      "ropsten": process.env.MAIN_ADDRESS || '',
      "polygonMumbai": process.env.MAIN_ADDRESS || '', // but for rinkeby it will be a specific address
    },
    user: {
      default: 1, // here this will by default take the second account as feeCollector (so in the test this will be a different account than the deployer)
      "ropsten": process.env.SECONDARY_ADDRESS || '',
      "polygonMumbai": process.env.SECONDARY_ADDRESS || '', // but for rinkeby it will be a specific address
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
