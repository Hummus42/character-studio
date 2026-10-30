/*MAP-BEGIN*/
/* v313: the living map. Every area is a plan of painted rooms; every girl keeps a day's routine drawn from her group, her friends, her family, her rivals and her secrets,
   and walks between rooms along the gaps between them (found with a grid search, no hand-drawn paths). The data is EVERSPIRE_MAP; the art is assets/rooms and assets/sprites. */
(function(){
"use strict";
if(typeof ENC==="undefined"||!ENC.page||!ENC.E||typeof ACAD==="undefined"||typeof EVERSPIRE_MAP==="undefined")return;
const M=EVERSPIRE_MAP,E=ENC.E,HN=ENC.HN,W=1216,H=832,CELL=12,SPEED=75,DAYS=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const hash=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)/4294967296};
const pick=(a,seed)=>a[Math.floor(hash(seed)*a.length)];
const fmt=m=>{m=Math.floor(m);return String(Math.floor(m/60)%24).padStart(2,"0")+":"+String(m%60).padStart(2,"0")};

/* ---------- walking: a grid search over what is free ---------- */
const inShape=(s,x,y,pad)=>s.r?(x>=s.r[0]-pad&&x<=s.r[0]+s.r[2]+pad&&y>=s.r[1]-pad&&y<=s.r[1]+s.r[3]+pad):Math.hypot(x-s.c[0],y-s.c[1])<=s.c[2]+pad;
function mkGrid(free){const cols=Math.ceil(W/CELL),rows=Math.ceil(H/CELL),ok=new Uint8Array(cols*rows);
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++)ok[y*cols+x]=free((x+.5)*CELL,(y+.5)*CELL)?1:0;return {cols,rows,ok}}
const cellOf=(G,x,y)=>[Math.max(0,Math.min(G.cols-1,Math.floor(x/CELL))),Math.max(0,Math.min(G.rows-1,Math.floor(y/CELL)))];
function snap(G,x,y){const [cx,cy]=cellOf(G,x,y);if(G.ok[cy*G.cols+cx])return [cx,cy];
  for(let r=1;r<70;r++){let best=null,bd=1e9;for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dy))!==r)continue;
    const X=cx+dx,Y=cy+dy;if(X<0||Y<0||X>=G.cols||Y>=G.rows||!G.ok[Y*G.cols+X])continue;const d=dx*dx+dy*dy;if(d<bd){bd=d;best=[X,Y]}}if(best)return best}
  return [cx,cy]}
const clear=(G,x0,y0,x1,y1)=>{const n=Math.ceil(Math.hypot(x1-x0,y1-y0)/(CELL/2));for(let i=0;i<=n;i++){const f=n?i/n:0,[cx,cy]=cellOf(G,x0+(x1-x0)*f,y0+(y1-y0)*f);if(!G.ok[cy*G.cols+cx])return false}return true};
function search(G,s,t){
  const id=(x,y)=>y*G.cols+x,N=G.cols*G.rows,g=new Float32Array(N).fill(1e9),from=new Int32Array(N).fill(-1),closed=new Uint8Array(N);
  const heap=[],push=(k,f)=>{heap.push([f,k]);let i=heap.length-1;while(i>0){const p=(i-1)>>1;if(heap[p][0]<=heap[i][0])break;[heap[p],heap[i]]=[heap[i],heap[p]];i=p}};
  const pop=()=>{const top=heap[0],last=heap.pop();if(heap.length){heap[0]=last;let i=0;for(;;){let l=2*i+1,r=l+1,m=i;if(l<heap.length&&heap[l][0]<heap[m][0])m=l;if(r<heap.length&&heap[r][0]<heap[m][0])m=r;if(m===i)break;[heap[m],heap[i]]=[heap[i],heap[m]];i=m}}return top[1]};
  const h=(x,y)=>Math.hypot(x-t[0],y-t[1]);g[id(s[0],s[1])]=0;push(id(s[0],s[1]),h(s[0],s[1]));
  while(heap.length){const k=pop();if(closed[k])continue;closed[k]=1;const x=k%G.cols,y=(k/G.cols)|0;if(x===t[0]&&y===t[1])break;
    for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const X=x+dx,Y=y+dy;if(X<0||Y<0||X>=G.cols||Y>=G.rows)continue;const j=id(X,Y);if(!G.ok[j]||closed[j])continue;
      if(dx&&dy&&(!G.ok[id(x+dx,y)]||!G.ok[id(x,y+dy)]))continue;const ng=g[k]+(dx&&dy?1.4142:1);if(ng<g[j]){g[j]=ng;from[j]=k;push(j,ng+h(X,Y))}}}
  const out=[];let k=id(t[0],t[1]);if(from[k]<0&&!(s[0]===t[0]&&s[1]===t[1]))return null;while(k>=0){out.push([(k%G.cols+.5)*CELL,(((k/G.cols)|0)+.5)*CELL]);k=from[k]}return out.reverse()}
function walk(G,ax,ay,bx,by){const s=snap(G,ax,ay),t=snap(G,bx,by);let p=search(G,s,t)||[[ax,ay],[bx,by]];
  p=[[ax,ay],...p,[bx,by]];const out=[p[0]];let i=0;while(i<p.length-1){let j=p.length-1;while(j>i+1&&!clear(G,p[i][0],p[i][1],p[j][0],p[j][1]))j--;out.push(p[j]);i=j}
  let len=0;const cum=[0];for(let k=1;k<out.length;k++){len+=Math.hypot(out[k][0]-out[k-1][0],out[k][1]-out[k-1][1]);cum.push(len)}return {pts:out,cum,len}}
function at(r,d){const P=r.pts;if(d<=0||P.length===1)return {x:P[0][0],y:P[0][1],dx:P.length>1?P[1][0]-P[0][0]:0};if(d>=r.len){const q=P[P.length-1],p=P[P.length-2]||q;return {x:q[0],y:q[1],dx:q[0]-p[0]}}
  let i=1;while(r.cum[i]<d)i++;const f=(d-r.cum[i-1])/((r.cum[i]-r.cum[i-1])||1),a=P[i-1],b=P[i];return {x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f,dx:b[0]-a[0]}}
const pcache=new Map();const cached=(k,fn)=>{let v=pcache.get(k);if(!v){v=fn();pcache.set(k,v)}return v};

