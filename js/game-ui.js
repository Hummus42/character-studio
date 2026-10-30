/* v315: Everspire as a game. A full-screen root sits over the studio: title menu (Continue, New Game, Load, Character Creator, Codex, Settings), then the game
   screen, which is the living map with the patron's protégées on it. The Encyclopedia is the game's Codex; the studio is its Character Creator.
   Rules are in game-core.js, the map in blk-map.js. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.game||!ENC.E)return;
const G=ACAD.game,E=ENC.E,HN=ENC.HN,SID=G.SID,SNAME=G.SNAME,L=()=>ACAD.livemap;
const PREF_KEY="everspire.prefs.v1";
let P={autoRest:true,autoEnter:true,montage:true,everyone:false};try{Object.assign(P,JSON.parse(localStorage.getItem(PREF_KEY)||"{}"))}catch(e){}
const savePrefs=()=>{try{localStorage.setItem(PREF_KEY,JSON.stringify(P))}catch(e){}};
let root,S=null,slot=0,tab="today",sel=null,ctl=null,HS=null,says="",sayT=0,letterSel=null,letterLast=null,filterQ="",filterG="",skip=false,busy=false;
const fmt=n=>Math.round(n),pct=(v,m)=>Math.max(0,Math.min(100,v/(m||100)*100)),grp=h=>ACAD.GROUP_OF(h);
const col=h=>{const g=grp(h);return ENC.crestCols&&g?ENC.crestCols(g.id):{field:"#2a2f4a",band:"#c9a24a"}};
const spr=(h,size,cls)=>E("img",{src:"assets/sprites/"+h+".128.webp",alt:"",draggable:"false",class:cls||"",width:size,height:size,onerror:ev=>{const u=ACAD.pixelURL?ACAD.pixelURL(h):"";if(u&&ev.target.src!==u)ev.target.src=u}});
const DAYN=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],DAYF=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const wait=ms=>new Promise(r=>setTimeout(r,ms));

const css=`
html.ev-open,html.ev-open body{overflow:hidden}
#evRoot{position:fixed;inset:0;z-index:5000;background:#100d26;color:#f1ead8;font:15px/1.45 Georgia,serif;overflow:hidden;--g-card:#1f1b40;--g-line:#3b3568;--g-gold:#d8b25a;--g-mut:#b3ab94;--g-ok:#7fd49a;--g-bad:#e58a8a}
#evRoot.off{display:none}
#evRoot *{box-sizing:border-box}
#evRoot button{font:inherit;color:inherit;background:var(--g-card);border:1px solid #4d4488;border-radius:8px;padding:6px 12px;cursor:pointer}
#evRoot button:hover:not(:disabled){border-color:var(--g-gold)}
#evRoot button:disabled{opacity:.45;cursor:default}
#evRoot button.pri{background:var(--g-gold);color:#241b06;border-color:transparent;font-weight:700}
#evRoot button.sm{padding:3px 9px;font-size:13px}
#evRoot input[type=text],#evRoot input[type=search],#evRoot select{font:inherit;color:inherit;background:#0d0a20;border:1px solid var(--g-line);border-radius:8px;padding:6px 10px;max-width:100%}
#evRoot h2{font:700 24px Georgia;margin:0 0 6px;color:var(--g-gold)}#evRoot h3{font:700 17px Georgia;margin:14px 0 6px}
#evRoot .mut{color:var(--g-mut);font-size:13.5px}
#evRoot .card{background:var(--g-card);border:1px solid var(--g-line);border-radius:12px;padding:12px 14px}
#evRoot .grid{display:grid;gap:12px}#evRoot .g3{grid-template-columns:repeat(auto-fill,minmax(290px,1fr))}
#evRoot .row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#evRoot .chips{display:flex;flex-wrap:wrap;gap:4px}
#evRoot .chip{background:#0d0a20;border:1px solid var(--g-line);border-radius:14px;padding:1px 9px;font-size:12.5px;color:var(--g-mut)}#evRoot .chip.hot{border-color:var(--g-gold);color:var(--g-gold)}
#evRoot .bar{height:7px;background:#0d0a20;border-radius:5px;overflow:hidden}#evRoot .bar>i{display:block;height:100%;background:var(--g-gold)}
#evRoot .bar.fat>i{background:#e58a5a}#evRoot .bar.mood>i{background:#7fb6e5}#evRoot .bar.sp>i{background:#e58ac4}
#evRoot .stat{display:grid;grid-template-columns:62px 1fr 34px;gap:6px;align-items:center;font-size:13px;margin:2px 0}
#evRoot .up{color:var(--g-ok)}#evRoot .down{color:var(--g-bad)}
#evRoot .title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;background:linear-gradient(#100d26cc,#100d26ee),#100d26}
#evRoot .title .bg{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.55;filter:saturate(1.1)}
#evRoot .title>*:not(.bg){position:relative}
#evRoot .logo{font:700 clamp(40px,9vw,92px)/1 Georgia;letter-spacing:.14em;color:var(--g-gold);text-shadow:0 4px 30px #000}
#evRoot .tag{color:#d9d2bd;margin-bottom:12px;font-size:clamp(14px,2.2vw,19px);letter-spacing:.06em}
#evRoot .menu{display:flex;flex-direction:column;gap:9px;min-width:min(320px,86vw)}
#evRoot .menu button{padding:11px 18px;font-size:17px;background:#1a1638cc;backdrop-filter:blur(3px)}
#evRoot .menu button.pri{background:var(--g-gold);color:#241b06}
#evRoot .menu button small{display:block;color:var(--g-mut);font-size:12px}#evRoot .menu button.pri small{color:#4b3b12}
#evRoot .foot{position:absolute;bottom:10px;left:0;right:0;color:#8f89a8;font-size:12px}
#evRoot .page{position:absolute;inset:0;overflow:auto;padding:18px 20px 40px;background:#100d26}
#evRoot .page.narrow>div{max-width:900px;margin:0 auto}
#evRoot .cands{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;margin-top:10px}
#evRoot .cand{background:var(--g-card);border:1px solid var(--g-line);border-radius:12px;padding:8px;text-align:center;cursor:pointer}#evRoot .cand.on{border-color:var(--g-gold);box-shadow:0 0 0 2px #d8b25a55}
#evRoot .cand img{width:76px;height:76px}
#evRoot .top{display:flex;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:8px 12px;background:#0d0a20;border-bottom:1px solid var(--g-line)}
#evRoot .brand{font:700 18px Georgia;color:var(--g-gold)}
#evRoot .pill{background:var(--g-card);border:1px solid var(--g-line);border-radius:20px;padding:2px 12px;font-size:14px;white-space:nowrap}
#evRoot .sp{flex:1}
#evRoot .hub{position:absolute;top:48px;bottom:0;left:0;right:0;display:grid;grid-template-columns:minmax(0,1.55fr) minmax(330px,1fr);gap:10px;padding:10px}
#evRoot .left{overflow:auto;min-width:0;padding-right:2px;position:relative}#evRoot .right{overflow:hidden;min-width:0;background:#15112f;border:1px solid var(--g-line);border-radius:12px;display:flex;flex-direction:column}
#evRoot .team{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
#evRoot .mate{display:flex;gap:6px;align-items:center;background:var(--g-card);border:1px solid var(--g-line);border-radius:10px;padding:3px 10px 3px 4px;cursor:pointer}
#evRoot .mate.on{border-color:var(--g-gold);background:#2a2208}#evRoot .mate img{width:34px;height:34px}#evRoot .mate .mini{width:46px}
#evRoot .time{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;margin:8px 0}
#evRoot .time input[type=range]{flex:1;min-width:140px;accent-color:var(--g-gold)}
#evRoot .time button.on{background:var(--g-gold);color:#241b06;border-color:transparent}
#evRoot .cap{background:#0d0a20;border:1px solid var(--g-line);border-radius:10px;padding:6px 12px;min-height:34px}
#evRoot .acts{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}#evRoot .acts button{padding:9px 18px;font-size:16px}
#evRoot .tabs{display:flex;flex-wrap:wrap;gap:4px;padding:8px 10px 0;border-bottom:1px solid var(--g-line)}
#evRoot .tabs button{border-radius:8px 8px 0 0;border-bottom:0;background:transparent}#evRoot .tabs button.on{background:var(--g-card);color:var(--g-gold)}
#evRoot .panel{padding:12px 14px 24px;overflow:auto;flex:1}
#evRoot .slotrow{display:grid;grid-template-columns:98px 1fr;gap:8px;align-items:center;margin:4px 0}
#evRoot .path{display:grid;grid-template-columns:110px 1fr;gap:8px;align-items:start;padding:8px 0;border-top:1px solid var(--g-line)}
#evRoot .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}
#evRoot .step{background:#0d0a20;border:1px solid var(--g-line);border-radius:8px;padding:5px 7px;font-size:12px;text-align:left}
#evRoot .step.on{border-color:var(--g-gold);background:#2a2208}#evRoot .step.next{border-color:#8f86d8}#evRoot .step.lock{opacity:.5}
#evRoot .shelf{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}
#evRoot .trophy{background:#0d0a20;border:1px solid var(--g-line);border-radius:10px;padding:6px;text-align:center;font-size:12px}#evRoot .trophy.empty{opacity:.4;border-style:dashed}
#evRoot .scrap{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px}
#evRoot .scene{position:relative;border:1px solid var(--g-line);border-radius:8px;overflow:hidden;aspect-ratio:640/938;background:#0d0a20;cursor:pointer}
#evRoot .scene img{width:100%;height:100%;object-fit:cover;display:block}
#evRoot .scene.locked{opacity:.35;cursor:default;display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px;color:var(--g-mut);padding:4px}
#evRoot .scene b{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(#0000,#000c);font-size:11px;padding:10px 4px 2px;text-align:center}
#evRoot .cal{display:grid;grid-template-columns:repeat(12,1fr);gap:3px}
#evRoot .wk{background:#0d0a20;border:1px solid var(--g-line);border-radius:6px;min-height:42px;padding:2px 3px;font-size:10.5px;color:var(--g-mut)}#evRoot .wk.now{border-color:var(--g-gold);color:#fff}#evRoot .wk.ev{background:#241d52}#evRoot .wk.past{opacity:.45}
#evRoot .pod{display:grid;grid-template-columns:30px 36px 1fr auto;gap:8px;align-items:center;padding:3px 6px;border-radius:8px}#evRoot .pod.me{background:#2a2208;border:1px solid var(--g-gold)}#evRoot .pod img{width:34px;height:34px}
#evRoot .overlay{position:absolute;inset:0;background:#000b;z-index:20;display:flex;align-items:flex-start;justify-content:center;overflow:auto;padding:26px 12px}
#evRoot .sheet{background:#1a1638;border:1px solid var(--g-gold);border-radius:14px;max-width:780px;width:100%;padding:16px 18px}
#evRoot .bubble{background:#0d0a20;border-left:3px solid var(--g-gold);border-radius:8px;padding:8px 12px;margin:6px 0}
#evRoot .letters{display:grid;grid-template-columns:200px 1fr;gap:10px}
#evRoot .lname{display:flex;gap:8px;align-items:center;padding:3px 6px;border-radius:8px;cursor:pointer}#evRoot .lname:hover,#evRoot .lname.on{background:#2a2552}#evRoot .lname img{width:28px;height:28px}#evRoot .lname small{color:var(--g-mut)}
#evRoot .pop{position:sticky;bottom:6px;z-index:8;background:#1a1638f2;border:1px solid var(--g-gold);border-radius:12px;padding:8px 12px;margin-top:8px}
#evRoot .scenebig{display:grid;grid-template-columns:minmax(0,300px) 1fr;gap:14px;align-items:start}
#evRoot .scenebig>img{width:100%;border-radius:10px;border:1px solid var(--g-gold)}
@media(max-width:900px){
 #evRoot .hub{grid-template-columns:1fr;overflow:auto;display:block}#evRoot .left{overflow:visible}#evRoot .right{margin-top:10px;overflow:visible}
 #evRoot .letters{grid-template-columns:1fr}#evRoot .cal{grid-template-columns:repeat(6,1fr)}#evRoot .steps{grid-template-columns:1fr 1fr}#evRoot .path{grid-template-columns:1fr}#evRoot .slotrow{grid-template-columns:1fr}
 #evRoot .scenebig{grid-template-columns:1fr}}
`;

function rosette(tier,color,rank){const NS="http://www.w3.org/2000/svg",c={gold:"#e0b53a",silver:"#c3c9d4",bronze:"#bb7a40",finalist:color||"#6d7fb8",entered:"#8b8ba2"}[tier]||"#888";
  const d=(t,a)=>{const e=document.createElementNS(NS,t);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));return e};
  const s=d("svg",{viewBox:"0 0 60 76",width:44,height:56});
  s.append(d("polygon",{points:"18,40 8,74 20,66 28,74 30,42",fill:c,opacity:.75}),d("polygon",{points:"42,40 52,74 40,66 32,74 30,42",fill:c,opacity:.9}));
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;s.append(d("circle",{cx:30+Math.cos(a)*22,cy:26+Math.sin(a)*22,r:5.2,fill:c}))}
  s.append(d("circle",{cx:30,cy:26,r:19,fill:c}),d("circle",{cx:30,cy:26,r:14,fill:"none",stroke:"#fff",opacity:.65,"stroke-width":1.5}));
  const t=d("text",{x:30,y:32,"text-anchor":"middle","font-size":18,"font-weight":700,fill:tier==="gold"||tier==="silver"?"#2b2108":"#fff","font-family":"Georgia"});t.textContent=rank||"";s.append(t);return s}

function ensure(){if(root)return;document.head.append(E("style",{id:"gameCss315"},css));root=E("div",{id:"evRoot"});document.body.append(root);document.documentElement.classList.add("ev-open")}
function show(){ensure();root.classList.remove("off");document.documentElement.classList.add("ev-open");const b=document.getElementById("evBack");if(b)b.style.display="none"}
function hide(){root.classList.add("off");document.documentElement.classList.remove("ev-open");let b=document.getElementById("evBack");
  if(!b){b=E("button",{id:"evBack",type:"button",style:{position:"fixed",left:"10px",bottom:"10px",zIndex:4000,background:"#1a1638",color:"#f1ead8",border:"1px solid #d8b25a",borderRadius:"20px",padding:"7px 14px",font:"14px Georgia",cursor:"pointer",boxShadow:"0 2px 10px #0008"},onclick:()=>{show();title()}},"Everspire menu");document.body.append(b)}b.style.display="block"}
const say=m=>{says=m;clearTimeout(sayT);sayT=setTimeout(()=>{says="";const e=root&&root.querySelector(".says");if(e){e.textContent="";e.style.display="none"}},4000);const e=root&&root.querySelector(".says");if(e){e.textContent=m;e.style.display=""}};
const codex=id=>ENC.open(id||"home");
const edition=()=>typeof EVERSPIRE_EDITION!=="undefined"?EVERSPIRE_EDITION:"public";

/* ---------- title ---------- */
function title(){ensure();show();dispose();S=null;root.textContent="";const last=G.lastSlot(),ls=last>=0?G.load(last):null;
  const mk=(label,sub,fn,pri)=>E("button",{type:"button",class:pri?"pri":"",onclick:fn},label,sub?E("small",null,sub):null);
  const m=E("div",{class:"menu"},
    ...(ls?[mk("Continue","Patron "+ls.name+" · "+G.dateOf(ls).label,()=>{slot=last;enter(ls)},true)]:[]),
    mk("New Game","Back up to three girls through six years",()=>{slot=firstFree();newGame([])},!ls),
    mk("Load Game","Slots, and saves from a file",loadGame),
    mk("Character Creator","Design a girl, a look or a scene",()=>{hide()}),
    mk("Codex","The Academy, its Houses and its history",()=>codex("home")),
    mk("Settings","Standing orders and display",settings));
  root.append(E("div",{class:"title"},E("div",{class:"bg",style:{backgroundImage:"url(assets/rooms/portal_castle.webp)"}}),E("div",{class:"logo"},"EVERSPIRE"),E("div",{class:"tag"},"A patron's tale of the Academy"),m,
    E("div",{class:"foot"},"Everspire Academy · "+(edition()==="admin"?"admin edition":"public edition"))))}
