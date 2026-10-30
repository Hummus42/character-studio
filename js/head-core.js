/* Everspire: the Headmaster. An idle tycoon: the academy runs itself on the living map, the player builds rooms, admits girls and spends time with them.
   No failure state and no deadlines. All rules live here, with no DOM, so a headless run can balance them. Planner game (game-core.js) is untouched. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.game)return;
const G=ACAD.game,HN=ENC.HN,SID=G.SID,H={};ACAD.head=H;
const KEY="everspire.head.v1",DAY_SEC=90,OFFLINE_CAP_H=8,OFFLINE_DAY_SEC=180;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),r1=v=>Math.round(v*10)/10;
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return ((h>>>0)%100000)/100000}

/* ---------- renown tiers ---------- */
const TIERS=[{name:"Unknown",at:0},{name:"Local",at:25},{name:"Regional",at:90},{name:"Famed",at:300},{name:"Legendary",at:800},{name:"Mythic",at:2000}];
const tierOf=r=>{let t=0;TIERS.forEach((x,i)=>{if(r>=x.at)t=i});return t};

/* ---------- rooms: what each place does once it is restored ---------- */
/* k: dorm (beds), train (a stat), mood (everyone's spirits), income (coins), renown, insight, office (tuition), sealed (opens later) */
const ROOMS={
 dawn_dorm:{k:"dorm",cost:110,tier:0,start:1},dusk_dorm:{k:"dorm",cost:110,tier:0,start:1},dusk_quarters:{k:"dorm",cost:160,tier:2},
 hall:{k:"mood",cost:90,tier:0,start:1},cloister:{k:"mood",cost:70,tier:0,start:1},terrace:{k:"mood",cost:110,tier:1},bathhouse:{k:"mood",cost:130,tier:1},
 dawn_common:{k:"mood",cost:100,tier:1},dusk_common:{k:"mood",cost:100,tier:1},infirmary:{k:"mood",cost:150,tier:1},
 headmaster:{k:"office",cost:180,tier:0,start:1},
 library:{k:"train",stat:"wit",cost:90,tier:0,start:1},lecture:{k:"train",stat:"wit",cost:80,tier:0,start:1},classroom_a:{k:"train",stat:"wit",cost:100,tier:0},
 classroom_b:{k:"train",stat:"craft",cost:140,tier:1},studio_art:{k:"train",stat:"craft",cost:130,tier:1},kitchens:{k:"train",stat:"craft",cost:90,tier:0,start:1},
 apiary:{k:"train",stat:"craft",cost:170,tier:2},greenhouse:{k:"train",stat:"heart",cost:140,tier:1},drawing:{k:"train",stat:"heart",cost:130,tier:1},
 dance:{k:"train",stat:"grace",cost:100,tier:0,start:1},music:{k:"train",stat:"grace",cost:120,tier:1},gallery:{k:"train",stat:"grace",cost:160,tier:1},conservatory:{k:"train",stat:"grace",cost:190,tier:2},
 fields:{k:"train",stat:"vigor",cost:90,tier:0,start:1},lake:{k:"train",stat:"vigor",cost:140,tier:1},aquarium:{k:"train",stat:"vigor",cost:220,tier:2},stables:{k:"train",stat:"vigor",cost:200,tier:2},
 pride:{k:"train",stat:"nerve",cost:120,tier:1},trail:{k:"train",stat:"nerve",cost:120,tier:1},oldwood:{k:"train",stat:"nerve",cost:200,tier:2},cellar:{k:"train",stat:"nerve",cost:210,tier:2},
 cliffs:{k:"train",stat:"nerve",cost:300,tier:3},moor:{k:"train",stat:"heart",cost:300,tier:3},tunnels:{k:"train",stat:"nerve",cost:320,tier:3},
 observatory:{k:"insight",cost:260,tier:2},dawn_archive:{k:"insight",cost:220,tier:2},lounge:{k:"insight",cost:180,tier:1},vault:{k:"insight",cost:400,tier:3},
 champions:{k:"renown",cost:300,tier:2},silver:{k:"renown",cost:380,tier:3},spire:{k:"renown",cost:650,tier:4},
 town_street:{k:"income",cost:110,tier:1},town_bakery:{k:"income",cost:140,tier:1},town_pub:{k:"income",cost:200,tier:2},town_harbor:{k:"income",cost:260,tier:2},town_lodgings:{k:"dorm",cost:230,tier:2},
 well:{k:"sealed",cost:0,tier:9,why:"Sealed by the old wards. Something in the Lattice stirs below."},starless:{k:"sealed",cost:0,tier:9,why:"The Stair is dark. The Starless Court does not answer yet."},starless_deep:{k:"sealed",cost:0,tier:9,why:"The lower Stair. Not yet."}};
