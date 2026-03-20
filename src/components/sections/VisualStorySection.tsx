import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Layer = "all" | "active" | "reserve";

type AssetKey = keyof typeof assetData;

type AssetInfo = {
  layer: "Active layer" | "Reserve layer";
  color: string;
  role: string;
  bars: [number, number];
};

type YieldDot = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  t: number;
  speed: number;
  color: string;
  size: number;
  opacity: number;
};

type TrailPoint = {
  x: number;
  y: number;
  t: number;
};

type OrbitDef = {
  label: string;
  color: string;
  radius: number;
  angle: number;
  duration: string;
  symbol?: string;
};

const assetData = {
  BTC: {
    layer: "Active layer",
    color: "#F7931A",
    role: "Concentrated LP bins — highest fee capture per dollar. Paired with USDC at equal value. Part of the active market making layer.",
    bars: [100, 0],
  },
  AVAX: {
    layer: "Active layer",
    color: "#E84142",
    role: "Core Avalanche pair. Dynamic rebalancing anchored around VAH. Deepest on-chain liquidity on the network.",
    bars: [100, 0],
  },
  USDC: {
    layer: "Active layer",
    color: "#2775CA",
    role: "Stable anchor for all LP pairs. Equal-value deposit rule enforced. Anti-manipulation price lock keeps the vault safe.",
    bars: [100, 0],
  },
  ETH: {
    layer: "Reserve layer",
    color: "#627EEA",
    role: "WETH.e in the reserve layer. Earns Benqi lending interest continuously. Zero IL exposure — never in an active trading pool.",
    bars: [0, 100],
  },
  GOLD: {
    layer: "Reserve layer",
    color: "#D4A017",
    role: "Tokenized gold. RWA reserve asset earning steady Benqi yield. Part of BalCore's expanding real-world asset support.",
    bars: [0, 100],
  },
  TSLA: {
    layer: "Reserve layer",
    color: "#CC0000",
    role: "Tokenized Tesla equity on-chain. 24/7 liquidity — no NYSE hours, no settlement delays. The future of equity market making.",
    bars: [0, 100],
  },
  NVDA: {
    layer: "Reserve layer",
    color: "#76B900",
    role: "Tokenized NVIDIA equity. AI infrastructure asset on-chain. Part of the Nasdaq tokenization wave.",
    bars: [0, 100],
  },
  USD: {
    layer: "Reserve layer",
    color: "#1B7F4F",
    role: "Dollar-backed stable reserve. Deepest liquidity anchor. Core base pair for vault stability and fast-track withdrawals.",
    bars: [0, 100],
  },
} satisfies Record<string, AssetInfo>;

const activeAssets: OrbitDef[] = [
  { label: "BTC", color: "#F7931A", radius: 23, angle: 0, duration: "22s", symbol: "₿" },
  { label: "AVAX", color: "#E84142", radius: 23, angle: 120, duration: "22s", symbol: "▲" },
  { label: "USDC", color: "#2775CA", radius: 23, angle: 240, duration: "22s", symbol: "$" },
];

const reserveAssets: OrbitDef[] = [
  { label: "ETH", color: "#627EEA", radius: 21, angle: 20, duration: "36s" },
  { label: "GOLD", color: "#D4A017", radius: 21, angle: 92, duration: "36s" },
  { label: "TSLA", color: "#CC0000", radius: 21, angle: 164, duration: "36s" },
  { label: "NVDA", color: "#76B900", radius: 21, angle: 236, duration: "36s" },
  { label: "USD", color: "#1B7F4F", radius: 21, angle: 308, duration: "36s" },
];

