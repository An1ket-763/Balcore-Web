// src/components/TechnologySection.tsx

import React from "react";
import { ArrowRight } from "lucide-react";

const signals = [
  {
    name: "CVD (Cumulative Volume Delta)",
    value: "+2,840",
    color: "text-green-400",
  },
  {
    name: "RSI (14)",
    value: "58.3",
    color: "text-green-400",
  },
  {
    name: "VWAP Deviation",
    value: "+0.12%",
    color: "text-green-400",
  },
  {
    name: "Open Interest",
    value: "+4.2%",
    color: "text-purple-400",
  },
  {
    name: "Pivot Support (S1)",
    value: "20,280",
    color: "text-orange-400",
  },
  {
    name: "Monday Range Theory",
    value: "In Range",
    color: "text-cyan-400",
  },
];

const TechnologySection = () => {
  return (
    <section
      id="technology"
      className="relative border-b border-purple-500/10 px-5 py-12 md:py-14 lg:px-14 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:gap-20">
        {/* LEFT */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
              Research & Automation
            </span>
          </div>

          <h2 className="mb-6 font-condensed text-4xl font-black uppercase leading-none text-white md:mb-8 md:text-4xl">
            Drawing on Machine
            <br />
            Learning to Advance Yield
            <br />
            Research.
          </h2>

          <div className="space-y-4 text-[15px] leading-[1.75] text-white/60 md:space-y-5 md:leading-[1.9]">
            <p>
              DeFi serves as a unique, rapid-feedback platform for ML
              experimentation every block is a new data point, every trade a
              signal. BalCore leverages this to continuously improve its models.
            </p>

            <p>
              Machine learning has been part of BalCore's research from the
              beginning. We analyse on-chain datasets order flow, liquidity
              depth, volatility surfaces using a range of modelling techniques.
              Our researchers and engineers build models that price risk,
              predict rebalancing windows, and optimise capital allocation
              across yield strategies.
            </p>

            <p>
              A key structural signal in our stack is{" "}
              <strong style={{ color: "#f1eeff" }}>Monday Range Theory</strong>{" "}
              the weekly high/low established on Monday acts as a directional
              compass for the entire week. BalCore's engine uses this range to
              determine whether price action is in a breakout or mean-reversion
              regime, sharpening every rebalancing decision that follows.
            </p>
          </div>

          <button className="group mt-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-purple-400 transition-all hover:gap-5 md:mt-10">
            Join the research team
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* RIGHT */}
        <div>
          <div className="rounded-3xl border border-purple-500/10 bg-gradient-to-br from-purple-500/10 to-[#0a0913] p-5 md:p-6 lg:p-8">
            <div className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400">
              Live Signal Stack
            </div>

            <div className="space-y-4">
              {signals.map((signal, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-purple-500/10 pb-3"
                >
                  <span className="text-xs text-white/55">{signal.name}</span>

                  <span
                    className={`font-condensed text-lg font-bold tracking-wide ${signal.color}`}
                  >
                    {signal.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-purple-500/10 pt-5">
              <div className="text-[11px] uppercase tracking-[0.15em] text-white/45">
                Protocol Status
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#22c55e]" />
                <span className="text-sm font-semibold text-white">
                  All systems operational
                </span>
              </div>

              <div className="mt-1 text-xs text-white/45">
                Last rebalance: 2 blocks ago
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* GROWING EVERY YEAR */}
      <div className="mx-auto mt-14 max-w-[720px] text-center md:mt-16 lg:mt-28">
        <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9f5fff]">
          Growing Every Year
        </div>

        <h2 className="font-barlow-condensed text-[clamp(36px,5vw,64px)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
          Built for Everyone Who Deserves Better Yield.
        </h2>

        <p className="mx-auto mt-6 max-w-[1180px] font-barlow text-[16px] leading-[1.9] text-white/45">
          BalCore has grown in users, capital, and protocol depth every quarter.
          We continue to navigate volatile markets by solving the problems
          others avoid staying persistent, rigorous, and innovative.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
          <button className="flex items-center gap-2 rounded-md bg-[#7c3aed] px-8 py-3 text-[14px] font-medium text-white transition-all hover:bg-[#9f5fff]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Get Started
          </button>

          <button className="flex items-center border-[0.5px] border-white/10 gap-2 rounded-md px-8 py-3 text-[14px] font-medium text-white transition-all hover:border hover:border-white/30">
            Read the Docs
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
