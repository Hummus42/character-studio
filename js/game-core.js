/* v314: the patron game, rules. You are an off-screen patron: you back up to three protégées through the six years of the Academy,
   plan their weeks, enter them in the Academy's contests, and write to anyone you like. Everything here is rules and numbers;
   the screens are in game-ui.js. A run is a save of its own and never touches the canon. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||typeof ENC==="undefined"||!ENC.E)return;
const HN=ENC.HN,G={};ACAD.game=G;
const hash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)/4294967296};
const rng=seed=>{let i=0;return ()=>hash(seed+"#"+(i++))};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),r1=v=>Math.round(v*10)/10;

/* ---------- stats, paths, aptitudes ---------- */
const STATS=[
 {id:"grace",name:"Grace",blurb:"Poise, rhythm and presence.",path:"Poise",sig:"Flawless Form"},
 {id:"wit",name:"Wit",blurb:"Study, strategy and quick answers.",path:"Scholar",sig:"Three Moves Ahead"},
 {id:"heart",name:"Heart",blurb:"Charm, empathy and crowd.",path:"Charmer",sig:"The Whole Room"},
 {id:"vigor",name:"Vigor",blurb:"Speed, strength and stamina.",path:"Athlete",sig:"Second Wind"},
 {id:"craft",name:"Craft",blurb:"Making things well: food, art and machines.",path:"Maker",sig:"Master's Touch"},
 {id:"nerve",name:"Nerve",blurb:"Courage, composure and stealth.",path:"Daredevil",sig:"Ice Veins"}];
const SID=STATS.map(s=>s.id),SNAME=Object.fromEntries(STATS.map(s=>[s.id,s.name]));
const GAPT={ /* grace wit heart vigor craft nerve */
 legends:[1.1,1.0,1.2,1.2,.8,1.1],pride:[1.0,.9,1.1,1.3,.7,1.2],pack:[.9,.8,1.2,1.4,.8,1.1],coil:[1.1,1.4,.7,.8,1.0,1.2],talons:[1.0,1.3,.8,.9,1.0,1.4],
 deep:[1.2,1.0,1.0,1.2,.9,1.0],frost:[1.2,.9,1.1,1.2,.9,1.0],plumes:[1.4,.9,1.3,.8,1.1,.9],grove:[.9,1.1,1.3,.8,1.3,.9],hive:[.9,1.0,1.3,.8,1.4,.9],
 synth:[1.0,1.3,.8,1.1,1.3,1.0],void:[1.1,1.0,.7,1.1,.9,1.4],clockwork:[.9,1.3,.8,.9,1.4,1.0],vigil:[1.1,1.2,.9,.8,1.0,1.3]};
const APT={};
function aptitude(h){if(APT[h])return APT[h];const g=ACAD.GROUP_OF(h),base=GAPT[g&&g.id]||[1,1,1,1,1,1],o={};SID.forEach((s,i)=>o[s]=r1((base[i]*(0.88+0.24*hash(h+"|apt|"+s)))*100)/100);return APT[h]=o}
const topStats=(h,n)=>{const a=aptitude(h);return SID.slice().sort((x,y)=>a[y]-a[x]).slice(0,n||2)};

/* the tree: six paths, four steps each; a step needs the one before it */
const STEPS=[
 {cost:1,name:"Habit",text:"Training this stat is 10% more effective."},
 {cost:2,name:"Edge",text:"+3 to this stat's weight in every contest."},
 {cost:3,name:"Pacing",text:"Training this stat tires her a quarter less."},
 {cost:4,name:"Signature",text:"+8 in contests that lean hard on this stat."}];
const hasStep=(w,stat,i)=>(w.tree[stat]||0)>i;

