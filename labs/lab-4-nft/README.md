# Lab 4 — Mint an NFT

**Time:** 50 minutes · **Level:** Beginner–intermediate · **Format:** Hands-on

Store an image on IPFS, link it to an ERC-721 token through `tokenURI`, and mint the NFT into your wallet.

**Code:** [`contracts/MyNFT.sol`](../../contracts/MyNFT.sol) · [`nft-metadata/0.json`](../../nft-metadata/0.json)

## Goals

- Understand ERC-721 (non-fungible tokens) versus ERC-20.
- Understand what lives **on-chain** (owner, `tokenURI`) and what lives **off-chain** (image and metadata on IPFS).
- Upload files to IPFS, get a **CID**, and mint with the right `tokenURI`.

## Prerequisites

- [Lab 3](../lab-3-erc20-token/README.md) complete.
- An image to use (any PNG or JPG), and a free [Pinata](https://pinata.cloud) account.

## How the pieces connect

```
image.png ──upload──► IPFS ──► image CID   (bafy…A)
                                    │
        0.json contains  "image": "ipfs://bafy…A"
                                    │
0.json ──upload──► IPFS ──► JSON CID  (bafy…B)
                                    │
        MyNFT.mint("ipfs://bafy…B")   ← stored as tokenURI(0)
```

- A **CID** is a hash of the file's content, so a file always has one specific CID.
- The contract stores only the `tokenURI` string. Wallets read `tokenURI` → fetch the JSON → read `image` → show the picture.

## Steps

### 1. Upload the image

In Pinata go to **Files** and upload your image. Copy its **CID** (for example `bafybei…`). (Menu names in Pinata may differ slightly from these; look for the file list and its CID column.)

### 2. Put your image CID in the JSON

Open [`nft-metadata/0.json`](../../nft-metadata/0.json) and set `image` to **your** image CID, always with the `ipfs://` prefix. The template ships with the placeholder `REPLACE_WITH_IMAGE_CID`; if the file already contains a CID (for example a sample from the instructor), replace that with yours.

```json
{
  "name": "Workshop NFT #0",
  "description": "My first NFT from the Web3 Workshop on LAB Chain",
  "image": "ipfs://bafybeiXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "attributes": [
    { "trait_type": "Event", "value": "Web3 Workshop Laos" },
    { "trait_type": "Network", "value": "LAB Chain" },
    { "trait_type": "Level", "value": 1 }
  ]
}
```

While the placeholder is still in the file, one command from the repository root does it (replace `YOUR_IMAGE_CID` with your CID):

```bash
sed -i '' 's/REPLACE_WITH_IMAGE_CID/YOUR_IMAGE_CID/' workshop/nft-metadata/0.json
```

(On Linux use `sed -i` without the empty quotes.)

### 3. Upload the JSON

Upload the edited `0.json` to Pinata the same way and copy the new **JSON CID**.

### 4. Check before minting

Open both in a browser; you should see the JSON and the picture:

- `https://gateway.pinata.cloud/ipfs/<JSON CID>`
- `https://gateway.pinata.cloud/ipfs/<image CID>`

If a link does not load, wait a minute or try `https://ipfs.io/ipfs/<CID>`.

### 5. Deploy and mint

1. In Remix create `MyNFT.sol`, compile with EVM Version `prague`, and deploy with MetaMask on LAB Chain.
2. Call `mint` with `ipfs://<JSON CID>` (no quotes, no trailing space) → confirm.
3. Verify:

| Call | Expected |
|---|---|
| `ownerOf(0)` | Your address |
| `tokenURI(0)` | `ipfs://<JSON CID>` |
| `totalMinted()` | `1` |

### 6. See it in MetaMask

**NFTs → Import NFT** → contract address and token ID `0`.

## Checkpoint

You can see the NFT in MetaMask's NFTs tab and the mint transaction in the explorer.

## Things to know

- **Files on IPFS cannot be edited.** Changing the image or JSON gives a new CID. Upload again and mint a new token.
- **One token, one JSON.** Token `1` needs its own `1.json` and CID.
- Files stay available while someone **pins** them. Pinata pins your uploads; deleting them can make the image disappear.
- **Shortcut without IPFS:** host the JSON on a GitHub Gist (raw URL) and use that `https://…` link as the `tokenURI`. It works, but the host can change the content, so it is not decentralised.
- `MyNFT` lets **anyone mint** to keep the lesson simple. A real project adds `Ownable`, a supply cap or a mint price.

## Troubleshooting

| Problem | Fix |
|---|---|
| Image missing in MetaMask | Confirm `image` starts with `ipfs://` and the gateway links open; wait a few minutes |
| `ownerOf` reverts | Token does not exist yet; the first token ID is `0`, so mint first |
| Gateway link shows 404 | The CID is wrong or the file is not pinned; copy it again from Pinata |
| `tokenURI` has extra characters | Re-mint without quotes or spaces |
| Import NFT shows nothing | Check the contract address, token ID and that you are on LAB Chain |

## Challenge

Give an NFT to a classmate with `safeTransferFrom(yourAddress, friendAddress, 0)`, then have them import it into MetaMask.

## Next

[Lab 5 — Build a DApp](../lab-5-dapp/README.md)
