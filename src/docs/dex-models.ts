import { DocSection } from "./types";

export const dexModelsSection: DocSection = {
    id: "dex-models",
    title: "DEX Models: Classic AMM vs. Ve(3,3)",
    shortTitle: "DEX Models",
    content: `
# DEX Models Explained

## Classic AMM vs. Ve(3,3) Model

Not all decentralized exchanges are built the same way. The trading mechanism is only one piece of the puzzle — how a DEX attracts liquidity, rewards participants, governs itself, and sustains its token economy is just as important.

## 1. The Classic AMM

### 1.1 Core Mechanism

The Classic AMM model — most prominently implemented by Uniswap — uses smart contracts holding token reserves, with prices determined by the constant product formula: **x · y = k**

### 1.2 The Fee Flow

Traders pay a fee (typically 0.05%, 0.30%, or 1.00%), and that fee goes entirely to liquidity providers in proportion to their pool share.

> **The UNI Token's Role:** UNI is a pure governance token. Holding UNI gives you voting rights on protocol upgrades, but it does not entitle you to a share of trading fees.

### 1.3 Liquidity Incentives: Emissions and Mining

Protocols distribute their native governance token to LPs who stake. This creates a well-known dynamic:

- **Mercenary liquidity:** LPs come for token rewards, not organic fee revenue
- When emissions end or token price falls, LPs withdraw — a **liquidity death spiral**

## 2. The Ve(3,3) Model

### 2.1 Origin and Philosophy

The Ve(3,3) model was introduced by Andre Cronje (creator of Yearn Finance). The name combines:
- **Ve** — Vote-Escrow: locking tokens for voting power and fee rights
- **(3,3)** — Game theory: best outcome when all participants cooperate

> **The Core Insight:** If token emissions are the primary incentive, rational actors will always dump them. Ve(3,3) breaks this cycle by making locking and voting the only path to meaningful rewards.

### 2.2 Vote-Escrow (veToken) Mechanics

Users lock tokens for a chosen duration to receive veTokens. The longer the lock, the more voting power:

| Lock Duration | veToken Balance | Voting Power | Fee Entitlement |
|--------------|----------------|-------------|-----------------|
| 1 year (1,000 tokens) | 250 veTokens | Low | Low |
| 2 years (1,000 tokens) | 500 veTokens | Medium | Medium |
| 4 years (1,000 tokens) | 1,000 veTokens | Maximum | Maximum |

veTokens are **non-transferable** and decay linearly over time.

### 2.3 Voting: Directing Emissions

veToken holders vote each epoch (weekly) to determine which liquidity pools receive emissions. This creates a powerful incentive loop.

### 2.4 The Bribe System

Since veToken holders control emissions, a market emerges for their votes. Projects offer **bribes** — additional token rewards for voting for their pool. This is a transparent, on-chain mechanism.

### 2.5 Fee Distribution

Unlike Classic AMM where fees go entirely to LPs, Ve(3,3) protocols split fees between LPs and veToken holders who voted for those pools.

## 3. Full Comparison

| Dimension | Classic AMM | Ve(3,3) Model |
|-----------|------------|---------------|
| Trading Mechanism | Constant product (v2) or concentrated (v3) | Combines stable and volatile curve types |
| Governance Token | Pure governance — no fee rights | veToken with fee rights, bribe income |
| Fee Destination | 100% to LPs | Split between LPs and veToken voters |
| Emission Direction | Fixed allocations | Weekly veToken vote determines all |
| Bribe Market | Not native | Native on-chain mechanism |
| Token Locking | Not required | Required for all governance/fee rights |
| Inflation Protection | Not built-in | Anti-dilution rebase each epoch |

## Real-World Ve(3,3) Protocols

| Protocol | Chain | veToken | Notable Innovation |
|----------|-------|---------|-------------------|
| Solidly | Fantom | veSOLID | Introduced the Ve(3,3) model |
| Velodrome | Optimism | veVELO | $500M+ TVL at peak |
| Aerodrome | Base | veAERO | Over $1B TVL |
| Pharaoh | Avalanche | xPHAR/vePHAR | Leading Ve(3,3) on Avalanche; used by BalCore |
| Thena | BNB Chain | veTHE | BNB Chain's leading Ve(3,3) DEX |

## How This Relates to BalCore

BalCore operates across both DEX model types on Avalanche. Its FlowYield system is AMM-agnostic — deploying liquidity where the best combination of depth, fee revenue, and incentives exists.

- **On Classic AMM DEXes:** Active concentrated liquidity positions for fee capture
- **On Ve(3,3) DEXes (Pharaoh, Blackhole):** Emission-incentivized pools combining LP fee revenue with the emission layer
- **Reserve layer:** Can interact with Ve(3,3) protocols, capturing yield from both lending and incentivized positions
    `,
  };
