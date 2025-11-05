import { ethers } from "ethers";

const RPC = import.meta.env.VITE_ARC_RPC_URL;
const USDC_ADDR = import.meta.env.VITE_USDC_CONTRACT_ADDRESS;
const DECIMALS = 6;

const USDC_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
];

export async function getProvider() {
  // If user has MetaMask, prefer it
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  }
  // fallback read-only provider
  return new ethers.JsonRpcProvider(RPC);
}

export async function getBalance(address) {
  const provider = await getProvider();
  const contract = new ethers.Contract(USDC_ADDR, USDC_ABI, provider);
  const raw = await contract.balanceOf(address);
  const num = Number(raw) / (10 ** DECIMALS);
  return num;
}

// to send, use signer (MetaMask)
export async function sendUSDCWithMetaMask(to, amount) {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(USDC_ADDR, USDC_ABI, signer);
  const tx = await contract.transfer(to, ethers.parseUnits(String(amount), DECIMALS));
  return tx.hash;
}
