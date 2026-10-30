/* Everspire: the Headmaster, part two of the rules (no DOM). Prestige tiers (Common to Mythic), essence and affection, trials and ascension, Muses, Wardens,
   scouting, group sets, contests as open invitations, alumnae, and the two sealed wings (the Lattice and the Starless Court). Extends ACAD.head. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head)return;
const H=ACAD.head,G=ACAD.game,HN=ENC.HN,SID=G.SID,SNAME=G.SNAME,hash=H.hash,r1=v=>Math.round(v*10)/10;
const bio=h=>(typeof BIOS==="object"&&BIOS[h])||{},lc=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toLowerCase()+t.slice(1):""};
const grpOf=h=>(ACAD.GROUP_OF(h)||{}).id;

/* ---------- prestige ---------- */
const PT=[
 {id:"common",name:"Common",col:"#8b8ba2",col2:"#5a5a72",cap:40,mul:1},
 {id:"uncommon",name:"Uncommon",col:"#6fcf8e",col2:"#2f8a52",cap:55,mul:1.15,need:{lvl:15,ess:25,aff:1}},
 {id:"rare",name:"Rare",col:"#5aa9f0",col2:"#2a68b8",cap:70,mul:1.35,need:{lvl:22,ess:100,aff:2,trial:1}},
 {id:"legendary",name:"Legendary",col:"#e8b64a",col2:"#a8741a",cap:90,mul:1.7,need:{lvl:32,ess:350,aff:3,trial:1}},
 {id:"mythic",name:"Mythic",col:"#e86bd8",col2:"#6bd8e8",cap:110,mul:2.2,need:{lvl:44,ess:800,aff:4,trial:1}}];
const AFF=[0,30,90,180,300,450,660],affStage=a=>{let k=0;AFF.forEach((v,i)=>{if(a>=v)k=i});return k};
const VOWS={contest:{name:"Vow of Victory",text:"+10% in every contest she enters."},room:{name:"Vow of Service",text:"A Warden post held by her is half again as strong."},court:{name:"Vow of Devotion",text:"Time with her grows affection and essence twice as fast."}};
H.PT=PT;H.AFF=AFF;H.affStage=affStage;H.VOWS=VOWS;
H.capOf=g=>PT[g.tier||0].cap;H.tierMul=g=>PT[g.tier||0].mul;

/* ---------- Muses ---------- */
H.isMuse=(s,h)=>s.muses.includes(h);
H.setMuse=(s,h)=>{if(s.muses.includes(h)){s.muses=s.muses.filter(x=>x!==h);return false}if(s.muses.length>=2)s.muses.shift();s.muses.push(h);return true};

