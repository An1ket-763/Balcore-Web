import { DocSection } from "./types";

export const dexModelsSection: DocSection = {
    id: "dex-models",
    title: "DEX Models: Classic AMM vs. Ve(3,3)",
    shortTitle: "DEX Models",
    content: `
# DEX Models Explained

## Classic AMM vs. Ve(3,3) Model

## How They Work · Tokenomics · Incentives · Pros & Cons

Not all decentralized exchanges are built the same way. The trading mechanism is only one piece of the puzzle how a DEX attracts liquidity, rewards participants, governs itself, and sustains its token economy is just as important. Two distinct philosophies dominate the landscape: the Classic AMM and the Ve(3,3) model. This document explains both from first principles, how their tokenomics work, and how they compare.

# 1. The Classic AMM

## 1.1 Core Mechanism

The Classic AMM model most prominently implemented by Uniswap was the design that established decentralized trading. Instead of an order book, it uses smart contracts holding token reserves, with prices determined automatically by the constant product formula:

> **Constant Product Invariant**
> **x · y = k** x = reserve of Token A | y = reserve of Token B | k = constant

Any trader can swap against the pool at any time. The price they receive is a function of pool depth the more liquidity in the pool, the less slippage on any given trade. Protocols like Uniswap v3 extended this base model with concentrated liquidity, allowing LPs to focus capital in specific price ranges for greater efficiency.

## 1.2 The Fee Flow

The Classic AMM's economics are straightforward: traders pay a fee (typically 0.05%, 0.30%, or 1.00% depending on the pool tier), and that fee goes entirely to liquidity providers in proportion to their pool share.

> **LP Fee Share**
> fee_earned_i = (LP_share_i / total_LP) × fee_rate × trade_volume. LP_share_i = user i's share of the pool | fee_rate = pool's configured fee tier.

The UNI governance token Uniswap's native token does not capture any of this fee revenue in the base protocol. UNI holders vote on protocol parameters and treasury spending, but trading fees flow directly to LPs, not to token holders.

> **The UNI Token's Role**
> UNI is a pure governance token. Holding UNI gives you voting rights on protocol upgrades, fee switches, and treasury deployment but it does not entitle you to a share of trading fees. This was a deliberate design choice that became a source of significant debate about value accrual in Uniswap's tokenomics.

## 1.3 Liquidity Incentives: Emissions and Mining

To bootstrap liquidity in new pools, protocols using the Classic AMM often run liquidity mining programs: they distribute their native governance token to LPs who stake their LP tokens in a rewards contract. LPs earn both trading fees and token emissions.

This creates a well-known dynamic:

- Mercenary liquidity: LPs come for the token rewards, not because the pool generates sufficient organic fee revenue.
- When emissions end or token price falls, LPs withdraw and move to the next high-yield opportunity.
- Pools lose depth, slippage rises, traders move elsewhere a liquidity death spiral.

This problem how to sustainably attract and retain deep liquidity without relying on inflationary token emissions became the central challenge that the Ve(3,3) model was designed to solve.

## 1.4 Governance in the Classic AMM

UNI governance is one-token-one-vote. Any wallet holding UNI can propose and vote on protocol changes. Proposals have gone through for fee tiers, concentrated liquidity upgrades, and cross-chain deployments. A governance fee switch routing a portion of trading fees to UNI holders has been discussed but not fully activated.

The model works well for protocol upgrades but has been criticized for low voter turnout, governance capture by large token holders (whales and VCs), and the lack of direct economic alignment between governance participation and fee revenue.

# 2. The Ve(3,3) Model

## 2.1 Origin and Philosophy

The Ve(3,3) model was introduced by Andre Cronje (creator of Yearn Finance) with the launch of Solidly on Fantom in early 2022. It was designed to solve the mercenary liquidity problem inherent in standard emission-based DEX tokenomics.

The name combines two concepts:

- Ve Vote-Escrow: a mechanism for locking tokens over time to gain voting power and fee rights
- (3,3) a game theory reference to Olympus DAO's cooperative equilibrium: the best collective outcome when all participants choose to stake rather than sell

> **The Core Insight Behind Ve(3,3)**
> If token emissions are the primary incentive, rational actors will always dump emissions the moment they receive them suppressing the token price and destroying the protocol's ability to attract future liquidity. Ve(3,3) breaks this cycle by making locking and voting the only path to meaningful rewards, aligning long-term holders with the protocol's success.

## 2.2 Vote-Escrow (veToken) Mechanics

At the heart of the Ve(3,3) model is the vote-escrow system. Rather than freely circulating governance tokens, users lock their tokens for a chosen duration to receive veTokens (vote-escrowed tokens). The longer the lock, the more veTokens received:

> **veToken Balance Formula**
> **veTOKEN_balance = TOKEN_locked × (lock_duration / max_lock_duration).**
> max_lock_duration is typically 4 years. A 4-year lock gives 1 veTOKEN per TOKEN locked. A 1-year lock gives 0.25 veTOKEN per TOKEN locked.

veTokens are non-transferable they cannot be sold or moved to another wallet. They decay linearly over time: as your lock period gets closer to expiry, your veToken balance decreases unless you re-lock. This creates continuous incentive to extend locks.

| Lock Duration | veToken Balance | Voting Power | Fee Entitlement |
|--------------|----------------|-------------|-----------------|
| 1 year (1,000 tokens) | 250 veTokens | Low | Low |
| 2 years (1,000 tokens) | 500 veTokens | Medium | Medium |
| 4 years (1,000 tokens) | 1,000 veTokens | Maximum | Maximum |

## 2.3 Voting: Directing Emissions

This is where Ve(3,3) diverges most sharply from the Classic AMM. In Classic AMM protocols, LPs earn emissions passively. In Ve(3,3), veToken holders vote each epoch (typically weekly) to determine which liquidity pools receive emissions.

The vote determines the emissions distribution for the next epoch:

> **Pool Emissions Share**
> pool_emissions = (votes_for_pool / total_votes) × weekly_token_emissions. More votes → more emissions → more LP rewards → deeper liquidity in that pool.

This creates a powerful incentive loop: protocols and token projects that want deep liquidity for their tokens have a direct mechanism to obtain it by accumulating veTokens or by bribing veToken holders to vote for their pool.

## 2.4 The Bribe System

Since veToken holders control where emissions go, a market emerges for their votes. Projects that want liquidity for their token can offer bribes additional token rewards deposited into a bribe contract that are claimable by veToken holders who vote for a specific pool.

- Protocol A wants deep liquidity for its token paired with USDC
- Protocol A deposits $10,000 worth of its token into the bribe contract for the A/USDC pool
- veToken holders who vote for the A/USDC pool receive a proportional share of that $10,000
- Higher emissions flow to the A/USDC pool, attracting LPs, deepening liquidity

> **Bribes Are Not a Dirty Word in Ve(3,3)**
> In this context, bribing is a legitimate, transparent, on-chain mechanism for protocols to pay for liquidity. It replaces the opaque, off-chain liquidity deals common in TradFi. The bribe market is efficient: veToken holders vote for the pools offering the best combination of trading fee revenue and bribe income.

## 2.5 Fee Distribution to veToken Holders

Unlike the Classic AMM model, where trading fees go entirely to LPs, Ve(3,3) protocols split fee revenue between LPs and veToken holders. The exact split varies by protocol, but the critical principle is that veToken holders receive the trading fees from the pools they voted for.

> **veToken Holder Fee Revenue**
> fee_revenue_to_voter = (your_votes_for_pool / total_votes_for_pool) × trading_fees_generated_by_pool. veToken holders capture fee revenue proportional to how they directed their votes.

This creates direct economic alignment: veToken holders are incentivized to vote for pools that generate the most real trading fee revenue, not just the pools offering the highest bribes. Sustainable, high-volume pools attract more votes, which attracts more LP emissions, which deepens liquidity further a virtuous cycle.

## 2.6 Rebase and Dilution Protection

In standard emission-based models, new token supply inflates away the holdings of long-term stakers. Ve(3,3) protocols typically include an anti-dilution rebase: each epoch, veToken holders receive additional tokens proportional to new emissions, so their percentage of the total supply is maintained even as new tokens are minted.

> **Anti-Dilution Rebase**
> rebase_amount = veToken_share × new_emissions × rebase_rate. veToken holders are protected from emission dilution as long as they maintain their lock.

This makes locking extremely attractive for long-term believers in the protocol: they capture fee revenue, earn bribe income, direct ecosystem liquidity, and are protected from inflation all simultaneously.

## 2.7 Real-World Ve(3,3) Protocols

| Protocol | Chain | veToken | Notable Innovation |
|----------|-------|---------|-------------------|
| Solidly (original) | Fantom | veSOLID | Introduced the Ve(3,3) model |
| Velodrome | Optimism | veVELO | Most successful V1 implementation; $500M+ TVL at peak |
| Aerodrome | Base | veAERO | Dominant DEX on Base; over $1B TVL |
| Pharaoh | Avalanche | xPHAR/vePHAR | Leading Ve(3,3) on Avalanche; used by BalCore |
| Thena | BNB Chain | veTHE | BNB Chain's leading Ve(3,3) DEX |
| Equalizer | Sonic/Fantom | veEQUAL | Multi-chain Ve(3,3) derivative |

# 3. Classic AMM vs. Ve(3,3): Full Comparison

| Dimension | Classic AMM | Ve(3,3) Model |
|-----------|------------|---------------|
| Trading Mechanism | AMM constant product (v2) or concentrated liquidity (v3) | AMM typically combines stable (x³y + xy³ = k) and volatile (x·y = k) curve types |
| Governance Token | Pure governance token (UNI) no direct fee rights | veToken with direct fee rights, bribe income, and emission direction |
| Fee Destination | 100% to LPs in that pool | Split between LPs and veToken holders who voted for the pool |
| Emission Direction | Fixed or governance-voted allocations | Weekly veToken vote determines every pool's emission weight |
| Liquidity Incentives | Liquidity mining programs (often external/temporary) | Continuous, protocol-native emission directed by veToken votes |
| Bribe Market | Not native; informal or via external protocols | Native on-chain bribe market; central to the liquidity economy |
| Token Locking | Not required UNI can be freely traded | Required for governance/fee rights; longer lock = more power |
| Inflation Protection | Not built-in holders diluted by emissions | Anti-dilution rebase for veToken holders each epoch |
| LP Motivation | Trading fees + optional external mining rewards | Trading fees + emissions voted by veToken holders |
| Protocol Sustainability | Depends on organic trading volume and fee revenue | Self-reinforcing: locks → votes → emissions → liquidity → fees → locks |
| Complexity for LPs | Low deposit, earn fees, withdraw | More complex but potentially higher yield from emissions |
| Complexity for Governance | Low simple token voting | Higher weekly voting, bribe markets, lock durations, and epoch timing |
| Example Protocols | Uniswap v2/v3, SushiSwap, PancakeSwap | Velodrome, Aerodrome, Pharaoh, Thena, Equalizer |

# 4. Pros and Cons

## 4.1 Classic AMM

| ✅ Pros | ❌ Cons |
|--------|--------|
| Simple and battle-tested. Classic AMM contracts (Uniswap v2/v3) are the most widely audited DEX code in existence. | Mercenary liquidity: LPs leave when emissions stop or a better opportunity appears. |
| Deep ecosystem integrations. More DeFi protocols composably build on Classic AMM designs than any other DEX model. | Token holders without fee rights: UNI governance power without direct economic alignment. |
| No lock-in for LPs or token holders. Maximum flexibility withdraw or sell at any time. | Emission programs are expensive and inflationary without a sustainable feedback loop. |
| Transparent fee tiers let LPs choose their risk/reward tradeoff across 0.05%, 0.3%, and 1% pools. | Governance capture risk: large UNI holders (VCs, team) disproportionately influence decisions. |
| Fork-friendly: the open-source model spawned SushiSwap, PancakeSwap, and hundreds of derivatives. | No native mechanism to direct liquidity to specific pairs beyond governance votes (slow and cumbersome). |

## 4.2 Ve(3,3) Model

| ✅ Pros | ❌ Cons |
|--------|--------|
| Sustainable liquidity: emission direction by veToken holders creates self-reinforcing liquidity incentives. | Complexity: weekly voting, bribe markets, lock durations, and epoch timing are difficult for new users. |
| Direct economic alignment: long-term holders capture fee revenue and bribe income, not just governance rights. | Lock-in risk: committed tokens are illiquid for the lock duration users cannot respond to market downturns. |
| Native bribe market: transparent, on-chain mechanism for protocols to pay for liquidity efficiently. | Early design flaws: the original Solidly had critical bugs and token distribution problems that led to its collapse. |
| Anti-dilution rebase protects long-term stakers from inflationary emissions destroying their position. | Governance complexity: veToken politics and bribe wars can lead to inefficient capital allocation. |
| Epoch-based rewards create predictable, regular income streams for veToken holders. | Protocol-specific: each Ve(3,3) fork has different parameters; knowledge doesn't transfer easily. |

# 5. How Value Flows in Each Model

## 5.1 Classic AMM Value Flow

Value Flow: Classic AMM
Trader swaps tokens
    → Fee paid (0.05% / 0.3% / 1.0%)
        → 100% distributed to LPs in that pool
        → UNI token holders: no direct fee share
LP rewards = trading fees + optional liquidity mining emissions
UNI utility = governance votes only

## 5.2 Ve(3,3) Model Value Flow

Value Flow: Ve(3,3) Model
Trader swaps tokens
    → Fee paid
        → Share to LPs (liquidity providers)
        → Share to veToken holders who voted for that pool
veToken holders also receive:
    → Bribe income (from protocols paying for votes)
    → Anti-dilution rebase (protection from new emissions)
veToken votes direct weekly emissions → LPs follow emissions → liquidity deepens

# 6. The Ve(3,3) Weekly Epoch Cycle

Understanding the epoch cycle is key to understanding how Ve(3,3) DEXes operate in practice. Each week follows a predictable rhythm:

**Day 1**
New Epoch Starts: veToken holders cast their votes for which pools should receive emissions this week. Bribe contracts are visible voters evaluate which pools offer the best combination of trading fee income and bribe rewards.
**Days 1–7**
Active Trading: Emissions flow to voted pools, attracting LPs. Trading fees accumulate for both LPs and veToken voters. Protocols post bribes to attract votes for the following epoch.
**Day 7**
Epoch Ends: Accumulated trading fees are distributed to veToken holders. Bribes are claimable. Anti-dilution rebase is distributed. New emissions are minted for the following epoch based on current vote tallies.
**Day 8**
New Epoch Begins: The cycle resets. Votes can be changed or maintained. New bribes are posted for the coming week. LPs continue providing liquidity based on where emissions are flowing.

> **Why the Epoch Cycle Matters**
> The weekly rhythm creates a predictable, regular market for liquidity. Protocols know exactly when to post bribes. veToken holders know exactly when income is distributed. LPs know exactly when emission weights change. This predictability is a significant improvement over the ad-hoc, governance-heavy liquidity management in the Classic AMM.


# 7. Which Model Is Better?

The answer depends entirely on your perspective as a participant:

| If You Are... | Classic AMM | Ve(3,3) Model |
|------------- |------------|--------------|
| A trader | More pools, more integrations, often better tooling | Competitive pricing on supported pairs due to deep, incentivized liquidity |
| A passive LP | Simple deposit and forget, earn fees | More complex but potentially higher yield from emissions |
| A long-term protocol supporter | Limited economic benefit from holding the governance token | Strong: fee income, bribes, and anti-dilution rebase reward conviction |
| A protocol needing liquidity | Must fund external mining programs expensive and temporary | Pay bribes on-chain targeted, efficient, and immediately measurable |
| A DeFi developer | Massive ecosystem, best composability and tooling | Emerging tooling; bribe market APIs and vote aggregators growing |

# 8. How This Relates to BalCore

BalCore operates across both DEX model types on Avalanche. Its FlowYield system is designed to be AMM-agnostic deploying liquidity where the best combination of depth, fee revenue, and incentives exists at any given time.

- On Classic AMM DEXes: BalCore provides concentrated liquidity positions, actively managing ranges to capture trading fees with capital efficiency
- On Ve(3,3) DEXes (Pharaoh, Blackhole): BalCore participates in emission-incentivized pools, combining active LP fee revenue with the emission layer that Ve(3,3) adds on top
- The 90% reserve layer can also interact with Ve(3,3) protocols as a depositor, capturing yield from both lending and incentivized positions

>**BalCore's Advantage**
>By being DEX-model agnostic, BalCore can route capital to wherever the risk-adjusted yield is highest on Avalanche whether that's a Classic AMM concentrated position on LFJ or an emission-boosted pool on Pharaoh. Users benefit from this flexibility without needing to understand the mechanics of either model themselves.

# 9. Summary

| Classic AMM In Brief | Ve(3,3) Model In Brief |
|--|--|
| A trading-first model. LPs earn fees directly. The governance token has no fee rights. Best for simplicity, ecosystem breadth, and composability.| An incentive-coordination model. veToken holders direct emissions and capture fees. Best for sustainable liquidity, long-term alignment, and protocol-level liquidity management. |

Neither model is universally superior. The Classic AMM's simplicity and ecosystem dominance make it the default for most DeFi applications. Ve(3,3)'s incentive alignment and bribe markets make it the preferred model for chains and ecosystems that want to bootstrap deep, sustainable liquidity from the ground up. Avalanche's DeFi ecosystem features both and BalCore is built to leverage both.

## Learn More

Visit **balcore.io** to see how BalCore's FlowYield system puts these DEX models to work automatically, transparently, and without technical expertise required.
    `,
};
