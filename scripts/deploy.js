const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Contract deployed to:", upload.address);         //by  npx hardhat run --network localhost scripts/deploy.js it will copile and deploy smart contract
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});