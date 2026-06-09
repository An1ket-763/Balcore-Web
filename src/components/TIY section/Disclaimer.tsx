const Disclaimer = () => (
  <div className="disclaimer reveal" style={{ animationDelay: ".55s" }}>
    <span className="ic">ⓘ</span> <b>How to read this.</b> The waterfall mirrors the protocol's business model:
    gross yield is collected, <b>impermanent loss is covered first</b>, a <b>5% protocol fee</b> is taken on the
    remainder, and users are paid up to a <b>30% APY cap</b>. Anything above that cap is excess, split{" "}
    <b>70% to the Backup Reserve</b> and <b>30% to Protocol Revenue</b>. Figures are illustrative, built from the
    core strategy run manually with real capital over roughly the past year  a model of expected behaviour,{" "}
    <b>not a guarantee of returns</b>. The protocol is in development; nothing here is investment advice.
  </div>
);

export default Disclaimer;
