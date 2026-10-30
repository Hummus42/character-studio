/* Everspire: the Headmaster, small flourishes. A gilded ascension ceremony over the reading sheet, a hub glow that follows your highest tier,
   moments you can start from a girl's popup on the map, and a dark parchment option for reading at night. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.ui)return;
const H=ACAD.head,U=H.ui,PT=H.PT;
const root=()=>document.getElementById("evRoot");
const css=`
.evfx{position:fixed;inset:0;z-index:99;display:flex;align-items:center;justify-content:center;pointer-events:none;animation:evfxIn .5s ease-out both;background:radial-gradient(circle at 50% 50%,var(--c1a) 0,#050414cc 60%)}
.evfx.out{animation:evfxOut .8s ease-in both}
.evfx .ring{position:absolute;width:min(70vw,360px);height:min(70vw,360px);border-radius:50%;border:2px solid var(--c1);box-shadow:0 0 40px var(--c1),inset 0 0 40px var(--c2);animation:evfxSpin 2.4s linear infinite;border-style:dashed}
.evfx .ring.b{width:min(52vw,270px);height:min(52vw,270px);animation-direction:reverse;border-style:solid;opacity:.7}
.evfx .txt{position:relative;text-align:center;font-family:Cinzel,Georgia,serif;color:#fff6dc;text-shadow:0 0 18px var(--c1);animation:evfxRise 1.4s ease-out both}
.evfx .txt b{display:block;font-size:30px;letter-spacing:.14em;color:var(--c1)}
.evfx .txt i{display:block;font-style:normal;font-size:15px;opacity:.85;margin-top:6px}
.evfx .mote{position:absolute;width:5px;height:5px;border-radius:50%;background:var(--c1);box-shadow:0 0 8px var(--c1);animation:evfxMote 2.4s ease-out both}
@keyframes evfxIn{from{opacity:0}to{opacity:1}}@keyframes evfxOut{to{opacity:0}}
@keyframes evfxSpin{to{transform:rotate(360deg)}}
@keyframes evfxRise{from{opacity:0;transform:translateY(18px) scale(.94)}to{opacity:1;transform:none}}
@keyframes evfxMote{from{opacity:1;transform:translate(0,0)}to{opacity:0;transform:translate(var(--dx),var(--dy))}}
#evRoot[data-amb] .hub{background-image:radial-gradient(ellipse at 50% -10%,var(--amb,#0000) 0,transparent 60%)}
#evRoot[data-amb="3"] .hub::after,#evRoot[data-amb="4"] .hub::after{content:"";position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(1.5px 1.5px at 20% 30%,var(--amb) 50%,transparent),radial-gradient(1.5px 1.5px at 70% 60%,var(--amb) 50%,transparent),radial-gradient(1.5px 1.5px at 45% 80%,var(--amb) 50%,transparent),radial-gradient(1.5px 1.5px at 85% 20%,var(--amb) 50%,transparent);opacity:.7;animation:evTwinkle 5s ease-in-out infinite}
#evRoot[data-amb="4"] .hub::after{background-image:radial-gradient(2px 2px at 20% 30%,var(--amb) 50%,transparent),radial-gradient(2px 2px at 70% 60%,var(--amb2) 50%,transparent),radial-gradient(2px 2px at 45% 80%,var(--amb) 50%,transparent),radial-gradient(2px 2px at 85% 20%,var(--amb2) 50%,transparent),radial-gradient(1.5px 1.5px at 10% 70%,var(--amb2) 50%,transparent),radial-gradient(1.5px 1.5px at 60% 15%,var(--amb) 50%,transparent)}
@keyframes evTwinkle{0%,100%{opacity:.25}50%{opacity:.85}}
#evRoot .mbtn{margin-left:2px}
#evRoot[data-parch=dark][data-theme=moon] .sheet{background:#1c1838;color:#e9e2cc;border-color:#8a7433}
#evRoot[data-parch=dark][data-theme=moon] .sheet h2{color:#e8c777}
#evRoot[data-parch=dark][data-theme=moon] .sheet h3{color:#cdb67a;border-bottom-color:#4d4222}
#evRoot[data-parch=dark][data-theme=moon] .sheet .mut{color:#a9a2bd}
#evRoot[data-parch=dark][data-theme=moon] .sheet button{background:#26204a;color:#e9e2cc;border-color:#6b5a2e}
#evRoot[data-parch=dark][data-theme=moon] .sheet button:hover:not(:disabled){background:#312a5e;border-color:#d8b25a}
#evRoot[data-parch=dark][data-theme=moon] .sheet button.pri{background:#d8b25a;color:#1a1303;border-color:#d8b25a}
#evRoot[data-parch=dark][data-theme=moon] .sheet .card,#evRoot[data-parch=dark][data-theme=moon] .sheet .pc{background:#221d44;border-color:#4d4222}
#evRoot[data-parch=dark][data-theme=moon] .sheet .pc .nm{color:#e9e2cc}
#evRoot[data-parch=dark][data-theme=moon] .sheet .bubble{background:#171442;border-left-color:#d8b25a;color:#e9e2cc}
#evRoot[data-parch=dark][data-theme=moon] .sheet .chip{background:#171442;border-color:#5d4e28;color:#cfc8e2}
#evRoot[data-parch=dark][data-theme=moon] .sheet .chip.hot{color:#d8b25a;border-color:#d8b25a}
#evRoot[data-parch=dark][data-theme=moon] .sheet .bar{background:#0b0a24;border-color:#3d3519}
#evRoot[data-parch=dark][data-theme=moon] .sheet .bar>i{background:#d8b25a}
#evRoot[data-parch=dark][data-theme=moon] .sheet .req{color:#e9e2cc}
#evRoot[data-parch=dark][data-theme=moon] .sheet input,#evRoot[data-parch=dark][data-theme=moon] .sheet select{background:#171442;color:#e9e2cc;border-color:#5d4e28}
#evRoot[data-parch=dark][data-theme=moon] .sheet .up{color:#7fd89a}#evRoot[data-parch=dark][data-theme=moon] .sheet .down{color:#f08a8a}
@media(prefers-reduced-motion:reduce){.evfx,.evfx .ring,.evfx .txt,.evfx .mote,#evRoot[data-amb] .hub::after{animation:none!important}}`;
function addCss(){if(document.getElementById("evFxCss"))return;const st=document.createElement("style");st.id="evFxCss";st.textContent=css;document.head.append(st)}

/* the ascension ceremony: a ring of light in her tier colours, a title, a chime */
U.flourish=(h,ti)=>{try{addCss();const r=root(),t=PT[ti];if(!r||!t)return;const ov=document.createElement("div");ov.className="evfx";ov.style.setProperty("--c1",t.col);ov.style.setProperty("--c1a",t.col+"44");ov.style.setProperty("--c2",t.col2+"66");
  ov.innerHTML='<div class="ring"></div><div class="ring b"></div><div class="txt"><b></b><i></i></div>';
  ov.querySelector("b").textContent=t.name.toUpperCase();ov.querySelector("i").textContent=(ACAD.head.fillText?ACAD.head.fillText("{n}",h):h)+" ascends";
  for(let i=0;i<22;i++){const m=document.createElement("span");m.className="mote";const a=Math.random()*6.283,d=90+Math.random()*150;m.style.setProperty("--dx",Math.cos(a)*d+"px");m.style.setProperty("--dy",Math.sin(a)*d+"px");m.style.animationDelay=(Math.random()*.6)+"s";ov.append(m)}
  r.append(ov);if(ACAD.sfx)ACAD.sfx.play(ti>=4?"fanfare":"chime");setTimeout(()=>ov.classList.add("out"),2300);setTimeout(()=>ov.remove(),3200)}catch(e){}};

