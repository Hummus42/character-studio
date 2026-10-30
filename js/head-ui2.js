/* Everspire: the Headmaster, screens for slice 2: the Collection (Hall of Girls) with filters and sorting, each girl's page with her prestige frame and ascension,
   contests as open invitations, Wardens on the Academy tab, scouting and the two sealed wings on the Admissions tab. Plugs into head-ui.js. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.ui||!ACAD.head.PT||!ENC.E)return;
const H=ACAD.head,U=ACAD.head.ui,A=U.api,E=ENC.E,HN=ENC.HN,G=ACAD.game,SID=G.SID,SNAME=G.SNAME,PT=H.PT,L=()=>ACAD.livemap,root=()=>A.root(),S=()=>A.S();
const fmt=n=>Math.round(n),r1=v=>Math.round(v*10)/10,bio=h=>(typeof BIOS==="object"&&BIOS[h])||{},grp=h=>ACAD.GROUP_OF(h)||{};
const css=`
@keyframes ptshim{0%{background-position:0 0,0% 50%}100%{background-position:0 0,300% 50%}}
#evRoot .pc{position:relative;background:var(--g-card);border:3px solid var(--t1);border-radius:12px;padding:6px;text-align:center;cursor:pointer;min-width:0}
#evRoot .pc:hover{filter:brightness(1.12)}
#evRoot .pt-common{--t1:#8b8ba2}
#evRoot .pt-uncommon{--t1:#6fcf8e}#evRoot .pt-uncommon::before,#evRoot .pt-uncommon::after{content:"";position:absolute;width:7px;height:7px;background:#6fcf8e;top:-5px}#evRoot .pt-uncommon::before{left:-5px}#evRoot .pt-uncommon::after{right:-5px}
#evRoot .pt-rare{--t1:#5aa9f0;box-shadow:0 0 0 2px #0d0a20,0 0 0 4px #5aa9f0,0 0 14px #5aa9f088}
#evRoot .pt-legendary{border-color:transparent;background:linear-gradient(var(--g-card),var(--g-card)) padding-box,linear-gradient(110deg,#a8741a,#ffe08a,#a8741a,#ffe08a,#a8741a) border-box;background-size:100% 100%,300% 100%;animation:ptshim 3.5s linear infinite;box-shadow:0 0 12px #e8b64a77}
#evRoot .pt-mythic{border-color:transparent;background:linear-gradient(var(--g-card),var(--g-card)) padding-box,linear-gradient(120deg,#e86bd8,#6bd8e8,#e8e86b,#e86bd8,#6bd8e8) border-box;background-size:100% 100%,300% 300%;animation:ptshim 4s linear infinite;box-shadow:0 0 16px #e86bd899,0 0 6px #6bd8e899}
#evRoot .pc img.cp{width:96px;height:96px;image-rendering:auto}#evRoot .pc .nm{font-weight:700;font-size:14px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#evRoot .pc .tg{font-size:11.5px;color:var(--t1);font-weight:700;letter-spacing:.04em;text-transform:uppercase}
#evRoot .pc.sil img.cp{filter:brightness(0) opacity(.55)}#evRoot .pc.sil{opacity:.75;cursor:default}
#evRoot .pc.sealed img.cp{filter:brightness(0) opacity(.3)}
#evRoot .pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:12px;margin-top:10px}
#evRoot .pgrid.compact{grid-template-columns:repeat(auto-fill,minmax(74px,1fr));gap:8px}#evRoot .pgrid.compact img.cp{width:54px;height:54px}#evRoot .pgrid.compact .nm{font-size:11px}#evRoot .pgrid.compact .xt{display:none}
#evRoot .plist .pr{display:grid;grid-template-columns:48px 1.3fr .7fr .6fr .6fr;gap:8px;align-items:center;padding:4px 8px;margin:4px 0;font-size:13px}#evRoot .plist .pr img{width:40px;height:40px}
#evRoot .colbar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:8px 0}
#evRoot .colbar button.on{background:var(--g-gold);color:#241b06;border-color:transparent}
#evRoot .ptdot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;vertical-align:middle}
#evRoot .req{display:flex;gap:8px;align-items:center;padding:3px 0;font-size:14px}#evRoot .req i{font-style:normal;width:18px;text-align:center}
#evRoot .gcard{display:grid;grid-template-columns:132px 1fr;gap:14px;align-items:start}#evRoot .gcard>div:first-child{text-align:center}#evRoot .gcard img.big{width:128px;height:128px}
#evRoot .sbar{display:grid;grid-template-columns:54px 1fr 60px;gap:6px;align-items:center;font-size:13px;margin:2px 0}
#evRoot .sceneth{width:72px;height:104px;object-fit:cover;border-radius:6px;border:1px solid var(--g-line);cursor:pointer}
#evRoot .wing{border-left:3px solid var(--g-gold)}
@media(max-width:600px){#evRoot .gcard{grid-template-columns:1fr}#evRoot .plist .pr{grid-template-columns:44px 1fr .6fr}#evRoot .plist .pr .h2{display:none}}
`;
function injectCss(){if(!document.getElementById("hdCss2"))document.head.append(E("style",{id:"hdCss2"},css))}
const chibi=(h,sz)=>E("img",{class:"cp",src:"assets/sprites/"+h+".256.webp",alt:"",width:sz,height:sz,loading:"lazy",draggable:"false",onerror:ev=>{const u=ACAD.pixelURL?ACAD.pixelURL(h):"";if(u&&ev.target.src!==u)ev.target.src=u}});
const tierName=g=>PT[g.tier||0].name;

/* ---------- who is who ---------- */
function statusOf(h){const s=S();if(s.girls[h])return "enrolled";if(s.alumnae.some(a=>a.h===h))return "alumna";if(s.scouts.some(x=>x.h===h))return "scouting";if(s.short.includes(h))return "applicant";if(H.locked(s,h))return "sealed";return s.flags.seen&&s.flags.seen[h]?"known":"unmet"}
function markSeen(){const s=S();s.flags.seen=s.flags.seen||{};s.short.forEach(h=>s.flags.seen[h]=1);s.scouts.forEach(x=>s.flags.seen[x.h]=1);s.order.forEach(h=>s.flags.seen[h]=1)}
const allGroups=()=>{const m={};ACAD.HOUSES.forEach(h=>{const g=grp(h);if(g.id)m[g.id]=g.name});return Object.entries(m).sort((a,b)=>a[1].localeCompare(b[1]))};
const trophiesOf=h=>S().trophies.filter(t=>t.h===h);
const scenesOf=h=>Object.keys((S().gallery||{})[h]||{});
function metrics(h){const s=S(),g=s.girls[h],st=statusOf(h);if(!g){const al=s.alumnae.find(a=>a.h===h);return {tier:al?al.tier:-1,level:al?H.levelOf({stats:al.stats}):-1,aff:-1,total:-1,ess:-1,trophies:trophiesOf(h).length,joined:-1,scenes:scenesOf(h).length,stats:al?al.stats:null,st}}
  return {tier:g.tier,level:H.levelOf(g),aff:g.aff,total:SID.reduce((t,k)=>t+g.stats[k],0),ess:g.ess,trophies:trophiesOf(h).length,joined:g.joined,scenes:scenesOf(h).length,stats:g.stats,st}}

