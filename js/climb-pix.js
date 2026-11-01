/* Everspire: Climb the Spire, pixel art. Every item icon and every enemy is built here on a 32x32 grid out of a few shape calls,
   then given an outline and edge shading. No emoji and no image files: weapons, items, pickups and the animals of the Houses are all drawn in code. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb)return;
const C=ACAD.climb,W=C.WEAPONS,PS=C.PASSIVES,N=32,TAU=Math.PI*2;

/* ---------- the drawing kit ---------- */
const TAU_=Math.PI*2;
const hex=h=>{h=String(h||"#888").replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]};
const css=a=>"rgb("+a[0]+","+a[1]+","+a[2]+")";
const tone=(h,d)=>{const a=hex(h);return css(a.map(v=>Math.max(0,Math.min(255,Math.round(v+d)))))};
const mix=(a,b,t)=>{const x=hex(a),y=hex(b);return css(x.map((v,i)=>Math.round(v+(y[i]-v)*t)))};
const S=4,SZ=N*S;
const rgbOf=c=>{c=typeof c==="object"&&c?c.c:c;if(!c)return [128,128,128];if(c[0]==="#")return hex(c);const m=c.match(/[0-9.]+/g);return [+m[0],+m[1],+m[2]]};
const shade=(c,d)=>css(rgbOf(c).map(v=>Math.max(0,Math.min(255,Math.round(v+d)))));
const lite=(c,d)=>shade(c,d);
/* a picture is a list of shape calls on the 32 grid, painted at four times the size with a gradient on each shape, then outlined */
class Pic{
 constructor(){this.ops=[]}
 add(k,a,c){this.ops.push({k,a,c});return this}
 p(x,y,c){return this.add("p",[x,y],c)}
 r(x,y,w,h,c){return this.add("r",[x,y,w,h],c)}
 c(cx,cy,rad,c){return this.add("c",[cx,cy,rad],c)}
 e(cx,cy,rx,ry,c){return this.add("e",[cx,cy,rx,ry],c)}
 l(x1,y1,x2,y2,c,w=1){return this.add("l",[x1,y1,x2,y2,w],c)}
 t(x1,y1,x2,y2,x3,y3,c){return this.add("t",[x1,y1,x2,y2,x3,y3],c)}
 paint(g,op){const q=op.a,k=op.k,col=op.c,plain=col&&typeof col==="object"&&col.fixed;
  const cx=v=>(v+.5)*S;let box,path;
  if(k==="r"){box=[q[0]*S,q[1]*S,(q[0]+q[2])*S,(q[1]+q[3])*S];path=()=>g.rect(box[0],box[1],box[2]-box[0],box[3]-box[1])}
  else if(k==="c"){const R=(q[2]+.5)*S;box=[cx(q[0])-R,cx(q[1])-R,cx(q[0])+R,cx(q[1])+R];path=()=>g.arc(cx(q[0]),cx(q[1]),R,0,TAU)}
  else if(k==="e"){const rx=(q[2]+.5)*S,ry=(q[3]+.5)*S;box=[cx(q[0])-rx,cx(q[1])-ry,cx(q[0])+rx,cx(q[1])+ry];path=()=>g.ellipse(cx(q[0]),cx(q[1]),rx,ry,0,0,TAU)}
  else if(k==="t"){const xs=[cx(q[0]),cx(q[2]),cx(q[4])],ys=[cx(q[1]),cx(q[3]),cx(q[5])];box=[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)];path=()=>{g.moveTo(xs[0],ys[0]);g.lineTo(xs[1],ys[1]);g.lineTo(xs[2],ys[2]);g.closePath()}}
  else if(k==="p"){const R=.85*S;box=[cx(q[0])-R,cx(q[1])-R,cx(q[0])+R,cx(q[1])+R];path=()=>g.arc(cx(q[0]),cx(q[1]),R,0,TAU)}
  else{/* line */const w=Math.max(1,q[4])*S;g.lineCap="round";g.lineJoin="round";g.lineWidth=w;g.beginPath();g.moveTo(cx(q[0]),cx(q[1]));g.lineTo(cx(q[2]),cx(q[3]));
   if(col===null){g.globalCompositeOperation="destination-out";g.strokeStyle="#000"}else{const x0=Math.min(cx(q[0]),cx(q[2])),x1=Math.max(cx(q[0]),cx(q[2])),y0=Math.min(cx(q[1]),cx(q[3])),y1=Math.max(cx(q[1]),cx(q[3])),gr=g.createLinearGradient(x0,y0,x1+1,y1+w);const c0=css(rgbOf(col));gr.addColorStop(0,lite(c0,plain?0:24));gr.addColorStop(1,lite(c0,plain?0:-28));g.strokeStyle=gr}
   g.stroke();g.globalCompositeOperation="source-over";return}
  g.beginPath();path();
  if(col===null){g.globalCompositeOperation="destination-out";g.fillStyle="#000";g.fill();g.globalCompositeOperation="source-over";return}
  const c0=css(rgbOf(col));if(plain){g.fillStyle=c0}else{const gr=g.createLinearGradient(box[0],box[1],box[2]+.01,box[3]+.01);gr.addColorStop(0,lite(c0,30));gr.addColorStop(.55,c0);gr.addColorStop(1,lite(c0,-36));g.fillStyle=gr}g.fill()}
 finish(o={}){const A=document.createElement("canvas");A.width=A.height=SZ;const g=A.getContext("2d");this.ops.forEach(op=>this.paint(g,op));
  const edge=o.edge||"#150d24",sil=(col)=>{const c=document.createElement("canvas");c.width=c.height=SZ;const h=c.getContext("2d");h.drawImage(A,0,0);h.globalCompositeOperation="source-in";h.fillStyle=col;h.fillRect(0,0,SZ,SZ);return c};
  const out=document.createElement("canvas");out.width=out.height=SZ;const og=out.getContext("2d"),D=[[1,0],[-1,0],[0,1],[0,-1],[.7,.7],[-.7,.7],[.7,-.7],[-.7,-.7]];
  if(o.rim){const rs=sil(o.rim);og.globalAlpha=.6;for(const d of D)og.drawImage(rs,d[0]*8,d[1]*8);og.globalAlpha=1}
  const es=sil(edge);for(const d of D){og.drawImage(es,d[0]*4,d[1]*4);og.drawImage(es,d[0]*2.5,d[1]*2.5)}
  og.drawImage(A,0,0);return out}
}
const fx=c=>({c,fixed:1});   /* a pixel the shading leaves alone: eyes, glints */

