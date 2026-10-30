/* hoisted: top-level function declarations and var names, so every file can call them from the start */
function itemTiers(field,o){return Policy.tiers(o,o.t||"CUSL")}
function compose(){
  const r=Policy.view(composeRaw);
  Policy.notices().forEach(n=>r.checks.push(n));
  r.blocked=!Policy.explicitAllowed();
  r.banner=Policy.banner();
  return r;
}
function kindOf(field,value){const rules=KIND_RULES[field];if(!rules)return"";const v=value.toLowerCase();for(const [k,rx] of rules)if(rx.test(v))return k;return""}
function parseOpt(field,value){
  const v=String(value||"").toLowerCase();let cls="";
  for(const [k,rx] of FABRIC_CLASSES)if(rx.test(v)){cls=k;break}
  return{kind:kindOf(field,value),cls,youth:Policy.isYouthText(value)};
}
function withArticle(p){
  p=String(p||"").trim();if(!p)return"";
  if(/^(a|an|the|no|one|some|two|multiple|both)\s/i.test(p))return p;
  const head=p.replace(/,\s+and\s/g,", ").split(/\s(?:with|around|over|under|tied|worn|in|of|on|at|from|and)\s/i)[0];
  if(PLURAL_RX.test(head)||(/s$/i.test(head)&&!/(ss|us|is)$/i.test(head))||/(teeth|antennae)$/i.test(head))return p;
  return (/^[aeiou]/i.test(p)&&!/^(uni|use|usu|u-|eu)/i.test(p)?"an ":"a ")+p;
}
function joinNatural(a){a=a.filter(Boolean);if(!a.length)return"";if(a.length===1)return a[0];if(a.length===2)return a[0]+" and "+a[1];return a.slice(0,-1).join(", ")+", and "+a[a.length-1]}
function newOutfit(name){return{name:name||"Outfit",look:"",cover:"",season:"",showUnder:false,items:{},details:{},dcol:{}}}
function blankState(){
  return{v:1,name:"Untitled character",pal:{primary:"",secondary:"",third:"",accent:"",extra:""},c:{},outfits:[newOutfit("Outfit 1")],cur:0,
    out:{mode:"full",model:"v5",coverMatch:true,compact:false,sheet:false,explicit:false,lewdtag:false,wfmt:"numeric",style:"studio",palName:"",repeatBody:false,auto:true,framing:"cowboy shot",must:"",avoid:"",notes:""},
    layers:{},order:LAYER_DEFS.map(d=>d[0])};
}
function loadJSON(k,fb){try{const t=localStorage.getItem(k);return t?JSON.parse(t):fb}catch(e){return fb}}
function saveJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}}
function normalize(st){
  const b=blankState();st=st&&typeof st==="object"?st:{};
  const o={...b,...st,pal:{...b.pal,...(st.pal||{})},c:{...(st.c||{})},out:{...b.out,...(st.out||{})},layers:{...(st.layers||{})}};
  o.outfits=(Array.isArray(st.outfits)&&st.outfits.length?st.outfits:b.outfits).map(x=>({...newOutfit(),...x,items:{...(x.items||{})},details:{...(x.details||{})},dcol:{...(x.dcol||{})}}));
  o.cur=Math.min(Math.max(0,+st.cur||0),o.outfits.length-1);
  o.outfits.forEach(x=>{if(x.lock&&typeof x.lock==="object"&&!Array.isArray(x.lock)){const m={};Object.keys(x.lock).forEach(k=>{if(x.lock[k])m[k]=true});if(Object.keys(m).length)x.lock=m;else delete x.lock}else delete x.lock});
  {const m={},add=src=>{if(src&&typeof src==="object"&&!Array.isArray(src))Object.keys(src).forEach(k=>{if(src[k])m[k]=true})};
    add(st.lock);if(st.palLock&&typeof st.palLock==="object")Object.keys(st.palLock).forEach(k=>{if(st.palLock[k])m["pal:"+k]=true});
    delete o.palLock;if(Object.keys(m).length)o.lock=m;else delete o.lock}
  const ids=LAYER_DEFS.map(d=>d[0]);o.order=(Array.isArray(st.order)?st.order.filter(i=>ids.includes(i)):[]);ids.forEach(i=>{if(!o.order.includes(i))o.order.push(i)});
  return o;
}
function mut(fn,key){
  const before=JSON.stringify(S);fn();enforce();const after=JSON.stringify(S);
  if(before!==after){
    if(!(key&&key===lastKey&&Date.now()-lastT<1500)){UNDO.push(before);if(UNDO.length>80)UNDO.shift();REDO.length=0}
    lastKey=key||"";lastT=Date.now();changed();
  }
}
function undo(){if(!UNDO.length)return;REDO.push(JSON.stringify(S));S=normalize(JSON.parse(UNDO.pop()));lastKey="";changed()}
function redo(){if(!REDO.length)return;UNDO.push(JSON.stringify(S));S=normalize(JSON.parse(REDO.pop()));lastKey="";changed()}
function flushSave(){clearTimeout(saveTimer);saveJSON(KEY_AUTO,S)}
function changed(){hooks.change();clearTimeout(saveTimer);saveTimer=setTimeout(flushSave,200)}
function replaceState(st,label){UNDO.push(JSON.stringify(S));if(UNDO.length>80)UNDO.shift();REDO.length=0;S=normalize(st);enforce();lastKey="";changed()}
function rc(v){if(!v)return"";if(v[0]==="@"&&v.includes("+"))return joinNatural(v.split("+").map(x=>x[0]==="@"?(S.pal[x.slice(1)]||""):x).filter(Boolean));if(v[0]==="@")return S.pal[v.slice(1)]||"";return v}
function subjectNoun(){
  const sp=(S.c.subjectType||"").trim(),[noun,adj]=AGE_NOUN[ageKey()]||[isMale()?"man":"woman",""],pre=adj?adj+" ":"";
  if(!sp)return pre+noun;
  const type=(SPECIES_INFO[sp]||{type:"word"}).type;
  if(isMale())return maleSubjectNoun(sp,type,noun,pre);
  if(type==="hyphen")return pre+sp+"-"+noun;
  if(type==="word")return pre+sp+" "+noun;
  return Policy.girlAge()?pre+sp+" girl":pre+sp;
}
function traitValue(id){const v=S.c[id];if(v==="none")return"";const r=(v==null||v==="")?((AUTO_TRAITS[subjectKey()]||{})[id]||""):v;return String(r).indexOf("{c}")>=0?skinTok(rc(String(r)),g(id+"Color")||rc((AUTO_TRAITS[subjectKey()]||{})[id+"Color"]||"")):r}
function autoTrait(id){return(AUTO_TRAITS[subjectKey()]||{})[id]||""}
function animalLevel(){const lv=S.c.animalForm||"";return /^light/i.test(lv)?"light":/^moderate/i.test(lv)?"moderate":/^full/i.test(lv)?"full":""}
function fullBeast(){return animalLevel()==="full"&&!!ANIMALS.species[subjectKey()]}
function autoBodyForm(){const k=subjectKey();return SUBJECT_FORMS[k]||(fullBeast()&&BEAST_FORMS[k])||""}
function activeBodyForm(){
  let v=S.c.bodyForm;if(v==="none")return null;if(v==null||v==="")v=autoBodyForm();if(!v)return null;
  return{...(BODY_FORMS[v]||{s:`Special body form: ${v}.`}),key:v};
}
function optionList(field){
  const base=(CHAR[field]||[]).filter(([v])=>Policy.optionAllowed(field,v)&&sexOk(field,v,isMale())).map(([v,gr])=>({v,g:(isMale()&&MALE_GROUP[gr])||gr||""}));
  const mine=(CUSTOM[field]||[]).filter(v=>!base.some(o=>o.v===v)&&Policy.optionAllowed(field,v)).map(v=>({v,g:"My options"}));
  return base.concat(mine);
}
function findItem(field,v){return(OUTFIT[field]||[]).find(o=>o.v===v)||null}
function customOutfit(field){return(CUSTOM["o:"+field]||[])}
function paletteLinks(){const used={};const scan=v=>{if(typeof v==="string"&&v[0]==="@")v.split("+").forEach(x=>{if(x[0]==="@")used[x.slice(1)]=(used[x.slice(1)]||0)+1})};Object.values(S.c).forEach(scan);S.outfits.forEach(o=>Object.values(o.items).forEach(it=>scan(it.c)));return used}
function enforce(){
  const notes=Policy.enforce();pruneLocks();
  if(notes.length)hooks.toast(notes[0]+(notes.length>1?` (+${notes.length-1} more)`:""));
}
function paletteSentence(who){
  const uniq=a=>a.filter((c,i)=>c&&a.findIndex(x=>x.toLowerCase()===c.toLowerCase())===i);
  const main=uniq(["primary","secondary","third"].map(k=>S.pal[k]));
  const acc=uniq(["accent","extra"].map(k=>S.pal[k]));
  const W=who||cap(subjectPhrase());
  const verb=who?"uses":"has";
  if(main.length&&acc.length)return `${W} ${verb} ${anA(main[0])} ${joinNatural(main)} color palette, accented by ${joinNatural(acc)}.`;
  if(main.length)return `${W} ${verb} ${anA(main[0])} ${joinNatural(main)} color palette.`;
  if(acc.length)return `${W} is accented by ${joinNatural(acc)}.`;
  return"";
}
function identitySentence(){
  if(!S.c.subjectType&&!S.c.age)return"";const s=cap(subjectPhrase());
  if(CK.compact)return paletteSentence()?"":`${s}.`;
  if(!S.c.subjectType)return Policy.girlAge()?`${s} is cute, adorable, beautiful, and attractive.`:`${s} is ${isMale()?"handsome, well-groomed, and attractive":"elegant, beautiful, and attractive"}.`;
  return `${s} has a distinctive, cohesive appearance that reflects her character type.`;
}
function speciesSentence(){
  const bf=activeBodyForm(),ids=TRAIT_FIELDS.filter(i=>!(i==="tailStyle"&&bf&&bf.tail));
  const vals=ids.map(traitValue).filter(Boolean).map(withArticle);if(!vals.length)return"";
  const color=g("fantasyAccentColor");
  return `${cap(subjectPhrase())} has ${joinNatural(vals)}${color?`, with ${color} accents`:""}.`;
}
function animalSentence(){
  const m=animalLevel();if(!m)return"";
  const key=subjectKey(),sp=ANIMALS.species[key];
  if(!sp){note("info","Animal transformation is skipped because this subject isn’t an animal type.",{label:"Clear it",fn:()=>mut(()=>{delete S.c.animalForm;delete S.c.animalPattern})});return""}
  const fam=ANIMALS.families[sp.family],Sx=cap(subjectPhrase());
  const c=S.pal.primary||"",c2=S.pal.secondary||S.pal.accent||"";
  const fill=t=>t.replace(/\{c2\}\s?/g,c2?c2+" ":"").replace(/\{c\}\s?/g,c?c+" ":"").replace(/\ba\s+(?!eu|uni|use|one)(?=[aeiou])/gi,"an ").replace(/\b(\w+) \1\b/gi,"$1");
  let pat="";const pv=S.c.animalPattern||"";
  if(pv==="auto")pat=sp.patterns.length?sp.patterns[0]:"";else if(GENERIC_PAT[pv.toLowerCase()])pat=GENERIC_PAT[pv.toLowerCase()];else if(pv)pat=pv;
  pat=pat?fill(pat):"";
  if(m==="light")return `${Sx} has ${fill(fam.light)}${pat?`, marked with ${pat}`:""}.`;
  if(m==="moderate")return `${Sx} has ${fill(fam.cov)}, ${fam.snoutM}, and ${fam.limbM}${pat?`, marked with ${pat}`:""}.`;
  return `${Sx} has a full beast-like anthropomorphic ${(S.c.subjectType||key).replace(/-girl$| woman$/,"")} form, with ${fill(fam.cov).replace(/covering her arms and (legs|shoulders)/,"covering her whole body")}, ${fam.snoutF}, and ${fam.limbF}${pat?`, marked with ${pat}`:""}.`;
}
function eyesSentence(){
  const Sx=cap(subjectPhrase()),pieces=["eyeShape","scleraStyle","pupilStyle","irisDetail"].map(id=>id==="scleraStyle"?skinTok(g(id),g("scleraColor")):g(id)).filter(Boolean);
  const strip=v=>(v||"").replace(/\s*eye$/i,"");
  const one=strip(g("eyeOne")),two=strip(g("eyeTwo")),cfg=S.c.eyeConfig||"",sent=[];
  const lashN=g("lashNatural");
  if(pieces.length&&!CK.compact)sent.push(`${Sx} has ${joinNatural(pieces)}${lashN?`, framed by ${lashN}`:""}.`);
  else if(pieces.length)sent.push(pieces.join(", ")+(lashN?", "+lashN:"")+".");
  else if(lashN)sent.push(CK.compact?lashN+".":`${Sx} has ${lashN}.`);
  const A=one||two,B=two||one,same=!one||!two||one.toLowerCase()===two.toLowerCase(),both=`Both eyes are ${A}.`;
  if(A){switch(cfg){
    case "luminous matching":sent.push(`Both eyes are a luminous ${A}.`);break;
    case "softly mismatched":sent.push(same?both:`Her eyes are subtly mismatched: her right eye is ${one} and her left eye is ${two}.`);break;
    case "mystically mismatched":sent.push(same?both:`Her eyes are mystically mismatched: her right eye glows ${one} and her left eye glows ${two}.`);break;
    case "gradient-tinted":sent.push(same?both:`Both irises fade from ${one} at the pupil to ${two} at the outer edge.`);break;
    case "ringed heterochromia":sent.push(same?both:`Both irises are ${one} with a distinct ${two} ring around the outer edge.`);break;
    case "sectoral heterochromia":sent.push(same?both:`Both irises are mostly ${one}, each with ${withArticle(two)} wedge-shaped sector.`);break;
    case "heterochromatic":sent.push(same?both:`She has heterochromia: her right eye is ${one} and her left eye is ${two}.`);break;
    default:sent.push(same?both:`Her right eye is ${one} and her left eye is ${two}.`);
  }}
  return sent.join(" ");
}
function faceSentence(){
  const f=["browShape","noseShape","mouthShape","faceMark"].map(g).map(withArticle).filter(Boolean),out=[];
  if(CK.compact){return [g("faceShape"),g("expression"),g("impression"),...f,facialHairText()].filter(Boolean).join(", ")+(g("faceShape")||g("expression")||g("impression")||f.length||facialHairText()?".":"")}
  if(f.length)out.push(`Her face features ${joinNatural(f)}.`);
  if(g("faceShape"))out.push(`She has ${withArticle(g("faceShape"))}.`);
  if(g("expression"))out.push(`She has ${withArticle(g("expression"))}.`);
  if(g("impression"))out.push(`Her overall impression is ${g("impression")}.`);
  if(facialHairText())out.push(`She has ${facialHairText()}.`);
  return out.join(" ");
}
function styleProfile(st){
  const t=(st||"").toLowerCase(),p={};if(!t)return p;const longW=/\blong\b/.test(t.replace(/\bwith long [a-z ]*?(strands|sidelocks|pieces)\b/g,""));
  if(/\b(pixie|bixie|buzz(ed)?|bowl cut|lob|crop|crew cut|ivy league cut|flat top|high and tight|fade|faux hawk|mohawk|quiff|pompadour|comb-over|spiky|waves haircut|classic side part)\b|\bbob\b|\bshort\b/.test(t))p.range=longW?[2,4]:[0,3];
  else if(longW||/\b(hime|princess)\b/.test(t))p.range=[3,8];
  else if(/\b(bun|buns|updo|chignon|ponytails?|twin tails|twintails|pigtails?|braids?|braided|twist|top knot|odango)\b/.test(t))p.range=[2,8];
  p.tied=/\b(bun|buns|updo|chignon|top knot|odango)\b/.test(t)&&!/half-up|half-down/.test(t);
  p.tex=/straight/.test(t)?"straight":/\bcurl(y|s)?\b/.test(t)?"curly":/\bwav(y|es)\b/.test(t)?"wavy":null;return p;
}
function moveBlocked(st,ln,mv,lenDropped){
  if(!mv)return false;const p=styleProfile(st);
  if(p.tied&&(LONG_REACH.test(mv)||FALLING.test(mv)))return"tied";
  let rk=lenRank(ln);if((lenDropped||rk===null)&&p.range)rk=(p.range[0]+p.range[1])/2;
  if(LONG_REACH.test(mv)&&rk!==null&&rk<4)return"short";return false;
}
function hairIssues(){
  const sty=g("hairStyle"),len=g("hairLength"),tex=g("hairTexture"),mv=g("hairMovement"),r={};
  const clear=(id)=>({label:`Clear ${id==="hairLength"?"length":id==="hairTexture"?"texture":"movement"}`,fn:()=>mut(()=>{delete S.c[id]})});
  if(sty&&len&&!lenFits(sty,len)){r.dropLen=true;note("warn",`Hair length “${len}” conflicts with “${sty}”, which already sets the length. ${CK.auto?"Left out of the prompt.":"Kept as you set it."}`,clear("hairLength"))}
  if(sty&&tex&&texConflict(sty,tex)){r.dropTex=true;note("warn",`Hair texture “${tex}” conflicts with “${sty}”. ${CK.auto?"Left out of the prompt.":"Kept as you set it."}`,clear("hairTexture"))}
  const mb=moveBlocked(sty,len,mv,r.dropLen);
  if(mb){r.dropMove=true;note("warn",mb==="tied"?`Hair movement doesn’t fit “${sty}”, which is tied up. ${CK.auto?"Left out.":"Kept."}`:`Hair movement “${mv}” needs longer hair than this. ${CK.auto?"Left out.":"Kept."}`,clear("hairMovement"))}
  if(!CK.auto){r.dropLen=r.dropTex=r.dropMove=false}
  r.sty=sty;r.len=r.dropLen?"":len;r.tex=r.dropTex?"":tex;r.mv=r.dropMove?"":mv;return r;
}
function hairSentence(){
  const hi=hairIssues(),Sx=cap(subjectPhrase()),out=[],bangs=g("bangs");
  if(CK.compact){
    const t=[hi.len,hi.tex,hi.sty,bangs].filter(Boolean);
    const byC=colorGroups();if(byC.length)t.push(...byC.map(({c,labels})=>`${c} hair${labels[0]==="base"?"":" "+joinNatural(labels)}`));if(g("hairBlend"))t.push(g("hairBlend"));
    return t.length?t.join(", ")+".":"";
  }
  const nounTex=hi.tex&&/(waves|curls|coils)$/i.test(hi.tex)?hi.tex:"";
  const lead=[hi.len,nounTex?"":hi.tex].filter(Boolean),withTex=nounTex?`, with ${nounTex}`:"";
  if(hi.sty)out.push(/\bhair$/i.test(hi.sty)?`${Sx} has ${[...lead,hi.sty].join(", ")}${withTex}.`:`${Sx} has ${lead.length?lead.join(", ")+" hair":"hair"} styled as ${withArticle(hi.sty)}${withTex}.`);
  else if(lead.length||nounTex)out.push(`${Sx} has ${lead.length?lead.join(", ")+" hair":"hair"}${withTex}.`);
  if(bangs)out.push(`She has ${withArticle(bangs)}.`);
  if(hi.mv)out.push(`Her hair ${hi.mv}.`);
  const items=colorGroups().map(({c,labels})=>`${c} ${joinNatural(labels)}`),blend=g("hairBlend");
  if(items.length){const base=g("hairBase"),hl=g("hairHighlights"),grad=!blend&&base&&hl&&base.toLowerCase()!==hl.toLowerCase();out.push(`Her hair features ${joinNatural(items)}${grad?`, with blended ${base} and ${hl} gradient streaks`:""}.`)}
  if(blend)out.push(`Her hair has ${blend}.`);
  return out.join(" ");
}
function colorGroups(){
  const by=new Map();
  [["hairBase","base"],["hairUnderlayer","underlayer"],["hairInner","inner sections"],["hairHighlights","highlights"]].forEach(([id,label])=>{const c=g(id);if(!c)return;const k=c.toLowerCase();if(!by.has(k))by.set(k,{c,labels:[]});by.get(k).labels.push(label)});
  return[...by.values()];
}
function poseAction(p){return !!p&&/^(\w+ing|curled|propped)\b/i.test(p)&&!/(posture|stance|glance|pose)$/i.test(p)}
function bodySentence(){
  const Sx=cap(subjectPhrase()),s=[],size=g("bustSize"),shape=g("bustShape"),weight=g("bustWeight");
  const bf=activeBodyForm(),noLeg=!!(bf&&(bf.noLegs||bf.dropLegs))||fullBeast();
  if(CK.compact){
    const t=[size,g("heightStature"),withArticle(g("torsoShape")),withArticle(g("armShape")),g("handShape")?(/\b(hands?|fingers)$/i.test(g("handShape"))?g("handShape"):g("handShape")+" hands"):"",withArticle(g("waistShape")),withArticle(g("stomachShape")),g("hipShape"),noLeg?"":withArticle(g("buttSize")),noLeg?"":g("thighBuild"),withArticle(g("bodySoftness")),g("bodyHair"),g("bodyMarkings")].filter(v=>v&&v!=="a ");
    if(bf)t.push(bf.key);return t.length?t.join(", ")+".":"";
  }
  const extra=[shape&&withArticle(shape),weight].filter(Boolean);
  if(size)s.push(`${Sx} has ${withArticle(size)}${extra.length?` with ${joinNatural(extra)}`:""}.`);else if(extra.length)s.push(`${Sx} has ${joinNatural(extra)}.`);
  const rest=[g("heightStature"),g("shoulderShape"),withArticle(g("torsoShape")),withArticle(g("armShape")),g("handShape")?(/\b(hands?|fingers)$/i.test(g("handShape"))?g("handShape"):g("handShape")+" hands"):"",withArticle(g("waistShape")),withArticle(g("stomachShape")),g("hipShape"),noLeg?"":withArticle(g("buttSize")),noLeg?"":g("thighBuild"),noLeg?"":g("legShape"),withArticle(g("bodySoftness")),g("bodyHair"),poseAction(g("posture"))?"":g("posture")].filter(v=>v&&v!=="a ");
  if(rest.length)s.push(`She has ${joinNatural(rest)}.`);
  if(poseAction(g("posture")))s.push(`She is ${g("posture")}.`);
  if(bf)s.push(bf.s);
  {const bm=g("bodyMarkings");if(bm)s.push(cap(bm.replace(/[.\s]+$/,""))+".")}
  return s.join(" ");
}
function skinSentence(){
  const p=[];if(g("skinTone"))p.push(`${g("skinTone")} skin`);if(g("undertone"))p.push(`${g("undertone")} undertones`);
  if(g("skinFinish"))p.push(g("skinFinish"));if(g("markings")&&!/^no markings$/i.test(g("markings")))p.push(g("markings"));
  if(CK.compact)return p.length?p.join(", ")+".":"";
  return p.length?`${cap(subjectPhrase())} has ${joinNatural(p)}.`:"";
}
function nailSentence(){
  const st=g("nailStyle"),col=g("nailColor");if(!st&&!col)return"";
  const multi=S.c.nailColor&&String(S.c.nailColor).includes("+");
  if(CK.compact)return[st,col?col+" nails":""].filter(Boolean).join(", ");
  if(st&&col)return`Her ${st} ${/manicure$/.test(st)?"is":"are"} painted in ${multi?"coordinating shades of ":""}${col}.`;
  if(col)return`Her fingernails are painted ${multi?"in coordinating shades of ":""}${col}.`;
  return`She has ${st}.`;
}
function makeupSentence(){
  const nl=nailSentence();
  if(CK.compact)return nl?nl+".":"";
  const m=makeupCore();return[m,nl].filter(Boolean).join(" ");
}
function makeupCore(){
  const cat=v=>/eyeliner/i.test(v)?"liner":/eyeshadow/i.test(v)?"shadow":/lash/i.test(v)?"lash":/blush/i.test(v)?"blush":/\blips?\b|gloss/i.test(v)?"lip":/highlight|glitter|gem|star|freckle/i.test(v)?"accent":"";
  const clean=v=>v&&!/^no /i.test(v);
  const style=g("makeupStyle"),items=[],covered=new Set(),skipped=[];
  if(clean(style)){if(style.includes(","))style.split(/,\s*(?:and\s+)?/).map(x=>x.trim()).filter(Boolean).forEach(x=>{items.push(x);const c=cat(x);if(c)covered.add(c)});else items.push(style)}
  [["eyelinerStyle","liner"],["eyeshadowStyle","shadow"],["lashStyle","lash"],["blushStyle","blush"],["lipFinish","lip"],["faceAccents","accent"]].forEach(([id,c])=>{
    const v=g(id);if(!clean(v))return;if(covered.has(c)){skipped.push(v);return}items.push(v)});
  if(skipped.length)note("info",`Makeup ${joinNatural(skipped.map(v=>`“${v}”`))} ${skipped.length>1?"were":"was"} left out because the makeup style already covers ${skipped.length>1?"those":"that"}.`);
  const list=[...new Set(items)];if(!list.length)return"";
  const c=g("makeupColor");return c?`Her makeup uses ${c} accents with ${joinNatural(list)}.`:`Her makeup features ${joinNatural(list)}.`;
}
function itemColor(field,it){
  if(!it)return"";const c=it.c==null?"auto":it.c;
  if(c==="-")return"";
  if(COLOR_RX.test(it.v))return"";
  if(c==="auto"){const slot=ROLE_AUTO[field];return slot?(S.pal[slot]||""):""}
  return rc(c);
}
function outfitState(o){
  /* decides what is actually shown, and why things are dropped */
  const it=o.items,bf=activeBodyForm(),noLegs=!!(bf&&bf.noLegs)||(bf&&bf.dropLegs)||fullBeast();
  const drop={},why={};
  const dropIt=(f,msg,fix)=>{if(it[f]&&CK.auto){drop[f]=true;note("info",msg+" Left out of the prompt.",fix)}else if(it[f]){note("warn",msg+" Kept as you set it.",fix)}};
  const rm=f=>({label:`Remove ${OUT_LABEL[f].toLowerCase()}`,fn:()=>mut(()=>{delete cur().items[f]})});
  if(noLegs){["legwear"].forEach(f=>it[f]&&dropIt(f,`${OUT_LABEL[f]} “${it[f].v}” doesn’t fit a body with no legs.`,rm(f)));
    if(it.bottom&&/pants|shorts|midi|skirt/.test("")){}
    if(it.bottom){const k=parseOpt("bottom",it.bottom.v).kind;if(k==="pants"||k==="shorts")dropIt("bottom",`Bottom “${it.bottom.v}” needs legs.`,rm("bottom"))}}
  const isDress=!!(it.top&&parseOpt("top",it.top.v).kind==="dress");
  if(isDress&&it.bottom)dropIt("bottom",`“${it.top.v}” already covers the lower body, so “${it.bottom.v}” isn’t needed.`,rm("bottom"));
  const topShown=it.top&&!drop.top,botShown=it.bottom&&!drop.bottom;
  if(it.bra||it.panties){
    const braHidden=!!(topShown||it.corset),panHidden=!!botShown||(isDress&&!!topShown);
    if(it.bra&&braHidden&&!o.showUnder)dropIt("bra","Bra is covered by the top or corset layer.",{label:"Show underwear",fn:()=>mut(()=>{cur().showUnder=true})});
    if(it.panties&&panHidden&&!o.showUnder)dropIt("panties","Panties are covered by the bottom.",{label:"Show underwear",fn:()=>mut(()=>{cur().showUnder=true})});
    if(o.showUnder&&((it.bra&&braHidden)||(it.panties&&panHidden)))note("info","Underwear is set to show under covering clothes, so the generator may draw the clothes as see-through.");
  }
  if(it.corset&&it.top&&parseOpt("top",it.top.v).kind==="corset")note("warn",`Corset layer and “${it.top.v}” are both corset-style, so they may merge into one garment.`,rm("corset"));
  if(it.headwear&&(traitValue("earStyle")||traitValue("hornStyle"))&&parseOpt("headwear",it.headwear.v).kind==="beret")note("info",`“${it.headwear.v}” sits on top of the ${traitValue("earStyle")||traitValue("hornStyle")}. Mention how they fit in your notes if the generator hides them.`);
  const wingsOn=!!traitValue("wingStyle");
  if(wingsOn&&it.outerwear&&/coat|jacket|blazer|trench|bomber|puffer|robe|cape/.test(it.outerwear.v.toLowerCase()))note("warn",`Wings plus “${it.outerwear.v}” often clip. Consider a shrug, vest, or open-back piece.`,rm("outerwear"));
  return{drop,noLegs};
}
function garmentPhrases(fields,o,st){
  const out=[];
  fields.forEach(f=>{const it=o.items[f];if(!it||st.drop[f])return;const c=itemColor(f,it),fi=fillItem(it.v,c,accentFor(f,it)),base=(c&&!fi.inline)?`${c} ${fi.t}`:fi.t;let w=it.w||"";
    if(f==="wristAccessory"&&!/\bover\b/.test(w)){const g=o.items.gloves;if(g&&!st.drop.gloves&&parseOpt("gloves",g.v).kind==="long")w=(w?w+" ":"")+"worn over the gloves"}
    out.push(w?withArticle(base)+" "+w:base)});
  return out;
}
function outfitLayers(){
  const o=cur(),st=outfitState(o),L={garments:"",accessories:"",underwear:"",details:""};LAST={drop:st.drop,noLegs:st.noLegs};
  const gp=garmentPhrases(["top","corset","bottom","legwear","outerwear"],o,st);
  const ap=garmentPhrases(OUT_GROUPS[1].fields.filter(f=>f!=="heldItem"),o,st),up=garmentPhrases(["bra","panties"],o,st),hp=garmentPhrases(["heldItem"],o,st);
  if(CK.compact){L.garments=gp.join(", ");L.accessories=ap.join(", ");L.underwear=up.join(", ")}
  else{
    if(gp.length)L.garments=`She wears ${joinNatural(gp.map(withArticle))}.`;
    if(ap.length)L.accessories=gp.length?`She also wears ${joinNatural(ap.map(withArticle))}.`:`She wears ${joinNatural(ap.map(withArticle))}.`;
    if(up.length)L.underwear=`Her underwear is ${joinNatural(up.map(withArticle))}.`;
    if(hp.length)L.accessories=(L.accessories?L.accessories+" ":"")+`She holds ${joinNatural(hp.map(withArticle))}.`;
  }
  if(hp.length&&CK.compact)L.accessories=[L.accessories].concat(hp).filter(Boolean).join(", ");
  const d=OUT_GROUPS[3].fields.map(f=>fillD(o.details[f],dcolFor(o,f))).filter(Boolean);
  if(d.length)L.details=CK.compact?d.join(", "):`The outfit has ${joinNatural(d)}.`;
  /* youth guard */
  return L;
}
function weigh(text,w,fmt){
  if(!text||!w||w===1)return text;
  if(fmt==="braces"){const n=Math.max(1,Math.round(Math.abs(Math.log(w))/Math.log(1.05)));return w>1?"{".repeat(n)+text+"}".repeat(n):"[".repeat(n)+text+"]".repeat(n)}
  return `${w}::${text}::`;
}
function composeRaw0(){
  CK={compact:!!S.out.compact,auto:!!S.out.auto,checks:[]};
  const O=outfitLayers(),N=narrOn();
  const raw={
    identity:(N?[speciesSentence(),animalSentence()]:[identitySentence(),speciesSentence(),animalSentence()]).filter(Boolean).join(" "),
    palette:(N&&S.out.mode!=="outfit")?narrPalette():paletteSentence(S.out.mode==="outfit"?"The outfit":undefined),
    eyes:N?narrEyes():eyesSentence(),face:N?"":faceSentence(),hair:N?narrHair():hairSentence(),body:N?narrBody():bodySentence(),skin:N?narrSkin():skinSentence(),makeup:N?"":makeupSentence(),
    garments:O.garments+((COVNOW&&COVNOW.clause&&O.garments)?(CK.compact?", "+COVNOW.clauseCompact:" "+COVNOW.clause):""),accessories:O.accessories,underwear:O.underwear,details:O.details,
    extras:[S.out.must.trim()?`Additional details include ${S.out.must.trim().replace(/[.\s]+$/,"")}.`:"",S.out.notes.trim()].filter(Boolean).join(" ")
  };
  if(S.out.repeatBody&&raw.body&&!CK.compact)raw.body=raw.body+" "+raw.body;
  intimateApply(raw);
  if(isMale())Object.keys(raw).forEach(k=>{if(k!=="extras")raw[k]=maleize(raw[k])});
  if(N&&S.out.mode!=="outfit")narrNotes();
  if(CK.compact&&raw.palette)raw.palette=raw.palette.replace(/^.*? (?:has|uses) /,"").replace(/ color palette/," palette");
  if(CK.compact)Object.keys(raw).forEach(k=>{raw[k]=(raw[k]||"").replace(/[.\s]+$/,"")});
  const inMode=new Set(MODE_LAYERS[S.out.mode]||MODE_LAYERS.full);
  const layers=S.order.map(id=>{
    const def=LAYER_DEFS.find(d=>d[0]===id),ls=S.layers[id]||{},on=ls.on!==false,w=ls.w||1;
    return{id,label:def[1],text:raw[id]||"",on,w,inMode:inMode.has(id),out:weigh(raw[id]||"",w,S.out.wfmt)};
  });
  let body=layers.filter(l=>l.on&&l.inMode&&l.text).map(l=>l.out).join(CK.compact?", ":" ").replace(/\s+/g," ").trim();
  const blocked=!Policy.explicitAllowed();
  if(S.out.explicit&&!blocked)body+=(CK.compact?", ":"\n\n")+"NSFW, Explicit";
  const prompt=[S.out.sheet&&S.out.mode!=="outfit"?CHARACTER_SHEET_PREFIX:"",body].filter(Boolean).join("\n\n");
  runChecks(layers,prompt);
  return{layers,prompt,checks:CK.checks,blocked};
}
function rgbOf(hex){const n=parseInt((hex||"#888888").slice(1),16);return[n>>16&255,n>>8&255,n&255]}
function hexFor(name){return COLORS[(name||"").toLowerCase()]||COLORS[name]||""}
function colorDist(a,b){const x=rgbOf(a),y=rgbOf(b);const rm=(x[0]+y[0])/2;return Math.sqrt((2+rm/256)*(x[0]-y[0])**2+4*(x[1]-y[1])**2+(2+(255-rm)/256)*(x[2]-y[2])**2)}
function runChecks(layers,prompt){
  const sz=BUST_SIZE_RANK.indexOf(S.c.bustSize),wt=BUST_WEIGHT_RANK.indexOf(S.c.bustWeight);
  if(sz>=0&&wt>=0&&((sz<=2&&wt>=4)||(sz>=6&&wt<=1)))note("warn",`Breast size “${S.c.bustSize}” and weight “${S.c.bustWeight}” don’t match.`,{label:"Clear weight",fn:()=>mut(()=>{delete S.c.bustWeight})});
  if(S.c.bustSize&&/flat|petite/.test(S.c.bustSize)&&/pendulous/.test(S.c.bustShape||""))note("warn",`Breast shape “${S.c.bustShape}” doesn’t suit “${S.c.bustSize}”.`,{label:"Clear shape",fn:()=>mut(()=>{delete S.c.bustShape})});
  const one=g("eyeOne"),two=g("eyeTwo"),cfg=S.c.eyeConfig||"";
  if(cfg&&cfg!=="matching"&&cfg!=="luminous matching"&&one&&two&&one.toLowerCase()===two.toLowerCase())note("info",`Eye setting “${cfg}” needs two different colors, but both eyes are ${one}.`,{label:"Use matching",fn:()=>mut(()=>{S.c.eyeConfig="matching"})});
  if(cfg&&cfg!=="matching"&&cfg!=="luminous matching"&&(!one||!two)&&(one||two))note("info",`Eye setting “${cfg}” needs a second eye color.`);
  const unresolved=[];
  Object.entries(S.c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]==="@")v.split("+").forEach(x=>{if(x[0]==="@"&&!S.pal[x.slice(1)])unresolved.push([f,x.slice(1)])})});
  unresolved.forEach(([f,s])=>note("warn",`${labelOf(f)} follows the ${s} palette slot, but that slot is empty.`));
  cur().items&&Object.entries(cur().items).forEach(([f,it])=>{if(typeof it.c==="string"&&it.c[0]==="@"){const sl=it.c.split("+").map(x=>x.replace(/^@/,""));if(sl.every(k=>!S.pal[k]))note("info",`${OUT_LABEL[f]} follows the ${sl.join(" + ")} slot, which is empty, so it has no color.`)}});
  const p=hexFor(S.pal.primary),s2=hexFor(S.pal.secondary);
  if(p&&s2&&colorDist(p,s2)<85)note("warn",`Primary (${S.pal.primary}) and secondary (${S.pal.secondary}) look very alike. The palette may read as one color.`);
  const sk=g("skinTone")&&(SKIN_HEX[g("skinTone")]||hexFor(g("skinTone")));
  if(sk&&p&&colorDist(sk,p)<45&&cur().items.top)note("info",`The primary color is close to the skin tone, so the top may blend into skin.`);
  const lp=layers.filter(l=>l.on&&l.inMode&&l.text);
  const toks=Math.round(prompt.length/4);
  {const m=naiModel();
  if(toks>m.max)note("warn",`The prompt is about ${toks} tokens, over the ${m.label} limit of about ${m.max}, so the end may be cut off. Turn on compact tags or switch off a layer.`,{label:"Compact tags",fn:()=>mut(()=>{S.out.compact=true})});
  else if(toks>m.max*0.9)note("info",`The prompt is about ${toks} tokens, close to the ${m.label} limit of about ${m.max}. Compact tags make it shorter if you need room.`,{label:"Compact tags",fn:()=>mut(()=>{S.out.compact=true})});}
  if(S.out.mode!=="outfit"&&!S.c.subjectType&&!S.c.age)note("info","No age category or species chosen. The prompt will say “the "+(isMale()?"man":"woman")+"”.");
  if(!lp.length)note("info","Nothing to write yet. Pick a subject, or choose a starting point.");
}
function skinSuggestions(species){
  if(!species)return null;
  const fam=SKIN_FAMILIES[SPECIES_FAMILY[species]]||SKIN_FAMILIES.generic;
  return{...fam,...(SPECIES_SKIN_TWEAK[species]||{})};
}
function h(tag,attrs,...kids){
  const e=document.createElement(tag);
  if(attrs)for(const[k,v]of Object.entries(attrs)){
    if(v==null||v===false)continue;
    if(k==="class")e.className=v;else if(k==="text")e.textContent=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);
    else if(k==="style")e.style.cssText=v;else if(v===true)e.setAttribute(k,"");else e.setAttribute(k,v);
  }
  kids.flat().forEach(c=>{if(c==null||c===false)return;e.append(c.nodeType?c:document.createTextNode(c))});
  return e;
}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),2600)}
function addCustom(key,v){v=v.trim();if(!v)return false;(CUSTOM[key]??=[]);if(!CUSTOM[key].includes(v)){CUSTOM[key].push(v);saveJSON(KEY_CUSTOM,CUSTOM)}return true}
function removeCustom(key,v){CUSTOM[key]=(CUSTOM[key]||[]).filter(x=>x!==v);if(!CUSTOM[key].length)delete CUSTOM[key];saveJSON(KEY_CUSTOM,CUSTOM)}
function closePop(){document.body.classList.remove("popopen");if(popEl){popEl.remove();popEl=null;if(popAnchor)popAnchor.setAttribute("aria-expanded","false");popAnchor=null}}
function kbInset(){const v=window.visualViewport;if(!v)return;const k=Math.max(0,Math.round(window.innerHeight-v.height-v.offsetTop));document.documentElement.style.setProperty("--kb",k+"px")}
function placePop(){
  if(!popEl||!popAnchor)return;
  if(window.innerWidth<700){popEl.style.cssText="";popEl.classList.add("popsheet");return}
  popEl.classList.remove("popsheet");
  const r=popAnchor.getBoundingClientRect(),w=Math.min(440,window.innerWidth-24);
  popEl.style.width=w+"px";
  let left=Math.min(Math.max(12,r.left),window.innerWidth-w-12);
  const below=window.innerHeight-r.bottom,above=r.top,maxH=Math.max(260,Math.min(520,Math.max(below,above)-16));
  popEl.style.maxHeight=maxH+"px";popEl.style.left=left+"px";
  if(below>=Math.min(360,maxH)||below>=above)popEl.style.top=(r.bottom+6)+"px",popEl.style.bottom="auto";
  else popEl.style.bottom=(window.innerHeight-r.top+6)+"px",popEl.style.top="auto";
}
function openPop(anchor,cfg){
  closePop();popAnchor=anchor;anchor.setAttribute("aria-expanded","true");document.body.classList.add("popopen");
  const search=h("input",{type:"search",class:"pop-search",placeholder:cfg.searchPlaceholder||"Search",autocomplete:"off","aria-label":"Search options"});
  const list=h("div",{class:"pop-list"+(cfg.grid?" grid":"")});
  const top=h("div",{class:"pop-top"});
  popEl=h("div",{class:"pop"+(cfg.stack?" stack":""),role:"dialog","aria-label":cfg.title||"Choose"},h("div",{class:"pop-head"},h("strong",{text:cfg.title||"Choose"}),h("button",{class:"x",type:"button","aria-label":"Close",onclick:closePop,text:"×"})),cfg.noSearch?null:search,top,list);
  const pick=(v,extra)=>{closePop();cfg.onPick(v,extra)};
  (cfg.top||[]).forEach(t=>{
    top.append(h("button",{type:"button",class:"pop-chip"+(t.on?" on":""),onclick:()=>{closePop();t.fn()}},t.hex?h("i",{class:"sw",style:`background:${t.hex}`}):null,t.label))});
  function fill(){
    const q=search.value.trim().toLowerCase();list.textContent="";let first=null,n=0;
    (cfg.sections||[]).forEach(sec=>{
      const items=sec.items.filter(it=>!q||(it.label||it.v).toLowerCase().includes(q)||(it.sub||"").toLowerCase().includes(q));
      if(!items.length)return;
      if(sec.name)list.append(h("div",{class:"pop-sec",text:sec.name}));
      const wrap=cfg.grid?h("div",{class:"swgrid"}):list;
      items.forEach(it=>{
        n++;
        const on=cfg.current!=null&&cfg.current===it.v;
        const b=cfg.grid
          ?h("button",{type:"button",class:"swb"+(on?" on":""),title:it.label||it.v,"aria-label":it.label||it.v,style:`--c:${it.hex||"#bbb"}`,onclick:()=>pick(it.v)})
          :h("button",{type:"button",class:"opt"+(on?" on":""),disabled:it.dis?true:null,title:it.dis||null,onclick:()=>pick(it.v)},
              it.hex?h("i",{class:"sw",style:`background:${it.hex}`}):null,h("span",{class:"ol",text:(it.label||it.v).replace(/\{c2?\}/g,"[color]")}),it.sub?h("small",{text:it.sub}):null);
        if(!first&&!it.dis)first=it;
        wrap.append(b);
      });
      if(cfg.grid)list.append(wrap);
    });
    if(!n)list.append(h("div",{class:"pop-empty",text:q?`No match for “${search.value.trim()}”. Use the box below to add it.`:"Nothing to show."}));
    search._first=first;
  }
  search.addEventListener("input",fill);
  /* v246: Enter with no match uses the typed words as a write-in (as the box below would), or says nothing matched */
  search.addEventListener("keydown",e=>{if(e.key!=="Enter")return;e.preventDefault();if(search._first){pick(search._first.v);return}
    const t=search.value.trim();if(!t)return;
    if(cfg.custom){const r=cfg.custom.check?cfg.custom.check(t):null;if(r){toast(r);return}closePop();cfg.custom.use(t,false);return}
    toast(`No option matches “${t}”.`)});
  if(cfg.custom){
    const inp=h("input",{type:"text",placeholder:cfg.custom.placeholder||"Type your own",class:"pop-custom-in","aria-label":"Custom value"});
    const save=cfg.custom.save?h("input",{type:"checkbox",id:"popSave"}):null;
    const use=()=>{const t=inp.value.trim();if(!t)return;const r=cfg.custom.check?cfg.custom.check(t):null;if(r){toast(r);return}closePop();cfg.custom.use(t,save&&save.checked)};
    inp.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();use()}});
    popEl.append(h("div",{class:"pop-custom"},inp,h("button",{type:"button",class:"btn sm",onclick:use,text:"Use"}),save?h("label",{class:"chk",for:"popSave"},save," Save to my options"):null));
  }
  document.body.append(popEl);placePop();fill();
  const sc=list.querySelector(".on");if(sc)sc.scrollIntoView({block:"center"});
  if(window.innerWidth>=700&&matchMedia("(pointer:fine)").matches)search.focus();
}
function colorSections(){
  return[{name:"Everyday",items:EVERYDAY.map(n=>({v:n,hex:COLORS[n]}))},{name:"More colors",items:ALL_COLORS.filter(n=>!EVERYDAY_SET.has(n)).map(n=>({v:n,hex:COLORS[n]}))},
    ...((CUSTOM.__colors||[]).length?[{name:"My colors",items:CUSTOM.__colors.map(n=>({v:n,hex:hexFor(n)||Sprite.hexFor(n)}))}]:[])];
}
function colorPop(anchor,{title,current,onPick,slotLinks=true,extraTop=[],mix=false}){
  const top=[...extraTop];
  if(slotLinks)SLOTS.forEach(([k,l])=>top.push({label:`Follow ${l.toLowerCase()}`,hex:S.pal[k]?(hexFor(S.pal[k])||Sprite.hexFor(S.pal[k])):null,on:current==="@"+k,fn:()=>onPick("@"+k)}));
  if(slotLinks&&mix){const ks0=SLOTS.map(x=>x[0]).filter(k=>S.pal[k]);[ks0.slice(0,2),ks0.slice(0,3),ks0.length>3?ks0:null].filter(ks=>ks&&ks.length>1).filter((ks,i,a)=>a.findIndex(o=>o.join()===ks.join())===i).forEach(ks=>{const v=ks.map(k=>"@"+k).join("+");top.push({label:ks.length===ks0.length&&ks.length>3?"Mix all palette colors":"Mix "+ks.join(" + "),hex:hexFor(S.pal[ks[0]])||Sprite.hexFor(S.pal[ks[0]]),on:current===v,fn:()=>onPick(v)})})}
  openPop(anchor,{title,grid:true,current,sections:colorSections(),top,searchPlaceholder:"Search colors",onPick:v=>onPick(v),
    custom:{placeholder:"Or type a color, e.g. dusty teal",save:true,use:(t,s)=>{if(s&&!COLORS[t]){(CUSTOM.__colors??=[]).includes(t)||CUSTOM.__colors.push(t);saveJSON(KEY_CUSTOM,CUSTOM)}onPick(t)}}});
}
function swatchFor(v){const f=typeof v==="string"&&v[0]==="@"&&v.includes("+")?v.split("+")[0]:v;const n=rc(f||"");return n?(hexFor(n)||Sprite.hexFor(n)):null}
function setC(id,v,key){mut(()=>{if(v==null||v==="")delete S.c[id];else S.c[id]=v},key||id)}
function fieldOptsPop(id,anchor,extra){
  const opts=optionList(id),secs=[],by=new Map();
  opts.forEach(o=>{const k=o.g||"Options";if(!by.has(k)){by.set(k,[]);secs.push({name:k,items:by.get(k)})}by.get(k).push({v:o.v,label:o.v.replace(/\{c\}/g,"[color]")})});
  const top=[];
  if(extra&&extra.auto)top.push({label:extra.auto,on:S.c[id]==null||S.c[id]==="",fn:()=>setC(id,"")});
  if(extra&&extra.none)top.push({label:"None",on:S.c[id]==="none",fn:()=>setC(id,"none")});
  if(S.c[id]!=null&&S.c[id]!==""&&!(extra&&extra.auto)&&S.c[id]!=="none")top.push({label:"Clear",fn:()=>setC(id,"")});
  openPop(anchor,{title:LABELS[id],current:S.c[id],sections:secs.length===1?[{name:"",items:secs[0].items}]:secs,top,
    onPick:v=>setC(id,v),
    custom:{placeholder:"Type your own "+LABELS[id].toLowerCase(),save:true,use:(t,s)=>{if(s){addCustom(id,t)}setC(id,t)}}});
}
function row(id,label,control,hint,cls){
  const nd=narrDropped(id),idr=!nd&&intimateDropped(id),dr=nd||idr;if(nd)hint="Not used in the Flowing sentence style.";else if(idr)hint="Held out of the prompt for now (see above).";
  const lk=lockable(id)?lockButton(id,label):null,held=isLocked(id)||stepFrozen(stepOf(id));
  const lab=h("div",{class:"lab"},h("div",{class:"labtop"},h("label",{text:label}),lk),hint?h("small",{class:"hint",text:hint}):null);
  return h("div",{class:"row "+(cls||"")+(isSet(id)?" set":"")+(held?" locked":"")+(dr?" dropped":""),"data-field":id},lab,h("div",{class:"ctl",inert:dr?true:null,"aria-disabled":dr?"true":null},control));
}
function chipsControl(id,opts,{auto,none}={}){
  const wrap=h("div",{class:"chips",role:"group","aria-label":LABELS[id]});
  const curv=S.c[id];
  if(auto)wrap.append(h("button",{type:"button",class:"chip auto"+((curv==null||curv==="")?" on":""),"aria-pressed":(curv==null||curv==="")?"true":"false",onclick:()=>setC(id,""),text:auto}));
  if(none)wrap.append(h("button",{type:"button",class:"chip"+(curv==="none"?" on":""),"aria-pressed":curv==="none"?"true":"false",onclick:()=>setC(id,curv==="none"?"":"none"),text:"None"}));
  opts.forEach(o=>wrap.append(h("button",{type:"button",class:"chip"+(curv===o.v?" on":""),"aria-pressed":curv===o.v?"true":"false",onclick:()=>setC(id,curv===o.v?"":o.v),text:o.v.replace(/\{c\}/g,"[color]")})));
  if(curv&&curv!=="none"&&!opts.some(o=>o.v===curv))wrap.append(h("button",{type:"button",class:"chip on","aria-pressed":"true",onclick:()=>setC(id,""),title:"Your own value. Click to clear.",text:curv}));
  wrap.append(h("button",{type:"button",class:"chip more","aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>fieldOptsPop(id,e.currentTarget,{auto:null}),text:"Other…"}));
  return wrap;
}
function pickControl(id,{auto,none,placeholder}={}){
  const v=S.c[id],set=v!=null&&v!==""&&v!=="none";
  const label=v==="none"?"None":set?(/\{c\}/.test(v)?skinTok(v,g(id==="skinFinish"?"finishColor":id==="scleraStyle"?"scleraColor":id==="markings"?"markingColor":id+"Color")):v):(auto?`Auto${autoText(id)?": "+autoText(id):""}`:(placeholder||"Choose…"));
  const b=h("button",{type:"button",class:"pick"+(set?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>fieldOptsPop(id,e.currentTarget,{auto:auto?"Auto":null,none}) },h("span",{text:label}),h("i",{class:"caret","aria-hidden":"true"}));
  const wrap=h("div",{class:"pickwrap"},b);
  if(v!=null&&v!=="")wrap.append(h("button",{type:"button",class:"clear","aria-label":"Clear "+LABELS[id],title:"Clear",onclick:()=>setC(id,""),text:"×"}));
  return wrap;
}
function autoText(id){
  if(id==="bodyForm")return autoBodyForm();
  if(TRAIT_FIELDS.includes(id)){const a=autoTrait(id);return a.indexOf("{c}")>=0?skinTok(a,g(id+"Color")||rc((AUTO_TRAITS[subjectKey()]||{})[id+"Color"]||"")):a}return"";
}
function colorControl(id,opts={}){
  const v=S.c[id],set=v!=null&&v!=="",name=rc(v||""),hex=swatchFor(v);
  const link=set&&v[0]==="@"?v.replace(/@/g,"").replace(/\+/g," + "):"";
  const b=h("button",{type:"button",class:"pick color"+(set?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",
    onclick:e=>colorPop(e.currentTarget,{title:LABELS[id]||((LABELS[id.slice(0,-5)]||id.slice(0,-5))+" color"),current:v,mix:/^(eyeshadowStyleColor|makeupColor)$/.test(id),onPick:x=>setC(id,x)})},
    h("i",{class:"sw big"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),
    h("span",{text:set?(name||"(empty slot)"):"Choose a color…"}),link?h("small",{class:"link",text:"follows "+link}):null,h("i",{class:"caret","aria-hidden":"true"}));
  const wrap=h("div",{class:"pickwrap"},b);
  if(set)wrap.append(h("button",{type:"button",class:"clear","aria-label":"Clear",title:"Clear",onclick:()=>setC(id,""),text:"×"}));
  return wrap;
}
function fieldRow(id,{auto,none,forceChips,forcePick,hint,placeholder}={}){
  const n=optionList(id).length,grouped=optionList(id).some(o=>o.g&&o.g!=="My options");
  const useChips=forceChips||(!forcePick&&n<=10&&!grouped);
  let ctl=useChips?chipsControl(id,optionList(id),{auto,none}):pickControl(id,{auto,none,placeholder});
  {const rv=S.c[id]||autoTrait(id);if(typeof rv==="string"&&rv.indexOf("{c}")>=0&&!TOK_SPECIAL.has(id)){const cc=colorControl(id+"Color"),ac=!S.c[id+"Color"]&&!S.c[id]?rc((AUTO_TRAITS[subjectKey()]||{})[id+"Color"]||""):"";if(ac){const sp=cc.querySelector("button span");if(sp)sp.textContent="Auto: "+ac}ctl=h("div",{class:"tokctl",style:"display:flex;flex-direction:column;gap:8px"},ctl,cc)}}
  return row(id,LABELS[id],ctl,hint||(auto&&autoText(id)&&(S.c[id]==null||S.c[id]==="")?`Auto: ${autoText(id)}`:""));
}
function colorRow(id,hint){return row(id,LABELS[id],colorControl(id),hint)}
function sub(title,note){return h("div",{class:"sub"},h("h3",{text:title}),note?h("p",{text:note}):null)}
function stepConcept(){
  const f=document.createDocumentFragment();
  f.append(sexRow());f.append(fieldRow("age",{forceChips:true,hint:`Reads as “${subjectNoun()}”`}));
  f.append(fieldRow("subjectType",{forcePick:true,placeholder:"None (human)",hint:"Optional. Combined with the age category, e.g. leopard + "+(isMale()?"man":"woman")+"."}));
  if(Policy.callout("concept"))f.append(h("p",{class:"callout"},Policy.callout("concept")));
  f.append(sub("Creature features","Leave a feature on Auto and it follows the subject. Choose None to remove it."));
  TRAIT_FIELDS.forEach(id=>f.append(fieldRow(id,{auto:"Auto",none:true,forcePick:true})));
  f.append(colorRow("fantasyAccentColor","Tints the creature features, such as “with violet accents”."));
  f.append(sub("Animal transformation","Fur, scales or feathers on top of an animal subject."));
  const sp=ANIMALS.species[subjectKey()];
  f.append(fieldRow("animalForm",{forceChips:true}));
  f.append(fieldRow("animalPattern",{forceChips:true,hint:animalLevel()?"":"Pick a transformation first"}));f.append(colorRow("noseColor","Nose and paw pad color for animal forms. Leave empty for the species default."));
  if(!sp&&S.c.animalForm)f.append(h("p",{class:"callout warn"},"This subject isn’t an animal type, so the transformation is skipped."));
  f.append(sub("Lower body","Special lower bodies replace legs and hide leg garments."));
  f.append(fieldRow("bodyForm",{auto:"Auto",none:true,forcePick:true}));
  return f;
}
function fieldStepMap(){
  if(_fieldStep)return _fieldStep;
  const m={};Object.entries(STEP_FIELDS).forEach(([st,fs])=>fs.forEach(f=>{if(!/^[pod]:/.test(f))m[f]=st}));
  ["animalPattern","noseColor","fantasyAccentColor"].forEach(f=>{m[f]=m[f]||"concept"});
  ["scleraStyle","scleraColor"].forEach(f=>{m[f]=m[f]||"face"});
  return(_fieldStep=m);
}
function baseField(id){
  if(id.indexOf(":")>=0)return id;
  if(SPECIAL_COMP[id])return SPECIAL_COMP[id];
  if(/Color$/.test(id)&&CHAR[id.slice(0,-5)])return id.slice(0,-5);
  return id;
}
function stepOf(id){
  if(id.startsWith("pal:"))return"palette";
  if(/^[od]:/.test(id))return"outfit";
  const m=fieldStepMap();return m[id]||m[baseField(id)]||null;
}
function isLocked(id){
  if(id.startsWith("o:"))return!!outLock()[id.slice(2)];
  if(id.startsWith("d:"))return!!outLock()[id];
  return!!(S.lock&&(S.lock[id]||S.lock[baseField(id)]));
}
function stepFrozen(st){
  if(st==="outfit")return!!outLock()["*"];
  return!!(st&&S.lock&&S.lock["step:"+st]);
}
function setLock(id,on){
  if(/^[od]:/.test(id)){const o=cur(),k=id.startsWith("o:")?id.slice(2):id,m={...(o.lock||{})};if(on)m[k]=true;else delete m[k];if(Object.keys(m).length)o.lock=m;else delete o.lock;return}
  const m={...(S.lock||{})};if(on)m[id]=true;else delete m[id];if(Object.keys(m).length)S.lock=m;else delete S.lock;
}
function setStepLock(st,on){setLock(st==="outfit"?"o:*":"step:"+st,on)}
function pruneLocks(){
  if(S.lock){
    Object.keys(S.lock).forEach(k=>{
      if(k.startsWith("step:"))return;
      const set=k.startsWith("pal:")?!!S.pal[k.slice(4)]:(S.c[k]!=null&&S.c[k]!=="");
      if(!set)delete S.lock[k];
    });
    if(!Object.keys(S.lock).length)delete S.lock;
  }
  S.outfits.forEach(o=>{
    if(!o.lock)return;
    Object.keys(o.lock).forEach(k=>{if(k==="*")return;const set=k.startsWith("d:")?!!o.details[k.slice(2)]:!!o.items[k];if(!set)delete o.lock[k]});
    if(!Object.keys(o.lock).length)delete o.lock;
  });
}
function lockEntries(){
  const out=[];
  const L=S.lock||{};
  LOCK_STEPS.forEach(([st,label])=>{
    if(st==="outfit")return;
    if(L["step:"+st])out.push({step:st,label:label+": whole step",off:()=>setLock("step:"+st,false)});
  });
  LOCK_STEPS.forEach(([st,label])=>{
    if(st==="outfit")return;
    Object.keys(L).filter(k=>!k.startsWith("step:")&&stepOf(k)===st).forEach(k=>out.push({step:st,id:k,label:`${label}: ${k.startsWith("pal:")?slotLabel(k.slice(4)):labelOf(k)}`,off:()=>setLock(k,false)}));
  });
  const o=cur(),ol=o.lock||{};
  if(ol["*"])out.push({step:"outfit",label:"Outfit: whole outfit",off:()=>setLock("o:*",false)});
  Object.keys(ol).filter(k=>k!=="*").forEach(k=>out.push({step:"outfit",id:k,label:`Outfit: ${k.startsWith("d:")?(OUT_LABEL[k.slice(2)]||k):(OUT_LABEL[k]||k)}`,off:()=>setLock(k.startsWith("d:")?k:"o:"+k,false)}));
  return out;
}
function lockedInScope(steps){
  const L=S.lock||{},ol=cur().lock||{};let n=0;
  Object.keys(L).forEach(k=>{if(!k.startsWith("step:")&&steps.includes(stepOf(k))&&!stepFrozen(stepOf(k)))n++});
  if(steps.includes("outfit")&&!ol["*"])n+=Object.keys(ol).length;
  return n;
}
function bulkSet(clearList,vals){
  const held=new Set();
  (clearList||[]).forEach(f=>{if(kept(f)){if(S.c[f]!=null&&S.c[f]!=="")held.add(f);return}delete S.c[f]});
  Object.entries(vals||{}).forEach(([f,x])=>{if(kept(f)){if(S.c[f]!==x)held.add(f);return}S.c[f]=x});
  if(isMale())fixSexChars();
  return held.size;
}
function lockable(id){return!/^preset:/.test(id)&&baseField(id)===id&&!!stepOf(id)}
function lockButton(id,label){
  const on=isLocked(id),fz=stepFrozen(stepOf(id));
  if(!(isSet(id)||on))return null;
  const shut=on||fz;
  return h("button",{type:"button",class:"lockdot"+(shut?" on":""),"aria-pressed":shut?"true":"false",disabled:fz?true:null,
    title:fz?"Locked with the whole step":shut?"Unlock "+label.toLowerCase():"Lock "+label.toLowerCase()+". Randomize, presets and starting points will leave it alone.",
    "aria-label":(shut?"Unlock ":"Lock ")+label,
    onclick:()=>{lockFocus=`[data-field="${id}"] .lockdot`;mut(()=>setLock(id,!on),"lock:"+id)}},icon(shut?LOCK_SHUT:LOCK_OPEN,"lkic"));
}
function stepHeadActions(id){
  const box=h("div",{class:"headacts"}),fz=stepFrozen(id),isOut=id==="outfit";
  if(["concept","face","hair","body","makeup"].includes(id))
    box.append(h("button",{type:"button",class:"btn sm",disabled:fz?true:null,
      title:fz?"This step is locked":"Rolls new options for this step. Locked options stay. Uses your Randomize settings.",onclick:()=>rollNow({steps:[id]}),text:id==="concept"?"Randomize species":"Randomize"}));
  if(LOCK_STEPS.some(s=>s[0]===id))
    box.append(h("button",{type:"button",class:"btn sm lockbtn"+(fz?" on":""),"aria-pressed":fz?"true":"false",
      title:fz?"Unlock everything in this step":"Keep everything in this step as it is, even empty options, when you randomize or load presets",
      onclick:()=>{lockFocus=".headacts .lockbtn";mut(()=>setStepLock(id,!fz),"steplock"+id)}},icon(fz?LOCK_SHUT:LOCK_OPEN,"lkic"),
      isOut?(fz?"Outfit locked":"Lock outfit"):(fz?"Step locked":"Lock step")));
  return box.childNodes.length?box:null;
}
function carryLocks(from,to){
  const res={opts:0,steps:[]},L=from.lock||{},fo=from.outfits[from.cur]||{},tl=fo.lock||{};
  if(!Object.keys(L).length&&!Object.keys(tl).length)return res;
  to.lock={};
  const comps=f=>[f+"Color",...Object.keys(SPECIAL_COMP).filter(k=>SPECIAL_COMP[k]===f)];
  LOCK_STEPS.forEach(([st,label])=>{
    if(st==="outfit"||!L["step:"+st])return;
    to.lock["step:"+st]=true;res.steps.push(label);
    if(st==="palette")SLOT_KEYS.forEach(k=>{to.pal[k]=from.pal[k]||""});
    else new Set([...Object.keys(from.c),...Object.keys(to.c)]).forEach(f=>{if(stepOf(f)===st){if(from.c[f]!=null&&from.c[f]!=="")to.c[f]=from.c[f];else delete to.c[f]}});
  });
  Object.keys(L).forEach(k=>{
    if(k.startsWith("step:"))return;
    if(k.startsWith("pal:")){const s=k.slice(4);if(from.pal[s]){to.pal[s]=from.pal[s];to.lock[k]=true;res.opts++}return}
    if(from.c[k]!=null&&from.c[k]!==""){to.c[k]=from.c[k];to.lock[k]=true;res.opts++;comps(k).forEach(c=>{if(from.c[c]!=null&&from.c[c]!=="")to.c[c]=from.c[c]})}
  });
  if(!Object.keys(to.lock).length)delete to.lock;
  const o0=to.outfits[0];
  if(tl["*"]){to.outfits[0]=JSON.parse(JSON.stringify(fo));to.cur=0;res.steps.push("Outfit")}
  else Object.keys(tl).forEach(k=>{
    if(k.startsWith("d:")){const f=k.slice(2);if(fo.details[f]){o0.details[f]=fo.details[f];if(fo.dcol&&fo.dcol[f])o0.dcol[f]=fo.dcol[f];(o0.lock=o0.lock||{})[k]=true;res.opts++}}
    else if(fo.items[k]){o0.items[k]=JSON.parse(JSON.stringify(fo.items[k]));(o0.lock=o0.lock||{})[k]=true;res.opts++}
  });
  return res;
}
function keptMsg(r){
  const bits=[];
  if(r.opts)bits.push(`${r.opts} locked option${r.opts>1?"s":""}`);
  if(r.steps.length)bits.push(`the locked ${joinNatural(r.steps)} step${r.steps.length>1?"s":""}`);
  return bits.length?` Kept ${joinNatural(bits)}.`:"";
}
function loadStart(t){
  const wasMale=isMale(),nb=stateFromTemplate(t),r=carryLocks(S,nb);
  replaceState(nb);
  let sx="";
  if(wasMale&&!isMale()){
    const n=UNDO.length;swapSex("male");
    if(isMale()){if(UNDO.length>n)UNDO.splice(UNDO.length-1,1);sx=" Converted to male to match your current mode. Switch Sex back to female to restore it."}
    else sx=" It stays female because the age safeguard flags it."
  }
  toast(`Loaded “${t.name}”.${sx}${keptMsg(r)} Undo brings back your previous design.`);
}
function clearOutfit(){
  if(stepFrozen("outfit")){toast("This outfit is locked. Unlock it to clear it.");return}
  let n=0;
  mut(()=>{
    const old=cur(),no=newOutfit(old.name);
    Object.keys(old.items).forEach(f=>{if(kept("o:"+f)){no.items[f]=old.items[f];n++}});
    Object.keys(old.details).forEach(f=>{if(kept("d:"+f)){no.details[f]=old.details[f];if(old.dcol&&old.dcol[f])no.dcol[f]=old.dcol[f];n++}});
    if(old.lock)no.lock={...old.lock};
    if(old.showUnder&&(no.items.bra||no.items.panties))no.showUnder=true;
    S.outfits[S.cur]=no;
  });
  if(n)toast(`Outfit cleared.${keptNote(n)}`);
}
function railLock(id){
  if(!LOCK_STEPS.some(s=>s[0]===id))return null;
  const n=lockCountFor(id);if(!n)return null;
  const fz=stepFrozen(id);
  return h("span",{class:"rlk",role:"img",title:fz?"Whole step locked":`${n} locked`,"aria-label":fz?"Whole step locked":`${n} locked option${n>1?"s":""}`},icon(LOCK_SHUT,"lkic"));
}
function rndSettings(){
  const d={steps:{palette:true,face:true,hair:true,body:true,makeup:true,outfit:true,concept:false},vibe:"any",adult:false,seen:false};
  const s=loadJSON(KEY_RND,null);
  return s&&typeof s==="object"?{...d,...s,steps:{...d.steps,...(s.steps||{})}}:d;
}
function fitPalette(p,lockedKs,freeKs){
  const res={};SLOT_KEYS.forEach(k=>{res[k]=S.pal[k]||""});
  const rest=p.c.slice();let score=0;
  for(const k of lockedKs){
    const lh=slotHex(k);let bi=-1,bd=1e9;
    rest.forEach((c,i)=>{const d=colorDist(lh,nameHex(c)||"#888888");if(d<bd){bd=d;bi=i}});
    if(bi<0)return null;
    score+=bd;rest.splice(bi,1);
  }
  freeKs.forEach((k,i)=>{res[k]=rest[i]||""});
  return{names:SLOT_KEYS.map(k=>res[k]),score};
}
function rollPalette(ctx){
  const lockedKs=SLOT_KEYS.filter(k=>kept("pal:"+k)&&S.pal[k]),freeKs=SLOT_KEYS.filter(k=>!kept("pal:"+k));
  if(!freeKs.length)return false;
  const moods=ctx&&ctx.vibe&&ctx.vibe.moods;
  let pool=PALETTE_LIBRARY.filter(p=>!moods||moods.includes(p.m));
  if(pool.length<4)pool=PALETTE_LIBRARY.slice();
  const now=SLOT_KEYS.map(k=>S.pal[k]||"").join("|");
  const fits=shuffled(pool).map(p=>({p,f:fitPalette(p,lockedKs,freeKs)})).filter(x=>x.f&&x.f.names.join("|")!==now);
  let ok=fits.filter(x=>!palAlike(x.f.names));
  if(lockedKs.length&&ok.length>6)ok=ok.sort((a,b)=>a.f.score-b.f.score).slice(0,6);
  const chosen=(ok.length?ok:fits)[ok.length?Math.floor(Math.random()*ok.length):0];
  if(!chosen)return false;
  SLOT_KEYS.forEach((k,i)=>{if(!kept("pal:"+k))S.pal[k]=chosen.f.names[i]});
  return true;
}
function palSurprise(){
  if(SLOT_KEYS.every(k=>kept("pal:"+k))){toast("All five colors are locked.");return}
  let ok=false;mut(()=>{ok=rollPalette({vibe:VIBES.any})});
  toast(ok?"New palette. Locked colors kept. Undo brings back the last one.":"No other palette fits the colors you locked.");
}
function rollOnce(ctx){
  const{adult,vibe,steps}=ctx;
  const free=f=>!kept(f);
  const COMPS={skinFinish:["finishColor"],markings:["markingColor"]};
  const clr=f=>{if(free(f)){delete S.c[f];[f+"Color",...(COMPS[f]||[])].forEach(c=>delete S.c[c])}};
  const assign=v=>{Object.entries(v).forEach(([f,x])=>{if(free(f))S.c[f]=x})};
  const pool=(f,extra)=>{const a=CHAR[f].filter(([v,g])=>!RND_EXOTIC.test(g)&&(!extra||extra(v,g))&&(adult||!/adult/i.test(g))&&Policy.optionAllowed(f,v)&&sexOk(f,v,isMale())).map(x=>x[0]);if(isMale()&&MASC_BIAS.has(f)&&Math.random()<.75){const m=a.filter(v=>isMOpt(f,v));if(m.length)return m}return a};
  const nudge=(f,p)=>{if(free(f)&&Math.random()<p){const a=pool(f);if(a.length)S.c[f]=pick1(a)}};
  const nat=f=>pool(f,(v,g)=>!/stylized/i.test(g));
  const presetPick=(P,keys)=>{
    const avail=Object.keys(P).filter(k=>presetAvailable(P[k])&&presetSexOk(P[k]));
    let ks=avail.filter(k=>!P[k].adultOnly&&(!keys||keys.includes(k)));
    if(!ks.length)ks=avail.filter(k=>!P[k].adultOnly);
    if(adult)ks=ks.concat(avail.filter(k=>P[k].adultOnly));
    return ks.length?P[pick1(ks)]:null;
  };
  /* colors follow the palette when it has colors; with none, plain color names stand in */
  const filled=()=>SLOT_KEYS.filter(k=>S.pal[k]);
  const slotRef=w=>{const f=filled();if(!f.length)return null;let r=Math.random()*f.reduce((s,k)=>s+(w[k]||1),0);for(const k of f){r-=(w[k]||1);if(r<=0)return"@"+k}return"@"+f[f.length-1]};
  const distinct=(make,other)=>{let v=make();for(let i=0;i<10&&rc(v).toLowerCase()===rc(other).toLowerCase();i++)v=make();return v};
  const aux=(pref,fancy)=>{for(const k of pref)if(S.pal[k])return"@"+k;return filled().length?null:pick1(fancy?LIT.fancy:LIT.hair)};
  const R={
    concept(){
      const sp=CHAR.subjectType.filter(([v,g])=>!/Eeveelution/i.test(g)&&Policy.optionAllowed("subjectType",v)&&sexOk("subjectType",v,isMale())).map(x=>x[0]);
      if(free("subjectType")){if(Math.random()<.15||!sp.length)delete S.c.subjectType;else S.c.subjectType=pick1(sp)}
      [...TRAIT_FIELDS,"animalForm","animalPattern","bodyForm","fantasyAccentColor","noseColor"].forEach(clr);
    },
    palette(){return rollPalette(ctx)},
    face(){
      STEP_FIELDS.face.forEach(clr);
      [[FACE_PRESETS,vibe.face],[EYE_PRESETS,vibe.eye]].forEach(([P,keys])=>{const p=presetPick(P,keys);if(p)assign(p.v)});
      ["expression","browShape","noseShape","mouthShape","faceShape","impression","eyeShape","irisDetail","lashNatural"].forEach(f=>nudge(f,.22));
      if(free("faceMark")&&Math.random()<.3)S.c.faceMark=pick1(optionList("faceMark").map(x=>x.v));
      /* eye setup and colors */
      const cfgs=["matching","matching","matching","matching","heterochromatic","softly mismatched","gradient-tinted"].filter(v=>CHAR.eyeConfig.some(x=>x[0]===v));
      if(isMale()&&free("facialHair")&&Math.random()<.55)S.c.facialHair=pick1(CHAR.facialHair.map(x=>x[0]));
      if(free("eyeConfig"))S.c.eyeConfig=pick1(cfgs);
      const cfg=S.c.eyeConfig||"matching",two=cfg!=="matching"&&cfg!=="luminous matching";
      const eyeRef=()=>slotRef({primary:1,secondary:1,third:1.4,accent:2.6,extra:1.4})||pick1(LIT.eye);
      const f1=free("eyeOne"),f2=free("eyeTwo");
      if(f1&&f2){const e1=eyeRef();S.c.eyeOne=e1;S.c.eyeTwo=two?distinct(eyeRef,e1):e1}
      else if(f1){const e2=S.c.eyeTwo||"";S.c.eyeOne=two&&e2?distinct(eyeRef,e2):(e2||eyeRef())}
      else if(f2){const e1=S.c.eyeOne||"";S.c.eyeTwo=two&&e1?distinct(eyeRef,e1):(e1||eyeRef())}
    },
    hair(){
      const HF=STEP_FIELDS.hair;
      const attempt=()=>{
        HF.forEach(clr);
        if(free("hairStyle")){
          let st=pool("hairStyle");
          if(isMale()&&Math.random()<.8){const sh=st.filter(v=>((CHAR.hairStyle.find(x=>x[0]===v)||[0,""])[1])==="Short Styles");if(sh.length)st=sh}
          if(S.c.hairLength){const f=st.filter(v=>lenFits(v,S.c.hairLength));if(f.length)st=f}
          if(st.length)S.c.hairStyle=pick1(st);
        }
        const sty=S.c.hairStyle||"",grp=(CHAR.hairStyle.find(x=>x[0]===sty)||[0,""])[1],short=/short/i.test(grp);
        if(free("hairLength")){
          const lens=pool("hairLength",v=>{const r=lenRank(v);return r!=null&&(short?(isMale()?SHORT_LEN.has(v):r<=3):r>=3&&r<=(isMale()?3:8))&&(!sty||lenFits(sty,v))});
          if(lens.length)S.c.hairLength=(isMale()&&lens.includes("short")&&Math.random()<.6)?"short":pick1(lens);
        }
        nudge("hairTexture",1);if(isMale()){if(free("bangs")&&Math.random()<.7)S.c.bangs=pick1(CHAR.bangs.filter(x=>x[1]==="Men’s Bangs").map(x=>x[0]))}else nudge("bangs",.8);
        const lr=lenRank(S.c.hairLength),longHair=lr!=null&&lr>=4;
        if(free("hairMovement")){
          const mv=pool("hairMovement",(v,g)=>!/past|midriff|chest|waist/i.test(v)&&(longHair?/long|dynamic|natural/i.test(g):/short|dynamic|natural/i.test(g)));
          if(mv.length&&Math.random()<.8){const mm=isMale()&&!longHair?mv.filter(v=>sexTagOf("hairMovement",v)==="m"):[];S.c.hairMovement=pick1(mm.length&&Math.random()<.75?mm:mv)}
        }
        if(free("hairBase"))S.c.hairBase=S.pal.primary?"@primary":(filled().length?"@"+filled()[0]:pick1(LIT.hair));
        if(free("hairUnderlayer")&&Math.random()<.3){const r=aux(["secondary","third"],true);if(r)S.c.hairUnderlayer=r}
        if(free("hairInner")&&Math.random()<.2){const r=aux(["third","extra","secondary"],true);if(r)S.c.hairInner=r}
        if(free("hairHighlights")&&Math.random()<.35){const r=aux(["accent","extra","third"],true);if(r)S.c.hairHighlights=r}
        if(["hairUnderlayer","hairInner","hairHighlights"].some(f=>S.c[f])&&Math.random()<.7)nudge("hairBlend",1);
      };
      for(let t=0;t<25;t++){attempt();if(!compose().checks.some(c=>/^Hair /.test(c.msg)))break}
    },
    body(){
      STEP_FIELDS.body.filter(f=>!INTIMATE_FIELDS.includes(f)).forEach(clr);
      if(isMale())mascBodyRoll(free,pick1);else{const p=presetPick(BODY_PRESETS,null);if(p)assign(p.v)}
      /* intimate details are never wiped by a roll; with adult options on and a nude outfit they get an adult preset (the safeguard decides what is available) */
      if(adult&&intimateGate().open){const ip=presetPick(INTIMATE_PRESETS,null);if(ip)assign(ip.v)}
      if(free("skinTone")){const a=nat("skinTone");if(a.length)S.c.skinTone=pick1(a)}
      if(Math.random()<.7){const u=nat("undertone");if(u.length&&free("undertone"))S.c.undertone=pick1(u)}
      nudge("skinFinish",.8);
      if(Math.random()<.4)nudge("markings",1);
      nudge("posture",.6);
      if(isMale()&&free("bodyHair")&&Math.random()<.45)S.c.bodyHair=pick1(CHAR.bodyHair.map(x=>x[0]));
    },
    makeup(){
      if(isMale()){mascMakeupRoll(free,pick1,clr);return}
      STEP_FIELDS.makeup.forEach(clr);
      const p=presetPick(MAKEUP_PRESETS,vibe.makeup);if(p)assign(p.v);
      ["eyelinerStyle","eyeshadowStyle","blushStyle","lipFinish","lashStyle"].forEach(f=>nudge(f,.22));
      if(Math.random()<.3)nudge("faceAccents",1);
      const tint=w=>slotRef(w)||pick1(LIT.tint);
      if(free("makeupColor"))S.c.makeupColor=tint({primary:1,secondary:1,third:1,accent:2,extra:1.5});
      nudge("nailStyle",.9);
      if(S.c.nailStyle&&free("nailColor"))S.c.nailColor=Math.random()<.5?tint({primary:1.5,accent:2,third:1,secondary:0,extra:0}):tint({primary:1,secondary:1,third:1,accent:1,extra:1});
    },
    outfit(){return rollOutfit(ctx)}
  };
  const charSteps=["concept","face","hair","body","makeup"].some(s=>steps.has(s)&&!stepFrozen(s));
  if(charSteps&&!S.c.age&&free("age"))S.c.age=pick1(isMale()?["young man","young man","man","mature man"]:["young woman","young woman","woman","mature woman"]);
  RND_ORDER.forEach(st=>{
    if(!steps.has(st))return;
    if(stepFrozen(st)){ctx.skipped.push(st);return}
    if(R[st]()!==false)ctx.did.push(st);
    /* a species can wear its own accent color once the palette exists */
    if(st==="palette"&&steps.has("concept")&&!stepFrozen("concept")&&S.c.subjectType&&free("fantasyAccentColor")&&Math.random()<.35){const r=slotRef({accent:3,extra:2,third:1});if(r)S.c.fantasyAccentColor=r}
  });
  if(isMale()){fixSexChars();mascRollFields(steps)}
}
function rollOutfit(ctx){
  const o=cur(),L=o.lock||{};
  if(L["*"])return false;
  const lockedItem=f=>!!L[f],lockedDet=f=>!!L["d:"+f];
  const allLooks=LOOKS.map(l=>l[0]).filter(l=>l!=="boudoir"&&l!=="costume");
  const vl=ctx.vibe.looks?allLooks.filter(l=>ctx.vibe.looks.includes(l)):allLooks;
  const look=o.look||pick1(vl.length?vl:allLooks),cov=o.cover||"",sea=o.season||"";
  ctx.info.look=(LOOKS.find(l=>l[0]===look)||[0,look])[1];
  const bf=activeBodyForm(),noLegs=!!(bf&&(bf.noLegs||bf.dropLegs))||fullBeast();
  const wings=!!traitValue("wingStyle"),hat=!!(traitValue("earStyle")||traitValue("hornStyle"));
  const pool=(field,pred)=>{
    const ok=(OUTFIT[field]||[]).filter(it=>{
      if(Policy.isYouthText(it.v)||!Policy.itemAllowed(field,it.v)||!itemSexOk(field,it.v))return false;
      const t=itemTiers(field,it);
      if(cov?!t.includes(cov):!/[CUS]/.test(t))return false;
      if(sea&&it.s&&it.s!==sea)return false;
      return !pred||pred(it);
    });
    const fits=ok.filter(it=>it.f&&it.f.split(",").includes(look));
    if(fits.length)return fits;
    const anyLook=ok.filter(it=>!it.f);
    return anyLook.length||!(field==="top"||field==="bottom")?anyLook:ok;
  };
  const pickItem=(f,pred)=>{const a=pool(f,pred);return a.length?{v:pick1(a).v,c:"auto"}:null};
  const items={};
  Object.keys(L).forEach(f=>{if(f!=="*"&&!f.startsWith("d:")&&o.items[f])items[f]=o.items[f]});
  const dressTop=pool("top",it=>kindOf("top",it.v)==="dress");
  const dressP=sea==="w"?.12:.2;
  let useDress;
  if(items.top)useDress=kindOf("top",items.top.v)==="dress";
  else if(items.bottom)useDress=false;
  else useDress=!!dressTop.length&&Math.random()<dressP;
  if(!items.top){
    if(useDress&&dressTop.length)items.top={v:pick1(dressTop).v,c:"auto"};
    else{const t=pickItem("top",it=>kindOf("top",it.v)!=="dress"&&!/bodysuit|corset|bustier/.test(it.v));if(t)items.top=t}
  }
  if(!useDress&&!items.bottom){const b=pickItem("bottom",it=>!noLegs||!/pants|shorts|jeans|trousers|leggings/.test(it.v));if(b)items.bottom=b}
  const roll=(f,p,pred)=>{if(lockedItem(f))return;if(Math.random()<p){const x=pickItem(f,pred);if(x)items[f]=x}};
  const W=sea==="w",Sm=sea==="s";
  const corsetLooks=["gothic","edgy","glam","cyber","cottage"];
  if(!noLegs)roll("legwear",W?.75:Sm?.35:.55);
  if(!wings)roll("outerwear",W?.9:Sm?.25:.55);
  if(!useDress||corsetLooks.includes(look))roll("corset",corsetLooks.includes(look)?(useDress?.1:.3):.05);
  roll("belt",useDress?.15:.4);roll("waistAccessory",.3);
  roll("neckAccessory",.65);roll("wristAccessory",.5);
  roll("headwear",.55,it=>!hat||kindOf("headwear",it.v)!=="beret");
  roll("eyewear",.2);roll("gloves",W?.3:Sm?.04:.15);
  roll("tagCharm",.25);roll("hipAccessory",.45);
  roll("earAccessory",.65);roll("ringAccessory",.4);
  roll("pocketItem",.12);roll("loopItem",.15);roll("thighAccessory",.12);roll("kneeAccessory",.06);
  /* underwear is rolled too; it stays out of the prompt unless worn uncovered */
  roll("bra",.6);roll("panties",.6);
  const details={},dcol={};
  [["detailOne",.6],["detailTwo",.5],["detailThree",.45]].forEach(([f,p])=>{
    if(lockedDet(f)){if(o.details[f]){details[f]=o.details[f];if(o.dcol&&o.dcol[f])dcol[f]=o.dcol[f]}return}
    if(Math.random()<p){const a=pool(f);if(a.length)details[f]=pick1(a).v}
  });
  const holdsUnder=lockedItem("bra")||lockedItem("panties");
  o.items=items;o.details=details;o.dcol=dcol;if(!holdsUnder)o.showUnder=false;
  if(/^Outfit( \d+)?$|^.+ mix$/.test(o.name||""))o.name=ctx.info.look.split(/ & |, /)[0]+" mix";
}
function rollDesign(opts){
  const girl=!!(Policy.girlAge&&Policy.girlAge());
  const ctx0={steps:new Set(opts.steps),adult:!!opts.adult&&!girl,vibe:VIBES[opts.vibe]||VIBES.any};
  const nw=m=>m.replace(/\d+/g,"N"),snap=JSON.stringify(S),baseWarn=new Set(compose().checks.filter(c=>c.level==="warn").map(c=>nw(c.msg)));
  let best=null,bestN=1e9,bestCtx=null;
  mut(()=>{
    for(let t=0;t<8;t++){
      if(t)S=normalize(JSON.parse(snap));
      const ctx={...ctx0,did:[],skipped:[],info:{}};
      rollOnce(ctx);Policy.enforce();
      const n=compose().checks.filter(x=>x.level==="warn"&&!baseWarn.has(nw(x.msg))).length;
      if(n<bestN){bestN=n;best=JSON.stringify(S);bestCtx=ctx}
      if(!n)break;
    }
    if(best!==JSON.stringify(S))S=normalize(JSON.parse(best));
  });
  return bestCtx;
}
function rollNow(opts){
  opts=opts||{};
  const s=rndSettings();
  const steps=opts.steps||RND_STEPS.map(x=>x[0]).filter(id=>s.steps[id]);
  if(!steps.length){toast("Choose at least one step to randomize.");return null}
  const held=lockedInScope(steps);
  const ctx=rollDesign({steps,adult:opts.adult!=null?opts.adult:s.adult,vibe:opts.vibe||s.vibe});
  const msg=[];
  if(ctx.did.length)msg.push(`Randomized ${joinNatural(ctx.did.map(id=>RND_NAME[id]))}${ctx.info.look?` (${ctx.info.look})`:""}.`);
  else msg.push("Nothing to randomize. Everything you chose is locked.");
  if(ctx.skipped.length)msg.push(`Locked, so skipped: ${joinNatural(ctx.skipped.map(stepName))}.`);
  if(held&&ctx.did.length)msg.push(keptNote(held).trim());
  if(ctx.did.length)msg.push("Undo brings back the last design.");
  toast(msg.join(" "));
  return ctx;
}
function randomizeCharacter(mode){return rollNow({steps:["palette","face","hair","body","makeup"],adult:mode==="adult",vibe:"any"})}
function randomizeOutfit(){return rollNow({steps:["outfit"]})}
function rollFromBar(){
  const s=rndSettings();
  if(!s.seen){openRandomDialog();return}
  rollNow({});
}
function openRandomDialog(){
  const d=$("#rndDlg"),box=$("#rndBody");
  const s=rndSettings(),girl=!!(Policy.girlAge&&Policy.girlAge());
  const draft={steps:{...s.steps},vibe:VIBES[s.vibe]?s.vibe:"any",adult:!!s.adult&&!girl};
  const render=focusKey=>{
    const sc=box.scrollTop;box.textContent="";
    box.append(h("p",{class:"muted",text:"Rolls new options for the steps you choose. Anything you locked stays exactly as it is."}));
    box.append(sub("Steps to roll"));
    const chips=h("div",{class:"chips",role:"group","aria-label":"Steps to roll"});
    RND_STEPS.forEach(([id,label])=>{
      const fz=stepFrozen(id),on=!!draft.steps[id]&&!fz;
      chips.append(h("button",{type:"button","data-k":"s:"+id,class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",disabled:fz?true:null,title:fz?"This step is locked":null,
        onclick:()=>{draft.steps[id]=!draft.steps[id];render("s:"+id)},text:label+(fz?" (locked)":"")}));
    });
    box.append(chips);
    box.append(sub("Vibe","Steers the face, eyes, makeup, palette and outfit toward one look."));
    const vb=h("div",{class:"chips",role:"group","aria-label":"Vibe"});
    Object.entries(VIBES).forEach(([id,v])=>vb.append(h("button",{type:"button","data-k":"v:"+id,class:"chip"+(draft.vibe===id?" on":""),"aria-pressed":draft.vibe===id?"true":"false",onclick:()=>{draft.vibe=id;render("v:"+id)},text:v.label})));
    box.append(vb);
    box.append(h("label",{class:"chk big rndadult"+(girl?" off":"")},h("input",{type:"checkbox","data-k":"adult",checked:draft.adult?true:null,disabled:girl?true:null,onchange:e=>{draft.adult=e.target.checked;render("adult")}}),
      h("span",{},"Include adult options",h("small",{text:"Also draws from the sultry and full-figure options."}),girl?h("small",{class:"reason",text:"Not available for this age category"}):null)));
    /* what is locked */
    const ents=lockEntries();
    const det=h("details",{class:"lockmgr"+(ents.length?"":" empty")},h("summary",{text:ents.length?`Locked (${ents.length})`:"Nothing is locked"}));
    if(ents.length){
      det.open=!!draft.lockOpen;det.addEventListener("toggle",()=>{draft.lockOpen=det.open});
      det.append(h("p",{class:"muted small",text:"These stay as they are. Click one to unlock it."}));
      const lc=h("div",{class:"chips"});
      ents.forEach(e=>lc.append(h("button",{type:"button",class:"chip on",title:"Unlock",onclick:()=>{mut(e.off);render()},text:e.label+" ×"})));
      det.append(lc,h("div",{class:"btnrow"},h("button",{type:"button",class:"btn sm",onclick:()=>{mut(()=>{delete S.lock;S.outfits.forEach(o=>{delete o.lock})});render()},text:"Unlock all"})));
    }else det.append(h("p",{class:"muted small",text:"Lock an option with the padlock beside its name, or a whole step with Lock step, and Randomize will leave it alone."}));
    box.append(det);
    const any=RND_STEPS.some(([id])=>draft.steps[id]&&!stepFrozen(id));
    box.append(h("div",{class:"btnrow rndgo"},h("button",{type:"button","data-k":"go",class:"btn primary",disabled:any?null:true,onclick:()=>{saveRnd({steps:draft.steps,vibe:draft.vibe,adult:draft.adult,seen:true});d.close();rollNow({})},text:"Randomize"}),
      h("button",{type:"button",class:"btn",onclick:()=>{saveRnd({steps:draft.steps,vibe:draft.vibe,adult:draft.adult,seen:true});d.close()},text:"Save settings"}),
      any?null:h("span",{class:"muted small",text:"Every chosen step is locked or switched off."})));
    box.scrollTop=sc;
    if(focusKey){const el=box.querySelector(`[data-k="${focusKey}"]`);if(el&&!el.disabled)el.focus({preventScroll:true})}
  };
  render();d.showModal();
}
function inkOn(hex){
  const[R,G,B]=rgbOf(hex).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});
  return(.2126*R+.7152*G+.0722*B)>.215?"#1B2230":"#FBFCFC";
}
function icon(d,cls){
  const NS="http://www.w3.org/2000/svg",s=document.createElementNS(NS,"svg"),p=document.createElementNS(NS,"path");
  s.setAttribute("viewBox","0 0 16 16");s.setAttribute("aria-hidden","true");s.setAttribute("class","ic"+(cls?" "+cls:""));
  p.setAttribute("d",d);p.setAttribute("fill","none");p.setAttribute("stroke","currentColor");p.setAttribute("stroke-width","1.6");p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-linejoin","round");
  s.append(p);return s;
}
function slotUsage(){
  const use={},others={};SLOT_KEYS.forEach(k=>{use[k]=[];others[k]=0});
  const parts=v=>typeof v==="string"&&v[0]==="@"?v.split("+").filter(x=>x[0]==="@").map(x=>x.slice(1)).filter(k=>use[k]):[];
  const useLabel=f=>{
    if(STEP_FIELDS.hair.includes(f))return"Hair: "+labelOf(f).replace(/ color$/,"").toLowerCase();
    if(LABELS[f])return LABELS[f];
    if(/Color$/.test(f)&&LABELS[f.slice(0,-5)])return LABELS[f.slice(0,-5)]+" color";
    const w=f.replace(/([A-Z])/g," $1").toLowerCase();return w[0].toUpperCase()+w.slice(1);
  };
  Object.entries(S.c).forEach(([f,v])=>{
    const ks=parts(v);if(!ks.length)return;
    const lab=useLabel(f);
    ks.forEach(k=>use[k].push({label:lab,auto:false}));
  });
  const o=cur();
  Object.entries(o.items||{}).forEach(([f,it])=>{
    if(!it)return;const c=it.c==null?"auto":it.c,lab=OUT_LABEL[f]||f;
    if(c!=="-"&&!COLOR_RX.test(it.v||"")){
      if(c==="auto"){const sl=ROLE_AUTO[f];if(sl&&use[sl])use[sl].push({label:lab,auto:true})}
      else parts(c).forEach(k=>use[k].push({label:lab,auto:false}));
    }
    parts(it.c2).forEach(k=>use[k].push({label:lab+" accent",auto:false}));
  });
  Object.entries(o.dcol||{}).forEach(([f,v])=>parts(v).forEach(k=>use[k].push({label:(OUT_LABEL[f]||f)+" detail",auto:false})));
  S.outfits.forEach((ot,i)=>{
    if(i===S.cur)return;
    Object.entries(ot.items||{}).forEach(([f,it])=>{
      if(!it)return;const c=it.c==null?"auto":it.c;if(c==="-"||COLOR_RX.test(it.v||""))return;
      if(c==="auto"){const sl=ROLE_AUTO[f];if(sl&&use[sl])others[sl]++}else parts(c).forEach(k=>others[k]++);
    });
  });
  return{use,others};
}
function palDots(){return h("span",{class:"pdots","aria-hidden":"true"},...SLOTS.map(([k])=>{const hx=slotHex(k);return h("i",{class:hx?"":"e",style:hx?`background:${hx}`:null})}))}
function selectSlot(k){palSel=k;palFocus=`.pseg[data-slot="${k}"]`;renderMain()}
function paletteBand(){
  const band=h("div",{class:"pband",role:"group","aria-label":"Palette. Choose a color to edit it."});
  SLOTS.forEach(([k,l],i)=>{
    const n=S.pal[k],hex=slotHex(k),on=palSel===k,lk=palLocked(k);
    band.append(h("button",{type:"button",class:"pseg"+(n?"":" empty")+(on?" on":""),"data-slot":k,"aria-pressed":on?"true":"false",
      "aria-label":`${l}: ${n||"empty"}${lk?", locked":""}. ${on?"Selected":"Select to edit"}`,title:n?`${l}: ${n}`:`${l}: add a color`,
      style:`flex-grow:${n?PAL_W[i]:.8}`+(hex?`;background:${hex};color:${inkOn(hex)}`:""),onclick:()=>selectSlot(k)},
      h("span",{class:"sl"},h("span",{class:"slt",text:l}),lk?lockIcon(true):null),
      h("span",{class:"nm",text:n||"+ Add"})));
  });
  band.addEventListener("keydown",e=>{
    if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;
    const i=SLOT_KEYS.indexOf(palSel),j=Math.max(0,Math.min(SLOT_KEYS.length-1,i+(e.key==="ArrowRight"?1:-1)));
    e.preventDefault();if(j!==i)selectSlot(SLOT_KEYS[j]);
  });
  return band;
}
function palShuffle(){
  const ks=SLOT_KEYS.filter(k=>S.pal[k]&&!palLocked(k));
  if(ks.length<2){toast(ks.length?"Unlock another color to shuffle.":"Add a few colors to shuffle.");return}
  const vals=ks.map(k=>S.pal[k]);let perm=vals.slice(),tries=0;
  do{perm=vals.slice();for(let i=perm.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[perm[i],perm[j]]=[perm[j],perm[i]]}tries++}while(perm.join("|")===vals.join("|")&&tries<12);
  mut(()=>{ks.forEach((k,i)=>{S.pal[k]=perm[i]})},"palshuffle");
  toast("Colors moved between roles. Undo brings them back.");
}
function palClear(){
  mut(()=>{SLOT_KEYS.forEach(k=>{if(!palLocked(k))S.pal[k]=""})},"palclear");
}
function palMove(k,dir){
  const i=SLOT_KEYS.indexOf(k),j=i+dir;if(j<0||j>=SLOT_KEYS.length)return;const o=SLOT_KEYS[j];
  palSel=o;palFocus=`.pseg[data-slot="${o}"]`;
  mut(()=>{const a=S.pal[k],b=S.pal[o],la=isLocked("pal:"+k),lb=isLocked("pal:"+o);S.pal[k]=b;S.pal[o]=a;setLockFlag(k,lb);setLockFlag(o,la)});
}
function palSet(k,name,focusSel){palFocus=focusSel||"";mut(()=>{S.pal[k]=name},"pal"+k)}
function palActions(){
  const names=SLOT_KEYS.map(k=>S.pal[k]).filter(Boolean),locks=SLOT_KEYS.filter(palLocked).length;
  return h("div",{class:"btnrow pacts2"},
    h("button",{type:"button",class:"btn",onclick:palSurprise,text:"Surprise me",title:"Fill the unlocked slots from a finished palette"}),
    h("button",{type:"button",class:"btn",onclick:palShuffle,text:"Shuffle roles",title:"Swap which slot holds which color"}),
    h("button",{type:"button",class:"btn",disabled:names.length?null:true,onclick:e=>copyText(names.join(", "),e.currentTarget,"Colors copied"),text:"Copy colors"}),
    h("button",{type:"button",class:"btn",disabled:SLOT_KEYS.some(k=>S.pal[k]&&!palLocked(k))?null:true,onclick:palClear,text:locks?"Clear unlocked":"Clear palette"}));
}
function hueToward(h0,t,amt){const d=((t-h0+540)%360)-180;return(h0+Math.sign(d)*Math.min(Math.abs(d),amt)+360)%360}
function slotShades(k){
  const hex=slotHex(k);if(!hex)return[];
  const b=hsl(hex),used=SLOT_KEYS.map(s=>S.pal[s]).filter(Boolean),neutral=b.s<.1,tint=Math.max(b.s,.16);
  const defs=[["Lighter",{h:b.h,s:b.s,l:Math.min(.95,b.l+.14)}],["Deeper",{h:b.h,s:b.s,l:Math.max(.1,b.l-.14)}]];
  if(!neutral)defs.push(["Softer",{h:b.h,s:b.s*.55,l:b.l}],["Richer",{h:b.h,s:Math.min(.95,b.s+.25),l:b.l}]);
  defs.push(["Warmer",{h:hueToward(b.h,35,28),s:tint,l:b.l}],["Cooler",{h:hueToward(b.h,220,28),s:tint,l:b.l}]);
  const seen=new Set(used),out=[];
  defs.forEach(([label,t])=>{const c=nearestColors(t,[...seen],1)[0];if(c){seen.add(c);out.push({label,name:c})}});
  return out;
}
function slotMatches(k){
  const bk=SLOT_KEYS.find(s=>s!==k&&slotHex(s));if(!bk)return{base:"",list:[]};
  const b=hsl(slotHex(bk)),bs=b.s<.12?.5:b.s,used=SLOT_KEYS.map(s=>S.pal[s]).filter(Boolean);
  const defs=[["Analogous",{h:(b.h+30)%360,s:bs,l:b.l}],["Complement",{h:(b.h+180)%360,s:bs,l:b.l}],["Triad",{h:(b.h+120)%360,s:bs,l:b.l}],["Pale neutral",{h:b.h,s:.08,l:.9}],["Deep neutral",{h:b.h,s:.1,l:.2}]];
  const seen=new Set(used),list=[];
  defs.forEach(([label,t])=>{const c=nearestColors(t,[...seen],1)[0];if(c){seen.add(c);list.push({label,name:c})}});
  return{base:S.pal[bk],list};
}
function slotEditor(k,usage){
  const l=slotLabel(k),n=S.pal[k],hex=slotHex(k),lk=palLocked(k),own=isLocked("pal:"+k),fz=stepFrozen("palette"),i=SLOT_KEYS.indexOf(k),cnt=usage.use[k].length;
  const box=h("section",{class:"pedit","aria-label":l+" color",style:hex?`--sc:${hex}`:null});
  const fsel=`.pedit .lockbtn`;
  box.append(h("div",{class:"ph"},
    h("div",{class:"pbig"+(hex?"":" empty"),style:hex?`background:${hex}`:null,"aria-hidden":"true"}),
    h("div",{class:"pmeta"},h("small",{text:l}),h("b",{text:n||"Not chosen yet"}),
      h("small",{text:n?(cnt?`Used in ${cnt} place${cnt>1?"s":""}`:"Nothing uses this yet"):"Pick a color below"})),
    h("div",{class:"pacts"},
      h("button",{type:"button",class:"btn sm lockbtn"+(lk?" on":""),"aria-pressed":lk?"true":"false",disabled:n&&!fz?null:true,
        title:fz?"Locked with the whole Palette step. Unlock the step to change this.":"A locked color is kept by Surprise me, Shuffle roles, Randomize, the library, suggestions and starting points.",
        onclick:()=>{palFocus=fsel;mut(()=>setLockFlag(k,!own),"pallock")}},lockIcon(lk),fz?"Locked with step":lk?"Locked":"Lock"),
      h("button",{type:"button",class:"btn sm",disabled:n&&i>0?null:true,onclick:()=>palMove(k,-1),title:"Swap with the slot before it",text:"Move earlier"}),
      h("button",{type:"button",class:"btn sm",disabled:n&&i<SLOT_KEYS.length-1?null:true,onclick:()=>palMove(k,1),title:"Swap with the slot after it",text:"Move later"}),
      h("button",{type:"button",class:"btn sm",disabled:n?null:true,onclick:()=>{palFocus=`.pseg[data-slot="${k}"]`;mut(()=>{S.pal[k]="";setLockFlag(k,false)})},text:"Clear"}))));
  /* quick picks */
  const quick=n?slotShades(k):slotMatches(k).list;
  if(quick.length){
    const mb=n?"":slotMatches(k).base;
    box.append(h("div",{class:"plabel",text:n?`Nearby shades of ${n}`:`Goes with ${mb}`}));
    const row=h("div",{class:"shades"});
    quick.forEach(q=>row.append(h("button",{type:"button",class:"shade","data-c":q.name,title:`${q.label}: ${q.name}`,"aria-label":`${q.label}: ${q.name}`,
      onclick:()=>palSet(k,q.name,`.pedit .shade[data-c="${q.name}"]`)},h("i",{style:`background:${nameHex(q.name)}`}),h("span",{text:q.label}))));
    box.append(row);
  }
  box.append(h("div",{class:"pickrow"},h("button",{type:"button",class:"btn","aria-haspopup":"dialog","aria-expanded":"false",
    onclick:e=>colorPop(e.currentTarget,{title:l+" color",current:n,slotLinks:false,onPick:x=>palSet(k,x)}),text:"Search all colors or type your own"})));
  /* everyday swatches */
  const mine=(CUSTOM.__colors||[]).filter(c=>!EVERYDAY_SET.has(c)),all=[...EVERYDAY,...mine];
  const grid=h("div",{class:"swgrid pin"});
  all.forEach(c=>grid.append(h("button",{type:"button",class:"swb"+(n===c?" on":""),"data-c":c,title:c,"aria-label":c,"aria-pressed":n===c?"true":"false",style:`--c:${nameHex(c)||"#bbb"}`,
    onclick:()=>palSet(k,c,`.pgrid-d .swb[data-c="${c.replace(/"/g,'\\"')}"]`)})));
  const gd=h("details",{class:"pgrid-d",ontoggle:e=>{palGridOpen=e.target.open}},h("summary",{text:"Everyday colors"}),grid);
  if(palGridOpen)gd.open=true;
  box.append(gd);
  return box;
}
function paletteMap(usage){
  const box=h("div",{class:"pmap"},sub("Where the colors land","What each color is painting right now. Dashed chips take their color from the slot on their own (Auto)."));
  const filled=SLOTS.filter(([k])=>S.pal[k]);
  if(!filled.length){box.append(h("p",{class:"muted small",text:"Once you choose colors, you will see here which hair, eye and outfit fields use each one."}));return box}
  filled.forEach(([k,l])=>{
    const u=usage.use[k],oth=usage.others[k],hex=slotHex(k);
    const chips=h("div",{class:"uses"});
    u.forEach(x=>chips.append(h("span",{class:"use"+(x.auto?" auto":""),text:x.label})));
    if(oth)chips.append(h("span",{class:"use other",text:`${oth} piece${oth>1?"s":""} in other outfits`}));
    if(!u.length&&!oth)chips.append(h("span",{class:"pmnone",text:"Nothing uses this yet."}));
    box.append(h("div",{class:"pmrow"+(palSel===k?" on":"")},
      h("button",{type:"button",class:"pmhead","aria-pressed":palSel===k?"true":"false",onclick:()=>selectSlot(k),title:"Edit "+l.toLowerCase()},
        h("i",{style:`background:${hex}`}),h("span",{},h("small",{text:l}),h("b",{text:S.pal[k]}))),
      chips));
  });
  if(S.pal.accent)box.append(h("p",{class:"pmleg",text:"Piece accents and small details left on Auto lean on the Accent slot."}));
  return box;
}
function alikeNote(){
  const f=SLOTS.filter(([k])=>slotHex(k));let best=null;
  for(let i=0;i<f.length;i++)for(let j=i+1;j<f.length;j++){const d=colorDist(slotHex(f[i][0]),slotHex(f[j][0])),lim=f[i][0]==="primary"&&f[j][0]==="secondary"?85:45;if(d<lim&&(!best||d<best.d))best={d,a:f[i],b:f[j]}}
  if(!best)return null;
  return h("p",{class:"callout"},`${best.a[1]} (${S.pal[best.a[0]]}) and ${best.b[1].toLowerCase()} (${S.pal[best.b[0]]}) look very alike. A bit more contrast between them helps the design read. `,
    h("button",{type:"button",class:"btn sm",onclick:()=>selectSlot(best.b[0]),text:"Edit "+best.b[1].toLowerCase()}));
}
function stepPalette(){
  const f=document.createDocumentFragment(),usage=slotUsage();
  if(!SLOT_KEYS.includes(palSel))palSel="primary";
  f.append(sub("Your palette","Pick a color to edit it. Widths show how much of a design each role usually covers."));
  f.append(paletteBand());
  f.append(palActions());
  if(!SLOT_KEYS.some(k=>S.pal[k]))f.append(h("p",{class:"callout"},"No colors yet. Choose a primary color below, press Surprise me, or start from a finished palette. ",
    h("button",{type:"button",class:"btn sm",onclick:()=>{palLibOpen=true;renderMain();const d=$(".palib-d");d&&d.scrollIntoView({behavior:"smooth",block:"start"})},text:"Browse finished palettes"})));
  f.append(slotEditor(palSel,usage));
  const al=alikeNote();if(al)f.append(al);
  f.append(paletteMap(usage));
  f.append(sub("Make it follow the palette","Hair and eye colors can follow a slot, so changing the palette later updates them."));
  f.append(h("div",{class:"btnrow"},
    h("button",{type:"button",class:"btn",onclick:()=>{let n=0;mut(()=>{n=bulkSet(null,{hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@accent"})});if(n)toast("Hair follows the palette."+keptNote(n))},text:"Hair follows palette"}),
    h("button",{type:"button",class:"btn",onclick:()=>{let n=0;mut(()=>{n=bulkSet(["eyeTwo"],{eyeOne:"@accent",eyeConfig:"matching"})});if(n)toast("Eyes follow the accent."+keptNote(n))},text:"Eyes follow accent"}),
    h("button",{type:"button",class:"btn",onclick:()=>{const l=cur();let n=0;mut(()=>{OUT_ITEM_FIELDS.forEach(k=>{if(!l.items[k])return;if(kept("o:"+k)){n++;return}l.items[k].c="auto";delete l.items[k].c2});Object.keys(l.dcol||{}).forEach(d=>{if(kept("d:"+d)){n++;return}delete l.dcol[d]})});if(n)toast("Outfit colors reset."+keptNote(n))},text:"Reset outfit colors to auto"})));
  const pd=h("details",{class:"palib-d",ontoggle:e=>{palLibOpen=e.target.open}},h("summary",{text:"Palette library (finished five-color palettes)"}),paletteLibrary());if(palLibOpen)pd.open=true;
  f.append(pd);
  f.append(harmonyBox());
  if(palFocus){const sel=palFocus;palFocus="";setTimeout(()=>{const el=document.querySelector(sel);if(el&&!el.disabled)el.focus({preventScroll:true})},0)}
  return f;
}
function hsl(hex){const[r,g,b]=rgbOf(hex).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let hh=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60}return{h:hh,s,l}}
function nearestColors(target,exclude,n){
  const sc=PAL_POOL.filter(c=>!exclude.includes(c)).map(c=>{const x=hsl(COLORS[c]);let dh=Math.abs(x.h-target.h);dh=Math.min(dh,360-dh)/180;const d=(dh*(target.s<.12?.2:1.6))**2+(x.s-target.s)**2*.8+(x.l-target.l)**2*1.4+(EVERYDAY_SET.has(c)?0:.004);return{c,d}}).sort((a,b)=>a.d-b.d);
  return sc.slice(0,n).map(x=>x.c);
}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
function moodAdjust(t,m){
  const c=(v,a,b)=>Math.max(a,Math.min(b,v));
  if(m==="soft")return{h:t.h,s:c(t.s*.65,.18,.5),l:Math.max(t.l,.78)};
  if(m==="light")return{h:t.h,s:c(t.s,.05,.4),l:Math.max(t.l,.86)};
  if(m==="muted")return{h:t.h,s:Math.min(t.s,.3),l:c(t.l,.3,.72)};
  if(m==="vivid")return{h:t.h,s:Math.max(t.s,.78),l:c(t.l,.42,.62)};
  if(m==="deep")return{h:t.h,s:Math.min(t.s,.62),l:Math.min(t.l,.3)};
  return t;
}
function harmonyBaseName(){
  const k=harmony.from;
  return k==="hair"?g("hairBase"):k==="eye"?(g("eyeOne")||g("eyeTwo")).replace(/\s*eye$/i,""):(S.pal[k]||"");
}
function suggestSets(){
  const base=harmonyBaseName()||S.pal.primary||S.pal.secondary;if(!base||!COLORS[base])return[];
  const b=hsl(COLORS[base]),R=rng(harmony.seed*7919+13);
  const offs={analogous:[30,-30,60],complementary:[180,150,210],triadic:[120,240,180],split:[150,210,180],tetradic:[90,180,270],mono:[0,0,0],accent:[0,0,180]}[harmony.scheme];
  const tones=[[0,0],[.14,-.1],[-.16,.06],[.08,.14],[-.08,-.14],[.2,.04]];
  const sets=[],seen=new Set();
  tones.forEach(([dl,ds],i)=>{
    const jit=(harmony.seed>0||i>=3)?(R()*50-25):0;
    const used=[base],out=[];
    offs.forEach((o,k)=>{
      let t;
      if(harmony.scheme==="accent")t=[{h:b.h,s:.07,l:.9},{h:b.h,s:.06,l:.22},{h:b.h+180+jit,s:.7,l:.55+dl/2}][k];
      else t={h:(b.h+o+jit+720)%360,s:Math.max(.05,Math.min(.92,b.s+ds+(k===2?.1:0))),l:Math.max(.12,Math.min(.92,b.l+dl+(harmony.scheme==="mono"?(k-1)*.18:0)))};
      t=moodAdjust(t,harmony.mood);
      const c=nearestColors({h:(t.h+360)%360,s:t.s,l:t.l},used,1)[0];if(c){used.push(c);out.push(c)}
    });
    const extraT=moodAdjust({h:b.h+(harmony.scheme==="mono"?0:15),s:.1,l:b.l>.5?.18:.92},harmony.mood==="vivid"?"any":harmony.mood);
    const neutral=nearestColors(extraT,used,1)[0]||(b.l>.5?"charcoal gray":"cream");if(!used.includes(neutral))out.push(neutral);
    const key=out.join("|");if(!seen.has(key)){seen.add(key);sets.push(out.slice(0,4))}
  });
  return sets;
}
function harmonyPlan(set,fromKey){
  const plan={},free=k=>!palLocked(k);
  if(SLOT_KEYS.includes(fromKey)){const targets=SLOT_KEYS.filter(s=>s!==fromKey&&free(s));set.forEach((c,i)=>{if(targets[i])plan[targets[i]]=c})}
  else{const all=[harmonyBaseName(),...set];SLOT_KEYS.forEach((k,i)=>{if(all[i]&&free(k))plan[k]=all[i]})}
  return plan;
}
function applyPaletteSet(set,fromKey){
  const plan=harmonyPlan(set,fromKey);
  mut(()=>{Object.entries(plan).forEach(([k,c])=>{S.pal[k]=c})},"palsug");
  const kept=SLOT_KEYS.filter(palLocked).length;if(kept)toast(`Suggestion applied. ${kept} locked ${kept>1?"colors":"color"} kept.`);
}
function harmonyBox(){
  const mk=(label,opts,val,fn)=>h("select",{"aria-label":label,onchange:e=>{fn(e.target.value);renderMain()}},opts.map(([v,l])=>h("option",{value:v,selected:val===v?true:null,text:l})));
  const fromOpts=[...SLOTS.filter(([k])=>S.pal[k]).map(([k,l])=>[k,"from "+l.toLowerCase()+": "+S.pal[k]])];
  if(g("hairBase"))fromOpts.push(["hair","from hair color: "+g("hairBase")]);
  if(g("eyeOne")||g("eyeTwo"))fromOpts.push(["eye","from eye color: "+(g("eyeOne")||g("eyeTwo"))]);
  if(!fromOpts.length)SLOTS.forEach(([k,l])=>fromOpts.push([k,"from "+l.toLowerCase()]));
  if(!fromOpts.some(o=>o[0]===harmony.from))harmony.from=fromOpts[0][0];
  const box=h("div",{class:"harmony"},h("div",{class:"sub"},h("h3",{text:"Palette suggestions"}),h("p",{text:"Suggests colors that work with the one you choose. Nothing changes until you press Apply."+(SLOT_KEYS.some(palLocked)?" Locked colors are skipped.":"")})),
    h("div",{class:"btnrow"},mk("Harmony scheme",SCHEMES,harmony.scheme,v=>harmony.scheme=v),mk("Mood",MOODS,harmony.mood,v=>harmony.mood=v),mk("Base color",fromOpts,harmony.from,v=>harmony.from=v),
      h("button",{type:"button",class:"btn sm",onclick:()=>{harmony.seed++;renderMain()},text:"Show different ones"})));
  const sets=suggestSets();
  if(!sets.length)box.append(h("p",{class:"muted",text:"Choose a base color above to see suggestions."}));
  sets.forEach(set=>{
    const plan=harmonyPlan(set,harmony.from);
    box.append(h("div",{class:"sugg"},
      h("div",{class:"strip","aria-hidden":"true"},...SLOTS.map(([k,l],i)=>{const nm=plan[k]||S.pal[k],hx=nameHex(nm),keep=palLocked(k)&&!plan[k];return h("i",{class:(hx?"":"e")+(keep?" keep":""),style:`flex-grow:${PAL_W[i]}`+(hx?`;background:${hx}`:""),title:nm?`${l}: ${nm}`+(keep?" (locked)":""):l})})),
      h("span",{class:"names",text:set.join(", ")}),
      h("button",{type:"button",class:"btn sm",onclick:()=>applyPaletteSet(set,harmony.from),text:"Apply"})));
  });
  return box;
}
function paletteLibrary(){
  const box=h("div",{class:"palib"},h("div",{class:"sub"},h("h3",{text:"Palette library"}),h("p",{text:`Finished five-color palettes. Tap one to fill every ${SLOT_KEYS.some(palLocked)?"unlocked ":""}slot. Undo brings back yours.`})));
  const bar=h("div",{class:"chips"});
  PALETTE_MOODS.forEach(([v,l])=>bar.append(h("button",{type:"button",class:"chip"+(palMood===v?" on":""),"aria-pressed":palMood===v?"true":"false",onclick:()=>{palMood=v;renderMain()},text:l})));
  bar.append(h("button",{type:"button",class:"chip more",onclick:()=>{const pool=PALETTE_LIBRARY.filter(p=>palMood==="all"||p.m===palMood);applyLibrary(pool[Math.floor(Math.random()*pool.length)])},text:"Surprise me"}));
  box.append(bar);
  const grid=h("div",{class:"palgrid"});
  PALETTE_LIBRARY.filter(p=>palMood==="all"||p.m===palMood).forEach(p=>{
    const isCur=SLOT_KEYS.every((k,i)=>(S.pal[k]||"")===(p.c[i]||""));
    grid.append(h("button",{type:"button",class:"palcard"+(isCur?" cur":""),onclick:()=>applyLibrary(p),"aria-label":`${p.n}: ${p.c.join(", ")}`+(isCur?". Current palette":"")},
      h("div",{class:"strip"},...p.c.map((c,i)=>h("i",{style:`background:${COLORS[c]};flex-grow:${PAL_W[i]}`,title:c}))),
      h("div",{class:"pcn"},h("b",{text:p.n}),isCur?h("small",{class:"curtag",text:"Current"}):null),h("span",{text:p.c.slice(0,3).join(", ")})))});
  box.append(grid);return box;
}
function applyLibrary(p){
  if(SLOT_KEYS.every(palLocked)){toast("All five colors are locked.");return}
  let kept=0;
  mut(()=>{SLOTS.forEach(([k],i)=>{if(palLocked(k)){kept++;return}S.pal[k]=p.c[i]||""})},"palib");
  toast(`Palette set to “${p.n}”.`+(kept?` ${kept} locked ${kept>1?"colors":"color"} kept.`:""));
}
function chipGroups(groups,PRESETS,make,extra){
  const wrap=h("div",{class:"pgroups"}),listed=new Set(groups.flatMap(g=>g.keys));
  const all=groups.concat([{label:"More",keys:Object.keys(PRESETS).filter(k=>!listed.has(k))}]);
  all.forEach(g=>{const keys=g.keys.filter(k=>PRESETS[k]);if(!keys.length)return;
    wrap.append(h("div",{class:"pgroup"},h("small",{class:"pgl",text:g.label}),h("div",{class:"chips"},keys.map(k=>make(k,PRESETS[k])))))});
  if(extra)wrap.append(h("div",{class:"pgroup"},extra));
  return wrap;
}
function presetRow(id,PRESETS,groups,apply,clearFn,clearLabel,hint,opts){
  opts=opts||{};
  const listed=new Set(groups.flatMap(g=>g.keys));
  const all=groups.concat([{label:"More",keys:Object.keys(PRESETS).filter(k=>!listed.has(k))}]);
  const sections=()=>all.map(g=>({name:g.label,items:g.keys.filter(k=>PRESETS[k]&&presetSexOk(PRESETS[k])).map(k=>{const p=PRESETS[k],ok=opts.noCheck?true:presetAvailable(p);
    return{v:k,label:p.label||p.name,sub:p.blurb||"",dis:ok?null:(Policy.presetNote(p)||"Not available for this age category")}})})).filter(sc=>sc.items.length);
  const btn=h("button",{type:"button",class:"pick","aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>openPop(e.currentTarget,{title:opts.title||"Presets",current:null,stack:!!(opts.noCheck||opts.stack),sections:sections(),
    top:[{label:clearLabel,fn:clearFn}],onPick:k=>apply(k,PRESETS[k])})},h("span",{text:"Choose a preset…"}),h("i",{class:"caret","aria-hidden":"true"}));
  return row("preset:"+id,"Preset",h("div",{class:"pickwrap"},btn),hint,"presetrow");
}
function presetBar(PRESETS,FIELDS,clearLabel,key,groups){
  const st=stepOf(FIELDS[0]);
  const run=(vals,done)=>{
    if(stepFrozen(st)){toast(`${stepName(st)} is locked. Unlock the step to change it.`);return}
    let held=0;mut(()=>{held=bulkSet(FIELDS,vals)},key);
    if(held)toast(done+keptNote(held));
  };
  return presetRow(key,PRESETS,groups,(k,p)=>run(p.v,"Preset loaded."),()=>run(null,"Cleared."),clearLabel,PRESET_HINTS[key],{title:"Presets"});
}
function presetBarOld(PRESETS,FIELDS,clearLabel,key,groups){
  return chipGroups(groups,PRESETS,(k,p)=>{const ok=presetAvailable(p);return h("button",{type:"button",class:"chip preset",disabled:ok?null:true,title:Policy.presetNote(p),onclick:()=>mut(()=>{FIELDS.forEach(i=>delete S.c[i]);Object.assign(S.c,p.v)},key),text:p.label})},
    h("button",{type:"button",class:"chip more",onclick:()=>mut(()=>{FIELDS.forEach(i=>delete S.c[i])}),text:clearLabel}));
}
function stepFace(){
  const f=document.createDocumentFragment();f.append(narrCallout("face")||"");
  f.append(sub("Heritage","Natural, realistic human looks by background. Sets face, eyes, eye color, skin tone, hair color and hair texture. Change anything afterward."));
  f.append(presetRow("hpreset",HERITAGE,PRESET_GROUPS.heritage,(k,p)=>applyHeritage(p),()=>{let n=0;mut(()=>{n=bulkSet(HERITAGE_CLEAR,null)});if(n)toast("Heritage cleared."+keptNote(n))},"Clear heritage","Hair style, expression and body proportions are not changed.",{title:"Heritage presets",stack:true}));
  f.append(sub("Face"));
  f.append(narrDim(presetBar(FACE_PRESETS,FACE_FIELDS,"Clear face","fpreset",PRESET_GROUPS.face)));["faceShape","expression","browShape","noseShape","mouthShape","faceMark","impression"].forEach(id=>f.append(fieldRow(id)));
  if(isMale()||SEXPREF.both){f.append(fieldRow("facialHair"));f.append(colorRow("facialHairColor","Beard or stubble color. Leave empty to match the hair."))}
  f.append(sub("Eyes"));
  f.append(presetBar(EYE_PRESETS,EYE_FIELDS,"Clear eyes","epreset",PRESET_GROUPS.eye));
  ["eyeShape","scleraStyle"].forEach(id=>f.append(fieldRow(id)));f.append(colorRow("scleraColor","Colors the sclera. Leave empty for the default eye whites."));["pupilStyle","irisDetail","lashNatural","eyeConfig"].forEach(id=>f.append(fieldRow(id)));
  f.append(colorRow("eyeOne"));f.append(colorRow("eyeTwo","Only needed for two-color eye setups."));
  return f;
}
function stepHair(){
  const f=document.createDocumentFragment();
  f.append(sub("Cut and shape"));
  ["hairStyle","hairLength","hairTexture","bangs","hairMovement"].forEach(id=>f.append(fieldRow(id,{forcePick:id==="hairStyle"||id==="bangs"||id==="hairMovement"||id==="hairTexture"||id==="hairLength"})));
  f.append(sub("Color","Each can follow a palette slot."));
  ["hairBase","hairUnderlayer","hairInner","hairHighlights"].forEach(id=>f.append(colorRow(id)));
  f.append(fieldRow("hairBlend",{forcePick:true,hint:"How the colors meet. Leave empty for the automatic base-to-highlight blend."}));
  return f;
}
function applyHeritage(p){
  let held=0;mut(()=>{held=bulkSet(HERITAGE_CLEAR,p.v)},"hpreset");
  toast(`Loaded “${p.label}”. Face, eyes, skin, hair color and hair texture are set; hair style and body stay yours.`+keptNote(held));
}
function skinTok(text,col){
  if(!text)return"";let t=text;
  if(col){t=t.replace(/\b(a|an) \{c\}/gi,()=>`${anA(col)} ${col}`).replace(/\{c\}/g,col)}
  else t=t.replace(/\{c\}-?\s?/g,"");
  return t.replace(/\s{2,}/g," ").replace(/\s+,/g,",").trim();
}
function skinHex(v){const n=rc(v||"");return n?(SKIN_HEX[n]||hexFor(n)||Sprite.hexFor(n)||null):null}
function skinColorControl(id){
  const v=S.c[id],set=v!=null&&v!=="",name=rc(v||""),hex=skinHex(v),link=set&&v[0]==="@"?v.slice(1):"";
  const b=h("button",{type:"button",class:"pick color"+(set?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>skinPop(id,e.currentTarget)},
    h("i",{class:"sw big"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),
    h("span",{text:set?(name||"(empty slot)"):"Choose…"}),link?h("small",{class:"link",text:"follows "+link}):null,h("i",{class:"caret","aria-hidden":"true"}));
  const wrap=h("div",{class:"pickwrap"},b);
  if(set)wrap.append(h("button",{type:"button",class:"clear","aria-label":"Clear "+LABELS[id],title:"Clear",onclick:()=>setC(id,""),text:"×"}));
  return wrap;
}
function skinPop(id,anchor){
  const cur=S.c[id],top=[],opts=optionList(id),secs=[],by=new Map(),seen=new Set();
  SLOTS.forEach(([k,l])=>top.push({label:`Follow ${l.toLowerCase()}`,hex:S.pal[k]?skinHex(S.pal[k]):null,on:cur==="@"+k,fn:()=>setC(id,"@"+k)}));
  if(cur!=null&&cur!=="")top.push({label:"Clear",fn:()=>setC(id,"")});
  opts.forEach(o=>{const k=o.g||"Options";if(!by.has(k)){by.set(k,[]);secs.push({name:k,items:by.get(k)})}by.get(k).push({v:o.v,hex:skinHex(o.v)});seen.add(o.v)});
  colorSections().forEach(sc=>{const items=sc.items.filter(i=>!seen.has(i.v));if(items.length)secs.push({name:"Any color: "+sc.name.toLowerCase(),items})});
  openPop(anchor,{title:LABELS[id],current:cur,sections:secs,top,searchPlaceholder:"Search tones and colors",onPick:v=>setC(id,v),
    custom:{placeholder:"Type your own "+LABELS[id].toLowerCase(),save:true,use:(t,s)=>{if(s)addCustom(id,t);setC(id,t)}}});
}
function skinRows(){
  const R=[];
  R.push(row("skinTone",LABELS.skinTone,skinColorControl("skinTone"),"Natural tone, a color, or follow a palette slot"));
  R.push(row("undertone",LABELS.undertone,skinColorControl("undertone"),"Warm, cool, or a color"));
  R.push(fieldRow("skinFinish",{forcePick:true}));
  R.push(colorRow("finishColor","Tints glows and sheens. Leave empty for none."));
  R.push(fieldRow("markings",{forcePick:true}));
  R.push(colorRow("markingColor","Colors the markings. Leave empty to use the markings as written."));
  return R;
}
function fillItem(v,c,c2){const inline=/\{c\}/.test(v);let t=v;if(inline){t=c?t.replace(/\b(a|an) \{c\}/gi,()=>anA(c)+" "+c).replace(/\{c\}/g,c):t.replace(/\{c\}-and-/g,"").replace(/\{c\}-?\s?/g,"")}return{t:fillC2(t,c2).replace(/\s{2,}/g," ").trim(),inline}}
function fillC2(t,col){const c=rc(col||"");if(!c)return t.replace(/\{c2\}/g,"contrast");return t.replace(/\b(a|an) \{c2\}/gi,(m,a)=>anA(c)+" "+c).replace(/\{c2\}/g,c)}
function fillD(v,col){if(!v)return"";const c=rc(col||"");if(!c)return skinTok(v,"");return v.replace(/\b(a|an) \{c\}/gi,()=>anA(c)+" "+c).replace(/\{c\}/g,c)}
function itemColor2Button(field,it){
  const c=rc(it.c2||""),hex=c?(hexFor(c)||Sprite.hexFor(c)):null,link=it.c2&&it.c2[0]==="@"?it.c2.slice(1):"";
  return h("button",{type:"button",class:"pick color mini","aria-haspopup":"dialog","aria-expanded":"false",title:"Second color for "+OUT_LABEL[field],
    onclick:e=>colorPop(e.currentTarget,{title:`${OUT_LABEL[field]} accent color`,current:it.c2||null,
      extraTop:[{label:"No color word",on:!it.c2,fn:()=>mut(()=>{delete cur().items[field].c2})}],
      onPick:x=>mut(()=>{cur().items[field].c2=x})})},
    h("i",{class:"sw"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),h("span",{text:c?"accent: "+c:"accent color"}),link?h("small",{class:"link",text:"follows "+link}):null);
}
function detailColorButton(field){
  const o=cur(),cv=(o.dcol||{})[field]||"",c=rc(cv),hex=c?(hexFor(c)||Sprite.hexFor(c)):null,link=cv&&cv[0]==="@"?cv.slice(1):"";
  return h("button",{type:"button",class:"pick color mini","aria-haspopup":"dialog","aria-expanded":"false",title:"Color for "+OUT_LABEL[field],
    onclick:e=>colorPop(e.currentTarget,{title:`${OUT_LABEL[field]} color`,current:cv||null,
      extraTop:[{label:"No color word",on:!cv,fn:()=>mut(()=>{cur().dcol=cur().dcol||{};delete cur().dcol[field]})}],
      onPick:x=>mut(()=>{cur().dcol=cur().dcol||{};cur().dcol[field]=x})})},
    h("i",{class:"sw"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),h("span",{text:c||"color"}),link?h("small",{class:"link",text:"follows "+link}):null);
}
function autoAccent(main){const m=String(main||"").toLowerCase();for(const k of ["accent","secondary","third","extra","primary"]){const v=S.pal[k];if(v&&String(v).toLowerCase()!==m)return{k,v}}return{k:"",v:""}}
function accentFor(f,it){if(!/\{c2\}/.test(it.v))return"";const c2=it.c2;if(c2==="-")return"";if(c2&&c2!=="auto")return rc(c2);return autoAccent(itemColor(f,it)).v}
function dcolFor(o,f){const v=(o.dcol||{})[f];if(v==="-")return"";if(v&&v!=="auto")return rc(v);return autoAccent("").v}
function accentButton(label,cur,eff,autoName,onAuto,onNone,onPick,title){
  const hex=eff?(hexFor(eff)||Sprite.hexFor(eff)):null,mode=!cur||cur==="auto"?"auto":cur==="-"?"none":cur[0]==="@"?"slot":"fixed";
  return h("button",{type:"button",class:"pick color mini","aria-haspopup":"dialog","aria-expanded":"false",title,
    onclick:e=>colorPop(e.currentTarget,{title,current:mode==="auto"||mode==="none"?null:cur,
      extraTop:[{label:`Auto (${autoName||"none"})`,on:mode==="auto",fn:onAuto},{label:"No color word",on:mode==="none",fn:onNone}],onPick})},
    h("i",{class:"sw"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),h("span",{text:mode==="none"?"no color":eff?(label+": "+eff):label}),mode==="auto"?h("small",{class:"link",text:"auto"}):mode==="slot"?h("small",{class:"link",text:"follows "+cur.slice(1)}):null);
}
function itemColor2Button(field,it){
  const a=autoAccent(itemColor(field,it)),c2=it.c2,eff=c2==="-"?"":(c2&&c2!=="auto")?rc(c2):a.v;
  return accentButton("accent",c2,eff,a.k,()=>mut(()=>{delete cur().items[field].c2}),()=>mut(()=>{cur().items[field].c2="-"}),x=>mut(()=>{cur().items[field].c2=x}),`${OUT_LABEL[field]} accent color`);
}
function detailColorButton(field){
  const o=cur(),cv=(o.dcol||{})[field],a=autoAccent(""),eff=cv==="-"?"":(cv&&cv!=="auto")?rc(cv):a.v;
  return accentButton("color",cv,eff,a.k,()=>mut(()=>{cur().dcol=cur().dcol||{};delete cur().dcol[field]}),()=>mut(()=>{cur().dcol=cur().dcol||{};cur().dcol[field]="-"}),x=>mut(()=>{cur().dcol=cur().dcol||{};cur().dcol[field]=x}),`${OUT_LABEL[field]} color`);
}
function skinSuggestBox(){
  const sp=(S.c.subjectType||"").trim(),s=sp&&skinSuggestions(sp);if(!s)return null;
  const rows=[["tone","skinTone","Suggested tones"],["under","undertone","Suggested undertones"],["finish","skinFinish","Suggested finishes"],["marks","markings","Suggested markings"]];
  const box=h("div",{class:"suggbox"},h("h4",{text:`Suggested for ${sp}`}),h("p",{class:"muted small",text:"These follow the species. Tap one to use it, tap again to clear. You can still pick anything below."}));
  rows.forEach(([k,f,l])=>{
    if(!s[k]||!s[k].length)return;
    const wrap=h("div",{class:"chips"});
    s[k].forEach(v=>{const on=S.c[f]===v;const hx=f==="skinTone"?(SKIN_HEX[v]||hexFor(v)):null;
      wrap.append(h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:()=>setC(f,on?"":v)},hx?h("i",{class:"sw",style:`background:${hx}`}):null,v))});
    box.append(h("div",{class:"sgrow"},h("b",{text:l}),wrap));
  });
  box.append(h("div",{class:"btnrow"},h("button",{type:"button",class:"btn sm",onclick:()=>mut(()=>{rows.forEach(([k,f])=>{if(s[k]&&s[k][0])S.c[f]=s[k][0]})}),text:"Use the first of each"})));
  return box;
}
function stepBody(){
  const f=document.createDocumentFragment();
  f.append(presetRow("preset",BODY_PRESETS,PRESET_GROUPS.body,(k,p)=>{if(stepFrozen("body")){toast("Body and skin is locked. Unlock the step to load a preset.");return}let held=0;mut(()=>{held=bulkSet(STEP_FIELDS.body.slice(0,16),p.v)},"preset");const am=Policy.afterBodyPreset(),m=((am||"")+keptNote(held)).trim();if(m)toast(m)},()=>{if(stepFrozen("body")){toast("Body and skin is locked. Unlock the step to clear it.");return}let held=0;mut(()=>{held=bulkSet(STEP_FIELDS.body.slice(0,16),null)});if(held)toast("Cleared."+keptNote(held))},"Clear body",PRESET_HINTS.preset,{title:"Body presets",stack:true}));
  if(Policy.callout("body"))f.append(h("p",{class:"callout"},Policy.callout("body")));
  f.append(sub(isMale()?"Chest":"Bust"));["bustSize","bustShape","bustWeight"].forEach(id=>f.append(fieldRow(id)));
  f.append(sub("Proportions"));["heightStature","shoulderShape","torsoShape","armShape","handShape","waistShape","stomachShape","hipShape","buttSize","thighBuild","legShape","bodySoftness","posture"].forEach(id=>f.append(fieldRow(id,{forcePick:id==="buttSize"})));
  f.append(sub("Skin"));
  f.append(presetBar(SKIN_PRESETS,SKIN_FIELDS,"Clear skin","spreset",PRESET_GROUPS.skin));
  const sb=skinSuggestBox();if(sb)f.append(sb);
  skinRows().forEach(r=>f.append(r));
  f.append(fieldRow("bodyMarkings",{forcePick:true,hint:"Written as its own sentence, e.g. “Light body freckles dust the shoulders…”."}));
  if(isMale()||SEXPREF.both)f.append(fieldRow("bodyHair"));
  intimateRows(f);
  return f;
}
function nailColorRow(){
  const cur=String(S.c.nailColor||""),multi=cur.startsWith("@")?cur.split("+").filter(x=>x[0]==="@").map(x=>x.slice(1)):[];
  const wrap=h("div",{class:"chips"});
  SLOTS.forEach(([k,l])=>{const n=S.pal[k];if(!n)return;const on=multi.includes(k);
    wrap.append(h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:()=>mut(()=>{const set=new Set(multi);on?set.delete(k):set.add(k);const arr=SLOTS.map(s=>s[0]).filter(x=>set.has(x));if(arr.length)S.c.nailColor=arr.map(x=>"@"+x).join("+");else delete S.c.nailColor}),text:`${l}: ${n}`}))});
  if(!wrap.children.length)wrap.append(h("span",{class:"muted small",text:"Set palette colors first."}));
  else if(cur&&!cur.startsWith("@"))wrap.append(h("span",{class:"muted small",text:`Custom: ${cur}`}));
  return row("nailColor",LABELS.nailColor,wrap,cur&&!cur.startsWith("@")?`Custom color: ${cur}`:"");
}
function stepMakeup(){
  const f=document.createDocumentFragment();f.append(narrCallout("makeup")||"");
  f.append(narrDim(presetBar(MAKEUP_PRESETS,MAKEUP_FIELDS,"Clear makeup","mpreset",PRESET_GROUPS.makeup)));f.append(sub("Details"));
  ["makeupStyle","eyelinerStyle","eyeshadowStyle","lashStyle","blushStyle","lipFinish","faceAccents"].forEach(id=>f.append(fieldRow(id)));
  f.append(colorRow("makeupColor","Used for “"+(isMale()?"his":"her")+" makeup uses … accents”."));
  f.append(sub("Nails","Style and polish. Choose several palette colors for a coordinated set."));
  f.append(fieldRow("nailStyle",{forcePick:true}));f.append(nailColorRow());
  return f;
}
function outfitItems(field){
  const o=cur(),res=[];
  (OUTFIT[field]||[]).forEach(it=>{
    const t=itemTiers(field,it);
    if(!Policy.itemAllowed(field,it.v))return;
    if(!itemSexOk(field,it.v))return;
    if(o.cover&&!t.includes(o.cover))return;
    if(o.season&&it.s&&it.s!==o.season)return;
    const fam=it.f?it.f.split(","):[];
    const match=!o.look||!it.f||fam.includes(o.look);
    res.push({v:it.v,fam,match,t,g:it.g});
  });
  return res;
}
function outfitPicker(field,anchor){
  const o=cur(),cs=customOutfit(field),all=outfitItems(field);
  const lookLabel=id=>(LOOKS.find(l=>l[0]===id)||[0,id])[1];
  const secs=[];
  const sub1=it=>({v:it.v,sub:it.fam.length?lookLabel(it.fam[0]):"Any look"});
  if(cs.length)secs.push({name:"My items",items:cs.filter(v=>Policy.itemAllowed(field,v)).map(v=>({v,sub:"Yours"}))});
  if(all.some(i=>i.g)){const by=new Map();all.forEach(it=>{const k=it.g||(it.fam.length?lookLabel(it.fam[0]):"Any look");if(!by.has(k)){by.set(k,[]);secs.push({name:k,items:by.get(k)})}by.get(k).push(it)});
    secs.forEach(sc=>{if(sc.name==="My items")return;sc.items=sc.items.map((it,i)=>({it,i})).sort((a,b)=>(b.it.match-a.it.match)||a.i-b.i).map(({it})=>({v:it.v,sub:o.look&&!it.match?lookLabel(it.fam[0]):(it.fam.length?lookLabel(it.fam[0]):"Any look")}))})}
  else if(o.look){secs.push({name:`Fits ${lookLabel(o.look)}`,items:all.filter(i=>i.match).map(sub1)});secs.push({name:"Other looks",items:all.filter(i=>!i.match).map(sub1)})}
  else{const by=new Map();all.forEach(it=>{const k=it.fam.length?lookLabel(it.fam[0]):"Any look";if(!by.has(k)){by.set(k,[]);secs.push({name:k,items:by.get(k)})}by.get(k).push({v:it.v,sub:it.fam.length>1?"also "+it.fam.slice(1).map(lookLabel).join(", "):""})})}
  const cur_=o.items[field];
  openPop(anchor,{title:OUT_LABEL[field],current:cur_&&cur_.v,sections:secs.filter(s=>s.items.length),
    top:cur_?[{label:"Remove",fn:()=>mut(()=>{delete cur().items[field]})}]:[],
    onPick:v=>mut(()=>{cur().items[field]={v,c:(cur().items[field]||{}).c||"auto",...((cur().items[field]||{}).c2?{c2:cur().items[field].c2}:{})}},"item"+field),
    custom:{placeholder:"Type your own "+OUT_LABEL[field].toLowerCase(),save:true,check:t=>Policy.itemTextProblem(t),
      use:(t,s)=>{if(s)addCustom("o:"+field,t);mut(()=>{cur().items[field]={v:t,c:(cur().items[field]||{}).c||"auto"}},"item"+field)}}});
}
function itemColorButton(field,it){
  const c=itemColor(field,it),mix=typeof it.c==="string"&&it.c[0]==="@"&&it.c.includes("+"),first=mix?rc(it.c.split("+")[0]):c,hex=first?(hexFor(first)||Sprite.hexFor(first)):null;
  const mode=it.c==null||it.c==="auto"?"auto":it.c==="-"?"none":it.c[0]==="@"?"slot":"fixed";
  const label=COLOR_RX.test(it.v)?"in its name":mode==="none"?"no color":c?c:"no color yet";
  const hintTxt=mode==="auto"?"auto":mode==="slot"?"follows "+it.c.replace(/@/g,"").replace(/\+/g," + "):"";
  return h("button",{type:"button",class:"pick color mini","aria-haspopup":"dialog","aria-expanded":"false",title:"Color for "+OUT_LABEL[field],
    onclick:e=>colorPop(e.currentTarget,{title:`${OUT_LABEL[field]} color`,current:it.c,
      extraTop:[{label:`Auto (${ROLE_AUTO[field]||"none"})`,on:mode==="auto",fn:()=>mut(()=>{cur().items[field].c="auto"})},{label:"No color word",on:mode==="none",fn:()=>mut(()=>{cur().items[field].c="-"})}],mix:true,
      onPick:x=>mut(()=>{cur().items[field].c=x})})},
    h("i",{class:"sw"+(hex?"":" empty"),style:hex?`background:${hex}`:null}),h("span",{text:label}),hintTxt?h("small",{class:"link",text:hintTxt}):null);
}
function itemWornButton(field,it){
  if(!WORN[field])return null;
  return h("button",{type:"button",class:"pick mini worn"+(it.w?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",title:"How it is worn",
    onclick:e=>openPop(e.currentTarget,{title:OUT_LABEL[field]+": how it is worn",current:it.w||null,sections:[{name:"",items:WORN[field].map(v=>({v}))}],
      top:it.w?[{label:"Clear",fn:()=>mut(()=>{delete cur().items[field].w})}]:[],
      onPick:v=>mut(()=>{cur().items[field].w=v},"worn"+field),
      custom:{placeholder:"Type how it is worn",check:t=>Policy.itemTextProblem(t),use:t=>mut(()=>{cur().items[field].w=t},"worn"+field)}})},
    h("span",{text:it.w||"How it is worn"}));
}
function outfitRow(field){
  const o=cur(),it=o.items[field],set=!!it;
  const pickBtn=h("button",{type:"button",class:"pick"+(set?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>outfitPicker(field,e.currentTarget)},h("span",{text:set?it.v.replace(/\{c2?\}/g,"[color]"):"Choose…"}),h("i",{class:"caret","aria-hidden":"true"}));
  const wrap=h("div",{class:"pickwrap"},pickBtn);
  if(set)wrap.append(h("button",{type:"button",class:"clear","aria-label":"Remove "+OUT_LABEL[field],onclick:()=>mut(()=>{delete cur().items[field]}),text:"×"}));
  const ctl=h("div",{class:"outctl"},wrap,set?itemColorButton(field,it):null,set&&/\{c2\}/.test(it.v)?itemColor2Button(field,it):null,set?itemWornButton(field,it):null);
  let hint="";
  if(set&&Policy.isYouthText(it.v))hint="Youth-coded item";
  return row("o:"+field,OUT_LABEL[field],ctl,hint);
}
function detailRow(field){
  const o=cur(),v=o.details[field]||"";
  const src=(OUTFIT[field]||[]).filter(i=>(!o.cover||itemTiers(field,i).includes(o.cover))&&Policy.itemAllowed(field,i.v)&&itemSexOk(field,i.v));
  const custom=(customOutfit(field)).map(v=>({v}));
  /* group by category when the field has categories (Material and finish) */
  const cats=[...new Set(src.filter(i=>i.g).map(i=>i.g))];
  const plain=src.filter(i=>!i.g).map(i=>({v:i.v}));
  const sections=cats.length?[{name:"Patterns and finishes",items:plain.concat(custom)}].concat(cats.map(c=>({name:c,items:src.filter(i=>i.g===c).map(i=>({v:i.v}))}))).filter(sc=>sc.items.length)
    :[{name:"",items:plain.concat(custom)}];
  const b=h("button",{type:"button",class:"pick"+(v?" has":""),"aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>openPop(e.currentTarget,{title:OUT_LABEL[field],current:v,sections,top:v?[{label:"Clear",fn:()=>mut(()=>{delete cur().details[field]})}]:[],onPick:x=>mut(()=>{cur().details[field]=x},"d"+field),
    custom:{placeholder:"Type your own",save:true,use:(t,s)=>{if(s)addCustom("o:"+field,t);mut(()=>{cur().details[field]=t},"d"+field)}}})},h("span",{text:(v||"Choose…").replace(/\{c\}/g,"[color]")}),h("i",{class:"caret","aria-hidden":"true"}));
  const w=h("div",{class:"pickwrap"},b);if(v)w.append(h("button",{type:"button",class:"clear","aria-label":"Clear",onclick:()=>mut(()=>{delete cur().details[field]}),text:"×"}));
  return row("d:"+field,OUT_LABEL[field],/\{c\}/.test(v)?h("div",{class:"outctl"},w,detailColorButton(field)):w,"",v?"set":"");
}
function applyOutfitPreset(p){
  if(stepFrozen("outfit")){toast("This outfit is locked. Unlock it to load a starting point.");return}
  preparePresets();
  let held=0,filled=0;
  mut(()=>{
    if(p.pal){
      const usedByChar=new Set();Object.values(S.c).forEach(v=>{if(typeof v==="string")v.split("+").forEach(x=>{if(x[0]==="@")usedByChar.add(x.slice(1))})});
      SLOT_KEYS.forEach(k=>{if(p.pal[k]&&!S.pal[k]&&!kept("pal:"+k)&&!usedByChar.has(k)){S.pal[k]=p.pal[k];filled++}});
    }
    const o=cur(),L=o.lock||{},oldItems=o.items,oldDet=o.details,oldDcol=o.dcol||{},def=!Object.keys(o.items).length||/^Outfit( \d+)?$/.test(o.name||"")||/ outfit$/.test(o.name||"")||/ mix$/.test(o.name||"")||OUTFIT_PRESETS.some(x=>x.name===o.name);
    o.items={};o.details={};o.dcol={};o.showUnder=!!p.showUnder;o.look=p.look||"";o.season=p.season||"";o.cover="";
    Object.entries(p.items).forEach(([f,[v,c,w,c2]])=>{o.items[f]={v,c,...(w?{w}:{}),...(c2?{c2}:{})}});
    Object.assign(o.details,p.details||{});o.dcol={...(p.dcol||{})};
    Object.keys(L).forEach(k=>{
      if(k==="*")return;
      if(k.startsWith("d:")){const f=k.slice(2);if(oldDet[f]){o.details[f]=oldDet[f];if(oldDcol[f])o.dcol[f]=oldDcol[f];else delete o.dcol[f];held++}}
      else if(oldItems[k]){o.items[k]=oldItems[k];held++}
    });
    if(def)o.name=p.name;
    o.preset=p.id;
    if(isMale())fixSexOutfit(o);
  });
  toast(`Loaded “${p.name}”. Its colors follow your palette.`+(filled?` Filled ${filled} empty palette slot${filled>1?"s":""} with its colors.`:"")+keptNote(held));
}
function presetOfOutfit(o){preparePresets();return OUTFIT_PRESETS.find(p=>p.id===o.preset)||OUTFIT_PRESETS.find(p=>p.name===o.name)||null}
function resetPresetColors(){
  const o=cur(),p=presetOfOutfit(o);
  if(!p){toast("This outfit has no preset colors to go back to.");return}
  const PAL=p.pal||{};
  const res=(f,c)=>{
    if(c==null||c===""||c==="-")return c;
    if(c==="auto"){const sl=ROLE_AUTO[f];return(sl&&PAL[sl])||c}
    if(c[0]==="@"){const parts=c.slice(1).split("+").map(x=>PAL[x.replace(/^@/,"")]).filter(Boolean);return parts.length?joinNatural(parts):c}
    return c};
  let n=0;
  mut(()=>{
    const oo=cur();
    Object.entries(p.items).forEach(([f,[v,c,w,c2]])=>{
      const it=oo.items[f];if(!it||it.v!==v)return;
      it.c=res(f,c);if(c2)it.c2=res(f,c2);n++});
    Object.entries(p.dcol||{}).forEach(f=>{const d=f[0];if(oo.details[d]&&oo.details[d]===(p.details||{})[d]){oo.dcol[d]=res(d,f[1]);n++}});
    oo.preset=p.id;
  });
  toast(n?`Colors set back to “${p.name}”’s own. They no longer follow your palette. Load the preset again to follow it.`:"Nothing from this preset is left to recolor.");
}
function stepOutfit(){
  const f=document.createDocumentFragment(),o=cur();
  /* wardrobe tabs */
  const tabs=h("div",{class:"wardrobe",role:"tablist","aria-label":"Outfits"});
  S.outfits.forEach((x,i)=>tabs.append(h("button",{type:"button",role:"tab","aria-selected":i===S.cur?"true":"false",class:"wtab"+(i===S.cur?" on":""),onclick:()=>mut(()=>{S.cur=i}),text:x.name||"Outfit"})));
  tabs.append(h("button",{type:"button",class:"wtab add",onclick:()=>mut(()=>{S.outfits.push(newOutfit("Outfit "+(S.outfits.length+1)));S.cur=S.outfits.length-1}),text:"+ New outfit"}));
  f.append(tabs);
  const nameIn=h("input",{type:"text",value:o.name,"aria-label":"Outfit name",class:"nameinput",oninput:e=>{typing="main";mut(()=>{cur().name=e.target.value},"oname");typing=""}});
  f.append(h("div",{class:"btnrow outfit-actions"},nameIn,
    h("button",{type:"button",class:"btn sm",onclick:()=>mut(()=>{const c=JSON.parse(JSON.stringify(cur()));c.name+=" copy";S.outfits.splice(S.cur+1,0,c);S.cur++}),text:"Duplicate"}),
    h("button",{type:"button",class:"btn sm",disabled:S.outfits.length<2?true:null,onclick:()=>{if(S.outfits.length<2)return;mut(()=>{S.outfits.splice(S.cur,1);S.cur=Math.max(0,S.cur-1)})},text:"Delete"}),
    h("button",{type:"button",class:"btn sm",disabled:presetOfOutfit(o)?null:true,title:"Put this outfit back to the colors its preset was made with",onclick:()=>resetPresetColors(),text:"Preset colors"}),
    h("button",{type:"button",class:"btn sm",onclick:()=>clearOutfit(),text:"Clear outfit"})));
  f.append(h("div",{class:"btnrow"},h("button",{type:"button",class:"btn primary",id:"rndOutfit",onclick:randomizeOutfit,text:"Randomize outfit"}),
    h("span",{class:"muted small",text:"Builds a matching outfit. It follows the look, coverage and season below, so leave Look on “Any look” for more variety. Locked pieces stay. Undo brings back the last one."})));
  const byId=Object.fromEntries(OUTFIT_PRESETS.map(p=>[p.id,p]));
  f.append(presetRow("opreset",byId,PRESET_GROUPS.outfit,(k,p)=>applyOutfitPreset(p),()=>clearOutfit(),"Clear outfit","Loads a finished outfit. Its colors follow your palette, and empty palette slots take its own colors.",{title:"Outfit starting points",stack:true}));
  /* filters */
  const lookSel=h("select",{"aria-label":"Look",onchange:e=>mut(()=>{cur().look=e.target.value})},h("option",{value:"",text:"Any look"}),LOOKS.map(([id,l])=>h("option",{value:id,selected:o.look===id?true:null,text:l})));
  const covSel=h("select",{"aria-label":"Coverage",onchange:e=>mut(()=>{cur().cover=e.target.value})},COVER.map(([v,l])=>h("option",{value:v,selected:o.cover===v?true:null,disabled:Policy.coverageAllowed(v)?null:true,text:l+(Policy.coverageAllowed(v)?"":" (unavailable)")})));
  const seaSel=h("select",{"aria-label":"Season",onchange:e=>mut(()=>{cur().season=e.target.value})},[["","Any season"],["s","Warm weather"],["w","Cold weather"]].map(([v,l])=>h("option",{value:v,selected:o.season===v?true:null,text:l})));
  f.append(h("div",{class:"filters"},h("label",{},"Look",lookSel),h("label",{},"Coverage",covSel),h("label",{},"Season",seaSel)));
  f.append(h("p",{class:"muted small",text:"Filters only shape what the pickers offer. Items you already chose stay."}));
  f.append(sub("Garments"));OUT_GROUPS[0].fields.forEach(id=>f.append(outfitRow(id)));
  f.append(sub("Accessories"));OUT_GROUPS[1].fields.filter(id=>!["maskAccessory","shoulderPiece","tailPiece","wingPiece"].includes(id)).forEach(id=>f.append(outfitRow(id)));
  f.append(sub("Costume pieces","Masks, shoulder pieces, tails and wings for roleplay looks."));["maskAccessory","shoulderPiece","tailPiece","wingPiece"].forEach(id=>f.append(outfitRow(id)));
  f.append(sub("Details","Short phrases about trim, cut and material."));OUT_GROUPS[3].fields.forEach(id=>f.append(detailRow(id)));
  /* underwear */
  const det=h("details",{class:"under"+(Policy.underwearAllowed()?"":" off"),open:(o.items.bra||o.items.panties)?true:null},h("summary",{text:"Underwear"}));
  if(Policy.callout("underwear"))det.append(h("p",{class:"callout"},Policy.callout("underwear")));
  else{
    det.append(h("p",{class:"muted small",text:"Underwear under covering clothes is left out of the prompt by default, so the generator isn’t told to draw things that shouldn’t show. Turn on “Show anyway” for "+(isMale()?"underwear":"lingerie")+" looks."}));
    OUT_GROUPS[2].fields.forEach(id=>det.append(outfitRow(id)));
    det.append(h("label",{class:"chk"},h("input",{type:"checkbox",checked:o.showUnder?true:null,onchange:e=>mut(()=>{cur().showUnder=e.target.checked})})," Show underwear anyway, even under other clothes"));
  }
  f.append(det);
  return f;
}
function check(label,key,{hintText,disabled,reason,onchange}={}){
  const cb=h("input",{type:"checkbox",checked:S.out[key]?true:null,disabled:disabled?true:null,onchange:e=>{mut(()=>{S.out[key]=e.target.checked})}});
  return h("label",{class:"chk big"+(disabled?" off":"")},cb,h("span",{},label,hintText?h("small",{text:hintText}):null,disabled&&reason?h("small",{class:"reason",text:reason}):null));
}
function textRow(label,key,ph,rows){
  const ta=h("textarea",{rows:rows||2,placeholder:ph,"aria-label":label,oninput:e=>{typing="main";mut(()=>{S.out[key]=e.target.value},"t"+key);typing=""}});ta.value=S.out[key]||"";
  return h("div",{class:"row"},h("div",{class:"lab"},h("label",{text:label})),h("div",{class:"ctl"},ta));
}
function stepFinish(){
  /* v196: the Finish step in prompt order: what starts it, how it is worded, your own words, and the Undesired Content */
  const f=document.createDocumentFragment(),Q=window.QUC;
  f.append(sub("Start of the prompt","Quality tags, image style and framing open every prompt."));
  if(Q)f.append(Q.quality());
  f.append(sub("Wording","How the character is written."));
  f.append(narrStyleRows());
  f.append(h("div",{class:"checks"},check("Compact tags","compact",{hintText:"A comma list instead of sentences. Shorter, less descriptive."}),check("Character sheet prefix","sheet",{hintText:"Adds a turnaround-sheet instruction in front of the prompt."}),check("Resolve conflicts automatically","auto",{hintText:"Leaves conflicting hair, leg and underwear pieces out of the prompt. See Checks."})));
  const wf=h("select",{"aria-label":"Weight format",onchange:e=>mut(()=>{S.out.wfmt=e.target.value})},[["numeric","Numeric weights (1.3::text::)"],["braces","Braces { } and [ ]"]].map(([v,l])=>h("option",{value:v,selected:S.out.wfmt===v?true:null,text:l})));
  f.append(h("div",{class:"row"},h("div",{class:"lab"},h("label",{text:"Weight format"}),h("small",{class:"hint",text:"Set each layer’s weight in the Character layers tab."})),h("div",{class:"ctl"},wf)));
  f.append(sub("Your own words","Added to the prompt as written."));
  f.append(textRow("Must include","must","e.g. a silver locket, ink-stained fingers"));
  f.append(textRow("Notes","notes","Anything appended as written, e.g. a pose"));
  f.append(sub("Undesired Content","The negative prompt."));
  if(Q)f.append(Q.uc());else f.append(textRow("Avoid","avoid","Added to the negative prompt, e.g. glasses, short hair"));
  f.append(sub("This design"));
  f.append(h("div",{class:"btnrow"},h("button",{type:"button",class:"btn",onclick:()=>{if(confirm("Clear everything and start a blank design? You can undo this."))replaceState(blankState())},text:"Start blank"}),h("button",{type:"button",class:"btn",onclick:()=>openStarts(),text:"Starting points"}),h("button",{type:"button",class:"btn",onclick:()=>openSaves(),text:"Save or load"})));
  return f;
}
function renderMain(){
  const st=STEPS.find(s=>s.id===step),root=$("#stepView"),y=window.scrollY;
  const inner=h("div",{class:"stepbody"});inner.append(RENDER[step]());
  root.textContent="";
  root.append(h("div",{class:"stephead"},h("div",{class:"shtop"},h("h2",{id:"stepTitle",text:st.label}),stepHeadActions(step)),h("p",{text:st.blurb})),inner);
  root.setAttribute("aria-labelledby","stepTitle");
  const i=STEPS.findIndex(s=>s.id===step);
  root.append(h("div",{class:"stepnav"},i>0?h("button",{type:"button",class:"btn",onclick:()=>goStep(STEPS[i-1].id),text:"Back: "+STEPS[i-1].label}):h("span"),i<STEPS.length-1?h("button",{type:"button",class:"btn primary",onclick:()=>goStep(STEPS[i+1].id),text:"Next: "+STEPS[i+1].label}):h("span")));
  window.scrollTo(0,y);
  if(lockFocus){const sel=lockFocus;lockFocus="";setTimeout(()=>{const el=document.querySelector(sel);if(el&&!el.disabled)el.focus({preventScroll:true})},0)}
}
function goStep(id){step=id;closePop();setSide(false);renderRail();renderMain();window.scrollTo({top:0});try{sessionStorage.setItem("cs.step",id)}catch(e){}}
function renderRail(){
  const rail=$("#rail");rail.textContent="";
  STEPS.forEach(s=>{
    const fields=STEP_FIELDS[s.id],n=fields.filter(isSet).length+(s.id==="finish"?(S.out.must||S.out.notes||S.out.avoid?1:0):0);
    rail.append(h("button",{type:"button",class:"rail-btn"+(s.id===step?" on":""),"aria-current":s.id===step?"step":null,onclick:()=>goStep(s.id)},railLock(s.id)||h("i",{class:"dot"+(n?" set":""),"aria-hidden":"true"}),h("span",{class:"rl",text:s.label}),s.id==="palette"?palDots():(n&&fields.length?h("small",{text:n+"/"+fields.length}):null)));
  });
}
function renderStage(){
  const key=$("#colorKey");key.textContent="";
  const names=SLOTS.map(([k])=>S.pal[k]).filter(Boolean);
  const bar=h("span",{class:"mbar"},...SLOTS.map(([k],i)=>{const hx=slotHex(k);return h("i",{class:"ms"+(hx?"":" e"),style:hx?`flex-grow:${PAL_W[i]};background:${hx}`:null})}));
  key.append(h("button",{type:"button",class:"mband"+(names.length?"":" empty"),title:"Open the Palette step",
    "aria-label":names.length?`Palette: ${names.join(", ")}. Open the Palette step.`:"No palette yet. Open the Palette step.",
    onclick:()=>goStep("palette")},bar,h("span",{class:"mnames",text:names.length?names.join(", "):"No palette yet. Choose colors in the Palette step."})));
  $("#nameInput").value!==S.name&&($("#nameInput").value=S.name);
}
function naiModel(){return NAI_MODELS[S&&S.out&&S.out.model]||NAI_MODELS.v5}
function stats(t){const w=t.trim()?t.trim().split(/\s+/).length:0,m=naiModel();return `${w} words · ${t.length} characters · about ${Math.round(t.length/4)} of ${m.max} tokens (${m.label})`}
function renderPrompt(){
  const C=LASTC;$("#output").value=C.prompt;$("#stats").textContent=stats(C.prompt);
  $$("#modeSeg button").forEach(b=>{const on=b.dataset.mode===S.out.mode;b.setAttribute("aria-pressed",on?"true":"false");b.classList.toggle("on",on)});
  const warn=C.checks.filter(c=>c.level==="warn").length;const b=$("#checksBadge");b.textContent=warn?String(warn):"";b.hidden=!warn;
  $("#barCheck").textContent=warn?`${warn} check${warn>1?"s":""}`:"No issues";
  const gd=$("#guard");gd.hidden=!C.banner;gd.textContent=C.banner;
}
function renderLayers(){
  const box=$("#layerList");box.textContent="";
  LASTC.layers.forEach((l,i)=>{
    const dim=!l.inMode||!l.text;
    box.append(h("div",{class:"layer"+(dim?" dim":"")+(l.on?"":" off")},
      h("input",{type:"checkbox",checked:l.on?true:null,"aria-label":"Include "+l.label,onchange:e=>mut(()=>{(S.layers[l.id]??={}).on=e.target.checked})}),
      h("div",{class:"ltxt"},h("b",{text:l.label}),h("small",{text:!l.inMode?"Not used in this output mode":!l.text?"Empty":l.text.length>70?l.text.slice(0,68)+"…":l.text})),
      h("input",{type:"number",class:"wt",min:"0.5",max:"1.8",step:"0.05",value:String(l.w),"aria-label":l.label+" weight",title:"Weight",oninput:e=>{const v=parseFloat(e.target.value);typing="layers";mut(()=>{(S.layers[l.id]??={}).w=isFinite(v)&&v>0?Math.min(1.8,Math.max(.5,v)):1},"w"+l.id);typing=""},onchange:()=>renderLayers()}),
      h("div",{class:"mv"},h("button",{type:"button","aria-label":"Move up",disabled:i===0?true:null,onclick:()=>mut(()=>{const o=S.order,k=o.indexOf(l.id);if(k>0)[o[k-1],o[k]]=[o[k],o[k-1]]}),text:"▲"}),h("button",{type:"button","aria-label":"Move down",disabled:i===LASTC.layers.length-1?true:null,onclick:()=>mut(()=>{const o=S.order,k=o.indexOf(l.id);if(k<o.length-1)[o[k+1],o[k]]=[o[k],o[k+1]]}),text:"▼"}))));
  });
}
function renderChecks(){
  const box=$("#checkList");box.textContent="";
  const cs=LASTC.checks.slice().sort((a,b)=>(a.level==="warn"?0:1)-(b.level==="warn"?0:1));
  if(!cs.length)box.append(h("p",{class:"muted",text:"No conflicts found. The design reads cleanly."}));
  cs.forEach(c=>box.append(h("div",{class:"chk-item "+c.level},h("span",{class:"lvl",text:c.level==="warn"?"Check":"Note"}),h("p",{text:c.msg}),c.fix?h("button",{type:"button",class:"btn sm",onclick:c.fix.fn,text:c.fix.label}):null)));
}
function negText(){
  const parts=[];
  if(S.out.negGeneral!==false)parts.push(Q_GENERAL);
  if(S.out.negCharacter!==false)parts.push(Q_CHARACTER);
  if(S.out.negOutfit!==false)parts.push(Q_OUTFIT);
  if(S.out.negPortrait===true||/full body/.test(S.out.framing))parts.push(S.out.negPortrait===true?Q_PORTRAIT:"");
  const av=S.out.avoid.trim();if(av)parts.unshift(av.replace(/[.\s]+$/,""));
  return parts.filter(Boolean).join(", ");
}
function qualityText(){
  const blocked=!Policy.explicitAllowed();
  return["1.3::masterpiece::","best quality","amazing quality","very aesthetic","year 2026","highly detailed",S.out.framing,"expert shading","detailed shadows","ambient occlusion","clarity","sharp focus",S.out.lewdtag&&!blocked?"sexy, lewd":""].filter(Boolean).join(", ");
}
function renderNeg(){
  $("#qOut").value=qualityText();$("#nOut").value=negText();
  [["negGeneral","General"],["negCharacter","Character"],["negOutfit","Outfit"],["negPortrait","Portrait framing"]].forEach(([k])=>{const cb=$("#"+k);if(cb)cb.checked=k==="negPortrait"?S.out[k]===true:S.out[k]!==false});
}
function renderSide(){
  LASTC=compose();
  renderPrompt();renderStage();renderNeg();
  if(typing!=="layers")renderLayers();
  renderChecks();
}
function preparePresets(){
  if(_presetsReady)return;_presetsReady=true;
  const KEEP=/^(gold|silver|brass|bronze|copper|brown|tan|khaki|beige|camel|chocolate brown|antique gold|metallic gold|rose gold|platinum|champagne gold)$/i;
  const COMPOUND=/ and |-and-|plaid|striped|print/i;
  const SK=["primary","secondary","third","accent","extra"];
  const al=n=>({navy:"navy blue",ruby:"ruby red"})[String(n).toLowerCase()]||String(n).toLowerCase();
  const hx=n=>hexFor(n)||Sprite.hexFor(n)||"";
  const palOf=a=>a?Object.fromEntries(SK.map((k,i)=>[k,a[i]])):null;
  const REFT={ref_pp_:"serpentrobes",ref_gv_:"goldenveil",ref_va_:"vaporblue",ref_ee_:"eevee",ref_jo_:"jolteon",ref_fl_:"flareon",ref_es_:"espeon",ref_um_:"umbreon",ref_le_:"leafeon",ref_gl_:"glaceon",ref_sy_:"sylveon",ref_bluebikini:"seasidebluehair",ref_sunhat:"lilacsunhat",ref_holobunny:"lilacsunhat"};
  const tplPal=p=>{const rk=Object.keys(REFT).find(k=>p.id.startsWith(k));if(rk){const t=TEMPLATES.find(x=>x.id===REFT[rk]);if(t)return t.pal}
    if(!/^ref_/.test(p.id)||!Object.values(p.items).some(it=>[1,3].some(i=>typeof it[i]==="string"&&it[i][0]==="@")))return null;let best=null,bn=0;TEMPLATES.forEach(t=>{const its=t.outfit&&t.outfit.items||{};let n=0;Object.entries(p.items).forEach(([f,it])=>{if(its[f]&&its[f][0]===it[0])n++});if(n>bn){bn=n;best=t}});return best&&bn?best.pal:null};
  const litOf=v=>typeof v==="string"&&v&&v!=="-"&&v!=="auto"&&v[0]!=="@"&&!KEEP.test(v)&&!COMPOUND.test(v);
  /* keep the five slots distinct: reorder so alike colors are not both primary and secondary, and fold in a color that is nearly the same as another */
  const lim=(i,j)=>(i+j===1)?85:45;
  const viol=a=>{let n=0;for(let i=0;i<5;i++)for(let j=i+1;j<5;j++){const x=a[i]&&hx(a[i]),y=a[j]&&hx(a[j]);if(x&&y&&colorDist(x,y)<lim(i,j))n++}return n};
  const assigns=n=>{const out=[];const go=(cur,used)=>{if(cur.length===n){out.push(cur);return}for(let s=0;s<5;s++)if(!used.has(s))go(cur.concat(s),new Set([...used,s]))};go([],new Set());return out};
  /* a sparse five-slot list: colors may skip a slot (for example primary and third) so alike colors are not neighbours */
  const spread=top=>{
    top=top.map(al);
    for(let i=0;i<top.length;i++)for(let j=top.length-1;j>i;j--){const x=hx(top[i]),y=hx(top[j]);if(x&&y&&colorDist(x,y)<30)top.splice(j,1)}
    const best=assigns(top.length).map(as=>{const a=[];as.forEach((sl,k)=>{a[sl]=top[k]});return{a,v:viol(a),d:as.reduce((s,v,k)=>s+Math.abs(v-k),0)}}).sort((x,y)=>x.v-y.v||x.d-y.d)[0];
    return best.a;
  };
  OUTFIT_PRESETS.forEach(p=>{
    const refs=[];
    Object.values(p.items).forEach(it=>{[1,3].forEach(i=>{if(litOf(it[i]))refs.push([it,i])})});
    Object.keys(p.dcol||{}).forEach(f=>{if(litOf(p.dcol[f]))refs.push([p.dcol,f])});
    let pal=p.pal||palOf(PRESET_PAL[p.id])||tplPal(p);
    if(!refs.length){if(pal&&!p.pal)p.pal=pal;return}
    const get=r=>r[0][r[1]];
    if(!pal){
      const cnt={};refs.forEach(r=>{const k=al(get(r));cnt[k]=(cnt[k]||0)+1});
      let top=Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x]).slice(0,5);
      top=spread(top);
      pal=Object.fromEntries(SK.map((k,i)=>[k,top[i]||""]));
    }
    const near=n=>{n=al(n);const h0=hx(n);let best="",bd=1e9;SK.forEach(k=>{if(!pal[k])return;if(String(pal[k]).toLowerCase()===String(n).toLowerCase()){best=k;bd=-1;return}if(bd<0)return;const d=h0&&hx(pal[k])?colorDist(h0,hx(pal[k])):1e9;if(d<bd){bd=d;best=k}});return{k:best,d:bd}};
    refs.forEach(r=>{const n=near(get(r));if(n.k&&(n.d<=70||!p.pal&&!PRESET_PAL[p.id]&&!tplPal(p)))r[0][r[1]]="@"+n.k});
    p.pal=pal;
  });
}
function narrOrder(o,on){
  o=o.slice();const b=o.indexOf("body"),s=o.indexOf("skin");if(b<0||s<0)return o;
  if(on&&b<s){o.splice(s,1);o.splice(b,0,"skin")}
  else if(!on&&s<b){o.splice(s,1);o.splice(o.indexOf("body")+1,0,"skin")}
  return o;
}
function narrPalette(){
  const Sx=cap(subjectPhrase()),seen=new Set(),all=["primary","secondary","third","accent","extra"].map(k=>S.pal[k]).filter(c=>{if(!c)return false;const k=c.toLowerCase();if(seen.has(k))return false;seen.add(k);return true});
  if(!all.length)return"";
  const main=all.slice(0,3),name=(S.out.palName||"").trim()||joinNatural(main);
  const list=joinNatural(all.length===1?[withArticle(all[0])]:[withArticle(all[0]),...all.slice(1,-1),hyC(all[all.length-1])+" accents"]);
  return `${Sx} has ${anA(name)} ${name} color palette built around ${list}.`;
}
function narrEyes(){
  const Sx=cap(subjectPhrase()),strip=v=>(v||"").replace(/\s*eyes?$/i,""),one=hyC(strip(g("eyeOne"))),two=hyC(strip(g("eyeTwo"))),cfg=S.c.eyeConfig||"";
  const A=one||two,B=two||one,same=!A||!B||A.toLowerCase()===B.toLowerCase(),P=`${Sx}’s eyes`;
  if(!A)return"";
  if(same)return cfg==="luminous matching"?`${P} are a luminous ${A}.`:`${P} are ${A}.`;
  const pair=`with one ${A} eye and one ${B} eye`;
  switch(cfg){
    case "heterochromatic":return `${P} are heterochromatic, ${pair}.`;
    case "softly mismatched":return `${P} are subtly mismatched, ${pair}.`;
    case "mystically mismatched":return `${P} are mystically mismatched, with one glowing ${A} eye and one glowing ${B} eye.`;
    case "gradient-tinted":return `${P} are gradient-tinted, fading from ${strip(g("eyeOne"))||strip(g("eyeTwo"))} at the pupil to ${strip(g("eyeTwo"))||strip(g("eyeOne"))} at the outer edge.`;
    case "ringed heterochromia":return `${P} are ringed, mostly ${A} with a distinct ${B} ring around the outer edge.`;
    case "sectoral heterochromia":return `${P} are sectoral, mostly ${A} with ${withArticle(B)} wedge-shaped sector.`;
    default:return `${P} are mismatched, ${pair}.`;
  }
}
function narrHair(){
  const hi=hairIssues(),Sx=cap(subjectPhrase()),bangs=g("bangs"),out=[];
  const nounTex=hi.tex&&/(waves|curls|coils)$/i.test(hi.tex)?hi.tex:"",lead=[hi.len,nounTex?"":hi.tex].filter(Boolean),withTex=nounTex?`, with ${nounTex}`:"";
  let desc;
  if(hi.sty)desc=/\bhair$/i.test(hi.sty)?[...lead,hi.sty].join(", "):`${lead.length?lead.join(", ")+" hair":"hair"} styled as ${withArticle(hi.sty)}`;
  else desc=`${lead.length?lead.join(", ")+" hair":"hair"}`;
  let s=`${Sx} has ${desc}${withTex}`;
  if(hi.mv)s+=` that ${hi.mv}`;
  const base=g("hairBase"),under=g("hairUnderlayer"),inner=g("hairInner"),hl=g("hairHighlights"),blend=g("hairBlend");
  const rest=[];
  if(under)rest.push(withArticle(`${hyC(under)} underlayer`));
  if(inner)rest.push(`${hyC(inner)} inner sections`);
  if(hl)rest.push(`${hyC(hl)} highlights`);
  if(blend)rest.push(/^blended /.test(blend)?blend:`${blend}`);
  else if(base&&hl&&base.toLowerCase()!==hl.toLowerCase())rest.push(`blended ${base} and ${hl} gradient streaks`);
  if(base){s+=`, featuring ${withArticle(`${hyC(base)} base`)}`+(rest.length?` with ${joinNatural(rest)}`:"")}
  else if(rest.length)s+=`, featuring ${joinNatural(rest)}`;
  out.push(s+".");
  if(bangs)out.push(`${Sx} also has ${withArticle(bangs)}.`);
  if(facialHairText())out.push(`${Sx} also has ${facialHairText()}.`);
  return out.join(" ");
}
function narrSkin(){
  const Sx=cap(subjectPhrase()),tone=g("skinTone"),und=g("undertone"),fin=g("skinFinish"),mk=g("markings");
  const parts=[und&&`${und} undertones`,fin,mk&&!/^no markings$/i.test(mk)?mk:""].filter(Boolean);
  if(tone)return `${Sx} has ${anA(tone)} ${tone} skin tone${parts.length?` with ${joinNatural(parts)}`:""}.`;
  return parts.length?`${Sx} has ${joinNatural(parts)}.`:"";
}
function narrBody(){
  const Sx=cap(subjectPhrase()),size=g("bustSize"),shape=g("bustShape"),weight=g("bustWeight"),bf=activeBodyForm(),noLeg=!!(bf&&(bf.noLegs||bf.dropLegs))||fullBeast();
  const extra=[shape&&withArticle(shape),weight].filter(Boolean),bust=size?`${withArticle(size)}${extra.length?` with ${joinNatural(extra)}`:""}`:(extra.length?joinNatural(extra):"");
  const height=g("heightStature"),soft=g("bodySoftness"),frame=height&&soft?`${height} with ${withArticle(soft)}`:(height||withArticle(soft));
  const s1=[frame,bust,g("shoulderShape"),withArticle(g("torsoShape")),withArticle(g("waistShape"))].filter(v=>v&&v!=="a ");
  const s2=[withArticle(g("stomachShape")),g("hipShape"),noLeg?"":g("thighBuild"),noLeg?"":g("legShape"),noLeg?"":withArticle(g("buttSize")),withArticle(g("armShape")),g("bodyHair"),g("posture")].filter(v=>v&&v!=="a ");
  const out=[];
  if(s1.length)out.push(`${Sx} has ${joinNatural(s1)}.`);
  if(s2.length)out.push(`${Sx} has ${joinNatural(s2)}.`);
  if(bf)out.push(bf.s);
  const bm=g("bodyMarkings");if(bm)out.push(cap(bm.replace(/[.\s]+$/,""))+".");
  const hd=g("handShape");if(hd)out.push(`${Sx}’s hands are ${hd}.`);
  return out.join(" ");
}
function narrNotes(){
  const set=[...NARR_DROPPED].filter(id=>S.c[id]!=null&&S.c[id]!==""&&S.c[id]!=="none");
  const names=set.map(id=>labelOf(id).toLowerCase());
  note(set.length?"warn":"info",`The Flowing sentence style leaves out the face (shape, expression, brows, nose, mouth, beauty mark, impression), eye details (shape, sclera, pupils, iris, eyelashes), makeup and nails.${set.length?` Set but left out: ${joinNatural(names)}.`:""}`,{label:"Use Full detail sentences",fn:()=>mut(()=>{S.out.style="studio";S.order=narrOrder(S.order,false)})});
}
function narrDim(el){if(el&&el.nodeType&&narrOn()){el.classList.add("dropped");el.setAttribute("inert","")}return el}
function narrCallout(kind){
  if(!narrOn())return null;
  return h("p",{class:"callout warn"},kind==="face"?"The Flowing sentence style is on. It does not write the face (shape, expression, brows, nose, mouth, beauty mark, impression) or eye shape, sclera, pupils, iris and eyelashes, so those are grayed out. Eye setup and eye colors still apply.":"The Flowing sentence style is on. It does not write makeup or nails, so this step is grayed out.");
}
function narrStyleRows(){
  const f=document.createDocumentFragment();
  const sel=h("select",{"aria-label":"Sentence style",onchange:e=>{const v=e.target.value;mut(()=>{S.out.style=v;S.order=narrOrder(S.order,v==="narrative")})}},[["studio","Full detail (every feature, one by one)"],["narrative","Flowing (shorter, skips face, makeup and nails)"]].map(([v,l])=>h("option",{value:v,selected:(S.out.style||"studio")===v?true:null,text:l})));
  f.append(h("div",{class:"row"},h("div",{class:"lab"},h("label",{text:"Sentence style"}),h("small",{class:"hint",text:"Full detail writes a sentence for every feature you set, including the face, makeup and nails. Flowing blends the palette, eyes, hair, skin and body into fewer, longer sentences, so the prompt comes out about a quarter shorter, but it leaves out the face, makeup and nails. Switching to Flowing moves Skin above Body in the Character layers tab."})),h("div",{class:"ctl"},sel)));
  f.append(h("div",{class:"checks"},check("Match body details to outfit coverage","coverMatch",{hintText:"When the outfit covers the legs, arms or stomach, the matching thigh, leg, arm and stomach details are left out and a short line tells the generator to keep them covered. Bust, height, shoulders, torso, waist, hips and butt stay."})));
  f.append(h("div",{class:"checks"},check("Repeat the body paragraph","repeatBody",{hintText:"Writes the body layer twice, which can strengthen the figure in the generation. Not used with Compact tags."})));
  if(S.out.style==="narrative"&&S.out.compact)f.append(h("p",{class:"muted small",text:"Compact tags is on, so the studio tag list is used instead."}));
  if(narrOn())f.append(textRow("Palette name","palName","e.g. soft blue, white, and orange",1),h("p",{class:"muted small",text:"Read as “has a ___ color palette built around …”. Leave empty to use the first three palette colors."}));
  return f;
}
function intimateGate(){
  if(S.out.mode==="outfit")return{open:false,why:"mode",msg:"Outfit only mode doesn’t write the body."};
  /* the existing safeguard decides, the same way it does for adult body presets and the explicit tag */
  if(!Policy.presetAllowed({adultOnly:true}))return{open:false,why:"policy",msg:Policy.presetNote({adultOnly:true})||"Not available for this subject."};
  if(!Policy.explicitAllowed())return{open:false,why:"policy",msg:Policy.reason()||Policy.banner()||"Not available for this design."};
  if(S.out.mode!=="char"){
    const worn=INTIMATE_COVERING.filter(f=>cur().items[f]);
    if(worn.length)return{open:false,why:"clothed",msg:"Only used when the outfit is nude or the output mode is Character only. This outfit has: "+worn.map(f=>OUT_LABEL[f].toLowerCase()).join(", ")+"."};
  }
  return{open:true};
}
function intimateStrip(){
  const o=cur(),L=o.lock||{};let kept=0;
  INTIMATE_COVERING.forEach(f=>{if(!o.items[f])return;if(L["*"]||L[f]){kept++;return}delete o.items[f]});
  o.showUnder=false;return kept;
}
function intimateFix(){return{label:"Remove clothing",fn:()=>{let k=0;mut(()=>{k=intimateStrip()});if(k)toast(k+" locked item"+(k>1?"s were":" was")+" kept.")}}}
function intimateText(){
  const G=id=>{const v=S.c[id];return v&&v!=="none"?rc(String(v)):""},C=CK.compact;
  const nip=[G("nippleColor"),G("nippleType"),G("nippleLength")].filter(Boolean),are=[G("areolaColor"),G("areolaType"),G("areolaSize")].filter(Boolean);
  const vc=G("vaginaColor"),vt=G("vaginaType"),ph=G("pubicHair"),pc=G("penisColor"),pt=G("penisType"),ps=G("penisSize"),out=[];
  if(C){
    if(nip.length)out.push(nip.join(", ")+" nipples");
    if(are.length)out.push(are.join(", ")+" areolae");
    if(vc||vt)out.push([vc,vt].filter(Boolean).join(", ")+" vagina");
    if(pc||pt||ps)out.push([ps,pc,pt].filter(Boolean).join(", ")+" penis");
    if(ph)out.push(ph);
    return out.join(", ");
  }
  if(nip.length)out.push(`Her nipples are ${joinNatural(nip)}.`);
  if(are.length)out.push(`Her areolae are ${joinNatural(are)}.`);
  if(vt)out.push(`Her ${vc?vc+" ":""}vagina is ${vt}.`);else if(vc)out.push(`Her vagina is ${vc}.`);
  {const pa=[ps,pc].filter(Boolean);if(pt)out.push(`Her ${pa.length?pa.join(", ")+" ":""}penis is ${pt}.`);else if(pa.length)out.push(`Her penis is ${joinNatural(pa)}.`)}
  if(ph)out.push(`She has ${ph}.`);
  return out.join(" ");
}
function intimateApply(raw){
  const set=intimateSet();if(!set.length||S.out.mode==="outfit")return;
  const gt=intimateGate();
  if(!gt.open){if(gt.why==="clothed"&&S.outfits.some((o,i)=>i!==S.cur&&!INTIMATE_COVERING.some(f=>o.items[f])))return;
    note("info",`Intimate details (${set.length} set) are held out of the prompt. ${gt.msg}`,gt.why==="clothed"?intimateFix():undefined);return}
  const t=intimateText();if(t)raw.body=raw.body?raw.body+(CK.compact?", ":" ")+t:t;
}
function intimateRows(f){
  const gt=intimateGate();
  f.append(sub("Intimate details","Adult subjects only. Used only when the outfit is nude (no top, bottom, "+(isMale()?"vest or armor layer, outerwear, undershirt or underwear":"corset, outerwear, bra or panties")+") or the output mode is Character only. Written after the body paragraph."));
  if(!gt.open){
    f.append(h("p",{class:"callout warn"},gt.msg));
    if(gt.why==="clothed")f.append(h("div",{class:"btnrow"},h("button",{type:"button",class:"btn sm",onclick:intimateFix().fn,text:"Remove clothing from this outfit"})));
  }
  {const pb=presetBar(INTIMATE_PRESETS,INTIMATE_FIELDS,"Clear intimate details","ipreset",PRESET_GROUPS.intimate);
    if(!gt.open){pb.classList.add("dropped");pb.setAttribute("inert","")}f.append(pb)}
  [["Nipples",["nippleColor","nippleType","nippleLength"]],["Areolae",["areolaColor","areolaType","areolaSize"]],isMale()?["Genitals and hair",["penisColor","penisType","penisSize","pubicHair"]]:["Vagina and hair",["vaginaColor","vaginaType","pubicHair"]]].forEach(([t,ids])=>{
    f.append(h("p",{class:"muted small",text:t}));ids.forEach(id=>f.append(fieldRow(id)));
  });
}
function coverageHolds(){
  const o=cur(),it=o.items,st=outfitState(o),drop=st.drop||{};
  const nm=f=>(it[f]&&!drop[f])?it[f].v:"";
  const top=nm("top"),bot=nm("bottom"),out=nm("outerwear");
  const isDress=!!(top&&parseOpt("top",top).kind==="dress");
  let lowName=bot||(isDress?top:"");let legSrc="skirt";
  let legs="";
  if(lowName&&!COV_OPEN.test(lowName)){if(COV_FLOOR.test(lowName))legs="full";else if(COV_MID.test(lowName))legs="mid"}
  if(legs!=="full"&&out&&COV_FLOOR.test(out)&&!COV_OPEN.test(out)&&!COV_BARE.test(out)){legs="full";lowName=out;legSrc="gown"}   /* a floor-length gown or coat over a shorter skirt still covers the legs */
  const sleeved=n=>n&&COV_SLEEVE.test(n)&&!COV_BARE.test(n);
  const arms=sleeved(top)||sleeved(out);
  const mid=isDress&&!COV_CROP.test(top)&&!/bodycon|mini|micro/i.test(top);   /* one-piece dresses and gowns only: tees and blouses do not need it */
  const want=[];
  if(legs==="full")want.push("thighBuild","legShape");else if(legs==="mid")want.push("thighBuild");
  if(arms)want.push("armShape");
  if(mid)want.push("stomachShape");
  const holds=[...new Set(want)].filter(f=>S.c[f]!=null&&S.c[f]!==""&&S.c[f]!=="none");
  return{legs,arms,mid,holds,lowName,
    clause:legs==="full"?`Her ${legSrc} falls all the way to the floor, completely covering her legs and thighs.`:"",
    clauseCompact:legs==="full"?`${legSrc} falls to the floor covering the legs`:""};
}
function composeRaw(){
  COVNOW=null;
  if(!S.out.coverMatch||S.out.mode==="char"||S.out.mode==="outfit"||(S.layers.garments&&S.layers.garments.on===false))return composeRaw0();
  const ck0=CK;let cv;CK={compact:false,auto:!!S.out.auto,checks:[]};   /* outfitState writes notes; this scratch CK swallows them */
  try{cv=coverageHolds()}finally{CK=ck0}
  if(!cv.holds.length&&!cv.clause)return composeRaw0();
  COVNOW=cv;
  const c0=S.c;S.c={...c0};cv.holds.forEach(f=>{delete S.c[f]});
  try{
    const r=composeRaw0();
    if(cv.holds.length){
      const why=cv.legs==="full"?`The ${cv.lowName} covers the legs.`:cv.legs==="mid"?`The ${cv.lowName} covers the thighs.`:"This outfit covers the body.";
      note("info",`${why} These body details are left out of the prompt so the generator doesn’t pull the clothes aside: ${joinNatural(cv.holds.map(f=>labelOf(f).toLowerCase()))}. Your overall body shape and size still apply.`,{label:"Keep all body details",fn:()=>mut(()=>{S.out.coverMatch=false})});
    }
    return r;
  }finally{S.c=c0;COVNOW=null}
}
function tplById(id){
  const S_=tplById;let m=S_.m,i=m&&m.get(id);
  if(i!==undefined&&TEMPLATES[i]&&TEMPLATES[i].id===id)return TEMPLATES[i];
  if(!m||S_.n!==TEMPLATES.length||i!==undefined){m=S_.m=new Map();TEMPLATES.forEach((t,j)=>m.set(t.id,j));S_.n=TEMPLATES.length;i=m.get(id);return i!==undefined?TEMPLATES[i]:undefined}
  return undefined;
}
function isMale(){return !!(S&&S.c&&S.c.sex==="male")}
function sexFits(field,v,male){
  const t=sexTagOf(field,v);
  if(t==="m")return !!male;if(t==="f")return !male;if(t==="b")return true;
  if(!male)return true;
  if(FEM_ALL[field])return false;
  const rx=FEM_RX[field];if(rx&&rx.test(v))return false;
  return !FEM_RX_ALL.test(v);
}
function addM(field,vals,group,front){
  CHAR[field]=CHAR[field]||[];SEXTAG[field]=SEXTAG[field]||{};
  const have=new Set(CHAR[field].map(x=>x[0]));
  const fresh=vals.filter((v,i)=>!have.has(v)&&vals.indexOf(v)===i);
  fresh.forEach(v=>{SEXTAG[field][v]="m"});
  const add=fresh.map(v=>[v,group||""]);
  CHAR[field]=front?add.concat(CHAR[field]):CHAR[field].concat(add);
  return fresh.length;
}
function tagSex(field,vals,t){SEXTAG[field]=SEXTAG[field]||{};vals.forEach(v=>{SEXTAG[field][v]=t})}
function itemSexFits(field,v,male){
  const t=(OSEX[field]||{})[v]||"";
  if(t==="m")return !!male;if(t==="f")return !male;if(t==="b")return true;
  if(!male)return true;
  if(OFEM_ALL[field])return false;
  const rx=OFEM_RX[field];return !(rx&&rx.test(v));
}
function addMO(field,list){
  OUTFIT[field]=OUTFIT[field]||[];OSEX[field]=OSEX[field]||{};
  list.forEach(([v,t,fam,s,g])=>{
    if(OUTFIT[field].some(i=>i.v===v)){OSEX[field][v]="b";return}
    const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[field].push(it);OSEX[field][v]="m";
  });
}
function presetSexOk(p){
  if(!p||SEXPREF.both)return true;
  if(p.sex==="m")return isMale();
  if(p.sex==="f")return !isMale();
  if(isMale()){const n=String(p.label||p.name||"");if(FEM_PRESET_RX.test(n)||(!p.items&&/\bcute\b/i.test(n)))return false}
  return true;
}
function maleize(t){
  if(!t)return t;
  return String(t)
    .replace(/\bShe\b/g,"He").replace(/\bshe\b/g,"he")
    .replace(/\bHerself\b/g,"Himself").replace(/\bherself\b/g,"himself")
    .replace(/\bHers\b/g,"His").replace(/\bhers\b/g,"his")
    .replace(/\b[Hh]er\b/g,(m,off,str)=>{
      const after=str.slice(off+3),mm=after.match(/^\s+([^\s.,;:!?)\]}]+)/);
      const poss=!!mm&&!OBJ_NEXT.test(mm[1].replace(/[^A-Za-z]/g,""));
      return m[0]==="H"?(poss?"His":"Him"):(poss?"his":"him");
    });
}
function labelOf(f){return(isMale()&&MALE_LABELS[f])||LABELS[f]||f}
function maleSubjectNoun(sp,type,noun,pre){
  if(type==="hyphen")return pre+sp+"-"+noun;
  if(type==="word")return pre+sp+" "+noun;
  return pre+(MALE_SOLO[sp]||"male "+sp);
}
function swapChar(field,v,toMale){
  if(typeof v!=="string"||!v||v[0]==="@"||v==="none"||v==="auto")return undefined;
  if(!CHAR[field]||!CHAR[field].length)return undefined;
  if(sexFits(field,v,toMale))return undefined;
  const t=SW[field];
  if(t){
    const rules=toMale?t.f2m:t.m2f;
    if(rules)for(const [rx,val] of rules)if(rx.test(v))return val;
    const def=toMale?t.f2mDef:t.m2fDef;
    if(def!==undefined)return def;
  }
  return null;
}
function convertChars(c,toMale,rep){
  /* hair the swap leaves alone (locked, or already a style a man wears) keeps its movement line too */
  const hairHold=toMale&&(kept("hairStyle")||hairAction(c.hairStyle)==="keep");
  Object.keys(c).forEach(f=>{
    if(f==="sex"||heldField(f))return;
    if(hairHold&&f==="hairMovement")return;
    const r=swapChar(f,c[f],toMale);
    if(r===undefined)return;
    if(r===null){delete c[f];rep.cleared++;(rep.names=rep.names||[]).push(labelOf(f).toLowerCase())}
    else{c[f]=r;rep.changed++}
  });
  /* the one cross-field case: anatomy */
  if(toMale){
    if(!heldField("vaginaColor")){
      if(c.vaginaColor&&!c.penisColor&&CHAR.penisColor.some(x=>x[0]===c.vaginaColor))c.penisColor=c.vaginaColor;
      delete c.vaginaColor;
    }
    if(!heldField("vaginaType"))delete c.vaginaType;
  }else{
    if(!heldField("penisColor")&&c.penisColor&&!c.vaginaColor&&CHAR.vaginaColor.some(x=>x[0]===c.penisColor)&&!heldField("vaginaColor"))c.vaginaColor=c.penisColor;
    MALE_ONLY_FIELDS.forEach(f=>{if(!heldField(f))delete c[f]});
  }
}
function swapItem(field,v,toMale,o){
  const t=SWO[field];if(!t)return undefined;
  const res=x=>typeof x==="function"?x(o):x;
  const rules=toMale?t.f2m:t.m2f;
  if(rules)for(const [rx,val] of rules)if(rx.test(v)){
    if(val==="@denim")return/mini|micro|short|skort/i.test(v)?"denim shorts":"slim-fit jeans";
    return res(val);
  }
  const def=toMale?t.f2mDef:t.m2fDef;
  return def===undefined?undefined:res(def);
}
function swapDress(v,hasBottom){
  const s=v.toLowerCase();
  let top="button-up shirt",bot="chino trousers";
  if(/gown|evening|ball|formal|cocktail|satin|velvet|silk|sequin/.test(s)){top="tuxedo shirt with a pleated front";bot="tailored suit trousers"}
  else if(/summer|sun|beach|floral|linen|cotton|picnic/.test(s)){top="linen button-up shirt";bot="chino shorts"}
  else if(/sweater|knit|hoodie|winter|wool/.test(s)){top="crew-neck sweater";bot="chino trousers"}
  else if(/leather|latex|vinyl|gothic|punk|corset|lace/.test(s)){top="fitted mesh long-sleeve shirt";bot="leather pants"}
  return{top,bot:hasBottom?null:bot};
}
function convertOutfit(o,toMale,rep){
  const L=o.lock||{};
  if(L["*"])return;
  const items=o.items||{},out={},add={};
  Object.keys(items).forEach(f=>{
    const it=items[f];
    if(!it||typeof it.v!=="string"){return}
    if(L[f]){out[f]=it;return}
    if(toMale&&rep.jewelry&&isJewel(f,it.v)){rep.removed++;return}
    if(itemSexFits(f,it.v,toMale)){out[f]=it;return}
    if(toMale&&f==="top"&&kindOf("top",it.v)==="dress"){
      const d=swapDress(it.v,!!items.bottom);
      out.top={...it,v:d.top};delete out.top.w;if(!/\{c2\}/.test(d.top))delete out.top.c2;
      if(d.bot)add.bottom={v:d.bot,c:"auto"};
      rep.items++;return;
    }
    const r=swapItem(f,it.v,toMale,o);
    if(r===undefined){out[f]=it;return}
    if(r===null){rep.removed++;if(toMale&&f==="top"&&/bikini|swimsuit|one-piece/i.test(it.v)&&!items.bottom)add.bottom={v:"swim trunks",c:"auto"};return}
    if(out[f]&&out[f].v===r){rep.removed++;return}
    const n={...it,v:r};delete n.w;if(!/\{c2\}/.test(r))delete n.c2;
    out[f]=n;rep.items++;
  });
  Object.keys(add).forEach(f=>{if(!out[f]){out[f]=add[f];rep.items++}});
  if(toMale)Object.keys(out).forEach(f=>{
    if(L[f]||!MASC_O[f])return;
    const it=out[f];if(!it||typeof it.v!=="string")return;
    for(const [rx,val] of MASC_O[f])if(rx.test(it.v)){
      if(it.v!==val&&(OUTFIT[f]||[]).some(i=>i.v===val)){const n={...it,v:val};delete n.w;if(!/\{c2\}/.test(val))delete n.c2;out[f]=n;rep.items++}
      break;
    }
  });
  o.items=out;
  ["detailOne","detailTwo","detailThree"].forEach(f=>{
    const v=(o.details||{})[f];
    if(v&&!L["d:"+f]&&!itemSexFits(f,v,toMale)){delete o.details[f];if(o.dcol)delete o.dcol[f];rep.removed++}
  });
}
function hairAction(v){
  if(!v)return"none";
  if((SEXTAG.hairStyle||{})[v]==="m")return"keep";              /* already a male style: leave the whole hair block alone */
  const g=(CHAR.hairStyle.find(x=>x[0]===v)||[0,""])[1];
  const fem=!!((FEM_RX.hairStyle&&FEM_RX.hairStyle.test(v))||FEM_RX_ALL.test(v));
  if(g==="Fantasy Hair"&&!fem)return"keep";                      /* effect hair has no short equivalent */
  if(/^box braids$/i.test(v))return"convert";
  if(/^(cornrows)$/i.test(v)||(g==="Natural / Textured"&&!fem))return"natural";   /* natural styles stay, length and fringe still follow */
  if(/\blong\b|very long|waist|hip-length|knee/i.test(v))return"convert";
  if(g==="Short Styles"&&!fem)return"short";
  if(!g&&!fem&&/\b(short|cropped|buzz(ed)?|crew|fade|undercut|crop)\b/i.test(v))return"short";
  return"convert";
}
function maleStyleFor(v){
  const s=String(v).toLowerCase();
  if(/^box braids$/.test(s))return"cornrows";
  if(/pixie|bixie/.test(s))return"textured crop";
  if(/\bbob\b|\blob\b|pageboy/.test(s))return"short wolf cut";
  if(/swept-back|slicked|pulled back|tied back/.test(s))return"slicked-back hair";
  if(/\bcurl(y|s)\b|coil|spiral|kinky/.test(s))return"short curly hair";
  if(/wav/.test(s))return"waves haircut";
  if(/ponytail|bun|updo|knot|chignon|twist|beehive|ballerina|halo|crown/.test(s))return"side-swept undercut";
  if(/braid|twin|pigtail|bunny|bow|ribbon|princess|hime|jellyfish|butterfly/.test(s))return"textured crop";
  if(/layer|shag|wolf|feather|curtain/.test(s))return"short wolf cut";
  if(/straight|sleek|blunt|glossy|silk|parted/.test(s))return"classic side part";
  return"textured crop";
}
function maleBangsFor(v){
  const s=String(v).toLowerCase();
  if(/ahoge/.test(s))return"messy fringe";
  if(/curtain/.test(s))return"curtain fringe";
  if(/open forehead|center-parted|neat center part/.test(s))return"swept-back front";
  if(/side|diagonal|asymmetr/.test(s))return"side-swept fringe";
  return"textured fringe";
}
function maleHair(c,rep){
  if(kept("hairStyle"))return;                       /* locked style (or locked hair step): leave the hair as it is */
  const act=hairAction(c.hairStyle);
  if(act==="keep")return;
  if(act==="convert"){c.hairStyle=maleStyleFor(c.hairStyle);rep.changed++}
  if(c.hairLength&&!kept("hairLength")&&!SHORT_LEN.has(c.hairLength)){c.hairLength="short";rep.changed++}
  if(c.hairMovement&&!kept("hairMovement")&&!/wind|breeze/i.test(c.hairMovement)){delete c.hairMovement;rep.cleared++;(rep.names=rep.names||[]).push("hair movement")}
  if(c.bangs&&!kept("bangs")&&!BANG_KEEP.test(c.bangs)&&(SEXTAG.bangs||{})[c.bangs]!=="m"){c.bangs=maleBangsFor(c.bangs);rep.changed++}
}
function bodyTier(pre){
  const vals=["bodySoftness","thighBuild","hipShape","buttSize","bustSize","legShape","waistShape","stomachShape"].map(f=>String((pre&&pre[f])||"")).filter(Boolean).join(" | ");
  const n=rx=>(vals.match(rx)||[]).length;
  const s=n(/\b(thick|curvy|full|voluptuous|plush|plump|wide|large|huge|enormous|hourglass|exaggerated|bombshell|heavy|massive)\b/gi)-n(/\b(slender|slim|petite|willowy|delicate|thin|lithe|dancer|narrow|small|flat|lean)\b/gi);
  return s>=8?"powerful":s>=4?"sturdy":s<=-4?"lean":"athletic";
}
function mascPass(c,pre,rep,opts){
  opts=opts||{};
  const ok=f=>!opts.only||opts.only.has(f);
  const set=(f,v)=>{
    if(heldField(f)||!ok(f)||v===undefined||c[f]===v)return;
    if(v===null){delete c[f];rep.cleared++}else{c[f]=v;rep.changed++}
  };
  Object.keys(MASC).forEach(f=>{
    const v=c[f];if(typeof v!=="string"||!v||heldField(f)||!ok(f)||isMOpt(f,v))return;
    const t=MASC[f];if(t.keep&&t.keep.test(v)&&!(t.kill&&t.kill.test(v)))return;
    const r=t.fn?t.fn(v):firstRule(t.rules||[],v);
    if(r&&hasOpt(f,r))set(f,r);
  });
  /* lip color goes when the lips are re-shaped */
  if(c.mouthShapeColor&&!heldField("mouthShapeColor")&&/pink|red|rose|coral|peach|berry|plum|nude|cherry|magenta|mauve/i.test(c.mouthShapeColor))set("mouthShapeColor",null);
  /* proportions */
  if(opts.tiers!==false){const tier=MASC_TIERS[bodyTier(pre)];
    Object.keys(tier).forEach(f=>{if(c[f]!=null&&c[f]!==""&&!heldField(f)&&hasOpt(f,tier[f]))set(f,tier[f])})}
  /* makeup */
  /* makeup comes off completely and nails go clean; marks that are not cosmetics (war paint, scars, sunscreen) stay */
  if(opts.makeup!==false){
    MAKEUP_FIELDS_M.forEach(f=>{
      if(c[f]==null||heldField(f))return;
      if(f==="faceAccents"&&/tribal|war paint|scar|zinc|sunscreen/i.test(c[f]))return;
      set(f,null);
    });
    MAKEUP_FIELDS_M.forEach(f=>{if(f!=="makeupColor"&&c[f]==null&&c[f+"Color"]!=null&&!heldField(f+"Color"))set(f+"Color",null)});
    if(c.nailColor!=null&&!heldField("nailColor")&&!/claw/i.test(c.nailStyle||""))set("nailColor",null);
  }
}
function stripTrinkets(s){
  const lead="(?:,\\s*)?(?:\\band\\s+)?(?:\\ban?\\s+|\\bthe\\s+)?(?:\\b(?!(?:with|and|or|of|in|on|for|to|the|an?|plus|including|featuring)\\b)[\\w-]+\\s+){0,2}";
  s=s.replace(new RegExp(lead+"jewel(?:le)?ry(?:\\s+(?:theme|accents?|details?|set|pieces?|touches))?","gi"),"")
     .replace(new RegExp(lead+"(?:make-?up|lipstick|eyeliner|eyeshadow|mascara|nail polish)(?:\\s+(?:theme|look|accents?|details?))?","gi"),"");
  return s.replace(/\s{2,}/g," ").replace(/\s+([,.;])/g,"$1").replace(/,\s*,/g,",").replace(/\b(with|of|plus|including|featuring)\s+and\s+/gi,"$1 ").replace(/\b(?:with|and|of|plus|including|featuring)\s*([,.;]|$)/gi,"$1").replace(/^[\s,;]+(?:and\s+)?/i,"").replace(/[\s,;]+(?:and\s*)?$/i,"").trim();
}
function maleText(t){
  if(!t)return t;
  let s=maleize(t);
  MALE_WORDS.forEach(([rx,v])=>{s=s.replace(rx,v)});
  s=stripTrinkets(s);
  return s.replace(/\b(\w+), \1\b/gi,"$1");
}
function fixSexChars(){
  if(!isMale())return;
  const rep={changed:0,cleared:0,items:0,removed:0};
  convertChars(S.c,true,rep);return rep;
}
function fixSexOutfit(o){
  if(!isMale())return;
  const rep={changed:0,cleared:0,items:0,removed:0};
  convertOutfit(o||cur(),true,rep);return rep;
}
function outShape(o){return{items:{...(o.items||{})},details:{...(o.details||{})},dcol:{...(o.dcol||{})}}}
function swapSex(to){
  const toMale=to==="male";
  if(toMale===isMale())return;
  /* v210: only a girl-labeled design (the safeguard's age rule) stays female; male ages are all adult, and a male design is
     still checked by the safeguard like any other */
  if(toMale&&Policy.restricted()){
    const why=Policy.reason()||Policy.banner()||"";
    toast("The age safeguard flags this design"+(why?" ("+why.replace(/[.\s]+$/,"")+")":"")+", so it can’t be switched to male. Adjust it or start from an adult design.");
    return;
  }
  const rep={changed:0,cleared:0,items:0,removed:0,restored:0,jewelry:toMale};
  mut(()=>{
    const memo=S.sexMemo&&S.sexMemo.to===(toMale?"female":"male")?S.sexMemo:null;
    const cPre={...S.c},oPre=S.outfits.map(outShape),tPre={};OUT_TEXT.forEach(k=>{tPre[k]=S.out[k]});
    if(toMale)maleHair(S.c,rep);
    convertChars(S.c,toMale,rep);
    if(toMale){mascPass(S.c,cPre,rep);OUT_TEXT.forEach(k=>{if(S.out[k]&&!/^\s*$/.test(S.out[k])){const n=maleText(S.out[k]);if(n!==S.out[k]){S.out[k]=n;rep.changed++}}})}
    if(toMale)S.c.sex="male";else delete S.c.sex;
    S.outfits.forEach(o=>convertOutfit(o,toMale,rep));
    if(memo){
      /* options that still hold exactly what the earlier swap produced go back to the original */
      Object.keys(memo.c).forEach(k=>{
        const [was,became]=memo.c[k];
        if(jq(cPre[k])!==jq(became))return;
        if(was===null||was===undefined)delete S.c[k];else S.c[k]=was;
        rep.restored++;
      });
      (memo.o||[]).forEach((m,i)=>{
        const o=S.outfits[i],pre=oPre[i];if(!o||!m)return;
        ["items","details","dcol"].forEach(part=>{
          Object.keys(m[part]||{}).forEach(k=>{
            const [was,became]=m[part][k];
            if(jq((pre||{})[part]&&pre[part][k])!==jq(became))return;
            if(was===null||was===undefined)delete o[part][k];else o[part][k]=was;
            if(part==="items")rep.restored++;
          });
        });
      });
      if(memo.out)Object.keys(memo.out).forEach(k=>{const [was,became]=memo.out[k];if(S.out[k]===became&&tPre[k]===became){S.out[k]=was;rep.restored++}});
      delete S.sexMemo;
    }else{
      /* first swap of this design: remember the originals */
      const m={to:toMale?"male":"female",c:{},o:[]};
      new Set([...Object.keys(cPre),...Object.keys(S.c)]).forEach(k=>{
        if(k==="sex")return;
        if(jq(cPre[k])!==jq(S.c[k]))m.c[k]=[cPre[k]===undefined?null:cPre[k],S.c[k]===undefined?null:S.c[k]];
      });
      S.outfits.forEach((o,i)=>{
        const mo={items:{},details:{},dcol:{}},post=outShape(o);
        ["items","details","dcol"].forEach(part=>{
          new Set([...Object.keys(oPre[i][part]),...Object.keys(post[part])]).forEach(k=>{
            if(jq(oPre[i][part][k])!==jq(post[part][k]))mo[part][k]=[oPre[i][part][k]===undefined?null:oPre[i][part][k],post[part][k]===undefined?null:post[part][k]];
          });
        });
        m.o.push(mo);
      });
      m.out={};OUT_TEXT.forEach(k=>{if(tPre[k]!==S.out[k])m.out[k]=[tPre[k]===undefined?"":tPre[k],S.out[k]]});
      S.sexMemo=m;
    }
  },"sexswap");
  const n=rep.changed+rep.items,gone=rep.cleared+rep.removed;
  toast((toMale?"Switched to male. ":"Switched to female. ")+(rep.restored?`${rep.restored} original option${rep.restored===1?"":"s"} restored. `:"")+(n?`${n} option${n===1?"":"s"} converted`:"Nothing needed converting")+(gone?`, ${gone} cleared because they have no ${toMale?"male":"female"} equivalent`:"")+". Undo restores the previous design.");
}
function sexRow(){
  const male=isMale();
  const seg=(label,val)=>h("button",{type:"button",class:"chip"+((val==="male")===male?" on":""),"aria-pressed":((val==="male")===male)?"true":"false",onclick:()=>swapSex(val),text:label});
  const lab=h("div",{class:"lab"},h("div",{class:"labtop"},h("label",{text:"Sex"})),h("small",{class:"hint",text:male?"Male options, outfits and wording are active. Switching back converts the design to female.":"Switch to convert this whole design (options and outfits) to a male character."}));
  const ctl=h("div",{class:"ctl"},h("div",{class:"chips",role:"group","aria-label":"Sex"},seg("Female","female"),seg("Male","male")));
  const both=h("label",{class:"inline",style:"display:flex;gap:8px;align-items:center;margin-top:8px;font-size:13px"},
    h("input",{type:"checkbox",checked:SEXPREF.both?true:null,onchange:e=>{SEXPREF.both=!!e.target.checked;saveJSON(KEY_SEXPREF,SEXPREF);changed()}}),
    h("span",{text:"Show options for both sexes"}));
  ctl.append(both);
  return h("div",{class:"row","data-field":"sex"},lab,ctl);
}
function facialHairText(){
  const v=g("facialHair");if(!v)return"";
  if(/^clean-shaven$/i.test(v))return"a clean-shaven face";
  const c=g("facialHairColor"),base=/stubble|sideburns|chops|shadow/i.test(v)?(/shadow/i.test(v)?withArticle(v):v):withArticle(v);
  return c?`${base} in ${c}`:base;
}
function mascRollFields(steps){
  const only=new Set();
  ["face"].forEach(st=>{if(steps.has(st)&&!stepFrozen(st))STEP_FIELDS[st].forEach(f=>only.add(f))});
  if(only.size)mascPass(S.c,S.c,{changed:0,cleared:0},{only,tiers:false,makeup:false});
  if(only.has("faceShape")){
    ["faceShape","browShape","noseShape","mouthShape","impression"].forEach(f=>{
      if(heldField(f)||!CHAR[f]||Math.random()>.55)return;
      const a=CHAR[f].filter(([x])=>isMOpt(f,x)&&Policy.optionAllowed(f,x)).map(x=>x[0]);
      if(a.length)S.c[f]=a[Math.floor(Math.random()*a.length)];
    });
  }
}
function mascBodyRoll(free,pick1){
  const r=Math.random(),tk=r<.25?"lean":r<.65?"athletic":r<.9?"sturdy":"powerful";
  Object.entries(MASC_TIERS[tk]).forEach(([f,v])=>{
    if(!hasOpt(f,v)||!free(f))return;
    S.c[f]=v;
  });
  /* one small variation per roll, kept in the same build so the body still reads as one man */
  const big=tk==="sturdy"||tk==="powerful",skip=big?/lean|wiry|slim|slender|skinny|narrow|soft|gaunt/i:/burly|bulky|massive|heavy|thick|hulking|barrel/i;
  const wild=["torsoShape","armShape","stomachShape","hipShape","buttSize","handShape"].filter(f=>free(f)&&CHAR[f]);
  if(wild.length&&Math.random()<.5){
    const f=pick1(wild),a=CHAR[f].filter(([x])=>isMOpt(f,x)&&Policy.optionAllowed(f,x)&&!skip.test(x)).map(x=>x[0]);
    if(a.length)S.c[f]=pick1(a);
  }
  if(free("heightStature")){const a=CHAR.heightStature.filter(([x])=>isMOpt("heightStature",x)||/^(average|slightly above|above-average|tall)/.test(x)).map(x=>x[0]);if(a.length)S.c.heightStature=pick1(a)}
}
function mascMakeupRoll(free,pick1,clr){
  STEP_FIELDS.makeup.forEach(clr);
  if(Math.random()<.25){const ms=CHAR.makeupStyle.filter(([v])=>isMOpt("makeupStyle",v)).map(x=>x[0]);if(free("makeupStyle")&&ms.length)S.c.makeupStyle=pick1(ms)}
  if(free("nailStyle")&&Math.random()<.5){const ns=CHAR.nailStyle.filter(([v])=>isMOpt("nailStyle",v)).map(x=>x[0]);const plain=ns.filter(v=>!/paint|polish/i.test(v));if(ns.length)S.c.nailStyle=pick1(plain.length&&Math.random()<.85?plain:ns)}
}
function stateFromTemplate(t){
  const b=blankState();b.name=t.name;Object.assign(b.pal,t.pal);
  const c={...t.c};const body=c._body;delete c._body;
  if(body&&BODY_PRESETS[body])Object.assign(c,BODY_PRESETS[body].v);
  b.c=c;
  const mk=(sp,nm)=>{const o=newOutfit(sp.oname||nm);o.look=sp.look||"";o.showUnder=!!sp.showUnder;
    Object.entries(sp.items).forEach(([f,[v,col,w,c2]])=>{o.items[f]={v,c:col,...(w?{w}:{}),...(c2?{c2}:{})}});Object.assign(o.details,sp.details||{});o.dcol={...(sp.dcol||{})};return o};
  b.outfits=[mk(t.outfit,t.name.split(" ")[0]+" outfit")].concat((t.more||[]).map((m,i)=>mk(m,"Outfit "+(i+2))));
  b.out={...S.out,...(t.out||{})};b.out.palName=(t.out&&t.out.palName)||"";b.out.repeatBody=!!(t.out&&t.out.repeatBody);b.layers={...S.layers};b.order=S.order.slice();if(b.out.style==="narrative")b.order=narrOrder(b.order,true);
  return b;
}
function partOf(f){
  if(f==="sex"||f==="_body")return null;
  const b=baseField(f);
  if(PART_SKIN.has(f)||PART_SKIN.has(b))return"skin";
  if(PART_INTIMATE.test(b))return"intimate";
  const s=stepOf(f);
  return s==="palette"||s==="outfit"?null:s;
}
function litColor(v,pal){
  if(typeof v!=="string"||v[0]!=="@")return v;
  const names=v.split("+").map(x=>x[0]==="@"?(pal[x.slice(1)]||""):x).filter(Boolean);
  return names.length?joinNatural(names):v;
}
function recentStarts(){return loadJSON(KEY_RECENT_STARTS,[])}
function noteRecent(key){saveJSON(KEY_RECENT_STARTS,[key].concat(recentStarts().filter(k=>k!==key)).slice(0,10))}
function spCatalog(){
  const tById=Object.fromEntries(TEMPLATES.map(t=>[t.id,t]));
  const groups=PRESET_GROUPS.start.concat([{label:"More",keys:TEMPLATES.map(t=>t.id).filter(id=>!PRESET_GROUPS.start.some(g=>g.keys.includes(id)))}])
    .map(g=>({label:g.label,keys:g.keys.filter(k=>tById[k])})).filter(g=>g.keys.length);
  const list=[],seen=new Set();
  groups.forEach(g=>g.keys.forEach(k=>{if(seen.has(k))return;seen.add(k);const t=tById[k];list.push({key:"t:"+k,t,name:t.name,blurb:t.blurb||"",pal:t.pal||{},c:t.c||{},group:g.label})}));
  readSaves().forEach(s=>{const st=s.state||{};list.push({key:"s:"+s.id,s,name:s.name||"Untitled",blurb:"Saved "+new Date(s.ts).toLocaleDateString(),pal:st.pal||{},c:st.c||{},group:"My saves"})});
  list.forEach((e,i)=>{e.i=i;e.hay=spHay(e)});
  return{list,groups,byKey:Object.fromEntries(list.map(e=>[e.key,e]))};
}
function spHay(e){
  const out=[e.name,e.group,e.blurb,...Object.values(e.pal)];
  const res=v=>typeof v==="string"&&v[0]==="@"?litColor(v,e.pal):v;
  const c={...e.c};if(c._body&&BODY_PRESETS[c._body])Object.assign(c,BODY_PRESETS[c._body].v);
  ["age","subjectType","hairStyle","hairLength","hairTexture","hairBase","hairUnderlayer","hairHighlights","eyeOne","eyeTwo","skinTone","bodySoftness","heightStature","bustSize","expression","impression","makeupStyle"].forEach(f=>{if(c[f])out.push(String(res(c[f])))});
  if(e.t){[e.t.outfit].concat(e.t.more||[]).forEach(o=>{if(!o)return;out.push(o.oname||"");Object.values(o.items||{}).forEach(a=>out.push(Array.isArray(a)?a[0]:a&&a.v))});(e.t.tags||[]).forEach(x=>out.push(x))}
  return out.filter(Boolean).join("\n").toLowerCase();
}
function spScore(e,terms){
  let s=0;const n=e.name.toLowerCase(),g=e.group.toLowerCase(),pals=Object.values(e.pal).join(" ").toLowerCase();
  for(const t of terms){
    if(!e.hay.includes(t))return-1;
    if(n.startsWith(t))s+=20;else if(new RegExp("(^|\\W)"+spRx(t)).test(n))s+=14;else if(n.includes(t))s+=10;
    else if(g.includes(t))s+=6;else if(pals.includes(t))s+=4;else s+=1;
  }
  return s;
}
function spTile(pal,cls){const cols=SLOT_KEYS.map(k=>pal&&pal[k]).filter(Boolean);return h("span",{class:"sp-tile"+(cls?" "+cls:""),"aria-hidden":"true"},cols.map(n=>h("i",{style:`background:${spHex(n)}`})))}
function spRow(e,showGroup){
  return h("div",{class:"sp-row",role:"listitem"},
    h("button",{type:"button",class:"sp-main","data-key":e.key,onclick:()=>spLoad(e)},
      spTile(e.pal),
      h("span",{class:"sp-txt"},h("b",{text:e.name}),h("small",{class:"sp-sub"},showGroup?h("span",{class:"sp-g",text:e.group}):null,e.blurb))),
    h("button",{type:"button",class:"sp-pb","aria-label":`Take parts from ${e.name}`,onclick:ev=>spOpenParts(e,ev.currentTarget),text:"Parts"}));
}
function spBlankRow(){
  return h("div",{class:"sp-row",role:"listitem"},
    h("button",{type:"button",class:"sp-main start blank",onclick:()=>{replaceState({...blankState(),out:S.out,layers:S.layers,order:S.order});$("#startsDlg").close()}},
      h("span",{class:"sp-tile blank","aria-hidden":"true"}),
      h("span",{class:"sp-txt"},h("b",{text:"Blank"}),h("small",{class:"sp-sub",text:"Nothing set. Build from nothing."}))));
}
function renderStartGroups(){
  const wrap=$("#spGroups");wrap.textContent="";
  const chip=(id,label)=>h("button",{type:"button",class:"chip"+(SP.grp===id?" on":""),"aria-pressed":SP.grp===id?"true":"false",onclick:()=>{SP.grp=id;renderStartGroups();renderStartList();$("#spScroll").scrollTop=0},text:label});
  wrap.append(chip("all","All"));
  if(recentStarts().some(k=>SP.data.byKey[k]))wrap.append(chip("recent","Recent"));
  SP.data.groups.forEach(g=>wrap.append(chip("g:"+g.label,g.label)));
  if(SP.data.list.some(e=>e.s))wrap.append(chip("saves","My saves"));
}
function renderStartList(){
  const box=$("#startGrid");box.textContent="";
  const terms=SP.q.toLowerCase().split(/\s+/).filter(Boolean);
  let pool=SP.data.list;
  if(SP.grp==="recent")pool=recentStarts().map(k=>SP.data.byKey[k]).filter(Boolean);
  else if(SP.grp==="saves")pool=pool.filter(e=>e.s);
  else if(SP.grp.startsWith("g:"))pool=pool.filter(e=>!e.s&&e.group===SP.grp.slice(2));
  if(terms.length){
    const hits=pool.map(e=>[e,spScore(e,terms)]).filter(x=>x[1]>=0).sort((a,b)=>b[1]-a[1]||a[0].i-b[0].i).map(x=>x[0]);
    if(!hits.length){
      box.append(h("div",{class:"sp-empty"},h("p",{text:`No starting points match “${SP.q.trim()}”. Try a house, a color or a hair style.`}),
        h("button",{type:"button",class:"btn sm",onclick:()=>{SP.q="";$("#spQ").value="";SP.grp="all";renderStartGroups();renderStartList();$("#spQ").focus()},text:"Clear the search"})));
      return;
    }
    hits.forEach(e=>box.append(spRow(e,SP.grp==="all"||SP.grp==="recent")));
    return;
  }
  if(SP.grp==="all"){
    box.append(spBlankRow());
    let last="";
    pool.forEach(e=>{if(e.group!==last){last=e.group;const n=pool.filter(x=>x.group===e.group).length;box.append(h("h3",{class:"sp-gh"},e.group,h("small",{text:String(n)})))}box.append(spRow(e,false))});
    return;
  }
  pool.forEach(e=>box.append(spRow(e,SP.grp==="recent")));
}
function openStarts(){
  const d=$("#startsDlg");
  SP.data=spCatalog();SP.q="";SP.src=null;
  if(SP.grp!=="all"&&!(SP.grp==="recent"||SP.grp==="saves"||SP.data.groups.some(g=>"g:"+g.label===SP.grp)))SP.grp="all";
  const q=$("#spQ");q.value="";q.placeholder=`Search ${SP.data.list.length} starting points`;
  q.oninput=()=>{SP.q=q.value;renderStartList();$("#spScroll").scrollTop=0};
  q.onkeydown=ev=>{if(ev.key==="Enter"){const b=$("#startGrid .sp-main:not(.blank)");if(b){ev.preventDefault();b.click()}}};
  spShowParts(false);renderStartGroups();renderStartList();
  d.showModal();$("#spScroll").scrollTop=0;
  if(matchMedia("(pointer:fine)").matches)q.focus();
}
function spLoad(e){
  const d=$("#startsDlg");
  if(e.t)loadStart(e.t);else{replaceState(e.s.state);toast(`Loaded “${e.name}”.`)}
  noteRecent(e.key);d.close();
}
function spSource(e){return e.t?stateFromTemplate(e.t):normalize(JSON.parse(JSON.stringify(e.s.state)))}
function sexCopy(st,toMale){
  const keep=S;
  try{
    S=normalize(JSON.parse(JSON.stringify(st)));
    if(toMale&&Policy.restricted())return null;
    const rep={changed:0,cleared:0,items:0,removed:0,restored:0,jewelry:toMale},cPre={...S.c};
    if(toMale)maleHair(S.c,rep);
    convertChars(S.c,toMale,rep);
    if(toMale){mascPass(S.c,cPre,rep);OUT_TEXT.forEach(k=>{if(S.out[k]&&!/^\s*$/.test(S.out[k]))S.out[k]=maleText(S.out[k])})}
    if(toMale)S.c.sex="male";else delete S.c.sex;
    S.outfits.forEach(o=>convertOutfit(o,toMale,rep));
    delete S.sexMemo;
    return S;
  }catch(err){return null}
  finally{S=keep}
}
function partInfo(src,raw){
  const info={};
  const res=v=>litColor(v,src.pal);
  const ORDER=[].concat(STEP_FIELDS.concept,STEP_FIELDS.face,STEP_FIELDS.hair,["skinTone","undertone","skinFinish","markings","bodyMarkings"],STEP_FIELDS.body,STEP_FIELDS.makeup);
  const rank=f=>{const i=ORDER.indexOf(f);return i<0?999:i};
  const vals=p=>Object.keys(src.c).filter(f=>partOf(f)===p&&!/Color$/.test(f)&&src.c[f]!==""&&src.c[f]!=null).sort((a,b)=>rank(a)-rank(b)).map(f=>String(res(src.c[f])));
  PARTS.forEach(([p])=>{
    if(p==="palette"){const n=SLOT_KEYS.map(k=>src.pal[k]).filter(Boolean);if(n.length)info[p]=joinNatural(n);return}
    if(p==="outfits"){const n=src.outfits.filter(o=>Object.keys(o.items||{}).length||/nude/i.test(o.name||"")).map(o=>o.name);if(n.length)info[p]=joinNatural(n);return}
    if(p==="finish"){const o=raw&&raw.out?raw.out:src.out;const bits=[];if(o.framing)bits.push(o.framing+" framing");if(o.must)bits.push("must-haves");if(o.avoid)bits.push("things to avoid");if(o.style==="narrative")bits.push("sentence style");if(o.notes)bits.push("notes");if(bits.length)info[p]=bits.join(", ");return}
    const v=vals(p);if(!v.length)return;
    const all=Object.keys(src.c).filter(f=>partOf(f)===p&&src.c[f]!==""&&src.c[f]!=null).length;
    info[p]=p==="intimate"?`${all} details for the Nude outfit`:v.slice(0,3).join(", ")+(v.length>3?` and ${v.length-3} more`:"");
  });
  return info;
}
function spShowParts(on){
  $("#spParts").hidden=!on;["#spScroll",".sp-bar",".sp-foot"].forEach(s=>{const n=$("#startsDlg "+s);if(n)n.hidden=on});
}
function spOpenParts(e,from){
  SP.ret=from||null;
  const raw=e.t||null,src=spSource(e),info=partInfo(src,raw&&{out:raw.out||{}});
  const wantMale=isMale(),srcMale=!!(src.c&&src.c.sex==="male");
  let conv=src,convNote="",blockPerson=false;
  if(wantMale!==srcMale){conv=sexCopy(src,wantMale);if(conv)convNote=wantMale?"Your design is male, so these parts are converted to male as they come in.":"Your design is female, so these parts are converted to female as they come in.";else{blockPerson=true;conv=src;convNote="Your design is male, and the age safeguard flags this one, so only its palette can be taken."}}
  const box=$("#spParts");box.textContent="";
  const pick=new Set();
  const take=h("button",{type:"button",class:"btn primary",disabled:true,onclick:()=>{spApplyParts(e,conv,pick,{mine:mine.querySelector("input").checked});$("#startsDlg").close()}});
  const mine=h("label",{class:"sp-opt chk"},h("input",{type:"checkbox"}),h("span",{text:"Use my palette for its colors"}));
  const sync=()=>{
    take.disabled=!pick.size;take.textContent=pick.size?`Take ${pick.size} part${pick.size>1?"s":""}`:"Pick parts to take";
    const colored=[...pick].some(p=>p!=="palette"&&p!=="finish"&&p!=="concept");
    mine.hidden=pick.has("palette")||!colored;
    box.querySelectorAll(".sp-part").forEach(l=>l.classList.toggle("on",pick.has(l.dataset.part)));
  };
  const rows=PARTS.filter(([p])=>info[p]).map(([p,label])=>{
    const off=blockPerson&&PART_PERSON.has(p);
    const cb=h("input",{type:"checkbox",disabled:off?true:null,onchange:ev=>{if(ev.target.checked)pick.add(p);else pick.delete(p);sync()}});
    return h("label",{class:"sp-part"+(off?" off":""),"data-part":p},cb,h("span",{},h("b",{text:label}),
      p==="palette"?h("span",{class:"sp-pal","aria-hidden":"true"},SLOT_KEYS.map(k=>src.pal[k]).filter(Boolean).map(n=>h("i",{style:`background:${spHex(n)}`}))):null,
      h("small",{text:info[p]})));
  });
  box.append(...[
    h("div",{class:"sp-ph"},h("button",{type:"button",class:"btn sm",onclick:()=>{spShowParts(false);if(SP.ret&&SP.ret.isConnected)SP.ret.focus()},text:"‹ All starting points"})),
    h("div",{class:"sp-src"},spTile(e.pal,"big"),h("div",{},h("h3",{tabindex:"-1",text:`Take parts from ${e.name}`}),h("p",{class:"muted small",text:"Pick what to bring into your design. Everything else stays as it is."}))),
    h("div",{class:"sp-plist"},rows),
    mine,
    convNote?h("p",{class:"sp-note small",text:convNote}):null,
    h("div",{class:"sp-actions"},take,h("button",{type:"button",class:"btn",onclick:()=>spLoad(e),text:"Load all of it"}))].filter(Boolean));
  sync();spShowParts(true);box.scrollTop=0;
  const hd=box.querySelector("h3");if(hd)hd.focus({preventScroll:true});
}
function spApplyParts(e,src,pick,opt){
  const keepColors=!pick.has("palette")&&!opt.mine;
  const fix=v=>keepColors?litColor(v,src.pal):v;
  const fixOutfit=o=>{const n=JSON.parse(JSON.stringify(o));Object.values(n.items||{}).forEach(it=>{if(it){it.c=fix(it.c);if(it.c2)it.c2=fix(it.c2)}});Object.keys(n.dcol||{}).forEach(k=>{n.dcol[k]=fix(n.dcol[k])});delete n.lock;return n};
  const steps=new Set();let opts=0,outfitKept=false;
  const skip=f=>{const st=stepOf(f);if(stepFrozen(st)){steps.add(stepName(st));return true}if(isLocked(f)){opts++;return true}return false};
  mut(()=>{
    if(pick.has("palette"))SLOT_KEYS.forEach(k=>{if(skip("pal:"+k))return;S.pal[k]=src.pal[k]||""});
    if([...pick].some(p=>p!=="palette"&&p!=="outfits"&&p!=="finish")){
      new Set([...Object.keys(S.c),...Object.keys(src.c)]).forEach(f=>{
        const p=partOf(f);if(!p||!pick.has(p)||skip(f))return;
        const v=src.c[f];if(v==null||v==="")delete S.c[f];else S.c[f]=typeof v==="string"?fix(v):JSON.parse(JSON.stringify(v));
      });
      if(pick.has("concept")){if(src.c.sex==="male")S.c.sex="male";else delete S.c.sex}
    }
    if(pick.has("outfits")){
      if(stepFrozen("outfit"))outfitKept=true;
      else{
        const fo=cur(),tl=fo.lock||{},next=src.outfits.map(fixOutfit);
        if(!next.length)next.push(newOutfit("Outfit 1"));
        const o0=next[0];
        Object.keys(tl).forEach(k=>{
          if(k.startsWith("d:")){const f=k.slice(2);if(fo.details[f]){o0.details[f]=fo.details[f];if(fo.dcol&&fo.dcol[f])o0.dcol[f]=fo.dcol[f];(o0.lock=o0.lock||{})[k]=true;opts++}}
          else if(fo.items[k]){o0.items[k]=JSON.parse(JSON.stringify(fo.items[k]));(o0.lock=o0.lock||{})[k]=true;opts++}
        });
        S.outfits=next;S.cur=0;
      }
    }
    if(pick.has("finish")){PART_FINISH.forEach(k=>{if(src.out[k]!==undefined)S.out[k]=src.out[k]});if(S.out.style==="narrative")S.order=narrOrder(S.order,true)}
  });
  noteRecent(e.key);
  const names=PARTS.filter(([p])=>pick.has(p)).map(([p])=>PART_NAME[p]);
  const bits=[];if(opts)bits.push(`${opts} locked option${opts>1?"s":""}`);if(steps.size)bits.push(`the locked ${joinNatural([...steps])} step${steps.size>1?"s":""}`);if(outfitKept)bits.push("your locked outfit");
  toast(`Took ${joinNatural(names)} from “${e.name}”.${bits.length?` Kept ${joinNatural(bits)}.`:""} Undo brings back your previous design.`);
}
function readSaves(){return loadJSON(KEY_SAVES,[])}
function openSaves(){
  const d=$("#savesDlg");renderSaves();d.showModal();
}
function renderSaves(){
  const list=$("#saveList");list.textContent="";const saves=readSaves();
  if(!saves.length)list.append(h("p",{class:"muted",text:"Nothing saved yet. Name your design and press Save."}));
  saves.forEach(s=>list.append(h("div",{class:"saved"},h("div",{},h("b",{text:s.name}),h("small",{text:new Date(s.ts).toLocaleString()})),
    h("div",{class:"btnrow"},
      h("button",{type:"button",class:"btn sm",onclick:()=>{replaceState(s.state);$("#savesDlg").close();toast(`Loaded “${s.name}”.`)},text:"Load"}),
      h("button",{type:"button",class:"btn sm",onclick:()=>{const all=readSaves();all.unshift({id:"s"+Date.now(),name:s.name+" copy",ts:Date.now(),state:s.state});saveJSON(KEY_SAVES,all);renderSaves()},text:"Duplicate"}),
      h("button",{type:"button",class:"btn sm danger",onclick:()=>{saveJSON(KEY_SAVES,readSaves().filter(x=>x.id!==s.id));renderSaves()},text:"Delete"})))));
  const mine=$("#myOpts");mine.textContent="";
  const keys=Object.keys(CUSTOM);
  if(!keys.length)mine.append(h("p",{class:"muted",text:"Options you save from any picker appear here."}));
  keys.forEach(k=>{const lab=k==="__colors"?"Colors":k.startsWith("o:")?OUT_LABEL[k.slice(2)]:LABELS[k];
    mine.append(h("div",{class:"myopt"},h("b",{text:lab||k}),h("div",{class:"chips"},CUSTOM[k].map(v=>h("button",{type:"button",class:"chip on",title:"Remove “"+v+"”",onclick:()=>{removeCustom(k,v);renderSaves();renderMain()},text:v+" ×"})))))});
}
async function download(name,text,type){try{const f=new File([text],name,{type:type||"application/json"});if(matchMedia("(pointer:coarse)").matches&&navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==="AbortError")return}const a=h("a",{href:URL.createObjectURL(new Blob([text],{type:type||"application/json"})),download:name});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function exportAll(){
  const all=readSaves();
  const cur_={id:"current",name:S.name,ts:Date.now(),state:S};
  download("character-studio-designs.json",JSON.stringify({format:"charstudio",v:1,designs:[cur_,...all.filter(x=>x.id!=="current")],custom:CUSTOM},null,1));
}
function importFile(file){
  const r=new FileReader();
  r.onload=()=>{try{
    const j=JSON.parse(r.result);if(j.format!=="charstudio")throw new Error("not an Everspire file");
    const all=readSaves();let n=0;(j.designs||[]).forEach(d=>{all.unshift({id:"i"+Date.now()+n++,name:d.name||"Imported",ts:d.ts||Date.now(),state:normalize(d.state)})});saveJSON(KEY_SAVES,all);
    Object.entries(j.custom||{}).forEach(([k,arr])=>{(Array.isArray(arr)?arr:[]).forEach(v=>{if(typeof v==="string")addCustom(k,v)})});
    renderSaves();renderMain();toast(`Imported ${n} design${n===1?"":"s"}.`);
  }catch(e){toast("That file isn’t an Everspire export.")}};
  r.readAsText(file);
}
function setSide(on){document.body.classList.toggle("showSide",!!on);const b=$("#barPreview");if(b){b.setAttribute("aria-expanded",on?"true":"false");b.lastElementChild.textContent=on?"Edit":"Prompt"}if(on){const s=$("#side");if(s)s.scrollTop=0}}
async function copyText(text,btn,label){
  try{await navigator.clipboard.writeText(text)}catch(e){const ta=h("textarea",{style:"position:fixed;top:0;left:0;opacity:0;font-size:16px",readonly:"true"});ta.value=text;document.body.append(ta);ta.focus();ta.select();ta.setSelectionRange(0,text.length);try{document.execCommand("copy")}catch(_){}ta.remove()}
  toast(label||"Copied");if(btn){const o=btn.dataset.l||btn.textContent;btn.dataset.l=o;btn.textContent="Copied";setTimeout(()=>btn.textContent=o,1200)}
}
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.setItem(KEY_THEME,t)}catch(e){}$("#themeBtn").textContent=t==="dark"?"Light":"Dark"}
function ACAD_WAVE(NEWGIRLS,NEWLORE,NEWHEADS,NEWMEN,NEWSIG,tag,PMAP,ONLY){
  if(typeof ACAD==="undefined"||!START.RAW||!NEWGIRLS||!NEWLORE||typeof SISLORE==="undefined")return;
  const T0=performance.now();
  const R=START.RAW,cap=ACAD.cap,MUST=ACAD.MUST;
  const OLD=ACAD.OLDHOUSES||(ACAD.OLDHOUSES=ACAD.HOUSES.slice());
  const BIJ={},GIRL={};NEWGIRLS.forEach(g=>{BIJ[g.sis]=g.k;GIRL[g.k]=g});
  const SIS=NEWGIRLS.map(g=>g.sis);
  if(!SIS.every(h=>OLD.includes(h)&&SISLORE[h]))return;
  ACAD.WAVEDATA=ACAD.WAVEDATA||{};NEWGIRLS.forEach(g=>{ACAD.WAVEDATA[g.k]={g,L:NEWLORE[g.k]}});
  /* partner houses sent to an earlier wave's girl */
  const PB=Object.assign({},BIJ),PSIS=[];
  Object.entries(PMAP||{}).forEach(([s,n])=>{if(!BIJ[s]&&OLD.includes(s)&&SISLORE[s]&&ACAD.WAVEDATA[n]){PB[s]=n;PSIS.push(s)}});
  const ALLS=SIS.concat(PSIS);
  const GOF=n=>GIRL[n]||(ACAD.WAVEDATA[n]&&ACAD.WAVEDATA[n].g),LOF=n=>NEWLORE[n]||(ACAD.WAVEDATA[n]&&ACAD.WAVEDATA[n].L);
  /* display names: "Arctic Fox" for the arcticfox house */
  const DISP=n=>(GIRL[n]&&GIRL[n].disp)||(ACAD.HNAME&&ACAD.HNAME[n])||cap(n);
  ACAD.HNAME=ACAD.HNAME||{};NEWGIRLS.forEach(g=>{ACAD.HNAME[g.k]=DISP(g.k)});
  const VOW=w=>/^[aeiou]/i.test(w)&&!/^(uni|use|eu|one)/i.test(w);
  const NEWH=NEWGIRLS.map(g=>g.k);
  const problems=[];
  const capF=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
  const titleOf=s=>s.split(" ").map(w=>/^(in|the|of|to|no|and|a|an|any|at|on)$/.test(w)?w:cap(w)).join(" ").replace(/^./,c=>c.toUpperCase());
  const isWc=x=>(x>=48&&x<=57)||(x>=65&&x<=90)||(x>=97&&x<=122);

  /* ---------- string translation: one dictionary per sister house, compiled per (owner, partner) pairing ---------- */
  const GLOBAL=[];
  ALLS.forEach(s=>{const n=PB[s],d=DISP(n);GLOBAL.push([cap(s),d],[s.toUpperCase(),d.toUpperCase()],[s+"robes",n+"robes"],[s+"head",n+"head"],[s+"man",n+"man"]);
    if(VOW(d)!==VOW(s)){const a=VOW(d)?"an":"a",a0=VOW(s)?"an":"a";GLOBAL.push([a0+" "+cap(s),a+" "+d],[cap(a0)+" "+cap(s),cap(a)+" "+d])}});
  /* capitalized house words that are not the house (scene names) */
  [["Dragon rider","Dragon rider"],["Dragon's rest","Dragon's rest"],["Fox Spirit","Fox Spirit"],["His Stag","His Stag"],["Princess carry","Princess carry"],["Princess Carry","Princess Carry"]].forEach(e=>GLOBAL.unshift(e));
  const PL={wolf:"wolves",fox:"foxes",salmon:"salmon",lioness:"lionesses",firefly:"fireflies",butterfly:"butterflies",phoenix:"phoenixes",lynx:"lynxes",jellyfish:"jellyfish"};
  const DICT={};
  ALLS.forEach(s=>{
    const n=PB[s],g=GOF(n),L=LOF(n),S=SISLORE[s],HD=(ACAD.HUM&&ACAD.HUM.HD||{})[s]||[],E=[];
    /* flags: 1 capitalized copy, 2 UPPER copy, 4 Title Case copy */
    const add=(a,b,fl,keep)=>{if(typeof a!=="string"||typeof b!=="string"||!a||a===b&&!keep)return;E.push([a,b]);
      if((fl&1)&&/^[a-z]/.test(a))E.push([capF(a),capF(b)]);if(fl&2)E.push([a.toUpperCase(),b.toUpperCase()]);if(fl&4){const t=titleOf(a);if(t!==a)E.push([t,titleOf(b)])}};
    /* her lore */
    add(HD[0],g.room,1);add(HD[1],g.pride,1|2|4);add(HD[2],g.pet,2);add(HD[3],g.bath,1);
    if(S.role){add(S.role,g.role,1|2);add(S.role.replace(/^the /,"").toUpperCase(),g.role.replace(/^the /,"").toUpperCase(),0)}
    add(S.acc,g.acc,1);add(S.touch,L.touch,1);add(S.room,L.room,1);add(S.roomL,L.roomL,1);
    if(S.roomF&&S.roomF!==S.room&&S.roomF!==S.roomL)add(S.roomF,L.roomL,1);
    add(S.out,L.out,1);
    if(S.g&&L.g){["id","fig","out","light","room","bath"].forEach(f=>add(S.g[f],L.g[f],1));
      /* the Real and Anime sets color their sweaters, scarves and lingerie in her accent color */
      const c0=S.g.col,c1=L.g.col;
      [" chunky knit sweater"," knit scarf"," chunky knit scarf"," lace bra"," lace panties"," sweater slipping off one shoulder"].forEach(x=>add(c0+x,c1+x,1));
      add("oversized "+c0+" sweater","oversized "+c1+" sweater",1)}
    /* motifs only where the sets put them (some are everyday words: "heart", "leaf", "star") */
    add(S.fx,L.fx,0);add(S.pk,L.pk,1);
    if(S.mot&&L.mot)add(S.mot+" brooch",L.mot+" brooch",0);
    if(S.mot2&&L.mot2){add(S.mot2+" embroidery",L.mot2+" embroidery",0);add(S.mot2+" and cherry blossom print",L.mot2+" and cherry blossom print",0)}
    if(S.tmot&&L.tmot)add(S.tmot+" print",L.tmot+" print",0);
    if(S.emb&&L.emb)add(S.emb+" emblem",L.emb+" emblem",0);
    (L.words||[]).forEach(([a,b])=>add(a,b,1,true));(L.colors||[]).forEach(([a,b])=>add(a,b,0,true));
    /* the house word itself, lowercase, only in her own copies and her partners' (it is also an animal or a color elsewhere) */
    if(!L.nolow){const lw=L.low||n;add(s,lw,0);add(PL[s]||s+"s",PL[lw]||lw+"s",0);
      if(VOW(lw)!==VOW(s)){const a=VOW(lw)?"an":"a",a0=VOW(s)?"an":"a";add(a0+" "+s,a+" "+lw,1)}
      if(s==="wolf")E.unshift(["wolf cut","wolf cut"],["wolf-cut","wolf-cut"],["long wolf cut","long wolf cut"],["short wolf cut","short wolf cut"])}
    DICT[s]=E;
  });
  /* each dictionary is indexed by its first word that is not a little word ("the", "her", "with" …), so the most common
     words in a text never trigger a lookup; a rolling hash of each word is checked before any string is cut */
  const STOP=new Set(["the","a","an","her","his","with","in","at","on","under","lit","bathed","by","to","of","and","for","from","into","over","as","is","she","it","its","their",
    "The","A","An","Her","With","In","At","On","Under","Lit","Bathed","By","She"]);
  const AH=new Set();
  const hashOf=w=>{let h=0;for(let i=0;i<w.length;i++)h=(h*31+w.charCodeAt(i))|0;return h};
  function compile(list){
    const by=new Map(),seen=new Set(),rx=/[A-Za-z0-9]+/g;
    list.forEach(([a,b])=>{if(seen.has(a))return;seen.add(a);rx.lastIndex=0;let m,first=null,anchor=null;
      while((m=rx.exec(a))){if(!first)first=m;if(!STOP.has(m[0])){anchor=m;break}}
      anchor=anchor||first;if(!anchor)return;
      AH.add(hashOf(anchor[0]));
      let L=by.get(anchor[0]);if(!L)by.set(anchor[0],L=[]);L.push([a,b,anchor.index])});
    by.forEach(L=>L.sort((x,y)=>y[0].length-x[0].length));
    return by;
  }
  const BYH={};ALLS.forEach(s=>{BYH[s]=compile(DICT[s])});const BYG=compile(GLOBAL);
  const HITS=new Map();
  const STAT={runs:0,chars:0,lookups:0};
  /* the longest entry around a word wins; on a tie the owner's dictionary wins */
  function run(s,maps){
    let out=null,last=0,i=0;const n=s.length;STAT.runs++;STAT.chars+=n;
    while(i<n){
      let c=s.charCodeAt(i);
      if(!isWc(c)){i++;continue}
      let j=i,h=0;
      while(j<n&&isWc(c=s.charCodeAt(j))){h=(h*31+c)|0;j++}
      if(AH.has(h)){
        const w=s.slice(i,j);let hit=null,hs=0;STAT.lookups++;
        for(let m=0;m<maps.length;m++){const L=maps[m].get(w);if(!L)continue;
          for(let q=0;q<L.length;q++){const e=L[q],a=e[0];if(hit&&a.length<=hit[0].length)break;
            const st=i-e[2];if(st<last||(st>0&&isWc(s.charCodeAt(st-1))))continue;
            if(s.startsWith(a,st)){const end=st+a.length;if(end===n||!isWc(s.charCodeAt(end))||!isWc(a.charCodeAt(a.length-1))){hit=e;hs=st;break}}}}
        if(hit){if(out===null)out=[];out.push(s.slice(last,hs),hit[1]);last=hs+hit[0].length;i=last;HITS.set(hit[0],(HITS.get(hit[0])||0)+1);continue}
      }
      i=j;
    }
    if(out===null)return s;out.push(s.slice(last));return out.join("").replace(/ {2,}/g," ");
  }
  /* a translator for one pairing: the owner's words first, then the partner's, then every house name */
  const MEMO=new Map();
  function translator(o,p){
    const key=o+"|"+(p||"");let fn=MEMO.get(key);if(fn)return fn;
    const maps=[BYH[o]];if(p&&p!==o&&BYH[p])maps.push(BYH[p]);maps.push(BYG);const memo=new Map();
    fn=s=>{if(typeof s!=="string"||!s)return s;let r=memo.get(s);if(r===undefined){r=run(s,maps);if(r!==s)r=r.replace(/\b([Aa]) (?=(orca|Orca|arctic|Arctic|owl|Owl|emerald|amber|ice|umber)\b)/g,(m,a)=>a+"n ");memo.set(s,r)}return r};
    fn.o=o;MEMO.set(key,fn);return fn;
  }

  /* ---------- catalog lookups (option groups, item tiers) ---------- */
  const optGroup=new Map();
  const groupOf=(f,v)=>{let m=optGroup.get(f);if(!m){m=new Map();(CHAR[f]||[]).forEach(e=>{if(!m.has(e[0]))m.set(e[0],e[1])});optGroup.set(f,m)}return m.get(v)};
  /* item index per outfit field; items appended since the last look are folded in rather than re-indexing the field */
  const itemIdx=new Map();
  const itemOf=(f,v)=>{const a=OUTFIT[f]||[];let m=itemIdx.get(f);
    if(!m||m.a!==a||m.n>a.length){m=new Map();m.a=a;m.n=0;itemIdx.set(f,m)}
    for(;m.n<a.length;m.n++){const i=a[m.n];if(!m.has(i.v))m.set(i.v,i)}
    return m.get(v)};
  const maleItem=(f,v)=>typeof OSEX==="object"&&OSEX[f]&&OSEX[f][v]==="m";
  function regItem(f,v0,v1){
    if(v1===v0||!v1||itemOf(f,v1))return;
    const src=itemOf(f,v0);
    if(maleItem(f,v0)&&typeof addMO==="function")addMO(f,[[v1,src&&src.t||"CU",src&&src.f]]);
    else START.item(f,v1,src&&src.t,src&&src.f);
  }
  function regOpt(f,v0,v1,male){
    if(typeof v1!=="string"||!v1||v1[0]==="@"||!CHAR[f])return;
    if(groupOf(f,v1)!==undefined)return;
    const g=groupOf(f,v0)||"Academy";
    if(male&&typeof addM==="function")addM(f,[v1],g);else START.option(f,v1,g);
    optGroup.get(f).set(v1,g);
  }

  /* ---------- translating the parts of an entry ---------- */
  /* the Real and Anime close-ups color her knitwear and lingerie in her own accent color, written out rather than a palette slot */
  const COL={};SIS.forEach(s=>{const S=SISLORE[s],L=NEWLORE[BIJ[s]];if(S&&S.g&&L&&L.g&&S.g.col!==L.g.col)COL[s]=[S.g.col,L.g.col]});
  const items=(it,tr)=>{if(!it)return it;let ch=false;const o={};const cm=COL[tr.o];
    for(const f in it){const a=it[f];
      if(!Array.isArray(a)){o[f]=a;continue}
      const v=typeof a[0]==="string"?tr(a[0]):a[0];
      const c1=cm&&a[1]===cm[0],c3=cm&&a[3]===cm[0];
      if(v!==a[0]||c1||c3){const b=a.slice();b[0]=v;if(c1)b[1]=cm[1];if(c3)b[3]=cm[1];o[f]=b;ch=true;if(v!==a[0])regItem(f,a[0],v)}else o[f]=a}
    return ch?o:it};
  const details=(d,tr)=>{if(!d)return d;let ch=false;const o={};for(const f in d){const v=d[f],w=typeof v==="string"?tr(v):v;if(w!==v){ch=true;regItem(f,v,w)}o[f]=w}return ch?o:d};
  const outfit=(o,tr)=>{if(!o)return o;const on=typeof o.oname==="string"?tr(o.oname):o.oname,it=items(o.items,tr),de=details(o.details,tr);
    return on===o.oname&&it===o.items&&de===o.details?o:Object.assign({},o,{oname:on,items:it,details:de})};
  const deep=(v,tr)=>{if(typeof v==="string")return tr(v);if(Array.isArray(v))return v.map(x=>deep(x,tr));
    if(v&&typeof v==="object"){const o={};for(const k in v)o[k]=deep(v[k],tr);return o}return v};
  const scene=(w,tr)=>{if(!w)return w;const o=deep(Object.assign({},w,{f:null,m:null}),tr);if(w.f)o.f=items(w.f,tr);if(w.m)o.m=items(w.m,tr);
    if(o.f===null)delete o.f;if(o.m===null)delete o.m;return o};

  /* ---------- roots ---------- */
  const tpl=id=>tplById(id);
  const ROOTOF={};OLD.forEach(h=>{ROOTOF[h+"robes"]=["robes",h];ROOTOF[h+"head"]=["head",h];ROOTOF[h+"man"]=["man",h]});
  if(ACAD.BASES)Object.entries(ACAD.BASES).forEach(([h,id])=>{ROOTOF[id]=["robes",h]});
  const newRootId=id=>{const r=ROOTOF[id];return r&&BIJ[r[1]]?BIJ[r[1]]+r[0]:null};
  const rootOf=id=>{let k=id,g=0;while(k&&g++<40){if(ROOTOF[k])return k;const e=R[k];if(!e||!e.base)return null;k=e.base}return null};
  const dropsOf=id=>{const out=new Set();let k=id,g=0;while(k&&!ROOTOF[k]&&g++<40){const e=R[k];if(!e)break;(e.drop||[]).forEach(f=>out.add(f));k=e.base}return out};

  /* 1a. robes */
  const ROBEIT={top:"CU",bottom:"CU",outerwear:"CU",neckAccessory:"CU",legwear:"CU",earAccessory:"CU",tagCharm:"CU",headwear:"CU",corset:"CU",belt:"CU",eyewear:"CU"};
  NEWGIRLS.forEach(g=>{
    Object.entries(g.c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@")START.option(f,v,"Academy")});
    Object.entries(g.robes).forEach(([f,a])=>{if(!itemOf(f,a[0]))START.item(f,a[0],ROBEIT[f]||"CU","costume,preppy")});
  });
  START.add("Academy",NEWGIRLS.map(g=>({id:g.k+"robes",name:DISP(g.k)+" robes",blurb:g.blurb,pal:Object.assign({},g.pal),c:Object.assign({},g.c),
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:JSON.parse(JSON.stringify(g.robes)),details:{},dcol:{}},
    nude:true,tags:["academy","robes",g.k],out:{framing:"full body",must:MUST}})));

  /* 1b. headmistresses: her robes face and figure, grown up, in the sister headmistress's faculty clothes */
  const heads=[];
  NEWGIRLS.forEach(g=>{
    const sh=tpl(g.sis+"head"),nr=tpl(g.k+"robes"),H=NEWHEADS[g.k];if(!sh||!nr||!H)return;
    const tr=translator(g.sis,null);
    const c=Object.assign({},nr.c,H.c);if(H.c.hairStyle)delete c.hairMovement;
    Object.entries(H.c).forEach(([f,v])=>regOpt(f,sh.c[f],v,false));
    heads.push({id:g.k+"head",name:DISP(g.k)+" headmistress",blurb:H.blurb+" In the "+DISP(g.k)+" faculty robes.",pal:Object.assign({},nr.pal),c,
      outfit:JSON.parse(JSON.stringify(outfit(sh.outfit,tr))),more:(sh.more||[]).filter(m=>m.oname!=="Nude").map(m=>JSON.parse(JSON.stringify(outfit(m,tr)))),
      nude:true,tags:(sh.tags||["headmistress"]).map(x=>x===g.sis?g.k:tr(x)).concat((sh.tags||[]).includes(g.sis)?[]:[g.k]),out:JSON.parse(JSON.stringify(deep(sh.out||{},tr)))});
  });
  START.add("Academy Headmistresses",heads);

  /* 1c. boyfriends: the sister boyfriend's job and wardrobe, with his own look and her house's colors */
  const men=[];
  NEWGIRLS.forEach(g=>{
    const sm=tpl(g.sis+"man"),M=NEWMEN[g.k];if(!sm||!M)return;
    const tr=translator(g.sis,null);
    const c={};Object.entries(sm.c).forEach(([f,v])=>{const w=typeof v==="string"?tr(v):v;if(w!==v)regOpt(f,v,w,true);c[f]=w});
    Object.entries(M.c).forEach(([f,v])=>{regOpt(f,sm.c[f],v,true);c[f]=v});
    men.push({id:g.k+"man",name:DISP(g.k)+" boyfriend",blurb:M.blurb,pal:Object.assign({},g.man),c,
      outfit:JSON.parse(JSON.stringify(outfit(sm.outfit,tr))),more:(sm.more||[]).filter(m=>m.oname!=="Nude").map(m=>JSON.parse(JSON.stringify(outfit(m,tr)))),
      nude:true,tags:(sm.tags||[]).map(x=>x===g.sis?g.k:tr(x)),out:JSON.parse(JSON.stringify(deep(sm.out||{},tr)))});
  });
  START.add("Academy Men",men);

  /* 1d. her own Signature look (built the way signature169.js builds the others) */
  {
    const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
    const LING={bra:["{c} lace balconette bra with a {c2} bow","@primary",null,"@accent"],panties:["{c} lace panties with a {c2} bow","@primary",null,"@accent"],legwear:["{c} lace-top thigh-high stockings","@secondary"]};
    NEWH.forEach(h=>{const r=NEWSIG[h];if(!r)return;Object.entries(r[5]).forEach(([f,a])=>{if(a&&a[0]&&!itemOf(f,a[0]))START.item(f,a[0],"US","glam")});
      START.option("posture",r[3],"Posture");START.option("expression",r[2],"Academy")});
    if(PRESET_GROUPS.start.some(x=>x.label==="Academy Signature"))
      ACAD.set("Academy Signature",null,"signature","signature","glam",{tags:["signature look","hero outfit"],oname:"Signature",must:must("a place that is all her own")},
        NEWH.filter(h=>NEWSIG[h]).map(h=>{const r=NEWSIG[h];return[h,Object.assign({},r[5]),r[2],r[3],r[1],{more:[{oname:"Signature lingerie",look:"boudoir",items:LING}]}]}));
    NEWH.forEach(h=>{const r=NEWSIG[h],t=tpl(h+"signature");if(!r||!t)return;t.name=r[0]+" ("+DISP(h)+")";t.out=Object.assign({},t.out,{must:must(r[4])})});
  }

  /* ---------- 2. every other Academy entry, re-cut for the counterpart house ---------- */
  const SKIP=new Set(["Academy","Academy Headmistresses","Academy Men","Academy Signature"]);
  const ownerOf=new Map();   /* sister entry id -> sister house */
  const jobs=[];
  PRESET_GROUPS.start.forEach(g=>{
    if(!/^Academy/.test(g.label)||SKIP.has(g.label)||(ONLY&&!ONLY.has(g.label)))return;
    g.keys.forEach(k=>{if(ownerOf.has(k))return;const r=rootOf(k);if(!r||!BIJ[ROOTOF[r][1]])return;ownerOf.set(k,ROOTOF[r][1]);jobs.push([g,k,r])});
  });
  const PREF=SIS.slice().sort((a,b)=>b.length-a.length);
  const takenIds=new Set(TEMPLATES.map(t=>t.id));
  const cidMemo=new Map();
  function cloneId(id){
    let v=cidMemo.get(id);if(v)return v;
    const o=ownerOf.get(id),t=tpl(id),tags=t&&t.tags||[];
    const pre=PREF.find(h=>id.startsWith(h)&&(h===o||tags.includes(h)));
    if(pre)v=BIJ[pre]+id.slice(pre.length);
    else if(o&&o!=="rat"&&id.includes(o))v=id.replace(o,BIJ[o]);
    else v=BIJ[o]+"_"+id;
    let w=v,i=2;while(takenIds.has(w))w=v+"_"+(i++);
    takenIds.add(w);cidMemo.set(id,w);return w;
  }
  jobs.forEach(([,k])=>cloneId(k));
  /* an earlier wave's copy of a partner entry ("stagbikini" has no Lioness copy, "griffinbikini" does) */
  const REV=new Map();if(PSIS.length&&ACAD.CLONEOF)Object.entries(ACAD.CLONEOF).forEach(([cid,sid])=>{const t=tplById(cid);if(t&&t._house)REV.set(t._house+"|"+sid,cid)});
  const pfall=new Set();
  const mapPairId=id=>{
    if(typeof id!=="string"||!id)return id;
    const nr=newRootId(id);if(nr)return nr;
    {const rr=ROOTOF[id];if(rr&&PB[rr[1]]&&!BIJ[rr[1]])return PB[rr[1]]+rr[0]}
    if(cidMemo.has(id))return cidMemo.get(id);
    const r=rootOf(id);
    if(r){const h=ROOTOF[r][1];
      if(!BIJ[h]&&PB[h]){const n=PB[h],c=REV.get(n+"|"+id);if(c)return c;if(/signature$/.test(id)&&tpl(n+"signature"))return n+"signature";pfall.add(id);return n+(ROOTOF[r][0]==="robes"?"robes":ROOTOF[r][0])}
      if(!BIJ[h])return id;if(/signature$/.test(id)&&tpl(BIJ[h]+"signature"))return BIJ[h]+"signature";
      problems.push(id+": partner has no counterpart copy");}
    return id;
  };
  const partnerHouse=id=>{if(typeof id!=="string"||!id)return null;const r=rootOf(id);return r?ROOTOF[r][1]:null};

  /* her own face, figure and palette replace the sister's wherever the set kept the sister's */
  function rebaseC(tc,sc,nc,drops,tr,male){
    const c={};
    for(const f in tc){const v=tc[f];
      if(f in sc&&sc[f]===v){if(f in nc)c[f]=nc[f];continue}
      const w=typeof v==="string"?tr(v):v;
      if(w===""){continue}
      if(w!==v)regOpt(f,v,w,male);
      c[f]=w;
    }
    for(const f in nc){if(f in c||f in tc||f in sc||drops.has(f))continue;c[f]=nc[f]}
    return c;
  }
  function rebasePal(tp,sp,np,tr){
    const p=Object.assign({},np);
    for(const k in tp){const v=tp[k];if(sp&&sp[k]===v)continue;p[k]=typeof v==="string"?tr(v):v}
    return p;
  }
  /* the copy's character fields are worked out the first time anything reads them (most entries are never opened);
     options the set itself changed are registered now, from the set's own entry, so the option lists have them from the start */
  const preReg=(k,tr,male)=>{let id=k,g=0;while(id&&!ROOTOF[id]&&g++<40){const e=R[id];if(!e)break;
      [e.c,e.out&&e.out.pair&&e.out.pair.c1].forEach(c=>{if(c)for(const f in c){const v=c[f];if(typeof v==="string"){const w=tr(v);if(w&&w!==v)regOpt(f,v,w,male)}}});
      id=e.base}};
  const own=(T,k,v)=>{Object.defineProperty(T,k,{value:v,writable:true,configurable:true,enumerable:true});return v};
  const lazy=(T,k,make)=>{Object.defineProperty(T,"_mk_"+k,{value:make});Object.defineProperty(T,k,{configurable:true,enumerable:true,get(){return own(T,k,make())},set(v){own(T,k,v)}})};
  /* a look at a copy's character fields without keeping them (the picker's search text) */
  ACAD.peekC=t=>{if(!t)return t;const d=t._mk_c&&Object.getOwnPropertyDescriptor(t,"c");return d&&d.get?t._mk_c():t.c};
  /* the scene and setting text of a copy is translated when it is first read; lists that only need to know whether an
     entry is a scene, or what acts it uses, can read the sister's (ACAD.peekOut) without translating anything */
  ACAD.peekOut=t=>{if(!t)return t;const d=t._clone&&Object.getOwnPropertyDescriptor(t,"out");return d&&d.get?(tplById(t._clone)||{}).out:t.out};
  function outOf(t,tr){
    const out=deep(Object.assign({},t.out||{},{pair:null}),tr);delete out.pair;
    if(t.out&&t.out.pair){const p=t.out.pair,q=deep(Object.assign({},p,{id:null,w1:null,w2:null,c1:null,c2:null}),tr);
      q.id=mapPairId(p.id);
      if(pfall.has(p.id)&&typeof q.outfit==="number")q.outfit=p.explicit?1:0;   /* a fallback partner wears her robes or nothing */
      if(p.w1)q.w1=scene(p.w1,tr);else delete q.w1;if(p.w2)q.w2=scene(p.w2,tr);else delete q.w2;
      if(p.c1){q.c1={};for(const f in p.c1){const v=p.c1[f],w=typeof v==="string"?tr(v):v;if(w!==v)regOpt(f,v,w,false);q.c1[f]=w}}else delete q.c1;
      if(p.c2){q.c2=deep(p.c2,tr)}else delete q.c2;
      out.pair=q}
    return out;
  }
  const made=[],byGroup=new Map();
  let nShared=0;
  jobs.forEach(([g,k,r])=>{
    const t=tpl(k);if(!t)return;
    const o=ROOTOF[r][1],kind=ROOTOF[r][0],n=BIJ[o];
    const sr=tpl(r),nr=tpl(n+kind);if(!sr||!nr){problems.push(k+": no root for "+n+kind);return}
    const pid=t.out&&t.out.pair&&t.out.pair.id,ph=partnerHouse(pid);
    const tr=translator(o,ph);
    const male=kind==="man";
    const T={id:cloneId(k),name:tr(t.name||k),blurb:tr(t.blurb||"")};
    T.pal=rebasePal(t.pal||{},sr.pal||{},nr.pal||{},tr);
    lazy(T,"c",()=>rebaseC(t.c||{},sr.c||{},nr.c||{},dropsOf(k),tr,male));preReg(k,tr,male);
    T.outfit=outfit(t.outfit,tr);if(T.outfit===t.outfit)nShared++;
    T.more=(t.more||[]).map(m=>outfit(m,tr));
    lazy(T,"out",()=>outOf(t,tr));
    if(t.tags)T.tags=t.tags.map(x=>x===o?n:x===ph&&PB[ph]?PB[ph]:tr(x));
    if(t.adultOnly)T.adultOnly=true;
    Object.defineProperty(T,"_clone",{value:k,enumerable:false});Object.defineProperty(T,"_house",{value:n,enumerable:false});
    made.push(T);
    let L=byGroup.get(g);if(!L)byGroup.set(g,L=[]);L.push(T.id);
  });
  /* register: straight into the library and its index (START.add would re-resolve and deep-copy each one) */
  const start=TEMPLATES.length;
  made.forEach(T=>TEMPLATES.push(T));
  if(tplById.m&&tplById.n===start){made.forEach((T,i)=>tplById.m.set(T.id,start+i));tplById.n=TEMPLATES.length}
  byGroup.forEach((ids,g)=>{g.keys.push(...ids)});
  ACAD.CLONEOF=ACAD.CLONEOF||{};made.forEach(T=>{ACAD.CLONEOF[T.id]=T._clone});

  /* ---------- 4. the house list, lore and Real/Anime tags the rest of the studio reads ---------- */
  NEWH.forEach(h=>{if(!ACAD.HOUSES.includes(h))ACAD.HOUSES.push(h)});
  if(ACAD.HUM){NEWGIRLS.forEach(g=>{ACAD.HUM.HD[g.k]=[g.room,g.pride,g.pet,g.bath];if(!ACAD.HUM.HS.includes(g.k))ACAD.HUM.HS.push(g.k)})}
  if(ACAD.REALG)NEWH.forEach(h=>{if(NEWLORE[h]&&NEWLORE[h].g)ACAD.REALG[h]=NEWLORE[h].g});
  ACAD.SISTER=Object.assign(ACAD.SISTER||{},Object.fromEntries(NEWGIRLS.map(g=>[g.k,g.sis])));
  ACAD["CLONE"+tag]={stat:STAT,made:made.length,shared:nShared,ms:Math.round(performance.now()-T0),problems,hits:HITS,dict:DICT};
  problems.forEach(p=>START.problems.push(p));
}
function init(){
  CUSTOM=loadJSON(KEY_CUSTOM,{});
  const saved=loadJSON(KEY_AUTO,null);if(saved){S=normalize(saved)}
  try{const s=sessionStorage.getItem("cs.step");if(s&&STEPS.some(x=>x.id===s))step=s}catch(e){}
  let theme="light";try{theme=localStorage.getItem(KEY_THEME)||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){}
  setTheme(theme);
  $("#themeBtn").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
  $("#nameInput").addEventListener("input",e=>{typing="main";mut(()=>{S.name=e.target.value},"name");typing=""});
  $("#undoBtn").onclick=()=>undo();$("#redoBtn").onclick=()=>redo();
  $("#startsBtn").onclick=openStarts;$("#randBtn").onclick=rollFromBar;$("#randOpt").onclick=openRandomDialog;$("#savesBtn").onclick=openSaves;
  $$("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
  $$("[data-close]").forEach(b=>b.onclick=()=>b.closest("dialog").close());
  $("#saveNow").onclick=()=>{const all=readSaves(),ex=all.find(x=>x.name===S.name);const entry={id:ex?ex.id:"s"+Date.now(),name:S.name,ts:Date.now(),state:JSON.parse(JSON.stringify(S))};saveJSON(KEY_SAVES,[entry,...all.filter(x=>x.id!==entry.id)]);renderSaves();toast(ex?`Updated “${S.name}”.`:`Saved “${S.name}”.`)};
  $("#exportBtn").onclick=exportAll;$("#importFile").onchange=e=>{if(e.target.files[0])importFile(e.target.files[0]);e.target.value=""};
  $("#copyBtn").onclick=e=>copyText(LASTC.prompt,e.currentTarget,"Prompt copied");
  $("#barCopy").onclick=e=>copyText(LASTC.prompt,null,"Prompt copied");
  $("#barCheck").onclick=()=>{setTab("checks");setSide(true)};
  $("#barPreview").onclick=()=>setSide(!document.body.classList.contains("showSide"));
  $$("#modeSeg button").forEach(b=>b.onclick=()=>mut(()=>{S.out.mode=b.dataset.mode}));
  $$(".tabs [role=tab]").forEach(t=>t.onclick=()=>setTab(t.dataset.tab));
  $$("[data-copy]").forEach(b=>b.onclick=()=>copyText($("#"+b.dataset.copy).value,b,"Copied"));
  ["negGeneral","negCharacter","negOutfit","negPortrait"].forEach(k=>{const el=$("#"+k);if(el)el.onchange=e=>mut(()=>{S.out[k]=e.target.checked})});
  document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)){e.preventDefault();e.shiftKey?redo():undo()}});
  setTab("prompt");enforce();renderRail();renderSide();renderMain();
}
function setTab(t){tab=t;$$(".tabs [role=tab]").forEach(x=>{const on=x.dataset.tab===t;x.setAttribute("aria-selected",on?"true":"false");x.tabIndex=on?0:-1});$$(".tabpanel").forEach(p=>p.hidden=p.dataset.panel!==t)}
