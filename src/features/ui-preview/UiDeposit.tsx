// UiDeposit.tsx
import React, { useState, useEffect, useRef } from "react";
import "./UiDeposit.css";

const BTC_PRICE = 78125; // $ per BTC.b
const BTC_BAL = 0.34;
const USDC_BAL = 14200;
const APY_CAP = 0.30;
const APY_LO = 0.20;

const formatNumber = (n: number, decimals = 2) => {
    return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
};

const formatUSD = (n: number) => `$${Math.round(n).toLocaleString()}`;
const formatBTC = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const formatUSDC = (n: number) => Math.round(n).toLocaleString();

interface UiDepositProps {
    open: boolean;
    onClose: () => void;
}

const UiDeposit: React.FC<UiDepositProps> = ({ open, onClose }) => {
    const [btcAmount, setBtcAmount] = useState("0.16");
    const [usdcAmount, setUsdcAmount] = useState("12500");
    const [totalValue, setTotalValue] = useState(25000);
    const [weeklyEstimate, setWeeklyEstimate] = useState("≈ $96–$144");
    const [ctaDisabled, setCtaDisabled] = useState(false);
    const [ctaText, setCtaText] = useState("Confirm deposit");
    const [isProcessing, setIsProcessing] = useState(false);
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, percent: 60 });
    const [cutoffLabel, setCutoffLabel] = useState("Mon · 23:00 UTC");

    const btcInputRef = useRef<HTMLInputElement>(null);
    const usdcInputRef = useRef<HTMLInputElement>(null);

    // Helper: parse number from string
    const parseNum = (val: string) => {
        const n = parseFloat(val.replace(/,/g, ""));
        return isFinite(n) && n >= 0 ? n : 0;
    };

    // Update totals and weekly estimate
    const updateSummary = (btcNum: number, usdcNum: number) => {
        const usdFromBtc = btcNum * BTC_PRICE;
        const usdFromUsdc = usdcNum;
        const total = usdFromBtc + usdFromUsdc;
        setTotalValue(total);
        const weeklyLow = total * APY_LO / 52;
        const weeklyHigh = total * APY_CAP / 52;
        setWeeklyEstimate(`≈ ${formatUSD(weeklyLow)}–${formatUSD(weeklyHigh)}`);
        return total;
    };

    // Validate balances and set CTA state
    const validateAndSetCta = (btcNum: number, usdcNum: number) => {
        let disabled = false;
        let text = "Confirm deposit";
        if (btcNum <= 0 || usdcNum <= 0) {
            text = "Enter an amount";
            disabled = true;
        } else if (btcNum > BTC_BAL + 1e-9) {
            text = "Insufficient BTC.b";
            disabled = true;
        } else if (usdcNum > USDC_BAL + 1e-9) {
            text = "Insufficient USDC";
            disabled = true;
        }
        setCtaDisabled(disabled);
        setCtaText(text);
    };

    // Sync from BTC to USDC
    const syncFromBTC = (btcVal: string, reformat = true) => {
        const btcNum = parseNum(btcVal);
        const usdValue = btcNum * BTC_PRICE;
        const usdcNum = usdValue;
        if (reformat) {
            setBtcAmount(formatBTC(btcNum));
        }
        setUsdcAmount(formatUSDC(usdcNum));
        updateSummary(btcNum, usdcNum);
        validateAndSetCta(btcNum, usdcNum);
    };

    // Sync from USDC to BTC
    const syncFromUSDC = (usdcVal: string, reformat = true) => {
        const usdcNum = parseNum(usdcVal);
        const btcNum = usdcNum / BTC_PRICE;
        if (reformat) {
            setUsdcAmount(formatUSDC(usdcNum));
        }
        setBtcAmount(formatBTC(btcNum));
        updateSummary(btcNum, usdcNum);
        validateAndSetCta(btcNum, usdcNum);
    };

    // Handle BTC input change
    const onBtcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^\d.,]/g, "");
        setBtcAmount(val);
        syncFromBTC(val, false);
    };

    const onBtcBlur = () => {
        const btcNum = parseNum(btcAmount);
        setBtcAmount(formatBTC(btcNum));
        syncFromBTC(btcAmount, true);
    };

    // Handle USDC input change
    const onUsdcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^\d.,]/g, "");
        setUsdcAmount(val);
        syncFromUSDC(val, false);
    };

    const onUsdcBlur = () => {
        const usdcNum = parseNum(usdcAmount);
        setUsdcAmount(formatUSDC(usdcNum));
        syncFromUSDC(usdcAmount, true);
    };

    // Max button
    const handleMax = () => {
        const maxUsdPerSide = Math.min(BTC_BAL * BTC_PRICE, USDC_BAL);
        const btcMax = maxUsdPerSide / BTC_PRICE;
        const btcRounded = Math.floor(btcMax * 1e4) / 1e4;
        const usdValue = btcRounded * BTC_PRICE;
        setBtcAmount(formatBTC(btcRounded));
        setUsdcAmount(formatUSDC(usdValue));
        updateSummary(btcRounded, usdValue);
        validateAndSetCta(btcRounded, usdValue);
    };

    // Countdown timer for deployment window
    useEffect(() => {
        if (!open) return;
        const getNextCutoff = (now: Date) => {
            const d = new Date(now);
            const day = d.getUTCDay();
            let daysToAdd = (1 - day + 7) % 7; // Monday
            const cutoff = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 0, 0, 0));
            cutoff.setUTCDate(cutoff.getUTCDate() + daysToAdd);
            if (cutoff.getTime() <= now.getTime()) {
                cutoff.setUTCDate(cutoff.getUTCDate() + 7);
            }
            return cutoff;
        };

        const updateCountdown = () => {
            const now = new Date();
            const cutoff = getNextCutoff(now);
            const ms = cutoff.getTime() - now.getTime();
            const totalSecs = Math.floor(ms / 1000);
            const days = Math.floor(totalSecs / 86400);
            const hours = Math.floor((totalSecs % 86400) / 3600);
            const minutes = Math.floor((totalSecs % 3600) / 60);
            const seconds = totalSecs % 60;
            const weekMs = 7 * 24 * 3600 * 1000;
            let percent = (ms / weekMs) * 100;
            if (percent > 100) percent = 100;
            if (percent < 0) percent = 0;
            setCountdown({ days, hours, minutes, seconds, percent });
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            setCutoffLabel(`Mon ${cutoff.getUTCDate()} ${monthNames[cutoff.getUTCMonth()]} · 23:00 UTC`);
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [open]);

    // CTA button click
    const handleConfirm = () => {
        if (isProcessing || ctaDisabled) return;
        setIsProcessing(true);
        setCtaText("Confirming…");
        setTimeout(() => {
            setCtaText("Deposit confirmed");
            // Simulate success state (you can replace with real transaction logic)
            setTimeout(() => {
                setIsProcessing(false);
                setCtaText("Confirm deposit");
                onClose(); // close modal after success
            }, 1700);
        }, 1000);
    };

    if (!open) return null;

    return (
        <div className="deposit-overlay" onClick={onClose}>
            <div className="deposit-modal" onClick={(e) => e.stopPropagation()}>
                <div className="mhead">
                    <div className="mtitle">
                        <div className="pair">
                            <span className="coinwrap c1"><svg className="coin" width="24" height="24"><use href="#btcSymbol" /></svg></span>
                            <span className="coinwrap c2"><svg className="coin" width="24" height="24"><use href="#usdcSymbol" /></svg></span>
                        </div>
                        <div>
                            <div className="mt-kicker"><span className="bc-logo"></span>Deposit</div>
                            <div className="mt-name">BTC.b / USDC <span className="chev"><svg viewBox="0 0 12 8" fill="none"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span></div>
                            <div className="mt-sub">Provide liquidity · up to 30% APY</div>
                        </div>
                    </div>
                    <div className="close" onClick={onClose} role="button" tabIndex={0}>
                        <svg viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    </div>
                </div>

                <div className="mbody">
                    <div className="field">
                        <div className="top"><span className="lbl">You deposit</span>
                            <span className="bal">Balance <span className="tnum">{formatBTC(BTC_BAL)}</span> BTC.b<button className="max-btn" onClick={handleMax}>Max</button></span></div>
                        <div className="row">
                            <input className="amt tnum" ref={btcInputRef} value={btcAmount} onChange={onBtcChange} onBlur={onBtcBlur} inputMode="decimal" />
                            <div className="token"><span className="coinwrap"><svg className="coin" width="19" height="19"><use href="#btcSymbol" /></svg></span><span>BTC.b</span></div>
                        </div>
                        <div className="usd tnum">≈ {formatUSD(parseNum(btcAmount) * BTC_PRICE)}</div>
                    </div>

                    <div className="bridge" id="bridge">
                        <span className="line"></span>
                        <span className="eq">
                            <svg viewBox="0 0 16 16" fill="none"><path d="M6 6.5l-1 1a2.1 2.1 0 003 3l1-1M10 9.5l1-1a2.1 2.1 0 00-3-3l-1 1M6.6 9.4l2.8-2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>Equal value
                            <span className="tol"><svg viewBox="0 0 14 14" fill="none"><path d="M3 7.5l2.6 2.6L11 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>±1%</span>
                        </span>
                        <span className="line"></span>
                    </div>

                    <div className="field">
                        <div className="top"><span className="lbl">You deposit</span>
                            <span className="bal">Balance <span className="tnum">{formatUSDC(USDC_BAL)}</span> USDC<button className="max-btn" onClick={handleMax}>Max</button></span></div>
                        <div className="row">
                            <input className="amt tnum" ref={usdcInputRef} value={usdcAmount} onChange={onUsdcChange} onBlur={onUsdcBlur} inputMode="decimal" />
                            <div className="token"><span className="coinwrap"><svg className="coin" width="19" height="19"><use href="#usdcSymbol" /></svg></span><span>USDC</span></div>
                        </div>
                        <div className="usd tnum">≈ {formatUSD(parseNum(usdcAmount))}</div>
                    </div>

                    <div className="engine">
                        <div className="eh">
                            <span className="brand"><span className="bc-logo"></span>Precision by BalCore</span>
                            <span className="auto"><span className="pip"></span>Automatic</span>
                        </div>
                        <svg className="curve" viewBox="0 0 400 102" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="liqFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0" stopColor="#cbb9ff" stopOpacity="0.7" />
                                    <stop offset="0.55" stopColor="#8b5cf6" stopOpacity="0.32" />
                                    <stop offset="1" stopColor="#7c3aed" stopOpacity="0.06" />
                                </linearGradient>
                            </defs>
                            <line x1="118" y1="80" x2="282" y2="80" stroke="rgba(255,255,255,.08)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                            <g className="fillGrow">
                                <path fill="url(#liqFill)" d="M126 80 C133 80 135 24 143 24 L257 24 C265 24 267 80 274 80 Z" />
                                <path fill="none" stroke="#cbb9ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" d="M126.5 79.5 C133 79 135 24 143 24 L257 24 C265 24 267 79 273.5 79.5" />
                            </g>
                            <g className="curveMark">
                                <line x1="200" y1="6" x2="200" y2="82" stroke="#6ff3cd" strokeWidth="1.4" vectorEffect="non-scaling-stroke" opacity="0.9" />
                                <circle cx="200" cy="13" r="6" fill="#6ff3cd" opacity="0.16" />
                                <circle className="peakDot" cx="200" cy="13" r="4" fill="#6ff3cd" style={{ filter: "drop-shadow(0 0 5px #4fcaa3)" }} />
                                <text className="axis" x="200" y="96" textAnchor="middle" fill="#6ff3cd">live price $78,125</text>
                            </g>
                        </svg>
                        <div className="chips">
                            <span className="chip"><i></i>Precision-placed</span>
                            <span className="chip"><i></i>Rebalanced</span>
                            <span className="chip t"><i></i>IL-protected</span>
                        </div>
                    </div>

                    <div className="divider"></div>
                    <div className="info">
                        <div className="li"><span className="k">Total value</span><span className="v tnum">{formatUSD(totalValue)}</span></div>
                        <div className="li"><span className="k">Your APY</span><span className="v p tnum">up to 30.0% · capped</span></div>
                        <div className="li"><span className="k">Est. weekly earnings</span><span className="v t tnum">{weeklyEstimate}</span></div>
                    </div>

                    <div className="deploy">
                        <div className="dh">
                            <span className="dt"><svg viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7.5" r="5.3" stroke="currentColor" strokeWidth="1.2" /><path d="M7 4.6V7.7l2 1.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>Liquidity deployment</span>
                            <span className="cd" id="cd">
                                {countdown.days > 0 && `${countdown.days}d `}
                                {countdown.hours > 0 && `${countdown.hours}h `}
                                {countdown.minutes}m {countdown.seconds}s
                            </span>
                        </div>
                        <div className="dbar"><span className="dfill" style={{ width: `${countdown.percent}%` }}></span></div>
                        <div className="dcap">Deposit before <b>{cutoffLabel}</b> to join this cycle. Otherwise <b>reserve yield starts instantly</b> and your liquidity joins the next batch.</div>
                    </div>

                    <button className="cta" onClick={handleConfirm} disabled={ctaDisabled || isProcessing}>
                        <span className="label">{ctaText}</span>
                    </button>
                    <div className="foot"><span className="dot"></span>Engine live · positions rebalanced automatically</div>
                </div>
            </div>
        </div>
    );
};

export default UiDeposit;