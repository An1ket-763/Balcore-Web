import { useEffect, useRef, useState } from "react";
// etc.

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface SceneDot {
  index: number;
  active: boolean;
}

/* ─── Stats data ──────────────────────────────────────────────────────── */
const STATS = [
  { value: "Upto 30%", label: "Target APY · market-neutral" },
  { value: "3×", label: "Independent IL shield" },
  { value: "Principal", label: "Always returned on exit" },
  { value: "24/7", label: "Fully automated rebalancing" },
];

const HEX_OFFSETS: [number, number][] = [
  [-10, 100],
  [70, 245],
  [-0, 390],
  [70, 530],
];

/* ═══════════════════════════════════════════════════════════════════════
   HeroSection
   ═══════════════════════════════════════════════════════════════════════ */
const HeroSection = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const hexSvgRef = useRef<SVGSVGElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);
  const videos = [
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%201.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/Video%202.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%203.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%204.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%205.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/Video%206.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%207.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/Video%207%20(2).mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%209.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2011.mp4",
    "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2012.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2013.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/vidoe%2014.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/vidoe%2015.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2016.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2017.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2018.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2020.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2021.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/vidoe%2022.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/Video%2023.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2024.mp4",
    // "https://cdn.balcore.ai/Web%20Heros%20video%20optimized/video%2025.mp4"
  ];
  const TOTAL_DOTS = videos?.length || 0; // adjust to match your video count

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const R = 38;
    const S3 = Math.sqrt(3);
    let cells: {
      cx: number;
      cy: number;
      ph: number;
      sp: number;
      ba: number;
      ac: boolean;
    }[] = [];
    let t = 0;
    let W = 0,
      H = 0;
    let rafId: number;

    function build() {
      cells = [];
      const cw = R * 2,
        ch = S3 * R;
      for (let col = -1; col < Math.ceil(W / (cw * 0.75)) + 2; col++)
        for (let row = -1; row < Math.ceil(H / ch) + 2; row++)
          cells.push({
            cx: col * cw * 0.75,
            cy: row * ch + (col % 2 ? ch / 2 : 0),
            ph: Math.random() * Math.PI * 2,
            sp: 0.003 + Math.random() * 0.005,
            ba: 0.012 + Math.random() * 0.032,
            ac: Math.random() < 0.1,
          });
    }

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      build();
    }

    function hex(cx: number, cy: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        if (i) {
          ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        } else {
          ctx.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
        }
      }
      ctx.closePath();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      cells.forEach((h) => {
        const w = Math.sin(t * h.sp + h.ph);
        const a = h.ba + 0.02 * w;
        hex(h.cx, h.cy);
        ctx.strokeStyle = h.ac
          ? `rgba(124,58,237,${(a * 1.8).toFixed(3)})`
          : `rgba(65,55,105,${a.toFixed(3)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      t++;
      rafId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Video switching & autoplay ───────────────────────────── */
  useEffect(() => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];

    if (!videos.length) return;

    let current = 0;
    let timeout: NodeJS.Timeout;

    const playVideo = async (index: number) => {
      videos.forEach((video, i) => {
        video.classList.toggle("active", i === index);

        if (i !== index) {
          video.pause();
          video.currentTime = 0;
        }
      });

      const activeVideo = videos[index];

      try {
        activeVideo.currentTime = 0;
        await activeVideo.play();
      } catch (err) {
        console.log("Video autoplay failed:", err);
      }

      setActiveScene(index);

      const duration =
        activeVideo.duration && !isNaN(activeVideo.duration)
          ? activeVideo.duration * 1000
          : 6000;

      timeout = setTimeout(() => {
        current = (index + 1) % videos.length;
        playVideo(current);
      }, duration - 200);
    };

    videos.forEach((video) => {
      video.load();

      video.addEventListener("loadedmetadata", () => {
        video.volume = 0;
        video.muted = true;
      });
    });

    playVideo(0);

    return () => {
      clearTimeout(timeout);

      videos.forEach((video) => {
        video.pause();
      });
    };
  }, []);

  /* ── Hex seam overlay SVG (fixed, pointer-events:none) ───────────── */
  useEffect(() => {
    const svg = hexSvgRef.current;
    if (!svg) return;
    const NS = "http://www.w3.org/2000/svg";
    const R = 80;

    function build() {
      while (svg!.firstChild) svg!.removeChild(svg!.firstChild);
      const W = window.innerWidth;
      const seam = W * 0.495;
      // const NAV = 68;
      // const H = window.innerHeight;

      const hero = document.querySelector(".hero-section") as HTMLElement;
      const H = hero?.offsetHeight || window.innerHeight;
      const NAV = 0;

      const defs = document.createElementNS(NS, "defs");

      // Left clip
      const cL = document.createElementNS(NS, "clipPath");
      cL.setAttribute("id", "hcL");
      const rL = document.createElementNS(NS, "rect");
      rL.setAttribute("x", "0");
      rL.setAttribute("y", "0");
      rL.setAttribute("width", String(seam));
      rL.setAttribute("height", String(H));
      cL.appendChild(rL);
      defs.appendChild(cL);

      // Right clip
      const cR = document.createElementNS(NS, "clipPath");
      cR.setAttribute("id", "hcR");
      const rR = document.createElementNS(NS, "rect");
      rR.setAttribute("x", String(seam));
      rR.setAttribute("y", "0");
      rR.setAttribute("width", String(W - seam));
      rR.setAttribute("height", String(H));
      cR.appendChild(rR);
      defs.appendChild(cR);

      svg!.appendChild(defs);

      HEX_OFFSETS.forEach(([dx, dy]) => {
        const cx = seam + dx;
        const cy = NAV + dy;
        let pts = "";
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          pts += `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)} `;
        }
        const mk = (fill: string, clip: string) => {
          const el = document.createElementNS(NS, "polygon");
          el.setAttribute("points", pts);
          el.setAttribute("fill", fill);
          el.setAttribute("stroke", "rgba(255,255,255,0.9)");
          el.setAttribute("stroke-width", "2.5");
          el.setAttribute("clip-path", `url(#${clip})`);
          return el;
        };
        svg!.appendChild(mk("#08080f", "hcL"));
        svg!.appendChild(mk("#08080f", "hcR"));
      });
    }

    build();
    window.addEventListener("resize", build);
    return () => window.removeEventListener("resize", build);
  }, []);

  /* ── Scene dot click ────────────────────────────────────────────── */
  const handleDot = async (i: number) => {
    const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];

    videos.forEach((video, index) => {
      video.classList.toggle("active", index === i);

      if (index !== i) {
        video.pause();
        video.currentTime = 0;
      }
    });

    const activeVideo = videos[i];

    try {
      activeVideo.currentTime = 0;
      await activeVideo.play();
    } catch (err) {
      console.log(err);
    }

    setActiveScene(i);
  };

  /* ═════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:     #08080f;
          --purple: #7c3aed;
          --p3:     #9f5fff;
          --text:   #f1eeff;
          --muted:  rgba(241,238,255,.5);
          --nav-h:  68px;
        }

        .hero-root {
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Barlow', system-ui, sans-serif;
          overflow-x: clip;
          overflow-y: visible;
          position: relative;
        }

        /* ── BG canvas ─────────────────────────────── */
        .bg-canvas {
          position: fixed; inset: 0;
          width: 100%; height: 100%;
          z-index: 0; pointer-events: none;
        }

        /* ── Nav ───────────────────────────────────── */
        .navbar {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 300; height: var(--nav-h);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 56px;
          background: rgba(8,8,15,.72);
          backdrop-filter: blur(18px);
          border-bottom: .5px solid rgba(124,58,237,.18);
        }
        .logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--text);
          font-weight: 600; font-size: 17px;
        }
        .nav-links {
          display: flex; gap: 36px; list-style: none;
        }
        .nav-links a {
          font-size: 13px; font-weight: 500;
          letter-spacing: .08em; text-transform: uppercase;
          color: var(--muted); text-decoration: none; transition: color .2s;
        }
        .nav-links a:hover { color: var(--text); }
        .btn-launch {
          display: flex; align-items: center; gap: 8px;
          background: var(--purple); color: #fff;
          border: none; border-radius: 6px;
          font-family: 'Barlow', sans-serif; font-weight: 500;
          font-size: 13px; letter-spacing: .04em;
          padding: 9px 22px; cursor: pointer;
          transition: background .2s, transform .15s;
        }
        .btn-launch:hover { background: var(--p3); transform: translateY(-1px); }

        /* ── Hero grid ─────────────────────────────── */
        .hero-section {
          position: relative;
          
         height: 100vh;
          overflow: hidden;
      }
          

        /* ── Left panel ────────────────────────────── */
        .hero-left {
          position: absolute;
          z-index: 10;
          top: 50%;
          left: 80px;
          transform: translateY(-50%);
          max-width: 700px;
        }
 
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(109,40,217,.15);
          border: .5px solid rgba(124,58,237,.38);
          border-radius: 100px; padding: 5px 13px;
          font-size: 10px; font-weight: 600;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--p3); margin-bottom: 22px; width: fit-content;
        }
        .badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #ef4444; animation: blink 2s infinite;
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:.35; } }

        .headline {
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 900;
          font-size: clamp(38px, 5vw, 68px);
          line-height: .93; letter-spacing: -.015em;
          text-transform: uppercase; color: #fff;
        }
        .headline-ipad { display: none; }
        .headline em { font-style: normal; color: var(--p3); }

        .hero-lower {
          display: flex; flex-direction: column; gap: 26px;
          animation: fadeUp .9s .28s ease both;
          opacity: 0; animation-fill-mode: forwards;
        }
        .sub {
          font-size: 14.5px; line-height: 1.72;
          color: rgba(241, 238, 255, 0.68); max-width: 400px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }
        .btns { display: flex; gap: 12px; align-items: center; }
        .btn-p {
          display: flex; align-items: center; gap: 8px;
          background: var(--purple); color: #fff; border: none;
          border-radius: 6px; font-family: 'Barlow', sans-serif;
          font-weight: 500; font-size: 13.5px;
          padding: 12px 28px; cursor: pointer;
          transition: background .2s, transform .15s;
        }
        .btn-p:hover { background: var(--p3); transform: translateY(-2px); }
        .btn-o {
          background: transparent; color: var(--text);
          border: .5px solid rgba(241,238,255,.2);
          border-radius: 6px; font-family: 'Barlow', sans-serif;
          font-weight: 400; font-size: 13.5px;
          padding: 12px 28px; cursor: pointer;
        }

        /* ── Right panel ───────────────────────────── */
        .hero-right {  
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .vid-wrap {
          position: absolute; inset: 0; z-index: 1;
        }
        .vid-wrap video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          opacity: 0; transition: opacity 1.2s ease;
        }
        .vid-wrap video.active { opacity: 1; }

        /* Fallback gradient when no video */
        .vid-fallback {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 70% at 70% 40%, rgba(124,58,237,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 30% 70%, rgba(159,95,255,0.08) 0%, transparent 60%),
            linear-gradient(135deg, #0d0d1a 0%, #08080f 100%);
          display: flex; align-items: center; justify-content: center;
        }

         .grade {
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
              rgba(0, 0, 0, 0.85) 0%,
                rgba(0, 0, 0, 0.75) 30%,
                rgba(0, 0, 0, 0.55) 34%,
                rgba(0, 0, 0, 0.30) 54%,
                rgba(0, 0, 0, 0.10) 90%,
                transparent 100%
              );
          }     
        .edge-b {
          position: absolute; left: 0; right: 0; bottom: 0;
          height: 110px; z-index: 4; pointer-events: none;
          background: linear-gradient(to top, #08080f 0%, transparent 100%);
        }

        /* ── Scene dots ────────────────────────────── */
        .scene-dots {
          position: absolute; bottom: 100px; right: 18px;
          z-index: 10; display: flex; flex-direction: column; gap: 7px;
        }
        .sdot {
          width: 6px; height: 6px; border-radius: 50%;
          cursor: pointer;
          background: rgba(255,255,255,.2);
          border: 1px solid rgba(255,255,255,.25);
          transition: all .3s;
        }
        .sdot.on {
          background: var(--p3); border-color: var(--p3);
          box-shadow: 0 0 8px rgba(159,95,255,.7);
        }

        /* ── Stats bar ─────────────────────────────── */
        .stats {
          position: fixed; bottom: 0; left: 0; right: 0;
          z-index: 200; display: flex;
          background: rgba(8,8,15,.92);
          backdrop-filter: blur(12px);
          border-top: .5px solid rgba(124,58,237,.18);
        }
        .stat {
          flex: 1; padding: 16px 44px;
          border-right: .5px solid rgba(124,58,237,.12);
        }
        .stat:last-child { border-right: none; }
        .sv {
          display: block;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 24px;
          color: #fff; letter-spacing: -.01em;
        }
        .sl {
          display: block; font-size: 10.5px;
          color: var(--muted); letter-spacing: .06em;
          text-transform: uppercase; margin-top: 1px;
        }

        /* ── Hex seam SVG overlay ──────────────────── */
        .hex-seam-svg {
          position: absolute;
          top: var(--nav-h);
          left: 0%;
          width: 100%;
          height: calc(100vh - var(--nav-h));
          height: calc(100svh - var(--nav-h));
          z-index: 50;
          pointer-events: none;
        }     

        /* ── Mobile ────────────────────────────────── */
        /* ── iPad / Tablet (768px - 1024px) ──────── */
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-root { min-height: 0; }
          .hero-section {
            display: flex;
            flex-direction: column;
            grid-template-columns: none;
            height: auto;
            min-height: 0;
            overflow: visible;
          }
          .hero-left {
            padding: 104px 48px 40px;
            align-items: center;
            text-align: center;
            display: flex; flex-direction: column;
            justify-content: space-between;
            padding: 83px 56px 88px 56px;
            animation: fadeUp .8s ease both;
            position: relative; z-index: 20;
          }
          .grade {
            position: absolute; inset: 0; z-index: 2; pointer-events: none;
            background: linear-gradient(135deg,
              rgba(8,8,20,.5) 0%, rgba(0,0,0,.05) 60%, rgba(8,8,20,.45) 100%);
          }
          .hero-left > div:first-child { display: flex; flex-direction: column; align-items: center; }
          .headline { text-align: center; }
          .headline-default { display: none; }
          .headline-ipad { display: block; }
          .hero-lower { align-items: center; margin-top: 24px; }
          .sub { max-width: 600px; text-align: center; }
          .btns { justify-content: center; }
          .hero-right { width: 100%; height: clamp(320px, 38vh, 420px); min-height: 0; }
          .hero-right { position: relative; overflow: hidden; }
          .hex-seam-svg { display: none; }
          .scene-dots { display: none; }
        }

        @media (max-width: 767px) {
          :root { --nav-h: 56px; }
          .hero-root { min-height: 0; }
          .navbar { padding: 0 16px; }
          .nav-links { display: none; }
          .logo { font-size: 15px; gap: 8px; }
          .btn-launch { padding: 7px 14px; font-size: 12px; }
          .hero-section {
            display: block;
            grid-template-columns: none;
            height: auto;
            min-height: calc(100svh - var(--nav-h));
            overflow: hidden;
            position: relative;
          }
          .hero-left {
            top: auto;
            left: auto;
            transform: none;
            width: 100%;
            max-width: none;
            padding: 82px 20px 40px;
            position: relative;
            z-index: 20;
            min-height: calc(100svh - var(--nav-h));
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            animation: fadeUp .8s ease both;
          }
          .hero-right {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 0 !important;
            max-height: none !important;
            z-index: 1 !important;
            overflow: hidden;
          }
          .hero-right .grade {
            background: linear-gradient(180deg,
              rgba(8,8,15,.78) 0%,
              rgba(8,8,15,.5) 45%,
              rgba(8,8,15,.88) 100%);
          }
          .badge { font-size: 11px; padding: 6px 14px; }
          .headline { font-size: 36px; margin-top: 18px; line-height: .96; }
          .hero-lower { gap: 16px; margin-top: 28px; }
          .sub { font-size: 14px; max-width: none; line-height: 1.65; }
          .btns { gap: 10px; flex-wrap: wrap; }
          .btn-p, .btn-o { font-size: 13.5px; padding: 12px 22px; }
          .hex-seam-svg { display: none; }
          .scene-dots { display: none; }
          .edge-b { height: 70px; }
          .stats { position: relative; flex-wrap: wrap; }
          .stat { flex: 1 1 50%; padding: 14px 18px; }
          .stat:nth-child(2n) { border-right: none; }
          .stat:nth-child(n+3) { border-top: .5px solid rgba(124,58,237,.12); }
          .sv { font-size: 21px; }
          .sl { font-size: 9.5px; }
        }
        @media (max-width: 380px) {
          .hero-left { padding: 78px 16px 22px; }
          .headline { font-size: 32px; }
          .btn-p, .btn-o { padding: 11px 18px; font-size: 13px; }
          .stat { padding: 12px 14px; }
          .sv { font-size: 19px; }
        }
      `}</style>

      <div className="hero-root">
        {/* ── Animated hexagon bg canvas ── */}
        <canvas ref={bgCanvasRef} className="bg-canvas" aria-hidden="true" />

        {/* ── Hero ── */}
        <section className="hero-section">
          {/* Left */}
          <div className="hero-left">
            <div>
              <div className="badge">
                <span className="badge-dot" />
                Built on Avalanche
              </div>
              <h1 className="headline headline-default">
                Solving
                <br />
                the Puzzle
                <br />
                of{" "}
                <em>
                  Capital
                  <br />
                  Efficiency
                </em>
                <br />
                of Onchain
                <br />
                Liquidity
              </h1>
              <h1 className="headline headline-ipad">
                Solving the Puzzle
                <br />
                of{" "}
                <em>Capital Efficiency</em>
                <br />
                of Onchain Liquidity
              </h1>
            </div>

            <div className="hero-lower">
              <p className="sub">
                BalCore is a research-driven DeFi protocol where novel
                architecture and intelligent automation work together on the
                hardest problems in liquidity management in decentralized
                finance.
              </p>
              <div className="btns">
                <button className="btn-p">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Get Started
                </button>
                <button className="btn-o">Learn More →</button>
              </div>
            </div>
          </div>

          {/* Right — video / fallback */}
          <div className="hero-right">
            <div className="vid-wrap">
              {videos?.map((video, index) => (
                <video
                  key={index}
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={video}
                  muted
                  playsInline
                  preload="auto"
                  className={index === 0 ? "active" : ""}
                />
              ))}
            </div>

            <div className="grade" aria-hidden="true" />
            <div className="edge-b" aria-hidden="true" />

            {/* Scene dots */}
            <div className="scene-dots" aria-hidden="true">
              {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
                <span
                  key={i}
                  className={`sdot${activeScene === i ? " on" : ""}`}
                  onClick={() => handleDot(i)}
                />
              ))}
            </div>
          </div>
          {/* <svg
            ref={hexSvgRef}
            className="hex-seam-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          /> */}
        </section>

        {/* ── Stats bar (removed) ── */}
        {/* <div className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <span className="sv">{s.value}</span>
              <span className="sl">{s.label}</span>
            </div>
          ))}
        </div> */}

        {/* ── Hex seam SVG overlay ── */}
      </div>
    </>
  );
};

export default HeroSection;
