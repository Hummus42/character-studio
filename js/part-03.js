/* ---- v50: color slots inside option text ---- */
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
{const _as=animalSentence;animalSentence=function(){return _as().replace(/\{k:(\w+):([^}]+)\}/g,(m,k,d)=>g(k)||d)}}
LABELS.noseColor="Nose and pad color";
if(STEP_FIELDS.concept&&!STEP_FIELDS.concept.includes("noseColor"))STEP_FIELDS.concept.push("noseColor");

/* ---- v51: starting points follow their own palette; randomizers fill the new color slots ---- */
(function(){
  const SLOTK=["primary","secondary","third","accent","extra"];
  const link=(pal,v)=>{if(!v||v[0]==="@"||v==="-"||v==="auto")return v;const k=SLOTK.find(s=>pal[s]&&String(pal[s]).toLowerCase()===String(v).toLowerCase());return k?"@"+k:v};
  TEMPLATES.forEach(t=>{
    const pal=t.pal||{};
    Object.keys(t.c).forEach(k=>{if(/Color$/.test(k)&&typeof t.c[k]==="string")t.c[k]=link(pal,t.c[k])});
    const o=t.outfit||{};
    Object.keys(o.items||{}).forEach(f=>{const it=o.items[f];if(it[1])it[1]=link(pal,it[1]);if(it[3])it[3]=link(pal,it[3])});
    {const st=t.c.subjectType||"",noun=(AGE_NOUN[t.c.age||"woman"]||["woman"])[0],at=AUTO_TRAITS[st+" "+noun]||AUTO_TRAITS[st+"-"+noun];
      if(at)Object.keys(at).forEach(k=>{if(/Color$/.test(k)&&!t.c[k]&&!t.c[k.slice(0,-5)]){const l=link(pal,at[k]);if(l!==at[k])t.c[k]=l}})}
    if(o.dcol)Object.keys(o.dcol).forEach(f=>{o.dcol[f]=link(pal,o.dcol[f])});
  });
  const vb=TEMPLATES.find(t=>t.id==="vaporblue");if(vb&&vb.outfit.items.top&&vb.outfit.items.top[1]==="navy")vb.outfit.items.top[1]="@secondary";
})();

/* ---- v52: accent and detail colors follow the palette unless you pick one ---- */
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
(function(){
  const metal=/gold|silver|bronze|copper|platinum/i;
  OUTFIT_PRESETS.forEach(p=>{
    Object.values(p.items).forEach(it=>{if(it[3]&&!metal.test(it[3]))it[3]=undefined});
    if(p.dcol)Object.keys(p.dcol).forEach(f=>{if(!metal.test(p.dcol[f]))delete p.dcol[f]});
  });
})();
const presetAvailable=p=>Policy.presetAllowed(p);
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

/* ----- outfit ----- */
const COVER=[["","Any coverage"],["C","Conservative"],["U","Cute"],["S","Sexy"],["L","Lewd"]];
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
/* ---------- outfit presets and randomizer ---------- */
const pick1=a=>a[Math.floor(Math.random()*a.length)];
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

/* ----- finish ----- */
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
const RENDER={concept:stepConcept,palette:stepPalette,face:stepFace,hair:stepHair,body:stepBody,makeup:stepMakeup,outfit:stepOutfit,finish:stepFinish};

/* ---------- main + rail ---------- */
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

/* ---------- color key ---------- */
function renderStage(){
  const key=$("#colorKey");key.textContent="";
  const names=SLOTS.map(([k])=>S.pal[k]).filter(Boolean);
  const bar=h("span",{class:"mbar"},...SLOTS.map(([k],i)=>{const hx=slotHex(k);return h("i",{class:"ms"+(hx?"":" e"),style:hx?`flex-grow:${PAL_W[i]};background:${hx}`:null})}));
  key.append(h("button",{type:"button",class:"mband"+(names.length?"":" empty"),title:"Open the Palette step",
    "aria-label":names.length?`Palette: ${names.join(", ")}. Open the Palette step.`:"No palette yet. Open the Palette step.",
    onclick:()=>goStep("palette")},bar,h("span",{class:"mnames",text:names.length?names.join(", "):"No palette yet. Choose colors in the Palette step."})));
  $("#nameInput").value!==S.name&&($("#nameInput").value=S.name);
}

/* ---------- side tabs ---------- */
/* v127: image model token budgets (V5 Full about 1471, V5 Curated about 703, V4 and V4.5 about 512) */
const NAI_MODELS={v5:{label:"V5",max:1471},v5c:{label:"V5 Curated",max:703},v45:{label:"V4 / V4.5",max:512}};
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
hooks.change=()=>{renderRail();renderSide();if(typing!=="main")renderMain()};

/* ---------- dialogs ---------- */
/* ---- v60: "Horned metalhead" starting point and the options it needs ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const addO=(f,v,t,fam,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(g)it.g=g;OUTFIT[f].push(it)}};

  /* character options */
  addC("hornStyle","asymmetrical horns with one large curved horn and one small ridged horn","Horns / Antlers / Antennae");
  addC("hornStyle","bat-wing-shaped horns","Horns / Antlers / Antennae");
  addC("hornStyle","one large ridged horn curving back over one side of the head","Horns / Antlers / Antennae");
  addC("expression","wild open-mouthed fanged laugh","Fantasy and animal");
  addC("expression","wide gritted-teeth fanged grin","Fantasy and animal");
  addC("faceAccents","tear-streak makeup running down from one eye","Accents");
  addC("markings","a rune tattoo along the neck","Tattoos (adult)");
  addC("markings","a tribal tattoo across the lower belly","Tattoos (adult)");
  addC("markings","a rune tattoo along the neck and a tribal tattoo across the lower belly","Tattoos (adult)");
  addC("markings","tribal tattoos across the lower belly and down one thigh","Tattoos (adult)");
  addC("nailStyle","long stiletto fingernails","Nails");
  addC("nailStyle","long pointed claw-shaped fingernails","Nails");
  addC("hairStyle","high side ponytail","Ponytails");
  addC("hairStyle","high side ponytail with long loose strands","Ponytails");

  /* outfit options */
  addO("top","oversized off-shoulder band tee knotted at the hem","CUS","edgy");
  addO("top","oversized band tee with safety pins and frayed edges","CU","edgy");
  addO("top","cropped band tank top","CUS","edgy");
  addO("outerwear","cropped studded leather jacket covered in enamel pins","CU","edgy");
  addO("bottom","ripped denim shorts","CUS","edgy");
  addO("bottom","shorts with zipper details","CUS","edgy");
  addO("belt","wide belt with {c2} pyramid studs","CUS","edgy");
  addO("neckAccessory","layered spiked chokers and chain necklaces with a pentagram pendant","US","edgy,gothic");
  addO("wristAccessory","stacked spiked leather wristbands","CUS","edgy");
  addO("gloves","{c}-and-{c2} striped fingerless arm warmers","CU","edgy");
  addO("earAccessory","stacked ear piercings with a fine linking chain","CUS","edgy","Earrings");
  addO("thighAccessory","studded thigh strap with hanging chains","CUS","edgy","Bands and chains");
  addO("thighAccessory","buckled thigh strap with a heart-shaped ring","CUS","edgy","Bands and chains");
  addO("hipAccessory","heavy chains on the belt looped to the hip","CUS","edgy");
  addO("legwear","fishnet tights","CUS","edgy,gothic");
  addO("detailThree","distressed {c} blackletter logo print","CU","edgy");

  const T={id:"metalhead",name:"Horned metalhead",
    blurb:"Black hair with a cobalt underlayer in a high side ponytail, asymmetrical black horns, crimson slit-pupil eyes, a fanged grin, a tear-streak and neck and belly tattoos. Three studded, chained band-tee outfits.",
    pal:{"primary":"black","secondary":"cobalt blue","third":"charcoal gray","accent":"crimson red","extra":"silver"},
    c:{"age":"woman","subjectType":"demon",
      "faceShape":"elegant angular face","expression":"wide gritted-teeth fanged grin","browShape":"defined brows","noseShape":"small straight nose","mouthShape":"soft full lips",
      "eyeConfig":"matching","eyeShape":"sharp, slightly hooded eyes","pupilStyle":"vertical slit pupils","eyeOne":"@accent","eyeTwo":"@accent",
      "hairStyle":"high side ponytail with long loose strands","hairLength":"waist-length","hairTexture":"sleek","bangs":"long side bangs over one eye","hairBase":"@primary","hairUnderlayer":"@secondary",
      "hornStyle":"asymmetrical horns with one large curved horn and one small ridged horn","earStyle":"slightly pointed ears","tailStyle":"none","wingStyle":"none","fangClawStyle":"sharp fangs","auraStyle":"none","fantasyAccentColor":"@primary",
      "skinTone":"porcelain","markings":"a rune tattoo along the neck and a tribal tattoo across the lower belly",
      "makeupStyle":"gothic makeup","eyelinerStyle":"smudged eyeliner","faceAccents":"tear-streak makeup running down from one eye","makeupColor":"@primary",
      "nailStyle":"long stiletto fingernails","nailColor":"@primary",
      "_body":"slender"},
    outfit:{oname:"Band tee",look:"edgy",items:{
        "top":["oversized off-shoulder band tee knotted at the hem","@primary"],
        "bottom":["ripped denim shorts","@third"],
        "belt":["wide belt with {c2} pyramid studs","@primary","","@extra"],
        "neckAccessory":["layered spiked chokers and chain necklaces with a pentagram pendant","@extra"],
        "wristAccessory":["stacked spiked leather wristbands","@primary"],
        "ringAccessory":["stacked {c} rings","@extra"],
        "earAccessory":["stacked ear piercings with a fine linking chain","@extra"],
        "thighAccessory":["studded thigh strap with hanging chains","@primary"],
        "hipAccessory":["heavy chains on the belt looped to the hip","@extra"]},
      details:{"detailTwo":"deliberately torn edges","detailThree":"distressed {c} blackletter logo print"},dcol:{"detailThree":"@extra"}},
    more:[
      {oname:"Plaid and warmers",look:"edgy",items:{
        "top":["oversized band tee with safety pins and frayed edges","@primary"],
        "bottom":["plaid mini skirt","@accent"],
        "gloves":["{c}-and-{c2} striped fingerless arm warmers","@primary","","@extra"],
        "legwear":["fishnet tights","@primary"],
        "neckAccessory":["spiked choker","@primary"],
        "earAccessory":["chain-link ear cuffs","@extra"],
        "thighAccessory":["buckled thigh strap with a heart-shaped ring","@extra"]},
        details:{},dcol:{}},
      {oname:"Studded jacket",look:"edgy",items:{
        "top":["cropped band tank top","@primary"],
        "outerwear":["cropped studded leather jacket covered in enamel pins","@primary"],
        "bottom":["shorts with zipper details","@third"],
        "belt":["utility belt with small pouches","brown"],
        "neckAccessory":["chain necklace","@extra"],
        "wristAccessory":["chain bracelet","@extra"],
        "eyewear":["rimless glasses","-"],
        "ringAccessory":["stacked {c} rings","@extra"],
        "earAccessory":["stacked ear piercings with a fine linking chain","@extra"],
        "thighAccessory":["studded leather thigh band","@primary"]},
        details:{},dcol:{}}
    ]};
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const sg=PRESET_GROUPS.start.find(g=>g.label==="Stylish");if(sg&&!sg.keys.includes(T.id))sg.keys.push(T.id);
})();

/* ---- v61: ten beach and ten at-home outfit presets, and presets that follow the palette ---- */
(function(){
  const addO=(f,v,t,fam,s)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;OUTFIT[f].push(it)}};
  /* beach pieces */
  addO("outerwear","airy cotton beach dress","CU","resort","s");
  addO("top","short-sleeve rash guard","CU","resort,sporty","s");
  addO("top","high-cut one-piece swimsuit with a plunging front","LS","resort,boudoir","s");
  addO("top","micro triangle bikini top","L","resort,boudoir","s");
  addO("top","layered body chains over the bare chest","L","boudoir,resort","s");
  addO("bottom","board shorts","CU","resort,sporty","s");
  addO("bottom","micro thong bikini bottoms","L","resort,boudoir","s");
  addO("bottom","sheer sarong tied low on the hips","L","resort,boudoir","s");
  addO("waistAccessory","delicate body chain draped around the waist","CUS","resort,boudoir","s");
  /* at-home pieces */
  addO("top","button-up pajama top","CU","casual,sweet");
  addO("top","short lace chemise","LS","boudoir");
  addO("top","sheer mesh teddy with open cut-outs","L","boudoir");
  addO("top","no clothing at all (fully nude)","L","boudoir");
  addO("bottom","fleece lounge shorts","CU","casual","w");
  addO("bottom","matching pajama shorts","CU","casual,sweet");
  addO("bottom","satin sleep shorts","CUS","boudoir");
  addO("outerwear","fluffy bathrobe","CU","casual","w");
  addO("outerwear","small bath towel held loosely in front","L","boudoir");
  addO("legwear","fuzzy sleep socks","CU","casual,sweet","w");
  addO("headwear","silk sleep mask pushed up on the forehead","CU","casual,boudoir");
  addO("headwear","towel wrapped around the hair","CU","casual");
  addO("headwear","fabric hair scrunchie","CU","casual");

  const P=(id,name,blurb,look,season,adult,pal,items,details)=>({id,name,blurb,look,season,...(adult?{adultOnly:true}:{}),pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items,details:details||{}});
  const NEW=[
    P("bch_cover","Sundress over a swimsuit","One-piece swimsuit under an airy beach dress, sun hat, shell earrings and a straw bag.","resort","s",false,["ivory","sky blue","coral","gold","tan"],
      {top:["one-piece swimsuit with a scoop back","@secondary"],outerwear:["airy cotton beach dress","auto"],headwear:["wide-brim sun hat","-"],eyewear:["oversized round sunglasses","-"],earAccessory:["shell earrings","-"],wristAccessory:["stacked beaded bracelets","@accent"],legwear:["beaded anklet","@accent"],hipAccessory:["straw beach bag","-"]},{detailTwo:"breezy loose fit"}),
    P("bch_surf","Surf day","Rash guard, board shorts, sport sunglasses and a shell necklace.","sporty","s",false,["black","teal","coral","white","silver"],
      {top:["short-sleeve rash guard","auto"],bottom:["board shorts","@secondary"],headwear:["sports headband","@accent"],eyewear:["sport sunglasses","-"],neckAccessory:["shell necklace","-"],wristAccessory:["fitness tracker","@accent"],tagCharm:["zip pull charm","@accent"]},{detailTwo:"athletic fit",detailThree:"swimwear stretch fabric"}),
    P("bch_ruffle","Ruffle bikini","Frilled halter bikini with a ribbon choker, flower earrings, heart sunglasses and a sun hat.","resort","s",false,["rose pink","white","mint green","coral","gold"],
      {top:["frilled halter bikini top with a front ribbon tie","auto"],bottom:["frilled bikini bottoms","auto"],headwear:["wide-brim sun hat","-"],eyewear:["heart-shaped sunglasses","@accent"],neckAccessory:["ribbon choker","@accent"],earAccessory:["flower earrings","@accent"],legwear:["beaded anklet","@accent"]},{detailOne:"frilled trim"}),
    P("bch_sarong","Sarong and triangle top","Triangle bikini top, sarong-style bottoms, a hip sarong and a sheer kimono cover-up. Adult only.","resort","s",true,["white","turquoise","gold","coral","tan"],
      {top:["triangle bikini top","auto"],bottom:["sarong-style swim bottoms","auto"],waistAccessory:["sarong tied at the hips","@accent"],outerwear:["sheer kimono cover-up","@third"],eyewear:["cat-eye sunglasses","-"],neckAccessory:["shell necklace","-"],earAccessory:["shell earrings","-"],legwear:["beaded anklet","@accent"]}),
    P("bch_highcut","High-cut swimsuit","High-cut one-piece with a plunging front, a body chain at the waist and hoop earrings, with a wet, clinging finish. Adult only.","resort","s",true,["navy blue","white","coral","gold","silver"],
      {top:["high-cut one-piece swimsuit with a plunging front","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],eyewear:["oversized sunglasses","-"],earAccessory:["chunky hoop earrings","@accent"]},{detailThree:"wet clinging fabric"}),
    P("bch_tie","Side-tie bikini and body chain","Triangle top, side-tie bottoms, a draped body chain, an anklet and sunglasses. Adult only.","resort","s",true,["coral","white","gold","turquoise","tan"],
      {top:["triangle bikini top","auto"],bottom:["side-tie bikini bottoms","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["oversized round sunglasses","-"]},{detailTwo:"knotted front"}),
    P("bch_wet","Wet and clinging","Bandeau top and high-cut bottoms in water-soaked, see-through fabric with a shell necklace. Adult only.","resort","s",true,["white","black","sky blue","silver","gold"],
      {top:["bandeau bikini top","auto"],bottom:["high-cut bikini bottoms","auto"],neckAccessory:["shell necklace","-"],eyewear:["sunglasses","-"]},{detailThree:"water-soaked see-through fabric"}),
    P("bch_string","String bikini","String halter top and string bottoms with a waist chain and an anklet. Adult only.","resort","s",true,["black","crimson red","gold","white","silver"],
      {top:["string halter top","auto"],bottom:["string bikini bottoms","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["sunglasses","-"]}),
    P("bch_micro","Micro bikini","Micro triangle top and micro thong bottoms in a wet, clinging finish with a waist chain. Adult only.","resort","s",true,["neon pink","black","electric blue","white","silver"],
      {top:["micro triangle bikini top","auto"],bottom:["micro thong bikini bottoms","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["sunglasses","-"]},{detailThree:"wet clinging fabric"}),
    P("bch_bare","Chains and a sheer sarong","Layered body chains across the bare chest and a sheer sarong tied low, with nothing else. Adult only.","resort","s",true,["white","gold","turquoise","coral","sand"],
      {top:["layered body chains over the bare chest","@accent"],bottom:["sheer sarong tied low on the hips","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["oversized round sunglasses","-"]}),

    P("home_cozy","Cozy sweater and socks","Oversized knit, fleece lounge shorts, fuzzy socks and a hair scrunchie.","casual","w",false,["cream","dusty rose","camel","sage green","chocolate brown"],
      {top:["oversized cotton sweater","auto"],bottom:["fleece lounge shorts","auto"],legwear:["fuzzy sleep socks","@accent"],headwear:["fabric hair scrunchie","@accent"]},{detailThree:"ribbed knit texture"}),
    P("home_pj","Pajama set","Button-up pajama top and matching shorts, fuzzy socks and a sleep mask pushed up.","casual","",false,["lavender","white","powder blue","soft pink","silver"],
      {top:["button-up pajama top","auto"],bottom:["matching pajama shorts","auto"],legwear:["fuzzy sleep socks","@third"],headwear:["silk sleep mask pushed up on the forehead","@accent"]},{detailOne:"contrast piping"}),
    P("home_robe","Bathrobe and hair towel","Fluffy bathrobe over a ribbed tank, with a towel wrapped around wet hair and fuzzy socks.","casual","w",false,["white","sage green","cream","blush pink","tan"],
      {top:["ribbed knit tank top","auto"],outerwear:["fluffy bathrobe","auto"],headwear:["towel wrapped around the hair","@third"],legwear:["fuzzy sleep socks","@accent"]}),
    P("home_satin","Satin sleep set","Satin camisole, satin sleep shorts and a satin robe. Adult only.","boudoir","",true,["champagne","black","blush pink","rose gold","gold"],
      {top:["satin camisole","auto"],bottom:["satin sleep shorts","auto"],outerwear:["satin robe","@third"],headwear:["silk sleep mask pushed up on the forehead","@accent"]}),
    P("home_shirt","Oversized shirt and nothing else","Open oversized button-up shirt over cotton panties. Adult only.","boudoir","",true,["white","light blue","black","silver","gold"],
      {top:["oversized open button-up shirt","auto"],panties:["cotton bikini panties","@third"]},{detailTwo:"one shoulder slipping off"}),
    P("home_chemise","Lace chemise and robe","Short lace chemise, sheer lace robe and a lace thong. Adult only.","boudoir","",true,["ivory","black","burgundy","rose gold","silver"],
      {top:["short lace chemise","auto"],outerwear:["sheer lace robe","@third"],panties:["lace thong","@accent"]}),
    P("home_lingerie","Lace lingerie set","Lace balconette bra, string thong, garter-strap stockings and a lace choker. Adult only.","boudoir","",true,["black","burgundy","charcoal gray","crimson red","silver"],
      {bra:["lace balconette bra","auto"],panties:["string thong","auto"],legwear:["garter-strap stockings with lace tops","@secondary"],neckAccessory:["lace choker","@accent"]}),
    P("home_teddy","Sheer teddy","Sheer mesh teddy with open cut-outs, seamed thigh-highs and a velvet choker. Adult only.","boudoir","",true,["wine","black","mauve","gold","silver"],
      {top:["sheer mesh teddy with open cut-outs","auto"],legwear:["sheer seamed thigh-high stockings","@secondary"],neckAccessory:["velvet choker","@accent"]}),
    P("home_towel","Just a towel","A small bath towel held loosely in front, with nothing else. Adult only.","boudoir","",true,["white","blush pink","cream","gold","tan"],
      {outerwear:["small bath towel held loosely in front","@primary"]}),
    P("home_nude","Nothing at all","No clothing, with only stud earrings and thin rings. Adult only.","boudoir","",true,["rose gold","black","blush pink","ivory","gold"],
      {top:["no clothing at all (fully nude)","-"],earAccessory:["simple stud earrings","-"],ringAccessory:["thin rings","-"]})
  ];
  ["home_shirt","home_chemise","home_lingerie"].forEach(id=>{const p=NEW.find(x=>x.id===id);p.showUnder=true});
  const COLOR_WORDS=()=>COLOR_RX;
  NEW.forEach(p=>{
    Object.entries(p.items).forEach(([f,[v]])=>{
      if(!(OUTFIT[f]||[]).some(i=>i.v===v))throw new Error("preset "+p.id+": missing item "+f+" / "+v);
      if(COLOR_WORDS().test(v))throw new Error("color word in item name: "+v)});
    Object.values(p.pal).forEach(n=>{if(!COLORS[n])throw new Error("unknown palette color "+n)});
    if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p);
  });
  PRESET_GROUPS.outfit.push({label:"Beach, cute to bare",keys:NEW.filter(p=>/^bch_/.test(p.id)).map(p=>p.id)});
  PRESET_GROUPS.outfit.push({label:"At home, cozy to nude",keys:NEW.filter(p=>/^home_/.test(p.id)).map(p=>p.id)});
})();

/* ---- v61: every outfit preset carries its own five-color palette and follows yours ----
   Fixed color names become palette slots. Metals and leathers stay as they are.
   Loading a preset fills only the palette slots you left empty. */
const PRESET_PAL={
  cafe:["cream","chocolate brown","camel","dusty rose","silver"],
  preppy:["navy blue","cream","burgundy","forest green","gold"],
  picnic:["ivory","sage green","dusty rose","peach","gold"],
  velvet:["black","burgundy","plum","silver","gold"],
  punk:["black","crimson red","charcoal gray","silver","white"],
  neon:["black","electric blue","hot pink","neon green","silver"],
  gown:["black","ivory","silver","gold","white"],
  beach:["ivory","turquoise","coral","tan","gold"],
  gym:["charcoal gray","black","hot pink","electric blue","white"],
  sugar:["baby pink","white","baby blue","lavender","gold"],
  cuddle:["cream","lavender","powder blue","peach","soft pink"],
  lewdlace:["black","burgundy","charcoal gray","crimson red","silver"],
  lewdlatex:["black","crimson red","charcoal gray","silver","electric purple"]
};
let _presetsReady=false;
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
/* ---- v62: ten beach starting points, one for each beach outfit preset, and the options they need ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};

  /* character options */
  addC("impression","a stunning, sun-kissed beauty with Brazilian heritage and a radiant, carefree glow","Heritage");
  addC("impression","a strikingly beautiful, athletic island beauty with Polynesian and Pacific Islander heritage","Heritage");
  addC("impression","a flawlessly beautiful, camera-ready glow with Korean heritage","Heritage");
  addC("impression","a graceful, radiant island beauty with Thai and Vietnamese heritage","Heritage");
  addC("impression","a sophisticated, effortlessly stunning beauty with Southern European (Italian, Spanish and Greek) heritage","Heritage");
  addC("impression","a dazzling, carnival-bright beauty with Afro-Caribbean heritage","Heritage");
  addC("impression","an ethereal, mesmerizing beauty with Northern European (Scandinavian) heritage","Heritage");
  addC("impression","a magnetic, golden-hour beauty with North Indian and Punjabi heritage","Heritage");
  addC("impression","a vivid, head-turning beauty with Mexican and Central American (Mestiza) heritage","Heritage");
  addC("impression","a regal, radiant beauty with North African (Berber and Egyptian) heritage","Heritage");
  addC("skinFinish","sun-bronzed skin with a soft salt-water sheen","Glow and sheen");
  addC("hairTexture","wet and glossy","Texture");
  addC("hairTexture","salt-tousled waves","Texture");
  addC("hairMovement","falls in damp, sleek strands over the shoulders","Natural and realistic");
  addC("hairBlend","sun-bleached ends fading from the darker roots","Color blending");
  addC("expression","relaxed, sun-drenched smile","Natural");
  addC("expression","radiant, head-tilted smile","Natural");
  addC("makeupStyle","sun-bronzed makeup","Natural and realistic");
  addC("makeupStyle","golden-hour glow makeup","Natural and realistic");
  addC("faceAccents","a stripe of zinc sunscreen across the nose","Natural");

  /* outfit options */
  addO("earAccessory","{c} jhumka-style bell earrings","CUS","resort,cottage",null,"Earrings");
  addO("headwear","slim headband with a small sun-disc ornament","CU","resort");
  addO("neckAccessory","wide beaded collar necklace","US","resort");

  const SOFT_P=(k,over)=>Object.assign({},HERITAGE[k].v,over);
  const B=(id,name,blurb,pal,c,body,items,details,dcol,look)=>({id,name,blurb,adultOnly:true,pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},c:(Object.assign(c,{age:"woman",_body:body}),["irisDetail","pupilStyle"].forEach(k=>{if(c[k]==="")delete c[k]}),c),outfit:{oname:"Beach",look:look||"resort",items,details:details||{},dcol:dcol||{}}});

  const NEWT=[
   B("carioca","Carioca","Rio beach beauty in a sundress over her swimsuit: sun-streaked chestnut waves, honey-brown eyes, golden-tan skin, shell earrings, a sun hat and a straw bag.",
     ["ivory","sky blue","coral","gold","tan"],
     SOFT_P("brazilian",{irisDetail:"",pupilStyle:"",impression:"a stunning, sun-kissed beauty with Brazilian heritage and a radiant, carefree glow",expression:"radiant, head-tilted smile",faceShape:"heart-shaped face with high cheekbones and a tapered chin",
       eyeOne:"honey brown",eyeTwo:"honey brown",hairStyle:"long wavy hair",hairLength:"mid-back length",hairTexture:"beachy waves",bangs:"long face-framing pieces",hairMovement:"is tossed gently by a breeze",
       hairBase:"chestnut brown",hairHighlights:"golden blonde",hairBlend:"sun-bleached ends fading from the darker roots",skinTone:"golden tan",skinFinish:"sun-bronzed skin with a soft salt-water sheen",
       markings:"light freckles across the nose",makeupStyle:"sun-bronzed makeup",lipFinish:"glossy lips",blushStyle:"soft sun-kissed blush"}),
     "bottomHeavy",
     {top:["one-piece swimsuit with a scoop back","@secondary"],outerwear:["airy cotton beach dress","auto"],headwear:["wide-brim sun hat","-"],eyewear:["oversized round sunglasses","-"],earAccessory:["shell earrings","-"],wristAccessory:["stacked beaded bracelets","@accent"],legwear:["beaded anklet","@accent"],hipAccessory:["straw beach bag","-"]},
     {detailTwo:"breezy loose fit"}),

   B("surfer","Pacific surfer","A strong, sun-bronzed Pacific Islander surfer: long black hair in a wet braided ponytail, a zinc stripe on the nose, a rash guard, board shorts and a shell necklace.",
     ["black","teal","coral","white","silver"],
     SOFT_P("polynesian",{impression:"a strikingly beautiful, athletic island beauty with Polynesian and Pacific Islander heritage",expression:"bright cheerful expression",
       hairStyle:"low braided ponytail",hairLength:"hip-length",hairTexture:"wet and glossy",bangs:"open forehead",hairMovement:"falls in damp, sleek strands over the shoulders",hairBase:"jet black",
       skinFinish:"sun-bronzed skin with a soft salt-water sheen",skinTone:"golden brown",makeupStyle:"minimal makeup",faceAccents:"a stripe of zinc sunscreen across the nose",lipFinish:"natural lip finish",nailStyle:"short rounded fingernails",nailColor:"@accent"}),
     "strongCurvy",
     {top:["short-sleeve rash guard","auto"],bottom:["board shorts","@secondary"],headwear:["sports headband","@accent"],eyewear:["sport sunglasses","-"],neckAccessory:["shell necklace","-"],wristAccessory:["fitness tracker","@accent"],tagCharm:["zip pull charm","@accent"]},
     {detailTwo:"athletic fit",detailThree:"swimwear stretch fabric"},{},"sporty"),

   B("holidayidol","Holiday idol","A Korean pop idol on vacation: glass-skin glow, rose-pink ombre ends, ribbon choker, flower earrings, heart sunglasses and a frilled halter bikini.",
     ["rose pink","white","mint green","coral","gold"],
     SOFT_P("korean",{impression:"a flawlessly beautiful, camera-ready glow with Korean heritage",expression:"gentle smile",
       hairStyle:"high half-up ponytail",hairLength:"waist-length",hairTexture:"silky straight",bangs:"see-through wispy bangs",hairMovement:"flows softly past the waist",hairBase:"jet black",hairUnderlayer:"@primary",hairBlend:"a seamless ombre between the colors",
       skinTone:"porcelain",skinFinish:"dewy skin",makeupStyle:"idol makeup",eyelinerStyle:"thin winged eyeliner",eyeshadowStyle:"shimmer eyeshadow",lipFinish:"glass-like gloss",blushStyle:"soft cheek blush",faceAccents:"luminous highlighting",nailStyle:"long almond fingernails",nailColor:"@primary",makeupColor:"@primary",lashNatural:"long, thick dark eyelashes"}),
     "pinup",
     {top:["frilled halter bikini top with a front ribbon tie","auto"],bottom:["frilled bikini bottoms","auto"],headwear:["wide-brim sun hat","-"],eyewear:["heart-shaped sunglasses","@accent"],neckAccessory:["ribbon choker","@accent"],earAccessory:["flower earrings","@accent"],legwear:["beaded anklet","@accent"]},
     {detailOne:"frilled trim"}),

   B("andaman","Andaman islander","A Thai and Vietnamese island beauty at sunset: long black hair with a flower clip, golden-beige skin, a triangle bikini, a hip sarong, a sheer kimono cover-up and shell jewelry.",
     ["white","turquoise","gold","coral","tan"],
     SOFT_P("thai",{impression:"a graceful, radiant island beauty with Thai and Vietnamese heritage",expression:"relaxed, sun-drenched smile",
       hairStyle:"long straight hair",hairLength:"hip-length",bangs:"center-parted front pieces",hairMovement:"falls smoothly down the back",hairBase:"jet black",
       skinFinish:"sun-bronzed skin with a soft salt-water sheen",finishColor:"",makeupStyle:"golden-hour glow makeup",eyelinerStyle:"soft eyeliner",lipFinish:"glossy lips",faceAccents:"soft pearl shimmer",nailStyle:"long almond fingernails",nailColor:"@accent",makeupColor:"@accent"}),
     "petiteCurved",
     {top:["triangle bikini top","auto"],bottom:["sarong-style swim bottoms","auto"],waistAccessory:["sarong tied at the hips","@accent"],outerwear:["sheer kimono cover-up","@third"],headwear:["flower hair clip","@accent"],eyewear:["cat-eye sunglasses","-"],neckAccessory:["shell necklace","-"],earAccessory:["shell earrings","-"],legwear:["beaded anklet","@accent"]}),

   B("riviera","Riviera swimmer","A Southern European yacht-club beauty: hazel eyes, olive skin, a glossy twisted chignon, a high-cut navy swimsuit with a plunging front, a gold waist chain and hoop earrings.",
     ["navy blue","white","coral","gold","silver"],
     SOFT_P("mediterranean",{impression:"a sophisticated, effortlessly stunning beauty with Southern European (Italian, Spanish and Greek) heritage",expression:"confident smile",
       eyeOne:"hazel",eyeTwo:"hazel",hairStyle:"twisted chignon",hairLength:"long",hairTexture:"wet and glossy",bangs:"long face-framing pieces",hairMovement:"frames the face in soft layers",hairBase:"dark brown",
       skinTone:"olive",skinFinish:"sun-bronzed skin with a soft salt-water sheen",makeupStyle:"classic glam makeup",eyelinerStyle:"classic winged eyeliner",lipFinish:"glossy lips",blushStyle:"soft sun-kissed blush",nailStyle:"long almond fingernails",nailColor:"@third",makeupColor:"@third"}),
     "longLegged",
     {top:["high-cut one-piece swimsuit with a plunging front","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],eyewear:["oversized sunglasses","-"],earAccessory:["chunky hoop earrings","@accent"]},
     {detailThree:"wet clinging fabric"}),

   B("calypso","Calypso","An Afro-Caribbean carnival beauty: gold-threaded box braids, deep warm brown skin, a coral side-tie bikini, a turquoise body chain and anklet, and a dazzling smile.",
     ["coral","white","gold","turquoise","tan"],
     SOFT_P("caribbean",{impression:"a dazzling, carnival-bright beauty with Afro-Caribbean heritage",expression:"laughing expression",
       faceShape:"heart-shaped face with high cheekbones and a tapered chin",eyeShape:"large, striking eyes",
       hairStyle:"box braids",hairLength:"waist-length",hairTexture:"glossy",bangs:"open forehead",hairMovement:"falls smoothly down the back",hairBase:"dark brown",hairHighlights:"@third",
       skinTone:"deep warm brown",skinFinish:"natural skin texture with a deep, rich glow",makeupStyle:"golden-hour glow makeup",eyeshadowStyle:"shimmer eyeshadow",lipFinish:"glossy lips",faceAccents:"luminous highlighting",nailStyle:"long almond fingernails",nailColor:"@primary",makeupColor:"@third"}),
     "curvy",
     {top:["triangle bikini top","auto"],bottom:["side-tie bikini bottoms","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["oversized round sunglasses","-"]},
     {detailTwo:"knotted front"}),

   B("seasiren","Sea siren","A pale Nordic siren rising from the surf: platinum hair soaked sleek, sky-blue eyes, silver-and-pearl sheen, a white bandeau top and black high-cut bottoms in water-soaked, see-through fabric.",
     ["white","black","sky blue","silver","gold"],
     SOFT_P("nordic",{subjectType:"siren",impression:"an ethereal, mesmerizing beauty with Northern European (Scandinavian) heritage",expression:"serene expression",
       eyeOne:"@third",eyeTwo:"@third",hairStyle:"long straight hair",hairLength:"hip-length",hairTexture:"wet and glossy",bangs:"center-parted front pieces",hairMovement:"falls in damp, sleek strands over the shoulders",hairBase:"platinum blonde",hairHighlights:"@third",
       skinTone:"pale ivory",skinFinish:"a pearlescent {c} sheen",finishColor:"@accent",makeupStyle:"mermaidcore makeup",eyelinerStyle:"thin winged eyeliner",lipFinish:"wet glossy lips",faceAccents:"soft pearl shimmer",nailStyle:"long almond fingernails",nailColor:"@secondary",makeupColor:"@third"}),
     "delicateTop",
     {top:["bandeau bikini top","auto"],bottom:["high-cut bikini bottoms","auto"],neckAccessory:["shell necklace","-"]},
     {detailThree:"water-soaked see-through fabric"}),

   B("goasunset","Goa sunset","A North Indian beauty at a beach party: long glossy black waves, gold jhumka earrings, kohl-lined eyes, and a crimson string bikini with a gold waist chain and anklet.",
     ["black","crimson red","white","gold","silver"],
     SOFT_P("northindian",{irisDetail:"",pupilStyle:"",impression:"a magnetic, golden-hour beauty with North Indian and Punjabi heritage",expression:"confident smile",
       hairStyle:"long wavy hair",hairLength:"hip-length",hairTexture:"thick, glossy waves",hairBase:"@primary",
       skinFinish:"sun-bronzed skin with a soft salt-water sheen",makeupStyle:"golden-hour glow makeup",eyelinerStyle:"cat-eye eyeliner",makeupColor:"@accent"}),
     "hourglassWide",
     {top:["string halter top","@secondary"],bottom:["string bikini bottoms","@secondary"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],earAccessory:["{c} jhumka-style bell earrings","@accent"],eyewear:["sunglasses","-"]}),

   B("neoncove","Neon night swim","A Mexican and Central American party-goer at a midnight beach rave: jet-black hair with an electric-blue underlayer, neon-pink glow, a wet micro bikini and a waist chain.",
     ["neon pink","black","electric blue","white","silver"],
     SOFT_P("mestiza",{impression:"a vivid, head-turning beauty with Mexican and Central American (Mestiza) heritage",expression:"playful smile",
       hairStyle:"high ponytail",hairLength:"waist-length",hairTexture:"wet and glossy",bangs:"curtain bangs",hairMovement:"flows dramatically behind her",hairBase:"@secondary",hairUnderlayer:"@third",hairBlend:"distinct color blocking between the layers",
       skinFinish:"sun-bronzed skin with a soft salt-water sheen",makeupStyle:"neon cyberpunk makeup",eyelinerStyle:"graphic eyeliner",eyeshadowStyle:"metallic eyeshadow",lipFinish:"high-shine lips",faceAccents:"sparkling rhinestone accents",nailStyle:"long coffin fingernails",nailColor:"@primary",makeupColor:"@primary"}),
     "bombshell",
     {top:["micro triangle bikini top","auto"],bottom:["micro thong bikini bottoms","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],legwear:["beaded anklet","@accent"],eyewear:["sunglasses","-"]},
     {detailThree:"wet clinging fabric"}),

   B("sunpriestess","Nile sun priestess","A North African beauty dressed as a desert sun priestess at the shore: kohl and gold-lined eyes, a wide beaded collar, a sun-disc headband, layered gold chains and a sheer turquoise sarong.",
     ["white","turquoise","coral","gold","sand"],
     SOFT_P("maghrebi",{irisDetail:"",pupilStyle:"",impression:"a regal, radiant beauty with North African (Berber and Egyptian) heritage",expression:"serene divine smile",
       hairStyle:"long straight hair",hairLength:"waist-length",hairTexture:"sleek",bangs:"center-parted front pieces",hairMovement:"falls smoothly down the back",hairBase:"jet black",
       skinTone:"warm tan",skinFinish:"sun-bronzed skin with a soft salt-water sheen",makeupStyle:"editorial makeup",eyelinerStyle:"graphic eyeliner",eyeshadowStyle:"metallic eyeshadow",makeupColor:"@accent"}),
     "statuesque",
     {top:["layered body chains over the bare chest","@accent"],bottom:["sheer sarong tied low on the hips","auto"],waistAccessory:["delicate body chain draped around the waist","@accent"],headwear:["slim headband with a small sun-disc ornament","@accent"],neckAccessory:["wide beaded collar necklace","@third"],wristAccessory:["armlets","@accent"],legwear:["beaded anklet","@accent"]},
     {},{}, "resort")
  ];
  NEWT.forEach(t=>{if(!TEMPLATES.some(x=>x.id===t.id))TEMPLATES.push(t)});
  const grp=PRESET_GROUPS.start.find(g=>g.label==="Beach beauties");
  if(!grp)PRESET_GROUPS.start.push({label:"Beach beauties",keys:NEWT.map(t=>t.id)});
  else NEWT.forEach(t=>{if(!grp.keys.includes(t.id))grp.keys.push(t.id)});
})();

/* ---- v63: cultural outfit presets, a cute and a sexy one for every heritage, and the pieces they need ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  const CU="CU",XS="US";
  /* pieces (tagged "cultural" so the outfit randomizer keeps drawing from the same pool as before) */
  const N=[
   /* tops and dresses, cute */
   ["top","linen folk dress with an embroidered bodice",CU],["top","dirndl dress with a laced bodice and a full skirt",CU],["top","embroidered blouse with puffed sleeves",CU],
   ["top","eyelet sundress with a square neckline",CU],["top","embroidered kaftan dress with wide sleeves",CU],["top","embroidered tunic with wide sleeves",CU],
   ["top","handwoven striped wrap dress with a tie waist",CU],["top","short embroidered kurta with side slits",CU],["top","fitted silk blouse with short sleeves",CU],
   ["top","cotton saree with a bold woven border",CU],["top","long embroidered kameez tunic",CU],["top","wrap-front wool dress with a high collar",CU],
   ["top","cross-collar hanfu-style blouse with wide sleeves",CU],["top","cotton yukata with a bow-tied obi",CU],["top","short hanbok-style jacket with long ribbon ties",CU],
   ["top","embroidered wool deel-style dress with a wrapped front",CU],["top","butterfly-sleeve blouse with stiff puffed sleeves",CU],["top","fitted ao dai tunic with side slits",CU],
   ["top","fitted lace kebaya blouse",CU],["top","fitted wax-print peplum top",CU],["top","cotton dress with a woven embroidered border",CU],
   ["top","shweshwe-print cotton dress with a flared skirt",CU],["top","madras-print fitted dress with a flared skirt",CU],["top","polka-dot swing dress with a sweetheart neckline",CU],
   ["top","off-shoulder blouse with floral embroidery",CU],["top","alpaca-knit sweater with a patterned yoke",CU],["top","ruffled off-shoulder top with a tie front",CU],
   ["top","ruffled off-shoulder rumba top",CU],["top","beadwork-trimmed fringed suede dress",CU],["top","tropical-print halter dress",CU],
   ["top","tiered cotton sundress with a woven border pattern",CU],["top","mandarin-collar silk blouse with frog buttons",CU],["top","fitted blouse with woven kente-style trim",CU],
   ["top","embroidered linen dress with a tie waist",CU],["top","off-shoulder blouse with a stand collar",CU],
   /* tops and dresses, sexy */
   ["top","cropped Nordic-pattern knit top with a deep neckline",XS],["top","laced tartan corset top",XS],["top","plunging dirndl dress with a laced bodice and a short skirt",XS],
   ["top","short embroidered sarafan dress with a plunging laced neckline",XS],["top","one-shoulder Grecian drape dress with a high slit",XS],["top","embroidered cropped kaftan top with a deep neckline",XS],
   ["top","cropped brocade bolero top with a plunging neckline",XS],["top","velvet embroidered cropped jacket worn open",XS],["top","pleated linen sheath dress with a plunging neckline and a high slit",XS],
   ["top","embroidered backless choli top",XS],["top","silk saree draped low over a backless blouse",XS],["top","sheer silk saree draped low over a cropped halter blouse",XS],
   ["top","short embroidered kameez dress with high side slits",XS],["top","short wool wrap dress with a deep neckline",XS],["top","short-sleeve qipao dress with a high slit and a keyhole neckline",XS],
   ["top","short kimono-style wrap dress with a plunging neckline",XS],["top","cropped hanbok-style top with a plunging neckline",XS],["top","short silk deel-style wrap dress with a deep neckline",XS],
   ["top","cropped butterfly-sleeve top with a plunging neckline",XS],["top","silk sabai shoulder wrap over a fitted tube top",XS],["top","sheer lace kebaya with a plunging neckline",XS],
   ["top","wax-print corset top",XS],["top","sheer lightweight dirac-style dress with a deep neckline",XS],["top","beaded bandeau top",XS],
   ["top","beaded carnival bikini top with feather accents",XS],["top","fringed beaded flapper dress with a plunging neckline",XS],["top","embroidered crop top with a deep scooped neckline",XS],
   ["top","cropped patterned knit top with a deep neckline",XS],["top","sequin bikini top with feathered shoulder pieces",XS],["top","knotted ruffle crop top",XS],
   ["top","fringed suede mini dress with a plunging beadwork neckline",XS],["top","bandeau top with beaded trim",XS],["top","cropped fur-trimmed parka top with an open front",XS],
   ["top","woven-fiber-trimmed halter top",XS],["top","corset-style qipao crop top",XS],["top","plunging tailored vest top with woven trim",XS],
   ["top","silk slip dress with a deep neckline",XS],["top","off-shoulder crop top with a stand collar",XS],
   /* bottoms */
   ["bottom","dirndl skirt with a full gathered hem",CU],["bottom","tapered silk trousers",CU],["bottom","gathered harem pants",CU],["bottom","wide palazzo pants",CU],
   ["bottom","silk pavadai skirt with a woven border",CU],["bottom","slim cotton shalwar trousers",CU],["bottom","high-waisted pleated hanfu-style skirt",CU],
   ["bottom","full high-waisted hanbok-style skirt",CU],["bottom","tiered patterned skirt",CU],["bottom","wide silk trousers",CU],["bottom","batik wrap skirt",CU],
   ["bottom","wax-print wrap skirt",CU],["bottom","tiered ruffled skirt with ribbon trim",CU],["bottom","layered pollera-style skirt",CU],["bottom","tiered ruffle samba skirt",CU],
   ["bottom","long ruffle-tiered skirt",CU],
   ["bottom","high-slit wool wrap skirt",XS],["bottom","short tartan kilt with a high side slit",XS],["bottom","high-slit embroidered skirt",XS],["bottom","sheer flowing silk skirt with a high slit",XS],
   ["bottom","sheer-panelled harem pants",XS],["bottom","low-waisted flared lehenga skirt",XS],["bottom","fitted slim trousers",XS],["bottom","sheer layered hanbok-style skirt with a high slit",XS],
   ["bottom","high-slit patterned wrap skirt",XS],["bottom","wrapped silk skirt with a high slit",XS],["bottom","high-slit batik sarong skirt",XS],["bottom","high-slit wax-print mermaid skirt",XS],
   ["bottom","high-cut carnival bikini bottoms with feather trim",XS],["bottom","high-slit tiered ruffle skirt",XS],["bottom","short layered pollera-style skirt",XS],["bottom","high-cut sequin bikini bottoms",XS],
   ["bottom","high-slit ruffle-tiered rumba skirt",XS],["bottom","high-slit pareo wrap skirt",XS],["bottom","fur-trimmed shorts",XS],
   /* outerwear */
   ["outerwear","embroidered sleeveless sarafan dress",CU],["outerwear","kilim-pattern woven vest",CU],["outerwear","lightweight dupatta draped over the shoulders",CU],
   ["outerwear","half-saree drape over one shoulder",CU],["outerwear","thin cotton shawl with a woven border",CU],["outerwear","woven manta shawl",CU],["outerwear","belted trench coat",CU],
   ["outerwear","tailored blazer with woven trim",CU],["outerwear","fur-trimmed hooded parka with embroidered trim",CU],
   ["outerwear","tartan shawl draped off one shoulder",CU],["outerwear","sheer dupatta draped over one arm",XS],["outerwear","tailored blazer worn off the shoulders",XS],
   /* waist, belt, legwear, hands */
   ["waistAccessory","striped woven apron tied at the waist",CU],["waistAccessory","silk sash tied at the waist",CU],["waistAccessory","wide woven sash",CU],
   ["waistAccessory","coin-fringed hip scarf",XS],["waistAccessory","striped woven half apron tied low",XS],["waistAccessory","wide obi-style sash",XS],["waistAccessory","feather hip plume",XS],
   ["waistAccessory","ruffled hip sash",XS],["belt","wide studded metal belt",XS],["belt","coin-trimmed hip belt",XS],
   ["legwear","knee-high wool socks",CU],["legwear","thigh-high wool stockings",XS],["legwear","knee-high fur-trimmed leg warmers",CU],["legwear","fringed suede leg wraps",XS],
   ["gloves","fur-lined mittens",CU],["gloves","long fur-lined gloves",XS],["gloves","long satin opera gloves",XS],["thighAccessory","tartan thigh garter",XS],
   /* neck, ears, wrists, head */
   ["neckAccessory","layered coin necklaces",CU],["neckAccessory","chunky stone-bead necklace",CU],["neckAccessory","layered beaded necklaces",CU],["neckAccessory","layered stone-and-metal necklaces",CU],
   ["neckAccessory","fresh flower lei",CU],["neckAccessory","long layered pearl strands",XS],
   ["wristAccessory","beaded cuff bracelet",CU],["wristAccessory","feathered arm bands",XS],
   ["headwear","patterned headband",CU],["headwear","jasmine garland braided into the hair",CU],["headwear","ornate hair sticks with small tassels",CU],["headwear","kanzashi hair ornament",CU],
   ["headwear","ribbon hair ornament",CU],["headwear","fur-trimmed felt hat",CU],["headwear","flower garland worn in the hair",CU],["headwear","conical straw hat",CU],
   ["headwear","bold head wrap tied in a fan shape",CU],["headwear","small bowler hat",CU],["headwear","beaded headband",CU],["headwear","woven fiber headband",CU],
   ["headwear","feathered carnival headpiece",XS],["headwear","beaded headband with a feather",XS],
   ["tagCharm","knotted tassel charm",CU]
  ];
  N.forEach(([f,v,t])=>addO(f,v,t,"cultural"));
  /* details */
  [["detailThree","woven geometric pattern",CU],["detailThree","wax-print pattern",CU],["detailThree","batik pattern",CU],["detailThree","brocade pattern",CU],["detailThree","tartan check",CU],
   ["detailOne","woven border trim",CU],["detailOne","embroidered hem",CU],["detailOne","coin trim",XS],["detailOne","feather trim",XS],["detailOne","fringe trim",XS]].forEach(([f,v,t])=>addO(f,v,t,"cultural"));
  /* presets */
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-",auto:"auto"};
  const mk=(id,name,blurb,adult,pal,items,det)=>{
    const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    return {id,name,blurb,look:"",season:"",...(adult?{adultOnly:true}:{}),pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}};
  };
  const C=(k,name,blurb,pal,items,det)=>mk("cul_"+k+"_c",name+" (cute)",blurb,false,pal,items,det);
  const X=(k,name,blurb,pal,items,det)=>mk("cul_"+k+"_x",name+" (sexy)",blurb+" Adult only.",true,pal,items,det);
  const CUL=[
  /* ---------- Europe ---------- */
  ["nordic",
   C("nordic","Midsummer dress","Northern European: a linen folk dress with an embroidered bodice, a flower crown, a knit shawl and a woven sash.",["ivory","forest green","sky blue","lemon yellow","dusty rose"],
     {top:["linen folk dress with an embroidered bodice","p"],outerwear:["knit shawl","t"],headwear:["flower crown","e"],waistAccessory:["woven sash","a"],wristAccessory:["woven flower bracelet","e"]},{detailOne:"embroidered hem"}),
   X("nordic","Knit and fur","Northern European: a cropped Nordic-pattern knit top with a deep neckline, a high-slit wool wrap skirt, a fur stole and thigh-high wool stockings.",["cream","charcoal gray","crimson red","silver","ice blue"],
     {top:["cropped Nordic-pattern knit top with a deep neckline","p"],bottom:["high-slit wool wrap skirt","s"],outerwear:["fur stole","e"],legwear:["thigh-high wool stockings","p"],neckAccessory:["chain necklace","-"]},{detailTwo:"low-cut neckline"})],
  ["celtic",
   C("celtic","Highland tartan","Irish and Scottish: a lace-up peasant blouse, a tartan kilt skirt, a knit shawl and knee-high wool socks.",["ivory","forest green","burgundy","navy blue","gold"],
     {top:["lace-up peasant blouse","p"],bottom:["tartan kilt skirt","s"],outerwear:["knit shawl","t"],legwear:["knee-high wool socks","p"],belt:["braided leather belt","-"]},{detailThree:"tartan check"}),
   X("celtic","Highland heartbreaker","Irish and Scottish: a laced tartan corset top, a short tartan kilt with a high slit, a tartan shawl off one shoulder and a tartan thigh garter.",["black","crimson red","forest green","gold","silver"],
     {top:["laced tartan corset top","p"],bottom:["short tartan kilt with a high side slit","s"],outerwear:["tartan shawl draped off one shoulder","t"],thighAccessory:["tartan thigh garter","a"],neckAccessory:["velvet choker","-"]},{detailThree:"tartan check"})],
  ["westeuro",
   C("westeuro","Alpine dirndl","Western European: a dirndl dress with a laced bodice and full skirt, a frilled apron, a braid crown and a pearl strand.",["navy blue","ivory","dusty rose","forest green","gold"],
     {top:["dirndl dress with a laced bodice and a full skirt","p"],waistAccessory:["frilled apron tied at the waist","s"],headwear:["ribbon-wrapped braid crown","a"],neckAccessory:["pearl strand","-"],legwear:["knee-high wool socks","s"]},{detailOne:"embroidered hem"}),
   X("westeuro","Festival dirndl","Western European: a plunging dirndl dress with a laced bodice and short skirt, a tiny frilled apron and lace-top garter stockings.",["burgundy","ivory","black","gold","dusty rose"],
     {top:["plunging dirndl dress with a laced bodice and a short skirt","p"],waistAccessory:["tiny frilled apron","s"],legwear:["garter-strap stockings with lace tops","s"],neckAccessory:["velvet choker","-"]},{detailTwo:"low-cut neckline"})],
  ["slavic",
   C("slavic","Folk sarafan","Eastern European: an embroidered white blouse under an embroidered sarafan dress, a flower crown and a beaded necklace set.",["white","scarlet red","forest green","golden yellow","royal blue"],
     {top:["embroidered blouse with puffed sleeves","s"],outerwear:["embroidered sleeveless sarafan dress","p"],headwear:["flower crown","a"],neckAccessory:["beaded necklace set","-"],waistAccessory:["woven sash","t"]},{detailOne:"embroidered flowers"}),
   X("slavic","Short sarafan","Eastern European: a short embroidered sarafan dress with a plunging laced neckline, sheer seamed stockings, a flower crown and beads.",["scarlet red","white","black","golden yellow","forest green"],
     {top:["short embroidered sarafan dress with a plunging laced neckline","p"],legwear:["sheer seamed thigh-high stockings","s"],headwear:["flower crown","a"],neckAccessory:["beaded necklace set","-"]},{detailOne:"embroidered flowers"})],
  ["mediterranean",
   C("mediterranean","Aegean sundress","Southern European: a eyelet sundress with a square neckline, a straw hat, a woven sash and stacked slim bracelets.",["white","cobalt blue","sand","terracotta","gold"],
     {top:["eyelet sundress with a square neckline","p"],headwear:["straw hat","-"],waistAccessory:["woven sash","s"],wristAccessory:["stacked slim bracelets","-"],earAccessory:["small pearl earrings","-"]}),
   X("mediterranean","Grecian goddess","Southern European: a one-shoulder Grecian drape dress with a high slit, a laurel leaf crown, a layered waist chain and armlets.",["white","gold","sapphire blue","terracotta","champagne"],
     {top:["one-shoulder Grecian drape dress with a high slit","p"],headwear:["laurel leaf crown","-"],waistAccessory:["layered chain waist","a"],wristAccessory:["armlets","a"]},{detailThree:"sheer chiffon"})],
  /* ---------- Middle East and North Africa ---------- */
  ["arab",
   C("arab","Embroidered kaftan","Arab: an embroidered kaftan dress with wide sleeves, chandelier earrings, layered coin necklaces and a woven sash.",["teal","ivory","gold","burgundy","sand"],
     {top:["embroidered kaftan dress with wide sleeves","p"],waistAccessory:["woven sash","a"],neckAccessory:["layered coin necklaces","-"],earAccessory:["statement chandelier earrings","a"],wristAccessory:["bangles","a"]},{detailOne:"embroidered hem"}),
   X("arab","Gulf nights","Arab: an embroidered cropped kaftan top with a deep neckline, a high-slit embroidered skirt, a coin-fringed hip scarf and chandelier earrings.",["black","gold","emerald green","burgundy","champagne"],
     {top:["embroidered cropped kaftan top with a deep neckline","p"],bottom:["high-slit embroidered skirt","s"],waistAccessory:["coin-fringed hip scarf","a"],earAccessory:["statement chandelier earrings","a"],neckAccessory:["layered coin necklaces","-"]},{detailOne:"coin trim"})],
  ["persian",
   C("persian","Persian garden","Persian: an embroidered tunic with wide sleeves, tapered silk trousers, an embroidered vest and drop earrings.",["turquoise","ivory","plum","gold","rose pink"],
     {top:["embroidered tunic with wide sleeves","p"],bottom:["tapered silk trousers","s"],outerwear:["embroidered vest","t"],earAccessory:["delicate drop earrings","a"],neckAccessory:["layered delicate necklaces","-"]},{detailThree:"brocade pattern"}),
   X("persian","Silk and brocade","Persian: a cropped brocade bolero top with a plunging neckline, a sheer flowing silk skirt with a high slit and a layered waist chain.",["midnight blue","gold","turquoise","burgundy","ivory"],
     {top:["cropped brocade bolero top with a plunging neckline","p"],bottom:["sheer flowing silk skirt with a high slit","s"],waistAccessory:["layered chain waist","a"],earAccessory:["delicate drop earrings","a"]},{detailThree:"brocade pattern"})],
  ["turkish",
   C("turkish","Anatolian kilim","Turkish and Anatolian: an embroidered cotton blouse, gathered harem pants, a kilim-pattern woven vest and a woven sash.",["ivory","terracotta","teal","mustard","burgundy"],
     {top:["embroidered cotton blouse","p"],bottom:["gathered harem pants","s"],outerwear:["kilim-pattern woven vest","t"],waistAccessory:["woven sash","a"],earAccessory:["delicate drop earrings","a"]},{detailThree:"woven geometric pattern"}),
   X("turkish","Palace velvet","Turkish and Anatolian: a velvet embroidered cropped jacket worn open, sheer-panelled harem pants and a coin-trimmed hip belt.",["wine","gold","midnight blue","ivory","antique gold"],
     {top:["velvet embroidered cropped jacket worn open","p"],bottom:["sheer-panelled harem pants","s"],belt:["coin-trimmed hip belt","a"],earAccessory:["statement chandelier earrings","a"]},{detailOne:"coin trim"})],
  ["maghrebi",
   C("maghrebi","Berber weave","North African: a handwoven striped wrap dress with a tie waist, a patterned headband and layered coin necklaces.",["terracotta","ivory","teal","mustard","indigo"],
     {top:["handwoven striped wrap dress with a tie waist","p"],headwear:["patterned headband","a"],neckAccessory:["layered coin necklaces","-"],wristAccessory:["bangles","-"]},{detailThree:"woven geometric pattern"}),
   X("maghrebi","Gilded linen","North African: a pleated linen sheath dress with a plunging neckline and high slit, a wide beaded collar necklace and armlets.",["ivory","gold","turquoise","terracotta","sand"],
     {top:["pleated linen sheath dress with a plunging neckline and a high slit","p"],neckAccessory:["wide beaded collar necklace","t"],wristAccessory:["armlets","a"],waistAccessory:["delicate body chain draped around the waist","a"]},{detailThree:"sheer organza"})],
  /* ---------- South and Central Asia ---------- */
  ["northindian",
   C("northindian","Phulkari kurta","North Indian and Punjabi: a short embroidered kurta, wide palazzo pants, a lightweight dupatta, jhumka earrings and bangles.",["fuchsia","ivory","mustard","emerald green","gold"],
     {top:["short embroidered kurta with side slits","p"],bottom:["wide palazzo pants","s"],outerwear:["lightweight dupatta draped over the shoulders","t"],earAccessory:["{c} jhumka-style bell earrings","a"],wristAccessory:["bangles","a"]},{detailOne:"embroidered hem"}),
   X("northindian","Lehenga choli","North Indian and Punjabi: an embroidered backless choli top, a low-waisted flared lehenga skirt, a sheer dupatta and a layered waist chain.",["crimson red","gold","ivory","emerald green","champagne"],
     {top:["embroidered backless choli top","p"],bottom:["low-waisted flared lehenga skirt","s"],outerwear:["sheer dupatta draped over one arm","t"],waistAccessory:["layered chain waist","a"],earAccessory:["{c} jhumka-style bell earrings","a"]},{detailOne:"beaded fringe"})],
  ["southindian",
   C("southindian","Half saree","South Indian and Sri Lankan: a fitted silk blouse, a silk pavadai skirt with a woven border, a half-saree drape and jasmine in the hair.",["emerald green","ivory","gold","crimson red","magenta"],
     {top:["fitted silk blouse with short sleeves","p"],bottom:["silk pavadai skirt with a woven border","s"],outerwear:["half-saree drape over one shoulder","t"],headwear:["jasmine garland braided into the hair","-"],wristAccessory:["bangles","a"]},{detailOne:"woven border trim"}),
   X("southindian","Silk saree","South Indian and Sri Lankan: a silk saree draped low over a backless blouse, a layered waist chain, bangles and jasmine in the hair.",["peacock blue","gold","crimson red","ivory","antique gold"],
     {top:["silk saree draped low over a backless blouse","p"],waistAccessory:["layered chain waist","a"],headwear:["jasmine garland braided into the hair","-"],wristAccessory:["bangles","a"],earAccessory:["statement chandelier earrings","a"]},{detailOne:"woven border trim"})],
  ["bengali",
   C("bengali","Woven-border saree","Bengali: a cotton saree with a bold woven border, bangles, a flower hair clip and drop earrings.",["ivory","crimson red","gold","sage green","mustard"],
     {top:["cotton saree with a bold woven border","p"],wristAccessory:["bangles","a"],headwear:["flower hair clip","s"],earAccessory:["delicate drop earrings","a"],neckAccessory:["delicate chain necklace","a"]},{detailOne:"woven border trim"}),
   X("bengali","Sheer saree","Bengali: a sheer silk saree draped low over a cropped halter blouse, a beaded waist chain, bangles and chandelier earrings.",["wine","gold","ivory","emerald green","champagne"],
     {top:["sheer silk saree draped low over a cropped halter blouse","p"],waistAccessory:["beaded waist chain","a"],wristAccessory:["bangles","a"],earAccessory:["statement chandelier earrings","a"]},{detailThree:"sheer chiffon"})],
  ["pakistani",
   C("pakistani","Embroidered shalwar","Pakistani and Afghan: a long embroidered kameez tunic, slim cotton shalwar trousers, a lightweight dupatta and chandelier earrings.",["turquoise","ivory","burgundy","gold","mustard"],
     {top:["long embroidered kameez tunic","p"],bottom:["slim cotton shalwar trousers","s"],outerwear:["lightweight dupatta draped over the shoulders","t"],earAccessory:["statement chandelier earrings","a"],wristAccessory:["bangles","a"]},{detailOne:"embroidered hem"}),
   X("pakistani","Coin and kameez","Pakistani and Afghan: a short embroidered kameez dress with high side slits, fitted slim trousers, a sheer dupatta and layered coin necklaces.",["black","gold","crimson red","ivory","antique gold"],
     {top:["short embroidered kameez dress with high side slits","p"],bottom:["fitted slim trousers","s"],outerwear:["sheer dupatta draped over one arm","t"],neckAccessory:["layered coin necklaces","-"],earAccessory:["statement chandelier earrings","a"]},{detailOne:"coin trim"})],
  ["himalayan",
   C("himalayan","Mountain wool","Nepali and Tibetan: a wrap-front wool dress with a high collar, a striped woven apron, a stone-bead necklace and a patterned headband.",["indigo","ivory","crimson red","golden yellow","turquoise"],
     {top:["wrap-front wool dress with a high collar","p"],waistAccessory:["striped woven apron tied at the waist","s"],neckAccessory:["chunky stone-bead necklace","-"],headwear:["patterned headband","a"],legwear:["knee-high wool socks","s"]},{detailThree:"woven geometric pattern"}),
   X("himalayan","Short wool wrap","Nepali and Tibetan: a short wool wrap dress with a deep neckline, a striped half apron tied low, thigh-high wool stockings and a stone-bead necklace.",["wine","ivory","golden yellow","indigo","silver"],
     {top:["short wool wrap dress with a deep neckline","p"],waistAccessory:["striped woven half apron tied low","s"],legwear:["thigh-high wool stockings","p"],neckAccessory:["chunky stone-bead necklace","-"]},{detailThree:"woven geometric pattern"})],
  ["mongolian",
   C("mongolian","Steppe deel","Mongolian and Central Asian: an embroidered wool deel-style dress with a wide woven sash, a fur-trimmed felt hat and a stone-bead necklace.",["cobalt blue","ivory","burgundy","golden yellow","teal"],
     {top:["embroidered wool deel-style dress with a wrapped front","p"],waistAccessory:["wide woven sash","a"],headwear:["fur-trimmed felt hat","s"],neckAccessory:["chunky stone-bead necklace","-"],legwear:["knee-high wool socks","s"]},{detailOne:"embroidered hem"}),
   X("mongolian","Silk deel","Mongolian and Central Asian: a short silk deel-style wrap dress with a deep neckline, a wide studded metal belt, a faux-fur coat and fur-top stockings.",["midnight blue","gold","burgundy","ivory","silver"],
     {top:["short silk deel-style wrap dress with a deep neckline","p"],belt:["wide studded metal belt","a"],outerwear:["faux-fur coat","e"],legwear:["thigh-high stockings with fur tops","p"]},{detailOne:"embroidered hem"})],
  /* ---------- East and Southeast Asia ---------- */
  ["han",
   C("han","Hanfu-style","Chinese: a cross-collar hanfu-style blouse with wide sleeves, a high-waisted pleated skirt, a silk sash and ornate hair sticks.",["rose pink","ivory","jade green","gold","sky blue"],
     {top:["cross-collar hanfu-style blouse with wide sleeves","p"],bottom:["high-waisted pleated hanfu-style skirt","s"],waistAccessory:["silk sash tied at the waist","a"],headwear:["ornate hair sticks with small tassels","a"],earAccessory:["delicate drop earrings","a"]},{detailOne:"embroidered hem"}),
   X("han","High-slit qipao","Chinese: a short-sleeve qipao dress with a high slit and keyhole neckline, sheer thigh-high stockings and ornate hair sticks.",["crimson red","gold","black","ivory","jade green"],
     {top:["short-sleeve qipao dress with a high slit and a keyhole neckline","p"],legwear:["sheer seamed thigh-high stockings","s"],headwear:["ornate hair sticks with small tassels","a"],earAccessory:["delicate drop earrings","a"]},{detailThree:"brocade pattern"})],
  ["japanese",
   C("japanese","Summer yukata","Japanese: a cotton yukata with a bow-tied obi, a kanzashi hair ornament and a drawstring pouch.",["indigo","white","rose pink","gold","sky blue"],
     {top:["cotton yukata with a bow-tied obi","p"],headwear:["kanzashi hair ornament","a"],hipAccessory:["small pouch bag","s"],tagCharm:["knotted tassel charm","a"]},{detailThree:"embroidered eyelet cotton"}),
   X("japanese","Short kimono dress","Japanese: a short kimono-style wrap dress with a plunging neckline, a wide obi-style sash, sheer stockings and a kanzashi hair ornament.",["black","crimson red","gold","ivory","silver"],
     {top:["short kimono-style wrap dress with a plunging neckline","p"],waistAccessory:["wide obi-style sash","s"],legwear:["sheer seamed thigh-high stockings","p"],headwear:["kanzashi hair ornament","a"]},{detailTwo:"low-cut neckline"})],
  ["korean",
   C("korean","Hanbok-style","Korean: a short hanbok-style jacket with long ribbon ties, a full high-waisted skirt, a ribbon hair ornament and a tassel charm.",["soft pink","mint green","ivory","gold","lavender"],
     {top:["short hanbok-style jacket with long ribbon ties","p"],bottom:["full high-waisted hanbok-style skirt","s"],headwear:["ribbon hair ornament","a"],tagCharm:["knotted tassel charm","t"],wristAccessory:["pearl bracelet","-"]},{detailOne:"ribbon trim"}),
   X("korean","Modern hanbok","Korean: a cropped hanbok-style top with a plunging neckline, a sheer layered skirt with a high slit and a tassel charm.",["wine","ivory","gold","soft pink","silver"],
     {top:["cropped hanbok-style top with a plunging neckline","p"],bottom:["sheer layered hanbok-style skirt with a high slit","s"],headwear:["ribbon hair ornament","a"],tagCharm:["knotted tassel charm","t"]},{detailThree:"sheer organza"})],
  ["filipino",
   C("filipino","Butterfly sleeves","Filipino: a butterfly-sleeve blouse with stiff puffed sleeves, a tiered patterned skirt, a lace shawl and a flower garland.",["ivory","terracotta","mustard","sage green","gold"],
     {top:["butterfly-sleeve blouse with stiff puffed sleeves","p"],bottom:["tiered patterned skirt","s"],outerwear:["embroidered lace shawl","e"],headwear:["flower garland worn in the hair","-"],neckAccessory:["pearl strand","-"]},{detailThree:"woven geometric pattern"}),
   X("filipino","Modern terno","Filipino: a cropped butterfly-sleeve top with a plunging neckline, a high-slit patterned wrap skirt and a flower garland.",["white","gold","terracotta","emerald green","champagne"],
     {top:["cropped butterfly-sleeve top with a plunging neckline","p"],bottom:["high-slit patterned wrap skirt","s"],headwear:["flower garland worn in the hair","-"],earAccessory:["delicate drop earrings","a"]},{detailThree:"sheer organza"})],
  ["thai",
   C("thai","Ao dai","Thai and Vietnamese: a fitted ao dai tunic with side slits, wide silk trousers, a conical straw hat and a delicate chain necklace.",["ivory","sky blue","rose pink","gold","jade green"],
     {top:["fitted ao dai tunic with side slits","p"],bottom:["wide silk trousers","s"],headwear:["conical straw hat","-"],neckAccessory:["delicate chain necklace","a"],earAccessory:["pearl stud earrings","-"]},{detailOne:"embroidered hem"}),
   X("thai","Silk sabai","Thai and Vietnamese: a silk sabai shoulder wrap over a fitted tube top, a wrapped silk skirt with a high slit and a beaded waist chain.",["gold","emerald green","crimson red","ivory","champagne"],
     {top:["silk sabai shoulder wrap over a fitted tube top","p"],bottom:["wrapped silk skirt with a high slit","s"],waistAccessory:["beaded waist chain","a"],earAccessory:["statement chandelier earrings","a"]},{detailThree:"metallic sheen"})],
  ["malay",
   C("malay","Kebaya and batik","Indonesian and Malay: a fitted lace kebaya blouse, a batik wrap skirt, a flower hair clip and a woven sash.",["ivory","indigo","terracotta","gold","sage green"],
     {top:["fitted lace kebaya blouse","p"],bottom:["batik wrap skirt","s"],headwear:["flower hair clip","a"],waistAccessory:["woven sash","t"],earAccessory:["small pearl earrings","-"]},{detailThree:"batik pattern"}),
   X("malay","Sheer kebaya","Indonesian and Malay: a sheer lace kebaya with a plunging neckline, a high-slit batik sarong skirt and a flower hair clip.",["black","gold","burgundy","ivory","champagne"],
     {top:["sheer lace kebaya with a plunging neckline","p"],bottom:["high-slit batik sarong skirt","s"],headwear:["flower hair clip","a"],waistAccessory:["thin waist chain draped over the hips","a"]},{detailThree:"batik pattern"})],
  /* ---------- Africa ---------- */
  ["westafrican",
   C("westafrican","Wax-print set","West African: a fitted wax-print peplum top, a matching wrap skirt, a bold head wrap and a beaded necklace set.",["mustard","indigo","coral","emerald green","ivory"],
     {top:["fitted wax-print peplum top","p"],bottom:["wax-print wrap skirt","s"],headwear:["bold head wrap tied in a fan shape","t"],neckAccessory:["beaded necklace set","-"],wristAccessory:["bangles","a"]},{detailThree:"wax-print pattern"}),
   X("westafrican","Wax-print glam","West African: a wax-print corset top, a high-slit wax-print mermaid skirt, a bold head wrap and statement earrings.",["fuchsia","gold","royal blue","emerald green","black"],
     {top:["wax-print corset top","p"],bottom:["high-slit wax-print mermaid skirt","s"],headwear:["bold head wrap tied in a fan shape","t"],earAccessory:["statement chandelier earrings","a"],neckAccessory:["beaded necklace set","-"]},{detailThree:"wax-print pattern"})],
  ["eastafrican",
   C("eastafrican","Woven-border dress","East African: a cotton dress with a woven embroidered border, a thin cotton shawl, stacked slim bracelets and a delicate necklace.",["white","emerald green","golden yellow","crimson red","tan"],
     {top:["cotton dress with a woven embroidered border","p"],outerwear:["thin cotton shawl with a woven border","s"],wristAccessory:["stacked slim bracelets","-"],neckAccessory:["delicate chain necklace","-"]},{detailOne:"woven border trim"}),
   X("eastafrican","Sheer cotton dirac","East African: a sheer lightweight dirac-style dress with a deep neckline, a thin waist chain and layered beaded necklaces.",["wine","gold","ivory","emerald green","tan"],
     {top:["sheer lightweight dirac-style dress with a deep neckline","p"],waistAccessory:["thin waist chain draped over the hips","a"],neckAccessory:["layered beaded necklaces","-"]},{detailThree:"sheer chiffon"})],
  ["southafrican",
   C("southafrican","Shweshwe dress","Southern African: a shweshwe-print cotton dress with a flared skirt, a bold head wrap and stacked beaded bracelets.",["indigo","ivory","terracotta","mustard","teal"],
     {top:["shweshwe-print cotton dress with a flared skirt","p"],headwear:["bold head wrap tied in a fan shape","s"],neckAccessory:["layered beaded necklaces","-"],wristAccessory:["stacked beaded bracelets","a"]},{detailThree:"woven geometric pattern"}),
   X("southafrican","Beaded sunset","Southern African: a beaded bandeau top, a beaded fringe skirt, layered beaded necklaces and a beaded waist chain.",["terracotta","ivory","teal","gold","black"],
     {top:["beaded bandeau top","p"],bottom:["beaded fringe skirt","s"],neckAccessory:["layered beaded necklaces","-"],waistAccessory:["beaded waist chain","a"]},{detailOne:"beaded fringe"})],
  /* ---------- The Americas ---------- */
  ["caribbean",
   C("caribbean","Madras dress","Afro-Caribbean: a madras-print fitted dress with a flared skirt, a bold head wrap, chunky hoop earrings and bangles.",["mustard","navy blue","coral","emerald green","ivory"],
     {top:["madras-print fitted dress with a flared skirt","p"],headwear:["bold head wrap tied in a fan shape","s"],earAccessory:["chunky hoop earrings","a"],wristAccessory:["bangles","a"]},{detailThree:"tartan check"}),
   X("caribbean","Carnival fete","Afro-Caribbean: a beaded carnival bikini top with feather accents, high-cut feather-trim bottoms, a feathered headpiece and feathered arm bands.",["hot pink","turquoise","gold","electric purple","lime green"],
     {top:["beaded carnival bikini top with feather accents","p"],bottom:["high-cut carnival bikini bottoms with feather trim","s"],headwear:["feathered carnival headpiece","a"],wristAccessory:["feathered arm bands","a"]},{detailOne:"feather trim"})],
  ["blackamerican",
   C("blackamerican","Harlem swing","Black American: a polka-dot swing dress with a sweetheart neckline, a mini hat with netting, short satin gloves and a pearl strand.",["navy blue","ivory","crimson red","gold","dusty rose"],
     {top:["polka-dot swing dress with a sweetheart neckline","p"],headwear:["mini hat with netting","a"],gloves:["short satin gloves with a bow","s"],neckAccessory:["pearl strand","-"]},{detailOne:"ribbon trim"}),
   X("blackamerican","Cotton Club glam","Black American: a fringed beaded flapper dress with a plunging neckline, long satin opera gloves, long pearl strands and a feathered headband.",["black","gold","burgundy","ivory","champagne"],
     {top:["fringed beaded flapper dress with a plunging neckline","p"],gloves:["long satin opera gloves","s"],neckAccessory:["long layered pearl strands","-"],headwear:["beaded headband with a feather","a"]},{detailOne:"fringe trim"})],
  ["mestiza",
   C("mestiza","Embroidered blusa","Mexican and Central American: an off-shoulder blouse with floral embroidery, a tiered ruffled skirt, a flower crown and layered beaded necklaces.",["ivory","fuchsia","emerald green","golden yellow","royal blue"],
     {top:["off-shoulder blouse with floral embroidery","p"],bottom:["tiered ruffled skirt with ribbon trim","s"],headwear:["flower crown","a"],neckAccessory:["layered beaded necklaces","-"]},{detailOne:"embroidered flowers"}),
   X("mestiza","Fiesta ruffles","Mexican and Central American: an embroidered crop top with a deep scooped neckline, a high-slit tiered ruffle skirt and chunky hoop earrings.",["crimson red","ivory","emerald green","gold","black"],
     {top:["embroidered crop top with a deep scooped neckline","p"],bottom:["high-slit tiered ruffle skirt","s"],earAccessory:["chunky hoop earrings","a"],headwear:["flower hair clip","a"]},{detailOne:"embroidered flowers"})],
  ["andean",
   C("andean","Alpaca and pollera","Andean: an alpaca-knit sweater with a patterned yoke, a layered pollera-style skirt, a woven manta shawl and a small bowler hat.",["magenta","teal","mustard","ivory","indigo"],
     {top:["alpaca-knit sweater with a patterned yoke","p"],bottom:["layered pollera-style skirt","s"],outerwear:["woven manta shawl","t"],headwear:["small bowler hat","a"]},{detailThree:"woven geometric pattern"}),
   X("andean","Short pollera","Andean: a cropped patterned knit top with a deep neckline, a short layered pollera-style skirt, thigh-high wool stockings and a small bowler hat.",["magenta","black","mustard","teal","ivory"],
     {top:["cropped patterned knit top with a deep neckline","p"],bottom:["short layered pollera-style skirt","s"],legwear:["thigh-high wool stockings","p"],headwear:["small bowler hat","a"]},{detailThree:"woven geometric pattern"})],
  ["brazilian",
   C("brazilian","Samba ruffles","Brazilian: a ruffled off-shoulder top with a tie front, a tiered ruffle samba skirt, a flower hair clip and a beaded necklace set.",["white","emerald green","golden yellow","royal blue","coral"],
     {top:["ruffled off-shoulder top with a tie front","p"],bottom:["tiered ruffle samba skirt","s"],headwear:["flower hair clip","a"],neckAccessory:["beaded necklace set","-"]},{detailOne:"frilled trim"}),
   X("brazilian","Rio parade","Brazilian: a sequin bikini top with feathered shoulder pieces, high-cut sequin bottoms, a feathered headpiece and a feather hip plume.",["emerald green","golden yellow","royal blue","hot pink","white"],
     {top:["sequin bikini top with feathered shoulder pieces","p"],bottom:["high-cut sequin bikini bottoms","s"],headwear:["feathered carnival headpiece","a"],waistAccessory:["feather hip plume","t"]},{detailThree:"sequin finish"})],
  ["afrolatina",
   C("afrolatina","Rumba ruffles","Afro-Latina: a ruffled off-shoulder rumba top, a long ruffle-tiered skirt, a bold head wrap and chunky hoop earrings.",["white","crimson red","golden yellow","turquoise","black"],
     {top:["ruffled off-shoulder rumba top","p"],bottom:["long ruffle-tiered skirt","s"],headwear:["bold head wrap tied in a fan shape","a"],earAccessory:["chunky hoop earrings","a"]},{detailOne:"frilled trim"}),
   X("afrolatina","Rumba fire","Afro-Latina: a knotted ruffle crop top, a high-slit ruffle-tiered rumba skirt, a ruffled hip sash and chunky hoop earrings.",["crimson red","black","gold","white","hot pink"],
     {top:["knotted ruffle crop top","p"],bottom:["high-slit ruffle-tiered rumba skirt","s"],waistAccessory:["ruffled hip sash","a"],earAccessory:["chunky hoop earrings","a"]},{detailOne:"frilled trim"})],
  ["native",
   C("native","Fringe and beadwork","Native American: a beadwork-trimmed fringed suede dress, a beaded headband, layered stone-and-metal necklaces and a beaded cuff.",["camel","ivory","turquoise","rust","brown"],
     {top:["beadwork-trimmed fringed suede dress","p"],headwear:["beaded headband","a"],neckAccessory:["layered stone-and-metal necklaces","-"],wristAccessory:["beaded cuff bracelet","a"]},{detailOne:"short fringe accents"}),
   X("native","Fringed suede mini","Native American: a fringed suede mini dress with a plunging beadwork neckline, fringed suede leg wraps and layered stone-and-metal necklaces.",["camel","black","turquoise","rust","ivory"],
     {top:["fringed suede mini dress with a plunging beadwork neckline","p"],legwear:["fringed suede leg wraps","p"],neckAccessory:["layered stone-and-metal necklaces","-"],wristAccessory:["beaded cuff bracelet","a"]},{detailOne:"fringe trim"})],
  /* ---------- Pacific, Arctic and Australia ---------- */
  ["polynesian",
   C("polynesian","Island print","Polynesian and Pacific Islander: a tropical-print halter dress, a fresh flower lei, a flower crown and a woven flower bracelet.",["ivory","hot pink","turquoise","golden yellow","emerald green"],
     {top:["tropical-print halter dress","p"],neckAccessory:["fresh flower lei","-"],headwear:["flower crown","a"],wristAccessory:["woven flower bracelet","a"]},{detailThree:"batik pattern"}),
   X("polynesian","Pareo wrap","Polynesian and Pacific Islander: a bandeau top with beaded trim, a high-slit pareo wrap skirt, a flower lei and a beaded waist chain.",["white","turquoise","coral","gold","emerald green"],
     {top:["bandeau top with beaded trim","p"],bottom:["high-slit pareo wrap skirt","s"],neckAccessory:["fresh flower lei","-"],waistAccessory:["beaded waist chain","a"],earAccessory:["flower tucked behind one ear","-"]},{detailThree:"sheer chiffon"})],
  ["inuit",
   C("inuit","Arctic parka","Inuit and Arctic: a fur-trimmed hooded parka with embroidered trim over a knit sweater, fur-lined mittens and knee-high fur-trimmed leg warmers.",["crimson red","ivory","navy blue","tan","silver"],
     {top:["oversized cotton sweater","s"],outerwear:["fur-trimmed hooded parka with embroidered trim","p"],gloves:["fur-lined mittens","t"],legwear:["knee-high fur-trimmed leg warmers","s"]},{detailOne:"embroidered hem"}),
   X("inuit","Arctic furs","Inuit and Arctic: a cropped fur-trimmed parka top with an open front, fur-trimmed shorts, long fur-lined gloves and fur-top stockings.",["black","ivory","crimson red","silver","tan"],
     {top:["cropped fur-trimmed parka top with an open front","p"],bottom:["fur-trimmed shorts","s"],gloves:["long fur-lined gloves","t"],legwear:["thigh-high stockings with fur tops","p"]},{detailOne:"fur trim"})],
  ["aboriginal",
   C("aboriginal","Outback sundress","Aboriginal Australian: a tiered cotton sundress with a woven border pattern, a woven fiber headband, a shell necklace and beaded bracelets.",["terracotta","ivory","sand","teal","mustard"],
     {top:["tiered cotton sundress with a woven border pattern","p"],headwear:["woven fiber headband","a"],neckAccessory:["shell necklace","-"],wristAccessory:["beaded bracelets","a"]},{detailThree:"woven geometric pattern"}),
   X("aboriginal","Desert sunset","Aboriginal Australian: a woven-fiber-trimmed halter top, a wrap skirt with a high slit, a shell necklace and layered beaded necklaces.",["terracotta","sand","teal","ivory","gold"],
     {top:["woven-fiber-trimmed halter top","p"],bottom:["wrap sarong skirt","s"],neckAccessory:["layered beaded necklaces","-"],waistAccessory:["beaded waist chain","a"]},{detailThree:"crochet texture"})],
  /* ---------- Mixed heritage ---------- */
  ["eurasian",
   C("eurasian","East meets West","East Asian and European: a mandarin-collar silk blouse with frog buttons, a pleated midi skirt, a belted trench coat and a silk scarf.",["ivory","jade green","navy blue","camel","gold"],
     {top:["mandarin-collar silk blouse with frog buttons","p"],bottom:["pleated midi skirt","s"],outerwear:["belted trench coat","t"],neckAccessory:["silk scarf","a"]},{detailOne:"embroidered hem"}),
   X("eurasian","Qipao and blazer","East Asian and European: a corset-style qipao crop top, a high-slit satin skirt and a tailored blazer worn off the shoulders.",["black","crimson red","gold","ivory","silver"],
     {top:["corset-style qipao crop top","p"],bottom:["high-slit satin skirt","s"],outerwear:["tailored blazer worn off the shoulders","e"],earAccessory:["delicate drop earrings","a"]},{detailThree:"brocade pattern"})],
  ["blackeuro",
   C("blackeuro","Kente-trim tailoring","Black and white mixed: a fitted blouse with woven kente-style trim, a pleated midi skirt, a tailored blazer with woven trim and a beret.",["ivory","forest green","golden yellow","crimson red","navy blue"],
     {top:["fitted blouse with woven kente-style trim","p"],bottom:["pleated midi skirt","s"],outerwear:["tailored blazer with woven trim","t"],headwear:["beret","a"]},{detailThree:"woven geometric pattern"}),
   X("blackeuro","Tailored heat","Black and white mixed: a plunging tailored vest top with woven trim, a fitted pencil skirt and a tailored blazer worn off the shoulders.",["black","gold","crimson red","ivory","emerald green"],
     {top:["plunging tailored vest top with woven trim","p"],bottom:["fitted pencil skirt","s"],outerwear:["tailored blazer worn off the shoulders","e"],neckAccessory:["layered delicate necklaces","-"]},{detailThree:"woven geometric pattern"})],
  ["mena_euro",
   C("mena_euro","Linen and trench","Middle Eastern and European: an embroidered linen dress with a tie waist, a belted trench coat, a straw hat and a layered necklace.",["ivory","terracotta","teal","gold","camel"],
     {top:["embroidered linen dress with a tie waist","p"],outerwear:["belted trench coat","s"],headwear:["straw hat","-"],neckAccessory:["layered delicate necklaces","-"]},{detailOne:"embroidered hem"}),
   X("mena_euro","Silk and gold","Middle Eastern and European: a silk slip dress with a deep neckline, a tailored blazer off the shoulders and layered gold chains.",["black","gold","emerald green","burgundy","champagne"],
     {top:["silk slip dress with a deep neckline","p"],outerwear:["tailored blazer worn off the shoulders","s"],neckAccessory:["chunky chain necklace","a"],earAccessory:["statement chandelier earrings","a"]},{detailThree:"metallic sheen"})],
  ["latino_asian",
   C("latino_asian","Stand-collar blusa","Latin and East Asian mixed: an off-shoulder blouse with a stand collar, a tiered ruffled skirt, a flower hair clip and drop earrings.",["ivory","fuchsia","jade green","golden yellow","royal blue"],
     {top:["off-shoulder blouse with a stand collar","p"],bottom:["tiered ruffled skirt with ribbon trim","s"],headwear:["flower hair clip","a"],earAccessory:["delicate drop earrings","a"]},{detailOne:"embroidered flowers"}),
   X("latino_asian","Fusion fiesta","Latin and East Asian mixed: an off-shoulder crop top with a stand collar, a high-slit tiered ruffle skirt and chunky hoop earrings.",["crimson red","black","gold","ivory","jade green"],
     {top:["off-shoulder crop top with a stand collar","p"],bottom:["high-slit tiered ruffle skirt","s"],earAccessory:["chunky hoop earrings","a"],headwear:["flower hair clip","a"]},{detailOne:"embroidered flowers"})]
  ];
  const REG=[
   ["Culture: Europe",["nordic","celtic","westeuro","slavic","mediterranean"]],
   ["Culture: Middle East and North Africa",["arab","persian","turkish","maghrebi"]],
   ["Culture: South and Central Asia",["northindian","southindian","bengali","pakistani","himalayan","mongolian"]],
   ["Culture: East and Southeast Asia",["han","japanese","korean","filipino","thai","malay"]],
   ["Culture: Africa",["westafrican","eastafrican","southafrican"]],
   ["Culture: The Americas",["caribbean","blackamerican","mestiza","andean","brazilian","afrolatina","native"]],
   ["Culture: Pacific, Arctic and Australia",["polynesian","inuit","aboriginal"]],
   ["Culture: Mixed heritage",["eurasian","blackeuro","mena_euro","latino_asian"]]
  ];
  const byKey=Object.fromEntries(CUL.map(([k,c,x])=>[k,[c,x]]));
  const BAD=[];
  REG.forEach(([lab,ks])=>{
    const ids=[];
    ks.forEach(k=>{if(!byKey[k])throw new Error("missing cultural outfits for "+k);byKey[k].forEach(p=>{
      Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing item "+f+" / "+v);if(COLOR_RX.test(v))BAD.push("color word in item name: "+v)});
      Object.entries(p.details).forEach(([f,v])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing detail "+f+" / "+v)});
      Object.values(p.pal).forEach(n=>{if(!COLORS[n])BAD.push("unknown palette color "+n+" in "+p.id)});
      if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p);ids.push(p.id)})});
    PRESET_GROUPS.outfit.push({label:lab,keys:ids});
  });
  if(BAD.length)throw new Error([...new Set(BAD)].join(" ## "));
})();

/* ---- v64: five BDSM-style and five hedonistic adult outfit presets ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  [["top","latex catsuit with a front zipper","L"],["top","sheer draped silk toga dress with a plunging neckline","LS"],
   ["bra","leather chest harness with metal rings","L"],["bottom","leather pencil skirt with a back zipper","LS"],
   ["outerwear","long open leather coat worn off the shoulders","LS"],["headwear","peaked leather cap","S"],
   ["eyewear","jeweled masquerade eye mask","US"]].forEach(([f,v,t])=>addO(f,v,t,"boudoir"));
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-"};
  const mk=(id,name,blurb,pal,items,det,under)=>{const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    return {id,name,blurb:blurb+" Adult only.",look:"boudoir",season:"",adultOnly:true,...(under?{showUnder:true}:{}),pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}}};
  const NEW=[
   mk("bd_harness","Leather harness set","A leather chest harness with metal rings, micro leather shorts, a body harness belt, long leather gloves, a ringed collar and cuffs.",["black","crimson red","silver","charcoal gray","white"],
     {bra:["leather chest harness with metal rings","p"],bottom:["micro leather shorts","p"],belt:["leather body harness belt","p"],gloves:["long leather gloves","p"],neckAccessory:["leather collar with a ring","p"],wristAccessory:["leather wrist cuffs with rings","p"],legwear:["thigh-high stockings","s"],thighAccessory:["leather thigh straps","p"]},{detailThree:"buttery soft leather",detailOne:"exposed chain links"},true),
   mk("bd_latex","Latex catsuit","A glossy latex catsuit with a front zipper, latex opera gloves, a chain-link collar and a layered waist chain.",["black","electric purple","silver","charcoal gray","white"],
     {top:["latex catsuit with a front zipper","p"],gloves:["latex opera gloves","s"],neckAccessory:["chain-link collar","t"],waistAccessory:["layered waist chain","t"],ringAccessory:["chunky chain ring","t"]},{detailThree:"oiled latex sheen",detailTwo:"skin-tight latex fit"}),
   mk("bd_corset","Velvet corset and chains","A lace-up velvet corset, a micro pleated leather skirt, fishnet thigh-highs, a chained collar, lace cuffs and hanging hip chains.",["burgundy","black","silver","plum","charcoal gray"],
     {corset:["lace-up velvet corset","p"],bottom:["micro pleated leather skirt","s"],legwear:["fishnet thigh-high stockings","s"],neckAccessory:["collar with a hanging chain","e"],wristAccessory:["lace wrist cuffs","s"],thighAccessory:["studded thigh strap with hanging chains","s"],hipAccessory:["hip chains with charms","e"]},{detailThree:"velvet texture",detailOne:"chain-link trim"},true),
   mk("bd_mistress","Leather mistress","A lace-up leather corset, a leather pencil skirt, a long open leather coat off the shoulders, seamed stockings, long gloves and a peaked leather cap.",["black","silver","scarlet red","charcoal gray","white"],
     {corset:["lace-up leather corset","p"],bottom:["leather pencil skirt with a back zipper","p"],outerwear:["long open leather coat worn off the shoulders","p"],gloves:["long leather gloves","p"],legwear:["seamed stockings","t"],headwear:["peaked leather cap","p"],neckAccessory:["metal ring choker","s"]},{detailThree:"buttery soft leather",detailTwo:"thigh-high slit"},true),
   mk("bd_satin","Satin collar set","A satin bralette, a strappy garter thong, thigh-highs, a satin robe, a belled satin choker, satin ribbon cuffs and satin thigh garters.",["blush pink","ivory","rose gold","wine","silver"],
     {bra:["satin bralette","p"],panties:["strappy garter thong","p"],outerwear:["satin robe","s"],legwear:["thigh-high stockings","s"],neckAccessory:["satin choker with a bell","t"],wristAccessory:["satin ribbon cuffs","t"],thighAccessory:["satin thigh garters with tiny bells","t"]},{detailThree:"glossy satin finish"},true),
   mk("hd_roman","Roman bacchanal","A sheer draped silk toga dress with a plunging neckline, a laurel leaf crown, a jeweled collar, armlets and a layered waist chain.",["ivory","wine","gold","emerald green","champagne"],
     {top:["sheer draped silk toga dress with a plunging neckline","p"],headwear:["laurel leaf crown","-"],neckAccessory:["jeweled collar necklace","a"],wristAccessory:["armlets","a"],waistAccessory:["layered chain waist","a"],ringAccessory:["gemstone ring","s"]},{detailThree:"sheer chiffon"}),
   mk("hd_penthouse","Penthouse pool party","A sequined bandeau and metallic thong under an open satin robe, a diamond choker, oversized sunglasses and a jeweled chain purse.",["champagne","black","gold","rose gold","silver"],
     {bra:["sequined bandeau","p"],panties:["metallic thong","p"],outerwear:["open satin robe worn off the shoulders","s"],neckAccessory:["diamond choker","-"],eyewear:["oversized sunglasses","-"],hipAccessory:["jeweled chain purse","a"],ringAccessory:["gemstone ring","a"],waistAccessory:["delicate body chain draped around the waist","a"]},{detailThree:"sequin finish"},true),
   mk("hd_rave","Rave afterglow","A neon mesh tank over a glow-strap bra, a chain-link mini skirt, bright fishnet tights, fingerless fishnet gloves and a holographic choker.",["neon pink","black","electric blue","neon green","silver"],
     {top:["neon mesh tank top","p"],bra:["glow-strap bra","s"],bottom:["chain-link mini skirt","s"],legwear:["bright fishnet tights","t"],gloves:["fingerless fishnet gloves","s"],neckAccessory:["holographic choker","-"],wristAccessory:["holographic bracelet","-"]},{detailThree:"body-glitter shimmer",detailOne:"sequin accents"},true),
   mk("hd_velvet","Velvet decadence","A velvet bustier top, a high-slit satin skirt, long velvet gloves, a feather boa, long pearl strands and chandelier earrings.",["burgundy","gold","champagne","black","emerald green"],
     {top:["velvet bustier top","p"],bottom:["high-slit satin skirt","s"],outerwear:["fur boa draped over the arms","t"],gloves:["long velvet gloves","p"],neckAccessory:["long layered pearl strands","-"],earAccessory:["statement chandelier earrings","s"],ringAccessory:["statement cocktail ring","s"]},{detailThree:"velvet texture",detailOne:"feather trim"}),
   mk("hd_masq","Masquerade indulgence","A lace bodysuit under a sheer lace robe, long lace gloves, lace-top thigh-highs, a lace choker and a jeweled masquerade mask.",["black","plum","gold","silver","ivory"],
     {top:["lace bodysuit","p"],outerwear:["sheer lace robe","s"],gloves:["long lace gloves","p"],legwear:["lace-top thigh-high stockings","p"],neckAccessory:["lace choker","p"],eyewear:["jeweled masquerade eye mask","a"]},{detailOne:"sheer lace panels"})
  ];
  const BAD=[];
  NEW.forEach(p=>{
    Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing item "+f+" / "+v);if(COLOR_RX.test(v))BAD.push("color word in item name: "+v)});
    Object.entries(p.details).forEach(([f,v])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing detail "+f+" / "+v)});
    Object.values(p.pal).forEach(n=>{if(!COLORS[n])BAD.push("unknown palette color "+n+" in "+p.id)});
  });
  if(BAD.length)throw new Error([...new Set(BAD)].join(" ## "));
  NEW.forEach(p=>{if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p)});
  PRESET_GROUPS.outfit.push({label:"BDSM styles (adult only)",keys:NEW.filter(p=>/^bd_/.test(p.id)).map(p=>p.id)});
  PRESET_GROUPS.outfit.push({label:"Hedonistic (adult only)",keys:NEW.filter(p=>/^hd_/.test(p.id)).map(p=>p.id)});
})();

/* ---- v65: ten monochrome outfit presets, one for each color ---- */
(function(){
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-"};
  const mk=(id,name,blurb,look,season,pal,items,det)=>{const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    return {id,name,blurb,look,season,pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}}};
  const NEW=[
   mk("mono_red","Scarlet evening","Monochrome red: a satin evening gown, a satin opera coat, opera gloves, a velvet choker, chandelier earrings and a clutch.","glam","",["crimson red","burgundy","blush pink","dusty rose","scarlet red"],
     {top:["satin evening gown","p"],outerwear:["satin opera coat","s"],gloves:["opera satin gloves","s"],neckAccessory:["velvet choker","s"],earAccessory:["statement chandelier earrings","e"],hipAccessory:["mini clutch bag","s"],ringAccessory:["statement cocktail ring","e"]},{detailThree:"glossy satin finish"}),
   mk("mono_pink","Pink confection","Monochrome pink: a puff-sleeve bow-front top, a bow-trimmed ruffle skirt, a fluffy cardigan, a satin hair bow and heart accessories.","sweet","",["hot pink","shell pink","rose pink","mauve","bubblegum pink"],
     {top:["puff-sleeve bow-front top","p"],bottom:["bow-trimmed ruffle skirt","s"],outerwear:["fluffy cardigan","t"],legwear:["thigh-high socks with bows","p"],headwear:["satin hair bow","e"],neckAccessory:["bow-front choker","e"],earAccessory:["heart earrings","e"],hipAccessory:["pastel heart-shaped bag","p"]},{detailOne:"bow clusters",detailThree:"satin finish"}),
   mk("mono_orange","Harvest sunset","Monochrome orange: a cable-knit sweater, a tiered cotton skirt, a quilted vest, knee socks, a newsboy cap and a silk scarf.","cottage","",["burnt orange","peach","caramel brown","mango","orange"],
     {top:["cable-knit sweater","p"],bottom:["tiered cotton skirt","s"],outerwear:["quilted cottage vest","t"],legwear:["knee-high socks","t"],headwear:["tweed newsboy cap","p"],neckAccessory:["silk scarf","e"],hipAccessory:["woven market tote","t"],wristAccessory:["stacked beaded bracelets","e"]},{detailThree:"chunky knit texture"}),
   mk("mono_yellow","Sunshine day","Monochrome yellow: a halter sundress, a cropped cardigan, a straw hat, a delicate necklace, flower earrings and a market tote.","casual","s",["golden yellow","pale yellow","honey gold","mustard yellow","lemon yellow"],
     {top:["halter sundress","p"],outerwear:["cropped cardigan","s"],headwear:["straw hat","-"],neckAccessory:["delicate chain necklace","t"],earAccessory:["flower earrings","e"],legwear:["ankle socks","s"],hipAccessory:["woven market tote","-"]},{detailThree:"polka dots"}),
   mk("mono_green","Forest meadow","Monochrome green: a puff-sleeve linen blouse, a high-waisted prairie skirt, a crochet cardigan, knee socks and a flower crown.","cottage","",["emerald green","mint green","olive green","eucalyptus","lime green"],
     {top:["puff-sleeve linen blouse","s"],bottom:["high-waisted prairie skirt","p"],outerwear:["crochet cardigan","t"],legwear:["knee-high socks","t"],headwear:["flower crown","a"],belt:["woven belt","e"],hipAccessory:["wicker basket bag","-"]},{detailOne:"embroidered flowers"}),
   mk("mono_blue","Ocean tailoring","Monochrome blue: a silk blouse, wide-leg trousers, a tailored blazer, a silk scarf, a headband and a structured satchel.","preppy","",["cobalt blue","navy blue","sky blue","ice blue","azure blue"],
     {top:["silk blouse","t"],bottom:["wide-leg trousers","s"],outerwear:["tailored blazer","p"],neckAccessory:["silk scarf","a"],headwear:["headband","t"],hipAccessory:["structured satchel","s"],earAccessory:["tiny gemstone studs","a"]},{detailThree:"crisp poplin"}),
   mk("mono_purple","Amethyst gala","Monochrome purple: a velvet gown, a beaded evening wrap, long velvet gloves, a small tiara and crystal earrings.","glam","",["royal purple","dusty lavender","plum","orchid purple","violet"],
     {top:["velvet gown","p"],outerwear:["beaded evening wrap","s"],gloves:["long velvet gloves","p"],headwear:["small tiara","e"],earAccessory:["dangling crystal earrings","e"],hipAccessory:["beaded evening bag","t"],ringAccessory:["gemstone ring","a"]},{detailThree:"crushed velvet texture"}),
   mk("mono_white","Winter white","Monochrome white: a fuzzy knit sweater, a pleated midi skirt, a wool coat, opaque tights, a beanie, knit gloves and a puffy scarf.","casual","w",["white","silver","champagne","antique ivory","pearl gray"],
     {top:["fuzzy knit sweater","p"],bottom:["pleated midi skirt","p"],outerwear:["wool coat","t"],legwear:["opaque tights","p"],headwear:["beanie","p"],gloves:["knit gloves","p"],neckAccessory:["puffy scarf","t"],hipAccessory:["mini top-handle bag","p"]},{detailThree:"chunky knit texture"}),
   mk("mono_black","Noir","Monochrome black: a fitted turtleneck, tailored trousers, a leather jacket, a thin choker, a leather cuff and dark sunglasses.","edgy","",["black","charcoal gray","smoky gray","mist gray","pearl gray"],
     {top:["fitted turtleneck","p"],bottom:["high-waisted tailored trousers","p"],outerwear:["leather jacket","s"],belt:["thin leather belt","p"],neckAccessory:["thin choker","p"],wristAccessory:["leather cuff","p"],eyewear:["dark round sunglasses","-"],hipAccessory:["crossbody bag","p"],ringAccessory:["signet ring","t"]},{detailThree:"matte finish"}),
   mk("mono_gold","Gilded glamour","Monochrome gold: a sequin mini dress, a beaded evening wrap, a statement necklace, bangles, a cocktail ring and a jeweled hair comb.","glam","",["gold","antique gold","sand","cream","champagne gold"],
     {top:["sequin mini dress","p"],outerwear:["beaded evening wrap","t"],neckAccessory:["statement necklace","p"],earAccessory:["statement chandelier earrings","p"],wristAccessory:["bangles","p"],ringAccessory:["statement cocktail ring","p"],headwear:["jeweled hair comb","p"],hipAccessory:["beaded evening bag","s"]},{detailThree:"metallic sheen"})
  ];
  const BAD=[];
  NEW.forEach(p=>{
    Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing item "+f+" / "+v);if(COLOR_RX.test(v))BAD.push("color word in item name: "+v)});
    Object.entries(p.details).forEach(([f,v])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push("preset "+p.id+": missing detail "+f+" / "+v)});
    Object.values(p.pal).forEach(n=>{if(!COLORS[n])BAD.push("unknown palette color "+n+" in "+p.id)});
  });
  if(BAD.length)throw new Error([...new Set(BAD)].join(" ## "));
  NEW.forEach(p=>{if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p)});
  PRESET_GROUPS.outfit.push({label:"Monochrome, one color head to toe",keys:NEW.map(p=>p.id)});
})();

/* ---- v66: "Rose-streak beauty" starting point (from reference images) and the options it needs ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  const addO=(f,v,t,fam,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(g)it.g=g;OUTFIT[f].push(it)}};
  addC("hairBlend","distinct, sharply defined {c} streaks running from the roots all the way to the tips, with no gradient","Color blending");
  addC("hairBlend","distinct, sharply defined highlight streaks running from the roots all the way to the tips, with no gradient","Color blending");
  addC("markings","a beauty mark on the chest","Natural");
  addC("markings","a small beauty mark on the upper chest and another beneath one eye","Natural");
  addO("headwear","angular mechanical hair ornaments","CU","edgy,glam");
  addO("wingPiece","small feathered angel wings (costume)","CU","costume,resort");
  addO("top","apron-style halter camisole","CU","casual");
  addO("top","fringed western crop top","CUS","costume,casual");
  addO("top","sleeveless one-piece swimsuit with a keyhole front","CU","resort,sporty");

  const T={id:"rosestreak",name:"Rose-streak beauty",adultOnly:true,
    blurb:"Pink-red hair with gray streaks in high twin ponytails, rose-red eyes, a beauty mark beneath one eye and on the chest, X-shaped hair clips and a heart choker. A very curvy figure with a full bust and thick thighs. Seven outfits: frilled bikini with angel wings, white swimsuit, apron camisole, cowgirl, athletic jacket, pleated skirt, bikini and jacket.",
    pal:{primary:"rose pink",secondary:"slate gray",third:"black",accent:"crimson red",extra:"white"},
    c:Object.assign({},HERITAGE.japanese.v,{
      age:"woman",impression:"a bombshell presence",expression:"playful smile",
      faceShape:"heart-shaped face with high cheekbones and a tapered chin",eyeShape:"large, striking eyes",
      eyeOne:"@accent",eyeTwo:"@accent",
      hairStyle:"high twin ponytails",hairLength:"short",hairTexture:"loose waves",bangs:"long sidelocks with loose face-framing strands",
      hairBase:"@primary",hairHighlights:"@secondary",hairBlend:"distinct, sharply defined highlight streaks running from the roots all the way to the tips, with no gradient",
      skinTone:"porcelain",markings:"a small beauty mark on the upper chest and another beneath one eye",
      makeupStyle:"idol makeup",
      _body:"bottomHeavy"}),
    outfit:{oname:"Angel bikini",look:"resort",items:{
        top:["frilled halter bikini top with a front ribbon tie","auto"],bottom:["side-tie bikini bottoms","auto"],
        wingPiece:["small feathered angel wings (costume)","@extra"],headwear:["X-shaped hair clips","@third"],
        neckAccessory:["heart choker","@third"],wristAccessory:["ribbon bracelet","@primary"]},
      details:{detailOne:"frilled trim",detailTwo:"side ribbon ties"},dcol:{}},
    more:[
      {oname:"White swimsuit",look:"resort",items:{
        top:["sleeveless one-piece swimsuit with a keyhole front","@extra"],headwear:["angular mechanical hair ornaments","@third"],
        neckAccessory:["heart choker","@third"],wristAccessory:["ribbon bracelet","@third"]},
        details:{detailOne:"{c} trim"},dcol:{detailOne:"emerald green"}},
      {oname:"Apron camisole",look:"casual",items:{
        top:["apron-style halter camisole","plum purple"],bottom:["high-waisted shorts","@third"],headwear:["X-shaped hair clips","@third"],
        neckAccessory:["heart choker","@third"],wristAccessory:["scrunchie on the wrist","@primary"]},
        details:{},dcol:{}},
      {oname:"Cowgirl",look:"costume,casual",items:{
        top:["fringed western crop top","@extra"],bottom:["denim cutoff shorts","light blue"],headwear:["felt cowgirl hat","@extra"],
        belt:["western belt with a large buckle","brown"],neckAccessory:["heart choker","@third"]},
        details:{detailOne:"fringe trim"},dcol:{}},
      {oname:"Athletic jacket",look:"sporty",items:{
        top:["fitted sports bra top","@third"],outerwear:["cropped warm-up jacket","sky blue"],bottom:["flared yoga leggings","@third"],
        headwear:["X-shaped hair clips","@third"],neckAccessory:["heart choker","@third"]},
        details:{detailTwo:"athletic fit"},dcol:{}},
      {oname:"Pleated skirt",look:"casual",items:{
        top:["short-sleeve collared blouse","@extra"],bottom:["pleated mini skirt","@third"],legwear:["thigh-high socks","@third"],
        headwear:["angular mechanical hair ornaments","@third"],neckAccessory:["heart choker","@third"]},
        details:{},dcol:{}},
      {oname:"Bikini and jacket",look:"sporty",items:{
        top:["triangle bikini top","auto"],outerwear:["cropped warm-up jacket","@extra"],bottom:["pleated tennis skirt","@extra"],
        headwear:["X-shaped hair clips","@third"],neckAccessory:["heart choker","@third"]},
        details:{detailOne:"{c} trim"},dcol:{detailOne:"emerald green"}}
    ]};
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const g=PRESET_GROUPS.start.find(g=>g.label==="Stylish");if(g&&!g.keys.includes(T.id))g.keys.push(T.id);
})();

/* ---- v73: "Ideal" body preset (adult only) and the options it needs ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addC("bustSize","very large, full, naturally rounded breasts","Full figure (adult)");
  addC("heightStature","a petite frame","Height");
  addC("thighBuild","thick soft thighs","Full figure (adult)");
  BODY_PRESETS.ideal={label:"Ideal",adultOnly:true,v:{bustSize:"very large, full, naturally rounded breasts",heightStature:"a petite frame",shoulderShape:"narrow shoulders",waistShape:"tiny waist",stomachShape:"soft stomach",hipShape:"rounded hips",buttSize:"full, round butt",thighBuild:"thick soft thighs",legShape:"shapely legs",bodySoftness:"extremely top-heavy hourglass figure",handShape:"small and feminine"},blurb:"Petite frame, very large full breasts, narrow shoulders, tiny waist, rounded hips, a full round butt and thick soft thighs."};
  const g=PRESET_GROUPS.body.find(x=>/Top-heavy/.test(x.label));if(g&&!g.keys.includes("ideal"))g.keys.push("ideal");
})();

/* ---- v74: "Narrative" sentence style (Finish > Prompt style), its fields and the "Ideal" starting point ---- */
(function(){
  const addCol=(n,hex)=>{if(!COLORS[n])COLORS[n]=hex;if(!ALL_COLORS.includes(n)&&!EVERYDAY_SET.has(n))ALL_COLORS.push(n)};
  addCol("slightly deeper powder blue","#8FB4DA");addCol("subtle pale-gold","#EBD9A0");addCol("warm honey orange","#E89A45");
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g])};
  addC("undertone","subtle golden","");
  addC("markings","soft freckles scattered across the body","Freckles");
  addC("hairBlend","blended blue, white, and orange gradient streaks","Color blending");
  ["small and feminine","small and delicate","slender and graceful","long, slender fingers","soft and dainty","strong and capable","elegant, long-fingered","small, soft"].forEach(v=>addC("handShape",v,"Hands"));
  ["light body freckles dust the shoulders, chest, stomach, hips, and thighs","soft freckles dust the nose, cheeks, and shoulders","dense freckles cover the shoulders, chest, and back","a scattering of beauty marks dots the chest and thighs","faint tan lines mark the shoulders, chest, and hips"].forEach(v=>addC("bodyMarkings",v,"Freckles and marks"));
  Object.assign(LABELS,{handShape:"Hands",bodyMarkings:"Body freckles and marks"});
  const B=STEP_FIELDS.body;
  if(!B.includes("handShape"))B.splice(B.indexOf("posture")+1,0,"handShape");
  if(!B.includes("bodyMarkings"))B.splice(B.includes("markingColor")?B.indexOf("markingColor")+1:B.indexOf("markings")+1,0,"bodyMarkings");
  _fieldStep=null;
})();
const NARR_DROPPED=new Set(["faceShape","expression","browShape","noseShape","mouthShape","faceMark","impression","eyeShape","scleraStyle","scleraColor","pupilStyle","irisDetail","lashNatural","makeupStyle","eyelinerStyle","eyeshadowStyle","lashStyle","blushStyle","lipFinish","faceAccents","makeupColor","nailStyle","nailColor"]);
const narrOn=()=>!!S&&S.out.style==="narrative"&&!S.out.compact;
const narrDropped=id=>narrOn()&&NARR_DROPPED.has(id);
const COLW="blue|orange|green|brown|gray|grey|pink|red|purple|violet|gold|golden|silver|amber|yellow|white|black|teal|aqua|lavender|peach|cream|ivory|tan|bronze|copper|beige";
const hyC=c=>String(c||"").replace(new RegExp("^(.*[a-z]) ("+COLW+")$","i"),"$1-$2");
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

/* Ideal starting point: reproduces the reference prompt with the narrative sentence style */
(function(){
  const T={id:"ideal",name:"Ideal",adultOnly:true,
    blurb:"Flowing sentence style: powder-blue, milky-white and creamsicle-orange hair with pale-gold highlights, one sky-blue and one honey-orange eye, warm light-brown skin with freckles, a petite and very top-heavy hourglass figure.",
    pal:{primary:"slightly deeper powder blue",secondary:"milky white",third:"creamsicle orange",accent:"soft peach",extra:"subtle pale-gold"},
    c:{age:"woman",eyeConfig:"heterochromatic",eyeOne:"sky blue",eyeTwo:"warm honey orange",
      hairLength:"very long",hairTexture:"straight",hairMovement:"falls smoothly past the waist",hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"pale gold",hairBlend:"blended blue, white, and orange gradient streaks",
      skinTone:"warm light-brown",undertone:"subtle golden",markings:"soft freckles scattered across the body",bodyMarkings:"light body freckles dust the shoulders, chest, stomach, hips, and thighs",
      _body:"ideal"},
    outfit:{oname:"Outfit 1",look:"",items:{},details:{},dcol:{}},
    out:{style:"narrative",palName:"soft blue, white, and orange",repeatBody:true}};
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const g=PRESET_GROUPS.start.find(g=>g.label==="Stylish");if(g&&!g.keys.includes(T.id))g.keys.push(T.id);
})();
/* ---- v76: ten cute prep-school outfit presets (anime-inspired) and the options they need ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  addO("outerwear","crested school blazer","CU","preppy");
  addO("top","sailor-collar blouse with a chest bow","CU","preppy");
  addO("top","school gym shirt","CU","sporty");
  addO("top","paint-splattered art smock","CU","casual");
  addO("bottom","knee-length plaid pleated skirt","CU","preppy");
  addO("bottom","knee-length pleated skirt","CU","preppy");
  addO("bottom","knee-length gym shorts","CU","sporty");
  addO("headwear","soft beret","CU","preppy,casual");
  addO("wristAccessory","student council armband","CU","preppy");
  addO("tagCharm","school crest pin","CU","preppy");
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-"};
  const mk=(id,name,blurb,look,season,pal,items,det)=>{const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    return {id,name,blurb,look,season,pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}}};
  const NEW=[
   mk("prep_blazer","Prep blazer set","A crested school blazer over a button-up blouse with a ribbon bow tie, a knee-length plaid pleated skirt, knee-high socks, a crest pin and a satchel.","preppy","",["navy blue","white","crimson red","gray","gold"],
     {top:["button-up blouse","s"],outerwear:["crested school blazer","p"],bottom:["knee-length plaid pleated skirt","p"],neckAccessory:["ribbon bow tie","t"],legwear:["knee-high socks","s"],tagCharm:["school crest pin","e"],hipAccessory:["structured satchel","a"]},{detailOne:"embroidered crest"}),
   mk("prep_sailor","Sailor-collar set","A sailor-collar blouse with a chest bow, a knee-length pleated skirt, knee-high socks, a crest pin and a small book satchel.","preppy","",["navy blue","white","crimson red","sky blue","gold"],
     {top:["sailor-collar blouse with a chest bow","s"],bottom:["knee-length pleated skirt","p"],legwear:["knee-high socks","s"],tagCharm:["school crest pin","e"],hipAccessory:["small book satchel","t"]},{detailOne:"contrast collar"}),
   mk("prep_vest","Sweater-vest set","A knit sweater vest over a collared shirt with a ribbon bow tie, a pleated midi skirt, argyle knee socks, a bow headband and a book satchel.","preppy","",["gray","white","burgundy","tan","gold"],
     {top:["sweater vest over a collared shirt","p"],bottom:["pleated midi skirt","p"],neckAccessory:["ribbon bow tie","t"],legwear:["argyle knee socks","a"],headwear:["bow headband","t"],tagCharm:["school crest pin","e"],hipAccessory:["small book satchel","a"]}),
   mk("prep_summer","Summer short sleeves","A short-sleeve collared blouse with a ribbon bow tie, a pastel pleated skirt, ankle socks, a hair ribbon and a small tote.","preppy","s",["white","sky blue","navy blue","pale yellow","silver"],
     {top:["short-sleeve collared blouse","p"],bottom:["pastel pleated skirt","s"],neckAccessory:["ribbon bow tie","t"],legwear:["ankle socks","p"],headwear:["ribbon hair bow","a"],tagCharm:["school crest pin","e"],hipAccessory:["small tote bag","s"],wristAccessory:["hair tie on the wrist","a"]}),
   mk("prep_winter","Winter coat set","A double-breasted peacoat over a sweater vest, a pleated midi skirt, opaque tights, a puffy scarf, knit gloves and a beanie.","preppy","w",["navy blue","gray","burgundy","white","gold"],
     {top:["sweater vest over a collared shirt","s"],outerwear:["double-breasted peacoat","p"],bottom:["pleated midi skirt","p"],legwear:["opaque tights","p"],neckAccessory:["puffy scarf","t"],gloves:["knit gloves","t"],headwear:["beanie","s"],tagCharm:["school crest pin","e"],hipAccessory:["structured satchel","a"]}),
   mk("prep_cardigan","Cardigan and ribbon","An oversized cardigan over a button-up blouse with a thin ribbon tie, a knee-length pleated skirt, knee-high socks, a hair ribbon and a ribbon bracelet.","preppy","",["dusty rose","white","navy blue","gray","gold"],
     {top:["button-up blouse","s"],outerwear:["oversized cardigan","p"],bottom:["knee-length pleated skirt","t"],neckAccessory:["thin ribbon tie at the collar","a"],legwear:["knee-high socks","s"],headwear:["ribbon hair bow","p"],wristAccessory:["ribbon bracelet","p"],tagCharm:["school crest pin","e"],hipAccessory:["small book satchel","t"]},{detailOne:"ribbon trim"}),
   mk("prep_gym","Gym class","A school gym shirt, knee-length gym shorts, a zip-up track jacket, knee-high athletic socks, a sports headband, a wristband and a small gym bag.","sporty","",["navy blue","white","sky blue","gray","gold"],
     {top:["school gym shirt","s"],bottom:["knee-length gym shorts","p"],outerwear:["zip-up track jacket","p"],legwear:["knee-high athletic socks","s"],headwear:["sports headband","t"],wristAccessory:["athletic wristband","t"],hipAccessory:["small gym bag","p"]},{detailTwo:"athletic fit"}),
   mk("prep_tennis","Tennis club","A tennis dress with a lightweight track vest, a visor cap, knee-high athletic socks, a wristband, a crest pin and a gym bag.","sporty","s",["white","navy blue","mint green","gray","gold"],
     {top:["tennis dress","s"],outerwear:["lightweight track vest","p"],headwear:["visor cap","p"],legwear:["knee-high athletic socks","s"],wristAccessory:["athletic wristband","t"],tagCharm:["school crest pin","e"],hipAccessory:["small gym bag","t"]},{detailTwo:"athletic fit"}),
   mk("prep_council","Student council","A crested school blazer over a button-up blouse with a necktie, a pleated midi skirt, knee-high socks, a council armband, a name badge, glasses and a book satchel.","preppy","",["navy blue","white","crimson red","gray","gold"],
     {top:["button-up blouse","s"],outerwear:["crested school blazer","p"],bottom:["pleated midi skirt","p"],neckAccessory:["loosely knotted necktie","t"],legwear:["knee-high socks","s"],wristAccessory:["student council armband","t"],tagCharm:["name badge pinned to the chest","e"],eyewear:["rimless glasses","-"],hipAccessory:["small book satchel","a"]},{detailOne:"embroidered crest"}),
   mk("prep_art","Art club","A paint-splattered art smock with a knee-length pleated skirt, ankle socks, a soft beret, a hair-tie bracelet, a crest pin and a small tote.","casual","",["white","dusty rose","sky blue","tan","gold"],
     {top:["paint-splattered art smock","s"],bottom:["knee-length pleated skirt","t"],legwear:["ankle socks","s"],headwear:["soft beret","p"],wristAccessory:["hair tie on the wrist","a"],tagCharm:["school crest pin","e"],hipAccessory:["small tote bag","a"]})
  ];
  const BAD=[];
  NEW.forEach(p=>Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(p.id+" "+f+": "+v)}));
  if(BAD.length)throw new Error("prep presets: missing items "+BAD.join("; "));
  NEW.forEach(p=>{if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p)});
  const G=PRESET_GROUPS.outfit.find(g=>g.label==="Prep school (cute)");
  if(!G)PRESET_GROUPS.outfit.push({label:"Prep school (cute)",keys:NEW.map(p=>p.id)});
})();

/* ---- v77: "Golden retriever girl" starting point ---- */
(function(){
  const T={id:"goldenpup",name:"Golden retriever girl",
    blurb:"A sunny dog-girl built on a golden retriever: honey-gold wavy hair with cream highlights, floppy dog ears, a wagging tail, warm brown eyes, freckles and an open-mouthed grin. Three easygoing outfits.",
    pal:{primary:"honey gold",secondary:"cream",third:"caramel brown",accent:"sky blue",extra:"white"},
    c:{age:"woman",subjectType:"dog",
      faceShape:"heart-shaped face with soft cheeks",expression:"bubbly open-mouthed grin",browShape:"soft, natural eyebrows",noseShape:"small nose",mouthShape:"soft lips",
      eyeConfig:"matching",eyeShape:"large, warm eyes",pupilStyle:"round pupils",eyeOne:"honey brown",eyeTwo:"honey brown",
      hairStyle:"long wavy hair",hairTexture:"loose waves",bangs:"curtain bangs",hairBase:"@primary",hairHighlights:"@secondary",hairBlend:"subtle natural highlights",
      earStyle:"floppy dog ears",tailStyle:"wagging dog tail",fangClawStyle:"subtle fangs and small claws",fantasyAccentColor:"@secondary",
      skinTone:"light tan",undertone:"warm",skinFinish:"natural skin texture with a sun-kissed glow",markings:"light freckles across the nose",
      makeupStyle:"minimal makeup",blushStyle:"soft cheek blush",lipFinish:"natural lip finish",
      _body:"athletic"},
    outfit:{oname:"Sunny walk",look:"casual",items:{
        top:["oversized sports tee","@primary"],bottom:["denim shorts","-"],headwear:["bandana headband","@accent"],neckAccessory:["bandana neck scarf","@accent"],
        legwear:["knee-high athletic socks","@extra"],wristAccessory:["friendship bracelets","-"],hipAccessory:["crossbody bag","@third"],tagCharm:["small paw pin","-"]},
      details:{},dcol:{}},
    more:[
      {oname:"Cozy sweater",look:"casual",items:{
        top:["oversized cotton sweater","@secondary"],bottom:["tiered cotton skirt","@third"],legwear:["knee-high wool socks","@primary"],
        neckAccessory:["puffy scarf","@accent"],hipAccessory:["small tote bag","@third"],tagCharm:["small paw pin","-"]},
        details:{},dcol:{}},
      {oname:"Sporty",look:"sporty",items:{
        top:["fitted sports bra top","@extra"],outerwear:["zip-up track jacket","@primary"],bottom:["running shorts","@third"],
        legwear:["knee-high athletic socks","@secondary"],headwear:["sports headband","@accent"],wristAccessory:["athletic wristband","@accent"],hipAccessory:["small gym bag","@third"]},
        details:{detailTwo:"athletic fit"},dcol:{}}
    ]};
  const BAD=[];
  [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(f+": "+v)}));
  Object.entries(T.c).forEach(([f,v])=>{if(f!=="_body"&&CHAR[f]&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push("c "+f+": "+v)});
  if(BAD.length)throw new Error("goldenpup: "+BAD.join("; "));
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const g=PRESET_GROUPS.start.find(g=>g.label==="Fantasy");if(g&&!g.keys.includes(T.id))g.keys.push(T.id);
})();

/* ---- v78: "Black cat girl" starting point ---- */
(function(){
  const T={id:"blackcat",name:"Black cat girl",
    blurb:"A sleek cat-girl built on a black cat: glossy black hair, amber eyes with slit pupils, cat ears, a slender feline tail and a cool, unbothered look. Three outfits: a cozy turtleneck, a gothic lace dress and lazy loungewear.",
    pal:{primary:"black",secondary:"charcoal gray",third:"silver",accent:"amber",extra:"white"},
    c:{age:"woman",subjectType:"cat",
      faceShape:"heart-shaped face",expression:"cool aloof expression",browShape:"soft, natural eyebrows",noseShape:"small nose",mouthShape:"soft lips",
      eyeConfig:"matching",eyeShape:"large catlike eyes",pupilStyle:"vertical slit pupils",eyeOne:"amber",eyeTwo:"amber",
      hairStyle:"long straight hair",hairTexture:"glossy",bangs:"wispy bangs",hairBase:"@primary",
      earStyle:"cat ears",tailStyle:"slender feline tail",fangClawStyle:"subtle fangs and small claws",fantasyAccentColor:"@accent",
      skinTone:"fair",undertone:"cool",skinFinish:"natural skin texture with a soft matte finish",markings:"no markings",
      makeupStyle:"subtle smoky eye makeup",blushStyle:"soft cheek blush",lipFinish:"soft matte lips",
      _body:"slender"},
    outfit:{oname:"Midnight turtleneck",look:"casual",items:{
        top:["fitted turtleneck","@primary"],bottom:["pleated mini skirt","@secondary"],legwear:["knee-high socks","@primary"],
        neckAccessory:["bell ribbon choker","@accent"],wristAccessory:["delicate bracelet","-"],hipAccessory:["mini shoulder bag","@primary"],tagCharm:["cat-paw pin","-"]},
      details:{},dcol:{}},
    more:[
      {oname:"Gothic lace",look:"gothic",items:{
        top:["lace-trimmed gothic dress","@primary"],legwear:["opaque tights","@primary"],
        neckAccessory:["velvet choker with a crescent charm","@accent"],wristAccessory:["lace wrist cuffs","@primary"],tagCharm:["cat-paw pin","-"]},
        details:{},dcol:{}},
      {oname:"Lazy loungewear",look:"casual",items:{
        top:["oversized cotton sweater","@secondary"],bottom:["high-waisted shorts","@primary"],legwear:["fuzzy knee-high socks","@third"],
        neckAccessory:["bell ribbon choker","@accent"],tagCharm:["cat-paw pin","-"]},
        details:{},dcol:{}}
    ]};
  const BAD=[];
  [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(f+": "+v)}));
  Object.entries(T.c).forEach(([f,v])=>{if(f!=="_body"&&CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push("c "+f+": "+v)});
  if(BAD.length)throw new Error("blackcat: "+BAD.join("; "));
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const g=PRESET_GROUPS.start.find(g=>g.label==="Fantasy");if(g&&!g.keys.includes(T.id))g.keys.push(T.id);
})();

/* ---- v81: gate for the intimate detail fields (kept outside the safeguard block; it only calls Policy) ---- */
const INTIMATE_FIELDS=["nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","penisColor","penisType","penisSize","pubicHair"];
const INTIMATE_COVERING=["top","bottom","corset","outerwear","bra","panties"];
const intimateSet=()=>INTIMATE_FIELDS.filter(f=>S.c[f]!=null&&S.c[f]!==""&&S.c[f]!=="none");
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
const intimateDropped=id=>INTIMATE_FIELDS.includes(id)&&!intimateGate().open;
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

/* ---- v81: adult-only intimate detail fields (Body step). They only work for an explicitly adult subject
   with no youth-coded content, and only when the outfit is nude (no top, bottom, corset, outerwear, bra
   or panties) or the output mode is Character only. Everything else holds them out of the prompt. ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];if(!CHAR[f].some(x=>x[0]===v))CHAR[f].push([v,g||""])};
  const SKIN=["pale pink","soft pink","rosy pink","peachy pink","dusty rose","mauve","light brown","caramel brown","chocolate brown","deep brown"];
  SKIN.forEach(v=>addC("nippleColor",v));
  ["flat","soft and rounded","small and perky","prominent","puffy","inverted","firm and erect"].forEach(v=>addC("nippleType",v));
  ["very short","short","medium-length","long","very long"].forEach(v=>addC("nippleLength",v));
  SKIN.forEach(v=>addC("areolaColor",v));
  ["flat","smooth","slightly raised","puffy","textured with tiny bumps","softly blended into the skin"].forEach(v=>addC("areolaType",v));
  ["tiny","small","medium-sized","large","wide","very wide"].forEach(v=>addC("areolaSize",v));
  ["pale pink","soft pink","rosy pink","deep pink","dusty rose","mauve","light brown","deep brown"].forEach(v=>addC("vaginaColor",v));
  ["smooth and closed","neat with minimal labia","full and plump","soft with visible inner labia","soft with prominent inner labia","symmetrical","asymmetrical"].forEach(v=>addC("vaginaType",v));
  ["no pubic hair","a neatly trimmed patch of pubic hair","a narrow landing strip of pubic hair","a small heart-shaped patch of pubic hair","a soft natural triangle of pubic hair","full natural pubic hair"].forEach(v=>addC("pubicHair",v));
  Object.assign(LABELS,{nippleColor:"Nipple color",nippleType:"Nipple type",nippleLength:"Nipple length",areolaColor:"Areola color",areolaType:"Areola type",areolaSize:"Areola size",vaginaColor:"Vagina color",vaginaType:"Vagina type",pubicHair:"Pubic hair"});
  const B=STEP_FIELDS.body;
  INTIMATE_FIELDS.forEach(f=>{if(!B.includes(f))B.push(f)});
  _fieldStep=null;
  if(!OUTFIT_PRESETS.some(p=>p.id==="nude")){
    OUTFIT_PRESETS.push({id:"nude",name:"Nude",label:"Nude (no clothing)",blurb:"No clothing. Unlocks the intimate detail fields on the Body step. Adult only.",look:"",season:"",items:{},details:{},adultOnly:true});
    PRESET_GROUPS.outfit.push({label:"No clothing (adult only)",keys:["nude"]});
  }
})();
/* ---- v82: thematic intimate details for the adult starting points, plus a "Nude" outfit on each ---- */
(function(){
  const addC=(f,v,g)=>{CHAR[f]=CHAR[f]||[];const e=CHAR[f].find(x=>x[0]===v);if(e)e[1]=g;else CHAR[f].push([v,g])};
  const FANTASY=["pale blue","ice blue","soft lavender","violet","deep violet","deep teal","sea green","ash gray","pearl white","golden","coral","crimson","deep burgundy","hot pink"];
  ["nippleColor","areolaColor","vaginaColor"].forEach(f=>{CHAR[f].forEach(e=>{e[1]="Natural"});FANTASY.forEach(v=>addC(f,v,"Fantasy"))});
  const TONE={
    1:{n:"pale pink",a:"soft pink",v:"soft pink"},
    2:{n:"rosy pink",a:"dusty rose",v:"rosy pink"},
    3:{n:"dusty rose",a:"mauve",v:"dusty rose"},
    4:{n:"light brown",a:"caramel brown",v:"dusty rose"},
    5:{n:"chocolate brown",a:"deep brown",v:"deep brown"}};
  const STY={
    delicate:{nt:"small and perky",nl:"short",at:"flat",as:"small",vt:"smooth and closed",h:["no pubic hair","a narrow landing strip of pubic hair"]},
    average:{nt:"soft and rounded",nl:"short",at:"smooth",as:"medium-sized",vt:"neat with minimal labia",h:["a neatly trimmed patch of pubic hair","no pubic hair","a narrow landing strip of pubic hair"]},
    athletic:{nt:"prominent",nl:"medium-length",at:"smooth",as:"medium-sized",vt:"symmetrical",h:["a narrow landing strip of pubic hair","no pubic hair"]},
    full:{nt:"puffy",nl:"medium-length",at:"puffy",as:"large",vt:"full and plump",h:["a soft natural triangle of pubic hair","a neatly trimmed patch of pubic hair","no pubic hair"]}};
  /* id: [skin tone 1-5, body style]; skipped on purpose: maxcute (youth-coded), and creamsicle, obsidian and ideal (their outfit is already unclothed, so their default prompts would change) */
  const H={bluelong:[4,"average"],redgold:[4,"average"],bluecream:[4,"average"],academic:[2,"average"],herbalist:[2,"full"],gothic:[1,"delicate"],courier:[3,"athletic"],evening:[3,"full"],seaside:[3,"athletic"],
    kitsune:[1,"delicate"],punk:[1,"athletic"],maxlewd:[3,"full"],goldenbrunette:[3,"delicate"],silverbraid:[1,"average"],seasidebluehair:[1,"delicate"],lilacsunhat:[1,"delicate"],goldenveil:[1,"average"],
    serpentrobes:[1,"average"],marisol:[3,"average"],ines:[3,"full"],imani:[5,"average"],shieldmaiden:[1,"athletic"],metalhead:[1,"delicate"],meadowbombshell:[2,"full"],
    carioca:[3,"full"],surfer:[4,"athletic"],holidayidol:[1,"full"],andaman:[3,"average"],riviera:[3,"average"],calypso:[5,"full"],seasiren:[1,"average"],goasunset:[4,"full"],neoncove:[3,"full"],
    sunpriestess:[3,"average"],rosestreak:[1,"full"],goldenpup:[3,"athletic"],blackcat:[1,"delicate"],
    eevee:[0,"average"],vaporblue:[0,"average"],jolteon:[0,"average"],flareon:[0,"average"],espeon:[0,"delicate"],umbreon:[0,"average"],leafeon:[0,"average"],glaceon:[0,"delicate"],sylveon:[0,"average"],
    tidecaller:[0,"average"],emberdragon:[0,"athletic"],velvetsuccubus:[0,"full"],moonhuntress:[0,"delicate"],pocketimp:[0,"delicate"],onibrawler:[0,"athletic"],palemoth:[0,"delicate"]};
  /* fantasy colors: [nipple, areola, vagina], and an optional areola type or hair line */
  const F={eevee:["caramel brown","caramel brown","soft pink"],vaporblue:["pale blue","pale blue","pale blue"],jolteon:["golden","golden","golden"],flareon:["coral","coral","coral"],
    espeon:["soft lavender","soft lavender","soft lavender"],umbreon:["violet","deep violet","violet"],leafeon:["sea green","sea green","sea green"],glaceon:["ice blue","ice blue","ice blue"],
    sylveon:["rosy pink","rosy pink","soft pink"],tidecaller:["sea green","pale blue","pearl white"],emberdragon:["coral","coral","crimson"],velvetsuccubus:["dusty rose","deep burgundy","crimson"],
    moonhuntress:["ash gray","mauve","violet"],pocketimp:["hot pink","rosy pink","hot pink"],onibrawler:["crimson","deep burgundy","crimson"],palemoth:["soft lavender","pearl white","soft lavender"]};
  const NOHAIR=new Set(["eevee","vaporblue","jolteon","flareon","espeon","umbreon","leafeon","glaceon","sylveon","tidecaller","emberdragon","pocketimp","onibrawler","palemoth","moonhuntress"]);
  const hash=s=>[...s].reduce((a,c)=>a+c.charCodeAt(0),0);
  const BAD=[];
  TEMPLATES.forEach(t=>{
    const spec=H[t.id];if(!spec)return;
    const[tn,sn]=spec,st=STY[sn],tc=TONE[tn]||TONE[1],fc=F[t.id];
    const v={nippleColor:fc?fc[0]:tc.n,nippleType:st.nt,nippleLength:st.nl,areolaColor:fc?fc[1]:tc.a,areolaType:st.at,areolaSize:st.as,vaginaColor:fc?fc[2]:tc.v,vaginaType:st.vt,
      pubicHair:NOHAIR.has(t.id)?"no pubic hair":st.h[hash(t.id)%st.h.length]};
    if(t.id==="seasiren"||t.id==="tidecaller"||t.id==="palemoth")v.areolaType="softly blended into the skin";
    Object.entries(v).forEach(([f,x])=>{if(!(CHAR[f]||[]).some(o=>o[0]===x))BAD.push(t.id+" "+f+": "+x)});
    t.c=Object.assign({},t.c,v);
    t.more=t.more||[];
    if(!t.more.some(o=>o.oname==="Nude"))t.more.push({oname:"Nude",look:"",items:{},details:{},dcol:{}});
  });
  if(BAD.length)throw new Error("intimate: "+BAD.join("; "));
})();

/* ---- v85: ten presets for the intimate details section (adult only, like the adult body presets) ---- */
const INTIMATE_PRESETS={
  petitePale:{label:"Petite and pale",adultOnly:true,blurb:"Pale pink, small and perky, flat areolae, smooth, hairless.",v:{nippleColor:"pale pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"soft pink",areolaType:"flat",areolaSize:"small",vaginaColor:"soft pink",vaginaType:"smooth and closed",pubicHair:"no pubic hair"}},
  softNatural:{label:"Soft and natural",adultOnly:true,blurb:"Rosy pink, soft and rounded, a neatly trimmed patch.",v:{nippleColor:"rosy pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"dusty rose",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch of pubic hair"}},
  shyInverted:{label:"Shy and subtle",adultOnly:true,blurb:"Inverted nipples, small flat areolae, smooth and closed.",v:{nippleColor:"pale pink",nippleType:"inverted",nippleLength:"short",areolaColor:"soft pink",areolaType:"flat",areolaSize:"small",vaginaColor:"pale pink",vaginaType:"smooth and closed",pubicHair:"a neatly trimmed patch of pubic hair"}},
  fullPuffy:{label:"Full and puffy",adultOnly:true,blurb:"Puffy nipples and large puffy areolae, full and plump, natural hair.",v:{nippleColor:"dusty rose",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"mauve",areolaType:"puffy",areolaSize:"large",vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"a soft natural triangle of pubic hair"}},
  longProminent:{label:"Long and prominent",adultOnly:true,blurb:"Long, prominent nipples, softly raised areolae, prominent inner labia.",v:{nippleColor:"dusty rose",nippleType:"prominent",nippleLength:"long",areolaColor:"mauve",areolaType:"slightly raised",areolaSize:"medium-sized",vaginaColor:"dusty rose",vaginaType:"soft with prominent inner labia",pubicHair:"a narrow landing strip of pubic hair"}},
  warmBrown:{label:"Warm brown",adultOnly:true,blurb:"Light brown nipples, large caramel areolae, a landing strip.",v:{nippleColor:"light brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"caramel brown",areolaType:"smooth",areolaSize:"large",vaginaColor:"dusty rose",vaginaType:"symmetrical",pubicHair:"a narrow landing strip of pubic hair"}},
  deepRich:{label:"Deep and rich",adultOnly:true,blurb:"Chocolate nipples, wide deep brown areolae, visible inner labia.",v:{nippleColor:"chocolate brown",nippleType:"prominent",nippleLength:"medium-length",areolaColor:"deep brown",areolaType:"smooth",areolaSize:"wide",vaginaColor:"deep brown",vaginaType:"soft with visible inner labia",pubicHair:"a soft natural triangle of pubic hair"}},
  bareSmooth:{label:"Bare and smooth",adultOnly:true,blurb:"Areolae blended into the skin, smooth and closed, hairless.",v:{nippleColor:"rosy pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"rosy pink",areolaType:"softly blended into the skin",areolaSize:"large",vaginaColor:"soft pink",vaginaType:"smooth and closed",pubicHair:"no pubic hair"}},
  naturalUnshaven:{label:"Natural and unshaven",adultOnly:true,blurb:"Textured mauve areolae, asymmetrical, full natural hair.",v:{nippleColor:"mauve",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"mauve",areolaType:"textured with tiny bumps",areolaSize:"medium-sized",vaginaColor:"mauve",vaginaType:"asymmetrical",pubicHair:"full natural pubic hair"}},
  pastelFantasy:{label:"Pastel fantasy",adultOnly:true,blurb:"Soft lavender and pearl white, blended and smooth, hairless.",v:{nippleColor:"soft lavender",nippleType:"small and perky",nippleLength:"short",areolaColor:"pearl white",areolaType:"softly blended into the skin",areolaSize:"medium-sized",vaginaColor:"soft lavender",vaginaType:"smooth and closed",pubicHair:"no pubic hair"}}
};
PRESET_GROUPS.intimate=[
  {label:"Light and pink",keys:["petitePale","softNatural","shyInverted","bareSmooth"]},
  {label:"Fuller and more prominent",keys:["fullPuffy","longProminent"]},
  {label:"Deeper tones",keys:["warmBrown","deepRich"]},
  {label:"Natural and fantasy",keys:["naturalUnshaven","pastelFantasy"]}];
PRESET_HINTS.ipreset="Sets every intimate detail at once. Adult only, and used only when the outfit is nude.";
(function(){
  const BAD=[];
  Object.entries(INTIMATE_PRESETS).forEach(([k,p])=>Object.entries(p.v).forEach(([f,v])=>{if(!(CHAR[f]||[]).some(o=>o[0]===v))BAD.push(k+" "+f+": "+v)}));
  if(BAD.length)throw new Error("intimate presets: "+BAD.join("; "));
})();

/* ---- v87: skin presets (Body step > Skin). Each sets tone, undertone, finish and markings together. ---- */
const SKIN_FIELDS=["skinTone","undertone","skinFinish","finishColor","markings","markingColor","bodyMarkings"];
const SKIN_PRESETS={
  porcelain:{label:"Porcelain",blurb:"Very pale, cool-toned, soft matte finish.",v:{skinTone:"porcelain",undertone:"cool",skinFinish:"natural skin texture with a soft porcelain matte finish",markings:"no markings"}},
  fairRosy:{label:"Fair and rosy",blurb:"Rosy fair with a soft flush and light nose freckles.",v:{skinTone:"rosy fair",undertone:"rosy",skinFinish:"natural skin texture with a soft rosy flush",markings:"light freckles across the nose"}},
  peachesCream:{label:"Peaches and cream",blurb:"Peachy fair, luminous and even.",v:{skinTone:"peachy fair",undertone:"peach",skinFinish:"natural skin texture with a luminous, even finish",markings:"no markings"}},
  freckledFair:{label:"Freckled fair",blurb:"Fair and warm with dense freckles over the face, shoulders and body.",v:{skinTone:"fair",undertone:"warm",skinFinish:"natural skin texture with a soft rosy flush",markings:"dense freckles across the nose and cheeks, continuing over the shoulders and body",bodyMarkings:"dense freckles cover the shoulders, chest, and back"}},
  warmBeige:{label:"Warm beige",blurb:"Warm beige with a healthy glow.",v:{skinTone:"warm beige",undertone:"warm",skinFinish:"natural skin texture with a warm, healthy glow",markings:"no markings"}},
  goldenOlive:{label:"Golden olive",blurb:"Golden olive, smooth satin finish, a small beauty mark.",v:{skinTone:"golden olive",undertone:"olive",skinFinish:"natural skin texture with a smooth, satin finish",markings:"small beauty mark beneath one eye"}},
  sunKissed:{label:"Sun-kissed tan",blurb:"Golden tan with a sun-kissed glow and body freckles.",v:{skinTone:"tan",undertone:"golden",skinFinish:"natural skin texture with a sun-kissed glow",markings:"sun-kissed freckles across the body"}},
  bronzeGlow:{label:"Bronze glow",blurb:"Bronze with a deep, rich glow.",v:{skinTone:"bronze",undertone:"warm golden",skinFinish:"natural skin texture with a deep, rich glow",markings:"no markings"}},
  caramel:{label:"Caramel",blurb:"Caramel with honey undertones, velvety, soft dimples.",v:{skinTone:"caramel",undertone:"honey",skinFinish:"velvety skin finish",markings:"soft dimples"}},
  richBrown:{label:"Rich brown",blurb:"Rich brown with red-brown undertones and a deep glow.",v:{skinTone:"rich brown",undertone:"red-brown",skinFinish:"natural skin texture with a deep, rich glow",markings:"no markings"}},
  deepEbony:{label:"Deep ebony",blurb:"Deep ebony with cool, blue-toned undertones, satin-smooth.",v:{skinTone:"deep ebony",undertone:"cool, blue-toned",skinFinish:"satin-smooth skin",markings:"no markings"}},
  moonPearl:{label:"Moonlit pearl",blurb:"Pearl white with a moonlit glow.",v:{skinTone:"pearl white",undertone:"moonstone",skinFinish:"moonlit skin glow",markings:"no markings"}},
  coolStone:{label:"Cool stone",blurb:"Stone gray, cool and silvery, smooth like stone.",v:{skinTone:"stone gray",undertone:"cool silvery",skinFinish:"smooth, cool stone-like skin",markings:"no markings"}},
  starlit:{label:"Starlit",blurb:"Aurora-shifting skin with a starlight shimmer and scattered stars.",v:{skinTone:"aurora-shifting",undertone:"starlight",skinFinish:"starlight skin shimmer",markings:"stars scattered over the body"}}
};
PRESET_GROUPS.skin=[
  {label:"Fair",keys:["porcelain","fairRosy","peachesCream","freckledFair"]},
  {label:"Warm and golden",keys:["warmBeige","goldenOlive","sunKissed","bronzeGlow"]},
  {label:"Deep",keys:["caramel","richBrown","deepEbony"]},
  {label:"Fantasy",keys:["moonPearl","coolStone","starlit"]}];
PRESET_HINTS.spreset="Sets tone, undertone, finish and markings together. Change any part afterward.";
(function(){
  const BAD=[];
  Object.entries(SKIN_PRESETS).forEach(([k,p])=>Object.entries(p.v).forEach(([f,v])=>{if(!(CHAR[f]||[]).some(o=>o[0]===v))BAD.push(k+" "+f+": "+v)}));
  if(BAD.length)throw new Error("skin presets: "+BAD.join("; "));
})();

/* ---- v88: ten wedding outfit presets, from cute bridesmaid to slutty bride, and the options they need.
   Presets 7 to 10 are flagged adult only, so the existing safeguard refuses them (and their sexy and lewd tier items) for girl-labeled subjects. ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  const W="Wedding";
  addO("top","knee-length chiffon bridesmaid dress","CU","sweet,glam","",W);
  addO("top","tea-length tulle bridesmaid dress","CU","sweet,cottage","s",W);
  addO("top","floor-length satin maid-of-honor gown","CU","glam","",W);
  addO("top","classic strapless lace wedding gown","CU","glam","",W);
  addO("top","off-shoulder boho lace wedding dress","CU","cottage,glam","",W);
  addO("top","knee-length lace reception dress","CU","sweet,glam","",W);
  addO("top","satin slip bridesmaid dress with a thigh-high slit","S","glam,boudoir","",W);
  addO("top","fitted lace mini wedding dress with a plunging neckline","S","glam,boudoir","",W);
  addO("top","micro lace bridal dress with a plunging neckline and sheer panels","L","boudoir,glam","",W);
  addO("top","sheer lace bridal gown with a plunging neckline and a thigh-high slit","L","boudoir,glam","",W);
  addO("headwear","birdcage veil","CU","glam,sweet","",W);
  addO("headwear","cathedral-length veil","CU","glam","",W);
  addO("headwear","floral hair vine","CU","cottage,sweet","",W);
  addO("hipAccessory","small bridal bouquet held at the side","CU","glam,sweet,cottage","",W);
  addO("outerwear","lace bridal bolero","CU","glam,sweet","",W);
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-"};
  const mk=(id,name,blurb,look,season,pal,items,det,adult)=>{const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    const p={id,name,blurb:blurb+(adult?" Adult only.":""),look,season,pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}};if(adult)p.adultOnly=true;return p};
  const NEW=[
   mk("wd_bridesmaid","Cute bridesmaid","A knee-length chiffon bridesmaid dress with sheer tights, a floral hair vine, a pearl necklace and bracelet, pearl earrings and a small bouquet.","sweet","",["dusty rose","blush pink","sage green","gold","white"],
     {top:["knee-length chiffon bridesmaid dress","p"],legwear:["sheer tights","-"],headwear:["floral hair vine","s"],neckAccessory:["pearl necklace","e"],wristAccessory:["pearl bracelet","e"],earAccessory:["pearl stud earrings","e"],hipAccessory:["small bridal bouquet held at the side","s"]},{detailOne:"satin ribbon trim"}),
   mk("wd_garden","Garden-party bridesmaid","A tea-length tulle bridesmaid dress with a lace bridal bolero, a floral hair vine, a delicate bracelet and a small bouquet.","cottage","s",["sage green","cream","blush pink","gold","white"],
     {top:["tea-length tulle bridesmaid dress","p"],outerwear:["lace bridal bolero","s"],headwear:["floral hair vine","t"],neckAccessory:["delicate chain necklace","a"],wristAccessory:["delicate bracelet","a"],hipAccessory:["small bridal bouquet held at the side","t"]},{detailThree:"translucent tulle layering"}),
   mk("wd_honor","Maid of honor","A floor-length satin maid-of-honor gown with a satin sash, opera gloves, a pearl necklace, drop earrings and a bouquet.","glam","",["burgundy","champagne","gold","dusty rose","white"],
     {top:["floor-length satin maid-of-honor gown","p"],waistAccessory:["satin sash","a"],gloves:["opera satin gloves","s"],neckAccessory:["pearl necklace","e"],earAccessory:["pearl drop earrings","e"],hipAccessory:["small bridal bouquet held at the side","t"]},{detailThree:"duchess satin"}),
   mk("wd_reception","Sweet reception bride","A knee-length lace reception dress with a birdcage veil, short satin gloves with a bow, pearl earrings, a pearl bracelet and a small bouquet.","sweet","",["white","blush pink","gold","cream","silver"],
     {top:["knee-length lace reception dress","p"],headwear:["birdcage veil","p"],gloves:["short satin gloves with a bow","p"],legwear:["sheer tights","-"],earAccessory:["pearl stud earrings","e"],wristAccessory:["pearl bracelet","e"],hipAccessory:["small bridal bouquet held at the side","s"]},{detailOne:"scalloped lace edge"}),
   mk("wd_classic","Classic bride","A classic strapless lace wedding gown with a cathedral-length veil, long lace gloves, a pearl necklace, drop earrings and a bouquet.","glam","",["white","silver","blush pink","gold","ivory"],
     {top:["classic strapless lace wedding gown","p"],headwear:["cathedral-length veil","p"],gloves:["long lace gloves","p"],neckAccessory:["pearl necklace","e"],earAccessory:["pearl drop earrings","e"],hipAccessory:["small bridal bouquet held at the side","t"]},{detailThree:"floral lace pattern"}),
   mk("wd_boho","Boho bride","An off-shoulder boho lace wedding dress with a floral hair vine, a delicate necklace, a stack of slim bracelets and a loose bouquet.","cottage","s",["ivory","sage green","tan","gold","blush pink"],
     {top:["off-shoulder boho lace wedding dress","p"],headwear:["floral hair vine","s"],neckAccessory:["delicate chain necklace","a"],wristAccessory:["stacked slim bracelets","a"],hipAccessory:["small bridal bouquet held at the side","e"]},{detailOne:"lace trim"}),
   mk("wd_sexy_maid","Sexy bridesmaid","A satin slip bridesmaid dress with a thigh-high slit, lace-top stockings, a satin choker, pearl earrings and a bouquet.","glam","",["burgundy","champagne","gold","blush pink","white"],
     {top:["satin slip bridesmaid dress with a thigh-high slit","p"],legwear:["lace-top stockings","-"],neckAccessory:["satin choker","a"],earAccessory:["pearl drop earrings","e"],hipAccessory:["small bridal bouquet held at the side","t"]},{detailThree:"glossy satin finish"},true),
   mk("wd_sexy_bride","Sexy bride","A fitted lace mini wedding dress with a plunging neckline, a birdcage veil, long satin opera gloves, lace-top thigh-high stockings and a pearl necklace.","glam","",["white","silver","blush pink","gold","ivory"],
     {top:["fitted lace mini wedding dress with a plunging neckline","p"],headwear:["birdcage veil","p"],gloves:["long satin opera gloves","p"],legwear:["lace-top thigh-high stockings","-"],neckAccessory:["pearl necklace","e"],earAccessory:["pearl drop earrings","e"]},{detailThree:"floral lace pattern"},true),
   mk("wd_lewd_bride","Lewd bride","A micro lace bridal dress with a plunging neckline and sheer panels, a cathedral-length veil, long sheer gloves, garter-strap stockings and a lace thigh garter.","boudoir","",["white","silver","blush pink","gold","ivory"],
     {top:["micro lace bridal dress with a plunging neckline and sheer panels","p"],headwear:["cathedral-length veil","p"],gloves:["long sheer gloves","p"],legwear:["garter-strap stockings with lace tops","-"],thighAccessory:["lace thigh garter","e"],neckAccessory:["lace choker","e"]},{detailThree:"sheer finish"},true),
   mk("wd_slutty_bride","Slutty bride","A sheer lace bridal gown with a plunging neckline and a thigh-high slit over a sheer lace bra and thong, a cathedral-length veil, long sheer gloves, garter-strap stockings, a lace thigh garter and a lace choker.","boudoir","",["white","silver","blush pink","gold","ivory"],
     {top:["sheer lace bridal gown with a plunging neckline and a thigh-high slit","p"],bra:["sheer lace bra","p"],panties:["sheer lace thong","p"],headwear:["cathedral-length veil","p"],gloves:["long sheer gloves","p"],legwear:["garter-strap stockings with lace tops","-"],thighAccessory:["lace thigh garter","e"],neckAccessory:["lace choker","e"]},{detailThree:"sheer finish"},true)
  ];
  NEW[9].showUnder=true;
  const BAD=[];
  NEW.forEach(p=>Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(p.id+" "+f+": "+v)}));
  if(BAD.length)throw new Error("wedding presets: missing items "+BAD.join("; "));
  NEW.forEach(p=>{if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p)});
  if(!PRESET_GROUPS.outfit.some(g=>g.label==="Weddings, cute to slutty"))PRESET_GROUPS.outfit.push({label:"Weddings, cute to slutty",keys:NEW.map(p=>p.id)});
})();

/* ---- v89: ten military outfit presets, from tactical SWAT to rebel insurgent, and the options they need.
   Clothing and gear only (no weapons). All presets are general, so they are available for every age category. ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  const M="Military and tactical";
  addO("top","fitted tactical long-sleeve shirt","CU","costume,sporty,edgy","",M);
  addO("top","plate carrier vest over a fitted tactical shirt","CU","costume,edgy","",M);
  addO("top","fitted combat shirt","CU","costume,edgy","",M);
  addO("top","fitted flight suit with patches","CU","costume","",M);
  addO("top","fitted naval officer jacket with epaulettes","CU","costume,glam","",M);
  addO("outerwear","camouflage combat jacket","CU","costume,edgy","",M);
  addO("outerwear","hooded winter parka","C","costume,casual","w",M);
  addO("outerwear","patched, mismatched fatigue jacket","CU","edgy,costume","",M);
  addO("outerwear","faded camouflage field jacket worn open","CU","edgy,costume","",M);
  addO("bottom","camouflage cargo pants","CU","costume,edgy","",M);
  addO("bottom","tactical cargo pants with knee padding","CU","costume,edgy","",M);
  addO("headwear","tactical helmet with a radio headset","CU","costume","",M);
  addO("headwear","camouflage patrol cap","CU","costume","",M);
  addO("headwear","wide-brim boonie hat","CU","costume,casual","",M);
  addO("headwear","flight helmet with a visor","CU","costume","",M);
  addO("eyewear","tactical goggles pushed up on the helmet","CU","costume","",M);
  addO("gloves","tactical gloves","CU","costume","",M);
  addO("gloves","fingerless tactical gloves","CU","costume,edgy","",M);
  addO("neckAccessory","balaclava pulled down around the neck","CU","costume,edgy","",M);
  addO("neckAccessory","wide cloth neck scarf","CU","costume,casual","",M);
  addO("wristAccessory","cloth armband","CU","edgy,costume","",M);
  const SL={p:"@primary",s:"@secondary",t:"@third",a:"@accent",e:"@extra","-":"-"};
  const mk=(id,name,blurb,look,season,pal,items,det)=>{const it={};Object.entries(items).forEach(([f,[v,c]])=>{it[f]=[v,SL[c]||c]});
    return{id,name,blurb,look,season,pal:{primary:pal[0],secondary:pal[1],third:pal[2],accent:pal[3],extra:pal[4]},items:it,details:det||{}}};
  const NEW=[
   mk("mil_swat","Tactical SWAT team","A plate carrier vest over a fitted tactical shirt, tactical cargo pants with knee padding, tactical gloves, a helmet with a radio headset and goggles, and a duty belt.","costume","",["charcoal gray","black","navy blue","silver","white"],
     {top:["plate carrier vest over a fitted tactical shirt","p"],bottom:["tactical cargo pants with knee padding","s"],gloves:["tactical gloves","s"],headwear:["tactical helmet with a radio headset","s"],eyewear:["tactical goggles pushed up on the helmet","-"],belt:["utility belt","s"],tagCharm:["small badge pin","t"],kneeAccessory:["knee pads","s"],hipAccessory:["mini utility pouch","s"]},{detailOne:"shoulder patches"}),
   mk("mil_special","Special forces operator","A camouflage combat jacket over a fitted combat shirt, camouflage cargo pants, a balaclava pulled down around the neck, tactical gloves, a helmet with goggles and knee pads.","costume","",["olive green","tan","charcoal gray","black","brown"],
     {top:["fitted combat shirt","s"],outerwear:["camouflage combat jacket","p"],bottom:["camouflage cargo pants","p"],neckAccessory:["balaclava pulled down around the neck","s"],gloves:["tactical gloves","s"],headwear:["tactical helmet with a radio headset","p"],eyewear:["tactical goggles pushed up on the helmet","-"],kneeAccessory:["knee pads","s"],belt:["utility belt","s"]},{detailThree:"camouflage print"}),
   mk("mil_army","Army fatigues","A short-sleeved military-style shirt with epaulettes, camouflage cargo pants, a camouflage patrol cap, dog tags and a classic leather belt.","costume","",["olive green","tan","brown","khaki","black"],
     {top:["short-sleeved military-style shirt with epaulettes","p"],bottom:["camouflage cargo pants","p"],headwear:["camouflage patrol cap","p"],neckAccessory:["dog-tag necklace","-"],belt:["classic leather belt","s"],tagCharm:["small embroidered name badge","s"],hipAccessory:["mini utility pouch","t"]},{detailTwo:"sleeves rolled to the elbow"}),
   mk("mil_desert","Desert patrol","A fitted combat shirt with rolled sleeves, cargo pants, a wide-brim boonie hat, aviator sunglasses, a wide cloth neck scarf and fingerless tactical gloves.","costume","s",["khaki","brown","white","tan","black"],
     {top:["fitted combat shirt","p"],bottom:["cargo pants","s"],headwear:["wide-brim boonie hat","p"],eyewear:["aviator sunglasses","-"],neckAccessory:["wide cloth neck scarf","t"],gloves:["fingerless tactical gloves","s"],belt:["classic leather belt","a"],hipAccessory:["belt bag","a"]},{detailTwo:"sleeves rolled to the elbow"}),
   mk("mil_navy","Naval officer","A fitted naval officer jacket with epaulettes, a knee-length pencil skirt, sheer tights, a peaked officer cap, short leather gloves and a service ribbon bar.","costume","",["navy blue","white","gold","silver","black"],
     {top:["fitted naval officer jacket with epaulettes","p"],bottom:["knee-length pencil skirt","p"],legwear:["sheer tights","-"],headwear:["peaked officer cap","p"],gloves:["short leather gloves","e"],tagCharm:["service ribbon bar","a"],belt:["thin leather belt","e"]},{detailOne:"embroidered patch"}),
   mk("mil_pilot","Fighter pilot","A fitted flight suit with patches, a flight helmet with a visor, aviator sunglasses, short leather gloves and a mission patch.","costume","",["olive green","tan","navy blue","gold","black"],
     {top:["fitted flight suit with patches","p"],headwear:["flight helmet with a visor","s"],eyewear:["aviator sunglasses","-"],gloves:["short leather gloves","s"],tagCharm:["mission patch","a"],belt:["classic leather belt","s"],neckAccessory:["silk neck scarf","t"]},{detailOne:"mission patches"}),
   mk("mil_medic","Combat medic","A fitted combat shirt under a plate carrier vest, cargo pants, a helmet with a radio headset, knee pads, a first-aid pouch on the thigh and a small cross badge.","costume","",["olive green","tan","white","charcoal gray","red"],
     {top:["plate carrier vest over a fitted tactical shirt","p"],bottom:["cargo pants","s"],headwear:["tactical helmet with a radio headset","p"],gloves:["tactical gloves","t"],kneeAccessory:["knee pads","t"],thighAccessory:["first-aid pouch strapped to the thigh","e"],hipAccessory:["small first-aid pouch","e"],tagCharm:["small cross badge","e"]}),
   mk("mil_arctic","Arctic recon","A hooded winter parka, a fitted tactical shirt, fleece-lined track pants, thick leather gloves, a puffy scarf, ski goggles on the forehead and knee-high wool socks.","costume","w",["white","silver","charcoal gray","ice blue","black"],
     {top:["fitted tactical long-sleeve shirt","s"],outerwear:["hooded winter parka","p"],bottom:["fleece-lined track pants","t"],legwear:["knee-high wool socks","s"],neckAccessory:["puffy scarf","s"],gloves:["thick leather gloves","t"],eyewear:["ski goggles on the forehead","-"],belt:["utility belt","t"]}),
   mk("mil_guerrilla","Jungle guerrilla","A ribbed tank top under a faded camouflage field jacket worn open, camouflage cargo pants, a bandana headband, dog tags and fingerless tactical gloves.","edgy","",["olive green","brown","tan","black","red"],
     {top:["ribbed tank top","s"],outerwear:["faded camouflage field jacket worn open","p"],bottom:["camouflage cargo pants","p"],headwear:["bandana headband","a"],neckAccessory:["dog-tag necklace","-"],gloves:["fingerless tactical gloves","s"],belt:["braided leather belt","s"],wristAccessory:["cloth armband","a"]},{detailThree:"camouflage print"}),
   mk("mil_rebel","Rebel insurgent","A ripped graphic tank under a patched, mismatched fatigue jacket, baggy cargo pants, a bandana neck scarf, torn fingerless gloves, a cloth armband, gauze wraps and a cloth face mask pulled down under the chin.","edgy","",["olive green","charcoal gray","brown","red","black"],
     {top:["ripped graphic tank","s"],outerwear:["patched, mismatched fatigue jacket","p"],bottom:["baggy cargo pants","t"],neckAccessory:["bandana neck scarf","a"],gloves:["torn fingerless gloves","s"],wristAccessory:["gauze bandage wraps","-"],maskAccessory:["cloth face mask pulled down under the chin","t"],belt:["braided leather belt","s"],hipAccessory:["mini utility pouch","t"]},{detailTwo:"stitched patches"})
  ];
  const BAD=[];
  NEW.forEach(p=>Object.entries(p.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(p.id+" "+f+": "+v)}));
  if(BAD.length)throw new Error("military presets: missing items "+BAD.join("; "));
  NEW.forEach(p=>{if(!OUTFIT_PRESETS.some(x=>x.id===p.id))OUTFIT_PRESETS.push(p)});
  if(!PRESET_GROUPS.outfit.some(g=>g.label==="Military, SWAT to insurgent"))PRESET_GROUPS.outfit.push({label:"Military, SWAT to insurgent",keys:NEW.map(p=>p.id)});
})();

/* ---- v90: match the body details to outfit coverage. When the outfit covers part of the body, the details that would pull
   the clothes aside (thighs and legs under a floor-length skirt, arm shape under long sleeves, stomach shape under a covering top)
   are left out of the prompt, and a short clause tells the generator to keep the body covered. Overall shape and size stay. ---- */
let COVNOW=null;
const COV_FLOOR=/floor|gown|maxi|full-length|cathedral|long (skirt|dress)|ankle-length|wedding dress/i;
const COV_OPEN=/micro|mini|short|slit|cut-?out|sheer|see-through|tied low|plunging/i;
const COV_MID=/midi|tea-length|knee-length|pencil skirt|calf/i;
const COV_SLEEVE=/long[- ]sleeve|sweater|cardigan|jacket|coat|parka|blazer|hoodie|turtleneck|henley|flannel|cloak|peacoat/i;
const COV_BARE=/sleeveless|strapless|tank|camisole|halter|off-shoulder|slipping|bare shoulders|unbuttoned|worn open|open over|short-sleeve|puff-sleeve|cap-sleeve/i;
const COV_CROP=/crop|bandeau|bikini|bralette|cut-?out|tied|tube|bustier|micro|halter|plunging|sheer|mesh|bodysuit|corset|unbuttoned|open-front/i;
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
/* ---- v91: "Griffin robes" starting point (imported from a saved design) ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  addO("tagCharm","small griffin crest badge","CU","preppy,costume");
  const T={id:"griffinrobes",name:"Griffin robes",
    blurb:"A poised dancer with waist-length chocolate-brown half-up waves, red inner strands and gold highlights fading to black, sharp hooded gold eyes and a small mole beneath one eye. A hooded robe over a sweater vest, pleated skirt and thigh-highs with a griffin crest.",
    pal:{"primary": "chocolate brown", "secondary": "black", "third": "red", "accent": "gold", "extra": "silver"},
    c:{"age": "woman", "faceShape": "long oval face with a high forehead and defined cheekbones", "noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "eyeShape": "sharp, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "high half-up ponytail with a smooth crown, very long layers, soft waves and curled ends", "hairLength": "waist-length", "hairTexture": "loose waves", "bangs": "open forehead with long face-framing side pieces", "hairMovement": "falls straight down the back and over the shoulders", "hairBase": "@primary", "skinTone": "fair", "undertone": "neutral", "skinFinish": "satin-smooth skin", "markings": "no markings", "makeupStyle": "soft glam makeup", "eyelinerStyle": "sharp winged eyeliner", "lashStyle": "long defined lashes", "lipFinish": "soft satin lips", "nailStyle": "carefully manicured fingernails", "blushStyle": "soft cheek blush", "expression": "slightly shy expression", "browShape": "light, softly arched brows", "impression": "a soft, feminine appearance with delicate features", "faceMark": "a small mole beneath one eye", "hairUnderlayer": "@secondary", "hairInner": "@third", "hairHighlights": "@accent", "hairBlend": "a smooth gradient from the base through the inner sections and highlights down to the underlayer, with mixed-color strands", "bustSize": "small-to-medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "slightly above-average height", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "lithe, dancer's build", "posture": "poised dancer's posture", "nippleColor": "pale pink", "nippleType": "prominent", "nippleLength": "medium-length", "areolaColor": "soft pink", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "soft pink", "vaginaType": "symmetrical", "pubicHair": "a narrow landing strip of pubic hair"},
    outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","charcoal gray"],"bottom":["pleated mini skirt","@secondary"],"outerwear":["long {c} hooded robe with {c2} lining","@secondary"],"neckAccessory":["{c}-and-{c2} striped necktie","@third",undefined,"@accent"],"legwear":["thigh-high stockings","@secondary"],"earAccessory":["large hoop earrings","@secondary"],"tagCharm":["small griffin crest badge","@accent"]},details:{},dcol:{}},
    more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],
    out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}};
  const BAD=[];
  [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(f+": "+v)}));
  Object.entries(T.c).forEach(([f,v])=>{if(CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push("c "+f+": "+v)});
  if(BAD.length)throw new Error("griffinrobes: "+BAD.join("; "));
  if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);
  const g=PRESET_GROUPS.start.find(g=>g.label==="Stylish");if(g&&!g.keys.includes(T.id))g.keys.push(T.id);
})();

/* ---- v92: "Badger robes" and "Raven robes" starting points (imported from saved designs, refined) ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  addO("tagCharm","small badger crest badge","CU","preppy,costume");
  addO("tagCharm","small raven crest badge","CU","preppy,costume");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const TS=[
  {id:"badgerrobes",name:"Badger robes",blurb:"A petite, enormously top-heavy woman with hip-length, extremely thick yellow hair in a high half-up ponytail with mustard, chocolate and black streaks, glossy odd-colored eyes, peachy fair skin and a sweet, approachable look. A mustard hooded robe with chocolate lining over a cropped yellow sweater and a fur-trimmed black pleated skirt, with a striped necktie, ribbon belt, hoop earrings and a badger crest, slipping off one shoulder.",pal:{"primary": "yellow", "secondary": "black", "third": "mustard yellow", "accent": "chocolate brown", "extra": "charcoal gray"},c:{"age": "woman", "faceShape": "a cute, soft round-cheeked face with delicate features", "browShape": "soft eyebrows", "noseShape": "small nose", "mouthShape": "soft, naturally {c} lips", "mouthShapeColor": "peach pink", "impression": "an extremely cute, adorable girl-next-door look with a soft, sweet, approachable appearance and delicate features", "eyeConfig": "heterochromatic", "eyeOne": "@primary", "eyeTwo": "@secondary", "eyeShape": "large, wide, glossy, sparkling eyes with a cute shape", "irisDetail": "bright, intricately detailed irises", "lashNatural": "long eyelashes", "hairStyle": "high half-up ponytail with a smooth crown, very long layers, soft waves and curled ends", "hairLength": "hip-length", "hairTexture": "extremely thick, silky, glossy and very voluminous", "bangs": "cute wispy bangs with face-framing strands", "hairMovement": "falls in long flowing waves with curled ends", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@third", "hairHighlights": "@accent", "hairBlend": "a pale underlayer, bright inner hair, highlight strands and multicolored gradient streaks", "bustSize": "enormous, very full, round breasts", "bustShape": "full, naturally rounded shape", "bustWeight": "heavy natural fullness", "heightStature": "petite stature", "shoulderShape": "narrow delicate shoulders", "armShape": "small, feminine hands", "waistShape": "tiny waist", "stomachShape": "soft stomach", "hipShape": "rounded hips", "buttSize": "full, round butt", "thighBuild": "thick, soft thighs", "legShape": "shapely legs", "bodySoftness": "extremely top-heavy hourglass figure", "blushStyle": "rosy cheeks with a blush across the bridge of the nose", "lipFinish": "glossy lips", "nailStyle": "short manicured glossy fingernails with heart and flower nail art", "nailColor": "@primary+@secondary+@third+@accent", "skinTone": "peachy fair", "undertone": "peach", "skinFinish": "natural skin texture with a luminous, even finish", "markings": "no markings","nippleColor": "peachy pink", "nippleType": "puffy", "nippleLength": "medium-length", "areolaColor": "peachy pink", "areolaType": "puffy", "areolaSize": "large", "vaginaColor": "rosy pink", "vaginaType": "full and plump", "pubicHair": "a soft natural triangle of pubic hair"},outfit:{"oname": "Robe, vest and pleated skirt", "look": "costume", "items": {"top": ["cropped sweater over a sheer linen collared shirt", "@primary"], "bottom": ["Fur trimmed pleated mini skirt", "@secondary"], "outerwear": ["long {c} hooded robe with {c2} lining", "@third", null, "@accent"], "neckAccessory": ["{c}-and-{c2} striped necktie", "@accent", null, "@secondary"], "legwear": ["thigh-high stockings", "@secondary"], "earAccessory": ["large hoop earrings", "@accent"], "tagCharm": ["small badger crest badge", "@accent"], "belt": ["satin ribbon belt", "auto"]}, "details": {"detailTwo": "one shoulder slipping off"}, "dcol": {}},more:[{"oname":"Nude","look":"","items":{},"details":{},"dcol":{}}],out:{framing:"full body",must:"a dainty jewelry theme and an extremely cute, adorable, sweet look with particular emphasis on highly detailed freckles, skin, hair and eyes"}},
  {id:"ravenrobes",name:"Raven robes",blurb:"A tall, slender young woman with porcelain skin and a scatter of soft freckles, very long silky midnight-blue hair with navy, storm-blue and bronze strands and hime bangs, bronze eyes and a beauty mark near the lips. A hooded robe over a sweater vest, pleated skirt and thigh-highs with a raven crest.",pal:{"primary": "midnight blue", "secondary": "navy blue", "third": "storm blue", "accent": "bronze", "extra": "black"},c:{"age": "young woman", "faceShape": "long oval face with a high forehead and defined cheekbones", "noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "eyeShape": "sharp, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "center-parted long straight hair", "hairLength": "very long", "hairTexture": "silky straight", "bangs": "hime bangs", "hairMovement": "sways gently around her", "hairBase": "@primary", "nailStyle": "carefully manicured fingernails", "expression": "determined, steady gaze", "browShape": "thin elegant brows", "impression": "a natural, understated beauty", "faceMark": "a small beauty mark near the lips", "hairUnderlayer": "@secondary", "hairInner": "@third", "hairHighlights": "@accent", "hairBlend": "a smooth gradient from the base through the inner sections and highlights down to the underlayer, with mixed-color strands", "stomachShape": "flat stomach", "bustSize": "medium-large, full breasts", "heightStature": "slightly above-average height", "shoulderShape": "narrow delicate shoulders", "waistShape": "narrow waist", "hipShape": "narrow hips", "buttSize": "toned butt", "thighBuild": "slender thighs", "legShape": "tall, slender legs", "bodySoftness": "slender soft build", "posture": "tall, proud posture", "torsoShape": "slim upper torso", "armShape": "slender arms and delicate hands", "bustShape": "perky, full, round shape", "bustWeight": "light delicate fullness", "makeupStyle": "editorial makeup", "eyelinerStyle": "graphic eyeliner", "eyeshadowStyle": "graphic eyeshadow", "lipFinish": "matte lips", "handShape": "slender and graceful", "skinTone": "porcelain", "undertone": "cool", "skinFinish": "natural skin texture with a soft porcelain matte finish", "markings": "soft freckles across the cheeks and nose", "markingColor": "@secondary", "bodyMarkings": "soft freckles dust the nose, cheeks, and shoulders", "nippleColor": "dusty rose", "nippleType": "small and perky", "nippleLength": "short", "areolaColor": "dusty rose", "areolaType": "smooth", "areolaSize": "small", "vaginaColor": "dusty rose", "vaginaType": "neat with minimal labia", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","auto"],"bottom":["pleated mini skirt","auto"],"outerwear":["long {c} hooded robe with {c2} lining","auto",undefined,"auto"],"neckAccessory":["{c}-and-{c2} striped necktie","auto",undefined,"auto"],"legwear":["thigh-high stockings","auto"],"earAccessory":["large hoop earrings","auto"],"tagCharm":["small raven crest badge","auto"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}}
  ];
  const BAD=[];
  TS.forEach(T=>{
    [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)}));
    Object.entries(T.c).forEach(([f,v])=>{if(CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push(T.id+" c "+f+": "+v)});
  });
  if(BAD.length)throw new Error("robes: "+BAD.join("; "));
  const g=PRESET_GROUPS.start.find(g=>g.label==="Stylish");
  TS.forEach(T=>{if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T);if(g&&!g.keys.includes(T.id))g.keys.push(T.id)});
})();

/* ---- v94: Academy category + Wolf, Swan, Dragon and Stag robes ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  ["wolf","swan","dragon","stag"].forEach(n=>addO("tagCharm","small "+n+" crest badge","CU","preppy,costume"));
  addO("legwear","sheer {c}-and-{c2} dragon scale leggings","CU","costume,fantasy");
  addO("detailOne","dragon scale edge","CU","costume,fantasy");
  addO("detailTwo","skin-tight silhouette","CU");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const TS=[
  {id:"wolfrobes",name:"Wolf robes",blurb:"A tall, athletic young woman with a tousled silver-gray wolf cut, a faint scar through one eyebrow, pale ice-blue eyes and a smirk. A black hooded robe with ice-blue lining over a steel-gray sweater vest, navy pleated skirt and knee-highs with a wolf crest and leather cuff.",pal:{"primary": "steel gray", "secondary": "navy blue", "third": "white", "accent": "ice blue", "extra": "black"},c:{"age": "young woman", "faceShape": "oval face with defined cheekbones and a softly pointed chin", "noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "eyeShape": "sharp, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "short wolf cut", "hairLength": "short", "hairTexture": "softly tousled", "bangs": "long side bangs", "hairMovement": "is tossed gently by a breeze", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@third", "hairBlend": "soft blended transitions between the layers", "skinTone": "ivory", "undertone": "neutral", "skinFinish": "natural skin texture with a warm, healthy glow", "markings": "a faint scar through one eyebrow", "makeupStyle": "minimal makeup", "eyelinerStyle": "no eyeliner", "lipFinish": "natural lip finish", "nailStyle": "short rounded fingernails", "expression": "smirk", "browShape": "straight brows", "impression": "striking, memorable features", "bustSize": "small-to-medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "above-average height", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "toned build", "posture": "strong, squared posture", "nippleColor": "rosy pink", "nippleType": "small and perky", "nippleLength": "short", "areolaColor": "rosy pink", "areolaType": "flat", "areolaSize": "small", "vaginaColor": "rosy pink", "vaginaType": "neat with minimal labia", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","@primary"],"bottom":["pleated mini skirt","@secondary"],"outerwear":["long {c} hooded robe with {c2} lining","@extra",undefined,"@accent"],"neckAccessory":["{c}-and-{c2} striped necktie","@accent",undefined,"@secondary"],"legwear":["knee-high socks","@third"],"earAccessory":["large hoop earrings","@third"],"tagCharm":["small wolf crest badge","@accent"],"wristAccessory":["leather cuff","@extra"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"swanrobes",name:"Swan robes",blurb:"A tall, graceful woman and former dancer with a very long pearl-white ballerina bun, sky-blue eyes, pale ivory skin and a composed, elegant look. A pearl-white hooded robe with dusty-rose lining over a white sweater vest, rose pleated skirt and thigh-highs with a swan crest.",pal:{"primary": "pearl white", "secondary": "dusty rose", "third": "silver", "accent": "rose gold", "extra": "soft gray"},c:{"age": "woman", "faceShape": "oval face with defined cheekbones and a softly pointed chin", "noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "eyeShape": "large almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "eyeOne": "sky blue", "hairStyle": "ballerina bun", "hairLength": "very long", "hairTexture": "silky and smooth", "bangs": "long face-framing strands sweeping around the face", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@accent", "hairBlend": "soft blended transitions between the layers", "skinTone": "pale ivory", "undertone": "rosy", "skinFinish": "satin-smooth skin", "markings": "no markings", "makeupStyle": "soft glam makeup", "eyelinerStyle": "thin winged eyeliner", "eyeshadowStyle": "soft neutral eyeshadow", "lipFinish": "soft satin lips", "nailStyle": "carefully manicured fingernails", "expression": "elegant composed expression", "browShape": "softly arched brows", "impression": "an elegant, mature presence", "bustSize": "small-to-medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "tall graceful stature", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "lithe, dancer's build", "posture": "poised dancer's posture", "nippleColor": "pale pink", "nippleType": "small and perky", "nippleLength": "short", "areolaColor": "pale pink", "areolaType": "flat", "areolaSize": "small", "vaginaColor": "soft pink", "vaginaType": "smooth and closed", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","@primary"],"bottom":["pleated mini skirt","@secondary"],"outerwear":["long {c} hooded robe with {c2} lining","@primary",undefined,"@secondary"],"neckAccessory":["{c}-and-{c2} striped necktie","@accent",undefined,"@third"],"legwear":["thigh-high stockings","@primary"],"earAccessory":["large hoop earrings","@accent"],"tagCharm":["small swan crest badge","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"dragonrobes",name:"Dragon robes",blurb:"A tall, fierce young woman with a hip-length black high braided ponytail streaked crimson and gold, molten gold eyes with vertical slit pupils, light-tan skin and a battle-ready glare. A black hooded robe with crimson lining over a crimson sweater vest and black pleated skirt, with sheer dragon-scale leggings, a dragon crest and scale-edged details.",pal:{"primary": "crimson", "secondary": "charcoal gray", "third": "burgundy", "accent": "gold", "extra": "black"},c:{"age": "young woman", "faceShape": "elegant angular face", "noseShape": "slender nose", "mouthShape": "sensual full lips", "eyeConfig": "matching", "eyeShape": "sharp, slightly hooded eyes", "pupilStyle": "vertical slit pupils", "irisDetail": "metallic iris ring", "lashNatural": "thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "high braided ponytail", "hairLength": "hip-length", "hairTexture": "thick, straight and glossy", "bangs": "long sidelocks", "hairBase": "@extra", "hairUnderlayer": "@primary", "hairInner": "@third", "hairHighlights": "@accent", "hairBlend": "soft blended transitions between the layers", "skinTone": "light tan", "undertone": "warm", "skinFinish": "natural skin texture with a sun-kissed glow", "markings": "no markings", "nailStyle": "long almond fingernails", "nailColor": "@primary", "expression": "fierce, battle-ready glare", "browShape": "heavy, strongly defined dark brows", "impression": "a confident, polished presence", "nippleColor": "caramel brown", "nippleType": "firm and erect", "nippleLength": "medium-length", "areolaColor": "caramel brown", "areolaType": "slightly raised", "areolaSize": "medium-sized", "vaginaColor": "deep pink", "vaginaType": "soft with prominent inner labia", "pubicHair": "a narrow landing strip of pubic hair", "makeupStyle": "vampy dark makeup", "eyelinerStyle": "sharp winged eyeliner", "eyeshadowStyle": "smoky eyeshadow", "lashStyle": "spiky lashes", "lipFinish": "matte lips", "bustSize": "large breasts", "bustShape": "gravity-defying round shape", "heightStature": "slightly above-average height", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "lithe, dancer's build", "posture": "strong, squared posture"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","@primary"],"bottom":["pleated mini skirt","@extra"],"outerwear":["long {c} hooded robe with {c2} lining","@extra",undefined,"@primary"],"neckAccessory":["{c}-and-{c2} striped necktie","@accent",undefined,"@primary"],"legwear":["sheer {c}-and-{c2} dragon scale leggings","@extra",undefined,"@primary"],"earAccessory":["large hoop earrings","@accent"],"tagCharm":["small dragon crest badge","@accent"]},details:{"detailOne": "dragon scale edge", "detailTwo": "skin-tight silhouette"},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{"framing": "full body", "must": "an anime style with high detail, and particular emphasis on highly detailed skin, dragon scale details, hair and eyes"}},
  {id:"stagrobes",name:"Stag robes",blurb:"A very tall, graceful woman with caramel skin and soft dimples, a short chestnut messy updo with gold highlights, luminous forest-green eyes and a dreamy look. A forest-green hooded robe with cream lining over a cream sweater vest and chestnut pleated skirt, with a gold stag crest.",pal:{"primary": "forest green", "secondary": "chestnut brown", "third": "cream", "accent": "gold", "extra": "moss green"},c:{"age": "woman", "eyeConfig": "luminous matching", "eyeShape": "large almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "bright, intricately detailed irises", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@primary", "hairStyle": "messy updo", "hairLength": "short", "bangs": "long face-framing pieces", "hairBase": "@secondary", "hairUnderlayer": "@secondary", "hairInner": "@secondary", "hairHighlights": "@accent", "hairBlend": "subtle natural highlights", "nailStyle": "carefully manicured fingernails", "nippleColor": "deep brown", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "deep brown", "areolaType": "smooth", "areolaSize": "large", "vaginaColor": "deep brown", "vaginaType": "full and plump", "pubicHair": "a soft natural triangle of pubic hair", "bustSize": "large breasts", "bustShape": "perky rounded shape", "bustWeight": "soft natural fullness", "heightStature": "very tall elegant stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "long, slim waist", "stomachShape": "flat, smooth stomach", "hipShape": "narrow hips", "buttSize": "small round butt", "thighBuild": "long, lean thighs", "legShape": "long, lean legs", "bodySoftness": "lean, graceful build", "posture": "tall, proud posture", "skinTone": "caramel", "undertone": "honey", "skinFinish": "velvety skin finish", "markings": "soft dimples", "faceShape": "soft oval face", "expression": "dreamy expression", "browShape": "soft, gently curved eyebrows", "noseShape": "petite nose", "mouthShape": "softly parted lips", "impression": "a soft feminine appearance", "makeupStyle": "soft natural makeup", "lashStyle": "soft fluttery lashes", "blushStyle": "soft cheek blush", "lipFinish": "tinted lip balm", "eyelinerStyle": "thin winged eyeliner"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","@third"],"bottom":["pleated mini skirt","@secondary"],"outerwear":["long {c} hooded robe with {c2} lining","@primary",undefined,"@third"],"neckAccessory":["{c}-and-{c2} striped necktie","@accent",undefined,"@primary"],"legwear":["thigh-high stockings","@secondary"],"earAccessory":["large hoop earrings","@accent"],"tagCharm":["small stag crest badge","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{"framing": "full body", "must": "an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}},
  ];
  const BAD=[];
  TS.forEach(T=>{
    [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)}));
    Object.entries(T.c).forEach(([f,v])=>{if(CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push(T.id+" c "+f+": "+v)});
  });
  if(BAD.length)throw new Error("academy: "+BAD.join("; "));
  TS.forEach(T=>{if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T)});
  const ids=["serpentrobes","griffinrobes","badgerrobes","ravenrobes"].concat(TS.map(t=>t.id));
  PRESET_GROUPS.start.forEach(g=>{g.keys=g.keys.filter(k=>!ids.includes(k))});
  const st=PRESET_GROUPS.start.findIndex(g=>g.label==="Stylish");
  PRESET_GROUPS.start.splice(st+1,0,{label:"Academy",keys:ids});
})();

/* ---- v97: "Shark robes" and "Penguin robes" (Academy) ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  ["shark","penguin"].forEach(n=>addO("tagCharm","small "+n+" crest badge","CU","preppy,costume"));
  addO("detailTwo","streamlined silhouette","CU");
  addO("legwear","sheer {c}-and-{c2} shark skin stockings","CU","costume,fantasy");
  addO("detailOne","tuxedo-style lapel trim","CU","costume,preppy");
  addO("detailTwo","rounded, plush silhouette","CU");
  const TS=[
  {id:"sharkrobes",name:"Shark robes",blurb:"A tall, toned young woman with steel-blue high twin ponytails fading to white with coral-red tips, glossy black eyes, cool ivory skin and a cute, teasing pout. A black hooded robe with white lining over a steel-blue vest and charcoal pleated skirt, with a coral-and-white striped tie, shark-skin stockings and a streamlined silhouette.",pal:{"primary": "steel blue", "secondary": "charcoal gray", "third": "white", "accent": "coral red", "extra": "black"},c:{"age": "young woman", "faceShape": "elegant angular face", "noseShape": "slender nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "metallic iris ring", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@extra", "hairStyle": "high twin ponytails", "hairLength": "mid-back length", "bangs": "long sidelocks with loose face-framing strands", "hairBase": "@primary", "hairUnderlayer": "@third", "hairInner": "@secondary", "hairHighlights": "@accent", "hairBlend": "soft blended transitions between the layers", "skinTone": "ivory", "undertone": "cool", "skinFinish": "natural skin texture with a cool, dewy finish", "markings": "no markings", "makeupStyle": "soft glam makeup", "eyelinerStyle": "cat-eye eyeliner", "lipFinish": "glossy lips", "nailStyle": "long pointed claw-shaped fingernails", "nailColor": "@accent", "expression": "pouting expression", "browShape": "high arched brows", "impression": "a confident, polished presence", "bustSize": "medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "tall stature", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "toned build", "posture": "relaxed, weight-shifted stance", "nippleColor": "mauve", "nippleType": "firm and erect", "nippleLength": "short", "areolaColor": "mauve", "areolaType": "flat", "areolaSize": "small", "vaginaColor": "mauve", "vaginaType": "neat with minimal labia", "pubicHair": "no pubic hair"},outfit:{oname:"Robe, vest and pleated skirt",look:"costume",items:{"top":["sweater vest over a collared shirt","@primary"],"bottom":["pleated mini skirt","@secondary"],"outerwear":["long {c} hooded robe with {c2} lining","@extra",undefined,"@third"],"neckAccessory":["{c}-and-{c2} striped necktie","@accent",undefined,"@third"],"legwear":["sheer {c}-and-{c2} shark skin stockings","@secondary",undefined,"@third"],"earAccessory":["large hoop earrings","@third"],"tagCharm":["small shark crest badge","@accent"]},details:{"detailTwo": "streamlined silhouette"},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}},
  {id:"penguinrobes",name:"Penguin robes",blurb:"A petite, top-heavy young woman with very long, straight black hair falling past the waist with white, ice-blue and pale-gold streaks, one orange and one ice-blue eye, warm light-brown skin dusted with freckles and a bright, approachable smile. A black hooded robe with white lining over an ice-blue vest and black pleated skirt, with an orange bow tie and ribbon corset belt, bow-top thigh-highs and a penguin crest.",pal:{"primary": "black", "secondary": "white", "third": "ice blue", "accent": "orange", "extra": "pale yellow"},c:{"age": "young woman", "faceShape": "heart-shaped face", "expression": "bright cheerful expression", "browShape": "gentle curved brows", "noseShape": "gentle upturned nose", "mouthShape": "heart-shaped lips", "impression": "a warm, strikingly feminine appearance", "eyeConfig": "heterochromatic", "eyeShape": "large almond-shaped eyes", "pupilStyle": "round pupils", "irisDetail": "bright, intricately detailed irises", "lashNatural": "long eyelashes", "eyeOne": "@accent", "eyeTwo": "@third", "hairLength": "very long", "hairTexture": "straight", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairHighlights": "pale gold", "skinTone": "warm light-brown", "undertone": "subtle golden", "markings": "soft freckles scattered across the body", "makeupStyle": "dewy makeup", "eyelinerStyle": "thin winged eyeliner", "lashStyle": "wispy lashes", "blushStyle": "soft sun-kissed blush", "lipFinish": "glass-like gloss", "faceAccents": "soft cheekbone highlight", "nailStyle": "glossy gel manicure", "nailColor": "@accent", "bustSize": "very large, full, naturally rounded breasts", "heightStature": "a petite frame", "shoulderShape": "narrow shoulders", "waistShape": "tiny waist", "stomachShape": "soft stomach", "hipShape": "rounded hips", "buttSize": "full, round butt", "thighBuild": "thick soft thighs", "legShape": "shapely legs", "bodySoftness": "extremely top-heavy hourglass figure", "handShape": "small and feminine", "hairMovement": "falls smoothly past the waist", "hairInner": "@third", "hairBlend": "blended blue, white, and orange gradient streaks", "bodyMarkings": "light body freckles dust the shoulders, chest, stomach, hips, and thighs","nippleColor":"light brown", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor":"light brown", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor":"deep pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{"oname": "Robe, vest and pleated skirt", "look": "costume", "items": {"top": ["sweater vest over a collared shirt", "@third"], "bottom": ["pleated mini skirt", "@primary"], "outerwear": ["long {c} hooded robe with {c2} lining", "@primary", null, "@secondary"], "neckAccessory": ["ribbon bow tie", "@accent"], "belt": ["ribbon corset belt", "@accent"], "legwear": ["thigh-high socks with bows", "@secondary"], "earAccessory": ["small pearl earrings", "-"], "tagCharm": ["small penguin crest badge", "@accent"]}, "details": {"detailOne": "tuxedo-style lapel trim", "detailTwo": "cinched waist"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}},
  ];
  const BAD=[];
  TS.forEach(T=>{
    [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)}));
    Object.entries(T.outfit.details||{}).forEach(([f,v])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)});
    Object.entries(T.c).forEach(([f,v])=>{if(CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push(T.id+" c "+f+": "+v)});
  });
  if(BAD.length)throw new Error("academy2: "+BAD.join("; "));
  TS.forEach(T=>{if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T)});
  const ac=PRESET_GROUPS.start.find(g=>g.label==="Academy");
  TS.forEach(T=>{if(ac&&!ac.keys.includes(T.id))ac.keys.push(T.id)});
})();

/* ===== Starting points registry (v114) =====
   One way to add or change starting points:
     START.add(group, [entries], {after})   register entries in a picker group (group null = keep current group)
     START.item(field, value, tier, families) add a catalog outfit option an entry needs
     START.option(field, value, groupLabel)   add a character option an entry needs
   An entry is a plain template {id,name,blurb,pal,c,outfit,more,out,tags} plus optional shortcuts:
     base:"foxrobes"   start from another starting point (palette, character, outfits, output), then layer this entry on top
     use:{body:"ideal",face:"bright",eyes:"almond",makeup:"dewy",skin:"fairRosy"}   studio presets, applied before c
     drop:[fields]     remove inherited character fields     nude:true  add a Nude outfit if there is none
     blurb:(T)=>"..."  a blurb can be written from the finished entry
   Adding an id that already exists replaces it in place, and entries built on it are rebuilt.
   Problems are collected in START.problems (and the console) instead of stopping the page. */
/* v172: fast starting-point lookup by id (the library passed 3,000 entries, and a linear TEMPLATES.find on every lookup made
   registration grow with the square of the library). The index is kept in sync by START and rebuilt whenever TEMPLATES
   changes behind its back (older blocks still push into it directly). */
function tplById(id){
  const S_=tplById;let m=S_.m,i=m&&m.get(id);
  if(i!==undefined&&TEMPLATES[i]&&TEMPLATES[i].id===id)return TEMPLATES[i];
  if(!m||S_.n!==TEMPLATES.length||i!==undefined){m=S_.m=new Map();TEMPLATES.forEach((t,j)=>m.set(t.id,j));S_.n=TEMPLATES.length;i=m.get(id);return i!==undefined?TEMPLATES[i]:undefined}
  return undefined;
}
const START=(()=>{
  const problems=[],RAW={},clone=o=>JSON.parse(JSON.stringify(o));
  const NUDE={oname:"Nude",look:"",items:{},details:{},dcol:{}};
  const PRE={body:()=>BODY_PRESETS,face:()=>FACE_PRESETS,eyes:()=>EYE_PRESETS,makeup:()=>MAKEUP_PRESETS,skin:()=>SKIN_PRESETS};
  const warn=m=>{problems.push(m);try{console.warn("[starting points] "+m)}catch(e){}};
  /* v172: membership sets per field for the catalog checks, rebuilt when a list grows behind START's back */
  const SETS=new Map();
  /* v210: a list that only grew since the last look has its new tail folded in, instead of being re-read whole */
  const has=(store,kind,f,v)=>{const a=store[f];if(!a)return false;const key=kind+f;let e=SETS.get(key);
    if(!e||e.a!==a||e.n>a.length){e={a,n:0,s:new Set()};SETS.set(key,e)}
    for(;e.n<a.length;e.n++){const x=a[e.n];e.s.add(kind==="o"?x.v:x[0])}
    return e.s.has(v)};
  const note=(store,kind,f,v)=>{const e=SETS.get(kind+f);if(e&&e.a===store[f]&&e.n===store[f].length-1){e.s.add(v);e.n++}};
  function item(f,v,t,fam){OUTFIT[f]=OUTFIT[f]||[];if(!has(OUTFIT,"o",f,v)){const it={v};if(t)it.t=t;if(fam)it.f=fam;OUTFIT[f].push(it);note(OUTFIT,"o",f,v)}}
  function option(f,v,g){if(CHAR[f]&&!has(CHAR,"c",f,v)){CHAR[f].push([v,g||""]);note(CHAR,"c",f,v)}}
  function group(label,after){
    let g=PRESET_GROUPS.start.find(x=>x.label===label);
    if(!g){g={label,keys:[]};const i=after?PRESET_GROUPS.start.findIndex(x=>x.label===after):-1;if(i>=0)PRESET_GROUPS.start.splice(i+1,0,g);else PRESET_GROUPS.start.push(g)}
    return g;
  }
  function resolve(e){
    let t;
    if(e.base){
      const b=tplById(e.base);
      if(!b){warn(e.id+": base “"+e.base+"” not found");return null}
      /* v210: only what the entry does not replace is copied from its base; the palette and character fields are flat, so a shallow copy is a full copy */
      const bo=b.out||{};
      t={pal:Object.assign({},b.pal),c:Object.assign({},b.c),outfit:e.outfit?null:clone(b.outfit),more:e.more?null:clone(b.more||[]),
        out:bo.pair?Object.assign({},bo,{pair:clone(bo.pair)}):Object.assign({},bo)};
      if(t.c._body&&BODY_PRESETS[t.c._body]){const k=t.c._body;delete t.c._body;Object.assign(t.c,BODY_PRESETS[k].v)}
    }else t={pal:{},c:{},outfit:{oname:"Outfit 1",look:"",items:{},details:{},dcol:{}},more:[],out:{}};
    (e.drop||[]).forEach(f=>{delete t.c[f]});
    Object.entries(e.use||{}).forEach(([k,key])=>{const P=PRE[k]&&PRE[k](),p=P&&P[key];if(!p){warn(e.id+": no "+k+" preset “"+key+"”");return}Object.assign(t.c,clone(p.v||p))});
    Object.assign(t.pal,e.pal||{});Object.assign(t.c,e.c||{});
    if(e.outfit)t.outfit=clone(e.outfit);
    if(e.more)t.more=clone(e.more);
    if(e.out)t.out={...t.out,...e.out};
    /* v252: no pre-made Nude outfit (Everspire carries no pre-made adult content) */
    const T={id:e.id,name:e.name||e.id,blurb:"",pal:t.pal,c:t.c,outfit:t.outfit,more:t.more,out:t.out};
    if(e.tags)T.tags=e.tags.slice();if(e.adultOnly)T.adultOnly=true;
    T.blurb=typeof e.blurb==="function"?e.blurb(T):(e.blurb||"");
    return T;
  }
  function check(T){
    Object.entries(T.c).forEach(([f,v])=>{if(f==="_body"){if(!BODY_PRESETS[v])warn(T.id+": no body preset “"+v+"”");return}
      if(typeof v==="string"&&v[0]!=="@"&&CHAR[f]&&CHAR[f].length&&!has(CHAR,"c",f,v))warn(T.id+": "+f+" “"+v+"” is not an option (it loads as a custom value)")});
    [T.outfit].concat(T.more||[]).forEach(o=>{
      Object.entries(o.items||{}).forEach(([f,a])=>{const v=Array.isArray(a)?a[0]:a&&a.v;if(!has(OUTFIT,"o",f,v))warn(T.id+": "+f+" “"+v+"” is not in the outfit catalog")});
      Object.entries(o.details||{}).forEach(([f,v])=>{if(!has(OUTFIT,"o",f,v))warn(T.id+": "+f+" “"+v+"” is not in the outfit catalog")});
    });
  }
  /* v172: indexed; a brand-new id cannot be in another group yet, so the group sweep only runs for a replacement */
  function put(T,g){
    const old=tplById(T.id),existed=!!old;
    if(existed){const i=tplById.m.get(T.id);TEMPLATES[i]=T}else{TEMPLATES.push(T);if(tplById.m&&tplById.n===TEMPLATES.length-1){tplById.m.set(T.id,TEMPLATES.length-1);tplById.n=TEMPLATES.length}}
    /* v172: an id reused by a different set silently replaced the older set's entry (that is how Cowgirls and Office Hours
       were emptied); flag it so a clash shows up in START.problems */
    if(g&&existed){const prev=PRESET_GROUPS.start.find(x=>x!==g&&x.keys.includes(T.id));if(prev)warn(T.id+": id clash, it replaced the entry in “"+prev.label+"” with one for “"+g.label+"”")}
    if(g){if(existed)PRESET_GROUPS.start.forEach(x=>{if(x!==g&&x.keys.includes(T.id))x.keys=x.keys.filter(k=>k!==T.id)});if(!g.keys.includes(T.id))g.keys.push(T.id)}
    return existed;
  }
  function rebuildDependents(id,seen){
    seen=seen||new Set([id]);
    Object.values(RAW).forEach(e=>{if(e.base===id&&!seen.has(e.id)){seen.add(e.id);const T=resolve(e);if(T){put(T,null);rebuildDependents(e.id,seen)}}});
  }
  function add(label,entries,opts){
    opts=opts||{};const g=label?group(label,opts.after):null;
    (entries||[]).forEach(e=>{
      if(!e||!e.id){warn("an entry has no id");return}
      /* v309: an explicit scene is not built; the purge would drop it, and the editor options it uses are registered directly */
      {const o=e.out;if(o&&(o.explicit||(o.pair&&o.pair.explicit)))return}
      RAW[e.id]=e;const T=resolve(e);if(!T)return;
      check(T);if(put(T,g))rebuildDependents(T.id);   /* v172: only a replaced entry can have dependents to rebuild */
    });
  }
  return{add,item,option,group,resolve,problems,RAW};
})();

/* ---- v108: Fox, Peacock and Flamingo houses (students; their headmistresses are added in the next block) ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  addO("legwear","{c} thigh-high socks with {c2} fur-trimmed cuffs","CU","costume,cottage");
  addO("legwear","sheer {c}-and-{c2} peacock feather stockings","CU","costume,fantasy");
  addO("legwear","sheer {c}-to-{c2} ombré stockings","CU","costume,fantasy");
  addO("detailOne","eyed-feather trim","CU","costume");
  addO("detailTwo","trailing back hem","CU");
  addO("earAccessory","peacock feather earrings","CU","preppy,costume");
  addO("bra","sheer feather trimmed lace bra","LS","boudoir,glam");
  addO("tagCharm","small fox crest badge","CU","preppy,costume");
  addO("tagCharm","fox crest brooch","CU","preppy,costume");
  addO("tagCharm","small peacock crest badge","CU","preppy,costume");
  addO("tagCharm","peacock crest brooch","CU","preppy,costume");
  addO("tagCharm","small flamingo crest badge","CU","preppy,costume");
  addO("tagCharm","flamingo crest brooch","CU","preppy,costume");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const TS=[
  {id:"foxrobes",name:"Fox robes",blurb:"A sly, hourglass young woman with a hip-length, bushy burnt-orange side ponytail fading to white tips, amber foxlike eyes, a cat-eye sweep, freckled peachy skin and a mischievous look. A charcoal hooded robe with cream lining and a tailcoat hem over a burnt-orange vest and charcoal pleated skirt, with an amber-and-charcoal tie, fur-cuffed charcoal thigh-highs and a fox crest.",pal:{"primary": "burnt orange", "secondary": "cream", "third": "charcoal gray", "accent": "amber gold", "extra": "white"},c:{"age": "young woman", "faceShape": "delicate V-shaped face", "expression": "mischievous expression", "browShape": "slightly raised brows", "noseShape": "gentle upturned nose", "mouthShape": "defined cupid's-bow lips", "impression": "striking, memorable features", "eyeConfig": "matching", "eyeShape": "foxlike eyes", "pupilStyle": "round pupils", "lashNatural": "long eyelashes", "eyeOne": "@accent", "hairStyle": "side ponytail", "hairLength": "hip-length", "hairTexture": "fluffy", "bangs": "long sidelocks with loose face-framing strands", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@extra", "skinTone": "peachy fair", "undertone": "peach", "skinFinish": "natural skin texture with a luminous, even finish", "markings": "soft freckles across the cheeks and nose", "makeupStyle": "sunset gradient makeup", "eyelinerStyle": "cat-eye eyeliner", "lashStyle": "long defined lashes", "blushStyle": "high cheek blush", "lipFinish": "glossy lips", "nailStyle": "long almond fingernails", "nailColor": "@primary", "bustSize": "large breasts", "bustShape": "perky, full, round shape", "heightStature": "average height", "shoulderShape": "graceful shoulders", "waistShape": "cinched tiny waist", "stomachShape": "flat stomach", "hipShape": "smooth hourglass hips", "buttSize": "full, rounded butt with noticeable projection", "thighBuild": "smooth shapely thighs", "legShape": "long shapely legs", "bodySoftness": "slim, feminine figure with soft, pronounced curves", "posture": "hip-popped sultry stance", "nippleColor": "peachy pink", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "peachy pink", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "rosy pink", "vaginaType": "symmetrical", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{"oname": "Robe, vest and pleated skirt", "look": "costume", "items": {"top": ["sweater vest over a collared shirt", "@primary"], "bottom": ["pleated mini skirt", "@third"], "outerwear": ["long {c} hooded robe with {c2} lining", "@third", null, "@secondary"], "neckAccessory": ["{c}-and-{c2} striped necktie", "@accent", null, "@third"], "legwear": ["{c} thigh-high socks with {c2} fur-trimmed cuffs", "@third", null, "@secondary"], "earAccessory": ["ear cuffs", "@accent"], "tagCharm": ["small fox crest badge", "@accent"]}, "details": {"detailOne": "fur trim", "detailTwo": "tailcoat hem"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"peacockrobes",name:"Peacock robes",blurb:"A tall, slim-curved young woman with a waist-length royal-purple half-up twist shading into peacock blue, turquoise and gold, gold-and-blue eyes with eye-spot irises, sun-kissed tan skin with freckles and a radiant, head-tilted smile. A plum hooded robe with peacock-blue lining and a trailing hem over a royal-purple vest and peacock-blue pleated skirt, with eyed-feather trim, feather-print stockings and feather earrings.",pal:{"primary": "royal purple", "secondary": "peacock blue", "third": "plum", "accent": "metallic gold", "extra": "turquoise"},c:{"age": "young woman", "faceShape": "heart-shaped face with high cheekbones and a tapered chin", "expression": "radiant, head-tilted smile", "browShape": "softly arched brows", "mouthShape": "soft full lips", "impression": "a glamorous, feminine appearance", "eyeConfig": "gradient-tinted", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "multi-ring iris pattern", "eyeOne": "@secondary", "eyeTwo": "@accent", "hairStyle": "half-up twist", "hairLength": "waist-length", "hairTexture": "thick, silky, voluminous", "bangs": "soft curtain bangs", "hairMovement": "fans out behind her", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@extra", "hairHighlights": "@accent", "eyelinerStyle": "classic winged eyeliner", "eyeshadowStyle": "duochrome eyeshadow", "lipFinish": "high-shine lips", "bustSize": "large breasts", "heightStature": "tall graceful stature", "shoulderShape": "narrow delicate shoulders", "armShape": "long, slender arms", "waistShape": "tiny waist", "hipShape": "rounded hips", "buttSize": "full, round butt", "thighBuild": "thick, soft thighs", "legShape": "long shapely legs", "bodySoftness": "slim, feminine figure with soft, pronounced curves", "posture": "elegant posture", "nippleColor": "caramel brown", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "caramel brown", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "deep pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair", "makeupStyle": "shimmer makeup", "skinTone": "tan", "undertone": "golden", "skinFinish": "natural skin texture with a sun-kissed glow", "markings": "sun-kissed freckles across the body"},outfit:{"oname": "Robe, vest and pleated skirt", "look": "costume", "items": {"top": ["sweater vest over a collared shirt", "@primary"], "bottom": ["pleated mini skirt", "@secondary"], "outerwear": ["long {c} hooded robe with {c2} lining", "@third", null, "@secondary"], "neckAccessory": ["{c}-and-{c2} striped necktie", "@accent", null, "@secondary"], "legwear": ["sheer {c}-and-{c2} peacock feather stockings", "@primary", null, "@extra"], "earAccessory": ["peacock feather earrings", "@extra"], "tagCharm": ["small peacock crest badge", "@accent"]}, "details": {"detailOne": "eyed-feather trim", "detailTwo": "trailing back hem"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"flamingorobes",name:"Flamingo robes",blurb:"A tall, very top-heavy young woman with a long hot-pink high bun fading to salmon, one hot-pink and one white ringed eye, warm light-brown skin with light freckles, luminous makeup with pearl shimmer and a serene look. A white hooded robe with hot-pink lining and feather trim over a hot-pink vest and a salmon tulle-layered skirt, with a black-and-white tie, salmon-to-pink ombré stockings and a flamingo crest.",pal:{"primary": "hot pink", "secondary": "white", "third": "salmon", "accent": "black", "extra": "golden yellow"},c:{"age": "young woman", "faceShape": "refined face", "eyeConfig": "ringed heterochromia", "eyeOne": "@primary", "eyeTwo": "@secondary", "hairStyle": "high bun", "hairBase": "@primary", "hairUnderlayer": "@third", "hairInner": "@primary", "hairHighlights": "@secondary", "skinTone": "warm light-brown", "undertone": "golden", "markings": "light freckles dusting the shoulders, chest, stomach, hips, and thighs", "bustSize": "very large breasts", "bustShape": "full, naturally rounded shape", "shoulderShape": "narrow delicate shoulders", "waistShape": "tiny waist", "stomachShape": "soft stomach", "hipShape": "rounded hips", "buttSize": "full, round butt", "thighBuild": "thick, soft thighs", "legShape": "shapely legs", "bodySoftness": "extremely top-heavy hourglass figure", "expression": "serene expression", "browShape": "softly arched brows", "noseShape": "refined straight nose", "mouthShape": "soft full lips", "faceMark": "a small beauty mark beneath one eye", "impression": "a confident, polished presence", "eyeShape": "large upturned eyes", "pupilStyle": "round pupils", "irisDetail": "gradient iris coloring", "lashNatural": "long, delicate eyelashes", "hairLength": "long", "hairTexture": "silky and smooth", "bangs": "long sidelocks with loose face-framing strands", "heightStature": "tall graceful stature", "posture": "elegant posture", "bustWeight": "heavy natural fullness", "skinFinish": "soft luminous skin", "makeupStyle": "luminous makeup", "eyelinerStyle": "thin winged eyeliner", "eyeshadowStyle": "gradient eyeshadow", "lashStyle": "soft fluttery lashes", "blushStyle": "diffused blush", "lipFinish": "glossy lips", "faceAccents": "soft pearl shimmer", "makeupColor": "@third", "nailStyle": "long almond fingernails", "nailColor": "@primary+@secondary+@third+@accent", "nippleColor":"light brown", "nippleType": "soft and rounded", "nippleLength": "short", "areolaColor":"light brown", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor":"deep pink", "vaginaType": "neat with minimal labia", "pubicHair": "no pubic hair"},outfit:{"oname": "Robe, vest and tulle skirt", "look": "costume", "items": {"top": ["sweater vest over a collared shirt", "@primary"], "bottom": ["tulle-layered skirt", "@third"], "outerwear": ["long {c} hooded robe with {c2} lining", "@secondary", null, "@primary"], "neckAccessory": ["{c}-and-{c2} striped necktie", "@accent", null, "@secondary"], "legwear": ["sheer {c}-to-{c2} ombré stockings", "@third", null, "@primary"], "earAccessory": ["delicate drop earrings", "@extra"], "tagCharm": ["small flamingo crest badge", "@accent"]}, "details": {"detailOne": "feather trim", "detailTwo": "high-waisted fit"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  ];
  const BAD=[];
  TS.forEach(T=>{
    [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)}));
    Object.entries(T.outfit.details||{}).forEach(([f,v])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)});
    Object.entries(T.c).forEach(([f,v])=>{if(f!=="_body"&&CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push(T.id+" c "+f+": "+v)});
  });
  if(BAD.length)throw new Error("academy3: "+BAD.join("; "));
  TS.forEach(T=>{if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T)});
  const ac=PRESET_GROUPS.start.find(g=>g.label==="Academy");
  TS.forEach(T=>{if(ac&&!ac.keys.includes(T.id))ac.keys.push(T.id)});
})();

/* ---- v102: "Academy Headmistresses" category, one headmistress per house ---- */
(function(){
  const addO=(f,v,t,fam,s,g)=>{OUTFIT[f]=OUTFIT[f]||[];if(!OUTFIT[f].some(i=>i.v===v)){const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[f].push(it)}};
  addO("outerwear","long {c} academic gown with {c2} velvet facings","CU","preppy,costume");
  ["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin"].forEach(n=>addO("tagCharm",n+" crest brooch","CU","preppy,costume"));
  addO("earAccessory","small shark tooth earrings","CU","preppy,costume");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const SERPENTPAL=(TEMPLATES.find(t=>t.id==="serpentrobes")||{}).pal||{primary:"golden blonde",secondary:"black",third:"emerald green",accent:"heather gray",extra:"silver"};
  const TS=[
  {id:"griffinhead",name:"Griffin headmistress",blurb:"A tall, commanding headmistress with a waist-length chocolate-brown twisted chignon streaked gold, sharp hooded gold eyes and an elegant, composed air. A chocolate-brown academic gown with gold facings over a red silk blouse and black pencil skirt, with a griffin crest brooch.",pal:{"primary": "chocolate brown", "secondary": "gold", "third": "red", "accent": "silver", "extra": "black"},c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "carefully manicured fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "long oval face with high, defined cheekbones", "eyeShape": "sharp, slightly hooded eyes", "eyeOne": "@secondary", "hairStyle": "twisted chignon", "hairLength": "very long", "hairTexture": "silky and smooth", "bangs": "open forehead", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@secondary", "skinTone": "fair", "undertone": "warm", "skinFinish": "satin-smooth skin", "makeupStyle": "classic glam makeup", "eyelinerStyle": "classic winged eyeliner", "lipFinish": "soft satin lips", "nailColor": "@third", "expression": "elegant composed expression", "browShape": "defined, gently arched eyebrows", "impression": "an elegant, mature presence", "bustSize": "large breasts", "bustShape": "full, naturally rounded shape", "bustWeight": "soft natural fullness", "heightStature": "tall, statuesque stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "flat, smooth stomach", "hipShape": "wide, curvy hips", "buttSize": "firm, round butt", "thighBuild": "thick, shapely thighs", "legShape": "long legs with defined calves", "bodySoftness": "tall, statuesque hourglass figure with long limbs and balanced curves", "posture": "tall, proud posture", "nippleColor": "rosy pink", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "rosy pink", "areolaType": "smooth", "areolaSize": "large", "vaginaColor": "rosy pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["silk blouse","@third"],"bottom":["knee-length pencil skirt","@extra"],"outerwear":["long {c} academic gown with {c2} velvet facings","@primary",undefined,"@secondary"],"neckAccessory":["silk neck bow","@secondary"],"earAccessory":["pearl drop earrings","-"],"legwear":["sheer stockings","@extra"],"tagCharm":["griffin crest brooch","@secondary"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"badgerhead",name:"Badger headmistress",blurb:"A curvy, exaggerated-hourglass headmistress with a long mustard low bun streaked chocolate and yellow, round glasses, almond eyes, golden-beige freckled skin and a flushed, parted-lip look. A chocolate-brown academic gown with yellow facings over a sheer lace blouse and low-waisted mini pencil skirt with side cutouts, with seamed thigh-highs, fingerless lace gloves, a hair ribbon, a cameo necklace and a badger crest brooch.",pal:{"primary": "yellow", "secondary": "black", "third": "mustard yellow", "accent": "chocolate brown", "extra": "charcoal gray"},c:{"noseShape": "small straight nose", "mouthShape": "sensual full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "carefully manicured fingernails", "markings": "soft freckles across the cheeks", "age": "mature woman", "faceShape": "soft round-cheeked face", "eyeShape": "large almond-shaped eyes", "eyeOne": "@accent", "hairStyle": "low bun", "hairLength": "long", "hairTexture": "slightly wavy", "bangs": "long face-framing pieces", "hairBase": "@third", "hairUnderlayer": "@accent", "hairInner": "@third", "hairHighlights": "@primary", "skinTone": "golden beige", "undertone": "peach", "skinFinish": "natural skin texture with a soft rosy flush", "nailColor": "@accent", "expression": "aroused, parted-lip expression", "browShape": "soft eyebrows", "impression": "effortless, natural beauty with Latina heritage and a warm girl-next-door charm", "nippleColor": "peachy pink", "nippleType": "puffy", "nippleLength": "medium-length", "areolaColor": "peachy pink", "areolaType": "puffy", "areolaSize": "large", "vaginaColor": "soft pink", "vaginaType": "full and plump", "pubicHair": "full natural pubic hair", "bustSize": "huge breasts", "bustShape": "exaggerated rounded shape", "bustWeight": "exaggerated fullness", "heightStature": "average height", "shoulderShape": "narrow delicate shoulders", "waistShape": "extremely narrow waist", "stomachShape": "flat stomach", "hipShape": "exaggerated wide hips", "buttSize": "extremely large butt", "thighBuild": "extremely thick thighs", "legShape": "soft full legs", "bodySoftness": "exaggerated hourglass figure", "posture": "elegant posture", "torsoShape": "narrow ribcage", "armShape": "slender arms", "lipFinishColor": "red", "makeupStyle": "dewy makeup", "lashStyle": "wispy lashes", "blushStyle": "soft sun-kissed blush", "lipFinish": "glass-like gloss", "faceAccents": "soft cheekbone highlight"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["sheer lace blouse", "@third"], "bottom": ["low-waisted mini pencil skirt with side cutouts", "@secondary"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@accent", null, "@primary"], "neckAccessory": ["cameo necklace", "@accent"], "eyewear": ["round glasses", "@accent"], "earAccessory": ["small pearl earrings", "-"], "legwear": ["sheer seamed thigh-high stockings", "@secondary"], "tagCharm": ["badger crest brooch", "@primary"], "headwear": ["hair ribbon", "auto"], "belt": ["satin ribbon belt", "auto"], "gloves": ["Fingerless lace gloves", "auto"]}, "details": {"detailTwo": "plunging neckline", "detailThree": "sheer, sweat-sheened mesh"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"ravenhead",name:"Raven headmistress",blurb:"A tall, slender, severe headmistress with very long silky midnight-blue hair in a neat center part, sharp bronze eyes behind half-rim glasses, porcelain skin and a cool, aloof look. A midnight-blue academic gown with bronze facings over a storm-blue pussy-bow blouse and black pencil skirt, with a raven crest brooch.",pal:{"primary": "storm blue", "secondary": "midnight blue", "third": "black", "accent": "bronze", "extra": "navy blue"},c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "carefully manicured fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "long oval face with a high forehead and defined cheekbones", "eyeShape": "sharp, slightly hooded eyes", "eyeOne": "@accent", "hairStyle": "long straight hair", "hairLength": "very long", "hairTexture": "silky straight", "bangs": "neat center part", "hairBase": "@secondary", "hairUnderlayer": "@third", "hairInner": "@primary", "hairHighlights": "@accent", "skinTone": "porcelain", "undertone": "cool", "skinFinish": "natural skin texture with a soft porcelain matte finish", "makeupStyle": "editorial makeup", "eyelinerStyle": "graphic eyeliner", "lipFinish": "matte lips", "expression": "cool aloof expression", "browShape": "thin elegant brows", "impression": "a thoughtful, intelligent look", "bustSize": "medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "tall graceful stature", "shoulderShape": "narrow delicate shoulders", "torsoShape": "slim upper torso", "armShape": "slender arms and delicate hands", "waistShape": "narrow waist", "stomachShape": "flat stomach", "hipShape": "narrow hips", "buttSize": "toned butt", "thighBuild": "slender thighs", "legShape": "tall, slender legs", "bodySoftness": "slender soft build", "posture": "tall, proud posture", "nippleColor": "mauve", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "mauve", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "mauve", "vaginaType": "neat with minimal labia", "pubicHair": "no pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["blouse with a pussy-bow neckline","@primary"],"bottom":["fitted pencil skirt","@third"],"outerwear":["long {c} academic gown with {c2} velvet facings","@secondary",undefined,"@accent"],"neckAccessory":["cameo necklace","@accent"],"eyewear":["half-rim glasses","@third"],"earAccessory":["pearl stud earrings","-"],"legwear":["sheer stockings","@third"],"tagCharm":["raven crest brooch","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"serpenthead",name:"Serpent headmistress",blurb:"A sleek, tall headmistress with a golden-blonde French twist, sharp emerald eyes, cool fair skin and a wry, knowing look. A black academic gown with emerald facings over an emerald silk blouse and black pencil skirt, with long black satin gloves and a serpent crest brooch.",pal:SERPENTPAL,c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "carefully manicured fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "elegant angular face", "eyeShape": "sharp, slightly hooded eyes", "eyeOne": "@third", "hairStyle": "French twist", "hairLength": "long", "hairTexture": "sleek", "bangs": "open forehead", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@extra", "skinTone": "fair", "undertone": "cool", "skinFinish": "natural skin texture with a soft matte finish", "makeupStyle": "femme fatale makeup", "eyelinerStyle": "sharp winged eyeliner", "lipFinish": "matte lips", "nailColor": "@third", "expression": "wry, knowing look", "browShape": "elegantly swept-up, pointed brows", "impression": "a confident, polished presence", "bustSize": "medium-large, full breasts", "bustShape": "perky, full, round shape", "bustWeight": "light delicate fullness", "heightStature": "tall graceful stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "narrow waist", "stomachShape": "flat, smooth stomach", "hipShape": "gently curving hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "tall, long-legged, slender figure", "posture": "graceful upright posture", "nippleColor": "pale pink", "nippleType": "firm and erect", "nippleLength": "medium-length", "areolaColor": "pale pink", "areolaType": "flat", "areolaSize": "medium-sized", "vaginaColor": "soft pink", "vaginaType": "soft with prominent inner labia", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["silk blouse","@third"],"bottom":["high-waisted pencil skirt","@secondary"],"outerwear":["long {c} academic gown with {c2} velvet facings","@secondary",undefined,"@third"],"neckAccessory":["silk neck bow","@extra"],"gloves":["long satin gloves","@secondary"],"earAccessory":["pearl drop earrings","-"],"legwear":["sheer stockings","@secondary"],"tagCharm":["serpent crest brooch","@extra"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"wolfhead",name:"Wolf headmistress",blurb:"A tall, stern, athletic headmistress with a silver-gray layered bob, pale ice-blue eyes, a faint scar through one eyebrow and a no-nonsense stare. A black academic gown with ice-blue facings over a white tailored shirt, bow tie and navy tailored trousers, with a wolf crest brooch.",pal:{"primary": "steel gray", "secondary": "navy blue", "third": "white", "accent": "ice blue", "extra": "black"},c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "ringed iris pattern", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "short rounded fingernails", "markings": "a faint scar through one eyebrow", "age": "mature woman", "faceShape": "oval face with defined cheekbones and a softly pointed chin", "eyeShape": "sharp, slightly hooded eyes", "eyeOne": "@accent", "hairStyle": "short layered bob", "hairLength": "chin-length", "hairTexture": "straight", "bangs": "long side bangs", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@third", "skinTone": "ivory", "undertone": "neutral", "skinFinish": "natural skin texture with a warm, healthy glow", "makeupStyle": "minimal makeup", "eyelinerStyle": "no eyeliner", "lipFinish": "natural lip finish", "expression": "stern, serious expression", "browShape": "straight brows", "impression": "an elegant, mature presence", "bustSize": "medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "tall, broad-shouldered stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "toned build", "posture": "strong, squared posture", "nippleColor": "dusty rose", "nippleType": "firm and erect", "nippleLength": "short", "areolaColor": "dusty rose", "areolaType": "flat", "areolaSize": "small", "vaginaColor": "dusty rose", "vaginaType": "neat with minimal labia", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["tailored shirt","@third"],"bottom":["high-waisted tailored trousers","@secondary"],"outerwear":["long {c} academic gown with {c2} velvet facings","@extra",undefined,"@accent"],"neckAccessory":["bow tie","@accent"],"tagCharm":["wolf crest brooch","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"swanhead",name:"Swan headmistress",blurb:"A serene, silver-haired headmistress and former prima ballerina, with a very long pearl-white ballerina bun, sky-blue eyes, pale ivory skin with fine laugh lines and a dancer's poise. A pearl-white academic gown with dusty-rose facings over a white lace blouse and rose pencil skirt, with a swan crest brooch.",pal:{"primary": "pearl white", "secondary": "dusty rose", "third": "silver", "accent": "rose gold", "extra": "soft gray"},c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "carefully manicured fingernails", "markings": "faint laugh lines at the corners of the eyes", "age": "older woman", "faceShape": "oval face with balanced features", "eyeShape": "large almond-shaped eyes", "eyeOne": "sky blue", "hairStyle": "ballerina bun", "hairLength": "very long", "hairTexture": "silky and smooth", "bangs": "long face-framing strands sweeping around the face", "hairBase": "@primary", "hairUnderlayer": "@third", "hairInner": "@primary", "hairHighlights": "@third", "skinTone": "pale ivory", "undertone": "rosy", "skinFinish": "satin-smooth skin", "makeupStyle": "soft natural makeup", "eyelinerStyle": "thin winged eyeliner", "lipFinish": "soft satin lips", "expression": "serene expression", "browShape": "softly arched brows", "impression": "an elegant, mature presence", "bustSize": "small-to-medium breasts", "bustShape": "perky rounded shape", "bustWeight": "light delicate fullness", "heightStature": "tall graceful stature", "shoulderShape": "slim, level shoulders", "torsoShape": "narrow ribcage with a long, slim torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "lean, athletic hips", "buttSize": "firm, round butt", "thighBuild": "lean, toned thighs", "legShape": "long legs with defined calves", "bodySoftness": "lithe, dancer's build", "posture": "poised dancer's posture", "nippleColor": "pale pink", "nippleType": "soft and rounded", "nippleLength": "short", "areolaColor": "pale pink", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "soft pink", "vaginaType": "smooth and closed", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["high-neck lace blouse","@primary"],"bottom":["knee-length pencil skirt","@secondary"],"outerwear":["long {c} academic gown with {c2} velvet facings","@primary",undefined,"@secondary"],"neckAccessory":["cameo necklace","@accent"],"earAccessory":["bow earrings","@accent"],"legwear":["sheer stockings","@primary"],"tagCharm":["swan crest brooch","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"dragonhead",name:"Dragon headmistress",blurb:"An imposing, statuesque headmistress with a very long black crown braid streaked crimson and gold, molten gold eyes with slit pupils, light-tan skin and a confident smile. A burgundy academic gown with gold facings over a crimson silk blouse and black pencil skirt, with dragon scale leggings and a dragon crest brooch.",pal:{"primary": "crimson", "secondary": "charcoal gray", "third": "burgundy", "accent": "gold", "extra": "black"},c:{"noseShape": "slender nose", "mouthShape": "sensual full lips", "eyeConfig": "matching", "pupilStyle": "vertical slit pupils", "irisDetail": "metallic iris ring", "lashNatural": "long, thick dark eyelashes", "hairBlend": "soft blended transitions between the layers", "nailStyle": "long almond fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "elegant angular face", "eyeShape": "sharp, slightly hooded eyes", "eyeOne": "@accent", "hairStyle": "crown braid", "hairLength": "very long", "hairTexture": "thick, straight and glossy", "bangs": "long sidelocks", "hairBase": "@extra", "hairUnderlayer": "@primary", "hairInner": "@third", "hairHighlights": "@accent", "skinTone": "light tan", "undertone": "warm", "skinFinish": "natural skin texture with a sun-kissed glow", "makeupStyle": "femme fatale makeup", "eyelinerStyle": "sharp winged eyeliner", "lipFinish": "matte lips", "nailColor": "@primary", "expression": "confident smile", "browShape": "heavy, strongly defined dark brows", "impression": "a confident, polished presence", "bustSize": "large breasts", "bustShape": "full, naturally rounded shape", "bustWeight": "soft natural fullness", "heightStature": "tall, statuesque stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "defined waist", "stomachShape": "firm, toned stomach", "hipShape": "wide, curvy hips", "buttSize": "firm, round butt", "thighBuild": "thick, shapely thighs", "legShape": "long legs with defined calves", "bodySoftness": "tall, statuesque hourglass figure with long limbs and balanced curves", "posture": "strong, squared posture", "nippleColor": "light brown", "nippleType": "firm and erect", "nippleLength": "long", "areolaColor": "light brown", "areolaType": "slightly raised", "areolaSize": "wide", "vaginaColor": "deep pink", "vaginaType": "soft with prominent inner labia", "pubicHair": "a narrow landing strip of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["silk blouse","@primary"],"bottom":["high-waisted pencil skirt","@extra"],"outerwear":["long {c} academic gown with {c2} velvet facings","@third",undefined,"@accent"],"neckAccessory":["silk neck bow","@accent"],"earAccessory":["ear cuffs","@accent"],"legwear":["sheer {c}-and-{c2} dragon scale leggings","@extra",undefined,"@primary"],"tagCharm":["dragon crest brooch","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"staghead",name:"Stag headmistress",blurb:"A tall, serene headmistress with deep brown skin, waist-length chestnut locs with gold highlights, forest-green eyes, fine laugh lines and wire-rim glasses. A forest-green academic gown with gold facings over a cream bow-collar blouse and chestnut pencil skirt, with a stag crest brooch.",pal:{"primary": "forest green", "secondary": "chestnut brown", "third": "cream", "accent": "gold", "extra": "moss green"},c:{"noseShape": "small straight nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "hairBlend": "subtle natural highlights", "nailStyle": "carefully manicured fingernails", "markings": "faint laugh lines at the corners of the eyes", "age": "mature woman", "faceShape": "oval face with balanced features", "eyeShape": "large almond-shaped eyes", "eyeOne": "@primary", "hairStyle": "locs", "hairLength": "waist-length", "bangs": "open forehead", "hairBase": "@secondary", "hairUnderlayer": "@secondary", "hairInner": "@secondary", "hairHighlights": "@accent", "skinTone": "deep brown", "undertone": "red-brown", "skinFinish": "natural skin texture with a deep, rich glow", "makeupStyle": "golden-hour glow makeup", "eyelinerStyle": "soft eyeliner", "lipFinish": "glossy lips", "expression": "serene expression", "browShape": "full, softly arched dark brows", "impression": "an elegant, mature presence", "bustSize": "medium-large, full breasts", "bustShape": "full, naturally rounded shape", "bustWeight": "soft natural fullness", "heightStature": "very tall elegant stature", "shoulderShape": "elegant straight shoulders", "torsoShape": "long, lean torso", "armShape": "long, graceful arms and elegant hands", "waistShape": "long, slim waist", "stomachShape": "flat, smooth stomach", "hipShape": "gently curving hips", "buttSize": "firm, round butt", "thighBuild": "long, lean thighs", "legShape": "long, lean legs", "bodySoftness": "lean, graceful build", "posture": "tall, proud posture", "nippleColor": "chocolate brown", "nippleType": "puffy", "nippleLength": "medium-length", "areolaColor": "chocolate brown", "areolaType": "smooth", "areolaSize": "large", "vaginaColor": "deep brown", "vaginaType": "full and plump", "pubicHair": "a soft natural triangle of pubic hair"},outfit:{oname:"Headmistress robes",look:"preppy",items:{"top":["button blouse with a bow collar","@third"],"bottom":["knee-length pencil skirt","@secondary"],"outerwear":["long {c} academic gown with {c2} velvet facings","@primary",undefined,"@accent"],"neckAccessory":["locket necklace","@accent"],"eyewear":["wire-rim vintage glasses","@accent"],"earAccessory":["small pearl earrings","-"],"legwear":["opaque tights","@secondary"],"tagCharm":["stag crest brooch","@accent"]},details:{},dcol:{}},more:[{oname:"Nude",look:"",items:{},details:{},dcol:{}}],out:{framing:"full body",must:MUST}},
  {id:"sharkhead",name:"Shark headmistress",blurb:"A tall, powerfully built headmistress with a sleek high ponytail fading from deep teal roots to sun-bleached white ends, glossy black eyes, a sharp-toothed smirk, tanned salt-sheened skin, cat-eye liner and coral claw nails. A black academic gown with deep-teal facings over a white button-up blouse, coral-and-white striped tie and charcoal pencil skirt, with shark skin stockings, shark tooth earrings and a shark crest brooch.",pal:{"primary": "deep teal", "secondary": "charcoal gray", "third": "white", "accent": "coral red", "extra": "black"},c:{"noseShape": "slender nose", "mouthShape": "soft full lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "metallic iris ring", "lashNatural": "long, thick dark eyelashes", "hairBlend": "sun-bleached ends fading from the darker roots", "nailStyle": "long pointed claw-shaped fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "elegant angular face", "eyeShape": "large upturned eyes", "eyeOne": "@extra", "hairStyle": "high ponytail", "hairLength": "very long", "hairTexture": "sleek", "bangs": "open forehead", "hairBase": "@primary", "hairUnderlayer": "@primary", "hairInner": "@secondary", "hairHighlights": "@third", "skinTone": "tan", "undertone": "warm", "skinFinish": "sun-bronzed skin with a soft salt-water sheen", "makeupStyle": "classic glam makeup", "eyelinerStyle": "cat-eye eyeliner", "lipFinish": "wet glossy lips", "nailColor": "@accent", "expression": "smirk", "browShape": "high arched brows", "impression": "a dangerous, predatory elegance", "bustSize": "medium-large, full breasts", "bustShape": "perky, full, round shape", "bustWeight": "light delicate fullness", "heightStature": "tall stature", "shoulderShape": "broad, strong shoulders", "waistShape": "defined waist", "hipShape": "wide, curvy hips", "buttSize": "full, firm, lifted butt", "thighBuild": "thick, firm, athletic thighs", "legShape": "long legs with defined calves", "bodySoftness": "strong, curvy athletic figure with defined muscle and full curves", "posture": "relaxed, weight-shifted stance", "nippleColor": "dusty rose", "nippleType": "firm and erect", "nippleLength": "medium-length", "areolaColor": "dusty rose", "areolaType": "slightly raised", "areolaSize": "medium-sized", "vaginaColor": "mauve", "vaginaType": "symmetrical", "pubicHair": "no pubic hair", "fangClawStyle": "sharp shark teeth"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["fitted button-up blouse", "@third"], "bottom": ["fitted pencil skirt", "@secondary"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@extra", null, "@primary"], "neckAccessory": ["{c}-and-{c2} striped necktie", "@accent", null, "@third"], "earAccessory": ["small shark tooth earrings", "-"], "legwear": ["sheer {c}-and-{c2} shark skin stockings", "@secondary", null, "@third"], "tagCharm": ["shark crest brooch", "@accent"]}, "details": {}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"penguinhead",name:"Penguin headmistress",blurb:"An elegant, hourglass headmistress in black-tie glamour: long glossy jet-black waves with a white streak and an icy blue underlayer, amber-orange eyes, high-arched brows, a beauty mark and a seductive smile. A black academic gown with white facings over a white satin wrap blouse, loosened black bow tie, high-slit satin skirt and seamed stockings, with opera gloves, an orange waist-cinching belt and a penguin crest brooch.",pal:{"primary": "black", "secondary": "white", "third": "ice blue", "accent": "orange", "extra": "pale yellow"},c:{"noseShape": "slender nose", "mouthShape": "defined cupid's-bow lips", "eyeConfig": "matching", "pupilStyle": "round pupils", "irisDetail": "clear iris detail", "lashNatural": "long, thick dark eyelashes", "nailStyle": "long almond fingernails", "markings": "no markings", "age": "mature woman", "faceShape": "high-cheekboned face", "eyeShape": "almond-shaped, slightly hooded eyes", "eyeOne": "@accent", "hairStyle": "long side-swept waves", "hairLength": "very long", "hairTexture": "glossy", "bangs": "open forehead", "hairBase": "@primary", "hairUnderlayer": "@third", "hairHighlights": "@secondary", "skinTone": "fair", "undertone": "neutral", "skinFinish": "natural skin texture with a smooth, satin finish", "makeupStyle": "glamorous soft smoky makeup", "eyelinerStyle": "classic winged eyeliner", "lipFinish": "high-shine lips", "nailColor": "@primary", "expression": "seductive smile", "browShape": "thin, high-arched dark brows", "impression": "a strikingly beautiful, sophisticated presence with mature elegance", "bustSize": "large breasts", "bustShape": "perky, full, round shape", "shoulderShape": "elegant straight shoulders", "waistShape": "pronounced hourglass waist", "hipShape": "smooth hourglass hips", "buttSize": "full, firm, lifted butt", "legShape": "long shapely legs", "bodySoftness": "tall, long-limbed hourglass figure with a small waist and full curves", "posture": "elegant posture", "nippleColor": "soft pink", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "soft pink", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "soft pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair", "faceMark": "a subtle beauty mark"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["wrap-front satin blouse", "@secondary"], "bottom": ["high-slit satin skirt", "@primary"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@primary", null, "@secondary"], "neckAccessory": ["loosened bow tie", "@primary"], "corset": ["waist-cinching corset belt", "@accent"], "gloves": ["opera satin gloves", "@primary"], "earAccessory": ["pearl drop earrings", "-"], "legwear": ["seamed stockings", "@primary"], "tagCharm": ["penguin crest brooch", "@accent"]}, "details": {}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"foxhead",name:"Fox headmistress",blurb:"A sultry, wide-hipped headmistress with a very long burnt-orange side fishtail braid fading to white, amber foxlike eyes, swept-up brows, a sly smirk and a sunset-gradient eye. A charcoal academic gown with burnt-orange facings over a cream off-shoulder silk blouse and charcoal pencil skirt with a peplum hem, with a gold chain necklace and a fox crest brooch.",pal:{"primary": "burnt orange", "secondary": "cream", "third": "charcoal gray", "accent": "amber gold", "extra": "white"},c:{"age": "mature woman", "faceShape": "elegant angular face", "expression": "sly, fox-like smirk", "browShape": "elegantly swept-up, pointed brows", "noseShape": "slender nose", "mouthShape": "defined cupid's-bow lips", "impression": "an alluring, sultry presence", "eyeConfig": "matching", "eyeShape": "foxlike eyes", "pupilStyle": "round pupils", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "side fishtail braid", "hairLength": "very long", "hairTexture": "silky and smooth", "bangs": "long sidelocks", "hairBase": "@primary", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@extra", "skinTone": "warm tan", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "markings": "no markings", "makeupStyle": "sunset gradient makeup", "eyelinerStyle": "double-wing eyeliner", "eyeshadowStyle": "gradient eyeshadow", "lashStyle": "long defined lashes", "lipFinish": "soft satin lips", "nailStyle": "long almond fingernails", "nailColor": "@primary", "heightStature": "slightly above-average height", "shoulderShape": "narrow shoulders", "bustSize": "large breasts", "waistShape": "extremely narrow waist", "stomachShape": "flat stomach", "hipShape": "wide, curvy hips", "buttSize": "full, round butt", "thighBuild": "thick, soft thighs", "legShape": "long shapely legs", "bodySoftness": "exaggerated hourglass figure", "posture": "hip-popped sultry stance", "nippleColor": "caramel brown", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "caramel brown", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "deep pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["off-shoulder silk blouse", "@secondary"], "bottom": ["high-waisted pencil skirt", "@third"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@third", null, "@primary"], "neckAccessory": ["delicate chain necklace", "@accent"], "earAccessory": ["chain-link ear cuffs", "@accent"], "tagCharm": ["fox crest brooch", "@accent"]}, "details": {"detailTwo": "peplum hem"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"peacockhead",name:"Peacock headmistress",blurb:"A tall, statuesque headmistress with a plum-and-purple ornamental updo shot with peacock blue and gold, multi-ring gold eyes, warm light-brown skin and a regal, disdainful gaze. A plum academic gown with gold facings and a trailing hem over a purple beaded halter top and peacock-blue satin wide-leg trousers, with eyed-feather trim, long velvet gloves, a jeweled choker and a peacock crest brooch.",pal:{"primary": "royal purple", "secondary": "peacock blue", "third": "plum", "accent": "metallic gold", "extra": "turquoise"},c:{"age": "mature woman", "faceShape": "elongated oval face with sculpted cheekbones", "expression": "regal, disdainful look", "browShape": "high arched brows", "noseShape": "refined straight nose", "impression": "an elegant, mature presence", "eyeConfig": "matching", "eyeShape": "almond-shaped, slightly hooded eyes", "pupilStyle": "round pupils", "irisDetail": "multi-ring iris pattern", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@accent", "hairStyle": "ornamental updo", "hairLength": "long", "hairTexture": "silky and smooth", "bangs": "open forehead", "hairBase": "@third", "hairUnderlayer": "@secondary", "hairInner": "@primary", "hairHighlights": "@accent", "skinTone": "warm light-brown", "undertone": "golden", "skinFinish": "natural skin texture with a warm, healthy glow", "markings": "no markings", "makeupStyle": "editorial makeup", "eyelinerStyle": "sharp winged eyeliner", "eyeshadowStyle": "duochrome eyeshadow", "lipFinish": "high-shine lips", "heightStature": "tall, statuesque stature", "bustSize": "full breasts", "waistShape": "small, clearly defined waist", "hipShape": "wide, beautifully rounded hips", "buttSize": "full, rounded butt with noticeable projection", "thighBuild": "long, full, shapely thighs", "legShape": "long legs tapering into slender lower legs", "bodySoftness": "tall, statuesque hourglass figure with long limbs and balanced curves", "posture": "tall, proud posture", "nippleColor": "light brown", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor": "light brown", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor": "deep pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["beaded halter top", "@primary"], "bottom": ["tailored satin wide-leg pants", "@secondary"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@third", null, "@accent"], "neckAccessory": ["jeweled choker", "@accent"], "gloves": ["long velvet gloves", "@primary"], "earAccessory": ["statement chandelier earrings", "@accent"], "tagCharm": ["peacock crest brooch", "@accent"]}, "details": {"detailOne": "eyed-feather trim", "detailTwo": "trailing back hem"}, "dcol": {}},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  {id:"flamingohead",name:"Flamingo headmistress",blurb:"A petite, enormously busty headmistress with a high half-up ponytail of hot-pink hair over a salmon underlayer with white highlights, golden-yellow eyes, porcelain skin with dense salmon freckles and a relaxed, sun-drenched smile. A white academic gown with hot-pink facings over a feather-trim camisole and salmon tiered chiffon midi skirt, with a feather hip plume, black velvet choker, chandelier earrings, lace corset, satin gloves, a sheer feather-trim lace bra and a flamingo crest brooch.",pal:{"primary": "hot pink", "secondary": "white", "third": "salmon", "accent": "black", "extra": "golden yellow"},c:{"age": "mature woman", "faceShape": "slim oval face with a tapered V-line chin", "expression": "relaxed, sun-drenched smile", "browShape": "high arched brows", "noseShape": "small straight nose", "mouthShape": "sensual full lips", "impression": "a glamorous, feminine appearance", "eyeConfig": "matching", "eyeShape": "wide-set, slightly upturned eyes", "pupilStyle": "round pupils", "irisDetail": "defined limbal ring", "lashNatural": "long, thick dark eyelashes", "eyeOne": "@extra", "hairStyle": "high half-up ponytail with a smooth crown, very long layers, soft waves and curled ends", "hairLength": "long", "hairTexture": "glossy", "bangs": "slightly side-parted with loose face-framing strands", "hairBase": "@primary", "hairUnderlayer": "@third", "hairInner": "@primary", "hairHighlights": "@secondary", "nailStyle": "long almond fingernails", "nailColor": "@primary", "nippleColor":"pale pink", "nippleType": "soft and rounded", "nippleLength": "medium-length", "areolaColor":"soft pink", "areolaType": "smooth", "areolaSize": "medium-sized", "vaginaColor":"soft pink", "vaginaType": "symmetrical", "pubicHair": "a neatly trimmed patch of pubic hair", "skinTone": "porcelain", "undertone": "cool", "skinFinish": "natural skin texture with a soft porcelain matte finish", "markings": "dense natural {c} freckles across the nose and cheeks, continuing over the neck, shoulders, collarbones, chest, arms, stomach, back, hips, thighs and legs", "bodyMarkings": "dense freckles cover the shoulders, chest, and back", "markingColor": "@third", "bustSize": "enormous, very full, round breasts", "bustShape": "gravity-defying round shape", "bustWeight": "heavy natural fullness", "heightStature": "petite stature", "shoulderShape": "narrow, gently rounded shoulders", "torsoShape": "compact torso", "armShape": "small, feminine hands", "waistShape": "clearly defined narrow waist", "stomachShape": "flat, smooth stomach", "hipShape": "hips that widen gently from a narrow waist", "buttSize": "round butt", "thighBuild": "proportionately fuller thighs", "legShape": "slender legs", "bodySoftness": "petite, slim build with soft feminine curves and a naturally slender hourglass shape", "posture": "soft poised posture", "makeupStyle": "coquette makeup", "eyelinerStyle": "soft eyeliner", "lashStyle": "soft fluttery lashes", "blushStyle": "rounded blush placement", "lipFinish": "glossy lips", "faceAccents": "soft under-eye highlight"},outfit:{"oname": "Headmistress robes", "look": "preppy", "items": {"top": ["feather-trim camisole", "@primary"], "bottom": ["tiered chiffon midi skirt", "@third"], "outerwear": ["long {c} academic gown with {c2} velvet facings", "@secondary", null, "@primary"], "neckAccessory": ["velvet ribbon choker", "@accent"], "waistAccessory": ["feather hip plume", "@primary"], "earAccessory": ["statement chandelier earrings", "@extra"], "tagCharm": ["flamingo crest brooch", "@accent"], "corset": ["lace corset", "auto"], "gloves": ["satin gloves", "auto"], "bra": ["sheer feather trimmed lace bra", "auto"]}, "details": {"detailTwo": "high-waisted fit"}, "dcol": {}, "showUnder": true},more:[{"oname": "Nude", "look": "", "items": {}, "details": {}, "dcol": {}}],out:{framing:"full body",must:MUST}},
  ];
  const BAD=[];
  TS.forEach(T=>{
    [T.outfit].concat(T.more).forEach(o=>Object.entries(o.items).forEach(([f,[v]])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===v))BAD.push(T.id+" "+f+": "+v)}));
    Object.entries(T.c).forEach(([f,v])=>{if(CHAR[f]&&CHAR[f].length&&!CHAR[f].some(x=>x[0]===v)&&!String(v).startsWith("@"))BAD.push(T.id+" c "+f+": "+v)});
  });
  if(BAD.length)throw new Error("headmistresses: "+BAD.join("; "));
  TS.forEach(T=>{if(!TEMPLATES.some(t=>t.id===T.id))TEMPLATES.push(T)});
  const ac=PRESET_GROUPS.start.findIndex(g=>g.label==="Academy");
  PRESET_GROUPS.start.splice(ac+1,0,{label:"Academy Headmistresses",keys:TS.map(t=>t.id)});
})();

/* ---- v113: "Academy Cheerleaders", one squad captain per house, built on each house's robes starting point ----
   Hair, face, skin and build come from the house's robes entry (fixes there carry over automatically).
   The cheer top and skirt are youth-coded to the safeguard, so these have no Nude outfit or intimate details. */
(function(){
  const INTIMATE=["nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","pubicHair"];
  const PLAYFUL=new Set(["fox","shark","wolf","dragon"]);
  /* house, top, skirt, socks, cheer hair (empty keeps the house hair) */
  const H=[
    ["griffin","@third","@secondary","@third","high ponytail"],
    ["badger","@third","@secondary","@third","low twin ponytails"],
    ["raven","@third","@secondary","@third","braided ponytail"],
    ["serpent","@third","@secondary","@third","wrapped ponytail"],
    ["wolf","@third","@secondary","@third",""],
    ["swan","@third","@secondary","@third",""],
    ["dragon","@primary","@extra","@primary",""],
    ["stag","@primary","@secondary","@third","high bun"],
    ["shark","@primary","@secondary","@third",""],
    ["penguin","@third","@primary","@secondary","high ponytail"],
    ["fox","@primary","@secondary","@third",""],
    ["peacock","@primary","@secondary","@third","half-up ponytail"],
    ["flamingo","@primary","@secondary","@third","bubble ponytail"]
  ];
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.add("Academy Cheerleaders",H.map(([h,top,skirt,socks,hair])=>{
    const c={expression:PLAYFUL.has(h)?"playful smile":"bright cheerful expression",posture:"poised dancer's posture"};
    if(hair)c.hairStyle=hair;
    const items={top:["fitted cheer crop top",top],bottom:["pleated cheer skirt",skirt],legwear:["over-the-knee athletic socks",socks],tagCharm:["small "+h+" crest badge","@accent"],
      headwear:h==="wolf"?["sweat-wicking headband","@accent"]:["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","@accent",null,"@primary"]};
    return{id:h+"cheer",base:h+"robes",name:cap(h)+" cheer",out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},drop:INTIMATE.concat(hair?["hairMovement"]:[]),c,more:[],tags:["cheerleader","cheer squad"],
      outfit:{oname:"Cheer uniform",look:"costume",items,details:{detailOne:"contrast piping and a bold varsity-style number",detailTwo:"athletic fit"},dcol:{}},
      blurb:T=>{const col=r=>T.pal[r.slice(1)];return`${cap(col(top))} cheer crop top, ${col(skirt)} pleated skirt and ${col(socks)} over-the-knee socks, with ${h==="wolf"?"a sweat-wicking headband":"oversized hair bows"} and a ${h} crest badge. Hair, face and build come from the ${cap(h)} robes.`}};
  }),{after:"Academy Headmistresses"});
})();

/* ---- v115: "Academy Swim Team", one swimmer per house, built on each house's robes starting point ----
   Face, skin, build and palette come from the house's robes entry. Swimwear leans sheer, wet and minimal. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  /* house, hair, skin finish, suit items, outer layer, finish details [one,two,three] */
  const W=[
    ["griffin","high ponytail","wet skin with water droplets",
      {top:["high-cut swimsuit with {c2} side stripes and a criss-cross strap front","@third",null,"@accent"]},
      ["sheer sarong cover-up","@secondary"],["sheer panel inserts","sheer panel at the hips","wet translucent finish"]],
    ["badger","low twin ponytails","wet, sweat-glistening skin",
      {top:["high-cut one-piece swimsuit with a plunging front","@primary"],bottom:null},
      ["sheer kimono cover-up","@third"],["sheer panel inserts","sheer panels over the chest","wet translucent finish"]],
    ["raven","braided ponytail","glistening oiled skin",
      {top:["triangle bikini top","@secondary"],bottom:["side-tie bikini bottoms with {c2} stripes","@secondary",null,"@accent"]},
      ["sheer {c} cape","@primary"],["string ties","sheer panel at the hips","wet, glistening spandex finish"]],
    ["serpent","wrapped ponytail","wet skin with water droplets",
      {top:["string halter top","@third"],bottom:["micro scaled string bottoms with a sheer flowing wrap","@third"]},
      null,["sheer panel inserts","sheer panels over the chest","wet translucent finish"]],
    ["wolf","low ponytail","wet, sweat-glistening skin",
      {top:["wet-look sheer tank","@secondary"],bottom:["high-cut bikini bottoms","@primary"]},
      null,["string ties","sheer panel at the hips","wet translucent finish"]],
    ["swan","high bun","dew-damp skin",
      {bra:["sheer draped bandeau","@primary"],bottom:["sheer sarong tied low on the hips","@primary"],panties:["sheer mesh panties","@primary"]},
      null,["sheer panel inserts","sheer panels over the chest","see-through mesh overlay"]],
    ["dragon","high ponytail","glistening oiled skin",
      {top:["string halter top","@primary"],bottom:["micro thong bikini bottoms","@secondary"]},
      ["sheer {c} cape","@extra"],["string ties","sheer panel at the hips","wet, glistening spandex finish"]],
    ["stag","high bun","wet skin with water droplets",
      {top:["knotted sarong halter top","@primary"],bottom:["sheer sarong tied low on the hips","@third"],panties:["sheer mesh thong","@primary"]},
      null,["sheer panel inserts","sheer panel at the hips","wet translucent finish"]],
    ["shark","side ponytail","wet, sweat-glistening skin",
      {top:["wet-look sheer tank","@primary"],bottom:["ultra-short high-cut spandex shorts","@secondary"]},
      null,["mesh panels","sheer panels over the chest","wet, glistening spandex finish"]],
    ["penguin","high ponytail","wet skin with water droplets",
      {top:["front-tie bikini top","@primary"],bottom:["high-waisted bikini bottoms","@third"]},
      ["sheer kimono cover-up","@accent"],["string ties","sheer panel at the hips","wet translucent finish"]],
    ["fox","half-up ponytail","sun-bronzed skin with a soft salt-water sheen",
      {top:["frilled halter bikini top with a front ribbon tie","@primary"],bottom:["frilled bikini bottoms","@secondary"]},
      null,["sheer panel inserts","sheer panel at the hips","wet translucent finish"]],
    ["peacock","braided bun","wet skin with water droplets",
      {top:["beaded carnival bikini top with feather accents","@primary"],bottom:["high-cut carnival bikini bottoms with feather trim","@primary"]},
      ["sheer kimono cover-up","@secondary"],["sheer panel inserts","sheer panels over the chest","sheer, glittering, iridescent finish"]],
    ["flamingo","high ponytail","glistening oiled skin",
      {top:["micro triangle bikini top","@primary"],bottom:["side-tie bikini bottoms with {c2} stripes","@primary",null,"@secondary"]},
      ["sheer sarong cover-up","@third"],["string ties","sheer panel at the hips","wet translucent finish"]]
  ];
  START.add("Academy Swim Team",W.map(([h,hair,skin,suit,outer,[d1,d2,d3]])=>{
    const items={};
    Object.entries(suit).forEach(([f,a])=>{if(a)items[f]=a});
    if(outer)items.outerwear=outer;
    return{id:h+"swim",base:h+"robes",name:cap(h)+" swim",
      out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},
      drop:["hairMovement"],c:{hairStyle:hair,skinFinish:skin,expression:"confident smile"},
      more:[],nude:true,tags:["swimsuit","swim team"],
      outfit:{oname:"Swimsuit",look:"swimwear",items,details:{detailOne:d1,detailTwo:d2,detailThree:d3},dcol:{}},
      blurb:T=>{const o=T.outfit.items;return`Wet, sheer swimwear in ${cap(h)} colors: ${Object.values(o).map(a=>a[0].replace(/\{c2?\}\s?/g,"")).slice(0,3).join(", ")}. Face, skin and build come from the ${cap(h)} robes.`}};
  }),{after:"Academy Cheerleaders"});
})();

/* ---- v116: "Academy Ballgowns", one formal ballgown per house, built on each house's robes starting point ----
   Face, skin and build come from the robes entry. Hair is dressed up, and each gown carries its house's silhouette. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  /* new catalog options (tier CUS = every outfit level) */
  [["top","off-shoulder velvet ballgown with a gold-embroidered bodice and a full sweeping skirt"],
   ["top","sweetheart satin ballgown with a tiered full skirt and a {c2} ribbon sash"],
   ["top","high-neck column gown with an open back, a sweeping train and {c2} beaded trim"],
   ["top","fitted mermaid gown with a plunging neckline, a scale-beaded bodice and a sweeping train"],
   ["top","structured gown with a high collar, a fitted waist and a floor-length skirt with a high slit"],
   ["top","strapless layered tulle ballgown with a sparkling bodice and a full floor-length skirt"],
   ["top","plunging gown with {c2} scale embroidery, a high thigh slit and a trailing hem"],
   ["top","velvet gown with a laced bodice, off-shoulder sleeves and {c2} leaf embroidery"],
   ["top","strapless gown with a sharp angular neckline and a flared fin-shaped train"],
   ["top","tuxedo-style gown with {c2} satin lapels, a plunging neckline and a flowing skirt"],
   ["top","off-shoulder silk gown with a fitted bodice and a sweeping skirt fading to {c2}"],
   ["top","halter ballgown with a plunging neckline, eyed-feather embroidery and a long trailing skirt"],
   ["top","sweetheart ballgown with tiered ruffled chiffon skirts and feather trim"],
   ["detailOne","delicate beaded embroidery"],["detailTwo","a floor-length trailing skirt"],
   ["detailThree","lustrous silk satin finish"],["detailThree","rich velvet finish"],["detailThree","glittering tulle overlay"]
  ].forEach(([f,v])=>START.item(f,v,"CUS","glam,costume"));
  ["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","peacock","flamingo"].forEach(h=>START.item("tagCharm",h+" crest brooch","CU","preppy,costume"));
  /* house, gown, gown colour, hair, gown second colour, extras {field:[item,colour]}, details [one,two,three] */
  const G=[
    ["griffin",0,"@third","ornamental updo","@accent",{headwear:["small jeweled tiara","@accent"],gloves:["long satin opera gloves","@secondary"],neckAccessory:["jeweled necklace","@accent"]},["delicate beaded embroidery","a floor-length trailing skirt","rich velvet finish"]],
    ["badger",1,"@primary","braided bun","@third",{headwear:["small jeweled tiara","@third"],gloves:["short satin gloves with a bow","@third"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["raven",2,"@primary","low bun","@accent",{headwear:["small jeweled tiara","@accent"],gloves:["long satin opera gloves","@secondary"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["serpent",3,"@third","twisted updo","@extra",{headwear:["small jeweled tiara","@extra"],gloves:["long satin opera gloves","@secondary"],neckAccessory:["diamond choker"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["wolf",4,"@primary","halo braid","@accent",{headwear:["slim {c} circlet","@accent"],outerwear:["long open cape with a stand-up collar","@secondary"],gloves:["satin gloves","@secondary"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["swan",5,"@primary","ballerina bun","@accent",{headwear:["small jeweled tiara","@accent"],gloves:["long satin opera gloves","@primary"],neckAccessory:["pearl strand"]},["delicate beaded embroidery","a floor-length trailing skirt","glittering tulle overlay"]],
    ["dragon",6,"@primary","high braided ponytail","@accent",{headwear:["crown","@accent"],outerwear:["long flowing cape","@extra"],gloves:["long velvet gloves","@extra"],neckAccessory:["jeweled collar necklace","@accent"]},["delicate beaded embroidery","a floor-length trailing skirt","rich velvet finish"]],
    ["stag",7,"@primary","crown braid","@accent",{headwear:["laurel leaf crown","@accent"],neckAccessory:["simple gemstone necklace","@accent"]},["delicate beaded embroidery","a floor-length trailing skirt","rich velvet finish"]],
    ["shark",8,"@primary","high bun","@secondary",{headwear:["small crystal crown","@third"],neckAccessory:["crystal choker"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["penguin",9,"@primary","beehive updo","@secondary",{headwear:["small jeweled tiara","@third"],gloves:["long satin opera gloves","@primary"],neckAccessory:["pearl choker"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["fox",10,"@primary","side fishtail braid","@secondary",{headwear:["slim {c} circlet","@accent"],gloves:["short satin gloves","@secondary"],neckAccessory:["statement necklace"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["peacock",11,"@primary","ornamental updo","@secondary",{headwear:["small jeweled tiara","@accent"],gloves:["long velvet gloves","@third"],neckAccessory:["jeweled collar necklace","@accent"]},["delicate beaded embroidery","a floor-length trailing skirt","lustrous silk satin finish"]],
    ["flamingo",12,"@primary","bridal updo","@third",{headwear:["small jeweled tiara","@extra"],gloves:["short lace gloves","@secondary"]},["delicate beaded embroidery","a floor-length trailing skirt","glittering tulle overlay"]]
  ];
  const GOWN=["off-shoulder velvet ballgown with a gold-embroidered bodice and a full sweeping skirt","sweetheart satin ballgown with a tiered full skirt and a {c2} ribbon sash","high-neck column gown with an open back, a sweeping train and {c2} beaded trim","fitted mermaid gown with a plunging neckline, a scale-beaded bodice and a sweeping train","structured gown with a high collar, a fitted waist and a floor-length skirt with a high slit","strapless layered tulle ballgown with a sparkling bodice and a full floor-length skirt","plunging gown with {c2} scale embroidery, a high thigh slit and a trailing hem","velvet gown with a laced bodice, off-shoulder sleeves and {c2} leaf embroidery","strapless gown with a sharp angular neckline and a flared fin-shaped train","tuxedo-style gown with {c2} satin lapels, a plunging neckline and a flowing skirt","off-shoulder silk gown with a fitted bodice and a sweeping skirt fading to {c2}","halter ballgown with a plunging neckline, eyed-feather embroidery and a long trailing skirt","sweetheart ballgown with tiered ruffled chiffon skirts and feather trim"];
  START.add("Academy Ballgowns",G.map(([h,gi,col,hair,c2,extra,[d1,d2,d3]])=>{
    const items={top:[GOWN[gi],col,null,c2]};
    Object.entries(extra).forEach(([f,a])=>{items[f]=a.length>1?[a[0],a[1]]:[a[0],"auto"]});
    return{id:h+"gown",base:h+"robes",name:cap(h)+" ballgown",
      out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},
      drop:["hairMovement"],c:{hairStyle:hair,posture:"elegant posture"},
      more:[],nude:true,tags:["ballgown","formal","regal"],
      outfit:{oname:"Ballgown",look:"glam",items,details:{detailOne:d1,detailThree:d3},dcol:{}},
      blurb:T=>{const g=GOWN[gi].replace(/\{c2\}/g,T.pal[c2.slice(1)]);return`A regal ${T.pal[col.slice(1)]} ${g}, with ${extra.headwear[0].replace(/\{c\}\s?/,"")} and ${extra.gloves?extra.gloves[0]:"a jeweled necklace"}. Hair is dressed up; face and build come from the ${cap(h)} robes.`}};
  }),{after:"Academy Swim Team"});
})();

/* ---- v117: "Academy Day Off", one off-duty girl per house, built on each house's robes starting point ----
   Face, skin, build and palette come from the robes entry. Loungewear is soft, slipping and revealing, with the
   cozy accessories girls only wear when nobody is watching (glasses, scrunchies, slipper socks, ears). */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  [["top","oversized soft cotton sleep tee","CUS"],
   ["top","oversized knit sweater slipping off one shoulder with a bare midriff","CUS"],
   ["top","cropped shark-fin hooded sweatshirt with the zipper pulled low","CUS"],
   ["top","oversized sleep shirt with a plunging collar, barely buttoned","LS"],
   ["legwear","fuzzy slipper socks","CU"],["legwear","fluffy thigh-high socks with pom-poms","CUS"],
   ["legwear","fuzzy ballet leg warmers","CU"],["legwear","cable-knit thigh-high socks","CUS"],
   ["headwear","pencil tucked into a messy bun","CU"],
   ["eyewear","pastel cat-eye glasses with a beaded chain","CUS"],
   ["eyewear","round tortoiseshell reading glasses perched low on the nose","CU"]
  ].forEach(([f,v,t])=>START.item(f,v,t,"casual,cottage,sweet"));
  /* house, items, hair (null keeps the house hair), expression, [cut and fit, material] */
  const D=[
    ["griffin",{top:["oversized open button-up shirt","@third"],panties:["satin panties","@secondary"],legwear:["cable-knit thigh-high socks","@accent"],eyewear:["round wire-frame glasses"],headwear:["pencil tucked into a messy bun"],wristAccessory:["scrunchie on the wrist","@accent"]},"messy bun","dreamy expression",["slouchy off-the-shoulder fit","soft brushed cotton"]],
    ["badger",{outerwear:["bear-ear fleece hoodie","@primary","slipping off one shoulder"],bra:["bow-trim bralette","@third"],panties:["bow-trim cotton panties","@primary"],legwear:["fluffy thigh-high socks with pom-poms","@accent"],eyewear:["round glasses"]},"twin braids","sleepy expression",["slouchy off-the-shoulder fit","soft fleece texture"]],
    ["raven",{outerwear:["open satin robe worn off the shoulders","@primary"],bra:["satin bra","@secondary"],panties:["satin panties","@secondary"],legwear:["sheer thigh-highs","@secondary"],eyewear:["blue-light glasses"],headwear:["silk sleep mask pushed up on the forehead","@accent"]},"low bun","sleepy expression",[null,"silk habotai"]],
    ["serpent",{top:["lace-trim satin slip top","@third"],outerwear:["sheer robe slipping off both shoulders","@secondary"],panties:["lace-trim high-cut panties","@secondary"],legwear:["lace-top thigh-high stockings","@secondary"],eyewear:["gothic lace-trim glasses"],wristAccessory:["delicate bracelet"]},"low ponytail","half-lidded sultry gaze",["delicate straps slipping off the shoulders","crushed satin"]],
    ["wolf",{top:["oversized off-shoulder band tee knotted at the hem","@primary"],panties:["boyshort panties","@secondary"],legwear:["slouchy socks","@third"],eyewear:["blue-light glasses"],headwear:["fuzzy wolf ear headband","@primary"],tailPiece:["fluffy wolf tail attached at the lower back"],wristAccessory:["hair tie on the wrist"]},"messy ponytail","candid half-smile",["slouchy off-the-shoulder fit","worn-in cotton"]],
    ["swan",{top:["satin cowl-neck camisole","@primary"],outerwear:["sheer lace robe","@secondary","slipping off one shoulder"],panties:["lace panties","@secondary"],legwear:["fuzzy ballet leg warmers","@third"],eyewear:["clear-lens round glasses"],headwear:["ribbon hair bow","@accent"]},"messy bun","dreamy expression",["delicate straps slipping off the shoulders","pearlescent satin"]],
    ["dragon",{top:["ribbed sweater with a {c2} collar and an underboob cutout","@primary",null,"@accent"],panties:["satin panties","@extra"],legwear:["thigh-high socks","@secondary"],eyewear:["oversized square glasses"],headwear:["small curved horn headband","@third"],wristAccessory:["scrunchie on the wrist","@accent"]},"messy ponytail","playful smile",["slouchy off-the-shoulder fit","soft fuzzy texture"]],
    ["stag",{top:["lace-trim camisole","@third"],outerwear:["cardigan slipping off both shoulders","@primary"],panties:["lace-trim panties","@secondary"],legwear:["cable-knit thigh-high socks","@third"],eyewear:["tortoiseshell glasses"],headwear:["antler headband with bells","@accent"]},null,"serene expression",["slouchy off-the-shoulder fit","chunky knit texture"]],
    ["shark",{top:["cropped shark-fin hooded sweatshirt with the zipper pulled low","@primary"],panties:["boyshort panties","@third"],legwear:["striped thigh-high socks","@secondary"],eyewear:["ski goggles on the forehead","@accent"],wristAccessory:["terry wristbands"]},"high side ponytail","mischievous expression",["zip half-open","soft jersey texture"]],
    ["penguin",{top:["silk pajama shirt","@primary","worn partially unbuttoned"],panties:["satin panties","@secondary"],legwear:["fluffy thigh-high socks with pom-poms","@secondary"],eyewear:["pastel-frame glasses","@third"],headwear:["knit earflap hat","@accent"]},null,"sleepy, cat-like contentment",["delicate straps slipping off the shoulders","silk habotai"]],
    ["fox",{top:["off-shoulder knit top","@secondary"],outerwear:["fluffy cardigan","@primary","slipping off one shoulder"],panties:["satin panties","@third"],legwear:["fuzzy slipper socks","@secondary"],eyewear:["round vintage glasses"],headwear:["fluffy fox ear headband","@primary"],tailPiece:["large bushy fox tail attached at the lower back"]},null,"sly, fox-like smirk",["slouchy off-the-shoulder fit","fuzzy mohair texture"]],
    ["peacock",{top:["feather-trim camisole","@third"],outerwear:["silk kimono robe","@primary","slipping off one shoulder"],panties:["satin panties","@third"],legwear:["sheer {c}-and-{c2} peacock feather stockings","@secondary",null,"@extra"],eyewear:["pastel cat-eye glasses with a beaded chain"],headwear:["beaded headband with a feather","@accent"]},"messy updo","half-lidded sultry gaze",["delicate straps slipping off the shoulders","silk habotai"]],
    ["flamingo",{top:["oversized soft cotton sleep tee","@secondary","slipping off one shoulder"],panties:["bow-trim cotton panties","@primary"],legwear:["frilly ankle socks","@secondary"],eyewear:["heart-shaped sunglasses","@primary","pushed up on the head"],headwear:["wide terry headband","@third"]},"messy ponytail","relaxed, sun-drenched smile",["slouchy off-the-shoulder fit","soft stretchy cotton"]]
  ];
  START.add("Academy Day Off",D.map(([h,items,hair,expr,[d2,d3]])=>{
    const c={expression:expr,posture:"relaxed posture"};
    if(hair)c.hairStyle=hair;
    return{id:h+"dayoff",base:h+"robes",name:cap(h)+" day off",
      out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},
      drop:(hair?["hairMovement"]:[]),c,more:[],nude:true,tags:["day off","loungewear","cozy"],
      outfit:{oname:"Day off",look:"casual",items,details:Object.assign({},d2?{detailTwo:d2}:{},{detailThree:d3}),dcol:{}},
      blurb:T=>{const n=v=>v.replace(/\{c\}-and-\{c2\}\s?/g,"").replace(/\{c2?\}\s?/g,"");const o=T.outfit.items;const k=["top","outerwear","bra"].find(f=>o[f]);
        return`Off duty in ${cap(h)} colors: ${n((o[k]||o.panties)[0])}, ${n(o.legwear[0])}, ${n(o.eyewear[0])} and ${n((o.headwear||o.wristAccessory||o.panties)[0])}. Face and build come from the ${cap(h)} robes.`}};
  }),{after:"Academy Ballgowns"});
})();

/* ---- v118: "Academy Pajama Day", one cozy, happy girl per house, built on each house's robes starting point ----
   Face, skin and build come from the robes entry. Full-coverage pajamas and animal onesies, a plush friend in her arms,
   and happy faces. Each keeps a Nude outfit and the intimate details from her robes entry. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  KIND_RULES.top.unshift(["dress",/onesie/]);
  const FAM="sweet,casual,cottage";
  [["top","soft flannel pajama top with a feather print"],
   ["top","satin pajama top with tiny stars and moons"],
   ["top","soft pajama top with a snake-scale print and a ruffled collar"],
   ["top","fluffy swan-white pajama top with a ruffled collar and feather trim"],
   ["top","cozy pajama top with a forest leaf print and a button front"],
   ["top","satin pajama top with a peacock feather print and ruffle cuffs"],
   ["top","soft pajama top with a flamingo print and ruffle trim"],
   ["top","fluffy badger-striped onesie with a hood and round ears"],
   ["top","fluffy wolf-ear hooded onesie with a bushy tail"],
   ["top","cozy dragon-scale hooded onesie with little horns and a tail"],
   ["top","fluffy shark hooded onesie with a fin and a tooth-trimmed hood"],
   ["top","fluffy penguin onesie with a white belly and a flipper-trimmed hood"],
   ["top","fluffy fox-eared hooded onesie with a bushy tail"],
   ["bottom","soft pajama pants with cuffed ankles"],
   ["legwear","fluffy paw slippers"],
   ["headwear","soft pom-pom nightcap"],
   ["headwear","star-print sleep mask pushed up on the forehead"],
   ["headwear","feather-trim sleep mask pushed up on the forehead"],
   ["heldItem","plush griffin toy"],["heldItem","plush badger toy"],["heldItem","plush raven toy"],["heldItem","plush snake toy"],
   ["heldItem","plush wolf toy"],["heldItem","plush swan toy"],["heldItem","plush dragon toy"],["heldItem","plush stag toy"],
   ["heldItem","plush shark toy"],["heldItem","plush penguin toy"],["heldItem","plush fox toy"],["heldItem","plush peacock toy"],
   ["heldItem","plush flamingo toy"],["heldItem","mug of hot cocoa with marshmallows"],["heldItem","storybook"],
   ["heldItem","fluffy pillow"],["heldItem","handheld game console"],["heldItem","plate of pancakes"]
  ].forEach(([f,v])=>START.item(f,v,"CU",FAM));
  /* house, items, hair, expression, [trim, material] */
  const P=[
    ["griffin",{top:["soft flannel pajama top with a feather print","@third"],bottom:["soft pajama pants with cuffed ankles","@primary"],legwear:["fuzzy slipper socks","@accent"],headwear:["soft pom-pom nightcap","@third"],eyewear:["round wire-frame glasses"],heldItem:["plush griffin toy","@accent","hugged tightly to her chest"]},"fluffy twin buns","bright cheerful expression",["contrast piping","brushed flannel"]],
    ["badger",{top:["fluffy badger-striped onesie with a hood and round ears","@primary"],legwear:["fluffy paw slippers","@secondary"],heldItem:["plush badger toy","@third","hugged tightly to her chest"]},"low twin ponytails","happy closed-eye smile",["pom-pom trim","soft fleece texture"]],
    ["raven",{top:["satin pajama top with tiny stars and moons","@primary"],bottom:["soft pajama pants with cuffed ankles","@third"],legwear:["fuzzy slipper socks","@accent"],eyewear:["round tortoiseshell reading glasses perched low on the nose"],heldItem:["storybook","@accent","in both hands"]},"twin braids","blushing shy smile",[null,"lustrous silk satin finish"]],
    ["serpent",{top:["soft pajama top with a snake-scale print and a ruffled collar","@third"],bottom:["soft pajama pants with cuffed ankles","@accent"],legwear:["fuzzy slipper socks","@secondary"],headwear:["soft pom-pom nightcap","@third"],heldItem:["plush snake toy","@third","hugged tightly to her chest"]},"half-up twin tails","playful smile",["ruffle trim","soft jersey texture"]],
    ["wolf",{top:["fluffy wolf-ear hooded onesie with a bushy tail","@primary"],legwear:["fluffy paw slippers","@secondary"],heldItem:["plush wolf toy","@third","tucked under one arm"]},"pigtails","sparkling-eyed excited expression",["paw-print trim","soft fleece texture"]],
    ["swan",{top:["fluffy swan-white pajama top with a ruffled collar and feather trim","@primary"],bottom:["soft pajama pants with cuffed ankles","@secondary"],legwear:["fuzzy slipper socks","@accent"],headwear:["ribbon hair bow","@accent"],heldItem:["plush swan toy","@primary","hugged tightly to her chest"]},"twin buns with ribbons","happy closed-eye smile",["satin bows","soft fluffy texture"]],
    ["dragon",{top:["cozy dragon-scale hooded onesie with little horns and a tail","@primary"],legwear:["fluffy paw slippers","@extra"],heldItem:["plush dragon toy","@accent","hugged tightly to her chest"]},"twintails","laughing expression",["{c} trim","soft fleece texture"]],
    ["stag",{top:["cozy pajama top with a forest leaf print and a button front","@third"],bottom:["soft pajama pants with cuffed ankles","@primary"],legwear:["fuzzy slipper socks","@secondary"],headwear:["antler headband with bells","@accent"],heldItem:["mug of hot cocoa with marshmallows","@accent","in both hands"]},null,"warm smile",["embroidered flowers","brushed flannel"]],
    ["shark",{top:["fluffy shark hooded onesie with a fin and a tooth-trimmed hood","@primary"],legwear:["fluffy paw slippers","@third"],heldItem:["plush shark toy","@accent","hugged tightly to her chest"]},"high twin ponytails","bubbly open-mouthed grin",["scalloped edge","soft fleece texture"]],
    ["penguin",{top:["fluffy penguin onesie with a white belly and a flipper-trimmed hood","@primary"],legwear:["fluffy paw slippers","@accent"],heldItem:["plush penguin toy","@third","hugged tightly to her chest"]},"fluffy twin buns","wide-eyed delighted expression",["pom-pom trim","soft fluffy texture"]],
    ["fox",{top:["fluffy fox-eared hooded onesie with a bushy tail","@primary"],legwear:["fluffy paw slippers","@secondary"],heldItem:["plush fox toy","@accent","hugged tightly to her chest"]},"half-up twin tails","playful smile",["paw-print trim","fuzzy mohair texture"]],
    ["peacock",{top:["satin pajama top with a peacock feather print and ruffle cuffs","@primary"],bottom:["soft pajama pants with cuffed ankles","@secondary"],legwear:["fuzzy slipper socks","@accent"],headwear:["feather-trim sleep mask pushed up on the forehead","@accent"],heldItem:["plush peacock toy","@extra","hugged tightly to her chest"]},"bubble braid","radiant, head-tilted smile",["ruffle trim","lustrous silk satin finish"]],
    ["flamingo",{top:["soft pajama top with a flamingo print and ruffle trim","@primary"],bottom:["soft pajama pants with cuffed ankles","@secondary"],legwear:["fuzzy slipper socks","@third"],headwear:["wide terry headband","@third"],heldItem:["plush flamingo toy","@primary","hugged tightly to her chest"]},"bubble ponytail","bubbly open-mouthed grin",["bow clusters","soft jersey texture"]]
  ];
  START.add("Academy Pajama Day",P.map(([h,items,hair,expr,[d1,d3]])=>({id:h+"pajama",base:h+"robes",name:cap(h)+" pajama day",
    out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},
    drop:["hairMovement"],c:{hairStyle:hair,expression:expr,posture:"light playful posture"},more:[],nude:true,tags:["pajamas","pajama day","cozy","cute"],
    outfit:{oname:"Pajamas",look:"sweet",items,details:Object.assign({},d1?{detailOne:d1}:{},{detailThree:d3}),dcol:{}},
    blurb:T=>{const n=v=>v.replace(/\{c2?\}\s?/g,"");const o=T.outfit.items;
      return`${cap(n(o.top[0]))}${o.bottom?", "+n(o.bottom[0]):""}, ${n(o.legwear[0])} and ${n(o.heldItem[0])} hugged close, in ${cap(h)} colors. Face and build come from the ${cap(h)} robes.`}})),{after:"Academy Day Off"});
})();

/* ---- v120: "Academy Bunny Girls", "Academy Monster Girls" and "Academy Summer Days" ----
   One per house in each set, all built on the house's robes entry (face, skin, build and palette carry over;
   fixes to a robes entry flow through). Each keeps a Nude outfit and the robes' intimate details. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const HOUSES=["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","peacock","flamingo"];
  const BUNNY=["plunging bunny leotard with griffin-wing embroidery and a cutaway waist","high-cut bunny leotard with a striped panel front and deep side cutouts","backless bunny leotard with a plunging neckline and sheer star-patterned panels","plunging bunny leotard with a scale-patterned bodice and open sides","high-cut bunny leotard with a fur-trimmed neckline and deep side cutouts","sheer-paneled bunny leotard with feather trim and a plunging neckline","plunging bunny leotard with scale embroidery and a keyhole cutout","plunging bunny leotard with leaf-vine lacing and open sides","high-cut bunny leotard with a jagged tooth-edged neckline and side cutouts","tuxedo-front bunny leotard with satin lapels and a plunging neckline","plunging bunny leotard with a fluffy chest ruff and deep side cutouts","halter bunny leotard with eyed-feather embroidery and a plunging neckline","ruffled-hip bunny leotard with feather trim and a plunging neckline"];
  const SUN=["short halter sundress with a deep V neckline, feather embroidery and a ruffled hem","low-cut gingham sundress with a sweetheart neckline, a bare back and tied shoulder straps","backless halter sundress with a plunging neckline and a short flowing star-print skirt","short tiered sundress with spaghetti straps, a plunging back and a scale-print ruffled hem","short halter sundress with a deep V neckline and side cutouts","sheer-paneled eyelet sundress with a plunging square neckline and a short flowing skirt","low-cut halter sundress with a high thigh slit, a flame-print hem and a bare back","short linen sundress with a laced plunging neckline, leaf embroidery and a ruffled hem","short backless halter sundress with a nautical stripe print and a plunging front","short polka-dot halter sundress with a sweetheart neckline, a bare back and a ruffled hem","short tiered sundress with a plunging V neckline, a tie-up back and a sunset-gradient hem","plunging tropical-print halter sundress with a bare back and a high thigh slit","short ruffled sundress with spaghetti straps, a low scooped back and feather trim"];
  BUNNY.forEach(v=>START.item("top",v,"L","boudoir,costume"));
  SUN.forEach(v=>START.item("top",v,"US","resort,sweet"));
  START.item("top","micro scaled halter bodysuit with a plunging neckline and open sides","L","costume,boudoir");
  START.item("legwear","sheer scaled thigh-high stockings","LS","costume,boudoir");
  START.item("headwear","small coiled snake hair clips","CU","costume");
  START.item("legwear","strappy flat sandals","CU","resort,casual");
  START.item("legwear","white tabi socks with wooden sandals","CU","costume");
  START.item("tailPiece","long scaled dragon tail attached at the lower back","S","costume");
  START.item("tailPiece","shark tail fin attached at the lower back","S","costume");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const DROP=[];  /* v127: nothing dropped for length now that V5 allows about 1471 tokens */
  const TRIM={};
  const ORDER=["top","bottom","outerwear","headwear","legwear","wingPiece","tailPiece"];
  const set=(label,after,idSuffix,nameSuffix,look,tags,rows,lead)=>START.add(label,rows.map(([h,items,expr,posture,details,theme,extraC])=>({
    id:h+idSuffix,base:h+"robes",name:cap(h)+" "+nameSuffix,out:{framing:"full body",must:MUST},drop:DROP.concat(TRIM[h+idSuffix]||[]),
    c:Object.assign({expression:expr,posture},extraC||{}),more:[],nude:true,tags,
    outfit:{oname:cap(nameSuffix),look,items,details:details||{},dcol:{}},
    blurb:T=>{const n=v=>v.replace(/\{c\}-and-\{c2\}\s?/g,"").replace(/\{c2?\}\s?/g,"");const o=T.outfit.items;
      const bits=ORDER.filter(f=>o[f]).slice(0,4).map(f=>n(o[f][0]));
      return`${cap(theme)} for ${cap(h)}: ${bits.join(", ")}. Face and build come from the ${cap(h)} robes.`}})),{after});
  const B=(i,leo,col,leg,legCol,ear,earCol,collar,exp,post,det,theme)=>[HOUSES[i],{top:[BUNNY[i],col],legwear:[leg,legCol],headwear:[ear,earCol],neckAccessory:["detached {c} collar with a bow tie",collar],wristAccessory:["wrist cuffs with a bow",collar],tailPiece:["fluffy bunny tail attached at the lower back"]},exp,post,det,"a bunny suit"];
  set("Academy Bunny Girls","Academy Pajama Day","bunny","bunny","glam",["bunny girl","bunny suit","playboy bunny"],[
    B(0,0,"@third","fishnet stockings","@secondary","tall upright bunny ear headband","@primary","@accent","seductive smile","hip-popped sultry stance",{detailOne:"feather trim",detailThree:"glossy satin finish"}),
    B(1,0,"@primary","sheer thigh-high stockings","@secondary","long floppy bunny ear headband","@accent","@third","teasing tongue-out expression","over-the-shoulder glance",{}),
    B(2,0,"@primary","sheer seamed thigh-high stockings","@secondary","tall upright bunny ear headband","@primary","@accent","half-lidded sultry gaze","hip-popped sultry stance",{detailThree:"glossy satin finish"}),
    B(3,0,"@third","fishnet stockings","@secondary","tall upright bunny ear headband","@primary","@extra","come-hither look","arched-back posture",{detailOne:"scale pattern",detailThree:"glossy satin finish"}),
    B(4,0,"@primary","fishnet thigh-high stockings","@secondary","tall upright bunny ear headband","@primary","@accent","smoldering sultry expression","hip-popped sultry stance",{detailThree:"glossy satin finish"}),
    B(5,0,"@primary","sheer thigh-high stockings","@primary","bunny-ear headband with a satin bow","@primary","@accent","seductive smile","over-the-shoulder glance",{detailOne:"feather trim",detailThree:"glossy satin finish"}),
    B(6,0,"@primary","fishnet stockings","@extra","tall upright bunny ear headband","@primary","@accent","half-lidded sultry gaze","arched-back posture",{detailOne:"dragon scale edge",detailThree:"glossy satin finish"}),
    B(7,0,"@primary","sheer thigh-high stockings","@third","long floppy bunny ear headband","@primary","@accent","biting her lip","hip-popped sultry stance",{detailOne:"leaf embroidery",detailThree:"glossy satin finish"}),
    B(8,0,"@primary","fishnet thigh-high stockings","@secondary","tall upright bunny ear headband","@primary","@accent","playful smile","hip-popped sultry stance",{detailThree:"glossy satin finish"}),
    B(9,0,"@primary","sheer seamed thigh-high stockings","@primary","tall upright bunny ear headband","@primary","@secondary","seductive smile","over-the-shoulder glance",{detailThree:"glossy satin finish"}),
    B(10,0,"@primary","fishnet stockings","@third","long floppy bunny ear headband","@primary","@secondary","teasing tongue-out expression","hip-popped sultry stance",{detailThree:"glossy satin finish"}),
    B(11,0,"@primary","sheer thigh-high stockings","@secondary","tall upright bunny ear headband","@primary","@accent","come-hither look","arched-back posture",{detailOne:"eyed-feather trim",detailThree:"glossy satin finish"}),
    B(12,0,"@primary","fishnet stockings","@secondary","long floppy bunny ear headband","@primary","@extra","bubbly open-mouthed grin","over-the-shoulder glance",{detailOne:"feather trim",detailThree:"glossy satin finish"})
  ]);
  set("Academy Monster Girls","Academy Bunny Girls","monster","monster","costume",["monster girl","halloween","costume"],[
    ["griffin",{top:["micro leather harness top with a plunging neckline","@primary"],bottom:["micro fur-trimmed leather loincloth skirt","@primary"],headwear:["feathered headband","@accent"],gloves:["clawed paw gloves","@accent"],wingPiece:["large feathered angel wings (costume)","@primary"],tailPiece:["curled cat tail attached at the lower back","@primary"]},"confident smile","wide-legged confident stance".replace("wide-legged confident stance","hip-popped sultry stance"),{detailThree:"buttery soft leather"},"a griffin costume",{fangClawStyle:"bird talons"}],
    ["badger",{top:["strategically wrapped bandage bandeau with open gaps","@primary"],bottom:["micro bandage wraps","@primary"],headwear:["round bear ear headband","@secondary"],legwear:["bandage-wrapped thighs with open gaps","@primary"],gloves:["bandage-wrapped fingers"],wristAccessory:["gauze bandage wraps"]},"blushing shy smile","over-the-shoulder glance",{},"a mummy costume"],
    ["raven",{top:["micro witch dress with a plunging laced front","@primary"],headwear:["tall pointed witch hat with a buckle band","@secondary"],outerwear:["sheer shadow cape slipping off both shoulders","@primary"],legwear:["thigh-high stockings with spiderweb lace","@accent"],neckAccessory:["bat pendant necklace","@accent"]},"half-lidded sultry gaze","hip-popped sultry stance",{},"a witch costume"],
    ["serpent",{top:["micro scaled halter bodysuit with a plunging neckline and open sides","@third"],headwear:["small coiled snake hair clips","@accent"],legwear:["sheer scaled thigh-high stockings","@secondary"],belt:["snake-chain belt","@extra"]},"come-hither look","arched-back posture",{detailThree:"snakeskin print"},"a gorgon costume",{fangClawStyle:"subtle fangs"}],
    ["wolf",{top:["micro fur-trimmed leather bikini top","@primary"],bottom:["micro fur-trimmed leather loincloth skirt","@secondary"],headwear:["fuzzy wolf ear headband","@primary"],gloves:["clawed furry gloves","@primary"],shoulderPiece:["fur shoulder pelt","@third"],tailPiece:["fluffy wolf tail attached at the lower back"]},"playful fanged grin","hip-popped sultry stance",{},"a werewolf costume",{fangClawStyle:"sharp fangs and small claws"}],
    ["swan",{top:["sheer micro ghost dress with a plunging neckline","@primary"],headwear:["cathedral-length veil","@primary"],legwear:["sheer thigh-high stockings","@primary"],wristAccessory:["metal cuffs joined by a chain","@extra"]},"dreamy expression","over-the-shoulder glance",{},"a ghost-bride costume"],
    ["dragon",{top:["micro flame-trim bodysuit with a plunging neckline","@primary"],headwear:["small curved horn headband","@accent"],gloves:["clawed paw gloves","@accent"],wingPiece:["large bat wings (costume)","@secondary"],tailPiece:["long scaled dragon tail attached at the lower back","@primary"]},"smoldering sultry expression","arched-back posture",{},"a dragon costume",{fangClawStyle:"dragonlike fangs and claws"}],
    ["stag",{top:["micro leaf-and-vine wrap bodysuit","@primary"],headwear:["small antler-style flower crown","@accent"],shoulderPiece:["mossy shoulder wrap slipping off","@extra"],legwear:["sandal-wrap leggings","@secondary"],wristAccessory:["flower bracelets"]},"serene expression","hip-popped sultry stance",{},"a dryad costume"],
    ["shark",{top:["tiny seashell bikini top","@third"],bottom:["micro scaled string bottoms with a sheer flowing wrap","@primary"],headwear:["pearl-and-coral hair crown"],legwear:["sheer {c}-and-{c2} shark skin stockings","@primary",null,"@secondary"],neckAccessory:["shell choker","@accent"],tailPiece:["shark tail fin attached at the lower back","@primary"]},"playful fanged grin","hip-popped sultry stance",{},"a sea-monster costume",{fangClawStyle:"sharp shark teeth"}],
    ["penguin",{top:["micro vampire dress with a plunging neckline to the navel","@primary"],outerwear:["long open cape with a stand-up collar","@primary"],legwear:["sheer thigh-high stockings","@primary"],gloves:["long satin opera gloves","@primary"],neckAccessory:["bat pendant necklace","@accent"]},"seductive smile","over-the-shoulder glance",{},"a vampire costume",{fangClawStyle:"small fangs"}],
    ["fox",{top:["micro wrapped haori-style top open to the navel","@primary"],bottom:["micro hakama-style skirt","@secondary"],headwear:["fluffy fox ear headband","@primary"],legwear:["white tabi socks with wooden sandals","@secondary"],tailPiece:["large bushy fox tail attached at the lower back"]},"sly, fox-like smirk","hip-popped sultry stance",{},"a kitsune costume",{fangClawStyle:"subtle fangs"}],
    ["peacock",{top:["micro petal bodysuit with a plunging neckline","@primary"],headwear:["feathered carnival headpiece","@accent"],eyewear:["jeweled masquerade eye mask","@accent"],legwear:["sheer {c}-and-{c2} peacock feather stockings","@secondary",null,"@extra"],wingPiece:["large translucent fairy wings (costume)","@secondary"]},"regal, disdainful look","arched-back posture",{},"a fae-queen costume"],
    ["flamingo",{top:["micro bat bodysuit with a plunging neckline","@primary"],headwear:["bat ear headband","@accent"],legwear:["fishnet stockings","@accent"],neckAccessory:["bat pendant necklace","@accent"],wingPiece:["small bat wings (costume)","@accent"]},"mischievous expression","over-the-shoulder glance",{},"a bat costume",{fangClawStyle:"small fangs"}]
  ]);
  const S_=(i,hat,hatCol,eye,eyeCol,exp,post,det,hatC2)=>[HOUSES[i],{top:[SUN[i],det.dress],headwear:hatC2?[hat,hatCol,null,hatC2]:[hat,hatCol],eyewear:[eye,eyeCol,"hanging from the neckline"],legwear:["strappy flat sandals",det.sandal]},exp,post,det.d,"a revealing sundress and hat"];
  set("Academy Summer Days","Academy Monster Girls","summer","summer day","resort",["summer","sundress","sun hat"],[
    S_(0,"wide-brim {c} sun hat with a {c2} laurel-leaf pin","@primary","cat-eye sunglasses","@secondary","radiant, head-tilted smile","light playful posture",{dress:"@third",sandal:"@accent",d:{detailThree:"floral print"}},"@accent"),
    S_(1,"straw hat","@third","heart-shaped sunglasses","@secondary","happy closed-eye smile","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailOne:"ribbon trim"}}),
    S_(2,"wide-brim sun hat","@secondary","oversized sunglasses","@primary","blushing shy smile","relaxed posture",{dress:"@primary",sandal:"@accent",d:{detailThree:"polka dots"}}),
    S_(3,"wide straw hat with a flower band","@primary","cat-eye sunglasses","@secondary","playful smile","hip-popped sultry stance",{dress:"@third",sandal:"@secondary",d:{detailOne:"ruffle trim"}}),
    S_(4,"bucket hat","@third","sunglasses","@secondary","laughing expression","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailTwo:"side stripes"}}),
    S_(5,"floppy straw hat with a flower","@secondary","heart-shaped sunglasses","@accent","warm smile","light playful posture",{dress:"@primary",sandal:"@accent",d:{detailOne:"embroidered flowers"}}),
    S_(6,"wide-brim sun hat","@extra","aviator sunglasses","@accent","confident smile","hip-popped sultry stance",{dress:"@primary",sandal:"@accent",d:{detailOne:"ruffle trim"}}),
    S_(7,"wide straw hat with a flower band","@third","tortoiseshell glasses","@primary","relaxed, sun-drenched smile","relaxed posture",{dress:"@primary",sandal:"@secondary",d:{detailOne:"embroidered flowers"}}),
    S_(8,"sun visor","@accent","sunglasses","@primary","bubbly open-mouthed grin","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailThree:"striped pattern"}}),
    S_(9,"straw hat","@accent","cat-eye sunglasses","@primary","wide-eyed delighted expression","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailThree:"polka dots"}}),
    S_(10,"straw hat","@accent","round vintage glasses","@secondary","playful smile","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailOne:"ruffle trim"}}),
    S_(11,"wide-brim sun hat","@accent","oversized round sunglasses","@secondary","radiant, head-tilted smile","hip-popped sultry stance",{dress:"@primary",sandal:"@accent",d:{detailThree:"floral print"}}),
    S_(12,"floppy straw hat with a flower","@third","heart-shaped sunglasses","@primary","bubbly open-mouthed grin","light playful posture",{dress:"@primary",sandal:"@secondary",d:{detailOne:"ruffle trim"}})
  ]);
})();

/* ---- v121: "Academy Date Night", one girl per house on a first date, built on each house's robes entry ----
   Face, skin, build and palette come from the robes entry. Each wears a date outfit that shows off her figure,
   with a flustered, shy look: deep blush, averted gaze, nervous hands. Each keeps a Nude outfit and the robes' intimate details. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("expression","flustered, blushing smile","Cute");
  START.option("expression","embarrassed, averted gaze","Cute");
  START.option("expression","nervous, fidgeting smile","Cute");
  START.option("posture","shy clasped-hands posture","Posture");
  START.option("posture","nervous hem-tugging posture","Posture");
  START.option("posture","shy hand-behind-back stance","Posture");
  START.option("posture","nervous hair-twirling posture","Posture");
  START.option("blushStyle","deep blush across the cheeks, nose and ears","Blush");
  const DRESS=["fitted wrap dress with a deep V neckline, a cinched waist and a high thigh slit",
    "off-shoulder sweetheart dress with a corset-laced front and a short ruffled skirt",
    "velvet off-shoulder mini dress with a plunging back and long sleeves",
    null,null,
    "sheer lace-overlay mini dress with a plunging neckline and an open back",
    "bodycon halter dress with a plunging neckline, side cutouts and a short hem",
    "short wrap dress with a laced plunging neckline and a high thigh slit",
    "mock-neck bodycon dress with midriff cutouts and a short hem",
    "off-shoulder satin mini dress with a sweetheart neckline and a bow at the bust",
    null,
    "halter dress with a deep plunging jeweled neckline, a bare back and a high thigh slit",
    "ruffled off-shoulder mini dress with a low back, a plunging bow-tied front and feather trim"];
  DRESS.filter(Boolean).forEach(v=>START.item("top",v,"US","glam,sweet"));
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const DROP=[];  /* v127: nothing dropped for length now that V5 allows about 1471 tokens */
  const TRIM={};
  const SHYBLUSH="deep blush across the cheeks, nose and ears";
  const ex={shy:"slightly shy expression",blush:"blushing shy smile",flus:"flustered, blushing smile",emb:"embarrassed, averted gaze"};
  const po={clasp:"shy clasped-hands posture",tug:"nervous hem-tugging posture",tuck:"shy hand-behind-back stance",twirl:"nervous hair-twirling posture"};
  /* house, dress item (index into DRESS or a catalog dress), items, expression, posture, theme */
  const D=[
    ["griffin",{top:[DRESS[0],"@third"],neckAccessory:["delicate chain necklace","@accent"],earAccessory:["delicate drop earrings","@accent"],hipAccessory:["mini clutch bag","@secondary"]},ex.shy,po.clasp,"a fitted red wrap dress"],
    ["badger",{top:[DRESS[1],"@primary"],outerwear:["cardigan slipping off both shoulders","@secondary"],neckAccessory:["heart pendant necklace","@accent"],legwear:["thigh-high socks with bows","@secondary"],hipAccessory:["heart-shaped crossbody bag","@accent"]},ex.flus,po.tug,"a sweetheart dress with a cardigan"],
    ["raven",{top:[DRESS[2],"@primary"],legwear:["sheer thigh-highs","@secondary"],neckAccessory:["velvet choker","@accent"],hipAccessory:["mini clutch bag","@secondary"]},ex.emb,po.twirl,"a velvet mini dress"],
    ["serpent",{top:["silk slip dress with a deep neckline","@third"],neckAccessory:["diamond choker"],earAccessory:["dangling crystal earrings"],hipAccessory:["mini clutch bag","@secondary"]},ex.blush,po.tuck,"an emerald silk slip dress"],
    ["wolf",{top:["fitted halter mini dress with a high side slit","@primary"],outerwear:["open cropped leather jacket slipping off both shoulders","@extra"],earAccessory:["small {c} hoop earrings","@accent"]},ex.emb,po.tug,"a halter dress under a leather jacket"],
    ["swan",{top:[DRESS[5],"@primary"],neckAccessory:["pearl strand"],earAccessory:["pearl drop earrings"],hipAccessory:["beaded evening bag","@accent"]},ex.blush,po.clasp,"a sheer lace mini dress"],
    ["dragon",{top:[DRESS[6],"@primary"],neckAccessory:["jeweled collar necklace","@accent"],earAccessory:["statement chandelier earrings","@accent"]},ex.flus,po.tuck,"a crimson bodycon halter dress"],
    ["stag",{top:[DRESS[7],"@primary"],neckAccessory:["simple gemstone necklace","@accent"],earAccessory:["long leaf-shaped earrings","@accent"],hipAccessory:["wicker basket bag"]},ex.blush,po.twirl,"a laced wrap dress"],
    ["shark",{top:[DRESS[8],"@accent"],outerwear:["cropped denim jacket","@primary"],earAccessory:["small shark tooth earrings"],hipAccessory:["belt bag","@secondary"]},ex.flus,po.tug,"a coral cutout dress and denim jacket"],
    ["penguin",{top:[DRESS[9],"@primary"],legwear:["sheer seamed thigh-high stockings","@primary"],neckAccessory:["pearl choker"],earAccessory:["pearl drop earrings"]},ex.emb,po.clasp,"a satin sweetheart mini dress"],
    ["fox",{top:["off-shoulder knit top","@secondary"],bottom:["ruffled mini skirt","@primary"],legwear:["thigh-high socks","@third"],neckAccessory:["delicate chain necklace","@accent"],earAccessory:["small {c} hoop earrings","@accent"]},ex.flus,po.twirl,"an off-shoulder knit top and ruffled mini skirt"],
    ["peacock",{top:[DRESS[11],"@primary"],earAccessory:["peacock feather earrings","@extra"],hipAccessory:["beaded evening bag","@accent"]},ex.emb,po.tuck,"a jeweled halter dress"],
    ["flamingo",{top:[DRESS[12],"@primary"],neckAccessory:["pearl-and-ribbon choker"],earAccessory:["heart earrings"],hipAccessory:["pastel heart-shaped bag","@third"]},ex.blush,po.tug,"a ruffled off-shoulder mini dress"]
  ];
  START.add("Academy Date Night",D.map(([h,items,expr,posture,theme])=>({id:h+"date",base:h+"robes",name:cap(h)+" date night",
    out:{framing:"full body",must:MUST},drop:DROP.concat(TRIM[h+"date"]||[]),c:{expression:expr,posture,blushStyle:SHYBLUSH},more:[],nude:true,tags:["date night","first date","shy","flustered"],
    outfit:{oname:"Date night",look:"glam",items,details:{},dcol:{}},
    blurb:T=>`${cap(theme)} for a first date, worn shy and flustered. Face and build come from the ${cap(h)} robes.`})),{after:"Academy Summer Days"});
})();

/* ---- v122: "Academy Sports Day", one lewd sports outfit per house, built on each house's robes entry ----
   Each house plays its own sport. Face, skin, build and palette come from the robes entry; each keeps a Nude outfit
   and the robes' intimate details. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const T={
    griffin:"micro fencing leotard unzipped to the navel with mesh-cutout sides and a crest emblem",
    badger:"micro cropped softball jersey unbuttoned to the navel and knotted under the bust",
    raven:"micro tennis dress with a plunging neckline, open sides and a razor-short pleated skirt",
    serpent:"micro rhythmic gymnastics leotard with a plunging neckline, sheer mesh panels and a high thong cut",
    wolf:"micro boxing sports bra with a plunging neckline and cutout straps",
    dragon:"micro track crop top with a plunging neckline and a racerback cutout",
    stag:"micro archery vest with a plunging laced neckline and a bare midriff",
    shark:"micro volleyball crop top with a deep plunging neckline and an underboob cutout",
    penguin:"micro hockey jersey unlaced to the navel and slipping off one shoulder",
    fox:"micro cropped basketball jersey with a deep plunging neckline and side cutouts",
    peacock:"micro sparkly dance leotard with a plunging neckline, feather trim and mesh cutouts",
    flamingo:"micro yoga crop top with a plunging neckline, a bare back and an underboob cutout"};
  Object.values(T).forEach(v=>START.item("top",v,"L","sporty,boudoir"));
  START.item("bottom","high-waisted sheer-panel yoga leggings with side cutouts","L","sporty,boudoir");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const DROP=[];  /* v127: nothing dropped for length now that V5 allows about 1471 tokens */
  const TRIM={};
  const SKIN="wet, sweat-glistening skin",BLUSH="flushed cheeks and chest";
  /* house, sport, items, expression, posture */
  const R=[
    ["griffin","fencing",{top:[T.griffin,"@third"],gloves:["short fencing glove","@secondary"],legwear:["knee-high athletic socks","@accent"]},"determined expression","leaning forward posture"],
    ["badger","softball",{top:[T.badger,"@primary"],bottom:["micro high-waisted shorts","@secondary"],headwear:["baseball cap","@primary"],legwear:["over-the-knee athletic socks","@third"],wristAccessory:["sweatband","@accent"]},"bubbly open-mouthed grin","light playful posture"],
    ["raven","tennis",{top:[T.raven,"@primary"],headwear:["visor cap","@accent"],legwear:["knee-high athletic socks","@accent"],wristAccessory:["sweatbands","@secondary"]},"cool aloof expression","hip-popped sultry stance"],
    ["serpent","rhythmic gymnastics",{top:[T.serpent,"@third"],headwear:["hair ribbon","@accent"],wristAccessory:["satin ribbon wrist bows","@accent"]},"seductive smile","arched-back posture"],
    ["wolf","boxing",{top:[T.wolf,"@primary"],bottom:["micro satin boxing shorts","@secondary"],gloves:["boxing gloves","@third"]},"playful fanged grin","relaxed, weight-shifted stance"],
    ["swan","figure skating",{top:["micro sparkly skating bodysuit with a plunging neckline and mesh cutouts","@primary"],legwear:["glitter tights","@accent"]},"serene expression","poised dancer's posture"],
    ["dragon","track",{top:[T.dragon,"@primary"],bottom:["micro racing shorts","@secondary"],headwear:["sports headband","@accent"],wristAccessory:["athletic wristband","@accent"]},"confident smile","hip-popped sultry stance"],
    ["stag","archery",{top:[T.stag,"@primary"],bottom:["micro pleated skirt","@secondary"],shoulderPiece:["single leather pauldron","@secondary"],gloves:["fingerless training gloves","@accent"],hipAccessory:["small quiver at the hip"]},"calm expression","graceful upright posture"],
    ["shark","volleyball",{top:[T.shark,"@primary"],bottom:["low-rise spandex volleyball shorts","@secondary"],kneeAccessory:["padded volleyball knee pads","@third"],headwear:["sports headband","@accent"]},"mischievous expression","leaning forward posture"],
    ["penguin","ice hockey",{top:[T.penguin,"@primary"],bottom:["ultra-short high-cut spandex shorts","@secondary"],legwear:["thigh-high sport socks","@third"]},"smirk","hip-popped sultry stance"],
    ["fox","basketball",{top:[T.fox,"@primary"],bottom:["micro high-waisted shorts","@secondary"],legwear:["knee-high athletic socks","@third"],wristAccessory:["sweatbands","@accent"]},"sly, fox-like smirk","relaxed, weight-shifted stance"],
    ["peacock","dance",{top:[T.peacock,"@primary"],legwear:["sheer {c}-and-{c2} peacock feather stockings","@secondary",null,"@extra"],headwear:["beaded headband with a feather","@accent"]},"radiant, head-tilted smile","arched-back posture"],
    ["flamingo","yoga",{top:[T.flamingo,"@primary"],bottom:["high-waisted sheer-panel yoga leggings with side cutouts","@secondary"],wristAccessory:["scrunchie on the wrist","@third"]},"relaxed, sun-drenched smile","over-the-shoulder glance"]
  ];
  START.add("Academy Sports Day",R.map(([h,sport,items,expr,posture])=>({id:h+"sports",base:h+"robes",name:cap(h)+" sports day",
    out:{framing:"full body",must:MUST},drop:DROP.concat(TRIM[h+"sports"]||[]),c:{expression:expr,posture,skinFinish:SKIN,blushStyle:BLUSH},more:[],nude:true,tags:["sports day","gym","athlete",sport],
    outfit:{oname:cap(sport),look:"sporty",items,details:{detailThree:"wet, sweat-glistening look"},dcol:{}},
    blurb:T2=>{const n=v=>v.replace(/\{c\}-and-\{c2\}\s?/g,"").replace(/\{c2?\}\s?/g,"");const o=T2.outfit.items;
      const bits=["top","bottom","headwear","legwear","gloves"].filter(f=>o[f]).slice(0,3).map(f=>n(o[f][0]));
      return`${cap(sport)} for ${cap(h)}, sweat-slick and barely covered: ${bits.join(", ")}. Face and build come from the ${cap(h)} robes.`}})),{after:"Academy Date Night"});
})();


/* ---- v122: "Academy First Time", one girl per house moments before her first time, built on each house's robes entry ----
   Nervous but lustful: flushed skin, glossy lips, erect nipples and an aroused vagina, wearing only stockings, a garter
   and a choker. The intimate detail fields are on show in the first outfit (nothing covers them), with an "Undressing" outfit
   in lingerie and an open robe, and a Nude outfit. Adult only: age is set to "woman". */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("expression","nervous, lust-clouded gaze","Sultry (adult)");
  START.option("expression","shy, breathless smile with parted lips","Sultry (adult)");
  START.option("posture","sitting on the edge of the bed with her knees pressed together","Sultry (adult)");
  START.option("posture","lying back on the bed, trembling with anticipation","Sultry (adult)");
  START.option("posture","kneeling on the bed, one hand over her racing heart","Sultry (adult)");
  START.option("vaginaType","flushed and glistening with arousal","");
  START.option("nippleType","hard and flushed with arousal","");
  START.option("areolaType","puffy and flushed with arousal","");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const DROP=[];  /* v127: nothing dropped for length now that V5 allows about 1471 tokens */
  const TRIM={};
  const ex={nerv:"nervous, lust-clouded gaze",shy:"shy, breathless smile with parted lips",breath:"breathless, flushed expression",bite:"biting her lip",aro:"aroused, parted-lip expression",lust:"lustful expression"};
  const po={sit:"sitting on the edge of the bed with her knees pressed together",lie:"lying back on the bed, trembling with anticipation",kneel:"kneeling on the bed, one hand over her racing heart"};
  /* house, stockings, thigh piece, neck, lingerie [bra,panties,outerwear], expression, posture */
  const F=[
    ["griffin",["lace-top thigh-high stockings","@secondary"],["satin thigh garters with tiny bows","@third"],["velvet ribbon choker","@accent"],[["lace balconette bra","@third"],["lace-trim high-cut panties","@third"],["open satin robe worn off the shoulders","@secondary"]],ex.bite,po.sit],
    ["badger",["thigh-high socks with bows","@accent"],["lace thigh band","@third"],["ribbon choker","@primary"],[["sheer lace bra","@primary"],["lace panties","@primary"],["cardigan slipping off both shoulders","@secondary"]],ex.nerv,po.kneel],
    ["raven",["sheer seamed thigh-high stockings","@secondary"],["velvet thigh ribbon with a small charm","@accent"],["velvet choker","@accent"],[["satin bra","@primary"],["satin panties","@primary"],["sheer lace robe","@accent"]],ex.breath,po.lie],
    ["serpent",["lace garter stockings","@secondary"],["ribbon-laced thigh garters","@third"],["diamond choker"],[["sheer lace plunge bra","@third"],["sheer lace thong","@third"],["sheer robe slipping off both shoulders","@secondary"]],ex.aro,po.sit],
    ["wolf",["fishnet thigh-high stockings","@secondary"],["stacked elastic thigh bands","@primary"],["thin choker","@accent"],[["lace bra","@primary"],["high-cut lace panties","@secondary"],["open cropped leather jacket slipping off both shoulders","@extra"]],ex.lust,po.kneel],
    ["swan",["sheer thigh-high stockings","@primary"],["pearl thigh chain","@accent"],["pearl strand"],[["sheer lace balconette bra","@primary"],["sheer lace thong","@primary"],["sheer lace robe","@secondary"]],ex.shy,po.sit],
    ["dragon",["thigh-high stockings with {c2} garters","@primary",null,"@accent"],null,["velvet choker","@accent"],[["satin bra","@primary"],["high-cut lace panties","@primary"],["open satin robe worn off the shoulders","@extra"]],ex.bite,po.lie],
    ["stag",["lace-top thigh-high stockings","@third"],["lace thigh band","@primary"],["simple gemstone necklace","@accent"],[["lace bralette","@third"],["lace-trim panties","@third"],["cardigan slipping off both shoulders","@primary"]],ex.nerv,po.sit],
    ["shark",["thigh-high stockings","@secondary"],["elastic garter band","@accent"],["crystal choker"],[["triangle bikini bra","@accent"],["bikini bottoms","@accent"],["open satin robe worn off the shoulders","@third"]],ex.shy,po.kneel],
    ["penguin",["sheer seamed thigh-high stockings","@primary"],["satin thigh garters with tiny bows","@secondary"],["pearl choker"],[["satin bra","@primary"],["satin panties","@primary"],["open tuxedo jacket worn over bare shoulders","@primary"]],ex.breath,po.lie],
    ["fox",["thigh-high stockings","@third"],["velvet thigh ribbon with a small charm","@accent"],["delicate chain necklace","@accent"],[["lace bra","@primary"],["lace panties","@primary"],["satin robe with lace trim","@secondary","slipping off one shoulder"]],ex.aro,po.kneel],
    ["peacock",["sheer seamed thigh-high stockings","@primary"],["pearl thigh chain","@accent"],["jeweled collar necklace","@accent"],[["sheer feather trimmed lace bra","@primary"],["sheer lace thong","@primary"],["silk kimono robe","@secondary","slipping off one shoulder"]],ex.lust,po.sit],
    ["flamingo",["thigh-high socks with bows","@secondary"],["satin thigh garters with tiny bows","@primary"],["pearl-and-ribbon choker"],[["lace bralette","@primary"],["lace panties","@primary"],["cardigan slipping off both shoulders","@secondary"]],ex.shy,po.lie]
  ];
  START.add("Academy First Time",F.map(([h,leg,thigh,neck,[bra,pan,out],expr,posture])=>{
    const first={legwear:leg,neckAccessory:neck};if(thigh)first.thighAccessory=thigh;
    return{id:h+"first",base:h+"robes",name:cap(h)+" first time",
      out:{framing:"full body",must:MUST},drop:DROP.concat(TRIM[h+"first"]||[]),
      c:{age:"woman",expression:expr,posture,skinFinish:"dewy flushed skin",blushStyle:"flushed from cheeks to collarbones",lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},
      more:[{oname:"Undressing",look:"boudoir",items:{bra,panties:pan,outerwear:out,legwear:leg,neckAccessory:neck},details:{detailTwo:"delicate straps slipping off the shoulders"},dcol:{}}],nude:true,tags:["first time","nervous","aroused","bedroom"],
      outfit:{oname:"First time",look:"boudoir",items:first,details:{},dcol:{}},
      blurb:T=>`Moments before her first time: ${cap(h)} ${cap(T.pal.primary)} palette, flushed and trembling on the bed in only stockings and a choker, nervous but wanting it. Intimate details on show, plus Undressing and Nude outfits. Face and build come from the ${cap(h)} robes.`};
  }),{after:"Academy Sports Day"});
})();


/* ---- v122: eight more Seaside girls: varied builds, skin tones, hair and swimwear, each with a Nude outfit and intimate details ---- */
(function(){
  const I=k=>INTIMATE_PRESETS[k].v;
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const G=[
    {id:"seasurfer",name:"Surfer girl",blurb:"Sun-bleached honey-blonde waves, an athletic tanned build, teal eyes, a sporty triangle bikini and a surf-wax grin.",
     pal:{primary:"honey blonde",secondary:"coral",third:"white",accent:"teal"},
     use:{body:"swimmer",face:"playful",eyes:"almond",makeup:"dewy",skin:"sunKissed"},
     c:{age:"young woman",eyeConfig:"matching",eyeOne:"teal",eyeTwo:"teal",hairStyle:"long wavy hair",hairLength:"mid-back length",hairTexture:"salt-tousled waves",bangs:"curtain bangs",hairBase:"@primary",hairHighlights:"@third",hairBlend:"sun-bleached ends fading from the darker roots",posture:"relaxed, weight-shifted stance",expression:"playful smile",..._i("softNatural")},
     items:{top:["triangle bikini top","@secondary"],bottom:["side-tie bikini bottoms","@secondary"],neckAccessory:["shell necklace"],legwear:["beaded anklet","@accent"]}},
    {id:"seapearl",name:"Pearl diver",blurb:"Aqua twintails, pearl accents on her cheeks, freckles, a tiny seashell bikini and a shell necklace.",
     pal:{primary:"aqua",secondary:"pearl white",third:"coral pink",accent:"seafoam green"},
     use:{body:"petiteCurved",face:"bright",eyes:"sparkling",makeup:"cute",skin:"freckledFair"},
     c:{age:"young woman",eyeConfig:"matching",eyeOne:"turquoise",eyeTwo:"turquoise",hairStyle:"twintails",hairLength:"waist-length",hairTexture:"silky and smooth",bangs:"soft curtain bangs",hairBase:"@primary",hairHighlights:"@accent",hairBlend:"a seamless ombre between the colors",markings:"pearls across the cheeks",posture:"soft poised posture",..._i("petitePale")},
     items:{top:["tiny seashell bikini top","@secondary"],bottom:["micro string bikini bottoms","@third"],neckAccessory:["shell necklace"],tagCharm:["shell hair pin"],legwear:["beaded anklet","@accent"]}},
    {id:"sealifeguard",name:"Lifeguard",blurb:"A strong, curvy redhead with a high ponytail, freckles and a high-cut red lifeguard swimsuit, a whistle-ready smirk and mirrored sunglasses.",
     pal:{primary:"auburn red",secondary:"red",third:"white",accent:"gold"},
     use:{body:"strongCurvy",face:"fierce",eyes:"upturned",makeup:"natural",skin:"peachesCream"},
     c:{age:"woman",eyeConfig:"matching",eyeOne:"hazel",eyeTwo:"hazel",hairStyle:"high ponytail",hairLength:"waist-length",hairTexture:"thick, glossy waves",bangs:"long face-framing pieces",hairBase:"@primary",markings:"freckles across the nose and cheeks, continuing over the neck, shoulders and collarbones",expression:"smirk",posture:"relaxed, weight-shifted stance",..._i("fullPuffy")},
     items:{top:["high-cut lifeguard swimsuit with a {c2} cross-and-heart emblem","@secondary",null,"@third"],eyewear:["mirrored sunglasses","@accent"],wristAccessory:["straw-tied cuffs"]}},
    {id:"seagoldbikini",name:"Golden glam",blurb:"A deep-skinned bombshell with golden twist-out curls, amber eyes, a gold micro triangle bikini and a sheer sarong low on her hips.",
     pal:{primary:"golden brown",secondary:"gold",third:"cream",accent:"bronze"},
     use:{body:"hourglassWide",face:"seductive",eyes:"bedroom",makeup:"glam",skin:"richBrown"},
     c:{age:"woman",eyeConfig:"matching",eyeOne:"amber",eyeTwo:"amber",hairStyle:"twist-out curls",hairLength:"shoulder-length",hairTexture:"voluminous",bangs:"open forehead",hairBase:"@primary",hairHighlights:"@secondary",hairBlend:"subtle natural highlights",posture:"hip-popped sultry stance",..._i("deepRich")},
     items:{top:["micro triangle bikini top","@secondary"],bottom:["micro thong bikini bottoms","@secondary"],outerwear:["sheer sarong cover-up","@third"],eyewear:["oversized sunglasses","@accent"],neckAccessory:["fresh flower lei","@third"]}},
    {id:"seamoonlit",name:"Moonlit swimmer",blurb:"Silver hair, porcelain skin and violet eyes in a black plunging one-piece, under a wide-brim black sun hat.",
     pal:{primary:"silver",secondary:"black",third:"violet",accent:"silver"},
     use:{body:"willowy",face:"elegant",eyes:"celestial",makeup:"dark",skin:"moonPearl"},
     c:{age:"woman",eyeConfig:"matching",eyeOne:"violet",eyeTwo:"violet",hairStyle:"long straight hair",hairLength:"hip-length",hairTexture:"sleek",bangs:"hime bangs",hairBase:"@primary",posture:"soft poised posture",expression:"cool aloof expression",..._i("shyInverted")},
     items:{top:["high-cut one-piece swimsuit with a plunging front","@secondary"],headwear:["wide-brim sun hat","@secondary"],neckAccessory:["shell choker","@accent"],eyewear:["cat-eye sunglasses","@secondary"]}},
    {id:"seacrochet",name:"Crochet cutie",blurb:"A petite, soft girl with a pink bob and a flushed blush, in a crochet halter top, string bottoms and a loose crochet cardigan.",
     pal:{primary:"bubblegum pink",secondary:"cream",third:"peach",accent:"rose"},
     use:{body:"petiteSoft",face:"shy",eyes:"doe",makeup:"sweet",skin:"fairRosy"},
     c:{age:"young woman",eyeConfig:"matching",eyeOne:"rose pink",eyeTwo:"rose pink",hairStyle:"blunt bob",hairLength:"chin-length",hairTexture:"glossy",bangs:"wispy bangs",hairBase:"@primary",posture:"shy clasped-hands posture",expression:"blushing shy smile",..._i("softNatural")},
     items:{top:["crochet halter top","@secondary"],bottom:["string bikini bottoms","@third"],outerwear:["crochet beach cardigan","@secondary","hanging off the shoulders"],hipAccessory:["straw beach bag","@third"]}},
    {id:"seasunset",name:"Sunset siren",blurb:"A tall, curvy caramel-skinned beauty with long black waves, brown-gold eyes, a red micro string bikini and a batik pareo.",
     pal:{primary:"black",secondary:"scarlet red",third:"orange",accent:"gold"},
     use:{body:"bottomHeavy",face:"lustful",eyes:"heavylid",makeup:"lewdglam",skin:"caramel"},
     c:{age:"woman",eyeConfig:"matching",eyeOne:"golden brown",eyeTwo:"golden brown",hairStyle:"long wavy hair",hairLength:"waist-length",hairTexture:"thick, glossy waves",bangs:"center-parted front pieces",hairBase:"@primary",posture:"hip-popped sultry stance",..._i("warmBrown")},
     items:{top:["micro string bikini top","@secondary"],bottom:["micro thong bikini bottoms","@secondary"],legwear:["beaded anklet","@accent"],waistAccessory:["sarong tied at the hips","@third"],headwear:["floppy straw hat with a flower","@third"]}},
    {id:"seastatuesque",name:"Statuesque blonde",blurb:"A tall platinum blonde with a sleek low bun, grey-blue eyes, a knotted white sarong halter top and wet-look bike shorts that cling.",
     pal:{primary:"platinum blonde",secondary:"pale blue",third:"white",accent:"silver"},
     use:{body:"statuesque",face:"cool",eyes:"sleepy",makeup:"editorial",skin:"porcelain"},
     c:{age:"woman",eyeConfig:"matching",eyeOne:"grey-blue",eyeTwo:"grey-blue",hairStyle:"low bun",hairLength:"long",hairTexture:"sleek",bangs:"neat center part",hairBase:"@primary",posture:"soft poised posture",expression:"cool aloof expression",..._i("longProminent")},
     items:{top:["knotted sarong halter top","@secondary"],bottom:["wet-look bike shorts","@third"],eyewear:["aviator sunglasses","@accent"],neckAccessory:["shell choker","@accent"]}}
  ];
  function _i(k){return INTIMATE_PRESETS[k].v}
  START.add("Seaside",G.map(g=>({id:g.id,name:g.name,blurb:g.blurb,pal:g.pal,use:g.use,c:g.c,
    outfit:{oname:"Beach",look:"resort",items:g.items,details:{},dcol:{}},nude:true,
    out:{must:MUST}})));
})();

/* ---- v123: shared helper for Academy sets (v151: ACAD.robes(h) names the base a house's set girls are built on) ----
   ACAD.set(label, after, idSuffix, nameSuffix, look, cfg, rows) registers one girl per house, built on the house's
   robes entry (or cfg.base, e.g. "head" for the headmistresses). Face, skin, build, palette and intimate
   details carry over, so fixes to the base entry flow through.
   cfg:  {tags, oname, c, details, drop, trim:{house:[fields]}, use, framing, must, nude(default true), base}
   row:  [house, items, expression, posture, theme, {c, d, more:[{oname, look, items, details}], drop, use}] */
const ACAD=(()=>{
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const HOUSES=["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","peacock","flamingo"];
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const DROP=[];   /* v127: nothing is dropped for length (V5 allows about 1471 tokens) */
  /* v151: set girls are built on the robes entry, except Crow, whose sets use the hidden "crowbody" base (grown-up face and makeup) */
  const BASES={crow:"crowbody"};
  const robes=h=>BASES[h]||h+"robes";
  const ORDER=["top","corset","bra","bottom","panties","outerwear","headwear","legwear","gloves","heldItem","wingPiece","tailPiece","neckAccessory"];
  const strip=v=>v.replace(/\{c\}-and-\{c2\}\s?/g,"").replace(/\{c2?\}[- ]?/g,"").replace(/\s+/g," ").trim();
  const items=(f,list,t,fam)=>list.forEach(v=>v&&START.item(f,v,t,fam));
  const opts=(f,list,g)=>list.forEach(v=>START.option(f,v,g));
  /* held items and the pencil-in-bun default to no colour ("-") unless a colour is given */
  const NOCOL=["heldItem"];
  const fixItems=it=>{const o={};Object.entries(it||{}).forEach(([f,a])=>{if(a==null)return;o[f]=(NOCOL.includes(f)&&a.length===1)?[a[0],"-"]:a});return o};
  function set(label,after,suf,nameSuf,look,cfg,rows){
    cfg=Object.assign({look},cfg||{});
    START.add(label,rows.map(([h,it,ex,po,th,o])=>{
      const x=o||{},id=h+suf;
      const e={id,base:cfg.base?h+cfg.base:robes(h),name:cap(h)+" "+nameSuf,
        out:{framing:cfg.framing||"full body",must:cfg.must||MUST},
        drop:DROP.concat(cfg.drop||[],(cfg.trim||{})[h]||[],x.drop||[],(x.c&&x.c.hairStyle)||(cfg.c&&cfg.c.hairStyle)?["hairMovement"]:[]),
        c:Object.assign({},cfg.c||{},{expression:ex,posture:po},x.c||{}),
        more:(x.more||[]).map(m=>({oname:m.oname,look:m.look||cfg.look,items:fixItems(m.items),details:m.details||{},dcol:{}})),
        nude:cfg.nude!==false,tags:cfg.tags,
        outfit:{oname:cfg.oname||cap(nameSuf),look:cfg.look,items:fixItems(it),details:Object.assign({},cfg.details||{},x.d||{}),dcol:{}},
        blurb:T=>{const o=T.outfit.items;const bits=ORDER.filter(f=>o[f]).slice(0,4).map(f=>strip(o[f][0]));
          return`${cap(th)} for ${cap(h)}: ${bits.join(", ")}. Face and build come from the ${cap(h)} ${cfg.base==="head"?"headmistress":"robes"}.`}};
      const use=Object.assign({},cfg.use||{},x.use||{});if(Object.keys(use).length)e.use=use;
      return e;
    }),{after});
  }
  return{cap,HOUSES,MUST,DROP,items,opts,set,strip,robes,BASES};
})();
