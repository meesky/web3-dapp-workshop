// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

/// @title TipJar — Mini Project 4
/// @notice A tip jar: anyone can send LAB with a message, only the owner can withdraw
contract TipJar {
    struct Tip {
        address from;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    address public immutable owner;
    Tip[] private tips;

    event NewTip(address indexed from, uint256 amount, string message);
    event Withdrawn(address indexed to, uint256 amount);

    // modifier: a reusable condition for many functions
    modifier onlyOwner() {
        require(msg.sender == owner, "TipJar: not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice payable = this function can receive money (LAB)
    function tip(string calldata message) external payable {
        require(msg.value > 0, "TipJar: send some LAB");
        tips.push(Tip(msg.sender, msg.value, message, block.timestamp));
        emit NewTip(msg.sender, msg.value, message);
    }

    function withdraw() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "TipJar: nothing to withdraw");
        (bool ok, ) = payable(owner).call{value: amount}("");
        require(ok, "TipJar: transfer failed");
        emit Withdrawn(owner, amount);
    }

    function getTips() external view returns (Tip[] memory) {
        return tips;
    }

    function totalBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
