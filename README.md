# FundFlow 🚀

### Decentralized Crowdfunding & Milestone Escrow Platform

FundFlow is a decentralized crowdfunding platform that combines the fundraising capabilities of Kickstarter, the community support model of GoFundMe, and the milestone escrow protection of Upwork into a single Web3 application.

The platform enables creators to raise capital from supporters while ensuring contributors maintain control over how funds are released. Instead of transferring all capital immediately, funds remain locked in escrow and are only released after contributors approve predefined project milestones through on-chain voting.

---

# 📖 Table of Contents

* Overview
* Problem Statement
* Solution
* Key Features
* Architecture
* System Workflow
* Technology Stack
* Smart Contract Design
* Frontend Design System
* Application Pages
* State Management
* Security Features
* Smart Contract Events
* Testing Strategy
* Installation Guide
* Environment Variables
* Running Locally
* Deployment
* Project Structure
* Future Improvements
* Screenshots
* Contract Information
* Live Application

---

# Overview

FundFlow introduces accountability into decentralized crowdfunding.

Traditional crowdfunding platforms suffer from several issues:

* Creators receive all funds upfront.
* Backers have little visibility into progress.
* No transparent mechanism exists for milestone validation.
* Refund processes are often centralized.

FundFlow solves these problems through:

* Smart contract escrow
* Milestone-based fund releases
* Contributor governance
* Transparent voting
* On-chain refund mechanisms

Every contribution is recorded on-chain, and milestone payouts occur only after contributor approval.

---

# Problem Statement

Crowdfunding platforms frequently create trust issues between project creators and backers.

Common risks include:

### For Backers

* Funds can be misused
* Limited transparency
* Difficult refund processes
* No control after contribution

### For Creators

* Lack of investor confidence
* Difficulty proving progress
* Centralized platform restrictions

FundFlow bridges this trust gap using blockchain technology.

---

# Solution

FundFlow introduces a milestone escrow model:

1. Creator launches campaign
2. Contributors fund campaign
3. Funds remain locked
4. Creator requests milestone payment
5. Contributors vote
6. Milestone approved
7. Escrow releases funds

This creates a transparent and trust-minimized funding ecosystem.

---

# Key Features

## Campaign Creation

Creators can launch campaigns by providing:

* Title
* Description
* Funding Goal
* Campaign Duration

Each campaign stores:

* Creator Address
* Goal Amount
* Raised Amount
* Deadline
* Status

---

## ETH Funding

Contributors can fund campaigns using ETH.

Features:

* ETH-only contributions
* Contribution tracking
* Automatic raised amount updates
* Contributor registry

---

## Milestone Escrow

Projects are divided into milestones.

Example:

* UI Design
* Smart Contract Development
* Mainnet Launch

Each milestone contains:

* Title
* Amount
* Completion Status
* Approval Status

---

## Contributor Voting

Contributors govern fund releases.

Voting options:

* Approve
* Reject

Rules:

* One vote per contributor
* Voting period enforced
* Votes recorded on-chain

---

## Escrow Release

When approval exceeds 50%:

* Milestone becomes approved
* Escrow releases funds
* Campaign state updates automatically

---

## Refund System

If a campaign fails to reach its funding goal before the deadline:

Contributors can:

* Claim refunds
* Withdraw only once
* Recover funds trustlessly

---

## Campaign Completion

Campaign status becomes:

### Completed

When:

* All milestones are approved
* All milestone funds are released

---

# Architecture

```text
┌───────────────────────┐
│       Frontend        │
│  Next.js + React      │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ RainbowKit + Wagmi    │
│ Wallet Connectivity   │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│   Ethereum Sepolia    │
│      Blockchain       │
└──────────┬────────────┘
           │
           ▼
┌───────────────────────┐
│ FundFlow Contract     │
│ Escrow + Voting       │
└───────────────────────┘
```

---

# System Workflow

## Creator Flow

```text
Create Campaign
       ↓
Add Milestones
       ↓
Receive Funding
       ↓
Request Milestone
       ↓
Voting Begins
       ↓
Approval Reached
       ↓
Funds Released
```

---

## Contributor Flow

```text
Connect Wallet
       ↓
Browse Campaigns
       ↓
Fund Campaign
       ↓
Vote On Milestones
       ↓
Track Progress
       ↓
Claim Refund (If Needed)
```

---

# Technology Stack

## Frontend

* Next.js 14
* React 18
* TypeScript
* Tailwind CSS
* Framer Motion

## Web3

* RainbowKit
* Wagmi
* Viem
* Ethers.js

## Smart Contracts

* Solidity
* Hardhat
* OpenZeppelin

## Deployment

* Vercel
* Ethereum Sepolia

---

# Smart Contract Design

## Campaign Structure

```solidity
struct Campaign {
    address creator;
    string title;
    string description;
    uint256 goal;
    uint256 raisedAmount;
    uint256 deadline;
    bool completed;
}
```

---

## Milestone Structure

```solidity
struct Milestone {
    string title;
    uint256 amount;
    bool completed;
    bool approved;
}
```

---

## Voting Structure