/* ---------- the areas and the rooms ---------- */
const AREA={},ROOM={};
Object.entries(M.areas).forEach(([id,a])=>{
  const shapes=[...Object.entries(a.rooms||{}).map(([k,s])=>Object.assign({id:k,portal:false},s)),...Object.entries(a.portals||{}).map(([k,s])=>Object.assign({id:"@"+k,portal:true,key:k},s))];
  const f=a.foot,free=(x,y)=>x>=f[0]&&x<=f[0]+f[2]&&y>=f[1]&&y<=f[1]+f[3]&&!shapes.some(s=>inShape(s,x,y,1));
  const G=mkGrid(free);
  shapes.forEach(s=>{s.cx=s.r?s.r[0]+s.r[2]/2:s.c[0];s.cy=s.r?s.r[1]+s.r[3]/2:s.c[1];s.w=s.r?s.r[2]:s.c[2]*2;s.h=s.r?s.r[3]:s.c[2]*2;
    const d=snap(G,s.cx,s.cy);s.door=[(d[0]+.5)*CELL,(d[1]+.5)*CELL]});
  AREA[id]={id,a,G,shapes,by:Object.fromEntries(shapes.map(s=>[s.id,s]))};
  shapes.forEach(s=>{if(!s.portal)ROOM[s.id]=Object.assign({id:s.id,area:id,name:s.id,tags:[]},(M.rooms||{})[s.id]||{},{shape:s})})});
/* a room without its own drawn geometry gets an open floor and a grid of places to stand */
Object.values(ROOM).forEach(R=>{const g=R.geo||{};
  R.free=g.free||[[120,236,976,590]];R.sleep=g.sleep||null;R.door=g.door||[608,822];
  R.spots=g.spots||(()=>{const o=[];for(let r=0;r<3;r++)for(let c=0;c<4;c++)o.push([210+c*265,330+r*190]);return o})();
  R.G=mkGrid((x,y)=>R.free.some(q=>x>=q[0]&&x<=q[0]+q[2]&&y>=q[1]&&y<=q[1]+q[3]))});

/* ---------- getting from room to room ---------- */
const WG={};(M.world||[]).forEach(([a,b,m])=>{(WG[a]=WG[a]||{})[b]=m;(WG[b]=WG[b]||{})[a]=m});
const wcache={};function areaPath(a,b){const k=a+">"+b;if(wcache[k])return wcache[k];const dist={[a]:0},prev={},q=[a];
  while(q.length){q.sort((x,y)=>dist[x]-dist[y]);const u=q.shift();if(u===b)break;Object.entries(WG[u]||{}).forEach(([v,d])=>{if(dist[v]===undefined||dist[u]+d<dist[v]){dist[v]=dist[u]+d;prev[v]=u;if(!q.includes(v))q.push(v)}})}
  const p=[b];while(p[0]!==a&&prev[p[0]]!==undefined)p.unshift(prev[p[0]]);return wcache[k]=p}
const portalDoor=(area,to)=>{const A=AREA[area],s=A.shapes.find(x=>x.portal&&x.to===to);return s?s.door:[A.a.foot[0]+A.a.foot[2]/2,A.a.foot[1]+30]};
function route(a,b){return cached("r|"+a+"|"+b,()=>{const A=ROOM[a],B=ROOM[b];if(!A||!B)return {legs:[],min:0};const legs=[];
  const seq=areaPath(A.area,B.area);const leg=(area,p,q)=>{const r=walk(AREA[area].G,p[0],p[1],q[0],q[1]);legs.push({area,r,min:Math.max(.4,r.len/SPEED)})};
  if(seq.length===1)leg(A.area,A.shape.door,B.shape.door);
  else{let cur=A.shape.door;seq.forEach((ar,i)=>{if(i===seq.length-1){leg(ar,portalDoor(ar,seq[i-1]),B.shape.door);return}
    const from=i===0?cur:portalDoor(ar,seq[i-1]);leg(ar,from,portalDoor(ar,seq[i+1]));legs.push({transit:true,min:WG[ar][seq[i+1]]||2})})}
  return {legs,min:legs.reduce((s,l)=>s+l.min,0)}})}

/* ---------- a day's routine ---------- */
const GROUP_ROOM={legends:"champions",pride:"pride",pack:"trail",coil:"drawing",talons:"observatory",deep:"aquarium",frost:"lake",plumes:"conservatory",grove:"greenhouse",hive:"apiary",synth:"silver",void:"starless",clockwork:"vault",vigil:"starless_deep"};
const FACTION_DORM={dawn:"dawn_dorm",dusk:"dusk_dorm",lattice:"silver",starless:"starless_deep"},FACTION_COMMON={dawn:"dawn_common",dusk:"dusk_common",lattice:"silver",starless:"starless"};
const GROUND_ROOM={hall:"hall",storm:"cliffs",forest:"oldwood",bakeoff:"kitchens",race:"fields",chess:"library",night:"observatory",ice:"lake",catwalk:"conservatory"};
const CLASSES={plumes:["dance","music","studio_art","classroom_a"],talons:["lecture","classroom_b","classroom_a"],coil:["lecture","classroom_a","classroom_b"],deep:["classroom_b","lecture","dance"],frost:["classroom_b","lecture","studio_art"],grove:["classroom_b","studio_art","classroom_a"],hive:["studio_art","classroom_b","music"],legends:["lecture","dance","classroom_a"],pride:["lecture","dance","music"],pack:["classroom_b","lecture","dance"],synth:["classroom_b","lecture","classroom_a"],clockwork:["classroom_b","lecture","studio_art"],void:["lecture","music","classroom_a"],vigil:["lecture","classroom_a","music"]};
const DEFAULT_CLASS=["lecture","classroom_a","classroom_b","studio_art","music","dance"];
const SECRET=["tunnels","cliffs","cellar","well","oldwood","moor","observatory","cloister","stables","aquarium"];
let CTX=null;
function context(){if(CTX)return CTX;const R=ACAD.RELDATA||{},c={grp:{},fac:{},bf:{},ties:{},sg:[],rv:[],fam:[],fling:[]};
  (ACAD.HOUSES||[]).forEach(h=>{const g=ACAD.GROUP_OF(h);c.grp[h]=g?g.id:null;const f=g&&(ENC.FACTIONS||[]).find(x=>(x.groups||[]).includes(g.id));c.fac[h]=f?f.id:"dawn"});
  const key=(a,b)=>a<b?a+"|"+b:b+"|"+a,tie=(a,b,k)=>{const q=key(a,b);(c.ties[q]=c.ties[q]||[]).push(k)};
  Object.entries(R.BF||{}).forEach(([a,l])=>(l||[]).forEach(b=>{tie(a,b,"best friends");(c.bf[a]=c.bf[a]||new Set()).add(b);(c.bf[b]=c.bf[b]||new Set()).add(a)}));
  (R.SG||[]).forEach(p=>{c.sg.push([p[0],p[1]]);tie(p[0],p[1],"secret girlfriends")});(R.RV||[]).forEach(p=>{c.rv.push([p[0],p[1],p[2]]);tie(p[0],p[1],"rivals")});
  (R.FAM||[]).forEach(p=>{c.fam.push([p[0],p[1]]);const w=String(p[3]||"").split(",")[0];tie(p[0],p[1],/cousin/.test(w)?"cousins":/twin/.test(w)?"twins":"sisters")});(R.FLING||[]).forEach(p=>{c.fling.push([p[0],p[1]]);tie(p[0],p[1],"in a fling")});
  return CTX=c}
