// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

/// @title Guestbook — Mini Project 2
/// @notice A guestbook: anyone can write a permanent message on the blockchain
contract Guestbook {
    struct Entry {
        address author;
        string message;
        uint256 timestamp;
    }

    Entry[] private entries;

    event NewEntry(address indexed author, string message, uint256 timestamp);

    function sign(string calldata message) external {
        // Non-Latin scripts (e.g. Lao) use 3 bytes per character → 300 bytes ≈ 100 Lao characters
        uint256 len = bytes(message).length;
        require(len > 0 && len <= 300, "Guestbook: message must be 1-300 bytes");
        entries.push(Entry(msg.sender, message, block.timestamp));
        emit NewEntry(msg.sender, message, block.timestamp);
    }

    function getEntries() external view returns (Entry[] memory) {
        return entries;
    }

    function totalEntries() external view returns (uint256) {
        return entries.length;
    }
}
