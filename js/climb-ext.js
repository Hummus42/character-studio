/* Everspire: Climb the Spire, signature kits. Builds every girl's weapon, awakened weapon and heirloom from climb-kits.js, adds weapon twists
   (burn, chill, arc, leech, keen, shatter, burst, draw, mark, venom, frost, gilt) and the active ability button, as a subclass of the base run. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.Run||!ACAD.climb.KITX)return;
const C=ACAD.climb,W=C.WEAPONS,PS=C.PASSIVES,Base=C.Run,rnd=Math.random,TAU=Math.PI*2;

/* ---------- build the presets ---------- */
/* early-game power evened out between behaviours (forward-only and aura weapons need more per hit than auto-aimers) */
const PW={wand:1,pins:2.2,lash:1.7,cleaver:2.2,crest:1.15,grimoire:1.35,ember:1.05,perfume:2.4,fountain:1.1,rune:1.05,storm:1.15,dove:1.6,raven:1.6,cat:1.4,song:1.15,pinion:2,gale:1.6};
const hex=(h,s,l)=>{s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));return "#"+[f(0),f(8),f(4)].map(x=>Math.round(x*255).toString(16).padStart(2,"0")).join("")};
const STAT={M:["might",.08,"damage",p=>"+"+Math.round(p*100)+"% damage","⚔️"],A:["area",.08,"area",p=>"+"+Math.round(p*100)+"% area","📐"],C:["cooldown",-.06,"cooldown",p=>Math.round(p*100)+"% cooldown","⏱️"],
 S:["speed",.08,"speed",p=>"+"+Math.round(p*100)+"% projectile speed","🏹"],D:["dur",.1,"duration",p=>"+"+Math.round(p*100)+"% duration","⌛"],V:["move",.08,"move",p=>"+"+Math.round(p*100)+"% move speed","👟"],
 G:["magnet",.2,"magnet",p=>"+"+Math.round(p*100)+"% pickup range","🧲"],L:["luck",.08,"luck",p=>"+"+Math.round(p*100)+"% luck","🍀"],X:["growth",.07,"growth",p=>"+"+Math.round(p*100)+"% experience","📘"],
 $:["greed",.1,"greed",p=>"+"+Math.round(p*100)+"% gold","💰"],R:["regen",.15,"regen",p=>"+"+p.toFixed(2)+" health a second","🌿"],H:["maxhp",.1,"maxhp",p=>"+"+Math.round(p*100)+"% max health","❤️"],W:["armor",.6,"armor",p=>"+"+p+" armor","🛡️"]};
Object.keys(C.KITX).forEach(h=>{const x=C.KITX[h],base=W[x.base];if(!base)return;
  const d=JSON.parse(JSON.stringify(base)),col=hex(C.hash(h+"hue")*360,78,66),v=.92+C.hash(h+"v")*.2;
  d.id="s_"+h;d.n=x.wn;d.ic=x.wi;d.c=col;d.sig=h;d.twist=x.tw;d.rar=80;delete d.union;d.evo=["hr_"+h,"x_"+h];d.base.dmg=Math.round(d.base.dmg*v*(PW[x.base]||1)*10)/10;
  d.d=base.d+" "+C.TWISTS[x.tw][0]+": "+C.TWISTS[x.tw][1]+".";W[d.id]=d;
  const a=JSON.parse(JSON.stringify(base));a.id="x_"+h;a.n="Awakened "+x.wn;a.ic=x.wi;a.c=col;a.sig=h;a.evolved=true;a.twist=x.tw;delete a.up;delete a.evo;delete a.union;
  a.base.dmg=Math.round(a.base.dmg*v*(PW[x.base]||1)*1.9*10)/10;if(a.base.amt)a.base.amt+=1;if(a.base.cd)a.base.cd=Math.round(a.base.cd*.8*100)/100;a.base.area=(a.base.area||1)*1.2;
  a.d=x.wn+", awakened: stronger, quicker, and its "+C.TWISTS[x.tw][0].toLowerCase()+" doubled.";W[a.id]=a;
  const per={},txt=[];x.st.forEach(c=>{const s=STAT[c];per[s[0]]=(per[s[0]]||0)+s[1]});x.st.forEach(c=>{const s=STAT[c];txt.push(s[3](per[s[0]]))});
  PS["hr_"+h]={n:x.hn,ic:STAT[x.st[0]][4],max:5,per,d:txt.join(", "),heir:h}});

