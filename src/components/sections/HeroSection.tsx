import { useEffect, useMemo, useRef, useState } from "react";

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
  role: string;
  info: string;
};

type TooltipState = {
  visible: boolean;
  x: number;
  y: number;
  token: Token | null;
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

const HERO_TITLE = "BALCORE";
const TITLE_REVEAL_DURATION_MS = 1600;
const TITLE_STEP_DURATION_MS = Math.ceil(TITLE_REVEAL_DURATION_MS / HERO_TITLE.length);

const tokens: Token[] = [
  {
    id: "USD",
    logo: "USD",
    name: "Dollar",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.5)",
    angle: 270.0,
    r: 185,
    fd: "3.8s",
    fdd: "0s",
    pd: "0s",
    role: "Reserve anchor",
    info: "Stable base for all vault pairs. Deep liquidity, anti-manipulation price lock.",
  },
  {
    id: "BTC",
    logo: "BTC2",
    name: "Bitcoin",
    color: "#f7931a",
    glow: "rgba(249,115,22,0.55)",
    angle: 321.4,
    r: 185,
    fd: "4.3s",
    fdd: "0.6s",
    pd: "0.5s",
    role: "Active LP — 10%",
    info: "BTC.b concentrated LP bins. Highest fee capture per dollar deployed on-chain.",
  },
  {
    id: "TSLA",
    logo: "TSLA",
    name: "Tesla",
    color: "#cc0000",
    glow: "rgba(204,0,0,0.55)",
    angle: 12.9,
    r: 185,
    fd: "4.4s",
    fdd: "1.8s",
    pd: "3s",
    role: "Reserve — equity",
    info: "Tokenized Tesla stock. 24/7 on-chain — no NYSE hours.",
  },
  {
    id: "NVDA",
    logo: "NVDA",
    name: "NVIDIA",
    color: "#76b900",
    glow: "rgba(118,185,0,0.55)",
    angle: 64.3,
    r: 185,
    fd: "3.9s",
    fdd: "0.9s",
    pd: "2.5s",
    role: "Reserve — equity",
    info: "Tokenized NVIDIA equity. AI infrastructure asset — Nasdaq tokenization wave.",
  },
  {
    id: "ETH",
    logo: "ETH",
    name: "Ethereum",
    color: "#627eea",
    glow: "rgba(98,126,234,0.55)",
    angle: 115.7,
    r: 185,
    fd: "4.6s",
    fdd: "1.5s",
    pd: "1.5s",
    role: "Reserve — Benqi",
    info: "WETH.e in Benqi reserve. Earns lending yield 24/7. Zero IL exposure.",
  },
  {
    id: "GOLD",
    logo: "GOLD",
    name: "Gold",
    color: "#d4a017",
    glow: "rgba(212,160,23,0.55)",
    angle: 167.1,
    r: 185,
    fd: "4.1s",
    fdd: "0.3s",
    pd: "2s",
    role: "Reserve — RWA",
    info: "Tokenized gold. Real-world asset earning steady Benqi yield.",
  },
  {
    id: "AVAX",
    logo: "AVAX",
    name: "AVAX",
    color: "#e84142",
    glow: "rgba(232,65,66,0.55)",
    angle: 218.6,
    r: 185,
    fd: "3.6s",
    fdd: "1.1s",
    pd: "1s",
    role: "Active LP — core",
    info: "Core Avalanche pair. Dynamic rebalancing anchored to VAH.",
  },
];