/* ---------- item icons ---------- */
const ICON={
 /* weapons */
 lash:P=>{P.l(8,25,12,13,"#a0642e",2).l(12,13,20,7,"#b9743a",2).l(20,7,26,9,"#d99a58",2).l(26,9,27,13,"#f2c27a",1);P.r(5,24,4,5,"#c2284a").r(4,27,6,2,"#7a1630").p(27,14,fx("#fff"))},
 wand:P=>{P.l(7,26,21,12,"#7a4a2a",3).r(5,25,4,4,"#d8b25a");P.c(23,9,5,"#6fd0ff").c(23,9,3,"#c8f0ff").p(23,9,fx("#fff"));P.p(23,2,"#fff").p(23,16,"#fff").p(16,9,"#fff").p(30,9,"#fff")},
 pins:P=>{P.l(7,26,24,7,"#d0d8e8",2).c(26,5,3,"#e8c0ff");P.l(5,17,22,25,"#aab4cc",2).c(24,27,3,"#9ad8ff");P.p(10,22,fx("#fff"))},
 cleaver:P=>{P.r(14,5,13,17,"#cfd6e6").r(14,5,13,2,"#f4f7ff").r(24,8,2,2,"#2a2036").r(12,21,4,10,"#7a4a2a").r(11,27,6,3,"#d8b25a");P.l(14,20,26,20,"#9aa4bc",2)},
 crest:P=>{P.t(6,6,26,6,16,28,"#c9a24a").t(8,8,24,8,16,25,"#3a60c8").r(14,10,4,12,"#f2d27a").r(11,13,10,3,"#f2d27a");P.p(10,10,fx("#fff"))},
 grimoire:P=>{P.r(5,8,22,18,"#5a2a7a").r(7,10,18,14,"#f0e4c8").r(15,10,2,14,"#5a2a7a");P.l(9,13,13,13,"#9a8a6a").l(9,16,13,16,"#9a8a6a").l(19,13,23,13,"#9a8a6a").l(19,16,23,16,"#9a8a6a");P.r(5,26,22,2,"#3a1a52")},
 ember:P=>{P.e(16,19,8,9,"#e8541e").e(16,20,5,6,"#ff9a2e").e(16,22,3,4,"#ffe27a");P.t(10,13,13,5,16,14,"#e8541e").t(16,14,19,3,22,13,"#ff9a2e")},
 perfume:P=>{P.r(10,12,12,15,"#ff7ab8").r(12,13,3,12,"#ffc0e0").r(13,6,6,6,"#e8d8f0").r(14,3,4,3,"#d8b25a");P.r(10,12,12,2,"#d83a88");P.p(23,5,"#fff").p(25,8,"#ffd0ec").p(21,4,"#ffd0ec")},
 fountain:P=>{P.e(16,25,12,3,"#6a7a9a").e(16,24,10,2,"#7ad0ff").r(14,13,4,11,"#a0aac0").e(16,13,6,2,"#a0aac0");P.l(16,12,10,6,"#9ae0ff",2).l(16,12,22,6,"#9ae0ff",2).l(16,12,16,4,"#d0f4ff",2)},
 rune:P=>{P.e(16,16,10,12,"#7a8298").e(16,16,8,10,"#4a5268");P.l(16,8,16,24,"#7ad8ff",2).l(16,13,21,17,"#7ad8ff",2).l(16,19,11,15,"#7ad8ff",2)},
 storm:P=>{P.e(14,10,10,5,"#7a82a8").e(21,9,7,5,"#8a92b8").e(10,12,6,4,"#6a7298");P.t(17,14,11,22,16,22,"#ffe27a").t(15,20,21,20,13,30,"#fff2a0")},
 seal:P=>{P.c(16,15,10,"#c0283a").c(16,15,7,"#e0485a");P.l(16,9,16,21,"#ffd0d8",2).l(11,15,21,15,"#ffd0d8",2);P.t(10,24,15,24,12,31,"#b02030").t(17,24,22,24,20,31,"#b02030")},
 dove:P=>{P.e(15,18,8,5,"#f4f6ff").c(23,13,4,"#f4f6ff").t(26,12,30,14,26,15,"#ffb04a");P.t(6,17,3,7,16,11,"#dce4f8").t(10,11,13,5,19,12,"#cdd8f2");P.p(24,12,fx("#2a2036")).t(5,20,10,22,5,26,"#cdd8f2")},
 raven:P=>{P.e(15,18,8,5,"#38304e").c(23,13,4,"#38304e").t(26,12,30,14,26,15,"#c8a24a");P.t(6,17,3,7,16,11,"#4a4068").t(10,11,13,5,19,12,"#5a4e7e");P.p(24,12,fx("#ffd24a")).t(5,20,10,22,5,26,"#4a4068")},
 cat:P=>{P.c(16,18,9,"#ffb0d0").t(8,14,10,4,15,10,"#ffb0d0").t(24,14,22,4,17,10,"#ffb0d0").t(10,12,11,7,13,11,"#ff7ab0").t(22,12,21,7,19,11,"#ff7ab0");P.r(12,16,3,3,fx("#2a2036")).r(18,16,3,3,fx("#2a2036")).p(13,16,fx("#fff")).p(19,16,fx("#fff"));P.p(16,21,"#ff6a9a").l(11,22,6,21,"#fff").l(21,22,26,21,"#fff")},
 song:P=>{P.e(11,24,5,4,"#8affd8").r(15,8,3,17,"#8affd8").t(18,8,26,12,18,14,"#8affd8");P.p(10,23,fx("#fff"));P.l(4,5,8,7,"#c8fff0").l(23,19,28,17,"#c8fff0")},
 pinion:P=>{P.l(5,27,25,5,"#7a5ac8",3);P.t(25,5,27,14,19,10,"#a58aff").t(16,9,22,16,12,16,"#8a6ae0");P.l(7,25,22,8,"#d0c0ff")},
 lancet:P=>{P.c(16,16,12,"#d8d0b0").c(16,16,10,"#f6f0dc");for(let i=0;i<12;i++){const a=i/12*TAU;P.p(16+Math.cos(a)*9,16+Math.sin(a)*9,"#7a6a4a")}P.l(16,16,16,8,"#2a2036",2).l(16,16,22,19,"#2a2036",2);P.c(16,16,2,"#c8a24a")},
 laurel:P=>{for(let i=0;i<6;i++){const y=7+i*4;P.e(9+Math.abs(i-2.5),y,3,2,"#7ad87a").e(23-Math.abs(i-2.5),y,3,2,"#7ad87a")}P.l(9,28,15,29,"#4a9a4a",2).l(23,28,17,29,"#4a9a4a",2);P.c(16,28,2,"#e8c24a")},
 gale:P=>{P.r(5,7,22,18,"#f0e4c8").r(5,7,22,2,"#c8a24a").r(5,23,22,2,"#c8a24a");P.l(9,14,19,14,"#7ac8f0",2).l(19,14,21,17,"#7ac8f0",2).l(9,19,22,19,"#7ac8f0",2).l(22,19,23,16,"#7ac8f0",2)},
 /* items */
 might:P=>{P.r(6,13,20,7,"#e03a4a").r(6,20,5,10,"#e03a4a").r(8,12,16,2,"#ffd24a");P.c(16,16,3,"#ffd24a").r(7,6,18,5,"#e0485a")},
 armor:P=>{P.t(5,6,27,6,16,29,"#6a82c8").t(8,9,24,9,16,25,"#4a62a8");P.l(16,8,16,24,"#9ab0e8",2);P.p(9,9,fx("#fff"))},
 maxhp:P=>{P.c(11,12,6,"#ff3a5a").c(21,12,6,"#ff3a5a").t(5,15,27,15,16,29,"#ff3a5a");P.c(10,10,2,"#ffc0cc")},
 recovery:P=>{P.r(12,5,8,22,"#5ad87a").r(5,12,22,8,"#5ad87a");P.r(14,7,4,18,"#c8ffd8").r(7,14,18,4,"#c8ffd8")},
 cooldown:P=>{P.c(16,16,12,"#4a82d8").c(16,16,10,"#e8f2ff");P.l(16,16,16,9,"#2a2036",2).l(16,16,22,18,"#2a2036",2);P.r(14,2,4,3,"#c8a24a")},
 area:P=>{for(const r of[12,8,4]){for(let i=0;i<40;i++){const a=i/40*TAU;P.p(16+Math.cos(a)*r,16+Math.sin(a)*r,r===12?"#6aa8ff":r===8?"#9ac8ff":"#d0e4ff")}}P.c(16,16,2,"#fff")},
 speed:P=>{P.l(5,27,26,6,"#c8d8f0",3);P.t(26,3,30,12,18,8,"#8ac0ff").t(20,5,23,13,12,10,"#aad0ff");P.l(5,27,9,23,"#e8f2ff")},
 dur:P=>{P.r(7,4,18,3,"#c8a24a").r(7,25,18,3,"#c8a24a");P.t(9,7,23,7,16,16,"#e8d8f0").t(9,25,23,25,16,16,"#ffd24a");P.r(15,16,2,2,"#ffd24a")},
 amount:P=>{P.l(5,22,22,9,"#d0d8e8",2).t(22,5,28,12,17,10,"#d0d8e8");P.l(8,28,25,15,"#9ab0e8",2).t(25,11,30,19,19,17,"#9ab0e8")},
 move:P=>{P.r(10,5,10,15,"#8a5a2e").r(10,19,17,8,"#8a5a2e").r(9,26,19,3,"#3a2a18");P.r(10,5,10,3,"#c8a24a");P.l(12,12,19,12,"#b8864a")},
 magnet:P=>{P.e(16,17,11,12,"#e03a4a");P.e(16,12,5,10,null);P.r(5,4,8,6,"#e8eef8").r(19,4,8,6,"#e8eef8");P.r(5,8,8,2,"#7a8298").r(19,8,8,2,"#7a8298")},
 luck:P=>{P.c(11,11,5,"#3ac85a").c(21,11,5,"#3ac85a").c(11,21,5,"#3ac85a").c(21,21,5,"#3ac85a").c(16,16,3,"#2a9a46");P.l(16,17,18,29,"#2a8a40",2);P.p(10,9,fx("#caffd8"))},
 growth:P=>{P.r(7,10,18,15,"#2a6a8a").r(9,12,14,11,"#f0e4c8").r(15,12,2,11,"#2a6a8a");P.t(4,10,28,10,16,3,"#2a2036").r(14,7,4,3,"#2a2036");P.l(27,9,27,17,"#ffd24a").c(27,18,2,"#ffd24a")},
 greed:P=>{P.e(16,20,10,9,"#c8a24a").e(16,20,8,7,"#e8c24a");P.r(11,8,10,5,"#a0762a").r(13,6,6,3,"#a0762a");P.c(16,21,3,"#ffe27a");P.l(12,9,20,9,"#6a4a18")},
 curse:P=>{P.e(16,14,10,9,"#e8e0f0").r(9,19,14,7,"#e8e0f0").r(11,25,10,3,"#cfc6dc");P.e(12,14,3,3,fx("#2a1a3a")).e(20,14,3,3,fx("#2a1a3a"));P.t(14,19,18,19,16,23,"#2a1a3a");P.p(12,14,fx("#b04aff")).p(20,14,fx("#b04aff"))},
 revive:P=>{P.t(8,26,10,8,24,6,"#f2f6ff").t(13,10,22,22,8,24,"#cfe0ff");P.l(8,26,24,6,"#ffffff");P.e(16,3,8,2,"#ffe27a");P.e(16,3,4,1,null)},
 reroll:P=>{P.r(6,6,20,20,"#f4f2ff").c(11,11,2,"#2a2036").c(21,11,2,"#2a2036").c(16,16,2,"#2a2036").c(11,21,2,"#2a2036").c(21,21,2,"#2a2036")},
 skip:P=>{P.t(5,6,5,26,16,16,"#9ab0e8").t(15,6,15,26,26,16,"#9ab0e8");P.r(26,6,3,20,"#9ab0e8")},
 banish:P=>{P.c(16,16,12,"#e03a4a").c(16,16,9,"#2a2036");P.l(10,10,22,22,"#ff6a7a",3).l(22,10,10,22,"#ff6a7a",3)},
 /* pickups */
 coin:P=>{P.c(16,16,10,"#c8921a").c(16,16,8,"#ffd24a").c(16,16,5,"#f2b82a");P.r(15,11,2,10,"#a0720a");P.p(11,11,fx("#fff3b0")).p(12,10,fx("#fff3b0"))},
 gem:P=>{P.t(16,4,5,14,16,28,"#4ab0ff").t(16,4,27,14,16,28,"#2a82e8");P.l(5,14,27,14,"#9ad8ff");P.t(16,4,10,14,16,14,"#c8f0ff");P.p(11,11,fx("#fff"))},
 chest:P=>{P.r(5,13,22,15,"#8a5a2e").r(5,8,22,8,"#a0702e").r(5,17,22,2,"#c8a24a").r(14,15,4,6,"#ffd24a");P.r(5,8,22,2,"#c8a24a").r(5,26,22,2,"#5a3a18");P.p(8,10,fx("#fff"))},
 bomb:P=>{P.c(15,19,10,"#38304e").c(15,19,8,"#4a4268");P.r(18,5,3,6,"#a0702e");P.l(21,5,25,2,"#ffd24a",2);P.p(26,1,fx("#ffe27a"));P.p(11,15,fx("#d0c8f0")).p(12,14,fx("#d0c8f0"))},
 chicken:P=>{P.e(13,15,9,8,"#c8742e").e(12,13,5,4,"#e8985a");P.l(20,20,26,26,"#f0e4c8",3);P.c(27,27,2,"#f0e4c8").c(25,28,2,"#f0e4c8")},
 /* odds and ends */
 gold:P=>ICON.greed(P),
 star:P=>{P.t(16,3,20,12,12,12,"#ffe27a").t(28,12,19,15,22,24,"#ffe27a").t(4,12,13,15,10,24,"#ffe27a").t(16,28,12,19,20,19,"#ffe27a").c(16,15,5,"#ffe27a")},
 lock:P=>{P.r(8,14,16,13,"#8a92a8").r(11,6,3,9,"#aab2c8").r(18,6,3,9,"#aab2c8").r(11,6,10,3,"#aab2c8").r(15,18,2,5,"#2a2036")}
};
/* a few ids the data names differently */
const ALIAS={recovery:"recovery",duration:"dur",dur:"dur"};

