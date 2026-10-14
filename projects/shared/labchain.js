// Shared code for every mini project: connect MetaMask + LAB Chain
import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.15.0/dist/ethers.min.js";

export { ethers };

export const LAB_CHAIN = {
  chainId: "0x1466", // 5222
  chainName: "LAB Chain",
  nativeCurrency: { name: "LAB", symbol: "LAB", decimals: 18 },
  rpcUrls: ["https://rpc.labchain.la"],
  blockExplorerUrls: ["https://explorer.labchain.la"]
};

async function ensureLabChain() {
  try {
    await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: LAB_CHAIN.chainId }] });
  } catch (err) {
    // 4902 = MetaMask does not know this network yet → add it
    if (err.code === 4902 || err?.data?.originalError?.code === 4902) {
      await window.ethereum.request({ method: "wallet_addEthereumChain", params: [LAB_CHAIN] });
    } else throw err;
  }
}

/** Connect MetaMask and return { provider, signer, account, contract } */
export async function connect(contractAddress, abi) {
  if (!window.ethereum) throw new Error("Please install MetaMask first");
  if (!ethers.isAddress(contractAddress)) throw new Error("Please set a valid CONTRACT_ADDRESS");
  await ensureLabChain();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const account = await signer.getAddress();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  // Switching account or network in MetaMask → reload the page
  window.ethereum.on?.("accountsChanged", () => location.reload());
  window.ethereum.on?.("chainChanged", () => location.reload());
  return { provider, signer, account, contract };
}

/** Send a transaction and wait for the block, updating the status at every step */
export async function sendTx(statusEl, txPromiseFn) {
  try {
    setStatus(statusEl, "Waiting for confirmation in MetaMask...");
    const tx = await txPromiseFn();
    setStatus(statusEl, "Sent — waiting for the block (~12 s)...");
    await tx.wait();
    setStatus(statusEl, "Done! ", "ok", tx.hash);
    return true;
  } catch (err) {
    setStatus(statusEl, "Error: " + errMsg(err), "err");
    return false;
  }
}

export function setStatus(el, msg, cls = "", txHash) {
  el.className = "status " + cls;
  el.textContent = msg;
  if (txHash) {
    const a = document.createElement("a");
    a.href = `${LAB_CHAIN.blockExplorerUrls[0]}/tx/${txHash}`;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "View in explorer";
    el.append(a);
  }
}

/** Human-readable error message (including the require() message from the contract) */
export function errMsg(err) {
  const data = err.info?.error?.data;
  const rpcMsg = data?.reason || data?.message || err.info?.error?.message;
  return err.reason || rpcMsg || err.shortMessage || err.message;
}

export const short = (addr) => addr.slice(0, 6) + "…" + addr.slice(-4);

export const fmtTime = (ts) => new Date(Number(ts) * 1000).toLocaleString();
