/* Everspire: the game's look. "Moonlit" (default) is deep indigo with gold line-work, arched portraits and outline cards, with parchment panels and a reading serif for scenes, results and anything you read.
   "Classic" is the earlier navy-block look. The theme is a data attribute on #evRoot, kept in localStorage, and switched from the title screen. Fonts load from Google Fonts and fall back to Georgia. */
(function(){
"use strict";
if(typeof ACAD==="undefined")return;
const KEY="everspire.theme",THEMES=["moon","classic"];
let cur="moon";try{const t=localStorage.getItem(KEY);if(THEMES.includes(t))cur=t}catch(e){}
const css=`
#evRoot[data-theme=moon]{--g-card:#171442;--g-line:#5d4e28;--g-gold:#d8b25a;--g-mut:#b8b2cf;background:#0f0d2e;font-family:"EB Garamond",Georgia,serif;font-size:17px}
#evRoot[data-theme=moon] h2,#evRoot[data-theme=moon] h3,#evRoot[data-theme=moon] .brand,#evRoot[data-theme=moon] .logo,#evRoot[data-theme=moon] .hroom .nm,#evRoot[data-theme=moon] .menu button{font-family:Cinzel,Georgia,serif;font-weight:500}
#evRoot[data-theme=moon] .logo{font-weight:600;letter-spacing:.22em}
#evRoot[data-theme=moon] button{background:transparent;border:1px solid #6b5a2e;border-radius:18px;font-family:inherit;transition:border-color .2s,background .2s,color .2s}
#evRoot[data-theme=moon] button:hover:not(:disabled){border-color:#d8b25a;background:#d8b25a14}
#evRoot[data-theme=moon] button.pri{background:#d8b25a;color:#1a1303;border-color:#d8b25a}
#evRoot[data-theme=moon] button.pri:hover:not(:disabled){background:#e6c577}
#evRoot[data-theme=moon] button.sm{border-radius:14px}
#evRoot[data-theme=moon] .menu button{background:#0f0d2eb3;border-radius:4px;border-color:#8a7433;letter-spacing:.05em}
#evRoot[data-theme=moon] .menu button.pri{background:#d8b25a}
#evRoot[data-theme=moon] .card{background:#ffffff08;border:1px solid #5d4e28;border-radius:6px}
#evRoot[data-theme=moon] .top{background:#0b0a24;border-bottom:1px solid #6b5a2e}
#evRoot[data-theme=moon] .pill{background:transparent;border-color:#6b5a2e;border-radius:16px;font-size:14px}
#evRoot[data-theme=moon] .pill .ico{display:inline-flex;vertical-align:-3px;margin-right:5px;color:#d8b25a}
#evRoot[data-theme=moon] .musebar{display:inline-flex;gap:5px;align-items:center}
#evRoot[data-theme=moon] .mf{width:30px;height:36px;border:2px solid #8b8ba2;border-radius:15px 15px 4px 4px;overflow:hidden;background:#171442;cursor:pointer;display:inline-flex;align-items:flex-end;justify-content:center}
#evRoot[data-theme=moon] .mf img{width:100%;height:auto}
#evRoot[data-theme=moon] .tabs{border-bottom:1px solid #4d4222;gap:2px}
#evRoot[data-theme=moon] .tabs button{border:0;border-bottom:2px solid transparent;border-radius:0;background:transparent;font-family:Cinzel,Georgia,serif;font-size:13px;letter-spacing:.04em}
#evRoot[data-theme=moon] .tabs button.on{border-bottom-color:#d8b25a;color:#d8b25a;background:transparent}
#evRoot[data-theme=moon] .right{background:#121038;border:1px solid #4d4222;border-radius:10px}
#evRoot[data-theme=moon] .hroom{background:transparent;border:0;border-bottom:1px solid #3d3519;border-radius:0;padding:10px 4px;margin:0}
#evRoot[data-theme=moon] .hroom.view{border:1px solid #d8b25a;border-radius:6px;padding:10px}
#evRoot[data-theme=moon] .pips i{border-color:#6b5a2e}#evRoot[data-theme=moon] .pips i.on{background:#d8b25a;border-color:#d8b25a}
#evRoot[data-theme=moon] .pips b{animation:evGlint 2.6s ease-in-out infinite}
#evRoot[data-theme=moon] .chip{background:transparent;border-color:#5d4e28;color:#b8b2cf}#evRoot[data-theme=moon] .chip.hot{border-color:#d8b25a;color:#d8b25a}
#evRoot[data-theme=moon] .bar{background:#0b0a24;border:1px solid #3d3519}#evRoot[data-theme=moon] .bar>i{background:#d8b25a}
#evRoot[data-theme=moon] .pc{border-radius:46px 46px 8px 8px;padding-top:14px}
#evRoot[data-theme=moon] .pgrid.compact .pc{border-radius:32px 32px 6px 6px;padding-top:10px}
#evRoot[data-theme=moon] .plist .pc{border-radius:10px;padding-top:6px}
#evRoot[data-theme=moon] .bubble{background:#0b0a24;border-left-color:#d8b25a}
#evRoot[data-theme=moon] .overlay{background:#050414e6}
#evRoot[data-theme=moon] .says,#evRoot[data-theme=moon] .hsay{background:#d8b25a14}
#evRoot[data-theme=moon] .sheet{background:#f2e8cb;color:#3a2a14;border:3px double #a8802f;border-radius:4px;font-size:18px;line-height:1.55;animation:evRise .3s ease-out}
#evRoot[data-theme=moon] .sheet h2{color:#7c2a2a;letter-spacing:.04em}
#evRoot[data-theme=moon] .sheet h3{color:#5a3f12;border-bottom:1px solid #c9b27a;padding-bottom:3px}
#evRoot[data-theme=moon] .sheet .mut{color:#7a6648}
#evRoot[data-theme=moon] .sheet button{background:#e6d6ad;color:#3a2a14;border:1px solid #a8802f;border-radius:3px}
#evRoot[data-theme=moon] .sheet button:hover:not(:disabled){background:#dcc88f;border-color:#7c5a16}
#evRoot[data-theme=moon] .sheet button.pri{background:#7c2a2a;color:#f6eed9;border-color:#4e1a1a}
#evRoot[data-theme=moon] .sheet button.pri:hover:not(:disabled){background:#923232}
#evRoot[data-theme=moon] .sheet .card{background:#f8f0db;border:1px solid #c9b27a;border-radius:3px}
#evRoot[data-theme=moon] .sheet .bubble{background:#efe3c3;border-left:3px solid #a8802f;color:#3a2a14}
#evRoot[data-theme=moon] .sheet .chip{background:#efe3c3;border-color:#c9b27a;color:#5a4628}#evRoot[data-theme=moon] .sheet .chip.hot{color:#7c2a2a;border-color:#a8802f}
#evRoot[data-theme=moon] .sheet .chip.up{color:#2f6a37}#evRoot[data-theme=moon] .sheet .chip.down,#evRoot[data-theme=moon] .sheet .down{color:#9a2d2d}#evRoot[data-theme=moon] .sheet .up{color:#2f6a37}
#evRoot[data-theme=moon] .sheet .bar{background:#dccaa0;border-color:#c9b27a}#evRoot[data-theme=moon] .sheet .bar>i{background:#a8802f}
#evRoot[data-theme=moon] .sheet .pc{background:#f8f0db}#evRoot[data-theme=moon] .sheet .pc .nm{color:#3a2a14}
#evRoot[data-theme=moon] .sheet .req{color:#3a2a14}
#evRoot[data-theme=moon] .sheet input,#evRoot[data-theme=moon] .sheet select{background:#fbf5e4;color:#3a2a14;border-color:#c9b27a}
#evRoot[data-theme=moon] .sheet .scenebig>img,#evRoot[data-theme=moon] .sheet .gcard img{border-color:#a8802f}
#evRoot .evtheme{margin-top:6px;font:13px "EB Garamond",Georgia,serif;color:#b3ab94}
#evRoot .evtheme button{font:inherit;font-size:13px;padding:2px 10px;margin-left:6px}
@keyframes evRise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes evGlint{0%,100%{opacity:.75}50%{opacity:1;text-shadow:0 0 6px #ffd24a}}
@media(prefers-reduced-motion:reduce){#evRoot[data-theme=moon] .sheet,#evRoot[data-theme=moon] .pips b{animation:none}}
@media(max-width:480px){#evRoot[data-theme=moon]{font-size:16px}#evRoot[data-theme=moon] .pill{font-size:12.5px}#evRoot[data-theme=moon] .tabs button{font-size:12px}#evRoot[data-theme=moon] .sheet{font-size:17px}}`;
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>setTimeout(refit,50));
function fonts(){if(document.getElementById("evFonts"))return;const l=document.createElement("link");l.id="evFonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&family=EB+Garamond:wght@400;500&display=swap";document.head.append(l)}
const refit=()=>{try{const a=ACAD.head&&ACAD.head.ui&&ACAD.head.ui.api;if(a&&a.fitHub)a.fitHub()}catch(e){}};
function apply(root){if(root)root.setAttribute("data-theme",cur);refit();requestAnimationFrame(refit)}
function set(t){if(!THEMES.includes(t))return;cur=t;try{localStorage.setItem(KEY,t)}catch(e){}apply(document.getElementById("evRoot"));paintToggle()}
function paintToggle(){const f=document.querySelector("#evRoot .title .foot");if(!f)return;let b=f.querySelector(".evtheme");if(!b){b=document.createElement("div");b.className="evtheme";f.append(b)}
  b.textContent="Look: "+(cur==="moon"?"Moonlit":"Classic");const btn=document.createElement("button");btn.type="button";btn.textContent="Switch to "+(cur==="moon"?"Classic":"Moonlit");btn.onclick=ev=>{ev.stopPropagation();set(cur==="moon"?"classic":"moon")};b.append(btn)}
function start(){const st=document.createElement("style");st.id="evThemeCss";st.textContent=css;document.head.append(st);fonts();
  const watch=()=>{const r=document.getElementById("evRoot");if(!r)return false;apply(r);new MutationObserver(()=>{if(r.getAttribute("data-theme")!==cur)apply(r);paintToggle()}).observe(r,{childList:true,subtree:false,attributes:true,attributeFilter:["data-theme"]});paintToggle();return true};
  if(!watch()){const iv=setInterval(()=>{if(watch())clearInterval(iv)},120);setTimeout(()=>clearInterval(iv),8000)}}
ACAD.evTheme={set,get:()=>cur,THEMES};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