function firstFree(){const s=G.slots();const i=s.findIndex(x=>!x);return i<0?0:i}

function loadGame(){root.textContent="";const slots=G.slots(),page=E("div",{class:"page narrow"}),w=E("div");
  w.append(E("div",{class:"row"},E("button",{type:"button",onclick:title},"Back"),E("h2",{style:{margin:0}},"Load game")));
  const grid=E("div",{class:"grid g3",style:{marginTop:"12px"}});
  slots.forEach((s,i)=>{const c=E("div",{class:"card"});
    if(s){const d=G.dateOf(s);c.append(E("b",null,"Slot "+(i+1)+": Patron "+s.name),E("div",{class:"mut"},d.label+" · "+d.yname),E("div",{class:"row",style:{margin:"6px 0"}},...s.order.map(h=>spr(h,44))),E("div",{class:"mut"},s.record.wins+" wins · "+s.record.medals+" medals"),
      E("div",{class:"row",style:{marginTop:"8px"}},E("button",{type:"button",class:"pri",onclick:()=>{slot=i;enter(s)}},"Load"),
        E("button",{type:"button",class:"sm",onclick:()=>{const b=new Blob([G.exportRun(s)],{type:"application/json"});const a=E("a",{href:URL.createObjectURL(b),download:"everspire-"+s.name.replace(/\W+/g,"_")+"-y"+s.year+"w"+s.week+".json"});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},3000)}},"Export"),
        E("button",{type:"button",class:"sm",onclick:()=>{if(confirm("Delete this save for good?")){G.erase(i);loadGame()}}},"Delete")))}
    else c.append(E("b",null,"Slot "+(i+1)),E("p",{class:"mut"},"Empty."),E("label",{class:"mut"},"Import a save file: ",E("input",{type:"file",accept:".json,application/json",onchange:ev=>{const f=ev.target.files[0];if(!f)return;f.text().then(t=>{try{const r=G.importRun(t);G.save(r,i);loadGame()}catch(e){say("That file isn't an Everspire save.")}})}})));
    grid.append(c)});
  w.append(grid,E("p",{class:"mut says",style:{marginTop:"10px",display:"none"}}));page.append(w);root.append(page)}
