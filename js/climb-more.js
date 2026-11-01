/* Everspire: Climb the Spire, more of everything. Steady auras, chests that hold 1, 3 or 5 things, a lock list, new weapons and items, and
   unions: a pair of evolved weapons that fuse into something greater. Loaded after climb-ext, which it extends. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.climb.Run)return;
const C=ACAD.climb,W=C.WEAPONS,PS=C.PASSIVES,Base=C.Run,rnd=Math.random;

/* ---------- auras: quicker pulses; evolved ones are a constant ring of damage ---------- */
W.perfume.base.cd=.65;
if(W.soulbloom){W.soulbloom.base.dmg=8;W.soulbloom.base.cd=.25;W.soulbloom.steady=1;W.soulbloom.d="A great bloom that feeds her. A constant ring of damage, no pulse."}

/* ---------- two new items, two new weapons, and their evolutions ---------- */
PS.aegis={n:"Sentinel Pin",ic:"📌",max:5,per:{},inv:.12,d:"+12% longer safety after being hit"};
PS.prism={n:"Prism Locket",ic:"🔮",max:5,per:{area:.06,dur:.06},d:"+6% area and duration"};
const def=(id,o,evolved)=>{o.id=id;if(evolved)o.evolved=true;W[id]=o};
def("javelin",{n:"Skyfall Javelin",ic:"🔱",c:"#9ad8ff",b:"shot",aim:"near",rar:70,d:"A fast spear that pierces a whole line of enemies.",base:{dmg:14,amt:1,cd:1.6,iv:.1,pierce:4,speed:1.8},
 up:["amt+1","dmg+8","pierce+2","amt+1","dmg+8","cd-.3","amt+1"],evo:["aegis","stormlance"]});
def("stormlance",{n:"Stormlance",ic:"⚡",c:"#c8f2ff",b:"shot",aim:"near",d:"A volley of lightning spears that nothing stops.",base:{dmg:58,amt:5,cd:.9,iv:.06,pierce:12,speed:2.1}},1);
def("bracelet",{n:"Charm Bracelet",ic:"📿",c:"#ffb0e0",b:"shot",aim:"rand",rar:60,d:"Three charms fly at random enemies.",base:{dmg:9,amt:3,cd:1.8,iv:.12,pierce:1,speed:1},
 up:["dmg+5","amt+1","cd-.2","dmg+5","amt+1","pierce+1","dmg+8"],evo:["prism","starlit"]});
def("starlit",{n:"Starlit Bracelet",ic:"🌠",c:"#fff0a8",b:"shot",aim:"rand",d:"Charms rain down in a glittering storm.",base:{dmg:34,amt:7,cd:.8,iv:.06,pierce:3,speed:1.2}},1);
W.javelin.bid="pins";W.stormlance.bid="pins";W.bracelet.bid="wand";W.starlit.bid="wand";

/* ---------- unions: two evolved weapons, one fused result ---------- */
C.UNIONS=[];
const uni=(id,n,c,a,b,from,base,extra,bid)=>{const o=Object.assign({},W[from],extra||{});delete o.evo;delete o.union;delete o.lifesteal;if(W[from].lifesteal)o.lifesteal=1;
  o.id=id;o.n=n;o.c=c;o.evolved=true;o.union=null;o.base=base;o.bid=bid;o.tuned=1;W[id]=o;C.UNIONS.push({a,b,to:id})};
uni("crimsonGarden","Crimson Garden","#ff5a9a","bloodrose","soulbloom","soulbloom",{dmg:12,cd:.25,area:3.4},{d:"A vast ring that drinks from everything inside it.",steady:1,lifesteal:1},"perfume");
uni("constellation","Constellation Barrage","#cfe8ff","starfall","thousand","starfall",{dmg:42,amt:8,cd:.3,iv:.03,pierce:5,speed:1.5},{d:"Eight bolts, over and over, a river of stars."},"wand");
uni("stormfire","Stormfire Judgment","#ffb04a","hellfire","thunderloop","thunderloop",{dmg:62,amt:8,cd:2.4,area:2,iv:.06},{d:"Fire and lightning fall together, and again."},"storm");
uni("halo","Halo Whirl","#fff2c0","spiral","heaven","heaven",{dmg:48,amt:6,cd:1.4,iv:.08,speed:1.3,area:1.8},{d:"Six blazing halos that circle back for more."},"crest");
uni("ruinLibrary","Ruin Library","#d09aff","vespers","noFuture","vespers",{dmg:42,amt:8,cd:3,dur:4,speed:1.6,area:1.8},{d:"A ring of ruined tomes that never closes."},"grimoire");
uni("tidebound","Tidebound Hymn","#7affd8","borra","mannajja","borra",{dmg:36,amt:4,cd:2,dur:4,area:2.4,iv:.2},{d:"A roaming flood that sings as it drowns."},"fountain");
C.UNIONS.forEach(u=>{const d=W[u.to];d.d=(d.d||"")+" A union of "+W[u.a].n+" and "+W[u.b].n+"."});

/* ---------- the run ---------- */
class Run3 extends Base{
 constructor(o){super(o);const lk=(this.meta&&this.meta.lock)||{};Object.keys(lk).forEach(id=>{if(lk[id]&&(W[id]||PS[id])&&id!==this.kit.start)this.banished[id]=true})}
 /* chests hold one, three or five things; bosses never fewer than three */
 chestN(hint){const L=this.stats.luck||1,r=rnd()*100;
  if(hint>=3)return r<35*L?5:3;
  return r<4*L?5:r<18*L?3:1}
 drop(k,x,y,n){if(k==="chest"){n=this.chestN(n);this.chests=(this.chests||0)+1}super.drop(k,x,y,n)}
 evolvable(){const out=super.evolvable();
  C.UNIONS.forEach(u=>{const a=this.wp.find(w=>w.id===u.a),b=this.wp.find(w=>w.id===u.b);if(a&&b&&!this.wp.some(w=>w.id===u.to))out.push({from:[u.a,u.b],to:u.to})});return out}
 hit(d){const was=this.hp;super.hit(d);if(this.hp<was){let r=0;for(const id in this.pa)if(PS[id]&&PS[id].inv)r+=PS[id].inv*this.pa[id];if(r)this.invuln*=1+r}}
 fireWeapon(w){const d=w.def;
  if(d.b==="aura"){const s=w.s,R=62*s.area;
   if(d.steady){w.tk=(w.tk||0)+1;const heal=d.lifesteal&&w.tk%4===0?1:0;
    this.en.forEach(e=>{if(!e.dead&&Math.hypot(e.x-this.px,e.y-this.py)<R+e.r)this.hurt(e,s.dmg,{kb:12,c:d.c,heal,src:w,quiet:1})});return}
   this.ring(this.px,this.py,R,d.c,.28);
   this.en.forEach(e=>{if(!e.dead&&Math.hypot(e.x-this.px,e.y-this.py)<R+e.r)this.hurt(e,s.dmg*.55,{kb:25,c:d.c,heal:d.lifesteal?1:0,src:w})});return}
  super.fireWeapon(w)}
}
C.Run=Run3;
})();