const cache={};
function tintAll(P,col){const b=rgbOf(col);P.ops.forEach(op=>{const c=op.c;if(!c||typeof c==="object")return;const a=rgbOf(c),l=(a[0]*.3+a[1]*.59+a[2]*.11)/255;op.c=css(b.map(v=>Math.round(Math.min(255,v*(.45+l*.9)))))})}
function glyph(P,tw,col){/* a tiny twist mark in the corner of a signature weapon */
  const m={bn:[[1,0],[0,1],[1,1],[2,1],[1,2]],ch:[[0,0],[1,1],[2,2],[2,0],[0,2]],ar:[[1,0],[0,1],[1,1],[2,1],[1,2]],lc:[[0,1],[1,1],[2,1],[1,0],[1,2]]}[tw]||[[0,0],[1,0],[0,1],[1,1]];
  m.forEach(([x,y])=>P.p(26+x,3+y,fx(col)))}
function sparkle(P,col){[[3,4],[27,9],[6,26],[26,25]].forEach(([x,y])=>{P.p(x,y,fx(col)).p(x-1,y,fx(col)).p(x+1,y,fx(col)).p(x,y-1,fx(col)).p(x,y+1,fx(col))})}
const baseOf=id=>{if(ICON[id])return id;const d=W[id];if(!d)return null;
  if(d.bid&&ICON[d.bid])return d.bid;
  for(const k in W){const w=W[k];if(w.evo&&w.evo[1]===id&&ICON[k])return k;if(w.union&&w.union[1]===id&&ICON[k])return k}return null};

function build(id){
  const d=W[id]||PS[id]||null;let P=new Pic();
  if(ICON[id])ICON[id](P);
  else if(id.startsWith("hr_")){/* an heirloom: a charm on a chain, its gem in her colour */
    const col=(PS[id]&&PS[id].c)||gemOf(id);P.l(9,4,16,12,"#c8a24a").l(23,4,16,12,"#c8a24a");P.c(16,19,8,"#c8a24a").c(16,19,6,"#2a2036").c(16,19,5,col).c(14,17,2,tone(col,70));P.p(13,16,fx("#fff"))}
  else if(W[id]){const b=baseOf(id);if(b)ICON[b](P);else ICON.star(P);
    if(W[id].evolved||/^x_/.test(id)){tintAll(P,W[id].c||"#ffe27a");sparkle(P,"#fff7c8")}
    else if(/^s_/.test(id)){tintAll(P,W[id].c||"#ff9ac8");glyph(P,W[id].twist,"#fff")}}
  else if(PS[id]){ICON.star(P)}
  else ICON.star(P);
  return P}
const gemOf=id=>{let h=0;for(const ch of id)h=(h*31+ch.charCodeAt(0))>>>0;return "#"+[h&255,(h>>8)&255,(h>>16)&255].map(v=>(90+v%140).toString(16).padStart(2,"0")).join("")};

