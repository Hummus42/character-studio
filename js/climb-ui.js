/* Everspire: Climb the Spire, screens. The tower, hero choice, powers, the run's HUD and controls, level-up cards, chests, results. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.Run||!ACAD.gameUI||!ENC.E)return;
const C=ACAD.climb,U=ACAD.gameUI,E=ENC.E,HN=ENC.HN,W=C.WEAPONS,PS=C.PASSIVES,PT=(ACAD.head&&ACAD.head.PT)||[{name:"Common",col:"#8b8ba2"},{name:"Uncommon",col:"#6fcf8e"},{name:"Rare",col:"#5aa9f0"},{name:"Legendary",col:"#e8b64a"},{name:"Mythic",col:"#e86bd8"}];
const KEY="everspire.climb.v1",TIER_AT=[0,60,200,500,1200],STARTERS=["kitsune","lioness","wolf"];
const skinOn=h=>{const e=((M&&M.skins)||{})[h];return e&&e.on&&(e.own||[]).includes(e.on)?e.on:null};
C.petSkinOf=id=>{const e=((M&&M.pskins)||{})[id];return e&&e.on&&(e.own||[]).includes(e.on)?e.on:null};
const ownedCos=()=>{const o=(M.cosOwn||{}),c=M.cos||{},r={};["trail","burst","arena"].forEach(k=>{if(c[k]&&(o[k]||[]).includes(c[k]))r[k]=c[k]});return r};
const spr=(h,s,skin)=>{const sk=skin===undefined?skinOn(h):skin,i=E("img",{src:"assets/sprites/"+h+".128.webp",alt:"",draggable:"false",width:s,height:s,onerror:ev=>{const u=ACAD.pixelURL?ACAD.pixelURL(h):"";if(u&&ev.target.src!==u)ev.target.src=u}});if(sk&&C.skinURL){C.skinURL(h,sk,s,u=>{i.src=u});C.skinClass(i,sk)}return i};
const fmt=n=>Math.round(n).toLocaleString();
/* small synthesised sounds, on by default here, one switch in the run */
const SND={on:true,ctx:null,last:{}};try{SND.on=localStorage.getItem("everspire.climb.snd")!=="0"}catch(e){}
const TONES={gem:[[1500,.03]],coin:[[880,.05],[1320,.08]],hurt:[[150,.14]],kill:[[260,.025]],cast:[[400,.07],[700,.09],[1000,.12]],level:[[660,.08],[880,.08],[1100,.08],[1320,.16]],chest:[[523,.1],[659,.1],[784,.1],[1046,.25]],boss:[[110,.3],[98,.45]],win:[[523,.12],[659,.12],[784,.12],[1046,.4]],lose:[[300,.2],[220,.2],[160,.4]]};
SND.play=(n,th)=>{if(!SND.on)return;const now=performance.now();if(th&&SND.last[n]&&now-SND.last[n]<th)return;SND.last[n]=now;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;SND.ctx=SND.ctx||new A();if(SND.ctx.state==="suspended")SND.ctx.resume();let t=SND.ctx.currentTime+.005;(TONES[n]||[]).forEach(([f,d])=>{const o=SND.ctx.createOscillator(),g=SND.ctx.createGain();o.type=n==="hurt"||n==="boss"?"sawtooth":"triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(n==="kill"||n==="gem"?.025:.06,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(SND.ctx.destination);o.start(t);o.stop(t+d+.02);t+=d*.9})}catch(e){}};
C.snd=SND;
const ico=(id,s)=>C.iconEl?C.iconEl(id,s||24):document.createTextNode("");
const members=g=>((ACAD.GROUPS||[]).find(x=>x.id===g)||{members:[]}).members.slice();

/* ---------- saved progress ---------- */
let M=null;
function load(){try{M=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){M=null}
  if(!M||!M.free){M={gold:0,up:{},free:{},ess:{},runs:0,wins:0,best:{},sel:{hero:STARTERS[0],floor:0,boss:null}}}
  STARTERS.forEach(h=>M.free[h]=1);M.ess=M.ess||{};M.best=M.best||{};M.sel=M.sel||{hero:STARTERS[0],floor:0,boss:null};return M}
function save(){try{localStorage.setItem(KEY,JSON.stringify(M))}catch(e){}}
const tierOf=h=>{const e=M.ess[h]||0;let t=0;TIER_AT.forEach((v,i)=>{if(e>=v)t=i});return t};
const floorOpen=i=>i===0||members(C.FLOORS[i-1].g).filter(h=>M.free[h]).length>=3;
const groupOf=h=>{const g=(ACAD.GROUPS||[]).find(x=>x.members&&x.members.includes(h));return g?g.id:null};
const gName=id=>((ACAD.GROUPS||[]).find(x=>x.id===id)||{name:id}).name;
/* group perks: standing is earned by climbing with a group's girls, and buys perks for every girl of that group */
const GP={legends:["Champion's Fortune",{luck:.06},"+6% luck"],pride:["Pride of the Lawn",{might:.05},"+5% damage"],pack:["Pack Instinct",{move:.04},"+4% move speed"],grove:["Green Mending",{regen:.15},"+0.15 health every second"],frost:["Winter Tempo",{cooldown:-.03},"-3% weapon cooldown"],deep:["Deep Pull",{magnet:.25},"+25% pickup range"],plumes:["Updraft",{speed:.1},"+10% projectile speed"],talons:["Wide Talons",{area:.06},"+6% weapon size"],coil:["Patient Coil",{dur:.12},"+12% effect duration"],hive:["Hive Mind",{growth:.04},"+4% experience"],clockwork:["Escapement",{armor:.5},"-0.5 damage from every hit"],vigil:["Long Watch",{maxhp:.08},"+8% max health"],synth:["Tithe",{greed:.12},"+12% gold from runs"],void:["Hollow Edge",{might:.03,magnet:.1},"+3% damage, +10% pickup range"]};
const GU=["Kinship",{might:.03,maxhp:.04},"+3% damage and +4% health"];
const GMAX=3,gCost=(base,r)=>Math.round(base*(1+r*.9));
const gPerks=g=>{const f=GP[g]||["Heritage",{might:.03},"+3% damage"];return [{k:"u",n:GU[0],st:GU[1],d:GU[2],base:30,ic:"🤝"},{k:"f",n:f[0],st:f[1],d:f[2],base:50,ic:"⭐"}]};
const gStats=h=>{const g=groupOf(h),o={};if(!g)return o;const pk=(M.gperk||{})[g]||{};gPerks(g).forEach(p=>{const r=pk[p.k]||0;for(const s in p.st)o[s]=(o[s]||0)+p.st[s]*r});return o};
const pTier=id=>{const e=(M.pess||{})[id]||0;let t=0;TIER_AT.forEach((v,i)=>{if(e>=v)t=i});return t};
const PARTNER_K=.6;
const partnerOf=()=>{const p=M.partner;return p&&M.free[p]&&C.heroKit(p)&&PS["hr_"+p]?p:null};
const partnerBearing=p=>{const o={},pd=PS["hr_"+p],lv=1+tierOf(p);if(pd)for(const s in pd.per)o[s]=pd.per[s]*lv*PARTNER_K;const hp=gStats(p);for(const s in hp)o[s]=(o[s]||0)+hp[s]*PARTNER_K;return o};
const metaFor=(h,pet)=>{const t=tierOf(h),up=Object.assign({},M.up),gst=Object.assign({},gStats(h));if(t>=3)up.reroll=(up.reroll||0)+1;if(t>=4){up.reroll=(up.reroll||0)+1;up.banish=(up.banish||0)+1;gst.growth=(gst.growth||0)+.12}if(pet&&C.PETS&&C.PETS[pet]){const b=C.petBearing(pet,pTier(pet),pet===h);for(const s in b)gst[s]=(gst[s]||0)+b[s];const hp=gStats(pet);for(const s in hp)gst[s]=(gst[s]||0)+hp[s]*.5}
  {const pp=partnerOf();if(pp&&pp!==h){const b=partnerBearing(pp);for(const s in b)gst[s]=(gst[s]||0)+b[s]}}
  return {up,tierMul:1+.08*t,gst,lock:M.lock||{}}};

/* ---------- css ---------- */
const css=`
#evRoot .cl-wrap{max-width:980px;margin:0 auto;padding:10px 12px 40px}
#evRoot .cl-top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px}
#evRoot .cl-top h2{margin:0;font-family:Cinzel,Georgia,serif;flex:1;min-width:160px}
#evRoot .cl-grid{display:grid;grid-template-columns:minmax(210px,260px) 1fr;gap:12px}
@media(max-width:700px){#evRoot .cl-grid{grid-template-columns:1fr}}
#evRoot .cl-tower{display:flex;flex-direction:column;gap:6px}
#evRoot .cl-fl{display:grid;grid-template-columns:30px 1fr auto;gap:8px;align-items:center;text-align:left;padding:7px 9px;border-radius:10px;border:1px solid var(--g-line);background:var(--g-card);cursor:pointer;color:inherit;font:inherit}
#evRoot .cl-fl .no{font-family:Cinzel,Georgia,serif;font-size:17px;color:var(--fc,var(--g-gold));text-align:center}
#evRoot .cl-fl b{display:block;font-size:14px}#evRoot .cl-fl small{color:var(--g-mut)}
#evRoot .cl-fl.on{border-color:var(--fc,var(--g-gold));box-shadow:0 0 0 2px #d8b25a33}
#evRoot .cl-fl.lock{opacity:.45;cursor:default}
#evRoot .cl-heroes{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:8px;margin:8px 0}
#evRoot .cl-h{border:2px solid var(--tc,var(--g-line));border-radius:10px;padding:5px 3px;text-align:center;background:#0d0a20cc;cursor:pointer;color:inherit;font:inherit;min-width:0}
#evRoot .cl-h.on{box-shadow:0 0 12px var(--tc,#d8b25a)}#evRoot .cl-h img{width:64px;height:64px}
#evRoot .cl-h .nm{font-size:12.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#evRoot .cl-h small{display:block;font-size:11px;color:var(--g-mut)}
#evRoot .cl-h.sil img{filter:brightness(0) opacity(.55)}
#evRoot .cl-kit{display:grid;grid-template-columns:96px 1fr;gap:12px;align-items:start}#evRoot .cl-kit img{width:96px;height:96px}
#evRoot .cl-up{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px}
#evRoot .cl-up .card{padding:8px}
#evRoot .cl-ov{position:fixed;inset:0;z-index:300;background:#000;touch-action:none;user-select:none;-webkit-user-select:none}
#evRoot .cl-ov canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#evRoot .cl-hud{position:absolute;inset:0;pointer-events:none;font-family:Georgia,serif;color:#fff}
#evRoot .cl-hud .hp{position:absolute;left:10px;top:24px;width:min(42vw,220px)}
#evRoot .cl-bar{height:12px;background:#000a;border:1px solid #ffffff55;border-radius:6px;overflow:hidden}#evRoot .cl-bar i{display:block;height:100%}
#evRoot .cl-hud .xp{position:absolute;left:0;right:0;top:0;height:10px;background:#0009}#evRoot .cl-hud .xp i{display:block;height:100%;background:linear-gradient(90deg,#4aa8ff,#9ad8ff)}
#evRoot .cl-hud .tm{position:absolute;left:50%;top:18px;transform:translateX(-50%);font:700 22px Cinzel,Georgia,serif;text-shadow:0 2px 4px #000}
#evRoot .cl-hud .rt{position:absolute;right:10px;top:20px;text-align:right;font-size:14px;text-shadow:0 1px 3px #000}
#evRoot .cl-hud .rt button{pointer-events:auto;margin-top:4px}
#evRoot .cl-hud .it{position:absolute;left:8px;bottom:8px;display:flex;flex-wrap:wrap;gap:3px;max-width:70vw}
#evRoot .cl-hud .it span{position:relative;display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:#000a;border:1px solid #ffffff44;border-radius:6px;font-size:18px}
#evRoot .cl-hud .it span b{position:absolute;right:1px;bottom:-1px;font:700 10px Georgia;color:#ffe27a}
#evRoot .cl-hud .boss{position:absolute;left:50%;top:56px;transform:translateX(-50%);width:min(70vw,420px);text-align:center;font-size:13px;text-shadow:0 1px 3px #000;display:none}
#evRoot .cl-hud .tip{position:absolute;left:50%;bottom:20%;transform:translateX(-50%);padding:6px 12px;background:#000a;border-radius:20px;font-size:14px;transition:opacity 1s}
#evRoot .cl-ab{position:absolute;right:14px;bottom:44px;width:84px;height:84px;border-radius:50%;pointer-events:auto;border:2px solid var(--ac,#ffe27a);background:conic-gradient(var(--ac,#ffe27a) calc(var(--p,100)*1%),#14102e 0);color:#fff;font:700 11px Georgia,serif;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:0;cursor:pointer;box-shadow:0 0 14px #0009}
#evRoot .cl-ab span{font-size:26px;line-height:1;background:#14102ecc;border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center}
#evRoot .cl-ab small{position:absolute;bottom:-17px;right:0;white-space:nowrap;text-shadow:0 1px 3px #000;font-size:11px}
#evRoot .cl-ab.ready{animation:clGlow 1.2s ease-in-out infinite;--cc:var(--ac)}
#evRoot .cl-stick{position:absolute;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;border:2px solid #ffffff55;background:#ffffff14;display:none;pointer-events:none}
#evRoot .cl-stick i{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#ffffff66}
#evRoot .cl-card.link{box-shadow:0 0 16px 3px #ffe9a066}
#evRoot .cl-modal{position:absolute;inset:0;background:#05031acc;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:10px;padding:14px;overflow:auto;z-index:5}
#evRoot .cl-modal h2{margin:0;font-family:Cinzel,Georgia,serif;color:#ffe27a;text-shadow:0 0 14px #ffd24a88}
#evRoot .cl-cards{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;width:100%;max-width:880px}
#evRoot .cl-card{flex:1 1 200px;max-width:260px;background:#14102ef2;border:2px solid var(--cc,#d8b25a);border-radius:12px;padding:12px;text-align:left;color:#f1ead8;font:inherit;cursor:pointer;box-shadow:0 0 18px color-mix(in srgb,var(--cc,#d8b25a) 40%,transparent)}
#evRoot .cl-card:hover{transform:translateY(-3px)}
#evRoot .cl-card .cic{font-size:34px}#evRoot .cl-card b{display:block;font-size:16px}#evRoot .cl-card small{color:#bdb4d8;display:block;margin-top:4px;font-size:13px}#evRoot .cl-card em{font-style:normal;color:var(--cc);font-size:12px;text-transform:uppercase;letter-spacing:.08em}
#evRoot .cl-card.evo{animation:clGlow 1.2s ease-in-out infinite}
@keyframes clGlow{50%{box-shadow:0 0 30px var(--cc)}}
@media(prefers-reduced-motion:reduce){#evRoot .cl-card.evo{animation:none}}
`;
function injectCss(){if(!document.getElementById("clCss"))document.head.append(E("style",{id:"clCss"},css))}
const root=()=>U.root();
/* screens that redraw after a purchase keep the reader where they were */
const keepScroll=fn=>{const p=root().querySelector(".page"),y=p?p.scrollTop:0;fn();const q=root().querySelector(".page");if(q)q.scrollTop=y};
function page(body){U.ensure();U.show();injectCss();const r=root();r.textContent="";r.append(E("div",{class:"page"},E("div",{class:"cl-wrap"},body)))}

/* ---------- home: the tower ---------- */
let sel=null;
const framed=el=>{const f=C.FRAMES.find(x=>x.id===(M.cos||{}).frame&&x.ok(M));if(!f)return el;const w=E("span",{style:{display:"inline-block",borderRadius:"14px",padding:"3px",border:f.b,boxShadow:f.s,lineHeight:0}});w.append(el);return w};
const titleLine=()=>{const t=C.TITLES.find(x=>x.id===(M.cos||{}).title&&x.ok(M));return t&&t.id!=="newcomer"?E("span",{class:"chip",style:{marginLeft:"6px"}},t.n):null};
function home(){load();sel=M.sel;if(!floorOpen(sel.floor))sel.floor=0;
  const top=E("div",{class:"cl-top"},E("button",{type:"button",onclick:()=>U.title()},"Menu"),E("h2",null,"Climb the Spire"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold)),E("button",{type:"button",onclick:powers},"Powers"),E("button",{type:"button",onclick:recipes},"Recipes"),E("button",{type:"button",onclick:()=>groups()},"Houses"),E("button",{type:"button",onclick:locks},"Lock"),E("button",{type:"button",class:"sm",title:"Cheats",onclick:cheatGate},"🔑"),E("button",{type:"button",onclick:()=>pets()},"Pets"),E("button",{type:"button",onclick:()=>wardrobe()},"Wardrobe"),E("button",{type:"button",onclick:()=>ENC.open("home")},"Codex"));
  const tower=E("div",{class:"cl-tower"}),panel=E("div");
  const drawTower=()=>{tower.textContent="";for(let i=0;i<C.FLOORS.length;i++){const f=C.FLOORS[i],open=floorOpen(i),g=(ACAD.GROUPS||[]).find(x=>x.id===f.g)||{name:f.g},mem=members(f.g),n=mem.filter(h=>M.free[h]).length;
    const b=E("button",{type:"button",class:"cl-fl"+(i===sel.floor?" on":"")+(open?"":" lock"),style:{"--fc":f.acc},onclick:()=>{if(!open)return;sel.floor=i;sel.boss=null;save();drawTower();drawPanel()}},E("span",{class:"no"},String(i+1)),E("span",null,E("b",null,f.n),E("small",null,open?g.name+" · "+n+" of "+mem.length+" freed":"Free 3 girls on floor "+i+" to open")),E("span",{class:"mut"},M.best[i]?"✓":open?"":"🔒"));tower.append(b)}};
  const drawPanel=()=>{panel.textContent="";const fi=sel.floor,f=C.FLOORS[fi],mem=members(f.g),locked=mem.filter(h=>!M.free[h]),pool=locked.length?locked:mem;
    if(!sel.boss||!pool.includes(sel.boss))sel.boss=pool[0];if(!M.free[sel.hero])sel.hero=STARTERS[0];
    const kit=C.heroKit(sel.hero),wd=W[kit.start],t=tierOf(sel.hero),tc=PT[t].col;
    panel.append(E("div",{class:"card"},E("small",{class:"mut"},"FLOOR "+(fi+1)),E("b",{style:{fontSize:"18px",display:"block"}},f.n),
      E("div",{class:"mut"},locked.length?"A girl here stands in your way. Beat her and she joins you.":"Everyone here has joined you. You may still climb for gold and essence."),
      E("h3",null,"Challenger"),E("div",{class:"cl-heroes"},...pool.slice(0,12).map(h=>E("button",{type:"button",class:"cl-h"+(h===sel.boss?" on":"")+(M.free[h]?"":" sil"),onclick:()=>{sel.boss=h;save();drawPanel()}},spr(h,64),E("div",{class:"nm"},M.free[h]?HN(h):"???"),E("small",null,M.free[h]?"joined":"waiting")))),
      locked.length>12?E("div",{class:"mut"},"…and "+(locked.length-12)+" more waiting"):null));
    const hs=Object.keys(M.free).filter(h=>M.free[h]).sort((a,b)=>tierOf(b)-tierOf(a)||HN(a).localeCompare(HN(b)));
    panel.append(E("div",{class:"card",style:{marginTop:"10px"}},E("h3",{style:{marginTop:0}},"Your hero"),
      E("div",{class:"cl-kit"},framed(spr(sel.hero,96)),E("div",null,E("b",{style:{fontSize:"17px"}},HN(sel.hero)),titleLine(),E("span",{class:"chip",style:{marginLeft:"8px",borderColor:tc,color:tc}},PT[t].name),
        E("div",{class:"mut"},ico(kit.start,22)," "+wd.n+" · "+wd.d),E("div",{class:"mut"},"Gift: "+kit.trait.d),kit.x?E("div",{class:"mut"},"Heirloom: "+PS[kit.heir].n+" · "+PS[kit.heir].d):null,kit.x?E("div",{class:"mut"},"Ability: "+kit.x.an+" · "+C.ABILITIES[kit.x.ab].d):null,E("div",{class:"mut"},"Health "+(kit.hp)+" · power ×"+(1+.08*t).toFixed(2)),groupOf(sel.hero)?E("div",{class:"mut"},"House: ",E("a",{href:"#",onclick:ev=>{ev.preventDefault();groups(groupOf(sel.hero))}},gName(groupOf(sel.hero))+" ("+Math.floor((M.stand||{})[groupOf(sel.hero)]||0)+" standing)")):null,
        E("div",{class:"bar",style:{margin:"6px 0 2px"}},E("i",{style:{width:Math.min(100,100*((M.ess[sel.hero]||0)-TIER_AT[t])/((TIER_AT[t+1]||TIER_AT[t]+1)-TIER_AT[t]))+"%",background:tc}})),
        E("div",{class:"mut",style:{fontSize:"12px"}},TIER_AT[t+1]?"Essence "+Math.floor(M.ess[sel.hero]||0)+" / "+TIER_AT[t+1]+" to "+PT[t+1].name:"Mythic: +32% damage and health, +2 rerolls, +1 banish, +12% experience"))),
      E("div",{class:"cl-heroes"},...hs.map(h=>{const tt=tierOf(h),hk=C.heroKit(h);return E("button",{type:"button",class:"cl-h"+(h===sel.hero?" on":""),style:{"--tc":PT[tt].col},onclick:()=>{sel.hero=h;save();drawPanel()}},spr(h,64),E("div",{class:"nm"},HN(h)),E("small",null,ico(hk.start,18)," "+W[hk.start].n),E("small",{style:{opacity:.65,display:"block"}},(gName(groupOf(h))||"").replace(/^The /,"")))}))));
    {const pp=partnerOf(),ph=pp&&pp!==sel.hero?pp:null;
      panel.append(E("div",{class:"card",style:{marginTop:"10px",display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}},ph?spr(ph,64):E("div",{style:{width:"64px",height:"64px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}},"♥"),
        E("div",{style:{flex:1,minWidth:"160px"}},E("b",null,ph?HN(ph):"No partner"),ph?E("span",{class:"chip",style:{marginLeft:"8px"}},PT[tierOf(ph)].name):null,
          E("div",{class:"mut",style:{fontSize:"13px"}},ph?PS["hr_"+ph].n+" ×"+(1+tierOf(ph))+" at "+Math.round(PARTNER_K*100)+"%: "+PS["hr_"+ph].d+". She earns essence too.":"Bring a second girl for her heirloom. She earns essence alongside your hero.")),
        E("button",{type:"button",onclick:partners},ph?"Change partner":"Choose a partner")))}
    {const pid=M.pet&&C.PETS&&C.PETS[M.pet]&&M.free[M.pet]?M.pet:null,pd=pid&&C.PETS[pid];
      panel.append(E("div",{class:"card",style:{marginTop:"10px",display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}},pid?C.petImg(pid,64,true):E("div",{style:{width:"64px",height:"64px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px"}},"🐾"),
        E("div",{style:{flex:1,minWidth:"160px"}},E("b",null,pid?pd.n:"No pet"),pid?E("span",{class:"chip",style:{marginLeft:"8px"}},C.PTIER[pTier(pid)].n):null,
          E("div",{class:"mut",style:{fontSize:"13px"}},pid?C.PCMD[pd.cmd].n+": "+C.PCMD[pd.cmd].d+(pid===sel.hero?" Kin of "+HN(pid)+": +15%.":""):"Bring a pet along. Any pet goes with any girl.")),
        E("button",{type:"button",onclick:()=>pets()},pid?"Change pet":"Choose a pet")))}
    panel.append(E("div",{class:"row",style:{marginTop:"12px"}},E("button",{type:"button",class:"pri",style:{fontSize:"17px",padding:"10px 22px"},onclick:()=>startRun(sel.hero,fi,sel.boss)},"Climb"),C.story?E("button",{type:"button",onclick:()=>C.story.open(sel.hero,M,drawPanel)},"Her story"+(C.story.fresh(M,sel.hero).length?" ("+C.story.fresh(M,sel.hero).length+" new)":"")):null,E("span",{class:"mut"},"One floor, about nine minutes. Move; she fights on her own.")))};
  page(E("div",null,top,E("div",{class:"cl-grid"},tower,panel)));drawTower();drawPanel()}

/* ---------- powers ---------- */
const UPD={might:["Every hit deals more damage.","+5% damage per rank","%",5],armor:["Each hit you take hurts less (flat).","-1 damage taken per rank","",1],maxhp:["More health to start each run.","+10% max health per rank","%",10],recovery:["Slowly heals you while you climb.","+0.1 health per second per rank","",.1],cooldown:["Weapons fire sooner.","-2.5% weapon cooldown per rank","%",2.5],area:["Bigger blasts, whips and auras.","+5% weapon size per rank","%",5],speed:["Shots and thrown things fly faster.","+10% projectile speed per rank","%",10],dur:["Effects and zones last longer.","+15% duration per rank","%",15],amount:["One extra projectile for every weapon.","+1 projectile","",1],move:["You walk faster, so dodging is easier.","+5% move speed per rank","%",5],magnet:["Gems and coins are pulled from farther away.","+25% pickup range per rank","%",25],luck:["Better level-up choices, more chests and drops.","+10% luck per rank","%",10],growth:["Level up sooner.","+3% experience per rank","%",3],greed:["More gold at the end of a run.","+10% gold per rank","%",10],curse:["Riskier: enemies are tougher and more numerous, but you earn more gold and experience.","+10% enemy strength per rank","%",10],revive:["Once per run, you get back up at 60% health instead of falling.","1 extra life","",1],reroll:["Redraw the three cards at a level-up.","+1 reroll each run per rank","",1],skip:["Skip a level-up and take nothing, to keep your build tidy.","+1 skip each run per rank","",1],banish:["Remove a card from this run's level-ups for good.","+1 banish each run per rank","",1]};
function powers(){load();const g=E("div",{class:"cl-up"});
  C.UPGRADES.forEach(u=>{const rk=M.up[u.k]||0,mx=u.max||5,cost=C.upCost(u,rk),can=rk<mx&&M.gold>=cost,d=UPD[u.k]||["",""],now=d[3]?Math.round(rk*d[3]*10)/10:0,nx=d[3]?Math.round((rk+1)*d[3]*10)/10:0,cur=d[3]&&d[2]==="%"?"Now +"+now+"%":d[3]?"Now +"+now:"";
    g.append(E("div",{class:"card"},E("b",null,ico(u.k,26)," "+u.n),E("div",{style:{fontSize:"13px",margin:"2px 0"}},d[0]),E("div",{class:"mut",style:{fontSize:"12px"}},d[1]+(cur?" · "+cur:"")+(rk<mx&&d[3]&&d[2]==="%"?" → +"+nx+"%":"")),E("div",{class:"mut"},"Rank "+rk+" of "+mx),E("div",{class:"bar",style:{margin:"4px 0"}},E("i",{style:{width:100*rk/mx+"%"}})),
      E("button",{type:"button",class:can?"pri sm":"sm",disabled:!can,onclick:()=>{M.gold-=cost;M.up[u.k]=rk+1;save();keepScroll(powers)}},rk>=mx?"Maxed":"💰 "+cost)))});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Powers"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold))),E("p",{class:"mut"},"Permanent strengths for every hero, bought with gold from your runs. Each rank adds the amount shown; buying costs more every rank. They apply to every girl, on every floor."),g))}

/* ---------- houses: standing and perks per group ---------- */
function groups(open){load();M.stand=M.stand||{};M.gperk=M.gperk||{};const wrap=E("div",{class:"cl-up"});
  C.FLOORS.forEach(f=>{const g=f.g,mem=members(g),fr=mem.filter(h=>M.free[h]).length,st=Math.floor(M.stand[g]||0),pk=M.gperk[g]=M.gperk[g]||{};
    const card=E("div",{class:"card",style:{borderColor:g===open?f.acc:""}},E("b",{style:{color:f.acc}},gName(g)),E("div",{class:"mut"},fr+" of "+mem.length+" joined · "+st+" standing"),
      E("div",{style:{display:"flex",gap:"3px",flexWrap:"wrap",margin:"6px 0"}},...mem.filter(h=>M.free[h]).slice(0,10).map(h=>spr(h,28))));
    gPerks(g).forEach(p=>{const r=pk[p.k]||0,cost=gCost(p.base,r),can=r<GMAX&&st>=cost;
      card.append(E("div",{style:{borderTop:"1px solid #fff2",paddingTop:"6px",marginTop:"6px"}},E("b",null,ico(p.k==="u"?"crest":"star",22)," "+p.n),E("div",{style:{fontSize:"13px"}},p.d+" per rank, for every girl of this House"),E("div",{class:"mut",style:{fontSize:"12px"}},"Rank "+r+" of "+GMAX+(r?" · now "+p.d.replace(/[0-9]+([.][0-9]+)?/g,m=>String(Math.round(m*r*100)/100)):"")),
        E("button",{type:"button",class:can?"pri sm":"sm",disabled:!can,onclick:()=>{M.stand[g]=(M.stand[g]||0)-cost;pk[p.k]=r+1;save();keepScroll(()=>groups(g))}},r>=GMAX?"Maxed":"✦ "+cost+" standing")))});
    wrap.append(card)});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Houses"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold))),
    E("p",{class:"mut"},"Standing is earned only by climbing with a House's girls: more for a win, and a lot when you free one of its girls. It is spent here, on perks that help every girl of that House, and it is separate from gold."),wrap))}

/* ---------- pets: a second roster that mirrors the girls ---------- */
function partners(){load();
  const hs=Object.keys(M.free).filter(h=>M.free[h]&&PS["hr_"+h]).sort((a,b)=>tierOf(b)-tierOf(a)||HN(a).localeCompare(HN(b)));
  const draw=()=>{const cur=partnerOf();
    page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Partner")),
      E("p",{class:"mut"},"A second girl who comes along. She does not fight or take a slot: her heirloom works for you at "+Math.round(PARTNER_K*100)+"% and grows with her tier, and she earns the same essence you do, so two girls level at once."),
      cur?E("div",{class:"row",style:{marginBottom:"10px"}},E("span",{class:"chip hot"},"Partner: "+HN(cur)),E("button",{type:"button",class:"sm",onclick:()=>{M.partner=null;save();draw()}},"Send her home")):null,
      E("div",{class:"cl-heroes"},...hs.map(h=>{const tt=tierOf(h),pd=PS["hr_"+h],same=sel&&sel.hero===h;return E("button",{type:"button",class:"cl-h"+(h===cur?" on":""),disabled:same,style:{"--tc":PT[tt].col},onclick:()=>{M.partner=h;save();draw()}},spr(h,64),E("div",{class:"nm"},HN(h)),E("small",null,PT[tt].name),E("small",{style:{opacity:.75,display:"block"}},same?"your hero":pd.n+" ×"+(1+tt)))}))))};
  draw()}
/* ---------- wardrobe: cosmetic skins, a gold sink ---------- */
function wardrobe(tabIn,pick){load();M.skins=M.skins||{};M.pskins=M.pskins||{};M.cos=M.cos||{};M.cosOwn=M.cosOwn||{};["trail","burst","arena"].forEach(k=>M.cosOwn[k]=M.cosOwn[k]||[]);
  const hs=Object.keys(M.free).filter(h=>M.free[h]).sort((a,b)=>HN(a).localeCompare(HN(b))),ps=Object.keys(C.PETS||{}).filter(i=>M.free[i]).sort((a,b)=>C.PETS[a].n.localeCompare(C.PETS[b].n));
  let tab=tabIn||"skins",cur=pick||(sel&&hs.includes(sel.hero)?sel.hero:hs[0]),pcur=M.pet&&ps.includes(M.pet)?M.pet:ps[0];
  const TABS=[["skins","Skins"],["pets","Pet skins"],["trail","Trails"],["burst","Bursts"],["arena","Arenas"],["title","Titles and frames"]],GL={petal:"✿",ember:"●",star:"✦",diamond:"◆",dot:"●"};
  const top0=()=>{const p=document.querySelector(".page");if(p)p.scrollTop=0};
  const draw=()=>{const re=fn=>()=>{fn();save();keepScroll(draw)};let body;
    const tabs=E("div",{class:"row",style:{flexWrap:"wrap",margin:"6px 0 10px"}},...TABS.map(([k,n])=>E("button",{type:"button",class:"sm"+(k===tab?" on":""),onclick:()=>{tab=k;draw();top0()}},n)));
    if(tab==="skins"||tab==="pets"){const isPet=tab==="pets",id=isPet?pcur:cur;
      if(!id)body=E("p",{class:"mut"},isPet?"No pets have joined yet.":"No girls yet.");
      else{const store=isPet?M.pskins:M.skins,e=store[id]=store[id]||{own:[],on:null},own=e.own||(e.own=[]),worn=e.on&&own.includes(e.on)?e.on:null;
        const pic=(sid,sz)=>{if(!isPet)return spr(id,sz,sid);const i=C.petImg(id,sz,false,sid);if(sid)C.skinClass(i,sid);return i};
        const card=sk=>{const has=!sk||own.includes(sk.id),on=(sk?sk.id:null)===worn,cost=sk?C.SKIN_COST[sk.t]:0;
          return E("div",{class:"card",style:{textAlign:"center",borderColor:on?"#ffe9a0":sk?sk.c+"88":""}},pic(sk?sk.id:null,96),E("div",null,E("b",{style:{color:sk?sk.c:""}},sk?sk.n:"Original"),sk&&sk.fx?E("small",{class:"mut",style:{marginLeft:"6px"}},"✦ living"):null),
            E("button",{type:"button",class:!has&&M.gold>=cost?"pri sm":"sm",disabled:!has&&M.gold<cost||on&&!sk,onclick:re(()=>{if(!has){if(M.gold<cost)return;M.gold-=cost;own.push(sk.id)}e.on=sk?sk.id:null})},!has?"💰 "+fmt(cost):on?"Wearing":"Wear"))};
        const list=isPet?ps:hs,nm=x=>isPet?C.PETS[x].n:HN(x),cnt=x=>((store[x]||{}).own||[]).length;
        body=E("div",null,E("div",{class:"card"},E("h3",{style:{marginTop:0}},nm(id)),E("div",{class:"cl-up"},card(null),...C.SKINS.map(card))),
          E("h3",null,isPet?"Choose a pet":"Choose a girl"),E("div",{class:"cl-heroes"},...list.map(x=>E("button",{type:"button",class:"cl-h"+(x===id?" on":""),onclick:()=>{if(isPet)pcur=x;else cur=x;draw();top0()}},isPet?C.petImg(x,64,false):spr(x,64),E("div",{class:"nm"},nm(x)),E("small",null,cnt(x)+" of "+C.SKINS.length)))))}}
    else if(tab==="title"){const T=C.TITLES,F=C.FRAMES,line=(it,key)=>{const ok=it.ok(M),on=(M.cos[key]||(key==="title"?"newcomer":"plain"))===it.id;
        return E("div",{class:"card",style:{opacity:ok?1:.55,borderColor:on?"#ffe9a0":""}},E("b",null,it.n),E("div",{class:"mut",style:{fontSize:"12px"}},ok?it.d:"Locked: "+it.d),
          key==="frame"?E("div",{style:{margin:"6px auto",width:"46px",height:"46px",borderRadius:"14px",border:it.b,boxShadow:it.s}}):null,
          E("button",{type:"button",class:"sm",disabled:!ok||on,onclick:re(()=>{M.cos[key]=it.id})},on?"Wearing":"Wear"))};
      body=E("div",null,E("h3",null,"Titles"),E("div",{class:"cl-up"},...T.map(t=>line(t,"title"))),E("h3",null,"Portrait frames"),E("div",{class:"cl-up"},...F.map(f=>line(f,"frame"))))}
    else{const data={trail:C.TRAILS,burst:C.BURSTS,arena:C.ARENAS}[tab],own=M.cosOwn[tab],on0=M.cos[tab]&&own.includes(M.cos[tab])?M.cos[tab]:null,
        blurb={trail:"A trail that follows her while she moves.",burst:"A flourish whenever you level up.",arena:"Recolors the floor of every climb."}[tab];
      const card=(id,it)=>{const has=!it||own.includes(id),on=(it?id:null)===on0,cost=it?it.cost:0;
        const pv=!it?E("div",{style:{height:"46px",fontSize:"22px"}},"–"):tab==="arena"?E("div",{style:{height:"46px",width:"90px",margin:"0 auto",borderRadius:"8px",background:"linear-gradient(135deg,"+it.tint[0]+","+it.tint[1]+")",border:"1px solid #3b3568"}}):E("div",{style:{height:"46px",fontSize:"30px",color:it.c,textShadow:"0 0 10px "+it.c}},GL[it.k]+" "+GL[it.k]+" "+GL[it.k]);
        return E("div",{class:"card",style:{textAlign:"center",borderColor:on?"#ffe9a0":""}},pv,E("div",null,E("b",null,it?it.n:"None")),
          E("button",{type:"button",class:!has&&M.gold>=cost?"pri sm":"sm",disabled:!has&&M.gold<cost||on&&!it,onclick:re(()=>{if(!has){if(M.gold<cost)return;M.gold-=cost;own.push(id)}M.cos[tab]=it?id:null})},!has?"💰 "+fmt(cost):on?"Wearing":"Wear"))};
      body=E("div",null,E("p",{class:"mut"},blurb),E("div",{class:"cl-up"},card(null,null),...Object.keys(data).map(k=>card(k,data[k]))))}
    page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Wardrobe"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold))),
      E("p",{class:"mut"},"Everything here is cosmetic. Skins recolor a girl or a pet; the rest follow every climb."),tabs,body))};
  draw()}
