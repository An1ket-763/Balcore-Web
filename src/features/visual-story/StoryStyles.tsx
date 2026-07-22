const StoryStyles = () => (
  <style>{`
    .mm-howitworks, .mm-howitworks *, .mm-howitworks *::before, .mm-howitworks *::after {
      box-sizing: border-box;
    }
    .mm-howitworks {
      --bg:#07070f;
      --bg-2:#0b0b16;
      --line:rgba(140,120,220,.14);
      --p:#8b5cf6;
      --p-bright:#a78bfa;
      --ink:#f4f2ff;
      --muted:#8c8ca0;
      --muted-2:#6b6b80;

      background:
        radial-gradient(1100px 620px at 50% -6%, rgba(88,40,180,.20), transparent 60%),
        radial-gradient(900px 700px at 82% 40%, rgba(70,40,150,.10), transparent 55%),
        var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      position: relative;
    }

    .mm-wrap{max-width:1080px;margin:0 auto;padding:0 clamp(20px,4vw,40px)}

    .mm-eyebrow{
      display:inline-flex;align-items:center;gap:9px;
      font-weight:600;font-size:11px;
      letter-spacing:.34em;text-transform:uppercase;color:var(--p-bright);
      padding:8px 18px;border:1px solid rgba(139,92,246,.42);border-radius:999px;
      background:rgba(139,92,246,.07);
    }
    .mm-eyebrow i{width:5px;height:5px;border-radius:50%;background:var(--p-bright);box-shadow:0 0 9px var(--p-bright)}

    /* ---------------- HERO ---------------- */
    .mm-hero{max-width:1220px;padding:clamp(12px,2vh,20px) 0 clamp(10px,1.6vh,16px);text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}
    .mm-hero h1{
      font-weight:800;text-transform:uppercase;
      line-height:.98;letter-spacing:.01em;margin:12px 0 0;white-space:nowrap;
      font-size:clamp(1.3rem,3.4vw,2.5rem);
    }
    .mm-hero h1 .mm-g{
      background:linear-gradient(180deg,#a78bfa 0%,#7c3aed 100%);
      -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--p);
    }
    .mm-hero p{
      max-width:800px;margin:10px auto 0;color:var(--muted);white-space:nowrap;
      font-size:clamp(.88rem,1.05vw,1rem);line-height:1.4;
    }

    /* ---------------- VIDEO PLAYER ---------------- */
    .mm-stage{position:relative;margin:clamp(12px,2vh,20px) auto 0;width:100%;
      background:radial-gradient(56% 46% at 50% 43%, rgba(124,58,237,.26), transparent 72%)}
    .mm-player{
      position:relative;z-index:1;margin-inline:auto;
      border-radius:16px;overflow:hidden;
      border:1px solid rgba(150,120,240,.28);
      background:#000;
      box-shadow:0 30px 80px -30px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.03) inset;
      aspect-ratio:16/9;
    }
    @media (min-width:821px){
      .mm-hero{min-height:calc(100vh - 67px)}
      .mm-player{width:min(100%, calc((100vh - 258px) * 16 / 9))}
    }
    .mm-player video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;background:#000}

    /* corner brackets */
    .mm-bracket{position:absolute;width:26px;height:26px;z-index:3;pointer-events:none;opacity:.65}
    .mm-bracket::before,.mm-bracket::after{content:"";position:absolute;background:var(--p-bright);box-shadow:0 0 8px rgba(167,139,250,.6)}
    .mm-bracket::before{width:100%;height:1.5px}
    .mm-bracket::after{width:1.5px;height:100%}
    .mm-bracket.mm-tl{top:12px;left:12px}
    .mm-bracket.mm-tr{top:12px;right:12px}.mm-bracket.mm-tr::before{right:0}.mm-bracket.mm-tr::after{right:0}
    .mm-bracket.mm-bl{bottom:12px;left:12px}.mm-bracket.mm-bl::before{bottom:0}
    .mm-bracket.mm-br{bottom:12px;right:12px}.mm-bracket.mm-br::before{bottom:0;right:0}.mm-bracket.mm-br::after{right:0}

    /* big play overlay */
    .mm-big-play{
      position:absolute;inset:0;z-index:4;margin:auto;
      display:flex;align-items:center;justify-content:center;
      width:100%;height:100%;border:0;cursor:pointer;
      background:linear-gradient(180deg,rgba(8,6,20,.15),rgba(8,6,20,.55));
      transition:opacity .35s ease;
    }
    .mm-big-play .mm-disc{
      width:clamp(64px,7vw,88px);height:clamp(64px,7vw,88px);border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      background:radial-gradient(circle at 42% 38%,rgba(160,110,255,.55),rgba(20,10,55,.92));
      border:1.5px solid rgba(167,139,250,.9);
      box-shadow:0 0 40px rgba(124,58,237,.55);
      transition:transform .2s;
    }
    .mm-big-play .mm-disc svg{width:34%;height:34%;margin-left:8%;fill:#fff}
    .mm-big-play:hover .mm-disc{transform:scale(1.07)}
    .mm-big-play .mm-ripple{position:absolute;width:clamp(64px,7vw,88px);height:clamp(64px,7vw,88px);border-radius:50%;border:1px solid rgba(167,139,250,.5);animation:mm-ripple 2.6s ease-out infinite}
    @keyframes mm-ripple{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.1);opacity:0}}
    .mm-player.playing .mm-big-play{opacity:0;pointer-events:none}

    /* control bar */
    .mm-controls{
      position:absolute;left:0;right:0;bottom:0;z-index:5;
      display:flex;align-items:center;gap:14px;
      padding:14px 16px 13px;
      background:linear-gradient(0deg,rgba(6,5,16,.9),rgba(6,5,16,0));
      opacity:0;transition:opacity .25s ease;
    }
    .mm-player.playing:hover .mm-controls,
    .mm-player.playing .mm-controls.show,
    .mm-player:focus-within .mm-controls{opacity:1}
    .mm-ctrl{background:none;border:0;color:#e9e6fb;cursor:pointer;display:flex;align-items:center;padding:2px;border-radius:6px}
    .mm-ctrl svg{width:20px;height:20px;fill:currentColor}
    .mm-ctrl:hover{color:#fff}
    .mm-ctrl:focus-visible,.mm-scrub:focus-visible{outline:2px solid var(--p-bright);outline-offset:2px}
    .mm-scrub{
      position:relative;flex:1;height:5px;border-radius:4px;cursor:pointer;
      background:rgba(255,255,255,.16);
    }
    .mm-scrub-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:4px;background:linear-gradient(90deg,#8b5cf6,#a78bfa)}
    .mm-scrub-fill::after{content:"";position:absolute;right:-6px;top:50%;transform:translateY(-50%);width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 0 8px rgba(167,139,250,.9);opacity:0;transition:opacity .15s}
    .mm-scrub:hover .mm-scrub-fill::after{opacity:1}
    .mm-time{font-size:12px;color:#c9c6dd;letter-spacing:.02em;white-space:nowrap}

    .mm-meta{
      display:flex;align-items:center;justify-content:center;gap:16px;flex-wrap:wrap;
      margin-top:8px;
      letter-spacing:.1em;text-transform:uppercase;color:var(--muted-2);font-size:11px;
    }
    .mm-meta .mm-dot{width:4px;height:4px;border-radius:50%;background:var(--muted-2)}

    /* ---------------- STEPS ---------------- */
    .mm-steps-sec{padding:clamp(56px,9vh,96px) 0 clamp(20px,4vh,36px)}
    .mm-steps-head{text-align:center;margin-bottom:clamp(34px,5vh,52px)}
    .mm-steps-head h2{font-weight:800;text-transform:uppercase;font-size:clamp(1.5rem,3.4vw,2.3rem);letter-spacing:.01em}
    .mm-steps-head p{color:var(--muted);margin-top:10px;font-size:1.02rem}
    .mm-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
    .mm-step{
      position:relative;padding:26px 24px 28px;border-radius:14px;
      background:linear-gradient(180deg,var(--bg-2),#08080f);
      border:1px solid var(--line);
      transition:transform .22s ease, border-color .22s ease;
    }
    .mm-step:hover{transform:translateY(-3px);border-color:rgba(139,92,246,.4)}
    .mm-step .mm-num{font-size:13px;font-weight:600;color:var(--p-bright);letter-spacing:.18em}
    .mm-step .mm-ico{margin:16px 0 14px;width:44px;height:44px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.32)}
    .mm-step .mm-ico svg{width:22px;height:22px;fill:none;stroke:var(--p-bright);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
    .mm-step h3{font-weight:700;font-size:1.5rem;letter-spacing:.01em;text-transform:uppercase}
    .mm-step p{color:var(--muted);font-size:.97rem;line-height:1.6;margin-top:10px}

    .mm-closer{
      text-align:center;padding:clamp(40px,7vh,72px) 0 clamp(56px,9vh,96px);
    }
    .mm-closer .mm-line{
      display:inline-block;font-weight:800;
      text-transform:uppercase;letter-spacing:.02em;font-size:clamp(1.4rem,3.4vw,2.2rem);
    }
    .mm-closer .mm-line .mm-g{background:linear-gradient(180deg,#a78bfa,#7c3aed);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:var(--p)}
    .mm-closer .mm-cta{
      display:inline-flex;align-items:center;gap:9px;margin-top:26px;
      background:linear-gradient(180deg,#9d6bff,#7c3aed);color:#fff;font-weight:700;
      text-decoration:none;padding:14px 26px;border-radius:12px;font-size:1rem;
      box-shadow:0 10px 30px -8px rgba(124,58,237,.7);transition:transform .18s}
    .mm-closer .mm-cta:hover{transform:translateY(-2px)}

    /* ---------------- MOTION / RESPONSIVE ---------------- */
    .mm-reveal{opacity:0;transform:translateY(16px);transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1)}
    .mm-reveal.mm-in{opacity:1;transform:none}

    @media(max-width:820px){
      .mm-steps{grid-template-columns:1fr}
      .mm-hero h1{white-space:normal;font-size:clamp(1.6rem,7vw,2.4rem)}
      .mm-hero p{white-space:normal}
      .mm-hero{min-height:auto}
    }
    @media(prefers-reduced-motion:reduce){
      .mm-reveal{opacity:1;transform:none;transition:none}
      .mm-big-play .mm-ripple{animation:none;display:none}
    }
  `}</style>
);

export default StoryStyles;
