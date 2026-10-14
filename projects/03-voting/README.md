# Mini Project 3 — Voting

**Level:** Medium · **Time:** 40 minutes

Transparent voting: one wallet, one vote, results anyone can verify.

**Files:** [`Voting.sol`](Voting.sol) · [`index.html`](index.html)

## What you learn

- `mapping(address => bool)` — a key → value table; here it remembers who has voted.
- `constructor(string[] memory names)` — values passed at deployment.
- `for` loops — long loops cost a lot of gas.
- The safe order inside a function: **check → change state → emit event**.

## Contract

| Item | Behaviour |
|---|---|
| `constructor(string[] names)` | Creates the candidates; reverts with `"Voting: need at least 2 candidates"` for fewer than two |
| `vote(uint256 candidateId)` | Adds one vote; reverts with `"Voting: already voted"` or `"Voting: invalid candidate"` |
| `hasVoted(address)` | Whether an address has voted |
| `getCandidates()` | Names and vote counts |
| `Voted` event | Emitted on every vote |

## Deploy in Remix

On the **Deploy** tab there is a `string[]` box beside the **Deploy** button. Enter the candidates as a JSON-style list:

```
["Noy","Kham","Phet"]
```

Candidate IDs are their positions: `Noy` is `0`, `Kham` is `1`, `Phet` is `2`.

## Run it

Follow the [shared steps](../README.md#same-steps-for-every-project), replacing `0xYOUR_VOTING_ADDRESS` in [`index.html`](index.html). Open `/03-voting/`.

## Try it

1. Click **Vote** for a candidate. The bar chart updates.
2. Try to vote again — the buttons are disabled and the contract would revert with `"Voting: already voted"`.
3. Switch account in MetaMask (the page reloads) and vote again with the second account.

## Limitation: 1 wallet is not 1 person

One person can create many wallets (a Sybil attack). A real election needs a **whitelist**: the contract owner registers the addresses that may vote before voting opens.

## Activity

The whole class votes on tomorrow's lunch.

## Challenge

- Add `uint256 public deadline` and `require(block.timestamp < deadline)` in `vote`.
- Add `mapping(address => bool) public isVoter` and an owner-only `addVoter()`; require `isVoter` to vote.
