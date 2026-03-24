// import { DocSection } from "./types";

// export const whitePaperSection: DocSection = {
//   id: "white-paper",
//   title: "White Paper",
//   shortTitle: "White Paper",
//   content: `
// # BALCORE PROTOCOL | FlowYield System — User Guide & Protocol Overview

// ## Balcore Protocol
// ## FlowYield System

// ### Earn More. Risk Less. Do Nothing.

// Automated Liquidity Management & Impermanent Loss Protection on Avalanche

// | Metric | Value | Notes |
// |--------|-------|-------|
// | Target APY | **Up to 30%** | market-dependent |
// | Impermanent Loss | **0%** | principal always protected |
// | Capital in Reserve | **90%** | safe & earning yield |
// | Fully Automated | **24/7** | no manual action needed |

// Most people know they should put their crypto to work. But the moment you try to provide liquidity in DeFi, you run into a wall: complex positions, constant rebalancing, the dreaded impermanent loss that can quietly eat your returns while you think you're earning. Balcore was built to tear that wall down. Deposit your tokens once. The rest is handled for you — automatically, transparently, and with your principal protected.

// ## THE PROBLEM
// ## DeFi Yields Are Real. But So Is the Pain.
// ### Why most people leave money on the table

// ### 1. The Problem Every LP Faces

// Decentralized exchanges need liquidity providers to function. When you provide liquidity, traders use your tokens to swap — and you earn a fee every time they do. In theory, it's one of the best passive income opportunities in finance. In practice, it has three massive obstacles that stop most people cold.

// | The Obstacle | What It Means in Practice |
// |--------------|---------------------------|
// | **Impermanent Loss (IL)** | When the price of your deposited tokens moves, you end up holding less of the one that went up. This invisible loss can easily wipe out all the trading fees you earned — and then some. Most LPs don't even realise it's happening until they withdraw. |
// | **Constant Rebalancing** | Concentrated liquidity is the most profitable way to provide liquidity — but your capital only earns fees when the price is inside your chosen range. Price moves out of range? Your capital sits idle, earning nothing, while IL accumulates. You need to rebalance constantly. |
// | **Idle Capital** | In standard liquidity pools, the majority of your capital sits at prices that will never be traded at. It earns nothing but is still exposed to price risk. The most efficient setups require active monitoring most people simply cannot do. |

// Billions of dollars of crypto capital sits idle in DeFi because the systems designed to put it to work are too complex, too risky, or too time-consuming for normal people to manage.

// Balcore's answer to all three of these problems is the FlowYield System — an automated protocol built on Avalanche that manages your liquidity, earns fees on your behalf, protects your principal, and distributes yield to you weekly. You do not need to understand any of the mechanics to benefit from them.

// ## THE SOLUTION
// ## FlowYield: Your Capital, Always Working
// ### A dual-layer architecture that earns from two sources simultaneously

// ### 2. How FlowYield Works

// The core insight behind Balcore is deceptively simple: instead of putting all your capital at risk in active liquidity positions, keep most of it safe and earning in reserve — and only deploy a small, precisely managed portion into active market making. This creates two simultaneous yield streams with a fraction of the risk.

// ### 2.1 The 10/90 Architecture

// When you deposit into a Balcore vault, your capital is instantly split into two layers that work in parallel, every second of every day:

// | Active Layer — 10% | Reserve Layer — 90% |
// |--------------------|---------------------|
// | **What it does**: Deployed as concentrated liquidity in the DEX pool — the position that earns trading fees | **What it does**: Held in reserve and deposited into lending protocols like Benqi — earning passive interest continuously |
// | **Risk exposure**: This is where impermanent loss exposure lives — but it's only 10% of your capital, so IL impact is structurally limited to a small fraction of your total deposit | **Risk exposure**: Zero IL exposure. This capital is never in a trading pool. It earns yield regardless of whether markets are volatile or calm |
// | **Managed by**: FlowYield's automated engine — positioning, rebalancing, and recovering positions without any human input | **Managed by**: Automated allocation to Benqi — earning yield 24/7 and serving as a buffer for rebalancing the active layer |