const haunt=h=>{const c=context(),g=c.grp[h];return GROUP_ROOM[g]&&ROOM[GROUP_ROOM[g]]?GROUP_ROOM[g]:(ROOM[FACTION_COMMON[c.fac[h]]]?FACTION_COMMON[c.fac[h]]:"hall")};
const RCACHE=new Map();
/* a game can take over a girl's days (OV) and send other girls to a place for a few hours (EV); both are plain data and leave the canon alone */
const OV={},EV={};
function setOverride(h,fn,v){OV[h]={fn,v:v||String(Date.now())}}
function clearOverride(h){delete OV[h]}
function setEvent(h,day,ev){EV[h+"|"+day]={ev,k:ev.room+"@"+ev.from+"-"+ev.to}}
function clearEvents(){Object.keys(EV).forEach(k=>delete EV[k])}
/* the stays of one girl on one day: [{t0, room, kind}] with the room she is in from t0 until the next stay begins */
function routine(h,day){const ov=OV[h],ek=EV[h+"|"+day],ck=h+"|"+day+"|"+(ov?ov.v:0)+"|"+(ek?ek.k:""),hit=RCACHE.get(ck);if(hit)return hit;
  const c=context(),we=day>=5,g=c.grp[h],fac=c.fac[h],dorm=ROOM[FACTION_DORM[fac]]?FACTION_DORM[fac]:"dawn_dorm",home=haunt(h),slots=[];
  const S=(t,room,kind)=>{if(!ROOM[room])room="hall";slots.push({t0:t,room,kind})};
  const seed=(...a)=>[h,day,...a].join("|");
  // partners who share a plan: the lower key goes to the other's haunt, and both are there
  const withFriend=(slot,pr)=>{const f=[...(c.bf[h]||[]),...c.fam.filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?p[1]:p[0])];if(!f.length)return null;
    const o=f[Math.floor(hash(h+"f"+day+slot)*f.length)],a=h<o?h:o,b=h<o?o:h,k="bf|"+a+"|"+b+"|"+day+"|"+slot;if(hash(k)>=pr)return null;return haunt(a)}; // both resolve the same room because the key is symmetric
  const sym=(o,slot)=>{const a=h<o?h:o,b=h<o?o:h;return hash("bf|"+a+"|"+b+"|"+day+"|"+slot)};
  const friendRoom=slot=>{const f=[...(c.bf[h]||[]),...c.fam.filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?p[1]:p[0])].filter(o=>sym(o,slot)<.3);if(!f.length)return null;f.sort();const o=f[0],a=h<o?h:o;return haunt(a)};
  const rivalRoom=()=>{for(const p of c.rv){if(p[0]!==h&&p[1]!==h)continue;if(Math.floor(hash("rv|"+p[0]+"|"+p[1])*7)===day&&GROUND_ROOM[p[2]]&&ROOM[GROUND_ROOM[p[2]]])return GROUND_ROOM[p[2]]}return null};
  const trystRoom=()=>{for(const p of c.sg){if(p[0]!==h&&p[1]!==h)continue;const k=p[0]+"|"+p[1];if(hash("sg|"+k+"|"+day)<.28)return SECRET[Math.floor(hash("sgp|"+k+"|"+(hash("sgq|"+k+day)<.3?day:0))*SECRET.length)]}return null};
  const klass=slot=>{const L=CLASSES[g]||DEFAULT_CLASS;return hash("cl|"+g+"|"+day+"|"+slot)<.6?pick(L,"cl|"+g+"|"+day+"|"+slot):pick(L,seed("cl",slot))};
  const meal=slot=>{const r=hash(seed("meal",slot));if(g==="grove"||g==="hive")return r<.35?"kitchens":"hall";return r<.07?"kitchens":"hall"};
  const free1=()=>{const r=hash(seed("f1")),fr=friendRoom(1);if(fr&&r<.6)return fr;
    if(r<.4)return home;if(r<.55)return "fields";if(r<.75)return "library";if(r<.85)return pick(["studio_art","music","dance"],seed("f1c"));return pick(["cloister","oldwood","greenhouse","lake"],seed("f1w"))};
  const free2=()=>{const rv=rivalRoom();if(rv)return rv;const fr=friendRoom(2);if(fr)return fr;const r=hash(seed("f2"));if(r<.45)return home;if(r<.65)return FACTION_COMMON[fac]||"hall";if(r<.8)return "pride";return pick(["gallery","cloister","library","stables","bathhouse"],seed("f2w"))};
  const evening=()=>{const t=trystRoom();if(t)return t;const fr=friendRoom(3);if(fr&&hash(seed("e"))<.4)return fr;const r=hash(seed("ev"));if(r<.5)return home;if(r<.7)return FACTION_COMMON[fac]||"hall";if(r<.85)return pick(["trail","lake","cliffs","observatory","bathhouse"],seed("evw"));return pick(["gallery","pride","cellar"],seed("evg"))};
  if(!we){S(0,dorm,"sleep");S(405,dorm,"wake");S(435,meal(0),"breakfast");S(495,klass(1),"class");S(615,klass(2),"class");S(735,meal(1),"lunch");S(795,klass(3),"class");
    S(915,free1(),"free");S(1035,free2(),"free");S(1125,meal(2),"dinner");S(1185,evening(),"evening");S(1335,dorm,"curfew");S(1375,dorm,"sleep")}
  else{S(0,dorm,"sleep");S(510,dorm,"wake");S(555,meal(3),"brunch");S(630,pick([free1(),"fields","lake","library","greenhouse","cloister","town_street","town_bakery"],seed("we1")),"outing");
    S(795,hash(seed("wl"))<.25?"town_bakery":meal(4),"lunch");S(870,pick([free1(),free2(),"town_street","town_harbor","cliffs","moor","oldwood","lake","stables"],seed("we2")),"outing");
    S(1125,hash(seed("wd"))<.18?"town_pub":meal(5),"dinner");S(1185,evening(),"evening");S(1350,dorm,"curfew");S(1385,dorm,"sleep")}
  if(ov){const o=ov.fn(day);if(o&&o.length){slots.length=0;o.forEach(x=>slots.push(Object.assign({},x,{room:ROOM[x.room]?x.room:"hall"})))}}
  if(ek){const ev=ek.ev,keep=slots.filter(x=>x.t0<ev.from-(ev.clear==null?120:ev.clear)||x.t0>=ev.to);keep.push({t0:ev.from,room:ROOM[ev.room]?ev.room:"hall",kind:"event",by:true});keep.sort((a,b)=>a.t0-b.t0);slots.length=0;keep.forEach(x=>slots.push(x))}
  // merge neighbours in the same room; a short hop between rooms gets a little human timing
  const out=[];slots.forEach(s=>{const p=out[out.length-1];if(p&&p.room===s.room){if(p.kind==="sleep"||s.kind!=="sleep"){if(s.by&&!p.by&&s.t0<=p.t0+1)p.by=true;return}p.kind=s.kind==="sleep"&&p.kind==="curfew"?"sleep":p.kind;return}out.push(Object.assign({},s))});
  // jitter and arrival times
  out.forEach((s,i)=>{s.leave=null;s.arrive=null});
  out.forEach((s,i)=>{if(i===0){s.arrive=-1;return}const p=out[i-1],r=route(p.room,s.room);let leave;
    if(s.by)leave=Math.max(p.arrive+2,s.t0-1.5-r.min);              /* her plan says she is there by t0, so she sets out in time */
    else{const j=Math.floor(hash(seed("j",i))*10);leave=Math.max(s.t0+j,p.arrive+4)}
    p.leave=leave;s.depart=leave;s.travel=r.min;s.arrive=leave+1.5+r.min});
  out[out.length-1].leave=1e9;RCACHE.set(ck,out);return out}