/* ---------- the Collection ---------- */
const F={q:"",tiers:new Set(),status:"all",group:"",stat:"",aff:"",ward:false,muse:false,ready:false,sort:"tier",dir:-1,view:"cards",sealed:false};
const SORTS=[["tier","Tier"],["level","Level"],["name","Name"],["aff","Affection"],["total","Total stats"],...SID.map(k=>["st:"+k,SNAME[k]]),["trophies","Trophies"],["joined","Date joined"],["scenes","Scenes"],["ess","Essence"]];
function passes(h,m){const s=S(),st=m.st,g=s.girls[h];
  if(F.q&&!(HN(h)+" "+grp(h).name+" "+(bio(h).fullName||"")).toLowerCase().includes(F.q.toLowerCase()))return false;
  if(F.tiers.size&&!(m.tier>=0&&F.tiers.has(m.tier)))return false;
  if(F.status!=="all"&&st!==F.status&&!(F.status==="met"&&["enrolled","alumna","scouting","applicant","known"].includes(st)))return false;
  if(F.group&&grp(h).id!==F.group)return false;
  if(F.stat){if(!m.stats)return false;const top=SID.slice().sort((a,b)=>m.stats[b]-m.stats[a]).slice(0,2);if(!top.includes(F.stat))return false}
  if(F.aff!==""&&!(g&&H.affStage(g.aff)>=+F.aff))return false;
  if(F.ward&&!(g&&H.wardenOf(s,h)))return false;if(F.muse&&!H.isMuse(s,h))return false;if(F.ready&&!(g&&H.readyToAscend(s,h)))return false;
  if(!F.sealed&&(st==="sealed"||st==="unmet")&&F.status!=="sealed"&&F.status!=="unmet"&&F.status!=="all")return false;
  if(!F.sealed&&F.status==="all"&&(st==="sealed"||st==="unmet"))return false;
  return true}
