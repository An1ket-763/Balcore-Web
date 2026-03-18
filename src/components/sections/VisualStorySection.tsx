import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const TAU = Math.PI * 2;

type CanvasSetup = {
  ctx: CanvasRenderingContext2D;
  W: number;
  H: number;
};

type CanvasAsset = {
  label: string;
  shortLabel?: string;
  imageKey?: string;
  fill: string;
  stroke: string;
  glow: string;
  text: string;
};

function glow(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, col: string, alpha: number) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, col.replace("1)", `${alpha})`));
  g.addColorStop(0.5, col.replace("1)", `${alpha * 0.3})`));
  g.addColorStop(1, col.replace("1)", "0)"));
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.fillStyle = g;
  ctx.fill();
}

function drawAssetBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  text: string,
  fill: string,
  stroke: string,
  color: string,
) {
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y, width, 22, 7);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = "600 10px 'DM Sans', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y + 12);
  ctx.textBaseline = "alphabetic";
}

function drawAssetNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  asset: CanvasAsset,
  image?: HTMLImageElement,
) {
  glow(ctx, x, y, radius * 1.95, asset.glow, 0.22);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, TAU);
  ctx.fillStyle = asset.fill;
  ctx.fill();
  ctx.strokeStyle = asset.stroke;
  ctx.lineWidth = 2.2;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x, y, radius * 0.7, 0, TAU);
  ctx.strokeStyle = `${asset.stroke}55`;
  ctx.lineWidth = 1;
  ctx.stroke();

  const imageSize = radius * 1.14;
  if (image && image.complete && image.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.68, 0, TAU);
    ctx.clip();
    ctx.drawImage(image, x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
    ctx.restore();
  } else {
    ctx.fillStyle = asset.text;
    ctx.font = `700 ${Math.round(radius * 0.44)}px 'DM Sans', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(asset.shortLabel ?? asset.label, x, y);
    ctx.textBaseline = "alphabetic";
  }

  const badgeWidth = Math.max(44, ctx.measureText(asset.label).width + 20);
  drawAssetBadge(ctx, x, y + radius + 10, badgeWidth, asset.label, "rgba(8, 7, 19, 0.88)", asset.stroke, asset.text);
}

function initCanvas(canvas: HTMLCanvasElement | null): CanvasSetup | null {
  if (!canvas) return null;
  canvas.width = 560;
  canvas.height = 644;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  return { ctx, W: 560, H: 644 };
}

function useVisualStoryCanvases(
  c1: RefObject<HTMLCanvasElement | null>,
  c2: RefObject<HTMLCanvasElement | null>,
  c3: RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const cv1 = initCanvas(c1.current);
    const cv2 = initCanvas(c2.current);
    const cv3 = initCanvas(c3.current);
    if (!cv1 || !cv2 || !cv3) return;

    const assetImages: Record<string, HTMLImageElement> = {
      usdc: new Image(),
      btc: new Image(),
      avax: new Image(),
      eth: new Image(),
    };

    assetImages.usdc.src = "/logo3.png";
    assetImages.btc.src = "/logo2.png";
    assetImages.avax.src = "/logo1.png";
    assetImages.eth.src = "/logo4.png";

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;

    // C1 — Idle Capital
    const coins: [number, number, number][] = [
      [0.5, 0.18, 48],
      [0.24, 0.36, 36],
      [0.76, 0.36, 36],
      [0.5, 0.5, 58],
      [0.22, 0.66, 32],
      [0.78, 0.66, 32],
      [0.5, 0.82, 42],
    ];

    const draw1 = (ts: number) => {
      const { ctx, W, H } = cv1;
      const t = ts * 0.00028;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07060e";
      ctx.fillRect(0, 0, W, H);

      coins.forEach(([fx, fy, r], i) => {
        const cx = fx * W;
        const cy = fy * H + Math.sin(t * 0.9 + i * 1.1) * 2.5;

        glow(ctx, cx, cy, r * 2.4, "rgba(72,65,115,1)", 0.12);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, TAU);
        ctx.fillStyle = "rgba(36,32,62,0.75)";
        ctx.fill();
        ctx.strokeStyle = "rgba(80,72,118,0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.62, 0, TAU);
        ctx.strokeStyle = "rgba(80,72,118,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = `600 ${Math.round(r * 0.5)}px 'DM Sans', sans-serif`;
        ctx.fillStyle = "rgba(100,92,148,0.8)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("$", cx, cy);
        ctx.textBaseline = "alphabetic";

        if (r >= 40) {
          const za = 0.18 + 0.12 * Math.sin(t * 1.3 + i);
          ctx.font = `300 ${Math.round(r * 0.25)}px 'DM Sans', sans-serif`;
          ctx.fillStyle = `rgba(90,82,135,${za})`;
          ctx.textAlign = "center";
          ctx.fillText("z  z  z", cx, cy - r - 10);
        }
      });

      raf1 = requestAnimationFrame(draw1);
    };

    // C2 — Multi-asset orchestration
    const { W: W2, H: H2 } = cv2;
    const HX = W2 / 2;
    const HY = H2 / 2;
    const HR = 48;
    const ORBIT = 178;
    const orbitAssets: CanvasAsset[] = [
      { label: "BTC", imageKey: "btc", fill: "rgba(50, 28, 4, 0.82)", stroke: "#f59e0b", glow: "rgba(245,158,11,1)", text: "#fcd34d" },
      { label: "ETH", imageKey: "eth", fill: "rgba(30, 30, 36, 0.88)", stroke: "#a1a1aa", glow: "rgba(161,161,170,1)", text: "#f4f4f5" },
      { label: "NVDA", shortLabel: "NV", fill: "rgba(7, 35, 20, 0.88)", stroke: "#4ade80", glow: "rgba(74,222,128,1)", text: "#bbf7d0" },
      { label: "GOLD", shortLabel: "Au", fill: "rgba(59, 46, 6, 0.9)", stroke: "#facc15", glow: "rgba(250,204,21,1)", text: "#fde68a" },
      { label: "AVAX", imageKey: "avax", fill: "rgba(58, 16, 21, 0.88)", stroke: "#f87171", glow: "rgba(248,113,113,1)", text: "#fecaca" },
      { label: "USDC", imageKey: "usdc", fill: "rgba(18, 36, 69, 0.88)", stroke: "#60a5fa", glow: "rgba(96,165,250,1)", text: "#bfdbfe" },
    ];
    const outerAngles = orbitAssets.map((_, i) => (i / orbitAssets.length) * TAU - Math.PI / 2);
    const outer = outerAngles.map((a, i) => ({
      x: HX + Math.cos(a) * ORBIT,
      y: HY + Math.sin(a) * ORBIT,
      a,
      asset: orbitAssets[i],
    }));

    const draw2 = (ts: number) => {
      const { ctx, W, H } = cv2;
      const t = ts * 0.0005;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07060e";
      ctx.fillRect(0, 0, W, H);

      for (let ri = 0; ri < 3; ri++) {
        const pt = (t * 1.4 + ri * 0.28) % 1;
        const pr = HR + 18 + pt * 124;
        ctx.beginPath();
        ctx.arc(HX, HY, pr, 0, TAU);
        ctx.strokeStyle = `rgba(139,92,246,${(1 - pt) * 0.18})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      outer.forEach((c, i) => {
        const sway = Math.sin(t * TAU * 0.42 + i) * 4;
        const cx = c.x + Math.cos(c.a + t * 1.8) * 4;
        const cy = c.y + sway;
        const dx = HX - cx;
        const dy = HY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / dist;
        const uy = dy / dist;
        const x1 = cx + ux * 34;
        const y1 = cy + uy * 34;
        const x2 = HX - ux * (HR + 9);
        const y2 = HY - uy * (HR + 9);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(139,92,246,0.22)";
        ctx.lineWidth = 1.6;
        ctx.stroke();

        for (let d = 0; d < 2; d++) {
          const f = (t + i / outer.length + d / 2) % 1;
          const fade = Math.sin(f * Math.PI);
          const px = x1 + (x2 - x1) * f;
          const py = y1 + (y2 - y1) * f;

          glow(ctx, px, py, 14, "rgba(167,139,250,1)", fade * 0.35);
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, TAU);
          ctx.fillStyle = `rgba(167,139,250,${0.48 + fade * 0.5})`;
          ctx.fill();
        }

        drawAssetNode(ctx, cx, cy, 30, c.asset, c.asset.imageKey ? assetImages[c.asset.imageKey] : undefined);
      });

      glow(ctx, HX, HY, HR * 2.35, "rgba(139,92,246,1)", 0.22);

      ctx.beginPath();
      ctx.arc(HX, HY, HR, 0, TAU);
      ctx.fillStyle = "rgba(13, 11, 24, 0.98)";
      ctx.fill();
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(HX, HY, HR * 0.68, 0, TAU);
      ctx.strokeStyle = "rgba(167,139,250,0.26)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU + t * TAU * 0.38;
        const r1 = HR + 2;
        const r2 = HR + (i % 3 === 0 ? 11 : 6);
        ctx.beginPath();
        ctx.moveTo(HX + Math.cos(a) * r1, HY + Math.sin(a) * r1);
        ctx.lineTo(HX + Math.cos(a) * r2, HY + Math.sin(a) * r2);
        ctx.strokeStyle = "rgba(139,92,246,0.58)";
        ctx.lineWidth = i % 3 === 0 ? 2 : 1;
        ctx.stroke();
      }

      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 14px 'DM Sans', sans-serif";
      ctx.fillText("BALCORE", HX, HY - 6);
      ctx.font = "500 11px 'DM Sans', sans-serif";
      ctx.fillStyle = "rgba(216,180,254,0.92)";
      ctx.fillText("FLOWYIELD", HX, HY + 12);
      ctx.textBaseline = "alphabetic";

      raf2 = requestAnimationFrame(draw2);
    };

    // C3 — Continuous balancing architecture
    const CX = cv3.W / 2;
    const CY = cv3.H / 2;
    const balanceAssets: CanvasAsset[] = [
      { label: "BTC", imageKey: "btc", fill: "rgba(50, 28, 4, 0.82)", stroke: "#f59e0b", glow: "rgba(245,158,11,1)", text: "#fcd34d" },
      { label: "AVAX", imageKey: "avax", fill: "rgba(58, 16, 21, 0.88)", stroke: "#f87171", glow: "rgba(248,113,113,1)", text: "#fecaca" },
      { label: "USDC", imageKey: "usdc", fill: "rgba(18, 36, 69, 0.88)", stroke: "#60a5fa", glow: "rgba(96,165,250,1)", text: "#bfdbfe" },
      { label: "ETH", imageKey: "eth", fill: "rgba(30, 30, 36, 0.88)", stroke: "#a1a1aa", glow: "rgba(161,161,170,1)", text: "#f4f4f5" },
    ];
    let balance = 0;

    const draw3 = (ts: number) => {
      const { ctx, W, H } = cv3;
      const t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07060e";
      ctx.fillRect(0, 0, W, H);

      const reserveRadius = 198;
      const marketRadius = 132;
      const coreRadius = 58;

      ctx.beginPath();
      ctx.arc(CX, CY, reserveRadius, 0, TAU);
      ctx.strokeStyle = "rgba(52,211,153,0.18)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CX, CY, marketRadius, 0, TAU);
      ctx.strokeStyle = "rgba(52,211,153,0.32)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * TAU + t * 0.16;
        const asset = balanceAssets[i];
        const x = CX + Math.cos(a) * reserveRadius;
        const y = CY + Math.sin(a) * reserveRadius;
        drawAssetNode(ctx, x, y, 24, asset, asset.imageKey ? assetImages[asset.imageKey] : undefined);

        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * (marketRadius + 20), CY + Math.sin(a) * (marketRadius + 20));
        ctx.lineTo(CX + Math.cos(a) * (reserveRadius - 32), CY + Math.sin(a) * (reserveRadius - 32));
        ctx.strokeStyle = "rgba(52,211,153,0.12)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      for (let i = 0; i < 3; i++) {
        const phase = (t * 0.42 + i * 0.23) % 1;
        const angle = phase * TAU - Math.PI / 2;
        const r = marketRadius + Math.sin((phase + i) * TAU) * 10;
        const x = CX + Math.cos(angle) * r;
        const y = CY + Math.sin(angle) * r;
        glow(ctx, x, y, 24, "rgba(52,211,153,1)", 0.45);
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, TAU);
        ctx.fillStyle = "#6ee7b7";
        ctx.fill();
      }

      for (let i = 0; i < 4; i++) {
        const phase = (t * 0.52 + i * 0.25) % 1;
        const startAngle = (i / 4) * TAU - Math.PI / 2;
        const endAngle = startAngle + Math.PI / 2;
        const angle = startAngle + (endAngle - startAngle) * phase;
        const x = CX + Math.cos(angle) * ((marketRadius + coreRadius) / 2 + 18);
        const y = CY + Math.sin(angle) * ((marketRadius + coreRadius) / 2 + 18);

        glow(ctx, x, y, 18, "rgba(16,185,129,1)", 0.38);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, TAU);
        ctx.fillStyle = "#34d399";
        ctx.fill();
      }

      for (let i = 0; i < 4; i++) {
        const start = (i / 4) * TAU + t * 0.12;
        ctx.beginPath();
        ctx.arc(CX, CY, marketRadius, start, start + Math.PI / 3.2);
        ctx.strokeStyle = i % 2 === 0 ? "rgba(52,211,153,0.46)" : "rgba(110,231,183,0.18)";
        ctx.lineWidth = i % 2 === 0 ? 6 : 3;
        ctx.lineCap = "round";
        ctx.stroke();
      }
      ctx.lineCap = "butt";

      const shieldRot = t * 0.24;
      ctx.save();
      ctx.translate(CX, CY);
      ctx.rotate(shieldRot);
      ctx.beginPath();
      ctx.moveTo(0, -26);
      ctx.lineTo(22, -10);
      ctx.lineTo(16, 18);
      ctx.lineTo(0, 30);
      ctx.lineTo(-16, 18);
      ctx.lineTo(-22, -10);
      ctx.closePath();
      ctx.fillStyle = "rgba(52,211,153,0.14)";
      ctx.fill();
      ctx.strokeStyle = "rgba(52,211,153,0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      const pulse = 4 * Math.sin(t * TAU * 1.3);
      glow(ctx, CX, CY, coreRadius * 1.9 + pulse, "rgba(52,211,153,1)", 0.16);

      ctx.beginPath();
      ctx.arc(CX, CY, coreRadius, 0, TAU);
      ctx.fillStyle = "rgba(13, 11, 24, 0.98)";
      ctx.fill();
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CX, CY, coreRadius * 0.68, 0, TAU);
      ctx.strokeStyle = "rgba(52,211,153,0.28)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = "#ecfdf5";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "600 14px 'DM Sans', sans-serif";
      ctx.fillText("FLOW", CX, CY - 8);
      ctx.fillText("YIELD", CX, CY + 10);
      ctx.textBaseline = "alphabetic";

      drawAssetBadge(ctx, CX, CY - reserveRadius - 34, 104, "Reserve Yield", "rgba(8, 20, 17, 0.88)", "rgba(52,211,153,0.35)", "#6ee7b7");
      drawAssetBadge(ctx, CX + reserveRadius - 16, CY - 10, 132, "Active Market Making", "rgba(8, 20, 17, 0.88)", "rgba(52,211,153,0.35)", "#6ee7b7");
      drawAssetBadge(ctx, CX, CY + reserveRadius + 18, 112, "IL Mitigation", "rgba(8, 20, 17, 0.88)", "rgba(52,211,153,0.35)", "#6ee7b7");

      balance = Math.min(99, balance + 0.18);
      ctx.font = "300 11px 'DM Sans', sans-serif";
      ctx.fillStyle = "rgba(110,231,183,0.56)";
      ctx.textAlign = "center";
      ctx.fillText("CONTINUOUS REBALANCE", CX, CY + 146);
      ctx.font = "600 36px 'DM Sans', sans-serif";
      ctx.fillStyle = "#34d399";
      ctx.fillText(`${balance.toFixed(0)}%`, CX, CY + 188);

      raf3 = requestAnimationFrame(draw3);
    };

    raf1 = requestAnimationFrame(draw1);
    raf2 = requestAnimationFrame(draw2);
    raf3 = requestAnimationFrame(draw3);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
    };
  }, [c1, c2, c3]);
}