function settings(){root.textContent="";const page=E("div",{class:"page narrow"}),w=E("div"),tgt=S?S.settings:null;
  const row=(key,label,text)=>E("label",{class:"card",style:{display:"flex",gap:"12px",alignItems:"flex-start",margin:"8px 0",cursor:"pointer"}},E("input",{type:"checkbox",checked:!!(tgt&&key in tgt?tgt[key]:P[key]),onchange:ev=>{P[key]=ev.target.checked;savePrefs();if(tgt&&key in tgt){tgt[key]=ev.target.checked;G.save(S,slot)}}}),E("div",null,E("b",null,label),E("div",{class:"mut"},text)));
  w.append(E("div",{class:"row"},E("button",{type:"button",onclick:()=>S?hub():title()},"Back"),E("h2",{style:{margin:0}},"Settings")),
    E("p",{class:"mut"},"Standing orders keep the game from becoming a chore. They apply to new runs; a run in progress has its own copy."));
  [["autoRest","Rest tired girls automatically","When a protégée is worn out, the game swaps a training block for rest, and the map shows it."],["autoEnter","Enter contests that suit her","She enters a contest when her stats fit it; you can still change any entry."],["montage","Watch each week on the map","A short tour of where she goes each day. Turn off to see only the results."]].forEach(([k,l,t])=>w.append(row(k,l,t)));
  w.append(row("everyone","Show everyone on the map","Other girls are shown at full strength instead of faded."),E("div",{class:"row",style:{marginTop:"14px"}},E("button",{type:"button",onclick:()=>{hide()}},"Open the Character Creator")));
  page.append(w);root.append(page)}

