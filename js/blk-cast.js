/* ---- v271: Cast, the quick way to make a scene (top of the Scene step).
   One card that does what used to take the whole Scene step: pick a scene, then for each character pick WHO (any of the
   160 girls, their boyfriends, the headmistresses, the principals and staff, a faceless man, or one of your saves) and
   WHAT THEY WEAR (the scene's own outfit, Nude, or any look of theirs from the Wardrobe). Up to six characters; swap 1 and 2.
   Everything below it in the Scene step still works on the same scene, for fine-tuning.
   - Character 1 is the studio's own design: choosing her loads that look in place of the design and keeps the scene.
   - Character 2 is pair.id / pair.outfit; characters 3 to 6 are pair.more.
   - "Nude" is an empty outfit named Nude, which the studio writes as her bare body (with explicit on, her intimate
     details), plus "completely nude" in her tags. It goes through the same safeguards as everything else: nobody under
     18 by her biography can be put in a nude or explicit scene, and a held-back scene re-dresses everyone in it.
   S.out.c1look / S.out.c1wear remember character 1's pick, so the card can show it. ---- */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!window.PAIR||typeof tplById!=="function"||typeof openPop!=="function")return;
const NUDE_TAG="completely nude";
const tpl=id=>{try{return typeof id==="string"&&id?tplById(id):null}catch(e){return null}};
const peek=t=>ACAD.peekOut?ACAD.peekOut(t):t&&t.out;
const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||(h?h.charAt(0).toUpperCase()+h.slice(1):"");
const disp=l=>l==="Academy"?"House robes":String(l).replace(/^Academy /,"");
const MAXC=6;
const say=m=>{try{toast(m)}catch(e){}};

/* ---------- who is who: every look in the Academy sets, by person ---------- */
let IDX=null;
function index(){
  if(IDX)return IDX;
  const H=ACAD.HOUSES||[],byLen=H.slice().sort((a,b)=>b.length-a.length);
  const houseOf=k=>byLen.find(x=>k.startsWith(x))||null;
  const CAT={};(ACAD.CATS||[]).forEach(([c,ls])=>ls.forEach(l=>{CAT[l]=c}));
  const looks=new Map();   /* "girl:penguin" -> [{id,set,cat}] */
  const add=(key,e)=>{if(!looks.has(key))looks.set(key,[]);const L=looks.get(key);if(!L.some(x=>x.id===e.id))L.push(e)};
  (PRESET_GROUPS.start||[]).forEach(g=>{if(!/^Academy/.test(g.label))return;
    g.keys.forEach(k=>{const h=houseOf(k);if(!h)return;const t=tpl(k);if(!t)return;const o=peek(t);if(o&&o.pair)return;
      const suf=k.slice(h.length),kind=/^man/.test(suf)?"boy":/^head/.test(suf)?"head":"girl";
      add(kind+":"+h,{id:k,set:g.label,cat:CAT[g.label]||(kind==="girl"?"More looks":"Looks")})})});
  /* each person's own base look first */
  H.forEach(h=>{[["girl",h+"robes"],["boy",h+"man"],["head",h+"head"]].forEach(([kind,id])=>{const L=looks.get(kind+":"+h);if(!L)return;const i=L.findIndex(x=>x.id===id);if(i>0)L.unshift(L.splice(i,1)[0])})});
  const others=[];
  (PRESET_GROUPS.start.find(g=>g.label==="Academy Principals")||{keys:[]}).keys.forEach(k=>{const t=tpl(k);if(t)others.push({id:k,name:t.name,sub:"Principal"})});
  Object.keys((window.ENC&&ENC.STAFF)||{}).forEach(k=>{const t=tpl("staff"+k);if(t)others.push({id:"staff"+k,name:t.name,sub:"Staff"})});
  return IDX={looks,houseOf,others}}
/* the person a look belongs to */
function personOf(id){
  if(!id)return null;
  if(id.startsWith("save:"))return{kind:"save",key:id,name:saveName(id)};
  const X=index();const h=X.houseOf(id);
  if(h){const suf=id.slice(h.length),kind=/^man/.test(suf)?"boy":/^head/.test(suf)?"head":"girl";
    const base=kind==="girl"?h+"robes":kind==="boy"?h+"man":h+"head";const bt=tpl(base);
    return{kind,h,key:kind+":"+h,name:kind==="girl"?HN(h):(bt?bt.name.split(",")[0]:HN(h)),sub:kind==="girl"?((BIOS[h]||{}).fullName||""):kind==="boy"?HN(h)+"'s boyfriend":"Headmistress of "+HN(h)+" House"}}
  const o=X.others.find(x=>x.id===id);if(o)return{kind:"other",key:"other:"+id,name:o.name,sub:o.sub};
  const t=tpl(id);return t?{kind:"other",key:"other:"+id,name:t.name,sub:""}:null}
const saves=()=>{try{return readSaves()||[]}catch(e){return[]}};
const saveName=id=>{const s=saves().find(x=>"save:"+x.id===id);return s?s.name||"My save":"My save"};
const looksOf=P=>P&&P.kind!=="save"&&P.kind!=="other"?(index().looks.get(P.key)||[]):[];
/* a look's name: its set, and which of the set's looks when one person has several in it (the boys' robes, regalia, colors) */
const SUFN={robes:"House robes",regalia:"House regalia",gcolors:"Group colors",signature:"Signature"};
function lookLabel(L,LS,P){const same=LS.filter(x=>x.set===L.set);if(same.length<2)return disp(L.set);
  const suf=L.id.slice(P.h.length).replace(/^(man|head)/,"");return disp(L.set)+": "+(SUFN[suf]||(suf?suf:"Base"))}
