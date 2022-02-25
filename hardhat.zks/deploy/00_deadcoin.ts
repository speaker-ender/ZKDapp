import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as ethers from "ethers";
import * as zk from 'zksync-web3';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

dotenv.config();

// An example of a deploy script which will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  const zkWallet = new zk.Wallet(process.env.TEST_WALLET_PRIVATE_KEY || "");
  const deployer = new Deployer(hre, zkWallet);

  const artifact = await deployer.loadArtifact('DeadCoin');

  // const deploymentFee = await deployer.estimateDeployFee(artifact, []);

  // const parsedFee = ethers.utils.formatUnits(deploymentFee.toString(), USDC_DECIMALS);
  // console.log(`The deployment will cost ${parsedFee} USDC`);
  const depositAmount = ethers.utils.parseEther("0.02");

  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: zk.utils.ETH_ADDRESS,
    amount: depositAmount,
  });

  await depositHandle.wait();

  const deadCoin = await deployer.deploy(artifact, []);

  const contractAddress = deadCoin.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}!`);

  // Call the deployed contract.
  // const greetingFromContract = await mediumRareStakeContract.greet();
  // if (greetingFromContract == greeting) {
  //     console.log(`Contract greets us!`);
  // } else {
  //     console.error(`Contract said something unexpected: ${greetingFromContract}`);
  // }
}