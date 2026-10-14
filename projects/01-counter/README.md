# Mini Project 1 — Counter

**Level:** Easy · **Time:** 20 minutes

A counter the whole class clicks together. Every click is one transaction on LAB Chain, and every screen updates live.

**Files:** [`Counter.sol`](Counter.sol) · [`index.html`](index.html)

## What you learn

- `require(condition, "message")` — check first; if it fails the whole transaction **reverts** (the gas used is still paid).
- Why the check exists: `uint256` cannot go below zero, and Solidity 0.8+ reverts on `0 - 1` anyway.
- `event` and `contract.on(...)` — the page listens and updates itself when anyone clicks.

## Contract

| Item | Behaviour |
|---|---|
| `count` (public) | Current value |
| `increment()` | Adds 1, emits `CountChanged` |
| `decrement()` | Subtracts 1, reverts with `"Counter: already zero"` when `count` is 0 |

## Run it

Follow the [shared steps](../README.md#same-steps-for-every-project), replacing `0xYOUR_COUNTER_ADDRESS` in [`index.html`](index.html). Open `/01-counter/` on the served site.

## Try it

1. Click **−1** while the count is 0. The page shows `Counter: already zero`.
2. Click **+1** twice, then **−1**. The count is `1`.
3. Ask a classmate to use the **same contract address**. Watch the number change on your screen without refreshing.

## Activity: "Race to 50"

The instructor deploys one Counter and shows the address. Everyone pastes it into their `index.html` and clicks **+1** together until the counter reaches 50. Then open the explorer to see who clicked the most.

If two people click at the same time, both transactions succeed — the blockchain orders them inside a block, so there are no lost updates.

## Challenge

- Add `mapping(address => uint256) public clicks` to count each person's clicks.
- Add `reset()` that only the deployer can call.