// ### Why This Design Is Powerful

// Traditional LP: 100% of your capital is exposed to impermanent loss. Balcore: Only 10% is ever in an active LP position.

// The 90% in reserve is structurally shielded from IL — it simply cannot lose value to price movements in a liquidity pool. This single architectural decision reduces IL exposure by 80–90% before any other protection mechanism even activates.

// ### 2.2 Intelligent Automated Management

// The 10% active layer is not just left sitting in a static position. Balcore's FlowYield engine continuously monitors market conditions and manages the active position using proprietary algorithms developed by the Balcore team. The specifics of how the engine determines optimal positioning are the protocol's core intellectual property — but the outcome is straightforward: your liquidity is always where it needs to be, capturing fees efficiently while minimising exposure to unfavourable price moves.

// - Active positions are automatically repositioned when market conditions change
// - When the price moves significantly, the engine adjusts — using the reserve layer as a buffer to restore balance without forced selling
// - If one side of the position becomes fully depleted, the protocol has a safety mechanism to restore balance while maintaining the health and security of the entire vault
// - All of this happens algorithmically, 24 hours a day, 7 days a week, with no action required from you

// ### What We Don't Share — And Why

// The specific strategies, signals, and timing logic behind how Balcore positions liquidity are proprietary. Disclosing them would allow competitors to replicate the system and eliminate the performance advantage that benefits every user. What you can verify is the outcome: the fee revenue generated, the IL protection delivered, and the yield distributed — all visible on-chain.

// ## THE PROTECTION
// ## Triple-Layer IL Shield
// ### Three independent systems ensuring your principal is always returned in full

// ### 3. Triple-Layer Impermanent Loss Protection

// Impermanent loss is the biggest risk facing any liquidity provider. Balcore treats it not as an acceptable cost of doing business, but as a problem to be structurally solved. The solution operates on three independent layers — each one a complete protection mechanism in its own right, stacked for comprehensive coverage.

// #### 1 — PREVENTION
// **Strategic Deployment — Stop IL Before It Starts**
// Effectiveness: Eliminates 80–90% of impermanent loss before any other layer is needed.

// The most powerful way to deal with impermanent loss is to never be in the wrong position in the first place. Balcore's engine uses proprietary market analysis to deploy liquidity at price levels where it is most productive — and crucially, to avoid deploying at levels where adverse price moves are most likely. By keeping 90% of capital in the reserve and precisely managing where the 10% active layer sits, most weeks generate 0–2% IL instead of the 10–30% that passive LP strategies typically experience.

// #### 2 — COVERAGE
// **IL Reserve Fund — Cover What Prevention Misses**
// Capacity: Handles the remaining IL in 99% of normal market conditions.

// A portion of every dollar of yield the protocol generates is automatically set aside into the IL Reserve Fund — a dedicated pool that exists solely to make users whole when they withdraw. When you exit and impermanent loss is detected on your position, the Reserve Fund covers the shortfall in the actual tokens you deposited. You receive your original deposit back in full. The Reserve Fund grows continuously with every fee the vault earns, targeting a size of 4–5% of total vault value.

// #### 3 — GUARANTEE
// **Backup Reserve Vault — The Ultimate Safety Net**
// Activation: Guarantees 100% principal protection even if the IL Reserve is exhausted.

// The Backup Reserve Vault is Balcore's deepest layer of protection — built exclusively from exceptional performance. When the vault generates yields above the 30% APY user cap, every dollar of that excess automatically flows into the Backup Reserve. This capital cannot be used for anything other than protecting user principal. It is the protocol's guarantee: even in a catastrophic market crash where the first two layers are stressed, the Backup Reserve ensures every user exits with their full principal intact.

// The three layers are not alternatives — they are sequential. Layer 1 prevents most IL. Layer 2 covers what Layer 1 misses. Layer 3 guarantees the result if both Layer 1 and Layer 2 are overwhelmed. In practice, the vast majority of withdrawals are handled entirely by Layer 1 alone.

