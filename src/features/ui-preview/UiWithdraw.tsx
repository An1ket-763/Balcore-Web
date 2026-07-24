// UiWithdraw.tsx
import React, { useState, useEffect } from "react";
import "./UiWithdraw.css";

const PRIN_BTC = 0.16;
const PRIN_USDC = 12500;
const PRIN_USD = 25000;
const FEES = 1260;
const IL = 340;
const GROSS = PRIN_USD + FEES + IL; // 26,600
const FT_RATE = 0.03;

const formatUSD = (n: number) => `$${Math.round(n).toLocaleString()}`;
const formatBTC = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const formatUSDC = (n: number) => Math.round(n).toLocaleString();

interface UiWithdrawProps {
    open: boolean;
    onClose: () => void;
}

const UiWithdraw: React.FC<UiWithdrawProps> = ({ open, onClose }) => {
    const [pct, setPct] = useState(100);
    const [mode, setMode] = useState<"std" | "fast">("std");
    const [busy, setBusy] = useState(false);
    const [ctaText, setCtaText] = useState("Request withdrawal");

    // Derived values
    const fraction = pct / 100;
    const gross = GROSS * fraction;
    const fee = mode === "fast" ? gross * FT_RATE : 0;
    const net = gross - fee;
    const feesValue = FEES * fraction;
    const ilValue = IL * fraction;
    const gain = (FEES + IL) * fraction;

    const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPct(parseInt(e.target.value, 10));
    };

    const setPercent = (percent: number) => {
        setPct(percent);
    };

    const handleWithdraw = () => {
        if (busy || pct <= 0) return;
        setBusy(true);
        setCtaText("Requesting…");
        setTimeout(() => {
            setCtaText("Withdrawal requested");
            setTimeout(() => {
                setBusy(false);
                setCtaText("Request withdrawal");
                onClose(); // close after success
            }, 1900);
        }, 1000);
    };

    // Update slider background fill
    useEffect(() => {
        const slider = document.getElementById("withdrawSlider") as HTMLInputElement;
        if (slider) {
            slider.style.setProperty("--p", `${pct}%`);
        }
    }, [pct]);

    if (!open) return null;

    const sliderFill = `linear-gradient(90deg, var(--purple-l) 0%, var(--purple) ${pct}%, rgba(255,255,255,.08) ${pct}%)`;

    return (
        <div className="withdraw-overlay" onClick={onClose}>
            <div className="withdraw-modal" onClick={(e) => e.stopPropagation()}>
                <div className="mhead">
                    <div className="mtitle">
                        <div className="pair">
                            <span className="coinwrap c1"><svg className="coin" width="24" height="24"><use href="#btcSymbol" /></svg></span>
                            <span className="coinwrap c2"><svg className="coin" width="24" height="24"><use href="#usdcSymbol" /></svg></span>
                        </div>
                        <div>
                            <div className="mt-kicker"><span className="bc-logo"></span>Withdraw</div>
                            <div className="mt-name">BTC.b / USDC <span className="chev"><svg viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></div>
                            <div className="mt-sub">Your position · in vault 63 days</div>
                        </div>
                    </div>
                    <div className="close" onClick={onClose} role="button" tabIndex={0}>
                        <svg viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    </div>
                </div>

                <div className="mbody">
                    <div className="field">
                        <div className="top">
                            <span className="lbl">Withdraw</span>
                            <span className="bal">Position <b>{formatUSD(gross)}</b></span>
                        </div>
                        <div className="amt-row">
                            <div className="amt-pct"><span>{pct}</span><small>%</small></div>
                            <div className="amt-tok">
                                <span className="stack">
                                    <span className="coinwrap c1"><svg className="coin" width="19" height="19"><use href="#btcSymbol" /></svg></span>
                                    <span className="coinwrap c2"><svg className="coin" width="19" height="19"><use href="#usdcSymbol" /></svg></span>
                                </span>
                                <span>BTC.b + USDC</span>
                            </div>
                        </div>
                        <input
                            id="withdrawSlider"
                            className="slider"
                            type="range"
                            min="1"
                            max="100"
                            value={pct}
                            onChange={handleSlider}
                            step="1"
                            aria-label="Percentage of position to withdraw"
                            style={{ background: sliderFill }}
                        />
                        <div className="under">
                            <div className="qchips">
                                <button className={`qchip ${pct === 25 ? "on" : ""}`} onClick={() => setPercent(25)}>25%</button>
                                <button className={`qchip ${pct === 50 ? "on" : ""}`} onClick={() => setPercent(50)}>50%</button>
                                <button className={`qchip ${pct === 100 ? "on" : ""}`} onClick={() => setPercent(100)}>Max</button>
                            </div>
                            <div className="tokout">
                                {formatBTC(PRIN_BTC * fraction)} BTC.b · {formatUSDC(PRIN_USDC * fraction)} USDC
                            </div>
                        </div>
                    </div>

                    <div className="shield">
                        <div className="eh">
                            <span className="brand"><svg className="mark" viewBox="0 0 16 16" fill="none"><path d="M8 1.4l5.4 2.1v3.6c0 3.3-2.3 5.6-5.4 6.5-3.1-.9-5.4-3.2-5.4-6.5V3.5L8 1.4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /><path d="M5.6 8.1l1.7 1.7L10.6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>Protected by IL Shield</span>
                            <span className="auto"><span className="pip"></span>100% principal</span>
                        </div>
                        <div className="pv-top">
                            <span className="pv-dep">{formatUSD(PRIN_USD * fraction)} deposited</span>
                            <span className="pv-gain"><svg viewBox="0 0 12 12" fill="none"><path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg><span>{formatUSD(gain)}</span> <b>earned</b></span>
                        </div>
                        <div className="compbar">
                            <div className="fillX">
                                <div className="seg p" style={{ width: `${(PRIN_USD * fraction / gross) * 100}%` }}></div>
                                <div className="seg f" style={{ width: `${(feesValue / gross) * 100}%` }}></div>
                                <div className="seg i" style={{ width: `${(ilValue / gross) * 100}%` }}></div>
                            </div>
                            <span className="deptick" style={{ left: `${(PRIN_USD * fraction / gross) * 100}%` }}></span>
                            <span className="shim"></span>
                        </div>
                        <div className="leg">
                            <span className="legit p"><i></i>Principal</span>
                            <span className="legit f"><i></i>Fees earned</span>
                            <span className="legit i"><i></i>IL Shield</span>
                        </div>
                        <div className="sdiv"></div>
                        <div className="ledger">
                            <div className="li"><span className="k">Principal returned <em>in full</em></span><span className="v tnum">{formatBTC(PRIN_BTC * fraction)} BTC.b + {formatUSDC(PRIN_USDC * fraction)} USDC</span></div>
                            <div className="li"><span className="k">Fees earned</span><span className="v add tnum">{formatUSD(feesValue)}</span></div>
                            <div className="li"><span className="k">IL Shield coverage</span><span className="v add tnum">{formatUSD(ilValue)}</span></div>
                            {mode === "fast" && (
                                <div className="li ft"><span className="k">Fast-Track fee <em>3%</em></span><span className="v sub tnum">−{formatUSD(fee)}</span></div>
                            )}
                        </div>
                        <div className="totrow"><span className="tl">You receive</span><span className="tv tnum">{formatUSD(net)}</span></div>
                        <div className="scap">Paid in <b>BTC.b + USDC</b> — the same tokens you deposited. No forced conversions; impermanent loss is covered by the reserve, so your principal is never reduced.</div>
                    </div>

                    <div className="olabel">Withdrawal speed</div>
                    <div className="opts" role="radiogroup">
                        <div className={`opt ${mode === "std" ? "sel" : ""}`} onClick={() => setMode("std")}>
                            <span className="radio"></span>
                            <div className="obody">
                                <div className="otop"><span className="oname">Standard</span><span className="obadge rec">Recommended</span></div>
                                <div className="ometa">Funds arrive in ~7 days</div>
                            </div>
                            <div className="ofee free">No fee<small>full payout</small></div>
                        </div>
                        <div className={`opt ${mode === "fast" ? "sel" : ""}`} onClick={() => setMode("fast")}>
                            <span className="radio"></span>
                            <div className="obody">
                                <div className="otop"><span className="oname">Fast-Track</span><span className="obadge fast">Priority</span></div>
                                <div className="ometa">Funds arrive in 24–48 hours</div>
                            </div>
                            <div className="ofee cost">3% fee<small>≈ {formatUSD(gross * FT_RATE)}</small></div>
                        </div>
                    </div>
                    {mode === "fast" && (
                        <div className="ftnote">
                            <svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4.3v3.2M7 9.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                            <span>The 3% funds your early exit: split <b>50% to the IL Reserve</b> and <b>50% to active LPs</b> who provide the liquidity. None of it goes to BalCore.</span>
                        </div>
                    )}

                    <div className="proc">
                        <div className="ph">
                            <span className="pt"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7.5" r="5.3" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4.6V7.7l2 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>What happens next</span>
                            <span className="parr">{mode === "fast" ? "24–48h" : "~7 days"}</span>
                        </div>
                        <div className="steps">
                            <div className="step"><span className="node"></span><span>Unwind<br />position</span></div>
                            <div className="step"><span className="node"></span><span>Collect<br />fees</span></div>
                            <div className="step"><span className="node"></span><span>Apply IL<br />coverage</span></div>
                            <div className="step"><span className="node"></span><span>Return<br />tokens</span></div>
                        </div>
                    </div>

                    <button className="cta" onClick={handleWithdraw} disabled={busy || pct <= 0}>
                        <span className="label">{ctaText}</span>
                    </button>
                    <div className="foot"><span className="dot"></span>IL Shield active · principal returned in full</div>
                </div>
            </div>
        </div>
    );
};

export default UiWithdraw;