import { HardhatRuntimeEnvironment } from 'hardhat/types';
import * as ethers from 'ethers';
import * as zk from 'zksync-web3';
import { Deployer } from '@matterlabs/hardhat-zksync-deploy';

// An example of a deploy script which will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
    // const zkWallet = new zk.Wallet(process.env.TEST_WALLET_PRIVATE_KEY || "");
    // const deployer = new Deployer(hre, zkWallet);

    // const deployments = await deployer.hre.deployments.all();

    // const deadCoinAddress = deployments['DeadCoin'].address;
    // const mediumRareStakeAddress = deployments['MediumRareStake'].address;

    // const artifact = await deployer.loadArtifact('DEX');

    // const USDC_ADDRESS = "0xeb8f08a975ab53e34d8a0330e0d34de942c95926";
    // const USDC_DECIMALS = 6;

    // const deploymentFee = await deployer.estimateDeployFee(artifact, [deadCoinAddress, mediumRareStakeAddress], USDC_ADDRESS);

    // const parsedFee = ethers.utils.formatUnits(deploymentFee.toString(), USDC_DECIMALS);
    // console.log(`The deployment will cost ${parsedFee} USDC`);


    // const depositHandle = await deployer.zkWallet.deposit({
    //     to: deployer.zkWallet.address,
    //     token: zk.utils.ETH_ADDRESS,
    //     amount: parsedFee,
    // });
    // await depositHandle.wait();

    // const dexContract = await deployer.deploy(artifact, [deadCoinAddress, mediumRareStakeAddress]);

    // const contractAddress = dexContract.address;
    // console.log(`${artifact.contractName} was deployed to ${contractAddress}!`);

}