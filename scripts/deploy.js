// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


async function main() {

  const creditTokens = await hre.ethers.getContractFactory("CreditTokens");
  const creditToken = await creditTokens.deploy();

  await creditToken.deployed();

  console.log(`CreditToken deployed to ${creditToken.address}`);

  const carbontokens = await hre.ethers.getContractFactory("CarbonTokensERC20");

  const cbio = await carbontokens.deploy("CBIO", "CBIO");
  await cbio.deployed();
  console.log(`CBIO deployed to ${cbio.address}`);

  const lcfs = await carbontokens.deploy("LCFS", "LCFS");
  await lcfs.deployed();
  console.log(`LCFS deployed to ${lcfs.address}`);

  const ets = await carbontokens.deploy("ETS", "ETS");
  await ets.deployed();
  console.log(`ETS deployed to ${ets.address}`);
  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
