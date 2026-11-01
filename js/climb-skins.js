/* Everspire Collection: skins. Cosmetic recolors of a girl's sprite, bought with gold. */
(()=>{const C=ACAD.climb;
/* dh: hue turn in degrees, s: saturation multiplier, l: lightness multiplier, t: price tier */
C.SKINS=[
 {id:"ember",n:"Ember",t:1,dh:-28,s:1.2,l:1,c:"#ff7a3a"},
 {id:"frost",n:"Frost",t:1,dh:165,s:.85,l:1.1,c:"#8fd8ff"},
 {id:"verdant",n:"Verdant",t:1,dh:85,s:1.05,l:1,c:"#7fd49a"},
 {id:"rose",n:"Rose",t:2,dh:320,s:1.1,l:1.06,c:"#ff8ab8",fx:"glow"},
 {id:"moonlit",n:"Moonlit",t:2,dh:225,s:.75,l:.94,c:"#9aa6ff",fx:"glow"},
 {id:"noir",n:"Noir",t:2,dh:0,s:.12,l:.72,c:"#b8b8c8",fx:"glow"},
 {id:"gilded",n:"Gilded",t:3,dh:42,s:1.45,l:1.14,c:"#ffd35a",fx:"gilded"},
 {id:"nightbloom",n:"Nightbloom",t:3,dh:275,s:1.3,l:.84,c:"#b46aff",fx:"bloom"}];
C.SKIN_COST={1:600,2:1500,3:4000};
C.skinDef=id=>C.SKINS.find(s=>s.id===id)||null;
/* living skins: a soft pulsing aura on the middle tier, sparkles or orbiting wisps on the top tier */
{const st=document.createElement("style");st.id="skCss";st.textContent=
 "@keyframes skGlow{0%,100%{filter:drop-shadow(0 0 3px var(--sc))}50%{filter:drop-shadow(0 0 9px var(--sc))}}"+
 "@keyframes skRich{0%,100%{filter:drop-shadow(0 0 5px var(--sc)) brightness(1)}50%{filter:drop-shadow(0 0 14px var(--sc)) drop-shadow(0 0 4px #fff) brightness(1.14)}}"+
 ".sk-glow{animation:skGlow 2.6s ease-in-out infinite}.sk-gilded,.sk-bloom{animation:skRich 2s ease-in-out infinite}"+
 "@media(prefers-reduced-motion:reduce){.sk-glow,.sk-gilded,.sk-bloom{animation:none}}";document.head.append(st)}
C.skinClass=(img,id)=>{const k=C.skinDef(id);if(k&&k.fx){img.classList.add("sk-"+k.fx);img.style.setProperty("--sc",k.c)}};
/* drawn around the hero in the run: back=0 is behind her, 1 is in front */
C.skinFx=(ctx,sk,T,front)=>{const add="lighter",old=ctx.globalCompositeOperation,oa=ctx.globalAlpha;ctx.globalCompositeOperation=add;
  if(!front){const r=36+Math.sin(T*3)*3,g=ctx.createRadialGradient(0,-4,2,0,-4,r);g.addColorStop(0,sk.c+(sk.fx==="glow"?"66":"99"));g.addColorStop(1,sk.c+"00");ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-4,r,0,6.2832);ctx.fill()}
  else if(sk.fx==="gilded"){for(let i=0;i<7;i++){const ph=(T*.55+i/7)%1,x=Math.sin(i*5.3)*20,y=24-ph*54,a=Math.sin(ph*Math.PI);ctx.globalAlpha=a*.9;ctx.fillStyle=i%2?"#fff3b0":sk.c;ctx.beginPath();ctx.arc(x,y,1.4+a*1.6,0,6.2832);ctx.fill()}}
  else if(sk.fx==="bloom"){for(let i=0;i<4;i++){const a=T*1.6+i*1.5708,x=Math.cos(a)*27,y=Math.sin(a)*11-4,g=ctx.createRadialGradient(x,y,0,x,y,7);g.addColorStop(0,"#fff");g.addColorStop(.4,sk.c);g.addColorStop(1,sk.c+"00");ctx.globalAlpha=.9;ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,7,0,6.2832);ctx.fill()}}
  ctx.globalCompositeOperation=old;ctx.globalAlpha=oa};
const cache={};
function hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60}return[h,s,l]}
function rgb(h,s,l){h=((h%360)+360)%360/360;if(!s){const v=l*255;return[v,v,v]}const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t=(t+1)%1;return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p};return[f(h+1/3)*255,f(h)*255,f(h-1/3)*255]}
/* a data URL of the sprite recolored for a skin; the callback runs when it is ready */
C.skinURL=(hero,skinId,size,cb)=>{const sk=C.skinDef(skinId);if(!sk)return;const key=hero+"|"+skinId+"|"+size;if(cache[key]){cb(cache[key]);return}
  const im=new Image();im.onload=()=>{try{const cv=document.createElement("canvas");cv.width=im.naturalWidth;cv.height=im.naturalHeight;const x=cv.getContext("2d");x.drawImage(im,0,0);const d=x.getImageData(0,0,cv.width,cv.height),p=d.data;
    for(let i=0;i<p.length;i+=4){if(p[i+3]<8)continue;const[h,s,l]=hsl(p[i],p[i+1],p[i+2]),o=rgb(h+sk.dh,Math.min(1,s*sk.s),Math.min(.97,l*sk.l));p[i]=o[0];p[i+1]=o[1];p[i+2]=o[2]}
    x.putImageData(d,0,0);cache[key]=cv.toDataURL("image/png");cb(cache[key])}catch(e){}};
  im.src="assets/sprites/"+hero+"."+(size>128?256:128)+".webp"};
})();
