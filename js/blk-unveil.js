/* ---- v301: The Seal. Behind every Academy girl's Encyclopedia portrait hangs a second painting: the same girl from
   the same House robes prompt with the outfit cleared (the studio's "Character only" nude). A wax seal in her House colours sits on the portrait's
   frame. Press and hold it to melt the wax; when it cracks, her robes slide away down the frame and the painting
   beneath shows. Hold the broken seal again and the robes rise back. The first unveiling asks once for 18+
   confirmation (every Academy girl is 18 or older; kept in this browser). The nude art is only fetched after that.
   Once she is unveiled, "Load her unveiled" opens the House robes look in the studio on its Nude outfit. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.buildHouse||typeof ACAD==="undefined")return;
  const KEY="ev_unveil18";let ok=false;
  try{ok=localStorage.getItem(KEY)==="1"}catch(e){}
  /* never for anyone under 18 by her biography (ACAD.isMinor), and only where the art exists */
  /* v302: the hidden painting is now her own portrait unclothed: the House robes prompt in the studio's Character only
     mode (the outfit replaced by her intimate details, same standing pose), same seed and settings as the portrait, so
     it lines up with the portrait above it (assets/unveil/<house>.webp, listed in UNVEIL_ART by data-unveil.js). */
  const ART=window.UNVEIL_ART;
  const has=h=>!(ACAD.isMinor&&ACAD.isMinor(h))&&!!(ART&&ART.has(h));
  const url=h=>"assets/unveil/"+h+".webp";
  const reduce=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
  const HOLD=1200;
  const css=document.createElement("style");
  css.textContent=`
.uv-frame{position:relative;overflow:hidden;border-radius:6px;background:#fff;line-height:0;user-select:none;-webkit-user-select:none}
.uv-frame img{display:block;width:100%;height:auto}
.uv-frame .uv-bare{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 0;background:#fff;opacity:1}
.uv-frame .uv-robe{position:relative;z-index:1;transition:clip-path 1.15s cubic-bezier(.6,.05,.3,1);clip-path:inset(0 0 0 0)}
.uv-frame.open .uv-bare{opacity:1}
.uv-frame.open .uv-robe{clip-path:inset(100% 0 0 0)}
.uv-frame.open .uv-robe.instant,.uv-frame .uv-robe.instant{transition:none}
.uv-silk{position:absolute;left:0;right:0;top:-12%;height:12%;z-index:2;pointer-events:none;opacity:0;
  background:linear-gradient(180deg,rgba(255,255,255,0),rgba(255,240,245,.55) 60%,rgba(255,255,255,0))}
.uv-frame.falling .uv-silk{animation:uvSilk 1.15s cubic-bezier(.6,.05,.3,1) forwards}
@keyframes uvSilk{0%{top:-12%;opacity:.9}100%{top:100%;opacity:0}}
.uv-seal{position:absolute;right:10px;bottom:10px;z-index:3;width:54px;height:54px;border-radius:50%;border:0;padding:0;cursor:pointer;
  background:none;filter:drop-shadow(0 4px 5px rgba(0,0,0,.45)) drop-shadow(0 1px 1px rgba(0,0,0,.5));
  color:var(--uv-dk);font:italic 700 21px/54px Georgia,"Times New Roman",serif;
  text-shadow:0 1px 0 rgba(255,235,205,.45),0 -1px 0 rgba(0,0,0,.45);touch-action:none;transition:transform .15s,filter .15s}
.uv-seal:hover{filter:drop-shadow(0 6px 8px rgba(0,0,0,.5)) drop-shadow(0 1px 1px rgba(0,0,0,.5))}
.uv-seal .uv-l::after,.uv-seal .uv-r::after{content:"";position:absolute;inset:0;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse 30% 18% at 33% 24%,rgba(255,255,255,.55),rgba(255,255,255,0) 70%),
    radial-gradient(circle 2.5px at 30% 22%,rgba(255,255,255,.9),rgba(255,255,255,0)),
    radial-gradient(ellipse 60% 40% at 70% 85%,rgba(255,220,180,.18),rgba(255,255,255,0) 70%)}
.uv-seal:hover{transform:scale(1.06)}
.uv-seal:focus-visible{outline:3px solid #f5c542;outline-offset:3px}
.uv-seal .uv-ring{position:absolute;inset:-5px;border-radius:50%;pointer-events:none;
  background:conic-gradient(rgba(255,214,120,.95) calc(var(--p,0)*1turn),transparent 0);
  -webkit-mask:radial-gradient(circle,transparent 29px,#000 30px);mask:radial-gradient(circle,transparent 29px,#000 30px)}
.uv-seal .uv-l,.uv-seal .uv-r{position:absolute;inset:0;border-radius:50%;
  background:var(--uv-fil) center/100% 100% no-repeat,radial-gradient(circle at 35% 30%,var(--uv-hi),var(--uv-wax) 55%,var(--uv-dk));
  box-shadow:inset 0 -3px 6px rgba(0,0,0,.35),inset 0 2px 2px rgba(255,255,255,.18),0 0 0 1px rgba(0,0,0,.18);transition:transform .5s ease,opacity .5s ease}
.uv-seal .uv-l{clip-path:polygon(0 0,52% 0,44% 38%,56% 60%,46% 100%,0 100%)}
.uv-seal .uv-r{clip-path:polygon(52% 0,100% 0,100% 100%,46% 100%,56% 60%,44% 38%)}
.uv-seal .uv-g{position:relative;z-index:1;pointer-events:none}
.uv-seal.broken .uv-l{transform:translate(-7px,3px) rotate(-14deg)}
.uv-seal.broken .uv-r{transform:translate(7px,4px) rotate(12deg)}
.uv-seal .uv-g{transition:opacity .3s}
.uv-seal.broken .uv-g{opacity:0}
.uv-hint{position:absolute;left:10px;bottom:16px;right:74px;z-index:3;font:600 12px/1.35 system-ui,sans-serif;color:#fff;
  text-shadow:0 1px 3px rgba(0,0,0,.8);opacity:0;transition:opacity .3s;pointer-events:none}
.uv-frame:hover .uv-hint,.uv-frame.holding .uv-hint,.uv-seal:focus-visible~.uv-hint{opacity:1}
.uv-ask{position:absolute;inset:0;z-index:4;display:flex;flex-direction:column;justify-content:center;gap:10px;padding:18px;
  background:rgba(20,12,24,.86);color:#fff;line-height:1.45;font:14px/1.45 system-ui,sans-serif;text-align:center}
.uv-ask h5{margin:0;font:700 17px/1.3 Georgia,serif}
.uv-ask p{margin:0;opacity:.9}
.uv-ask button{font:600 14px system-ui,sans-serif;padding:9px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.35);background:transparent;color:#fff;cursor:pointer}
.uv-ask button.pri{background:#b0283b;border-color:#b0283b}
.uv-load{margin-top:10px;width:100%}
@media (prefers-reduced-motion: reduce){.uv-frame .uv-robe,.uv-frame .uv-bare,.uv-seal .uv-l,.uv-seal .uv-r{transition:none}.uv-frame.falling .uv-silk{animation:none}}`;
  document.head.append(css);
  /* v303: the seal's filigree, pressed into the wax: a beaded rim, a fine ring, eight scrolls and a small wreath round
     the initial. Each line is drawn twice, a dark one a hair lower and a light one a hair higher, so it reads as an
     impression with the light on it. */
  {const C=27,P=[],ring=(r,w)=>`<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke-width="${w}"/>`;
    for(let i=0;i<36;i++){const a=i/36*2*Math.PI;P.push(`<circle cx="${(C+23.2*Math.cos(a)).toFixed(2)}" cy="${(C+23.2*Math.sin(a)).toFixed(2)}" r=".95"/>`)}
    for(let i=0;i<8;i++){const a=(i/8)*360+22.5;P.push(`<g transform="rotate(${a} ${C} ${C})"><path d="M${C} ${C-19.5} c2.6 .4 3.6 2.3 2.4 3.6 c-1.1 1.1 -2.9 .2 -2.2 -1.2 M${C} ${C-19.5} c-2.6 .4 -3.6 2.3 -2.4 3.6 c1.1 1.1 2.9 .2 2.2 -1.2" fill="none" stroke-width=".8"/><circle cx="${C}" cy="${C-14.3}" r=".7"/></g>`)}
    const body=ring(21,.7)+ring(13.2,.6)+P.join("")+`<path d="M${C-9} ${C+9.6} q9 4 18 0" fill="none" stroke-width=".7"/>`;
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"><g transform="translate(0 .6)" stroke="rgba(0,0,0,.42)" fill="rgba(0,0,0,.42)">${body}</g><g transform="translate(0 -.4)" stroke="rgba(255,232,190,.55)" fill="rgba(255,232,190,.55)">${body}</g></svg>`;
    document.documentElement.style.setProperty("--uv-fil",`url("data:image/svg+xml,${encodeURIComponent(svg)}")`)}
  /* her wax: the House palette's primary and accent, darkened */
  const COL={"crimson":"#9e1b2c","red":"#a31d24","gold":"#a8812a","black":"#2a2226"};
  /* the first palette colour that reads as wax: not near-white, not near-black */
  const lum=hex=>{const n=parseInt(String(hex).slice(1),16);if(isNaN(n))return -1;return(0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))/255};
  const wax=h=>{let p=null;try{const t=tplById(h+"robes");p=t&&t.pal}catch(e){}
    const hexOf=nm=>{nm=String(nm||"").toLowerCase();return(typeof COLORS!=="undefined"&&COLORS[nm])||COL[nm]||""};
    const c=p?["secondary","primary","accent","third","extra"].map(k=>hexOf(p[k])).filter(Boolean):[];
    return c.find(x=>{const l=lum(x);return l>.2&&l<.62})||"#8e1e2e"};
  const shade=(hex,k)=>{const n=parseInt(hex.slice(1),16);if(isNaN(n))return hex;const f=c=>Math.max(0,Math.min(255,Math.round(c*k)));
    return "#"+[n>>16&255,n>>8&255,n&255].map(f).map(x=>x.toString(16).padStart(2,"0")).join("")};
  const loadBare=h=>{if(typeof ENC.load!=="function")return;ENC.load(h+"robes");
    setTimeout(()=>{try{mut(()=>{let i=S.outfits.findIndex(o=>/^nude$/i.test(o.name||o.oname||"")&&!Object.keys(o.items||{}).length);
      if(i<0&&typeof newOutfit==="function"){S.outfits.push(newOutfit("Nude"));i=S.outfits.length-1}if(i>=0)S.cur=i})}catch(e){}},60)};

  function enhance(side,h){
    const img=side.querySelector('.enc-card img[alt^="Portrait of"]');if(!img||!has(h)||img.closest(".uv-frame"))return;
    const card=img.parentElement,who=(img.alt||"").replace(/^Portrait of /,"")||ACAD.cap(h);
    const frame=document.createElement("div");frame.className="uv-frame";
    const bare=new Image();bare.className="uv-bare";bare.alt="";bare.decoding="async";
    img.classList.add("uv-robe");img.style.borderRadius="0";
    card.insertBefore(frame,img);frame.append(bare,img);
    const silk=document.createElement("div");silk.className="uv-silk";frame.append(silk);
    const w=wax(h);frame.style.setProperty("--uv-wax",w);frame.style.setProperty("--uv-hi",shade(w,1.45));frame.style.setProperty("--uv-dk",shade(w,.55));
    const seal=document.createElement("button");seal.type="button";seal.className="uv-seal";
    seal.innerHTML='<span class="uv-l"></span><span class="uv-r"></span><span class="uv-ring"></span><span class="uv-g"></span>';
    seal.querySelector(".uv-g").textContent=(ACAD.cap?ACAD.cap(h):h)[0];
    const hint=document.createElement("div");hint.className="uv-hint";
    frame.append(seal,hint);
    let open=false,raf=0,t0=0,loadBtn=null;
    const label=()=>{const s=open?`Hold the broken seal to cover ${who} again`:`Hold the ${ACAD.cap(h)} seal to unveil ${who} (18+)`;seal.setAttribute("aria-label",s);seal.title=s;
      hint.textContent=open?"Hold the seal to cover her":"Hold the seal to break it…"};
    label();
    const setP=p=>seal.style.setProperty("--p",p);
    const apply=v=>{open=v;const rm=reduce();
      if(v&&!bare.src)bare.src=url(h);
      frame.classList.toggle("open",v);seal.classList.toggle("broken",v);
      if(v&&!rm){frame.classList.remove("falling");void frame.offsetWidth;frame.classList.add("falling")}
      if(v&&!loadBtn&&ENC.loadBtn){loadBtn=ENC.loadBtn(h+"robes","Load her unveiled","enc-load uv-load");
        if(loadBtn){loadBtn.onclick=()=>loadBare(h);card.append(loadBtn)}}
      if(loadBtn)loadBtn.hidden=!v;
      label()};
    const ask=()=>{if(frame.querySelector(".uv-ask"))return;
      const box=document.createElement("div");box.className="uv-ask";box.setAttribute("role","dialog");box.setAttribute("aria-label","Adults only");
      box.innerHTML='<h5>Adults only</h5><p></p>';box.querySelector("p").textContent=`Behind this portrait hangs a nude painting of ${who}. Every Academy girl is 18 or older.`;
      const y=document.createElement("button");y.className="pri";y.textContent="I am 18 or older, unveil her";
      const n=document.createElement("button");n.textContent="Keep her covered";
      y.onclick=()=>{ok=true;try{localStorage.setItem(KEY,"1")}catch(e){}box.remove();apply(true)};
      n.onclick=()=>{box.remove();setP(0)};
      box.append(y,n);frame.append(box);y.focus()};
    const done=()=>{setP(0);if(!open&&!ok)return ask();apply(!open)};
    const tick=()=>{const p=Math.min(1,(performance.now()-t0)/HOLD);setP(p);if(p>=1){stop(false);done()}else raf=setTimeout(tick,16)};
    const release=()=>{window.removeEventListener("pointerup",release);window.removeEventListener("pointercancel",release);if(raf)stop(true)};
    const start=e=>{if(e.button>0)return;e.preventDefault();
      window.addEventListener("pointerup",release);window.addEventListener("pointercancel",release);
      frame.classList.add("holding");t0=performance.now();clearTimeout(raf);raf=setTimeout(tick,16)};
    const stop=drain=>{clearTimeout(raf);raf=0;frame.classList.remove("holding");
      if(drain){const p0=parseFloat(getComputedStyle(seal).getPropertyValue("--p"))||0,s=performance.now();
        const dr=()=>{const p=Math.max(0,p0-(performance.now()-s)/400);setP(p);if(p>0)setTimeout(dr,16)};setTimeout(dr,16)}};
    seal.addEventListener("pointerdown",start);
    seal.addEventListener("contextmenu",e=>e.preventDefault());
    /* keyboard: hold Enter or Space */
    let kd=false;
    seal.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&!e.repeat&&!kd){e.preventDefault();kd=true;frame.classList.add("holding");t0=performance.now();raf=setTimeout(tick,16)}});
    seal.addEventListener("keyup",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();kd=false;if(raf)stop(true)}});
    seal.addEventListener("click",e=>e.preventDefault());
    bare.addEventListener("error",()=>{seal.remove();hint.remove();frame.classList.remove("open");if(loadBtn)loadBtn.remove()});
  }
  const bh=ENC.buildHouse;
  ENC.buildHouse=(el,h)=>{bh(el,h);try{const side=el.querySelector(".enc-side");if(side)enhance(side,h)}catch(e){console.warn("[unveil]",e)}};
  ACAD.UNVEIL={enhance,reset:()=>{ok=false;try{localStorage.removeItem(KEY)}catch(e){}}};
})();
