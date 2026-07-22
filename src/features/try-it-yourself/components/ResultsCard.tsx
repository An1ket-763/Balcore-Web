const ResultsCard = () => (
  <div className="card result-card reveal" style={{ animationDelay: ".4s" }}>
    <div className="result-headline">
      <div className="lbl">Your weekly earnings</div>
      <div className="big-number" id="weeklyProfit">+$0</div>
      <div className="apy-line">
        ≈ <b className="apy-pill" id="apy">30% APY</b> annualized &nbsp;·&nbsp;{" "}
        <span id="capNote">within the 30% user cap</span>
      </div>
    </div>

    <div className="breakdown">
      <div className="brow"><span className="k">Gross yield collected</span><span className="v pos" id="gross">+$0</span></div>
      <div className="brow"><span className="k">1 · Impermanent loss covered first</span><span className="v shield" id="ilcov">−$0</span></div>
      <div className="brow"><span className="k">2 · Protocol fee (5% of gross)</span><span className="v neg" id="fee">−$0</span></div>
      <div className="brow"><span className="k">3 · Paid to you (capped 30% APY)</span><span className="v pos" id="userpay">+$0</span></div>
    </div>

    <div className="annual">
      <div className="lbl">If a year ran at this rate</div>
      <div className="amt" id="annual">$0</div>
      <small>Your share  illustrative, real returns vary week to week</small>
    </div>
  </div>
);

export default ResultsCard;
