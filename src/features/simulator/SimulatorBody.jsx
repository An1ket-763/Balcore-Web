import React from "react";

const SimulatorBody = () => (
  <>

<div className="brand"><img src="data:image/png;base64,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" alt="Balcore" style={{height:30, verticalAlign:-7, marginRight:8}} /><span className="bl">BALCORE</span></div>
<div className="kicker">STRESS-TEST THE ENGINE</div>
<h1>Throw a market at it. Any market.</h1>
<div className="sub">Pick a regime or roll a random one. Market making is always a two-asset business: the vault holds half the asset and half dollars, and quotes both sides of the pair. A simplified public model of the Balcore engine market-makes the whole path —
collecting fees, invoicing impermanent loss weekly, restoring the book, and paying users only from real net income.
The production engine's placement logic, signals and safeguards are proprietary and materially stronger — this is the floor, not the machine.</div>
<div className="hero-badges">
  <span className="badge"><strong>DETERMINISTIC</strong> same scenario, same result</span>
  <span className="badge"><strong>LOCAL</strong> runs entirely in your browser</span>
  <span className="badge"><strong>PUBLIC FLOOR MODEL</strong> proprietary production logic excluded</span>
</div>

<div className="controls" aria-label="Simulation controls">
  <div className="control-block" id="assets">
    <span className="control-title">Pair</span>
    <button type="button" data-a="BTC" className="active">BTC / USD</button>
    <button type="button" data-a="ETH">ETH / USD</button>
    <button type="button" data-a="AVAX">AVAX / USD</button>
    <button type="button" data-a="GOLD">GOLD / USD</button>
  </div>
  <div className="control-block" id="presets">
    <span className="control-title">Market</span>
    <button type="button" data-p="study" className="active">📈 Study tape</button>
    <button type="button" data-p="crash">Crash −50%</button>
    <button type="button" data-p="bear">Bear −20%</button>
    <button type="button" data-p="chop">Sideways</button>
    <button type="button" data-p="melt">Melt-up +120%</button>
    <button type="button" data-p="round">Boom & bust</button>
    <button type="button" data-p="rand">🎲 Random</button>
    <button type="button" data-p="future">🔮 Next 24 months</button>
    <button type="button" data-p="custom" id="customBtn">✎ Custom</button>
  </div>
  <div className="control-block">
    <span className="control-title">Capital</span>
    <select id="capital" aria-label="Initial capital">
      <option value="100000">$100K</option>
      <option value="1000000">$1M</option>
      <option value="5000000" selected>$5M</option>
      <option value="10000000">$10M</option>
    </select>
    <span className="control-title">Fee environment</span>
    <select id="feeEnv" aria-label="Modeled fee environment">
      <option value="0.5">Conservative · 0.5×</option>
      <option value="1" selected>Base · 1.0×</option>
      <option value="1.5">High · 1.5×</option>
    </select>
  </div>
  <div className="control-block">
    <label title="Same trend, rougher ride: higher means larger IL bills, more breaker activity and a harder market.">Market roughness
      <input id="vol" type="range" min="50" max="200" value="100" step="25" aria-label="Market roughness" />
      <span className="val" id="volv">×1 (asset-realistic)</span>
    </label>
    <span className="assumption-note">Gross venue yield is modeled from volatility tiers, then scaled by the selected fee environment and asset profile. It is an assumption—not a forecast or guarantee.</span>
  </div>
  <div className="control-block">
    <span className="control-title">Scenario</span>
    <span className="val">#<span id="seedv">7</span></span>
    <button type="button" id="reroll">↻ New scenario</button>
  </div>
  <div className="action-row">
    <button type="button" className="secondary" id="share">Copy scenario</button>
    <button type="button" className="secondary" id="export">Export CSV</button>
  </div>
  <button type="button" className="run" id="run">RUN 24 MONTHS</button>
</div>

<details id="builder" style={{margin:"-6px 0 18px"}}>
  <summary style={{cursor:"pointer", color:"var(--teal)", fontSize:13, fontWeight:700}}>▾ Customize the market — drag your own crash or rally · set price at month 6, 12, 18 and 24</summary>
  <div className="card" style={{marginTop:10}}>
    <canvas id="bld" width="980" height="170" style={{cursor:"grab", touchAction:"none", maxWidth:"100%"}}></canvas>
    <div id="bldSliders" style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginTop:12}}></div>
    <div style={{marginTop:14, borderTop:"1px dashed #2A2440", paddingTop:12}}>
      <div style={{fontSize:12, color:"var(--teal)", fontWeight:700, marginBottom:6}}>📊 Or paste your own price data</div>
      <textarea id="pasteBox" rows="2" placeholder="Paste closing prices, oldest first — commas, spaces or new lines, or upload a CSV/TXT file. Any length ≥ 2, any cadence (daily / weekly / monthly). Example: 100, 128, 95, 61, 74, 103" style={{width:"100%", background:"#0D0820", border:"1px solid var(--edge)", borderRadius:8, color:"var(--txt)", fontSize:12, padding:8, fontFamily:"monospace"}}></textarea>
      <div style={{marginTop:6, display:"flex", gap:10, alignItems:"center", flexWrap:"wrap"}}>
        <button type="button" id="pasteLoad">Load my data</button>
        <label className="upload-control"><input id="csvFile" type="file" accept=".csv,.txt,text/csv,text/plain" hidden />
          <span>📁 Upload CSV / TXT</span></label>
        <span id="pasteMsg" className="mut" style={{fontSize:"11.5px"}}></span>
      </div>
      <div className="fine2">Your series becomes the market's spine; the roughness dial adds intraday texture between your points — tweak it to explore variations of your trend.</div>
    </div>
    <div className="fine2">Each slider is that month's price as % vs start. Slide (or drag the dots) to sculpt any market — a −80% crash, a +250% moon, a whipsaw nightmare — it runs automatically.</div>
  </div>
