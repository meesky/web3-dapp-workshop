// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

/// @title TodoList — Mini Project 5
/// @notice A to-do list per wallet: each person sees and edits only their own list
/// @dev The data is still public on the blockchain — never store secrets
contract TodoList {
    struct Task {
        string text;
        bool done;
    }

    // mapping: each address → that person's list of tasks
    mapping(address => Task[]) private tasks;

    event TaskAdded(address indexed user, uint256 indexed id, string text);
    event TaskToggled(address indexed user, uint256 indexed id, bool done);

    function addTask(string calldata text) external {
        require(bytes(text).length > 0, "TodoList: empty task");
        tasks[msg.sender].push(Task(text, false));
        emit TaskAdded(msg.sender, tasks[msg.sender].length - 1, text);
    }

    function toggleTask(uint256 id) external {
        require(id < tasks[msg.sender].length, "TodoList: invalid id");
        // storage = a reference to the real on-chain data (edits are saved)
        Task storage t = tasks[msg.sender][id];
        t.done = !t.done;
        emit TaskToggled(msg.sender, id, t.done);
    }

    /// @notice msg.sender in a view = the calling address (from MetaMask)
    function getMyTasks() external view returns (Task[] memory) {
        return tasks[msg.sender];
    }
}
