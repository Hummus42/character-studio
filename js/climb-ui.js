/* Everspire: Climb the Spire, screens. The tower, hero choice, powers, the run's HUD and controls, level-up cards, chests, results. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.Run||!ACAD.gameUI||!ENC.E)return;
const C=ACAD.climb,U=ACAD.gameUI,E=ENC.E,HN=ENC.HN,W=C.WEAPONS,PS=C.PASSIVES,PT=(ACAD.head&&ACAD.head.PT)||[{name:"Common",col:"#8b8ba2"},{name:"Uncommon",col:"#6fcf8e"},{name:"Rare",col:"#5aa9f0"},{name:"Legendary",col:"#e8b64a"},{name:"Mythic",col:"#e86bd8"}];
const KEY="everspire.climb.v1",TIER_AT=[0,60,200,500,1200],STARTERS=["kitsune","lioness","wolf"];
const spr=(h,s)=>E("img",{src:"assets/sprites/"+h+".128.webp",alt:"",draggable:"false",width:s,height:s,onerror:ev=>{const u=ACAD.pixelURL?ACAD.pixelURL(h):"";if(u&&ev.target.src!==u)ev.target.src=u}});
const fmt=n=>Math.round(n).toLocaleString();
/* small synthesised sounds, on by default here, one switch in the run */
const SND={on:true,ctx:null,last:{}};try{SND.on=localStorage.getItem("everspire.climb.snd")!=="0"}catch(e){}
const TONES={gem:[[1500,.03]],coin:[[880,.05],[1320,.08]],hurt:[[150,.14]],kill:[[260,.025]],cast:[[400,.07],[700,.09],[1000,.12]],level:[[660,.08],[880,.08],[1100,.08],[1320,.16]],chest:[[523,.1],[659,.1],[784,.1],[1046,.25]],boss:[[110,.3],[98,.45]],win:[[523,.12],[659,.12],[784,.12],[1046,.4]],lose:[[300,.2],[220,.2],[160,.4]]};
SND.play=(n,th)=>{if(!SND.on)return;const now=performance.now();if(th&&SND.last[n]&&now-SND.last[n]<th)return;SND.last[n]=now;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;SND.ctx=SND.ctx||new A();if(SND.ctx.state==="suspended")SND.ctx.resume();let t=SND.ctx.currentTime+.005;(TONES[n]||[]).forEach(([f,d])=>{const o=SND.ctx.createOscillator(),g=SND.ctx.createGain();o.type=n==="hurt"||n==="boss"?"sawtooth":"triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(n==="kill"||n==="gem"?.025:.06,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(SND.ctx.destination);o.start(t);o.stop(t+d+.02);t+=d*.9})}catch(e){}};
C.snd=SND;
const members=g=>((ACAD.GROUPS||[]).find(x=>x.id===g)||{members:[]}).members.slice();

/* ---------- saved progress ---------- */
let M=null;
function load(){try{M=JSON.parse(localStorage.getItem(KEY)||"null")}catch(e){M=null}
  if(!M||!M.free){M={gold:0,up:{},free:{},ess:{},runs:0,wins:0,best:{},sel:{hero:STARTERS[0],floor:0,boss:null}}}
  STARTERS.forEach(h=>M.free[h]=1);M.ess=M.ess||{};M.best=M.best||{};M.sel=M.sel||{hero:STARTERS[0],floor:0,boss:null};return M}
function save(){try{localStorage.setItem(KEY,JSON.stringify(M))}catch(e){}}
const tierOf=h=>{const e=M.ess[h]||0;let t=0;TIER_AT.forEach((v,i)=>{if(e>=v)t=i});return t};
const floorOpen=i=>i===0||members(C.FLOORS[i-1].g).filter(h=>M.free[h]).length>=3;
const metaFor=h=>({up:M.up,tierMul:1+.08*tierOf(h)});

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
function page(body){U.ensure();U.show();injectCss();const r=root();r.textContent="";r.append(E("div",{class:"page"},E("div",{class:"cl-wrap"},body)))}

/* ---------- home: the tower ---------- */
let sel=null;
function home(){load();sel=M.sel;if(!floorOpen(sel.floor))sel.floor=0;
  const top=E("div",{class:"cl-top"},E("button",{type:"button",onclick:()=>U.title()},"Menu"),E("h2",null,"Climb the Spire"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold)),E("button",{type:"button",onclick:powers},"Powers"),E("button",{type:"button",onclick:recipes},"Recipes"),E("button",{type:"button",onclick:()=>ENC.open("home")},"Codex"));
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
      E("div",{class:"cl-kit"},spr(sel.hero,96),E("div",null,E("b",{style:{fontSize:"17px"}},HN(sel.hero)),E("span",{class:"chip",style:{marginLeft:"8px",borderColor:tc,color:tc}},PT[t].name),
        E("div",{class:"mut"},wd.ic+" "+wd.n+" · "+wd.d),E("div",{class:"mut"},"Gift: "+kit.trait.d),kit.x?E("div",{class:"mut"},"Heirloom: "+PS[kit.heir].n+" · "+PS[kit.heir].d):null,kit.x?E("div",{class:"mut"},"Ability: "+kit.x.an+" · "+C.ABILITIES[kit.x.ab].d):null,E("div",{class:"mut"},"Health "+(kit.hp)+" · power ×"+(1+.08*t).toFixed(2)),
        E("div",{class:"bar",style:{margin:"6px 0 2px"}},E("i",{style:{width:Math.min(100,100*((M.ess[sel.hero]||0)-TIER_AT[t])/((TIER_AT[t+1]||TIER_AT[t]+1)-TIER_AT[t]))+"%",background:tc}})),
        E("div",{class:"mut",style:{fontSize:"12px"}},TIER_AT[t+1]?"Essence "+Math.floor(M.ess[sel.hero]||0)+" / "+TIER_AT[t+1]+" to "+PT[t+1].name:"Mythic: the summit"))),
      E("div",{class:"cl-heroes"},...hs.map(h=>{const tt=tierOf(h),hk=C.heroKit(h);return E("button",{type:"button",class:"cl-h"+(h===sel.hero?" on":""),style:{"--tc":PT[tt].col},onclick:()=>{sel.hero=h;save();drawPanel()}},spr(h,64),E("div",{class:"nm"},HN(h)),E("small",null,W[hk.start].ic+" "+W[hk.start].n))}))));
    panel.append(E("div",{class:"row",style:{marginTop:"12px"}},E("button",{type:"button",class:"pri",style:{fontSize:"17px",padding:"10px 22px"},onclick:()=>startRun(sel.hero,fi,sel.boss)},"Climb"),C.story?E("button",{type:"button",onclick:()=>C.story.open(sel.hero,M,drawPanel)},"Her story"+(C.story.fresh(M,sel.hero).length?" ("+C.story.fresh(M,sel.hero).length+" new)":"")):null,E("span",{class:"mut"},"One floor, about nine minutes. Move; she fights on her own.")))};
  page(E("div",null,top,E("div",{class:"cl-grid"},tower,panel)));drawTower();drawPanel()}