const lookName=id=>{const P=personOf(id);if(!P)return id;const LS=looksOf(P),L=LS.find(x=>x.id===id);return L?lookLabel(L,LS,P):(tpl(id)||{}).name||id};
const outfitNames=t=>[t.outfit].concat(t.more||[]).map((o,i)=>(o&&o.oname)||("Outfit "+(i+1)));
const PIC=h=>{try{return(ACAD.portraitURL&&ACAD.portraitURL(h))||null}catch(e){return null}};
const minor=P=>!!(P&&P.h&&ACAD.isMinor&&ACAD.isMinor(P.h));

/* ---------- character 1: who she is, from the design ---------- */
function c1Look(){const L=S.out&&S.out.c1look;if(L&&tpl(L))return L;
  const h=window.SCENE_SLOTS&&SCENE_SLOTS.girlOfState?SCENE_SLOTS.girlOfState(S):null;return h?h+"robes":""}
function c1Wear(){const w=S.out&&S.out.c1wear;if(w!=null)return w;const o=S.outfits[S.cur];return o&&/^nude$/i.test(o.name||"")?"nude":"own"}

/* ---------- tags: "completely nude" follows the Nude pick ---------- */
const addTag=(s,t)=>{const a=String(s||"").split(",").map(x=>x.trim()).filter(Boolean);if(!a.includes(t))a.push(t);return a.join(", ")};
const dropTag=(s,t)=>String(s||"").split(",").map(x=>x.trim()).filter(x=>x&&x!==t).join(", ");
/* v273: nude means nothing on. Tags the scene wrote about what she wears ("underwear only", "school uniform") are set aside
   while she is nude and come back when she is dressed again. Things done to clothes ("unhooking another's bra",
   "bra removed") and "no bra" stay. */
