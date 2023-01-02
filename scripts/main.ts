import { send, withdraw } from "./utils";
import { outbox } from "./outbox";

import { getL2Network, Erc20Bridger, L1ToL2MessageStatus } from "@arbitrum/sdk";
import { ethers } from "hardhat";
require("dotenv").config();
const erc20Address = "0xD5194c93D4d4F74Abe5DC60d84d930fD6De38577";

const walletPrivateKey = process.env.DEVNET_PRIVKEY as string;
const l1Provider = new ethers.providers.JsonRpcProvider(process.env.L1RPC);
const l2Provider = new ethers.providers.JsonRpcProvider(process.env.L2RPC);
const l1Wallet = new ethers.Wallet(walletPrivateKey, l1Provider);
const l2Wallet = new ethers.Wallet(walletPrivateKey, l2Provider);
const tokenDepositAmount = ethers.utils.parseUnits("50");

const main = async () => {
  // await send()
  // const tx = await withdraw(ethers.utils.parseUnits("5"), erc20Address)
  await outbox(
    "0xb0a74caf569437ad9c01b6558623f9040269db0e20aa1d6a43d3f83cfec39312"
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