/* ---------- powers ---------- */
const UPD={might:["Every hit deals more damage.","+5% damage per rank","%",5],armor:["Each hit you take hurts less (flat).","-1 damage taken per rank","",1],maxhp:["More health to start each run.","+10% max health per rank","%",10],recovery:["Slowly heals you while you climb.","+0.1 health per second per rank","",.1],cooldown:["Weapons fire sooner.","-2.5% weapon cooldown per rank","%",2.5],area:["Bigger blasts, whips and auras.","+5% weapon size per rank","%",5],speed:["Shots and thrown things fly faster.","+10% projectile speed per rank","%",10],dur:["Effects and zones last longer.","+15% duration per rank","%",15],amount:["One extra projectile for every weapon.","+1 projectile","",1],move:["You walk faster, so dodging is easier.","+5% move speed per rank","%",5],magnet:["Gems and coins are pulled from farther away.","+25% pickup range per rank","%",25],luck:["Better level-up choices, more chests and drops.","+10% luck per rank","%",10],growth:["Level up sooner.","+3% experience per rank","%",3],greed:["More gold at the end of a run.","+10% gold per rank","%",10],curse:["Riskier: enemies are tougher and more numerous, but you earn more gold and experience.","+10% enemy strength per rank","%",10],revive:["Once per run, you get back up at 60% health instead of falling.","1 extra life","",1],reroll:["Redraw the three cards at a level-up.","+1 reroll each run per rank","",1],skip:["Skip a level-up and take nothing, to keep your build tidy.","+1 skip each run per rank","",1],banish:["Remove a card from this run's level-ups for good.","+1 banish each run per rank","",1]};
function powers(){load();const g=E("div",{class:"cl-up"});
  C.UPGRADES.forEach(u=>{const rk=M.up[u.k]||0,mx=u.max||5,cost=C.upCost(u,rk),can=rk<mx&&M.gold>=cost,d=UPD[u.k]||["",""],now=d[3]?Math.round(rk*d[3]*10)/10:0,nx=d[3]?Math.round((rk+1)*d[3]*10)/10:0,cur=d[3]&&d[2]==="%"?"Now +"+now+"%":d[3]?"Now +"+now:"";
    g.append(E("div",{class:"card"},E("b",null,u.ic+" "+u.n),E("div",{style:{fontSize:"13px",margin:"2px 0"}},d[0]),E("div",{class:"mut",style:{fontSize:"12px"}},d[1]+(cur?" · "+cur:"")+(rk<mx&&d[3]&&d[2]==="%"?" → +"+nx+"%":"")),E("div",{class:"mut"},"Rank "+rk+" of "+mx),E("div",{class:"bar",style:{margin:"4px 0"}},E("i",{style:{width:100*rk/mx+"%"}})),
      E("button",{type:"button",class:can?"pri sm":"sm",disabled:!can,onclick:()=>{M.gold-=cost;M.up[u.k]=rk+1;save();powers()}},rk>=mx?"Maxed":"💰 "+cost)))});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Powers"),E("span",{class:"chip hot"},"💰 "+fmt(M.gold))),E("p",{class:"mut"},"Permanent strengths for every hero, bought with gold from your runs. Each rank adds the amount shown; buying costs more every rank. They apply to every girl, on every floor."),g))}

/* ---------- recipes: every weapon combination, found ones in full ---------- */
function recipes(){load();const found=M.evo||{},ev=M.evo=found;
  const rows=[],seen={};
  Object.keys(W).forEach(id=>{const d=W[id];if(d.evolved||d.sig)return;
    if(d.evo&&W[d.evo[1]])rows.push({to:d.evo[1],a:[d],p:PS[d.evo[0]]});
    if(d.union&&W[d.union[1]]&&!seen[d.union[1]]){seen[d.union[1]]=1;rows.push({to:d.union[1],a:[d,W[d.union[0]]]})}});
  const sig=Object.keys(W).filter(id=>W[id].sig&&!W[id].evolved);
  const card=r=>{const ok=found[r.to],t=W[r.to],how=r.p?r.a[0].n+" at full level, plus "+r.p.ic+" "+r.p.n+" (any level) in your slots":r.a.map(x=>x.n).join(" and ")+", both at full level";
    return E("div",{class:"card",style:{opacity:ok?1:.8}},E("div",{style:{fontSize:"26px"}},ok?t.ic:"🔒"),E("b",{style:{color:ok?t.c:"inherit"}},ok?t.n:"Unknown evolution"),
      E("div",{class:"mut",style:{fontSize:"12px",margin:"2px 0"}},(r.a.map(x=>x.ic).join(" + "))+(r.p?" + "+r.p.ic:"")+" → "+(ok?t.ic:"❔")),
      E("div",{style:{fontSize:"13px"}},ok?t.d:"Discover it by opening a chest with the ingredients ready."),E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},how+". Then open any chest."))};
  const nf=rows.filter(r=>found[r.to]).length,sf=sig.filter(id=>found["x_"+id.slice(2)]).length;
  const sg=sig.filter(id=>found["x_"+id.slice(2)]).map(id=>{const h=id.slice(2),a=W["x_"+h],b=W[id],p=PS["hr_"+h];return E("div",{class:"card"},E("div",{style:{fontSize:"26px"}},a.ic),E("b",{style:{color:a.c}},a.n),E("div",{class:"mut",style:{fontSize:"12px"}},HN(h)+(p?" · "+p.n:"")),E("div",{style:{fontSize:"13px"}},a.d||""),E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},b.n+" at full level plus her heirloom, then any chest."))});
  page(E("div",null,E("div",{class:"cl-top"},E("button",{type:"button",onclick:home},"Back"),E("h2",null,"Recipes"),E("span",{class:"chip hot"},nf+" / "+rows.length+" found")),
    E("p",{class:"mut"},"A weapon evolves when it reaches full level while you also carry the matching item (or, for pairs, both weapons are full level). Then the next chest you open, from an elite, a rare one or the challenger, turns them into something stronger. Found evolutions fill in here as you make them; the rest show what is needed."),
    E("div",{class:"cl-up"},...rows.map(card)),
    E("h3",null,"Her awakenings ("+sf+" / "+sig.length+")"),E("p",{class:"mut"},"Each girl's own weapon awakens with her own heirloom. Found ones are listed."),
    sg.length?E("div",{class:"cl-up"},...sg):E("p",{class:"mut"},"None yet. Max her signature weapon, pick up her heirloom, and open a chest.")))}

