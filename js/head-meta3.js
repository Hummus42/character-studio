/* Everspire: the Headmaster, endgame and life rules (no DOM). The inbox of small events (nothing times out), the Grand League against eight rival academies,
   Eras (an optional fresh start that turns renown into permanent Seals), and titles to collect. Extends ACAD.head. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head.harmony)return;
const H=ACAD.head,G=ACAD.game,HN=ENC.HN,SID=G.SID,hash=H.hash,r1=v=>Math.round(v*10)/10;
const bio=h=>(typeof BIOS==="object"&&BIOS[h])||{},lc=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toLowerCase()+t.slice(1):""};

/* ---------- Eras and Seals ---------- */
const MODS={golden:{name:"Golden Age",text:"Coins come in a quarter faster, and the contest field is a tenth stronger.",inc:1.25,field:1.1,prize:1,cost:1},
  storms:{name:"Era of Storms",text:"Contest prizes are half again as large, and the field is a sixth stronger.",inc:1,field:1.17,prize:1.5,cost:1},
  austerity:{name:"Austerity",text:"Every room costs a quarter less to restore, but coins come in a little slower.",inc:.9,field:1,prize:1,cost:.75}};
H.MODS=MODS;
H.eraMod=s=>MODS[s.flags.eraMod]||{inc:1,field:1,prize:1,cost:1};
H.seals=s=>s.seals||0;
H.costMul=s=>Math.max(.4,Math.pow(.88,s.era||0))*H.eraMod(s).cost;
H.incMul=s=>(1+.01*H.seals(s))*H.eraMod(s).inc;
H.growMul=s=>1+.01*H.seals(s);
H.eraGain=s=>Math.floor(Math.sqrt(s.renown/12));
H.canEra=s=>{if(H.tier(s)<5)return {ok:false,msg:"Renown must reach Mythic first."};if(s.renown<1500)return {ok:false,msg:"Needs 1500 renown to found a new era."};return {ok:true,seals:H.eraGain(s)}};
H.era=(s,mod)=>{const c=H.canEra(s);if(!c.ok)return c;if(!MODS[mod])return {ok:false,msg:"Choose the character of the new era."};
  const gain=H.eraGain(s);s.seals=(s.seals||0)+gain;s.era=(s.era||0)+1;s.flags.eraMod=mod;s.renown=0;s.flags.tier=0;s.rooms={};
  Object.entries(H.ROOMS).forEach(([id,R])=>{if(R.start)s.rooms[id]={lvl:R.start}});s.wardens={};s.funds=300+80*s.seals;s.scouts=[];s.short=[];H.refill(s,true);
  H.note(s,"A new era begins: "+MODS[mod].name+". The academy is rebuilt around the girls you love. +"+gain+" Seals.");return {ok:true,gain}};

/* ---------- the Grand League ---------- */
H.LEAGUE_ACADEMIES=[{id:"harrow",name:"Harrowgate Academy",tag:"Old money and old rules"},{id:"meridian",name:"The Meridian School",tag:"Precision above all"},{id:"calloway",name:"St. Calloway's",tag:"Sporting to the bone"},{id:"ravenmoor",name:"Ravenmoor Hall",tag:"Gothic, patient, quietly ruthless"},
  {id:"isles",name:"The Isles College",tag:"Sailors and storytellers"},{id:"halcyon",name:"Halcyon House",tag:"Sunny, polished, hard to beat at home"},{id:"thornwick",name:"Thornwick Conservatory",tag:"Music, ballet and glasshouses"},{id:"vantage",name:"Vantage Row",tag:"Newcomers with something to prove"}];