function pets(pick){load();M.pess=M.pess||{};const ids=Object.keys(C.PETS);
  let cur=pick||(M.pet&&C.PETS[M.pet]?M.pet:ids.find(i=>M.free[i]))||ids[0];
  const SN={might:"damage",armor:"armor",maxhp:"max health",regen:"health a second",cooldown:"cooldown",area:"area",speed:"projectile speed",dur:"duration",move:"move speed",magnet:"pickup range",luck:"luck",growth:"experience",greed:"gold"};
  const fmt1=(s,v)=>s==="armor"?"+"+Math.round(v*10)/10+" armor":s==="regen"?"+"+Math.round(v*100)/100+" health a second":(v<0?"":"+")+Math.round(v*100)+"% "+SN[s];
  const bt=(o)=>Object.keys(o).map(s=>fmt1(s,o[s])).join(", ");
  const draw=()=>{const p=C.PETS[cur],t=pTier(cur),tc=PT[t].col,free=!!M.free[cur],kin=sel&&sel.hero===cur,cmd=C.PCMD[p.cmd];
    const e=M.pess[cur]||0,hs=ids.slice().sort((a,b)=>(M.free[b]?1:0)-(M.free[a]?1:0)||pTier(b)-pTier(a)||HN(a).localeCompare(HN(b)));
    const on=M.pet===cur;
    page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Pets"),E("span",{class:"chip hot"},ids.filter(i=>M.free[i]).length+" / "+ids.length+" joined")),
      E("p",{class:"mut"},"Every girl has a pet that mirrors her, and it joins you when she does. Bring one along with any girl: it follows, fights on its own and answers to one Command. Pets earn bond from the essence you climb for, and grow through the same five tiers as the girls."),
      E("div",{class:"card",style:{display:"flex",gap:"14px",flexWrap:"wrap",alignItems:"flex-start"}},
        E("div",{style:{filter:free?"none":"brightness(0) opacity(.55)"}},C.petImg(cur,150,true)),
        E("div",{style:{flex:1,minWidth:"220px"}},E("b",{style:{fontSize:"19px"}},free?p.n:"???"),E("span",{class:"chip",style:{marginLeft:"8px",borderColor:tc,color:tc}},PT[t].name),
          E("div",{class:"mut"},"Mirrors "+(free?HN(cur):"a girl you have not met")+" · "+p.sp),
          free?E("div",{class:"bar",style:{margin:"6px 0 2px"}},E("i",{style:{width:Math.min(100,100*(e-TIER_AT[t])/((TIER_AT[t+1]||TIER_AT[t]+1)-TIER_AT[t]))+"%",background:tc}})):null,
          free?E("div",{class:"mut",style:{fontSize:"12px"}},TIER_AT[t+1]?"Bond "+Math.floor(e)+" / "+TIER_AT[t+1]+" to "+PT[t+1].name:"Mythic: bond complete"):null,
          E("div",{style:{marginTop:"8px"}},E("b",null,"Command: "+cmd.n),E("div",{class:"mut",style:{fontSize:"13px"}},cmd.d+" Cooldown "+Math.round(cmd.cd*(t>=2?.85:1))+"s. Press F or tap its button.")),
          E("div",{style:{marginTop:"6px"}},E("b",null,"Bearing"),E("div",{class:"mut",style:{fontSize:"13px"}},bt(C.petBearing(cur,t,false))+(t<4?"  (Mythic adds "+bt(p.bear2)+")":""))),
          E("div",{style:{marginTop:"6px"}},E("b",null,"Tiers"),...C.PTIER.map((x,i)=>E("div",{class:"mut",style:{fontSize:"12px",color:i<=t?PT[i].col:""}},(i<=t?"✓ ":"· ")+x.n+": "+x.d))),
          E("div",{class:"mut",style:{fontSize:"12px",marginTop:"6px"}},"Kin: bring "+HN(cur)+" with her own pet for +15% to its Bearing and Command. The perks you have bought for its House also reach it, at half strength."),
          E("div",{class:"row",style:{marginTop:"10px"}},E("button",{type:"button",class:on?"sm":"pri",disabled:!free,onclick:()=>{M.pet=on?null:cur;save();draw()}},!free?"Not yet joined":on?"Remove from climb":"Bring along"),on?E("span",{class:"chip hot"},"Coming along"):null))),
      E("h3",null,"Roster"),
      E("div",{class:"cl-heroes"},...hs.map(id=>{const f=!!M.free[id],tt=pTier(id);return E("button",{type:"button",class:"cl-h"+(id===cur?" on":""),style:{"--tc":PT[tt].col},onclick:()=>{cur=id;draw()}},E("div",{style:{filter:f?"none":"brightness(0) opacity(.5)"}},C.petImg(id,64,false)),E("div",{class:"nm"},f?C.PETS[id].n:"???"),E("small",null,f?PT[tt].name:"waiting"),M.pet===id?E("small",{style:{color:"#ffe9a0"}},"coming along"):null)}))))};
  draw()}