/* ---------- a run ---------- */
let RUN=null,raf=0,keys={},stickEl=null;
function startRun(hero,fi,boss){stopRun();load();const f=C.FLOORS[fi];U.ensure();U.show();injectCss();const r=root();
  const ov=E("div",{class:"cl-ov",id:"clOv"}),cv=E("canvas"),hud=E("div",{class:"cl-hud"});ov.append(cv,hud);r.append(ov);
  const run=RUN=new C.Run({hero,floor:f.g,floorIndex:fi,boss,meta:metaFor(hero)});
  const xp=E("i"),xpb=E("div",{class:"xp"},xp),hpf=E("i",{style:{background:"linear-gradient(90deg,#ff4a6a,#ff8a9a)"}}),hpt=E("small"),lvt=E("b"),tm=E("div",{class:"tm"}),rt=E("div",{class:"rt"}),it=E("div",{class:"it"}),bossBar=E("div",{class:"boss"},E("div",{class:"bn"}),E("div",{class:"cl-bar"},E("i",{style:{background:"#ff5a7a"}}))),tip=E("div",{class:"tip"},"Drag or use WASD to move. She fights on her own."+(run.hzNote?" "+run.hzNote:""));
  stickEl=E("div",{class:"cl-stick"},E("i"));
  const pauseBtn=E("button",{type:"button",class:"sm",onclick:()=>pauseMenu()},"Pause");
  const sndBtn=E("button",{type:"button",class:"sm",style:{marginLeft:"4px"},onclick:()=>{SND.on=!SND.on;try{localStorage.setItem("everspire.climb.snd",SND.on?"1":"0")}catch(e){}sndBtn.textContent=SND.on?"♪":"♪ off";SND.play("level")}},SND.on?"♪":"♪ off");
  rt.append(E("div",{class:"gd"}),E("div",{class:"kl"}),E("div",null,pauseBtn,sndBtn));
  const ABIC={nova:"💥",dash:"💨",heal:"💗",freeze:"❄️",summon:"👻",dome:"🔰",gravity:"🌀",blink:"✨",storm:"🌩️",meteor:"☄️",volley:"🎯",haste:"⚡"};
  const abBtn=run.ab?E("button",{type:"button",class:"cl-ab",style:{"--ac":run.ab.col},title:run.ab.name+": "+run.ab.d,onclick:()=>run.cast()},E("span",null,ABIC[run.ab.arch]||"✦"),E("small",null,run.ab.name)):null;
  hud.append(xpb,E("div",{class:"hp"},E("div",null,lvt," ",hpt),E("div",{class:"cl-bar"},hpf)),tm,rt,it,bossBar,tip,stickEl,...(abBtn?[abBtn]:[]));setTimeout(()=>{tip.style.opacity=0},5000);
  const ctx=cv.getContext("2d");let w=0,h=0;
  const fit=()=>{const dpr=Math.min(2,window.devicePixelRatio||1),b=ov.getBoundingClientRect();w=b.width;h=b.height;cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);run.dpr=dpr};fit();addEventListener("resize",fit);ov._fit=fit;
  /* input: keys and a floating stick */
  const kd=e=>{keys[e.key.toLowerCase()]=1;if(e.key==="Escape"||e.key==="p")pauseMenu();if(e.key===" "||e.key==="e"||e.key==="q")run.cast();if(["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e.key.toLowerCase()))e.preventDefault()},ku=e=>{keys[e.key.toLowerCase()]=0};
  addEventListener("keydown",kd);addEventListener("keyup",ku);ov._off=()=>{removeEventListener("keydown",kd);removeEventListener("keyup",ku);removeEventListener("resize",fit)};
  let sid=null,sx=0,sy=0,sv=[0,0];
  ov.addEventListener("pointerdown",e=>{if(e.target.closest("button,.cl-modal"))return;sid=e.pointerId;sx=e.clientX;sy=e.clientY;sv=[0,0];stickEl.style.display="block";stickEl.style.left=sx+"px";stickEl.style.top=sy+"px";ov.setPointerCapture(e.pointerId)});
  ov.addEventListener("pointermove",e=>{if(e.pointerId!==sid)return;let dx=e.clientX-sx,dy=e.clientY-sy;const d=Math.hypot(dx,dy),mx=50;if(d>mx){dx*=mx/d;dy*=mx/d}sv=Math.abs(dx)+Math.abs(dy)<6?[0,0]:[dx/mx,dy/mx];stickEl.firstChild.style.transform="translate("+dx+"px,"+dy+"px)"});
  const up=e=>{if(e.pointerId!==sid)return;sid=null;sv=[0,0];stickEl.style.display="none";stickEl.firstChild.style.transform=""};ov.addEventListener("pointerup",up);ov.addEventListener("pointercancel",up);
  const vis=()=>{if(document.hidden&&RUN&&!RUN.ended&&!RUN.paused)pauseMenu()};document.addEventListener("visibilitychange",vis);const prevOff=ov._off;ov._off=()=>{prevOff();document.removeEventListener("visibilitychange",vis)};
  /* what the run asks of the screen */
  run.cb.level=(ch,go)=>levelModal(ov,run,ch,go);run.cb.chest=(got,go)=>chestModal(ov,run,got,go);
  run.cb.boss=id=>{bossBar.style.display="block";SND.play("boss")};run.cb.end=res=>{SND.play(res.win?"win":"lose");setTimeout(()=>finish(res,ov),run.won?400:900)};
  /* hud paint */
  let hudT=0,iconKey="";const hudPaint=()=>{const P=run.stats;xp.style.width=Math.min(100,100*run.xp/C.xpNeed(run.lv))+"%";hpf.style.width=Math.max(0,100*run.hp/P.maxhp)+"%";hpt.textContent=Math.ceil(Math.max(0,run.hp))+" / "+P.maxhp;lvt.textContent="Lv "+run.lv;
    const s=Math.floor(run.t);tm.textContent=Math.floor(s/60)+":"+String(s%60).padStart(2,"0");rt.firstChild.textContent="💰 "+run.gold;rt.children[1].textContent="☠ "+run.kills+" · 👾 "+run.en.length;
    const k=run.wp.map(x=>x.id+x.lv).join(",")+"|"+Object.entries(run.pa).join(",");if(k!==iconKey){iconKey=k;it.textContent="";run.wp.forEach(x=>it.append(E("span",{title:x.def.n,style:{borderColor:x.def.c}},x.def.ic,E("b",null,x.def.evolved?"★":x.lv>=C.maxLv(x.id)?"MAX":x.lv))));Object.keys(run.pa).forEach(id=>it.append(E("span",{title:PS[id].n},PS[id].ic,E("b",null,run.pa[id]))))}
    if(abBtn){const a=run.ab,pc=a.cd>0?100*(1-a.cd/(a.max*run.stats.cooldown)):100;abBtn.style.setProperty("--p",Math.max(0,Math.min(100,pc)));abBtn.classList.toggle("ready",a.cd<=0);abBtn.lastChild.textContent=a.cd>0?a.name+" · "+Math.ceil(a.cd)+"s":a.name+" · ready"}
    if(run.bossE){bossBar.style.display="block";bossBar.firstChild.textContent=HN(run.bossId)+" · the challenger";bossBar.lastChild.firstChild.style.width=Math.max(0,100*run.bossE.hp/run.bossE.mhp)+"%"}else if(run.won)bossBar.style.display="none"};
  let last=performance.now(),acc=0;
  let pv={xp:0,lv:1,gold:0,hp:run.hp,kills:0,cd:0};
  const frame=now=>{if(RUN!==run)return;const dt=Math.min(.1,(now-last)/1000);last=now;
    if(!run.ended){let dx=sv[0],dy=sv[1];if(keys.a||keys.arrowleft)dx-=1;if(keys.d||keys.arrowright)dx+=1;if(keys.w||keys.arrowup)dy-=1;if(keys.s||keys.arrowdown)dy+=1;run.dir=[dx,dy];acc+=dt;let n=0;while(acc>=1/60&&n++<4){run.step(1/60);acc-=1/60}}
    ctx.setTransform(run.dpr||1,0,0,run.dpr||1,0,0);run.draw(ctx,w,h,now);
    if(run.xp>pv.xp&&run.lv===pv.lv)SND.play("gem",70);if(run.gold>pv.gold)SND.play("coin",90);if(run.hp<pv.hp-.5)SND.play("hurt",160);if(run.kills>pv.kills)SND.play("kill",110);if(run.ab&&run.ab.cd>pv.cd+1)SND.play("cast");
    pv={xp:run.xp,lv:run.lv,gold:run.gold,hp:run.hp,kills:run.kills,cd:run.ab?run.ab.cd:0};
    hudT-=dt;if(hudT<=0){hudT=.1;hudPaint()}raf=requestAnimationFrame(frame)};
  raf=requestAnimationFrame(frame);window.__climb=run;
  if(!M.intro){run.paused=true;const m=E("div",{class:"cl-modal"},E("h2",null,"How a climb works"),E("div",{class:"cl-cards"},...[["🕹️","Move","Drag on the screen, or use WASD. Your weapons fire on their own."],["💎","Collect gems","Blue gems level you up. Pick one of the cards each time."],["🎁","Chests","Elites at 3:00 and 6:00 drop chests that upgrade or evolve your weapons."],["👑","The challenger","At 9:00 a girl blocks the floor. Beat her and she joins you."]].map(([i,t,d])=>E("div",{class:"cl-card",style:{cursor:"default","--cc":"#9ad8ff"}},E("div",{class:"cic"},i),E("b",null,t),E("small",null,d)))),E("div",{class:"mut"},"Space or E uses her ability. The ♪ button turns sound off."),E("button",{type:"button",class:"pri",onclick:()=>{M.intro=1;save();m.remove();run.paused=false}},"Begin"));ov.append(m)}}
function stopRun(){cancelAnimationFrame(raf);raf=0;const ov=document.getElementById("clOv");if(ov){if(ov._off)ov._off();ov.remove()}RUN=null;keys={}}

function pauseMenu(){const run=RUN,ov=document.getElementById("clOv");if(!run||!ov||run.ended||ov.querySelector(".cl-modal"))return;const was=run.paused;run.paused=true;
  const m=E("div",{class:"cl-modal"},E("h2",null,"Paused"),E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:()=>{m.remove();run.paused=was}},"Resume"),E("button",{type:"button",onclick:()=>{if(confirm("Leave this climb? You keep nothing from it.")){stopRun();home()}}},"Leave the climb")),
    E("div",{class:"mut",style:{maxWidth:"420px",textAlign:"center"}},"Move with WASD, the arrow keys, or by dragging on the screen. Your weapons fire on their own. Collect the blue gems to level up and choose."));
  ov.append(m)}

