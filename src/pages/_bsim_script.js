
// Balcore public floor model. The production engine's placement, weekly map,
// signals and safeguard calibrations are proprietary and are NOT in this file.
let seed=7;
function rng(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff}
function gauss(){let u=0,v=0;while(!u)u=rng();while(!v)v=rng();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
const ASSETS={
 BTC: {p0:62000,vol:40, apr:220, sym:'BTC',  study:[1,1.74,1.25,1.90,1.35,1.02]},
 ETH: {p0:3480, vol:30, apr:350, sym:'ETH',  study:[1,1.42,0.63,1.05,0.65,0.54]},
 AVAX:{p0:30,   vol:35, apr:300, sym:'AVAX', study:[1,1.83,1.17,0.50,0.27,0.22]},
 GOLD:{p0:2400, vol:15, apr:95,  sym:'XAUT', study:[1,1.16,1.40,1.79,2.30,1.66]}};
let asset='BTC';
let initialCapital=5000000;
let feeMultiplier=1;
let lastResult=null,lastPx=null;
let customPct=[0,-30,-55,-70,-80];
let userSeries=null;
function drawBuilder(){
  const c=document.getElementById('bld'); if(!c)return;
  const g=c.getContext('2d'),W=c.width,H=c.height;
  g.clearRect(0,0,W,H);
  const N=customPct.length-1;
  const X=i=>60+(W-120)*i/N, Y=p=>H/2-(H/2-26)*Math.max(-1,Math.min(1,p/100));
  g.strokeStyle='#2A2440';g.beginPath();g.moveTo(40,Y(0));g.lineTo(W-20,Y(0));g.stroke();
  g.fillStyle='#8F92B5';g.font='11px sans-serif';g.fillText('0%',14,Y(0)+4);
  const ML=['Start','Month 6','Month 12','Month 18','Month 24'];
  ML.forEach((m,i)=>g.fillText(m,X(i)-20,H-6));
  g.strokeStyle='#8B5CF6';g.lineWidth=2.4;g.beginPath();
  customPct.forEach((p,i)=>i?g.lineTo(X(i),Y(p)):g.moveTo(X(i),Y(p)));g.stroke();
  customPct.forEach((p,i)=>{
    g.fillStyle=i?'#8B5CF6':'#8F92B5';
    g.beginPath();g.arc(X(i),Y(p),8,0,7);g.fill();
    g.fillStyle='#EEF2F7';g.font='bold 12px sans-serif';
    g.fillText((p>0?'+':'')+Math.round(p)+'%',X(i)-14,Y(p)-14);
  });
}
function builderDrag(){
  const c=document.getElementById('bld'); if(!c)return;
  const W=c.width,H=c.height,N=customPct.length-1,X=i=>60+(W-120)*i/N;
  let drag=-1;
  const toP=y=>Math.max(-95,Math.min(300,(H/2-y)/(H/2-26)*100));
  function pos(e){const r=c.getBoundingClientRect();const t=e.touches?e.touches[0]:e;
    return[(t.clientX-r.left)*W/r.width,(t.clientY-r.top)*H/r.height];}
  const dn=e=>{const[x,y]=pos(e);drag=-1;let best=1e9;
    for(let i=1;i<customPct.length;i++){const d=Math.abs(x-X(i));if(d<40&&d<best){best=d;drag=i;}}
    if(drag>0){e.preventDefault();try{c.setPointerCapture(e.pointerId)}catch(_){}}};
  const mv=e=>{if(drag<1)return;e.preventDefault();const[,y]=pos(e);
    customPct[drag]=toP(y);drawBuilder();if(window.syncBldSliders)syncBldSliders();};
  const up=()=>{if(drag>0){drag=-1;armCustom();}};
  c.addEventListener('pointerdown',dn);c.addEventListener('pointermove',mv);
  window.addEventListener('pointerup',up);
}
function rollFuture(){
  const vf=Math.min(1.2,ASSETS[asset].vol/100*1.5);
  let a=1; customPct=[0];
  for(let k=1;k<5;k++){a=Math.max(0.15,a*Math.exp((rng()-0.5)*vf));customPct.push((a-1)*100);}
  if(window.syncBldSliders)syncBldSliders();
  drawBuilder();
}
function rollRandom(){
  let a=1; customPct=[0];
  for(let k=1;k<5;k++){a=Math.max(0.08,a*Math.exp((rng()-0.5)*1.1));customPct.push((a-1)*100);}
  if(window.syncBldSliders)syncBldSliders();
  drawBuilder();
}
function armCustom(){ if(preset!=='future')selectCustom(); markDirty(); }
function selectCustom(){preset='custom';
  document.querySelectorAll('#presets button').forEach(x=>x.classList.remove('active'));
  document.getElementById('customBtn').classList.add('active');
  document.getElementById('builder').open=true;}
const HOURS=24*730;
function buildPath(preset,volPct){
  const vol=volPct/100/Math.sqrt(8760);
  const anchors={crash:[1,0.60,0.72,0.45,0.55,0.50],bear:[1,0.92,0.82,0.88,0.76,0.80],
    chop:[1,1.12,0.92,1.08,0.95,1.02],melt:[1,1.3,1.15,1.7,2.0,2.2],round:[1,1.6,2.3,1.4,0.9,0.75]};
  let A=anchors[preset];
  if(preset==='custom'||preset==='rand')A=customPct.map(p=>Math.max(0.05,1+p/100));
  if(preset==='study')A=ASSETS[asset].study;
  if(preset==='paste'&&userSeries){A=userSeries.map(v=>v/userSeries[0]);}
  if(preset==='future'){A=customPct.map(p=>Math.max(0.05,1+p/100));}
  if(!A){A=[1];for(let k=1;k<6;k++)A.push(Math.max(0.08,A[k-1]*Math.exp((rng()-0.5)*1.1)));}
  const p=new Float64Array(HOURS);
  for(let i=0;i<HOURS;i++){
    const f=i/(HOURS-1)*(A.length-1),k=Math.min(A.length-2,Math.floor(f)),t=f-k;
    p[i]=Math.log(A[k])*(1-t)+Math.log(A[k+1])*t;
  }
  const n=new Float64Array(HOURS);let c=0;
  for(let i=0;i<HOURS;i++){c+=gauss()*vol;n[i]=c}
  const seg=Math.floor(HOURS/(A.length-1));
  for(let k=0;k<A.length-1;k++){const a=k*seg,b=(k===A.length-2)?HOURS-1:Math.min(HOURS-1,(k+1)*seg);
    for(let i=a;i<=b;i++)n[i]-=n[a]+(n[b]-n[a])*(i-a)/(b-a);}
  const P0=(preset==='future')?ASSETS[asset].p0*ASSETS[asset].study[5]:ASSETS[asset].p0;
  const out=new Float64Array(HOURS);
  for(let i=0;i<HOURS;i++)out[i]=P0*Math.exp(p[i]+Math.max(-0.5,Math.min(0.5,n[i])));
  return out;
}
function pct(arr,q){const a=Float64Array.from(arr).sort();return a[Math.min(a.length-1,Math.floor(q*a.length))]}
function simulate(px,aprFac){
  const P0=px[0], A0=(initialCapital/2)/P0, U0=initialCapital/2;
  let A=A0,U=U0;
  let fees=0,il=0,proto=0,paid=0,surV=0,pausedW=0,inrH=0,depH=0;
  const CAP=0.30*initialCapital/52;
  let gateH=0,brkN=0,haltN=0;
  const eq=[],mF=[],mB=[];let mf=0,mb=0;
  const W=168, weeks=Math.floor(px.length/W);
  const PROTO=0.05;
  const m4=[],m1=[];
  for(let i=4;i<px.length;i++){m4.push(Math.abs(px[i]/px[i-4]-1));}
  for(let i=1;i<px.length;i++){m1.push(Math.abs(px[i]/px[i-1]-1));}
  const GATE=pct(m4,0.97), HALT=Math.max(pct(m1,0.999),3*pct(m1,0.5)), CALM=pct(m1,0.5);
  const sig=ASSETS[asset].vol/100/Math.sqrt(365);
  const T90=1.9*sig, T99=3.2*sig;
  function aprAt(r){
    let a; if(r<=T90)a=3.0+1.0*Math.min(1,r/Math.max(T90,1e-9));
    else if(r<=T99)a=10.0+2.0*(r-T90)/Math.max(T99-T90,1e-9);
    else a=20.0;
    return a*aprFac;}
  let pos=null, halted=0, shMax=0.20;
  const wkTyp=ASSETS[asset].vol*0.0014;
  function deploy(p,share){
    const tv=share*(A*p+U), lo=p*0.94, hi=p*1.06;
    const L=tv/(2*Math.sqrt(p)-Math.sqrt(lo)-p/Math.sqrt(hi));
    const x=L*(1/Math.sqrt(p)-1/Math.sqrt(hi)), y=L*(Math.sqrt(p)-Math.sqrt(lo));
    A-=x;U-=y; pos={L,lo,hi,tv};
  }
  function close(q){
    if(!pos)return;
    const qc=Math.max(pos.lo,Math.min(pos.hi,q));
    A+=pos.L*(1/Math.sqrt(qc)-1/Math.sqrt(pos.hi));
    U+=pos.L*(Math.sqrt(qc)-Math.sqrt(pos.lo));
    pos=null;
  }
  for(let w=0;w<weeks;w++){
    const i0=w*W, p=px[i0];
    const held_s=A0*p+U0, have_s=A*p+U;
    let gLo=0,gHi=1e18;
    let share=0.20;
    if(w>0){let H=-1,L=1e18;for(let i=i0-W;i<i0;i++){H=Math.max(H,px[i]);L=Math.min(L,px[i])}
      const R=H-L; gHi=H+0.6*R; gLo=Math.max(0.01,L-0.6*R);
      const rr=R/((H+L)/2);
      share=0.20+0.15*Math.max(0,Math.min(1,(rr/wkTyp-1)/1.5));}
    shMax=Math.max(shMax,share);
    deploy(p,share); let wf=0, parkedToMonday=false;
    for(let i=i0;i<Math.min(i0+W,px.length);i++){
      const q=px[i]; depH++;
      const v4=Math.abs(q/px[Math.max(0,i-4)]-1), v1=Math.abs(q/px[Math.max(0,i-1)]-1);
      if(parkedToMonday) continue;
      if(q>gHi||q<gLo){close(q);brkN++;parkedToMonday=true;continue;}
      if(pos&&v1>HALT){close(q);haltN++;halted=2;continue;}
      if(!pos){
        if(halted>0){ if(v1<3*CALM)halted--; continue; }
        if(v4>GATE){gateH++;continue;}
        deploy(q,share); continue;
      }
      const inb=q>=pos.lo&&q<=pos.hi;
      if(inb){inrH++;
        const r=Math.abs(q/px[Math.max(0,i-24)]-1);
        wf+=pos.tv*aprAt(r)/8760;
      } else {
        if(v4>GATE){gateH++;}
        else {close(q); deploy(q,share);}
      }
    }
    const pe=px[Math.min(i0+W,px.length-1)];
    close(pe); halted=0;
    const held=A0*pe+U0, have=A*pe+U;
    const bill=Math.max(0,(held-held_s)-(have-have_s)); il+=bill;mb+=bill;
    const pf=wf*PROTO; proto+=pf; fees+=wf; mf+=wf; U+=wf-pf;
    if(A>A0){const ex=A-A0;A=A0;U+=ex*pe;}
    if(A<A0){const need=(A0-A)*pe;const use=Math.min(need,Math.max(0,U-U0));A+=use/pe;U-=use;}
    const net=wf-bill-pf;
    const countsWhole=(A>=A0-1e-9)&&(U>=U0-1e-6);
    if(net>0&&countsWhole){
      const dist=Math.min(net,U-U0);
      const pay=Math.min(dist,CAP); paid+=pay;
      const sur=dist-pay; surV+=sur*0.70; proto+=sur*0.30;
      U-=dist;
    }
    else pausedW++;
    eq.push([i0,A*pe+U+surV+paid]);
    if((w+1)%4===0||w===weeks-1){mF.push(mf);mB.push(mb);mf=0;mb=0;}
  }
  const pe=px[px.length-1];
  return {A,U,A0,U0,fees,il,proto,paid,surV,pausedW,inRange:inrH/Math.max(1,depH),eq,mF,mB,
    gateH,brkN,haltN,shMax,
    total:A*pe+U+surV+paid,holdA:initialCapital*pe/px[0],hold55:initialCapital/2+(initialCapital/2)*pe/px[0],pe,p0:px[0]};
}
function cnv(id){const c=document.getElementById(id),g=c.getContext('2d');g.clearRect(0,0,c.width,c.height);return[c,g]}
function drawEq(r,px){
  const[c,g]=cnv('eq'),W=c.width,H=c.height,pad=40;
  const N=r.eq.length;
  const hold=r.eq.map(e=>2.5e6+2.5e6*px[e[0]]/r.p0);
  const ha=r.eq.map(e=>5e6*px[e[0]]/r.p0);
  const all=r.eq.map(e=>e[1]).concat(hold).concat(ha);
  const mn=Math.min(...all)*0.95,mx=Math.max(...all)*1.05;
  const X=i=>pad+(W-pad-14)*i/(N-1), Y=v=>H-26-(H-42)*(v-mn)/(mx-mn);
  g.strokeStyle='#2A2440';g.lineWidth=1;
  for(let k=0;k<5;k++){const y=26+(H-52)*k/4;g.beginPath();g.moveTo(pad,y);g.lineTo(W-10,y);g.stroke();}
  g.strokeStyle='#8F92B5';g.setLineDash([5,5]);g.beginPath();hold.forEach((v,i)=>i?g.lineTo(X(i),Y(v)):g.moveTo(X(i),Y(v)));g.stroke();
  g.strokeStyle='#E06C6C';g.beginPath();ha.forEach((v,i)=>i?g.lineTo(X(i),Y(v)):g.moveTo(X(i),Y(v)));g.stroke();g.setLineDash([]);
  g.strokeStyle='#8B5CF6';g.lineWidth=2.6;g.beginPath();r.eq.forEach((e,i)=>i?g.lineTo(X(i),Y(e[1])):g.moveTo(X(i),Y(e[1])));g.stroke();
  g.font='12px sans-serif';
  g.fillStyle='#8B5CF6';g.fillText('BALCORE (vault + payouts)',pad+6,20);
  g.fillStyle='#8F92B5';g.fillText('hold 50/50',pad+200,20);
  g.fillStyle='#E06C6C';g.fillText('hold '+ASSETS[asset].sym,pad+290,20);
  g.fillStyle='#8F92B5';g.fillText(moneyShort(mx),2,32);g.fillText(moneyShort(mn),2,H-24);
  const TL=['Start','Month 6','Month 12','Month 18','Month 24'];
  TL.forEach((t,k)=>{const x=pad+(W-pad-14)*k/4;g.fillText(t,Math.min(x,W-64),H-8);});
}
function drawMo(r){
  const[c,g]=cnv('mo'),W=c.width,H=c.height,pad=36,N=r.mF.length;
  const mx=Math.max(...r.mF,...r.mB)*1.1||1;
  const bw=(W-pad-10)/N;
  for(let i=0;i<N;i++){
    const x=pad+i*bw;
    g.fillStyle='#8B5CF6';g.fillRect(x+bw*0.12,H-24-(H-44)*r.mF[i]/mx,bw*0.32,(H-44)*r.mF[i]/mx);
    g.fillStyle='#E06C6C';g.fillRect(x+bw*0.52,H-24-(H-44)*r.mB[i]/mx,bw*0.32,(H-44)*r.mB[i]/mx);
  }
  g.fillStyle='#8F92B5';g.font='11px sans-serif';g.fillText('teal = fees · red = IL bill · per month',pad,14);
  for(let k=0;k<N;k+=6){const x=pad+k*bw;g.fillText('Mo '+(k+1),x,H-8);}
  g.fillText('Mo '+N,W-46,H-8);
}
function seatsHTML(r){
  const seats=[['BALCORE',r.total,'#3ECF8E'],['Hold 50/50',r.hold55,'#8F92B5'],['Hold '+ASSETS[asset].sym,r.holdA,'#E06C6C']]
    .sort((a,b)=>b[1]-a[1]);
  const mx=seats[0][1];
  document.getElementById('seats').innerHTML=seats.map(s=>{
    const pc=(s[1]/initialCapital-1)*100;
    return `<div class="seat"><div class="lab">${s[0]}</div>
    <div style="display:flex;align-items:center"><div class="bar" style="width:${78*s[1]/mx}%;background:${s[2]}"></div>
    <span class="num" style="color:${s[2]}">${moneyShort(s[1])} ${pc>=0?'+':''}${pc.toFixed(0)}%</span></div></div>`;}).join('');
}
let preset='study';
document.querySelectorAll('#assets button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#assets button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); asset=b.dataset.a;
  vol.value=100; vol.oninput(); markDirty();});