/* the icon as a canvas (cached), or an <img> ready to place in the page */
/* generated art (assets/climb/): drawn over the procedural picture once it loads, which stays as the fallback */
const HAVE=new Set(/*ART-LIST*/["e_clockwork_0","e_clockwork_1","e_clockwork_2","e_clockwork_3","e_clockwork_4","e_clockwork_5","e_coil_0","e_coil_1","e_coil_2","e_coil_3","e_coil_4","e_coil_5","e_deep_0","e_deep_1","e_deep_2","e_deep_3","e_deep_4","e_deep_5","e_frost_0","e_frost_1","e_frost_2","e_frost_3","e_frost_4","e_frost_5","e_grove_0","e_grove_1","e_grove_2","e_grove_3","e_grove_4","e_grove_5","e_hive_0","e_hive_1","e_hive_2","e_hive_3","e_hive_4","e_hive_5","e_legends_0","e_legends_1","e_legends_2","e_legends_3","e_legends_4","e_legends_5","e_pack_0","e_pack_1","e_pack_2","e_pack_3","e_pack_4","e_pack_5","e_plumes_0","e_plumes_1","e_plumes_2","e_plumes_3","e_plumes_4","e_plumes_5","e_pride_0","e_pride_1","e_pride_2","e_pride_3","e_pride_4","e_pride_5","e_synth_0","e_synth_1","e_synth_2","e_synth_3","e_synth_4","e_synth_5","e_talons_0","e_talons_1","e_talons_2","e_talons_3","e_talons_4","e_talons_5","e_vigil_0","e_vigil_1","e_vigil_2","e_vigil_3","e_vigil_4","e_vigil_5","e_void_0","e_void_1","e_void_2","e_void_3","e_void_4","e_void_5","i_aegis","i_amount","i_area","i_armor","i_banish","i_bloodrose","i_bomb","i_borra","i_bracelet","i_cat","i_chest","i_chicken","i_cleaver","i_coin","i_constellation","i_cooldown","i_crest","i_crimsonGarden","i_curse","i_dawnDusk","i_dove","i_duration","i_ember","i_famished","i_fountain","i_gale","i_gem","i_greed","i_grimoire","i_growth","i_halo","i_heaven","i_hellfire","i_hr_almanac","i_hr_android","i_hr_angelfish","i_hr_archive","i_hr_arcticfox","i_hr_augur","i_hr_aurora","i_hr_automaton","i_hr_axolotl","i_hr_badger","i_hr_bee","i_hr_beetle","i_hr_beluga","i_hr_birdofparadise","i_hr_bloom","i_hr_butterfly","i_hr_caracal","i_hr_chameleon","i_hr_cheetah","i_hr_chronicle","i_hr_cipher","i_hr_cobra","i_hr_cockatoo","i_hr_comet","i_hr_companion","i_hr_cougar","i_hr_coyote","i_hr_cradle","i_hr_crane","i_hr_crocodile","i_hr_crow","i_hr_dingo","i_hr_dolphin","i_hr_dragon","i_hr_dragonfly","i_hr_eagle","i_hr_eclipse","i_hr_eel","i_hr_entropy","i_hr_ermine","i_hr_falcon","i_hr_fennec","i_hr_firefly","i_hr_flamingo","i_hr_fox","i_hr_frog","i_hr_gearwright","i_hr_gecko","i_hr_glitch","i_hr_golem","i_hr_griffin","i_hr_grimoire","i_hr_harpseal","i_hr_hawk","i_hr_hedgehog","i_hr_hollow","i_hr_hologram","i_hr_horizon","i_hr_hourglass","i_hr_hummingbird","i_hr_hush","i_hr_husky","i_hr_hyena","i_hr_iguana","i_hr_insomnia","i_hr_jackal","i_hr_jaguar","i_hr_jellyfish","i_hr_kingfisher","i_hr_kirin","i_hr_kitsune","i_hr_koala","i_hr_koi","i_hr_kraken","i_hr_ladybug","i_hr_lantern","i_hr_leopard","i_hr_lethe","i_hr_lioness","i_hr_lovebird","i_hr_lullaby","i_hr_lynx","i_hr_macaw","i_hr_magpie","i_hr_mainspring","i_hr_manta","i_hr_manticore","i_hr_mantis","i_hr_maw","i_hr_medic","i_hr_metronome","i_hr_moth","i_hr_muse","i_hr_narwhal","i_hr_nebula","i_hr_nereid","i_hr_nightmare","i_hr_nova","i_hr_oblivion","i_hr_orca","i_hr_osprey","i_hr_otter","i_hr_owl","i_hr_panda","i_hr_panther","i_hr_peacock","i_hr_pegasus","i_hr_pendulum","i_hr_penguin","i_hr_penumbra","i_hr_phoenix","i_hr_polarbear","i_hr_portent","i_hr_prototype","i_hr_puffin","i_hr_pulsar","i_hr_quasar","i_hr_rabbit","i_hr_raccoon","i_hr_rapture","i_hr_rat","i_hr_raven","i_hr_redpanda","i_hr_regent","i_hr_reindeer","i_hr_reverie","i_hr_salmon","i_hr_scorpion","i_hr_seahorse","i_hr_seance","i_hr_seraph","i_hr_serpent","i_hr_serval","i_hr_shark","i_hr_shiba","i_hr_singularity","i_hr_siren","i_hr_snowyowl","i_hr_sovereign","i_hr_sphinx","i_hr_spider","i_hr_squirrel","i_hr_stag","i_hr_stardust","i_hr_sundial","i_hr_swan","i_hr_tiger","i_hr_titan","i_hr_tourbillon","i_hr_turtle","i_hr_umbra","i_hr_unicorn","i_hr_valkyrie","i_hr_vector","i_hr_vesper","i_hr_viper","i_hr_voyager","i_hr_vulture","i_hr_wolf","i_hr_wraith","i_javelin","i_lancet","i_lash","i_laurel","i_luck","i_magnet","i_mannajja","i_maxhp","i_might","i_move","i_noFuture","i_p_almanac","i_p_android","i_p_angelfish","i_p_archive","i_p_arcticfox","i_p_augur","i_p_aurora","i_p_automaton","i_p_axolotl","i_p_badger","i_p_bee","i_p_beetle","i_p_beluga","i_p_birdofparadise","i_p_bloom","i_p_butterfly","i_p_caracal","i_p_chameleon","i_p_cheetah","i_p_chronicle","i_p_cipher","i_p_cobra","i_p_cockatoo","i_p_comet","i_p_companion","i_p_cougar","i_p_coyote","i_p_cradle","i_p_crane","i_p_crocodile","i_p_crow","i_p_dingo","i_p_dolphin","i_p_dragon","i_p_dragonfly","i_p_eagle","i_p_eclipse","i_p_eel","i_p_entropy","i_p_ermine","i_p_falcon","i_p_fennec","i_p_firefly","i_p_flamingo","i_p_fox","i_p_frog","i_p_gearwright","i_p_gecko","i_p_glitch","i_p_golem","i_p_griffin","i_p_grimoire","i_p_harpseal","i_p_hawk","i_p_hedgehog","i_p_hollow","i_p_hologram","i_p_horizon","i_p_hourglass","i_p_hummingbird","i_p_hush","i_p_husky","i_p_hyena","i_p_iguana","i_p_insomnia","i_p_jackal","i_p_jaguar","i_p_jellyfish","i_p_kingfisher","i_p_kirin","i_p_kitsune","i_p_koala","i_p_koi","i_p_kraken","i_p_ladybug","i_p_lantern","i_p_leopard","i_p_lethe","i_p_lioness","i_p_lovebird","i_p_lullaby","i_p_lynx","i_p_macaw","i_p_magpie","i_p_mainspring","i_p_manta","i_p_manticore","i_p_mantis","i_p_maw","i_p_medic","i_p_metronome","i_p_moth","i_p_muse","i_p_narwhal","i_p_nebula","i_p_nereid","i_p_nightmare","i_p_nova","i_p_oblivion","i_p_orca","i_p_osprey","i_p_otter","i_p_owl","i_p_panda","i_p_panther","i_p_peacock","i_p_pegasus","i_p_pendulum","i_p_penguin","i_p_penumbra","i_p_phoenix","i_p_polarbear","i_p_portent","i_p_prototype","i_p_puffin","i_p_pulsar","i_p_quasar","i_p_rabbit","i_p_raccoon","i_p_rapture","i_p_rat","i_p_raven","i_p_redpanda","i_p_regent","i_p_reindeer","i_p_reverie","i_p_salmon","i_p_scorpion","i_p_seahorse","i_p_seance","i_p_seraph","i_p_serpent","i_p_serval","i_p_shark","i_p_shiba","i_p_singularity","i_p_siren","i_p_snowyowl","i_p_sovereign","i_p_sphinx","i_p_spider","i_p_squirrel","i_p_stag","i_p_stardust","i_p_sundial","i_p_swan","i_p_tiger","i_p_titan","i_p_tourbillon","i_p_turtle","i_p_umbra","i_p_unicorn","i_p_valkyrie","i_p_vector","i_p_vesper","i_p_viper","i_p_voyager","i_p_vulture","i_p_wolf","i_p_wraith","i_perfume","i_pinion","i_pins","i_pp_almanac","i_pp_android","i_pp_angelfish","i_pp_archive","i_pp_arcticfox","i_pp_augur","i_pp_aurora","i_pp_automaton","i_pp_axolotl","i_pp_badger","i_pp_bee","i_pp_beetle","i_pp_beluga","i_pp_birdofparadise","i_pp_bloom","i_pp_butterfly","i_pp_caracal","i_pp_chameleon","i_pp_cheetah","i_pp_chronicle","i_pp_cipher","i_pp_cobra","i_pp_cockatoo","i_pp_comet","i_pp_companion","i_pp_cougar","i_pp_coyote","i_pp_cradle","i_pp_crane","i_pp_crocodile","i_pp_crow","i_pp_dingo","i_pp_dolphin","i_pp_dragon","i_pp_dragonfly","i_pp_eagle","i_pp_eclipse","i_pp_eel","i_pp_entropy","i_pp_ermine","i_pp_falcon","i_pp_fennec","i_pp_firefly","i_pp_flamingo","i_pp_fox","i_pp_frog","i_pp_gearwright","i_pp_gecko","i_pp_glitch","i_pp_golem","i_pp_griffin","i_pp_grimoire","i_pp_harpseal","i_pp_hawk","i_pp_hedgehog","i_pp_hollow","i_pp_hologram","i_pp_horizon","i_pp_hourglass","i_pp_hummingbird","i_pp_hush","i_pp_husky","i_pp_hyena","i_pp_iguana","i_pp_insomnia","i_pp_jackal","i_pp_jaguar","i_pp_jellyfish","i_pp_kingfisher","i_pp_kirin","i_pp_kitsune","i_pp_koala","i_pp_koi","i_pp_kraken","i_pp_ladybug","i_pp_lantern","i_pp_leopard","i_pp_lethe","i_pp_lioness","i_pp_lovebird","i_pp_lullaby","i_pp_lynx","i_pp_macaw","i_pp_magpie","i_pp_mainspring","i_pp_manta","i_pp_manticore","i_pp_mantis","i_pp_maw","i_pp_medic","i_pp_metronome","i_pp_moth","i_pp_muse","i_pp_narwhal","i_pp_nebula","i_pp_nereid","i_pp_nightmare","i_pp_nova","i_pp_oblivion","i_pp_orca","i_pp_osprey","i_pp_otter","i_pp_owl","i_pp_panda","i_pp_panther","i_pp_peacock","i_pp_pegasus","i_pp_pendulum","i_pp_penguin","i_pp_penumbra","i_pp_phoenix","i_pp_polarbear","i_pp_portent","i_pp_prototype","i_pp_puffin","i_pp_pulsar","i_pp_quasar","i_pp_rabbit","i_pp_raccoon","i_pp_rapture","i_pp_rat","i_pp_raven","i_pp_redpanda","i_pp_regent","i_pp_reindeer","i_pp_reverie","i_pp_salmon","i_pp_scorpion","i_pp_seahorse","i_pp_seance","i_pp_seraph","i_pp_serpent","i_pp_serval","i_pp_shark","i_pp_shiba","i_pp_singularity","i_pp_siren","i_pp_snowyowl","i_pp_sovereign","i_pp_sphinx","i_pp_spider","i_pp_squirrel","i_pp_stag","i_pp_stardust","i_pp_sundial","i_pp_swan","i_pp_tiger","i_pp_titan","i_pp_tourbillon","i_pp_turtle","i_pp_umbra","i_pp_unicorn","i_pp_valkyrie","i_pp_vector","i_pp_vesper","i_pp_viper","i_pp_voyager","i_pp_vulture","i_pp_wolf","i_pp_wraith","i_prism","i_raven","i_recovery","i_reroll","i_revive","i_ruinLibrary","i_rune","i_s_almanac","i_s_android","i_s_angelfish","i_s_archive","i_s_arcticfox","i_s_augur","i_s_aurora","i_s_automaton","i_s_axolotl","i_s_badger","i_s_bee","i_s_beetle","i_s_beluga","i_s_birdofparadise","i_s_bloom","i_s_butterfly","i_s_caracal","i_s_chameleon","i_s_cheetah","i_s_chronicle","i_s_cipher","i_s_cobra","i_s_cockatoo","i_s_comet","i_s_companion","i_s_cougar","i_s_coyote","i_s_cradle","i_s_crane","i_s_crocodile","i_s_crow","i_s_dingo","i_s_dolphin","i_s_dragon","i_s_dragonfly","i_s_eagle","i_s_eclipse","i_s_eel","i_s_entropy","i_s_ermine","i_s_falcon","i_s_fennec","i_s_firefly","i_s_flamingo","i_s_fox","i_s_frog","i_s_gearwright","i_s_gecko","i_s_glitch","i_s_golem","i_s_griffin","i_s_grimoire","i_s_harpseal","i_s_hawk","i_s_hedgehog","i_s_hollow","i_s_hologram","i_s_horizon","i_s_hourglass","i_s_hummingbird","i_s_hush","i_s_husky","i_s_hyena","i_s_iguana","i_s_insomnia","i_s_jackal","i_s_jaguar","i_s_jellyfish","i_s_kingfisher","i_s_kirin","i_s_kitsune","i_s_koala","i_s_koi","i_s_kraken","i_s_ladybug","i_s_lantern","i_s_leopard","i_s_lethe","i_s_lioness","i_s_lovebird","i_s_lullaby","i_s_lynx","i_s_macaw","i_s_magpie","i_s_mainspring","i_s_manta","i_s_manticore","i_s_mantis","i_s_maw","i_s_medic","i_s_metronome","i_s_moth","i_s_muse","i_s_narwhal","i_s_nebula","i_s_nereid","i_s_nightmare","i_s_nova","i_s_oblivion","i_s_orca","i_s_osprey","i_s_otter","i_s_owl","i_s_panda","i_s_panther","i_s_peacock","i_s_pegasus","i_s_pendulum","i_s_penguin","i_s_penumbra","i_s_phoenix","i_s_polarbear","i_s_portent","i_s_prototype","i_s_puffin","i_s_pulsar","i_s_quasar","i_s_rabbit","i_s_raccoon","i_s_rapture","i_s_rat","i_s_raven","i_s_redpanda","i_s_regent","i_s_reindeer","i_s_reverie","i_s_salmon","i_s_scorpion","i_s_seahorse","i_s_seance","i_s_seraph","i_s_serpent","i_s_serval","i_s_shark","i_s_shiba","i_s_singularity","i_s_siren","i_s_snowyowl","i_s_sovereign","i_s_sphinx","i_s_spider","i_s_squirrel","i_s_stag","i_s_stardust","i_s_sundial","i_s_swan","i_s_tiger","i_s_titan","i_s_tourbillon","i_s_turtle","i_s_umbra","i_s_unicorn","i_s_valkyrie","i_s_vector","i_s_vesper","i_s_viper","i_s_voyager","i_s_vulture","i_s_wolf","i_s_wraith","i_seal","i_skip","i_song","i_soulbloom","i_speed","i_spiral","i_starfall","i_starlessMoon","i_starlit","i_storm","i_stormfire","i_stormlance","i_thousand","i_thunderloop","i_tidebound","i_valkyrie","i_vespers","i_wand","i_x_almanac","i_x_android","i_x_angelfish","i_x_archive","i_x_arcticfox","i_x_augur","i_x_aurora","i_x_automaton","i_x_axolotl","i_x_badger","i_x_bee","i_x_beetle","i_x_beluga","i_x_birdofparadise","i_x_bloom","i_x_butterfly","i_x_caracal","i_x_chameleon","i_x_cheetah","i_x_chronicle","i_x_cipher","i_x_cobra","i_x_cockatoo","i_x_comet","i_x_companion","i_x_cougar","i_x_coyote","i_x_cradle","i_x_crane","i_x_crocodile","i_x_crow","i_x_dingo","i_x_dolphin","i_x_dragon","i_x_dragonfly","i_x_eagle","i_x_eclipse","i_x_eel","i_x_entropy","i_x_ermine","i_x_falcon","i_x_fennec","i_x_firefly","i_x_flamingo","i_x_fox","i_x_frog","i_x_gearwright","i_x_gecko","i_x_glitch","i_x_golem","i_x_griffin","i_x_grimoire","i_x_harpseal","i_x_hawk","i_x_hedgehog","i_x_hollow","i_x_hologram","i_x_horizon","i_x_hourglass","i_x_hummingbird","i_x_hush","i_x_husky","i_x_hyena","i_x_iguana","i_x_insomnia","i_x_jackal","i_x_jaguar","i_x_jellyfish","i_x_kingfisher","i_x_kirin","i_x_kitsune","i_x_koala","i_x_koi","i_x_kraken","i_x_ladybug","i_x_lantern","i_x_leopard","i_x_lethe","i_x_lioness","i_x_lovebird","i_x_lullaby","i_x_lynx","i_x_macaw","i_x_magpie","i_x_mainspring","i_x_manta","i_x_manticore","i_x_mantis","i_x_maw","i_x_medic","i_x_metronome","i_x_moth","i_x_muse","i_x_narwhal","i_x_nebula","i_x_nereid","i_x_nightmare","i_x_nova","i_x_oblivion","i_x_orca","i_x_osprey","i_x_otter","i_x_owl","i_x_panda","i_x_panther","i_x_peacock","i_x_pegasus","i_x_pendulum","i_x_penguin","i_x_penumbra","i_x_phoenix","i_x_polarbear","i_x_portent","i_x_prototype","i_x_puffin","i_x_pulsar","i_x_quasar","i_x_rabbit","i_x_raccoon","i_x_rapture","i_x_rat","i_x_raven","i_x_redpanda","i_x_regent","i_x_reindeer","i_x_reverie","i_x_salmon","i_x_scorpion","i_x_seahorse","i_x_seance","i_x_seraph","i_x_serpent","i_x_serval","i_x_shark","i_x_shiba","i_x_singularity","i_x_siren","i_x_snowyowl","i_x_sovereign","i_x_sphinx","i_x_spider","i_x_squirrel","i_x_stag","i_x_stardust","i_x_sundial","i_x_swan","i_x_tiger","i_x_titan","i_x_tourbillon","i_x_turtle","i_x_umbra","i_x_unicorn","i_x_valkyrie","i_x_vector","i_x_vesper","i_x_viper","i_x_voyager","i_x_vulture","i_x_wolf","i_x_wraith"]);
function overlay(cv,src){const im=new Image();im.onload=()=>{const g=cv.getContext("2d");g.clearRect(0,0,cv.width,cv.height);g.imageSmoothingEnabled=true;g.imageSmoothingQuality="high";g.drawImage(im,0,0,cv.width,cv.height);cv.__u=null;cv.__art=1;(cv.__subs||[]).forEach(f=>f())};im.src=src}
C.icon=id=>{id=ALIAS[id]||id;if(cache[id])return cache[id];const P=build(id),cv=cache[id]=P.finish();if(HAVE.has("i_"+id))overlay(cv,"assets/climb/i_"+id+".png");return cv};
C.iconURL=id=>{const c=C.icon(id);return c.__u||(c.__u=c.toDataURL())};
C.iconEl=(id,size=32,title)=>{const i=new Image(size,size),c=C.icon(id);i.src=C.iconURL(id);if(!c.__art&&HAVE.has("i_"+(ALIAS[id]||id)))(c.__subs=c.__subs||[]).push(()=>{i.src=C.iconURL(id)});i.alt="";if(title)i.title=title;i.style.cssText="width:"+size+"px;height:"+size+"px;vertical-align:middle;flex:none";return i};