function levelModal(ov,run,ch,go){let cur=ch,banish=false;const m=E("div",{class:"cl-modal"}),draw=()=>{m.textContent="";m.append(E("h2",null,banish?"Choose one to banish":"Level "+run.lv+"!"));
    const cards=E("div",{class:"cl-cards"});cur.forEach(c=>{const l=run.label(c),b=E("button",{type:"button",class:"cl-card",style:{"--cc":l.c},onclick:()=>{if(banish){run.banished[c.id]=true;run.bn--;banish=false;cur=run.choices();draw();return}run.apply(c);m.remove();go()}},E("div",{class:"cic"},l.ic),E("em",null,c.type==="weapon"?(c.lv===1?"New weapon":"Weapon · level "+c.lv):c.type==="passive"?(c.lv===1?"New item":"Item · level "+c.lv):"Reward"),E("b",null,l.n),E("small",null,l.d),l.evo?E("small",{style:{opacity:.8}},"Evolves with "+l.evo):null);cards.append(b)});
    m.append(cards);const row=E("div",{class:"row"});
    row.append(E("button",{type:"button",class:"sm",disabled:run.rr<=0,onclick:()=>{run.rr--;cur=run.choices();draw()}},"Reroll ("+run.rr+")"),E("button",{type:"button",class:"sm",disabled:run.sk<=0,onclick:()=>{run.sk--;m.remove();go()}},"Skip ("+run.sk+")"),E("button",{type:"button",class:"sm"+(banish?" on":""),disabled:run.bn<=0&&!banish,onclick:()=>{banish=!banish;draw()}},"Banish ("+run.bn+")"));m.append(row)};
  draw();ov.append(m);SND.play("level")}