document.querySelectorAll('#presets button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#presets button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); preset=b.dataset.p;
  if(preset==='custom'){document.getElementById('builder').open=true;drawBuilder();}
  if(preset==='future'){rollFuture();document.getElementById('builder').open=true;}
  if(preset==='rand'){rollRandom();document.getElementById('builder').open=true;}
  markDirty();});
(function(){
  const box=document.getElementById('bldSliders');
  const names=['Month 6','Month 12','Month 18','Month 24 (end)'];
  box.innerHTML=names.map((n,k)=>`<label style="display:block;font-size:11px;color:var(--mut)">${n}
    <b id="bsv${k}" style="color:var(--teal)">${Math.round(customPct[k+1])}%</b><br>
    <input id="bs${k}" type="range" min="-95" max="300" value="${Math.round(customPct[k+1])}" style="width:100%"></label>`).join('');
  for(let k=0;k<4;k++){
    const el=document.getElementById('bs'+k);
    el.oninput=()=>{customPct[k+1]=+el.value;
      document.getElementById('bsv'+k).textContent=(el.value>0?'+':'')+el.value+'%';
      drawBuilder();};
    el.onchange=()=>{armCustom();};
  }
  window.syncBldSliders=()=>{for(let k=0;k<4;k++){const el=document.getElementById('bs'+k);
    el.value=Math.round(customPct[k+1]);
    document.getElementById('bsv'+k).textContent=(customPct[k+1]>0?'+':'')+Math.round(customPct[k+1])+'%';}};
})();
drawBuilder();builderDrag();document.getElementById('builder').addEventListener('toggle',drawBuilder);
function ingestSeries(nums,label=''){
  const msg=document.getElementById('pasteMsg');
  nums=nums.map(Number).filter(v=>Number.isFinite(v)&&v>0);
  if(nums.length<2){msg.textContent='Need at least 2 positive price values';msg.style.color='var(--red)';return false;}
  if(nums.length>2000)nums.length=2000;
  userSeries=nums;preset='paste';
  document.querySelectorAll('#presets button').forEach(x=>x.classList.remove('active'));
  document.getElementById('customBtn').classList.add('active');
  const move=(nums[nums.length-1]/nums[0]-1)*100;
  msg.textContent=(label?label+': ':'')+nums.length+' points loaded · '+(move>=0?'+':'')+move.toFixed(0)+'% end to end · press RUN';
  msg.style.color='var(--green)';markDirty();return true;
}
function splitCSVLine(line,delimiter){
  const cells=[];let cell='',quoted=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"'){
      if(quoted&&line[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;
    }else if(ch===delimiter&&!quoted){cells.push(cell.trim());cell='';}
    else cell+=ch;
  }
  cells.push(cell.trim());return cells;
}
function parseUploadedPrices(raw){
  const lines=String(raw).split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
  if(!lines.length)return [];
  const delimiter=(lines[0].match(/,/g)||[]).length>=(lines[0].match(/;/g)||[]).length?',':';';
  const rows=lines.map(line=>splitCSVLine(line,delimiter));
  const clean=s=>String(s??'').replace(/[\$,%\s]/g,'').replace(/^\((.*)\)$/,'-$1');
  const value=s=>{const n=Number(clean(s));return Number.isFinite(n)&&n>0?n:null;};
  const headers=rows[0].map(x=>x.toLowerCase().replace(/[^a-z0-9]/g,''));
  const preferred=['adjclose','adjustedclose','close','closingprice','price','last','value'];
  let col=preferred.map(h=>headers.indexOf(h)).find(i=>i>=0);
  const hasHeader=headers.some(h=>preferred.includes(h)||['date','time','timestamp','open','high','low','volume'].includes(h));
  const data=hasHeader?rows.slice(1):rows;
  if(col===undefined){
    const width=Math.max(...data.map(r=>r.length));let best=-1,bestScore=-1;
    for(let c=0;c<width;c++){
      const vals=data.map(r=>value(r[c])).filter(v=>v!==null);
      const score=vals.length-(c===width-1?0.05:0);
      if(score>bestScore){bestScore=score;best=c;}
    }
    col=best;
  }
  let nums=data.map(r=>value(r[col])).filter(v=>v!==null);
  if(nums.length<2)nums=String(raw).split(/[\s,;]+/).map(value).filter(v=>v!==null);
  return nums;
}
document.getElementById('pasteLoad').onclick=()=>{
  const raw=document.getElementById('pasteBox').value;
  ingestSeries(raw.split(/[\s,;]+/).map(Number),'Pasted data');
};
document.getElementById('csvFile').onchange=e=>{
  const f=e.target.files&&e.target.files[0];if(!f)return;
  const msg=document.getElementById('pasteMsg');msg.textContent='Reading '+f.name+'…';msg.style.color='var(--mut)';
  const rd=new FileReader();
  rd.onload=()=>{ingestSeries(parseUploadedPrices(rd.result),f.name);e.target.value='';};
  rd.onerror=()=>{msg.textContent='Could not read that file';msg.style.color='var(--red)';e.target.value='';};
  rd.readAsText(f);
};
vol.oninput=()=>{const m=+vol.value/100,base=ASSETS[asset].vol,v=Math.round(base*m);
  const tag=m<1?'Calm':m===1?'Realistic':m<=1.5?'Rough':'Wild';
  volv.textContent='\u00d7'+m.toFixed(2).replace(/\.?0+$/,'')+' ('+tag+') \u00b7 ~'+v+'%/yr \u00b7 week \u00b1'+Math.round(v*0.14)+'% \u2014 wilder = higher fee tiers AND bigger IL bills';};