// ### The Balcore Guarantee

// You will never lose your deposited principal to impermanent loss. Not in a normal week. Not in a volatile market. Not in a crash. Three independent layers of protection — structural, funded, and guaranteed — ensure that when you withdraw, you receive at minimum everything you put in.

// ## THE RETURNS
// ## How Balcore Earns — And How You Get Paid
// ### Two yield sources, distributed weekly, up to 30% APY

// ### 4. The Yield Model

// Balcore generates yield from two separate sources simultaneously. Both run continuously — one depends on trading activity, the other runs regardless of market conditions. Together they produce a combined return that is distributed to users weekly.

// ### 4.1 Two Yield Sources, Always Running

// | Source | Where It Comes From | When It Runs | Typical Contribution |
// |--------|----------------------|--------------|----------------------|
// | **Active LP Trading Fees** | Every time a trader swaps tokens in the DEX pool, a fee is charged. Balcore's active layer captures this fee proportional to the liquidity it provides in the active range. | Continuously while price is within the active range | Variable — depends on trading volume and volatility. Higher volatility = more trades = more fees. |
// | **Reserve Yield (Benqi)** | The 90% reserve is deposited into Benqi, Avalanche's leading lending protocol. Benqi pays interest on deposited assets, the same way a savings account pays interest — but at DeFi rates. | 24/7 — never stops, regardless of market conditions | Stable and predictable — provides a floor yield even in quiet market weeks. |

// ### 4.2 How Your Yield Is Distributed

// Every week, the gross yield collected from both sources is distributed in a fixed priority order. This order is transparent, on-chain, and never changes.

// | Priority | Who Gets It | Amount |
// |----------|-------------|--------|
// | 1 | IL coverage — making users whole on withdrawal | As needed, before anything else |
// | 2 | IL Reserve Fund — grows continuously for future coverage | 20–30% of gross yield |
// | 3 | Protocol fee — Balcore operations and development | 5% of remaining yield |
// | 4 | You — distributed to all active vault share holders | Up to 30% APY cap |
// | 5 | Surplus to Backup Reserve Vault — ultimate safety net | Everything above 30% APY |

// Your yield is claimable weekly through the Balcore dashboard. It accumulates automatically — you never have to do anything to keep earning. Unclaimed yield rolls forward and can be collected at any time.

// ### About the 30% APY Cap

// The 30% cap is a ceiling, not a guarantee. In strong market weeks the vault may generate 50%, 60%, or more — you receive 30% and the rest builds the Backup Reserve. In quieter weeks you may receive 10–15%. The cap exists because every dollar above 30% that flows into the Backup Reserve makes the entire protocol stronger and safer for everyone in it.

// ### 5. Supported Assets & Risk Controls

// Balcore v1 launches with the core Avalanche asset pairs that have the deepest liquidity and most active trading. Additional assets can be added over time through the protocol's governance process.

// | Supported Pair | Assets | Risk Profile | Notes |
// |----------------|--------|--------------|-------|
// | AVAX / USDC | AVAX + USDC | Low | The primary Avalanche pair — deepest liquidity, highest fee volume |
// | BTC.b / USDC | BTC.b + USDC | Very Low | Bridged Bitcoin on Avalanche — strong institutional demand |
// | ETH / USDC | ETH + USDC | Low | Ethereum on Avalanche — broad use and consistent volume |

// To protect all depositors, Balcore enforces vault allocation caps. No single asset can represent more than 30% of total vault value (USDC may reach up to 50%). Deposits that would breach these thresholds are automatically flagged or rejected.

// ## USING BALCORE
// ## Depositing, Earning & Withdrawing
// ### Everything you need to know as a user

// ### 6. Depositing into Balcore

// Depositing is designed to be as simple as possible. Connect your wallet, choose a pool, enter an amount, and confirm. Balcore handles everything from that point forward.

// ### 6.1 The Equal-Value Rule

