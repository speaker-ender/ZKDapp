import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as ethers from 'ethers';
import * as zk from 'zksync-web3';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

// An example of a deploy script which will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    // const zkWallet = new zk.Wallet(process.env.TEST_WALLET_PRIVATE_KEY || "");
    // const deployer = new Deployer(hre, zkWallet);

    // const artifact = await deployer.loadArtifact('MediumRareStake');

    // const deployments = await deployer.hre.deployments.all();

    // const deadCoinAddress = deployments['DeadCoin'].address;

    // const deploymentFee = await deployer.estimateDeployFee(artifact, [deadCoinAddress]);
    // console.log(deploymentFee.toString());

    // const depositHandle = await deployer.zkWallet.deposit({
    //     to: deployer.zkWallet.address,
    //     token: zk.utils.ETH_ADDRESS,
    //     amount: deploymentFee.mul(2),
    // });
    // await depositHandle.wait();

    // const mediumRareStakeContract = await deployer.deploy(artifact, [deadCoinAddress]);

    // // Show the contract info.
    // const contractAddress = mediumRareStakeContract.address;
    // console.log(`${artifact.contractName} was deployed to ${contractAddress}!`);

    // // Call the deployed contract.
    // // const greetingFromContract = await mediumRareStakeContract.greet();
    // // if (greetingFromContract == greeting) {
    // //     console.log(`Contract greets us!`);
    // // } else {
    // //     console.error(`Contract said something unexpected: ${greetingFromContract}`);
    // // }
}