const MAXLV=5,roomCost=(id,lvl)=>{const R=ROOMS[id];return Math.round(R.cost*Math.pow(2.2,lvl)/5)*5};
const KINDNAME={dorm:"Dormitory",mood:"Comfort",train:"Training",income:"Trade",renown:"Prestige",insight:"Study",office:"Administration",sealed:"Sealed"};
const roomEffect=(id,lv)=>{const R=ROOMS[id];if(!R||!lv)return "";return {dorm:"+"+4*lv+" beds",mood:"+"+r1(.6*lv)+" spirit pull",train:G.SNAME[R.stat]+" "+r1(.3*(1+.4*(lv-1)))+" per session",income:"+"+Math.round(5*lv*(1+.1*R.tier))+" coins a day",renown:"+"+r1(.2*lv)+" renown a day",insight:"+"+r1(.5*lv)+" insight a day",office:"+"+8*lv+"% tuition",sealed:""}[R.k]};
const AREA_ORDER=["castle_ground","castle_upper","grounds","town","undercroft","beyond"];

/* ---------- girls ---------- */
const FACTION=h=>{const g=ACAD.GROUP_OF(h);return g&&(ACAD.FACTIONS||[]).find(f=>f.groups.includes(g.id))};
const lockedFaction=h=>{const f=FACTION(h);return !!f&&(f.id==="lattice"||f.id==="starless")};
const isLeader=h=>/^Leader/.test(((typeof BIOS==="object"&&BIOS[h])||{}).groupRole||"");
/* how hard a girl is to attract: 0 easy ... 3 only a famed academy gets her */
const rarityOf=h=>isLeader(h)?3:Math.floor(hash(h+"|rare")*3);
const feeOf=h=>40+rarityOf(h)*45;
const levelOf=g=>1+Math.floor(SID.reduce((t,s)=>t+g.stats[s],0)/12);
const eligible=s=>ACAD.HOUSES.filter(h=>!s.girls[h]&&!(H.locked?H.locked(s,h):lockedFaction(h))&&!((s.alumnae||[]).some(a=>a.h===h)));

/* ---------- state ---------- */
H.newRun=name=>{const s={v:1,kind:"head",id:String(Date.now())+Math.random().toString(36).slice(2,6),name:name||"The Headmaster",day:0,funds:300,renown:0,insight:0,saved:Date.now(),
  rooms:{},girls:{},order:[],short:[],nextApp:2,free:2,log:[],flags:{},stats:{earned:0,spent:0},wardens:{},muses:[],scouts:[],invites:{},trophies:[],alumnae:[],gates:{lattice:0,starless:0},gallery:{},ascended:0};
  Object.entries(ROOMS).forEach(([id,R])=>{if(R.start)s.rooms[id]={lvl:R.start}});
  H.refill(s,true);H.note(s,"You take the headmaster's chair. The academy is quiet, but the lanterns are lit.");return s};
