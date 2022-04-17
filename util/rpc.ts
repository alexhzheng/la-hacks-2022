import { JsonRpcProvider } from "@ethersproject/providers";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers, utils } from "ethers";
import qs from 'qs';
import { getBills } from "./firebase";

const rpcUrl = "https://rpc.ankr.com/eth_rinkeby";
const testWallet = "0x86283791B4e9BF64AA71b921A302559b48911c61";

/* Test the ethers and thirdweb sdk */
async function getProvider() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  // console.log(await getRecentTransactions(etherscanProvider, testWallet));
  return provider;
}

async function getEtherscanProvider() {
  const etherscanAPIKey = "R4THFBMEYI8YEYQ31D5H2VBAUMTGMZ7TVZ";
  const etherscanProvider = new ethers.providers.EtherscanProvider("rinkeby", etherscanAPIKey);
  return etherscanProvider
}

/**
 * Function to check if transaction matches
 * @param provider 
 * @param hash 
 * @param senderPhone 
 * @returns 
 */
async function checkTransaction(provider: JsonRpcProvider, hash: string, senderPhone: string) {
  const transaction = await provider.getTransaction(hash);
  const amount = ethers.utils.formatEther(transaction.value);
  const receiver = transaction.to;
  return {amount, receiver, senderPhone};
  // for (const t of transactionList) {
  //   for (const entry of t) {
  //     if (entry.phone == senderPhone && Math.abs(parseFloat(amount) - entry.amount) < 0.001 && receiver == ent) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}

/**
 * Get the balance of a wallet
 * @param provider 
 * @param address 
 */
const getBalance = async (provider: JsonRpcProvider, address: string) => {
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

/**
 * Returns the current gas price in gwei
 * @param provider 
 * @returns 
 */
const getGasPrice = async (provider: any) => {
  const gasPrice = await provider.getGasPrice();
  return utils.formatUnits(gasPrice, 'gwei');
}

/**
 * Returns the recent transactions of an address. From https://github.com/ethers-io/ethers.js/issues/326
 
 * @param provider 
 * @param address 
 * @returns 
 */
const getRecentTransactions = async (provider: any, address: string) => {
  const currentBlock = await provider.getBlockNumber()
  const blockTime = 15; // ETH block time is 15 seconds

  //Block number 2 hours, 24 hours and 48 hours ago
  const block2 = currentBlock - (2 * 60 * 60 / blockTime);
  const block24 = currentBlock - (24 * 60 * 60 / blockTime);
  const block48 = currentBlock - (48 * 60 * 60 / blockTime);

  // Get all txs for address since 2 hours ago
  let history = await provider.getHistory(address, block2, currentBlock);

  // If you got nothing back (i.e no txns), try 24 hours and then 48 hours
  (history.length === 0 ? history = await provider.getHistory(address, block24, currentBlock) : null);
  (history.length === 0 ? history = await provider.getHistory(address, block48, currentBlock) : null);

  return history;
}

/**
 * Gets the current price of 1 ETH in USD
 * @returns 
 */
const getEthPriceInUSD = async () => {
  const url = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
  const response = await fetch(url);
  const data = await response.json();
  return data.ethereum.usd;
}

/* Return quote for a given token pair
https://www.0x.org/docs/guides/swap-tokens-with-0x-api#fetching-a-swap-quote
Note: Doesn't support Rinkeby rip */
const oxSwap = async (provider: any, params: { buyToken: string, sellToken: string, buyAmount: string }) => {
  const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
  );
  console.log(await response.json());
  provider.sendTransactin(response.json());
}

export {
  getProvider, oxSwap, getGasPrice, getEthPriceInUSD, getBalance, getRecentTransactions, getEtherscanProvider, checkTransaction
};
