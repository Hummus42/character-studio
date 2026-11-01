/* Everspire Collection: Climb the Spire, pets. Every girl has a pet that mirrors her; a pet joins you when she does. Before a climb you bring
   one pet along with any girl. It follows, fights on its own, never ends a run, and answers to one Command. A pet has a Bearing (a quiet
   stat gift) and grows through bond (the essence it climbs for) into the same five tiers as the girls. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.Run)return;
const C=ACAD.climb,Base=C.Run,TAU=Math.PI*2,rnd=Math.random;

/* the Commands a pet can have: name, what it does, base cooldown */
C.PCMD={
 fetch:{n:"Fetch",cd:18,d:"Races across the floor and sweeps up every gem and coin on screen."},
 guard:{n:"Guard",cd:24,d:"Throws up a ward around her for 3.5 seconds and knocks nearby enemies back."},
 pin:{n:"Pin",cd:20,d:"Pins the nearest elite, rare or challenger (or three others) in place for 3 seconds, and marks them to take more damage."},
 roar:{n:"Roar",cd:22,d:"A roar that damages and shoves back every enemy around her."},
 mend:{n:"Mend",cd:36,d:"Restores a fifth of her health and lights a ring of healing."},
 rush:{n:"Rush",cd:16,d:"Darts through up to eight enemies, hitting each, then returns."}};

/* the pets: id is the girl it mirrors. n name, sp species, cmd, bear (always on), bear2 (unlocks at Mythic), tone colour */
C.PETS={
 kitsune:{n:"Foxfire Kit",sp:"a nine-tailed spirit fox",cmd:"pin",bear:{luck:.1},bear2:{cooldown:-.05},c:"#8fd0ff"},
 lioness:{n:"Cub of the Lawn",sp:"a golden lion cub",cmd:"roar",bear:{might:.06},bear2:{maxhp:.12},c:"#ffd27a"},
 wolf:{n:"Frostpaw",sp:"a silver wolf pup",cmd:"rush",bear:{move:.06},bear2:{might:.05},c:"#b8c8e8"},
 stag:{n:"Mossback Fawn",sp:"a vine-antlered fawn",cmd:"mend",bear:{regen:.25},bear2:{armor:1},c:"#8fe08f"},
 orca:{n:"Little Tide",sp:"a baby orca",cmd:"roar",bear:{area:.08},bear2:{dur:.08},c:"#7ab8ff"},
 kraken:{n:"Inkling",sp:"a baby kraken",cmd:"guard",bear:{armor:1},bear2:{maxhp:.15},c:"#b87aff"},
 peacock:{n:"Gemtail",sp:"a jewel-tailed peacock",cmd:"fetch",bear:{greed:.12},bear2:{luck:.08},c:"#4ae0c0"},
 raven:{n:"Keyholder",sp:"a key-bearing raven",cmd:"pin",bear:{growth:.08},bear2:{magnet:.3},c:"#a58aff"},
 serpent:{n:"Emerald Coil",sp:"a gold-scaled serpent",cmd:"rush",bear:{speed:.1},bear2:{might:.05},c:"#5ae08a"},
 mantis:{n:"Blossom Scythe",sp:"a flower-crowned mantis",cmd:"pin",bear:{might:.07},bear2:{cooldown:-.05},c:"#a8e84a"},
 regent:{n:"Brass Cub",sp:"a clockwork lion",cmd:"guard",bear:{cooldown:-.06},bear2:{area:.08},c:"#e8c24a"},
 nightmare:{n:"Dusk Foal",sp:"a shadow mare foal",cmd:"roar",bear:{magnet:.35},bear2:{growth:.08},c:"#d070ff"},
 android:{n:"Unit Pup",sp:"a robot hound",cmd:"fetch",bear:{magnet:.4},bear2:{move:.05},c:"#6af0ff"},
 eclipse:{n:"Halo Kitten",sp:"a star-eyed void cat",cmd:"mend",bear:{luck:.12},bear2:{might:.06},c:"#ffffff"}};