H.fix=s=>{s.wardens=s.wardens||{};s.muses=s.muses||[];s.scouts=s.scouts||[];s.invites=s.invites||{};s.trophies=s.trophies||[];s.alumnae=s.alumnae||[];s.gates=s.gates||{lattice:0,starless:0};s.gallery=s.gallery||{};s.ascended=s.ascended||0;Object.values(s.girls||{}).forEach(g=>{if(g.tier==null)g.tier=0;if(g.ess==null)g.ess=0;if(!g.trial)g.trial={};if(g.lastAud==null)g.lastAud=-1});s.rooms=s.rooms||{};s.girls=s.girls||{};s.order=(s.order||[]).filter(h=>s.girls[h]);s.short=(s.short||[]).filter(h=>!s.girls[h]);s.log=s.log||[];s.flags=s.flags||{};s.stats=s.stats||{earned:0,spent:0};if(s.nextApp==null)s.nextApp=2;if(s.free==null)s.free=0;s.insight=s.insight||0;return s};
H.note=(s,t)=>{s.log.push({d:s.day,t});if(s.log.length>90)s.log.splice(0,s.log.length-90)};
H.tier=s=>tierOf(s.renown);
H.beds=s=>Object.entries(s.rooms).reduce((t,[id,r])=>t+(ROOMS[id]&&ROOMS[id].k==="dorm"?4*r.lvl+2*(r.gild||0):0),0);
H.lvlOf=(s,id)=>(s.rooms[id]||{}).lvl||0;
H.gildOf=(s,id)=>(s.rooms[id]||{}).gild||0;
H.sum=(s,kind)=>Object.entries(s.rooms).reduce((t,[id,r])=>t+(ROOMS[id]&&ROOMS[id].k===kind?r.lvl:0),0);
H.visible=(s,id)=>{const R=ROOMS[id];return !!R&&(R.tier<=H.tier(s)+1||s.rooms[id])};
H.canBuild=(s,id)=>{const R=ROOMS[id];if(!R)return {ok:false,msg:"No such room."};if(R.k==="sealed")return {ok:false,msg:R.why};const lv=H.lvlOf(s,id);
  if(R.tier>H.tier(s))return {ok:false,msg:"Needs renown tier "+TIERS[R.tier].name+"."};if(lv>=MAXLV)return {ok:false,msg:"Fully restored."};
  const c=roomCost(id,lv);if(s.funds<c)return {ok:false,msg:"Needs "+c+" coins.",cost:c};return {ok:true,cost:c}};
H.build=(s,id)=>{const c=H.canBuild(s,id);if(!c.ok)return c;s.funds-=c.cost;s.stats.spent+=c.cost;const lv=H.lvlOf(s,id)+1;s.rooms[id]=Object.assign(s.rooms[id]||{},{lvl:lv});
  s.renown+=lv===1?1:.5;H.note(s,(lv===1?"Restored ":"Improved ")+(ACAD.livemap.roomName?ACAD.livemap.roomName(id):id)+" (level "+lv+").");return {ok:true,cost:c.cost,lvl:lv}};

/* ---------- admissions ---------- */
H.refill=(s,all)=>{const want=5,pool=eligible(s).filter(h=>!s.short.includes(h)&&rarityOf(h)<=H.tier(s)+(all?0:0));
  /* easier girls first, with a day-seeded shuffle so shortlists differ between runs */
  pool.sort((a,b)=>hash(a+s.id+s.day)-hash(b+s.id+s.day));let guard=0;while(s.short.length<want&&pool.length&&guard++<20){s.short.push(pool.shift())}};
H.canEnroll=(s,h)=>{if(s.girls[h])return {ok:false,msg:"Already enrolled."};if(s.order.length>=H.beds(s))return {ok:false,msg:"No free beds. Restore a dormitory."};
  const f=s.free>0?0:feeOf(h);if(s.funds<f)return {ok:false,msg:"Needs "+f+" coins for her scholarship.",cost:f};return {ok:true,cost:f}};
H.enroll=(s,h)=>{const c=H.canEnroll(s,h);if(!c.ok)return c;if(s.free>0)s.free--;else{s.funds-=c.cost;s.stats.spent+=c.cost}
  const a=G.aptitude(h),stats={};SID.forEach(st=>stats[st]=r1(8+6*a[st]));
  s.girls[h]={joined:s.day,stats,mood:55,aff:0,focus:null,tier:0,ess:0,trial:{},lastAud:-1};s.order.push(h);s.short=s.short.filter(x=>x!==h);s.renown+=.5;
  H.note(s,HN(h)+" enrolls and drops her bags in the dormitory.");return {ok:true,cost:c.cost}};
H.decline=(s,h)=>{s.short=s.short.filter(x=>x!==h);H.refill(s);return {ok:true}};

