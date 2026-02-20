import { useEffect, useRef } from "react";

const LIME = "159,245,60";

const MarketBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let tickX = 0;
    let priceCursor = 0;
    const priceHistory: number[] = [];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width;
      canvas.height = height;
      tickX = width;
    };

    class CandleChart {
      ox: number;
      oy: number;
      w: number;
      h: number;
      scale: number;
      candles: { open: number; close: number; high: number; low: number }[] = [];
      maxCandles: number;
      price: number;
      opacity = 0;
      fadeIn = true;
      age = 0;
      maxAge: number;
      tickTimer = 0;
      tickInterval: number;

      constructor(x: number, y: number, w: number, h: number, scale = 1) {
        this.ox = x;
        this.oy = y;
        this.w = w;
        this.h = h;
        this.scale = scale;
        this.maxCandles = Math.max(8, Math.floor(w / (8 * scale)));
        this.price = 100 + Math.random() * 50;
        this.maxAge = 900;
        this.tickInterval = 18 + Math.random() * 12;
        this.generateInitial();
      }

      nextPrice(p: number) {
        const vol = p * 0.012;
        const drift = (Math.random() - 0.48) * vol;
        return Math.max(10, p + drift);
      }

      generateInitial() {
        for (let i = 0; i < this.maxCandles; i++) {
          const open = this.price;
          const close = this.nextPrice(open);
          const high = Math.max(open, close) + Math.random() * open * 0.005;
          const low = Math.min(open, close) - Math.random() * open * 0.005;
          this.candles.push({ open, close, high, low });
          this.price = close;
        }
      }

      addCandle() {
        const open = this.price;
        const close = this.nextPrice(open);
        const high = Math.max(open, close) + Math.random() * open * 0.005;
        const low = Math.min(open, close) - Math.random() * open * 0.005;
        this.candles.push({ open, close, high, low });
        if (this.candles.length > this.maxCandles) this.candles.shift();
        this.price = close;
      }

      update() {
        this.age++;
        this.tickTimer++;
        if (this.tickTimer >= this.tickInterval) {
          this.addCandle();
          this.tickTimer = 0;
        }

        if (this.fadeIn) {
          this.opacity = Math.min(0.85, this.opacity + 0.008);
          if (this.opacity >= 0.85) this.fadeIn = false;
        }
      }

      draw() {
        const prices = this.candles.flatMap((candle) => [candle.high, candle.low]);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const range = maxPrice - minPrice || 1;
        const candleWidth = 6 * this.scale;
        const gap = 2 * this.scale;
        const step = candleWidth + gap;

        const toY = (price: number) => this.oy + this.h - ((price - minPrice) / range) * this.h;

        for (let i = 0; i <= 4; i++) {
          const gridY = this.oy + (this.h / 4) * i;
          ctx.beginPath();
          ctx.moveTo(this.ox, gridY);
          ctx.lineTo(this.ox + this.w, gridY);
          ctx.strokeStyle = `rgba(${LIME},${0.04 * this.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        this.candles.forEach((candle, index) => {
          const x = this.ox + index * step;
          const bullish = candle.close >= candle.open;
          const alpha = this.opacity * (0.5 + (index / this.candles.length) * 0.5);
          const color = bullish ? `rgba(${LIME},${alpha})` : `rgba(255,80,80,${alpha * 0.7})`;

          const openY = toY(candle.open);
          const closeY = toY(candle.close);
          const highY = toY(candle.high);
          const lowY = toY(candle.low);
          const top = Math.min(openY, closeY);
          const bodyHeight = Math.max(1.5, Math.abs(openY - closeY));

          ctx.beginPath();
          ctx.moveTo(x + candleWidth / 2, highY);
          ctx.lineTo(x + candleWidth / 2, lowY);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1 * this.scale;
          ctx.stroke();

          ctx.fillStyle = color;
          ctx.fillRect(x, top, candleWidth, bodyHeight);
        });

        const volumeHeight = this.h * 0.12;
        this.candles.forEach((candle, index) => {
          const x = this.ox + index * step;
          const bullish = candle.close >= candle.open;
          const volume = Math.abs(candle.close - candle.open) / candle.open;
          const barHeight = Math.max(1, volume * volumeHeight * 80);
          const alpha = this.opacity * 0.3;
          ctx.fillStyle = bullish ? `rgba(${LIME},${alpha})` : `rgba(255,80,80,${alpha})`;
          ctx.fillRect(x, this.oy + this.h - barHeight, candleWidth, barHeight);
        });
      }
    }

    class Phone {
      x: number;
      y: number;
      scale: number;
      floatPhase: number;
      opacity = 0;
      chart: CandleChart;

      constructor(x: number, y: number, scale = 1) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.floatPhase = Math.random() * Math.PI * 2;
        this.chart = new CandleChart(0, 0, 108 * scale, 80 * scale, scale * 0.7);
      }

      update() {
        this.floatPhase += 0.012;
        this.opacity = Math.min(1, this.opacity + 0.006);
        this.chart.update();
      }

      draw() {
        const phoneWidth = 120 * this.scale;
        const phoneHeight = 220 * this.scale;
        const floatY = Math.sin(this.floatPhase) * 8;
        const cx = this.x;
        const cy = this.y + floatY;

        ctx.save();
        ctx.globalAlpha = this.opacity * 0.9;
        ctx.translate(cx, cy);

        const radius = 16 * this.scale;
        ctx.beginPath();
        ctx.roundRect(-phoneWidth / 2, -phoneHeight / 2, phoneWidth, phoneHeight, radius);
        ctx.fillStyle = "rgba(8,14,8,0.92)";
        ctx.fill();
        ctx.strokeStyle = `rgba(${LIME},0.4)`;
        ctx.lineWidth = 1.5 * this.scale;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(-phoneWidth / 2 + 6 * this.scale, -phoneHeight / 2 + 14 * this.scale, phoneWidth - 12 * this.scale, phoneHeight - 28 * this.scale, 8 * this.scale);
        ctx.fillStyle = "rgba(4,10,4,0.95)";
        ctx.fill();
        ctx.strokeStyle = `rgba(${LIME},0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(-18 * this.scale, -phoneHeight / 2 + 5 * this.scale, 36 * this.scale, 8 * this.scale, 4 * this.scale);
        ctx.fillStyle = `rgba(${LIME},0.15)`;
        ctx.fill();

        ctx.beginPath();
        ctx.roundRect(-20 * this.scale, phoneHeight / 2 - 10 * this.scale, 40 * this.scale, 4 * this.scale, 2 * this.scale);
        ctx.fillStyle = `rgba(${LIME},0.25)`;
        ctx.fill();
        ctx.restore();

        this.chart.ox = cx - 60 * this.scale + 12 * this.scale;
        this.chart.oy = cy - phoneHeight / 2 + 20 * this.scale;
        this.chart.opacity = this.opacity * 0.65;

        ctx.save();
        ctx.globalAlpha = this.opacity * 0.5;
        ctx.font = `${8 * this.scale}px monospace`;
        ctx.fillStyle = `rgba(${LIME},0.7)`;
        ctx.fillText("AVAX/USDC", cx - 55 * this.scale, cy - phoneHeight / 2 + 30 * this.scale);
        const priceText = `$${(28 + Math.sin(this.floatPhase * 0.3) * 2).toFixed(2)}`;
        ctx.fillStyle = `rgba(${LIME},0.9)`;
        ctx.fillText(priceText, cx - 55 * this.scale, cy - phoneHeight / 2 + 42 * this.scale);
        ctx.restore();

        this.chart.draw();
      }
    }

    class Scanline {
      y = 0;
      speed = 0;
      opacity = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.y = -20;
        this.speed = 0.6 + Math.random() * 0.8;
        this.opacity = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.y += this.speed;
        if (this.y > height + 20) this.reset();
      }

      draw() {
        const gradient = ctx.createLinearGradient(0, this.y - 40, 0, this.y + 40);
        gradient.addColorStop(0, `rgba(${LIME},0)`);
        gradient.addColorStop(0.5, `rgba(${LIME},${this.opacity})`);
        gradient.addColorStop(1, `rgba(${LIME},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, this.y - 40, width, 80);
      }
    }

    const tickers = [
      "AVAX/USDC ▲2.4%",
      "BALCORE TVL $4.2M",
      "HF: 2.41 ✓",
      "YIELD: 18.7% APY",
      "LP ACTIVE",
      "RESERVE: 90%",
      "REBALANCE OK",
      "BENQI HF 2.3",
    ];

    const drawGrid = () => {
      const step = 60;
      ctx.strokeStyle = `rgba(${LIME},0.018)`;
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    };

    const drawTicker = () => {
      tickX -= 1.2;
      const full = `${tickers.join("   ·   ")}   ·   `;
      ctx.font = "11px monospace";
      ctx.fillStyle = `rgba(${LIME},0.25)`;
      const textWidth = ctx.measureText(full).width;
      if (tickX < -textWidth) tickX = width;
      ctx.fillText(full + full, tickX, height - 14);
      ctx.fillText(full + full, tickX + textWidth, height - 14);
    };

    const updatePriceLine = () => {
      priceCursor += (Math.random() - 0.49) * 2;
      priceHistory.push(priceCursor);
      if (priceHistory.length > width) priceHistory.shift();
    };

    const drawPriceLine = () => {
      if (priceHistory.length < 2) return;

      const min = Math.min(...priceHistory);
      const max = Math.max(...priceHistory);
      const range = max - min || 1;
      const lineHeight = height * 0.2;
      const baseY = height * 0.88;

      ctx.beginPath();
      priceHistory.forEach((value, index) => {
        const x = (index / priceHistory.length) * width;
        const y = baseY - ((value - min) / range) * lineHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(width, baseY);
      ctx.lineTo(0, baseY);
      ctx.closePath();

      const fillGradient = ctx.createLinearGradient(0, baseY - lineHeight, 0, baseY);
      fillGradient.addColorStop(0, `rgba(${LIME},0.06)`);
      fillGradient.addColorStop(1, `rgba(${LIME},0)`);
      ctx.fillStyle = fillGradient;
      ctx.fill();

      ctx.beginPath();
      priceHistory.forEach((value, index) => {
        const x = (index / priceHistory.length) * width;
        const y = baseY - ((value - min) / range) * lineHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = `rgba(${LIME},0.22)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const scanlines = Array.from({ length: 3 }, () => new Scanline());
    let phones: Phone[] = [];

    const resetPhones = () => {
      const leftX = Math.max(80, width * 0.16);
      const rightX = Math.min(width - 80, width * 0.84);
      const centerY = height * 0.52;
      const scale = Math.max(0.55, Math.min(0.85, width / 1400));

      phones = [
        new Phone(leftX, centerY, scale),
        new Phone(rightX, centerY, scale),
      ];
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      drawGrid();
      updatePriceLine();
      drawPriceLine();

      scanlines.forEach((scanline) => {
        scanline.update();
        scanline.draw();
      });

      phones.forEach((phone) => {
        phone.update();
        phone.draw();
      });

      drawTicker();

      const vignette = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height) * 0.8);
      vignette.addColorStop(0, "rgba(4,8,4,0)");
      vignette.addColorStop(1, "rgba(2,4,2,0.88)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      rafId = window.requestAnimationFrame(frame);
    };

    resize();
    resetPhones();

    const observer = new ResizeObserver(() => {
      resize();
      resetPhones();
    });

    observer.observe(parent);
    frame();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />;
};

export default MarketBackground;