/* ---------- where is she now ---------- */
function stateAt(h,t,day){const R=routine(h,day);let k=0;for(let i=0;i<R.length;i++){if(R[i].arrive<=t||R[i].depart<=t)k=i}
  const s=R[k];
  if(s.depart!==undefined&&t>=s.depart&&t<s.arrive){const p=R[k-1],r=route(p.room,s.room),τ=t-s.depart;
    if(τ<1.5)return {st:"out",room:p.room,f:τ/1.5,from:p.room,to:s.room,since:p.arrive};
    return {st:"travel",from:p.room,to:s.room,r,τ:τ-1.5,eta:s.arrive}}
  if(t>=s.arrive&&t<s.arrive+1.5&&s.depart!==undefined)return {st:"in",room:s.room,f:(t-s.arrive)/1.5,enter:true,tin:t-s.arrive,kind:s.kind,leave:s.leave,arrive:s.arrive};
  return {st:"in",room:s.room,tin:t-Math.max(0,s.arrive),kind:s.kind,leave:s.leave,arrive:s.arrive,until:s.leave<1e8?s.leave:null}}

/* standing about inside a room: a busy room (a hall, a classroom, a dorm) spreads its crowd over a grid of places on the floor; a quiet one uses its few chosen spots */
function slotsOf(R){if(R._slots)return R._slots;const out=[],step=46;R.free.forEach(q=>{for(let y=q[1]+22;y<q[1]+q[3]-6;y+=step)for(let x=q[0]+24;x<q[0]+q[2]-12;x+=step)out.push([Math.round(x+(hash(x+"|"+y)-.5)*14),Math.round(y+(hash(y+"|"+x)-.5)*10)])});
  const seen=new Set();R._slots=out.filter(p=>{const k=Math.round(p[0]/22)+"|"+Math.round(p[1]/22);if(seen.has(k))return false;seen.add(k);return true});if(!R._slots.length)R._slots=R.spots;return R._slots}
const crowded=R=>(R.tags||[]).some(t=>["meal","class","sleep","rest","social","sport"].includes(t));
const poolOf=R=>crowded(R)?slotsOf(R):R.spots;
const spotAt=(h,R,room,i)=>{const p=poolOf(R);return p[Math.floor(hash(h+"|"+room+"|s"+i)*p.length)]};
const STAY=new Set(["class","breakfast","lunch","dinner","brunch"]);
function inRoom(h,room,tin,kind,enter){const R=ROOM[room];if(!R)return {x:W/2,y:H/2};
  const spot=i=>spotAt(h,R,room,i),door=R.door,k=Math.max(0,Math.floor((tin-1.5)/26));
  if(kind==="sleep"){const bd=R.sleep&&R.sleep.length?R.sleep.concat(slotsOf(R)):poolOf(R),s=bd[Math.floor(hash(h+"|"+room+"|bed")*bd.length)];return {x:s[0],y:s[1],asleep:true}}
  const stay=STAY.has(kind),cur=stay&&k>0?spot(0):spot(k),from=k===0?door:(stay?spot(0):spot(k-1));
  if(tin<1.5&&enter){const r=cached("w|"+room+"|"+from.join(",")+"|"+spot(0).join(","),()=>walk(R.G,door[0],door[1],spot(0)[0],spot(0)[1]));const p=at(r,r.len*(tin/1.5));return {x:p.x,y:p.y,walking:true,dx:p.dx}}
  const sinceNew=(tin-1.5)-k*26,r=cached("w|"+room+"|"+from.join(",")+"|"+cur.join(","),()=>walk(R.G,from[0],from[1],cur[0],cur[1])),wmin=Math.max(.5,r.len/60);
  if(k>0&&sinceNew<wmin){const p=at(r,r.len*(sinceNew/wmin));return {x:p.x,y:p.y,walking:true,dx:p.dx}}
  return {x:cur[0],y:cur[1]}}
function leaving(h,room,f,from){const R=ROOM[room];if(!R)return {x:W/2,y:H/2};const s=spotAt(h,R,room,0),r=cached("w|"+room+"|"+s.join(",")+"|door",()=>walk(R.G,s[0],s[1],R.door[0],R.door[1]));const p=at(r,r.len*f);return {x:p.x,y:p.y,walking:true,dx:p.dx}}

