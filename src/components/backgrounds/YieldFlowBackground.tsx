import { useEffect, useRef } from "react";
import { COLOR_RGB, COLOR_DIM_RGB } from "@/constants/colors";

const COLOR = COLOR_RGB;
const COLOR_DIM = COLOR_DIM_RGB;

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

class YieldStream {
  particles: Particle[] = [];
  timer = 0;

  constructor(
    private startX: number,
    private endX: number,
    private y: number,
    private thickness: number,
    private speed: number,
    private col: string,
    private label: string,
  ) {}

  getY(x: number, t: number) {
    const wave1 = Math.sin((x * 0.008 + t) * 1.2) * 12;
    const wave2 = Math.sin((x * 0.013 - t * 0.7) * 0.9) * 7;
    return this.y + wave1 + wave2;
  }

  update(t: number) {
    this.timer++;
    if (this.timer % 6 === 0) {
      const px = this.startX + Math.random() * (this.endX - this.startX) * 0.3;
      const py = this.getY(px, t);
      this.particles.push({
        x: px,
        y: py,
        vx: this.speed * (1.5 + Math.random()),
        vy: (Math.random() - 0.5) * 0.5,
        life: 1,
        size: 1.5 + Math.random() * 2.5,
      });
    }

    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.008;
    });

    this.particles = this.particles.filter((p) => p.life > 0 && p.x < this.endX + 40);
  }

  draw(ctx: CanvasRenderingContext2D, t: number) {
    ctx.beginPath();
    for (let x = this.startX; x <= this.endX; x += 4) {
      const y = this.getY(x, t);
      x === this.startX ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    const g = ctx.createLinearGradient(this.startX, 0, this.endX, 0);
    g.addColorStop(0, `rgba(${this.col},0)`);
    g.addColorStop(0.1, `rgba(${this.col},0.35)`);
    g.addColorStop(0.85, `rgba(${this.col},0.35)`);
    g.addColorStop(1, `rgba(${this.col},0)`);
    ctx.strokeStyle = g;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.strokeStyle = g;
    ctx.lineWidth = this.thickness * 3;
    ctx.globalAlpha = 0.06;
    ctx.stroke();
    ctx.globalAlpha = 1;

    this.particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.col},${p.life * 0.8})`;
      ctx.fill();
    });

    ctx.font = "10px monospace";
    ctx.fillStyle = `rgba(${this.col},0.55)`;
    ctx.textAlign = "left";
    ctx.fillText(this.label, this.startX + 8, this.getY(this.startX, t) - 10);
  }
}

class VaultBox {
  fillLevel = 0;
  targetFill: number;
  phase = Math.random() * Math.PI * 2;

  constructor(
    private x: number,
    private y: number,
    private w: number,
    private h: number,
    private label: string,
    private pct: number,
    private col: string,
  ) {
    this.targetFill = pct;
  }

  update() {
    this.fillLevel += (this.targetFill - this.fillLevel) * 0.01;
    this.phase += 0.03;
    this.targetFill = this.pct + Math.sin(this.phase * 0.2) * 0.05;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = `rgba(${this.col},0.4)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(this.x, this.y, this.w, this.h, 10);
    ctx.stroke();

    const fillH = this.h * this.fillLevel;
    const fy = this.y + this.h - fillH;

    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x + 1, this.y + 1, this.w - 2, this.h - 2);
    ctx.clip();

    ctx.beginPath();
    for (let x = this.x; x <= this.x + this.w; x += 3) {
      const wy = fy + Math.sin(x * 0.05 + this.phase) * 4;
      x === this.x ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
    }
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.closePath();

    const fg = ctx.createLinearGradient(0, fy, 0, this.y + this.h);
    fg.addColorStop(0, `rgba(${this.col},0.3)`);
    fg.addColorStop(1, `rgba(${this.col},0.08)`);
    ctx.fillStyle = fg;
    ctx.fill();
    ctx.restore();

    for (let y = this.y; y < this.y + this.h; y += 6) {
      ctx.beginPath();
      ctx.moveTo(this.x, y);
      ctx.lineTo(this.x + this.w, y);
      ctx.strokeStyle = "rgba(0,0,0,0.08)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.textAlign = "center";
    ctx.font = "bold 12px monospace";
    ctx.fillStyle = `rgba(${this.col},0.9)`;
    ctx.fillText(this.label, this.x + this.w / 2, this.y + this.h / 2 - 8);
    ctx.font = "10px monospace";
    ctx.fillStyle = `rgba(${this.col},0.6)`;
    ctx.fillText(`${(this.fillLevel * 100).toFixed(0)}%`, this.x + this.w / 2, this.y + this.h / 2 + 8);
  }
}

