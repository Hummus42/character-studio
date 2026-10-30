/* Everspire: the Headmaster, screens. Sits on the game shell (#evRoot), the living map and head-core.js. The planner game is untouched. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.gameUI||!ENC.E)return;
const H=ACAD.head,U=ACAD.gameUI,E=ENC.E,HN=ENC.HN,G=ACAD.game,SID=G.SID,SNAME=G.SNAME,L=()=>ACAD.livemap,root=()=>U.root();
const fmt=n=>Math.round(n),spr=U.spr;
const SPEEDS=[["⏸",0],["1×",4],["3×",12],["10×",40],["30×",120]],AREAN={castle_ground:"The castle, ground floor",castle_upper:"The castle, upper floor",grounds:"The grounds",town:"Everhythe",undercroft:"The undercroft",beyond:"Beyond the walls"};
const KINDS=[["all","Everything"],["train","Training"],["mood","Comfort"],["dorm","Beds"],["income","Trade"],["insight","Study"],["renown","Prestige"],["office","Office"]];
const DAYF=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],SEASON=["Spring","Summer","Autumn","Winter"];

const css=`
#evRoot .hroom{display:grid;grid-template-columns:1fr auto;gap:2px 10px;align-items:center;padding:8px 10px;border:1px solid var(--g-line);border-radius:10px;background:var(--g-card);margin:6px 0}
#evRoot .hroom.locked{opacity:.55}#evRoot .hroom.view{border-color:var(--g-gold);box-shadow:0 0 0 2px #d8b25a44}
#evRoot .hroom .nm{font-weight:700}#evRoot .hroom small{color:var(--g-mut)}
#evRoot .pips{display:inline-flex;gap:3px;margin-left:8px;vertical-align:middle}#evRoot .pips i{width:9px;height:9px;border-radius:50%;background:#0d0a20;border:1px solid var(--g-line)}#evRoot .pips i.on{background:var(--g-gold);border-color:var(--g-gold)}
#evRoot .hfilter{display:flex;flex-wrap:wrap;gap:4px;margin:8px 0}#evRoot .hfilter button.on{background:var(--g-gold);color:#241b06;border-color:transparent}
#evRoot .happ{display:grid;grid-template-columns:76px 1fr;gap:10px;align-items:start}#evRoot .happ img{width:76px;height:76px}
#evRoot .hst{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin:4px 0}#evRoot .hst div{background:#0d0a20;border:1px solid var(--g-line);border-radius:6px;text-align:center;font-size:11.5px;padding:2px 0}#evRoot .hst b{display:block;font-size:14px;color:#f1ead8}
#evRoot .hrow{display:grid;grid-template-columns:46px 1fr;gap:10px;align-items:start;padding:8px 0;border-top:1px solid var(--g-line)}#evRoot .hrow img{width:44px;height:44px}
#evRoot .hlog{padding:5px 0;border-top:1px solid var(--g-line);font-size:14px}#evRoot .hlog small{color:var(--g-mut);margin-right:8px}
#evRoot .hsay{border-color:var(--g-gold)!important}
`;
let S=null,slot=0,HS=null,ctl=null,tab="academy",kindF="all",timer=null,SP=[],EM=new Set(),speedIx=2,hidAt=0,visFn=null,sigs={},panelEl=null,popEl=null,sayT=0,capEl=null,topEls={},lastCap="";

const dateInfo=s=>{const d=s.day,year=1+Math.floor(d/360),dd=d%360;return {year,season:SEASON[Math.floor(dd/90)],dayIn:dd%90+1,label:"Year "+year+" · "+SEASON[Math.floor(dd/90)]+" · day "+(dd%90+1)}};
const rn=id=>L().roomName?L().roomName(id):id;
function injectCss(){if(!document.getElementById("hdCss"))document.head.append(E("style",{id:"hdCss"},css))}
function firstFree(){const s=H.slots();const i=s.findIndex(x=>!x);return i<0?0:i}

/* ---------- title entries ---------- */
function titleButtons(mk){const last=H.lastSlot(),ls=last>=0?H.load(last):null;
  return [ls?mk("Continue Headmaster",ls.name+" · "+dateInfo(ls).label,()=>{slot=last;enter(ls)},true):null,
    mk("New Headmaster","Build Everspire into the finest academy in the world",()=>{slot=firstFree();newScreen()},!ls),
    mk("Headmaster saves","Slots, import and export",savesScreen)].filter(Boolean)}