function sortKey(h,m){const k=F.sort;if(k==="name")return HN(h);if(k.startsWith("st:"))return m.stats?m.stats[k.slice(3)]:-1;return m[k]}
function collection(p){injectCss();markSeen();const s=S();
  const all=ACAD.HOUSES.map(h=>[h,metrics(h)]),met=all.filter(([h,m])=>!["unmet","sealed"].includes(m.st)).length,rare=s.order.filter(h=>s.girls[h].tier>=2).length,myth=s.order.filter(h=>s.girls[h].tier>=4).length;
  const hm=H.harmony(s);
  p.append(E("div",{class:"card"},E("b",{style:{fontSize:"17px"}},"Hall of Girls"),E("div",{class:"mut"},met+" of "+ACAD.HOUSES.length+" met · "+s.order.length+" enrolled · "+rare+" Rare or better · "+myth+" Mythic · "+s.alumnae.length+" alumnae"),
    E("div",{class:"row",style:{marginTop:"6px"}},E("span",{class:"chip"+(hm.v>=70?" hot up":hm.v<40?" down":"")},"Court harmony "+hm.v+"% · "+hm.n+" courting"),hm.pairs.filter(x=>x.k==="rivals").length?E("span",{class:"chip down"},hm.pairs.filter(x=>x.k==="rivals").length+" rivalr"+(hm.pairs.filter(x=>x.k==="rivals").length===1?"y":"ies")+" in the court"):null,
      E("button",{type:"button",class:"sm",disabled:s.funds<200||(s.flags.tidyUntil||0)>s.day,onclick:()=>{const r=H.tidy(s);A.say(r.ok?"The court is calmer.":r.msg);A.refreshTop();A.repaint("collection")}},"Rearrange seating · 200"))));
  const q=E("input",{type:"search",placeholder:"Search by name or group",value:F.q,style:{flex:"1",minWidth:"140px"},oninput:ev=>{F.q=ev.target.value;repaintList()}});
  const sel=(opts,val,fn)=>E("select",{onchange:ev=>{fn(ev.target.value);paint()}},...opts.map(([v,l])=>E("option",{value:v,selected:String(v)===String(val)},l)));
  const tog=(label,key)=>E("button",{type:"button",class:"sm"+(F[key]?" on":""),onclick:()=>{F[key]=!F[key];paint()}},label);
  const bar1=E("div",{class:"colbar"},q,sel(SORTS,F.sort,v=>F.sort=v),E("button",{type:"button",class:"sm",title:"Reverse the order",onclick:()=>{F.dir=-F.dir;paint()}},F.dir<0?"High to low":"Low to high"),
    ...["cards","compact","list"].map(v=>E("button",{type:"button",class:"sm"+(F.view===v?" on":""),onclick:()=>{F.view=v;paint()}},{cards:"Cards",compact:"Grid",list:"List"}[v])));
  const bar2=E("div",{class:"colbar"},...PT.map((t,i)=>E("button",{type:"button",class:"sm"+(F.tiers.has(i)?" on":""),style:{borderColor:t.col},onclick:()=>{F.tiers.has(i)?F.tiers.delete(i):F.tiers.add(i);paint()}},E("span",{class:"ptdot",style:{background:t.col}}),t.name)));
  const bar3=E("div",{class:"colbar"},sel([["all","Everyone met"],["enrolled","Enrolled"],["applicant","Applicants"],["scouting","Being scouted"],["alumna","Alumnae"],["unmet","Not yet met"],["sealed","Sealed wings"]],F.status,v=>F.status=v),
    sel([["","Any group"],...allGroups()],F.group,v=>F.group=v),sel([["","Any strength"],...SID.map(k=>[k,"Strong in "+SNAME[k]])],F.stat,v=>F.stat=v),sel([["","Any affection"],...G.STAGELABEL.map((l,i)=>[i,"At least "+l.toLowerCase()]).slice(1)],F.aff,v=>F.aff=v),
    tog("Wardens","ward"),tog("Muses","muse"),tog("Ready to ascend","ready"),tog("Show unmet and sealed","sealed"),
    E("button",{type:"button",class:"sm",onclick:()=>{F.q="";F.tiers.clear();F.status="all";F.group="";F.stat="";F.aff="";F.ward=F.muse=F.ready=F.sealed=false;paint()}},"Clear"));
  const host=E("div");p.append(bar1,bar2,bar3,host);
  function repaintList(){host.textContent="";let rows=all.filter(([h,m])=>passes(h,m));
    rows.sort((a,b)=>{const x=sortKey(a[0],a[1]),y=sortKey(b[0],b[1]);const c=typeof x==="string"?x.localeCompare(y):(x-y);return (c||HN(a[0]).localeCompare(HN(b[0])))*(F.sort==="name"?-F.dir:F.dir)});
    host.append(E("div",{class:"mut",style:{margin:"6px 0 0"}},rows.length+" shown"));
    if(F.view==="list"){const lst=E("div",{class:"plist"});rows.forEach(([h,m])=>lst.append(listRow(h,m)));host.append(lst)}
    else{const g=E("div",{class:"pgrid"+(F.view==="compact"?" compact":"")});rows.forEach(([h,m])=>g.append(card(h,m)));host.append(g)}}
  function paint(){const y=A.root().querySelector(".panel").scrollTop;A.repaint("collection");A.root().querySelector(".panel").scrollTop=y}
  repaintList()}
function card(h,m){const s=S(),st=m.st,known=!["unmet","sealed"].includes(st),g=s.girls[h],ti=m.tier>=0?m.tier:0;
  if(!known){const lock=st==="sealed";return E("div",{class:"pc pt-common sil"+(lock?" sealed":""),title:lock?"A sealed wing":"Not met yet"},chibi(h,96),E("div",{class:"nm"},"???"),E("div",{class:"mut xt",style:{fontSize:"11.5px"}},lock?(H.FACTION(h)||{}).short+" · sealed":grp(h).name+" · "+["Hopeful","Promising","Talented","Exceptional"][H.rarityOf(h)]))}
  return E("div",{class:"pc pt-"+PT[ti].id,onclick:()=>openGirl(h)},chibi(h,96),E("div",{class:"nm"},HN(h)),E("div",{class:"tg"},m.tier>=0?PT[ti].name:st==="applicant"?"At the door":st==="scouting"?"Being found":"Known"),
    g?E("div",{class:"mut xt",style:{fontSize:"11.5px"}},"Lv "+m.level+" · "+G.STAGELABEL[H.affStage(g.aff)]+(H.isMuse(s,h)?" ★":"")+(H.wardenOf(s,h)?" ⚑":"")+(H.readyToAscend(s,h)?" ↑":"")):E("div",{class:"mut xt",style:{fontSize:"11.5px"}},st==="alumna"?"Alumna · Lv "+m.level:grp(h).name))}
function listRow(h,m){const s=S(),st=m.st,known=!["unmet","sealed"].includes(st),ti=m.tier>=0?m.tier:0,g=s.girls[h];
  return E("div",{class:"pc pt-"+(known?PT[ti].id:"common")+(known?"":" sil"),style:{textAlign:"left"},onclick:known?()=>openGirl(h):null},chibi(h,40),E("div",null,E("b",null,known?HN(h):"???"),E("div",{class:"mut",style:{fontSize:"12px"}},known?grp(h).name:"Sealed or unmet")),
    E("div",{class:"h2"},m.tier>=0?PT[ti].name:st),E("div",null,g?"Lv "+m.level:"—"),E("div",{class:"h2"},g?G.STAGELABEL[H.affStage(g.aff)]:"—"))}

