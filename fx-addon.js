/* physics long｜秋日氛圍面板（女主角巡場、古典音樂含蕭邦〈離別〉、楓葉飄落）。由 FxAddon 元件載入。 */
(()=>{
if(window.__fxAddon||!document.body)return;window.__fxAddon=1;
const st=document.createElement('style');st.id='fxStyle';st.textContent="\n#fxPanel,#fxFab,#fxHero,#fxLeaves,#fxToast{--fx-card:var(--card,#fffcf7);--fx-ink:var(--ink,#1a1916);--fx-soft:var(--muted,#6f6a62);--fx-olive:var(--sage,#4f5f53);--fx-deep:var(--ink,#1a1916);--fx-line:var(--line,#e4ddd3);--fx-bg:var(--wash,#ebe6dc);--fx-maple:var(--maple-rust,#b35a32);--fx-amber:var(--maple-amber,#c47a3a);--fx-on:var(--card,#fffcf7)}\n/* 楓葉 */\n#fxLeaves{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:20;opacity:.85}\n@keyframes lfFall{from{transform:translate3d(var(--x0),-14vh,0)}to{transform:translate3d(var(--x1),112vh,0)}}\n@keyframes lfSway{from{transform:translateX(-26px) rotate(-22deg)}to{transform:translateX(26px) rotate(22deg)}}\n@keyframes lfFlip{from{transform:rotateY(0deg) rotate(var(--r0))}to{transform:rotateY(170deg) rotate(var(--r1))}}\n.fxlf{position:absolute;left:0;top:0;animation:lfFall var(--d) linear var(--delay) infinite;will-change:transform}\n.fxlf.once{animation-iteration-count:1;animation-fill-mode:both}\n.fxlf i{display:block;perspective:260px;animation:lfSway var(--s) ease-in-out infinite alternate}\n.fxlf svg{display:block;width:var(--sz);height:calc(var(--sz)*1.18);color:var(--c);animation:lfFlip var(--f) ease-in-out infinite alternate;filter:drop-shadow(0 1px 1px rgba(60,20,5,.18))}\n\n/* 小貓 */\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 開關鈕與面板 */\n#fxFab{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:40;width:44px;height:44px;padding:0;border-radius:50%;border:0;background:var(--fx-card);box-shadow:var(--elev,0 8px 24px rgba(37,54,45,.16));display:grid;place-items:center;cursor:pointer}\n#fxFab{transition:transform .2s ease-out,box-shadow .2s ease-out}#fxFab:hover{transform:translateY(-1px);box-shadow:var(--elev-hover,0 8px 24px rgba(37,54,45,.2))}\n#fxFab:focus-visible,#fxPanel button:focus-visible,#fxPanel input:focus-visible{outline:3px solid var(--fx-olive);outline-offset:2px}\n#fxFab span{font-size:1rem;line-height:1}\n#fxFab.playing:after{content:\"\";position:absolute;top:3px;right:3px;width:10px;height:10px;border-radius:50%;background:var(--fx-amber);border:2px solid var(--fx-card);animation:fxPulse 1.6s ease-in-out infinite}\n@keyframes fxPulse{50%{transform:scale(1.35);opacity:.6}}\n#fxPanel{position:fixed;right:max(16px,env(safe-area-inset-right,0px));bottom:calc(68px + env(safe-area-inset-bottom,0px));z-index:41;width:min(344px,calc(100vw - 24px));max-height:min(74vh,640px);overflow:auto;background:var(--fx-card);color:var(--fx-ink);border:1px solid var(--fx-line);border-radius:20px;box-shadow:var(--elev-hover,0 22px 60px rgba(25,40,32,.2));padding:14px 16px 12px;display:none;font:400 .95rem/1.6 \"Noto Sans TC\",system-ui,-apple-system,\"PingFang TC\",\"Microsoft JhengHei\",sans-serif}\n#fxPanel.open{display:block}\n#fxPanel *{box-sizing:border-box}\n#fxPanel h3{margin:0 0 6px;font-size:1.02rem;font-weight:800;color:var(--fx-deep);display:flex;justify-content:space-between;align-items:center}\n#fxPanel button{font:inherit;font-size:.86rem;cursor:pointer;border:1px solid var(--fx-line);background:var(--fx-card);color:var(--fx-ink);border-radius:999px;padding:5px 12px;white-space:nowrap}\n#fxPanel button:hover{border-color:var(--fx-olive)}\n#fxPanel .x{width:30px;height:30px;padding:0;border-radius:50%;display:grid;place-items:center}\n.fxrow{padding:11px 0;border-top:1px solid var(--fx-line)}\n.fxrow.first{border-top:0}\n.fxhd{display:flex;align-items:center;justify-content:space-between;gap:10px}\n.fxhd b{font-weight:700;display:flex;align-items:center;gap:8px}\n\n.fxhd b svg{width:20px;height:20px;color:var(--fx-maple)}\n.fxsub{display:flex;align-items:center;gap:8px;margin-top:8px;flex-wrap:wrap}\n.fxnote{color:var(--fx-soft);font-size:.78rem;line-height:1.5;margin-top:6px}\n.fx-sw{position:relative;width:42px;height:24px;flex:none}\n.fx-sw input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}\n.fx-sw i{position:absolute;inset:0;border-radius:99px;background:var(--fx-line);transition:.2s}\n.fx-sw i:after{content:\"\";position:absolute;left:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px #0003;transition:.2s}\n.fx-sw input:checked+i{background:var(--fx-olive)}\n.fx-sw input:checked+i:after{transform:translateX(18px)}\n.fx-sw input:focus-visible+i{outline:3px solid var(--fx-olive);outline-offset:2px}\n.fx-seg{display:inline-flex;border:1px solid var(--fx-line);border-radius:99px;overflow:hidden}\n#fxPanel .fx-seg button{border:0;border-radius:0;background:none;padding:4px 12px}\n#fxPanel .fx-seg button.on{background:var(--fx-deep);color:var(--fx-on)}\n#fxPanel .round{width:34px;height:34px;padding:0;border-radius:50%;display:grid;place-items:center;font-size:.95rem}\n#fxPanel .round.pri{width:40px;height:40px;background:var(--fx-olive);border-color:var(--fx-olive);color:var(--fx-on)}\n#fxPanel input[type=range]{flex:1;min-width:90px;accent-color:var(--fx-olive)}\n.fxtrk{font-weight:700;color:var(--fx-deep);font-size:.92rem;line-height:1.4}\n.fxprog{height:4px;border-radius:4px;background:var(--fx-line);overflow:hidden;margin-top:8px}\n.fxprog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--fx-olive),var(--fx-amber))}\n.fxlist{display:grid;gap:4px;margin-top:8px}\n#fxPanel .fxlist button{border-radius:10px;text-align:left;display:flex;justify-content:space-between;gap:8px;white-space:normal;padding:6px 10px}\n#fxPanel .fxlist button small{color:var(--fx-soft);font-size:.74rem}\n#fxPanel .fxlist button.on{background:var(--fx-deep);color:var(--fx-on);border-color:var(--fx-deep)}\n#fxPanel .fxlist button.on small{color:inherit;opacity:.8}\n.fxkeys{color:var(--fx-soft);font-size:.76rem;line-height:1.7;padding-top:9px;border-top:1px solid var(--fx-line)}\n.fxkeys kbd{font:inherit;font-weight:700;border:1px solid var(--fx-line);border-bottom-width:2px;border-radius:5px;padding:0 5px;color:var(--fx-ink);background:var(--fx-bg)}\n#fxToast{position:fixed;left:50%;bottom:calc(80px + env(safe-area-inset-bottom,0px));transform:translateX(-50%) translateY(8px);z-index:45;background:var(--fx-deep);color:var(--fx-on);padding:8px 16px;border-radius:999px;font:500 .86rem/1.4 system-ui,\"Noto Sans TC\",sans-serif;opacity:0;pointer-events:none;transition:.22s}\n#fxToast.on{opacity:1;transform:translateX(-50%)}\n@media (prefers-reduced-motion:reduce){#fxToast{transition:none}}\n@media print{#fxLeaves,#fxHero,#fxPanel,#fxFab,#fxToast{display:none!important}}\n";document.head.appendChild(st);
document.body.insertAdjacentHTML('beforeend',"<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\" focusable=\"false\"><symbol id=\"fxMaple\" viewBox=\"10 0 100 118\"><path fill=\"currentColor\" d=\"M60.4,3.9 L63.2,16.2 L64.2,17.6 L67.6,14.2 L68.1,15.4 L68.0,26.3 L68.2,29.1 L69.6,35.9 L71.0,36.0 L78.9,29.9 L81.0,28.5 L86.3,25.8 L89.1,25.4 L102.1,25.5 L103.2,26.8 L97.0,35.3 L97.0,36.7 L102.7,37.6 L101.5,39.4 L87.8,50.0 L86.9,52.1 L94.5,54.6 L97.1,56.4 L106.1,65.3 L105.9,66.9 L95.6,68.3 L94.3,69.1 L96.3,72.8 L95.2,73.3 L86.2,73.2 L84.0,73.8 L79.1,77.8 L77.3,78.8 L70.1,81.8 L68.3,82.8 L64.1,86.4 L63.4,90.2 L63.4,110.8 L62.6,114.0 L57.4,114.0 L56.6,110.8 L56.6,90.2 L55.9,86.4 L51.7,82.8 L49.9,81.8 L42.7,78.8 L40.9,77.8 L36.0,73.8 L33.8,73.2 L24.8,73.3 L23.7,72.8 L25.7,69.1 L24.4,68.3 L14.1,66.9 L13.9,65.3 L22.9,56.4 L25.5,54.6 L33.1,52.1 L32.2,50.0 L18.5,39.4 L17.3,37.6 L23.0,36.7 L23.0,35.3 L16.8,26.8 L17.9,25.5 L30.9,25.4 L33.7,25.8 L39.0,28.5 L41.1,29.9 L49.0,36.0 L50.4,35.9 L51.8,29.1 L52.0,26.3 L51.9,15.4 L52.4,14.2 L55.8,17.6 L56.8,16.2 L59.6,3.9Z\"/><path fill=\"none\" stroke=\"rgba(70,20,5,.38)\" stroke-width=\"1.7\" stroke-linecap=\"round\" d=\"M60 104V12M60 82L100 30M60 82L20 30M60 84L103 67M60 84L17 67\"/></symbol></svg>\n<div id=\"fxLeaves\" aria-hidden=\"true\"></div>\n<div id=\"fxToast\" role=\"status\"></div>\n<button id=\"fxFab\" type=\"button\" title=\"秋日氛圍：女主角・音樂・楓葉\" aria-label=\"開啟秋日氛圍設定\" aria-expanded=\"false\" aria-controls=\"fxPanel\"><span aria-hidden=\"true\">🍁</span></button>\n<div id=\"fxPanel\" role=\"dialog\" aria-label=\"秋日氛圍設定\">\n  <h3><span>秋日氛圍</span><button class=\"x\" id=\"fxClose\" type=\"button\" aria-label=\"關閉面板\">✕</button></h3>\n\n  <div class=\"fxrow first\">\n    <div class=\"fxhd\"><b><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"7\" r=\"4.2\" fill=\"currentColor\"/><path d=\"M3.8 22c0-5.4 3.7-8.6 8.2-8.6s8.2 3.2 8.2 8.6z\" fill=\"currentColor\"/></svg>女主角巡場</b><label class=\"fx-sw\"><input type=\"checkbox\" id=\"fxHeroSw\" aria-label=\"女主角巡場\"><i></i></label></div>\n    <div class=\"fxsub\"><button type=\"button\" id=\"fxMeow\">跟她說話</button><span class=\"fxnote\" style=\"margin:0\">點她會說話，也能拎起來</span></div>\n    <div class=\"fxsub\"><span class=\"fxnote\" style=\"margin:0\">大小</span><input type=\"range\" id=\"fxHeroSize\" min=\"100\" max=\"380\" step=\"10\" aria-label=\"女主角大小\"><button type=\"button\" id=\"fxHeroSizeReset\">還原</button></div>\n  </div>\n\n  <div class=\"fxrow\">\n    <div class=\"fxhd\"><b><svg viewBox=\"10 0 100 118\" aria-hidden=\"true\"><use href=\"#fxMaple\"/></svg>楓葉飄落</b><label class=\"fx-sw\"><input type=\"checkbox\" id=\"fxLeafSw\" aria-label=\"楓葉飄落\"><i></i></label></div>\n    <div class=\"fxsub\"><span class=\"fx-seg\" id=\"fxLevel\" role=\"group\" aria-label=\"楓葉數量\"><button type=\"button\" data-l=\"0\">疏</button><button type=\"button\" data-l=\"1\">適中</button><button type=\"button\" data-l=\"2\">密</button></span><button type=\"button\" id=\"fxGust\">來一陣風</button></div>\n  </div>\n\n  <div class=\"fxrow\">\n    <div class=\"fxhd\"><b>古典音樂</b><span class=\"fxnote\" style=\"margin:0\" id=\"fxTrkNo\"></span></div>\n    <div class=\"fxtrk\" id=\"fxTrk\" style=\"margin-top:6px\"></div>\n    <div class=\"fxsub\"><button type=\"button\" class=\"round\" id=\"fxPrev\" aria-label=\"上一首\">⏮</button><button type=\"button\" class=\"round pri\" id=\"fxPlay\" aria-label=\"播放或暫停\">▶</button><button type=\"button\" class=\"round\" id=\"fxNext\" aria-label=\"下一首\">⏭</button><input type=\"range\" id=\"fxVol\" min=\"0\" max=\"100\" aria-label=\"音量\"></div>\n    <div class=\"fxprog\"><i id=\"fxBar\"></i></div>\n    <div class=\"fxsub\"><span class=\"fx-seg\" id=\"fxMode\" role=\"group\" aria-label=\"播放方式\"><button type=\"button\" data-m=\"seq\">順序</button><button type=\"button\" data-m=\"one\">單曲循環</button><button type=\"button\" data-m=\"rnd\">隨機</button></span></div>\n    <div class=\"fxlist\" id=\"fxList\"></div>\n    <div class=\"fxnote\">蕭邦為 Musopen 公有領域演奏錄音（Edward Neeman），其餘三首為公版樂曲、由程式即時合成。頁面上若有影片或其他音樂開始播放，這裡會自動暫停。</div>\n  </div>\n\n  <div class=\"fxkeys\"><kbd>M</kbd> 播放／暫停音樂 ・ <kbd>C</kbd> 女主角開關 ・ <kbd>Esc</kbd> 關閉面板<br>右上角保留日夜主題切換。</div>\n</div>\n\n");
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const CHOPIN_SRC='/audio/chopin-tristesse.mp3';
const KEY='physicslong-fx';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return{}}};
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const lg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},ls=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const S=Object.assign({leaves:lg('physics-maple')!=='off'&&!reduce,level:0,hero:!reduce,heroSize:0,vol:.45,track:0,mode:'one'},load());
if('cat' in S){if(!('hero' in load()))S.hero=S.cat;delete S.cat}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rnd=(a,b)=>a+Math.random()*(b-a);
const toast=m=>{const e=$('#fxToast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),1900)};

/* ---------- 開關與面板 ---------- */
const fab=$('#fxFab'),panel=$('#fxPanel');
const setPanel=o=>{panel.classList.toggle('open',o);fab.setAttribute('aria-expanded',o)};
fab.onclick=()=>setPanel(!panel.classList.contains('open'));
$('#fxClose').onclick=()=>setPanel(false);
document.addEventListener('pointerdown',e=>{if(panel.classList.contains('open')&&!panel.contains(e.target)&&!fab.contains(e.target))setPanel(false)});

/* ---------- 楓葉 ---------- */
const layer=$('#fxLeaves');
const COLORS=['#C4451C','#D55A1F','#E57A24','#EE9A33','#B3321E','#9A3A18','#D8A024'];
const COUNT=[9,16,28];
function leaf(o={}){
  const el=document.createElement('div');el.className='fxlf'+(o.once?' once':'');
  const small=innerWidth<600,sz=(o.sz||rnd(18,40))*(small?.78:1),x0=o.x0!==undefined?o.x0:rnd(-4,100),dur=o.dur||rnd(11,23);
  el.style.cssText=`--x0:${x0}vw;--x1:${x0+rnd(-10,24)}vw;--d:${dur}s;--delay:${o.delay!==undefined?o.delay:-Math.random()*dur}s;--sz:${sz}px;--c:${COLORS[Math.random()*COLORS.length|0]};--s:${rnd(2,4.6)}s;--f:${rnd(1.6,3.8)}s;--r0:${rnd(0,360)}deg;--r1:${rnd(-120,480)}deg`;
  el.innerHTML='<i><svg viewBox="10 0 100 118" aria-hidden="true"><use href="#fxMaple"/></svg></i>';
  if(o.once)el.addEventListener('animationend',e=>{if(e.target===el)el.remove()});
  return el;
}
function buildLeaves(){layer.textContent='';if(!S.leaves)return;for(let i=0;i<COUNT[S.level];i++)layer.append(leaf())}
function gust(){for(let i=0;i<26;i++)layer.append(leaf({once:true,dur:rnd(4.2,8),delay:rnd(0,1.4),sz:rnd(20,44)}))}

/* ---------- 3D 女主角（取代小貓；模型與引擎在 /heroine/，需要時才載入） ---------- */
const HERO_BASE='/heroine/';
let heroP=null;
const loadScript=src=>new Promise((ok,ng)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=()=>ng(new Error('load '+src));document.head.append(s)});
function loadHero(){
  if(!heroP)heroP=loadScript(HERO_BASE+'engine.js').then(()=>{window.__heroineSize=S.heroSize||0;return loadScript(HERO_BASE+'heroine.js')}).then(()=>window.__heroine.ready).catch(e=>{heroP=null;throw e});
  return heroP;
}
const showBubble=(t,ms)=>{if(window.__heroine)window.__heroine.say(t,ms)};
const react=t=>{if(S.hero&&window.__heroine)window.__heroine.react(t)};
function runHero(greet,delay=500){
  if(!S.hero){if(window.__heroine)window.__heroine.disable();return}
  loadHero().then(()=>{
    if(!S.hero)return;
    window.__heroine.enable();
    if(greet)setTimeout(()=>{if(S.hero&&!panel.classList.contains('open'))showBubble(greet,3200)},delay);
  }).catch(()=>{S.hero=false;heroSw.checked=false;toast('女主角載入失敗，已先關閉')});
}
const idle=f=>('requestIdleCallback' in window)?requestIdleCallback(f,{timeout:2500}):setTimeout(f,900);

/* ---------- 聲音引擎 ---------- */
let AC=null,master,comp,reverb;
function ctx(){
  if(AC)return AC;
  const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
  AC=new C();master=AC.createGain();master.gain.value=S.vol;
  comp=AC.createDynamicsCompressor();comp.threshold.value=-20;comp.ratio.value=4;
  master.connect(comp);comp.connect(AC.destination);
  const len=AC.sampleRate*2.2|0,buf=AC.createBuffer(2,len,AC.sampleRate);
  for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6)}
  reverb=AC.createConvolver();reverb.buffer=buf;const wet=AC.createGain();wet.gain.value=.3;reverb.connect(wet);wet.connect(master);
  return AC;
}
const mtof=m=>440*Math.pow(2,(m-69)/12);
function voice(bus,f,t,dur,vel){
  const o1=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),g2=AC.createGain(),lp=AC.createBiquadFilter();
  o1.type='triangle';o1.frequency.value=f;o2.type='sine';o2.frequency.value=f*2.003;g2.gain.value=.22;
  lp.type='lowpass';lp.frequency.value=Math.min(6500,f*7+900);lp.Q.value=.3;
  o1.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(bus);
  const a=vel*.34;
  g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(a,t+.006);
  g.gain.exponentialRampToValueAtTime(a*.42,t+.22);g.gain.exponentialRampToValueAtTime(.0001,t+dur+.9);
  o1.start(t);o2.start(t);o1.stop(t+dur+1);o2.stop(t+dur+1);
}