/* ---------- the animals of the Houses ---------- */
/* each body plan draws a creature facing right on the 32 grid; a species is [plan, body, belly, dark, options] */
const PLAN={
 cat:(P,a,b,k,o)=>{const L=o.includes("L");P.e(14,19,8,5,a).e(15,22,5,2,b);[8,11,17,20].forEach((x,i)=>P.r(x,22,2,6,i%2?tone(a,-20):a));
  P.l(6,17,3,10,a,2).l(3,10,5,7,a,2);P.c(24,15,5,a).e(26,17,3,2,b);P.t(20,11,21,5,25,10,a).t(25,10,26,5,29,11,a);P.p(21,7,k).p(27,7,k);
  if(o.includes("m")){P.c(21,16,7,k);P.c(24,15,5,a);P.e(26,17,3,2,b)}
  if(o.includes("s"))for(const x of[10,13,16,19])P.l(x,15,x-1,19,k);
  if(o.includes("p"))for(const [x,y] of[[10,17],[14,16],[18,18],[12,21],[16,21]])P.p(x,y,k);
  if(o.includes("h"))P.t(26,8,30,2,29,10,k);
  P.p(25,14,fx("#fff")).p(26,14,fx("#150d24")).p(28,17,k)},
 dog:(P,a,b,k,o)=>{P.e(14,19,8,5,a).e(15,22,5,2,b);[8,11,17,20].forEach((x,i)=>P.r(x,22,2,6,i%2?tone(a,-20):a));
  const big=o.includes("E");P.l(6,18,2,11,a,3);if(!o.includes("n"))P.c(3,11,2,b);P.c(23,15,4,a).r(25,15,6,3,b).p(30,15,k);
  P.t(19,9,21,15,23,10,a).t(24,10,25,15,27,9,a);if(big){P.t(18,3,20,12,23,10,a).t(24,10,26,12,29,3,a)}
  if(o.includes("s"))for(const x of[10,13,16])P.l(x,16,x,19,k);P.p(25,14,fx("#fff")).p(26,14,fx("#150d24"))},
 bird:(P,a,b,k,o)=>{const fly=o.includes("f"),long=o.includes("n");
  if(long){P.e(14,19,6,4,a);P.l(18,17,22,8,a,2);P.c(23,6,3,a);P.t(25,5,30,7,25,8,"#e8a22a");P.l(12,22,12,30,k).l(16,22,16,30,k);P.p(24,5,fx("#fff")).p(24,5,fx("#150d24"));P.t(8,18,3,20,9,22,b);return}
  P.e(15,18,7,5,a).e(14,20,5,3,b);P.c(22,12,4,a);P.t(25,11,30,13,25,14,"#f0a22a");P.p(23,11,fx("#fff")).p(24,11,fx("#150d24"));
  if(fly){P.t(8,16,3,4,15,14,b).t(15,14,24,2,19,15,b);P.t(8,16,12,12,15,16,tone(a,-25))}else{P.e(14,17,5,3,tone(a,-25));P.l(13,22,13,28,k).l(17,22,17,28,k)}
  P.t(8,17,2,20,8,23,k);if(o.includes("c"))P.t(20,8,21,2,24,8,b);if(o.includes("t"))P.t(8,18,1,10,9,24,b)},
 snake:(P,a,b,k,o)=>{for(let i=0;i<20;i++){const x=3+i*1.1,y=23+Math.sin(i*.55)*4;P.c(x,y,i>14?2.6:3,i%4<2?a:tone(a,-18))}
  P.c(25,14,4,a);P.c(25,15,3,a);if(o.includes("h")){P.e(24,15,6,5,a);P.e(24,16,3,3,b)}P.p(26,13,fx("#fff")).p(27,13,fx("#150d24"));P.l(29,16,31,15,"#e8386a").p(31,17,"#e8386a")},
 fish:(P,a,b,k,o)=>{if(o.includes("m")){P.t(2,14,16,8,16,22,a).t(30,14,16,8,16,22,a);P.e(16,16,5,5,b);P.l(16,22,16,29,a);P.p(18,15,fx("#fff"));return}
  P.e(15,16,10,6,a).e(15,19,7,3,b);P.t(4,16,1,8,1,24,tone(a,-20));if(o.includes("s"))P.t(12,10,16,3,19,10,k);P.t(14,22,17,28,20,22,tone(a,-25));
  if(o.includes("n"))P.l(24,13,31,9,"#f4f0e0",2);P.p(21,14,fx("#fff")).p(22,14,fx("#150d24"));P.l(24,19,26,19,k)},
 bug:(P,a,b,k,o)=>{const fly=o.includes("f"),sc=o.includes("c");P.e(14,19,6,4,a);P.c(22,17,3,k);P.p(23,16,fx("#fff")).p(24,16,fx("#ff4a5a"));P.l(24,14,27,9,k).l(22,14,22,9,k);
  [11,14,17].forEach(x=>{P.l(x,22,x-2,28,k);P.l(x,22,x+2,28,k)});
  if(fly){P.e(11,12,5,3,mix(b,"#ffffff",.5));P.e(18,11,4,3,mix(b,"#ffffff",.5))}
  if(o.includes("l")){P.e(14,19,6,4,"#e83a3a");P.l(14,15,14,23,k);for(const [x,y] of[[11,18],[17,18],[12,21],[16,21]])P.p(x,y,k)}
  if(sc){P.l(8,18,5,12,a,2).l(5,12,9,5,a,2).t(8,3,12,4,10,8,"#e83a3a");P.t(24,18,29,15,26,21,a);P.t(24,19,29,23,26,17,a)}
  if(o.includes("t")){P.e(14,17,5,6,a);P.e(20,12,3,5,a);P.c(22,7,3,a);P.p(23,6,fx("#fff"));P.l(24,12,29,16,a,2);P.l(24,12,29,8,a,2)}
  if(o.includes("g")){P.c(10,20,2,"#ffee66")}},
 mouse:(P,a,b,k,o)=>{const big=o.includes("B");P.e(14,20,7,6,a).e(15,23,4,3,b);P.c(22,17,4,a);P.c(21,12,2,b).c(25,12,2,b);if(o.includes("r")){P.l(21,13,20,3,a,2).l(25,13,26,3,a,2)}
  P.l(6,23,2,16,k);if(o.includes("q")){P.e(6,16,5,8,a)}if(o.includes("h")){for(let i=0;i<7;i++)P.t(5+i*2,18,6+i*2,9,8+i*2,18,k)}
  P.p(23,16,fx("#fff")).p(24,16,fx("#150d24")).p(26,18,k);P.r(10,26,2,2,k).r(17,26,2,2,k)},
 bear:(P,a,b,k,o)=>{P.e(14,19,10,8,a);[7,12,18,22].forEach(x=>P.r(x,23,4,6,tone(a,-15)));P.c(25,14,5,a).e(27,16,3,2,b).p(29,15,k);P.c(21,9,2,k).c(26,9,2,k);
  if(o.includes("P")){P.e(11,18,4,6,k);P.e(21,18,3,5,k);P.c(23,13,2,k);P.c(27,13,2,k)}if(o.includes("b")){P.l(12,13,12,27,b,2);}if(o.includes("w")){P.e(14,18,8,6,b)}
  P.p(26,13,fx("#fff")).p(27,13,fx("#150d24"))},
 deer:(P,a,b,k,o)=>{P.e(13,18,8,4,a).e(14,20,5,2,b);[7,10,17,20].forEach(x=>P.r(x,21,2,8,tone(a,-20)));P.l(19,17,23,9,a,3);P.c(24,8,3,a).e(27,9,2,2,b);
  P.t(21,5,22,1,23,6,a);if(o.includes("a")){P.l(23,5,21,1,"#d8c8a0").l(21,3,19,2,"#d8c8a0").l(25,5,27,1,"#d8c8a0").l(27,3,29,2,"#d8c8a0")}
  if(o.includes("u"))P.l(24,5,26,0,"#fff0a0",2);if(o.includes("w")){P.t(5,16,2,4,13,13,b).t(14,12,8,2,10,16,b)}P.l(5,17,3,22,k,2);P.p(25,8,fx("#fff")).p(26,8,fx("#150d24"))},
 frog:(P,a,b,k,o)=>{const liz=o.includes("l"),croc=o.includes("C");
  if(liz||croc){P.e(14,21,9,3,a);P.l(5,22,1,26,a,2);P.c(23,19,3,a);P.r(25,20,5,3,croc?a:b);if(croc){P.r(25,21,6,1,fx("#f4f0e0"));P.e(14,20,11,4,a)}[9,12,17,20].forEach(x=>P.r(x,23,2,5,tone(a,-18)));P.p(24,17,fx("#fff")).p(24,17,fx("#150d24"));
   if(o.includes("t"))for(let i=0;i<5;i++)P.p(8+i*3,17,k);return}
  if(o.includes("T")){P.e(15,19,10,7,a);P.e(15,18,7,4,b);P.c(26,20,3,a);P.p(27,19,fx("#150d24"));[8,22].forEach(x=>P.r(x,24,3,4,tone(a,-15)));return}
  P.e(15,21,9,5,a).e(15,23,6,3,b);P.c(22,17,5,a);P.c(20,12,2,"#fff").c(25,12,2,"#fff");P.p(20,12,fx("#150d24")).p(25,12,fx("#150d24"));P.t(4,26,12,22,10,28,tone(a,-18)).r(20,26,7,3,tone(a,-18))},
 jelly:(P,a,b,k,o)=>{const big=o.includes("K");P.e(16,12,big?12:9,big?9:7,a).e(16,12,big?8:6,big?5:4,b);for(let i=0;i<(big?6:5);i++){const x=big?6+i*4:8+i*4;for(let y=0;y<(big?14:12);y++)P.p(x+(y%4<2?0:1),(big?20:17)+y,i%2?a:tone(a,-20))}
  if(big){P.c(16,11,4,"#fff");P.c(16,11,2,"#150d24")}else{P.p(13,11,fx("#fff")).p(19,11,fx("#fff"))}},
 robot:(P,a,b,k,o)=>{if(o.includes("g")){P.c(16,16,9,a);P.c(16,16,5,k);P.c(16,16,3,b);for(let i=0;i<8;i++){const t=i/8*TAU;P.r(Math.round(16+Math.cos(t)*11)-1,Math.round(16+Math.sin(t)*11)-1,3,3,a)}return}
  P.r(9,12,14,12,a).r(11,14,10,6,b).r(12,25,3,4,k).r(17,25,3,4,k);P.r(11,4,10,8,a);P.r(12,6,3,3,fx("#ff4a3a")).r(17,6,3,3,fx("#ff4a3a"));P.l(16,4,16,1,k);P.c(16,1,1,"#ff4a3a");P.r(5,13,4,9,tone(a,-20)).r(23,13,4,9,tone(a,-20));P.p(13,16,k).p(18,16,k)},
 ghost:(P,a,b,k,o)=>{P.c(16,12,8,a);P.r(8,12,16,13,a);for(let i=0;i<4;i++)P.t(8+i*4,25,10+i*4,30,12+i*4,25,a);if(o.includes("h")){P.e(16,12,5,5,k)}
  P.e(13,12,2,3,fx(o.includes("h")?"#ffe27a":"#150d24")).e(19,12,2,3,fx(o.includes("h")?"#ffe27a":"#150d24"));if(o.includes("c")){P.r(14,2,4,6,"#f0e4c8");P.t(14,2,18,2,16,-1,"#ffb04a")}P.e(16,18,2,1,k)},
 orb:(P,a,b,k,o)=>{P.c(16,16,9,a).c(15,15,6,b).c(14,14,2,"#fff");if(o.includes("e")){P.e(16,16,4,3,"#fff");P.c(16,16,2,k)}if(o.includes("r")){for(let i=0;i<30;i++){const t=i/30*TAU;P.p(16+Math.cos(t)*12,16+Math.sin(t)*4,b)}}
  if(o.includes("t")){P.l(8,18,1,24,a,3).l(5,13,1,10,tone(a,-30),2)}if(o.includes("s")){for(const [x,y] of[[4,6],[27,8],[6,27],[26,25]])P.p(x,y,fx("#fff"))}}
};