/* ---------- cheats: behind a password ---------- */
let cheatOn=false;
const cheatHash=s=>{let x=5381;for(const c of s)x=((x<<5)+x+c.charCodeAt(0))>>>0;return x};
function cheatGate(){if(cheatOn){cheats();return}
  const ov=E("div",{style:{position:"fixed",inset:0,background:"#05031acc",zIndex:50,display:"flex",alignItems:"center",justifyContent:"center"}}),
    inp=E("input",{type:"password",placeholder:"Password",autocomplete:"off",style:{padding:"8px 10px",borderRadius:"8px",border:"1px solid #d8b25a",background:"#14102e",color:"#f1ead8",fontSize:"16px"}}),
    msg=E("div",{class:"mut",style:{minHeight:"18px",fontSize:"13px"}},""),
    go=()=>{if(cheatHash(inp.value.trim())===2765372283){cheatOn=true;ov.remove();cheats()}else{msg.textContent="That is not it.";inp.value="";inp.focus()}};
  inp.addEventListener("keydown",e=>{if(e.key==="Enter")go();else if(e.key==="Escape")ov.remove()});
  ov.append(E("div",{class:"card",style:{display:"flex",flexDirection:"column",gap:"8px",alignItems:"center",padding:"16px",background:"#14102e",width:"min(300px,88vw)"}},E("b",null,"Cheats"),E("div",{class:"mut",style:{fontSize:"13px"}},"Enter the password."),inp,msg,E("div",{class:"row"},E("button",{type:"button",class:"pri sm",onclick:go},"Enter"),E("button",{type:"button",class:"sm",onclick:()=>ov.remove()},"Cancel"))));
  root().append(ov);setTimeout(()=>inp.focus(),50)}
