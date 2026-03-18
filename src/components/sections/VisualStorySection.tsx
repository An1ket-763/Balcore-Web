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

    // C2 — Smart Capital Movement
    const { W: W2, H: H2 } = cv2;
    const HX = W2 / 2;
    const HY = H2 / 2;
    const HR = 42;
    const ORBIT = 172;
    const outerAngles = [0, 1, 2, 3, 4, 5].map((i) => (i / 6) * TAU - Math.PI / 2);
    const outer = outerAngles.map((a) => ({
      x: HX + Math.cos(a) * ORBIT,
      y: HY + Math.sin(a) * ORBIT,
      a,
    }));

    const draw2 = (ts: number) => {
      const { ctx, W, H } = cv2;
      const t = ts * 0.0005;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07060e";
      ctx.fillRect(0, 0, W, H);

      outer.forEach((c, i) => {
        const dx = HX - c.x;
        const dy = HY - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ux = dx / dist;
        const uy = dy / dist;
        const x1 = c.x + ux * 28;
        const y1 = c.y + uy * 28;
        const x2 = HX - ux * (HR + 3);
        const y2 = HY - uy * (HR + 3);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(139,92,246,0.18)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        for (let d = 0; d < 2; d++) {
          const f = (t + i / 6 + d / 2) % 1;
          const fade = Math.sin(f * Math.PI);
          const px = x1 + (x2 - x1) * f;
          const py = y1 + (y2 - y1) * f;

          glow(ctx, px, py, 14, "rgba(167,139,250,1)", fade * 0.35);

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, TAU);
          ctx.fillStyle = `rgba(167,139,250,${0.55 + fade * 0.45})`;
          ctx.fill();
        }
      });

      for (let ri = 0; ri < 3; ri++) {
        const pt = (t * 1.6 + ri * 0.33) % 1;
        const pr = HR + pt * 90;
        ctx.beginPath();
        ctx.arc(HX, HY, pr, 0, TAU);
        ctx.strokeStyle = `rgba(139,92,246,${(1 - pt) * 0.28})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      outer.forEach((c, i) => {
        const cy = c.y + Math.sin(t * TAU * 0.5 + i) * 3.5;
        const cx = c.x;

        glow(ctx, cx, cy, 52, "rgba(245,158,11,1)", 0.2);

        ctx.beginPath();
        ctx.arc(cx, cy, 28, 0, TAU);
        ctx.fillStyle = "rgba(160,105,8,0.28)";
        ctx.fill();
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(cx, cy, 28 * 0.62, 0, TAU);
        ctx.strokeStyle = "rgba(245,158,11,0.28)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "600 15px 'DM Sans', sans-serif";
        ctx.fillStyle = "#fcd34d";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("$", cx, cy);
        ctx.textBaseline = "alphabetic";
      });

      glow(ctx, HX, HY, HR * 2.2, "rgba(139,92,246,1)", 0.2);

      ctx.beginPath();
      ctx.arc(HX, HY, HR, 0, TAU);
      ctx.fillStyle = "#07060e";
      ctx.fill();
      ctx.fillStyle = "rgba(139,92,246,0.15)";
      ctx.fill();
      ctx.strokeStyle = "#8b5cf6";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(HX, HY, HR * 0.58, 0, TAU);
      ctx.strokeStyle = "rgba(139,92,246,0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU + t * TAU * 0.38;
        const r1 = HR + 2;
        const r2 = HR + (i % 3 === 0 ? 10 : 6);
        ctx.beginPath();
        ctx.moveTo(HX + Math.cos(a) * r1, HY + Math.sin(a) * r1);
        ctx.lineTo(HX + Math.cos(a) * r2, HY + Math.sin(a) * r2);
        ctx.strokeStyle = "rgba(139,92,246,0.6)";
        ctx.lineWidth = i % 3 === 0 ? 2 : 1;
        ctx.stroke();
      }

      glow(ctx, HX, HY, 16, "rgba(167,139,250,1)", 0.9);
      ctx.font = "600 13px 'DM Sans', sans-serif";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("BALCORE", HX, HY + 5);

      raf2 = requestAnimationFrame(draw2);
    };

    // C3 — Better Results
    const CX = cv3.W / 2;
    const CY = cv3.H / 2;
    let apy = 0;
    const rings = [
      { r: 95, col: "#34d399", speed: 0.022, n: 6 },
      { r: 178, col: "#6ee7b7", speed: -0.016, n: 8 },
    ];

    const draw3 = (ts: number) => {
      const { ctx, W, H } = cv3;
      const t = ts * 0.001;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07060e";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * TAU + t * 0.07;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * 44, CY + Math.sin(a) * 44);
        ctx.lineTo(CX + Math.cos(a) * 176, CY + Math.sin(a) * 176);
        ctx.strokeStyle = "rgba(52,211,153,0.09)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rings.forEach(({ r, col, speed, n }) => {
        const rot = t * TAU * speed;

        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, TAU);
        ctx.strokeStyle = `${col}44`;
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 0; i < n * 2; i++) {
          const a = (i / (n * 2)) * TAU + rot;
          const tl = i % 2 === 0 ? 7 : 4;
          ctx.beginPath();
          ctx.moveTo(CX + Math.cos(a) * (r - tl), CY + Math.sin(a) * (r - tl));
          ctx.lineTo(CX + Math.cos(a) * (r + tl), CY + Math.sin(a) * (r + tl));
          ctx.strokeStyle = col + (i % 2 === 0 ? "88" : "44");
          ctx.lineWidth = i % 2 === 0 ? 2 : 1;
          ctx.stroke();
        }

        for (let i = 0; i < n; i++) {
          const a = (i / n) * TAU + rot;
          const dx = CX + Math.cos(a) * r;
          const dy = CY + Math.sin(a) * r;
          const pulse = 0.5 + 0.35 * Math.sin(t * TAU * 1.4 + i * 1.1);

          glow(ctx, dx, dy, 20, "rgba(52,211,153,1)", pulse * 0.38);

          ctx.beginPath();
          ctx.arc(dx, dy, 6, 0, TAU);
          ctx.fillStyle = col;
          ctx.globalAlpha = pulse;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        const tf = Math.abs(t * speed * 5) % 1;
        const tx = CX + Math.cos(tf * TAU) * r;
        const ty = CY + Math.sin(tf * TAU) * r;
        glow(ctx, tx, ty, 24, "rgba(110,231,183,1)", 0.55);
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, TAU);
        ctx.fillStyle = "#6ee7b7";
        ctx.fill();
      });

      const pulse = 3 * Math.sin(t * TAU * 1.5);
      glow(ctx, CX, CY, 55 + pulse, "rgba(52,211,153,1)", 0.18);

      ctx.beginPath();
      ctx.arc(CX, CY, 42, 0, TAU);
      ctx.fillStyle = "#07060e";
      ctx.fill();
      ctx.fillStyle = "rgba(52,211,153,0.12)";
      ctx.fill();
      ctx.strokeStyle = "#34d399";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(CX, CY, 28, 0, TAU);
      ctx.strokeStyle = "rgba(52,211,153,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU + t * TAU * 0.1;
        ctx.beginPath();
        ctx.moveTo(CX + Math.cos(a) * 43, CY + Math.sin(a) * 43);
        ctx.lineTo(CX + Math.cos(a) * (i % 3 === 0 ? 51 : 48), CY + Math.sin(a) * (i % 3 === 0 ? 51 : 48));
        ctx.strokeStyle = "rgba(52,211,153,0.55)";
        ctx.lineWidth = i % 3 === 0 ? 2 : 1;
        ctx.stroke();
      }

      glow(ctx, CX, CY, 18, "rgba(52,211,153,1)", 0.85);

      apy = Math.min(18.7, apy + 0.055);
      const apyLabelY = CY + 140;

      ctx.font = "300 11px 'DM Sans', sans-serif";
      ctx.fillStyle = "rgba(52,211,153,0.5)";
      ctx.textAlign = "center";
      ctx.fillText("BLENDED APY", CX, apyLabelY);

      ctx.font = "600 38px 'DM Sans', sans-serif";
      ctx.fillStyle = "#34d399";
      ctx.fillText(`${apy.toFixed(1)}%`, CX, apyLabelY + 44);

      const labels = ["Higher Yield", "Lower Risk", "Consistent"];
      const badgeY = apyLabelY + 66;
      ctx.font = "400 10px 'DM Sans', sans-serif";
      let totalW = 0;
      const badgeWidths = labels.map((label) => ctx.measureText(label).width + 18);
      badgeWidths.forEach((width) => {
        totalW += width;
      });
      totalW += 8 * (labels.length - 1);
      let badgeX = CX - totalW / 2;

      labels.forEach((label, i) => {
        const width = badgeWidths[i];
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, width, 22, 5);
        ctx.fillStyle = "rgba(52,211,153,0.07)";
        ctx.fill();
        ctx.strokeStyle = "rgba(52,211,153,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#34d399";
        ctx.textAlign = "center";
        ctx.fillText(label, badgeX + width / 2, badgeY + 14);
        badgeX += width + 8;
      });

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
    step: "Step 01",
    title: "Idle Capital",
    description: "Most capital in DeFi sits unused, waiting for opportunities.",
    accentClass: "visual-story-card-1",
  },
  {
    refKey: "c2",
    step: "Step 02",
    title: "Smart Capital Movement",
    description: "Balcore helps capital move where it's needed, automatically.",
    accentClass: "visual-story-card-2",
  },
  {
    refKey: "c3",
    step: "Step 03",
    title: "Better Results",
    description: "The result is more efficient markets and more consistent outcomes.",
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
    <section id="visual-story" className="border-t border-border relative section-animated-bg">
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

      <div className="text-center py-16 px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" whileHover={{ scale: 1.05 }}>
            <Eye className="w-4 h-4 text-color" />
            <span className="text-xs font-semibold text-white tracking-wider">HOW IT WORKS</span>
          </motion.div>
          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">From Idle Capital to Intelligent Yield</h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-8 px-6 pb-6 w-full max-w-[1680px] mx-auto relative z-10">
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
              <div className="visual-story-step">{card.step}</div>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisualStorySection;