/* ---------- the page ---------- */
const css=document.createElement("style");css.id="mapCss313";css.textContent=`
.lm-bar{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;margin:10px 0}
.lm-clock{font:700 26px var(--e-serif,Georgia);min-width:150px;color:var(--e-gold2,#b8902f)}
.lm-bar input[type=range]{flex:1;min-width:180px;accent-color:var(--e-gold2,#b8902f)}
.lm-bar button,.lm-bar select{background:var(--e-card,#fff);border:1px solid var(--e-vellum2,#d8cdb6);border-radius:8px;padding:5px 11px;font:inherit;cursor:pointer;color:inherit}
.lm-bar button.on{background:var(--e-gold2,#b8902f);color:#fff;border-color:transparent}
.lm-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}
@media(max-width:980px){.lm-grid{grid-template-columns:1fr}}
.lm-tabs{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 8px}
.lm-tabs button{background:var(--e-card,#fff);border:1px solid var(--e-vellum2,#d8cdb6);border-radius:20px;padding:4px 12px;font:inherit;font-size:14px;cursor:pointer;color:inherit}
.lm-tabs button.on{background:var(--e-gold2,#b8902f);color:#fff;border-color:transparent}
.lm-stage{position:relative;overflow:hidden;border-radius:12px;border:1px solid #2c3260;background:#10142a;aspect-ratio:1216/832;touch-action:none;user-select:none;container-type:size}
.lm-zoom{position:absolute;right:8px;top:8px;display:flex;gap:4px;z-index:6}
.lm-zoom button{width:30px;height:30px;border-radius:8px;border:1px solid #fff5;background:#000a;color:#fff;font:700 16px sans-serif;cursor:pointer}
.lm-back{position:absolute;left:8px;top:8px;z-index:6;background:#000b;color:#fff;border:1px solid #fff5;border-radius:8px;padding:5px 11px;font:inherit;cursor:pointer}
.lm-cv{position:absolute;inset:0;transform-origin:0 0}
.lm-stage.lm-full{position:fixed;inset:0;z-index:2147483000;width:100vw;height:100vh;height:100dvh;aspect-ratio:auto;border-radius:0;border:0;display:flex;align-items:center;justify-content:center;background:#000}
.lm-stage.lm-full .lm-cv{position:relative;inset:auto;flex:none;width:min(100vw,calc(100vh * 1216 / 832));aspect-ratio:1216/832}
.lm-cv>*{position:absolute}
.lm-tile{overflow:hidden;border:2px solid #1b1830;box-shadow:inset 0 0 14px #0007;cursor:pointer;background-size:cover;background-position:center}
.lm-tile:hover{filter:brightness(1.18)}
.lm-tile b{position:absolute;left:0;right:0;top:0;padding:.3cqw .8cqw;font:700 max(8.5px,1.9cqw) Georgia;line-height:1.15;color:#fff;background:linear-gradient(#000b,#0000);text-shadow:0 1px 2px #000;pointer-events:none}
.lm-tile.portal{border-style:dashed;border-color:#fff9;background-color:#0004}
.lm-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.lm-spr{position:absolute;aspect-ratio:1;transform:translate(-50%,-92%);cursor:pointer;filter:drop-shadow(0 3px 2px #0009);will-change:left,top}
.lm-spr img{width:100%;height:100%;display:block;image-rendering:auto}
.lm-spr.walk img{animation:lmbob .4s steps(2) infinite}
.lm-spr.sel{filter:drop-shadow(0 0 6px #ffd24a) drop-shadow(0 0 2px #fff);z-index:4}
.lm-spr.zz img{transform:rotate(90deg) scale(.8);opacity:.85}
.lm-spr .nm{position:absolute;left:50%;top:100%;transform:translateX(-50%);font:700 11px Georgia;white-space:nowrap;background:#000b;color:#fff;padding:0 5px;border-radius:4px;opacity:0;pointer-events:none}
.lm-spr:hover .nm,.lm-spr.sel .nm{opacity:1}
@keyframes lmbob{0%{transform:translateY(0)}50%{transform:translateY(-7%)}}
.lm-spr.emph{filter:drop-shadow(0 0 6px #ffd24a) drop-shadow(0 0 2px #fff);z-index:3}
.lm-spr.emph .nm{opacity:1;background:#ffd24acc;color:#241b06}
.lm-stage.dimo .lm-spr:not(.emph){opacity:.4}
.lm-sky{inset:0;pointer-events:none;z-index:5;transition:background .6s}
.lm-side>div{background:var(--e-card,#fff);border:1px solid var(--e-vellum2,#d8cdb6);border-radius:12px;padding:10px 12px;margin-bottom:12px}
.lm-side h4{margin:0 0 6px;font-family:var(--e-serif,Georgia);font-size:17px}
.lm-side ul{margin:4px 0;padding:0;list-style:none}
.lm-side li{display:flex;gap:6px;align-items:center;padding:2px 0;font-size:14px}
.lm-side li a{cursor:pointer}
.lm-side li img{width:28px;height:28px;object-fit:contain}
.lm-side input[type=search]{width:100%;padding:6px 9px;border:1px solid var(--e-vellum2,#d8cdb6);border-radius:8px;font:inherit;margin-bottom:6px;background:var(--e-card,#fff);color:inherit}
.lm-list{max-height:260px;overflow:auto}
.lm-list a{cursor:pointer}
.lm-mut{color:var(--e-muted,#6d6a80);font-size:13px}
`;document.head.append(css);

const spriteURL=(h,big)=>"assets/sprites/"+h+(big?".256":".128")+".webp";
const roomName=r=>(ROOM[r]&&ROOM[r].name)||r;
let SIM={t:480,day:0,play:false,speed:1,sel:null,follow:false,area:"castle_ground",room:null,filter:""};