function pageWith(title,body){U.ensure();U.show();const r=root();r.textContent="";const page=E("div",{class:"page narrow"}),w=E("div");
  w.append(E("div",{class:"row"},E("button",{type:"button",onclick:()=>U.title()},"Back"),E("h2",{style:{margin:0}},title)),body);page.append(w);r.append(page)}
function newScreen(){const name=E("input",{type:"text",placeholder:"Your name, Headmaster",maxlength:24,style:{width:"260px"}});
  pageWith("A new headmaster",E("div",null,E("p",null,"Everspire is quiet. The lanterns are lit, but the halls are half empty and the treasury is thin. You will restore its rooms, admit its girls, and grow its name."),
    E("p",{class:"mut"},"There is no clock to beat and nothing to fail. The academy runs on its own while you decide what to build and whom to welcome. Pause whenever you like."),
    E("div",{class:"row",style:{margin:"14px 0"}},name,E("button",{type:"button",class:"pri",onclick:()=>{const s=H.newRun((name.value||"").trim()||"The Headmaster");H.save(s,slot);enter(s,true)}},"Open the doors"))))}
function savesScreen(){const slots=H.slots(),grid=E("div",{class:"grid g3",style:{marginTop:"12px"}});
  slots.forEach((s,i)=>{const c=E("div",{class:"card"});
    if(s){const di=dateInfo(s);c.append(E("b",null,"Slot "+(i+1)+": Headmaster "+s.name),E("div",{class:"mut"},di.label+" · "+(s.order||[]).length+" girls · "+H.TIERS[H.tierOf(s.renown)].name),E("div",{class:"row",style:{margin:"6px 0"}},...(s.order||[]).slice(0,8).map(h=>spr(h,40))),
      E("div",{class:"row",style:{marginTop:"8px"}},E("button",{type:"button",class:"pri",onclick:()=>{slot=i;enter(H.load(i))}},"Load"),
        E("button",{type:"button",class:"sm",onclick:()=>{const b=new Blob([H.exportRun(s)],{type:"application/json"});const a=E("a",{href:URL.createObjectURL(b),download:"everspire-headmaster-"+s.name.replace(/\W+/g,"_")+".json"});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},3000)}},"Export"),
        E("button",{type:"button",class:"sm",onclick:()=>{if(confirm("Delete this save for good?")){H.erase(i);savesScreen()}}},"Delete")))}
    else c.append(E("b",null,"Slot "+(i+1)),E("p",{class:"mut"},"Empty."),E("label",{class:"mut"},"Import a save file: ",E("input",{type:"file",accept:".json,application/json",onchange:ev=>{const f=ev.target.files[0];if(!f)return;f.text().then(t=>{const r=H.importRun(t);if(r){H.save(r,i);savesScreen()}else alert("That file isn't a Headmaster save.")})}})));
    grid.append(c)});
  pageWith("Headmaster saves",grid)}

/* ---------- entering and leaving ---------- */
function stop(){clearInterval(timer);timer=null;if(visFn){document.removeEventListener("visibilitychange",visFn);visFn=null}if(ctl&&ctl.dispose)ctl.dispose();ctl=null}
function leave(){if(S)H.save(S,slot);stop();S=null;U.title()}
function enter(s,fresh){stop();S=H.fix(s);const rep=fresh?null:H.offline(S);H.syncMap(S);hub();if(rep)awaySheet(rep,"While you were away");
  timer=setInterval(()=>{if(S)H.save(S,slot)},15000);
  visFn=()=>{if(document.hidden){hidAt=Date.now();if(S)H.save(S,slot)}else if(hidAt&&S){const back=Date.now();S.saved=hidAt;const rep=H.offline(S,back);hidAt=0;if(rep){H.syncMap(S);ctl&&ctl.frame(true);refreshTop();repaintAll();awaySheet(rep,"While the page was hidden")}}};
  document.addEventListener("visibilitychange",visFn)}

