import { useEffect, useRef } from "react";

const TOKENS = [
  {
    id: "dollar",
    label: "Dollar",
    color: "#22c55e",
    angle: -90,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="3" x2="12" y2="21"/><path d="M17 6.5C17 4.6 14.8 4 12 4S7 4.6 7 7s2.2 3 5 3.4 5 1.1 5 3.4-2.2 3-5 3-5-.6-5-2.5"/></svg>`,
  },
  {
    id: "btc",
    label: "Bitcoin",
    color: "#f7931a",
    angle: -90 + 51.4,
    icon: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M23.189 13.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 5l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/></svg>`,
  },
  {
    id: "tesla",
    label: "Tesla",
    color: "#cc2222",
    angle: -90 + 51.4 * 2,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z"/></svg>`,
  },
  {
    id: "nvidia",
    label: "NVIDIA",
    color: "#76b900",
    angle: -90 + 51.4 * 3,
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"/></svg>`,
  },
  {
    id: "eth",
    label: "Ethereum",
    color: "#627eea",
    angle: -90 + 51.4 * 4,
    icon: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.498 3v8.87l7.497 3.35z" opacity=".65"/><path d="M16.498 3L9 15.22l7.498-3.35z"/><path d="M16.498 20.968v6.027L24 16.616z" opacity=".65"/><path d="M16.498 26.995v-6.028L9 16.616z"/><path d="M16.498 19.573l7.497-4.353-7.497-3.348z" opacity=".4"/><path d="M9 15.22l7.498 4.353v-7.701z" opacity=".65"/></svg>`,
  },
  {
    id: "gold",
    label: "Gold",
    color: "#f0c030",
    angle: -90 + 51.4 * 5,
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><rect x="3.5" y="8" width="17" height="11" rx="1.6"/><path d="M9 8V6.6A1.6 1.6 0 0 1 10.6 5h2.8A1.6 1.6 0 0 1 15 6.6V8"/><line x1="3.5" y1="12.6" x2="20.5" y2="12.6"/><line x1="12" y1="12.6" x2="12" y2="14.4"/></svg>`,
  },
  {
    id: "avax",
    label: "AVAX",
    color: "#e84142",
    angle: -90 + 51.4 * 6,
    icon: `<svg viewBox="0 0 32 32" fill="currentColor"><path d="M11.518 22.75H8.49c-.636 0-.95 0-1.142-.123A.77.77 0 017 22.025c-.012-.226.145-.503.46-1.055l7.472-13.193c.318-.56.48-.84.682-.944a.77.77 0 01.698 0c.203.104.364.384.682.944l1.536 2.686.008.014c.343.6.517.906.593 1.226a2.26 2.26 0 010 1.066c-.076.323-.249.63-.597 1.24l-3.926 6.95-.01.017c-.346.606-.52.913-.764 1.145a2.284 2.284 0 01-.93.54c-.319.089-.675.089-1.387.089zm7.643 0h4.336c.64 0 .962 0 1.154-.126a.768.768 0 00.348-.607c.011-.219-.142-.484-.443-1.005l-.032-.054-2.172-3.722-.025-.042c-.305-.517-.46-.778-.657-.879a.762.762 0 00-.693 0c-.2.104-.36.377-.678.925l-2.165 3.722-.007.013c-.317.548-.476.821-.464 1.046a.777.777 0 00.348.606c.188.123.51.123 1.15.123z"/></svg>`,
  },
];

const hexToRgb = (hex: string): [number, number, number] => [
  parseInt(hex.slice(1, 3), 16),
  parseInt(hex.slice(3, 5), 16),
  parseInt(hex.slice(5, 7), 16),
];

const WhatWeDoSection = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const hubNodesRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // BG hex canvas
  useEffect(() => {
    const c = bgCanvasRef.current;
    if (!c) return;
    const x = c.getContext("2d")!;
    const R = 40;
    let W = 0,
      H = 0,
      cells: Array<{ cx: number; cy: number; ph: number; sp: number; ba: number; ac: boolean }> = [],
      t = 0;
    let raf = 0;
    const build = () => {
      cells = [];
      const cw = R * 2,
        ch = Math.sqrt(3) * R;
      for (let col = -1; col < Math.ceil(W / (cw * 0.75)) + 2; col++)
        for (let row = -1; row < Math.ceil(H / ch) + 2; row++)
          cells.push({
            cx: col * cw * 0.75,
            cy: row * ch + (col % 2 ? ch / 2 : 0),
            ph: Math.random() * Math.PI * 2,
            sp: 0.002 + Math.random() * 0.004,
            ba: 0.008 + Math.random() * 0.022,
            ac: Math.random() < 0.08,
          });
    };
    const resize = () => {
      const parent = c.parentElement;
      if (!parent) return;
      W = c.width = parent.offsetWidth;
      H = c.height = parent.offsetHeight;
      build();
    };
    const hex = (cx: number, cy: number) => {
      x.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i
          ? x.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a))
          : x.moveTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      }
      x.closePath();
    };
    const draw = () => {
      x.clearRect(0, 0, W, H);
      cells.forEach((h) => {
        const w = Math.sin(t * h.sp + h.ph),
          a = h.ba + 0.015 * w;
        hex(h.cx, h.cy);
        x.strokeStyle = h.ac
          ? `rgba(124,58,237,${(a * 1.6).toFixed(3)})`
          : `rgba(55,45,95,${a.toFixed(3)})`;
        x.lineWidth = 0.5;
        x.stroke();
      });
      t++;
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    resize();
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Hero hub + orbit
  useEffect(() => {
    const wrap = hubNodesRef.current;
    const canvas = heroCanvasRef.current;
    const hubWrap = wrapRef.current;
    if (!wrap || !canvas || !hubWrap) return;

    // build nodes
    wrap.innerHTML = "";
    const core = document.createElement("div");
    core.className = "bd-core";
    core.innerHTML = `
      <div class="bd-core-outer"></div>
      <div class="bd-core-outer2"></div>
      <div class="bd-core-title">BALCORE</div>
      <div class="bd-core-sub">FLOW YIELD</div>
    `;
    wrap.appendChild(core);

    TOKENS.forEach((tok) => {
      const el = document.createElement("div");
      el.className = "bd-tok";
      el.id = "bd-tok-" + tok.id;
      el.style.setProperty("--tc", tok.color);
      el.innerHTML = `
        <div class="bd-tok-ring">
          <div class="bd-tok-outer"></div>
          <div class="bd-tok-inner"></div>
          <div class="bd-tok-icon">${tok.icon}</div>
        </div>
        <span class="bd-tok-label" style="color:${tok.color};text-shadow:0 0 10px ${tok.color}99">${tok.label}</span>
      `;
      wrap.appendChild(el);
    });

    const positionNodes = () => {
      const W = hubWrap.offsetWidth,
        H = hubWrap.offsetHeight;
      const cx = W / 2,
        cy = H / 2;
      const R = Math.min(W, H) * 0.4;
      TOKENS.forEach((tok) => {
        const el = document.getElementById("bd-tok-" + tok.id);
        if (!el) return;
        const a = (tok.angle * Math.PI) / 180;
        el.style.left = cx + R * Math.cos(a) + "px";
        el.style.top = cy + R * Math.sin(a) + "px";
      });
    };
    positionNodes();
    requestAnimationFrame(positionNodes);
    const ro = new ResizeObserver(positionNodes);
    ro.observe(hubWrap);
    window.addEventListener("resize", positionNodes);

    const ctx = canvas.getContext("2d")!;
    const ORBIT_DOTS = TOKENS.map((tok, i) => ({
      tok,
      phase: i / TOKENS.length,
      speed: 0.0007 + (i % 2 === 0 ? 0.0002 : 0),
      size: 3.5,
    }));
    const LINE_PARTICLES = TOKENS.map((tok, i) => ({
      tok,
      phase: i / TOKENS.length,
      speed: 0.0035 + Math.random() * 0.002,
    }));
    const SPARKS = Array.from({ length: 32 }, (_, i) => ({
      a: (i / 32) * Math.PI * 2,
      rFrac: 0.15 + Math.random() * 0.45,
      driftSpeed: (Math.random() - 0.5) * 0.003,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.03 + Math.random() * 0.04,
      size: 1.2 + Math.random() * 2.2,
      color: TOKENS[i % TOKENS.length].color,
      baseOpacity: 0.25 + Math.random() * 0.5,
    }));

    let raf = 0;
    const drawFrame = () => {
      const W = hubWrap.offsetWidth || 500,
        H = hubWrap.offsetHeight || 500;
      canvas.width = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(devicePixelRatio, devicePixelRatio);

      const cx = W / 2,
        cy = H / 2;
      const R = Math.min(W, H) * 0.4;
      const rc = Math.min(W, H) * 0.105;
      const tr = Math.min(W, H) * 0.065;

      ctx.clearRect(0, 0, W, H);
      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3);
      bgG.addColorStop(0, "rgba(90,30,200,.10)");
      bgG.addColorStop(0.6, "rgba(50,15,110,.05)");
      bgG.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, W, H);

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.setLineDash([5, 11]);
      ctx.strokeStyle = "rgba(138,92,246,.22)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      TOKENS.forEach((tok) => {
        const a = (tok.angle * Math.PI) / 180;
        const sx = cx + (rc + 2) * Math.cos(a),
          sy = cy + (rc + 2) * Math.sin(a);
        const ex = cx + (R - tr - 4) * Math.cos(a),
          ey = cy + (R - tr - 4) * Math.sin(a);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.setLineDash([4, 10]);
        ctx.strokeStyle = "rgba(120,80,255,.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      LINE_PARTICLES.forEach((lp) => {
        lp.phase = (lp.phase + lp.speed) % 1;
        const a = (lp.tok.angle * Math.PI) / 180;
        const startX = cx + (R - tr) * Math.cos(a),
          startY = cy + (R - tr) * Math.sin(a);
        const endX = cx + rc * Math.cos(a),
          endY = cy + rc * Math.sin(a);
        const p = lp.phase;
        const px = startX + (endX - startX) * p,
          py = startY + (endY - startY) * p;
        const alpha = Math.sin(p * Math.PI) * 0.92;
        const [r, g, b] = hexToRgb(lp.tok.color);
        const gr = ctx.createRadialGradient(px, py, 0, px, py, 6);
        gr.addColorStop(0, `rgba(${r},${g},${b},${alpha.toFixed(2)})`);
        gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      ORBIT_DOTS.forEach((od) => {
        od.phase = (od.phase + od.speed) % 1;
        const a = od.phase * Math.PI * 2;
        const px = cx + R * Math.cos(a),
          py = cy + R * Math.sin(a);
        const [r, g, b] = hexToRgb(od.tok.color);
        const gr = ctx.createRadialGradient(px, py, 0, px, py, od.size * 3);
        gr.addColorStop(0, `rgba(${r},${g},${b},.9)`);
        gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(px, py, od.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px, py, od.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      });

      SPARKS.forEach((sp) => {
        sp.a += sp.driftSpeed;
        sp.phase += sp.pulseSpeed;
        const rr = R * sp.rFrac;
        const px = cx + rr * Math.cos(sp.a),
          py = cy + rr * Math.sin(sp.a);
        const twinkle = (Math.sin(sp.phase) + 1) / 2;
        const opacity = sp.baseOpacity * twinkle;
        const [r, g, b] = hexToRgb(sp.color);
        ctx.beginPath();
        ctx.arc(px, py, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity.toFixed(2)})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(drawFrame);
    };
    drawFrame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", positionNodes);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        .bd-root{
          position:relative;overflow:hidden;background:#06060f;color:#fff;
          font-family:'Barlow',system-ui,-apple-system,sans-serif;
          --p3:#8b5cf6;--p-bright:#a78bfa;--muted:#8c8ca0;
        }
        .bd-bg-canvas{position:absolute;inset:0;z-index:0;pointer-events:none;opacity:.6}
        .bd-hero{
          position:relative;z-index:1;width:100%;
          display:flex;align-items:center;
          padding:clamp(56px,7vh,96px) clamp(24px,5vw,96px);
        }
        .bd-inner{
          max-width:1200px;margin:0 auto;width:100%;
          display:grid;grid-template-columns:1fr 1fr;gap:clamp(30px,5vw,80px);align-items:center;
        }
        .bd-label{
          display:flex;align-items:center;gap:14px;
          font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:600;
          letter-spacing:.28em;text-transform:uppercase;color:var(--p-bright);
          margin-bottom:clamp(18px,2.6vh,30px);
        }
        .bd-label::before{content:'';width:32px;height:1px;background:var(--p3);box-shadow:0 0 8px rgba(139,92,246,.7);}
        .bd-title{
          font-family:'Barlow Condensed',sans-serif;font-weight:900;line-height:.9;letter-spacing:.005em;text-transform:uppercase;
          font-size:clamp(1.7rem,4.4vw,4rem);
        }
        .bd-title .lead{color:#fff;display:block;}
        .bd-title span.grad{
          display:block;
          background:linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%);
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--p3);
        }
        .bd-desc{margin-top:clamp(20px,3vh,32px);font-size:clamp(.9rem,1.02vw,1rem);line-height:1.7;color:var(--muted);max-width:480px;}
        .bd-desc p+p{margin-top:14px}
        .bd-cta{display:flex;align-items:center;gap:clamp(10px,1.6vw,24px);flex-wrap:nowrap;margin-top:clamp(22px,3.2vh,34px);}
        .bd-link{
          display:inline-flex;align-items:center;gap:6px;
          font-family:'IBM Plex Mono',monospace;font-size:clamp(9px,1vw,12px);font-weight:600;letter-spacing:.12em;text-transform:uppercase;
          text-decoration:none;transition:gap .2s;cursor:pointer;white-space:nowrap;
        }
        .bd-link svg{transition:transform .2s;width:12px;height:12px;flex-shrink:0}
        .bd-link:hover{gap:10px}
        .bd-link:hover svg{transform:translateX(4px)}
        .bd-visual{position:relative;}
        .bd-hub-wrap{
          position:relative;width:100%;aspect-ratio:1/1;
          max-width:min(46vw,84vh,560px);margin:0 auto;
        }
        .bd-hero-canvas{position:absolute;inset:0;width:100%!important;height:100%!important;}
        .bd-hub-nodes{position:absolute;inset:0;}
        .bd-tok{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:6px;cursor:default;}
        .bd-tok-ring{position:relative;width:clamp(52px,7vw,72px);height:clamp(52px,7vw,72px);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:transform .3s;}
        .bd-tok:hover .bd-tok-ring{transform:scale(1.1);}
        .bd-tok-outer{position:absolute;inset:-5px;border-radius:50%;border:1.5px solid var(--tc,#fff);opacity:.3;}
        .bd-tok-inner{position:absolute;inset:0;border-radius:50%;border:2px solid var(--tc,#fff);background:rgba(6,6,18,.93);box-shadow:0 0 16px var(--tc,#fff), inset 0 0 10px rgba(0,0,0,.7);}
        .bd-tok-icon{position:relative;z-index:2;width:56%;height:56%;display:flex;align-items:center;justify-content:center;color:var(--tc,#fff);}
        .bd-tok-icon svg{width:100%;height:100%;display:block;}
        .bd-tok-label{font-family:'IBM Plex Mono',monospace;font-size:clamp(9px,.82vw,11px);font-weight:500;letter-spacing:.08em;white-space:nowrap;}
        .bd-core{
          position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
          width:26%;aspect-ratio:1/1;border-radius:50%;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          background:radial-gradient(circle at 40% 35%,rgba(120,60,240,.5) 0%,rgba(15,6,50,.97) 70%);
          border:2px solid rgba(138,92,246,.9);
          box-shadow:0 0 40px rgba(138,92,246,.5), 0 0 80px rgba(138,92,246,.2), inset 0 0 20px rgba(100,40,200,.3);
          z-index:10;
        }
        .bd-core-outer{position:absolute;inset:-8px;border-radius:50%;border:1px solid rgba(138,92,246,.35);animation:bdCoreRing 4s linear infinite;}
        .bd-core-outer2{position:absolute;inset:-16px;border-radius:50%;border:1px dashed rgba(138,92,246,.18);animation:bdCoreRing 8s linear infinite reverse;}
        @keyframes bdCoreRing{to{transform:rotate(360deg);}}
        .bd-core-title{font-family:'Barlow Condensed',sans-serif;font-weight:800;font-size:clamp(13px,1.9vw,17px);letter-spacing:.12em;color:#fff;}
        .bd-core-sub{font-size:clamp(8px,.9vw,10px);font-weight:500;letter-spacing:.15em;color:rgba(175,130,255,.8);text-transform:uppercase;margin-top:3px;}
        @media(prefers-reduced-motion:reduce){
          .bd-bg-canvas{display:none}
          .bd-core-outer,.bd-core-outer2{animation:none}
        }
        @media (max-width:820px){
          .bd-hero{padding:64px 16px 56px;}
          .bd-inner{grid-template-columns:minmax(0,1fr);gap:44px;}
          .bd-copy{min-width:0;}
          .bd-title{font-size:clamp(1.55rem,7.5vw,2.4rem);}
          .bd-visual{display:flex;justify-content:center;align-items:center;width:100%;min-width:0;max-width:100%;}
          .bd-hub-wrap{width:100%;max-width:min(94vw,440px);margin:0 auto;}
          .bd-tok-ring{width:clamp(56px,15vw,78px);height:clamp(56px,15vw,78px);}
          .bd-tok-label{font-size:clamp(9px,2.6vw,11px);}
          .bd-hero-canvas{max-width:100%;}
          .bd-cta{gap:clamp(8px,2.2vw,14px);}
          .bd-link{font-size:clamp(8px,2.2vw,11px);letter-spacing:.08em;}
          .bd-link svg{width:10px;height:10px;}
        }
      `}</style>

      <section id="what-we-do" className="bd-root">
        <canvas ref={bgCanvasRef} className="bd-bg-canvas"></canvas>
        <div className="bd-hero">
          <div className="bd-inner">
            <div className="bd-copy">
              <div className="bd-label">What We Do</div>
              <h1 className="bd-title">
                <span className="lead">Democratizing</span>
                <span className="grad">Market</span>
                <span className="grad">Making.</span>
              </h1>
              <div className="bd-desc">
                <p>
                  Balcore puts your assets in the market maker's seat. Every time a
                  trader swaps against your liquidity, they pay a small fee — and
                  that fee is yours.
                </p>
                <p>
                  Behind the scenes, a smart engine does the hard part — built on
                  years of market-making research. It keeps your money right where
                  the trading happens, adjusts your position around the clock as
                  prices move, and works to protect your principal from the swings.
                  No charts to watch, no trades to time.
                </p>
                <p>
                  The kind of market-making once reserved for big institutions —
                  now open to everyone. Earn the fees, keep your principal, keep
                  your keys.
                </p>
              </div>
              <div className="bd-cta">
                <a href="#visual-story" className="bd-link" style={{ color: "var(--p-bright)" }}>
                  How it works
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="/docs" className="bd-link" style={{ color: "var(--muted)" }}>
                  Read the protocol docs
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a href="/business-perspective" className="bd-link" style={{ color: "var(--muted)" }}>
                  Business perspective
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="bd-visual">
              <div ref={wrapRef} className="bd-hub-wrap">
                <canvas ref={heroCanvasRef} className="bd-hero-canvas"></canvas>
                <div ref={hubNodesRef} className="bd-hub-nodes"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatWeDoSection;