reroll.onclick=()=>{seed=Math.floor(Math.random()*99990)+7;seedv.textContent=seed;if(preset==='future')rollFuture();if(preset==='rand')rollRandom();markDirty();};

capital.onchange=()=>{initialCapital=+capital.value;markDirty();};
feeEnv.onchange=()=>{feeMultiplier=+feeEnv.value;markDirty();};
function scenarioParams(){
  const p=new URLSearchParams({asset,preset,vol:vol.value,seed:String(seed),capital:String(initialCapital),fee:String(feeMultiplier)});
  if(['custom','future','rand'].includes(preset))p.set('path',customPct.map(v=>Math.round(v)).join(','));
  return p;
}
function copyText(text){
  if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(text);
  const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy');}finally{ta.remove();}
  return Promise.resolve();
}
document.getElementById('share').onclick=()=>{
  const url=location.origin&&location.origin!=='null'?location.origin+location.pathname+'?'+scenarioParams():location.href.split('?')[0]+'?'+scenarioParams();
  copyText(url).then(()=>toast('Scenario link copied')).catch(()=>toast('Could not copy scenario'));
};
document.getElementById('export').onclick=()=>{
  if(!lastResult){toast('Run a scenario first');return;}
  const r=lastResult;
  const rows=[
    ['Balcore simulator export'],['pair',ASSETS[asset].sym+'/USD'],['market',preset],['scenario',seed],['initial capital',initialCapital],['roughness multiplier',+vol.value/100],['fee environment',feeMultiplier],
    ['ending Balcore value',r.total],['hold 50/50',r.hold55],['hold asset',r.holdA],['fees',r.fees],['impermanent loss',r.il],['protocol fee',r.proto],['user distributions',r.paid],['surplus vault',r.surV],[],['month','fees','IL bill']
  ];
  r.mF.forEach((v,i)=>rows.push([i+1,v,r.mB[i]]));
  const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),a=document.createElement('a');
  a.href=URL.createObjectURL(blob);a.download='balcore-'+asset.toLowerCase()+'-'+preset+'-scenario-'+seed+'.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500);toast('CSV exported');
};
function loadScenarioFromURL(){
  const q=new URLSearchParams(location.search);if(!q.size)return;
  if(ASSETS[q.get('asset')])asset=q.get('asset');
  const allowed=['study','crash','bear','chop','melt','round','rand','future','custom'];if(allowed.includes(q.get('preset')))preset=q.get('preset');
  const vv=+q.get('vol');if([50,75,100,125,150,175,200].includes(vv))vol.value=vv;
  const sd=+q.get('seed');if(Number.isInteger(sd)&&sd>0)seed=sd;
  const cp=+q.get('capital');if([100000,1000000,5000000,10000000].includes(cp)){initialCapital=cp;capital.value=cp;}
  const fm=+q.get('fee');if([.5,1,1.5].includes(fm)){feeMultiplier=fm;feeEnv.value=fm;}
  const path=q.get('path');if(path){const a=path.split(',').map(Number);if(a.length===5&&a.every(Number.isFinite)){customPct=a;syncBldSliders();drawBuilder();}}
  document.querySelectorAll('#assets button').forEach(b=>b.classList.toggle('active',b.dataset.a===asset));
  document.querySelectorAll('#presets button').forEach(b=>b.classList.toggle('active',b.dataset.p===preset||(preset==='custom'&&b.id==='customBtn')));
  seedv.textContent=seed;vol.oninput();
}
document.getElementById('run').onclick=run;
const fmt=v=>'$'+Math.round(v).toLocaleString();
function moneyShort(v){
  const a=Math.abs(v),sign=v<0?'−':'';
  if(a>=1e9)return sign+'$'+(a/1e9).toFixed(a>=1e10?1:2)+'B';
  if(a>=1e6)return sign+'$'+(a/1e6).toFixed(a>=1e7?1:2)+'M';
  if(a>=1e3)return sign+'$'+(a/1e3).toFixed(a>=1e5?0:1)+'K';
  return sign+'$'+Math.round(a).toLocaleString();
}
function signedMoney(v){return (v>=0?'+':'−')+moneyShort(Math.abs(v));}
function signedPct(v,d=1){return (v>=0?'+':'−')+Math.abs(v).toFixed(d)+'%';}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),1800);}
function maxDrawdown(eq){
  let peak=initialCapital,dd=0;
  for(const [,v] of eq){peak=Math.max(peak,v);dd=Math.max(dd,(peak-v)/peak);}
  return dd;
}
function updateKPIs(r){
  const vs55=r.total-r.hold55,vsA=r.total-r.holdA;
  const cagr=(Math.pow(Math.max(r.total,1)/initialCapital,1/2)-1)*100;
  const dd=maxDrawdown(r.eq)*100;
  kEnd.textContent=moneyShort(r.total);kEnd.className='number '+(r.total>=initialCapital?'pos':'neg');
  kEndD.textContent=signedPct((r.total/initialCapital-1)*100)+' total return over 24 months';
  kVs55.textContent=signedMoney(vs55);kVs55.className='number '+(vs55>=0?'pos':'neg');
  kVs55D.textContent=signedPct(vs55/Math.max(1,r.hold55)*100)+' versus 50/50 hold';
  kVsA.textContent=signedMoney(vsA);kVsA.className='number '+(vsA>=0?'pos':'neg');
  kVsAD.textContent=signedPct(vsA/Math.max(1,r.holdA)*100)+' versus '+ASSETS[asset].sym+' hold';
  kCagr.textContent=signedPct(cagr);kCagr.className='number '+(cagr>=0?'pos':'neg');
  kDd.textContent='maximum modeled drawdown '+dd.toFixed(1)+'%';
  kPay.textContent=moneyShort(r.paid);kPay.className='number pos';
  kCov.textContent='fee / IL coverage '+(r.il>0?(r.fees/r.il).toFixed(2)+'×':'n/a');
}

