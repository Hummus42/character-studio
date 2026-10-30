/* Everspire map: procedural pixel art. Draws each area's ground and every room as a small cutaway building on a canvas at 1/4 scale (crisp when enlarged),
   so the plan reads like an RPG overworld. Rooms look run-down until restored and gain lanterns, banners, plants and gilding as they improve.
   Used by the living-map engine (blk-map.js) through ACAD.pix; the painted room art still shows when you step inside a room. */
(function(){
"use strict";
if(typeof ACAD==="undefined")return;
const PS=4;
function RNG(s){let a=0;for(let i=0;i<s.length;i++)a=(a*31+s.charCodeAt(i))>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rgb=h=>{h=String(h||"#777").replace("#","");if(h.length===3)h=h.split("").map(x=>x+x).join("");return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]};
const hx=(r,g,b)=>"#"+[r,g,b].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const sh=(c,f)=>{const[r,g,b]=rgb(c);if(f<=1)return hx(r*f,g*f,b*f);const t=f-1;return hx(r+(255-r)*t,g+(255-g)*t,b+(255-b)*t)};
const mix=(a,b,t)=>{const x=rgb(a),y=rgb(b);return hx(x[0]+(y[0]-x[0])*t,x[1]+(y[1]-x[1])*t,x[2]+(y[2]-x[2])*t)};
const K=2;
function Cv(w,h){w=Math.max(4,w);h=Math.max(4,h);const c=document.createElement("canvas");c.width=w*K;c.height=h*K;c.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges;pointer-events:none";
  const x=c.getContext("2d");x.imageSmoothingEnabled=false;
  return{c,x,w,h,K,
    r:(X,Y,W,H,col)=>{if(W<=0||H<=0)return;x.fillStyle=col;x.fillRect(Math.round(X*K),Math.round(Y*K),Math.round(W*K),Math.round(H*K))},
    p:(X,Y,col)=>{x.fillStyle=col;x.fillRect(Math.round(X*K),Math.round(Y*K),K,K)},
    fr:(X,Y,W,H,col)=>{if(W<=0||H<=0)return;x.fillStyle=col;x.fillRect(Math.round(X),Math.round(Y),Math.round(W),Math.round(H))},
    fp:(X,Y,col)=>{x.fillStyle=col;x.fillRect(Math.round(X),Math.round(Y),1,1)}}}
/* fine-resolution helpers (coordinates in real canvas pixels) */
const disc=(o,cx,cy,r,col)=>{o.x.fillStyle=col;for(let y=-Math.floor(r);y<=Math.floor(r);y++){const hw=Math.sqrt(Math.max(0,r*r-y*y));o.x.fillRect(Math.round(cx-hw),Math.round(cy+y),Math.max(1,Math.round(hw*2)),1)}};
const grain=(o,X,Y,W,H,amt,R)=>{const x0=Math.max(0,Math.round(X*K)),y0=Math.max(0,Math.round(Y*K)),w=Math.min(o.c.width-x0,Math.round(W*K)),h=Math.min(o.c.height-y0,Math.round(H*K));if(w<=0||h<=0)return;
  const im=o.x.getImageData(x0,y0,w,h),d=im.data;for(let i=0;i<d.length;i+=4){if(!d[i+3])continue;const n=(R()-.5)*2*amt;d[i]=Math.max(0,Math.min(255,d[i]+n));d[i+1]=Math.max(0,Math.min(255,d[i+1]+n));d[i+2]=Math.max(0,Math.min(255,d[i+2]+n))}o.x.putImageData(im,x0,y0)};
const shade=(o,X,Y,W,H,a)=>o.fr(X*K,Y*K,W*K,H*K,"rgba(0,0,0,"+a+")"),glowc=(o,X,Y,W,H,col,a)=>o.fr(X*K,Y*K,W*K,H*K,col.replace("A",a));
const bev=(o,X,Y,W,H,a)=>{o.fr(X*K,Y*K,W*K,1,"rgba(255,255,255,"+(a||.14)+")");o.fr(X*K,Y*K,1,H*K,"rgba(255,255,255,"+((a||.14)*.6)+")");o.fr(X*K,(Y+H)*K-1,W*K,1,"rgba(0,0,0,"+((a||.14)*1.4)+")");o.fr((X+W)*K-1,Y*K,1,H*K,"rgba(0,0,0,"+((a||.14)*.9)+")")};

/* ---------- floor patterns ---------- */
const PAT={
 planks(o,R,X,Y,W,H,c){for(let y=0;y<H;y+=3){const hh=Math.min(3,H-y);o.r(X,Y+y,W,hh,sh(c,.9+R()*.16));o.r(X,Y+y+2,W,1,sh(c,.7));o.fr(X*K,(Y+y)*K,W*K,1,"rgba(255,255,255,.1)");
    for(let x=(R()*9)|0;x<W;x+=7+((R()*7)|0)){o.r(X+x,Y+y,1,hh,sh(c,.62));o.fp((X+x)*K+2,(Y+y)*K+1,"rgba(0,0,0,.35)")}
    for(let g=0;g<W/5;g++){const gx=X*K+R()*W*K,gy=(Y+y)*K+1+R()*3;o.fr(gx,gy,3+R()*6,1,R()<.5?"rgba(255,255,255,.07)":"rgba(0,0,0,.1)")}}},
 checker(o,R,X,Y,W,H,c){for(let y=0;y<H;y+=4)for(let x=0;x<W;x+=4){const w=Math.min(4,W-x),h=Math.min(4,H-y);o.r(X+x,Y+y,w,h,((x+y)/4)%2?sh(c,.84):sh(c,1.08));bev(o,X+x,Y+y,w,h,.07)}},
 carpet(o,R,X,Y,W,H,c){o.r(X,Y,W,H,sh(c,.74));o.r(X+1,Y+1,W-2,H-2,sh(c,.88));o.r(X+2,Y+2,W-4,H-4,c);o.r(X+3,Y+3,W-6,H-6,sh(c,.9));for(let y=5;y<H-5;y+=4)for(let x=5+(((y/4)|0)%2?2:0);x<W-5;x+=4){o.p(X+x,Y+y,sh(c,1.3));o.fp((X+x)*K+1,(Y+y)*K+1,sh(c,.7))}o.fr((X+2)*K,(Y+2)*K,(W-4)*K,1,"rgba(255,230,160,.35)");o.fr((X+2)*K,(Y+H-2)*K-1,(W-4)*K,1,"rgba(255,230,160,.25)");grain(o,X,Y,W,H,6,R)},
 stone(o,R,X,Y,W,H,c){o.r(X,Y,W,H,sh(c,.72));for(let y=0,row=0;y<H;y+=4,row++)for(let x=-(row%2?3:0);x<W;x+=6){const xx=Math.max(0,x),ww=Math.min(5,W-xx,x+5-xx);if(ww>0){const hh=Math.min(3,H-y);o.r(X+xx,Y+y,ww,hh,sh(c,.9+R()*.24));bev(o,X+xx,Y+y,ww,hh,.13);if(R()<.18)o.fp((X+xx)*K+1+R()*2,(Y+y)*K+1,"rgba(0,0,0,.22)")}}grain(o,X,Y,W,H,7,R)},
 grass(o,R,X,Y,W,H,c){o.r(X,Y,W,H,c);for(let i=0;i<W*H*.5;i++)o.fp((X+R()*W)*K,(Y+R()*H)*K,R()<.5?sh(c,.84):sh(c,1.18));for(let i=0;i<W*H*.05;i++){const x=(X+R()*W)*K,y=(Y+R()*H)*K;o.fr(x,y,1,2,sh(c,.62));o.fp(x+1,y-1,sh(c,1.35))}for(let i=0;i<W*H*.006;i++){const x=(X+R()*W)*K,y=(Y+R()*H)*K,fc=["#f4e27a","#f2f2f2","#e58ab4","#9ab8f0"][(R()*4)|0];o.fp(x,y,fc);o.fp(x-1,y,sh(fc,.85));o.fp(x+1,y,sh(fc,.85));o.fp(x,y-1,sh(fc,.85));o.fp(x,y+1,"#e8c840")}},
 water(o,R,X,Y,W,H,c){for(let y=0;y<H;y++){const t=Math.abs((y/H)-.5)*2;o.r(X,Y+y,W,1,sh(c,.82+.28*(1-t*.6)))}for(let y=0;y<H;y+=3){const off=R()*10;for(let x=-off;x<W;x+=9+R()*6)o.fr((X+Math.max(0,x))*K,(Y+y)*K+1,Math.min(7+R()*5,(W-x)*K),1,"rgba(255,255,255,.14)")}for(let i=0;i<W*H*.05;i++){const x=(X+R()*W)*K,y=(Y+R()*H)*K;o.fr(x,y,3+R()*5,1,"rgba(255,255,255,.34)");o.fr(x+1,y+1,2+R()*3,1,"rgba(0,40,90,.25)")}},
 dirt(o,R,X,Y,W,H,c){o.r(X,Y,W,H,c);for(let i=0;i<W*H*.7;i++)o.fp((X+R()*W)*K,(Y+R()*H)*K,R()<.5?sh(c,.86):sh(c,1.14));for(let i=0;i<W*H*.04;i++){const x=(X+R()*W)*K,y=(Y+R()*H)*K;o.fr(x,y,2+R()*2,1,sh(c,.66));o.fp(x,y-1,sh(c,1.25))}},
 marble(o,R,X,Y,W,H,c){o.r(X,Y,W,H,sh(c,.82));for(let y=0;y<H;y+=6)for(let x=0;x<W;x+=6){const w=Math.min(5,W-x),h=Math.min(5,H-y);o.r(X+x,Y+y,w,h,((x+y)/6)%2?sh(c,.95):sh(c,1.06));bev(o,X+x,Y+y,w,h,.16);for(let v=0;v<2;v++)o.fr((X+x)*K+R()*w*K,(Y+y)*K+R()*h*K,3+R()*4,1,"rgba(120,120,150,.22)")}},
 tile(o,R,X,Y,W,H,c){o.r(X,Y,W,H,sh(c,.7));for(let y=0;y<H;y+=4)for(let x=0;x<W;x+=4){const w=Math.min(3,W-x),h=Math.min(3,H-y);o.r(X+x,Y+y,w,h,sh(c,.98+R()*.14));bev(o,X+x,Y+y,w,h,.16)}},
 rock(o,R,X,Y,W,H,c){o.r(X,Y,W,H,sh(c,.74));for(let i=0;i<W*H*.14;i++){const x=X+R()*W,y=Y+R()*H,w=2+((R()*4)|0);o.r(x,y,w,2,sh(c,.9+R()*.3));o.r(x,y+2,w,1,sh(c,.55));o.fr(x*K,y*K,w*K,1,"rgba(255,255,255,.16)")}grain(o,X,Y,W,H,8,R)}
};
const pat=(o,R,n,X,Y,W,H,c)=>(PAT[n]||PAT.stone)(o,R,X,Y,W,H,c);

/* ---------- small sprites ---------- */
const tree=(o,R,x,y,s)=>{s=s||1;const u=s,fx=x*K,fy=y*K;o.fr(fx+2*u,fy+14*u,11*u,3*u,"rgba(0,0,0,.26)");o.fr(fx+6*u,fy+10*u,2*u,6*u,"#5a3b22");o.fr(fx+7*u,fy+10*u,1*u,6*u,"#3e2815");
  disc(o,fx+7*u,fy+7*u,7*u,"#2a5a30");disc(o,fx+6*u,fy+6*u,6*u,"#3a7e3e");disc(o,fx+5*u,fy+5*u,4*u,"#52a04c");disc(o,fx+4*u,fy+4*u,2*u,"#7cc468");
  for(let i=0;i<12;i++){const a=R()*6.28,d=R()*6*u;o.fp(fx+7*u+Math.cos(a)*d,fy+7*u+Math.sin(a)*d,R()<.5?"#24502a":"#6cb85c")}};
const shelfRow=(o,R,x,y,w,h)=>{shade(o,x,y+h,w,1,.35);o.r(x,y,w,h,"#5a3a22");o.r(x,y,w,1,"#7a5232");for(let i=1;i<w-1;i+=2){const hh=h-2-((R()*2)|0);o.r(x+i,y+h-1-hh,1,hh,["#b0413a","#3c68a8","#4a9a5a","#d6b04a","#8a4aa0","#e8e0d0"][(R()*6)|0]);if(i+1<w-1)o.r(x+i+1,y+h-1-hh,1,hh,["#b0413a","#3c68a8","#4a9a5a","#d6b04a","#8a4aa0"][(R()*5)|0])}};
const table=(o,x,y,w,h,c)=>{c=c||"#9a6a3c";shade(o,x+1,y+h+1,w,2,.3);o.r(x,y,w,h,c);o.r(x,y,w,1,sh(c,1.25));o.r(x,y+h,w,1,sh(c,.6));o.p(x+1,y+h+1,sh(c,.5));o.p(x+w-2,y+h+1,sh(c,.5))};
const chair=(o,x,y,c)=>{o.r(x,y,2,2,c||"#6a3f24")};
const bed=(o,R,x,y)=>{shade(o,x+1,y+5,8,1,.3);o.r(x,y,8,5,"#6a4428");o.r(x+1,y+1,6,3,["#e8e6f0","#f0e0d0"][(R()*2)|0]);o.r(x+3,y+1,4,3,["#4a6ac0","#c04a5a","#4aa07a","#c0903a","#8a5ac0"][(R()*5)|0]);o.r(x+1,y+1,2,3,"#fff")};
const sofa=(o,R,x,y,w,c)=>{shade(o,x+1,y+4,w,1,.3);c=c||["#8a3a5a","#3a6a8a","#5a8a4a"][(R()*3)|0];o.r(x,y,w,3,sh(c,.7));o.r(x,y+1,w,2,c);o.r(x,y+3,w,1,sh(c,.55));o.r(x,y,1,4,sh(c,.8));o.r(x+w-1,y,1,4,sh(c,.8))};
const barrel=(o,x,y)=>{shade(o,x+1,y+3,3,1,.35);o.r(x,y,3,3,"#7a5030");o.r(x,y+1,3,1,"#3a2a1a");o.p(x+1,y,"#9a6a3c")};
const planter=(o,R,x,y,w,h)=>{shade(o,x+1,y+h,w,1,.3);o.r(x,y,w,h,"#6a4428");o.r(x+1,y+1,w-2,h-2,"#4a2f1c");for(let i=x+1;i<x+w-1;i+=2){o.p(i,y+1,"#4a9a4a");o.p(i,y,["#e8508a","#f4d24a","#f2f2f2","#b06ae0"][(R()*4)|0])}};
const fountain=(o,x,y,r)=>{const fx=x*K,fy=y*K,fr=r*K;disc(o,fx+1,fy+2,fr+2,"rgba(0,0,0,.3)");disc(o,fx,fy,fr,"#6a6f78");disc(o,fx,fy,fr-2,"#9aa0a8");disc(o,fx,fy,fr-4,"#3a78b8");disc(o,fx-1,fy-1,Math.max(1,fr-6),"#4a98d8");
  for(let a=0;a<6;a++)o.fp(fx+Math.cos(a)*(fr-6)*.6,fy+Math.sin(a)*(fr-6)*.6,"#cdeaff");o.fr(fx-1,fy-3,2,4,"#e8f6ff");o.fp(fx,fy-4,"#fff")};
const pillar=(o,x,y,h)=>{shade(o,x+1,y+h,3,1,.3);o.r(x,y,2,h,"#cfc8d8");o.r(x,y,2,1,"#fff");o.r(x+1,y,1,h,"#a8a0b8");o.r(x-1,y+h-1,4,1,"#8a8498")};
const frame=(o,x,y,c)=>{o.r(x,y,4,3,"#d6b04a");o.r(x+1,y+1,2,1,c)};
const candle=(o,x,y)=>{o.r(x,y+1,1,2,"#e8e0d0");o.p(x,y,"#ffd870");o.p(x,y-1,"#ff9a3a")};
const fireplace=(o,x,y)=>{o.r(x,y,8,4,"#5a5062");o.r(x+1,y+1,6,3,"#1a1218");o.r(x+2,y+2,4,2,"#e8742a");o.r(x+3,y+1,2,2,"#ffd24a")};
const desk=(o,x,y)=>{shade(o,x+1,y+3,4,1,.28);o.r(x,y,4,2,"#8a6038");o.r(x,y+2,4,1,"#5a3a22");chair(o,x+1,y+3,"#4a3020")};

const PROPS={
 shelves(o,R,b){const n=Math.max(1,Math.floor((b.w-2)/8));for(let i=0;i<n;i++)shelfRow(o,R,b.x+1+i*8,b.y,7,5);if(b.h>18)for(let i=0;i<n;i++)if(R()<.7)shelfRow(o,R,b.x+1+i*8,b.y+b.h-14,7,5)},
 tables(o,R,b){const n=Math.max(1,Math.floor(b.w/22));for(let i=0;i<Math.min(n,3);i++){const x=b.x+(b.w/(Math.min(n,3)+1))*(i+1)-5,y=b.y+b.h/2-3;table(o,x,y,10,4);chair(o,x+1,y-2);chair(o,x+7,y-2);chair(o,x+1,y+5);chair(o,x+7,y+5)}},
 longtables(o,R,b){const rows=Math.max(1,Math.floor(b.h/14));for(let r=0;r<rows;r++){const y=b.y+3+r*Math.floor((b.h-6)/rows)+3;table(o,b.x+4,y,b.w-8,3,"#8a5a30");for(let x=b.x+6;x<b.x+b.w-8;x+=5){chair(o,x,y-2,"#5a3a22");chair(o,x,y+5,"#5a3a22");o.p(x+1,y+1,"#f4f0e0")}}},
 beds(o,R,b){const cols=Math.max(1,Math.floor(b.w/10)),rows=Math.max(1,Math.floor((b.h-4)/9));for(let r=0;r<Math.min(rows,3);r++)for(let c=0;c<Math.min(cols,6);c++)bed(o,R,b.x+2+c*10,b.y+r*9)},
 desks(o,R,b){for(let y=b.y+4;y<b.y+b.h-9;y+=7)for(let x=b.x+3;x<b.x+b.w-6;x+=7)desk(o,x,y);o.r(b.x+b.w/2-5,b.y,10,3,"#6a4428")},
 teacher(o,R,b){o.r(b.x+b.w/2-6,b.y,12,2,"#2a3a2a");table(o,b.x+b.w/2-4,b.y+3,8,3)},
 labtables(o,R,b){for(let y=b.y+2;y<b.y+b.h-8;y+=9)for(let x=b.x+3;x<b.x+b.w-9;x+=12){o.r(x,y,9,4,"#c8d0d8");o.r(x,y+4,9,1,"#7a8088");o.p(x+2,y+1,"#e84a4a");o.p(x+5,y+1,"#4ac8e8");o.p(x+7,y+2,"#7ae04a")}},
 planters(o,R,b){for(let x=b.x+2;x<b.x+b.w-6;x+=9){planter(o,R,x,b.y+1,7,3);if(b.h>16)planter(o,R,x,b.y+b.h-9,7,3);if(b.h>30)planter(o,R,x,b.y+(b.h>>1)-2,7,3)}},
 trees(o,R,b){const n=Math.floor(b.w*b.h/90);for(let i=0;i<n;i++)tree(o,R,b.x+R()*(b.w-6),b.y+R()*(b.h-8),1)},
 sofas(o,R,b){sofa(o,R,b.x+2,b.y+b.h-9,10);if(b.w>40)sofa(o,R,b.x+b.w-14,b.y+b.h-9,10);table(o,b.x+b.w/2-4,b.y+b.h/2-1,8,3,"#7a5030")},
 fire(o,R,b){fireplace(o,b.x+b.w/2-4,b.y)},
 barrels(o,R,b){for(let i=0;i<Math.min(14,Math.floor(b.w*b.h/60));i++)barrel(o,b.x+R()*(b.w-4),b.y+R()*(b.h-4))},
 pool(o,R,b){o.r(b.x+3,b.y+3,b.w-6,b.h-8,"#7a8aa0");o.r(b.x+4,b.y+4,b.w-8,b.h-10,"#4aa0d8");for(let i=0;i<8;i++)o.r(b.x+5+R()*(b.w-12),b.y+5+R()*(b.h-14),3,1,"#bfe8ff")},
 tanks(o,R,b){for(let x=b.x+2;x<b.x+b.w-10;x+=11){o.r(x,b.y,9,6,"#2a4a6a");o.r(x+1,b.y+1,7,4,"#3a8ac0");o.r(x+2+((R()*4)|0),b.y+2,2,1,["#f0a040","#e85a5a","#f4e04a"][(R()*3)|0])}},
 piano(o,R,b){o.r(b.x+b.w/2-5,b.y+3,10,5,"#1a1620");o.r(b.x+b.w/2-4,b.y+6,8,2,"#f0f0f0");for(let i=0;i<4;i++)o.p(b.x+b.w/2-3+i*2,b.y+6,"#222");chair(o,b.x+b.w/2-1,b.y+9,"#4a3020");for(let i=0;i<3;i++)chair(o,b.x+4+i*7,b.y+b.h-8,"#6a3f24")},
 easels(o,R,b){for(let x=b.x+4;x<b.x+b.w-8;x+=9){o.r(x,b.y+3,5,6,"#f0ece0");o.r(x+1,b.y+4,3,3,["#d85a4a","#4a8ad8","#d8c04a","#5ab070"][(R()*4)|0]);o.r(x+2,b.y+9,1,3,"#6a4428");o.p(x,b.y+12,"#6a4428");o.p(x+4,b.y+12,"#6a4428")}},
 mirror(o,R,b){o.r(b.x+1,b.y,b.w-2,3,"#a8d8f0");for(let x=b.x+2;x<b.x+b.w-3;x+=6)o.r(x,b.y,1,3,"#e8f8ff");o.r(b.x+3,b.y+b.h-8,b.w-6,1,"#d8c8a0")},
 trophies(o,R,b){o.r(b.x+b.w/2-3,b.y,6,b.h-1,"#a02830");o.r(b.x+b.w/2-2,b.y,4,b.h-1,"#c8383a");for(let y=b.y+2;y<b.y+b.h-4;y+=6){o.r(b.x+1,y,5,5,"#4a3a2a");o.r(b.x+2,y+1,3,3,"#e0b53a");o.r(b.x+b.w-6,y,5,5,"#4a3a2a");o.r(b.x+b.w-5,y+1,3,3,"#e0b53a")}},
 cases(o,R,b){for(let x=b.x+3;x<b.x+b.w-8;x+=10){for(let y=b.y+2;y<b.y+b.h-8;y+=9){o.r(x,y,7,5,"#8a8a98");o.r(x+1,y+1,5,3,"#d8f0ff");o.p(x+3,y+2,"#e8c050")}}},
 frames(o,R,b){for(let x=b.x+6;x<b.x+b.w-8;x+=14)frame(o,x,b.y,["#c85a4a","#4a78c8","#58a860","#c8a040"][(R()*4)|0])},
 pillars(o,R,b){for(let x=b.x+3;x<b.x+b.w-4;x+=Math.max(14,Math.floor(b.w/6))){pillar(o,x,b.y+1,Math.min(10,b.h-4));if(b.h>22)pillar(o,x,b.y+b.h-12,10)}},
 candles(o,R,b){for(let i=0;i<Math.max(4,Math.floor(b.w/8));i++)candle(o,b.x+2+R()*(b.w-4),b.y+R()*(b.h-6))},
 kitchen(o,R,b){o.r(b.x+1,b.y,b.w-2,4,"#8a8478");o.r(b.x+2,b.y+1,4,3,"#2a2a30");o.r(b.x+3,b.y+1,2,1,"#e8742a");o.r(b.x+8,b.y+1,4,3,"#2a2a30");o.r(b.x+9,b.y+1,2,1,"#e8742a");table(o,b.x+b.w/2-6,b.y+b.h/2,12,4,"#c8b890");for(let i=0;i<3;i++)o.p(b.x+b.w/2-4+i*4,b.y+b.h/2+1,["#e8d8a0","#d8504a","#f4f0e0"][i])},
 oven(o,R,b){o.r(b.x+2,b.y,10,5,"#6a5448");o.r(b.x+3,b.y+1,8,3,"#1a1218");o.r(b.x+5,b.y+2,4,2,"#e8742a");table(o,b.x+b.w-14,b.y+b.h-9,12,3,"#c8a070");for(let i=0;i<4;i++)o.r(b.x+b.w-13+i*3,b.y+b.h-10,2,1,"#d8a850")},
 counter(o,R,b){table(o,b.x+3,b.y+b.h-9,b.w-6,3,"#a8784a")},
 well(o,R,b){fountain(o,b.x+b.w/2,b.y+b.h/2,Math.min(8,Math.floor(Math.min(b.w,b.h)/3)))},
 fountain(o,R,b){fountain(o,b.x+b.w/2,b.y+b.h/2,Math.min(10,Math.floor(Math.min(b.w,b.h)/4)))},
 hedge(o,R,b){for(let x=b.x+4;x<b.x+b.w-4;x++){o.r(x,b.y+3,1,3,"#2e6a30");o.r(x,b.y+b.h-6,1,3,"#2e6a30")}for(let y=b.y+3;y<b.y+b.h-4;y++){o.r(b.x+4,y,2,1,"#2e6a30");o.r(b.x+b.w-6,y,2,1,"#2e6a30")}},
 rocks(o,R,b){for(let i=0;i<Math.max(4,b.w*b.h/200);i++){const x=b.x+R()*(b.w-5),y=b.y+R()*(b.h-4);o.r(x,y,4,3,"#8a8590");o.r(x+1,y,2,1,"#b8b4c0");o.r(x,y+3,4,1,"#5a5660")}},
 flag(o,R,b){o.r(b.x+b.w/2,b.y+2,1,8,"#6a4428");o.r(b.x+b.w/2+1,b.y+2,5,3,"#c8383a")},
 hives(o,R,b){for(let i=0;i<Math.max(3,b.w*b.h/260);i++){const x=b.x+3+R()*(b.w-8),y=b.y+3+R()*(b.h-9);o.r(x,y+1,4,3,"#e8c04a");o.r(x,y+2,4,1,"#a8802a");o.r(x+1,y,2,1,"#f4d870");o.r(x+1,y+3,2,1,"#6a4428")}},
 stalls(o,R,b){for(let x=b.x+4;x<b.x+b.w-9;x+=12){for(let i=0;i<6;i+=2){o.r(x+i,b.y+3,1,3,"#d84a4a");o.r(x+i+1,b.y+3,1,3,"#f4f0e0")}o.r(x,b.y+6,6,2,"#8a5a30")}},
 stable(o,R,b){for(let x=b.x+3;x<b.x+b.w-9;x+=13){o.r(x,b.y+2,10,9,"#6a4a2a");o.r(x+1,b.y+3,8,7,"#8a6a40");o.r(x+3,b.y+5,5,3,"#8a5a30");o.r(x+7,b.y+4,2,2,"#7a4a28");o.p(x+8,b.y+4,"#111")}},
 track(o,R,b){const cx=b.x+b.w/2,cy=b.y+b.h/2,rx=Math.max(6,b.w/2-6),ry=Math.max(8,b.h/2-6);for(let a=0;a<360;a+=2){const x=cx+Math.cos(a*Math.PI/180)*rx,y=cy+Math.sin(a*Math.PI/180)*ry;o.p(x,y,"#e8d8b0");o.p(x+1,y,"#d8c898")}o.r(cx-3,cy-1,6,2,"#f4f0e0")},
 reeds(o,R,b){for(let i=0;i<b.w*b.h*.02;i++){const x=b.x+R()*b.w,y=b.y+R()*b.h;o.r(x,y,1,3,"#5a8a4a");o.p(x,y-1,"#8a6a3a")}},
 dock(o,R,b){o.r(b.x,b.y+b.h*.4,b.w*.6,5,"#8a6038");for(let x=b.x;x<b.x+b.w*.6;x+=4)o.r(x,b.y+b.h*.4,1,5,"#5a3a22");o.r(b.x+b.w*.7,b.y+b.h*.4+8,10,4,"#a8482a");o.r(b.x+b.w*.7+3,b.y+b.h*.4+3,1,5,"#f0e8d0")},
 runway(o,R,b){o.r(b.x+b.w/2-4,b.y,8,b.h-1,"#a02830");o.r(b.x+b.w/2-3,b.y,6,b.h-1,"#c8383a")},
 heather(o,R,b){for(let i=0;i<b.w*b.h*.03;i++)o.r(b.x+R()*b.w,b.y+R()*b.h,2,1,["#9a5ab0","#b070c0","#7a4a98"][(R()*3)|0])},
 orrery(o,R,b){const cx=b.x+b.w/2,cy=b.y+b.h/2;for(const r of[3,6,9]){for(let a=0;a<360;a+=12)o.p(cx+Math.cos(a*Math.PI/180)*r,cy+Math.sin(a*Math.PI/180)*r*.7,"#d8b24a")}o.r(cx-1,cy-1,3,3,"#ffe08a")},
 cross(o,R,b){o.r(b.x+b.w/2-1,b.y+1,3,1,"#e84a4a");o.r(b.x+b.w/2,b.y,1,3,"#e84a4a")},
 path(o,R,b){}
};

/* ---------- rooms: floor pattern, props, and whether it is open air ---------- */
const RS={
 gallery:["carpet","frames,pillars"],dusk_common:["carpet","sofas,fire"],well:["stone","well"],champions:["carpet","trophies"],library:["planks","shelves,tables"],drawing:["carpet","sofas,fire"],dusk_quarters:["planks","beds"],
 dawn_common:["carpet","sofas,fire"],dawn_archive:["planks","shelves"],starless:["stone","candles,pillars"],kitchens:["tile","kitchen"],hall:["planks","longtables,fire"],terrace:["marble","planters",1],pride:["dirt","rocks,flag",1],cloister:["grass","hedge,fountain",1],silver:["marble","cases"],
 headmaster:["planks","shelves,desks"],dusk_dorm:["planks","beds"],bathhouse:["tile","pool"],music:["planks","piano"],lounge:["carpet","sofas"],classroom_a:["planks","desks"],classroom_b:["tile","labtables"],lecture:["planks","desks,teacher"],studio_art:["planks","easels"],dance:["planks","mirror"],dawn_dorm:["planks","beds"],infirmary:["tile","beds,cross"],
 aquarium:["water","tanks"],vault:["stone","orrery,pillars"],starless_deep:["stone","candles"],tunnels:["stone","pillars"],cellar:["stone","barrels"],
 oldwood:["grass","trees",1],apiary:["grass","hives",1],greenhouse:["dirt","planters"],conservatory:["marble","planters,runway"],trail:["dirt","trees",1],fields:["grass","track",1],lake:["water","reeds",1],stables:["dirt","stable",1],
 cliffs:["rock","rocks",1],moor:["grass","heather",1],town_bakery:["planks","oven,counter"],town_pub:["planks","barrels,tables"],town_lodgings:["planks","beds"],town_street:["stone","stalls",1],town_harbor:["water","dock",1]};
const AREAS={castle_ground:{g:"stone",wall:1},castle_upper:{g:"planks",wall:1},undercroft:{g:"stone",dark:1,wall:1},grounds:{g:"grass"},beyond:{g:"grass"},town:{g:"stone"}};

/* ---------- a room ---------- */
function room(id,sh0,lv,w,h){
  const R=RNG(id+"|v1"),[pn,pr,open]=RS[id]||["stone","",0],c=sh0.floor||"#777";const o=Cv(Math.round(w/PS),Math.round(h/PS));
  const W=o.w,H=o.h,circ=!!sh0.c;
  if(circ){const cx=W/2,cy=H/2,rr=Math.min(W,H)/2,fcx=cx*K,fcy=cy*K,fr=rr*K;
    disc(o,fcx,fcy,fr,"#1b1722");disc(o,fcx,fcy,fr-3,mix(c,"#8e8798",.55));disc(o,fcx,fcy,fr-9,sh(c,.9));
    if(id==="observatory"){const dc=mix(c,"#c8d0e0",.5);disc(o,fcx,fcy,fr-9,sh(dc,.72));disc(o,fcx-1,fcy-1,fr-12,dc);disc(o,fcx-fr*.2,fcy-fr*.22,fr*.42,sh(dc,1.22));disc(o,fcx-fr*.28,fcy-fr*.3,fr*.14,"#ffffff");
      o.fr(fcx-2,fcy-fr+10,4,fr-4,"#101830");o.fr(fcx-1,fcy-fr+10,1,fr-4,"#1c2a50");for(const[a,b]of[[0,-4],[-9,-14],[10,2],[-14,4]])o.fp(fcx+a,fcy+b,"#fff8c0");o.fr(fcx+fr*.15,fcy+fr*.1,fr*.45,3,"#4a4658");o.fr(fcx+fr*.15,fcy+fr*.1,fr*.45,1,"#7a7688")}
    else if(id!=="spire"){disc(o,fcx,fcy,fr-9,"#8a6038");for(let y=-Math.floor(fr-9);y<=Math.floor(fr-9);y+=4){const hw=Math.sqrt(Math.max(0,(fr-9)*(fr-9)-y*y));o.fr(fcx-hw,fcy+y+3,hw*2,1,"rgba(0,0,0,.25)");o.fr(fcx-hw,fcy+y,hw*2,1,"rgba(255,255,255,.07)")}
      const rug=Math.max(8,fr*.62);disc(o,fcx,fcy,rug,"#d6b04a");disc(o,fcx,fcy,rug-3,"#8a2a3a");disc(o,fcx,fcy,rug-6,"#a83648");
      table(o,cx-5,cy-2,10,4,"#6a4428");o.r(cx-1,cy-1,3,1,"#f0e8d0");chair(o,cx-1,cy+3,"#3a2418");for(let i=-1;i<=1;i++)shelfRow(o,R,cx-10+i*7+3,cy-rr+4+Math.abs(i)*2,6,4);candle(o,cx+6,cy-1);candle(o,cx-7,cy-1)}
    else{for(let k=0;k<5;k++)disc(o,fcx,fcy,fr-9-k*Math.max(4,(fr-12)/5),k%2?sh(c,1.45):sh(c,.95));fountain(o,cx,cy,Math.max(3,rr/3));for(let a=0;a<360;a+=45)pillar(o,cx+Math.cos(a*Math.PI/180)*(rr-6),cy+Math.sin(a*Math.PI/180)*(rr-6),4)}
  }else{
    const wallH=open?0:Math.min(6,Math.max(3,H>>2)),wc=mix(c,"#8e8798",.62);
    if(open){pat(o,R,pn,0,0,W,H,c);
      const fc=pn==="water"||pn==="rock"?null:"#6a4a2a";if(fc){for(let x=0;x<W;x+=3){o.r(x,0,1,2,fc);o.r(x,H-2,1,2,fc)}o.r(0,0,W,1,sh(fc,.8));o.r(0,H-1,W,1,sh(fc,.8));for(let y=0;y<H;y+=3){o.r(0,y,2,1,fc);o.r(W-2,y,2,1,fc)}}}
    else{o.r(0,0,W,H,"#1b1722");pat(o,R,pn,2,wallH,W-4,H-wallH-2,c);
      for(let y=1;y<wallH;y++)for(let x=1;x<W-1;x++)o.p(x,y,((x+(y%2?3:0))%6===0)?sh(wc,.72):sh(wc,.92+((x*5+y*3)%4)*.04));
      o.r(1,wallH,1,H-wallH-1,sh(wc,.8));o.r(W-2,wallH,1,H-wallH-1,sh(wc,.8));o.r(1,H-2,W-2,1,sh(wc,.75));
      for(let x=6;x<W-8;x+=11)if(wallH>=4){o.r(x,2,3,wallH-3,"#78b8e8");o.r(x,2,1,wallH-3,"#c8e8ff");o.r(x+1,1,1,1,sh(wc,.6))}
      grain(o,1,1,W-2,wallH-1,9,R);o.fr(1*K,1*K,(W-2)*K,1,"rgba(255,255,255,.18)");
      shade(o,2,wallH,W-4,1,.4);shade(o,2,wallH+1,W-4,1,.22);shade(o,2,wallH+2,W-4,1,.1);shade(o,2,wallH,1,H-wallH-2,.2);shade(o,W-3,wallH,1,H-wallH-2,.2);
      for(let x=6;x<W-8;x+=11)if(wallH>=4){o.fr(x*K+K-1,2*K,1,(wallH-3)*K,"#2c4a68");o.fr(x*K-1,(wallH-1)*K,3*K+2,2,sh(wc,1.25));for(let r=0;r<7;r++)o.fr((x-1+r)*K,(wallH+1+r)*K,3*K,K,"rgba(255,248,210,"+(.13-r*.017)+")")}
      const dx=Math.round(W/2-3);o.r(dx,H-2,6,2,sh(c,.62));o.r(dx+1,H-3,4,1,"#7a2a2a");o.fr(dx*K-1,(H-2)*K,1,2*K,"#1b1722");o.fr((dx+6)*K,(H-2)*K,1,2*K,"#1b1722");
    }
    const b={x:3,y:wallH+1,w:W-6,h:H-wallH-6};if(b.w>6&&b.h>4)pr.split(",").filter(Boolean).forEach(k=>{if(PROPS[k])PROPS[k](o,R,b)});
    if(!open&&lv>=2){const dx=Math.round(W/2);for(const s of[-6,6]){const tx=(dx+s)*K,ty=(H-6)*K;disc(o,tx,ty,13,"rgba(255,170,60,.07)");disc(o,tx,ty,8,"rgba(255,190,80,.09)");o.r(dx+s,H-5,1,2,"#5a3a22");o.p(dx+s,H-6,"#ffd24a");o.fp(tx+1,ty-3,"#ff9a3a");o.fp(tx,ty-2,"#fff2a0")}}
    if(!open&&lv>=3){for(let x=10;x<W-10;x+=22)if(wallH>=4){o.r(x,1,2,wallH,"#b8383e");o.r(x,wallH,2,1,"#e0b53a")}}
    if(lv>=4){const g=[[3,H-5],[W-6,H-5]];g.forEach(([x,y])=>{o.r(x,y,3,3,"#4a2f1c");o.p(x,y-1,"#4a9a4a");o.p(x+1,y-2,"#e8508a");o.p(x+2,y-1,"#4a9a4a")})}
    if(!circ&&!open)grain(o,0,0,W,H,4,R);
    if(lv>=5){const gc="#e0b53a";o.r(0,0,W,1,gc);o.r(0,H-1,W,1,gc);o.r(0,0,1,H,gc);o.r(W-1,0,1,H,gc);for(let i=0;i<6;i++)o.p(2+R()*(W-4),2+R()*(H-4),"#fff6c0")}
    if(lv<=0){for(let i=0;i<Math.max(2,Math.floor(W*H/160));i++){let x=R()*W,y=R()*H;for(let k=0;k<6;k++){o.p(x,y,"#14101a");x+=(R()-.5)*2.4;y+=R()*1.8}}
      for(let i=0;i<W*H*.03;i++)o.p(R()*W,R()*H,"#4a5a3a");const dx=Math.round(W/2-3);for(let k=0;k<6;k++){o.p(dx+k,H-3+((k%2)?-1:0),"#5a3a22");o.p(dx+k,H-2,"#5a3a22")}
      for(const[x,y]of[[2,2],[W-3,2]])for(let k=0;k<3;k++){o.p(x+(x>5?-k:k),y,"#e8e8f0");o.p(x,y+k,"#e8e8f0")}}
  }
  if(pn==="water"||id==="bathhouse")o.c.classList.add("pxwater");
  return o.c}

/* ---------- the ground of a whole area ---------- */
function ground(areaId,a,shapes){
  const R=RNG(areaId+"|g1"),S=AREAS[areaId]||{g:"stone"},o=Cv(Math.round(1216/PS),Math.round(832/PS)),f=a.foot.map(v=>Math.round(v/PS)),W=o.w,H=o.h;
  const bg=a.bg||"#3a6b3a";
  if(S.dark){o.r(0,0,W,H,"#0a0d18");for(let i=0;i<W*H*.03;i++)o.p(R()*W,R()*H,"#161c2c")}
  else PAT.grass(o,R,0,0,W,H,bg);
  if(S.g==="grass"){PAT.dirt(o,R,f[0],f[1],f[2],f[3],a.floor||"#8a7a52");for(let i=0;i<W*H*.008;i++)o.p(f[0]+R()*f[2],f[1]+R()*f[3],"#6ea84a")}
  else pat(o,R,S.g,f[0],f[1],f[2],f[3],a.floor||"#777");
  shapes.forEach(sh=>{if(sh.portal)return;if(sh.c)disc(o,(sh.c[0]/PS+1)*K,(sh.c[1]/PS+1.5)*K,sh.c[2]/PS*K,"rgba(0,0,0,.3)");else{const r=sh.r;o.fr((r[0]/PS+1.5)*K,(r[1]/PS+1.5)*K,r[2]/PS*K,r[3]/PS*K,"rgba(0,0,0,.3)")}});
  if(S.wall){const wc=S.dark?"#2a2a3a":"#6a6678",x0=f[0]-3,y0=f[1]-3,x1=f[0]+f[2],y1=f[1]+f[3];
    o.r(x0,y0,f[2]+6,3,wc);o.r(x0,y1,f[2]+6,3,wc);o.r(x0,y0,3,f[3]+6,wc);o.r(x1,y0,3,f[3]+6,wc);o.fr(x0*K,y0*K,(f[2]+6)*K,1,"rgba(255,255,255,.25)");o.fr(x0*K,(y1+3)*K-1,(f[2]+6)*K,1,"rgba(0,0,0,.4)");o.fr(x0*K,y0*K,1,(f[3]+6)*K,"rgba(255,255,255,.15)");o.fr((x1+3)*K-1,y0*K,1,(f[3]+6)*K,"rgba(0,0,0,.3)");
    for(let x=x0;x<x1+3;x+=4){o.r(x,y0-1,2,1,sh(wc,1.2));o.r(x,y1+2,2,1,sh(wc,.7))}o.r(x0,y0+2,f[2]+6,1,sh(wc,.6));
    for(const[x,y]of[[x0-2,y0-2],[x1-1,y0-2],[x0-2,y1-1],[x1-1,y1-1]]){o.r(x,y,7,7,sh(wc,.85));o.r(x+1,y+1,5,5,wc);o.r(x+2,y,1,2,sh(wc,1.3));o.r(x+4,y,1,2,sh(wc,1.3));o.p(x+3,y+3,"#6ab0e0")}
    if(!S.dark){for(let i=0;i<48;i++){const side=(R()*4)|0,t=R();let x,y;if(side===0){x=2+t*(W-12);y=1+R()*(Math.max(2,y0-9))}else if(side===1){x=2+t*(W-12);y=y1+8+R()*Math.max(1,H-y1-16)}else if(side===2){x=1+R()*Math.max(2,x0-9);y=2+t*(H-12)}else{x=x1+8+R()*Math.max(1,W-x1-16);y=2+t*(H-12)}if(x>0&&y>0&&x<W-7&&y<H-9)tree(o,R,x,y,1)}}
    else{for(let i=0;i<40;i++)o.p(R()*W,R()*H,"#1e2438")}
  }else{
    for(let i=0;i<70;i++){const x=R()*W,y=R()*H;if(x>f[0]+2&&x<f[0]+f[2]-9&&y>f[1]+2&&y<f[1]+f[3]-10)continue;tree(o,R,x,y,1)}
    if(areaId==="town"){for(let i=0;i<40;i++)o.p(f[0]+R()*f[2],f[1]+R()*f[3],"#a89a80")}
  }
  grain(o,0,0,W,H,4,R);
  return o.c}

/* ---------- gates and stairs ---------- */
function portal(sh0,w,h){const o=Cv(Math.round(w/PS),Math.round(h/PS)),W=o.w,H=o.h,R=RNG(String(sh0.label)+"|p"),lab=String(sh0.label||"");
  if(/castle/i.test(lab)){const wc="#8a8498",rc="#5a4a8a";o.r(0,H*.35,W,H*.65,sh(wc,.8));o.r(0,H*.35,W,H*.15,wc);for(let x=0;x<W;x+=6)o.r(x,H*.3,3,3,wc);
    const tw=(x,hh)=>{o.r(x,H-hh,12,hh,wc);o.r(x+1,H-hh+3,10,hh-3,sh(wc,.9));for(let i=0;i<12;i+=4)o.r(x+i,H-hh-3,2,3,wc);o.r(x+5,H-hh+8,2,4,"#101830");o.r(x+4,H-hh+7,4,1,"#f0c040")};
    tw(2,H*.85);tw(W-14,H*.85);tw(W/2-18,H*.95);tw(W/2+6,H*.95);o.r(W/2-6,H-12,12,12,"#2a2030");o.r(W/2-5,H-11,10,11,"#5a3a22");o.r(W/2-1,H-11,1,11,"#2a1a12");
    for(let x=10;x<W-12;x+=9)if(Math.abs(x-W/2)>14){o.r(x,H*.5,2,4,"#78b8e8")};o.r(W/2-1,H*.1,1,H*.18,"#6a4428");o.r(W/2,H*.1,6,3,"#c8383a");for(const[x,hh]of[[2,H*.85],[W-14,H*.85],[W/2-18,H*.95],[W/2+6,H*.95]]){shade(o,x+9,H-hh,3,hh,.22);o.fr(x*K,(H-hh)*K,1,hh*K,"rgba(255,255,255,.16)")}grain(o,0,0,W,H,6,R)}
  else if(/stairs/i.test(lab)){const up=/up/i.test(lab),c=up?"#a8a0b8":"#4a4658";o.r(0,0,W,H,sh(c,.6));for(let y=0;y<H;y+=3){const t=up?y:H-y;o.r(1,y,W-2,2,sh(c,.8+(t/H)*.5));o.r(1,y+2,W-2,1,sh(c,.5))}o.r(0,0,1,H,"#1b1722");o.r(W-1,0,1,H,"#1b1722")}
  else{o.r(0,0,W,H,"#8a7a52");for(let i=0;i<W*H*.2;i++)o.p(R()*W,R()*H,R()<.5?"#6a5a3a":"#a8986a");const cy=H/2;for(let x=3;x<W-3;x+=8){o.r(x,cy-1,3,1,"#f0e8c8");o.p(x+3,cy,"#f0e8c8");o.r(x,cy+1,3,1,"#f0e8c8")}}
  return o.c}

/* water and glass shimmer a little */
{const st=document.createElement("style");st.textContent="@keyframes pxwater{0%{filter:brightness(1) saturate(1)}50%{filter:brightness(1.1) saturate(1.12)}100%{filter:brightness(1) saturate(1)}}canvas.pxwater{animation:pxwater 3.2s ease-in-out infinite}";document.head.append(st)}
ACAD.pix={room,ground,portal,PS};
})();
