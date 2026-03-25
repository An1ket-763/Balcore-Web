import { useEffect, useMemo, useRef } from "react";

type Token = {
  id: string;
  logo: keyof typeof logos;
  name: string;
  color: string;
  glow: string;
  angle: number;
  r: number;
  fd: string;
  fdd: string;
  pd: string;
};

const logos = {
  USD: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <text
        x="16"
        y="23"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill="#22c55e"
        fontFamily={'"Clash Grotesk", sans-serif'}
      >
        $
      </text>
    </svg>
  ),
  BTC2: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path
        d="M11 7h8c3.5 0 5.5 2 5.5 4.5 0 1.8-.9 3-2.4 3.7 2 .7 3.2 2.2 3.2 4.3 0 3-2.2 5-5.8 5H11V7z"
        fill="none"
        stroke="#f7931a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M11 17h9" stroke="#f7931a" strokeWidth="2" />
      <path
        d="M14 7v-2M19 7v-2M14 29v-2M19 29v-2"
        stroke="#f7931a"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  AVAX: (
    <svg width="36" height="34" viewBox="0 0 36 34" fill="none" aria-hidden="true">
      <path d="M18 3 L34 31 Q34 33 32 33 L4 33 Q2 33 2 31 Z" fill="#e84142" />
    </svg>
  ),
  ETH: (
    <svg width="34" height="36" viewBox="0 0 34 36" fill="none" aria-hidden="true">
      <path d="M17 2 L4 18 L17 23 L30 18 Z" fill="#627eea" opacity="0.9" />
      <path d="M17 2 L4 18 L17 23 Z" fill="#8fa3ef" />
      <path d="M17 25 L4 20 L17 34 L30 20 Z" fill="#627eea" />
      <path d="M17 25 L4 20 L17 34 Z" fill="#8fa3ef" opacity="0.7" />
    </svg>
  ),
  GOLD: (
    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
      <path
        d="M4 8 L6 4 L30 4 L32 8 L32 22 L28 26 L8 26 L4 22 Z"
        fill="#d4a017"
        stroke="#f0c040"
        strokeWidth="1.2"
      />
      <rect x="7" y="9" width="22" height="11" rx="2" fill="#f0c040" opacity="0.3" />
      <text
        x="18"
        y="18"
        textAnchor="middle"
        fontSize="8"
        fontWeight="800"
        fill="#fff"
        fontFamily={'"Clash Grotesk", sans-serif'}
        letterSpacing="1"
      >
        GOLD
      </text>
    </svg>
  ),
  NVDA: (
    <svg width="38" height="32" viewBox="0 0 38 32" fill="none" aria-hidden="true">
      <path d="M4 16 Q4 6 14 4 L14 8 Q8 10 8 16 Q8 22 14 24 L14 28 Q4 26 4 16Z" fill="#76b900" />
      <path d="M14 4 Q24 2 34 10 L30 13 Q23 7 14 8Z" fill="#76b900" />
      <circle cx="22" cy="16" r="7" fill="#76b900" />
      <circle cx="22" cy="16" r="4" fill="#07080f" />
      <circle cx="22" cy="16" r="2" fill="#76b900" />
      <text
        x="19"
        y="31"
        textAnchor="middle"
        fontSize="7"
        fontWeight="800"
        fill="#76b900"
        fontFamily={'"Clash Grotesk", sans-serif'}
        letterSpacing=".5"
      >
        NVIDIA
      </text>
    </svg>
  ),
  TSLA: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M3 10 Q3 5 18 5 Q33 5 33 10" fill="none" stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M3 10 Q10 13 18 13" fill="none" stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M33 10 Q26 13 18 13" fill="none" stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 5 Q18 2 22 5" fill="none" stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="13" x2="18" y2="34" stroke="#cc0000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
};

const tokens: Token[] = [
  { id: "USD", logo: "USD", name: "Dollar", color: "#22c55e", glow: "rgba(34,197,94,0.5)", angle: 270.0, r: 185, fd: "3.8s", fdd: "0s", pd: "0s" },
  { id: "BTC", logo: "BTC2", name: "Bitcoin", color: "#f7931a", glow: "rgba(249,115,22,0.55)", angle: 321.4, r: 185, fd: "4.3s", fdd: "0.6s", pd: "0.5s" },
  { id: "TSLA", logo: "TSLA", name: "Tesla", color: "#cc0000", glow: "rgba(204,0,0,0.55)", angle: 12.9, r: 185, fd: "4.4s", fdd: "1.8s", pd: "3s" },
  { id: "NVDA", logo: "NVDA", name: "NVIDIA", color: "#76b900", glow: "rgba(118,185,0,0.55)", angle: 64.3, r: 185, fd: "3.9s", fdd: "0.9s", pd: "2.5s" },
  { id: "ETH", logo: "ETH", name: "Ethereum", color: "#627eea", glow: "rgba(98,126,234,0.55)", angle: 115.7, r: 185, fd: "4.6s", fdd: "1.5s", pd: "1.5s" },
  { id: "GOLD", logo: "GOLD", name: "Gold", color: "#d4a017", glow: "rgba(212,160,23,0.55)", angle: 167.1, r: 185, fd: "4.1s", fdd: "0.3s", pd: "2s" },
  { id: "AVAX", logo: "AVAX", name: "AVAX", color: "#e84142", glow: "rgba(232,65,66,0.55)", angle: 218.6, r: 185, fd: "3.6s", fdd: "1.1s", pd: "1s" },
];

