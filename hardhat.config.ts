import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL as string;
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL as string;
const BINANCE_MAINNET_RPC_URL = process.env.BINANCE_MAINNET_RPC_URL as string;
const POLYGON_MUMBAI_RPC_URL = process.env.POLYGON_MUMBAI_RPC_URL as string;
const PRIVATE_KEY = (process.env.PRIVATE_KEY as string) || "0x";
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY as string;
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY as string;
interface Config extends HardhatUserConfig {}

const config: Config = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.8.15",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    // ganache: {
    //   url: GANACHE_RPC_URL,
    // },
    hardhat: {
      // // comment out forking to run tests on a local chain
    },
    // mainnet: {
    //   url: MAINNET_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    //   chainId: 1,
    // },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 5,
    },
    mumbai: {
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 80001,
    },
    // binance: {
    //   url: BINANCE_MAINNET_RPC_URL,
    //   accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
    //   chainId: 56,
    // },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
      goerli: ETHERSCAN_KEY,
    },
  },
};

export default config;
