import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const TAU = Math.PI * 2;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function fnt(size: number, bold = false) {
  return `${bold ? "700" : "400"} ${size}px 'Barlow Condensed', sans-serif`;
}

function mono(size: number) {
  return `${size}px 'Share Tech Mono', monospace`;
}

function titleBlock(ctx: CanvasRenderingContext2D, W: number, line1: string, line2: string, accent: string) {
  const TH = 150;
  const sidePadding = 36;
  const topPadding = 16;
  const bottomPadding = 16;
  const lineGap = 8;
  const maxTextWidth = W - sidePadding * 2 - 16;

  const fitTitleFont = (baseSize: number, text: string, bold = true) => {
    ctx.font = fnt(baseSize, bold);
    const measured = ctx.measureText(text).width;
    const scale = measured > maxTextWidth ? maxTextWidth / measured : 1;
    return Math.max(40, Math.floor(baseSize * scale));
  };

  const measureTextBounds = (text: string, size: number, bold = true) => {
    ctx.font = fnt(size, bold);
    const metrics = ctx.measureText(text);
    const ascent = metrics.actualBoundingBoxAscent || size * 0.78;
    const descent = metrics.actualBoundingBoxDescent || size * 0.22;
    return { ascent, descent };
  };

  const widthFitLine1 = fitTitleFont(50, line1);
  const widthFitLine2 = fitTitleFont(40, line2);
  const availableHeight = TH - topPadding - bottomPadding;

  let line1Size = widthFitLine1;
  let line2Size = widthFitLine2;
  let line1Bounds = measureTextBounds(line1, line1Size, true);
  let line2Bounds = measureTextBounds(line2, line2Size, true);

  const rawContentHeight = line1Bounds.ascent + line1Bounds.descent + lineGap + line2Bounds.ascent + line2Bounds.descent;
  if (rawContentHeight > availableHeight) {
    const heightScale = availableHeight / rawContentHeight;
    line1Size = Math.max(36, Math.floor(line1Size * heightScale));
    line2Size = Math.max(32, Math.floor(line2Size * heightScale));
    line1Bounds = measureTextBounds(line1, line1Size, true);
    line2Bounds = measureTextBounds(line2, line2Size, true);
  }

  const contentHeight = line1Bounds.ascent + line1Bounds.descent + lineGap + line2Bounds.ascent + line2Bounds.descent;
  const contentTop = (TH - contentHeight) / 2;

  ctx.fillStyle = "#030108";
  ctx.fillRect(0, 0, W, TH);
  ctx.fillStyle = accent;
  ctx.fillRect(0, TH - 4, W, 4);
  ctx.fillRect(0, 0, 8, TH);
  ctx.fillRect(W - 8, 0, 8, TH);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(line1Size, true);
  const line1Y = contentTop + line1Bounds.ascent;
  ctx.fillText(line1, W / 2, line1Y);

  ctx.fillStyle = accent;
  ctx.font = fnt(line2Size, true);
  const line2Y = line1Y + line1Bounds.descent + lineGap + line2Bounds.ascent;
  ctx.fillText(line2, W / 2, line2Y);
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

function drawHub(ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number) {
  const pr = 4 * Math.sin(t * TAU * 2.5);
  [[92 + pr, 0.38, 1], [76, 0.85, 2], [60, 1.0, 3]].forEach(([r, fa, lw]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r as number, 0, TAU);
    ctx.fillStyle = "#040210";
    ctx.fill();
    ctx.fillStyle = "rgba(155,93,229,0.25)";
    ctx.fill();
    ctx.strokeStyle = `rgba(155,93,229,${Math.min(1, (fa as number) + 0.12 * Math.sin(t * TAU * 4))})`;
    ctx.lineWidth = lw as number;
    ctx.stroke();
  });
  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, TAU);
  ctx.fillStyle = "rgba(155,93,229,0.95)";
  ctx.fill();

  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * TAU + t * TAU * 0.4;
    const r1 = 93;
    const r2 = i % 8 === 0 ? 101 : 97;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.strokeStyle = "rgba(155,93,229,0.8)";
    ctx.lineWidth = i % 8 === 0 ? 2.5 : 1;
    ctx.stroke();
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(48, true);
  ctx.textAlign = "center";
  ctx.fillText("BALCORE", cx, cy - 12);
  ctx.fillStyle = "#c8a0ff";
  ctx.font = fnt(26, true);
  ctx.fillText("ORCHESTRATION", cx, cy + 22);
  ctx.fillText("LAYER", cx, cy + 52);
}

