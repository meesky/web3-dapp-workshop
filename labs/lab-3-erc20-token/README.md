# Lab 3 — ERC-20 Token

**Time:** 40 minutes · **Level:** Beginner · **Format:** Hands-on

Create your own fungible token with OpenZeppelin, see it in MetaMask and send it to a classmate.

**Code:** [`contracts/MyToken.sol`](../../contracts/MyToken.sol)

## Goals

- Understand what ERC-20 is and why one standard works in every wallet and exchange.
- Build a token by inheriting an audited OpenZeppelin contract.
- Understand `decimals` and why amounts are multiplied by 10¹⁸.

## Prerequisites

- [Lab 2](../lab-2-simple-storage/README.md) complete.

## The contract

```solidity
import {ERC20} from "@openzeppelin/contracts@5.1.0/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("Lao Student Token", "LST") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

- `is ERC20` inherits `name`, `symbol`, `decimals`, `totalSupply`, `balanceOf`, `transfer`, `approve`, `allowance` and `transferFrom`.
- The `constructor` runs **once**, at deployment. `_mint` creates the whole supply for the deployer.
- OpenZeppelin is **pinned to `5.1.0`** in the import path so the lab stays reproducible and compiles for older EVM targets such as Ganache. Version 5.1.0 uses current memory-safe assembly annotations, avoiding Solidity 0.8.37 deprecation warnings.

## Steps

1. In Remix create `MyToken.sol` and paste the contract.
2. **Change the name and symbol** to your own, for example `"Noy Coin"` and `"NOY"`.
3. **Compile** with EVM Version `prague`. Remix downloads OpenZeppelin from the import automatically (internet required).
4. **Deploy** — Remix VM first if you like, then MetaMask on LAB Chain.
5. Call `name`, `symbol`, `decimals` (18), `totalSupply` and `balanceOf` with your address.
6. In MetaMask: **Tokens → Import tokens** → paste the contract address. The symbol and 18 decimals fill in; your balance appears.
7. **Transfer** to a classmate: call `transfer(<their address>, 100000000000000000000)`.

### Why 10¹⁸?

Blockchains have no decimals. With `decimals = 18`, one token is stored as `1` followed by 18 zeros.

| You mean | Enter |
|---|---|
| 1 token | `1000000000000000000` |
| 100 tokens | `100000000000000000000` |
| Total supply (1,000,000) | `1000000000000000000000000` |

## Expected results

| Call | Result |
|---|---|
| `totalSupply()` | `1000000000000000000000000` |
| `balanceOf(you)` after deploy | `1000000000000000000000000` |
| `balanceOf(you)` after sending 100 | `999900000000000000000000` |
| `balanceOf(friend)` | `100000000000000000000` |

## Checkpoint

Your token shows in MetaMask and you have sent it to at least one classmate.

## Troubleshooting

| Problem | Fix |
|---|---|
| Import `@openzeppelin/...` not found | Check the internet connection and that the path contains `@5.0.2` |
| Transfer reverts | You entered the amount without 18 decimals, or your balance is lower than the amount |
| Token does not appear in MetaMask | Import it manually with the contract address; confirm you are on LAB Chain |
| Typed `100` and sent almost nothing | `100` means 100 × 10⁻¹⁸ tokens; multiply by 10¹⁸ |

## Challenge

- Open the [OpenZeppelin Wizard](https://wizard.openzeppelin.com), tick **Mintable** and **Burnable**, and choose **Open in Remix**.
- Exchange tokens with three classmates and look at the holders in the explorer.

## Next

[Lab 4 — Mint an NFT](../lab-4-nft/README.md)
