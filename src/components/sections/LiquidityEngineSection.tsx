// src/components/WhatWeDoSection.tsx

import React from "react";
import {
  ArrowRight,
  Activity,
  Shield,
  Clock3,
  DollarSign,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: <Activity size={18} />,
    title: "Continuous Rebalancing",
    desc: "24/7 automated repositioning using CVD, RSI, VWAP and pivot point signals to stay within optimal LP ranges.",
  },
  {
    icon: <Shield size={18} />,
    title: "IL Shield 3X",
    desc: "Three independent protection layers ensure impermanent loss never erodes your initial principal, regardless of market conditions.",
  },
  {
    icon: <Clock3 size={18} />,
    title: "Smart Borrowing",
    desc: "When reserves are depleted, BalCore identifies market strength via on-chain signals and borrows intelligently to maintain yield continuity",
  },
  {
    icon: <DollarSign size={18} />,
    title: "Principal Always Returned",
    desc: "On exit, your initial deposit is always returned in full. Yield is separate. Capital protection is non-negotiable.",
  },
  {
    icon: <CalendarDays size={18} />,
    title: "Monday Range Theory",
    desc: "BalCore uses Monday's established high/low range as a weekly directional anchor  identifying breakout vs. reversal probability to time rebalancing and entry windows with statistical precision.  ",
  },
];

const WhatWeDoSection = () => {
  return (
    <section
      id="liquidity"
      className="relative border-b border-purple-500/10 px-6 pt-8 pb-24 lg:px-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">
        {/* LEFT */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
              At the heart of DeFi
            </span>
          </div>

          <h2 className="mb-8 font-condensed text-5xl font-black uppercase leading-none text-white md:text-6xl">
            The Liquidity Engine
          </h2>

          <div className="space-y-5 text-[15px] leading-[1.9] text-white/60">
            <p>
              Our global on-chain presence allows us to manage liquidity
              continuously across Avalanche's concentrated AMM pools, dynamic
              rebalancing anchored to key price levels with precision
              unavailable to passive LPs.
            </p>

            <p>
              BalCore became known for its expertise in concentrated liquidity
              management, but our protocol has grown significantly. Today we are
              active across{" "}
              <a
                href="#protocol"
                className="group inline-flex items-center gap-2 text-[15px] font-bold tracking-[0.1em] text-[#9f5fff] transition-all hover:gap-4"
              >
                multiple DeFi primitives
              </a>{" "}
              from AMM pools and lending markets to synthetic assets and
              cross-chain yield.
            </p>

            <p>
              Whether it's a bull run or a volatile drawdown, the Balcore engine
              continuously repositions to keep your capital working at peak
              efficiency.
            </p>
          </div>

          <button className="group mt-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-purple-400 transition-all hover:gap-5">
            <a href="#what-we-do">Explore liquidity mechanics</a>
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <ul className="space-y-6">
            {features.map((item, index) => (
              <li
                key={index}
                className="flex gap-5 border-b border-purple-500/10 pb-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-400">
                  {item.icon}
                </div>

                <div>
                  <h4 className="mb-2 text-[15px] font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="text-[13.5px] leading-[1.8] text-white/55">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
