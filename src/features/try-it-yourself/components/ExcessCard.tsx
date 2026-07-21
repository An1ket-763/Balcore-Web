const ExcessCard = () => (
  <div className="card excess-card reveal" id="excessCard" style={{ animationDelay: ".5s" }}>
    <h3>Where the excess goes</h3>
    <p className="excess-intro">
      Strong weeks generate more yield than the 30% user cap can absorb. That surplus is the protocol's two-sided
      upside  it splits <b>70% to the Backup Reserve</b> (which funds the IL Shield) and{" "}
      <b>30% to Protocol Revenue</b>.
    </p>
    <div className="excess-grid">
      <div className="ebox">
        <div className="ebox-lbl">Excess yield this week</div>
        <div className="ebox-amt" id="excessTotal">$0</div>
        <div className="ebox-sub">above the user cap</div>
      </div>
      <div className="ebox reserve">
        <div className="ebox-lbl">70% → Backup Reserve</div>
        <div className="ebox-amt" id="reserveAmt">$0</div>
        <div className="ebox-sub">strengthens IL Shield</div>
      </div>
      <div className="ebox protocol">
        <div className="ebox-lbl">30% → Protocol Revenue</div>
        <div className="ebox-amt" id="protoAmt">$0</div>
        <div className="ebox-sub">
          + 5% base fee = <span id="protoTotal">$0</span>/wk
        </div>
      </div>
    </div>
    <div className="capbar-wrap">
      <div className="capbar">
        <div className="capbar-fill user" id="capUser" style={{ width: "60%" }}></div>
        <div className="capbar-fill excess" id="capExcess" style={{ width: "40%" }}></div>
      </div>
      <div className="capbar-key">
        <span><i style={{ background: "var(--green)" }}></i> To users (capped)</span>
        <span><i style={{ background: "var(--gold)" }}></i> Excess (reserve + protocol)</span>
      </div>
    </div>
  </div>
);

export default ExcessCard;
