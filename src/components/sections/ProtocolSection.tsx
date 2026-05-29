// src/components/ProtocolSection.tsx

import React from "react";
import { ArrowRight } from "lucide-react";

const protocolCards = [
  {
    num: "01",
    title: "Flow Yield Vault",
    desc: "The core vault manages deposits, distributes yield, and enforces principal protection at the smart contract level.",
  },
  {
    num: "02",
    title: "IL Shield Module",
    desc: "Three redundant on-chain mechanisms intercept impermanent loss before it impacts user balances.",
  },
  {
    num: "03",
    title: "Reserve Engine",
    desc: "Dynamically allocates reserve capital to lending protocols (Benqi) when LP ranges go out of bounds.",
  },
  {
    num: "04",
    title: "Signal Oracle",
    desc: "On-chain aggregation of CVD, OI, RSI, VWAP, pivot point analysis and Monday Range Theory feeds the rebalancing decision engine in real time.",
  },
];

const ProtocolSection = () => {
  return (
    <section
      id="protocol"
      className="relative border-b border-purple-500/10 px-5 py-12 md:py-14 lg:px-14 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {protocolCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-purple-500/10 bg-[#11101a] p-5 md:p-6 lg:p-7 transition-all hover:border-purple-500/30"
              >
                <div className="mb-4 font-condensed text-6xl font-black leading-none text-purple-500/20">
                  {card.num}
                </div>

                <h3 className="mb-3 text-[15px] font-semibold text-white">
                  {card.title}
                </h3>

                <p className="text-[13px] leading-[1.8] text-white/55">
                  {card.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="order-1 lg:order-2">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
              The Protocol
            </span>
          </div>

          <h2 className="mb-6 font-condensed text-5xl font-black uppercase leading-none text-white md:mb-8 md:text-6xl">
            Built on Avalanche.
            <br />
            Built to Last.
          </h2>

          <div className="space-y-4 text-[15px] leading-[1.75] text-white/60 md:space-y-5 md:leading-[1.9]">
            <p>
              Technology is central to everything we do. Years of building
              automated market-making systems on Avalanche has given BalCore
              deep expertise in low-latency execution and subnet architecture,
              sub-second finality, and low-cost execution.
            </p>

            <p>
              We build almost all of our smart contract infrastructure in-house,
              including our critical rebalancing, reserve, and IL-shield
              systems. Human judgment and on-chain automation work togetherour
              models provide signals, the protocol executes with precision.
            </p>
          </div>

          <button className="group mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-purple-400 transition-all hover:gap-5 md:mt-10">
            Read technical docs
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProtocolSection;
