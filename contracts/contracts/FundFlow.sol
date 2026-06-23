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

// Errors

// Constants
uint256 public constant MAX-MILESTONES = 10;
uint256 public constant VOTING_PERIOD = 3 days;
uint256 public constant MIN_DURATION = 1 days;
uint256 public constant MAX-DURATION = 90 days;

// Enums
enum CampaignStatus { Active, Successful, Failed, Completed }
enum VoteOption     { Approve, Reject }

// Structs
struct Milestone {
    string title;
    uint256 amount;
    bool completed;
    bool approved;
    bool requested;
    uint256 votingDeadline;
    uint256 approvedVotes;
    uint256 rejectedVotes;
}

 struct Campaign {
        address        creator;
        string         title;
        string         description;
        uint256        goal;
        uint256        raisedAmount;
        uint256        deadline;
        CampaignStatus status;
        uint256        contributorCount;
        uint256        currentMilestoneIndex;
        bool           exists;
    }

// States
uint256 public campaignCount;
uint256 public totalPlatFormfees;
address public backerBadgeContract;

mapping(uint256 => Campaign) public campaigns;
mapping(uint256 => Milestone[]) public campaignMilestones;
mapping(uint256 => mapping(address => uint256)) public campaignContributions;
mapping(uint256 => mapping(address => bool)) public hasRefunded;
mapping(uint256 => mapping(address => bool)) public hasVoted;
mapping(uint256 => address[]) private campaignContributors;
mapping(uint256 => mapping(address => bool)) public isContributor;

// Events
event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goal,
 uint256 deadline, uint256 milestoneCount);
 event ContributionMade(uint256 indexed campaignId, address indexed contributor, 
 uint256 amount, uint256 totalRaised, uint256 badgeTokenId);

event MilestoneRequested(uint256 indexed campaignId, uint256 indexed milestoneIndex,
string title, uint256 amount, uint256 votingDeadline);
event VoteCast(uint256 indexed campaignId, uint256 indexed milestoneIndex, address indexed voter,
uint256 approvalVotes, VoteOptions vote);

 event MilestoneApproved(
        uint256 indexed campaignId,
        uint256 indexed milestoneIndex,
        string          title,
        uint256         amount
    );
    event MilestoneRejected(
        uint256 indexed campaignId,
        uint256 indexed milestoneIndex,
        string          title
    );
    event FundsReleased(
        uint256 indexed campaignId,
        address indexed creator,
        uint256         amount
    );
    event RefundClaimed(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256         amount
    );
    event CampaignCompleted(uint256 indexed campaignId);
    event CampaignStatusUpdated(uint256 indexed campaignId, CampaignStatus status);
    event BackerBadgeContractSet(address indexed badgeContract);
    event PlatformFeesWithdrawn(address indexed to, uint256 amount);

    // Modifiers
    modifier campaignExists(uint256 campaign) {
        if (!campaigns[campaignId].exists) revert CampaignNotfound();
        _;
    }

    modifier onlyCreator(uint256 campaignId) {
        if(campains[campaignId].creator != msg.sender) revert NotCreator();
        _;
    }

    modifier onlyContributor(uint256 campaign) {
        if (!isContributor[campaignId][msg.sender]) revert NotContributor();
        _;
    }

    // Constructor
    constructor(address initialOwner, uint256 _platformFeePercent) Ownable(initialOwner){
        platformFeePercent = _platformFeePercent;
    }

    // Admin Functions
    function setBackerBadgeContract(address _badge) external onlyOwner{
        backerBadgeContract = _backerBadgeContract;
        emit BackerBadgeContract(_badge);
    }

    function pause() external onlyOwner{ _pause();}

    function unpause() external onlyOwner{ _unpause();}

    function withdrawPlatformFees(address to) external onlyOwner nonReentrant {
        uint256 amount = totalPlatformFees;
        totalPlatformFees = 0;
        (bool ok,) = to.call{value: amount}("");
        if (!ok) revert TransferFailed();
        emit PlatformFeesWithdrawn(to, amount);
    }

    // Function to Campaign Create
    function createCampaign( 
        string calldata title,
        string calldata description,
        uint256 goal,
        uint256 duration,
        string[] calldata milestoneAmounts,
        uint256[] calldata  milestoneAmounts
    )