/* ---------- a girl's page ---------- */
function sheet(){const ov=E("div",{class:"overlay",onclick:ev=>{if(ev.target===ov)ov.remove()}}),sh=E("div",{class:"sheet"});ov.append(sh);root().append(ov);return {ov,sh,close:()=>ov.remove()}}
function openGirl(h){injectCss();const s=S(),st=statusOf(h),g=s.girls[h],{ov,sh,close}=sheet();let info="";
  const draw=()=>{sh.textContent="";const g2=s.girls[h],ti=g2?g2.tier:(s.alumnae.find(a=>a.h===h)||{}).tier||0,t=PT[ti];
    sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("h2",{style:{margin:0}},HN(h)),E("button",{type:"button",class:"sm",onclick:close},"Close")));
    sh.append(E("div",{class:"gcard",style:{marginTop:"8px"}},E("div",null,E("div",{class:"pc pt-"+t.id,style:{cursor:"default",padding:"8px"}},chibi(h,128),E("div",{class:"tg"},t.name)),g2?E("div",{style:{marginTop:"8px"}},E("button",{type:"button",class:"sm",onclick:()=>{H.setMuse(s,h);A.afterChange();draw()}},H.isMuse(s,h)?"★ Muse (tap to release)":"☆ Make a Muse")):null),
      E("div",null,E("div",{class:"mut"},grp(h).name+" · "+(bio(h).occupation||"").split(/[;,]/)[0]),
        g2?E("div",null,E("div",{class:"row",style:{margin:"4px 0"}},E("span",{class:"chip hot"},"Level "+H.levelOf(g2)),E("span",{class:"chip"},"Mood "+fmt(g2.mood)),E("span",{class:"chip"},G.STAGELABEL[H.affStage(g2.aff)])),
          ...SID.map(k=>E("div",{class:"sbar"},E("span",{class:"mut"},SNAME[k]),E("div",{class:"bar"},E("i",{style:{width:Math.min(100,g2.stats[k]/H.capOf(g2)*100)+"%"}})),E("span",null,fmt(g2.stats[k])+" / "+H.capOf(g2)))),
          E("div",{class:"mut",style:{marginTop:"4px"}},"Essence "+fmt(g2.ess)+" · "+(H.wardenOf(s,h)?"Warden of "+A.rn(H.wardenOf(s,h)):"no warden post")+" · "+trophiesOf(h).length+" trophies")):
          E("div",{class:"mut"},st==="alumna"?"She graduated and writes to the academy still.":st==="sealed"?"Her wing is sealed.":st==="applicant"?"She is waiting at the door.":st==="scouting"?"A scout is on the way.":"Not enrolled."))));
    if(g2){
      const row=E("div",{class:"row",style:{margin:"10px 0"}},E("button",{type:"button",class:"pri",onclick:()=>{const r=H.audience(s,h);info=r.ok?r.text+(r.up?"  (You are closer now: "+G.STAGELABEL[r.stage]+".)":""):r.msg;A.refreshTop();draw()}},"Spend time with her"),
        E("button",{type:"button",class:"sm",onclick:()=>{A.go(h);close()}},"Find her on the map"),E("button",{type:"button",class:"sm",onclick:()=>ACAD.gameUI.codex("house:"+h)},"Codex"));
      sh.append(row);if(info)sh.append(E("div",{class:"bubble"},info));
      sh.append(E("h3",null,"Gifts"),E("div",{class:"chips"},...H.GIFTS.map(it=>{const k=(g2.known||{})[it.id],mark=k==null?"":k>=2?"♥ ":k===1?"+ ":k===0?"· ":"✗ ";return E("button",{type:"button",class:"sm",disabled:s.funds<it.price||g2.lastGift===s.day,title:k==null?"You don't know yet whether she likes it":"Last time: "+(k>=2?"she loved it":k===1?"she liked it":k===0?"she was polite":"it wasn't her taste"),onclick:()=>{const r=H.gift(s,h,it.id);info=r.ok?r.text:r.msg;A.refreshTop();A.afterChange();draw()}},mark+it.name.replace(/^An? /,"")+" · "+it.price)})));
      sh.append(E("h3",null,"Moments"),E("div",{class:"row"},...H.moments(s,h).map(m=>E("button",{type:"button",class:"sm"+(m.ready?" pri":""),disabled:!(m.ready||m.seen),title:m.need.join("; ")||"Remember it",onclick:()=>momentSheet(h,m.id,draw)},(m.seen?"✓ ":m.ready?"♥ ":"· ")+m.name))),E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},"Moments open as she grows closer. They never expire."));
      if(H.sceneList){const sl=H.sceneList(s,h),rd=sl.filter(x=>x.seen).length,nx=sl.find(x=>!x.ready&&!x.seen);sh.append(E("h3",null,"Scenes with her ("+rd+" of "+sl.length+" read)"),E("div",{class:"chips"},...sl.filter(x=>x.ready||x.seen).map(x=>E("button",{type:"button",class:"sm"+(x.ready&&!x.seen?" pri":""),disabled:!x.ready&&!x.seen,title:x.need.join("; ")||"Read it again",onclick:()=>sceneReader(h,x.id,draw)},(x.seen?"✓ ":x.ready?"♥ ":"· ")+x.title))),nx?E("div",{class:"mut",style:{fontSize:"12px",marginTop:"4px"}},"Next: "+nx.title+" — "+nx.need.join("; ")):null)}
      const q=H.ascendReqs(s,h);
      if(q){sh.append(E("h3",null,"Ascend to "+q.tier.name),...q.reqs.map(r=>E("div",{class:"req"},E("i",{class:r.ok?"up":"down"},r.ok?"✓":"○"),E("span",null,r.label+(r.have!=null&&!r.ok?" (she has "+r.have+")":"")))));
        const btns=E("div",{class:"row",style:{margin:"6px 0"}});
        if(q.tier.need.trial&&!g2.trial[q.ti])btns.append(E("button",{type:"button",onclick:()=>trialSheet(h,q.ti,draw)},"Face her trial"));
        if(q.ti===4)btns.append(...Object.entries(H.VOWS).map(([k,v])=>E("button",{type:"button",class:"sm",disabled:!q.ok,title:v.text,onclick:()=>{const r=H.ascend(s,h,k);A.say(r.ok?HN(h)+" ascends.":r.msg);A.afterChange();draw();if(r.ok){if(U.flourish)U.flourish(h,PT.indexOf(r.tier));narrSheet(h,"Ascension: "+r.tier.name,H.ascensionScene(h,PT.indexOf(r.tier),k),"A Mythic ceremony")}}},v.name)));
        else btns.append(E("button",{type:"button",class:"pri",disabled:!q.ok,onclick:()=>{const r=H.ascend(s,h);A.say(r.ok?HN(h)+" ascends to "+r.tier.name+".":r.msg);A.afterChange();draw();if(r.ok){if(U.flourish)U.flourish(h,PT.indexOf(r.tier));narrSheet(h,"Ascension: "+r.tier.name,H.ascensionScene(h,PT.indexOf(r.tier)),HN(h))}}},"Ascend"));
        sh.append(btns)}
      else sh.append(E("p",{class:"mut"},"She stands at the summit."+(g2.vow?" "+H.VOWS[g2.vow].name+": "+H.VOWS[g2.vow].text:"")))}
    else if(st!=="sealed"&&st!=="alumna"){const c=H.canScout(s,h);if(!s.short.includes(h)&&st!=="scouting")sh.append(E("div",{class:"row",style:{margin:"10px 0"}},E("button",{type:"button",class:c.ok?"pri":"",disabled:!c.ok,title:c.ok?"":c.msg,onclick:()=>{const r=H.scout(s,h);A.say(r.ok?"A scout sets out.":r.msg);A.afterChange();draw()}},"Send a scout · "+H.scoutCost(h)),E("span",{class:"mut"},c.ok?"about "+H.scoutDays(h)+" days":c.msg)))}
    const tr=trophiesOf(h);if(tr.length){sh.append(E("h3",null,"Trophies"),E("div",{class:"chips"},...tr.slice(-12).map(t=>E("button",{type:"button",class:"sm"+(t.rank===1?" pri":""),title:"Read it",onclick:()=>narrSheet(h,(H.CONTESTS.find(c=>c.id===t.c)||{}).name||"Contest",H.contestScene(h,t.c,t.rank,t.year+1),"Year "+(t.year+1))},(H.CONTESTS.find(c=>c.id===t.c)||{}).name+" · yr "+(t.year+1)+" · "+["","gold","silver","bronze"][Math.min(t.rank,3)]||"placed "+t.rank))))}
    const sc=scenesOf(h);if(sc.length)sh.append(E("h3",null,"Scrapbook"),E("div",{class:"row"},...sc.map(id=>E("img",{class:"sceneth",src:"assets/scenes/"+h+"/"+id+".webp",alt:id,loading:"lazy",onclick:()=>sceneView(h,id),onerror:ev=>ev.target.remove()}))))};
  draw()}
