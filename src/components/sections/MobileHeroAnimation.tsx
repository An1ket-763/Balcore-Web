import { useEffect, useMemo, useRef } from "react";

type Token = {
  id: string;
  name: string;
  angle: number;
  color: string;
  glow: string;
  fd: string;
  fdd: string;
  pd: string;
  svg: string;
};

const ORBIT_R = 185;
const TOKEN_D = 76;
const SCENE_SZ = 540;
const CENTRE = SCENE_SZ / 2;

const tokens: Token[] = [
  {
    id: "USD",
    name: "Dollar",
    angle: 270,
    color: "#22c55e",
    glow: "rgba(34,197,94,0.5)",
    fd: "3.8s",
    fdd: "0s",
    pd: "0s",
    svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4v2M21 9.5C21 7.3 18.8 6 16 6s-5 1.3-5 3.5c0 2.3 2 3.2 5 4 3 .8 5.5 1.8 5.5 4.5S18.8 22 16 22s-5.5-1.3-5.5-3.5" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round"/><path d="M16 22v2" stroke="#22c55e" stroke-width="2.2" stroke-linecap="round"/></svg>`,
  },
  {
    id: "BTC",
    name: "Bitcoin",
    angle: 321.4,
    color: "#f7931a",
    glow: "rgba(249,115,22,0.55)",
    fd: "4.3s",
    fdd: "0.6s",
    pd: "0.5s",
    svg: `<img src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/btc.svg" alt="BTC" style="width:42px;height:42px;" />`,
  },
  {
    id: "TSLA",
    name: "Tesla",
    angle: 12.9,
    color: "#cc0000",
    glow: "rgba(204,0,0,0.55)",
    fd: "4.4s",
    fdd: "1.8s",
    pd: "3s",
    svg: `<img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" alt="Tesla" style="width:42px;height:42px;filter:drop-shadow(0 0 5px #cc222299);" />`,
  },
  {
    id: "NVDA",
    name: "NVIDIA",
    angle: 64.3,
    color: "#76b900",
    glow: "rgba(118,185,0,0.55)",
    fd: "3.9s",
    fdd: "0.9s",
    pd: "2.5s",
    svg: `<svg width="38" height="32" viewBox="0 0 38 32" fill="none"><path d="M4 16 Q4 6 14 4 L14 8 Q8 10 8 16 Q8 22 14 24 L14 28 Q4 26 4 16Z" fill="#76b900"/><path d="M14 4 Q24 2 34 10 L30 13 Q23 7 14 8Z" fill="#76b900"/><circle cx="22" cy="16" r="7" fill="#76b900"/><circle cx="22" cy="16" r="4" fill="#07080f"/><circle cx="22" cy="16" r="2" fill="#76b900"/></svg>`,
  },
  {
    id: "ETH",
    name: "Ethereum",
    angle: 115.7,
    color: "#627eea",
    glow: "rgba(98,126,234,0.55)",
    fd: "4.6s",
    fdd: "1.5s",
    pd: "1.5s",
    svg: `<svg width="34" height="36" viewBox="0 0 34 36" fill="none"><path d="M17 2 L4 18 L17 23 L30 18 Z" fill="#627eea" opacity="0.9"/><path d="M17 2 L4 18 L17 23 Z" fill="#8fa3ef"/><path d="M17 25 L4 20 L17 34 L30 20 Z" fill="#627eea"/><path d="M17 25 L4 20 L17 34 Z" fill="#8fa3ef" opacity="0.7"/></svg>`,
  },
  {
    id: "GOLD",
    name: "Gold",
    angle: 167.1,
    color: "#d4a017",
    glow: "rgba(212,160,23,0.55)",
    fd: "4.1s",
    fdd: "0.3s",
    pd: "2s",
    svg: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 13 L11 9 H25 L29 13 V23 L25 27 H11 L7 23 Z" fill="#c8960c" stroke="#f0c040" stroke-width="1.3" stroke-linejoin="round"/><path d="M11 13 H25 V23 H11 Z" fill="#f0c040" opacity="0.18"/><path d="M13 16 H23" stroke="#f5d060" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/><path d="M14 19 H22" stroke="#f5d060" stroke-width="1" stroke-linecap="round" opacity="0.5"/></svg>`,
  },
  {
    id: "AVAX",
    name: "AVAX",
    angle: 218.6,
    color: "#e84142",
    glow: "rgba(232,65,66,0.55)",
    fd: "3.6s",
    fdd: "1.1s",
    pd: "1s",
    svg: `<img src="https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/avax.svg" alt="AVAX" style="width:42px;height:42px;" />`,
  },
];

