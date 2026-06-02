import { useEffect, useRef } from "react";

const VisionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add("visible");
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .vision-section{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;border-bottom:.5px solid rgba(255,255,255,.08);padding:104px 56px 72px;isolation:isolate;background:linear-gradient(135deg,#0a0814 0%,#08080f 60%,#0a0814 100%)}
        .vision-section::before{content:'';position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(ellipse 60% 50% at 30% 50%,rgba(124,58,237,.18) 0%,transparent 60%)}
        .vision-section::after{content:'';position:absolute;inset:0;z-index:-2;pointer-events:none;background:radial-gradient(ellipse 50% 60% at 80% 50%,rgba(0,234,255,.08) 0%,transparent 65%)}
        .vision-inner{max-width:1180px;margin:0 auto;width:100%;position:relative;z-index:2}
        .vision-copy{max-width:620px;opacity:0;transform:translateY(28px);transition:opacity .9s ease,transform .9s cubic-bezier(.2,.8,.2,1)}
        .vision-section.visible .vision-copy{opacity:1;transform:none}
        .vision-eyebrow{font-size:10px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#cda349;margin-bottom:20px;display:flex;align-items:center;gap:12px}
        .vision-eyebrow::before{content:'';width:34px;height:1px;background:linear-gradient(90deg,#cda349,transparent)}
        .vision-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(36px,4.6vw,64px);line-height:.94;text-transform:uppercase;letter-spacing:-.01em;color:#fff;margin-bottom:28px;text-shadow:0 2px 30px rgba(0,0,0,.6)}
        .vision-title em{font-style:normal;background:linear-gradient(120deg,#e9c873,#a87c2e 60%,#f3dd9a);-webkit-background-clip:text;background-clip:text;color:transparent}
        .vision-quote{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:clamp(21px,2.4vw,30px);line-height:1.24;color:#f1eeff;border-left:2px solid #cda349;padding-left:24px;margin-bottom:26px;max-width:560px;text-shadow:0 2px 20px rgba(0,0,0,.5)}
        .vision-quote span{color:#cda349}
        .vision-body{font-size:15px;line-height:1.85;color:rgba(241,238,255,.7);max-width:480px}
        .vision-tags{display:flex;flex-wrap:wrap;gap:11px;margin-top:34px}
        .vision-tag{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#e0c06a;padding:8px 16px;border:.5px solid rgba(205,163,73,.4);border-radius:40px;background:rgba(13,12,26,.5);backdrop-filter:blur(6px);transition:background .25s,border-color .25s,color .25s,transform .25s;cursor:default}
        .vision-tag:hover{background:rgba(205,163,73,.16);border-color:rgba(205,163,73,.65);color:#f3dd9a;transform:translateY(-2px)}
        .vision-core{position:absolute;top:50%;right:2%;transform:translateY(-50%);width:min(560px,46vw);opacity:0;transition:opacity 1.2s ease;pointer-events:none;z-index:1}
        .vision-section.visible .vision-core{opacity:1}
        .vision-core svg{width:100%;height:auto;display:block;overflow:visible}
        @keyframes scSpin{to{transform:rotate(360deg)}}
        @keyframes scSpinR{to{transform:rotate(-360deg)}}
        @keyframes scOrb{0%,100%{transform:scale(1);filter:drop-shadow(0 0 18px rgba(0,234,255,.6))}50%{transform:scale(1.08);filter:drop-shadow(0 0 32px rgba(124,58,237,.85))}}
        @keyframes scHalo{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.15)}}
        @keyframes scBolt{0%,40%,100%{opacity:0}10%,30%{opacity:.9}}
        @keyframes scFade{to{opacity:1}}
        .sc-ringA,.sc-ringB,.sc-ringC,.sc-gimbal,.sc-orb,.sc-halo,.sc-bolt,.sc-label,.sc-rot{transform-origin:280px 200px}
        .vision-section.visible .sc-ringA{animation:scSpin 18s linear infinite}
        .vision-section.visible .sc-ringB{animation:scSpinR 26s linear infinite}
        .vision-section.visible .sc-ringC{animation:scSpin 34s linear infinite}
        .vision-section.visible .sc-gimbal{animation:scSpinR 12s linear infinite}
        .vision-section.visible .sc-ringfar{animation:scSpin 60s linear infinite}
        .vision-section.visible .sc-ringmid{animation:scSpinR 40s linear infinite}
        .vision-section.visible .sc-orb{animation:scOrb 3.2s ease-in-out 1s infinite;transform-box:fill-box;transform-origin:center}
        .vision-section.visible .sc-halo{animation:scHalo 4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
        .vision-section.visible .sc-bolt{animation:scBolt 2.6s steps(2) infinite}
        .sc-label{opacity:0}
        .vision-section.visible .sc-label{animation:scFade 1s ease 2.2s forwards}
        @media(max-width:980px){.vision-core{display:none}}
        @media(max-width:768px){.vision-section{padding:96px 24px 72px;min-height:auto}}
      `}</style>
      <section ref={sectionRef} className="vision-section" id="vision">
        <div className="vision-core" aria-hidden="true">
          <svg viewBox="0 0 560 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="scOrb" cx="0.5" cy="0.45" r="0.6">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset="0.25" stopColor="#aef6ff" />
                <stop offset="0.55" stopColor="#00eaff" />
                <stop offset="0.8" stopColor="#7c3aed" />
                <stop offset="1" stopColor="#3a1d7a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="scHalo" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#00eaff" stopOpacity=".5" />
                <stop offset="0.5" stopColor="#7c3aed" stopOpacity=".3" />
                <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="scRingA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#00eaff" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="scRingB" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9f5fff" />
                <stop offset="1" stopColor="#00eaff" />
              </linearGradient>
              <linearGradient id="scGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f3dd9a" />
                <stop offset="1" stopColor="#cda349" />
              </linearGradient>
            </defs>

            <ellipse className="sc-ringA" cx="280" cy="200" rx="120" ry="44" fill="none" stroke="url(#scRingA)" strokeWidth="2" transform="rotate(28 280 200)" />
            <ellipse className="sc-ringB" cx="280" cy="200" rx="120" ry="44" fill="none" stroke="url(#scRingB)" strokeWidth="2" transform="rotate(-32 280 200)" />
            <ellipse className="sc-ringC" cx="280" cy="200" rx="120" ry="44" fill="none" stroke="url(#scGold)" strokeWidth="1.4" strokeOpacity=".7" transform="rotate(86 280 200)" />

            <g className="sc-gimbal" opacity=".5">
              <circle cx="280" cy="200" r="62" fill="none" stroke="#00eaff" strokeWidth="1" strokeDasharray="2 10" />
              <circle cx="218" cy="200" r="3" fill="#00eaff" />
              <circle cx="342" cy="200" r="3" fill="#00eaff" />
            </g>

            <circle className="sc-halo" cx="280" cy="200" r="70" fill="url(#scHalo)" />

            <g>
              <path className="sc-bolt" d="M 280 200 L 309 210 L 312 212" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "0s" }} />
              <path className="sc-bolt" d="M 280 200 L 283 231 L 286 233" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "0.4s" }} />
              <path className="sc-bolt" d="M 280 200 L 251 220 L 254 222" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "0.8s" }} />
              <path className="sc-bolt" d="M 280 200 L 245 186 L 248 188" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "1.2s" }} />
              <path className="sc-bolt" d="M 280 200 L 271 165 L 274 167" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "1.6s" }} />
              <path className="sc-bolt" d="M 280 200 L 303 176 L 306 178" stroke="#00eaff" strokeWidth="1.2" fill="none" opacity="0" style={{ animationDelay: "2.0s" }} />
            </g>

            <circle className="sc-orb" cx="280" cy="200" r="40" fill="url(#scOrb)" />
            <circle cx="280" cy="200" r="40" fill="none" stroke="#aef6ff" strokeWidth="1" strokeOpacity=".6" />
            <circle cx="280" cy="200" r="22" fill="rgba(8,8,20,.6)" stroke="url(#scGold)" strokeWidth="1" strokeOpacity=".8" />

            <g stroke="#00eaff" strokeWidth="1.5" fill="none" opacity=".6">
              <path d="M130 114 h-16 v16" />
              <path d="M430 114 h16 v16" />
              <path d="M130 286 h-16 v-16" />
              <path d="M430 286 h16 v-16" />
            </g>

            <text className="sc-label" x="280" y="318" textAnchor="middle" fill="#00eaff" fontSize="10.5" letterSpacing="3">
              PRINCIPAL // SECURED CORE
            </text>
            <text className="sc-label" x="280" y="96" textAnchor="middle" fill="#c9b3ff" fontSize="10.5" letterSpacing="3">
              CAPITAL IN MOTION
            </text>
          </svg>
        </div>

        <div className="vision-inner">
          <div className="vision-copy">
            <div className="vision-eyebrow">The Vision</div>
            <h2 className="vision-title">
              Turning Volatility<br />
              Into <em>Opportunity</em>.
            </h2>
            <div className="vision-quote">
              "Solving the puzzle of <span>capital efficiency</span> means
              making every dollar of liquidity work harder &mdash; without ever
              putting principal at risk."
            </div>
            <p className="vision-body">
              BalCore's core thesis: DeFi participants should never have to
              choose between earning yield and protecting their capital.
              Intelligent liquidity, stronger returns &mdash; engineered
              on-chain, built for trust.
            </p>
            <div className="vision-tags">
              <span className="vision-tag">Protect Value</span>
              <span className="vision-tag">Master Volatility</span>
              <span className="vision-tag">Capital Efficiency</span>
              <span className="vision-tag">Non-Custodial</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionSection;
