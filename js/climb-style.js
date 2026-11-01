/* Everspire Collection: cosmetics that live in a run. The partner follower, skin-tinted weapons, trails, level-up bursts and arena looks. */
(()=>{const C=ACAD.climb,TAU=Math.PI*2;
C.TRAILS={petals:{n:"Petals",c:"#ffb0d0",k:"petal",cost:1500},embers:{n:"Embers",c:"#ff8a3a",k:"ember",cost:1500},stars:{n:"Starlight",c:"#fff3b0",k:"star",cost:2500},frost:{n:"Frostfall",c:"#bfeaff",k:"diamond",cost:2500},shadow:{n:"Shadowmist",c:"#9a7aff",k:"dot",cost:2500}};
C.BURSTS={petals:{n:"Petal bloom",c:"#ffb0d0",k:"petal",cost:2000},embers:{n:"Ember burst",c:"#ff8a3a",k:"ember",cost:2000},stars:{n:"Starfall",c:"#fff3b0",k:"star",cost:3000},frost:{n:"Frost shatter",c:"#bfeaff",k:"diamond",cost:3000}};
C.ARENAS={ashen:{n:"Ashen Hall",tint:["#2b2b30","#1a1a1e"],cost:3000},ember:{n:"Emberstone",tint:["#3a1d14","#241009"],cost:3000},tide:{n:"Tidewater",tint:["#14303a","#0b1c24"],cost:3000},grove:{n:"Mossgrove",tint:["#1c3320","#10200f"],cost:3000},dusk:{n:"Duskglass",tint:["#33203d","#1f1228"],cost:3000}};
/* titles and frames are earned, not bought */
const nFree=m=>Object.keys(m.free||{}).filter(k=>m.free[k]).length,anyMythic=m=>Object.keys(m.ess||{}).some(k=>(m.ess[k]||0)>=1200),skinCount=m=>Object.keys(m.skins||{}).reduce((a,k)=>a+((m.skins[k].own)||[]).length,0);
C.TITLES=[{id:"newcomer",n:"Newcomer",d:"Always yours",ok:m=>true},{id:"taker",n:"Floor-Taker",d:"Win a floor",ok:m=>(m.wins||0)>=1},{id:"veteran",n:"Veteran",d:"Climb 25 times",ok:m=>(m.runs||0)>=25},{id:"collector",n:"Collector",d:"Gather 40 girls",ok:m=>nFree(m)>=40},{id:"gathered",n:"The Gathered",d:"Gather 100 girls",ok:m=>nFree(m)>=100},{id:"ascendant",n:"Ascendant",d:"Take a girl to Mythic",ok:anyMythic},{id:"whisperer",n:"Pet Whisperer",d:"Raise a pet to Legendary bond",ok:m=>Object.keys(m.pess||{}).some(k=>(m.pess[k]||0)>=500)},{id:"dresser",n:"Dresser",d:"Own 20 skins",ok:m=>skinCount(m)>=20}];
C.FRAMES=[{id:"plain",n:"Plain",d:"Always yours",b:"1px solid #3b3568",s:"none",ok:m=>true},{id:"bronze",n:"Bronze",d:"Climb 10 times",b:"2px solid #b87a46",s:"0 0 6px #b87a4666",ok:m=>(m.runs||0)>=10},{id:"silver",n:"Silver",d:"Win 10 floors",b:"2px solid #cfd6e6",s:"0 0 8px #cfd6e688",ok:m=>(m.wins||0)>=10},{id:"gilt",n:"Gilt",d:"Win 50 floors",b:"2px solid #ffd35a",s:"0 0 12px #ffd35aaa",ok:m=>(m.wins||0)>=50},{id:"starlit",n:"Starlit",d:"Gather 100 girls",b:"2px solid #9ad8ff",s:"0 0 14px #9ad8ffaa,0 0 4px #fff",ok:m=>nFree(m)>=100},{id:"mythic",n:"Mythic flame",d:"Take a girl to Mythic",b:"2px solid #ff7a3a",s:"0 0 16px #ff7a3acc,0 0 5px #ffd35a",ok:anyMythic}];
C.mixHex=(a,b,t)=>{const p=h=>/^#[0-9a-f]{6}$/i.test(h)?[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)):null,x=p(a),y=p(b);if(!x||!y)return a;return"#"+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,"0")).join("")};
/* one drifting speck: shapes for trails and bursts */
function speck(ctx,p,a){ctx.globalAlpha=a;ctx.fillStyle=p.c;ctx.save();ctx.translate(p.x,p.y);
  if(p.k==="petal"){ctx.rotate(p.rot);ctx.beginPath();ctx.ellipse(0,0,p.r*1.5,p.r*.8,0,0,TAU);ctx.fill()}
  else if(p.k==="star"){ctx.rotate(p.rot);ctx.beginPath();for(let i=0;i<8;i++){const r=i%2?p.r*.45:p.r*1.6,an=i*Math.PI/4;ctx.lineTo(Math.cos(an)*r,Math.sin(an)*r)}ctx.closePath();ctx.fill()}
  else if(p.k==="diamond"){ctx.rotate(p.rot);ctx.fillRect(-p.r,-p.r,p.r*2,p.r*2)}
  else{ctx.beginPath();ctx.arc(0,0,p.r*(p.k==="ember"?1:1.3),0,TAU);ctx.fill()}ctx.restore()}
class Run5 extends C.Run{
 constructor(o){super(o);const cs=this.cos=o.cos||{};this.skinD=o.skin?C.skinDef(o.skin):null;this.fxp=[];this._lv=this.lv;this._tr=0;this._dt=0;
  if(o.partner){const im=new Image(),sd=o.partnerSkin?C.skinDef(o.partnerSkin):null;im.src="assets/sprites/"+o.partner+".256.webp";if(sd&&C.skinURL)C.skinURL(o.partner,o.partnerSkin,256,u=>{im.src=u});this.ptn={id:o.partner,x:this.px-34,y:this.py+10,img:im,fx:sd&&sd.fx?sd:null,face:1,bob:0}}
  if(cs.arena&&C.ARENAS[cs.arena]){this.floor=Object.assign({},this.floor,{tint:C.ARENAS[cs.arena].tint});this.tile=null;this.pat=null}}
 step(dt){super.step(dt);if(this.ended)return;
  const sk=this.skinD;if(sk&&this.pr)for(const p of this.pr)if(!p.__t){p.__t=1;if(p.c)p.c=C.mixHex(p.c,sk.c,.55)}
  const P=this.ptn;if(P){const f=this.face||1,k=Math.min(1,dt*5);P.x+=(this.px-f*34-P.x)*k;P.y+=(this.py+10-P.y)*k;P.face=f;P.bob+=dt}
  const tr=C.TRAILS[this.cos.trail],mv=this.dir&&(this.dir[0]||this.dir[1]);
  if(tr&&mv){this._tr-=dt;if(this._tr<=0){this._tr=.045;this.fxp.push({x:this.px+(Math.random()-.5)*10,y:this.py+14+Math.random()*4,vx:(Math.random()-.5)*14,vy:-8-Math.random()*12,l:.8,t:0,r:2+Math.random()*1.6,c:tr.c,k:tr.k,rot:Math.random()*TAU,vr:(Math.random()-.5)*4})}}
  if(this.lv>this._lv){this._lv=this.lv;const b=C.BURSTS[this.cos.burst];if(b)for(let i=0;i<26;i++){const a=TAU*i/26+Math.random()*.3,s=70+Math.random()*80;this.fxp.push({x:this.px,y:this.py-4,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,t:0,r:2.5+Math.random()*2.2,c:b.c,k:b.k,rot:Math.random()*TAU,vr:(Math.random()-.5)*6})}}}
 draw(ctx,w,h,tms){super.draw(ctx,w,h,tms);const dt=Math.max(0,Math.min(.05,(tms-(this._dt||tms))/1000));this._dt=tms;const T=tms/1000;
  const D=this.dpr||1,sc=this.sc||1;ctx.save();ctx.setTransform(sc*D,0,0,sc*D,(w/2-this.px*sc)*D,(h/2-this.py*sc)*D);
  const add=ctx.globalCompositeOperation;ctx.globalCompositeOperation="lighter";
  this.fxp=this.fxp.filter(p=>(p.t+=dt)<p.l);for(const p of this.fxp){p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;if(p.k!=="ember")p.vx*=1-dt*1.5;speck(ctx,p,Math.max(0,1-p.t/p.l)*.85)}
  ctx.globalCompositeOperation=add;ctx.globalAlpha=1;
  const P=this.ptn;if(P&&P.img.complete&&P.img.naturalWidth){const bob=Math.sin(P.bob*6)*1.6;ctx.fillStyle="rgba(0,0,0,.3)";ctx.beginPath();ctx.ellipse(P.x,P.y+16,11,4,0,0,TAU);ctx.fill();
   ctx.save();ctx.translate(P.x,P.y);if(P.fx)C.skinFx(ctx,P.fx,T,0);if(P.face<0)ctx.scale(-1,1);ctx.globalAlpha=.95;ctx.drawImage(P.img,-22,-26+bob,44,44);ctx.globalAlpha=1;if(P.fx)C.skinFx(ctx,P.fx,T,1);ctx.restore()}
  ctx.restore()}
}
C.Run=Run5;
})();