/* the fourth step on each path is her own move, named from her bio so no two girls learn the same thing */
const SIGM={};
function signature(h,stat){const k=h+"|"+stat;if(SIGM[k])return SIGM[k];const b=(typeof BIOS==="object"&&BIOS[h])||{},st=STATS.find(x=>x.id===stat)||{},n=HN(h);
  const cap=t=>String(t||"").replace(/(^|[\s-])([a-z])/g,(m,p,c)=>p+c.toUpperCase());
  const clean=t=>{let x=String(t||"").split(/[,;(.:]| at | in | on | under | after | by | of | with /i)[0].replace(/^(the|a|an|her|his|their)\s+/i,"").trim();return x.split(/\s+/).slice(0,3).join(" ")};
  const single=t=>{let x=clean(t).split(/\s+/);let w=x.pop()||"";if(/ies$/i.test(w))w=w.replace(/ies$/i,"y");else if(/ves$/i.test(w))w=w.replace(/ves$/i,"f");else if(/(ss|us)es$/i.test(w))w=w.replace(/es$/i,"");else if(/(ss|us)$/i.test(w)){}else if(/s$/i.test(w))w=w.replace(/s$/i,"");x.push(w);return x.join(" ")};
  const first=t=>clean(String(t||"").split(/[,;]/)[0].replace(/^(and|the)\s+/i,""));
  const rally=String(b.catchphrase||"").replace(/["“”]/g,"").trim();
  let name,text;
  if(stat==="grace"&&clean(b.favPlace)){name="The "+cap(clean(b.favPlace))+" Turn";text=n+" moves the way she does at "+String(b.favPlace).toLowerCase()+": unhurried and exact."}
  else if(stat==="wit"&&clean(b.favSubject)){name="The "+cap(clean(b.favSubject))+" Gambit";text=n+" turns her love of "+String(b.favSubject).toLowerCase()+" into a line nobody sees coming."}
  else if(stat==="heart"&&clean(b.favFlower)){name=cap(single(b.favFlower))+" Promise";text=n+" gives a little of herself away, and the room leans in."}
  else if(stat==="vigor"&&rally&&rally.length<=26){name="Rally: "+rally;text=n+" calls it out, and her second wind arrives on cue."}
  else if(stat==="vigor"&&clean(b.hobbies)){name=cap(first(b.hobbies))+" Sprint";text=n+" runs the way she does everything she loves: all of her at once."}
  else if(stat==="craft"&&first(b.hobbies)){name=cap(first(b.hobbies))+" Flourish";text=n+" brings the hands of someone who does "+first(b.hobbies).toLowerCase()+" every free hour."}
  else if(stat==="nerve"&&clean(b.favAnimal)){name=cap(single(b.favAnimal))+" Nerve";text=n+" borrows the stillness of "+String(b.favAnimal).toLowerCase()+" and does not blink."}
  else if(stat==="heart"&&clean(b.favScent)){name=cap(clean(b.favScent))+" Promise";text=n+" gives a little of herself away, and the room leans in."}
  else if(stat==="nerve"&&clean(b.favSeason)){name=cap(clean(b.favSeason))+" Nerve";text=n+" waits for her season to turn, and does not blink."}
  else{name=n+"'s "+(st.sig||"Signature");text="Her own move."}
  return SIGM[k]={name,text:text+" +8 in contests that lean hard on this stat."}}
G.signature=signature;

/* a few lines of the moment itself, written from her bio, shown with the picture */
function moment(h,id){const b=(typeof BIOS==="object"&&BIOS[h])||{},n=HN(h),lc=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toLowerCase()+t.slice(1):""},f1=t=>String(t||"").split(/[;]/)[0].trim(),say=String(b.catchphrase||"").replace(/["“”]/g,"").trim();
  const dr=lc(f1(b.dreams)),fe=lc(f1(b.fears)),pl=lc(b.favPlace),dk=lc(b.favDrink),sc=lc(b.favScent),hb=lc(f1(b.habits)),lk=lc(String(b.likes||"").split(",")[0]);
  const T={
   "romance-1":`${n} has kept your letter close all day.${hb?" You can tell by how she reads it: "+hb+".":""} She says nothing about it, and smiles at the page instead.`,
   "romance-2":`${pl?"She takes you to "+pl:"She takes you walking in the golden light"}, and for once does not rush ahead.${dr?" She tells you what she wants most: "+dr+".":""}`,
   "romance-3":`${dk?"Over "+dk+", she":"Over tea, she"} tells you the thing she does not tell people.${fe?" It is this: "+fe+".":""} You tell her yours, and the rain keeps time.`,
   "romance-4":`${n} has plainly rehearsed this.${say?" It is not \""+say+"\" this time.":""} She says she wants you beside her for what comes next, and her hands do not know where to go.`,
   "romance-5":`The candles burn low. ${n} stops performing, stops being clever, and simply holds on to you.${sc?" She smells of "+sc+".":""} Nothing is said that needs saying.`,
   "romance-6":`Morning. ${n} steals${dk?" your "+dk:" the blanket"} and does not apologise.${lk?" She says "+lk+" was never really the point.":""} You are late for everything, and neither of you minds.`
  };
  return T[id]||""}
G.moment=moment;

/* ---------- the week ---------- */
const ACTIONS=[
 {id:"lessons",name:"Lessons",stat:"wit",second:"heart",room:"lecture",fat:10,mood:-2,text:"Lectures, labs and the library."},
 {id:"athletics",name:"Athletics",stat:"vigor",second:"nerve",room:"fields",fat:14,mood:-2,text:"Track, piste and pool."},
 {id:"performance",name:"Performance",stat:"grace",second:"heart",room:"dance",fat:11,mood:0,text:"Dance, music and the catwalk."},
 {id:"workshop",name:"Workshop",stat:"craft",second:"wit",room:"studio_art",fat:10,mood:0,text:"Kitchens, studio and bench."},
 {id:"drills",name:"Nerve drills",stat:"nerve",second:"vigor",room:"tunnels",fat:13,mood:-3,text:"Rooftops, tunnels and dares."},
 {id:"social",name:"Socialize",stat:"heart",second:null,room:"hall",fat:2,mood:9,text:"Meals, gossip and company."},
 {id:"outing",name:"Town outing",stat:"heart",second:null,room:"town_street",fat:0,mood:14,cost:12,text:"A day in Everhythe."},
 {id:"rest",name:"Rest",stat:null,second:null,room:"bathhouse",fat:-26,mood:5,text:"Sleep, the bathhouse, nothing at all."}];
const ACT=Object.fromEntries(ACTIONS.map(a=>[a.id,a]));
const SLOTS=["Mon and Tue","Wed and Thu","Friday","The weekend"];
const WEEKS=36,YEARS=6,TERMS=[["Autumn",1],["Winter",13],["Spring",25]];
const termOf=w=>w>=25?"Spring":w>=13?"Winter":"Autumn";

/* ---------- contests: each one is a rivalry ground from the Encyclopedia ---------- */
const CONTESTS=[
 {id:"pledge",week:2,name:"The Fountain Pledge",kind:"festival",room:"conservatory",text:"Every Plumes party starts here. Letters sent this week count double."},
 {id:"debate",week:6,name:"Hall Debate Night",ground:"hall",room:"hall",w:{wit:.4,heart:.35,nerve:.25},prize:120,text:"A challenge issued across the great hall must be answered by breakfast."},
 {id:"bakeoff",week:10,name:"The Bake-off",ground:"bakeoff",room:"kitchens",w:{craft:.5,heart:.3,wit:.2},prize:110,text:"Official bake-offs, and the unofficial ones after midnight."},
 {id:"ice",week:15,name:"Midwinter Skate",ground:"ice",room:"lake",w:{grace:.4,vigor:.4,nerve:.2},prize:120,text:"The Everlake freezes, and the Frost skates under lanterns."},
 {id:"catwalk",week:22,name:"Catwalk Night",ground:"catwalk",room:"conservatory",w:{grace:.45,heart:.4,craft:.15},prize:130,text:"The long aisle between the orchids is a natural runway."},
 {id:"night",week:19,name:"The Rooftop Run",ground:"night",room:"observatory",w:{grace:.35,nerve:.4,vigor:.25},prize:120,text:"Slate roofs, a clear sky and a dare nobody admits to."},
 {id:"storm",week:24,name:"The Storm Duel",ground:"storm",room:"cliffs",w:{nerve:.4,vigor:.25,heart:.2,wit:.15},prize:125,text:"When the weather turns on the cliffs, grudges are settled in the open."},
 {id:"trail",week:26,name:"The Moonlit Run",ground:"forest",room:"trail",w:{vigor:.4,nerve:.4,wit:.2},prize:120,text:"The Pack's old trail, by full moon, to the lake and back."},
 {id:"sports",week:28,name:"Sports Day",ground:"race",room:"fields",w:{vigor:.55,nerve:.25,grace:.2},prize:150,text:"Every race worth losing, and most of the Academy's bets."},
 {id:"chess",week:31,name:"The Scholars' Duel",ground:"chess",room:"library",w:{wit:.55,nerve:.3,heart:.15},prize:130,text:"The two deans have played at the same table since 1966."},
 {id:"cup",week:34,name:"The Spire Cup",ground:null,room:"champions",w:{grace:.17,wit:.17,heart:.17,vigor:.17,craft:.16,nerve:.16},prize:260,big:true,text:"The Academy's all-round trophy, decided in the Champions' Hall."}];
CONTESTS.sort((a,b)=>a.week-b.week);
const CBYWEEK={};CONTESTS.forEach(c=>(CBYWEEK[c.week]=CBYWEEK[c.week]||[]).push(c));
const CONT=Object.fromEntries(CONTESTS.map(c=>[c.id,c]));
const TIERS={gold:{name:"Gold",pts:4},silver:{name:"Silver",pts:3},bronze:{name:"Bronze",pts:2},finalist:{name:"Finalist",pts:1},entered:{name:"Entered",pts:1}};

/* ---------- gifts ---------- */
const ITEMS=[
 {id:"tea",name:"A tin of good tea",price:18,tags:["drink","calm"]},{id:"sweets",name:"A box of sweets",price:15,tags:["sweet","food"]},
 {id:"book",name:"A fine old book",price:30,tags:["book","study"]},{id:"flowers",name:"A bunch of wildflowers",price:12,tags:["flower","nature"]},
 {id:"cocoa",name:"Spiced cocoa",price:14,tags:["drink","warm","sweet"]},{id:"charm",name:"A silver charm",price:55,tags:["jewel","pretty"]},
 {id:"tonic",name:"A sports tonic",price:20,tags:["sport","drink"]},{id:"sketch",name:"A leather sketchbook",price:28,tags:["art","craft"]},
 {id:"music",name:"A little music box",price:42,tags:["music","pretty"]},{id:"lantern",name:"A paper lantern",price:16,tags:["night","pretty"]},
 {id:"scarf",name:"A knitted scarf",price:34,tags:["warm","craft"]},{id:"puzzle",name:"A brass puzzle box",price:36,tags:["study","craft","night"]}];
const ITEM=Object.fromEntries(ITEMS.map(i=>[i.id,i]));
const KEYS={drink:/tea|coffee|cocoa|wine|milk|juice|cider|drink|chai|brew|whisky|soda|lemonade/i,sweet:/sweet|honey|cake|chocolate|candy|dessert|sugar|pastr|cocoa|bak/i,food:/food|cook|bak|meal|feast|spice|snack/i,
 book:/book|read|poet|novel|librar|lore|history|story/i,study:/study|scholar|math|astronom|science|philosoph|puzzle|chess|logic|lore/i,flower:/flower|garden|rose|petal|bloom|botan|plant/i,
 nature:/forest|garden|moon|sea|ocean|lake|animal|bird|mountain|nature|wild/i,warm:/winter|autumn|cold|warm|fire|cozy|snow|frost/i,jewel:/jewel|gem|silver|gold|glam|pretty|sparkle|ring/i,
 pretty:/pretty|glam|beauty|lovely|fashion|star|moon|light/i,sport:/sport|run|swim|race|fenc|archer|athlet|train|fight|danc/i,art:/art|paint|draw|sketch|design|theat|drama|sculpt/i,
 craft:/craft|mak|build|machine|knit|sew|tinker|clock|forge|invent/i,music:/music|sing|piano|violin|harp|song|danc|chor/i,night:/night|midnight|star|dark|shadow|owl|moon|rooftop/i,calm:/calm|quiet|tea|read|peace|slow|gentle/i};
function taste(h){const b=(typeof BIOS==="object"&&BIOS[h])||{};return [b.favDrink,b.favSubject,b.favSeason,b.summary,b.occupation,b.hobbies,b.interests,b.personality].filter(Boolean).join(" ")}
function liking(h,item){const t=taste(h);let s=0;item.tags.forEach(g=>{if(KEYS[g]&&KEYS[g].test(t))s+=1});const base=hash(h+"|like|"+item.id);
  const v=s*1.2+(base<.15?-1.2:base>.8?.8:0);return v>=2?2:v>=.9?1:v<=-1?-1:0}

/* ---------- romance ---------- */
const STAGES=["stranger","acquaintance","friend","close","confidant","courting","together"];
function stageOf(r){const b=r.bond,s=r.spark;if(b<8)return 0;if(b<22)return 1;if(b<42)return 2;if(b<62)return 3;if(s>=78&&b>=80)return 6;if(s>=58&&b>=64)return 5;return 4}
const STAGELABEL=["A stranger","An acquaintance","A friend","A close friend","A confidant","Courting","Together"];

/* ---------- ties from the canon ---------- */
function ties(h){const R=ACAD.RELDATA||{},o={couple:null,rivals:[],family:[],friends:(R.BF||{})[h]||[]};
  (R.SG||[]).forEach(p=>{if(p[0]===h)o.couple=p[1];else if(p[1]===h)o.couple=p[0]});
  (R.RV||[]).forEach(p=>{if(p[0]===h)o.rivals.push([p[1],p[2]]);else if(p[1]===h)o.rivals.push([p[0],p[2]])});
  (R.FAM||[]).forEach(p=>{if(p[0]===h)o.family.push(p[1]);else if(p[1]===h)o.family.push(p[0])});return o}

/* ---------- a run ---------- */
const KEY="everspire.game.v1";
function newWard(h,seed){const a=aptitude(h),st={};SID.forEach(s=>st[s]=r1(14+11*a[s]+4*hash(seed+h+s)));
  return {h,stats:st,fatigue:10,mood:62,sp:0,tree:{},plan:defaultPlan(h),form:[],wins:0,sinceRest:0}}
function defaultPlan(h){const t=topStats(h,2),act=s=>ACTIONS.find(a=>a.stat===s)||ACT.lessons;return [act(t[0]).id,act(t[1]).id,"social","rest"]}
G.newRun=function(name,wards){const seed=String(Date.now())+Math.random().toString(36).slice(2,7),s={v:1,id:seed,name:name||"The Patron",seed,year:1,week:1,money:320,cp:3,wards:{},order:[],rel:{},accolades:[],log:[],mail:{},entries:{},flags:{},record:{wins:0,medals:0,earned:0},settings:{autoRest:true,autoEnter:true,montage:true},gallery:{}};
  wards.slice(0,3).forEach(h=>{s.wards[h]=newWard(h,seed);s.order.push(h);s.rel[h]={bond:22,spark:0,met:true,last:0,said:[]}});
  s.log.push({y:1,w:1,t:`${s.name} takes up the patronage of ${wards.map(HN).join(", ")}. The first term begins.`});return s};
G.fix=s=>{if(!s)return s;s.settings=Object.assign({autoRest:true,autoEnter:true,montage:true},s.settings||{});s.gallery=s.gallery||{};s.entries=s.entries||{};s.cp=s.cp==null?3:s.cp;return s};
G.dateOf=s=>s.year>YEARS?{year:s.year,week:s.week,term:"",label:"Graduated",yname:"Graduated"}:({year:s.year,week:s.week,term:termOf(s.week),label:`Year ${s.year} · ${termOf(s.week)} · Week ${((s.week-1)%12)+1}`,yname:["First","Second","Third","Fourth","Fifth","Sixth"][s.year-1]+" year"});
G.save=(s,slot)=>{try{s.saved=Date.now();const d=JSON.parse(localStorage.getItem(KEY)||"{}");d.slots=d.slots||[null,null,null];d.slots[slot==null?(d.active||0):slot]=s;d.active=slot==null?(d.active||0):slot;localStorage.setItem(KEY,JSON.stringify(d));return true}catch(e){return false}};
G.load=slot=>{try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");return G.fix((d.slots||[])[slot]||null)}catch(e){return null}};
G.slots=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");return (d.slots||[null,null,null]).map(G.fix)}catch(e){return [null,null,null]}};
G.lastSlot=()=>{try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");const sl=d.slots||[];let best=-1,bt=-1;sl.forEach((x,i)=>{if(x&&(x.saved||0)>=bt){bt=x.saved||0;best=i}});return best}catch(e){return -1}};
G.exportRun=s=>JSON.stringify({everspire:"run",v:1,run:s});
G.importRun=text=>{const o=JSON.parse(text);if(!o||o.everspire!=="run"||!o.run||!o.run.wards)throw new Error("not a save");return G.fix(o.run)};
G.erase=slot=>{try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");d.slots=d.slots||[null,null,null];d.slots[slot]=null;localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}};

/* what a training week does */
const pathBonus=(w,stat)=>({gain:hasStep(w,stat,0)?1.1:1,edge:hasStep(w,stat,1)?3:0,fat:hasStep(w,stat,2)?.75:1,sig:hasStep(w,stat,3)?8:0});
function train(w,act){const a=ACT[act];if(!a)return null;const out={act,gains:{},fatigue:0,mood:0};
  const fm=clamp(1-w.fatigue/190,.45,1),mm=clamp(.72+w.mood/180,.7,1.25);
  if(a.stat){const T=G.tune,pb=pathBonus(w,a.stat),ap=aptitude(w.h),g1=T.gain*ap[a.stat]*fm*mm*pb.gain*clamp(1-w.stats[a.stat]/T.cap,.1,1);w.stats[a.stat]=r1(Math.min(100,w.stats[a.stat]+g1));out.gains[a.stat]=r1(g1);
    if(a.second){const g2=T.sec*ap[a.second]*fm*mm*clamp(1-w.stats[a.second]/T.cap,.1,1);w.stats[a.second]=r1(Math.min(100,w.stats[a.second]+g2));out.gains[a.second]=r1(g2)}
    out.fatigue=a.fat*pb.fat}else out.fatigue=a.fat;
  w.fatigue=clamp(w.fatigue+out.fatigue,0,100);out.mood=a.mood;w.mood=clamp(w.mood+a.mood,0,100);return out}
G.preview=(w,plan)=>{const c=JSON.parse(JSON.stringify(w)),tot={};plan.forEach(a=>{const o=train(c,a);Object.entries(o.gains).forEach(([s,v])=>tot[s]=r1((tot[s]||0)+v))});return {gains:tot,fatigue:Math.round(c.fatigue),mood:Math.round(c.mood)}};

/* ---------- a contest ---------- */
G.tune={gain:.7,sec:.28,cap:105,npc0:24,npcY:9.8,spec:.5};
const npcBase=y=>Math.min(96,G.tune.npc0+G.tune.npcY*y);
function npcStat(h,s,y){const k=G.tune.spec;return clamp(npcBase(y)*((1-k)+k*aptitude(h)[s])*(0.94+0.12*hash(h+"|npc|"+s+y)),5,100)}
function formOf(w){return clamp(.82+(w.mood-50)/260-Math.max(0,w.fatigue-40)/260,.62,1.1)}
function scoreWard(w,c,rand){let sc=0,sig=0;SID.forEach(s=>{const wt=(c.w||{})[s]||0;if(!wt)return;const pb=pathBonus(w,s);sc+=wt*(w.stats[s]+pb.edge);if(wt>=.35)sig=Math.max(sig,pb.sig)});
  return sc*formOf(w)+sig+(rand()-.5)*10}
function pickField(s,c,entrants){const y=s.year,rand=rng(s.seed+"|"+c.id+"|"+y+"|field"),field=[],ents=new Set(entrants);
  const rivalIds=new Set();entrants.forEach(h=>ties(h).rivals.forEach(([o,gr])=>{if((gr===c.ground||!c.ground)&&!ents.has(o)&&!s.wards[o])rivalIds.add(o)}));
  const pool=ACAD.HOUSES.filter(h=>!s.wards[h]&&!rivalIds.has(h)).map(h=>{let sc=0;SID.forEach(st=>sc+=((c.w||{})[st]||0)*npcStat(h,st,y));return [h,sc*(0.88+0.24*hash(h+c.id+y))]}).sort((a,b)=>b[1]-a[1]);
  const want=c.big?11:7;[...rivalIds].slice(0,3).forEach(h=>field.push(h));
  for(let i=0;field.length<want&&i<pool.length;i++){const h=pool[Math.floor(rand()*Math.min(pool.length,34))][0];if(!field.includes(h))field.push(h)}
  return {field,rivalIds}}
function runContest(s,c,entrants){const y=s.year,rand=rng(s.seed+"|"+c.id+"|"+y),pf=pickField(s,c,entrants),field=pf.field,rivalIds=pf.rivalIds;
  const rows=[];entrants.forEach(h=>rows.push({h,ward:true,score:scoreWard(s.wards[h],c,rand)}));
  field.forEach(h=>{let sc=0;SID.forEach(st=>sc+=((c.w||{})[st]||0)*npcStat(h,st,y));rows.push({h,ward:false,rival:rivalIds.has(h),score:sc*(0.97+0.06*hash(h+c.id+y+"form"))+(rand()-.5)*10})});
  rows.sort((a,b)=>b.score-a.score);rows.forEach((r,i)=>r.rank=i+1);return rows}
function tierOf(rank,n){return rank===1?"gold":rank===2?"silver":rank===3?"bronze":rank<=Math.ceil(n/2)?"finalist":"entered"}

/* ---------- advancing the week ---------- */
G.advance=function(s){const rep={year:s.year,week:s.week,wards:{},contests:[],notes:[],yearEnd:null,graduated:false,date:G.dateOf(s)};
  s.order.forEach(h=>{const w=s.wards[h];if(!w)return;const r={slots:[],before:Object.assign({},w.stats),fat0:w.fatigue,mood0:w.mood};
    w.plan.forEach((a,i)=>{const act=ACT[a];if(act&&act.cost){s.money-=act.cost}const o=train(w,a);r.slots.push(Object.assign({slot:SLOTS[i]},o));w.fatigue=clamp(w.fatigue-3,0,100)});
    if(w.fatigue>88){w.mood=clamp(w.mood-8,0,100);rep.notes.push(`${HN(h)} is worn out and her mood suffers. She needs rest.`)}
    w.sinceRest=w.plan.includes("rest")?0:(w.sinceRest||0)+1;rep.wards[h]=r});
  const list=CBYWEEK[s.week]||[];
  list.forEach(c=>{if(c.kind==="festival"){rep.notes.push(`${c.name}: ${c.text}`);s.flags["pledge"+s.year]=true;s.order.forEach(h=>{if(s.wards[h])s.wards[h].mood=clamp(s.wards[h].mood+8,0,100)});return}
    const ents=s.order.filter(h=>s.wards[h]&&(s.entries[c.id+":"+s.year]||{})[h]);if(!ents.length)return;
    const rows=runContest(s,c,ents),res={c:c,rows,wards:[]};
    ents.forEach(h=>{const w=s.wards[h],row=rows.find(r=>r.h===h),n=rows.length,tier=tierOf(row.rank,n),pr=Math.round((c.prize||100)*.6*({gold:1,silver:.55,bronze:.3,finalist:.12,entered:.04}[tier]));
      const spGain=TIERS[tier].pts+(c.big&&tier==="gold"?2:0);w.sp+=spGain;s.money+=pr;s.record.earned+=pr;if(tier==="gold"){w.wins++;s.record.wins++}if(tier!=="entered")s.record.medals++;
      const beaten=rows.filter(r=>r.rival&&r.rank>row.rank).map(r=>r.h),lost=rows.filter(r=>r.rival&&r.rank<row.rank).map(r=>r.h);
      const titles=[];const firstWin=tier==="gold"&&w.wins===1;if(firstWin)titles.push("First victory");if(beaten.length&&tier!=="entered")titles.push("Bested "+beaten.map(HN).join(" and "));
      if(c.big&&tier==="gold")titles.push("Spire Cup champion, "+G.dateOf(s).yname);
      const acc={h,c:c.id,name:c.name,year:s.year,week:s.week,rank:row.rank,n,score:r1(row.score),tier,prize:pr,sp:spGain,titles,rivalBeaten:beaten,rivalLost:lost};
      acc.scene=G.sceneOf(acc);acc.newScene=G.unlockScene(s,h,acc.scene,s.year,s.week);s.accolades.push(acc);res.wards.push(acc);w.form.push(row.rank);w.mood=clamp(w.mood+(tier==="gold"?14:tier==="silver"?9:tier==="bronze"?6:tier==="finalist"?2:-3),0,100);w.fatigue=clamp(w.fatigue+8,0,100);
      s.log.push({y:s.year,w:s.week,t:`${HN(h)} places ${row.rank} of ${n} in ${c.name}${tier==="gold"?" and takes the gold":""}.`})});
    res.recap=recap(s,c,rows);rep.contests.push(res)});
  /* romance: bonds fade a little when nobody writes */
  Object.keys(s.rel).forEach(h=>{const r=s.rel[h];if(s.week-r.last>6&&r.bond>12)r.bond=r1(r.bond-.4)});
  s.money+=40-12*s.order.length;s.cp=3;s.week++;
  if(s.week>WEEKS){rep.yearEnd=yearEnd(s);s.year++;s.week=1;if(s.year>YEARS){rep.graduated=true;rep.legacy=legacy(s)}}
  return rep};
function yearEnd(s){const out={year:s.year,wards:{}};s.order.forEach(h=>{const w=s.wards[h];if(!w)return;const mine=s.accolades.filter(a=>a.h===h&&a.year===s.year);
  out.wards[h]={golds:mine.filter(a=>a.tier==="gold").length,medals:mine.filter(a=>["gold","silver","bronze"].includes(a.tier)).length,entries:mine.length,stats:Object.assign({},w.stats),sp:w.sp};
  w.sp+=1;w.fatigue=Math.max(5,w.fatigue-30);w.mood=clamp(w.mood+10,0,100)});
  s.money+=60;s.log.push({y:s.year,w:36,t:`End of the ${["first","second","third","fourth","fifth","sixth"][s.year-1]} year.`});return out}
function legacy(s){const o={wards:{},total:0};s.order.forEach(h=>{const w=s.wards[h],mine=s.accolades.filter(a=>a.h===h);const pts=mine.reduce((t,a)=>t+({gold:10,silver:6,bronze:3,finalist:1,entered:0}[a.tier]),0)+(mine.some(a=>a.c==="cup"&&a.tier==="gold")?25:0);
  const sum=SID.reduce((t,k)=>t+w.stats[k],0),title=pts>=120?"A legend of Everspire":pts>=80?"A champion of her year":pts>=45?"A distinguished graduate":pts>=20?"A fine graduate":"A graduate, quietly";
  o.wards[h]={pts,sum:Math.round(sum),title,golds:mine.filter(a=>a.tier==="gold").length,medals:mine.filter(a=>["gold","silver","bronze"].includes(a.tier)).length};o.total+=pts});return o}
function recap(s,c,rows){const top=rows.slice(0,3),mine=rows.filter(r=>r.ward);const L=[];
  L.push(`${HN(top[0].h)} takes the ${c.name}${top[0].ward?", and the patron's colors fly high":""}.`);
  mine.forEach(m=>{const near=rows.find(r=>!r.ward&&Math.abs(r.rank-m.rank)===1&&r.rival);if(near)L.push(`${HN(m.h)} spends the contest shoulder to shoulder with her rival ${HN(near.h)}.`)});
  return L}
G.runContest=runContest;

/* ---------- scenes: pre-made, one girl only, so they fit any run ---------- */
G.sceneURL=(h,id)=>"assets/scenes/"+h+"/"+id+".webp";
G.sceneOf=a=>a.c+"-"+(a.rank<=3?"win":"lose");
const ROMANCE_SCENE={2:"romance-1",3:"romance-2",4:"romance-3",5:"romance-4",6:"romance-5"};
G.unlockScene=(s,h,id,y,w)=>{s.gallery=s.gallery||{};const g=(s.gallery[h]=s.gallery[h]||{});if(g[id])return false;g[id]={y:y==null?s.year:y,w:w==null?s.week:w};return true};

/* ---------- the plan on the map ---------- */
const ACT_ROOMS={lessons:["lecture","classroom_a","classroom_b"],athletics:["fields","lake","aquarium"],performance:["dance","music","conservatory"],workshop:["studio_art","kitchens","classroom_b"],
  drills:["tunnels","oldwood","observatory"],social:["hall","greenhouse","pride","cloister"],outing:["town_street","town_bakery","town_harbor"],rest:["bathhouse","cloister","infirmary"]};
const slotOfDay=d=>d<=1?0:d<=3?1:d===4?2:3;
G.RESOLVE_AT=990;                       /* the contests are decided at 4.30 on Saturday afternoon, once everyone has taken the floor */
G.CONTEST_FROM=840;G.CONTEST_TO=1050;
/* tired girls rest on their own: fatigue 70+ turns the weekend block into rest, 85+ adds Friday */
G.effectivePlan=(s,h)=>{const w=s.wards[h],p=w.plan.slice();if(!(s.settings&&s.settings.autoRest===false)){if(w.fatigue>=70&&!p.includes("rest"))p[3]="rest";if(w.fatigue>=85)p[2]=p[2]==="rest"?p[2]:"rest"}return p};
const entrantsOf=(s,c)=>s.order.filter(h=>s.wards[h]&&G.entered(s,c.id,h));
G.stays=(s,h,day)=>{const L=ACAD.livemap,w=s.wards[h];if(!L||!w)return null;const plan=G.effectivePlan(s,h),act=plan[slotOfDay(day)],rooms=(ACT_ROOMS[act]||["hall"]).filter(r=>L.rooms[r]);
  const dorm=L.dormOf(h),home=L.haunt(h),common=L.commonOf(h),we=day>=5,pick=i=>rooms[Math.floor(hash(h+"|"+s.week+"|"+day+"|"+act+"|"+i)*rooms.length)];
  const free=act==="rest"?"cloister":act==="social"?home:common,evening=hash(h+s.week+day+"ev")<.6?home:common;
  const out=[{t0:0,room:dorm,kind:"sleep"}];
  if(!we)out.push({t0:405,room:dorm,kind:"wake"},{t0:435,room:"hall",kind:"breakfast",by:true},{t0:495,room:pick(1),kind:"train",by:true},{t0:735,room:"hall",kind:"lunch",by:true},{t0:795,room:pick(2),kind:"train",by:true},
    {t0:1035,room:free,kind:"free",by:true},{t0:1125,room:"hall",kind:"dinner",by:true},{t0:1185,room:evening,kind:"evening",by:true},{t0:1335,room:dorm,kind:"curfew",by:true},{t0:1375,room:dorm,kind:"sleep"});
  else out.push({t0:510,room:dorm,kind:"wake"},{t0:555,room:"hall",kind:"brunch",by:true},{t0:630,room:pick(1),kind:"train",by:true},{t0:795,room:"hall",kind:"lunch",by:true},{t0:870,room:pick(2),kind:"train",by:true},
    {t0:1125,room:"hall",kind:"dinner",by:true},{t0:1185,room:evening,kind:"evening",by:true},{t0:1350,room:dorm,kind:"curfew",by:true},{t0:1385,room:dorm,kind:"sleep"});
  let res=out;
  if(day===5)(G.CBYWEEK[s.week]||[]).forEach(c=>{
    if(c.kind==="festival"){res=res.filter(x=>x.t0<1150||x.t0>=1300);res.push({t0:1170,room:"conservatory",kind:"festival",by:true},{t0:1300,room:dorm,kind:"curfew",by:true});res.sort((a,b)=>a.t0-b.t0);return}
    if(G.entered(s,c.id,h)){res=res.filter(x=>x.t0<G.CONTEST_FROM-20||x.t0>=G.CONTEST_TO);res.push({t0:G.CONTEST_FROM,room:c.room,kind:"contest",by:true});res.sort((a,b)=>a.t0-b.t0)}});
  return res};
/* tell the map: every protégée follows her plan to the minute; every rival and fellow contestant is at the venue on Saturday afternoon */
G.freeze=s=>({id:s.id,seed:s.seed,year:s.year,week:s.week,order:s.order.slice(),settings:{autoRest:false},entries:JSON.parse(JSON.stringify(s.entries||{})),
  wards:Object.fromEntries(s.order.filter(h=>s.wards[h]).map(h=>[h,{plan:G.effectivePlan(s,h),fatigue:s.wards[h].fatigue}]))});
G.syncMap=s0=>{const L=ACAD.livemap;if(!L||!s0)return;const s=G.freeze(s0);L.clearEvents();
  s.order.forEach(h=>{if(!s.wards[h])return;const v=[s.id,s.year,s.week,s.wards[h].plan.join(","),Object.keys(s.entries).filter(k=>k.endsWith(":"+s.year)&&s.entries[k][h]).join(",")].join("|");L.setOverride(h,day=>G.stays(s,h,day),v)});
  (G.CBYWEEK[s.week]||[]).forEach(c=>{if(c.kind==="festival"){ACAD.HOUSES.forEach(h=>{if(!s.wards[h])L.setEvent(h,5,{room:"conservatory",from:1170,to:1300})});return}
    const ents=entrantsOf(s,c);if(!ents.length)return;pickField(s,c,ents).field.forEach(h=>{if(!s.wards[h])L.setEvent(h,5,{room:c.room,from:G.CONTEST_FROM,to:G.CONTEST_TO})})})};
/* standing orders: she enters a contest that suits her unless the patron has said otherwise */
G.fitOf=(w,c)=>Object.entries(c.w||{}).reduce((t,[st,wt])=>t+wt*w.stats[st],0);
G.fieldOf=(c,y)=>Object.entries(c.w||{}).reduce((t,[st,wt])=>t+wt*G.npcBase(y)*.82,0);
G.prepareWeek=s=>{if(!(s.settings&&s.settings.autoEnter))return;(G.CBYWEEK[s.week]||[]).forEach(c=>{if(c.kind==="festival")return;const k=c.id+":"+s.year;s.entries[k]=s.entries[k]||{};
  s.order.forEach(h=>{if(s.wards[h]&&s.entries[k][h]===undefined){s.entries[k][h]=G.fitOf(s.wards[h],c)>=G.fieldOf(c,s.year)*.95}})})};
G.eventWeek=s=>{const list=G.CBYWEEK[s.week]||[];return list.some(c=>c.kind==="festival"||s.order.some(h=>G.entered(s,c.id,h)))};
/* weeks go by without ceremony until something worth watching: returns the digest of every week it ran */
G.runToEvent=(s,max)=>{const digest={weeks:0,gains:{},reports:[],stop:"limit"};
  for(let i=0;i<(max||40);i++){G.prepareWeek(s);if(i>0&&G.eventWeek(s)){digest.stop="event";break}if(s.year>G.YEARS)break;
    const before=JSON.parse(JSON.stringify(Object.fromEntries(s.order.map(h=>[h,s.wards[h].stats]))));const rep=G.advance(s);digest.weeks++;digest.reports.push(rep);
    s.order.forEach(h=>{SID.forEach(st=>{const d=s.wards[h].stats[st]-before[h][st];if(d>0)(digest.gains[h]=digest.gains[h]||{})[st]=r1(((digest.gains[h]||{})[st]||0)+d)})});
    if(rep.yearEnd||rep.graduated||rep.contests.length){digest.stop=rep.graduated?"graduation":rep.yearEnd?"year":"contest";break}}
  return digest};

/* a check anyone can run: does the map put each protégée where her plan says, to the minute? It looks at every planned stay of every day:
   she must arrive on time, be in that room while she is there, and visit the rooms in the order her plan gives. */
G.audit=s=>{const L=ACAD.livemap,bad=[];let n=0;
  s.order.forEach(h=>{for(let day=0;day<7;day++){const R=L.routine(h,day),want=G.stays(s,h,day);if(!want)continue;
    R.forEach(x=>{if(x.arrive<0)return;const end=x.leave>1e8?1440:x.leave;
      if(x.by){n++;const late=x.arrive-x.t0;if(late>3)bad.push(h+" day"+day+" "+L.fmt(x.t0)+" "+x.room+" ("+x.kind+") reached "+Math.round(late)+" min late")}
      const mid=Math.min(x.arrive+3,end-1);if(mid>x.arrive&&mid<end){n++;const st=L.stateAt(h,mid,day),room=(st.st==="in"||st.st==="out")?st.room:null;if(room!==x.room)bad.push(h+" day"+day+" "+L.fmt(mid)+" should be in "+x.room+" but is "+(room||st.st))}});
    const seq=want.map(x=>x.room).filter((r,i,arr)=>i===0||r!==arr[i-1]),got=R.map(x=>x.room);n++;if(JSON.stringify(seq)!==JSON.stringify(got))bad.push(h+" day"+day+" rooms in the wrong order: "+got.join(">")+" vs plan "+seq.join(">"))}});
  return {checks:n,bad}};

/* ---------- writing to people ---------- */
const OPEN=["Dear {n},","{n},","To {n},","Dearest {n},"],PL={0:"the corridors",1:"somewhere"};
function placeNow(h,s){try{const L=ACAD.livemap;if(!L)return null;const st=L.stateAt(h,600+Math.floor(hash(h+s.week)*180),s.week%5);const r=L.rooms[st.room||st.to];return r?r.name:null}catch(e){return null}}
function replyText(s,h,kind,item,lk,stage,bef){const n=HN(h),rnd=hash(h+kind+s.week+(item||"")),p=placeNow(h,s),pick=a=>a[Math.floor(rnd*a.length)],t=taste(h).split(/[;,.]/)[0]||"";
  const where=p?`I'm writing from ${p.replace(/^The /,"the ")}, `:"";
  if(kind==="letter"){return pick([`${where}so forgive the ink. It was good to hear from you. Tell me everything.`,`${where}between one lesson and the next. Your letter made the hour better.`,`You always write at the right moment. ${where}and grinning at the page like a fool.`,`${where}and I read your letter twice. Write again soon, will you?`])}
  if(kind==="gift"){const it=ITEM[item];if(lk>=2)return pick([`${it.name}! How did you know? I have been wanting exactly this.`,`I have put ${it.name.toLowerCase()} where I can see it. You have no idea how happy this made me.`]);
    if(lk===1)return pick([`${it.name}. That's thoughtful, thank you. I'll enjoy it.`,`Lovely. ${it.name} was a kind thing to send.`]);if(lk===0)return pick([`Thank you for ${it.name.toLowerCase()}. It was sweet of you to think of me.`,`${it.name}, how kind. I'll find a use for it.`]);
    return pick([`Oh. ${it.name}. That is... not quite me, but I do appreciate the thought.`,`${it.name}? Thank you, I think. You can try again.`])}
  if(kind==="call"){return pick([`Your voice carried right across the courtyard. I could listen to you for an hour.`,`${where}and I took your call under the nearest lamp. Don't be a stranger.`,`That was a good call. I laughed more in ten minutes than all week.`])}
  return pick([`You came! The whole Academy was talking about the visitor. Walk with me.`,`It was so good to see you in person. Come, I'll show you my favorite spot.`,`Having you here made the day. Don't make me wait a term for the next one.`])}
G.contact=function(s,h,kind,item){const r=s.rel[h]||(s.rel[h]={bond:0,spark:0,met:false,last:0,said:[]}),cost=kind==="visit"?2:1;
  if(s.cp<cost)return {ok:false,msg:"You have no time left for letters this week."};let money=0;
  if(kind==="gift"){const it=ITEM[item];if(!it)return {ok:false,msg:"Choose a gift."};if(s.money<it.price)return {ok:false,msg:"You can't afford that."};money=it.price}
  if(kind==="visit"){if(s.money<40)return {ok:false,msg:"The coach fare is 40."};money=40}
  s.money-=money;s.cp-=cost;const before=stageOf(r),dbl=s.flags["pledge"+s.year]?1.5:1,t=ties(h);let db=0,ds=0,lk=0;
  if(kind==="letter"){db=2.6;ds=r.bond>=32?.9:.2}
  if(kind==="gift"){lk=liking(h,ITEM[item]);db=[-3,2.2,5,8][lk+1];ds=[-.6,.2,1.4,3][lk+1]}
  if(kind==="call"){db=r.bond>=15?4.2:1.6;ds=r.bond>=25?2:.4}
  if(kind==="visit"){db=7;ds=r.bond>=25?5:1.2}
  if(!r.met){r.met=true;db+=2}
  db*=dbl;if(r.bond<30)ds*=.4;
  let obstacle=null;if(t.couple&&r.spark+ds>42&&r.bond<64){ds=Math.min(ds,Math.max(0,42-r.spark));obstacle=t.couple}
  r.bond=r1(clamp(r.bond+db,0,100));r.spark=r1(clamp(r.spark+ds,0,100));r.last=s.week;
  const after=stageOf(r),msg=replyText(s,h,kind,item,lk,after);r.said=(r.said||[]).concat([{y:s.year,w:s.week,kind,item,text:msg}]).slice(-12);
  const out={ok:true,reply:msg,kind,db:r1(db),ds:r1(ds),stage:after,up:after>before,obstacle,item:item||null,lk};
  if(after>before){s.log.push({y:s.year,w:s.week,t:`${HN(h)} is now ${STAGELABEL[after].toLowerCase()} of the patron.`});for(let k=before+1;k<=after;k++)if(ROMANCE_SCENE[k]){const id=ROMANCE_SCENE[k];if(G.unlockScene(s,h,id)){out.scene=id}}}
  if(after>=6&&r.bond>=92&&G.unlockScene(s,h,"romance-6"))out.scene="romance-6";
  if(obstacle&&!r.warned){r.warned=true;out.note=`${HN(h)} is already seeing ${HN(obstacle)}. Her heart is her own to give; you may go on, but only real trust will move it.`}
  return out};

/* ---------- exports ---------- */
Object.assign(G,{ROMANCE_SCENE,pickField,ACT_ROOMS,slotOfDay,STATS,SID,SNAME,PATHS:STATS,STEPS,ACTIONS,ACT,SLOTS,CONTESTS,CONT,CBYWEEK,TIERS,ITEMS,ITEM,STAGES,STAGELABEL,WEEKS,YEARS,TERMS,aptitude,topStats,ties,stageOf,liking,hasStep,formOf,npcStat,npcBase,pathBonus,taste,
  unlock:(s,h,stat)=>{const w=s.wards[h],i=w.tree[stat]||0,st=STEPS[i];if(!st)return {ok:false,msg:"Mastered."};if(w.sp<st.cost)return {ok:false,msg:"Not enough skill points."};w.sp-=st.cost;w.tree[stat]=i+1;return {ok:true,step:st}},
  enter:(s,cid,h,on)=>{const k=cid+":"+s.year;s.entries[k]=s.entries[k]||{};s.entries[k][h]=!!on},
  entered:(s,cid,h)=>!!(s.entries[cid+":"+s.year]||{})[h]});
})();
