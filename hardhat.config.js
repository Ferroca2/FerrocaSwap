require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

const dotenv = require("dotenv");
dotenv.config();

const url = `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_KEY}`;



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "mumbai",
  networks: {
    localhost: {
      url: "http://localhost:8545"
    },
    mumbai: {
      chainId: 80001,
      url: url,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
};
