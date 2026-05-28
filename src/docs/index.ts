import { DocSection } from "./types";
import { protocolOverviewSection } from "./protocol-overview";
import { defi101Section } from "./defi-101";
import { blockchainFundamentalsSection } from "./blockchain-fundamentals";
import { ammDeepDiveSection } from "./amm-deep-dive";
import { dexFutureSection } from "./dex-future";
import { dexModelsSection } from "./dex-models";
import { lpMarketMakerSection } from "./lp-market-maker";
import { tokenizationSection } from "./tokenization";

export const docsContent: DocSection[] = [
  protocolOverviewSection,
  defi101Section,
  blockchainFundamentalsSection,
  ammDeepDiveSection,
  dexFutureSection,
  dexModelsSection,
  lpMarketMakerSection,
  tokenizationSection,
  {
    id: "whitepaper",
    shortTitle: "Whitepaper",
    content: "",
    title: ""
  },
];

export type { DocSection };
