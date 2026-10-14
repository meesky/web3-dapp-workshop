// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

/// @title Counter — Mini Project 1 (easiest)
/// @notice A shared counter the whole class can +1 / -1 together
contract Counter {
    uint256 public count;

    event CountChanged(address indexed by, uint256 newCount);

    function increment() public {
        count += 1;
        emit CountChanged(msg.sender, count);
    }

    function decrement() public {
        // require: if the condition is false → the whole transaction is cancelled (revert)
        require(count > 0, "Counter: already zero");
        count -= 1;
        emit CountChanged(msg.sender, count);
    }
}
