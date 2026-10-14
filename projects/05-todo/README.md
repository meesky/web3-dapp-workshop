# Mini Project 5 — Todo List

**Level:** Medium · **Time:** 40 minutes

A to-do list where every wallet has its own list. Switch accounts in MetaMask and you see a different one.

**Files:** [`TodoList.sol`](TodoList.sol) · [`index.html`](index.html)

## What you learn

- `mapping(address => Task[])` — every wallet owns an array.
- `storage` versus `memory`: a `storage` reference edits the real on-chain data; a `memory` copy is temporary and its edits are **not** saved.
- `msg.sender` inside a `view` function is the calling address, so the contract object must be created with a **signer** for `getMyTasks()` to return your list.

## Contract

| Item | Behaviour |
|---|---|
| `addTask(string text)` | Adds a task for the caller; reverts with `"TodoList: empty task"` if the text is empty |
| `toggleTask(uint256 id)` | Flips done / not done; reverts with `"TodoList: invalid id"` for an unknown ID |
| `getMyTasks()` | The caller's tasks |
| `TaskAdded`, `TaskToggled` events | Emitted on each change |

## Run it

Follow the [shared steps](../README.md#same-steps-for-every-project), replacing `0xYOUR_TODOLIST_ADDRESS` in [`index.html`](index.html). Open `/05-todo/`.

## Try it

1. Add two tasks and tick one; each action is a transaction you confirm.
2. Switch to a second account in MetaMask. The page reloads and shows an **empty** list.
3. Add a task there, then switch back — each account keeps its own tasks.

## Security: "private" is not secret

Anyone can read your tasks from the transactions in the explorer. Never store personal or sensitive data in a contract.

## Challenge

- Add `editTask(id, newText)`.
- Add `deleteTask(id)` (hint: swap the task with the last one, then `.pop()`).
