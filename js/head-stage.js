/* Everspire: the Headmaster, the Common Room. Replaces the walking map on the hub with a calm stage: your girls stand in fixed places, each with what she is doing
   and how close she is to her next tier, and a Next goal card says what to do. The campus map stays one tap away. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.ui||!ACAD.livemap)return;
const H=ACAD.head,U=H.ui,A=U.api,G=ACAD.game,E=ENC.E,HN=ENC.HN,PT=H.PT,SID=G.SID,SNAME=G.SNAME,LM=ACAD.livemap,origMount=LM.mountStage;
const PAGE=8,KEY="everspire.map";
const VERB={grace:"Practising grace",wit:"Studying",heart:"Tending hearts",vigor:"Training",craft:"Making things",nerve:"Testing her nerve"};
const PHASE=["Morning lessons","Afternoon lessons","Evening, free time"];
let wantMap=false;try{wantMap=localStorage.getItem(KEY)==="1"}catch(e){}

const css=`
#evRoot .st-goal{border:1px solid var(--g-gold);border-radius:12px;background:var(--g-card);padding:10px 12px;margin-bottom:10px;box-shadow:0 0 0 2px #d8b25a22}
#evRoot .st-goal small{display:block;color:var(--g-mut);letter-spacing:.08em;text-transform:uppercase;font-size:11px}
#evRoot .st-goal b{display:block;font-size:16px;margin:2px 0}
#evRoot .st-goal p{margin:2px 0 6px;color:var(--g-mut);font-size:13.5px}
#evRoot .st-goal .bar{height:8px;margin:6px 0 8px}
#evRoot .st-goal.ready{box-shadow:0 0 14px #d8b25a99;animation:stPulse 2s ease-in-out infinite}
@keyframes stPulse{50%{box-shadow:0 0 22px #d8b25acc}}
#evRoot .st-room{position:relative;border-radius:12px;border:1px solid var(--g-line);overflow:hidden;background:#10142a;padding:10px}
#evRoot .st-room::before{content:"";position:absolute;inset:0;background:var(--st-bg) center/cover;opacity:.32;filter:saturate(.8)}
#evRoot .st-room>*{position:relative}
#evRoot .st-head{display:flex;align-items:center;gap:8px;margin-bottom:8px}
#evRoot .st-head b{font-family:Cinzel,Georgia,serif;font-size:15px}
#evRoot .st-head .sp{flex:1}
#evRoot .st-phase{font-size:12.5px;color:var(--g-mut);white-space:nowrap}
#evRoot .st-head b{white-space:nowrap;font-size:14px}#evRoot .st-head button{white-space:nowrap}
#evRoot .st-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
#evRoot .st-g{background:#0d0a20cc;border:2px solid var(--st-c,var(--g-line));border-radius:10px;padding:6px 4px 7px;text-align:center;cursor:pointer;min-width:0}
#evRoot .st-g:hover,#evRoot .st-g.sel{box-shadow:0 0 12px var(--st-c,#d8b25a)}
#evRoot .st-g img{width:72px;height:72px;max-width:100%;animation:stBob 3.2s ease-in-out infinite;animation-delay:var(--st-d,0s)}
#evRoot .st-g.rest img{animation-duration:5s}
@keyframes stBob{50%{transform:translateY(-3px)}}
#evRoot .st-g .nm{font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#evRoot .st-g .act{font-size:11px;color:var(--g-mut);min-height:28px;line-height:1.25}
#evRoot .st-g .rar{font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--st-c)}
#evRoot .st-g .bar{height:5px;margin:4px 4px 0}
#evRoot .st-g.up{animation:stPulse 2s ease-in-out infinite}
#evRoot .st-empty{grid-column:1/-1;padding:18px 6px;text-align:center;color:var(--g-mut)}
#evRoot .st-pager{display:flex;justify-content:center;gap:8px;margin-top:8px;align-items:center}
@media(max-width:560px){#evRoot .st-grid{grid-template-columns:repeat(3,minmax(0,1fr))}#evRoot .st-g img{width:60px;height:60px}}
@media(prefers-reduced-motion:reduce){#evRoot .st-g img,#evRoot .st-goal.ready,#evRoot .st-g.up{animation:none}}
`;
function addCss(){if(!document.getElementById("stCss"))document.head.append(E("style",{id:"stCss"},css))}

const prog=q=>q.reqs.reduce((t,r)=>t+(r.ok?1:r.need?Math.min(1,r.have/r.need):0),0)/q.reqs.length;
function openTab(name){const r=A.root();const b=[...r.querySelectorAll(".tabs button")].find(x=>x.textContent.indexOf(name)===0);if(b)b.click()}

/* what to do next, in plain words */
function goal(){const S=A.S();if(!S)return null;
  if(!S.order.length)return {t:"Welcome your first girl",d:"Open Admissions and choose someone. Everything else grows from her.",pct:0,btn:"Open Admissions",go:()=>openTab("Admissions")};
  for(const h of S.order){const q=H.ascendReqs(S,h);if(q&&q.ok)return {ready:true,t:HN(h)+" is ready to ascend to "+q.tier.name,d:"Her page has the Ascend button. Each ascension plays a scene and makes her stronger.",pct:1,btn:"Ascend her",go:()=>U.openGirl&&U.openGirl(h)}}
  if(S.order.length<3&&S.short.length){const h=S.short.find(x=>H.canEnroll(S,x).ok);if(h)return {t:"An applicant is at the door: "+HN(h),d:"More girls means more to train and more stories. You have free beds.",pct:0,btn:"See applicants",go:()=>openTab("Admissions")}}
  let best=null,bq=null;
  S.order.forEach(h=>{const q=H.ascendReqs(S,h);if(!q)return;const p=prog(q);if(!best||p>best.p){best={h,p};bq=q}});
  if(!best)return {t:"Every girl has reached the summit",d:"Take on more girls, restore rooms, or begin a new era from the Legacy tab.",pct:1};
  const h=best.h,n=HN(h),r=bq.reqs.find(x=>!x.ok),head="Next: take "+n+" to "+bq.tier.name;
  if(r.k==="lvl")return {t:head,d:n+" is level "+r.have+" of "+r.need+". She gains levels on her own while she studies; restoring training rooms makes it faster.",pct:best.p,btn:"Find her",go:()=>A.go(h)};
  if(r.k==="aff")return {t:head,d:"Spend time with "+n+". Her affection must reach "+G.STAGELABEL[r.need]+".",pct:best.p,btn:"Spend time with her",go:()=>{const o=H.audience(A.S(),h);A.say(o.ok?o.text:o.msg);A.refreshTop();A.repaintAll();paint()}};
  if(r.k==="ess")return {t:head,d:n+" has "+r.have+" of "+r.need+" essence. Time with her, her scenes, moments and contests all add to it.",pct:best.p,btn:"Her page",go:()=>U.openGirl&&U.openGirl(h)};
  return {t:head,d:n+"'s trial is waiting on her page.",pct:best.p,btn:"Her page",go:()=>U.openGirl&&U.openGirl(h)}}