/* ---------- the three weapons that had no evolution ---------- */
W.lancet.evo=["cooldown","infinite"];W.laurel.evo=["maxhp","crimson"];W.gale.evo=["move","galeforce"];
W.infinite={id:"infinite",evolved:true,n:"Infinite Corridor",ic:"♾️",c:"#9affc8",b:"freeze",d:"Time stops for longer, and again sooner.",base:{dmg:0,cd:4.5,dur:3.2,area:1}};
W.crimson={id:"crimson",evolved:true,n:"Crimson Shroud",ic:"🩸",c:"#ff5a7a",b:"shield",retal:1,d:"A longer ward that burns whoever stands close.",base:{dmg:0,cd:7,dur:4.5,area:1}};
W.galeforce={id:"galeforce",evolved:true,n:"Gale Force",ic:"🌪️",c:"#c8f2ff",b:"gale",d:"A storm of blades.",base:{dmg:9,amt:9,cd:1.2,dur:.7,area:2,iv:.05}};

/* ---------- the kit a hero gets ---------- */
const kc={},oldKit=C.heroKit;
C.heroKit=h=>{if(kc[h])return kc[h];const k=oldKit(h),x=C.KITX[h];if(!x)return kc[h]=k;return kc[h]=Object.assign({},k,{start:"s_"+h,heir:"hr_"+h,x})};

