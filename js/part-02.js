/* ---- v118: "Held item" outfit slot (plush toys, cocoa, a storybook) ----
   Held items are phrased as their own sentence ("She holds ...") so they never read as something worn. */
(function(){
  Object.assign(OUT_LABEL,{heldItem:"Held item"});
  Object.assign(ROLE_AUTO,{heldItem:"accent"});
  Object.assign(KIND_RULES,{heldItem:[["held",/./]]});
  Object.assign(WORN,{heldItem:["hugged tightly to her chest","in both hands","tucked under one arm","dangling from one hand"]});
  OUTFIT.heldItem=OUTFIT.heldItem||[];
  if(!OUT_GROUPS[1].fields.includes("heldItem"))OUT_GROUPS[1].fields.push("heldItem");
})();

const OUT_ITEM_FIELDS=OUT_GROUPS.flatMap(g=>g.id==="details"?[]:g.fields);
const COLOR_FIELDS=["eyeOne","eyeTwo","hairBase","hairUnderlayer","hairInner","hairHighlights","makeupColor","fantasyAccentColor"];
const TRAIT_FIELDS=["earStyle","hornStyle","tailStyle","wingStyle","fangClawStyle","auraStyle"];
const COLOR_RX=new RegExp("\\b("+EVERYDAY.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).sort((a,b)=>b.length-a.length).join("|")+")\\b","i");

/* ---------- parsing helpers ---------- */
const FABRIC_CLASSES=[["glossy",/satin|silk|vinyl|latex|patent|glossy|metallic|holographic|sequin|leather|high-shine|pvc/],["sheer",/sheer|chiffon|organza|mesh|netted|transparent|tulle|fishnet|gauze/],["lace",/lace|crochet|eyelet|broderie/],["knit",/knit|ribbed|wool|fleece|thermal/],["denim",/denim/],["plush",/velvet|velour|plush|suede|corduroy|fur/],["matte",/cotton|linen|twill|gabardine|crepe|jersey|tweed|canvas|brocade/]];
function parseOpt(field,value){
  const v=String(value||"").toLowerCase();let cls="";
  for(const [k,rx] of FABRIC_CLASSES)if(rx.test(v)){cls=k;break}
  return{kind:kindOf(field,value),cls,youth:Policy.isYouthText(value)};
}
const PLURAL_RX=/\b(headphones|jeans|trousers|pants|shorts|tights|leggings|stockings|socks|gloves|glasses|sunglasses|bangles|bracelets|cuffs|straps|boots|shoes|warmers|bloomers|joggers|slacks|spectacles|goggles|earrings|ears|necklaces|rings|bows|studs|horns|wings|antennae|fangs|claws|talons|arms|hands|strands|sidelocks|layers|eyebrows|brows)\b/i;
function withArticle(p){
  p=String(p||"").trim();if(!p)return"";
  if(/^(a|an|the|no|one|some|two|multiple|both)\s/i.test(p))return p;
  const head=p.replace(/,\s+and\s/g,", ").split(/\s(?:with|around|over|under|tied|worn|in|of|on|at|from|and)\s/i)[0];
  if(PLURAL_RX.test(head)||(/s$/i.test(head)&&!/(ss|us|is)$/i.test(head))||/(teeth|antennae)$/i.test(head))return p;
  return (/^[aeiou]/i.test(p)&&!/^(uni|use|usu|u-|eu)/i.test(p)?"an ":"a ")+p;
}
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function joinNatural(a){a=a.filter(Boolean);if(!a.length)return"";if(a.length===1)return a[0];if(a.length===2)return a[0]+" and "+a[1];return a.slice(0,-1).join(", ")+", and "+a[a.length-1]}
const anA=w=>/^[aeiou]/i.test(w)&&!/^(eu|uni|use|u-)/i.test(w)?"an":"a";

/* ---------- state ---------- */
const KEY_AUTO="charstudio.autosave.v1",KEY_SAVES="charstudio.saves.v1",KEY_CUSTOM="charstudio.custom.v1",KEY_THEME="charstudio.theme.v1";
const LAYER_DEFS=[["identity","Identity and creature"],["palette","Palette"],["eyes","Eyes"],["face","Face"],["hair","Hair"],["body","Body"],["skin","Skin"],["makeup","Makeup"],["garments","Garments"],["accessories","Accessories"],["underwear","Underwear"],["details","Outfit details"],["extras","Must-haves and notes"]];
const MODE_LAYERS={full:LAYER_DEFS.map(d=>d[0]),char:["identity","palette","eyes","face","hair","body","skin","makeup","extras"],outfit:["palette","garments","accessories","underwear","details","extras"]};
function newOutfit(name){return{name:name||"Outfit",look:"",cover:"",season:"",showUnder:false,items:{},details:{},dcol:{}}}
function blankState(){
  return{v:1,name:"Untitled character",pal:{primary:"",secondary:"",third:"",accent:"",extra:""},c:{},outfits:[newOutfit("Outfit 1")],cur:0,
    out:{mode:"full",model:"v5",coverMatch:true,compact:false,sheet:false,explicit:false,lewdtag:false,wfmt:"numeric",style:"studio",palName:"",repeatBody:false,auto:true,framing:"cowboy shot",must:"",avoid:"",notes:""},
    layers:{},order:LAYER_DEFS.map(d=>d[0])};
}
let S=blankState();
let CUSTOM={};   // {field:[values]} user-added options
const UNDO=[],REDO=[];let lastKey="",lastT=0;
const hooks={change:()=>{},toast:()=>{}};
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
let saveTimer=null;
function flushSave(){clearTimeout(saveTimer);saveJSON(KEY_AUTO,S)}
function changed(){hooks.change();clearTimeout(saveTimer);saveTimer=setTimeout(flushSave,200)}
addEventListener("pagehide",flushSave);document.addEventListener("visibilitychange",()=>{if(document.hidden)flushSave()});
function replaceState(st,label){UNDO.push(JSON.stringify(S));if(UNDO.length>80)UNDO.shift();REDO.length=0;S=normalize(st);enforce();lastKey="";changed()}

/* ---------- accessors ---------- */
const cur=()=>S.outfits[S.cur];
function rc(v){if(!v)return"";if(v[0]==="@"&&v.includes("+"))return joinNatural(v.split("+").map(x=>x[0]==="@"?(S.pal[x.slice(1)]||""):x).filter(Boolean));if(v[0]==="@")return S.pal[v.slice(1)]||"";return v}
const TOK_SPECIAL=new Set(["skinFinish","markings","scleraStyle"]);
const g=id=>{const v=S.c[id];if(v==null||v==="none")return"";const r=rc(String(v));return(r.indexOf("{c}")>=0&&!TOK_SPECIAL.has(id))?skinTok(r,g(id+"Color")):r};
const has=id=>!!g(id);
const AGE_NOUN={"young man":["man","young"],"man":["man",""],"mature man":["man","mature"],"older man":["man","older"],"young girl":["girl","young"],"girl":["girl",""],"young woman":["woman","young"],"woman":["woman",""],"mature woman":["woman","mature"],"older woman":["woman","older"]};
const ageKey=()=>S.c.age||(isMale()?"man":"woman");
function subjectNoun(){
  const sp=(S.c.subjectType||"").trim(),[noun,adj]=AGE_NOUN[ageKey()]||[isMale()?"man":"woman",""],pre=adj?adj+" ":"";
  if(!sp)return pre+noun;
  const type=(SPECIES_INFO[sp]||{type:"word"}).type;
  if(isMale())return maleSubjectNoun(sp,type,noun,pre);
  if(type==="hyphen")return pre+sp+"-"+noun;
  if(type==="word")return pre+sp+" "+noun;
  return Policy.girlAge()?pre+sp+" girl":pre+sp;
}
const subjectKey=()=>{const sp=(S.c.subjectType||"").trim();return sp?(((SPECIES_INFO[sp]||{}).legacy||[sp])[0]).toLowerCase():"woman"};
const subjectPhrase=()=>`the ${subjectNoun()}`;
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

/* enforce: rules that must always hold, whatever the user clicked */
function enforce(){
  const notes=Policy.enforce();pruneLocks();
  if(notes.length)hooks.toast(notes[0]+(notes.length>1?` (+${notes.length-1} more)`:""));
}

/* ---------- sentence builders (character) ---------- */
let CK=null,LAST={drop:{},noLegs:false}; // per-compose context: {compact,notes,checks}
const note=(level,msg,fix)=>CK.checks.push({level,msg:String(msg).replace(/\{c2?\}-?(and-)?\s?/g,""),fix});
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
/* hair rules */
const lenRank=v=>Object.prototype.hasOwnProperty.call(HAIR_LEN_RANK,v)?HAIR_LEN_RANK[v]:Object.prototype.hasOwnProperty.call(HAIR_LEN_RANK_EXTRA,v)?HAIR_LEN_RANK_EXTRA[v]:null;
function styleProfile(st){
  const t=(st||"").toLowerCase(),p={};if(!t)return p;const longW=/\blong\b/.test(t.replace(/\bwith long [a-z ]*?(strands|sidelocks|pieces)\b/g,""));
  if(/\b(pixie|bixie|buzz(ed)?|bowl cut|lob|crop|crew cut|ivy league cut|flat top|high and tight|fade|faux hawk|mohawk|quiff|pompadour|comb-over|spiky|waves haircut|classic side part)\b|\bbob\b|\bshort\b/.test(t))p.range=longW?[2,4]:[0,3];
  else if(longW||/\b(hime|princess)\b/.test(t))p.range=[3,8];
  else if(/\b(bun|buns|updo|chignon|ponytails?|twin tails|twintails|pigtails?|braids?|braided|twist|top knot|odango)\b/.test(t))p.range=[2,8];
  p.tied=/\b(bun|buns|updo|chignon|top knot|odango)\b/.test(t)&&!/half-up|half-down/.test(t);
  p.tex=/straight/.test(t)?"straight":/\bcurl(y|s)?\b/.test(t)?"curly":/\bwav(y|es)\b/.test(t)?"wavy":null;return p;
}
const texConflict=(st,tx)=>{const a=styleProfile(st).tex,c=HAIR_TEX_CLASS[tx];return !!(a&&c&&((a==="straight")!==(c==="straight")))};
const lenFits=(st,ln)=>{const p=styleProfile(st),rk=lenRank(ln);return !(p.range&&rk!==null&&(rk<p.range[0]||rk>p.range[1]))};
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
/* v123: a posture written as an action ("sitting on the edge of the bed", "kneeling with an arched back") gets its own sentence */
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

/* ---------- outfit ---------- */
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

/* ---------- weights ---------- */
function weigh(text,w,fmt){
  if(!text||!w||w===1)return text;
  if(fmt==="braces"){const n=Math.max(1,Math.round(Math.abs(Math.log(w))/Math.log(1.05)));return w>1?"{".repeat(n)+text+"}".repeat(n):"[".repeat(n)+text+"]".repeat(n)}
  return `${w}::${text}::`;
}

/* ---------- compose ---------- */
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

/* ---------- extra design checks ---------- */
const BUST_SIZE_RANK=["flat chest","petite chest","small breasts","small-to-medium breasts","medium breasts","full breasts","large breasts","very large breasts"];
const BUST_WEIGHT_RANK=["minimal weight","light delicate fullness","soft natural fullness","moderate fullness","heavy natural fullness","lush fullness"];
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
const LABELS={};


/* ===== Skin suggestions by species. Each family lists values that already exist in the pickers. ===== */
const SKIN_FAMILIES={
 feline:{tone:["golden beige","light tan","caramel"],under:["golden","warm"],finish:["soft luminous skin","sun-warmed skin"],marks:["soft freckles across the cheeks","a few beauty marks"]},
 canine:{tone:["warm beige","light tan","golden beige"],under:["warm","peach"],finish:["fresh skin glow","natural skin texture"],marks:["light freckles across the nose","soft freckles across the cheeks"]},
 fox:{tone:["fair","light beige","porcelain"],under:["warm","peach"],finish:["soft luminous skin","fresh skin glow"],marks:["light freckles across the nose","kintsugi-style golden cracks across the cheeks"]},
 gentle:{tone:["fair","light beige","warm beige"],under:["rosy","peach"],finish:["fresh skin glow","soft matte skin"],marks:["soft freckles across the cheeks","light freckles across the nose"]},
 sturdy:{tone:["warm beige","light tan","tan"],under:["warm","golden"],finish:["natural skin texture","sun-warmed skin"],marks:["freckles scattered across the shoulders","a few faint freckles along the arms"]},
 night:{tone:["porcelain","very fair","pearl white"],under:["cool","pearl"],finish:["velvety skin finish","moonlit skin glow"],marks:["small beauty mark near the lips","a small mole on the cheek"]},
 winged:{tone:["fair","light beige","porcelain"],under:["neutral","cool"],finish:["soft downy skin","satin-smooth skin"],marks:["feathers across the collarbones","feathers over the shoulders"]},
 scaled:{tone:["warm beige","golden tan","bronze"],under:["amber","golden"],finish:["faint scale-textured skin","natural skin texture"],marks:["scales across the cheeks","scales along the neck","scales down the arms"]},
 serpent:{tone:["light olive","golden olive","olive"],under:["olive","golden"],finish:["faint scale-textured skin","satin-smooth skin"],marks:["scales along the neck","scales down the arms"]},
 demon:{tone:["rosy fair","soft pink","ashen gray","infernal crimson"],under:["reddish","ember-like","rosy"],finish:["faint ember glow beneath the skin","velvety skin finish"],marks:["demonic markings down the arms","ember lines over the shoulders","demonic markings along the neck"]},
 angel:{tone:["pearl white","divine ivory","champagne gold"],under:["divine gold","pearl"],finish:["soft opalescent sheen","starlight skin shimmer"],marks:["angelic filigree across the collarbones","gold leaf flecks across the collarbones","celestial sigils over the shoulders"]},
 elf:{tone:["porcelain","fair","pearl white"],under:["cool","neutral"],finish:["moonlit skin glow","satin-smooth skin"],marks:["freckles scattered across the shoulders","small beauty mark near the lips"]},
 darkelf:{tone:["ashen gray","lavender","deep brown"],under:["cool","violet"],finish:["moonlit skin glow","velvety skin finish"],marks:["fine linework patterns over the shoulders","moon sigils across the collarbones"]},
 fae:{tone:["lavender","rose quartz","pearl white"],under:["iridescent","pearl"],finish:["crystalline skin shimmer","soft opalescent sheen"],marks:["butterflies over the shoulders","petals scattered over the body","glitter across the cheeks"]},
 plant:{tone:["warm beige","golden tan","jade green"],under:["golden","warm"],finish:["dew-damp skin","fresh skin glow"],marks:["vines down the arms","flowers along the neck","petals across the cheeks"]},
 spirit:{tone:["pearl white","very fair","ashen gray"],under:["cool","silvery"],finish:["moonlit skin glow","cool marble-like skin"],marks:["frost patterns across the cheeks","snowflakes across the cheeks"]},
 frost:{tone:["pearl white","very fair"],under:["cool","silvery"],finish:["frost-kissed skin","subtle skin sheen"],marks:["frost patterns across the cheeks","snowflakes scattered over the body","frost patterns over the shoulders"]},
 aquatic:{tone:["fair","pearl white","seafoam green"],under:["iridescent","pearl"],finish:["pearl-like skin sheen","dew-damp skin"],marks:["mermaid scales across the cheeks","mermaid scales along the neck","pearls across the collarbones"]},
 shark:{tone:["ashen gray","cerulean blue","fair"],under:["cool","silvery"],finish:["satin-smooth skin","subtle skin sheen"],marks:["wave patterns down the arms","wave patterns along the neck"]},
 flame:{tone:["golden tan","caramel","infernal crimson"],under:["ember-like","amber"],finish:["faint ember glow beneath the skin","sun-warmed skin"],marks:["ember lines down the arms","embers across the cheeks","embers scattered over the body"]},
 storm:{tone:["lavender","celestial blue","pearl white"],under:["cool","iridescent"],finish:["gentle reflective highlights","subtle skin sheen"],marks:["lightning-shaped marks down the arms","clouds over the shoulders"]},
 genie:{tone:["golden tan","bronze","caramel"],under:["golden","divine gold"],finish:["soft luminous skin","sun-warmed skin"],marks:["gold leaf flecks over the shoulders","celestial sigils down the arms"]},
 cosmic:{tone:["cosmic violet","starlight silver","aurora-shifting"],under:["cosmic","starlight","aurora"],finish:["starlight skin shimmer","faint luminous veins of light"],marks:["constellations across the collarbones","galaxy speckles across the cheeks","stars scattered over the body"]},
 insect:{tone:["fair","soft pink","champagne gold"],under:["golden","peach"],finish:["soft downy skin","soft luminous skin"],marks:["butterflies across the cheeks","sunbursts across the cheeks"]},
 slime:{tone:["seafoam green","jade green","cerulean blue"],under:["iridescent","pearl"],finish:["dew-damp skin","gentle reflective highlights"],marks:["opal flecks across the cheeks"]},
 orc:{tone:["light olive","medium olive","jade green"],under:["olive","cool olive"],finish:["natural skin texture","soft matte skin"],marks:["tribal markings across the cheeks","tribal markings down the arms"]},
 oni:{tone:["infernal crimson","cerulean blue","warm beige"],under:["reddish","warm"],finish:["natural skin texture","soft matte skin"],marks:["tribal markings across the cheeks","demonic markings over the shoulders"]},
 stone:{tone:["ashen gray","fair"],under:["cool","neutral"],finish:["soft matte skin","cool marble-like skin"],marks:["fine linework patterns down the arms","crystals along the neck"]},
 spider:{tone:["porcelain","ashen gray","very fair"],under:["cool","violet"],finish:["velvety skin finish","soft matte skin"],marks:["fine linework patterns over the shoulders","fine linework patterns down the arms"]},
 generic:{tone:["fair","pearl white","warm beige"],under:["neutral","warm"],finish:["soft luminous skin","satin-smooth skin"],marks:["freckles scattered across the shoulders"]}
};
const SPECIES_FAMILY={
 cat:"feline",nekomata:"feline",lion:"feline",tiger:"feline",leopard:"feline",
 dog:"canine",wolf:"canine",jackal:"canine",raccoon:"canine",ferret:"canine",otter:"canine","red panda":"canine",
 fox:"fox",kitsune:"fox",
 bunny:"gentle",deer:"gentle",sheep:"gentle",alpaca:"gentle",goat:"gentle",mouse:"gentle",squirrel:"gentle",monkey:"gentle",panda:"gentle",faun:"gentle",unicorn:"gentle",pegasus:"gentle",
 cow:"sturdy",horse:"sturdy",pig:"sturdy",bear:"sturdy",centaur:"sturdy",
 bat:"night",owl:"night",vampire:"night",
 harpy:"winged",tengu:"winged",
 lizard:"scaled",dragon:"scaled",snake:"serpent",
 demon:"demon",succubus:"demon",imp:"demon","fallen angel":"demon",tiefling:"demon",
 angel:"angel",archangel:"angel",cherub:"angel",valkyrie:"angel",goddess:"angel",celestial:"angel",
 elf:"elf","half-elf":"elf","dark elf":"darkelf",fae:"fae",sylph:"fae",dryad:"plant",
 ghost:"spirit","yuki-onna":"frost",
 mermaid:"aquatic",siren:"aquatic",naiad:"aquatic",axolotl:"aquatic",shark:"shark",
 "fire spirit":"flame",phoenix:"flame","storm spirit":"storm",genie:"genie",cosmic:"cosmic",
 moth:"insect",butterfly:"insect",bee:"insect",slime:"slime",orc:"orc",oni:"oni",gargoyle:"stone",arachne:"spider"
};
const SPECIES_SKIN_TWEAK={
 tiger:{marks:["tiger stripes across the cheeks","tiger stripes down the arms","tiger stripes over the shoulders"]},
 leopard:{marks:["leopard spots across the cheeks","leopard spots down the arms","leopard spots over the shoulders"]},
 phoenix:{tone:["golden tan","warm beige","caramel"]},
 butterfly:{marks:["butterflies across the cheeks","butterflies over the shoulders","butterflies across the collarbones"]},
 moth:{marks:["feathers around the eyes","butterflies over the shoulders"]},
 dryad:{tone:["warm beige","golden tan","light olive"]}
};
function skinSuggestions(species){
  if(!species)return null;
  const fam=SKIN_FAMILIES[SPECIES_FAMILY[species]]||SKIN_FAMILIES.generic;
  return{...fam,...(SPECIES_SKIN_TWEAK[species]||{})};
}

/* ===== Character Studio UI ===== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
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
Object.assign(LABELS,{torsoShape:"Torso",armShape:"Arms and hands",lashNatural:"Eyelashes",faceMark:"Beauty mark",impression:"Overall impression",hairBlend:"Color blending",stomachShape:"Stomach",nailStyle:"Nails",nailColor:"Nail colors",age:"Age category",subjectType:"Species or creature",faceShape:"Face shape",expression:"Expression",browShape:"Brows",noseShape:"Nose",mouthShape:"Mouth",eyeConfig:"Eye setup",eyeShape:"Eye shape",pupilStyle:"Pupils",irisDetail:"Iris detail",eyeOne:"Right eye color",eyeTwo:"Left eye color",hairStyle:"Style",hairLength:"Length",hairTexture:"Texture",bangs:"Bangs",hairMovement:"Movement",hairBase:"Base color",hairUnderlayer:"Underlayer color",hairInner:"Inner sections",hairHighlights:"Highlights",bustSize:"Breast size",bustShape:"Breast shape",bustWeight:"Breast weight",buttSize:"Butt",heightStature:"Height",shoulderShape:"Shoulders",waistShape:"Waist",hipShape:"Hips",thighBuild:"Thighs",legShape:"Legs",bodySoftness:"Build",posture:"Posture",skinTone:"Skin tone",undertone:"Undertone",skinFinish:"Finish",markings:"Markings",makeupStyle:"Overall style",eyelinerStyle:"Eyeliner",eyeshadowStyle:"Eyeshadow",lashStyle:"Lashes",blushStyle:"Blush",lipFinish:"Lips",faceAccents:"Face accents",makeupColor:"Makeup color",fantasyAccentColor:"Creature accent color",earStyle:"Ears",hornStyle:"Horns",tailStyle:"Tail",wingStyle:"Wings",fangClawStyle:"Fangs and claws",auraStyle:"Aura",animalForm:"Transformation",animalPattern:"Fur pattern",bodyForm:"Lower body",...OUT_LABEL});
const STEPS=[
 {id:"concept",label:"Concept",blurb:"Who she is and what she is. Everything else builds on this."},
 {id:"palette",label:"Palette",blurb:"Five colors the whole design shares. Hair, eyes and clothes can follow them."},
 {id:"face",label:"Face and eyes",blurb:"Shape, expression and eye colors."},
 {id:"hair",label:"Hair",blurb:"Style first, then length and texture. Conflicts are flagged in Checks."},
 {id:"body",label:"Body and skin",blurb:"Start from a preset or set each proportion yourself."},
 {id:"makeup",label:"Makeup",blurb:"Leave everything unset for a bare face."},
 {id:"outfit",label:"Outfit",blurb:"Build each outfit piece by piece. Keep several outfits for the same character."},
 {id:"finish",label:"Finish",blurb:"How the prompt starts, how she is written, your own words, and the Undesired Content."}
];
const STEP_FIELDS={
 concept:["age","subjectType",...TRAIT_FIELDS,"animalForm","bodyForm","fantasyAccentColor"],
 palette:SLOTS.map(s=>"pal:"+s[0]),
 face:["faceShape","expression","browShape","noseShape","mouthShape","faceMark","impression","eyeConfig","eyeShape","pupilStyle","irisDetail","lashNatural","eyeOne","eyeTwo"],
 hair:["hairStyle","hairLength","hairTexture","bangs","hairMovement","hairBase","hairUnderlayer","hairInner","hairHighlights","hairBlend"],
 body:["bustSize","bustShape","bustWeight","heightStature","shoulderShape","torsoShape","armShape","waistShape","stomachShape","hipShape","buttSize","thighBuild","legShape","bodySoftness","posture","skinTone","undertone","skinFinish","markings"],
 makeup:["makeupStyle","eyelinerStyle","eyeshadowStyle","lashStyle","blushStyle","lipFinish","faceAccents","makeupColor","nailStyle","nailColor"],
 outfit:OUT_ITEM_FIELDS.map(f=>"o:"+f),finish:[]
};
let step="concept",LASTC=null,typing="",tab="prompt";
const isSet=id=>id.startsWith("pal:")?!!S.pal[id.slice(4)]:id.startsWith("o:")?!!cur().items[id.slice(2)]:id.startsWith("d:")?!!cur().details[id.slice(2)]:(S.c[id]!=null&&S.c[id]!=="");

/* ---------- toast ---------- */
let toastT=null;
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove("show"),2600)}
hooks.toast=toast;

/* ---------- custom options ---------- */
function addCustom(key,v){v=v.trim();if(!v)return false;(CUSTOM[key]??=[]);if(!CUSTOM[key].includes(v)){CUSTOM[key].push(v);saveJSON(KEY_CUSTOM,CUSTOM)}return true}
function removeCustom(key,v){CUSTOM[key]=(CUSTOM[key]||[]).filter(x=>x!==v);if(!CUSTOM[key].length)delete CUSTOM[key];saveJSON(KEY_CUSTOM,CUSTOM)}

/* ---------- popover ---------- */
let popEl=null,popAnchor=null;
function closePop(){document.body.classList.remove("popopen");if(popEl){popEl.remove();popEl=null;if(popAnchor)popAnchor.setAttribute("aria-expanded","false");popAnchor=null}}
document.addEventListener("pointerdown",e=>{if(popEl&&!popEl.contains(e.target)&&!(popAnchor&&popAnchor.contains(e.target)))closePop()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closePop();setSide(false);const d=$("dialog[open]");if(d)d.close()}});
window.addEventListener("resize",()=>{if(popEl&&popAnchor)placePop();if(innerWidth>980)setSide(false)});
function kbInset(){const v=window.visualViewport;if(!v)return;const k=Math.max(0,Math.round(window.innerHeight-v.height-v.offsetTop));document.documentElement.style.setProperty("--kb",k+"px")}
if(window.visualViewport){visualViewport.addEventListener("resize",kbInset);visualViewport.addEventListener("scroll",kbInset)}
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

/* ---------- color popover ---------- */
const EVERYDAY_SET=new Set(EVERYDAY),ALL_COLORS=Object.keys(COLORS);
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

/* ---------- field controls ---------- */
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

/* ---------- steps ---------- */
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
/* ===== Locks (v59) =====
   S.lock      {fieldId | "pal:slot" | "step:<id>": true}   options and whole steps (concept, palette, face, hair, body, makeup)
   outfit.lock {item | "d:detail" | "*": true}              pieces, details, or the whole outfit; each outfit has its own
   A locked option is kept by Randomize, presets, heritage looks, outfit starting points, palette actions and starting points.
   You can still change it yourself with its own control. A step lock also keeps the empty options of that step empty. */
const LOCK_STEPS=[["concept","Concept"],["palette","Palette"],["face","Face and eyes"],["hair","Hair"],["body","Body and skin"],["makeup","Makeup"],["outfit","Outfit"]];
const stepName=id=>(LOCK_STEPS.find(s=>s[0]===id)||[0,id])[1];
let _fieldStep=null,lockFocus="";
function fieldStepMap(){
  if(_fieldStep)return _fieldStep;
  const m={};Object.entries(STEP_FIELDS).forEach(([st,fs])=>fs.forEach(f=>{if(!/^[pod]:/.test(f))m[f]=st}));
  ["animalPattern","noseColor","fantasyAccentColor"].forEach(f=>{m[f]=m[f]||"concept"});
  ["scleraStyle","scleraColor"].forEach(f=>{m[f]=m[f]||"face"});
  return(_fieldStep=m);
}
const SPECIAL_COMP={finishColor:"skinFinish",markingColor:"markings"};
/* a companion color (such as skinFinish's finishColor) shares its option's lock */
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
const outLock=()=>cur().lock||{};
function isLocked(id){
  if(id.startsWith("o:"))return!!outLock()[id.slice(2)];
  if(id.startsWith("d:"))return!!outLock()[id];
  return!!(S.lock&&(S.lock[id]||S.lock[baseField(id)]));
}
function stepFrozen(st){
  if(st==="outfit")return!!outLock()["*"];
  return!!(st&&S.lock&&S.lock["step:"+st]);
}
const kept=id=>isLocked(id)||stepFrozen(stepOf(id));
function setLock(id,on){
  if(/^[od]:/.test(id)){const o=cur(),k=id.startsWith("o:")?id.slice(2):id,m={...(o.lock||{})};if(on)m[k]=true;else delete m[k];if(Object.keys(m).length)o.lock=m;else delete o.lock;return}
  const m={...(S.lock||{})};if(on)m[id]=true;else delete m[id];if(Object.keys(m).length)S.lock=m;else delete S.lock;
}
function setStepLock(st,on){setLock(st==="outfit"?"o:*":"step:"+st,on)}
/* an option that is no longer set cannot stay locked (a step lock keeps empties empty instead) */
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
/* every lock in play, for the manager and the rail */
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
const lockCountFor=st=>lockEntries().filter(e=>e.step===st).length;
/* explicit locks that Randomize will be holding back inside these steps */
function lockedInScope(steps){
  const L=S.lock||{},ol=cur().lock||{};let n=0;
  Object.keys(L).forEach(k=>{if(!k.startsWith("step:")&&steps.includes(stepOf(k))&&!stepFrozen(stepOf(k)))n++});
  if(steps.includes("outfit")&&!ol["*"])n+=Object.keys(ol).length;
  return n;
}
const keptNote=n=>n?` ${n} locked option${n>1?"s":""} kept.`:"";
/* bulk changes leave locked options alone and report how many they held back */
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
/* step header: randomize this step, lock this step */
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
/* starting points keep what you locked */
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
/* rail: a padlock takes the place of the status dot on steps that hold locks (the tooltip gives the number) */
function railLock(id){
  if(!LOCK_STEPS.some(s=>s[0]===id))return null;
  const n=lockCountFor(id);if(!n)return null;
  const fz=stepFrozen(id);
  return h("span",{class:"rlk",role:"img",title:fz?"Whole step locked":`${n} locked`,"aria-label":fz?"Whole step locked":`${n} locked option${n>1?"s":""}`},icon(LOCK_SHUT,"lkic"));
}

/* ===== Randomizer (v59) =====
   Rolls only the steps you choose, steered by a vibe, around everything you locked.
   Order: species, palette, face and eyes, hair, body and skin, makeup, outfit; each step follows the ones before it. */
const KEY_RND="charstudio.randomize.v1";
const RND_EXOTIC=/fantasy|decorative/i;
const RND_STEPS=[["palette","Palette"],["face","Face and eyes"],["hair","Hair"],["body","Body and skin"],["makeup","Makeup"],["outfit","Outfit"],["concept","Species and creature features"]];
const RND_ORDER=["concept","palette","face","hair","body","makeup","outfit"];
const RND_NAME={concept:"the species",palette:"the palette",face:"face and eyes",hair:"hair",body:"body and skin",makeup:"makeup",outfit:"the outfit"};
const VIBES={
  any:{label:"Any vibe"},
  soft:{label:"Soft and sweet",moods:["soft","seasonal"],face:["soft","adorable","shy","dollface","dreamy"],eye:["doe","adorable","dolleyes","glossy","sparkling","starry"],makeup:["natural","dewy","sweet","cute","dollmk"],looks:["sweet","cottage","casual"]},
  bright:{label:"Bright and playful",moods:["bold","soft","seasonal"],face:["bright","playful","dreamy","adorable"],eye:["sparkling","glossy","starry","doe","upturned"],makeup:["cute","sweet","dewy","dollmk"],looks:["sweet","casual","sporty","resort","cyber"]},
  polished:{label:"Polished and elegant",moods:["natural","seasonal","soft"],face:["elegant","cool","soft"],eye:["almond","sharp","upturned","celestial"],makeup:["glam","editorial","natural"],looks:["preppy","glam","casual","cottage"]},
  dark:{label:"Dark and edgy",moods:["dark","bold"],face:["cool","fierce","elegant"],eye:["catlike","sharp","sleepy"],makeup:["dark","editorial","glam"],looks:["gothic","edgy","cyber"]},
  natural:{label:"Natural and everyday",moods:["natural","seasonal"],face:["soft","shy","bright"],eye:["almond","upturned","sleepy","doe"],makeup:["natural","dewy"],looks:["casual","preppy","cottage","resort","sporty"]},
  fantasy:{label:"Fantasy",moods:["fantasy","soft","dark"],face:["dreamy","elegant","cool"],eye:["celestial","starry","catlike","sparkling"],makeup:["editorial","glam","dewy"],looks:["cottage","glam","gothic","cyber"]}
};
const okColors=a=>a.filter(n=>COLORS[n]);
const LIT={
  hair:okColors(["jet black","dark brown","chestnut brown","medium brown","light brown","honey blonde","golden blonde","platinum blonde","ash blonde","strawberry blonde","auburn","copper red","walnut brown","silver"]),
  fancy:okColors(["baby pink","lavender","sky blue","mint green","lilac","rose gold","ice blue"]),
  eye:okColors(["hazel","amber","dark amber","blue","green","gray","blue-gray","gray-green","violet","teal","brown","toffee","ice blue","emerald green","light blue"]),
  tint:okColors(["rose gold","soft pink","rose pink","coral","peach","plum","burgundy","wine","lilac","baby pink"])
};
const shuffled=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
/* ---- settings kept in this browser ---- */
function rndSettings(){
  const d={steps:{palette:true,face:true,hair:true,body:true,makeup:true,outfit:true,concept:false},vibe:"any",adult:false,seen:false};
  const s=loadJSON(KEY_RND,null);
  return s&&typeof s==="object"?{...d,...s,steps:{...d.steps,...(s.steps||{})}}:d;
}
const saveRnd=s=>saveJSON(KEY_RND,s);

/* ---- palette: fit a finished palette around the colors you locked ---- */
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

/* ---- one roll ---- */
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

/* ---- outfit: locked pieces stay, the rest is rebuilt around them ---- */
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

/* ---- run a roll: several attempts, keep the one with the fewest new warnings ---- */
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
/* older entry points still work */
function randomizeCharacter(mode){return rollNow({steps:["palette","face","hair","body","makeup"],adult:mode==="adult",vibe:"any"})}
function randomizeOutfit(){return rollNow({steps:["outfit"]})}
function rollFromBar(){
  const s=rndSettings();
  if(!s.seen){openRandomDialog();return}
  rollNow({});
}

/* ---- the Randomize dialog ---- */
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

/* ===== Palette workspace (v58) ===== */
const PAL_W=[2.6,2.2,1.8,1.5,1.3];                       /* how much of a design each role usually covers */
const SLOT_KEYS=SLOTS.map(s=>s[0]);
const slotLabel=k=>(SLOTS.find(s=>s[0]===k)||[0,k])[1];
const nameHex=n=>n?(hexFor(n)||Sprite.hexFor(n)):null;
const slotHex=k=>nameHex(S.pal[k]);
function inkOn(hex){
  const[R,G,B]=rgbOf(hex).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});
  return(.2126*R+.7152*G+.0722*B)>.215?"#1B2230":"#FBFCFC";
}
/* locks: a locked color is kept by Surprise me, Shuffle, Randomize, the library and suggestions */
const palLocked=k=>kept("pal:"+k);
const setLockFlag=(k,on)=>setLock("pal:"+k,on);
let palSel="primary",palGridOpen=true,palFocus="";
function icon(d,cls){
  const NS="http://www.w3.org/2000/svg",s=document.createElementNS(NS,"svg"),p=document.createElementNS(NS,"path");
  s.setAttribute("viewBox","0 0 16 16");s.setAttribute("aria-hidden","true");s.setAttribute("class","ic"+(cls?" "+cls:""));
  p.setAttribute("d",d);p.setAttribute("fill","none");p.setAttribute("stroke","currentColor");p.setAttribute("stroke-width","1.6");p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-linejoin","round");
  s.append(p);return s;
}
const LOCK_SHUT="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6.5h-9z",LOCK_OPEN="M4.5 7V5a3.5 3.5 0 0 1 6.8-1.2M3.5 7h9v6.5h-9z";
const lockIcon=on=>icon(on?LOCK_SHUT:LOCK_OPEN,"lkic");

