import React, { useState, useEffect, useRef } from "react";
import CsModal from "@/components/ui/CsModal";
import UiDeposit from "./UiDeposit";
import UiWithdraw from "./UiWithdraw";
import brandLogo from "@/assets/images/Blogo.png";
import "./UiView.css";

const chartSeries: Record<string, number[]> = {
  "1W": [92,90,93,89,91,88,90,87,89,86,88,90,87,89,86,88,85,87,84,86,88,85,83,85,82,84,81,83,80,82,84,81,79,81,83,80,82,79,78,80],
  "1M": [96,92,94,90,88,91,86,88,84,87,82,85,80,83,86,81,84,79,82,85,80,77,79,74,76,72,74,69,71,66,68,64,66,61,63,66,61,58,60,52],
  "6M": [104,100,102,96,98,92,94,88,90,86,88,82,84,80,82,78,80,74,76,72,74,70,68,64,66,62,64,58,60,56,58,52,54,50,52,48,50,46,44,40],
  "1Y": [112,108,104,100,102,96,94,90,86,88,82,84,80,76,78,72,74,68,70,66,62,64,58,60,56,52,54,50,46,48,44,40,42,38,34,36,32,30,28,26],
  ALL: [120,116,110,106,108,100,102,94,90,86,82,80,74,72,68,66,60,62,56,54,48,50,44,42,38,36,32,30,26,28,24,22,20,22,18,20,16,18,14,12],
};

type TF = keyof typeof chartSeries;