function momentSheet(h,id,after){const s=S(),r=H.playMoment(s,h,id);if(!r.ok){A.say(r.msg);return}A.afterChange();const {sh,close}=sheet();
  sh.append(E("h2",null,r.name+" · "+HN(h)),E("div",{class:"gcard"},E("img",{src:"assets/scenes/"+h+"/"+id+".webp",alt:"",style:{width:"100%",maxWidth:"300px",borderRadius:"10px",border:"1px solid var(--g-gold)"},onerror:ev=>{ev.target.replaceWith(E("div",{class:"card mut",style:{textAlign:"center"}},chibi(h,128),E("p",null,"The picture for this moment isn't ready yet. It is kept in her scrapbook.")))}}),E("div",{style:{lineHeight:"1.6"}},...(r.paras||[r.text]).map(t=>E("p",{style:{margin:"0 0 10px"}},t)),r.first?E("div",{class:"chips"},E("span",{class:"chip hot up"},"+2 essence"),E("span",{class:"chip hot up"},"mood up")):null,E("div",{class:"row",style:{marginTop:"10px"}},E("button",{type:"button",class:"pri",onclick:()=>{close();after&&after()}},"Continue")))))}
function narrSheet(h,title,paras,sub){const {sh,close}=sheet();sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("div",null,E("h2",{style:{margin:0}},title),E("div",{class:"mut"},sub||HN(h))),E("button",{type:"button",class:"sm",onclick:close},"Close")),
  E("div",{class:"gcard",style:{marginTop:"10px"}},E("div",null,chibi(h,128)),E("div",{style:{lineHeight:"1.6"}},...paras.map(t=>E("p",{style:{margin:"0 0 10px"}},t)))),E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:close},"Continue")))}
U.narrSheet=narrSheet;
function textSheet(title,sub,paras,hs){const {sh,close}=sheet();sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("div",null,E("h2",{style:{margin:0}},title),E("div",{class:"mut"},sub||"")),E("button",{type:"button",class:"sm",onclick:close},"Close")),
  hs&&hs.length?E("div",{class:"row",style:{margin:"6px 0"}},...hs.slice(0,6).map(h=>A.spr(h,36))):null,E("div",{style:{lineHeight:"1.6",marginTop:"6px"}},...paras.map(t=>E("p",{style:{margin:"0 0 10px"}},t))),E("div",{class:"row"},E("button",{type:"button",class:"pri",onclick:close},"Continue")))}
