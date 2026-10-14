# Lab 5 — Build a DApp

**Time:** 75 minutes · **Level:** Intermediate · **Format:** Hands-on

Run a production-structured **React + TypeScript + Ethers.js** DApp that reads from and writes to your `SimpleStorage` contract on **LAB Chain**.

**Code:** [`dapp/`](../../dapp/) — see its [README](../../dapp/README.md) for scripts and folder structure.

## Goals

- Understand the three layers: smart contract ← Ethers.js + MetaMask ← React front end.
- Read from the chain without a wallet; write through MetaMask.
- Follow live events and handle errors such as a rejected transaction.

## Prerequisites

- [Lab 2](../lab-2-simple-storage/README.md) complete (you have a `SimpleStorage` address), or plan to deploy a new one from the page.
- Node.js 20+ and MetaMask.

## Architecture

```
React components ──► hooks (useWallet, useSimpleStorage, useNetworkStatus)
                          │                    │
              reads: JsonRpcProvider      writes: BrowserProvider → MetaMask signs
                          └──────► https://rpc.labchain.la ◄──────┘
```

| Hook | Responsibility |
|---|---|
| `useNetworkStatus` | Polls the public RPC for block number and gas price |
| `useWallet` | Connects MetaMask, adds or switches to LAB Chain, tracks account and balance |
| `useSimpleStorage` | Loads a contract, reads the value, writes, deploys, listens for events |

A frontend needs two things to talk to a contract: its **address** and its **ABI**. The ABI is generated from `SimpleStorage.sol`.

## Steps

1. Install and start the app:

   ```bash
   cd workshop/dapp
   npm install
   npm run dev
   ```

2. Open the URL printed by Vite (normally http://localhost:5173). MetaMask does not work on `file://` pages.
3. The **Network** card should show LAB Chain, chain ID `5222 ✓` and a live block number. The app is already reading the real chain.
4. Click **Connect MetaMask** and approve. MetaMask adds or switches to LAB Chain; your address and balance appear.
5. In **Contract**, paste your `SimpleStorage` address from Lab 2 and click **Load** — or click **Deploy a new SimpleStorage**.
6. **Read** shows the current number (for example `42`).
7. In **Write**, enter a new number → **Store on-chain** → confirm in MetaMask → open the explorer link.
8. Back in Remix, call `retrieve` — you see the same value. One contract, two front ends.
9. Ask a classmate to call `store` on your contract; **Recent activity** updates live.

## Handy features

- The address is saved and added to the URL (`?address=0x…`) — share the link with classmates.
- `?network=ganache` targets a local Ganache at `http://127.0.0.1:7545` (chain ID `1337`).
- Reads work without connecting a wallet; only writes and deploys need MetaMask.

## Checkpoint

You can connect, read and write from your own React app and see the transaction in the explorer.

## Troubleshooting

| Message / symptom | Meaning and fix |
|---|---|
| "MetaMask not found" | Install MetaMask, or on mobile open the page from inside the MetaMask app |
| "MetaMask is on another network" | Click **Switch to LAB Chain** |
| "No contract found at this address on LAB Chain" | Wrong address, or the contract was deployed on another network |
| "You rejected the request in MetaMask" | You clicked Reject; try again |
| "Not enough LAB to pay for gas" | Request LAB from the instructor |
| Page blank or `file://` warning | Run `npm run dev` and use the localhost URL |
| Port 5173 is busy | Vite picks the next free port; use the URL shown in the terminal |
| Open DevTools (F12) → Console | Shows detailed errors |

## Quality checks

```bash
npm test          # unit tests
npm run build     # type-check and production build
```

## Challenge (pick one)

- **Token DApp:** add a `useToken` hook and a card showing `balanceOf` for your Lab 3 token plus a `transfer` form.
- **NFT mint page:** add a `MintCard` that calls `mint(tokenURI)` (ABI: `"function mint(string uri) returns (uint256)"`).

Rendering note: React shows on-chain strings as plain text. Never use `dangerouslySetInnerHTML` with chain data.

## Next

[Mini projects](../../projects/README.md) — five smaller DApps for extra practice.
