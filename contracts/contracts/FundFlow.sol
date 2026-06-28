// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

interface IBackerBadge {
    function mintBadge(
        address to,
        uint256 campaignId,
        string calldata campaignTitle,
        uint256 amount
    ) external returns (uint256);
}

/// @title  CrowdfundingEscrow
/// @notice Decentralized crowdfunding with milestone-based escrow and
///         contributor voting. Implements Checks-Effects-Interactions throughout.
/// @dev    Inherits ReentrancyGuard, Ownable, Pausable from OpenZeppelin v5.
contract CrowdfundingEscrow is ReentrancyGuard, Ownable, Pausable {

    // ─── Custom errors ────────────────────────────────────────────────────────
    error CampaignNotFound();
    error CampaignNotActive();
    error CampaignNotSuccessful();
    error CampaignNotFailed();
    error DeadlinePassed();
    error DeadlineNotPassed();
    error ZeroContribution();
    error NotContributor();
    error NotCreator();
    error AlreadyRefunded();
    error AlreadyVoted();
    error VotingPeriodEnded();
    error VotingPeriodActive();
    error MilestoneNotFound();
    error MilestoneAlreadyRequested();
    error MilestoneAlreadyCompleted();
    error MilestoneNotRequested();
    error NoMilestonesProvided();
    error TooManyMilestones();
    error InvalidGoal();
    error InvalidDuration();
    error InvalidMilestoneAmount();
    error MilestoneAmountMismatch();
    error EmptyTitle();
    error EmptyDescription();
    error TransferFailed();

    // ─── Constants ────────────────────────────────────────────────────────────
    uint256 public constant MAX_MILESTONES = 10;
    uint256 public constant VOTING_PERIOD  = 3 days;
    uint256 public constant MIN_DURATION   = 1 days;
    uint256 public constant MAX_DURATION   = 90 days;

    /// @notice Platform fee in basis points — set once at deploy, immutable.
    uint256 public immutable platformFeePercent;

    // ─── Enums ────────────────────────────────────────────────────────────────
    enum CampaignStatus { Active, Successful, Failed, Completed }
    enum VoteOption     { Approve, Reject }

    // ─── Structs ─────────────────────────────────────────────────────────────
    struct Milestone {
        string  title;
        uint256 amount;
        bool    completed;
        bool    approved;
        bool    requested;
        uint256 votingDeadline;
        uint256 approvalVotes;
        uint256 rejectionVotes;
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

    // ─── State ────────────────────────────────────────────────────────────────
    uint256 public campaignCount;
    uint256 public totalPlatformFees;
    address public backerBadgeContract;

    mapping(uint256 => Campaign)                                    public  campaigns;
    mapping(uint256 => Milestone[])                                 public  campaignMilestones;
    mapping(uint256 => mapping(address => uint256))                 public  campaignContributions;
    mapping(uint256 => mapping(address => bool))                    public  hasRefunded;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) public hasVoted;
    mapping(uint256 => address[])                                   private campaignContributors;
    mapping(uint256 => mapping(address => bool))                    private isContributor;

    // ─── Events ───────────────────────────────────────────────────────────────
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed creator,
        string          title,
        uint256         goal,
        uint256         deadline,
        uint256         milestoneCount
    );
    event ContributionReceived(
        uint256 indexed campaignId,
        address indexed contributor,
        uint256         amount,
        uint256         totalRaised,
        uint256         badgeTokenId
    );
    event MilestoneRequested(
        uint256 indexed campaignId,
        uint256 indexed milestoneIndex,
        string          title,
        uint256         amount,
        uint256         votingDeadline
    );
    event VoteCast(
        uint256 indexed    campaignId,
        uint256 indexed    milestoneIndex,
        address indexed    voter,
        VoteOption         vote,
        uint256            approvalVotes,
        uint256            rejectionVotes
    );
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

    // ─── Modifiers ────────────────────────────────────────────────────────────
    modifier campaignExists(uint256 campaignId) {
        if (!campaigns[campaignId].exists) revert CampaignNotFound();
        _;
    }

    modifier onlyCreator(uint256 campaignId) {
        if (campaigns[campaignId].creator != msg.sender) revert NotCreator();
        _;
    }

    modifier onlyContributor(uint256 campaignId) {
        if (!isContributor[campaignId][msg.sender]) revert NotContributor();
        _;
    }

    // ─── Constructor ──────────────────────────────────────────────────────────
    constructor(address initialOwner, uint256 _platformFeePercent)
        Ownable(initialOwner)
    {
        platformFeePercent = _platformFeePercent;
    }

    // ─── Admin ────────────────────────────────────────────────────────────────
    function setBackerBadgeContract(address _badge) external onlyOwner {
        backerBadgeContract = _badge;
        emit BackerBadgeContractSet(_badge);
    }

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function withdrawPlatformFees(address to) external onlyOwner nonReentrant {
        uint256 amount   = totalPlatformFees;
        totalPlatformFees = 0;
        (bool ok,) = to.call{value: amount}("");
        if (!ok) revert TransferFailed();
        emit PlatformFeesWithdrawn(to, amount);
    }

    // ─── Campaign creation ────────────────────────────────────────────────────
    /// @param title            Campaign title (non-empty)
    /// @param description      Campaign description (non-empty)
    /// @param goal             Funding goal in wei
    /// @param duration         Duration in seconds (1 day – 90 days)
    /// @param milestoneTitles  Ordered list of milestone titles
    /// @param milestoneAmounts Wei amounts per milestone — must sum to goal
    function createCampaign(
        string   calldata title,
        string   calldata description,
        uint256           goal,
        uint256           duration,
        string[] calldata milestoneTitles,
        uint256[] calldata milestoneAmounts
    ) external whenNotPaused returns (uint256 campaignId) {
        if (bytes(title).length       == 0) revert EmptyTitle();
        if (bytes(description).length == 0) revert EmptyDescription();
        if (goal == 0)                       revert InvalidGoal();
        if (duration < MIN_DURATION || duration > MAX_DURATION) revert InvalidDuration();
        if (milestoneTitles.length   == 0)  revert NoMilestonesProvided();
        if (milestoneTitles.length   >  MAX_MILESTONES) revert TooManyMilestones();
        if (milestoneTitles.length   != milestoneAmounts.length) revert MilestoneAmountMismatch();

        uint256 totalMs;
        for (uint256 i; i < milestoneAmounts.length; ) {
            if (milestoneAmounts[i] == 0) revert InvalidMilestoneAmount();
            totalMs += milestoneAmounts[i];
            unchecked { ++i; }
        }
        if (totalMs != goal) revert MilestoneAmountMismatch();

        campaignId = ++campaignCount;
        uint256 deadline = block.timestamp + duration;

        campaigns[campaignId] = Campaign({
            creator:               msg.sender,
            title:                 title,
            description:           description,
            goal:                  goal,
            raisedAmount:          0,
            deadline:              deadline,
            status:                CampaignStatus.Active,
            contributorCount:      0,
            currentMilestoneIndex: 0,
            exists:                true
        });

        for (uint256 i; i < milestoneTitles.length; ) {
            campaignMilestones[campaignId].push(Milestone({
                title:          milestoneTitles[i],
                amount:         milestoneAmounts[i],
                completed:      false,
                approved:       false,
                requested:      false,
                votingDeadline: 0,
                approvalVotes:  0,
                rejectionVotes: 0
            }));
            unchecked { ++i; }
        }

        emit CampaignCreated(campaignId, msg.sender, title, goal, deadline, milestoneTitles.length);
    }

    // ─── Contribute ───────────────────────────────────────────────────────────
    function contribute(uint256 campaignId)
        external payable
        whenNotPaused
        nonReentrant
        campaignExists(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Active)  revert CampaignNotActive();
        if (block.timestamp > c.deadline)        revert DeadlinePassed();
        if (msg.value == 0)                      revert ZeroContribution();

        // Fee split
        uint256 fee       = (msg.value * platformFeePercent) / 10_000;
        uint256 netAmount = msg.value - fee;
        totalPlatformFees += fee;

        // Track new contributors
        if (!isContributor[campaignId][msg.sender]) {
            isContributor[campaignId][msg.sender] = true;
            campaignContributors[campaignId].push(msg.sender);
            c.contributorCount++;
        }

        campaignContributions[campaignId][msg.sender] += netAmount;
        c.raisedAmount += netAmount;

        if (c.raisedAmount >= c.goal) {
            c.status = CampaignStatus.Successful;
            emit CampaignStatusUpdated(campaignId, CampaignStatus.Successful);
        }

        // Attempt badge mint — failure must NOT revert the contribution
        uint256 badgeId;
        if (backerBadgeContract != address(0)) {
            try IBackerBadge(backerBadgeContract).mintBadge(
                msg.sender, campaignId, c.title, msg.value
            ) returns (uint256 tokenId) {
                badgeId = tokenId;
            } catch {}
        }

        emit ContributionReceived(campaignId, msg.sender, msg.value, c.raisedAmount, badgeId);
    }

    // ─── Status update (anyone can call after deadline) ───────────────────────
    function updateCampaignStatus(uint256 campaignId)
        external
        campaignExists(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Active)  return; // already resolved
        if (block.timestamp <= c.deadline)       revert DeadlineNotPassed();

        c.status = c.raisedAmount >= c.goal
            ? CampaignStatus.Successful
            : CampaignStatus.Failed;

        emit CampaignStatusUpdated(campaignId, c.status);
    }

    // ─── Request milestone release (creator only) ─────────────────────────────
    function requestMilestoneRelease(uint256 campaignId, uint256 milestoneIndex)
        external
        whenNotPaused
        campaignExists(campaignId)
        onlyCreator(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Successful)           revert CampaignNotSuccessful();
        if (milestoneIndex != c.currentMilestoneIndex)        revert MilestoneNotFound();

        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        if (m.requested)  revert MilestoneAlreadyRequested();
        if (m.completed)  revert MilestoneAlreadyCompleted();

        m.requested      = true;
        m.votingDeadline = block.timestamp + VOTING_PERIOD;

        emit MilestoneRequested(campaignId, milestoneIndex, m.title, m.amount, m.votingDeadline);
    }

    // ─── Vote ─────────────────────────────────────────────────────────────────
    function vote(uint256 campaignId, uint256 milestoneIndex, VoteOption voteOption)
        external
        whenNotPaused
        campaignExists(campaignId)
        onlyContributor(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Successful) revert CampaignNotSuccessful();

        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        if (!m.requested)                                              revert MilestoneNotRequested();
        if (m.completed)                                               revert MilestoneAlreadyCompleted();
        if (block.timestamp > m.votingDeadline)                        revert VotingPeriodEnded();
        if (hasVoted[campaignId][milestoneIndex][msg.sender])          revert AlreadyVoted();

        // Effects before interactions
        hasVoted[campaignId][milestoneIndex][msg.sender] = true;

        if (voteOption == VoteOption.Approve) {
            m.approvalVotes++;
        } else {
            m.rejectionVotes++;
        }

        emit VoteCast(campaignId, milestoneIndex, msg.sender, voteOption, m.approvalVotes, m.rejectionVotes);
    }

    // ─── Finalize milestone (anyone can call after voting period) ─────────────
    function finalizeMilestone(uint256 campaignId, uint256 milestoneIndex)
        external
        whenNotPaused
        nonReentrant
        campaignExists(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Successful) revert CampaignNotSuccessful();

        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        if (!m.requested)                    revert MilestoneNotRequested();
        if (m.completed)                     revert MilestoneAlreadyCompleted();
        if (block.timestamp <= m.votingDeadline) revert VotingPeriodActive();

        // > 50% of all contributors must approve
        uint256 threshold = c.contributorCount / 2;

        // ── Effects ─────────────────────────────────────────────────────────
        m.completed = true;

        if (m.approvalVotes > threshold) {
            m.approved = true;clear
            
            uint256 payout = m.amount;
            c.currentMilestoneIndex++;

            if (c.currentMilestoneIndex == campaignMilestones[campaignId].length) {
                c.status = CampaignStatus.Completed;
                emit CampaignCompleted(campaignId);
            }

            emit MilestoneApproved(campaignId, milestoneIndex, m.title, payout);

            // ── Interaction (after all state changes) ─────────────────────────
            (bool ok,) = c.creator.call{value: payout}("");
            if (!ok) revert TransferFailed();

            emit FundsReleased(campaignId, c.creator, payout);
        } else {
            emit MilestoneRejected(campaignId, milestoneIndex, m.title);
        }
    }

    // ─── Claim refund ─────────────────────────────────────────────────────────
    function claimRefund(uint256 campaignId)
        external
        nonReentrant
        campaignExists(campaignId)
        onlyContributor(campaignId)
    {
        Campaign storage c = campaigns[campaignId];
        if (c.status != CampaignStatus.Failed)        revert CampaignNotFailed();
        if (hasRefunded[campaignId][msg.sender])       revert AlreadyRefunded();

        uint256 refundAmount = campaignContributions[campaignId][msg.sender];

        // ── Effects ───────────────────────────────────────────────────────────
        hasRefunded[campaignId][msg.sender]           = true;
        campaignContributions[campaignId][msg.sender] = 0;

        // ── Interaction ───────────────────────────────────────────────────────
        (bool ok,) = msg.sender.call{value: refundAmount}("");
        if (!ok) revert TransferFailed();

        emit RefundClaimed(campaignId, msg.sender, refundAmount);
    }

    // ─── Views ────────────────────────────────────────────────────────────────
    function getCampaign(uint256 campaignId)
        external view
        campaignExists(campaignId)
        returns (Campaign memory)
    {
        return campaigns[campaignId];
    }

    function getMilestones(uint256 campaignId)
        external view
        campaignExists(campaignId)
        returns (Milestone[] memory)
    {
        return campaignMilestones[campaignId];
    }

    function getMilestone(uint256 campaignId, uint256 milestoneIndex)
        external view
        campaignExists(campaignId)
        returns (Milestone memory)
    {
        return campaignMilestones[campaignId][milestoneIndex];
    }

    function getContributors(uint256 campaignId)
        external view
        campaignExists(campaignId)
        returns (address[] memory)
    {
        return campaignContributors[campaignId];
    }

    function getContribution(uint256 campaignId, address contributor)
        external view
        returns (uint256)
    {
        return campaignContributions[campaignId][contributor];
    }

    function isEligibleForRefund(uint256 campaignId, address user)
        external view
        returns (bool)
    {
        Campaign storage c = campaigns[campaignId];
        return
            c.status == CampaignStatus.Failed &&
            isContributor[campaignId][user]   &&
            !hasRefunded[campaignId][user]    &&
            campaignContributions[campaignId][user] > 0;
    }

    function getVoteStatus(uint256 campaignId, uint256 milestoneIndex, address user)
        external view
        returns (bool voted, uint256 approvals, uint256 rejections)
    {
        Milestone storage m = campaignMilestones[campaignId][milestoneIndex];
        return (
            hasVoted[campaignId][milestoneIndex][user],
            m.approvalVotes,
            m.rejectionVotes
        );
    }

    receive() external payable {}
}