function cheats(note){load();M.pess=M.pess||{};M.bond=M.bond||{};M.stand=M.stand||{};M.up=M.up||{};
  const btn=(label,fn)=>E("button",{type:"button",class:"sm",onclick:()=>{fn();save();cheats("Done: "+label)}},label);
  const allGirls=Object.keys(C.PETS||{});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Cheats"),note?E("span",{class:"chip hot"},note):null),
    E("p",{class:"mut"},"For testing. Everything here changes your save."),
    E("div",{class:"card"},E("h3",{style:{marginTop:0}},"Gold and powers"),E("div",{class:"row",style:{flexWrap:"wrap"}},
      btn("+1,000 gold",()=>{M.gold+=1000}),btn("+25,000 gold",()=>{M.gold+=25000}),btn("Max every Power",()=>{(C.UPGRADES||[]).forEach(u=>{M.up[u.k]=u.max||M.up[u.k]||0})}))),
    E("div",{class:"card",style:{marginTop:"10px"}},E("h3",{style:{marginTop:0}},"Girls and pets"),E("div",{class:"row",style:{flexWrap:"wrap"}},
      btn("Free every girl",()=>{allGirls.forEach(g=>M.free[g]=1)}),
      btn("Every girl to Mythic",()=>{Object.keys(M.free).filter(g=>M.free[g]).forEach(g=>M.ess[g]=Math.max(M.ess[g]||0,1200))}),
      btn("Every pet to Mythic",()=>{allGirls.forEach(g=>M.pess[g]=1200)}),
      btn("+500 bond for every girl",()=>{Object.keys(M.free).filter(g=>M.free[g]).forEach(g=>M.bond[g]=(M.bond[g]||0)+500)}),
      btn("+"+500+" essence for the chosen hero",()=>{const h=M.sel&&M.sel.hero;if(h)M.ess[h]=(M.ess[h]||0)+500}),
      (()=>{const p=M.pet&&C.PETS[M.pet]&&M.free[M.pet]?M.pet:null,b=btn("+500 bond for the chosen pet",()=>{if(p)M.pess[p]=(M.pess[p]||0)+500});if(!p){b.disabled=true;b.title="Choose a pet first"}return b})())),
    E("div",{class:"card",style:{marginTop:"10px"}},E("h3",{style:{marginTop:0}},"Houses and the pool"),E("div",{class:"row",style:{flexWrap:"wrap"}},
      btn("+500 standing everywhere",()=>{(ACAD.GROUPS||[]).forEach(g=>M.stand[g.id]=(M.stand[g.id]||0)+500)}),
      btn("Clear the lock list",()=>{M.lock={}}),
      btn("Forget found recipes",()=>{M.evo={}}))),
    E("p",{class:"mut",style:{fontSize:"12px",marginTop:"10px"}},"During a climb, open Pause and press Cheats for god mode, levels, weapons and more.")))}