function mount(host,o){
  addCss();const st=o.state;let page=0,alive=true,lastKey="",lastPhase=-1;
  const root=A.root();if(root)root.setAttribute("data-stage","1");
  const goalEl=E("div",{class:"st-goal"}),room=E("div",{class:"st-room"}),grid=E("div",{class:"st-grid"}),pager=E("div",{class:"st-pager"}),phase=E("span",{class:"st-phase"});
  room.style.setProperty("--st-bg","url(assets/rooms/hall.webp)");
  const mapBtn=E("button",{type:"button",class:"sm",title:"The old walking map of the campus",onclick:()=>{try{localStorage.setItem(KEY,"1")}catch(e){}wantMap=true;swap()}},"Campus map");
  room.append(E("div",{class:"st-head"},E("b",null,"The Common Room"),phase,E("span",{class:"sp"}),mapBtn),grid,pager);
  host.append(goalEl,room);
  const dayPhase=()=>st.t<780?0:st.t<1080?1:2;
  function swap(){alive=false;if(root)root.removeAttribute("data-stage");host.textContent="";const c=origMount.call(LM,host,o);ctl.inner=c;ctl.frame=c.frame;ctl.focus=c.focus;ctl.refreshTiles=c.refreshTiles;ctl.dispose=c.dispose;Object.defineProperty(ctl,"info",{get:()=>c.info,configurable:true});A.repaintAll()}
  function paintGoal(){const g=goal();goalEl.textContent="";if(!g){goalEl.style.display="none";return}goalEl.style.display="";goalEl.className="st-goal"+(g.ready?" ready":"");
    goalEl.append(E("small",null,"Next goal"),E("b",null,g.t),E("p",null,g.d),E("div",{class:"bar"},E("i",{style:{width:Math.round(g.pct*100)+"%"}})));
    if(g.btn)goalEl.append(E("button",{type:"button",class:"pri",onclick:g.go},g.btn))}
  function paint(){if(!alive)return;const S=A.S();if(!S)return;const ph=dayPhase();phase.textContent=PHASE[ph];
    const n=S.order.length,pages=Math.max(1,Math.ceil(n/PAGE));if(page>=pages)page=pages-1;
    const key=S.order.join(",")+"|"+page+"|"+ph+"|"+S.order.map(h=>{const g=S.girls[h];return g.tier+":"+Math.floor(g.mood/10)+":"+(H.ascendReqs(S,h)||{ok:0}).ok}).join(",")+"|"+(st.sel||"");
    if(key===lastKey){return}lastKey=key;
    grid.textContent="";
    if(!n)grid.append(E("div",{class:"st-empty"},"The room is quiet. Welcome a girl from Admissions and she will appear here."));
    S.order.slice(page*PAGE,page*PAGE+PAGE).forEach((h,i)=>{const g=S.girls[h],t=PT[g.tier]||PT[0],q=H.ascendReqs(S,h),rs=H.rooms2(S,h),fs=H.focusStats(S,h);
      let act;if(g.mood<25||ph===2)act=ph===2?"Free time":"Resting";else{const si=Math.min(ph,Math.max(0,fs.length-1)),stt=fs[si]||fs[0];act=stt?(VERB[stt]||"Studying")+(rs[si]?" · "+A.rn(rs[si]):""):"Resting"}
      const card=E("div",{class:"st-g"+(h===st.sel?" sel":"")+(q&&q.ok?" up":"")+(act==="Resting"||act==="Free time"?" rest":""),style:{"--st-c":t.col,"--st-d":(i*0.4)+"s"},title:HN(h),onclick:()=>{st.sel=h;lastKey="";o.onSelect&&o.onSelect(h);paint()}},
        A.spr(h,72),E("div",{class:"nm"},HN(h)),E("div",{class:"rar"},t.name+(q&&q.ok?" · ready":"")),E("div",{class:"act"},act),q?E("div",{class:"bar"},E("i",{style:{width:Math.round(prog(q)*100)+"%",background:PT[g.tier+1]?PT[g.tier+1].col:t.col}})):null);
      grid.append(card)});
    pager.textContent="";if(pages>1)pager.append(E("button",{type:"button",class:"sm",disabled:page===0,onclick:()=>{page--;lastKey="";paint()}},"◀"),E("span",{class:"mut"},"Page "+(page+1)+" of "+pages+" · "+n+" girls"),E("button",{type:"button",class:"sm",disabled:page>=pages-1,onclick:()=>{page++;lastKey="";paint()}},"▶"))}
  const ctl={state:st,stage:room,redraw:()=>{lastKey="";paint();paintGoal()},select:h=>{st.sel=h;lastKey="";paint()},
    frame:force=>{if(!alive)return;if(force){lastKey=""}paint();if(force)paintGoal()},
    focus:h=>{const S=A.S();if(!S)return;const i=S.order.indexOf(h);if(i>=0)page=Math.floor(i/PAGE);st.sel=h;lastKey="";paint();const el=grid.children[i%PAGE];if(el&&el.scrollIntoView)el.scrollIntoView({block:"nearest",behavior:"smooth"})},
    refreshTiles(){},dispose:()=>{alive=false;if(root)root.removeAttribute("data-stage")},get info(){return {}}};
  /* the clock runs the days exactly as the map did, so every rate in the game is unchanged */
  let last=0,goalT=0;const loop=now=>{if(!alive)return;if(!host.isConnected){alive=false;return}
    if(st.play){const dt=Math.min(200,now-last);st.t+=dt/1000*st.speed*4;if(st.t>=1440){st.t-=1440;st.day=(st.day+1)%7;if(o.onDay)o.onDay(st.day)}}
    if(now-last>200||!st.play){last=now;paint();if(o.onFrame)o.onFrame({force:false,t:st.t,day:st.day})}
    if(now-goalT>1500){goalT=now;paintGoal()}
    requestAnimationFrame(loop)};
  paint();paintGoal();requestAnimationFrame(loop);
  return ctl}

/* only the Headmaster hub opts in; the Encyclopedia map and the planner call the original */
LM.mountStage=function(host,o){if(o&&o.girls&&o.level&&o.onDay&&!wantMap)return mount(host,o);return origMount.call(LM,host,o)};
LM.mountStage.stage=true;
/* a way back from the map */
U.stageToggle=()=>{try{localStorage.removeItem(KEY)}catch(e){}wantMap=false};
const root0=()=>document.getElementById("evRoot");
setInterval(()=>{const r=root0();if(!r||!wantMap)return;const bar=r.querySelector(".hub .left .cap");if(!bar||bar.querySelector(".st-back"))return;
  const b=E("button",{type:"button",class:"sm st-back",style:{marginLeft:"10px"},onclick:()=>{U.stageToggle();const s=A.S();if(s)U.enter(s)}},"Back to the Common Room");bar.append(b)},1200);
})();