const UiView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<TF>("1M");
  const [portfolioValue, setPortfolioValue] = useState(0);
  const target = 2418930;
  const areaRef = useRef<SVGPolygonElement>(null);
  const lineRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setPortfolioValue(Math.round(target * e));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (!areaRef.current || !lineRef.current) return;
    const data = chartSeries[timeframe];
    const n = data.length;
    const w = 560;
    const pts = data.map((y, i) => `${((i / (n - 1)) * w).toFixed(1)},${y}`).join(" ");
    lineRef.current.setAttribute("points", pts);
    areaRef.current.setAttribute("points", `0,116 ${pts} ${w},116`);
  }, [timeframe]);

  return (
    <>
      <div className="ui-view-wrapper">
        <div className="page">
          <div className="frame">
            <div className="chrome">
              <div className="tl" style={{ background: "#ff5f57" }} />
              <div className="tl" style={{ background: "#febc2e" }} />
              <div className="tl" style={{ background: "#28c840" }} />
              <div className="urlbar">app.balcore.ai</div>
              <div style={{ width: 54 }} />
            </div>
            <div className="appclip">
              <div className="xapp">
                <aside className="xside">
                  <div className="xbrand">
                    <img className="xlogo" alt="Balcore" src={brandLogo} />
                    Balcore
                  </div>
                  <div className="xmenu">MENU</div>
                  <a className="xnav xon">
                    <span className="xic">
                      <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor"/><rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor"/><rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor"/></svg>
                    </span>Overview
                  </a>
                  <a className="xnav" onClick={() => setIsDepositOpen(true)}>
                    <span className="xic">
                      <svg viewBox="0 0 16 16" fill="none"><path d="M8 13V4M8 4 4.5 7.5M8 4l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>Deposit
                  </a>
                  <a className="xnav" onClick={() => setIsWithdrawOpen(true)}>
                    <span className="xic">
                      <svg viewBox="0 0 16 16" fill="none"><path d="M8 3v9M8 12 4.5 8.5M8 12l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>Withdraw
                  </a>
                  <a className="xnav">
                    <span className="xic">
                      <svg viewBox="0 0 16 16" fill="none"><path d="M8 2.5 14 5.5 8 8.5 2 5.5 8 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M2.5 8.2 8 11l5.5-2.8M2.5 10.8 8 13.5l5.5-2.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>Protocol
                  </a>
                  <a className="xnav">
                    <span className="xic">
                      <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.6" stroke="currentColor" strokeWidth="1.4"/><path d="M8 5v3.2l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>Activity
                  </a>
                  <div className="xpf">
                    <div className="xpf-t">PORTFOLIO</div>
                    <div className="xdonut"><div className="xdonut-c"><b>$2.4M</b><span>total</span></div></div>
                    <div className="xleg"><span><i style={{ background: "#2fa96e" }} />Dollar</span><b>50%</b></div>
                    <div className="xleg"><span><i style={{ background: "#f7931a" }} />Bitcoin</span><b>20%</b></div>
                    <div className="xleg"><span><i style={{ background: "#e82127" }} />Tesla</span><b>17%</b></div>
                    <div className="xleg"><span><i style={{ background: "#e6b52e" }} />Gold</span><b>13%</b></div>
                  </div>
                </aside>
                <main className="xmain">
                  <div className="xtop">
                    <div className="xsearch"><span>⌕</span> Search assets &amp; pools</div>
                    <div className="xtr">
                      <span className="xpill">
                        <svg viewBox="0 0 16 16" fill="none" style={{ width: 13, height: 13 }}><path d="M3 5.5h8M9 3.5 11 5.5 9 7.5M13 10.5H5M7 8.5 5 10.5 7 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Swap
                      </span>
                      <span className="xpill xghost"><i className="xdot" />0xdeA…db3</span>
                    </div>
                  </div>
                  <div className="xh1">Good evening, <span>Josh</span></div>
                  <div className="xsub">Here&rsquo;s how your market-making is going.</div>
                  <div className="xhero">
                    <div className="xcard xbal">
                      <div className="xlr"><span className="xlabel">Your balance</span><span className="xlink">how it grew →</span></div>
                      <div className="xbig">${portfolioValue.toLocaleString("en-US")}</div>
                      <div className="xdelta">▲ +$52,400 this month · <span className="xmono">28.5% / yr</span></div>
                      <div className="xstats">
                        <div><div className="xk">NET APY</div><div className="xapy">28.5%</div><div className="xcap">(capped 30%)</div></div>
                        <div className="xearn">
                          <div className="xk">EARNED</div>
                          <div className="xerow">
                            <span><span className="xk2">ALL-TIME</span><b className="xmint">+$512,400</b></span>
                            <span><span className="xk2">LAST WEEK</span><b className="xmint">+$13,120</b></span>
                          </div>
                        </div>
                      </div>
                      <div className="xtf">
                        {(["1W","1M","6M","1Y","ALL"] as const).map((tf) => (
                          <span key={tf} className={timeframe === tf ? "xon" : ""} onClick={() => setTimeframe(tf)}>{tf}</span>
                        ))}
                      </div>
                      <div className="xchart">
                        <svg viewBox="0 0 560 116" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="xg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0" stopColor="rgba(139,123,245,.34)" />
                              <stop offset="1" stopColor="rgba(139,123,245,0)" />
                            </linearGradient>
                          </defs>
                          <polygon ref={areaRef} fill="url(#xg)" />
                          <polyline ref={lineRef} fill="none" stroke="#8b7bf5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                    <div className="xstack">
                      <div className="xcard xmini xacc-mint">
                        <div className="xlr"><span className="xlabel">Your deposit</span><span className="xlink">Details →</span></div>
                        <div className="xmid">$2,332,720</div>
                        <div className="xk xmintk">FEES COLLECTED</div>
                        <div className="xbig2 xmint">+$52,400</div>
                      </div>
                      <div className="xcard xmini xacc-gold">
                        <div className="xlr"><span className="xlabel">In your wallet</span><span className="xlink">Details →</span></div>
                        <div className="xmid">$58,150</div>
                        <div className="xwc">
                          <i className="c-btc">₿</i><i className="c-gold">Au</i><i className="c-usd">$</i><i className="c-tsla">T</i>
                        </div>
                        <div className="xk3">4 assets · not deposited yet</div>
                      </div>
                    </div>
                    <div className="xcard xfees">
                      <div className="xlr"><span className="xlabel">Last week&rsquo;s fees</span><span className="xnext">Next in 2d 0h</span></div>
                      <div className="xbig2 xmint" style={{ margin: "6px 0 13px" }}>+$13,120</div>
                      <div className="xac">
                        <div className="xac-t"><b>Auto-compound</b><span>Fees reinvest into your pools automatically</span></div>
                        <span className="xtog" />
                      </div>
                      <div className="xfr"><span>Fees collected</span><b className="xmint">+$14,300</b></div>
                      <div className="xfr"><span>IL covered first</span><b className="xgold">−$1,180</b></div>
                      <div className="xfr"><span>Reinvested into your pools</span><b className="xmint">+$13,120</b></div>
                      <div className="xfnote">Settles Tuesdays 00:00 UTC · auto-compounded, nothing to do.</div>
                    </div>
                  </div>

                  <div className="xsec">Markets you&rsquo;re making</div>
                  <div className="xpools">
                    <div className="xpool" style={{ ["--acc" as string]: "#f7931a" } as React.CSSProperties}>
                      <span className="xpair"><i className="c-btc">₿</i><i className="c-usd">$</i></span>
                      <div className="xpn">Bitcoin / Dollar<span>7.88 BTC · 662,000 USDC</span></div>
                      <div className="xpc"><span>VALUE</span><b>$1,325,000</b></div>
                      <div className="xpc"><span>YOUR YIELD</span><b className="xmint">30.0%</b></div>
                      <div className="xpc xhide"><span>EARNED · 7D</span><b className="xmint">+$7,640</b></div>
                      <span className="xstatus xin">● In range</span>
                    </div>
                    <div className="xpool" style={{ ["--acc" as string]: "#e82127" } as React.CSSProperties}>
                      <span className="xpair"><i className="c-tsla">T</i><i className="c-usd">$</i></span>
                      <div className="xpn">Tesla / Dollar<span>1,595 TSLA · 328,600 USDC</span></div>
                      <div className="xpc"><span>VALUE</span><b>$657,200</b></div>
                      <div className="xpc"><span>YOUR YIELD</span><b className="xmint">25.5%</b></div>
                      <div className="xpc xhide"><span>EARNED · 7D</span><b className="xmint">+$3,220</b></div>
                      <span className="xstatus xin">● In range</span>
                    </div>
                    <div className="xpool" style={{ ["--acc" as string]: "#e6b52e" } as React.CSSProperties}>
                      <span className="xpair"><i className="c-gold">Au</i><i className="c-usd">$</i></span>
                      <div className="xpn">Gold / Dollar<span>82.0 XAUt · 217,300 USDC</span></div>
                      <div className="xpc"><span>VALUE</span><b>$436,730</b></div>
                      <div className="xpc"><span>YOUR YIELD</span><b className="xmint">28.4%</b></div>
                      <div className="xpc xhide"><span>EARNED · 7D</span><b className="xmint">+$2,330</b></div>
                      <span className="xstatus xreb">● Rebalancing</span>
                    </div>
                  </div>
                  <div className="xsystem">
                    <span className="xsyslive"><i className="xdot" />Live</span>
                    <span className="xsi"><span>MARKET</span><b className="xmint">● Calm</b></span>
                    <span className="xsi"><span>FEES THIS WEEK</span><b className="xmint">~$78,400</b></span>
                    <span className="xsi xhide"><span>RESERVE BACKING</span><b className="xgold">$1.84M</b></span>
                    <span className="xsi xhide"><span>WORKING / RESERVE</span><b>20% / 80%</b></span>
                  </div>
                </main>
              </div>
              <div className="appfade" />
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