function runCheats(run,under){
  const ov=document.getElementById("clOv"),cm=E("div",{class:"cl-modal",style:{zIndex:9}}),maxItems=()=>{Object.keys(run.pa).forEach(id=>{run.pa[id]=PS[id].max});run.recompute()};
  const b=(label,fn)=>E("button",{type:"button",class:"sm",onclick:()=>{fn();SND.play("level");msg.textContent="Done: "+label}},label);
  const msg=E("div",{class:"mut",style:{minHeight:"18px"}},"");
  const wsel=E("select",null,...Object.keys(W).filter(id=>!/^s_|^x_/.test(id)||W[id].sig===run.hero).map(id=>E("option",{value:id},W[id].n+(W[id].evolved?" (evolved)":""))));
  const psel=E("select",null,...Object.keys(PS).filter(id=>!PS[id].heir||PS[id].heir===run.hero).map(id=>E("option",{value:id},PS[id].n)));
  cm.append(E("h2",null,"Cheats"),
    E("div",{class:"row",style:{flexWrap:"wrap",justifyContent:"center",maxWidth:"560px"}},
      b(run.god?"God mode: off":"God mode: on",()=>{run.god=!run.god;if(run.god){run._hit=run.hit;run.hit=()=>{}}else if(run._hit){run.hit=run._hit;delete run._hit}}),
      b("+5 levels",()=>{for(let i=0;i<5;i++)run.xp+=C.xpNeed(run.lv+i)}),
      b("Max every weapon",()=>{run.wp.forEach(w=>{if(!w.def.evolved)run.weaponLv(w.id,run.maxLvW(w))})}),
      b("Max every item",maxItems),
      b("Heal fully",()=>{run.hp=run.stats.maxhp}),
      b("5-item chest",()=>{run.pk.push({k:"chest",x:run.px,y:run.py,n:5,t:0})}),
      b("Clear the screen",()=>{run.en.slice().forEach(e=>{if(!e.boss)run.kill(e)})}),
      b("Jump to the challenger",()=>{run.t=Math.max(run.t,535)}),
      b("+1,000 gold",()=>{run.gold+=1000})),
    E("div",{class:"row"},wsel,E("button",{type:"button",class:"sm",onclick:()=>{const id=wsel.value;if(run.wp.find(w=>w.id===id)){msg.textContent="Already carried.";return}if(run.wp.length>=6){msg.textContent="Six weapons already.";return}run.addWeapon(id);msg.textContent="Added "+W[id].n}},"Add weapon")),
    E("div",{class:"row"},psel,E("button",{type:"button",class:"sm",onclick:()=>{const id=psel.value;if(Object.keys(run.pa).length>=6&&!run.pa[id]){msg.textContent="Six items already.";return}run.pa[id]=Math.min(PS[id].max,(run.pa[id]||0)+1);run.recompute();msg.textContent=PS[id].n+" level "+run.pa[id]}},"Add item level")),
    msg,E("button",{type:"button",class:"pri",onclick:()=>cm.remove()},"Close"));
  ov.append(cm)}

/* ---------- lock list: items you never want to see in a run ---------- */
function locks(){load();M.lock=M.lock||{};
  const ws=Object.keys(W).filter(id=>!W[id].evolved&&!W[id].sig),ps=Object.keys(PS).filter(id=>!PS[id].heir);
  const tile=(id,d)=>{const on=!!M.lock[id];const b=E("button",{type:"button",class:"sm"+(on?" on":""),onclick:()=>{if(M.lock[id])delete M.lock[id];else M.lock[id]=1;save();keepScroll(locks)}},on?"🔒 Locked":"Allowed");
    return E("div",{class:"card",style:{opacity:on?.6:1,display:"flex",alignItems:"center",gap:"8px"}},ico(id,34),E("div",{style:{flex:1,minWidth:0}},E("b",{style:{fontSize:"13px"}},d.n),E("div",{class:"mut",style:{fontSize:"11px"}},d.d||"")),b)};
  const n=Object.keys(M.lock).length;
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Lock list"),E("span",{class:"chip hot"},n+" locked"),E("button",{type:"button",class:"sm",onclick:()=>{M.lock={};save();keepScroll(locks)}},"Unlock all")),
    E("p",{class:"mut"},"A locked weapon or item never shows up in level-ups or chests. Handy for thinning the pool toward a build. Locking an item also blocks the evolutions that need it, and your starting weapon is never locked."),
    E("h3",null,"Weapons"),E("div",{class:"cl-up"},...ws.map(id=>tile(id,W[id]))),E("h3",null,"Items"),E("div",{class:"cl-up"},...ps.map(id=>tile(id,PS[id])))))}