const MobileHeroAnimation = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const tokenPositions = useMemo(
    () =>
      tokens.map((t) => {
        const rad = (t.angle * Math.PI) / 180;
        return {
          ...t,
          left: CENTRE + Math.cos(rad) * ORBIT_R - TOKEN_D / 2,
          top: CENTRE + Math.sin(rad) * ORBIT_R - TOKEN_D / 2,
          glowFaint: t.glow.replace(/[\d.]+\)$/, "0.12)"),
        };
      }),
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const scene = sceneRef.current;
    if (!wrap || !scene) return;

    const resize = () => {
      const avail = Math.min(window.innerWidth, window.innerHeight) * 0.92;
      const size = Math.min(avail, 360);
      const scale = size / SCENE_SZ;

      wrap.style.width = `${size}px`;
      wrap.style.height = `${size}px`;
      scene.style.transform = `scale(${scale})`;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <style>{`
        .mobile-hero-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .mobile-hero-scene {
          position: absolute;
          width: 540px;
          height: 540px;
          top: 0;
          left: 0;
          transform-origin: top left;
        }
        .mobile-hero-ring {
          position: absolute;
          border-radius: 50%;
        }
        .mobile-hero-ring1 {
          width: 148px;
          height: 148px;
          top: calc(270px - 74px);
          left: calc(270px - 74px);
          border: 1px solid rgba(138,92,246,.5);
          animation: mobile-spin-r 18s linear infinite;
        }
        .mobile-hero-ring2 {
          width: 256px;
          height: 256px;
          top: calc(270px - 128px);
          left: calc(270px - 128px);
          border: 1px dashed rgba(138,92,246,.25);
          animation: mobile-spin-l 30s linear infinite;
        }
        .mobile-hero-ring3 {
          width: 380px;
          height: 380px;
          top: calc(270px - 190px);
          left: calc(270px - 190px);
          border: 1px solid rgba(138,92,246,.12);
          animation: mobile-spin-r 44s linear infinite;
        }
        .mobile-hero-rdot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(138,92,246,.75);
          box-shadow: 0 0 7px rgba(138,92,246,1);
        }
        .mobile-hero-core {
          position: absolute;
          width: 96px;
          height: 96px;
          top: calc(270px - 48px);
          left: calc(270px - 48px);
          border-radius: 50%;
          background: radial-gradient(circle, #2a1f6e 0%, #130e3a 60%, #07080f 100%);
          border: 2px solid rgba(138,92,246,.85);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          animation: mobile-core-pulse 3s ease-in-out infinite;
          box-shadow:
            0 0 32px rgba(138,92,246,.45),
            0 0 65px rgba(138,92,246,.18),
            inset 0 0 24px rgba(138,92,246,.22);
        }
        .mobile-hero-core-label {
          font-size: 10px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 2px;
          font-family: system-ui, sans-serif;
        }
        .mobile-hero-core-sub {
          font-size: 7px;
          color: rgba(138,92,246,.85);
          letter-spacing: 1.2px;
          margin-top: 2px;
          font-family: system-ui, sans-serif;
        }
        .mobile-hero-token {
          position: absolute;
          width: 76px;
          height: 76px;
        }
        .mobile-hero-token-inner {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2.5px solid;
          overflow: hidden;
          animation: mobile-token-float var(--fd, 4s) ease-in-out infinite;
          animation-delay: var(--fdd, 0s);
        }
        .mobile-hero-token-inner svg {
          display: block;
          flex-shrink: 0;
          max-width: 42px;
          max-height: 42px;
        }
        .mobile-hero-token-name {
          font-size: 8px;
          color: rgba(255,255,255,.75);
          margin-top: 3px;
          letter-spacing: .6px;
          font-weight: 500;
          font-family: system-ui, sans-serif;
        }
        .mobile-hero-token-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--pc, #fff);
          animation: mobile-token-pulse 2.8s ease-out infinite;
          animation-delay: var(--pd, 0s);
          pointer-events: none;
        }
        @keyframes mobile-spin-r {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes mobile-spin-l {
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes mobile-core-pulse {
          0%,
          100% {
            box-shadow: 0 0 32px rgba(138,92,246,.45), 0 0 65px rgba(138,92,246,.18), inset 0 0 24px rgba(138,92,246,.22);
          }
          50% {
            box-shadow: 0 0 55px rgba(138,92,246,.72), 0 0 100px rgba(138,92,246,.32), inset 0 0 35px rgba(138,92,246,.38);
          }
        }
        @keyframes mobile-token-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes mobile-token-pulse {
          0% {
            transform: scale(1);
            opacity: .6;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>

      <div id="wrap" ref={wrapRef} className="mobile-hero-wrap">
        <div id="scene" ref={sceneRef} className="mobile-hero-scene">
          <div className="mobile-hero-ring mobile-hero-ring1">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", marginLeft: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", marginLeft: "-2px" }} />
          </div>

          <div className="mobile-hero-ring mobile-hero-ring2">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", marginLeft: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ right: "-2px", top: "50%", marginTop: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", marginLeft: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ left: "-2px", top: "50%", marginTop: "-2px" }} />
          </div>

          <div className="mobile-hero-ring mobile-hero-ring3">
            <div className="mobile-hero-rdot" style={{ top: "-2px", left: "50%", marginLeft: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ right: "-2px", top: "50%", marginTop: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ bottom: "-2px", left: "50%", marginLeft: "-2px" }} />
            <div className="mobile-hero-rdot" style={{ left: "-2px", top: "50%", marginTop: "-2px" }} />
          </div>

          <div className="mobile-hero-core">
            <div className="mobile-hero-core-label">BALCORE</div>
            <div className="mobile-hero-core-sub">FLOWYIELD</div>
          </div>

          {tokenPositions.map((t) => (
            <div key={t.id} className="mobile-hero-token" style={{ left: `${t.left}px`, top: `${t.top}px` }}>
              <div
                className="mobile-hero-token-inner"
                style={{
                  background: `radial-gradient(circle,${t.color}1a 0%,#0d0d1e 75%)`,
                  borderColor: t.color,
                  boxShadow: `0 0 18px ${t.glow},0 0 38px ${t.glowFaint}`,
                  ["--fd" as string]: t.fd,
                  ["--fdd" as string]: t.fdd,
                }}
              >
                <span dangerouslySetInnerHTML={{ __html: t.svg }} />
                <div className="mobile-hero-token-name">{t.name}</div>
              </div>
              <div
                className="mobile-hero-token-pulse"
                style={{ ["--pc" as string]: t.color, ["--pd" as string]: t.pd }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileHeroAnimation;