function drawSatNode(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  label: string,
  sub: string,
  col: string,
  angleDeg: number,
  W: number,
  H: number,
) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.fillStyle = "#040210";
  ctx.fill();
  ctx.fillStyle = `${col}44`;
  ctx.fill();
  ctx.strokeStyle = col;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  const a = (angleDeg * Math.PI) / 180;
  ctx.font = fnt(32, true);
  const lw = ctx.measureText(label).width;
  ctx.font = fnt(24, false);
  const sw = ctx.measureText(sub).width;
  const boxW = Math.max(lw, sw) + 24;
  const boxH = sub ? 72 : 46;

  let bx: number;
  let by: number;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  if (ca > 0.3) bx = cx + r + 10;
  else if (ca < -0.3) bx = cx - r - 10 - boxW;
  else bx = cx - boxW / 2;

  if (sa > 0.3) by = cy + r + 8;
  else if (sa < -0.3) by = cy - r - 8 - boxH;
  else by = cy - boxH / 2;

  bx = Math.max(8, Math.min(W - boxW - 8, bx));
  by = Math.max(8, Math.min(H - boxH - 8, by));

  ctx.fillStyle = "rgba(4,2,16,0.94)";
  roundRect(ctx, bx, by, boxW, boxH, 7);
  ctx.fill();
  ctx.strokeStyle = `${col}88`;
  ctx.lineWidth = 1.5;
  roundRect(ctx, bx, by, boxW, boxH, 7);
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(32, true);
  ctx.textAlign = "left";
  ctx.fillText(label, bx + 12, by + 30);
  if (sub) {
    ctx.fillStyle = col;
    ctx.font = fnt(24, false);
    ctx.fillText(sub, bx + 12, by + 58);
  }
}

function drawCoreHub(ctx: CanvasRenderingContext2D, cx: number, cy: number, t: number) {
  const pr = 4 * Math.sin(t * TAU * 2.5);
  [[78 + pr, 0.35, 1], [62, 0.88, 2], [48, 1.0, 3]].forEach(([r, fa, lw]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r as number, 0, TAU);
    ctx.fillStyle = "#030b05";
    ctx.fill();
    ctx.fillStyle = "rgba(70,219,120,0.22)";
    ctx.fill();
    ctx.strokeStyle = `rgba(70,219,120,${fa})`;
    ctx.lineWidth = lw as number;
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 18, 0, TAU);
  ctx.fillStyle = "rgba(70,219,120,0.95)";
  ctx.fill();

  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * TAU + t * TAU * 0.1;
    const r1 = 80;
    const r2 = i % 8 === 0 ? 88 : 84;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
    ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
    ctx.strokeStyle = "rgba(70,219,120,0.8)";
    ctx.lineWidth = i % 8 === 0 ? 2.5 : 1.5;
    ctx.stroke();
  }

  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(44, true);
  ctx.textAlign = "center";
  ctx.fillText("BALCORE", cx, cy - 8);
  ctx.fillStyle = "#a0ffb4";
  ctx.font = fnt(26, true);
  ctx.fillText("BALANCED CORE", cx, cy + 28);
}

