// SPDX- License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

interface IBackBadge {
    function mintBadge(address to, uint256 campaignId, string calldata campaiignTitle, uint256 amount)
    external returns(uint256);
}

/// @title  CrowdfundingEscrow
/// @notice Decentralized crowdfunding with milestone-based escrow and
///         contributor voting. Implements Checks-Effects-Interactions throughout.
/// @dev    Inherits ReentrancyGuard, Ownable, Pausable from OpenZeppelin v5.