H.leagueDay=s=>Math.floor(s.day/360)*360+340;
H.leagueOpen=s=>s.day%360>=340;
H.leagueKey=s=>"L"+Math.floor(s.day/360);
H.power=g=>SID.reduce((t,k)=>t+g.stats[k],0)/6*(H.tierMul?H.tierMul(g):1);
H.leagueTeam=s=>s.order.slice().sort((a,b)=>H.power(s.girls[b])-H.power(s.girls[a])).slice(0,6);
H.leagueStrength=(s,a,div)=>(20+16*div)*(.82+.36*hash(a.id+"|"+div+"|"+Math.floor(s.day/360)))*H.eraMod(s).field;
H.leagueTable=s=>{const lg=s.league||{div:1},rows=H.LEAGUE_ACADEMIES.map(a=>({id:a.id,name:a.name,tag:a.tag,str:H.leagueStrength(s,a,lg.div||1)}));return rows.sort((a,b)=>b.str-a.str)};
H.leagueMine=s=>{const t=H.leagueTeam(s);return t.length?t.reduce((n,h)=>n+H.power(s.girls[h]),0)/t.length*(t.length<6?.6+.4*t.length/6:1):0};
H.playLeague=s=>{if(!H.leagueOpen(s))return {ok:false,msg:"The league final opens late in the year."};s.league=s.league||{div:1,history:[]};const key=H.leagueKey(s);if(s.league.last===key)return {ok:false,msg:"This year's final is done."};
  const team=H.leagueTeam(s);if(team.length<3)return {ok:false,msg:"Enroll at least three girls first."};const mine=H.leagueMine(s)*(.92+.16*hash(s.id+key)),rows=H.leagueTable(s),rank=1+rows.filter(r=>r.str>mine).length;
  const div=s.league.div,prize=Math.round((300+140*div)*[2.2,1.5,1.1,.7,.4,.3,.25,.2,.15][rank-1]*H.eraMod(s).prize),ren=[14,9,6,3,2,1,1,0,0][rank-1]*Math.sqrt(div);
  s.funds+=prize;s.stats.earned+=prize;s.renown+=ren;team.forEach(h=>{s.girls[h].ess+=rank<=3?4:1});let moved=0;if(rank<=3){s.league.div++;moved=1}else if(rank>=8&&div>1){s.league.div--;moved=-1}
  s.league.last=key;s.league.history.push({year:Math.floor(s.day/360)+1,rank,div});const out={ok:true,rank,prize,ren,moved,div:s.league.div,mine:Math.round(mine),rows,team};
  H.note(s,"Grand League, division "+div+": finished "+rank+" of 9"+(moved>0?" and moved up":moved<0?" and dropped a division":"")+".");return out};

