import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log('DeadCoin deploy function');

  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  console.log('got deployments', deployments);
  const { deployer, user } = await getNamedAccounts();

  console.log('going to try and deploy');

  await deploy('DeadCoin', {
    from: deployer,
    log: true,
  });
};

export default func;

func.tags = ['DeadCoin'];