function chestModal(ov,run,got,go){let i=0;const m=E("div",{class:"cl-modal"}),show=()=>{m.textContent="";const g=got[i];let l,tit,sub;
    if(g.kind==="evo"){M.evo=M.evo||{};M.evo[g.id]=1;save();const d=W[g.id];l={ic:d.ic,n:d.n,d:d.d,c:d.c};tit="Evolution!";sub=g.from.map(x=>W[x].n).join(" + ")+" becomes"}
    else if(g.kind==="up"){l=run.label(g.ch);tit="The chest opens";sub=g.ch.lv>1?"Upgraded to level "+g.ch.lv:"New"}else{l={ic:"💰",n:"A purse of gold",d:"+50 gold",c:"#ffd24a"};tit="The chest opens";sub=""}
    m.append(E("h2",null,tit),E("div",{class:"mut"},sub),E("div",{class:"cl-cards"},E("div",{class:"cl-card"+(g.kind==="evo"?" evo":""),style:{"--cc":l.c,cursor:"default"}},E("div",{class:"cic",style:{fontSize:"54px"}},l.ic),E("b",null,l.n),E("small",null,l.d))),
      E("button",{type:"button",class:"pri",onclick:()=>{i++;if(i>=got.length){m.remove();go()}else show()}},i+1>=got.length?"Take it":"Next ("+(i+1)+"/"+got.length+")"))};
  show();ov.append(m);SND.play("chest")}