U.textSheet=textSheet;
function sceneReader(h,id,after){const s=S(),r=H.readScene(s,h,id);if(!r.ok){A.say(r.msg);return}A.afterChange();const meta=H.sceneList(s,h).find(x=>x.id===id)||{},choice=!!meta.choice&&r.heat>=1,{sh,close}=sheet(),heat=["A quiet moment","A warm moment","A kiss","Heated","Intimate","Afterglow"][r.heat]||"";
  const LAB=[null,["Say something kind","Tease her"],["Take it slowly","Take the lead"],["Be tender","Be bold"],["Be tender","Be bold"],["Stay quiet and close","Tease her gently"]][r.heat]||["Gently","Boldly"];let tone=null;
  const draw=()=>{sh.textContent="";const paras=tone==null&&!choice?r.paras:H.sceneText(h,id,tone==null?0:tone,H.seasonOf?H.seasonOf(s):undefined),cut=choice&&tone==null?4:paras.length;
    sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("div",null,E("h2",{style:{margin:0}},r.title),E("div",{class:"mut"},HN(h)+" · "+heat)),E("button",{type:"button",class:"sm",onclick:close},"Close")),
      E("div",{class:"gcard",style:{marginTop:"10px"}},E("div",null,r.art?E("img",{src:"assets/scenes/"+h+"/"+r.art+".webp",alt:"",style:{width:"100%",maxWidth:"220px",borderRadius:"10px",border:"1px solid var(--g-gold)"},onerror:ev=>{ev.target.replaceWith(chibi(h,128))}}):chibi(h,128)),
        E("div",{style:{lineHeight:"1.6"}},...paras.slice(0,cut).map(t=>E("p",{style:{margin:"0 0 10px"}},t)),r.first&&cut===paras.length?E("div",{class:"chips"},E("span",{class:"chip hot up"},"+0.5 essence"),E("span",{class:"chip hot up"},"mood up")):null)),
      choice&&tone==null?E("div",{class:"card",style:{marginTop:"8px"}},E("div",{class:"mut"},"How do you answer?"),E("div",{class:"row",style:{marginTop:"6px"}},E("button",{type:"button",class:"pri",onclick:()=>{tone=0;draw()}},LAB[0]),E("button",{type:"button",onclick:()=>{tone=1;draw()}},LAB[1]))):
      E("div",{class:"row",style:{marginTop:"6px"}},E("button",{type:"button",class:"pri",onclick:()=>{close();after&&after()}},"Continue")))};
  draw()}
function sceneView(h,id){const {sh,close}=sheet();sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,HN(h)),E("button",{type:"button",class:"sm",onclick:close},"Close")),E("img",{src:"assets/scenes/"+h+"/"+id+".webp",alt:"",style:{width:"100%",maxWidth:"420px",borderRadius:"10px",display:"block",margin:"8px auto"},onerror:ev=>{ev.target.replaceWith(E("div",{class:"card mut",style:{textAlign:"center"}},chibi(h,96),E("p",null,"The picture for this moment isn't ready yet.")))}}))}
function trialSheet(h,ti,after){const s=S(),t=H.trialFor(s,h,ti),{sh,close}=sheet();let msg="";
  const draw=()=>{sh.textContent="";sh.append(E("h2",null,t.title),E("p",null,t.text),E("div",{class:"row"},...t.choices.map(c=>E("button",{type:"button",onclick:()=>{const r=H.attemptTrial(s,h,ti,c.st);msg=r.ok?r.text:r.msg;if(r.ok){A.afterChange();close();after&&after();A.say(HN(h)+" passes her trial.");return}draw()}},c.label+" ("+SNAME[c.st]+")"))),msg?E("div",{class:"bubble"},msg):null,E("p",{class:"mut"},"Each way needs a stat of "+t.need+" or more. Nothing is lost by trying the wrong one."),E("div",{class:"row"},E("button",{type:"button",class:"sm",onclick:close},"Not now")))};draw()}

/* ---------- Contests ---------- */
const sel3=new Map();
function contests(p){injectCss();const s=S(),inv=H.invitations(s),yr=Math.floor(s.day/360)+1;U.hooks.contests.forEach(f=>f(p));
  p.append(E("div",{class:"card"},E("b",{style:{fontSize:"17px"}},"Invitations · year "+yr),E("div",{class:"mut"},"Each opens on its day and stays open until the year ends. Take whoever suits it, up to three. Nothing is lost by waiting.")));
  if(!s.order.length)p.append(E("p",{class:"mut",style:{marginTop:"10px"}},"Enroll a girl first."));
  inv.forEach(({c,key,done,res})=>{const field=H.field(s,c),card=E("div",{class:"card",style:{marginTop:"10px"}});
    card.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,c.name),E("span",{class:"chip"+(done?"":" hot")},done?"decided":"open")),E("div",{class:"mut"},c.text),
      E("div",{class:"chips",style:{margin:"4px 0"}},E("span",{class:"mut",style:{fontSize:"12px"}},"Rewards:"),...Object.entries(c.w).sort((a,b)=>b[1]-a[1]).map(([k,v])=>E("span",{class:"chip hot"},SNAME[k]+" "+Math.round(v*100)+"%")),E("span",{class:"chip"},"prize "+Math.round(c.prize*(1+.4*H.tier(s)))),E("span",{class:"chip"},"field about "+fmt(field))));
    if(done){card.append(...res.map(r=>E("div",{class:"row",style:{margin:"3px 0"}},A.spr(r.h,34),E("span",null,HN(r.h)+" placed "+r.rank+" · +"+r.prize+" coins"),E("button",{type:"button",class:"sm",onclick:()=>narrSheet(r.h,c.name,H.contestScene(r.h,c.id,r.rank,Math.floor(s.day/360)+1),"Rank "+r.rank)},"Read the scene"))))}
    else{const ranked=s.order.slice().sort((a,b)=>H.fit(s.girls[b],c)-H.fit(s.girls[a],c));if(!sel3.has(key))sel3.set(key,new Set(ranked.slice(0,3)));const pick=sel3.get(key);
      const list=E("div",{class:"chips",style:{margin:"6px 0"}},...ranked.slice(0,24).map(h=>E("button",{type:"button",class:"sm"+(pick.has(h)?" on":""),style:pick.has(h)?{background:"var(--g-gold)",color:"#241b06"}:null,onclick:()=>{pick.has(h)?pick.delete(h):(pick.size<3&&pick.add(h));A.repaint("contests")}},HN(h)+" "+fmt(H.fit(s.girls[h],c)))));
      card.append(list,E("button",{type:"button",class:"pri",disabled:!pick.size,onclick:()=>{const r=H.enterContest(s,c.id,[...pick]);if(!r.ok){A.say(r.msg);return}A.afterChange();resultSheet(r)}},"Enter "+pick.size+" "+(pick.size===1?"girl":"girls")))}
    p.append(card)});
  if(s.trophies.length)p.append(E("h3",null,"Trophy cabinet"),E("div",{class:"chips"},...s.trophies.slice(-30).reverse().map(t=>E("span",{class:"chip"+(t.rank<=3?" hot":"")},HN(t.h)+" · "+(H.CONTESTS.find(c=>c.id===t.c)||{}).name+" · "+["","gold","silver","bronze"][Math.min(t.rank,3)]))))}