/* hub glow that follows her highest tier */
let amb=-1;
function ambience(){try{const r=root(),a=U.api;if(!r||!a)return;const S=a.S&&a.S();if(!S||!S.girls){if(r.hasAttribute("data-amb")){r.removeAttribute("data-amb");amb=-1}return}
  let top=0;S.order.forEach(h=>{const g=S.girls[h];if(g&&g.tier>top)top=g.tier});
  if(top===amb&&r.getAttribute("data-amb")===String(top))return;amb=top;
  if(top<1){r.removeAttribute("data-amb");return}
  addCss();const t=PT[top];r.setAttribute("data-amb",top);r.style.setProperty("--amb",t.col+"2e");r.style.setProperty("--amb2",t.col2+"cc")}catch(e){}}
setInterval(ambience,2500);

/* dark parchment option, next to the look switch on the title screen */
const PK="everspire.parch";let parch="light";try{parch=localStorage.getItem(PK)==="dark"?"dark":"light"}catch(e){}
function applyParch(){const r=root();if(!r)return;if(parch==="dark")r.setAttribute("data-parch","dark");else r.removeAttribute("data-parch")}
function paintParch(){const r=root(),f=r&&r.querySelector(".title .foot .evtheme");if(!f||f.querySelector(".evparch"))return;
  const b=document.createElement("button");b.type="button";b.className="evparch";b.textContent="Pages: "+(parch==="dark"?"dark":"parchment");b.onclick=ev=>{ev.stopPropagation();parch=parch==="dark"?"light":"dark";try{localStorage.setItem(PK,parch)}catch(e){}applyParch();b.textContent="Pages: "+(parch==="dark"?"dark":"parchment")};f.append(b)}
setInterval(()=>{applyParch();paintParch()},900);
addCss();
})();
