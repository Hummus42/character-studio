/* Everspire: Climb the Spire, the engine. Fixed-step simulation of one floor: movement, waves, weapons, evolutions, experience, bosses.
   No DOM here: the UI feeds it input and draws it. C.Run(...).step(dt) and .draw(ctx,w,h). */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.WEAPONS)return;
const C=ACAD.climb,W=C.WEAPONS,PS=C.PASSIVES,EN=C.ENEMY,rnd=Math.random,TAU=Math.PI*2,hypot=Math.hypot;
const XPS=.38,SLOTS=6,MAXT=600,BOSS_T=540,ARENA=1100;
const need=L=>Math.max(L===1?7:0,Math.round((L<=19?10*L-5:195+13*(L-19)+(L===20?600:0))*XPS));
C.xpNeed=need;
const pick=a=>a[Math.floor(rnd()*a.length)];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;

/* ---------- procedural enemy art, recoloured per floor ---------- */
const sprCache={};
function enemySprite(kind,acc,dark){const key=kind+acc+dark;if(sprCache[key])return sprCache[key];const c=document.createElement("canvas");c.width=c.height=48;const g=c.getContext("2d");g.translate(24,26);
  const body="#3a2f58",rim=acc;g.lineWidth=2;g.strokeStyle=rim;g.fillStyle=body;
  const eyes=(x,y,s)=>{g.fillStyle="#fff";g.beginPath();g.arc(x-s,y,s*.8,0,TAU);g.arc(x+s,y,s*.8,0,TAU);g.fill();g.fillStyle="#ff3a5a";g.beginPath();g.arc(x-s,y,s*.4,0,TAU);g.arc(x+s,y,s*.4,0,TAU);g.fill()};
  if(kind==="bat"){g.beginPath();g.moveTo(-4,0);g.quadraticCurveTo(-14,-14,-22,-4);g.quadraticCurveTo(-16,-2,-14,6);g.quadraticCurveTo(-8,2,-4,8);g.lineTo(4,8);g.quadraticCurveTo(8,2,14,6);g.quadraticCurveTo(16,-2,22,-4);g.quadraticCurveTo(14,-14,4,0);g.closePath();g.fill();g.stroke();g.beginPath();g.ellipse(0,2,6,8,0,0,TAU);g.fill();g.stroke();eyes(0,0,2.4)}
  else if(kind==="blob"){g.beginPath();g.moveTo(-14,10);g.bezierCurveTo(-18,-6,-8,-16,0,-14);g.bezierCurveTo(10,-16,18,-6,14,10);g.bezierCurveTo(8,14,-8,14,-14,10);g.fill();g.stroke();eyes(0,-2,3.2);g.fillStyle=rim;g.globalAlpha=.5;g.beginPath();g.arc(-6,-9,3,0,TAU);g.fill();g.globalAlpha=1}
  else if(kind==="wisp"){const gr=g.createRadialGradient(0,-2,1,0,-2,14);gr.addColorStop(0,"#fff");gr.addColorStop(.4,rim);gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.beginPath();g.arc(0,-2,14,0,TAU);g.fill();g.fillStyle=rim;g.beginPath();g.moveTo(-6,2);g.quadraticCurveTo(0,20,6,2);g.fill();eyes(0,-3,2.2)}
  else if(kind==="shade"){g.beginPath();g.moveTo(-14,14);g.quadraticCurveTo(-18,-14,0,-16);g.quadraticCurveTo(18,-14,14,14);g.lineTo(8,10);g.lineTo(3,15);g.lineTo(-3,10);g.lineTo(-8,15);g.closePath();g.fill();g.stroke();g.fillStyle="#fff";g.beginPath();g.ellipse(-5,-5,2.4,4,0,0,TAU);g.ellipse(5,-5,2.4,4,0,0,TAU);g.fill()}
  else if(kind==="thorn"){g.beginPath();for(let i=0;i<14;i++){const a=i/14*TAU,r=i%2?9:17;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fill();g.stroke();eyes(0,0,2.8)}
  else if(kind==="archer"){g.beginPath();g.moveTo(-12,14);g.quadraticCurveTo(-16,-12,0,-16);g.quadraticCurveTo(16,-12,12,14);g.closePath();g.fill();g.stroke();g.strokeStyle=rim;g.lineWidth=2.5;g.beginPath();g.arc(15,0,12,-1.2,1.2);g.stroke();g.beginPath();g.moveTo(13,-10);g.lineTo(13,10);g.lineWidth=1;g.stroke();g.fillStyle="#fff";g.beginPath();g.ellipse(-4,-5,2,3.5,0,0,TAU);g.ellipse(4,-5,2,3.5,0,0,TAU);g.fill()}
  else if(kind==="charger"){g.beginPath();g.ellipse(0,2,17,13,0,0,TAU);g.fill();g.stroke();g.fillStyle=rim;g.beginPath();g.moveTo(-12,-8);g.lineTo(-20,-20);g.lineTo(-6,-10);g.moveTo(12,-8);g.lineTo(20,-20);g.lineTo(6,-10);g.fill();eyes(0,-1,3.2)}
  else if(kind==="splitter"){g.beginPath();g.arc(-6,2,11,0,TAU);g.arc(7,0,12,0,TAU);g.fill();g.stroke();g.fillStyle=rim;g.globalAlpha=.4;g.beginPath();g.arc(0,2,5,0,TAU);g.fill();g.globalAlpha=1;eyes(0,-2,3)}
  else{g.fillRect(-14,-12,28,26);g.strokeRect(-14,-12,28,26);g.beginPath();g.arc(0,0,9,0,TAU);g.stroke();for(let i=0;i<8;i++){const a=i/8*TAU;g.fillStyle=rim;g.fillRect(Math.cos(a)*10-1.5,Math.sin(a)*10-1.5,3,3)}eyes(0,-1,3)}
  return sprCache[key]=c}

/* ---------- the run ---------- */
class Run{
 constructor(o){this.hero=o.hero;this.fl=o.floor;this.fi=o.floorIndex||0;this.bossId=o.boss;this.meta=o.meta||{};this.kit=C.heroKit(o.hero);this.floor=C.FLOORS[this.fi];
  this.t=0;this.px=0;this.py=0;this.face=1;this.fx=1;this.fy=0;this.dir=[0,0];this.moved=0;this.still=0;this.lastDrop=[0,0];
  this.lv=1;this.xp=0;this.kills=0;this.gold=0;this.hp=1;this.invuln=0;this.shield=0;this.revives=0;this.dead=false;this.won=false;this.pending=0;this.paused=false;this.ended=false;
  this.en=[];this.pr=[];this.zn=[];this.gems=[];this.pk=[];this.tx=[];this.pt=[];this.eb=[];this.later=[];this.rings=[];this.bolts=[];
  this.wp=[];this.pa={};this.nid=1;this.shake=0;this.flash=0;this.flashC="#fff";this.freeze=0;this.spawnT=0;this.ev={};this.bossE=null;this.stats=null;this.hush=null;
  this.rr=(this.meta.up&&this.meta.up.reroll)||0;this.sk=(this.meta.up&&this.meta.up.skip)||0;this.bn=(this.meta.up&&this.meta.up.banish)||0;this.banished={};
  this.img=new Image();this.img.src="assets/sprites/"+o.hero+".256.webp";this.bossImg=null;if(o.boss){this.bossImg=new Image();this.bossImg.src="assets/sprites/"+o.boss+".256.webp"}
  this.recompute();this.hp=this.stats.maxhp;this.revives=this.stats.revive;this.addWeapon(this.kit.start);this.tile=null;this.cb={}}
 /* ----- stats ----- */
 recompute(){const k=this.kit,P={might:k.might,armor:k.armor,maxhp:1,regen:0,cooldown:1,area:1,speed:1,dur:1,amount:0,move:k.move,magnet:1,luck:1,growth:1,greed:1,curse:1,revive:0};
  const add=(o,m=1)=>{for(const s in o)P[s]+=o[s]*m};
  const up=this.meta.up||{};C.UPGRADES.forEach(u=>{const r=up[u.k]||0;if(r)add(u.st,r)});add(k.trait.f(this.lv));
  for(const id in this.pa)add(PS[id].per,this.pa[id]);
  const tm=this.meta.tierMul||1;P.might*=tm;P.cooldown=Math.max(.3,P.cooldown);P.maxhp=Math.round(k.hp*P.maxhp*(1+(tm-1)));P.luck=Math.max(.5,P.luck);
  const old=this.stats;this.stats=P;if(old&&P.maxhp>old.maxhp)this.hp+=P.maxhp-old.maxhp;this.wp.forEach(w=>this.wstats(w))}
 wstats(w){const b=w.def.base,m=w.mod,P=this.stats,s=w.s=w.s||{};
  s.dmg=((b.dmg||0)+m.dmg)*P.might;s.amt=Math.max(1,(b.amt||1)+m.amt+(b.amt?P.amount:0));s.cd=Math.max(.12,((b.cd||0)+m.cd)*(w.def.b==="whip"||w.def.b==="shot"||true?P.cooldown:1));
  s.area=((b.area||1)+m.area)*P.area;s.speed=((b.speed||1)+m.speed)*P.speed;s.dur=((b.dur||1)+m.dur)*P.dur;s.pierce=(b.pierce||1)+m.pierce;s.iv=Math.max(.02,(b.iv||.1)+m.iv)}
 /* ----- items ----- */
 modsFor(def,lv){const m={dmg:0,amt:0,cd:0,area:0,speed:0,dur:0,pierce:0,iv:0};(def.up||[]).slice(0,lv-1).forEach(u=>u.split(" ").forEach(t=>{const g=/^([a-z]+)([+-])([\d.]+)$/.exec(t);if(g)m[g[1]]+=(g[2]==="-"?-1:1)*parseFloat(g[3])}));return m}
 addWeapon(id){const def=W[id],w={id,def,lv:1,cd:0,ph:0,mod:this.modsFor(def,1),ang:rnd()*TAU,act:0,books:[]};this.wp.push(w);this.wstats(w);return w}
 weaponLv(id,lv){const w=this.wp.find(x=>x.id===id);if(!w)return;w.lv=lv;w.mod=this.modsFor(w.def,lv);this.wstats(w);w.cd=0}
 maxLvW(w){return w.def.evolved?1:C.maxLv(w.id)}
 describeUp(def,lv){if(lv<=1)return def.d;const s=def.up[lv-2]||"";return s.split(" ").map(t=>{const g=/^([a-z]+)([+-])([\d.]+)$/.exec(t);if(!g)return t;const n=parseFloat(g[3]),sg=g[2]==="-"?"-":"+";
   return {amt:sg+n+" projectile"+(n>1?"s":""),dmg:sg+n+" damage",area:sg+Math.round(n*100)+"% area",cd:sg+n+"s cooldown",speed:sg+Math.round(n*100)+"% speed",dur:sg+n+"s duration",pierce:sg+n+" pierce",iv:sg+n+"s interval"}[g[1]]||t}).join(", ")}
 choices(){const o=[],ow=id=>this.wp.find(w=>w.id===id),luck=this.stats.luck;
  const wslots=this.wp.length<SLOTS,pslots=Object.keys(this.pa).length<SLOTS;
  Object.keys(W).forEach(id=>{const d=W[id];if(d.evolved||this.banished[id])return;const w=ow(id);if(w){if(w.lv<this.maxLvW(w))o.push({type:"weapon",id,lv:w.lv+1,wt:d.rar*1.6})}else if(wslots)o.push({type:"weapon",id,lv:1,wt:d.rar})});
  Object.keys(PS).forEach(id=>{if(this.banished[id])return;const l=this.pa[id]||0;if(l){if(l<PS[id].max)o.push({type:"passive",id,lv:l+1,wt:70*1.6})}else if(pslots)o.push({type:"passive",id,lv:1,wt:(id==="revive"?20:id==="curse"?40:80)})});
  const n=3+(rnd()<1-1/(1+luck*.6)?1:0),out=[];
  while(out.length<n&&o.length){const tot=o.reduce((s,x)=>s+x.wt,0);let r=rnd()*tot,i=0;for(;i<o.length-1;i++){r-=o[i].wt;if(r<=0)break}out.push(o.splice(i,1)[0])}
  if(!out.length){out.push({type:"heal",id:"chicken",lv:0},{type:"gold",id:"gold",lv:0})}
  return out}
 apply(ch){if(ch.type==="weapon"){if(ch.lv===1)this.addWeapon(ch.id);else this.weaponLv(ch.id,ch.lv)}
  else if(ch.type==="passive"){this.pa[ch.id]=ch.lv;this.recompute()}else if(ch.type==="heal")this.heal(40);else if(ch.type==="gold")this.gold+=25;
  this.invuln=Math.max(this.invuln,.5)}
 label(ch){if(ch.type==="weapon"){const d=W[ch.id];return {n:d.n,ic:d.ic,lv:ch.lv,d:this.describeUp(d,ch.lv),c:d.c,evo:d.evo?PS[d.evo[0]].n:""}}
  if(ch.type==="passive"){const d=PS[ch.id];return {n:d.n,ic:d.ic,lv:ch.lv,d:d.d,c:"#9ad8ff"}}
  return ch.type==="heal"?{n:"Floor Feast",ic:"🍗",lv:0,d:"Heals 40 health",c:"#ffb15a"}:{n:"Purse of Coins",ic:"💰",lv:0,d:"+25 gold",c:"#ffd24a"}}
 /* evolutions: a maxed weapon with its passive evolves from a chest */
 evolvable(){const out=[];this.wp.forEach(w=>{const d=w.def;if(d.evolved)return;if(d.evo&&w.lv>=this.maxLvW(w)&&this.pa[d.evo[0]])out.push({from:[w.id],to:d.evo[1]});
   if(d.union){const o=this.wp.find(x=>x.id===d.union[0]);if(o&&w.lv>=this.maxLvW(w)&&o.lv>=this.maxLvW(o)&&w.id<o.id)out.push({from:[w.id,o.id],to:d.union[1]})}});return out}
 openChest(n){const got=[];for(let i=0;i<n;i++){const ev=this.evolvable()[0];
   if(ev){ev.from.forEach(id=>{const k=this.wp.findIndex(w=>w.id===id);if(k>=0)this.wp.splice(k,1)});const w=this.addWeapon(ev.to);got.push({kind:"evo",id:ev.to,from:ev.from});this.burst(this.px,this.py,W[ev.to].c,40,260);continue}
   const cs=this.choices().filter(c=>c.type!=="heal"&&c.type!=="gold"&&c.lv>1);
   if(cs.length){const ch=pick(cs);this.apply(ch);got.push({kind:"up",ch})}else{this.gold+=50;got.push({kind:"gold"})}}
  this.flash=.5;this.flashC="#ffe9a0";return got}
 heal(n){this.hp=Math.min(this.stats.maxhp,this.hp+n)}
 /* ----- helpers ----- */
 view(){return [this.vw||640,this.vh||400]}
 nearestE(n=1,range=520){const r=[];for(const e of this.en){const d=Math.hypot(e.x-this.px,e.y-this.py);if(d<range)r.push([d,e])}r.sort((a,b)=>a[0]-b[0]);return r.slice(0,n).map(x=>x[1])}
 randE(range=480){const l=this.en.filter(e=>Math.abs(e.x-this.px)<range&&Math.abs(e.y-this.py)<range*.75);return l.length?pick(l):null}
 later_(t,fn){this.later.push({t,fn})}
 burst(x,y,c,n=8,sp=140,life=.5){for(let i=0;i<n;i++){const a=rnd()*TAU,s=sp*(.3+rnd()*.7);this.pt.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:life*(.6+rnd()*.6),m:life,c,s:2+rnd()*3})}}
 ring(x,y,r,c,life=.4){this.rings.push({x,y,r,c,l:life,m:life})}
 text(x,y,s,c="#fff",big){this.tx.push({x,y,s,c,l:.7,big})}
 /* ----- hits ----- */
 hurt(e,dmg,o={}){if(e.dead)return;if(this.stats&&o.src&&o.src.def&&o.src.def.b==="gale"&&rnd()<.05)dmg*=2;e.hp-=dmg;e.flash=.1;if(!o.quiet)this.text(e.x,e.y-e.r,Math.round(dmg),o.c||"#fff");
  if(o.kb&&!e.boss&&!e.elite){const a=Math.atan2(e.y-this.py,e.x-this.px);e.kx+=Math.cos(a)*o.kb;e.ky+=Math.sin(a)*o.kb}
  if(o.heal&&rnd()<.5)this.heal(o.heal);
  if(e.hp<=0)this.kill(e)}
 kill(e){if(e.dead)return;e.dead=true;this.kills++;this.burst(e.x,e.y,e.col||"#fff",e.boss?40:6,e.boss?260:120,.4);
  if(e.boss){this.won=true;this.bossE=null;this.drop("chest",e.x,e.y,3);this.flash=.8;this.flashC="#fff";this.shake=1;this.endAt=this.t+2.2;this.eb.length=0}
  else if(e.elite){this.drop("chest",e.x,e.y,1);this.shake=.4}
  else{if(EN[e.k]&&EN[e.k].split){for(let i=0;i<2;i++){const c=this.mk("blob",e.x+(i?14:-14),e.y,{});c.hp=c.mhp=c.mhp*.4;c.r*=.75;c.xp=1}}
   const xp=e.xp*(this.stats.curse>1?this.stats.curse:1);this.gems.push({x:e.x,y:e.y,v:xp,t:0});if(rnd()<.0025)this.drop("magnet",e.x,e.y);else if(rnd()<.002)this.drop("bomb",e.x,e.y);
   if(rnd()<.07*this.stats.luck){this.drop("coin",e.x,e.y,1)}else if(rnd()<.004*this.stats.luck)this.drop("chicken",e.x,e.y)}}
 drop(k,x,y,n){this.pk.push({k,x,y,n:n||1,t:0})}
 /* ----- weapons ----- */
 fireWeapon(w){const s=w.s,b=w.def.b,d=w.def;const me=this;
  const proj=(x,y,vx,vy,o)=>{const p=Object.assign({x,y,vx,vy,r:7*s.area,dmg:s.dmg,pierce:s.pierce,life:2,hit:new Set(),w,c:d.c,t:0,kind:"shot"},o);this.pr.push(p);return p};
  if(b==="whip"){for(let i=0;i<s.amt;i++)this.later_(i*s.iv*1.4,()=>{const side=(i%2===0?1:-1)*this.face;this.zn.push({shape:"rect",x:this.px+side*60*s.area,y:this.py-6,w:150*s.area,h:58*s.area,life:.2,m:.2,dmg:s.dmg,hit:new Set(),wp:w,c:d.c,side,kb:60,heal:d.lifesteal?2:0,kind:"whip"})})}
  else if(b==="shot"){for(let i=0;i<s.amt;i++)this.later_(i*s.iv,()=>{let ax=this.fx,ay=this.fy;if(d.aim==="near"){const e=this.nearestE(1)[0];if(e){const a=Math.atan2(e.y-this.py,e.x-this.px);ax=Math.cos(a);ay=Math.sin(a)}}
     else if(d.aim==="rand"){const e=this.randE();if(e){const a=Math.atan2(e.y-this.py,e.x-this.px);ax=Math.cos(a);ay=Math.sin(a)}else{const a=rnd()*TAU;ax=Math.cos(a);ay=Math.sin(a)}}
     else{const j=(i-(s.amt-1)/2)*.06;let a=Math.atan2(ay,ax);const q=this.nearestE(1,420)[0];if(q){let df=Math.atan2(q.y-this.py,q.x-this.px)-a;df=Math.atan2(Math.sin(df),Math.cos(df));if(Math.abs(df)<1.2)a+=df*.7}a+=j;ax=Math.cos(a);ay=Math.sin(a)}
     const sp=330*s.speed;proj(this.px,this.py,ax*sp,ay*sp,{r:(d.boom?11:6)*Math.max(1,s.area*.8),boom:d.boom,ic:d.aim==="rand"?"fire":"",life:2.2,kb:30})})}
  else if(b==="axe"){const n=d.spiral?s.amt*3:s.amt;for(let i=0;i<n;i++)this.later_(i*s.iv,()=>{if(d.spiral){const a=i/n*TAU;proj(this.px,this.py,Math.cos(a)*220,Math.sin(a)*220,{kind:"spin",r:17*s.area,turn:.9,life:2.6,rot:0,ic:d.ic,kb:80})}
     else proj(this.px,this.py,(rnd()*2-1)*90+this.face*40,-430,{kind:"arc",r:16*s.area,life:2.4,g:950,ic:d.ic,kb:80})})}
  else if(b==="boomerang"){const t0=this.nearestE(Math.ceil(s.amt));for(let i=0;i<s.amt;i++)this.later_(i*s.iv*2,()=>{const e=t0[i%Math.max(1,t0.length)];let a=e?Math.atan2(e.y-this.py,e.x-this.px):rnd()*TAU;const sp=360*s.speed;
     proj(this.px,this.py,Math.cos(a)*sp,Math.sin(a)*sp,{kind:"boom",v0:sp,a,r:15*s.area,ph:0,pierce:9999,life:5,ic:d.ic,trail:d.trail,kb:50})})}
  else if(b==="orbit"){w.act=d.forever?1e9:s.dur;w.cd=d.forever?9999:s.cd+s.dur}
  else if(b==="aura"){const R=62*s.area;this.ring(this.px,this.py,R,d.c,.35);this.en.forEach(e=>{if(Math.hypot(e.x-this.px,e.y-this.py)<R+e.r)this.hurt(e,s.dmg,{kb:25,c:d.c,heal:d.lifesteal?1:0,src:w})})}
  else if(b==="pool"){for(let i=0;i<s.amt;i++)this.later_(i*.2,()=>{const e=this.randE(380);const x=e?e.x:this.px+(rnd()*2-1)*220,y=e?e.y:this.py+(rnd()*2-1)*160;this.zn.push({shape:"circ",x,y,r:48*s.area,life:s.dur,m:s.dur,dmg:s.dmg,tick:s.iv,tt:0,wp:w,c:d.c,roam:d.roam,kind:"pool"})})}
  else if(b==="bounce"||b==="wander"){for(let i=0;i<s.amt;i++){const a=rnd()*TAU,sp=(b==="wander"?200:300)*s.speed;proj(this.px,this.py,Math.cos(a)*sp,Math.sin(a)*sp,{kind:"bnc",r:(b==="wander"?13:15)*s.area,life:s.dur,rehit:.45,hh:new Map(),boom:d.boom,erratic:b==="wander",ic:d.ic,pierce:9999,heal:d.lifesteal?1:0,kb:40})}}
  else if(b==="strike"){for(let i=0;i<s.amt;i++)this.later_(i*s.iv,()=>{const e=this.randE(500);const x=e?e.x:this.px+(rnd()*2-1)*260,y=e?e.y:this.py+(rnd()*2-1)*180;const hit=()=>{this.bolts.push({x,y,l:.25,m:.25,c:d.c});this.ring(x,y,38*s.area,d.c,.3);this.en.forEach(q=>{if(Math.hypot(q.x-x,q.y-y)<38*s.area+q.r)this.hurt(q,s.dmg,{c:d.c,kb:20,src:w})})};hit();if(d.twice)this.later_(.25,hit)})}
  else if(b==="purge"){this.flash=.6;this.flashC=d.c;this.shake=.5;this.ring(this.px,this.py,520,d.c,.7);let k=0;this.en.slice().forEach(e=>{if(e.boss||e.elite)this.hurt(e,e.mhp*.1,{quiet:1});else{k++;this.kill(e)}});if(d.pull)this.gems.forEach(g=>g.pull=1)}
  else if(b==="spray"){const shots=Math.max(1,Math.round(s.amt)),dirs=d.both?[1,-1]:[d.dir];for(let i=0;i<shots;i++)this.later_(i*s.iv,()=>{dirs.forEach(dr=>{w.ang+=dr*.62;proj(this.px,this.py,Math.cos(w.ang)*300*s.speed,Math.sin(w.ang)*300*s.speed,{r:7*s.area,life:1.6,kb:30})})})}
  else if(b==="column"){for(let i=0;i<s.amt;i++)this.later_(i*.22,()=>{const x=this.px+(rnd()*2-1)*170,dir=rnd()<.5?1:-1;this.zn.push({shape:"rect",x:x,y:this.py,w:38*s.area,h:640,life:s.dur,m:s.dur,vx:dir*160,dmg:s.dmg,hit:new Set(),wp:w,c:d.c,kind:"col",kb:20})})}
  else if(b==="freeze"){this.ring(this.px,this.py,520*s.area,d.c,.6);this.en.forEach(e=>{if(!e.boss)e.fz=s.dur;else e.fz=s.dur*.3});this.freeze=s.dur;this.flash=.15;this.flashC=d.c}
  else if(b==="shield"){this.shield=s.dur;this.ring(this.px,this.py,70,d.c,.4)}
  else if(b==="gale"){const mv=1+Math.min(1,this.moved/3);for(let i=0;i<s.amt;i++){const a=Math.atan2(this.fy,this.fx)+(rnd()*2-1)*.9;proj(this.px,this.py,Math.cos(a)*440,Math.sin(a)*440,{r:12*s.area,dmg:s.dmg*mv,life:s.dur+.4,pierce:99,kb:15,crit:1})}}
  }
 updWeapons(dt){for(const w of this.wp){const b=w.def.b,s=w.s;
   if(b==="orbit"){if(w.act>0){w.act-=dt;w.ang+=dt*3*s.speed;const n=Math.round(s.amt),R=78*s.area;w.books=[];for(let i=0;i<n;i++){const a=w.ang+i/n*TAU;w.books.push({x:this.px+Math.cos(a)*R,y:this.py+Math.sin(a)*R,r:17*s.area})}
       w.books.forEach(bk=>{for(const e of this.en){if(Math.hypot(e.x-bk.x,e.y-bk.y)<bk.r+e.r){const t=e.hc=e.hc||{};if((t[w.id]||0)<=this.t){t[w.id]=this.t+.5;this.hurt(e,s.dmg,{kb:70,c:w.def.c,src:w})}}}})}else w.books=[];
     w.cd-=dt;if(w.cd<=0&&!w.def.forever)this.fireWeapon(w);else if(w.def.forever&&w.act<1e8)this.fireWeapon(w);continue}
   if(b==="trail"){w.cd-=dt;if(w.cd<=0&&this.still<.05){const d2=Math.hypot(this.px-this.lastDrop[0],this.py-this.lastDrop[1]);if(d2>26||!w.dropped){w.dropped=1;w.cd=s.cd;this.lastDrop=[this.px,this.py];for(let i=0;i<Math.round(s.amt);i++)this.zn.push({shape:"circ",x:this.px+(i?(rnd()*2-1)*30:0),y:this.py+(i?(rnd()*2-1)*30:0)+10,r:30*s.area,life:s.dur,m:s.dur,dmg:s.dmg,tick:.3,tt:0,wp:w,c:w.def.c,kind:"trail"})}}
     if(w.def.bolt){if(this.still>.5&&!w.bolted){w.bolted=1;for(let i=0;i<4;i++){const e=this.randE(420);if(e){this.bolts.push({x:e.x,y:e.y,l:.25,m:.25,c:w.def.c});this.hurt(e,s.dmg*2.2,{c:w.def.c,src:w})}}}if(this.still<.1)w.bolted=0}
     continue}
   w.cd-=dt;if(w.cd<=0){w.cd=s.cd;this.fireWeapon(w)}}}
 /* ----- update ----- */
 step(dt){if(this.ended||this.paused)return;dt=Math.min(dt,.05);this.t+=dt;const P=this.stats;
  /* movement */
  let [dx,dy]=this.dir;const m=Math.hypot(dx,dy);if(m>0){dx/=m;dy/=m;this.fx=dx;this.fy=dy;if(Math.abs(dx)>.2)this.face=dx>0?1:-1;this.moved+=dt;this.still=0}else{this.moved=Math.max(0,this.moved-dt*2);this.still+=dt}
  const sp=150*P.move;this.px=clamp(this.px+dx*sp*dt,-ARENA+22,ARENA-22);this.py=clamp(this.py+dy*sp*dt,-ARENA+22,ARENA-22);
  this.invuln-=dt;if(this.shield>0)this.shield-=dt;if(P.regen)this.heal(P.regen*dt);
  for(let i=this.later.length-1;i>=0;i--){const l=this.later[i];l.t-=dt;if(l.t<=0){this.later.splice(i,1);l.fn()}}
  if(this.freeze>0)this.freeze-=dt;
  this.updWeapons(dt);this.spawn(dt);this.updEnemies(dt);this.updProj(dt);this.updZones(dt);this.updPickups(dt);this.updFx(dt);
  /* player damage */
  if(this.invuln<=0&&this.shield<=0){for(const e of this.en){if(e.fz>0)continue;if(Math.hypot(e.x-this.px,e.y-this.py)<e.r+12){this.hit(e.dmg);break}}}
  else if(this.shield>0&&this.invuln<=0){for(const e of this.en){if(e.fz>0)continue;if(Math.hypot(e.x-this.px,e.y-this.py)<e.r+12){this.invuln=.4;this.burst(this.px,this.py,"#9aff9a",8,120);break}}}
  if(this.endAt&&this.t>=this.endAt){this.ended=true;if(this.cb.end)this.cb.end(this.result())}
  if(this.xp>=need(this.lv)&&!this.paused&&!this.ended){this.xp-=need(this.lv);this.lv++;this.recompute();this.paused=true;this.ring(this.px,this.py,90,"#ffe27a",.6);if(this.cb.level)this.cb.level(this.choices(),()=>{this.paused=false})}}
 hit(d){const P=this.stats;const dmg=Math.max(1,d*(1+this.fi*.08)*(this.t>MAXT?2:1)-P.armor);this.hp-=dmg;this.invuln=.55;this.shake=.25;this.flash=.12;this.flashC="#ff3a3a";this.text(this.px,this.py-30,Math.round(dmg),"#ff6a6a");
  if(this.hp<=0){if(this.revives>0){this.revives--;this.hp=P.maxhp*.6;this.invuln=2.5;this.flash=.6;this.flashC="#fff";this.ring(this.px,this.py,300,"#ffe9a0",.8);this.en.forEach(e=>{if(Math.hypot(e.x-this.px,e.y-this.py)<300&&!e.boss&&!e.elite)this.kill(e)});this.text(this.px,this.py-50,"Revived","#ffe9a0",1)}
   else{this.dead=true;this.ended=true;if(this.cb.end)this.cb.end(this.result())}}}
 result(){const win=this.won&&!this.dead,F=this.fi;const gold=Math.round((this.gold+(win?100*(F+1):0))*P_g(this.stats));return {win,t:this.t,kills:this.kills,gold,lv:this.lv,hero:this.hero,boss:this.bossId,floor:this.fi,ess:Math.round(this.kills/12+this.t/8+(win?40+10*F:0))}}
 /* ----- enemies ----- */
 spawn(dt){const t=this.t,m=t/60,P=this.stats,fi=this.fi;this.spawnT-=dt;
  if(!this.opened){this.opened=1;for(let i=0;i<16;i++){const a=rnd()*TAU,d=150+rnd()*130;this.mk(i%4?this.floor.en[0]:"bat",this.px+Math.cos(a)*d,this.py+Math.sin(a)*d)}}
  /* scripted moments */
  const ev=(k,at,fn)=>{if(t>=at&&!this.ev[k]){this.ev[k]=1;fn()}};
  ev("e1",180,()=>this.mkElite());ev("e2",360,()=>this.mkElite());ev("boss",BOSS_T,()=>this.mkBoss());
  ev("s1",75,()=>this.swarm("bat",22));ev("s2",240,()=>this.swarm(this.floor.en[1],26));ev("ring1",300,()=>this.ringOf(this.floor.en[0],32));ev("s3",450,()=>this.swarm(this.floor.en[2],34));
  ev("hush",MAXT,()=>{this.hush={x:this.px+400,y:this.py,r:26};this.text(this.px,this.py-60,"The Hush arrives","#c8a8ff",1)});
  if(this.hush){const a=Math.atan2(this.py-this.hush.y,this.px-this.hush.x);this.hush.x+=Math.cos(a)*190*dt;this.hush.y+=Math.sin(a)*190*dt;if(this.invuln<=0&&Math.hypot(this.hush.x-this.px,this.hush.y-this.py)<this.hush.r+12)this.hit(40)}
  const target=Math.min(340,Math.round((24+34*m*(1+.05*fi))*P.curse));
  if(this.spawnT<=0){this.spawnT=Math.max(.18,.5-m*.02);let n=Math.min(7,Math.max(0,target-this.en.length));for(let i=0;i<n;i++)this.mk(this.kindAt(m))}}
 kindAt(m){const r=this.floor.en,x=rnd(),y=rnd();if(m>1.8&&y<.06)return "archer";if(m>3&&y>.94)return "charger";if(m>4&&y>.88&&y<=.94)return "splitter";if(m<1.2)return x<.55?"bat":r[0];if(m<3)return x<.45?r[0]:x<.8?r[1]:"bat";if(m<6)return x<.3?r[0]:x<.6?r[1]:x<.9?r[2]:"bat";return x<.15?r[0]:x<.4?r[1]:x<.7?r[2]:x<.9?"shade":"gear"}
 edge(){const sc=this.sc||1,hw=(this.vw||640)/2/sc+36,hh=(this.vh||400)/2/sc+36,p=rnd()*(hw+hh),side=p<hw?(rnd()<.5?-1:1):0;let r;for(let i=0;i<10;i++){r=p<hw?[this.px+(rnd()*2-1)*hw,this.py+(rnd()<.5?-hh:hh)]:[this.px+(rnd()<.5?-hw:hw),this.py+(rnd()*2-1)*hh];if(Math.abs(r[0])<ARENA-10&&Math.abs(r[1])<ARENA-10)return r}return [clamp(r[0],-ARENA+30,ARENA-30),clamp(r[1],-ARENA+30,ARENA-30)]}
 mk(kind,x,y,o){const d=EN[kind],t=this.t/60,fi=this.fi,P=this.stats;const [ex,ey]=this.edge();const hm=(1+.3*t+.014*t*t)*(1+.2*fi)*P.curse;const e=Object.assign({id:this.nid++,k:kind,x:x==null?ex:x,y:y==null?ey:y,hp:d.hp*hm,mhp:d.hp*hm,sp:d.sp*(1+.1*(P.curse-1)*5)*(1+.01*fi),dmg:d.dmg*(1+.05*fi)*(1+.3*t*.1),r:d.r,xp:d.xp,kx:0,ky:0,flash:0,fz:0,col:this.floor.acc},o||{});this.en.push(e);return e}
 swarm(kind,n){const [ex,ey]=this.edge(),a=Math.atan2(this.py-ey,this.px-ex)+Math.PI/2;for(let i=0;i<n;i++){const o=(i/n-.5)*260;this.mk(kind,ex+Math.cos(a)*o,ey+Math.sin(a)*o)}}
 ringOf(kind,n){const R=Math.min(this.vw||640,this.vh||400)*.5+60;for(let i=0;i<n;i++){const a=i/n*TAU;this.mk(kind,this.px+Math.cos(a)*R,this.py+Math.sin(a)*R,{ringed:1})}}
 mkElite(){const k=this.floor.en[this.floor.en.length-1]==="gear"?"gear":"shade";const e=this.mk(k,null,null,{elite:1});e.hp=e.mhp=e.mhp*(k==="gear"?7:16);e.r*=2;e.dmg*=1.4;e.xp=40;e.sp*=.85;this.text(this.px,this.py-60,"An elite approaches","#ffd24a",1)}
 mkBoss(){const fi=this.fi,e=this.mk("gear",null,null,{boss:1});e.hp=e.mhp=900*(1+.38*fi)*this.stats.curse;e.r=40;e.dmg=16+2*fi;e.sp=62;e.xp=0;e.bt=2;e.dashT=5;this.bossE=e;this.shake=.6;this.flash=.4;this.flashC="#ff3a3a";this.text(this.px,this.py-70,"The challenger arrives","#ff8a8a",1);if(this.cb.boss)this.cb.boss(this.bossId)}
 updEnemies(dt){const grid=this.grid=new Map(),CS=64;
  for(const e of this.en){const k=((e.x/CS)|0)+","+((e.y/CS)|0);let c=grid.get(k);if(!c)grid.set(k,c=[]);c.push(e)}
  const px=this.px,py=this.py;
  for(let i=this.en.length-1;i>=0;i--){const e=this.en[i];if(e.dead){this.en.splice(i,1);continue}
   if(e.flash>0)e.flash-=dt;if(e.fz>0){e.fz-=dt;continue}
   let ax=px-e.x,ay=py-e.y,d=Math.hypot(ax,ay)||1;ax/=d;ay/=d;
   if(e.boss){e.bt-=dt;e.dashT-=dt;if(e.dashT<0&&!e.dash){e.dash=.7;e.dashT=6;e.dax=ax;e.day=ay}if(e.dash>0){e.dash-=dt;e.x+=e.dax*380*dt;e.y+=e.day*380*dt}else{e.x+=ax*e.sp*dt;e.y+=ay*e.sp*dt}
     if(e.bt<=0){e.bt=3.4;const n=10+Math.min(10,this.fi),off=rnd()*TAU;for(let k=0;k<n;k++){const a=off+k/n*TAU;this.eb.push({x:e.x,y:e.y,vx:Math.cos(a)*150,vy:Math.sin(a)*150,l:5,r:7,dmg:10+this.fi})}this.ring(e.x,e.y,80,"#ff5a7a",.4)}}
   else{let sp=e.sp;if(e.ringed&&d>30){/* a closing ring */sp*=1.05}
     const dk=EN[e.k];if(dk.shoot){if(d<250){sp=0;e.st=(e.st==null?1+Math.random()*1.5:e.st)-dt;if(e.st<=0){e.st=2.3;this.eb.push({x:e.x,y:e.y,vx:ax*190,vy:ay*190,l:4,r:6,dmg:e.dmg})}}else if(d<300)sp*=.6}
     if(dk.charge){e.ct=(e.ct==null?2+Math.random()*2:e.ct)-dt;if(e.tel>0){e.tel-=dt;sp=0;if(e.tel<=0){e.dsh=.5}}else if(e.dsh>0){e.dsh-=dt;e.x+=e.tdx*340*dt;e.y+=e.tdy*340*dt;sp=0}else if(e.ct<=0&&d<300){e.ct=4+Math.random()*2;e.tel=.6;e.tdx=ax;e.tdy=ay;sp=0}}
     e.x+=ax*sp*dt;e.y+=ay*sp*dt;
     if(e.k!=="bat"&&e.k!=="wisp"){const cx=(e.x/CS)|0,cy=(e.y/CS)|0;let n=0;outer:for(let gx=cx-1;gx<=cx+1;gx++)for(let gy=cy-1;gy<=cy+1;gy++){const c=grid.get(gx+","+gy);if(!c)continue;for(const o of c){if(o===e)continue;const ox=e.x-o.x,oy=e.y-o.y,od=Math.hypot(ox,oy);if(od>0&&od<(e.r+o.r)*.8){const push=(e.r+o.r)*.8-od;e.x+=ox/od*push*.3;e.y+=oy/od*push*.3;if(++n>3)break outer}}}}}
   e.x=clamp(e.x,-ARENA-10,ARENA+10);e.y=clamp(e.y,-ARENA-10,ARENA+10);
   if(e.kx||e.ky){e.x+=e.kx*dt*8;e.y+=e.ky*dt*8;e.kx*=.86;e.ky*=.86;if(Math.abs(e.kx)<.1)e.kx=0;if(Math.abs(e.ky)<.1)e.ky=0}
   /* stray enemies far off the screen are brought back to the edge so the pressure stays */
   if(!e.boss&&!e.elite&&d>900){const a=rnd()*TAU,R=Math.max(this.vw||640,this.vh||400)*.62;e.x=px+Math.cos(a)*R;e.y=py+Math.sin(a)*R}}
  for(let i=this.eb.length-1;i>=0;i--){const b=this.eb[i];b.x+=b.vx*dt;b.y+=b.vy*dt;b.l-=dt;if(this.invuln<=0&&this.shield<=0&&Math.hypot(b.x-px,b.y-py)<b.r+11){this.hit(b.dmg);b.l=0}if(b.l<=0)this.eb.splice(i,1)}}
 inView(x,y,pad=40){const hw=(this.vw||640)/2/(this.sc||1)+pad,hh=(this.vh||400)/2/(this.sc||1)+pad;return Math.abs(x-this.px)<hw&&Math.abs(y-this.py)<hh}
 updProj(dt){const P=this.stats;for(let i=this.pr.length-1;i>=0;i--){const p=this.pr[i];p.t+=dt;p.life-=dt;
   if(p.kind==="arc"){p.vy+=p.g*dt}else if(p.kind==="spin"){const c=Math.cos(p.turn*dt),s=Math.sin(p.turn*dt),vx=p.vx*c-p.vy*s;p.vy=p.vx*s+p.vy*c;p.vx=vx;p.rot=(p.rot||0)+dt*12}
   else if(p.kind==="boom"){if(p.ph===0){const k=Math.max(0,1-p.t/(.75/Math.max(.5,p.w.s.speed)));p.vx=Math.cos(p.a)*p.v0*(k*2-.4);p.vy=Math.sin(p.a)*p.v0*(k*2-.4);if(k<=0){p.ph=1;p.hit.clear()}}
     else{const a=Math.atan2(this.py-p.y,this.px-p.x);p.vx+=Math.cos(a)*1400*dt;p.vy+=Math.sin(a)*1400*dt;const s=Math.hypot(p.vx,p.vy),mx=620;if(s>mx){p.vx*=mx/s;p.vy*=mx/s}if(Math.hypot(this.px-p.x,this.py-p.y)<20)p.life=0}
     if(p.trail&&rnd()<.5)this.pt.push({x:p.x,y:p.y,vx:(rnd()-.5)*40,vy:(rnd()-.5)*40,l:.4,m:.4,c:"#fff2a0",s:3})}
   else if(p.kind==="bnc"){const hw=(this.vw||640)/2/(this.sc||1)-10,hh=(this.vh||400)/2/(this.sc||1)-10;const lx=p.x-this.px,ly=p.y-this.py;
     if(Math.abs(lx)>hw){p.vx=-Math.sign(lx)*Math.abs(p.vx);p.x=this.px+Math.sign(lx)*hw;if(p.boom)this.explode(p.x,p.y,50*p.w.s.area,p.dmg*.6,p.w)}
     if(Math.abs(ly)>hh){p.vy=-Math.sign(ly)*Math.abs(p.vy);p.y=this.py+Math.sign(ly)*hh;if(p.boom)this.explode(p.x,p.y,50*p.w.s.area,p.dmg*.6,p.w)}
     if(p.erratic&&((p.t*10)|0)%7===0&&rnd()<.04){const a=rnd()*TAU,s=Math.hypot(p.vx,p.vy);p.vx=Math.cos(a)*s;p.vy=Math.sin(a)*s}}
   p.x+=p.vx*dt;p.y+=p.vy*dt;
   if(p.kind==="shot"&&rnd()<.6)this.pt.push({x:p.x,y:p.y,vx:0,vy:0,l:.25,m:.25,c:p.c,s:2.5});
   const x0=((p.x-p.r-24)/64)|0,x1=((p.x+p.r+24)/64)|0,y0=((p.y-p.r-24)/64)|0,y1=((p.y+p.r+24)/64)|0;let gone=false;
   for(let gx=x0;gx<=x1&&!gone;gx++)for(let gy=y0;gy<=y1&&!gone;gy++){const c=this.grid&&this.grid.get(gx+","+gy);if(!c)continue;
     for(const e of c){if(e.dead)continue;if(Math.hypot(e.x-p.x,e.y-p.y)>=p.r+e.r)continue;
       if(p.hh){if((p.hh.get(e.id)||0)>this.t)continue;p.hh.set(e.id,this.t+p.rehit)}else{if(p.hit.has(e.id))continue;p.hit.add(e.id)}
       this.hurt(e,p.dmg,{c:p.c,kb:p.kb,heal:p.heal,src:p.w});if(p.boom&&p.kind==="shot"){this.explode(p.x,p.y,48*p.w.s.area,p.dmg*.55,p.w);p.life=0;gone=true;break}
       if(p.hit&&!p.hh){p.pierce--;if(p.pierce<=0){p.life=0;gone=true;break}}}}
   if(p.life<=0)this.pr.splice(i,1)}}
 explode(x,y,r,dmg,w){this.ring(x,y,r,w.def.c,.3);this.burst(x,y,w.def.c,10,160);this.shake=Math.max(this.shake,.1);this.en.forEach(e=>{if(Math.hypot(e.x-x,e.y-y)<r+e.r)this.hurt(e,dmg,{c:w.def.c,kb:30,quiet:0,src:w})})}
 updZones(dt){for(let i=this.zn.length-1;i>=0;i--){const z=this.zn[i];z.life-=dt;if(z.vx)z.x+=z.vx*dt;
   if(z.roam){const e=this.nearestE(1,500)[0];if(e){const a=Math.atan2(e.y-z.y,e.x-z.x);z.x+=Math.cos(a)*55*dt;z.y+=Math.sin(a)*55*dt}}
   if(z.shape==="rect"){for(const e of this.en){if(e.dead||z.hit.has(e.id))continue;if(Math.abs(e.x-z.x)<z.w/2+e.r&&Math.abs(e.y-z.y)<z.h/2+e.r){z.hit.add(e.id);this.hurt(e,z.dmg,{c:z.c,kb:z.kb,heal:z.heal,src:z.wp})}}}
   else{z.tt-=dt;if(z.tt<=0){z.tt=z.tick;for(const e of this.en){if(!e.dead&&Math.hypot(e.x-z.x,e.y-z.y)<z.r+e.r)this.hurt(e,z.dmg,{c:z.c,quiet:z.kind==="trail"&&rnd()<.5,src:z.wp})}}}
   if(z.life<=0)this.zn.splice(i,1)}}
 updPickups(dt){const P=this.stats,mr=70*P.magnet;
  for(let i=this.gems.length-1;i>=0;i--){const g=this.gems[i];g.t+=dt;const d=Math.hypot(this.px-g.x,this.py-g.y);
   if(g.pull||d<mr){g.pull=1;const a=Math.atan2(this.py-g.y,this.px-g.x),s=(g.pull&&d>mr?700:380)+g.t*60;g.x+=Math.cos(a)*s*dt;g.y+=Math.sin(a)*s*dt}
   if(d<16){this.xp+=g.v*P.growth;this.gems.splice(i,1)}}
  if(this.gems.length>320){const a=this.gems.shift(),b=this.gems[0];if(b)b.v+=a.v}
  for(let i=this.pk.length-1;i>=0;i--){const k=this.pk[i];k.t+=dt;const d=Math.hypot(this.px-k.x,this.py-k.y);
   if(d<(k.k==="chest"?26:mr*.7)){if(k.k==="coin"){this.gold+=Math.round(2*(1+P.greed-1)*(1+(P.curse-1)));this.pk.splice(i,1)}else if(k.k==="magnet"){this.gems.forEach(g=>g.pull=1);this.ring(this.px,this.py,300,"#7ad0ff",.5);this.pk.splice(i,1)}else if(k.k==="bomb"){this.flash=.5;this.flashC="#ffb15a";this.shake=.5;this.ring(this.px,this.py,520,"#ffb15a",.6);this.en.forEach(e=>{if(this.inView(e.x,e.y,0))this.hurt(e,e.boss||e.elite?e.mhp*.08:9999,{quiet:1})});this.pk.splice(i,1)}else if(k.k==="chicken"){this.heal(30);this.pk.splice(i,1)}
    else if(k.k==="chest"){this.pk.splice(i,1);const got=this.openChest(k.n);this.paused=true;if(this.cb.chest)this.cb.chest(got,()=>{this.paused=false})}}}}
 updFx(dt){for(let i=this.pt.length-1;i>=0;i--){const p=this.pt[i];p.l-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.94;p.vy*=.94;if(p.l<=0)this.pt.splice(i,1)}
  for(let i=this.tx.length-1;i>=0;i--){const t=this.tx[i];t.l-=dt;t.y-=28*dt;if(t.l<=0)this.tx.splice(i,1)}
  for(let i=this.rings.length-1;i>=0;i--){const r=this.rings[i];r.l-=dt;if(r.l<=0)this.rings.splice(i,1)}
  for(let i=this.bolts.length-1;i>=0;i--){const r=this.bolts[i];r.l-=dt;if(r.l<=0)this.bolts.splice(i,1)}
  this.shake=Math.max(0,this.shake-dt*1.4);this.flash=Math.max(0,this.flash-dt*1.2);
  if(this.pt.length>600)this.pt.splice(0,this.pt.length-600);if(this.tx.length>60)this.tx.splice(0,this.tx.length-60)}
 /* ----- drawing ----- */
 floorTile(){if(this.tile)return this.tile;const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d"),[a,b]=this.floor.tint;g.fillStyle=a;g.fillRect(0,0,128,128);
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){g.fillStyle=(i+j)%2?b:a;g.fillRect(i*64,j*64,64,64)}
  g.strokeStyle="rgba(0,0,0,.35)";g.lineWidth=2;g.strokeRect(1,1,126,126);g.beginPath();g.moveTo(64,0);g.lineTo(64,128);g.moveTo(0,64);g.lineTo(128,64);g.stroke();
  const r=C.hash;for(let i=0;i<22;i++){g.fillStyle="rgba(255,255,255,"+(.03+r("n"+i)*.04)+")";g.fillRect(r("x"+i)*128,r("y"+i)*128,2+r("w"+i)*5,1+r("h"+i)*3)}
  return this.tile=this.ctxPattern=c}
 draw(ctx,w,h,tms){this.vw=w;this.vh=h;const sc=this.sc=clamp(Math.min(w,h)/520,.78,1.35),px=this.px,py=this.py;const sh=this.shake*7;
  const D=this.dpr||1;ctx.setTransform(D,0,0,D,0,0);ctx.fillStyle=this.floor.tint[1];ctx.fillRect(0,0,w,h);
  const ox=w/2-px*sc+(rnd()-.5)*sh,oy=h/2-py*sc+(rnd()-.5)*sh;ctx.setTransform(sc*D,0,0,sc*D,ox*D,oy*D);
  const pat=this.pat||(this.pat=ctx.createPattern(this.floorTile(),"repeat"));const hw=w/2/sc+20,hh=h/2/sc+20;
  ctx.fillStyle="#05030c";ctx.fillRect(px-hw,py-hh,hw*2,hh*2);
  for(let i=0;i<60;i++){const sx=Math.floor(px/300)*300+(C.hash("sx"+i)-.5)*(hw*2+300),sy=Math.floor(py/300)*300+(C.hash("sy"+i)-.5)*(hh*2+300);ctx.fillStyle="rgba(255,255,255,"+(.15+C.hash("sa"+i)*.35)+")";ctx.fillRect(sx,sy,2,2)}
  ctx.save();ctx.beginPath();ctx.rect(-ARENA,-ARENA,ARENA*2,ARENA*2);ctx.clip();ctx.fillStyle=pat;ctx.fillRect(px-hw,py-hh,hw*2,hh*2);ctx.restore();
  {const a=this.floor.acc;ctx.save();ctx.shadowColor=a;ctx.shadowBlur=24;ctx.strokeStyle=a;ctx.lineWidth=8;ctx.strokeRect(-ARENA,-ARENA,ARENA*2,ARENA*2);ctx.restore();ctx.strokeStyle="#000a";ctx.lineWidth=3;ctx.strokeRect(-ARENA+5,-ARENA+5,ARENA*2-10,ARENA*2-10)
   const near=Math.max(0,Math.min(ARENA-Math.abs(px),ARENA-Math.abs(py)));if(near<260){ctx.globalAlpha=1-near/260;ctx.fillStyle=a+"33";ctx.fillRect(px-hw,py-hh,hw*2,hh*2);ctx.globalAlpha=1}}
  /* floor props, deterministic by cell */
  const CS=300,cx0=Math.floor((px-hw)/CS),cx1=Math.floor((px+hw)/CS),cy0=Math.floor((py-hh)/CS),cy1=Math.floor((py+hh)/CS);
  for(let cx=cx0;cx<=cx1;cx++)for(let cy=cy0;cy<=cy1;cy++){const r=C.hash(cx+"|"+cy+this.fl),x=cx*CS+C.hash("x"+cx+cy)*CS,y=cy*CS+C.hash("y"+cx+cy)*CS;if(Math.abs(x)>ARENA-20||Math.abs(y)>ARENA-20)continue;
    if(r<.22){ctx.fillStyle="rgba(0,0,0,.35)";ctx.beginPath();ctx.ellipse(x,y+8,16,6,0,0,TAU);ctx.fill();ctx.fillStyle=this.floor.tint[0];ctx.fillRect(x-9,y-34,18,40);ctx.fillStyle="rgba(255,255,255,.08)";ctx.fillRect(x-9,y-34,5,40);ctx.strokeStyle="rgba(0,0,0,.4)";ctx.strokeRect(x-9,y-34,18,40)}
    else if(r<.34){const fl=.6+.4*Math.sin(tms/160+cx*7);const g=ctx.createRadialGradient(x,y-12,1,x,y-12,46);g.addColorStop(0,this.floor.acc+"66");g.addColorStop(1,"rgba(0,0,0,0)");ctx.globalAlpha=fl;ctx.fillStyle=g;ctx.fillRect(x-46,y-58,92,92);ctx.globalAlpha=1;ctx.fillStyle="#d9c28a";ctx.fillRect(x-2,y-10,4,14);ctx.fillStyle="#ffd24a";ctx.beginPath();ctx.ellipse(x,y-14,3,5,0,0,TAU);ctx.fill()}}
  const add="lighter";
  /* gems and pickups */
  for(const g of this.gems){const c=g.v>=20?"#ff7a7a":g.v>=4?"#7aff9a":"#7ad0ff";ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(g.x,g.y-5);ctx.lineTo(g.x+4,g.y);ctx.lineTo(g.x,g.y+5);ctx.lineTo(g.x-4,g.y);ctx.closePath();ctx.fill()}
  for(const k of this.pk){const bob=Math.sin(k.t*5)*2;ctx.font=(k.k==="chest"?30:18)+"px serif";ctx.textAlign="center";ctx.textBaseline="middle";if(k.k==="chest"){ctx.globalCompositeOperation=add;ctx.fillStyle="rgba(255,226,122,.35)";ctx.beginPath();ctx.arc(k.x,k.y,26+Math.sin(k.t*4)*3,0,TAU);ctx.fill();ctx.globalCompositeOperation="source-over"}ctx.fillText(k.k==="chest"?"🎁":k.k==="coin"?"🟡":k.k==="magnet"?"🧲":k.k==="bomb"?"💣":"🍗",k.x,k.y+bob)}
  /* zones under everything alive */
  for(const z of this.zn){const f=clamp(z.life/z.m,0,1);if(z.shape==="circ"){const g=ctx.createRadialGradient(z.x,z.y,2,z.x,z.y,z.r);g.addColorStop(0,z.c+"88");g.addColorStop(1,z.c+"11");ctx.globalAlpha=.4+.5*Math.min(1,f*2);ctx.fillStyle=g;ctx.beginPath();ctx.arc(z.x,z.y,z.r,0,TAU);ctx.fill();ctx.strokeStyle=z.c;ctx.lineWidth=1.5;ctx.stroke();ctx.globalAlpha=1}
   else if(z.kind==="whip"){const k=1-f;ctx.save();ctx.translate(z.x,z.y);ctx.scale(z.side,1);ctx.globalCompositeOperation=add;ctx.globalAlpha=.9*(1-k*.6);ctx.strokeStyle=z.c;ctx.lineWidth=7*(1-k*.6);ctx.beginPath();ctx.moveTo(-z.w/2,8);ctx.quadraticCurveTo(0,-z.h*1.1,z.w/2,6);ctx.stroke();ctx.lineWidth=2.5;ctx.strokeStyle="#fff";ctx.stroke();ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over"}
   else{const g=ctx.createLinearGradient(z.x-z.w/2,0,z.x+z.w/2,0);g.addColorStop(0,z.c+"00");g.addColorStop(.5,z.c+"cc");g.addColorStop(1,z.c+"00");ctx.globalCompositeOperation=add;ctx.globalAlpha=.7*Math.min(1,f*3);ctx.fillStyle=g;ctx.fillRect(z.x-z.w/2,z.y-z.h/2,z.w,z.h);ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over"}}
  /* garlic-style auras */
  for(const wp of this.wp){if(wp.def.b==="aura"){const R=62*wp.s.area;const g=ctx.createRadialGradient(px,py,6,px,py,R);g.addColorStop(0,wp.def.c+"00");g.addColorStop(.85,wp.def.c+"33");g.addColorStop(1,wp.def.c+"88");ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,R,0,TAU);ctx.fill()}}
  /* enemies, far to near */
  const list=this.en.slice().sort((a,b)=>a.y-b.y),T=tms/1000;
  for(const e of list){if(Math.abs(e.x-px)>hw+60||Math.abs(e.y-py)>hh+60)continue;
   if(e.boss&&this.bossImg){const s=130,wob=Math.sin(T*6)*3;ctx.save();ctx.translate(e.x,e.y);if(e.dash>0){ctx.globalCompositeOperation=add;ctx.fillStyle="rgba(255,60,90,.35)";ctx.beginPath();ctx.arc(0,0,e.r+16,0,TAU);ctx.fill();ctx.globalCompositeOperation="source-over"}
     ctx.fillStyle="rgba(0,0,0,.35)";ctx.beginPath();ctx.ellipse(0,s*.42,e.r*.9,9,0,0,TAU);ctx.fill();if(this.bossImg.complete&&this.bossImg.naturalWidth){ctx.filter=e.flash>0?"brightness(2.2)":"saturate(1.1) hue-rotate(-10deg)";ctx.drawImage(this.bossImg,-s/2,-s/2+wob,s,s);ctx.filter="none"}ctx.restore();
     ctx.fillStyle="rgba(255,60,90,.5)";ctx.beginPath();ctx.arc(e.x,e.y,e.r+10+Math.sin(T*5)*3,0,TAU);ctx.globalAlpha=.25;ctx.fill();ctx.globalAlpha=1;continue}
   const sp=enemySprite(e.k,this.floor.acc,this.floor.tint[0]),sz=e.r*3.1,bob=Math.sin(T*6+e.id)*2;ctx.save();ctx.translate(e.x,e.y+bob);if(px<e.x)ctx.scale(-1,1);ctx.fillStyle="rgba(0,0,0,.3)";ctx.beginPath();ctx.ellipse(0,e.r*.8,e.r*.8,e.r*.3,0,0,TAU);ctx.fill();
   if(e.fz>0)ctx.filter="hue-rotate(160deg) brightness(1.3)";if(e.flash>0)ctx.filter="brightness(3)";if(e.elite){ctx.shadowColor="#ffd24a";ctx.shadowBlur=12}ctx.drawImage(sp,-sz/2,-sz/2,sz,sz);ctx.restore();ctx.filter="none";
   if(e.tel>0){ctx.strokeStyle="rgba(255,60,90,.7)";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x,e.y);ctx.lineTo(e.x+e.tdx*150,e.y+e.tdy*150);ctx.stroke()}
   if(e.elite||e.boss){ctx.fillStyle="#000a";ctx.fillRect(e.x-26,e.y-e.r-12,52,5);ctx.fillStyle=e.boss?"#ff5a7a":"#ffd24a";ctx.fillRect(e.x-26,e.y-e.r-12,52*clamp(e.hp/e.mhp,0,1),5)}}
  /* enemy bullets */
  ctx.globalCompositeOperation=add;for(const b of this.eb){const g=ctx.createRadialGradient(b.x,b.y,1,b.x,b.y,b.r*2);g.addColorStop(0,"#fff");g.addColorStop(.4,"#ff5a7a");g.addColorStop(1,"rgba(255,90,122,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(b.x,b.y,b.r*2,0,TAU);ctx.fill()}ctx.globalCompositeOperation="source-over";
  /* the hush */
  if(this.hush){const hs=this.hush;ctx.globalAlpha=.85;ctx.fillStyle="#1a0c2c";ctx.beginPath();ctx.arc(hs.x,hs.y,hs.r+Math.sin(T*8)*3,0,TAU);ctx.fill();ctx.strokeStyle="#c8a8ff";ctx.lineWidth=2;ctx.stroke();ctx.globalAlpha=1}
  /* the hero */
  const blink=this.invuln>0&&((tms/60)|0)%2===0;ctx.save();ctx.translate(px,py);ctx.fillStyle="rgba(0,0,0,.35)";ctx.beginPath();ctx.ellipse(0,22,15,6,0,0,TAU);ctx.fill();
  const mv=this.dir[0]||this.dir[1],hb=mv?Math.sin(tms/70)*3:Math.sin(tms/300)*1.2;if(this.face<0)ctx.scale(-1,1);if(blink)ctx.globalAlpha=.45;if(this.img.complete&&this.img.naturalWidth)ctx.drawImage(this.img,-30,-34+hb,60,60);else{ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(0,0,14,0,TAU);ctx.fill()}ctx.restore();
  if(this.shield>0){ctx.strokeStyle="#9aff9a";ctx.globalAlpha=.7;ctx.lineWidth=3;ctx.beginPath();ctx.arc(px,py-2,34+Math.sin(T*8)*2,0,TAU);ctx.stroke();ctx.fillStyle="#9aff9a22";ctx.fill();ctx.globalAlpha=1}
  /* books */
  for(const wp of this.wp){if(wp.books&&wp.books.length){ctx.font="26px serif";ctx.textAlign="center";ctx.textBaseline="middle";wp.books.forEach(b=>{ctx.globalCompositeOperation=add;ctx.fillStyle=wp.def.c+"55";ctx.beginPath();ctx.arc(b.x,b.y,b.r+4,0,TAU);ctx.fill();ctx.globalCompositeOperation="source-over";ctx.fillText(wp.def.ic,b.x,b.y)})}}
  /* projectiles */
  for(const p of this.pr){if(p.ic&&p.ic!=="fire"){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.kind==="shot"?Math.atan2(p.vy,p.vx):(p.rot=(p.rot||0)+.3));ctx.font=Math.round(p.r*2.3)+"px serif";ctx.textAlign="center";ctx.textBaseline="middle";ctx.globalCompositeOperation=add;ctx.fillStyle=p.c+"44";ctx.beginPath();ctx.arc(0,0,p.r*1.5,0,TAU);ctx.fill();ctx.globalCompositeOperation="source-over";ctx.fillText(p.ic,0,0);ctx.restore();continue}
   ctx.globalCompositeOperation=add;const g=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,p.r*2.2);g.addColorStop(0,"#fff");g.addColorStop(.35,p.c);g.addColorStop(1,p.c+"00");ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r*2.2,0,TAU);ctx.fill();ctx.globalCompositeOperation="source-over"}
  /* lightning, rings, sparks */
  ctx.globalCompositeOperation=add;for(const b of this.bolts){const f=b.l/b.m;ctx.strokeStyle=b.c;ctx.lineWidth=4*f+1;ctx.globalAlpha=f;ctx.beginPath();let x=b.x+(rnd()-.5)*20,y=b.y-340;ctx.moveTo(x,y);for(let i=0;i<8;i++){x=b.x+(rnd()-.5)*34*(1-i/9);y+=340/8;ctx.lineTo(x,y)}ctx.lineTo(b.x,b.y);ctx.stroke();ctx.strokeStyle="#fff";ctx.lineWidth=1.5;ctx.stroke()}ctx.globalAlpha=1;
  for(const r of this.rings){const f=1-r.l/r.m;ctx.globalAlpha=1-f;ctx.strokeStyle=r.c;ctx.lineWidth=4*(1-f)+1;ctx.beginPath();ctx.arc(r.x,r.y,r.r*(.25+.75*f),0,TAU);ctx.stroke()}ctx.globalAlpha=1;
  for(const p of this.pt){const f=p.l/p.m;ctx.globalAlpha=Math.max(0,f);ctx.fillStyle=p.c;ctx.fillRect(p.x-p.s/2,p.y-p.s/2,p.s,p.s)}ctx.globalAlpha=1;ctx.globalCompositeOperation="source-over";
  /* damage numbers */
  ctx.textAlign="center";ctx.textBaseline="middle";for(const t of this.tx){ctx.globalAlpha=Math.min(1,t.l*2);ctx.font=(t.big?"700 18px":"700 12px")+" Georgia,serif";ctx.lineWidth=3;ctx.strokeStyle="#000a";ctx.strokeText(t.s,t.x,t.y);ctx.fillStyle=t.c;ctx.fillText(t.s,t.x,t.y)}ctx.globalAlpha=1;
  /* screen effects */
  ctx.setTransform(D,0,0,D,0,0);
  if(this.freeze>0){ctx.fillStyle="rgba(120,220,255,.12)";ctx.fillRect(0,0,w,h)}
  if(this.flash>0){ctx.globalAlpha=Math.min(.7,this.flash);ctx.fillStyle=this.flashC;ctx.fillRect(0,0,w,h);ctx.globalAlpha=1}
  const lowhp=this.hp/this.stats.maxhp;if(lowhp<.3){const g=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*.35,w/2,h/2,Math.max(w,h)*.7);g.addColorStop(0,"rgba(120,0,20,0)");g.addColorStop(1,"rgba(160,0,30,"+(.5*(1-lowhp/.3))+")");ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
  else{const g=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*.4,w/2,h/2,Math.max(w,h)*.75);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.45)");ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}}
}
function P_g(P){return 1+(P.greed-1)}
C.Run=Run;
/* a fast headless drive for balance checks: moves toward gems, away from crowds, takes the first upgrade offered */
C.sim=(hero,fi,boss,meta,secs=600)=>{const r=new Run({hero,floor:C.FLOORS[fi].g,floorIndex:fi,boss,meta});r.vw=640;r.vh=400;r.sc=1;r.cb.level=(ch,go)=>{r.apply(ch[0]);go()};r.cb.chest=(g,go)=>go();let res=null;r.cb.end=x=>res=x;
  const dt=1/30;let n=0;while(!r.ended&&r.t<secs+30){let dx=0,dy=0;const near=r.nearestE(6,160);near.forEach(e=>{dx+=(r.px-e.x)/(Math.hypot(e.x-r.px,e.y-r.py)+1);dy+=(r.py-e.y)/(Math.hypot(e.x-r.px,e.y-r.py)+1)});
   if(!near.length){const g=r.gems.concat(r.pk).sort((a,b)=>Math.hypot(a.x-r.px,a.y-r.py)-Math.hypot(b.x-r.px,b.y-r.py))[0];if(g){dx=g.x-r.px;dy=g.y-r.py}else{dx=Math.cos(r.t/3);dy=Math.sin(r.t/3)}}
   r.dir=[dx,dy];r.step(dt);if(++n>40000)break}
  return res||r.result()};
})();
