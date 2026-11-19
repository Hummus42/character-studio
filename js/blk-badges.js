/* ---- v329: draw your own badges. A group's crest, a faction's badge, a lost group's crest and a House's badge can each be
   drawn in the pixel editor (32x32 and 16x16, kept as rows of letters and a color per letter, like the heads). A drawn
   badge is stored beside the record it belongs to and replaces the made one everywhere that record's art is shown:
     group      add.groups[id].look.px32/px16, or edits.glooks[id].px32/px16
     faction    add.factions[id].px32/px16, or edits.factions[id].px32/px16
     lost group add.lost[id].px32/px16, or edits.lost[id].px32/px16
     House      add.houses[id].px32/px16, or edits.houses[id].px32/px16
   Nothing changes for a record without a drawn badge. Loads after blk-world.js. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  let LY=null;const layer=()=>LY||(LY=(ACAD.canon&&ACAD.canon.layer?ACAD.canon.layer():{})||{});
  const sec=(a,b)=>((layer()[a]||{})[b])||{};
  const pick=(o)=>o&&o.px32&&o.px32.r?{px32:o.px32,px16:o.px16||null}:null;
  const get=(kind,id)=>{if(!id)return null;
    if(kind==="group")return pick(sec("edits","glooks")[id])||pick((sec("add","groups")[id]||{}).look);
    if(kind==="faction")return pick(sec("edits","factions")[id])||pick(sec("add","factions")[id]);
    if(kind==="lost")return pick(sec("edits","lost")[id])||pick(sec("add","lost")[id]);
    if(kind==="house")return pick(sec("edits","houses")[id])||pick(sec("add","houses")[id]);
    return null};
  const PE=()=>ACAD.pixelEditor;
  const cache={};
  const urlOfPx=(px,n)=>{if(!px||!PE())return"";const k=JSON.stringify(px)+n;return cache[k]||(cache[k]=PE().urlOf(PE().toGrid(px,n),1))};
  const url=(kind,id,size)=>{const b=get(kind,id);if(!b)return"";return (size||32)<=16&&b.px16?urlOfPx(b.px16,16):urlOfPx(b.px32,32)};
  const img=(u,size,cls)=>{if(!u)return null;const im=document.createElement("img");im.src=u;im.alt="";im.width=im.height=size||32;im.className=cls||"pxhead";im.style.imageRendering="pixelated";im.setAttribute("aria-hidden","true");return im};

  /* a picture, as a grid (to start the editor from whatever is shown now) */
  const gridFromURL=(u,n)=>new Promise(res=>{if(!u)return res(null);const im=new Image();
    im.onload=()=>{try{const cv=document.createElement("canvas");cv.width=cv.height=n;const x=cv.getContext("2d");x.imageSmoothingEnabled=false;x.drawImage(im,0,0,n,n);
      const d=x.getImageData(0,0,n,n).data,g=[];for(let y=0;y<n;y++){const row=[];for(let i=0;i<n;i++){const k=(y*n+i)*4;row.push(d[k+3]<128?null:"#"+[d[k],d[k+1],d[k+2]].map(v=>v.toString(16).padStart(2,"0")).join(""))}g.push(row)}
      res(PE().fromGrid(g))}catch(e){res(null)}};im.onerror=()=>res(null);im.src=u});

  /* the form piece: a preview, Draw it, and Use the made one */
  const H=(t,a,...k)=>{const e=document.createElement(t);if(a)for(const[x,v]of Object.entries(a)){if(v==null||v===false)continue;if(x==="class")e.className=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else e.setAttribute(x,v===true?"":v)}
    k.flat().forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(String(c)))});return e};
  /* o: {label, what ("its crest"), title, get:()=>px|null, set:px|null=>void, start:()=>url|{r,c}|null, preset:"the shape above"} */
  function field(o){const box=H("div",{class:"adm-f adm-badge"});
    const paint=()=>{box.textContent="";const px=o.get();
      const pv=px?img(urlOfPx(px.px32,32),48,"adm-badge-img"):(typeof o.preview==="function"?o.preview():null);
      box.append(H("span",null,o.label||"Badge"),H("div",{class:"adm-row",style:"align-items:center;gap:10px;flex-wrap:wrap"},pv,
        H("button",{type:"button",class:"adm-btn sm",onclick:async()=>{if(!PE())return;let st=px?px.px32:null;
            if(!st&&o.start){const s=o.start();st=typeof s==="string"?await gridFromURL(s,32):s||null}
            PE().open({title:o.title||"A badge",fileBase:o.file||"badge",start32:st,start16:px?px.px16:null,useLabel:"Use this "+(o.noun||"badge"),
              onUse:(a,b)=>{o.set(a?{px32:a,px16:b||null}:null);paint()}})}},px?"Draw it again":"Draw it in the pixel editor"),
        px?H("button",{type:"button",class:"adm-btn sm",onclick:()=>{o.set(null);paint()}},o.preset?"Use "+o.preset+" instead":"Remove the drawing"):null),
        H("small",{class:"adm-muted",style:"display:block;margin-top:4px"},px?"Drawn by hand: it replaces the made "+(o.noun||"badge")+" everywhere.":(o.hint||"Optional. Start from what's shown, paint over it, or begin blank.")))};
    paint();return box}

  ACAD.badge={get,url,img:(kind,id,size)=>img(url(kind,id,size),size||32),field,gridFromURL,urlOfPx,refresh:()=>{LY=null}};

  /* ---------- the drawn ones replace the made ones ---------- */
  if(ACAD.crestURL){const c0=ACAD.crestURL;ACAD.crestURL=function(g){return url("group",g,32)||c0.apply(this,arguments)}}
  if(typeof ENC!=="undefined"){
    if(ENC.lostCrestURL){const l0=ENC.lostCrestURL;ENC.lostCrestURL=function(id){return url("lost",id,32)||l0.apply(this,arguments)}}
    ENC.factionBadge=(fid,size)=>ACAD.badge.img("faction",fid,size||32);
    ENC.houseBadge=(hid,size)=>ACAD.badge.img("house",hid,size||32);
    /* a faction's page shows its badge beside its name */
    (ENC.FACTIONS||[]).forEach(f=>{const p=ENC.pages&&ENC.pages["faction:"+f.id];if(!p||!p.build||!get("faction",f.id))return;const ob=p.build;
      p.build=function(el){ob.apply(this,arguments);const h1=el.querySelector("h1");const im=ENC.factionBadge(f.id,48);if(h1&&im){im.style.cssText+=";vertical-align:-10px;margin-right:12px";h1.prepend(im)}}});
    /* a House's page shows its badge on the side, when it has one */
    if(ENC.buildHouse){const bh=ENC.buildHouse;ENC.buildHouse=function(el,h){bh.apply(this,arguments);try{const house=ACAD.houseOf?ACAD.houseOf(h):h;const im=ENC.houseBadge(house,64);if(!im)return;
      const side=el.querySelector(".enc-side");if(!side)return;const nm=(ACAD.houseRec?ACAD.houseRec(house).name:house);
      side.prepend(ENC.E("div",{class:"enc-card",style:{textAlign:"center"}},ENC.E("h4",null,nm+" House"),im,ENC.E("p",{class:"enc-note",style:{margin:"6px 0 0"}},"Its badge")))}catch(e){console.warn("[badges]",e)}}}}
  const st=document.createElement("style");st.textContent=".adm-badge-img{image-rendering:pixelated;border:1px solid var(--line,#ccc);border-radius:6px;background:#fff8}";document.head.append(st);
})();
