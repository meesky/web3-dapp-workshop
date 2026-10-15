# Lab 1 — MetaMask + LAB Chain

**Time:** 30 minutes · **Level:** Beginner · **Format:** Hands-on

Create your own wallet, connect it to **LAB Chain**, and receive a little **LAB** to pay for gas in the labs that follow.

## Goals

- Create a wallet and understand why the recovery phrase matters most.
- Add a custom network (RPC) to MetaMask.
- Read a balance and an address in the block explorer.

## Prerequisites

- Chrome, Brave or Edge with the [MetaMask](https://metamask.io) extension installed from metamask.io only.

## Network details

| Setting | Value |
|---|---|
| Network name | LAB Chain |
| RPC URL | `https://rpc.labchain.la` |
| Chain ID | `5222` |
| Currency symbol | `LAB` |
| Block explorer | https://explorer.labchain.la |

Every EVM chain is added to MetaMask with the same five values: name, RPC URL, chain ID, symbol and explorer.

## Steps

1. **Create a new wallet** in MetaMask. Write the 12-word recovery phrase on paper. Do not photograph it, store it in a chat or tell anyone — not even the instructor or support staff. Only your public address (`0x…`) is ever shared.
2. Click the **network selector** (top left) → **Add a custom network**.
3. Enter the five values from the table above → **Save** → switch to **LAB Chain**.
4. Click your account name to **copy your address** (`0x…`).
5. Send the address to the instructor to receive LAB (about 0.1 LAB, enough for every lab).
6. Open https://explorer.labchain.la, paste your address and confirm your balance.

## Checkpoint

- MetaMask shows **LAB Chain** with a balance greater than **0 LAB**.
- You can find your own address in the explorer.

Do not continue to Lab 2 until you have LAB — deploying a contract costs gas.

## Troubleshooting

| Problem | Fix |
|---|---|
| MetaMask warns the network is not on its list | Check that the chain ID is exactly `5222`, then continue |
| "Chain ID returned by RPC does not match" | Re-enter the RPC URL and chain ID from the table; no trailing spaces or slash |
| Balance shows 0 | Confirm MetaMask is on LAB Chain (not Ethereum), then check your address with the instructor |
| Wrong symbol (ETH) | The currency symbol must be `LAB`; edit the network in MetaMask settings |

## Shortcut

The Lab 5 DApp adds and switches to LAB Chain for you when you click **Connect MetaMask**, so you can always repair a missing network from there.

## Next

[Lab 2 — Simple Storage](../lab-2-simple-storage/README.md)