/* ---------- abilities ---------- */
const dmgA=(r,b,p)=>(b+p*r.lv)*r.stats.might,dummy=col=>({def:{c:col},s:{area:1,speed:1}});
const shot=(r,x,y,a,sp,dmg,col,o)=>{r.pr.push(Object.assign({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,r:9,dmg,pierce:3,life:2.4,hit:new Set(),w:dummy(col),c:col,t:0,kind:"shot",kb:30},o))};
const AB={
 nova(col){const R=230,d=dmgA(this,45,5);this.ring(this.px,this.py,R,col,.5);this.burst(this.px,this.py,col,26,260);this.shake=.3;this.en.forEach(e=>{if(Math.hypot(e.x-this.px,e.y-this.py)<R+e.r)this.hurt(e,d,{kb:90,c:col})})},
 dash(col){const L=190,ax=this.fx||this.face,ay=this.fy||0,m=Math.hypot(ax,ay)||1,ux=ax/m,uy=ay/m,d=dmgA(this,38,4),x0=this.px,y0=this.py;
  this.px=Math.max(-1078,Math.min(1078,this.px+ux*L));this.py=Math.max(-1078,Math.min(1078,this.py+uy*L));this.invuln=Math.max(this.invuln,.8);
  for(let i=0;i<=12;i++){const x=x0+(this.px-x0)*i/12,y=y0+(this.py-y0)*i/12;this.burst(x,y,col,2,60,.4)}
  this.en.forEach(e=>{const t=Math.max(0,Math.min(1,((e.x-x0)*ux+(e.y-y0)*uy)/L)),qx=x0+ux*L*t,qy=y0+uy*L*t;if(Math.hypot(e.x-qx,e.y-qy)<e.r+34)this.hurt(e,d,{kb:60,c:col})})},
 heal(col){this.heal(this.stats.maxhp*.33);this.ring(this.px,this.py,120,col,.6);this.burst(this.px,this.py,"#9aff9a",20,120,.8);this.text(this.px,this.py-40,"Restored","#9aff9a",1)},
 freeze(col){this.ring(this.px,this.py,520,col,.6);this.en.forEach(e=>{e.fz=e.boss?.8:2.4});this.freeze=2.4;this.flash=.2;this.flashC=col},
 summon(col){const d=dmgA(this,26,3);for(let i=0;i<6;i++){const t=this.randE(520),a=t?Math.atan2(t.y-this.py,t.x-this.px):rnd()*TAU;this.later_(i*.08,()=>shot(this,this.px,this.py,a+(rnd()-.5)*.3,380,d,col,{r:11,pierce:4}))}},
 dome(col){this.shield=3;this.invuln=Math.max(this.invuln,.4);this.ring(this.px,this.py,200,col,.5);this.en.forEach(e=>{const dx=e.x-this.px,dy=e.y-this.py,m=Math.hypot(dx,dy)||1;if(m<220&&!e.boss&&!e.elite){e.kx+=dx/m*70;e.ky+=dy/m*70}})},
 gravity(col){const d=dmgA(this,30,4);this.ring(this.px,this.py,340,col,.6);this.en.forEach(e=>{const dx=this.px-e.x,dy=this.py-e.y;if(Math.hypot(dx,dy)<340&&!e.boss){e.x+=dx*.7;e.y+=dy*.7}if(Math.hypot(dx,dy)<400)this.hurt(e,d,{c:col})});this.shake=.3},
 blink(col){const L=250,ax=this.fx||this.face,ay=this.fy||0,m=Math.hypot(ax,ay)||1,d=dmgA(this,50,5),w=dummy(col);this.explode(this.px,this.py,95,d,w);this.px=Math.max(-1078,Math.min(1078,this.px+ax/m*L));this.py=Math.max(-1078,Math.min(1078,this.py+ay/m*L));this.invuln=Math.max(this.invuln,.5);this.explode(this.px,this.py,95,d,w)},
 storm(col){const d=dmgA(this,36,3);for(let i=0;i<10;i++)this.later_(i*.12,()=>{const e=this.randE(500);const x=e?e.x:this.px+(rnd()*2-1)*240,y=e?e.y:this.py+(rnd()*2-1)*160;this.bolts.push({x,y,l:.25,m:.25,c:col});this.ring(x,y,44,col,.3);this.en.forEach(q=>{if(Math.hypot(q.x-x,q.y-y)<44+q.r)this.hurt(q,d,{c:col,kb:20})})})},
 meteor(col){const d=dmgA(this,62,5),w=dummy(col);for(let i=0;i<7;i++)this.later_(i*.22,()=>{const e=this.randE(500);const x=e?e.x:this.px+(rnd()*2-1)*240,y=e?e.y:this.py+(rnd()*2-1)*160;this.ring(x,y,72,col,.5);this.later_(.5,()=>this.explode(x,y,76,d,w))})},
 volley(col){const d=dmgA(this,22,2.5);for(let i=0;i<24;i++)shot(this,this.px,this.py,i/24*TAU,340,d,col,{pierce:2,life:1.8})},
 haste(col){this.haste=6;this.recompute();this.ring(this.px,this.py,90,col,.5);this.text(this.px,this.py-40,"Haste","#fff",1)}};

/* ---------- boss patterns: each floor mixes the base ring and charge with its own ---------- */
const BP=[["aimed"],["spiral"],["gap"],["adds"],["aimed","gap"],["spiral","adds"],["gap","adds"],["aimed","spiral"],["gap","spiral"],["adds","aimed"],["aimed","gap","adds"],["spiral","gap"],["aimed","spiral","gap"],["aimed","spiral","gap","adds"]];
function bossPat(r,dt){const e=r.bossE;if(!e||e.dead)return;const pats=BP[r.fi]||BP[0],P=e.pp=e.pp||{},toP=Math.atan2(r.py-e.y,r.px-e.x);
  const fire=(a,sp)=>{if(r.eb.length<320)r.eb.push({x:e.x,y:e.y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,l:6,r:7,dmg:9+r.fi})};
  pats.forEach((k,i)=>{P[k]=(P[k]==null?2.5+i*1.3:P[k])-dt;if(P[k]>0)return;
   if(k==="aimed"){P[k]=2.6;for(let j=-2;j<=2;j++)fire(toP+j*.16,230)}
   else if(k==="gap"){P[k]=5.2;const g=rnd()*TAU,n=30;for(let j=0;j<n;j++){const a=j/n*TAU;if(Math.abs(Math.atan2(Math.sin(a-g),Math.cos(a-g)))<.3)continue;fire(a,120)}r.ring(e.x,e.y,90,"#ff9a5a",.4)}
   else if(k==="spiral"){P[k]=7;e.spin=1.8}
   else if(k==="adds"){P[k]=9;for(let j=0;j<8;j++){const a=j/8*TAU;r.mk(r.floor.en[0],e.x+Math.cos(a)*70,e.y+Math.sin(a)*70)}}});
  if(e.spin>0){e.spin-=dt;e.sa=(e.sa||0)+dt*2.4;e.sc=(e.sc||0)-dt;if(e.sc<=0){e.sc=.12;fire(e.sa,170);fire(e.sa+Math.PI,170)}}}

