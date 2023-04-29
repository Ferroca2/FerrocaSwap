require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/2264d3781588440fa12e3aa8b3d1030a",
      accounts: [process.env.PRIVATE_KEY],
    }
  },
};