/* ---------- recipes: every weapon combination, found ones in full ---------- */
function recipes(){load();const found=M.evo||{},ev=M.evo=found;
  const rows=[],seen={};
  Object.keys(W).forEach(id=>{const d=W[id];if(d.evolved||d.sig)return;
    if(d.evo&&W[d.evo[1]])rows.push({to:d.evo[1],a:[d],p:PS[d.evo[0]],pid:d.evo[0]});
    if(d.union&&W[d.union[1]]&&!seen[d.union[1]]){seen[d.union[1]]=1;rows.push({to:d.union[1],a:[d,W[d.union[0]]]})}});
  (C.UNIONS||[]).forEach(u=>rows.push({to:u.to,a:[W[u.a],W[u.b]],u:1}));
  const sig=Object.keys(W).filter(id=>W[id].sig&&!W[id].evolved);
  const card=r=>{const ok=found[r.to],t=W[r.to],how=r.p?r.a[0].n+" at full level, plus "+r.p.n+" (any level) in your slots":r.a.map(x=>x.n).join(" and ")+(r.u?", both evolved (a union)":", both at full level");
    return E("div",{class:"card",style:{opacity:ok?1:.8}},E("div",null,ico(ok?r.to:"lock",40)),E("b",{style:{color:ok?t.c:"inherit"}},ok?t.n:"Unknown evolution"),
      E("div",{class:"mut",style:{fontSize:"12px",margin:"2px 0",display:"flex",alignItems:"center",gap:"4px",flexWrap:"wrap"}},...r.a.map(x=>ico(x.id,24)),...(r.p?["+",ico(r.pid,24)]:[]),"→",ico(ok?r.to:"lock",24)),
      E("div",{style:{fontSize:"13px"}},ok?t.d:"Discover it by opening a chest with the ingredients ready."),E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},how+". Then open any chest."))};
  const nf=rows.filter(r=>found[r.to]).length,sf=sig.filter(id=>found["x_"+id.slice(2)]).length;
  const sg=sig.filter(id=>found["x_"+id.slice(2)]).map(id=>{const h=id.slice(2),a=W["x_"+h],b=W[id],p=PS["hr_"+h];return E("div",{class:"card"},E("div",null,ico("x_"+h,40)),E("b",{style:{color:a.c}},a.n),E("div",{class:"mut",style:{fontSize:"12px"}},HN(h)+(p?" · "+p.n:"")),E("div",{style:{fontSize:"13px"}},a.d||""),E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},b.n+" at full level plus her heirloom, then any chest."))});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Recipes"),E("span",{class:"chip hot"},nf+" / "+rows.length+" found")),
    E("p",{class:"mut"},"A weapon evolves when it reaches full level while you also carry the matching item (or, for pairs, both weapons are full level). Then the next chest you open, from an elite, a rare one or the challenger, turns them into something stronger. Found evolutions fill in here as you make them; the rest show what is needed."),
    E("div",{class:"cl-up"},...rows.map(card)),
    E("h3",null,"Her awakenings ("+sf+" / "+sig.length+")"),E("p",{class:"mut"},"Each girl's own weapon awakens with her own heirloom. Found ones are listed."),
    sg.length?E("div",{class:"cl-up"},...sg):E("p",{class:"mut"},"None yet. Max her signature weapon, pick up her heirloom, and open a chest.")))}