function resultSheet(r){const {sh,close}=sheet(),yr=Math.floor(S().day/360)+1;sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("h2",{style:{margin:0}},r.c.name),E("button",{type:"button",class:"sm",onclick:close},"Close")));
  r.res.forEach(x=>{sh.append(E("div",{class:"card",style:{marginTop:"10px"}},E("div",{class:"row",style:{justifyContent:"space-between"}},E("div",{class:"row"},A.spr(x.h,44),E("div",null,E("b",{style:{fontSize:"17px"}},HN(x.h)),x.sig?E("div",{class:"mut",style:{fontSize:"12.5px"}},"Signature: "+x.sig):null)),
      E("div",{class:"chips"},E("span",{class:"chip"+(x.rank<=3?" hot":"")},x.rank===1?"Gold":x.rank===2?"Silver":x.rank===3?"Bronze":"Placed "+x.rank),E("span",{class:"chip hot up"},"+"+x.prize+" coins"))),
    E("div",{style:{lineHeight:"1.6",marginTop:"8px"}},...H.contestScene(x.h,r.c.id,x.rank,yr).map(t=>E("p",{style:{margin:"0 0 9px"}},t)))))});
  sh.append(E("div",{class:"row",style:{marginTop:"8px"}},E("button",{type:"button",class:"pri",onclick:close},"Continue")))}

/* ---------- Wardens, on the room rows ---------- */
U.hooks.roomRow.push((row,id,lv)=>{const s=S(),R=H.ROOMS[id];if(!lv||R.k==="sealed"||R.k==="dorm"||!s.order.length)return;const cur=s.wardens[id];
  row.append(E("div",{style:{gridColumn:"1 / -1",marginTop:"4px"}},E("button",{type:"button",class:"sm",onclick:()=>wardenSheet(id)},cur?"Warden: "+HN(cur)+" (+"+Math.round((H.roomMul(s,id)-1)*100)+"%)":"Name a warden ("+Object.keys(s.wardens).length+"/"+H.maxWardens(s)+" posts)")))});
function wardenSheet(id){const s=S(),{sh,close}=sheet();let q="";const list=E("div",{style:{maxHeight:"46vh",overflow:"auto",marginTop:"6px"}});
  const fill=()=>{list.textContent="";s.order.filter(h=>!q||HN(h).toLowerCase().includes(q)).sort((a,b)=>s.girls[b].tier-s.girls[a].tier||HN(a).localeCompare(HN(b))).slice(0,60).forEach(h=>{const w=H.wardenOf(s,h);list.append(E("div",{class:"row",style:{margin:"3px 0"}},A.spr(h,34),E("span",null,HN(h)+" · "+PT[s.girls[h].tier].name+(w?" · now at "+A.rn(w):"")),E("span",{class:"sp"}),E("button",{type:"button",class:"sm pri",onclick:()=>{const r=H.setWarden(s,id,h);if(!r.ok){A.say(r.msg);return}A.afterChange();close()}},"Appoint")))})};
  sh.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("h2",{style:{margin:0}},"Warden of "+A.rn(id)),E("button",{type:"button",class:"sm",onclick:close},"Close")),E("p",{class:"mut"},"A warden makes the room work better, more so as she ascends. "+Object.keys(s.wardens).length+" of "+H.maxWardens(s)+" posts are filled."),
    E("input",{type:"search",placeholder:"Find a girl",style:{width:"100%"},oninput:ev=>{q=ev.target.value.toLowerCase();fill()}}),list,s.wardens[id]?E("button",{type:"button",class:"sm",style:{marginTop:"8px"},onclick:()=>{H.setWarden(s,id,null);A.afterChange();close()}},"Release the current warden"):null);fill()}