</details>

<section className="kpis" aria-label="Simulation headline results">
  <div className="kpi"><div className="eyebrow">Ending Balcore value</div><div className="number" id="kEnd">—</div><div className="detail" id="kEndD">vault + surplus + paid distributions</div></div>
  <div className="kpi"><div className="eyebrow">Vs hold 50/50</div><div className="number" id="kVs55">—</div><div className="detail" id="kVs55D">relative value after 24 months</div></div>
  <div className="kpi"><div className="eyebrow">Vs hold asset</div><div className="number" id="kVsA">—</div><div className="detail" id="kVsAD">relative value after 24 months</div></div>
  <div className="kpi"><div className="eyebrow">Annualized return</div><div className="number" id="kCagr">—</div><div className="detail" id="kDd">maximum modeled drawdown —</div></div>
  <div className="kpi"><div className="eyebrow">User distributions</div><div className="number" id="kPay">—</div><div className="detail" id="kCov">fee / IL coverage —</div></div>
</section>

<div className="grid">
  <div>
    <div className="card"><div className="result-head"><div><div id="ctx" style={{fontSize:"12.5px", color:"var(--mut)", marginBottom:8}}></div><h3>WHAT <span id="capitalTitle">$5M</span> BECAME</h3></div><span className="model-status">MODELED · NOT LIVE</span></div><canvas id="eq" width="980" height="380" role="img" aria-label="Balcore value compared with holding strategies"></canvas><div className="chart-note">All lines start with the same capital. Balcore includes remaining vault value, accumulated surplus and distributions already paid.</div></div>
    <div className="card" style={{marginTop:16}}><h3>FEES vs IMPERMANENT LOSS, EVERY MONTH</h3><canvas id="mo" width="980" height="260" role="img" aria-label="Monthly fees compared with monthly impermanent loss"></canvas>
      <div style={{marginTop:8}}><span className="stat">months fees ≥ bill: <b id="cov">—</b></span>
      <span className="stat">payout weeks paused: <b id="paused">—</b></span>
      <span className="stat">capital in range: <b id="inr">—</b></span>
      <span className="stat">velocity guard engaged: <b id="gateN">—</b> hrs</span>
      <span className="stat">circuit breakers: <b id="brkN">—</b></span>
      <span className="stat">halts: <b id="haltN">—</b></span>
      <span className="stat">peak deployment: <b id="depMax">—</b></span></div></div>
  </div>
  <div>
    <div className="card"><h3>TOKEN COUNT · START → END</h3>
      <div className="row"><span>Asset</span><b id="tokA">—</b></div>
      <div className="row"><span>USDC</span><b id="tokU">—</b></div>
      <div className="fine2" id="tokNote">restored toward the deposit at every weekly reset</div>
    </div>
    <div className="card" style={{marginTop:16}}><h3>WHERE THE MONEY WENT</h3>
      <div className="row"><span>Fees collected</span><b className="pos" id="wFee">—</b></div>
      <div className="row"><span>− Impermanent loss <span className="mut">(invoiced weekly)</span></span><b className="neg" id="wIL">—</b></div>
      <div className="row"><span>− Protocol fee <span className="mut">(5% of fees + 30% of surplus)</span></span><b className="mut" id="wProto">—</b></div>
      <div className="row"><span><b>= VALUE CREATED</b></span><b id="wVal">—</b></div>
      <div className="row"><span>→ paid to users <span className="mut">(weekly, capped 30%/yr)</span></span><b className="pos" id="wPay">—</b></div>
      <div className="row"><span>→ surplus vault <span className="mut">(70% of income above the user cap)</span></span><b className="amb" id="wSur">—</b></div>
    </div>
    <div className="card" style={{marginTop:16}}><h3>ALL SEATS AT THE TABLE</h3><div id="seats"></div></div>
  </div>
