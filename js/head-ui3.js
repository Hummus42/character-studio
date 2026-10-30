/* Everspire: the Headmaster, screens for the inbox, the Grand League, Eras and titles, and a getting-started card. Plugs into head-ui.js. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.ui||!ACAD.head.TITLES||!ENC.E)return;
const H=ACAD.head,U=H.ui,A=U.api,E=ENC.E,HN=ENC.HN,S=()=>A.S(),root=()=>A.root(),fmt=n=>Math.round(n);
function sheet(){const ov=E("div",{class:"overlay",onclick:ev=>{if(ev.target===ov)ov.remove()}}),sh=E("div",{class:"sheet"});ov.append(sh);root().append(ov);return {ov,sh,close:()=>ov.remove()}}
const faces=(hs)=>E("div",{class:"row",style:{margin:"4px 0"}},...hs.filter(Boolean).map(h=>A.spr(h,36)));

/* ---------- Inbox ---------- */
function inbox(p){const s=S(),open=H.inboxOpen(s),done=(s.inbox||[]).filter(n=>n.done).slice(-6).reverse();
  p.append(E("div",{class:"card"},E("b",{style:{fontSize:"17px"}},"Your desk"),E("div",{class:"mut"},"Small matters from around the academy. None of them can go wrong in a way that costs you a girl, and none of them expire.")));
  if(!open.length)p.append(E("p",{class:"mut",style:{marginTop:"10px"}},"Nothing needs you at the moment. Something usually turns up within a few days."));
  open.slice().reverse().forEach(n=>{const choices=H.noticeChoices(n);
    p.append(E("div",{class:"card",style:{marginTop:"10px"}},faces([n.h,n.h2]),E("div",{style:{lineHeight:"1.55"}},...H.noticeText(s,n).split("\n\n").map(t=>E("p",{style:{margin:"0 0 8px"}},t))),
      E("div",{class:"row",style:{marginTop:"8px"}},...choices.map((c,i)=>E("button",{type:"button",class:i===0?"pri":"",disabled:!!c.cost&&s.funds<c.cost,title:c.cost&&s.funds<c.cost?"Needs "+c.cost+" coins":"",onclick:()=>{const r=H.resolveNotice(s,n.id,i);if(!r.ok){A.say(r.msg);return}A.say(r.text);A.refreshTop();A.afterChange()}},c.label)))))});
  if(done.length)p.append(E("h3",null,"Recently handled"),...done.map(n=>E("div",{class:"hlog"},E("small",null,"Day "+n.day),H.noticeText(s,n).slice(0,90)+"… "+n.result)))}

