import NavBar from "@/components/sections/NavBar";
import { useEffect } from "react";

const styles = `
  .jr-root {
    --bg: #0a0717;
    --bg-card: #14102a;
    --bg-card-hover: #1a1535;
    --border: #2a2148;
    --text: #e8e6f0;
    --text-dim: #9a96b3;
    --accent: #a374ff;
    --accent-bright: #b88dff;
    --accent-glow: rgba(163, 116, 255, 0.15);
    --teal: #3ee0c8;
    --orange: #f5a623;
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
  }
  .jr-root * { box-sizing: border-box; }
  .jr-hero { padding: 100px 48px 60px; max-width: 1100px; margin: 0 auto; text-align: center; }
  .jr-eyebrow { color: var(--accent); font-size: 13px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 20px; font-weight: 500; }
  .jr-hero h1 { font-size: clamp(40px, 6vw, 72px); font-weight: 800; line-height: 1.05; letter-spacing: -1.5px; margin-bottom: 24px; }
  .jr-hero h1 .highlight { color: var(--accent); }
  .jr-hero .subtitle { font-size: 20px; color: var(--text-dim); max-width: 720px; margin: 0 auto; }
  .jr-container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
  .jr-section { padding: 60px 0; }
  .jr-section-label { color: var(--accent); font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; font-weight: 500; }
  .jr-section h2 { font-size: 36px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.5px; }
  .jr-section .lead { font-size: 17px; color: var(--text-dim); margin-bottom: 40px; max-width: 720px; }
  .jr-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
  .jr-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 28px; transition: all 0.25s ease; }
  .jr-card:hover { background: var(--bg-card-hover); border-color: var(--accent); transform: translateY(-2px); }
  .jr-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 10px; color: var(--text); }
  .jr-card p { font-size: 14px; color: var(--text-dim); line-height: 1.65; }
  .jr-card .num { color: var(--accent); font-family: 'SF Mono', Monaco, monospace; font-size: 13px; margin-bottom: 14px; display: block; }
  .jr-work-list { list-style: none; padding: 0; display: grid; gap: 14px; }
  .jr-work-list li { background: var(--bg-card); border: 1px solid var(--border); border-left: 3px solid var(--accent); padding: 18px 24px; border-radius: 8px; font-size: 15px; color: var(--text); transition: all 0.2s; }
  .jr-work-list li:hover { background: var(--bg-card-hover); border-left-color: var(--accent-bright); }
  .jr-work-list li strong { color: var(--accent-bright); font-weight: 600; }
  .jr-why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
  .jr-why-card { background: linear-gradient(135deg, var(--bg-card) 0%, rgba(163, 116, 255, 0.05) 100%); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
  .jr-why-card h4 { color: var(--accent-bright); font-size: 15px; font-weight: 600; margin-bottom: 8px; }
  .jr-why-card p { font-size: 14px; color: var(--text-dim); }
  .jr-apply { background: linear-gradient(135deg, rgba(163, 116, 255, 0.08) 0%, rgba(62, 224, 200, 0.04) 100%); border: 1px solid var(--border); border-radius: 16px; padding: 48px; margin: 40px 0 80px; text-align: center; }
  .jr-apply h2 { font-size: 32px; margin-bottom: 16px; }
  .jr-apply-steps { text-align: left; max-width: 600px; margin: 32px auto; display: grid; gap: 16px; }
  .jr-apply-step { display: flex; gap: 16px; align-items: flex-start; }
  .jr-apply-step .step-num { background: var(--accent); color: var(--bg); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
  .jr-apply-step .step-text { color: var(--text); font-size: 15px; padding-top: 3px; }
  .jr-cta { display: inline-block; background: var(--accent); color: var(--bg); text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px; margin-top: 24px; transition: all 0.2s; box-shadow: 0 8px 30px var(--accent-glow); }
  .jr-cta:hover { background: var(--accent-bright); transform: translateY(-1px); box-shadow: 0 12px 40px rgba(163, 116, 255, 0.3); }
  .jr-alt-contact { margin-top: 20px; color: var(--text-dim); font-size: 14px; }
  .jr-alt-contact a { color: var(--accent); text-decoration: none; }
  .jr-alt-contact a:hover { text-decoration: underline; }
  .jr-footer { border-top: 1px solid var(--border); padding: 32px 48px; text-align: center; color: var(--text-dim); font-size: 13px; }
  @media (max-width: 1180px) {
    .jr-root { padding-bottom: calc(180px + env(safe-area-inset-bottom, 0px)); }
    .jr-root::after { content: ""; display: block; height: calc(120px + env(safe-area-inset-bottom, 0px)); }
    .jr-apply { margin-bottom: 96px; }
    .jr-footer { margin-bottom: env(safe-area-inset-bottom, 0px); }
  }
  @media (max-width: 768px) {
    .jr-hero { padding: 120px 24px 40px; }
    .jr-section { padding: 40px 0; }
    .jr-container { padding: 0 24px; }
    .jr-apply { padding: 32px 24px; margin: 20px 0 96px; }
    .jr-footer { padding: 24px; }
  }
`;