/* the stage: tabs, the plan or a room, the sprites. The Encyclopedia page and the game both mount it. o.state is {area,room,t,day,sel,follow,play,speed}. */
function mountStage(host,o){
  const st=o.state;let info={};
  const tabs=o.tabs===false?null:E("div",{class:"lm-tabs"}),stage=E("div",{class:"lm-stage"+(o.dim?" dimo":"")}),cv=E("div",{class:"lm-cv"}),sky=E("div",{class:"lm-sky"});
  const back=E("button",{type:"button",class:"lm-back",style:{display:"none"}},"Back to the plan"),zoom=E("div",{class:"lm-zoom"},E("button",{type:"button",title:"Zoom in"},"+"),E("button",{type:"button",title:"Zoom out"},"−"),E("button",{type:"button",title:"Reset"},"⌂"),E("button",{type:"button",title:"Full screen"},"⛶"));
  stage.append(cv,sky,back,zoom);if(tabs)host.append(tabs);host.append(stage);
  /* pan and zoom */
  let Z=1,PX=0,PY=0;const apply=()=>{const w=cv.offsetWidth,h=cv.offsetHeight;Z=Math.max(1,Math.min(5,Z));PX=Math.min(0,Math.max(w*(1-Z),PX));PY=Math.min(0,Math.max(h*(1-Z),PY));cv.style.transform=`translate(${PX}px,${PY}px) scale(${Z})`};
  const zoomAt=(f,cx,cy)=>{const r=stage.getBoundingClientRect(),x=cx-r.left-cv.offsetLeft,y=cy-r.top-cv.offsetTop,nz=Math.max(1,Math.min(5,Z*f)),k=nz/Z;PX=x-(x-PX)*k;PY=y-(y-PY)*k;Z=nz;apply()};
  zoom.children[0].onclick=()=>{const r=stage.getBoundingClientRect();zoomAt(1.4,r.left+r.width/2,r.top+r.height/2)};zoom.children[1].onclick=()=>{const r=stage.getBoundingClientRect();zoomAt(1/1.4,r.left+r.width/2,r.top+r.height/2)};zoom.children[2].onclick=()=>{Z=1;PX=PY=0;apply()};
  const fullOff=ev=>{if(ev.key==="Escape"&&stage.classList.contains("lm-full")){ev.stopPropagation();ev.preventDefault();toggleFull()}};
  const toggleFull=()=>{const on=stage.classList.toggle("lm-full");zoom.children[3].textContent=on?"✕":"⛶";zoom.children[3].title=on?"Leave full screen":"Full screen";if(on)document.addEventListener("keydown",fullOff,true);else document.removeEventListener("keydown",fullOff,true);Z=1;PX=PY=0;apply();
    try{if(on){const p=stage.requestFullscreen&&stage.requestFullscreen();if(p&&p.then)p.then(()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch(e){}}).catch(()=>{})}
      else{if(document.fullscreenElement)document.exitFullscreen();screen.orientation&&screen.orientation.unlock&&screen.orientation.unlock()}}catch(e){}};
  document.addEventListener("fullscreenchange",()=>{if(!document.fullscreenElement&&stage.isConnected&&stage.classList.contains("lm-full"))toggleFull()});
  zoom.children[3].onclick=toggleFull;
  stage.addEventListener("wheel",ev=>{ev.preventDefault();zoomAt(ev.deltaY<0?1.15:1/1.15,ev.clientX,ev.clientY)},{passive:false});
  const ptr=new Map();let moved=0,lastD=0;
  stage.addEventListener("pointerdown",ev=>{ptr.set(ev.pointerId,[ev.clientX,ev.clientY]);moved=0;lastD=0});
  stage.addEventListener("pointermove",ev=>{if(!ptr.has(ev.pointerId))return;const q=ptr.get(ev.pointerId);ptr.set(ev.pointerId,[ev.clientX,ev.clientY]);
    if(ptr.size===1){if(Z>1){PX+=ev.clientX-q[0];PY+=ev.clientY-q[1];moved+=Math.abs(ev.clientX-q[0])+Math.abs(ev.clientY-q[1]);apply()}}
    else if(ptr.size===2){const [p1,p2]=[...ptr.values()],d=Math.hypot(p1[0]-p2[0],p1[1]-p2[1]);if(lastD)zoomAt(d/lastD,(p1[0]+p2[0])/2,(p1[1]+p2[1])/2);lastD=d;moved+=5}});
  const up=ev=>{ptr.delete(ev.pointerId);lastD=0};stage.addEventListener("pointerup",up);stage.addEventListener("pointercancel",up);
  stage.addEventListener("click",ev=>{if(moved>8){ev.stopPropagation();ev.preventDefault()}},true);
  /* what is drawn */
  const pct=(x,y)=>[x/W*100,y/H*100];
  let sprites=new Map();
  const SP=o.girls||ACAD.HOUSES;
  const mkSprite=h=>{const sp=E("div",{class:"lm-spr"},E("img",{src:spriteURL(h),alt:"",draggable:"false",onerror:ev=>{const u=ACAD.pixelURL?ACAD.pixelURL(h):"";if(u&&ev.target.src!==u)ev.target.src=u}}),E("span",{class:"nm"},HN(h)));
    sp.addEventListener("click",ev=>{ev.stopPropagation();select(h)});return sp};
  function drawArea(){const A=AREA[st.area],a=A.a;cv.textContent="";sprites=new Map();back.style.display="none";
    const f=a.foot,box=(r,css)=>{const [x,y]=pct(r[0],r[1]);return Object.assign(css||{},{left:x+"%",top:y+"%",width:r[2]/W*100+"%",height:r[3]/H*100+"%"})};
    cv.append(E("div",{style:{inset:"0",background:a.bg}}),E("div",{style:box(f,{background:a.floor,border:"5px solid #231f2b",borderRadius:"8px"})}));
    A.shapes.forEach(sh=>{const r=sh.r||[sh.c[0]-sh.c[2],sh.c[1]-sh.c[2],sh.c[2]*2,sh.c[2]*2],R=ROOM[sh.id],lab=sh.portal?sh.label:(R&&R.name)||sh.id;
      const t=E("div",{class:"lm-tile"+(sh.portal?" portal":""),style:box(r,{backgroundColor:sh.floor||"#333",borderRadius:sh.c?"50%":"6px"}),title:lab,onclick:()=>{if(sh.portal){st.area=sh.to;st.room=null;redraw()}else{st.room=sh.id;redraw()}}},
        ((!sh.portal&&R&&R.thumb)||(sh.portal&&sh.thumb))?E("img",{src:sh.portal?sh.thumb:R.thumb,alt:"",loading:"lazy",draggable:"false",onerror:ev=>ev.target.remove()}):null,E("b",null,lab));cv.append(t)});
    cv.append(E("div",{class:"lm-layer",style:{inset:"0"}}))}
  function drawRoom(){const R=ROOM[st.room];cv.textContent="";sprites=new Map();back.style.display="block";
    cv.append(E("div",{style:{inset:"0",background:R.shape.floor||"#222"}}),R.art?E("img",{src:R.art,alt:R.name,draggable:"false",style:{left:"0",top:"0",width:"100%",height:"100%"},onerror:ev=>ev.target.remove()}):null,E("b",{style:{left:"10px",bottom:"8px",font:"700 15px Georgia",color:"#fff",textShadow:"0 1px 3px #000"}},R.name),E("div",{class:"lm-layer",style:{inset:"0"}}))}
  const redraw=()=>{(st.room?drawRoom:drawArea)();Z=1;PX=PY=0;apply();paintTabs();frame(true);if(o.onView)o.onView(st)};
  const paintTabs=()=>{if(!tabs)return;tabs.textContent="";Object.entries(M.areas).forEach(([id,a])=>tabs.append(E("button",{type:"button",class:id===st.area&&!st.room?"on":"",onclick:()=>{st.area=id;st.room=null;redraw()}},a.name)));
    if(st.room)tabs.append(E("button",{type:"button",class:"on"},roomName(st.room)))};
  back.onclick=()=>{st.room=null;redraw()};
  function select(h){if(o.onSelect)o.onSelect(h);else{st.sel=h;frame(true)}}
  const skyAt=t=>{const m=t;if(m<300||m>=1290)return "rgba(8,12,48,.50)";if(m<390)return "rgba(60,40,110,.32)";if(m<450)return "rgba(255,150,80,.16)";if(m<1020)return "rgba(0,0,0,0)";if(m<1110)return "rgba(255,170,60,.18)";if(m<1200)return "rgba(110,50,120,.28)";return "rgba(8,12,48,.42)"};
  /* the clock and what moves */
  function frame(force){if(!stage.isConnected)return;const t=st.t,day=st.day;sky.style.background=skyAt(t);
    const layer=cv.querySelector(".lm-layer");if(!layer)return;const inRoomView=!!st.room,seen=new Set(),byRoom={};info={};
    SP.forEach(h=>{const sx=stateAt(h,t,day);info[h]=sx;if(sx.st==="in"||sx.st==="out")(byRoom[sx.room]=byRoom[sx.room]||[]).push(h)});
    const emph=o.emph||null;
    const place=(h,x,y,opts,sz)=>{let sp2=sprites.get(h);if(!sp2){sp2=mkSprite(h);sprites.set(h,sp2);layer.append(sp2)}seen.add(h);
      const [px,py]=pct(x,y),em=!!(emph&&emph.has(h));sp2.style.left=px+"%";sp2.style.top=py+"%";sp2.style.width=(em?sz*1.25:sz)+"%";sp2.style.zIndex=Math.round(y)+(em?900:0);sp2.classList.toggle("walk",!!opts.walking);sp2.classList.toggle("zz",!!opts.asleep);sp2.classList.toggle("sel",h===st.sel);sp2.classList.toggle("emph",em);
      sp2.firstChild.style.transform=opts.dx<-1&&!opts.asleep?"scaleX(-1)":""};
    if(inRoomView){const R=ROOM[st.room],list=byRoom[st.room]||[],n=Math.max(1,list.length),sz=Math.max(3.4,Math.min(7.4,Math.sqrt(R.free.reduce((q,r)=>q+r[2]*r[3],0)*.55/n)/W*100));
      list.forEach(h=>{const sx=info[h];let p;if(sx.st==="out")p=leaving(h,st.room,sx.f);else p=inRoom(h,st.room,sx.tin,sx.kind,sx.enter);
        const j=hash(h+"j");place(h,p.x+(p.walking?0:(j-.5)*14),p.y+(p.walking?0:(hash(h+"k")-.5)*10),p,sz)})}
    else{
      Object.entries(byRoom).forEach(([rid,list])=>{const R=ROOM[rid];if(!R||R.area!==st.area)return;const s0=R.shape,n=list.length,sz=Math.max(2.2,Math.min(5.6,Math.sqrt(s0.w*s0.h*.5/n)/W*100));
        list.forEach(h=>{const j=hash(h+"hx"),k=hash(h+"hy"),sx=info[h],hx=s0.cx+(j-.5)*s0.w*.85,hy=s0.cy+(k-.5)*s0.h*.7+s0.h*.1;
          if(sx.st==="out"){const f=sx.f;place(h,hx+(s0.door[0]-hx)*f,hy+(s0.door[1]-hy)*f,{walking:true,dx:s0.door[0]-hx},sz);return}
          place(h,hx,hy,{asleep:sx.kind==="sleep"},sz)})});
      SP.forEach(h=>{const sx=info[h];if(sx.st!=="travel")return;let tau=sx.τ,pos=null;for(const l of sx.r.legs){if(tau<l.min){if(!l.transit){const p=at(l.r,l.r.len*(tau/l.min));pos={a:l.area,x:p.x,y:p.y,dx:p.dx}}break}tau-=l.min}
        if(pos&&pos.a===st.area)place(h,pos.x,pos.y,{walking:true,dx:pos.dx},3.8)})}
    sprites.forEach((sp2,h)=>{if(!seen.has(h)){sp2.remove();sprites.delete(h)}});
    if(st.follow&&st.sel&&info[st.sel]){const sx=info[st.sel],tgt=sx.st==="in"||sx.st==="out"?sx.room:null;if(tgt&&ROOM[tgt]&&(st.room?st.room!==tgt:ROOM[tgt].area!==st.area)){st.area=ROOM[tgt].area;st.room=inRoomView?tgt:null;redraw();return}}
    if(o.onFrame)o.onFrame({info,byRoom,force,t,day})}
  /* put the view where a girl is: her room, or its floor */
  function focus(h,inside){const sx=stateAt(h,st.t,st.day),rid=sx.st==="in"||sx.st==="out"?sx.room:sx.to;if(!rid||!ROOM[rid])return;st.area=ROOM[rid].area;st.room=inside?rid:null;redraw()}
  let last=0,alive=true;const loop=now=>{if(!stage.isConnected){alive=false;return}if(st.play){const dt=Math.min(200,now-last);st.t+=dt/1000*st.speed*4;if(st.t>=1440){st.t-=1440;st.day=(st.day+1)%7;if(o.onDay)o.onDay(st.day)}}
    if(now-last>60||!st.play){last=now;frame(false)}requestAnimationFrame(loop)};
  redraw();requestAnimationFrame(loop);
  return {frame,redraw,select,focus,stage,state:st,get info(){return info},dispose:()=>{alive=false}}
}

