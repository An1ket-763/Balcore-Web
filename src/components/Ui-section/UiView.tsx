import React, { useState, useEffect, useRef } from "react";
import CsModal from "@/components/ui/CsModal";
import UiDeposit from "./UiDeposit";
import UiWithdraw from "./UiWithdraw";
import brandLogo from "@/assets/images/Blogo.png";
import "./UiView.css";

const chartSeries: Record<string, number[]> = {
  "1D": [126,125,127,124,123,125,122,121,123,120,122,119,121,118,120,117,119,116,118,115,117,116,114,113,115,112,114,111,113,110,112,111,109,110,108,109,107,106,108,105],
  "1W": [130,128,131,127,126,128,124,125,123,120,122,118,119,116,117,113,114,110,108,104,101,97,99,94,92,88,90,85,83,79,81,76,74,70,72,67,65,61,58,54],
  "1M": [124,130,118,127,119,117,127,120,130,125,134,142,138,120,127,130,119,97,88,85,62,71,52,53,59,66,66,49,53,44,33,31,22,31,40,44,31,27,28,18],
  ALL:  [148,145,140,138,133,136,128,130,122,118,120,110,108,98,96,86,90,78,80,68,64,58,60,50,46,40,42,34,30,24,28,20,22,16,18,12,14,10,11,8],
};

const BtcCoin: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="30" height="30" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="#f7931a" />
    <path d="M21.6 14c.3-1.9-1.2-2.9-3.2-3.6l.6-2.5-1.5-.4-.6 2.5c-.4-.1-.8-.2-1.2-.3l.6-2.5-1.5-.4-.7 2.5c-.3-.1-.7-.2-1-.2l-2.1-.5-.4 1.6s1.1.3 1.1.3c.6.2.7.6.7 1l-1.7 6.7c-.1.2-.3.4-.6.3 0 0-1.1-.3-1.1-.3l-.8 1.8 2 .5c.4.1.7.2 1.1.3l-.6 2.5 1.5.4.6-2.5c.4.1.8.2 1.2.3l-.6 2.5 1.5.4.6-2.5c2.6.5 4.6.3 5.4-2.1.7-1.9 0-3-1.4-3.7 1-.2 1.8-.9 2-2.4zm-3.6 4.9c-.5 1.9-3.6.9-4.6.6l.8-3.3c1 .3 4.3.8 3.8 2.7zm.5-5c-.4 1.8-3 .8-3.9.6l.7-3c.9.3 3.7.7 3.2 2.4z" fill="#fff" />
  </svg>
);

const UsdcCoin: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="30" height="30" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="#2775ca" />
    <circle cx="16" cy="16" r="10.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    <path d="M15.1 21.7c-1.9-.3-3.3-1.9-3.3-3.8h1.7c0 1.1.8 2 1.9 2.2v-3.3c-1.9-.4-3.4-1-3.4-2.9 0-1.6 1.3-2.8 3.1-3v-1.1h1.1v1.1c1.8.2 3 1.5 3 3.2h-1.7c0-.9-.6-1.6-1.5-1.8v3c1.9.4 3.5 1 3.5 3 0 1.7-1.3 2.9-3.2 3.1v1.1h-1.1v-1.1zm.1-6.6v-2.8c-.9.2-1.4.7-1.4 1.4 0 .8.6 1.1 1.4 1.4zm1 2v2.9c.9-.2 1.5-.7 1.5-1.5 0-.8-.7-1.1-1.5-1.4z" fill="#fff" />
  </svg>
);

const TslaCoin: React.FC = () => (
  <svg className="coin c1" width="30" height="30" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="#e31937" />
    <path d="M9.5 11.2c1.4-0.7 3.9-1.15 6.5-1.15s5.1 0.45 6.5 1.15l-1.0 1.7c-1.0-0.45-2.5-0.75-4.0-0.86l0 9.96h-3.0l0-9.96c-1.5 0.11-3.0 0.41-4.0 0.86z" fill="#fff" />
  </svg>
);

const GoldCoin: React.FC = () => (
  <svg className="coin c1" width="30" height="30" viewBox="0 0 32 32">
    <defs>
      <radialGradient id="goldd" cx="38%" cy="32%" r="75%">
        <stop offset="0" stopColor="#fbe9a4" />
        <stop offset="0.45" stopColor="#e8c14e" />
        <stop offset="1" stopColor="#bd902a" />
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#goldd)" />
    <circle cx="16" cy="16" r="11.6" fill="none" stroke="#fff6d6" strokeWidth="0.9" strokeOpacity="0.55" />
    <text x="16" y="20.5" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="bold" fill="#7a5a12">Au</text>
  </svg>
);