function newGame(pick,patron){root.textContent="";const chosen=new Set(pick),name=E("input",{type:"text",placeholder:"Your name, patron",value:patron||"",maxlength:24});
  const q=E("input",{type:"search",placeholder:"Search a girl or a group",value:filterQ,oninput:ev=>{filterQ=ev.target.value;fill()}});
  const gs=E("select",{onchange:ev=>{filterG=ev.target.value;fill()}},E("option",{value:""},"Every group"),...ACAD.GROUPS.map(g=>E("option",{value:g.id,selected:g.id===filterG},g.name)));
  const list=E("div",{class:"cands"}),sum=E("div",{class:"row"}),go=E("button",{type:"button",class:"pri"},"Begin");
  const upd=()=>{sum.textContent="";[...chosen].forEach(h=>sum.append(E("span",{class:"chip hot"},HN(h))));go.disabled=!chosen.size;go.textContent=chosen.size?`Begin with ${chosen.size} ${chosen.size>1?"protégées":"protégée"}`:"Choose at least one"};
  function fill(){list.textContent="";const qq=filterQ.toLowerCase();
    ACAD.HOUSES.filter(h=>(!filterG||(grp(h)||{}).id===filterG)&&(!qq||(HN(h)+" "+((BIOS[h]||{}).fullName||"")+" "+((grp(h)||{}).name||"")).toLowerCase().includes(qq))).slice(0,120).forEach(h=>{
      const t=G.topStats(h,2);list.append(E("div",{class:"cand"+(chosen.has(h)?" on":""),onclick:()=>{if(chosen.has(h))chosen.delete(h);else if(chosen.size<3)chosen.add(h);else say("Three is the limit.");fill();upd()}},
        spr(h,76),E("div",null,E("b",null,HN(h))),E("div",{class:"mut"},(grp(h)||{}).name||""),E("div",{class:"chips",style:{justifyContent:"center",marginTop:"4px"}},...t.map(s=>E("span",{class:"chip hot"},SNAME[s])))))})}
  go.onclick=()=>{S=G.newRun(name.value.trim()||"Anonymous",[...chosen]);S.settings=Object.assign(S.settings,{autoRest:P.autoRest,autoEnter:P.autoEnter,montage:P.montage});G.save(S,slot);enter(S)};
  root.append(E("div",{class:"page"},E("div",{class:"row"},E("button",{type:"button",onclick:title},"Back"),E("h2",{style:{margin:0}},"New game")),E("p",{class:"mut"},"Choose up to three protégées. Each is raised toward what her group is good at, and you decide where the effort goes."),
    E("div",{class:"row"},name,q,gs),E("div",{class:"row",style:{margin:"10px 0"}},sum,go,E("span",{class:"mut says",style:{display:"none"}})),list));fill();upd()}

function enter(run){S=G.fix(run);if(!S.order.includes(sel))sel=S.order[0];tab="today";hub()}
function dispose(){if(ctl&&ctl.dispose)ctl.dispose();ctl=null;HS=null;busy=false}
function top(){return E("div",{class:"top"},E("div",{class:"brand"},"Patron "+S.name),E("span",{class:"pill",id:"evDate"},G.dateOf(S).label+" · "+G.dateOf(S).yname),E("span",{class:"pill",id:"evCoins",title:"Coins"},"Coins "+fmt(S.money)),E("span",{class:"pill",id:"evCp",title:"Letters and calls left this week"},"Letters "+S.cp),E("span",{class:"pill says",style:{borderColor:"var(--g-gold)",display:says?"":"none"}},says),E("span",{class:"sp"}),
  E("button",{type:"button",onclick:()=>codex("home")},"Codex"),E("button",{type:"button",onclick:()=>{G.save(S,slot);say("Saved.")}},"Save"),E("button",{type:"button",onclick:()=>{if(busy)return;G.save(S,slot);title()}},"Menu"))}
function refreshTop(){const d=G.dateOf(S);const set=(id,t)=>{const e=root.querySelector("#"+id);if(e)e.textContent=t};set("evDate",d.label+" · "+d.yname);set("evCoins","Coins "+fmt(S.money));set("evCp","Letters "+S.cp)}

/* ---------- the game screen ---------- */
function hub(){ensure();show();dispose();root.textContent="";G.prepareWeek(S);G.syncMap(S);
  HS={area:"castle_ground",room:null,t:600,day:0,sel:sel,follow:true,play:false,speed:1};
  const left=E("div",{class:"left"}),right=E("div",{class:"right"}),team=E("div",{class:"team"}),stageHost=E("div"),cap=E("div",{class:"cap"}),dayRow=E("div",{class:"row"}),slider=E("input",{type:"range",min:360,max:1380,step:5,value:600}),acts=E("div",{class:"acts"}),tabs=E("div",{class:"tabs"}),panel=E("div",{class:"panel"}),pop=E("div");
  left.append(team,stageHost,E("div",{class:"time"},dayRow,slider),cap,acts,pop);right.append(tabs,panel);
  root.append(top(),E("div",{class:"hub"},left,right));
  const L2=L(),emph=new Set(S.order);
  const paintTeam=()=>{team.textContent="";S.order.forEach(h=>{const w=S.wards[h];team.append(E("div",{class:"mate"+(h===sel?" on":""),onclick:()=>choose(h)},spr(h,34),E("div",null,E("b",null,HN(h)),E("div",{class:"bar fat mini"},E("i",{style:{width:pct(w.fatigue)+"%"}})))))})};
  const activity=()=>{if(!sel)return "";const sx=L2.stateAt(sel,HS.t,HS.day),rid=sx.st==="in"||sx.st==="out"?sx.room:sx.to,rn=L2.roomName(rid);let what="";
    if(sx.st==="travel")what="On her way to "+rn;else{const k=sx.kind,plan=G.effectivePlan(S,sel),a=G.ACT[plan[G.slotOfDay(HS.day)]];
      what=k==="train"?a.name+" in "+rn:k==="sleep"?"Asleep in "+rn:k==="breakfast"||k==="brunch"?"Breakfast in "+rn:k==="lunch"?"Lunch in "+rn:k==="dinner"?"Dinner in "+rn:k==="contest"?"Competing at "+rn:k==="festival"?"At the festival in "+rn:k==="evening"?"Evening in "+rn:k==="free"?"Free time in "+rn:k==="curfew"?"Back at "+rn:"In "+rn}
    return E("span",null,E("b",null,HN(sel)),` · ${DAYF[HS.day]} ${L2.fmt(HS.t)} · `,what)};
  const paintCap=()=>{cap.textContent="";cap.append(activity())};
  const paintDays=()=>{dayRow.textContent="";DAYN.forEach((d,i)=>dayRow.append(E("button",{type:"button",class:"sm"+(HS.day===i?" on":""),onclick:()=>{HS.day=i;paintDays();ctl.frame(true);paintCap()}},d)))};
  slider.oninput=()=>{HS.t=+slider.value;ctl.frame(true);paintCap()};
  const choose=h=>{sel=h;HS.sel=h;paintTeam();paintCap();ctl.focus(h,false);ctl.frame(true);paintPanel()};
  const popover=h=>{pop.textContent="";const sx=L2.stateAt(h,HS.t,HS.day),rid=sx.st==="in"||sx.st==="out"?sx.room:sx.to,r=S.rel[h];
    pop.append(E("div",{class:"pop"},E("div",{class:"row"},spr(h,44),E("div",null,E("b",null,HN(h)),E("div",{class:"mut"},((grp(h)||{}).name||"")+" · "+L2.roomName(rid)+(r?" · "+G.STAGELABEL[G.stageOf(r)]:""))),E("span",{class:"sp"}),
      E("button",{type:"button",class:"sm",onclick:()=>{letterSel=h;letterLast=null;tab="letters";pop.textContent="";paintTabs();paintPanel()}},"Write to her"),E("button",{type:"button",class:"sm",onclick:()=>codex("house:"+h)},"Codex"),E("button",{type:"button",class:"sm",onclick:()=>{pop.textContent=""}},"Close"))))};
  ctl=L2.mountStage(stageHost,{state:HS,emph,dim:!P.everyone,onSelect:h=>{if(S.wards[h])choose(h);else popover(h)},tabs:true,onFrame:()=>{}});
  ctl.focus(sel,false);
  const syncMap=()=>{G.syncMap(S);ctl.frame(true);paintCap();paintTeam()};
  const TABS=[["today","Today"],["skills","Skills"],["letters","Letters"],["hall","Hall"],["calendar","Calendar"]];
  function paintTabs(){tabs.textContent="";TABS.forEach(([k,l])=>tabs.append(E("button",{type:"button",class:k===tab?"on":"",onclick:()=>{tab=k;paintTabs();paintPanel()}},l)))}
  function paintPanel(){panel.textContent="";const c={panel,syncMap,repaint:paintPanel,refreshTop,choose};({today,skills,letters,hall,calendar})[tab](panel,c);refreshTop()}
  function paintActs(){acts.textContent="";const ev=G.eventWeek(S);
    acts.append(E("button",{type:"button",class:"pri",disabled:busy||S.year>G.YEARS,onclick:()=>runWeek(ctxAll)},ev?"Run the week (contest!)":"Run the week"),
      E("button",{type:"button",disabled:busy||S.year>G.YEARS,onclick:()=>skipAhead(ctxAll)},ev?"Run to the event":"Skip ahead ▶▶"))}
  const ctxAll={paintActs,left,ctlf:()=>ctl,HSf:()=>HS,refresh:()=>{G.prepareWeek(S);G.syncMap(S);paintTeam();paintCap();paintActs();paintPanel();refreshTop();if(ctl)ctl.frame(true)}};
  paintTeam();paintDays();paintCap();paintTabs();paintPanel();paintActs()}