/* ---------- a girl's day: which rooms she uses, and how much she gains ---------- */
H.bestRoom=(s,stat,h)=>{let best=null,bl=0;Object.entries(s.rooms).forEach(([id,r])=>{const R=ROOMS[id];if(!R||R.k!=="train"||R.stat!==stat)return;if(r.lvl>bl||(r.lvl===bl&&best&&hash(h+id)>hash(h+best))){best=id;bl=r.lvl}});return best};
H.focusStats=(s,h)=>{const g=s.girls[h],a=G.aptitude(h),cap=H.capOf?H.capOf(g):100,open=x=>g.stats[x]<cap-.4,order=SID.slice().sort((x,y)=>a[y]-a[x]);const out=[];if(g.focus&&open(g.focus))out.push(g.focus);order.forEach(x=>{if(!out.includes(x)&&open(x))out.push(x)});order.forEach(x=>{if(!out.includes(x))out.push(x)});return out.slice(0,2)};
H.rooms2=(s,h)=>H.focusStats(s,h).map(st=>H.bestRoom(s,st,h));
H.moodTarget=s=>clamp(50+6*Math.sqrt(H.sum(s,"mood")+.5*Object.entries(s.rooms).reduce((t,[id,r])=>t+(ROOMS[id]&&ROOMS[id].k==="mood"?(r.gild||0):0),0)),50,100);
H.tuition=(s,h)=>{const g=s.girls[h];return (3+levelOf(g)*.1)*(1+.08*H.sum(s,"office"))*(H.tierMul?H.tierMul(g):1)};

H.income=s=>s.order.reduce((t,h)=>t+H.tuition(s,h),0)+Object.entries(s.rooms).reduce((t,[id,r])=>t+(ROOMS[id]&&ROOMS[id].k==="income"?5*r.lvl*(1+.1*ROOMS[id].tier):0),0);
/* the one daily step. Deterministic, so offline progress and the simulator agree */
H.step=(s,days,rep)=>{rep=rep||{funds:0,renown:0,insight:0,gains:{},levels:[],days:0};
  for(let d=0;d<days;d++){s.day++;rep.days++;let inc=0;const ren0=s.renown;
    s.order.forEach(h=>{const g=s.girls[h],a=G.aptitude(h),before=levelOf(g),mf=.7+g.mood/200;inc+=H.tuition(s,h);
      const fs=H.focusStats(s,h);fs.forEach((st,i)=>{const room=H.bestRoom(s,st,h),lv=room?s.rooms[room].lvl:0;let gain=(.02+(lv?.12*(1+.4*(lv-1)):0)*(i?.7:1)*a[st]*mf)*Math.max(.2,1-g.stats[st]/100);if(!room)gain*=.4;
        gain*=(H.roomMul?H.roomMul(s,room):1)*(H.growMul?H.growMul(s):1);const cap=H.capOf?H.capOf(g):100;gain=Math.min(gain,cap-g.stats[st]);if(gain>0){g.stats[st]=r1x(g.stats[st]+gain);(rep.gains[h]=rep.gains[h]||{})[st]=(rep.gains[h][st]||0)+gain}});
      SID.forEach(st=>{if(!fs.includes(st))g.stats[st]=r1x(Math.min(H.capOf?H.capOf(g):100,g.stats[st]+.03*a[st]))});
      g.mood=clamp(g.mood+(H.moodTarget(s)-g.mood)*.1,0,100);s.renown+=levelOf(g)/400*(H.tierMul?H.tierMul(g):1);const after=levelOf(g);
      if(after>before&&(after%5===0)){H.note(s,HN(h)+" reaches level "+after+".");rep.levels.push([h,after])}});
    Object.entries(s.rooms).forEach(([id,r])=>{const R=ROOMS[id];if(!R)return;const wm=H.roomMul?H.roomMul(s,id):1;if(R.k==="income")inc+=5*r.lvl*(1+.1*R.tier)*wm;if(R.k==="renown")s.renown+=.2*r.lvl*wm;if(R.k==="insight"){s.insight+=.5*r.lvl*wm;rep.insight+=.5*r.lvl*wm}});
    (H.dayHooks||[]).forEach(f=>{inc+=f(s,rep)||0});inc*=H.incMul?H.incMul(s):1;s.funds+=inc;s.stats.earned+=inc;rep.funds+=inc;rep.renown+=s.renown-ren0;
    const t0=tierOf(s.renown-0),was=s.flags.tier||0;if(t0>was){s.flags.tier=t0;H.note(s,"The academy's renown grows: "+TIERS[t0].name+". New rooms and applicants await.")}
    if(s.short.length<5){s.nextApp--;if(s.nextApp<=0){H.refill(s);s.nextApp=2}}}
  return rep};