/* ---------- Legacy: Eras, Seals and titles ---------- */
let eraPick=null;
function legacy(p){const s=S(),can=H.canEra(s),gain=H.eraGain(s),done=H.titlesDone(s).length;
  p.append(E("div",{class:"card"},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",{style:{fontSize:"17px"}},"Legacy"),E("span",{class:"chip hot"},"Seals "+H.seals(s))),
    E("div",{class:"mut"},"Era "+((s.era||0)+1)+(s.flags.eraMod?" · "+H.MODS[s.flags.eraMod].name:"")+" · each Seal adds 1% to coins and to how fast girls grow, for good."),E("div",{class:"mut"},done+" of "+H.TITLES.length+" titles earned; each gives a Seal.")));
  p.append(E("h3",null,"Found a new era"),E("div",{class:"card"},E("div",{class:"mut"},"An era is a fresh start for the buildings, never for the girls. Every girl keeps her tier, affection, scrapbook and trophies. Rooms are rebuilt from the start (and cheaper each time), renown becomes Seals, and you pick the character of the new age. It is entirely optional."),
    can.ok?E("div",{style:{marginTop:"8px"}},E("div",null,"Founding now would bring "+gain+" Seals."),E("div",{class:"row",style:{marginTop:"6px"}},...Object.entries(H.MODS).map(([k,m])=>E("button",{type:"button",class:"sm"+(eraPick===k?" pri":""),title:m.text,onclick:()=>{eraPick=k;A.repaint("legacy")}},m.name))),
      eraPick?E("div",{class:"bubble"},H.MODS[eraPick].text):null,
      eraPick?E("div",{class:"row",style:{marginTop:"6px"}},E("button",{type:"button",class:"pri",onclick:()=>{const md=eraPick,r=H.era(s,md);if(!r.ok){A.say(r.msg);return}eraPick=null;A.say("A new era begins.");A.afterChange();A.repaint("legacy");if(U.textSheet)U.textSheet("A new era",H.MODS[md].name+" · +"+r.gain+" Seals",H.eraScene(md))}},"Begin the new era"),E("span",{class:"mut"},"Your rooms will be rebuilt from the start.")):null):
      E("div",{class:"mut",style:{marginTop:"6px"}},can.msg+" ("+fmt(s.renown)+" of 1500 renown)")));
  p.append(E("h3",null,"Titles"),E("div",{class:"grid",style:{gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))"}},...H.TITLES.map(t=>{const have=Math.min(t.need,t.have(s)),got=(s.titles||[]).includes(t.id);
    return E("div",{class:"card",style:got?{borderColor:"var(--g-gold)"}:null},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,t.name),E("span",{class:"chip"+(got?" hot":"")},got?"earned":have+" / "+t.need)),E("div",{class:"mut",style:{fontSize:"13px"}},t.text),E("div",{class:"bar",style:{marginTop:"6px"}},E("i",{style:{width:have/t.need*100+"%"}})))})))}

/* ---------- the Grand League, on the Contests tab ---------- */
U.hooks.contests.push(p=>{const s=S(),lg=s.league||{div:1,history:[]},tbl=H.leagueTable(s),mine=H.leagueMine(s),open=H.leagueOpen(s),doneYr=lg.last===H.leagueKey(s),team=H.leagueTeam(s);
  p.append(E("div",{class:"card",style:{marginTop:"10px",borderLeft:"3px solid var(--g-gold)"}},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",{style:{fontSize:"17px"}},"The Grand League · division "+lg.div),E("span",{class:"chip"+(open&&!doneYr?" hot":"")},doneYr?"this year's final is done":open?"the final is open":"final opens late in the year")),
    E("div",{class:"mut"},"Eight rival academies, one table. Your team is your six strongest girls. Finish in the top three to move up a division."),
    E("div",{style:{margin:"6px 0"}},...tbl.map((r,i)=>E("div",{class:"row",style:{justifyContent:"space-between",fontSize:"13.5px"}},E("span",null,r.name+" · "+r.tag),E("span",{class:"mut"},"strength "+fmt(r.str))))),
    E("div",{class:"row",style:{justifyContent:"space-between"}},E("span",null,"Your team: "+(team.length?team.map(HN).join(", "):"no girls yet")),E("span",{class:"chip hot"},"strength "+fmt(mine))),
    E("div",{class:"row",style:{marginTop:"8px"}},E("button",{type:"button",class:"pri",disabled:!open||doneYr||team.length<3,onclick:()=>{const r=H.playLeague(s);if(!r.ok){A.say(r.msg);return}A.refreshTop();A.afterChange();leagueSheet(r)}},"Play the final"),
      lg.history.length?E("span",{class:"mut"},"Past: "+lg.history.slice(-6).map(x=>"y"+x.year+" #"+x.rank).join(" · ")):null)))});
function leagueSheet(r){const {sh,close}=sheet();sh.append(E("h2",null,"Grand League final"),E("p",null,"Your team finished "+r.rank+" of 9"+(r.moved>0?", and moves up to division "+r.div+".":r.moved<0?", and drops to division "+r.div+".":".")),faces(r.team),E("div",{style:{lineHeight:"1.6"}},...H.leagueScene(S(),r).map(t=>E("p",{style:{margin:"0 0 9px"}},t))),
  E("div",{class:"chips"},E("span",{class:"chip hot up"},"+"+r.prize+" coins"),r.ren?E("span",{class:"chip hot up"},"+"+Math.round(r.ren)+" renown"):null),E("div",{class:"row",style:{marginTop:"12px"}},E("button",{type:"button",class:"pri",onclick:close},"Continue")))}

