const { ethers } = require("hardhat");

async function main() {
    // Get the deployer's wallet address
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for HashStorage (match the contract name here)
    const HashStorage = await ethers.getContractFactory("HashStorage"); 
    console.log("Deploying HashStorage contract...");
    
    // Deploy the contract
    const hashStorage = await HashStorage.deploy();
    console.log(hashStorage);

    const receipt = await hashStorage.deployTransaction.wait();
    console.log("Transaction mined in block:", receipt.blockNumber);


    console.log("HashStorage contract deployed to:", hashStorage.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