/* ---------- floor hazards: each floor has its own way to hurt you ---------- */
const HZ=[null,"fire","ice","thorn","ice","current","bolt","bolt","poison","poison","crush","dark","bolt","crush"];
const HZN={fire:"Embers pool on the ground: step out of the fire.",ice:"Ice patches slow you down.",thorn:"Thorns grow under your feet.",current:"Currents shove you about.",bolt:"Lightning strikes where a red ring pulses.",poison:"Poison clouds drift in.",crush:"Red rings mark where something heavy will fall.",dark:"Pools of shadow drain your pace."};
const HZC={fire:"#ff7a3a",ice:"#9ad8ff",thorn:"#7ae89a",current:"#4ac8ff",bolt:"#fff27a",poison:"#9aff5a",crush:"#ff5a7a",dark:"#8a5aff"};
function hazards(r,dt){const k=HZ[r.fi];if(!k)return;const hz=r.hz=r.hz||[];r.hzT=(r.hzT==null?4:r.hzT)-dt;
  if(r.hzT<=0){const strike=k==="bolt"||k==="crush";r.hzT=strike?Math.max(1.4,3.4-r.t/200):Math.max(3,7-r.t/120);
    const a=rnd()*TAU,d=strike?30+rnd()*210:80+rnd()*260,x=Math.max(-1060,Math.min(1060,r.px+Math.cos(a)*d)),y=Math.max(-1060,Math.min(1060,r.py+Math.sin(a)*d));
    hz.push({k,x,y,r:strike?(k==="crush"?92:52):70+rnd()*30,tel:strike?(k==="crush"?1.3:.9):0,life:strike?.35:11,m:strike?.35:11,tt:0})}
  r.hzSlow=1;r.hzPush=null;
  for(let i=hz.length-1;i>=0;i--){const h=hz[i];if(h.tel>0){h.tel-=dt;if(h.tel<=0){h.hit=1;if(Math.hypot(r.px-h.x,r.py-h.y)<h.r+10)r.hit(h.k==="crush"?26:18);r.ring(h.x,h.y,h.r,HZC[h.k],.4);r.shake=Math.max(r.shake,.25)}continue}
   h.life-=dt;if(h.life<=0){hz.splice(i,1);continue}
   if(h.hit)continue;
   if(Math.hypot(r.px-h.x,r.py-h.y)<h.r){if(h.k==="ice"||h.k==="dark")r.hzSlow=.55;else if(h.k==="current")r.hzPush=[(h.x>r.px?-1:1)*90,(h.y>r.py?-1:1)*60];else{h.tt-=dt;if(h.tt<=0){h.tt=.6;r.hit(h.k==="fire"?5:h.k==="poison"?3:4)}}}}
  if(hz.length>14)hz.splice(0,hz.length-14)}