const trailAngles = {
  btc: { angle: 0, r: 122, speed: 0.00045, color: "#F7931A" },
  avax: { angle: 2.09, r: 122, speed: 0.00045, color: "#E84142" },
  usdc: { angle: 4.19, r: 122, speed: 0.00045, color: "#2775CA" },
  eth: { angle: 0.35, r: 192, speed: 0.00029, color: "#627EEA" },
  gold: { angle: 1.6, r: 192, speed: 0.00029, color: "#D4A017" },
  tsla: { angle: 2.86, r: 192, speed: 0.00029, color: "#CC0000" },
  nvda: { angle: 4.11, r: 192, speed: 0.00029, color: "#76B900" },
  usd: { angle: 5.36, r: 192, speed: 0.00029, color: "#1B7F4F" },
};

const VisualStorySection = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const pulseFrameRef = useRef<number>();
  const badgeTimeoutRef = useRef<number>();
  const toastTimeoutRef = useRef<number>();
  const lastSpawnRef = useRef(0);
  const yieldDotsRef = useRef<YieldDot[]>([]);
  const trailPointsRef = useRef<Record<string, TrailPoint[]>>(
    Object.fromEntries(Object.keys(trailAngles).map((key) => [key, []]))
  );
  const angleStateRef = useRef(
    Object.fromEntries(
      Object.entries(trailAngles).map(([key, value]) => [key, { ...value }])
    ) as typeof trailAngles
  );

  const [layer, setLayer] = useState<Layer>("all");
  const [selectedAsset, setSelectedAsset] = useState<AssetKey | null>(null);
  const [apyValue, setApyValue] = useState(18.4);
  const [targetApyStat, setTargetApyStat] = useState(0);
  const [reserveStat, setReserveStat] = useState(0);
  const [shieldLayers, setShieldLayers] = useState(0);
  const [rebalances, setRebalances] = useState(0);
  const [automation, setAutomation] = useState("—");
  const [rebalanceBadgeVisible, setRebalanceBadgeVisible] = useState(false);
  const [pairLineBoost, setPairLineBoost] = useState(false);
  const [pulseRing, setPulseRing] = useState({ radius: 44, opacity: 0 });

  const selectedAssetInfo = selectedAsset ? assetData[selectedAsset] : null;

  const layerVisuals = useMemo(() => {
    if (layer === "active") {
      return {
        activeOpacity: 1,
        reserveOpacity: 0.08,
        activeRingOpacity: 0.9,
        reserveRingOpacity: 0.05,
        activeLabelOpacity: 1,
        reserveLabelOpacity: 0.08,
        pairLineOpacity: pairLineBoost ? 0.7 : 0.5,
      };
    }

    if (layer === "reserve") {
      return {
        activeOpacity: 0.08,
        reserveOpacity: 1,
        activeRingOpacity: 0.05,
        reserveRingOpacity: 0.9,
        activeLabelOpacity: 0.08,
        reserveLabelOpacity: 1,
        pairLineOpacity: pairLineBoost ? 0.7 : 0.05,
      };
    }

    return {
      activeOpacity: 1,
      reserveOpacity: 1,
      activeRingOpacity: 0.35,
      reserveRingOpacity: 0.28,
      activeLabelOpacity: 0.48,
      reserveLabelOpacity: 0.55,
      pairLineOpacity: pairLineBoost ? 0.7 : 0.18,
    };
  }, [layer, pairLineBoost]);

  const svgToCanvas = useCallback((x: number, y: number, width: number, height: number) => ({
    x: (x / 700) * width,
    y: (y / 480) * height,
  }), []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return null;

    const rect = wrap.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;
    const context = canvas.getContext("2d");
    if (!context) return null;

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.scale(scale, scale);

    return { context, width: rect.width, height: rect.height };
  }, []);

  const tickApy = useCallback(() => {
    const next = 12 + Math.random() * 16;
    setApyValue(next);
  }, []);

  const spawnBurst = useCallback(() => {
    for (let i = 0; i < 16; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      yieldDotsRef.current.push({
        x: 350,
        y: 240,
        tx: 350 + Math.cos(angle) * 185,
        ty: 240 + Math.sin(angle) * 185,
        t: 0,
        speed: 0.008 + Math.random() * 0.006,
        color: "#7c3aed",
        size: 2.5,
        opacity: 0,
      });
    }
  }, []);

  const triggerRebalance = useCallback(() => {
    setRebalances((value) => value + 1);
    setRebalanceBadgeVisible(true);
    setPairLineBoost(true);

    window.clearTimeout(badgeTimeoutRef.current);
    badgeTimeoutRef.current = window.setTimeout(() => setRebalanceBadgeVisible(false), 2200);
    window.setTimeout(() => setPairLineBoost(false), 700);

    if (pulseFrameRef.current) {
      window.cancelAnimationFrame(pulseFrameRef.current);
    }

    const start = performance.now();
    const animatePulse = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / 900, 1);
      const radius = 44 + progress * 130;
      setPulseRing({ radius, opacity: 0.85 * (1 - progress) });
      if (progress < 1) {
        pulseFrameRef.current = window.requestAnimationFrame(animatePulse);
      } else {
        setPulseRing({ radius: 44, opacity: 0 });
      }
    };

    pulseFrameRef.current = window.requestAnimationFrame(animatePulse);
    spawnBurst();
    tickApy();
  }, [spawnBurst, tickApy]);

  useEffect(() => {
    const animateCount = (
      setter: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration = 1200
    ) => {
      const start = performance.now();
      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setter(Math.round(target * ease));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    const timeout = window.setTimeout(() => {
      animateCount(setTargetApyStat, 30);
      animateCount(setReserveStat, 90);
      animateCount(setShieldLayers, 3, 900);
      animateCount(setRebalances, 0, 400);
      window.setTimeout(() => setAutomation("24/7"), 1100);
    }, 400);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    tickApy();
    const interval = window.setInterval(tickApy, 3800);
    return () => window.clearInterval(interval);
  }, [tickApy]);

  useEffect(() => {
    const interval = window.setInterval(triggerRebalance, 12000);
    return () => window.clearInterval(interval);
  }, [triggerRebalance]);

  useEffect(() => {
    const draw = (timestamp: number) => {
      const sized = resizeCanvas();
      if (!sized) {
        animationFrameRef.current = window.requestAnimationFrame(draw);
        return;
      }

      const { context, width, height } = sized;
      context.clearRect(0, 0, width, height);

      Object.entries(angleStateRef.current).forEach(([key, value]) => {
        value.angle += value.speed;
        const x = 350 + Math.cos(value.angle - Math.PI / 2) * value.r;
        const y = 240 + Math.sin(value.angle - Math.PI / 2) * value.r;
        const points = trailPointsRef.current[key];
        points.push({ x, y, t: timestamp });
        while (points.length > 0 && timestamp - points[0].t > 1800) {
          points.shift();
        }

        if (points.length > 1) {
          for (let i = 1; i < points.length; i += 1) {
            const age = (timestamp - points[i].t) / 1800;
            const p0 = svgToCanvas(points[i - 1].x, points[i - 1].y, width, height);
            const p1 = svgToCanvas(points[i].x, points[i].y, width, height);
            context.beginPath();
            context.moveTo(p0.x, p0.y);
            context.lineTo(p1.x, p1.y);
            context.strokeStyle = value.color;
            context.lineWidth = 1.5;
            context.globalAlpha = (1 - age) * 0.42;
            context.stroke();
            context.globalAlpha = 1;
          }
        }
      });

      if (timestamp - lastSpawnRef.current > 420) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 185;
        yieldDotsRef.current.push({
          x: 350 + Math.cos(angle) * radius,
          y: 240 + Math.sin(angle) * radius,
          tx: 350 + Math.cos(angle) * 44,
          ty: 240 + Math.sin(angle) * 44,
          t: 0,
          speed: 0.008 + Math.random() * 0.006,
          color: "#0EA5E9",
          size: 2,
          opacity: 0,
        });
        lastSpawnRef.current = timestamp;
      }

      for (let i = yieldDotsRef.current.length - 1; i >= 0; i -= 1) {
        const dot = yieldDotsRef.current[i];
        dot.t += dot.speed;
        dot.opacity = dot.t < 0.15 ? dot.t / 0.15 : dot.t > 0.8 ? (1 - dot.t) / 0.2 : 1;
        const cx = dot.x + (dot.tx - dot.x) * dot.t;
        const cy = dot.y + (dot.ty - dot.y) * dot.t;
        const point = svgToCanvas(cx, cy, width, height);
        context.beginPath();
        context.arc(point.x, point.y, dot.size, 0, Math.PI * 2);
        context.fillStyle = dot.color;
        context.globalAlpha = Math.min(dot.opacity, 0.85);
        context.fill();
        context.globalAlpha = 1;

        if (dot.t >= 1) {
          yieldDotsRef.current.splice(i, 1);
        }
      }

      animationFrameRef.current = window.requestAnimationFrame(draw);
    };

    animationFrameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas, svgToCanvas]);

  useEffect(() => {
    if (!selectedAsset) return undefined;
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setSelectedAsset(null), 4500);
    return () => window.clearTimeout(toastTimeoutRef.current);
  }, [selectedAsset]);

  useEffect(() => {
    return () => {
      if (pulseFrameRef.current) window.cancelAnimationFrame(pulseFrameRef.current);
      window.clearTimeout(badgeTimeoutRef.current);
      window.clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const getApyColor = apyValue > 20 ? "#4ade80" : apyValue > 15 ? "#38bdf8" : "#fbbf24";

  const buttonClass = (value: Layer) => `fy-btn ${layer === value ? "factive" : ""}`;

  const orbitStyle = (asset: OrbitDef): CSSProperties => ({
    ["--s" as string]: `${asset.angle}deg`,
    ["--dur" as string]: asset.duration,
    transformOrigin: "350px 240px",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&display=swap');
        .flowyield-section, .flowyield-section * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeInUpF{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes orbit{from{transform:rotate(var(--s))}to{transform:rotate(calc(var(--s) + 360deg))}}
        @keyframes corePulseF{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes rbadgeF{0%{opacity:0;transform:translateX(-50%) scale(.9)}20%{opacity:1;transform:translateX(-50%) scale(1)}80%{opacity:1}100%{opacity:0}}
        @media(prefers-reduced-motion:no-preference){
          .forbit{animation:orbit var(--dur,22s) linear infinite}
          .fcore-pulse{animation:corePulseF 3s ease-in-out infinite}
        }
        .fy-section{padding:7rem 0;background:linear-gradient(180deg,#07080f 0%,#080c1a 50%,#07080f 100%);position:relative;min-height:100vh;display:flex;align-items:center}
        .fy-inner{max-width:960px;margin:0 auto;padding:0 3rem;width:100%}
        .fy-head{text-align:center;margin-bottom:3.5rem}
        .fy-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.28);border-radius:100px;padding:5px 16px;margin-bottom:1.25rem;animation:fadeUp .8s ease both}
        .fy-eyebrow span{font-size:10px;font-weight:600;letter-spacing:1.8px;color:#a78bfa;text-transform:uppercase;font-family:'Inter',sans-serif}
        .fy-h2{font-family:'Syne',sans-serif;font-size:clamp(32px,3.8vw,50px);font-weight:800;letter-spacing:-1.5px;color:#fff;margin-bottom:.85rem;animation:fadeUp .8s .08s ease both}
        .fy-hdesc{font-size:15px;color:rgba(255,255,255,0.55);max-width:520px;margin:0 auto;line-height:1.75;font-family:'Inter',sans-serif;animation:fadeUp .8s .16s ease both}
        .fy-card{background:rgba(255,255,255,0.022);border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:2rem;backdrop-filter:blur(12px);box-shadow:0 0 80px rgba(124,58,237,0.06),0 32px 64px rgba(0,0,0,0.3)}
        .fy-topbar{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid rgba(255,255,255,0.06)}
        .fy-title{font-size:16px;font-weight:600;color:#fff;font-family:'Syne',sans-serif;letter-spacing:-.2px}
        .fy-sub{font-size:11px;color:rgba(255,255,255,0.38);margin-top:4px;font-family:'Inter',sans-serif}
        .fy-btns{display:flex;gap:5px;flex-wrap:wrap}
        .fy-btn{cursor:pointer;border-radius:7px;border:1px solid rgba(255,255,255,0.11);background:rgba(255,255,255,0.04);padding:6px 14px;font-size:11px;color:rgba(255,255,255,0.45);transition:all .15s;font-family:'Inter',sans-serif;letter-spacing:.1px}
        .fy-btn:hover:not(.factive){background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7)}
        .fy-btn.factive{background:#7c3aed;color:#fff;border-color:#7c3aed;box-shadow:0 0 16px rgba(124,58,237,0.35)}
        .fy-btn.fpulse{color:rgba(14,165,233,0.85);border-color:rgba(14,165,233,0.3);background:rgba(14,165,233,0.06)}
        .fy-btn.fpulse:hover{background:#0EA5E9;color:#fff;border-color:#0EA5E9}
        .fvis{position:relative;border-radius:16px;border:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2);overflow:hidden}
        .ftrails{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
        #fmain-svg{display:block;position:relative;z-index:1}
        .fapy{position:absolute;bottom:16px;right:16px;background:rgba(7,8,15,0.94);border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:8px 14px;text-align:right;z-index:10;backdrop-filter:blur(12px)}
        .fapy-label{font-size:9px;color:rgba(255,255,255,0.28);font-family:'Inter',sans-serif;letter-spacing:.5px;text-transform:uppercase}
        .fapy-val{font-size:20px;font-weight:700;font-family:'Syne',sans-serif;margin-top:2px}
        .frbadge{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);background:rgba(124,58,237,0.18);border:1px solid rgba(124,58,237,0.38);border-radius:20px;padding:5px 18px;font-size:10px;color:#a78bfa;z-index:10;font-family:'Inter',sans-serif;letter-spacing:.3px;backdrop-filter:blur(8px)}
        .frbadge.is-visible{animation:rbadgeF 2.2s ease forwards}
        .ftoast{position:absolute;top:14px;left:14px;background:rgba(7,8,15,0.97);border:1px solid rgba(124,58,237,0.35);border-radius:14px;padding:14px 18px;font-size:12px;max-width:230px;z-index:20;box-shadow:0 8px 32px rgba(0,0,0,.6);backdrop-filter:blur(16px);animation:fadeInUpF .2s ease}
        .ftoast-name{font-weight:700;color:#fff;margin-bottom:7px;font-size:13px;font-family:'Syne',sans-serif}
        .ftoast-bar{display:flex;gap:8px;align-items:center;margin:7px 0 6px}
        .ftoast-info{color:rgba(255,255,255,0.48);line-height:1.6;font-size:11px;font-family:'Inter',sans-serif}
        .fstats{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-top:1.25rem}
        .fst{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px 14px;transition:border-color .2s,background .2s}
        .fst:hover{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1)}
        .fst-label{font-size:9px;color:rgba(255,255,255,0.28);margin-bottom:5px;font-family:'Inter',sans-serif;letter-spacing:.5px;text-transform:uppercase}
        .fst-val{font-size:20px;font-weight:700;line-height:1;color:#fff;font-family:'Syne',sans-serif}
        .fst-sub{font-size:9px;color:rgba(255,255,255,0.25);margin-top:4px;font-family:'Inter',sans-serif}
        .flegend{display:flex;gap:1.5rem;margin-top:1.25rem;flex-wrap:wrap;font-size:11px;color:rgba(255,255,255,0.32);font-family:'Inter',sans-serif;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,0.05)}
        .fldot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0}
        .fasset{cursor:pointer;transition:filter .2s}
        .fasset:hover{filter:brightness(1.2)}
        @media(max-width:900px){.fy-inner{padding:0 1.5rem}.fstats{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:640px){.fy-section{padding:4rem 0}.fy-btns{display:none}.fstats{grid-template-columns:repeat(2,1fr)}}
      `}</style>

      <section id="visual-story" className="flowyield-section fy-section">
        <div id="flowyield" className="absolute -top-24" aria-hidden="true" />
        <div className="fy-inner">
          <div className="fy-head">
            <div className="fy-eyebrow"><span>How It Works</span></div>
            <h2 className="fy-h2">The FlowYield Engine</h2>
            <p className="fy-hdesc">Multi-asset market making, continuous IL mitigation, and dual-layer yield — running automatically, 24/7.</p>
          </div>

          <div className="fy-card">
            <div className="fy-topbar">
              <div>
                <div className="fy-title">FlowYield — live rebalancing engine</div>
                <div className="fy-sub">Multi-asset market making · Continuous IL mitigation · Dual-layer yield</div>
              </div>
              <div className="fy-btns" id="flbtns">
                <button className={buttonClass("all")} onClick={() => setLayer("all")}>All layers</button>
                <button className={buttonClass("active")} onClick={() => setLayer("active")}>Active layer</button>
                <button className={buttonClass("reserve")} onClick={() => setLayer("reserve")}>Reserve layer</button>
                <button className="fy-btn fpulse" onClick={triggerRebalance}>Simulate rebalance ↻</button>
              </div>
            </div>

            <div className="fvis" id="fviswrap" ref={wrapRef}>
              <canvas ref={canvasRef} className="ftrails" />
              <svg id="fmain-svg" width="100%" viewBox="0 0 700 480">
                <defs>
                  <marker id="farw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </marker>
                  <radialGradient id="fcg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity=".16" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="frg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity=".08" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx="350" cy="240" r="210" fill="url(#frg)" />
                <circle cx="350" cy="240" r="115" fill="url(#fcg)" />

                <g id="fpair-lines" opacity={layerVisuals.pairLineOpacity}>
                  <line x1="350" y1="118" x2="350" y2="362" stroke="#F7931A" strokeWidth="0.7" strokeDasharray="3 5" />
                  <line x1="218" y1="362" x2="482" y2="362" stroke="#E84142" strokeWidth="0.7" strokeDasharray="3 5" />
                </g>

                <circle id="fres-ring" cx="350" cy="240" r="192" fill="none" stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="4 7" opacity={layerVisuals.reserveRingOpacity} />
                <text id="fres-lbl" x="350" y="54" textAnchor="middle" fontSize="11" fill="#0EA5E9" opacity={layerVisuals.reserveLabelOpacity} fontFamily="Inter,sans-serif">reserve yield layer — Benqi · zero IL exposure</text>

                <circle id="fact-ring" cx="350" cy="240" r="122" fill="none" stroke="#a78bfa" strokeWidth="0.5" strokeDasharray="3 5" opacity={layerVisuals.activeRingOpacity} />
                <text id="fact-lbl" x="350" y="126" textAnchor="middle" fontSize="11" fill="#a78bfa" opacity={layerVisuals.activeLabelOpacity} fontFamily="Inter,sans-serif">active market making layer · fee generation</text>

                <circle id="fpulse-ring" cx="350" cy="240" r={pulseRing.radius} fill="none" stroke="#7c3aed" strokeWidth="1.5" opacity={pulseRing.opacity} />

                <g className="fcore-pulse" style={{ transformOrigin: "350px 240px" }} id="fcore-group">
                  <circle cx="350" cy="240" r="65" fill="#7c3aed" opacity=".05" />
                  <circle cx="350" cy="240" r="54" fill="#7c3aed" opacity=".09" />
                  <circle cx="350" cy="240" r="45" fill="#7c3aed" opacity=".14" />
                  <circle cx="350" cy="240" r="37" fill="#7c3aed" opacity=".92" />
                  <text x="350" y="234" textAnchor="middle" fontSize="12" fontWeight="600" fill="white" fontFamily="Inter,sans-serif">FlowYield</text>
                  <text x="350" y="248" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,.72)" fontFamily="Inter,sans-serif">engine</text>
                </g>
                <circle cx="350" cy="240" r="37" fill="none" stroke="white" strokeWidth=".5" opacity=".18" />

                <g id="factive-assets" opacity={layerVisuals.activeOpacity}>
                  {activeAssets.map((asset) => (
                    <g key={asset.label} className="forbit" style={orbitStyle(asset)}>
                      <g className="fasset" transform="translate(350,118)" onClick={() => setSelectedAsset(asset.label as AssetKey)}>
                        <circle r={asset.radius} fill={asset.color} opacity=".93" />
                        <text textAnchor="middle" fontSize="11" fontWeight="600" fill="white" dy="1" fontFamily="Inter,sans-serif">{asset.label}</text>
                        <text textAnchor="middle" fontSize="8" fill="rgba(255,255,255,.8)" dy="12" fontFamily="Inter,sans-serif">{asset.symbol}</text>
                      </g>
                    </g>
                  ))}
                </g>

                <g id="freserve-assets" opacity={layerVisuals.reserveOpacity}>
                  {reserveAssets.map((asset) => (
                    <g key={asset.label} className="forbit" style={orbitStyle(asset)}>
                      <g className="fasset" transform="translate(350,48)" onClick={() => setSelectedAsset(asset.label as AssetKey)}>
                        <circle r={asset.radius} fill={asset.color} opacity=".88" />
                        <text textAnchor="middle" fontSize="10" fontWeight="600" fill="white" dy="4" fontFamily="Inter,sans-serif">{asset.label}</text>
                      </g>
                    </g>
                  ))}
                </g>

                <g id="fil-shield" opacity=".85">
                  <path d="M264 320 A112 112 0 0 0 436 320" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="264" cy="320" r="4" fill="#16A34A" />
                  <circle cx="350" cy="342" r="4" fill="#16A34A" />
                  <circle cx="436" cy="320" r="4" fill="#16A34A" />
                  <text x="350" y="388" textAnchor="middle" fontSize="10" fill="#16A34A" fontFamily="Inter,sans-serif">IL protection — 3 independent layers always active</text>
                  <text x="264" y="338" textAnchor="middle" fontSize="9" fill="#16A34A" opacity=".8" fontFamily="Inter,sans-serif">prevention</text>
                  <text x="350" y="358" textAnchor="middle" fontSize="9" fill="#16A34A" opacity=".8" fontFamily="Inter,sans-serif">IL reserve</text>
                  <text x="436" y="338" textAnchor="middle" fontSize="9" fill="#16A34A" opacity=".8" fontFamily="Inter,sans-serif">backup vault</text>
                </g>

                <g opacity=".38">
                  <text x="120" y="162" textAnchor="middle" fontSize="10" fill="#0EA5E9" fontFamily="Inter,sans-serif">LP fees</text>
                  <path d="M158 160 L193 184" stroke="#0EA5E9" strokeWidth=".8" fill="none" markerEnd="url(#farw)" />
                  <text x="582" y="162" textAnchor="middle" fontSize="10" fill="#0EA5E9" fontFamily="Inter,sans-serif">reserve yield</text>
                  <path d="M542 160 L508 184" stroke="#0EA5E9" strokeWidth=".8" fill="none" markerEnd="url(#farw)" />
                  <text x="120" y="322" textAnchor="middle" fontSize="10" fill="#0EA5E9" fontFamily="Inter,sans-serif">rebalancing</text>
                  <path d="M158 314 L193 292" stroke="#0EA5E9" strokeWidth=".8" fill="none" markerEnd="url(#farw)" />
                  <text x="582" y="322" textAnchor="middle" fontSize="10" fill="#0EA5E9" fontFamily="Inter,sans-serif">fee harvest</text>
                  <path d="M542 314 L508 292" stroke="#0EA5E9" strokeWidth=".8" fill="none" markerEnd="url(#farw)" />
                </g>

                <rect x="490" y="68" width="168" height="80" rx="8" fill="rgba(7,8,15,0.92)" stroke="rgba(124,58,237,0.45)" strokeWidth=".5" />
                <text x="574" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="#a78bfa" fontFamily="Inter,sans-serif">FlowYield architecture</text>
                <rect x="501" y="100" width="14" height="10" rx="2" fill="#7c3aed" opacity=".9" />
                <text x="521" y="109" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">Active market making</text>
                <rect x="501" y="116" width="14" height="10" rx="2" fill="#0EA5E9" opacity=".75" />
                <text x="521" y="125" fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="Inter,sans-serif">Reserve yield engine</text>
                <text x="501" y="143" fontSize="9" fill="rgba(255,255,255,0.28)" fontFamily="Inter,sans-serif">proprietary · continuously optimised</text>
              </svg>

              <div className="fapy"><div className="fapy-label">live est. APY</div><div className="fapy-val" style={{ color: getApyColor }}>{apyValue.toFixed(1)}%</div></div>
              {rebalanceBadgeVisible ? <div className="frbadge is-visible">↻ rebalancing positions...</div> : null}
              {selectedAssetInfo ? (
                <div className="ftoast">
                  <div className="ftoast-name"><span style={{ color: selectedAssetInfo.color }}>●</span> {selectedAsset} — {selectedAssetInfo.layer}</div>
                  <div className="ftoast-bar">
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,.3)", marginBottom: "3px" }}>market making</div>
                      <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${selectedAssetInfo.bars[0]}%`, background: "#7c3aed", borderRadius: "3px" }} />
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,.3)", marginBottom: "3px" }}>reserve yield</div>
                      <div style={{ height: "5px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${selectedAssetInfo.bars[1]}%`, background: "#0EA5E9", borderRadius: "3px" }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", paddingLeft: "6px" }}>
                      <div style={{ fontSize: "9px", color: "rgba(255,255,255,.3)" }}>role</div>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: selectedAssetInfo.color }}>
                        {selectedAssetInfo.bars[0] > 0 ? "Active" : "Reserve"}
                      </div>
                    </div>
                  </div>
                  <div className="ftoast-info">{selectedAssetInfo.role}</div>
                </div>
              ) : null}
            </div>

            <div className="fstats">
              <div className="fst"><div className="fst-label">Target APY</div><div className="fst-val" style={{ color: "#4ade80" }}>{targetApyStat}%</div><div className="fst-sub">market-dependent</div></div>
              <div className="fst"><div className="fst-label">Principal</div><div className="fst-val" style={{ color: "#a78bfa" }}>Protected</div><div className="fst-sub">always returned on exit</div></div>
              <div className="fst"><div className="fst-label">Reserve layer</div><div className="fst-val" style={{ color: "#38bdf8" }}>{reserveStat}%</div><div className="fst-sub">Benqi yield active</div></div>
              <div className="fst"><div className="fst-label">IL shield layers</div><div className="fst-val" style={{ color: "#a78bfa" }}>{shieldLayers}</div><div className="fst-sub">always active</div></div>
              <div className="fst"><div className="fst-label">Rebalances</div><div className="fst-val">{rebalances}</div><div className="fst-sub">this session</div></div>
              <div className="fst"><div className="fst-label">Automation</div><div className="fst-val">{automation}</div><div className="fst-sub">no action needed</div></div>
            </div>

            <div className="flegend">
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="fldot" style={{ background: "#a78bfa" }} />Active market making layer</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="fldot" style={{ background: "#0EA5E9" }} />Reserve yield layer</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="fldot" style={{ background: "#16A34A" }} />IL protection shield</span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><span className="fldot" style={{ background: "#F7931A" }} />Click any asset for details</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisualStorySection;
