/* Everspire: the Headmaster, romance rules (no DOM). Gifts matched to what each girl likes, the six moments (the pre-built scenes) as open invitations that
   follow affection, the Headmaster's Wing that opens the later ones, and the court's Harmony. Nothing here can be lost or fail. Extends ACAD.head. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.PT)return;
const H=ACAD.head,G=ACAD.game,HN=ENC.HN,hash=H.hash,r1=v=>Math.round(v*10)/10;

/* ---------- the six moments ---------- */
H.MOMENTS=[
 {id:"romance-1",name:"First letter",stage:2,wing:0},{id:"romance-2",name:"Golden hour",stage:3,wing:0},{id:"romance-3",name:"Rainy tea",stage:4,wing:0},
 {id:"romance-4",name:"Under the moon",stage:5,wing:1},{id:"romance-5",name:"Close",stage:6,wing:2},{id:"romance-6",name:"Morning",stage:6,wing:3,aff:600}];
H.moments=(s,h)=>{const g=s.girls[h];if(!g)return [];const st=H.affStage(g.aff),wing=H.lvlOf(s,"headmaster"),seen=(s.gallery[h]||{});
  return H.MOMENTS.map(m=>{const seenIt=!!seen[m.id],need=[];if(st<m.stage)need.push("Affection: "+G.STAGELABEL[m.stage]);if(wing<m.wing)need.push("The Headmaster's study at level "+m.wing+" (your wing)");if(m.aff&&g.aff<m.aff)need.push("A little longer together");
    return {id:m.id,name:m.name,seen:seenIt,ready:!seenIt&&!need.length,need}})};
H.readyMoments=(s,h)=>H.moments(s,h).filter(m=>m.ready);
H.playMoment=(s,h,id)=>{const m=H.moments(s,h).find(x=>x.id===id);if(!m)return {ok:false,msg:"She is not enrolled."};if(!m.ready&&!m.seen)return {ok:false,msg:m.need.join("; ")};
  const g=s.girls[h];if(!m.seen){(s.gallery[h]=s.gallery[h]||{})[id]=true;g.ess+=2;g.mood=Math.min(100,g.mood+8);s.renown+=.5;H.note(s,"A moment with "+HN(h)+": "+m.name+".")}
  const sc=H.MOMENT_SCENE&&H.MOMENT_SCENE[id];return {ok:true,id,name:m.name,text:G.moment?G.moment(h,id):"",paras:sc&&H.sceneText?H.sceneText(h,sc):null,first:!m.seen}};
H.MOMENT_SCENE={"romance-1":"t25","romance-2":"t26","romance-3":"t04","romance-4":"t07","romance-5":"t17","romance-6":"t20"};

/* ---------- gifts ---------- */
H.GIFTS=G.ITEMS;
H.giftLike=(h,item)=>G.liking(h,item);
H.gift=(s,h,itemId)=>{const g=s.girls[h],item=(G.ITEMS||[]).find(x=>x.id===itemId);if(!g)return {ok:false,msg:"She is not enrolled."};if(!item)return {ok:false,msg:"No such gift."};
  if(g.lastGift===s.day)return {ok:false,msg:HN(h)+" has had a gift today."};if(s.funds<item.price)return {ok:false,msg:"Needs "+item.price+" coins."};
  const lk=G.liking(h,item),k=(H.isMuse(s,h)?1.5:1)*(g.vow==="court"?2:1),gain=lk>=2?6:lk===1?3:lk===0?1.2:-1;s.funds-=item.price;s.stats.spent+=item.price;g.lastGift=s.day;g.aff=Math.max(0,Math.min(H.AFF[H.AFF.length-1]+40,g.aff+gain*(gain>0?k:1)));
  if(lk>=1)g.mood=Math.min(100,g.mood+5);g.ess+=lk>=2?1*k:.3;(g.known=g.known||{})[itemId]=lk;const n=HN(h),before=H.affStage(g.aff-gain);
  const text=lk>=2?item.name+"! How did you know? "+n+" holds it all evening.":lk===1?n+" smiles. \""+item.name+". That's thoughtful.\"":lk===0?n+" thanks you politely and finds a place for it.":n+" takes it kindly, though it is plainly not her taste.";
  if(H.affStage(g.aff)>before){H.note(s,"You and "+n+" grow closer: "+G.STAGELABEL[H.affStage(g.aff)]+".");H.bond&&H.bond(s,h,H.affStage(g.aff))}
  return {ok:true,text,lk,gain}};

/* ---------- the court and its Harmony ---------- */
H.court=s=>s.order.filter(h=>H.affStage(s.girls[h].aff)>=5);
H.harmony=s=>{const court=H.court(s),pairs=[];let v=60+4*Math.max(0,H.lvlOf(s,"headmaster")-1)+(H.projectStep(s,"ball")>=1?8:0)+((s.flags.tidyUntil||0)>s.day?10:0);
  for(let i=0;i<court.length;i++){const t=G.ties(court[i]);for(let j=i+1;j<court.length;j++){const b=court[j];
    if(t.friends.includes(b)||t.family.includes(b)){v+=4;pairs.push({a:court[i],b,k:"friends"})}else if(t.rivals.some(r=>r[0]===b)){v-=7;pairs.push({a:court[i],b,k:"rivals"})}else if(t.couple===b){v+=2;pairs.push({a:court[i],b,k:"close"})}}}
  v-=Math.max(0,court.length-3)*1.5;return {v:Math.max(0,Math.min(100,Math.round(v))),pairs,n:court.length}};
H.tidy=s=>{if(s.funds<200)return {ok:false,msg:"Needs 200 coins."};if((s.flags.tidyUntil||0)>s.day)return {ok:false,msg:"Seating is already arranged."};s.funds-=200;s.stats.spent+=200;s.flags.tidyUntil=s.day+60;H.note(s,"You rearrange the seating and the quarters. The court is calmer for it.");return {ok:true}};

/* the court's mood follows its Harmony; low Harmony only ever sulks, never costs a girl */
H.dayHooks.push(s=>{const court=H.court(s);if(!court.length)return 0;const hm=H.harmony(s);let coins=0;
  court.forEach(h=>{const g=s.girls[h];if(hm.v>=70){g.mood=Math.min(100,g.mood+.3)}else if(hm.v<40){g.mood=Math.max(30,g.mood-.4)}});
  if(hm.v>=70){coins+=court.length*2;s.renown+=.05*court.length}return coins});

/* the Starless Court's second door asks for a real court rather than a stand-in */
const oldGate=H.gateReqs;
H.gateReqs=(s,f,stage)=>{const r=oldGate(s,f,stage);if(!r||f!=="starless"||stage!==2)return r;
  return r.map(x=>/good spirits/.test(x.label)?{label:"A court at Harmony 60% (two girls courting)",ok:H.court(s).length>=2&&H.harmony(s).v>=60,have:H.court(s).length+" courting",need:"2 and Harmony 60"}:x)};
})();
