// imports
const { ethers, run, network } = require("hardhat")
require("@nomiclabs/hardhat-etherscan")
// async main

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log(`Deploying Contract....`)
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to ${simpleStorage.address}`)
  console.log(network.config)

  // Verifying Contract
  if (network.config.chainId === 5 && process.env.ETHER_SCAN_API_KEY) {
    // Wait 6 block conformations before verify
    console.log(`Waiting for block conformations`)
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  // Update the currentValue
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value: ${updatedValue}`)
}

async function verify(contractAddress, args) {
  console.log("Verifying contract....")
  // "verify:verify"
  // 1st verify is task
  // 2nd verify is subtask
  // https://github.com/NomicFoundation/hardhat/blob/dbf7c0b33001ebca01ac3737e8599ef251cf0de7/packages/hardhat-etherscan/src/constants.ts

  // Most common error - contract is already verified.
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!!!")
    } else {
      console.log(err)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