/* what the tiers give: bearing strength, command cooldown, command power, the second bearing */
C.PTIER=[{n:"Common",d:"Its Bearing and Command."},{n:"Uncommon",d:"Bearing +25%."},{n:"Rare",d:"Command cools down 15% quicker."},{n:"Legendary",d:"Bearing +50%, Command 40% stronger."},{n:"Mythic",d:"A second Bearing wakes."}];
const bearScale=t=>t>=3?1.5:t>=1?1.25:1,cdScale=t=>t>=2?.85:1,powScale=t=>t>=3?1.4:1;
C.petBearing=(id,t,kin)=>{const p=C.PETS[id],o={};if(!p)return o;const k=bearScale(t)*(kin?1.15:1);for(const s in p.bear)o[s]=(o[s]||0)+p.bear[s]*k;if(t>=4)for(const s in p.bear2)o[s]=(o[s]||0)+p.bear2[s]*k;return o};
C.petPow=(t,kin)=>powScale(t)*(kin?1.15:1);

/* ---------- the run, with a pet ---------- */
class Run4 extends Base{
 constructor(o){super(o);const id=o.pet,p=id&&C.PETS[id];this.petId=p?id:null;
  if(p){const t=o.petTier||0;this.ptier=t;this.pkin=!!o.kin;this.ppow=C.petPow(t,this.pkin);this.pdat=p;
   this.pet={x:this.px-34,y:this.py+10,hp:100+15*t,mhp:100+15*t,down:0,cd:C.PCMD[p.cmd].cd*cdScale(t)*.5,max:C.PCMD[p.cmd].cd*cdScale(t),at:0,face:1,tg:null,hit:0,bob:0}}}
 petCast(){const P=this.pet;if(!P||this.paused||this.ended||P.cd>0)return false;const pd=this.pdat,pw=this.ppow,c=pd.c,m=this.stats.might,lv=this.lv;P.cd=P.max;
  const near=()=>this.en.filter(e=>!e.dead).sort((a,b)=>Math.hypot(a.x-this.px,a.y-this.py)-Math.hypot(b.x-this.px,b.y-this.py));
  switch(pd.cmd){
   case "fetch":this.gems.forEach(g=>g.pull=1);this.pk.forEach(k=>{if(k.k==="coin"||k.k==="chicken")k.pull=1});this.ring(this.px,this.py,520,c,.6);P.x=this.px;P.y=this.py;break;
   case "guard":this.shield=Math.max(this.shield,3.5*pw);this.ring(this.px,this.py,170,c,.5);this.en.forEach(e=>{const d=Math.hypot(e.x-this.px,e.y-this.py);if(d<200&&!e.boss){const a=Math.atan2(e.y-this.py,e.x-this.px);e.x+=Math.cos(a)*60;e.y+=Math.sin(a)*60}});break;
   case "pin":{const all=near(),big=all.filter(e=>e.boss||e.elite||e.rare),t=(big.length?big.slice(0,1):all.slice(0,3));t.forEach(e=>{e.fz=Math.max(e.fz||0,3*pw);e.mk=4*pw;this.ring(e.x,e.y,50,c,.5)});if(t[0]){P.x=t[0].x;P.y=t[0].y}break}
   case "roar":{const R=250;this.ring(this.px,this.py,R,c,.5);this.flash=.15;this.flashC=c;this.en.forEach(e=>{if(e.dead)return;const d=Math.hypot(e.x-this.px,e.y-this.py);if(d<R+e.r){const a=Math.atan2(e.y-this.py,e.x-this.px);this.hurt(e,(30+lv*3)*m*pw,{c,src:null,quiet:0});if(!e.boss){e.x+=Math.cos(a)*90;e.y+=Math.sin(a)*90}}});break}
   case "mend":this.heal(this.stats.maxhp*.2*pw);this.ring(this.px,this.py,150,"#8fe08f",.7);this.burst&&this.burst(this.px,this.py,"#8fe08f",16,120);break;
   case "rush":{const t=near().slice(0,8);t.forEach((e,i)=>this.later_(i*.07,()=>{if(e.dead)return;this.hurt(e,(24+lv*2.2)*m*pw,{c,quiet:0});this.ring(e.x,e.y,30,c,.25);P.x=e.x;P.y=e.y}));break}}
  if(this.burst)this.burst(P.x,P.y,c,10,140);return true}
 step(dt){super.step(dt);if(!this.pet||this.paused||this.ended)return;dt=Math.min(dt,.05);const P=this.pet,m=this.stats.might;
  if(P.cd>0)P.cd-=dt;P.bob+=dt;P.hit=Math.max(0,P.hit-dt);
  if(P.down>0){P.down-=dt;if(P.down<=0){P.hp=P.mhp*.6;P.x=this.px-30;P.y=this.py+10;this.ring(P.x,P.y,50,this.pdat.c,.5)}return}
  /* find something to fight near her, else stay by her side */
  P.at-=dt;if(!P.tg||P.tg.dead||Math.hypot(P.tg.x-this.px,P.tg.y-this.py)>290){P.tg=null;let bd=230;for(const e of this.en){if(e.dead)continue;const d=Math.hypot(e.x-this.px,e.y-this.py);if(d<bd){bd=d;P.tg=e}}}
  let tx,ty,sp=170+20*this.ptier;
  if(P.tg){tx=P.tg.x;ty=P.tg.y}else{const a=this.face>0?Math.PI:0;tx=this.px+Math.cos(a)*38;ty=this.py+14;sp=Math.max(sp,Math.hypot(tx-P.x,ty-P.y)*3)}
  const dx=tx-P.x,dy=ty-P.y,d=Math.hypot(dx,dy);if(d>6){const s=Math.min(sp*dt,d);P.x+=dx/d*s;P.y+=dy/d*s;if(Math.abs(dx)>3)P.face=dx>0?1:-1}
  if(P.tg&&d<P.tg.r+16&&P.at<=0){P.at=.55;this.hurt(P.tg,(9+this.lv*.55)*m*(1+.08*this.ptier)*(this.pkin?1.15:1),{c:this.pdat.c,quiet:1,kb:25})}
  /* the pet is hurt by what touches it; when downed it runs off and comes back */
  let touch=0;for(const e of this.en){if(!e.dead&&!(e.fz>0)&&Math.hypot(e.x-P.x,e.y-P.y)<e.r+10)touch+=e.dmg}
  if(touch>0){P.hp-=touch*.22*dt*(1+this.fi*.04);if(P.hp<=0){P.down=14;P.cd=Math.max(P.cd,4);this.ring(P.x,P.y,70,"#ff6a8a",.5)}}
  else P.hp=Math.min(P.mhp,P.hp+dt*4)}
 draw(ctx,w,h,tms){super.draw(ctx,w,h,tms);const P=this.pet;if(!P)return;const D=this.dpr||1,sc=this.sc||1;
  ctx.save();ctx.setTransform(sc*D,0,0,sc*D,(w/2-this.px*sc)*D,(h/2-this.py*sc)*D);
  const S=48,bob=Math.sin(P.bob*8)*1.5;
  if(P.down>0){ctx.globalAlpha=.5;ctx.fillStyle="#fff";ctx.font="700 12px Georgia";ctx.textAlign="center";ctx.fillText("z z z",this.px,this.py-30);ctx.restore();return}
  ctx.fillStyle="rgba(0,0,0,.3)";ctx.beginPath();ctx.ellipse(P.x,P.y+S*.4,S*.32,S*.1,0,0,TAU);ctx.fill();
  ctx.translate(P.x,P.y+bob);if(P.face<0)ctx.scale(-1,1);if(P.hit>0)ctx.globalAlpha=.7;
  const art=C.petArt(this.petId),psk=C.petSkinOf&&C.skinDef(C.petSkinOf(this.petId)),pT=tms/1000;ctx.imageSmoothingEnabled=true;if(psk&&psk.fx)C.skinFx(ctx,psk,pT,0);ctx.drawImage(art,-S/2,-S/2-4,S,S);if(psk&&psk.fx)C.skinFx(ctx,psk,pT,1);ctx.restore();
  ctx.save();ctx.setTransform(sc*D,0,0,sc*D,(w/2-this.px*sc)*D,(h/2-this.py*sc)*D);
  if(P.hp<P.mhp){ctx.fillStyle="#000a";ctx.fillRect(P.x-14,P.y+S*.5,28,4);ctx.fillStyle=this.pdat.c;ctx.fillRect(P.x-14,P.y+S*.5,28*Math.max(0,P.hp/P.mhp),4)}
  ctx.restore()}
}
C.Run=Run4;