/* ---------- titles to collect ---------- */
const sceneCount=s=>Object.values(s.gallery||{}).reduce((t,o)=>t+Object.keys(o).length,0)+(H.sceneCount?H.sceneCount(s):0);
const everEnrolled=s=>new Set([...s.order,...s.alumnae.map(a=>a.h)]).size;
const groupsRepresented=s=>new Set(s.order.map(h=>(ACAD.GROUP_OF(h)||{}).id).filter(Boolean)).size;
H.TITLES=[
 {id:"t_girls10",name:"A Full House",text:"Welcome 10 girls.",have:everEnrolled,need:10},{id:"t_girls40",name:"The Halls Fill",text:"Welcome 40 girls.",have:everEnrolled,need:40},{id:"t_girls100",name:"The Great Roll",text:"Welcome 100 girls.",have:everEnrolled,need:100},
 {id:"t_groups",name:"Every House",text:"Have girls from 10 different houses at once.",have:groupsRepresented,need:10},
 {id:"t_rare",name:"A Rare Eye",text:"Ascend a girl to Rare.",have:s=>s.order.filter(h=>s.girls[h].tier>=2).length,need:1},{id:"t_legend",name:"Legend Maker",text:"Ascend a girl to Legendary.",have:s=>s.order.filter(h=>s.girls[h].tier>=3).length,need:1},
 {id:"t_mythic",name:"Myth in the Halls",text:"Ascend a girl to Mythic.",have:s=>s.order.filter(h=>s.girls[h].tier>=4).length,need:1},{id:"t_five",name:"Five Stars",text:"Have five girls at Legendary or better.",have:s=>s.order.filter(h=>s.girls[h].tier>=3).length,need:5},
 {id:"t_gold",name:"Gold Collector",text:"Win 10 contests with gold.",have:s=>s.trophies.filter(t=>t.rank===1).length,need:10},{id:"t_gold50",name:"Hall of Gold",text:"Win 50 contests with gold.",have:s=>s.trophies.filter(t=>t.rank===1).length,need:50},
 {id:"t_gild",name:"Gilded Age",text:"Gild five rooms to the maximum.",have:s=>Object.values(s.rooms).filter(r=>(r.gild||0)>=H.MAXGILD).length,need:5},
 {id:"t_wings",name:"Both Wings",text:"Open every door of the Lattice and the Starless Court.",have:s=>(s.gates.lattice>=3?1:0)+(s.gates.starless>=3?1:0),need:2},
 {id:"t_court",name:"A Full Court",text:"Have five girls courting at once.",have:s=>H.court(s).length,need:5},{id:"t_moments",name:"Memory Keeper",text:"Keep 25 moments in the scrapbooks.",have:sceneCount,need:25},{id:"t_moments100",name:"The Long Album",text:"Keep 100 moments in the scrapbooks.",have:sceneCount,need:100},
 {id:"t_league",name:"League Table",text:"Win the Grand League.",have:s=>((s.league||{}).history||[]).filter(x=>x.rank===1).length,need:1},{id:"t_era",name:"Founder",text:"Found a new era.",have:s=>s.era||0,need:1}];
H.titlesDone=s=>H.TITLES.filter(t=>(s.titles||[]).includes(t.id));

