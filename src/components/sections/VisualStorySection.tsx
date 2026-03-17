import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const TAU = Math.PI * 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const fnt = (size: number, bold = false) => `${bold ? "700" : "400"} ${size}px 'Barlow Condensed', sans-serif`;
const mono = (size: number) => `${size}px 'Share Tech Mono', monospace`;

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawArrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, col: string) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const L = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / L;
  const uy = dy / L;
  const ax = x2 - ux * 16;
  const ay = y2 - uy * 16;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(ax - uy * 7, ay + ux * 7);
  ctx.lineTo(ax + uy * 7, ay - ux * 7);
  ctx.closePath();
  ctx.fillStyle = col;
  ctx.fill();
}

function titleBlock(ctx: CanvasRenderingContext2D, W: number, line1: string, line2: string, accent: string) {
  const TH = 190;
  ctx.fillStyle = "#030108";
  ctx.fillRect(0, 0, W, TH);
  ctx.fillStyle = accent;
  ctx.fillRect(0, TH - 4, W, 4);
  ctx.fillRect(0, 0, 8, TH);
  ctx.fillRect(W - 8, 0, 8, TH);
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(100, true);
  ctx.fillText(line1, W / 2, 96);
  ctx.fillStyle = accent;
  ctx.font = fnt(80, true);
  ctx.fillText(line2, W / 2, 178);
  return TH;
}

function footerBlock(ctx: CanvasRenderingContext2D, W: number, H: number, lines: string[], accent: string) {
  const lh = 46;
  const pad = 28;
  const FH = lines.length * lh + pad * 2;
  const FY = H - FH;
  ctx.fillStyle = "#030108";
  ctx.fillRect(0, FY, W, FH);
  ctx.fillStyle = accent;
  ctx.fillRect(0, FY, W, 4);
  ctx.fillRect(0, FY, 8, FH);
  ctx.fillRect(W - 8, FY, 8, FH);
  ctx.textAlign = "center";
  let y = FY + pad + 24;
  for (let i = 0; i < lines.length; i++) {
    ctx.fillStyle = i === lines.length - 1 ? accent : "rgba(255,255,255,0.88)";
    ctx.font = i === lines.length - 1 ? fnt(38, true) : fnt(38, false);
    ctx.fillText(lines[i], W / 2, y);
    y += lh;
  }
  return FY;
}