```solidity
struct Vote {
    bool approved;
    bool hasVoted;
}
```

---

# Frontend Design System

FundFlow follows an investor-grade Web3 design language emphasizing transparency, professionalism, and trust.

## Design Principles

* Modern SaaS-Web3
* Glassmorphism
* Data-focused UI
* Dark mode first
* Responsive layouts
* Accessible interactions

---

## Color Palette

### Primary

Indigo / Violet

Used for:

* CTAs
* Active states
* Protocol interactions

### Secondary

Emerald

Used for:

* Funding success
* Completed milestones
* Positive financial metrics

### Accent

Cyan

Used for:

* Links
* Interactive states
* Wallet indicators

---

## Typography

### Inter

Used for:

* Headings
* Paragraphs
* Dashboard metrics

### JetBrains Mono

Used for:

* Wallet addresses
* Transaction hashes
* Technical labels

---

## UI Components

### Glass Cards

* 20px backdrop blur
* Semi-transparent surfaces
* Subtle borders

### Progress Bars

Gradient:

```text
Cyan → Emerald
```

### Wallet Chip

Displays:

```text
Ethereum
0xA1...D4F2
● Connected
```

### Milestone Timeline

States:

* Completed
* Current
* Upcoming

---

# Application Pages

## Landing Page

Features:

* Hero section
* Platform statistics
* Featured campaigns
* CTA buttons

---

## Campaign Marketplace

Displays:

* Campaign title
* Goal
* Raised amount
* Deadline
* Funding progress
* Status

---

## Campaign Details

Displays:

* Description
* Funding progress
* Contributor count
* Milestone roadmap
* Funding widget

---

## Create Campaign

Allows creators to:

* Create campaigns
* Define milestones
* Set funding goals
* Set deadlines

---

## Creator Dashboard

Features:

* Active campaigns
* Funding analytics
* Milestone requests
* Voting results

---

## Voting Dashboard

Allows contributors to:

* Review milestones
* Approve requests
* Reject requests
* Track vote outcomes

---

# State Management

The application manages the following states without page refreshes:

```text
Wallet State
Campaign State
Contribution State
Voting State
Transaction State
```

Suggested tools:

* Zustand
* React Query
* Wagmi hooks

---

# Security Features

Implemented protections include:

## Ownable

Restricts administrative actions.

## ReentrancyGuard

Prevents reentrancy attacks.

## Pausable

Emergency stop functionality.

## Additional Protections

* Double voting prevention
* Double refund prevention
* Unauthorized payout prevention
* Escrow validation

---

# Smart Contract Events

```solidity
CampaignCreated
ContributionReceived
MilestoneRequested
VoteCast
MilestoneApproved
FundsReleased
RefundClaimed
```

These events enable real-time frontend updates and indexing.

---

# Testing Strategy

## Campaign Tests

* Create campaign
* Invalid campaign creation

## Funding Tests

* Successful contribution
* Contribution tracking

## Refund Tests

* Refund after failure
* Prevent double refund

## Voting Tests

* Approve milestone
* Reject milestone
* Prevent double voting

## Escrow Tests

* Release funds
* Prevent unauthorized release

---

# Installation Guide

## Clone Repository

```bash
git clone https://github.com/yourusername/fundflow.git

cd fundflow
```

## Install Dependencies

```bash
npm install
```

---

# Environment Variables

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

NEXT_PUBLIC_CHAIN_ID=

NEXT_PUBLIC_CONTRACT_ADDRESS=

NEXT_PUBLIC_RPC_URL=
```

---

# Running Locally

```bash
npm run dev
```

Application:

```text
http://localhost:3000
```

---

# Build Production Version

```bash
npm run build

npm run start
```

---

# Deployment

## Smart Contract

Network:

```text
Ethereum Sepolia
```

## Frontend

```text
Vercel
```

Deployment Requirements include Sepolia deployment, contract verification, and Vercel hosting.

---

# Project Structure

```text
fundflow/
│
├── contracts/
│   ├── FundFlow.sol
│
├── scripts/
│
├── test/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── lib/
│   ├── types/
│
├── public/
│
├── docs/
│
└── README.md
```

---

# Future Improvements

### NFT Backer Badges

Contributors receive NFTs containing:

* Campaign Name
* Contribution Amount
* Contribution Date

Proof of participation and support.

### Additional Enhancements

* Multi-chain support
* Quadratic voting
* DAO governance
* Reputation system
* AI project risk scoring
* On-chain analytics
* Tokenized fundraising

---

# Screenshots

Add screenshots here:

```text
docs/screenshots/homepage.png
docs/screenshots/campaigns.png
docs/screenshots/details.png
docs/screenshots/dashboard.png
docs/screenshots/voting.png
```

---

# Contract Information

### Network

```text
Ethereum Sepolia
```

### Contract Address

```text
PASTE_DEPLOYED_CONTRACT_ADDRESS
```

---

# Live Application

### Frontend URL

```text
PASTE_VERCEL_URL
```

---

# License

MIT License

---

Built with ❤️ for transparent, milestone-driven decentralized crowdfunding.
