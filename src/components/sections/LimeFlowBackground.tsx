import { useEffect, useRef } from "react";

const LIME = "159, 245, 60";

class Particle {
  x = 0;
  y = 0;
  size = 0;
  speedY = 0;
  speedX = 0;
  opacity = 0;
  life = 0;
  maxLife = 0;
  wave = 0;
  waveSpeed = 0;
  waveAmp = 0;

  constructor(private width: () => number, private height: () => number) {
    this.reset(true);
  }

  reset(init = false) {
    this.x = Math.random() * this.width();
    this.y = init ? Math.random() * this.height() : this.height() + 10;
    this.size = Math.random() * 2.2 + 0.4;
    this.speedY = -(Math.random() * 0.6 + 0.2);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.7 + 0.2;
    this.life = 0;
    this.maxLife = Math.random() * 300 + 200;
    this.wave = Math.random() * Math.PI * 2;
    this.waveSpeed = Math.random() * 0.02 + 0.005;
    this.waveAmp = Math.random() * 1.5 + 0.5;
  }

  update(mouse: { x: number; y: number }) {
    this.life++;
    this.wave += this.waveSpeed;
    this.x += this.speedX + Math.sin(this.wave) * this.waveAmp * 0.1;
    this.y += this.speedY;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 160) {
      this.x += dx * 0.003;
      this.y += dy * 0.003;
    }

    if (this.y < -10 || this.life > this.maxLife) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D) {
    const fade = Math.min(1, this.life / 40) * Math.min(1, (this.maxLife - this.life) / 40);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${LIME}, ${this.opacity * fade})`;
    ctx.fill();
  }
}

class FlowLine {
  x = 0;
  y = 0;
  length = 0;
  speed = 0;
  angle = 0;
  opacity = 0;
  lineWidth = 0;
  life = 0;
  maxLife = 0;

  constructor(private width: () => number, private height: () => number) {
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.width();
    this.y = Math.random() * this.height();
    this.length = Math.random() * 120 + 40;
    this.speed = Math.random() * 0.8 + 0.3;
    this.angle = Math.random() * Math.PI * 2;
    this.opacity = Math.random() * 0.12 + 0.03;
    this.lineWidth = Math.random() * 1.2 + 0.2;
    this.life = 0;
    this.maxLife = Math.random() * 200 + 100;
  }

  update() {
    this.life++;
    this.angle += (Math.random() - 0.5) * 0.05;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    if (
      this.life > this.maxLife ||
      this.x < -50 ||
      this.x > this.width() + 50 ||
      this.y < -50 ||
      this.y > this.height() + 50
    ) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const fade = Math.min(1, this.life / 30) * Math.min(1, (this.maxLife - this.life) / 30);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);

    const endX = this.x - Math.cos(this.angle) * this.length;
    const endY = this.y - Math.sin(this.angle) * this.length;
    ctx.lineTo(endX, endY);

    const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
    gradient.addColorStop(0, `rgba(${LIME}, ${this.opacity * fade})`);
    gradient.addColorStop(1, `rgba(${LIME}, 0)`);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }
}

class Orb {
  x = 0;
  y = 0;
  r = 0;
  dx = 0;
  dy = 0;
  phase = 0;

  constructor(private width: () => number, private height: () => number) {
    this.x = Math.random() * this.width();
    this.y = Math.random() * this.height();
    this.r = Math.random() * 220 + 80;
    this.dx = (Math.random() - 0.5) * 0.4;
    this.dy = (Math.random() - 0.5) * 0.4;
    this.phase = Math.random() * Math.PI * 2;
  }

  update() {
    this.phase += 0.008;
    this.x += this.dx + Math.sin(this.phase) * 0.3;
    this.y += this.dy + Math.cos(this.phase * 0.7) * 0.3;

    if (this.x < -this.r) this.x = this.width() + this.r;
    if (this.x > this.width() + this.r) this.x = -this.r;
    if (this.y < -this.r) this.y = this.height() + this.r;
    if (this.y > this.height() + this.r) this.y = -this.r;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const radialGradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    radialGradient.addColorStop(0, `rgba(${LIME}, 0.045)`);
    radialGradient.addColorStop(0.5, `rgba(${LIME}, 0.018)`);
    radialGradient.addColorStop(1, `rgba(${LIME}, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = radialGradient;
    ctx.fill();
  }
}

const LimeFlowBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();

    const particles = Array.from({ length: 260 }, () => new Particle(() => width, () => height));
    const lines = Array.from({ length: 80 }, () => new FlowLine(() => width, () => height));
    const orbs = Array.from({ length: 5 }, () => new Orb(() => width, () => height));

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    let animationFrame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75,
      );
      vignette.addColorStop(0, "rgba(5,8,5,0)");
      vignette.addColorStop(1, "rgba(5,8,5,0.7)");

      orbs.forEach((orb) => {
        orb.update();
        orb.draw(ctx);
      });

      lines.forEach((line) => {
        line.update();
        line.draw(ctx);
      });

      particles.forEach((particle) => {
        particle.update(mouse);
        particle.draw(ctx);
      });

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
};

export default LimeFlowBackground;