function dotGrid(ctx: CanvasRenderingContext2D, W: number, H: number, col: string, alpha: number, step = 96) {
  ctx.fillStyle = col;
  ctx.globalAlpha = alpha;
  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, TAU);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function useVisualStoryCanvases(c1: React.RefObject<HTMLCanvasElement>, c2: React.RefObject<HTMLCanvasElement>, c3: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const initCanvas = (canvas: HTMLCanvasElement | null) => {
      if (!canvas) return null;
      const W = 1080;
      const H = 1920;
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      return { canvas, ctx, W, H };
    };

    const cv1 = initCanvas(c1.current);
    const cv2 = initCanvas(c2.current);
    const cv3 = initCanvas(c3.current);
    if (!cv1 || !cv2 || !cv3) return;

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;

    // Canvas 1
    const RNG = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        return s / 0x7fffffff;
      };
    };
    const rng = RNG(42);
    const LABELS = ["POOL A", "POOL B", "ETH/USDC", "BTC/DAI", "LP TOKEN", "VAULT", "AVAX/ETH", "YIELD", "FARM", "STAKE", "AMM", "DEX", "RESERVE", "LIQUIDITY", "PROTOCOL", "BRIDGE", "SWAP", "BORROW", "LEND", "HEDGE", "VAULT", "POOL", "TOKEN", "MARKET", "SPREAD", "FEE", "REWARD", "LOCK"];
    const COLS = ["#eb3228", "#ff6450", "#7329d3", "#9b5de5", "#ff9114"];
    const blocks = Array.from({ length: 28 }, (_, i) => ({
      x: 80 + rng() * (cv1.W - 200),
      y: 0,
      w: 110 + rng() * 180,
      h: 55 + rng() * 90,
      col: COLS[i % COLS.length],
      sx: (rng() - 0.5) * 1.6,
      sy: (rng() - 0.5) * 1.0,
      label: LABELS[i % LABELS.length],
    }));
    const prng = RNG(55);
    const PPTS = 80;
    const rawPrices = Array.from({ length: PPTS }, (_, i) => (i === 0 ? 100 : 0));
    for (let i = 1; i < PPTS; i++) rawPrices[i] = Math.max(20, Math.min(260, rawPrices[i - 1] + (prng() - 0.48) * 14 + (prng() < 0.07 ? (prng() - 0.5) * 60 : 0)));

    const prng2 = RNG(99);
    const particles = Array.from({ length: 70 }, (_, i) => ({
      x: 40 + prng2() * (cv1.W - 80),
      y: 0,
      r: 3 + prng2() * 8,
      col: COLS[i % COLS.length],
    }));
    const prng3 = RNG(13);
    const conns = Array.from({ length: 14 }, () => [Math.floor(prng3() * 28), Math.floor(prng3() * 28)]);

    const draw1 = (ts: number) => {
      const { ctx, W, H } = cv1;
      const t = (ts * 0.0006) % 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0a0306";
      ctx.fillRect(0, 0, W, H);

      const TH = titleBlock(ctx, W, "FRAGMENTED", "LIQUIDITY", "#eb3228");
      const FY = footerBlock(ctx, W, H, ["Liquidity in DeFi is scattered", "across pools and protocols,", "creating inefficiencies", "and unstable markets."], "#eb3228");
      const ZY1 = TH + 20;
      const ZY2 = FY - 20;
      const ZH = ZY2 - ZY1;

      blocks.forEach((b) => {
        if (!b.y || b.y < ZY1 || b.y > ZY2 - b.h) b.y = ZY1 + 40 + Math.random() * (ZH - 120);
      });
      particles.forEach((p) => {
        if (!p.y || p.y < ZY1 || p.y > ZY2) p.y = ZY1 + 20 + Math.random() * (ZH - 40);
      });

      ctx.lineWidth = 1.5;
      conns.forEach(([a, b]) => {
        const ba = blocks[a];
        const bb = blocks[b];
        const j = Math.sin(t * TAU * 3 + a * 1.7) * 18;
        ctx.strokeStyle = "rgba(235,50,40,0.28)";
        ctx.beginPath();
        ctx.moveTo(ba.x + ba.w / 2, ba.y + ba.h / 2);
        ctx.lineTo(bb.x + bb.w / 2 + j, bb.y + bb.h / 2);
        ctx.stroke();
      });

      const mn = Math.min(...rawPrices) - 8;
      const mx2 = Math.max(...rawPrices) + 8;
      ctx.beginPath();
      rawPrices.forEach((p, i) => {
        const px = 60 + (i / (PPTS - 1)) * (W - 120);
        const py = ZY2 - 40 - ((p - mn) / (mx2 - mn)) * (ZH * 0.45);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(235,50,40,0.55)";
      ctx.lineWidth = 3;
      ctx.stroke();

      blocks.forEach((b, i) => {
        const rx = b.x + Math.sin(t * TAU * 1.4 + i * 0.9) * 22 * b.sx;
        const ry = b.y + Math.cos(t * TAU * 1.1 + i * 1.3) * 15 * b.sy;
        if (ry < ZY1 || ry + b.h > ZY2) return;
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = b.col;
        roundRect(ctx, rx, ry, b.w, b.h, 8);
        ctx.fill();
        ctx.globalAlpha = 0.85;
        ctx.strokeStyle = b.col;
        ctx.lineWidth = 2;
        roundRect(ctx, rx, ry, b.w, b.h, 8);
        ctx.stroke();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = b.col;
        ctx.font = mono(22);
        ctx.textAlign = "center";
        ctx.fillText(b.label, rx + b.w / 2, ry + b.h / 2 + 8);
        ctx.globalAlpha = 1;
      });

      particles.forEach((p, i) => {
        const phase = (t * 1.8 + i * 0.23) % 1;
        const px = p.x + Math.sin(phase * TAU + i) * 28;
        const py = p.y + Math.cos(phase * TAU * 1.5 + i * 0.8) * 20;
        if (py < ZY1 || py > ZY2) return;
        ctx.globalAlpha = 0.7;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, TAU);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      raf1 = requestAnimationFrame(draw1);
    };

    // Canvas 2
    const SATS = [
      { ang: 270, label: "RESERVE", sub: "90% CAP", col: "#c8a0ff" },
      { ang: 321, label: "REBALANCER", sub: "AUTO", col: "#cd73ff" },
      { ang: 12, label: "ACTIVE LP", sub: "10% CAP", col: "#9b5de5" },
      { ang: 63, label: "BENQI", sub: "LENDING", col: "#2dd7bc" },
      { ang: 115, label: "YIELD OUT", sub: "18.7%", col: "#e1b937" },
      { ang: 167, label: "USER", sub: "DEPOSITS", col: "#c8a0ff" },
      { ang: 218, label: "ORACLE", sub: "VAH DATA", col: "#2dd7bc" },
    ];
    const ORBIT_R = 360;

    const draw2 = (ts: number) => {
      const { ctx, W, H } = cv2;
      const t = (ts * 0.0005) % 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#05020e";
      ctx.fillRect(0, 0, W, H);
      dotGrid(ctx, W, H, "#9b5de5", 0.1, 96);

      const TH = titleBlock(ctx, W, "BALCORE", "ORCHESTRATION", "#9b5de5");
      const FY = footerBlock(ctx, W, H, ["Balcore intelligently routes", "liquidity in real time, adapting", "to market conditions and", "maintaining balance across systems."], "#9b5de5");
      const CX = W / 2;
      const CY = TH + (FY - TH) * 0.52;

      SATS.forEach((s, si) => {
        const a = (s.ang * Math.PI) / 180;
        const nx = CX + Math.cos(a) * ORBIT_R;
        const ny = CY + Math.sin(a) * ORBIT_R;
        const hx = CX + Math.cos(a) * 100;
        const hy = CY + Math.sin(a) * 100;
        const ex = CX + Math.cos(a) * (ORBIT_R - 60);
        const ey = CY + Math.sin(a) * (ORBIT_R - 60);

        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `${s.col}66`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        drawArrow(ctx, hx, hy, ex, ey, s.col);

        const frac = (t + si / SATS.length) % 1;
        const px = lerp(hx, ex, frac);
        const py = lerp(hy, ey, frac);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, TAU);
        ctx.fillStyle = s.col;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 56, 0, TAU);
        ctx.fillStyle = "#040210";
        ctx.fill();
        ctx.fillStyle = `${s.col}44`;
        ctx.fill();
        ctx.strokeStyle = s.col;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(CX, CY, 76, 0, TAU);
      ctx.fillStyle = "rgba(155,93,229,0.25)";
      ctx.fill();
      ctx.strokeStyle = "rgba(155,93,229,0.95)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = fnt(48, true);
      ctx.textAlign = "center";
      ctx.fillText("BALCORE", CX, CY - 12);
      ctx.fillStyle = "#c8a0ff";
      ctx.font = fnt(26, true);
      ctx.fillText("ORCHESTRATION", CX, CY + 22);
      ctx.fillText("LAYER", CX, CY + 52);

      raf2 = requestAnimationFrame(draw2);
    };

    // Canvas 3
    const POOLS = [
      { r: 210, ang: 0, col: "#46db78" },
      { r: 210, ang: 60, col: "#a0ffb4" },
      { r: 210, ang: 120, col: "#2dd7bc" },
      { r: 210, ang: 180, col: "#46db78" },
      { r: 210, ang: 240, col: "#a0ffb4" },
      { r: 210, ang: 300, col: "#2dd7bc" },
      { r: 290, ang: 30, col: "#46db78" },
      { r: 290, ang: 150, col: "#23a050" },
      { r: 290, ang: 270, col: "#2dd7bc" },
      { r: 365, ang: 90, col: "#e1b937" },
      { r: 365, ang: 210, col: "#a0ffb4" },
      { r: 365, ang: 330, col: "#2dd7bc" },
    ];
    let apyCount = 0;

    const draw3 = (ts: number) => {
      const { ctx, W, H } = cv3;
      const t = (ts * 0.0005) % 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#030b05";
      ctx.fillRect(0, 0, W, H);
      dotGrid(ctx, W, H, "#46db78", 0.07, 96);

      const TH = titleBlock(ctx, W, "COORDINATED", "LIQUIDITY", "#46db78");
      const FY = footerBlock(ctx, W, H, ["The result is a balanced liquidity", "system that improves efficiency,", "stability, and long-term", "capital performance."], "#46db78");
      const CX = W / 2;
      const CY = TH + (FY - TH) * 0.52;

      POOLS.forEach(({ r, ang, col }, ni) => {
        const a = (ang * Math.PI) / 180;
        const nx = CX + Math.cos(a) * r;
        const ny = CY + Math.sin(a) * r;
        const sx = CX + Math.cos(a) * 90;
        const sy = CY + Math.sin(a) * 90;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `${col}44`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const frac = (t + ni / POOLS.length) % 1;
        const px = lerp(sx, nx, frac);
        const py = lerp(sy, ny, frac);
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, TAU);
        ctx.fillStyle = col;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(nx, ny, 24, 0, TAU);
        ctx.fillStyle = "#030b05";
        ctx.fill();
        ctx.fillStyle = `${col}44`;
        ctx.fill();
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.beginPath();
      ctx.arc(CX, CY, 62, 0, TAU);
      ctx.fillStyle = "rgba(70,219,120,0.22)";
      ctx.fill();
      ctx.strokeStyle = "rgba(70,219,120,1)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = fnt(44, true);
      ctx.textAlign = "center";
      ctx.fillText("BALCORE", CX, CY - 8);
      ctx.fillStyle = "#a0ffb4";
      ctx.font = fnt(26, true);
      ctx.fillText("BALANCED CORE", CX, CY + 28);

      apyCount = Math.min(18.7, apyCount + 18.7 / 180);
      const apx = W - 175;
      const apyY = TH + 20;
      ctx.fillStyle = "#030b05";
      roundRect(ctx, apx - 12, apyY - 10, 176, 106, 10);
      ctx.fill();
      ctx.strokeStyle = "#46db78";
      ctx.lineWidth = 2;
      roundRect(ctx, apx - 12, apyY - 10, 176, 106, 10);
      ctx.stroke();
      ctx.fillStyle = "#46db78";
      ctx.fillRect(apx - 12, apyY - 10, 176, 16);
      ctx.fillStyle = "#030b05";
      ctx.font = fnt(26, true);
      ctx.fillText("APY", apx + 76, apyY + 6);
      ctx.fillStyle = "#46db78";
      ctx.font = fnt(68, true);
      ctx.fillText(`${apyCount.toFixed(1)}%`, apx + 76, apyY + 70);

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

const VisualStorySection = () => {
  const c1 = useRef<HTMLCanvasElement>(null);
  const c2 = useRef<HTMLCanvasElement>(null);
  const c3 = useRef<HTMLCanvasElement>(null);

  useVisualStoryCanvases(c1, c2, c3);

  return (
    <section id="visual-story" className="border-t border-border relative section-animated-bg">
      <MarketBackground />

      <div className="text-center py-16 px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" whileHover={{ scale: 1.05 }}>
            <Eye className="w-4 h-4 text-color" />
            <span className="text-xs font-semibold text-white tracking-wider">HOW IT WORKS</span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">From Idle Capital to Intelligent Yield</h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 w-full relative z-10">
        {[c1, c2, c3].map((ref, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="overflow-hidden rounded-xl border border-primary/20 bg-[#05020e] aspect-[9/16]"
          >
            <canvas ref={ref} className="w-full h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisualStorySection;
