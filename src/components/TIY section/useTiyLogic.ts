// Verbatim port of the original try-it-yourself.html script into a useEffect-friendly init.
// All DOM lookups use getElementById against the document — IDs are unique to the TIY section.
// Returns a cleanup function.
export function initTiy(root: HTMLElement): () => void {
  const capEl = document.getElementById("capital") as HTMLInputElement | null;
  const weekEl = document.getElementById("week") as HTMLInputElement | null;
  if (!capEl || !weekEl) return () => {};

  const USER_CAP_APY = 0.3;
  const PROTOCOL_FEE = 0.05;
  const WEEKS = 52;
  const userCapWeekly = Math.pow(1 + USER_CAP_APY, 1 / WEEKS) - 1;

  const ASSETS: Record<string, { pair: string; vol: number; ilMul: number; desc: string }> = {
    btc: { pair: "BTC / USD", vol: 1.0, ilMul: 1.0, desc: "Steady major. Predictable base yield, moderate IL." },
    eth: { pair: "ETH / USD", vol: 1.1, ilMul: 1.05, desc: "Liquid major. Reliable volume, moderate swings." },
    avax: { pair: "AVAX / USD", vol: 1.55, ilMul: 1.3, desc: "Volatile & mean-reverting. Asymmetric excess on big weeks." },
    sol: { pair: "SOL / USD", vol: 1.5, ilMul: 1.28, desc: "High-beta major. Strong fees, higher IL exposure." },
    nvda: { pair: "NVIDIA / USD", vol: 0.95, ilMul: 0.85, desc: "Tokenized equity. Active but lower IL than crypto." },
    tsla: { pair: "Tesla / USD", vol: 1.05, ilMul: 0.9, desc: "Tokenized equity. Volatile name, equity-style behaviour." },
    gold: { pair: "Gold / USD", vol: 0.55, ilMul: 0.45, desc: "Low-volatility store of value. Thin fees, minimal IL." },
    link: { pair: "LINK / USD", vol: 1.35, ilMul: 1.2, desc: "Mid-cap. Healthy fee capture, elevated IL." },
  };
  let asset = "btc";

  function weekProfile(w: number, a: typeof ASSETS[string]) {
    const t = w / 100;
    const grossBase = 0.0016 + t * 0.023;
    const ilBase = t * 0.0075;
    return { gross: grossBase * a.vol, ilGross: ilBase * a.vol * a.ilMul };
  }

  function label(w: number): [string, string, string] {
    if (w < 18) return ["Quiet", "#9286ad", "Quiet week"];
    if (w < 40) return ["Slow", "#a78bfa", "Slow / choppy week"];
    if (w < 62) return ["Typical", "#e8c479", "Typical trading week"];
    if (w < 82) return ["Active", "#5fd6a0", "Active week"];
    return ["Volatile", "#5fd6a0", "High-volatility week"];
  }

  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
  function fmtCap(n: number) {
    if (n >= 1000000) return "$" + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 2).replace(/\.00$/, "") + "M";
    return "$" + Math.round(n / 1000) + "K";
  }

  const animState: Record<string, number> = {};
  function animateTo(id: string, target: number, prefix?: string) {
    prefix = prefix || "";
    const el = document.getElementById(id);
    if (!el) return;
    const start = animState[id] !== undefined ? animState[id] : target;
    const dur = 420,
      t0 = performance.now();
    function tick(now: number) {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      const val = start + (target - start) * e;
      el!.textContent = prefix + fmt(val);
      if (p < 1) requestAnimationFrame(tick);
      else animState[id] = target;
    }
    animState[id] = start;
    requestAnimationFrame(tick);
  }

  function update(animated: boolean) {
    const cap = +capEl!.value;
    const w = +weekEl!.value;
    capEl!.style.setProperty("--pct", ((cap - 25000) / (5000000 - 25000)) * 100 + "%");
    weekEl!.style.setProperty("--pct", w + "%");
    document.getElementById("capVal")!.textContent = fmtCap(cap);

    const [short, col, full] = label(w);
    document.getElementById("weekVal")!.textContent = short;
    const tag = document.getElementById("weekTag")!;
    tag.textContent = full;
    tag.style.color = col;
    tag.style.borderColor = col + "55";

    const a = ASSETS[asset];
    const p = weekProfile(w, a);
    const gross = cap * p.gross;
    const ilCovered = cap * p.ilGross;
    const afterIL = Math.max(0, gross - ilCovered);
    const fee = afterIL * PROTOCOL_FEE;
    const distributable = afterIL - fee;
    const userMax = cap * userCapWeekly;
    const userPay = Math.min(distributable, userMax);
    const excess = Math.max(0, distributable - userPay);
    const reserve = excess * 0.7;
    const protoExcess = excess * 0.3;
    const protoTotal = fee + protoExcess;
    const userApy = (Math.pow(1 + userPay / cap, WEEKS) - 1) * 100;
    const capped = userPay >= userMax - 0.5;

    document.getElementById("apy")!.textContent = Math.round(userApy) + "% APY";
    document.getElementById("capNote")!.textContent = capped ? "at the 30% user cap" : "within the 30% user cap";

    if (animated) {
      animateTo("weeklyProfit", userPay, "+$");
      animateTo("gross", gross, "+$");
      animateTo("ilcov", ilCovered, "−$");
      animateTo("fee", fee, "−$");
      animateTo("userpay", userPay, "+$");
      animateTo("annual", userPay * WEEKS, "$");
      animateTo("excessTotal", excess, "$");
      animateTo("reserveAmt", reserve, "$");
      animateTo("protoAmt", protoExcess, "$");
      animateTo("protoTotal", protoTotal, "$");
    } else {
      document.getElementById("weeklyProfit")!.textContent = "+$" + fmt(userPay); animState.weeklyProfit = userPay;
      document.getElementById("gross")!.textContent = "+$" + fmt(gross); animState.gross = gross;
      document.getElementById("ilcov")!.textContent = "−$" + fmt(ilCovered); animState.ilcov = ilCovered;
      document.getElementById("fee")!.textContent = "−$" + fmt(fee); animState.fee = fee;
      document.getElementById("userpay")!.textContent = "+$" + fmt(userPay); animState.userpay = userPay;
      document.getElementById("annual")!.textContent = "$" + fmt(userPay * WEEKS); animState.annual = userPay * WEEKS;
      document.getElementById("excessTotal")!.textContent = "$" + fmt(excess); animState.excessTotal = excess;
      document.getElementById("reserveAmt")!.textContent = "$" + fmt(reserve); animState.reserveAmt = reserve;
      document.getElementById("protoAmt")!.textContent = "$" + fmt(protoExcess); animState.protoAmt = protoExcess;
      document.getElementById("protoTotal")!.textContent = "$" + fmt(protoTotal); animState.protoTotal = protoTotal;
    }

    const total = userPay + excess;
    const userW = total > 0 ? (userPay / total) * 100 : 100;
    document.getElementById("capUser")!.style.width = userW + "%";
    document.getElementById("capExcess")!.style.width = 100 - userW + "%";

    (window as any).__balcore = { cap, w, asset, gross, ilCovered, fee, userPay, reserve, protoTotal, pairLabel: a.pair };
  }

  const assetBtns = Array.from(root.querySelectorAll<HTMLButtonElement>(".asset-btn"));
  const assetHandlers: Array<() => void> = [];
  assetBtns.forEach((btn) => {
    const h = () => {
      assetBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      asset = btn.dataset.id || "btc";
      const a = ASSETS[asset];
      document.getElementById("pairVal")!.textContent = a.pair;
      const note = document.getElementById("assetNote")!;
      note.style.opacity = "0";
      setTimeout(() => {
        note.textContent = a.desc;
        note.style.opacity = "1";
      }, 150);
      update(true);
    };
    btn.addEventListener("click", h);
    assetHandlers.push(() => btn.removeEventListener("click", h));
  });

  const onCapInput = () => update(false);
  const onWeekInput = () => update(false);
  capEl.addEventListener("input", onCapInput);
  weekEl.addEventListener("input", onWeekInput);

  function attachTouchSlider(el: HTMLInputElement) {
    function setFromTouch(clientX: number) {
      const r = el.getBoundingClientRect();
      const min = +el.min,
        max = +el.max,
        step = +el.step || 1;
      let pct = (clientX - r.left) / r.width;
      pct = Math.max(0, Math.min(1, pct));
      let val = min + pct * (max - min);
      val = Math.round(val / step) * step;
      val = Math.max(min, Math.min(max, val));
      if (+el.value !== val) {
        el.value = String(val);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
    const ts = (e: TouchEvent) => { setFromTouch(e.touches[0].clientX); e.preventDefault(); };
    const tm = (e: TouchEvent) => { setFromTouch(e.touches[0].clientX); e.preventDefault(); };
    el.addEventListener("touchstart", ts, { passive: false });
    el.addEventListener("touchmove", tm, { passive: false });
    return () => {
      el.removeEventListener("touchstart", ts);
      el.removeEventListener("touchmove", tm);
    };
  }
  const detachCap = attachTouchSlider(capEl);
  const detachWk = attachTouchSlider(weekEl);

  update(false);
  ["weeklyProfit", "gross", "ilcov", "fee", "userpay", "annual", "excessTotal", "reserveAmt", "protoAmt", "protoTotal"].forEach((id) => (animState[id] = 0));
  const initTimer = window.setTimeout(() => update(true), 650);

  /* ============ UNDER THE HOOD ANIMATION ============ */
  const NS = "http://www.w3.org/2000/svg";
  const chart = document.getElementById("hoodChart") as unknown as SVGSVGElement;
  const W = 720,
    H = 320,
    padL = 10,
    padR = 10,
    padT = 34,
    padB = 20;
  const plotW = W - padL - padR,
    plotH = H - padT - padB;
  const FS = typeof window !== "undefined" && window.innerWidth < 620 ? 15 : 10;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 620;

  const yAt = (f: number) => padT + plotH * f;
  const LV = { R2: yAt(0.14), R1: yAt(0.31), P: yAt(0.5), S1: yAt(0.69), S2: yAt(0.86) };

  function buildPath() {
    const st = (window as any).__balcore || { w: 50, asset: "btc" };
    const upBias: Record<string, number> = { btc: 0.72, eth: 0.6, avax: 0.32, sol: 0.4, nvda: 0.62, tsla: 0.55, gold: 0.5, link: 0.45 };
    const volMap: Record<string, number> = { btc: 1, eth: 1.05, avax: 1.5, sol: 1.45, nvda: 0.9, tsla: 1.0, gold: 0.5, link: 1.3 };
    let seed = st.w * 7 + st.asset.charCodeAt(0) + (st.asset.charCodeAt(1) || 0);
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const wobble = (0.6 + (st.w / 100) * 1.0) * (volMap[st.asset] || 1);

    const dir = rnd() < (upBias[st.asset] ?? 0.5) ? -1 : 1;
    const broke = st.w / 100 > 0.18 ? true : rnd() > 0.5;

    const n = 140;
    const pts: { x: number; y: number }[] = [];
    const monEnd = Math.round(n * (1 / 7));
    const exhaustStart = Math.round(n * 0.86);

    const vwapY = LV.P;
    const vwapDev = (LV.S1 - LV.R1) / 2 + 14;
    const vUp = vwapY - vwapDev,
      vLo = vwapY + vwapDev;

    const ladderUp = [LV.P, LV.R1, LV.R2, vUp, vUp];
    const ladderDn = [LV.P, LV.S1, LV.S2, vLo, vLo];
    const ladder = dir === -1 ? ladderUp : ladderDn;

    const monHalf = 30 + (st.w / 100) * 14;
    const monReach = monHalf * 1.05;
    const monHi = LV.P - monReach;
    const monLo = LV.P + monReach;

    let y = LV.P;
    for (let i = 0; i < n; i++) {
      let target: number;
      if (i < monEnd) {
        const ph = i / Math.max(1, monEnd - 1);
        const swing = Math.sin(ph * Math.PI * 2.5) * (0.7 + 0.3 * Math.sin(ph * Math.PI * 5));
        target = LV.P - swing * monHalf * 1.1 + (rnd() - 0.5) * wobble * 3;
      } else if (!broke) {
        target = LV.P + Math.sin(i * 0.45) * monHalf * 0.9 + (rnd() - 0.5) * wobble * 5;
      } else if (i < exhaustStart) {
        const prog = (i - monEnd) / (exhaustStart - monEnd);
        const seg = Math.min(ladder.length - 1, Math.floor(prog * (ladder.length - 1) + 0.0001));
        const segT = (prog * (ladder.length - 1)) % 1;
        const a = ladder[seg],
          b = ladder[Math.min(ladder.length - 1, seg + 1)];
        target = a + (b - a) * segT + Math.sin(i * 0.7) * 7;
      } else {
        const prog = (i - exhaustStart) / (n - exhaustStart);
        const from = dir === -1 ? vUp : vLo;
        target = from + (vwapY - from) * prog + Math.sin(i * 0.6) * 9;
      }
      const ease = i < monEnd ? 0.42 : 0.18;
      const noise = i < monEnd ? wobble * 0.5 : wobble;
      y += (target - y) * ease + (rnd() - 0.5) * noise;
      y = Math.max(padT + 6, Math.min(padT + plotH - 6, y));
      pts.push({ x: padL + (i / (n - 1)) * plotW, y });
    }
    return { pts, dir, broke, monEnd, exhaustStart, monHi, monLo };
  }

  function el(tag: string, attrs: Record<string, any>) {
    const e = document.createElementNS(NS, tag) as SVGElement;
    for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    return e;
  }
  function clearChart() { while (chart.firstChild) chart.removeChild(chart.firstChild); }
  function setPhase(txt: string) { document.getElementById("phaseBadge")!.textContent = txt; }
  function lit(id: string, on?: boolean) { const e = document.getElementById(id); if (e) e.classList.toggle("lit", on !== false); }

  const steps = Array.from(document.querySelectorAll<HTMLElement>(".step-rail .step"));
  function setStep(n: number) {
    steps.forEach((s, idx) => {
      const i = idx + 1;
      s.classList.toggle("active", i === n);
      s.classList.toggle("done", i < n);
    });
  }
  function clearSteps() { steps.forEach((s) => s.classList.remove("active", "done")); }
  const captionEl = document.getElementById("hoodCaption")!;
  function setCaption(html: string) {
    captionEl.style.opacity = "0";
    setTimeout(() => { captionEl.innerHTML = html; captionEl.style.opacity = "1"; }, 180);
  }

  const deployBtn = document.getElementById("deployBtn") as HTMLButtonElement;
  const deployBtnTop = document.getElementById("deployBtnTop") as HTMLButtonElement | null;
  let running = false;

  function resetHood() {
    clearChart();
    clearSteps();
    ["fnDeposit", "fnPool", "fnFees", "faPool", "faFees", "flowSplit"].forEach((id) => lit(id, false));
    document.getElementById("fnFeesVal")!.textContent = "$0";
    document.getElementById("feeChipVal")!.textContent = "$0";
    document.getElementById("feeChip")!.classList.remove("show");
    ["snUser", "snReserve", "snProto"].forEach((id) => (document.getElementById(id)!.textContent = "$0"));
    setPhase("Ready to deploy");
  }

  const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  function scrollToChart() {
    try {
      const stepRail = document.querySelector(".step-rail") as HTMLElement | null;
      stepRail && stepRail.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {}
  }

  async function runDeploy() {
    if (running) return;
    running = true;
    scrollToChart();
    deployBtn.disabled = true;
    deployBtn.textContent = "Deploying…";
    if (deployBtnTop) { deployBtnTop.disabled = true; deployBtnTop.textContent = "Deploying…"; }
    resetHood();
    const st = (window as any).__balcore;
    const pair = (st.pairLabel || "BTC / USD").split(" ")[0];
    document.getElementById("fnDepositVal")!.textContent = fmtCap(st.cap);
    const built = buildPath();
    const pts = built.pts,
      dir = built.dir,
      broke = built.broke;
    const baseY = LV.P;

    const defs = el("defs", {}) as any;
    defs.innerHTML =
      '<linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#5fd6a0" stop-opacity="0.32"/>' +
      '<stop offset="100%" stop-color="#5fd6a0" stop-opacity="0"/>' +
      "</linearGradient>" +
      '<linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#a78bfa" stop-opacity="0.26"/>' +
      '<stop offset="50%" stop-color="#8b5cf6" stop-opacity="0.14"/>' +
      '<stop offset="100%" stop-color="#a78bfa" stop-opacity="0.26"/>' +
      "</linearGradient>" +
      '<linearGradient id="priceLine" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#4cc78f"/>' +
      '<stop offset="100%" stop-color="#7df0bd"/>' +
      "</linearGradient>" +
      '<filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">' +
      '<feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      "</filter>";
    chart.appendChild(defs);

    for (let dd = 1; dd < 7; dd++) {
      const gx = padL + (dd / 7) * plotW;
      const weekend = dd >= 5;
      chart.appendChild(el("line", { x1: gx, y1: padT, x2: gx, y2: padT + plotH, stroke: weekend ? "rgba(167,139,250,.08)" : "rgba(255,255,255,.045)", "stroke-width": 1 }));
    }
    const wkX = padL + (5 / 7) * plotW;
    chart.appendChild(el("rect", { x: wkX, y: padT, width: plotW * (2 / 7), height: plotH, fill: "rgba(139,92,246,.04)" }));

    setStep(1); setPhase("1 · Capital enters the pool");
    setCaption(`Your <b>${fmtCap(st.cap)}</b> is deposited into the ${pair} liquidity pool. The principal is recorded and <b>protected</b>  it's not spent, it's put to work.`);
    lit("fnDeposit"); lit("faPool");
    await sleep(250); lit("fnPool");
    chart.appendChild(el("line", { x1: padL, y1: baseY, x2: W - padR, y2: baseY, stroke: "rgba(255,255,255,.12)", "stroke-width": 1, "stroke-dasharray": "2 4" }));
    await sleep(300);

    setStep(2); setPhase("2 · Monday trades first");
    setCaption(`Watch how <b>${pair}</b> opens the week. <b>Monday's</b> session plays out first  its high and low will define the range everything else is built on.`);
    const floorY = padT + plotH;
    const trendArea = el("path", { fill: "url(#priceFill)", stroke: "none", opacity: 0.9 });
    chart.appendChild(trendArea);
    const trendPath = el("path", { fill: "none", stroke: "url(#priceLine)", "stroke-width": 2.8, "stroke-linejoin": "round", "stroke-linecap": "round", filter: "url(#softGlow)", opacity: 1 });
    chart.appendChild(trendPath);
    const trendDot = el("circle", { r: 5.5, fill: "#fff", stroke: "#5fd6a0", "stroke-width": 2.5, filter: "url(#softGlow)" });
    chart.appendChild(trendDot);

    const monEnd = built.monEnd;
    let dd = "";
    for (let i = 0; i <= monEnd; i++) {
      dd += (i === 0 ? "M" : "L") + pts[i].x.toFixed(1) + " " + pts[i].y.toFixed(1) + " ";
      trendPath.setAttribute("d", dd);
      trendArea.setAttribute("d", dd + "L" + pts[i].x.toFixed(1) + " " + floorY + " L" + padL + " " + floorY + " Z");
      trendDot.setAttribute("cx", String(pts[i].x)); trendDot.setAttribute("cy", String(pts[i].y));
      await sleep(30);
    }
    await sleep(350);

    let ghostD = dd;
    for (let i = monEnd + 1; i < pts.length; i++) { ghostD += "L" + pts[i].x.toFixed(1) + " " + pts[i].y.toFixed(1) + " "; }
    const ghost = el("path", { d: ghostD, fill: "none", stroke: "rgba(95,214,160,.22)", "stroke-width": 1.6, "stroke-dasharray": "3 5", "stroke-linejoin": "round" });
    chart.appendChild(ghost); fadeIn(ghost);

    setStep(3); setPhase("3 · Monday range set");
    setCaption(`Monday's done. Its high-to-low span is the <b>Monday range</b>  the reference the whole week is built on.`);
    const monHi = built.monHi, monLo = built.monLo;
    const monW = plotW * (1 / 7);
    const monBox = el("rect", { x: padL, y: monHi, width: monW, height: monLo - monHi, fill: "rgba(255,255,255,.10)", stroke: "rgba(255,255,255,.75)", "stroke-width": 1.4, rx: 3, opacity: 0 });
    chart.appendChild(monBox); fadeIn(monBox);
    const hiLine = el("line", { x1: padL, y1: monHi, x2: W - padR, y2: monHi, stroke: "rgba(255,255,255,.5)", "stroke-width": 1.2, "stroke-dasharray": "2 5", opacity: 0 });
    const loLine = el("line", { x1: padL, y1: monLo, x2: W - padR, y2: monLo, stroke: "rgba(255,255,255,.5)", "stroke-width": 1.2, "stroke-dasharray": "2 5", opacity: 0 });
    chart.appendChild(hiLine); chart.appendChild(loLine); fadeIn(hiLine); fadeIn(loLine);
    chart.appendChild(svgText(isMobile ? "MON RANGE" : "MONDAY RANGE", padL + 6, monHi - 8, "#ffffff"));
    const hiTag = svgText("HIGH", padL + monW + 8, monHi + 4, "rgba(255,255,255,.85)"); chart.appendChild(hiTag);
    const loTag = svgText("LOW", padL + monW + 8, monLo + 4, "rgba(255,255,255,.85)"); chart.appendChild(loTag);
    const brX = padL + monW;
    chart.appendChild(el("line", { x1: brX, y1: monHi, x2: brX, y2: monLo, stroke: "rgba(255,255,255,.4)", "stroke-width": 1 }));
    chart.appendChild(el("line", { x1: brX - 4, y1: monHi, x2: brX + 4, y2: monHi, stroke: "rgba(255,255,255,.6)", "stroke-width": 1 }));
    chart.appendChild(el("line", { x1: brX - 4, y1: monLo, x2: brX + 4, y2: monLo, stroke: "rgba(255,255,255,.6)", "stroke-width": 1 }));
    await sleep(650);

    setStep(4); setPhase("4 · Anchor VWAP bands & pivots");
    setCaption(`We track the <b>VWAP</b>  the volume-weighted average price  with an <b>upper and lower band</b> around it (one standard deviation). When price stretches all the way to the upper [...]
    const vwapY = LV.P;
    const vwapDev = (LV.S1 - LV.R1) / 2 + 14;
    const vUp = vwapY - vwapDev, vLo = vwapY + vwapDev;
    const vwapZone = el("rect", { x: padL, y: vUp, width: plotW, height: vLo - vUp, fill: "rgba(232,196,121,.05)", opacity: 0 });
    chart.appendChild(vwapZone); fadeIn(vwapZone);
    const vwap = el("line", { x1: padL, y1: vwapY, x2: W - padR, y2: vwapY, stroke: "#e8c479", "stroke-width": 2.2, opacity: 0, filter: "url(#softGlow)" });
    chart.appendChild(vwap); fadeIn(vwap);
    chart.appendChild(svgText("VWAP", isMobile ? W - padR - 58 : W - padR - 38, vwapY - 6, "#e8c479"));
    const vwapUp = el("line", { x1: padL, y1: vUp, x2: W - padR, y2: vUp, stroke: "rgba(232,196,121,.55)", "stroke-width": 1.3, "stroke-dasharray": "6 4", opacity: 0 });
    const vwapLo = el("line", { x1: padL, y1: vLo, x2: W - padR, y2: vLo, stroke: "rgba(232,196,121,.55)", "stroke-width": 1.3, "stroke-dasharray": "6 4", opacity: 0 });
    chart.appendChild(vwapUp); chart.appendChild(vwapLo); fadeIn(vwapUp); fadeIn(vwapLo);
    const ubX = isMobile ? W - padR - 92 : W - padR - 72;
    chart.appendChild(svgText(isMobile ? "UPPER" : "UPPER BAND", ubX, vUp - 6, "rgba(232,196,121,.85)"));
    chart.appendChild(svgText(isMobile ? "LOWER" : "LOWER BAND", ubX, vLo + 14, "rgba(232,196,121,.85)"));
    const pivots = [
      { y: LV.R2, t: "R3", c: "#ff9b8a", w: 1 },
      { y: LV.R1, t: "R2", c: "#ffb59a", w: 1 },
      { y: LV.P, t: "P", c: "#9cc4ff", w: 1.4 },
      { y: LV.S1, t: "S2", c: "#7fd0ff", w: 1 },
      { y: LV.S2, t: "S3", c: "#6fb8ff", w: 1 },
    ];
    for (const pv of pivots) {
      if (pv.t === "P") continue;
      const ln = el("line", { x1: padL, y1: pv.y, x2: W - padR, y2: pv.y, stroke: pv.c, "stroke-width": pv.w, "stroke-dasharray": "5 6", opacity: 0 });
      chart.appendChild(ln); fadeIn(ln);
      chart.appendChild(svgText(pv.t, padL + 6, pv.y - 5, pv.c));
      await sleep(120);
    }
    await sleep(450);

    setStep(5); setPhase("5 · Place the liquidity band");
    setCaption(`Instead of spreading capital thin, the strategy <b>concentrates</b> liquidity in a tight band around the current price  between the pivots. Concentrated liquidity earns far more i[...]
    let bandTop = LV.R1, bandBot = LV.S1;
    const band = el("rect", { x: padL, y: baseY, width: plotW, height: 1, fill: "url(#bandGrad)", stroke: "rgba(167,139,250,.65)", "stroke-width": 1.2, rx: 4, opacity: 0 });
    chart.insertBefore(band, chart.firstChild!.nextSibling); fadeIn(band);
    (band as any).animate(
      [{ y: baseY, height: "1px" }, { y: bandTop, height: bandBot - bandTop + "px" }],
      { duration: 600, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" }
    );
    band.setAttribute("y", String(bandTop)); band.setAttribute("height", String(bandBot - bandTop));
    const bandLabel = svgText(isMobile ? "LP BAND" : "LIQUIDITY BAND", isMobile ? padL + plotW - 70 : padL + plotW - 132, bandTop + 16, "rgba(199,180,255,.95)");
    chart.appendChild(bandLabel);
    await sleep(600);

    setStep(5); setPhase("5 · The week plays out · fees accrue");
    const upTxt = dir === -1;
    if (broke) {
      setCaption(`Now the week runs forward with everything in place. <b>${pair}</b> breaks ${upTxt ? "<b>upward</b>" : "<b>downward</b>"} out of Monday's range, and liquidity <b>rides the trend<[...]
    } else {
      setCaption(`The week runs forward. <b>${pair}</b> never clears Monday's range  it just chops sideways between the VWAP bands. The strategy keeps the band tight and quietly <b>collects fees [...]
    }
    document.getElementById("feeChip")!.classList.add("show");
    const area = trendArea, path = trendPath;
    const dot = trendDot;
    lit("faFees"); lit("fnFees");
    const grossTarget = st.gross;

    const halfBand = (LV.S1 - LV.R1) / 2;
    let breakoutShown = false, exhaustShown = false;
    function moveBand(centerY: number) {
      const top = Math.max(padT + 4, centerY - halfBand);
      const bot = Math.min(padT + plotH - 4, centerY + halfBand);
      band.setAttribute("y", String(top)); band.setAttribute("height", String(bot - top));
      bandTop = top; bandBot = bot;
      bandLabel.setAttribute("y", String(top + 16));
    }

    let d = dd;
    if (ghost) { (ghost as any).animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" }); setTimeout(() => ghost.remove(), 320); }
    for (let i = monEnd + 1; i < pts.length; i++) {
      d += "L" + pts[i].x.toFixed(1) + " " + pts[i].y.toFixed(1) + " ";
      path.setAttribute("d", d);
      area.setAttribute("d", d + "L" + pts[i].x.toFixed(1) + " " + floorY + " L" + padL + " " + floorY + " Z");
      dot.setAttribute("cx", String(pts[i].x)); dot.setAttribute("cy", String(pts[i].y));

      if (broke && !breakoutShown && i > built.monEnd + 1) {
        const cleared = upTxt ? pts[i].y < built.monHi - 2 : pts[i].y > built.monLo + 2;
        if (cleared) {
          breakoutShown = true;
          const bx = pts[i].x, by = pts[i].y;
          const marker = svgText(upTxt ? "▲ BREAKOUT" : "▼ BREAKOUT", Math.min(bx, W - padR - 90), by + (upTxt ? -12 : 18), upTxt ? "#7df0bd" : "#ffb59a");
          marker.setAttribute("font-size", String(FS + 1)); marker.setAttribute("opacity", "0");
          chart.appendChild(marker); fadeIn(marker);
        }
      }
      const touchedBand = upTxt ? pts[i].y <= vUp + 3 : pts[i].y >= vLo - 3;
      if (broke && breakoutShown && !exhaustShown && touchedBand && i > built.monEnd + 4) {
        exhaustShown = true;
        const bandY = upTxt ? vUp : vLo;
        setCaption(`Price has stretched all the way to the <b>${upTxt ? "upper" : "lower"} VWAP band</b>  the move is <b>statistically exhausted</b>. The strategy reads this as the signal to stop[...]
        const mk = svgText(isMobile ? "● EXHAUSTION" : "● VWAP BAND  exhaustion", padL + 40, bandY + (upTxt ? -7 : 16), "#f0d79a");
        mk.setAttribute("font-size", String(FS + 1)); mk.setAttribute("opacity", "0");
        chart.appendChild(mk); fadeIn(mk);
        const td = el("circle", { cx: pts[i].x, cy: bandY, r: 6, fill: "none", stroke: "#f0d79a", "stroke-width": 2 });
        chart.appendChild(td);
        (td as any).animate([{ r: 3, opacity: 1 }, { r: 14, opacity: 0 }], { duration: 900, iterations: 2 });
        ((upTxt ? vwapUp : vwapLo) as any).animate([{ strokeWidth: 1.3 }, { strokeWidth: 3.2 }, { strokeWidth: 1.3 }], { duration: 800, iterations: 2 });
      }
      if (broke && breakoutShown && !exhaustShown) { moveBand(pts[i].y); }
      if (broke && exhaustShown) {
        const curCenter = parseFloat(band.getAttribute("y")!) + halfBand;
        moveBand(curCenter + (vwapY - curCenter) * 0.15);
      }

      if (pts[i].y > bandTop && pts[i].y < bandBot && i % 5 === 0) feeTick(pts[i].x, pts[i].y, bandBot);
      const accrued = grossTarget * (i + 1) / pts.length;
      document.getElementById("fnFeesVal")!.textContent = "$" + fmt(accrued);
      document.getElementById("feeChipVal")!.textContent = "$" + fmt(accrued);
      await sleep(24);
    }
    dot.remove();
    const closeX = pts[pts.length - 1].x;
    const closeLine = el("line", { x1: closeX, y1: padT, x2: closeX, y2: padT + plotH, stroke: "rgba(95,214,160,.6)", "stroke-width": 1.5, "stroke-dasharray": "4 4", opacity: 0 });
    chart.appendChild(closeLine); fadeIn(closeLine);
    const closeDot = el("circle", { cx: closeX, cy: pts[pts.length - 1].y, r: 5.5, fill: "#5fd6a0", filter: "url(#softGlow)" });
    chart.appendChild(closeDot);
    chart.appendChild(svgText("NEXT MON", Math.min(closeX - 4, W - padR - 58), padT + 12, "rgba(95,214,160,.9)"));
    setCaption(`The cycle completes at <b>next Monday</b>  one full Monday-to-Monday week. The fees earned across the week are now ready to be distributed, and the strategy resets to read the new[...]
    await sleep(900);

    setStep(6); setPhase("6 · Weekly distribution");
    setCaption(`At week's end the fees are split: <b>you</b> earn up to 30% APY, the <b>IL Shield reserve</b> is topped up to keep your principal safe, and the <b>protocol</b> takes its share. Yo[...]
    lit("flowSplit");
    countSplit("snUser", st.userPay, "$");
    countSplit("snReserve", st.reserve, "$");
    countSplit("snProto", st.protoTotal, "$");
    await sleep(1200);

    steps.forEach((s) => { s.classList.remove("active"); s.classList.add("done"); });
    setPhase("✓ Principal protected · fees distributed");
    setCaption(`That's one week. <b>Your principal stayed protected the entire time</b>  you earned fees on top of it, not at risk of it. Repeat every week, across many pairs.`);
    deployBtn.disabled = false; deployBtn.textContent = "▶ Replay deployment";
    if (deployBtnTop) { deployBtnTop.disabled = false; deployBtnTop.textContent = "▶ Replay deployment"; }
    running = false;
  }

  function fadeIn(node: SVGElement) {
    const o = node.getAttribute("opacity") || "1";
    (node as any).animate([{ opacity: 0 }, { opacity: o }], { duration: 400, fill: "forwards" });
    node.setAttribute("opacity", o);
  }
  function svgText(t: string, x: number, y: number, color: string) {
    const e = el("text", { x, y, fill: color, "font-size": FS, "font-family": "monospace", "font-weight": 600 });
    e.textContent = t; return e;
  }
  function feeTick(x: number, y: number, floorY: number) {
    const c = el("circle", { cx: x, cy: y, r: 3, fill: "#e8c479", filter: "drop-shadow(0 0 4px rgba(232,196,121,.8))" });
    chart.appendChild(c);
    const anim = (c as any).animate(
      [{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(0,${floorY - y + 12}px)`, opacity: 0 }],
      { duration: 1000, easing: "ease-in" }
    );
    anim.onfinish = () => c.remove();
  }
  function countSplit(id: string, target: number, prefix: string) {
    const e = document.getElementById(id)!;
    const t0 = performance.now(), dur = 900;
    function tick(now: number) {
      const p = Math.min(1, (now - t0) / dur);
      const v = target * (1 - Math.pow(1 - p, 3));
      e.textContent = prefix + fmt(v);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function scrollToEl(sel: string, offset?: number) {
    const e = root.querySelector(sel) as HTMLElement | null;
    if (e) {
      const y = e.getBoundingClientRect().top + window.pageYOffset - (offset || 72);
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  function launchTop() { scrollToEl(".hood-chart-wrap", 72); setTimeout(runDeploy, 450); }
  function launchBottom() { scrollToEl("#hoodCaption", 88); setTimeout(runDeploy, 450); }
  deployBtn.addEventListener("click", launchBottom);
  if (deployBtnTop) deployBtnTop.addEventListener("click", launchTop);
  resetHood();

  return () => {
    window.clearTimeout(initTimer);
    capEl.removeEventListener("input", onCapInput);
    weekEl.removeEventListener("input", onWeekInput);
    detachCap(); detachWk();
    assetHandlers.forEach((h) => h());
    deployBtn.removeEventListener("click", launchBottom);
    if (deployBtnTop) deployBtnTop.removeEventListener("click", launchTop);
  };
}
