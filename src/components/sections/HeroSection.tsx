import { useEffect, useRef, useState } from "react";
import vid1 from "@/assets/webHerosVideo/video 1.mp4";
import vid2 from "@/assets/webHerosVideo/video 2.mp4";
import vid3 from "@/assets/webHerosVideo/video 3.mp4";
import vid4 from "@/assets/webHerosVideo/video 4.mp4";
import vid5 from "@/assets/webHerosVideo/video 5.mp4";
import vid6 from "@/assets/webHerosVideo/video 6.mp4";
import vid7 from "@/assets/webHerosVideo/video 7.mp4";
import vid8 from "@/assets/webHerosVideo/video 8.mp4";
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
  const videos = [vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8];
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
        i
          ? ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a))
          : ctx.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
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
          width: 100%; min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Barlow', system-ui, sans-serif;
          overflow: hidden;
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
          z-index: 10;
          height: calc(100vh - var(--nav-h));
          display: grid;
          grid-template-columns: 52% 48%;
          overflow: hidden;
      }

        /* ── Left panel ────────────────────────────── */
        .hero-left {
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 83px 56px 88px 56px;
          animation: fadeUp .8s ease both;
          position: relative; z-index: 20;
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
        .headline em { font-style: normal; color: var(--p3); }

        .hero-lower {
          display: flex; flex-direction: column; gap: 26px;
          animation: fadeUp .9s .28s ease both;
          opacity: 0; animation-fill-mode: forwards;
        }
        .sub {
          font-size: 14.5px; line-height: 1.72;
          color: rgba(241,238,255,.54); max-width: 400px;
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
        .hero-right { position: relative; overflow: hidden; }

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
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: linear-gradient(135deg,
            rgba(8,8,20,.5) 0%, rgba(0,0,0,.05) 60%, rgba(8,8,20,.45) 100%);
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
          z-index: 50;
          pointer-events: none;
        }     

        /* ── Mobile ────────────────────────────────── */
        @media (max-width: 768px) {
          :root { --nav-h: 56px; }
          .navbar { padding: 0 16px; }
          .nav-links { display: none; }
          .logo { font-size: 15px; gap: 8px; }
          .btn-launch { padding: 7px 14px; font-size: 12px; }
          .hero-section {
            display: flex; flex-direction: column;
            grid-template-columns: none;
            height: auto; min-height: calc(100vh - var(--nav-h));
          }
          .hero-left { padding: 22px 20px 26px; }
          .hero-right { width: 100%; height: 52vh; min-height: 320px; max-height: 460px; }
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
          .hero-left { padding: 18px 16px 22px; }
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
              <h1 className="headline">
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
          <svg
            ref={hexSvgRef}
            className="hex-seam-svg"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          />
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