/* ---------- the screen ---------- */
function say(m){const e=topEls.say;if(!e)return;e.textContent=m;e.style.display="";clearTimeout(sayT);sayT=setTimeout(()=>{e.style.display="none"},4000)}
function refreshTop(){const di=dateInfo(S),t=H.tier(S),next=H.TIERS[t+1];const set=(k,v)=>{if(topEls[k])topEls[k].textContent=v};
  set("date",di.label);set("coins","Coins "+fmt(S.funds));set("ren",H.TIERS[t].name+" · "+fmt(S.renown));set("ins","Insight "+fmt(S.insight));set("beds","Beds "+S.order.length+"/"+H.beds(S))}
function topBar(){topEls={};const pill=(k,tt)=>{const e=E("span",{class:"pill",title:tt});topEls[k]=e;return e};
  const say2=E("span",{class:"pill hsay",style:{display:"none"}});topEls.say=say2;
  return E("div",{class:"top"},E("div",{class:"brand"},"Headmaster "+S.name),pill("date","The academy calendar"),pill("coins","Coins"),pill("ren","Renown tier and points"),pill("ins","Insight"),pill("beds","Girls and free beds"),say2,E("span",{class:"sp"}),
    E("button",{type:"button",onclick:()=>U.codex("home")},"Codex"),E("button",{type:"button",onclick:()=>{H.save(S,slot);say("Saved.")}},"Save"),E("button",{type:"button",onclick:leave},"Menu"))}

function hub(){U.ensure();U.show();U.dispose();injectCss();const r=root();r.textContent="";SP.length=0;S.order.forEach(h=>SP.push(h));EM=new Set(S.order);sigs={};
  HS={area:"castle_ground",room:null,t:480,day:S.day%7,sel:null,follow:false,play:SPEEDS[speedIx][1]>0,speed:SPEEDS[speedIx][1]||4};
  const left=E("div",{class:"left"}),right=E("div",{class:"right"}),stageHost=E("div"),speedRow=E("div",{class:"time"}),cap=E("div",{class:"cap"}),pop=E("div"),tabs=E("div",{class:"tabs"}),panel=E("div",{class:"panel"});
  capEl=cap;popEl=pop;panelEl=panel;lastCap="";
  left.append(stageHost,speedRow,cap,pop);right.append(tabs,panel);
  const topEl=topBar(),hubEl=E("div",{class:"hub"},left,right);r.append(topEl,hubEl);
  {const fit=()=>{hubEl.style.top=topEl.offsetHeight+"px"};fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(topEl);else addEventListener("resize",fit)}
  const paintSpeed=()=>{speedRow.textContent="";speedRow.append(E("span",{class:"mut"},"Time"));SPEEDS.forEach(([lab,v],i)=>speedRow.append(E("button",{type:"button",class:"sm"+(i===speedIx?" on":""),title:i?"Speed "+lab:"Pause",onclick:()=>{speedIx=i;HS.play=v>0;if(v>0)HS.speed=v;paintSpeed()}},lab)))};
  ctl=L().mountStage(stageHost,{state:HS,girls:SP,emph:EM,dim:false,tabs:true,onSelect:h=>studentPop(h),onDay:()=>onDay(),onView:()=>{paintMap();if(tab==="academy")repaint("academy")},onFrame:c=>{paintCap(c)}});
  const TABS=[["academy","Academy"],["admissions","Admissions"],["students","Students"],["journal","Journal"]];
  window.__hdTabs=()=>{tabs.textContent="";TABS.forEach(([k,l])=>tabs.append(E("button",{type:"button",class:k===tab?"on":"",onclick:()=>{tab=k;window.__hdTabs();repaint(k)}},l+(k==="admissions"&&S.short.length?" ("+S.short.length+")":""))))};
  paintSpeed();window.__hdTabs();refreshTop();paintMap();repaint(tab)}

function paintCap(c){if(!capEl||!S)return;const di=dateInfo(S),h=HS.sel,t=L().fmt(HS.t),txt=di.season+" · day "+di.dayIn+" · "+DAYF[HS.day]+" "+t+(S.order.length?" · "+S.order.length+" girl"+(S.order.length===1?"":"s")+" at the academy":" · no girls yet");
  if(txt!==lastCap){lastCap=txt;capEl.textContent=txt}}