/* six animals per floor: small, medium, large, flier, second medium, wisp */
const FAUNA={
 legends:[["dog","#e8782a","#fff2d8","#6a3a1a","nE"],["deer","#f4f2ff","#c8d0ff","#8a80c8","u"],["cat","#e8c050","#fff2c0","#7a5a1a","Lm"],["bird","#ff7a2a","#ffd24a","#a02a0a","fct"],["deer","#d8e8ff","#ffffff","#7a90c8","w"],["bird","#ffd24a","#fff2a0","#a07a1a","fc"]],
 pride:[["cat","#d8a460","#f4e0b0","#4a3018",""],["cat","#d89a30","#f4e0b0","#2a1a08","p"],["cat","#e8821a","#fff0d0","#2a1a08","sL"],["cat","#c8a070","#f0e0c0","#3a2810","p"],["cat","#383848","#7a7a98","#0a0a14",""],["cat","#c8b090","#f4ecd8","#3a2a18","h"]],
 pack:[["dog","#e8d098","#fff4d8","#6a5028","E"],["dog","#8a92a8","#e0e4f0","#2a2e40","s"],["dog","#a07a4a","#e8d0a0","#2a1a0a","s"],["dog","#f0f4ff","#ffffff","#7a88a8","n"],["dog","#e0702a","#ffffff","#3a1a0a",""],["dog","#d8a050","#fff4d0","#5a3a14","n"]],
 grove:[["mouse","#8a8090","#c8c0d0","#4a4458",""],["bear","#4a4a58","#f0f0f8","#12121c","b"],["bear","#f4f4fa","#ffffff","#1a1a24","P"],["mouse","#c8742e","#f4e0b8","#6a3a14","q"],["mouse","#6a4a38","#d8c0a0","#2a1a12","h"],["mouse","#f0e8e0","#ffd0d8","#8a7a78","r"]],
 frost:[["bird","#2a3050","#f4f8ff","#e8a22a",""],["bear","#8a98b8","#e8f0ff","#2a3450","w"],["bear","#f4f8ff","#dde8ff","#3a4a6a",""],["bird","#303850","#ffffff","#ff7a3a","f"],["fish","#a8b8d8","#f4f8ff","#3a4a6a","n"],["mouse","#f0f4ff","#ffffff","#2a2a3a","q"]],
 deep:[["fish","#ffb04a","#fff0d0","#a04a0a",""],["fish","#6a82a8","#e0e8f4","#2a3450","s"],["jelly","#7a3ab8","#c8a0f0","#2a1250","K"],["fish","#4a7ac8","#a0c8f8","#1a2a58","m"],["snake","#3a6a8a","#9ac8d8","#0a2a3a",""],["jelly","#7ad0e8","#d0f4ff","#2a6a8a",""]],
 plumes:[["bird","#e83a6a","#ffb0c8","#6a0a28","f"],["bird","#2a82b8","#3acf9a","#0a3a58","tc"],["bird","#ff8aa8","#ffd0dc","#a02a50","n"],["bird","#3ac8a0","#c8ff7a","#0a5a48","f"],["bird","#e8382a","#2a82e8","#5a0a0a","tc"],["bird","#2ab8e8","#f0a22a","#0a3a58",""]],
 talons:[["bird","#38304e","#5a4e7e","#150d24","f"],["bird","#b89a6a","#f4e8c8","#4a3a1a","c"],["bird","#6a4a2a","#f4f0e0","#2a1a0a","f"],["bird","#2a2438","#4a4468","#0a0814","f"],["bird","#8a6a4a","#f0e4c8","#3a2a14","f"],["bird","#4a4238","#a08a6a","#1a1410","n"]],
 coil:[["frog","#8aa86a","#d8e8b0","#3a5a2a","lt"],["snake","#c8a24a","#f4e8b0","#5a4210","h"],["frog","#4a6a3a","#8aa86a","#1a2a12","Ct"],["frog","#8ac84a","#d8f4a0","#3a5a14","l"],["snake","#4a8a6a","#c8f0d8","#10382a",""],["frog","#4ac86a","#c8ffd0","#146a2a",""]],
 hive:[["bug","#e83a3a","#ffffff","#150d24","l"],["bug","#2a4a68","#7ab8e8","#0a1a2a",""],["bug","#c8a24a","#f4e0a0","#3a2a0a","c"],["bug","#ffc82a","#fff8c0","#2a1a08","f"],["bug","#5aa84a","#c8f0a0","#1a3a14","t"],["bug","#3a3a48","#ffee66","#0a0a14","fg"]],
 clockwork:[["robot","#c89a4a","#f4d890","#4a3410","g"],["robot","#b8864a","#ffd890","#3a2810",""],["robot","#8a6a3a","#e8c880","#2a1c08",""],["bird","#c8a24a","#f4e0a0","#5a4210","f"],["robot","#a0a8b8","#e0e8f4","#2a3040",""],["robot","#d8b45a","#fff0b0","#5a4210","g"]],
 vigil:[["ghost","#a89ad8","#e0d8ff","#3a2a6a","c"],["deer","#4a3a68","#8a7ac8","#150a2a","a"],["ghost","#5a4a88","#a090e0","#150a2a","h"],["bird","#3a2a58","#7a6aa8","#0a0518","f"],["ghost","#c8c0e8","#ffffff","#4a3a7a",""],["orb","#ffd870","#fff4c0","#a06a1a","s"]],
 synth:[["robot","#8ac8e8","#e0f4ff","#1a3a5a",""],["robot","#c8d0e8","#ffffff","#3a4260",""],["robot","#7a8298","#c8d0e8","#1a2030",""],["bird","#9ad0f0","#ffffff","#2a4a6a","f"],["robot","#f0a8c8","#ffe0ec","#6a2a48",""],["ghost","#5ae0f0","#c8ffff","#0a5a6a",""]],
 void:[["orb","#2a1a58","#8a5aff","#0a0518","s"],["ghost","#2a1a48","#6a4ac8","#0a0518","h"],["jelly","#150a30","#4a2a98","#05020c","K"],["orb","#a0d0ff","#ffffff","#2a4a8a","t"],["ghost","#3a2a6a","#8a6aff","#0a0518",""],["orb","#ff9ae0","#ffe0f4","#8a2a6a","r"]]
};
/* which of the six each enemy kind uses */
const ROLE={blob:0,shade:1,gear:2,bat:3,thorn:4,wisp:5,archer:4,charger:2,splitter:0};
const eCache={};
C.enemyArt=(kind,floorId,acc)=>{const key=kind+"|"+floorId+"|"+acc;if(eCache[key])return eCache[key];
  const set=FAUNA[floorId]||FAUNA.legends,sp=set[ROLE[kind]!=null?ROLE[kind]:1],P=new Pic();
  PLAN[sp[0]](P,sp[1],sp[2],sp[3],sp[4]||"");
  if(kind==="archer"){P.l(26,8,30,12,"#c8a24a").l(30,12,26,16,"#c8a24a");P.l(26,8,26,16,"#e8e0d0")}
  if(kind==="charger"){P.t(25,6,27,0,28,7,"#fff0d0");P.p(26,13,fx("#ff3a3a"))}
  const cv=eCache[key]=P.finish({rim:acc}),ri=ROLE[kind]!=null?ROLE[kind]:1,fk="e_"+(FAUNA[floorId]?floorId:"legends")+"_"+ri;
  if(HAVE.has(fk))overlay(cv,"assets/climb/"+fk+".png");
  return cv};
C.faunaOf=floorId=>FAUNA[floorId];
C.pix={Pic,PLAN,ICON,build};
})();
