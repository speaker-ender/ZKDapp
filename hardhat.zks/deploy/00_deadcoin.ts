import * as dotenv from "dotenv";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as ethers from "ethers";
import * as zk from 'zksync-web3';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

dotenv.config();

// An example of a deploy script which will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  // Initialize an Ethereum wallet.
  const zkWallet = new zk.Wallet(process.env.TEST_WALLET_PRIVATE_KEY || "");
  // console.log('created wallet: ', zkWallet);
  // Create deployer object and load desired artifact.
  const deployer = new Deployer(hre, zkWallet);
  // console.log('got deployer: ', deployer);
  // Deposit some funds to L2 in order to be able to perform deposits.
  const depositAmount = ethers.utils.parseEther('0.001');
  // console.log('set amount, going to deposit');
  // console.log(await deployer.ethWallet.getBalance());
  const depositHandle = await deployer.zkWallet.deposit({
    to: deployer.zkWallet.address,
    token: zk.utils.ETH_ADDRESS,
    amount: depositAmount.toString(), // TODO: Why parseEther doesn't work?
  });

  await depositHandle.wait();

  console.log('tried to deposit funds for deployment');
  // Load the artifact we want to deploy.
  const artifact = await deployer.loadArtifact('DeadCoin');
  console.log('loaded artifact');
  // Deploy this contract. The returned object will be of a `Contract` type, similarly to ones in `ethers`.
  // `greeting` is an argument for contract constructor.
  const deadCoin = await deployer.deploy(artifact, []);
  console.log('should have deployed')
  // Show the contract info.
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