function drawHazards(r,ctx,w,h,tms){const hz=r.hz;if(!hz||!hz.length)return;const D=r.dpr||1,sc=r.sc||1;ctx.save();ctx.setTransform(sc*D,0,0,sc*D,(w/2-r.px*sc)*D,(h/2-r.py*sc)*D);
  for(const z of hz){const c=HZC[z.k];if(z.tel>0){const f=1-z.tel/(z.k==="crush"?1.3:.9);ctx.globalAlpha=.25+.4*Math.abs(Math.sin(tms/90));ctx.fillStyle=c;ctx.beginPath();ctx.arc(z.x,z.y,z.r*f,0,TAU);ctx.fill();ctx.globalAlpha=.9;ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(z.x,z.y,z.r,0,TAU);ctx.stroke()}
   else if(!z.hit){const f=Math.min(1,z.life/z.m*3);ctx.globalAlpha=.45*f;const g=ctx.createRadialGradient(z.x,z.y,4,z.x,z.y,z.r);g.addColorStop(0,c);g.addColorStop(1,c+"22");ctx.fillStyle=g;ctx.beginPath();ctx.arc(z.x,z.y,z.r,0,TAU);ctx.fill();ctx.globalAlpha=.8*f;ctx.strokeStyle=c;ctx.lineWidth=2;ctx.setLineDash([8,6]);ctx.lineDashOffset=-tms/60;ctx.stroke();ctx.setLineDash([])}}
  ctx.restore()}

