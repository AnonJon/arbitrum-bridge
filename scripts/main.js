const {send, withdraw} = require('./utils')
const {outbox} = require('./outbox')

const {getL2Network,
    Erc20Bridger,
    L1ToL2MessageStatus} = require("@arbitrum/sdk")
const { ethers } = require('hardhat')
const { BigNumber, providers, Wallet } = require('ethers')
const { arbLog, requireEnvVariables } = require("arb-shared-dependencies")
require('dotenv').config()
requireEnvVariables(['DEVNET_PRIVKEY', 'L1RPC', 'L2RPC'])
const erc20Address = "0xD5194c93D4d4F74Abe5DC60d84d930fD6De38577"

const walletPrivateKey = process.env.DEVNET_PRIVKEY
const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)
const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)
const tokenDepositAmount = ethers.utils.parseUnits("50")

const main = async () => {
    // await send()
    // const tx = await withdraw(ethers.utils.parseUnits("5"), erc20Address)
    await outbox('0xb0a74caf569437ad9c01b6558623f9040269db0e20aa1d6a43d3f83cfec39312')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })