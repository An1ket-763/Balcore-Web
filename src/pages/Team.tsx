import NavBar from "@/components/sections/NavBar";
import jonyImg from "@/assets/images/Jony_pfp.avif";
import amitImg from "@/assets/images/Amit_pfp.jpg";
import alpImg from "@/assets/images/Alp_pfp.jpg";
import ranaImg from "@/assets/images/Rana_pfp.png";
import { useEffect } from "react";

const styles = `
  .team-root { --bg:#08080f; --bg2:#0d0c1a; --purple:#7c3aed; --p3:#9f5fff;
    --text:#f1eeff; --muted:rgba(241,238,255,.55); --border:rgba(124,58,237,.18);
    background:var(--bg); color:var(--text);
    font-family:'Barlow', system-ui, sans-serif;
    min-height:100vh; overflow-x:hidden; position:relative;
  }
  .team-root *, .team-root *::before, .team-root *::after { box-sizing:border-box; }
  .team-root #team-bg-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.6; }
  .team-root .page { position:relative; z-index:10; padding-top:90px; }

  .team-root .hero-section{ min-height:82vh; display:flex; flex-direction:column; justify-content:center;
    padding:80px 56px; position:relative; overflow:hidden; border-bottom:.5px solid var(--border); }
  .team-root .hero-section::after{ content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 70% 60% at 80% 50%, rgba(124,58,237,.12) 0%, transparent 70%);
    pointer-events:none; }
  .team-root .hero-inner{ max-width:1200px; margin:0 auto; width:100%; display:grid;
    grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .team-root .hero-label{ font-size:10px; font-weight:700; letter-spacing:.18em; text-transform:uppercase;
    color:var(--p3); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
  .team-root .hero-label::before{ content:''; width:32px; height:1px; background:var(--p3); }
  .team-root .hero-title{ font-family:'Barlow Condensed',sans-serif; font-weight:900;
    font-size:clamp(52px,7vw,96px); line-height:.9; letter-spacing:-.02em; text-transform:uppercase; color:#fff; }
  .team-root .hero-title span{ color:var(--p3); display:block; }
  .team-root .hero-desc{ margin-top:32px; font-size:16px; line-height:1.75; color:var(--muted); max-width:480px; }
  .team-root .hero-desc p+p{ margin-top:16px; }
  .team-root .hero-visual{ position:relative; }

  .team-root .section{ padding:96px 56px; border-bottom:.5px solid var(--border); position:relative;
    scroll-margin-top:120px; }
  .team-root .section-inner{ max-width:1200px; margin:0 auto; }
  .team-root .two-col{ display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .team-root .two-col.reverse{ direction:rtl; }
  .team-root .two-col.reverse>*{ direction:ltr; }

  .team-root .sec-label{ font-size:10px; font-weight:700; letter-spacing:.15em; text-transform:uppercase;
    color:var(--p3); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
  .team-root .sec-label::before{ content:''; width:24px; height:1px; background:var(--p3); }
  .team-root .sec-title{ font-family:'Barlow Condensed',sans-serif; font-weight:800;
    font-size:clamp(40px,5vw,68px); line-height:.95; text-transform:uppercase; color:#fff;
    letter-spacing:-.01em; margin-bottom:14px; }
  .team-root .sec-role{ font-size:13px; font-weight:500; letter-spacing:.06em; color:var(--p3);
    text-transform:uppercase; margin-bottom:28px; }
  .team-root .sec-role .sep{ color:rgba(159,95,255,.4); margin:0 10px; }
  .team-root .sec-body{ font-size:15px; line-height:1.78; color:var(--muted); }
  .team-root .sec-body p+p{ margin-top:16px; }
  .team-root .sec-body strong{ color:var(--text); font-weight:600; }
  .team-root .sec-body em{ font-style:normal; color:var(--p3); font-weight:500; }
  .team-root .link-cta{ display:inline-flex; align-items:center; gap:8px; margin-top:28px;
    font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
    color:var(--p3); text-decoration:none; transition:gap .2s; cursor:pointer; }
  .team-root .link-cta:hover{ gap:14px; }

  .team-root .stats-row{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:48px; }
  .team-root .stat-card{ background:rgba(124,58,237,.06); border:.5px solid var(--border);
    border-radius:10px; padding:28px; transition:border-color .3s, background .3s; }
  .team-root .stat-card:hover{ border-color:rgba(124,58,237,.4); background:rgba(124,58,237,.1); }
  .team-root .stat-num{ font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:42px;
    color:#fff; letter-spacing:-.02em; line-height:1; }
  .team-root .stat-num span{ font-size:22px; color:var(--p3); }
  .team-root .stat-desc{ font-size:12px; color:var(--muted); margin-top:8px; letter-spacing:.04em; text-transform:uppercase; }

  .team-root .visual-box{ background:linear-gradient(135deg,rgba(124,58,237,.1) 0%,rgba(8,8,15,.8) 100%);
    border:.5px solid var(--border); border-radius:12px; padding:28px;
    display:flex; flex-direction:column; gap:20px; position:relative; overflow:hidden; }
  .team-root .visual-box::before{ content:''; position:absolute; top:-40px; right:-40px;
    width:200px; height:200px; border-radius:50%;
    background:radial-gradient(circle,rgba(124,58,237,.2) 0%,transparent 70%); pointer-events:none; }
  .team-root .portrait-frame{ position:relative; width:100%; aspect-ratio:4/5; border-radius:8px;
    overflow:hidden; border:.5px solid rgba(124,58,237,.25); background:#0a0a14; }
  .team-root .portrait-frame img{ width:100%; height:100%; object-fit:cover;
    filter:contrast(1.02) saturate(1.02); transition:transform 1.2s cubic-bezier(.2,.8,.2,1); display:block; }
  .team-root .portrait-frame:hover img{ transform:scale(1.04); }
  .team-root .portrait-frame::after{ content:''; position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(180deg,transparent 60%,rgba(8,8,15,.5) 100%); }
  .team-root .portrait-placeholder{ width:100%; height:100%;
    background:linear-gradient(135deg, rgba(124,58,237,.4), rgba(8,8,15,.9));
    display:flex; align-items:center; justify-content:center;
    font-family:'Barlow Condensed',sans-serif; font-weight:900; font-size:96px; color:#fff;
    letter-spacing:.05em; }

  .team-root .portrait-meta{ display:flex; justify-content:space-between; align-items:center; padding-top:4px; }
  .team-root .portrait-name-wrap{ display:flex; flex-direction:column; gap:2px; }
  .team-root .portrait-name{ font-family:'Barlow Condensed',sans-serif; font-weight:800; font-size:18px;
    color:#fff; letter-spacing:.04em; text-transform:uppercase; }
  .team-root .portrait-role-mini{ font-size:10.5px; color:var(--muted); letter-spacing:.08em; text-transform:uppercase; }
  .team-root .portrait-id{ font-family:'Barlow Condensed',sans-serif; font-weight:800; font-size:14px;
    color:var(--p3); letter-spacing:.1em; padding:4px 10px; border:.5px solid rgba(159,95,255,.3);
    border-radius:4px; background:rgba(124,58,237,.08); }
  .team-root .portrait-stats{ border-top:.5px solid rgba(124,58,237,.15); padding-top:16px;
    display:flex; flex-direction:column; gap:10px; }
  .team-root .pstat-row{ display:flex; justify-content:space-between; align-items:center; font-size:12px; }
  .team-root .pstat-label{ color:var(--muted); letter-spacing:.06em; text-transform:uppercase; font-size:10.5px; }
  .team-root .pstat-val{ color:#fff; font-family:'Barlow Condensed',sans-serif; font-weight:700;
    letter-spacing:.02em; font-size:13px; }
  .team-root .pstat-val .gold{ color:var(--p3); }
  .team-root .pstat-status{ display:flex; align-items:center; gap:6px; }
  .team-root .pstat-dot{ width:6px; height:6px; border-radius:50%; background:#22c55e;
    box-shadow:0 0 8px #22c55e; animation:team-blink 2s infinite; }

  .team-root .team-roster{ background:linear-gradient(135deg,rgba(124,58,237,.1) 0%,rgba(8,8,15,.8) 100%);
    border:.5px solid var(--border); border-radius:12px; padding:32px; position:relative; overflow:hidden; }
  .team-root .team-roster::before{ content:''; position:absolute; top:-40px; right:-40px;
    width:240px; height:240px; border-radius:50%;
    background:radial-gradient(circle,rgba(124,58,237,.22) 0%,transparent 70%); pointer-events:none; }
  .team-root .roster-head{ font-size:10px; font-weight:700; letter-spacing:.15em; text-transform:uppercase;
    color:var(--p3); margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; }
  .team-root .roster-list{ display:flex; flex-direction:column; gap:0; }
  .team-root .roster-row{ display:flex; align-items:center; gap:16px; padding:18px 0;
    border-bottom:.5px solid rgba(124,58,237,.12); transition:padding-left .3s;
    text-decoration:none; color:inherit; cursor:pointer; }
  .team-root .roster-row:last-child{ border-bottom:none; }
  .team-root .roster-row:hover{ padding-left:6px; }
  .team-root .roster-avatar{ width:48px; height:48px; border-radius:50%; overflow:hidden; flex-shrink:0;
    border:1.5px solid rgba(159,95,255,.35); background:#0a0a14; }
  .team-root .roster-avatar img{ width:100%; height:100%; object-fit:cover; display:block; }
  .team-root .roster-avatar-fallback{ width:100%; height:100%;
    background:linear-gradient(135deg, rgba(124,58,237,.5), rgba(8,8,15,.9));
    display:flex; align-items:center; justify-content:center; color:#fff;
    font-family:'Barlow Condensed',sans-serif; font-weight:800; font-size:18px; }
  .team-root .roster-info{ flex:1; min-width:0; }
  .team-root .roster-name{ font-family:'Barlow Condensed',sans-serif; font-weight:800; font-size:17px;
    color:#fff; letter-spacing:.03em; text-transform:uppercase; line-height:1.1; }
  .team-root .roster-role{ font-size:11.5px; color:var(--muted); letter-spacing:.05em; margin-top:2px; }
  .team-root .roster-tag{ font-family:'Barlow Condensed',sans-serif; font-weight:800; font-size:11px;
    color:var(--p3); letter-spacing:.12em; padding:4px 8px; border:.5px solid rgba(159,95,255,.3);
    border-radius:3px; flex-shrink:0; }
  .team-root .roster-footer{ margin-top:18px; padding-top:18px; border-top:.5px solid rgba(124,58,237,.15);
    display:flex; justify-content:space-between; align-items:center; font-size:11px; color:var(--muted);
    letter-spacing:.05em; text-transform:uppercase; }
  .team-root .roster-footer .live{ display:flex; align-items:center; gap:6px; color:#fff; font-weight:600; }
  .team-root .roster-footer .live::before{ content:''; width:6px; height:6px; border-radius:50%;
    background:#22c55e; box-shadow:0 0 8px #22c55e; animation:team-blink 2s infinite; }

  .team-root .quote-section{ padding:96px 56px;
    background:linear-gradient(135deg,rgba(124,58,237,.08) 0%,rgba(8,8,15,1) 60%);
    border-bottom:.5px solid var(--border); }
  .team-root .quote-inner{ max-width:900px; margin:0 auto; text-align:center; }
  .team-root .quote-text{ font-family:'Barlow Condensed',sans-serif; font-weight:700;
    font-size:clamp(28px,4vw,48px); line-height:1.15; color:#fff; letter-spacing:-.01em; text-transform:uppercase; }
  .team-root .quote-text em{ font-style:normal; color:var(--p3); }
  .team-root .quote-sub{ margin-top:24px; font-size:14px; color:var(--muted); line-height:1.7;
    max-width:640px; margin-left:auto; margin-right:auto; }

  .team-root .btn-launch{ display:inline-flex; align-items:center; gap:8px; background:var(--purple);
    color:#fff; border:none; border-radius:6px; font-family:'Barlow',sans-serif; font-weight:500;
    font-size:13px; letter-spacing:.04em; padding:9px 22px; cursor:pointer;
    transition:background .2s, transform .15s; }
  .team-root .btn-launch:hover{ background:var(--p3); transform:translateY(-1px); }

  .team-root .reveal{ opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
  .team-root .reveal.visible{ opacity:1; transform:translateY(0); }
  .team-root .reveal-delay-1{ transition-delay:.1s; }

  @keyframes team-blink { 0%,100%{opacity:1} 50%{opacity:.3} }

  @media (max-width:900px){
    .team-root .hero-section{ padding:60px 20px; }
    .team-root .hero-inner{ grid-template-columns:1fr; gap:48px; }
    .team-root .section{ padding:64px 20px; }
    .team-root .two-col{ grid-template-columns:1fr; gap:48px; }
    .team-root .two-col.reverse{ direction:ltr; }
    .team-root .stats-row{ grid-template-columns:1fr; gap:14px; margin-top:36px; }
    .team-root .quote-section{ padding:64px 20px; }
  }
`;

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Team = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".team-root .reveal").forEach((el) => obs.observe(el));

    // Hex canvas BG
    const c = document.getElementById("team-bg-canvas") as HTMLCanvasElement | null;
    if (!c) return () => obs.disconnect();
    const x = c.getContext("2d")!;
    const R = 40;
    let W = 0, H = 0, t = 0;
    let cells: { cx: number; cy: number; ph: number; sp: number; ba: number; ac: boolean }[] = [];
    let raf = 0;
    const build = () => {
      cells = [];
      const cw = R * 2, ch = Math.sqrt(3) * R;
      for (let col = -1; col < Math.ceil(W / (cw * 0.75)) + 2; col++)
        for (let row = -1; row < Math.ceil(H / ch) + 2; row++)
          cells.push({
            cx: col * cw * 0.75,
            cy: row * ch + (col % 2 ? ch / 2 : 0),
            ph: Math.random() * Math.PI * 2,
            sp: 0.002 + Math.random() * 0.004,
            ba: 0.008 + Math.random() * 0.022,
            ac: Math.random() < 0.08,
          });
    };
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; build(); };
    const hex = (cx: number, cy: number) => {
      x.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        if (i) x.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        else x.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      }
      x.closePath();
    };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      cells.forEach((h) => {
        const w = Math.sin(t * h.sp + h.ph), a = h.ba + 0.015 * w;
        hex(h.cx, h.cy);
        x.strokeStyle = h.ac ? `rgba(124,58,237,${(a * 1.6).toFixed(3)})` : `rgba(55,45,95,${a.toFixed(3)})`;
        x.lineWidth = 0.5;
        x.stroke();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => {
      obs.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="team-root">
      <style>{styles}</style>
      <NavBar />
      <canvas id="team-bg-canvas" />

      <div className="page">
        {/* HERO */}
        <section className="hero-section" id="overview">
          <div className="hero-inner">
            <div>
              <div className="hero-label">The Team</div>
              <h1 className="hero-title">
                Builders.<br />
                <span>Operators.</span>
                Researchers.
              </h1>
              <div className="hero-desc">
                <p>Balcore is built by a team that has spent decades shipping production systems — from semiconductor fabs and high-volume manufacturing to on-chain protocols and multi-market trading.</p>
                <p>We turn hard-earned engineering discipline into capital-efficient liquidity infrastructure: continuous balance, adaptive liquidity management, and yield optimization for AMM DEXs — with impermanent loss reduction at the core.</p>
              </div>
              <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a onClick={() => scrollTo("founder")} className="link-cta">
                  Meet the founders <Arrow />
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="team-roster">
                <div className="roster-head">
                  <span>Founding Team</span>
                  <span style={{ color: "var(--muted)", letterSpacing: ".1em" }}>Ø.01</span>
                </div>
                <div className="roster-list">
                  <a onClick={() => scrollTo("founder")} className="roster-row">
                    <div className="roster-avatar"><img src={jonyImg} alt="Jony Sarker" /></div>
                    <div className="roster-info">
                      <div className="roster-name">Jony Sarker</div>
                      <div className="roster-role">Founder · CEO · Chief Protocol Architect</div>
                    </div>
                    <div className="roster-tag">F-001</div>
                  </a>
                  <a onClick={() => scrollTo("engineering")} className="roster-row">
                    <div className="roster-avatar"><img src={amitImg} alt="Amit Surve" /></div>
                    <div className="roster-info">
                      <div className="roster-name">Amit Surve</div>
                      <div className="roster-role">Founding Team · Chief Technology Officer</div>
                    </div>
                    <div className="roster-tag">F-002</div>
                  </a>
                  <a onClick={() => scrollTo("research")} className="roster-row">
                    <div className="roster-avatar"><img src={alpImg} alt="Alp" /></div>
                    <div className="roster-info">
                      <div className="roster-name">Alp</div>
                      <div className="roster-role">Founding Team · Strategic Advisor, R&amp;D</div>
                    </div>
                    <div className="roster-tag">F-003</div>
                  </a>
                  <a onClick={() => scrollTo("capital")} className="roster-row">
                    <div className="roster-avatar"><img src={ranaImg} alt="Rana Mukherjee" /></div>
                    <div className="roster-info">
                      <div className="roster-name">Rana Mukherjee</div>
                      <div className="roster-role">Strategic Advisor · Risk &amp; Capital</div>
                    </div>
                    <div className="roster-tag">F-004</div>
                  </a>
                </div>
                <div className="roster-footer">
                  <span>4 Core Members · 1 Protocol</span>
                  <span className="live">Shipping</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ maxWidth: 1200, margin: "64px auto 0", width: "100%" }}>
            <div className="stats-row reveal">
              <div className="stat-card">
                <div className="stat-num">20<span>+ yrs</span></div>
                <div className="stat-desc">Combined engineering &amp; market experience</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">2<span> stacks</span></div>
                <div className="stat-desc">Silicon manufacturing · On-chain liquidity</div>
              </div>
              <div className="stat-card">
                <div className="stat-num">3<span> markets</span></div>
                <div className="stat-desc">Crypto · Equities · Cross-asset signal</div>
              </div>
            </div>
          </div>
        </section>

        {/* JONY */}
        <section className="section" id="founder">
          <div className="section-inner">
            <div className="two-col">
              <div className="reveal">
                <div className="sec-label">Founder &amp; CEO</div>
                <h2 className="sec-title">Jony Sarker</h2>
                <div className="sec-role">Founder <span className="sep">/</span> CEO <span className="sep">/</span> Chief Protocol Architect</div>
                <div className="sec-body">
                  <p>Jony Sarker is the Founder and CEO of <strong>Balcore, Inc.</strong>, where he is building decentralized infrastructure focused on continuous balance, adaptive liquidity management, and yield optimization for AMM DEXs — with impermanent loss reduction at the core.</p>
                  <p>With more than <strong>10 years at Intel Corporation</strong> and <strong>8+ years deeply involved in DeFi</strong>, Jony combines expertise from both semiconductor engineering and on-chain liquidity systems. At Intel, he specialized in <em>lithography</em>, <em>process development</em>, <em>yield optimization</em>, and <em>defect reduction</em> across high-volume manufacturing environments.</p>
                  <p>In DeFi, he has been an active operator across major protocols, focusing on concentrated liquidity strategies, on-chain risk analysis, and sustainable yield optimization.</p>
                  <p>Today, those two stacks converge at Balcore. As trillions of dollars in real-world and digital assets move on-chain through tokenization, Jony believes capital-efficient and risk-aware liquidity infrastructure will become foundational to the next generation of financial markets. <strong>Balcore is being built to help power that transition.</strong></p>
                </div>
              </div>
              <div className="reveal reveal-delay-1">
                <div className="visual-box" style={{ maxWidth: 440, marginLeft: "auto" }}>
                  <div className="portrait-frame"><img src={jonyImg} alt="Jony Sarker" /></div>
                  <div className="portrait-meta">
                    <div className="portrait-name-wrap">
                      <div className="portrait-name">Jony Sarker</div>
                      <div className="portrait-role-mini">Founder &amp; CEO</div>
                    </div>
                    <div className="portrait-id">F-001</div>
                  </div>
                  <div className="portrait-stats">
                    <div className="pstat-row"><span className="pstat-label">Intel Tenure</span><span className="pstat-val"><span className="gold">10+</span> years</span></div>
                    <div className="pstat-row"><span className="pstat-label">DeFi Operator</span><span className="pstat-val"><span className="gold">8+</span> years</span></div>
                    <div className="pstat-row"><span className="pstat-label">Specialty</span><span className="pstat-val">Yield · IL Reduction</span></div>
                    <div className="pstat-row"><span className="pstat-label">Status</span><span className="pstat-val pstat-status"><span className="pstat-dot" />Building</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <div className="quote-section">
          <div className="quote-inner reveal">
            <div className="quote-text">"Two decades. Two stacks. <em>One thesis.</em>"</div>
            <p className="quote-sub">Silicon yield optimization and on-chain liquidity engineering converge at Balcore — applying the same defect-reduction discipline that shipped trillions of transistors to the trillions of dollars now moving on-chain.</p>
          </div>
        </div>

        {/* AMIT */}
        <section className="section" id="engineering">
          <div className="section-inner">
            <div className="two-col reverse">
              <div className="reveal">
                <div className="sec-label">Engineering / CTO</div>
                <h2 className="sec-title">Amit Surve</h2>
                <div className="sec-role">Founding Team Member <span className="sep">/</span> Chief Technology Officer</div>
                <div className="sec-body">
                  <p>Amit Surve is a backend engineer and protocol architect with <strong>5+ years</strong> of experience across software engineering, Blockchain, DeFi, and AI systems. His expertise spans scalable backend architecture, cloud infrastructure, real-time systems, microservices, automation pipelines, and production-grade platform development.</p>
                  <p>Within Web3 and DeFi, Amit has deep experience in <em>smart contract development</em>, <em>protocol architecture</em>, <em>DEX infrastructure</em>, <em>on-chain analytics</em>, <em>event indexing</em>, and AI-assisted trading automation. He also brings hands-on experience within the <strong>Avalanche ecosystem</strong> and decentralized trading infrastructure.</p>
                  <p>As a founding team member and CTO of Balcore, Amit leads the protocol's engineering architecture, smart contract systems, and infrastructure development. His expertise plays a key role in building Balcore's <strong>next-generation liquidity orchestration engine</strong> — focused on scalable execution, automated market operations, and intelligent on-chain liquidity management.</p>
                </div>
              </div>
              <div className="reveal reveal-delay-1">
                <div className="visual-box" style={{ maxWidth: 440 }}>
                  <div className="portrait-frame"><img src={amitImg} alt="Amit Surve" /></div>
                  <div className="portrait-meta">
                    <div className="portrait-name-wrap">
                      <div className="portrait-name">Amit Surve</div>
                      <div className="portrait-role-mini">Chief Technology Officer</div>
                    </div>
                    <div className="portrait-id">F-002</div>
                  </div>
                  <div className="portrait-stats">
                    <div className="pstat-row"><span className="pstat-label">Engineering</span><span className="pstat-val"><span className="gold">5+</span> years</span></div>
                    <div className="pstat-row"><span className="pstat-label">Stack</span><span className="pstat-val">Solidity · Cloud · AI</span></div>
                    <div className="pstat-row"><span className="pstat-label">Ecosystem</span><span className="pstat-val">Avalanche · EVM</span></div>
                    <div className="pstat-row"><span className="pstat-label">Status</span><span className="pstat-val pstat-status"><span className="pstat-dot" />Shipping</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ALP */}
        <section className="section" id="research">
          <div className="section-inner">
            <div className="two-col">
              <div className="reveal">
                <div className="sec-label">Strategic Advisor / R&amp;D</div>
                <h2 className="sec-title">Alp</h2>
                <div className="sec-role">Founding Team Member <span className="sep">/</span> Strategic Advisor, BalCore R&amp;D</div>
                <div className="sec-body">
                  <p>Alp is a highly skilled multi-market trader with <strong>6+ years</strong> of experience across crypto, stock, and equity markets. Recognized for his deep understanding of order flow dynamics and market structure, he specializes in combining <em>range analysis</em> with advanced <em>order flow interpretation</em> to identify recurring, high-probability trading opportunities across varying market regimes.</p>
                  <p>His ability to read liquidity behavior, momentum shifts, and structural price action has established him as a <strong>top-tier strategic trader</strong> with a strong edge in highly volatile markets.</p>
                  <p>As a founding team member and strategic advisor to BalCore's R&amp;D division, Alp brings elite-level market insight, real-time trading expertise, and quantitative analytical thinking to the protocol's core strategy development. His experience plays a critical role in building sophisticated <strong>liquidity orchestration models</strong> focused on maximizing yield efficiency, adaptive risk management, and long-term protocol performance.</p>
                </div>
              </div>
              <div className="reveal reveal-delay-1">
                <div className="visual-box" style={{ maxWidth: 440, marginLeft: "auto" }}>
                  <div className="portrait-frame"><img src={alpImg} alt="Alp" /></div>
                  <div className="portrait-meta">
                    <div className="portrait-name-wrap">
                      <div className="portrait-name">Alp</div>
                      <div className="portrait-role-mini">Strategic Advisor, R&amp;D</div>
                    </div>
                    <div className="portrait-id">F-003</div>
                  </div>
                  <div className="portrait-stats">
                    <div className="pstat-row"><span className="pstat-label">Trading</span><span className="pstat-val"><span className="gold">6+</span> years</span></div>
                    <div className="pstat-row"><span className="pstat-label">Markets</span><span className="pstat-val">Crypto · Equities · Stock</span></div>
                    <div className="pstat-row"><span className="pstat-label">Edge</span><span className="pstat-val">Order Flow · Range</span></div>
                    <div className="pstat-row"><span className="pstat-label">Status</span><span className="pstat-val pstat-status"><span className="pstat-dot" />Researching</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RANA */}
        <section className="section" id="capital">
          <div className="section-inner">
            <div className="two-col reverse">
              <div className="reveal">
                <div className="sec-label">Strategic Advisor / Risk &amp; Capital</div>
                <h2 className="sec-title">Rana Mukherjee</h2>
                <div className="sec-role">Strategic Advisor <span className="sep">/</span> Risk &amp; Capital, Balcore</div>
                <div className="sec-body">
                  <p>With over <strong>42 years</strong> of distinguished experience in corporate finance and advisory, Rana Mukherjee is one of the most seasoned financial minds in the industry. A <strong>Chartered Accountant</strong> by qualification, he brings a rare combination of strategic depth, boardroom acumen, and hands-on financial leadership.</p>
                  <p>He honed his early expertise at powerhouses like <em>Tata</em> and <em>Flender</em> before rising to <strong>Group CFO</strong> at prestigious organizations including <em>MSPL Limited</em> and the <em>Aditya Birla Group</em> — roles he held with distinction over two decades. Across these tenures, he has steered complex financial ecosystems, driven large-scale corporate strategy, and delivered measurable value through economic cycles and market turbulence alike.</p>
                  <p>His mastery spans <strong>corporate finance, capital structure, and financial planning</strong> — navigating multi-billion-dollar portfolios, optimizing balance sheets, and architecting the frameworks that have powered some of India's most iconic enterprises.</p>
                  <p>This is precisely the discipline Balcore is built on. At its core, the protocol does what Rana has done his entire career — <em>allocate capital intelligently, optimize how every asset works, and protect principal through volatility</em>. Decades spent safeguarding large balance sheets through real-world market cycles translate directly into guiding a protocol engineered to keep capital efficient and risk contained. At Balcore, Rana channels that experience into the protocol's <strong>financial strategy, capital structure, and risk framework</strong>, guiding sound, bold, and future-ready decisions. His presence on the core team is not just an asset; it is a <strong>cornerstone of confidence</strong>.</p>
                </div>
              </div>
              <div className="reveal reveal-delay-1">
                <div className="visual-box" style={{ maxWidth: 440 }}>
                  <div className="portrait-frame"><img src={ranaImg} alt="Rana Mukherjee" /></div>
                  <div className="portrait-meta">
                    <div className="portrait-name-wrap">
                      <div className="portrait-name">Rana Mukherjee</div>
                      <div className="portrait-role-mini">Strategic Advisor, Risk &amp; Capital</div>
                    </div>
                    <div className="portrait-id">F-004</div>
                  </div>
                  <div className="portrait-stats">
                    <div className="pstat-row"><span className="pstat-label">Experience</span><span className="pstat-val"><span className="gold">42+</span> years</span></div>
                    <div className="pstat-row"><span className="pstat-label">Credential</span><span className="pstat-val">Chartered Accountant</span></div>
                    <div className="pstat-row"><span className="pstat-label">Background</span><span className="pstat-val">Group CFO · Tata · Birla</span></div>
                    <div className="pstat-row"><span className="pstat-label">Focus</span><span className="pstat-val">Capital · Risk · Structure</span></div>
                    <div className="pstat-row"><span className="pstat-label">Status</span><span className="pstat-val pstat-status"><span className="pstat-dot" />Advising</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="section" style={{ borderBottom: "none" }}>
          <div className="section-inner">
            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }} className="reveal">
              <div className="sec-label" style={{ justifyContent: "center" }}>
                <span style={{ width: 0, height: 0 }} />
                Growing the Team
              </div>
              <h2 className="sec-title" style={{ fontSize: "clamp(36px,5vw,64px)", marginBottom: 24 }}>
                Want to Build the Balance Layer With Us?
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--muted)", marginBottom: 40 }}>
                We're looking for engineers, researchers, and operators who want to ship infrastructure that matters. If you've spent years going deep on protocols, markets, or systems — we want to talk.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/join-us" className="btn-launch" style={{ fontSize: 14, padding: "13px 32px" }}>
                  <Arrow /> See Open Roles
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