// Every deposit must consist of both tokens in the pair, at equal market value. You cannot deposit only one token, and you cannot deposit unequal amounts. Balcore auto-calculates the second token the moment you enter the first — you never need to do the math.

// | Valid Deposit (AVAX = $40) | Status |
// |----------------------------|--------|
// | 1 AVAX + 40 USDC | ✅ |
// | 5 AVAX + 200 USDC | ✅ |
// | 0.5 AVAX + 20 USDC | ✅ |

// | Invalid Deposit | Reason |
// |-----------------|--------|
// | 5 AVAX + 100 USDC | ❌ unequal value |
// | 5 AVAX only, no USDC | ❌ single-sided |
// | Any ratio beyond ±1% tolerance | ❌ |

// A ±1% tolerance is built in to account for minor price movement between when you initiate and when the transaction confirms. Anything beyond ±1% is rejected automatically.

// ### 6.2 What Happens After You Deposit

// 1. Your deposit is split: 10% goes into the active LP position, 90% goes into the reserve vault earning passive yield immediately.
// 2. You receive vault shares — tokens representing your proportional ownership of the vault and your right to earn yield.
// 3. If you deposit during an active cycle, your capital joins a queue and enters the active layer at the next rebalance event. Reserve yield begins from day one regardless.
// 4. Your position and accumulated yield are visible in the Balcore dashboard at all times.

// ### 7. Withdrawing Your Funds

// Balcore offers two withdrawal options. Both include full IL protection — your principal is always returned in full, regardless of market conditions.

// | Option | Timeline | Cost | IL Protection | Best For |
// |--------|----------|------|---------------|----------|
// | Standard Withdrawal | 7 days | Free | 100% | Most users — save the fee, there's no rush |
// | Fast-Track Withdrawal | 24–48 hours | 3% of amount | 100% | Urgent situations — the 3% is worth it for speed |

// On Standard Withdrawal, the 7-day window allows the protocol to unwind your LP position cleanly, collect any remaining fees, calculate and apply IL coverage, and assemble your full payout. You receive your original token amounts, plus IL coverage if applicable, plus all accumulated fees — in the same tokens you deposited. No forced conversions.

// On Fast-Track Withdrawal, the 3% fee is split between the IL Reserve Fund (50%) and active vault users (50%) as a reward for providing the immediate liquidity that makes your fast exit possible.

// ### What You Receive When You Exit

// Original deposit returned in full + any impermanent loss covered by the IL Reserve + all accumulated weekly fees you earned during your time in the vault. In the vast majority of cases, users exit with more than they deposited. Principal loss due to impermanent loss is not possible by design.

// ## THE ECOSYSTEM
// ## Built on Avalanche. Connected to the Best.
// ### Where Balcore sits in the DeFi landscape

// ### 8. The Balcore Ecosystem

// Balcore is not a standalone protocol — it is a liquidity orchestration layer built on top of Avalanche's most established DeFi infrastructure. Every component is chosen for security, depth, and reliability.

// | Protocol / Platform | Role in Balcore | Why It Matters |
// |---------------------|-----------------|----------------|
// | Avalanche | The foundational blockchain | Sub-second finality, low fees, and the deepest DeFi liquidity on any chain outside Ethereum |
// | LFJ (Trader Joe) | Primary DEX for active LP positions | Avalanche's leading concentrated liquidity AMM — deepest AVAX/USDC and BTC.b pools |
// | Pharaoh | Ve(3,3) DEX for incentivised liquidity positions | Ve(3,3) model adds emission rewards on top of trading fees — boosting LP yields |
// | Blackhole | Additional DEX venue for liquidity deployment | Expanding pool options for better capital routing and fee capture |
// | Benqi | Lending protocol for reserve yield generation | Avalanche's most trusted lending protocol — the 90% reserve earns here continuously |

// ### 9. Who Balcore Is For

// Balcore was designed to serve every type of capital holder who wants to put their crypto to work without the complexity, risk, or active management that DeFi usually demands.