/* ---------- Today: the selected protégée, her plan, and the contests ahead ---------- */
function upcoming(n){const o=[];for(let k=0;k<n;k++){let wk=S.week+k,y=S.year;if(wk>G.WEEKS){wk-=G.WEEKS;y++}if(y>G.YEARS)break;(G.CBYWEEK[wk]||[]).forEach(c=>o.push({c,wk,y,in:k}))}return o}
function today(pane,ctx){if(!sel||!S.wards[sel])sel=S.order[0];const h=sel,w=S.wards[h],a=G.aptitude(h),g=grp(h),mine=S.accolades.filter(x=>x.h===h);
  const page=E("span",{class:"chip",style:{cursor:"pointer"},onclick:()=>codex("house:"+h)},"Her page");
  pane.append(E("div",{class:"row"},spr(h,72),E("div",null,E("b",{style:{fontSize:"19px"}},HN(h)),E("div",{class:"mut"},(g?g.name:"")+" · "+G.dateOf(S).yname),E("div",{class:"chips",style:{marginTop:"3px"}},E("span",{class:"chip"},mine.filter(x=>x.tier==="gold").length+" gold"),E("span",{class:"chip"},w.sp+" skill pts"),page))));
  pane.append(E("div",{class:"stat",style:{marginTop:"6px"}},E("b",null,"Fatigue"),E("div",{class:"bar fat"},E("i",{style:{width:pct(w.fatigue)+"%"}})),E("span",null,fmt(w.fatigue))),E("div",{class:"stat"},E("b",null,"Mood"),E("div",{class:"bar mood"},E("i",{style:{width:pct(w.mood)+"%"}})),E("span",null,fmt(w.mood))));
  SID.forEach(s=>pane.append(E("div",{class:"stat"},E("b",null,SNAME[s]+(a[s]>=1.2?" ★":"")),E("div",{class:"bar"},E("i",{style:{width:pct(w.stats[s])+"%"}})),E("span",null,fmt(w.stats[s])))));
  const eff=G.effectivePlan(S,h),auto=eff.some((p,i)=>p!==w.plan[i]);
  pane.append(E("h3",null,"This week's plan"),E("p",{class:"mut",style:{margin:"0 0 4px"}},"She keeps this plan every week until you change it, and the map shows it."));
  w.plan.forEach((p,i)=>pane.append(E("div",{class:"slotrow"},E("b",null,G.SLOTS[i]),E("select",{onchange:ev=>{w.plan[i]=ev.target.value;G.save(S,slot);ctx.syncMap();ctx.repaint()}},...G.ACTIONS.map(x=>E("option",{value:x.id,selected:x.id===p},x.name+(x.stat?" ("+SNAME[x.stat]+")":"")+(x.cost?" · "+x.cost+" coins":"")))))));
  const pv=G.preview(w,eff);
  pane.append(E("div",{class:"chips",style:{marginTop:"6px"}},...Object.entries(pv.gains).map(([s,v])=>E("span",{class:"chip hot up"},SNAME[s]+" +"+v)),E("span",{class:"chip"},"ends at fatigue "+pv.fatigue),E("span",{class:"chip"},"mood "+pv.mood)));
  if(auto)pane.append(E("div",{class:"bubble"},"Auto-rest: she is worn out, so the game is giving her extra rest this week."));
  const next=upcoming(12).filter(x=>x.c.kind!=="festival");
  pane.append(E("h3",null,"Contests ahead"));
  if(!next.length)pane.append(E("p",{class:"mut"},"No contests ahead this year."));
  else pane.append(E("div",{class:"grid"},...next.slice(0,6).map(({c,wk,y,in:k})=>{const on=G.entered(S,c.id,h),fit=G.fitOf(w,c),field=G.fieldOf(c,y),key=c.id+":"+y,decided=(S.entries[key]||{})[h]!==undefined;
    return E("div",{class:"card"},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,c.name),E("span",{class:"mut"},k===0?"this week":"in "+k+" week"+(k>1?"s":""))),E("div",{class:"mut"},"Her fit "+fmt(fit)+" vs a field near "+fmt(field)+(on&&!decided?" · entered automatically":"")),
      E("button",{type:"button",class:"sm"+(on?" pri":""),style:{marginTop:"5px"},onclick:()=>{G.enter(S,c.id,h,!on);G.save(S,slot);ctx.syncMap();ctx.repaint()}},on?"Entered: tap to withdraw":"Enter her"))})));
  const log=S.log.slice(-4).reverse();pane.append(E("h3",null,"Log"),E("div",{class:"card"},...log.map(l=>E("div",{class:"mut"},`Y${l.y} W${l.w}: ${l.t}`))))}

