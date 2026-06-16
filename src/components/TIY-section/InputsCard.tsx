const ASSETS: Array<{ id: string; label: string; active?: boolean }> = [
  { id: "btc", label: "BTC", active: true },
  { id: "eth", label: "ETH" },
  { id: "avax", label: "AVAX" },
  { id: "sol", label: "SOL" },
  { id: "nvda", label: "NVIDIA" },
  { id: "tsla", label: "Tesla" },
  { id: "gold", label: "Gold" },
  { id: "link", label: "LINK" },
];

const InputsCard = () => (
  <div className="card reveal" style={{ animationDelay: ".3s" }}>
    <h3>Your Inputs</h3>

    <div className="slider-block asset-block">
      <div className="slider-head">
        <span className="slider-label">Asset pair</span>
        <span className="slider-value" id="pairVal" style={{ fontSize: 19 }}>
          BTC / USD
        </span>
      </div>
      <div className="asset-grid" id="assetGrid">
        {ASSETS.map((a) => (
          <button key={a.id} className={`asset-btn${a.active ? " active" : ""}`} data-id={a.id}>
            {a.label}
          </button>
        ))}
      </div>
      <span className="asset-note" id="assetNote">
        Steady major. Predictable base yield, moderate IL.
      </span>
    </div>

    <div className="slider-block">
      <div className="slider-head">
        <span className="slider-label">Capital deployed</span>
        <span className="slider-value" id="capVal">$5M</span>
      </div>
      <input type="range" id="capital" min={25000} max={5000000} step={25000} defaultValue={5000000} />
      <div className="scale-row"><span>$25K</span><span>$5M</span></div>
    </div>

    <div className="slider-block">
      <div className="slider-head">
        <span className="slider-label">How the week went</span>
        <span className="slider-value gold" id="weekVal">Typical</span>
      </div>
      <input type="range" id="week" min={0} max={100} step={1} defaultValue={50} />
      <div className="scale-row"><span>Quiet / choppy</span><span>High volatility</span></div>
      <span className="week-tag" id="weekTag" style={{ color: "var(--gold)" }}>
        Typical trading week
      </span>
    </div>
  </div>
);

export default InputsCard;
