import { useEffect } from "react";
import NavBar from "@/components/sections/NavBar";
import Footer from "@/components/sections/Footer";
import "./BusinessPerspective.css";

const BusinessPerspective = () => {
  useEffect(() => {
    const progress = document.getElementById("bp-progress");
    const updateProgress = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (progress) progress.style.width = (max ? Math.min(100, (h.scrollTop / max) * 100) : 0) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const handleCopyLink = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    try {
      await navigator.clipboard.writeText(location.href);
      const old = btn.textContent;
      btn.textContent = "Link copied";
      setTimeout(() => (btn.textContent = old), 1500);
    } catch {
      btn.textContent = "Copy unavailable";
    }
  };

  return (
    <>
      <NavBar />
      <div className="bp-root">
      <div className="bp-progress" id="bp-progress" aria-hidden="true"></div>

      <main className="bp-shell" id="main">
        <section className="bp-hero">
          <div className="bp-hero-main">
            <div className="bp-eyebrow">BUSINESS PERCEPTION · THESIS MEMO</div>
            <h1>
              Five years of wreckage.<span>Five years of inevitability.</span>
            </h1>
            <p className="bp-deck">
              Crypto's biggest failures exposed the same old business sins:{" "}
              <strong>leverage, custody, and opacity.</strong> Meanwhile, public chains kept settling,
              institutions kept building, and tokenized assets moved from pilot to production. The next
              bottleneck is not issuance. It is liquidity.
            </p>
            <div className="bp-meta-row">
              <span>Balcore · July 18, 2026</span>
              <span>~10 min read</span>
              <span className="bp-pill">Perspective, not investment advice</span>
              <span className="bp-pill">Last fact-checked July 18, 2026</span>
            </div>
            <div className="bp-hero-actions">
              <button className="bp-action" onClick={handleCopyLink}>Copy article link</button>
              <button className="bp-action" onClick={() => window.print()}>Print / Save PDF</button>
            </div>
          </div>
          <aside className="bp-aside bp-hero-aside" aria-label="Article contents">
            <div className="bp-label">IN THIS MEMO</div>
            <a href="#wreckage">01 · What broke</a>
            <a href="#rails">02 · What changed</a>
            <a href="#clarity">CLARITY status</a>
            <a href="#tokenization">Tokenization thesis</a>
            <a href="#liquidity">03 · Liquidity layer</a>
            <a href="#balcore">Where Balcore stands</a>
            <a href="#sources">Sources</a>
          </aside>
        </section>

        <section className="bp-thesis-grid">
          <div className="bp-thesis">
            <div className="bp-n">01 · WHAT BROKE</div>
            <h3>Business models</h3>
            <p>Reflexive yield, hidden leverage, rehypothecation, and opaque custody—not block production.</p>
          </div>
          <div className="bp-thesis">
            <div className="bp-n">02 · WHAT SURVIVED</div>
            <h3>The settlement rails</h3>
            <p>Public ledgers continued processing while centralized balance sheets failed around them.</p>
          </div>
          <div className="bp-thesis">
            <div className="bp-n">03 · WHAT CHANGED</div>
            <h3>Institutional commitment</h3>
            <p>Tokenization moved from presentations into regulated pilots, production trades, and legislation.</p>
          </div>
          <div className="bp-thesis">
            <div className="bp-n">04 · WHAT COMES NEXT</div>
            <h3>Liquidity infrastructure</h3>
            <p>A token is not automatically a market. Every new instrument still needs disciplined two-sided liquidity.</p>
          </div>
        </section>

        <div className="bp-layout">
          <article className="bp-copy">
            <section id="wreckage">
              <div className="bp-section-label red">
                PART I · 2021–2026 · THE DOWNSIDE — THE FACTORS THAT WERE RESPONSIBLE
              </div>
              <h2>The failures were familiar. The rails were new.</h2>
              <p className="bp-thesis-p">
                Read this part as the autopsy: <strong>why the market has bled for five years.</strong> Every
                collapse below traces to the same responsible layer — the{" "}
                <strong>centralized, leveraged, opaque businesses built <em>around</em> the blockchains</strong>{" "}
                — never to the chains themselves. Name the culprit correctly and the whole downturn becomes legible.
              </p>
              <p>
                Ask why crypto suffered and the easy answer is that "crypto did not work." The more useful answer
                is narrower:{" "}
                <strong>
                  many of the largest catastrophes were failures of the businesses built around blockchains
                </strong>
                —leverage, custody, disclosure, and incentives. That distinction matters because it tells us what
                must be rebuilt and what does not.
              </p>

              <div className="bp-timeline">
                <div className="bp-event danger">
                  <div className="bp-date">MAY 2022</div>
                  <h3>Terra / LUNA — yield without durable income</h3>
                  <p>
                    Terra paired an algorithmic stablecoin with reflexive collateral and promoted roughly 20%
                    yield through Anchor. When confidence broke, the peg and collateral collapsed together,
                    wiping out roughly $40 billion in market value.<sup><a href="#s8">8</a></sup> The lesson was
                    not that software cannot settle value. It was that{" "}
                    <strong>a payout is not revenue simply because a protocol labels it yield.</strong>
                  </p>
                </div>

                <div className="bp-event danger">
                  <div className="bp-date">JUNE–JULY 2022</div>
                  <h3>The contagion — leverage hidden behind a login screen</h3>
                  <p>
                    Celsius, Three Arrows Capital, Voyager, and BlockFi exposed a daisy chain of rehypothecation
                    and concentrated risk. Customers saw account balances. They did not see the same collateral
                    pledged again, the same counterparties repeated, or the liquidation points underneath the
                    product.
                  </p>
                </div>

                <div className="bp-event danger">
                  <div className="bp-date">NOVEMBER 2022</div>
                  <h3>FTX — the cathedral was hollow</h3>
                  <p>
                    FTX's collapse was not a consensus failure. U.S. prosecutors proved a multibillion-dollar
                    fraud involving the misappropriation of customer funds.<sup><a href="#s7">7</a></sup>{" "}
                    Transparent, segregated on-chain custody would not make fraud impossible, but it would make
                    this kind of balance-sheet hole materially harder to conceal.
                  </p>
                </div>

                <div className="bp-event">
                  <div className="bp-date">2021–2024</div>
                  <h3>Regulation by enforcement — uncertainty became a business risk</h3>
                  <p>
                    Major exchanges and projects faced enforcement before the United States had a complete
                    market-structure framework. Critics argued this left consumers exposed and pushed activity
                    offshore; regulators argued existing investor-protection laws still applied. Whatever side
                    you take,{" "}
                    <strong>
                      the absence of clear classification and operating rules raised the cost of building
                      responsibly.
                    </strong>
                  </p>
                </div>

                <div className="bp-event danger">
                  <div className="bp-date">OCTOBER 10–11, 2025</div>
                  <h3>The great flush — leverage met thin liquidity</h3>
                  <p>
                    More than $19 billion of leveraged positions were liquidated in roughly 24 hours, the largest
                    crypto liquidation event reported at the time.<sup><a href="#s6">6</a></sup> No conspiracy
                    is required to explain the mechanism: a macro shock hits, order books thin, forced selling
                    pushes price into the next liquidation, and the cascade feeds itself.{" "}
                    <strong>Visible leverage becomes harvestable leverage.</strong>
                  </p>
                </div>

                <div className="bp-event">
                  <div className="bp-date">2025–2026</div>
                  <h3>The macro whip — price and progress separated</h3>
                  <p>
                    Tariffs, war risk, oil shocks, and changing rate expectations repeatedly hit the most
                    reflexive market first. Bitcoin traded above $120,000 and later returned to roughly $64,000.
                    Ethereum fell below $1,900. At the same time, institutional tokenization projects
                    accelerated.{" "}
                    <strong>
                      The market repriced the assets while the infrastructure kept advancing.
                    </strong>
                  </p>
                </div>
              </div>

              <div className="bp-pull">
                The recurring pattern was not a blockchain-consensus failure. It was leverage, custody,
                opacity—and business models that spent tomorrow's liquidity today.
              </div>
            </section>

            <section id="rails">
              <div className="bp-section-label">
                PART II · 2026–2031 · THE PROSPECT — THE FACTORS LIKELY TO DRIVE THE GROWTH
              </div>
              <h2>While prices collapsed, the thesis moved into production.</h2>
              <p className="bp-thesis-p">
                Now flip the lens. With the responsible layer burned away and rules finally being written, here
                is <strong>the growth path</strong>: tokenization pulling every asset on-chain, CLARITY opening
                the institutional gate, and continuous market making becoming the base-layer job of finance.
              </p>
              <p>
                Public-chain adoption is no longer measured only by token prices or conference announcements.
                Tokenized U.S. Treasury products now represent nearly $16 billion. DTCC has converted custodied
                assets into tokens used in real production trades and plans a broader service launch in October
                2026.<sup><a href="#s2">2</a></sup><sup><a href="#s5">5</a></sup> The organizations moving are
                not fringe startups. They are the institutions that already sit inside the plumbing of global
                finance.
              </p>

              <div className="bp-proof">
                <div className="bp-proof-card">
                  <div className="bp-tag">REGULATED INFRASTRUCTURE</div>
                  <h3>DTCC moved from pilot to production trades</h3>
                  <p>
                    Treasury/repo, equity delivery-versus-payment, token transfers, and margin workflows were
                    tested using DTC-tokenized assets.
                  </p>
                </div>
                <div className="bp-proof-card">
                  <div className="bp-tag">REAL ASSETS</div>
                  <h3>Treasuries became the first scalable category</h3>
                  <p>
                    They were standardized, liquid, and easy to price. Their growth proves demand for
                    programmable ownership—but not yet deep secondary liquidity.
                  </p>
                </div>
              </div>

              <h3 id="clarity">The CLARITY Act — meaningful progress, unfinished law</h3>
              <p>
                The House passed the Digital Asset Market Clarity Act 294–134 in July 2025.
                <sup><a href="#s3">3</a></sup> In May 2026, the Senate Banking Committee advanced its version
                15–9.<sup><a href="#s4">4</a></sup> That is real bipartisan movement. It is also{" "}
                <strong>not the same as enactment.</strong> A Senate floor vote, negotiations with the
                Agriculture Committee, reconciliation with the House text, and presidential signature still
                remain.
              </p>

              <div className="bp-status">
                <div>
                  <div className="bp-step">LEGISLATIVE STATUS · JULY 18, 2026</div>
                  <h3>Advanced, but not law</h3>
                  <p>
                    The direction is clearer than it was five years ago. The timing is not. Consumer protection,
                    illicit-finance controls, DeFi treatment, and political ethics remain live disputes.
                    <sup><a href="#s9">9</a></sup>
                  </p>
                </div>
                <div className="bp-status-badge">FLOOR VOTE PENDING</div>
              </div>

              <h3 id="tokenization">Tokenization changes the cost curve</h3>
              <p>
                Stocks, bonds, Treasuries, fund shares, private credit, commodities, and real estate can all be
                represented on shared ledgers. The business case is practical: potentially faster settlement
                than today's T+1 standard, extended trading hours, programmable collateral, fractional
                ownership, and fewer reconciliations between disconnected databases.
              </p>

              <div className="bp-counter">
                <div className="bp-tag">THE IMPORTANT COUNTERPOINT</div>
                <h3>A token is not automatically a liquid market.</h3>
                <p>
                  Issuance creates an instrument. It does not create tight spreads, continuous bids, resilient
                  depth, or orderly exits. Tokenization and liquidity are separate achievements. That gap is
                  exactly where market-making infrastructure becomes essential.
                </p>
              </div>
            </section>

            <section id="liquidity">
              <div className="bp-section-label">PART III · THE STRUCTURAL CONSEQUENCE</div>
              <h2>More assets, longer hours, fewer human limits.</h2>
              <p>
                Tokenize thousands of instruments and extend their availability toward 24/7 markets, and a
                simple constraint appears: human desks do not scale linearly with the number of markets. Every
                tokenized stock, bond, fund, ounce of gold, or private-credit position still needs someone—or
                something—standing there with inventory, quoting both sides, managing adverse selection, and
                surviving volatility.
              </p>
              <p>
                <strong>Liquidity provision becomes part of the base infrastructure.</strong> The picks and
                shovels of tokenization are not only the chains or the tokens. They are the systems that make
                those assets tradable—and the disciplined capital that earns spreads and fees for doing the
                work.
              </p>
            </section>

            <section className="bp-balcore" id="balcore">
              <div className="bp-tag">WHERE BALCORE STANDS</div>
              <h2>We are building for the market after tokenization.</h2>
              <p>
                Balcore is designed to put asset holders in the market maker's seat through a rules-based engine
                that provides two-sided liquidity, accounts for impermanent loss as a recurring obligation,
                settles that obligation from realized income before distributions, and works to restore the
                asset and dollar composition of the vault.
              </p>
              <p>
                The public simulator shows a simplified floor model. The production engine's placement logic,
                signals, and calibration remain proprietary. We publish what the process produces. We do not
                publish the recipe that produces it.
              </p>

              <div className="bp-validation">
                <div>
                  <b>Multiple regimes</b>
                  <span>Crash, bear, chop, melt-up, and round trip</span>
                </div>
                <div>
                  <b>Visible accounting</b>
                  <span>Fees, IL invoices, distributions, and surplus</span>
                </div>
                <div>
                  <b>Unfavorable result included</b>
                  <span>The case where holding wins stays published</span>
                </div>
              </div>

              <div className="bp-disprove">
                <h3>What would prove the thesis wrong</h3>
                <ul>
                  <li>Fees fail to exceed impermanent loss and execution costs across realistic market regimes.</li>
                  <li>Asset counts cannot be restored without hidden leverage, external subsidies, or unpriced risk.</li>
                  <li>Live slippage, gas, and liquidity capacity erase the modeled edge.</li>
                </ul>
              </div>

              <div className="bp-cta-row">
                <strong>
                  Do not trust the backtest.
                  <br />
                  Throw your own market at it.
                </strong>
                <a href="/simulator">
                  Open the Simulator <span aria-hidden="true">→</span>
                </a>
              </div>
            </section>

            <details className="bp-sources" id="sources">
              <summary>Sources and fact-check notes</summary>
              <ol>
                <li id="s1"><a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">CoinGecko global market snapshot</a>, accessed July 18, 2026. Prices and market capitalization change continuously.</li>
                <li id="s2"><a href="https://app.rwa-xyz.com/treasuries" target="_blank" rel="noopener noreferrer">RWA.xyz tokenized U.S. Treasuries dashboard</a>, July 18, 2026.</li>
                <li id="s3"><a href="https://www.congress.gov/bill/119th-congress/house-bill/3633/all-actions" target="_blank" rel="noopener noreferrer">Congress.gov actions for H.R. 3633</a>, including the House vote of 294–134.</li>
                <li id="s4"><a href="https://www.banking.senate.gov/newsroom/majority/chairman-scott-senate-banking-committee-advance-clarity-act-in-historic-bipartisan-vote" target="_blank" rel="noopener noreferrer">U.S. Senate Banking Committee</a>, May 14, 2026, reporting a 15–9 committee vote.</li>
                <li id="s5"><a href="https://www.dtcc.com/news/2026/july/15/dtcc-turns-tokenization-into-reality" target="_blank" rel="noopener noreferrer">DTCC production tokenization announcement</a>, July 15, 2026.</li>
                <li id="s6"><a href="https://www.reuters.com/world/asia-pacific/after-record-crypto-crash-rush-hedge-against-another-freefall-2025-10-13/" target="_blank" rel="noopener noreferrer">Reuters</a>, October 13, 2025, on the record liquidation cascade.</li>
                <li id="s7"><a href="https://www.justice.gov/archives/opa/pr/samuel-bankman-fried-sentenced-25-years-his-orchestration-multiple-fraudulent-schemes" target="_blank" rel="noopener noreferrer">U.S. Department of Justice</a>, March 28, 2024, on the FTX fraud and misappropriation of customer funds.</li>
                <li id="s8"><a href="https://www.sec.gov/comments/s7-2024-05/s7202405-533076-1528863.pdf" target="_blank" rel="noopener noreferrer">SEC public filing discussing the Terra collapse</a> and approximately $40 billion in lost market value.</li>
                <li id="s9"><a href="https://www.banking.senate.gov/newsroom/minority/national-security-advisory-clarity-act-fails-to-address-key-vulnerabilities-exploited-by-criminals-terrorists-and-foreign-adversaries" target="_blank" rel="noopener noreferrer">Senate Banking Committee minority view</a>, included to represent material objections to the legislation.</li>
              </ol>
            </details>

            <p className="bp-footer-note">
              PERSPECTIVE, NOT ADVICE — This article expresses Balcore's business thesis as of July 18, 2026.
              Market figures are timestamped and approximate. Legislative status changes quickly. Nothing here
              is investment, legal, or tax advice. Backtests and simulations are modeled results, not guarantees
              of live performance.
            </p>
          </article>
        </div>
      </main>
      </div>
      <Footer />
    </>
  );
};

export default BusinessPerspective;