function skills(pane,ctx){if(!sel||!S.wards[sel])sel=S.order[0];const h=sel,w=S.wards[h],a=G.aptitude(h);
  pane.append(E("h3",{style:{marginTop:0}},"Skills: "+HN(h)),E("p",{class:"mut"},w.sp+" skill points. Contests earn them; each path has four steps in order. Strengths are starred."));
  G.STATS.forEach(st=>{const n=w.tree[st.id]||0;
    pane.append(E("div",{class:"path"},E("div",null,E("b",null,st.path),E("div",{class:"mut"},SNAME[st.id]+" "+fmt(w.stats[st.id])+(a[st.id]>=1.2?" ★":""))),
      E("div",{class:"steps"},...G.STEPS.map((s,i)=>{const on=i<n,next=i===n,can=next&&w.sp>=s.cost;
        return E("button",{type:"button",class:"step "+(on?"on":next?"next":"lock"),disabled:!can,onclick:()=>{const r=G.unlock(S,h,st.id);if(r.ok){G.save(S,slot);say(HN(h)+" learns "+(i===3?st.sig:s.name)+".");ctx.repaint()}else say(r.msg)}},E("b",null,(i===3?st.sig:s.name)+" "+(on?"✓":"· "+s.cost)),E("div",{class:"mut",style:{fontSize:"11.5px"}},s.text))}))))})}

const stageBadge=h=>{const r=S.rel[h];return r?G.STAGELABEL[G.stageOf(r)]:"Not yet written to"};
function letters(pane,ctx){const corr=Object.keys(S.rel).sort((a,b)=>G.stageOf(S.rel[b])-G.stageOf(S.rel[a])||S.rel[b].bond-S.rel[a].bond);if(!letterSel)letterSel=corr[0]||S.order[0];
  const left=E("div"),right=E("div"),q=E("input",{type:"search",placeholder:"Find anyone",style:{width:"100%"},value:filterQ,oninput:ev=>{filterQ=ev.target.value;fillL()}}),lst=E("div",{style:{maxHeight:"380px",overflow:"auto",marginTop:"6px"}});
  function fillL(){lst.textContent="";const qq=filterQ.toLowerCase();const arr=qq?ACAD.HOUSES.filter(h=>(HN(h)+" "+((grp(h)||{}).name||"")).toLowerCase().includes(qq)).slice(0,50):corr;if(!qq)lst.append(E("div",{class:"mut"},"Your correspondents"));
    arr.forEach(h=>lst.append(E("div",{class:"lname"+(h===letterSel?" on":""),onclick:()=>{letterSel=h;letterLast=null;ctx.repaint()}},spr(h,28),E("div",null,E("div",null,HN(h)),E("small",null,stageBadge(h))))))}
  left.append(q,lst);fillL();
  const h=letterSel,r=S.rel[h]||{bond:0,spark:0,met:false,said:[]},st=G.stageOf(r),t=G.ties(h),g=grp(h),b=(typeof BIOS==="object"&&BIOS[h])||{};
  const act=(kind,item)=>{const o=G.contact(S,h,kind,item);if(!o.ok){say(o.msg);return}letterLast=o;G.save(S,slot);ctx.refreshTop();if(o.scene)sceneReveal(h,o.scene,()=>ctx.repaint());else ctx.repaint()};
  const known=[r.bond>=18&&b.favDrink?["Favorite drink",b.favDrink]:null,r.bond>=28&&b.favSubject?["Favorite subject",b.favSubject]:null,r.bond>=38&&b.favSeason?["Favorite season",b.favSeason]:null].filter(Boolean);
  right.append(E("div",{class:"row"},spr(h,72),E("div",null,E("h3",{style:{margin:0}},HN(h)),E("div",{class:"mut"},(g?g.name:"")+" · "+(b.fullName||"")),E("div",null,E("b",null,G.STAGELABEL[st])))),
    E("div",{class:"stat",style:{marginTop:"8px"}},E("b",null,"Bond"),E("div",{class:"bar"},E("i",{style:{width:pct(r.bond)+"%"}})),E("span",null,fmt(r.bond))),E("div",{class:"stat"},E("b",null,"Spark"),E("div",{class:"bar sp"},E("i",{style:{width:pct(r.spark)+"%"}})),E("span",null,fmt(r.spark))),
    E("div",{class:"chips",style:{margin:"6px 0"}},...(t.couple?[E("span",{class:"chip"},"Seeing "+HN(t.couple))]:[]),...t.rivals.slice(0,2).map(([o])=>E("span",{class:"chip"},"Rival: "+HN(o))),...t.family.map(o=>E("span",{class:"chip"},"Family: "+HN(o))),...known.map(([k,v])=>E("span",{class:"chip hot"},k+": "+v))),
    E("div",{class:"row"},E("button",{type:"button",class:"pri",disabled:S.cp<1,onclick:()=>act("letter")},"Write (1)"),E("button",{type:"button",disabled:S.cp<1,onclick:()=>act("call")},"Call (1)"),E("button",{type:"button",disabled:S.cp<2||S.money<40,onclick:()=>act("visit")},"Visit (2, 40)")),
    E("h3",null,"Send a gift (1)"),E("div",{class:"chips"},...G.ITEMS.map(it=>E("button",{type:"button",class:"sm",disabled:S.cp<1||S.money<it.price,onclick:()=>act("gift",it.id)},it.name+" · "+it.price))));
  if(letterLast&&letterLast.reply)right.append(E("div",{class:"card",style:{marginTop:"10px"}},E("div",{class:"bubble"},letterLast.reply),E("div",{class:"chips"},E("span",{class:"chip "+(letterLast.db>=0?"up":"down")},"Bond "+(letterLast.db>=0?"+":"")+letterLast.db),E("span",{class:"chip "+(letterLast.ds>=0?"up":"down")},"Spark "+(letterLast.ds>=0?"+":"")+letterLast.ds),...(letterLast.up?[E("span",{class:"chip hot"},"Now: "+G.STAGELABEL[letterLast.stage])]:[])),...(letterLast.note?[E("div",{class:"bubble"},letterLast.note)]:[])));
  pane.append(E("div",{class:"letters"},left,right))}
function sceneReveal(h,id,done){const ov=E("div",{class:"overlay"}),sheet=E("div",{class:"sheet"});ov.append(sheet);root.append(ov);const romance=/^romance/.test(id);
  const img=E("img",{src:G.sceneURL(h,id),alt:"",onerror:ev=>{ev.target.replaceWith(E("div",{class:"card mut",style:{textAlign:"center"}},spr(h,96),E("p",null,"The picture for this moment isn't ready yet. It is saved in the scrapbook and will appear when it is.")))}});
  sheet.append(E("h2",null,romance?"A moment with "+HN(h):"Memory kept"),E("div",{class:"scenebig"},img,E("div",null,E("p",null,romance?HN(h)+" will remember this.":""),E("p",{class:"mut"},"Saved to "+HN(h)+"'s scrapbook in the Hall."),E("button",{type:"button",class:"pri",onclick:()=>{ov.remove();done&&done()}},"Continue"))))}