function runCore(){
  const s0=seed;
  seed=s0;
  const px=buildPath(preset,ASSETS[asset].vol*(+vol.value)/100);
  const r=simulate(px,ASSETS[asset].apr/350*feeMultiplier);
  lastResult=r;lastPx=px;
  drawEq(r,px);drawMo(r);seatsHTML(r);updateKPIs(r);
  const PN={rand:'Random market',paste:'Your data',future:'Next 24 months (randomized future)',study:'Our study tape',crash:'Crash \u221250%',bear:'Bear \u221220%',chop:'Sideways chop',melt:'Melt-up +120%',round:'Boom & bust',rand:'Random',custom:'Custom market'};
  const mv=(r.pe/r.p0-1)*100;
  document.getElementById('ctx').innerHTML='<b style="color:#EEF2F7">'+ASSETS[asset].sym+' / USD</b> \u00b7 '+(PN[preset]||preset)+(preset==='paste'&&userSeries?' ('+userSeries.length+' pts)':'')+' \u00b7 asset '+(mv>=0?'+':'')+mv.toFixed(0)+'% \u00b7 Scenario #'+s0+' \u00b7 fees '+feeMultiplier.toFixed(1)+'\u00d7';
  document.getElementById('capitalTitle').textContent=moneyShort(initialCapital);
  document.querySelector('#tokA').parentElement.firstElementChild.textContent=ASSETS[asset].sym;
  const fA=v=>v<1000?v.toFixed(2):Math.round(v).toLocaleString();
  tokA.textContent=fA(r.A0)+' \u2192 '+fA(r.A);
  tokA.className=Math.abs(r.A-r.A0)<r.A0*0.01?'pos':'amb';
  tokU.textContent=fmt(r.U0)+' \u2192 '+fmt(r.U);
  tokU.className=r.U>=r.U0*0.99?'pos':'amb';
  const whole=(Math.abs(r.A-r.A0)<r.A0*0.005&&r.U>=r.U0*0.995);
  tokNote.textContent=whole?
    'restored to the deposit \u2014 payouts only ever come from income above whole counts':
    'still restoring \u2014 payouts pause until both counts are whole; every retained dollar goes to the refill first';
  tokNote.style.color=whole?'':'var(--amber)';
  wFee.textContent=fmt(r.fees);wIL.textContent='\u2212'+fmt(r.il).slice(1);
  wProto.textContent='\u2212'+fmt(r.proto).slice(1);
  wVal.textContent=(r.fees-r.il-r.proto>=0?'+':'')+fmt(r.fees-r.il-r.proto);
  wVal.className=r.fees-r.il-r.proto>=0?'pos':'neg';
  wPay.textContent=fmt(r.paid)+' \u00b7 '+(r.paid/initialCapital/2*100).toFixed(1)+'%/yr';
  wSur.textContent=fmt(r.surV);
  const nM=r.mF.length,cw=r.mF.filter((f,i)=>f>=r.mB[i]).length;
  cov.textContent=cw+' / '+nM; paused.textContent=r.pausedW+' / '+r.eq.length;
  inr.textContent=(r.inRange*100).toFixed(1)+'%';
  gateN.textContent=r.gateH; brkN.textContent=r.brkN; haltN.textContent=r.haltN;
  depMax.textContent=Math.round(r.shMax*100)+'% of vault';
  seedv.textContent=s0; seed=s0;
}
function playFX(px,done){
  const ov=document.getElementById('simfx');
  let finished=false;
  const finish=()=>{if(finished)return;finished=true;try{ov.classList.remove('on')}catch(_){ } done();};
  if(!window.requestAnimationFrame){finish();return;}
  const c=document.getElementById('fx'),g=c.getContext('2d');
  const W=c.width,H=c.height; ov.classList.add('on');
  const T=2300, t0=performance.now(); let stop=false;
  const guard=setTimeout(finish,T+1500);
  const skip=()=>{stop=true}; ov.addEventListener('click',skip,{once:true});
  const mn=Math.min(...px), mx=Math.max(...px);
  const Y=v=>H-24-(H-58)*(v-mn)/(mx-mn), N=px.length;
  const HUD=['CALIBRATING WEEKLY MAP','PLACING TWO-SIDED LIQUIDITY','COLLECTING FEES','INVOICING IMPERMANENT LOSS','RESTORING TOKEN COUNTS','SETTLING PAYOUTS'];
  function frame(now){
   try{
    let f=Math.min(1,(now-t0)/T); if(stop)f=1;
    const k=Math.max(2,Math.floor(f*N));
    g.clearRect(0,0,W,H);
    g.fillStyle='rgba(139,92,246,.06)';
    for(let y=0;y<H;y+=4)g.fillRect(0,y,W,1);
    const q=px[k-1], bl=q*0.94, bh=q*1.06, xh=20+(W-40)*f;
    g.fillStyle='rgba(62,207,142,.10)';g.fillRect(xh-46,Y(bh),46,Y(bl)-Y(bh));
    g.strokeStyle='rgba(62,207,142,.5)';g.strokeRect(xh-46,Y(bh),46,Y(bl)-Y(bh));
    for(let j=0;j<7;j++){const yy=Y(bl+(bh-bl)*Math.random());
      g.fillStyle=Math.random()<.5?'#3ECF8E':'#8B5CF6';
      g.fillRect(xh-44+Math.random()*40,yy,5+Math.random()*8,2);}
    g.strokeStyle='#8B5CF6';g.lineWidth=2;g.beginPath();
    for(let i=0;i<k;i++){const x=20+(W-40)*i/(N-1);i?g.lineTo(x,Y(px[i])):g.moveTo(x,Y(px[i]));}
    g.stroke();
    g.fillStyle='#EEF2F7';g.beginPath();g.arc(xh,Y(q),3.5,0,7);g.fill();
    g.fillStyle='rgba(143,146,181,.9)';g.font='10px monospace';
    g.fillText('SIMULATION — PUBLIC FLOOR MODEL',20,16);
    if(Math.random()<.05){g.fillStyle='#F0B03F';g.font='bold 11px monospace';
      g.fillText(Math.random()<.5?'\u26A0 VELOCITY GUARD':'\u26A0 BREAKER — PARKED TO MONDAY',W-230,16);}
    document.getElementById('simhud').textContent='\u25b8 '+HUD[Math.min(HUD.length-1,Math.floor(f*HUD.length))];
    document.getElementById('simwk').textContent='WEEK '+String(Math.min(104,Math.ceil(f*104))).padStart(3,'0')+' / 104   \u00b7   '+ASSETS[asset].sym+'/USD';
    if(f<1)requestAnimationFrame(frame);
    else{clearTimeout(guard);finish();}
   }catch(_){clearTimeout(guard);finish();}
  }
  try{requestAnimationFrame(frame);}catch(_){clearTimeout(guard);finish();}
}
let fxBusy=false;
function markDirty(){document.getElementById('run').classList.add('dirty');}

function run(){
  if(fxBusy)return; fxBusy=true;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.getElementById('run').classList.remove('dirty');runCore();fxBusy=false;return;}
  const s0=seed;
  const px=buildPath(preset,ASSETS[asset].vol*(+vol.value)/100);
  seed=s0;
  document.getElementById('run').classList.remove('dirty');
  playFX(px,()=>{runCore();fxBusy=false;
    const rc=document.getElementById('ctx').closest('.card');
    if(rc)rc.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
loadScenarioFromURL();
runCore();
(function(){const j=document.getElementById('jsok');if(j){j.textContent='engine: ready \u2713';j.style.color='var(--green)';}})();