const JoinResearch = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <NavBar />
      <div className="jr-root">
        <style>{styles}</style>

      <section className="jr-hero">
        <div className="jr-eyebrow">Research Team</div>
        <h1>Design the next generation of <span className="highlight">on-chain liquidity.</span></h1>
        <p className="subtitle">Balcore is building the research stack behind structural IL protection  price range structure, CVD, order flow, volatility regimes, and ML-driven rebalancing. If you live and breathe DeFi, we want to hear from you.</p>
      </section>

      <div className="jr-container">
        <section className="jr-section">
          <div className="jr-section-label">01  Who we're looking for</div>
          <h2>Builders with conviction.</h2>
          <p className="lead">You don't need every one of these. You need at least one  and the curiosity to grow into the rest.</p>
          <div className="jr-grid">
            {[
              ["/ 01", "Deep DeFi understanding", "You've LP'd. You know why IL hurts. You've thought hard about AMM design, concentrated liquidity, and MEV."],
              ["/ 02", "Price range structure", "Weekly ranges, pivot structures, vWAP regimes, Monday Range Theory  you read structure, not candles."],
              ["/ 03", "CVD & order flow", "Cumulative volume delta, footprint, absorption, aggressive vs. passive flow  you understand what's actually moving price."],
              ["/ 04", "Quant / ML background", "You've built models for volatility forecasting, market microstructure, regime detection, or capital allocation."],
              ["/ 05", "On-chain data fluency", "Dune, Flipside, subgraphs, raw node data  you can pull signal out of noise without hand-holding."],
              ["/ 06", "Researcher mindset", "You'd rather test 50 hypotheses than defend one. Curiosity over ego, every time."],
            ].map(([num, title, desc]) => (
              <div className="jr-card" key={num}>
                <span className="num">{num}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="jr-section">
          <div className="jr-section-label">02  What you'll work on</div>
          <h2>Real problems, real capital.</h2>
          <p className="lead">Every block is a new data point. Every trade a signal. You'll ship research to mainnet, not a paper.</p>
          <ul className="jr-work-list">
            <li><strong>Structural IL models</strong>  designing liquidity provision that minimizes impermanent loss upstream, not reactively.</li>
            <li><strong>Price structure research</strong>  Monday Range Theory, weekly pivot models, vWAP regimes, and the signals that come after.</li>
            <li><strong>CVD & order flow integration</strong>  bringing TradFi-grade microstructure analysis into on-chain liquidity decisions.</li>
            <li><strong>ML on live on-chain data</strong>  back-testing and shipping models that price risk and predict rebalancing windows.</li>
            <li><strong>Risk engine & circuit breakers</strong>  building the systems that detect Oct-10-type events before they hit positions.</li>
            <li><strong>Reserve & vault logic</strong>  shaping how protocol revenue funds IL coverage and rainy-day reserves.</li>
            <li><strong>Public research</strong>  publishing the work that pushes DeFi liquidity forward as a whole.</li>
          </ul>
        </section>

        <section className="jr-section">
          <div className="jr-section-label">03  Why Balcore</div>
          <h2>The fastest research lab in finance.</h2>
          <div className="jr-why-grid">
            <div className="jr-why-card"><h4>Rapid feedback loop</h4><p>DeFi is the fastest ML lab in the world. Ideas ship to mainnet, not to a journal.</p></div>
            <div className="jr-why-card"><h4>Real capital, real stakes</h4><p>Your models move real liquidity. No paper portfolios, no toy datasets.</p></div>
            <div className="jr-why-card"><h4>Small, sharp team</h4><p>No bureaucracy. No committees. Researchers ship and own their work end-to-end.</p></div>
            <div className="jr-why-card"><h4>Skin in the game</h4><p>Meaningful equity and token allocation for core research contributors.</p></div>
          </div>
        </section>

        <section className="jr-apply">
          <div className="jr-section-label">04  Apply</div>
          <h2>Tell us how you think.</h2>
          <p style={{ color: "var(--text-dim)", maxWidth: 560, margin: "0 auto" }}>We don't care about polished resumes. We care about how you reason and what you've built.</p>

          <div className="jr-apply-steps">
            <div className="jr-apply-step">
              <div className="step-num">1</div>
              <div className="step-text">A short note on <strong style={{ color: "var(--accent-bright)" }}>why DeFi liquidity research excites you.</strong></div>
            </div>
            <div className="jr-apply-step">
              <div className="step-num">2</div>
              <div className="step-text">Anything you've built, written, or broken  GitHub, Dune dashboards, X threads, papers, LP PnL screenshots, whatever shows how you think.</div>
            </div>
            <div className="jr-apply-step">
              <div className="step-num">3</div>
              <div className="step-text">One idea you'd want to test at Balcore in your first 30 days.</div>
            </div>
          </div>

          <a href="mailto:research@balcore.xyz" className="jr-cta">Apply to Research Team →</a>

          <div className="jr-alt-contact">
            Or DM us on X  <a href="https://x.com/Balcore_ai" target="_blank" rel="noreferrer">@Balcore_ai</a><br />
            <span style={{ fontSize: 13 }}>We read every application. If there's a fit, you'll hear back within 5 days.</span>
          </div>
        </section>
      </div>

      <footer className="jr-footer">
        © 2026 Balcore  Build the future of on-chain liquidity.
      </footer>
    </div>
    </>
  );
};

export default JoinResearch;