function build(el){
  const art=E("article",{class:"enc-article wide"});
  art.append(E("h1",{class:"enc-title"},"The living map"),
    E("p",{class:"enc-lead enc-n"},"Every girl keeps a routine: lessons, meals, her group's haunt, her friends, her family, her rivals and her secrets. Slide the clock, or let the day run, and follow any of them."),
    E("p",{class:"enc-note"},"Routines are worked out from the relationships in this Encyclopedia, so when a tie changes, so do the people who share a room. Choose a room to step inside; choose a girl to follow her."));
  const clock=E("span",{class:"lm-clock"}),slider=E("input",{type:"range",min:0,max:1439,value:SIM.t,"aria-label":"Time of day"});
  const play=E("button",{type:"button"},"Play"),sp=[1,4,16].map(v=>E("button",{type:"button",class:v===SIM.speed?"on":"","data-sp":v},v+"x"));
  const daySel=E("select",{"aria-label":"Day"},DAYS.map((d,i)=>E("option",{value:i,selected:i===SIM.day},d)));
  art.append(E("div",{class:"lm-bar"},clock,slider,play,sp,daySel));
  const side=E("div",{class:"lm-side"}),card=E("div"),here=E("div"),tog=E("div"),roster=E("div");side.append(card,tog,here,roster);
  const stageHost=E("div");
  art.append(E("div",{class:"lm-grid"},E("div",null,stageHost,E("p",{class:"lm-mut"},"Pinch or scroll to zoom, drag to pan. The tint follows the hour. On a phone, turn it sideways and use the corner button for full screen.")),side));
  el.append(art);
  let lastSel=null,lastByRoom={},lastT=-9,INFO={},ctl=null;
  ctl=mountStage(stageHost,{state:SIM,
    onSelect:h=>{SIM.sel=h;paintSide(lastByRoom);ctl.frame(true)},
    onDay:()=>{daySel.value=SIM.day},
    onFrame:c=>{lastByRoom=c.byRoom;INFO=c.info;clock.textContent=DAYS[c.day]+" "+fmt(c.t);slider.value=Math.floor(c.t);
      if(c.force||Math.floor(c.t)!==Math.floor(lastT)||SIM.sel!==lastSel){lastT=c.t;lastSel=SIM.sel;paintSide(c.byRoom)}}});
  function paintSide(byRoom){const info=INFO;
    card.textContent="";const h=SIM.sel;
    if(!h){card.append(E("h4",null,"Follow someone"),E("p",{class:"lm-mut"},"Choose any girl on the map or in the list below. Her day appears here, with where she is going next."))}
    else{const s=info[h]||stateAt(h,SIM.t,SIM.day),R=routine(h,SIM.day);let line="";
      if(s.st==="travel")line="On her way to "+roomName(s.to)+", there about "+fmt(s.eta)+".";else if(s.st==="out")line="Leaving "+roomName(s.room)+".";
      else line=(s.kind==="sleep"?"Asleep in ":"In ")+roomName(s.room)+(s.until?", until about "+fmt(s.until):"")+".";
      const g=ACAD.GROUP_OF(h),por=ACAD.portraitImg?ACAD.portraitImg(h,64):null;
      card.append(E("div",{style:{display:"flex",gap:"10px",alignItems:"center"}},por,E("div",null,E("h4",{style:{margin:0}},ENC.lnk("house:"+h,HN(h))),E("span",{class:"lm-mut"},g?g.name:""))),
        E("p",null,line),E("h4",{style:{fontSize:"15px",marginTop:"8px"}},DAYS[SIM.day]),
        E("ul",null,R.map(x=>E("li",{style:{opacity:(x.leave||1e9)<SIM.t?.45:1}},E("b",{style:{minWidth:"44px"}},fmt(Math.max(0,x.arrive<0?0:x.arrive))),E("a",{onclick:()=>{SIM.area=ROOM[x.room].area;SIM.room=x.room;ctl.redraw()}},roomName(x.room)),E("span",{class:"lm-mut"},x.kind)))),
        E("div",{class:"lm-bar",style:{margin:"6px 0 0"}},E("button",{type:"button",class:SIM.follow?"on":"",onclick:()=>{SIM.follow=!SIM.follow;paintSide(byRoom)}},SIM.follow?"Following her":"Follow her"),E("button",{type:"button",onclick:()=>{SIM.sel=null;SIM.follow=false;paintSide(byRoom);ctl.frame(true)}},"Clear")))}
    tog.textContent="";const target=SIM.room||null;const list=byRoom?(target?(byRoom[target]||[]):[]):[];
    if(target){tog.append(E("h4",null,roomName(target)),list.length?E("ul",null,list.slice(0,24).map(x=>E("li",null,E("a",{onclick:()=>{SIM.sel=x;paintSide(byRoom);ctl.frame(true)}},HN(x))))):E("p",{class:"lm-mut"},"Nobody here at this hour."),list.length>24?E("p",{class:"lm-mut"},"and "+(list.length-24)+" more"):null)}
    else tog.append(E("h4",null,"Choose a room"),E("p",{class:"lm-mut"},"Open any room on the plan to see who is inside and walk with them."));
    here.textContent="";const c=context(),pairs=[];if(byRoom){Object.entries(byRoom).forEach(([rid,l])=>{if(l.length<2||l.length>80)return;const set=new Set(l);const seenp=new Set();l.forEach(a=>{(c.pairsOf||(c.pairsOf=(()=>{const m={};Object.keys(c.ties).forEach(k=>{const [x,y]=k.split("|");(m[x]=m[x]||[]).push(y);(m[y]=m[y]||[]).push(x)});return m})()))[a]&&c.pairsOf[a].forEach(b=>{if(set.has(b)&&a<b){const k=a+"|"+b;if(!seenp.has(k)){seenp.add(k);pairs.push([a,b,rid,c.ties[k][0]])}}})})})}
    here.append(E("h4",null,"Together right now"),pairs.length?E("ul",null,pairs.slice(0,14).map(([a,b,rid,why])=>E("li",null,E("span",null,E("a",{onclick:()=>{SIM.sel=a;paintSide(byRoom);ctl.frame(true)}},HN(a))," and ",E("a",{onclick:()=>{SIM.sel=b;paintSide(byRoom);ctl.frame(true)}},HN(b))," ",E("span",{class:"lm-mut"},"("+why+") in "+roomName(rid)))))):E("p",{class:"lm-mut"},"No friends, family, rivals or secrets share a room at this hour."));
    roster.textContent="";const input=E("input",{type:"search",placeholder:"Find a girl or a group",value:SIM.filter,oninput:ev=>{SIM.filter=ev.target.value;fillRoster()}});
    const lst=E("div",{class:"lm-list"});const fillRoster=()=>{lst.textContent="";const qq=SIM.filter.toLowerCase();ACAD.HOUSES.filter(h=>!qq||HN(h).toLowerCase().includes(qq)||((ACAD.GROUP_OF(h)||{}).name||"").toLowerCase().includes(qq)).slice(0,60).forEach(h=>{const sx=info[h]||{};lst.append(E("li",null,ENC.pixel?ENC.pixel(h,24):null,E("a",{onclick:()=>{SIM.sel=h;paintSide(byRoom);ctl.frame(true)}},HN(h)),E("span",{class:"lm-mut"},sx.st==="travel"?"walking":sx.room?roomName(sx.room):"")))})};
    fillRoster();roster.append(E("h4",null,"Everyone"),input,E("ul",null,lst))}
  slider.oninput=()=>{SIM.t=+slider.value;ctl.frame(true)};
  play.onclick=()=>{SIM.play=!SIM.play;play.textContent=SIM.play?"Pause":"Play"};if(SIM.play)play.textContent="Pause";
  sp.forEach(b=>b.onclick=()=>{SIM.speed=+b.dataset.sp;sp.forEach(x=>x.classList.toggle("on",x===b))});
  daySel.onchange=()=>{SIM.day=+daySel.value;RCACHE.clear();ctl.frame(true)};
}

