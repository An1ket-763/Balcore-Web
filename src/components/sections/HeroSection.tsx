import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { COLOR_RGB } from "@/constants/colors";

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    const mouse = { x: 0, y: 0 };
    const colorRgb = COLOR_RGB;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

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

      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 10;
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

      update() {
        this.life += 1;
        this.wave += this.waveSpeed;
        this.x += this.speedX + Math.sin(this.wave) * this.waveAmp * 0.1;
        this.y += this.speedY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 160) {
          this.x += dx * 0.003;
          this.y += dy * 0.003;
        }

        if (this.y < -10 || this.life > this.maxLife) {
          this.reset();
        }
      }

      draw() {
        const fadeIn = Math.min(1, this.life / 40);
        const fadeOut = Math.min(1, (this.maxLife - this.life) / 40);
        const fade = fadeIn * fadeOut;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorRgb}, ${this.opacity * fade})`;
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

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.length = Math.random() * 120 + 40;
        this.speed = Math.random() * 0.8 + 0.3;
        this.angle = Math.random() * Math.PI * 2;
        this.opacity = Math.random() * 0.12 + 0.03;
        this.lineWidth = Math.random() * 1.2 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }

      update() {
        this.life += 1;
        this.angle += (Math.random() - 0.5) * 0.05;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        const outOfBounds =
          this.x < -50 ||
          this.x > width + 50 ||
          this.y < -50 ||
          this.y > height + 50;

        if (this.life > this.maxLife || outOfBounds) {
          this.reset();
        }
      }

      draw() {
        const fadeIn = Math.min(1, this.life / 30);
        const fadeOut = Math.min(1, (this.maxLife - this.life) / 30);
        const fade = fadeIn * fadeOut;

        const endX = this.x - Math.cos(this.angle) * this.length;
        const endY = this.y - Math.sin(this.angle) * this.length;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);

        const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, `rgba(${colorRgb}, ${this.opacity * fade})`);
        gradient.addColorStop(1, `rgba(${colorRgb}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
      }
    }

    class Orb {
      x = Math.random() * width;
      y = Math.random() * height;
      radius = Math.random() * 220 + 80;
      dx = (Math.random() - 0.5) * 0.4;
      dy = (Math.random() - 0.5) * 0.4;
      phase = Math.random() * Math.PI * 2;

      update() {
        this.phase += 0.008;
        this.x += this.dx + Math.sin(this.phase) * 0.3;
        this.y += this.dy + Math.cos(this.phase * 0.7) * 0.3;

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );

        gradient.addColorStop(0, `rgba(${colorRgb}, 0.045)`);
        gradient.addColorStop(0.5, `rgba(${colorRgb}, 0.018)`);
        gradient.addColorStop(1, `rgba(${colorRgb}, 0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    resize();

    const particles = Array.from({ length: 260 }, () => new Particle());
    const lines = Array.from({ length: 80 }, () => new FlowLine());
    const orbs = Array.from({ length: 5 }, () => new Orb());

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );

      vignette.addColorStop(0, "rgba(5,8,5,0)");
      vignette.addColorStop(1, "rgba(5,8,5,0.7)");

      orbs.forEach((orb) => {
        orb.update();
        orb.draw();
      });

      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrame = window.requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050805]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <motion.img
        src="/Blogo.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto w-[min(65vw,620px)] md:w-[min(52vw,720px)] h-auto z-[1] pointer-events-none select-none opacity-[0.07]"
        animate={{ scale: [1, 1.04, 1], rotate: [0, 1.5, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-white tracking-wide">
            BUILT ON AVALANCHE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-5xl"
        >
          <span className="relative inline-block font-['Orbitron'] font-semibold tracking-[0.28em] text-white uppercase">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 text-color blur-[5px] opacity-50"
            >
              BALCORE
            </span>
            BALCORE
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-xl md:text-2xl text-white max-w-3xl leading-relaxed font-medium"
        >
          Transforming passive capital into active, optimized, orchestrated yield on
          Avalanche and beyond
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-lg text-white/90 max-w-2xl leading-relaxed"
        >
          Balcore is building infrastructure that helps DeFi capital work more
          intelligently across changing market conditions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <motion.a
            href="#visual-story"
            className="btn-primary group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2 text-white">Learn More</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#visual-story"
          className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