const UsdtCoin: React.FC = () => (
  <svg className="coin c2" width="30" height="30" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="#26a17b" />
    <path d="M17.8 14.1v-2.2h4.9V8.7H9.3v3.2h4.9v2.2c-3.9.2-6.9 1-6.9 1.9s3 1.7 6.9 1.9v6.3h3.6V18c3.9-.2 6.9-1 6.9-1.9s-3-1.7-6.9-1.9zm0 3.3c-.1 0-1 .1-2 .1-1.5 0-2.5-.1-2.8-.1-3.3-.1-5.8-.7-5.8-1.4s2.5-1.2 5.8-1.4v2.2c.3 0 1.3.1 2.8.1 1 0 1.8-.1 1.9-.1v-2.2c3.3.2 5.8.8 5.8 1.4s-2.5 1.3-5.8 1.4z" fill="#fff" />
  </svg>
);

const UiView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<keyof typeof chartSeries>("1M");
  const [portfolioValue, setPortfolioValue] = useState(0);
  const targetPortfolioValue = 45759;
  const areaRef = useRef<SVGPolygonElement>(null);
  const lineRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setPortfolioValue(Math.round(targetPortfolioValue * ease));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!areaRef.current || !lineRef.current) return;
    const data = chartSeries[timeframe];
    const width = 560;
    const stepX = width / (data.length - 1);
    const points = data.map((y, i) => `${(i * stepX).toFixed(1)},${y}`).join(" ");
    lineRef.current.setAttribute("points", points);
    areaRef.current.setAttribute("points", `0,150 ${points} ${width},150`);
  }, [timeframe]);

  return (
    <>
      <div className="ui-view-wrapper">
        <div className="page">
          <div className="frame">
            <div className="chrome">
              <div className="tl" style={{ background: "#ff5f57" }}></div>
              <div className="tl" style={{ background: "#febc2e" }}></div>
              <div className="tl" style={{ background: "#28c840" }}></div>
              <div className="urlbar">app.balcore.ai</div>
              <div style={{ width: 54 }}></div>
            </div>
            <div className="appclip">
              <div className="shell">
                <div className="top">
                  <div className="brand">
                    <img alt="Balcore" src={brandLogo} />
                    <span>BALCORE</span>
                  </div>
                  <div className="search">
                    <span style={{ fontSize: 16 }}>⌖</span>
                    <span style={{ flex: 1 }}>Search assets &amp; pools</span>
                    <span className="key">⌘</span>
                    <span className="key">K</span>
                  </div>
                  <div className="topright">
                    <span className="pill">⟳ Swap</span>
                    <span className="pill ghost"><span className="dot"></span>0xdea...db3</span>
                  </div>
                </div>
                <div className="main">
                  <div className="side">
                    <div className="nav on"><span className="ic">☷</span>Dashboard</div>
                    <div className="nav"><span className="ic">⏣</span>Activity</div>
                    <div className="sec">EXPLORE</div>
                    <div className="nav" onClick={() => setIsDepositOpen(true)}><span className="ic">↑</span>Deposit</div>
                    <div className="nav"><span className="ic">⬦</span>Pools</div>
                    <div className="nav" onClick={() => setIsWithdrawOpen(true)}><span className="ic">↓</span>Withdraw</div>
                    <div className="sec">PROTOCOL</div>
                    <div className="nav"><span className="ic">⚲</span>Insights</div>
                    <div className="nav"><span className="ic">🛡️</span>IL Shield</div>
                    <div className="nav"><span className="ic">⚙</span>Protocol</div>
                  </div>
                  <div className="content">
                    <div className="h1">Dashboard</div>
                    <div className="sub">Your liquidity at work across Balcore&rsquo;s market-making pools.</div>

                    <div className="hero">
                      <div className="heroL">
                        <div className="lbl">PORTFOLIO VALUE</div>
                        <div className="big">${portfolioValue.toLocaleString("en-US")}</div>
                        <div className="row2">
                          <div><div className="k">NET APY</div><div className="vv p">28.5% · capped</div></div>
                          <div><div className="k">EARNED ALL-TIME</div><div className="vv t">+$1,084</div></div>
                          <div><div className="k">EARNED · 7D</div><div className="vv t">+$249</div></div>
                        </div>
                        <div className="chartwrap">
                          <div className="tfrow">
                            {(["1D","1W","1M","ALL"] as const).map((tf) => (
                              <span key={tf} className={`tf ${timeframe === tf ? "on" : ""}`} onClick={() => setTimeframe(tf)}>{tf}</span>
                            ))}
                          </div>
                          <svg id="pchart" width="100%" height="60" viewBox="0 0 560 150" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
                                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <polygon ref={areaRef} fill="url(#g)" />
                            <polyline ref={lineRef} fill="none" stroke="#a88cfa" strokeWidth="2" />
                          </svg>
                        </div>
                      </div>
                      <div className="heroR">
                        <div className="scard">
                          <div className="cap">☷ ACTIVE POSITIONS</div>
                          <div className="val">3 pools</div>
                          <div className="d">
                            <BtcCoin className="coin c1" /> / <UsdcCoin className="coin c2" /> · +2 more
                          </div>
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
                        <div className="pair"><BtcCoin className="coin c1" /><UsdcCoin className="coin c2" /></div>
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
                        <div className="pair"><TslaCoin /><UsdcCoin className="coin c2" /></div>
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
                        <div className="pair"><GoldCoin /><UsdtCoin /></div>
                        <div>
                          <div className="pn">GOLD / USDT</div>
                          <div className="ps">1.547 XAUt · 4,100 USDT</div>
                        </div>
                      </div>
                      <div className="pcols">
                        <div className="pcol"><div className="k">VALUE</div><div className="v">$8,200</div></div>
                        <div className="pcol"><div className="k">YOUR APY</div><div className="v p">28.4%</div></div>
                        <div className="pcol"><div className="k">EARNED 7D</div><div className="v t">+$44</div></div>
                        <div className="pcol"><div className="k">STATUS</div>
                          <div className="v tip" data-tip="Auto-recentering liquidity around current price" style={{ color: "var(--purple-soft)" }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--purple-soft)", display: "inline-block" }}></span> Rebalancing
                          </div>
                        </div>
                        <span className="manage">Manage</span>
                      </div>
                    </div>

                    <div className="sectitle" style={{ marginTop: 26 }}>Protocol &amp; your share</div>
                    <div className="protogrid">
                      <div className="pcard"><div className="pcap">TOTAL VALUE LOCKED</div><div className="pval">$24.6M</div><div className="pdelta">+4.2% · 7d</div></div>
                      <div className="pcard acc"><div className="pcap">🛡️ RESERVE VAULT</div><div className="pval">$1.84M</div><div className="pdelta">Yield above 30% cap</div></div>
                      <div className="pcard"><div className="pcap">YOUR SHARE OF TVL</div><div className="pval">0.19%</div><div className="pdelta">$45.8K of $24.6M</div></div>
                    </div>

                    <div className="sharecard">
                      <span className="sht">Your share of the BTC / USDC pool</span>
                      <div className="sharebar"><div className="sharefill" style={{ width: "2.4%" }}></div></div>
                      <span className="shline"><b>2.4%</b> · $25,000 of $1.02M</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appfade"></div>
            </div>
          </div>

          <div className="lhero">
            <div>
              <h2>Liquidity that<br />works the market.</h2>
              <p>
                From blue-chip crypto like BTC, ETH and AVAX to tokenized equities such as NVIDIA, Tesla and SpaceX, your capital actively makes markets and captures on-chain swap fees —{" "}
                <span className="gp">with yield capped at 30% and an IL Shield protecting every position.</span>
              </p>
            </div>
            <div className="ctawrap">
              <button className="lcta" onClick={() => setIsModalOpen(true)}>
                Launch app&nbsp;<span className="arr">→</span>
              </button>
              <div className="note">NON-CUSTODIAL · AUDITED<br />LIVE ON AVALANCHE C-CHAIN</div>
            </div>
          </div>

          <div className="stats">
            <div className="sc">
              <div className="snum">24/7</div>
              <div className="sd">Automated rebalancing engine, always on-chain</div>
            </div>
            <div className="sc">
              <div className="snum">3<span className="su">×</span></div>
              <div className="sd">Protection layers against impermanent loss (IL)</div>
            </div>
            <div className="sc">
              <div className="snum">Permission<span className="su">less</span></div>
              <div className="sd">Withdraw on your terms — no approvals, 7-day unlock</div>
            </div>
            <div className="sc">
              <div className="snum">Up to 30<span className="su">%</span></div>
              <div className="sd">Target APY, variable with market conditions</div>
            </div>
          </div>
        </div>
        <CsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
      <UiDeposit open={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
      <UiWithdraw open={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} />
    </>
  );
};

export default UiView;
