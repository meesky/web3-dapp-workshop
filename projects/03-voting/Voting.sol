// SPDX-License-Identifier: MIT
pragma solidity ^0.8.37;

/// @title Voting — Mini Project 3
/// @notice Transparent voting: 1 wallet = 1 vote
contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint256 indexed candidateId);

    /// @param names Enter in Remix like this: ["Noy","Kham","Phet"]
    constructor(string[] memory names) {
        require(names.length >= 2, "Voting: need at least 2 candidates");
        for (uint256 i = 0; i < names.length; i++) {
            candidates.push(Candidate(names[i], 0));
        }
    }

    function vote(uint256 candidateId) external {
        require(!hasVoted[msg.sender], "Voting: already voted");
        require(candidateId < candidates.length, "Voting: invalid candidate");

        hasVoted[msg.sender] = true;
        candidates[candidateId].voteCount += 1;
        emit Voted(msg.sender, candidateId);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }
}