function hall(pane,ctx){if(!sel||!S.wards[sel])sel=S.order[0];const girls=[...new Set([...S.order,...Object.keys(S.gallery||{})])];let who=hall.who&&girls.includes(hall.who)?hall.who:sel;
  pane.append(E("div",{class:"row"},E("h3",{style:{margin:0}},"The Hall"),...girls.map(x=>E("button",{type:"button",class:"sm"+(x===who?" pri":""),onclick:()=>{hall.who=x;if(S.wards[x])sel=x;ctx.repaint()}},HN(x)))));
  const mw=S.accolades.filter(a=>a.h===who),gal=(S.gallery||{})[who]||{};
  pane.append(E("div",{class:"card row",style:{margin:"8px 0"}},spr(who,64),E("div",null,E("b",{style:{fontSize:"17px"}},HN(who)),E("div",{class:"mut"},mw.filter(a=>a.tier==="gold").length+" gold · "+mw.filter(a=>a.tier==="silver").length+" silver · "+mw.filter(a=>a.tier==="bronze").length+" bronze · "+mw.reduce((t,a)=>t+a.prize,0)+" coins won"))));
  const defs=[];G.CONTESTS.filter(c=>c.kind!=="festival").forEach(c=>{defs.push([c.id+"-win",c.name.replace(/^The /,"")+": won"],[c.id+"-lose",c.name.replace(/^The /,"")+": lost"])});for(let i=1;i<=6;i++)defs.push(["romance-"+i,["First letter","Golden hour","Rainy tea","Under the moon","Close","Morning"][i-1]]);
  pane.append(E("h3",null,"Scrapbook"),E("div",{class:"scrap"},...defs.map(([id,label])=>{const u=gal[id];return u?E("div",{class:"scene",onclick:()=>sceneReveal(who,id,null)},E("img",{src:G.sceneURL(who,id),alt:"",loading:"lazy",onerror:ev=>{ev.target.replaceWith(spr(who,48))}}),E("b",null,label)):E("div",{class:"scene locked"},label)})));
  pane.append(E("h3",null,"Trophy shelves"));
  G.CONTESTS.filter(c=>c.kind!=="festival").forEach(c=>{const shelf=E("div",{class:"shelf"});for(let y=1;y<=G.YEARS;y++){const a=mw.find(x=>x.c===c.id&&x.year===y);
    shelf.append(a?E("div",{class:"trophy"},rosette(a.tier,col(who).band,a.rank),E("div",null,E("b",null,G.TIERS[a.tier].name)),E("div",{class:"mut"},"Year "+y+" · "+a.rank+" of "+a.n),...a.titles.map(t=>E("div",{class:"chip hot",style:{marginTop:"2px"}},t))):E("div",{class:"trophy empty"},E("div",{style:{height:56,paddingTop:20}},"—"),E("div",{class:"mut"},"Year "+y)))}
    pane.append(E("div",{style:{margin:"8px 0 3px"}},E("b",null,c.name)),shelf)})}

function calendar(pane){pane.append(E("h3",{style:{marginTop:0}},"The year at Everspire"));
  G.TERMS.forEach(([name,start])=>{pane.append(E("div",{style:{margin:"8px 0 3px"}},E("b",null,name+" term")));const cal=E("div",{class:"cal"});
    for(let w=start;w<start+12;w++){const ev=G.CBYWEEK[w]||[];cal.append(E("div",{class:"wk"+(w===S.week?" now":"")+(ev.length?" ev":"")+(w<S.week?" past":"")},E("b",null,w),...ev.map(c=>E("div",null,c.name.replace(/^The /,"")))))}pane.append(cal)});
  pane.append(E("p",{class:"mut",style:{marginTop:"8px"}},"Contests are decided on the Saturday afternoon of their week, at their venue, with their rivals in the field. Scrub the map to Saturday and watch them gather."))}

/* ---------- playing a week ---------- */
const tierText=a=>G.TIERS[a.tier].name+" ("+a.rank+" of "+a.n+")";
function resultSheet(res,done){const ov=E("div",{class:"overlay"}),sheet=E("div",{class:"sheet"});ov.append(sheet);root.append(ov);
  sheet.append(E("h2",null,res.c.name),E("div",{class:"mut"},res.c.text));
  res.rows.slice(0,Math.max(5,...res.rows.filter(r=>r.ward).map(r=>r.rank))).forEach(r=>sheet.append(E("div",{class:"pod"+(r.ward?" me":"")},E("b",null,"#"+r.rank),spr(r.h,34),E("span",null,HN(r.h)+(r.rival?" (rival)":"")),E("span",{class:"mut"},Math.round(r.score)))));
  res.recap.forEach(t=>sheet.append(E("div",{class:"bubble"},t)));
  res.wards.forEach(a=>{sheet.append(E("div",{class:"card",style:{margin:"8px 0"}},E("div",{class:"scenebig"},
    E("img",{src:G.sceneURL(a.h,a.scene),alt:"",onerror:ev=>{ev.target.replaceWith(E("div",{class:"row"},spr(a.h,88)))}}),
    E("div",null,E("div",{class:"row"},rosette(a.tier,col(a.h).band,a.rank),E("div",null,E("b",{style:{fontSize:"17px"}},HN(a.h)+": "+tierText(a)),E("div",{class:"mut"},"+"+a.prize+" coins · +"+a.sp+" skill point"+(a.sp===1?"":"s")))),
      ...(a.titles.length?[E("div",{class:"chips",style:{marginTop:"6px"}},...a.titles.map(t=>E("span",{class:"chip hot"},t)))]:[]),...(a.newScene?[E("div",{class:"chip hot",style:{marginTop:"6px",display:"inline-block"}},"New in the scrapbook")]:[])))))});
  sheet.append(E("div",{class:"row",style:{justifyContent:"flex-end",marginTop:"10px"}},E("button",{type:"button",class:"pri",onclick:()=>{ov.remove();done&&done()}},"Continue")));return ov}
function weekDigest(rep,done){const ov=E("div",{class:"overlay"}),sheet=E("div",{class:"sheet"});ov.append(sheet);root.append(ov);
  sheet.append(E("h2",null,"Week "+rep.week+" of year "+rep.year));
  Object.entries(rep.wards).forEach(([h,r])=>{const w=S.wards[h];const gains=SID.map(s=>[s,Math.round((w.stats[s]-r.before[s])*10)/10]).filter(x=>x[1]>0.04);
    sheet.append(E("div",{class:"card",style:{margin:"6px 0"}},E("div",{class:"row"},spr(h,40),E("b",null,HN(h)),E("span",{class:"mut"},"fatigue "+fmt(r.fat0)+" to "+fmt(w.fatigue)+" · mood "+fmt(r.mood0)+" to "+fmt(w.mood))),E("div",{class:"chips",style:{marginTop:"4px"}},...(gains.length?gains.map(([s,v])=>E("span",{class:"chip hot up"},SNAME[s]+" +"+v)):[E("span",{class:"chip"},"A quiet week")]))))});
  rep.notes.forEach(n=>sheet.append(E("div",{class:"bubble"},n)));
  if(rep.yearEnd){sheet.append(E("h3",null,"End of year "+rep.yearEnd.year));Object.entries(rep.yearEnd.wards).forEach(([h,y])=>sheet.append(E("div",{class:"bubble"},HN(h)+": "+y.golds+" gold, "+y.medals+" medals in "+y.entries+" contests. She rests over the summer and returns refreshed.")))}
  sheet.append(E("div",{class:"row",style:{justifyContent:"flex-end",marginTop:"10px"}},E("button",{type:"button",class:"pri",onclick:()=>{ov.remove();done&&done()}},"Continue")));return ov}
