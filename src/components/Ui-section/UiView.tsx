import React, { useState } from "react";
import { Rocket } from "lucide-react";
import CsModal from "@/components/ui/CsModal";
import UiDeposit from "./UiDeposit";
import UiWithdraw from "./UiWithdraw";
import "./UiView.css";

// SVG symbols for coins used in modals
const CoinSymbols = () => (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
            <radialGradient id="btcBase" cx="34%" cy="28%" r="85%">
                <stop offset="0" stopColor="#fdbb5f" />
                <stop offset="52%" stopColor="#f7931a" />
                <stop offset="100%" stopColor="#df7c04" />
            </radialGradient>
            <radialGradient id="usdcBase" cx="34%" cy="28%" r="85%">
                <stop offset="0" stopColor="#5a9fe6" />
                <stop offset="52%" stopColor="#2775ca" />
                <stop offset="100%" stopColor="#195ba3" />
            </radialGradient>
            <linearGradient id="coinGloss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".5" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <symbol id="btcSymbol" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="url(#btcBase)" />
                <ellipse cx="16" cy="9.5" rx="12.5" ry="7.5" fill="url(#coinGloss)" />
                <circle cx="16" cy="16" r="15.3" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth=".7" />
                <path fill="#fff" d="M21.6 14c.3-1.9-1.2-2.9-3.2-3.6l.6-2.5-1.5-.4-.6 2.5c-.4-.1-.8-.2-1.2-.3l.6-2.5-1.5-.4-.7 2.5c-.3-.1-.7-.2-1-.2l-2.1-.5-.4 1.6s1.1.3 1.1.3c.6.2.7.6.7 1l-1.7 6.7c-.1.2-.3.4-.6.3 0 0-1.1-.3-1.1-.3l-.8 1.8 2 .5c.4.1.7.2 1.1.3l-.6 2.5 1.5.4.6-2.5c.4.1.8.2 1.2.3l-.6 2.5 1.5.4.6-2.5c2.6.5 4.6.3 5.4-2.1.7-1.9 0-3-1.4-3.7 1-.2 1.8-.9 2-2.4zm-3.6 4.9c-.5 1.9-3.6.9-4.6.6l.8-3.3c1 .3 4.3.8 3.8 2.7zm.5-5c-.4 1.8-3 .8-3.9.6l.7-3c.9.3 3.7.7 3.2 2.4z" />
            </symbol>
            <symbol id="usdcSymbol" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="url(#usdcBase)" />
                <ellipse cx="16" cy="9.5" rx="12.5" ry="7.5" fill="url(#coinGloss)" />
                <circle cx="16" cy="16" r="15.3" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth=".7" />
                <g fill="#fff">
                    <path d="M20.022 18.124c0-2.124-1.28-2.852-3.84-3.156-1.828-.243-2.193-.728-2.193-1.578 0-.85.61-1.396 1.828-1.396 1.097 0 1.707.364 2.011 1.275a.458.458 0 00.427.303h.975a.416.416 0 00.427-.425v-.06a3.04 3.04 0 00-2.743-2.489V9.142c0-.243-.183-.425-.487-.486h-.915c-.243 0-.426.182-.487.486v1.396c-1.829.242-2.986 1.456-2.986 2.974 0 2.002 1.218 2.791 3.778 3.095 1.707.303 2.255.668 2.255 1.639 0 .97-.853 1.638-2.011 1.638-1.585 0-2.133-.667-2.316-1.578-.06-.242-.244-.364-.427-.364h-1.036a.416.416 0 00-.426.425v.06c.243 1.518 1.219 2.61 3.23 2.914v1.457c0 .242.183.425.487.485h.915c.243 0 .426-.182.487-.485V21.34c1.829-.303 3.047-1.578 3.047-3.217z" />
                    <path d="M12.892 24.497c-4.754-1.7-7.192-6.98-5.424-11.653.914-2.55 2.925-4.491 5.424-5.402.244-.121.365-.303.365-.607v-.85c0-.242-.121-.424-.365-.485-.061 0-.183 0-.244.06a10.895 10.895 0 00-7.13 13.717c1.096 3.4 3.717 6.01 7.13 7.102.244.121.488 0 .548-.243.061-.06.061-.122.061-.243v-.85c0-.182-.182-.424-.365-.546zm6.46-18.936c-.244-.122-.488 0-.548.242-.061.061-.061.122-.061.243v.85c0 .243.182.485.365.607 4.754 1.7 7.192 6.98 5.424 11.653-.914 2.55-2.925 4.491-5.424 5.402-.244.121-.365.303-.365.607v.85c0 .242.121.424.365.485.061 0 .183 0 .244-.06a10.895 10.895 0 007.13-13.717c-1.096-3.46-3.778-6.07-7.13-7.162z" />
                </g>
            </symbol>
        </defs>
    </svg>
);

const UiView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDepositOpen, setIsDepositOpen] = useState(false);
    const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

    return (
        <>
            <CoinSymbols />
            <div className="ui-view-wrapper" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="shell">
                    <div className="full-container-box">
                        <div className="top">
                            <div className="brand">
                                <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
                                    <circle cx="16" cy="16" r="14" fill="url(#brandGrad)" stroke="#a88cfa" strokeWidth="0.8" />
                                    <defs>
                                        <linearGradient id="brandGrad" x1="0" y1="0" x2="32" y2="32">
                                            <stop offset="0%" stopColor="#7c3aed" />
                                            <stop offset="100%" stopColor="#a88cfa" />
                                        </linearGradient>
                                    </defs>
                                    <text x="16" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff" fontFamily="'Archivo', sans-serif">B</text>
                                </svg>
                                <span>BALCORE</span>
                            </div>
                            <div className="search">
                                <span style={{ fontSize: "16px" }}>🔍</span>
                                <span style={{ flex: 1 }}>Search assets &amp; pools</span>
                                <span className="key">⌘</span>
                                <span className="key">K</span>
                            </div>
                            <div className="topright">
                                <span className="pill">⟳ Swap</span>
                                <span className="pill ghost">
                                    <span className="dot"></span>
                                    0xdea...db3
                                </span>
                            </div>
                        </div>
                        <div className="main">
                            <div className="side">
                                <div className="nav on">
                                    <span className="ic">☷</span>Dashboard
                                </div>
                                <div className="nav">
                                    <span className="ic">⏣</span>Activity
                                </div>
                                <div className="sec">EXPLORE</div>
                                <div className="nav" onClick={() => setIsDepositOpen(true)} style={{ cursor: "pointer" }}>
                                    <span className="ic">↑</span>Deposit
                                </div>
                                <div className="nav">
                                    <span className="ic">⬦</span>Pools
                                </div>
                                <div className="nav" onClick={() => setIsWithdrawOpen(true)} style={{ cursor: "pointer" }}>
                                    <span className="ic">↓</span>Withdraw
                                </div>
                                <div className="sec">PROTOCOL</div>
                                <div className="nav">
                                    <span className="ic">⚲</span>Insights
                                </div>
                                <div className="nav">
                                    <span className="ic">🛡️</span>IL Shield
                                </div>
                                <div className="nav">
                                    <span className="ic">⚙</span>Protocol
                                </div>
                            </div>
                            <div className="content">
                                <div className="content-bg-box">
                                    <div className="h1">Dashboard</div>
                                    <div className="sub">Your liquidity at work across Balcore&apos;s market-making pools.</div>
                                    <div className="hero">
                                        <div className="heroL">
                                            <div className="lbl">PORTFOLIO VALUE</div>
                                            <div className="big">$45,759</div>
                                            <div className="row2">
                                                <div>
                                                    <div className="k">NET APY</div>
                                                    <div className="vv p">28.5% · capped</div>
                                                </div>
                                                <div>
                                                    <div className="k">EARNED ALL-TIME</div>
                                                    <div className="vv t">+$1,084</div>
                                                </div>
                                                <div>
                                                    <div className="k">EARNED · 7D</div>
                                                    <div className="vv t">+$249</div>
                                                </div>
                                            </div>
                                            <div className="chartwrap">
                                                <div className="tfrow">
                                                    <span className="tf">1D</span>
                                                    <span className="tf">1W</span>
                                                    <span className="tf on">1M</span>
                                                    <span className="tf">ALL</span>
                                                </div>
                                                <svg width="100%" height="60" viewBox="0 0 560 150" preserveAspectRatio="none">
                                                    <defs>
                                                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
                                                            <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                    <polygon points="0,150 0,124 72,118 144,119 216,97 288,62 360,66 432,49 504,44 560,31 560,150" fill="url(#chartGrad)" />
                                                    <polyline points="0,124 72,118 144,119 216,97 288,62 360,66 432,49 504,44 560,31" fill="none" stroke="#a88cfa" strokeWidth="2" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="heroR">
                                            <div className="scard">
                                                <div className="cap">☷ ACTIVE POSITIONS</div>
                                                <div className="val">3 pools</div>
                                                <div className="d">BTC/USDC · TSLA/USDC · GOLD/USDT</div>
                                            </div>
                                            <div className="scard acc">
                                                <div className="cap">🛡️ RESERVE BACKING</div>
                                                <div className="val">$1.84M</div>
                                                <div className="d">Protocol-wide IL Shield</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sectitle">Your positions</div>
                                    <div className="posrow active">
                                        <div className="pl">
                                            <div className="pair">
                                                <svg className="coin c1" width="30" height="30" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#f7931a" />
                                                    <path d="M21.6 14c.3-1.9-1.2-2.9-3.2-3.6l.6-2.5-1.5-.4-.6 2.5c-.4-.1-.8-.2-1.2-.3l.6-2.5-1.5-.4-.7 2.5c-.3-.1-.7-.2-1-.2l-2.1-.5-.4 1.6s1.1.3 1.1.3c.6.2.7.6.7 1l-1.7 6.7c-.1.2-.3.4-.6.3 0 0-1.1-.3-1.1-.3l-.8 1.8 2 .5c.4.1.7.2 1.1.3l-.6 2.5 1.5.4.6-2.5c.4.1.8.2 1.2.3l-.6 2.5 1.5.4.6-2.5c2.6.5 4.6.3 5.4-2.1.7-1.9 0-3-1.4-3.7 1-.2 1.8-.9 2-2.4zm-3.6 4.9c-.5 1.9-3.6.9-4.6.6l.8-3.3c1 .3 4.3.8 3.8 2.7zm.5-5c-.4 1.8-3 .8-3.9.6l.7-3c.9.3 3.7.7 3.2 2.4z" fill="#fff" />
                                                </svg>
                                                <svg className="coin c2" width="30" height="30" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#2775ca" />
                                                    <circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" strokeWidth="1.6" />
                                                    <path d="M15.1 21.7c-1.9-.3-3.3-1.9-3.3-3.8h1.7c0 1.1.8 2 1.9 2.2v-3.3c-1.9-.4-3.4-1-3.4-2.9 0-1.6 1.3-2.8 3.1-3v-1.1h1.1v1.1c1.8.2 3 1.5 3 3.2h-1.7c0-.9-.6-1.6-1.5-1.8v3c1.9.4 3.5 1 3.5 3 0 1.7-1.3 2.9-3.2 3.1v1.1h-1.1v-1.1zm.1-6.6v-2.8c-.9.2-1.4.7-1.4 1.4 0 .8.6 1.1 1.4 1.4zm1 2v2.9c.9-.2 1.5-.7 1.5-1.5 0-.8-.7-1.1-1.5-1.4z" fill="#fff" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="pn">BTC / USDC</div>
                                                <div className="ps">0.1488 BTC · 12,500 USDC</div>
                                            </div>
                                        </div>
                                        <div className="pcols">
                                            <div className="pcol"><div className="k">VALUE</div><div className="v">$25,000</div></div>
                                            <div className="pcol"><div className="k">YOUR APY</div><div className="v p">30.0%</div></div>
                                            <div className="pcol"><div className="k">EARNED 7D</div><div className="v t">+$144</div></div>
                                            <div className="pcol"><div className="k">STATUS</div><div className="v t tip" data-tip="Price is within your active range — earning fees"><span className="dot"></span> In range</div></div>
                                            <span className="manage">Manage</span>
                                        </div>
                                    </div>
                                    <div className="posrow">
                                        <div className="pl">
                                            <div className="pair">
                                                <svg width="30" height="30" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#e31937" />
                                                    <path d="M9.5 11.2c1.4-0.7 3.9-1.15 6.5-1.15s5.1 0.45 6.5 1.15l-1.0 1.7c-1.0-0.45-2.5-0.75-4.0-0.86l0 9.96h-3.0l0-9.96c-1.5 0.11-3.0 0.41-4.0 0.86z" fill="#fff" />
                                                </svg>
                                                <svg className="coin c2" width="30" height="30" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#2775ca" />
                                                    <circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" strokeWidth="1.6" />
                                                    <path d="M15.1 21.7c-1.9-.3-3.3-1.9-3.3-3.8h1.7c0 1.1.8 2 1.9 2.2v-3.3c-1.9-.4-3.4-1-3.4-2.9 0-1.6 1.3-2.8 3.1-3v-1.1h1.1v1.1c1.8.2 3 1.5 3 3.2h-1.7c0-.9-.6-1.6-1.5-1.8v3c1.9.4 3.5 1 3.5 3 0 1.7-1.3 2.9-3.2 3.1v1.1h-1.1v-1.1zm.1-6.6v-2.8c-.9.2-1.4.7-1.4 1.4 0 .8.6 1.1 1.4 1.4zm1 2v2.9c.9-.2 1.5-.7 1.5-1.5 0-.8-.7-1.1-1.5-1.4z" fill="#fff" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="pn">TSLA / USDC</div>
                                                <div className="ps">18.8 TSLA · 6,200 USDC</div>
                                            </div>
                                        </div>
                                        <div className="pcols">
                                            <div className="pcol"><div className="k">VALUE</div><div className="v">$12,400</div></div>
                                            <div className="pcol"><div className="k">YOUR APY</div><div className="v p">25.5%</div></div>
                                            <div className="pcol"><div className="k">EARNED 7D</div><div className="v t">+$61</div></div>
                                            <div className="pcol"><div className="k">STATUS</div><div className="v t tip" data-tip="Price is within your active range — earning fees"><span className="dot"></span> In range</div></div>
                                            <span className="manage">Manage</span>
                                        </div>
                                    </div>
                                    <div className="posrow">
                                        <div className="pl">
                                            <div className="pair">
                                                <svg width="30" height="30" viewBox="0 0 32 32">
                                                    <defs><radialGradient id="goldd" cx="38%" cy="32%" r="75%"><stop offset="0" stopColor="#fbe9a4" /><stop offset="0.45" stopColor="#e8c14e" /><stop offset="1" stopColor="#bd902a" /></radialGradient></defs>
                                                    <circle cx="16" cy="16" r="16" fill="url(#goldd)" />
                                                    <circle cx="16" cy="16" r="11.6" fill="none" stroke="#fff6d6" strokeWidth="0.9" strokeOpacity="0.55" />
                                                    <text x="16" y="20.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#7a5a12">Au</text>
                                                </svg>
                                                <svg className="coin c2" width="30" height="30" viewBox="0 0 32 32">
                                                    <circle cx="16" cy="16" r="16" fill="#26a17b" />
                                                    <path d="M17.8 14.1v-2.2h4.9V8.7H9.3v3.2h4.9v2.2c-3.9.2-6.9 1-6.9 1.9s3 1.7 6.9 1.9v6.3h3.6V18c3.9-.2 6.9-1 6.9-1.9s-3-1.7-6.9-1.9zm0 3.3c-.1 0-1 .1-2 .1-1.5 0-2.5-.1-2.8-.1-3.3-.1-5.8-.7-5.8-1.4s2.5-1.2 5.8-1.4v2.2c.3 0 1.3.1 2.8.1 1 0 1.8-.1 1.9-.1v-2.2c3.3.2 5.8.8 5.8 1.4s-2.5 1.3-5.8 1.4z" fill="#fff" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="pn">GOLD / USDT</div>
                                                <div className="ps">1.547 XAUt · 4,100 USDT</div>
                                            </div>
                                        </div>
                                        <div className="pcols">
                                            <div className="pcol"><div className="k">VALUE</div><div className="v">$8,200</div></div>
                                            <div className="pcol"><div className="k">YOUR APY</div><div className="v p">28.4%</div></div>
                                            <div className="pcol"><div className="k">EARNED 7D</div><div className="v t">+$44</div></div>
                                            <div className="pcol"><div className="k">STATUS</div><div className="v tip" data-tip="Auto-recentering liquidity around current price" style={{ color: "var(--purple-soft)" }}>
                                                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--purple-soft)", display: "inline-block", marginRight: "4px" }}></span>Rebalancing
                                            </div></div>
                                            <span className="manage">Manage</span>
                                        </div>
                                    </div>

                                    <div className="sectitle" style={{ marginTop: "26px" }}>Protocol &amp; your share</div>
                                    <div className="protogrid">
                                        <div className="pcard"><div className="pcap">TOTAL VALUE LOCKED</div><div className="pval">$24.6M</div><div className="pdelta">+4.2% · 7d</div></div>
                                        <div className="pcard acc"><div className="pcap">🛡️ RESERVE VAULT</div><div className="pval">$1.84M</div><div className="pdelta">Yield above 30% cap</div></div>
                                        <div className="pcard"><div className="pcap">YOUR SHARE OF TVL</div><div className="pval">0.19%</div><div className="pdelta">$45.8K of $24.6M</div></div>
                                    </div>
                                </div>
                                <div className="sharecard">
                                    <span className="sht">Your share of the BTC / USDC pool</span>
                                    <div className="sharebar"><div className="sharefill" style={{ width: "2.4%" }}></div></div>
                                    <span className="shline"><b>2.4%</b> · $25,000 of $1.02M</span>
                                </div>

                                <div className="ui-marketing-hero">
                                    <div className="ui-marketing-hero-inner">
                                        <div className="ui-marketing-left">
                                            <h2>Liquidity that<br />works the market.</h2>
                                            <p>
                                                From blue-chip crypto like BTC, ETH and AVAX to tokenized equities such as NVIDIA,
                                                Tesla and SpaceX, your capital actively makes markets and captures on-chain swap
                                                fees — <span className="highlight">with yield capped at 30% and an IL Shield protecting every position.</span>
                                            </p>
                                        </div>
                                        <div className="ui-marketing-right">
                                            <button
                                                className="ui-launch-btn"
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                <Rocket className="launch-icon" />
                                                Launch app
                                                <span className="arrow">→</span>
                                            </button>
                                            <div className="ui-note">NON-CUSTODIAL · AUDITED<br />LIVE ON AVALANCHE C-CHAIN</div>
                                        </div>
                                    </div>
                                </div>
                                <CsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UiDeposit open={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
            <UiWithdraw open={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
        </>
    );
};

export default UiView;