function drawPoolNode(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, label: string, sub: string, col: string, W: number, H: number) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, TAU);
  ctx.fillStyle = "#030b05";
  ctx.fill();
  ctx.fillStyle = `${col}44`;
  ctx.fill();
  ctx.strokeStyle = col;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = fnt(28, true);
  const lw = ctx.measureText(label).width;
  ctx.font = fnt(22, false);
  const sw = ctx.measureText(sub).width;
  const bw = Math.max(lw, sw) + 20;
  const bh = sub ? 60 : 38;
  const bx = cx - bw / 2;
  const by = cy + r + 6;
  const byAdj = Math.min(by, H - bh - 8);
  const bxAdj = Math.max(6, Math.min(W - bw - 6, bx));

  ctx.fillStyle = "rgba(3,11,5,0.94)";
  roundRect(ctx, bxAdj, byAdj, bw, bh, 6);
  ctx.fill();
  ctx.strokeStyle = `${col}66`;
  ctx.lineWidth = 1;
  roundRect(ctx, bxAdj, byAdj, bw, bh, 6);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = fnt(28, true);
  ctx.fillText(label, bxAdj + bw / 2, byAdj + 24);
  if (sub) {
    ctx.fillStyle = col;
    ctx.font = fnt(22, false);
    ctx.fillText(sub, bxAdj + bw / 2, byAdj + 50);
  }
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
      return { ctx, W, H };
    };

    const cv1 = initCanvas(c1.current);
    const cv2 = initCanvas(c2.current);
    const cv3 = initCanvas(c3.current);
    if (!cv1 || !cv2 || !cv3) return;

    const RNG = (seed: number) => {
      let s = seed;
      return () => {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        return s / 0x7fffffff;
      };
    };

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;

    // CANVAS 1
    const rng = RNG(42);
    const LABELS = [
      "POOL A", "POOL B", "ETH/USDC", "BTC/DAI", "LP TOKEN", "VAULT", "AVAX/ETH",
      "YIELD", "FARM", "STAKE", "AMM", "DEX", "RESERVE", "LIQUIDITY", "PROTOCOL",
      "BRIDGE", "SWAP", "BORROW", "LEND", "HEDGE", "VAULT", "POOL", "TOKEN",
      "MARKET", "SPREAD", "FEE", "REWARD", "LOCK",
    ];
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
    const rawPrices: number[] = Array.from({ length: PPTS }, (_, i) => (i === 0 ? 100 : 0));
    for (let i = 1; i < PPTS; i++) {
      rawPrices[i] = Math.max(
        20,
        Math.min(260, rawPrices[i - 1] + (prng() - 0.48) * 14 + (prng() < 0.07 ? (prng() - 0.5) * 60 : 0)),
      );
    }

    const prng2 = RNG(99);
    const particles = Array.from({ length: 70 }, (_, i) => ({
      x: 40 + prng2() * (cv1.W - 80),
      y: 0,
      r: 3 + prng2() * 8,
      col: COLS[i % COLS.length],
    }));

    const prng3 = RNG(13);
    const conns = Array.from({ length: 14 }, () => {
      const a = Math.floor(prng3() * 28);
      const b = Math.floor(prng3() * 28);
      return [a, b] as const;
    });

    const draw1 = (ts: number) => {
      const { ctx, W, H } = cv1;
      const t = (ts * 0.0006) % 1;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "#0a0306";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(235,50,40,0.07)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(115,41,211,0.06)";
      for (let y = 0; y < H; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      const TH = titleBlock(ctx, W, "FRAGMENTED", "LIQUIDITY", "#eb3228");
      const FY = footerBlock(
        ctx,
        W,
        H,
        [
          "Liquidity in DeFi is scattered",
          "across pools and protocols,",
          "creating inefficiencies",
          "and unstable markets.",
        ],
        "#eb3228",
      );

      const ZY1 = TH + 20;
      const ZY2 = FY - 20;
      const ZH = ZY2 - ZY1;

      blocks.forEach((b) => {
        if (!b.y || b.y < ZY1 || b.y > ZY2 - b.h) {
          b.y = ZY1 + 40 + Math.random() * (ZH - 120);
        }
      });
      particles.forEach((p) => {
        if (!p.y || p.y < ZY1 || p.y > ZY2) {
          p.y = ZY1 + 20 + Math.random() * (ZH - 40);
        }
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
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = "rgba(235,50,40,0.55)";
      ctx.lineWidth = 3;
      ctx.stroke();

      blocks.forEach((b, i) => {
        const wx = Math.sin(t * TAU * 1.4 + i * 0.9) * 22 * b.sx;
        const wy = Math.cos(t * TAU * 1.1 + i * 1.3) * 15 * b.sy;
        const rx = b.x + wx;
        const ry = b.y + wy;
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

      [0.14, 0.33, 0.55, 0.72, 0.88].forEach((sx) => {
        const px = 60 + sx * (W - 120);
        const pulse = Math.abs(Math.sin(t * TAU * 3 + sx * 10));
        ctx.strokeStyle = `rgba(235,50,40,${0.12 + 0.35 * pulse})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(px, ZY1 + 10);
        ctx.lineTo(px, ZY2);
        ctx.stroke();

        ctx.fillStyle = `rgba(235,50,40,${0.6 + 0.4 * pulse})`;
        ctx.font = fnt(36, true);
        ctx.textAlign = "center";
        ctx.fillText("↯", px, ZY1 + 6);
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

      const pulse = 0.5 + 0.5 * Math.abs(Math.sin(t * TAU * 2));
      const warns: [number, number, string][] = [
        [160, ZY1 + 100, "IDLE"],
        [W - 200, ZY1 + 140, "FRAGMENTED"],
        [140, ZY2 - 120, "INEFFICIENT"],
        [W - 220, ZY2 - 100, "UNCOORDINATED"],
      ];
      warns.forEach(([wx, wy, lbl]) => {
        ctx.font = mono(26);
        ctx.textAlign = "center";
        const tw = ctx.measureText(lbl).width;
        ctx.strokeStyle = `rgba(235,50,40,${0.3 + 0.5 * pulse})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(wx - tw / 2 - 10, wy - 10, tw + 20, 36);
        ctx.fillStyle = `rgba(235,50,40,${0.6 + 0.4 * pulse})`;
        ctx.fillText(lbl, wx, wy + 20);
      });

      raf1 = requestAnimationFrame(draw1);
    };

    // CANVAS 2
    const SATS = [
      { ang: 270, label: "RESERVE", sub: "90% CAP", col: "#c8a0ff" },
      { ang: 321, label: "REBALANCER", sub: "AUTO", col: "#cd73ff" },
      { ang: 12, label: "ACTIVE LP", sub: "10% CAP", col: "#9b5de5" },
      { ang: 63, label: "BENQI", sub: "LENDING", col: "#2dd7bc" },
      { ang: 115, label: "YIELD OUT", sub: "18.7%", col: "#e1b937" },
      { ang: 167, label: "USER", sub: "DEPOSITS", col: "#c8a0ff" },
      { ang: 218, label: "ORACLE", sub: "VAH DATA", col: "#2dd7bc" },
    ];
    const NODE_R = 56;
    const ORBIT_R = 360;

    const draw2 = (ts: number) => {
      const { ctx, W, H } = cv2;
      const t = (ts * 0.0005) % 1;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#05020e";
      ctx.fillRect(0, 0, W, H);
      dotGrid(ctx, W, H, "#9b5de5", 0.1, 96);

      const TH = titleBlock(ctx, W, "BALCORE", "ORCHESTRATION", "#9b5de5");
      const FY = footerBlock(
        ctx,
        W,
        H,
        [
          "Balcore intelligently routes",
          "liquidity in real time, adapting",
          "to market conditions and",
          "maintaining balance across systems.",
        ],
        "#9b5de5",
      );
      const CX = W / 2;
      const CY = TH + (FY - TH) * 0.52;

      for (let i = 7; i > 0; i--) {
        const r = 70 + i * 70;
        const pulse = 0.03 + 0.02 * Math.sin(t * TAU + i * 0.9);
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, TAU);
        ctx.strokeStyle = `rgba(155,93,229,${pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      SATS.forEach((s, si) => {
        const a = (s.ang * Math.PI) / 180;
        const nx = CX + Math.cos(a) * ORBIT_R;
        const ny = CY + Math.sin(a) * ORBIT_R;
        const hx = CX + Math.cos(a) * 100;
        const hy = CY + Math.sin(a) * 100;
        const ex = CX + Math.cos(a) * (ORBIT_R - NODE_R - 4);
        const ey = CY + Math.sin(a) * (ORBIT_R - NODE_R - 4);

        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = `${s.col}66`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        drawArrow(ctx, hx, hy, ex, ey, s.col);
        drawArrow(ctx, ex, ey, hx, hy, s.col);

        for (let d = 0; d < 3; d++) {
          const frac = (t + si / 7 + d / 3) % 1;
          const px = lerp(hx, ex, frac);
          const py = lerp(hy, ey, frac);
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, TAU);
          ctx.fillStyle = s.col;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 13, 0, TAU);
          ctx.strokeStyle = `${s.col}44`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        for (let d = 0; d < 3; d++) {
          const frac = (t + 0.5 + si / 7 + d / 3) % 1;
          const px = lerp(ex, hx, frac);
          const py = lerp(ey, hy, frac);
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, TAU);
          ctx.fillStyle = s.col;
          ctx.fill();
        }

        const ns = SATS[(si + 1) % 7];
        const na2 = (ns.ang * Math.PI) / 180;
        const nx2 = CX + Math.cos(na2) * (ORBIT_R - NODE_R - 4);
        const ny2 = CY + Math.sin(na2) * (ORBIT_R - NODE_R - 4);
        const p2 = 0.07 + 0.06 * Math.sin(t * TAU * 3 + si * 0.8);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(nx2, ny2);
        ctx.strokeStyle = `${s.col}${Math.round(p2 * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const ct = (t * 0.6 + (si / 7) * 0.4) % 1;
        const cpx = lerp(ex, nx2, ct);
        const cpy = lerp(ey, ny2, ct);
        ctx.beginPath();
        ctx.arc(cpx, cpy, 5, 0, TAU);
        ctx.fillStyle = `${s.col}aa`;
        ctx.fill();

        drawSatNode(ctx, nx, ny, NODE_R, s.label, s.sub, s.col, s.ang, W, H);
      });

      drawHub(ctx, CX, CY, t);

      const badges: [string, string][] = [
        ["SMART ROUTING", "#c8a0ff"],
        ["IL PROTECTION", "#2dd7bc"],
        ["HF > 2.0 ✓", "#46db78"],
        ["YIELD OPTIMIZED", "#e1b937"],
      ];

      badges.forEach(([lbl, col], i) => {
        if (t > i * 0.12) {
          const iy = TH + 34 + i * 48;
          ctx.font = mono(24);
          ctx.textAlign = "left";
          const tw = ctx.measureText(lbl).width;

          ctx.fillStyle = "#04020c";
          roundRect(ctx, 10, iy - 8, tw + 28, 40, 6);
          ctx.fill();

          ctx.strokeStyle = col;
          ctx.lineWidth = 2;
          roundRect(ctx, 10, iy - 8, tw + 28, 40, 6);
          ctx.stroke();

          ctx.fillStyle = col;
          ctx.fillText(lbl, 22, iy + 22);
        }
      });

      raf2 = requestAnimationFrame(draw2);
    };

    // CANVAS 3
    const POOLS = [
      { r: 210, ang: 0, label: "AVAX/USDC", sub: "LP POOL", col: "#46db78" },
      { r: 210, ang: 60, label: "AVAX/ETH", sub: "LP POOL", col: "#a0ffb4" },
      { r: 210, ang: 120, label: "USDC/DAI", sub: "STABLE", col: "#2dd7bc" },
      { r: 210, ang: 180, label: "BTC/USDC", sub: "LP POOL", col: "#46db78" },
      { r: 210, ang: 240, label: "ETH/BTC", sub: "LP POOL", col: "#a0ffb4" },
      { r: 210, ang: 300, label: "JOE/AVAX", sub: "LP POOL", col: "#2dd7bc" },
      { r: 290, ang: 30, label: "RESERVE", sub: "90%", col: "#46db78" },
      { r: 290, ang: 150, label: "ACTIVE LP", sub: "10%", col: "#23a050" },
      { r: 290, ang: 270, label: "BENQI", sub: "LEND", col: "#2dd7bc" },
      { r: 365, ang: 90, label: "YIELD OUT", sub: "18.7%", col: "#e1b937" },
      { r: 365, ang: 210, label: "USER", sub: "DEPOSIT", col: "#a0ffb4" },
      { r: 365, ang: 330, label: "ORACLE", sub: "VAH", col: "#2dd7bc" },
    ];

    const RINGS = [
      { r: 210, col: "#46db78", spd: 0.05, ticks: 8 },
      { r: 290, col: "#2dd7bc", spd: -0.04, ticks: 10 },
      { r: 365, col: "#23a050", spd: 0.03, ticks: 12 },
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
      const FY = footerBlock(
        ctx,
        W,
        H,
        [
          "The result is a balanced liquidity",
          "system that improves efficiency,",
          "stability, and long-term",
          "capital performance.",
        ],
        "#46db78",
      );

      const CX = W / 2;
      const CY = TH + (FY - TH) * 0.52;

      RINGS.forEach(({ r, col, spd, ticks }) => {
        const rot = t * TAU * spd;
        ctx.beginPath();
        ctx.arc(CX, CY, r, 0, TAU);
        ctx.strokeStyle = `${col}99`;
        ctx.lineWidth = 2;
        ctx.stroke();

        for (let i = 0; i < ticks; i++) {
          const a = (i / ticks) * TAU + rot;
          const l = i % (ticks / 4) === 0 ? 9 : 5;
          ctx.beginPath();
          ctx.moveTo(CX + Math.cos(a) * (r - l), CY + Math.sin(a) * (r - l));
          ctx.lineTo(CX + Math.cos(a) * (r + l), CY + Math.sin(a) * (r + l));
          ctx.strokeStyle = `${col}cc`;
          ctx.lineWidth = i % (ticks / 4) === 0 ? 2.5 : 1.5;
          ctx.stroke();
        }

        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * TAU + rot * 2;
          const bright = 0.5 + 0.5 * Math.sin(t * TAU * 4 + i + r * 0.02);
          const dx = CX + Math.cos(a) * r;
          const dy = CY + Math.sin(a) * r;
          ctx.beginPath();
          ctx.arc(dx, dy, 7, 0, TAU);
          ctx.fillStyle = `${col}${Math.round(bright * 255)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(dx, dy, 13, 0, TAU);
          ctx.strokeStyle = `${col}${Math.round(bright * 80)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

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

        for (let d = 0; d < 4; d++) {
          const frac = (t + ni / 12 + d / 4) % 1;
          const fade = Math.sin(frac * Math.PI);
          const px = lerp(sx, nx, frac);
          const py = lerp(sy, ny, frac);
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, TAU);
          ctx.fillStyle = `${col}${Math.round(fade * 220)
            .toString(16)
            .padStart(2, "0")}`;
          ctx.fill();
        }
      });

      const ringLinks: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 0],
        [6, 7],
        [7, 8],
        [8, 6],
      ];

      ringLinks.forEach(([a, b]) => {
        const pa = POOLS[a];
        const pb = POOLS[b];
        const ax = CX + Math.cos((pa.ang * Math.PI) / 180) * pa.r;
        const ay = CY + Math.sin((pa.ang * Math.PI) / 180) * pa.r;
        const bx = CX + Math.cos((pb.ang * Math.PI) / 180) * pb.r;
        const by = CY + Math.sin((pb.ang * Math.PI) / 180) * pb.r;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = "rgba(70,219,120,0.22)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      POOLS.forEach(({ r, ang, label, sub, col }) => {
        const a = (ang * Math.PI) / 180;
        drawPoolNode(ctx, CX + Math.cos(a) * r, CY + Math.sin(a) * r, 32, label, sub, col, W, H);
      });

      drawCoreHub(ctx, CX, CY, t);

      apyCount = Math.min(18.7, apyCount + 18.7 / 180);
      const apx = W - 175;
      const apyY = TH + 34;
      const apyW = 176;
      const apyH = 116;
      const apyHeaderH = 18;
      ctx.fillStyle = "#030b05";
      roundRect(ctx, apx - 12, apyY - 10, apyW, apyH, 10);
      ctx.fill();
      ctx.strokeStyle = "#46db78";
      ctx.lineWidth = 2;
      roundRect(ctx, apx - 12, apyY - 10, apyW, apyH, 10);
      ctx.stroke();
      ctx.fillStyle = "#46db78";
      ctx.fillRect(apx - 12, apyY - 10, apyW, apyHeaderH);
      ctx.fillStyle = "#030b05";
      ctx.font = fnt(24, true);
      ctx.textAlign = "center";
      ctx.fillText("APY", apx + 76, apyY + 8);
      ctx.fillStyle = "#46db78";
      ctx.font = fnt(60, true);
      ctx.fillText(`${apyCount.toFixed(1)}%`, apx + 76, apyY + 74);
      ctx.fillStyle = "#2dd7bc";
      ctx.font = fnt(22, false);
      ctx.fillText("LP + Reserve", apx + 76, apyY + 104);

      const inds: [string, string][] = [
        ["✓ STABLE", "#46db78"],
        ["✓ EFFICIENT", "#2dd7bc"],
        ["✓ HF > 2.0", "#a0ffb4"],
        ["✓ OPTIMIZED", "#e1b937"],
      ];

      inds.forEach(([lbl, col], i) => {
        if (t > i * 0.12) {
          const iy = TH + 34 + i * 48;
          ctx.font = mono(24);
          ctx.textAlign = "left";
          const tw = ctx.measureText(lbl).width;
          ctx.fillStyle = "#030b05";
          roundRect(ctx, 10, iy - 8, tw + 28, 40, 6);
          ctx.fill();
          ctx.strokeStyle = col;
          ctx.lineWidth = 2;
          roundRect(ctx, 10, iy - 8, tw + 28, 40, 6);
          ctx.stroke();
          ctx.fillStyle = col;
          ctx.fillText(lbl, 22, iy + 22);
        }
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 px-6 w-full max-w-[1920px] mx-auto relative z-10">
        {[c1, c2, c3].map((ref, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="overflow-hidden rounded-xl border border-primary/20 bg-[#05020e] aspect-[9/16] max-w-[500px] md:max-w-none mx-auto"
          >
            <canvas ref={ref} className="w-full h-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisualStorySection;
