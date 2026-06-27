import { ethers } from "hardhat";
import { expect } from "chai";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { CrowdfundingEscrow, BackerBadge } from "../typechain-types";

// ─── Constants ────────────────────────────────────────────────────────────────
const ONE_DAY      = 86_400;
const THREE_DAYS   = 3 * ONE_DAY;
const SEVEN_DAYS   = 7 * ONE_DAY;
const GOAL         = ethers.parseEther("1.0");
const FEE_BPS      = 250n;   // 2.5 %
const NET_FACTOR   = 9750n;  // (10000 - 250) bps — net amount after fee

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Returns the net ETH credited after the 2.5% platform fee. */
function netOf(gross: bigint): bigint {
  return (gross * NET_FACTOR) / 10_000n;
}

/** Contributes enough from multiple signers to reach GOAL (net). */
async function fundCampaign(
  escrow: CrowdfundingEscrow,
  campaignId: bigint,
  backers: HardhatEthersSigner[]
) {
  // Each backer sends enough so that collectively the net exceeds GOAL.
  // We overshoot slightly so that the status flips to Successful.
  const each = ethers.parseEther("0.35"); // 3 × 0.35 ETH gross → ~1.02 ETH net
  for (const b of backers) {
    await escrow.connect(b).contribute(campaignId, { value: each });
  }
}

