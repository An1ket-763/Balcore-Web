import { DocSection } from "./types";

export const lpMarketMakerSection: DocSection = {
    id: "lp-market-maker",
    title: "Liquidity Providers as Market Makers",
    shortTitle: "LP & Market Making",
    content: `
# Liquidity Providers as Market Makers: DEX vs. CEX

Market making is one of the most important and historically profitable roles in all of finance. Today, thanks to decentralized exchanges and AMM protocols, any person with a crypto wallet can do exactly what institutions do — and earn the same type of revenue.

## 1. What Is Market Making?

A market maker is any participant who simultaneously stands ready to buy and sell an asset — providing two-sided liquidity. Market makers profit from the **spread** — the gap between the bid and ask price.

> **The Traditional Barrier:** In traditional finance, becoming a market maker required exchange membership, regulatory licensing, millions in capital, co-location servers, and teams of quant engineers. A small number of firms (Citadel Securities, Virtu Financial, Jane Street) captured most of the spread revenue.

## 2. Market Making on a CEX

### How the Order Book Works

A CEX operates an order book — continuously updated buy and sell orders. Professional market makers post both bid and ask orders continuously.

**Revenue Streams:**
1. **Bid-Ask Spread** — primary income from round-trip trades
2. **Maker Rebates** — exchanges pay market makers for posting orders
3. **Inventory Management** — P&L from held positions
4. **Information Advantage** — using real-time data to optimize spreads

### CEX Full Cost Structure

- Capital lockup on exchange (opportunity cost)
- Counterparty risk (exchange insolvency)
- Technical infrastructure ($100K+/year)
- Regulatory licensing
- Adverse selection by HFT firms
- Spread compression from competition

## 3. Market Making on a DEX (AMM)

In an AMM, a smart contract holds reserves of two tokens and uses a formula to determine prices automatically. When you provide concentrated liquidity between $38 and $42 on AVAX/USDC, you are doing exactly what a professional market maker does.

### AMM Revenue Model

1. **Trading Fees** — earned automatically on every swap through your range
2. **Reserve Yield** — 90% in Benqi earning passive yield (BalCore model)
3. **Emission Incentives** — Ve(3,3) DEXes pay weekly emissions to LPs
4. **Bribe Participation** — veToken holders earn additional income from protocol bribes

## 4. LP Flexibility Comparison

### Entry Requirements

| Requirement | CEX Market Maker | AMM LP |
|------------|-----------------|--------|
| Minimum capital | $500,000–$10M+ | Any amount — $100 works |
| Regulatory license | Often required | None — permissionless |
| Technical setup | Co-location, APIs, OMS | A crypto wallet |
| Approval process | Months of KYC | Connect wallet — seconds |
| Geographic restrictions | Yes | None — global 24/7 |

### Revenue Model Comparison

| Revenue Source | CEX Market Maker | AMM LP (with BalCore) |
|---------------|-----------------|---------------------|
| Spread / trading fees | Yes — requires active infrastructure | Yes — earned automatically |
| Passive yield on reserves | No — idle capital earns nothing | Yes — reserve layer in lending |
| Emission incentives | No | Yes — Ve(3,3) weekly emissions |
| Governance / bribe income | No | Yes — veToken holder benefits |

## Real-World Revenue Examples

### CEX Market Maker (AVAX/USDT)
- Deployed capital: $5,000,000
- Average daily volume: $2,000,000
- Daily gross spread revenue: $1,000
- Net annual P&L: ~$310,000 (6.2%)

### AMM LP with BalCore (AVAX/USDC)
- Deposited capital: $50,000
- Active LP (10%): $5,000 in concentrated liquidity
- Reserve (90%): $45,000 earning ~5% APY
- Estimated annual yield: $4,990–$9,735 (10%–19.5% APY)
- Impermanent loss: Covered by IL Reserve Fund

## The Democratization of Market Making

For the first time in financial history, the market-making function — and its associated revenue streams — is accessible to anyone. The AMM model has fundamentally rewritten who can participate in this role and on what terms.
    `,
  };