function graduation(rep){const Lg=rep.legacy,ov=E("div",{class:"overlay"}),sheet=E("div",{class:"sheet"});ov.append(sheet);root.append(ov);
  sheet.append(E("h2",null,"Graduation"),E("p",{class:"mut"},"Six years end in the courtyard, in House regalia. The banners come down, and the stories stay."));
  Object.entries(Lg.wards).forEach(([h,l])=>sheet.append(E("div",{class:"card row",style:{margin:"8px 0"}},spr(h,64),E("div",null,E("b",{style:{fontSize:"18px"}},HN(h)+": "+l.title),E("div",{class:"mut"},l.golds+" golds · "+l.medals+" medals · legacy "+l.pts+" · total stats "+l.sum)))));
  sheet.append(E("div",{class:"bubble"},"Legacy of the patronage: "+Lg.total+" points. Their trophies and scrapbooks stay in this save."),E("div",{class:"row",style:{justifyContent:"flex-end",marginTop:"10px"}},E("button",{type:"button",onclick:()=>{ov.remove();tab="hall";hub()}},"Visit the Hall"),E("button",{type:"button",class:"pri",onclick:()=>{ov.remove();title()}},"Back to the menu")))}
function afterWeek(rep,ctx){const finish=()=>{busy=false;ctx.refresh()};if(rep.graduated){weekDigest(rep,()=>graduation(rep));return}weekDigest(rep,finish)}
/* Run the week: a short tour of the map as it was planned, the contest when it comes, then the digest */
async function runWeek(ctx){if(busy)return;busy=true;skip=false;G.prepareWeek(S);G.syncMap(S);const HSn=ctx.HSf(),c=ctx.ctlf();
  const rep=G.advance(S);G.save(S,slot);ctx.paintActs();const cres=rep.contests;let shown=false;
  if(P.montage&&S.settings.montage!==false&&S.order.length){
    const bar=E("div",{class:"pop",style:{display:"flex",gap:"10px",alignItems:"center"}},E("b",{id:"evMont"},"The week begins"),E("span",{class:"sp"}),E("button",{type:"button",class:"sm",onclick:()=>{skip=true}},"Skip"));ctx.left.append(bar);
    const n=S.order.length;let step=0;
    const goto=async(day,t,h,why)=>{HSn.day=day;HSn.t=t;HSn.sel=h;HSn.follow=false;c.focus(h,true);c.frame(true);const e=bar.querySelector("#evMont");if(e)e.textContent=`${HN(h)} · ${DAYF[day]} ${ACAD.livemap.fmt(t)}${why?" · "+why:""}`;await wait(skip?0:1250)};
    for(let day=0;day<7&&!skip;day++){
      await goto(day,630,S.order[step++%n],day>=5?"morning":"morning block");if(skip)break;
      if(day===5&&cres.length){await goto(day,870,S.order[step++%n],"the contest begins");if(skip)break;for(const r of cres){await new Promise(res=>resultSheet(r,res))}shown=true}
      else await goto(day,day>=5?930:900,S.order[step++%n],"afternoon block")}
    bar.remove()}
  if(cres.length&&!shown){for(const r of cres){await new Promise(res=>resultSheet(r,res))}}
  const hh=ctx.HSf();if(hh){hh.sel=sel;hh.follow=true}
  afterWeek(rep,ctx)}
async function skipAhead(ctx){if(busy)return;busy=true;const d=G.runToEvent(S,40);G.save(S,slot);
  if(!d.weeks){busy=false;ctx.refresh();return}
  const ov=E("div",{class:"overlay"}),sheet=E("div",{class:"sheet"});ov.append(sheet);root.append(ov);
  sheet.append(E("h2",null,d.weeks+" week"+(d.weeks>1?"s":"")+" go by"),E("div",{class:"mut"},"Her plans held, tired girls rested, and contests that suited them were entered."));
  Object.entries(d.gains).forEach(([h,g])=>sheet.append(E("div",{class:"card row",style:{margin:"6px 0"}},spr(h,40),E("b",null,HN(h)),E("div",{class:"chips"},...Object.entries(g).map(([s,v])=>E("span",{class:"chip hot up"},SNAME[s]+" +"+Math.round(v*10)/10))))));
  const res=d.reports.flatMap(r=>r.contests),last=d.reports[d.reports.length-1];
  const done=()=>{ov.remove();busy=false;if(last&&last.graduated){graduation(last);return}ctx.refresh()};
  sheet.append(E("div",{class:"row",style:{justifyContent:"flex-end",marginTop:"10px"}},E("button",{type:"button",class:"pri",onclick:()=>{if(!res.length){done();return}ov.remove();(async()=>{for(const r of res){await new Promise(rs=>resultSheet(r,rs))}done()})()}},res.length?"See the results":"Continue")))}

/* ---------- entry points ---------- */
G.open=opts=>{ensure();show();opts=opts||{};
  if(opts.sponsor){const last=G.lastSlot(),run=S||(last>=0?G.load(last):null),sp=opts.sponsor;
    if(run&&run.order.length<3&&!run.wards[sp]){S=run;if(last>=0)slot=last;S.wards[sp]=G.newRun("x",[sp]).wards[sp];S.order.push(sp);S.rel[sp]=S.rel[sp]||{bond:22,spark:0,met:true,last:S.week,said:[]};S.log.push({y:S.year,w:S.week,t:`${S.name} takes on ${HN(sp)} as a protégée.`});G.save(S,slot);sel=sp;hub();return}
    if(run&&run.wards[sp]){if(last>=0)slot=last;S=run;sel=sp;enter(run);sel=sp;hub();return}
    if(run){S=run;if(last>=0)slot=last;enter(run);say("Three protégées is the limit.");return}
    slot=firstFree();newGame([sp]);return}
  title()};
G.ui={title,hub,state:()=>S,setState:s=>{S=G.fix(s)},show,hide,codex,prefs:()=>P};
const bh=ENC.buildHouse;if(bh)ENC.buildHouse=(el,h)=>{bh(el,h);const bar=el.querySelector(".enc-chairbar");if(bar)bar.append(E("button",{type:"button",class:"enc-load",onclick:()=>{ENC.close();G.open({sponsor:h})}},"Take her on as a protégée"))};
/* Everspire opens first: the title screen covers the studio until the player chooses the Character Creator */
function boot(){ensure();title()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
