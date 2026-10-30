/* ---- v241: the canon changes layer, the edition, and the live counts.
   EDITION: "admin" or "public" (ed241admin.js / ed241public.js, one line each, set by the build). The admin edition will
   carry the editing tools; the public edition never does.
   CANON (canon241data.js) is the canon changes layer baked into this file: edits to existing canon and additions, applied
   while the world loads, before anything is worked out from the data. In the admin edition, unsaved drafts (this browser
   only) sit on top of it. Format:
     {format:1, edits:{names:{h:"Display"}, bios:{h:{field:value}}, roles:{h:"Role. Text"}, groups:{gid:{field:value}},
                       rel:{BF:{}, BF_OUT:{}, SG:[], RV:[]} (each part, when present, replaces that part whole)},
      add:{girls:{h:{name, group, role, bio:{...}, adult:true}}}}
   v242: "rev" counts saved revisions; drafts remember the revision they were made on, and drafts older than the file are
   set aside (ACAD.canon.stale) instead of applied. edits.looks:{h:{pal,c,outfit}} replaces her robes design;
   edits.rel.FAM is family: [a, b, "blood"|"chosen", what b is to a, what a is to b].
   v245: add.groups:{gid:{name,kind,motto,hangout,lore,faction,rival,leader,base,look:{cols,words,crest,shape,c}}} are new
   groups (pushed before girls join them); edits.glooks:{gid:{...look}} restyle an existing group's colors and crest.
   The data blocks call ACAD.canonApply(kind, target) at the point their data is defined (groups215.js), so every page
   built from the data shows the changes. With an empty layer nothing changes.
   v250: places and history.
     edits.places:{id:{name,area,pin:[x,y],lead,lore:[...],groups:[gid],turf:[gid,gid],faction}} changes a place (only the fields
     given; lore replaces the paragraphs whole). add.places:{id:{...the same}} are new places, numbered after the last one
     and marked as new lore. edits.history:{eras:[{era,items:[{when,title,text,tag}]}], open:[[question,answer]]} replaces
     the timeline and the open questions whole (each part, when present).
   v251: edits.lore:{key:value} replaces one piece of the Encyclopedia's written lore whole: a list of customs, the
     unwritten rules, the glossary, the mysteries, the Spire Cup's text, a group's traditions or story seeds, a rivalry's
     stakes. Each key is applied where its data is defined (ACAD.lore / ACAD.loreInto).
   v254: the wider world. edits.factions:{id:{name,short,motto,tagline,wing,sigil,cols,lore}} and add.factions:{id:{...the
     same, dean:{id,name,title,look,lore,quote}}} (a new faction brings its dean); edits.staff:{id:{name,title,look,lore,
     quote}} (the Headmaster and the deans); edits.lost:{id:{name,faction,kin,kind,motto,haunt,story,cols,words,emblem,
     houses:[[House,asleep since,lore]]}} and add.lost:{id:{...}} (the Roll's lost groups); edits.champ:{lost group:[girl,why]
     or null} and edits.also:{sleeping House:group or null} (champions and second banners). The World Overview's blocks
     and each chapter's opening are edits.lore keys ("world.blocks", "lead.<page>").
   v255: content as data. EVERSPIRE_DATA (canon255data.js) is the canon as written, by kind, in the same shapes the data
     blocks define: {format:1, names, bios, roles, groups, houses, rel, looks, places, history, factions, staff, flore,
     roll, champ, lore:{key:value}}. Where it is present each kind is read from it instead of the code, and then the
     changes layer applies on top as before. ACAD.canon.data() is the canon as written now (what the build saves as the
     data file). window.__EVERSPIRE_SCRAMBLE (tests only) garbles the code's own text before the data is read, to prove
     every page reads from the data.
   v256: records. meta:{"<kind>:<id>":{author,rev}} credits each record and gives the revision it last changed in (kinds:
     girl, group, faction, place, lost, staff; originals are Hummus's, at revision 0); users:{name:{role:"moderator"}}
     (Hummus is always the admin); pending:[{id,from,owner,part,entry,made}] are relationships waiting for the other
     girl's author to accept them. A submission is a change set: {format:"everspire-changeset",v:1,author,base,made,note,
     edits,add,rel:{add:[[part,...entry]],drop:[[part,a,b]]}}, checked before review (records256.js, admin256.js).
   Counts: ACAD.CT gives the size of the roster in words ("one hundred", "ten") for text that describes the world as it
   is now; prose in the Encyclopedia can use {{n:houses}}, {{N:houses}}, {{n:groups}}, {{n:groupsize}} and the like. ---- */
(function(){
  const ED=typeof EVERSPIRE_EDITION==="string"?EVERSPIRE_EDITION:"public";
  ACAD.EDITION=ED;ACAD.isAdmin=()=>ED==="admin";ACAD.isPlayer=()=>ED!=="admin";
  /* v258: the admin's drafts change canon; a player's drafts are her own new lore, kept apart, waiting to be submitted */
  const DKEY=ED==="admin"?"everspire.canon.drafts.v1":"everspire.player.drafts.v1";
  /* a player's drafts may only add: new girls, groups, factions, places and lost groups; relationships; lore lists and
     history events she adds to (the checks hold existing entries fixed) */
  const PLAYER_LORE=/^(group\.traditions\.|conflicts\.seeds\.|cast\.customs$|ref\.gloss$|conflicts\.myst$|culture\.year$|culture\.rules$)/;
  const playerOnly=d=>{if(!d||typeof d!=="object")return null;const o={format:1,base:d.base,edits:{},add:{}};
    ["girls","groups","factions","places","lost"].forEach(k=>{if(d.add&&d.add[k])o.add[k]=d.add[k]});
    const E0=d.edits||{};if(E0.rel)o.edits.rel=E0.rel;if(E0.history&&E0.history.eras)o.edits.history={eras:E0.history.eras};
    if(E0.lore)Object.keys(E0.lore).forEach(k=>{if(PLAYER_LORE.test(k)){o.edits.lore=o.edits.lore||{};o.edits.lore[k]=E0.lore[k]}});
    if(E0.also)o.edits.also=E0.also;if(E0.champ)o.edits.champ=E0.champ;if(d.note)o.note=d.note;return o};
  const empty=()=>({format:1,edits:{},add:{}});
  const base=(typeof EVERSPIRE_CANON==="object"&&EVERSPIRE_CANON)||empty();
  let drafts=null,stale=null;const REV=+base.rev||0;
  try{const s=localStorage.getItem(DKEY);if(s)drafts=JSON.parse(s)}catch(e){drafts=null}
  if(drafts&&ED!=="admin")drafts=playerOnly(drafts);
  /* v242: drafts made for an older file (before its changes were saved into this one) are set aside, not applied */
  if(drafts&&typeof drafts.base==="number"&&drafts.base<REV){stale=drafts;drafts=null}
  const isObj=o=>o&&typeof o==="object"&&!Array.isArray(o);
  const merge=(a,b)=>{if(!isObj(b))return b;const o=isObj(a)?Object.assign({},a):{};Object.keys(b).forEach(k=>{o[k]=isObj(b[k])&&isObj(o[k])?merge(o[k],b[k]):b[k]});return o};
  const layer=()=>drafts?merge(base,drafts):base;
  const L=layer();
  const E=L.edits||{},ADD=(L.add&&L.add.girls)||{},ADDG=(L.add&&L.add.groups)||{};

  const PLACEF=["name","area","x","y","lead","lore","groups","turf","faction"];
  /* v255: the canon as written, read from the data file where it has a kind; CAP is what was read (for the next data file) */
  const W=typeof window!=="undefined"?window:{};
  const DATA=(W.__EVERSPIRE_DATA&&typeof W.__EVERSPIRE_DATA==="object"&&W.__EVERSPIRE_DATA)||(typeof EVERSPIRE_DATA==="object"&&EVERSPIRE_DATA)||null;
  const SCR=!!W.__EVERSPIRE_SCRAMBLE,CAP={lore:{}};const cj=v=>v===undefined?v:JSON.parse(JSON.stringify(v));
  const SKIP=new Set(["emblem","EM","slug","cols","pin","crest","shape"]);
  const rot=x=>x.replace(/(\[\[[^|\]]+\||\{\{[^}]*\}\})|([a-zA-Z])/g,(m,keep,c)=>keep||String.fromCharCode((c<="Z"?65:97)+((c.toLowerCase().charCodeAt(0)-97+1)%26)));
  const garble=(o,depth)=>{if(depth>8||!o||typeof o!=="object")return;Object.keys(o).forEach(k=>{if(SKIP.has(k))return;const v=o[k];
    if(typeof v==="string"){if(/[A-Z ]/.test(v)&&!/^#[0-9a-f]+$/i.test(v))o[k]=rot(v)}else if(v&&typeof v==="object")garble(v,depth+1)})};
  const RELK=["BF","BF_OUT","SG","RV","SG_PENDING","FAM","FLING"];
  const lookOf=tp=>tp?{pal:cj(tp.pal),c:cj(tp.c),outfit:cj(tp.outfit)}:null;
  const DK={
    names:{take:t=>cj(t),put:(t,d)=>Object.assign(t,cj(d))},
    roles:{take:t=>cj(t),put:(t,d)=>Object.assign(t,cj(d))},
    bios:{take:t=>cj(t),put:(t,d)=>Object.entries(d).forEach(([h,b])=>{t[h]=cj(b)})},
    houses:{take:t=>t.slice(),put:(t,d)=>t.splice(0,t.length,...d)},
    groups:{take:t=>cj(t),put:(t,d)=>d.forEach(dg=>{const g=t.find(x=>x.id===dg.id);if(g){Object.keys(g).forEach(k=>{if(!(k in dg))delete g[k]});Object.assign(g,cj(dg))}else t.push(cj(dg))})},
    rel:{take:t=>{const o={};RELK.forEach(k=>{if(t[k]!==undefined)o[k]=cj(t[k])});return o},put:(t,d)=>RELK.forEach(k=>{if(d[k]!==undefined)t[k]=cj(d[k])})},
    looks:{take:t=>{const o={};(ACAD.HOUSES||[]).forEach(h=>{const lk=lookOf(t(h+"robes"));if(lk)o[h]=lk});return o},
      put:(t,d)=>Object.entries(d).forEach(([h,lk])=>{const tp=t(h+"robes");if(tp&&lk){tp.pal=cj(lk.pal);tp.c=cj(lk.c);tp.outfit=cj(lk.outfit)}})},
    places:{take:t=>cj(t),put:(t,d)=>t.splice(0,t.length,...cj(d))},
    history:{take:t=>({hist:cj(t.hist),open:cj(t.open)}),put:(t,d)=>{t.hist.splice(0,t.hist.length,...cj(d.hist));t.open.splice(0,t.open.length,...cj(d.open))}},
    factions:{take:t=>cj(t),put:(t,d)=>d.forEach(df=>{const f=t.find(x=>x.id===df.id);if(f)Object.assign(f,cj(df));else t.push(cj(df))})},
    staff:{take:t=>cj(t),put:(t,d)=>Object.entries(d).forEach(([k,v])=>{t[k]=Object.assign(t[k]||{},cj(v))})},
    flore:{take:t=>cj(t),put:(t,d)=>Object.entries(d).forEach(([k,v])=>{t[k]=cj(v)})},
    roll:{take:t=>t.roll.map(g=>{const o=Object.assign({},g);delete o.emblem;return cj(o)}),
      put:(t,d)=>d.forEach(dg=>{const g=t.roll.find(x=>x.id===dg.id);const em=t.EM[dg.emblemName];const o=Object.assign(cj(dg),em?{emblem:em}:{});if(g)Object.assign(g,o);else if(em)t.roll.push(o)})},
    champ:{take:t=>({CHAMP:cj(t.CHAMP),ALSO_ID:cj(t.ALSO_ID)}),put:(t,d)=>{[["CHAMP",t.CHAMP],["ALSO_ID",t.ALSO_ID]].forEach(([k,o])=>{Object.keys(o).forEach(x=>delete o[x]);Object.assign(o,cj(d[k]||{}))})}}};
  /* v255: people (t: the template lookup): the headmistresses, the boyfriends, the principals and each girl's own robes,
     by template id: their name, blurb and biography */
  const PERSON=id=>/^(principal[a-z0-9]+|[a-z0-9]+(robes|head|man))$/.test(id);
  DK.people={take:t=>{const o={};(typeof TEMPLATES!=="undefined"?TEMPLATES:[]).forEach(tp=>{if(tp&&PERSON(tp.id))o[tp.id]={name:tp.name,blurb:tp.blurb,bio:cj(tp.bio)}});return o},
    put:(t,d)=>Object.entries(d).forEach(([id,p])=>{const tp=t(id);if(!tp)return;["name","blurb"].forEach(k=>{if(p[k]!==undefined)tp[k]=p[k]});if(p.bio!==undefined)tp.bio=cj(p.bio)})};
  /* v255: "t.<name>" kinds are tables of written lore (an object or a list), read whole from the data */
  const TABLE={take:t=>cj(t),put:(t,d)=>{if(Array.isArray(t)&&Array.isArray(d))t.splice(0,t.length,...cj(d));else Object.entries(d).forEach(([k,v])=>{t[k]=cj(v)})}};
  const fromData=(kind,t)=>{const k=DK[kind]||(/^t\./.test(kind)?TABLE:null);if(!k)return;
    if(SCR){if(kind==="people"){(typeof TEMPLATES!=="undefined"?TEMPLATES:[]).forEach(tp=>{if(tp&&PERSON(tp.id)){const b={name:tp.name,blurb:tp.blurb,bio:tp.bio};garble(b,0);Object.assign(tp,b)}})}else if(kind==="looks"){(ACAD.HOUSES||[]).forEach(h=>garble(t(h+"robes"),0))}else if(kind==="roll")t.roll.forEach(g=>garble(g,0));else if(kind==="history"){garble(t.hist,0);garble(t.open,0)}else if(kind==="champ")garble(t.CHAMP,0);else garble(t,0)}
    if(DATA&&DATA[kind]!==undefined)k.put(t,DATA[kind]);CAP[kind]=k.take(t)};
  /* v251: written lore, by key */
  const LORE=E.lore||{};const cl=v=>JSON.parse(JSON.stringify(v));
  const DLORE=(DATA&&DATA.lore)||{};
  const asWritten=(key,def)=>{if(SCR&&def!==undefined){const box={v:cj(def)};garble(box,0);def=box.v}if(DLORE[key]!==undefined)def=cl(DLORE[key]);if(def!==undefined)CAP.lore[key]=cj(def);return def};
  ACAD.lore=(key,def)=>{def=asWritten(key,def);return LORE[key]===undefined?def:cl(LORE[key])};
  ACAD.loreInto=(key,arr)=>{if(Array.isArray(arr)){const d=asWritten(key,arr);if(d!==arr)arr.splice(0,arr.length,...d)}const v=LORE[key];if(Array.isArray(v)&&Array.isArray(arr))arr.splice(0,arr.length,...cl(v));return arr};
  ACAD.loreKeys=prefix=>Object.keys(LORE).filter(k=>k.startsWith(prefix));
  ACAD.loreEdited=key=>LORE[key]!==undefined;
  /* v255: a piece of written lore as it reads now (the change if there is one, else as written) */
  ACAD.loreNow=key=>LORE[key]!==undefined?cl(LORE[key]):CAP.lore[key]!==undefined?cj(CAP.lore[key]):cj(DLORE[key]);
  /* applied where each kind of data is defined */
  const applied={};
  ACAD.canonApply=function(kind,t){if(!t)return t;applied[kind]=true;fromData(kind,t);
    if(kind==="names"){Object.entries(E.names||{}).forEach(([h,v])=>{t[h]=v});Object.entries(ADD).forEach(([h,g])=>{if(g.name)t[h]=g.name})}
    else if(kind==="bios"){Object.entries(E.bios||{}).forEach(([h,p])=>{t[h]=Object.assign(t[h]||{},p)});
      Object.entries(ADD).forEach(([h,g])=>{t[h]=Object.assign(t[h]||{},g.bio||{})})}
    else if(kind==="roles"){Object.entries(E.roles||{}).forEach(([h,v])=>{t[h]=v});Object.entries(ADD).forEach(([h,g])=>{if(g.role)t[h]=g.role})}
    else if(kind==="groups"){/* t: the array of groups */
      /* v245: new groups first, so girls and edits can name them */
      Object.entries(ADDG).forEach(([id,a])=>{if(t.some(x=>x.id===id))return;t.push({id,name:a.name||id,kind:a.kind||"",leader:a.leader||"",rival:a.rival||"",members:(a.members||[]).slice(),motto:a.motto||"",hangout:a.hangout||"",lore:a.lore||"",apart:!!a.apart})});
      Object.entries(E.groups||{}).forEach(([id,p])=>{const g=t.find(x=>x.id===id);if(g)Object.assign(g,p)});
      Object.entries(ADD).forEach(([h,a])=>{const g=t.find(x=>x.id===a.group);if(g&&!g.members.includes(h))g.members.push(h)});
      t.forEach(g=>{if((!g.leader||!g.members.includes(g.leader))&&g.members.length&&ADDG[g.id])g.leader=g.members[0]})}
    else if(kind==="rel"){const r=E.rel||{};["BF","BF_OUT","SG","RV","SG_PENDING","FAM","FLING"].forEach(k=>{if(r[k]!==undefined)t[k]=r[k]});if(!t.FAM)t.FAM=[];if(!t.FLING)t.FLING=[];if(ACAD.ROM)ACAD.ROM.settle(t)}
    /* v242: her look (pal, c, outfit) replaces her robes design's; t is the template lookup */
    else if(kind==="looks"){Object.entries(E.looks||{}).forEach(([h,lk])=>{const tp=t(h+"robes");if(!tp||!lk)return;if(lk.pal)tp.pal=Object.assign({},lk.pal);if(lk.c)tp.c=Object.assign({},lk.c);if(lk.outfit)tp.outfit=JSON.parse(JSON.stringify(lk.outfit))})}
    /* v250: places (t: the array of places) and history (t: {hist, open}) */
    else if(kind==="places"){const AP=(L.add&&L.add.places)||{},EP=E.places||{};let n=t.reduce((m,p)=>Math.max(m,+p.n||0),0);
      Object.entries(AP).forEach(([id,a])=>{if(t.some(p=>p.id===id))return;t.push(Object.assign({area:"walls",x:500,y:320,lead:"",lore:[]},JSON.parse(JSON.stringify(a)),{id,n:++n,tag:"n",added:true}))});
      t.forEach(p=>{const e=EP[p.id];if(!e)return;if(Array.isArray(e.pin)&&e.pin.length===2){p.x=+e.pin[0];p.y=+e.pin[1]}PLACEF.forEach(f=>{if(e[f]===undefined)return;const v=e[f];if(v===null||(Array.isArray(v)&&!v.length&&f!=="lore"))delete p[f];else p[f]=Array.isArray(v)?v.slice():v})})}
    else if(kind==="history"){const H=E.history||{};
      if(Array.isArray(H.eras))t.hist.splice(0,t.hist.length,...JSON.parse(JSON.stringify(H.eras)));
      if(Array.isArray(H.open))t.open.splice(0,t.open.length,...JSON.parse(JSON.stringify(H.open)))}
    /* v254: factions (t: the factions), their deans and the Headmaster (t: the staff), the faction pages' lore (t: by id),
       the Roll (t: {roll, EM, slug}), champions and second banners (t: {CHAMP, ALSO_ID}) */
    else if(kind==="factions"){const AF=(L.add&&L.add.factions)||{},EF=E.factions||{};
      Object.entries(AF).forEach(([id,a])=>{if(t.some(f=>f.id===id))return;t.push({id,name:a.name||id,short:a.short||String(a.name||id).replace(/^The /,""),groups:[],dean:(a.dean&&a.dean.id)||("dean"+id),
        cols:Object.assign({a:"#5d5a7e",b:"#a7a2c8",ink:"#ffffff"},a.cols||{}),wing:a.wing||"",sigil:a.sigil||"",motto:a.motto||"",tagline:a.tagline||"",added:true})});
      t.forEach(f=>{const e=EF[f.id];if(!e)return;["name","short","motto","tagline","wing","sigil"].forEach(k=>{if(e[k]!==undefined)f[k]=e[k]});if(e.cols)f.cols=Object.assign({},f.cols,e.cols)})}
    else if(kind==="staff"){Object.entries((L.add&&L.add.factions)||{}).forEach(([id,a])=>{const d=a.dean||{};const k=d.id||("dean"+id);
        if(!t[k])t[k]={name:d.name||"",title:d.title||("Dean of "+(a.name||id)),look:d.look||"",lore:(d.lore||[]).slice(),quote:d.quote||""}});
      Object.entries(E.staff||{}).forEach(([k,e])=>{if(!t[k]||!e)return;["name","title","look","quote"].forEach(f=>{if(e[f]!==undefined)t[k][f]=e[f]});if(Array.isArray(e.lore))t[k].lore=e.lore.slice()})}
    else if(kind==="flore"){Object.entries((L.add&&L.add.factions)||{}).forEach(([id,a])=>{if(!t[id])t[id]=(a.lore||[]).slice()});
      Object.entries(E.factions||{}).forEach(([id,e])=>{if(e&&Array.isArray(e.lore))t[id]=e.lore.slice()})}
    else if(kind==="roll"){const AL=(L.add&&L.add.lost)||{},EL=E.lost||{};
      const hs=list=>(list||[]).map(h=>({id:t.slug(h[0]),name:h[0],since:h[1]||"",lore:h[2]||""}));
      Object.entries(AL).forEach(([id,a])=>{if(t.roll.some(g=>g.id===id))return;
        t.roll.push({id,name:a.name||id,faction:a.faction||"none",kin:a.kin||"",kind:a.kind||"",motto:a.motto||"",haunt:a.haunt||"",
          cols:Object.assign({a:"#3b3a58",b:"#b39b62",e:"#efe6cf",f:"#ffffff"},a.cols||{}),words:(a.words||["slate gray","old gold","ivory"]).slice(),
          emblem:t.EM[a.emblem]||t.EM.star,emblemName:t.EM[a.emblem]?a.emblem:"star",story:a.story||"",houses:hs(a.houses),added:true})});
      t.roll.forEach(g=>{const e=EL[g.id];if(!e)return;["name","faction","kin","kind","motto","haunt","story"].forEach(k=>{if(e[k]!==undefined)g[k]=e[k]});
        if(e.cols)g.cols=Object.assign({},g.cols,e.cols);if(Array.isArray(e.words))g.words=e.words.slice();if(e.emblem&&t.EM[e.emblem]){g.emblem=t.EM[e.emblem];g.emblemName=e.emblem}
        if(Array.isArray(e.houses))g.houses=hs(e.houses)})}
    else if(kind==="champ"){Object.entries(E.champ||{}).forEach(([lid,v])=>{if(v===null)delete t.CHAMP[lid];else if(Array.isArray(v))t.CHAMP[lid]=v.slice()});
      Object.entries(E.also||{}).forEach(([hid,g])=>{if(g===null)delete t.ALSO_ID[hid];else t.ALSO_ID[hid]=g})}
    else if(kind==="houses"){Object.keys(ADD).forEach(h=>{if(!t.includes(h))t.push(h)})}
    /* v259: the boys' biographies (t: the template lookup): edits.boys[house] = {field: text} */
    else if(kind==="people"){Object.entries(E.boys||{}).forEach(([h,p])=>{const tp=t(h+"man");if(tp&&p)tp.bio=Object.assign(tp.bio||{},cj(p))});
      /* v260: the headmistresses' biographies: edits.heads[house] = {field: text} */
      Object.entries(E.heads||{}).forEach(([h,p])=>{const tp=t(h+"head");if(tp&&p)tp.bio=Object.assign(tp.bio||{},cj(p))})}
    return t};
  /* v258: a piece of lore as it reads now, including the tables nobody has changed yet */
  ACAD.loreCurrent=key=>LORE[key]!==undefined?cl(LORE[key]):ACAD.canon.canonLore(key);
  ACAD.canon={edition:ED,
    layer:()=>JSON.parse(JSON.stringify(L)),
    base:()=>JSON.parse(JSON.stringify(base)),
    drafts:()=>drafts?JSON.parse(JSON.stringify(drafts)):null,
    /* save drafts (admin edition only); they show after the next load */
    saveDrafts:d=>{if(d&&ED!=="admin")d=playerOnly(d);try{if(d){d.base=REV;localStorage.setItem(DKEY,JSON.stringify(d))}else localStorage.removeItem(DKEY);
      /* v245b: a file written before the next reload carries what was just saved (the notes for What's new) */
      drafts=d?JSON.parse(JSON.stringify(d)):null;return true}catch(e){return false}},
    rev:()=>REV,stale:()=>stale?JSON.parse(JSON.stringify(stale)):null,
    /* the layer this file would carry if saved now: its own plus the drafts; the revision goes up when drafts are added */
    next:()=>{const n=drafts?merge(base,drafts):JSON.parse(JSON.stringify(base));delete n.base;if(drafts)n.rev=REV+1;
      /* v256: each record a change touched is stamped with this revision (and keeps its author) */
      if(drafts&&ACAD.records&&ACAD.records.stamp)ACAD.records.stamp(n,drafts,REV+1);return n},
    added:()=>Object.keys(ADD),
    isAdded:h=>Object.prototype.hasOwnProperty.call(ADD,h),
    isAddedFaction:f=>Object.prototype.hasOwnProperty.call((L.add&&L.add.factions)||{},f),
    isAddedLost:g=>Object.prototype.hasOwnProperty.call((L.add&&L.add.lost)||{},g),
    isAddedPlace:p=>Object.prototype.hasOwnProperty.call((L.add&&L.add.places)||{},p),
    historyEdited:()=>!!(E.history&&(E.history.eras||E.history.open)),
    isAddedGroup:g=>Object.prototype.hasOwnProperty.call(ADDG,g),addedGroups:()=>Object.keys(ADDG),
    applied:()=>Object.keys(applied),
    /* v255: the canon as written now, as the data file holds it */
    data:()=>Object.assign({format:1},cj(CAP)),fromData:()=>!!DATA,
    /* v258: lore and history as canon has them (the saved file, without this browser's drafts): what a player adds to */
    canonLore:key=>{const be=((base.edits||{}).lore)||{};if(be[key]!==undefined)return cj(be[key]);
      /* the groups' traditions and story seeds are tables of their own until someone changes them */
      let m;if((m=/^group\.traditions\.(.+)$/.exec(key)))return cj((((CAP["t.grouplore"]||{})[m[1]])||{}).traditions||[]);
      if((m=/^conflicts\.seeds\.(.+)$/.exec(key)))return cj(((CAP["t.seeds"]||{})[m[1]])||[]);
      if((m=/^conflicts\.stakes\.(.+)$/.exec(key))&&CAP["t.stakes"])return cj(((CAP["t.stakes"]||{})[m[1]])||"");
      if(CAP.lore[key]!==undefined)return cj(CAP.lore[key]);if(DLORE[key]!==undefined)return cj(DLORE[key]);return undefined},
    canonHistory:()=>{const bh=((base.edits||{}).history)||{};return cj(Array.isArray(bh.eras)?bh.eras:((CAP.history||{}).hist||[]))},
    playerLore:k=>PLAYER_LORE.test(k),
    empty};
  /* v245: an empty name (a new group's leader before anyone joins) capitalizes to nothing instead of failing */
  if(typeof ACAD.cap==="function"){const c0=ACAD.cap;ACAD.cap=x=>x?c0(x):""}
  /* names exist already (acadhelp): apply now */
  if(ACAD.HNAME)ACAD.canonApply("names",ACAD.HNAME);
})();

/* ---- v175: Serpent robes refined from Malfoid's character summary (Danbooru wiki: redteneri's design, also called Dracaena
   Malfoy): long blonde hair with curtained bangs, ringed eyes, hoop earrings, and an arrogant tsundere personality.
   Only adult traits are taken (look and personality; nothing school-coded). Early block, so every Serpent look in every
   set inherits it: platinum-blonde hair with curtain bangs instead of the swept-back style, and a haughty, arrogant smirk
   that betrays a faint blush instead of a flat scowl. Her ringed green eyes, hoops and green-and-silver colors stay. ---- */
(function(){
  const t=tplById("serpentrobes");if(!t)return;
  START.option("expression","arrogant, haughty smirk with a faint, betraying blush","Expression");
  START.option("impression","an arrogant, haughty presence that barely hides a flustered soft side","Academy");
  START.option("hairStyle","straight hair","Long");START.option("hairTexture","silky and glossy","Texture");START.option("bangs","curtain bangs with long face-framing pieces","Bangs");
  t.pal=Object.assign({},t.pal,{primary:"platinum blonde"});
  Object.assign(t.c,{expression:"arrogant, haughty smirk with a faint, betraying blush",impression:"an arrogant, haughty presence that barely hides a flustered soft side",
    browShape:"sharply arched brows",hairStyle:"straight hair",hairTexture:"silky and glossy",bangs:"curtain bangs with long face-framing pieces",posture:"standing with her arms crossed under the bust, chin raised"});
  START.option("browShape","sharply arched brows","Brows");START.option("posture","standing with her arms crossed under the bust, chin raised","Posture");
  t.blurb="An arrogant tsundere: long, silky platinum-blonde hair with curtain bangs, sharp green eyes with ringed irises, a haughty smirk that can't quite hide a blush, arms crossed with her chin raised, large black hoops, and black hooded robes with green lining over a green-and-silver striped tie.";
})();

/* ---- v146/v147: the Kraken house (14th house, after Flamingo). v147: the research build below is now the Kraken HEADMISTRESS;
   the robes girl is the owner's own design. Early block: runs after the base's Academy sets and
   before the batch sets, so every later set can include her.
   The (headmistress) build comes from Danbooru's most-used tags (tags sorted by post count, Oct 2026):
     hair   long hair (6.3M, the #1 hair tag), black hair (2.2M, tied for the most-used colour), very long hair (1.4M),
            multicolored hair (1.2M: streaked 448k, colored inner hair 165k), hair over one eye (362k), purple hair (930k)
     eyes   red eyes (1.8M, the #2 eye colour after blue eyes 2.5M), half-closed bedroom eyes
     face   mole under eye (254k, the most-used mole tag by far)
     body   large/huge breasts (2.3M / 334k; huge breasts is also one of Danbooru's most-searched tags), cleavage (1.4M),
            mole on breast (60k), thick thighs (164k), curvy (78k),
            wide hips (58k), thighhighs (1.6M, the top legwear tag), puffy nipples (49k), large areolae (50k)
   Palette: black / deep violet / teal / crimson / pearl white (ink, deep water, bioluminescence, red eyes, pearls).
   Adds: ACAD.HOUSES "kraken", the Kraken robes, the Kraken headmistress, and her entries in the base-defined sets
   (Cheerleaders, Swim Team, Ballgowns, Day Off, Pajama Day, Bunny Girls, Monster Girls, Summer Days, Date Night,
   Sports Day, First Time). */
(function(){
  const H="kraken";
  if(!ACAD.HOUSES.includes(H))ACAD.HOUSES.push(H);
  const it=(f,v,t,fam)=>START.item(f,v,t||"CU",fam||"costume,preppy");
  const op=(f,v,g)=>START.option(f,v,g||"Expression");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  op("expression","slow, lazy, teasing smile","Sultry");
  /* ---------- robes and headmistress items ---------- */
  it("top","fitted white collared blouse straining at the buttons","CU","preppy,costume");
  it("corset","{c} underbust corset with {c2} tentacle-curl lacing","CU","preppy,costume,boudoir");
  it("bottom","high-waisted pleated mini skirt","CU","preppy,costume");
  it("legwear","garter-strap stockings with lace tops","CU","preppy,boudoir");
  it("headwear","pearl-and-shell hairpin","CU","preppy,glam");
  it("tagCharm","small kraken crest badge","CU","preppy,costume");
  it("tagCharm","kraken crest brooch","CU","preppy,costume");
  it("detailOne","tentacle-curl embroidery along the hems","CU","preppy,costume");
  op("expression","shy, breathless smile with parted lips","Sweet");
  op("expression","cool, otherworldly half-smile","Sultry");
  /* v147: the robes girl is the owner's own design (saved from the studio, Oct 14); the research build moved to the headmistress */
  const ROBES={id:"krakenrobes",name:"Kraken robes",
    blurb:"A petite, top-heavy young woman with very long, silky straight black hair and side-swept bangs, deep-violet inner hair and sharp teal streaks, one crimson and one deep-violet eye, a mole under one eye, pale ivory skin and a cool, aloof, otherworldly beauty that melts into a shy, breathless smile. A black hooded robe with deep-violet lining over a straining white blouse and violet tentacle-laced underbust corset, a black pleated mini skirt, garter stockings, pearls and a kraken crest.",
    pal:{primary:"black",secondary:"deep violet",third:"teal",accent:"crimson",extra:"pearl white"},
    c:{age:"young woman",faceShape:"heart-shaped face with soft cheeks",expression:"shy, breathless smile with parted lips",browShape:"soft, curved dark brows",
      noseShape:"small straight nose",mouthShape:"sensual full lips",impression:"a cool, aloof otherworldly beauty",eyeConfig:"heterochromatic",eyeShape:"almond-shaped eyes",
      pupilStyle:"round pupils",irisDetail:"luminous iris rim",lashNatural:"long, thick dark eyelashes",eyeOne:"@accent",eyeTwo:"@secondary",faceMark:"a small mole beneath one eye",
      hairLength:"very long",hairTexture:"silky straight",bangs:"side-swept bangs",hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@secondary",hairHighlights:"@third",
      hairBlend:"distinct, sharply defined highlight streaks running from the roots all the way to the tips, with no gradient",
      hairMovement:"falls past the waist in smooth, mostly straight layers",skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, luminous skin",markings:"no markings",
      nailStyle:"long stiletto fingernails",nailColor:"@secondary",
      nippleColor:"dusty rose",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"dusty rose",areolaType:"puffy",areolaSize:"large",
      vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"no pubic hair",
      bustSize:"very large, full, naturally rounded breasts",heightStature:"a petite frame",shoulderShape:"narrow shoulders",waistShape:"tiny waist",stomachShape:"soft stomach",
      hipShape:"rounded hips",buttSize:"full, round butt",thighBuild:"thick soft thighs",legShape:"shapely legs",bodySoftness:"extremely top-heavy hourglass figure",
      handShape:"small and feminine",makeupStyle:"soft natural makeup",lashStyle:"natural lashes",blushStyle:"soft cheek blush",lipFinish:"tinted lip balm"},
    outfit:{oname:"Robe, corset and pleated skirt",look:"costume",items:{
      top:["fitted white collared blouse straining at the buttons","white"],corset:["{c} underbust corset with {c2} tentacle-curl lacing","@secondary",null,"@third"],
      bottom:["high-waisted pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],
      neckAccessory:["ribbon bow tie","@accent"],legwear:["garter-strap stockings with lace tops","@primary"],earAccessory:["pearl drop earrings","-"],
      headwear:["pearl-and-shell hairpin","-"],tagCharm:["small kraken crest badge","@third"]},
      details:{detailOne:"tentacle-curl embroidery along the hems",detailTwo:"cinched waist"},dcol:{}},
    nude:true,tags:["academy","robes","kraken"],out:{framing:"full body",must:MUST}};
  START.add("Academy",[ROBES]);
  /* v147: the Kraken headmistress is the Danbooru research build: every top tag at once reads as a mature woman, so it belongs
     to the faculty. Black hair (top-3 colour) over one eye (hair over one eye) with deep-violet inner hair (colored inner hair)
     and teal streaks (streaked hair), half-lidded red eyes (#2 eye colour), mole under eye (the #1 mole tag) and mole on breast,
     huge breasts (2.3M large / 334k huge, one of the most-searched tags), cleavage, wide hips, thick thighs, curvy,
     thighhighs (the top legwear tag), puffy nipples and large areolae; "mature female" is itself one of Danbooru's top searches. */
  it("legwear","garter-strap stockings with lace tops","CU","preppy,boudoir");
  const HEAD={id:"krakenhead",name:"Kraken headmistress",
    blurb:"The faculty's sea-witch, built from Danbooru's most-used tags: a tall, voluptuous mature headmistress with hip-length black hair falling over one eye, deep-violet inner hair and teal streaks, half-lidded crimson eyes, a mole under one eye and another on her cleavage, pale skin, huge breasts, a very narrow waist, wide hips and thick thighs. A black academic gown with teal velvet facings over a pearl-white satin wrap blouse and deep-violet high-slit skirt, with opera gloves, garter stockings, pearls and a kraken crest brooch.",
    pal:{primary:"black",secondary:"deep violet",third:"teal",accent:"crimson",extra:"pearl white"},
    c:{age:"mature woman",faceShape:"smooth, high-cheekboned siren face with fine features",expression:"slow, lazy, teasing smile",browShape:"soft, curved dark brows",
      noseShape:"small straight nose",mouthShape:"sensual full lips",impression:"an alluring, sultry presence",eyeConfig:"matching",eyeShape:"half-lidded bedroom eyes",
      pupilStyle:"round pupils",irisDetail:"luminous iris rim",lashNatural:"long, thick dark eyelashes",eyeOne:"@accent",faceMark:"a small mole beneath one eye",
      hairLength:"hip-length",hairTexture:"smooth, mostly straight, wavy-ended",bangs:"long side bangs over one eye",hairBase:"@primary",hairUnderlayer:"@secondary",
      hairInner:"@secondary",hairHighlights:"@third",hairBlend:"distinct, sharply defined highlight streaks running from the roots all the way to the tips, with no gradient",
      hairMovement:"falls past the waist in smooth, mostly straight layers",
      skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, luminous skin",markings:"no markings",
      makeupStyle:"glamorous soft smoky makeup",eyelinerStyle:"sharp winged eyeliner",lashStyle:"bedroom lashes",blushStyle:"soft cheek blush",lipFinish:"glossy lips",
      faceAccents:"soft cheekbone highlight",nailStyle:"long stiletto fingernails",nailColor:"@accent",
      bustSize:"huge breasts",bustShape:"full, heavy, round shape",bustWeight:"heavy natural fullness, with a small mole on the cleavage",heightStature:"tall, statuesque stature",
      shoulderShape:"graceful shoulders",waistShape:"very narrow, defined hourglass waist with a pronounced waist-to-hip ratio",stomachShape:"smooth, softly toned stomach",
      hipShape:"wide, beautifully rounded hips",buttSize:"very full, rounded, prominently projecting butt",thighBuild:"thick, plush, shapely thighs tapering toward the knees",
      legShape:"long, shapely legs with thick upper legs and slender lower legs",bodySoftness:"voluptuous, exaggerated hourglass figure with a soft feminine body, curvy silhouette and pronounced curves",
      handShape:"slender and graceful",posture:"elegant posture",
      nippleColor:"dusty rose",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"dusty rose",areolaType:"puffy",areolaSize:"large",
      vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"a neatly trimmed patch of pubic hair"},
    outfit:{oname:"Headmistress robes",look:"preppy",items:{top:["wrap-front satin blouse","@extra"],bottom:["high-slit satin skirt","@secondary"],
      outerwear:["long {c} academic gown with {c2} velvet facings","@primary",null,"@third"],gloves:["opera satin gloves","@primary"],neckAccessory:["pearl strand","-"],
      earAccessory:["pearl drop earrings","-"],legwear:["garter-strap stockings with lace tops","@primary"],tagCharm:["kraken crest brooch","@third"]},details:{},dcol:{}},
    nude:true,tags:["headmistress","kraken"],out:{framing:"full body",must:MUST}};
  START.add("Academy Headmistresses",[HEAD]);

  /* ---------- the base-defined sets ---------- */
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const n=v=>v.replace(/\{c\}-and-\{c2\}\s?/g,"").replace(/\{c2?\}\s?/g,"");
  const INTIMATE=["nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","pubicHair"];
  /* Cheerleaders: like the others, no Nude outfit or intimate details (the cheer uniform is youth-coded to the safeguard) */
  START.add("Academy Cheerleaders",[{id:"krakencheer",base:"krakenrobes",name:"Kraken cheer",out:{framing:"full body",must:MUST},drop:INTIMATE.concat(["hairMovement"]),
    c:{expression:"playful smile",posture:"poised dancer's posture",hairStyle:"high ponytail"},more:[],tags:["cheerleader","cheer squad"],
    outfit:{oname:"Cheer uniform",look:"costume",items:{top:["fitted cheer crop top","@third"],bottom:["pleated cheer skirt","@primary"],legwear:["over-the-knee athletic socks","@secondary"],
      tagCharm:["small kraken crest badge","@accent"],headwear:["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","@accent",null,"@primary"]},
      details:{detailOne:"contrast piping and a bold varsity-style number",detailTwo:"athletic fit"},dcol:{}},
    blurb:"Teal cheer crop top, black pleated skirt and deep-violet over-the-knee socks, with oversized hair bows and a kraken crest badge. Hair, face and build come from the Kraken robes."}]);
  /* Swim Team */
  it("top","sling bikini with {c2} trim","L","swimwear,boudoir");
  START.add("Academy Swim Team",[{id:"krakenswim",base:"krakenrobes",name:"Kraken swim",out:{framing:"full body",must:MUST},drop:["hairMovement"],
    c:{hairStyle:"high ponytail",skinFinish:"glistening oiled skin",expression:"confident smile"},more:[],nude:true,tags:["swimsuit","swim team"],
    outfit:{oname:"Swimsuit",look:"swimwear",items:{top:["sling bikini with {c2} trim","@primary",null,"@third"],outerwear:["sheer {c} cape","@secondary"]},
      details:{detailOne:"string ties",detailTwo:"sheer panels over the chest",detailThree:"wet, glistening spandex finish"},dcol:{}},
    blurb:"A black sling bikini with teal trim under a sheer deep-violet cape, oiled and glistening. Face, skin and build come from the Kraken robes."}]);
  /* Ballgowns */
  const GOWN="plunging mermaid gown with {c2} tentacle-curl beading, a high thigh slit and a trailing hem";
  it("top",GOWN,"CUS","glam,costume");
  START.add("Academy Ballgowns",[{id:"krakengown",base:"krakenrobes",name:"Kraken ballgown",out:{framing:"full body",must:MUST},drop:["hairMovement"],
    c:{hairStyle:"long side-swept waves",posture:"elegant posture"},more:[],nude:true,tags:["ballgown","formal","regal"],
    outfit:{oname:"Ballgown",look:"glam",items:{top:[GOWN,"@secondary",null,"@third"],headwear:["pearl-and-shell hairpin","-"],gloves:["long satin opera gloves","@primary"],neckAccessory:["pearl choker","auto"]},
      details:{detailOne:"delicate beaded embroidery",detailThree:"lustrous silk satin finish"},dcol:{}},
    blurb:"A regal deep-violet plunging mermaid gown with teal tentacle-curl beading and a thigh slit, with a pearl hairpin and long black opera gloves. Hair is dressed up; face and build come from the Kraken robes."}]);
  /* Day Off */
  START.add("Academy Day Off",[{id:"krakendayoff",base:"krakenrobes",name:"Kraken day off",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"half-lidded sultry gaze",posture:"relaxed posture"},more:[],nude:true,tags:["day off","loungewear","cozy"],
    outfit:{oname:"Day off",look:"casual",items:{top:["oversized sleep shirt with a plunging collar, barely buttoned","@extra"],panties:["lace-trim high-cut panties","@secondary"],
      legwear:["sheer thigh-highs","@primary"],eyewear:["oversized square glasses"],headwear:["silk sleep mask pushed up on the forehead","@secondary"]},
      details:{detailTwo:"slouchy off-the-shoulder fit",detailThree:"silk habotai"},dcol:{}},
    blurb:"Off duty in Kraken colors: an oversized sleep shirt barely buttoned, black thigh-highs, oversized glasses and a silk sleep mask. Face and build come from the Kraken robes."}]);
  /* Pajama Day */
  it("top","fluffy octopus hooded onesie with tentacle-trimmed sleeves","CU","sweet,casual,cottage");
  it("heldItem","plush octopus toy","CU","sweet,casual,cottage");
  START.add("Academy Pajama Day",[{id:"krakenpajama",base:"krakenrobes",name:"Kraken pajama day",out:{framing:"full body",must:MUST},drop:["hairMovement"],
    c:{hairStyle:"twin braids",expression:"sleepy, cat-like contentment",posture:"light playful posture"},more:[],nude:true,tags:["pajamas","pajama day","cozy","cute"],
    outfit:{oname:"Pajamas",look:"sweet",items:{top:["fluffy octopus hooded onesie with tentacle-trimmed sleeves","@secondary"],legwear:["fuzzy slipper socks","@third"],
      heldItem:["plush octopus toy","@third","hugged tightly to her chest"]},details:{detailOne:"scalloped edge",detailThree:"soft fleece texture"},dcol:{}},
    blurb:"Fluffy octopus onesie, fuzzy slipper socks and a plush octopus hugged close, in Kraken colors. Face and build come from the Kraken robes."}]);
  /* Bunny Girls */
  const BUN="plunging bunny leotard with sheer tentacle-curl lace panels and a cutaway waist";
  it("top",BUN,"L","boudoir,costume");
  it("detailOne","tentacle-curl lace","CU","costume,boudoir");
  START.add("Academy Bunny Girls",[{id:"krakenbunny",base:"krakenrobes",name:"Kraken bunny",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"half-lidded sultry gaze",posture:"arched-back posture"},more:[],nude:true,tags:["bunny girl","bunny suit","playboy bunny"],
    outfit:{oname:"Bunny",look:"glam",items:{top:[BUN,"@primary"],legwear:["sheer seamed thigh-high stockings","@secondary"],headwear:["tall upright bunny ear headband","@primary"],
      neckAccessory:["detached {c} collar with a bow tie","@third"],wristAccessory:["wrist cuffs with a bow","@third"],tailPiece:["fluffy bunny tail attached at the lower back"]},
      details:{detailOne:"tentacle-curl lace",detailThree:"glossy satin finish"},dcol:{}},
    blurb:"A bunny suit for Kraken: a black plunging leotard with tentacle-lace panels, deep-violet seamed stockings, bunny ears and a teal collar. Face and build come from the Kraken robes."}]);
  /* Monster Girls */
  it("top","micro tentacle-wrapped bodysuit with a plunging neckline and open sides","L","costume,boudoir");
  it("legwear","sheer thigh-high stockings with suction-cup lace","LS","costume,boudoir");
  it("tailPiece","cluster of soft tentacles attached at the lower back","S","costume");
  START.add("Academy Monster Girls",[{id:"krakenmonster",base:"krakenrobes",name:"Kraken monster",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"come-hither look",posture:"arched-back posture"},more:[],nude:true,tags:["monster girl","halloween","costume"],
    outfit:{oname:"Monster",look:"costume",items:{top:["micro tentacle-wrapped bodysuit with a plunging neckline and open sides","@secondary"],headwear:["pearl-and-coral hair crown"],
      legwear:["sheer thigh-high stockings with suction-cup lace","@primary"],neckAccessory:["pearl choker"],tailPiece:["cluster of soft tentacles attached at the lower back","@secondary"]},details:{},dcol:{}},
    blurb:"A kraken sea-witch costume for Kraken: a micro tentacle-wrapped bodysuit, a pearl-and-coral crown, suction-cup lace stockings and a cluster of soft tentacles. Face and build come from the Kraken robes."}]);
  /* Summer Days */
  const SUN="short halter sundress with a plunging neckline, a bare back and a tentacle-print hem";
  it("top",SUN,"US","resort,sweet");
  START.add("Academy Summer Days",[{id:"krakensummer",base:"krakenrobes",name:"Kraken summer day",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"seductive smile",posture:"hip-popped sultry stance"},more:[],nude:true,tags:["summer","sundress","sun hat"],
    outfit:{oname:"Summer day",look:"resort",items:{top:[SUN,"@secondary"],headwear:["wide-brim sun hat","@primary"],eyewear:["cat-eye sunglasses","@primary","hanging from the neckline"],
      legwear:["strappy flat sandals","@third"]},details:{detailOne:"ruffle trim"},dcol:{}},
    blurb:"A revealing sundress and hat for Kraken: a deep-violet halter sundress with a tentacle-print hem, a wide black sun hat and cat-eye sunglasses. Face and build come from the Kraken robes."}]);
  /* Date Night */
  it("top","satin slip dress with a plunging cowl neckline and a high thigh slit","US","glam,sweet");
  START.add("Academy Date Night",[{id:"krakendate",base:"krakenrobes",name:"Kraken date night",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"flustered, blushing smile",posture:"nervous hair-twirling posture",blushStyle:"deep blush across the cheeks, nose and ears"},more:[],nude:true,tags:["date night","first date","shy","flustered"],
    outfit:{oname:"Date night",look:"glam",items:{top:["satin slip dress with a plunging cowl neckline and a high thigh slit","@secondary"],neckAccessory:["pearl choker"],
      earAccessory:["pearl drop earrings"],hipAccessory:["mini clutch bag","@primary"]},details:{},dcol:{}},
    blurb:"A deep-violet satin slip dress for a first date, the cool, aloof girl for once flustered and blushing. Face and build come from the Kraken robes."}]);
  /* Sports Day: water polo */
  it("top","micro water polo swimsuit with a plunging neckline and cutout sides","L","sporty,boudoir");
  it("headwear","water polo cap with ear guards","CU","sporty");
  START.add("Academy Sports Day",[{id:"krakensports",base:"krakenrobes",name:"Kraken sports day",out:{framing:"full body",must:MUST},drop:[],
    c:{expression:"confident smile",posture:"hip-popped sultry stance",skinFinish:"wet, sweat-glistening skin",blushStyle:"flushed cheeks and chest"},more:[],nude:true,tags:["sports day","gym","athlete","water polo"],
    outfit:{oname:"Water polo",look:"sporty",items:{top:["micro water polo swimsuit with a plunging neckline and cutout sides","@primary"],headwear:["water polo cap with ear guards","@third"]},
      details:{detailThree:"wet, sweat-glistening look"},dcol:{}},
    blurb:"Water polo for Kraken, dripping and barely covered: a micro plunging water polo suit and a teal cap with ear guards. Face and build come from the Kraken robes."}]);
  /* First Time */
  START.add("Academy First Time",[{id:"krakenfirst",base:"krakenrobes",name:"Kraken first time",out:{framing:"full body",must:MUST},drop:[],
    c:{age:"woman",expression:"nervous, lust-clouded gaze",posture:"lying back on the bed, trembling with anticipation",skinFinish:"dewy flushed skin",blushStyle:"flushed from cheeks to collarbones",
      lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},
    more:[{oname:"Undressing",look:"boudoir",items:{bra:["sheer lace plunge bra","@secondary"],panties:["sheer lace thong","@secondary"],outerwear:["sheer robe slipping off both shoulders","@primary"],
      legwear:["sheer seamed thigh-high stockings","@primary"],neckAccessory:["pearl choker"]},details:{detailTwo:"delicate straps slipping off the shoulders"},dcol:{}}],nude:true,
    tags:["first time","nervous","aroused","bedroom"],
    outfit:{oname:"First time",look:"boudoir",items:{legwear:["sheer seamed thigh-high stockings","@primary"],thighAccessory:["pearl thigh chain","@extra"],neckAccessory:["pearl choker"]},details:{},dcol:{}},
    blurb:"Moments before her first time: Kraken black palette, the cool, aloof girl suddenly trembling on the bed in only stockings, a pearl thigh chain and a choker, nervous but wanting it. Intimate details on show, plus Undressing and Nude outfits. Face and build come from the Kraken robes."}]);
})();

/* ---- v148: the Lovebird house replaces Peacock (same place in the house order, between Fox and Flamingo).
   Early block: runs after the base's Academy sets and before the batch sets. It swaps the house name in ACAD.HOUSES,
   replaces the Peacock robes, headmistress and base-defined set entries in place, and registers every item and option
   the Lovebird rows in the later blocks use.
   The Lovebird girl is built from Danbooru tags chosen for "adorable" rather than raw popularity:
     hair   orange hair (357k) in a pastel creamsicle tint, two-tone/colored inner hair (231k) in cream and powder blue,
            twintails (1.0M) with hair bows (bow 1.8M), ahoge (761k), very long, voluminous hair
   v149: the robes girl is the owner's own tuned version (high twintails, very long voluminous hair, powder-blue inner hair,
   large perky breasts).
     eyes   tareme, the gentle drooping eye (58k; its top co-tags are happy, light blush and :d), sparkling eyes,
            mint green (green eyes 974k) for the lovebird's green feathers
     face   dot nose (102k, the most common co-tag of tareme), blush stickers (100k), light blush, dimples
     mood   :d (863k), happy (141k), ^_^ closed-eye smile (107k), :3 cat mouth (114k)
     wear   frills (786k), puffy sleeves (341k), bows and ribbons, polka dots
   "pastel colors" itself is a small tag (4.9k) and "orange theme" only 5.3k, so the palette is carried by named colours
   instead: creamsicle orange, cream, soft peach, mint green and powder blue (the peach-faced lovebird's face, body and rump). */
(function(){
  const OLD="peacock",H="lovebird";
  const hi=ACAD.HOUSES.indexOf(OLD);if(hi>=0)ACAD.HOUSES[hi]=H;else if(!ACAD.HOUSES.includes(H))ACAD.HOUSES.splice(11,0,H);
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"CU",fam||"sweet,casual"));
  const op=(f,list,g)=>list.forEach(v=>START.option(f,v,g||"Sweet"));
  /* replace an old entry in place, keeping its spot in the group */
  function swap(label,oldId,e){
    const g=PRESET_GROUPS.start.find(x=>x.label===label);const at=g?g.keys.indexOf(oldId):-1;
    const ti=TEMPLATES.findIndex(t=>t.id===oldId);if(ti>=0)TEMPLATES.splice(ti,1);
    PRESET_GROUPS.start.forEach(x=>{x.keys=x.keys.filter(k=>k!==oldId)});
    START.add(label,[e]);
    if(g&&at>=0){g.keys=g.keys.filter(k=>k!==e.id);g.keys.splice(at,0,e.id)}
  }
  ACAD.swap=swap;

  /* ---------- options ---------- */
  op("eyeShape",["large, gently drooping tareme eyes"]);
  /* options and items that later blocks also register, needed here first */
  op("eyeShape",["calm, slightly drooping eyes"]);op("buttSize",["soft, round butt"]);
  op("expression",["gentle, loving smile","playful wink","sweet, giggly smile with her tongue out","dreamy, overwhelmed, heart-eyed smile"]);
  it("heldItem",["tennis racket"],"CU","sporty");
  op("bangs",["cute wispy bangs and a little ahoge"]);
  op("hairStyle",["fluffy low twintails tied with ribbon bows"]);
  op("blushStyle",["cute blush stickers across the cheeks"]);
  op("lipFinish",["sheer peach lip gloss"]);
  op("expression",["doting, teasing smile","bubbly, guilty grin","giggling, heart-eyed moan","wobbly, tearful little smile"]);
  op("posture",["lying on her stomach, kicking her feet in the air","hugging a pillow in rumpled sheets","making a heart with her hands, winking",
    "saluting with a cheerful wink","curtsying with her skirt held out","lying on a bakery counter, decorated like a dessert",
    "lying on a blanket under orange blossoms, nose to nose with her lover","lying back on a picnic blanket, a popsicle dripping on her breasts",
    "kneeling on a giant cream-puff cushion, licking cream off one finger","sitting in a bubble bath with a rubber duck between her legs",
    "swinging in a giant gilded birdcage, legs spread","stuck in a wooden pillory, laughing helplessly","standing at an ice cream truck window, pointing at the menu",
    "sitting on a rumbling washing machine, legs apart","riding her lover in a swan boat in a tunnel of love","kneeling at a shared headstone, holding a wedding photo",
    "leaning on a bridge railing covered in love locks","sitting on the kitchen floor beside a gift box"]);

  /* ---------- items ---------- */
  it("top",["frilled puff-sleeve blouse","frilled bikini with {c2} polka-dot bows","tiered tulle ballgown with {c2} ribbon bows and puffy off-shoulder sleeves",
    "oversized {c} hoodie worn as a dress","fluffy lovebird hooded onesie with little wings on the sleeves","frilly bunny leotard with {c2} polka-dot bows and a heart cutout",
    "fluffy feathered bikini top","{c} gingham sundress with puffy sleeves","{c} off-shoulder dress with puffy sleeves and a sweetheart neckline",
    "micro tennis dress with a plunging neckline and a flouncy skirt","soft pussy-bow blouse","frilly puff-sleeve mini dress",
    "{c} angel dress with puffy sleeves and a big bow","fluffy cropped knit sweater with a {c2} lovebird pattern",
    "fluffy oversized cardigan with {c2} polka-dot pockets, worn over a sleep shirt","frilly puff-sleeve maid dress with a {c2} polka-dot apron bib and a sweetheart neckline",
    "yukata with a {c2} lovebird-and-orange-blossom print and a big bow obi","flowing {c} sundress","cozy {c} pajamas"],"CU","sweet,casual");
  it("bottom",["high-waisted pencil skirt","frilled latex micro skirt","high-waisted pleated mini skirt"],"CU","sweet,preppy");
  it("corset",["{c} latex corset with {c2} ribbon lacing"],"L","edgy,boudoir");
  it("legwear",["latex thigh-high stockings with bows","fuzzy {c} thigh-high socks","feathered leg warmers","thigh-high socks with bows"],"CU","sweet,casual");
  it("gloves",["long latex gloves","short {c} lace gloves"],"CU","sweet,glam");
  it("neckAccessory",["oversized ribbon bow at the collar","ribbon choker with a heart lock"],"CU","sweet");
  it("headwear",["ribbon bows tied at the twintails","pearl hairband with a big bow","feather hair clips","straw sun hat with a ribbon"],"CU","sweet");
  it("tagCharm",["small lovebird crest badge","lovebird crest brooch"],"CU","preppy,costume");
  it("waistAccessory",["frilled apron with a {c2} polka-dot hem and a big bow"],"CU","sweet,cottage");
  it("heldItem",["shaved ice with orange syrup and condensed milk","tray of orange cream floats","pastel highlighter pen","bowl of whipped cream","glass of peach iced tea",
    "heart-shaped pillow","heart-shaped microphone","bubbling potion bottle","short spear with a ribbon tassel","squeeze bottle of orange sports drink",
    "orange creamsicle popsicle","plush lovebird toy","inflatable swim ring","rubber duck vibrator","wedding photo in a silver frame","padlock engraved with two initials",
    "ribbon-tied gift box"],"CU","sweet,casual");
  it("shoulderPiece",["little lovebird familiar perched on her shoulder"],"CU","costume");
  it("headwear",["halo headband"],"CU","costume");it("heldItem",["small golden harp"],"CU","costume");
  it("wingPiece",["pair of fluffy {c} feathered wings"],"CU","costume,fantasy");
  it("detailOne",["polka-dot bows","lovebird-and-feather embroidery along the hems"],"CU","sweet");
  it("detailTwo",["puffy sleeves"],"CU","sweet");
  it("bra",["frilly balconette bra with {c2} polka-dot bows"],"CU","sweet,boudoir");
  it("panties",["frilly panties with {c2} polka-dot bows"],"CU","sweet,boudoir");
  it("detailOne",["scalloped edge"],"CU","sweet");

  /* ---------- the robes girl ---------- */
  const PAL={primary:"creamsicle orange",secondary:"cream",third:"soft peach",accent:"mint green",extra:"powder blue"};
  swap("Academy","peacockrobes",{id:"lovebirdrobes",name:"Lovebird robes",
    blurb:"An adorable, bubbly young woman built from Danbooru's cutest tags: very long, voluminous creamsicle-orange high twintails with a cream underlayer and powder-blue inner hair, ribbon bows and a little ahoge, big gently drooping mint-green eyes, a button nose, blush stickers and a happy open-mouthed smile. A cream hooded robe lined in creamsicle orange over a frilled puff-sleeve blouse and creamsicle pleated skirt, a big mint ribbon bow, cream thigh-high socks with bows and a lovebird crest.",
    pal:PAL,
    c:{age:"young woman",
      faceShape:"a cute, soft round-cheeked face with delicate features",
      expression:"bubbly open-mouthed grin",
      browShape:"soft, gently curved eyebrows",
      noseShape:"delicate button nose",
      mouthShape:"small, softly shaped lips",
      impression:"an adorable, bubbly charm",
      eyeConfig:"matching",
      eyeShape:"large, gently drooping tareme eyes",
      pupilStyle:"round pupils",
      irisDetail:"sparkling irises with bright catchlights",
      lashNatural:"long, light eyelashes",
      eyeOne:"@accent",
      faceMark:"soft dimples in both cheeks",
      hairStyle:"high twin ponytails",
      hairLength:"very long",
      hairTexture:"voluminous",
      bangs:"cute wispy bangs and a little ahoge",
      hairMovement:"sways gently around her",
      hairBase:"@primary",
      hairUnderlayer:"@secondary",
      hairHighlights:"@third",
      hairBlend:"soft blended transitions between the layers",
      skinTone:"peachy fair",
      undertone:"peach",
      skinFinish:"natural skin texture with a soft rosy flush",
      markings:"no markings",
      makeupStyle:"sweet pastel makeup",
      eyelinerStyle:"soft eyeliner",
      lashStyle:"soft fluttery lashes",
      blushStyle:"cute blush stickers across the cheeks",
      lipFinish:"sheer peach lip gloss",
      nailStyle:"short manicured fingernails with heart nail art",
      nailColor:"@primary",
      bustSize:"large breasts",
      bustShape:"perky rounded shape",
      heightStature:"petite stature",
      shoulderShape:"narrow, gently rounded shoulders",
      waistShape:"soft hourglass waist",
      stomachShape:"soft tummy",
      hipShape:"softly rounded hips",
      buttSize:"soft, round butt",
      thighBuild:"thick, soft thighs",
      legShape:"soft full legs",
      bodySoftness:"plush soft build",
      handShape:"small, soft",
      nippleColor:"peachy pink",
      nippleType:"soft and rounded",
      nippleLength:"short",
      areolaColor:"peachy pink",
      areolaType:"puffy",
      areolaSize:"medium-sized",
      vaginaColor:"soft pink",
      vaginaType:"smooth and closed",
      pubicHair:"a small heart-shaped patch of pubic hair",
      hairInner:"powder blue"},
    outfit:{oname:"Robe, blouse and pleated skirt",look:"costume",items:{top:["frilled puff-sleeve blouse","white"],bottom:["high-waisted pleated mini skirt","@primary"],
      outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["oversized ribbon bow at the collar","@accent"],
      legwear:["thigh-high socks with bows","@secondary"],headwear:["ribbon bows tied at the twintails","@accent"],tagCharm:["small lovebird crest badge","@primary"]},
      details:{detailOne:"polka-dot bows",detailTwo:"puffy sleeves"},dcol:{}},
    nude:true,tags:["academy","robes","lovebird","cute","pastel"],out:{framing:"full body",must:MUST}});

  /* ---------- the headmistress ---------- */
  swap("Academy Headmistresses","peacockhead",{id:"lovebirdhead",name:"Lovebird headmistress",
    blurb:"The faculty's sweetheart: a warm, curvy mature headmistress with long, soft creamsicle waves half pinned up with a ribbon, gentle drooping mint eyes behind round glasses, peachy skin, dimples and a doting smile. A cream academic gown with creamsicle velvet facings over a soft-peach pussy-bow blouse and a cream pencil skirt, with pearl earrings, seamed stockings and a lovebird crest brooch.",
    pal:PAL,
    c:{age:"mature woman",faceShape:"soft oval face with gentle cheekbones",expression:"gentle, loving smile",browShape:"soft, gently curved eyebrows",noseShape:"small, softly rounded nose",
      mouthShape:"soft full lips",impression:"an elegant, mature presence",eyeConfig:"matching",eyeShape:"calm, slightly drooping eyes",pupilStyle:"round pupils",
      irisDetail:"rich, softly detailed irises",lashNatural:"long, light eyelashes",eyeOne:"@accent",faceMark:"soft dimples in both cheeks",
      hairStyle:"half-up ponytail with soft waves and curled ends",hairLength:"waist-length",hairTexture:"thick, smooth, softly wavy and voluminous",bangs:"soft curtain bangs",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairHighlights:"@third",hairBlend:"soft blended transitions between the layers",
      skinTone:"peachy fair",undertone:"peach",skinFinish:"natural skin texture with a warm, healthy glow",markings:"no markings",
      makeupStyle:"soft glam makeup",eyelinerStyle:"soft eyeliner",lipFinish:"soft satin lips",nailStyle:"short manicured glossy fingernails with heart and flower nail art",nailColor:"@third",
      bustSize:"very large breasts",bustShape:"full, soft, naturally sloping shape",heightStature:"average height",waistShape:"softly cinched waist",hipShape:"wide, flared hips with soft fullness",
      buttSize:"soft, full, rounded butt",thighBuild:"full, soft thighs tapering to the knees",legShape:"soft, full legs tapering to slim ankles",
      bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"elegant posture",
      nippleColor:"peachy pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"peachy pink",areolaType:"smooth",areolaSize:"large",
      vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"a neatly trimmed patch of pubic hair"},
    outfit:{oname:"Headmistress robes",look:"preppy",items:{top:["soft pussy-bow blouse","@third"],bottom:["high-waisted pencil skirt","@secondary"],
      outerwear:["long {c} academic gown with {c2} velvet facings","@secondary",null,"@primary"],eyewear:["round glasses","gold"],earAccessory:["pearl drop earrings","-"],
      legwear:["seamed stockings","@secondary"],tagCharm:["lovebird crest brooch","@primary"]},details:{detailOne:"lovebird-and-feather embroidery along the hems"},dcol:{}},
    nude:true,tags:["headmistress","lovebird"],out:{framing:"full body",must:MUST}});

  /* ---------- the base-defined sets ---------- */
  const INTIMATE=["nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","pubicHair"];
  const E=(id,name,c,items,o)=>Object.assign({id,base:"lovebirdrobes",name,out:{framing:"full body",must:MUST},drop:[],c,more:[],nude:true},o||{},{outfit:Object.assign({details:{},dcol:{}},items)});
  /* Cheerleaders: like every house, no Nude outfit or intimate details (the cheer uniform is youth-coded to the safeguard) */
  swap("Academy Cheerleaders","peacockcheer",E("lovebirdcheer","Lovebird cheer",{expression:"bubbly open-mouthed grin",posture:"light playful posture"},
    {oname:"Cheer uniform",look:"costume",items:{top:["fitted cheer crop top","@primary"],bottom:["pleated cheer skirt","@secondary"],legwear:["over-the-knee athletic socks","@secondary"],
      tagCharm:["small lovebird crest badge","@accent"],headwear:["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","@accent",null,"@primary"]},
      details:{detailOne:"contrast piping and a bold varsity-style number",detailTwo:"athletic fit"}},
    {drop:INTIMATE,nude:false,tags:["cheerleader","cheer squad"],blurb:"Creamsicle cheer crop top, cream pleated skirt and over-the-knee socks, with oversized mint hair bows on her twintails and a lovebird crest badge. Hair, face and build come from the Lovebird robes."}));
  swap("Academy Swim Team","peacockswim",E("lovebirdswim","Lovebird swim",{skinFinish:"wet skin with water droplets",expression:"bubbly open-mouthed grin",posture:"light playful posture"},
    {oname:"Swimsuit",look:"swimwear",items:{top:["frilled bikini with {c2} polka-dot bows","@primary",null,"@secondary"],heldItem:["inflatable swim ring","@accent"]},
      details:{detailOne:"polka-dot bows",detailThree:"wet, glistening spandex finish"}},
    {tags:["swimsuit","swim team"],blurb:"A frilled creamsicle bikini with cream polka-dot bows and a mint swim ring, dripping wet. Face, skin and build come from the Lovebird robes."}));
  swap("Academy Ballgowns","peacockgown",E("lovebirdgown","Lovebird ballgown",{hairStyle:"fluffy twin buns",expression:"sparkling-eyed excited expression",posture:"curtsying with her skirt held out"},
    {oname:"Ballgown",look:"glam",items:{top:["tiered tulle ballgown with {c2} ribbon bows and puffy off-shoulder sleeves","@third",null,"@accent"],headwear:["pearl hairband with a big bow","@secondary"],
      gloves:["short {c} lace gloves","@secondary"],neckAccessory:["ribbon choker","@accent"]},details:{detailOne:"polka-dot bows",detailThree:"lustrous silk satin finish"}},
    {drop:["hairMovement"],tags:["ballgown","formal","cute"],blurb:"A tiered soft-peach tulle ballgown with mint ribbon bows and puffy off-shoulder sleeves, lace gloves and a pearl hairband, curtsying. Hair is put up in fluffy buns; face and build come from the Lovebird robes."}));
  swap("Academy Day Off","peacockdayoff",E("lovebirddayoff","Lovebird day off",{expression:"tiny cat-mouth smile",posture:"light playful posture"},
    {oname:"Day off",look:"casual",items:{top:["oversized {c} hoodie worn as a dress","@primary"],legwear:["fuzzy {c} thigh-high socks","@secondary"],heldItem:["orange creamsicle popsicle"],
      headwear:["ribbon bows tied at the twintails","@accent"]},details:{detailTwo:"slouchy off-the-shoulder fit"}},
    {tags:["day off","loungewear","cozy","cute"],blurb:"Off duty in a creamsicle hoodie worn as a dress, fuzzy cream thigh-highs and an orange creamsicle popsicle, with a little :3 smile. Face and build come from the Lovebird robes."}));
  swap("Academy Pajama Day","peacockpajama",E("lovebirdpajama","Lovebird pajama day",{expression:"happy closed-eye smile",posture:"light playful posture"},
    {oname:"Pajamas",look:"sweet",items:{top:["fluffy lovebird hooded onesie with little wings on the sleeves","@primary"],legwear:["fuzzy slipper socks","@secondary"],
      heldItem:["plush lovebird toy","@accent","hugged tightly to her chest"]},details:{detailOne:"scalloped edge",detailThree:"soft fleece texture"}},
    {tags:["pajamas","pajama day","cozy","cute"],blurb:"A fluffy creamsicle lovebird onesie with little wings, fuzzy slipper socks and a plush lovebird hugged close. Face and build come from the Lovebird robes."}));
  swap("Academy Bunny Girls","peacockbunny",E("lovebirdbunny","Lovebird bunny",{expression:"playful wink",posture:"light playful posture"},
    {oname:"Bunny",look:"glam",items:{top:["frilly bunny leotard with {c2} polka-dot bows and a heart cutout","@primary",null,"@secondary"],legwear:["sheer seamed thigh-high stockings","@secondary"],
      headwear:["tall upright bunny ear headband","@primary"],neckAccessory:["detached {c} collar with a bow tie","@accent"],wristAccessory:["wrist cuffs with a bow","@accent"],
      tailPiece:["fluffy bunny tail attached at the lower back"]},details:{detailOne:"polka-dot bows",detailThree:"glossy satin finish"}},
    {tags:["bunny girl","bunny suit","playboy bunny"],blurb:"A frilly creamsicle bunny leotard with cream polka-dot bows and a heart cutout, bunny ears, a mint collar and cuffs, winking. Face and build come from the Lovebird robes."}));
  swap("Academy Monster Girls","peacockmonster",E("lovebirdmonster","Lovebird monster",{expression:"sparkling-eyed excited expression",posture:"light playful posture"},
    {oname:"Harpy",look:"costume",items:{top:["fluffy feathered bikini top","@primary"],wingPiece:["pair of fluffy {c} feathered wings","@primary"],legwear:["feathered leg warmers","@accent"],
      headwear:["feather hair clips","@accent"]},details:{}},
    {tags:["monster girl","harpy","costume"],blurb:"A fluffy lovebird harpy: a creamsicle feathered bikini top, big fluffy wings, mint feathered leg warmers and feather hair clips. Face and build come from the Lovebird robes."}));
  swap("Academy Summer Days","peacocksummer",E("lovebirdsummer","Lovebird summer day",{expression:"happy closed-eye smile",posture:"light playful posture"},
    {oname:"Summer day",look:"resort",items:{top:["{c} gingham sundress with puffy sleeves","@primary"],headwear:["straw sun hat with a ribbon","@accent"],heldItem:["orange creamsicle popsicle"],
      legwear:["strappy flat sandals","@secondary"]},details:{detailOne:"ruffle trim"}},
    {tags:["summer","sundress","sun hat"],blurb:"A creamsicle gingham sundress with puffy sleeves, a straw hat with a mint ribbon and a melting creamsicle popsicle. Face and build come from the Lovebird robes."}));
  swap("Academy Date Night","peacockdate",E("lovebirddate","Lovebird date night",{expression:"flustered, blushing smile",posture:"shy clasped-hands posture"},
    {oname:"Date night",look:"sweet",items:{top:["{c} off-shoulder dress with puffy sleeves and a sweetheart neckline","@third"],neckAccessory:["ribbon choker","@accent"],
      earAccessory:["small pearl earrings","-"],hipAccessory:["mini clutch bag","@secondary"]},details:{}},
    {tags:["date night","first date","shy","flustered"],blurb:"A soft-peach off-shoulder dress with puffy sleeves for a first date, a mint ribbon choker, and a very flustered blush. Face and build come from the Lovebird robes."}));
  swap("Academy Sports Day","peacocksports",E("lovebirdsports","Lovebird sports day",{expression:"bubbly open-mouthed grin",posture:"hip-popped sultry stance",skinFinish:"wet, sweat-glistening skin",blushStyle:"flushed cheeks and chest"},
    {oname:"Tennis",look:"sporty",items:{top:["micro tennis dress with a plunging neckline and a flouncy skirt","@secondary"],headwear:["sports headband","@primary"],heldItem:["tennis racket"],
      legwear:["thigh-high socks with bows","@secondary"]},details:{detailThree:"wet, sweat-glistening look"}},
    {tags:["sports day","tennis","athlete"],blurb:"Tennis for Lovebird, sweaty and barely covered: a micro plunging cream tennis dress with a flouncy skirt, a creamsicle headband and a racket. Face and build come from the Lovebird robes."}));
  swap("Academy First Time","peacockfirst",E("lovebirdfirst","Lovebird first time",{age:"woman",expression:"nervous, lust-clouded gaze",posture:"lying back on the bed, trembling with anticipation",
      skinFinish:"dewy flushed skin",blushStyle:"flushed from cheeks to collarbones",lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},
    {oname:"First time",look:"boudoir",items:{legwear:["thigh-high socks with bows","@secondary"],thighAccessory:["lace thigh garter","@accent"],neckAccessory:["ribbon choker","@accent"]}},
    {more:[{oname:"Undressing",look:"boudoir",items:{bra:["frilly balconette bra with {c2} polka-dot bows","@primary",null,"@secondary"],panties:["frilly panties with {c2} polka-dot bows","@primary",null,"@secondary"],
      legwear:["thigh-high socks with bows","@secondary"],neckAccessory:["ribbon choker","@accent"]},details:{detailTwo:"delicate straps slipping off the shoulders"},dcol:{}}],
     tags:["first time","nervous","aroused","bedroom"],
     blurb:"Moments before her first time: the bubbly girl suddenly trembling on the bed in only her bow-trimmed socks, a mint garter and a ribbon choker, nervous but wanting it. Intimate details on show, plus Undressing and Nude outfits. Face and build come from the Lovebird robes."}));
})();

/* ===== v150: popular Danbooru tags (data only) =====
   100 additions taken from Danbooru general tags ranked by post count (a1111 tagcomplete list, July 2026),
   kept only when the tag fits an existing field and the studio had no option for it yet.
   Character options go in the "Popular tags" group; outfit details and items use the usual tiers. */
(function(){
  const G="Popular tags",O=(f,v)=>START.option(f,v,G),I=(f,v,t,fam)=>START.item(f,v,t,fam);
  const DANBOORU_TAGS=[];
  O("expression","slightly open mouth");DANBOORU_TAGS.push(["open_mouth","expression","slightly open mouth"]); /* #8 */
  I("detailTwo","long sleeves","CUS");DANBOORU_TAGS.push(["long_sleeves","detailTwo","long sleeves"]); /* #14 */
  O("earStyle","fluffy animal ears");DANBOORU_TAGS.push(["animal_ears","earStyle","fluffy animal ears"]); /* #29 */
  O("expression","closed-mouth smile");DANBOORU_TAGS.push(["closed_mouth","expression","closed-mouth smile"]); /* #30 */
  O("bangs","bangs with hair between the eyes");DANBOORU_TAGS.push(["hair_between_eyes","bangs","bangs with hair between the eyes"]); /* #32 */
  O("expression","serene expression with closed eyes");DANBOORU_TAGS.push(["closed_eyes","expression","serene expression with closed eyes"]); /* #33 */
  I("detailTwo","short sleeves","CUS");DANBOORU_TAGS.push(["short_sleeves","detailTwo","short sleeves"]); /* #44 */
  O("expression","happy :d smile");DANBOORU_TAGS.push([":d","expression","happy :d smile"]); /* #52 */
  O("posture","lying down");DANBOORU_TAGS.push(["lying","posture","lying down"]); /* #61 */
  I("detailTwo","a sleeveless cut","CUS");DANBOORU_TAGS.push(["sleeveless","detailTwo","a sleeveless cut"]); /* #66 */
  I("detailTwo","detached sleeves","CUS");DANBOORU_TAGS.push(["detached_sleeves","detailTwo","detached sleeves"]); /* #72 */
  O("posture","raising one hand");DANBOORU_TAGS.push(["hand_up","posture","raising one hand"]); /* #90 */
  O("fangClawStyle","a single cute fang");DANBOORU_TAGS.push(["fang","fangClawStyle","a single cute fang"]); /* #95 */
  O("posture","sitting with her legs spread");DANBOORU_TAGS.push(["spread_legs","posture","sitting with her legs spread"]); /* #104 */
  O("hairBlend","a two-tone color split with a contrasting underlayer");DANBOORU_TAGS.push(["two-tone_hair","hairBlend","a two-tone color split with a contrasting underlayer"]); /* #113 */
  O("expression","nervous smile with a sweatdrop");DANBOORU_TAGS.push(["sweatdrop","expression","nervous smile with a sweatdrop"]); /* #120 */
  O("posture","raising one arm");DANBOORU_TAGS.push(["arm_up","posture","raising one arm"]); /* #127 */
  O("earStyle","animal ears with fluffy ear fluff");DANBOORU_TAGS.push(["animal_ear_fluff","earStyle","animal ears with fluffy ear fluff"]); /* #139 */
  O("bangs","parted bangs");DANBOORU_TAGS.push(["parted_bangs","bangs","parted bangs"]); /* #151 */
  O("posture","raising both arms");DANBOORU_TAGS.push(["arms_up","posture","raising both arms"]); /* #155 */
  O("expression","surprised :o mouth");DANBOORU_TAGS.push([":o","expression","surprised :o mouth"]); /* #160 */
  O("posture","holding both hands up");DANBOORU_TAGS.push(["hands_up","posture","holding both hands up"]); /* #167 */
  I("detailTwo","puffy short sleeves","CUS");DANBOORU_TAGS.push(["puffy_short_sleeves","detailTwo","puffy short sleeves"]); /* #172 */
  O("browShape","v-shaped eyebrows");DANBOORU_TAGS.push(["v-shaped_eyebrows","browShape","v-shaped eyebrows"]); /* #176 */
  O("hairStyle","two side up");DANBOORU_TAGS.push(["two_side_up","hairStyle","two side up"]); /* #181 */
  I("detailTwo","sleeves past the wrists","CUS");DANBOORU_TAGS.push(["sleeves_past_wrists","detailTwo","sleeves past the wrists"]); /* #187 */
  I("detailTwo","clothing cutouts","CUS");DANBOORU_TAGS.push(["clothing_cutout","detailTwo","clothing cutouts"]); /* #191 */
  I("detailTwo","a strapless neckline","CUS");DANBOORU_TAGS.push(["strapless","detailTwo","a strapless neckline"]); /* #198 */
  O("posture","standing with one hand on her hip");DANBOORU_TAGS.push(["hand_on_own_hip","posture","standing with one hand on her hip"]); /* #205 */
  O("expression","cheerful smile with just the upper teeth showing");DANBOORU_TAGS.push(["upper_teeth_only","expression","cheerful smile with just the upper teeth showing"]); /* #214 */
  O("posture","making a peace sign");DANBOORU_TAGS.push(["v","posture","making a peace sign"]); /* #220 */
  O("posture","tilting her head");DANBOORU_TAGS.push(["head_tilt","posture","tilting her head"]); /* #225 */
  I("neckAccessory","neck ribbon tied in a bow","CU","sweet,preppy");DANBOORU_TAGS.push(["neck_ribbon","neckAccessory","neck ribbon tied in a bow"]); /* #232 */
  I("detailOne","a plaid pattern","CUS");DANBOORU_TAGS.push(["plaid","detailOne","a plaid pattern"]); /* #240 */
  O("skinFinish","a shiny, glossy sheen");DANBOORU_TAGS.push(["shiny_skin","skinFinish","a shiny, glossy sheen"]); /* #244 */
  O("expression","expressionless face");DANBOORU_TAGS.push(["expressionless","expression","expressionless face"]); /* #251 */
  I("outerwear","short capelet","CUS","sweet,gothic,cottage");DANBOORU_TAGS.push(["capelet","outerwear","short capelet"]); /* #262 */
  O("bangs","hair intakes");DANBOORU_TAGS.push(["hair_intakes","bangs","hair intakes"]); /* #265 */
  O("expression","slight frown");DANBOORU_TAGS.push(["frown","expression","slight frown"]); /* #281 */
  O("hairStyle","one side up");DANBOORU_TAGS.push(["one_side_up","hairStyle","one side up"]); /* #290 */
  I("top","layered frilled dress","CUS","sweet,cottage");DANBOORU_TAGS.push(["frilled_dress","top","layered frilled dress"]); /* #318 */
  O("hairStyle","drill hair ringlets");DANBOORU_TAGS.push(["drill_hair","hairStyle","drill hair ringlets"]); /* #330 */
  I("detailOne","a floral print","CUS");DANBOORU_TAGS.push(["floral_print","detailOne","a floral print"]); /* #344 */
  O("posture","lying on her side");DANBOORU_TAGS.push(["on_side","posture","lying on her side"]); /* #351 */
  O("posture","holding her arms behind her back");DANBOORU_TAGS.push(["arms_behind_back","posture","holding her arms behind her back"]); /* #362 */
  O("posture","squatting");DANBOORU_TAGS.push(["squatting","posture","squatting"]); /* #380 */
  I("detailTwo","a cleavage cutout","CUS");DANBOORU_TAGS.push(["cleavage_cutout","detailTwo","a cleavage cutout"]); /* #479 */
  O("posture","sitting in wariza on the floor");DANBOORU_TAGS.push(["wariza","posture","sitting in wariza on the floor"]); /* #483 */
  O("posture","standing on one leg");DANBOORU_TAGS.push(["standing_on_one_leg","posture","standing on one leg"]); /* #488 */
  O("pupilStyle","bright pupils");DANBOORU_TAGS.push(["bright_pupils","pupilStyle","bright pupils"]); /* #490 */
  O("posture","lifting one leg");DANBOORU_TAGS.push(["leg_up","posture","lifting one leg"]); /* #495 */
  O("expression","flustered wavy mouth");DANBOORU_TAGS.push(["wavy_mouth","expression","flustered wavy mouth"]); /* #502 */
  O("thighBuild","slim thighs with a thigh gap");DANBOORU_TAGS.push(["thigh_gap","thighBuild","slim thighs with a thigh gap"]); /* #511 */
  O("bangs","antenna hair strands");DANBOORU_TAGS.push(["antenna_hair","bangs","antenna hair strands"]); /* #515 */
  O("hairStyle","sidelocks wrapped in hair tubes");DANBOORU_TAGS.push(["hair_tubes","hairStyle","sidelocks wrapped in hair tubes"]); /* #519 */
  O("posture","sitting with her legs crossed");DANBOORU_TAGS.push(["crossed_legs","posture","sitting with her legs crossed"]); /* #520 */
  O("hairBlend","brightly colored inner hair layers");DANBOORU_TAGS.push(["colored_inner_hair","hairBlend","brightly colored inner hair layers"]); /* #522 */
  I("detailTwo","frilled sleeves","CUS");DANBOORU_TAGS.push(["frilled_sleeves","detailTwo","frilled sleeves"]); /* #524 */
  O("bangs","bangs with the eyes visible through the hair");DANBOORU_TAGS.push(["eyes_visible_through_hair","bangs","bangs with the eyes visible through the hair"]); /* #532 */
  I("headwear","frilled mob cap","CU","cottage,sweet");DANBOORU_TAGS.push(["mob_cap","headwear","frilled mob cap"]); /* #534 */
  O("expression","light smile");DANBOORU_TAGS.push(["light_smile","expression","light smile"]); /* #540 */
  I("earAccessory","small {c} ear piercings","CUS","edgy,casual");DANBOORU_TAGS.push(["ear_piercing","earAccessory","small {c} ear piercings"]); /* #548 */
  O("expression","tense expression with clenched teeth");DANBOORU_TAGS.push(["clenched_teeth","expression","tense expression with clenched teeth"]); /* #572 */
  I("detailTwo","juliet sleeves","CUS");DANBOORU_TAGS.push(["juliet_sleeves","detailTwo","juliet sleeves"]); /* #574 */
  O("posture","stretching both arms out");DANBOORU_TAGS.push(["outstretched_arms","posture","stretching both arms out"]); /* #576 */
  O("expression","winking ;d grin");DANBOORU_TAGS.push([";d","expression","winking ;d grin"]); /* #580 */
  O("posture","pointing at the viewer");DANBOORU_TAGS.push(["pointing","posture","pointing at the viewer"]); /* #597 */
  O("posture","reaching one arm out");DANBOORU_TAGS.push(["outstretched_arm","posture","reaching one arm out"]); /* #598 */
  O("expression","flustered >_< face");DANBOORU_TAGS.push([">_<","expression","flustered >_< face"]); /* #603 */
  O("wingStyle","small head wings");DANBOORU_TAGS.push(["head_wings","wingStyle","small head wings"]); /* #611 */
  O("pupilStyle","white pupils");DANBOORU_TAGS.push(["white_pupils","pupilStyle","white pupils"]); /* #614 */
  I("detailOne","an animal print","CUS");DANBOORU_TAGS.push(["animal_print","detailOne","an animal print"]); /* #619 */
  I("detailOne","a wing collar","CUS");DANBOORU_TAGS.push(["wing_collar","detailOne","a wing collar"]); /* #622 */
  I("detailOne","multicolored color-blocked panels","CUS");DANBOORU_TAGS.push(["multicolored_clothes","detailOne","multicolored color-blocked panels"]); /* #624 */
  O("posture","resting a hand on her chest");DANBOORU_TAGS.push(["hand_on_own_chest","posture","resting a hand on her chest"]); /* #625 */
  I("headwear","sunglasses pushed up on the head","CU","casual,resort");DANBOORU_TAGS.push(["eyewear_on_head","headwear","sunglasses pushed up on the head"]); /* #626 */
  O("hairStyle","short twintails");DANBOORU_TAGS.push(["short_twintails","hairStyle","short twintails"]); /* #629 */
  I("top","strapless leotard","LS","glam,boudoir");DANBOORU_TAGS.push(["strapless_leotard","top","strapless leotard"]); /* #631 */
  O("fangClawStyle","a small skin fang");DANBOORU_TAGS.push(["skin_fang","fangClawStyle","a small skin fang"]); /* #646 */
  I("detailTwo","puffy long sleeves","CUS");DANBOORU_TAGS.push(["puffy_long_sleeves","detailTwo","puffy long sleeves"]); /* #648 */
  O("expression","darkly shaded face");DANBOORU_TAGS.push(["shaded_face","expression","darkly shaded face"]); /* #657 */
  I("legwear","single {c} thighhigh","CUS","edgy,sweet");DANBOORU_TAGS.push(["single_thighhigh","legwear","single {c} thighhigh"]); /* #663 */
  I("headwear","wide-brimmed hat with a hat bow","CU","resort,cottage");DANBOORU_TAGS.push(["hat_bow","headwear","wide-brimmed hat with a hat bow"]); /* #666 */
  O("bangs","crossed bangs");DANBOORU_TAGS.push(["crossed_bangs","bangs","crossed bangs"]); /* #668 */
  I("top","china dress with side slits","US","glam");DANBOORU_TAGS.push(["china_dress","top","china dress with side slits"]); /* #676 */
  I("heldItem","acoustic guitar","CU","casual");DANBOORU_TAGS.push(["instrument","heldItem","acoustic guitar"]); /* #678 */
  I("headwear","hair bobbles","CU","sweet,casual");DANBOORU_TAGS.push(["hair_bobbles","headwear","hair bobbles"]); /* #680 */
  O("posture","sitting with her knees up");DANBOORU_TAGS.push(["knees_up","posture","sitting with her knees up"]); /* #682 */
  I("detailTwo","a pelvic curtain","CUS");DANBOORU_TAGS.push(["pelvic_curtain","detailTwo","a pelvic curtain"]); /* #730 */
  O("noseShape","tiny dot nose");DANBOORU_TAGS.push(["dot_nose","noseShape","tiny dot nose"]); /* #755 */
  O("hairStyle","twin drills");DANBOORU_TAGS.push(["twin_drills","hairStyle","twin drills"]); /* #767 */
  I("detailTwo","sleeves past the fingers","CUS");DANBOORU_TAGS.push(["sleeves_past_fingers","detailTwo","sleeves past the fingers"]); /* #769 */
  O("posture","resting a hand on her cheek");DANBOORU_TAGS.push(["hand_on_own_face","posture","resting a hand on her cheek"]); /* #773 */
  I("detailOne","gold trim","CUS");DANBOORU_TAGS.push(["gold_trim","detailOne","gold trim"]); /* #793 */
  O("expression","angry scowl");DANBOORU_TAGS.push(["angry","expression","angry scowl"]); /* #813 */
  I("panties","striped panties","CU","sweet,casual");DANBOORU_TAGS.push(["striped_panties","panties","striped panties"]); /* #834 */
  O("posture","clenching her fists");DANBOORU_TAGS.push(["clenched_hands","posture","clenching her fists"]); /* #863 */
  I("legwear","mary jane shoes","CU","sweet,preppy");DANBOORU_TAGS.push(["mary_janes","legwear","mary jane shoes"]); /* #877 */
  O("posture","holding a finger to her lips");DANBOORU_TAGS.push(["finger_to_mouth","posture","holding a finger to her lips"]); /* #896 */
  O("posture","sitting in seiza");DANBOORU_TAGS.push(["seiza","posture","sitting in seiza"]); /* #918 */
  try{window.DANBOORU_TAGS=DANBOORU_TAGS}catch(e){}
})();

/* ---- v151: the Salmon and Crow houses (15th and 16th, after Kraken). The robes girls are the owner's own designs (Oct 14).
   Early block: runs after the base's Academy sets and before the batch sets, so every later set can include them.
   Adds: ACAD.HOUSES "salmon" and "crow", their robes, the hidden Crow base for her sets, their headmistresses,
   and their entries in the base-defined sets. ---- */
(function(){
  ["salmon","crow"].forEach(h=>{if(!ACAD.HOUSES.includes(h))ACAD.HOUSES.push(h)});
  const it=(f,v,t,fam)=>START.item(f,v,t||"CU",fam||"costume,preppy");
  const op=(f,v,g)=>START.option(f,v,g||"Expression");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  /* ---------- the robes: the owner's own designs (sent Oct 14, as studio prompts) ---------- */
  it("tagCharm","small salmon crest badge","CU","preppy,costume");
  it("tagCharm","salmon crest brooch","CU","preppy,costume");
  it("tagCharm","small crow crest badge","CU","preppy,costume");
  it("tagCharm","crow crest brooch","CU","preppy,costume");
  it("detailOne","{c} scale accents","CU","preppy,costume");
  const SALMON_PAL={primary:"salmon",secondary:"porcelain",third:"oatmeal",accent:"rose gold",extra:"black"};
  const CROW_PAL={primary:"ink blue",secondary:"silvery white",third:"opal",accent:"dusty lavender",extra:"platinum"};
  const UNIFORM=(tag)=>({top:["sweater vest over a collared shirt","@accent"],bottom:["pleated mini skirt","@secondary"],legwear:["thigh-high stockings","@secondary"],
    outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@accent"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"silver"],
    tagCharm:[tag[0],tag[1]],earAccessory:["large hoop earrings","@secondary"]});
  const SALMON={id:"salmonrobes",name:"Salmon robes",
    blurb:"A voluptuous, freckled young woman with mid-thigh-length, glossy straight salmon hair over a porcelain underlayer, black inner hair, rose-gold highlights and sharp white streaks, rose-gold eyes and lashes, a beauty mark beneath one eye, peachy fair skin dusted with dark-brown freckles head to toe and sleek editorial makeup. A porcelain hooded robe lined in rose gold over a rose-gold sweater vest, a porcelain pleated mini skirt and thigh-highs, an oatmeal-and-silver striped tie and a salmon crest.",
    pal:SALMON_PAL,
    c:{age:"young woman",eyeShape:"almond-shaped eyes",irisDetail:"bright, intricately detailed irises",lashNatural:"long {c} eyelashes",lashNaturalColor:"@accent",
      eyeConfig:"matching",eyeOne:"@accent",browShape:"delicate brows",noseShape:"small nose",mouthShape:"naturally full {c} lips",mouthShapeColor:"pale pink",
      faceMark:"a small beauty mark beneath one eye",faceShape:"heart-shaped face with soft cheeks",
      hairLength:"mid-thigh length",hairTexture:"thick, straight, silky and glossy",hairStyle:"long straight hair",bangs:"long sidelocks with loose face-framing strands",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@extra",hairHighlights:"@accent",
      hairBlend:"distinct, sharply defined {c} streaks running from the roots all the way to the tips, with no gradient",hairBlendColor:"white",
      bustSize:"medium-large, full breasts",bustShape:"natural, soft, rounded shape",bustWeight:"heavy natural fullness, with a small mole on the cleavage",
      shoulderShape:"narrow shoulders",waistShape:"very narrow, defined hourglass waist with a pronounced waist-to-hip ratio",stomachShape:"soft stomach with a flat lower abdomen",
      hipShape:"wide, rounded hips with a broad pelvis and prominent hip curves",thighBuild:"very thick, soft, full thighs, thick through the upper legs",
      legShape:"long, shapely legs with thick upper legs and slender lower legs",
      bodySoftness:"voluptuous, exaggerated hourglass figure with a soft feminine body, curvy silhouette and pronounced curves",posture:"standing posture",
      bodyMarkings:"dense freckles cover the shoulders, chest, and back",
      skinTone:"peachy fair",undertone:"reddish",skinFinish:"smooth, soft, highly detailed skin with subtle shading",finishColor:"white",
      markings:"full-body {c} freckles across the face, shoulders, collarbones, chest, arms, stomach, hips, thighs and legs",markingColor:"dark brown",
      makeupStyle:"editorial makeup",eyelinerStyle:"graphic eyeliner",eyeshadowStyle:"subtle smoky eyeshadow",lashStyle:"soft fluttery lashes",blushStyle:"soft cheek blush",
      lipFinish:"soft matte lips",nailStyle:"carefully manicured fingernails",nailColor:"@primary",
      nippleColor:"peachy pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"peachy pink",areolaType:"softly blended into the skin",areolaSize:"medium-sized",
      vaginaColor:"soft pink",vaginaType:"neat with minimal labia",pubicHair:"a narrow landing strip of pubic hair"},
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:UNIFORM(["small salmon crest badge","@primary"]),
      details:{detailOne:"{c} scale accents",detailTwo:"skin-tight latex fit",detailThree:"sheer finish"},dcol:{detailOne:"@primary"}},
    nude:true,tags:["academy","robes","salmon"],out:{framing:"full body",must:MUST}};
  /* Crow robes: exactly the owner's design, kept clothed (no Nude outfit or intimate details). */
  const CROW={id:"crowrobes",name:"Crow robes",
    blurb:"A short, top-heavy young woman with long, loosely waved ink-blue hair over a silvery-white underlayer, opal inner hair and dusty-lavender highlights, luminous dusty-lavender eyes, a tiny dot nose, dimples, rosy fair skin with freckles and an extremely cute, sweet girl-next-door look. A silvery-white hooded robe lined in dusty lavender over a dusty-lavender sweater vest, a silvery-white pleated mini skirt and thigh-highs, an opal-and-silver striped tie and a crow crest.",
    pal:CROW_PAL,
    c:{age:"young woman",eyeShape:"almond-shaped eyes with double eyelids",pupilStyle:"soft oval pupils",irisDetail:"bright, clearly detailed irises",lashNatural:"long, delicate eyelashes",
      eyeConfig:"luminous matching",eyeOne:"@accent",browShape:"defined, gently arched {c} brows",browShapeColor:"@primary",noseShape:"tiny dot nose",mouthShape:"natural rosy lips",
      faceMark:"soft dimples in both cheeks",faceShape:"softly rounded youthful-looking face with full cheeks and a delicate jawline",
      impression:"an extremely cute, adorable girl-next-door look with a soft, sweet, approachable appearance and delicate features",
      hairLength:"long",hairTexture:"loose waves",hairStyle:"face-framing layered hair",bangs:"long face-framing pieces",hairMovement:"falls smoothly past the waist",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@accent",
      bustSize:"large breasts",bustShape:"exaggerated rounded shape",bustWeight:"soft natural fullness",heightStature:"short compact stature",
      shoulderShape:"narrow delicate shoulders",torsoShape:"compact torso with a softly contoured ribcage",waistShape:"petite waist",stomachShape:"flat stomach with subtly cute soft curves",
      hipShape:"smooth hourglass hips",buttSize:"large, rounded butt",thighBuild:"thick thighs",legShape:"slender gently curved legs",bodySoftness:"delicate slim figure with a top-heavy bust",
      bodyMarkings:"dense freckles cover the shoulders, chest, and back",
      skinTone:"rosy fair",undertone:"rosy",skinFinish:"natural skin texture with a soft rosy flush",markings:"light freckles across the nose",markingColor:"black",
      makeupStyle:"doll-like makeup",eyelinerStyle:"puppy-eye eyeliner",eyeshadowStyle:"soft under-eye shimmer",lashStyle:"doll-like lashes",blushStyle:"doll-like blush",
      lipFinish:"cherry-tinted gloss",nailStyle:"carefully manicured fingernails",nailColor:"@secondary"},
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:UNIFORM(["small crow crest badge","@third"]),details:{},dcol:{}},
    nude:false,tags:["academy","robes","crow"],out:{framing:"full body",must:MUST}};
  START.add("Academy",[SALMON,CROW]);
  /* Crow in nude and sexual scenes (my own line, not the studio's safeguard): the same girl with a grown-up face and makeup.
     Every Crow set entry is built on this hidden base instead of the robes (ACAD.robes("crow") → "crowbody"). */
  START.add(null,[{id:"crowbody",base:"crowrobes",name:"Crow",
    c:{faceShape:"soft oval face with gentle cheekbones",makeupStyle:"dewy makeup",lashStyle:"soft fluttery lashes",blushStyle:"soft rosy blush",
      nippleColor:"rosy pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"rosy pink",areolaType:"smooth",areolaSize:"medium-sized",
      vaginaColor:"rosy pink",vaginaType:"soft with visible inner labia",pubicHair:"a neatly trimmed patch of pubic hair"},
    nude:true,tags:["crow"],blurb:"Crow, as she appears in the academy sets.",out:{framing:"full body",must:MUST}}]);
  /* ---------- signature looks ---------- */
  op("expression","poised, self-assured smile","Sultry");
  op("expression","bright, curious little smile","Cute");
  op("expression","amused, unbothered smile","Adventure mishaps");op("expression","aloof look failing to hide a blush","Couple scenes");
  /* every outfit item used below is registered here (a no-op when it already exists), so this early block never
     depends on items that later blocks add */
  const need=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"CU",fam||"costume,preppy"));
  need("outerwear",["sheer {c} cape","long {c} academic gown with {c2} velvet facings"]);
  need("headwear",["jeweled hair comb","straw sun hat with a ribbon","wide-brim sun hat","feather hair clips","sports headband","tall upright bunny ear headband","small jeweled tiara"]);
  need("neckAccessory",["layered delicate necklaces","pearl choker","ribbon choker","detached {c} collar with a bow tie","thin satin ribbon tied at the throat"]);
  need("top",["satin slip dress with a plunging cowl neckline and a high thigh slit","wrap-front satin blouse","soft pussy-bow blouse","fitted cheer crop top"]);
  need("bottom",["high-slit satin skirt","high-waisted pencil skirt","pleated cheer skirt"]);
  need("legwear",["seamed stockings","strappy flat sandals","wooden geta sandals","sheer seamed thigh-high stockings","over-the-knee athletic socks","fishnet thigh-high stockings"]);
  need("hipAccessory",["mini clutch bag"]);need("eyewear",["cat-eye sunglasses","round glasses"]);need("thighAccessory",["lace thigh garter"]);
  need("earAccessory",["pearl drop earrings","small pearl earrings"]);need("heldItem",["mug of hot cocoa with marshmallows","folding fan"]);
  need("earAccessory",["opal drop earrings"],"CU","glam,preppy");
  need("neckAccessory",["opal teardrop pendant on a fine chain"],"CU","glam,preppy");
  need("detailOne",["crow-feather embroidery along the hems","leaping-salmon embroidery along the hems"],"CU","preppy,costume");

  /* ---------- headmistresses ---------- */
  const SHEAD={id:"salmonhead",name:"Salmon headmistress",
    blurb:"The faculty's icon: a tall, statuesque mature headmistress with very long salmon hair swept into a twisted chignon, white streaks and black inner hair, rose-gold eyes and lashes, a beauty mark, freckles head to toe and sharp editorial makeup. A black academic gown with salmon velvet facings over a porcelain wrap blouse and black pencil skirt, seamed stockings, rose-gold hoops and a salmon crest brooch.",
    pal:SALMON_PAL,
    c:{age:"mature woman",faceShape:"long oval face with high, defined cheekbones",expression:"poised, self-assured smile",browShape:"softly arched brows",noseShape:"small straight nose",
      mouthShape:"naturally full {c} lips",mouthShapeColor:"dusty rose",impression:"a strikingly beautiful, sophisticated presence with mature elegance",
      eyeConfig:"matching",eyeShape:"slender elegant eyes",irisDetail:"bright, intricately detailed irises",lashNatural:"long {c} eyelashes",lashNaturalColor:"@accent",eyeOne:"@accent",
      faceMark:"a small beauty mark beneath one eye",hairStyle:"twisted chignon",hairLength:"very long",hairTexture:"thick, straight and glossy",bangs:"long sidelocks with loose face-framing strands",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@extra",hairHighlights:"@accent",
      hairBlend:"distinct, sharply defined {c} streaks running from the roots all the way to the tips, with no gradient",hairBlendColor:"white",
      skinTone:"peachy fair",undertone:"reddish",skinFinish:"smooth, soft, highly detailed skin with subtle shading",
      markings:"full-body {c} freckles across the face, shoulders, collarbones, chest, arms, stomach, hips, thighs and legs",markingColor:"dark brown",
      makeupStyle:"editorial makeup",eyelinerStyle:"graphic eyeliner",lipFinish:"soft matte lips",nailStyle:"long stiletto fingernails",nailColor:"@primary",
      bustSize:"very large breasts",bustShape:"full, heavy, round shape",heightStature:"tall, statuesque stature",
      waistShape:"very narrow, defined hourglass waist with a pronounced waist-to-hip ratio",hipShape:"wide, rounded hips with a broad pelvis and prominent hip curves",
      buttSize:"very full, rounded, prominently projecting butt",thighBuild:"very thick, soft, full thighs, thick through the upper legs",
      legShape:"long, shapely legs with thick upper legs and slender lower legs",bodySoftness:"tall, statuesque hourglass figure with long limbs and balanced curves",posture:"elegant posture",
      bodyMarkings:"dense freckles cover the shoulders, chest, and back",
      nippleColor:"peachy pink",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"peachy pink",areolaType:"puffy",areolaSize:"large",
      vaginaColor:"soft pink",vaginaType:"full and plump",pubicHair:"a neatly trimmed patch of pubic hair"},
    outfit:{oname:"Headmistress robes",look:"preppy",items:{top:["wrap-front satin blouse","@secondary"],bottom:["high-waisted pencil skirt","@extra"],
      outerwear:["long {c} academic gown with {c2} velvet facings","@extra",null,"@primary"],earAccessory:["large hoop earrings","@accent"],
      legwear:["seamed stockings","@extra"],tagCharm:["salmon crest brooch","@accent"]},details:{detailOne:"leaping-salmon embroidery along the hems"},dcol:{detailOne:"@accent"}},
    nude:true,tags:["headmistress","salmon"],out:{framing:"full body",must:MUST}};
  const CHEAD={id:"crowhead",name:"Crow headmistress",
    blurb:"The faculty's keeper of curiosities: a tall, softly curvy mature headmistress with a long, loose side braid of ink-blue hair over silvery white, opal and dusty lavender, luminous lavender eyes behind round silver glasses and a wry, knowing look. A long ink-blue academic gown with dusty-lavender facings over a silvery pussy-bow blouse and a high-slit skirt, an opal pendant and drop earrings, seamed stockings and a crow crest brooch.",
    pal:CROW_PAL,
    c:{age:"mature woman",faceShape:"refined, softly rounded face with high cheekbones and a gently tapered jawline",expression:"wry, knowing look",
      browShape:"defined, gently arched {c} brows",browShapeColor:"@primary",noseShape:"small straight nose",mouthShape:"soft full lips",impression:"a mysterious, enchanting presence",
      eyeConfig:"luminous matching",eyeShape:"slender elegant eyes",pupilStyle:"soft oval pupils",irisDetail:"bright, clearly detailed irises",lashNatural:"long, delicate eyelashes",eyeOne:"@accent",
      faceMark:"a small mole beneath one eye",hairStyle:"loose side braid",hairLength:"hip-length",hairTexture:"loose waves",bangs:"long face-framing pieces",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@accent",
      skinTone:"rosy fair",undertone:"rosy",skinFinish:"smooth, luminous skin",markings:"faint freckles across the nose and cheeks",
      makeupStyle:"soft glam makeup",eyelinerStyle:"soft eyeliner",lipFinish:"soft satin lips",nailStyle:"long almond fingernails",nailColor:"@extra",
      bustSize:"very large breasts",bustShape:"full, soft, naturally sloping shape",heightStature:"tall graceful stature",waistShape:"softly cinched waist",
      hipShape:"wide, flared hips with soft fullness",buttSize:"soft, full, rounded butt",thighBuild:"full, soft thighs tapering to the knees",legShape:"soft, full legs tapering to slim ankles",
      bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"elegant posture",
      nippleColor:"rosy pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"rosy pink",areolaType:"smooth",areolaSize:"large",
      vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"a neatly trimmed patch of pubic hair"},
    outfit:{oname:"Headmistress robes",look:"preppy",items:{top:["soft pussy-bow blouse","@secondary"],bottom:["high-slit satin skirt","@primary"],
      outerwear:["long {c} academic gown with {c2} velvet facings","@primary",null,"@accent"],eyewear:["round glasses","silver"],earAccessory:["opal drop earrings","-"],
      neckAccessory:["opal teardrop pendant on a fine chain","-"],legwear:["seamed stockings","@primary"],tagCharm:["crow crest brooch","@third"]},
      details:{detailOne:"crow-feather embroidery along the hems"},dcol:{detailOne:"@extra"}},
    nude:true,tags:["headmistress","crow"],out:{framing:"full body",must:MUST}};
  START.add("Academy Headmistresses",[SHEAD,CHEAD]);

  /* ---------- the base-defined sets (Crow's are built on "crowbody", like every Crow set entry) ---------- */
  const INTIMATE=["nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","pubicHair"];
  const B={salmon:"salmonrobes",crow:ACAD.robes("crow")};
  const E=(h,suf,name,c,items,o)=>Object.assign({id:h+suf,base:B[h],name,out:{framing:"full body",must:MUST},drop:[],c,more:[],nude:true},o||{},{outfit:Object.assign({details:{},dcol:{}},items)});
  need("top",["high-cut one-piece swimsuit with {c2} scale-shimmer side panels and an open back"],"US","swimwear,sporty");
  need("top",["string bikini with {c2} feather-charm ties"],"L","swimwear,boudoir");
  need("top",["off-shoulder mermaid gown with {c2} scale sequins cascading down the skirt and a high thigh slit",
    "off-shoulder tulle ballgown with a {c2} feather-trimmed corset bodice and a sweeping skirt"],"CUS","glam,costume");
  need("top",["silk camisole","oversized {c} hoodie worn as a dress"],"CUS","casual,boudoir");need("bottom",["satin sleep shorts"],"CUS","casual,boudoir");
  need("legwear",["fuzzy {c} thigh-high socks","fuzzy slipper socks"],"CU","casual,sweet");
  need("headwear",["silk sleep mask pushed up on the forehead"],"CU","casual");
  need("top",["fluffy salmon hooded onesie with a fin-trimmed hood","fluffy crow hooded onesie with feathered sleeves"],"CU","sweet,casual,cottage");
  need("heldItem",["plush salmon toy","small glass jar of shiny trinkets","steaming mug of tea"],"CU","sweet,casual,cottage");
  need("top",["high-cut bunny leotard with {c2} scale-sequin panels and a plunging neckline","backless bunny leotard with {c2} feather-trimmed hips and a plunging neckline"],"L","boudoir,costume");
  need("legwear",["sheer seamed thigh-high stockings"],"LS","boudoir");need("wristAccessory",["wrist cuffs with a bow"],"CU","costume");
  need("tailPiece",["fluffy bunny tail attached at the lower back"],"CU","costume");
  need("top",["tiny seashell bikini top"],"L","resort,costume");need("bottom",["sheer {c} mermaid-tail skirt with scale sequins and a high slit"],"LS","costume,boudoir");
  need("headwear",["pearl-and-coral hair crown"],"CU","costume");
  need("top",["micro kimono-style bodysuit with {c2} feather-trimmed sleeves and a plunging neckline"],"L","costume,boudoir");
  need("headwear",["small tengu tokin cap"],"CU","costume");need("heldItem",["crow-feather fan"],"CU","costume");
  need("top",["short wrap sundress with a {c2} leaping-salmon hem and a plunging neckline","short tiered sundress with a {c2} feather print and thin straps"],"US","resort,sweet");
  need("heldItem",["small wrapped gift box"],"CU","sweet,casual");
  need("top",["off-shoulder {c} satin mini dress with a corset bodice"],"US","glam,sweet");
  need("top",["micro track crop top with {c2} side stripes","fitted cropped sports polo with {c2} trim"],"L","sporty,boudoir");
  need("bottom",["high-cut track briefs","micro pleated sports skirt"],"L","sporty,boudoir");
  need("heldItem",["badminton racket and a feathered shuttlecock"],"CU","sporty");
  need("bra",["sheer mesh balconette bra with {c2} scale embroidery","lace plunge bra with {c2} feather embroidery"],"L","boudoir");
  need("panties",["sheer mesh panties with {c2} scale embroidery","lace thong with {c2} feather embroidery"],"L","boudoir");
  need("outerwear",["sheer robe slipping off both shoulders"],"L","boudoir");

  const CHEER=(h,c,top,bot,crest,ex,po,blurb)=>E(h,"cheer",ACAD.cap(h)+" cheer",{expression:ex,posture:po,hairStyle:"high ponytail"},
    {oname:"Cheer uniform",look:"costume",items:{top:["fitted cheer crop top",top],bottom:["pleated cheer skirt",bot],legwear:["over-the-knee athletic socks","@secondary"],
      tagCharm:[crest,"@accent"],headwear:["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents","@accent",null,c]},
      details:{detailOne:"contrast piping and a bold varsity-style number",detailTwo:"athletic fit"}},
    {drop:INTIMATE.concat(["hairMovement"]),nude:false,tags:["cheerleader","cheer squad"],blurb});
  need("headwear",["a pair of oversized {c} satin hair bows with long ribbon tails and small {c2} bow accents"],"CU","costume");
  START.add("Academy Cheerleaders",[
    CHEER("salmon","@primary","@primary","@secondary","small salmon crest badge","confident smile","poised dancer's posture","Salmon cheer crop top, porcelain pleated skirt and over-the-knee socks, rose-gold hair bows on a high ponytail and a salmon crest badge. Like every house's cheer entry, no Nude outfit. Hair, face and build come from the Salmon robes."),
    CHEER("crow","@primary","@accent","@primary","small crow crest badge","sparkling-eyed excited expression","light playful posture","Dusty-lavender cheer crop top, ink-blue pleated skirt and silvery over-the-knee socks, lavender hair bows on a high ponytail and a crow crest badge. Like every house's cheer entry, no Nude outfit.")]);
  START.add("Academy Swim Team",[
    E("salmon","swim","Salmon swim",{hairStyle:"high ponytail",skinFinish:"wet skin with water droplets",expression:"confident smile",posture:"hip-popped sultry stance"},
      {oname:"Swimsuit",look:"swimwear",items:{top:["high-cut one-piece swimsuit with {c2} scale-shimmer side panels and an open back","@primary",null,"@accent"]},
        details:{detailOne:"string ties",detailThree:"wet, glistening spandex finish"}},
      {drop:["hairMovement"],tags:["swimsuit","swim team"],blurb:"A high-cut salmon competition swimsuit with rose-gold scale-shimmer side panels and an open back, dripping from the pool. Face, skin and build come from the Salmon robes."}),
    E("crow","swim","Crow swim",{hairStyle:"high ponytail",skinFinish:"wet skin with water droplets",expression:"playful wink",posture:"light playful posture"},
      {oname:"Swimsuit",look:"swimwear",items:{top:["string bikini with {c2} feather-charm ties","@primary",null,"@third"],outerwear:["sheer {c} cape","@secondary"]},
        details:{detailOne:"string ties",detailThree:"wet, glistening spandex finish"}},
      {drop:["hairMovement"],tags:["swimsuit","swim team"],blurb:"An ink-blue string bikini with opal feather-charm ties under a sheer silvery cape, winking from the pool deck."})]);
  START.add("Academy Ballgowns",[
    E("salmon","gown","Salmon ballgown",{hairStyle:"twisted chignon",expression:"poised, self-assured smile",posture:"elegant posture"},
      {oname:"Ballgown",look:"glam",items:{top:["off-shoulder mermaid gown with {c2} scale sequins cascading down the skirt and a high thigh slit","@primary",null,"@accent"],
        headwear:["jeweled hair comb","@accent"],gloves:["long satin opera gloves","@secondary"],neckAccessory:["layered delicate necklaces","@accent"]},details:{detailThree:"lustrous silk satin finish"}},
      {drop:["hairMovement"],tags:["ballgown","formal","regal"],blurb:"A salmon off-shoulder mermaid gown with rose-gold scale sequins cascading down the skirt and a thigh slit, porcelain opera gloves and a rose-gold comb in a twisted chignon."}),
    E("crow","gown","Crow ballgown",{hairStyle:"loose side braid",expression:"bright, curious little smile",posture:"curtsying with her skirt held out"},
      {oname:"Ballgown",look:"glam",items:{top:["off-shoulder tulle ballgown with a {c2} feather-trimmed corset bodice and a sweeping skirt","@primary",null,"@third"],
        headwear:["small jeweled tiara","@extra"],gloves:["long satin opera gloves","@secondary"],neckAccessory:["opal teardrop pendant on a fine chain","-"]},details:{detailThree:"lustrous silk satin finish"}},
      {drop:["hairMovement"],tags:["ballgown","formal","regal"],blurb:"An ink-blue tulle ballgown with an opal feather-trimmed corset bodice, a platinum tiara, silvery opera gloves and an opal pendant, curtsying."})]);
  START.add("Academy Day Off",[
    E("salmon","dayoff","Salmon day off",{expression:"half-lidded sultry gaze",posture:"relaxed posture"},
      {oname:"Day off",look:"casual",items:{top:["silk camisole","@primary"],bottom:["satin sleep shorts","@secondary"],headwear:["silk sleep mask pushed up on the forehead","@extra"],
        heldItem:["steaming mug of tea"]},details:{detailThree:"silk habotai"}},
      {tags:["day off","loungewear","cozy"],blurb:"Off duty without her editorial armor: a salmon silk camisole, porcelain satin sleep shorts, a sleep mask pushed up and a mug of tea."}),
    E("crow","dayoff","Crow day off",{expression:"bright, curious little smile",posture:"light playful posture"},
      {oname:"Day off",look:"casual",items:{top:["oversized {c} hoodie worn as a dress","@primary"],legwear:["fuzzy {c} thigh-high socks","@secondary"],heldItem:["small glass jar of shiny trinkets"]},
        details:{detailTwo:"slouchy off-the-shoulder fit"}},
      {tags:["day off","loungewear","cozy"],blurb:"Off duty in an oversized ink-blue hoodie worn as a dress and fuzzy silvery thigh-highs, showing off her jar of shiny trinkets."})]);
  START.add("Academy Pajama Day",[
    E("salmon","pajama","Salmon pajama day",{expression:"amused, unbothered smile",posture:"light playful posture"},
      {oname:"Pajamas",look:"sweet",items:{top:["fluffy salmon hooded onesie with a fin-trimmed hood","@primary"],legwear:["fuzzy slipper socks","@secondary"],
        heldItem:["plush salmon toy","@primary","tucked under one arm"]},details:{detailOne:"scalloped edge",detailThree:"soft fleece texture"}},
      {tags:["pajamas","pajama day","cozy","cute"],blurb:"The house icon in a fluffy salmon onesie with a fin-trimmed hood, a plush salmon under one arm, amused rather than embarrassed."}),
    E("crow","pajama","Crow pajama day",{expression:"sleepy expression",posture:"light playful posture"},
      {oname:"Pajamas",look:"sweet",items:{top:["fluffy crow hooded onesie with feathered sleeves","@primary"],legwear:["fuzzy slipper socks","@secondary"],
        heldItem:["mug of hot cocoa with marshmallows"]},details:{detailThree:"soft fleece texture"}},
      {tags:["pajamas","pajama day","cozy","cute"],blurb:"A fluffy ink-blue crow onesie with feathered sleeves and a mug of cocoa, sleepy."})]);
  START.add("Academy Bunny Girls",[
    E("salmon","bunny","Salmon bunny",{expression:"seductive smile",posture:"hip-popped sultry stance"},
      {oname:"Bunny",look:"glam",items:{top:["high-cut bunny leotard with {c2} scale-sequin panels and a plunging neckline","@primary",null,"@accent"],legwear:["sheer seamed thigh-high stockings","@extra"],
        headwear:["tall upright bunny ear headband","@primary"],neckAccessory:["detached {c} collar with a bow tie","@secondary"],wristAccessory:["wrist cuffs with a bow","@secondary"],
        tailPiece:["fluffy bunny tail attached at the lower back"]},details:{detailThree:"glossy satin finish"}},
      {tags:["bunny girl","bunny suit","playboy bunny"],blurb:"A high-cut salmon bunny leotard with rose-gold scale-sequin panels, black seamed stockings, bunny ears and porcelain collar and cuffs."}),
    E("crow","bunny","Crow bunny",{expression:"playful wink",posture:"over-the-shoulder glance"},
      {oname:"Bunny",look:"glam",items:{top:["backless bunny leotard with {c2} feather-trimmed hips and a plunging neckline","@primary",null,"@accent"],legwear:["fishnet thigh-high stockings","@secondary"],
        headwear:["tall upright bunny ear headband","@primary"],neckAccessory:["detached {c} collar with a bow tie","@accent"],wristAccessory:["wrist cuffs with a bow","@accent"],
        tailPiece:["fluffy bunny tail attached at the lower back"]},details:{detailThree:"glossy satin finish"}},
      {tags:["bunny girl","bunny suit","playboy bunny"],blurb:"A backless ink-blue bunny leotard with lavender feather-trimmed hips, silvery fishnets and bunny ears, winking over her shoulder."})]);
  START.add("Academy Monster Girls",[
    E("salmon","monster","Salmon monster",{expression:"seductive smile",posture:"arched-back posture",earStyle:"fin-like ears",skinFinish:"glistening oiled skin"},
      {oname:"Mermaid",look:"costume",items:{top:["tiny seashell bikini top","@accent"],bottom:["sheer {c} mermaid-tail skirt with scale sequins and a high slit","@primary"],
        headwear:["pearl-and-coral hair crown"]},details:{}},
      {tags:["monster girl","mermaid","costume"],blurb:"A mermaid for Salmon: a tiny rose-gold seashell top, a sheer salmon mermaid-tail skirt slit to the hip, fin ears and a pearl-and-coral crown."}),
    E("crow","monster","Crow monster",{expression:"mischievous expression",posture:"hip-popped sultry stance",wingStyle:"dark feathered wings"},
      {oname:"Crow tengu",look:"costume",items:{top:["micro kimono-style bodysuit with {c2} feather-trimmed sleeves and a plunging neckline","@primary",null,"@accent"],
        headwear:["small tengu tokin cap","@extra"],legwear:["wooden geta sandals","@secondary"],heldItem:["crow-feather fan"]},details:{}},
      {tags:["monster girl","tengu","costume"],blurb:"A crow tengu: dark feathered wings, a plunging ink-blue kimono bodysuit with feather-trimmed sleeves, a tokin cap, geta and a crow-feather fan."})]);
  START.add("Academy Summer Days",[
    E("salmon","summer","Salmon summer day",{expression:"poised, self-assured smile",posture:"hip-popped sultry stance"},
      {oname:"Summer day",look:"resort",items:{top:["short wrap sundress with a {c2} leaping-salmon hem and a plunging neckline","@secondary",null,"@primary"],headwear:["wide-brim sun hat","@extra"],
        eyewear:["cat-eye sunglasses","@extra","hanging from the neckline"],legwear:["strappy flat sandals","@accent"]},details:{}},
      {tags:["summer","sundress","sun hat"],blurb:"A porcelain wrap sundress with a leaping-salmon hem and a plunging neckline, a wide black sun hat and cat-eye sunglasses."}),
    E("crow","summer","Crow summer day",{expression:"bright, curious little smile",posture:"light playful posture"},
      {oname:"Summer day",look:"resort",items:{top:["short tiered sundress with a {c2} feather print and thin straps","@secondary",null,"@primary"],headwear:["straw sun hat with a ribbon","@accent"],
        legwear:["strappy flat sandals","@primary"]},details:{detailOne:"ruffle trim"}},
      {tags:["summer","sundress","sun hat"],blurb:"A silvery tiered sundress with an ink-blue feather print and a straw hat with a lavender ribbon."})]);
  START.add("Academy Date Night",[
    E("salmon","date","Salmon date night",{expression:"aloof look failing to hide a blush",posture:"hip-popped sultry stance",blushStyle:"deep blush across the cheeks, nose and ears"},
      {oname:"Date night",look:"glam",items:{top:["satin slip dress with a plunging cowl neckline and a high thigh slit","@primary"],neckAccessory:["layered delicate necklaces","@accent"],
        earAccessory:["large hoop earrings","@accent"],hipAccessory:["mini clutch bag","@extra"]},details:{}},
      {tags:["date night","first date","shy","flustered"],blurb:"A salmon satin slip dress, rose-gold hoops and layered necklaces: the editorial icon trying very hard not to blush on a first date, and failing."}),
    E("crow","date","Crow date night",{expression:"blushing shy smile",posture:"nervous hair-twirling posture"},
      {oname:"Date night",look:"glam",items:{top:["off-shoulder {c} satin mini dress with a corset bodice","@primary"],neckAccessory:["opal teardrop pendant on a fine chain","-"],
        earAccessory:["small pearl earrings","-"],heldItem:["small wrapped gift box"]},details:{}},
      {tags:["date night","first date","shy","flustered"],blurb:"An ink-blue off-shoulder satin dress for a first date, a little wrapped gift for him in her hands: something shiny, of course."})]);
  START.add("Academy Sports Day",[
    E("salmon","sports","Salmon sports day",{expression:"determined expression",posture:"hip-popped sultry stance",skinFinish:"wet, sweat-glistening skin",blushStyle:"flushed cheeks and chest"},
      {oname:"High jump",look:"sporty",items:{top:["micro track crop top with {c2} side stripes","@primary",null,"@accent"],bottom:["high-cut track briefs","@primary"],headwear:["sports headband","@secondary"]},
        details:{detailThree:"wet, sweat-glistening look"}},
      {tags:["sports day","athlete","high jump","track"],blurb:"High jump for the house that always leaps: a micro salmon track crop top with rose-gold stripes, high-cut briefs and a headband, glistening with sweat."}),
    E("crow","sports","Crow sports day",{expression:"bubbly open-mouthed grin",posture:"light playful posture",skinFinish:"wet, sweat-glistening skin",blushStyle:"flushed cheeks and chest"},
      {oname:"Badminton",look:"sporty",items:{top:["fitted cropped sports polo with {c2} trim","@secondary",null,"@primary"],bottom:["micro pleated sports skirt","@primary"],
        heldItem:["badminton racket and a feathered shuttlecock"],legwear:["over-the-knee athletic socks","@secondary"]},details:{detailThree:"wet, sweat-glistening look"}},
      {tags:["sports day","athlete","badminton"],blurb:"Badminton, the feathered sport, for Crow: a cropped silvery sports polo, a micro ink-blue pleated skirt, a racket and a shuttlecock."})]);
  const FIRST=(h,ex,po,items,more,blurb)=>E(h,"first",ACAD.cap(h)+" first time",{age:"woman",expression:ex,posture:po,skinFinish:"dewy flushed skin",blushStyle:"flushed from cheeks to collarbones",
      lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},
    {oname:"First time",look:"boudoir",items},{more:[{oname:"Undressing",look:"boudoir",items:more,details:{detailTwo:"delicate straps slipping off the shoulders"},dcol:{}}],
      tags:["first time","nervous","aroused","bedroom"],blurb});
  START.add("Academy First Time",[
    FIRST("salmon","nervous, lust-clouded gaze","lying back on the bed, trembling with anticipation",
      {legwear:["sheer seamed thigh-high stockings","@extra"],thighAccessory:["lace thigh garter","@accent"],earAccessory:["large hoop earrings","@accent"]},
      {bra:["sheer mesh balconette bra with {c2} scale embroidery","@primary",null,"@accent"],panties:["sheer mesh panties with {c2} scale embroidery","@primary",null,"@accent"],
        outerwear:["sheer robe slipping off both shoulders","@secondary"],legwear:["sheer seamed thigh-high stockings","@extra"]},
      "Moments before her first time: the poised editorial icon, composure gone, trembling on the bed in black seamed stockings, a rose-gold garter and her hoops. Intimate details on show, plus Undressing and Nude outfits."),
    FIRST("crow","nervous, lust-clouded gaze","lying back on the bed, trembling with anticipation",
      {legwear:["sheer seamed thigh-high stockings","@secondary"],neckAccessory:["opal teardrop pendant on a fine chain","-"],thighAccessory:["lace thigh garter","@accent"]},
      {bra:["lace plunge bra with {c2} feather embroidery","@primary",null,"@accent"],panties:["lace thong with {c2} feather embroidery","@primary",null,"@accent"],
        outerwear:["sheer robe slipping off both shoulders","@secondary"],legwear:["sheer seamed thigh-high stockings","@secondary"]},
      "Moments before her first time: trembling on the bed in silvery stockings, a lavender garter and the opal pendant he gave her. Intimate details on show, plus Undressing and Nude outfits.")]);
})();

/* ---- v167: the Owl and Rat houses (17th and 18th). Early block: their robes and headmistresses.
   Both girls (and both headmistresses) have the studio's Ideal body (use:{body:"ideal"}), the same figure as Penguin.
   Owl: the Academy's night scholar. Barn-owl coloring (caramel brown, antique ivory and espresso, with honey-gold highlights and
     ivory speckles through her hair like plumage), a heart-shaped face, huge round amber eyes behind round glasses, and a
     knowing, half-lidded smile. Awake all night in the library; wise, unhurried, quietly sultry.
   Rat: the Academy's scrappy fixer. Ash-gray hair with a charcoal underlayer and rose-pink inner hair in one long, thin low
     braid that swings like a tail, sly rose-red eyes, a cheeky grin, ear piercings and a utility belt full of little pouches.
   ACAD.HOUSES gains "owl" and "rat" only at the very end of the build (tail block owlRatClone167.js), after every older set
   has been given an Owl and a Rat entry; newer sets list them directly (ACAD.NEWHOUSES). */
(function(){
  ACAD.NEWHOUSES=["owl","rat"];
  /* v171: their own bodies (both started from the Ideal preset, but read too much like the rest of the cast).
     Owl: tall and soft, a voluptuous pear shape: full teardrop breasts, a plush belly, very wide hips and very thick thighs.
     Rat: compact and toned, an athletic hourglass: high, perky breasts, faint abs, flared hips and a round, firm bubble butt. */
  const OWL_BODY={bustSize:"large, soft, full breasts",bustShape:"natural teardrop shape",bustWeight:"soft, heavy fullness",heightStature:"tall stature",
    shoulderShape:"soft, sloping shoulders",waistShape:"softly defined waist",stomachShape:"soft, plush belly",hipShape:"very wide, rounded hips",buttSize:"large, heart-shaped butt",
    thighBuild:"very thick, soft thighs that press together",legShape:"long, full legs",bodySoftness:"tall, voluptuous pear-shaped figure with a soft, plush body",handShape:"long, elegant"};
  const RAT_BODY={bustSize:"medium, perky breasts",bustShape:"high, round, perky shape",bustWeight:"firm fullness",heightStature:"slightly below-average height",
    shoulderShape:"slim, toned shoulders",torsoShape:"lean torso with a hint of abs",waistShape:"narrow, toned waist",stomachShape:"toned stomach with faint abs",hipShape:"flared hips",
    buttSize:"round, firm bubble butt",thighBuild:"toned, muscular thighs",legShape:"lean, athletic legs",bodySoftness:"compact, toned, athletic hourglass figure",handShape:"quick, nimble"};
  [OWL_BODY,RAT_BODY].forEach(b=>Object.entries(b).forEach(([f,v])=>START.option(f,v,"Academy")));
  const it=(f,v,t,fam)=>START.item(f,v,t||"CU",fam||"costume,preppy");
  const op=(f,v,g)=>START.option(f,v,g||"Academy");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  ["small owl crest badge","owl crest brooch","small rat crest badge","rat crest brooch"].forEach(v=>it("tagCharm",v));
  it("detailOne","owl-feather embroidery along the hems");it("detailOne","patchwork stitching along the hems");
  it("eyewear","round glasses");it("eyewear","half-moon reading glasses");it("eyewear","monocle on a fine chain");
  it("belt","{c} utility belt with little pouches","CU","costume,edgy");it("legwear","ripped {c} fishnet stockings","CU","edgy,costume");
  it("earAccessory","several small silver ear piercings","CU","edgy");it("earAccessory","small pearl earrings","CU","preppy");
  it("top","sweater vest over a collared shirt");it("bottom","pleated mini skirt");it("legwear","thigh-high stockings");
  it("outerwear","long {c} hooded robe with {c2} lining");it("neckAccessory","{c}-and-{c2} striped necktie");
  it("outerwear","long {c} academic gown with {c2} velvet facings");it("top","wrap-front satin blouse");it("bottom","high-waisted pencil skirt");
  it("legwear","seamed stockings");it("outerwear","long {c} greatcoat with many pockets","CU","costume,edgy");it("top","fitted {c} corset vest over a sheer blouse","CU","costume,glam");
  it("bottom","high-slit leather skirt","CU","edgy,glam");it("neckAccessory","ring of brass keys on a chain","CU","costume");
  it("detailOne","feather-pattern brocade","CU","glam,costume");
  /* character options they need */
  op("eyeShape","large, round, owlish eyes");op("eyeShape","sly, upturned almond eyes");op("eyeShape","large, round, owlish eyes framed by heavy lashes");
  op("lashNatural","long, thick, feathery eyelashes");op("expression","knowing, half-lidded smile");op("expression","cheeky, scheming grin");
  op("expression","wise, amused smile");op("expression","sharp, sly smirk");
  op("impression","a wise, unhurried, quietly sultry allure");op("impression","a scrappy, street-smart, cheeky allure");
  op("impression","a commanding, scholarly elegance");op("impression","a sly, knowing, worldly allure");
  op("faceShape","heart-shaped face with soft cheeks and a delicate chin");op("faceShape","small, sharp-chinned face with high cheekbones");
  op("faceShape","refined heart-shaped face with high cheekbones");op("faceShape","sharp, elegant face with a pointed chin and high cheekbones");
  op("hairStyle","softly layered hair");op("hairStyle","long, thin low braid that swings like a tail");op("hairStyle","sleek chignon pierced with a quill");
  op("hairStyle","sharp asymmetric bob");op("hairTexture","thick, voluminous and feathery");op("hairTexture","thick and slightly tousled");
  op("bangs","wispy curtain bangs");op("bangs","choppy, uneven bangs");
  op("hairBlend","soft {c} speckles flecked through the hair like owl plumage");op("hairBlend","bright {c} streaks peeking through the braid");
  op("browShape","soft, gently arched brows");op("browShape","thin, mischievously arched brows");
  op("mouthShape","soft full lips");op("mouthShape","cheeky full lips");
  op("faceMark","a small beauty mark beneath one eye");op("faceMark","a small beauty mark above the lip");
  op("markings","faint speckled freckles across the cheeks and shoulders");op("markings","light freckles across the nose");
  op("makeupStyle","soft glam makeup");op("makeupStyle","smudged grunge makeup");op("eyelinerStyle","sharp winged eyeliner");op("eyelinerStyle","smudged eyeliner");
  op("eyeshadowStyle","warm amber smoky eyeshadow");op("eyeshadowStyle","smoky gray eyeshadow");op("lashStyle","long defined lashes");op("lashStyle","spiky lashes");
  op("lipFinish","soft satin lips");op("lipFinish","glossy lips");op("blushStyle","soft cheek blush");op("blushStyle","high cheek blush");
  op("skinFinish","velvety skin finish");op("skinFinish","soft matte skin");
  const OWL_PAL={primary:"caramel brown",secondary:"antique ivory",third:"espresso brown",accent:"amber",extra:"honey gold"};
  const RAT_PAL={primary:"ash gray",secondary:"charcoal gray",third:"rose pink",accent:"mustard yellow",extra:"silver"};
  const INT_OWL={nippleColor:"pale pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pale pink",areolaType:"smooth",areolaSize:"medium-sized",
    vaginaColor:"soft pink",vaginaType:"symmetrical",pubicHair:"a neatly trimmed patch of pubic hair"};
  const INT_RAT={nippleColor:"rosy pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"rosy pink",areolaType:"smooth",areolaSize:"medium-sized",
    vaginaColor:"rosy pink",vaginaType:"soft with visible inner labia",pubicHair:"a neatly trimmed patch of pubic hair"};
  const OWL={id:"owlrobes",name:"Owl robes",
    blurb:"The Academy's night scholar: a tall, voluptuous, pear-shaped young woman with very long, feathery caramel-brown hair over an antique-ivory underlayer, espresso inner hair, honey-gold highlights and ivory speckles like owl plumage, huge round amber eyes behind round glasses, a heart-shaped face, faint speckled freckles and a knowing, half-lidded smile. An espresso hooded robe lined in caramel over an ivory sweater vest, a caramel pleated mini skirt and espresso thigh-highs, a caramel-and-amber tie and an owl crest.",
    pal:OWL_PAL,
    c:Object.assign({age:"young woman",faceShape:"heart-shaped face with soft cheeks and a delicate chin",expression:"knowing, half-lidded smile",
      impression:"a wise, unhurried, quietly sultry allure",eyeConfig:"matching",eyeShape:"large, round, owlish eyes",pupilStyle:"round pupils",irisDetail:"sunburst iris pattern",
      lashNatural:"long, thick, feathery eyelashes",eyeOne:"@accent",browShape:"soft, gently arched brows",noseShape:"small nose",mouthShape:"soft full lips",
      faceMark:"a small beauty mark beneath one eye",
      hairLength:"very long",hairTexture:"thick, voluminous and feathery",hairStyle:"softly layered hair",bangs:"wispy curtain bangs",hairMovement:"falls smoothly past the waist",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@extra",
      hairBlend:"soft {c} speckles flecked through the hair like owl plumage",hairBlendColor:"@secondary",
      skinTone:"ivory",undertone:"warm",skinFinish:"velvety skin finish",markings:"faint speckled freckles across the cheeks and shoulders",markingColor:"caramel brown",
      bodyMarkings:"light body freckles dust the shoulders, chest, stomach, hips, and thighs",
      makeupStyle:"soft glam makeup",eyelinerStyle:"sharp winged eyeliner",eyeshadowStyle:"warm amber smoky eyeshadow",lashStyle:"long defined lashes",blushStyle:"soft cheek blush",
      lipFinish:"soft satin lips",nailStyle:"carefully manicured fingernails",nailColor:"@accent"},OWL_BODY,INT_OWL),
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],
      legwear:["thigh-high stockings","@third"],outerwear:["long {c} hooded robe with {c2} lining","@third",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@accent"],
      eyewear:["round glasses","@extra"],tagCharm:["small owl crest badge","@accent"],earAccessory:["small pearl earrings","-"]},
      details:{detailOne:"owl-feather embroidery along the hems"},dcol:{detailOne:"@extra"}},
    nude:true,tags:["academy","robes","owl"],out:{framing:"full body",must:MUST}};
  const RAT={id:"ratrobes",name:"Rat robes",
    blurb:"The Academy's scrappy fixer: a compact, toned, athletic young woman with long ash-gray hair over a charcoal underlayer and rose-pink inner hair, worn in one long, thin low braid that swings like a tail, choppy bangs, sly rose-red eyes, a sharp little chin, a beauty mark above her lip and a cheeky, scheming grin. A charcoal hooded robe lined in rose pink over an ash-gray sweater vest, a charcoal pleated mini skirt, ripped fishnets, a utility belt full of pouches, ear piercings, a rose-and-mustard tie and a rat crest.",
    pal:RAT_PAL,
    c:Object.assign({age:"young woman",faceShape:"small, sharp-chinned face with high cheekbones",expression:"cheeky, scheming grin",
      impression:"a scrappy, street-smart, cheeky allure",eyeConfig:"matching",eyeShape:"sly, upturned almond eyes",pupilStyle:"round pupils",irisDetail:"bright, intricately detailed irises",
      lashNatural:"long eyelashes",eyeOne:"rose red",browShape:"thin, mischievously arched brows",noseShape:"gentle upturned nose",mouthShape:"cheeky full lips",
      faceMark:"a small beauty mark above the lip",
      hairLength:"very long",hairTexture:"thick and slightly tousled",hairStyle:"long, thin low braid that swings like a tail",bangs:"choppy, uneven bangs",
      hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@extra",
      hairBlend:"bright {c} streaks peeking through the braid",hairBlendColor:"@third",
      skinTone:"porcelain",undertone:"cool",skinFinish:"soft matte skin",markings:"light freckles across the nose",markingColor:"rose brown",
      bodyMarkings:"light body freckles dust the shoulders, chest, stomach, hips, and thighs",
      makeupStyle:"smudged grunge makeup",eyelinerStyle:"smudged eyeliner",eyeshadowStyle:"smoky gray eyeshadow",lashStyle:"spiky lashes",blushStyle:"high cheek blush",
      lipFinish:"glossy lips",nailStyle:"carefully manicured fingernails",nailColor:"@third"},RAT_BODY,INT_RAT),
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@secondary"],
      legwear:["ripped {c} fishnet stockings","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@third"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@accent"],
      belt:["{c} utility belt with little pouches","@secondary"],earAccessory:["several small silver ear piercings","-"],tagCharm:["small rat crest badge","@accent"]},
      details:{detailOne:"patchwork stitching along the hems"},dcol:{detailOne:"@third"}},
    nude:true,tags:["academy","robes","rat"],out:{framing:"full body",must:MUST}};
  START.add("Academy",[OWL,RAT]);

  /* ---------- headmistresses (mature, also the Ideal body) ---------- */
  const OHEAD={id:"owlhead",name:"Owl headmistress",
    blurb:"The Academy's head librarian and keeper of its night archives: a tall, voluptuous, pear-shaped mature woman with caramel-brown hair swept into a sleek chignon pierced by a quill, ivory speckles and honey-gold highlights, huge amber eyes over half-moon glasses and a wise, amused smile. An espresso academic gown with caramel velvet facings over an ivory wrap blouse and pencil skirt, seamed stockings, pearl earrings and an owl crest brooch.",
    pal:OWL_PAL,
    c:Object.assign({},OWL.c,{age:"mature woman",faceShape:"refined heart-shaped face with high cheekbones",expression:"wise, amused smile",impression:"a commanding, scholarly elegance",
      hairStyle:"sleek chignon pierced with a quill",bangs:"wispy curtain bangs",hairMovement:"",lipFinish:"soft satin lips"}),
    outfit:{oname:"Headmistress robes",look:"preppy",items:{top:["wrap-front satin blouse","@secondary"],bottom:["high-waisted pencil skirt","@third"],
      outerwear:["long {c} academic gown with {c2} velvet facings","@third",null,"@primary"],legwear:["seamed stockings","@third"],eyewear:["half-moon reading glasses","@extra"],
      earAccessory:["small pearl earrings","-"],tagCharm:["owl crest brooch","@accent"]},details:{detailOne:"owl-feather embroidery along the hems"},dcol:{detailOne:"@extra"}},
    nude:true,tags:["headmistress","owl"],out:{framing:"full body",must:MUST}};
  delete OHEAD.c.hairMovement;
  const RHEAD={id:"rathead",name:"Rat headmistress",
    blurb:"The Academy's quartermaster, who knows where everything is (and who took it): a compact, toned, athletic mature woman with a sharp asymmetric ash-gray bob streaked with rose pink, sly rose-red eyes behind a monocle on a fine chain and a sharp, sly smirk. A long charcoal greatcoat with many pockets over a rose-pink corset vest and sheer blouse, a high-slit leather skirt, seamed stockings, a ring of brass keys and a rat crest brooch.",
    pal:RAT_PAL,
    c:Object.assign({},RAT.c,{age:"mature woman",faceShape:"sharp, elegant face with a pointed chin and high cheekbones",expression:"sharp, sly smirk",impression:"a sly, knowing, worldly allure",
      hairStyle:"sharp asymmetric bob",hairLength:"chin-length",hairBlend:"bright {c} streaks through the bob",bangs:"choppy, uneven bangs",makeupStyle:"soft glam makeup",eyelinerStyle:"sharp winged eyeliner"}),
    outfit:{oname:"Quartermaster's coat",look:"edgy",items:{top:["fitted {c} corset vest over a sheer blouse","@third"],bottom:["high-slit leather skirt","@secondary"],
      outerwear:["long {c} greatcoat with many pockets","@secondary"],legwear:["seamed stockings","@secondary"],eyewear:["monocle on a fine chain","@extra"],
      neckAccessory:["ring of brass keys on a chain","-"],tagCharm:["rat crest brooch","@accent"]},details:{detailOne:"patchwork stitching along the hems"},dcol:{detailOne:"@third"}},
    nude:true,tags:["headmistress","rat"],out:{framing:"full body",must:MUST}};
  op("hairLength","chin-length");op("hairBlend","bright {c} streaks through the bob");
  START.add("Academy Headmistresses",[OHEAD,RHEAD]);
})();

/* ---- v123 (v151: Salmon and Crow): "Academy Festival", "Academy Cafe Maids", "Academy Study Night", "Academy Winter Break",
   "Academy Cooking Club" and "Academy Onsen". One girl per house in each, built on the house's robes entry.
   Each set has a cute main outfit, a lewder second outfit and a Nude outfit with the robes' intimate details. */
(function(){
  const{items,opts,set}=ACAD;

  /* ---------- shared props (held items) ---------- */
  items("heldItem",["candy apple on a stick","fluffy cotton candy on a stick","round paper fan","folding fan","lit sparkler",
    "paper lantern on a stick","shaved ice in a paper cup","small water bag with a goldfish","water balloon yo-yo",
    "silver tray with a teacup","tray with a slice of strawberry cake","porcelain teapot","tall strawberry parfait",
    "latte with heart latte art","tray of heart-shaped cookies","plate of omelette rice with a ketchup heart",
    "stack of old books","open textbook","open notebook and a pencil","steaming mug of tea","quill pen",
    "steaming paper cup of tea","snowball","small wrapped gift box","pair of ice skates by the laces","string of fairy lights",
    "whisk dripping with batter","wooden spoon","mixing bowl of batter","tray of fresh cookies","piping bag of frosting",
    "plate of cupcakes","rolling pin","basket of fresh bread","chocolate-dipped strawberry","ladle",
    "wooden bath bucket","bottle of fruit milk","small tray with a sake bottle","rubber duck","folded bath towel","plate of salmon nigiri"],"CU","sweet,casual,cottage");

  /* ---------- Festival ---------- */
  opts("posture",["holding her hair up with one hand"],"Posture");
  items("legwear",["wooden geta sandals"],"CU","cultural");
  items("headwear",["flower hair ornament","fox mask worn on the side of the head","wolf mask worn on the side of the head"],"CU","cultural,costume");
  const YK=["yukata with a {c2} griffin-feather print and a wide obi","yukata with a {c2} honeycomb print and a big bow obi",
    "yukata with a {c2} star-and-moon print and a bow-tied obi","yukata with a {c2} coiled-serpent print and a narrow obi",
    "short yukata with a {c2} moon-and-wave print","yukata with a {c2} swan-and-lotus print and a bow-tied obi",
    "yukata with a {c2} dragon print and a wide obi","yukata with a {c2} maple-leaf print and a bow-tied obi",
    "short yukata with a {c2} wave print","yukata with a {c2} snowflake print and a bow obi",
    "yukata with a {c2} fox-and-flame print and a wide obi","yukata with a {c2} lovebird-and-orange-blossom print and a big bow obi",
    "yukata with a {c2} hibiscus print and a bow obi","yukata with a {c2} octopus-and-wave print and a wide obi",
    "yukata with a {c2} leaping-salmon-and-river print and a wide obi","yukata with a {c2} crow-and-crescent-moon print and a bow-tied obi"];
  items("top",YK,"CU","cultural");
  const SLIP="short yukata slipping off both shoulders, loosely held by an untied obi";
  items("top",[SLIP],"L","cultural,boudoir");
  const F=(h,i,c1,c2,head,headC,held,ex,po,th)=>{const it={top:[YK[i],c1,null,c2],headwear:head?[head,headC]:undefined,legwear:["wooden geta sandals"],heldItem:[held]};if(!head)delete it.headwear;
    return[h,it,ex,po,th,{more:[{oname:"Slipping yukata",look:"boudoir",items:Object.assign({},it,{top:[SLIP,c1]})}]}]};
  set("Academy Festival","Academy First Time","festival","festival","cultural",{tags:["festival","yukata","matsuri"],oname:"Yukata"},[
    F("griffin",0,"@third","@accent","kanzashi hair ornament","@accent","candy apple on a stick","radiant, head-tilted smile","light playful posture","a summer festival yukata"),
    F("badger",1,"@primary","@secondary","flower hair ornament","@accent","fluffy cotton candy on a stick","happy closed-eye smile","light playful posture","a summer festival yukata"),
    F("raven",2,"@primary","@accent","kanzashi hair ornament","@accent","round paper fan","gentle smile","soft poised posture","a summer festival yukata"),
    F("serpent",3,"@third","@extra","kanzashi hair ornament","@extra","folding fan","smirk","elegant posture","a summer festival yukata"),
    F("wolf",4,"@secondary","@third","wolf mask worn on the side of the head","@third","lit sparkler","playful fanged grin","relaxed, weight-shifted stance","a summer festival yukata"),
    F("swan",5,"@primary","@secondary","flower hair ornament","@secondary","paper lantern on a stick","serene expression","graceful upright posture","a summer festival yukata"),
    F("dragon",6,"@primary","@accent","kanzashi hair ornament","@accent","lit sparkler","confident smile","hip-popped sultry stance","a summer festival yukata"),
    F("stag",7,"@primary","@accent","flower hair ornament","@third","small water bag with a goldfish","dreamy expression","soft poised posture","a summer festival yukata"),
    F("shark",8,"@primary","@third",null,null,"water balloon yo-yo","playful fanged grin","light playful posture","a summer festival yukata"),
    F("penguin",9,"@secondary","@third","flower hair ornament","@accent","shaved ice in a paper cup","bright cheerful expression","light playful posture","a summer festival yukata"),
    F("fox",10,"@primary","@secondary","fox mask worn on the side of the head","@extra","candy apple on a stick","sly, fox-like smirk","over-the-shoulder glance","a summer festival yukata"),
    F("lovebird",11,"@primary","@accent","kanzashi hair ornament","@accent","shaved ice with orange syrup and condensed milk","sparkling-eyed excited expression","light playful posture","a summer festival yukata"),
    F("flamingo",12,"@primary","@secondary","flower hair ornament","@secondary","fluffy cotton candy on a stick","serene expression","holding her hair up with one hand","a summer festival yukata"),
    F("kraken",13,"@secondary","@third","kanzashi hair ornament","@extra","folding fan","cool, otherworldly half-smile","over-the-shoulder glance","a summer festival yukata"),
    F("salmon",14,"@secondary","@primary","kanzashi hair ornament","@accent","folding fan","poised, self-assured smile","holding her hair up with one hand","a summer festival yukata"),
    F("crow",15,"@primary","@third","flower hair ornament","@accent","candy apple on a stick","bright, curious little smile","over-the-shoulder glance","a summer festival yukata")
  ]);

  /* ---------- Cafe Maids ---------- */
  opts("posture",["dipping into a polite curtsy","bowing slightly with a tray in hand"],"Posture");
  const MD=["short maid dress with a {c2} feather-trim collar and a sweetheart neckline","puff-sleeve maid dress with a {c2} honeycomb hem and a low sweetheart neckline",
    "short maid dress with a {c2} star-embroidered collar and a laced bodice","fitted maid dress with a {c2} scale-trim hem and a keyhole neckline",
    "short sleeveless maid dress with {c2} trim and a zip front","ruffled off-shoulder maid dress with a {c2} lace collar",
    "corseted maid dress with a {c2} flame-trim hem and a plunging neckline","puff-sleeve maid dress with {c2} leaf embroidery and a sweetheart neckline",
    "short halter maid dress with a {c2} wave-trim hem","classic short maid dress with a {c2} bib front and a low neckline",
    "short wa-style maid dress with kimono sleeves and a {c2} obi bow","frilly puff-sleeve maid dress with a {c2} polka-dot apron bib and a sweetheart neckline",
    "frilly off-shoulder maid dress with a {c2} heart-trim hem","short maid dress with a {c2} tentacle-lace hem and a plunging sweetheart neckline",
    "fitted maid dress with a {c2} scale-trim apron bib and a sweetheart neckline","short maid dress with {c2} feather lace and a low sweetheart neckline"];
  items("top",MD,"US","costume");
  const NAUGHTY="micro maid dress with a plunging heart cutout";
  const M=(h,i,c1,c2,apron,leg,legC,held,ex,po,extra)=>{const it=Object.assign({top:[MD[i],c1,null,c2],waistAccessory:[apron,"@secondary"],headwear:["lace maid-style headband","@secondary"],legwear:[leg,legC],heldItem:[held]},extra||{});
    return[h,it,ex,po,"a house cafe maid dress",{more:[{oname:"Naughty maid",look:"boudoir",items:Object.assign({},it,{top:[NAUGHTY,c1],waistAccessory:["tiny frilled apron","@secondary"]})}]}]};
  set("Academy Cafe Maids","Academy Festival","maid","cafe maid","costume",{tags:["maid","maid cafe"],oname:"Maid"},[
    M("griffin",0,"@third","@accent","frilled apron tied at the waist","sheer thigh-high stockings","@secondary","silver tray with a teacup","confident smile","dipping into a polite curtsy"),
    M("badger",1,"@primary","@secondary","frilled apron tied at the waist","thigh-high socks with bows","@secondary","tray of heart-shaped cookies","happy closed-eye smile","light playful posture"),
    M("raven",2,"@primary","@accent","frilled apron tied at the waist","sheer thigh-high stockings","@extra","porcelain teapot","slightly shy expression","bowing slightly with a tray in hand"),
    M("serpent",3,"@secondary","@third","small frilled apron","sheer thigh-high stockings","@secondary","latte with heart latte art","regal, disdainful look","elegant posture"),
    M("wolf",4,"@secondary","@third","half apron tied at the waist","thigh-high socks","@extra","tray with a slice of strawberry cake","embarrassed, averted gaze","relaxed, weight-shifted stance"),
    M("swan",5,"@primary","@secondary","frilled apron tied at the waist","sheer thigh-high stockings","@primary","porcelain teapot","gentle smile","dipping into a polite curtsy"),
    M("dragon",6,"@primary","@accent","small frilled apron","fishnet stockings","@extra","tall strawberry parfait","smirk","hip-popped sultry stance"),
    M("stag",7,"@primary","@accent","frilled apron tied at the waist","thigh-high socks with bows","@third","basket of fresh bread","dreamy expression","soft poised posture"),
    M("shark",8,"@primary","@third","small frilled apron","thigh-high socks","@third","plate of omelette rice with a ketchup heart","pouting expression","nervous hem-tugging posture"),
    M("penguin",9,"@primary","@secondary","frilled apron tied at the waist","sheer thigh-high stockings","@primary","silver tray with a teacup","bright cheerful expression","dipping into a polite curtsy"),
    M("fox",10,"@primary","@secondary","frilled apron tied at the waist","white tabi socks with wooden sandals","@extra","latte with heart latte art","mischievous expression","over-the-shoulder glance"),
    M("lovebird",11,"@primary","@accent","frilled apron tied at the waist","thigh-high socks with bows","@secondary","tray of orange cream floats","happy closed-eye smile","bowing slightly with a tray in hand"),
    M("flamingo",12,"@primary","@secondary","frilled apron tied at the waist","thigh-high socks with bows","@secondary","tray of heart-shaped cookies","flustered, blushing smile","shy clasped-hands posture"),
    M("kraken",13,"@primary","@secondary","small frilled apron","garter-strap stockings with lace tops","@primary","porcelain teapot","seductive smile","bowing slightly with a tray in hand"),
    M("salmon",14,"@primary","@accent","frilled apron tied at the waist","sheer thigh-high stockings","@extra","latte with heart latte art","poised, self-assured smile","dipping into a polite curtsy"),
    M("crow",15,"@primary","@third","small frilled apron","sheer thigh-high stockings","@secondary","silver tray with a teacup","bright, curious little smile","bowing slightly with a tray in hand")
  ]);

  /* ---------- Study Night ---------- */
  opts("posture",["curled up in an armchair with a book","sitting cross-legged on the floor among open books","lying on her stomach, propped on her elbows over a book","sitting at a desk, chin resting in one hand"],"Posture");
  opts("expression",["sleepy, studious expression"],"Cute");
  items("headwear",["pencil stuck through her bun"],"CU","casual,preppy");
  items("eyewear",["thin wire-rimmed reading glasses","oversized round glasses"],"CU","casual,preppy");
  const SW=["oversized {c2}-striped knit sweater worn as a dress, slipping off one shoulder","oversized chunky knit sweater with a {c2} honeycomb pattern, worn as a dress",
    "oversized knit sweater with a {c2} star pattern, worn as a dress","fitted ribbed turtleneck sweater dress with a {c2} trim",
    "oversized hoodie with a {c2} wolf print, worn as a dress","soft cashmere off-shoulder sweater dress with a {c2} trim",
    "oversized knit sweater with a {c2} flame pattern, slipping off one shoulder","oversized cable-knit cardigan with {c2} leaf buttons, worn buttoned as a dress",
    "oversized hoodie with a {c2} shark-fin hood, worn as a dress","oversized knit sweater with a {c2} snowflake pattern, worn as a dress",
    "oversized knit sweater with a {c2} fox-tail pattern, slipping off one shoulder","fluffy oversized cardigan with {c2} polka-dot pockets, worn over a sleep shirt",
    "fluffy oversized knit sweater with a {c2} heart pattern, worn as a dress","oversized knit sweater with a {c2} tentacle pattern, slipping off one shoulder",
    "fitted ribbed sweater dress with a {c2} scale-knit trim","oversized knit sweater with a {c2} feather pattern, slipping off one shoulder"];
  items("top",SW,"CUS","casual,cottage");
  const STUDYLEWD="oversized unbuttoned shirt slipping off both shoulders";
  items("top",[STUDYLEWD],"LS","casual,boudoir");
  const ST=(h,i,c1,c2,eye,eyeC,held,ex,po,hair,leg)=>{const L=leg||["fuzzy knee-high socks","@secondary"];const it={top:[SW[i],c1,null,c2],eyewear:[eye,eyeC],legwear:L,heldItem:[held]};
    if(hair==="pencil")it.headwear=["pencil stuck through her bun"];
    return[h,it,ex,po,"a late-night study look",{c:hair?{hairStyle:"messy bun"}:{},more:[{oname:"Study break",look:"boudoir",items:{top:[STUDYLEWD,"@secondary"],panties:["cotton bikini panties",c1],eyewear:[eye,eyeC],legwear:L,heldItem:[held]}}]}]};
  set("Academy Study Night","Academy Cafe Maids","study","study night","casual",{tags:["study","library","glasses"],oname:"Study night"},[
    ST("griffin",0,"@third","@accent","thin wire-rimmed reading glasses","@accent","open textbook","focused expression","sitting at a desk, chin resting in one hand","pencil",["knee-high socks","@secondary"]),
    ST("badger",1,"@primary","@secondary","oversized round glasses","@secondary","steaming mug of tea","sleepy, studious expression","curled up in an armchair with a book","bun"),
    ST("raven",2,"@primary","@accent","round tortoiseshell reading glasses perched low on the nose","@accent","stack of old books","thoughtful, distant look","sitting cross-legged on the floor among open books","pencil",["thigh-high socks","@extra"]),
    ST("serpent",3,"@secondary","@third","thin wire-rimmed reading glasses","@extra","quill pen","wry, knowing look","sitting at a desk, chin resting in one hand",null),
    ST("wolf",4,"@secondary","@third","oversized round glasses","@secondary","open notebook and a pencil","sleepy expression","lying on her stomach, propped on her elbows over a book",null),
    ST("swan",5,"@primary","@secondary","thin wire-rimmed reading glasses","@accent","steaming mug of tea","gentle smile","curled up in an armchair with a book","bun"),
    ST("dragon",6,"@secondary","@primary","oversized round glasses","@primary","stack of old books","focused expression","sitting cross-legged on the floor among open books",null),
    ST("stag",7,"@primary","@accent","round tortoiseshell reading glasses perched low on the nose","@secondary","storybook","dreamy expression","curled up in an armchair with a book","pencil"),
    ST("shark",8,"@primary","@third","oversized round glasses","@extra","open textbook","puffed-cheek pout","lying on her stomach, propped on her elbows over a book",null),
    ST("penguin",9,"@primary","@secondary","oversized round glasses","@primary","mug of hot cocoa with marshmallows","sleepy, studious expression","sitting cross-legged on the floor among open books","bun"),
    ST("fox",10,"@primary","@secondary","thin wire-rimmed reading glasses","@accent","open notebook and a pencil","mischievous expression","lying on her stomach, propped on her elbows over a book",null),
    ST("lovebird",11,"@primary","@accent","oversized round glasses","@accent","pastel highlighter pen","tiny cat-mouth smile","curled up in an armchair with a book",null),
    ST("flamingo",12,"@primary","@secondary","oversized round glasses","@secondary","steaming mug of tea","sleepy, studious expression","curled up in an armchair with a book","pencil"),
    ST("kraken",13,"@secondary","@third","thin wire-rimmed reading glasses","@extra","stack of old books","shy, breathless smile with parted lips","lying on her stomach, propped on her elbows over a book",null,["thigh-high socks","@primary"]),
    ST("salmon",14,"@primary","@accent","thin wire-rimmed reading glasses","@accent","open textbook","focused expression","sitting at a desk, chin resting in one hand","pencil",["sheer thigh-high stockings","@extra"]),
    ST("crow",15,"@primary","@third","oversized round glasses","@extra","open notebook and a pencil","curious expression","sitting cross-legged on the floor among open books","bun")
  ]);

  /* ---------- Winter Break ---------- */
  items("headwear",["fluffy earmuffs","knit pom-pom beanie","fur-trimmed hood"],"CU","sweet,casual");
  items("neckAccessory",["chunky knit scarf"],"CU","sweet,casual");
  const WS=["cropped knit sweater with a {c2} griffin pattern","cozy knit sweater with a {c2} honeycomb yoke",
    "fitted knit sweater with a {c2} star pattern","fitted turtleneck sweater with a {c2} serpent pattern",
    "chunky knit sweater with a {c2} wolf-and-moon pattern","fluffy off-shoulder knit sweater with a {c2} trim",
    "cropped knit sweater with a {c2} flame pattern","cozy fair-isle sweater with a {c2} reindeer pattern",
    "cropped knit sweater with a {c2} wave pattern","cozy fair-isle sweater with a {c2} snowflake pattern",
    "cropped knit sweater with a {c2} fox pattern","fluffy cropped knit sweater with a {c2} lovebird pattern",
    "fluffy cropped knit sweater with a {c2} heart pattern","fitted velvet sweater with a {c2} tentacle-and-wave pattern",
    "fitted turtleneck sweater with a {c2} leaping-salmon pattern","fluffy cropped knit sweater with a {c2} crow-and-snowflake pattern"];
  items("top",WS,"CUS","sweet,casual");
  items("bottom",["short knit skirt","short pleated wool skirt","fleece-lined shorts"],"CUS","sweet,casual");
  const CABIN="oversized cable-knit sweater worn with nothing underneath";
  items("top",[CABIN],"LS","casual,boudoir");
  const WB=(h,i,c1,c2,bottom,botC,head,headC,glove,held,ex,po)=>{const it={top:[WS[i],c1,null,c2],bottom:[bottom,botC],headwear:[head,headC],neckAccessory:["chunky knit scarf",c2],gloves:[glove,c2],legwear:["thigh-high socks","@secondary"],heldItem:[held]};
    return[h,it,ex,po,"a cozy winter-break look",{more:[{oname:"Cabin sweater",look:"boudoir",items:{top:[CABIN,c1],legwear:["thigh-high socks","@secondary"],heldItem:["mug of hot cocoa with marshmallows"]}}]}]};
  set("Academy Winter Break","Academy Study Night","winter","winter break","sweet",{tags:["winter","snow","sweater"],oname:"Winter",c:{blushStyle:"nose-tip blush",skinFinish:"natural skin texture with wind-flushed rosy cheeks"}},[
    WB("griffin",0,"@third","@accent","short pleated wool skirt","@secondary","knit pom-pom beanie","@accent","fluffy mittens","snowball","laughing expression","light playful posture"),
    WB("badger",1,"@primary","@secondary","short knit skirt","@secondary","fluffy earmuffs","@secondary","fluffy mittens","mug of hot cocoa with marshmallows","happy closed-eye smile","shy clasped-hands posture"),
    WB("raven",2,"@primary","@accent","short pleated wool skirt","@extra","knit pom-pom beanie","@primary","pastel knit mittens","pair of ice skates by the laces","gentle smile","soft poised posture"),
    WB("serpent",3,"@third","@extra","short knit skirt","@secondary","fur-trimmed hood","@extra","pastel knit mittens","steaming paper cup of tea","cool aloof expression","elegant posture"),
    WB("wolf",4,"@primary","@third","fleece-lined shorts","@secondary","knit pom-pom beanie","@secondary","fur-lined mittens","snowball","mischievous expression","relaxed, weight-shifted stance"),
    WB("swan",5,"@primary","@secondary","short knit skirt","@primary","fluffy earmuffs","@primary","fluffy mittens","pair of ice skates by the laces","serene expression","poised dancer's posture"),
    WB("dragon",6,"@primary","@accent","fleece-lined shorts","@secondary","knit pom-pom beanie","@third","fur-lined mittens","steaming paper cup of tea","confident smile","hip-popped sultry stance"),
    WB("stag",7,"@third","@primary","short knit skirt","@secondary","fur-trimmed hood","@third","fluffy mittens","small wrapped gift box","dreamy expression","soft poised posture"),
    WB("shark",8,"@primary","@third","short pleated wool skirt","@secondary","knit pom-pom beanie","@accent","fluffy mittens","snowball","pouting expression","light playful posture"),
    WB("penguin",9,"@secondary","@third","short knit skirt","@primary","fluffy earmuffs","@accent","fluffy mittens","mug of hot cocoa with marshmallows","bright cheerful expression","shy clasped-hands posture"),
    WB("fox",10,"@primary","@secondary","short pleated wool skirt","@third","fur-trimmed hood","@secondary","fur-lined mittens","small wrapped gift box","sly, fox-like smirk","over-the-shoulder glance"),
    WB("lovebird",11,"@primary","@accent","short knit skirt","@secondary","fluffy earmuffs","@accent","fluffy mittens","mug of hot cocoa with marshmallows","sparkling-eyed excited expression","light playful posture"),
    WB("flamingo",12,"@primary","@secondary","short knit skirt","@secondary","fluffy earmuffs","@secondary","fluffy mittens","mug of hot cocoa with marshmallows","flustered, blushing smile","shy clasped-hands posture"),
    WB("kraken",13,"@secondary","@third","short pleated wool skirt","@primary","fur-trimmed hood","@primary","pastel knit mittens","steaming paper cup of tea","shy, breathless smile with parted lips","elegant posture"),
    WB("salmon",14,"@secondary","@primary","short pleated wool skirt","@extra","fur-trimmed hood","@secondary","fur-lined mittens","steaming paper cup of tea","poised, self-assured smile","elegant posture"),
    WB("crow",15,"@primary","@accent","short knit skirt","@secondary","knit pom-pom beanie","@accent","fluffy mittens","snowball","mischievous expression","light playful posture")
  ]);

  /* ---------- Cooking Club ---------- */
  opts("faceAccents",["flour smudges on the cheek and nose","a dab of cream on the tip of the nose"],"Face accents");
  opts("posture",["leaning over the counter","stirring a bowl held against her hip"],"Posture");
  const AP=["frilled apron with a {c2} griffin crest","frilled apron with a {c2} honeycomb hem","frilled apron with {c2} star embroidery",
    "fitted bib apron with a {c2} serpent crest","plain bib apron with {c2} straps","ruffled apron with a {c2} lace hem",
    "fitted bib apron with a {c2} flame hem","ruffled apron with {c2} leaf embroidery","bib apron with a {c2} wave hem",
    "frilled apron with a {c2} snowflake hem","frilled apron with a {c2} fox-tail pocket","frilled apron with a {c2} polka-dot hem and a big bow",
    "frilly apron with a {c2} heart pocket","frilled apron with a {c2} tentacle-curl hem",
    "fitted bib apron with a {c2} scale-print hem","frilled apron with a {c2} feather-print pocket"];
  items("waistAccessory",AP,"CU","cottage,casual");
  items("top",AP.map(a=>a+", worn over bare skin"),"L","cottage,boudoir");
  items("top",["fitted ribbed tank top","puff-sleeve cropped blouse","off-shoulder cropped top"],"CUS","casual,sweet");
  items("bottom",["short flared skirt","denim shorts"],"CUS","casual,sweet");
  const CK=(h,i,c1,c2,top,topC,bot,botC,held,ex,po,acc)=>{const it={top:[top,topC],bottom:[bot,botC],waistAccessory:[AP[i],c1,null,c2],heldItem:[held]};
    return[h,it,ex,po,"a cooking-club look",{c:{faceAccents:acc||"flour smudges on the cheek and nose"},more:[{oname:"Naked apron",look:"boudoir",items:{top:[AP[i]+", worn over bare skin",c1,null,c2],heldItem:[held]}}]}]};
  set("Academy Cooking Club","Academy Winter Break","cook","cooking club","cottage",{tags:["cooking","apron","kitchen"],oname:"Cooking club"},[
    CK("griffin",0,"@secondary","@accent","fitted ribbed tank top","@third","short flared skirt","@secondary","whisk dripping with batter","laughing expression","stirring a bowl held against her hip"),
    CK("badger",1,"@secondary","@primary","puff-sleeve cropped blouse","@primary","short flared skirt","@secondary","tray of fresh cookies","happy closed-eye smile","light playful posture"),
    CK("raven",2,"@primary","@accent","off-shoulder cropped top","@third","short flared skirt","@primary","piping bag of frosting","focused expression","leaning over the counter"),
    CK("serpent",3,"@secondary","@third","fitted ribbed tank top","@third","short flared skirt","@secondary","chocolate-dipped strawberry","seductive smile","hip-popped sultry stance","a dab of cream on the tip of the nose"),
    CK("wolf",4,"@secondary","@third","fitted ribbed tank top","@third","denim shorts","@secondary","wooden spoon","playful smile","relaxed, weight-shifted stance"),
    CK("swan",5,"@primary","@secondary","puff-sleeve cropped blouse","@secondary","short flared skirt","@primary","plate of cupcakes","gentle smile","soft poised posture"),
    CK("dragon",6,"@secondary","@primary","fitted ribbed tank top","@primary","denim shorts","@extra","ladle","smirk","leaning over the counter"),
    CK("stag",7,"@third","@primary","puff-sleeve cropped blouse","@third","short flared skirt","@primary","basket of fresh bread","dreamy expression","soft poised posture"),
    CK("shark",8,"@primary","@third","off-shoulder cropped top","@third","denim shorts","@primary","rolling pin","pouting expression","stirring a bowl held against her hip"),
    CK("penguin",9,"@secondary","@primary","puff-sleeve cropped blouse","@secondary","short flared skirt","@primary","mixing bowl of batter","bright cheerful expression","stirring a bowl held against her hip"),
    CK("fox",10,"@secondary","@primary","off-shoulder cropped top","@primary","short flared skirt","@third","chocolate-dipped strawberry","teasing tongue-out expression","leaning over the counter","a dab of cream on the tip of the nose"),
    CK("lovebird",11,"@primary","@accent","puff-sleeve cropped blouse","@secondary","short flared skirt","@primary","bowl of whipped cream","bubbly open-mouthed grin","light playful posture","a dab of cream on the tip of the nose"),
    CK("flamingo",12,"@secondary","@primary","puff-sleeve cropped blouse","@primary","short flared skirt","@secondary","plate of cupcakes","flustered, blushing smile","shy clasped-hands posture","a dab of cream on the tip of the nose"),
    CK("kraken",13,"@primary","@third","off-shoulder cropped top","@secondary","short flared skirt","@primary","chocolate-dipped strawberry","seductive smile","leaning over the counter","a dab of cream on the tip of the nose"),
    CK("salmon",14,"@extra","@primary","fitted ribbed tank top","@secondary","short flared skirt","@primary","plate of salmon nigiri","focused expression","leaning over the counter"),
    CK("crow",15,"@secondary","@primary","puff-sleeve cropped blouse","@accent","short flared skirt","@primary","tray of fresh cookies","bright, curious little smile","stirring a bowl held against her hip")
  ]);

  /* ---------- Onsen ---------- */
  opts("posture",["sitting on the edge of the hot spring, legs in the water","standing in waist-deep steaming water","slightly shy posture"],"Posture");
  items("top",["bath towel wrapped around the body, tucked at the chest","short bath towel wrapped around the body, slipping low"],"US","casual,boudoir");
  items("headwear",["small towel folded on her head"],"CU","casual");
  items("outerwear",["loosely tied onsen yukata robe slipping open"],"LS","cultural,boudoir");
  const ON=(h,c1,head,held,ex,po,short)=>{const it={top:[short?"short bath towel wrapped around the body, slipping low":"bath towel wrapped around the body, tucked at the chest",c1],headwear:[head,"@secondary"],heldItem:[held]};
    return[h,it,ex,po,"a towel at the hot spring",{more:[{oname:"After the bath",look:"cultural",items:{outerwear:["loosely tied onsen yukata robe slipping open","@primary"],heldItem:["bottle of fruit milk"]}}]}]};
  set("Academy Onsen","Academy Cooking Club","onsen","onsen","casual",{tags:["onsen","hot spring","towel","bath"],oname:"Towel",
    c:{skinFinish:"wet skin with water droplets",blushStyle:"flushed cheeks and chest",hairTexture:"wet and glossy"},
    must:"an anime style with high detail, soft steam drifting around her, and particular emphasis on highly detailed skin, hair and eyes"},[
    ON("griffin","@third","small towel folded on her head","small tray with a sake bottle","confident smile","sitting on the edge of the hot spring, legs in the water"),
    ON("badger","@primary","towel wrapped around the hair","rubber duck","blushing shy smile","slightly shy posture"),
    ON("raven","@primary","towel wrapped around the hair","folded bath towel","slightly shy expression","standing in waist-deep steaming water"),
    ON("serpent","@third","towel wrapped around the hair","small tray with a sake bottle","shy, breathless smile with parted lips","sitting on the edge of the hot spring, legs in the water",true),
    ON("wolf","@secondary","small towel folded on her head","bottle of fruit milk","playful smile","relaxed, weight-shifted stance",true),
    ON("swan","@primary","towel wrapped around the hair","wooden bath bucket","serene expression","standing in waist-deep steaming water"),
    ON("dragon","@primary","small towel folded on her head","small tray with a sake bottle","smirk","sitting on the edge of the hot spring, legs in the water",true),
    ON("stag","@primary","small towel folded on her head","wooden bath bucket","dreamy expression","standing in waist-deep steaming water"),
    ON("shark","@primary","small towel folded on her head","rubber duck","playful fanged grin","standing in waist-deep steaming water",true),
    ON("penguin","@secondary","towel wrapped around the hair","bottle of fruit milk","flustered, blushing smile","slightly shy posture"),
    ON("fox","@primary","small towel folded on her head","small tray with a sake bottle","sly, fox-like smirk","over-the-shoulder glance",true),
    ON("lovebird","@primary","towel wrapped around the hair","rubber duck","happy closed-eye smile","sitting on the edge of the hot spring, legs in the water"),
    ON("flamingo","@primary","towel wrapped around the hair","wooden bath bucket","embarrassed, averted gaze","slightly shy posture"),
    ON("kraken","@secondary","towel wrapped around the hair","small tray with a sake bottle","shy, breathless smile with parted lips","sitting on the edge of the hot spring, legs in the water",true),
    ON("salmon","@primary","towel wrapped around the hair","small tray with a sake bottle","elegant composed expression","standing in waist-deep steaming water"),
    ON("crow","@secondary","small towel folded on her head","bottle of fruit milk","blushing shy smile","sitting on the edge of the hot spring, legs in the water",true)
  ]);
})();

/* ---- v124 (v151: Salmon and Crow): "Academy Spa Day", "Academy Boudoir", "Academy Afterglow" (on the robes entries) and
   "Academy Headmistress Night" (on the headmistress entries). Each has a second outfit and a Nude outfit. */
(function(){
  const{items,opts,set}=ACAD;

  /* ---------- Spa Day ---------- */
  opts("posture",["lying on her stomach on a massage table","reclining on a spa lounger"],"Posture");
  items("heldItem",["jar of massage oil","glass of cucumber water","bath bomb","cup of herbal tea","jade face roller",
    "bowl of rose petals","small bottle of rose oil","chilled glass of champagne"],"CU","resort,casual,glam");
  items("top",["terrycloth bandeau bikini top"],"US","resort,casual");
  items("bottom",["terrycloth string bikini bottoms"],"LS","resort,casual");
  items("outerwear",["plush spa robe worn open off the shoulders"],"US","resort,casual");
  items("bottom",["small towel draped over the hips"],"L","resort,boudoir");
  const HB={griffin:"plush spa headband with lion ears",badger:"plush spa headband with round badger ears",raven:"plush spa headband with a {c2} star",
    serpent:"plush spa headband with a satin bow",wolf:"plush spa headband with wolf ears",swan:"plush spa headband with a satin bow",
    dragon:"plush spa headband with small horns",stag:"plush spa headband with small antlers",shark:"plush spa headband with a shark fin",
    penguin:"plush spa headband with a fluffy pom-pom",fox:"plush spa headband with fox ears",lovebird:"plush spa headband with a big {c2} bow",
    flamingo:"plush spa headband with a big bow",kraken:"plush spa headband with a {c2} pearl",
    salmon:"plush spa headband with small {c2} fins",crow:"plush spa headband with small feathered wings"};
  items("headwear",Object.values(HB),"CU","resort,sweet");
  const SP=(h,bik,robe,band,held,ex,po)=>{const hb=HB[h].includes("{c2}")?[HB[h],band,null,"@accent"]:[HB[h],band];
    const it={top:["terrycloth bandeau bikini top",bik],bottom:["terrycloth string bikini bottoms",bik],outerwear:["plush spa robe worn open off the shoulders",robe],headwear:hb,heldItem:[held]};
    return[h,it,ex,po,"a spa-day robe and bikini",{more:[{oname:"Massage",look:"boudoir",items:{bottom:["small towel draped over the hips",robe],headwear:hb}}]}]};
  set("Academy Spa Day","Academy Onsen","spa","spa day","resort",{tags:["spa","massage","oil"],oname:"Spa",c:{skinFinish:"glistening oiled skin"}},[
    SP("griffin","@third","@primary","@secondary","chilled glass of champagne","confident smile","reclining on a spa lounger"),
    SP("badger","@primary","@secondary","@primary","glass of cucumber water","happy closed-eye smile","reclining on a spa lounger"),
    SP("raven","@primary","@third","@primary","cup of herbal tea","sleepy expression","lying on her stomach on a massage table"),
    SP("serpent","@third","@secondary","@third","jade face roller","half-lidded sultry gaze","reclining posture"),
    SP("wolf","@secondary","@primary","@primary","glass of cucumber water","sleepy, cat-like contentment","lying on her stomach on a massage table"),
    SP("swan","@primary","@primary","@secondary","bowl of rose petals","serene expression","reclining on a spa lounger"),
    SP("dragon","@primary","@secondary","@primary","small bottle of rose oil","smirk","reclining posture"),
    SP("stag","@primary","@third","@secondary","cup of herbal tea","dreamy expression","lying on her stomach on a massage table"),
    SP("shark","@primary","@third","@primary","bath bomb","playful fanged grin","reclining on a spa lounger"),
    SP("penguin","@secondary","@secondary","@primary","jar of massage oil","bright cheerful expression","lying on her stomach on a massage table"),
    SP("fox","@primary","@secondary","@primary","jar of massage oil","sly, fox-like smirk","reclining posture"),
    SP("lovebird","@secondary","@primary","@accent","glass of peach iced tea","happy closed-eye smile","reclining on a spa lounger"),
    SP("flamingo","@primary","@secondary","@primary","bowl of rose petals","sleepy, cat-like contentment","lying on her stomach on a massage table"),
    SP("kraken","@primary","@secondary","@secondary","chilled glass of champagne","cool, otherworldly half-smile","reclining on a spa lounger"),
    SP("salmon","@primary","@secondary","@secondary","jade face roller","serene expression","lying on her stomach on a massage table"),
    SP("crow","@primary","@secondary","@accent","glass of cucumber water","sleepy, cat-like contentment","reclining on a spa lounger")
  ]);

  /* ---------- Boudoir ---------- */
  opts("posture",["lying on her side on silk sheets, propped on one elbow","sitting on a velvet chaise with her legs crossed"],"Sultry (adult)");
  items("heldItem",["long-stemmed red rose","string of pearls","silk ribbon","vintage hand mirror","heart-shaped box of chocolates","champagne glass"],"US","boudoir,glam");
  const BRA={griffin:"lace balconette bra with {c2} feather embroidery",badger:"lace plunge bra with {c2} honeycomb lace",raven:"sheer mesh bra with {c2} star embroidery",
    wolf:"strappy harness bra with {c2} rings",swan:"sheer tulle bra with {c2} feather trim",dragon:"satin bra with {c2} flame lace",
    stag:"lace bralette with {c2} leaf embroidery",shark:"strappy triangle bra with {c2} wave lace",penguin:"lace balconette bra with {c2} bows",
    fox:"lace bralette with {c2} fox-tail embroidery",lovebird:"frilly balconette bra with {c2} polka-dot bows",flamingo:"ruffled bra with {c2} heart lace",kraken:"lace plunge bra with {c2} tentacle-curl embroidery",
    salmon:"sheer mesh balconette bra with {c2} scale embroidery",crow:"lace plunge bra with {c2} feather embroidery"};
  const PAN={griffin:"lace cheeky panties with {c2} feather embroidery",badger:"high-cut panties with {c2} honeycomb lace",raven:"sheer mesh panties with {c2} star embroidery",
    serpent:"lace thong with {c2} scale trim",wolf:"strappy high-cut panties with {c2} rings",swan:"sheer tulle panties with {c2} feather trim",dragon:"satin panties with {c2} flame lace",
    stag:"lace panties with {c2} leaf embroidery",shark:"strappy cheeky panties with {c2} wave lace",penguin:"lace panties with {c2} bows",
    fox:"lace panties with {c2} fox-tail embroidery",lovebird:"frilly panties with {c2} polka-dot bows",flamingo:"ruffled panties with {c2} heart lace",kraken:"lace thong with {c2} tentacle-curl embroidery",
    salmon:"sheer mesh panties with {c2} scale embroidery",crow:"lace thong with {c2} feather embroidery"};
  items("bra",Object.values(BRA),"L","boudoir");
  items("panties",Object.values(PAN),"L","boudoir");
  items("corset",["satin corset with {c2} snake-chain lacing"],"L","boudoir");
  items("outerwear",["sheer robe worn open, slipping off both shoulders"],"L","boudoir");
  const BD=(h,c1,c2,leg,legC,held,ex,po,extra)=>{
    const it=Object.assign(h==="serpent"?{corset:["satin corset with {c2} snake-chain lacing",c1,null,c2]}:{bra:[BRA[h],c1,null,c2]},
      {panties:[PAN[h],c1,null,c2],legwear:[leg,legC],heldItem:[held]},extra||{});
    return[h,it,ex,po,"a boudoir lingerie shoot",{more:[{oname:"Robe and panties",items:{outerwear:["sheer robe worn open, slipping off both shoulders",c1],panties:[PAN[h],c1,null,c2],legwear:[leg,legC]}}]}]};
  set("Academy Boudoir","Academy Spa Day","boudoir","boudoir","boudoir",{tags:["boudoir","lingerie","photoshoot"],oname:"Lingerie",use:{makeup:"lewdglam"},
    must:"an anime style with high detail, soft boudoir lighting, and particular emphasis on highly detailed skin, hair and eyes"},[
    BD("griffin","@third","@secondary","garter-strap stockings with lace tops","@third","long-stemmed red rose","smoldering sultry expression","lying on her side on silk sheets, propped on one elbow"),
    BD("badger","@primary","@secondary","sheer thigh-high stockings","@secondary","heart-shaped box of chocolates","seductive smile","kneeling with an arched back"),
    BD("raven","@primary","@accent","sheer seamed thigh-high stockings","@extra","vintage hand mirror","half-lidded sultry gaze","sitting on a velvet chaise with her legs crossed"),
    BD("serpent","@third","@extra","garter-strap stockings with lace tops","@secondary","string of pearls","come-hither look","reclining posture"),
    BD("wolf","@secondary","@extra","fishnet thigh-high stockings","@extra","silk ribbon","smirk","hands-behind-the-head posture",{neckAccessory:["leather collar with a ring","@extra"]}),
    BD("swan","@primary","@secondary","sheer thigh-high stockings","@primary","string of pearls","bedroom stare","sitting on a velvet chaise with her legs crossed"),
    BD("dragon","@primary","@accent","fishnet stockings","@extra","champagne glass","smoldering sultry expression","arched-back posture"),
    BD("stag","@primary","@accent","sheer thigh-high stockings","@secondary","long-stemmed red rose","dreamy expression","lying on her side on silk sheets, propped on one elbow"),
    BD("shark","@primary","@third","fishnet thigh-high stockings","@secondary","silk ribbon","teasing tongue-out expression","over-the-shoulder glance"),
    BD("penguin","@primary","@secondary","sheer seamed thigh-high stockings","@primary","heart-shaped box of chocolates","biting her lip","kneeling with an arched back"),
    BD("fox","@primary","@secondary","sheer thigh-high stockings","@secondary","silk ribbon","sly, fox-like smirk","over-the-shoulder glance"),
    BD("lovebird","@primary","@secondary","thigh-high socks with bows","@secondary","heart-shaped pillow","sweet, giggly smile with her tongue out","lying on her stomach, kicking her feet in the air"),
    BD("flamingo","@primary","@secondary","sheer thigh-high stockings","@secondary","heart-shaped box of chocolates","biting her lip","lying on her side on silk sheets, propped on one elbow"),
    BD("kraken","@primary","@third","garter-strap stockings with lace tops","@primary","string of pearls","half-lidded sultry gaze","lying on her side on silk sheets, propped on one elbow"),
    BD("salmon","@primary","@accent","garter-strap stockings with lace tops","@extra","champagne glass","smoldering sultry expression","sitting on a velvet chaise with her legs crossed"),
    BD("crow","@primary","@accent","sheer thigh-high stockings","@secondary","vintage hand mirror","biting her lip","lying on her side on silk sheets, propped on one elbow")
  ]);

  /* ---------- Afterglow ---------- */
  /* v139: the girls keep their own makeup; after sex they are marked with cum and fluids, not love bites or smudged makeup */
  opts("bodyMarkings",["thick white cum and glistening fluids drip down her inner thighs","thick white cum is smeared over the breasts, stomach and thighs","thick white cum pools on the breasts and drips down the chest","her skin glistens with sweat, cum and dripping love juices"],"Explicit (adult)");
  opts("vaginaType",["flushed and glistening, with thick white cum seeping out"],"Explicit (adult)");
  opts("expression",["eyes rolled back, gagging expression with drool running down the chin"],"Explicit (adult)");
  opts("expression",["blissful, contented smile","lazy, satisfied smile"],"Sultry (adult)");
  opts("posture",["lying tangled in rumpled sheets","sitting up in bed, the sheet pooled at her waist","lying on her stomach in bed, hugging a pillow","stretching lazily in bed"],"Sultry (adult)");
  items("legwear",["rumpled bedsheet tangled around her legs"],"L","boudoir");
  items("top",["oversized borrowed dress shirt, unbuttoned and slipping off one shoulder"],"LS","boudoir,casual");
  const LOVE=["griffin","badger","serpent","swan","dragon","shark"];
  const AG=(h,thigh,thC,ex,po)=>{const it={legwear:["rumpled bedsheet tangled around her legs","white"]};if(thigh)it.thighAccessory=[thigh,thC];
    return[h,it,ex,po,"the afterglow of her first time",{c:{bodyMarkings:LOVE.includes(h)?"thick white cum is smeared over the breasts, stomach and thighs":"thick white cum and glistening fluids drip down her inner thighs"},
      more:[{oname:"Borrowed shirt",look:"casual",items:{top:["oversized borrowed dress shirt, unbuttoned and slipping off one shoulder","white"]}}]}]};
  set("Academy Afterglow","Academy Boudoir","afterglow","afterglow","boudoir",{tags:["afterglow","in bed","after sex"],oname:"In bed",
    c:{age:"woman",blushStyle:"flushed from cheeks to collarbones",skinFinish:"lightly sweaty, dewy skin",lipFinish:"wet glossy lips",hairTexture:"softly tousled",
      nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening, with thick white cum seeping out"},
    must:"an anime style with high detail, rumpled sheets and warm morning light, and particular emphasis on highly detailed skin, hair and eyes"},[
    AG("griffin","lace thigh garter","@third","blissful, contented smile","sitting up in bed, the sheet pooled at her waist"),
    AG("badger",null,null,"lazy, satisfied smile","lying on her stomach in bed, hugging a pillow"),
    AG("raven",null,null,"sleepy, cat-like contentment","lying tangled in rumpled sheets"),
    AG("serpent","satin thigh garters with tiny bows","@third","lazy, satisfied smile","stretching lazily in bed"),
    AG("wolf",null,null,"breathless, flushed expression","lying tangled in rumpled sheets"),
    AG("swan","lace thigh garter","@primary","blissful, contented smile","sitting up in bed, the sheet pooled at her waist"),
    AG("dragon",null,null,"lazy, satisfied smile","stretching lazily in bed"),
    AG("stag",null,null,"dreamy expression","lying on her stomach in bed, hugging a pillow"),
    AG("shark",null,null,"blushing shy smile","lying tangled in rumpled sheets"),
    AG("penguin",null,null,"blissful, contented smile","lying on her stomach in bed, hugging a pillow"),
    AG("fox",null,null,"sleepy, cat-like contentment","stretching lazily in bed"),
    AG("lovebird","lace thigh garter","@accent","dreamy, overwhelmed, heart-eyed smile","hugging a pillow in rumpled sheets"),
    AG("flamingo",null,null,"breathless, flushed expression","sitting up in bed, the sheet pooled at her waist"),
    AG("kraken","pearl thigh chain","@extra","lazy, satisfied smile","stretching lazily in bed"),
    AG("salmon","lace thigh garter","@accent","blissful, contented smile","sitting up in bed, the sheet pooled at her waist"),
    AG("crow",null,null,"sleepy, cat-like contentment","lying on her stomach in bed, hugging a pillow")
  ]);

  /* ---------- Headmistress Night (built on the headmistress entries) ---------- */
  opts("posture",["sitting on a throne-like chair with her legs crossed","towering over the viewer, hands on her hips","tapping a riding crop against her palm"],"Sultry (adult)");
  items("heldItem",["riding crop","heart-tipped riding crop","leather leash","coiled leather whip"],"LS","edgy,boudoir");
  items("corset",["lace-up leather corset with {c2} griffin-claw clasps","lace-up latex corset with {c2} snake-chain lacing"],"L","edgy,boudoir");
  items("top",["latex catsuit with {c2} honeycomb panels, unzipped to the navel","high-cut latex leotard with a {c2} star-studded plunging neckline",
    "fitted latex gown with a plunging neckline and a thigh-high slit","short latex kimono dress with a plunging neckline and a {c2} obi","wet-look latex bodysuit with {c2} tentacle-curl cutouts",
    "high-cut latex bodysuit with {c2} scale-panelled sides and a plunging neckline","latex corset dress with {c2} feather-trimmed shoulders and a thigh-high slit"],"L","edgy,boudoir");
  items("legwear",["over-the-knee leather boots"],"US","edgy");
  const HN=(h,it,ex,po,o)=>{const undone={};["gloves","legwear","neckAccessory","heldItem","eyewear"].forEach(f=>{if(it[f])undone[f]=it[f]});
    return[h,it,ex,po,"a commanding night-time look",Object.assign({more:[{oname:"Undone",items:undone}]},o||{})]};
  set("Academy Headmistress Night","Academy Afterglow","night","headmistress night","edgy",{base:"head",tags:["dominant","latex","leather"],oname:"Night",use:{makeup:"fatalemk"}},[
    HN("griffin",{corset:["lace-up leather corset with {c2} griffin-claw clasps","@third",null,"@secondary"],bottom:["micro leather skirt","@extra"],legwear:["over-the-knee latex boots","@extra"],gloves:["long leather gloves","@extra"],heldItem:["riding crop"]},"regal, disdainful look","towering over the viewer, hands on her hips"),
    HN("badger",{top:["latex catsuit with {c2} honeycomb panels, unzipped to the navel","@secondary",null,"@primary"],gloves:["long latex gloves","@secondary"],neckAccessory:["leather collar with a ring","@primary"],heldItem:["leather leash"]},"seductive smile","hip-popped sultry stance"),
    HN("raven",{top:["high-cut latex leotard with a {c2} star-studded plunging neckline","@secondary",null,"@accent"],legwear:["thigh-high latex stockings","@third"],gloves:["latex opera gloves","@third"],heldItem:["riding crop"]},"cool aloof expression","sitting on a throne-like chair with her legs crossed"),
    HN("serpent",{corset:["lace-up latex corset with {c2} snake-chain lacing","@third",null,"@extra"],panties:["latex briefs","@secondary"],legwear:["vinyl thigh-high stockings","@secondary"],gloves:["long latex gloves","@secondary"],heldItem:["coiled leather whip"]},"wry, knowing look","hip-popped sultry stance"),
    HN("wolf",{top:["strappy harness top","@extra"],bottom:["micro leather shorts","@secondary"],legwear:["leg harness straps","@extra"],neckAccessory:["spiked collar with a chain","@third"],heldItem:["leather leash"]},"wary, predatory stare","strong, squared posture"),
    HN("swan",{top:["fitted latex gown with a plunging neckline and a thigh-high slit","@primary"],gloves:["latex opera gloves","@primary"],neckAccessory:["pearl choker"],heldItem:["riding crop"]},"elegant composed expression","sitting on a throne-like chair with her legs crossed"),
    HN("dragon",{top:["micro latex bodysuit with a plunging neckline and open sides","@primary"],legwear:["over-the-knee latex boots","@extra"],gloves:["long latex gloves","@extra"],belt:["studded harness belt","@accent"],heldItem:["coiled leather whip"]},"smoldering sultry expression","towering over the viewer, hands on her hips"),
    HN("stag",{corset:["lace-up suede corset","@secondary"],bottom:["micro leather skirt","@primary"],legwear:["over-the-knee leather boots","@secondary"],gloves:["long leather gloves","@secondary"],heldItem:["riding crop"]},"stern, serious expression","tapping a riding crop against her palm"),
    HN("shark",{top:["latex halter bodysuit","@primary"],legwear:["thigh-high latex stockings","@secondary"],gloves:["short latex gloves","@secondary"],neckAccessory:["spiked choker","@accent"],heldItem:["leather leash"]},"smirk","hip-popped sultry stance"),
    HN("penguin",{top:["high-cut latex leotard","@primary"],legwear:["sheer seamed thigh-high stockings","@primary"],gloves:["latex opera gloves","@primary"],neckAccessory:["detached {c} collar with a bow tie","@secondary"],heldItem:["riding crop"]},"seductive smile","towering over the viewer, hands on her hips"),
    HN("fox",{top:["short latex kimono dress with a plunging neckline and a {c2} obi","@primary",null,"@extra"],legwear:["thigh-high latex stockings","@third"],heldItem:["folding fan"]},"sly, fox-like smirk","sitting on a throne-like chair with her legs crossed"),
    HN("lovebird",{corset:["{c} latex corset with {c2} ribbon lacing","@primary",null,"@secondary"],bottom:["frilled latex micro skirt","@secondary"],legwear:["latex thigh-high stockings with bows","@secondary"],gloves:["long latex gloves","@primary"],neckAccessory:["ribbon choker with a heart lock","@accent"]},"doting, teasing smile","sitting on a throne-like chair with her legs crossed"),
    HN("flamingo",{top:["latex catsuit with a front zipper","@primary"],gloves:["long latex gloves","@accent"],neckAccessory:["heart choker","@accent"],heldItem:["heart-tipped riding crop"]},"come-hither look","tapping a riding crop against her palm"),
    HN("kraken",{top:["wet-look latex bodysuit with {c2} tentacle-curl cutouts","@primary",null,"@third"],gloves:["latex opera gloves","@secondary"],legwear:["over-the-knee latex boots","@secondary"],neckAccessory:["pearl choker"],heldItem:["coiled leather whip"]},"wry, knowing look","sitting on a throne-like chair with her legs crossed"),
    HN("salmon",{top:["high-cut latex bodysuit with {c2} scale-panelled sides and a plunging neckline","@extra",null,"@primary"],gloves:["latex opera gloves","@primary"],legwear:["over-the-knee latex boots","@extra"],neckAccessory:["spiked choker","@accent"],heldItem:["riding crop"]},"poised, self-assured smile","towering over the viewer, hands on her hips"),
    HN("crow",{top:["latex corset dress with {c2} feather-trimmed shoulders and a thigh-high slit","@primary",null,"@accent"],gloves:["long latex gloves","@primary"],legwear:["thigh-high latex stockings","@secondary"],eyewear:["round glasses","silver"],heldItem:["leather leash"]},"wry, knowing look","sitting on a throne-like chair with her legs crossed")
  ]);
})();

/* ---- v125 (v151: Salmon and Crow): "Academy Idol Concert", "Academy Witches", "Academy Magical Heroines", "Academy Battle Maidens"
   and "Academy Cosplay". One girl per house in each, built on the house's robes entry, each with a lewder
   second outfit and a Nude outfit. */
(function(){
  const{items,opts,set}=ACAD;

  /* ---------- Idol Concert ---------- */
  opts("expression",["playful wink"],"Cute");
  opts("posture",["mid-dance pose with one arm raised","singing into a microphone, one hand reaching out","striking a heart-hands pose"],"Posture");
  items("heldItem",["stage microphone","heart-shaped microphone","star-tipped microphone","glow stick"],"CU","glam,costume");
  items("headwear",["headset microphone","star hair clips"],"CU","glam,costume");
  items("legwear",["glossy thigh-high stage boots"],"US","glam,costume");
  const ID={griffin:"sequined stage crop top with {c2} feathered epaulettes",badger:"frilly halter stage top with a {c2} honeycomb bow",
    raven:"star-sequin stage dress with an open back and a short flared {c2}-lined skirt",serpent:"glossy stage bodysuit with sheer {c2} scale-print sleeves and a plunging neckline",
    wolf:"cropped studded stage jacket over a {c2} bandeau",swan:"tulle stage dress with a {c2} feathered bodice and a short tutu skirt",
    dragon:"rock-idol corset top with {c2} flame sequins",stag:"flower-trimmed stage dress with a {c2} leaf-sequin bodice and a short ruffled skirt",
    shark:"sequined stage crop top with a {c2} wave fringe",penguin:"tuxedo-style stage leotard with a {c2} bow tie and tails",
    fox:"short kimono-style stage dress with {c2} flame sequins and a big obi bow",lovebird:"frilly puff-sleeve idol dress with a {c2} polka-dot petticoat and big bows",
    flamingo:"heart-sequin stage dress with a {c2} sweetheart neckline and a short ruffled skirt",kraken:"glossy stage bodysuit with a {c2} tentacle-fringe hem and a plunging neckline",
    salmon:"shimmering scale-sequin stage dress with a {c2} fishtail hem and a plunging neckline",crow:"feather-trimmed stage dress with a {c2} corset bodice and a short tulle skirt"};
  items("top",Object.values(ID),"US","glam,costume");
  items("bottom",["ruffled stage mini skirt with a {c2} hem"],"US","glam,costume");
  items("top",["micro sequined stage bikini top"],"L","glam,costume");
  items("bottom",["micro sequined stage bikini bottoms"],"L","glam,costume");
  const IDOL=(h,c1,c2,bot,head,headC,leg,legC,held,ex,po,acc)=>{const it={top:[ID[h],c1,null,c2],headwear:[head,headC],legwear:[leg,legC],heldItem:[held]};
    if(bot)it.bottom=bot;
    return[h,it,ex,po,"an idol stage outfit",{c:{faceAccents:acc||"glitter dots under the eyes"},more:[{oname:"Encore",items:{top:["micro sequined stage bikini top",c1],bottom:["micro sequined stage bikini bottoms",c1],headwear:[head,headC],legwear:[leg,legC],heldItem:[held]}}]}]};
  set("Academy Idol Concert","Academy Headmistress Night","idol","idol","glam",{tags:["idol","concert","stage"],oname:"Stage",c:{makeupStyle:"idol makeup"},
    must:"an anime style with high detail, bright stage lights, and particular emphasis on highly detailed skin, hair and eyes"},[
    IDOL("griffin","@third","@accent",["ruffled stage mini skirt with a {c2} hem","@secondary",null,"@accent"],"tiny top hat","@third","glossy thigh-high stage boots","@secondary","stage microphone","confident smile","singing into a microphone, one hand reaching out"),
    IDOL("badger","@primary","@secondary",["ruffled stage mini skirt with a {c2} hem","@secondary",null,"@primary"],"star hair clips","@secondary","thigh-high socks with bows","@secondary","heart-shaped microphone","bubbly open-mouthed grin","striking a heart-hands pose"),
    IDOL("raven","@primary","@accent",null,"headset microphone","@accent","glossy thigh-high stage boots","@extra","glow stick","playful wink","mid-dance pose with one arm raised","star stickers beside the eyes"),
    IDOL("serpent","@third","@extra",null,"headset microphone","@extra","glossy thigh-high stage boots","@secondary","star-tipped microphone","shy, breathless smile with parted lips","hip-popped sultry stance"),
    IDOL("wolf","@extra","@secondary",["micro leather shorts","@secondary"],"headset microphone","@third","glossy thigh-high stage boots","@extra","stage microphone","playful fanged grin","mid-dance pose with one arm raised"),
    IDOL("swan","@primary","@secondary",null,"small jeweled tiara","@accent","sheer thigh-high stockings","@primary","star-tipped microphone","serene expression","poised dancer's posture"),
    IDOL("dragon","@primary","@accent",["micro pleated leather skirt","@extra"],"headset microphone","@accent","glossy thigh-high stage boots","@extra","stage microphone","smirk","singing into a microphone, one hand reaching out"),
    IDOL("stag","@primary","@accent",null,"flower hair ornament","@third","thigh-high socks with bows","@secondary","glow stick","radiant, head-tilted smile","light playful posture"),
    IDOL("shark","@primary","@third",["ruffled stage mini skirt with a {c2} hem","@secondary",null,"@accent"],"star hair clips","@accent","glossy thigh-high stage boots","@secondary","stage microphone","teasing tongue-out expression","mid-dance pose with one arm raised"),
    IDOL("penguin","@primary","@accent",null,"tiny top hat","@primary","sheer thigh-high stockings","@primary","glow stick","sparkling-eyed excited expression","striking a heart-hands pose"),
    IDOL("fox","@primary","@secondary",null,"fox mask worn on the side of the head","@extra","white tabi socks with wooden sandals","@extra","stage microphone","playful wink","over-the-shoulder glance"),
    IDOL("lovebird","@primary","@secondary",null,"ribbon bows tied at the twintails","@accent","thigh-high socks with bows","@secondary","heart-shaped microphone","bubbly open-mouthed grin","making a heart with her hands, winking"),
    IDOL("flamingo","@primary","@secondary",null,"star hair clips","@secondary","glossy thigh-high stage boots","@secondary","heart-shaped microphone","bubbly open-mouthed grin","striking a heart-hands pose","small heart accent beneath one eye"),
    IDOL("kraken","@primary","@third",null,"headset microphone","@third","glossy thigh-high stage boots","@primary","star-tipped microphone","shy, breathless smile with parted lips","singing into a microphone, one hand reaching out"),
    IDOL("salmon","@primary","@accent",null,"headset microphone","@accent","glossy thigh-high stage boots","@extra","stage microphone","confident smile","singing into a microphone, one hand reaching out"),
    IDOL("crow","@primary","@third",null,"star hair clips","@third","glossy thigh-high stage boots","@secondary","glow stick","playful wink","mid-dance pose with one arm raised")
  ]);

  /* ---------- Witches and their familiars ---------- */
  opts("expression",["mysterious half-smile"],"Expression");
  opts("posture",["sitting sidesaddle on a broomstick","casting a spell with one hand raised"],"Posture");
  items("heldItem",["glowing spellbook","crystal wand","broomstick","bubbling potion bottle","crystal ball","lit ritual candle","bundle of dried herbs","star-tipped wand",
    "small penguin familiar hugged in her arms"],"CU","gothic,costume");
  items("shoulderPiece",["small snake familiar coiled around her shoulders","small raven familiar perched on her shoulder","small octopus familiar draped over her shoulder",
    "little salmon familiar swimming in a floating bubble of water beside her shoulder","small crow familiar perched on her shoulder with a shiny button in its beak"],"CU","gothic,costume");
  items("headwear",["wide-brim witch hat with a {c2} ribbon"],"CU","gothic,costume");
  const WD={griffin:"short witch dress with a {c2} feather-trim hem and a plunging laced bodice",badger:"puff-sleeve witch dress with a {c2} honeycomb hem and a low laced bodice",
    raven:"backless witch dress with a {c2} constellation-print skirt and a plunging neckline",serpent:"slinky witch dress with a {c2} scale-trim slit and a plunging neckline",
    wolf:"short tattered witch dress with a {c2} moon-print hem",swan:"sheer layered witch dress with a {c2} feather-trim neckline",
    dragon:"corseted witch dress with a {c2} flame-trim hem and a plunging neckline",stag:"short leafy witch dress with a {c2} vine-laced bodice",
    shark:"short witch dress with a {c2} wave-trim hem and a halter neckline",penguin:"short witch dress with a {c2} snowflake-trim hem and a laced bodice",
    fox:"short witch dress with kimono sleeves and a {c2} flame-trim hem",lovebird:"puff-sleeve witch dress with a {c2} polka-dot petticoat and a big bow",
    flamingo:"frilly off-shoulder witch dress with a {c2} heart-trim hem",kraken:"slinky witch dress with a {c2} tentacle-trim slit and a plunging neckline",
    salmon:"slinky witch dress with a {c2} scale-trim slit and an open back",crow:"short witch dress with a {c2} feather-trim hem and a laced bodice"};
  items("top",Object.values(WD),"US","gothic,costume");
  const WI=(h,c1,c2,hatC,leg,legC,held,ex,po,traits,extra)=>{const it=Object.assign({top:[WD[h],c1,null,c2],headwear:["wide-brim witch hat with a {c2} ribbon",hatC,null,c2],legwear:[leg,legC],heldItem:[held]},extra||{});
    const sky={headwear:it.headwear,legwear:it.legwear,heldItem:it.heldItem};if(it.shoulderPiece)sky.shoulderPiece=it.shoulderPiece;
    return[h,it,ex,po,"a witch with her house familiar",{c:traits||{},more:[{oname:"Skyclad",items:sky}]}]};
  set("Academy Witches","Academy Idol Concert","witch","witch","gothic",{tags:["witch","familiar","magic"],oname:"Witch"},[
    WI("griffin","@third","@accent","@secondary","sheer thigh-high stockings","@secondary","star-tipped wand","confident smile","casting a spell with one hand raised",{earStyle:"rounded lion ears",tailStyle:"tufted lion tail"}),
    WI("badger","@primary","@secondary","@secondary","thigh-high socks with bows","@secondary","bubbling potion bottle","happy closed-eye smile","light playful posture",{earStyle:"round bear ears",tailStyle:"short bobtail"}),
    WI("raven","@primary","@accent","@extra","thigh-high stockings with spiderweb lace","@extra","glowing spellbook","mysterious half-smile","soft poised posture",null,{shoulderPiece:["small raven familiar perched on her shoulder","-"]}),
    WI("serpent","@third","@extra","@secondary","sheer thigh-high stockings","@secondary","crystal ball","half-lidded sultry gaze","hip-popped sultry stance",{fangClawStyle:"venomous snake fangs"},{shoulderPiece:["small snake familiar coiled around her shoulders","-"]}),
    WI("wolf","@secondary","@third","@extra","fishnet thigh-high stockings","@extra","lit ritual candle","playful fanged grin","relaxed, weight-shifted stance",{earStyle:"tufted wolf ears",tailStyle:"thick bushy wolf tail"}),
    WI("swan","@primary","@secondary","@primary","sheer thigh-high stockings","@primary","crystal wand","serene expression","graceful upright posture",{wingStyle:"feathered wings"}),
    WI("dragon","@primary","@accent","@extra","fishnet stockings","@extra","bubbling potion bottle","smirk","casting a spell with one hand raised",{hornStyle:"small dragon horns",tailStyle:"dragon tail"}),
    WI("stag","@primary","@accent","@secondary","sheer thigh-high stockings","@secondary","bundle of dried herbs","dreamy expression","soft poised posture",{hornStyle:"small antlers",earStyle:"deer ears",tailStyle:"short deer tail"}),
    WI("shark","@primary","@third","@secondary","thigh-high socks","@secondary","broomstick","pouting expression","sitting sidesaddle on a broomstick",{tailStyle:"thick shark tail",fangClawStyle:"sharp shark teeth"}),
    WI("penguin","@primary","@third","@primary","sheer thigh-high stockings","@primary","small penguin familiar hugged in her arms","bright cheerful expression","shy clasped-hands posture"),
    WI("fox","@primary","@secondary","@third","white tabi socks with wooden sandals","@extra","lit ritual candle","sly, fox-like smirk","over-the-shoulder glance",{earStyle:"fox ears",tailStyle:"large bushy fox tail"}),
    WI("lovebird","@primary","@secondary","@accent","thigh-high socks with bows","@secondary","bubbling potion bottle","wide-eyed delighted expression","light playful posture",null,{shoulderPiece:["little lovebird familiar perched on her shoulder","-"]}),
    WI("flamingo","@primary","@secondary","@primary","thigh-high socks with bows","@secondary","broomstick","flustered, blushing smile","sitting sidesaddle on a broomstick",{wingStyle:"feathered wings"}),
    WI("kraken","@primary","@third","@secondary","garter-strap stockings with lace tops","@primary","crystal ball","mysterious half-smile","hip-popped sultry stance",null,{shoulderPiece:["small octopus familiar draped over her shoulder","-"]}),
    WI("salmon","@primary","@accent","@extra","sheer thigh-high stockings","@extra","glowing spellbook","mysterious half-smile","casting a spell with one hand raised",null,{shoulderPiece:["little salmon familiar swimming in a floating bubble of water beside her shoulder","-"]}),
    WI("crow","@primary","@third","@primary","sheer thigh-high stockings","@secondary","crystal wand","bright, curious little smile","light playful posture",null,{shoulderPiece:["small crow familiar perched on her shoulder with a shiny button in its beak","-"]})
  ]);

  /* ---------- Magical Heroines ---------- */
  opts("posture",["heroic pose with her wand held high","twirling mid-transformation"],"Posture");
  const MOT={griffin:"griffin-wing",badger:"honeycomb-heart",raven:"crescent-moon",serpent:"serpent",wolf:"wolf-moon",swan:"swan",dragon:"dragon-heart",stag:"leaf",shark:"wave",penguin:"snowflake",fox:"fox-flame",lovebird:"lovebird-heart",flamingo:"heart",kraken:"kraken-pearl",salmon:"leaping-salmon",crow:"crow-feather"};
  const MH=h=>`magical heroine dress with a {c2} ${MOT[h]} brooch, a bow-laced bodice and a short layered skirt`;
  items("top",Object.keys(MOT).map(MH),"CUS","costume,sweet");
  items("legwear",["knee-high magical boots with {c2} wing accents"],"CU","costume,sweet");
  items("gloves",["elbow-length magical gloves with {c2} cuffs"],"CU","costume,sweet");
  items("heldItem",["jeweled magic wand","heart-topped scepter","crescent-moon wand","star-tipped staff"],"CU","costume,sweet");
  items("shoulderPiece",["swirling ribbons of light spiraling around her body"],"L","costume,glam");
  const MG=(h,c1,c2,held,ex,po)=>{const it={top:[MH(h),c1,null,c2],gloves:["elbow-length magical gloves with {c2} cuffs","white",null,c2],legwear:["knee-high magical boots with {c2} wing accents",c1,null,c2],headwear:["small jeweled tiara",c2],heldItem:[held]};
    return[h,it,ex,po,"a magical heroine transformation",{more:[{oname:"Mid-transformation",look:"glam",items:{shoulderPiece:["swirling ribbons of light spiraling around her body",c2],headwear:["small jeweled tiara",c2],heldItem:[held]}}]}]};
  set("Academy Magical Heroines","Academy Witches","magical","magical heroine","costume",{tags:["magical heroine","transformation","magic"],oname:"Transformed",c:{skinFinish:"starlight skin shimmer"}},[
    MG("griffin","@third","@accent","jeweled magic wand","determined expression","heroic pose with her wand held high"),
    MG("badger","@primary","@secondary","heart-topped scepter","bubbly open-mouthed grin","striking a heart-hands pose"),
    MG("raven","@primary","@accent","crescent-moon wand","determined, steady gaze","twirling mid-transformation"),
    MG("serpent","@third","@extra","jeweled magic wand","smirk","hip-popped sultry stance"),
    MG("wolf","@secondary","@third","star-tipped staff","playful fanged grin","heroic pose with her wand held high"),
    MG("swan","@primary","@secondary","crescent-moon wand","serene expression","twirling mid-transformation"),
    MG("dragon","@primary","@accent","star-tipped staff","fierce, battle-ready glare","heroic pose with her wand held high"),
    MG("stag","@primary","@accent","jeweled magic wand","dreamy expression","twirling mid-transformation"),
    MG("shark","@primary","@third","star-tipped staff","playful fanged grin","mid-dance pose with one arm raised"),
    MG("penguin","@primary","@accent","heart-topped scepter","sparkling-eyed excited expression","striking a heart-hands pose"),
    MG("fox","@primary","@secondary","jeweled magic wand","playful wink","twirling mid-transformation"),
    MG("lovebird","@primary","@accent","crescent-moon wand","sparkling-eyed excited expression","heroic pose with her wand held high"),
    MG("flamingo","@primary","@secondary","heart-topped scepter","flustered, blushing smile","twirling mid-transformation"),
    MG("kraken","@secondary","@third","crescent-moon wand","seductive smile","twirling mid-transformation"),
    MG("salmon","@primary","@accent","star-tipped staff","determined expression","heroic pose with her wand held high"),
    MG("crow","@primary","@third","crescent-moon wand","playful wink","twirling mid-transformation")
  ]);

  /* ---------- Battle Maidens ---------- */
  opts("faceAccents",["a smudge of dirt on one cheek"],"Face accents");
  opts("posture",["battle-ready stance, weapon raised","resting her weapon on her shoulder"],"Posture");
  items("heldItem",["longsword","war hammer","glaive","twin curved daggers","battle axe","slender rapier","flame-edged greatsword","longbow","trident",
    "frost-rimed spear","katana","ornate scimitar","jeweled spear"],"CU","costume,edgy");
  const AR={griffin:"gilded breastplate bikini top with {c2} griffin wings",badger:"steel breastplate bikini top with a {c2} badger crest",
    raven:"dark plate bikini top with {c2} feather filigree",serpent:"scaled armor bikini top with a {c2} serpent clasp",
    swan:"enamel breastplate bikini top with {c2} feather filigree",dragon:"dragon-scale breastplate bikini top with {c2} horn spikes",
    stag:"leather armor bikini top with {c2} antler clasps",shark:"scaled armor bikini top with a {c2} shark-tooth clasp",
    penguin:"steel breastplate bikini top with {c2} trim",fox:"lacquered armor bikini top with {c2} silk cords",
    lovebird:"frilly breastplate bikini top with {c2} feather filigree",flamingo:"gilded breastplate bikini top with {c2} heart filigree",kraken:"pearl-studded scale armor bikini top with {c2} tentacle clasps",
    salmon:"scaled armor bikini top with a {c2} leaping-salmon clasp",crow:"black-feathered armor bikini top with {c2} filigree"};
  items("top",Object.values(AR),"L","costume,edgy");
  items("bottom",["armored micro skirt with {c2} tassets","micro scaled armor loincloth","micro leather loincloth with {c2} leaf plates","micro lacquered armor skirt"],"L","costume,edgy");
  items("legwear",["knee-high armored greaves"],"CU","costume,edgy");
  items("top",["cracked breastplate hanging by one strap"],"L","costume,edgy");
  items("bottom",["torn armored loincloth"],"L","costume,edgy");
  const BM=(h,top,bot,sh,held,ex,po)=>{const it={top,bottom:bot,legwear:["knee-high armored greaves",top[1]],heldItem:[held]};if(sh)it.shoulderPiece=sh;
    return[h,it,ex,po,"battle-worn house armor",{more:[{oname:"Battle-torn",items:{top:["cracked breastplate hanging by one strap",top[1]],bottom:["torn armored loincloth",bot[1]],heldItem:[held]}}]}]};
  const SK=(c,c2)=>["armored micro skirt with {c2} tassets",c,null,c2];
  set("Academy Battle Maidens","Academy Magical Heroines","battle","battle maiden","costume",{tags:["armor","warrior","fantasy"],oname:"Armor",c:{skinFinish:"sweat-sheened skin",faceAccents:"a smudge of dirt on one cheek"}},[
    BM("griffin",[AR.griffin,"@accent",null,"@third"],SK("@secondary","@accent"),["winged pauldrons","@accent"],"longsword","fierce, battle-ready glare","battle-ready stance, weapon raised"),
    BM("badger",[AR.badger,"@extra",null,"@primary"],["layered leather battle skirt with steel plates","@accent"],["fur shoulder pelt","@secondary"],"war hammer","determined expression","resting her weapon on her shoulder"),
    BM("raven",[AR.raven,"@primary",null,"@accent"],SK("@extra","@accent"),["single armored shoulder plate","@primary"],"glaive","determined, steady gaze","battle-ready stance, weapon raised"),
    BM("serpent",[AR.serpent,"@third",null,"@extra"],["micro scaled armor loincloth","@secondary"],null,"twin curved daggers","smirk","hip-popped sultry stance"),
    BM("wolf",["micro fur-trimmed leather bikini top","@secondary"],["micro fur-trimmed leather loincloth skirt","@secondary"],["fur shoulder pelt","@primary"],"battle axe","feral snarl","resting her weapon on her shoulder"),
    BM("swan",[AR.swan,"@primary",null,"@accent"],SK("@third","@accent"),["small gilded pauldrons","@accent"],"slender rapier","elegant composed expression","graceful upright posture"),
    BM("dragon",[AR.dragon,"@primary",null,"@accent"],SK("@secondary","@accent"),["small steel pauldrons","@secondary"],"flame-edged greatsword","fierce, battle-ready glare","resting her weapon on her shoulder"),
    BM("stag",[AR.stag,"@secondary",null,"@accent"],["micro leather loincloth with {c2} leaf plates","@primary",null,"@accent"],null,"longbow","determined expression","battle-ready stance, weapon raised"),
    BM("shark",[AR.shark,"@primary",null,"@third"],["micro scaled armor loincloth","@secondary"],null,"trident","playful fanged grin","battle-ready stance, weapon raised"),
    BM("penguin",[AR.penguin,"@third",null,"@accent"],SK("@primary","@accent"),["small steel pauldrons","@third"],"frost-rimed spear","determined expression","strong, squared posture"),
    BM("fox",[AR.fox,"@primary",null,"@secondary"],["micro lacquered armor skirt","@third"],["lacquered shoulder plates","@primary"],"katana","sly, fox-like smirk","battle-ready stance, weapon raised"),
    BM("lovebird",[AR.lovebird,"@primary",null,"@accent"],SK("@secondary","@accent"),["small gilded pauldrons","@secondary"],"short spear with a ribbon tassel","bright cheerful expression","saluting with a cheerful wink"),
    BM("flamingo",[AR.flamingo,"@primary",null,"@secondary"],SK("@secondary","@accent"),null,"jeweled spear","determined expression","resting her weapon on her shoulder"),
    BM("kraken",[AR.kraken,"@primary",null,"@third"],["micro scaled armor loincloth","@secondary"],["single armored shoulder plate","@secondary"],"trident","cool, otherworldly half-smile","hip-popped sultry stance"),
    BM("salmon",[AR.salmon,"@primary",null,"@accent"],["micro scaled armor loincloth","@secondary"],["small gilded pauldrons","@accent"],"slender rapier","elegant composed expression","battle-ready stance, weapon raised"),
    BM("crow",[AR.crow,"@primary",null,"@extra"],SK("@secondary","@extra"),["winged pauldrons","@primary"],"twin curved daggers","mischievous expression","resting her weapon on her shoulder")
  ]);

  /* ---------- Cosplay ---------- */
  items("heldItem",["racing umbrella","toy ray gun","kunai","handcuffs","clipboard","nunchaku","cutlass","pilot helmet tucked under one arm",
    "purification wand with paper streamers","golden oil lamp"],"CU","costume");
  items("top",["glossy superheroine bodysuit with a {c2} emblem and a plunging neckline","racing-queen crop top with {c2} checkered panels",
    "fitted space-captain bodysuit with {c2} piping and a plunging zip front","kunoichi bodysuit with a {c2} sash and a plunging neckline",
    "short qipao with {c2} dragon embroidery and high side slits","leaf-trimmed elven ranger top with a plunging neckline",
    "pirate corset top with {c2} ruffles and a plunging neckline","skintight mecha pilot suit with {c2} panels",
    "shrine-maiden top with wide sleeves, slipping off the shoulders","sheer genie top with {c2} coin fringe and a plunging neckline",
    "cat-keyhole crop top with a {c2} bell","phantom-thief tailcoat leotard with {c2} trim and a plunging neckline"],"US","costume");
  items("heldItem",["glittering stolen jewel"],"CU","costume");items("headwear",["tiny top hat"],"CU","costume");items("outerwear",["short flowing cape"],"CU","costume");
  items("bottom",["micro racing skirt with {c2} checkered trim","micro pencil skirt","short elven skirt with {c2} leaf trim","micro ruffled pirate skirt","micro ruffled skirt"],"US","costume");
  items("legwear",["glossy thigh-high boots","glossy knee-high boots"],"US","costume");
  items("maskAccessory",["sheer mouth veil"],"US","costume,cultural");
  items("headwear",["pilot headset hair clips"],"CU","costume,cyber");
  const CP=(h,it,ex,po,th,c)=>{const back={};["headwear","legwear","gloves","maskAccessory","heldItem","outerwear"].forEach(f=>{if(it[f])back[f]=it[f]});
    return[h,it,ex,po,th,{c:c||{},more:[{oname:"Changing backstage",look:"boudoir",items:back}]}]};
  set("Academy Cosplay","Academy Battle Maidens","cosplay","cosplay","costume",{tags:["cosplay","convention","costume"],oname:"Cosplay"},[
    CP("griffin",{top:["glossy superheroine bodysuit with a {c2} emblem and a plunging neckline","@third",null,"@accent"],outerwear:["short flowing cape","@accent"],legwear:["glossy thigh-high boots","@accent"],maskAccessory:["slim eye mask","@secondary"]},"confident smile","strong, squared posture","superheroine cosplay"),
    CP("badger",{top:["racing-queen crop top with {c2} checkered panels","@primary",null,"@secondary"],bottom:["micro racing skirt with {c2} checkered trim","@primary",null,"@secondary"],legwear:["glossy knee-high boots","@secondary"],heldItem:["racing umbrella"]},"bubbly open-mouthed grin","hip-popped sultry stance","racing-queen cosplay"),
    CP("raven",{top:["fitted space-captain bodysuit with {c2} piping and a plunging zip front","@primary",null,"@accent"],legwear:["glossy thigh-high boots","@extra"],heldItem:["toy ray gun"]},"confident smile","hip-popped sultry stance","space-captain cosplay"),
    CP("serpent",{top:["kunoichi bodysuit with a {c2} sash and a plunging neckline","@secondary",null,"@third"],legwear:["fishnet thigh-high stockings","@secondary"],maskAccessory:["cloth face mask pulled down under the chin","@secondary"],heldItem:["kunai"]},"half-lidded sultry gaze","leaning forward posture","kunoichi cosplay"),
    CP("wolf",{top:["cropped officer shirt unbuttoned to the navel","@secondary"],bottom:["micro pencil skirt","@secondary"],headwear:["peaked leather cap","@secondary"],legwear:["sheer thigh-high stockings","@extra"],heldItem:["handcuffs"]},"smirk","relaxed, weight-shifted stance","police-officer cosplay"),
    CP("swan",{top:["micro nurse dress unzipped to the navel","@primary"],headwear:["nurse cap with a small {c2} cross","@primary",null,"@secondary"],legwear:["sheer thigh-high stockings","@primary"],heldItem:["clipboard"]},"gentle smile","shy clasped-hands posture","nurse cosplay"),
    CP("dragon",{top:["short qipao with {c2} dragon embroidery and high side slits","@primary",null,"@accent"],legwear:["sheer thigh-high stockings","@extra"],heldItem:["nunchaku"]},"confident smile","battle-ready stance, weapon raised","martial-artist cosplay",{hairStyle:"double buns"}),
    CP("stag",{top:["leaf-trimmed elven ranger top with a plunging neckline","@primary"],bottom:["short elven skirt with {c2} leaf trim","@secondary",null,"@accent"],legwear:["glossy knee-high boots","@secondary"],heldItem:["longbow"]},"dreamy expression","soft poised posture","elf-archer cosplay",{earStyle:"long pointed elf ears"}),
    CP("shark",{top:["pirate corset top with {c2} ruffles and a plunging neckline","@primary",null,"@third"],bottom:["micro ruffled pirate skirt","@secondary"],headwear:["feathered tricorn hat","@secondary"],heldItem:["cutlass"]},"playful fanged grin","hip-popped sultry stance","pirate-captain cosplay"),
    CP("penguin",{top:["skintight mecha pilot suit with {c2} panels","@primary",null,"@accent"],headwear:["pilot headset hair clips","@accent"],heldItem:["pilot helmet tucked under one arm"]},"bright cheerful expression","strong, squared posture","mecha-pilot cosplay"),
    CP("fox",{top:["shrine-maiden top with wide sleeves, slipping off the shoulders","@extra"],bottom:["micro {c} hakama-style skirt","@primary"],legwear:["white tabi socks with wooden sandals","@extra"],heldItem:["purification wand with paper streamers"]},"sly, fox-like smirk","over-the-shoulder glance","shrine-maiden cosplay",{earStyle:"fox ears",tailStyle:"large bushy fox tail"}),
    CP("lovebird",{top:["{c} angel dress with puffy sleeves and a big bow","@secondary"],wingPiece:["pair of fluffy {c} feathered wings","@secondary"],headwear:["halo headband","-"],legwear:["thigh-high socks with bows","@secondary"],heldItem:["small golden harp"]},"happy closed-eye smile","curtsying with her skirt held out","pastel angel cosplay"),
    CP("flamingo",{top:["cat-keyhole crop top with a {c2} bell","@primary",null,"@accent"],bottom:["micro ruffled skirt","@secondary"],gloves:["furry paw gloves","@primary"],legwear:["thigh-high socks with bows","@secondary"]},"teasing tongue-out expression","light playful posture","catgirl cosplay",{earStyle:"cat ears",tailStyle:"slender feline tail"}),
    CP("kraken",{top:["sheer blouse unbuttoned to the navel","@extra"],bottom:["micro pencil skirt","@primary"],legwear:["sheer seamed thigh-high stockings","@primary"],eyewear:["thin wire-rimmed reading glasses","@secondary"],heldItem:["clipboard"]},"shy, breathless smile with parted lips","hip-popped sultry stance","office-lady cosplay"),
    CP("salmon",{top:["sheer genie top with {c2} coin fringe and a plunging neckline","@primary",null,"@accent"],bottom:["sheer-panelled harem pants","@secondary"],maskAccessory:["sheer mouth veil","@primary"],heldItem:["golden oil lamp"]},"half-lidded sultry gaze","hip-popped sultry stance","genie cosplay"),
    CP("crow",{top:["phantom-thief tailcoat leotard with {c2} trim and a plunging neckline","@primary",null,"@extra"],outerwear:["short flowing cape","@secondary"],headwear:["tiny top hat","@primary"],maskAccessory:["slim eye mask","@accent"],legwear:["glossy thigh-high boots","@primary"],heldItem:["glittering stolen jewel"]},"mischievous expression","over-the-shoulder glance","phantom-thief cosplay")
  ]);
})();

/* ---- v126/v127: Pairs, two characters in one image ----
   the image generator's multi-character prompting takes one base prompt plus one prompt per character box. The Scene tab
   writes this design as character 1 and a partner starting point as character 2 (with its own outfit), and a
   base prompt with the count tag and the scene. Quality tags and the negative prompt come from the Finish step,
   as for one character. v127: the token budget follows the the image generator model chosen in the Character prompt tab (V5 about 1471,
   V5 Curated about 703, V4/V4.5 about 512), counted over the base and both characters. Nothing is shortened
   unless the pair goes over that budget; then, with "Shorten only if over the limit" on, it tries compact tags
   first, and only then leaves out the palette, makeup and outfit-detail layers and a few minor details, moving
   the style line into the base prompt.
   An action between them ("hug") is written as the image generator interaction tags: mutual#hug on both, or
   source#hug / target#hug. A starting point can carry a partner in out.pair = {id, outfit, scene, act, dir};
   the "Academy Couples" group uses that. Picking a starting point without a partner clears the partner.
   Nothing here changes how a single character's prompt is written.
   v129: the action can hold several tags ("sex, vaginal, missionary"); each one gets its own source#/target#/mutual#.
   A pair can also carry {explicit, penis, pc}: explicit scenes are held back whenever the safeguard (Policy) holds
   back either character; penis:true means the act needs one, so a woman chosen as character 2 is written as a
   futanari for it; pc sets a few of character 2's fields (expression, posture) for the scene. Scene text can use
   {partner} {his} {he} {him} {cock}, written to match whoever is character 2 (capitalized forms work too).
   v131: in an explicit pair, "NSFW, Explicit" goes at the end of the base prompt, not the character prompts.
   v142: a scene can work without a partner. pair.solo is its text for one character: with "No partner" picked,
   the tab writes "1girl, solo" (or "1boy, solo") with that text, plus character 1, and the one prompt is
   base | character 1. Pick a partner and it becomes the two-character scene (pair.scene) again.
   v132: a "Character 1" picker loads any starting point as character 1 and keeps the pair (scene, action, partner).
   In an explicit pair the new character 1 also opens in her Nude outfit and takes the scene's own settings
   for character 1 (pair.c1: expression, pose, arousal), unless she is a man or the safeguard holds her back.
   v133: scene outfits. pair.w1 / pair.w2 = {name, look, f:{items}, m:{items}} dress character 1 / character 2 for
   the scene, cut for a woman (f) or a man (m), in that character's own palette. Character 2 uses it through the
   "Scene outfit" choice (pair.outfit "scene"); character 1 gets it when picked with the Character 1 picker.
   pair.c1 now applies to any scene (still not to a man, and not to a held-back design in an explicit scene).
   {lover} becomes "her boyfriend" / "her girlfriend" / "her futanari girlfriend". pair.couple adds "couple"
   (and "yuri" for two women) to a non-explicit scene.
   v135: scene-outfit colors can be written as tones that are picked from each wearer's own palette:
   @c1 @c2 @c3 (clothing colors: never the hair color or a metal), @dark, @light, @metal and @hair. So the same
   scene outfit reads right on any character, whichever palette slot holds her hair.
   v137: "One prompt" puts everything in the image generator's single-prompt form, base | character 1 | character 2
   (Multi-Character Prompting: the main prompt is split at each "|", V4 and later, and only
   when no character boxes exist). The quality tags can close the base part (S.out.pairQ, on by default). */
/* v264: "No outfit" for character 2 and characters 3 to 6 (pair.outfit / more[i].outfit "none"): that character is
   written by her Character only prompt (output mode Character only, no garments), the same prompt the Character prompt tab
   gives in that mode, with the same safeguards. When an explicit scene is held back she is dressed in her first outfit,
   like anyone else in it. */
/* v216: up to six characters. pair.more = [{id, outfit, tags}] adds characters 3 to 6 next to character 2 (pair.id);
   pair.group names a group, and the Scene step shows its members as a lineup to add or drop. With more than two
   characters the count line is worked out from everyone ("4girls, multiple girls"), {n} in the scene becomes the number
   of characters ("three", "Four" for {N}), and two more fitting stages keep the prompt inside the budget: "mini" (only
   identity, hair, eyes, body, skin and garments) and "micro" (a built-in Academy girl as her one-line identity plus her
   garments; character 1 always keeps her mini prompt). Characters 3 to 6 get their own boxes and join the one prompt. */
(function(){
  const sft=stateFromTemplate;
  stateFromTemplate=function(t){
    const b=sft(t);b.out.pair=t&&t.out&&t.out.pair?JSON.parse(JSON.stringify(t.out.pair)):null;
    if(b.out.pair&&typeof setTab==="function")setTimeout(()=>{try{setTab("pair")}catch(e){}},0);
    return b;
  };
  /* v192: a saved design can be cast as character 1 or 2 ("save:<id>"); it is read from the saves, kept as its own state */
  let saveCache=[],saveRaw=null;
  const savesNow=()=>{let raw="";try{raw=localStorage.getItem(KEY_SAVES)||""}catch(e){}
    if(raw!==saveRaw){saveRaw=raw;try{saveCache=(typeof readSaves==="function"?readSaves():[])||[]}catch(e){saveCache=[]}}return saveCache};
  function saveTpl(sid){const s=savesNow().find(x=>x.id===sid);if(!s||!s.state)return null;const st=s.state,outs=st.outfits||[];
    return{id:"save:"+sid,name:s.name||"My save",_state:st,pal:st.pal||{},c:st.c||{},outfit:{oname:(outs[0]&&outs[0].name)||"Outfit 1",items:{}},
      more:outs.slice(1).map((o,i)=>({oname:o.name||("Outfit "+(i+2)),items:{}})),out:{}}}
  const tpl=id=>typeof id==="string"&&id.startsWith("save:")?saveTpl(id.slice(5)):tplById(id);
  const stOf=t=>t&&t._state?normalize(JSON.parse(JSON.stringify(t._state))):sft(t);
  const outfitNames=t=>[t.outfit].concat(t.more||[]).map((o,i)=>o.oname||("Outfit "+(i+1)));
  const SLIM_OFF=["palette","makeup","details","extras"],SLIM_C=["impression","faceAccents","armShape","torsoShape","handShape","bustWeight"];
  const MINI_OFF=["palette","makeup","details","extras","accessories","underwear","face"],MINI_C=SLIM_C.concat(["shoulderShape","legShape","thighBuild","stomachShape","bustShape","irisDetail","pupilStyle","lashNatural","hairMovement"]);
  /* v216: more characters */
  const MAXC=6,NUMW=["no","one","two","three","four","five","six"];
  const moreOf=p=>p&&p.id&&Array.isArray(p.more)?p.more.filter(m=>m&&m.id&&tpl(m.id)).slice(0,MAXC-2):[];
  const fillN=(s,n)=>String(s||"").replace(/\{n\}/g,NUMW[n]||String(n)).replace(/\{N\}/g,(NUMW[n]||String(n)).replace(/^./,c=>c.toUpperCase()));
  /* a built-in Academy student (not a headmistress or a boyfriend) can be written as her one-line identity */
  const idLine=t=>{try{const h=window.BIO_GIRL&&BIO_GIRL(t),G=h&&ACAD.REALG&&ACAD.REALG[h];return G&&G.id?[ACAD.HNAME&&ACAD.HNAME[h]||ACAD.cap(h),G.id,G.fig].filter(Boolean).join(", "):""}catch(e){return""}};
  /* compose another state without disturbing this design (S, the compose context and the drop notes are restored) */
  function composeState(st,o,pc){
    const keepS=S,keepCK=CK,keepLAST=LAST;
    try{
      const bare=!!(st&&st._noOutfit);S=normalize(st);S.out.compact=!!o.compact;S.out.mode=bare?"char":"full";
      if(pc)Object.entries(pc).forEach(([k,v])=>{if(v==null)delete S.c[k];else S.c[k]=v});
      if(o.slim){SLIM_OFF.forEach(id=>{S.layers[id]={...(S.layers[id]||{}),on:false}});SLIM_C.forEach(f=>{delete S.c[f]})}
      if(o.mini){MINI_OFF.forEach(id=>{S.layers[id]={...(S.layers[id]||{}),on:false}});MINI_C.forEach(f=>{delete S.c[f]})}
      if(o.only){LAYER_DEFS.forEach(([id])=>{if(!o.only.includes(id))S.layers[id]={...(S.layers[id]||{}),on:false}})}
      Policy.enforce();
      const r=compose();const blocked=!!r.blocked;
      return{age:S.c.age||"",prompt:r.prompt.trim().replace(/[,\s]+$/,""),blocked,reason:blocked?(Policy.reason()||Policy.banner()||""):"",male:isMale(),must:(S.out.must||"").trim(),name:S.name||""};
    }finally{S=keepS;CK=keepCK;LAST=keepLAST}
  }
  const clean=s=>String(s||"").trim().replace(/[.,\s]+$/,"");
  /* one character, no partner: pair.solo */
  /* v201: scene emphasis. Character prompts are long and detailed, so a short scene or a single action could lose out
     to them and the characters were drawn standing side by side. The scene's action tags now also open the base prompt,
     and the action tags and the scene text are weighted up: Strong (default) 1.3 and 1.15, Strongest 1.5 and 1.3, Off as
     before. Weights follow Finish > Weight format; text that already carries its own weights is left as it is. */
  /* v207: actions in three groups: both (mutual), character 1 to 2 (ab), character 2 to 1 (ba) */
  const ACT_RX=/^(mutual|source|target)#\s*/i;
  function actParse(p){const d=p&&p.dir||"mutual";return String(p&&p.act||"").split(",").map(x=>x.trim()).filter(Boolean).map(x=>{
    const m=x.match(ACT_RX);const g=m?({mutual:"mutual",source:"ab",target:"ba"})[m[1].toLowerCase()]:d;return{g,t:x.replace(ACT_RX,"").trim()}}).filter(x=>x.t)}
  function actWrite(p,list){const seen=new Set();p.act=list.filter(x=>{const k=x.g+"|"+x.t;if(!x.t||seen.has(k))return false;seen.add(k);return true})
    .map(x=>(x.g==="mutual"?"mutual#":x.g==="ab"?"source#":"target#")+x.t).join(", ")}
  window.PAIR_ACTS={parse:actParse,write:actWrite};
  const EMPH={off:null,strong:{act:1.3,scene:1.15},max:{act:1.5,scene:1.3}};
  const emphOf=p=>EMPH[p&&p.emph||"strong"]===undefined?EMPH.strong:EMPH[p&&p.emph||"strong"];
  function W(text,w){
    text=String(text||"").trim().replace(/[,\s]+$/,"");if(!text||!w||w===1)return text;
    if(/::|[{}\[\]]/.test(text))return text;
    if(S.out.wfmt==="braces"){const n=Math.max(1,Math.round(Math.log(w)/Math.log(1.05)));return"{".repeat(n)+text+"}".repeat(n)}
    return`${(+w).toFixed(2).replace(/0$/,"")}::${text}::`;
  }
  /* v202: sex-scene expressions for each character. A preset (or chips) replaces her own expression and overall
     impression for this scene only; the tags open her character prompt, weighted with the scene emphasis, and the preset
     writes one sentence into the scene. Explicit ones follow the safeguard. */
  const EX_PRESETS=[
    ["shy","Shy","blush, embarrassed, shy, looking away, biting own lip",0,"{S} blushes deeply and bites {p} lip, too shy to look up."],
    ["pleasure","Pleasure","blush, half-closed eyes, open mouth, moaning, heavy breathing, sweat",1,"{S} moans with half-closed eyes and parted lips, breathing hard as pleasure washes over {o}."],
    ["overwhelmed","Overwhelmed","heavy blush, tears, teary eyes, rolling eyes, drooling, moaning, open mouth, sweat",1,"{S} is completely overwhelmed, tears of pleasure running down {p} flushed cheeks as {p} eyes roll back and {s} drools."],
    ["silly","Fucked silly","ahegao, rolling eyes, heart-shaped pupils, tongue out, drooling, heavy blush, tears, trembling",1,"{P} eyes roll back with hearts in {p} pupils, {p} tongue lolling out in a fucked-silly ahegao as {s} trembles all over."],
    ["guilty","Guilty","guilt, ashamed, tears, teary eyes, blush, looking away, frown",0,"{S} looks away in shame, tears in {p} eyes and {p} face burning with guilt, even as {s} gives in."],
    ["smug","Smug","smug, smirk, half-closed eyes, looking down, confident",0,"{S} smirks down with half-lidded eyes, completely in control."],
    ["lovestruck","Lovestruck","blush, gentle smile, eye contact, sparkling eyes, lovestruck",0,"{S} gazes back with a lovestruck smile and sparkling eyes, utterly smitten."],
    ["afterglow","Afterglow","afterglow, dazed, satisfied smile, flushed, heavy breathing, sweat, messy hair",1,"{S} lies dazed and flushed in the afterglow, panting with a satisfied smile, {p} skin glistening with sweat."],
    /* v205: emotions for drama, caught and heartbreak scenes (none explicit) */
    ["annoyed","Annoyed","annoyed, pout, half-closed eyes, frown, looking away",0,"{S} pouts with an annoyed frown, refusing to look over."],
    ["angry","Angry","angry, v-shaped eyebrows, glaring, frown, clenched teeth, blush",0,"{S} glares with furrowed brows and clenched teeth, visibly angry."],
    ["furious","Furious","furious, angry, v-shaped eyebrows, glaring, clenched teeth, shaded face, anger vein, shouting",0,"{S} is absolutely furious, {p} face dark and twisted with rage as {s} glares and shouts through clenched teeth."],
    ["jealous","Jealous","jealous, pout, glaring, narrowed eyes, blush, frown",0,"{S} glares with narrowed eyes, burning with jealousy."],
    ["sad","Sad","sad, frown, downcast eyes, tearing up, wavy mouth",0,"{S} looks down sadly, {p} eyes wet and {p} lips trembling."],
    ["heartbroken","Heartbroken","heartbroken, crying, streaming tears, tears, empty eyes, trembling, wavy mouth",0,"{S} is heartbroken, tears streaming down {p} face as {s} stares in disbelief, {p} lips trembling."],
    ["crying","Crying","crying, sobbing, streaming tears, tears, open mouth, wavy mouth, runny nose, blush",0,"{S} sobs openly, tears pouring down {p} flushed cheeks."],
    ["embarrassed","Embarrassed","embarrassed, flustered, full-face blush, nose blush, wavy mouth, sweatdrop, looking away",0,"{S} is bright red with embarrassment, flustered and unable to look up."],
    ["surprised","Surprised","surprised, wide-eyed, open mouth, raised eyebrows, blush",0,"{S} gasps in surprise, eyes wide and mouth open."],
    ["shocked","Shocked","shocked, wide-eyed, constricted pupils, open mouth, sweat, shaded face, turn pale",0,"{S} freezes in shock, {p} face pale, pupils shrunk and mouth hanging open."],
    ["scared","Scared","scared, nervous, wide-eyed, trembling, sweat, tears, open mouth",0,"{S} trembles in fear, eyes wide and teary."]];
  const EX_SEX=new Set(["shy","pleasure","overwhelmed","silly","guilty","smug","lovestruck","afterglow"]);
  const EX_CHIPS=[["Mood",["angry","annoyed","sad","crying","embarrassed","flustered","surprised","shocked","jealous","scared","nervous"]],
    ["Eyes",["closed eyes","half-closed eyes","rolling eyes","heart-shaped pupils","teary eyes","tearing up","wide-eyed","glaring","empty eyes","looking at viewer","looking away","eye contact"]],
    ["Brows",["v-shaped eyebrows","furrowed brow","raised eyebrows","sad eyebrows"]],
    ["Mouth",["open mouth","biting own lip","tongue out","drooling","moaning","panting","clenched teeth","pout","wavy mouth","smile","smirk","shouting"]],
    ["Face",["blush","heavy blush","nose blush","sweat","sweatdrop","tears","streaming tears","saliva trail","trembling","frown","shaded face","anger vein","ahegao"]]];
  const EX_EXPLICIT=new Set(["moaning","rolling eyes","heart-shaped pupils","tongue out","drooling","saliva trail","ahegao","afterglow","heavy breathing","panting","trembling"]);
  const exList=s=>String(s||"").split(",").map(x=>x.trim()).filter(Boolean);
  const exTags=(v,blocked)=>exList(v).filter(x=>!(blocked&&EX_EXPLICIT.has(x))).join(", ");
  function buildSolo(p,o){
    const a=composeState(JSON.parse(JSON.stringify(S)),o,p.ex1?{expression:null,impression:null}:null);
    const held=!!p.explicit&&a.blocked;
    const NX=/[,\s]*NSFW, Explicit\s*$/i,nsfw=NX.test(a.prompt);
    if(p.explicit||a.blocked)a.prompt=a.prompt.replace(NX,"");
    const style=o.slim?clean(a.must):"";
    /* v143: pair.soloCount can replace "1girl, solo" (e.g. "1girl, audience" when a crowd is in the background) */
    const cnt=p.soloCount?(a.male?String(p.soloCount).replace(/\b1girl\b/,"1boy"):p.soloCount):(a.male?"1boy, solo":"1girl, solo");
    const E=emphOf(p);
    const soloT=clean(fill(withPanels(p,p.solo),{partner:"someone",his:"their",he:"they",him:"them",cock:"cock",lover:"her lover"}));   /* v205: no {tokens} can leak into a solo prompt */
    const base=[cnt,held?"":E?W(soloT,E.scene):soloT,style,p.explicit&&nsfw&&!held?"NSFW, Explicit":""].filter(Boolean).join(", ");
    const x1=held?"":exTags(p.ex1,a.blocked);
    const c1=[a.male?"boy":"girl",x1?(E?W(x1,1.2):x1):"",a.prompt].filter(Boolean).join(", ");
    const tk=s=>s.length/4|0;
    return{t:null,base,c1,c2:"",tb:tk(base),t1:tk(c1),t2:0,total:tk(base)+tk(c1),o,blocked:a.blocked,held,futa:false,heldWho:held?"character 1":"",reason:a.reason,solo:true};
  }
  /* v203: a generic faceless man as character 2 (as in Hate Sex II and the NTR sets). He has no character prompt at all:
     the base prompt names him (1boy, faceless male, muscular male) and one line keeps his face out of the image, so every
     token of detail goes to her and to the scene. "pov" shows the scene from his point of view. */
  const GENERIC={far:{label:"Faceless man",count:"1girl, 1boy, hetero, faceless male, head out of frame, muscular male",
      line:"The man is faceless, his head out of frame: only his muscular body is shown, so the image is all about her."},
    pov:{label:"Faceless man (POV)",count:"1girl, 1boy, hetero, pov, faceless male, muscular male",
      line:"Seen from the man's point of view (pov): only his muscular body and strong hands are visible, and his face is never shown."}};
  window.PAIR_GENERIC=GENERIC;
  function buildGeneric(p,o){
    const G=GENERIC[p.gm]||GENERIC.far;
    const a=composeState(JSON.parse(JSON.stringify(S)),o,p.ex1?{expression:null,impression:null}:null);
    const held=!!p.explicit&&a.blocked;
    const NX=/[,\s]*NSFW, Explicit\s*$/i,nsfw=NX.test(a.prompt);
    a.prompt=a.prompt.replace(NX,"");
    const style=o.slim?clean(a.must):"";
    const E=emphOf(p);
    const acts=held?[]:String(p.act||"").split(",").map(x=>x.trim().replace(/^(mutual|source|target)#/i,"").trim()).filter(Boolean);
    const scene=held?"":clean(fill(withPanels(p,p.scene),partnerWords(true,false)));
    const man=held?"":clean(G.line+(p.explicit&&!a.blocked?" He has a giant, veiny, rock-hard cock.":""));
    const base=[a.male?G.count.replace("1girl, 1boy, hetero","2boys"):G.count,E&&acts.length?W(acts.join(", "),E.act):acts.join(", "),E?W(scene,E.scene):scene,man,held?"":clean(p.tags2),style,p.explicit&&nsfw&&!held?"NSFW, Explicit":""].filter(Boolean).join(", ");
    const x1=held?"":exTags(p.ex1,a.blocked);
    const c1=[a.male?"boy":"girl",x1?(E?W(x1,1.2):x1):"",held?"":clean(p.tags1),a.prompt].filter(Boolean).join(", ");
    const tk=s=>s.length/4|0;
    return{t:null,base,c1,c2:"",tb:tk(base),t1:tk(c1),t2:0,total:tk(base)+tk(c1),o,blocked:a.blocked,held,futa:false,heldWho:held?"character 1":"",reason:a.reason,solo:true,generic:G.label};
  }
  function pairPrompts(){
    const p=S.out.pair;if(!p)return null;
    if(!p.id){
      if(!p.solo&&!p.gm)return null;
      const B=p.gm?buildGeneric:buildSolo;
      const max=naiModel().max,fit=p.fit!==false,stages=[{compact:!!p.compact,slim:false}];
      if(fit){if(!p.compact)stages.push({compact:true,slim:false});stages.push({compact:true,slim:true})}
      let r=null;for(const o of stages){r=B(p,o);if(r.total<=max)break}
      r.max=max;r.shortened=r.o.slim?"compact tags and fewer details":r.o.compact&&!p.compact?"compact tags":"";
      return r;
    }
    const t=tpl(p.id);if(!t)return{missing:p.id};
    const max=naiModel().max,fit=p.fit!==false;
    const stages=[{compact:!!p.compact,slim:false}];
    if(fit){if(!p.compact)stages.push({compact:true,slim:false});stages.push({compact:true,slim:true});
      if(moreOf(p).length)stages.push({compact:true,slim:true,mini:true},{compact:true,slim:true,mini:true,micro:true})}
    const st=stOf(t);
    const so=p.outfit==="scene"?sceneOutfit(p.w2,st.c&&st.c.sex==="male",st):null;
    if(so){st.outfits.push(so);st.cur=st.outfits.length-1}
    else if(p.outfit==="none"){st._noOutfit=true;st.cur=0}
    else st.cur=Math.min(Math.max(0,+p.outfit||0),st.outfits.length-1);
    let r=null;
    for(const o of stages){r=build(p,t,st,o);if(r.total<=max)break}
    r.max=max;r.shortened=r.o.micro?"each extra Academy girl as her one-line identity and outfit, character 1 with the essentials":r.o.mini?"only the essentials for each character":r.o.slim?"compact tags and fewer details":r.o.compact&&!p.compact?"compact tags":"";
    return r;
  }
  /* tones for scene outfits, picked from the wearer's palette */
  const SLOTS=["primary","secondary","third","accent","extra"];
  const METAL=/gold|silver|bronze|copper|metallic|platinum|brass|chrome/i,DARK=/black|charcoal|navy|midnight|gray|grey|brown|chocolate|burgundy|plum|forest|maroon|ebony/i,LIGHT=/white|cream|ivory|pearl|beige|pale|ecru/i;
  function sceneColors(pal,c){
    const name=k=>String(pal&&pal[k]||"").trim(),hr=c&&c.hairBase;
    const hair=(typeof hr==="string"&&hr[0]==="@"?name(hr.slice(1)):String(hr||"")).toLowerCase();
    const ok=k=>name(k)&&name(k).toLowerCase()!==hair;
    const cloth=["third","secondary","accent","extra","primary"].filter(k=>ok(k)&&!METAL.test(name(k)));
    const find=(rx,d)=>{const k=SLOTS.find(k=>ok(k)&&rx.test(name(k)));return k?"@"+k:d};
    const at=k=>k?"@"+k:"black";
    return{c1:at(cloth[0]),c2:at(cloth[1]||cloth[0]),c3:at(cloth[2]||cloth[1]||cloth[0]),
      metal:find(METAL,"gold"),dark:find(DARK,"charcoal gray"),light:find(LIGHT,"white"),hair:typeof hr==="string"&&hr?hr:"black"};
  }
  const toneOf=(v,T)=>typeof v==="string"&&v[0]==="@"&&!SLOTS.includes(v.slice(1))&&T[v.slice(1)]!==undefined?T[v.slice(1)]:v;
  /* a scene outfit for one character, cut for a man or a woman, in that character's palette */
  function sceneOutfit(w,male,st){
    const items=w&&(male?w.m:w.f);if(!items)return null;
    const T=sceneColors(st&&st.pal,st&&st.c);
    const o=newOutfit(w.name||"Scene outfit");o.look=w.look||"";
    Object.entries(items).forEach(([f,a])=>{const[v,col,wn,c2]=a;o.items[f]={v,c:col==null?(f==="heldItem"?"-":""):toneOf(col,T),...(wn?{w:wn}:{}),...(c2?{c2:toneOf(c2,T)}:{})}});
    return o;
  }
  /* words for character 2 in scene text */
  function partnerWords(male,futa){
    return male?{partner:"the man",his:"his",he:"he",him:"him",cock:"penis",lover:"her boyfriend"}
      :futa?{partner:"the futanari woman",his:"her",he:"she",him:"her",cock:"futanari penis",lover:"her futanari girlfriend"}
      :{partner:"the other woman",his:"her",he:"she",him:"her",cock:"strap-on",lover:"her girlfriend"};
  }
  const fill=(s,W)=>String(window.SCENE_SLOTS?SCENE_SLOTS.fill(s||""):s||"").replace(/\{(partner|his|he|him|cock|lover)\}/gi,(m,k)=>{const v=W[k.toLowerCase()];return k[0]===k[0].toUpperCase()?v[0].toUpperCase()+v.slice(1):v});
  /* a woman as character 2 in an act that needs a penis is written as a futanari */
  function futaize(txt,compact){
    if(compact)return"veiny hard erect futanari penis, "+txt;
    let n=0;
    let s=txt.replace(/\b(The|the) (?:(young|mature|older) )?woman\b/g,(m,a,adj)=>{n++;return a+(adj==="young"?" young futanari-woman":adj?" "+adj+" futanari woman":" futanari woman")});
    const add=(n?"The futanari woman":"She is a futanari and")+" has a veiny, hard, erect futanari penis.";
    const i=s.indexOf(". ");
    return i>0?s.slice(0,i+2)+add+" "+s.slice(i+2):add+" "+s;
  }
  /* v176: size-aware scenes (Comparing Breasts, Comparing Butts). pair.sz holds three versions of the scene (character 1 is
     bigger, smaller, or they are even) and the one used is worked out from whoever is character 1 and character 2 right now,
     so the smug one and the pouting one are always the right way round, for any two characters. */
  const SZ_RANK=[[/\b(enormous|huge|gigantic|massive)\b/,6],[/\bvery large|extremely large|very full\b/,5],[/\bmedium-large\b/,3.5],[/\blarge\b/,4],[/\bsmall-to-medium\b/,2],[/\bmedium\b/,3],[/\bsmall|petite|flat\b/,1]];
  const bustRank=v=>{v=String(v||"").toLowerCase();for(const[r,n]of SZ_RANK)if(r.test(v))return n;return 3};
  const buttRank=c=>{const bt=String(c.buttSize||"").toLowerCase(),hp=String(c.hipShape||"").toLowerCase();let n=0;
    if(/very full|very large|extremely|huge|bubble|heart-shaped|projecting|projection|large/.test(bt))n+=2;else if(/full|soft/.test(bt))n+=1;if(/small|toned|firm/.test(bt))n-=0.5;
    if(/very wide|wide|broad|prominent/.test(hp))n+=1.5;else if(/rounded|hourglass|curvy|flared/.test(hp))n+=0.5;if(/narrow|lean|athletic/.test(hp))n-=1;return n};
  window.PAIR_SIZE={bust:bustRank,butt:buttRank};
  function sizeVersion(p,c1,c2){
    const z=p&&p.sz;if(!z||!z.v||!c2)return null;
    const sc=c=>z.size==="breasts"?bustRank(c&&c.bustSize):buttRank(c||{}),x=sc(c1),y=sc(c2);
    const v=x>y?z.v.big:x<y?z.v.small:z.v.even;if(!v)return null;
    const t=String(v.text||"");
    return{scene:z.pre+(t?t[0].toUpperCase()+t.slice(1):"")+z.post,tags1:v.t1,tags2:v.t2,ex1:v.ex1,ex2:v.ex2};
  }
  /* the partner's character fields, for the size check */
  const partnerC=p=>{const t=p&&p.id&&tpl(p.id);return t?stOf(t).c:null};
  /* typing into the scene or the tags keeps what is showing: the size version is written out first */
  function freezeSize(p){const v=sizeVersion(p,S.c,partnerC(p));if(v){p.scene=v.scene;p.tags1=v.tags1;p.tags2=v.tags2;p.pc={...(p.pc||{}),expression:v.ex2};
    if(!isMale())S.c.expression=v.ex1}if(p)delete p.sz}
  function build(p,t,st,o){
    const zv=sizeVersion(p,S.c,st.c);
    if(zv)p={...p,scene:zv.scene,tags1:zv.tags1,tags2:zv.tags2,pc:{...(p.pc||{}),expression:zv.ex2}};
    const ov1={...(zv?{expression:zv.ex1}:{}),...(p.ex1?{expression:null,impression:null}:{})};
    const a=composeState(JSON.parse(JSON.stringify(S)),o,Object.keys(ov1).length?ov1:null);
    let b=composeState(JSON.parse(JSON.stringify(st)),o);
    /* v216: characters 3 to 6 */
    const X=moreOf(p).map(m=>{const tt=tpl(m.id),s3=stOf(tt);
      const so=m.outfit==="scene"?sceneOutfit(p.w2,s3.c&&s3.c.sex==="male",s3):null;
      if(so){s3.outfits.push(so);s3.cur=s3.outfits.length-1}else if(m.outfit==="none"){s3._noOutfit=true;s3.cur=0}else s3.cur=Math.min(Math.max(0,+m.outfit||0),s3.outfits.length-1);
      return{m,t:tt,st:s3,r:microOf(tt,s3,o,m.ex?{expression:null,impression:null}:null)}});
    if(o.micro){const id2=idLine(t);if(id2){const g2=composeState(JSON.parse(JSON.stringify(st)),{...o,only:["identity","garments"]});b={...b,prompt:[id2,g2.prompt].filter(Boolean).join(", ")}}}
    const held=!!p.explicit&&(a.blocked||b.blocked||X.some(x=>x.r.blocked));
    /* v216: when an explicit scene is held back, nobody else in it is drawn undressed either: a partner in a nude or
       in-the-act outfit is put back in her first dressed outfit */
    if(held){const bare=o2=>!o2||/^(nude|in the act)$/i.test(o2.name||"")||!Object.keys(o2.items||{}).length;
      const dress=s0=>{if(!s0._noOutfit&&!bare(s0.outfits[s0.cur]))return null;const s1=JSON.parse(JSON.stringify(s0)),i=s1.outfits.findIndex(x=>!bare(x));delete s1._noOutfit;s1.cur=i<0?0:i;return i<0?null:s1};
      const s2=dress(st);if(s2)b={...composeState(s2,o),blocked:b.blocked};
      X.forEach(x=>{const s4=dress(x.st);if(s4)x.r={...microOf(x.t,s4,o,x.m.ex?{expression:null,impression:null}:null),blocked:x.r.blocked}})}
    /* the scene's own settings for character 2 (pc) only apply when nothing is held back */
    {const ov2={...(p.pc&&!held&&!a.blocked&&!b.blocked?p.pc:{}),...(p.ex2&&!held?{expression:null,impression:null}:{})};
     if(Object.keys(ov2).length&&!o.micro)b=composeState(JSON.parse(JSON.stringify(st)),o,ov2)}
    /* with either character held back, neither prompt carries the explicit tag */
    const NX=/[,\s]*NSFW, Explicit\s*$/i,nsfw=NX.test(a.prompt)||NX.test(b.prompt);
    const nsfwX=X.some(x=>NX.test(x.r.prompt));
    if(a.blocked||b.blocked||p.explicit||X.length){a.prompt=a.prompt.replace(NX,"");b.prompt=b.prompt.replace(NX,"");X.forEach(x=>{x.r.prompt=x.r.prompt.replace(NX,"")})}
    const futa=!!p.penis&&!b.male&&!a.male&&!held;
    let count=a.male&&b.male?"2boys":a.male||b.male?"1girl, 1boy":"2girls";
    /* v163: a scene can set its own count line (e.g. "2girls, 1boy" for a threesome with an unseen third person) */
    if(X.length){   /* v216: three or more characters */
      const all=[a,b].concat(X.map(x=>x.r)),nb=all.filter(x=>x.male).length,ng=all.length-nb;
      count=[ng?(ng===1?"1girl":ng+"girls"):"",nb?(nb===1?"1boy":nb+"boys"):"",ng>1?"multiple girls":"",nb>1?"multiple boys":""].filter(Boolean).join(", ");
      if(p.explicit&&!held)count+=(futa?", futanari":"")+(nb&&ng?", hetero":!nb?", yuri":"")+", group sex";
      if(p.ctags&&!held)count+=", "+fillN(p.ctags,all.length)}
    else if(p.count&&!held){count=p.count}
    else if(p.explicit&&!held)count+=futa?", futanari, futa with female":a.male!==b.male?", hetero":!a.male&&!b.male?", yuri":"";   /* v141: two women without a futanari: yuri */
    else if(p.couple&&!p.explicit)count+=", couple"+(!a.male&&!b.male?", yuri":"");
    if(!X.length&&p.ctags&&!held)count+=", "+fillN(p.ctags,2);
    const style=o.slim?clean(a.must):"";
    const scene=held?"":fillN(fill(withPanels(p,p.scene),partnerWords(b.male,futa)),2+X.length);
    /* v131: in an explicit pair, "NSFW, Explicit" ends the base prompt (same line) instead of the character prompts */
    const dir=p.dir||"mutual";
    const acts=held?[]:String(p.act||"").split(",").map(x=>x.trim().replace(/^(mutual|source|target)#/i,"").trim()).filter(Boolean);
    const E=emphOf(p);
    const base=[count,E&&acts.length?W(acts.join(", "),E.act):"",E?W(clean(scene),E.scene):clean(scene),style,p.explicit&&(nsfw||nsfwX)&&!held?"NSFW, Explicit":""].filter(Boolean).join(", ");
    /* v207: each action can carry its own direction (mutual#, source# = character 1 does it, target# = character 2 does it);
       an action without one follows the scene's direction, as before */
    const actG=held?[]:actParse(p);
    const tag=(who)=>actG.map(({g,t:x})=>g==="mutual"?"mutual#"+x:(g==="ab")===(who==="a")?"source#"+x:"target#"+x).join(", ");
    /* v174: per-character direction. pair.tags1 / pair.tags2 are tags for one character only (her expression, where she is
       looking, what she is doing: "pout, breast envy, looking at another"), placed at the front of that character's prompt */
    const own=x=>held||!x?"":String(x);
    const xw=t=>t?(E?W(t,1.2):t):"";
    const x1=held?"":exTags(p.ex1,a.blocked),x2=held?"":exTags(p.ex2,b.blocked);
    const c1=[a.male?"boy":"girl",o.compact?AGE_TAG[a.age]||"":"",tag("a"),xw(x1),own(p.tags1),a.prompt].filter(Boolean).join(", ");
    const c2=[b.male?"boy":"girl",o.compact?AGE_TAG[b.age]||"":"",futa?"futanari":"",tag("b"),xw(x2),own(p.tags2),futa?futaize(b.prompt,o.compact):b.prompt].filter(Boolean).join(", ");
    /* characters 3 to 6 share the actions they all do (mutual) and carry their own tags */
    const mut3=actG.filter(x=>x.g==="mutual").map(x=>"mutual#"+x.t).join(", ");
    const ageT=r0=>o.compact?AGE_TAG[r0.age]||"":"";   /* compact prompts drop the age, so mature characters keep a tag for it */
    const cx=X.map(x=>[x.r.male?"boy":"girl",ageT(x.r),mut3,xw(held?"":exTags(x.m.ex,x.r.blocked)),own(x.m.tags),x.r.prompt].filter(Boolean).join(", "));
    const tk=s=>s.length/4|0;
    const whoHeld=[a.blocked?"character 1":"",b.blocked?"character 2":""].concat(X.map((x,i)=>x.r.blocked?"character "+(i+3):"")).filter(Boolean);
    return{t,base,c1,c2,cx,tb:tk(base),t1:tk(c1),t2:tk(c2),tx:cx.map(tk),total:tk(base)+tk(c1)+tk(c2)+cx.reduce((n,c)=>n+tk(c),0),o,blocked:a.blocked||b.blocked||X.some(x=>x.r.blocked),held,futa,
      heldWho:held?whoHeld.join(whoHeld.length>2?", ":" and ").replace(/, ([^,]*)$/," and $1"):"",reason:a.reason||b.reason||(X.find(x=>x.r.reason)||{r:{}}).r.reason||""};
  }

  /* v216: one extra character at the current stage (micro: her identity line plus garments, when she is a built-in student) */
  function microOf(tt,s3,o,pc){
    if(o.micro){const id=idLine(tt);if(id){const g=composeState(JSON.parse(JSON.stringify(s3)),{...o,only:["identity","garments"]});return{...g,prompt:[id,g.prompt].filter(Boolean).join(", ")}}}
    return composeState(JSON.parse(JSON.stringify(s3)),o,pc);
  }
  const AGE_TAG={"mature woman":"mature female","older woman":"mature female, old woman","mature man":"mature male","older man":"old man, mature male"};

  /* ---------- the Scene tab ---------- */
  const tabs=document.querySelector(".panel .tabs"),negPanel=document.querySelector('.tabpanel[data-panel="neg"]');
  if(!tabs||!negPanel)return;
  const tb=document.createElement("button");tb.setAttribute("role","tab");tb.dataset.tab="pair";tb.setAttribute("aria-selected","false");tb.type="button";tb.textContent="Scene";
  tabs.append(tb);
  const css=document.createElement("style");
  css.textContent=".pairrow{display:grid;grid-template-columns:7.5em 1fr;gap:8px;align-items:center;margin-bottom:10px}.pairrow select{width:100%}"+
    ".pairact{display:grid;grid-template-columns:1fr auto;gap:8px}"+
    ".pairstat{font-size:13px;color:var(--muted);margin:4px 0 12px}.pairstat.over{color:var(--warn,#b45309);font-weight:600}"+
    ".pairopts{display:flex;flex-wrap:wrap;gap:4px 16px;margin:2px 0 4px}"+
    "#pairScene{width:100%;min-height:2.6em;resize:vertical;font:inherit}"+
    "@media (max-width:420px){.pairrow{grid-template-columns:1fr;gap:4px}}";
  document.head.append(css);
  const P=h("div",{class:"tabpanel","data-panel":"pair",hidden:true});
  negPanel.after(P);
  const setP=(fn,key)=>mut(()=>{if(S.out.pair)fn(S.out.pair)},key);
  const intro=h("p",{class:"muted small",text:"Two to six characters in one image with the image generator’s character prompts. Character 1 is this design, character 2 the partner, and a group scene adds more; pick a starting point for either and the scene stays. Paste the base prompt into the main prompt box and each character into its own character box. Quality tags and the negative prompt come from the Finish step."});
  const nudeIndex=t=>{const i=outfitNames(t).indexOf("Nude");return i<0?0:i};
  const partnerSel=h("select",{id:"pairPartner","aria-label":"Partner",onchange:e=>mut(()=>{const v=e.target.value,old0=S.out.pair;
    if(v&&v[0]==="@"){const gm=v.slice(1);
      if(old0&&old0.solo&&!old0.scene)old0.scene=old0.solo;
      S.out.pair=old0?{...old0,id:"",gm,outfit:0}:{id:"",gm,outfit:0,scene:"",act:"",dir:"mutual",compact:false,fit:true};return}
    const old=old0?(({gm,...rest})=>rest)(old0):old0;
    if(!v){S.out.pair=old&&(old.explicit||old.scene||old.act||old.solo)?{...old,id:"",outfit:0}:null;return}
    const t=tpl(v);
    if(old&&!old.penis&&(PENIS_RX.test(String(old.act||""))))old.penis=true;   /* v207: a woman partner in a penetrative scene is futanari */
    S.out.pair=old?{...old,id:v,outfit:old.w2?"scene":old.explicit&&t?nudeIndex(t):0,compact:!!old.compact,fit:old.fit!==false}
      :{id:v,outfit:0,scene:"",act:"",dir:"mutual",compact:false,fit:true}},"pairPartner")});
  /* character 1: load a starting point in place of this design, keeping the pair */
  const selfSel=h("select",{id:"pairSelf","aria-label":"Character 1",onchange:e=>{const v=e.target.value;e.target.value="";const t=v&&tpl(v);if(!t)return;
    const keep=S.out.pair?JSON.parse(JSON.stringify(S.out.pair)):null,o={explicit:S.out.explicit,lewdtag:S.out.lewdtag,model:S.out.model};
    const st=t._state?stOf(t):stateFromTemplate(t);st.out={...st.out,...o,pair:keep};
    /* the scene's settings only go onto a design the safeguard allows explicit content for */
    let ok=false;{const keepS=S;try{S=normalize(JSON.parse(JSON.stringify(st)));ok=Policy.explicitAllowed()}finally{S=keepS}}
    if(keep&&(!keep.explicit||ok)){const male=st.c.sex==="male";
      if(keep.c1&&!male)Object.entries(keep.c1).forEach(([k,x])=>{if(x==null)delete st.c[k];else st.c[k]=x});
      const so=sceneOutfit(keep.w1,male,st);
      if(so){st.outfits.push(so);st.cur=st.outfits.length-1}
      else if(keep.explicit){const i=outfitNames(t).indexOf("Nude");if(i>=0)st.cur=i}
      if(keep.explicit){st.out.explicit=true;st.out.lewdtag=true}}
    replaceState(st);try{toast(`Character 1 is now “${t.name}”. The scene and partner are kept.`)}catch(_){}}});
  let built=false;
  function fillList(sel,first){
    sel.textContent="";sel.append(h("option",{value:"",text:first}));
    if(sel===partnerSel){const og=h("optgroup",{label:"Generic partner"});
      og.append(h("option",{value:"@far",text:"Faceless man (all about her)"}),h("option",{value:"@pov",text:"Faceless man, his point of view"}));sel.append(og)}
    const listed=new Set();
    /* v192: your saved designs first */
    {const sv=savesNow();if(sv.length){const og=h("optgroup",{label:"My saves"});sv.forEach(x=>og.append(h("option",{value:"save:"+x.id,text:x.name||"My save"})));sel.append(og)}}
    /* v140: the men and the robe girls first, then the other groups.
       v210: only the characters themselves (men, robes, headmistresses, signature looks and the non-Academy characters);
       every other look is one "Browse…" away in the Starting points dialog, instead of ten thousand entries in a list */
    const FIRST=["Academy Men","Academy","Academy Headmistresses","Academy Principals","Academy Signature"];
    const groups=FIRST.map(l=>PRESET_GROUPS.start.find(g=>g.label===l)).filter(Boolean).concat(PRESET_GROUPS.start.filter(g=>!FIRST.includes(g.label)&&!/^Academy/.test(g.label)));
    groups.forEach(g=>{const og=h("optgroup",{label:g.label==="Academy"?"Academy robes":g.label});
      g.keys.forEach(k=>{const t=tpl(k),o=t&&(ACAD.peekOut?ACAD.peekOut(t):t.out);if(!t||listed.has(k)||(o&&o.pair))return;listed.add(k);og.append(h("option",{value:k,text:t.name}))});
      if(og.children.length)sel.append(og)});
  }
  let builtSig="";
  function buildPartners(){   /* built on first render, once every starting point is registered; rebuilt when the saves change */
    const v1=partnerSel.value,v2=selfSel.value;
    built=true;builtSig=savesNow().map(x=>x.id+x.name).join("|");fillList(partnerSel,"No partner");fillList(selfSel,"This design");
    partnerSel.value=v1;selfSel.value=v2;
  }
  /* a save made since the lists were built shows up as soon as either list is opened */
  const freshLists=()=>{if(built&&builtSig!==savesNow().map(x=>x.id+x.name).join("|"))buildPartners()};
  [partnerSel,selfSel].forEach(x=>{x.addEventListener("focus",freshLists);x.addEventListener("mousedown",freshLists)});
  const outfitSel=h("select",{id:"pairOutfit","aria-label":"Partner outfit",onchange:e=>setP(p=>{const v=e.target.value;p.outfit=v==="scene"||v==="none"?v:+v},"pairOutfit")});
  const typed=(key,fn)=>e=>{typing="pair";setP(p=>{if(p.sz)freezeSize(p);fn(p,e.target.value)},key);typing=""};
  const soloNow=p=>!!(p&&!p.id&&p.solo&&!p.gm);
  const sceneIn=h("textarea",{id:"pairScene","aria-label":"Scene",rows:"2",placeholder:"two women posing together, cheek to cheek",oninput:typed("pairScene",(p,v)=>{if(soloNow(p))p.solo=v;else p.scene=v})});
  const sceneHint=h("p",{class:"muted small",id:"pairSceneHint",hidden:true,text:"Words in braces follow character 2: {partner} becomes “the man”, or “the futanari woman” when a woman is picked for an act that needs a penis; {lover} becomes “her boyfriend” or “her girlfriend”; {his}, {he}, {him} and {cock} follow along."});
  const actIn=h("input",{type:"text",id:"pairAct","aria-label":"Action between them",placeholder:"hug, holding hands, kiss",oninput:typed("pairAct",(p,v)=>{p.act=v})});
  /* v176: each character's own Danbooru tags (her expression, where she looks, what she does), editable for any pair */
  const tags1In=h("input",{type:"text",id:"pairTags1","aria-label":"Character 1 tags",placeholder:"smug, looking at another, hand on own hip",oninput:typed("pairTags1",(p,v)=>{p.tags1=v})});
  const tags2In=h("input",{type:"text",id:"pairTags2","aria-label":"Character 2 tags",placeholder:"pout, breast envy, looking at another",oninput:typed("pairTags2",(p,v)=>{p.tags2=v})});
  /* v176: the scene library, every scene in the studio for any two characters (built by generic176.js) */
  const libBtn=h("button",{type:"button",class:"pick",id:"pairLib","aria-haspopup":"dialog","aria-expanded":"false",onclick:e=>{
    const L=window.SCENE_LIBRARY;if(!L){toast("The scene library isn’t available in this version.");return}
    openPop(e.currentTarget,{title:"Scenes",sections:L.sections(),searchPlaceholder:"Search scenes",onPick:k=>{const t=L.get(k);if(t)applyScene(t)}})}},
    h("span",{text:"Choose a scene…"}),h("i",{class:"caret","aria-hidden":"true"}));
  /* v210: a scene drawn as several panels in one image. One image is the default; with more, scene 1 is the scene above
     and each further scene has its own box. The prompt reads the way the Academy's two-scene stories do ("The image is
     split into two scenes. In the first scene, … In the second scene, …") and carries the matching koma tag. */
  const PANEL_LAYOUTS=[["","One image"],["2","Two scenes, one above the other (2koma)"],["2h","Two scenes side by side"],["3","Three scenes (3koma)"],
    ["4","Four scenes in a strip (4koma)"],["4g","Four scenes in a two-by-two grid"]];
  const PANEL_N={"2":2,"2h":2,"3":3,"4":4,"4g":4},PANEL_ARR={"2h":" side by side","4g":" arranged in a two-by-two grid"};
  const PANEL_WORD=["","one","two","three","four"],PANEL_ORD=["first","second","third","fourth"];
  const panelCount=p=>PANEL_N[p&&p.layout]||1;
  const lowFirst=s=>/^(The|She|He|Her|His|They|Their|A|An|It|Its|This|That|Then|Now|Both|Each|One|Later|Afterward|Afterwards|Meanwhile)\b/.test(s)?s[0].toLowerCase()+s.slice(1):s;
  function withPanels(p,first){
    const n=panelCount(p);if(n<2)return first;
    const all=[first].concat((p.panels||[]).slice(0,n-1)),sents=[],tags=[];
    for(let i=0;i<n;i++){const sp=splitScene(all[i]||"");const body=sp.sents.map(x=>x.trim()).filter(Boolean).join(" ");
      if(body)sents.push(`In the ${PANEL_ORD[i]} scene, ${lowFirst(body)}`);
      sp.tags.forEach(x=>{if(!tags.includes(x))tags.push(x)})}
    const koma=n+"koma";if(!tags.includes(koma))tags.unshift(koma);
    if(!tags.includes("multiple views"))tags.push("multiple views");   /* the same characters twice or more; the Undesired Content drops its own "multiple views" */
    return joinScene([`The image is split into ${PANEL_WORD[n]} scenes${PANEL_ARR[p.layout]||""}.`].concat(sents),tags);
  }
  window.PAIR_PANELS={layouts:PANEL_LAYOUTS,count:panelCount,text:withPanels};
  const panelSel=h("select",{id:"pairPanels","aria-label":"Panels",onchange:e=>{const v=e.target.value;editP(p=>{if(v)p.layout=v;else delete p.layout;
      const n=PANEL_N[v]||1;p.panels=(p.panels||[]).slice(0,Math.max(0,n-1));while(p.panels.length<n-1)p.panels.push("");if(n<2)delete p.panels},"pairPanels");
      if(v)toast("Scene 1 is the scene above; write each further scene in its own box.")}},
    ...PANEL_LAYOUTS.map(([v,l])=>h("option",{value:v,text:l})));
  const panelBox=h("div",{class:"scpanels"});
  {const st=document.createElement("style");st.textContent=".scpanels .scfield{margin-top:12px}#pairPanels{margin-bottom:6px}";document.head.append(st)}
  const panelNote=h("p",{class:"muted small",hidden:true,text:"This scene’s own text already splits the image into scenes."});
  function renderPanels(p){
    const n=panelCount(p);panelSel.value=p&&p.layout&&PANEL_N[p.layout]?p.layout:"";panelSel.disabled=!p;
    panelNote.hidden=!(p&&n<2&&/^The image is split into (two|three|four) scenes/i.test(String(p[soloNow(p)?"solo":"scene"]||"")));
    {const lab=document.querySelector('label[for="pairScene"]');if(lab)lab.textContent=n>1?"Scene 1":"Scene"}
    const want=Math.max(0,n-1),have=panelBox.querySelectorAll("textarea");
    if(have.length!==want){panelBox.textContent="";
      for(let i=0;i<want;i++){const ta=h("textarea",{id:"pairPanel"+(i+2),rows:"3","aria-label":"Scene "+(i+2),placeholder:i?"What happens next.":"What happens in the next scene: sentences first, then any tags.",
          oninput:typed("pairPanel",(q,v)=>{q.panels=q.panels||[];q.panels[i]=v})});
        panelBox.append(h("div",{class:"scfield"},h("label",{for:"pairPanel"+(i+2),class:"sclab",text:"Scene "+(i+2)}),ta))}}
    panelBox.querySelectorAll("textarea").forEach((ta,i)=>{if(document.activeElement!==ta)ta.value=p&&p.panels&&p.panels[i]||""});
  }
  const libHint=h("p",{class:"muted small",text:"Loads a scene's action, direction, tags and scene outfits onto the characters you already have. Your character 1 and character 2 stay as they are."});
  function applyScene(t){
    const src=t.out.pair,keep=S.out.pair,allowed=Policy.explicitAllowed();
    const p=JSON.parse(JSON.stringify(src));
    const cur=keep&&keep.id&&tpl(keep.id)?keep.id:"";
    p.id=cur||(src.id&&tpl(src.id)?src.id:"");
    if(!cur&&keep&&keep.gm){p.id="";p.gm=keep.gm}else if(cur||!src.gm)delete p.gm;   /* a scene written for the faceless man keeps him unless you have a partner */   /* v203: a faceless man stays in place too */
    const pt=p.id&&tpl(p.id);
    p.outfit=p.w2?"scene":p.explicit&&pt?nudeIndex(pt):cur&&keep.outfit!=="scene"?keep.outfit||0:0;
    p.compact=keep?!!keep.compact:!!p.compact;p.fit=keep?keep.fit!==false:p.fit!==false;
    const nm=SCENE_LIBRARY.nameOf(t.id)||t.name;
    mut(()=>{
      S.out.pair=p;
      if(t.out.framing)S.out.framing=t.out.framing;
      S.out.explicit=!!p.explicit&&allowed;S.out.lewdtag=!!(t.out.lewdtag||p.explicit)&&allowed;
      if(!isMale()&&(!p.explicit||allowed)){
        if(p.c1)Object.entries(p.c1).forEach(([k,x])=>{if(x==null)delete S.c[k];else S.c[k]=x});
        const so=sceneOutfit(p.w1,false,S);
        if(so){so.name=so.name||nm;S.outfits.push(so);S.cur=S.outfits.length-1}
        else if(p.explicit){let i=S.outfits.findIndex(o=>/^Nude$/i.test(o.name||""));if(i<0){S.outfits.push(newOutfit("Nude"));i=S.outfits.length-1}S.cur=i}
      }
    },"pairLib");
    toast(`Loaded the scene “${nm}”. Your characters are kept.`+(p.explicit&&!allowed?" Its explicit parts are held back for this design.":""));
  }
  const dirSel=h("select",{id:"pairDir","aria-label":"Who does it",onchange:e=>setP(p=>{p.dir=e.target.value})},
    h("option",{value:"mutual",text:"Both"}),h("option",{value:"ab",text:"1 to 2"}),h("option",{value:"ba",text:"2 to 1"}));
  const emphSel=h("select",{id:"pairEmph","aria-label":"Scene emphasis",onchange:e=>setP(p=>{p.emph=e.target.value})},
    h("option",{value:"strong",text:"Strong (recommended)"}),h("option",{value:"max",text:"Strongest"}),h("option",{value:"off",text:"Off"}));
  const emphHint=h("p",{class:"muted small",text:"Puts the action tags at the front of the base prompt and weights the action and the scene above the character details, so the image shows the scene instead of two characters standing side by side. Use Strongest for a single action, Off to write the scene with no weights."});
  const compactCb=h("input",{type:"checkbox",id:"pairCompact",onchange:e=>setP(p=>{p.compact=e.target.checked})});
  const fitCb=h("input",{type:"checkbox",id:"pairFit",onchange:e=>setP(p=>{p.fit=e.target.checked})});
  const block=(label,id)=>{const ta=h("textarea",{id,readonly:true,rows:"5","aria-label":label});
    const b=h("div",{class:"negblock"},h("div",{class:"nhead"},h("b",{text:label}),h("button",{class:"btn sm",type:"button",text:"Copy",onclick:e=>copyText(ta.value,e.currentTarget,"Copied")})),ta);
    return{b,ta}};
  const B0=block("Base prompt","pairBase"),B1=block("Character 1 (this design)","pairC1"),B2=block("Character 2","pairC2");
  const BX=[3,4,5,6].map(n=>{const x=block("Character "+n,"pairC"+n);x.b.hidden=true;return x});
  /* one prompt: the image generator's "|" form (base | character 1 | character 2) */
  const BA=block("One prompt","pairAll");BA.ta.rows=8;
  const allHead=BA.b.querySelector(".nhead b");
  /* v210: the quality-tags switch lives in Finish only (it was mirrored here) */
  const allNote=h("p",{class:"muted small",text:"Copy this one into the image generator’s main prompt box with no character boxes added; the generator splits it at each “ | ” into the base prompt, character 1 and character 2 (V4 and later). The negative prompt goes in Undesired Content (Copy it below, or from the Finish step). Or use the three separate boxes below."});
  const seg=x=>String(x||"").replace(/\|/g,"/").replace(/\s*\n+\s*/g," ").trim();
  /* v189: the base prompt carries the style lead and quality tags from the Quality and UC tab (when "Add quality tags" is on),
     in both forms (the separate base box and the one prompt); "NSFW, Explicit" stays last */
  const baseQ=b=>typeof withQuality==="function"?withQuality(b):b;
  /* v190: the character prompts follow the render style too (Ultra-realistic rewrites the studio's anime wording) */
  const charQ=c=>typeof styleText==="function"&&c?styleText(c):c;
  function onePrompt(r){
    return[seg(baseQ(r.base)),seg(charQ(r.c1)),seg(charQ(r.c2))].concat((r.cx||[]).map(c=>seg(charQ(c)))).filter(Boolean).join(" | ");
  }
  const stat=h("p",{class:"pairstat",id:"pairStat",role:"status"});
  const body=h("div",{},
    stat,BA.b,allNote,B0.b,B1.b,B2.b,...BX.map(x=>x.b));
  const modelSel=()=>{const sel=h("select",{"aria-label":"Image model",onchange:e=>mut(()=>{S.out.model=e.target.value})});
    Object.entries(NAI_MODELS).forEach(([k,m])=>sel.append(h("option",{value:k,text:`${m.label} (about ${m.max} tokens)`})));return sel};
  const pairModel=modelSel(),promptModel=modelSel();
  {const stats=document.getElementById("stats");if(stats)stats.after(h("div",{class:"pairrow",style:"margin-top:6px"},h("label",{text:"Image model"}),promptModel))}
  const EMPTY="No scene yet. Open the Scene step (Edit the scene) to pick a partner or a scene; the scene starting points come with one.";
  const empty=h("p",{class:"muted small",text:EMPTY});
  /* ---------- v192: editing the action and the scene ---------- */
  const editP=(fn,key)=>setP(p=>{if(p.sz)freezeSize(p);fn(p)},key||"pairEdit");
  const splitTags=s=>String(s||"").split(",").map(x=>x.trim()).filter(Boolean);
  const css2=document.createElement("style");
  css2.textContent=".chipedit{display:flex;flex-wrap:wrap;gap:4px;align-items:center;border:1px solid var(--rule);border-radius:8px;padding:4px 6px;min-height:2.2em;background:var(--panel);color:var(--ink)}"+
    ".chipedit input{flex:1;min-width:7em;border:0;background:transparent;color:var(--ink);font:inherit;padding:2px}.chipedit input:focus{outline:none}"+
    ".tchip{display:inline-flex;align-items:center;gap:2px;padding:1px 4px 1px 8px;border-radius:999px;background:var(--sel);color:var(--selink);font-size:13px;font-weight:600}"+
    ".tchip button{border:0;background:transparent;color:inherit;cursor:pointer;font-size:15px;line-height:1;padding:0 3px;opacity:.8}.tchip button:hover{opacity:1}"+
    ".scparts{margin:2px 0 10px}.scparts summary{cursor:pointer;font-size:13px}.scpart{display:grid;grid-template-columns:1fr auto auto;gap:4px;margin:4px 0}"+
    ".scpart textarea{width:100%;font:inherit;resize:vertical;color:var(--ink);background:var(--panel);border:1px solid var(--rule);border-radius:6px}.scpart button{padding:0 6px}";
  document.head.append(css2);
  const ACT_LIST=h("datalist",{id:"pairActList"});document.body.append(ACT_LIST);
  let actListBuilt=false;
  const buildActList=()=>{if(actListBuilt)return;actListBuilt=true;const set=new Set();
    TEMPLATES.forEach(t=>{if(t._clone)return;const q=t.out&&t.out.pair;if(q&&q.act)splitTags(q.act).forEach(x=>set.add(x.replace(/^(mutual|source|target)#/i,"")))});
    [...set].sort().forEach(v=>ACT_LIST.append(h("option",{value:v})))};
  function chipEditor(id,label,get,set,listId){
    const input=h("input",{type:"text",id,placeholder:"add…","aria-label":label,list:listId||null,autocomplete:"off",
      onkeydown:e=>{if(e.key==="Enter"||e.key===","){e.preventDefault();add(input.value)}else if(e.key==="Backspace"&&!input.value){editP(p=>{const c=splitTags(get(p));c.pop();set(p,c.join(", "))})}},
      onchange:()=>{if(input.value.trim())add(input.value)}});
    const box=h("div",{class:"chipedit"},input);
    function add(v){const vs=splitTags(v);if(!vs.length)return;editP(p=>{const c=splitTags(get(p));vs.forEach(x=>{if(!c.includes(x))c.push(x)});set(p,c.join(", "))});input.value="";setTimeout(()=>{try{input.focus()}catch(e){}},0)}
    function render(p,val){box.querySelectorAll(".tchip").forEach(x=>x.remove());input.disabled=!p;
      splitTags(val!==undefined?val:p?get(p):"").forEach((t,i)=>box.insertBefore(h("span",{class:"tchip"},t,
        h("button",{type:"button","aria-label":"Remove "+t,title:"Remove",text:"×",onclick:()=>editP(q=>{const c=splitTags(get(q));c.splice(i,1);set(q,c.join(", "))})})),input))}
    return{el:box,render,input};
  }
  const actGroup=g=>chipEditor("pairAct"+({mutual:"Add",ab:"AB",ba:"BA"})[g],"Add an action",p=>actParse(p).filter(x=>x.g===g).map(x=>x.t).join(", "),
    (p,v)=>{const rest=actParse(p).filter(x=>x.g!==g);actWrite(p,rest.concat(splitTags(v).map(t=>({g,t:t.replace(ACT_RX,"")}))))},"pairActList");
  const actChips=actGroup("mutual"),actAB=actGroup("ab"),actBA=actGroup("ba");
  const t1Chips=chipEditor("pairTags1Add","Add a character 1 tag",p=>p.tags1,(p,v)=>{p.tags1=v});
  const t2Chips=chipEditor("pairTags2Add","Add a character 2 tag",p=>p.tags2,(p,v)=>{p.tags2=v});
  /* one-click position: swaps the position's action tags and the position words in the scene text */
  const POSN=[["missionary","Missionary","sex, vaginal, missionary","missionary position",/\bmissionary(?: position)?\b/gi],
    ["cowgirl","Cowgirl","sex, vaginal, cowgirl position, girl on top","cowgirl position",/\b(?<!reverse )cowgirl(?: position| style)?\b/gi],
    ["reverse","Reverse cowgirl","sex, vaginal, reverse cowgirl position","reverse cowgirl position",/\breverse cowgirl(?: position| style)?\b/gi],
    ["doggy","Doggystyle","sex, vaginal, doggystyle, sex from behind","doggystyle",/\bdoggy ?style\b/gi],
    ["press","Mating press","sex, vaginal, mating press","mating press",/\bmating press\b/gi],
    ["prone","Prone bone","sex, vaginal, prone bone","prone bone",/\bprone bone\b/gi],
    ["spoon","Spooning","sex, vaginal, spooning, sex from behind","spooning position",/\bspooning(?: position)?\b/gi],
    ["lotus","Lotus (on the lap)","sex, vaginal, upright straddle, sitting on lap","lotus position",/\blotus(?: position)?\b/gi],
    ["standing","Standing","sex, vaginal, standing sex","standing position",null],
    ["wall","Against the wall","sex, vaginal, standing sex, against wall","",null],
    ["nelson","Full nelson","sex, vaginal, full nelson, legs up","full nelson",/\bfull nelson\b/gi],
    ["blowjob","Blowjob","fellatio","",null,"ab"],["deepthroat","Deepthroat","fellatio, deepthroat","",null,"ab"],["titjob","Titjob","paizuri","",null,"ab"],
    ["cunni","Cunnilingus","cunnilingus","",null,"ba"],["sixtynine","69","69, cunnilingus","",null,"mutual"],["scissor","Scissoring","scissoring, tribadism","",null,"mutual"],
    ["finger","Fingering","fingering","",null,"ba"],["handjob","Handjob","handjob","",null,"ab"],["anal","Anal","sex, anal","",null],
    ["kiss","Kissing","kiss","",null,"mutual"],["hug","Hug","hug","",null,"mutual"],["hands","Holding hands","holding hands","",null,"mutual"],["cuddle","Cuddling","cuddling","",null,"mutual"]];
  const POS_TAGS=new Set(POSN.flatMap(x=>splitTags(x[2])));
  /* positions that need a penis: with a woman as character 2 the scene becomes futanari (like the starting points do) */
  const PENIS_POS=new Set(["missionary","cowgirl","reverse","doggy","press","prone","spoon","lotus","standing","wall","nelson","blowjob","deepthroat","titjob","handjob","anal"]);
  const PENIS_RX=/\b(vaginal|anal|fellatio|deepthroat|paizuri|handjob|penis|cum in|missionary|cowgirl|doggystyle|mating press|prone bone|full nelson|standing sex|spooning)\b/i;
  /* v199: each position also writes one detailed sentence into the scene (replacing the last one a position wrote) */
  const POS_SENT={
    missionary:"She lies on her back with her legs wrapped around {partner}, who thrusts into her from above in the missionary position, her back arching off the bed.",
    cowgirl:"She rides {partner} in the cowgirl position, straddling {his} hips and bouncing on {his} {cock}, her hands braced on {his} chest.",
    reverse:"She rides {partner} in the reverse cowgirl position, facing away from {him} with {his} {cock} deep inside her, looking back over her shoulder.",
    doggy:"She is on all fours as {partner} takes her doggystyle from behind, gripping her hips while she arches her back and raises her butt.",
    press:"She lies folded beneath {partner} in a mating press, her legs pinned back by her shoulders as {he} pounds down into her.",
    prone:"She lies flat on her stomach as {partner} takes her in a prone bone from behind, pressing her down into the sheets.",
    spoon:"She lies on her side in the spooning position with {partner} pressed behind her, {his} {cock} sliding into her as {he} holds her close.",
    lotus:"She sits in {partner}'s lap in the lotus position, her legs wrapped around {his} waist, chest to chest as she grinds down on {his} {cock}.",
    standing:"She stands with one leg lifted as {partner} takes her standing up, holding her body tight against {his}.",
    wall:"{Partner} pins her against the wall and lifts her up, thrusting into her as she wraps her legs around {his} waist.",
    nelson:"{Partner} holds her up from behind in a full nelson, her legs spread high and her arms locked back, completely exposed as {he} fucks her.",
    blowjob:"She kneels in front of {partner} with {his} {cock} in her mouth, sucking eagerly as she looks up at {him}.",
    deepthroat:"She takes {partner}'s {cock} all the way down her throat, her eyes watering as {he} holds the back of her head.",
    titjob:"She squeezes {partner}'s {cock} between her breasts, pumping it while she licks the tip.",
    cunni:"She lies back with her legs spread as {partner} buries {his} face between her thighs, licking her pussy.",
    sixtynine:"She and {partner} lie in a 69, each pleasuring the other with their mouth at the same time.",
    scissor:"She and {partner} scissor with their legs interlocked, grinding their pussies together.",
    finger:"{Partner} slides two fingers into her pussy, and she squirms and moans against {him}.",
    handjob:"She strokes {partner}'s {cock} with her hand, watching {his} face as she pumps it.",
    anal:"{Partner} slowly pushes {his} {cock} into her ass, and she grips the sheets with her mouth falling open.",
    kiss:"She and {partner} share a deep kiss, eyes closed and bodies pressed together.",
    hug:"She and {partner} hold each other in a warm, tight hug.",
    hands:"She and {partner} hold hands, their fingers interlaced.",
    cuddle:"She and {partner} cuddle close, her head resting on {his} chest."};
  const POS_SENT_SET=new Set(Object.values(POS_SENT));
  const posSel=h("select",{id:"pairPos","aria-label":"Position",onchange:e=>{const k=e.target.value;e.target.value="";if(!k)return;const P0=POSN.find(x=>x[0]===k);if(!P0)return;
    const sexual=POSN.indexOf(P0)<POSN.findIndex(x=>x[0]==="kiss");
    if(sexual&&!Policy.explicitAllowed()){toast("Explicit positions are held back for this design.");return}
    editP(p=>{if(sexual)p.explicit=true;if(PENIS_POS.has(k))p.penis=true;
      const keep=actParse(p).filter(x=>!POS_TAGS.has(x.t)),g=P0[5]||"ba";
      actWrite(p,splitTags(P0[2]).map(t=>({g,t})).concat(keep));
      const key=soloNow(p)?"solo":"scene";
      {const sp=splitScene(p[key]);sp.sents=sp.sents.filter(x=>!POS_SENT_SET.has(x.trim()));p[key]=joinScene(sp.sents,sp.tags)}   /* the last position's sentence goes first */
      if(P0[3]){let t=String(p[key]||"");POSN.forEach(o=>{if(o[4]&&o[0]!==k)t=t.replace(o[4],P0[3])});p[key]=t}
      if(POS_SENT[k]){const sp=splitScene(p[key]);sp.sents.push(POS_SENT[k]);p[key]=joinScene(sp.sents,sp.tags)}},"pairPos");
    if(sexual&&!(S.out.explicit&&S.out.lewdtag))mut(()=>{S.out.explicit=true;S.out.lewdtag=true},"pairPos2");
    toast(`Position: ${P0[1]}. Its tags and a sentence describing it were added to the scene${P0[3]?", and the old position words were swapped":""}.`)}},
    h("option",{value:"",text:"Change the position…"}),...POSN.map(x=>h("option",{value:x[0],text:x[1]})));
  /* the scene, sentence by sentence, with its tag list as chips */
  function splitScene(text){
    let t=String(text||"").trim(),tags="";
    const m=t.match(/^([\s\S]*?[.!?"”♡])\s+([^.!?"”]*,[^.!?"”]*)$/);
    if(m){t=m[1];tags=m[2]}else if(!/[.!?]/.test(t)&&(t.match(/,/g)||[]).length>=2){tags=t;t=""}
    /* v197: a sentence ends at . ! ? or ♡ (plus a closing quote) followed by a capital, a quote or a {token};
       never inside a quotation, so a line of dialogue with several sentences stays whole */
    const sents=[];if(t){let q=false,startI=0;
      for(let i=0;i<t.length;i++){const c=t[i];
        if(c==='"'){q=!q;continue}if(c==="“"){q=true;continue}if(c==="”"){q=false;continue}
        if(q||!/[.!?♡]/.test(c))continue;
        let j=i+1;while(j<t.length&&/[.!?♡]/.test(t[j]))j++;
        if(j<t.length&&/["”]/.test(t[j])&&!q)j++;
        if(j<t.length&&/\s/.test(t[j])){let k=j;while(k<t.length&&/\s/.test(t[k]))k++;
          if(k<t.length&&/["“{A-Z]/.test(t[k])){sents.push(t.slice(startI,j).trim());startI=k;i=k-1}}}
      const last=t.slice(startI).trim();if(last)sents.push(last)}
    return{sents,tags:splitTags(tags)};
  }
  const joinScene=(sents,tags)=>[sents.map(x=>x.trim()).filter(Boolean).join(" "),tags.join(", ")].filter(Boolean).join(" ");
  const sceneKey=p=>soloNow(p)?"solo":"scene";
  const partsList=h("div",{class:"scpartlist"});
  const partTags=chipEditor("pairSceneTagAdd","Add a scene tag",p=>splitScene(p[sceneKey(p)]).tags.join(", "),(p,v)=>{const sp=splitScene(p[sceneKey(p)]);p[sceneKey(p)]=joinScene(sp.sents,splitTags(v))});
  const parts=h("details",{class:"scparts"},h("summary",{text:"Edit the scene sentence by sentence"}),partsList,
    h("button",{type:"button",class:"btn sm",text:"+ Add a sentence",onclick:()=>{editP(p=>{const sp=curOf(p);sp.sents.push("New sentence.");putParts(p,sp)});const l=partsList.querySelector(".scpart:last-child textarea");if(l){l.focus();l.select()}}}),
    h("p",{class:"muted small",text:"Scene tags"}),partTags.el);
  let partsSig="",partsCur=null;
  /* the sentences as the boxes show them; only re-split when the scene text was changed somewhere else */
  const curOf=q=>{const t=String(q[sceneKey(q)]||"");return t===partsSig&&partsCur?{sents:partsCur.sents.slice(),tags:partsCur.tags.slice()}:splitScene(t)};
  const putParts=(q,sp)=>{q[sceneKey(q)]=joinScene(sp.sents,sp.tags)};
  /* v207: sentences with {partner} words show how they read for the current character 2 */
  const TOK_RX=/\{(partner|his|he|him|cock|lover)\}|\{@/i;
  function partWords(p){if(!p)return null;if(soloNow(p))return{partner:"someone",his:"their",he:"they",him:"them",cock:"cock",lover:"her lover"};
    const pm=partnerMale();return partnerWords(pm,!!p.penis&&!pm&&!isMale())}
  let partsWK="";
  function renderParts(p){
    const text=p?String(p[sceneKey(p)]||""):"";
    const WD=partWords(p),wk=JSON.stringify(WD);
    const ae=document.activeElement;if((ae&&ae.tagName==="TEXTAREA"&&partsList.contains(ae))||(text===partsSig&&wk===partsWK))return;
    partsSig=text;partsWK=wk;partsList.textContent="";partsCur=null;
    if(!p)return;const sp=splitScene(text);partsCur=sp;
    sp.sents.forEach((sen,i)=>{const ta=h("textarea",{rows:String(Math.min(6,Math.max(1,Math.ceil(sen.length/60)))),"aria-label":"Sentence "+(i+1),
        oninput:e=>{typing="pair";setP(q=>{if(q.sz)freezeSize(q);const s2=curOf(q);s2.sents[i]=e.target.value;putParts(q,s2);partsCur=s2;partsSig=q[sceneKey(q)]},"pairPart");typing="";
          rd.hidden=!TOK_RX.test(e.target.value);rd.textContent="Reads: "+fill(e.target.value,WD||{})}});ta.value=sen;
      const rd=h("p",{class:"scread",hidden:!TOK_RX.test(sen)||!WD,text:WD?"Reads: "+fill(sen,WD):""});
      partsList.append(h("div",{class:"scpart"},h("div",{class:"scpartmain"},ta,rd),
        h("button",{type:"button",class:"btn sm",title:"Move up","aria-label":"Move sentence up",text:"↑",disabled:i?null:true,onclick:()=>editP(q=>{const s2=curOf(q);[s2.sents[i-1],s2.sents[i]]=[s2.sents[i],s2.sents[i-1]];putParts(q,s2)})}),
        h("button",{type:"button",class:"btn sm",title:"Delete","aria-label":"Delete sentence",text:"×",onclick:()=>editP(q=>{const s2=curOf(q);s2.sents.splice(i,1);putParts(q,s2)})})))});
  }
  /* ---------- v202: expression controls (one per character) ---------- */
  const exAllowed=who=>{if(who===1)return Policy.explicitAllowed();
    const p=S.out.pair,t=p&&p.id&&tpl(p.id);if(!t)return true;const keep=S;try{S=stOf(t);return Policy.explicitAllowed()}catch(e){return true}finally{S=keep}};
  const partnerMale=()=>{const p=S.out.pair;if(p&&p.gm)return true;const t=p&&p.id&&tpl(p.id);if(!t)return false;try{return stOf(t).c.sex==="male"}catch(e){return false}};
  function exSentence(who,key){const P0=EX_PRESETS.find(x=>x[0]===key);if(!P0)return"";
    const w=who===1?(isMale()?{S:"He",s:"he",P:"His",p:"his",o:"him"}:{S:"She",s:"she",P:"Her",p:"her",o:"her"}):{S:"{Partner}",s:"{he}",P:"{Partner}'s",p:"{his}",o:"{him}"};
    return P0[4].replace(/\{([SsPpo])\}/g,(m,k)=>w[k])}
  function setExSentence(p,who,sent){const key=sceneKey(p),sk="exS"+who;
    const sp=splitScene(p[key]);if(p[sk])sp.sents=sp.sents.filter(x=>x.trim()!==p[sk]);
    if(sent){sp.sents.push(sent);p[sk]=sent}else delete p[sk];
    p[key]=joinScene(sp.sents,sp.tags)}
  function exControl(who){
    const K="ex"+who,KK="ex"+who+"k";
    const sel=h("select",{id:"pairEx"+who,"aria-label":`Character ${who} expression`,onchange:e=>{const k=e.target.value;
      if(k==="custom")return;
      const P0=EX_PRESETS.find(x=>x[0]===k);
      if(P0&&P0[3]&&!exAllowed(who)){toast("That expression is held back for this character.");renderPair();return}
      editP(p=>{if(!P0){delete p[K];delete p[KK];setExSentence(p,who,null);return}
        p[K]=P0[2];p[KK]=k;setExSentence(p,who,exSentence(who,k))},"pairEx");
      toast(P0?`Expression: ${P0[1]}. Its tags and a sentence were added; her own expression is set aside for this scene.`:"Expression cleared. Her own expression is back.")}},
      h("option",{value:"",text:"Her own expression"}),
      h("optgroup",{label:"In the moment"},...EX_PRESETS.filter(x=>EX_SEX.has(x[0])).map(x=>h("option",{value:x[0],text:x[1]}))),
      h("optgroup",{label:"Emotions"},...EX_PRESETS.filter(x=>!EX_SEX.has(x[0])).map(x=>h("option",{value:x[0],text:x[1]}))),h("option",{value:"custom",text:"Custom",hidden:true}));
    const chipBoxes=EX_CHIPS.map(([g,list])=>{const box=h("div",{class:"exchips",role:"group","aria-label":g});
      list.forEach(t=>box.append(h("button",{type:"button",class:"exchip","data-t":t,"aria-pressed":"false",text:t,onclick:()=>{
        if(EX_EXPLICIT.has(t)&&!exAllowed(who)){toast("That one is held back for this character.");return}
        editP(q=>{const c=exList(q[K]);const i=c.indexOf(t);if(i>=0)c.splice(i,1);else c.push(t);if(c.length)q[K]=c.join(", ");else{delete q[K];delete q[KK]}},"pairExChip")}})));
      return h("div",{class:"exgroup"},h("span",{class:"exglab",text:g}),box)});
    const fine=h("details",{class:"exfine"},h("summary",{text:"Fine-tune her face"}),h("div",{class:"exchipwrap"},...chipBoxes));
    const note=h("p",{class:"muted small",text:"Replaces her own expression for this scene only."});
    const el=h("div",{class:"exblock"},h("label",{for:"pairEx"+who,class:"sclab",text:"Expression"}),sel,note,fine);
    let lastV="";
    function render(p){
      const v=p&&p[K]||"",have=new Set(exList(v)),ok=exAllowed(who);
      if(v&&!lastV)fine.open=true;lastV=v;
      const k=p&&p[KK]||"",P0=EX_PRESETS.find(x=>x[0]===k);
      const same=P0&&exList(P0[2]).join("|")===exList(v).join("|");
      sel.value=!v?"":same?k:"custom";sel.querySelector('option[value="custom"]').hidden=!(v&&!same);sel.disabled=!p;
      [...sel.options].forEach(o=>{const q=EX_PRESETS.find(x=>x[0]===o.value);if(q)o.disabled=!!(q[3]&&!ok)});
      el.querySelectorAll(".exchip").forEach(b=>{const t=b.dataset.t,on=have.has(t);b.setAttribute("aria-pressed",on?"true":"false");b.classList.toggle("on",on);
        b.disabled=!p||(EX_EXPLICIT.has(t)&&!ok&&!on)});
    }
    return{el,render};
  }
  const ex1=exControl(1),ex2=exControl(2);

  /* ---------- v204: text and sound. Headlines, speech, thoughts, captions and sound effects, like the drama starting
     points. Each item writes one sentence into the scene (a headline goes first, the rest at the end) and adds the tags
     the generator needs (speech bubble, english text …); editing an item rewrites its sentence, deleting it removes it. ---------- */
  const TX_KINDS={
    head:{label:"Headline",who:false,ph:"1 Hour Before the Ceremony",tags:["english text","headline"],
      styles:[["top","Across the top"],["bottom","Across the bottom"],["bold","Big bold banner"]]},
    speech:{label:"Speech",who:true,ph:"Don't stop…",tags:["speech bubble","english text"],
      styles:[["say","Speech bubble"],["hearts","Bubble full of hearts"],["shaky","Trembling, wavy bubble"],["shout","Shouted, jagged bubble"],["whisper","Whispered, small dotted bubble"]]},
    thought:{label:"Thought",who:true,ph:"I shouldn't be enjoying this…",tags:["thought bubble","english text"],
      styles:[["cloud","Thought bubble"],["inner","Inner-monologue caption"]]},
    narr:{label:"Narration",who:false,ph:"Meanwhile, downstairs…",tags:["caption","text box","english text"],
      styles:[["topc","Caption box, top corner"],["botc","Caption box, bottom"]]},
    sfx:{label:"Sound effect",who:false,ph:"thrust thrust",tags:["sound effects"],
      styles:[["big","Big bold sound effect"],["lewd","Small lewd sound effects"],["hearty","Sound effects with little hearts"]]}};
  const TX_WHO=[["c1","Character 1"],["c2","Character 2"],["off","Someone off-screen"]];
  const txClean=t=>String(t||"").replace(/["“”]/g,"").replace(/\s+/g," ").trim();
  /* v205: an optional text color, worded onto the end of the item's sentence ("…, in hot pink lettering.") */
  function txSentence(it,p){const se=txSentence0(it,p);const c=txClean(it.c).slice(0,40).replace(/[.,]/g,"");
    return se&&c?se.replace(/\.$/,`, in ${c} lettering.`):se}
  function txSentence0(it,p){
    const t=txClean(it.t);if(!t)return"";
    const who=it.who==="c2"&&p&&(p.id||p.gm)?"c2":it.who==="off"?"off":"c1";
    const m1=isMale();
    const S1=who==="c1"?(m1?"He":"She"):who==="c2"?"{Partner}":"A voice from off-screen",P1=who==="c1"?(m1?"His":"Her"):who==="c2"?"{Partner}'s":"An off-screen";
    const st=it.st;
    switch(it.k){
      case"head":return st==="bottom"?`A headline goes across the bottom of the image: "${t}".`:st==="bold"?`A big, bold banner headline goes across the top of the image: "${t}".`:`A headline goes across the top of the image: "${t}".`;
      case"speech":{const v={say:["says","in a speech bubble"],hearts:["moans","in a big speech bubble full of hearts"],shaky:["gasps","in a trembling, wavy speech bubble"],shout:["shouts","in a big, jagged speech bubble with bold letters"],whisper:["whispers","in a small, dotted speech bubble"]}[st]||["says","in a speech bubble"];
        return`${S1} ${v[0]} "${t}" ${v[1]}.`}
      case"thought":return st==="inner"?`${P1} inner thoughts appear in a caption box: "${t}".`:`${S1} thinks "${t}" in a cloud-shaped thought bubble.`;
      case"narr":return st==="botc"?`A caption box along the bottom reads "${t}".`:`A caption box in the top corner reads "${t}".`;
      case"sfx":return st==="lewd"?`Small lewd sound effects reading "${t}" float around them.`:st==="hearty"?`Sound effects reading "${t}" pop up around them with little hearts.`:`A big, bold sound effect reads "${t}".`;
    }return"";
  }
  const txTags=it=>{const K=TX_KINDS[it.k];if(!K||!txClean(it.t))return[];const x=K.tags.slice();if(txClean(it.c))x.push("colored text");if(it.st==="hearts"||it.st==="hearty")x.push("heart","spoken heart");return x};
  /* rewrite every text sentence and tag from p.texts, replacing what they wrote last time */
  function syncTexts(p){
    const key=sceneKey(p),sp=splitScene(p[key]);
    const old=new Set((p.texts||[]).map(x=>x.s).filter(Boolean).concat(p.txGone||[]));delete p.txGone;
    sp.sents=sp.sents.filter(x=>!old.has(x.trim()));
    const prevTags=new Set(p.txTags||[]);sp.tags=sp.tags.filter(x=>!prevTags.has(x));
    const heads=[],rest=[],tags=[];
    (p.texts||[]).forEach(it=>{const se=txSentence(it,p);it.s=se||"";if(!se)return;(it.k==="head"?heads:rest).push(se);txTags(it).forEach(t=>{if(!tags.includes(t))tags.push(t)})});
    sp.sents=heads.concat(sp.sents,rest);
    const add=tags.filter(t=>!sp.tags.includes(t));sp.tags=sp.tags.concat(add);p.txTags=add;
    p[key]=joinScene(sp.sents,sp.tags);
  }
  window.PAIR_TEXT={sentence:(it,p)=>txSentence(it,p||{}),tags:it=>txTags(it)};
  /* v233: the Scene builder writes through the same sentence and tag handling */
  window.PAIR_SCENE={split:t=>splitScene(t),join:(a,b)=>joinScene(a,b),syncTexts:p=>syncTexts(p),sceneKey:p=>sceneKey(p),soloNow:p=>soloNow(p),POS_SENT,POSN:()=>POSN};
  const txList=h("div",{class:"txlist"});
  const txEmpty=h("p",{class:"muted small",text:"Nothing yet. Add a headline, a line of speech, a thought, a caption or a sound effect."});
  const txAdd=h("div",{class:"txadd"},...Object.entries(TX_KINDS).map(([k,K])=>h("button",{type:"button",class:"btn sm",text:"+ "+K.label,onclick:()=>{
    editP(p=>{p.texts=(p.texts||[]).concat([{k,st:K.styles[0][0],who:K.who?"c1":"",t:""}])},"pairTxAdd");
    setTimeout(()=>{const l=txList.querySelector(".txitem:last-child .txrow input");if(l)l.focus()},0)}})));
  let txSig="";
  const TX_DL=h("datalist",{id:"pairTxColors"});document.body.append(TX_DL);let txDlSig="";
  const TX_BASIC=["white","black","red","crimson","hot pink","pink","purple","violet","blue","light blue","cyan","green","lime green","yellow","gold","orange","silver"];
  function fillTxColors(p){
    const own=SLOT_KEYS.map(k=>S.pal[k]).filter(Boolean);let other=[];
    const t=p&&p.id&&tpl(p.id);if(t){try{const st=stOf(t);other=SLOT_KEYS.map(k=>st.pal&&st.pal[k]).filter(Boolean)}catch(e){}}
    const sig=own.join("|")+"/"+other.join("|");if(sig===txDlSig)return;txDlSig=sig;TX_DL.textContent="";
    const seen=new Set();const add=(v,l)=>{v=String(v).replace(/^(slightly|subtle|soft|deep)\s+(?=\w+\s)/i,"");if(!v||seen.has(v))return;seen.add(v);TX_DL.append(h("option",{value:v,label:l}))};
    own.forEach(v=>add(v,"Character 1's palette"));other.forEach(v=>add(v,"Character 2's palette"));TX_BASIC.forEach(v=>add(v,""));
  }
  function renderTexts(p){
    const items=p&&p.texts||[];
    const sig=JSON.stringify(items.map(x=>[x.k,x.st,x.who]))+"|"+(p&&(p.id||p.gm)?1:0);
    txEmpty.hidden=!!items.length;txAdd.querySelectorAll("button").forEach(b=>b.disabled=!p);
    const ae=document.activeElement;if(ae&&txList.contains(ae)&&ae.tagName==="INPUT"&&sig===txSig)return;
    fillTxColors(p);
    if(sig===txSig&&txList.children.length===items.length){items.forEach((it,i)=>{const row=txList.children[i];const inp=row.querySelector(".txrow input"),c=row.querySelector(".txcolor");if(inp&&inp!==ae)inp.value=it.t||"";if(c&&c!==ae)c.value=it.c||""});return}
    txSig=sig;txList.textContent="";
    const two=!!(p&&(p.id||p.gm));
    items.forEach((it,i)=>{const K=TX_KINDS[it.k];if(!K)return;
      const upd=(fn,key)=>editP(q=>{const x=q.texts&&q.texts[i];if(!x)return;fn(x);syncTexts(q)},key||"pairTx");
      const styleSel=h("select",{"aria-label":K.label+" style",onchange:e=>upd(x=>{x.st=e.target.value})},...K.styles.map(([v,l])=>h("option",{value:v,text:l,selected:it.st===v?true:null})));
      const whoSel=K.who?h("select",{"aria-label":"Who",onchange:e=>upd(x=>{x.who=e.target.value})},...TX_WHO.filter(([v])=>v!=="c2"||two).map(([v,l])=>h("option",{value:v,text:l,selected:it.who===v?true:null}))):null;
      const col=h("input",{type:"text",class:"txcolor",list:"pairTxColors",placeholder:"Text color (optional)","aria-label":K.label+" text color",
        oninput:e=>{typing="pair";upd(x=>{x.c=e.target.value},"pairTxC"+i);typing=""}});col.value=it.c||"";
      const sw=h("span",{class:"txsw","aria-hidden":"true"});const paint=()=>{let ok=false;try{ok=!!col.value&&CSS.supports("color",col.value.replace(/\s+/g,""))}catch(e){}sw.style.background=ok?col.value.replace(/\s+/g,""):"transparent";sw.classList.toggle("none",!ok)};paint();col.addEventListener("input",paint);
      const inp=h("input",{type:"text",placeholder:K.ph,"aria-label":K.label+" text",oninput:e=>{typing="pair";upd(x=>{x.t=e.target.value},"pairTxT"+i);typing=""}});inp.value=it.t||"";
      const del=h("button",{type:"button",class:"btn sm",title:"Remove","aria-label":"Remove "+K.label.toLowerCase(),text:"×",onclick:()=>editP(q=>{const x=q.texts&&q.texts[i];if(!x)return;q.txGone=[x.s].filter(Boolean);q.texts.splice(i,1);syncTexts(q);if(!q.texts.length)delete q.texts},"pairTxDel")});
      txList.append(h("div",{class:"txitem"},h("span",{class:"txkind",text:K.label}),h("div",{class:"txctl"},whoSel,styleSel,h("label",{class:"txcolwrap"},sw,col)),h("div",{class:"txrow"},inp,del)));
    });
  }

  /* ---------- v202: the Scene editor is its own wide step (Concept … Finish, Scene); the Scene tab keeps the prompts ---------- */
  const css3=document.createElement("style");
  css3.textContent=
    ".scened{display:flex;flex-direction:column;gap:18px}.scened [hidden]{display:none!important}"+
    ".scsec{border:1px solid var(--rule);border-radius:12px;background:var(--panel);padding:14px 16px}"+
    ".scsec>h3{margin:0 0 2px;font-size:1.02rem}.scsec>.scnote{margin:0 0 12px;color:var(--muted);font-size:13px}"+
    ".sccards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}"+
    ".sccard{border:1px solid var(--rule);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:10px;min-width:0}"+
    ".sccard h4{margin:0;font-size:.95rem}.sccard select{width:100%}"+
    ".sclab{display:block;font-weight:600;font-size:13px;margin:0 0 4px}"+
    ".scfield{display:flex;flex-direction:column;gap:4px;min-width:0}"+
    ".scgrid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px 14px;align-items:start}"+
    ".scened #pairScene{min-height:6em;font-size:14px}"+
    ".scened .scparts{margin:4px 0 0}.scened .scparts summary{font-weight:600;font-size:13px;padding:4px 0}"+
    ".scened .scpart textarea{font-size:14px;padding:6px 8px}"+
    ".exchipwrap{display:flex;flex-direction:column;gap:6px;margin-top:6px}.exgroup{display:flex;gap:8px;align-items:flex-start}"+
    ".exglab{flex:none;width:3.6em;font-size:12px;color:var(--muted);padding-top:5px}.exchips{display:flex;flex-wrap:wrap;gap:4px}"+
    ".exchip{border:1px solid var(--rule);background:transparent;color:var(--ink);border-radius:999px;padding:3px 10px;font-size:12.5px;cursor:pointer}"+
    ".exchip.on{background:var(--sel);color:var(--selink);border-color:var(--sel);font-weight:600}.exchip:disabled{opacity:.4;cursor:not-allowed}"+
    ".scpartmain{display:flex;flex-direction:column;gap:2px;min-width:0}.scread{margin:0;font-size:12px;color:var(--muted);font-style:italic}"+
    ".exblock .muted{margin:4px 0 0}.exfine{margin-top:6px}.exfine summary{cursor:pointer;font-size:13px;font-weight:600;padding:2px 0}"+
    ".stepbody:has(> .scened){background:none;border:0;box-shadow:none;padding:0}"+
    ".actgroups{display:flex;flex-direction:column;gap:10px;margin-top:10px}"+
    ".txlist{display:flex;flex-direction:column;gap:10px;margin-bottom:10px}"+
    ".txitem{display:grid;grid-template-columns:7.5em minmax(0,1fr);gap:6px 10px;align-items:center;border:1px solid var(--rule);border-radius:10px;padding:10px}"+
    ".txkind{font-weight:600;font-size:13px}.txctl{display:flex;gap:8px;flex-wrap:wrap}.txctl select{flex:1;min-width:10em}"+
    ".txrow{grid-column:2;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px}.txrow input{width:100%;font:inherit;padding:6px 8px}"+
    ".txadd{display:flex;flex-wrap:wrap;gap:6px}"+
    ".txcolwrap{flex:1;min-width:10em;display:flex;align-items:center;gap:6px;border:1px solid var(--rule);border-radius:8px;padding:0 8px;background:var(--panel)}"+
    ".txcolwrap input{flex:1;min-width:0;border:0;background:transparent;color:var(--ink);font:inherit;padding:6px 0}.txcolwrap input:focus{outline:none}.txcolwrap:focus-within{outline:2px solid var(--ink);outline-offset:1px}"+
    ".txsw{flex:none;width:14px;height:14px;border-radius:50%;border:1px solid var(--rule)}.txsw.none{background:repeating-linear-gradient(45deg,transparent 0 3px,var(--rule) 3px 4px)!important}"+
    "@media (max-width:760px){.txitem{grid-template-columns:1fr}.txrow{grid-column:1}}"+
    ".scside{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}.scsum{font-size:13px}"+
    ".scopen{display:none}"+
    "@media (max-width:760px){.sccards,.scgrid{grid-template-columns:1fr}.scsec{padding:12px}.scopen{display:block}}";
  document.head.append(css3);
  /* ---------- v216: characters 3 to 6, and a group's lineup ---------- */
  const MORE=(()=>{
    const st=document.createElement("style");
    st.textContent=".scmore{display:flex;flex-direction:column;gap:12px;margin-top:14px}.scmore[hidden]{display:none}"+
      ".lineup{display:flex;flex-wrap:wrap;gap:6px}.lchip{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--rule);background:transparent;color:var(--ink);border-radius:999px;padding:3px 10px 3px 5px;font-size:13px;cursor:pointer}"+
      ".lchip img{image-rendering:pixelated}.lchip.on{background:var(--sel);color:var(--selink);border-color:var(--sel);font-weight:600}.lchip:disabled{opacity:.55;cursor:default}"+
      ".lchip.me{border-style:dashed}.lfit{font-size:12.5px;color:var(--muted);margin:0}.lhead{display:flex;align-items:center;gap:8px;flex-wrap:wrap}"+
      ".lineups{display:flex;flex-direction:column;gap:6px}.lhead b{font-size:14px}.lineup+.lineup{margin-top:2px}.lgname{display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:var(--muted);margin-right:4px}.lgname img{image-rendering:pixelated}"+
      ".xcard .xhead{display:flex;align-items:center;justify-content:space-between;gap:8px}.xcard .xhead h4{margin:0}";
    document.head.append(st);
    const lineHead=h("div",{class:"lhead"}),lineup=h("div",{class:"lineups"});
    const fitNote=h("p",{class:"lfit"});
    const lineBox=h("div",{class:"scfield",hidden:true},lineHead,lineup,fitNote);
    const cards=h("div",{class:"sccards"});
    const addBtn=h("button",{type:"button",class:"btn sm",text:"+ Add a character",onclick:()=>{
      const p=S.out.pair;if(!p||!p.id){toast("Pick character 2 first.");return}
      if(2+(p.more||[]).length>=MAXC){toast(`The image generator draws up to ${MAXC} characters.`);return}
      editP(q=>{q.more=(q.more||[]).concat([{id:"",outfit:q.w2?"scene":0}])},"pairMoreAdd")}});
    const addNote=h("p",{class:"muted small",text:"The image generator draws up to six characters. Each one gets her own character box; with more than two, the prompt is shortened to each character's essentials when it would go over the limit."});
    const el=h("div",{class:"scmore"},lineBox,cards,h("div",{class:"btnrow"},addBtn),addNote);
    const houseOfT=t=>{try{return window.BIO_GIRL?BIO_GIRL(t):null}catch(e){return null}};
    const gname=g=>g.name||g.id;
    /* a lineup lists a group's girls (robes), their headmistresses (roster "head") or their boyfriends (roster "man") */
    const idFor=(hh,kind)=>kind==="head"?hh+"head":kind==="man"?hh+"man":(ACAD.robes?ACAD.robes(hh):hh+"robes");
    const houseOfId=(id,kind)=>{const t=id&&tpl(id);if(!t)return null;
      if(kind==="head"||kind==="man"){const x=id.slice(0,-kind.length);return id.endsWith(kind)&&ACAD.HOUSES.includes(x)?x:null}
      return houseOfT(t)};
    /* which member is where: character 1 (this design), character 2, or one of the extras */
    function slots(p,kind){const at={};
      if(p.id){const h2=houseOfId(p.id,kind);if(h2)at[h2]="c2"}
      (p.more||[]).forEach((m,i)=>{const hh=houseOfId(m.id,kind);if(hh&&!at[hh])at[hh]="x"+i});
      const me=kind==="girls"&&S.bio&&!/^(Faculty|Boyfriend|Principal)/.test(S.bio.groupRole||"")&&S.bio.house;if(me&&!at[me])at[me]="c1";
      return at}
    /* the look a member joins in: the scene's own pick for her (pair.looks), else her robes, headmistress or boyfriend */
    const pickLook=(p,hh,kind)=>{const L=p.looks&&p.looks[hh];return L&&tpl(L)?L:idFor(hh,kind)};
    const outfitFor=(p,id)=>{if(p.w2)return"scene";if(p.explicit){const t=tpl(id);if(t){const i=outfitNames(t).indexOf("Nude");if(i>=0)return i}}return 0};
    function toggle(hh,kind){
      editP(p=>{const at=slots(p,kind),where=at[hh];
        if(where==="c1")return;
        if(where==="c2"){const nx=(p.more||[]).find(m=>m.id&&tpl(m.id));
          if(nx){p.id=nx.id;p.outfit=nx.outfit;p.tags2=nx.tags||"";p.more=p.more.filter(m=>m!==nx);if(!p.more.length)delete p.more}else{toast("A scene needs at least two characters.");return}
          return}
        if(where&&where[0]==="x"){p.more.splice(+where.slice(1),1);if(!p.more.length)delete p.more;return}
        if(2+(p.more||[]).filter(m=>m.id).length>=MAXC){toast(`The image generator draws up to ${MAXC} characters; drop someone first.`);return}
        const look=pickLook(p,hh,kind);if(!tpl(look)){toast("That character isn't in this version.");return}
        if(!p.id){p.id=look;p.outfit=outfitFor(p,look);return}
        p.more=(p.more||[]).filter(m=>m.id).concat([{id:look,outfit:outfitFor(p,look),tags:p.mtags||"",...(p.mex?{ex:p.mex}:{})}])},"pairLineup")}
    const FIT=[[2,"Portrait (832×1216) suits two."],[3,"Three fit Portrait or Square (1024×1024)."],[4,"Four read best in Landscape (1216×832) or Square."],[5,"Five need Landscape (1216×832) or wider."],[6,"Six need a wide image: Landscape (1216×832) or a wallpaper size."]];
    let sig="";
    function render(p){
      const on=!!(p&&p.id);el.hidden=!p||soloNow(p)||!!p.gm;addBtn.disabled=!on||2+((p&&p.more)||[]).length>=MAXC;
      const GS=p?[p.group,p.group2].filter(Boolean).map(k=>(ACAD.GROUPS||[]).find(x=>x.id===k)).filter(Boolean):[];
      lineBox.hidden=!GS.length;
      const n=p?2+moreOf(p).length:0;
      if(GS.length){const kind=p.roster||"girls",at=slots(p,kind);lineHead.textContent="";lineup.textContent="";
        lineHead.append(h("b",{text:(kind==="head"?"Faculty":kind==="man"?"Boyfriends":"Lineup")}),h("span",{class:"muted small",text:"Tap someone to add or drop them."}));
        GS.forEach(g=>{const row=h("div",{class:"lineup",role:"group","aria-label":gname(g)+" lineup"});
          row.append(h("span",{class:"lgname"},ACAD.crestImg?ACAD.crestImg(g.id,18):null,h("span",{text:gname(g)})));
          g.members.forEach(hh=>{const w=at[hh],nm=(ACAD.HNAME&&ACAD.HNAME[hh])||ACAD.cap(hh);
            if(!tpl(idFor(hh,kind)))return;
            const label=kind==="head"?nm+" headmistress":kind==="man"?nm+"'s boyfriend":nm;
            const b=h("button",{type:"button",class:"lchip"+(w?" on":"")+(w==="c1"?" me":""),"aria-pressed":w?"true":"false",
              title:w==="c1"?"Character 1 (this design)":w?"In the scene: tap to drop":"Tap to add",disabled:w==="c1"?true:null,onclick:()=>toggle(hh,kind)},
              ACAD.pixelImg?ACAD.pixelImg(hh,18):null,h("span",{text:label+(w==="c1"?" (you)":kind==="girls"&&hh===g.leader?" ★":"")}));
            row.append(b)});
          lineup.append(row)});
        fitNote.textContent=`${n} in the scene. `+((FIT.find(f=>f[0]===Math.max(2,n))||FIT[FIT.length-1])[1])}
      const s2=JSON.stringify(p&&p.more||[]);
      if(s2!==sig||cards.children.length!==((p&&p.more)||[]).length){sig=s2;cards.textContent="";
        ((p&&p.more)||[]).forEach((m,i)=>{
          const who=h("select",{"aria-label":`Character ${i+3}`,onchange:e=>{const v=e.target.value;editP(q=>{if(!q.more||!q.more[i])return;q.more[i].id=v;q.more[i].outfit=q.w2?"scene":0},"pairMoreWho")}});
          fillList(who,"Choose someone…");who.value=m.id||"";
          if(m.id&&tpl(m.id)&&who.value!==m.id){who.append(h("option",{value:m.id,text:tpl(m.id).name}));who.value=m.id}
          const t=m.id&&tpl(m.id);
          const of=h("select",{"aria-label":`Character ${i+3} outfit`,disabled:t?null:true,onchange:e=>{const v=e.target.value;editP(q=>{if(q.more&&q.more[i])q.more[i].outfit=v==="scene"||v==="none"?v:+v},"pairMoreOutfit")}});
          if(t&&p.w2)of.append(h("option",{value:"scene",text:"Scene outfit: "+(p.w2.name||"for this scene")}));
          if(t)outfitNames(t).forEach((nm,k)=>of.append(h("option",{value:String(k),text:nm})));
          if(t)of.append(h("option",{value:"none",text:"No outfit (character only)"}));
          of.value=m.outfit==="none"?"none":m.outfit==="scene"&&p.w2?"scene":String(m.outfit==="scene"?0:m.outfit||0);
          const tg=h("input",{type:"text","aria-label":`Character ${i+3} tags`,placeholder:"smiling, peace sign, looking at viewer",value:m.tags||"",
            oninput:e=>{typing="pair";setP(q=>{if(q.more&&q.more[i])q.more[i].tags=e.target.value},"pairMoreTags");typing=""}});
          tg.value=m.tags||"";
          const rm=h("button",{type:"button",class:"btn sm",text:"Remove","aria-label":`Remove character ${i+3}`,onclick:()=>editP(q=>{if(q.more){q.more.splice(i,1);if(!q.more.length)delete q.more}},"pairMoreDel")});
          cards.append(h("div",{class:"sccard xcard"},h("div",{class:"xhead"},h("h4",{text:`Character ${i+3}`}),rm),
            fld("Who",null,who),fld("Outfit",null,of),fld("Her tags",null,tg)))})}
      else cards.querySelectorAll("input").forEach((x,i)=>{if(document.activeElement!==x){const m=p.more[i];x.value=m&&m.tags||""}});
    }
    return{el,render};
  })();
  window.PAIR_MORE={moreOf,MAXC};
  const optsRow=h("div",{class:"pairopts"},h("label",{class:"chk"},compactCb," Compact tags"),h("label",{class:"chk"},fitCb," Shorten only if over the limit"));
  const fld=(label,forId,...kids)=>h("div",{class:"scfield"},h("label",{class:"sclab",for:forId||null,text:label}),...kids);
  const tags2Lab=h("label",{class:"sclab",for:"pairTags2Add",text:"Her tags"});
  const tags2Row=h("div",{class:"scfield",id:"pairTags2Row"},tags2Lab,t2Chips.el);
  const ex2Wrap=h("div",{id:"pairEx2Wrap"},ex2.el);
  const noScene=h("p",{class:"callout",id:"sceneNone",text:"No scene yet. Pick a Character 2 from the list (or Browse… for any starting point or save), or choose a scene from the Scene library below. Everything else unlocks once a scene is started."});
  const openPrompts=h("button",{type:"button",class:"btn primary scopen",text:"See the prompts",onclick:()=>{setTab("pair");setSide(true)}});
  const EDITOR=h("div",{class:"scened",id:"sceneEditor"},
    h("section",{class:"scsec"},h("h3",{text:"Characters"}),h("p",{class:"scnote",text:"Character 1 is this design. Pick any starting point or one of your saves for either."}),noScene,
      h("div",{class:"sccards"},
        h("div",{class:"sccard"},h("h4",{text:"Character 1"}),fld("Who","pairSelf",selfSel),ex1.el,fld("Her tags","pairTags1Add",t1Chips.el)),
        h("div",{class:"sccard"},h("h4",{text:"Character 2"}),fld("Who","pairPartner",partnerSel),fld("Outfit","pairOutfit",outfitSel),ex2Wrap,tags2Row)),
      MORE.el),
    h("section",{class:"scsec"},h("h3",{text:"Scene"}),h("p",{class:"scnote",text:"Where they are and what is happening. Edit it whole, or sentence by sentence below."}),
      fld("Scene library","pairLib",h("div",{class:"pickwrap"},libBtn),libHint),
      fld("Panels","pairPanels",panelSel,panelNote),
      fld("Scene","pairScene",sceneIn,sceneHint),parts,panelBox),
    h("section",{class:"scsec"},h("h3",{text:"Action"}),h("p",{class:"scnote",text:"The position and action tags. Both are weighted above the character details."}),
      h("div",{class:"scgrid"},fld("Position","pairPos",posSel),fld("Scene emphasis","pairEmph",emphSel)),
      h("div",{class:"actgroups"},
        fld("Both of them","pairActAdd",actChips.el),
        fld("Character 1 to character 2","pairActAB",actAB.el),
        fld("Character 2 to character 1","pairActBA",actBA.el)),
      h("p",{class:"muted small",text:"“Both” is something they do together (kissing, hugging). “1 to 2” is something character 1 does to character 2 (a blowjob, a slap); “2 to 1” is the other way round (he fucks her, she gets fingered). Picking a position fills these in for you."}),
      emphHint),
    h("section",{class:"scsec"},h("h3",{text:"Text and sound"}),h("p",{class:"scnote",text:"Headlines, speech, thoughts, captions and sound effects drawn into the image. Each one writes its sentence into the scene and adds the tags it needs."}),
      txList,txEmpty,txAdd),
    h("section",{class:"scsec"},h("h3",{text:"Prompt"}),
      h("div",{class:"scgrid"},fld("Image model",null,pairModel)),optsRow,
      h("details",{class:"scparts",id:"pairRaw"},h("summary",{text:"Edit the action and tags as text"}),
        h("div",{class:"pairrow"},h("label",{for:"pairAct",text:"Action"}),actIn),
        h("div",{class:"pairrow"},h("label",{for:"pairTags1",text:"Character 1 tags"}),tags1In),
        h("div",{class:"pairrow"},h("label",{for:"pairTags2",text:"Character 2 tags"}),tags2In)),
      openPrompts));
  parts.open=true;
  /* kept in the page while another step is showing, so everything can still find it */
  const HOLD=h("div",{hidden:true,id:"sceneHold"},EDITOR);document.body.append(HOLD);
  window.PAIR_OPTS=optsRow;
  STEPS.push({id:"scene",label:"Scene",blurb:"Put this design in a scene: a partner, what is happening, the position and how each of them looks."});
  STEP_FIELDS.scene=[];
  RENDER.scene=()=>{const f=document.createDocumentFragment();f.append(EDITOR);return f};
  {const rm=renderMain;
   renderMain=function(){
     if(step==="scene"&&EDITOR.isConnected&&document.getElementById("stepView").contains(EDITOR))return;   /* already showing: renderPair keeps it current */
     rm();if(!EDITOR.isConnected||!document.getElementById("stepView").contains(EDITOR))HOLD.append(EDITOR);
   }}
  {const rr=renderRail;renderRail=function(){rr();const b=[...document.querySelectorAll("#rail .rail-btn")].pop();if(b){const d=b.querySelector(".dot");if(d)d.classList.toggle("set",!!S.out.pair)}}}
  /* the Scene tab: the prompts, with a way back to the editor */
  const sideSum=h("p",{class:"scsum"});
  const editBtn=h("button",{type:"button",class:"btn",text:"Edit the scene",onclick:()=>goStep("scene")});
  P.append(h("div",{class:"scside"},h("p",{class:"muted small",text:"Paste the base prompt into the image generator’s main prompt box and each character into its own character box, or use One prompt. Quality tags and the negative prompt come from the Finish step."}),
    h("div",{class:"btnrow"},editBtn),sideSum),empty,body);

  let lastPartner;
  function renderPair(){
    if(!built||builtSig!==savesNow().map(x=>x.id+x.name).join("|"))buildPartners();
    const mk=NAI_MODELS[S.out.model]?S.out.model:"v5";pairModel.value=mk;promptModel.value=mk;
    const p=S.out.pair,id=p&&p.id||"";
    /* v170: a partner that is not in any picker group (Crow's hidden "crowbody" base, for one) gets its own option, so the
       dropdown always shows who character 2 is */
    if(id&&tpl(id)&&!partnerSel.querySelector('option[value="'+id+'"]')){let og=partnerSel.querySelector('optgroup[data-extra]');
      if(!og){og=h("optgroup",{label:"Scene partners","data-extra":"1"});partnerSel.insertBefore(og,partnerSel.children[1]||null)}
      og.append(h("option",{value:id,text:tpl(id).name}))}
    partnerSel.value=p&&p.gm&&GENERIC[p.gm]?"@"+p.gm:id&&tpl(id)?id:"";
    if(partnerSel.options[0])partnerSel.options[0].text=p&&p.solo?"No partner (solo)":"No partner";
    selfSel.value="";selfSel.options[0].text="This design"+(S.name?`: ${S.name}`:"");
    const okey=id+"|"+(p&&p.w2?p.w2.name||"scene":"");
    if(okey!==lastPartner){
      outfitSel.textContent="";lastPartner=okey;
      const t=id&&tpl(id);
      if(t&&p.w2)outfitSel.append(h("option",{value:"scene",text:"Scene outfit: "+(p.w2.name||"for this scene")}));
      (t?outfitNames(t):[]).forEach((n,i)=>outfitSel.append(h("option",{value:String(i),text:n})));
      if(t)outfitSel.append(h("option",{value:"none",text:"No outfit (character only)"}));
    }
    [outfitSel,sceneIn,actIn,dirSel].forEach(x=>{x.disabled=!p});
    if(soloNow(p)){actIn.disabled=true;dirSel.disabled=true}
    if(p){outfitSel.value=p.outfit==="none"?"none":p.outfit==="scene"&&p.w2?"scene":String(p.outfit==="scene"?0:p.outfit||0);dirSel.value=p.dir||"mutual"}
    const zv=p&&p.sz?sizeVersion(p,S.c,partnerC(p)):null;
    [tags1In,tags2In].forEach(x=>{x.disabled=!p});
    if(document.activeElement!==tags1In)tags1In.value=p?(zv?zv.tags1:p.tags1)||"":"";
    if(document.activeElement!==tags2In)tags2In.value=p?(zv?zv.tags2:p.tags2)||"":"";
    {const r2=document.getElementById("pairTags2Row");if(r2)r2.hidden=!!soloNow(p)}
    /* v202 */
    ex1.render(p);ex2.render(soloNow(p)?null:p);renderTexts(p);noScene.hidden=!!p;{const pm=partnerMale();ex2Wrap.hidden=!!soloNow(p)||pm;tags2Lab.textContent=p&&p.gm?"His tags (in the base prompt)":pm?"His tags":"Her tags";
     const of=outfitSel.closest(".scfield");if(of)of.hidden=!!(p&&p.gm)}
    {const t2=p&&p.id&&tpl(p.id);sideSum.textContent=!p?"":`Character 1: ${S.name||"this design"}. `+(p.gm&&GENERIC[p.gm]?`Character 2: ${GENERIC[p.gm].label}, in the base prompt.`:soloNow(p)?"Solo, no partner.":`Character 2: ${t2?t2.name:"none"}.`+moreOf(p).map((m,i)=>` Character ${i+3}: ${tpl(m.id).name}.`).join(""))}
    if(document.activeElement!==sceneIn){sceneIn.value=p?(soloNow(p)?p.solo:zv?zv.scene:p.scene)||"":"";sceneIn.rows=Math.min(10,Math.max(2,Math.ceil((sceneIn.value.length||1)/70)))}
    sceneHint.hidden=!(p&&/\{(partner|his|he|him|cock|lover)\}/i.test(p.scene||""));
    if(document.activeElement!==actIn)actIn.value=p?p.act||"":"";
    /* v192 editors */
    buildActList();actChips.render(soloNow(p)?null:p);actAB.render(soloNow(p)?null:p);actBA.render(soloNow(p)?null:p);t1Chips.render(p,zv?zv.tags1:undefined);t2Chips.render(p,zv?zv.tags2:undefined);
    partTags.render(p);renderParts(p);renderPanels(p);posSel.disabled=!p||soloNow(p);MORE.render(p);
    emphSel.value=(p&&p.emph&&EMPH[p.emph]!==undefined)?p.emph:"strong";emphSel.disabled=!p;
    compactCb.checked=!!(p&&p.compact);fitCb.checked=!p||p.fit!==false;
    const r=p?pairPrompts():null;
    const ok=!!(r&&!r.missing);empty.hidden=ok;body.hidden=!ok;
    empty.textContent=r&&r.missing?`The partner “${r.missing}” isn’t a starting point in this version.`:EMPTY;
    if(!ok){body.querySelectorAll("textarea").forEach(t=>{t.value=""});return}   /* v198: nothing left over when there is no scene */
    B0.ta.value=baseQ(r.base);B1.ta.value=charQ(r.c1);B2.ta.value=charQ(r.c2);B2.b.hidden=!!r.solo;
    BX.forEach((x,i)=>{const c=(r.cx||[])[i];x.b.hidden=!c;x.ta.value=c?charQ(c):""});
    {const one=onePrompt(r),n=one.length/4|0;BA.ta.value=one;
     allHead.textContent=`One prompt (about ${n} tokens${S.out.qAdd!==false?" with the quality tags":""})`+(n>r.max?`: over the ${r.max} limit; turn the quality tags off in Finish, or shorten`:"")}
    const over=r.total>r.max,m=naiModel();
    stat.className="pairstat"+(over?" over":"");
    stat.textContent=(r.generic?`About ${r.total} of ${r.max} tokens (${m.label}): base ${r.tb}, character 1 ${r.t1}. The ${r.generic.toLowerCase().replace(" (pov)","")} is written into the base prompt, so there is no character 2 box.`
      :r.solo?`About ${r.total} of ${r.max} tokens (${m.label}): base ${r.tb}, character 1 ${r.t1}. A solo shot; pick a partner above to make it a scene.`
      :(r.cx&&r.cx.length)?`${2+r.cx.length} characters. About ${r.total} of ${r.max} tokens (${m.label}): base ${r.tb}, `+[r.t1,r.t2].concat(r.tx).map((n,i)=>`character ${i+1} ${n}`).join(", ")+"."
      :`About ${r.total} of ${r.max} tokens (${m.label}): base ${r.tb}, character 1 ${r.t1}, character 2 ${r.t2}.`)+
      (r.shortened?` Shortened to fit: ${r.shortened}.`:"")+(r.blocked?" The “sexy, lewd” quality tag is off while this partner is chosen.":"")+
      (r.held?` The explicit scene and actions are held back: the safeguard holds back explicit content for ${r.heldWho}.${r.reason?" "+r.reason:""}`:"")+
      (r.futa?" Character 2 is a woman, so she is written as a futanari for this act.":"")+
      (over?(r.o.slim?" Still over: switch more layers off in the Character layers tab, or pick a shorter outfit.":" Turn on “Shorten only if over the limit”, or compact tags."):"");
  }
  /* a partner the safeguard holds back also switches the "sexy, lewd" quality tag off while it is chosen */
  const qt=qualityText;
  qualityText=function(){const q=qt();const p=S.out.pair;if(!p||!p.id)return q;
    try{const r=pairPrompts();if(r&&r.blocked)return q.replace(/,\s*sexy, lewd/,"")}catch(e){}return q};
  const rs=renderSide;
  renderSide=function(){rs();try{renderPair()}catch(e){try{console.warn("[pair] "+e)}catch(_){}}};
  window.PAIR={pairPrompts,sceneColors,toneOf,applyScene:t=>applyScene(t),sceneOutfit:(w,m,st)=>sceneOutfit(w,m,st)};
  /* v189: per-scene quality style (pair.qStyle) is read by the Quality and UC tab (quc189.js) */

  /* ---------- Academy Couples: one design per pair, each carrying its partner ---------- */
  const C=(id,a,b,name,scene,act,blurb)=>({id,base:a,name,out:{pair:{id:b,outfit:0,scene,act,dir:"mutual"}},tags:["couple","pair","two girls"],
    blurb:`${blurb} Opens in the Scene tab with the ${(tpl(b)||{name:b}).name} as character 2.`});
  START.add("Academy Couples",[
    C("couplerivals","griffingown","serpentgown","Rivals at the ball","rival women at a grand candlelit ball, standing close, glaring at each other","eye contact","Griffin and Serpent in ballgowns, face to face."),
    C("couplepajama","foxpajama","sharkpajama","Pajama party","friends at a pajama party, cuddled together on a bed, laughing","hug","Fox and Shark in pajamas, cuddled up."),
    C("couplestudy","ravenstudy","swanstudy","Study date","studying together by lamplight in a cozy library, sharing a book","","Raven and Swan sharing a late-night book."),
    C("couplefestival","wolffestival","foxfestival","Festival night","a summer festival at night, paper lanterns and fireworks behind them","holding hands","Wolf and Fox in yukata under the fireworks."),
    C("coupledate","stagdate","sharkdate","Double date","a double date, sitting close at a candlelit café table, both blushing","","Stag and Shark, flustered on a double date."),
    C("couplebunny","dragonbunny","serpentbunny","Bunny duo","bunny girls posing back to back in a casino lounge","back-to-back","Dragon and Serpent as bunny girls."),
    C("coupleonsen","lovebirdonsen","dragononsen","Onsen for two","relaxing together in a steaming outdoor hot spring at night","","Lovebird and Dragon in the hot spring."),
    C("couplespa","swanspa","flamingospa","Spa day for two","side by side on massage tables in a candlelit spa","","Swan and Flamingo at the spa."),
    C("coupleboudoir","serpentboudoir","ravenboudoir","Boudoir duo","posing together on silk sheets in a boudoir photoshoot","embrace","Serpent and Raven in a lingerie shoot."),
    C("coupleafterglow","sharkafterglow","wolfafterglow","Afterglow together","lying together in rumpled sheets, tangled in each other's arms, flushed and smiling","cuddling","Shark and Wolf in bed together."),
    C("couplecoven","ravenwitch","serpentwitch","Coven","witches casting a spell together in a moonlit stone circle","","Raven and Serpent witches with their familiars."),
    C("coupleidol","lovebirdidol","sharkidol","Idol duet","idols singing a duet on a brightly lit concert stage","","Lovebird and Shark on stage together."),
    C("couplebattle","wolfbattle","stagbattle","Battle sisters","warrior women standing back to back on a battlefield, weapons ready","back-to-back","Wolf and Stag in battle armor."),
    C("couplenight","dragonnight","serpentnight","Headmistresses' night","dominant headmistresses side by side in a candlelit study, looking down at the viewer","","The Dragon and Serpent headmistresses in latex and leather.")
  ],{after:"Academy Cosplay"});
})();

/* ---- v127 (v151: Salmon and Crow): "Academy Locker Room". One girl per house, built on the house's robes entry: half-changed after
   her house sport in a steamy locker room, sweat-sheened, with her sport's gear to hand. A "Fresh from the
   shower" towel outfit and a Nude outfit with the robes' intimate details. */
(function(){
  const{items,opts,set}=ACAD;
  opts("posture",["pulling her top off over her head","sitting on a locker-room bench, one knee drawn up","leaning back against the lockers",
    "tying her hair up, a hair tie between her teeth","bending over to peel off her socks"],"Posture");
  items("bra",["sports bra with {c2} trim, pulled halfway up"],"L","sporty,boudoir");
  items("panties",["athletic boyshort panties with a {c2} waistband","cotton thong with a {c2} waistband"],"LS","sporty,boudoir");
  items("outerwear",["unzipped track jacket slipping off the shoulders"],"LS","sporty");
  items("neckAccessory",["gym towel draped around the neck"],"CU","sporty");
  items("heldItem",["fencing mask","softball glove","tennis racket","gymnastics ribbon","pair of boxing gloves by the laces","pair of figure skates by the laces",
    "pair of track spikes","recurve bow","volleyball","hockey stick","basketball","pair of pointe shoes by the ribbons","rolled yoga mat","water bottle","sports drink","water polo ball","badminton racket and a feathered shuttlecock"],"CU","sporty");
  const BRA="sports bra with {c2} trim, pulled halfway up",BOY="athletic boyshort panties with a {c2} waistband",THONG="cotton thong with a {c2} waistband";
  const LR=(h,c1,c2,pant,leg,legC,held,ex,po,extra)=>{
    const it=Object.assign({bra:[BRA,c1,null,c2],panties:[pant,c1,null,c2],legwear:[leg,legC],heldItem:[held]},extra||{});
    return[h,it,ex,po,"half-changed in the locker room",{more:[{oname:"Fresh from the shower",look:"casual",
      items:{top:["short bath towel wrapped around the body, slipping low",c1],headwear:["towel wrapped around the hair","white"]}}]}]};
  set("Academy Locker Room","Academy Cosplay","locker","locker room","sporty",{tags:["locker room","changing","after practice"],oname:"Changing",
    c:{skinFinish:"lightly sweaty, dewy skin",blushStyle:"flushed cheeks and chest"},
    must:"an anime style with high detail, a steamy locker room with metal lockers and wooden benches, and particular emphasis on highly detailed skin, hair and eyes"},[
    LR("griffin","@third","@accent",BOY,"knee-high athletic socks","@secondary","fencing mask","confident smile","leaning back against the lockers",{neckAccessory:["gym towel draped around the neck","@accent"]}),
    LR("badger","@primary","@secondary",BOY,"knee-high athletic socks","@secondary","softball glove","flustered, blushing smile","pulling her top off over her head"),
    LR("raven","@primary","@accent",THONG,"knee-high athletic socks","@third","tennis racket","embarrassed, averted gaze","over-the-shoulder glance"),
    LR("serpent","@third","@extra",THONG,"thigh-high sport socks","@secondary","gymnastics ribbon","smirk","sitting on a locker-room bench, one knee drawn up"),
    LR("wolf","@secondary","@third",BOY,"knee-high athletic socks","@extra","pair of boxing gloves by the laces","playful fanged grin","tying her hair up, a hair tie between her teeth",{neckAccessory:["gym towel draped around the neck","@third"]}),
    LR("swan","@primary","@secondary",THONG,"thigh-high sport socks","@primary","pair of figure skates by the laces","slightly shy expression","bending over to peel off her socks"),
    LR("dragon","@primary","@accent",THONG,"knee-high athletic socks","@extra","pair of track spikes","smirk","leaning back against the lockers",{outerwear:["unzipped track jacket slipping off the shoulders","@secondary"]}),
    LR("stag","@primary","@accent",BOY,"knee-high athletic socks","@secondary","recurve bow","dreamy expression","sitting on a locker-room bench, one knee drawn up"),
    LR("shark","@primary","@third",BOY,"knee-high athletic socks","@secondary","volleyball","teasing tongue-out expression","pulling her top off over her head"),
    LR("penguin","@primary","@secondary",BOY,"knee-high athletic socks","@primary","hockey stick","surprised expression","over-the-shoulder glance",{neckAccessory:["gym towel draped around the neck","@secondary"]}),
    LR("fox","@primary","@secondary",THONG,"knee-high athletic socks","@third","basketball","sly, fox-like smirk","bending over to peel off her socks"),
    LR("lovebird","@primary","@accent",THONG,"thigh-high sport socks","@secondary","squeeze bottle of orange sports drink","bubbly open-mouthed grin","tying her hair up, a hair tie between her teeth"),
    LR("flamingo","@primary","@secondary",BOY,"thigh-high sport socks","@secondary","rolled yoga mat","embarrassed, averted gaze","sitting on a locker-room bench, one knee drawn up"),
    LR("kraken","@primary","@third",THONG,"thigh-high sport socks","@primary","water polo ball","cool, otherworldly half-smile","tying her hair up, a hair tie between her teeth"),
    LR("salmon","@primary","@accent",THONG,"thigh-high sport socks","@secondary","pair of track spikes","confident smile","pulling her top off over her head",{neckAccessory:["gym towel draped around the neck","@secondary"]}),
    LR("crow","@primary","@third",BOY,"knee-high athletic socks","@secondary","badminton racket and a feathered shuttlecock","flustered, blushing smile","bending over to peel off her socks")
  ]);
})();

/* ---- v128/v129 (v151: Salmon and Crow): "Academy Ruined" (right after the first time, before the afterglow), plus the explicit
   "Academy Office Hours" and "Academy Library After Hours" sets. All adult women, adult clothes and settings.
   Everything is carried by the existing fields and the nude-outfit intimate gate.
   v129: Office Hours is built on the robes entries (not the headmistresses), and neither set changes hair texture,
   so face, hair and body stay the girls' own. */
(function(){
  const{items,opts,set}=ACAD;
  /* ---------- Ruined ---------- */
  const G="Explicit (adult)";
  opts("expression",["full ahegao face, tongue lolling out, eyes crossed and rolled up, mouth hanging open and drooling, mid-orgasm",
    "ahegao, tongue fully out, crossed eyes rolling up, drool running down the chin, blushing hard, orgasming",
    "ruined ahegao face, mouth open with the tongue out and eyes rolled up, drooling, trembling in orgasm"],G);
  opts("pupilStyle",["crossed eyes rolling up"],G);
  opts("mouthShape",["mouth hanging open, tongue fully out, overflowing with thick white cum","mouth full of thick white cum, tongue out"],G);
  opts("lipFinish",["lips slick with drool and thick white cum"],G);
  opts("faceAccents",["thick white cum dripping from the mouth and down the chin, drool strings from the tongue","cum and drool running down the chin and neck"],G);
  opts("bodyMarkings",["thick white cum pools on the breasts and drips down the chest","thick white cum is smeared over the breasts, stomach and thighs"],G);
  opts("nippleType",["hard, flushed, and lactating with milk dripping from them"],G);
  opts("vaginaType",["flushed, gaping, full of and overflowing with thick white cum, squirting","dripping wet and overflowing with cum that runs down the thighs, squirting"],G);
  opts("posture",["lying limp on her back with her legs spread, trembling","slumped against the headboard with her legs spread wide","on her knees with her head tilted back, shaking",
    "lying on the bed with her back arched, mid-orgasm","collapsed on all fours, shaking"],G);
  const RU=(h,leg,ex,po,bm,vg)=>{const it={};if(leg)it.legwear=[leg[0],leg[1]];
    return[h,it,ex,po,"ruined, right after her first time",{c:{vaginaType:vg||"flushed, gaping, full of and overflowing with thick white cum, squirting",bodyMarkings:bm||"thick white cum pools on the breasts and drips down the chest"}}]};
  const E1="full ahegao face, tongue lolling out, eyes crossed and rolled up, mouth hanging open and drooling, mid-orgasm",
        E2="ahegao, tongue fully out, crossed eyes rolling up, drool running down the chin, blushing hard, orgasming",
        E3="ruined ahegao face, mouth open with the tongue out and eyes rolled up, drooling, trembling in orgasm";
  const P=["lying limp on her back with her legs spread, trembling","slumped against the headboard with her legs spread wide","on her knees with her head tilted back, shaking","lying on the bed with her back arched, mid-orgasm","collapsed on all fours, shaking"];
  const B2="thick white cum is smeared over the breasts, stomach and thighs",V2="dripping wet and overflowing with cum that runs down the thighs, squirting";
  const SH=["sheer stockings","@secondary"],FN=["fishnet stockings","@extra"];
  set("Academy Ruined","Academy First Time","ruined","ruined","boudoir",{tags:["ruined","ahegao","after sex","explicit"],oname:"Ruined",
    c:{age:"woman",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"lips slick with drool and thick white cum",
      pupilStyle:"crossed eyes rolling up",mouthShape:"mouth hanging open, tongue fully out, overflowing with thick white cum",
      faceAccents:"thick white cum dripping from the mouth and down the chin, drool strings from the tongue",hairTexture:"softly tousled",
      nippleType:"hard, flushed, and lactating with milk dripping from them"},
    must:"an anime style with high detail, rumpled sheets, and particular emphasis on highly detailed skin, hair and eyes"},[
    RU("griffin",null,E1,P[0]),RU("badger",SH,E2,P[1],B2,V2),RU("raven",null,E3,P[2]),RU("serpent",FN,E1,P[3],B2),
    RU("wolf",null,E2,P[4],null,V2),RU("swan",SH,E3,P[0],B2),RU("dragon",null,E1,P[1],null,V2),RU("stag",null,E2,P[2],B2),
    RU("shark",FN,E3,P[3],null,V2),RU("penguin",null,E1,P[4],B2,V2),RU("fox",SH,E2,P[0]),RU("lovebird",null,E3,P[1],B2,V2),
    RU("flamingo",null,E1,P[2],null,V2),RU("kraken",FN,E2,P[4],B2),RU("salmon",SH,E3,P[1],B2),RU("crow",null,E1,P[0],null,V2)]);

  /* ---------- Office Hours and Library After Hours ---------- */
  opts("expression",["lust-drunk, half-lidded stare with parted lips"],G);
  opts("posture",["sitting on the edge of a desk with her legs spread wide","lying back on a desk with her legs spread and knees up","bent over a desk, looking back over her shoulder",
    "kneeling on a desk on all fours, hips raised","straddling a chair backwards, grinding against it",
    "leaning against a bookshelf with one leg hooked high","lying on a reading table with her legs spread, fingers between her thighs",
    "sitting on a library ladder with her legs spread","on all fours on a library rug, back arched, looking back"],G);
  opts("vaginaType",["flushed, swollen, and dripping wet with arousal"],G);
  items("heldItem",["pink vibrator","wand massager","silk blindfold","pair of handcuffs"],"LS","boudoir,edgy");
  items("legwear",["garter-strap stockings with lace tops","sheer seamed thigh-high stockings"],"LS","boudoir");
  items("neckAccessory",["leather collar with a ring"],"LS","edgy,boudoir");
  const X={c:{age:"woman",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
      nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"}};
  const BM=["thick white cum is smeared over the breasts, stomach and thighs","thick white cum pools on the breasts and drips down the chest"];   /* v139: cum, not love bites or lipstick */
  const GS=["garter-strap stockings with lace tops","@third"],ST=["sheer seamed thigh-high stockings","@secondary"],CH=["leather collar with a ring","@extra"];
  const VX="lust-drunk, half-lidded stare with parted lips";
  const row=(h,leg,toy,ex,po,i,collar,lib)=>{const it={legwear:leg};if(toy)it.heldItem=[toy];if(collar)it.neckAccessory=CH;
    return[h,it,ex,po,lib?"a library after dark":"a private office session",{c:{bodyMarkings:BM[i%2]},
      more:[{oname:lib?"Reading attire":"Office attire",look:"preppy",items:lib?{top:["sheer lace blouse","@primary"],bottom:["knee-length pencil skirt","@secondary"],legwear:leg}:
        {top:["silk blouse","@primary"],bottom:["knee-length pencil skirt","@secondary"],legwear:leg}}]}]};
  const O=(h,leg,toy,ex,po,i,collar)=>row(h,leg,toy,ex,po,i,collar,false);
  const L=(h,leg,toy,ex,po,i,collar)=>row(h,leg,toy,ex,po,i,collar,true);
  const OP=["sitting on the edge of a desk with her legs spread wide","lying back on a desk with her legs spread and knees up","bent over a desk, looking back over her shoulder","kneeling on a desk on all fours, hips raised","straddling a chair backwards, grinding against it"];
  const LP=["leaning against a bookshelf with one leg hooked high","lying on a reading table with her legs spread, fingers between her thighs","sitting on a library ladder with her legs spread","on all fours on a library rug, back arched, looking back","lying on a reading table with her legs spread, fingers between her thighs"];
  const EX=["lustful expression",VX,"ahegao-style blissful expression","biting her lip","aroused, parted-lip expression","bedroom stare"];
  const cfgO={tags:["office","desk","explicit","dominant"],oname:"Office Hours",look:"boudoir",c:X.c,
    must:"an anime style with high detail, a dim luxurious office with a large desk and leather chair, and particular emphasis on highly detailed skin, hair and eyes"};
  const cfgL={tags:["library","after dark","explicit"],oname:"After Hours",look:"boudoir",c:X.c,
    must:"an anime style with high detail, a candlelit library after dark with tall bookshelves and a long reading table, and particular emphasis on highly detailed skin, hair and eyes"};
  const H=ACAD.HOUSES,pick=(a,i)=>a[i%a.length];
  const legs=[GS,ST],toys=["pink vibrator","wand massager","silk blindfold","pair of handcuffs",null];
  set("Academy Office Hours","Academy Locker Room","office","office hours","boudoir",cfgO,
    H.map((h,i)=>O(h,pick(legs,i),pick(toys,i),pick(EX,i),pick(OP,i),i,i%3===1)));
  set("Academy Library After Hours","Academy Office Hours","library","library after hours","boudoir",cfgL,
    H.map((h,i)=>L(h,pick(legs,i+1),pick(toys,i+2),pick(EX,i+3),pick(LP,i),i+1,i%4===2)));
})();

/* ===== Starting-point fixes and additions (data only; managed with startkit, newest last) ===== */
/* START-DATA-BEGIN */
/* START-DATA-END */
/* v122: every Academy group together at the end of the starting-point list (original order kept) */
(function(){
  const L=PRESET_GROUPS.start,ac=L.filter(g=>/^Academy/.test(g.label));
  const rest=L.filter(g=>!/^Academy/.test(g.label));
  L.length=0;rest.concat(ac).forEach(g=>L.push(g));
})();



/* ===== v103: male mode — core (sex flag, tagging, filters, pronouns) =====
   S.c.sex === "male" switches the studio to male mode. Anything else is the original female studio.
   Options carry an optional sex tag: "m" male only, "f" female only, "b" both (exempt from the female-coded filter).
   Untagged options are shared, except those matched by the female-coded filters (hidden in male mode). */
const KEY_SEXPREF="charstudio.sexpref.v1";
const SEXPREF=Object.assign({both:false},loadJSON(KEY_SEXPREF,{}));
function isMale(){return !!(S&&S.c&&S.c.sex==="male")}
const SEXTAG={},FEM_RX={},FEM_ALL={};
const FEM_RX_ALL=/\b(feminine|femme|girls?|girly|woman|women|lady|ladylike|doll-like|dollish|pretty|cute|cutesy|dainty|princess|bridal|bride|lolita|babydoll|breasts?|busty|cleavage|hourglass|voluptuous|pigtails?|ribbons?|bows?|lipstick)\b/i;
const sexTagOf=(field,v)=>(SEXTAG[field]||{})[v]||"";
function sexFits(field,v,male){
  const t=sexTagOf(field,v);
  if(t==="m")return !!male;if(t==="f")return !male;if(t==="b")return true;
  if(!male)return true;
  if(FEM_ALL[field])return false;
  const rx=FEM_RX[field];if(rx&&rx.test(v))return false;
  return !FEM_RX_ALL.test(v);
}
const sexOk=(field,v,male)=>SEXPREF.both||sexFits(field,v,male);
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
const tagB=(field,vals)=>tagSex(field,vals,"b"),tagF=(field,vals)=>tagSex(field,vals,"f");

/* outfit items use the same idea, keyed by outfit field */
const OSEX={},OFEM_RX={},OFEM_ALL={};
function itemSexFits(field,v,male){
  const t=(OSEX[field]||{})[v]||"";
  if(t==="m")return !!male;if(t==="f")return !male;if(t==="b")return true;
  if(!male)return true;
  if(OFEM_ALL[field])return false;
  const rx=OFEM_RX[field];return !(rx&&rx.test(v));
}
const itemSexOk=(field,v)=>SEXPREF.both||itemSexFits(field,v,isMale());
function addMO(field,list){
  OUTFIT[field]=OUTFIT[field]||[];OSEX[field]=OSEX[field]||{};
  list.forEach(([v,t,fam,s,g])=>{
    if(OUTFIT[field].some(i=>i.v===v)){OSEX[field][v]="b";return}
    const it={v,t};if(fam)it.f=fam;if(s)it.s=s;if(g)it.g=g;OUTFIT[field].push(it);OSEX[field][v]="m";
  });
}
/* presets: "m" ones belong to male mode, "f" ones to female mode; untagged presets are shared and are adapted when applied in male mode */
const FEM_PRESET_RX=/\b(maid|princess|bride|cowgirl|waitress|succubus|queen|mermaid|sorceress|priestess|huntress|empress|goddess|heroine|ballerina|cheerleader|cheer|pin-up|bunny|lolita|babydoll|flirty|hourglass|bombshell|busty|bust|voluptuous|top-heavy|curvy|femme|doll-like|adorable|petite|sugar-sweet|sweet|dreamy|willowy|delicate|seductive|sultry|lustful|afterglow|lewd glam|pastel|shy and blushing|soft and sweet|soft doe|big and adorable|full bust|ideal)\b/i;
function presetSexOk(p){
  if(!p||SEXPREF.both)return true;
  if(p.sex==="m")return isMale();
  if(p.sex==="f")return !isMale();
  if(isMale()){const n=String(p.label||p.name||"");if(FEM_PRESET_RX.test(n)||(!p.items&&/\bcute\b/i.test(n)))return false}
  return true;
}

/* ---- pronouns: the sentence builders write "She/Her"; male mode converts the finished layer text ---- */
const OBJ_NEXT=/^(and|or|but|with|in|on|at|to|from|as|while|so|by|for|over|into|under|up|down|out|off|close|tight|apart|together|away|too|is|are|was|were|has|have|that|which|who|when|where|then|than|if|until|after|before)$/i;
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

/* ---- labels that change in male mode ---- */
const MALE_LABELS={bustSize:"Chest size",bustShape:"Chest shape",bustWeight:"Chest definition",faceMark:"Facial mark",
  lashNatural:"Eyelashes",penisColor:"Genital color",penisType:"Genital type",penisSize:"Genital size"};
const MALE_GROUP={"Doll-like and youthful":"Soft and youthful","Cute":"Playful","Small and delicate":"Slim and neat"};
function labelOf(f){return(isMale()&&MALE_LABELS[f])||LABELS[f]||f}
Object.defineProperty(OUT_LABEL,"bra",{get(){return isMale()?"Undershirt":"Bra"},configurable:true,enumerable:true});
Object.defineProperty(OUT_LABEL,"panties",{get(){return isMale()?"Underwear":"Panties"},configurable:true,enumerable:true});
Object.defineProperty(OUT_LABEL,"corset",{get(){return isMale()?"Vest or armor layer":"Corset or bodice layer"},configurable:true,enumerable:true});

/* ===== v103: male mode — character option data ===== */
(function(){
  /* ---- which existing options read as female-coded (hidden in male mode) ---- */
  FEM_RX.faceShape=/delicate|doll-like|petite face|youthful-looking|pretty|V-shaped|soft heart-shaped|cute|heart-shaped face with soft|woodland-spirit|bunny-like|mouse-like/i;
  FEM_RX.expression=/puffed-cheek pout|tiny cat-mouth|bubbly/i;
  FEM_RX.eyeShape=/doll|doe|cute|glossy|sparkling|seductive|very large|large, wide/i;
  FEM_RX.browShape=/delicate|thin elegant|thin, high-arched|thin brows|short soft|soft, curved|elegantly swept|feathered, upswept|gentle curved/i;
  FEM_RX.noseShape=/button|petite|delicate|small, delicate|elfin|bunny-like|snub/i;
  FEM_RX.mouthShape=/plush|heart-shaped|cupid|rosy|pouty|petite|delicate|small|sensual|exceptionally|glossy|softly parted|thin-to-medium/i;
  FEM_RX.lashNatural=/delicate|feather-like|fluttery|upswept|frosted/i;
  FEM_RX.impression=/delicate features|beauty|temptress|bombshell|bedroom-ready|adorable|huggable|sparkling|innocent|sweet|cute|pretty|alluring|irresistible|exaggerated figure|plush/i;
  FEM_RX.hairStyle=/\bbob\b|lob\b|pixie|bixie|princess|hime|jellyfish|twin|pigtail|bridal|chignon|ballerina|beehive|victory rolls|odango|milkmaid|bubble|bunny|bow|ribbon|ornamental|double|space buns|halo|crown braid|butterfly|U-shaped|V-shaped|finger waves|wrapped ponytail|half-up twin|pageboy/i;
  FEM_RX.bangs=/cute|hime|baby|bottleneck|micro|arched|split|see-through|sidelocks/i;
  FEM_RX.hairMovement=/\bher\b|past the (waist|chest)|midriff|down the back|around the waist|to the knees|over one shoulder|collarbone|around the neck|spills forward|sheets|plush|long flowing|long face-framing|long and loose|well past|cascad|sweeps around the face|loose strands|soft loose|fans out|fans outward|sways|ethereal|silk|spirals|curled ends|soft layers/i;
  FEM_RX.hairTexture=/silky|wispy|fluffy|soft curls|ringlet/i;
  FEM_RX.earStyle=/ribbon|bow/i;
  FEM_RX.heightStature=/petite|graceful|elegant|statuesque|very short petite/i;
  FEM_RX.shoulderShape=/delicate|petite|graceful|soft|rounded|elegant/i;
  FEM_RX.torsoShape=/delicate proportions|softly contoured/i;
  FEM_RX.armShape=/feminine|delicate|graceful|soft|rounded upper/i;
  FEM_RX.handShape=/feminine|delicate|dainty|graceful|small, soft/i;
  FEM_RX.stomachShape=/cute/i;
  FEM_RX.legShape=/slender|delicate|graceful|soft|petite|shapely|elegant|gently curved|slim ankles/i;
  FEM_RX.bodySoftness=/feminine|hourglass|voluptuous|petite|doll|curvy|curvaceous|delicate|plush|plus-size|bombshell|lewd|top-heavy|bottom-heavy|pear-shaped|graceful|juicy|balanced curving|gracefully rounded|slender soft/i;
  FEM_RX.posture=/graceful|soft poised|hip-popped|arched-back|poised dancer|slightly shy|light playful|kneeling with an arched/i;
  FEM_RX.markings=/lipstick|floral|hip tattoo|beauty mark|dimples|kiss marks|chest and hips|breasts|chest, stomach, hips/i;
  FEM_RX.bodyMarkings=/chest, stomach, hips|chest and thighs|chest, and hips|hips/i;
  FEM_RX.faceMark=/beauty mark|dimples/i;
  FEM_RX.makeupStyle=/bridal|doll-like|sweet pastel|femme fatale|soft glam|glamorous soft/i;
  FEM_RX.blushStyle=/doll-like|heart-shaped|rosy|rounded blush|nose-tip|aroused/i;
  FEM_RX.lipFinish=/ombré|dripping|kiss-swollen|smeared|high-shine|seductive|smudged/i;
  FEM_RX.faceAccents=/gems|pearl|lipstick|kiss/i;
  FEM_RX.nailStyle=/manicure|heart and flower|nail art/i;
  FEM_RX.pubicHair=/heart-shaped/i;
  FEM_RX.tailStyle=/ribbon|bow/i;
  FEM_RX.skinFinish=/rosy flush|soft opalescent/i;
  FEM_ALL.bustSize=FEM_ALL.bustShape=FEM_ALL.bustWeight=FEM_ALL.waistShape=FEM_ALL.hipShape=FEM_ALL.buttSize=FEM_ALL.thighBuild=FEM_ALL.lashStyle=true;
  /* exceptions: values that work for any body */
  tagB("waistShape",["straight natural waist","straight, athletic waist","long, slim waist"]);
  tagB("hipShape",["narrow hips","narrow, straight hips","lean, athletic hips","balanced hips"]);
  tagB("buttSize",["small butt","small round butt","toned butt","medium butt","round butt","natural butt","small, firm butt","firm, round butt","large, firm, athletic butt"]);
  tagB("thighBuild",["thin thighs","toned thighs","lean, toned thighs","long, lean thighs","strong, muscular thighs","thick, firm, athletic thighs","thick thighs","very thick thighs"]);
  tagB("legShape",["long legs","thick legs","toned legs","thin legs","long, lean legs","strong, muscular legs","long legs with defined calves","thick, strong legs","proportional legs","smooth proportionate legs"]);
  tagB("posture",["over-the-shoulder glance","leaning forward posture","reclining posture","hands-behind-the-head posture"]);
  tagB("lashStyle",["natural lashes"]);
  tagB("handShape",["strong and capable","long, slender fingers"]);
  tagB("armShape",["strong forearms and capable hands","strong, muscular arms","toned arms with defined shoulders","softly toned arms"]);

  /* ---- age ---- */
  addM("age",["young man","man","mature man","older man"]);

  /* ---- face ---- */
  addM("faceShape",["strong, square-jawed face","chiseled face with a sharp jawline and high cheekbones","angular face with a defined jaw and pronounced cheekbones","rugged, square face with a heavy jaw","long face with a strong chin and a straight jaw","broad face with a wide, firm jaw","lean, hollow-cheeked face with a sharp jaw","oval face with a defined jaw and a cleft chin","diamond-shaped face with a firm chin","sharp-featured, elegant face with a tapered jaw","sculpted, handsome face with high cheekbones and a firm jaw","weathered, strong-featured face with deep-set eyes","narrow, refined face with a pointed chin","heavy-jawed, broad-browed face","round face with a soft jaw and full cheeks"]);
  addM("expression",["confident smirk","easy, lopsided grin","stoic, unreadable expression","gruff, serious expression","calm, assured gaze","cocky half-smile","brooding expression","intense, steady stare","warm, crinkle-eyed grin","tired but kind expression","roguish grin","cold, piercing glare","gentle, reserved smile","heavy-lidded, lazy smile","furrowed, concentrated expression","mischievous, toothy grin"]);
  addM("browShape",["strong, straight brows","bold, angular brows","full brows with a slight arch","thick, untamed brows","neat, defined brows","sharp, slanted brows","a scar cutting through one brow"]);
  addM("noseShape",["strong, straight nose","prominent, Roman nose","slightly crooked nose","wide, sturdy nose","straight nose with a defined tip","sharp, narrow nose","large, prominent nose","broken-bridge nose"]);
  addM("mouthShape",["firm, defined lips","thin, firm lips","full lips with a strong lip line","wide mouth with a relaxed lip line","slightly chapped lips","narrow lips set in a firm line","lips with a faint scar"]);
  addM("eyeShape",["sharp, narrow eyes","deep-set eyes","heavy-lidded eyes","stern, narrowed eyes","steady, almond-shaped eyes","calm, slightly drooping eyes","hooded, intense eyes"]);
  addM("lashNatural",["short, dark eyelashes","thick, understated eyelashes","barely noticeable lashes","dark, heavy-lidded lashes"],"Eyelashes");
  addM("faceMark",["a faint scar through one eyebrow","a small scar on the chin","a scar across the bridge of the nose","a small mole on the cheek","a thin scar across one cheek"],"Scar or mark");
  addM("impression",["a handsome, easygoing charm","a rugged, approachable appearance","a friendly, easygoing look","a calm, dependable presence","a warm, reliable presence","a rugged, weathered handsomeness","a striking, strongly masculine appearance","a quietly masculine presence","a chiseled, model-like handsomeness","a gentle, soft-spoken presence"],"Natural and everyday");
  addM("impression",["a refined, aristocratic presence","a sharp, polished gentleman's presence","a cool, aloof handsomeness","a brooding, magnetic presence","a commanding, authoritative presence","a dashing, confident presence","a scholarly, composed presence","a roguish charm","a charismatic, playful charm"],"Poised and polished");
  addM("impression",["a smoldering, magnetic allure","a seductive, confident allure","a dangerous, brooding allure"],"Sultry (adult)");
  addM("impression",["a stoic, battle-hardened presence","a noble, heroic presence"],"Fantasy and mythical");

  /* ---- hair ---- */
  addM("hairStyle",["short crop","textured crop","crew cut","ivy league cut","classic side part","slicked-back hair","pompadour","quiff","faux hawk","mohawk","low fade with a short top","high fade with a textured top","taper fade","skin fade undercut","disconnected undercut","side-swept undercut","messy short hair","short messy spikes","spiky hair","short curly hair","curly top with tapered sides","flat top","high and tight","comb-over","windswept hair","bedhead hair","short natural coils","waves haircut"],"Short Styles",true);
  addM("hairStyle",["undercut with a long top","man bun","half-up man bun","samurai topknot","medium-length swept hair","medium wavy hair","layered medium-length hair","mullet","shaggy mullet","middle-part curtains","long hair tied low at the nape","shaved sides with long hair braided back","two-strand twists","slicked-back undercut ponytail","tousled medium-length hair","long swept-back hair"],"Men’s Styles");
  addM("bangs",["swept-back front","side-swept fringe","textured fringe","messy fringe","short spiky fringe","curtain fringe","front-swept quiff","forehead-baring pushed-back hair","long fringe falling over the forehead","slicked-back hairline"],"Men’s Bangs");
  addM("hairMovement",["stays crisp and neatly in place","sits tousled and slightly messy","is swept back off the forehead","drops loosely over the forehead","has a rugged, windblown look","stays sharply combed and clean","looks lived-in and casually rumpled","stands up in a textured, spiky mess","is pushed back with a careless hand","stays short and tight to the head"],"Short and cropped",true);
  addM("hairTexture",["thick and coarse","rough and tousled","neat and combed","sleek and slicked","dry and windswept","wiry and unruly","dense, tight curls","soft and fine"],"Texture");

  /* ---- facial hair and body hair (new fields) ---- */
  CHAR.facialHair=[].concat(
    ["clean-shaven"].map(v=>[v,"Clean"]),
    ["light stubble","heavy stubble","five o'clock shadow","rugged stubble along the jaw","designer stubble"].map(v=>[v,"Stubble"]),
    ["short boxed beard","neatly trimmed beard","chin-strap beard","circle beard","goatee","van dyke beard","anchor beard","soul patch","short beard with sharp lines"].map(v=>[v,"Short beards"]),
    ["full beard","thick full beard","long beard","braided beard","forked beard","bushy, untamed beard","salt-and-pepper beard"].map(v=>[v,"Full beards"]),
    ["neat mustache","pencil mustache","handlebar mustache","walrus mustache","horseshoe mustache","mustache and goatee"].map(v=>[v,"Mustaches"]),
    ["thin sideburns","long sideburns","mutton chops"].map(v=>[v,"Sideburns"]));
  CHAR.bodyHair=[
    "smooth, hairless chest","light chest hair","moderate chest hair","thick, hairy chest","a trail of hair down the stomach","light hair on the forearms","hairy forearms and legs","hairy chest, stomach and arms","lightly haired body","fine, light body hair","smooth, shaved body"].map(v=>[v,"Body hair"]);
  SEXTAG.facialHair={};CHAR.facialHair.forEach(([v])=>{SEXTAG.facialHair[v]="m"});
  SEXTAG.bodyHair={};CHAR.bodyHair.forEach(([v])=>{SEXTAG.bodyHair[v]="m"});

  /* ---- body ---- */
  addM("heightStature",["tall, imposing stature","towering stature","stocky, short stature","tall and lanky stature","broad-shouldered average height","lean, tall stature"],"Height");
  addM("shoulderShape",["very broad, powerful shoulders","broad shoulders tapering to a lean waist","heavy, muscular shoulders","rounded deltoids","lean, sinewy shoulders","wide, squared-off shoulders","sloped, narrow shoulders"],"Shoulders");
  addM("torsoShape",["broad V-shaped torso tapering to the waist","thick, barrel-chested torso","lean, wiry torso","athletic, well-defined torso","heavyset, solid torso","long, narrow torso"],"Natural and realistic");
  addM("armShape",["thick, powerful arms","lean, wiry arms with visible veins","defined biceps and forearms","broad forearms and large hands","heavily muscled arms","lean arms with defined forearms","thick, soft arms","scarred forearms"],"Natural and realistic");
  addM("handShape",["large and strong","broad and calloused","long-fingered and elegant","rough, with scarred knuckles","big and capable","lean and veined"],"Hands");
  addM("bustSize",["narrow chest","lean chest","average chest","broad chest","broad, muscular chest","deep, powerful chest","thick, heavy chest","huge, heavily muscled chest","soft, rounded chest"],"Chest size");
  addM("bustShape",["flat, even pecs","defined pecs","full, rounded pecs","squared, sculpted pecs","soft, relaxed pecs","chiseled pecs with a visible center line","natural chest shape"],"Chest shape");
  addM("bustWeight",["light definition","soft definition","firm definition","pronounced definition","dense, thick muscle","soft, relaxed fullness","heavy, solid mass"],"Chest definition");
  addM("waistShape",["narrow, tapered waist","trim waist","lean, defined waist","straight, solid waist","thick, solid waist","broad waist","slim waist with defined obliques","narrow waist with a V-taper","soft, thick waist"],"Waist");
  addM("stomachShape",["six-pack abs","defined abs and obliques","flat stomach with faint abs","lean, hard stomach","sculpted eight-pack abs","lean stomach with a visible V-line","firm, flat stomach","thick, solid midsection","broad, soft midsection"],"Stomach");
  addM("hipShape",["lean, narrow hips","slim, straight hips","solid hips","broad hips","narrow hips with a V-taper","thick, solid hips"],"Hips");
  addM("buttSize",["lean, flat butt","muscular butt","round, muscular butt","broad, powerful butt","soft, round butt"],"Butt");
  addM("thighBuild",["powerful, muscular thighs","lean, sinewy thighs","thick, solid thighs","long, strong thighs","heavily muscled thighs"],"Thighs");
  addM("legShape",["long, strong legs","powerful legs with defined calves","lean, wiry legs","thick, sturdy legs","long legs with strong calves"],"Legs");
  addM("bodySoftness",["lean, wiry build","lean, athletic swimmer's build","broad, muscular build","heavily muscled bodybuilder build","tall, lanky build","stocky, powerfully built frame","broad, heavyset build","soft, burly build","rugged, well-worn build","slim, toned build with defined muscle","wiry, compact build","ripped, lean build","tall, broad-shouldered build with a lean waist","bulky, barrel-chested build","slender, elegant build"],"Overall Build");
  addM("posture",["squared, confident posture","slouched, relaxed posture","hands-in-pockets stance","arms-crossed stance","wide-legged confident stance","straight-backed military posture","lazy, slouching lean","chin-up proud posture","hunched, brooding posture"],"Posture");
  addM("markings",["a scar through one eyebrow","a thin scar across one cheek","a long scar across the chest","battle scars across the torso and arms","burn scars along one forearm","claw-mark scars across the torso","laugh lines around the eyes","a sleeve tattoo on one arm","tattooed forearms","a tribal-style shoulder tattoo","a chest tattoo","sun-weathered tan lines at the neck and forearms","freckles across the nose and shoulders"],"Scars and tattoos");
  addM("skinFinish",["weathered, sun-roughened skin","rough, windburned skin","tanned, sweat-sheened skin","matte skin with faint pores","oiled, glistening skin"],"Men’s skin");

  /* ---- makeup and nails ---- */
  addM("makeupStyle",["bare-faced natural look","subtle concealer and tinted lip balm","light foundation and defined brows","guyliner smoky eyes","smudged eyeliner rocker look","dramatic stage makeup","glam glitter makeup","gothic black eyeshadow and eyeliner","clean skin-tint look"],"Men’s makeup");
  addM("nailStyle",["short, clean natural nails","short, blunt nails","short black-painted nails","chipped black nail polish","blunt, calloused nails"],"Nails");

  /* ---- adult details: genital fields and men's pubic hair ---- */
  CHAR.penisType=["circumcised","uncircumcised","straight","slightly curved","smooth","veined"].map(v=>[v,""]);
  CHAR.penisSize=["small","average","above-average","large","very large","huge"].map(v=>[v,""]);
  CHAR.penisColor=["pale pink","soft pink","rosy pink","dusty rose","mauve","tan","light brown","caramel brown","chocolate brown","deep brown"].map(v=>[v,"Natural"]).concat(["pale blue","ice blue","soft lavender","violet","deep violet","deep teal","sea green","ash gray","pearl white","golden","coral","crimson","deep burgundy","hot pink"].map(v=>[v,"Fantasy"]));
  addM("pubicHair",["a trail of hair rising from the pubic area toward the navel","short, closely trimmed pubic hair","thick, untrimmed pubic hair"]);
  Object.assign(LABELS,{facialHair:"Facial hair",facialHairColor:"Facial hair color",bodyHair:"Body hair",penisColor:"Genital color",penisType:"Genital type",penisSize:"Genital size"});
})();

/* ===== v103: male mode — outfit rules and menswear catalog ===== */
(function(){
  /* existing items that read as women's wear are hidden in male mode (the "show both" switch brings them back) */
  OFEM_RX.top=/dress|gown|blouse|cami(sole)?\b|crop|tube|bandeau|halter|strapless|corset|bustier|bralette|bodysuit|babydoll|peplum|ruffle|frill|lace|ribbon|\bbows?\b|bow-|puff|smocked|off-shoulder|off the shoulder|cold-shoulder|one-shoulder|cut-?out|keyhole|sweetheart|plunge|plunging|bikini|swimsuit|one-piece|leotard|negligee|lingerie|\bslip\b|nightgown|chemise|sailor|pinafore|apron|maid|micro|barely|minimal-panel|wrap top|tie-front|knot-front|bandage|bust|heart|floral|flower|sheer|mesh|harness|bra\b|kimono-style|nurse|bunny|witch|princess|lolita|tutu|tulle|belly|midriff|underboob|bolero|shrug|cowl|backless|choli|saree|ao dai|catsuit|bodice|strawberry|pom-pom|square-neck|boat-neck|open-back|knotted at the hem|chain-strap|wrap-front|bishop-sleeve/i;
  OFEM_RX.bottom=/skirt|skort|dress|bikini|micro|booty|hot pants|string|culotte|bloomers|pumpkin|ruffle|frill|lace|tutu|petticoat|sarong|high-waisted|high-rise|cheeky|thong|bow\b|ribbon|tennis|apron|suspender|pinafore|wrap|pantaloons|capri|palazzo|harem|garter|leggings|ultra-short|extremely short|crochet|high-cut|slit|volleyball/i;
  OFEM_RX.legwear=/thigh-?high|stocking|pantyhose|garter|fishnet|lace|sheer|ruffle|\bbows?\b|bow-|ribbon|heel|stiletto|pump|mary jane|ballet|lolita|over-the-knee|maid|wedge|strappy|frill|platform|tights|warmer|leggings|harness|strap|chain|knee-high sock|knee sock|ankle sock|slouch|anklet|toe-ring|open gaps|cow-print/i;
  OFEM_ALL.corset=true;
  OFEM_RX.outerwear=/shrug|bolero|capelet|shawl|stole|ruffle|frill|lace|\bbows?\b|ribbon|princess|cover-up|kimono|poncho|wrap|sweetheart|corset|sheer|maid|apron|cropped|sarafan|dupatta|chiffon|boa\b|pastel|teddy|fluffy|crochet|opera coat|bunny|bear-ear|bath towel|beach dress/i;
  OFEM_ALL.bra=true;OFEM_ALL.panties=true;
  OFEM_RX.belt=/corset|ribbon|\bbows?\b|dainty|heart|pearl|lace|garter|cinch|sash|chain skirt|waist cincher|ruffle|charm/i;
  OFEM_RX.waistAccessory=/ribbon|\bbows?\b|skirt|apron|lace|heart|pearl|frill|ruffle|garter|cinch|drape|charm|jewel|hip scarf|plume|waist chain|chain waist|tassel|sarong|oversized sweater/i;
  OFEM_RX.neckAccessory=/choker|ribbon|\bbows?\b|bow-|heart|pearl|lace|locket|flower|floral|charm|ruffle|frill|dainty|jabot|cameo|butterfly|star|moon|crystal|ruby|rosette|daisy/i;
  OFEM_RX.wristAccessory=/ribbon|\bbows?\b|lace|pearl|charm|heart|flower|floral|dainty|scrunchie|bangle|frill|ruffle|cuffs? with|crystal|delicate|diamond|tennis|jelly|friendship|fuzzy|sparkly|star bracelets|bell bracelets|hair tie|gemstone|slim bracelets/i;
  OFEM_RX.headwear=/\bbows?\b|bow-|ribbon|tiara|veil|flower|floral|bonnet|hair clip|barrette|scrunchie|lace|pearl|heart|maid|cowgirl|hairband|garland|nurse|witch|bunny|kawaii|princess|halo|clip|pin\b|comb|snap|butterfly|star|hair ornament|hair stick|kanzashi|pillbox|sparkling headband|updo wrap|netting|mini hat|satin hair/i;
  OFEM_RX.eyewear=/cat-eye|heart|butterfly|oversized round|rhinestone|star-shaped|pearl|cat eye|flower|sparkle|lace|pastel|jeweled|beaded/i;
  OFEM_RX.gloves=/lace|opera|satin|ruffle|\bbows?\b|ribbon|frill|pearl|elbow|over-the-elbow|evening|arm sleeve|armwear|sleeves|bunny|paw|mitten|heart|sequin|iridescent|ruched|cut-out|arm warmers|cow-print|pastel|crochet|sheer/i;
  OFEM_RX.tagCharm=/heart|\bbows?\b|ribbon|star|flower|floral|butterfly|cat-paw|bunny|cherry|strawberry|sparkle|rainbow|pearl|candy|kawaii|bell|moon|cloud|daisy|clover|paw|camellia|cupcake|hair pin|plush|gem charm/i;
  OFEM_RX.hipAccessory=/purse|handbag|clutch|ribbon|\bbows?\b|heart|plush|pearl|lace|frill|ruffle|charm|bell|tote|mini bag|tassel|butterfly|pom|top-handle|mini (shoulder|studded) bag|bunny/i;
  OFEM_RX.pocketItem=OFEM_RX.loopItem=/ribbon|\bbows?\b|heart|lace|pearl|charm|plush|scrunchie|bell|flower|tassel|pom/i;
  OFEM_RX.earAccessory=/\bbows?\b|ribbon|heart|pearl|drop|dangle|chandelier|flower|floral|butterfly|star|moon|charm|clip-on|tassel|crystal|cluster|dainty|ruby|gem|jewel|clover|daisy|cherry|strawberry|cameo|leaf-shaped|jhumka/i;
  OFEM_RX.ringAccessory=/heart|pearl|flower|floral|\bbows?\b|ribbon|dainty|butterfly|cluster|stack|crystal|gem|jewel|moon|star|delicate|midi|cocktail|thin/i;
  OFEM_RX.thighAccessory=/./;OFEM_RX.kneeAccessory=/ribbon|\bbows?\b|lace|heart|garter/i;
  OFEM_RX.maskAccessory=/\bbows?\b|ribbon|lace|heart|floral|flower|pearl|butterfly|cat-ear/i;
  OFEM_RX.shoulderPiece=/\bbows?\b|ribbon|lace|ruffle|frill|flower|floral|capelet|shawl/i;
  OFEM_RX.tailPiece=OFEM_RX.wingPiece=/\bbows?\b|ribbon|heart/i;
  const DETAIL_FEM=/lace|ruffle|frill|\bbows?\b|bow-|ribbon|heart|floral|flower|pearl|sheer|babydoll|princess|plunging|bust|cleavage|cinch|corset|puff|petal|scallop|sweetheart|empire|peplum|tiered|cut-?out|keyhole|bralette|crop|mini|micro|high-waist|low-cut|off-the-shoulder|off the shoulder|strapless|halter|cold-shoulder|tutu|tulle|chiffon|sequin|glitter|rhinestone|bejewel|jewel|crystal|cute|dainty|delicate|girly|feminine|waist-cinch|pleated skirt|skirt|dress|gown|lingerie|stocking|bra\b|panty|panties|thigh|garter|hem ruffle|bunny|bows?/i;
  OFEM_RX.detailOne=OFEM_RX.detailTwo=OFEM_RX.detailThree=DETAIL_FEM;

  /* ---- menswear catalog: [value, tiers (C casual, U cute, S sexy, L lewd), looks, season, group] ---- */
  addMO("top",[
    ["plain crew-neck tee","CU","casual,sporty,resort"],["fitted cotton t-shirt","CUS","casual,sporty,edgy"],["V-neck tee","CU","casual"],["oversized cotton tee","CU","casual,edgy"],["graphic band tee","CU","edgy,casual"],
    ["long-sleeved cotton tee","C","casual","w"],["ribbed henley shirt","CU","casual,cottage"],["long-sleeved henley","CU","casual,cottage","w"],
    ["button-up shirt","CU","preppy,casual,glam"],["crisp collared button-up shirt","CU","preppy,glam"],["oxford shirt","CU","preppy,casual"],["linen button-up shirt","CU","resort,casual","s"],
    ["flannel shirt","CU","casual,cottage","w"],["plaid flannel shirt","CU","casual,edgy","w"],["chambray work shirt","CU","casual,cottage"],["denim shirt","CU","casual,edgy"],
    ["camp-collar short-sleeved shirt","CU","resort,casual","s"],["Hawaiian-print shirt","CU","resort","s"],["open Hawaiian-print shirt","CUS","resort","s"],
    ["mandarin-collar shirt","CU","costume,glam"],["silk shirt with an open collar","US","glam,boudoir"],["formal shirt with French cuffs","CU","preppy,glam"],["tuxedo shirt with a pleated front","CU","glam,preppy"],
    ["laced-front pirate shirt","CU","costume"],["polo shirt","CU","preppy,sporty,casual"],["knit polo","CU","preppy","w"],
    ["cable-knit sweater","CU","preppy,cottage","w"],["fisherman's sweater","CU","cottage,casual","w"],["crew-neck sweater","CU","casual,preppy","w"],["V-neck sweater","CU","preppy,casual","w"],
    ["turtleneck sweater","CU","preppy,glam,casual","w"],["mock-neck knit sweater","CU","casual,cyber","w"],["chunky knit cardigan","CU","casual,cottage","w"],
    ["pullover hoodie","CU","casual,sporty,edgy","w"],["zip-up hoodie","CU","casual,sporty","w"],["crewneck sweatshirt","CU","casual,sporty","w"],
    ["tank top","CUS","casual,sporty","s"],["muscle tank","CUS","sporty,casual","s"],["sleeveless gym shirt","CU","sporty","s"],["athletic compression shirt","CUS","sporty,cyber"],["performance training shirt","CU","sporty"],["numbered sports jersey","CU","sporty"],
    ["tailored waistcoat over a collared shirt","CU","preppy,glam,costume"],["leather jerkin over a linen shirt","CU","costume,cottage"],["linen tunic","CU","cottage,costume"],["laced-front linen tunic","CU","cottage,costume"],
    ["embroidered mage's tunic","CU","costume"],["padded gambeson","CU","costume"],["armored breastplate over a padded shirt","CU","costume"],["monastic cotton tunic","C","costume,cottage"],
    ["fitted mesh long-sleeve shirt","CUS","edgy,cyber"],["netted tank top","US","edgy,cyber"],["leather chest harness","US","edgy,costume,boudoir"],
    ["open linen shirt worn over a bare chest","US","resort,boudoir","s"],["unbuttoned shirt hanging open","US","boudoir,casual"],["biker leather vest","CU","edgy"],
    ["zip-front tactical shirt","CU","cyber"],["techwear shirt with strap details","CU","cyber"],["wrap-front kimono shirt","CU","costume"]
  ]);
  addMO("bottom",[
    ["straight-leg jeans","CU","casual,edgy"],["slim-fit jeans","CU","casual,edgy"],["relaxed-fit jeans","C","casual"],["baggy jeans","CU","casual,edgy"],["dark-wash jeans","CU","casual,preppy"],["distressed jeans","CU","edgy,casual"],["ripped skinny jeans","CU","edgy"],["bell-bottom jeans","CU","casual,costume"],
    ["chino trousers","CU","preppy,casual"],["pleated trousers","CU","preppy,glam"],["tailored suit trousers","CU","preppy,glam"],["slim tailored trousers","CU","preppy,glam"],["wide-leg trousers","CU","casual,glam"],
    ["linen trousers","CU","resort,casual","s"],["drawstring linen pants","CU","resort,cottage","s"],["corduroy trousers","CU","preppy,cottage","w"],["wool trousers","CU","preppy,cottage","w"],
    ["cargo pants","CU","casual,edgy,sporty"],["tactical cargo pants","CU","cyber,edgy"],["techwear pants with strap details","CU","cyber"],
    ["jogger pants","CU","sporty,casual"],["sweatpants","C","casual,sporty","w"],["track pants","CU","sporty"],
    ["gym shorts","CU","sporty","s"],["running shorts","CU","sporty","s"],["denim shorts","CU","casual","s"],["cargo shorts","CU","casual","s"],["chino shorts","CU","preppy,casual","s"],["bermuda shorts","CU","resort,preppy","s"],["tailored shorts","CU","preppy,glam","s"],
    ["leather pants","US","edgy,glam"],["coated skinny trousers","US","edgy,glam"],["riding breeches","CU","costume,preppy"],["harem pants","CU","costume,resort"],["hakama trousers","CU","costume"],
    ["rugged travel trousers","CU","cottage,costume"],["pirate-style breeches","CU","costume"],["padded gambeson trousers","CU","costume"],["kilt","CU","costume,cottage"],
    ["swim trunks","CU","resort","s"],["board shorts","CU","resort,sporty","s"],["fitted swim briefs","US","resort","s"]
  ]);
  addMO("corset",[
    ["leather chest harness layer","US","edgy,costume,boudoir"],["buckled leather bandolier","CU","costume,edgy"],["fitted waistcoat layer","CU","preppy,glam,costume"],["lace-up leather vest","CU","edgy,costume"],
    ["brigandine armor vest","CU","costume"],["padded gambeson layer","CU","costume"],["wide leather cummerbund","CU","glam,costume"],["plate-armor chest piece","CU","costume"]
  ]);
  addMO("outerwear",[
    ["tailored blazer","CU","preppy,glam"],["single-breasted suit jacket","CU","preppy,glam"],["double-breasted blazer","CU","preppy,glam"],["tuxedo jacket","CU","glam"],
    ["leather biker jacket","CU","edgy"],["bomber jacket","CU","casual,sporty,edgy"],["denim jacket","CU","casual,edgy"],["windbreaker","CU","sporty,casual"],["puffer jacket","CU","casual,sporty","w"],
    ["peacoat","CU","preppy,casual","w"],["long wool overcoat","CU","preppy,glam","w"],["trench coat","CU","preppy,glam"],["duster coat","CU","costume,edgy"],["field jacket","CU","casual,cyber"],
    ["parka with a fur-trimmed hood","CU","casual,cottage","w"],["shearling-lined jacket","CU","casual,cottage","w"],["track jacket","CU","sporty"],["tech shell jacket","CU","cyber"],
    ["hooded travel cloak","CU","costume,cottage"],["flowing mage robe","CU","costume"],["long frock coat","CU","costume,glam"],["officer's military coat","CU","costume"],
    ["tactical vest","CU","cyber,edgy"],["cargo vest","CU","casual,cyber"],["haori jacket","CU","costume"],["happi coat","CU","costume"],["lab coat","CU","costume,preppy"],
    ["fur-trimmed mantle","CU","costume,glam","w"],["quilted vest","CU","casual,cottage","w"]
  ]);
  addMO("legwear",[
    ["crew socks","C","casual,sporty"],["athletic crew socks","C","sporty"],["ankle socks","C","casual,sporty","s"],["argyle socks","CU","preppy"],["wool socks","C","cottage,casual","w"],
    ["knee-high sports socks","CU","sporty"],["compression leggings under shorts","CU","sporty"],["thermal base-layer leggings","C","sporty","w"],
    ["lace-up combat boots","CU","edgy,cyber,casual"],["leather ankle boots","CU","casual,edgy"],["chelsea boots","CU","preppy,glam,casual"],["work boots","CU","casual,cottage"],
    ["hiking boots","CU","casual,sporty,cottage"],["riding boots","CU","costume,preppy"],["cuffed leather boots","CU","costume,cottage"],["tall armored boots","CU","costume"],
    ["high-top sneakers","CU","casual,sporty,edgy"],["low-top canvas sneakers","CU","casual"],["running shoes","CU","sporty"],["leather oxford shoes","CU","preppy,glam"],["loafers","CU","preppy,glam"],
    ["derby shoes","CU","preppy"],["slip-on sneakers","C","casual"],["sandals","C","resort,casual","s"],["flip-flops","C","resort","s"],["tabi socks with geta sandals","CU","costume"]
  ]);
  addMO("belt",[
    ["leather belt with a metal buckle","CU","casual,preppy"],["braided leather belt","CU","preppy,cottage"],["canvas web belt","C","casual,sporty"],["wide leather belt with pouches","CU","costume,cottage"],
    ["utility belt with pouches","CU","cyber,costume"],["sword belt with a sheath loop","CU","costume"],["studded leather belt","CU","edgy"],["cummerbund","CU","glam"],["rope belt","C","cottage,costume"],["bandolier strap","CU","costume,edgy"]
  ]);
  addMO("waistAccessory",[
    ["folded waist sash","CU","costume,resort"],["pocket watch on a chain","CU","preppy,costume,glam"],["leather pouch on the belt","CU","costume,cottage"],["key ring clipped to the belt","C","casual"],
    ["holstered multitool","CU","cyber"],["belt-hung lantern","CU","costume"],["cloth obi sash","CU","costume"]
  ]);
  addMO("neckAccessory",[
    ["loosely knotted necktie","CU","preppy,casual"],["slim necktie","CU","preppy,glam"],["bow tie","CU","glam,preppy"],["silk cravat","CU","glam,costume"],["ascot","CU","glam,preppy"],
    ["dog tag necklace","CU","edgy,sporty"],["leather cord necklace","CU","casual,cottage"],["chunky chain necklace","CU","edgy,glam"],["chain necklace with a pendant","CU","casual,edgy"],
    ["wooden bead necklace","C","resort,cottage"],["puka shell necklace","C","resort","s"],["knit scarf","CU","casual,preppy","w"],["bandana neckerchief","CU","casual,edgy,costume"],
    ["studded leather collar","US","edgy"],["fur ruff collar","CU","costume,glam","w"],["silk scarf tied at the throat","CU","glam,resort"]
  ]);
  addMO("wristAccessory",[
    ["analog wristwatch","CU","preppy,casual,glam"],["leather strap watch","CU","preppy,casual"],["smartwatch","CU","casual,cyber,sporty"],["leather cuff bracelet","CU","edgy,casual"],
    ["beaded bracelet","C","casual,resort"],["braided leather bracelet","C","casual,cottage"],["metal chain bracelet","CU","edgy,glam"],["sports wristband","C","sporty"],
    ["armored vambrace","CU","costume"],["leather bracer","CU","costume,cottage"],["wrapped hand wraps","C","sporty"]
  ]);
  addMO("headwear",[
    ["baseball cap","CU","casual,sporty"],["flat cap","CU","preppy,cottage"],["newsboy cap","CU","preppy,cottage"],["fedora","CU","glam,preppy"],["trilby","CU","glam,preppy"],
    ["cowboy hat","CU","costume,casual"],["top hat","CU","costume,glam"],["bowler hat","CU","costume,preppy"],["wide-brimmed hat","CU","resort,cottage"],["straw boater","CU","preppy,resort","s"],
    ["bucket hat","C","casual,resort"],["knit beanie","C","casual","w"],["sports headband","C","sporty"],["bandana headwrap","CU","casual,edgy,costume"],["military peaked cap","CU","costume"],
    ["pirate tricorn hat","CU","costume"],["wizard's pointed hat","CU","costume"],["laurel wreath","CU","costume"],["circlet","CU","costume"]
  ]);
  addMO("eyewear",[
    ["aviator sunglasses","CU","casual,edgy"],["wire-rimmed glasses","CU","preppy,casual"],["thick-framed glasses","CU","preppy,casual"],["round wire glasses","CU","preppy,cottage,costume"],
    ["rectangular glasses","CU","preppy,casual"],["half-rim reading glasses","CU","preppy"],["monocle","CU","costume,glam"],["sport wraparound sunglasses","CU","sporty,cyber"],
    ["tinted round sunglasses","CU","edgy,casual"],["eyepatch","CU","costume,edgy"]
  ]);
  addMO("gloves",[
    ["leather driving gloves","CU","glam,preppy","w"],["fingerless leather gloves","CU","edgy"],["work gloves","C","casual,cottage"],["tactical gloves","CU","cyber"],
    ["wool gloves","C","casual","w"],["boxing hand wraps","C","sporty"],["armored gauntlets","CU","costume"],["formal gloves","CU","glam,costume"]
  ]);
  addMO("tagCharm",[
    ["small enamel lapel pin","CU","preppy,glam"],["rank insignia pin","CU","costume"],["dog tag charm","CU","edgy,sporty"],["guild badge","CU","costume"],["compass pin","CU","costume,cottage"],
    ["feather pin","CU","cottage,costume"],["metal brooch","CU","glam,costume"],["military medal bar","CU","costume"]
  ]);
  addMO("hipAccessory",[
    ["leather messenger bag","CU","preppy,casual"],["canvas satchel","CU","cottage,casual"],["crossbody bag","CU","casual"],["belt pouch","CU","costume,cottage"],["utility holster pouch","CU","cyber"],
    ["water canteen","C","cottage,costume"],["sword in a scabbard","CU","costume"],["quiver of arrows","CU","costume"],["coin purse on a cord","CU","costume,cottage"],["ring of keys","C","casual,cottage"],
    ["hip flask","CU","costume,edgy"],["sheathed dagger","CU","costume,edgy"]
  ]);
  addMO("pocketItem",[["folded pocket square","CU","glam,preppy"],["folded handkerchief","C","preppy"],["wallet","C","casual"],["pocket watch","CU","preppy,costume"],["small notebook","C","preppy,cottage"],["pen","C","preppy"]]);
  addMO("loopItem",[["wallet chain","CU","edgy"],["carabiner with keys","C","casual,sporty"],["clipped flashlight","C","cyber"],["hanging towel","C","sporty"],["rope coil","C","costume,cottage"]]);
  addMO("earAccessory",[
    ["stud earrings","CU","casual,edgy,glam"],["single hoop earring","CU","edgy,casual"],["ear cuff","CU","edgy,glam"],["small hoop earrings","CU","casual"],["feather earring","CU","cottage,edgy"],
    ["cross earring","CU","edgy,gothic"],["ear gauges","CU","edgy"]
  ]);
  addMO("ringAccessory",[["signet ring","CU","preppy,glam"],["plain band ring","C","casual"],["chunky metal ring","CU","edgy"],["skull ring","CU","edgy,gothic"],["stacked metal rings","CU","edgy"]]);
  addMO("thighAccessory",[["leg holster strap","CU","cyber,costume"],["thigh holster","CU","cyber,costume"]]);
  addMO("kneeAccessory",[["knee pads","C","sporty,edgy"],["armored knee guards","CU","costume"],["knee brace","C","sporty"]]);
  addMO("shoulderPiece",[["armored pauldrons","CU","costume"],["fur-lined shoulder mantle","CU","costume"]]);
  addMO("bra",[
    ["ribbed undershirt","C","casual"],["V-neck undershirt","C","casual"],["cotton tank undershirt","C","casual"],["compression undershirt","C","sporty"],["thermal undershirt","C","casual","w"],
    ["sheer mesh undershirt","S","boudoir,edgy"],["cropped mesh tank","S","edgy,boudoir"]
  ]);
  addMO("panties",[
    ["plain cotton boxer briefs","C","casual"],["cotton boxers","C","casual"],["classic briefs","C","casual"],["compression shorts","C","sporty"],
    ["plaid boxers","U","casual"],["striped boxers","U","casual"],["boxer briefs with a logo waistband","CU","sporty"],
    ["low-rise briefs","S","boudoir"],["bikini briefs","S","boudoir,resort"],["mesh briefs","S","boudoir,edgy"],["silk boxers","S","boudoir,glam"],["satin boxers","S","boudoir"],
    ["jockstrap","SL","boudoir,sporty"],["fundoshi loincloth","S","costume"],["thong briefs","L","boudoir"],["sheer pouch briefs","L","boudoir"],["g-string","L","boudoir"]
  ]);
  addMO("detailOne",[
    ["contrast stitching","CU","casual,preppy"],["rolled sleeves","CU","casual,preppy"],["leather elbow patches","CU","preppy,cottage"],["brass buttons","CU","preppy,costume"],["shoulder epaulettes","CU","costume"],
    ["double row of buttons","CU","preppy,costume"],["utility straps","CU","cyber,edgy"],["flapped chest pockets","CU","casual,cyber"],["contrast collar","CU","preppy"],["embroidered crest on the chest","CU","preppy,costume"],
    ["metal zipper details","CU","edgy,cyber"],["studded details","CU","edgy"],["racing stripes","CU","sporty"],["rolled hem cuffs","C","casual"]
  ]);
  addMO("detailTwo",[
    ["slim fit","CU"],["tailored fit","CU"],["relaxed fit","C"],["oversized fit","CU"],["tapered leg","CU"],["cuffed ankle","CU"],["rolled-up cuffs","CU"],["wide-leg cut","CU"],
    ["cropped at the ankle","CU"],["broad-shouldered cut","CU"],["fitted through the chest and waist","CUS"]
  ]);
  addMO("detailThree",[
    ["brushed cotton finish","C"],["heavy wool texture","C","w"],["washed denim finish","C"],["distressed finish","CU"],["waxed canvas texture","C"],["matte leather finish","CU"],["crisp pressed finish","CU"],
    ["worn-in leather","CU"],["tweed texture","CU"],["corduroy ribbing","C"],["technical fabric sheen","CU"],["linen texture","C","s"],["raw denim","C"]
  ]);
  /* garments the kind rules do not know */
  KIND_RULES.bottom.unshift(["shorts",/trunks|board shorts/],["pants",/breeches|hakama|harem/],["skirt",/kilt/]);
  KIND_RULES.top.unshift(["vest",/waistcoat|biker leather vest/]);
})();

/* ===== v103: male mode — species, conversion engine, Sex control ===== */
/* male-native species names; creature features still come from the original (legacy) key */
(function(){
  SPECIES_INFO.incubus={type:"solo",legacy:["succubus"]};
  SPECIES_INFO.merman={type:"solo",legacy:["mermaid"]};
  SPECIES_INFO.god={type:"solo",legacy:["goddess"]};
  addM("subjectType",["incubus"],"Fantasy Humanoid");
  addM("subjectType",["merman"],"Aquatic");
  addM("subjectType",["god"],"Divine / Cosmic");
  tagF("subjectType",["succubus","mermaid","goddess"]);
  Object.assign(SPECIES_FAMILY,{incubus:"demon",merman:"aquatic",god:"angel"});
})();
