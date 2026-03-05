import { DocSection } from "./types";

export const protocolOverviewSection: DocSection = {
    id: "protocol-overview",
    title: "Protocol Overview",
    shortTitle: "Overview",
    content: `
# Protocol Overview

BalCore is a next-generation liquidity orchestration protocol built on Avalanche. Through its FlowYield System, it automates liquidity provisioning, dynamic rebalancing, and reserve-based yield generation — enabling anyone to earn sustainable DeFi returns without technical expertise.

| Metric | Value |
|--------|-------|
| **APY Cap** | Up to 30% (market-dependent) |
| **Reserve Protected** | 90% always in reserve |
| **IL Protection** | 3-Layer triple safety system |
| **Withdrawal** | 7-Day standard cooldown |

## The Problem BalCore Solves

Providing liquidity in decentralized exchanges (DEXs) is one of the most powerful ways to earn yield in DeFi — but also one of the most complex and risky. Most participants face the same set of challenges:

- Managing liquidity positions manually requires constant monitoring and technical knowledge
- Impermanent Loss (IL) erodes profits whenever token prices move in one direction
- Capital sits idle when positions move out of range, earning nothing
- Rebalancing at the wrong time locks in losses and creates unnecessary fees
- Most users have no automated way to recover from one-sided market moves

> **The Core Challenge**
> Billions of dollars sit in DeFi liquidity positions that are either earning suboptimal yield, suffering from impermanent loss, or stuck in idle positions. There has been no accessible, automated solution — until now.

## Introducing the FlowYield System

FlowYield is BalCore's proprietary liquidity automation framework. Rather than requiring users to manually manage every aspect of their liquidity, FlowYield handles everything algorithmically — from initial placement to ongoing rebalancing and yield harvesting.

At its core, FlowYield introduces a dual-layer architecture designed to maximize yield while minimizing exposure:

## The Dual-Layer Architecture

Every deposit made into BalCore is automatically split into two layers with a specific purpose for each:

| Layer | Role & Behavior |
|-------|----------------|
| **Active Layer (10%)** | Deployed in active liquidity pools near the current price range. This is where trading fees are earned. The system continuously adjusts this position based on market volatility and price movement. |
| **Reserve Layer (90%)** | Held safely in a smart vault and deployed into yield-generating lending protocols (such as Benqi). This reserve earns passive yield while also serving as a volatility buffer and impermanent loss backstop. |

This design means that at any given moment, only 10% of your capital is exposed to the risks of active liquidity provision. The remaining 90% is protected and earning passive yield.

## How It Works: Step by Step

1. **You Deposit:** Add both tokens to the BalCore vault in equal value (e.g., AVAX + USDC). The protocol automatically calculates the correct ratio.
2. **Smart Allocation:** 10% is placed into active liquidity positions near the current market price. 90% goes into the reserve vault generating passive yield.
3. **Automated Rebalancing:** As market prices move, the FlowYield engine continuously adjusts your liquidity position to stay in range and maximize fee capture.
4. **Yield Accrues:** Trading fees from active positions and passive yield from the reserve combine into your total return.
5. **Weekly Settlement:** Every Monday, yields are settled and become claimable. You can view estimated daily accumulations throughout the week.
6. **Withdrawal:** Request a withdrawal anytime. After a 7-day processing period, you receive your original deposit plus any earned fees, with all impermanent loss covered.

## Triple-Layer Impermanent Loss Protection

One of BalCore's most important innovations is its comprehensive approach to protecting users from impermanent loss. Rather than relying on a single mechanism, BalCore uses three independent safety systems:

| Layer | Method | Coverage |
|-------|--------|----------|
| **Layer 1** | Strategic Deployment Prevention | Prevents 80–90% of IL before it occurs through intelligent position placement |
| **Layer 2** | IL Reserve Fund | Covers IL that occurs despite prevention — funded by 20–30% of all protocol fees |
| **Layer 3** | Backup Reserve Vault | Ultimate guarantee — funded from excess yields above the 30% APY user cap |

> **BalCore's Guarantee**
> You will never lose your principal to impermanent loss. Three independent safety layers ensure complete protection — even during market crashes and mass withdrawal events.

## Supported Assets & DEXs

BalCore v1 supports concentrated liquidity pools across leading Avalanche DEXs including LFJ, Blackhole, Pharaoh, and Uniswap-compatible platforms.

**Initially supported token pairs**
- AVAX / USDC
- BTC.b / USDC
- ETH / USDC
- Additional tokens can be proposed and added through governance

## Withdrawal Options

**Standard Withdrawal — Free** 
 Request a withdrawal at any time. The 7-day cooldown allows the protocol to safely unwind your LP position, collect pending fees, calculate any IL coverage owed, and prepare your exact token amounts for release.

**Fast-Track Withdrawal — 3% Fee**
 Need funds urgently? BalCore offers a Fast-Track option with 24–48 hour processing. A 3% fee applies, split between the IL Reserve and active liquidity providers.

> **No Hidden Fees**
> BalCore's fee structure is simple and transparent. The protocol takes 5% of gross yields. Users receive up to 30% APY. All excess above the cap flows directly into the Backup Reserve Vault for long-term protection.

## Who Is BalCore For?

- Individual DeFi users who want yield without managing complex positions
- DAOs and treasuries looking to put idle assets to work
- Institutional participants seeking capital-efficient on-chain yield
- Anyone who has avoided DeFi liquidity provision due to complexity or IL risk

## Roadmap

| Phase | Description |
|-------|-------------|
| **Phase 1** | Launch FlowYield vaults with AVAX, BTC.b, and USDC pairs on Avalanche |
| **Phase 2** | Integrate Liquid Staking Tokens (LSTs), stablecoins, and cross-DEX strategies |
| **Phase 3** | Introduce BalCore governance and the FlowYield token for community ownership |
| **Phase 4** | Expand into multi-chain yield orchestration and institutional liquidity tools |

## Built on Avalanche

BalCore is purpose-built for Avalanche — a high-performance, low-cost blockchain that offers the speed and scalability needed for real-time liquidity management. Transactions settle in seconds, gas fees remain minimal, and the growing Avalanche DeFi ecosystem provides deep liquidity across multiple DEX platforms.

By choosing Avalanche, BalCore can execute the frequent rebalancing operations that its FlowYield system requires — without those operations eating into user returns through prohibitive gas costs.

## Get Started
Visit **balcore.io** to connect your wallet and start earning optimized, protected yield on Avalanche.
    `,
};