// ─── Test suite ───────────────────────────────────────────────────────────────
describe("CrowdfundingEscrow", () => {
  let escrow: CrowdfundingEscrow;
  let badge:  BackerBadge;
  let owner:   HardhatEthersSigner;
  let creator: HardhatEthersSigner;
  let backer1: HardhatEthersSigner;
  let backer2: HardhatEthersSigner;
  let backer3: HardhatEthersSigner;
  let stranger:HardhatEthersSigner;

  const MS_TITLES   = ["Development", "Launch"];
  const MS_AMOUNTS  = [ethers.parseEther("0.6"), ethers.parseEther("0.4")];

  /** Creates campaign #1 with the default 7-day duration. */
  async function createDefault() {
    return escrow.connect(creator).createCampaign(
      "Test Campaign",
      "A campaign description",
      GOAL,
      SEVEN_DAYS,
      MS_TITLES,
      MS_AMOUNTS
    );
  }

  beforeEach(async () => {
    [owner, creator, backer1, backer2, backer3, stranger] = await ethers.getSigners();

    const BadgeFactory  = await ethers.getContractFactory("BackerBadge");
    badge = await BadgeFactory.deploy(owner.address);

    const EscrowFactory = await ethers.getContractFactory("CrowdfundingEscrow");
    escrow = await EscrowFactory.deploy(owner.address, FEE_BPS);

    await escrow.setBackerBadgeContract(await badge.getAddress());
    await badge.setEscrowContract(await escrow.getAddress());
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Campaign creation
  // ══════════════════════════════════════════════════════════════════════════
  describe("Campaign creation", () => {
    it("creates a campaign and stores data correctly", async () => {
      await createDefault();
      const c = await escrow.getCampaign(1n);
      expect(c.creator).to.equal(creator.address);
      expect(c.title).to.equal("Test Campaign");
      expect(c.goal).to.equal(GOAL);
      expect(c.status).to.equal(0); // Active
      expect(c.exists).to.be.true;
    });

    it("emits CampaignCreated with correct args", async () => {
      await expect(createDefault())
        .to.emit(escrow, "CampaignCreated")
        .withArgs(1n, creator.address, "Test Campaign", GOAL, (v: bigint) => v > 0n, 2n);
    });

    it("stores milestones correctly", async () => {
      await createDefault();
      const ms = await escrow.getMilestones(1n);
      expect(ms.length).to.equal(2);
      expect(ms[0].title).to.equal("Development");
      expect(ms[0].amount).to.equal(MS_AMOUNTS[0]);
      expect(ms[1].title).to.equal("Launch");
    });

    it("increments campaignCount", async () => {
      expect(await escrow.campaignCount()).to.equal(0n);
      await createDefault();
      expect(await escrow.campaignCount()).to.equal(1n);
    });

    it("reverts with EmptyTitle", async () => {
      await expect(
        escrow.connect(creator).createCampaign("", "desc", GOAL, ONE_DAY, ["M"], [GOAL])
      ).to.be.revertedWithCustomError(escrow, "EmptyTitle");
    });

    it("reverts with EmptyDescription", async () => {
      await expect(
        escrow.connect(creator).createCampaign("Title", "", GOAL, ONE_DAY, ["M"], [GOAL])
      ).to.be.revertedWithCustomError(escrow, "EmptyDescription");
    });

    it("reverts with InvalidGoal when goal is zero", async () => {
      await expect(
        escrow.connect(creator).createCampaign("T", "D", 0n, ONE_DAY, ["M"], [0n])
      ).to.be.revertedWithCustomError(escrow, "InvalidGoal");
    });

    it("reverts with InvalidDuration when duration is too short", async () => {
      await expect(
        escrow.connect(creator).createCampaign("T", "D", GOAL, 3600, ["M"], [GOAL])
      ).to.be.revertedWithCustomError(escrow, "InvalidDuration");
    });

    it("reverts with InvalidDuration when duration is too long", async () => {
      await expect(
        escrow.connect(creator).createCampaign("T", "D", GOAL, 91 * ONE_DAY, ["M"], [GOAL])
      ).to.be.revertedWithCustomError(escrow, "InvalidDuration");
    });

    it("reverts with NoMilestonesProvided", async () => {
      await expect(
        escrow.connect(creator).createCampaign("T", "D", GOAL, ONE_DAY, [], [])
      ).to.be.revertedWithCustomError(escrow, "NoMilestonesProvided");
    });

    it("reverts with TooManyMilestones", async () => {
      const titles   = Array(11).fill("M");
      const amounts  = Array(11).fill(GOAL / 11n);
      await expect(
        escrow.connect(creator).createCampaign("T", "D", GOAL, ONE_DAY, titles, amounts)
      ).to.be.revertedWithCustomError(escrow, "TooManyMilestones");
    });

    it("reverts when milestone amounts don't sum to goal", async () => {
      await expect(
        escrow.connect(creator).createCampaign("T", "D", GOAL, ONE_DAY,
          ["A", "B"],
          [ethers.parseEther("0.3"), ethers.parseEther("0.3")]
        )
      ).to.be.revertedWithCustomError(escrow, "MilestoneAmountMismatch");
    });

    it("reverts with CampaignNotFound for unknown campaignId", async () => {
      await expect(escrow.getCampaign(99n))
        .to.be.revertedWithCustomError(escrow, "CampaignNotFound");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Contributions
  // ══════════════════════════════════════════════════════════════════════════
  describe("Contributions", () => {
    beforeEach(async () => { await createDefault(); });

    it("accepts a contribution and credits net amount", async () => {
      const gross = ethers.parseEther("0.5");
      await escrow.connect(backer1).contribute(1n, { value: gross });
      const contrib = await escrow.getContribution(1n, backer1.address);
      expect(contrib).to.equal(netOf(gross));
    });

    it("emits ContributionReceived", async () => {
      await expect(escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") }))
        .to.emit(escrow, "ContributionReceived");
    });

    it("tracks contributorCount without double-counting", async () => {
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") });
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") });
      await escrow.connect(backer2).contribute(1n, { value: ethers.parseEther("0.1") });
      const c = await escrow.getCampaign(1n);
      expect(c.contributorCount).to.equal(2n);
    });

    it("deducts platform fee from raised amount", async () => {
      const gross = ethers.parseEther("1.0");
      await escrow.connect(backer1).contribute(1n, { value: gross });
      const expectedFee = (gross * FEE_BPS) / 10_000n;
      expect(await escrow.totalPlatformFees()).to.equal(expectedFee);
    });

    it("flips status to Successful when goal is met", async () => {
      // Net of 1.1 ETH gross > 1 ETH goal
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("1.1") });
      const c = await escrow.getCampaign(1n);
      expect(c.status).to.equal(1); // Successful
    });

    it("reverts with ZeroContribution", async () => {
      await expect(escrow.connect(backer1).contribute(1n, { value: 0n }))
        .to.be.revertedWithCustomError(escrow, "ZeroContribution");
    });

    it("reverts with DeadlinePassed after deadline", async () => {
      await time.increase(SEVEN_DAYS + 1);
      await expect(
        escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") })
      ).to.be.revertedWithCustomError(escrow, "DeadlinePassed");
    });

    it("reverts with CampaignNotActive on a funded campaign", async () => {
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("1.1") });
      await expect(
        escrow.connect(backer2).contribute(1n, { value: ethers.parseEther("0.1") })
      ).to.be.revertedWithCustomError(escrow, "CampaignNotActive");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Campaign status
  // ══════════════════════════════════════════════════════════════════════════
  describe("Campaign status", () => {
    beforeEach(async () => { await createDefault(); });

    it("marks as Failed after deadline with insufficient funding", async () => {
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") });
      await time.increase(SEVEN_DAYS + 1);
      await escrow.updateCampaignStatus(1n);
      expect((await escrow.getCampaign(1n)).status).to.equal(2); // Failed
    });

    it("marks as Successful after deadline if goal was met before deadline", async () => {
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("1.1") });
      // status already flipped in contribute(); updateCampaignStatus is a no-op
      await time.increase(SEVEN_DAYS + 1);
      await escrow.updateCampaignStatus(1n);
      expect((await escrow.getCampaign(1n)).status).to.equal(1); // Successful
    });

    it("reverts with DeadlineNotPassed if called before deadline", async () => {
      await expect(escrow.updateCampaignStatus(1n))
        .to.be.revertedWithCustomError(escrow, "DeadlineNotPassed");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Refunds
  // ══════════════════════════════════════════════════════════════════════════
  describe("Refunds", () => {
    beforeEach(async () => {
      await createDefault();
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.3") });
      await escrow.connect(backer2).contribute(1n, { value: ethers.parseEther("0.1") });
      await time.increase(SEVEN_DAYS + 1);
      await escrow.updateCampaignStatus(1n); // → Failed
    });

    it("allows full refund of net contribution", async () => {
      const netContrib = await escrow.getContribution(1n, backer1.address);
      const before = await ethers.provider.getBalance(backer1.address);
      const tx     = await escrow.connect(backer1).claimRefund(1n);
      const receipt = await tx.wait();
      const gasCost = receipt!.gasUsed * receipt!.gasPrice;
      const after  = await ethers.provider.getBalance(backer1.address);
      expect(after).to.equal(before + netContrib - gasCost);
    });

    it("emits RefundClaimed", async () => {
      await expect(escrow.connect(backer1).claimRefund(1n))
        .to.emit(escrow, "RefundClaimed");
    });

    it("prevents double refund (AlreadyRefunded)", async () => {
      await escrow.connect(backer1).claimRefund(1n);
      await expect(escrow.connect(backer1).claimRefund(1n))
        .to.be.revertedWithCustomError(escrow, "AlreadyRefunded");
    });

    it("reverts for non-contributor (NotContributor)", async () => {
      await expect(escrow.connect(stranger).claimRefund(1n))
        .to.be.revertedWithCustomError(escrow, "NotContributor");
    });

    it("isEligibleForRefund returns correct values", async () => {
      expect(await escrow.isEligibleForRefund(1n, backer1.address)).to.be.true;
      await escrow.connect(backer1).claimRefund(1n);
      expect(await escrow.isEligibleForRefund(1n, backer1.address)).to.be.false;
      expect(await escrow.isEligibleForRefund(1n, stranger.address)).to.be.false;
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Milestone workflow
  // ══════════════════════════════════════════════════════════════════════════
  describe("Milestones", () => {
    beforeEach(async () => {
      await createDefault();
      await fundCampaign(escrow, 1n, [backer1, backer2, backer3]);
    });

    it("creator can request the current milestone", async () => {
      await expect(escrow.connect(creator).requestMilestoneRelease(1n, 0n))
        .to.emit(escrow, "MilestoneRequested");
    });

    it("reverts when non-creator requests (NotCreator)", async () => {
      await expect(escrow.connect(backer1).requestMilestoneRelease(1n, 0n))
        .to.be.revertedWithCustomError(escrow, "NotCreator");
    });

    it("reverts when requesting wrong milestone index (MilestoneNotFound)", async () => {
      await expect(escrow.connect(creator).requestMilestoneRelease(1n, 1n))
        .to.be.revertedWithCustomError(escrow, "MilestoneNotFound");
    });

    it("reverts when requesting an already-requested milestone", async () => {
      await escrow.connect(creator).requestMilestoneRelease(1n, 0n);
      await expect(escrow.connect(creator).requestMilestoneRelease(1n, 0n))
        .to.be.revertedWithCustomError(escrow, "MilestoneAlreadyRequested");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Voting
  // ══════════════════════════════════════════════════════════════════════════
  describe("Voting", () => {
    beforeEach(async () => {
      await createDefault();
      await fundCampaign(escrow, 1n, [backer1, backer2, backer3]);
      await escrow.connect(creator).requestMilestoneRelease(1n, 0n);
    });

    it("contributor can cast an Approve vote", async () => {
      await expect(escrow.connect(backer1).vote(1n, 0n, 0))
        .to.emit(escrow, "VoteCast");
    });

    it("contributor can cast a Reject vote", async () => {
      await expect(escrow.connect(backer2).vote(1n, 0n, 1))
        .to.emit(escrow, "VoteCast");
    });

    it("reverts on double vote (AlreadyVoted)", async () => {
      await escrow.connect(backer1).vote(1n, 0n, 0);
      await expect(escrow.connect(backer1).vote(1n, 0n, 0))
        .to.be.revertedWithCustomError(escrow, "AlreadyVoted");
    });

    it("reverts for non-contributor (NotContributor)", async () => {
      await expect(escrow.connect(stranger).vote(1n, 0n, 0))
        .to.be.revertedWithCustomError(escrow, "NotContributor");
    });

    it("reverts after voting period ends (VotingPeriodEnded)", async () => {
      await time.increase(THREE_DAYS + 1);
      await expect(escrow.connect(backer1).vote(1n, 0n, 0))
        .to.be.revertedWithCustomError(escrow, "VotingPeriodEnded");
    });

    it("getVoteStatus returns correct hasVoted flag", async () => {
      const [before] = await escrow.getVoteStatus(1n, 0n, backer1.address);
      expect(before).to.be.false;
      await escrow.connect(backer1).vote(1n, 0n, 0);
      const [after] = await escrow.getVoteStatus(1n, 0n, backer1.address);
      expect(after).to.be.true;
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Milestone finalization
  // ══════════════════════════════════════════════════════════════════════════
  describe("Finalization", () => {
    beforeEach(async () => {
      await createDefault();
      await fundCampaign(escrow, 1n, [backer1, backer2, backer3]);
      await escrow.connect(creator).requestMilestoneRelease(1n, 0n);
    });

    it("releases funds when majority approves", async () => {
      await escrow.connect(backer1).vote(1n, 0n, 0);
      await escrow.connect(backer2).vote(1n, 0n, 0);
      await escrow.connect(backer3).vote(1n, 0n, 0);
      await time.increase(THREE_DAYS + 1);

      const before = await ethers.provider.getBalance(creator.address);
      await expect(escrow.finalizeMilestone(1n, 0n))
        .to.emit(escrow, "MilestoneApproved")
        .and.to.emit(escrow, "FundsReleased");
      const after = await ethers.provider.getBalance(creator.address);
      expect(after).to.be.gt(before);
    });

    it("does not release funds when majority rejects", async () => {
      await escrow.connect(backer1).vote(1n, 0n, 1);
      await escrow.connect(backer2).vote(1n, 0n, 1);
      await escrow.connect(backer3).vote(1n, 0n, 1);
      await time.increase(THREE_DAYS + 1);

      await expect(escrow.finalizeMilestone(1n, 0n))
        .to.emit(escrow, "MilestoneRejected");
    });

    it("reverts before voting period ends (VotingPeriodActive)", async () => {
      await expect(escrow.finalizeMilestone(1n, 0n))
        .to.be.revertedWithCustomError(escrow, "VotingPeriodActive");
    });

    it("reverts on double finalization (MilestoneAlreadyCompleted)", async () => {
      await escrow.connect(backer1).vote(1n, 0n, 0);
      await escrow.connect(backer2).vote(1n, 0n, 0);
      await time.increase(THREE_DAYS + 1);
      await escrow.finalizeMilestone(1n, 0n);
      await expect(escrow.finalizeMilestone(1n, 0n))
        .to.be.revertedWithCustomError(escrow, "MilestoneAlreadyCompleted");
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Full campaign lifecycle
  // ══════════════════════════════════════════════════════════════════════════
  describe("Full lifecycle", () => {
    it("completes a two-milestone campaign end-to-end", async () => {
      // 1. Create
      await createDefault();
      expect((await escrow.getCampaign(1n)).status).to.equal(0); // Active

      // 2. Fund
      await fundCampaign(escrow, 1n, [backer1, backer2, backer3]);
      expect((await escrow.getCampaign(1n)).status).to.equal(1); // Successful

      // 3. Milestone 0 — request, all vote approve, finalize
      await escrow.connect(creator).requestMilestoneRelease(1n, 0n);
      await escrow.connect(backer1).vote(1n, 0n, 0);
      await escrow.connect(backer2).vote(1n, 0n, 0);
      await escrow.connect(backer3).vote(1n, 0n, 0);
      await time.increase(THREE_DAYS + 1);
      await escrow.finalizeMilestone(1n, 0n);
      expect((await escrow.getMilestones(1n))[0].approved).to.be.true;

      // 4. Milestone 1 — request, majority approves, finalize → Completed
      await escrow.connect(creator).requestMilestoneRelease(1n, 1n);
      await escrow.connect(backer1).vote(1n, 1n, 0);
      await escrow.connect(backer2).vote(1n, 1n, 0);
      await time.increase(THREE_DAYS + 1);
      await expect(escrow.finalizeMilestone(1n, 1n))
        .to.emit(escrow, "CampaignCompleted");

      expect((await escrow.getCampaign(1n)).status).to.equal(3); // Completed
    });
  });

  // ══════════════════════════════════════════════════════════════════════════
  //  Security
  // ══════════════════════════════════════════════════════════════════════════
  describe("Security & admin", () => {
    it("owner can pause and prevent contributions", async () => {
      await createDefault();
      await escrow.connect(owner).pause();
      await expect(
        escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") })
      ).to.be.revertedWithCustomError(escrow, "EnforcedPause");
    });

    it("only owner can pause (OwnableUnauthorizedAccount)", async () => {
      await expect(escrow.connect(backer1).pause())
        .to.be.revertedWithCustomError(escrow, "OwnableUnauthorizedAccount");
    });

    it("owner can unpause and resume normal operation", async () => {
      await createDefault();
      await escrow.connect(owner).pause();
      await escrow.connect(owner).unpause();
      await expect(
        escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("0.1") })
      ).to.not.be.reverted;
    });

    it("platform fees accumulate correctly", async () => {
      await createDefault();
      const gross = ethers.parseEther("1.0");
      await escrow.connect(backer1).contribute(1n, { value: gross });
      const expected = (gross * FEE_BPS) / 10_000n;
      expect(await escrow.totalPlatformFees()).to.equal(expected);
    });

    it("owner can withdraw platform fees", async () => {
      await createDefault();
      await escrow.connect(backer1).contribute(1n, { value: ethers.parseEther("1.0") });
      const fees   = await escrow.totalPlatformFees();
      const before = await ethers.provider.getBalance(owner.address);
      const tx     = await escrow.connect(owner).withdrawPlatformFees(owner.address);
      const receipt = await tx.wait();
      const gas    = receipt!.gasUsed * receipt!.gasPrice;
      const after  = await ethers.provider.getBalance(owner.address);
      expect(after).to.equal(before + fees - gas);
      expect(await escrow.totalPlatformFees()).to.equal(0n);
    });

    it("non-owner cannot withdraw fees", async () => {
      await expect(escrow.connect(backer1).withdrawPlatformFees(backer1.address))
        .to.be.revertedWithCustomError(escrow, "OwnableUnauthorizedAccount");
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
//  BackerBadge
// ══════════════════════════════════════════════════════════════════════════════
describe("BackerBadge", () => {
  let escrow: CrowdfundingEscrow;
  let badge:  BackerBadge;
  let owner:  HardhatEthersSigner;
  let user:   HardhatEthersSigner;
  let other:  HardhatEthersSigner;

  beforeEach(async () => {
    [owner, user, other] = await ethers.getSigners();

    const BadgeFactory  = await ethers.getContractFactory("BackerBadge");
    badge = await BadgeFactory.deploy(owner.address);

    const EscrowFactory = await ethers.getContractFactory("CrowdfundingEscrow");
    escrow = await EscrowFactory.deploy(owner.address, 250n);

    await badge.setEscrowContract(await escrow.getAddress());
    await escrow.setBackerBadgeContract(await badge.getAddress());
  });

  async function setup() {
    await escrow.connect(user).createCampaign(
      "Badge Test", "Description", ethers.parseEther("1"),
      86_400, ["M1"], [ethers.parseEther("1")]
    );
    await escrow.connect(user).contribute(1n, { value: ethers.parseEther("0.2") });
  }

  it("mints a badge on contribution", async () => {
    await setup();
    expect(await badge.totalSupply()).to.equal(1n);
    expect(await badge.ownerOf(1n)).to.equal(user.address);
  });

  it("getBadgesByOwner returns correct token IDs", async () => {
    await setup();
    const ids = await badge.getBadgesByOwner(user.address);
    expect(ids.length).to.equal(1);
    expect(ids[0]).to.equal(1n);
  });

  it("is soulbound — transferFrom reverts", async () => {
    await setup();
    await expect(badge.connect(user).transferFrom(user.address, other.address, 1n))
      .to.be.revertedWithCustomError(badge, "SoulboundToken");
  });

  it("only escrow can mint (NotEscrowContract)", async () => {
    await expect(
      badge.connect(user).mintBadge(user.address, 1n, "Test", ethers.parseEther("0.1"))
    ).to.be.revertedWithCustomError(badge, "NotEscrowContract");
  });

  it("tokenURI returns valid base64 data URI", async () => {
    await setup();
    const uri = await badge.tokenURI(1n);
    expect(uri).to.match(/^data:application\/json;base64,/);
  });

  it("badge metadata contains correct campaign ID", async () => {
    await setup();
    const meta = await badge.badgeData(1n);
    expect(meta.campaignId).to.equal(1n);
    expect(meta.campaignTitle).to.equal("Badge Test");
  });
});