/* ---------- a run ---------- */
let RUN=null,raf=0,keys={},stickEl=null;
function startRun(hero,fi,boss){stopRun();load();const f=C.FLOORS[fi];U.ensure();U.show();injectCss();const r=root();
  const ov=E("div",{class:"cl-ov",id:"clOv"}),cv=E("canvas"),hud=E("div",{class:"cl-hud"});ov.append(cv,hud);r.append(ov);
  const petId=M.pet&&C.PETS&&C.PETS[M.pet]&&M.free[M.pet]?M.pet:null;
  const pn=partnerOf()&&partnerOf()!==hero?partnerOf():null;
  const run=RUN=new C.Run({hero,skin:skinOn(hero),partner:pn,partnerSkin:pn?skinOn(pn):null,cos:ownedCos(),floor:f.g,floorIndex:fi,boss,pet:petId,petTier:petId?pTier(petId):0,kin:petId===hero,meta:metaFor(hero,petId)});
  const xp=E("i"),xpb=E("div",{class:"xp"},xp),hpf=E("i",{style:{background:"linear-gradient(90deg,#ff4a6a,#ff8a9a)"}}),hpt=E("small"),lvt=E("b"),tm=E("div",{class:"tm"}),rt=E("div",{class:"rt"}),it=E("div",{class:"it"}),bossBar=E("div",{class:"boss"},E("div",{class:"bn"}),E("div",{class:"cl-bar"},E("i",{style:{background:"#ff5a7a"}}))),tip=E("div",{class:"tip"},"Drag or use WASD to move. She fights on her own."+(run.hzNote?" "+run.hzNote:""));
  stickEl=E("div",{class:"cl-stick"},E("i"));
  const pauseBtn=E("button",{type:"button",class:"sm",onclick:()=>pauseMenu()},"Pause");
  let spd=1;try{spd=+localStorage.getItem("everspire.climb.speed")||1}catch(e){}if(![1,2,3].includes(spd))spd=1;
  const spdBtn=E("button",{type:"button",class:"sm"+(spd>1?" on":""),style:{marginLeft:"4px",minWidth:"36px"},title:"Game speed (G)"},spd+"×");
  const cycleSpd=()=>{spd=spd%3+1;spdBtn.textContent=spd+"×";spdBtn.classList.toggle("on",spd>1);try{localStorage.setItem("everspire.climb.speed",String(spd))}catch(e){}SND.play("cast")};spdBtn.onclick=cycleSpd;
  const sndBtn=E("button",{type:"button",class:"sm",style:{marginLeft:"4px"},onclick:()=>{SND.on=!SND.on;try{localStorage.setItem("everspire.climb.snd",SND.on?"1":"0")}catch(e){}sndBtn.textContent=SND.on?"♪":"♪ off";SND.play("level")}},SND.on?"♪":"♪ off");
  rt.append(E("div",{class:"gd"}),E("div",{class:"kl"}),E("div",null,pauseBtn,sndBtn,spdBtn));
  const ABIC={nova:"💥",dash:"💨",heal:"💗",freeze:"❄️",summon:"👻",dome:"🔰",gravity:"🌀",blink:"✨",storm:"🌩️",meteor:"☄️",volley:"🎯",haste:"⚡"};
  const abBtn=run.ab?E("button",{type:"button",class:"cl-ab",style:{"--ac":run.ab.col},title:run.ab.name+": "+run.ab.d,onclick:()=>run.cast()},E("span",null,ABIC[run.ab.arch]||"✦"),E("small",null,run.ab.name)):null;
  const petBtn=run.pet?E("button",{type:"button",class:"cl-ab",style:{"--ac":run.pdat.c,right:"110px",bottom:"54px",width:"70px",height:"70px"},title:C.PETS[run.petId].n+": "+C.PCMD[run.pdat.cmd].d+" (F)",onclick:()=>run.petCast()},C.petImg(run.petId,34),E("small",null,C.PCMD[run.pdat.cmd].n)):null;
  const ptn=partnerOf()&&partnerOf()!==hero?partnerOf():null;
  if(ptn)hud.append(E("div",{class:"chip",style:{position:"absolute",left:"8px",top:"64px",display:"flex",alignItems:"center",gap:"4px",pointerEvents:"none"},title:HN(ptn)+" tags along"},spr(ptn,26),E("small",null,"♥ "+HN(ptn))));
  hud.append(xpb,E("div",{class:"hp"},E("div",null,lvt," ",hpt),E("div",{class:"cl-bar"},hpf)),tm,rt,it,bossBar,tip,stickEl,...(abBtn?[abBtn]:[]),...(petBtn?[petBtn]:[]));setTimeout(()=>{tip.style.opacity=0},5000);
  const ctx=cv.getContext("2d");let w=0,h=0;
  const fit=()=>{const dpr=Math.min(2,window.devicePixelRatio||1),b=ov.getBoundingClientRect();w=b.width;h=b.height;cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);run.dpr=dpr};fit();addEventListener("resize",fit);ov._fit=fit;
  /* input: keys and a floating stick */
  const kd=e=>{keys[e.key.toLowerCase()]=1;if(e.key==="Escape"||e.key==="p")pauseMenu();if(e.key===" "||e.key==="e"||e.key==="q")run.cast();if(e.key.toLowerCase()==="f"&&run.petCast)run.petCast();if(e.key.toLowerCase()==="g")cycleSpd();if(["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e.key.toLowerCase()))e.preventDefault()},ku=e=>{keys[e.key.toLowerCase()]=0};
  addEventListener("keydown",kd);addEventListener("keyup",ku);ov._off=()=>{removeEventListener("keydown",kd);removeEventListener("keyup",ku);removeEventListener("resize",fit)};
  let sid=null,sx=0,sy=0,sv=[0,0];
  ov.addEventListener("pointerdown",e=>{if(e.target.closest("button,.cl-modal"))return;sid=e.pointerId;sx=e.clientX;sy=e.clientY;sv=[0,0];stickEl.style.display="block";stickEl.style.left=sx+"px";stickEl.style.top=sy+"px";ov.setPointerCapture(e.pointerId)});
  ov.addEventListener("pointermove",e=>{if(e.pointerId!==sid)return;let dx=e.clientX-sx,dy=e.clientY-sy;const d=Math.hypot(dx,dy),mx=50;if(d>mx){dx*=mx/d;dy*=mx/d}sv=Math.abs(dx)+Math.abs(dy)<6?[0,0]:[dx/mx,dy/mx];stickEl.firstChild.style.transform="translate("+dx+"px,"+dy+"px)"});
  const up=e=>{if(e.pointerId!==sid)return;sid=null;sv=[0,0];stickEl.style.display="none";stickEl.firstChild.style.transform=""};ov.addEventListener("pointerup",up);ov.addEventListener("pointercancel",up);
  const vis=()=>{if(document.hidden&&RUN&&!RUN.ended&&!RUN.paused)pauseMenu()};document.addEventListener("visibilitychange",vis);const prevOff=ov._off;ov._off=()=>{prevOff();document.removeEventListener("visibilitychange",vis)};
  /* what the run asks of the screen */
  run.cb.level=(ch,go)=>levelModal(ov,run,ch,go);run.cb.chest=(got,go)=>chestModal(ov,run,got,go);
  run.cb.boss=id=>{bossBar.style.display="block";SND.play("boss")};run.cb.end=res=>{res.pet=run.petId;res.partner=ptn;SND.play(res.win?"win":"lose");setTimeout(()=>finish(res,ov),run.won?400:900)};
  /* hud paint */
  let hudT=0,iconKey="";const hudPaint=()=>{const P=run.stats;xp.style.width=Math.min(100,100*run.xp/C.xpNeed(run.lv))+"%";hpf.style.width=Math.max(0,100*run.hp/P.maxhp)+"%";hpt.textContent=Math.ceil(Math.max(0,run.hp))+" / "+P.maxhp;lvt.textContent="Lv "+run.lv;
    const s=Math.floor(run.t);tm.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0");rt.firstChild.textContent="💰 "+run.gold;rt.children[1].textContent="☠ "+run.kills+" · 👾 "+run.en.length;
    const k=run.wp.map(x=>x.id+x.lv).join(",")+"|"+Object.entries(run.pa).join(",");if(k!==iconKey){iconKey=k;it.textContent="";run.wp.forEach(x=>it.append(E("span",{title:x.def.n,style:{borderColor:x.def.c}},ico(x.id,28),E("b",null,x.def.evolved?"★":x.lv>=C.maxLv(x.id)?"MAX":x.lv))));Object.keys(run.pa).forEach(id=>it.append(E("span",{title:PS[id].n},ico(id,28),E("b",null,run.pa[id]))))}
    if(petBtn){const P=run.pet,pc=P.down>0?0:P.cd>0?100*(1-P.cd/P.max):100;petBtn.style.setProperty("--p",Math.max(0,Math.min(100,pc)));petBtn.lastChild.textContent=P.down>0?"resting":P.cd>0?Math.ceil(P.cd)+"s":C.PCMD[run.pdat.cmd].n}
    if(abBtn){const a=run.ab,pc=a.cd>0?100*(1-a.cd/(a.max*run.stats.cooldown)):100;abBtn.style.setProperty("--p",Math.max(0,Math.min(100,pc)));abBtn.classList.toggle("ready",a.cd<=0);abBtn.lastChild.textContent=a.cd>0?a.name+" · "+Math.ceil(a.cd)+"s":a.name+" · ready"}
    if(run.bossE){bossBar.style.display="block";bossBar.firstChild.textContent=HN(run.bossId)+" · the challenger";bossBar.lastChild.firstChild.style.width=Math.max(0,100*run.bossE.hp/run.bossE.mhp)+"%"}else if(run.won)bossBar.style.display="none"};
  let last=performance.now(),acc=0;
  let pv={xp:0,lv:1,gold:0,hp:run.hp,kills:0,cd:0};
  const frame=now=>{if(RUN!==run)return;const dt=Math.min(.1,(now-last)/1000);last=now;
    if(!run.ended){let dx=sv[0],dy=sv[1];if(keys.a||keys.arrowleft)dx-=1;if(keys.d||keys.arrowright)dx+=1;if(keys.w||keys.arrowup)dy-=1;if(keys.s||keys.arrowdown)dy+=1;run.dir=[dx,dy];acc+=dt*spd;let n=0;while(acc>=1/60&&n++<4*spd){run.step(1/60);acc-=1/60}if(acc>.25)acc=.25}
    ctx.setTransform(run.dpr||1,0,0,run.dpr||1,0,0);run.draw(ctx,w,h,now);
    if(run.xp>pv.xp&&run.lv===pv.lv)SND.play("gem",70);if(run.gold>pv.gold)SND.play("coin",90);if(run.hp<pv.hp-.5)SND.play("hurt",160);if(run.kills>pv.kills)SND.play("kill",110);if(run.ab&&run.ab.cd>pv.cd+1)SND.play("cast");
    pv={xp:run.xp,lv:run.lv,gold:run.gold,hp:run.hp,kills:run.kills,cd:run.ab?run.ab.cd:0};
    hudT-=dt;if(hudT<=0){hudT=.1;hudPaint()}raf=requestAnimationFrame(frame)};
  raf=requestAnimationFrame(frame);window.__climb=run;
  if(!M.intro){run.paused=true;const m=E("div",{class:"cl-modal"},E("h2",null,"How a climb works"),E("div",{class:"cl-cards"},...[["🕹️","Move","Drag on the screen, or use WASD. Your weapons fire on their own."],["💎","Collect gems","Blue gems level you up. Pick one of the cards each time."],["🎁","Chests","Elites at 3:00 and 6:00 drop chests that upgrade or evolve your weapons."],["👑","The challenger","At 9:00 a girl blocks the floor. Beat her and she joins you."]].map(([i,t,d])=>E("div",{class:"cl-card",style:{cursor:"default","--cc":"#9ad8ff"}},E("div",{class:"cic"},i),E("b",null,t),E("small",null,d)))),E("div",{class:"mut"},"Space or E uses her ability. The ♪ button turns sound off."),E("button",{type:"button",class:"pri",onclick:()=>{M.intro=1;save();m.remove();run.paused=false}},"Begin"));ov.append(m)}}
function stopRun(){cancelAnimationFrame(raf);raf=0;const ov=document.getElementById("clOv");if(ov){if(ov._off)ov._off();ov.remove()}RUN=null;keys={}}

function itemRows(run){const rows=[],own=id=>run.wp.find(w=>w.id===id);
  run.wp.forEach(w=>{const d=w.def,mx=C.maxLv(w.id),full=d.evolved||w.lv>=mx;let how="";
    if(d.evolved){const u=(C.UNIONS||[]).find(u=>u.a===w.id||u.b===w.id);const oid=u&&(u.a===w.id?u.b:u.a);how="Evolved form."+(u?" Fuses with "+W[oid].n+" ("+(own(oid)?"owned ✓":"not owned ✗")+") into "+W[u.to].n+", then a chest.":"")}
    else if(d.evo&&PS[d.evo[0]]&&W[d.evo[1]]){const has=!!run.pa[d.evo[0]];how="Evolves into "+W[d.evo[1]].n+": reach full level"+(full?" ✓":" ("+w.lv+" of "+mx+")")+" and carry "+PS[d.evo[0]].n+(has?" ✓":" ✗")+", then open a chest."}
    else if(d.union&&W[d.union[1]]){const o=own(d.union[0]),of=o&&(o.def.evolved||o.lv>=C.maxLv(o.id));how="Pairs with "+W[d.union[0]].n+" to make "+W[d.union[1]].n+": both at full level"+(of&&full?" ✓":o?" (partner "+(of?"✓":"not full yet")+")":" (partner not owned ✗)")+", then a chest."}
    else how="No evolution.";rows.push({id:w.id,n:d.n,lv:d.evolved?"Evolved":w.lv>=mx?"MAX":"Lv "+w.lv+" of "+mx,how,c:d.c})});
  Object.keys(run.pa).forEach(id=>{const p=PS[id],l=run.pa[id],mx=p.max,ev=Object.keys(W).filter(k=>W[k].evo&&W[k].evo[0]===id&&!W[k].evolved);
    const how=ev.length?"Evolves: "+ev.map(k=>W[k].n+(own(k)?" (you have it"+(own(k).lv>=C.maxLv(k)?", full ✓":", not full yet")+")":W[k].evo&&own(W[k].evo[1])?" (already evolved ✓)":" (not owned)")).join("; "):p.d;
    rows.push({id,n:p.n,lv:l>=mx?"MAX":"Lv "+l+" of "+mx,how:(p.d?p.d+". ":"")+(ev.length?how:"No weapon evolves with it."),c:"#9ab0e8"})});
  return rows}
function pauseMenu(){const run=RUN,ov=document.getElementById("clOv");if(!run||!ov||run.ended||ov.querySelector(".cl-modal"))return;const was=run.paused;run.paused=true;
  const m=E("div",{class:"cl-modal"},E("h2",null,"Paused"),E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:()=>{m.remove();run.paused=was}},"Resume"),E("button",{type:"button",onclick:()=>{if(confirm("Leave this climb? You keep nothing from it.")){stopRun();home()}}},"Leave the climb"),cheatOn?E("button",{type:"button",onclick:()=>runCheats(run,m)},"Cheats"):null));
  const rows=itemRows(run),list=E("div",{style:{width:"min(560px,94vw)",maxHeight:"46vh",overflowY:"auto",textAlign:"left",border:"1px solid #fff2",borderRadius:"10px",padding:"6px 10px"}});
  if(!rows.length)list.append(E("div",{class:"mut"},"You carry nothing yet."));
  rows.forEach(r=>list.append(E("div",{style:{display:"grid",gridTemplateColumns:"34px 1fr",gap:"8px",alignItems:"center",padding:"6px 0",borderTop:"1px solid #fff1"}},ico(r.id,32),E("div",null,E("b",{style:{color:r.c}},r.n),E("span",{class:"mut",style:{marginLeft:"8px",fontSize:"12px"}},r.lv),E("div",{class:"mut",style:{fontSize:"12px"}},r.how)))));
  m.append(E("div",{class:"mut",style:{fontSize:"12px"}},"Your items and what they need to evolve. ✓ means you already have it."),list,E("div",{class:"mut",style:{maxWidth:"420px",textAlign:"center",fontSize:"12px"}},"Move with WASD, the arrow keys, or by dragging on the screen. Your weapons fire on their own."));
  ov.append(m)}

/* a card whose weapon and item belong together gets a quiet glow once you hold the other half */
function evoLink(run,c){
  if(c.type==="weapon"){const d=W[c.id];if(d&&!d.evolved&&d.evo&&PS[d.evo[0]]&&run.pa[d.evo[0]])return "Evolves with your "+PS[d.evo[0]].n;return null}
  if(c.type==="passive"){const w=run.wp.find(x=>!x.def.evolved&&x.def.evo&&x.def.evo[0]===c.id);if(w)return "Evolves your "+w.def.n;return null}
  return null}
function levelModal(ov,run,ch,go){let cur=ch,banish=false;const m=E("div",{class:"cl-modal"}),draw=()=>{m.textContent="";m.append(E("h2",null,banish?"Choose one to banish":"Level "+run.lv+"!"));
    const cards=E("div",{class:"cl-cards"});cur.forEach(c=>{const l=run.label(c),lk=evoLink(run,c),b=E("button",{type:"button",class:"cl-card"+(lk?" link":""),style:{"--cc":l.c},onclick:()=>{if(banish){run.banished[c.id]=true;run.bn--;banish=false;cur=run.choices();draw();return}run.apply(c);m.remove();go()}},E("div",{class:"cic"},ico(c.type==="heal"?"chicken":c.type==="gold"?"coin":c.id,56)),E("em",null,c.type==="weapon"?(c.lv===1?"New weapon":"Weapon · level "+c.lv):c.type==="passive"?(c.lv===1?"New item":"Item · level "+c.lv):"Reward"),E("b",null,l.n),E("small",null,l.d),l.evo?E("small",{style:{opacity:.8}},"Evolves with "+l.evo):null,lk?E("small",{style:{color:"#ffe9a0"}},"✦ "+lk):null);cards.append(b)});
    m.append(cards);const row=E("div",{class:"row"});
    row.append(E("button",{type:"button",class:"sm",disabled:run.rr<=0,onclick:()=>{run.rr--;cur=run.choices();draw()}},"Reroll ("+run.rr+")"),E("button",{type:"button",class:"sm",disabled:run.sk<=0,onclick:()=>{run.sk--;m.remove();go()}},"Skip ("+run.sk+")"),E("button",{type:"button",class:"sm"+(banish?" on":""),disabled:run.bn<=0&&!banish,onclick:()=>{banish=!banish;draw()}},"Banish ("+run.bn+")"));m.append(row)};
  draw();ov.append(m);SND.play("level")}