ENC.page("livemap",{title:"The living map",short:"The living map",sec:"places",crumbs:["places"],searchText:()=>"living map schedule routine day who is where follow walking "+Object.values(ROOM).map(r=>r.name).join(" "),build});
/* the Locations page points at it */
const pg=ENC.pages&&ENC.pages.places;if(pg&&pg.build&&!pg._lm){const ob=pg.build;pg._lm=1;pg.build=el=>{ob(el);const art=el.querySelector("article");if(art){const n=art.querySelector(".enc-note");const b=E("p",{class:"enc-note"},E("b",null,"New: "),ENC.lnk("livemap","The living map"),". Watch the whole Academy through a day: every girl's routine, and who is in which room.");if(n)n.after(b);else art.prepend(b)}}}
const dormOf=h=>{const f=context().fac[h];return ROOM[FACTION_DORM[f]]?FACTION_DORM[f]:"dawn_dorm"},commonOf=h=>{const f=context().fac[h];return ROOM[FACTION_COMMON[f]]?FACTION_COMMON[f]:"hall"};
ACAD.livemap={dormOf,commonOf,haunt,route,routine,stateAt,rooms:ROOM,areas:AREA,context,mountStage,setOverride,clearOverride,setEvent,clearEvents,DAYS,roomName,fmt};
})();
/*MAP-END*/