// | User Type | What Balcore Gives You |
// |-----------|-------------------------|
// | Individual DeFi users | Professional-grade liquidity management with zero technical knowledge required. Earn trading fees and reserve yield automatically. |
// | IL-averse participants | The only DeFi yield protocol with structural, funded, and guaranteed principal protection. Earn without the risk of losing what you put in. |
// | Passive crypto holders | Put idle AVAX, BTC.b, or ETH to work earning up to 30% APY instead of sitting in a wallet earning nothing. |
// | DAOs and protocol treasuries | Deploy treasury assets into Balcore for sustainable, automated yield — with the risk controls institutional participants require. |
// | Institutions | Non-custodial, transparent, auditable on-chain infrastructure for DeFi yield generation with defined risk parameters. |

// ## THE ROADMAP
// ## Where Balcore Is Going
// ### Four phases to a complete liquidity protocol

// ### 10. Roadmap

// #### Phase 1 — Launch: FlowYield Core
// - Deploy FlowYield vaults for AVAX/USDC, BTC.b/USDC, and ETH/USDC pairs
// - Full triple-layer IL protection live from day one
// - Standard and Fast-Track withdrawal options
// - Weekly yield distribution and real-time dashboard

// #### Phase 2 — Expand: More Assets, More Venues
// - Integrate Liquid Staking Tokens (LSTs) — staked AVAX and similar yield-bearing assets
// - Add stablecoin pairs — near-zero IL, high fee efficiency
// - Cross-DEX strategies — FlowYield routing across multiple Avalanche pools
// - Expanded asset support through governance proposals

// #### Phase 3 — Govern: Balcore DAO
// - Introduce the Balcore governance token — FlowYield Token
// - Token holders vote on vault parameters, asset additions, and protocol upgrades
// - DAO dashboard for LP analytics, yield tracking, and governance participation
// - Institutional Mode — dedicated tools for DAO and treasury management

// #### Phase 4 — Scale: Multi-Chain Expansion
// - Expand FlowYield vaults beyond Avalanche to other EVM-compatible chains
// - Tokenized Real World Assets (RWAs) — managing liquidity for tokenized stocks, bonds, and commodities
// - Cross-chain yield orchestration — single deposit, multi-chain deployment
// - Become the liquidity infrastructure layer for the tokenized financial system

// ### 11. Transparency & Security

// Balcore is built on a simple principle: you should be able to verify everything that matters without needing to trust us. Every relevant metric — vault TVL, active positions, fee generation, IL reserve balance, and yield distributions — is recorded on the Avalanche blockchain and readable by anyone.

// - **Non-custodial:** your tokens are never held by Balcore. They are always in smart contracts you can inspect on-chain
// - **Self-custody:** you interact with Balcore through your own wallet. No account, no KYC, no third party holding your assets
// - **Audited smart contracts:** protocol code is independently audited before deployment
// - **On-chain transparency:** every fee collected, every yield distributed, every IL coverage applied is a public transaction on Avalanche
// - **Configurable by governance:** key protocol parameters (active layer %, withdrawal lock, IL reserve target) are governed transparently by the DAO once launched

// ### 12. Conclusion

// DeFi promised to make finance open to everyone. Balcore delivers on that promise — by making professional-grade liquidity management, institutional-quality risk controls, and real yield accessible to any wallet, anywhere, without complexity.

// The core insight that drives Balcore is simple: the tools that institutional market makers use to generate sustainable yield — precise positioning, automated rebalancing, reserve management, and loss prevention — should not be locked behind technical barriers, minimum capital requirements, or institutional access. They should work for everyone.

// The FlowYield System is how Balcore delivers this. Deposit once. Earn from two sources simultaneously. Know your principal is protected by three independent layers. Withdraw at any time. The protocol handles everything else.

// DeFi is not complicated. Balcore made sure of it.

// ## Start Earning Today

// Visit **balcore.ai** to connect your wallet and deposit into the FlowYield vault. Up to 30% APY, zero impermanent loss risk, fully automated.

// © 2025 Balcore Inc. — balcore.ai
// `,
// };