/* ---------- getting started ---------- */
U.hooks.academyTop.push(p=>{const s=S();if(s.flags.tutDone||s.day>400)return;
  const steps=[["Welcome two girls from Admissions",s.order.length>=2],["Restore or improve a room below",s.stats.spent>0],["Spend time with a girl from her page in the Collection",s.order.some(h=>s.girls[h].aff>0)],["Name a Muse, the girl you want to raise",s.muses.length>0],["Enter a contest from the Contests tab",s.trophies.length>0]];
  p.append(E("div",{class:"card",style:{marginBottom:"10px",borderLeft:"3px solid var(--g-gold)"}},E("div",{class:"row",style:{justifyContent:"space-between"}},E("b",null,"Getting started"),E("button",{type:"button",class:"sm",onclick:()=>{s.flags.tutDone=1;A.repaint("academy")}},"Hide")),
    E("div",{class:"mut"},"There is no hurry. Time only runs while this screen is open, and you can pause it whenever you like."),...steps.map(([t,ok])=>E("div",{class:"req"},E("i",{class:ok?"up":"down"},ok?"✓":"○"),E("span",null,t)))))});

/* ---------- soft sounds, off until you switch them on ---------- */
const SFX={on:false,ctx:null};try{SFX.on=localStorage.getItem("everspire.sfx")==="1"}catch(e){}
const NOTES={coin:[[880,.07],[1320,.12]],chime:[[660,.1],[880,.1],[1100,.1],[1320,.2]],fanfare:[[523,.12],[659,.12],[784,.12],[1046,.34]],soft:[[520,.09],[390,.14]],heart:[[587,.12],[740,.12],[880,.26]]};
SFX.play=n=>{if(!SFX.on)return;try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return;SFX.ctx=SFX.ctx||new C();if(SFX.ctx.state==="suspended")SFX.ctx.resume();let t=SFX.ctx.currentTime+.01;(NOTES[n]||[]).forEach(([f,d])=>{const o=SFX.ctx.createOscillator(),g=SFX.ctx.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.06,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(SFX.ctx.destination);o.start(t);o.stop(t+d+.02);t+=d*.9})}catch(e){}};
ACAD.sfx=SFX;
U.sfxButton=()=>{const b=E("button",{type:"button",class:"sm",title:"Soft sounds for building, contests and ascensions",onclick:()=>{SFX.on=!SFX.on;try{localStorage.setItem("everspire.sfx",SFX.on?"1":"0")}catch(e){}b.textContent=SFX.on?"♪ on":"♪ off";SFX.play("chime")}},SFX.on?"♪ on":"♪ off");return b};
const wrap=(name,pick)=>{const f=H[name];if(!f)return;H[name]=function(){const r=f.apply(this,arguments);try{if(r&&r.ok!==false){const n=pick(r);if(n)SFX.play(n)}}catch(e){}return r}};
wrap("build",()=>"coin");wrap("gild",()=>"coin");wrap("enroll",()=>"soft");wrap("ascend",()=>"fanfare");wrap("playMoment",r=>r.first?"heart":null);wrap("era",()=>"fanfare");wrap("playLeague",r=>r.rank<=3?"fanfare":"soft");
wrap("enterContest",r=>(r.res||[]).some(x=>x.rank===1)?"fanfare":"soft");wrap("gift",r=>r.lk>=2?"heart":"soft");wrap("audience",r=>r.up?"heart":null);
U.addTab("inbox","Desk",inbox,()=>{const s=S();return H.inboxOpen(s).map(n=>n.id).join(",")+"|"+Math.floor(s.funds/50)},()=>{const s=S();return s?H.inboxOpen(s).length||0:0},"contests");
U.addTab("legacy","Legacy",legacy,()=>{const s=S();return (s.titles||[]).length+"|"+(s.era||0)+"|"+(eraPick||"")+"|"+(H.canEra(s).ok?1:0)},null,"inbox");
})();
