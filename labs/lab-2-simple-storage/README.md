# Lab 2 — Simple Storage

**Time:** 55 minutes · **Level:** Beginner · **Format:** Hands-on

Write, compile and deploy your first smart contract with Remix IDE, then read and write data on the blockchain.

**Code:** [`contracts/SimpleStorage.sol`](../../contracts/SimpleStorage.sol)

## Goals

- Understand the structure of a Solidity contract.
- Compile and deploy with Remix, first on Remix VM and then on LAB Chain.
- Tell a **write** (costs gas, needs confirmation) from a **read** (free, instant).

## Prerequisites

- [Lab 1](../lab-1-metamask-lab-chain/README.md) complete: MetaMask on LAB Chain with LAB.

## The contract

| Part | Code | Meaning |
|---|---|---|
| State variable | `uint256 private favoriteNumber` | The stored number |
| State variable | `address public lastUpdatedBy` | Who changed it last (Solidity creates the getter) |
| Event | `NumberChanged(address indexed by, uint256 newNumber)` | Lets front ends follow changes |
| Write | `store(uint256 _number)` | Saves the number, records `msg.sender`, emits the event |
| Read | `retrieve() view returns (uint256)` | Returns the number; free to call |

`private` does not hide data — anything on a blockchain can be read.

## Steps

1. Open https://app.remix.live → **Files** → create `SimpleStorage.sol` and paste the contract. (The slide deck's "Remix 2026" slide has a one-click **Open in Remix** link.)
2. **Compile** tab → **Advanced Configurations** → **EVM Version = `prague`** → **Compile** (green tick).
3. **Deploy** tab → Environment **Remix VM** (free). Click **Deploy**.
4. Under **Deployed Contracts**: `retrieve` → **Call** → `0`. Enter `42` in `store` → **Transact** → `retrieve` → `42`. Try `lastUpdatedBy`.
5. When you are comfortable, switch the Environment to **MetaMask** (MetaMask must be on LAB Chain).
6. Click **Deploy** → confirm in MetaMask → wait about 12 seconds for the block.
7. Repeat step 4 on the real contract.
8. **Copy the contract address** (copy icon beside the contract name) and open it in https://explorer.labchain.la.

Remix marks writes **Transact** and reads **Call**. Only writes ask MetaMask to confirm.

## Checkpoint

- You have your own `SimpleStorage` address on LAB Chain.
- `retrieve` returns `42` after `store(42)`, and the transaction appears in the explorer.

**Keep the address** — Lab 5 loads it in the DApp.

## Troubleshooting

| Problem | Fix |
|---|---|
| Insufficient funds | You have no LAB; go back to Lab 1 |
| Wrong network | Switch MetaMask to LAB Chain, then refresh Remix |
| Compiler error | Check every `;` and `{ }` |
| Deploy clicked but no MetaMask popup | Click the MetaMask extension icon |
| Remix compiles for `osaka` | Set EVM Version to `prague`; LAB Chain does not activate Osaka opcodes |

## Optional: local Ganache

No LAB needed. In Remix choose **Custom - External Http Provider**, enter `http://127.0.0.1:7545` and compile with EVM Version `paris` (Ganache GUI 7.7 predates newer opcodes such as `PUSH0`). See the "Remix + Ganache" slide and the compatibility notes in the [project README](../../../README.md).

## Challenge

Add `string public message` and a function `setMessage(string memory _msg)` that updates it. Redeploy and test.

## Next

[Lab 3 — ERC-20 Token](../lab-3-erc20-token/README.md)