const r1x=v=>Math.round(v*100)/100;

/* ---------- time away: half-speed progress, capped, never negative ---------- */
H.offline=(s,now)=>{const secs=Math.min(OFFLINE_CAP_H*3600,Math.max(0,((now||Date.now())-(s.saved||now||Date.now()))/1000)),days=Math.floor(secs/OFFLINE_DAY_SEC);if(days<1)return null;
  const rep=H.step(s,Math.min(days,400));rep.secs=secs;return rep};

/* ---------- the map: each girl walks to the rooms she trains in ---------- */
H.stays=(s,h,day)=>{const L=ACAD.livemap,g=s.girls[h];if(!L||!g)return null;const rs=H.rooms2(s,h).map(r=>r&&L.rooms[r]?r:"hall");
  const dorm=L.dormOf(h),home=L.haunt(h),common=L.commonOf(h),we=day>=5,evening=hash(h+s.day+"ev")<.6?home:common,out=[{t0:0,room:dorm,kind:"sleep"}];
  if(!we)out.push({t0:405,room:dorm,kind:"wake"},{t0:435,room:"hall",kind:"breakfast",by:true},{t0:495,room:rs[0],kind:"train",by:true},{t0:735,room:"hall",kind:"lunch",by:true},{t0:795,room:rs[1],kind:"train",by:true},
    {t0:1035,room:common,kind:"free",by:true},{t0:1125,room:"hall",kind:"dinner",by:true},{t0:1185,room:evening,kind:"evening",by:true},{t0:1335,room:dorm,kind:"curfew",by:true},{t0:1375,room:dorm,kind:"sleep"});
  else out.push({t0:510,room:dorm,kind:"wake"},{t0:555,room:"hall",kind:"brunch",by:true},{t0:630,room:rs[0],kind:"train",by:true},{t0:795,room:"hall",kind:"lunch",by:true},{t0:870,room:rs[1],kind:"train",by:true},
    {t0:1125,room:"hall",kind:"dinner",by:true},{t0:1185,room:evening,kind:"evening",by:true},{t0:1350,room:dorm,kind:"curfew",by:true},{t0:1385,room:dorm,kind:"sleep"});
  return out};
H.syncMap=s=>{const L=ACAD.livemap;if(!L)return;L.clearEvents();ACAD.HOUSES.forEach(h=>{if(L.clearOverride)L.clearOverride(h)});
  s.order.forEach(h=>{const v=["head",s.id,h,H.rooms2(s,h).join(",")].join("|");L.setOverride(h,day=>H.stays(s,h,day),v)})};

/* ---------- saves: three slots in this browser, plus a file ---------- */
const readAll=()=>{try{const a=JSON.parse(localStorage.getItem(KEY)||"null");if(a&&Array.isArray(a.slots))return a}catch(e){}return {slots:[null,null,null],last:-1}};
H.slots=()=>readAll().slots;H.lastSlot=()=>{const a=readAll();return a.slots[a.last]?a.last:a.slots.findIndex(x=>x)};
H.save=(s,slot)=>{const a=readAll();s.saved=Date.now();a.slots[slot]=s;a.last=slot;try{localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}};
H.load=slot=>{const x=readAll().slots[slot];return x?H.fix(JSON.parse(JSON.stringify(x))):null};
H.erase=slot=>{const a=readAll();a.slots[slot]=null;try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}};
H.exportRun=s=>JSON.stringify(s);
H.importRun=text=>{try{const s=JSON.parse(text);if(!s||s.kind!=="head"||!s.rooms)return null;return H.fix(s)}catch(e){return null}};

Object.assign(H,{TIERS,tierOf,ROOMS,MAXLV,roomCost,KINDNAME,roomEffect,AREA_ORDER,rarityOf,feeOf,levelOf,isLeader,lockedFaction,eligible,FACTION,DAY_SEC,hash,clamp});
})();