/* ---------- the inbox ---------- */
const TYPES={
 rivals:{pick:s=>{for(const h of s.order){const t=G.ties(h);const r=t.rivals.find(x=>s.girls[x[0]]);if(r&&hash(h+s.day+"rv")<.8)return {h,h2:r[0]}}return null},
  text:(s,n)=>HN(n.h)+" and "+HN(n.h2)+" have been sniping at each other in the corridors again. Neither will back down.",
  choices:[{label:"Let them settle it themselves",fx:(s,n)=>{[n.h,n.h2].forEach(h=>{s.girls[h].ess+=2});return "They work it out between them, loudly. Both come out sharper."}},{label:"Set them a project together",fx:(s,n)=>{[n.h,n.h2].forEach(h=>{s.girls[h].ess+=3;s.girls[h].mood=Math.min(100,s.girls[h].mood+3)});return "The project pulls them in. By the end they are almost civil."}},{label:"Separate their rooms (50 coins)",cost:50,fx:(s,n)=>{[n.h,n.h2].forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+5)});return "Quiet returns to the corridor."}}]},
 homesick:{pick:s=>{const low=s.order.filter(h=>s.girls[h].mood<62);return low.length?{h:low[Math.floor(hash(s.day+"hs")*low.length)]}:null},
  text:(s,n)=>HN(n.h)+" has been quiet at meals, and the other girls have noticed. "+(bio(n.h).birthplace?"She has been looking toward "+lc(bio(n.h).birthplace)+".":""),
  choices:[{label:"Spend an evening with her",fx:(s,n)=>{const g=s.girls[n.h];g.mood=Math.min(100,g.mood+18);g.aff+=3;return "You sit with her until she laughs. She sleeps well that night."}},{label:"Send for something from home (40 coins)",cost:40,fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+14);s.girls[n.h].ess+=1;return "A parcel arrives. She keeps the wrapping."}},{label:"Give her a free afternoon",fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+8);return "She walks the grounds alone and comes back lighter."}}]},
 alumna:{pick:s=>s.alumnae.length?{h:s.alumnae[Math.floor(hash(s.day+"al")*s.alumnae.length)].h}:null,
  text:(s,n)=>"A letter from "+HN(n.h)+", who graduated and has not forgotten the academy. She wants to give something back.",
  choices:[{label:"Accept her gift gladly",fx:(s,n)=>{const c=120+40*H.tier(s);s.funds+=c;return "She sends "+c+" coins and a line about the lanterns."}},{label:"Ask her to speak at the next assembly",fx:(s,n)=>{s.renown+=3;return "She comes back for a day. The younger girls hang on every word."}}]},
 couple:{pick:s=>{for(const h of s.order){const c=G.ties(h).couple;if(c&&s.girls[c]&&hash(h+s.day+"cp")<.7)return {h,h2:c}}return null},
  text:(s,n)=>HN(n.h)+" and "+HN(n.h2)+" have been seen walking the cloister together at dusk. Everyone has noticed except them.",
  choices:[{label:"Arrange a little celebration (60 coins)",cost:60,fx:(s,n)=>{[n.h,n.h2].forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+12)});s.renown+=1;return "The dining hall is hung with lanterns. They pretend it is for something else."}},{label:"Keep quiet and smile",fx:(s,n)=>{[n.h,n.h2].forEach(h=>{s.girls[h].ess+=1.5});return "You say nothing, which is the kindest thing."}}]},
 visitor:{pick:s=>H.tier(s)>=1?{}:null,
  text:s=>"A visitor from the town has come to look at the academy. They are wealthy, curious and very polite.",
  choices:[{label:"Show them the best rooms",fx:(s,n)=>{const c=60+25*H.tier(s);s.funds+=c;return "They leave a donation of "+c+" coins and a card."}},{label:"Let the girls show them around",fx:(s,n)=>{s.renown+=2;s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+1)});return "The girls make a better impression than any brochure."}}]},
 bond:{pick:s=>null,text:(s,n)=>{const b=bio(n.h),nm=HN(n.h),st=n.stage,ct=String(b.catchphrase||"").replace(/["“”]/g,"");
   return [null,nm+" stops to greet you in the corridor now, and remembers your name."+(ct?" \""+ct+"\", she says, and walks on grinning.":""),nm+" has started saving you a seat at breakfast"+(b.favDrink?", with "+lc(b.favDrink)+" already poured":"")+".",
   nm+" tells you something she has not told the others: "+(lc((b.fears||"").split(";")[0])||"she is afraid of being ordinary")+". You do not laugh.",nm+" trusts you with what she wants most: "+(lc((b.dreams||"").split(";")[0])||"a life she has not planned")+".",
   nm+" asks if you would walk the cloister with her at dusk, and the whole academy pretends not to notice.",nm+" leaves a lamp lit in your study window, every night, and says it is for the moths."][st]||nm+" smiles at you across the hall."},
  choices:[{label:"Keep it close",fx:(s,n)=>{const g=s.girls[n.h];if(g){g.ess+=2;g.mood=Math.min(100,g.mood+6)}return "You keep it, quietly, the way you keep things that matter."}}]},
 bakesale:{pick:s=>s.order.length>=4?{}:null,text:s=>"The girls want to run a bake sale at the gate on Saturday, and have already argued over the prices.",choices:[{label:"Back the stall (30 coins)",cost:30,fx:(s,n)=>{const c=110+15*H.tier(s);s.funds+=c;return "It sells out by noon. They clear "+c+" coins and keep the leftovers."}},{label:"Let them run it as they like",fx:(s,n)=>{s.funds+=50;return "A smaller, messier, happier sale. Fifty coins and a lot of flour."}}]},
 leak:{pick:s=>s.order.length>=3?{}:null,text:s=>"Rain overnight, and the roof of a dormitory has found every weak slate. Buckets everywhere.",choices:[{label:"Pay for a proper repair (90 coins)",cost:90,fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+3)});return "Dry by evening. The girls cheer the roofer."}},{label:"Hand out buckets and make a game of it",fx:(s,n)=>{s.order.slice(0,6).forEach(h=>{s.girls[h].ess+=1});return "The bucket brigade becomes an academy legend."}}]},
 exams:{pick:s=>s.order.length>=4?{}:null,text:s=>"Exam week, and the library has not been this full in months. Tempers are short.",choices:[{label:"Open a late study hall",fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].ess+=.6});return "Tea, lamps and silence. It works."}},{label:"Give everyone one night off",fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+4)});return "A night of nothing in particular does everyone good."}}]},
 festival:{pick:s=>s.order.length>=6?{}:null,
  text:s=>"The season turns and the girls are asking for a festival. A few lanterns, a few tables, something sweet.",
  choices:[{label:"Hold a modest festival (80 coins)",cost:80,fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+6)});s.renown+=2;return "Paper lanterns in the cloister, and the whole academy comes out."}},{label:"Tell them next season",fx:(s,n)=>"They groan, and agree. It is a good thing to look forward to."}]}};
