# Mini Projects

Five small DApps for extra practice after the main labs, ordered from easy to medium. Each one is a Solidity contract plus a lightweight web page that talks to it through MetaMask on **LAB Chain**.

| # | Project | Level | Time | New Solidity concepts | Guide |
|---|---|---|---|---|---|
| 1 | Counter | Easy | 20 min | `require`, revert, event | [01-counter](01-counter/README.md) |
| 2 | Guestbook | Easy | 30 min | `struct`, array, `string`, `block.timestamp` | [02-guestbook](02-guestbook/README.md) |
| 3 | Voting | Medium | 40 min | `mapping`, constructor arguments, loops | [03-voting](03-voting/README.md) |
| 4 | Tip Jar | Medium | 45 min | `payable`, `msg.value`, `modifier`, withdrawing | [04-tipjar](04-tipjar/README.md) |
| 5 | Todo List | Medium | 40 min | `mapping(address => struct[])`, `storage` | [05-todo](05-todo/README.md) |

## Same steps for every project

1. **Deploy the contract.** Open [`index.html`](index.html) in this folder and click **Open in Remix** beside the project (or create the `.sol` file in https://app.remix.live and paste it). Compile with **EVM Version = `prague`**, set the Environment to **MetaMask** on LAB Chain, then **Deploy**.
2. **Copy the contract address** from Remix.
3. **Set the address** in the project's `index.html`, replacing the `CONTRACT_ADDRESS` placeholder (for example `0xYOUR_COUNTER_ADDRESS`).
4. **Serve the folder** from the repository root — MetaMask does not work on `file://` pages:

   ```bash
   npx serve workshop/projects
   ```

5. Open the printed `http://localhost:…` address, choose the project, click **Connect MetaMask**, and try it.
6. Check each transaction in https://explorer.labchain.la.

## How it fits together

- [`shared/labchain.js`](shared/labchain.js) connects MetaMask, adds or switches to **LAB Chain**, and sends transactions with clear status and error messages (including the `require` reason from the contract). Every project reuses it, so each `index.html` holds only that project's ABI and logic.
- [`shared/style.css`](shared/style.css) is the common style.
- The pages reload when you change account or network in MetaMask.
- These pages always use LAB Chain. For local practice with Ganache use the [Lab 5 DApp](../dapp/README.md) with `?network=ganache`.

## Ways to run the activity

- **Stations:** groups of 3–4 pick one project and demo it to the class in the last 15 minutes.
- **Whole class:** the instructor deploys one Counter, Guestbook or Voting contract in advance and everyone uses the same address.

## Security reminders

- On-chain data is public, whatever the Solidity visibility.
- Pages render chain data with `textContent`, never `innerHTML`; anyone can write to a contract, so treat it as untrusted input.
- Hiding a button is not security. Permissions are enforced inside the contract (for example `onlyOwner`).
- These contracts are teaching examples, not audited for production use.

## Verified

All five contracts were compiled, deployed and tested in Remix VM and on Ganache, including the main `require` failure paths and the two-account cases (voting twice, withdrawing as a non-owner). Their ABIs match the pages. A real-wallet transaction on LAB Chain needs MetaMask and LAB.
