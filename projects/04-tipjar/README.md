# Mini Project 4 — Tip Jar

**Level:** Medium · **Time:** 45 minutes

A contract that receives and pays out money: anyone can tip with a message, only the owner can withdraw.

**Files:** [`TipJar.sol`](TipJar.sol) · [`index.html`](index.html)

## What you learn

- `payable` — a function that can receive LAB. Without it, sending money reverts.
- `msg.value` — the amount sent, in **wei** (1 LAB = 10¹⁸ wei).
- `address(this).balance` — the money the contract holds.
- `modifier onlyOwner` — a reusable condition (OpenZeppelin ships `Ownable` for this).
- `immutable` — set once in the constructor, never changes.
- `.call{value: …}("")` — the recommended way to send money out.
- Front end: `ethers.parseEther` (LAB → wei) and `ethers.formatEther` (wei → LAB).

## Contract

| Item | Behaviour |
|---|---|
| `owner` (public, immutable) | The deployer |
| `tip(string message)` payable | Stores the tip; reverts with `"TipJar: send some LAB"` if the value is 0 |
| `withdraw()` | Owner only; sends the whole balance; reverts with `"TipJar: not owner"`, `"TipJar: nothing to withdraw"` or `"TipJar: transfer failed"` |
| `totalBalance()` | Money currently held |
| `getTips()` | Every tip (sender, amount, message, time) |

## Run it

Follow the [shared steps](../README.md#same-steps-for-every-project), replacing `0xYOUR_TIPJAR_ADDRESS` in [`index.html`](index.html). Open `/04-tipjar/`.

The **Withdraw** button only appears when the connected account is the owner.

## Try it

1. Enter an amount (for example `0.001`) and a message, click **Send tip**, and confirm in MetaMask. The balance and history update.
2. From a **different account**, try `withdraw` in Remix — it reverts with `"TipJar: not owner"`.
3. As the owner, click **Withdraw**. The jar balance returns to 0 and the LAB lands in your wallet.

### Sending a tip from Remix

Deployed Contracts tab → the **Value** box (default unit `wei`) → enter `500000000000000000` (= 0.5 LAB) → call `tip` with **Transact**. Set Value back to `0` afterwards.

## Security

Hiding the Withdraw button is **not** security — anyone can call `withdraw()` from Remix. The real protection is `onlyOwner` inside the contract.

## Activity

Tip the group with the best demo.

## Challenge

- Require a minimum tip of 0.001 LAB.
- Track `topTipper`, the address that has given the most.