const sigOf={academy:()=>Object.keys(H.ROOMS).filter(id=>H.canBuild(S,id).ok).join(",")+"|"+H.tier(S)+"|"+(HS.room||"")+"|"+kindF,admissions:()=>S.short.join(",")+"|"+S.free+"|"+H.beds(S)+"|"+S.order.length+"|"+(S.funds>=140?1:0)+(S.funds>=95?1:0),students:()=>Math.floor(S.day/4)+"|"+S.order.length,journal:()=>S.log.length+"|"+S.day};
function repaint(k){if(!panelEl||k!==tab)return;const y=panelEl.scrollTop;panelEl.textContent="";({academy,admissions,students,journal})[k](panelEl);panelEl.scrollTop=y;sigs[k]=sigOf[k]();if(window.__hdTabs)window.__hdTabs()}
function repaintAll(){repaint(tab)}
function onDay(){H.step(S,1);refreshTop();const s2=sigOf[tab]?sigOf[tab]():"";if(s2!==sigs[tab])repaint(tab)}
/* rooms nobody has restored yet look run-down on the map */
let nameId=null;
function paintMap(){if(!S||!HS)return;const cv=root().querySelector(".lm-cv");if(!cv)return;if(!nameId){nameId={};Object.entries(L().rooms).forEach(([id,r])=>nameId[r.name]=id)}
  const built=id=>H.lvlOf(S,id)>0||(H.ROOMS[id]&&H.ROOMS[id].k==="sealed"?false:false);
  if(HS.room){cv.style.filter=H.lvlOf(S,HS.room)>0?"":"grayscale(.85) brightness(.55)";return}
  cv.style.filter="";cv.querySelectorAll(".lm-tile:not(.portal)").forEach(t=>{const id=nameId[t.getAttribute("title")];if(!id||!H.ROOMS[id])return;const on=built(id);t.style.filter=on?"":"grayscale(.9) brightness(.5)"})}
function afterChange(){H.syncMap(S);if(ctl)ctl.frame(true);paintMap();refreshTop();repaintAll()}

/* ---------- Academy: restore and improve rooms ---------- */
function pips(lv){return E("span",{class:"pips"},...Array.from({length:H.MAXLV},(_,i)=>E("i",{class:i<lv?"on":""})))}
function roomRow(id,view){const R=H.ROOMS[id],lv=H.lvlOf(S,id),c=H.canBuild(S,id),next=lv?H.roomEffect(id,Math.min(lv+1,H.MAXLV)):H.roomEffect(id,1);
  const stat=R.stat?" · "+SNAME[R.stat]:"";
  const btn=R.k==="sealed"?E("button",{type:"button",disabled:true,title:R.why},"Sealed"):lv>=H.MAXLV?E("button",{type:"button",disabled:true},"Complete"):
    E("button",{type:"button",class:c.ok?"pri sm":"sm",disabled:!c.ok,title:c.ok?"":c.msg,onclick:()=>{const o=H.build(S,id);if(o.ok){say((o.lvl===1?"Restored ":"Improved ")+rn(id)+".");afterChange()}else say(o.msg)}},(lv?"Improve ":"Restore ")+(c.cost||H.roomCost(id,lv)));
  return E("div",{class:"hroom"+(R.k==="sealed"||(!lv&&R.tier>H.tier(S))?" locked":"")+(view?" view":"")},
    E("div",null,E("span",{class:"nm"},rn(id)),pips(lv),E("div",{class:"mut"},H.KINDNAME[R.k]+stat+(lv?" · "+H.roomEffect(id,lv):"")+(lv&&lv<H.MAXLV?"  → next: "+next:!lv&&R.k!=="sealed"?" · once restored: "+next:""))),
    R.k==="sealed"?E("div",{class:"mut",style:{maxWidth:"220px",fontSize:"12px"}},R.why):(!lv&&R.tier>H.tier(S))?E("div",{class:"mut",style:{fontSize:"12px"}},"Needs "+H.TIERS[R.tier].name):btn)}