function chestModal(ov,run,got,go){
  if(!document.getElementById("clChestCss"))document.head.append(E("style",{id:"clChestCss"},`
#evRoot .cc-stage{position:relative;width:180px;height:150px;display:flex;align-items:center;justify-content:center;cursor:pointer}
#evRoot .cc-rays{position:absolute;inset:-40px;border-radius:50%;opacity:0;background:repeating-conic-gradient(#ffe9a000 0 8deg,#ffe9a066 8deg 16deg);-webkit-mask:radial-gradient(circle,#000 20%,#0000 70%);mask:radial-gradient(circle,#000 20%,#0000 70%)}
#evRoot .cc-stage.open .cc-rays{opacity:1;animation:ccspin 6s linear infinite}
#evRoot .cc-chest.shake{animation:ccshake .45s ease-in-out infinite}
#evRoot .cc-chest.pop{animation:ccpop .55s cubic-bezier(.2,1.6,.4,1) forwards}#evRoot .cc-chest.pop img{filter:drop-shadow(0 0 18px #ffe9a0)}
#evRoot .cc-slots{max-width:900px;gap:8px;flex-wrap:wrap;justify-content:center}
#evRoot .cc-card{flex:0 0 140px;perspective:700px;height:190px;position:relative}
#evRoot .cc-card .in{position:absolute;inset:0;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.3,1.3,.5,1)}
#evRoot .cc-card.flip .in{transform:rotateY(180deg)}
#evRoot .cc-card .f,#evRoot .cc-card .bk{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;padding:8px;text-align:center}
#evRoot .cc-card .bk{background:linear-gradient(145deg,#2a2250,#14102e);border:2px solid #d8b25a;font-size:40px;color:#d8b25a}
#evRoot .cc-card .f{transform:rotateY(180deg);background:#14102ef2;border:2px solid var(--cc,#d8b25a);color:#f1ead8}
#evRoot .cc-card.flip.evo .f{box-shadow:0 0 22px 4px var(--cc,#ffe9a0);animation:ccglow 1s ease-in-out infinite alternate}
#evRoot .cc-card small{font-size:11px;opacity:.85}
#evRoot .cc-count{font:700 28px Cinzel,Georgia,serif;color:#ffe9a0;text-shadow:0 2px 6px #000;animation:ccpop .5s cubic-bezier(.2,1.6,.4,1)}
#evRoot .cc-count.five{font-size:36px;color:#ffd24a;text-shadow:0 0 14px #ff9a2e}
@keyframes ccshake{0%,100%{transform:rotate(0) scale(1)}20%{transform:rotate(-7deg) scale(1.05)}40%{transform:rotate(6deg) scale(1.08)}60%{transform:rotate(-5deg) scale(1.05)}80%{transform:rotate(4deg) scale(1.02)}}
@keyframes ccpop{0%{transform:scale(.6)}60%{transform:scale(1.35)}100%{transform:scale(1.15)}}
@keyframes ccspin{to{transform:rotate(360deg)}}
@keyframes ccglow{from{box-shadow:0 0 10px 1px var(--cc,#ffe9a0)}to{box-shadow:0 0 28px 8px var(--cc,#ffe9a0)}}`));
  const n=got.length,m=E("div",{class:"cl-modal"}),timers=[],later=(f,t)=>{timers.push(setTimeout(f,t))};
  got.forEach(g=>{if(g.kind==="evo"){M.evo=M.evo||{};M.evo[g.id]=1}});save();
  const chest=E("div",{class:"cc-chest shake"},ico("chest",110)),stage=E("div",{class:"cc-stage"},E("div",{class:"cc-rays"}),chest),
    head=E("h2",null,"A chest!"),count=E("div",null),slots=E("div",{class:"cl-cards cc-slots"}),btn=E("button",{type:"button",class:"pri",disabled:true},"Take it");
  const cards=got.map(g=>{let l,sub;
    if(g.kind==="evo"){const d=W[g.id];l={ic:d.ic,n:d.n,d:d.d,c:d.c};sub="Evolution! "+g.from.map(x=>W[x].n).join(" + ")}
    else if(g.kind==="up"){l=run.label(g.ch);sub=g.ch.lv>1?"Upgraded to level "+g.ch.lv:"New"}else{l={n:"A purse of gold",d:"+50 gold",c:"#ffd24a"};sub=""}
    const icon=g.kind==="evo"?g.id:g.kind==="up"?g.ch.id:"coin";
    const el=E("div",{class:"cc-card"+(g.kind==="evo"?" evo":""),style:{"--cc":l.c}},E("div",{class:"in"},E("div",{class:"bk"},"?"),E("div",{class:"f"},E("div",null,ico(icon,48)),E("b",{style:{fontSize:"13px"}},l.n),E("small",null,sub),E("small",null,l.d))));
    slots.append(el);return {el,evo:g.kind==="evo"}});
  let done=false;
  const finish=()=>{if(done)return;done=true;timers.forEach(clearTimeout);cards.forEach(c=>c.el.classList.add("flip"));chest.className="cc-chest pop";stage.classList.add("open");btn.disabled=false};
  const opened=()=>{stage.classList.add("open");chest.className="cc-chest pop";SND.play("chest");head.textContent=n>=5?"Jackpot!":n>=3?"A fine chest!":"The chest opens";
    count.append(E("div",{class:"cc-count"+(n>=5?" five":"")},n===1?"1 treasure":n+" treasures"));
    cards.forEach((c,i)=>later(()=>{c.el.classList.add("flip");SND.play(c.evo?"level":"coin");if(i===cards.length-1)later(finish,450)},500+i*520))};
  stage.onclick=()=>{if(!done)finish()};
  btn.onclick=()=>{timers.forEach(clearTimeout);m.remove();go()};
  m.append(head,stage,count,slots,btn);ov.append(m);SND.play("gem");later(opened,1000)}

/* ---------- result ---------- */
function finish(res,ov){load();const h=res.hero,bossId=res.boss,before=tierOf(h),pb=res.pet?pTier(res.pet):0;M.gold+=res.gold;M.runs++;M.ess[h]=(M.ess[h]||0)+res.ess;const pb2=res.partner?tierOf(res.partner):0;if(res.partner&&M.free[res.partner])M.ess[res.partner]=(M.ess[res.partner]||0)+res.ess;M.pess=M.pess||{};if(res.pet)M.pess[res.pet]=(M.pess[res.pet]||0)+res.ess;M.stand=M.stand||{};const sg={};{const g0=groupOf(h);if(g0)sg[g0]=Math.round(10+Math.min(15,res.kills/150)+(res.win?30:0));const bg=res.win&&bossId&&!M.free[bossId]?groupOf(bossId):null;if(bg)sg[bg]=(sg[bg]||0)+25;Object.keys(sg).forEach(g=>M.stand[g]=(M.stand[g]||0)+sg[g])}
  let freed=false;if(res.win){M.wins++;M.best[res.floor]=Math.max(M.best[res.floor]||0,res.t);if(bossId&&!M.free[bossId]){M.free[bossId]=1;freed=true}}save();
  const sa=C.story?C.story.award(M,res,freed):null;if(sa)save();
  const after=tierOf(h),pa=res.pet?pTier(res.pet):0,m=E("div",{class:"cl-modal"},E("h2",null,res.win?"The floor is yours":"You fell"),
    freed?E("div",{style:{textAlign:"center"}},spr(bossId,120),E("div",{style:{fontSize:"18px",color:"#ffe27a"}},HN(bossId)+" joins you.")):null,
    E("div",{class:"chips"},E("span",{class:"chip hot"},"💰 +"+fmt(res.gold)),E("span",{class:"chip"},"☠ "+res.kills),E("span",{class:"chip"},"Level "+res.lv),E("span",{class:"chip"},Math.floor(res.t/60)+":"+String(Math.floor(res.t%60)).padStart(2,"0")),E("span",{class:"chip hot"},"✦ +"+res.ess+" essence for "+HN(h)),...(res.partner?[E("span",{class:"chip hot"},"♥ +"+res.ess+" essence for "+HN(res.partner))]:[]),...(res.pet&&C.PETS[res.pet]?[E("span",{class:"chip hot"},"🐾 +"+res.ess+" bond for "+C.PETS[res.pet].n)]:[])),
    E("div",{class:"chips"},...Object.keys(sg).map(g=>E("span",{class:"chip hot"},"✦ +"+sg[g]+" standing with "+gName(g)))),
    after>before?E("div",{style:{color:PT[after].col,fontSize:"18px"}},HN(h)+" ascends to "+PT[after].name+"."):null,
     res.partner&&tierOf(res.partner)>pb2?E("div",{style:{color:PT[tierOf(res.partner)].col,fontSize:"18px"}},HN(res.partner)+" ascends to "+PT[tierOf(res.partner)].name+"."):null,
     pa>pb?E("div",{style:{color:PT[pa].col,fontSize:"18px"}},C.PETS[res.pet].n+" grows to "+PT[pa].name+": "+C.PTIER[pa].d):null,
    sa?E("div",{class:"chips"},...Object.keys(sa.gain).map(g=>E("span",{class:"chip"},"♥ "+HN(g)+" +"+sa.gain[g]+" bond")),...sa.newly.map(x=>E("span",{class:"chip hot"},"New scene"+(x.n>1?"s ("+x.n+")":"")+": "+HN(x.h)))):null,
    E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:()=>{stopRun();home()}},"Back to the tower"),E("button",{type:"button",onclick:()=>{stopRun();startRun(h,res.floor,bossId&&!M.free[bossId]?bossId:bossId)}},res.win?"Climb again":"Try again")));
  ov.append(m);if(after>before&&ACAD.head&&ACAD.head.ui&&ACAD.head.ui.flourish)ACAD.head.ui.flourish(h,after);else if(freed&&ACAD.sfx)ACAD.sfx.play("fanfare")}

C.titleButtons=mk=>[mk("Climb the Spire","Fight upward through the Everspire, one floor at a time",home,true)];
C.home=home;C.stop=stopRun;C.save=()=>M;
})();
