# Mini Project 2 — Guestbook

**Level:** Easy · **Time:** 30 minutes

A guestbook on the blockchain: every message is permanent and cannot be deleted.

**Files:** [`Guestbook.sol`](Guestbook.sol) · [`index.html`](index.html)

## What you learn

- `struct` — group several fields into one record (`author`, `message`, `timestamp`).
- A dynamic array that grows with `.push()`.
- `calldata` versus `memory` — `calldata` is read-only and cheaper for function inputs.
- `block.timestamp` — the block's time in seconds.
- `bytes(text).length` counts **bytes**, not characters. Lao uses about 3 bytes per character, so the 300-byte limit is roughly 100 Lao characters.
- Returning a `struct[]` needs a tuple type in the ABI.

## Contract

| Item | Behaviour |
|---|---|
| `sign(string message)` | Saves the message with `msg.sender` and the time; reverts with `"Guestbook: message must be 1-300 bytes"` if empty or too long |
| `getEntries()` | Returns every entry |
| `totalEntries()` | Number of entries |
| `NewEntry` event | Emitted on every signature |

## Run it

Follow the [shared steps](../README.md#same-steps-for-every-project), replacing `0xYOUR_GUESTBOOK_ADDRESS` in [`index.html`](index.html). Open `/02-guestbook/`.

## Try it

1. Write a message and click **Sign**. It appears at the top of the list with your address and time.
2. Try to sign an empty message — the contract reverts.
3. Use the same contract address as a classmate; new messages appear live.

## Security: show chain data as text

The page uses `textContent`, **not** `innerHTML`. Anyone can write to the contract, so a message like `<img src=x onerror=...>` must never be injected as HTML (that would be an XSS attack). Treat on-chain data as untrusted input.

## Activity

The whole class shares one Guestbook. Everyone writes one line about "what I learned today".

## Challenge

Add `likes` to the `Entry` struct and a function `like(uint256 id)`.