/* ---- what each slot is painting right now ---- */
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

/* ---- the band ---- */
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

/* ---- actions that touch the whole palette (all of them keep locked colors) ---- */
/* near-duplicates only; primary and secondary use the same 85 limit as the Checks tab */
const palAlike=names=>{const hx=names.map(nameHex);for(let i=0;i<hx.length;i++)for(let j=i+1;j<hx.length;j++){if(!hx[i]||!hx[j])continue;if(colorDist(hx[i],hx[j])<(i===0&&j===1?85:45))return true}return false};
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

/* ---- nearby shades and matches, as real named colors ---- */
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

/* ---- editor for the selected slot ---- */
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

/* ---- where the colors land ---- */
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
/* palette harmony: suggestions only, nothing changes until you press Apply */
const SCHEMES=[["analogous","Analogous"],["complementary","Complementary"],["triadic","Triadic"],["split","Split complementary"],["tetradic","Tetradic"],["mono","Monochrome"],["accent","Neutrals with one accent"]];
const MOODS=[["any","Any mood"],["soft","Soft pastels"],["light","Light and airy"],["muted","Muted and earthy"],["vivid","Vivid"],["deep","Deep and moody"]];
let harmony={scheme:"analogous",from:"primary",mood:"any",seed:0},palMood="all";
function hsl(hex){const[r,g,b]=rgbOf(hex).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let hh=0,s=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60}return{h:hh,s,l}}
const HAIR_EYE_ONLY=/blonde|auburn|ginger|hazel|^jet black|walnut brown|^(dark|medium|light|golden|warm|ash|rose|mushroom|honey|caramel) brown$|toffee|chestnut|copper red|blue-gray|gray-green|dark amber|^(blue|green|red|brown|gray|pink|purple|yellow|aqua|crimson|light blue|dark green|bright green|black|deep blue|amber)$|^glowing|^(light|ash|steel) gray$/;
const PAL_POOL=Object.keys(COLORS).filter(c=>!HAIR_EYE_ONLY.test(c));
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
/* which slot would get which color; locked slots are skipped */
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
let palLibOpen=false;
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
const PRESET_GROUPS={
  face:[{label:"Sweet",keys:["soft","adorable","shy","dollface"]},{label:"Bright and playful",keys:["bright","playful","dreamy"]},{label:"Polished",keys:["elegant","cool","fierce"]},{label:"Adult only",keys:["sultry","seductive","lustful","fatale"]}],
  eye:[{label:"Sweet",keys:["doe","adorable","dolleyes","sparkling","glossy","starry"]},{label:"Everyday",keys:["almond","upturned","sleepy"]},{label:"Striking",keys:["catlike","sharp","celestial"]},{label:"Adult only",keys:["bedroom","heavylid","hypnotic"]}],
  makeup:[{label:"Natural",keys:["natural","dewy"]},{label:"Sweet",keys:["sweet","cute","dollmk"]},{label:"Polished",keys:["glam","editorial","dark"]},{label:"Adult only",keys:["sexy","lewdglam","afterglow","fatalemk"]}],
  body:[{label:"Petite and slim",keys:["petiteFlat","petiteSoft","slender","tallSlender"]},{label:"Everyday",keys:["average","athletic"]},{label:"Curves (adult only)",keys:["curvy","thick","full","petiteHourglass","statuesque","bottomHeavy","petiteVoluptuous","delicateTop","hourglassX","bombshell"]}],
  outfit:[{label:"Everyday",keys:["cafe","picnic","preppy"]},{label:"Sporty and resort",keys:["gym","beach"]},{label:"Sweet",keys:["sugar","cuddle"]},{label:"Dressed up",keys:["velvet","gown"]},{label:"Alternative",keys:["punk","neon"]},{label:"Adult only",keys:["lewdlace","lewdlatex"]},{label:"Costume and roleplay (adult only)",keys:["plumber","cheer","teacher","cowgirl","volley"]}],
  start:[{label:"Odd-eyed originals",keys:["bluelong","redgold","bluecream"]},{label:"Everyday",keys:["academic","herbalist","seaside","goldenbrunette"]},{label:"Stylish",keys:["evening","gothic","courier","punk"]},{label:"Fantasy",keys:["kitsune"]},{label:"The two extremes",keys:["maxcute","maxlewd"]}]
};
/* chips grouped under small labels, in the order above; anything unlisted lands in "More" */
function chipGroups(groups,PRESETS,make,extra){
  const wrap=h("div",{class:"pgroups"}),listed=new Set(groups.flatMap(g=>g.keys));
  const all=groups.concat([{label:"More",keys:Object.keys(PRESETS).filter(k=>!listed.has(k))}]);
  all.forEach(g=>{const keys=g.keys.filter(k=>PRESETS[k]);if(!keys.length)return;
    wrap.append(h("div",{class:"pgroup"},h("small",{class:"pgl",text:g.label}),h("div",{class:"chips"},keys.map(k=>make(k,PRESETS[k])))))});
  if(extra)wrap.append(h("div",{class:"pgroup"},extra));
  return wrap;
}
/* One compact row with a popover instead of a block of chips */
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
const PRESET_HINTS={fpreset:"Sets shape, expression, brows, nose, mouth and impression.",epreset:"Sets eye shape, pupils, iris detail and lashes. Colors stay.",mpreset:"Sets the whole makeup look. Change any part afterward.",preset:"Sets every proportion at once. Change any part afterward."};
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
PRESET_GROUPS.outfit.push(...[{"label": "Costumes: Jobs and professions", "keys": ["c_nurse_cute", "c_nurse_sexy", "c_doctor_cute", "c_doctor_sexy", "c_police_cute", "c_police_sexy", "c_firefighter_cute", "c_firefighter_sexy", "c_pilot_cute", "c_pilot_sexy", "c_flightattendant_cute", "c_flightattendant_sexy", "c_chef_cute", "c_chef_sexy", "c_maid_cute", "c_maid_sexy", "c_secretary_cute", "c_secretary_sexy", "c_librarian_cute", "c_librarian_sexy", "c_detective_cute", "c_detective_sexy", "c_mechanic_cute", "c_mechanic_sexy", "c_construction_cute", "c_construction_sexy", "c_barista_cute", "c_barista_sexy", "c_waitress_cute", "c_waitress_sexy", "c_bartender_cute", "c_bartender_sexy", "c_lifeguard_cute", "c_lifeguard_sexy", "c_scientist_cute", "c_scientist_sexy", "c_ranger_cute", "c_ranger_sexy", "c_army_cute", "c_army_sexy", "c_navy_cute", "c_navy_sexy", "c_paramedic_cute", "c_paramedic_sexy", "c_mailcarrier_cute", "c_mailcarrier_sexy", "c_florist_cute", "c_florist_sexy", "c_baker_cute", "c_baker_sexy", "c_vet_cute", "c_vet_sexy", "c_lawyer_cute", "c_lawyer_sexy"]}, {"label": "Costumes: Halloween and spooky", "keys": ["c_witch_cute", "c_witch_sexy", "c_vampire_cute", "c_vampire_sexy", "c_werewolf_cute", "c_werewolf_sexy", "c_ghost_cute", "c_ghost_sexy", "c_zombie_cute", "c_zombie_sexy", "c_devil_cute", "c_devil_sexy", "c_angel_cute", "c_angel_sexy", "c_mummy_cute", "c_mummy_sexy", "c_skeleton_cute", "c_skeleton_sexy", "c_pumpkin_cute", "c_pumpkin_sexy", "c_blackcat_cute", "c_blackcat_sexy", "c_batgirl_cute", "c_batgirl_sexy", "c_reaper_cute", "c_reaper_sexy", "c_monsterbride_cute", "c_monsterbride_sexy", "c_succubus_cute", "c_succubus_sexy", "c_scarecrow_cute", "c_scarecrow_sexy", "c_spiderqueen_cute", "c_spiderqueen_sexy"]}, {"label": "Costumes: Fantasy and myth", "keys": ["c_elf_cute", "c_elf_sexy", "c_darkelf_cute", "c_darkelf_sexy", "c_fairy_cute", "c_fairy_sexy", "c_mermaid_cute", "c_mermaid_sexy", "c_princess_cute", "c_princess_sexy", "c_queen_cute", "c_queen_sexy", "c_knight_cute", "c_knight_sexy", "c_paladin_cute", "c_paladin_sexy", "c_mage_cute", "c_mage_sexy", "c_necromancer_cute", "c_necromancer_sexy", "c_druid_cute", "c_druid_sexy", "c_archer_cute", "c_archer_sexy", "c_rogue_cute", "c_rogue_sexy", "c_barbarian_cute", "c_barbarian_sexy", "c_valkyrie_cute", "c_valkyrie_sexy", "c_priestess_cute", "c_priestess_sexy", "c_bard_cute", "c_bard_sexy", "c_alchemist_cute", "c_alchemist_sexy", "c_snowqueen_cute", "c_snowqueen_sexy", "c_firesorceress_cute", "c_firesorceress_sexy", "c_pirate_cute", "c_pirate_sexy"]}, {"label": "Costumes: Animal and mascot", "keys": ["c_bunny_cute", "c_bunny_sexy", "c_kitten_cute", "c_kitten_sexy", "c_foxy_cute", "c_foxy_sexy", "c_cow_cute", "c_cow_sexy", "c_puppy_cute", "c_puppy_sexy", "c_bear_cute", "c_bear_sexy", "c_reindeer_cute", "c_reindeer_sexy", "c_unicorn_cute", "c_unicorn_sexy"]}, {"label": "Costumes: Heroes, villains and sci-fi", "keys": ["c_superhero_cute", "c_superhero_sexy", "c_villain_cute", "c_villain_sexy", "c_agent_cute", "c_agent_sexy", "c_bounty_cute", "c_bounty_sexy", "c_astronaut_cute", "c_astronaut_sexy", "c_android_cute", "c_android_sexy", "c_alien_cute", "c_alien_sexy", "c_hacker_cute", "c_hacker_sexy", "c_steampunk_cute", "c_steampunk_sexy", "c_timetraveler_cute", "c_timetraveler_sexy"]}, {"label": "Costumes: Eras and cultures", "keys": ["c_flapper_cute", "c_flapper_sexy", "c_pinup_cute", "c_pinup_sexy", "c_rockabilly_cute", "c_rockabilly_sexy", "c_disco_cute", "c_disco_sexy", "c_aerobics_cute", "c_aerobics_sexy", "c_punkrock_cute", "c_punkrock_sexy", "c_rockstar_cute", "c_rockstar_sexy", "c_idol_cute", "c_idol_sexy", "c_samurai_cute", "c_samurai_sexy", "c_ninja_cute", "c_ninja_sexy", "c_miko_cute", "c_miko_sexy", "c_viking_cute", "c_viking_sexy", "c_gladiator_cute", "c_gladiator_sexy", "c_goddess_cute", "c_goddess_sexy", "c_egyptian_cute", "c_egyptian_sexy"]}, {"label": "Costumes: Performers and sports", "keys": ["c_ballerina_cute", "c_ballerina_sexy", "c_skater_cute", "c_skater_sexy", "c_boxer_cute", "c_boxer_sexy", "c_racer_cute", "c_racer_sexy", "c_biker_cute", "c_biker_sexy", "c_gamer_cute", "c_gamer_sexy", "c_ringmaster_cute", "c_ringmaster_sexy", "c_jester_cute", "c_jester_sexy", "c_magician_cute", "c_magician_sexy", "c_fencer_cute", "c_fencer_sexy", "c_tennis_cute", "c_tennis_sexy", "c_surfer_cute", "c_surfer_sexy"]}]);
/* ---- v35: face and skin dataset refinement + heritage presets ---- */
Object.assign(CHAR,{"faceShape": [["doll-like face", "Doll-like and youthful"], ["full-cheeked face", "Doll-like and youthful"], ["petite face", "Doll-like and youthful"], ["soft round-cheeked face", "Doll-like and youthful"], ["softly rounded youthful-looking face with full cheeks and a delicate jawline", "Doll-like and youthful"], ["delicate, pretty face", "Doll-like and youthful"], ["delicate V-shaped face", "Heart and V-shaped"], ["diamond-shaped face", "Heart and V-shaped"], ["heart-shaped face", "Heart and V-shaped"], ["tapered face", "Heart and V-shaped"], ["heart-shaped face with high cheekbones and a tapered chin", "Heart and V-shaped"], ["soft heart-shaped face with a gently pointed chin", "Heart and V-shaped"], ["slim oval face with a tapered V-line chin", "Heart and V-shaped"], ["round face", "Round"], ["round face with soft, full cheeks", "Round"], ["round-oval face with soft cheeks and a small chin", "Round"], ["soft square face", "Broad and strong"], ["oval face with a strong, defined jaw and prominent brow", "Broad and strong"], ["broad face with high, wide cheekbones and a strong jaw", "Broad and strong"], ["broad face with soft, wide cheekbones and a rounded jaw", "Broad and strong"], ["balanced face with a softly squared jaw", "Broad and strong"], ["broad face with high, flat cheekbones", "Broad and strong"], ["long narrow face", "Long and narrow"], ["long, narrow face with a delicate jaw and high cheekbones", "Long and narrow"], ["elegant angular face", "Angular and refined"], ["refined face", "Angular and refined"], ["high-cheekboned face", "Angular and refined"], ["elongated oval face with sculpted cheekbones", "Angular and refined"], ["refined, softly rounded face with high cheekbones and a gently tapered jawline", "Angular and refined"], ["long oval face with prominent sculpted cheekbones and a softly tapered jawline", "Angular and refined"], ["long oval face", "Oval and balanced"], ["soft oval face", "Oval and balanced"], ["soft feminine face", "Oval and balanced"], ["oval face with soft cheeks", "Oval and balanced"], ["softly rounded oval face with full cheeks and prominent cheekbones", "Oval and balanced"], ["softly rounded face with full cheeks, subtle cheekbone definition and a delicate tapered jawline", "Oval and balanced"], ["oval face with balanced features", "Oval and balanced"], ["soft oval face with gentle cheekbones", "Oval and balanced"], ["long oval face with high, defined cheekbones", "Oval and balanced"], ["long oval face with a straight, defined jaw", "Oval and balanced"], ["oval face with defined cheekbones and a softly pointed chin", "Oval and balanced"], ["full-cheeked oval face with a rounded chin", "Oval and balanced"], ["oval face with wide, prominent cheekbones", "Oval and balanced"], ["sharp, elegant elven face with tall cheekbones and a pointed chin", "Fantasy and mythical"], ["ethereal, elongated face with fine, luminous features", "Fantasy and mythical"], ["angular fae face with high cheekbones and a narrow chin", "Fantasy and mythical"], ["strong, angular demonic face with a sharp jaw", "Fantasy and mythical"], ["serene, symmetrical celestial face with soft, flawless features", "Fantasy and mythical"], ["pale, sharply defined vampire face with faint cheek hollows", "Fantasy and mythical"], ["broad, heavy-jawed face with a strong brow ridge (orc-like)", "Fantasy and mythical"], ["smooth, high-cheekboned siren face with fine features", "Fantasy and mythical"], ["gaunt, hollow-cheeked spectral face", "Fantasy and mythical"], ["angular dragon-like face with a sharp jaw and faint ridged cheekbones", "Fantasy and mythical"], ["delicate, pointed woodland-spirit face with soft, rounded cheeks", "Fantasy and mythical"], ["short, wide catlike face tapering to a small chin", "Animal-inspired"], ["narrow foxlike face tapering to a pointed chin", "Animal-inspired"], ["long, strong wolfish face with a defined jaw", "Animal-inspired"], ["soft, round bunny-like face with full cheeks", "Animal-inspired"], ["broad, soft bear-like face with round cheeks", "Animal-inspired"], ["slim, deer-like face with a narrow, delicate chin", "Animal-inspired"], ["sharp-featured, bird-like face with a narrow chin", "Animal-inspired"], ["round, owl-like face with a wide, flat brow", "Animal-inspired"], ["small, round, mouse-like face with soft cheeks", "Animal-inspired"], ["strong, broad-browed lion-like face with a wide nose bridge", "Animal-inspired"]], "expression": [["soft neutral expression", "Everyday"], ["gentle smile", "Everyday"], ["subtle smile", "Everyday"], ["warm smile", "Everyday"], ["playful smile", "Everyday"], ["confident smile", "Everyday"], ["serene expression", "Everyday"], ["slightly shy expression", "Everyday"], ["calm expression", "Everyday"], ["curious expression", "Everyday"], ["dreamy expression", "Everyday"], ["mischievous expression", "Everyday"], ["focused expression", "Everyday"], ["elegant composed expression", "Everyday"], ["bright cheerful expression", "Everyday"], ["smirk", "Everyday"], ["sleepy expression", "Everyday"], ["determined expression", "Everyday"], ["cool aloof expression", "Everyday"], ["surprised expression", "Everyday"], ["laughing expression", "Everyday"], ["pouting expression", "Everyday"], ["relaxed neutral expression", "Natural"], ["candid half-smile", "Natural"], ["genuine, crinkle-eyed smile", "Natural"], ["thoughtful, distant look", "Natural"], ["wry, knowing look", "Natural"], ["stern, serious expression", "Natural"], ["soft, tired expression", "Natural"], ["unguarded, open expression", "Natural"], ["bubbly open-mouthed grin", "Cute"], ["blushing shy smile", "Cute"], ["wide-eyed delighted expression", "Cute"], ["puffed-cheek pout", "Cute"], ["tiny cat-mouth smile", "Cute"], ["happy closed-eye smile", "Cute"], ["sparkling-eyed excited expression", "Cute"], ["feral snarl", "Fantasy and animal"], ["wary, predatory stare", "Fantasy and animal"], ["regal, disdainful look", "Fantasy and animal"], ["otherworldly calm", "Fantasy and animal"], ["playful fanged grin", "Fantasy and animal"], ["sleepy, cat-like contentment", "Fantasy and animal"], ["alert, curious look with perked-up attention", "Fantasy and animal"], ["hollow, haunting stare", "Fantasy and animal"], ["serene divine smile", "Fantasy and animal"], ["sly, fox-like smirk", "Fantasy and animal"], ["fierce, battle-ready glare", "Fantasy and animal"], ["seductive smile", "Sultry (adult)"], ["half-lidded sultry gaze", "Sultry (adult)"], ["come-hither look", "Sultry (adult)"], ["lustful expression", "Sultry (adult)"], ["breathless, flushed expression", "Sultry (adult)"], ["biting her lip", "Sultry (adult)"], ["teasing tongue-out expression", "Sultry (adult)"], ["ahegao-style blissful expression", "Sultry (adult)"], ["bedroom stare", "Sultry (adult)"], ["smoldering sultry expression", "Sultry (adult)"], ["aroused, parted-lip expression", "Sultry (adult)"]], "browShape": [["slightly raised brows", "Pale and light"], ["thin blonde eyebrows", "Pale and light"], ["pale, fine brows", "Pale and light"], ["light, softly arched brows", "Pale and light"], ["full natural brows", "Thick and bold"], ["thick brows", "Thick and bold"], ["thick, naturally defined eyebrows", "Thick and bold"], ["thick, dark, boldly arched brows", "Thick and bold"], ["thick, dark, gently arched brows", "Thick and bold"], ["thick, straight dark brows", "Thick and bold"], ["full, softly arched dark brows", "Thick and bold"], ["heavy, strongly defined dark brows", "Thick and bold"], ["thick, dark, sharply arched brows", "Thick and bold"], ["delicate brows", "Thin and fine"], ["thin elegant brows", "Thin and fine"], ["thin, delicate eyebrows", "Thin and fine"], ["thin natural eyebrows", "Thin and fine"], ["thin, high-arched dark brows", "Thin and fine"], ["straight brows", "Straight and flat"], ["straight, low-set brows", "Straight and flat"], ["soft, straight dark brows", "Straight and flat"], ["flat, softly defined dark brows", "Straight and flat"], ["softly arched brows", "Arched and defined"], ["defined brows", "Arched and defined"], ["long tapered brows", "Arched and defined"], ["high arched brows", "Arched and defined"], ["softly defined eyebrows", "Arched and defined"], ["defined, gently arched eyebrows", "Arched and defined"], ["defined, gently arched dark-brown brows", "Arched and defined"], ["gentle curved brows", "Soft and natural"], ["short soft brows", "Soft and natural"], ["soft eyebrows", "Soft and natural"], ["soft, gently curved eyebrows", "Soft and natural"], ["softly shaped natural brows", "Soft and natural"], ["soft, natural eyebrows", "Soft and natural"], ["soft, curved dark brows", "Soft and natural"], ["elegantly swept-up, pointed brows", "Fantasy and mythical"], ["sharp, sweeping, devilish brows", "Fantasy and mythical"], ["pale, nearly invisible brows", "Fantasy and mythical"], ["feathered, upswept brows", "Fantasy and mythical"], ["heavy, low, brooding brows", "Fantasy and mythical"], ["thin brows with a faint silver shimmer", "Fantasy and mythical"], ["brows with a faint metallic shimmer", "Fantasy and mythical"]], "noseShape": [["broad nose", "Broad and full"], ["short nose with a low, broad bridge", "Broad and full"], ["broad nose with a softly rounded tip", "Broad and full"], ["broad nose with wide nostrils and a rounded tip", "Broad and full"], ["nose with a slightly wide base and a rounded tip", "Broad and full"], ["aquiline nose", "High-bridged and aquiline"], ["narrow straight nose with a high bridge", "High-bridged and aquiline"], ["straight nose with a high, defined bridge", "High-bridged and aquiline"], ["refined nose with a high, slightly aquiline bridge", "High-bridged and aquiline"], ["narrow nose with a high, straight bridge and fine nostrils", "High-bridged and aquiline"], ["small straight nose", "Small, button and upturned"], ["delicate button nose", "Small, button and upturned"], ["gentle upturned nose", "Small, button and upturned"], ["petite nose", "Small, button and upturned"], ["snub nose", "Small, button and upturned"], ["small nose", "Small, button and upturned"], ["small gently rounded nose", "Small, button and upturned"], ["small straight nose with a softly rounded tip", "Small, button and upturned"], ["small, delicate nose", "Small, button and upturned"], ["small upturned nose with a softly rounded tip", "Small, button and upturned"], ["short, slightly upturned nose with a soft tip", "Small, button and upturned"], ["small nose with a low, soft bridge", "Small, button and upturned"], ["small, softly rounded nose", "Small, button and upturned"], ["slender nose", "Straight and refined"], ["refined straight nose", "Straight and refined"], ["defined narrow nose", "Straight and refined"], ["slender straight nose with a refined bridge", "Straight and refined"], ["straight nose with a moderate bridge", "Straight and refined"], ["straight nose with a softly rounded tip", "Straight and refined"], ["softly rounded nose", "Soft and rounded"], ["soft natural nose", "Soft and rounded"], ["rounded nose tip", "Soft and rounded"], ["small, pink, cat-like nose", "Fantasy and animal"], ["small, black, fox-like nose", "Fantasy and animal"], ["soft, dark, wolf-like nose tip", "Fantasy and animal"], ["small, dark, dog-like nose", "Fantasy and animal"], ["soft, round, pink bunny-like nose", "Fantasy and animal"], ["small pig-like snub nose with a round pink tip", "Fantasy and animal"], ["round, dark, bear-like nose", "Fantasy and animal"], ["flat, nearly absent nose with two small slits", "Fantasy and animal"], ["sharp, narrow, aristocratic nose with a thin bridge", "Fantasy and animal"], ["pointed, delicate elfin nose", "Fantasy and animal"], ["small, beak-like nose", "Fantasy and animal"]], "mouthShape": [["small delicate lips", "Small and delicate"], ["petite lips", "Small and delicate"], ["thin lips", "Small and delicate"], ["thin-to-medium natural lips in a soft pink", "Small and delicate"], ["small, softly shaped lips", "Small and delicate"], ["small, full lips with a rounded shape", "Small and delicate"], ["soft full lips", "Full and plush"], ["plush lips", "Full and plush"], ["smooth full lips", "Full and plush"], ["naturally full pink lips", "Full and plush"], ["medium-full natural lips", "Full and plush"], ["full, plush pink lips", "Full and plush"], ["exceptionally full, plush lips", "Full and plush"], ["full, well-defined lips", "Full and plush"], ["medium-full lips with a defined cupid's bow", "Full and plush"], ["full lips with a pronounced upper curve", "Full and plush"], ["full natural lips", "Full and plush"], ["full lips with a deep natural color", "Full and plush"], ["full lips with a rounded shape", "Full and plush"], ["full, plush lips with a defined shape", "Full and plush"], ["defined cupid's-bow lips", "Defined and shaped"], ["heart-shaped lips", "Defined and shaped"], ["soft lips with a defined cupid's bow", "Defined and shaped"], ["softly parted lips", "Soft and natural"], ["gentle closed lips", "Soft and natural"], ["slightly pouty lips", "Soft and natural"], ["rounded lips", "Soft and natural"], ["wide soft lips", "Soft and natural"], ["soft lips", "Soft and natural"], ["soft natural pink lips", "Soft and natural"], ["natural rosy lips", "Soft and natural"], ["soft, naturally pink lips", "Soft and natural"], ["wide, cat-like 'w'-shaped mouth", "Fantasy and animal"], ["small, neat cat-like mouth with a defined center", "Fantasy and animal"], ["dark, black-tinted lips", "Fantasy and animal"], ["pale, frost-blue lips", "Fantasy and animal"], ["wide, thin-lipped Cheshire-style grin", "Fantasy and animal"], ["long, thin lips with wide corners", "Fantasy and animal"], ["lips with a dark, defined outline", "Fantasy and animal"], ["metallic gold-tinted lips", "Fantasy and animal"], ["lips with a faint scale-like texture", "Fantasy and animal"], ["sensual full lips", "Sultry (adult)"], ["full, parted lips", "Sultry (adult)"], ["plump pouting lips", "Sultry (adult)"], ["lips parted with the tip of her tongue showing", "Sultry (adult)"], ["a bitten lower lip", "Sultry (adult)"]], "faceMark": [["a small cleft chin", "Dimples and small features"], ["soft dimples in both cheeks", "Dimples and small features"], ["a small mole beneath one eye", "Dimples and small features"], ["a small mole above the lip", "Dimples and small features"], ["a faint scar through one eyebrow", "Scars"], ["a thin scar across the bridge of the nose", "Scars"], ["a subtle beauty mark", "Beauty marks and moles"], ["a small beauty mark beneath one eye", "Beauty marks and moles"], ["a small beauty mark near the lips", "Beauty marks and moles"], ["a small beauty mark above the lip", "Beauty marks and moles"], ["a small beauty mark on the cheek", "Beauty marks and moles"], ["a glowing jewel in the center of the forehead", "Fantasy marks"], ["a small crescent moon mark on the forehead", "Fantasy marks"], ["a glowing sigil on the forehead", "Fantasy marks"], ["a single tear-drop mark beneath one eye", "Fantasy marks"], ["a vertical red mark on the lower lip", "Fantasy marks"], ["red fox-like streaks at the outer eye corners", "Fantasy marks"], ["a faint golden third-eye mark", "Fantasy marks"], ["small whisker marks on each cheek", "Fantasy marks"], ["a small star mark beside one eye", "Fantasy marks"]], "impression": [["an approachable appearance", "Natural and everyday"], ["a warm girl-next-door charm", "Natural and everyday"], ["a warm, naturally feminine presence with expressive features", "Natural and everyday"], ["ordinary everyday beauty", "Natural and everyday"], ["an understated, natural appearance", "Natural and everyday"], ["a cozy girl-next-door look", "Natural and everyday"], ["a plain, approachable everyday look", "Natural and everyday"], ["striking, memorable features", "Natural and everyday"], ["a thoughtful, intelligent look", "Natural and everyday"], ["a kind, friendly face", "Natural and everyday"], ["a natural, understated beauty", "Natural and everyday"], ["a sweet appearance", "Sweet and soft"], ["a soft feminine appearance", "Sweet and soft"], ["delicate features", "Sweet and soft"], ["a cute girl-next-door look", "Sweet and soft"], ["an adorable, bubbly charm", "Sweet and soft"], ["a plush, huggable softness", "Sweet and soft"], ["a sparkling cute-and-sweet look", "Sweet and soft"], ["a delicate, pretty appearance", "Sweet and soft"], ["a soft, feminine appearance with delicate features", "Sweet and soft"], ["an innocent-looking appearance", "Innocent and doll-like"], ["a wholesome, innocent look", "Innocent and doll-like"], ["doll-like beauty", "Innocent and doll-like"], ["porcelain doll-like beauty", "Innocent and doll-like"], ["an elegant, mature presence", "Poised and polished"], ["a confident, polished presence", "Poised and polished"], ["a glamorous, feminine appearance", "Poised and polished"], ["a striking, feminine appearance", "Poised and polished"], ["a warm, strikingly feminine appearance", "Poised and polished"], ["a natural, realistic appearance with Northern European (Scandinavian) heritage", "Heritage"], ["a natural, realistic appearance with Irish and Scottish heritage", "Heritage"], ["a natural, realistic appearance with Western European heritage", "Heritage"], ["a natural, realistic appearance with Eastern European (Slavic) heritage", "Heritage"], ["a natural, realistic appearance with Southern European (Italian, Spanish and Greek) heritage", "Heritage"], ["a natural, realistic appearance with Arab (Levantine and Gulf) heritage", "Heritage"], ["a natural, realistic appearance with Persian (Iranian) heritage", "Heritage"], ["a natural, realistic appearance with Turkish and Anatolian heritage", "Heritage"], ["a natural, realistic appearance with North African (Berber and Egyptian) heritage", "Heritage"], ["a natural, realistic appearance with North Indian and Punjabi heritage", "Heritage"], ["a natural, realistic appearance with South Indian and Sri Lankan heritage", "Heritage"], ["a natural, realistic appearance with Bengali heritage", "Heritage"], ["a natural, realistic appearance with Pakistani and Afghan heritage", "Heritage"], ["a natural, realistic appearance with Nepali and Tibetan (Himalayan) heritage", "Heritage"], ["a natural, realistic appearance with Chinese (Han) heritage", "Heritage"], ["a natural, realistic appearance with Japanese heritage", "Heritage"], ["a natural, realistic appearance with Korean heritage", "Heritage"], ["a natural, realistic appearance with Mongolian and Central Asian heritage", "Heritage"], ["a natural, realistic appearance with Filipino heritage", "Heritage"], ["a natural, realistic appearance with Thai and Vietnamese heritage", "Heritage"], ["a natural, realistic appearance with Indonesian and Malay heritage", "Heritage"], ["a natural, realistic appearance with West African heritage", "Heritage"], ["a natural, realistic appearance with East African (Ethiopian, Eritrean and Somali) heritage", "Heritage"], ["a natural, realistic appearance with Southern African (Zulu and Xhosa) heritage", "Heritage"], ["a natural, realistic appearance with Afro-Caribbean heritage", "Heritage"], ["a natural, realistic appearance with Black American (African American) heritage", "Heritage"], ["a natural, realistic appearance with Mexican and Central American (Mestiza) heritage", "Heritage"], ["a natural, realistic appearance with Andean and Indigenous South American (Quechua) heritage", "Heritage"], ["a natural, realistic appearance with Brazilian heritage", "Heritage"], ["a natural, realistic appearance with Afro-Latina (Afro-Caribbean Latin American) heritage", "Heritage"], ["a natural, realistic appearance with Native American heritage", "Heritage"], ["a natural, realistic appearance with Polynesian and Pacific Islander (Samoan, Tongan and Hawaiian) heritage", "Heritage"], ["a natural, realistic appearance with Inuit and Arctic Indigenous heritage", "Heritage"], ["a natural, realistic appearance with Aboriginal Australian heritage", "Heritage"], ["a natural, realistic appearance with East Asian and European mixed heritage", "Heritage"], ["a natural, realistic appearance with Black and white mixed heritage", "Heritage"], ["a natural, realistic appearance with Middle Eastern and European mixed heritage", "Heritage"], ["a natural, realistic appearance with Latin American and East Asian mixed heritage", "Heritage"], ["an otherworldly, ethereal presence", "Fantasy and mythical"], ["a regal, commanding presence", "Fantasy and mythical"], ["a feral, untamed presence", "Fantasy and mythical"], ["a mischievous trickster charm", "Fantasy and mythical"], ["a serene, divine presence", "Fantasy and mythical"], ["a haunting, spectral presence", "Fantasy and mythical"], ["a dangerous, predatory elegance", "Fantasy and mythical"], ["an ancient, wise presence", "Fantasy and mythical"], ["a gentle woodland-spirit presence", "Fantasy and mythical"], ["a cool, aloof otherworldly beauty", "Fantasy and mythical"], ["a playful, animal-like energy", "Fantasy and mythical"], ["a noble, stoic presence", "Fantasy and mythical"], ["a fierce warrior presence", "Fantasy and mythical"], ["a mysterious, enchanting presence", "Fantasy and mythical"], ["an alluring, sultry presence", "Sultry (adult)"], ["a seductive, bedroom-ready allure", "Sultry (adult)"], ["a lewd, irresistible allure", "Sultry (adult)"], ["a femme fatale presence", "Sultry (adult)"], ["a sinful temptress look", "Sultry (adult)"], ["a bombshell presence", "Sultry (adult)"], ["an openly lustful presence", "Sultry (adult)"], ["an openly lewd, exaggerated figure", "Sultry (adult)"]], "skinTone": [["very fair", "Fair and light"], ["fair", "Fair and light"], ["porcelain", "Fair and light"], ["ivory", "Fair and light"], ["rosy fair", "Fair and light"], ["peachy fair", "Fair and light"], ["fair, smooth", "Fair and light"], ["fair, lightly warm-toned", "Fair and light"], ["fair warm", "Fair and light"], ["pale ivory", "Fair and light"], ["light beige", "Beige and olive"], ["warm beige", "Beige and olive"], ["golden beige", "Beige and olive"], ["light olive", "Beige and olive"], ["olive", "Beige and olive"], ["medium olive", "Beige and olive"], ["golden olive", "Beige and olive"], ["rich golden-olive", "Beige and olive"], ["golden-olive", "Beige and olive"], ["light tan", "Tan and golden"], ["tan", "Tan and golden"], ["bronze", "Tan and golden"], ["golden tan", "Tan and golden"], ["caramel", "Tan and golden"], ["light golden tan", "Tan and golden"], ["soft golden", "Tan and golden"], ["light golden-tan", "Tan and golden"], ["warm tan", "Tan and golden"], ["golden bronze", "Tan and golden"], ["light brown", "Brown"], ["warm light-brown", "Brown"], ["golden brown", "Brown"], ["medium brown", "Brown"], ["warm brown", "Brown"], ["deep brown", "Deep and dark"], ["dark brown", "Deep and dark"], ["deep ebony", "Deep and dark"], ["chestnut brown", "Deep and dark"], ["rich brown", "Deep and dark"], ["deep warm brown", "Deep and dark"], ["very deep brown", "Deep and dark"], ["bone white", "Fantasy: pale, icy and stone"], ["ice blue", "Fantasy: pale, icy and stone"], ["frost-pale blue", "Fantasy: pale, icy and stone"], ["pale lilac", "Fantasy: pale, icy and stone"], ["storm gray", "Fantasy: pale, icy and stone"], ["stone gray", "Fantasy: pale, icy and stone"], ["moss green", "Fantasy: vivid and elemental"], ["forest green", "Fantasy: vivid and elemental"], ["mint green", "Fantasy: vivid and elemental"], ["teal", "Fantasy: vivid and elemental"], ["coral red", "Fantasy: vivid and elemental"], ["ember orange", "Fantasy: vivid and elemental"], ["deep violet", "Fantasy: vivid and elemental"], ["twilight indigo", "Fantasy: vivid and elemental"], ["midnight blue", "Fantasy: vivid and elemental"], ["metallic gold", "Fantasy: metallic"], ["copper bronze", "Fantasy: metallic"], ["silver-gray metallic", "Fantasy: metallic"], ["pearl white", "Fantasy: celestial and divine"], ["divine ivory", "Fantasy: celestial and divine"], ["champagne gold", "Fantasy: celestial and divine"], ["rose quartz", "Fantasy: celestial and divine"], ["lavender", "Fantasy: celestial and divine"], ["celestial blue", "Fantasy: celestial and divine"], ["cosmic violet", "Fantasy: celestial and divine"], ["aurora-shifting", "Fantasy: celestial and divine"], ["starlight silver", "Fantasy: celestial and divine"], ["soft pink", "Fantasy: celestial and divine"], ["cerulean blue", "Fantasy: celestial and divine"], ["blue-black", "Fantasy: infernal and dark"], ["obsidian", "Fantasy: infernal and dark"], ["jade green", "Fantasy: infernal and dark"], ["seafoam green", "Fantasy: infernal and dark"], ["infernal crimson", "Fantasy: infernal and dark"], ["ashen gray", "Fantasy: infernal and dark"]], "undertone": [["golden", "Natural"], ["amber", "Natural"], ["neutral", "Natural"], ["warm", "Natural"], ["cool", "Natural"], ["olive", "Natural"], ["cool olive", "Natural"], ["peach", "Natural"], ["rosy", "Natural"], ["reddish", "Natural"], ["honey", "Natural"], ["pink", "Natural"], ["lightly warm", "Natural"], ["warm golden", "Natural"], ["cool silvery", "Natural"], ["neutral-warm", "Natural"], ["neutral-cool", "Natural"], ["red-brown", "Natural"], ["cool, blue-toned", "Natural"], ["violet", "Fantasy"], ["pearl", "Fantasy"], ["silvery", "Fantasy"], ["iridescent", "Fantasy"], ["aurora", "Fantasy"], ["cosmic", "Fantasy"], ["starlight", "Fantasy"], ["lunar", "Fantasy"], ["divine gold", "Fantasy"], ["ember-like", "Fantasy"], ["emerald", "Fantasy"], ["ember-red", "Fantasy"], ["frosted blue", "Fantasy"], ["golden-green", "Fantasy"], ["moonstone", "Fantasy"], ["verdant", "Fantasy"]], "skinFinish": [["natural skin texture with a warm, healthy glow", "Natural finishes"], ["natural skin texture with a soft rosy flush", "Natural finishes"], ["natural skin texture with a soft matte finish", "Natural finishes"], ["natural skin texture with a luminous, even finish", "Natural finishes"], ["natural skin texture with a smooth, satin finish", "Natural finishes"], ["natural skin texture with wind-flushed rosy cheeks", "Natural finishes"], ["natural skin texture with a cool, dewy finish", "Natural finishes"], ["natural skin texture with a sun-kissed glow", "Natural finishes"], ["natural skin texture with a deep, rich glow", "Natural finishes"], ["natural skin texture with a soft porcelain matte finish", "Natural finishes"], ["natural skin texture that flushes easily", "Natural finishes"], ["natural skin texture with a neutral, even tone", "Natural finishes"], ["natural skin texture with a smooth, golden glow", "Natural finishes"], ["dewy skin", "Glow and sheen"], ["soft luminous skin", "Glow and sheen"], ["subtle skin sheen", "Glow and sheen"], ["velvety skin finish", "Glow and sheen"], ["fresh skin glow", "Glow and sheen"], ["gentle reflective highlights", "Glow and sheen"], ["satin-smooth skin", "Glow and sheen"], ["sun-warmed skin", "Glow and sheen"], ["smooth, luminous skin", "Glow and sheen"], ["beautiful warm, luminous skin", "Glow and sheen"], ["subtle natural skin texture with a warm, sun-kissed glow", "Glow and sheen"], ["smooth, highly detailed skin texture", "Basic textures"], ["natural skin texture", "Basic textures"], ["soft matte skin", "Basic textures"], ["smooth even-toned skin", "Basic textures"], ["soft downy skin", "Basic textures"], ["smooth, lightly sun-kissed skin with subtle natural texture", "Basic textures"], ["smooth, warm-toned skin with a soft, supple texture", "Basic textures"], ["smooth skin with subtle realistic texture", "Basic textures"], ["smooth, soft skin with subtle natural shading", "Basic textures"], ["clear, smooth skin", "Basic textures"], ["fine scale-textured patches along the cheeks and temples", "Fantasy: scales, fur and feathers"], ["smooth, glossy scales along the arms and shoulders", "Fantasy: scales, fur and feathers"], ["soft, feather-fine down along the jaw and shoulders", "Fantasy: scales, fur and feathers"], ["short, velvety fur along the arms and shoulders", "Fantasy: scales, fur and feathers"], ["chitin-like plated patches along the arms", "Fantasy: scales, fur and feathers"], ["pearlescent scale sheen", "Fantasy: scales, fur and feathers"], ["hairline-cracked porcelain skin", "Fantasy: stone, bark and metal"], ["bark-textured patches along the arms", "Fantasy: stone, bark and metal"], ["smooth, cool stone-like skin", "Fantasy: stone, bark and metal"], ["metallic sheen across the skin", "Fantasy: stone, bark and metal"], ["frosted skin with fine ice crystals", "Fantasy: stone, bark and metal"], ["faintly mossy, dewy skin", "Fantasy: stone, bark and metal"], ["pearl-like skin sheen", "Fantasy: light and elements"], ["soft opalescent sheen", "Fantasy: light and elements"], ["moonlit skin glow", "Fantasy: light and elements"], ["starlight skin shimmer", "Fantasy: light and elements"], ["crystalline skin shimmer", "Fantasy: light and elements"], ["faint scale-textured skin", "Fantasy: light and elements"], ["faint ember glow beneath the skin", "Fantasy: light and elements"], ["frost-kissed skin", "Fantasy: light and elements"], ["dew-damp skin", "Fantasy: light and elements"], ["cool marble-like skin", "Fantasy: light and elements"], ["faint luminous veins of light", "Fantasy: light and elements"], ["glistening oiled skin", "Sultry (adult)"], ["sweat-sheened skin", "Sultry (adult)"], ["dewy flushed skin", "Sultry (adult)"], ["body glitter shimmer", "Sultry (adult)"], ["wet skin with water droplets", "Sultry (adult)"], ["oil-slick sheen", "Sultry (adult)"], ["wet, sweat-glistening skin", "Sultry (adult)"], ["lightly sweaty, dewy skin", "Sultry (adult)"]], "markings": [["light freckles dusting the shoulders, chest, stomach, hips, and thighs", "Freckles"], ["dense freckles across the face and shoulders", "Freckles"], ["dense freckles across the nose and cheeks, continuing over the shoulders and body", "Freckles"], ["dense freckles across the nose and cheeks, continuing over the shoulders and body, including the chest and breasts", "Freckles"], ["soft freckles across the cheeks", "Freckles"], ["light freckles across the nose", "Freckles"], ["dense freckles across the cheeks and nose", "Freckles"], ["freckles scattered across the shoulders", "Freckles"], ["sun-kissed freckles across the body", "Freckles"], ["a few faint freckles along the arms", "Freckles"], ["honey-gold freckles across the nose and cheeks", "Freckles"], ["freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones", "Freckles"], ["dense honey-gold freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones", "Freckles"], ["freckled shoulders and upper arms", "Freckles"], ["freckles across the back and shoulders", "Freckles"], ["freckles from the face down the neck, shoulders, collarbones, arms, back and legs", "Freckles"], ["full-body freckles across the face, neck, shoulders, chest, arms, stomach, back, hips, thighs and legs", "Freckles"], ["dense natural freckles over the whole body, concentrated across the nose and cheeks", "Freckles"], ["a light dusting of freckles across the bridge of the nose, upper cheeks, shoulders and upper chest", "Freckles"], ["light freckles across the nose and cheeks, with faint freckles on the shoulders", "Freckles"], ["faint freckles across the nose and cheeks", "Freckles"], ["soft freckles across the cheeks and nose", "Freckles"], ["a light dusting of freckles across the nose", "Freckles"], ["no markings", "Natural and beauty marks"], ["a few beauty marks", "Natural and beauty marks"], ["small beauty mark beneath one eye", "Natural and beauty marks"], ["small beauty mark near the lips", "Natural and beauty marks"], ["soft birthmark", "Natural and beauty marks"], ["a small mole on the cheek", "Natural and beauty marks"], ["a small mole above the lip", "Natural and beauty marks"], ["a small mole on the neck", "Natural and beauty marks"], ["a faint scar through one eyebrow", "Natural and beauty marks"], ["a small scar on the chin", "Natural and beauty marks"], ["soft dimples", "Natural and beauty marks"], ["a soft smattering of moles across the cheeks and neck", "Natural and beauty marks"], ["faint vitiligo patches across the cheeks and hands", "Natural and beauty marks"], ["faint laugh lines at the corners of the eyes", "Natural and beauty marks"], ["scales across the cheeks", "Scales"], ["scales along the neck", "Scales"], ["scales down the arms", "Scales"], ["mermaid scales across the cheeks", "Scales"], ["mermaid scales along the neck", "Scales"], ["mermaid scales over the shoulders", "Scales"], ["stars across the cheeks", "Celestial and cosmic"], ["stars across the collarbones", "Celestial and cosmic"], ["stars scattered over the body", "Celestial and cosmic"], ["constellations around the eyes", "Celestial and cosmic"], ["constellations across the collarbones", "Celestial and cosmic"], ["constellations over the shoulders", "Celestial and cosmic"], ["galaxy speckles across the cheeks", "Celestial and cosmic"], ["galaxy speckles over the shoulders", "Celestial and cosmic"], ["galaxy speckles scattered over the body", "Celestial and cosmic"], ["moons across the cheeks", "Celestial and cosmic"], ["moons across the collarbones", "Celestial and cosmic"], ["moon sigils across the collarbones", "Celestial and cosmic"], ["moon sigils down the arms", "Celestial and cosmic"], ["sun sigils across the collarbones", "Celestial and cosmic"], ["sun sigils over the shoulders", "Celestial and cosmic"], ["sunbursts across the cheeks", "Celestial and cosmic"], ["sunbursts around the eyes", "Celestial and cosmic"], ["celestial sigils over the shoulders", "Celestial and cosmic"], ["celestial sigils down the arms", "Celestial and cosmic"], ["angelic filigree over the shoulders", "Celestial and cosmic"], ["angelic filigree across the collarbones", "Celestial and cosmic"], ["angelic filigree down the arms", "Celestial and cosmic"], ["aurora streaks around the eyes", "Celestial and cosmic"], ["aurora streaks across the cheeks", "Celestial and cosmic"], ["aurora streaks over the shoulders", "Celestial and cosmic"], ["petals across the cheeks", "Floral and nature"], ["petals over the shoulders", "Floral and nature"], ["petals scattered over the body", "Floral and nature"], ["flowers around the eyes", "Floral and nature"], ["flowers over the shoulders", "Floral and nature"], ["flowers along the neck", "Floral and nature"], ["vines down the arms", "Floral and nature"], ["vines along the neck", "Floral and nature"], ["vines over the shoulders", "Floral and nature"], ["butterflies across the cheeks", "Floral and nature"], ["butterflies over the shoulders", "Floral and nature"], ["butterflies across the collarbones", "Floral and nature"], ["feathers around the eyes", "Floral and nature"], ["feathers over the shoulders", "Floral and nature"], ["feathers across the collarbones", "Floral and nature"], ["glowing runes down the arms", "Infernal and arcane"], ["glowing runes along the neck", "Infernal and arcane"], ["glowing runes over the shoulders", "Infernal and arcane"], ["ember lines down the arms", "Infernal and arcane"], ["ember lines over the shoulders", "Infernal and arcane"], ["embers across the cheeks", "Infernal and arcane"], ["embers scattered over the body", "Infernal and arcane"], ["demonic markings down the arms", "Infernal and arcane"], ["demonic markings over the shoulders", "Infernal and arcane"], ["demonic markings along the neck", "Infernal and arcane"], ["lightning-shaped marks down the arms", "Infernal and arcane"], ["lightning-shaped marks along the neck", "Infernal and arcane"], ["frost patterns across the cheeks", "Frost, water and sky"], ["frost patterns down the arms", "Frost, water and sky"], ["frost patterns over the shoulders", "Frost, water and sky"], ["snowflakes across the cheeks", "Frost, water and sky"], ["snowflakes scattered over the body", "Frost, water and sky"], ["wave patterns down the arms", "Frost, water and sky"], ["wave patterns along the neck", "Frost, water and sky"], ["wave patterns over the shoulders", "Frost, water and sky"], ["clouds over the shoulders", "Frost, water and sky"], ["clouds down the arms", "Frost, water and sky"], ["opal flecks across the cheeks", "Gems, gold and glitter"], ["opal flecks across the collarbones", "Gems, gold and glitter"], ["opal flecks scattered over the body", "Gems, gold and glitter"], ["pearls across the cheeks", "Gems, gold and glitter"], ["pearls across the collarbones", "Gems, gold and glitter"], ["pearls along the neck", "Gems, gold and glitter"], ["crystals across the cheeks", "Gems, gold and glitter"], ["crystals over the shoulders", "Gems, gold and glitter"], ["crystals along the neck", "Gems, gold and glitter"], ["gold leaf flecks across the cheeks", "Gems, gold and glitter"], ["gold leaf flecks across the collarbones", "Gems, gold and glitter"], ["gold leaf flecks over the shoulders", "Gems, gold and glitter"], ["glitter across the cheeks", "Gems, gold and glitter"], ["glitter across the collarbones", "Gems, gold and glitter"], ["kintsugi-style golden cracks across the cheeks", "Gems, gold and glitter"], ["kintsugi-style golden cracks down the arms", "Gems, gold and glitter"], ["kintsugi-style golden cracks over the shoulders", "Gems, gold and glitter"], ["glowing circuitry lines down the arms", "Tech and tribal"], ["glowing circuitry lines along the neck", "Tech and tribal"], ["glowing circuitry lines across the cheeks", "Tech and tribal"], ["tribal markings across the cheeks", "Tech and tribal"], ["tribal markings down the arms", "Tech and tribal"], ["tribal markings over the shoulders", "Tech and tribal"], ["fine linework patterns down the arms", "Tech and tribal"], ["fine linework patterns over the shoulders", "Tech and tribal"], ["tiger stripes across the cheeks", "Animal markings"], ["tiger stripes down the arms", "Animal markings"], ["tiger stripes over the shoulders", "Animal markings"], ["leopard spots across the cheeks", "Animal markings"], ["leopard spots down the arms", "Animal markings"], ["leopard spots over the shoulders", "Animal markings"], ["whisker-like marks across both cheeks", "Animal markings"], ["dark raccoon-like mask markings around the eyes", "Animal markings"], ["panda-like dark patches around the eyes", "Animal markings"], ["fox-like red streaks at the outer corners of the eyes", "Animal markings"], ["a pale, fur-like blaze down the bridge of the nose", "Animal markings"], ["dappled spots across the cheeks and shoulders", "Animal markings"], ["horizontal tabby stripes across the cheeks", "Animal markings"], ["rosettes across the shoulders and upper arms", "Animal markings"], ["speckled feather markings across the cheeks", "Animal markings"], ["diamond-patterned scale markings along the neck", "Animal markings"], ["tan lines across the chest and hips", "Sultry (adult)"], ["lipstick kiss marks across the neck and chest", "Sultry (adult)"], ["small love bites along the neck and collarbones", "Sultry (adult)"], ["an ornate lower-belly tattoo", "Sultry (adult)"], ["a floral thigh tattoo", "Sultry (adult)"], ["a hip tattoo", "Sultry (adult)"], ["a chest tattoo", "Sultry (adult)"], ["a navel piercing", "Sultry (adult)"], ["beauty marks across the chest", "Sultry (adult)"]], "lashNatural": [["long eyelashes", "Natural"], ["long, delicate eyelashes", "Natural"], ["thick dark eyelashes", "Natural"], ["short fine eyelashes", "Natural"], ["fluttery eyelashes", "Natural"], ["long dark eyelashes", "Natural"], ["natural eyelashes", "Natural"], ["long, thick dark eyelashes", "Natural"], ["pale, fine eyelashes", "Natural"], ["light auburn eyelashes", "Natural"], ["medium-length natural eyelashes", "Natural"], ["long, light eyelashes", "Natural"], ["long, thick, curled dark eyelashes", "Natural"], ["short, straight black eyelashes", "Natural"], ["long, dark eyelashes", "Natural"], ["sparse, pale lashes", "Natural"], ["long, feather-like lashes", "Fantasy"], ["frosted, silvery lashes", "Fantasy"], ["gold-tipped lashes", "Fantasy"], ["thick, dark, upswept lashes", "Fantasy"]], "eyeShape": [["foxlike eyes", "Stylized and animal"], ["catlike eyes", "Stylized and animal"], ["sharp eyes", "Stylized and animal"], ["doll-like eyes", "Stylized and animal"], ["large catlike eyes", "Stylized and animal"], ["large doll-like eyes", "Stylized and animal"], ["very large doll-like eyes", "Stylized and animal"], ["small sharp eyes", "Stylized and animal"], ["owl-like round eyes", "Stylized and animal"], ["very large sparkling eyes", "Stylized and animal"], ["very large glossy eyes", "Stylized and animal"], ["monolid eyes", "Eyelid folds"], ["almond-shaped eyes with a subtle epicanthic fold", "Eyelid folds"], ["narrow almond-shaped eyes with a pronounced epicanthic fold", "Eyelid folds"], ["almond-shaped eyes with double eyelids", "Eyelid folds"], ["doe-like eyes", "Large and expressive"], ["large round eyes", "Large and expressive"], ["very large round eyes", "Large and expressive"], ["large doe-like eyes", "Large and expressive"], ["very large doe-like eyes", "Large and expressive"], ["wide eyes", "Large and expressive"], ["large sparkling eyes", "Large and expressive"], ["wide glossy eyes", "Large and expressive"], ["large glossy eyes", "Large and expressive"], ["cute eye shape", "Large and expressive"], ["large, striking eyes", "Large and expressive"], ["large, warm eyes", "Large and expressive"], ["clear, wide-open eyes", "Large and expressive"], ["round eyes", "Round"], ["small round eyes", "Round"], ["round eyes with light lids", "Round"], ["large, round dark eyes", "Round"], ["hooded eyes", "Hooded, narrow and deep-set"], ["sleepy eyes", "Hooded, narrow and deep-set"], ["narrow eyes", "Hooded, narrow and deep-set"], ["close-set eyes", "Hooded, narrow and deep-set"], ["deep-set eyes", "Hooded, narrow and deep-set"], ["large sleepy eyes", "Hooded, narrow and deep-set"], ["small narrow eyes", "Hooded, narrow and deep-set"], ["small hooded eyes", "Hooded, narrow and deep-set"], ["large, deep-set almond-shaped eyes", "Hooded, narrow and deep-set"], ["almond-shaped, slightly hooded eyes", "Hooded, narrow and deep-set"], ["deep-set, dark almond-shaped eyes", "Hooded, narrow and deep-set"], ["upturned eyes", "Upturned and downturned"], ["downturned eyes", "Upturned and downturned"], ["wide-set eyes", "Upturned and downturned"], ["large upturned eyes", "Upturned and downturned"], ["large downturned eyes", "Upturned and downturned"], ["wide-set, slightly upturned eyes", "Upturned and downturned"], ["large, dark almond-shaped eyes with a slight upward tilt", "Upturned and downturned"], ["large, wide-set almond-shaped eyes", "Upturned and downturned"], ["almond-shaped eyes", "Almond"], ["tapered eyes", "Almond"], ["large almond-shaped eyes", "Almond"], ["small almond-shaped eyes", "Almond"], ["slender elegant eyes", "Almond"], ["softly angular eyes", "Almond"], ["large, almond-shaped eyes", "Almond"], ["almond-shaped eyes with light, fine lids", "Almond"], ["almond-shaped eyes with defined lids", "Almond"], ["large, dark almond-shaped eyes", "Almond"], ["large, dark almond-shaped eyes with heavy lids", "Almond"], ["large, almond-shaped eyes with light-toned irises", "Almond"], ["angelic eyes", "Fantasy"], ["celestial eyes", "Fantasy"], ["cosmic eyes", "Fantasy"], ["demonic eyes", "Fantasy"], ["dragonlike eyes", "Fantasy"], ["fae-like eyes", "Fantasy"], ["gemlike eyes", "Fantasy"], ["luminous eyes", "Fantasy"], ["moonlit eyes", "Fantasy"], ["prismatic eyes", "Fantasy"], ["reptilian eyes", "Fantasy"], ["star-shaped eyes", "Fantasy"], ["wolfish, slightly slanted eyes", "Fantasy"], ["hawk-like, sharp-edged eyes", "Fantasy"], ["half-lidded bedroom eyes", "Sultry (adult)"], ["heavy-lidded sultry eyes", "Sultry (adult)"], ["narrowed seductive eyes", "Sultry (adult)"], ["smoldering eyes", "Sultry (adult)"]]});
const HERITAGE={"nordic": {"label": "Northern European", "blurb": "Fair skin with a rosy flush, light eyes, fine straight hair.", "v": {"faceShape": "long oval face with a straight, defined jaw", "browShape": "pale, fine brows", "noseShape": "narrow straight nose with a high bridge", "mouthShape": "thin-to-medium natural lips in a soft pink", "impression": "a natural, realistic appearance with Northern European (Scandinavian) heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with light, fine lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "pale, fine eyelashes", "eyeOne": "light blue", "eyeTwo": "light blue", "skinTone": "fair", "undertone": "rosy", "skinFinish": "natural skin texture with a soft rosy flush", "hairTexture": "fine, straight and silky", "hairBase": "ash blonde", "markings": "no markings"}}, "celtic": {"label": "Irish and Scottish", "blurb": "Very fair freckle-prone skin, soft features, loose waves.", "v": {"faceShape": "soft heart-shaped face with a gently pointed chin", "browShape": "light, softly arched brows", "noseShape": "small upturned nose with a softly rounded tip", "mouthShape": "soft, naturally pink lips", "impression": "a natural, realistic appearance with Irish and Scottish heritage", "eyeConfig": "matching", "eyeShape": "round eyes with light lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "light auburn eyelashes", "eyeOne": "gray-green", "eyeTwo": "gray-green", "skinTone": "very fair", "undertone": "rosy", "skinFinish": "natural skin texture that flushes easily", "hairTexture": "loose waves", "hairBase": "auburn", "markings": "soft freckles across the cheeks and nose"}}, "westeuro": {"label": "Western European", "blurb": "Light beige skin, balanced oval face, softly wavy hair.", "v": {"faceShape": "balanced face with a softly squared jaw", "browShape": "defined, gently arched dark-brown brows", "noseShape": "straight nose with a moderate bridge", "mouthShape": "medium-full natural lips", "impression": "a natural, realistic appearance with Western European heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with defined lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "medium-length natural eyelashes", "eyeOne": "hazel", "eyeTwo": "hazel", "skinTone": "light beige", "undertone": "neutral", "skinFinish": "natural skin texture with a neutral, even tone", "hairTexture": "slightly wavy", "hairBase": "light brown", "markings": "no markings"}}, "slavic": {"label": "Eastern European", "blurb": "Fair, high cheekbones, wide-set eyes, silky straight hair.", "v": {"faceShape": "heart-shaped face with high cheekbones and a tapered chin", "browShape": "straight, low-set brows", "noseShape": "short, slightly upturned nose with a soft tip", "mouthShape": "soft lips with a defined cupid's bow", "impression": "a natural, realistic appearance with Eastern European (Slavic) heritage", "eyeConfig": "matching", "eyeShape": "wide-set, slightly upturned eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, light eyelashes", "eyeOne": "blue-gray", "eyeTwo": "blue-gray", "skinTone": "fair", "undertone": "cool", "skinFinish": "natural skin texture with a soft porcelain matte finish", "hairTexture": "silky straight", "hairBase": "dark blonde", "markings": "no markings"}}, "mediterranean": {"label": "Southern European", "blurb": "Light olive skin, dark expressive eyes, thick glossy waves.", "v": {"faceShape": "oval face with a strong, defined jaw and prominent brow", "browShape": "thick, dark, boldly arched brows", "noseShape": "straight nose with a high, defined bridge", "mouthShape": "full natural lips", "impression": "a natural, realistic appearance with Southern European (Italian, Spanish and Greek) heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "light olive", "undertone": "olive", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, glossy waves", "hairBase": "dark brown", "markings": "no markings"}}, "arab": {"label": "Arab (Levant and Gulf)", "blurb": "Light olive skin, dark arched brows, large dark eyes, thick wavy hair.", "v": {"faceShape": "oval face with defined cheekbones and a softly pointed chin", "browShape": "thick, dark, boldly arched brows", "noseShape": "straight nose with a high, defined bridge", "mouthShape": "full lips with a pronounced upper curve", "impression": "a natural, realistic appearance with Arab (Levantine and Gulf) heritage", "eyeConfig": "matching", "eyeShape": "large, deep-set almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick, curled dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "light olive", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "persian": {"label": "Persian", "blurb": "Light olive skin, long oval face, high-bridged nose, thick dark waves.", "v": {"faceShape": "long oval face with high, defined cheekbones", "browShape": "thick, dark, sharply arched brows", "noseShape": "refined nose with a high, slightly aquiline bridge", "mouthShape": "medium-full lips with a defined cupid's bow", "impression": "a natural, realistic appearance with Persian (Iranian) heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes with a slight upward tilt", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick, curled dark eyelashes", "eyeOne": "hazel", "eyeTwo": "hazel", "skinTone": "light olive", "undertone": "neutral", "skinFinish": "natural skin texture with a luminous, even finish", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "turkish": {"label": "Turkish and Anatolian", "blurb": "Light olive skin, soft oval face, thick brown hair.", "v": {"faceShape": "soft oval face with gentle cheekbones", "browShape": "thick, dark, gently arched brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "medium-full natural lips", "impression": "a natural, realistic appearance with Turkish and Anatolian heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "brown", "eyeTwo": "brown", "skinTone": "light olive", "undertone": "neutral", "skinFinish": "natural skin texture with a soft matte finish", "hairTexture": "thick, glossy waves", "hairBase": "dark brown", "markings": "no markings"}}, "maghrebi": {"label": "North African (Berber and Egyptian)", "blurb": "Warm tan skin, oval face, dark eyes, thick wavy hair.", "v": {"faceShape": "oval face with wide, prominent cheekbones", "browShape": "thick, dark, gently arched brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "full natural lips", "impression": "a natural, realistic appearance with North African (Berber and Egyptian) heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes with heavy lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "hairTexture": "thick, glossy waves", "hairBase": "dark brown", "markings": "no markings"}}, "northindian": {"label": "North Indian and Punjabi", "blurb": "Warm light-brown skin, thick arched brows, large dark eyes, glossy wavy hair.", "v": {"faceShape": "oval face with defined cheekbones and a softly pointed chin", "browShape": "thick, dark, gently arched brows", "noseShape": "straight nose with a high, defined bridge", "mouthShape": "full lips with a deep natural color", "impression": "a natural, realistic appearance with North Indian and Punjabi heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes with a slight upward tilt", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick, curled dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm light-brown", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "southindian": {"label": "South Indian and Sri Lankan", "blurb": "Medium-brown skin, soft oval face, large dark eyes, thick black hair.", "v": {"faceShape": "full-cheeked oval face with a rounded chin", "browShape": "soft, curved dark brows", "noseShape": "small, softly rounded nose", "mouthShape": "full lips with a deep natural color", "impression": "a natural, realistic appearance with South Indian and Sri Lankan heritage", "eyeConfig": "matching", "eyeShape": "deep-set, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "medium brown", "undertone": "warm", "skinFinish": "natural skin texture with a neutral, even tone", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "bengali": {"label": "Bengali", "blurb": "Warm brown skin, round-oval face, soft features, thick straight hair.", "v": {"faceShape": "round-oval face with soft cheeks and a small chin", "browShape": "soft, curved dark brows", "noseShape": "small, softly rounded nose", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Bengali heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm brown", "undertone": "warm", "skinFinish": "natural skin texture with a smooth, satin finish", "hairTexture": "thick, silky straight", "hairBase": "jet black", "markings": "no markings"}}, "pakistani": {"label": "Pakistani and Afghan", "blurb": "Light brown skin, defined features, high-bridged nose, thick dark hair.", "v": {"faceShape": "long oval face with high, defined cheekbones", "browShape": "thick, dark, sharply arched brows", "noseShape": "refined nose with a high, slightly aquiline bridge", "mouthShape": "medium-full lips with a defined cupid's bow", "impression": "a natural, realistic appearance with Pakistani and Afghan heritage", "eyeConfig": "matching", "eyeShape": "large, almond-shaped eyes with light-toned irises", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "hazel", "eyeTwo": "hazel", "skinTone": "light brown", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, glossy waves", "hairBase": "dark brown", "markings": "no markings"}}, "himalayan": {"label": "Nepali and Tibetan", "blurb": "Warm beige skin, high cheekbones, soft epicanthic folds, thick straight hair.", "v": {"faceShape": "broad face with high, wide cheekbones and a strong jaw", "browShape": "flat, softly defined dark brows", "noseShape": "short nose with a low, broad bridge", "mouthShape": "small, softly shaped lips", "impression": "a natural, realistic appearance with Nepali and Tibetan (Himalayan) heritage", "eyeConfig": "matching", "eyeShape": "narrow almond-shaped eyes with a pronounced epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm beige", "undertone": "rosy", "skinFinish": "natural skin texture with wind-flushed rosy cheeks", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "han": {"label": "Chinese", "blurb": "Light beige skin, soft oval face, dark almond eyes, straight black hair.", "v": {"faceShape": "soft oval face with gentle cheekbones", "browShape": "soft, straight dark brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "small, softly shaped lips", "impression": "a natural, realistic appearance with Chinese (Han) heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "light beige", "undertone": "neutral", "skinFinish": "natural skin texture with a soft matte finish", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "japanese": {"label": "Japanese", "blurb": "Fair skin, soft rounded chin, gentle features, straight black hair.", "v": {"faceShape": "round-oval face with soft cheeks and a small chin", "browShape": "straight, low-set brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "small, full lips with a rounded shape", "impression": "a natural, realistic appearance with Japanese heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with double eyelids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "fair", "undertone": "warm", "skinFinish": "natural skin texture with a soft matte finish", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "korean": {"label": "Korean", "blurb": "Fair skin, smooth V-line face, high cheekbones, straight dark hair.", "v": {"faceShape": "slim oval face with a tapered V-line chin", "browShape": "flat, softly defined dark brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "soft lips with a defined cupid's bow", "impression": "a natural, realistic appearance with Korean heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "fair", "undertone": "cool", "skinFinish": "natural skin texture with a cool, dewy finish", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "mongolian": {"label": "Mongolian and Central Asian", "blurb": "Golden-beige skin, broad face, high cheekbones, wind-flushed cheeks.", "v": {"faceShape": "broad face with high, flat cheekbones", "browShape": "thick, straight dark brows", "noseShape": "short nose with a low, broad bridge", "mouthShape": "medium-full natural lips", "impression": "a natural, realistic appearance with Mongolian and Central Asian heritage", "eyeConfig": "matching", "eyeShape": "narrow almond-shaped eyes with a pronounced epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden beige", "undertone": "rosy", "skinFinish": "natural skin texture with wind-flushed rosy cheeks", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "filipino": {"label": "Filipino", "blurb": "Golden-tan skin, round-oval face, large dark eyes, thick straight hair.", "v": {"faceShape": "round-oval face with soft cheeks and a small chin", "browShape": "soft, straight dark brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Filipino heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "thai": {"label": "Thai and Vietnamese", "blurb": "Light golden-beige skin, heart-shaped face, soft features, silky straight hair.", "v": {"faceShape": "heart-shaped face with high cheekbones and a tapered chin", "browShape": "soft, curved dark brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "small, full lips with a rounded shape", "impression": "a natural, realistic appearance with Thai and Vietnamese heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden beige", "undertone": "golden", "skinFinish": "natural skin texture with a smooth, golden glow", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "malay": {"label": "Indonesian and Malay", "blurb": "Golden-brown skin, round soft face, dark eyes, thick straight hair.", "v": {"faceShape": "round face with soft, full cheeks", "browShape": "soft, curved dark brows", "noseShape": "small nose with a low, soft bridge", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Indonesian and Malay heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes with heavy lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden brown", "undertone": "warm", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "westafrican": {"label": "West African", "blurb": "Deep brown skin, high cheekbones, full lips, tight curls.", "v": {"faceShape": "oval face with wide, prominent cheekbones", "browShape": "full, softly arched dark brows", "noseShape": "broad nose with wide nostrils and a rounded tip", "mouthShape": "full, plush lips with a defined shape", "impression": "a natural, realistic appearance with West African heritage", "eyeConfig": "matching", "eyeShape": "large, round dark eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick, curled dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "deep brown", "undertone": "warm", "skinFinish": "natural skin texture with a luminous, even finish", "hairTexture": "tight curls", "hairBase": "jet black", "markings": "no markings"}}, "eastafrican": {"label": "East African (Ethiopian and Somali)", "blurb": "Warm brown skin, long oval face, narrow high-bridged nose, loose coils.", "v": {"faceShape": "long, narrow face with a delicate jaw and high cheekbones", "browShape": "thin, high-arched dark brows", "noseShape": "narrow nose with a high, straight bridge and fine nostrils", "mouthShape": "medium-full lips with a defined cupid's bow", "impression": "a natural, realistic appearance with East African (Ethiopian, Eritrean and Somali) heritage", "eyeConfig": "matching", "eyeShape": "large, wide-set almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm brown", "undertone": "warm", "skinFinish": "natural skin texture with a smooth, satin finish", "hairTexture": "coily", "hairBase": "jet black", "markings": "no markings"}}, "southafrican": {"label": "Southern African", "blurb": "Dark brown skin, round-oval face, soft cheekbones, dense coils.", "v": {"faceShape": "round-oval face with soft cheeks and a small chin", "browShape": "full, softly arched dark brows", "noseShape": "broad nose with a softly rounded tip", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Southern African (Zulu and Xhosa) heritage", "eyeConfig": "matching", "eyeShape": "large, round dark eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "dark brown", "undertone": "warm", "skinFinish": "natural skin texture with a deep, rich glow", "hairTexture": "coily", "hairBase": "jet black", "markings": "no markings"}}, "caribbean": {"label": "Afro-Caribbean", "blurb": "Medium-brown skin, soft oval face, full lips, defined curls.", "v": {"faceShape": "full-cheeked oval face with a rounded chin", "browShape": "full, softly arched dark brows", "noseShape": "broad nose with a softly rounded tip", "mouthShape": "full, plush lips with a defined shape", "impression": "a natural, realistic appearance with Afro-Caribbean heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "medium brown", "undertone": "warm", "skinFinish": "natural skin texture with a luminous, even finish", "hairTexture": "large curls", "hairBase": "dark brown", "markings": "no markings"}}, "blackamerican": {"label": "Black American", "blurb": "Warm brown skin, balanced features, springy curls.", "v": {"faceShape": "balanced face with a softly squared jaw", "browShape": "thick, dark, gently arched brows", "noseShape": "nose with a slightly wide base and a rounded tip", "mouthShape": "full lips with a pronounced upper curve", "impression": "a natural, realistic appearance with Black American (African American) heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with defined lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm brown", "undertone": "warm", "skinFinish": "natural skin texture with a luminous, even finish", "hairTexture": "large curls", "hairBase": "dark brown", "markings": "no markings"}}, "mestiza": {"label": "Mexican and Central American", "blurb": "Golden-tan skin, soft oval face, prominent cheekbones, thick dark hair.", "v": {"faceShape": "oval face with wide, prominent cheekbones", "browShape": "full, softly arched dark brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "full natural lips", "impression": "a natural, realistic appearance with Mexican and Central American (Mestiza) heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with defined lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "andean": {"label": "Andean and Indigenous South American", "blurb": "Warm light-brown skin, broad face, high cheekbones, thick straight hair.", "v": {"faceShape": "broad face with high, wide cheekbones and a strong jaw", "browShape": "thick, straight dark brows", "noseShape": "straight nose with a moderate bridge", "mouthShape": "medium-full natural lips", "impression": "a natural, realistic appearance with Andean and Indigenous South American (Quechua) heritage", "eyeConfig": "matching", "eyeShape": "deep-set, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm light-brown", "undertone": "warm", "skinFinish": "natural skin texture with wind-flushed rosy cheeks", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "brazilian": {"label": "Brazilian", "blurb": "Warm tan skin, soft features, loose curls.", "v": {"faceShape": "full-cheeked oval face with a rounded chin", "browShape": "soft, curved dark brows", "noseShape": "small, softly rounded nose", "mouthShape": "full natural lips", "impression": "a natural, realistic appearance with Brazilian heritage", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "brown", "eyeTwo": "brown", "skinTone": "tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "hairTexture": "soft curls", "hairBase": "dark brown", "markings": "no markings"}}, "afrolatina": {"label": "Afro-Latina", "blurb": "Warm brown skin, soft round-oval face, full lips, defined curls.", "v": {"faceShape": "round-oval face with soft cheeks and a small chin", "browShape": "full, softly arched dark brows", "noseShape": "nose with a slightly wide base and a rounded tip", "mouthShape": "full, plush lips with a defined shape", "impression": "a natural, realistic appearance with Afro-Latina (Afro-Caribbean Latin American) heritage", "eyeConfig": "matching", "eyeShape": "large, round dark eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "warm brown", "undertone": "warm", "skinFinish": "natural skin texture with a smooth, golden glow", "hairTexture": "large curls", "hairBase": "jet black", "markings": "no markings"}}, "native": {"label": "Native American", "blurb": "Warm golden-brown skin, high cheekbones, thick straight hair.", "v": {"faceShape": "long oval face with high, defined cheekbones", "browShape": "thick, straight dark brows", "noseShape": "straight nose with a high, defined bridge", "mouthShape": "medium-full natural lips", "impression": "a natural, realistic appearance with Native American heritage", "eyeConfig": "matching", "eyeShape": "deep-set, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden brown", "undertone": "warm", "skinFinish": "natural skin texture with a neutral, even tone", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "polynesian": {"label": "Polynesian and Pacific Islander", "blurb": "Golden-brown skin, broad soft face, full lips, thick wavy hair.", "v": {"faceShape": "broad face with soft, wide cheekbones and a rounded jaw", "browShape": "thick, dark, gently arched brows", "noseShape": "broad nose with a softly rounded tip", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Polynesian and Pacific Islander (Samoan, Tongan and Hawaiian) heritage", "eyeConfig": "matching", "eyeShape": "large, wide-set almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden brown", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "thick, glossy waves", "hairBase": "jet black", "markings": "no markings"}}, "inuit": {"label": "Inuit and Arctic", "blurb": "Light golden skin, round face, high cheekbones, rosy cheeks.", "v": {"faceShape": "round face with soft, full cheeks", "browShape": "thick, straight dark brows", "noseShape": "short nose with a low, broad bridge", "mouthShape": "small, full lips with a rounded shape", "impression": "a natural, realistic appearance with Inuit and Arctic Indigenous heritage", "eyeConfig": "matching", "eyeShape": "narrow almond-shaped eyes with a pronounced epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "short, straight black eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden beige", "undertone": "rosy", "skinFinish": "natural skin texture with wind-flushed rosy cheeks", "hairTexture": "thick, straight and glossy", "hairBase": "jet black", "markings": "no markings"}}, "aboriginal": {"label": "Aboriginal Australian", "blurb": "Deep brown skin, strong brows, deep-set dark eyes, thick wavy hair.", "v": {"faceShape": "oval face with a strong, defined jaw and prominent brow", "browShape": "heavy, strongly defined dark brows", "noseShape": "broad nose with wide nostrils and a rounded tip", "mouthShape": "full lips with a rounded shape", "impression": "a natural, realistic appearance with Aboriginal Australian heritage", "eyeConfig": "matching", "eyeShape": "deep-set, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "deep brown", "undertone": "warm", "skinFinish": "natural skin texture with a soft matte finish", "hairTexture": "thick, glossy waves", "hairBase": "dark brown", "markings": "no markings"}}, "eurasian": {"label": "East Asian and European", "blurb": "Light golden-beige skin, soft features, softly wavy dark hair.", "v": {"faceShape": "soft oval face with gentle cheekbones", "browShape": "defined, gently arched dark-brown brows", "noseShape": "straight nose with a moderate bridge", "mouthShape": "medium-full lips with a defined cupid's bow", "impression": "a natural, realistic appearance with East Asian and European mixed heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "hazel", "eyeTwo": "hazel", "skinTone": "light golden tan", "undertone": "neutral", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "slightly wavy", "hairBase": "dark brown", "markings": "no markings"}}, "blackeuro": {"label": "Black and white mixed", "blurb": "Light-brown skin, soft features, loose curls, light eyes.", "v": {"faceShape": "soft oval face with gentle cheekbones", "browShape": "light, softly arched brows", "noseShape": "nose with a slightly wide base and a rounded tip", "mouthShape": "full lips with a pronounced upper curve", "impression": "a natural, realistic appearance with Black and white mixed heritage", "eyeConfig": "matching", "eyeShape": "large, almond-shaped eyes with light-toned irises", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "green-hazel", "eyeTwo": "green-hazel", "skinTone": "light brown", "undertone": "warm", "skinFinish": "natural skin texture with a luminous, even finish", "hairTexture": "soft curls", "hairBase": "chestnut brown", "markings": "a light dusting of freckles across the nose"}}, "mena_euro": {"label": "Middle Eastern and European", "blurb": "Light olive skin, defined brows, thick softly wavy hair.", "v": {"faceShape": "oval face with defined cheekbones and a softly pointed chin", "browShape": "defined, gently arched dark-brown brows", "noseShape": "straight nose with a moderate bridge", "mouthShape": "medium-full lips with a defined cupid's bow", "impression": "a natural, realistic appearance with Middle Eastern and European mixed heritage", "eyeConfig": "matching", "eyeShape": "large, almond-shaped eyes with light-toned irises", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "hazel", "eyeTwo": "hazel", "skinTone": "light olive", "undertone": "neutral", "skinFinish": "natural skin texture with a warm, healthy glow", "hairTexture": "loose waves", "hairBase": "dark brown", "markings": "no markings"}}, "latino_asian": {"label": "Latin and East Asian mixed", "blurb": "Golden-tan skin, soft oval face, dark eyes, thick glossy hair.", "v": {"faceShape": "oval face with wide, prominent cheekbones", "browShape": "soft, curved dark brows", "noseShape": "small, softly rounded nose", "mouthShape": "full natural lips", "impression": "a natural, realistic appearance with Latin American and East Asian mixed heritage", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with a subtle epicanthic fold", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "skinTone": "golden tan", "undertone": "golden", "skinFinish": "natural skin texture with a smooth, golden glow", "hairTexture": "thick, straight and glossy", "hairBase": "dark brown", "markings": "no markings"}}};
(function(){
  const add=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  Object.values(HERITAGE).forEach(p=>Object.entries(p.v).forEach(([f,v])=>{if(CHAR[f])add(f,v)}));
  Object.assign(HAIR_TEX_CLASS,{"fine, straight and silky":"straight","thick, straight and glossy":"straight","thick, silky straight":"straight","thick, glossy waves":"wavy"});
})();
const HERITAGE_CLEAR=["faceShape","browShape","noseShape","mouthShape","impression","eyeConfig","eyeShape","pupilStyle","irisDetail","lashNatural","eyeOne","eyeTwo","skinTone","undertone","skinFinish","hairTexture","hairBase","markings"];
function applyHeritage(p){
  let held=0;mut(()=>{held=bulkSet(HERITAGE_CLEAR,p.v)},"hpreset");
  toast(`Loaded “${p.label}”. Face, eyes, skin, hair color and hair texture are set; hair style and body stay yours.`+keptNote(held));
}
PRESET_GROUPS.heritage=[{"label": "Europe", "keys": ["nordic", "celtic", "westeuro", "slavic", "mediterranean"]}, {"label": "Middle East and North Africa", "keys": ["arab", "persian", "turkish", "maghrebi"]}, {"label": "South Asia", "keys": ["northindian", "southindian", "bengali", "pakistani", "himalayan"]}, {"label": "East Asia", "keys": ["han", "japanese", "korean", "mongolian"]}, {"label": "Southeast Asia", "keys": ["filipino", "thai", "malay"]}, {"label": "Africa and the African diaspora", "keys": ["westafrican", "eastafrican", "southafrican", "caribbean", "blackamerican"]}, {"label": "Latin America", "keys": ["mestiza", "andean", "brazilian", "afrolatina"]}, {"label": "Indigenous peoples and the Pacific", "keys": ["native", "polynesian", "inuit", "aboriginal"]}, {"label": "Mixed heritage", "keys": ["eurasian", "blackeuro", "mena_euro", "latino_asian"]}];
/* ---- v36: new options and the "Silver braid" starting point ---- */
(function(){
  const add=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  add("hairStyle","long loose layers with a very long thick side braid");
  add("bangs","long side bangs over one eye");
  add("hairMovement","hangs loose down the back, with a thick braid trailing to the knees");
  if(!COLORS["silvery white"])COLORS["silvery white"]="#e3e6ee";
  const NEWO={"top": [["white ribbed sweater with a gray collar and an underboob cutout", "L", "edgy,boudoir,costume", ""]], "corset": [["black corset-style bodice with red rose ornaments and an anchor emblem", "L", "gothic,edgy,costume", ""]], "outerwear": [["oversized black jacket with red lining", "CUS", "edgy,casual", ""]], "thighAccessory": [["red-and-white buckled thigh strap", "L", "edgy,costume,sporty", ""]], "detailOne": [["red rose accents", "CUS", "gothic,edgy,glam", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  TEMPLATES.push({"id": "silverbraid", "name": "Silver braid", "blurb": "Very long silver-white hair with a braid below the hips, red eyes with a beauty mark, a fanged grin and a tall, curvy figure in black and red.", "pal": {"primary": "silvery white", "secondary": "black", "third": "crimson red", "accent": "silver", "extra": "white"}, "c": {"age": "woman", "faceShape": "oval face with defined cheekbones and a softly pointed chin", "expression": "bubbly open-mouthed grin", "browShape": "softly arched brows", "noseShape": "small straight nose", "mouthShape": "soft full lips", "impression": "a confident, polished presence", "eyeConfig": "matching", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "bright, intricately detailed irises", "lashNatural": "long dark eyelashes", "eyeOne": "ruby red", "eyeTwo": "ruby red", "hairStyle": "long loose layers with a very long thick side braid", "hairLength": "knee-length", "hairTexture": "silky straight", "bangs": "long side bangs over one eye", "hairMovement": "hangs loose down the back, with a thick braid trailing to the knees", "hairBase": "@primary", "skinTone": "porcelain", "undertone": "cool", "skinFinish": "satin-smooth skin", "markings": "no markings", "fangClawStyle": "small fangs", "bustSize": "very large breasts", "bustShape": "soft rounded shape", "bustWeight": "moderate fullness", "heightStature": "tall stature", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, shapely thighs", "legShape": "long elegant legs", "bodySoftness": "tall, statuesque hourglass figure with long limbs and balanced curves", "posture": "graceful upright posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "no eyeliner", "lashStyle": "natural lashes", "lipFinish": "natural lip finish", "nailStyle": "natural fingernails", "faceMark": "a small beauty mark beneath one eye", "blushStyle": "soft cheek blush"}, "outfit": {"look": "edgy", "items": {"top": ["white ribbed sweater with a gray collar and an underboob cutout", "white"], "corset": ["black corset-style bodice with red rose ornaments and an anchor emblem", "black"], "bottom": ["pleated mini skirt", "black"], "outerwear": ["oversized black jacket with red lining", "-", "hanging off the shoulders"], "neckAccessory": ["loosened thin tie", "black"], "hipAccessory": ["small foil sheath at the hip", "-"], "thighAccessory": ["red-and-white buckled thigh strap", "-", "on one leg"]}, "details": {"detailOne": "red rose accents", "detailThree": "ribbed knit texture"}}});
  PRESET_GROUPS.start.find(g=>g.label==="Stylish").keys.push("silverbraid");
})();
/* ---- v37: two reference characters (starting points) and their outfits ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addc("hairMovement","falls straight down the back and over the shoulders");addc("hairMovement","falls softly past the shoulders");
  const NEWO={"top": [["white frilled halter bikini top with a front ribbon tie", "LS", "resort,sweet", ""], ["white frilled halter bikini top with ring accents", "LS", "resort,sweet", ""], ["iridescent holographic high-cut bunny leotard with side ribbon ties and a plunging neckline", "L", "costume,boudoir,cyber", ""]], "bottom": [["white side-tie bikini bottoms", "LS", "resort,sweet", ""], ["white frilled bikini bottoms", "LS", "resort,sweet", ""]], "headwear": [["wide-brim white sun hat with a gold laurel-leaf pin", "C", "resort,cottage", ""], ["white bunny-ear headband with a thin gold halo ring", "CU", "costume,sweet", ""]], "outerwear": [["sheer white open robe with pink ribbon ties on the sleeves", "CUS", "resort,cottage,sweet", ""]], "neckAccessory": [["detached white collar with a bow tie", "CU", "costume,sweet,glam", ""]], "wristAccessory": [["fluffy white wrist cuffs with small butterfly-wing accents", "CU", "costume,sweet", ""]], "detailOne": [["frilled trim", "CU", "resort,sweet,cottage", ""]], "detailTwo": [["front ribbon tie", "CUS", "resort,sweet", ""], ["side ribbon ties", "CUS", "resort,sweet", ""]], "detailThree": [["iridescent holographic finish", "CUS", "cyber,costume", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  TEMPLATES.push({"id": "seasidebluehair", "name": "Shy seaside", "blurb": "Very long sky-blue hair with long bangs over one eye, light-blue eyes, a shy blush and a white frilled side-tie bikini.", "pal": {"primary": "sky blue", "secondary": "white", "third": "baby blue", "accent": "powder blue", "extra": ""}, "c": {"age": "young woman", "faceShape": "soft oval face with gentle cheekbones", "expression": "slightly shy expression", "browShape": "soft, natural eyebrows", "noseShape": "small straight nose", "mouthShape": "small delicate lips", "impression": "delicate features", "eyeConfig": "matching", "eyeShape": "large downturned eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long dark eyelashes", "eyeOne": "light blue", "eyeTwo": "light blue", "hairStyle": "long straight hair", "hairLength": "hip-length", "hairTexture": "silky straight", "bangs": "long side bangs over one eye", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "skinTone": "fair", "undertone": "rosy", "skinFinish": "satin-smooth skin", "markings": "no markings", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "heightStature": "average height", "shoulderShape": "narrow delicate shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "gently curving hips", "buttSize": "round butt", "thighBuild": "slender thighs", "legShape": "long elegant legs", "bodySoftness": "average feminine build with natural proportions", "posture": "soft poised posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "no eyeliner", "blushStyle": "soft cheek blush", "lashStyle": "natural lashes", "lipFinish": "natural lip finish", "nailStyle": "natural fingernails"}, "outfit": {"look": "resort", "items": {"top": ["white frilled halter bikini top with a front ribbon tie", "@secondary"], "bottom": ["white side-tie bikini bottoms", "@secondary"], "neckAccessory": ["ribbon choker", "@secondary"]}, "details": {"detailOne": "frilled trim", "detailTwo": "side ribbon ties"}}},{"id": "lilacsunhat", "name": "Lilac sun hat", "blurb": "Long lilac-pink hair fading lighter with blunt bangs, violet sparkling eyes, a white sun hat, frilled bikini and sheer open robe.", "pal": {"primary": "lilac", "secondary": "white", "third": "baby pink", "accent": "powder blue", "extra": "gold"}, "c": {"age": "young woman", "faceShape": "round-oval face with soft cheeks and a small chin", "expression": "bright cheerful expression", "browShape": "softly arched brows", "noseShape": "small, softly rounded nose", "mouthShape": "soft natural pink lips", "impression": "a warm, naturally feminine presence with expressive features", "eyeConfig": "matching", "eyeShape": "large almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "sparkling irises with bright catchlights", "lashNatural": "long, delicate eyelashes", "eyeOne": "amethyst purple", "eyeTwo": "amethyst purple", "hairStyle": "long layered hair", "hairLength": "mid-back length", "hairTexture": "slightly wavy", "bangs": "blunt bangs", "hairMovement": "falls softly past the shoulders", "hairBase": "@primary", "hairHighlights": "@third", "hairBlend": "a seamless ombre between the colors", "skinTone": "fair", "undertone": "rosy", "skinFinish": "satin-smooth skin", "markings": "no markings", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently rounded shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "softly rounded hips", "buttSize": "round butt", "thighBuild": "smooth shapely thighs", "legShape": "long elegant legs", "bodySoftness": "balanced curving build", "posture": "soft poised posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "no eyeliner", "blushStyle": "soft cheek blush", "lashStyle": "natural lashes", "lipFinish": "natural lip finish", "nailStyle": "natural fingernails"}, "outfit": {"look": "resort", "items": {"top": ["white frilled halter bikini top with ring accents", "@secondary"], "bottom": ["white frilled bikini bottoms", "@secondary"], "outerwear": ["sheer white open robe with pink ribbon ties on the sleeves", "@secondary", "hanging off the shoulders"], "headwear": ["wide-brim white sun hat with a gold laurel-leaf pin", "@secondary"], "neckAccessory": ["ribbon choker", "@secondary"], "earAccessory": ["flower earrings", "@secondary"]}, "details": {"detailOne": "frilled trim"}}});
  PRESET_GROUPS.start.push({label:"Seaside",keys:["seasidebluehair","lilacsunhat"]});
  OUTFIT_PRESETS.push(...[{"id": "ref_bluebikini", "name": "White frilled bikini", "blurb": "White frilled halter bikini with front and side ribbon ties and a ribbon choker.", "look": "resort", "season": "s", "items": {"top": ["white frilled halter bikini top with a front ribbon tie", "@secondary"], "bottom": ["white side-tie bikini bottoms", "@secondary"], "neckAccessory": ["ribbon choker", "@secondary"]}, "details": {"detailOne": "frilled trim", "detailTwo": "side ribbon ties"}}, {"id": "ref_sunhat", "name": "Sun hat and sheer robe", "blurb": "White sun hat with a gold leaf pin, frilled bikini, sheer open robe with pink ribbons and flower earrings.", "look": "resort", "season": "s", "items": {"top": ["white frilled halter bikini top with ring accents", "@secondary"], "bottom": ["white frilled bikini bottoms", "@secondary"], "outerwear": ["sheer white open robe with pink ribbon ties on the sleeves", "@secondary", "hanging off the shoulders"], "headwear": ["wide-brim white sun hat with a gold laurel-leaf pin", "@secondary"], "neckAccessory": ["ribbon choker", "@secondary"], "earAccessory": ["flower earrings", "@secondary"]}, "details": {"detailOne": "frilled trim"}}, {"id": "ref_holobunny", "name": "Holographic halo bunny", "blurb": "Iridescent high-cut bunny leotard, detached collar and bow, halo bunny ears, fluffy winged cuffs and a bunny tail.", "look": "costume", "season": "", "adultOnly": true, "showUnder": false, "items": {"top": ["iridescent holographic high-cut bunny leotard with side ribbon ties and a plunging neckline", "-"], "neckAccessory": ["detached white collar with a bow tie", "@secondary"], "headwear": ["white bunny-ear headband with a thin gold halo ring", "@secondary"], "wristAccessory": ["fluffy white wrist cuffs with small butterfly-wing accents", "@secondary"], "tailPiece": ["fluffy bunny tail attached at the lower back", "@secondary"], "earAccessory": ["flower earrings", "@secondary"]}, "details": {"detailThree": "iridescent holographic finish"}}]);
  PRESET_GROUPS.outfit.push({label:"Resort and bunny sets",keys:["ref_bluebikini","ref_sunhat","ref_holobunny"]});
})();
/* ---- v38: refinement of "Silver braid" from fan-art, plus her recurring outfits ---- */
(function(){
  const NEWO={"headwear": [["black bunny-ear headband with a satin bow", "CU", "costume,sweet,edgy", ""], ["red lifeguard cap with small bunny ears", "CU", "costume,sporty,resort", ""], ["X-shaped hair clips", "CU", "edgy,casual", ""]], "top": [["red high-cut lifeguard swimsuit with a white cross-and-heart emblem", "L", "costume,resort,sporty", ""], ["red high-cut bunny leotard with side ribbon lacing", "L", "costume,boudoir", ""], ["black bunny leotard with a plunging neckline", "L", "costume,boudoir", ""], ["black cropped top with an underboob cutout", "L", "edgy,boudoir,costume", ""]], "outerwear": [["cropped black jacket with a red-striped collar and neckerchief", "US", "edgy,costume", ""], ["white faux-fur shrug with fluffy cuffs", "US", "costume,glam", ""]], "bottom": [["black wrap skirt with zipper edges", "US", "edgy,costume", ""]], "gloves": [["long latex gloves", "L", "costume,boudoir", ""], ["satin wrist gloves", "S", "costume,edgy", ""]], "neckAccessory": [["lace choker with a pearl-and-cross pendant", "CUS", "gothic,costume,glam", ""], ["heart choker", "CUS", "edgy,sweet,costume", ""], ["detached bow-tie collar", "S", "costume,sweet", ""]], "hipAccessory": [["silver chain draped at the hip", "US", "edgy,costume", ""]], "thighAccessory": [["red first-aid pouch strapped to the thigh", "CU", "costume,sporty", ""], ["red thigh ribbon with a small cross charm and gauze bandage", "L", "edgy,costume", ""]], "waistAccessory": [["gauze bandage wrapped around the waist", "US", "edgy,costume", ""]], "wristAccessory": [["orange silicone wristband", "CU", "sporty,resort,costume", ""], ["red-and-white armband", "CU", "sporty,costume", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  OUTFIT_PRESETS.push(...[{"id": "ref_blackbunny", "name": "Black bunny set", "blurb": "Black bunny ears with a satin bow, bow-tie collar, long latex gloves, a ribbed cutout sweater with a loose tie and bunny tail. Adult only.", "look": "costume", "season": "", "adultOnly": true, "showUnder": false, "items": {"headwear": ["black bunny-ear headband with a satin bow", "-"], "neckAccessory": ["detached bow-tie collar", "-"], "top": ["white ribbed sweater with a gray collar and an underboob cutout", "white"], "bottom": ["pleated mini skirt", "black"], "gloves": ["long latex gloves", "black"], "tailPiece": ["fluffy bunny tail attached at the lower back", "white"]}, "details": {"detailThree": "ribbed knit texture"}}, {"id": "ref_lifeguard", "name": "Red lifeguard", "blurb": "Red high-cut swimsuit with a white cross-and-heart emblem, bunny-ear lifeguard cap, armband, thigh first-aid pouch, whistle and wristband. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"top": ["red high-cut lifeguard swimsuit with a white cross-and-heart emblem", "-"], "headwear": ["red lifeguard cap with small bunny ears", "-"], "wristAccessory": ["red-and-white armband", "-"], "thighAccessory": ["red first-aid pouch strapped to the thigh", "-"], "neckAccessory": ["whistle on a lanyard", "-"]}, "details": {}}, {"id": "ref_cropjacket", "name": "Cropped jacket and chains", "blurb": "Cropped black jacket with a red-striped collar and neckerchief, cutout top, bandage waist wrap, zipper-edged skirt, silver hip chain, red thigh ribbon and X hair clips. Adult only.", "look": "edgy", "season": "", "adultOnly": true, "items": {"outerwear": ["cropped black jacket with a red-striped collar and neckerchief", "black"], "top": ["black cropped top with an underboob cutout", "black"], "waistAccessory": ["gauze bandage wrapped around the waist", "white"], "bottom": ["black wrap skirt with zipper edges", "black"], "hipAccessory": ["silver chain draped at the hip", "-"], "thighAccessory": ["red thigh ribbon with a small cross charm and gauze bandage", "red"], "headwear": ["X-shaped hair clips", "-"], "gloves": ["satin wrist gloves", "red"], "neckAccessory": ["heart choker", "red"]}, "details": {}}, {"id": "ref_redbunny", "name": "Red bunny and fur", "blurb": "Red high-cut bunny leotard with side ribbon lacing, white fur shrug and bunny ears, red lace choker with a pearl-and-cross pendant, long red latex gloves. Adult only.", "look": "costume", "season": "", "adultOnly": true, "showUnder": false, "items": {"top": ["red high-cut bunny leotard with side ribbon lacing", "red"], "outerwear": ["white faux-fur shrug with fluffy cuffs", "white", "hanging off the shoulders"], "headwear": ["bunny-ear headband", "white"], "neckAccessory": ["lace choker with a pearl-and-cross pendant", "red"], "gloves": ["long latex gloves", "red"], "tailPiece": ["fluffy bunny tail attached at the lower back", "white"]}, "details": {}}]);
  PRESET_GROUPS.outfit.push({label:"Silver braid outfits",keys:["ref_blackbunny","ref_lifeguard","ref_cropjacket","ref_redbunny"]});
})();
/* ---- v39: "Golden veil" starting point and her outfits ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addc("hairStyle","long loose layers with chest-length front sections");
  addc("hairMovement","falls long and loose down the back, with the front sections framing the face");
  addc("nailStyle","long almond fingernails painted black");
  const NEWO={"headwear": [["black curved hair ornaments with gold bands", "CU", "edgy,gothic,costume,glam", ""]], "neckAccessory": [["black fur collar", "CUS", "glam,gothic,costume,edgy", ""], ["black buckled choker", "CU", "edgy,gothic", ""]], "wristAccessory": [["black fur wrist cuffs", "CU", "glam,gothic,costume,edgy", ""]], "top": [["black fitted high-neck knit top", "CU", "glam,edgy,gothic", ""], ["black ribbed sleeveless crop knit top with silver teardrop pendants", "CU", "edgy,casual,gothic", ""], ["black fitted halter mini dress with a high side slit", "US", "glam,gothic,edgy", ""], ["black halter top with a gold O-ring", "US", "glam,edgy,gothic", ""], ["black halter bikini top with a gold O-ring and fur trim", "L", "resort,boudoir,glam", ""]], "bottom": [["black flared high-waisted pants", "CU", "glam,gothic,edgy", ""], ["faded blue low-rise jeans", "CU", "casual,edgy", ""], ["black side-tie bikini bottoms", "L", "resort,boudoir", ""]], "outerwear": [["long black coat with fur-trimmed cuffs, worn open off the shoulders", "CU", "glam,gothic,casual", ""], ["black fur boa draped over the arms", "CUS", "glam,costume", ""]], "detailOne": [["gold ring accents", "CU", "glam,gothic,edgy", ""], ["fur trim", "CUS", "glam,gothic,costume", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  TEMPLATES.push({"id": "goldenveil", "name": "Golden veil", "blurb": "Very long golden-blonde hair covering one eye, black gold-banded hair ornaments, smoky gray eyes, a calm smile and black fur-trimmed outfits.", "pal": {"primary": "golden blonde", "secondary": "black", "third": "gold", "accent": "silver", "extra": ""}, "c": {"age": "woman", "faceShape": "oval face with defined cheekbones and a softly pointed chin", "expression": "subtle smile", "browShape": "softly arched brows", "noseShape": "small straight nose", "mouthShape": "soft full lips", "impression": "an elegant, mature presence", "eyeConfig": "matching", "eyeShape": "almond-shaped, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long dark eyelashes", "eyeOne": "smoky gray", "eyeTwo": "smoky gray", "hairStyle": "long loose layers with chest-length front sections", "hairLength": "knee-length", "hairTexture": "silky straight", "bangs": "long side bangs over one eye", "hairMovement": "falls long and loose down the back, with the front sections framing the face", "hairBase": "@primary", "skinTone": "fair", "undertone": "neutral", "skinFinish": "satin-smooth skin", "markings": "no markings", "bustSize": "very large breasts", "bustShape": "soft rounded shape", "bustWeight": "moderate fullness", "heightStature": "tall stature", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, shapely thighs", "legShape": "long elegant legs", "bodySoftness": "tall, statuesque hourglass figure with long limbs and balanced curves", "posture": "graceful upright posture", "makeupStyle": "soft glam makeup", "eyelinerStyle": "soft eyeliner", "lashStyle": "natural lashes", "lipFinish": "soft satin lips", "nailStyle": "long almond fingernails painted black"}, "outfit": {"look": "glam", "items": {"top": ["black fitted high-neck knit top", "@secondary"], "bottom": ["black flared high-waisted pants", "@secondary"], "outerwear": ["long black coat with fur-trimmed cuffs, worn open off the shoulders", "@secondary"], "headwear": ["black curved hair ornaments with gold bands", "@secondary"], "neckAccessory": ["black fur collar", "@secondary"], "wristAccessory": ["black fur wrist cuffs", "@secondary"]}, "details": {"detailOne": "gold ring accents"}}});
  PRESET_GROUPS.start.find(g=>g.label==="Stylish").keys.push("goldenveil");
  OUTFIT_PRESETS.push(...[{"id": "ref_gv_coat", "name": "Fur-trim coat and pants", "blurb": "Fitted black knit top, flared pants, an open long coat with fur cuffs, fur collar and wrist cuffs.", "look": "glam", "season": "w", "items": {"top": ["black fitted high-neck knit top", "@secondary"], "bottom": ["black flared high-waisted pants", "@secondary"], "outerwear": ["long black coat with fur-trimmed cuffs, worn open off the shoulders", "@secondary"], "neckAccessory": ["black fur collar", "@secondary"], "wristAccessory": ["black fur wrist cuffs", "@secondary"], "headwear": ["black curved hair ornaments with gold bands", "@secondary"]}, "details": {"detailOne": "gold ring accents"}}, {"id": "ref_gv_cafe", "name": "Crop knit and jeans", "blurb": "Black ribbed crop knit with silver teardrop pendants, buckled choker, faded low-rise jeans and an open fur-cuffed coat.", "look": "casual", "season": "", "items": {"top": ["black ribbed sleeveless crop knit top with silver teardrop pendants", "@secondary"], "bottom": ["faded blue low-rise jeans", "-"], "outerwear": ["long black coat with fur-trimmed cuffs, worn open off the shoulders", "@secondary"], "neckAccessory": ["black buckled choker", "@secondary"], "headwear": ["black curved hair ornaments with gold bands", "@secondary"]}, "details": {}}, {"id": "ref_gv_dress", "name": "Black halter dress", "blurb": "Fitted black halter mini dress with a high side slit and the gold-banded hair ornaments. Adult only.", "look": "glam", "season": "", "adultOnly": true, "items": {"top": ["black fitted halter mini dress with a high side slit", "@secondary"], "headwear": ["black curved hair ornaments with gold bands", "@secondary"]}, "details": {}}, {"id": "ref_gv_bikini", "name": "Fur-trim black bikini", "blurb": "Black halter bikini with a gold O-ring and fur trim, side-tie bottoms, fur collar and fur wrist cuffs. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"top": ["black halter bikini top with a gold O-ring and fur trim", "@secondary"], "bottom": ["black side-tie bikini bottoms", "@secondary"], "neckAccessory": ["black fur collar", "@secondary"], "wristAccessory": ["black fur wrist cuffs", "@secondary"], "headwear": ["black curved hair ornaments with gold bands", "@secondary"]}, "details": {}}]);
  PRESET_GROUPS.outfit.push({label:"Golden veil outfits",keys:["ref_gv_coat","ref_gv_cafe","ref_gv_dress","ref_gv_bikini"]});
})();
/* ---- v40: "Aqua fin" creature starting point and outfits ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const ADDC={"faceShape": ["soft rounded face with a short, small muzzle"], "earStyle": ["large pointed fin ears with cream webbed membranes"], "tailStyle": ["thick tapered tail ending in a broad fish-tail fin"], "hornStyle": ["a tall blade-like fin crest on top of the head"], "skinFinish": ["smooth, glossy, rubbery-looking skin with a wet sheen"], "markings": ["a darker navy-blue head cap and back with a lighter sky-blue face and body, and a serrated dorsal fin ridge down the back and tail"]};
  Object.entries(ADDC).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  ["deep navy blue","cream","sky blue","pale blue-gray"].forEach(c=>{if(!COLORS[c])COLORS[c]="#1c2f5e"});
  const NEWO={"top": [["navy high-cut swimsuit with white side stripes and a criss-cross strap front", "L", "resort,costume,sporty", ""], ["red cropped tank top with a pixel game-controller print", "CU", "casual,sporty", ""], ["sheer white cropped tank top", "LS", "resort,casual", ""], ["white cropped short-sleeve top with navy collar trim and a red neckerchief", "CU", "costume,casual,sweet", ""], ["white front-tie bikini top", "LS", "resort,sweet", ""]], "bottom": [["black short athletic shorts", "CU", "casual,sporty", ""], ["black high-cut bikini bottoms", "L", "resort,boudoir", ""], ["white high-cut bikini bottoms", "LS", "resort,sweet", ""]], "headwear": [["navy and white striped hair bow headband", "CU", "resort,sweet,costume", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  
  
  OUTFIT_PRESETS.push(...[{"id": "ref_va_swim", "name": "Striped bow swimsuit", "blurb": "Navy high-cut swimsuit with white side stripes and a criss-cross strap front, with a navy and white striped bow headband. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"headwear": ["navy and white striped hair bow headband", "@secondary"], "top": ["navy high-cut swimsuit with white side stripes and a criss-cross strap front", "-"]}, "details": {}}, {"id": "ref_va_gamer", "name": "Gamer tank and shorts", "blurb": "Red cropped tank top with a pixel game-controller print and black athletic shorts.", "look": "casual", "season": "", "items": {"top": ["red cropped tank top with a pixel game-controller print", "-"], "bottom": ["black short athletic shorts", "-"]}, "details": {}}, {"id": "ref_va_wet", "name": "Sheer tank and bikini", "blurb": "Sheer white cropped tank over black high-cut bikini bottoms. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"top": ["sheer white cropped tank top", "white"], "bottom": ["black high-cut bikini bottoms", "black"]}, "details": {}}, {"id": "ref_va_neck", "name": "Neckerchief top", "blurb": "White cropped short-sleeve top with navy collar trim and a red neckerchief, with black athletic shorts.", "look": "costume", "season": "", "items": {"top": ["white cropped short-sleeve top with navy collar trim and a red neckerchief", "-"], "bottom": ["black short athletic shorts", "-"]}, "details": {}}, {"id": "ref_va_white", "name": "White front-tie bikini", "blurb": "White front-tie bikini top with high-cut white bottoms. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"top": ["white front-tie bikini top", "white"], "bottom": ["white high-cut bikini bottoms", "white"]}, "details": {}}]);
  PRESET_GROUPS.outfit.push({label:"Vaporeon outfits",keys:["ref_va_swim","ref_va_gamer","ref_va_wet","ref_va_neck","ref_va_white"]});
})();
/* ---- v41: the Eeveelution species, new fields and starting points ---- */
(function(){
  const addc=(f,v,grp)=>{if(!CHAR[f])CHAR[f]=[];const g=grp!=null?grp:(CHAR[f][0]?CHAR[f][0][1]:"");if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const SP=["eevee", "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"],GROUP="Eeveelution";
  CHAR.neckFeature=[];CHAR.crestStyle=[];
  const ADDC={"faceShape": ["narrow face with a small pointed muzzle"], "markings": ["glowing golden ring markings on the forehead, ears, legs and tail", "a pale cream chest and cream-tipped tail", "a darker plum-purple on the paws and tail tip"], "neckFeature": ["a thick cream fur ruff around the neck", "a frilled cream fin collar around the neck", "a jagged cream fur ruff around the neck", "a huge fluffy cream fur ruff around the neck", "a soft cream bow-like fur ruff around the neck", "a fluffy fur ruff around the neck", "a frilled fin collar around the neck"], "crestStyle": ["a tall blade-like fin crest on top of the head", "a spiky crest of fur on top of the head", "a fluffy plume of fur on top of the head", "a red gem set in the center of the forehead", "a leaf sprout on top of the head", "ice-crystal tufts on top of the head", "two long ribbon-like feelers with pink bows", "a tuft of fur on top of the head"], "earStyle": ["large pointed fox ears with cream inner fur", "tall pointed ears with spiky fur tufts", "small pointed ears nestled in fluffy fur", "large pointed ears with dark inner surfaces and forked tips", "tall pointed ears with glowing ring markings", "pointed ears with leaf-like tips", "large pointed ears with ice-crystal tufts", "large rounded ears with ribbon-like bow tips"], "tailStyle": ["large bushy cream-tipped fox tail", "short spiky fur tail with sharp pointed tufts", "large bushy tail with a cream tip", "slender forked cat tail", "slender tail with glowing ring markings", "short leaf-shaped tail", "short crystalline diamond-tipped tail", "slender tail with a ribbon bow"]};
  Object.entries(ADDC).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  ["neckFeature","crestStyle"].forEach(f=>CHAR[f].forEach(x=>x[1]="Creature features"));
  /* new trait fields: neck ruff/frill and head crest/feelers */
  TRAIT_FIELDS.splice(TRAIT_FIELDS.indexOf("hornStyle")+1,0,"crestStyle");
  TRAIT_FIELDS.splice(TRAIT_FIELDS.indexOf("tailStyle")+1,0,"neckFeature");
  STEP_FIELDS.concept=["age","subjectType",...TRAIT_FIELDS,"animalForm","bodyForm","fantasyAccentColor"];
  Object.assign(LABELS,{neckFeature:"Neck ruff or frill",crestStyle:"Head crest or feelers"});
  /* species registration */
  const FAM={"eevee": {"noun": "fur", "light": "soft {c} fur along her forearms and calves", "cov": "fluffy {c} fur covering her arms and legs", "snoutM": "a short fox-like muzzle with a small dark nose", "limbM": "paw hands with small pads and short claws", "snoutF": "a full short fox-like snout with a small dark nose and whiskers", "limbF": "small padded paws with short claws and digitigrade legs"}, "vaporeon": {"noun": "skin", "light": "smooth glossy {c} skin along her forearms and calves", "cov": "smooth glossy {c} skin covering her arms and legs, with a serrated dorsal fin ridge", "snoutM": "a short rounded muzzle with a small dark nose", "limbM": "webbed hands with short claws", "snoutF": "a full short rounded muzzle with a small dark nose and small fangs", "limbF": "large webbed hands and feet with digitigrade legs"}, "jolteon": {"noun": "fur", "light": "spiky {c} fur along her forearms and calves", "cov": "spiky {c} fur covering her arms and legs", "snoutM": "a narrow fox-like muzzle with a small dark nose", "limbM": "slim paw hands with small claws", "snoutF": "a full narrow fox-like snout with a small dark nose", "limbF": "slim padded paws with small claws and digitigrade legs"}, "flareon": {"noun": "fur", "light": "fluffy {c} fur along her forearms and calves", "cov": "thick, fluffy {c} fur covering her arms and legs", "snoutM": "a short fox-like muzzle with a small dark nose", "limbM": "paw hands with dark pads and short claws", "snoutF": "a full short fox-like snout with a small dark nose", "limbF": "small padded paws with short claws and digitigrade legs"}, "espeon": {"noun": "fur", "light": "sleek, short {c} fur along her forearms and calves", "cov": "sleek, short {c} fur covering her arms and legs", "snoutM": "a slim cat-like muzzle with a small pink nose", "limbM": "slender paw hands with dark {c2} fingertips and small claws", "snoutF": "a full slim cat-like snout with a small pink nose and whiskers", "limbF": "slender dark-pawed feet with small claws and digitigrade legs"}, "umbreon": {"noun": "fur", "light": "sleek, short {c} fur along her forearms and calves", "cov": "sleek, short {c} fur covering her arms and legs", "snoutM": "a slim fox-like muzzle with a small dark nose", "limbM": "slender paw hands with small claws", "snoutF": "a full slim fox-like snout with a small dark nose", "limbF": "slender padded paws with small claws and digitigrade legs"}, "leafeon": {"noun": "fur", "light": "soft {c} fur along her forearms and calves", "cov": "soft {c} fur covering her arms and legs", "snoutM": "a short fox-like muzzle with a small dark nose", "limbM": "paw hands with small pads and short claws", "snoutF": "a full short fox-like snout with a small dark nose", "limbF": "small padded paws with short claws and digitigrade legs"}, "glaceon": {"noun": "fur", "light": "sleek {c} fur along her forearms and calves", "cov": "sleek {c} fur covering her arms and legs, with frosted crystalline tufts", "snoutM": "a narrow fox-like muzzle with a small dark nose", "limbM": "slim paw hands with small claws", "snoutF": "a full narrow fox-like snout with a small dark nose", "limbF": "slim padded paws with small claws and digitigrade legs"}, "sylveon": {"noun": "fur", "light": "soft {c} fur along her forearms and calves", "cov": "soft, fluffy {c} fur covering her arms and legs", "snoutM": "a short fox-like muzzle with a small dark nose", "limbM": "soft paw hands with small pads and short claws", "snoutF": "a full short fox-like snout with a small dark nose", "limbF": "small padded paws with short claws and digitigrade legs"}},PAT={"eevee": ["a {c2} chest ruff and a {c2}-tipped tail"], "vaporeon": ["a darker {c2} head cap and back"], "jolteon": ["sharp lightning-bolt shaped fur spikes along the back and tail"], "flareon": ["a fluffy {c2} plume of fur on her head and a bushy {c2}-tipped tail"], "espeon": ["darker {c2} paws and a red gem on her forehead"], "umbreon": ["glowing {c2} ring markings on her forehead, ears, legs and tail"], "leafeon": ["{c2} leaf-like sprouts on her head, ears and tail"], "glaceon": ["frosty ice-crystal tufts along her ears and cheeks"], "sylveon": ["{c2} bows on her ears and tail with long ribbon-like feelers"]},AUTO={"eevee": {"earStyle": "large pointed fox ears with cream inner fur", "tailStyle": "large bushy cream-tipped fox tail", "neckFeature": "a thick cream fur ruff around the neck", "fangClawStyle": "subtle fangs and small claws"}, "vaporeon": {"earStyle": "large pointed fin ears with cream webbed membranes", "tailStyle": "thick tapered tail ending in a broad fish-tail fin", "neckFeature": "a frilled cream fin collar around the neck", "crestStyle": "a tall blade-like fin crest on top of the head", "fangClawStyle": "small fangs"}, "jolteon": {"earStyle": "tall pointed ears with spiky fur tufts", "tailStyle": "short spiky fur tail with sharp pointed tufts", "neckFeature": "a jagged cream fur ruff around the neck", "crestStyle": "a spiky crest of fur on top of the head", "fangClawStyle": "subtle fangs and small claws"}, "flareon": {"earStyle": "small pointed ears nestled in fluffy fur", "tailStyle": "large bushy tail with a cream tip", "neckFeature": "a huge fluffy cream fur ruff around the neck", "crestStyle": "a fluffy plume of fur on top of the head", "fangClawStyle": "subtle fangs and small claws"}, "espeon": {"earStyle": "large pointed ears with dark inner surfaces and forked tips", "tailStyle": "slender forked cat tail", "crestStyle": "a red gem set in the center of the forehead", "fangClawStyle": "subtle fangs and small claws"}, "umbreon": {"earStyle": "tall pointed ears with glowing ring markings", "tailStyle": "slender tail with glowing ring markings", "fangClawStyle": "subtle fangs and small claws"}, "leafeon": {"earStyle": "pointed ears with leaf-like tips", "tailStyle": "short leaf-shaped tail", "crestStyle": "a leaf sprout on top of the head", "fangClawStyle": "subtle fangs and small claws"}, "glaceon": {"earStyle": "large pointed ears with ice-crystal tufts", "tailStyle": "short crystalline diamond-tipped tail", "crestStyle": "ice-crystal tufts on top of the head", "fangClawStyle": "subtle fangs and small claws"}, "sylveon": {"earStyle": "large rounded ears with ribbon-like bow tips", "tailStyle": "slender tail with a ribbon bow", "neckFeature": "a soft cream bow-like fur ruff around the neck", "crestStyle": "two long ribbon-like feelers with pink bows", "fangClawStyle": "subtle fangs"}};
  SP.forEach(n=>{
    const key=n+" woman";
    CHAR.subjectType.push([n,GROUP]);
    SPECIES_INFO[n]={type:"word",legacy:[key]};
    ANIMALS.families[n]=FAM[n];
    ANIMALS.species[key]={family:n,patterns:PAT[n]};
    AUTO_TRAITS[key]=AUTO[n];
    SPECIES_FAMILY[n]="generic";
  });
  ["flame orange","leaf green","plum","deep navy blue","pale blue-gray"].forEach(c=>{if(!COLORS[c])COLORS[c]=({"flame orange":"#e8672a","leaf green":"#6fae3c","plum":"#7a3e72","deep navy blue":"#1c2f5e","pale blue-gray":"#aebfd0"})[c]});
  TEMPLATES.push(...[{"id": "eevee", "name": "Eevee", "blurb": "A bright, fluffy brown fox-like creature with a thick cream neck ruff, a bushy cream-tipped tail and a cozy knit outfit.", "pal": {"primary": "golden brown", "secondary": "cream", "third": "chocolate brown", "accent": "cream", "extra": ""}, "c": {"age": "woman", "subjectType": "eevee", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "soft rounded face with a short, small muzzle", "expression": "bright cheerful expression", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "softly rounded hips", "buttSize": "round butt", "thighBuild": "softly rounded thighs", "legShape": "long elegant legs", "bodySoftness": "soft natural build", "posture": "soft poised posture"}, "outfit": {"look": "casual", "items": {"top": ["fuzzy knit sweater", "@secondary"], "bottom": ["denim shorts", "-"]}, "details": {}}}, {"id": "vaporblue", "name": "Vaporeon", "blurb": "A sky-blue glossy water creature with large cream fin ears, a frilled cream collar, a head fin and a fish-tail fin.", "pal": {"primary": "sky blue", "secondary": "deep navy blue", "third": "cream", "accent": "white", "extra": ""}, "c": {"age": "woman", "subjectType": "vaporeon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "soft rounded face with a short, small muzzle", "expression": "playful fanged grin", "browShape": "soft, natural eyebrows", "noseShape": "small, dark, dog-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "pale blue-gray", "eyeTwo": "pale blue-gray", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "long elegant legs", "bodySoftness": "plush soft build", "posture": "soft poised posture", "skinTone": "cerulean blue", "undertone": "cool", "skinFinish": "smooth, glossy, rubbery-looking skin with a wet sheen", "markings": "a darker navy-blue head cap and back with a lighter sky-blue face and body, and a serrated dorsal fin ridge down the back and tail", "fantasyAccentColor": "cream"}, "outfit": {"look": "resort", "items": {"headwear": ["navy and white striped hair bow headband", "@secondary"], "top": ["navy high-cut swimsuit with white side stripes and a criss-cross strap front", "-"]}, "details": {}}}, {"id": "jolteon", "name": "Jolteon", "blurb": "A lean, spiky golden-yellow fox-like creature with a jagged cream neck ruff, tall ears and a sporty outfit.", "pal": {"primary": "golden yellow", "secondary": "cream", "third": "black", "accent": "white", "extra": ""}, "c": {"age": "woman", "subjectType": "jolteon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "narrow face with a small pointed muzzle", "expression": "mischievous expression", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark gray", "eyeTwo": "dark gray", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "curvy hips", "buttSize": "round butt", "thighBuild": "toned thighs", "legShape": "long elegant legs", "bodySoftness": "toned build", "posture": "soft poised posture"}, "outfit": {"look": "sporty", "items": {"top": ["cropped zip-up top", "@primary"], "bottom": ["black short athletic shorts", "-"], "wristAccessory": ["athletic wristband", "@secondary"]}, "details": {}}}, {"id": "flareon", "name": "Flareon", "blurb": "A plush orange fox-like creature with a huge fluffy cream neck ruff, a fur plume on her head and a bushy tail.", "pal": {"primary": "flame orange", "secondary": "cream", "third": "golden yellow", "accent": "cream", "extra": ""}, "c": {"age": "woman", "subjectType": "flareon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "soft rounded face with a short, small muzzle", "expression": "warm smile", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "long elegant legs", "bodySoftness": "plush soft build", "posture": "soft poised posture"}, "outfit": {"look": "resort", "items": {"top": ["bright halter top", "-"], "bottom": ["denim shorts", "-"]}, "details": {}}}, {"id": "espeon", "name": "Espeon", "blurb": "A sleek lavender cat-like creature with large pointed ears, a red forehead gem and a slender forked tail.", "pal": {"primary": "lavender", "secondary": "plum", "third": "crimson red", "accent": "pink", "extra": ""}, "c": {"age": "woman", "subjectType": "espeon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "narrow face with a small pointed muzzle", "expression": "elegant composed expression", "browShape": "soft, natural eyebrows", "noseShape": "small, pink, cat-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "amethyst purple", "eyeTwo": "amethyst purple", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "curvy hips", "buttSize": "round butt", "thighBuild": "slender thighs", "legShape": "long elegant legs", "bodySoftness": "slim build", "posture": "soft poised posture"}, "outfit": {"look": "glam", "items": {"top": ["slip dress", "@primary"], "neckAccessory": ["velvet choker", "@third"]}, "details": {}}}, {"id": "umbreon", "name": "Umbreon", "blurb": "A sleek black fox-like creature with glowing golden rings, red eyes and tall pointed ears.", "pal": {"primary": "black", "secondary": "golden yellow", "third": "charcoal gray", "accent": "gold", "extra": ""}, "c": {"age": "woman", "subjectType": "umbreon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "narrow face with a small pointed muzzle", "expression": "wry, knowing look", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "ruby red", "eyeTwo": "ruby red", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "long elegant legs", "bodySoftness": "curvy build", "posture": "soft poised posture", "markings": "glowing golden ring markings on the forehead, ears, legs and tail"}, "outfit": {"look": "gothic", "items": {"top": ["lace-trimmed gothic dress", "@primary"], "gloves": ["opera satin gloves", "@primary"], "neckAccessory": ["lace choker", "@primary"]}, "details": {}}}, {"id": "leafeon", "name": "Leafeon", "blurb": "A soft tan fox-like creature with leaf-like ear tips, a leaf sprout on her head and a leaf-shaped tail.", "pal": {"primary": "tan", "secondary": "leaf green", "third": "cream", "accent": "dark brown", "extra": ""}, "c": {"age": "woman", "subjectType": "leafeon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "soft rounded face with a short, small muzzle", "expression": "serene expression", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "curvy hips", "buttSize": "round butt", "thighBuild": "toned thighs", "legShape": "long elegant legs", "bodySoftness": "toned build", "posture": "soft poised posture"}, "outfit": {"look": "cottage", "items": {"top": ["tiered cotton sundress", "@third"], "headwear": ["flower crown", "@secondary"]}, "details": {}}}, {"id": "glaceon", "name": "Glaceon", "blurb": "A sleek ice-blue fox-like creature with ice-crystal ear tufts, frosty fur and a crystalline tail.", "pal": {"primary": "ice blue", "secondary": "periwinkle", "third": "white", "accent": "silver", "extra": ""}, "c": {"age": "woman", "subjectType": "glaceon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "narrow face with a small pointed muzzle", "expression": "cool aloof expression", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "light blue", "eyeTwo": "light blue", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "curvy hips", "buttSize": "round butt", "thighBuild": "softly rounded thighs", "legShape": "long elegant legs", "bodySoftness": "slim build", "posture": "soft poised posture"}, "outfit": {"look": "casual", "items": {"top": ["knit sweater dress", "@secondary"], "neckAccessory": ["puffy scarf", "@third"]}, "details": {}}}, {"id": "sylveon", "name": "Sylveon", "blurb": "A soft cream and baby-pink fox-like creature with bow-tipped ears, long ribbon feelers and a bow-trimmed tail.", "pal": {"primary": "cream", "secondary": "baby pink", "third": "sky blue", "accent": "white", "extra": ""}, "c": {"age": "woman", "subjectType": "sylveon", "animalForm": "Full (beast-like anthropomorph)", "faceShape": "soft rounded face with a short, small muzzle", "expression": "gentle smile", "browShape": "soft, natural eyebrows", "noseShape": "small, black, fox-like nose", "impression": "a sweet appearance", "eyeConfig": "matching", "eyeShape": "large, dark almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "glossy, highlight-rich eyes with detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "light blue", "eyeTwo": "light blue", "blushStyle": "soft cheek blush", "nailStyle": "natural fingernails", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly curving waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "long elegant legs", "bodySoftness": "plush soft build", "posture": "soft poised posture"}, "outfit": {"look": "sweet", "items": {"corset": ["pastel ribbon-laced bodice", "@secondary"], "bottom": ["tiered tulle skirt", "@third"], "headwear": ["oversized satin hair bows", "@secondary"]}, "details": {}}}]);
  {const i=PRESET_GROUPS.start.findIndex(g=>g.label==="Eeveelutions");if(i>=0)PRESET_GROUPS.start.splice(i,1)}
  PRESET_GROUPS.start.push({label:"Eeveelutions",keys:["eevee", "vaporblue", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"]});
  OUTFIT_PRESETS.push(...[{"id": "ref_ee_cozy", "name": "Cozy knit and shorts", "blurb": "Fuzzy cream knit sweater with denim shorts.", "look": "casual", "season": "", "items": {"top": ["fuzzy knit sweater", "@secondary"], "bottom": ["denim shorts", "-"]}, "details": {}}, {"id": "ref_jo_sport", "name": "Electric sporty", "blurb": "Cropped zip-up top, athletic shorts and a wristband.", "look": "sporty", "season": "", "items": {"top": ["cropped zip-up top", "@primary"], "bottom": ["black short athletic shorts", "-"], "wristAccessory": ["athletic wristband", "@secondary"]}, "details": {}}, {"id": "ref_fl_halter", "name": "Ember halter", "blurb": "Bright halter top with denim shorts.", "look": "resort", "season": "", "items": {"top": ["bright halter top", "-"], "bottom": ["denim shorts", "-"]}, "details": {}}, {"id": "ref_es_slip", "name": "Slip dress and choker", "blurb": "Slip dress with a velvet choker.", "look": "glam", "season": "", "items": {"top": ["slip dress", "@primary"], "neckAccessory": ["velvet choker", "@third"]}, "details": {}}, {"id": "ref_um_gothic", "name": "Gothic lace dress", "blurb": "Lace-trimmed gothic dress, opera gloves and a lace choker.", "look": "gothic", "season": "", "items": {"top": ["lace-trimmed gothic dress", "@primary"], "gloves": ["opera satin gloves", "@primary"], "neckAccessory": ["lace choker", "@primary"]}, "details": {}}, {"id": "ref_le_sundress", "name": "Sundress and flower crown", "blurb": "Tiered cotton sundress with a flower crown.", "look": "cottage", "season": "", "items": {"top": ["tiered cotton sundress", "@third"], "headwear": ["flower crown", "@secondary"]}, "details": {}}, {"id": "ref_gl_sweater", "name": "Sweater dress and scarf", "blurb": "Knit sweater dress with a puffy scarf.", "look": "casual", "season": "", "items": {"top": ["knit sweater dress", "@secondary"], "neckAccessory": ["puffy scarf", "@third"]}, "details": {}}, {"id": "ref_sy_ribbon", "name": "Ribbon bodice", "blurb": "Ribbon-laced bodice, tulle skirt and oversized bows.", "look": "sweet", "season": "", "items": {"corset": ["pastel ribbon-laced bodice", "@secondary"], "bottom": ["tiered tulle skirt", "@third"], "headwear": ["oversized satin hair bows", "@secondary"]}, "details": {}}]);
  PRESET_GROUPS.outfit.push({label:"Eeveelution outfits",keys:["ref_ee_cozy", "ref_jo_sport", "ref_fl_halter", "ref_es_slip", "ref_um_gothic", "ref_le_sundress", "ref_gl_sweater", "ref_sy_ribbon"]});
})();
/* ---- v42: make late-added colors and species data visible in the pickers ---- */
(function(){
  const addc=(f,v)=>{if(!CHAR[f])return;if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,CHAR[f][0]?CHAR[f][0][1]:""])};
  addc("skinFinish","short, soft fur with a velvety sheen");
  ["soft golden","golden beige","caramel","light tan","warm brown","golden brown","lavender","soft pink","rose quartz","obsidian","blue-black","ashen gray","ice blue","frost-pale blue","pearl white","ivory","teal","cerulean blue","warm beige"].forEach(v=>addc("skinTone",v));
  /* colors registered after the picker lists were built */
  Object.keys(COLORS).forEach(c=>{if(!ALL_COLORS.includes(c)&&!EVERYDAY_SET.has(c))ALL_COLORS.push(c);if(!PAL_POOL.includes(c)&&!HAIR_EYE_ONLY.test(c))PAL_POOL.push(c)});
  /* per-species skin suggestions */
  const TW={"eevee": {"tone": ["warm brown", "golden brown", "light tan"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}, "vaporeon": {"tone": ["cerulean blue", "ice blue", "teal"], "finish": ["smooth, glossy, rubbery-looking skin with a wet sheen"], "marks": ["a darker navy-blue head cap and back with a lighter sky-blue face and body, and a serrated dorsal fin ridge down the back and tail"]}, "jolteon": {"tone": ["light tan", "soft golden", "golden beige"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}, "flareon": {"tone": ["light tan", "golden beige", "caramel"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}, "espeon": {"tone": ["lavender", "soft pink", "rose quartz"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a darker plum-purple on the paws and tail tip"]}, "umbreon": {"tone": ["obsidian", "blue-black", "ashen gray"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["glowing golden ring markings on the forehead, ears, legs and tail"]}, "leafeon": {"tone": ["light tan", "warm beige", "golden beige"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}, "glaceon": {"tone": ["ice blue", "frost-pale blue", "pearl white"], "finish": ["frosted skin with fine ice crystals", "short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}, "sylveon": {"tone": ["pearl white", "ivory", "soft pink"], "finish": ["short, soft fur with a velvety sheen"], "marks": ["a pale cream chest and cream-tipped tail"]}};
  Object.entries(TW).forEach(([n,t])=>{SPECIES_SKIN_TWEAK[n]=t});
})();
/* ---- v43: skin follows the palette ---- */
const SKIN_TOK_F={"natural skin texture with a smooth, golden glow": ["natural skin texture with a smooth, {c} glow", "gold"]},SKIN_TOK_M={"honey-gold freckles across the nose and cheeks": ["{c} freckles across the nose and cheeks", "honey gold"], "dense honey-gold freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones": ["dense {c} freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones", "honey gold"], "ember lines down the arms": ["glowing {c} lines down the arms", "flame orange"], "ember lines over the shoulders": ["glowing {c} lines over the shoulders", "flame orange"], "opal flecks across the cheeks": ["{c} flecks across the cheeks", "opalescent white"], "opal flecks across the collarbones": ["{c} flecks across the collarbones", "opalescent white"], "opal flecks scattered over the body": ["{c} flecks scattered over the body", "opalescent white"], "gold leaf flecks across the cheeks": ["metallic {c} flecks across the cheeks", "gold"], "gold leaf flecks across the collarbones": ["metallic {c} flecks across the collarbones", "gold"], "gold leaf flecks over the shoulders": ["metallic {c} flecks over the shoulders", "gold"], "kintsugi-style golden cracks across the cheeks": ["kintsugi-style {c} cracks across the cheeks", "gold"], "kintsugi-style golden cracks down the arms": ["kintsugi-style {c} cracks down the arms", "gold"], "kintsugi-style golden cracks over the shoulders": ["kintsugi-style {c} cracks over the shoulders", "gold"], "fox-like red streaks at the outer corners of the eyes": ["fox-like {c} streaks at the outer corners of the eyes", "red"], "a darker navy-blue head cap and back with a lighter sky-blue face and body, and a serrated dorsal fin ridge down the back and tail": ["a {c} head cap and back, with a serrated dorsal fin ridge down the back and tail", "deep navy blue"], "glowing golden ring markings on the forehead, ears, legs and tail": ["glowing {c} ring markings on the forehead, ears, legs and tail", "gold"], "a pale cream chest and cream-tipped tail": ["a pale {c} chest and a {c} tail tip", "cream"], "a darker plum-purple on the paws and tail tip": ["darker {c} paws and tail tip", "plum"]};
(function(){
  /* 1. bake-free options: the color moved out of the text into {c} */
  const swap=(field,map)=>{CHAR[field]=CHAR[field].map(([v,g])=>map[v]?[map[v][0],g]:[v,g])};
  swap("skinFinish",SKIN_TOK_F);swap("markings",SKIN_TOK_M);
  const addg=(f,v,g)=>{if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  [["a soft {c} glow", "Tinted finishes"], ["a pearlescent {c} sheen", "Tinted finishes"], ["a metallic {c} sheen", "Tinted finishes"], ["a {c} shimmer across the skin", "Tinted finishes"], ["fine {c} glitter dusting the skin", "Tinted finishes"], ["a frosted {c} sheen", "Tinted finishes"], ["a faint {c} glow beneath the skin", "Tinted finishes"]].forEach(([v,g])=>addg("skinFinish",v,g));
  [["{c} freckles across the nose and cheeks", "Tinted markings"], ["{c} stripes across the cheeks and arms", "Tinted markings"], ["{c} spots across the shoulders and arms", "Tinted markings"], ["{c} tribal markings across the cheeks", "Tinted markings"], ["{c} glitter flecks across the cheeks and shoulders", "Tinted markings"], ["a {c} patch around one eye", "Tinted markings"], ["{c} ring markings on the forehead and limbs", "Tinted markings"]].forEach(([v,g])=>addg("markings",v,g));
  /* creature markings I added earlier were filed under Freckles */
  CHAR.markings=CHAR.markings.map(([v,g])=>/\{c\}/.test(v)&&/(head cap|ring markings|chest and|paws and tail)/.test(v)?[v,"Creature markings"]:[v,g]);
  /* 2. old saved values and shipped presets follow the new scheme */
  const migrate=c=>{if(!c)return c;
    if(SKIN_TOK_F[c.skinFinish]){const m=SKIN_TOK_F[c.skinFinish];c.skinFinish=m[0];if(!c.finishColor)c.finishColor=m[1]}
    if(SKIN_TOK_M[c.markings]){const m=SKIN_TOK_M[c.markings];c.markings=m[0];if(!c.markingColor)c.markingColor=m[1]}
    return c};
  TEMPLATES.forEach(t=>migrate(t.c));
  Object.values(HERITAGE).forEach(p=>migrate(p.v));
  const FIX={"vaporblue": {"skinTone": "@primary", "markingColor": "@secondary"}, "umbreon": {"markingColor": "@secondary"}, "eevee": {}, "espeon": {}};TEMPLATES.forEach(t=>{if(FIX[t.id])Object.assign(t.c,FIX[t.id])});
  const _norm=normalize;normalize=function(st){const o=_norm(st);migrate(o.c);return o};
  /* 3. new fields */
  Object.assign(LABELS,{finishColor:"Finish tint",markingColor:"Marking color",skinTone:"Skin tone",undertone:"Undertone"});
  STEP_FIELDS.body=STEP_FIELDS.body.filter(i=>!["finishColor","markingColor"].includes(i));
  STEP_FIELDS.body.splice(STEP_FIELDS.body.indexOf("skinFinish")+1,0,"finishColor");
  STEP_FIELDS.body.splice(STEP_FIELDS.body.indexOf("markings")+1,0,"markingColor");
  HERITAGE_CLEAR.push("finishColor","markingColor");
})();
/* fill {c} with a color, or drop it cleanly when no color is set */
function skinTok(text,col){
  if(!text)return"";let t=text;
  if(col){t=t.replace(/\b(a|an) \{c\}/gi,()=>`${anA(col)} ${col}`).replace(/\{c\}/g,col)}
  else t=t.replace(/\{c\}-?\s?/g,"");
  return t.replace(/\s{2,}/g," ").replace(/\s+,/g,",").trim();
}
skinSentence=function(){
  const p=[],fc=g("finishColor"),mc=g("markingColor"),fin=g("skinFinish"),mk=g("markings");
  if(g("skinTone"))p.push(`${g("skinTone")} skin`);if(g("undertone"))p.push(`${g("undertone")} undertones`);
  if(fin){const hasTok=/\{c\}/.test(fin);p.push(skinTok(fin,fc)+(fc&&!hasTok?`, with ${anA(fc)} ${fc} tint`:""))}
  if(mk&&!/^no markings$/i.test(mk)){const hasTok=/\{c\}/.test(mk);p.push(skinTok(mk,mc)+(mc&&!hasTok?`, in ${mc}`:""))}
  if(CK.compact)return p.length?p.join(", ")+".":"";
  return p.length?`${cap(subjectPhrase())} has ${joinNatural(p)}.`:"";
};

/* ---- v54: options and starting point for "Creamsicle" ---- */
(function(){
  if(!COLORS["peach pink"])COLORS["peach pink"]="#F4A6A0";
  const addC=(f,v,g)=>{if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addC("impression","an extremely cute, adorable girl-next-door look with a soft, sweet, approachable appearance and delicate features","Sweet and soft");
  addC("faceShape","a cute, soft round-cheeked face with delicate features","Round");
  addC("eyeShape","large, wide, glossy, sparkling eyes with a cute shape","Large and expressive");
  addC("hairStyle","high half-up ponytail with a smooth crown, very long layers, soft waves and curled ends","Ponytails");
  addC("hairTexture","extremely thick, silky, glossy and very voluminous","Texture");
  addC("markings","dense natural {c} freckles across the nose and cheeks, continuing over the neck, shoulders, collarbones, chest, arms, stomach, back, hips, thighs and legs","Freckles");
  addC("skinFinish","smooth, luminous, highly detailed skin","Glow and sheen");
  addC("bustSize","enormous, very full, round breasts","Bust Size");
  addC("armShape","small, feminine hands","Natural and realistic");
  const addO=(f,v,t,fam)=>{if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;OUTFIT[f].push(it)}};
  addO("headwear","a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","CUS");
  addO("neckAccessory","layered delicate necklaces with a tiny {c2} gemstone pendant","CUS");
  const T={id:"creamsicle",name:"Creamsicle",blurb:"Powder blue, milky white and creamsicle orange. Odd-eyed, honey-gold freckles all over, a high half-up ponytail with two big satin bows and dainty jewelry.",
    pal:{"primary":"powder blue","secondary":"milky white","third":"creamsicle orange","accent":"pale gold","extra":"soft peach"},
    c:{"age":"woman","faceShape":"a cute, soft round-cheeked face with delicate features","browShape":"soft eyebrows","noseShape":"small nose","mouthShape":"soft, naturally {c} lips","mouthShapeColor":"peach pink","impression":"an extremely cute, adorable girl-next-door look with a soft, sweet, approachable appearance and delicate features",
      "eyeConfig":"heterochromatic","eyeOne":"sky blue","eyeTwo":"honey orange","eyeShape":"large, wide, glossy, sparkling eyes with a cute shape","irisDetail":"bright, intricately detailed irises","lashNatural":"long eyelashes",
      "hairStyle":"high half-up ponytail with a smooth crown, very long layers, soft waves and curled ends","hairLength":"hip-length","hairTexture":"extremely thick, silky, glossy and very voluminous","bangs":"cute wispy bangs with face-framing strands","hairMovement":"falls in long flowing waves with curled ends",
      "hairBase":"@primary","hairUnderlayer":"@secondary","hairInner":"@third","hairHighlights":"@accent","hairBlend":"a pale underlayer, bright inner hair, highlight strands and multicolored gradient streaks",
      "skinTone":"light beige","undertone":"warm","skinFinish":"smooth, luminous, highly detailed skin","markings":"dense natural {c} freckles across the nose and cheeks, continuing over the neck, shoulders, collarbones, chest, arms, stomach, back, hips, thighs and legs","markingColor":"honey gold",
      "bustSize":"enormous, very full, round breasts","bustShape":"full, naturally rounded shape","bustWeight":"heavy natural fullness","heightStature":"petite stature","shoulderShape":"narrow delicate shoulders","armShape":"small, feminine hands","waistShape":"tiny waist","stomachShape":"soft stomach","hipShape":"rounded hips","buttSize":"full, round butt","thighBuild":"thick, soft thighs","legShape":"shapely legs","bodySoftness":"extremely top-heavy hourglass figure",
      "blushStyle":"rosy cheeks with a blush across the bridge of the nose","lipFinish":"glossy lips","nailStyle":"short manicured glossy fingernails with heart and flower nail art","nailColor":"@primary+@secondary+@third+@accent"},
    outfit:{look:"sweet",items:{"headwear":["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","@primary+@secondary","","@third"],"earAccessory":["small pearl earrings","-"],"neckAccessory":["layered delicate necklaces with a tiny {c2} gemstone pendant","@accent","","@third"],"wristAccessory":["slim bracelets","@accent"],"ringAccessory":["thin rings","@accent"]},details:{}},
    out:{must:"a dainty jewelry theme and an extremely cute, adorable, sweet look with particular emphasis on highly detailed freckles, skin, hair and eyes"}};
  if(!TEMPLATES.some(t=>t.id===T.id)){const k=TEMPLATES.findIndex(t=>t.id==="bluecream");TEMPLATES.splice(k+1,0,T)}
  const g0=PRESET_GROUPS.start.find(g=>g.label==="Odd-eyed originals");if(g0&&!g0.keys.includes(T.id))g0.keys.push(T.id);
  Object.assign(LABELS,{mouthShapeColor:"Lip color"});
})();

/* ---- v55: options and starting point for "Obsidian" ---- */
(function(){
  if(!COLORS["pale pink"])COLORS["pale pink"]="#F2D3D8";
  const addC=(f,v,g)=>{if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addC("posture","standing posture","Posture");
  addC("bodySoftness","voluptuous, exaggerated hourglass figure with a soft feminine body, curvy silhouette and pronounced curves","");
  addC("waistShape","very narrow, defined hourglass waist with a pronounced waist-to-hip ratio","");
  addC("hipShape","wide, rounded hips with a broad pelvis and prominent hip curves","");
  addC("thighBuild","very thick, soft, full thighs, thick through the upper legs","");
  addC("legShape","long, shapely legs with thick upper legs and slender lower legs","");
  addC("stomachShape","soft stomach with a flat lower abdomen","");
  addC("bustSize","medium-large, full breasts","Bust Size");
  addC("bustShape","natural, soft, rounded shape","");
  addC("bustWeight","heavy natural fullness, with a small mole on the cleavage","Full figure (adult)");
  addC("shoulderShape","narrow shoulders","");
  addC("skinFinish","smooth, soft, highly detailed skin with subtle shading","Glow and sheen");
  addC("markings","full-body {c} freckles across the face, shoulders, collarbones, chest, arms, stomach, hips, thighs and legs","Freckles");
  addC("faceShape","heart-shaped face with soft cheeks","Heart and V-shaped");
  addC("lashNatural","long {c} eyelashes","Natural");
  addC("eyeshadowStyle","smoky eyeshadow blending {c}","Eyeshadow");
  addC("hairLength","mid-thigh length","By body landmark");
  addC("hairTexture","thick, straight, silky and glossy","Texture");
  addC("bangs","long sidelocks with loose face-framing strands","Stylized Bangs");
  addC("hairBlend","a smooth gradient from the base through the inner sections and highlights down to the underlayer, with mixed-color strands","");
  Object.assign(HAIR_LEN_RANK_EXTRA,{"mid-thigh length":6});
  Object.assign(LABELS,{eyeshadowStyleColor:"Eyeshadow colors",lashNaturalColor:"Eyelash color"});
  const T={id:"obsidian",name:"Obsidian",blurb:"White, silver, gray and black. Odd-eyed with silver-white and charcoal eyes, pale ivory skin with dark freckles all over, and mid-thigh straight hair fading from white to black.",
    pal:{"primary":"white","secondary":"silver","third":"gray","accent":"black","extra":"charcoal gray"},
    c:{"age":"young woman","faceShape":"heart-shaped face with soft cheeks","browShape":"delicate brows","noseShape":"small nose","mouthShape":"naturally full {c} lips","mouthShapeColor":"pale pink","faceMark":"a small beauty mark beneath one eye",
      "eyeConfig":"heterochromatic","eyeOne":"silvery white","eyeTwo":"@extra","eyeShape":"almond-shaped eyes","irisDetail":"bright, intricately detailed irises","lashNatural":"long {c} eyelashes","lashNaturalColor":"@accent",
      "hairStyle":"long straight hair","hairLength":"mid-thigh length","hairTexture":"thick, straight, silky and glossy","bangs":"long sidelocks with loose face-framing strands",
      "hairBase":"@primary","hairInner":"@secondary","hairHighlights":"@third","hairUnderlayer":"@accent","hairBlend":"a smooth gradient from the base through the inner sections and highlights down to the underlayer, with mixed-color strands",
      "skinTone":"pale ivory","skinFinish":"smooth, soft, highly detailed skin with subtle shading","markings":"full-body {c} freckles across the face, shoulders, collarbones, chest, arms, stomach, hips, thighs and legs","markingColor":"dark brown",
      "bustSize":"medium-large, full breasts","bustShape":"natural, soft, rounded shape","bustWeight":"heavy natural fullness, with a small mole on the cleavage","shoulderShape":"narrow shoulders","armShape":"slender arms and delicate hands","waistShape":"very narrow, defined hourglass waist with a pronounced waist-to-hip ratio","stomachShape":"soft stomach with a flat lower abdomen","hipShape":"wide, rounded hips with a broad pelvis and prominent hip curves","thighBuild":"very thick, soft, full thighs, thick through the upper legs","legShape":"long, shapely legs with thick upper legs and slender lower legs","bodySoftness":"voluptuous, exaggerated hourglass figure with a soft feminine body, curvy silhouette and pronounced curves","posture":"standing posture",
      "eyeshadowStyle":"smoky eyeshadow blending {c}","eyeshadowStyleColor":"@secondary+@extra","lipFinish":"glossy lips"},
    outfit:{look:"",items:{},details:{}},
    out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}};
  if(!TEMPLATES.some(t=>t.id===T.id)){const k=TEMPLATES.findIndex(t=>t.id==="creamsicle");TEMPLATES.splice(k+1,0,T)}
  const g0=PRESET_GROUPS.start.find(g=>g.label==="Odd-eyed originals");if(g0&&!g0.keys.includes(T.id))g0.keys.push(T.id);
})();
/* ---- v56: body presets refined, new body options and new presets ---- */
(function(){
  const addC=(f,v,g)=>{if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const add=(f,g,list)=>list.forEach(v=>addC(f,v,g));
  /* --- new options (adult-body wording is matched by the girl-label rules, so it stays hidden there) --- */
  add("bustShape","Natural and realistic",["small, softly rounded shape","firm, athletic shape","soft, gently lifted shape"]);
  add("bustShape","Full figure (adult)",["full, soft, naturally sloping shape"]);
  add("bustWeight","Fullness",["firm natural fullness"]);
  add("bustWeight","Full figure (adult)",["soft, generous fullness"]);
  add("heightStature","Height",["short stature","short, sturdy stature","above-average height","tall, broad-shouldered stature"]);
  add("shoulderShape","Shoulders",["broad, strong shoulders","square, defined shoulders","softly toned shoulders","wide, softly rounded shoulders","slim, level shoulders"]);
  add("torsoShape","Natural and realistic",["long, lean torso","short torso with long legs","softly rounded torso","athletic torso with a defined back","narrow ribcage with a long, slim torso"]);
  add("armShape","Natural and realistic",["long, graceful arms and elegant hands","toned arms with defined shoulders","slim arms with delicate wrists","soft, rounded upper arms","strong forearms and capable hands"]);
  add("waistShape","Waist",["straight, athletic waist","soft, rounded waist","long, slim waist"]);
  add("waistShape","Full figure (adult)",["softly cinched waist"]);
  add("stomachShape","Stomach",["defined abs","firm, toned stomach","softly rounded lower belly","smooth stomach with a gentle curve"]);
  add("hipShape","Hips",["narrow, straight hips","lean, athletic hips","softly flared hips"]);
  add("hipShape","Full figure (adult)",["wide, flared hips with soft fullness","full, soft, pear-shaped hips","high, full, rounded hips"]);
  add("buttSize","Natural and realistic",["small, firm butt","firm, round butt"]);
  add("buttSize","Full figure (adult)",["full, firm, lifted butt","soft, full, rounded butt","large, firm, athletic butt"]);
  add("thighBuild","Thighs",["lean, toned thighs","long, lean thighs","strong, muscular thighs"]);
  add("thighBuild","Full figure (adult)",["thick, firm, athletic thighs","full, soft thighs tapering to the knees"]);
  add("legShape","Legs",["long, lean legs","strong, muscular legs","long legs with defined calves","shapely legs with slim ankles"]);
  add("legShape","Full figure (adult)",["soft, full legs tapering to slim ankles","thick, strong legs"]);
  add("bodySoftness","Overall Build",["lean, graceful build","lithe, dancer's build","lean, broad-shouldered build","sturdy, compact build","soft, rounded build with a gentle midsection","slim, straight silhouette"]);
  add("bodySoftness","Full figure (adult)",["soft, curvy pear-shaped figure with fuller hips and thighs","strong, curvy athletic figure with defined muscle and full curves","slim, top-heavy figure with a full bust and a soft midsection","mature, voluptuous, full-figured silhouette with soft, generous curves","tall, long-limbed hourglass figure with a small waist and full curves"]);
  add("posture","Posture",["strong, squared posture","poised dancer's posture","relaxed, weight-shifted stance","tall, proud posture"]);

  /* --- refinements to the existing presets (every proportion field now set) --- */
  const U={
    petiteSoft:{bustShape:"gently flat shape",bustWeight:"light delicate fullness"},
    slender:{bustShape:"gently flat shape",bustWeight:"light delicate fullness"},
    tallSlender:{bustShape:"natural breast shape",bustWeight:"light delicate fullness",torsoShape:"narrow ribcage with a long, slim torso"},
    average:{bustShape:"natural breast shape",bustWeight:"moderate fullness"},
    athletic:{bustShape:"firm, athletic shape",bustWeight:"firm natural fullness",torsoShape:"athletic torso with a defined back",armShape:"toned arms with defined shoulders",bodySoftness:"toned build"},
    curvy:{stomachShape:"soft stomach with a flat lower abdomen"},
    thick:{bustWeight:"soft, generous fullness",torsoShape:"softly rounded torso",armShape:"soft, rounded upper arms"},
    full:{torsoShape:"softly rounded torso",armShape:"soft, rounded upper arms"},
    bottomHeavy:{bustWeight:"soft natural fullness"},
    statuesque:{bustWeight:"moderate fullness"}
  };
  Object.entries(U).forEach(([k,v])=>Object.assign(BODY_PRESETS[k].v,v));

  /* --- new presets --- */
  const N={
    willowy:{label:"Willowy",v:{bustSize:"small breasts",bustShape:"gently flat shape",bustWeight:"light delicate fullness",heightStature:"very tall elegant stature",shoulderShape:"elegant straight shoulders",torsoShape:"long, lean torso",armShape:"long, graceful arms and elegant hands",waistShape:"long, slim waist",stomachShape:"flat, smooth stomach",hipShape:"narrow hips",buttSize:"small round butt",thighBuild:"long, lean thighs",legShape:"long, lean legs",bodySoftness:"lean, graceful build",posture:"tall, proud posture"}},
    dancer:{label:"Dancer's build",v:{bustSize:"small-to-medium breasts",bustShape:"perky rounded shape",bustWeight:"light delicate fullness",heightStature:"slightly above-average height",shoulderShape:"slim, level shoulders",torsoShape:"narrow ribcage with a long, slim torso",armShape:"long, graceful arms and elegant hands",waistShape:"defined waist",stomachShape:"firm, toned stomach",hipShape:"lean, athletic hips",buttSize:"firm, round butt",thighBuild:"lean, toned thighs",legShape:"long legs with defined calves",bodySoftness:"lithe, dancer's build",posture:"poised dancer's posture"}},
    softBuild:{label:"Soft and relaxed",v:{bustSize:"medium breasts",bustShape:"natural sloping shape",bustWeight:"soft natural fullness",heightStature:"average height",shoulderShape:"soft rounded shoulders",torsoShape:"softly rounded torso",armShape:"soft, rounded upper arms",waistShape:"soft, rounded waist",stomachShape:"gently rounded belly",hipShape:"softly rounded hips",buttSize:"natural butt",thighBuild:"softly rounded thighs",legShape:"proportional legs",bodySoftness:"soft, rounded build with a gentle midsection",posture:"relaxed posture"}},
    rectangle:{label:"Straight and slim",v:{bustSize:"small-to-medium breasts",bustShape:"natural breast shape",bustWeight:"light delicate fullness",heightStature:"average height",shoulderShape:"balanced shoulders",torsoShape:"slim upper torso",armShape:"slender arms",waistShape:"straight natural waist",stomachShape:"flat stomach",hipShape:"narrow, straight hips",buttSize:"natural butt",thighBuild:"slender thighs",legShape:"long legs",bodySoftness:"slim, straight silhouette",posture:"standing posture"}},
    swimmer:{label:"Swimmer's build",v:{bustSize:"small-to-medium breasts",bustShape:"firm, athletic shape",bustWeight:"firm natural fullness",heightStature:"tall stature",shoulderShape:"broad, strong shoulders",torsoShape:"athletic torso with a defined back",armShape:"toned arms with defined shoulders",waistShape:"straight, athletic waist",stomachShape:"firm, toned stomach",hipShape:"narrow, straight hips",buttSize:"firm, round butt",thighBuild:"lean, toned thighs",legShape:"long, lean legs",bodySoftness:"lean, broad-shouldered build",posture:"strong, squared posture"}},
    strong:{label:"Strong and muscular",v:{bustSize:"small-to-medium breasts",bustShape:"firm, athletic shape",bustWeight:"firm natural fullness",heightStature:"above-average height",shoulderShape:"square, defined shoulders",torsoShape:"broad ribcage with a strong back",armShape:"strong, muscular arms",waistShape:"defined waist",stomachShape:"defined abs",hipShape:"balanced hips",buttSize:"toned butt",thighBuild:"strong, muscular thighs",legShape:"strong, muscular legs",bodySoftness:"strong, athletic build with defined muscle",posture:"strong, squared posture"}},
    compact:{label:"Compact and sturdy",v:{bustSize:"small-to-medium breasts",bustShape:"natural breast shape",bustWeight:"soft natural fullness",heightStature:"short, sturdy stature",shoulderShape:"wide, softly rounded shoulders",torsoShape:"compact torso with a softly contoured ribcage",armShape:"strong forearms and capable hands",waistShape:"soft, rounded waist",stomachShape:"firm, toned stomach",hipShape:"lean, athletic hips",buttSize:"firm, round butt",thighBuild:"strong, muscular thighs",legShape:"short shapely legs",bodySoftness:"sturdy, compact build",posture:"strong, squared posture"}},

    pear:{label:"Pear-shaped",adultOnly:true,v:{bustSize:"medium breasts",bustShape:"natural sloping shape",bustWeight:"soft natural fullness",heightStature:"average height",shoulderShape:"narrow, gently sloping shoulders",torsoShape:"slim upper torso",armShape:"softly rounded arms",waistShape:"small, clearly defined waist",stomachShape:"mostly flat but naturally soft stomach",hipShape:"full, soft, pear-shaped hips",buttSize:"soft, full, rounded butt",thighBuild:"full, soft thighs tapering to the knees",legShape:"soft, full legs tapering to slim ankles",bodySoftness:"soft, curvy pear-shaped figure with fuller hips and thighs",posture:"relaxed posture"}},
    fullMidsection:{label:"Full bust, soft midsection",adultOnly:true,v:{bustSize:"large breasts",bustShape:"full, soft, naturally sloping shape",bustWeight:"soft, generous fullness",heightStature:"average height",shoulderShape:"soft rounded shoulders",torsoShape:"softly rounded torso",armShape:"soft, rounded upper arms",waistShape:"softly defined waist with a full midsection",stomachShape:"soft, full belly",hipShape:"wide hips",buttSize:"large butt",thighBuild:"plush thighs",legShape:"soft full legs",bodySoftness:"slim, top-heavy figure with a full bust and a soft midsection",posture:"relaxed posture"}},
    matureFull:{label:"Mature and full-figured",adultOnly:true,v:{bustSize:"large breasts",bustShape:"natural sloping shape",bustWeight:"heavy natural fullness",heightStature:"average height",shoulderShape:"soft rounded shoulders",torsoShape:"softly contoured, non-muscular torso",armShape:"full, soft arms",waistShape:"softly curving waist",stomachShape:"soft stomach",hipShape:"wide graceful hips",buttSize:"large, rounded butt",thighBuild:"thick, soft thighs",legShape:"soft full legs",bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"elegant posture"}},
    softPlus:{label:"Plus-size and soft",adultOnly:true,v:{bustSize:"very large breasts",bustShape:"full, soft, naturally sloping shape",bustWeight:"heavy natural fullness",heightStature:"average height",shoulderShape:"wide, softly rounded shoulders",torsoShape:"softly rounded torso",armShape:"full, soft arms",waistShape:"softly defined waist with a full midsection",stomachShape:"soft, full belly",hipShape:"thick, full, round hips",buttSize:"very large butt",thighBuild:"very thick, soft, full thighs, thick through the upper legs",legShape:"soft full legs",bodySoftness:"full-figured plus-size build with soft, generous curves",posture:"relaxed posture"}},
    petiteCurved:{label:"Petite, softly curved",adultOnly:true,v:{bustSize:"medium-large, full breasts",bustShape:"perky, full, round shape",bustWeight:"moderate fullness",heightStature:"petite stature",shoulderShape:"narrow, gently rounded shoulders",torsoShape:"compact torso",armShape:"small, feminine hands",waistShape:"clearly defined narrow waist",stomachShape:"flat, smooth stomach",hipShape:"hips that widen gently from a narrow waist",buttSize:"round butt",thighBuild:"proportionately fuller thighs",legShape:"slender legs",bodySoftness:"petite, slim build with soft feminine curves and a naturally slender hourglass shape",posture:"soft poised posture"}},
    longLegged:{label:"Long-legged hourglass",adultOnly:true,v:{bustSize:"large breasts",bustShape:"teardrop shape",bustWeight:"moderate fullness",heightStature:"very tall elegant stature",shoulderShape:"elegant straight shoulders",torsoShape:"short torso with long legs",armShape:"long, slender arms",waistShape:"small, clearly defined waist",stomachShape:"flat, smooth stomach",hipShape:"hips that widen gently from a narrow waist",buttSize:"round butt",thighBuild:"long, full, shapely thighs",legShape:"long legs tapering into slender lower legs",bodySoftness:"tall, long-limbed hourglass figure with a small waist and full curves",posture:"tall, proud posture"}},
    pinup:{label:"Classic pin-up",adultOnly:true,v:{bustSize:"large breasts",bustShape:"perky, full, round shape",bustWeight:"moderate fullness",heightStature:"average height",shoulderShape:"graceful shoulders",torsoShape:"narrow ribcage",armShape:"softly rounded arms",waistShape:"cinched tiny waist",stomachShape:"flat stomach",hipShape:"smooth hourglass hips",buttSize:"full, rounded butt with noticeable projection",thighBuild:"smooth shapely thighs",legShape:"long shapely legs",bodySoftness:"slim, feminine figure with soft, pronounced curves",posture:"hip-popped sultry stance"}},
    hourglassWide:{label:"Wide-hipped hourglass",adultOnly:true,v:{bustSize:"medium-large, full breasts",bustShape:"natural, soft, rounded shape",bustWeight:"heavy natural fullness",heightStature:"average height",shoulderShape:"narrow shoulders",torsoShape:"slim upper torso",armShape:"slender arms and delicate hands",waistShape:"very narrow, defined hourglass waist with a pronounced waist-to-hip ratio",stomachShape:"soft stomach with a flat lower abdomen",hipShape:"wide, rounded hips with a broad pelvis and prominent hip curves",buttSize:"full, rounded butt with noticeable projection",thighBuild:"very thick, soft, full thighs, thick through the upper legs",legShape:"long, shapely legs with thick upper legs and slender lower legs",bodySoftness:"voluptuous, exaggerated hourglass figure with a soft feminine body, curvy silhouette and pronounced curves",posture:"standing posture"}},
    petiteBusty:{label:"Petite and very busty",adultOnly:true,v:{bustSize:"enormous, very full, round breasts",bustShape:"perky, full, round shape",bustWeight:"heavy natural fullness",heightStature:"petite stature",shoulderShape:"narrow delicate shoulders",torsoShape:"compact torso",armShape:"small, feminine hands",waistShape:"tiny waist",stomachShape:"soft stomach",hipShape:"rounded hips",buttSize:"full, round butt",thighBuild:"thick, soft thighs",legShape:"shapely legs",bodySoftness:"extremely top-heavy hourglass figure",posture:"soft poised posture"}},
    tallTopHeavy:{label:"Tall and top-heavy",adultOnly:true,v:{bustSize:"very large breasts",bustShape:"full, naturally rounded shape",bustWeight:"heavy natural fullness",heightStature:"tall graceful stature",shoulderShape:"narrow delicate shoulders",torsoShape:"elongated, relatively slender torso",armShape:"long, slender arms",waistShape:"tiny waist",stomachShape:"soft stomach",hipShape:"rounded hips",buttSize:"full, round butt",thighBuild:"thick, soft thighs",legShape:"long shapely legs",bodySoftness:"extremely top-heavy hourglass figure",posture:"elegant posture"}},
    strongCurvy:{label:"Strong and curvy",adultOnly:true,v:{bustSize:"large breasts",bustShape:"full, naturally rounded shape",bustWeight:"firm natural fullness",heightStature:"tall stature",shoulderShape:"slightly broad balanced shoulders",torsoShape:"athletic torso with a defined back",armShape:"toned arms with defined shoulders",waistShape:"defined waist",stomachShape:"toned stomach with light definition",hipShape:"wide, curvy hips",buttSize:"full, firm, lifted butt",thighBuild:"thick, firm, athletic thighs",legShape:"toned legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",posture:"strong, squared posture"}},
    powerful:{label:"Tall and powerful",adultOnly:true,v:{bustSize:"very large breasts",bustShape:"full, naturally rounded shape",bustWeight:"moderate fullness",heightStature:"tall, statuesque stature",shoulderShape:"broad, strong shoulders",torsoShape:"broad ribcage with a strong back",armShape:"strong, muscular arms",waistShape:"defined waist",stomachShape:"defined abs",hipShape:"wide hips",buttSize:"large, firm, athletic butt",thighBuild:"very thick thighs",legShape:"strong, muscular legs",bodySoftness:"strong, athletic build with defined muscle",posture:"tall, proud posture"}}
  };
  Object.entries(N).forEach(([k,p])=>{BODY_PRESETS[k]=p});

  /* --- a short description under every preset --- */
  const BL={
    petiteFlat:"Very short and slight, with a flat chest.",
    petiteSoft:"Petite and softly built, with a defined small waist.",
    slender:"Slim and graceful, with long, light lines.",
    tallSlender:"Tall and slim, with long legs and a long torso.",
    willowy:"Very tall, lean and long-limbed.",
    dancer:"Lithe and toned, with long limbs and a poised carriage.",
    average:"Balanced, natural proportions.",
    softBuild:"Soft and rounded, with a gentle midsection.",
    rectangle:"Straight lines from shoulder to hip.",
    athletic:"Toned and balanced, with light definition.",
    swimmer:"Broad shoulders, a lean torso and narrow hips.",
    strong:"Visibly muscular, with defined abs and a strong back.",
    compact:"Short and sturdy, with strong arms and a solid stance.",
    curvy:"Balanced hourglass curves, soft and rounded.",
    thick:"Soft and thick, with wide hips and full thighs.",
    pear:"Slim top, with fuller hips, butt and thighs.",
    fullMidsection:"Full bust and a soft, full midsection.",
    matureFull:"Mature, full-figured and softly curved.",
    softPlus:"Plus-size, soft and generous all over.",
    full:"Large bust, pronounced waist and plush curves.",
    petiteHourglass:"Petite frame with a full hourglass shape.",
    petiteCurved:"Petite and slim, with soft curves and a slender hourglass.",
    delicateTop:"Slim and delicate, with a full bust.",
    statuesque:"Tall hourglass with long limbs.",
    longLegged:"Very tall, with a short torso and very long legs.",
    pinup:"Cinched waist, round bust and full hips.",
    hourglassWide:"Very narrow waist over broad hips and thick thighs.",
    bottomHeavy:"Very wide hips, a full butt and thick thighs.",
    petiteVoluptuous:"Petite and exceptionally voluptuous.",
    petiteBusty:"Petite, with an enormous bust and a tiny waist.",
    tallTopHeavy:"Tall and slim-waisted, with a very large bust.",
    strongCurvy:"Muscle tone with full, strong curves.",
    powerful:"Tall and powerful, with broad shoulders and heavy thighs.",
    hourglassX:"An exaggerated hourglass at every point.",
    bombshell:"Enormous bust, cinched waist and very wide hips."
  };
  Object.entries(BL).forEach(([k,b])=>{if(BODY_PRESETS[k])BODY_PRESETS[k].blurb=b});

  /* --- groups --- */
  const G=PRESET_GROUPS.body;G.length=0;
  G.push(
    {label:"Petite and slim",keys:["petiteFlat","petiteSoft","slender","tallSlender","willowy","dancer"]},
    {label:"Everyday",keys:["average","softBuild","rectangle","athletic","swimmer","strong","compact"]},
    {label:"Soft curves (adult only)",keys:["curvy","thick","pear","fullMidsection","matureFull","softPlus","full"]},
    {label:"Hourglass (adult only)",keys:["petiteHourglass","petiteCurved","delicateTop","statuesque","longLegged","pinup","hourglassWide"]},
    {label:"Top-heavy and bottom-heavy (adult only)",keys:["bottomHeavy","petiteVoluptuous","petiteBusty","tallTopHeavy"]},
    {label:"Strong and tall (adult only)",keys:["strongCurvy","powerful"]},
    {label:"Exaggerated (adult only)",keys:["hourglassX","bombshell"]}
  );
})();
/* skin tone and undertone: pick a palette slot, a natural tone, or any color */
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
skinSuggestBox=function(){
  const sp=(S.c.subjectType||"").trim(),s=sp&&skinSuggestions(sp);
  const slots=SLOTS.filter(([k])=>S.pal[k]);
  if(!s&&!slots.length)return null;
  const box=h("div",{class:"suggbox"},h("h4",{text:s?`Suggested for ${sp}`:"Quick picks"}),h("p",{class:"muted small",text:"Tap one to use it, tap again to clear. Palette colors stay linked, so changing the palette changes the skin."}));
  if(slots.length){
    const wrap=h("div",{class:"chips"});
    slots.forEach(([k,l])=>{const on=S.c.skinTone==="@"+k;wrap.append(h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:()=>setC("skinTone",on?"":"@"+k)},h("i",{class:"sw",style:`background:${skinHex(S.pal[k])||"#bbb"}`}),`${l}: ${S.pal[k]}`))});
    box.append(h("div",{class:"sgrow"},h("b",{text:"Skin from palette"}),wrap));
  }
  if(s){
    [["tone","skinTone","Suggested tones"],["under","undertone","Suggested undertones"],["finish","skinFinish","Suggested finishes"],["marks","markings","Suggested markings"]].forEach(([k,f,l])=>{
      if(!s[k]||!s[k].length)return;const wrap=h("div",{class:"chips"});
      s[k].forEach(v=>{const m=SKIN_TOK_F[v]||SKIN_TOK_M[v],val=m?m[0]:v,cf=f==="skinFinish"?"finishColor":f==="markings"?"markingColor":null;const on=S.c[f]===val;const hx=f==="skinTone"?skinHex(v):null;
        wrap.append(h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:()=>mut(()=>{if(on){delete S.c[f];if(cf&&m)delete S.c[cf]}else{S.c[f]=val;if(cf&&m)S.c[cf]=m[1]}},f)},hx?h("i",{class:"sw",style:`background:${hx}`}):null,v))});
      box.append(h("div",{class:"sgrow"},h("b",{text:l}),wrap))});
  }
  return box;
};
/* ---- v44: "Serpent robes" starting point and her outfits ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const NEWC={"faceShape": ["long oval face with a high forehead and defined cheekbones"], "expression": ["scowling, irritated expression"], "browShape": ["furrowed, sharply angled brows"], "eyeShape": ["sharp, slightly hooded eyes"], "impression": ["a haughty, imperious presence"], "hairStyle": ["swept-back hair"], "bangs": ["open forehead with long face-framing side pieces"]};
  Object.entries(NEWC).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  const NEWO={"outerwear": [["long black hooded robe with green lining", "CU", "costume,gothic,edgy", ""], ["black hooded robe with green lining, worn open off the shoulders", "CU", "costume,gothic,edgy", ""]], "neckAccessory": [["green and silver striped necktie", "CU", "costume,casual,edgy", ""]], "top": [["white collared shirt, partly unbuttoned", "CU", "casual,edgy,costume", ""], ["triangle bikini top with a crest emblem", "L", "resort,boudoir,costume", ""], ["black micro string bikini top", "L", "boudoir,resort", ""]], "bottom": [["green side-tie bikini bottoms with white stripes", "L", "resort,boudoir,costume", ""], ["black micro string bikini bottoms", "L", "boudoir,resort", ""]], "waistAccessory": [["bib apron with a wavy line emblem", "CU", "casual,costume", ""]], "legwear": [["thigh-high stockings with ripped patches", "CU", "edgy,gothic,casual", ""]], "tagCharm": [["small serpent crest badge", "CU", "costume,gothic,edgy", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  TEMPLATES.push({"id": "serpentrobes", "name": "Serpent robes", "blurb": "Long swept-back blonde hair with an open forehead, sharp green eyes with ringed irises, a permanent scowl, large black hoops and black hooded robes with green lining over a green-striped tie.", "pal": {"primary": "golden blonde", "secondary": "black", "third": "emerald green", "accent": "heather gray", "extra": "silver"}, "c": {"age": "woman", "faceShape": "long oval face with a high forehead and defined cheekbones", "expression": "scowling, irritated expression", "browShape": "furrowed, sharply angled brows", "noseShape": "small straight nose", "mouthShape": "soft full lips", "impression": "a haughty, imperious presence", "eyeConfig": "matching", "eyeShape": "sharp, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "eyeOne": "green", "eyeTwo": "green", "hairStyle": "swept-back hair", "hairLength": "waist-length", "hairTexture": "silky straight", "bangs": "open forehead with long face-framing side pieces", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "skinTone": "fair", "undertone": "neutral", "skinFinish": "satin-smooth skin", "markings": "no markings", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "moderate fullness", "heightStature": "average height", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, shapely thighs", "legShape": "shapely legs", "bodySoftness": "curvy build", "posture": "calm composed posture", "makeupStyle": "soft glam makeup", "eyelinerStyle": "sharp winged eyeliner", "lashStyle": "long defined lashes", "lipFinish": "soft satin lips", "nailStyle": "carefully manicured fingernails", "blushStyle": "soft cheek blush"}, "outfit": {"look": "costume", "items": {"top": ["sweater vest over a collared shirt", "@accent"], "bottom": ["pleated mini skirt", "@secondary"], "outerwear": ["long black hooded robe with green lining", "@secondary"], "neckAccessory": ["green and silver striped necktie", "@third"], "legwear": ["thigh-high stockings", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"], "tagCharm": ["small serpent crest badge", "@third"]}, "details": {}}});
  PRESET_GROUPS.start.find(g=>g.label==="Stylish").keys.push("serpentrobes");
  OUTFIT_PRESETS.push(...[{"id": "ref_pp_robe", "name": "Robe, vest and pleated skirt", "blurb": "Gray sweater vest over a collared shirt, striped green tie, black pleated mini skirt, hooded robe with green lining, thigh-highs and large hoops. Adult only.", "look": "costume", "season": "w", "adultOnly": true, "items": {"top": ["sweater vest over a collared shirt", "@accent"], "bottom": ["pleated mini skirt", "@secondary"], "outerwear": ["long black hooded robe with green lining", "@secondary"], "neckAccessory": ["green and silver striped necktie", "@third"], "legwear": ["thigh-high stockings", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"], "tagCharm": ["small serpent crest badge", "@third"]}, "details": {}}, {"id": "ref_pp_open", "name": "Open shirt and lace bra", "blurb": "Partly unbuttoned white shirt over a black lace bra, loosened striped tie, pleated skirt, a gray sweater tied at the waist and a robe slipping off the shoulders. Adult only.", "look": "edgy", "season": "", "adultOnly": true, "items": {"top": ["white collared shirt, partly unbuttoned", "white"], "bra": ["lace bra", "@secondary"], "bottom": ["pleated mini skirt", "@secondary"], "outerwear": ["black hooded robe with green lining, worn open off the shoulders", "@secondary"], "neckAccessory": ["green and silver striped necktie", "@third"], "waistAccessory": ["oversized sweater tied at the waist", "@accent"], "legwear": ["thigh-high stockings", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"]}, "details": {}}, {"id": "ref_pp_apron", "name": "Apron over a gray knit", "blurb": "Oversized gray sweater under a green bib apron with a wavy emblem, lace choker and large hoops. Adult only.", "look": "casual", "season": "", "adultOnly": true, "items": {"top": ["oversized cotton sweater", "@accent"], "waistAccessory": ["bib apron with a wavy line emblem", "@third"], "neckAccessory": ["lace choker", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"]}, "details": {}}, {"id": "ref_pp_bikini", "name": "Crest bikini under a robe", "blurb": "Green triangle bikini with a crest emblem and white-striped side-tie bottoms, thigh-highs and an open hooded robe. Adult only.", "look": "resort", "season": "s", "adultOnly": true, "items": {"top": ["triangle bikini top with a crest emblem", "@third"], "bottom": ["green side-tie bikini bottoms with white stripes", "-"], "outerwear": ["black hooded robe with green lining, worn open off the shoulders", "@secondary"], "legwear": ["thigh-high stockings", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"]}, "details": {}}, {"id": "ref_pp_micro", "name": "Micro string set under a robe", "blurb": "Black micro string bikini under an open hooded robe, with large hoops and a thin chain. Adult only.", "look": "boudoir", "season": "", "adultOnly": true, "items": {"top": ["black micro string bikini top", "@secondary"], "bottom": ["black micro string bikini bottoms", "@secondary"], "outerwear": ["black hooded robe with green lining, worn open off the shoulders", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"]}, "details": {}}, {"id": "ref_pp_lace", "name": "Lace lingerie and robe", "blurb": "Black lace balconette bra and string thong, thigh-highs, lace choker, a satchel at the hip and a robe slipping off the shoulders. Adult only.", "look": "boudoir", "season": "", "adultOnly": true, "items": {"bra": ["lace balconette bra", "@secondary"], "panties": ["string thong", "@secondary"], "legwear": ["thigh-high stockings", "@secondary"], "neckAccessory": ["lace choker", "@secondary"], "hipAccessory": ["small leather satchel at the hip", "@secondary"], "outerwear": ["black hooded robe with green lining, worn open off the shoulders", "@secondary"], "earAccessory": ["large hoop earrings", "@secondary"]}, "details": {}}]);
  PRESET_GROUPS.outfit.push({label:"Serpent robes outfits",keys:["ref_pp_robe", "ref_pp_open", "ref_pp_apron", "ref_pp_bikini", "ref_pp_micro", "ref_pp_lace"]});
})();
/* ---- v45: "Marisol" starting point ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  Object.entries({"impression": ["effortless, natural beauty with Latina heritage and a warm girl-next-door charm"]}).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  TEMPLATES.push({"id": "marisol", "name": "Marisol", "blurb": "A realistic girl-next-door Latina: golden-tan skin with a light dusting of freckles, dimples, warm brown eyes, thick dark waves with soft curtain bangs and an easy, natural style.", "pal": {"primary": "dark brown", "secondary": "white", "third": "terracotta", "accent": "gold", "extra": "sage green"}, "c": {"age": "young woman", "faceShape": "oval face with soft cheeks", "expression": "genuine, crinkle-eyed smile", "browShape": "full, softly arched dark brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "full natural lips", "impression": "effortless, natural beauty with Latina heritage and a warm girl-next-door charm", "faceMark": "soft dimples in both cheeks", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with defined lids", "pupilStyle": "round pupils", "irisDetail": "golden flecks near the pupil", "lashNatural": "long, thick dark eyelashes", "eyeOne": "warm medium brown", "eyeTwo": "warm medium brown", "hairStyle": "long wavy hair", "hairLength": "mid-back length", "hairTexture": "thick, glossy waves", "bangs": "soft curtain bangs", "hairMovement": "falls in long flowing waves with curled ends", "hairBase": "@primary", "hairHighlights": "honey brown", "hairBlend": "subtle natural highlights", "skinTone": "golden tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "markings": "a light dusting of freckles across the nose", "bustSize": "medium breasts", "bustShape": "natural breast shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "torsoShape": "slim upper torso", "armShape": "softly toned arms", "shoulderShape": "gently sloped shoulders", "waistShape": "softly tapered waist", "stomachShape": "mostly flat but naturally soft stomach", "hipShape": "softly rounded hips", "buttSize": "round butt", "thighBuild": "softly rounded thighs", "legShape": "smooth proportionate legs", "bodySoftness": "soft natural build", "posture": "relaxed posture", "makeupStyle": "natural, barely-there makeup", "eyelinerStyle": "no eyeliner", "eyeshadowStyle": "soft neutral eyeshadow", "lashStyle": "natural lashes", "blushStyle": "soft sun-kissed blush", "lipFinish": "tinted lip balm", "faceAccents": "soft cheekbone highlight", "makeupColor": "@third", "nailStyle": "short rounded fingernails", "nailColor": "nude pink"}, "outfit": {"look": "casual", "items": {"top": ["fitted tee", "@secondary"], "bottom": ["high-waisted jeans", "-"], "outerwear": ["linen shirt worn open", "@extra"], "belt": ["braided leather belt", "@primary"], "neckAccessory": ["delicate chain necklace", "@accent"], "wristAccessory": ["stacked slim bracelets", "@accent"], "ringAccessory": ["stacked thin rings", "@accent"], "earAccessory": ["small gold hoop earrings", "-"], "headwear": ["simple hair clip", "@third"], "hipAccessory": ["woven market tote", "-"]}, "details": {"detailOne": "contrast stitching", "detailTwo": "tucked-in front hem", "detailThree": "washed denim look"}}});
  PRESET_GROUPS.start.find(g=>g.label==="Everyday").keys.push("marisol");
})();
/* ---- v46: five new starting points ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  Object.entries({"bodySoftness": ["strong, athletic build with defined muscle", "full-figured plus-size build with soft, generous curves"], "armShape": ["strong, muscular arms", "full, soft arms"], "stomachShape": ["soft, full belly"], "torsoShape": ["broad ribcage with a strong back"], "waistShape": ["softly defined waist with a full midsection"], "impression": ["a warm, welcoming presence with a radiant smile", "a graceful, mature elegance with warmth and quiet confidence"], "expression": ["determined, steady gaze"], "hairBlend": ["silver streaks woven through the dark hair"], "markings": ["faint laugh lines at the corners of the eyes and mouth"]}).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  const NEWO={"top": [["seashell bandeau top", "US", "resort,costume", ""], ["polished steel breastplate over a padded tunic", "CU", "costume", ""], ["gold-trimmed crimson wrap bodice with a high collar", "CU", "costume,glam", ""]], "bottom": [["layered leather battle skirt with steel plates", "CU", "costume", ""], ["flowing silk harem pants", "CU", "costume,glam", ""]], "outerwear": [["long white cloak with a fur-trimmed collar", "CU", "costume", ""]], "neckAccessory": [["silver torc necklace", "CU", "costume", ""]], "wristAccessory": [["gold armlets", "CU", "costume,glam", ""]], "headwear": [["pearl-and-coral hair crown", "CU", "costume,resort", ""]], "detailOne": [["engraved rune patterns", "CU", "costume", ""], ["embroidered scale pattern", "CU", "costume,glam", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  TEMPLATES.push(...[{"id": "tidecaller", "name": "Tidecaller", "blurb": "A mermaid with deep-teal waves, a pearlescent sheen, fin-like ears, scales over the shoulders and a seashell and pearl look.", "pal": {"primary": "deep teal", "secondary": "pearl white", "third": "coral", "accent": "gold", "extra": "aqua mint"}, "c": {"age": "woman", "subjectType": "mermaid", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "expression": "serene expression", "browShape": "long tapered brows", "noseShape": "small straight nose", "mouthShape": "soft full lips", "impression": "a cool, aloof otherworldly beauty", "eyeConfig": "matching", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "gradient iris coloring", "lashNatural": "long, feather-like lashes", "eyeOne": "teal", "eyeTwo": "teal", "hairStyle": "long wavy hair", "hairLength": "hip-length", "hairTexture": "loose waves", "bangs": "long face-framing pieces", "hairMovement": "falls in long flowing waves with curled ends", "hairBase": "@primary", "hairHighlights": "@extra", "earStyle": "fin-like ears", "tailStyle": "long finned mermaid tail", "auraStyle": "watery aura", "fantasyAccentColor": "@extra", "skinTone": "pale ivory", "undertone": "cool", "skinFinish": "a pearlescent {c} sheen", "finishColor": "@secondary", "markings": "mermaid scales over the shoulders", "markingColor": "@primary", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "tall graceful stature", "torsoShape": "elongated, relatively slender torso", "armShape": "long, slender arms", "shoulderShape": "narrow, gently sloping shoulders", "waistShape": "softly tapered waist", "stomachShape": "flat, smooth stomach", "bodySoftness": "slender soft build", "posture": "graceful upright posture", "makeupStyle": "mermaidcore makeup", "eyelinerStyle": "thin winged eyeliner", "eyeshadowStyle": "duochrome eyeshadow", "lashStyle": "wispy lashes", "blushStyle": "diffused blush", "lipFinish": "glass-like gloss", "faceAccents": "soft pearl shimmer", "nailStyle": "long almond fingernails", "nailColor": "@secondary"}, "outfit": {"look": "resort", "items": {"top": ["seashell bandeau top", "@third"], "outerwear": ["sheer cape", "@extra"], "headwear": ["pearl-and-coral hair crown", "@secondary"], "neckAccessory": ["pearl strand", "-"], "earAccessory": ["shell earrings", "@third"], "wristAccessory": ["pearl bracelet", "-"], "ringAccessory": ["pearl ring", "-"], "waistAccessory": ["pearl waist chain", "-"]}, "details": {"detailThree": "pearlescent satin"}}}, {"id": "shieldmaiden", "name": "Shieldmaiden", "blurb": "A valkyrie with a platinum high braid, ice-blue eyes, a scar through one brow, tribal face paint, a strong athletic build, steel armor and large feathered wings.", "pal": {"primary": "platinum blonde", "secondary": "silver", "third": "royal blue", "accent": "gold", "extra": "white"}, "c": {"age": "woman", "subjectType": "valkyrie", "faceShape": "oval face with a strong, defined jaw and prominent brow", "expression": "determined, steady gaze", "browShape": "straight, low-set brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "medium-full natural lips", "impression": "a regal, commanding presence", "faceMark": "a faint scar through one eyebrow", "eyeConfig": "matching", "eyeShape": "sharp eyes", "pupilStyle": "round pupils", "irisDetail": "defined limbal ring", "lashNatural": "long, dark eyelashes", "eyeOne": "ice blue", "eyeTwo": "ice blue", "hairStyle": "high braided ponytail", "hairLength": "hip-length", "hairTexture": "thick and voluminous", "bangs": "long face-framing pieces", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "wingStyle": "large feathered wings", "auraStyle": "angelic radiance", "skinTone": "fair", "undertone": "cool", "skinFinish": "natural skin texture with a soft matte finish", "markings": "light freckles across the nose", "bustSize": "medium breasts", "bustShape": "natural breast shape", "bustWeight": "soft natural fullness", "heightStature": "very tall elegant stature", "torsoShape": "broad ribcage with a strong back", "armShape": "strong, muscular arms", "shoulderShape": "slightly broad balanced shoulders", "waistShape": "defined waist", "stomachShape": "toned stomach with light definition", "hipShape": "balanced hips", "buttSize": "toned butt", "thighBuild": "toned thighs", "legShape": "toned legs", "bodySoftness": "strong, athletic build with defined muscle", "posture": "calm composed posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "smudged eyeliner", "eyeshadowStyle": "no eyeshadow", "lashStyle": "natural lashes", "blushStyle": "no blush", "lipFinish": "natural lip finish", "faceAccents": "tribal face paint", "nailStyle": "short square fingernails"}, "outfit": {"look": "costume", "items": {"top": ["polished steel breastplate over a padded tunic", "@secondary"], "bottom": ["layered leather battle skirt with steel plates", "@third"], "outerwear": ["long white cloak with a fur-trimmed collar", "@extra"], "shoulderPiece": ["small steel pauldrons", "@secondary"], "wristAccessory": ["silver bracers", "@secondary"], "gloves": ["long leather gauntlets", "@third"], "headwear": ["winged silver helm", "@secondary"], "belt": ["wide leather belt with a sword hanger", "@third"], "neckAccessory": ["silver torc necklace", "@secondary"], "ringAccessory": ["signet ring", "@accent"]}, "details": {"detailOne": "engraved rune patterns", "detailTwo": "fitted silhouette", "detailThree": "supple leather"}}}, {"id": "emberdragon", "name": "Ember dragon", "blurb": "A dragon-woman with crimson hair, swept-back horns, ember-gold eyes with slit pupils, a spiked tail, large wings, gold-flecked scales and a hoard of gold jewelry.", "pal": {"primary": "deep crimson", "secondary": "burnt orange", "third": "gold", "accent": "charcoal gray", "extra": "black"}, "c": {"age": "woman", "subjectType": "dragon", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "expression": "confident smile", "browShape": "thick, dark, sharply arched brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "full, well-defined lips", "impression": "a dangerous, predatory elegance", "eyeConfig": "matching", "eyeShape": "large upturned eyes", "pupilStyle": "vertical slit pupils", "irisDetail": "golden flecks near the pupil", "lashNatural": "long, thick dark eyelashes", "eyeOne": "amber", "eyeTwo": "amber", "hairStyle": "long layered hair", "hairLength": "waist-length", "hairTexture": "thick, silky and softly voluminous", "bangs": "long face-framing pieces", "hairMovement": "falls past the waist in smooth, mostly straight layers", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hornStyle": "swept-back horns", "tailStyle": "spiked dragon tail", "wingStyle": "large dragon wings", "fangClawStyle": "sharp fangs and small claws", "earStyle": "dragon fin ears", "auraStyle": "flickering ember aura", "animalForm": "Light (fur, scales or feathers on arms and legs)", "fantasyAccentColor": "@third", "skinTone": "golden bronze", "undertone": "warm golden", "skinFinish": "a metallic {c} sheen", "finishColor": "@third", "markings": "diamond-patterned scale markings along the neck", "markingColor": "@third", "bustSize": "large breasts", "bustShape": "soft rounded shape", "bustWeight": "moderate fullness", "heightStature": "tall stature", "torsoShape": "broad ribcage with a strong back", "armShape": "softly toned arms", "shoulderShape": "slightly broad balanced shoulders", "waistShape": "defined waist", "stomachShape": "toned stomach with light definition", "hipShape": "wide hips", "buttSize": "full, round butt", "thighBuild": "thick, shapely thighs", "legShape": "toned legs", "bodySoftness": "curvy build", "posture": "elegant posture", "makeupStyle": "sunset gradient makeup", "eyelinerStyle": "cat-eye eyeliner", "eyeshadowStyle": "gradient eyeshadow", "lashStyle": "dramatic lashes", "blushStyle": "high cheek blush", "lipFinish": "soft matte lips", "faceAccents": "luminous highlighting", "nailStyle": "long coffin fingernails", "nailColor": "@extra"}, "outfit": {"look": "costume", "items": {"top": ["gold-trimmed crimson wrap bodice with a high collar", "@primary"], "bottom": ["flowing silk harem pants", "@secondary"], "neckAccessory": ["gold collar necklace", "@third"], "wristAccessory": ["gold armlets", "@third"], "earAccessory": ["statement chandelier earrings", "@third"], "ringAccessory": ["statement cocktail ring", "@third"], "waistAccessory": ["layered chain waist", "@third"]}, "details": {"detailOne": "embroidered scale pattern", "detailTwo": "side slit", "detailThree": "brocade pattern"}}}, {"id": "ines", "name": "Inés", "blurb": "A realistic mature woman with a silver-streaked dark bob, green-hazel eyes, laugh lines, olive skin and an easy linen-and-silk wardrobe.", "pal": {"primary": "dark brown", "secondary": "cream", "third": "navy blue", "accent": "silver", "extra": "sage green"}, "c": {"age": "mature woman", "faceShape": "oval face with balanced features", "expression": "warm smile", "browShape": "full, softly arched dark brows", "noseShape": "refined nose with a high, slightly aquiline bridge", "mouthShape": "medium-full natural lips", "impression": "a graceful, mature elegance with warmth and quiet confidence", "faceMark": "a small beauty mark above the lip", "eyeConfig": "matching", "eyeShape": "almond-shaped eyes with defined lids", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long dark eyelashes", "eyeOne": "green-hazel", "eyeTwo": "green-hazel", "hairStyle": "A-line bob", "hairLength": "chin-length", "hairTexture": "silky and smooth", "bangs": "side-swept bangs", "hairMovement": "sweeps gently to one side", "hairBase": "@primary", "hairHighlights": "@accent", "hairBlend": "silver streaks woven through the dark hair", "skinTone": "light olive", "undertone": "warm", "skinFinish": "natural skin texture with a soft matte finish", "markings": "faint laugh lines at the corners of the eyes and mouth", "bustSize": "medium breasts", "bustShape": "natural sloping shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "torsoShape": "softly contoured, non-muscular torso", "armShape": "softly rounded arms", "shoulderShape": "gently sloped shoulders", "waistShape": "softly curving waist", "stomachShape": "soft stomach", "hipShape": "softly rounded hips", "buttSize": "round butt", "thighBuild": "softly rounded thighs", "legShape": "smooth proportionate legs", "bodySoftness": "gracefully rounded build", "posture": "elegant posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "soft eyeliner", "eyeshadowStyle": "soft neutral eyeshadow", "lashStyle": "natural lashes", "blushStyle": "soft rosy blush", "lipFinish": "soft matte lips", "faceAccents": "subtle highlighting", "nailStyle": "carefully manicured fingernails", "nailColor": "dusty rose"}, "outfit": {"look": "preppy", "items": {"top": ["silk blouse", "@secondary"], "bottom": ["wide-leg trousers", "@third"], "outerwear": ["linen duster", "@extra"], "belt": ["thin leather belt", "@primary"], "neckAccessory": ["pearl strand", "-"], "earAccessory": ["pearl stud earrings", "-"], "eyewear": ["tortoiseshell glasses", "-"], "wristAccessory": ["classic watch", "@accent"], "ringAccessory": ["signet ring", "@accent"], "hipAccessory": ["structured satchel", "@primary"]}, "details": {"detailOne": "pearl buttons", "detailTwo": "neatly tucked in", "detailThree": "linen weave texture"}}}, {"id": "imani", "name": "Imani", "blurb": "A realistic full-figured woman with deep warm brown skin, natural coily hair under a bright scarf, a warm laugh and a flour-dusted baker's apron look.", "pal": {"primary": "jet black", "secondary": "cream", "third": "mustard yellow", "accent": "gold", "extra": "dusty rose"}, "c": {"age": "woman", "faceShape": "round face with soft, full cheeks", "expression": "laughing expression", "browShape": "thick, dark, gently arched brows", "noseShape": "broad nose with a softly rounded tip", "mouthShape": "full lips with a deep natural color", "impression": "a warm, welcoming presence with a radiant smile", "faceMark": "soft dimples in both cheeks", "eyeConfig": "matching", "eyeShape": "large, round dark eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "dark brown", "eyeTwo": "dark brown", "hairStyle": "twist-out curls", "hairLength": "shoulder-length", "hairTexture": "coily", "bangs": "open forehead", "hairMovement": "gathers softly around the collarbones", "hairBase": "@primary", "skinTone": "deep warm brown", "undertone": "red-brown", "skinFinish": "natural skin texture with a deep, rich glow", "markings": "no markings", "bustSize": "large breasts", "bustShape": "softly rounded breasts", "bustWeight": "heavy natural fullness", "heightStature": "average height", "torsoShape": "softly contoured, non-muscular torso", "armShape": "full, soft arms", "shoulderShape": "soft rounded shoulders", "waistShape": "softly defined waist with a full midsection", "stomachShape": "soft, full belly", "hipShape": "very wide, rounded hips", "buttSize": "full, round butt", "thighBuild": "thick, soft thighs", "legShape": "soft full legs", "bodySoftness": "full-figured plus-size build with soft, generous curves", "posture": "relaxed posture", "makeupStyle": "soft natural makeup", "eyelinerStyle": "soft eyeliner", "eyeshadowStyle": "soft neutral eyeshadow", "lashStyle": "soft fluttery lashes", "blushStyle": "soft cheek blush", "lipFinish": "tinted lip balm", "faceAccents": "soft cheekbone highlight", "nailStyle": "short rounded fingernails", "nailColor": "@extra"}, "outfit": {"look": "casual", "items": {"top": ["boat-neck striped knit top", "@secondary"], "bottom": ["high-waisted jeans", "-"], "waistAccessory": ["bib apron tied at the waist", "@third"], "headwear": ["hair scarf tied in a bow", "@third"], "neckAccessory": ["delicate chain necklace", "@accent"], "earAccessory": ["small gold hoop earrings", "-"], "wristAccessory": ["classic watch", "@accent"], "ringAccessory": ["stacked thin rings", "@accent"]}, "details": {"detailOne": "contrast stitching", "detailTwo": "sleeves rolled to the elbow", "detailThree": "gingham pattern"}}}]);
  const grp=l=>PRESET_GROUPS.start.find(g=>g.label===l).keys;
  grp("Fantasy").push("tidecaller","shieldmaiden","emberdragon");
  grp("Everyday").push("ines","imani");
})();
/* ---- v47: sharper faces for Inés and Imani, a curvier Imani, five new Fantasy starts ---- */
(function(){
  const addc=(f,v)=>{const g=CHAR[f]&&CHAR[f][0]?CHAR[f][0][1]:"";if(CHAR[f]&&!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  Object.entries({"impression": ["a strikingly beautiful, sophisticated presence with mature elegance", "a radiantly beautiful presence with a dazzling smile"]}).forEach(([f,l])=>l.forEach(v=>addc(f,v)));
  const NEWO={"top": [["tiger-print bandeau bikini top", "L", "resort,costume,boudoir", ""]], "bottom": [["tiger-print bikini bottoms", "L", "resort,costume,boudoir", ""]], "detailThree": [["cow print pattern", "CU", "costume,sweet", ""], ["tiger stripe pattern", "CU", "costume,resort", ""]]};
  Object.entries(NEWO).forEach(([f,list])=>{OUTFIT[f]=OUTFIT[f]||[];list.forEach(([v,t,l])=>{if(!OUTFIT[f].some(i=>i.v===v))OUTFIT[f].push({v,t,f:l})})});
  const FIX={"ines": {"blurb": "A strikingly beautiful mature woman with a silver-streaked dark bob, large green-hazel eyes, high cheekbones, soft glam makeup, laugh lines and an easy linen-and-silk wardrobe.", "c": {"impression": "a strikingly beautiful, sophisticated presence with mature elegance", "faceShape": "long oval face with high, defined cheekbones", "eyeShape": "large, striking eyes", "irisDetail": "golden flecks near the pupil", "lashNatural": "long, thick, curled dark eyelashes", "mouthShape": "full, well-defined lips", "makeupStyle": "classic glam makeup", "eyelinerStyle": "classic winged eyeliner", "eyeshadowStyle": "soft blended eyeshadow", "lashStyle": "long defined lashes", "lipFinish": "soft satin lips", "blushStyle": "soft rosy blush", "faceAccents": "soft cheekbone highlight"}}, "imani": {"blurb": "A realistic, radiantly beautiful curvy woman with deep warm brown skin, high cheekbones, full glossy lips, twist-out curls under a bright scarf and a warm baker's apron look.", "c": {"impression": "a radiantly beautiful presence with a dazzling smile", "expression": "genuine, crinkle-eyed smile", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "eyeShape": "large, striking eyes", "browShape": "thick, dark, boldly arched brows", "mouthShape": "full, plush lips with a defined shape", "makeupStyle": "soft glam makeup", "eyelinerStyle": "classic winged eyeliner", "eyeshadowStyle": "soft blended eyeshadow", "lashStyle": "long defined lashes", "lipFinish": "glossy lips", "blushStyle": "soft cheek blush", "faceAccents": "luminous highlighting", "bustSize": "large breasts", "bustShape": "softly rounded breasts", "bustWeight": "moderate fullness", "armShape": "softly rounded arms", "waistShape": "narrow waist", "stomachShape": "flat, smooth stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "shapely legs", "bodySoftness": "curvy build"}}};
  Object.entries(FIX).forEach(([id,fx])=>{const t=TEMPLATES.find(x=>x.id===id);if(!t)return;t.blurb=fx.blurb;Object.assign(t.c,fx.c)});
  TEMPLATES.push(...[{"id": "velvetsuccubus", "name": "Velvet succubus", "blurb": "A bombshell succubus with an exaggerated hourglass figure, waist-length burgundy waves, magenta slit-pupil eyes, small horns, a heart-tipped tail and a black bustier look.", "pal": {"primary": "deep burgundy", "secondary": "black", "third": "gold", "accent": "hot pink", "extra": "rose gold"}, "c": {"age": "woman", "subjectType": "succubus", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "expression": "seductive smile", "browShape": "sharp, sweeping, devilish brows", "noseShape": "small straight nose", "mouthShape": "full, plush lips with a defined shape", "impression": "a bombshell presence", "faceMark": "a small beauty mark near the lips", "eyeConfig": "matching", "eyeShape": "large catlike eyes", "pupilStyle": "vertical slit pupils", "irisDetail": "metallic iris ring", "lashNatural": "long, feather-like lashes", "eyeOne": "magenta", "eyeTwo": "magenta", "hairStyle": "long wavy hair", "hairLength": "waist-length", "hairTexture": "thick, glossy waves", "bangs": "long side bangs", "hairMovement": "falls in long flowing waves with curled ends", "hairBase": "@primary", "hornStyle": "small curved horns", "tailStyle": "heart-tipped demonic tail", "wingStyle": "small batlike wings", "fangClawStyle": "subtle fangs", "earStyle": "demonic pointed ears", "auraStyle": "demonic aura", "fantasyAccentColor": "@accent", "skinTone": "rosy fair", "undertone": "rosy", "skinFinish": "a faint {c} glow beneath the skin", "finishColor": "@accent", "markings": "no markings", "bustSize": "huge breasts", "bustShape": "perky, full, round shape", "bustWeight": "heavy natural fullness", "heightStature": "slightly above-average height", "torsoShape": "narrow ribcage", "armShape": "softly rounded arms", "shoulderShape": "narrow delicate shoulders", "waistShape": "extremely narrow waist", "stomachShape": "flat, smooth stomach", "hipShape": "extremely wide, curvy hips", "buttSize": "very large, plump butt", "thighBuild": "extremely thick, plush thighs", "legShape": "long shapely legs", "bodySoftness": "exaggerated hourglass figure", "posture": "hip-popped sultry stance", "makeupStyle": "seductive smoky makeup", "eyelinerStyle": "cat-eye eyeliner", "eyeshadowStyle": "smoky eyeshadow", "lashStyle": "seductive dramatic lashes", "blushStyle": "high cheek blush", "lipFinish": "deep red seductive lips", "faceAccents": "luminous highlighting", "nailStyle": "long coffin fingernails", "nailColor": "@secondary"}, "outfit": {"look": "boudoir", "items": {"corset": ["boned bustier", "@secondary"], "bottom": ["micro skirt", "@secondary"], "legwear": ["lace-top stockings", "@secondary"], "thighAccessory": ["lace thigh garter", "@accent"], "neckAccessory": ["velvet choker", "@accent"], "gloves": ["long velvet gloves", "@secondary"], "earAccessory": ["dangling crystal earrings", "@third"], "belt": ["chain belt", "@third"]}, "details": {}}}, {"id": "moonhuntress", "name": "Moonlit huntress", "blurb": "A dark elf with ashen skin, floor-sweeping silver-white hair, violet eyes, a very tall long-legged figure and a satin, leather and lace look.", "pal": {"primary": "silvery white", "secondary": "midnight blue", "third": "silver", "accent": "violet", "extra": "black"}, "c": {"age": "woman", "subjectType": "dark elf", "faceShape": "long oval face with prominent sculpted cheekbones and a softly tapered jawline", "expression": "smoldering sultry expression", "browShape": "elegantly swept-up, pointed brows", "noseShape": "small straight nose", "mouthShape": "full, well-defined lips", "impression": "an alluring, sultry presence", "eyeConfig": "matching", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "double limbal ring", "lashNatural": "long, thick, curled dark eyelashes", "eyeOne": "violet", "eyeTwo": "violet", "hairStyle": "center-parted long straight hair", "hairLength": "hip-length", "hairTexture": "sleek", "bangs": "neat center part", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "earStyle": "long pointed elf ears", "auraStyle": "moonlit aura", "skinTone": "ashen gray", "undertone": "cool silvery", "skinFinish": "a {c} shimmer across the skin", "finishColor": "@third", "markings": "no markings", "bustSize": "large breasts", "bustShape": "teardrop shape", "bustWeight": "moderate fullness", "heightStature": "very tall elegant stature", "torsoShape": "elongated, relatively slender torso", "armShape": "long, slender arms", "shoulderShape": "elegant straight shoulders", "waistShape": "slender gently tapered waist", "stomachShape": "flat, smooth stomach", "hipShape": "hips that widen gently from a narrow waist", "buttSize": "round butt", "thighBuild": "long smooth thighs", "legShape": "long legs tapering into slender lower legs", "bodySoftness": "tall, long-legged, slender figure", "posture": "elegant posture", "makeupStyle": "femme fatale makeup", "eyelinerStyle": "sharp winged eyeliner", "eyeshadowStyle": "smoky eyeshadow", "lashStyle": "dramatic lashes", "blushStyle": "no blush", "lipFinish": "soft matte lips", "faceAccents": "subtle brow-bone highlight", "nailStyle": "long coffin fingernails", "nailColor": "@extra"}, "outfit": {"look": "glam", "items": {"top": ["satin halter top", "@secondary"], "bottom": ["leather shorts", "@extra"], "legwear": ["thigh-high stockings", "@extra"], "outerwear": ["long lace duster", "@secondary"], "neckAccessory": ["metal ring choker", "@third"], "thighAccessory": ["crystal thigh chain", "@third"], "earAccessory": ["long silver spike earrings", "@third"], "belt": ["chain belt", "@third"], "ringAccessory": ["thin silver band rings", "@third"]}, "details": {}}}, {"id": "pocketimp", "name": "Pocket imp", "blurb": "A petite, exceptionally voluptuous imp with a hot-pink bob, mischievous heart-pupil eyes, small horns, a spaded tail, bat wings and a strappy fishnet look.", "pal": {"primary": "hot pink", "secondary": "black", "third": "violet", "accent": "gold", "extra": "white"}, "c": {"age": "woman", "subjectType": "imp", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "expression": "mischievous expression", "browShape": "feathered, upswept brows", "noseShape": "delicate button nose", "mouthShape": "heart-shaped lips", "impression": "a seductive, bedroom-ready allure", "eyeConfig": "matching", "eyeShape": "large catlike eyes", "pupilStyle": "heart pupils", "irisDetail": "gradient iris coloring", "lashNatural": "long, thick dark eyelashes", "eyeOne": "violet", "eyeTwo": "violet", "hairStyle": "short layered bob", "hairLength": "chin-length", "hairTexture": "silky and smooth", "bangs": "side-swept bangs", "hairMovement": "sweeps gently to one side", "hairBase": "@primary", "hornStyle": "small curved horns", "tailStyle": "spaded demonic tail", "wingStyle": "small batlike wings", "fangClawStyle": "small fangs", "earStyle": "demonic pointed ears", "auraStyle": "faint demonic aura", "fantasyAccentColor": "@third", "skinTone": "fair", "undertone": "rosy", "skinFinish": "dewy skin", "markings": "no markings", "bustSize": "very large breasts", "bustShape": "soft rounded shape", "bustWeight": "heavy natural fullness", "heightStature": "petite stature", "torsoShape": "compact torso", "armShape": "slender arms and delicate hands", "shoulderShape": "petite shoulders", "waistShape": "tiny waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "large, rounded butt", "thighBuild": "thick, soft thighs", "legShape": "short shapely legs", "bodySoftness": "petite, exceptionally voluptuous hourglass figure", "posture": "light playful posture", "makeupStyle": "bedroom makeup", "eyelinerStyle": "double-wing eyeliner", "eyeshadowStyle": "shimmer eyeshadow", "lashStyle": "bedroom lashes", "blushStyle": "high cheek blush", "lipFinish": "cherry-tinted gloss", "faceAccents": "small heart accent beneath one eye", "nailStyle": "long coffin fingernails", "nailColor": "@secondary"}, "outfit": {"look": "boudoir", "items": {"bra": ["strappy cage bra", "@secondary"], "bottom": ["micro skirt", "@primary"], "legwear": ["fishnet stockings", "@secondary"], "belt": ["buckled harness belt", "@secondary"], "neckAccessory": ["spiked choker", "@secondary"], "gloves": ["fingerless fishnet gloves", "@secondary"], "earAccessory": ["chain-link ear cuffs", "@accent"]}, "details": {}}}, {"id": "meadowbombshell", "name": "Meadow bombshell", "blurb": "A cow-girl with an extremely top-heavy hourglass figure, long cream waves, warm brown eyes, floppy ears, short horns, a tufted tail and a cow-print tied crop look.", "pal": {"primary": "cream", "secondary": "black", "third": "rose pink", "accent": "gold", "extra": "white"}, "c": {"age": "woman", "subjectType": "cow", "faceShape": "round-oval face with soft cheeks and a small chin", "expression": "playful smile", "browShape": "soft, straight dark brows", "noseShape": "small gently rounded nose", "mouthShape": "full, plush pink lips", "impression": "a lewd, irresistible allure", "eyeConfig": "matching", "eyeShape": "large, warm eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, delicate eyelashes", "eyeOne": "warm medium brown", "eyeTwo": "warm medium brown", "hairStyle": "long wavy hair", "hairLength": "waist-length", "hairTexture": "thick, soft and slightly tousled", "bangs": "curtain bangs", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "earStyle": "floppy cow ears", "hornStyle": "short curved horns", "tailStyle": "tufted cow tail", "animalForm": "Light (fur, scales or feathers on arms and legs)", "fantasyAccentColor": "@secondary", "skinTone": "peachy fair", "undertone": "rosy", "skinFinish": "dewy skin", "markings": "no markings", "bustSize": "huge breasts", "bustShape": "heavy teardrop shape", "bustWeight": "heavy natural fullness", "heightStature": "average height", "torsoShape": "softly contoured, non-muscular torso", "armShape": "softly rounded arms", "shoulderShape": "soft rounded shoulders", "waistShape": "soft hourglass waist", "stomachShape": "mostly flat but naturally soft stomach", "hipShape": "full rounded hips", "buttSize": "plump butt", "thighBuild": "thick, soft thighs", "legShape": "soft full legs", "bodySoftness": "extremely top-heavy hourglass figure", "posture": "relaxed posture", "makeupStyle": "dewy makeup", "eyelinerStyle": "soft eyeliner", "eyeshadowStyle": "soft blended eyeshadow", "lashStyle": "soft fluttery lashes", "blushStyle": "rosy cheeks with a blush across the bridge of the nose", "lipFinish": "cherry-tinted gloss", "faceAccents": "soft cheekbone highlight", "nailStyle": "long almond fingernails", "nailColor": "@third"}, "outfit": {"look": "sweet", "items": {"top": ["tied-front crop top", "@primary"], "bottom": ["denim shorts", "-"], "legwear": ["striped thigh-high socks", "@secondary"], "neckAccessory": ["bell ribbon choker", "@third"], "waistAccessory": ["ribbon bow tied at the waist", "@third"], "wristAccessory": ["fuzzy wrist cuffs", "@primary"]}, "details": {"detailThree": "cow print pattern"}}}, {"id": "onibrawler", "name": "Oni brawler", "blurb": "A tall oni with crimson skin, white wolf-cut hair, amber eyes, oni horns, fangs, a muscular thick hourglass figure and a tiger-print bikini with harness.", "pal": {"primary": "crimson red", "secondary": "black", "third": "gold", "accent": "tiger orange", "extra": "bone white"}, "c": {"age": "woman", "subjectType": "oni", "faceShape": "oval face with a strong, defined jaw and prominent brow", "expression": "playful fanged grin", "browShape": "thick, dark, sharply arched brows", "noseShape": "straight nose with a softly rounded tip", "mouthShape": "full, well-defined lips", "impression": "a fierce warrior presence", "eyeConfig": "matching", "eyeShape": "sharp eyes", "pupilStyle": "round pupils", "irisDetail": "defined limbal ring", "lashNatural": "long, dark eyelashes", "eyeOne": "amber", "eyeTwo": "amber", "hairStyle": "long wolf cut", "hairLength": "waist-length", "hairTexture": "thick and voluminous", "bangs": "wispy bangs", "hairMovement": "whips in a dramatic windswept motion", "hairBase": "@extra", "earStyle": "slightly pointed ears", "hornStyle": "oni horns", "fangClawStyle": "sharp fangs", "auraStyle": "infernal glow", "fantasyAccentColor": "@accent", "skinTone": "@primary", "undertone": "warm", "skinFinish": "a faint {c} glow beneath the skin", "finishColor": "@accent", "markings": "no markings", "bustSize": "very large breasts", "bustShape": "full, naturally rounded shape", "bustWeight": "moderate fullness", "heightStature": "tall, statuesque stature", "torsoShape": "broad ribcage with a strong back", "armShape": "strong, muscular arms", "shoulderShape": "slightly broad balanced shoulders", "waistShape": "defined waist", "stomachShape": "toned stomach with light definition", "hipShape": "wide hips", "buttSize": "large, rounded butt", "thighBuild": "very thick thighs", "legShape": "toned legs", "bodySoftness": "strong, athletic build with defined muscle", "posture": "calm composed posture", "makeupStyle": "punk makeup", "eyelinerStyle": "graphic eyeliner", "eyeshadowStyle": "smoky eyeshadow", "lashStyle": "spiky lashes", "blushStyle": "no blush", "lipFinish": "matte lips", "faceAccents": "subtle highlighting", "nailStyle": "long coffin fingernails", "nailColor": "@secondary"}, "outfit": {"look": "costume", "items": {"top": ["tiger-print bandeau bikini top", "-"], "bottom": ["tiger-print bikini bottoms", "-"], "belt": ["leather body harness belt", "@secondary"], "shoulderPiece": ["fur shoulder pelt", "@extra"], "wristAccessory": ["studded cuff", "@secondary"], "gloves": ["fingerless leather gloves", "@secondary"], "thighAccessory": ["bandage wraps around the thigh", "@extra"], "earAccessory": ["chunky hoop earrings", "@third"]}, "details": {"detailThree": "tiger stripe pattern"}}}]);
  PRESET_GROUPS.start.find(g=>g.label==="Fantasy").keys.push("velvetsuccubus", "moonhuntress", "pocketimp", "meadowbombshell", "onibrawler");
})();
/* ---- v48: moth monster girl, with new sclera and extra-arm fields ---- */
(function(){
  const addc=(f,v,grp)=>{if(!CHAR[f])CHAR[f]=[];const g=grp!=null?grp:(CHAR[f][0]?CHAR[f][0][1]:"");if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  CHAR.scleraStyle=[];CHAR.extraArms=[];
  ["black sclera", "solid black eyes with no visible whites", "red sclera", "golden sclera", "glowing white sclera", "dark gray sclera"].forEach(v=>CHAR.scleraStyle.push([v,"Eye whites"]));
  ["a second pair of slender fuzzy arms below the main arms", "a second pair of small fuzzy insect arms tucked beneath the main arms", "two extra pairs of slender arms, six arms in total", "a second pair of jointed chitin arms below the main arms", "a second pair of delicate clawed arms below the main arms", "a pair of long thin extra arms rising from the back"].forEach(v=>CHAR.extraArms.push([v,"Creature features"]));
  Object.entries({"wingStyle": ["large white moth wings with soft eyespot patterns"], "hornStyle": ["large feathery white moth antennae"], "tailStyle": ["plump fuzzy moth abdomen tail"], "neckFeature": ["a thick white fur ruff around the neck"], "armShape": ["slender, jointed insect-like arms covered in fine white fur"], "markings": ["soft eyespot-like markings across the shoulders"]}).forEach(([f,l])=>l.forEach(v=>addc(f,v,f==="tailStyle"||f==="wingStyle"||f==="hornStyle"?"Insect and arthropod":(f==="neckFeature"?"Creature features":undefined))));
  EYE_FIELDS.push("scleraStyle");
  TRAIT_FIELDS.splice(TRAIT_FIELDS.indexOf("wingStyle")+1,0,"extraArms");
  STEP_FIELDS.concept=["age","subjectType",...TRAIT_FIELDS,"animalForm","bodyForm","fantasyAccentColor"];
  STEP_FIELDS.face.splice(STEP_FIELDS.face.indexOf("eyeShape")+1,0,"scleraStyle");
  Object.assign(LABELS,{scleraStyle:"Eye whites (sclera)",extraArms:"Extra arms"});
  TEMPLATES.push({"id": "palemoth", "name": "Pale moth", "blurb": "A white-skinned moth monster girl with large white wings, feathery antennae, a fuzzy neck ruff and fur, black sclera, jointed insect arms, a second pair of fuzzy arms and a plump abdomen tail.", "pal": {"primary": "white", "secondary": "charcoal gray", "third": "pale yellow", "accent": "lavender", "extra": "ash gray"}, "c": {"age": "woman", "subjectType": "moth", "faceShape": "heart-shaped face", "expression": "otherworldly calm", "browShape": "pale, fine brows", "noseShape": "small straight nose", "mouthShape": "small, softly shaped lips", "impression": "a cool, aloof otherworldly beauty", "eyeConfig": "matching", "eyeShape": "large round eyes", "scleraStyle": "black sclera", "pupilStyle": "small round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, feather-like lashes", "eyeOne": "pale yellow", "eyeTwo": "pale yellow", "hairStyle": "shaggy bob", "hairLength": "shoulder-length", "hairTexture": "fluffy", "bangs": "wispy bangs", "hairMovement": "gathers softly around the collarbones", "hairBase": "@primary", "hairHighlights": "@third", "hornStyle": "large feathery white moth antennae", "wingStyle": "large white moth wings with soft eyespot patterns", "tailStyle": "plump fuzzy moth abdomen tail", "extraArms": "a second pair of slender fuzzy arms below the main arms", "fangClawStyle": "tiny claws", "auraStyle": "moonlit aura", "animalForm": "Moderate (muzzle, paws and coat)", "fantasyAccentColor": "@primary", "skinTone": "@primary", "undertone": "pearl", "skinFinish": "short, soft fur with a velvety sheen", "markings": "soft eyespot-like markings across the shoulders", "markingColor": "@secondary", "bustSize": "medium breasts", "bustShape": "soft rounded shape", "bustWeight": "soft natural fullness", "heightStature": "average height", "torsoShape": "slim upper torso", "armShape": "slender, jointed insect-like arms covered in fine white fur", "shoulderShape": "gently sloped shoulders", "waistShape": "softly tapered waist", "stomachShape": "flat stomach", "hipShape": "softly rounded hips", "buttSize": "round butt", "thighBuild": "softly rounded thighs", "legShape": "slender legs", "bodySoftness": "slender soft build", "posture": "soft poised posture", "makeupStyle": "natural, barely-there makeup", "eyelinerStyle": "no eyeliner", "eyeshadowStyle": "no eyeshadow", "lashStyle": "natural lashes", "blushStyle": "soft cheek blush", "lipFinish": "natural lip finish", "faceAccents": "soft pearl shimmer", "nailStyle": "short rounded fingernails", "nailColor": "@secondary"}, "outfit": {"look": "casual", "items": {"top": ["ribbed knit crop top", "@secondary"], "bottom": ["pleated midi skirt", "@third"], "earAccessory": ["pearl stud earrings", "-"], "wristAccessory": ["slim bracelets", "@accent"]}, "details": {"detailOne": "lace trim", "detailTwo": "backless design"}}});
  PRESET_GROUPS.start.find(g=>g.label==="Fantasy").keys.push("palemoth");
})();
/* ---- v50: colors are never baked into option names; the palette and color fields supply them ---- */
(function(){
  const OMAP={"bra": {"silver bandeau": ["bandeau", "silver", null], "gold-trim sheer bandeau": ["{c2}-trim sheer bandeau", null, "gold"]}, "panties": {"gold-trim lace thong": ["{c2}-trim lace thong", null, "gold"], "silver chain thong": ["chain thong", "silver", null], "gold-trim sheer thong": ["{c2}-trim sheer thong", null, "gold"]}, "corset": {"gold-trim satin corset": ["{c2}-trim satin corset", null, "gold"], "black corset-style bodice with red rose ornaments and an anchor emblem": ["corset-style bodice with {c2} rose ornaments and an anchor emblem", "black", "red"]}, "top": {"soaked see-through white tee": ["soaked see-through {c} tee", "white", null], "fitted white lab coat": ["fitted {c} lab coat", "white", null], "cream button blouse with a bow collar": ["button blouse with a bow collar", "cream", null], "short-sleeved diner dress with a white collar": ["short-sleeved diner dress with a {c2} collar", null, "white"], "fitted black vest over a white shirt": ["fitted {c} vest over a {c2} shirt", "black", "white"], "open black vest worn over a bandeau": ["open {c} vest worn over a bandeau", "black", null], "white lab coat over a fitted turtleneck": ["lab coat over a fitted turtleneck", "white", null], "fitted double-breasted jacket with gold buttons": ["fitted double-breasted jacket with {c2} buttons", null, "gold"], "black dress with a printed rib cage": ["dress with a printed rib cage", "black", null], "puffy pumpkin dress with a green collar": ["puffy pumpkin dress with a {c2} collar", null, "green"], "black dress with a spiderweb collar": ["dress with a spiderweb collar", "black", null], "short laced leaf-green tunic dress": ["short laced {c} tunic dress", "leaf green", null], "micro leaf-green tunic with a plunging laced neckline": ["micro {c} tunic with a plunging laced neckline", "leaf green", null], "white tabard dress with golden trim": ["tabard dress with {c2} trim", "white", "gold"], "micro white tabard with a plunging neckline": ["micro {c} tabard with a plunging neckline", "white", null], "silver breastplate dress with a short skirt": ["breastplate dress with a short skirt", "silver", null], "micro silver breastplate bikini top": ["micro {c} breastplate bikini top", "silver", null], "floor-skimming white robe with a golden sash": ["floor-skimming {c} robe with a {c2} sash", "white", "gold"], "micro white sheer robe with a plunging neckline": ["micro {c} sheer robe with a plunging neckline", "white", null], "short icy-blue gown with a sparkly bodice": ["short {c} gown with a sparkly bodice", "icy blue", null], "micro icy-blue gown with a plunging crystal neckline": ["micro {c} gown with a plunging crystal neckline", "icy blue", null], "short fox-trim dress with a white fur collar": ["short fox-trim dress with a {c} fur collar", "white", null], "short red dress with a white fur collar": ["short {c} dress with a {c2} fur collar", "red", "white"], "micro red velvet dress with a plunging neckline and fur trim": ["micro {c} velvet dress with a plunging neckline and fur trim", "red", null], "fitted black dress with a tailored jacket": ["fitted {c} dress with a tailored jacket", "black", null], "fitted white space jumpsuit with patches": ["fitted {c} space jumpsuit with patches", "white", null], "micro white space bodysuit unzipped to the navel": ["micro {c} space bodysuit unzipped to the navel", "white", null], "fitted white panel dress with glowing seams": ["fitted {c} panel dress with glowing seams", "white", null], "white kimono-style top with wide sleeves": ["kimono-style top with wide sleeves", "white", null], "micro leather bikini top with bronze studs": ["micro leather bikini top with {c2} studs", null, "bronze"], "floor-skimming draped white gown": ["floor-skimming draped {c} gown", "white", null], "micro draped white chiffon with a plunging neckline": ["micro draped {c} chiffon with a plunging neckline", "white", null], "short white pleated dress with a gold collar": ["short {c} pleated dress with a {c2} collar", "white", "gold"], "short tailcoat dress with gold buttons": ["short tailcoat dress with {c2} buttons", null, "gold"], "fitted white fencing jacket": ["fitted {c} fencing jacket", "white", null], "micro white fencing bodysuit unzipped to the navel": ["micro {c} fencing bodysuit unzipped to the navel", "white", null], "white ribbed sweater with a gray collar and an underboob cutout": ["ribbed sweater with a {c2} collar and an underboob cutout", "white", "gray"], "white frilled halter bikini top with a front ribbon tie": ["frilled halter bikini top with a front ribbon tie", "white", null], "white frilled halter bikini top with ring accents": ["frilled halter bikini top with ring accents", "white", null], "red high-cut lifeguard swimsuit with a white cross-and-heart emblem": ["high-cut lifeguard swimsuit with a {c2} cross-and-heart emblem", "red", "white"], "red high-cut bunny leotard with side ribbon lacing": ["high-cut bunny leotard with side ribbon lacing", "red", null], "black bunny leotard with a plunging neckline": ["bunny leotard with a plunging neckline", "black", null], "black cropped top with an underboob cutout": ["cropped top with an underboob cutout", "black", null], "black fitted high-neck knit top": ["fitted high-neck knit top", "black", null], "black ribbed sleeveless crop knit top with silver teardrop pendants": ["ribbed sleeveless crop knit top with {c2} teardrop pendants", "black", "silver"], "black fitted halter mini dress with a high side slit": ["fitted halter mini dress with a high side slit", "black", null], "black halter top with a gold O-ring": ["halter top with a {c2} O-ring", "black", "gold"], "black halter bikini top with a gold O-ring and fur trim": ["halter bikini top with a {c2} O-ring and fur trim", "black", "gold"], "navy high-cut swimsuit with white side stripes and a criss-cross strap front": ["high-cut swimsuit with {c2} side stripes and a criss-cross strap front", "navy", "white"], "red cropped tank top with a pixel game-controller print": ["cropped tank top with a pixel game-controller print", "red", null], "sheer white cropped tank top": ["sheer {c} cropped tank top", "white", null], "white cropped short-sleeve top with navy collar trim and a red neckerchief": ["cropped short-sleeve top with {c2} collar trim and a {c2} neckerchief", "white", "navy"], "white front-tie bikini top": ["front-tie bikini top", "white", null], "white collared shirt, partly unbuttoned": ["collared shirt, partly unbuttoned", "white", null], "black micro string bikini top": ["micro string bikini top", "black", null], "gold-trimmed crimson wrap bodice with a high collar": ["{c2}-trimmed {c} wrap bodice with a high collar", "crimson", "gold"]}, "bottom": {"asymmetric tiered black skirt": ["asymmetric tiered {c} skirt", "black", null], "micro white skirt with golden trim": ["micro {c} skirt with {c2} trim", "white", "gold"], "micro silver armored skirt": ["micro {c} armored skirt", "silver", null], "pleated red hakama-style skirt": ["pleated {c} hakama-style skirt", "red", null], "micro red hakama-style skirt": ["micro {c} hakama-style skirt", "red", null], "white side-tie bikini bottoms": ["side-tie bikini bottoms", "white", null], "white frilled bikini bottoms": ["frilled bikini bottoms", "white", null], "black wrap skirt with zipper edges": ["wrap skirt with zipper edges", "black", null], "black flared high-waisted pants": ["flared high-waisted pants", "black", null], "faded blue low-rise jeans": ["faded {c} low-rise jeans", "blue", null], "black side-tie bikini bottoms": ["side-tie bikini bottoms", "black", null], "black short athletic shorts": ["short athletic shorts", "black", null], "black high-cut bikini bottoms": ["high-cut bikini bottoms", "black", null], "white high-cut bikini bottoms": ["high-cut bikini bottoms", "white", null], "green side-tie bikini bottoms with white stripes": ["side-tie bikini bottoms with {c2} stripes", "green", "white"], "black micro string bikini bottoms": ["micro string bikini bottoms", "black", null]}, "legwear": {"cream cable tights": ["cable tights", "cream", null], "sheer black stockings with a back seam": ["sheer {c} stockings with a back seam", "black", null], "opaque black tights": ["opaque {c} tights", "black", null], "thigh-high stockings with silver garters": ["thigh-high stockings with {c2} garters", null, "silver"], "thigh-high white stockings": ["thigh-high {c} stockings", "white", null], "thigh-high silver-plated stockings": ["thigh-high {c2}-plated stockings", null, "silver"], "knee-high gold-trim leggings": ["knee-high {c2}-trim leggings", null, "gold"], "thigh-high stockings with gold garters": ["thigh-high stockings with {c2} garters", null, "gold"], "white ankle socks": ["ankle socks", "white", null]}, "outerwear": {"white lab-style coat": ["lab-style coat", "white", null], "short white cape": ["short {c} cape", "white", null], "sheer white cape": ["sheer {c} cape", "white", null], "short white fur cape": ["short {c} fur cape", "white", null], "sheer white fur cape slipping off both shoulders": ["sheer {c} fur cape slipping off both shoulders", "white", null], "oversized black jacket with red lining": ["oversized {c} jacket with {c2} lining", "black", "red"], "sheer white open robe with pink ribbon ties on the sleeves": ["sheer {c} open robe with {c2} ribbon ties on the sleeves", "white", "pink"], "cropped black jacket with a red-striped collar and neckerchief": ["cropped {c} jacket with a {c2}-striped collar and neckerchief", "black", "red"], "white faux-fur shrug with fluffy cuffs": ["faux-fur shrug with fluffy cuffs", "white", null], "long black coat with fur-trimmed cuffs, worn open off the shoulders": ["long {c} coat with fur-trimmed cuffs, worn open off the shoulders", "black", null], "black fur boa draped over the arms": ["fur boa draped over the arms", "black", null], "long black hooded robe with green lining": ["long {c} hooded robe with {c2} lining", "black", "green"], "black hooded robe with green lining, worn open off the shoulders": ["hooded robe with {c2} lining, worn open off the shoulders", "black", "green"], "long white cloak with a fur-trimmed collar": ["long {c} cloak with a fur-trimmed collar", "white", null]}, "belt": {"gold-buckled belt": ["{c2}-buckled belt", null, "gold"], "wide gold belt": ["wide {c} belt", "gold", null], "wide gold harness belt": ["wide {c} harness belt", "gold", null]}, "waistAccessory": {"golden sash tied at the waist": ["sash tied at the waist", "gold", null], "golden sash tied low": ["sash tied low", "gold", null], "golden rope belt": ["rope belt", "gold", null], "golden rope belt tied low": ["rope belt tied low", "gold", null]}, "neckAccessory": {"thin black tie": ["thin {c} tie", "black", null], "velvet choker with a blood-red gem": ["velvet choker with a {c2} gem", null, "blood red"], "gold collar necklace": ["collar necklace", "gold", null], "wide gold collar necklace": ["wide {c} collar necklace", "gold", null], "detached white collar with a bow tie": ["detached {c} collar with a bow tie", "white", null], "black fur collar": ["fur collar", "black", null], "black buckled choker": ["buckled choker", "black", null], "green and silver striped necktie": ["{c}-and-{c2} striped necktie", "green", "silver"], "silver torc necklace": ["torc necklace", "silver", null]}, "wristAccessory": {"silver bracers": ["bracers", "silver", null], "gold cuffs": ["cuffs", "gold", null], "gold bracelets": ["bracelets", "gold", null], "gold arm cuffs": ["arm cuffs", "gold", null], "fluffy white wrist cuffs with small butterfly-wing accents": ["fluffy {c} wrist cuffs with small butterfly-wing accents", "white", null], "orange silicone wristband": ["silicone wristband", "orange", null], "red-and-white armband": ["{c}-and-{c2} armband", "red", "white"], "black fur wrist cuffs": ["fur wrist cuffs", "black", null], "gold armlets": ["armlets", "gold", null]}, "headwear": {"nurse cap with a small red cross": ["nurse cap with a small {c2} cross", null, "red"], "pilot cap with gold wings": ["pilot cap with {c} wings", "gold", null], "white officer cap": ["officer cap", "white", null], "gold halo headband": ["halo headband", "gold", null], "small green stem hat": ["small {c} stem hat", "green", null], "slim silver circlet": ["slim {c} circlet", "silver", null], "gold crown": ["crown", "gold", null], "winged silver helm": ["winged {c} helm", "silver", null], "slim golden circlet": ["slim {c} circlet", "gold", null], "gold headdress band": ["headdress band", "gold", null], "wide-brim white sun hat with a gold laurel-leaf pin": ["wide-brim {c} sun hat with a {c2} laurel-leaf pin", "white", "gold"], "white bunny-ear headband with a thin gold halo ring": ["bunny-ear headband with a thin {c2} halo ring", "white", "gold"], "black bunny-ear headband with a satin bow": ["bunny-ear headband with a satin bow", "black", null], "red lifeguard cap with small bunny ears": ["lifeguard cap with small bunny ears", "red", null], "black curved hair ornaments with gold bands": ["curved hair ornaments with {c2} bands", "black", "gold"], "navy and white striped hair bow headband": ["{c}-and-{c2} striped hair bow headband", "navy", "white"]}, "gloves": {"white cotton work gloves": ["cotton work gloves", "white", null], "white satin gloves": ["satin gloves", "white", null], "short white gloves": ["short {c} gloves", "white", null]}, "tagCharm": {"gold wings badge": ["wings badge", "gold", null], "gold anchor pin": ["anchor pin", "gold", null]}, "hipAccessory": {"silver chain draped at the hip": ["chain draped at the hip", "silver", null]}, "detailOne": {"gold buttons": ["{c} buttons", "gold", null], "black satin trim with a small claw-mark emblem": ["{c} satin trim with a small claw-mark emblem", "black", null], "pink trim": ["{c} trim", "pink", null], "red trim": ["{c} trim", "red", null], "silver buttons": ["{c} buttons", "silver", null], "gold epaulettes": ["{c} epaulettes", "gold", null], "white collar": ["{c} collar", "white", null], "white stripes": ["{c} stripes", "white", null], "gold star embroidery": ["{c} star embroidery", "gold", null], "black trim": ["{c} trim", "black", null], "gold trim": ["{c} trim", "gold", null], "black stitched face": ["{c} stitched face", "black", null], "silver web embroidery": ["{c} web embroidery", "silver", null], "silver embroidery": ["{c} embroidery", "silver", null], "gold embroidery": ["{c} embroidery", "gold", null], "gold sunburst crest": ["{c} sunburst crest", "gold", null], "silver rune embroidery": ["{c} rune embroidery", "silver", null], "violet glow embroidery": ["{c} glow embroidery", "violet", null], "silver buckles": ["{c} buckles", "silver", null], "silver wing motif": ["{c} wing motif", "silver", null], "white fur trim": ["{c} fur trim", "white", null], "black spots": ["{c} spots", "black", null], "gold emblem": ["{c} emblem", "gold", null], "white polka dots": ["{c} polka dots", "white", null], "white crest embroidery": ["{c} crest embroidery", "white", null], "gold bell charms": ["{c} bell charms", "gold", null], "bronze studs": ["{c} studs", "bronze", null], "white waistband": ["{c} waistband", "white", null], "gold bells": ["{c} bells", "gold", null], "red rose accents": ["{c} rose accents", "red", null], "gold ring accents": ["{c} ring accents", "gold", null]}, "detailTwo": {"layered black fabric": ["layered {c} fabric", "black", null], "gold shoulder stripes": ["{c} shoulder stripes", "gold", null]}, "detailThree": {"washed black look": ["washed {c} look", "black", null], "cream-smudged, glossy look": ["{c}-smudged, glossy look", "cream", null], "polished silver finish": ["polished {c} finish", "silver", null], "polished, glistening silver finish": ["polished, glistening {c} finish", "silver", null]}, "earAccessory": {"small gold hoop earrings": ["small {c} hoop earrings", "gold", null], "drop earrings with ruby stones": ["drop earrings with {c} stones", "ruby", null], "long silver spike earrings": ["long {c} spike earrings", "silver", null]}, "ringAccessory": {"delicate gold rings": ["delicate {c} rings", "gold", null], "stacked silver rings": ["stacked {c} rings", "silver", null], "thin silver band rings": ["thin {c} band rings", "silver", null]}, "pocketItem": {"red bandana tucked into a back pocket": ["bandana tucked into a back pocket", "red", null]}, "loopItem": {"white plumbing company ID tag hanging from a belt loop": ["plumbing company ID tag hanging from a belt loop", "white", null]}, "thighAccessory": {"black elastic garter band": ["elastic garter band", "black", null], "red-and-white buckled thigh strap": ["{c}-and-{c2} buckled thigh strap", "red", "white"], "red first-aid pouch strapped to the thigh": ["first-aid pouch strapped to the thigh", "red", null], "red thigh ribbon with a small cross charm and gauze bandage": ["thigh ribbon with a small cross charm and gauze bandage", "red", null]}, "maskAccessory": {"gold-lined eye makeup piece": ["{c2}-lined eye makeup piece", null, "gold"]}, "shoulderPiece": {"single bronze pauldron": ["single {c} pauldron", "bronze", null]}},CMAP={"markings": {"honey-gold freckles across the nose and cheeks": ["{c} freckles across the nose and cheeks", "markingColor", "honey gold"], "dense honey-gold freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones": ["dense {c} freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones", "markingColor", "honey gold"], "gold leaf flecks across the cheeks": ["metallic {c} flecks across the cheeks", "markingColor", "gold"], "gold leaf flecks across the collarbones": ["metallic {c} flecks across the collarbones", "markingColor", "gold"], "gold leaf flecks over the shoulders": ["metallic {c} flecks over the shoulders", "markingColor", "gold"], "kintsugi-style golden cracks across the cheeks": ["kintsugi-style {c} cracks across the cheeks", "markingColor", "gold"], "kintsugi-style golden cracks down the arms": ["kintsugi-style {c} cracks down the arms", "markingColor", "gold"], "kintsugi-style golden cracks over the shoulders": ["kintsugi-style {c} cracks over the shoulders", "markingColor", "gold"], "fox-like red streaks at the outer corners of the eyes": ["fox-like {c} streaks at the outer corners of the eyes", "markingColor", "red"]}, "skinFinish": {"natural skin texture with a smooth, golden glow": ["natural skin texture with a smooth, {c} glow", "finishColor", "gold"]}, "faceMark": {"a vertical red mark on the lower lip": ["a vertical {c} mark on the lower lip", "faceMarkColor", "red"], "red fox-like streaks at the outer eye corners": ["{c} fox-like streaks at the outer eye corners", "faceMarkColor", "red"], "a faint golden third-eye mark": ["a faint {c} third-eye mark", "faceMarkColor", "gold"]}, "mouthShape": {"thin-to-medium natural lips in a soft pink": ["thin-to-medium natural lips in a soft {c}", "mouthShapeColor", "pink"], "naturally full pink lips": ["naturally full {c} lips", "mouthShapeColor", "pink"], "full, plush pink lips": ["full, plush {c} lips", "mouthShapeColor", "pink"], "soft natural pink lips": ["soft natural {c} lips", "mouthShapeColor", "pink"], "soft, naturally pink lips": ["soft, naturally {c} lips", "mouthShapeColor", "pink"], "dark, black-tinted lips": ["dark, {c}-tinted lips", "mouthShapeColor", "black"], "pale, frost-blue lips": ["pale, frost-{c} lips", "mouthShapeColor", "blue"], "metallic gold-tinted lips": ["metallic {c}-tinted lips", "mouthShapeColor", "gold"]}, "noseShape": {"small, pink, cat-like nose": ["small, {c}, cat-like nose", "noseShapeColor", "pink"], "small, black, fox-like nose": ["small, {c}, fox-like nose", "noseShapeColor", "black"], "soft, round, pink bunny-like nose": ["soft, round, {c} bunny-like nose", "noseShapeColor", "pink"], "small pig-like snub nose with a round pink tip": ["small pig-like snub nose with a round {c} tip", "noseShapeColor", "pink"]}, "browShape": {"thin blonde eyebrows": ["thin {c} eyebrows", "browShapeColor", "blonde"], "defined, gently arched dark-brown brows": ["defined, gently arched {c} brows", "browShapeColor", "dark brown"], "thin brows with a faint silver shimmer": ["thin brows with a faint {c} shimmer", "browShapeColor", "silver"]}, "lipFinish": {"smudged red lipstick": ["smudged {c} lipstick", "lipFinishColor", "red"], "deep red seductive lips": ["deep {c} seductive lips", "lipFinishColor", "red"]}, "irisDetail": {"golden flecks near the pupil": ["{c} flecks near the pupil", "irisDetailColor", "gold"]}, "lashNatural": {"short, straight black eyelashes": ["short, straight {c} eyelashes", "lashNaturalColor", "black"], "gold-tipped lashes": ["{c}-tipped lashes", "lashNaturalColor", "gold"]}, "auraStyle": {"golden radiance": ["{c} radiance", "auraStyleColor", "gold"]}, "hairBlend": {"soft peach transitions between the layers, with individual strands blending in subtle gradients": ["soft {c} transitions between the layers, with individual strands blending in subtle gradients", "hairBlendColor", "peach"], "a milky-white underlayer and creamsicle-orange inner hair, with pale-gold highlight strands": ["a pale underlayer and bright inner hair, with highlight strands"], "blue, white and orange gradient streaks through the hair": ["multicolored gradient streaks through the hair"], "a milky-white underlayer, creamsicle-orange inner hair, pale-gold highlight strands and blue, white and orange gradient streaks": ["a pale underlayer, bright inner hair, highlight strands and multicolored gradient streaks"], "silver streaks woven through the dark hair": ["{c} streaks woven through the dark hair", "hairBlendColor", "silver"]}, "nailStyle": {"long almond fingernails painted black": ["long almond fingernails", "nailColor", "black"]}, "earStyle": {"large pointed fin ears with cream webbed membranes": ["large pointed fin ears with {c} webbed membranes", "earStyleColor", "cream"], "large pointed fox ears with cream inner fur": ["large pointed fox ears with {c} inner fur", "earStyleColor", "cream"]}, "tailStyle": {"large bushy cream-tipped fox tail": ["large bushy {c}-tipped fox tail", "tailStyleColor", "cream"], "large bushy tail with a cream tip": ["large bushy tail with a {c} tip", "tailStyleColor", "cream"]}, "neckFeature": {"a thick cream fur ruff around the neck": ["a thick {c} fur ruff around the neck", "neckFeatureColor", "cream"], "a frilled cream fin collar around the neck": ["a frilled {c} fin collar around the neck", "neckFeatureColor", "cream"], "a jagged cream fur ruff around the neck": ["a jagged {c} fur ruff around the neck", "neckFeatureColor", "cream"], "a huge fluffy cream fur ruff around the neck": ["a huge fluffy {c} fur ruff around the neck", "neckFeatureColor", "cream"], "a soft cream bow-like fur ruff around the neck": ["a soft {c} bow-like fur ruff around the neck", "neckFeatureColor", "cream"], "a thick white fur ruff around the neck": ["a thick {c} fur ruff around the neck", "neckFeatureColor", "white"]}, "crestStyle": {"a red gem set in the center of the forehead": ["a {c} gem set in the center of the forehead", "crestStyleColor", "red"], "two long ribbon-like feelers with pink bows": ["two long ribbon-like feelers with {c} bows", "crestStyleColor", "pink"]}, "hornStyle": {"large feathery white moth antennae": ["large feathery {c} moth antennae", "hornStyleColor", "white"]}, "wingStyle": {"large white moth wings with soft eyespot patterns": ["large {c} moth wings with soft eyespot patterns", "wingStyleColor", "white"]}, "armShape": {"slender, jointed insect-like arms covered in fine white fur": ["slender, jointed insect-like arms covered in fine {c} fur", "armShapeColor", "white"]}, "scleraStyle": {"black sclera": ["{c} sclera", "scleraColor", "black"], "solid black eyes with no visible whites": ["solid {c} eyes with no visible whites", "scleraColor", "black"], "red sclera": ["{c} sclera", "scleraColor", "red"], "golden sclera": ["{c} sclera", "scleraColor", "gold"], "glowing white sclera": ["glowing {c} sclera", "scleraColor", "white"], "dark gray sclera": ["{c} sclera", "scleraColor", "dark gray"]}},SPSTR=[["a small feline muzzle with a pink nose and whiskers", "a small feline muzzle with a {k:noseColor:pink} nose and whiskers"], ["a short dog muzzle with a black nose", "a short dog muzzle with a {k:noseColor:black} nose"], ["a full canine snout with a wet black nose and loose jowls", "a full canine snout with a wet {k:noseColor:black} nose and loose jowls"], ["a narrow fox muzzle with a small black nose", "a narrow fox muzzle with a small {k:noseColor:black} nose"], ["a long wolf muzzle with a black nose", "a long wolf muzzle with a {k:noseColor:black} nose"], ["a small bunny muzzle with a pink nose and a split upper lip", "a small bunny muzzle with a {k:noseColor:pink} nose and a split upper lip"], ["a broad cow muzzle with a pink nose", "a broad cow muzzle with a {k:noseColor:pink} nose"], ["a short upturned snout with a pink nose", "a short upturned snout with a {k:noseColor:pink} nose"], ["a slim cat-like muzzle with a small pink nose", "a slim cat-like muzzle with a small {k:noseColor:pink} nose"], ["a full slim cat-like snout with a small pink nose and whiskers", "a full slim cat-like snout with a small {k:noseColor:pink} nose and whiskers"], ["dexterous black-padded paw hands", "dexterous {k:noseColor:black}-padded paw hands"], ["darker {c2} paws and a red gem on her forehead", "darker {c2} paws and a {k:crestStyleColor:red} gem on her forehead"]];
  const okc=h=>!!h&&(COLORS[h]||SKIN_HEX[h]||Sprite.hexFor(h));
  /* 1. option lists */
  Object.entries(OMAP).forEach(([f,m])=>{const L=OUTFIT[f];if(!L)return;
    Object.entries(m).forEach(([old,[nv]])=>{const i=L.findIndex(x=>x.v===old);if(i<0)return;
      const j=L.findIndex((x,k)=>k!==i&&x.v===nv);
      if(j>=0){const a=L[j],b=L[i];a.t=[...new Set((a.t||"").split("").concat((b.t||"").split("")))].join("");a.f=[...new Set((a.f||"").split(",").concat((b.f||"").split(",")).filter(Boolean))].join(",");L.splice(i,1)}
      else L[i].v=nv})});
  Object.entries(CMAP).forEach(([f,m])=>{if(!CHAR[f])CHAR[f]=[];const L=CHAR[f];
    Object.entries(m).forEach(([old,[nv]])=>{const i=L.findIndex(x=>x[0]===old);if(i<0)return;
      const j=L.findIndex((x,k)=>k!==i&&x[0]===nv);if(j>=0)L.splice(i,1);else L[i][0]=nv})});
  /* 2. the new sclera color field */
  if(!CHAR.scleraStyle.some(x=>x[0]==="{c} sclera"))CHAR.scleraStyle.push(["{c} sclera","Eye whites"]);
  ["solid {c} eyes with no visible whites","glowing {c} sclera"].forEach(v=>{if(!CHAR.scleraStyle.some(x=>x[0]===v))CHAR.scleraStyle.push([v,"Eye whites"])});
  Object.assign(LABELS,{scleraColor:"Sclera color"});
  STEP_FIELDS.face.splice(STEP_FIELDS.face.indexOf("scleraStyle")+1,0,"scleraColor");
  EYE_FIELDS.push("scleraColor");
  /* 3. rename helpers applied to every preset and starting point */
  const rItem=(f,t)=>{const r=OMAP[f]&&OMAP[f][t[0]];if(!r)return t;const n=t.slice();n[0]=r[0];if((n[1]==="-"||n[1]===""||n[1]==null)&&okc(r[1]))n[1]=r[1];if(r[2]&&okc(r[2])&&!n[3]){n[2]=n[2]||"";n[3]=r[2]}return n};
  const rDet=(f,v)=>(OMAP[f]&&OMAP[f][v])?OMAP[f][v][0]:v;
  const rChar=c=>{if(!c)return;Object.keys(c).forEach(f=>{const m=CMAP[f]&&CMAP[f][c[f]];if(!m)return;c[f]=m[0];if(m[1]&&!c[m[1]]&&okc(m[2]))c[m[1]]=m[2]})};
  const rOut=o=>{if(!o)return;Object.keys(o.items||{}).forEach(f=>{o.items[f]=rItem(f,o.items[f])});Object.keys(o.details||{}).forEach(f=>{const r=OMAP[f]&&OMAP[f][o.details[f]];if(!r)return;o.details[f]=r[0];o.dcol=o.dcol||{};if(!o.dcol[f]&&okc(r[1]))o.dcol[f]=r[1]})};
  TEMPLATES.forEach(t=>{rChar(t.c);rOut(t.outfit)});
  OUTFIT_PRESETS.forEach(p=>rOut(p));
  [BODY_PRESETS,FACE_PRESETS,EYE_PRESETS,MAKEUP_PRESETS].forEach(P=>Object.values(P).forEach(p=>rChar(p.v||p)));
  Object.values(HERITAGE).forEach(p=>rChar(p.v));
  Object.values(AUTO_TRAITS).forEach(a=>rChar(a));
  /* species sentences */
  const swap=o=>{if(typeof o==="string"){let r=o;SPSTR.forEach(([a,b])=>{if(r===a)r=b});return r}if(Array.isArray(o))return o.map(swap);if(o&&typeof o==="object"){Object.keys(o).forEach(k=>{o[k]=swap(o[k])});return o}return o};
  swap(ANIMALS.families);swap(ANIMALS.species);
  /* 4. saved characters and undo history from earlier versions */
  const _norm=normalize;
  normalize=function(st){const o=_norm(st);rChar(o.c);o.outfits.forEach(x=>{Object.keys(x.items).forEach(f=>{const it=x.items[f];if(!it||!it.v)return;const r=OMAP[f]&&OMAP[f][it.v];if(!r)return;it.v=r[0];if((!it.c||it.c==="-"||it.c==="auto")&&okc(r[1]))it.c=r[1];if(r[2]&&okc(r[2])&&!it.c2)it.c2=r[2]});x.dcol=x.dcol||{};Object.keys(x.details).forEach(f=>{const r=OMAP[f]&&OMAP[f][x.details[f]];if(!r)return;x.details[f]=r[0];if(!x.dcol[f]&&okc(r[1]))x.dcol[f]=r[1]})});return o};
})();