function academy(p){const t=H.tier(S),inc=H.income(S),next=H.TIERS[t+1];
  p.append(E("div",{class:"card"},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",{style:{fontSize:"17px"}},"Renown: "+H.TIERS[t].name),E("span",{class:"mut"},"about +"+r1(inc)+" coins a day")),
    next?E("div",null,E("div",{class:"bar",style:{margin:"6px 0 3px"}},E("i",{style:{width:Math.min(100,(S.renown-H.TIERS[t].at)/(next.at-H.TIERS[t].at)*100)+"%"}})),E("div",{class:"mut"},fmt(S.renown)+" of "+next.at+" to "+next.name+": new rooms and applicants")):E("div",{class:"mut"},"The academy's name is known everywhere.")));
  if(HS.room&&H.ROOMS[HS.room]){p.append(E("h3",null,"Where you are looking"),roomRow(HS.room,true))}
  p.append(E("div",{class:"hfilter"},...KINDS.map(([k,l])=>E("button",{type:"button",class:"sm"+(k===kindF?" on":""),onclick:()=>{kindF=k;repaint("academy")}},l))));
  H.AREA_ORDER.forEach(a=>{const ids=Object.keys(H.ROOMS).filter(id=>{const q=L().rooms[id];if(!q||q.area!==a)return false;if(kindF!=="all"&&H.ROOMS[id].k!==kindF)return false;return H.visible(S,id)||H.ROOMS[id].k==="sealed"});
    if(!ids.length)return;ids.sort((x,y)=>(H.lvlOf(S,y)>0)-(H.lvlOf(S,x)>0)||H.ROOMS[x].tier-H.ROOMS[y].tier||H.ROOMS[x].cost-H.ROOMS[y].cost);
    p.append(E("h3",null,AREAN[a]),...ids.map(id=>roomRow(id,false)))});
  p.append(E("p",{class:"mut",style:{marginTop:"10px"}},"Tap a room on the map to look inside. Girls train in the best restored room for each of their two best stats."))}
const r1=v=>Math.round(v*10)/10;

/* ---------- Admissions ---------- */
function admissions(p){const free=S.free>0,beds=H.beds(S);
  p.append(E("div",{class:"card"},E("b",{style:{fontSize:"17px"}},"Admissions office"),E("div",{class:"mut"},"Girls: "+S.order.length+" of "+beds+" beds"+(free?" · the founders' fund covers "+S.free+" scholarship"+(S.free===1?"":"s"):"")+" · applicants never expire")));
  if(!S.short.length)p.append(E("p",{class:"mut",style:{marginTop:"10px"}},"No applicants at the door just now. A new one arrives every couple of days."));
  S.short.forEach(h=>{const a=G.aptitude(h),top=SID.slice().sort((x,y)=>a[y]-a[x]).slice(0,3),b=(typeof BIOS==="object"&&BIOS[h])||{},c=H.canEnroll(S,h),g=ACAD.GROUP_OF(h),rar=H.rarityOf(h);
    p.append(E("div",{class:"card",style:{marginTop:"10px"}},E("div",{class:"happ"},spr(h,76),E("div",null,
      E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",{style:{fontSize:"17px"}},HN(h)),E("span",{class:"chip"+(rar>=3?" hot":"")},["Hopeful","Promising","Talented","Exceptional"][rar])),
      E("div",{class:"mut"},((g||{}).name||"")+(b.age?" · "+b.age:"")+(b.occupation?" · "+String(b.occupation).split(/[;,]/)[0]:"")),
      E("div",{class:"chips",style:{margin:"4px 0"}},...top.map(s=>E("span",{class:"chip hot"},SNAME[s]+" "+r1(a[s])+"×"))),
      b.summary?E("div",{class:"mut",style:{fontSize:"13px"}},String(b.summary).split(/(?<=\.)\s/)[0]):null,
      E("div",{class:"row",style:{marginTop:"8px"}},E("button",{type:"button",class:c.ok?"pri":"",disabled:!c.ok,title:c.ok?"":c.msg,onclick:()=>{const o=H.enroll(S,h);if(o.ok){SP.push(h);EM.add(h);say(HN(h)+" enrols.");afterChange()}else say(o.msg)}},free?"Welcome her (free)":"Welcome her · "+H.feeOf(h)),
        E("button",{type:"button",class:"sm",onclick:()=>{H.decline(S,h);repaint("admissions")}},"Not now"),E("button",{type:"button",class:"sm",onclick:()=>U.codex("house:"+h)},"Codex"),
        !c.ok?E("span",{class:"mut"},c.msg):null)))))});
  const locked=ACAD.HOUSES.filter(H.lockedFaction).length;
  p.append(E("p",{class:"mut",style:{marginTop:"14px"}},"Beyond these doors: "+locked+" girls of the Lattice and the Starless Court have not answered Everspire yet. Their wings open as the academy grows."))}