/* ---------- the subclass ---------- */
class Run2 extends Base{
 constructor(o){super(o);const x=this.kit.x;if(x){this.pa["hr_"+o.hero]=1;this.recompute();
   Object.keys(W).forEach(id=>{if(W[id].sig&&W[id].sig!==o.hero)this.banished[id]=true});Object.keys(PS).forEach(id=>{if(PS[id].heir&&PS[id].heir!==o.hero)this.banished[id]=true});
   const a=C.ABILITIES[x.ab],col=W["s_"+o.hero].c;this.ab={arch:x.ab,name:x.an,d:a.d,col,max:Math.round(a.cd*(.92+C.hash(o.hero+"cd")*.18)),cd:0};this.ab.cd=this.ab.max*.45}
   this.hzNote=HZ[o.floorIndex||0]?HZN[HZ[o.floorIndex||0]]:""}
 recompute(){super.recompute();if(this.haste>0&&this.stats){this.stats.move*=1.4;this.stats.cooldown*=.65;this.wp.forEach(w=>this.wstats(w))}}
 draw(ctx,w,h,tms){super.draw(ctx,w,h,tms);drawHazards(this,ctx,w,h,tms)}
 cast(){const a=this.ab;if(!a||this.paused||this.ended||a.cd>0)return false;AB[a.arch].call(this,a.col);a.cd=a.max*this.stats.cooldown;return true}
 hurt(e,dmg,o){o=o||{};if(e.dead)return;if(e.mk>0)dmg*=1.25;const wd=o.src&&o.src.def&&o.src.def.twist?o.src.def:null;
  if(!wd||this._tw){super.hurt(e,dmg,o);return}
  const tw=wd.twist,lv=wd.evolved?2:1;if(tw==="cr"&&rnd()<.15*lv){dmg*=2.5;o=Object.assign({},o,{c:"#ffe27a"})}
  super.hurt(e,dmg,o);
  if(e.dead){this._tw=1;try{if(tw==="sp"){for(let i=0;i<3*lv;i++){const a=rnd()*TAU;shot(this,e.x,e.y,a,300,dmg*.4,wd.c,{r:6,pierce:1,life:.9})}}else if(tw==="ex")this.explode(e.x,e.y,44*lv,dmg*.5*lv,o.src);else if(tw==="gd"&&rnd()<.35*lv)this.drop("coin",e.x,e.y,1)}finally{this._tw=0}return}
  if(tw==="bn"){e.bt=3;e.bd=Math.max(e.bd||0,dmg*.35*lv)}
  else if(tw==="sl")e.sl=2*lv;
  else if(tw==="ch"){let q=null,bd=130*130;for(const z of this.en){if(z===e||z.dead)continue;const dd=(z.x-e.x)**2+(z.y-e.y)**2;if(dd<bd){bd=dd;q=z}}if(q){this._tw=1;this.hurt(q,dmg*.5*lv,{c:wd.c,quiet:0});this._tw=0;for(let i=1;i<6;i++)this.pt.push({x:e.x+(q.x-e.x)*i/6,y:e.y+(q.y-e.y)*i/6,vx:0,vy:0,l:.25,m:.25,c:wd.c,s:3})}}
  else if(tw==="lc"){if(rnd()<.3*lv)this.heal(1)}
  else if(tw==="pu"){if(!e.boss&&!e.elite){e.x+=(this.px-e.x)*.15*lv;e.y+=(this.py-e.y)*.15*lv}}
  else if(tw==="mk")e.mk=3*lv;
  else if(tw==="ps"){e.ps=Math.min(6,(e.ps||0)+1);e.pt=4;e.pd=dmg*.12}
  else if(tw==="fr"){if(rnd()<.08*lv&&!e.boss)e.fz=Math.max(e.fz||0,1)}}
 step(dt){if(!this.paused&&!this.ended){const d=Math.min(dt,.05);
   if(this.ab)this.ab.cd=Math.max(0,this.ab.cd-d);
   if(this.shield>0&&this.wp.some(w=>w.id==="crimson")){this.rt=(this.rt||0)-d;if(this.rt<=0){this.rt=.5;const dm=30*this.stats.might;this.en.forEach(e=>{if(Math.hypot(e.x-this.px,e.y-this.py)<110)this.hurt(e,dm,{c:"#ff5a7a",quiet:0})});this.ring(this.px,this.py,110,"#ff5a7a",.35)}}
   if(this.haste>0){this.haste-=d;if(this.haste<=0){this.haste=0;this.recompute()}}
   for(const e of this.en){if(e.dead)continue;
    if(e.bt>0){e.bt-=d;e.bacc=(e.bacc||0)+d;if(e.bacc>=.5){e.bacc=0;this._tw=1;this.hurt(e,e.bd*.5,{quiet:1});this._tw=0;this.pt.push({x:e.x,y:e.y-e.r,vx:0,vy:-30,l:.4,m:.4,c:"#ff8a3a",s:3})}}
    if(e.pt>0){e.pt-=d;e.pacc=(e.pacc||0)+d;if(e.pacc>=.5){e.pacc=0;this._tw=1;this.hurt(e,e.pd*e.ps*.5,{quiet:1});this._tw=0;this.pt.push({x:e.x,y:e.y-e.r,vx:0,vy:-24,l:.4,m:.4,c:"#8aff5a",s:3})}}else if(e.ps)e.ps=0;
    if(e.mk>0)e.mk-=d;
    if(e.sl>0){e.sl-=d;if(!e.sp0){e.sp0=e.sp;e.sp=e.sp*.55}}else if(e.sp0){e.sp=e.sp0;e.sp0=0}}}
  if(this.bossE&&!this.paused&&!this.ended)bossPat(this,Math.min(dt,.05));
  if(!this.paused&&!this.ended){hazards(this,Math.min(dt,.05));if(this.hzPush){this.px=Math.max(-1078,Math.min(1078,this.px+this.hzPush[0]*dt));this.py=Math.max(-1078,Math.min(1078,this.py+this.hzPush[1]*dt))}}
  const m0=this.stats.move,slow=this.hzSlow<1?this.hzSlow:1;if(slow<1)this.stats.move=m0*slow;
  super.step(dt);
  if(slow<1&&this.stats.move===m0*slow)this.stats.move=m0}
}
C.Run=Run2;
/* the headless drive, now with abilities */
C.sim=(hero,fi,boss,meta,secs=600)=>{const r=new Run2({hero,floor:C.FLOORS[fi].g,floorIndex:fi,boss,meta});r.vw=640;r.vh=400;r.sc=1;r.cb.level=(ch,go)=>{r.apply(ch[0]);go()};r.cb.chest=(g,go)=>go();let res=null;r.cb.end=x=>res=x;
  const dt=1/30;let n=0;while(!r.ended&&r.t<secs+30&&n++<40000){let dx=0,dy=0;const near=r.nearestE(6,170);near.forEach(e=>{const d=Math.hypot(e.x-r.px,e.y-r.py)+1;dx+=(r.px-e.x)/d;dy+=(r.py-e.y)/d});
   if(!near.length){const g=r.gems[0];if(g){dx=g.x-r.px;dy=g.y-r.py}else{dx=Math.cos(r.t/3);dy=Math.sin(r.t/3)}}if(near.length>3)r.cast();r.dir=[dx,dy];r.step(dt)}
  return res||r.result()};
})();
