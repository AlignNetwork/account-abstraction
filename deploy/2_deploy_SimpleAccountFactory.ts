import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploySimpleAccountFactory: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const provider = ethers.provider;
  const from = await provider.getSigner().getAddress();
  const network = await provider.getNetwork();
  // only deploy on local test network.

  const forceDeployFactory =
    process.argv.join(" ").match(/simple-account-factory/) != null;

  /* if (
    !forceDeployFactory &&
    network.chainId !== 31337 &&
    network.chainId !== 1337
  ) {
    return;
  } */

  const entrypoint = await hre.deployments.get("EntryPoint");
  let ret = await hre.deployments.deploy("SimpleAccountFactory", {
    from,
    args: [entrypoint.address],
    log: true,
    deterministicDeployment: true,
  });
  console.log("==simpleaccountfactory addr=", ret.address);
  /*  await hre.deployments.deploy("TestCounter", {
    from,
    deterministicDeployment: true,
    log: true,
  }); */
};

export default deploySimpleAccountFactory;