const cards = [
  {
    refKey: "c1",
    title: "Idle Capital",
    description: "Most capital in DeFi sits unused, waiting for opportunities.",
    accentClass: "visual-story-card-1",
  },
  {
    refKey: "c2",
    title: "Multi-Asset Orchestration",
    description: "Instead of one-size-fits-all dollar icons, Balcore routes capital across assets like BTC, ETH, AVAX, stablecoins, equities, and commodities.",
    accentClass: "visual-story-card-2",
  },
  {
    refKey: "c3",
    title: "Continuous Balance",
    description:
      "Balcore's FlowYield architecture continuously balances reserve yield and active market making to optimize returns while mitigating impermanent loss.",
    accentClass: "visual-story-card-3",
  },
] as const;

const VisualStorySection = () => {
  const c1 = useRef<HTMLCanvasElement>(null);
  const c2 = useRef<HTMLCanvasElement>(null);
  const c3 = useRef<HTMLCanvasElement>(null);

  useVisualStoryCanvases(c1, c2, c3);

  const canvasMap = {
    c1,
    c2,
    c3,
  };

  return (
    <section id="visual-story" className="border-t border-border relative section-animated-bg overflow-hidden">
      <MarketBackground />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Bebas+Neue&display=swap');

        .visual-story-card,
        .visual-story-card * {
          box-sizing: border-box;
        }

        .visual-story-card {
          background: #0d0b18;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, border-color 0.35s ease;
          font-family: 'DM Sans', sans-serif;
          color: #ffffff;
        }

        .visual-story-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .visual-story-vis {
          position: relative;
          width: 100%;
          padding-top: 115%;
          background: #07060e;
        }

        .visual-story-vis canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .visual-story-info {
          padding: 20px 22px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .visual-story-step {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 5px;
          opacity: 0.45;
        }

        .visual-story-info h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.35rem;
          letter-spacing: 0.07em;
          margin-bottom: 7px;
        }

        .visual-story-info p {
          font-size: 0.84rem;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.45);
        }

        .visual-story-card-1 .visual-story-step,
        .visual-story-card-1 .visual-story-info h2 {
          color: #5a5578;
        }

        .visual-story-card-2 .visual-story-step,
        .visual-story-card-2 .visual-story-info h2 {
          color: #a78bfa;
        }

        .visual-story-card-3 .visual-story-step,
        .visual-story-card-3 .visual-story-info h2 {
          color: #34d399;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" whileHover={{ scale: 1.05 }}>
              <Eye className="w-4 h-4 text-color" />
              <span className="text-xs font-semibold text-white tracking-wider">HOW IT WORKS</span>
            </motion.div>
            <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">From Idle Capital to Intelligent Yield</h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8 pb-6 w-full max-w-[1680px] mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.refKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`visual-story-card ${card.accentClass} max-w-[380px] mx-auto w-full`}
            >
              <div className="visual-story-vis">
                <canvas ref={canvasMap[card.refKey]} />
              </div>
              <div className="visual-story-info">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualStorySection;