/* ---------- 公版古典樂（程式合成）---------- */
const NN={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const M=s=>{const r=/^([A-G])([#b]?)(-?\d)$/.exec(s);return NN[r[1]]+(r[2]==='#'?1:r[2]==='b'?-1:0)+12*(+r[3]+1)};
function parseLine(str,q,t0,ev,vel){let t=t0;str.trim().split(/\s+/).forEach(tok=>{const [n,d]=tok.split(':');const b=d?+d:1;ev.push([t,b*q*.95,M(n),vel]);t+=b*q});return t}
function tBach(){
  const bars=['C4 E4 G4 C5 E5','C4 D4 A4 D5 F5','B3 D4 G4 D5 F5','C4 E4 G4 C5 E5','C4 E4 A4 E5 A5','C4 D4 F#4 A4 D5','B3 D4 G4 D5 G5','B3 C4 E4 G4 C5','A3 C4 E4 G4 C5','D3 A3 D4 F#4 C5','G3 B3 D4 G4 B4','G3 Bb3 E4 G4 C#5','F3 A3 D4 A4 D5','F3 Ab3 D4 F4 B4','E3 G3 C4 G4 C5','E3 F3 A3 C4 F4','D3 F3 A3 C4 F4','G2 D3 G3 B3 F4'];
  const s=.17,ev=[];
  bars.forEach((b,i)=>{const n=b.split(' ').map(M),t0=i*16*s;if(n[0]-12>=M('C2'))ev.push([t0,16*s,n[0]-12,.7]);
    for(let h=0;h<2;h++)[n[0],n[1],n[2],n[3],n[4],n[2],n[3],n[4]].forEach((p,k)=>ev.push([t0+(h*8+k)*s,.9,p,k===0?.8:.6]))});
  const tf=bars.length*16*s;
  ['C2','C3','E3','G3','C4','E4','G4','C5'].forEach((n,k)=>ev.push([tf+k*.28,4.2,M(n),k?.55:.8]));
  return{ev,total:tf+6.5};
}
function tCanon(){
  const q=.56,ch=[['D3',['D4','F#4','A4'],'F#5',['F#5','A5','F#5','D5']],['A2',['C#4','E4','A4'],'E5',['E5','A5','E5','C#5']],['B2',['B3','D4','F#4'],'D5',['D5','F#5','D5','B4']],['F#2',['A3','C#4','F#4'],'C#5',['C#5','F#5','C#5','A4']],['G2',['G3','B3','D4'],'B4',['D5','G5','D5','B4']],['D3',['D4','F#4','A4'],'A4',['A4','D5','F#5','D5']],['G2',['B3','D4','G4'],'B4',['D5','G5','D5','B4']],['A2',['C#4','E4','A4'],'C#5',['C#5','E5','A5','E5']]];
  const plan=[0,1,2,2,1,0],ev=[];let t=0;
  plan.forEach(mode=>ch.forEach(c=>{
    ev.push([t,2*q,M(c[0]),.7],[t,2*q,M(c[0])+12,.3]);
    if(mode===0||mode===1)ev.push([t,2*q,M(c[2]),.55]);
    if(mode>=1){const a=c[1].map(M),seq=[a[0],a[1],a[2],a[1]];seq.forEach((p,k)=>ev.push([t+k*q/2,.6,p,.34]))}
    if(mode===2)c[3].forEach((p,k)=>ev.push([t+k*q/2,.55,M(p),.5]));
    t+=2*q}));
  ['D2','D3','A3','D4','F#4','A4','D5'].forEach((n,k)=>ev.push([t+k*.2,4,M(n),k?.5:.75]));
  return{ev,total:t+6};
}
function tOde(){
  const q=.52,ev=[],L1='E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4:1.5 D4:.5 D4:2',L2='E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4:1.5 C4:.5 C4:2',L3='D4 D4 E4 C4 D4 E4:.5 F4:.5 E4 C4 D4 E4:.5 F4:.5 E4 D4 C4 D4 G3:2';
  const roots=[['C','G','C','G'],['C','G','C','G'],['G','C','G','G'],['C','G','C','G']],lines=[L1,L2,L3,L2];
  const CH={C:['C2',['E3','G3','C4']],G:['G2',['D3','G3','B3']]};
  let t=0;
  lines.forEach((ln,i)=>{
    parseLine(ln,q,t,ev,.62);
    roots[i].forEach((r,b)=>{const t0=t+b*4*q,c=CH[r];ev.push([t0,2*q,M(c[0]),.6],[t0,2*q,M(c[0])+12,.4]);[1,3].forEach(k=>c[1].forEach(n=>ev.push([t0+k*q,q,M(n),.24])))});
    t+=16*q});
  ['C3','G3','C4','E4','G4'].forEach((n,k)=>ev.push([t+k*.18,3.5,M(n),k?.5:.7]));
  return{ev,total:t+5.5};
}
function tMinuet(){
  const q=.46,A=['D5 G4:.5 A4:.5 B4:.5 C5:.5','D5 G4 G4','E5 C5:.5 D5:.5 E5:.5 F#5:.5','G5 G4 G4','C5 D5:.5 C5:.5 B4:.5 A4:.5','B4 C5:.5 B4:.5 A4:.5 G4:.5','A4 B4:.5 A4:.5 G4:.5 F#4:.5','G4:3'];
  const CH={G:['G3',['B3','D4']],C:['C3',['E4','G4']],D:['D3',['A3','D4','F#4']]},prog=['G','G','C','G','C','G','D','G'];
  const ev=[];let t=0;
  for(let rep=0;rep<3;rep++){A.forEach((b,i)=>{parseLine(b,q,t,ev,.64);const c=CH[prog[i]];ev.push([t,1.6*q,M(c[0]),.55]);if(i<7)[1,2].forEach(k=>c[1].forEach(n=>ev.push([t+k*q,q,M(n),.22])));t+=3*q})}
  ['G2','G3','B3','D4','G4'].forEach((n,k)=>ev.push([t+k*.18,3.5,M(n),k?.5:.7]));
  return{ev,total:t+5.5};
}
const TRACKS=[
  {name:'前奏曲 C 大調 BWV 846',by:'巴赫（1722）',build:tBach},
  {name:'加農 D 大調（簡化改編）',by:'帕海貝爾（約 1680）',build:tCanon},
  {name:'歡樂頌',by:'貝多芬（1824）',build:tOde},
  {name:'G 大調小步舞曲（改編）',by:'佩措爾德（約 1725，舊傳為巴赫作）',build:tMinuet}
];
TRACKS.unshift({name:'練習曲 Op.10 No.3「離別」',by:'蕭邦（1832）・Edward Neeman 演奏',file:true});
S.track=clamp(+S.track||0,0,TRACKS.length-1);
let playing=false,tk=null,evIdx=0,startAt=0,bus=null,tick=0,pos=0,fa=null;
const isFile=()=>!!TRACKS[S.track].file;
function stopBus(){if(bus){const b=bus;b.gain.cancelScheduledValues(AC.currentTime);b.gain.setTargetAtTime(0,AC.currentTime,.06);setTimeout(()=>{try{b.disconnect()}catch(e){}},700);bus=null}}
function stopAll(){clearInterval(tick);if(fa){try{fa.pause();fa.currentTime=0}catch(e){}}if(AC&&bus)stopBus();tk=null;pos=0;$('#fxBar').style.width='0%'}
/* 蕭邦音檔：優先用上面的 CHOPIN_SRC；沒填就找頁面上現有的 <audio>；再不行就試幾個常見檔名 */
async function findChopin(){return CHOPIN_SRC}
async function loadFile(){
  if(fa)return true;
  const src=await findChopin();
  if(!src){toast('找不到蕭邦音檔');return false}
  fa=new Audio(src);fa.preload='metadata';fa.volume=S.vol;
  fa.addEventListener('ended',()=>{if(S.mode==='one'){fa.currentTime=0;fa.play()}else{startTrack(nextIndex());play()}});
  fa.addEventListener('timeupdate',()=>{if(fa.duration)$('#fxBar').style.width=clamp(fa.currentTime/fa.duration*100,0,100)+'%'});
  fa.addEventListener('error',()=>{fa=null;playing=false;uiPlay();toast('蕭邦音檔載入失敗')});
  return true;
}
function startTrack(i){
  S.track=(i+TRACKS.length)%TRACKS.length;save();stopAll();
  if(!isFile()){
    const c=ctx();if(!c)return;
    tk=TRACKS[S.track].build();tk.ev.sort((a,b)=>a[0]-b[0]);evIdx=0;
    bus=c.createGain();bus.connect(master);bus.connect(reverb);startAt=c.currentTime+.15;
  }
  uiTrack();
}
function nextIndex(){
  if(S.mode==='one')return S.track;
  if(S.mode==='rnd'&&TRACKS.length>1){let n;do{n=Math.random()*TRACKS.length|0}while(n===S.track);return n}
  return S.track+1;
}
function pump(){
  if(!AC||!tk||!bus)return;const now=AC.currentTime;
  while(evIdx<tk.ev.length&&startAt+tk.ev[evIdx][0]<now+.7){const e=tk.ev[evIdx++];voice(bus,mtof(e[2]),startAt+e[0],e[1],e[3])}
  $('#fxBar').style.width=clamp((now-startAt)/tk.total*100,0,100)+'%';
  if(now>startAt+tk.total){startTrack(nextIndex());if(playing)tick=setInterval(pump,120)}
}
function pauseOthers(){$$('audio,video').forEach(m=>{if(!m.paused)try{m.pause()}catch(e){}})}
async function play(){
  pauseOthers();
  if(isFile()){
    if(!await loadFile())return;
    fa.volume=S.vol;
    try{await fa.play()}catch(e){toast('無法播放，請再點一次');return}
    playing=true;uiPlay();return;
  }
  const c=ctx();if(!c)return toast('這個瀏覽器不支援音樂播放');
  c.resume();
  if(!tk)startTrack(S.track);
  else if(!bus){
    bus=c.createGain();bus.connect(master);bus.connect(reverb);startAt=c.currentTime+.12-pos;
    evIdx=tk.ev.findIndex(e=>e[0]>=pos-.01);if(evIdx<0)evIdx=tk.ev.length;
  }
  playing=true;clearInterval(tick);tick=setInterval(pump,120);pump();uiPlay();
}
function pause(){
  if(!playing)return;playing=false;
  if(isFile()){if(fa)fa.pause()}
  else if(AC){clearInterval(tick);pos=Math.max(0,AC.currentTime-startAt);stopBus()}
  uiPlay();
}
function toggleMusic(){if(playing){pause();ls('physics-music','off')}else{ls('physics-music','on');play()}}
function uiPlay(){$('#fxPlay').textContent=playing?'❚❚':'▶';fab.classList.toggle('playing',playing)}
function uiTrack(){
  const t=TRACKS[S.track];$('#fxTrk').textContent=t.name+'　'+t.by;$('#fxTrkNo').textContent=(S.track+1)+' / '+TRACKS.length;
  $$('#fxList button').forEach((b,i)=>b.classList.toggle('on',i===S.track));
}
function uiMode(){$$('#fxMode button').forEach(b=>b.classList.toggle('on',b.dataset.m===S.mode))}
$('#fxList').innerHTML=TRACKS.map((t,i)=>`<button type="button" data-i="${i}"><span>${t.name}</span><small>${t.by.split('（')[0]}</small></button>`).join('');
$('#fxList').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;startTrack(+b.dataset.i);play()});
$('#fxMode').addEventListener('click',e=>{const m=e.target.dataset?.m;if(!m)return;S.mode=m;save();uiMode()});
$('#fxPlay').onclick=toggleMusic;
$('#fxNext').onclick=()=>{startTrack(S.mode==='one'?S.track+1:nextIndex());play()};
$('#fxPrev').onclick=()=>{startTrack(S.track-1);play()};
const vol=$('#fxVol');vol.value=Math.round(S.vol*100);
vol.oninput=()=>{S.vol=vol.value/100;if(master)master.gain.setTargetAtTime(S.vol,AC.currentTime,.03);if(fa)fa.volume=S.vol;save()};
/* 頁面上的影片（例如動態影像）開始播放時暫停音樂，影片停止後自動接著播 */
let resumeAfter=false;
document.addEventListener('play',e=>{if(/^(AUDIO|VIDEO)$/.test(e.target.tagName)&&playing){resumeAfter=true;pause()}},true);
['pause','ended'].forEach(ev=>document.addEventListener(ev,e=>{if(resumeAfter&&/^(AUDIO|VIDEO)$/.test(e.target.tagName)){resumeAfter=false;play()}},true));

/* ---------- 面板綁定 ---------- */
const leafSw=$('#fxLeafSw'),heroSw=$('#fxHeroSw');
leafSw.checked=S.leaves;heroSw.checked=S.hero;
leafSw.onchange=()=>{S.leaves=leafSw.checked;ls('physics-maple',S.leaves?'on':'off');save();buildLeaves()};
heroSw.onchange=()=>{S.hero=heroSw.checked;save();runHero('我回來囉～',300)};
const lv=$('#fxLevel');
const lvUi=()=>$$('button',lv).forEach(b=>b.classList.toggle('on',+b.dataset.l===S.level));
lv.onclick=e=>{const l=e.target.dataset?.l;if(l===undefined)return;S.level=+l;S.leaves=true;leafSw.checked=true;save();lvUi();buildLeaves()};
$('#fxGust').onclick=gust;
$('#fxMeow').onclick=()=>react();
const sizeEl=$('#fxHeroSize'),defSize=()=>innerWidth<600?170:230;
sizeEl.value=S.heroSize||defSize();
const applySize=()=>{if(window.__heroine)window.__heroine.setSize(S.heroSize)};
sizeEl.oninput=()=>{S.heroSize=+sizeEl.value;save();applySize()};
$('#fxHeroSizeReset').onclick=()=>{S.heroSize=0;sizeEl.value=defSize();save();applySize()};
addEventListener('keydown',e=>{
  if(e.ctrlKey||e.metaKey||e.altKey)return;
  const k=e.key,a=document.activeElement||{};
  if(k==='Escape'){if(panel.classList.contains('open'))setPanel(false);return}
  if(a.tagName==='TEXTAREA'||a.tagName==='SELECT'||a.isContentEditable||(a.tagName==='INPUT'&&/^(text|number|search|email|url|)$/.test(a.type||'')))return;
  if(document.querySelector('[role="dialog"][aria-modal="true"]'))return;
  if(k==='m'||k==='M'){e.preventDefault();toggleMusic()}
  else if(k==='c'||k==='C'){e.preventDefault();heroSw.checked=!S.hero;heroSw.onchange()}
});

/* ---------- 啟動 ---------- */
if(lg('physics-music')!=='off'){
  const first=e=>{
    if(e.target&&e.target.closest&&e.target.closest('#fxPanel,#fxFab'))return;
    removeEventListener('pointerdown',first);removeEventListener('keydown',first);
    if(!playing&&lg('physics-music')!=='off')play();
  };
  addEventListener('pointerdown',first);addEventListener('keydown',first);
}
lvUi();uiMode();uiTrack();uiPlay();buildLeaves();
if(S.hero)idle(()=>runHero('歡迎來到 physics long～',600));
})();
})();