H.NOTICE_TYPES=TYPES;
H.noticeText=(s,n)=>TYPES[n.type].text(s,n);
H.inboxOpen=s=>(s.inbox||[]).filter(n=>!n.done);
H.newNotice=s=>{s.inbox=s.inbox||[];s.noticeSeq=(s.noticeSeq||0)+1;const kinds=Object.keys(TYPES);const order=kinds.slice().sort((a,b)=>hash(a+s.day+s.noticeSeq)-hash(b+s.day+s.noticeSeq));
  for(const k of order){const n=TYPES[k].pick(s);if(n){if(H.inboxOpen(s).some(x=>x.type===k&&x.h===n.h))continue;s.inbox.push(Object.assign({id:s.noticeSeq,type:k,day:s.day},n));if(s.inbox.length>40)s.inbox.splice(0,s.inbox.length-40);return true}}return false};
H.resolveNotice=(s,id,ix)=>{const n=(s.inbox||[]).find(x=>x.id===id);if(!n||n.done)return {ok:false,msg:"Already handled."};const ch=TYPES[n.type].choices[ix];if(!ch)return {ok:false,msg:"No such choice."};
  if(ch.cost&&s.funds<ch.cost)return {ok:false,msg:"Needs "+ch.cost+" coins."};if(ch.cost){s.funds-=ch.cost;s.stats.spent+=ch.cost}const text=ch.fx(s,n);n.done=true;n.result=text;n.choice=ix;return {ok:true,text}};
H.noticeChoices=n=>TYPES[n.type].choices;

H.bond=(s,h,stage)=>{s.inbox=s.inbox||[];s.noticeSeq=(s.noticeSeq||0)+1;s.inbox.push({id:s.noticeSeq,type:"bond",day:s.day,h,stage})};
/* ---------- daily: notices, titles ---------- */
H.dayHooks.push(s=>{s.titles=s.titles||[];s.inbox=s.inbox||[];
  if(s.day%5===0&&H.inboxOpen(s).length<5)H.newNotice(s);
  H.TITLES.forEach(t=>{if(!s.titles.includes(t.id)&&t.have(s)>=t.need){s.titles.push(t.id);s.seals=(s.seals||0)+1;s.renown+=2;H.note(s,"Title earned: "+t.name+". +1 Seal.")}});
  return 0});

/* ---------- hook the multipliers into the core ---------- */
const costOf=H.canBuild;
H.canBuild=(s,id)=>{const r=costOf(s,id),R=H.ROOMS[id];if(!R||R.k==="sealed")return r;if(r.ok||r.cost!=null){const lv=H.lvlOf(s,id),cc=Math.round(H.roomCost(id,lv)*H.costMul(s)/5)*5;return s.funds<cc?{ok:false,msg:"Needs "+cc+" coins.",cost:cc}:{ok:true,cost:cc}}return r};
const fx0=H.fix;H.fix=s=>{fx0(s);s.inbox=s.inbox||[];s.titles=s.titles||[];s.seals=s.seals||0;s.era=s.era||0;s.league=s.league||{div:1,history:[]};return s};
})();