/* ---------- Admissions: houses, scouting, the sealed wings ---------- */
U.hooks.admissions.push(p=>{injectCss();const s=S(),sb=H.setBonus(s),gc=H.groupCounts(s);
  p.append(E("h3",null,"Scouts"),E("div",{class:"card"},E("div",{class:"mut"},"Send a scout for a named girl or a whole house. It costs coins and a few days, and never fails. "+s.scouts.length+" of 2 scouts are out."),
    ...s.scouts.map(x=>E("div",{class:"row",style:{margin:"4px 0"}},A.spr(x.h,30),E("span",null,"Looking for "+(x.group?"someone in "+(grp(x.h).name||"a house"):HN(x.h))+" · "+x.left+" day"+(x.left===1?"":"s")+" left")))));
  const name=E("input",{type:"search",placeholder:"Scout a girl by name",style:{width:"100%",marginTop:"8px"},oninput:()=>fill()}),res=E("div",{style:{marginTop:"4px"}});
  function fill(){res.textContent="";const q=name.value.trim().toLowerCase();if(!q)return;ACAD.HOUSES.filter(h=>HN(h).toLowerCase().includes(q)&&!s.girls[h]).slice(0,6).forEach(h=>{const c=H.canScout(s,h);res.append(E("div",{class:"row",style:{margin:"3px 0"}},A.spr(h,30),E("span",null,HN(h)+" · "+grp(h).name),E("span",{class:"sp"}),E("button",{type:"button",class:"sm"+(c.ok?" pri":""),disabled:!c.ok,title:c.ok?"":c.msg,onclick:()=>{const r=H.scout(s,h);A.say(r.ok?"A scout sets out.":r.msg);A.afterChange()}},c.ok?"Scout · "+H.scoutCost(h):c.msg.slice(0,26))))})}
  p.append(name,res);
  p.append(E("div",{class:"chips",style:{marginTop:"6px"}},...allGroups().filter(([id])=>H.membersOf(id).some(h=>!H.locked(s,h))).map(([id,nm])=>E("button",{type:"button",class:"sm",title:"A scout looks for someone in "+nm+" · 150",onclick:()=>{const r=H.scoutGroup(s,id);A.say(r.ok?"A scout sets out.":r.msg);A.afterChange()}},nm))));
  p.append(E("h3",null,"Houses at the academy"),sb.list.length?E("div",{class:"chips"},...sb.list.map(x=>E("span",{class:"chip hot"},(allGroups().find(g=>g[0]===x.gid)||[0,x.gid])[1]+" "+x.n+" · set "+x.t))):E("div",{class:"mut"},"Enroll three girls of one house for a set bonus; five and eight add more."),E("div",{class:"mut",style:{marginTop:"4px"}},"Sets give +"+sb.coins+" coins and +"+r1(sb.renown)+" renown a day now."));
  p.append(E("h3",null,"The sealed wings"));
  Object.entries(H.WINGS).forEach(([f,w])=>{const st=s.gates[f],reqs=st<3?H.gateReqs(s,f,st+1):null;
    p.append(E("div",{class:"card wing",style:{marginTop:"8px"}},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,w.name),E("span",{class:"chip hot"},st+" of 3 doors")),E("div",{class:"mut"},w.tag),
      ...(reqs?[E("div",{style:{margin:"6px 0 2px"}},E("b",null,"To open door "+(st+1)+":")),...reqs.map(r=>E("div",{class:"req"},E("i",{class:r.ok?"up":"down"},r.ok?"✓":"○"),E("span",null,r.label+(r.have!=null&&!r.ok?" ("+r.have+" of "+r.need+")":""))))]:[E("div",{class:"mut"},"Every door is open.")]),
      E("div",{class:"row",style:{marginTop:"6px"}},...H.membersOf(w.groups[0]).slice(0,5).map(h=>E("span",{style:{opacity:H.locked(s,h)?1:.9}},E("img",{class:"cp",src:"assets/sprites/"+h+".128.webp",width:34,height:34,style:H.locked(s,h)?{filter:"brightness(0) opacity(.5)"}:null,alt:""}))))))});
  const projs=Object.entries(H.PROJECTS).map(([id,P])=>{const st=H.projectStep(s,id),step=P.steps[st],why=step?P.need(s):null;return {id,P,st,step,why}});
  p.append(E("h3",null,"Projects"),...projs.map(({id,P,st,step,why})=>E("div",{class:"card",style:{marginTop:"6px"}},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,P.name),E("span",{class:"chip"},st+" of "+P.steps.length)),
    step?E("div",{class:"row",style:{marginTop:"4px"}},E("button",{type:"button",class:"sm"+(!why&&s.funds>=step.funds&&s.insight>=step.insight?" pri":""),disabled:!!why||s.funds<step.funds||s.insight<step.insight,title:why||"",onclick:()=>{const r=H.doProject(s,id);A.say(r.ok?"Done.":r.msg);A.afterChange()}},"Fund step "+(st+1)+" · "+step.funds+" coins"+(step.insight?" + "+step.insight+" insight":"")),why?E("span",{class:"mut"},why):null):E("div",{class:"mut"},"Finished."))))});

/* ---------- Students: a way into each girl's page ---------- */
U.hooks.studentRow.push((row,h)=>{const g=S().girls[h];row.style.borderLeft="4px solid "+PT[g.tier].col;row.lastChild.append(E("div",{class:"row",style:{marginTop:"6px"}},E("span",{class:"chip",style:{borderColor:PT[g.tier].col}},PT[g.tier].name),E("button",{type:"button",class:"sm"+(H.readyToAscend(S(),h)?" pri":""),onclick:()=>openGirl(h)},H.readyToAscend(S(),h)?"Ready to ascend":"Her page")))});

U.openGirl=openGirl;
U.playMoment=(h,id)=>momentSheet(h,id,()=>{});
U.addTab("collection","Collection",collection,()=>{const s=S();return Math.floor(s.day/4)+"|"+s.order.length+"|"+s.short.join(",")+"|"+s.alumnae.length},null,"students");
U.addTab("contests","Contests",contests,()=>{const s=S();return H.invitations(s).map(x=>x.key+x.done).join(",")+"|"+s.order.length+"|"+H.tier(s)},()=>{const s=S();return s?H.invitations(s).filter(x=>!x.done).length||0:0},"collection");
})();