class APYCounter {
  apy = 12;
  target = 18.7;
  phase = 0;

  constructor(
    private x: number,
    private y: number,
  ) {}

  update() {
    this.phase += 0.005;
    this.apy += (this.target - this.apy) * 0.002;
    this.target = 18.7 + Math.sin(this.phase) * 3 + Math.sin(this.phase * 2.3) * 1.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = "center";
    ctx.font = "bold 52px monospace";
    ctx.fillStyle = `rgba(${COLOR},0.9)`;
    ctx.shadowColor = `rgba(${COLOR},0.5)`;
    ctx.shadowBlur = 30;
    ctx.fillText(`${this.apy.toFixed(1)}%`, this.x, this.y);
    ctx.shadowBlur = 0;
    ctx.font = "11px monospace";
    ctx.fillStyle = `rgba(${COLOR},0.45)`;
    ctx.fillText("BLENDED APY", this.x, this.y + 22);
    ctx.fillText("Y_vault = α·Y_LP + (1−α)·Y_res", this.x, this.y + 38);
  }
}

const drawRepayRing = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, phase: number) => {
  const pct = 0.25;
  const start = -Math.PI / 2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${COLOR},0.08)`;
  ctx.lineWidth = 6;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r, start, start + Math.PI * 2 * pct + Math.sin(phase) * 0.1);
  ctx.strokeStyle = `rgba(${COLOR},0.7)`;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.stroke();

  const dotA = start + Math.PI * 0.5 * pct * 4 + phase * 0.5;
  ctx.beginPath();
  ctx.arc(cx + Math.cos(dotA) * r, cy + Math.sin(dotA) * r, 4, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${COLOR},1)`;
  ctx.fill();

  ctx.textAlign = "center";
  ctx.font = "bold 13px monospace";
  ctx.fillStyle = `rgba(${COLOR},0.8)`;
  ctx.fillText("25%", cx, cy - 6);
  ctx.font = "9px monospace";
  ctx.fillStyle = `rgba(${COLOR},0.45)`;
  ctx.fillText("→ DEBT", cx, cy + 8);
};

const YieldFlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 1;
    let height = 1;
    let t = 0;
    let rafId = 0;

    let streams: YieldStream[] = [];
    let vaults: VaultBox[] = [];
    let apyCounter: APYCounter;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width;
      canvas.height = height;

      streams = [
        new YieldStream(0, width * 0.55, height * 0.25, 2, 1.2, COLOR, "LP FEES"),
        new YieldStream(0, width * 0.55, height * 0.4, 3.5, 0.9, COLOR, "RESERVE YIELD"),
        new YieldStream(0, width * 0.55, height * 0.55, 1.5, 1.5, COLOR_DIM, "BORROW COST"),
        new YieldStream(width * 0.58, width, height * 0.38, 4, 1.4, COLOR, "NET YIELD"),
      ];

      vaults = [
        new VaultBox(width * 0.68, height * 0.15, 100, 160, "ACTIVE LP", 0.1, "255,100,80"),
        new VaultBox(width * 0.82, height * 0.15, 100, 160, "RESERVE", 0.9, COLOR),
      ];

      apyCounter = new APYCounter(width * 0.58, height * 0.75);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.012;

      ctx.fillStyle = `rgba(${COLOR},0.018)`;
      for (let x = 0; x < width; x += 35) {
        for (let y = 0; y < height; y += 35) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      streams.forEach((s) => {
        s.update(t);
        s.draw(ctx, t);
      });

      const funnelX = width * 0.56;
      [height * 0.25, height * 0.4, height * 0.55].forEach((sy) => {
        ctx.beginPath();
        ctx.moveTo(funnelX, sy);
        ctx.bezierCurveTo(funnelX + 30, sy, funnelX + 40, height * 0.38, funnelX + 60, height * 0.38);
        const g = ctx.createLinearGradient(funnelX, 0, funnelX + 60, 0);
        g.addColorStop(0, `rgba(${COLOR},0.3)`);
        g.addColorStop(1, `rgba(${COLOR},0)`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      vaults.forEach((v) => {
        v.update();
        v.draw(ctx);
      });

      apyCounter.update();
      apyCounter.draw(ctx);

      drawRepayRing(ctx, width * 0.5, height * 0.78, 30, t);

      const vignette = ctx.createRadialGradient(width / 2, height / 2, height * 0.2, width / 2, height / 2, height);
      vignette.addColorStop(0, "rgba(3,5,4,0)");
      vignette.addColorStop(1, "rgba(1,3,2,0.9)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      rafId = requestAnimationFrame(frame);
    };

    resize();
    frame();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />;
};

export default YieldFlowBackground;