</div>

<details className="method">
  <summary>MODEL ASSUMPTIONS & HOW TO READ THE RESULTS</summary>
  <div className="method-grid">
    <div className="method-item"><b>Starting book</b><span>Capital begins 50% in the selected asset and 50% in USDC. The model compares Balcore against holding that same 50/50 basket and holding 100% of the asset.</span></div>
    <div className="method-item"><b>Fee engine</b><span>Gross venue yield changes with modeled volatility. The fee-environment selector scales those gross assumptions so users can test conservative, base and high conditions.</span></div>
    <div className="method-item"><b>IL accounting</b><span>Impermanent loss is measured and invoiced weekly. Income is applied to restoration first; user distributions pause whenever the original token counts are not restored.</span></div>
    <div className="method-item"><b>Public floor</b><span>Range placement, signals, production thresholds and adaptive deployment logic are intentionally excluded. This page is educational and should not be treated as a forecast.</span></div>
  </div>
</details>

<div className="toast" id="toast" role="status" aria-live="polite"></div>

<div className="fine">SIMPLIFIED PUBLIC MODEL · MODELED, NOT LIVE · the production engine’s range placement, weekly map, velocity-safeguard calibrations and the production adaptive-deployment engine are trade secrets and are <u>not</u> in this page (an illustrative adaptive share, 20%→35% in unusually wild weeks, is included as demonstration only) — treat every result as an illustration, not a promise. Safeguards on this page (weekly guardrails, velocity guard, halt) use thresholds SELF-CALIBRATED to each scenario via percentiles of its own moves — the calibration law is real, the production pins are not shown. Impermanent loss is never “solved” here: it is invoiced weekly and paid from income first. Yield depends on venue fee/emission rates; the tiered APR model reflects historical yields observed on ve(3,3) CL and DLMM pools, not a guarantee. Educational simulation — not financial advice.</div>
<div className="fine2">Be the Market Maker · balcore.ai  ·  <b style={{color:"var(--teal)"}}>v3.1 · PUBLIC MODEL · 2026-07-18</b>  ·  <span id="jsok" style={{color:"var(--red)", fontWeight:700}}>engine: NOT RUNNING — open in a real browser (Safari/Chrome), not a file preview</span></div>

<div id="simfx"><canvas id="fx" width="900" height="300"></canvas>
<div id="simhud"></div><div id="simwk"></div><div id="simskip">click to skip</div></div>


  </>
);

export default SimulatorBody;
