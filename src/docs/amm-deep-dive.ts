import { DocSection } from "./types";

export const ammDeepDiveSection: DocSection = {
    id: "amm-deep-dive",
    title: "AMM Deep Dive: Regular vs Concentrated Liquidity",
    shortTitle: "AMM Guide",
    content: `
# AMM Deep Dive

## Regular vs. Concentrated Liquidity

Automated Market Makers (AMMs) are the engines that power decentralized trading. Understanding how they work — and how the two dominant models differ — is essential for anyone who wants to participate in DeFi, provide liquidity, or evaluate protocols like BalCore.

## 1. What Is an Automated Market Maker?

In traditional finance, a market is kept liquid by professional market makers — firms that continuously post buy and sell quotes, profiting from the spread. In DeFi, this role is filled by smart contracts that hold reserves of two tokens and use a mathematical formula to quote prices automatically.

> **Core Idea:** An AMM is a smart contract that: (1) holds reserves of two tokens, (2) uses a formula to set the exchange rate automatically, (3) lets anyone trade against those reserves, and (4) lets anyone supply capital to earn trading fees.

## 2. The Regular AMM (Constant Product Model)

### 2.1 The Constant Product Formula

The foundational AMM design — popularized by Uniswap v2 — is built on a single, elegant equation:

> **x · y = k**
> x = reserve of Token A | y = reserve of Token B | k = constant (never changes)

### 2.2 How Trades Are Priced

Suppose a pool holds x = 1,000 AVAX and y = 40,000 USDC. The constant is k = 40,000,000. The spot price of AVAX = y / x = $40.00.

A trader wanting to buy 10 AVAX pays $404.04 USDC — an effective price of $40.40, slightly above spot price. This difference is called **price impact** or **slippage**.

### 2.3 The Capital Efficiency Problem

If AVAX trades between $30 and $50, the vast majority of LP capital is sitting at prices that will never be reached. A pool with $10M in liquidity might only have $500,000 actively useful at any given time.

## 3. Concentrated Liquidity AMM

### 3.1 The Core Innovation

Concentrated liquidity allows LPs to specify a **price range [Pa, Pb]** where they want their capital deployed. All capital is concentrated in that range, generating fees only when the price is within bounds.

### 3.2 Capital Efficiency Quantified

| Price Range | Example (AVAX @ $40) | Capital Efficiency | Fee Multiplier |
|-------------|---------------------|-------------------|----------------|
| Full Range (0 → ∞) | $0 → $∞ | 1× | Baseline |
| ±50% Range | $20 → $60 | ~3.4× | ~3.4× more fees |
| ±20% Range | $32 → $48 | ~9.1× | ~9.1× more fees |
| ±10% Range | $36 → $44 | ~20× | ~20× more fees |
| ±5% Range | $38 → $42 | ~42× | ~42× more fees |

A ±5% position earns **42× more fees** from the same capital than a full-range position.

### 3.3 Impermanent Loss Amplification

Concentrated liquidity amplifies both gains and losses. The same mechanism that multiplies fee earnings also multiplies impermanent loss when the price moves significantly.

| Price Change | Full Range IL | ±20% Range IL | ±5% Range IL |
|-------------|--------------|---------------|--------------|
| +5% | -0.06% | -0.06% | Position active |
| +10% | -0.23% | -0.30% | Still active |
| +20% | -0.83% | -1.10% | Near upper bound |
| +50% | -4.15% | Range exited | Range exited |
| +100% | -13.4% | Range exited | Range exited |

## 4. Full Comparison

| Dimension | Regular AMM | Concentrated Liquidity |
|-----------|------------|----------------------|
| Capital Efficiency | Low — most capital inactive | High — all capital in active range |
| Fee Multiplier | 1× (baseline) | Up to 4,000× for tight ranges |
| Impermanent Loss | Present, moderate | Present and amplified |
| LP Complexity | Very low — deposit and forget | High — must monitor and rebalance |
| Best For LPs | Passive, long-term holders | Active managers or automated systems |

## Where BalCore Fits In

BalCore's FlowYield System is built specifically on top of concentrated liquidity AMMs. It captures all the advantages while removing every barrier:

| Challenge | How BalCore Solves It |
|-----------|---------------------|
| Choosing the right price range | Uses volume profile data to position liquidity where trading activity is highest |
| Rebalancing when price moves | Automated Dynamic Rebalancing Engine monitors and adjusts in real time |
| Managing active and idle capital | Dual-Layer Architecture: 10% active, 90% in reserves earning passive yield |
| Impermanent loss risk | Triple-Layer IL Protection covers all scenarios |
| Complexity | Fully automated — users deposit once, protocol handles everything |
    `,
  };
