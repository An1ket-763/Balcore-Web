import { DocSection } from "./types";

export const whitePaperSection: DocSection = {
  id: "white-paper",
  title: "White Paper",
  shortTitle: "White Paper",
  content: `
# BALCORE PROTOCOL | FlowYield System — User Guide & Protocol Overview

## BalCore Protocol
## FlowYield System

### Earn More. Risk Less. Do Nothing.

Automated Liquidity Management & Impermanent Loss Protection on Avalanche

| Metric | Value | Notes |
|--------|-------|-------|
| **Target APY** | Up to 30% | market-dependent |
| **Impermanent Loss** | 0% | principal always protected |
| **Capital in Reserve** | 90% | safe & earning yield |
| **Automation** | 24/7 | no manual action needed |

Most people know they should put their crypto to work. But the moment you try to provide liquidity in DeFi, you run into a wall: complex positions, constant rebalancing, the dreaded impermanent loss that can quietly eat your returns while you think you're earning. BalCore was built to tear that wall down. Deposit your tokens once. The rest is handled for you — automatically, transparently, and with your principal protected.

## THE PROBLEM

## DeFi Yields Are Real. But So Is the Pain.
### Why most people leave money on the table

### The Problem Every LP Faces

Decentralized exchanges need liquidity providers to function. When you provide liquidity, traders use your tokens to swap — and you earn a fee every time they do. In theory, it's one of the best passive income opportunities in finance. In practice, it has three massive obstacles that stop most people cold.

| The Obstacle | What It Means in Practice |
|--------------|---------------------------|
| **Impermanent Loss (IL)** | When the price of your deposited tokens moves, you end up holding less of the one that went up. This invisible loss can easily wipe out all the trading fees you earned — and then some. Most LPs don't even realise it's happening until they withdraw. |
| **Constant Rebalancing** | Concentrated liquidity is the most profitable way to provide liquidity — but your capital only earns fees when the price is inside your chosen range. Price moves out of range? Your capital sits idle, earning nothing, while IL accumulates. You need to rebalance constantly. |
| **Idle Capital** | In standard liquidity pools, the majority of your capital sits at prices that will never be traded at. It earns nothing but is still exposed to price risk. The most efficient setups require active monitoring most people simply cannot do. |

Billions of dollars of crypto capital sits idle in DeFi because the systems designed to put it to work are too complex, too risky, or too time-consuming for normal people to manage.

BalCore's answer to all three of these problems is the FlowYield System — an automated protocol built on Avalanche that manages your liquidity, earns fees on your behalf, protects your principal, and distributes yield to you weekly. You do not need to understand any of the mechanics to benefit from them.

## THE SOLUTION
## FlowYield: Your Capital, Always Working
### A dual-layer architecture that earns from two sources simultaneously

### How FlowYield Works

The core insight behind BalCore is deceptively simple: instead of putting all your capital at risk in active liquidity positions, keep most of it safe and earning in reserve — and only deploy a small, precisely managed portion into active market making. This creates two simultaneous yield streams with a fraction of the risk.

### 2.1 The 10/90 Architecture

When you deposit into a BalCore vault, your capital is instantly split into two layers that work in parallel, every second of every day:

| Active Layer — 10% | Reserve Layer — 90% |
|--------------------|---------------------|
| **What it does**: Deployed as concentrated liquidity in the DEX pool — the position that earns trading fees | **What it does**: Held in reserve and deposited into lending protocols like Benqi — earning passive interest continuously |
| **Risk exposure**: This is where impermanent loss exposure lives — but it's only 10% of your capital, so IL impact is structurally limited to a small fraction of your total deposit | **Risk exposure**: Zero IL exposure. This capital is never in a trading pool. It earns yield regardless of whether markets are volatile or calm |
| **Managed by**: FlowYield's automated engine — positioning, rebalancing, and recovering positions without any human input | **Managed by**: Automated allocation to Benqi — earning yield 24/7 and serving as a buffer for rebalancing the active layer |

### Why This Design Is Powerful

Traditional LP: 100% of your capital is exposed to impermanent loss.  
BalCore: Only 10% is ever in an active LP position.

The 90% in reserve is structurally shielded from IL — it simply cannot lose value to price movements in a liquidity pool. This single architectural decision reduces IL exposure by 80–90% before any other protection mechanism even activates.

### 2.2 Intelligent Automated Management

The 10% active layer is not just left sitting in a static position. BalCore's FlowYield engine continuously monitors market conditions and manages the active position using proprietary algorithms developed by the BalCore team. The specifics of how the engine determines optimal positioning are the protocol's core intellectual property — but the outcome is straightforward: your liquidity is always where it needs to be, capturing fees efficiently while minimising exposure to unfavourable price moves.

- Active positions are automatically repositioned when market conditions change
- When the price moves significantly, the engine adjusts — using the reserve layer as a buffer to restore balance without forced selling
- If one side of the position becomes fully depleted, the protocol has a safety mechanism to restore balance while maintaining the health and security of the entire vault
- All of this happens algorithmically, 24 hours a day, 7 days a week, with no action required from you

### What We Don't Share — And Why

The specific strategies, signals, and timing logic behind how BalCore positions liquidity are proprietary. Disclosing them would allow competitors to replicate the system and eliminate the performance advantage that benefits every user. What you can verify is the outcome: the fee revenue generated, the IL protection delivered, and the yield distributed — all visible on-chain.

## THE PROTECTION
## Triple-Layer IL Shield
### Three independent systems ensuring your principal is always returned in full

### Triple-Layer Impermanent Loss Protection

#### 1) PREVENTION
**Strategic Deployment — Stop IL Before It Starts**

Effectiveness: Eliminates 80–90% of impermanent loss before any other layer is needed.

The most powerful way to deal with impermanent loss is to never be in the wrong position in the first place. BalCore's engine uses proprietary market analysis to deploy liquidity at price levels where it is most productive — and crucially, to avoid deploying at levels where adverse price moves are most likely. By keeping 90% of capital in the reserve and precisely managing where the 10% active layer sits, most weeks generate 0–2% IL instead of the 10–30% that passive LP strategies typically experience.

#### 2) COVERAGE
**IL Reserve Fund — Cover What Prevention Misses**

Capacity: Handles the remaining IL in 99% of normal market conditions.

A portion of every dollar of yield the protocol generates is automatically set aside into the IL Reserve Fund — a dedicated pool that exists solely to make users whole when they withdraw. When you exit and impermanent loss is detected on your position, the Reserve Fund covers the shortfall in the actual tokens you deposited. You receive your original deposit back in full. The Reserve Fund grows continuously with every fee the vault earns, targeting a size of 4–5% of total vault value.

#### 3) GUARANTEE
**Backup Reserve Vault — The Ultimate Safety Net**

Activation: Guarantees 100% principal protection even if the IL Reserve is exhausted.

The Backup Reserve Vault is BalCore's deepest layer of protection — built exclusively from exceptional performance. When the vault generates yields above the 30% APY user cap, every dollar of that excess automatically flows into the Backup Reserve. This capital cannot be used for anything other than protecting user principal. It is the protocol's guarantee: even in a catastrophic market crash where the first two layers are stressed, the Backup Reserve ensures every user exits with their full principal intact.

The three layers are not alternatives — they are sequential. Layer 1 prevents most IL. Layer 2 covers what Layer 1 misses. Layer 3 guarantees the result if both Layer 1 and Layer 2 are overwhelmed. In practice, the vast majority of withdrawals are handled entirely by Layer 1 alone.

### The BalCore Guarantee

You will never lose your deposited principal to impermanent loss. Not in a normal week. Not in a volatile market. Not in a crash. Three independent layers of protection — structural, funded, and guaranteed — ensure that when you withdraw, you receive at minimum everything you put in.

## THE RETURNS
## How BalCore Earns — And How You Get Paid
### Two yield sources, distributed weekly, up to 30% APY

### The Yield Model

BalCore generates yield from two separate sources simultaneously. Both run continuously — one depends on trading activity, the other runs regardless of market conditions. Together they produce a combined return that is distributed to users weekly.

### 4.1 Two Yield Sources, Always Running

| Source | Where It Comes From | When It Runs | Typical Contribution |
|--------|----------------------|--------------|----------------------|
| **Active LP Trading Fees** | Every time a trader swaps tokens in the DEX pool, a fee is charged. BalCore's active layer captures this fee proportional to the liquidity it provides in the active range. | Continuously while price is within the active range | Market dependent |
| **Reserve Yield (Benqi)** | The 90% reserve is deposited into Benqi, Avalanche's leading lending protocol. Benqi pays interest on deposited assets. | 24/7 — never stops, regardless of market conditions | Market dependent |

### 4.2 How Your Yield Is Distributed

Every week, the gross yield collected from both sources is distributed in a fixed priority order:

1. **IL coverage** — making users whole on withdrawal
2. **IL Reserve Fund** — grows continuously for future coverage (20–30% of gross yield)
3. **Protocol fee** — BalCore operations and development (5% of remaining yield)
4. **You** — distributed to all active vault share holders (up to 30% APY cap)
5. **Surplus** — Backup Reserve Vault (ultimate safety net)

### About the 30% APY Cap

The 30% cap is a ceiling, not a guarantee. In strong market weeks the vault may generate more, but users receive up to 30% while the remainder strengthens the Backup Reserve.

### Supported Assets & Risk Controls

- AVAX / USDC
- BTC.b / USDC
- ETH / USDC

## Depositing into BalCore

Depositing is designed to be as simple as possible. Connect your wallet, choose a pool, enter an amount, and confirm.

### The Equal-Value Rule

Every deposit must consist of both tokens in the pair, at equal market value.

## Withdrawing Your Funds

| Withdrawal Type | Time | Cost |
|-----------------|------|------|
| **Standard Withdrawal** | 7 days | Free |
| **Fast-Track Withdrawal** | 24–48 hours | 3% |

### What You Receive When You Exit

Original deposit returned in full + any impermanent loss covered by the IL Reserve + all accumulated weekly fees.

## THE ECOSYSTEM
## Built on Avalanche. Connected to the Best.

- Avalanche
- LFJ (Trader Joe)
- Pharaoh
- Blackhole
- Benqi

## Roadmap

- **Phase 1 — Launch:** Deploy FlowYield vaults.
- **Phase 2 — Expand:** Add more assets and strategies.
- **Phase 3 — Govern:** Launch BalCore DAO.
- **Phase 4 — Scale:** Multi-chain expansion.

## Transparency & Security

- Non-custodial smart contracts
- Self-custody
- Audited smart contracts
- On-chain transparency
- Governance control

## Conclusion

DeFi promised to make finance open to everyone. BalCore delivers on that promise — by making professional-grade liquidity management, institutional-quality risk controls, and real yield accessible to any wallet, anywhere, without complexity.

The FlowYield System is how BalCore delivers this.

Deposit once.  
Earn from two sources simultaneously.  
Know your principal is protected by three independent layers.  
Withdraw at any time.

The protocol handles everything else.

## Start Earning Today

Visit **balcore.io** to connect your wallet and deposit into the FlowYield vault.

© 2025 BalCore Inc. — balcore.io
`,
};