/* ---------- Students ---------- */
function students(p){if(!S.order.length){p.append(E("p",{class:"mut"},"No girls yet. Open Admissions and welcome someone."));return}
  S.order.forEach(h=>{const g=S.girls[h],a=G.aptitude(h),rs=H.rooms2(S,h),fs=H.focusStats(S,h);
    const sel=E("select",{title:"Her main study",onchange:ev=>{g.focus=ev.target.value||null;H.syncMap(S);ctl&&ctl.frame(true);repaint("students")}},E("option",{value:""},"Auto"),...SID.map(st=>E("option",{value:st,selected:g.focus===st},SNAME[st])));
    p.append(E("div",{class:"hrow"},spr(h,44),E("div",null,
      E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,HN(h)+" · level "+H.levelOf(g)),E("span",{class:"mut"},"mood "+fmt(g.mood))),
      E("div",{class:"hst"},...SID.map(st=>E("div",{style:fs.includes(st)?{borderColor:"var(--g-gold)"}:null},SNAME[st],E("b",null,fmt(g.stats[st]))))),
      E("div",{class:"mut"},"Studies "+fs.map((st,i)=>SNAME[st]+(rs[i]?" in "+rn(rs[i]):" (no room yet)")).join(", ")),
      E("div",{class:"row",style:{marginTop:"6px"}},E("span",{class:"mut"},"Main study"),sel,E("button",{type:"button",class:"sm",onclick:()=>{HS.sel=h;ctl.focus(h,false)}},"Find her"),E("button",{type:"button",class:"sm",onclick:()=>U.codex("house:"+h)},"Codex")))))})}

/* ---------- Journal ---------- */
function journal(p){const di=dateInfo(S);p.append(E("div",{class:"card"},E("b",null,"Headmaster "+S.name),E("div",{class:"mut"},di.label+" · "+S.day+" days since you took the chair"),E("div",{class:"mut"},"Earned "+fmt(S.stats.earned)+" · spent "+fmt(S.stats.spent)+" coins")));
  p.append(E("h3",null,"Recent events"),...S.log.slice().reverse().slice(0,50).map(l=>E("div",{class:"hlog"},E("small",null,"Day "+l.d),l.t)))}

/* ---------- small overlays ---------- */
function studentPop(h){const pop=popEl;if(!pop)return;pop.textContent="";const sx=L().stateAt(h,HS.t,HS.day),rid=sx.st==="in"||sx.st==="out"?sx.room:sx.to,g=S.girls[h];HS.sel=h;
  pop.append(E("div",{class:"pop"},E("div",{class:"row"},spr(h,44),E("div",null,E("b",null,HN(h)+(g?" · level "+H.levelOf(g):"")),E("div",{class:"mut"},((ACAD.GROUP_OF(h)||{}).name||"")+" · "+rn(rid))),E("span",{class:"sp"}),
    E("button",{type:"button",class:"sm",onclick:()=>U.codex("house:"+h)},"Codex"),E("button",{type:"button",class:"sm",onclick:()=>{pop.textContent=""}},"Close"))))}
function awaySheet(rep,title){const r=root(),ov=E("div",{class:"overlay"}),sh=E("div",{class:"sheet"});ov.append(sh);r.append(ov);
  const days=rep.days,top=Object.entries(rep.gains).map(([h,g])=>[h,Object.values(g).reduce((a,b)=>a+b,0)]).sort((a,b)=>b[1]-a[1]).slice(0,5);
  sh.append(E("h2",null,title),E("p",null,days+" days went by at the academy. Nothing was lost, and nothing waited on you."),
    E("div",{class:"chips"},E("span",{class:"chip hot up"},"+"+fmt(rep.funds)+" coins"),E("span",{class:"chip hot up"},"+"+fmt(rep.renown||0)+" renown"),rep.insight?E("span",{class:"chip hot up"},"+"+fmt(rep.insight)+" insight"):null),
    top.length?E("div",{style:{marginTop:"10px"}},E("b",null,"Who grew most"),...top.map(([h,v])=>E("div",{class:"row",style:{margin:"3px 0"}},spr(h,32),E("span",null,HN(h)+" +"+r1(v)+" in all"))) ):null,
    E("div",{class:"row",style:{marginTop:"12px"}},E("button",{type:"button",class:"pri",onclick:()=>ov.remove()},"Continue")))}

H.ui={titleButtons,enter,stop,newScreen,savesScreen};
})();