const HeroSection = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    token: null,
  });
  const [visibleTitleLength, setVisibleTitleLength] = useState(0);
  const [isTitleAnimating, setIsTitleAnimating] = useState(true);

  const animatedTitle = HERO_TITLE.slice(0, visibleTitleLength);

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
    setVisibleTitleLength(0);
    setIsTitleAnimating(true);

    let currentIndex = 0;
    const typewriterInterval = window.setInterval(() => {
      currentIndex += 1;
      setVisibleTitleLength(currentIndex);

      if (currentIndex >= HERO_TITLE.length) {
        setIsTitleAnimating(false);
        window.clearInterval(typewriterInterval);
      }
    }, TITLE_STEP_DURATION_MS);

    return () => window.clearInterval(typewriterInterval);
  }, []);

  useEffect(() => {
    const updateTooltipPosition = (event: MouseEvent) => {
      setTooltip((current) =>
        current.visible
          ? { ...current, x: event.clientX + 16, y: event.clientY - 12 }
          : current
      );
    };

    document.addEventListener("mousemove", updateTooltipPosition);
    return () => document.removeEventListener("mousemove", updateTooltipPosition);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = sceneRef.current;
    if (!canvas || !scene) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dotsReady = false;
    let animationFrame = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      dotsReady = false;
    };

    const sceneCenter = () => {
      const rect = scene.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    };

    const sceneScale = () => {
      const rect = scene.getBoundingClientRect();
      return rect.width / 540;
    };

    const getTokenPoints = () => {
      const { x: cx, y: cy } = sceneCenter();
      const scale = sceneScale();
      return tokens.map((token) => {
        const rad = (token.angle * Math.PI) / 180;
        return {
          x: cx + Math.cos(rad) * token.r * scale,
          y: cy + Math.sin(rad) * token.r * scale,
          color: token.color,
        };
      });
    };

    class FlowDot {
      sx: number;
      sy: number;
      cx: number;
      cy: number;
      color: string;
      t: number;
      speed: number;
      size: number;

      constructor(sx: number, sy: number, cx: number, cy: number, color: string) {
        this.sx = sx;
        this.sy = sy;
        this.cx = cx;
        this.cy = cy;
        this.color = color;
        this.t = Math.random();
        this.speed = 0.003 + Math.random() * 0.003;
        this.size = 2.2 + Math.random() * 1.2;
      }

      update() {
        this.t += this.speed;
        if (this.t >= 1) this.t -= 1;
      }

      draw() {
        const progress = this.t;
        const x = this.sx + (this.cx - this.sx) * progress;
        const y = this.sy + (this.cy - this.sy) * progress;
        const fade = progress < 0.12 ? progress / 0.12 : progress > 0.82 ? (1 - progress) / 0.18 : 1;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size * 2.8);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(x, y, this.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = fade * 0.35;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = fade * 0.92;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    let flowDots: FlowDot[] = [];

    const initDots = (points: ReturnType<typeof getTokenPoints>, cx: number, cy: number) => {
      flowDots = [];
      points.forEach((point) => {
        for (let i = 0; i < 3; i += 1) {
          const dot = new FlowDot(point.x, point.y, cx, cy, point.color);
          dot.t = i / 3;
          flowDots.push(dot);
        }
      });
    };

    const drawBackgroundGlow = (cx: number, cy: number) => {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 240);
      gradient.addColorStop(0, "rgba(100,55,230,0.13)");
      gradient.addColorStop(1, "rgba(100,55,230,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 240, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawLines = (points: ReturnType<typeof getTokenPoints>, cx: number, cy: number) => {
      points.forEach((point) => {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(cx, cy);
        ctx.strokeStyle = "rgba(138,92,246,0.2)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 8]);
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;

        const mx = point.x + (cx - point.x) * 0.5;
        const my = point.y + (cy - point.y) * 0.5;
        ctx.beginPath();
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(138,92,246,0.65)";
        ctx.globalAlpha = 0.72;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: cx, y: cy } = sceneCenter();
      const points = getTokenPoints();

      if (!dotsReady) {
        initDots(points, cx, cy);
        dotsReady = true;
      }

      drawBackgroundGlow(cx, cy);
      drawLines(points, cx, cy);

      flowDots.forEach((dot, index) => {
        const point = points[Math.floor(index / 3)];
        dot.sx = point.x;
        dot.sy = point.y;
        dot.cx = cx;
        dot.cy = cy;
        dot.update();
        dot.draw();
      });

      animationFrame = window.requestAnimationFrame(loop);
    };

    resize();
    loop();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .balcore-hero, .balcore-hero * { box-sizing: border-box; }
        .balcore-hero {
          --purple:#7c3aed;--purple-light:#a78bfa;--purple-dark:#4c1d95;
          --bg:#07080f;--bg2:#0d0f1a;
          --text:#ffffff;--text2:rgba(255,255,255,0.65);--text3:rgba(255,255,255,0.35);
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: var(--bg);
          color: var(--text);
          isolation: isolate;
        }
        .balcore-flow-canvas { position: fixed; inset: 0; pointer-events: none; z-index: 1; }
        .balcore-hero-grid {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 72px 0 0;
          overflow: hidden;
          z-index: 2;
        }
        .balcore-hero-left {
          padding: 0 0 0 5rem;
          display: flex;
          flex-direction: column;
          z-index: 2;
          font-family: "Clash Grotesk", sans-serif;
        }
        .balcore-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.35);
          border-radius: 100px;
          padding: 6px 16px;
          width: fit-content;
          margin-bottom: 2rem;
          animation: balcore-fade-up .8s ease both;
        }
        .balcore-badge-dot {
          width: 7px;height: 7px;border-radius: 50%;background: #e84142;
          box-shadow: 0 0 8px #e84142;animation: balcore-dot-pulse 2s ease-in-out infinite;
        }
        .balcore-badge span {
          font-size: 11px;font-weight: 600;letter-spacing: 1.8px;color: var(--text2);text-transform: uppercase;
        }
        .balcore-title {
          font-family: "Syne", sans-serif;
          font-size: clamp(52px,6vw,88px);
          font-weight: 800;
          line-height: .95;
          color: #fff;
          animation: balcore-fade-up .8s .1s ease both;
        }
        .balcore-title-typewriter {
          display: inline-flex;
          align-items: center;
          min-height: 1em;
        }
        .balcore-title-text {
          display: inline-block;
          min-width: 8ch;
          white-space: nowrap;
        }
        .balcore-title-caret {
          width: 0.08em;
          height: 0.9em;
          margin-left: 0.08em;
          border-radius: 999px;
          background: rgba(255,255,255,0.95);
          box-shadow: 0 0 12px rgba(255,255,255,0.35);
          animation: balcore-caret-blink .45s steps(1) infinite;
        }
        .balcore-subtitle {
          margin-top: 1.75rem;font-size: clamp(15px,1.4vw,18px);font-weight: 400;color: var(--text2);line-height: 1.65;max-width: 480px;
          animation: balcore-fade-up .8s .2s ease both;
        }
        .balcore-subtitle strong { color: #fff; font-weight: 500; }
        .balcore-actions { margin-top: 2.5rem;display: flex;align-items: center;gap: 1rem;animation: balcore-fade-up .8s .3s ease both; flex-wrap: wrap; }
        .balcore-btn-primary, .balcore-btn-secondary {
          font-family: "Clash Grotesk", sans-serif;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s;
        }
        .balcore-btn-primary {
          background: var(--purple);color: #fff;border: none;padding: 14px 32px;border-radius: 10px;font-size: 15px;font-weight: 500;gap: 8px;
        }
        .balcore-btn-primary:hover { background: #6d28d9;transform: translateY(-2px);box-shadow: 0 8px 32px rgba(124,58,237,0.4); }
        .balcore-btn-secondary {
          background: transparent;color: var(--text2);border: 1px solid rgba(255,255,255,0.15);padding: 14px 28px;border-radius: 10px;font-size: 15px;font-weight: 400;
        }
        .balcore-btn-secondary:hover { border-color: rgba(255,255,255,0.35);color: #fff; }
        .balcore-stats {
          margin-top: 3.5rem;display: flex;gap: 2.5rem;animation: balcore-fade-up .8s .45s ease both;padding-top: 2rem;border-top: 1px solid rgba(255,255,255,0.07);flex-wrap: wrap;
        }
        .balcore-stat-num { font-family: "Clash Grotesk", sans-serif;font-size: 26px;font-weight: 700;color: #fff; }
        .balcore-stat-num span { font-size: 16px;color: var(--purple-light); }
        .balcore-stat-desc { font-size: 12px;color: var(--text3);margin-top: 2px;letter-spacing: .3px; }
        .balcore-hero-right {
          position: relative;display: flex;align-items: center;justify-content: center;height: 100vh;z-index: 2;animation: balcore-fade-in 1.2s .2s ease both;
        }
        .balcore-hub-scene-wrap { position: relative;width: 540px;height: 540px; }
        .balcore-scene { position: relative;width: 540px;height: 540px;z-index: 2; }
        .balcore-ring { position: absolute;border-radius: 50%;top: 50%;left: 50%;transform: translate(-50%,-50%); }
        .balcore-ring1 { width: 148px;height: 148px;border: 1px solid rgba(138,92,246,0.5);animation: balcore-spin-r 18s linear infinite; }
        .balcore-ring2 { width: 256px;height: 256px;border: 1px dashed rgba(138,92,246,0.25);animation: balcore-spin-l 30s linear infinite; }
        .balcore-ring3 { width: 380px;height: 380px;border: 1px solid rgba(138,92,246,0.12);animation: balcore-spin-r 44s linear infinite; }
        .balcore-rdot { position: absolute;width: 5px;height: 5px;border-radius: 50%;background: rgba(138,92,246,0.75);box-shadow: 0 0 7px rgba(138,92,246,1); }
        .balcore-core {
          position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 96px;height: 96px;border-radius: 50%;background: radial-gradient(circle,#2a1f6e 0%,#130e3a 60%,#07080f 100%);border: 2px solid rgba(138,92,246,0.85);display: flex;align-items: center;justify-content: center;flex-direction: column;animation: balcore-core-pulse 3s ease-in-out infinite;box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22);
        }
        .balcore-core-label { font-size: 10px;font-weight: 700;color: #fff;letter-spacing: 2px;font-family: "Clash Grotesk", sans-serif; }
        .balcore-core-sub { font-size: 7px;color: rgba(138,92,246,0.85);letter-spacing: 1.2px;margin-top: 2px; }
        .balcore-token { position: absolute;top: 50%;left: 50%;cursor: pointer; }
        .balcore-token:hover .balcore-token-inner { transform: scale(1.12);filter: brightness(1.22); }
        .balcore-token-inner {
          width: 76px;height: 76px;border-radius: 50%;display: flex;flex-direction: column;align-items: center;justify-content: center;border: 2.5px solid;transition: transform .2s, filter .2s;animation: balcore-token-float var(--fd,4s) ease-in-out infinite;animation-delay: var(--fdd,0s);
        }
        .balcore-token-name { font-size: 8px;color: rgba(255,255,255,0.75);margin-top: 3px;letter-spacing: .6px;font-weight: 500; }
        .balcore-token-pulse {
          position: absolute;width: 76px;height: 76px;border-radius: 50%;border: 2px solid var(--pc,#fff);animation: balcore-token-pulse 2.8s ease-out infinite;animation-delay: var(--pd,0s);top: 50%;left: 50%;transform: translate(-50%,-50%);pointer-events: none;
        }
        .balcore-scroll-hint {
          position: absolute;bottom: 2rem;left: 5rem;display: flex;flex-direction: column;align-items: flex-start;gap: 6px;animation: balcore-fade-in 1.5s 1s ease both;z-index: 3;
        }
        .balcore-scroll-hint span { font-size: 10px;letter-spacing: 2px;color: var(--text3);text-transform: uppercase; }
        .balcore-scroll-arrow { width: 20px;height: 20px;border-right: 1px solid var(--text3);border-bottom: 1px solid var(--text3);transform: rotate(45deg);animation: balcore-arrow-bounce 1.8s ease-in-out infinite;margin-top: 2px;margin-left: 4px; }
        .balcore-tooltip {
          position: fixed;background: rgba(12,8,35,0.97);border: 1px solid rgba(138,92,246,0.42);border-radius: 11px;padding: 11px 15px;font-size: 11px;color: rgba(255,255,255,.82);pointer-events: none;z-index: 200;max-width: 190px;line-height: 1.6;box-shadow: 0 4px 20px rgba(0,0,0,.5);
        }
        .balcore-tooltip-name { font-size: 12.5px;font-weight: 700;margin-bottom: 5px; }
        .balcore-tooltip-role { font-size: 10px;color: rgba(138,92,246,.9);margin-bottom: 4px;font-weight: 600; }

        @keyframes balcore-fade-up { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes balcore-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes balcore-dot-pulse { 0%,100% { box-shadow: 0 0 8px #e84142; } 50% { box-shadow: 0 0 16px #e84142,0 0 24px rgba(232,65,66,0.4); } }
        @keyframes balcore-spin-r { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes balcore-spin-l { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes balcore-core-pulse {
          0%,100% { box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22); }
          50% { box-shadow: 0 0 55px rgba(138,92,246,0.72),0 0 100px rgba(138,92,246,0.32),inset 0 0 35px rgba(138,92,246,0.38); }
        }
        @keyframes balcore-token-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes balcore-token-pulse { 0% { transform: translate(-50%,-50%) scale(1);opacity: .6; } 100% { transform: translate(-50%,-50%) scale(2.2);opacity: 0; } }
        @keyframes balcore-arrow-bounce { 0%,100% { transform: rotate(45deg) translateY(0); } 50% { transform: rotate(45deg) translateY(5px); } }
        @keyframes balcore-caret-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }

        @media (max-width: 1024px) {
          .balcore-hero-grid { grid-template-columns: 1fr; padding: 72px 2rem 0; }
          .balcore-hero-left { padding: 3rem 0 0; }
          .balcore-hero-right { height: 480px; }
          .balcore-hub-scene-wrap, .balcore-scene { width: 420px; height: 420px; }
          .balcore-scroll-hint { left: 2rem; }
        }
        @media (max-width: 640px) {
          .balcore-hero-left { padding: 2rem 0 0; }
          .balcore-title { font-size: 42px; }
          .balcore-stats { gap: 1.5rem; }
          .balcore-hub-scene-wrap, .balcore-scene { width: 320px; height: 320px; }
          .balcore-scroll-hint { left: 1.5rem; bottom: 1.5rem; }
        }
      `}</style>

      <section id="top" className="balcore-hero">
        <canvas ref={canvasRef} className="balcore-flow-canvas" aria-hidden="true" />

        <div className="balcore-hero-grid">
          <div className="balcore-hero-left">
            <div className="balcore-badge">
              <div className="balcore-badge-dot" />
              <span>Built on Avalanche</span>
            </div>

            <h1 className="balcore-title" aria-label={HERO_TITLE}>
              <span className="balcore-title-typewriter">
                <span className="balcore-title-text">{animatedTitle}</span>
                {isTitleAnimating ? <span className="balcore-title-caret" aria-hidden="true" /> : null}
              </span>
            </h1>

            <p className="balcore-subtitle">
              Solving DeFi&apos;s trilemma — <strong>yield generation</strong>, <strong>capital protection</strong>, and <strong>liquidity provision</strong>. Every asset. Every market. Finally.
            </p>

            <div className="balcore-actions">
              <a href="#visual-story" className="balcore-btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Get Started
              </a>
              <a href="#visual-story" className="balcore-btn-secondary">
                Learn More →
              </a>
            </div>

            <div className="balcore-stats">
              <div>
                <div className="balcore-stat-num">≤30<span>%</span></div>
                <div className="balcore-stat-desc">Target APY · market-dependent</div>
              </div>
              <div>
                <div className="balcore-stat-num">3<span>×</span></div>
                <div className="balcore-stat-desc">Independent IL shield layers</div>
              </div>
              <div>
                <div className="balcore-stat-num" style={{ fontSize: "22px", paddingTop: "4px" }}>
                  Principal
                </div>
                <div className="balcore-stat-desc">Always returned on exit</div>
              </div>
              <div>
                <div className="balcore-stat-num">24<span>/7</span></div>
                <div className="balcore-stat-desc">Fully automated</div>
              </div>
            </div>
          </div>

          <div className="balcore-hero-right">
            <div className="balcore-hub-scene-wrap">
              <div ref={sceneRef} className="balcore-scene">
                <div className="balcore-ring balcore-ring1">
                  <div className="balcore-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                  <div className="balcore-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                </div>
                <div className="balcore-ring balcore-ring2">
                  <div className="balcore-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                  <div className="balcore-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
                  <div className="balcore-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                  <div className="balcore-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
                <div className="balcore-ring balcore-ring3">
                  <div className="balcore-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                  <div className="balcore-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
                  <div className="balcore-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
                  <div className="balcore-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
                </div>
                <div className="balcore-core">
                  <div className="balcore-core-label">BALCORE</div>
                  <div className="balcore-core-sub">FLOWYIELD</div>
                </div>

                {tokenPositions.map((token) => (
                  <button
                    key={token.id}
                    type="button"
                    className="balcore-token"
                    style={{
                      transform: `translate(calc(-50% + ${token.tx}px), calc(-50% + ${token.ty}px))`,
                    }}
                    onMouseEnter={(event) =>
                      setTooltip({
                        visible: true,
                        x: event.clientX + 16,
                        y: event.clientY - 12,
                        token,
                      })
                    }
                    onMouseLeave={() => setTooltip({ visible: false, x: 0, y: 0, token: null })}
                    aria-label={`${token.id} ${token.name}`}
                  >
                    <div
                      className="balcore-token-inner"
                      style={{
                        background: `radial-gradient(circle, ${token.color}1a 0%, #0d0d1e 75%)`,
                        borderColor: token.color,
                        boxShadow: `0 0 18px ${token.glow}, 0 0 38px ${token.glow.replace("0.55", "0.12")}`,
                        ["--fd" as string]: token.fd,
                        ["--fdd" as string]: token.fdd,
                      }}
                    >
                      {logos[token.logo]}
                      <div className="balcore-token-name">{token.name}</div>
                    </div>
                    <div
                      className="balcore-token-pulse"
                      style={{
                        ["--pc" as string]: token.color,
                        ["--pd" as string]: token.pd,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <a href="#visual-story" className="balcore-scroll-hint">
            <span>Scroll</span>
            <div className="balcore-scroll-arrow" />
          </a>
        </div>

        {tooltip.visible && tooltip.token ? (
          <div className="balcore-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            <div className="balcore-tooltip-name" style={{ color: tooltip.token.color }}>
              {tooltip.token.id} — {tooltip.token.name}
            </div>
            <div className="balcore-tooltip-role">{tooltip.token.role}</div>
            <div>{tooltip.token.info}</div>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default HeroSection;