const MobileHeroAnimation = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const tokenPositions = useMemo(
    () =>
      tokens.map((token) => {
        const rad = (token.angle * Math.PI) / 180;
        return {
          ...token,
          tx: Math.cos(rad) * token.r,
          ty: Math.sin(rad) * token.r,
        };
      }),
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const scene = sceneRef.current;
    if (!wrap || !scene) return;

    const resize = () => {
      const avail = Math.min(window.innerWidth * 0.54, 218);
      const sceneSize = Math.max(154, avail);
      const contentScale = window.innerWidth <= 430 ? 0.78 : window.innerWidth <= 640 ? 0.8 : 0.82;
      const scale = (sceneSize / 540) * contentScale;

      wrap.style.width = `${sceneSize}px`;
      wrap.style.height = `${sceneSize}px`;
      scene.style.transform = `scale(${scale})`;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <style>{`
        .mobile-hero-wrap { position: relative; flex-shrink: 0; max-width: 100%; margin: 0 auto; }
        .mobile-hero-scene { position: absolute; width: 540px; height: 540px; top: 50%; left: 50%; transform-origin: center; }
        .mobile-hero-ring { position: absolute;border-radius: 50%;top: 50%;left: 50%;transform: translate(-50%,-50%); }
        .mobile-hero-ring1 { width: 148px;height: 148px;border: 1px solid rgba(138,92,246,0.5);animation: mobile-spin-r 18s linear infinite; }
        .mobile-hero-ring2 { width: 256px;height: 256px;border: 1px dashed rgba(138,92,246,0.25);animation: mobile-spin-l 30s linear infinite; }
        .mobile-hero-ring3 { width: 380px;height: 380px;border: 1px solid rgba(138,92,246,0.12);animation: mobile-spin-r 44s linear infinite; }
        .mobile-hero-rdot { position: absolute;width: 5px;height: 5px;border-radius: 50%;background: rgba(138,92,246,0.75);box-shadow: 0 0 7px rgba(138,92,246,1); }
        .mobile-hero-core {
          position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 96px;height: 96px;border-radius: 50%;background: radial-gradient(circle,#2a1f6e 0%,#130e3a 60%,#07080f 100%);border: 2px solid rgba(138,92,246,0.85);display: flex;align-items: center;justify-content: center;flex-direction: column;animation: mobile-core-pulse 3s ease-in-out infinite;box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22);
        }
        .mobile-hero-core-label { font-size: 10px;font-weight: 700;color: #fff;letter-spacing: 2px;font-family: "Clash Grotesk", sans-serif; }
        .mobile-hero-core-sub { font-size: 7px;color: rgba(138,92,246,0.85);letter-spacing: 1.2px;margin-top: 2px; }
        .mobile-hero-token { position: absolute;top: 50%;left: 50%; }
        .mobile-hero-token-inner {
          width: 76px;height: 76px;border-radius: 50%;display: flex;flex-direction: column;align-items: center;justify-content: center;border: 2.5px solid;transition: transform .2s, filter .2s;animation: mobile-token-float var(--fd,4s) ease-in-out infinite;animation-delay: var(--fdd,0s);
        }
        .mobile-hero-token-name { font-size: 8px;color: rgba(255,255,255,0.75);margin-top: 3px;letter-spacing: .6px;font-weight: 500; }
        .mobile-hero-token-pulse {
          position: absolute;width: 76px;height: 76px;border-radius: 50%;border: 2px solid var(--pc,#fff);animation: mobile-token-pulse 2.8s ease-out infinite;animation-delay: var(--pd,0s);top: 50%;left: 50%;transform: translate(-50%,-50%);pointer-events: none;
        }

        @keyframes mobile-spin-r { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes mobile-spin-l { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes mobile-core-pulse {
          0%,100% { box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22); }
          50% { box-shadow: 0 0 55px rgba(138,92,246,0.72),0 0 100px rgba(138,92,246,0.32),inset 0 0 35px rgba(138,92,246,0.38); }
        }
        @keyframes mobile-token-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes mobile-token-pulse { 0% { transform: translate(-50%,-50%) scale(1);opacity: .6; } 100% { transform: translate(-50%,-50%) scale(2.2);opacity: 0; } }
      `}</style>

      <div ref={wrapRef} className="mobile-hero-wrap">
        <div ref={sceneRef} className="mobile-hero-scene">
          <div className="mobile-hero-ring mobile-hero-ring1">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
          </div>
          <div className="mobile-hero-ring mobile-hero-ring2">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div className="mobile-hero-ring mobile-hero-ring3">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="mobile-hero-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div className="mobile-hero-core">
            <div className="mobile-hero-core-label">BALCORE</div>
            <div className="mobile-hero-core-sub">FLOWYIELD</div>
          </div>

          {tokenPositions.map((token) => (
            <div
              key={token.id}
              className="mobile-hero-token"
              style={{ transform: `translate(calc(-50% + ${token.tx}px), calc(-50% + ${token.ty}px))` }}
            >
              <div
                className="mobile-hero-token-inner"
                style={{
                  background: `radial-gradient(circle, ${token.color}1a 0%, #0d0d1e 75%)`,
                  borderColor: token.color,
                  boxShadow: `0 0 18px ${token.glow}, 0 0 38px ${token.glow.replace("0.55", "0.12")}`,
                  ["--fd" as string]: token.fd,
                  ["--fdd" as string]: token.fdd,
                }}
              >
                {logos[token.logo]}
                <div className="mobile-hero-token-name">{token.name}</div>
              </div>
              <div
                className="mobile-hero-token-pulse"
                style={{
                  ["--pc" as string]: token.color,
                  ["--pd" as string]: token.pd,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileHeroAnimation;