/* ---------- time with a girl ---------- */
H.audience=(s,h)=>{const g=s.girls[h];if(!g)return {ok:false,msg:"She is not enrolled."};if(g.lastAud===s.day)return {ok:false,msg:HN(h)+" has had your time today. Come back tomorrow."};
  g.lastAud=s.day;const k=(H.isMuse(s,h)?1.5:1)*(g.vow==="court"?2:1),before=affStage(g.aff);g.aff=Math.min(H.AFF[H.AFF.length-1]+40,g.aff+2*k);g.mood=Math.min(100,g.mood+4);g.ess+=.35*k;
  const b=bio(h),n=HN(h),pick=a=>a[Math.floor(hash(h+s.day+"aud")*a.length)],dr=lc((b.dreams||"").split(";")[0]),dk=lc(b.favDrink),hb=lc((b.hobbies||"").split(",")[0]),ct=String(b.catchphrase||"").replace(/["“”]/g,"");
  const lines=[dk?`You share ${dk} in your study. ${n} talks until the cup is cold.`:null,dr?`${n} tells you what she hopes for: ${dr}. You listen properly.`:null,hb?`She shows you something she has been working on in her free hours: ${hb}.`:null,ct?`She says, "${ct}", and you both laugh.`:null,`${n} drops by your study with no reason at all, and stays an hour.`].filter(Boolean);
  const up=affStage(g.aff)>before;if(up){H.note(s,"You and "+n+" grow closer: "+G.STAGELABEL[affStage(g.aff)]+".");H.bond&&H.bond(s,h,affStage(g.aff))}
  const stg=affStage(g.aff),text=(stg>=4&&H.vignette&&hash(h+s.day+"vgp")<.7)?H.vignette(s,h):pick(lines);return {ok:true,text,up,stage:stg}};

/* ---------- trials and ascension ---------- */
const TRIAL_LABEL={grace:"Meet it with poise.",wit:"Think it through.",heart:"Open up about it.",vigor:"Push through it.",craft:"Make something of it.",nerve:"Face it head-on."};
H.trialNeed=ti=>14+10*ti;
H.trialFor=(s,h,ti)=>{const b=bio(h),n=HN(h),topic=ti===2?lc((b.fears||"").split(";")[0]):lc((b.dreams||"").split(";")[0]),a=G.aptitude(h),by=SID.slice().sort((x,y)=>a[y]-a[x]);
  const pickSt=[by[0],by[2],by[5]].sort((x,y)=>hash(h+x+ti)-hash(h+y+ti));
  return {title:ti===2?"Her trial: what holds her back":ti===3?"Her trial: what she wants":"Her trial: the last step",text:n+" has been carrying something: "+(topic||"a worry she does not name")+". What do you ask of her?",choices:pickSt.map(st=>({st,label:TRIAL_LABEL[st]})),need:H.trialNeed(ti)}};
H.attemptTrial=(s,h,ti,st)=>{const g=s.girls[h];if(!g)return {ok:false,msg:"She is not enrolled."};const need=H.trialNeed(ti);
  if(g.stats[st]<need)return {ok:false,msg:HN(h)+" is not ready for that yet: it needs "+SNAME[st]+" "+need+" and she has "+Math.floor(g.stats[st])+". Try another way, or train first."};
  g.trial[ti]=true;g.ess+=3;H.note(s,HN(h)+" passes her trial.");return {ok:true,text:HN(h)+" does it, and something in her settles. She is ready."}};
H.ascendReqs=(s,h)=>{const g=s.girls[h];if(!g)return null;const ti=g.tier+1;if(ti>=PT.length)return null;const n=PT[ti].need,ess=Math.round(n.ess*(s.ascended>0?.8:1)),L=H.levelOf(g);
  const reqs=[{k:"lvl",label:"Level "+n.lvl,ok:L>=n.lvl,have:L,need:n.lvl},{k:"aff",label:"Affection: "+G.STAGELABEL[n.aff],ok:affStage(g.aff)>=n.aff,have:affStage(g.aff),need:n.aff},{k:"ess",label:"Essence "+ess,ok:g.ess>=ess,have:Math.floor(g.ess),need:ess}];
  if(n.trial)reqs.push({k:"trial",label:"Her trial",ok:!!g.trial[ti]});
  return {ti,tier:PT[ti],reqs,ess,ok:reqs.every(x=>x.ok)}};
H.ascend=(s,h,vow)=>{const q=H.ascendReqs(s,h);if(!q)return {ok:false,msg:"She has reached the summit."};if(!q.ok)return {ok:false,msg:"Not ready yet."};const g=s.girls[h];
  if(q.ti===4&&!VOWS[vow])return {ok:false,msg:"Choose her vow."};g.ess-=q.ess;g.tier=q.ti;s.ascended++;s.renown+=3*q.ti;if(q.ti===4)g.vow=vow;
  H.note(s,HN(h)+" ascends to "+q.tier.name+(q.ti===4?" and takes the "+VOWS[vow].name:"")+".");return {ok:true,tier:q.tier}};
H.readyToAscend=(s,h)=>{const q=H.ascendReqs(s,h);return !!q&&q.ok};

/* ---------- Wardens: a girl who runs a room ---------- */
H.maxWardens=s=>1+H.tier(s);
H.setWarden=(s,id,h)=>{if(!h){delete s.wardens[id];return {ok:true}}
  if(!s.girls[h])return {ok:false,msg:"She is not enrolled."};const R=H.ROOMS[id];if(!R||R.k==="sealed"||R.k==="dorm"||H.lvlOf(s,id)<1)return {ok:false,msg:"Restore the room first, and it must be one that can have a warden."};
  Object.keys(s.wardens).forEach(r=>{if(s.wardens[r]===h)delete s.wardens[r]});
  if(!s.wardens[id]&&Object.keys(s.wardens).length>=H.maxWardens(s))return {ok:false,msg:"All "+H.maxWardens(s)+" warden posts are filled. More open as renown grows."};
  s.wardens[id]=h;return {ok:true}};
H.MAXGILD=5;
H.gildCost=(id,gd)=>Math.round(H.roomCost(id,4)*1.5*Math.pow(1.9,gd)/50)*50;
H.canGild=(s,id)=>{const R=H.ROOMS[id];if(!R||R.k==="sealed")return {ok:false,msg:"Sealed."};if(H.lvlOf(s,id)<H.MAXLV)return {ok:false,msg:"Restore it fully first."};const gd=H.gildOf(s,id);if(gd>=H.MAXGILD)return {ok:false,msg:"Fully gilded."};const c=H.gildCost(id,gd);if(s.funds<c)return {ok:false,msg:"Needs "+c+" coins.",cost:c};return {ok:true,cost:c}};
H.gild=(s,id)=>{const c=H.canGild(s,id);if(!c.ok)return c;s.funds-=c.cost;s.stats.spent+=c.cost;s.rooms[id].gild=H.gildOf(s,id)+1;s.renown+=2;H.note(s,"Gilded "+(ACAD.livemap.roomName?ACAD.livemap.roomName(id):id)+" ("+s.rooms[id].gild+" of "+H.MAXGILD+").");return {ok:true,cost:c.cost,gild:s.rooms[id].gild}};
H.roomMul=(s,id)=>{const gm=1+.2*H.gildOf(s,id),h=s.wardens&&s.wardens[id];if(!h||!s.girls[h])return gm;const g=s.girls[h],R=H.ROOMS[id];return gm*(1+(.12+.05*(g.tier||0)+(R&&R.stat?.1*(G.aptitude(h)[R.stat]-1):0))*(g.vow==="room"?1.5:1))};
H.wardenOf=(s,h)=>Object.keys(s.wardens).find(r=>s.wardens[r]===h)||null;

/* ---------- scouting ---------- */
const members=gid=>ACAD.HOUSES.filter(h=>grpOf(h)===gid).sort((a,b)=>hash(a+"|g")-hash(b+"|g"));
H.membersOf=members;
H.scoutCost=h=>80+60*H.rarityOf(h);H.scoutDays=h=>4+2*H.rarityOf(h);
H.canScout=(s,h)=>{if(s.girls[h])return {ok:false,msg:"She is already here."};if(H.locked(s,h))return {ok:false,msg:"Her wing is still sealed."};if(s.short.includes(h))return {ok:false,msg:"She is already at the door."};
  if(s.scouts.some(x=>x.h===h))return {ok:false,msg:"A scout is already looking for her."};if(s.scouts.length>=2)return {ok:false,msg:"Both scouts are out."};const c=H.scoutCost(h);if(s.funds<c)return {ok:false,msg:"Needs "+c+" coins.",cost:c};return {ok:true,cost:c}};
H.scout=(s,h)=>{const c=H.canScout(s,h);if(!c.ok)return c;s.funds-=c.cost;s.stats.spent+=c.cost;s.scouts.push({h,left:H.scoutDays(h)});H.note(s,"A scout leaves to find "+HN(h)+".");return {ok:true,cost:c.cost}};
H.scoutGroup=(s,gid)=>{const cand=members(gid).filter(h=>!s.girls[h]&&!H.locked(s,h)&&!s.short.includes(h)&&!s.scouts.some(x=>x.h===h)&&!s.alumnae.some(a=>a.h===h));if(!cand.length)return {ok:false,msg:"Nobody left to find there."};
  if(s.scouts.length>=2)return {ok:false,msg:"Both scouts are out."};if(s.funds<150)return {ok:false,msg:"Needs 150 coins.",cost:150};const h=cand[Math.floor(hash(gid+s.day)*cand.length)];s.funds-=150;s.stats.spent+=150;s.scouts.push({h,left:6,group:gid});H.note(s,"A scout leaves to look in "+((ACAD.GROUP_OF(h)||{}).name||"the group")+".");return {ok:true,cost:150}};

/* ---------- group sets ---------- */
H.groupCounts=s=>{const c={};s.order.forEach(h=>{const g=grpOf(h);if(g)c[g]=(c[g]||0)+1});return c};
H.setBonus=s=>{const out={coins:0,renown:0,list:[]};Object.entries(H.groupCounts(s)).forEach(([gid,n])=>{const t=n>=8?3:n>=5?2:n>=3?1:0;if(!t)return;out.coins+=[0,4,8,16][t];out.renown+=[0,0,.2,.5][t];out.list.push({gid,n,t})});return out};

/* ---------- contests: open invitations, never a deadline ---------- */
H.CONTESTS=G.CONTESTS.filter(c=>c.kind!=="festival");
H.contestDay=c=>(c.week-1)*10;
H.invitations=s=>{const year=Math.floor(s.day/360),doy=s.day%360;return H.CONTESTS.filter(c=>doy>=H.contestDay(c)).map(c=>{const key=c.id+":"+year,rec=s.invites[key];return {c,year,key,done:!!(rec&&rec.done),res:rec&&rec.res}})};
H.fit=(g,c)=>Object.entries(c.w||{}).reduce((t,[st,w])=>t+w*g.stats[st],0)*(.84+(g.mood-50)/330)*(g.vow==="contest"?1.1:1)*(1+.04*(g.tier||0));
H.field=(s,c)=>{const y=s.day/360;return Math.min(92,12+9*y+2.2*y*y)*(1+.03*H.tier(s))*(c.big?1.12:1)*(H.eraMod?H.eraMod(s).field:1)};
const RANKMULT=[1,.6,.4,.15],ESS=[10,6,4,1],REN=[6,4,3,1];
H.enterContest=(s,id,hs)=>{const inv=H.invitations(s).find(x=>x.c.id===id);if(!inv)return {ok:false,msg:"Not yet open this year."};if(inv.done)return {ok:false,msg:"Already decided this year."};
  hs=(hs||[]).filter(h=>s.girls[h]);if(!hs.length)return {ok:false,msg:"Choose at least one girl."};if(hs.length>3)return {ok:false,msg:"At most three girls."};
  const c=inv.c,npc=Array.from({length:11},(_,i)=>H.field(s,c)*(.75+.5*hash(inv.key+"|"+i))),prizeBase=c.prize*(1+.4*H.tier(s))*(H.eraMod?H.eraMod(s).prize:1),res=[];
  hs.forEach(h=>{const g=s.girls[h],score=H.fit(g,c)*(.9+.2*hash(h+inv.key)),rank=1+npc.filter(x=>x>score).length,pi=Math.min(rank-1,3),prize=Math.round(prizeBase*RANKMULT[pi]),scene=rank<=3?c.id+"-win":c.id+"-lose";
    g.ess+=ESS[pi]*(c.big?2:1);s.funds+=prize;s.stats.earned+=prize;s.renown+=REN[pi]*(c.big?2:1);(s.gallery[h]=s.gallery[h]||{})[scene]=true;
    s.trophies.push({c:c.id,year:inv.year,h,rank,score:Math.round(score),day:s.day});const top=Object.entries(c.w).sort((a,b)=>b[1]-a[1])[0][0];res.push({h,rank,prize,scene,score:Math.round(score),sig:G.signature?G.signature(h,top).name:null})});
  s.invites[inv.key]={done:true,res};H.note(s,c.name+": "+res.map(r=>HN(r.h)+" placed "+r.rank).join(", ")+".");return {ok:true,res,c}};
H.podium=(s,cid)=>s.trophies.some(t=>t.c===cid&&t.rank<=3);

/* ---------- graduates become alumnae ---------- */
H.ALUM_YEARS=6;
H.alumIncome=s=>s.alumnae.reduce((t,a)=>t+3+2*a.tier,0);

/* ---------- the sealed wings ---------- */
H.PROJECTS={well:{name:"Repair the old well",steps:[{funds:400,insight:60},{funds:700,insight:100},{funds:1100,insight:150}],need:s=>s.gates.lattice>=1?null:"Open the Lattice's first stage first."},
  ball:{name:"Host the Midnight Ball",steps:[{funds:1500,insight:0}],need:s=>H.lvlOf(s,"hall")>=3?null:"The great dining hall must be at level 3."}};
H.projectStep=(s,id)=>(s.flags[id+"Step"]||0);
H.doProject=(s,id)=>{const P=H.PROJECTS[id],st=H.projectStep(s,id),step=P&&P.steps[st];if(!step)return {ok:false,msg:"Finished."};const why=P.need(s);if(why)return {ok:false,msg:why};
  if(s.funds<step.funds||s.insight<step.insight)return {ok:false,msg:"Needs "+step.funds+" coins"+(step.insight?" and "+step.insight+" insight":"")+"."};
  s.funds-=step.funds;s.insight-=step.insight;s.stats.spent+=step.funds;s.flags[id+"Step"]=st+1;H.note(s,P.name+": step "+(st+1)+" of "+P.steps.length+" done.");return {ok:true}};
const girlsOf=(s,gids)=>s.order.filter(h=>gids.includes(grpOf(h)));
const tierAtLeast=(s,gids,t)=>girlsOf(s,gids).some(h=>s.girls[h].tier>=t);
const affAtLeast=(s,gids,a)=>girlsOf(s,gids).some(h=>affStage(s.girls[h].aff)>=a);
const wardenIn=(s,pred)=>Object.keys(s.wardens).some(id=>pred(id));
const room=(s,id,l)=>({label:(ACAD.livemap.roomName?ACAD.livemap.roomName(id):id)+" at level "+l,ok:H.lvlOf(s,id)>=l,have:H.lvlOf(s,id),need:l});
const GATES={
 lattice:[null,
  s=>[room(s,"classroom_b",3),room(s,"studio_art",2),{label:"Insight 150 gathered",ok:s.insight>=150||s.flags.latInsight,have:Math.floor(s.insight),need:150},{label:"A Warden in a craft room",ok:wardenIn(s,id=>H.ROOMS[id]&&H.ROOMS[id].stat==="craft")}],
  s=>[{label:"Renown: Famed",ok:H.tier(s)>=3},{label:"A podium at the Bake-off",ok:H.podium(s,"bakeoff")},{label:"A Clockwork girl at Rare",ok:tierAtLeast(s,["clockwork"],2)}],
  s=>[{label:"The old well repaired",ok:H.projectStep(s,"well")>=3,have:H.projectStep(s,"well"),need:3},{label:"A Synth girl as a Confidant",ok:affAtLeast(s,["synth"],4)},{label:"Three Synth girls enrolled",ok:girlsOf(s,["synth"]).length>=3,have:girlsOf(s,["synth"]).length,need:3}]],
 starless:[null,
  s=>[room(s,"observatory",3),{label:"A Warden at the observatory",ok:!!s.wardens.observatory},{label:"Renown: Famed",ok:H.tier(s)>=3},{label:"A podium at the Rooftop Run",ok:H.podium(s,"night")}],
  s=>[{label:"An undercroft room restored",ok:["aquarium","cellar","vault","tunnels"].some(id=>H.lvlOf(s,id)>=1)},{label:"A podium at the Storm Duel",ok:H.podium(s,"storm")},{label:"A Vigil girl at Rare",ok:tierAtLeast(s,["vigil"],2)},{label:"Five girls in good spirits",ok:s.order.filter(h=>s.girls[h].mood>=70).length>=5,have:s.order.filter(h=>s.girls[h].mood>=70).length,need:5}],
  s=>[{label:"The Midnight Ball held",ok:H.projectStep(s,"ball")>=1},{label:"Any girl as a Confidant",ok:s.order.some(h=>affStage(s.girls[h].aff)>=4)},{label:"A Void girl as a Close friend",ok:affAtLeast(s,["void"],3)}]]};
H.WINGS={lattice:{name:"The Lattice",groups:["clockwork","synth"],tag:"The old well and the hours that keep it."},starless:{name:"The Starless Court",groups:["vigil","void"],tag:"The Stair, and the watch that keeps the dark awake."}};
H.gateReqs=(s,f,stage)=>GATES[f][stage]?GATES[f][stage](s):null;
let uCache={key:"",set:null};
H.unlockedSet=s=>{const key=s.gates.lattice+"|"+s.gates.starless;if(uCache.key===key&&uCache.set)return uCache.set;const set=new Set(),add=a=>a.forEach(h=>set.add(h));
  const cw=members("clockwork"),syn=members("synth"),vg=members("vigil"),vo=members("void");
  if(s.gates.lattice>=1)add(cw);if(s.gates.lattice>=2)add(syn.slice(0,10));if(s.gates.lattice>=3)add(syn.slice(10));
  if(s.gates.starless>=1)add(vg);if(s.gates.starless>=2)add(vo.slice(0,10));if(s.gates.starless>=3)add(vo.slice(10));uCache={key,set};return set};
H.locked=(s,h)=>H.lockedFaction(h)&&!H.unlockedSet(s).has(h);

/* ---------- the daily hooks ---------- */
H.dayHooks=[s=>{
  /* essence, graduation, scouts, sets, alumnae, gates */
  let coins=0;
  s.order.slice().forEach(h=>{const g=s.girls[h];g.ess+=(.05+H.levelOf(g)/400)*(H.isMuse(s,h)?2:1)*(g.vow==="court"?2:1);
    if(g.tier<3&&s.day-g.joined>=H.ALUM_YEARS*360){s.alumnae.push({h,tier:g.tier,day:s.day,stats:g.stats});delete s.girls[h];s.order=s.order.filter(x=>x!==h);s.muses=s.muses.filter(x=>x!==h);Object.keys(s.wardens).forEach(r=>{if(s.wardens[r]===h)delete s.wardens[r]});H.note(s,HN(h)+" graduates after six years and joins the alumnae, who will always write.");H.pushNotice&&H.pushNotice(s,"farewell",h)}});
  s.scouts=s.scouts.filter(x=>{x.left--;if(x.left>0)return true;if(!s.girls[x.h]&&!s.short.includes(x.h)){s.short.unshift(x.h);H.note(s,"Your scout returns: "+HN(x.h)+" is willing to come.")}return false});
  const sb=H.setBonus(s);coins+=sb.coins;s.renown+=sb.renown;coins+=H.alumIncome(s);s.renown+=s.alumnae.length*.02;
  ["lattice","starless"].forEach(f=>{const st=s.gates[f];if(st>=3)return;const reqs=H.gateReqs(s,f,st+1);if(reqs&&reqs.every(r=>r.ok)){s.gates[f]=st+1;if(f==="lattice"&&st===0)s.flags.latInsight=true;s.renown+=5;H.note(s,H.WINGS[f].name+": a door opens ("+(st+1)+" of 3). New girls are willing to come.");H.pushNotice&&H.pushNotice(s,"wing",null,{f,stage:st+1});H.refill(s)}});
  return coins}];

/* ---------- a headless bot that plays well, for balance ---------- */
H.bot=(days,opts)=>{opts=opts||{};const s=H.fix(H.newRun("Bot")),log=[],first={};
  for(let d=1;d<=days;d++){H.step(s,1);
    for(let k=0;k<3;k++){const c=s.short.map(h=>[h,H.canEnroll(s,h)]).filter(x=>x[1].ok).sort((a,b)=>a[1].cost-b[1].cost)[0];if(!c)break;H.enroll(s,c[0])}
    const buildable=Object.keys(H.ROOMS).filter(id=>H.canBuild(s,id).ok);
    if(buildable.length){const full=s.order.length>=H.beds(s)-1;let pick=full?buildable.filter(id=>H.ROOMS[id].k==="dorm").sort((a,b)=>H.canBuild(s,a).cost-H.canBuild(s,b).cost)[0]:null;
      if(!pick){const sc=id=>{const R=H.ROOMS[id],lv=H.lvlOf(s,id);const v={income:3,train:2.5,renown:2.2,insight:1.4,mood:1.2,office:2,dorm:.8}[R.k]||1;return H.canBuild(s,id).cost/v/(lv?1:.7)};pick=buildable.sort((a,b)=>sc(a)-sc(b))[0]}
      if(pick)H.build(s,pick)}
    if(s.order.length>=2&&s.muses.length<2){H.setMuse(s,s.order[0]);H.setMuse(s,s.order[1])}
    s.muses.forEach(h=>H.audience(s,h));
    /* trials, ascensions, wardens, scouting, contests */
    s.order.forEach(h=>{const g=s.girls[h],q=H.ascendReqs(s,h);if(!q)return;if(q.tier.need.trial&&!g.trial[q.ti]){const t=H.trialFor(s,h,q.ti);for(const ch of t.choices){if(H.attemptTrial(s,h,q.ti,ch.st).ok)break}}const ar=q.ti===4?H.ascend(s,h,"contest"):H.ascend(s,h);if(ar&&ar.ok&&!(PT[q.ti].id in first))first[PT[q.ti].id]=d});
    if(Object.keys(s.wardens).length<H.maxWardens(s)){const want=["observatory","classroom_b","studio_art","library","kitchens","champions","town_bakery"].filter(id=>H.lvlOf(s,id)>=1&&!s.wardens[id]);const id=want[0],pool=s.order.filter(h=>!H.wardenOf(s,h));if(id&&pool.length)H.setWarden(s,id,pool[(Math.random()*pool.length)|0])}
    if(s.funds>400&&s.scouts.length<1){const t=ACAD.HOUSES.filter(h=>H.canScout(s,h).ok).sort((a,b)=>H.rarityOf(b)-H.rarityOf(a))[0];if(t)H.scout(s,t)}
    H.invitations(s).filter(x=>!x.done).forEach(x=>{const top=s.order.slice().sort((a,b)=>H.fit(s.girls[b],x.c)-H.fit(s.girls[a],x.c)).slice(0,3);if(top.length)H.enterContest(s,x.c.id,top)});
    if(s.gates.lattice>=1&&H.projectStep(s,"well")<3)H.doProject(s,"well");if(H.lvlOf(s,"hall")>=3&&!H.projectStep(s,"ball"))H.doProject(s,"ball");
    if(opts.marks&&opts.marks.includes(d)){const tc=[0,0,0,0,0];s.order.forEach(h=>tc[s.girls[h].tier]++);log.push({d,funds:Math.round(s.funds),ren:Math.round(s.renown),tier:H.tier(s),girls:s.order.length,beds:H.beds(s),alum:s.alumnae.length,tiers:tc.join("/"),gates:s.gates.lattice+"/"+s.gates.starless,trophies:s.trophies.length,wardens:Object.keys(s.wardens).length})}}
  return {s,log,first}};
})();
