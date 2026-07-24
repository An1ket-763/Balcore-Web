const STEPS = [
  { i: 1, name: "Deposit" },
  { i: 2, name: "Trend" },
  { i: 3, name: "Monday range" },
  { i: 4, name: "Pivots" },
  { i: 5, name: "Band & fees" },
  { i: 6, name: "Distribute" },
];

const UnderTheHoodCard = () => (
  <div className="card hood-card reveal" id="hoodCard" style={{ animationDelay: ".55s" }}>
    <h3>Under the hood  what happens to your deposit</h3>
    <p className="hood-intro">
      Once you deposit, capital doesn't just sit in a pool. The strategy places liquidity intelligently around price
      using the same signals run manually for the past year. Press play to watch one week unfold.
    </p>

    <button className="deploy-btn deploy-btn-top" id="deployBtnTop">▶ Deploy liquidity</button>

    <div className="hood-stage" id="hoodStage">
      <div className="step-rail" id="stepRail">
        {STEPS.map((s) => (
          <div key={s.i} className="step" data-i={s.i}>
            <span className="step-dot">{s.i}</span>
            <span className="step-name">{s.name}</span>
          </div>
        ))}
      </div>

      <div className="hood-chart-wrap">
        <div className="phase-badge" id="phaseBadge">Ready to deploy</div>
        <div className="fee-chip" id="feeChip">
          <span className="fc-lbl">Fees earned</span>
          <span className="fc-val" id="feeChipVal">$0</span>
        </div>
        <svg
          id="hoodChart"
          viewBox="0 0 720 320"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
        <div className="day-axis">
          <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span>
          <span className="wknd">SAT</span><span className="wknd">SUN</span><span>MON</span>
        </div>
        <div className="chart-legend">
          <span><i className="lg-band"></i> Liquidity band</span>
          <span><i className="lg-vwap"></i> VWAP + bands (exhaustion)</span>
          <span><i className="lg-pivot"></i> Pivots · P / R2·R3 / S2·S3</span>
          <span><i className="lg-mon"></i> Monday range</span>
          <span><i className="lg-price"></i> Price</span>
        </div>
      </div>

      <div className="hood-caption" id="hoodCaption">
        Press <b>Deploy liquidity</b> to watch one week of the strategy unfold  step by step.
      </div>

      <div className="hood-flow" id="hoodFlow">
        <div className="flow-node deposit" id="fnDeposit">
          <div className="fn-icon">🔒</div>
          <div className="fn-lbl">Your deposit</div>
          <div className="fn-val" id="fnDepositVal">$5M</div>
          <div className="fn-sub">principal stays protected</div>
        </div>
        <div className="flow-pipe" id="faPool"><span className="pipe-dot"></span></div>
        <div className="flow-node pool" id="fnPool">
          <div className="fn-icon">⚖️</div>
          <div className="fn-lbl">AMM liquidity</div>
          <div className="fn-val">Active band</div>
          <div className="fn-sub">earns a fee on every trade</div>
        </div>
        <div className="flow-pipe" id="faFees"><span className="pipe-dot"></span></div>
        <div className="flow-node fees" id="fnFees">
          <div className="fn-icon">💧</div>
          <div className="fn-lbl">Weekly fees</div>
          <div className="fn-val" id="fnFeesVal">$0</div>
          <div className="fn-sub">gross yield collected</div>
        </div>
        <div className="flow-split" id="flowSplit">
          <div className="split-node user">
            <div className="sn-lbl">To you</div>
            <div className="sn-val" id="snUser">$0</div>
            <div className="sn-sub">up to 30% APY</div>
          </div>
          <div className="split-node reserve">
            <div className="sn-lbl">IL Shield reserve</div>
            <div className="sn-val" id="snReserve">$0</div>
            <div className="sn-sub">protects principal</div>
          </div>
          <div className="split-node proto">
            <div className="sn-lbl">Protocol</div>
            <div className="sn-val" id="snProto">$0</div>
            <div className="sn-sub">fee + share of excess</div>
          </div>
        </div>
      </div>
    </div>

    <button className="deploy-btn" id="deployBtn">▶ Deploy liquidity</button>
    <div className="hood-note">
      Illustrative schematic of the strategy logic  representative levels, not live market data.
    </div>
  </div>
);

export default UnderTheHoodCard;
