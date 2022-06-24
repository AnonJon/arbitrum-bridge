
const { ethers } = require('hardhat')
const {getL2Network,
    Erc20Bridger,
    L1ToL2MessageStatus} = require("@arbitrum/sdk")
const { BigNumber, providers, Wallet } = require('ethers')
const { arbLog, requireEnvVariables } = require("arb-shared-dependencies")
require('dotenv').config()
requireEnvVariables(['DEVNET_PRIVKEY', 'L1RPC', 'L2RPC'])

const walletPrivateKey = process.env.DEVNET_PRIVKEY
const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)
const erc20Address = "0xD5194c93D4d4F74Abe5DC60d84d930fD6De38577"
const l2address = "0x8a8d05c288739C1B4dc55cDA50872CdB2A6dDb18"
const abi = require("../artifacts/contracts/Contract.sol/Token.json")
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)
const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const tokenDepositAmount = ethers.utils.parseUnits("100")


const getInfo = async () => {
    const l2Network = await getL2Network(l2Provider)
    const erc20Bridge = new Erc20Bridger(l2Network)
    console.log(erc20Bridge)
    const expectedL1GatewayAddress = await erc20Bridge.getL1GatewayAddress(
        erc20Address,
        l1Provider
      )
    console.log(expectedL1GatewayAddress)

    const con = new ethers.Contract(erc20Address, abi.abi, l1Provider)
    const bridgeTokenBalance = await con.balanceOf(
        expectedL1GatewayAddress
      )
    console.log(ethers.utils.formatUnits(bridgeTokenBalance, 18))
}

const withdraw = async (amount, address) => {
  // TODO: check if amount is greater than wallet balance
    const l2Network = await getL2Network(l2Provider)
    const erc20Bridge = new Erc20Bridger(l2Network)
    const withdrawTx = await erc20Bridge.withdraw({
        amount: amount,
        erc20l1Address: address,
        l2Signer: l2Wallet,
      })
    const withdrawRec = await withdrawTx.wait()
    console.log(`Token withdrawal initiated! 🥳 ${withdrawRec.transactionHash}`)

    return withdrawRec
}

const deploy = async () => {
  console.log('Deploying the test Token to L1:')
  const L1DappToken = await (
      await ethers.getContractFactory('Token')
    ).connect(l1Wallet)
  const l1DappToken = await L1DappToken.deploy(ethers.utils.parseUnits("1000000"))
  await l1DappToken.deployed()
  console.log(`Token contract is deployed to L1 at ${l1DappToken.address}`)
}

const send = async () => {
  const l2Network = await getL2Network(l2Provider)
  const erc20Bridge = new Erc20Bridger(l2Network)

  console.log("sending...")
  const depositTx = await erc20Bridge.deposit({
      amount: tokenDepositAmount,
      erc20L1Address: erc20Address,
      l1Signer: l1Wallet,
      l2Provider: l2Provider,
  })

  const depositRec = await depositTx.wait()

  console.log("waiting for L2 confirmation...")
  const l2Result = await depositRec.waitForL2(l2Provider)
  l2Result.complete
  ? console.log(
      `L2 message successful: status: ${L1ToL2MessageStatus[l2Result.status]}`
    )
  : console.log(
      `L2 message failed: status ${L1ToL2MessageStatus[l2Result.status]}`
    )
  const l2TokenAddress = await erc20Bridge.getL2ERC20Address(
    erc20Address,
    l1Provider
    )
  console.log("L2 token address: " + l2TokenAddress)
  const l2Token = erc20Bridge.getL2TokenContract(l2Provider, l2TokenAddress)
  
  const testWalletL2Balance = (
      await l2Token.functions.balanceOf(l2Wallet.address)
    )[0]
  console.log("L2 wallet Balance: " + ethers.utils.formatUnits(testWalletL2Balance, 18))
}

const approve = async (l1tokenaddress) => {
  const l2Network = await getL2Network(l2Provider)
  const erc20Bridge = new Erc20Bridger(l2Network)
  const approveTx = await erc20Bridge.approveToken({
    l1Signer: l1Wallet,
    erc20L1Address: l1tokenaddress,
  })

  const approveRec = await approveTx.wait()
  console.log(
      `Arbitrum Bridge approval successful, tx hash: ${approveRec.transactionHash}`
    )
}

module.exports = {send, withdraw, deploy, approve}