/* ---------- result ---------- */
function finish(res,ov){load();const h=res.hero,bossId=res.boss,before=tierOf(h);M.gold+=res.gold;M.runs++;M.ess[h]=(M.ess[h]||0)+res.ess;
  let freed=false;if(res.win){M.wins++;M.best[res.floor]=Math.max(M.best[res.floor]||0,res.t);if(bossId&&!M.free[bossId]){M.free[bossId]=1;freed=true}}save();
  const sa=C.story?C.story.award(M,res,freed):null;if(sa)save();
  const after=tierOf(h),m=E("div",{class:"cl-modal"},E("h2",null,res.win?"The floor is yours":"You fell"),
    freed?E("div",{style:{textAlign:"center"}},spr(bossId,120),E("div",{style:{fontSize:"18px",color:"#ffe27a"}},HN(bossId)+" joins you.")):null,
    E("div",{class:"chips"},E("span",{class:"chip hot"},"💰 +"+fmt(res.gold)),E("span",{class:"chip"},"☠ "+res.kills),E("span",{class:"chip"},"Level "+res.lv),E("span",{class:"chip"},Math.floor(res.t/60)+":"+String(Math.floor(res.t%60)).padStart(2,"0")),E("span",{class:"chip hot"},"✦ +"+res.ess+" essence for "+HN(h))),
    after>before?E("div",{style:{color:PT[after].col,fontSize:"18px"}},HN(h)+" ascends to "+PT[after].name+"."):null,
    sa?E("div",{class:"chips"},...Object.keys(sa.gain).map(g=>E("span",{class:"chip"},"♥ "+HN(g)+" +"+sa.gain[g]+" bond")),...sa.newly.map(x=>E("span",{class:"chip hot"},"New scene"+(x.n>1?"s ("+x.n+")":"")+": "+HN(x.h)))):null,
    E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:()=>{stopRun();home()}},"Back to the tower"),E("button",{type:"button",onclick:()=>{stopRun();startRun(h,res.floor,bossId&&!M.free[bossId]?bossId:bossId)}},res.win?"Climb again":"Try again")));
  ov.append(m);if(after>before&&ACAD.head&&ACAD.head.ui&&ACAD.head.ui.flourish)ACAD.head.ui.flourish(h,after);else if(freed&&ACAD.sfx)ACAD.sfx.play("fanfare")}

C.titleButtons=mk=>[mk("Climb the Spire","Fight upward through the Everspire, one floor at a time",home,true)];
C.home=home;C.stop=stopRun;C.save=()=>M;
})();
