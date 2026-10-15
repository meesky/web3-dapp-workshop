# Workshop Guide

Hands-on labs for the **Web3 Workshop — From Zero to Your First DApp on LAB Chain** by **LAOITDEV**. Each lab has its own step-by-step guide. Work through them in order; every lab builds on the previous one.

## Labs

| # | Lab | Time | You will | Guide | Code |
|---|---|---|---|---|---|
| 1 | MetaMask + LAB Chain | 30 min | Create a wallet, add LAB Chain, receive LAB for gas | [Lab 1](labs/lab-1-metamask-lab-chain/README.md) | — |
| 2 | Simple Storage | 55 min | Write, compile and deploy your first smart contract | [Lab 2](labs/lab-2-simple-storage/README.md) | [`contracts/SimpleStorage.sol`](contracts/SimpleStorage.sol) |
| 3 | ERC-20 Token | 40 min | Create and transfer your own token | [Lab 3](labs/lab-3-erc20-token/README.md) | [`contracts/MyToken.sol`](contracts/MyToken.sol) |
| 4 | Mint an NFT | 50 min | Put an image on IPFS and mint an ERC-721 NFT | [Lab 4](labs/lab-4-nft/README.md) | [`contracts/MyNFT.sol`](contracts/MyNFT.sol), [`nft-metadata/0.json`](nft-metadata/0.json) |
| 5 | Build a DApp | 75 min | Run a React + Ethers.js DApp against LAB Chain | [Lab 5](labs/lab-5-dapp/README.md) | [`dapp/`](dapp/) |
| + | Mini projects | 20–45 min each | Five small DApps, easy to medium | [Mini projects](projects/README.md) | [`projects/`](projects/) |

## Before you start

| Need | Notes |
|---|---|
| Browser | Chrome, Brave or Edge |
| Wallet | [MetaMask](https://metamask.io) extension — create a **new wallet just for learning** |
| Remix IDE | https://app.remix.live (nothing to install) |
| Node.js 20+ | Only for Lab 5 and the mini projects |
| LAB for gas | About 0.1 LAB per participant covers every lab (see Lab 1) |

## Rules that apply to every lab

- **Never share, type or photograph your recovery phrase.** Use a dedicated learning wallet.
- Select Solidity **0.8.37** in the Remix compiler dropdown (avoid nightly builds).
- In Remix, set **Advanced Configurations → EVM Version = `prague`** before compiling for LAB Chain. Use `paris` only for a local Ganache.
- Practise on **Remix VM** (free, in-browser) first, then deploy to LAB Chain with MetaMask.
- Keep every **contract address** you deploy. Lab 5 and the mini projects reuse them.
- Everything on a blockchain is public, including Solidity `private` variables.

## LAB Chain at a glance

| Setting | Value |
|---|---|
| Network name | LAB Chain |
| RPC URL | `https://rpc.labchain.la` |
| Chain ID | `5222` |
| Currency symbol | `LAB` |
| Block explorer | https://explorer.labchain.la |

## Folder map

```
workshop/
├─ labs/                guides for Labs 1–5 (this index links to them)
├─ contracts/           Lab 2–4 Solidity contracts
├─ nft-metadata/        NFT metadata template used in Lab 4
├─ dapp/                Lab 5 React DApp
└─ projects/            five mini projects, each with its own guide
```

The slide decks follow the same order as the labs.