/* ---------- the art: a generated sprite and portrait, with a plain fallback ---------- */
const cache={};
function loadInto(cv,src){const im=new Image();im.onload=()=>{const g=cv.getContext("2d");g.clearRect(0,0,cv.width,cv.height);g.imageSmoothingQuality="high";g.drawImage(im,0,0,cv.width,cv.height);cv.__u=null;cv.__art=1;(cv.__subs||[]).forEach(f=>f())};im.src=src}
function fallback(id,kind){const cv=document.createElement("canvas");cv.width=cv.height=kind==="pp"?192:128;const g=cv.getContext("2d"),c=(C.PETS[id]||{}).c||"#fff";
  g.fillStyle=c;g.beginPath();g.arc(cv.width/2,cv.height/2,cv.width*.32,0,TAU);g.fill();g.fillStyle="#150d24";g.beginPath();g.arc(cv.width*.42,cv.height*.46,cv.width*.04,0,TAU);g.arc(cv.width*.58,cv.height*.46,cv.width*.04,0,TAU);g.fill();return cv}
/* a pet's worn skin is a recolored copy that repaints itself once the art has loaded */
function skinned(base,k,skin){const sk=C.skinDef&&C.skinDef(skin);if(!sk)return base;const k2=k+"|"+skin;if(cache[k2])return cache[k2];const cv=cache[k2]=document.createElement("canvas");cv.width=base.width;cv.height=base.height;
  const paint=()=>{const g=cv.getContext("2d");g.clearRect(0,0,cv.width,cv.height);try{g.drawImage(C.recolor(base,sk),0,0)}catch(e){g.drawImage(base,0,0)}};paint();
  if(base.__art)cv.__art=1;else(base.__subs=base.__subs||[]).push(()=>{paint();cv.__art=1;(cv.__subs||[]).forEach(f=>f())});return cv}
const worn=(id,s)=>s===undefined?(C.petSkinOf?C.petSkinOf(id):null):s;
C.petArt=(id,skin)=>{const k="p_"+id;let cv=cache[k];if(!cv){cv=cache[k]=fallback(id,"p");loadInto(cv,"assets/climb/i_p_"+id+".png")}const s=worn(id,skin);return s?skinned(cv,k,s):cv};
C.petPortrait=(id,skin)=>{const k="pp_"+id;let cv=cache[k];if(!cv){cv=cache[k]=fallback(id,"pp");loadInto(cv,"assets/climb/i_pp_"+id+".png")}const s=worn(id,skin);return s?skinned(cv,k,s):cv};
C.petImg=(id,size,portrait,skin)=>{const cv=portrait?C.petPortrait(id,skin):C.petArt(id,skin),i=new Image(size,size);const set=()=>{i.src=cv.toDataURL()};set();if(!cv.__art)(cv.__subs=cv.__subs||[]).push(set);i.alt="";i.style.cssText="width:"+size+"px;height:"+size+"px;vertical-align:middle;flex:none;image-rendering:auto";return i};
})();
