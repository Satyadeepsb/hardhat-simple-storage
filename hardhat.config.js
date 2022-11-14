require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const GOERIL_RPC_URL = process.env.GOERIL_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHER_SCAN_API_KEY = process.env.ETHER_SCAN_API_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERIL_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: "0.8.17",
  etherscan: {
    apiKey: ETHER_SCAN_API_KEY,
  },
}