const CLOTH=/\b(underwear|bra|panties|lingerie|shirt|t-shirt|skirt|miniskirt|dress|uniform|robes?|jacket|blazer|coat|hoodie|sweater|cardigan|pants|shorts|jeans|socks|thighhighs|kneehighs|pantyhose|stockings|leggings|swimsuit|bikini|one-piece|apron|towel|pajamas|nightgown|negligee|kimono|yukata|clothes|clothed|dressed|outfit|costume|vest|blouse|camisole|tank top|crop top|leotard|bodysuit|corset|garter belt|garter straps|sleeves|serafuku|gym uniform|buruma|bathrobe|sweatpants)\b/i;
const ACTW=/\b(another's|removed|removing|remove|pulling|pulled|unhooking|unhooked|taking off|lift|lifted|grab|grabbing|holding|on floor|on the floor|discarded|torn|undressing|changing)\b|^no /i;
const isCloth=t=>CLOTH.test(t)&&!ACTW.test(t)&&t!==NUDE_TAG;
function nudeOn(o,f){const a=String(o[f]||"").split(",").map(x=>x.trim()).filter(Boolean);
  const hid=a.filter(isCloth),keep=a.filter(x=>!isCloth(x));
  if(hid.length)o[f+"Hid"]=Array.from(new Set((o[f+"Hid"]||[]).concat(hid)));
  if(!keep.includes(NUDE_TAG))keep.push(NUDE_TAG);o[f]=keep.join(", ")}
function nudeOff(o,f){let v=dropTag(o[f],NUDE_TAG);const hid=o[f+"Hid"];
  if(hid&&hid.length)hid.forEach(t=>{v=addTag(v,t)});delete o[f+"Hid"];
  if(v)o[f]=v;else delete o[f]}
const nudeTags=(o,f,on)=>on?nudeOn(o,f):nudeOff(o,f);

/* ---------- changing a character ---------- */
function setC1(id,wear){
  const t=tpl(id);if(!t){say("That look isn't in this version.");return}
  const P=personOf(id);
  const keep=S.out.pair?JSON.parse(JSON.stringify(S.out.pair)):null;
  const o={explicit:S.out.explicit,lewdtag:S.out.lewdtag,model:S.out.model};
  if(keep){o.framing=S.out.framing;o.must=S.out.must}
  const st=t._state?normalize(JSON.parse(JSON.stringify(t._state))):stateFromTemplate(t);
  st.out=Object.assign({},st.out,o,{pair:keep});
  let ok=false;{const keepS=S;try{S=normalize(JSON.parse(JSON.stringify(st)));ok=Policy.explicitAllowed()&&!minor(P)}finally{S=keepS}}
  const male=st.c.sex==="male";
  if(wear==="nude"&&!ok){say((Policy.reason&&Policy.reason())||"That isn't available for this character.");wear="own"}
  if(keep&&keep.c1&&!male&&(!keep.explicit||ok))Object.entries(keep.c1).forEach(([k,x])=>{if(x==null)delete st.c[k];else st.c[k]=x});
  if(wear==="scene"&&keep&&keep.w1){const so=PAIR.sceneOutfit(keep.w1,male,st);if(so){so.name=so.name||keep.w1.name||"Scene outfit";st.outfits.push(so);st.cur=st.outfits.length-1}else wear="own"}
  else if(wear==="nude"){st.outfits.push(newOutfit("Nude"));st.cur=st.outfits.length-1}
  else if(typeof wear==="number"){st.cur=Math.min(Math.max(0,wear),st.outfits.length-1)}
  else st.cur=0;
  if(keep){nudeTags(keep,"tags1",wear==="nude");st.out.pair=keep}
  if(ok&&(wear==="nude"||(keep&&keep.explicit))){st.out.explicit=!!(keep&&keep.explicit)||st.out.explicit;st.out.lewdtag=true}
  st.out.c1look=id;st.out.c1wear=wear;
  replaceState(st)}
function ensurePair(){if(!S.out.pair)S.out.pair={id:"",outfit:0,scene:"",act:"",dir:"mutual",compact:false,fit:true}}
function setC2(id,wear,gm){
  mut(()=>{ensurePair();const p=S.out.pair;
    if(gm){p.id="";p.gm=gm;p.outfit=0;nudeTags(p,"tags2",false);return}
    delete p.gm;
    if(!id){p.id="";p.outfit=0;if(p.more)delete p.more;return}
    const P=personOf(id);if(wear==="nude"&&minor(P)){say(HN(P.h)+" is under 18 by her biography.");wear=0}
    p.id=id;p.outfit=wear==null?(p.w2?"scene":0):wear;
    nudeTags(p,"tags2",wear==="nude")},"castC2")}
function setX(i,id,wear){
  mut(()=>{const p=S.out.pair;if(!p||!p.id)return;p.more=p.more||[];const m=p.more[i]||(p.more[i]={id:"",outfit:0});
    const P=personOf(id);if(wear==="nude"&&minor(P)){say(HN(P.h)+" is under 18 by her biography.");wear=0}
    m.id=id;m.outfit=wear==null?(p.w2?"scene":0):wear;nudeTags(m,"tags",wear==="nude")},"castX")}
function dropX(i){mut(()=>{const p=S.out.pair;if(!p||!p.more)return;p.more.splice(i,1);if(!p.more.length)delete p.more},"castXDrop")}
function addX(){const p=S.out.pair;if(!p||!p.id){say("Pick character 2 first.");return}
  if(2+(p.more||[]).length>=MAXC){say(`The image generator draws up to ${MAXC} characters.`);return}
  pickWho(null,3+(p.more||[]).length-1,(id)=>setX((p.more||[]).length,id,null))}
function swap(){
  const p=S.out.pair;if(!p||!p.id){say("Pick a character 2 to swap with.");return}
  const a=c1Look();if(!a||!tpl(a)){say("Character 1 is your own design; save her and pick her from My saves to swap.");return}
  const aw=c1Wear(),bid=p.id,bw=p.outfit;
  /* character 2 becomes character 1 (in what she wears), and character 1 takes her place */
  setC2(a,aw==="own"?0:aw);
  setC1(bid,bw==="none"?"own":bw==null?"own":bw)}

/* ---------- pickers ---------- */
function suggested(){
  const p=S.out.pair||{},out=[];const h1=window.SCENE_SLOTS?SCENE_SLOTS.girlOfState(S):null;
  if(p.arch&&ACAD.RX){try{const t=ACAD.RX.build(p.arch.s,p.arch.v,{h1});const q=t&&t.out.pair;
    if(q&&q.id&&tpl(q.id)){const P=personOf(q.id);out.push({v:"id:"+q.id,label:(P?P.name:tpl(q.id).name),sub:"Written for this scene"})}
    else if(q&&q.gm)out.push({v:"gm:"+q.gm,label:q.gm==="pov"?"Faceless man, his point of view":"Faceless man",sub:"Written for this scene"})}catch(e){}}
  if(h1){const R=ACAD.RELDATA||{};const other=(arr)=>{const x=(arr||[]).find(q=>q[0]===h1||q[1]===h1);return x?(x[0]===h1?x[1]:x[0]):""};
    const bf=((R.BF||{})[h1]||[])[0]||"";
    [[h1+"man","Her boyfriend"],[other(R.SG)&&other(R.SG)+"robes","Her girlfriend"],[bf&&bf+"robes","Her best friend"],[other(R.RV)&&other(R.RV)+"robes","Her rival"]]
      .forEach(([id,sub])=>{if(id&&tpl(id)&&!out.some(o=>o.v==="id:"+id)){const P=personOf(id);out.push({v:"id:"+id,label:P?P.name:tpl(id).name,sub,img:P&&P.kind==="girl"?PIC(P.h):null})}})}
  return out}
function pickWho(btn,n,onPick){
  const X=index(),secs=[];
  if(n>=2){const sg=suggested().filter(x=>n===2||x.v.startsWith("id:"));if(sg.length)secs.push({name:"Suggested",items:sg})}
  if(n===2){secs.push({name:"Anyone",items:[{v:"gm:far",label:"Faceless man",sub:"All about her"},{v:"gm:pov",label:"Faceless man, his point of view",sub:"POV"}].concat(n===2?[{v:"none",label:"No one (solo)",sub:"Character 1 alone"}]:[])})}
  const sv=saves();if(sv.length)secs.push({name:"My saves",items:sv.map(x=>({v:"id:save:"+x.id,label:x.name||"My save",sub:"Saved design"}))});
  (ACAD.GROUPS||[]).forEach(g=>{const items=g.members.filter(h=>tpl(h+"robes")).map(h=>({v:"id:"+h+"robes",label:HN(h),sub:(BIOS[h]||{}).fullName||"",img:PIC(h)}));if(items.length)secs.push({name:g.name,items})});
  const boys=(ACAD.HOUSES||[]).filter(h=>tpl(h+"man")).map(h=>({v:"id:"+h+"man",label:tpl(h+"man").name,sub:HN(h)+"'s boyfriend"}));if(boys.length)secs.push({name:"The boys",items:boys});
  const heads=(ACAD.HOUSES||[]).filter(h=>tpl(h+"head")).map(h=>({v:"id:"+h+"head",label:tpl(h+"head").name.split(",")[0],sub:"Headmistress of "+HN(h)+" House"}));if(heads.length)secs.push({name:"The headmistresses",items:heads});
  if(X.others.length)secs.push({name:"Principals and staff",items:X.others.map(o=>({v:"id:"+o.id,label:o.name,sub:o.sub}))});
  const cur=n===1?c1Look():n===2?(S.out.pair&&(S.out.pair.id||(S.out.pair.gm?"gm:"+S.out.pair.gm:"")))||"":((S.out.pair&&S.out.pair.more&&S.out.pair.more[n-3])||{}).id;
  openPop(btn||document.getElementById("castBox"),{title:"Character "+n+": who",searchPlaceholder:"Search 160 girls, the boys, the headmistresses…",sections:secs,
    current:cur&&cur.indexOf(":")<0?"id:"+cur:cur,onPick:v=>{
      if(v==="none")return setC2("",0);if(v.startsWith("gm:"))return setC2("",0,v.slice(3));
      const id=v.slice(3);onPick(id)}})}
/* what someone wears: the scene's outfit, Nude, or any of their looks */
function pickWear(btn,n,id,curWear){
  const P=personOf(id),p=S.out.pair||{},secs=[];const top=[];
  const hasScene=n===1?!!p.w1:!!p.w2;
  if(hasScene)top.push({v:"w:scene",label:"The scene's outfit",sub:(n===1?p.w1:p.w2).name||"Written for this scene"});
  top.push({v:"w:nude",label:"Nude",sub:minor(P)?"Not available":"Nothing at all",dis:minor(P)?"Under 18 by her biography":null});
  if(n>1)top.push({v:"w:none",label:"No outfit text",sub:"Her character only; the image generator decides"});
  const t=tpl(id);if(t&&outfitNames(t).length>1)outfitNames(t).forEach((nm,i)=>top.push({v:"o:"+id+"|"+i,label:nm,sub:"This look"}));
  secs.push({name:"",items:top});
  const by=new Map(),LS=looksOf(P);
  LS.forEach(L=>{if(!by.has(L.cat))by.set(L.cat,[]);by.get(L.cat).push({v:"o:"+L.id+"|0",label:lookLabel(L,LS,P),sub:L.id===id?"Wearing now":""})});
  by.forEach((items,cat)=>secs.push({name:cat,items}));
  const curV=curWear==="scene"?"w:scene":curWear==="nude"?"w:nude":curWear==="none"?"w:none":"o:"+id+"|"+(typeof curWear==="number"?curWear:0);
  openPop(btn,{title:"Character "+n+": wearing",searchPlaceholder:"Search her looks",sections:secs,current:curV,onPick:v=>{
    let nid=id,w;
    if(v.startsWith("w:"))w=v.slice(2);else{const [lid,i]=v.slice(2).split("|");nid=lid;w=+i}
    if(n===1)setC1(nid,w);else if(n===2)setC2(nid,w);else setX(n-3,nid,w)}})}

/* ---------- v272: who a scene is written for ----------
   "man" (her and a man, or a faceless man), "girls" (two girls), "group" (three or more), "solo" (her alone).
   Archive scenes say it in their own data (the partner they were written for); library scenes by their partner and text. */
const KINDS=[["man","Girl + man"],["girls","Two girls"],["group","Three or more"],["solo","Her alone"]];
const KNAME=Object.fromEntries(KINDS);
const GRP=/\b(threesome|foursome|group sex|3girls|4girls|2boys|3boys|orgy|harem|gangbang|\{n\})\b/i;
const MANW=/\b(1boy|hetero|penis|\{partner\}|\{cock\}|the man)\b/i,GIRLW=/\b(2girls|yuri|lesbian)\b/i;
function kindOfText(txt,p0,penis,gm,more){
  if(more||GRP.test(txt))return"group";
  if(gm)return"man";
  if(p0)return sexOf(p0)==="m"?"man":"girls";
  if(GIRLW.test(txt))return"girls";
  if(penis||MANW.test(txt))return"man";
  return"solo"}
const KC=new Map(),XC=new Map();
function sceneKind(v){
  if(KC.has(v))return KC.get(v);let k="solo";
  try{const m=/^rx:(\d+):(\d+)$/.exec(v||"");
    if(m&&ACAD.RX){const x=ACAD.RX.variant(+m[1],+m[2])||{},f=x.f||{},r=x.r||{};
      k=kindOfText((f.scene||f.solo||"")+" "+(f.act||""),(x.p||[])[0]||"",r.penis,r.gm,null)}
    else{const t=window.SCENE_LIBRARY&&SCENE_LIBRARY.get(v),p=t&&t.out&&t.out.pair;
      if(p)k=kindOfText((p.scene||p.solo||"")+" "+(p.act||""),p.id||"",p.penis,p.gm,p.more&&p.more.length)}}catch(e){}
  KC.set(v,k);return k}
function sceneExplicit(v){
  if(XC.has(v))return XC.get(v);let x=false;
  try{const m=/^rx:(\d+):(\d+)$/.exec(v||"");
    if(m&&ACAD.RX)x=ACAD.RX.explicitOf(+m[1],+m[2]);
    else{const t=window.SCENE_LIBRARY&&SCENE_LIBRARY.get(v);x=!!(t&&t.out&&t.out.pair&&t.out.pair.explicit)}}catch(e){}
  XC.set(v,x);return x}
/* male or female, for any look or save */
function sexOf(id){
  if(!id)return"";const P=personOf(id);if(P&&P.kind==="boy")return"m";if(P&&(P.kind==="girl"||P.kind==="head"))return"f";
  const t=tpl(id);const c=t&&((t._state&&t._state.c)||t.c);if(c&&c.sex)return c.sex==="male"?"m":"f";
  return/man\d*$/.test(id)?"m":"f"}
/* what the cast is right now */
function castKind(){const p=S.out.pair||{};const n=1+(p.id||p.gm?1:0)+((p.id&&p.more)||[]).filter(m=>m&&m.id).length;
  if(n>=3)return"group";if(n===1)return"solo";
  if(p.gm)return"man";return sexOf(p.id)==="m"||S.c.sex==="male"?"man":"girls"}
/* what the loaded scene was written for */
function currentKind(){const p=S.out.pair;if(!p)return"";
  if(p.arch)return sceneKind("rx:"+p.arch.s+":"+p.arch.v);
  const txt=(p.scene||p.solo||"")+" "+(p.act||"");if(!txt.trim())return"";
  return GRP.test(txt)?"group":GIRLW.test(txt)?"girls":""}

/* ---------- v272: one scene picker for the whole Scene step, filtered by who it is for ---------- */
const SF={kind:"",mood:""};
function pickScene(anchor,opts){opts=opts||{};const L=window.SCENE_LIBRARY;if(!L){say("The scene library isn't available in this version.");return}
  let secs=L.sections();if(opts.archiveOnly)secs=secs.filter(s=>/^Archive: /.test(s.name));
  const fit=castKind();
  const want=it=>{const k=sceneKind(it.v);
    if(SF.kind==="fit"?k!==fit:SF.kind&&k!==SF.kind)return false;
    if(SF.mood){const x=sceneExplicit(it.v);if(SF.mood==="x"?!x:x)return false}
    return true};
  const byName=new Map();secs.forEach(s=>{const nm=s.name.replace(/^Archive: /,"");const it=s.items.filter(want);if(!it.length)return;if(!byName.has(nm))byName.set(nm,[]);byName.get(nm).push(...it)});
  const shown=[...byName].map(([name,items])=>({name,items}));
  const all=secs.reduce((n,s)=>n+s.items.length,0),n=shown.reduce((a,s)=>a+s.items.length,0);
  const re=()=>setTimeout(()=>{try{pickScene(anchor,opts)}catch(e){}},0);
  const chip=(label,on,fn)=>({label,on,fn:()=>{fn();re()}});
  const top=[chip("All",!SF.kind,()=>SF.kind=""),chip("Fits this cast: "+KNAME[fit],SF.kind==="fit",()=>SF.kind="fit")]
    .concat(KINDS.map(([k,l])=>chip(l,SF.kind===k,()=>SF.kind=k)),
      [chip("Any mood",!SF.mood,()=>SF.mood=""),chip("Tender",SF.mood==="t",()=>SF.mood="t"),chip("Explicit",SF.mood==="x",()=>SF.mood="x")]);
  const cur=S.out.pair&&S.out.pair.arch?"rx:"+S.out.pair.arch.s+":"+S.out.pair.arch.v:null;
  openPop(anchor,{title:(opts.title||"Scenes")+" · "+(n===all?all.toLocaleString():n.toLocaleString()+" of "+all.toLocaleString()),
    sections:shown.length?shown:[{name:"",items:[]}],top,current:cur,searchPlaceholder:"Search "+n.toLocaleString()+" scenes",
    onPick:k=>{if(opts.onPick)return opts.onPick(k);const t=L.get(k);if(t)PAIR.applyScene(t)}})}
ACAD.pickScene=pickScene;

/* ---------- v272: the scene and the cast don't match: say so, with a one-click fix ---------- */
function fixFor(want){
  const sg=suggested();
  if(want==="girls"){const x=sg.find(o=>o.v.startsWith("id:")&&sexOf(o.v.slice(3))==="f");return x?{label:"Use "+x.label,sub:x.sub,fn:()=>setC2(x.v.slice(3),null)}:null}
  if(want==="man"){const x=sg.find(o=>o.v.startsWith("gm:")||(o.v.startsWith("id:")&&sexOf(o.v.slice(3))==="m"));
    return x?{label:"Use "+x.label,sub:x.sub,fn:()=>x.v.startsWith("gm:")?setC2("",0,x.v.slice(3)):setC2(x.v.slice(3),null)}:null}
  if(want==="solo")return{label:"Remove character 2",fn:()=>setC2("",0)};
  if(want==="group")return{label:"+ Add a character",fn:()=>addX()};
  return null}
function mismatch(){
  const p=S.out.pair;if(!p)return null;const want=currentKind();if(!want)return null;const have=castKind();
  if(want===have)return null;
  /* a girl in a scene written for a man is fine unless the scene needs a penis (she is then drawn as a futanari) */
  if(want==="man"&&have==="girls"&&!p.penis)return null;
  if(want==="group"&&have!=="solo")return null;   /* a group scene with two still reads */
  const key=(p.arch?p.arch.s+":"+p.arch.v:String(p.scene||"").slice(0,40))+"|"+have;
  if(p.castOk===key)return null;
  const msg=want==="girls"?(have==="man"?"This scene is written for two girls, and character 2 is a man.":"This scene is written for two girls. Pick character 2.")
    :want==="man"?(have==="girls"?"This scene is written for her and a man. Character 2 is a woman, so she will be drawn as a futanari.":"This scene is written for her and a man. Pick character 2.")
    :want==="solo"?"This scene is written for her alone, and it has a character 2."
    :"This scene is written for three or more. Add a character.";
  return{msg,key,fix:fixFor(want)}}

/* ---------- v272: everyone wears the same thing ---------- */
function wearAll(w){
  const p=S.out.pair;
  if(p&&p.id){setC2(p.id,w==="own"?0:w==="scene"&&!p.w2?0:w);(p.more||[]).forEach((m,i)=>{if(m&&m.id)setX(i,m.id,w==="own"?0:w==="scene"&&!p.w2?0:w)})}
  const q=S.out.pair;
  if(S.out.c1look&&tpl(S.out.c1look))setC1(S.out.c1look,w==="scene"&&!(q&&q.w1)?"own":w);
  else{/* character 1 is the studio's own design: add the outfit to her */
    if(w==="nude"){if(!Policy.explicitAllowed()||minor(personOf(c1Look()))){say((Policy.reason&&Policy.reason())||"Nude isn't available for this character.");return}
      mut(()=>{let i=S.outfits.findIndex(o=>/^nude$/i.test(o.name||"")&&!Object.keys(o.items||{}).length);if(i<0){S.outfits.push(newOutfit("Nude"));i=S.outfits.length-1}S.cur=i;
        if(S.out.pair)nudeTags(S.out.pair,"tags1",true);S.out.c1wear="nude"},"castAllNude")}
    else if(w==="scene"&&q&&q.w1){const so=PAIR.sceneOutfit(q.w1,S.c.sex==="male",S);if(so)mut(()=>{so.name=so.name||q.w1.name||"Scene outfit";S.outfits.push(so);S.cur=S.outfits.length-1;S.out.c1wear="scene";if(S.out.pair)nudeTags(S.out.pair,"tags1",false)},"castAllScene")}
    else mut(()=>{const i=S.outfits.findIndex(o=>!/^nude$/i.test(o.name||""));S.cur=i<0?0:i;S.out.c1wear="own";if(S.out.pair)nudeTags(S.out.pair,"tags1",false)},"castAllOwn")}
  say(w==="nude"?"Everyone is nude.":w==="scene"?"Everyone is in the scene's outfits.":"Everyone is in their own looks.")}
function pickWearAll(b){const p=S.out.pair||{};
  openPop(b,{title:"Everyone wears",noSearch:true,sections:[{name:"",items:[
    p.w1||p.w2?{v:"scene",label:"The scene's outfits",sub:(p.w1||p.w2).name||""}:null,
    {v:"nude",label:"Nude",sub:"Anyone under 18 by her biography stays dressed"},
    {v:"own",label:"Their own looks",sub:"Each one's first outfit"}].filter(Boolean)}],onPick:wearAll})}

/* ---------- v272: same scene, the next girl; a random scene for this cast ---------- */
function girlList(){return(ACAD.HOUSES||[]).filter(h=>tpl(h+"robes")&&!(ACAD.isMinor&&ACAD.isMinor(h)))}
function stepGirl(d){
  const G=girlList();if(!G.length)return;
  const P=personOf(c1Look());let i=G.indexOf(P&&P.kind==="girl"?P.h:"");if(i<0)i=d>0?-1:0;
  const nh=G[(i+d+G.length)%G.length];
  const p=S.out.pair,wear=c1Wear(),w2=p&&p.id?p.outfit:null;
  if(p&&p.arch&&ACAD.RX){
    /* the scene is rebuilt around her: her room, her title, and the partner it is written for, from her own relationships */
    ACAD.RX.loadWith(p.arch.s,p.arch.v,nh);
    if(wear==="nude"||wear==="scene")setC1(nh+"robes",wear);
    const q=S.out.pair;if(q&&q.id&&w2==="nude")setC2(q.id,"nude")}
  else if(p)setC1(nh+"robes",typeof wear==="number"?"own":wear);
  else setC1(nh+"robes","own");
  say("Same scene: "+HN(nh))}
function shuffle(){
  const L=window.SCENE_LIBRARY;if(!L)return;const fit=castKind(),ok=Policy.explicitAllowed();
  const want=SF.mood;
  const items=L.sections().flatMap(s=>s.items).filter(it=>!it.dis&&sceneKind(it.v)===fit&&(!want||(want==="x"?sceneExplicit(it.v):!sceneExplicit(it.v)))&&(ok||!sceneExplicit(it.v)));
  if(!items.length){say("No scene fits this cast.");return}
  const it=items[Math.floor(Math.random()*items.length)];const t=L.get(it.v);if(t){PAIR.applyScene(t);say(it.label)}}

/* ---------- v272: pose and expression from the Cast card (the Pre-made sentences pickers) ---------- */
function poseBtn(n){if(!ACAD.SB||!ACAD.SB.poseExprPop)return null;
  return btn("Pose…",b=>{try{ACAD.SB.poseExprPop(b,n)}catch(e){say("Pick a scene first.")}},"Pose and expression for character "+n)}

/* ---------- v272: the cards below Cast fold to a one-line summary ---------- */
const FOLD_KEY="everspire.scopen";
let OPEN=null;
function openSet(){if(OPEN)return OPEN;try{OPEN=new Set(JSON.parse(localStorage.getItem(FOLD_KEY)||"[]"))}catch(e){OPEN=new Set()}return OPEN}
function saveOpen(){try{localStorage.setItem(FOLD_KEY,JSON.stringify([...openSet()]))}catch(e){}}
const TOKW={partner:"the partner",lover:"her lover",his:"their",he:"they",him:"them",cock:"penis"};
const short=(s,n)=>{s=String(s||"").replace(/\{(partner|lover|his|he|him|cock)\}/gi,(m,k)=>TOKW[k.toLowerCase()]).replace(/\{[@#]?\w+\}/g,"").replace(/\s+/g," ").trim();return s.length>n?s.slice(0,n-1).replace(/\s+\S*$/,"")+"…":s};
function summaryOf(key){const p=S.out.pair||{};
  switch(key){
    case"Characters":return"Advanced: the full character lists, each one's expression and tags.";
    case"Scene":{const t=String(p.solo&&!p.id?p.solo:p.scene||"").replace(/^Setting: [^.]+\.\s*/,"");return t?short(t,140):"No scene text yet."}
    case"Action":{const a=String(p.act||"").split(",").map(x=>x.trim()).filter(Boolean);return a.length?short(a.join(", "),120):"No action tags yet."}
    case"Text and sound":{const n=(p.texts||p.tx||[]).length||0;return n?n+" on the image.":"No headlines, speech or sound effects."}
    case"Pre-made sentences":return p.arch&&ACAD.RX&&ACAD.RX.SETS[p.arch.s]?"From the archive: "+ACAD.RX.SETS[p.arch.s].name+". Change its sentences, setting and details here.":"Ready-made sentences, settings, poses and outfits to add.";
    case"Prompt":return"Image model, compact tags, and the action and tags as text.";
    default:return""}}
function foldCards(){const ed=document.getElementById("sceneEditor");if(!ed)return;const O=openSet();
  if(!ed.dataset.fold){ed.dataset.fold="1";
    ed.addEventListener("click",e=>{const h3=e.target.closest(".scfold>h3,.scfold>.scsum");if(!h3||!ed.contains(h3))return;toggle(h3.parentNode)});
    ed.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const h3=e.target.closest(".scfold>h3");if(!h3)return;e.preventDefault();toggle(h3.parentNode)})}
  [...ed.querySelectorAll(":scope>.scsec")].forEach(sec=>{if(sec===SEC)return;const h3=sec.querySelector(":scope>h3");if(!h3)return;
    const key=h3.textContent.trim();sec.classList.add("scfold");sec.dataset.k=key;
    h3.tabIndex=0;h3.setAttribute("role","button");
    const on=O.has(key);sec.classList.toggle("open",on);h3.setAttribute("aria-expanded",on?"true":"false");
    let sum=sec.querySelector(":scope>.scsum");if(!sum){sum=E("p",{class:"scsum"});h3.after(sum)}
    const t=summaryOf(key);if(sum.textContent!==t)sum.textContent=t})}
function toggle(sec){const O=openSet(),k=sec.dataset.k;if(O.has(k))O.delete(k);else O.add(k);saveOpen();foldCards();
  if(O.has(k))try{sec.scrollIntoView({block:"nearest"})}catch(e){}}
function openCard(key){const O=openSet();O.add(key);saveOpen();foldCards();const sec=document.querySelector('#sceneEditor>.scsec[data-k="'+key+'"]');if(sec)try{sec.scrollIntoView({block:"start",behavior:"smooth"})}catch(e){}}

/* ---------- the card ---------- */
const E=(t,a,...k)=>h(t,a||{},...k);
const SEC=E("section",{class:"scsec castsec",id:"castBox"});
const css=document.createElement("style");css.textContent=
  ".castsec .castscene{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}"+
  ".castsec .castscene .nm{font-weight:600;font-size:14px;min-width:0;overflow:hidden;text-overflow:ellipsis}"+
  ".castsec .castrows{display:flex;flex-direction:column;gap:8px}"+
  ".castsec .castrow{display:grid;grid-template-columns:2.2em 34px minmax(0,1fr) auto;gap:8px;align-items:center;border:1px solid var(--rule);border-radius:10px;padding:8px 10px}"+
  ".castsec .castrow .no{font-weight:700;color:var(--muted);font-size:13px}"+
  ".castsec .castrow .av{width:32px;height:32px;image-rendering:pixelated;border-radius:6px;background:var(--chip,rgba(127,127,127,.12))}"+
  ".castsec .castrow .who{display:flex;flex-direction:column;min-width:0}.castsec .castrow .who b{font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
  ".castsec .castrow .who small{color:var(--muted);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"+
  ".castsec .castrow .acts{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}"+
  ".castsec .castfoot{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}"+
  ".castsec .castguide{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 12px;padding:0;list-style:none;counter-reset:cg}"+
  ".castsec .castguide li{border:1px dashed var(--rule);border-radius:10px;padding:8px 10px;font-size:13px;counter-increment:cg}.castsec .castguide li::before{content:counter(cg);font-weight:700;margin-right:6px;color:var(--accent,inherit)}"+
  ".castsec .castwarn{display:flex;flex-wrap:wrap;gap:8px;align-items:center;border:1px solid var(--accent,#c80);background:rgba(200,136,0,.08);border-radius:10px;padding:8px 10px;margin:0 0 12px;font-size:13px}.castsec .castwarn span{flex:1 1 220px;min-width:0}"+
  ".castsec .castfoot .sep{flex:1 1 auto}.castsec .girlnav{display:flex;gap:8px}"+
  ".scfold>h3{cursor:pointer;display:flex;align-items:center;gap:8px;user-select:none}.scfold>h3::after{content:'▸';margin-left:auto;font-size:.85em;color:var(--muted);transition:transform .15s}.scfold.open>h3::after{transform:rotate(90deg)}"+
  ".scfold>.scsum{margin:2px 0 0;color:var(--muted);font-size:13px;cursor:pointer;overflow-wrap:anywhere}.scfold.open>.scsum{display:none}"+
  ".scfold:not(.open)>:not(h3):not(.scsum){display:none!important}"+
  ".pop .opt .pth{width:30px;height:30px;border-radius:50%;object-fit:cover;flex:none;background:rgba(127,127,127,.12)}"+
  ".castsec{container-type:inline-size}@container (max-width:540px){.castsec .castrow{grid-template-columns:1.6em 30px minmax(0,1fr)}.castsec .castrow .acts{grid-column:1/-1;justify-content:flex-start}}"+
  "@media (max-width:560px){.castsec .castguide{grid-template-columns:1fr}.castsec .castrow{grid-template-columns:1.6em 30px minmax(0,1fr)}.castsec .castrow .acts{grid-column:1/-1;justify-content:flex-start}}";
document.head.append(css);
const btn=(label,fn,title)=>E("button",{type:"button",class:"btn sm",title:title||null,onclick:e=>fn(e.currentTarget)},label);
function avatar(P){try{if(P&&P.h&&window.ENC&&ENC.pixel){const im=ENC.pixel(P.h,32);im.classList.add("av");return im}}catch(e){}return E("span",{class:"av"})}
function wearLabel(id,w,n){const p=S.out.pair||{};
  if(w==="scene")return"The scene's outfit"+((n===1?p.w1:p.w2)&&(n===1?p.w1:p.w2).name?": "+(n===1?p.w1:p.w2).name:"");
  if(w==="nude")return"Nude";if(w==="none")return"No outfit text";
  const t=tpl(id);const names=t?outfitNames(t):[];const i=typeof w==="number"?w:0;
  return lookName(id)+(names.length>1?": "+(names[i]||names[0]):"")}
function row(n,id,w,gm){
  const P=gm?null:personOf(id);
  const name=gm?(gm==="pov"?"Faceless man, his point of view":"Faceless man"):P?P.name:(n===1?(S.name||"This design"):"No one");
  const sub=gm?"Written into the base prompt":id?wearLabel(id,w,n):(n===2?"A solo shot. Pick someone to make it a scene.":"");
  const acts=E("div",{class:"acts"},
    btn("Who…",b=>pickWho(b,n,nid=>{if(n===1)setC1(nid,"own");else if(n===2)setC2(nid,null);else setX(n-3,nid,null)}),"Choose who character "+n+" is"),
    id&&!gm?btn("Wearing…",b=>pickWear(b,n,id,w),"Choose what character "+n+" wears"):null,
    (n<=2&&S.out.pair&&(id||gm||n===1))?poseBtn(n):null,
    n>2?btn("Remove",()=>dropX(n-3)):null);
  return E("div",{class:"castrow"},E("span",{class:"no",text:String(n)}),avatar(P),
    E("div",{class:"who"},E("b",{text:name+(P&&P.sub&&P.kind==="girl"?"":"")}),E("small",{text:(P&&P.kind!=="girl"&&P.sub?P.sub+" · ":"")+sub})),acts)}
function sceneName(){const p=S.out.pair;if(!p)return"";
  if(p.arch&&ACAD.RX){const s=ACAD.RX.SETS[p.arch.s];if(s)return s.name+(s.n>1?" "+(p.arch.v+1):"")}
  return p.scene||p.solo?"Your own scene":""}
function render(){
  if(!SEC.isConnected)return;if(SEC.contains(document.activeElement)&&document.activeElement.tagName==="INPUT")return;
  const p=S.out.pair;SEC.textContent="";
  SEC.append(E("h3",{text:"Cast"}),
    E("p",{class:"scnote",text:"The quick way: pick a scene, then who is in it and what each of them wears. Everything below fine-tunes the same scene."}));
  const nm=sceneName();
  SEC.append(E("div",{class:"castscene"},
    btn(nm?"Change the scene…":"Choose a scene…",b=>pickScene(b)),
    nm?btn("Shuffle",()=>shuffle(),"A random scene written for this cast"):null,
    nm?E("span",{class:"nm",text:nm}):E("span",{class:"muted small",text:"No scene yet. You can also pick the characters first."})));
  if(!nm&&!(p&&(p.id||p.gm)))SEC.append(E("ol",{class:"castguide"},
    E("li",{text:"Choose a scene: filter by who it is for, or search."}),
    E("li",{text:"Who… for each character: any girl, boy, headmistress or your saves."}),
    E("li",{text:"Wearing…: the scene's outfit, Nude, or any of their looks."})));
  const mm=mismatch();
  if(mm)SEC.append(E("div",{class:"castwarn",role:"status"},E("span",{text:mm.msg}),
    mm.fix?btn(mm.fix.label,()=>mm.fix.fn(),mm.fix.sub||null):null,
    btn("Keep it",()=>mut(()=>{if(S.out.pair)S.out.pair.castOk=mm.key},"castOk"),"Hide this note for this scene")));
  const rows=E("div",{class:"castrows"});
  rows.append(row(1,c1Look(),c1Wear()));
  rows.append(row(2,p&&p.id||"",p?p.outfit:0,p&&!p.id?p.gm:null));
  ((p&&p.id&&p.more)||[]).forEach((m,i)=>rows.append(row(3+i,m.id,m.outfit)));
  SEC.append(rows,E("div",{class:"castfoot"},
    p&&p.id&&2+(p.more||[]).length<MAXC?btn("+ Add a character",()=>addX()):null,
    p&&p.id?btn("Swap 1 and 2",()=>swap(),"Character 2 becomes character 1 and the other way round"):null,
    p&&(p.id||p.gm)?btn("Everyone wears…",b=>pickWearAll(b),"The scene's outfits, nude, or their own looks, for the whole cast"):null,
    E("span",{class:"sep"}),
    E("span",{class:"girlnav"},btn("◀ Previous girl",()=>stepGirl(-1),"The same scene with the previous girl as character 1"),
    btn("Next girl ▶",()=>stepGirl(1),"The same scene with the next girl as character 1, and the partner written for her"))))}
function place(){const ed=document.getElementById("sceneEditor");if(!ed)return;const first=[...ed.querySelectorAll(":scope>.scsec")].find(x=>x!==SEC);
  if(first&&SEC.nextElementSibling!==first)first.before(SEC);else if(!first&&SEC.parentNode!==ed)ed.append(SEC)}
{const rs=renderSide;renderSide=function(){rs();try{place();render()}catch(e){try{console.warn("[cast] "+e)}catch(_){}}try{foldCards()}catch(e){try{console.warn("[fold] "+e)}catch(_){}}}}
try{place();render();foldCards()}catch(e){}
/* v272: a scene can be the starting point. The first step offers it, and the Scene step opens on the Cast card. */
function sceneStart(){
  try{goStep("scene")}catch(e){return}
  setTimeout(()=>{const b=SEC.querySelector(".castscene .btn");if(b&&!(S.out.pair&&(S.out.pair.arch||S.out.pair.scene)))pickScene(b)},60)}
ACAD.sceneStart=sceneStart;
if(typeof renderMain==="function"){const rm=renderMain;renderMain=function(){rm.apply(this,arguments);
  try{if(typeof step==="undefined"||step!==((window.STEPS&&STEPS[0]&&STEPS[0].id)||"concept"))return;
    const body=document.querySelector("#stepView .stepbody");if(!body||body.querySelector(".scstart"))return;
    body.prepend(E("div",{class:"scstart callout"},E("span",{text:"Making a scene? Skip the design steps: pick a scene, who is in it and what they wear."}),
      E("button",{type:"button",class:"btn sm primary",onclick:sceneStart},"Make a scene →")))}catch(e){}}}
{const st=document.createElement("style");st.textContent=".scstart{display:flex;flex-wrap:wrap;gap:8px 12px;align-items:center;justify-content:space-between;margin:0 0 14px}.scstart span{flex:1 1 240px;min-width:0}";document.head.append(st)}
window.CASTQ={setC1,setC2,setX,addX,swap,personOf,looksOf,index,render,sceneKind,castKind,currentKind,mismatch,wearAll,stepGirl,shuffle,pickScene,foldCards,openCard,sexOf};
})();
