/* ---- v263 (replaces look262.js): the boys and the headmistresses as people of their own (look263data.js, written in hm/lb*.py and
   hm/lh*.py, revised by hm/x263_*.py). Before this, the boys were near-copies of one another (every one "a man", every one tall, five or six faces,
   two thirds with their girl's House colors for hair) and the headmistresses were their Keepers grown up (her House's
   hair, her eyes, her face, her styling). Now:
   - each boy is a young man with his own coloring, face, hair, build and height, chosen for his story and his House;
   - each headmistress is a mature woman of her own, chosen for her life and her House, not her Keeper's older double;
   - both stand the same way in their main looks (standing straight, facing the viewer), so their images match;
   - their descriptions (blurbs) describe the new looks.
   Each build is one of a set of body types, written out field by field. New options are added to the studio. Anything
   already built on a boy or headmistress (scenes, the faculty council) is rebuilt on the new look.
   v263: every young man strong and defined, with a sharp face and a protector's build (no slight, soft or boyish ones), and
   each headmistress a striking woman in her thirties (no gray or white hair, no lines, no heavy or soft figures). Nothing in
   a look names what clothes cover: tattoos, scars, seams and freckles sit on the face, neck or hands, and the boys' body
   hair is gone, so a portrait in robes draws one clothed figure instead of a second, bared one to show them.
   Also: loading a woman of the Academy (a girl, a headmistress) while the studio is in male mode no longer turns her
   into a man; she loads as she is. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function"||typeof LOOK263!=="object"||typeof START==="undefined")return;
  const L=LOOK263,HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);
  const STAND={m:"standing straight, facing the viewer, arms relaxed at his sides",f:"standing straight, facing the viewer, arms relaxed at her sides"};
  const BODYF=["shoulderShape","torsoShape","armShape","handShape","bustSize","bustShape","bustWeight","waistShape","stomachShape","hipShape","buttSize","thighBuild","legShape","bodySoftness"];
  const opt=(f,v,grp)=>{if(typeof v==="string"&&v&&v[0]!=="@")START.option(f,v,grp)};
  const set=(c,f,v,grp)=>{if(v===undefined||v===null)return;if(v===""){delete c[f];return}c[f]=v;opt(f,v,grp)};
  const changed=new Set();
  /* the boys */
  Object.entries(L.boys||{}).forEach(([h,s])=>{const t=tplById(h+"man");if(!t||!t.c)return;const c=t.c,G="Young men";
    c.age="young man";
    ["hairUnderlayer","hairInner","hairHighlights","hairBlend","hairMovement","faceMark","bodyHair"].forEach(f=>delete c[f]);
    if(/weathered|rough/i.test(c.skinFinish||""))c.skinFinish="healthy, sun-warmed skin";
    set(c,"skinTone",s.sk,G);set(c,"undertone",s.ut,G);set(c,"hairBase",s.hair,G);set(c,"facialHairColor",s.fhc||s.hair,G);
    set(c,"hairStyle",s.style,G);set(c,"hairLength",s.len,G);set(c,"hairTexture",s.tex,G);set(c,"bangs",s.bangs,G);set(c,"facialHair",s.facial,G);
    set(c,"faceShape",s.face,G);set(c,"eyeShape",s.eyes,G);set(c,"eyeOne",s.eyecol,G);set(c,"browShape",s.brows,G);set(c,"noseShape",s.nose,G);set(c,"mouthShape",s.mouth,G);
    set(c,"heightStature",s.height,G);const B=(L.mbuild||{})[s.build];if(B)BODYF.forEach((f,i)=>set(c,f,B[i],G));
    set(c,"markings",s.marks||"no markings",G);if(s.blend)set(c,"hairBlend",s.blend,G);
    set(c,"impression",s.impression,G);set(c,"expression",s.expression,G);c.posture=STAND.m;opt("posture",STAND.m,"Academy");
    if(s.sum&&t.bio)t.bio.summary=s.sum;
    t.blurb=`${t.bio&&t.bio.fullName||t.name}${t.bio&&t.bio.title?", "+t.bio.title:""}: ${s.look.replace(/[.\s]*$/,".")}`;changed.add(t.id)});
  /* the headmistresses */
  Object.entries(L.heads||{}).forEach(([h,s])=>{const t=tplById(h+"head");if(!t||!t.c)return;const c=t.c,G="Mature women";
    ["hairUnderlayer","hairInner","hairHighlights","hairBlend","hairMovement","faceMark","bodyMarkings","eyelinerStyle","eyeshadowStyle","lashStyle","blushStyle","faceAccents","nailColor","eyeTwo","eyeConfig"].forEach(f=>delete c[f]);
    c.eyeConfig="matching";
    /* her Keeper's body markings and skin finish were copied onto her; an elder frame's seams and a Daughter's Void marks are hers */
    if(!c.subjectType){["markings","markingColor","lashNaturalColor","browShapeColor","hairBlendColor","nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","vaginaColor","vaginaType","pubicHair"].forEach(f=>delete c[f]);
      c.skinFinish="smooth, radiant skin";opt("skinFinish",c.skinFinish,G);
      if(/slit|star|heart|cross|ring|spiral|glow/i.test(c.pupilStyle||""))c.pupilStyle="round pupils";
      c.irisDetail="clear iris detail";c.lashNatural="long, dark eyelashes";opt("lashNatural",c.lashNatural,G)}
    set(c,"age",s.age,G);set(c,"skinTone",s.sk,G);set(c,"undertone",s.ut,G);set(c,"hairBase",s.hair,G);if(s.blend)set(c,"hairBlend",s.blend,G);
    set(c,"hairStyle",s.style,G);set(c,"hairLength",s.len,G);set(c,"hairTexture",s.tex,G);set(c,"bangs",s.bangs,G);
    set(c,"faceShape",s.face,G);set(c,"eyeShape",s.eyes,G);set(c,"eyeOne",s.eyecol,G);set(c,"browShape",s.brows,G);set(c,"noseShape",s.nose,G);set(c,"mouthShape",s.mouth,G);
    set(c,"heightStature",s.height,G);const B=(L.fbuild||{})[s.build];if(B)BODYF.forEach((f,i)=>set(c,f,B[i],G));
    if(s.facemark)set(c,"faceMark",s.facemark,G);if(s.marks)set(c,"markings",s.marks,G);set(c,"makeupStyle",s.makeup,G);set(c,"lipFinish",s.lips,G);c.nailStyle="short, neatly manicured nails";opt("nailStyle",c.nailStyle,G);
    set(c,"impression",s.impression,G);set(c,"expression",s.expression,G);c.posture=STAND.f;
    if(s.sum&&t.bio)t.bio.summary=s.sum;
    const fn=t.bio&&t.bio.fullName;t.blurb=`${fn?fn+", Headmistress of "+HN(h)+" House":t.name}: ${s.look.replace(/[.\s]*$/,".")}`;changed.add(t.id)});
  /* whatever was built on them is built again on the new looks */
  /* (in place: each keeps its own name, tags and outfit, and takes the new face, hair and build under its own overrides) */
  const RAW=START.RAW||{};const again=Object.values(RAW).filter(e=>e&&changed.has(e.base));
  again.forEach(e=>{const T=tplById(e.id),B=tplById(e.base);if(!T||!B)return;const c=Object.assign({},B.c);(e.drop||[]).forEach(f=>delete c[f]);Object.assign(c,e.c||{});T.c=c});
  /* a woman of the Academy loads as she is, whatever mode the studio is in */
  const FEMID=/^(.+?)(robes|signature|regalia|gcolors|head|headrobes|headregalia|headgcolors)$/;
  if(typeof loadStart==="function"&&typeof carryLocks==="function"){const ls=loadStart;
    window.loadStart=function(t){const m=t&&FEMID.exec(t.id||"");
      if(m&&(ACAD.HOUSES||[]).includes(m[1])&&!(t.c&&t.c.sex)&&typeof isMale==="function"&&isMale()){
        const nb=stateFromTemplate(t),r=carryLocks(S,nb);replaceState(nb);toast(`Loaded “${t.name}”.${typeof keptMsg==="function"?keptMsg(r):""} Undo brings back your previous design.`);return}
      return ls.apply(this,arguments)}}
  window.LOOK263N={boys:Object.keys(L.boys||{}).length,heads:Object.keys(L.heads||{}).length,rebuilt:again.length};
})();

/* ---- v255: the people (the girls' robes, the headmistresses, the boyfriends and the principals: name, blurb and
   biography), read from the data file once every template is made and before the Encyclopedia is written. ---- */
if(typeof ACAD!=="undefined"&&ACAD.canonApply&&typeof tplById==="function")ACAD.canonApply("people",tplById);

/* ---- v224: the Academy Encyclopedia. A full-screen reader beside the studio (it changes nothing in the studio itself).
   ENC.page(id, def) registers a page; def = {title, sec (nav section id), crumbs:[page ids], theme, blocks | build(el)}.
   Blocks are small arrays, each tagged "c" (Canon: already in the studio's data) or "n" (New lore: written for the Encyclopedia):
     ["lead",text,tag]  ["h",title]  ["p",text,tag]  ["facts",[[label,value],...],tag]  ["list",[text,...],tag]  ["quote",text,who,tag]
   Text may link with [[page-id|label]]. Content files (enc224lore.js and later) only add pages and text. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.GROUPS)return;
  const ENC=window.ENC=window.ENC||{};
  ENC.pages=ENC.pages||{};ENC.blocks=ENC.blocks||{};
  ENC.SECTIONS=[
    {id:"world",n:1,title:"World Overview",page:"world"},
    {id:"history",n:2,title:"Historical Foundations",page:null,plan:"The founding, the long centuries of the Houses, the Great Waking and the Year of the Hundred."},
    {id:"academy",n:3,title:"The Academy",page:null,plan:"The Headmaster, the deans, the principals and the headmistresses; rules, customs, lessons and an ordinary day at Everspire."},
    {id:"groups",n:4,title:"Houses and Groups",page:"groups"},
    {id:"places",n:5,title:"Locations and Environment",page:null,plan:"The Spire, the great dining hall, every group's haunt, the lake, the forest, the sea cliffs and beyond."},
    {id:"cast",n:6,title:"Characters and Relationships",page:null,plan:"The whole cast in one place: best friends, girlfriends, rivals, boyfriends and staff."},
    {id:"culture",n:7,title:"Culture and Traditions",page:null,plan:"Ceremonies, festivals, the Spire Cup, the old rivalries and the unwritten rules."},
    {id:"conflicts",n:8,title:"Conflicts and Stories",page:null,plan:"Open feuds, unsolved mysteries and story seeds for every group."},
    {id:"oc",n:9,title:"Original Characters",page:null,plan:"How your own girl joins Everspire: claiming a dormant House, choosing a group and finding her people."},
    {id:"canon",n:10,title:"Canon Reference",page:null,plan:"What is established, what is new, and what is still open."}];
  ENC.page=(id,def)=>{ENC.pages[id]=Object.assign(ENC.pages[id]||{},def,{id});return ENC.pages[id]};

  /* ---------- helpers ---------- */
  const E=(tag,props,...kids)=>{const el=document.createElement(tag);
    if(props)for(const [k,v] of Object.entries(props)){if(v==null||v===false)continue;
      if(k==="class")el.className=v;else if(k==="text")el.textContent=v;else if(k==="style"&&typeof v==="object")Object.entries(v).forEach(([sk,sv])=>{if(sk.startsWith("--"))el.style.setProperty(sk,sv);else el.style[sk]=sv});
      else if(k.startsWith("on"))el.addEventListener(k.slice(2),v);else el.setAttribute(k,v===true?"":v)}
    kids.flat(Infinity).forEach(c=>{if(c==null||c===false)return;el.append(c.nodeType?c:document.createTextNode(String(c)))});return el};
  ENC.E=E;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);ENC.HN=HN;
  const G=id=>ACAD.GROUPS.find(g=>g.id===id);ENC.G=G;
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  /* names in free text become links to their house pages (longest names first, so "Arctic Fox" wins over "Fox") */
  const NAMES=ACAD.HOUSES.map(h=>[HN(h),h]).sort((a,b)=>b[0].length-a[0].length);
  const NAMERX=new RegExp("\\b("+NAMES.map(([n])=>n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")\\b","g");
  const BYNAME=Object.fromEntries(NAMES);
  function linkNames(text){const out=[];let last=0;String(text||"").replace(NAMERX,(m,n,i)=>{out.push(text.slice(last,i));out.push(lnk("house:"+BYNAME[n],n));last=i+m.length;return m});out.push(String(text||"").slice(last));return out}
  function lnk(id,label){return E("a",{href:"#",class:"enc-link","data-go":id,onclick:ev=>{ev.preventDefault();ENC.go(id)}},label)}
  function rich(text){const out=[];let last=0;const s=ACAD.CT?ACAD.CT.fill(String(text||"")):String(text||"");s.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,id,label,i)=>{out.push(s.slice(last,i));out.push(lnk(id,label));last=i+m.length;return m});out.push(s.slice(last));return out}
  ENC.rich=rich;ENC.linkNames=linkNames;ENC.lnk=lnk;
  const TAGTXT={c:"Canon",n:"New lore"};
  const tagEl=t=>t?E("span",{class:"enc-tag enc-tag-"+t,title:t==="c"?"Established in the studio's data":"Proposed in the Encyclopedia; open to change"},TAGTXT[t]):null;
  ENC.tagEl=tagEl;
  function blocks(list){return list.map(b=>{const [k]=b;
    if(k==="lead")return E("p",{class:"enc-lead enc-"+(b[2]||"n")},rich(b[1]),tagEl(b[2]));
    if(k==="h")return E("h3",{class:"enc-h"},b[1]);
    if(k==="p")return E("p",{class:"enc-p enc-"+(b[2]||"n")},rich(b[1]),tagEl(b[2]));
    if(k==="quote")return E("blockquote",{class:"enc-quote enc-"+(b[3]||"n")},E("p",null,rich(b[1])),b[2]?E("cite",null,b[2]):null,tagEl(b[3]));
    if(k==="list")return E("ul",{class:"enc-list enc-"+(b[2]||"n")},b[1].map(x=>E("li",null,rich(x))),b[2]?E("li",{class:"enc-list-tag"},tagEl(b[2])):null);
    if(k==="facts")return E("dl",{class:"enc-facts enc-"+(b[2]||"n")},b[1].map(([a,v])=>[E("dt",null,a),E("dd",null,rich(v))]),b[2]?E("div",{class:"enc-facts-tag"},tagEl(b[2])):null);
    return null})}
  ENC.renderBlocks=blocks;
  /* readable text color on a hex background */
  const lum=hex=>{const m=/^#?([0-9a-f]{6})$/i.exec(hex||"");if(!m)return .5;const n=parseInt(m[1],16),c=[n>>16&255,n>>8&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
  ENC.inkOn=hex=>lum(hex)>.36?"#17142a":"#fbf8f2";
  ENC.crestCols=g=>{const c=(ACAD.CREST&&ACAD.CREST[g]&&ACAD.CREST[g].c)||{};return {field:c.a||"#2a2f4a",band:c.b||"#c9a24a",mark:c.e||"#e8dfc8",hi:c.f||"#ffffff"}};
  const pixel=(h,size)=>{const im=ACAD.pixelImg?ACAD.pixelImg(h,size):null;if(im){im.classList.add("enc-px");im.alt=""}return im};
  const crest=(g,size)=>{const im=ACAD.crestImg?ACAD.crestImg(g,size):null;if(im){im.classList.add("enc-px");im.alt=""}return im};
  ENC.pixel=pixel;ENC.crest=crest;
  /* loading a look into the studio goes the same way the starting points do */
  ENC.load=id=>{const t=typeof tplById==="function"?tplById(id):null;if(!t){if(typeof toast==="function")toast("That look isn't available.");return}
    try{if(typeof spLoad==="function")spLoad({t,key:"t:"+id,name:t.name});else loadStart(t)}catch(e){loadStart(t)}
    ENC.close()};
  ENC.loadBtn=(id,label)=>{const t=typeof tplById==="function"&&tplById(id);return t?E("button",{type:"button",class:"enc-load",onclick:()=>ENC.load(id),title:"Load into the studio"},label||t.name):null};

  /* ---------- the reader ---------- */
  let dlg,nav,main,crumbs,hist=[],cur=null;
  const css=`
#encDlg{--e-card:#fff;--e-line:#cfd2e4;--e-night:#151931;--e-night2:#1e2342;--e-gold:#d8b25a;--e-gold2:#a8842e;--e-vellum:#f1f2f7;--e-vellum2:#e4e6f0;--e-ink:#1b1d33;--e-muted:#5c6080;--e-dawn:#e9a25f;--e-dusk:#6c4fa3;
  --e-serif:"Cormorant Garamond","Cormorant","Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;--e-sans:var(--fb,"Public Sans","Segoe UI",system-ui,sans-serif);
  width:100vw;height:100vh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:var(--e-vellum);color:var(--e-ink);font-family:var(--e-sans)}
#encDlg[open]{display:grid;grid-template-columns:270px 1fr;grid-template-rows:auto 1fr}
#encDlg::backdrop{background:rgba(10,12,28,.6)}
#encDlg .enc-top{grid-column:1/-1;display:flex;align-items:center;gap:14px;padding:10px 18px;background:var(--e-night);color:#efe9da;border-bottom:1px solid #2c3260}
#encDlg .enc-brand{font-family:var(--e-serif);font-size:23px;font-weight:600;letter-spacing:.01em;white-space:nowrap;cursor:pointer}
#encDlg .enc-brand small{display:block;font-family:var(--e-sans);font-size:11.5px;font-weight:500;color:#b9b4d6;letter-spacing:.02em}
#encDlg .enc-search{flex:1;max-width:460px;margin-left:auto;background:#232848;border:1px solid #3a4175;color:#efe9da;border-radius:8px;padding:8px 12px;font:inherit;font-size:14px}
#encDlg .enc-search::placeholder{color:#9893bb}
#encDlg .enc-x,#encDlg .enc-back{background:transparent;border:1px solid #3a4175;color:#efe9da;border-radius:8px;padding:7px 12px;font:inherit;font-size:14px;cursor:pointer}
#encDlg .enc-x:hover,#encDlg .enc-back:hover{border-color:var(--e-gold)}
#encDlg :focus-visible{outline:2px solid var(--e-gold);outline-offset:2px}
#encDlg nav{background:var(--e-night2);color:#d9d5ea;overflow:auto;padding:14px 10px 30px}
#encDlg nav a{display:flex;gap:9px;align-items:baseline;padding:6px 10px;border-radius:7px;color:inherit;text-decoration:none;font-size:14px;line-height:1.3}
#encDlg nav a:hover{background:#2a3058}
#encDlg nav a.on{background:#323a6b;color:#fff}
#encDlg nav a .n{font-family:var(--e-serif);font-weight:700;color:var(--e-gold);min-width:1.4em;text-align:right}
#encDlg nav a.soon{opacity:.55}
#encDlg nav .sub{margin:2px 0 6px 28px;border-left:1px solid #3a4175;padding-left:6px}
#encDlg nav .sub a{font-size:13px;padding:4px 8px}
#encDlg nav .fac{font-size:11.5px;color:#a9a4cf;margin:8px 0 2px 12px;letter-spacing:.03em}
#encDlg nav .sub img{width:14px;height:14px}
#encDlg nav .enc-navh{font-size:11.5px;color:#a9a4cf;margin:16px 0 4px 12px;letter-spacing:.03em;border-top:1px solid #343a6a;padding-top:12px}
#encDlg main{overflow:auto;position:relative}
#encDlg .enc-crumbs{font-size:12.5px;color:var(--e-muted);padding:14px 40px 0;display:flex;flex-wrap:wrap;gap:6px}
#encDlg .enc-crumbs a{color:inherit}
#encDlg .enc-article{max-width:860px;padding:8px 40px 80px}
#encDlg .enc-wide{max-width:1180px}
#encDlg h1.enc-title{font-family:var(--e-serif);font-weight:700;font-size:44px;line-height:1.05;margin:10px 0 6px}
#encDlg h3.enc-h{font-family:var(--e-serif);font-weight:700;font-size:26px;margin:34px 0 8px;line-height:1.15}
#encDlg .enc-lead{font-family:var(--e-serif);font-size:21px;line-height:1.5;margin:10px 0 18px}
#encDlg .enc-p,#encDlg .enc-list{font-size:15.5px;line-height:1.7;margin:0 0 14px;max-width:72ch}
#encDlg .enc-list{padding-left:22px}
#encDlg .enc-list li{margin:3px 0}
#encDlg .enc-list .enc-list-tag{list-style:none;margin-left:-22px}
#encDlg .enc-quote{margin:18px 0;padding:6px 0 6px 22px;border-left:3px solid var(--e-gold2);font-family:var(--e-serif);font-size:20px;line-height:1.45}
#encDlg .enc-quote p{margin:0}
#encDlg .enc-quote cite{display:block;font-family:var(--e-sans);font-size:13px;font-style:normal;color:var(--e-muted);margin-top:4px}
#encDlg .enc-facts{display:grid;grid-template-columns:max-content 1fr;gap:6px 18px;margin:12px 0 20px;padding:14px 18px;background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:10px;font-size:14.5px}
#encDlg .enc-facts dt{color:var(--e-muted)}
#encDlg .enc-facts dd{margin:0}
#encDlg .enc-facts .enc-facts-tag{grid-column:1/-1}
#encDlg .enc-tag{display:inline-block;margin-left:8px;font-family:var(--e-sans);font-size:11px;font-weight:600;padding:1px 7px;border-radius:20px;vertical-align:2px;white-space:nowrap}
#encDlg .enc-tag-c{background:#e1ecf8;color:#24507f}
#encDlg .enc-tag-n{background:#f5e8cf;color:#7a531c}
#encDlg .enc-link{color:#3b3f9e;text-decoration:underline;text-decoration-color:rgba(59,63,158,.35);text-underline-offset:2px}
#encDlg .enc-link:hover{text-decoration-color:currentColor}
#encDlg .enc-px{image-rendering:pixelated}
#encDlg .enc-load{font:inherit;font-size:13px;padding:6px 11px;border-radius:7px;border:1px solid var(--e-line);background:var(--e-card);color:var(--e-ink);cursor:pointer}
#encDlg .enc-load:hover{border-color:var(--e-ink)}
#encDlg .enc-loads{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 18px}
#encDlg .enc-note{font-size:13.5px;color:var(--e-muted)}
/* cover */
#encDlg .enc-cover{position:relative;min-height:440px;display:grid;grid-template-columns:1fr 1fr;color:#fff;overflow:hidden}
#encDlg .enc-cover .dawn{background:linear-gradient(170deg,#f7d39a 0%,#e9a25f 40%,#c96a5d 100%)}
#encDlg .enc-cover .dusk{background:linear-gradient(190deg,#2a2160 0%,#4b3586 45%,#7b4f9e 100%)}
#encDlg .enc-cover svg.tower{position:absolute;left:50%;bottom:0;transform:translateX(-50%);height:100%;width:auto;pointer-events:none}
#encDlg .enc-cover .ttl{z-index:2;position:absolute;left:0;right:0;top:34px;text-align:center;font-family:var(--e-serif)}
#encDlg .enc-cover .ttl h1{margin:0;font-size:60px;font-weight:700;line-height:1;text-shadow:0 2px 18px rgba(20,10,40,.45)}
#encDlg .enc-cover .ttl p{margin:8px 0 0;font-size:20px;font-style:italic;text-shadow:0 1px 10px rgba(20,10,40,.5)}
#encDlg .enc-cover .side{position:relative;z-index:2;display:flex;flex-direction:column;justify-content:flex-end;padding:0 34px 30px}
#encDlg .enc-cover .side.r{align-items:flex-end;text-align:right}
#encDlg .enc-cover .side h2{font-family:var(--e-serif);font-size:30px;margin:0 0 4px;font-weight:700}
#encDlg .enc-cover .side p{margin:0 0 10px;font-size:14px;max-width:30ch;opacity:.95}
#encDlg .enc-cover .side a{color:#fff}
#encDlg .enc-cover .dawn .side, #encDlg .enc-cover .dawn{color:#3a1f12}
#encDlg .enc-cover .dawn a{color:#3a1f12}
#encDlg .enc-crests{display:flex;gap:8px;flex-wrap:wrap}
#encDlg .enc-cover .side.r .enc-crests{justify-content:flex-end}
#encDlg .enc-crests a{display:flex;flex-direction:column;align-items:center;gap:3px;text-decoration:none;font-size:12px;font-weight:600;width:64px}
#encDlg .enc-crests img{width:44px;height:44px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));transition:transform .15s}
#encDlg .enc-crests a:hover img{transform:translateY(-2px)}
#encDlg .enc-home{padding:26px 40px 70px;max-width:1180px}
#encDlg .enc-secgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px;margin-top:14px}
#encDlg .enc-sec{display:block;padding:14px 16px;border-radius:10px;background:var(--e-card);border:1px solid var(--e-vellum2);text-decoration:none;color:var(--e-ink)}
#encDlg .enc-sec:hover{border-color:#9ea3c8}
#encDlg .enc-sec b{font-family:var(--e-serif);font-size:19px;display:block}
#encDlg .enc-sec span{font-size:13px;color:var(--e-muted)}
#encDlg .enc-sec .n{font-family:var(--e-serif);color:var(--e-gold2);font-weight:700;margin-right:6px}
#encDlg .enc-sec.soon{opacity:.7}
/* group & faction banners */
#encDlg .enc-banner{position:relative;padding:34px 40px 30px;overflow:hidden}
#encDlg .enc-banner .pat{position:absolute;inset:0;opacity:.1;background-size:56px 56px;image-rendering:pixelated;pointer-events:none}
#encDlg .enc-banner .enc-row{position:relative;display:flex;gap:26px;align-items:center;max-width:1180px}
#encDlg .enc-banner .crestbig{width:120px;height:120px;flex:none;filter:drop-shadow(0 6px 14px rgba(0,0,0,.35))}
#encDlg .enc-banner h1{font-family:var(--e-serif);font-size:52px;line-height:1;margin:0 0 6px;font-weight:700}
#encDlg .enc-banner .kind{font-size:14px;opacity:.85;margin:0 0 8px}
#encDlg .enc-banner .motto{font-family:var(--e-serif);font-style:italic;font-size:22px;margin:0}
#encDlg .enc-banner .pill{display:inline-block;margin-top:12px;font-size:12.5px;font-weight:600;padding:4px 11px;border-radius:20px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);text-decoration:none;color:inherit}
#encDlg .enc-banner .band{position:absolute;left:0;right:0;bottom:0;height:7px}
#encDlg .enc-cols{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:34px;padding:10px 40px 70px;max-width:1180px}
#encDlg .enc-side .enc-card{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:12px;padding:16px 18px;margin-bottom:16px}
#encDlg .enc-side h4{font-family:var(--e-serif);font-size:20px;margin:0 0 8px}
#encDlg .enc-side dl{display:grid;grid-template-columns:max-content 1fr;gap:5px 12px;margin:0;font-size:13.5px}
#encDlg .enc-side dt{color:var(--e-muted)}
#encDlg .enc-side dd{margin:0}
#encDlg .enc-swatches{display:flex;gap:6px;margin-top:4px}
#encDlg .enc-swatches i{width:22px;height:22px;border-radius:50%;border:1px solid rgba(0,0,0,.15)}
#encDlg .enc-members{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:12px;margin:12px 0 24px}
#encDlg .enc-member{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;padding:14px 10px 12px;border-radius:12px;background:var(--e-card);border:1px solid var(--e-vellum2);text-decoration:none;color:var(--e-ink);border-top:5px solid var(--gc,#999)}
#encDlg .enc-member:hover{box-shadow:0 6px 18px rgba(30,30,70,.12)}
#encDlg .enc-member img{width:64px;height:64px;margin-bottom:6px}
#encDlg .enc-member b{font-family:var(--e-serif);font-size:20px;line-height:1.1}
#encDlg .enc-member .role{font-size:12.5px;color:var(--e-muted);margin-top:2px}
#encDlg .enc-member .who{font-size:12px;color:var(--e-muted);margin-top:4px}
#encDlg .enc-member .crown{position:absolute;top:8px;right:10px;font-size:11px;font-weight:700;color:var(--e-gold2)}
#encDlg .enc-pairs{display:grid;gap:6px;margin:6px 0 18px;font-size:14.5px}
#encDlg .enc-pairs div{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#encDlg .enc-pairs img{width:22px;height:22px}
#encDlg .enc-pairs .k{font-size:12px;color:var(--e-muted);min-width:118px}
#encDlg .enc-person{display:flex;gap:16px;align-items:flex-start}
#encDlg .enc-person .mono{flex:none;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;font-family:var(--e-serif);font-size:26px;font-weight:700}
#encDlg .enc-results a{display:block;padding:12px 0;border-bottom:1px solid var(--e-vellum2);text-decoration:none;color:var(--e-ink)}
#encDlg .enc-results a b{font-family:var(--e-serif);font-size:19px}
#encDlg .enc-results a span{display:block;font-size:13px;color:var(--e-muted)}
@media (max-width:860px){
  #encDlg[open]{grid-template-columns:1fr;grid-template-rows:auto auto 1fr}
  #encDlg nav{max-height:none;padding:6px 8px;display:flex;overflow-x:auto;gap:4px;white-space:nowrap}
  #encDlg nav .sub,#encDlg nav .fac{display:none}
  #encDlg .enc-cols{grid-template-columns:1fr;padding:10px 16px 60px}
  #encDlg .enc-article,#encDlg .enc-home{padding:8px 16px 60px}
  #encDlg .enc-crumbs{padding:12px 16px 0}
  #encDlg .enc-banner{padding:24px 16px}
  #encDlg .enc-banner .crestbig{width:76px;height:76px}
  #encDlg .enc-banner h1{font-size:36px}
  #encDlg .enc-cover{grid-template-columns:1fr;min-height:0}
  #encDlg .enc-cover svg.tower{opacity:.25}
  #encDlg .enc-cover .ttl{position:relative;top:0;padding:24px 16px 6px;background:#2a2160}
  #encDlg .enc-cover .ttl h1{font-size:40px}
  #encDlg .enc-cover .side,#encDlg .enc-cover .side.r{padding:18px 16px;align-items:flex-start;text-align:left}
  #encDlg .enc-cover .side.r .enc-crests{justify-content:flex-start}
  #encDlg .enc-top{flex-wrap:wrap}
  #encDlg .enc-search{order:3;flex-basis:100%;max-width:none}
}
@media (prefers-reduced-motion:reduce){#encDlg *{transition:none!important}}`;
  function build(){
    if(dlg)return;
    if(!document.querySelector('link[data-enc-font]')){const l=document.createElement("link");l.rel="stylesheet";l.dataset.encFont="1";
      l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&display=swap";document.head.append(l)}
    document.head.append(E("style",{id:"encCss"},css));
    const search=E("input",{type:"search",class:"enc-search",placeholder:"Search the Encyclopedia","aria-label":"Search the Encyclopedia"});
    search.addEventListener("input",()=>{const q=search.value.trim();if(q.length>1)showSearch(q);else if(!q&&cur)ENC.go(cur,true)});
    nav=E("nav",{"aria-label":"Encyclopedia sections"});main=E("main",{tabindex:"-1"});
    dlg=E("dialog",{id:"encDlg","aria-label":"Academy Encyclopedia"},
      E("div",{class:"enc-top"},
        E("div",{class:"enc-brand",onclick:()=>ENC.go("home"),title:"Encyclopedia home"},"Everspire Academy",E("small",null,"The Academy Encyclopedia")),
        search,E("button",{type:"button",class:"enc-back",onclick:()=>ENC.back(),"aria-label":"Back"},"Back"),
        E("button",{type:"button",class:"enc-x",onclick:()=>ENC.close()},"Close")),
      nav,main);
    dlg.addEventListener("cancel",()=>{});
    document.body.append(dlg);
    renderNav();
  }
  function renderNav(){
    nav.textContent="";
    ENC.SECTIONS.forEach(s=>{
      const on=cur&&(ENC.pages[cur]||{}).sec===s.id;
      nav.append(E("a",{href:"#",class:(on?"on ":"")+(s.page?"":"soon"),onclick:ev=>{ev.preventDefault();ENC.go(s.page||"soon:"+s.id)}},E("span",{class:"n"},s.n),E("span",null,s.title,s.page?null:E("small",{style:{display:"block",fontSize:"11px",opacity:.8}},"In preparation"))));
      if(s.id==="groups"){
        (ENC.FACTIONS||[]).forEach(f=>{
          nav.append(E("div",{class:"fac"},lnk("faction:"+f.id,f.name)));
          const sub=E("div",{class:"sub"});
          f.groups.forEach(gid=>{const g=G(gid);if(g)sub.append(E("a",{href:"#",class:cur==="group:"+gid?"on":"",onclick:ev=>{ev.preventDefault();ENC.go("group:"+gid)}},crest(gid,14),E("span",null,g.name)))});
          nav.append(sub)});
        (ENC.NAV_AFTER_GROUPS||[]).forEach(x=>nav.append(E("div",{class:"fac"},lnk(x.page,x.title))))}
    });
    nav.querySelectorAll(".fac .enc-link").forEach(a=>{a.style.color="#cfc9ef"});
    /* v226: the collections (every look, every scene, the boyfriends, the Scene Archive) */
    if(ENC.COLLECTIONS&&ENC.COLLECTIONS.length){nav.append(E("div",{class:"enc-navh"},"Collections"));
      ENC.COLLECTIONS.forEach(c=>{const on=cur&&(cur===c.page||(ENC.pages[cur]||{}).sec===c.id);
        nav.append(E("a",{href:"#",class:(on?"on ":"")+"coll "+(c.cls||""),onclick:ev=>{ev.preventDefault();ENC.go(c.page)}},E("span",{class:"n"},c.mark||""),E("span",null,c.title)))})}
  }
  ENC.search=q=>{build();if(!dlg.open)dlg.showModal();const inp=dlg.querySelector(".enc-search");inp.value=q;if(!cur)ENC.go("home",true);if(String(q).trim().length>1)showSearch(String(q).trim())};
  ENC.open=(id)=>{build();if(!dlg.open)dlg.showModal();ENC.go(id||cur||"home",true)};
  ENC.close=()=>{if(dlg&&dlg.open)dlg.close()};
  ENC.back=()=>{if(hist.length>1){hist.pop();ENC.go(hist.pop(),false)}};
  ENC.go=(id,replace)=>{
    build();const p=resolve(id);if(!p){toastSoft("That page isn't written yet.");return}
    cur=p.id;if(!replace||!hist.length)hist.push(p.id);else hist[hist.length-1]=p.id;
    main.textContent="";
    if(p.crumbs&&p.crumbs.length){main.append(E("div",{class:"enc-crumbs"},lnk("home","Encyclopedia"),p.crumbs.map(c=>{const q=resolve(c);return q?[" / ",lnk(q.id,q.short||q.title)]:null}).flat()))}
    const body=E("div",{class:"enc-body"});main.append(body);
    if(p.build)p.build(body);else body.append(E("article",{class:"enc-article"},E("h1",{class:"enc-title"},p.title),blocks(p.blocks||ENC.blocks[p.id]||[])));
    main.scrollTop=0;renderNav();try{main.focus({preventScroll:true})}catch(e){}
  };
  function toastSoft(m){if(typeof toast==="function")toast(m)}
  /* pages that are made on demand: houses, groups, factions, sections not written yet */
  function resolve(id){
    if(ENC.pages[id])return ENC.pages[id];
    const i0=String(id).indexOf(":"),k=i0<0?String(id):String(id).slice(0,i0),v=i0<0?"":String(id).slice(i0+1);
    for(const f of (ENC.resolvers||[])){const p=f(k,v,id);if(p)return p}
    if(k==="house"&&ACAD.HOUSES.includes(v))return ENC.page(id,{title:HN(v),short:HN(v),sec:"groups",get crumbs(){const g=ACAD.GROUP_OF(v);const f=g&&ENC.factionOf(g.id);return ["groups"].concat(f?["faction:"+f.id]:[],g?["group:"+g.id]:[])},build:el=>ENC.buildHouse(el,v)});
    if(k==="soon"){const s=ENC.SECTIONS.find(x=>x.id===v);if(s)return ENC.page(id,{title:s.title,sec:s.id,crumbs:[],build:el=>el.append(E("article",{class:"enc-article"},E("h1",{class:"enc-title"},s.title),E("p",{class:"enc-lead"},"This chapter is in preparation."),E("p",{class:"enc-p"},s.plan||"")))})}
    return null}
  ENC.resolve=resolve;
  /* ---------- search: titles, written text, and every girl's names and summary ---------- */
  function textOf(list){return (list||[]).map(b=>b.slice(1).map(x=>Array.isArray(x)?x.flat().join(" "):String(x||"")).join(" ")).join(" ").replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,"$1")}
  function showSearch(q){
    const words=q.toLowerCase().split(/\s+/).filter(Boolean),hits=[];
    const test=(text)=>{const t=text.toLowerCase();return words.every(w=>t.includes(w))};
    Object.values(ENC.pages).forEach(p=>{if(String(p.id).startsWith("soon:")||String(p.id).startsWith("house:"))return;const t=p.title+" "+textOf(p.blocks||ENC.blocks[p.id])+" "+(p.searchText?p.searchText():"");if(test(t))hits.push([p.id,p.title,p.kind||""])});
    ACAD.HOUSES.forEach(h=>{const b=B(h),g=ACAD.GROUP_OF(h);const t=[HN(h),b.fullName,b.nickname,b.summary,b.occupation,g&&g.name].join(" ");if(test(t))hits.push(["house:"+h,HN(h)+(b.fullName?" ("+b.fullName+")":""),g?g.name:""])});
    const ql=q.toLowerCase(),rank=t=>{const x=String(t).toLowerCase();return x===ql||x.startsWith(ql+" (")?0:x.startsWith(ql)?1:x.includes(ql)?2:3};
    hits.forEach((h,i)=>h.push(i));hits.sort((a,b)=>rank(a[1])-rank(b[1])||a[3]-b[3]);
    main.textContent="";
    main.append(E("article",{class:"enc-article"},E("h1",{class:"enc-title"},`Search: ${q}`),
      hits.length?E("div",{class:"enc-results"},hits.slice(0,80).map(([id,t,k])=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},E("b",null,t),k?E("span",null,k):null))):E("p",{class:"enc-p"},"Nothing found. Try a name, a group or a place.")));
  }
  /* ---------- the studio button ---------- */
  function addButton(){
    const sb=document.getElementById("startsBtn");if(!sb||document.getElementById("encBtn"))return;
    const b=E("button",{class:"btn",id:"encBtn",type:"button",title:"Everspire Academy: the world, its groups and its girls",onclick:()=>ENC.open()},"Academy Encyclopedia");
    sb.after(b);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",addButton);else addButton();
})();

/* ---- v224: Encyclopedia content, part one. The world overview, the two factions and their deans, the Headmaster,
   all ten group pages (the main way in) and a first house page for every girl. Group, house and relationship facts are
   read live from the studio's data, so they stay in step with it; the written lore is tagged "New lore". ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.page)return;
  const E=ENC.E,HN=ENC.HN,G=ENC.G,rich=ENC.rich,lnk=ENC.lnk,tag=ENC.tagEl;
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};

  /* ---------- the hierarchy (new lore, chosen with the studio's owner) ---------- */
  ENC.FACTIONS=[
    {id:"dawn",name:"The Order of Dawn",short:"Dawn",groups:["legends","pride","frost","grove","plumes"],dean:"morrowgate",
     cols:{a:"#e9a25f",b:"#f7d39a",ink:"#3a1f12"},wing:"the Sunward Wing",sigil:"a sun rising behind the Spire",
     /* v259: the motto and line its pages always showed, now the faction's own (so its editor shows them) */
     motto:"We keep the light.",tagline:"Tradition, protection and the open hand. Wants to keep what it has."},
    {id:"dusk",name:"The Court of Dusk",short:"Dusk",groups:["coil","pack","deep","talons","hive"],dean:"vey",
     cols:{a:"#4b3586",b:"#2a2160",ink:"#f3eefe"},wing:"the Duskward Wing",sigil:"a crescent moon caught on the Spire's point",
     motto:"We keep the rest.",tagline:"Ambition, secrets and the closed fist. Wants what Dawn has."}];
  /* v249: two neutral factions that stand apart, each with a dean of its own */
  if(typeof SV249!=="undefined")SV249.factions.forEach(f=>{if(!ENC.FACTIONS.some(x=>x.id===f.id))ENC.FACTIONS.push(JSON.parse(JSON.stringify(f)))});
  /* v254: factions as the canon changes layer has them (a new faction too) */
  if(ACAD.canonApply)ACAD.canonApply("factions",ENC.FACTIONS);
  ENC.factionOf=gid=>ENC.FACTIONS.find(f=>f.groups.includes(gid));
  ACAD.FACTIONS=ENC.FACTIONS;ACAD.FACTION_OF=h=>{const g=ACAD.GROUP_OF(h);return g?ENC.factionOf(g.id):null};
  ENC.STAFF={
    vael:{name:"Cassius Vael",title:"Headmaster of Everspire Academy",
      look:"A towering, grizzled ancient with a mane of iron-white hair, a beard like frost on stone, a scar from brow to jaw and pale winter-gray eyes that make first-years forget their own names. He wears a black greatcoat older than the castle's newest wing and carries a staff of black iron that rings on the flagstones like a bell.",
      lore:["Nobody alive remembers a time before Cassius Vael. The oldest portrait in the Long Gallery, painted three hundred years ago, shows the signing of the Accord with the Headmaster standing behind the table, and the face is his. Asked about it, he says the painter flattered him.",
        "He speaks rarely and never repeats himself. He does not take sides between Dawn and Dusk; he keeps the Balance, and every dean answers to him, including the two whose factions stand apart. When the two factions go too far, the Spire's bells ring once at midnight, and by morning the matter is settled. No student has ever learned how.",
        "His study is said to be at the top of the Spire, which no one else has ever reached. He is seen most often at dawn and at dusk, walking the battlements alone, as if he were the hinge between the two."],
      quote:"Dawn without Dusk is blind. Dusk without Dawn is lost. I keep them both."},
    morrowgate:{name:"Aldous Morrowgate",title:"Dean of the Order of Dawn",
      look:"A small, stooped, very old man with a cloud of white hair, a long white beard he tucks into his belt, half-moon spectacles and kind, crinkled blue eyes. He wears robes of cream and faded gold and is never without a lantern, even at noon.",
      lore:["Aldous Morrowgate has been the Dean of Dawn for fifty-one years. He knows every Dawn student's name, birthday and favorite biscuit, and he believes, with a stubbornness that has outlasted three wars and a flood, that every girl at Everspire is worth saving, including the ones in Dusk.",
        "He teaches one class a year, on stars and stories, held on the Sunward Terrace at four in the morning so his students can watch the sun come up. Attendance is optional and always full.",
        "He and Dean Vey have played the same game of chess for sixty years, one move a week. Each believes he is winning."],
      quote:"A lantern does not argue with the dark. It simply stays lit."},
    vey:{name:"Malachar Vey",title:"Dean of the Court of Dusk",
      look:"A tall, gaunt, elegant old man with silver hair swept back from a widow's peak, a neat silver goatee, hooded violet-gray eyes and a voice like velvet over a knife. He dresses in black and plum, wears a silver ring on every finger and carries a slim cane he has never once needed.",
      lore:["Malachar Vey has been the Dean of Dusk for as long as Morrowgate has been the Dean of Dawn, and he considers this the longest stalemate in history. He believes ambition is a virtue, secrets are a currency and rules are a puzzle set by people who expected to be obeyed.",
        "He is unfailingly polite, never raises his voice and has never been caught lying, because he has never needed to: he simply lets people believe what they wish. Dusk girls adore him. Dawn girls are warned about him, and find him charming anyway.",
        "Every year he invites one Dawn girl to tea in the Duskward Gallery. Nobody knows what is said. Most of them come back thoughtful; one or two have come back changed."],
      quote:"Light shows you the path, my dear. Darkness shows you the other ones."}};

  if(typeof SV249!=="undefined"){Object.assign(ENC.STAFF,SV249.staff);
    ENC.STAFF.vael.lore=ENC.STAFF.vael.lore.concat(["Two factions answer to him and no one else: the Lattice, whose Synth hold the wards on the old well, and the Starless Court, whose Void press against them every night. What the Synth were made for is known to him alone. He has never told the Void why he lets them stay."])}
  /* ---------- the written lore for each group (history, culture, traditions, place in its faction) ---------- */
  ENC.GROUPLORE={
legends:{history:"The Legends say they are the oldest group at Everspire, and nobody has ever been able to prove otherwise. For three centuries they were only four, Griffin, Dragon, Phoenix and Unicorn, the beasts out of the oldest stories, and their four Houses kept the head table of the great dining hall as if by divine right. Then came the Great Waking: within five years six more mythic Houses woke from centuries of silence, and Kitsune, Pegasus, Kirin, Sphinx, Siren and Manticore walked up the hall to sit beside them.",
  culture:"A Legend is expected to be worth the telling. They duel, they compete, they perform, and they keep score of everything, because one day the stories will be written and they intend to be in them. Under the swagger they are fiercely protective: a Legend may mock another Legend all week, but let a Coil girl try it.",
  traditions:["The Telling: every Founders' Night, each Legend stands on the head table and tells the best thing she did that year. The worst story buys the first round.","The Banner Roll: when a Legend graduates, her name is stitched in gold thread into the oldest banner in the Champions' Hall. It is so heavy now that it takes four people to hang."],
  faction:"The Legends are the Order of Dawn's sword and crown, and they know it. The Coil has wanted their table for as long as anyone can remember."},
pride:{history:"The Pride grew up around the sunlit courtyard steps on the south side of the castle, where the old stone holds the day's warmth long after dark. For most of the Academy's history it was a loose sisterhood of big cats who happened to like the same patch of sun; Lioness turned it into a pride, with a queen, a hierarchy and a great many opinions.",
  culture:"The Pride eats together, naps together and fights together, usually in that order. Disputes are settled by staring contests, races or, in Lioness's case, a single raised eyebrow. They are proud, possessive and deeply loyal, and their principal, the Old Lion, encourages all three.",
  traditions:["The Golden Hour: at sunset the whole Pride gathers on the courtyard steps everyone calls Pride Rock, and no rival may set foot on them until the sun is down.","The Card Game: the Pride-Pack feud began in 1998 when their two principals fell out over a hand of cards. Every year on that date both groups play one hand for the steps. Nobody has ever won cleanly."],
  faction:"The Pride is Dawn's heart, warm and loud and quick to anger. Their feud with the Pack is the oldest open war between the two factions."},
pack:{history:"The Pack has met around a bonfire on the old forest trail behind the stables for longer than the trail has had a name. Centuries ago, when the Order of Dawn forbade students the forest after dark, the Pack simply walked out of the castle and kept walking, and they have been part of the Court of Dusk ever since.",
  culture:"Loyalty above everything. A Pack girl may be wild, rude, free or impossible, but she never leaves another behind, and she will follow Wolf into the woods at midnight without asking why. They answer to the Pack's own rules before anyone else's, which is exactly why Dusk suits them.",
  traditions:["The Long Run: every full moon the Pack runs the forest trail from the stables to the lake and back, howling the whole way. The faculty pretend not to hear.","The Bonfire Oath: a new Pack girl is welcomed by name at the bonfire, and every other girl says one thing she will do for her. Nobody has ever broken a bonfire promise."],
  faction:"The Pack is Dusk's wild edge. They care little for the Court's schemes, but they will fight anyone the Court points them at, especially the Pride."},
frost:{history:"The Frost began as the Academy's winter swim team, a handful of girls mad enough to break the ice on the lake every January. Over the generations the swimmers became a group, the group became a family, and the family became the warmest corner of the coldest place in the castle.",
  culture:"Discipline in the water, chaos out of it. Orca runs them like a swim team, and between drills they live on cocoa, pranks, nap piles and each other. They are the only group that hugs in public as a matter of policy.",
  traditions:["First Ice: on the night the lake freezes, the whole Frost skates under lanterns until dawn, and the first girl to fall makes the cocoa all winter.","The Polar Plunge: on Midwinter's Day the Frost cuts a hole in the ice and jumps in, one by one, cheered on by the entire Academy. The Deep always tries to do it first."],
  faction:"The Frost is Dawn's shield, cheerful and steady and very hard to move. The Deep owns the pool; the Frost keeps swimming in it."},
deep:{history:"Nobody is sure when the Deep began, which is how the Deep likes it. The aquarium wing, the oldest part of the castle below the waterline, was sealed for a century before the Deep reopened it; how they got in is still a matter for debate, and Eel has never said.",
  culture:"Secrets are currency in the Deep, and the Deep is rich. They quietly run half the Academy's clubs, know every lock and every rumor, and make their decisions in the dark of the aquarium wing where nobody can read their faces. They are calm, competitive and very, very patient.",
  traditions:["The Drowned Vote: big decisions are made underwater in the deep pool. Whoever surfaces first loses the argument.","The Glow: on the darkest night of the year, the Deep lights the aquarium wing with nothing but living light, and invites exactly one outsider to see it."],
  faction:"The Deep is Dusk's quiet power, the hand under the table. Kraken has never asked for anything she did not already have."},
talons:{history:"The Talons have kept the observatory tower since the night a raven first nested in its broken dome. Long before they had a name they were the Academy's watchers, the girls on the rooftops who saw everything that happened below and told only one another. Raven made them a network; the Great Waking made them ten.",
  culture:"Nothing at Everspire happens unseen. The Talons watch, record, steal and trade, and they value cleverness above every other virtue. They are proud, sharp-eyed and close-knit, and their thefts are less about wanting things than proving they could take them.",
  traditions:["The Taking: every new Talon must steal one thing from the Grove and return it a week later without anyone seeing either theft.","The Rooftop Watch: every night one Talon stays awake on the observatory roof until dawn. Snowy Owl takes most of the shifts, and nobody is sure she has ever slept."],
  faction:"The Talons are Dusk's eyes and ears. The Grove has been losing things to them since their first term, and Badger keeps a list."},
plumes:{history:"The Plumes were founded in the glass conservatory, the Academy's most beautiful room, by girls who believed that being looked at is an art. For centuries they have set every fashion at Everspire, thrown every party worth attending and been crashed by the Hive at most of them.",
  culture:"Be seen. A Plume dresses for every occasion, including occasions she invents, and treats the whole Academy as her audience. Under the glamour they are fiercely romantic and loyal to one another; they simply prefer to be loyal in good lighting.",
  traditions:["The Molt: at the end of every season the Plumes throw a gala at which each of them reveals a new look. Peacock judges. Peacock always wins.","The Fountain Pledge: a new Plume throws a coin into the conservatory fountain and makes a wish out loud. The Plumes then spend the year making it come true."],
  faction:"The Plumes are Dawn's face to the world, its parties, its pageants and its romance. The Hive keeps crashing them over the conservatory's flowers."},
grove:{history:"The Grove has gathered under the old oak behind the greenhouse since before the greenhouse existed. It has always been the coziest group at Everspire, the one that bakes the bread, tends the gardens and takes in strays, and it has always, mysteriously, included a thief or two.",
  culture:"Nobody leaves the Grove hungry. They are gentle, patient and generous, and they are deeply, stubbornly protective of one another and of their oak. Stag keeps the peace; Badger keeps the grudges.",
  traditions:["Rootday: for every Grove girl who graduates, the Grove plants a sapling in the Old Wood behind the oak. The Wood is very large.","The Long Nap: on the first warm afternoon of spring the whole Grove falls asleep under the oak, and the Academy has learned to walk around them."],
  faction:"The Grove is Dawn's roots, the quiet strength the rest stand on. The Talons have been stealing from them for centuries, and the Grove has been stealing back."},
coil:{history:"The Coil was a single House for most of its history: Serpent, alone in her emerald drawing room, plotting against the Legends' table. In the Great Waking the Coil grew faster than any other group, from one to ten in barely five years, and for the first time it has the numbers to match its ambitions.",
  culture:"Patience is venom. The Coil plans, waits and strikes once. They are cold-blooded with outsiders and surprisingly warm with each other, and an invitation to the emerald drawing room is the most coveted and most feared card at Everspire.",
  traditions:["The Shedding: once a year each Coil girl burns something that belonged to her old self, and keeps the ashes in a little glass vial.","The Long Game: the Coil keeps a ledger of every slight the Legends have ever paid them. It goes back four hundred years. One day, they say, it will be balanced."],
  faction:"The Coil is the Court of Dusk's oldest ambition. Their principal, the Alchemist, and the Legends' principal have hated each other for thirty years."},
hive:{history:"The Hive grew up around the Academy's old apiary and the moth-lit greenhouse loft above it. For generations it was three girls with a great deal of attitude; the Great Waking brought a queen, Bee, and with her the Hive became what it had always meant to be: an organized, buzzing, many-winged menace.",
  culture:"Many wings, one sting. The Hive is ordered around its queen, works as one and attacks as one. They are proud, clever and a little villainous, and they know it; only Firefly's good heart keeps them from going full villain, and some weeks even she is in on it.",
  traditions:["The Swarm: once a term the whole Hive descends on a single target at once. It is usually a Plumes party.","The Royal Jelly: on the queen's birthday every Hive girl brings her a gift of honey, and the queen chooses one girl to stand at her right hand for the year."],
  faction:"The Hive is the Court of Dusk's sting. Their war with the Plumes over the conservatory's flowers is the prettiest feud at Everspire."}};

  if(typeof SV249!=="undefined")Object.keys(SV249.glore).forEach(k=>{if(!ENC.GROUPLORE[k])ENC.GROUPLORE[k]=SV249.glore[k]});
  /* a group the admin added carries its own history, culture, traditions and faction paragraph (add.groups[id].glore) */
  if(ACAD.canon&&ACAD.canon.layer){const AG=(ACAD.canon.layer().add||{}).groups||{};Object.entries(AG).forEach(([g,a])=>{if(a&&a.glore&&!ENC.GROUPLORE[g])ENC.GROUPLORE[g]=JSON.parse(JSON.stringify(a.glore))})}
  /* v255: the groups' written lore, read from the data file */
  if(ACAD.canonApply)ACAD.canonApply("t.grouplore",ENC.GROUPLORE);
  /* v251: a group's traditions as the canon changes layer has them (a new group's too) */
  if(ACAD.loreKeys)ACAD.loreKeys("group.traditions.").forEach(k=>{const g=k.slice(17);ENC.GROUPLORE[g]=ENC.GROUPLORE[g]||{};ENC.GROUPLORE[g].traditions=ACAD.lore(k,ENC.GROUPLORE[g].traditions||[])});
  /* ---------- 1. World Overview ---------- */
  /* v254: the Headmaster and the deans as the canon changes layer has them */
  if(ACAD.canonApply)ACAD.canonApply("staff",ENC.STAFF);
  const WF={main:()=>(ENC.FACTIONS||[]).filter(f=>!f.apart),and:a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1]};
  /* v255: the World Overview's facts that follow the world (words the data file keeps as tokens, filled as the page is read) */
  if(ACAD.CT&&!ACAD.CT.fill255){const f0=ACAD.CT.fill;ACAD.CT.fill255=true;
    ACAD.CT.fill=t=>f0(String(t==null?"":t).replace(/\{\{(factions:count|factions:list|apart:students|apart:structure)\}\}/g,(m,k)=>{const M=WF.main(),AG=(ACAD.GROUPS||[]).filter(g=>g.apart);
      if(k==="factions:count")return M.length+" faction"+(M.length===1?"":"s");
      if(k==="factions:list")return WF.and(M.map(f=>"[[faction:"+f.id+"|"+f.name+"]]"));
      if(k==="apart:students")return ACAD.ROSTER&&ACAD.ROSTER.apart().length?"; and "+ACAD.apartWords()+", who stand apart from Dawn and Dusk":"";
      return AG.length?"; apart from them, "+ACAD.apartWords()+", with "+(ENC.FACTIONS||[]).filter(f=>f.apart).length+" factions of their own":""}))}
  /* the factions as the World Overview lists them; made again once every group has found its faction (chapters254) */
  ENC.WORLD_FLIST=()=>[...WF.main().map(f=>"[[faction:"+f.id+"|"+f.name+"]]: "+(f.groups.length?WF.and(f.groups.map(g=>{const x=(ACAD.GROUPS||[]).find(y=>y.id===g);return "[[group:"+g+"|"+(x?x.name:g).replace(/^The /,"the ")+"]]"})):"no groups yet")+"."+(ENC.STAFF&&ENC.STAFF[f.dean]?" Dean [[staff:"+f.dean+"|"+ENC.STAFF[f.dean].name+"]].":"")),"Apart from both: the [[faction:lattice|Lattice]], whose [[group:synth|Synth]] hold the wards on the old well and [[group:clockwork|Clockwork]] keep its hours, and the [[faction:starless|Starless Court]], whose [[group:void|Void]] press against them and [[group:vigil|Vigil]] keep the dark awake. Deans [[staff:thale|Octavian Thale]] and [[staff:ashgrave|Severin Ashgrave]].","Above them all: Headmaster [[staff:vael|Cassius Vael]], who keeps the Balance."];
  ENC.page("world",{title:"World Overview",sec:"world",crumbs:[],blocks:[
    ["lead","Everspire Academy stands on a crag of black stone above a cold, clear lake: a castle of a hundred towers grown, over a thousand years, around one impossible spire. It is a seat of learning for grown women and the young men their Houses have taken in, with great halls, libraries and an observatory, and it is also something older: a place of Houses and oaths and beasts out of the old stories, where the bells sometimes ring on their own.","n"],
    ["facts",[["Name","Everspire Academy"],["Motto","Ut vivant fabulae: that the stories may live"],["Founded","Unknown. The oldest charter is dated only “the Year of the First Bell.”"],["Setting","A castle on a crag above the Everlake, between the old forest, the sea cliffs and the high moor"],["Students","A Keeper for each of the {{b:houses}} Houses, and any wards their headmistresses have chosen{{apart:students}}"],["Structure","{{d:houses}} Houses, {{d:groups}} groups, {{factions:count}}, 1 Headmaster{{apart:structure}}"],["Headmaster","[[staff:vael|Cassius Vael]]"],["Factions","{{factions:list}}"]],"n"],
    ["h","The premise"],
    ["p","Everspire is a seat of learning older than most kingdoms. Its students read law and astronomy, medicine and music, the sciences of the sea and the arts of the stage, and they live as students always have in old castles: they train, duel, dance, feud, fall in love and keep secrets. Every one of them belongs to a House, named for a beast, and through her House to a group, and through her group to one of two great factions.","n"],
    ["p","There are {{n:houses}} Houses on the rolls. Each has a Keeper, the first student its headmistress chose, and for the years she is there the Keeper is simply called by her House's name: Fox, Owl, Serpent, Snowy Owl. Her friends use her real name. Everyone else uses the House.","n"],
    ["h","The Keeper and the second chair"],
    ["p","A House is never closed to a second girl. When a headmistress finds another student she cannot do without, she sets a second chair at her House's table, and the girl who takes it becomes a ward of the House. A ward wears the House's colors, sleeps under its banner and answers to its headmistress, and is known by her own name joined to the House's: Tamsin of Fox, Mira of Serpent. Some headmistresses have never set a second chair; a few, in the Academy's long history, have kept four or five wards at once. The rolls name each House's Keeper. How many wards a House keeps is its headmistress's business, and she rarely says.","n"],
    ["p","So there are three ways for a new girl to come to Everspire: as the Keeper of a House that has slept for centuries and wakes for her, as a ward of a House that is already awake, or as a guest of the Sunward or Duskward Wing, waiting for a House to choose her. A guest belongs to no group yet; everyone else was chosen by a headmistress.","n"],
    ["h","The headmistresses"],
    ["p","Every House has one headmistress, and every headmistress was once her House's Keeper. She chose the girl who keeps it now; she keeps its rooms, its rules and its secrets, teaches in the Academy's halls and answers for her House to its group's principal. In the {{n:neverslept}} Houses that never slept, she came home when her old House rang for her, a decade or so after she left, with a first career already behind her. In the {{n:woke}} that woke, she was the last Keeper before it slept, and she walked out of it the morning it woke, older by a few years and not a day more. Every headmistress is a woman in her thirties, younger than the principals and deans above her. Every one of them has a page in [[academy|The Academy]].","n"],
    ["h","The boys of the Houses"],
    ["p","A Keeper may name one young man to her House's rolls: the one she loves. He comes to Everspire as a student as she did, studies beside her, wears her House's robes and sleeps in its west rooms, and he is known by his own name joined to the House's, never by the House's alone: [[boy:orca|Kasper Andersen of Orca House]]. Every Keeper has named one. He is her partner, but he is not her shadow: each boy holds a title in his House and a place among his group's boys, and keeps his own friends, his own rivals and his own ambitions. The Academy calls them the Houses' young men; everyone else calls them the boys. They have their own pages in [[boyfriends|The Boys of the Houses]].","n"],
    ["h","The Houses, the groups and the factions"],
    ["p","Each girl belongs to one of {{n:groups}} groups of {{n:groupsize}}, and every group has a principal, an older man who runs its faculty, and a long, loud rivalry with exactly one other group. The groups are bound into two factions: the [[faction:dawn|Order of Dawn]], which keeps the Academy's traditions and protects its own, and the [[faction:dusk|Court of Dusk]], which wants, schemes and keeps secrets. Every one of the five great rivalries runs across that line.","n"],
    ["list",ENC.WORLD_FLIST(),"n"],
    ["p","The {{n:groups}} groups, their leaders, mottos and rivalries, and every girl in them, are canon from the studio's data. The two factions, their deans and the Headmaster are new.","c"],
    ["h","Who runs Everspire"],
    ["list",["The Headmaster: [[staff:vael|Cassius Vael]], ancient, grizzled and absolute.","Two deans for Dawn and Dusk, wise, very old, and each other's oldest friend and rival; and two more for the factions that stand apart, who keep to themselves.","{{N:groups}} principals, one for each group: older men who run their groups' faculties and administration.","{{N:houses}} headmistresses, one for each House: the teachers, mentors and guardians of their Houses' traditions. Each was once her House's Keeper, each chose the Keeper who sits there now, and some have chosen more.","{{N:houses}} Keepers, the girls of Everspire, and whatever wards their Houses keep beside them."],"n"],
    ["p","The principals and the headmistresses are canon; each has a look in the studio. The deans and the Headmaster are new, and so are the headmistresses' names and stories.","c"],
    ["h","What is real at Everspire"],
    ["p","Officially, nothing at Everspire is magic. The Academy teaches no spells, and its handbook says so on the first page. The dragon riders, fox spirits and sea witches students dress as are costumes, theater and festival nights, and the Houses' beasts are traditions taken very, very seriously.","n"],
    ["p","And yet. Nobody has ever reached the top of the Spire. The bells ring by themselves on equinox nights. On the morning a headmistress chooses a girl, an animal of the House's kind is waiting at her door. The observatory charts stars no other observatory can see. The Headmaster is in a portrait three hundred years old. The Academy neither confirms nor denies any of it, and the wisest students stop asking.","n"],
    ["h","Atmosphere"],
    ["p","Candlelight and banner silk. Bells marking the hours, robes sweeping the great stair, fires in every hearth and frost on the high windows. Fog on the lake at dawn, bonfires in the forest at night, the glass conservatory blazing with a ball while the observatory keeps dark and watchful above it. Everspire is grand, cozy, competitive and romantic, and it is never quite quiet.","n"],
    ["h","Themes"],
    ["list",["Belonging: every girl was chosen, and every girl is somebody's best friend, rival or secret.","Rivalry: five great feuds, one eternal struggle beneath them, endless small ones, and a great deal of flirting disguised as both.","Love: nearly every girl has a girlfriend, and the couples who keep it secret are usually hiding from a line someone drew.","Dawn and Dusk: protection against ambition, tradition against freedom, and a Headmaster who insists the Academy needs both.","Stories: the Academy's motto, and the Legends' creed. Be worth the telling."],"n"],
    ["h","Defining characteristics"],
    ["list",["A Keeper for every House, called by her House's name, room at any House's table for a ward, and a place on its rolls for the young man she loves.","{{N:groups}} groups of {{n:groupsize}}, each with a principal, a hangout, a crest, colors and a motto.","Five great rivalries, every one of them across the line between Dawn and Dusk, and one older than the Accord, between the Synth and the Void.","Best friends, nearly always inside the group; girlfriends anywhere, some of them secret, and a boyfriend for every girl, named to her House's rolls."],"n"],
    ["p","{{N:groups}} groups of {{n:groupsize}}, the mottos, hangouts, rivalries, best friends, girlfriends and the boys of the Houses are all canon.","c"]]});

  /* v254: the World Overview's blocks as the canon changes layer has them */
  {const pw=ENC.pages["world"];const bl=pw&&(pw.blocks||(ENC.blocks&&ENC.blocks.world));if(bl&&ACAD.loreInto)ACAD.loreInto("world.blocks",bl);
    ENC.LORE_DATA=Object.assign(ENC.LORE_DATA||{},{"world.blocks":()=>bl})}
  /* ---------- staff pages ---------- */
  Object.entries(ENC.STAFF).forEach(([k,s])=>{
    ENC.page("staff:"+k,{title:s.name,short:s.name,sec:k==="vael"?"world":"groups",crumbs:k==="vael"?["world"]:["groups","faction:"+((ENC.FACTIONS.find(x=>x.dean===k)||{}).id||"dusk")],
      searchText:()=>s.title+" "+s.look+" "+s.lore.join(" "),
      build:el=>{const f=k==="vael"?null:ENC.FACTIONS.find(x=>x.dean===k);
        const col=f?f.cols:{a:"#151931",b:"#2a2f4a",ink:"#efe9da"};
        el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(120deg,${col.b},${col.a})`,color:col.ink}},
          E("div",{class:"enc-row"},E("div",null,E("h1",null,s.name),E("p",{class:"kind"},s.title),E("p",{class:"motto"},"“"+s.quote+"”")))),
          E("article",{class:"enc-article"},E("p",{class:"enc-lead enc-n"},s.look,tag("n")),s.lore.map(p=>E("p",{class:"enc-p enc-n"},rich(p),tag("n")))))}})});

  /* ---------- the cover ---------- */
  const TOWER=`<svg class="tower" viewBox="0 0 400 440" aria-hidden="true"><g fill="#1b1533">
<path d="M70 440V408q44-28 90-26l10-22h60l10 22q46-2 90 26v32z"/><rect x="148" y="228" width="104" height="146"/>
<path d="M148 228v-12h10v8h12v-8h10v8h40v-8h10v8h12v-8h10v12z"/><rect x="183" y="96" width="34" height="140"/><path d="M176 98 200 6l24 92z"/>
<rect x="114" y="262" width="36" height="112"/><path d="M108 264l24-62 24 62z"/><rect x="250" y="250" width="36" height="124"/><path d="M244 252l24-66 24 66z"/>
<rect x="84" y="302" width="26" height="74"/><path d="M80 304l17-36 17 36z"/><rect x="290" y="300" width="28" height="76"/><path d="M286 302l18-40 18 40z"/></g>
<g fill="#f3c86a"><rect x="196" y="124" width="8" height="12" rx="4"/><rect x="196" y="160" width="8" height="12" rx="4"/><rect x="196" y="196" width="8" height="12" rx="4"/>
<rect x="164" y="262" width="7" height="11" rx="3.5"/><rect x="229" y="262" width="7" height="11" rx="3.5"/><rect x="196" y="300" width="8" height="14" rx="4"/>
<rect x="128" y="290" width="7" height="10" rx="3.5"/><rect x="265" y="282" width="7" height="10" rx="3.5"/></g>
<g fill="#fff"><circle cx="330" cy="40" r="1.6"/><circle cx="360" cy="90" r="1.2"/><circle cx="300" cy="120" r="1"/><circle cx="372" cy="30" r="1"/><circle cx="250" cy="60" r="1.3"/><circle cx="345" cy="160" r="1"/></g>
<circle cx="58" cy="70" r="20" fill="#fff4d6" opacity=".7"/></svg>`;
  ENC.page("home",{title:"Everspire Academy",sec:null,crumbs:[],build:el=>{
    const cover=E("section",{class:"enc-cover","aria-label":"Everspire Academy"});
    ENC.FACTIONS.filter(f=>!f.neutral).forEach((f,i)=>{
      cover.append(E("div",{class:f.id},E("div",{class:"side"+(i?" r":"")},
        E("h2",null,lnk("faction:"+f.id,f.name)),E("p",null,f.id==="dawn"?"Honor, tradition and the open hand. Those who protect.":"Ambition, secrets and the closed fist. Those who want."),
        E("div",{class:"enc-crests"},f.groups.map(g=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go("group:"+g)}},ENC.crest(g,44),E("span",null,G(g).name.replace(/^The /,"")))))))) });
    cover.insertAdjacentHTML("beforeend",TOWER);
    cover.append(E("div",{class:"ttl"},E("h1",null,"Everspire Academy"),E("p",null,"That the stories may live")));
    const secs=E("div",{class:"enc-secgrid"},ENC.SECTIONS.map(s=>E("a",{href:"#",class:"enc-sec"+(s.page?"":" soon"),onclick:ev=>{ev.preventDefault();ENC.go(s.page||"soon:"+s.id)}},
      E("b",null,E("span",{class:"n"},s.n),s.title),E("span",null,s.page?(s.id==="world"?"The Academy's premise, atmosphere and themes":s.id==="groups"?ACAD.CT.fill("The two factions, the {{n:groups}} groups and all {{n:houses}} Houses"):""):"In preparation"))));
    el.append(cover,E("div",{class:"enc-home"},
      E("p",{class:"enc-lead"},ACAD.CT.fill("{{N:houses}} Houses, {{n:groups}} groups, two factions")+(ENC.FACTIONS.some(f=>f.neutral)?", "+ACAD.apartWords()+" apart from them,":"")+" and a Headmaster older than his portraits. Start with a group: every group page leads to its girls, its rivals and its stories."),
      E("h3",{class:"enc-h"},"Chapters"),secs,
      /* v249: the factions that stand apart */
      ENC.FACTIONS.some(f=>f.neutral)?E("div",{class:"enc-apart"},E("h3",{class:"enc-h"},"Apart from Dawn and Dusk"),E("div",{class:"enc-members"},ENC.FACTIONS.filter(f=>f.neutral).map(f=>E("a",{href:"#",class:"enc-member",style:{"--gc":f.cols.b},onclick:ev=>{ev.preventDefault();ENC.go("faction:"+f.id)}},
        ENC.crest(f.groups[0],56),E("b",null,f.name),E("span",{class:"role"},f.tagline||""),E("span",{class:"who"},"“"+(f.motto||"")+"”"))))):null))}});

  /* ---------- 4. Houses and Groups: the index ---------- */
  ENC.page("groups",{title:"Houses and Groups",short:"Houses and Groups",sec:"groups",crumbs:[],build:el=>{
    const art=E("article",{class:"enc-article enc-wide"},E("h1",{class:"enc-title"},"Houses and Groups"),
      E("p",{class:"enc-lead enc-n"},"Every girl at Everspire belongs to a House, every House to a group of "+ACAD.CT.n("groupsize")+", and every group to one of "+ACAD.numWords(ENC.FACTIONS.filter(f=>!f.apart).length)+" factions"+(ENC.FACTIONS.some(f=>f.apart)?"; "+ACAD.numWords((ACAD.GROUPS||[]).filter(g=>g.apart).length)+" more groups, "+ACAD.apartWords()+", stand apart in factions of their own":"")+". The groups are where life happens: where you eat, where you sleep when you can't go home, who you fight and who you'd die for.",tag("n")));
    ENC.FACTIONS.forEach(f=>{
      art.append(E("h3",{class:"enc-h"},lnk("faction:"+f.id,f.name)));
      art.append(E("div",{class:"enc-members"},f.groups.map(gid=>{const g=G(gid),c=ENC.crestCols(gid);
        return E("a",{href:"#",class:"enc-member",style:{"--gc":c.band},onclick:ev=>{ev.preventDefault();ENC.go("group:"+gid)}},ENC.crest(gid,64),E("b",null,g.name),E("span",{class:"role"},g.kind),E("span",{class:"who"},"“"+g.motto+"”"),ACAD.formingLabel&&ACAD.formingLabel(g)?E("span",{class:"enc-forming"},ACAD.formingLabel(g)):null)})))});
    el.append(art)}});

  /* ---------- faction pages ---------- */
  const FLORE={
dawn:["The Order of Dawn is the older of the two factions, or says it is. Its five groups keep the Academy's oldest traditions, defend its weakest students and believe, on the whole, that rules exist for good reasons. Its seat is the Sunward Wing on the castle's east side, where the morning light comes in first, and its sigil is a sun rising behind the Spire.",
  "Dawn girls are not saints. The Legends are vain, the Pride is loud, the Plumes are shallow on purpose and the Grove has two of the best thieves in the castle. But when something goes wrong at Everspire, it is usually Dawn that goes to fix it.",
  "Dawn wins the Spire Cup more years than not. Dusk says this is because Dawn writes the rules the Cup is judged by."],
dusk:["The Court of Dusk is the faction of wanting. Its five groups prize ambition, cleverness, secrecy and freedom from rules they did not write, and they are not above poison, theft, blackmail or a beautifully timed betrayal to get what they want. Its seat is the Duskward Wing on the castle's west side, where the sunset lingers, and its sigil is a crescent moon caught on the Spire's point.",
  "Dusk is the Academy's villainy, and it knows it, and it is very good company. Its girls are loyal to one another in ways Dawn rarely sees, and more than a few of them are secretly in love with a girl from the other side.",
  "Every generation, Dusk tries to take something that belongs to Dawn: a table, a trophy, a tradition, a heart. Every generation, the Headmaster lets them try."]};
  if(typeof SV249!=="undefined")Object.assign(FLORE,SV249.flore);
  if(ACAD.canonApply)ACAD.canonApply("flore",FLORE);ENC.FLORE=FLORE;
  ENC.FACTIONS.forEach(f=>{
    ENC.page("faction:"+f.id,{title:f.name,short:f.name,sec:"groups",crumbs:["groups"],searchText:()=>(FLORE[f.id]||[]).join(" "),build:el=>{
      const d=ENC.STAFF[f.dean];
      el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(120deg,${f.cols.b},${f.cols.a})`,color:f.cols.ink}},
        E("div",{class:"enc-row"},E("div",null,E("h1",null,f.name),E("p",{class:"kind"},[f.wing?"Seat: "+f.wing+".":"",f.sigil?"Sigil: "+f.sigil+".":""].filter(Boolean).join(" ")),E("p",{class:"motto"},f.motto?"“"+f.motto+"”":f.id==="dawn"?"“We keep the light.”":f.id==="dusk"?"“We keep the rest.”":""),
          E("div",{class:"enc-crests",style:{marginTop:"14px"}},f.groups.map(g=>E("a",{href:"#",style:{color:f.cols.ink},onclick:ev=>{ev.preventDefault();ENC.go("group:"+g)}},ENC.crest(g,44),E("span",null,G(g).name.replace(/^The /,"")))))))));
      const art=E("div",{class:"enc-cols"});
      const mainCol=E("div",null,(FLORE[f.id]||[]).map(p=>E("p",{class:"enc-p enc-n"},rich(p),tag("n"))),
        E("h3",{class:"enc-h"},"Its groups"),
        E("div",{class:"enc-members"},f.groups.map(gid=>{const g=G(gid),c=ENC.crestCols(gid),r=G(g.rival);
          return E("a",{href:"#",class:"enc-member",style:{"--gc":c.band},onclick:ev=>{ev.preventDefault();ENC.go("group:"+gid)}},ENC.crest(gid,56),E("b",null,g.name),E("span",{class:"role"},(g.leader?"Led by "+HN(g.leader):"No leader yet")),E("span",{class:"who"},"Rivals: "+(r?r.name:"")),ACAD.formingLabel&&ACAD.formingLabel(g)?E("span",{class:"enc-forming"},ACAD.formingLabel(g)):null)})));
      const side=E("aside",{class:"enc-side"},E("div",{class:"enc-card"},E("h4",null,"The dean"),E("p",{style:{margin:"0 0 6px",fontWeight:600}},lnk("staff:"+f.dean,d.name)),E("p",{class:"enc-note",style:{margin:0}},d.look?d.look.split(". ")[0].replace(/\.$/,"")+".":""),tag("n")),
        E("div",{class:"enc-card"},E("h4",null,f.neutral?"Above the dean":"Above both deans"),E("p",{style:{margin:0}},lnk("staff:vael","Headmaster Cassius Vael"),", who keeps the Balance."),tag("n")));
      art.append(mainCol,side);el.append(art)}})});

  /* ---------- group pages: the main way in ---------- */
  const FAMNAME={legends:"Mythic beasts",pride:"Big cats",pack:"Canines",frost:"Polar",deep:"Sea",talons:"Birds of prey",plumes:"Birds of paradise",grove:"Woodland",coil:"Reptiles and amphibians",hive:"Bugs"};
  ACAD.GROUPS.forEach(g=>{
    const L=ENC.GROUPLORE[g.id]||{};
    ENC.page("group:"+g.id,{title:g.name,short:g.name,sec:"groups",get crumbs(){const f=ENC.factionOf(g.id);return ["groups"].concat(f?["faction:"+f.id]:[])},kind:"Group",
      searchText:()=>[g.kind,g.motto,g.hangout,g.lore,L.history,L.culture,(L.traditions||[]).join(" "),L.faction,g.members.map(HN).join(" ")].join(" "),
      build:el=>buildGroup(el,g,L)})});
  function buildGroup(el,g,L){
    const c=ENC.crestCols(g.id),ink=ENC.inkOn(c.field),f=ENC.factionOf(g.id),rv=G(g.rival),P=(ACAD.PRINCIPALS||{})[g.id],GX=(ACAD.GX||{})[g.id]||{};
    const pat=E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL?ACAD.crestURL(g.id):""})`}});
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 55%,${c.band} 160%)`,color:ink}},pat,
      E("div",{class:"enc-row"},ENC.crest(g.id,120)&&Object.assign(ENC.crest(g.id,120),{className:"crestbig enc-px"}),
        E("div",null,E("h1",null,g.name),E("p",{class:"kind"},(g.kind||FAMNAME[g.id])+(g.leader?". Led by "+HN(g.leader)+".":". No girls yet.")),E("p",{class:"motto"},"“"+g.motto+"”"),
          f?E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("faction:"+f.id)}},f.name):null,
          ACAD.formingLabel&&ACAD.formingLabel(g)?E("span",{class:"pill enc-forming-pill",title:`A group is established once it has ${ACAD.ESTABLISH} Houses.`},ACAD.formingLabel(g)):null)),
      E("div",{class:"band",style:{background:c.band}})));
    const mainCol=E("div");
    /* the girls first: this is the way into every house */
    mainCol.append(E("h3",{class:"enc-h"},g.members.length?(g.members.length===1?"Its one House":"The "+ACAD.numWords(g.members.length)+" Houses"):"No Houses yet"),
      g.members.length?"":E("p",{class:"enc-note"},"The first girl to join leads it."),
      E("div",{class:"enc-members"},g.members.map(h=>{const b=B(h),role=String((ACAD.GROUP_ROLE||{})[h]||"").split(".")[0];
        return E("a",{href:"#",class:"enc-member","data-house":h,style:{"--gc":c.band},onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},
          h===g.leader?E("span",{class:"crown"},"Leader"):null,ENC.pixel(h,64),E("b",null,HN(h)),E("span",{class:"role"},role),E("span",{class:"who"},b.fullName||""))})));
    mainCol.append(E("h3",{class:"enc-h"},"Who they are"),E("p",{class:"enc-p enc-c"},rich(g.lore),tag("c")));
    if(L.history)mainCol.append(E("h3",{class:"enc-h"},"History"),E("p",{class:"enc-p enc-n"},rich(L.history),tag("n")));
    if(L.culture)mainCol.append(E("h3",{class:"enc-h"},"Culture"),E("p",{class:"enc-p enc-n"},rich(L.culture),tag("n")));
    if((L.traditions||[]).length)mainCol.append(E("h3",{class:"enc-h"},"Traditions"),E("ul",{class:"enc-list enc-n"},L.traditions.map(t=>E("li",null,rich(t))),E("li",{class:"enc-list-tag"},tag("n"))));
    /* bonds inside the group, and the rivalry */
    const pairs=E("div",{class:"enc-pairs"});const seen=new Set();
    const REL=ACAD.RELDATA||{};
    g.members.forEach(h=>{(ACAD.BFOF?ACAD.BFOF(h):[]).slice(0,1).forEach(o=>{const k=[h,o].sort().join("|");if(seen.has(k)||!g.members.includes(o))return;seen.add(k);
      pairs.append(E("div",null,E("span",{class:"k"},"Best friends"),ENC.pixel(h,22),lnk("house:"+h,HN(h)),"and",ENC.pixel(o,22),lnk("house:"+o,HN(o))))})});
    (REL.SG||[]).forEach(([a,b,,,ty])=>{if(!g.members.includes(a)&&!g.members.includes(b))return;const across=!(g.members.includes(a)&&g.members.includes(b));
      const kind=ACAD.ROM?ACAD.ROM.plural(ty):"Girlfriends";pairs.append(E("div",null,E("span",{class:"k"},across?kind+", across groups":kind),ENC.pixel(a,22),lnk("house:"+a,HN(a)),"and",ENC.pixel(b,22),lnk("house:"+b,HN(b))))});
    if(pairs.childNodes.length)mainCol.append(E("h3",{class:"enc-h"},"Bonds"),E("p",{class:"enc-note"},"From the studio's relationship tables. ",tag("c")),pairs);
    /* v246: a group that names this one as its rival shows here too (the rivalry is recorded on both pages) */
    const rvs=[rv].concat(ACAD.GROUPS.filter(z=>z.rival===g.id&&z.id!==g.id&&(!rv||z.id!==rv.id))).filter(Boolean);
    rvs.forEach(rv=>{const rp=E("div",{class:"enc-pairs"});
      (REL.RV||[]).forEach(r=>{const [a,b]=r;const ia=g.members.includes(a),ib=g.members.includes(b);if(!(ia||ib))return;const x=ia?a:b,y=ia?b:a;if(!rv.members.includes(y))return;
        rp.append(E("div",null,ENC.pixel(x,22),lnk("house:"+x,HN(x)),"against",ENC.pixel(y,22),lnk("house:"+y,HN(y))))});
      const turf=ACAD.GTURF&&(ACAD.GTURF[[g.id,rv.id].sort().join("|")]);
      mainCol.append(E("h3",{class:"enc-h"},"The rivalry: ",lnk("group:"+rv.id,rv.name)),
        turf?E("p",{class:"enc-p enc-c"},"They clash "+turf+".",tag("c")):"",rp)});
    if(L.faction)mainCol.append(E("h3",{class:"enc-h"},"In the "+(f?f.short:"")+" faction"),E("p",{class:"enc-p enc-n"},rich(L.faction),tag("n")));
    /* the group's own scenes, loadable */
    const scenes=[];(ACAD.GROUP_SCENES||[]).forEach(label=>{const pg=(PRESET_GROUPS.start||[]).find(x=>x.label===label);if(!pg)return;
      pg.keys.filter(k=>k.includes(g.id)).forEach(k=>{const t=tplById(k);if(t)scenes.push([k,t.name])})});
    if(scenes.length)mainCol.append(E("h3",{class:"enc-h"},"Group scenes"),E("p",{class:"enc-note"},"Load one into the studio; the Scene prompt tab brings the lineup."),E("div",{class:"enc-loads"},scenes.map(([k,n])=>ENC.loadBtn(k,n))));
    /* side: facts and the principal */
    const sw=(GX.cols||[]).map(x=>E("i",{title:x,style:{background:x.replace(/ /g,"")}}));
    const side=E("aside",{class:"enc-side"},
      E("div",{class:"enc-card"},E("h4",null,"At a glance"),E("dl",null,
        E("dt",null,"Faction"),E("dd",null,f?lnk("faction:"+f.id,f.name):"—"),
        E("dt",null,"Leader"),E("dd",null,g.leader?lnk("house:"+g.leader,HN(g.leader)):"Nobody yet"),
        E("dt",null,"Rivals"),E("dd",null,rvs.length?rvs.map((z,i)=>[i?", ":"",lnk("group:"+z.id,z.name)]):"—"),
        E("dt",null,"Haunt"),E("dd",null,g.hangout||""),
        E("dt",null,"Crest"),E("dd",null,GX.crest||""),
        E("dt",null,"Colors"),E("dd",null,GX.words||"",E("div",{class:"enc-swatches"},E("i",{style:{background:c.field}}),E("i",{style:{background:c.band}}),E("i",{style:{background:c.mark}}))),
        E("dt",null,"Motto"),E("dd",null,g.motto)),tag("c")),
      P?E("div",{class:"enc-card"},E("h4",null,"The principal"),
        E("div",{class:"enc-person"},E("div",{class:"mono",style:{background:c.field,color:ink}},P.full[0]),
          E("div",null,E("b",null,P.full),E("div",{class:"enc-note"},P.title.replace(/^the /,"The ")),P.bio&&P.bio.age?E("div",{class:"enc-note"},"Age "+P.bio.age):null)),
        P.bio&&P.bio.summary?E("p",{style:{fontSize:"14px",lineHeight:1.55}},P.bio.summary):null,
        P.bio&&P.bio.catchphrase?E("p",{class:"enc-note"},"Says: ",P.bio.catchphrase):null,
        E("div",{class:"enc-loads"},ENC.loadBtn("principal"+g.id,"Load him")||ENC.loadBtn(g.id+"principal","Load him")),tag("c")):null);
    const cols=E("div",{class:"enc-cols"},mainCol,side);el.append(cols);
  }

  /* ---------- house pages (one per girl) ---------- */
  ENC.buildHouse=(el,h)=>{
    const b=B(h),g=ACAD.GROUP_OF(h),c=ENC.crestCols(g?g.id:""),ink=ENC.inkOn(c.field),f=g&&ENC.factionOf(g.id);
    const role=String((ACAD.GROUP_ROLE||{})[h]||"");
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 60%,${c.band} 170%)`,color:ink}},
      g?E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL?ACAD.crestURL(g.id):""})`}}):null,
      E("div",{class:"enc-row"},Object.assign(ENC.pixel(h,ACAD.portraitURL&&ACAD.portraitURL(h)?96:120)||E("span"),{className:"crestbig enc-px"}),
        E("div",null,E("h1",null,HN(h)),E("p",{class:"kind"},[b.fullName,b.nickname?"also "+b.nickname.split(",").slice(1).join(",").trim():""].filter(Boolean).join(", ")),
          role?E("p",{class:"motto"},role.split(".")[0]):null,
          g?E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("group:"+g.id)}},g.name+(f?", "+f.name:"")):null)),
      E("div",{class:"band",style:{background:c.band}})));
    const mainCol=E("div");
    if(b.summary)mainCol.append(E("p",{class:"enc-lead enc-c"},b.summary,tag("c")));
    {const rest=role.split(".").slice(1).join(".").trim(),sum=String(b.summary||"").toLowerCase(),ws=rest.toLowerCase().match(/[a-z']{4,}/g)||[];
     const seen=ws.filter(w=>sum.includes(w)).length;if(rest&&(!ws.length||seen/ws.length<0.5))mainCol.append(E("p",{class:"enc-p enc-c"},rich(rest),tag("c")));}
    if(b.backstory)mainCol.append(E("h3",{class:"enc-h"},"Before Everspire"),E("p",{class:"enc-p enc-c"},b.backstory,tag("c")));
    const rel=E("dl",{class:"enc-facts enc-c"});
    [["Best friends",b.bestFriends],[ACAD.ROM&&b.romType?ACAD.ROM.label(b.romType):"Girlfriend",b.yuriBuddy],["Flings",b.flings],["Rivals",b.rivals],["Family",b.kin],["Friends",b.friends],["Boyfriend",b.partner]].forEach(([k,v])=>{if(!v)return;
      /* v257: his name leads to his page */
      const mn=k==="Boyfriend"&&typeof tplById==="function"&&tplById(h+"man"),fn=mn&&mn.bio&&mn.bio.fullName;
      if(fn&&String(v).startsWith(fn)&&ENC.pages["boy:"+h]){rel.append(E("dt",null,k),E("dd",null,lnk("boy:"+h,fn),ENC.linkNames(String(v).slice(fn.length).replace(/^, her boyfriend/,""))));return}
      rel.append(E("dt",null,k),E("dd",null,ENC.linkNames(v)))});
    rel.append(E("div",{class:"enc-facts-tag"},tag("c")));
    mainCol.append(E("h3",{class:"enc-h"},"Her people"),rel);
    /* v261: her character, favorites and family, as the boys' and headmistresses' pages have theirs */
    {const dl=rows=>{rows=rows.filter(([,v])=>v&&String(v).trim());return rows.length?E("dl",{class:"enc-facts enc-c"},rows.map(([k,v])=>[E("dt",null,k),E("dd",null,ENC.linkNames?ENC.linkNames(String(v)):String(v))]),E("div",{class:"enc-facts-tag"},tag("c"))):null};
     const ch=dl([["Traits",b.traits],["Strengths",b.strengths],["Flaws",b.flaws],["Likes",b.likes],["Dislikes",b.dislikes],["Hobbies",b.hobbies],["Habits",b.habits],["Fears",b.fears],["Dreams",b.dreams]]);
     const fv=dl([["Colors",b.favColor],["Food",b.favFood],["Drink",b.favDrink],["Dessert",b.favDessert],["Subject",b.favSubject],["Music",b.favMusic],["Book or film",b.favBook],["Season",b.favSeason],["Flower",b.favFlower],["Animal",b.favAnimal],["Place",b.favPlace],["Scent",b.favScent]]);
     const fm=dl([["Mother",b.mother],["Father",b.father],["Siblings",b.siblings],["Family",b.family],["Pets",b.pets]]);
     if(ch)mainCol.append(E("h3",{class:"enc-h"},"Character"),ch);if(fv)mainCol.append(E("h3",{class:"enc-h"},"Favorites"),fv);if(fm)mainCol.append(E("h3",{class:"enc-h"},"Family"),fm)}
    if(b.notes)mainCol.append(E("h3",{class:"enc-h"},"Overheard"),E("p",{class:"enc-p enc-c"},ENC.linkNames(b.notes),tag("c")));
    /* looks to load straight into the studio */
    const L=[[h+"robes","House robes"],[h+"signature","Signature look"],[h+"regalia","House regalia"],[h+"gcolors","Group colors"],[(ACAD.mainLook?ACAD.mainLook(h,"head"):h+"head"),"Her headmistress"],[(ACAD.mainLook?ACAD.mainLook(h,"boy"):h+"man"),"Her partner"]];
    const loads=L.map(([id,n])=>ENC.loadBtn(id,n)).filter(Boolean);
    if(loads.length)mainCol.append(E("h3",{class:"enc-h"},"Load her"),E("div",{class:"enc-loads"},loads));
    const head=typeof tplById==="function"&&tplById(h+"head"),man=typeof tplById==="function"&&tplById(h+"man");
    /* v266: her full portrait at the top of the side column, the size of the boys' and headmistresses' (the banner keeps a round headshot) */
    const pcard=ACAD.portraitURL&&ACAD.portraitURL(h,true)?E("div",{class:"enc-card"},E("img",{src:ACAD.portraitURL(h,true),alt:"Portrait of "+(b.fullName||HN(h)),style:{width:"100%",height:"auto",borderRadius:"6px",display:"block"}})):null;
    const side=E("aside",{class:"enc-side"},pcard,
      E("div",{class:"enc-card"},E("h4",null,"House record"),E("dl",null,
        [["House",HN(h)+" House"],["Awake",ACAD.WOKE&&ACAD.WOKE[h]?"Since "+ACAD.WOKE[h]+", in the Great Waking":ACAD.NEVERSLEPT&&ACAD.NEVERSLEPT.has(h)?"Since before the Great Waking":""],["Group",g?lnk("group:"+g.id,g.name):""],["Faction",f?lnk("faction:"+f.id,f.name):""],["Age",b.age],["Studies",b.occupation],["From",b.birthplace],["Catchphrase",b.catchphrase]].filter(([,v])=>v).map(([k,v])=>[E("dt",null,k),E("dd",null,v)])),tag("c")),
      head?E("div",{class:"enc-card"},E("h4",null,"Her headmistress"),E("p",{style:{fontSize:"14px",lineHeight:1.55,margin:0}},String(head.blurb||"").replace(/ In the .* robes\.$/,"")),tag("c")):null,
      man?E("div",{class:"enc-card"},E("h4",null,"Her boyfriend"),man.bio&&man.bio.fullName?E("p",{style:{fontSize:"15px",margin:"0 0 6px",fontWeight:600}},lnk("boy:"+h,man.bio.fullName)):null,man.bio&&man.bio.title?E("p",{class:"enc-note",style:{margin:"0 0 8px"}},man.bio.title+(man.bio.occupation?", "+String(man.bio.occupation).replace(/:.*/,"").toLowerCase()+" of "+HN(h)+" House":"")+"."):null,E("p",{style:{fontSize:"14px",lineHeight:1.55,margin:0}},String(man.blurb||"").replace(/^[^:]*:\s*/,man.bio&&man.bio.fullName?"":"$&").replace(/^./,c=>c.toUpperCase())),tag(man.bio&&man.bio.fullName?"n":"c")):null);
    el.append(E("div",{class:"enc-cols"},mainCol,side));
  };
})();

/* v268: forming groups */
(function(){const st=document.createElement("style");st.textContent=".enc-forming{display:block;margin-top:4px;font-size:12px;font-weight:600;color:#8a5a00}.enc-forming-pill{margin-left:6px;background:rgba(255,255,255,.25)}";document.head.append(st)})();

/* ---- v225: the Encyclopedia's house pages carry everything a girl has. Her wardrobe (every look in the studio's own
   categories), her scenes (best friend, rival, secret girlfriend, boyfriend, close-ups) and, folded away, her explicit
   looks and scenes, titles only. Each one loads into the studio.
   Also: the faculty. Chapter 3 opens with the chain of office, a page for every principal, the headmaster and the deans as
   loadable characters, and all hundred headmistresses.
   Ownership comes from the studio's own sets: a set's ids share one affix around the House id ("griffinrobes",
   "rv1griffin"); sets without one fall back to the template's tags. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.buildHouse||typeof ACAD==="undefined"||!ACAD.CATS)return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,rich=ENC.rich,G=ENC.G;
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  const HOUSES=ACAD.HOUSES,HS=new Set(HOUSES),BYLEN=HOUSES.slice().sort((a,b)=>b.length-a.length);
  const SP=()=>PRESET_GROUPS.start||[];
  const setByLabel=l=>SP().find(g=>g.label===l);
  const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
  const dark=x=>x&&ENC.inkOn(x)!=="#17142a";
  const vis=gid=>{const c=ENC.crestCols(gid);return [c.band,c.field,c.mark].find(dark)||"#5c6080"};ENC.vis=vis;
  const low=n=>String(n||"").replace(/^The /,"the ");

  /* ---------- who owns each entry of a set ---------- */
  function owners(keys){
    const out={};if(!keys.length)return out;
    /* the affix shared by the most ids in the set ("rv1" before, "robes" after) */
    let best=null;
    const cands=new Set();keys.slice(0,6).forEach(k=>BYLEN.forEach(h=>{if(k.startsWith(h))cands.add("p|"+k.slice(h.length));if(k.endsWith(h))cands.add("s|"+k.slice(0,k.length-h.length))}));
    cands.forEach(c=>{const pre=c[0]==="p",aff=c.slice(2);const m={};let n=0;
      keys.forEach(k=>{const core=pre?(k.endsWith(aff)?k.slice(0,k.length-aff.length):null):(k.startsWith(aff)?k.slice(aff.length):null);if(core!=null&&HS.has(core)){m[k]=core;n++}});
      if(!best||n>best.n)best={n,m}});
    if(best&&best.n>=Math.max(2,keys.length*.5))Object.assign(out,best.m);
    keys.forEach(k=>{if(out[k])return;const t=T(k);const tg=t&&(t.tags||[]).find(x=>HS.has(x));
      if(tg){out[k]=tg;return}
      const p=BYLEN.find(h=>k.startsWith(h));if(p){out[k]=p;return}
      const nm=String(t&&t.name||"");const hn=BYLEN.find(h=>new RegExp("\\b"+HN(h)+"\\b").test(nm));if(hn)out[k]=hn});
    return out}
  ENC.owners=owners;

  /* a pair scene's tags name the girl it actually brings in (some best-friend sets still named an earlier friend) */
  {const fixed=[];
    (PRESET_GROUPS.start||[]).forEach(g=>{if(!/^Academy /.test(g.label))return;g.keys.forEach(k=>{const t=T(k);if(!t||!Array.isArray(t.tags)||!t.out||!t.out.pair)return;
      const id=t.out.pair.id;if(typeof id!=="string"||!/robes$/.test(id))return;const p=id.slice(0,-5);if(!HS.has(p))return;
      const hs=t.tags.filter(x=>HS.has(x));if(hs.length!==2||hs.includes(p))return;
      const own=hs.find(x=>k.includes(x))||hs[0],stale=hs.find(x=>x!==own);if(!stale||stale===p)return;
      t.tags=t.tags.map(x=>x===stale?p:x);fixed.push(k)})});
    ENC.TAGFIX=fixed}

  /* ---------- the index: every House's looks and scenes ---------- */
  const AFTER_LOOK_CATS=new Set(["Sensual","Exhibition","Explicit"]);
  const GROUP_LEVEL=new Set(["Groups","Rival groups","Faculty and boyfriends"]);
  const LOOKNAME={"Academy":"House robes","Academy Signature":"Signature look","Academy House Regalia":"House regalia","Academy Group Colors":"Group colors",
    "Academy Headmistresses":"Her headmistress","Academy Headmistress Night":"Headmistress night"};
  const explicitT=t=>{const o=(t&&t.out)||{};return !!(o.explicit||o.lewdtag)};
  let IDX=null;
  ENC.index=()=>{if(IDX)return IDX;IDX={};HOUSES.forEach(h=>IDX[h]={looks:[],scenes:[],after:[]});
    const add=(h,row)=>{if(!IDX[h])return;(row.x?IDX[h].after:IDX[h][row.kind]).push(row)};
    ACAD.CATS.forEach(([cat,labels])=>labels.forEach(l=>{const g=setByLabel(l);if(!g)return;const own=owners(g.keys);
      const per={};g.keys.forEach(k=>{const h=own[k];if(h)per[h]=(per[h]||0)+1});
      g.keys.forEach(k=>{const h=own[k],t=T(k);if(!h||!t)return;
        const name=per[h]>1?t.name:(LOOKNAME[l]||l.replace(/^Academy /,""));
        add(h,{kind:"looks",cat,label:l,k,name,x:AFTER_LOOK_CATS.has(cat)||explicitT(t)})})}));
    (ACAD.SCENE_CATS||[]).forEach(([cat,labels])=>{if(GROUP_LEVEL.has(cat))return;
      labels.forEach(l0=>{const l="Academy "+l0,g=setByLabel(l);if(!g)return;const own=owners(g.keys);
        const per={};g.keys.forEach(k=>{const h=own[k];if(h)per[h]=(per[h]||0)+1});
        g.keys.forEach(k=>{const h=own[k],t=T(k);if(!h||!t)return;
          add(h,{kind:"scenes",cat,label:l,k,name:per[h]>1?t.name:l0,x:explicitT(t)})})})});
    return IDX};

  /* ---------- small pieces ---------- */
  ENC.loadBtn=(id,label,cls)=>{const t=T(id);return t?E("button",{type:"button",class:cls||"enc-load","data-id":id,onclick:()=>ENC.load(id),title:String(t.blurb||t.name).slice(0,260)},label||t.name):null};
  const chip=(r,col)=>{const b=ENC.loadBtn(r.k,r.name,"enc-chip");if(b&&col)b.style.setProperty("--gc",col);return b};
  const byCat=rows=>{const m=new Map();rows.forEach(r=>{if(!m.has(r.cat))m.set(r.cat,[]);m.get(r.cat).push(r)});return m};
  const shelf=(title,rows,col,open,note)=>E("details",{class:"enc-shelf",open:open||null},
    E("summary",null,E("span",null,title),E("span",{class:"ct"},rows.length+(rows.length===1?" entry":" entries"))),
    note?E("p",{class:"enc-note",style:{margin:"0 14px 8px"}},note):null,
    E("div",{class:"enc-chips"},rows.map(r=>chip(r,col))));
  const pairHouse=t=>{const id=t&&t.out&&t.out.pair&&t.out.pair.id;if(typeof id!=="string")return null;const m=/^(.*?)(robes|signature|regalia|gcolors)?$/.exec(id);return m&&HS.has(m[1])?m[1]:null};
  const partnerIn=(rows,h)=>{for(const r of rows){const t=T(r.k);const o=pairHouse(t)||(t&&(t.tags||[]).find(x=>HS.has(x)&&x!==h));if(o&&o!==h)return o}return null};

  /* ---------- house pages ---------- */
  const baseHouse=ENC.buildHouse;
  ENC.buildHouse=(el,h)=>{
    baseHouse(el,h);
    const cols=el.querySelector(".enc-cols"),mainCol=cols&&cols.firstElementChild,side=cols&&cols.querySelector(".enc-side");if(!mainCol)return;
    /* the old quick row is replaced by the wardrobe */
    [...mainCol.querySelectorAll("h3.enc-h")].forEach(x=>{if(x.textContent==="Load her"){const n=x.nextElementSibling;if(n&&n.classList.contains("enc-loads"))n.remove();x.remove()}});
    const g=ACAD.GROUP_OF(h),col=vis(g?g.id:""),I=ENC.index()[h]||{looks:[],scenes:[],after:[]};
    /* her wardrobe */
    const looks=byCat(I.looks);
    mainCol.append(E("h3",{class:"enc-h",id:"wardrobe"},"Her wardrobe"),
      E("p",{class:"enc-note"},(I.looks.length===1?"One look":I.looks.length+" looks")+", in the studio's own categories. Choose one to load her wearing it. ",tag("c")));
    let first=true;looks.forEach((rows,cat)=>{mainCol.append(shelf(cat,rows,col,first));first=false});
    /* her scenes */
    const sc=byCat(I.scenes);
    if(sc.size){mainCol.append(E("h3",{class:"enc-h",id:"scenes"},"Her scenes"),
      E("p",{class:"enc-note"},"Each opens in the Scene prompt tab with the other character already in place. ",tag("c")));
      sc.forEach((rows,cat)=>{const o=partnerIn(rows,h);
        const title=cat==="Best friends"&&o?["With her best friend, ",HN(o)]:cat==="Rivals"&&o?["Against her rival, ",HN(o)]:cat==="Her boyfriend"?["With her boyfriend"]:[cat];
        mainCol.append(shelf(title.join(""),rows,col,true))})}
    /* after dark */
    if(I.after.length){const ad=byCat(I.after);
      mainCol.append(E("details",{class:"enc-afterdark"},
        E("summary",null,E("span",null,"After dark"),E("span",{class:"ct"},I.after.length+" explicit looks and scenes")),
        E("p",{class:"enc-note"},"Only their titles appear here. Each one loads into the studio like any other."),
        [...ad.entries()].map(([cat,rows])=>{const o=partnerIn(rows,h);
          return E("div",{class:"grp"},E("h5",null,cat==="Secret girlfriends"&&o?"With her secret girlfriend, "+HN(o):cat==="Rivals"&&o?"With her rival, "+HN(o):cat),E("div",{class:"enc-chips"},rows.map(r=>chip(r,col))))})))}
    /* side: load buttons on the headmistress and boyfriend cards, and her place in the chain of office */
    if(side){[...side.querySelectorAll(".enc-card")].forEach(c=>{const t=c.querySelector("h4");if(!t)return;
        if(t.textContent==="Her headmistress"){const b=ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"head"):h+"head"),"Load her headmistress");if(b)c.append(E("div",{class:"enc-loads",style:{marginTop:"10px"}},b))}
        if(t.textContent==="Her boyfriend"){const b=ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"boy"):h+"man"),"Load him");const pg=ENC.pages["boy:"+h]?E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("boy:"+h)},"Read his page"):null;if(b||pg)c.append(E("div",{class:"enc-loads",style:{marginTop:"10px"}},b,pg))}});
      const P=g&&(ACAD.PRINCIPALS||{})[g.id],f=g&&ENC.factionOf(g.id);
      side.append(E("div",{class:"enc-card"},E("h4",null,"Who she answers to"),E("ol",{class:"enc-chain"},
        E("li",null,"Her headmistress, the ",HN(h)," headmistress"),
        P?E("li",null,lnk("principal:"+g.id,P.full),", principal of ",low(g.name)):null,
        f?E("li",null,lnk("staff:"+f.dean,ENC.STAFF[f.dean].name),", dean of ",low(f.name)):null,
        E("li",null,lnk("staff:vael","Cassius Vael"),", Headmaster")),tag("n")));
      const jump=E("div",{class:"enc-card"},E("h4",null,"On this page"),E("ul",{class:"enc-jump"},
        E("li",null,E("a",{href:"#",onclick:ev=>{ev.preventDefault();const x=el.querySelector("#wardrobe");if(x)x.scrollIntoView({behavior:"smooth"})}},"Her wardrobe ("+I.looks.length+")")),
        I.scenes.length?E("li",null,E("a",{href:"#",onclick:ev=>{ev.preventDefault();const x=el.querySelector("#scenes");if(x)x.scrollIntoView({behavior:"smooth"})}},"Her scenes ("+I.scenes.length+")")):null));
      side.insertBefore(jump,side.children[1]||null)}
  };

  /* ---------- the headmaster and the deans as characters ---------- */
  const MDEF={sex:"male",age:"older man",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"clear iris detail",lashNatural:"thick, understated eyelashes",nailStyle:"short, clean natural nails",
    hairBase:"@primary",facialHairColor:"@primary",bustSize:"broad chest",bustShape:"firm pecs",bustWeight:"solid muscle",shoulderShape:"broad shoulders",torsoShape:"solid, mature torso",
    armShape:"strong arms",handShape:"large, weathered hands",waistShape:"trim waist",stomachShape:"flat stomach",hipShape:"narrow hips",buttSize:"firm butt",thighBuild:"strong thighs",
    legShape:"long legs",bodyHair:"graying chest hair",penisSize:"large",penisType:"thick",pubicHair:"trimmed graying pubic hair",penisColor:"pink",markings:"no markings",bangs:"no bangs"};
  const STAFFT={
    vael:{name:"Headmaster Cassius Vael",pal:{primary:"white",secondary:"black",third:"charcoal gray",accent:"silver",extra:"black"},
      c:{faceShape:"craggy, weathered face carved with deep lines",expression:"stern, unreadable stare",browShape:"heavy white brows",noseShape:"strong, hooked nose",mouthShape:"thin, hard-set mouth",
        impression:"an ancient, overwhelming authority",eyeShape:"hooded, piercing eyes",eyeOne:"pale gray",hairStyle:"long mane swept back from the brow",hairLength:"long",hairTexture:"coarse and wavy",
        hairMovement:"falls past his shoulders like a lion's mane",facialHair:"full, long beard",skinTone:"fair",undertone:"neutral",skinFinish:"weathered, deeply lined skin",
        heightStature:"towering, imposing stature",bodySoftness:"massive, broad-shouldered build",posture:"standing tall, both hands folded on top of an iron staff",markings:"a long scar from brow to jaw"},
      o:{outerwear:["long {c} greatcoat with a high collar and silver clasps","@secondary"],top:["high-collared {c} shirt","@third"],corset:["{c} brocade waistcoat","@secondary"],
        bottom:["tailored trousers","@extra"],legwear:["tall black riding boots","@extra"],neckAccessory:["{c} chain of office with a spire medallion","@accent"],heldItem:["staff of black iron topped with a silver spire","-"]},
      d:{top:["{c} wool sweater","@third"],outerwear:["{c} long wool coat","@secondary"],bottom:["tailored trousers","@extra"],legwear:["tall black riding boots","@extra"]},
      blurb:"The Headmaster of Everspire: a towering, grizzled ancient with a mane of iron-white hair, a long white beard, a scar from brow to jaw and pale gray eyes, in a black greatcoat with an iron staff."},
    morrowgate:{name:"Dean Aldous Morrowgate",pal:{primary:"white",secondary:"cream",third:"ivory",accent:"gold",extra:"brown"},
      c:{faceShape:"round, kindly face with deep laugh lines",expression:"warm, twinkling smile",browShape:"bushy white brows",noseShape:"soft, rounded nose",mouthShape:"gentle smile hidden in his beard",
        impression:"a kindly, wise old scholar",eyeShape:"crinkled, smiling eyes",eyeOne:"blue",hairStyle:"a soft, fluffy cloud",hairLength:"medium",hairTexture:"fine and fluffy",
        hairMovement:"floats around his head like a dandelion",facialHair:"very long beard tucked into his belt",skinTone:"fair",undertone:"warm",skinFinish:"soft, deeply lined skin",
        heightStature:"small, stooped stature",bodySoftness:"slight, stooped build",bustSize:"narrow chest",bustShape:"little muscle",bustWeight:"slight frame",torsoShape:"thin, frail torso",armShape:"thin arms",shoulderShape:"rounded shoulders",thighBuild:"thin thighs",posture:"leaning on a walking stick, holding up a lantern",bodyHair:"white chest hair",pubicHair:"white pubic hair"},
      o:{outerwear:["long {c} scholar's robe embroidered with {c2} suns","@secondary",null,"@accent"],top:["{c} linen shirt","@third"],bottom:["loose trousers","@extra"],legwear:["soft leather slippers","@extra"],
        eyewear:["half-moon spectacles","-"],neckAccessory:["{c} sun medallion","@accent"],heldItem:["brass lantern glowing warmly","-"]},
      d:{top:["{c} cardigan","@secondary"],bottom:["loose trousers","@extra"],legwear:["soft leather slippers","@extra"],eyewear:["half-moon spectacles","-"]},
      blurb:"The Dean of the Order of Dawn: a small, stooped, very old man with a cloud of white hair, a long beard tucked into his belt, half-moon spectacles and kind blue eyes, in cream and gold robes with a lantern."},
    vey:{name:"Dean Malachar Vey",pal:{primary:"silver",secondary:"black",third:"plum",accent:"silver",extra:"black"},
      c:{faceShape:"long, gaunt face with sharp cheekbones",expression:"faint, knowing smile",browShape:"arched silver brows",noseShape:"long, narrow nose",mouthShape:"thin, smiling lips",
        impression:"an elegant, dangerous charm",eyeShape:"hooded, heavy-lidded eyes",eyeOne:"violet-gray",hairStyle:"slick swept-back cut with a widow's peak",hairLength:"short",hairTexture:"sleek and straight",
        hairMovement:"lies sleek and perfectly in place",facialHair:"neat pointed goatee",skinTone:"pale",undertone:"cool",skinFinish:"smooth, finely lined skin",
        heightStature:"tall, gaunt stature",bodySoftness:"lean, elegant build",bustSize:"lean chest",bustShape:"flat pecs",bustWeight:"wiry muscle",shoulderShape:"narrow, elegant shoulders",torsoShape:"lean, mature torso",posture:"standing gracefully, one gloved hand resting on a slim cane"},
      o:{outerwear:["long {c} frock coat with {c2} lining","@secondary",null,"@third"],top:["{c} silk shirt","@third"],corset:["{c} brocade waistcoat","@secondary"],bottom:["tailored trousers","@extra"],
        legwear:["polished boots","@extra"],ringAccessory:["{c} rings on every finger","@accent"],neckAccessory:["{c} crescent-moon cravat pin","@accent"],heldItem:["slim black cane with a silver crescent head","-"]},
      d:{top:["{c} silk shirt","@third"],outerwear:["{c} velvet smoking jacket","@third"],bottom:["tailored trousers","@extra"],legwear:["polished boots","@extra"]},
      blurb:"The Dean of the Court of Dusk: a tall, gaunt, elegant old man with silver hair swept back from a widow's peak, a silver goatee and violet-gray eyes, in black and plum with silver rings and a slim cane."}};
  if(typeof SV249!=="undefined")Object.keys(SV249.deans).forEach(k=>{if(!STAFFT[k])STAFFT[k]=SV249.deans[k]});
  if(typeof START!=="undefined"&&START.add){
    const bestGroup=f=>{const a=(typeof CHAR!=="undefined"&&CHAR[f])||[],cnt={};a.forEach(([,g])=>{if(g&&g!=="Academy")cnt[g]=(cnt[g]||0)+1});return(Object.entries(cnt).sort((x,y)=>y[1]-x[1])[0]||["More"])[0]};
    const rows=[];
    Object.entries(STAFFT).forEach(([k,s])=>{const c=Object.assign({},MDEF,s.c);
      Object.entries(c).forEach(([f,v])=>{if(typeof v==="string"&&v&&v[0]!=="@")START.option(f,v,bestGroup(f))});
      [s.o,s.d].forEach(o=>Object.entries(o).forEach(([f,a])=>{if(a[0])START.item(f,a[0],"CU","preppy")}));
      rows.push({id:"staff"+k,name:s.name,blurb:s.blurb+" Off duty, or nude.",pal:Object.assign({},s.pal),c,
        outfit:{oname:k==="vael"?"Headmaster's coat":"Dean's robes",look:"preppy",items:JSON.parse(JSON.stringify(s.o)),details:{},dcol:{}},
        more:[{oname:"Off duty",look:"casual",items:JSON.parse(JSON.stringify(s.d)),details:{},dcol:{}}],nude:true,
        tags:["man","faculty","male",k==="vael"?"headmaster":"dean"],out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}})});
    START.add(null,rows);
    Object.entries(STAFFT).forEach(([k])=>{const t=T("staff"+k),s=ENC.STAFF[k];if(t&&s)t.bio={fullName:s.name,occupation:s.title,summary:s.look,notes:s.lore[0],catchphrase:"“"+s.quote+"”"}})}

  /* ---------- chapter 3: the Academy and its faculty ---------- */
  const SEC=ENC.SECTIONS.find(s=>s.id==="academy");if(SEC){SEC.page="academy";SEC.plan="The Academy's rules, lessons and an ordinary day at Everspire."}
  const mono=(name,bg,ink,size)=>E("span",{class:"enc-mono",style:{background:bg,color:ink,width:size+"px",height:size+"px",fontSize:Math.round(size*.46)+"px"}},
    name.split(/\s+/).filter(w=>/^[A-Z]/.test(w)).slice(0,2).map(w=>w[0]).join(""));
  const FX=id=>ENC.FACTIONS.find(f=>f.id===id);
  const staffCard=(id,name,role,bg,ink,col)=>E("a",{href:"#",class:"enc-staffcard",style:{"--gc":col||bg},onclick:ev=>{ev.preventDefault();ENC.go(id)}},mono(name,bg,ink,46),E("span",null,E("b",null,name),E("small",null,role)));
  ENC.page("academy",{title:"The Academy",short:"The Academy",sec:"academy",crumbs:[],
    searchText:()=>"faculty headmaster deans principals headmistresses chain of office keepers great waking "+Object.values(ACAD.PRINCIPALS||{}).map(p=>p.full).join(" "),
    build:el=>{
      const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"The Academy"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.academy","Everspire is run the way it has always been run: by a Headmaster nobody remembers being appointed, two deans who have disagreed for sixty years, two more who keep their factions apart and their counsel to themselves, a principal for every group who thinks his is the one that matters, and a headmistress for every House. Students answer up the chain; trouble rolls down it. "),tag("n")),
        E("h3",{class:"enc-h"},"The chain of office"),
        E("p",{class:"enc-p enc-c"},ACAD.CT.fill(ACAD.lore("academy.office","A headmistress for each of the {{b:houses}} Houses, a principal over each group's {{n:groupsize}} headmistresses, a dean over each faction's {{n:faction}} groups,"))+" and the Headmaster over both deans. ",tag("c")));
      const tree=E("div",{class:"enc-tree"});
      tree.append(E("div",{class:"tier t1"},staffCard("staff:vael","Cassius Vael","Headmaster of Everspire","#151931","#efe9da","#d8b25a")));
      tree.append(E("div",{class:"tier t2"},ENC.FACTIONS.map(f=>staffCard("staff:"+f.dean,ENC.STAFF[f.dean].name,"Dean of "+low(f.name),f.cols.a,f.cols.ink))));
      tree.append(E("div",{class:"tier t2"},ENC.FACTIONS.map(f=>E("div",{class:"col"},f.groups.map(gid=>{const g=G(gid),P=(ACAD.PRINCIPALS||{})[gid],c=ENC.crestCols(gid);
        return P?staffCard("principal:"+gid,P.full,cap(P.title)+", principal of "+low(g.name),c.field,ENC.inkOn(c.field),vis(gid)):null})))));
      art.append(tree,
        E("h3",{class:"enc-h"},"The headmistresses"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.heads","Every House has one headmistress, and every headmistress was once her House's Keeper. She is the House's memory and its law. She keeps its rooms, its rules, its accounts and its secrets; she sits at the head of its table; she teaches in the Academy's halls; and she answers for her House to her group's principal. Above all, she chooses. When her House needs a Keeper she goes out into the world to find her, and on the morning she does, an animal of the House's kind is waiting at the girl's door. Only she may set a second chair at her House's table, and only she may take it away."),tag("n")),
        E("p",{class:"enc-p enc-n"},(ACAD.CT?ACAD.CT.fill:String)(ACAD.lore("academy.heads2","Nobody applies for the chair. In the {{n:neverslept}} Houses that never slept, the House rings for her: a decade or so after she left Everspire, with a first career already behind her, the bell of her old House rings in her sleep, and she comes home to keep it until it rings for someone else. The {{n:woke}} Houses that woke came back with their headmistresses already inside. Each was her House's last Keeper before it slept, and on the morning it woke she walked out of its doors no more than a few years older than the day it closed, in the clothes of her own century, and took the chair as if she had only stepped out. None of them will say where they have been. The Synth and the Void keep the custom in their own way: a Synth headmistress is her unit's elder frame, made in the likeness of a woman in her thirties, who took a name and the chair when the Gallery built her again young, and a Void headmistress is her Daughter grown to womanhood on the Starless Stair, who sent her younger self up the well and followed her. Each of them, too, was her House's Keeper first. So every headmistress is a woman in her thirties, in the prime of her strength and her looks, younger than the principals and deans she answers to: the Houses choose their women at their best.")),tag("n")),
        E("p",{class:"enc-note"},"Choose a headmistress to read her page."));
      ENC.FACTIONS.forEach(f=>f.groups.forEach(gid=>{const g=G(gid),c=ENC.crestCols(gid);
        art.append(E("div",{class:"enc-hm"},E("div",{class:"gh"},ENC.crest(gid,22),lnk("group:"+gid,g.name),E("small",null,(ACAD.PRINCIPALS||{})[gid]?" under "+ACAD.PRINCIPALS[gid].full:"")),
          E("div",{class:"enc-hmgrid"},g.members.map(h=>{const hd=typeof tplById==="function"&&tplById(h+"head"),fn=hd&&hd.bio&&hd.bio.fullName;
            return E("a",{href:"#",style:{"--gc":vis(gid)},onclick:ev=>{ev.preventDefault();ENC.go(ENC.headPage&&ENC.headPage(h)||"house:"+h)}},ENC.pixel(h,32),fn?E("span",null,fn,E("small",null,HN(h)+" House")):E("span",null,"The ",HN(h)," headmistress"))}))))}));
      art.append(E("p",{class:"enc-note",style:{marginTop:"26px"}},"Still in preparation for this chapter: ",SEC?SEC.plan:""));
      el.append(art)}});

  /* ---------- the headmaster and the deans: richer pages with a load button ---------- */
  Object.entries(ENC.STAFF).forEach(([k,s])=>{
    const f=k==="vael"?null:ENC.FACTIONS.find(x=>x.dean===k);
    ENC.page("staff:"+k,{sec:"academy",crumbs:["academy"],build:el=>{
      const col=f?f.cols:{a:"#151931",b:"#2a2f4a",ink:"#efe9da"};
      el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(120deg,${col.b},${col.a})`,color:col.ink}},
        E("div",{class:"enc-row"},mono(s.name,"rgba(255,255,255,.14)",col.ink,110),
          E("div",null,E("h1",null,s.name),E("p",{class:"kind"},s.title),E("p",{class:"motto"},"“"+s.quote+"”"),
            f?E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("faction:"+f.id)}},f.name):null))));
      const mainCol=E("div",null,E("p",{class:"enc-lead enc-n"},s.look,tag("n")),E("h3",{class:"enc-h"},"What is known"),s.lore.map(p=>E("p",{class:"enc-p enc-n"},rich(p),tag("n"))));
      const under=k==="vael"?ENC.FACTIONS.map(x=>[lnk("staff:"+x.dean,ENC.STAFF[x.dean].name),", dean of ",low(x.name)])
        :f.groups.map(gid=>{const P=(ACAD.PRINCIPALS||{})[gid];return P?[lnk("principal:"+gid,P.full),", principal of ",low(G(gid).name)]:null}).filter(Boolean);
      const side=E("aside",{class:"enc-side"},
        E("div",{class:"enc-card"},E("h4",null,"In the studio"),E("p",{class:"enc-note",style:{marginTop:0}},"Loads him with his everyday clothes and off-duty clothes."),E("div",{class:"enc-loads"},ENC.loadBtn("staff"+k,"Load him"))),
        E("div",{class:"enc-card"},E("h4",null,k==="vael"?"His deans":"His principals"),E("ul",{class:"enc-jump"},under.map(x=>E("li",null,x))),
          k==="vael"?null:E("p",{class:"enc-note"},"He answers to ",lnk("staff:vael","Headmaster Vael"),"."),tag("n")));
      el.append(E("div",{class:"enc-cols"},mainCol,side))}})});

  /* ---------- the principals ---------- */
  ACAD.GROUPS.forEach(g=>{const P=(ACAD.PRINCIPALS||{})[g.id];if(!P)return;
    ENC.page("principal:"+g.id,{title:P.full,short:P.full,sec:"academy",crumbs:["academy","group:"+g.id],
      searchText:()=>{const t=T("principal"+g.id),b=(t&&t.bio)||{};return [P.title,b.summary,b.backstory,b.traits,b.likes,b.notes,"principal",g.name].join(" ")},
      build:el=>buildPrincipal(el,g,P)})});
  function buildPrincipal(el,g,P){
    const t=T("principal"+g.id),b=(t&&t.bio)||P.bio||{},c=ENC.crestCols(g.id),ink=ENC.inkOn(c.field),f=ENC.factionOf(g.id),rv=G(g.rival),rp=rv&&(ACAD.PRINCIPALS||{})[rv.id];
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 60%,${c.band} 170%)`,color:ink}},
      E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL?ACAD.crestURL(g.id):""})`}}),
      E("div",{class:"enc-row"},mono(P.full,c.band,ENC.inkOn(c.band),110),
        E("div",null,E("h1",null,P.full),E("p",{class:"kind"},cap(P.title)+", principal of "+low(g.name)+(b.nickname?". Also "+String(b.nickname).replace(/^The [A-Z]\w+;?\s*/,"").trim():"")),
          b.catchphrase?E("p",{class:"motto"},b.catchphrase):null,
          E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("group:"+g.id)}},g.name+(f?", "+f.name:"")))),
      E("div",{class:"band",style:{background:c.band}})));
    const mainCol=E("div");
    if(b.summary)mainCol.append(E("p",{class:"enc-lead enc-c"},b.summary,tag("c")));
    if(b.backstory)mainCol.append(E("h3",{class:"enc-h"},"His story"),E("p",{class:"enc-p enc-c"},ENC.linkNames(b.backstory),tag("c")));
    const ch=[["Traits",b.traits],["Strengths",b.strengths],["Flaws",b.flaws],["Likes",b.likes],["Dislikes",b.dislikes],["Hobbies",b.hobbies],["Habits",b.habits]].filter(([,v])=>v);
    if(ch.length)mainCol.append(E("h3",{class:"enc-h"},"Character"),E("dl",{class:"enc-facts enc-c"},ch.map(([k,v])=>[E("dt",null,k),E("dd",null,v)]),E("div",{class:"enc-facts-tag"},tag("c"))));
    if(b.notes)mainCol.append(E("h3",{class:"enc-h"},"Overheard"),E("p",{class:"enc-p enc-c"},ENC.linkNames(b.notes),tag("c")));
    mainCol.append(E("h3",{class:"enc-h"},"His headmistresses"),E("p",{class:"enc-note"},"The "+ACAD.numWords(g.members.length)+" women who run "+g.name.replace(/^The /,"the ")+(/s$/.test(g.name)?"' ":"'s ")+"Houses, each once her House's Keeper. Choose one to read her page. ",tag("c")),
      E("div",{class:"enc-hmlist"},g.members.map(h=>{const hd=T(h+"head");return E("div",{class:"row",style:{"--gc":vis(g.id)}},(ENC.pixelOnly||ENC.pixel)(h,40),
        E("div",null,E("b",null,hd&&hd.bio&&hd.bio.fullName&&ENC.headPage&&ENC.headPage(h)?lnk("head:"+h,hd.bio.fullName):["The ",HN(h)," headmistress"]),E("small",null,"Headmistress of "+HN(h)+" House. Her Keeper: ",lnk("house:"+h,B(h).fullName||HN(h)))),
        hd?ENC.loadBtn(h+"head","Load her"):null)})));
    if(rp)mainCol.append(E("h3",{class:"enc-h"},"His rival"),E("p",{class:"enc-p enc-c"},lnk("principal:"+rv.id,rp.full),", "+rp.title+", principal of ",lnk("group:"+rv.id,low(rv.name)),". Their girls fight over "+(ACAD.GTURF&&ACAD.GTURF[[g.id,rv.id].sort().join("|")]||"the same ground")+"; the two of them fight over everything else.",tag("c")));
    const sc=["faccouncil"+g.id,"boysnight"+g.id].map(k=>ENC.loadBtn(k)).filter(Boolean);
    if(sc.length)mainCol.append(E("h3",{class:"enc-h"},"Scenes"),E("div",{class:"enc-loads"},sc));
    const rec=[["Age",b.age],["From",b.birthplace],["Height",b.height],["Languages",b.languages],["Family",b.family],["Status",b.status],["Pets",b.pets]].filter(([,v])=>v);
    const side=E("aside",{class:"enc-side"},
      E("div",{class:"enc-card"},E("h4",null,"Faculty record"),E("dl",null,rec.map(([k,v])=>[E("dt",null,k),E("dd",null,v)])),tag("c")),
      E("div",{class:"enc-card"},E("h4",null,"In the studio"),E("p",{class:"enc-note",style:{marginTop:0}},"Loads him in his principal's robes or off-duty clothes."),E("div",{class:"enc-loads"},ENC.loadBtn("principal"+g.id,"Load him"))),
      E("div",{class:"enc-card"},E("h4",null,"He answers to"),E("ol",{class:"enc-chain"},f?E("li",null,lnk("staff:"+f.dean,ENC.STAFF[f.dean].name),", dean of ",low(f.name)):null,E("li",null,lnk("staff:vael","Cassius Vael"),", Headmaster")),tag("n")));
    el.append(E("div",{class:"enc-cols"},mainCol,side))}

  /* group pages: the principal's name leads to his page */
  ACAD.GROUPS.forEach(g=>{const p=ENC.pages["group:"+g.id];if(!p||!p.build)return;const ob=p.build;
    p.build=el=>{ob(el);const P=(ACAD.PRINCIPALS||{})[g.id];if(!P)return;
      el.querySelectorAll(".enc-side .enc-card").forEach(c=>{const h=c.querySelector("h4");if(!h||h.textContent!=="The principal")return;
        const b=c.querySelector(".enc-person b");if(b){b.textContent="";b.append(lnk("principal:"+g.id,P.full))}
        const l=c.querySelector(".enc-loads");if(l)l.append(E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("principal:"+g.id)},"Read his page"))})}});

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss225";st.textContent=`
#encDlg .enc-shelf{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:10px;margin:8px 0}
#encDlg .enc-shelf>summary,#encDlg .enc-afterdark>summary{cursor:pointer;padding:10px 14px;display:flex;justify-content:space-between;gap:12px;align-items:baseline;font-family:var(--e-serif);font-size:19px;font-weight:700;list-style:none}
#encDlg .enc-shelf>summary::-webkit-details-marker,#encDlg .enc-afterdark>summary::-webkit-details-marker{display:none}
#encDlg .enc-shelf>summary::before,#encDlg .enc-afterdark>summary::before{content:"";width:7px;height:7px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(-45deg);margin-right:4px;flex:none;align-self:center;transition:transform .15s}
#encDlg .enc-shelf[open]>summary::before,#encDlg .enc-afterdark[open]>summary::before{transform:rotate(45deg)}
#encDlg .enc-shelf>summary>span:first-of-type,#encDlg .enc-afterdark>summary>span:first-of-type{flex:1}
#encDlg .enc-shelf .ct,#encDlg .enc-afterdark .ct{font-family:var(--e-sans);font-size:12.5px;font-weight:500;color:var(--e-muted)}
#encDlg .enc-chips{display:flex;flex-wrap:wrap;gap:6px;padding:2px 14px 14px}
#encDlg .enc-chip{font:inherit;font-size:13.5px;padding:5px 11px;border-radius:7px;border:1px solid var(--e-line);border-left:4px solid var(--gc,#c9a24a);background:var(--e-vellum);color:var(--e-ink);cursor:pointer;line-height:1.3}
#encDlg .enc-chip:hover{background:var(--e-card);border-color:var(--gc,#c9a24a)}
#encDlg .enc-chip:focus-visible,#encDlg .enc-load:focus-visible{outline:2px solid var(--e-gold);outline-offset:2px}
#encDlg .enc-afterdark{margin:22px 0 8px;background:var(--e-night2);color:#e6e3f3;border-radius:10px;border:1px solid #343a6a}
#encDlg .enc-afterdark .ct,#encDlg .enc-afterdark .enc-note{color:#aaa6cc}
#encDlg .enc-afterdark .enc-note{margin:0 14px 6px}
#encDlg .enc-afterdark h5{margin:10px 14px 6px;font-size:13px;font-weight:600;color:#cfcaf0}
#encDlg .enc-afterdark .enc-chip{background:#262c52;color:#ecebf7;border-color:#3d4478;border-left-color:var(--gc,#c9a24a)}
#encDlg .enc-afterdark .enc-chip:hover{background:#2f3662}
#encDlg .enc-chain{margin:0;padding-left:20px;font-size:13.5px;line-height:1.55}
#encDlg .enc-jump{margin:0;padding-left:18px;font-size:14px;line-height:1.7}
#encDlg .enc-mono{flex:none;border-radius:50%;display:inline-grid;place-items:center;font-family:var(--e-serif);font-weight:700;letter-spacing:.02em;box-shadow:inset 0 0 0 2px rgba(255,255,255,.25)}
#encDlg .enc-article.wide{max-width:1040px}
#encDlg .enc-tree{display:grid;gap:14px;margin:14px 0 8px;position:relative}
#encDlg .enc-tree .tier{display:grid;gap:14px}
#encDlg .enc-tree .t1{grid-template-columns:minmax(0,380px);justify-content:center}
#encDlg .enc-tree .t2{grid-template-columns:1fr 1fr}
#encDlg .enc-tree .col{display:grid;gap:10px;align-content:start}
#encDlg .enc-staffcard{display:flex;gap:12px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-top:4px solid var(--gc);border-radius:10px;padding:11px 14px;text-decoration:none;color:var(--e-ink)}
#encDlg .enc-staffcard:hover{box-shadow:0 4px 14px rgba(20,22,50,.12)}
#encDlg .enc-staffcard b{display:block;font-family:var(--e-serif);font-size:19px;line-height:1.15}
#encDlg .enc-staffcard small{display:block;color:var(--e-muted);font-size:12.5px;margin-top:2px}
#encDlg .enc-hm{margin:14px 0}
#encDlg .enc-hm .gh{display:flex;gap:8px;align-items:center;font-weight:600;margin-bottom:6px}
#encDlg .enc-hm .gh small{font-weight:400;color:var(--e-muted)}
#encDlg .enc-hmgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:6px}
#encDlg .enc-hmgrid a{display:flex;gap:8px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-left:4px solid var(--gc);border-radius:7px;padding:4px 8px;font-size:13px;text-decoration:none;color:var(--e-ink)}
#encDlg .enc-hmgrid a:hover{border-color:var(--gc)}
#encDlg .enc-hmgrid a span small{display:block;font-size:11.5px;color:var(--e-muted);line-height:1.2}
#encDlg .enc-hmgrid a span{line-height:1.25}
#encDlg .enc-hmlist{display:grid;gap:8px}
#encDlg .enc-hmlist .row{display:flex;gap:12px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-left:4px solid var(--gc);border-radius:9px;padding:8px 12px}
#encDlg .enc-hmlist .row>div{flex:1}
#encDlg .enc-hmlist b{display:block;font-size:14.5px}
#encDlg .enc-hmlist small{font-size:12.5px;color:var(--e-muted)}
@media (max-width:860px){#encDlg .enc-tree .t2{grid-template-columns:1fr}}`;
  document.head.append(st);
})();

/* ---- v226: the Academy moves into the Encyclopedia. Four collections join the chapters:
     The Wardrobe      every look set (Robes to Explicit), each set a page of all hundred girls
     The Scene Book    every scene set the studio keeps, by girl or by group
     The Boyfriends    all hundred, by group, each loadable
     The Scene Archive   the scene archive (149 older sets), kept for reference, by category, set and girl
   Starting points stop listing the Academy (start226.js); everything listed there before is loadable from here. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.owners||typeof ACAD==="undefined")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,G=ENC.G;
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const HS=new Set(ACAD.HOUSES);
  const SP=()=>PRESET_GROUPS.start||[];
  const setByLabel=l=>SP().find(g=>g.label===l);
  const disp=l=>l==="Academy"?"House robes":String(l).replace(/^Academy /,"");
  const slug=l=>String(l).toLowerCase().replace(/^academy /,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"robes";
  const vis=ENC.vis||(gid=>ENC.crestCols(gid).band);
  const pairHouse=t=>{const id=t&&t.out&&t.out.pair&&t.out.pair.id;if(typeof id!=="string")return null;const m=/^(.*?)(robes|signature|regalia|gcolors|head|man)?$/.exec(id);return m&&HS.has(m[1])?m[1]:null};
  ENC.pairHouse=pairHouse;
  /* the staff characters are reached from their pages, not listed as loose starting points */
  ["vael","morrowgate","vey"].concat(Object.keys((typeof ENC!=="undefined"&&ENC.STAFF)||{})).forEach(k=>{const t=T("staff"+k);if(t)t.hidden=true});

  /* ---------- the restricted categories (the archive) ---------- */
  const RCATS=[
    ["Romance",["Romance"]],
    ["Tender moments",["Forehead Kiss","Piggyback","Princess Carry","Couch Cuddles","Shared Umbrella","Back Hug","Asleep On His Shoulder","Feeding Each Other","Holding Hands","Lazy Morning Cuddles","Couples"]],
    ["Best friends",["Pajama Dance Party","Baking Mess","Gaming Night","Face Masks","Sharing a Sundae","Makeup Swap"]],
    ["Best friends, undressed",["Tangled After the Sleepover","Spanking Game","Naked Wrestling","Shower Together","Topless Mirror Selfie","Bra Try-On","Sunscreen","Bubble Bath Together","Skinny Dipping","Naked Pillow Fight","Comparing Butts","Comparing Breasts","Boob Squeeze","Bathroom Buddies","Changing Together"]],
    ["Realistic close-ups",["Real: Portraits","Real: Cozy","Real: Lingerie","Real: Wet","Real: Nude"]],
    ["Rivals",["Rivals: Original Duels","Hate Sex","Hate Sex II"]],
    ["Lovers",["Yuri","Missionary","Cowgirl","Reverse Cowgirl","Doggystyle","Mating Press","Against The Wall","Spooning","Prone Bone","Lotus","Blowjob","Cunnilingus","Titjob","Bent Over Anal","Creampie Aftermath","Tribbing","Yuri Oral","Massage","Shower Sex","Kitchen Counter","Car Sex","Lap Dance","Sex Tape","Public Sex","Rough and Passionate","Mirror Sex","Oral Showcase","Sixty-Nine","Paizuri","Squirting","Edging","All Night","Pregnancy Sex","Impregnation"]],
    ["Wilder nights",["Threesomes","Yuri Scissoring","Yuri Strap-on","Glory Hole","Femdom","Anal","Bound and Gagged","Futa Surprise","Futa Masturbation","Futa Best Friends","Gangbang","Kink Club","Depraved","Power Plays","Strangers","Forbidden Places"]],
    ["Cheating and getting caught",["Affairs","NTR","Cheating Brides","Cheating Housewives","NTR Sisters","Not His Anymore","Guilty Cheating","Secret Affairs","Stolen Wives","Best Friend's Man","Best Friend's Man II","Caught by Her Best Friend","Caught: Broken Trust","Caught: The Worst Possible Night","Caught: It Was Never an Accident"]],
    ["Cosplay",["Cosplay Punishment: On the Clock","Cosplay Punishment: In Uniform","Cosplay Punishment: Office Hours","Depraved Cosplay: Fantasy Kingdom","Depraved Cosplay: Myths and Legends","Depraved Cosplay: Cosmic","Cosplay Baby Fever: Fertility Rites","Cosplay Baby Fever: Bedroom Schemes","Cosplay Baby Fever: Total Commitment"]],
    ["Humiliation",["Mortified","Lost the Bet","Degradation Play","Human Furniture","Free-Use Toy","Cum Receptacle","Pet Girls","Hucows","Body Writing","Self-Degradation","Bukkake","Spit","Golden Showers","Brought Low","Cuckqueen","Orgasm Denial","Kink Club Stage","Fan Page","Bimbofication","Pony Girls","Property Tattoo","Condom Trophies","Bathroom Wall","Urinal Girl","Desperation","Clearance Sale","Sploshing","Cum on Her Food","Eating off the Floor","Slave Contract","Confession Booth","Mind Break","Toothbrush Maid","Foot Servant","Panty Gag"]]];
  ACAD.RX_CATS=RCATS;
  const archived=()=>[...(ACAD.ARCHIVED||[])].filter(l=>setByLabel(l));
  function restrictedCats(){
    const A=new Set(archived()),used=new Set(),out=[];
    RCATS.forEach(([c,ls])=>{const l2=ls.map(x=>"Academy "+x).filter(l=>A.has(l));l2.forEach(l=>used.add(l));if(l2.length)out.push([c,l2])});
    const rest=[...A].filter(l=>!used.has(l));if(rest.length)out.push(["Other sets",rest]);
    return out}

  /* ---------- every set gets a page ---------- */
  ENC.SETS={};
  const lookCats=()=>(ACAD.CATS||[]).map(([c,ls])=>[c,ls.filter(l=>setByLabel(l))]);
  const sceneCats=()=>(ACAD.SCENE_CATS||[]).map(([c,ls])=>[c,ls.map(l=>"Academy "+l).filter(l=>setByLabel(l))]);
  const COLL={wardrobe:{title:"The Wardrobe",unit:"looks"},scenebook:{title:"The Scene Book",unit:"scenes"},restricted:{title:"The Scene Archive",unit:"scenes"}};
  function register(coll,cats){cats.forEach(([cat,ls])=>ls.forEach(l=>{const id="set:"+slug(l);if(ENC.SETS[id])return;
    ENC.SETS[id]={label:l,coll,cat};
    ENC.page(id,{title:disp(l),short:disp(l),sec:coll,crumbs:[coll],kind:COLL[coll].title,searchText:()=>disp(l)+" "+cat+" "+COLL[coll].title,build:el=>buildSet(el,id)})}))}
  register("wardrobe",lookCats());register("scenebook",sceneCats());register("restricted",restrictedCats());
  {const men=setByLabel("Academy Men");if(men)ENC.SETS["set:men"]={label:"Academy Men",coll:"boyfriends",cat:"Boyfriends"}}

  /* entries of a set, placed by group */
  function placed(label){
    const g=setByLabel(label);if(!g)return {byGroup:new Map(),other:[],n:0};
    const own=ENC.owners(g.keys),per={};g.keys.forEach(k=>{const h=own[k];if(h)per[h]=(per[h]||0)+1});
    const byGroup=new Map(),other=[];
    ACAD.GROUPS.forEach(x=>byGroup.set(x.id,[]));
    g.keys.forEach(k=>{const t=T(k);if(!t)return;const h=own[k];
      if(h&&HS.has(h)){const gg=ACAD.GROUP_OF(h);const p=pairHouse(t);
        const name=per[h]>1?t.name:HN(h)+(p&&p!==h?" & "+HN(p):"");
        (byGroup.get(gg?gg.id:"")||other).push({k,h,name});return}
      const gid=ACAD.GROUPS.map(x=>x.id).sort((a,b)=>b.length-a.length).find(id=>k.endsWith(id));
      if(gid){byGroup.get(gid).push({k,gid,name:G(gid).name});return}
      other.push({k,name:t.name})});
    return {byGroup,other,n:g.keys.length}}
  const chip=(r,col)=>{const b=ENC.loadBtn(r.k,null,"enc-chip enc-chip-px");if(!b)return null;b.textContent="";
    const im=r.h?ENC.pixel(r.h,18):r.gid?ENC.crest(r.gid,18):null;if(im)b.append(im);b.append(E("span",null,r.name));if(col)b.style.setProperty("--gc",col);return b};
  function buildSet(el,id){
    const S=ENC.SETS[id],C=COLL[S.coll]||{title:"",unit:"looks"},P=placed(S.label),dark=false;
    const art=E("article",{class:"enc-article wide"+(dark?" enc-dark":"")});
    art.append(E("p",{class:"enc-kicker"},S.cat),
      E("h1",{class:"enc-title"},disp(S.label)),
      E("p",{class:"enc-note"},P.n+" "+C.unit+". Choose one to load it into the studio",S.coll==="scenebook"||S.coll==="restricted"?"; scenes open in the Scene prompt tab with the other character in place.":"."));
    const sample=T((setByLabel(S.label)||{keys:[]}).keys[0]);
    if(sample&&sample.blurb&&!dark)art.append(E("p",{class:"enc-p enc-c"},"For example: ",String(sample.blurb).split(/(?<=\.)\s/)[0],tag("c")));
    ENC.FACTIONS.forEach(f=>f.groups.forEach(gid=>{const rows=P.byGroup.get(gid)||[];if(!rows.length)return;const g=G(gid);
      art.append(E("div",{class:"enc-setgrp"},E("div",{class:"gh"},ENC.crest(gid,20),lnk("group:"+gid,g.name)),E("div",{class:"enc-chips"},rows.map(r=>chip(r,vis(gid))))))}));
    if(P.other.length)art.append(E("div",{class:"enc-setgrp"},E("div",{class:"gh"},"Others"),E("div",{class:"enc-chips"},P.other.map(r=>chip(r)))));
    el.append(art)}

  /* ---------- collection pages ---------- */
  const crestRow=label=>{const P=placed(label);return E("span",{class:"crests"},ACAD.GROUPS.filter(g=>(P.byGroup.get(g.id)||[]).length).map(g=>ENC.crest(g.id,12)))};
  const setCard=(label,unit)=>{const id="set:"+slug(label),g=setByLabel(label);
    return E("a",{href:"#",class:"enc-setcard",onclick:ev=>{ev.preventDefault();ENC.go(id)}},E("b",null,disp(label)),E("small",null,(g?g.keys.length:0)+" "+unit),crestRow(label))};
  function collection(id,title,lead,cats,unit,extra){
    ENC.page(id,{title,short:title,sec:id,crumbs:[],searchText:()=>title+" "+cats().map(([c,ls])=>c+" "+ls.map(disp).join(" ")).join(" "),
      build:el=>{const dark=false;const art=E("article",{class:"enc-article wide"+(dark?" enc-dark":"")});
        if(dark)art.append(E("div",{class:"enc-gate","aria-hidden":"true"}));
        art.append(E("h1",{class:"enc-title"},title),E("p",{class:"enc-lead enc-c"},lead));
        if(extra)art.append(extra());
        cats().forEach(([c,ls])=>{if(!ls.length)return;art.append(E("h3",{class:"enc-h"},c,E("small",null,ls.length+(ls.length===1?" set":" sets"))),E("div",{class:"enc-setcards"},ls.map(l=>setCard(l,unit))))});
        el.append(art)}})}
  collection("wardrobe","The Wardrobe","Every look in the studio's Academy, set by set. Each set is a page of every girl; each girl's own page has her whole wardrobe in one place.",lookCats,"looks");
  collection("scenebook","The Scene Book","Every scene the studio keeps for the Academy: groups, rivalries, best friends, couples, the faculty, the boys and close-ups.",sceneCats,"scenes");
  collection("restricted","The Scene Archive","Older scene sets that fit any characters: tender moments, couples, best friends and the original duels. Every one loads into the studio.",restrictedCats,"scenes");

  /* a girl's own shelf in the Scene Archive (scenes she leads, and ones she is brought into) */
  const RIDX={};
  function rIndex(h){if(RIDX[h])return RIDX[h];const lead=[],guest=[];
    restrictedCats().forEach(([c,ls])=>ls.forEach(l=>{const g=setByLabel(l);if(!g)return;const own=ENC.owners(g.keys);
      g.keys.forEach(k=>{const t=T(k);if(!t)return;if(own[k]===h)lead.push({c,l,k,t});else if(pairHouse(t)===h&&own[k])guest.push({c,l,k,t,o:own[k]})})}));
    return RIDX[h]={lead,guest}}
  ENC.rIndex=rIndex;
  ENC.resolvers=ENC.resolvers||[];
  ENC.resolvers.push((k,v,id)=>{if(k!=="rshelf"||!HS.has(v))return null;
    return ENC.page(id,{title:HN(v)+" in the Scene Archive",short:HN(v),sec:"restricted",crumbs:["restricted","house:"+v],build:el=>{
      const R=rIndex(v),g=ACAD.GROUP_OF(v),col=vis(g?g.id:"");
      const art=E("article",{class:"enc-article wide"});
      art.append(E("p",{class:"enc-kicker"},lnk("restricted","The Scene Archive")),E("h1",{class:"enc-title"},ENC.pixel(v,48),HN(v)),
        E("p",{class:"enc-note"},R.lead.length+" archived scenes of her own, and "+R.guest.length+" where another girl brings her in."));
      const group=(rows,lab)=>{const m=new Map();rows.forEach(r=>{if(!m.has(r.c))m.set(r.c,[]);m.get(r.c).push(r)});
        m.forEach((rs,c)=>art.append(E("div",{class:"enc-setgrp"},E("div",{class:"gh"},c),E("div",{class:"enc-chips"},rs.map(r=>{const b=chip({k:r.k,h:r.o||null,name:disp(r.l)+(r.o?" (with "+HN(r.o)+")":"")},col);return b})))))};
      if(R.lead.length){art.append(E("h3",{class:"enc-h"},"Her archived scenes"));group(R.lead)}
      if(R.guest.length){art.append(E("h3",{class:"enc-h"},"Brought in by another girl"));group(R.guest)}
      if(!R.lead.length&&!R.guest.length)art.append(E("p",{class:"enc-p"},"She joined after the archive was closed, so she has no archived scenes. Everything of hers is on her page."));
      el.append(art)}})});

  /* ---------- the boys of the Houses (v260: was "The Boyfriends"; the page id stays "boyfriends") ---------- */
  const blurb1=t=>String(t&&t.blurb||"").split(":")[0];
  const yearOf=t=>String(t&&t.bio&&t.bio.occupation||"").replace(/:.*/,"").toLowerCase();
  ENC.page("boyfriends",{title:"The Boys of the Houses",short:"The Boys",sec:"boyfriends",crumbs:[],
    searchText:()=>"boys of the houses men boyfriends "+ACAD.HOUSES.map(h=>{const t=T(h+"man");return HN(h)+" "+blurb1(t)+" "+(t&&t.bio&&t.bio.title||"")}).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"The Boys of the Houses"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.boyfriends","Every House at Everspire has one young man on its rolls. Its Keeper names him under the Keepers' Charter of 1871, and he studies beside her, wears his House's robes and sits at its table. He is her partner, but he is his own man: each boy holds a title in his House and a place among his group's boys, and keeps his own friends, his own rivals and his own ambitions. Each has his own page: who he is, where he comes from, what he studies, what he is for in his House and who he is up against."),tag("c")),
        E("p",{class:"enc-note"},"The faculty, from the Headmaster down, are in ",lnk("academy","The Academy"),"."));
      ENC.FACTIONS.forEach(f=>f.groups.forEach(gid=>{const g=G(gid);
        art.append(E("h3",{class:"enc-h"},ENC.crest(gid,22)," ",lnk("group:"+gid,g.name)),E("div",{class:"enc-boys"},g.members.map(h=>{const t=T(h+"man");if(!t)return null;
          return E("div",{class:"boy",style:{"--gc":vis(gid)}},ENC.pixel(h,36),E("div",null,E("b",null,t.bio&&t.bio.fullName&&ENC.pages["boy:"+h]?lnk("boy:"+h,t.bio.fullName):t.name),E("small",null,(t.bio&&t.bio.title?t.bio.title+", ":"")+(yearOf(t)?yearOf(t)+" of ":"of "),lnk("house:"+h,HN(h)+" House"))),ENC.loadBtn(h+"man","Load him"))})))}));
      el.append(art)}});

  /* ---------- nav: the collections ---------- */
  ENC.COLLECTIONS=[{id:"wardrobe",title:"The Wardrobe",page:"wardrobe"},{id:"scenebook",title:"The Scene Book",page:"scenebook"},
    {id:"boyfriends",title:"The Boys of the Houses",page:"boyfriends"},{id:"restricted",title:"The Scene Archive",page:"restricted"}];

  /* ---------- group pages: their boys (v260: by name, to their pages); house pages: her shelf in the Scene Archive ---------- */
  ACAD.GROUPS.forEach(g=>{const p=ENC.pages["group:"+g.id];if(!p||!p.build)return;const ob=p.build;
    p.build=el=>{ob(el);const mainCol=el.querySelector(".enc-cols>div");if(!mainCol)return;
      const boys=g.members.map(h=>{const t=T(h+"man");if(!t||!t.bio||!t.bio.fullName)return null;const id=ENC.boyPage?ENC.boyPage(h):null;
        const b=E("button",{type:"button",class:"enc-chip enc-chip-px",title:(t.bio.title?t.bio.title+", ":"")+HN(h)+" House",onclick:()=>id?ENC.go(id):ENC.go("house:"+h)});
        const im=ENC.pixel(h,18);if(im)b.append(im);b.append(E("span",null,t.bio.fullName));b.style.setProperty("--gc",vis(g.id));return b}).filter(Boolean);
      if(boys.length)mainCol.append(E("h3",{class:"enc-h"},"Their boys"),E("p",{class:"enc-note"},"All "+(ACAD.numWords?ACAD.numWords((ACAD.HOUSES||[]).filter(x=>{const m=T(x+"man");return m&&m.bio&&m.bio.fullName}).length):"")+" boys are in ",lnk("boyfriends","The Boys of the Houses"),"."),E("div",{class:"enc-chips",style:{padding:0}},boys))}});
  const bh=ENC.buildHouse;
  /* v236: every girl gets the card, whether or not the archive was written for her (every scene in it loads with her) */
  ENC.buildHouse=(el,h)=>{bh(el,h);const side=el.querySelector(".enc-side");if(!side)return;const R=(ENC.rIndex||rIndex)(h),n=R.lead.length+R.guest.length;
    const all=ACAD.RX&&ACAD.RX.count?ACAD.RX.count().toLocaleString():"";
    const txt=n?n+(n===1?" scene":" scenes")+" on her shelf. Any scene in the archive can also be loaded with her.":"Any scene in the archive can be loaded with her.";
    side.append(E("div",{class:"enc-card enc-card-archive"},E("h4",null,"In the Scene Archive"),E("p",{style:{margin:"0 0 10px",fontSize:"14px",lineHeight:1.5}},txt),
      E("div",{class:"enc-loads"},E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("rshelf:"+h)},n?"Open her shelf":"Her shelf"),E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("restricted")},"The whole archive"))))};

  /* ---------- "Take parts": choosing a look opens the parts panel for it instead of loading all of it ---------- */
  ENC.partsMode=false;
  const load0=ENC.load;
  ENC.load=id=>{if(!ENC.partsMode||typeof spOpenParts!=="function")return load0(id);
    const t=T(id);if(!t)return load0(id);
    const g=SP().find(x=>x.keys.includes(id));
    const e={key:"t:"+id,t,name:t.name,blurb:t.blurb||"",pal:t.pal||{},group:g?g.label:"Academy",hay:""};
    Object.defineProperty(e,"c",{enumerable:true,get(){return((ACAD.peekC?ACAD.peekC(t):t.c))||{}}});
    ENC.close();const d=document.getElementById("startsDlg");if(d&&!d.open)openStarts();
    spOpenParts(e,null)};
  const addToggle=()=>{const top=document.querySelector("#encDlg .enc-top");if(!top||top.querySelector(".enc-parts"))return;
    const cb=E("input",{type:"checkbox",onchange:ev=>{ENC.partsMode=ev.target.checked;document.getElementById("encDlg").classList.toggle("parts",ENC.partsMode)}});
    const lab=E("label",{class:"enc-parts",title:"Instead of loading a whole look, pick which parts of it (hair, face, outfit, palette…) to bring into your design"},cb,E("span",null,"Take parts"));
    const back=top.querySelector(".enc-back");top.insertBefore(lab,back)};
  const open0=ENC.open;ENC.open=id=>{open0(id);addToggle()};
  const search0=ENC.search;if(search0)ENC.search=q=>{search0(q);addToggle()};

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss226";st.textContent=`
#encDlg nav a.coll .n{color:#8f89c0}
#encDlg nav a.coll.locked .n::before{content:"";display:inline-block;width:8px;height:9px;border:2px solid #b08a4a;border-radius:2px;position:relative;top:1px;box-shadow:inset 0 -3px 0 #b08a4a}
#encDlg .enc-kicker{font-size:13px;color:var(--e-muted);margin:0 0 4px}
#encDlg .enc-title img{vertical-align:middle;margin-right:12px}
#encDlg .enc-h small{font-family:var(--e-sans);font-size:12.5px;font-weight:500;color:var(--e-muted);margin-left:10px}
#encDlg .enc-setcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:8px}
#encDlg .enc-setcard{display:flex;flex-direction:column;gap:3px;background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:9px;padding:10px 12px;text-decoration:none;color:var(--e-ink)}
#encDlg .enc-setcard:hover{border-color:var(--e-gold2);box-shadow:0 3px 10px rgba(20,22,50,.08)}
#encDlg .enc-setcard b{font-family:var(--e-serif);font-size:18px;line-height:1.15}
#encDlg .enc-setcard small{color:var(--e-muted);font-size:12.5px}
#encDlg .enc-setcard .crests{display:flex;gap:3px;margin-top:4px;flex-wrap:wrap}
#encDlg .enc-setgrp{margin:14px 0}
#encDlg .enc-setgrp .gh{display:flex;gap:8px;align-items:center;font-weight:600;margin-bottom:6px}
#encDlg .enc-setgrp .enc-chips{padding:0}
#encDlg .enc-chip-px{display:inline-flex;gap:6px;align-items:center}
#encDlg .enc-chip-px img{flex:none}
#encDlg .enc-boys{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px}
#encDlg .enc-boys .boy{display:flex;gap:10px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-left:4px solid var(--gc);border-radius:9px;padding:8px 10px}
#encDlg .enc-boys .boy>div{flex:1;min-width:0}
#encDlg .enc-boys b{display:block;font-size:14px}
#encDlg .enc-boys small{display:block;color:var(--e-muted);font-size:12.5px;line-height:1.35}
#encDlg .enc-card-dark{background:#22192a!important;color:#ece4f0;border-color:#4a3550!important}
#encDlg .enc-card-dark .enc-load{background:#33263d;color:#f3e9f5;border-color:#6b4d74}
/* the Scene Archive: oxblood and brass behind an iron gate */
#encDlg .enc-body:has(.enc-dark){background:#1a1218;min-height:100%}
#encDlg .enc-dark{color:#eadfe4;position:relative}
#encDlg .enc-dark .enc-title{color:#f1e3c4}
#encDlg .enc-dark .enc-lead,#encDlg .enc-dark .enc-p{color:#e3d6dc}
#encDlg .enc-dark .enc-note,#encDlg .enc-dark .enc-kicker,#encDlg .enc-dark .enc-h small{color:#b9a4b0}
#encDlg .enc-dark .enc-h{color:#e9cf9a;border-color:#4a3044}
#encDlg .enc-dark .enc-link{color:#e9cf9a}
#encDlg .enc-dark .enc-setcard{background:#271b25;border-color:#46303f;color:#f0e4ea}
#encDlg .enc-dark .enc-setcard:hover{border-color:#b08a4a}
#encDlg .enc-dark .enc-setcard small{color:#b9a4b0}
#encDlg .enc-dark .enc-chip{background:#2a1d28;color:#f0e4ea;border-color:#4b3446;border-left-color:var(--gc,#b08a4a)}
#encDlg .enc-dark .enc-chip:hover{background:#352433}
#encDlg .enc-gate{height:64px;margin:-8px 0 18px;border-radius:10px;background:repeating-linear-gradient(90deg,transparent 0 22px,#3a2a33 22px 26px),linear-gradient(#2a1c26,#1a1218);border:1px solid #46303f;box-shadow:inset 0 -6px 0 #b08a4a33}
#encDlg .enc-notice{background:#271b25;border:1px solid #6b4d3a;border-left:4px solid #b08a4a;border-radius:9px;padding:12px 16px;margin:6px 0 10px}
#encDlg .enc-notice b{color:#e9cf9a}
#encDlg .enc-notice p{margin:4px 0 0;font-size:14px;color:#d9cbd2}
#encDlg .enc-parts{display:flex;gap:6px;align-items:center;font-size:13.5px;color:#d9d5ea;cursor:pointer;white-space:nowrap;padding:6px 10px;border:1px solid #3a4175;border-radius:8px}
#encDlg .enc-parts input{accent-color:#d8b25a}
#encDlg.parts .enc-parts{border-color:var(--e-gold);color:#fff}
#encDlg.parts .enc-chip,#encDlg.parts .enc-load[data-id]{outline:1px dashed #d8b25a;outline-offset:1px}
@media (max-width:860px){#encDlg nav .enc-navh{display:none}}`;
  document.head.append(st);
})();

/* ---- v227: three chapters. 2 Historical Foundations (a timeline from the First Bell to the Year of the Hundred, and the
   questions history leaves open), 3 The Academy (admission, the years, the handbook, a day, discipline; the faculty
   stays below), 5 Locations and Environment (an illustrated map of the crag and its country, and a page for every
   place: who haunts it, what happens there and the scenes set there, loadable). ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.SECTIONS||typeof ACAD==="undefined")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,rich=ENC.rich,G=ENC.G;
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  const vis=ENC.vis||(gid=>ENC.crestCols(gid).band);
  const low=n=>String(n||"").replace(/^The /,"the ");
  const sec=id=>ENC.SECTIONS.find(s=>s.id===id);
  const SVGNS="http://www.w3.org/2000/svg";

  /* =====================================================================================================
     2. HISTORICAL FOUNDATIONS
     ===================================================================================================== */
  const HIST=[
    {era:"Before the Academy",items:[
      {when:"Time out of mind",title:"The crag and the bell",tag:"n",text:"Before there was a castle there was a crag of black stone above a cold lake, and on still nights the fishermen of the Everlake heard a bell ringing on it where no bell hung. They called the crag the Belltop and would not land there."}]},
    {era:"The Founding",items:[
      {when:"About a thousand years ago",title:"The Year of the First Bell",tag:"n",text:"A company of scholars climbed the Belltop to find the bell and stayed. Their charter, the oldest document in the library vault, is dated only “the Year of the First Bell.” They built a hall, then a tower, then the Spire around the place the sound seemed to come from, and Everspire has been building ever since."},
      {when:"The first century",title:"The first four Houses",tag:"n",text:"The founders named their lodgings for the beasts carved over each door. The oldest four, Griffin, Dragon, Phoenix and Unicorn, took the head table of the [[place:hall|great dining hall]] and have never given it up. They are the core of [[group:legends|the Legends]] to this day."},
      {when:"The first century",title:"A Keeper for every House",tag:"n",text:"From the beginning each House was given to one student, its Keeper, chosen by its headmistress, and the Keeper answered to the House's name. On the morning of a Choosing, an animal of the House's kind is said to be waiting at the chosen girl's door. The headmistresses have never explained how they choose, or how the animals know. Every headmistress was a Keeper first: when a House needs a new headmistress, it calls one of its own old Keepers home."}]},
    {era:"The Age of Houses",items:[
      {when:"Six centuries",title:"Houses wake and sleep",tag:"n",text:"Over the centuries Houses were founded, flourished and fell quiet. A House with no student is said to be sleeping: its door stays locked and its banner is furled, but the name of its last Keeper is still read at Founders' Night. The Roll of Sleeping Houses in the library vault lists more than two hundred of them."},
      {when:"About five hundred years ago",title:"The second chair",tag:"n",text:"The Unicorn headmistress of the day could not choose between two girls, and so chose both, and set a second chair at her House's table. The Academy was scandalized for a term and then copied her. Since then any headmistress may take wards beside her Keeper: girls who wear the House's colors and are known by their own names joined to its own, Tamsin of Fox, Mira of Serpent. In the Long Quarrel some Houses kept five or six, to swell their faction's numbers; today most keep none, and some keep one or two, and the rolls do not say which."},
      {when:"About four hundred years ago",title:"The Coil begins its ledger",tag:"c",text:"Serpent's House, alone in its [[place:drawing|emerald drawing room]], began the Long Game: a ledger of every slight the Legends have ever paid the Coil. The first entry concerns a chair. One day, the Coil says, the ledger will be balanced."},
      {when:"About four hundred years ago",title:"The great rivalries settle",tag:"c",text:"By the time the ledger began, the Academy's oldest feuds had their ground: the Legends and the Coil over the head table, the Pride's courtyard steps against the Pack's forest trail, the Frost and the Deep at the water's edge, the Talons and the Grove under the old oak, the Plumes and the Hive among the conservatory's flowers."}]},
    {era:"Dawn and Dusk",items:[
      {when:"About three hundred and fifty years ago",title:"The Night Walk",tag:"n",text:"The Houses that kept the Academy's traditions forbade students the forest after dark. The Pack walked out of the castle anyway and did not come back until morning. Every House that would not be ruled by another's curfew followed them, and within a generation the Academy had split in two: the [[faction:dawn|Order of Dawn]] in the east, the [[faction:dusk|Court of Dusk]] in the west."},
      {when:"The Long Quarrel",title:"Two wings, facing",tag:"n",text:"For fifty years the factions built against each other: the [[place:sunward|Sunward Wing]] on the east side, where the morning comes in first, and the [[place:duskward|Duskward Wing]] on the west, where the sunset lingers. The [[place:gallery|Long Gallery]] between them was walled off twice and opened twice."},
      {when:"1726",title:"The Accord of the Single Bell",tag:"n",text:"On a midwinter night the Spire's bells rang once at midnight, and in the morning a tall man with an iron staff was standing in the great hall. By evening both factions had signed the Accord: Dawn keeps the light, Dusk keeps the rest, and the Headmaster keeps them both. A portrait of the signing hangs in the Long Gallery. The man in it is [[staff:vael|Cassius Vael]]."}]},
    {era:"The Modern Academy",items:[
      {when:"1871",title:"The Keepers' Charter",tag:"n",text:"For a century Keepers had smuggled their sweethearts past the gate on visiting days. In 1871 the Headmaster gave up pretending not to see, and the Charter let every Keeper name one young man to her House's rolls, to study beside her and wear its robes. The first to be named was the Unicorn Keeper's stable boy; the [[boyfriends|boys of the Houses]] have been named ever since."},
      {when:"Late nineteenth century",title:"Lecture halls",tag:"n",text:"Everspire opened its doors to the modern sciences and became a university as well as a castle of Houses. Students have studied law, medicine, astronomy and engineering in rooms built for swordplay ever since; the Houses were kept, because the Headmaster said so."},
      {when:"About a century ago",title:"The aquarium wing is sealed",tag:"c",text:"The oldest part of the castle below the waterline was closed and locked. It stayed sealed for a hundred years, until [[group:deep|the Deep]] reopened it. How they got in is still debated, and Eel has never said."},
      {when:"1966",title:"The chess game begins",tag:"n",text:"Two young teachers, Aldous Morrowgate and Malachar Vey, began a game of chess in the library, one move a week. It is still going. Each believes he is winning."},
      {when:"1975",title:"Two deans",tag:"n",text:"Morrowgate became Dean of the Order of Dawn and Vey Dean of the Court of Dusk in the same autumn. Neither has ever stepped down, and neither expects the other to."},
      {when:"1996",title:"The Sovereign",tag:"c",text:"Edmund Kingsley became principal of the Legends. He has since outlasted four principals of the Coil and intends to outlast [[principal:coil|Viktor Strand]] too."},
      {when:"1998",title:"The card game",tag:"n",text:"The principals of the Pride and the Pack fell out over a hand of cards, and the old feud between their groups caught fire again. Every year on that date both groups play one hand for the courtyard steps. Nobody has ever won cleanly."}]},
    {era:"The Great Waking",items:[
      {when:"Five years ago",title:"The first doors open",tag:"n",text:"After centuries of quiet, sleeping Houses began to wake, one after another: a banner unfurled overnight, a locked door found open, an animal waiting on a step. Within five years fifty-six Houses had woken, more than in the four centuries before. Out of each, on the morning it woke, walked the last Keeper it had before it slept, no more than a few years older than the day its door closed, and took its chair as headmistress."},
      {when:"The Waking",title:"Ten to every group",tag:"c",text:"The Legends grew from four to ten, the Coil from one House to ten, and the Hive gained a queen in [[house:bee|Bee]]. Every group now has ten Houses, a leader and a principal. Who leads, who follows and who was there first are the Academy's favorite arguments."},
      {when:"2026",title:"The Year of the Hundred",tag:"n",text:"This autumn, for the first time in the Academy's history, all hundred Houses on the rolls have a student. The Spire's bells rang on their own on the night the last door opened. This is where the Encyclopedia begins."}]}];
  const OPEN=[
    ["Who rang the first bell?","The founders' charter never says. Some say there was no bell, only the wind in the crag; some say the bell is still up there, at the top of the Spire, where nobody has ever climbed."],
    ["How old is Cassius Vael?","The portrait of the Accord is dated 1726. The Headmaster says the painter flattered him."],
    ["Why did the Houses wake now?","The headmistresses will not say. The Deep thinks it is the Spire; the Talons think it is the Headmaster; the Grove thinks it is the oak."],
    ["Where were the headmistresses?","Fifty-six women walked out of fifty-six Houses that had slept for up to three centuries, every one of them her House's last Keeper and not one of them a day older. Asked where they have been, the Grove's say 'asleep', the Coil's say 'away', and the Legends' change the subject."],
    ["What is on the Roll of Sleeping Houses?","More than two hundred names, most of them still sleeping. A House can wake at any time for the right girl. (Your own girl's House may be one of them, or she may take a second chair at a House that is already awake.)"],
    ["Who won the card game of 1998?","Both principals still claim it."]];
  /* v250: the timeline and the open questions as the canon changes layer has them */
  if(ACAD.canonApply)ACAD.canonApply("history",{hist:HIST,open:OPEN});
  HIST.forEach(e=>{e.items=e.items||[];e.items.forEach(i=>{if(!i.tag)i.tag="n"})});
  ENC.HISTORY=HIST;ENC.HISTORY_OPEN=OPEN;
  sec("history").page="history";
  ENC.page("history",{title:"Historical Foundations",short:"Historical Foundations",sec:"history",crumbs:[],
    searchText:()=>HIST.map(e=>e.era+" "+e.items.map(i=>i.when+" "+i.title+" "+i.text).join(" ")).join(" ")+" "+OPEN.map(x=>x.join(" ")).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Historical Foundations"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.history","A thousand years of Everspire, as the Academy tells it: a bell on a crag, a hundred Houses, a quarrel that split the castle in two, a Headmaster who appeared one midwinter morning, and the Great Waking that filled every House at last. Dates before the Accord are the Academy's own reckoning, and the Academy is not above flattering itself."),tag("n")));
      const tl=E("ol",{class:"enc-timeline"});
      HIST.forEach(era=>{tl.append(E("li",{class:"era"},E("h3",null,era.era)));
        era.items.forEach(i=>tl.append(E("li",{class:"ev"},E("div",{class:"when"},i.when),E("div",{class:"what"},E("h4",null,i.title),E("p",{class:"enc-p enc-"+i.tag},rich(i.text),tag(i.tag))))))});
      art.append(tl,
        E("h3",{class:"enc-h"},"What the histories leave open"),
        E("p",{class:"enc-p"},"These are left unanswered on purpose. Your stories can answer them, or never do. ",tag("n")),
        E("dl",{class:"enc-open"},OPEN.map(([q,a])=>[E("dt",null,q),E("dd",null,a)])),
        E("p",{class:"enc-note"},"Canon here means the studio's own data: the groups, their rivalries and turf, Eel and the aquarium wing, the Coil's ledger and Edmund Kingsley's thirty years. The rest is new lore, open to change."));
      el.append(art)}});

  /* =====================================================================================================
     3. THE ACADEMY: the institution (the faculty pages from v225 stay below)
     ===================================================================================================== */
  const YEARNAME={20:"Second year",21:"Third year",22:"Fourth year",23:"Fifth year",24:"Sixth year"};
  const RULES=[
    ["No student climbs the Spire.","Every student tries once. Nobody has reached the top."],
    ["A House answers for its girls, and its girls for their House.","A Keeper or a ward who shames her House loses her place at its table until her headmistress says otherwise."],
    ["Feuds are settled by contest, never by harm.","Races, duels, bake-offs, chess, the catwalk and the ice are all approved. Fists, and anything worse, are not."],
    ["Each rivalry keeps to its ground.","The five great rivalries have their turf: the dining hall, the courtyard steps and the forest trail, the pool's edge, the old oak, the conservatory; the Synth and the Void meet at the old well. A feud carried anywhere else is a matter for the principals."],
    ["The forest is open after dark to those who come back before the bells.","The Pack has never once come back before the bells."],
    ["What happens in a girl's own rooms is her own business.","The handbook says this in one line. The Academy's secret couples are very grateful for it."],
    ["When the bells ring once at midnight, the matter is closed.","Nobody, Dawn or Dusk, has ever reopened one."]];
  const DAY=[
    ["4:00","The Sunward Terrace","Dean Morrowgate's dawn class on stars and stories. Optional, and always full."],
    ["7:30","The great dining hall","Breakfast, and the first skirmish of the day over the Legends' table."],
    ["9:00","The lecture theaters","Law, marine biology, choreography, astronomy, pastry arts: Everspire is a seat of learning first, whatever the Houses say."],
    ["13:00","The courtyards","Lunch in the sun. The Pride takes the steps; everyone else takes the hint."],
    ["15:00","Fields, pool and studios","Practice. The swim teams share the pool badly; the sprinters race anyone who will run."],
    ["Sunset","Pride Rock and the conservatory","Golden Hour on the courtyard steps; drinks and gossip among the Plumes' flowers."],
    ["19:30","The great dining hall","Dinner, announcements and the evening's challenges, issued across the hall."],
    ["22:00","The library after hours","Study, scheming and a great deal of what is not studying in the stacks."],
    ["Midnight","Everywhere at once","The Pack's bonfire in the forest, the Talons' watch on the observatory roof, the Deep's lights in the aquarium wing, and sometimes, the bells."]];
  /* v255: the handbook and the day, read from the data file */
  if(ACAD.loreInto){ACAD.loreInto("academy.rules",RULES);ACAD.loreInto("academy.day",DAY)}
  function yearsGrid(){
    /* v250b: no ages on the page; a girl whose age is outside the five years is listed with the others */
    const by={};(ACAD.ROSTER&&ACAD.ROSTER.academy?ACAD.ROSTER.academy():ACAD.HOUSES).forEach(h=>{const a=+B(h).age;const k=YEARNAME[a]?a:"x";(by[k]=by[k]||[]).push(h)});
    const keys=Object.keys(YEARNAME).concat(by.x?["x"]:[]),NAME=a=>a==="x"?"Other students":YEARNAME[a];
    return E("div",{class:"enc-years"},keys.map(a=>E("div",{class:"yr"},E("div",{class:"yh"},E("b",null,NAME(a)),E("small",null,(by[a]||[]).length+" girls")),
      E("div",{class:"heads"},(by[a]||[]).map(h=>E("a",{href:"#",title:HN(h)+": "+String(B(h).occupation||"").replace(/^[^:]*:\s*/,""),onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},ENC.pixel(h,28)))))))}
  function studies(){
    const m=new Map();ACAD.HOUSES.forEach(h=>{const o=String(B(h).occupation||"").replace(/^[^:]*:\s*/,"").split(/;|, and /)[0].trim();if(!o)return;
      o.split(/ and |, /).map(x=>x.trim()).filter(x=>x&&x.length<40&&!/team|captain|star|champion/.test(x)).forEach(x=>{const k=x.toLowerCase();if(!m.has(k))m.set(k,[]);m.get(k).push(h)})});
    return [...m.entries()].sort((a,b)=>b[1].length-a[1].length||a[0].localeCompare(b[0]))}
  const SEC3=sec("academy");if(SEC3)SEC3.plan="";
  {const p=ENC.pages["academy"];if(p&&p.build){const ob=p.build,os=p.searchText;
    p.searchText=()=>(os?os():"")+" admission choosing candidate years handbook rules day discipline bells "+RULES.map(r=>r.join(" ")).join(" ")+" "+DAY.map(d=>d.join(" ")).join(" ");
    p.build=el=>{ob(el);const art=el.querySelector(".enc-article");if(!art)return;
      const anchor=[...art.querySelectorAll("h3.enc-h")].find(h=>h.textContent==="The chain of office");
      [...art.querySelectorAll(".enc-note")].forEach(n=>{if(/Still in preparation/.test(n.textContent))n.remove()});
      const S=studies();
      const add=[
        E("h3",{class:"enc-h"},"Admission: the Choosing"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.choosing","Nobody applies to a House. A young woman comes to Everspire as a candidate, spends her first year in the candidates' lodgings of the town below the crag, and waits. If a House chooses her, its headmistress finds her, usually on her twentieth birthday and always without warning, and she wakes to find an animal of the House's kind at her door. From that morning she is on the House rolls and answers to its name."),tag("n")),
        E("h3",{class:"enc-h"},"The second chair"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.secondchair","A House already kept can still choose. A headmistress who finds another girl she cannot do without sets a second chair at her House's table, and the girl becomes a ward of the House: she wears its colors, keeps its traditions, sleeps under its banner and is known by her own name joined to the House's, Tamsin of Fox, Mira of Serpent. The Keeper keeps the House's name and its first place; a ward is in every other way the House's own. No House is ever full, and no headmistress has to explain herself."),tag("n")),
        E("h3",{class:"enc-h"},"The boys of the Houses"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.boys","Since the Keepers' Charter of 1871, a Keeper may name one young man to her House's rolls. He sits the same examinations as any candidate, takes the same five years, reads his own subject and wears her House's robes; he answers to her headmistress like any ward, and he is known by his own name joined to the House's: Kasper Andersen of Orca House. A boy never chooses and is never chosen; he is named. What he makes of it is his own: each of the boys holds a title among his group's young men, the Lead, the Diver, the Card Sharp, and keeps his own friends, rivals and ambitions, and more than one has left a mark on the Academy that has nothing to do with whose rolls he is on."),tag("n")),
        E("h3",{class:"enc-h"},"The five years"),
        E("p",{class:"enc-note"},"Every girl, by year. Hover for what she studies; choose one to open her page. ",tag("c")),
        yearsGrid(),
        E("h3",{class:"enc-h"},"What they study"),
        E("p",{class:"enc-p enc-c"},ACAD.lore("academy.study","Everspire is a seat of learning first. Its girls read subjects as ordinary as economics and as odd as forensic anthropology, and most of them also captain, coach or star in something. "),tag("c")),
        E("div",{class:"enc-studies"},S.slice(0,48).map(([k,hs])=>E("span",{title:hs.map(HN).join(", ")},k,hs.length>1?E("small",null,hs.length):null))),
        E("h3",{class:"enc-h"},"The handbook"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.handbook","The Academy's handbook is one page long. Its first line says that nothing at Everspire is magic. The rest is seven rules."),tag("n")),
        E("ol",{class:"enc-rules"},RULES.map(([r,g])=>E("li",null,E("b",null,r),E("span",null,g)))),
        E("h3",{class:"enc-h"},"A day at Everspire"),
        E("ol",{class:"enc-day"},DAY.map(([t,where,what])=>E("li",null,E("span",{class:"t"},t),E("span",null,E("b",null,where),". ",what)))),
        E("p",{class:"enc-note"},"All of this is new lore except the places, which are canon. ",tag("n")),
        E("h3",{class:"enc-h"},"Discipline and the bells"),
        E("p",{class:"enc-p enc-n"},ACAD.lore("academy.discipline","Small trouble goes to a girl's headmistress, who knows her best and forgives her most. Group trouble goes to its principal, rivalry trouble to both principals, and trouble between Dawn and Dusk to the deans, who have been settling it over the same chessboard for sixty years. Very rarely, trouble goes higher. Then the Spire's bells ring once at midnight, and in the morning it is over. Nobody has ever said what the Headmaster does in between."),tag("n"))];
      if(anchor)add.forEach(n=>art.insertBefore(n,anchor));else art.append(...add)}}}

  /* =====================================================================================================
     5. LOCATIONS AND ENVIRONMENT
     ===================================================================================================== */
  /* area: walls (inside the castle), grounds, beyond. rv: the rival duels set here (RELDATA places). turf: a rivalry's turf. */
  const PLACES=[
    {id:"spire",n:1,x:610,y:270,area:"walls",name:"The Spire",tag:"n",
      lead:"The impossible tower at the heart of the castle: a needle of black stone so tall that on cloudy days its top is simply gone.",
      lore:["The Spire is older than every wall around it. Its stair winds up past the Headmaster's study, then past rooms nobody uses, then past rooms nobody has seen, and then, as far as anyone has ever got, it keeps going.","Its bells ring by themselves on equinox nights, and once at midnight when a dispute is settled. Every student tries to climb it once. The handbook forbids it, and the Headmaster has never punished anyone for trying."]},
    {id:"hall",n:2,x:575,y:340,area:"walls",name:"The great dining hall",tag:"c",turf:["legends","coil"],rv:["hall"],
      lead:"A vaulted hall of long oak tables under a hammer-beam roof, where the whole Academy eats, argues and issues its challenges.",
      lore:["The head table has belonged to the Legends since the first century, by law of tradition, and Edmund Kingsley wrote the tradition. The Coil has wanted it for four hundred years.","Meals are where feuds are declared. A challenge issued across the hall at dinner must be answered by breakfast."]},
    {id:"champions",n:3,x:655,y:322,area:"walls",name:"The Champions' Hall",tag:"c",groups:["legends"],
      lead:"The Legends' hall, hung with crimson-and-gold banners of griffins, dragons, phoenixes and unicorns, some older than the countries outside.",
      lore:["The oldest banner bears the name of every Legend who ever graduated, stitched in gold. It is so heavy now that it takes four girls to hang it.","Trophies line the walls, and the Legends keep careful score of whose they are."]},
    {id:"pride",n:4,x:600,y:418,area:"walls",name:"Pride Rock",tag:"c",groups:["pride"],turf:["pride","pack"],
      lead:"The sunlit stone steps of the south courtyard, where the old stone holds the day's warmth long after dark and a great carved lion fountain plays behind them.",
      lore:["Officially, the south courtyard steps. Nobody has called them that in living memory.","At Golden Hour the steps belong to the Pride, and no rival may set foot on them until the sun is down. The Pack's trail begins where the steps end, which is the whole problem."]},
    {id:"sunward",n:5,x:738,y:282,area:"walls",name:"The Sunward Wing",tag:"n",faction:"dawn",
      lead:"The Order of Dawn's seat on the east side of the castle, where the morning light comes in first.",
      lore:["Cream stone, tall windows and a terrace facing the sunrise, where Dean Morrowgate teaches his four o'clock class on stars and stories.","Dawn's common rooms, its archive and its trophy cases are here. The doors are never locked, on principle."]},
    {id:"duskward",n:6,x:478,y:300,area:"walls",name:"The Duskward Wing",tag:"n",faction:"dusk",
      lead:"The Court of Dusk's seat on the west side of the castle, where the sunset lingers.",
      lore:["Dark wood, plum velvet and the Duskward Gallery, where Dean Vey invites one Dawn girl to tea every year.","Dusk's doors are always locked, and every Dusk girl has a key to all of them."]},
    {id:"gallery",n:7,x:540,y:244,area:"walls",name:"The Long Gallery",tag:"n",
      lead:"A corridor of portraits joining the two wings, a quarter of a mile of painted faces watching everyone who walks it.",
      lore:["The oldest portrait shows the signing of the Accord in 1726. The man standing behind the signing table is the Headmaster, and he has not aged.","Twice walled off during the Long Quarrel and twice reopened, it is now neutral ground, which is why so many Dawn-and-Dusk couples are seen in it."]},
    {id:"library",n:8,x:655,y:212,area:"walls",name:"The library",tag:"c",rv:["chess"],
      lead:"Stacks seven floors deep, reading rooms with green lamps, a vault beneath and a flat roof above where students go to be alone.",
      lore:["The library after hours is the Academy's worst-kept secret: half of Everspire studies there, and the other half pretends to.","The vault holds the founders' charter and the Roll of Sleeping Houses. The chess game between the two deans has been played at the same table by the east window since 1966."]},
    {id:"kitchens",n:9,x:540,y:378,area:"walls",name:"The kitchens",tag:"c",rv:["bakeoff"],
      lead:"Copper pans, a hearth big enough to stand in and long scrubbed tables under the great dining hall.",
      lore:["Students may use the kitchens after the cooks have gone, and the Academy's bake-offs, official and otherwise, are held here.","The Grove bakes the bread most mornings. The kitchens after midnight belong to whoever is hungriest."]},
    {id:"drawing",n:10,x:492,y:350,area:"walls",name:"The emerald drawing room",tag:"c",groups:["coil"],
      lead:"Green velvet chairs, a marble fireplace and a glowing terrarium wall in the depths of the Duskward Wing. By invitation only.",
      lore:["For most of its history this was Serpent's room alone. Now ten girls plot here, and an invitation to it is the most coveted and most feared card at Everspire.","The Coil's ledger of the Legends' slights is kept here, in a locked cabinet that has never needed to be locked."]},
    {id:"observatory",n:11,x:462,y:220,area:"walls",name:"The observatory and the rooftops",tag:"c",groups:["talons"],rv:["night"],
      lead:"A stone tower with a brass telescope under an iron dome, and the slate rooftops of the west side stretching away below it.",
      lore:["The Talons watch the whole Academy from here. Every night one of them keeps the Rooftop Watch until dawn.","The observatory charts stars no other observatory can see. The rooftops are where the Academy's thieves meet, by accident, every single night."]},
    {id:"aquarium",n:12,x:515,y:430,area:"walls",name:"The aquarium wing and the pool",tag:"c",groups:["deep"],turf:["frost","deep"],
      lead:"The oldest part of the castle, below the waterline: dim halls of huge glowing tanks, drifting jellyfish, and an indoor pool lit from beneath.",
      lore:["Sealed for a century until the Deep reopened it; how they got in, Eel has never said.","The pool is the Deep's, and they know it. The Frost keeps swimming in it anyway, and the edge of the pool is where the two of them meet."]},
    {id:"everlake",n:13,x:330,y:478,area:"grounds",name:"The Everlake",tag:"c",groups:["frost"],rv:["ice"],
      lead:"A cold, clear lake below the crag, glass-still on summer mornings and frozen solid all winter, with a boathouse and the Frost's cocoa bar on its shore.",
      lore:["On the night it freezes the Frost skates under lanterns until dawn; on Midwinter's Day they cut a hole in the ice and jump in, cheered on by the whole Academy.","The fishermen who first heard the bell fished here. Some students swear that on still nights you can still hear it from the middle of the lake."]},
    {id:"conservatory",n:14,x:770,y:360,area:"grounds",name:"The glass conservatory",tag:"c",groups:["plumes"],turf:["plumes","hive"],rv:["catwalk"],
      lead:"The Academy's most beautiful room: a palace of glass around a marble fountain, full of exotic flowers and golden afternoon light.",
      lore:["The Plumes were founded here, and every party worth attending is thrown here. The fountain is full of the coins of the Fountain Pledge.","Its flowers are the Hive's eternal grievance; the Swarm usually descends on a Plumes party here. The long aisle between the orchids makes a natural catwalk."]},
    {id:"greenhouse",n:15,x:420,y:165,area:"grounds",name:"The greenhouse and the old oak",tag:"c",groups:["grove"],turf:["grove","talons"],
      lead:"A sunny greenhouse full of potted plants, string lights and a tea table, beneath an oak older than the Academy itself.",
      lore:["The Grove has gathered under the oak since before the greenhouse was built. On the first warm afternoon of spring they all fall asleep under it.","At night the Talons come down from the rooftops to steal from the Grove here, and the Grove steals back."]},
    {id:"apiary",n:16,x:350,y:222,area:"grounds",name:"The old apiary and the loft",tag:"c",groups:["hive"],
      lead:"Rows of old beehives in a walled garden, and above the potting sheds a greenhouse loft lit at dusk by hundreds of fireflies and honeycomb lanterns.",
      lore:["For generations the Hive was three girls and some bees. Now it has a queen, and the loft has a throne, which is a garden chair painted gold.","Royal Jelly is held here on the queen's birthday."]},
    {id:"trail",n:17,x:205,y:165,area:"grounds",name:"The forest trail and the bonfire",tag:"c",groups:["pack"],turf:["pride","pack"],
      lead:"An old trail from the stables into the forest, and at its end a clearing with a bonfire under tall pines and, most nights, a full moon.",
      lore:["The Pack has met here for longer than the trail has had a name. It was here, three and a half centuries ago, that they walked out on Dawn's curfew.","Every full moon the Pack runs the trail to the lake and back, howling. The faculty pretend not to hear."]},
    {id:"oldwood",n:18,x:105,y:265,area:"grounds",name:"The Old Wood",tag:"n",rv:["forest"],
      lead:"The deep forest west of the castle, grown thick with the saplings the Grove plants for every graduate.",
      lore:["Every Grove girl who graduates is remembered with a tree; the Wood is very large.","It is where the Academy's quarrels go when the courtyards are too public: a duel in the forest leaves only footprints."]},
    {id:"fields",n:19,x:820,y:452,area:"grounds",name:"The fields and the track",tag:"n",rv:["race"],
      lead:"Lawns, a running track, a fencing piste under the trees and archery butts on the east side, running down to the cliffs.",
      lore:["Sports Day, every race worth losing and most of the Academy's bets are settled here.","The sprinters race anyone who will run. The swimmers race to the sea and back when the pool is taken."]},
    {id:"cliffs",n:20,x:880,y:150,area:"beyond",name:"The sea cliffs and the lighthouse",tag:"n",rv:["storm"],
      lead:"White cliffs dropping into a grey sea east of the Academy, with an old lighthouse at the point that still turns every night.",
      lore:["The lighthouse keeper's room at the top is the most romantic place within walking distance, and has hosted more than one proposal.","When storms come in off the sea, the Academy's elemental feuds, sky against sea, fire against water, are settled here, in the rain."]},
    {id:"moor",n:21,x:745,y:60,area:"beyond",name:"The high moor",tag:"n",
      lead:"Open heather country north of the crag, all wind and standing stones, where the sky is biggest.",
      lore:["Students walk out to the stones on clear nights to watch the stars the observatory charts.","The moor is where the Academy goes to be alone, and where it goes when it does not want to be found."]},
    {id:"town",n:22,x:800,y:572,area:"beyond",name:"Everhythe",tag:"n",
      lead:"The little lake town below the crag: one street, a harbor, three pubs, a bakery and the candidates' lodgings.",
      lore:["Every Everspire girl spent her candidate year here before a House chose her, and every one of them misses the bakery.","The town is used to the Academy. It is not used to the Pack."]}];
  const PL=Object.fromEntries(PLACES.map(p=>[p.id,p]));
  /* v249: the Synth's gallery, the Void's stair, and the old well between them */
  if(typeof SV249!=="undefined")PLACES.push(
    {id:"silvergallery",n:23,x:690,y:250,area:"walls",name:"The Silver Gallery",tag:"n",groups:["synth"],faction:"lattice",
      lead:"A long white gallery beneath the clock tower, where machines older than the Accord still tick behind glass and the Synth keep their watch.",
      lore:["The Lattice's seat. Its clocks are wound by hand every term, and the great clock face above it has not lost a second in three hundred years.","Students are welcome in the front rooms. Nobody who has gone looking for the back rooms has found them."]},
    {id:"starless",n:24,x:432,y:262,area:"walls",name:"The Starless Stair",tag:"n",groups:["void"],faction:"starless",
      lead:"A stairwell under the observatory that goes down further than the castle does, where the stars show through the steps.",
      lore:["The Starless Court's seat. Its steps are cold, its walls are warm, and at the bottom, if there is a bottom, it is always night.","The Void throw their midnight raves on the upper flights. Nobody has ever counted the lower ones twice and got the same number."]},
    {id:"oldwell",n:25,x:398,y:340,area:"walls",name:"The old well",tag:"n",turf:["synth","void"],
      lead:"A capped stone well in a forgotten courtyard between the observatory and the kitchens, older than the castle, ringed with silver ward-lines.",
      lore:["Every midnight the Void knock three times on the Synth's ward here, and every midnight the Synth hold. It is the oldest rivalry at Everspire, and almost nobody knows it is happening.","Sovereign and Horizon play chess across its cap every full moon. Neither side is supposed to know."]});
  /* v250: and the places as the canon changes layer has them */
  if(ACAD.canonApply)ACAD.canonApply("places",PLACES);
  {const gok=x=>(ACAD.GROUPS||[]).some(g=>g.id===x);
    PLACES.forEach(p=>{p.lore=p.lore||[];if(!p.tag)p.tag="n";if(!["walls","grounds","beyond"].includes(p.area))p.area="walls";
      if(p.groups){p.groups=p.groups.filter(gok);if(!p.groups.length)delete p.groups}
      if(p.turf&&!(p.turf.length===2&&p.turf.every(gok)))delete p.turf;
      if(p.faction&&!(ENC.FACTIONS||[]).some(f=>f.id===p.faction))delete p.faction})}
  ENC.PLACES=PLACES;
  const AREAS=[["walls","Within the walls"],["grounds","The grounds"],["beyond","Beyond the walls"]];ENC.PLACE_AREAS=AREAS;
  const RVNAME={hall:"the great hall",storm:"the storm",forest:"the forest",bakeoff:"the bake-off",race:"the race",chess:"the chess match",night:"the rooftops",ice:"the ice",catwalk:"the catwalk"};

  /* ---------- the map ---------- */
  function sv(tag,attrs,...kids){const el=document.createElementNS(SVGNS,tag);Object.entries(attrs||{}).forEach(([k,v])=>{if(v!=null)el.setAttribute(k,v)});kids.flat().forEach(k=>{if(k==null)return;el.append(k.nodeType?k:document.createTextNode(k))});return el}
  let rnd=7;const rand=()=>{rnd=(rnd*9301+49297)%233280;return rnd/233280};
  function mapSVG(opts){
    opts=opts||{};rnd=7;
    const s=sv("svg",{viewBox:"0 0 1000 640",class:"enc-map"+(opts.mini?" mini":""),role:opts.mini?"img":"group","aria-label":opts.mini?"Where it is on the map":"Map of Everspire and its country"});
    const g=sv("g",{class:"land"});
    s.append(sv("rect",{x:0,y:0,width:1000,height:640,class:"bg"}));
    /* the sea and its cliffs */
    s.append(sv("path",{class:"sea",d:"M1000 0L905 0C880 80 930 140 900 220C875 300 925 380 895 460C870 540 915 600 900 640L1000 640Z"}));
    s.append(sv("path",{class:"cliff",d:"M905 0C880 80 930 140 900 220C875 300 925 380 895 460C870 540 915 600 900 640"}));
    for(let y=20;y<640;y+=28)s.append(sv("path",{class:"wave",d:`M${940+((y/28)%2)*14} ${y}q8 -5 16 0t16 0`}));
    /* the moor */
    for(let i=0;i<46;i++){const x=640+rand()*230,y=22+rand()*92;s.append(sv("path",{class:"moor",d:`M${x} ${y}l5 -6l5 6`}))}
    [[700,52],[770,40],[820,80]].forEach(([x,y])=>s.append(sv("rect",{class:"stone",x,y,width:5,height:12})));
    /* the forest */
    for(let i=0;i<150;i++){const x=24+rand()*360,y=26+rand()*300;if(x>300&&y>200)continue;if(Math.hypot(x-205,y-165)<34)continue;const r=7+rand()*6;
      s.append(sv("path",{class:"tree",d:`M${x} ${y-r}l${r*.7} ${r*1.5}h${-r*1.4}z`}))}
    /* the lake */
    s.append(sv("path",{class:"lake",d:"M70 505C80 420 250 392 380 408C500 423 560 470 540 532C520 598 360 622 228 606C116 593 62 566 70 505Z"}));
    for(let i=0;i<9;i++){const x=150+rand()*300,y=450+rand()*130;s.append(sv("path",{class:"ripple",d:`M${x} ${y}h22`}))}
    /* paths */
    s.append(sv("path",{class:"road",d:"M600 445C640 500 700 540 780 565"}));
    s.append(sv("path",{class:"trail",d:"M455 300C400 290 330 260 290 230C255 205 235 185 212 170"}));
    s.append(sv("path",{class:"trail",d:"M212 170C160 230 130 330 170 420"}));
    s.append(sv("path",{class:"road",d:"M770 300C820 330 840 380 830 430"}));
    s.append(sv("path",{class:"trail",d:"M770 260C810 220 845 185 870 160"}));
    /* the town */
    [[770,560],[788,552],[806,566],[822,556],[790,584],[812,590],[834,578]].forEach(([x,y])=>s.append(sv("path",{class:"house",d:`M${x} ${y}h12v-8l-6 -6l-6 6z`})));
    /* the crag and the castle */
    s.append(sv("path",{class:"crag",d:"M420 300C420 220 470 170 560 150C660 132 760 170 795 240C826 305 800 400 730 440C650 480 530 478 470 430C435 400 420 350 420 300Z"}));
    s.append(sv("path",{class:"wall",d:"M448 210L560 168L700 180L782 250L772 372L700 438L560 452L470 404L436 300Z"}));
    [[448,210],[560,168],[700,180],[782,250],[772,372],[700,438],[560,452],[470,404],[436,300]].forEach(([x,y])=>s.append(sv("rect",{class:"tower",x:x-5,y:y-5,width:10,height:10})));
    /* the Spire */
    s.append(sv("circle",{class:"glow",cx:610,cy:250,r:60}));s.append(sv("circle",{class:"glow",cx:610,cy:250,r:30}));
    s.append(sv("path",{class:"spire",d:"M610 118L624 262L610 280L596 262Z"}));
    /* the lighthouse */
    s.append(sv("path",{class:"lighthouse",d:"M874 166h12l-3 -30h-6z"}));
    s.append(sv("path",{class:"beam",d:"M880 138L960 112L960 158Z"}));
    /* compass */
    s.append(sv("g",{class:"compass",transform:"translate(60 590)"},sv("circle",{r:20}),sv("path",{d:"M0 -26L5 0L0 26L-5 0Z"}),sv("text",{y:-31,"text-anchor":"middle"},"N")));
    /* pins */
    PLACES.forEach(p=>{const on=opts.mark===p.id;
      const a=sv("a",{href:"#","class":"pin"+(on?" on":"")+(opts.mini&&!on?" dim":""),"data-place":p.id,"aria-label":p.n+". "+p.name},
        sv("title",null,p.name),sv("circle",{cx:p.x,cy:p.y,r:on?19:15}),sv("text",{x:p.x,y:p.y+5,"text-anchor":"middle"},String(p.n)));
      if(!opts.mini)a.addEventListener("click",ev=>{ev.preventDefault();ENC.go("place:"+p.id)});
      s.append(a)});
    if(!opts.mini){[["Everlake",250,525],["The Old Wood",140,60],["The high moor",700,30],["The sea",960,320],["Everhythe",800,620]].forEach(([t,x,y])=>s.append(sv("text",{class:"lbl",x,y,"text-anchor":"middle"},t)))}
    return s}
  ENC.mapSVG=mapSVG;

  /* ---------- scenes set at a place ---------- */
  const pairHouse=ENC.pairHouse||(()=>null);
  function scenesAt(p){
    const out=[];const add=(k,label)=>{const t=T(k);if(t&&!out.some(x=>x[0]===k))out.push([k,label||t.name])};
    (p.groups||[]).forEach(gid=>["grphang","grpportrait","grpcolors","grpcouncil","grpinit"].forEach(pre=>add(pre+gid)));
    if(p.turf)p.turf.forEach(gid=>["rgshow","rgtruce","rgfeud"].forEach(pre=>add(pre+gid)));
    const duels=[];((ACAD.RELDATA||{}).RV||[]).forEach(r=>{if(!(p.rv||[]).includes(r[2]))return;const k="rv1"+r[0],t=T(k);
      if(t&&pairHouse(t)===r[1])duels.push([k,HN(r[0])+" vs "+HN(r[1]),r[0],r[1]])});
    return {group:out,duels}}

  /* ---------- the chapter page ---------- */
  sec("places").page="places";
  ENC.page("places",{title:"Locations and Environment",short:"Locations",sec:"places",crumbs:[],
    searchText:()=>"map places locations "+PLACES.map(p=>p.name+" "+p.lead).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Locations and Environment"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.places","Everspire stands on a crag of black stone above the Everlake, with the Old Wood to the west, the high moor to the north, the sea cliffs to the east and the little town of Everhythe at the lake's end. Inside the walls, Dawn holds the east and Dusk the west, and the Spire stands between them."),tag("n")),
        E("p",{class:"enc-note"},"Choose a place on the map or in the list. Every group's haunt and every rivalry's turf is canon; the map itself, and the places beyond the walls, are new."));
      const legend=E("div",{class:"enc-maplegend"},AREAS.map(([a,t])=>E("div",null,E("h4",null,t),E("ol",null,PLACES.filter(p=>p.area===a).map(p=>E("li",{value:p.n},
        E("a",{href:"#","data-place":p.id,onclick:ev=>{ev.preventDefault();ENC.go("place:"+p.id)},onmouseenter:()=>hl(p.id,true),onmouseleave:()=>hl(p.id,false)},p.name)))))));
      const map=mapSVG();
      const hl=(id,on)=>{const a=map.querySelector(`.pin[data-place="${id}"]`);if(a)a.classList.toggle("hot",on)};
      art.append(E("div",{class:"enc-mapwrap"},map,legend));
      /* the haunts and the turf, as a table */
      art.append(E("h3",{class:"enc-h"},"Who goes where"),E("p",{class:"enc-note"},"Every group's haunt and every rivalry's ground, from the studio's data. ",tag("c")),
        E("dl",{class:"enc-facts enc-c"},ACAD.GROUPS.map(g=>{const p=PLACES.find(x=>(x.groups||[]).includes(g.id));return [E("dt",null,lnk("group:"+g.id,g.name)),E("dd",null,p?lnk("place:"+p.id,p.name):"",": ",g.hangout)]})));
      const tf=Object.entries(ACAD.GTURF||{});
      if(tf.length)art.append(E("ul",{class:"enc-list enc-c"},tf.map(([k,v])=>{const [a,b]=k.split("|");return E("li",null,lnk("group:"+a,G(a).name)," and ",lnk("group:"+b,low(G(b).name))," clash ",v,".")})));
      el.append(art)}});

  /* ---------- a page for every place ---------- */
  PLACES.forEach(p=>ENC.page("place:"+p.id,{title:p.name,short:p.name,sec:"places",crumbs:["places"],kind:"Place",
    searchText:()=>p.name+" "+p.lead+" "+p.lore.join(" "),build:el=>buildPlace(el,p)}));
  function buildPlace(el,p){
    const gid=(p.groups||p.turf||[])[0],f=p.faction&&ENC.FACTIONS.find(x=>x.id===p.faction);
    const c=gid?ENC.crestCols(gid):f?{field:f.cols.a,band:f.cols.b}:{field:"#1e2342",band:"#d8b25a"},ink=f?f.cols.ink:ENC.inkOn(c.field);
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 55%,${c.band} 170%)`,color:ink}},
      gid?E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL?ACAD.crestURL(gid):""})`}}):null,
      E("div",{class:"enc-row"},E("span",{class:"enc-placeno",style:{borderColor:ink,color:ink}},String(p.n)),
        E("div",null,E("h1",null,p.name),E("p",{class:"kind"},(AREAS.find(a=>a[0]===p.area)||AREAS[0])[1]),
          (p.groups||[]).length?E("p",{class:"motto"},(p.groups||[]).map(x=>G(x).hangout).join("; ")):null)),
      E("div",{class:"band",style:{background:c.band}})));
    const mainCol=E("div");
    mainCol.append(E("p",{class:"enc-lead enc-"+p.tag},p.lead,tag(p.tag)));
    p.lore.forEach(t=>mainCol.append(E("p",{class:"enc-p enc-n"},rich(t),tag("n"))));
    if((p.groups||[]).length){p.groups.forEach(x=>{const g=G(x);
      mainCol.append(E("h3",{class:"enc-h"},"Who you'll find here"),E("p",{class:"enc-p enc-c"},lnk("group:"+x,g.name),", whose haunt this is. ",tag("c")),
        E("div",{class:"enc-heads"},g.members.map(h=>E("a",{href:"#",title:HN(h),onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},ENC.pixel(h,40),E("span",null,HN(h))))))})}
    if(f)mainCol.append(E("h3",{class:"enc-h"},"Whose it is"),E("p",{class:"enc-p enc-n"},lnk("faction:"+f.id,f.name),", under ",lnk("staff:"+f.dean,ENC.STAFF[f.dean].name),". Its groups: ",f.groups.map((x,i)=>[i?", ":"",lnk("group:"+x,G(x).name)]),".",tag("n")));
    if(p.turf){const [a,b]=p.turf,k=[a,b].sort().join("|");const v=(ACAD.GTURF||{})[k];
      mainCol.append(E("h3",{class:"enc-h"},"Contested ground"),E("p",{class:"enc-p enc-c"},lnk("group:"+a,G(a).name)," and ",lnk("group:"+b,low(G(b).name))," clash ",v||"here",".",tag("c")))}
    const S=scenesAt(p);
    if(S.group.length)mainCol.append(E("h3",{class:"enc-h"},"Scenes set here"),E("p",{class:"enc-note"},"Load one into the studio; the Scene prompt tab brings the lineup."),E("div",{class:"enc-loads"},S.group.map(([k,n])=>ENC.loadBtn(k,n))));
    if(S.duels.length){mainCol.append(E("h3",{class:"enc-h"},"Rivals who meet at "+RVNAME[p.rv.find(r=>((ACAD.RELDATA||{}).RV||[]).some(x=>x[2]===r))]||"here"),
      E("p",{class:"enc-note"},S.duels.length+" pairs whose rivalry scenes are set here. ",tag("c")),
      E("div",{class:"enc-chips",style:{padding:0}},S.duels.map(([k,n,a])=>{const b=ENC.loadBtn(k,null,"enc-chip enc-chip-px");if(!b)return null;b.textContent="";const im=ENC.pixel(a,18);if(im)b.append(im);b.append(E("span",null,n));const g=ACAD.GROUP_OF(a);b.style.setProperty("--gc",vis(g?g.id:""));return b})))}
    const near=PLACES.filter(q=>q.id!==p.id).map(q=>[q,Math.hypot(q.x-p.x,q.y-p.y)]).sort((a,b)=>a[1]-b[1]).slice(0,4).map(x=>x[0]);
    const side=E("aside",{class:"enc-side"},
      E("div",{class:"enc-card"},E("h4",null,"On the map"),mapSVG({mini:true,mark:p.id}),E("p",{class:"enc-note",style:{margin:"6px 0 0"}},lnk("places","The whole map"))),
      E("div",{class:"enc-card"},E("h4",null,"Nearby"),E("ul",{class:"enc-jump"},near.map(q=>E("li",null,lnk("place:"+q.id,q.name))))));
    el.append(E("div",{class:"enc-cols"},mainCol,side))}

  /* group pages: their haunt links to its place */
  ACAD.GROUPS.forEach(g=>{const pg=ENC.pages["group:"+g.id];if(!pg||!pg.build)return;const ob=pg.build;
    pg.build=el=>{ob(el);const p=PLACES.find(x=>(x.groups||[]).includes(g.id));if(!p)return;
      el.querySelectorAll(".enc-side dt").forEach(dt=>{if(dt.textContent==="Haunt"){const dd=dt.nextElementSibling;if(dd){dd.textContent="";dd.append(lnk("place:"+p.id,p.name),": "+g.hangout)}}})}});

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss227";st.textContent=`
#encDlg .enc-timeline{list-style:none;margin:20px 0 10px;padding:0;position:relative}
#encDlg .enc-timeline::before{content:"";position:absolute;left:174px;top:8px;bottom:8px;width:2px;background:linear-gradient(var(--e-dawn),var(--e-dusk))}
#encDlg .enc-timeline .era h3{font-family:var(--e-serif);font-size:26px;margin:26px 0 8px 196px;color:var(--e-ink)}
#encDlg .enc-timeline .ev{display:grid;grid-template-columns:160px 1fr;gap:36px;margin:0 0 14px;position:relative}
#encDlg .enc-timeline .ev::before{content:"";position:absolute;left:169px;top:8px;width:12px;height:12px;border-radius:50%;background:var(--e-vellum);border:2px solid var(--e-gold2)}
#encDlg .enc-timeline .when{font-family:var(--e-serif);font-weight:700;font-size:17px;text-align:right;color:var(--e-gold2);line-height:1.25;padding-top:2px}
#encDlg .enc-timeline h4{margin:0 0 2px;font-size:16px}
#encDlg .enc-timeline .enc-p{margin:0}
#encDlg .enc-open{display:grid;gap:4px 0;margin:8px 0 14px}
#encDlg .enc-open dt{font-family:var(--e-serif);font-size:19px;font-weight:700;margin-top:10px}
#encDlg .enc-open dd{margin:0;line-height:1.6;max-width:72ch}
#encDlg .enc-years{display:grid;gap:8px;margin:6px 0 10px}
#encDlg .enc-years .yr{display:grid;grid-template-columns:150px 1fr;gap:12px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:9px;padding:8px 12px}
#encDlg .enc-years .yh b{display:block;font-family:var(--e-serif);font-size:18px}
#encDlg .enc-years .yh small{color:var(--e-muted);font-size:12.5px}
#encDlg .enc-years .heads{display:flex;flex-wrap:wrap;gap:2px}
#encDlg .enc-years .heads a{display:block;border-radius:6px;padding:1px}
#encDlg .enc-years .heads a:hover,#encDlg .enc-years .heads a:focus-visible{background:var(--e-vellum2)}
#encDlg .enc-studies{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 10px}
#encDlg .enc-studies span{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:20px;padding:3px 11px;font-size:13.5px}
#encDlg .enc-studies small{margin-left:6px;color:var(--e-gold2);font-weight:700}
#encDlg .enc-rules{margin:8px 0 12px;padding-left:24px;line-height:1.55}
#encDlg .enc-rules li{margin:0 0 8px}
#encDlg .enc-rules b{display:block}
#encDlg .enc-rules span{color:var(--e-muted)}
#encDlg .enc-day{list-style:none;margin:8px 0;padding:0;border-left:2px solid var(--e-vellum2)}
#encDlg .enc-day li{display:grid;grid-template-columns:86px 1fr;gap:12px;padding:6px 0 6px 14px;line-height:1.5}
#encDlg .enc-day .t{font-family:var(--e-serif);font-weight:700;font-size:17px;color:var(--e-gold2)}
#encDlg .enc-mapwrap{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:22px;align-items:start;margin:14px 0 18px}
#encDlg .enc-map{width:100%;height:auto;display:block;border-radius:14px;border:1px solid #2c3260;background:#141a36}
#encDlg .enc-map .bg{fill:#18204a}
#encDlg .enc-map .sea{fill:#132a55}
#encDlg .enc-map .cliff{fill:none;stroke:#e9e3cf;stroke-width:3;stroke-dasharray:2 5}
#encDlg .enc-map .wave{fill:none;stroke:#3d5f97;stroke-width:1.4}
#encDlg .enc-map .moor{fill:none;stroke:#6e6aa0;stroke-width:1.2}
#encDlg .enc-map .stone{fill:#8a86b8}
#encDlg .enc-map .tree{fill:#22403f;stroke:#3a6a5a;stroke-width:1}
#encDlg .enc-map .lake{fill:#1c3c70;stroke:#7fa6d8;stroke-width:1.5}
#encDlg .enc-map .ripple{stroke:#4f7bb6;stroke-width:1.4}
#encDlg .enc-map .road{fill:none;stroke:#b79a5a;stroke-width:3;opacity:.7}
#encDlg .enc-map .trail{fill:none;stroke:#b79a5a;stroke-width:2;stroke-dasharray:5 5;opacity:.7}
#encDlg .enc-map .house{fill:#2c335f;stroke:#d8b25a;stroke-width:1}
#encDlg .enc-map .crag{fill:#232a52;stroke:#3a4175;stroke-width:2}
#encDlg .enc-map .wall{fill:#2a3160;stroke:#d8b25a;stroke-width:2}
#encDlg .enc-map .tower{fill:#3a4175;stroke:#8f89c0;stroke-width:1}
#encDlg .enc-map .glow{fill:#f3c86a;opacity:.12}
#encDlg .enc-map .spire{fill:#0e1230;stroke:#f3c86a;stroke-width:2}
#encDlg .enc-map .lighthouse{fill:#e9e3cf}
#encDlg .enc-map .beam{fill:#f3c86a;opacity:.18}
#encDlg .enc-map .compass circle{fill:none;stroke:#6e6aa0}
#encDlg .enc-map .compass path{fill:#d8b25a}
#encDlg .enc-map .compass text,#encDlg .enc-map .lbl{fill:#bdb7e0;font:italic 600 15px var(--e-serif)}
#encDlg .enc-map .pin circle{fill:#151931;stroke:#d8b25a;stroke-width:2.2;transition:r .15s}
#encDlg .enc-map .pin text{fill:#f3e7c7;font:700 15px var(--e-sans);pointer-events:none}
#encDlg .enc-map .pin:hover circle,#encDlg .enc-map .pin.hot circle,#encDlg .enc-map .pin:focus-visible circle{fill:#d8b25a;r:18px}
#encDlg .enc-map .pin:hover text,#encDlg .enc-map .pin.hot text,#encDlg .enc-map .pin:focus-visible text{fill:#151931}
#encDlg .enc-map .pin.on circle{fill:#d8b25a;stroke:#fff}
#encDlg .enc-map .pin.on text{fill:#151931;font-size:15px}
#encDlg .enc-map .pin.dim{opacity:.35}
#encDlg .enc-map.mini{border-radius:9px}
#encDlg .enc-maplegend h4{font-family:var(--e-serif);font-size:19px;margin:0 0 4px}
#encDlg .enc-maplegend ol{margin:0 0 14px;padding-left:26px;font-size:14px;line-height:1.7}
#encDlg .enc-maplegend a{color:var(--e-ink);text-decoration:none;border-bottom:1px solid var(--e-line)}
#encDlg .enc-maplegend a:hover,#encDlg .enc-maplegend a:focus-visible{border-color:var(--e-gold2);color:var(--e-ink)}
#encDlg .enc-maplegend li::marker{color:var(--e-gold2);font-weight:700}
#encDlg .enc-placeno{flex:none;width:96px;height:96px;border-radius:50%;border:3px solid;display:grid;place-items:center;font:700 44px var(--e-serif)}
#encDlg .enc-heads{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 4px}
#encDlg .enc-heads a{display:flex;flex-direction:column;align-items:center;gap:2px;width:72px;font-size:12px;text-decoration:none;color:var(--e-ink);text-align:center}
#encDlg .enc-heads a:hover span{text-decoration:underline}
@media (max-width:860px){
  #encDlg .enc-mapwrap{grid-template-columns:1fr}
  #encDlg .enc-timeline::before{left:6px}
  #encDlg .enc-timeline .era h3{margin-left:26px}
  #encDlg .enc-timeline .ev{grid-template-columns:1fr;gap:2px;padding-left:26px}
  #encDlg .enc-timeline .ev::before{left:1px}
  #encDlg .enc-timeline .when{text-align:left}
  #encDlg .enc-years .yr{grid-template-columns:1fr}
  #encDlg .enc-placeno{width:64px;height:64px;font-size:30px}}`;
  document.head.append(st);
})();

/* ---- v228: chapters 7 and 8. Culture and Traditions (the Everspire year, the Spire Cup, dress, names, the unwritten
   rules, every group's traditions, crests and mottos, love at Everspire) and Conflicts and Stories (Dawn against Dusk,
   the five great rivalries, the forbidden loves across the line, every personal rivalry by the ground it is fought on,
   the mysteries, and story seeds for every group, also shown on the group pages). ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.SECTIONS||typeof ACAD==="undefined")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,rich=ENC.rich,G=ENC.G;
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const vis=ENC.vis||(gid=>ENC.crestCols(gid).band);
  const low=n=>String(n||"").replace(/^The /,"the ");
  const sec=id=>ENC.SECTIONS.find(s=>s.id===id);
  const REL=()=>ACAD.RELDATA||{};
  const fac=h=>{const f=ACAD.FACTION_OF?ACAD.FACTION_OF(h):null;return f?f.id:""};
  const px=(h,n)=>ENC.pixel(h,n||22);
  const who=h=>[px(h),lnk("house:"+h,HN(h))];

  /* =====================================================================================================
     7. CULTURE AND TRADITIONS
     ===================================================================================================== */
  const YEAR=[
    {season:"Autumn",cls:"autumn",items:[
      ["Choosing Morning","The first morning of the year","Every headmistress who has chosen a girl sends for her before dawn. The chosen girl wakes to find an animal of her House's kind at her door, and walks up to the castle in time for breakfast in the great hall, where the whole Academy stands for her.",["place:hall"]],
      ["The Card Game","Every year since 1998","The Pride and the Pack play one hand of cards for the courtyard steps. Nobody has ever won cleanly.",["group:pride","group:pack","place:pride"]],
      ["Founders' Night","Late autumn","A feast by candlelight in the great hall. The names of the sleeping Houses' headmistresses are read aloud, and every Legend stands on the head table to tell the best thing she did that year.",["group:legends","place:hall"]]]},
    {season:"Winter",cls:"winter",items:[
      ["First Ice","The night the Everlake freezes","The Frost skates under lanterns until dawn. The first girl to fall makes the cocoa all winter.",["group:frost","place:everlake"]],
      ["The Glow","The darkest night of the year","The Deep lights the aquarium wing with nothing but living light, and invites exactly one outsider to see it.",["group:deep","place:aquarium"]],
      ["Accord Night","Midwinter","The anniversary of the Accord of 1726. Dawn and Dusk dine at one table in the Long Gallery, and at midnight the Spire's bells ring once.",["history","place:gallery"]],
      ["The Polar Plunge","Midwinter's Day","The Frost cuts a hole in the ice and jumps in, one by one, cheered by the whole Academy. The Deep always tries to do it first.",["group:frost","group:deep","place:everlake"]]]},
    {season:"Spring",cls:"spring",items:[
      ["The Long Nap","The first warm afternoon","The whole Grove falls asleep under the old oak, and the Academy has learned to walk around them.",["group:grove","place:greenhouse"]],
      ["The Equinox Bells","The spring equinox","The Spire's bells ring on their own at midnight. Students gather in the courtyards to hear them; nobody has ever seen them move.",["place:spire"]],
      ["Royal Jelly","The queen's birthday","Every Hive girl brings the queen a gift of honey, and the queen chooses one girl to stand at her right hand for the year.",["group:hive","place:apiary"]]]},
    {season:"Summer",cls:"summer",items:[
      ["The Spire Cup","The last week of the year","The year's points are counted in the great hall and the Cup is carried to the winners' haunt, where it stays, loudly, all summer.",["place:hall"]],
      ["Graduation","The last day of the year","Sixth years cross the courtyard in their House regalia. The Legends stitch their graduates' names into the Banner Roll, and the Grove plants a sapling in the Old Wood for each of theirs.",["group:legends","group:grove","place:oldwood"]]]},
    {season:"All year",cls:"always",items:[
      ["Golden Hour","Every sunset","The courtyard steps belong to the Pride until the sun is down.",["group:pride","place:pride"]],
      ["The Rooftop Watch","Every night","One Talon keeps watch on the observatory roof until dawn.",["group:talons","place:observatory"]],
      ["The Long Run","Every full moon","The Pack runs the forest trail to the lake and back, howling. The faculty pretend not to hear.",["group:pack","place:trail"]],
      ["The Molt","The end of every season","The Plumes' gala, at which each of them reveals a new look. Peacock judges, and Peacock always wins.",["group:plumes","place:conservatory"]],
      ["The Swarm","Once a term","The whole Hive descends on a single target at once. It is usually a Plumes party.",["group:hive","group:plumes"]]]}];
  const RULES=[
    "Never sit at another group's table without being asked, and never refuse when you are.",
    "A challenge issued across the great hall at dinner must be answered by breakfast.",
    "A girl wearing another group's colors is a guest of that group, and nobody lays a finger on a guest.",
    "Never ask a headmistress why she chose a girl. She will not tell you, and she will remember that you asked.",
    "Love whoever you like. The secret is hers to tell, never yours.",
    "A promise made at the Pack's bonfire is kept, whoever made it.",
    "When the bells ring once, stop arguing."];
  /* v251: the written lore of this chapter, as the canon changes layer has it */
  const L251=ACAD.lore||((k,d)=>d),LI251=ACAD.loreInto||((k,a)=>a);
  LI251("culture.year",YEAR);LI251("culture.rules",RULES);
  const CUP=L251("culture.cup","The Academy's year-long contest between its {{n:groups}} groups. Points are won on the Nine Grounds, the places where Everspire's rivals have always settled things, and a group's points count for its faction too. Dawn wins the Cup more years than not; Dusk says this is because Dawn writes the rules the Cup is judged by.");
  const DRESS=L251("culture.dress","Regalia is worn on Choosing Morning, Founders' Night, Accord Night and at Graduation, and nowhere else, except by the Plumes, who consider every evening a ceremony.");
  const NAMES=L251("culture.names",["A Keeper is called by her House's name: Fox, Serpent, Snowy Owl. Her friends use her own.",
          "A ward is called by her own name joined to her House's: Tamsin of Fox, Mira of Serpent.",
          "A boy of the Houses is called by his own name joined to his House's: Kasper Andersen of Orca House. Among the boys he goes by his title: the Diver, the Card Sharp.",
          "Headmistresses are spoken of by their Houses, the Fox headmistress, and addressed by their own names: Headmistress Tsukishiro to her face. Only another headmistress calls her Akemi.",
          "Principals are known by their titles: the Sovereign, the Old Lion, the Grey, the Captain, the Admiral, the Sentinel, the Showman, the Warden, the Alchemist, the Keeper.",
          "The deans are Dean Morrowgate and Dean Vey. The Headmaster is the Headmaster."]);
  ENC.LORE_DATA=Object.assign(ENC.LORE_DATA||{},{"culture.year":()=>YEAR,"culture.rules":()=>RULES,"culture.cup":()=>CUP,"culture.dress":()=>DRESS,"culture.names":()=>NAMES});
  const linkTo=id=>{const p=ENC.resolve?ENC.resolve(id):ENC.pages[id];if(!p)return null;return lnk(id,p.short||p.title)};
  sec("culture").page="culture";
  ENC.page("culture",{title:"Culture and Traditions",short:"Culture",sec:"culture",crumbs:[],
    searchText:()=>YEAR.map(s=>s.season+" "+s.items.map(i=>i.join(" ")).join(" ")).join(" ")+" Spire Cup dress robes regalia colors names Keeper ward unwritten rules "+RULES.join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Culture and Traditions"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.culture","Everspire runs on custom. A thousand years of feasts, oaths, contests and unwritten rules sit on top of the handbook's seven lines, and every group has added its own. Nobody is taught them. Everyone knows them by the end of her first term."),tag("n")));
      /* the year */
      art.append(E("h3",{class:"enc-h"},"The Everspire year"),E("p",{class:"enc-note"},"The Academy's year runs from Choosing Morning in autumn to Graduation in summer. ",tag("n")),
        E("div",{class:"enc-year"},YEAR.map(s=>E("section",{class:"season "+s.cls},E("h4",null,s.season),
          s.items.map(([name,when,text,links])=>E("div",{class:"ev"},E("b",null,name),E("small",null,when),E("p",null,rich(text)),
            E("div",{class:"lk"},links.map(linkTo).filter(Boolean).map((a,i)=>[i?" · ":"",a]))))))));
      /* the Spire Cup */
      const grounds=[["hall","The great hall"],["race","The race"],["forest","The forest"],["bakeoff","The bake-off"],["chess","The chess match"],["night","The rooftops"],["ice","The ice"],["catwalk","The catwalk"],["storm","The storm"]];
      const GP={hall:"hall",race:"fields",night:"observatory",catwalk:"conservatory",forest:"oldwood",bakeoff:"kitchens",ice:"everlake",storm:"cliffs",chess:"library"};
      art.append(E("h3",{class:"enc-h"},"The Spire Cup"),
        E("p",{class:"enc-p enc-n"},rich(CUP),tag("n")),
        E("div",{class:"enc-grounds"},grounds.map(([k,n])=>{const c=((REL().RV)||[]).filter(r=>r[2]===k).length;return E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go("place:"+GP[k])}},E("b",null,n),E("small",null,c+" rivalries fought here"))})),
        E("p",{class:"enc-note"},"The nine grounds and the rivalries fought on them are canon, from the studio's rivals. ",tag("c")));
      /* dress */
      const setLink=(id,label)=>ENC.pages[id]?lnk(id,label):label;
      art.append(E("h3",{class:"enc-h"},"Robes, regalia and colors"),
        E("p",{class:"enc-p enc-c"},"Every girl has ",setLink("set:academy","House robes")," for every day, ",setLink("set:house-regalia","House regalia")," for ceremonies, her ",setLink("set:group-colors","group's colors")," for contests and feasts, and a ",setLink("set:signature","signature look")," that is entirely her own. Each group has its crest, worn as a brooch, and three colors. ",tag("c")),
        E("p",{class:"enc-p enc-n"},rich(DRESS),tag("n")));
      /* names */
      art.append(E("h3",{class:"enc-h"},"Names and address"),
        E("ul",{class:"enc-list enc-n"},NAMES.map(x=>E("li",null,rich(x))),E("li",{class:"enc-list-tag"},tag("n"))),
        E("p",{class:"enc-note"},"The principals' titles are canon. ",tag("c")));
      /* unwritten rules */
      art.append(E("h3",{class:"enc-h"},"The unwritten rules"),E("ol",{class:"enc-rules"},RULES.map(r=>E("li",null,E("span",{style:{color:"var(--e-ink)"}},rich(r))))),E("p",{class:"enc-note"},"Nobody wrote these down. Everybody knows them. ",tag("n")));
      /* group traditions */
      art.append(E("h3",{class:"enc-h"},"Every group's traditions"),
        E("div",{class:"enc-trads"},ACAD.GROUPS.map(g=>{const L=(ENC.GROUPLORE||{})[g.id]||{};return E("div",{class:"tr",style:{"--gc":vis(g.id)}},
          E("div",{class:"gh"},ENC.crest(g.id,22),lnk("group:"+g.id,g.name),E("i",null,"“"+g.motto+"”")),
          E("ul",null,(L.traditions||[]).map(t=>{const [n,...r]=t.split(": ");return r.length?E("li",null,E("b",null,n),": ",rich(r.join(": "))):E("li",null,rich(t))})))})),
        E("p",{class:"enc-note"},"Mottos are canon; the traditions are new lore. ",tag("n")));
      /* love */
      const APH=new Set(ACAD.ROSTER.apart?ACAD.ROSTER.apart():[]),sgAll=(REL().SG||[]),sgAp=sgAll.filter(([a,b])=>APH.has(a)||APH.has(b)).length;
      const sg=sgAll.length,cross=sgAll.filter(([a,b])=>!APH.has(a)&&!APH.has(b)&&fac(a)!==fac(b)).length;
      art.append(E("h3",{class:"enc-h"},"Love at Everspire"),
        E("p",{class:"enc-p enc-c"},"Every one of the "+ACAD.CT.b("houses")+(ACAD.ROSTER.apart&&ACAD.ROSTER.apart().length?", and every girl of "+ACAD.apartWords()+",":"")+" has a best friend, nearly always inside her own group, and nearly every girl has a girlfriend: ",String(sg)," couples in all, ",String(sgAll.filter(p=>ACAD.ROM&&ACAD.ROM.isSecret(p[4])).length)," of them secret; ",String(cross)," cross the line between Dawn and Dusk",sgAp?", and "+sgAp+" belong to the Synth or the Void, who stand apart from both":"",". Every girl also has a boyfriend on her House's rolls, a student beside her who wears its robes and is wise to be afraid of her friends. ",tag("c")),
        E("p",{class:"enc-p enc-n"},ACAD.lore("culture.hearts","The Academy pretends not to notice any of it, which is the most romantic thing about the place. The Long Gallery, the library stacks after hours and the lighthouse keeper's room are where the Academy's couples are most often not seen. "),lnk("conflicts","Conflicts and Stories")," has every couple that crosses the line.",tag("n")));
      el.append(art)}});

  /* =====================================================================================================
     8. CONFLICTS AND STORIES
     ===================================================================================================== */
  const STAKES={
    "synth|void":"Everspire itself. The Synth hold the ward-lines that keep the old well closed; the Void keep what lies beneath it from waking hungry. Each believes the other is the danger, both are right, and the Academy above them has never noticed a single one of their midnight battles.",
    "coil|legends":"The head table of the great dining hall, which the Legends have held since the first century and the Coil has wanted for four hundred years. The Coil's ledger of slights is nearly full.",
    "pack|pride":"The courtyard steps against the forest trail: sun against moon, order against freedom, and a card game from 1998 that both sides say they won.",
    "deep|frost":"The pool. The Deep owns it; the Frost keeps swimming in it. Every race is a war, and every winter the Deep tries to jump into the Frost's lake first.",
    "grove|talons":"Everything the Grove owns, which the Talons keep stealing, and everything the Talons steal, which the Grove keeps stealing back. Badger keeps a list.",
    "hive|plumes":"The glass conservatory's flowers, which the Plumes call theirs and the Hive calls food. Every Plumes party is a target; every Swarm is a catastrophe."};
  const SEEDS={
    legends:["A gold thread has been unpicked from the Banner Roll, and a graduate's name is gone. Nobody at the head table admits to knowing whose.","Manticore, the newest Legend, has been seen leaving the emerald drawing room.","A challenge issued across the hall at dinner: the head table, staked on a contest of the challenged girl's choosing. Griffin must answer by breakfast."],
    pride:["The Card Game is tomorrow, and the Pack has a new dealer nobody has ever seen.","Cougar is 0 for 31 against Lioness. Her thirty-second challenge is the one she has been saving.","Someone has been sitting on Pride Rock at Golden Hour, and the Pride cannot catch her."],
    pack:["The Long Run goes out at moonrise and does not come back by dawn.","A promise made at the bonfire that cannot be kept without breaking another.","Wolf and Stag, who argue about everything, are sent into the Old Wood together to find something the Academy has lost."],
    frost:["The Everlake will not freeze this winter, and the Frost does not know what it is without First Ice.","The Deep plans to jump into the Polar Plunge at midnight, hours before the Frost.","Orca and Kraken race for the pool, and the judges call it a tie. Neither will accept that."],
    deep:["This year the Glow's single invitation has gone to a girl of the Frost.","Eel finally tells someone how the Deep got into the sealed aquarium wing. It was not a door.","The Drowned Vote splits the Deep down the middle, and Kraken is on the losing side."],
    talons:["A new Talon's Taking goes wrong: the thing she stole from the Grove is the one thing the Grove cannot live without.","Snowy Owl sees something from the Rooftop Watch that she should not have, and the person it concerns saw her see it.","Raven and Stag, the two leaders, are caught alone together under the old oak at night."],
    plumes:["At the Molt, for the first time, somebody outshines Peacock. It is a girl from the Hive.","A Fountain Pledge wish the Plumes cannot, in good conscience, make come true.","The Hive's next Swarm is aimed at the season's grandest gala, and a Plume is the one who told them when."],
    grove:["Badger's list of grudges has been stolen. Everyone on it is very interested in getting it back.","The old oak is ill, and the Grove will not let anyone near it, not even the Headmaster.","Rootday comes for a graduate, and there is no room left in the Old Wood for her tree."],
    coil:["The Coil's ledger has one entry left to balance, and the whole Court of Dusk is waiting to see what it is.","An invitation to the emerald drawing room arrives for a girl of the Order of Dawn.","Viktor Strand and Edmund Kingsley are seen dining together, alone, which has never happened in thirty years."],
    hive:["Royal Jelly, and the queen's choice for her right hand is the girl the rest of the Hive trusts least.","Firefly's good heart runs out of patience with the Swarm.","Bee challenges Peacock on the conservatory catwalk, in front of both groups, for the flowers."]};
  /* v251: stakes, seeds and mysteries as the canon changes layer has them; a new group's or rivalry's are added */
  /* v255: read from the data file */
  if(ACAD.canonApply){ACAD.canonApply("t.stakes",STAKES);ACAD.canonApply("t.seeds",SEEDS)}
  if(ACAD.loreKeys){ACAD.loreKeys("conflicts.stakes.").forEach(k=>{STAKES[k.slice(17)]=ACAD.lore(k,STAKES[k.slice(17)]||"")});ACAD.loreKeys("conflicts.seeds.").forEach(k=>{SEEDS[k.slice(16)]=ACAD.lore(k,SEEDS[k.slice(16)]||[])})}
  ENC.SEEDS=SEEDS;ENC.STAKES=STAKES;
  const MYST=[
    ["What is at the top of the Spire?","Nobody has ever reached it. The stair keeps going.",["place:spire"]],
    ["Who rings the bells?","They ring on equinox nights, and once at midnight when a quarrel is settled. Nobody has ever seen them move.",["place:spire"]],
    ["How old is the Headmaster?","He is in a portrait dated 1726. He says the painter flattered him.",["staff:vael","place:gallery"]],
    ["How did the Deep get into the aquarium wing?","It was sealed for a hundred years. Eel has never said.",["place:aquarium","group:deep"]],
    ["What does the observatory see?","Stars that no other observatory has ever charted, in constellations shaped like the Houses' beasts.",["place:observatory"]],
    ["What does Dean Vey say at tea?","Every year one Dawn girl goes. Most come back thoughtful; one or two have come back changed.",["staff:vey","place:duskward"]],
    ["Why did the Houses wake?","Fifty-six of them in five years, after centuries of sleep. The headmistresses will not say.",["history"]],
    ["Is there still a bell in the lake?","Some students swear that on still nights you can hear one from the middle of the Everlake.",["place:everlake"]]];
  LI251("conflicts.myst",MYST);
  ENC.MYST=MYST;ENC.LORE_DATA["conflicts.myst"]=()=>MYST;
  const GP={hall:"hall",race:"fields",night:"observatory",catwalk:"conservatory",forest:"oldwood",bakeoff:"kitchens",ice:"everlake",storm:"cliffs",chess:"library"};
  const GN={hall:"the great hall",race:"the race",forest:"the forest",bakeoff:"the bake-off",chess:"the chess match",night:"the rooftops",ice:"the ice",catwalk:"the catwalk",storm:"the storm"};
  sec("conflicts").page="conflicts";
  ENC.page("conflicts",{title:"Conflicts and Stories",short:"Conflicts",sec:"conflicts",crumbs:[],
    searchText:()=>"rivalry rivals feud secret girlfriends mysteries story seeds "+Object.values(STAKES).join(" ")+" "+Object.values(SEEDS).flat().join(" ")+" "+MYST.map(m=>m[0]+" "+m[1]).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Conflicts and Stories"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.conflicts","Everspire is a castle full of people who want things from each other: tables, trophies, flowers, pools, secrets and girls. This chapter is a map of the trouble, from the faction war down to the smallest grudge, and a shelf of stories waiting to be told."),tag("n")));
      /* Dawn and Dusk */
      art.append(E("h3",{class:"enc-h"},"Dawn against Dusk"),
        E("div",{class:"enc-dd"},ENC.FACTIONS.map(f=>E("a",{href:"#",style:{background:`linear-gradient(135deg,${f.cols.a},${f.cols.b})`,color:f.cols.ink},onclick:ev=>{ev.preventDefault();ENC.go("faction:"+f.id)}},
          E("b",null,f.name),E("span",null,f.tagline?f.tagline:f.id==="dawn"?"Tradition, protection and the open hand. Wants to keep what it has.":"Ambition, secrets and the closed fist. Wants what Dawn has.")))),
        E("p",{class:"enc-p enc-n"},ACAD.lore("conflicts.accord","The Accord of 1726 keeps the peace: Dawn keeps the light, Dusk keeps the rest, and the Headmaster keeps them both. Nobody breaks it openly. Everybody bends it. Every one of the five great rivalries runs across the line, and so do many of the Academy's loves. The oldest rivalry of all, between the Synth and the Void, runs along no line at all: it is older than the Accord, older than the Houses, and nobody but the Headmaster knows how it began."),tag("n")));
      /* the five great rivalries */
      art.append(E("h3",{class:"enc-h"},"The great rivalries"),E("p",{class:"enc-note"},"Five across the line between Dawn and Dusk, and the Synth against the Void, apart from both. Groups, leaders, principals and ground are canon; what is at stake is new lore. ",tag("c")));
      const seen=new Set();
      ACAD.GROUPS.forEach(g=>{const r=G(g.rival);if(!r)return;const k=[g.id,r.id].sort().join("|");if(seen.has(k))return;seen.add(k);
        const [a,b]=ENC.factionOf(g.id)&&ENC.factionOf(g.id).id==="dawn"?[g,r]:[r,g];
        const ca=ENC.crestCols(a.id),cb=ENC.crestCols(b.id),Pa=(ACAD.PRINCIPALS||{})[a.id],Pb=(ACAD.PRINCIPALS||{})[b.id];
        const sc=[["rgshow","Showdown"],["rgtruce","Truce mixer"],["rgfeud","Leaders' feud"]].map(([p,n])=>[ENC.loadBtn(p+a.id,n+" ("+a.name.replace(/^The /,"")+")"),ENC.loadBtn(p+b.id,n+" ("+b.name.replace(/^The /,"")+")")]).flat().filter(Boolean);
        art.append(E("div",{class:"enc-vs"},
          E("div",{class:"top",style:{background:`linear-gradient(90deg,${ca.field} 0%,${ca.field} 38%,${cb.field} 62%,${cb.field} 100%)`}},
            E("a",{href:"#",class:"vside",style:{color:ENC.inkOn(ca.field)},onclick:ev=>{ev.preventDefault();ENC.go("group:"+a.id)}},ENC.crest(a.id,56),E("b",null,a.name),E("small",null,a.leader?"Led by "+HN(a.leader):"No leader yet")),
            E("span",{class:"v"},"against"),
            E("a",{href:"#",class:"vside r",style:{color:ENC.inkOn(cb.field)},onclick:ev=>{ev.preventDefault();ENC.go("group:"+b.id)}},ENC.crest(b.id,56),E("b",null,b.name),E("small",null,b.leader?"Led by "+HN(b.leader):"No leader yet"))),
          E("div",{class:"body"},
            E("p",{class:"enc-p"},E("b",null,"Ground. "),"They clash "+((ACAD.GTURF||{})[k]||"wherever they meet")+".",tag("c")),
            E("p",{class:"enc-p"},E("b",null,"At stake. "),rich(STAKES[k]||""),tag("n")),
            E("p",{class:"enc-p"},E("b",null,"The leaders. "),...who(a.leader)," and ",...who(b.leader),", nose to nose.",tag("c")),
            Pa&&Pb?E("p",{class:"enc-p"},E("b",null,"The principals. "),lnk("principal:"+a.id,Pa.full)," and ",lnk("principal:"+b.id,Pb.full),", who carry the feud into the faculty room.",tag("c")):null,
            sc.length?E("div",{class:"enc-loads"},sc):null)))});
      /* forbidden loves */
      const APX=new Set(ACAD.ROSTER.apart?ACAD.ROSTER.apart():[]),apSG=(REL().SG||[]).filter(([a,b])=>APX.has(a)||APX.has(b));
      const crossSG=(REL().SG||[]).filter(([a,b])=>!APX.has(a)&&!APX.has(b)&&fac(a)&&fac(b)&&fac(a)!==fac(b));
      art.append(E("h3",{class:"enc-h"},"Across the line"),
        E("p",{class:"enc-p enc-c"},String(crossSG.length)," couples cross the line between Dawn and Dusk, ",String(crossSG.filter(p=>ACAD.ROM&&ACAD.ROM.isSecret(p[4])).length)," of them in secret. The Romance scenes in ",lnk("restricted","the Scene Archive")," load with any couple. ",tag("c")),
        E("div",{class:"enc-loves"},crossSG.map(([a,b,ta,,ty])=>E("div",{class:"lv"},E("div",{class:"who"},...who(a),E("span",{class:"amp"},"and"),...who(b)),E("small",{class:"lvk"},ACAD.ROM?ACAD.ROM.plural(ty):""),ta?E("p",null,ta):null))));
      /* v249: the loves of those who stand apart */
      if(apSG.length)art.append(E("h3",{class:"enc-h"},"Beyond the Academy"),
        E("p",{class:"enc-p enc-c"},String(apSG.length)," couples belong to "+ACAD.apartWords()+", who stand apart from Dawn and Dusk: ",(()=>{const inn=apSG.filter(([a,b])=>APX.has(a)&&APX.has(b)).length;return inn===apSG.length?"every one of them between the Lattice and the Starless Court, which is the best-kept secret in the castle. ":inn+" between the Lattice and the Starless Court and "+(apSG.length-inn)+" reaching into the Houses. "})(),tag("c")),
        E("div",{class:"enc-loves"},apSG.map(([a,b,ta,,ty])=>E("div",{class:"lv"},E("div",{class:"who"},...who(a),E("span",{class:"amp"},"and"),...who(b)),E("small",{class:"lvk"},ACAD.ROM?ACAD.ROM.plural(ty):""),ta?E("p",null,ta):null))));
      /* personal rivalries by ground */
      const RV=(REL().RV||[]);const byG={};RV.forEach(r=>{(byG[r[2]]=byG[r[2]]||[]).push(r)});
      art.append(E("h3",{class:"enc-h"},"Every rivalry, by the ground it is fought on"),
        E("p",{class:"enc-note"},String(RV.length)," rivalries between girls, ",String(RV.filter(([a,b])=>fac(a)!==fac(b)).length)," of them across the line. Choose a pair to load their scene. ",tag("c")));
      Object.keys(GN).forEach(gk=>{const rs=byG[gk];if(!rs||!rs.length)return;
        art.append(E("div",{class:"enc-setgrp"},E("div",{class:"gh"},lnk("place:"+GP[gk],GN[gk][0].toUpperCase()+GN[gk].slice(1)),E("small",{style:{color:"var(--e-muted)",fontWeight:400}},String(rs.length))),
          E("div",{class:"enc-chips"},rs.map(([a,b])=>{const k="rv1"+a,t=T(k);const okp=t&&ENC.pairHouse&&ENC.pairHouse(t)===b;
            const btn=okp?ENC.loadBtn(k,null,"enc-chip enc-chip-px"):E("button",{type:"button",class:"enc-chip enc-chip-px",onclick:()=>ENC.go("house:"+a)});
            btn.textContent="";btn.append(px(a,18),E("span",null,HN(a)+" vs "+HN(b)));const g=ACAD.GROUP_OF(a);btn.style.setProperty("--gc",vis(g?g.id:""));return btn}))))});
      /* mysteries */
      art.append(E("h3",{class:"enc-h"},"Mysteries"),E("p",{class:"enc-note"},"None of these has an answer in the Encyclopedia. Yours may. ",tag("n")),
        E("dl",{class:"enc-open"},MYST.map(([q,a,ls])=>[E("dt",null,q),E("dd",null,rich(a)," ",(ls||[]).map(linkTo).filter(Boolean).map((x,i)=>[i?" · ":"",x]))])));
      /* story seeds */
      art.append(E("h3",{class:"enc-h"},"Story seeds"),E("p",{class:"enc-note"},"Three for every group, each one a beginning. ",tag("n")),
        E("div",{class:"enc-seeds"},ACAD.GROUPS.map(g=>E("div",{class:"sd",style:{"--gc":vis(g.id)}},E("div",{class:"gh"},ENC.crest(g.id,20),lnk("group:"+g.id,g.name)),E("ul",null,(SEEDS[g.id]||[]).map(s=>E("li",null,/\[\[/.test(s)?rich(s):ENC.linkNames(s))))))));
      el.append(art)}});

  /* group pages: their story seeds */
  ACAD.GROUPS.forEach(g=>{const pg=ENC.pages["group:"+g.id];if(!pg||!pg.build)return;const ob=pg.build;
    pg.build=el=>{ob(el);const mainCol=el.querySelector(".enc-cols>div");if(!mainCol||!(SEEDS[g.id]||[]).length)return;
      mainCol.append(E("h3",{class:"enc-h"},"Stories waiting to happen"),E("ul",{class:"enc-list enc-n"},SEEDS[g.id].map(s=>E("li",null,/\[\[/.test(s)?rich(s):ENC.linkNames(s))),E("li",{class:"enc-list-tag"},tag("n"))),
        E("p",{class:"enc-note"},"More in ",lnk("conflicts","Conflicts and Stories"),"."))}});

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss228";st.textContent=`
#encDlg .enc-year{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin:8px 0 14px}
#encDlg .enc-year .season{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:12px;padding:12px 14px;border-top:6px solid var(--sc)}
#encDlg .enc-year .autumn{--sc:#c46a2b}#encDlg .enc-year .winter{--sc:#6aa6d8}#encDlg .enc-year .spring{--sc:#5f9e5a}#encDlg .enc-year .summer{--sc:#d8a93a}#encDlg .enc-year .always{--sc:#6c4fa3}
#encDlg .enc-year h4{font-family:var(--e-serif);font-size:22px;margin:0 0 8px}
#encDlg .enc-year .ev{padding:8px 0;border-top:1px solid var(--e-vellum2)}
#encDlg .enc-year .ev b{display:block;font-size:15px}
#encDlg .enc-year .ev small{display:block;color:var(--sc);font-weight:600;font-size:12px;margin:1px 0 3px}
#encDlg .enc-year .ev p{margin:0 0 4px;font-size:13.5px;line-height:1.5}
#encDlg .enc-year .lk{font-size:12.5px}
#encDlg .enc-grounds{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin:8px 0}
#encDlg .enc-grounds a{background:var(--e-night2);color:#efe9da;border-radius:10px;padding:10px 12px;text-decoration:none;border:1px solid #343a6a}
#encDlg .enc-grounds a:hover{border-color:var(--e-gold)}
#encDlg .enc-grounds b{display:block;font-family:var(--e-serif);font-size:18px;color:#f1e3c4}
#encDlg .enc-grounds small{color:#b9b4d6;font-size:12px}
#encDlg .enc-trads{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin:8px 0}
#encDlg .enc-trads .tr,#encDlg .enc-seeds .sd{background:var(--e-card);border:1px solid var(--e-vellum2);border-left:5px solid var(--gc);border-radius:10px;padding:10px 14px}
#encDlg .enc-trads .gh,#encDlg .enc-seeds .gh{display:flex;gap:8px;align-items:center;font-weight:600;flex-wrap:wrap}
#encDlg .enc-trads .gh i{font-family:var(--e-serif);font-weight:500;color:var(--e-muted)}
#encDlg .enc-trads ul,#encDlg .enc-seeds ul{margin:6px 0 0;padding-left:18px;font-size:13.5px;line-height:1.55}
#encDlg .enc-trads li,#encDlg .enc-seeds li{margin:0 0 5px}
#encDlg .enc-seeds{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin:8px 0}
#encDlg .enc-dd{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0}
#encDlg .enc-dd a{border-radius:12px;padding:16px 18px;text-decoration:none}
#encDlg .enc-dd b{display:block;font-family:var(--e-serif);font-size:24px}
#encDlg .enc-dd span{font-size:14px;opacity:.9}
#encDlg .enc-vs{border:1px solid var(--e-vellum2);border-radius:14px;overflow:hidden;margin:14px 0;background:var(--e-card)}
#encDlg .enc-vs .top{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px 18px;gap:10px}
#encDlg .enc-vs .vside{display:flex;flex-direction:column;align-items:flex-start;text-decoration:none;gap:2px}
#encDlg .enc-vs .vside.r{align-items:flex-end;text-align:right}
#encDlg .enc-vs .vside b{font-family:var(--e-serif);font-size:24px;line-height:1.1}
#encDlg .enc-vs .vside small{font-size:12.5px;opacity:.85}
#encDlg .enc-vs .v{font-family:var(--e-serif);font-style:italic;font-size:20px;color:#fff;background:rgba(0,0,0,.35);border-radius:20px;padding:4px 14px}
#encDlg .enc-vs .body{padding:10px 18px 14px}
#encDlg .enc-vs .body .enc-p{margin:0 0 6px}
#encDlg .enc-vs .body img{vertical-align:middle;margin:0 4px 0 2px}
#encDlg .enc-loves{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:8px;margin:8px 0}
#encDlg .enc-loves .lv{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:10px;padding:10px 12px;background-image:linear-gradient(90deg,#f7d39a33,#4b358622)}
#encDlg .enc-loves .who{display:flex;gap:4px;align-items:center;flex-wrap:wrap;font-weight:600}
#encDlg .enc-loves .amp{font-family:var(--e-serif);font-style:italic;font-weight:500;color:var(--e-muted);margin:0 4px}
#encDlg .enc-loves p{margin:4px 0 0;font-size:13.5px;line-height:1.5;font-family:var(--e-serif);font-style:italic;font-size:16px}
@media (max-width:860px){#encDlg .enc-dd{grid-template-columns:1fr}#encDlg .enc-vs .vside b{font-size:18px}}`;
  document.head.append(st);
})();

/* ---- v229: the Roll of Sleeping Houses (data). Two hundred Houses in twenty lost groups, each with its allegiance
   (Dawn, Dusk or Unsworn), the living group it is kin to, a motto, its old haunt, its colors (hex for the crest, words
   for a palette), an emblem for its crest, and a line of lore for every House: when it fell asleep and what is
   remembered of it. All of it is new lore, written for original characters to claim. ---- */
(function(){
  if(typeof ENC==="undefined")return;
  /* emblems: 8 wide, 7 tall, "e" the mark and "f" its highlight, set into the shield's field */
  const EM={
    horseshoe:["..eeee..",".ee..ee.","ee....ee","ee....ee","ee....ee","ef....fe","ee....ee"],
    note:["....eee.","....e.ee","....e...","....e...",".eeee...","eeeee...",".eee...."],
    sun:["...ee...",".e.ee.e.","..eeee..","eeeffeee","..eeee..",".e.ee.e.","...ee..."],
    apple:["....e...","...e.ff.",".eeeeee.","eeeeeeee","eeeffeee",".eeeeee.","..ee.ee."],
    anchor:["...ee...","..e..e..","...ee...","eeeeeeee","...ee...","e..ee..e",".eeeeee."],
    acacia:["eeeeeeee",".eeeeee.","...ee...","...ee...","...ee...","..eeee..","ffffffff"],
    lily:["...ee...","..eeee..","e.eeee.e","ee.ee.ee","eeeeeeee","...ee...","..eeee.."],
    bat:["e......e","ee.ee.ee","eeeeeeee","eeeffeee","e.eeee.e","...ee...","........"],
    eye:["..eeee..",".e....e.","e..ff..e","e.ffff.e","e..ff..e",".e....e.","..eeee.."],
    horn:["e.......","ee......",".eee....","..eeeee.","...eeeee","....eefe","......ee"],
    ouroboros:["..eeee..",".ee..ee.","ee....ee","e......e","ee....fe",".ee..ef.","..eeee.."],
    mask:["eeeeeeee","e..ee..e","e..ee..e","eeeeeeee",".eeeeee.","..e..e..","........"],
    pyramid:["...ee...","..eeee..","..efee..",".eeeeee.",".eeeeee.","eeeeeeee","ffffffff"],
    cauldron:[".e....e.","eeeeeeee","eeeffeee","eeeeeeee",".eeeeee.","..eeee..",".e....e."],
    star:["...ee...","...ee...","eeeeeeee",".eeffee.","..eeee..",".ee..ee.","ee....ee"],
    tusks:["e......e","e......e","ee....ee",".e....e.",".ee..ee.","..e..e..","..e..e.."],
    leaf:["......ee","....eeee","..eeeeee",".eeeffe.","eeeeee..","eee.....","e......."],
    peak:["...e....","..efe...","..eeee.e",".eeeeeee",".eeeeeee","eeeeeeee","eeeeeeee"],
    toadstool:["..eeee..",".efeefe.","eeeeeeee","...ee...","...ee...","..eeee..","........"],
    hearth:["...e....","..ee.e..","..eeee..",".eeffee.",".effffe.","eeeeeeee","e......e"]};
  /* [id, name, allegiance, kin (a living group or ""), kind, motto, old haunt, colors {a field, b band, e mark, f highlight},
      palette words [primary, secondary, third], emblem, story, [[House, asleep since, lore], ...]] */
  const R=[
  ["herd","The Herd","dawn","pride","Hoofed beasts of the open field","Run together.","The old stables and the long riding meadow",{a:"#7a4a26",b:"#e3c27a",e:"#f3e6c8",f:"#ffffff"},["chestnut brown","wheat gold","cream"],"horseshoe",
    "The Herd kept the Academy's horses and its great spring races for three centuries, and rode for Dawn on the Night Walk to bring the Pack back. They never caught them. One by one their Houses fell quiet after the stables were rebuilt, as if the new stone did not suit them.",
    [["Mustang","1871","Her last Keeper rode out through the gate on a bet and the door locked behind her; the bet was never settled."],
     ["Zebra","1802","Famous for refusing to wear any color but her own two, even at Founders' Night."],
     ["Gazelle","1913","The fastest runner in the Academy's records still holds the meadow mile from this House."],
     ["Bison","1744","Its Keepers were the Herd's shield; one of them held the stable door for a night against the Pack."],
     ["Moose","1820","A solitary House, its door at the far end of the meadow; its headmistress is said to have outlived three principals."],
     ["Elk","1890","Its Keeper's bugle call opened every spring race; the bugle hangs over the stable door still."],
     ["Pronghorn","1934","The last House of the Herd to sleep; its Keeper left a note on the door: back soon."],
     ["Okapi","1768","So shy a House that some years nobody knew who its Keeper was until Graduation."],
     ["Impala","1886","Its Keepers were dancers, and the Herd's spring ball was held in their honor."],
     ["Kudu","1801","Known for spiral-horned regalia and a Keeper who never once lost her temper."]]],
  ["choir","The Choir","dawn","plumes","Songbirds","Wake the morning.","The bell tower loft",{a:"#2f6f8f",b:"#f2d16b",e:"#fdf7e3",f:"#ffffff"},["sky blue","buttercup yellow","ivory"],"note",
    "The Choir sang the morning in from the bell tower loft for six hundred years, and for most of that time the Academy woke to them rather than to the bells. When the bells began to ring on their own, the Choir fell silent House by House, as if they had been answered.",
    [["Nightingale","1704","The last Keeper sang through the night of the Accord and stopped at dawn; the House has been silent since."],
     ["Skylark","1650","Its Keepers sang from the top of the bell tower, higher than anyone else dared climb."],
     ["Robin","1876","A small, brave House with a red door that the Grove still paints every winter."],
     ["Wren","1702","Tiny and loud; its last Keeper won a shouting match with a dean."],
     ["Canary","1911","Its Keeper sang in the old mines beneath the crag, and came back up, which no one else did."],
     ["Goldfinch","1793","The Choir's treasurer, back when the Choir had treasure."],
     ["Bluebird","1856","Said to bring luck to any Keeper who passes its door on the way to an exam."],
     ["Mockingbird","1688","Could sing any House's song so well that the House answered her."],
     ["Swallow","1899","Every spring its Keeper came back to the same eave; one spring she did not."],
     ["Oriole","1820","Its Keepers wove the bell tower's banners, and the knots still hold."]]],
  ["gilded","The Gilded","dawn","legends","Guardian beasts of gold and sky","Stand watch.","The Gilded Gate, the old east entrance under the Sunward Wing",{a:"#8a6a1c",b:"#f6e3a3",e:"#fff6d8",f:"#ffffff"},["burnished gold","pale gold","white"],"sun",
    "Before the Legends were ten, the Gilded were the Academy's guardians: great beasts out of every old story that stood watch at its gates. They were Dawn's oldest allies. Their Houses had been falling quiet one by one since before the Night Walk; when the Gilded Gate was bricked up during the Long Quarrel, most of the rest fell asleep standing, and the Legends have kept their table set ever since.",
    [["Hippogriff","1726","Its Keeper flew the Accord's terms from one wing to the other when neither dean would carry them."],
     ["Roc","1688","The largest House on the Roll; its door is twice the height of any other."],
     ["Thunderbird","1714","Storms over the Everlake are still said to be this House turning in its sleep."],
     ["Simurgh","1690","Its Keepers were the Academy's healers, and some say the infirmary was built around its nest."],
     ["Fenghuang","1677","Only ever woke in years of peace, which is why it slept through the Long Quarrel."],
     ["Garuda","1660","The Coil's oldest enemy before the Legends: no serpent ever passed its door."],
     ["Lamassu","1712","Stood guard at the Gilded Gate; when the gate was bricked up, the House fell silent the same night."],
     ["Firebird","1739","Its last Keeper's single feather lit the great hall for a whole winter."],
     ["Baku","1702","Ate the Academy's nightmares, its Keepers claimed; nobody slept well for a year after it went quiet."],
     ["Haetae","1645","Judged disputes before the bells did, by sitting very still until somebody confessed."]]],
  ["orchard","The Orchard","dawn","grove","Small beasts of hedge and orchard","Keep the harvest.","The old walled orchard below the greenhouse",{a:"#5b7d2e",b:"#e8a14a",e:"#fff1d8",f:"#ffffff"},["moss green","apple red","honey gold"],"apple",
    "The Orchard tended the walled orchard below the greenhouse and fed the Academy every autumn for four centuries. They were the Grove's cousins and best customers. When the orchard wall fell in the great storm of 1888, the last of their Houses went to sleep in it, and the Grove has been replanting the trees ever since, slowly, in case.",
    [["Dormouse","1888","Slept through more than the storm; its last Keeper is said to have slept through her own graduation."],
     ["Mole","1840","Dug the tunnels under the orchard that the Talons still use without asking."],
     ["Chipmunk","1888","Kept the Academy's winter stores, and a second, secret store nobody ever found."],
     ["Beaver","1871","Built the orchard's sluice and the Everlake's first jetty, and both still stand."],
     ["Porcupine","1795","A prickly House that only let in Keepers who could take a joke."],
     ["Skunk","1832","The Academy's best-kept secret weapon in the Pack wars, and the least asked for."],
     ["Possum","1888","Its Keepers played dead in every exam they did not want to sit; it never worked."],
     ["Marten","1776","Quick and clever, the Orchard's thief, and on excellent terms with the Talons."],
     ["Wombat","1888","Its door is round and low, and the Grove leaves a cup of tea on its step every Rootday."],
     ["Harvest Mouse","1888","The smallest door on the whole Roll, set into the orchard wall at ankle height."]]],
  ["tide","The Tide","dawn","frost","Gentle beasts of shore and open sea","Come back with the tide.","The old boathouse and the sea stair under the cliffs",{a:"#1f5f7a",b:"#9ad1d4",e:"#eaf7f7",f:"#ffffff"},["sea blue","seafoam","pearl white"],"anchor",
    "The Tide kept the sea stair, the lighthouse and the boats, and every summer they rowed the whole Academy out to the cliffs for the Midsummer swim. The Frost learned to swim from them. When the lighthouse was given its lamp and needed no keepers, the Tide went quietly out, House by House, like the water.",
    [["Manatee","1855","The gentlest House on the Roll; its last Keeper taught half the Frost to float."],
     ["Walrus","1790","Its Keepers were the Academy's champion wrestlers and its loudest singers."],
     ["Sea Lion","1866","Barked the boats home through fog; the lighthouse horn still sounds like her."],
     ["Pelican","1812","Carried the post up the sea stair for a century and never lost a letter."],
     ["Albatross","1729","Its Keeper sailed around the world and came back to sit her final exams."],
     ["Gull","1897","A rowdy House, banned from the great hall twice for stealing breakfasts."],
     ["Starfish","1840","Its Keepers could not be kept down; one regrew her reputation three times."],
     ["Humpback","1771","Its song could be heard from the lake on still nights, long after it slept."],
     ["Crab","1888","Sideways in every argument and always, somehow, right."],
     ["Swordfish","1820","The Tide's fencing champion; she taught the Legends' first duelists."]]],
  ["savanna","The Savanna","dawn","pride","Great beasts of the golden plains","Stand tall.","The south lawns and the old sun pavilion",{a:"#a0662a",b:"#f0cf7a",e:"#fff2d1",f:"#ffffff"},["savanna gold","burnt sienna","sand beige"],"acacia",
    "The Savanna came late, in the age of the great voyages, and brought the warmth of the south lawns with them. The Pride sat at their feet in the sun pavilion and learned to rule a courtyard. Their last Houses slept when the pavilion burned in 1919, and the Pride took the courtyard steps instead.",
    [["Elephant","1919","Remembered everything, including every slight; the Coil tried to buy her ledger."],
     ["Rhino","1904","Charged a dean once, by accident, and was forgiven, on purpose."],
     ["Hippo","1919","The Savanna's queen, and much more dangerous than she looked."],
     ["Giraffe","1887","Could see over the conservatory roof, and told the Plumes so."],
     ["Meerkat","1919","Kept watch on the south lawns in shifts; the Talons learned the trick from her."],
     ["Ostrich","1876","Fastest legs in the Academy before the Herd's Gazelle; the two never raced."],
     ["Wildebeest","1898","Every year her House migrated rooms, and every year the porters lost her."],
     ["Buffalo","1919","Fought a lion of the Pride to a standstill and then made her laugh."],
     ["Secretary Bird","1863","The Academy's archivist for forty years; her filing system defeated everyone after her."],
     ["Hornbill","1901","The Savanna's herald, whose booming call opened every feast on the south lawns."]]],
  ["blazon","The Blazon","dawn","legends","Beasts that live only in heraldry","Hold the line.","The Herald's Hall above the Long Gallery",{a:"#2b2f6b",b:"#c9a54a",e:"#f2e6c3",f:"#ffffff"},["royal blue","antique gold","parchment"],"lily",
    "Some beasts exist only on banners. The Blazon were their Houses: strange, stately creatures out of the heraldic rolls, keepers of the Academy's colors, crests and ceremonies. The Herald's Hall was theirs. When the Academy stopped painting new crests, the Blazon stopped waking, and the hall has been locked with their banners inside.",
    [["Yale","1708","Her horns swiveled to face any threat; the Blazon's champion at every joust."],
     ["Enfield","1690","Fox's head and eagle's talons, and a Keeper with a temper to match."],
     ["Opinicus","1698","Painted every crest in the Herald's Hall, and never signed one."],
     ["Calygreyhound","1712","The swiftest beast in heraldry; its Keeper carried messages for the Accord."],
     ["Allocamelus","1695","Half camel, half something else; nobody ever agreed what."],
     ["Tyger","1734","Not a tiger: the heraldic beast with a lion's mane and a wolf's snout, and very touchy about the difference."],
     ["Bagwyn","1702","Antelope-bodied and horse-tailed; its Keepers designed the Academy's regalia."],
     ["Pantheon","1725","Spotted with stars, the Blazon's night-watch; it slept in the Long Quarrel's last winter."],
     ["Alphyn","1718","Wolf-like and knot-tailed; tied the Herald's Hall's banners in knots nobody can undo."],
     ["Musimon","1700","Goat and ram at once; the Blazon's peacemaker, which was the Blazon's least popular job."]]],
  ["nightcourt","The Night Court","dusk","coil","Creatures of the dark hours","The night is ours.","The undercroft beneath the Duskward Wing",{a:"#2a1b3d",b:"#9b6ad1",e:"#e6d6ff",f:"#ffffff"},["midnight purple","violet","silver"],"bat",
    "The Night Court held the hours between midnight and dawn, when the rest of the Academy slept, and ran a court of their own in the undercroft beneath the Duskward Wing. They were the first Houses to follow the Pack out on the Night Walk. They have slept since the undercroft flooded, and some say they are only waiting for a dark enough night.",
    [["Bat","1771","Its Keeper mapped every passage under the castle by sound, and burned the map."],
     ["Vampire Bat","1740","Held court in the undercroft until dawn; her invitations were written in red ink."],
     ["Flying Fox","1803","The Night Court's ambassador to the Pack, which mostly meant drinking with them."],
     ["Nightjar","1760","Sang only after midnight; her song is the reason for the Academy's curfew."],
     ["Loris","1822","Slow, sweet and venomous; a Keeper nobody hurried twice."],
     ["Aye-aye","1777","Tapped on doors at night, and whoever answered had a year of bad luck."],
     ["Tarsier","1801","Huge-eyed, she saw everything in the dark and remembered it all."],
     ["Kinkajou","1838","Raided the Choir's honey every night for a decade and was never caught."],
     ["Civet","1765","The Night Court's perfumer; Dusk still wears her scent at its balls."],
     ["Genet","1790","Climbed the Duskward Wing's outer wall every night for a bet she kept winning."]]],
  ["abyss","The Abyss","dusk","deep","Monsters of the deep sea","Beneath everything.","The drowned crypt under the aquarium wing",{a:"#0f2133",b:"#3fb6a8",e:"#c9fff4",f:"#ffffff"},["abyssal navy","bioluminescent teal","pale aqua"],"eye",
    "Below the aquarium wing there is a crypt the lake reclaimed, and below the crypt there is the Abyss. Its Houses were the Deep's elders and its nightmares, strange things from the bottom of the sea. When the aquarium wing was sealed a century ago, the last of them were sealed in with it. The Deep reopened the wing. Nobody has reopened the crypt.",
    [["Anglerfish","1924","Lit her own way through the crypt with a lantern no one could find a wick for."],
     ["Giant Squid","1924","Its Keeper wrestled the Kraken's Keeper of her day and the match was called a draw."],
     ["Oarfish","1890","Long, silver and ominous; her appearances were said to foretell storms."],
     ["Viperfish","1924","Smiled with too many teeth, and the Coil adored her."],
     ["Barracuda","1878","Raced the Tide's Swordfish every year; the results are disputed."],
     ["Moray","1911","Hid in the crypt's arches and bit anyone who bored her."],
     ["Lionfish","1902","Beautiful, venomous, and thrown out of three Plumes parties."],
     ["Stingray","1897","Flat calm until provoked; the Abyss's enforcer."],
     ["Hammerhead","1924","Saw in two directions at once and trusted neither."],
     ["Nautilus","1650","The oldest House of the Abyss, its shell-door spiraled shut before the Night Walk."]]],
  ["wildhunt","The Wild Hunt","dusk","pack","Black hounds of myth and the hunting dark","Ride with us.","The hound kennels at the edge of the Old Wood",{a:"#1a1a1d",b:"#c23b2a",e:"#f0e0d0",f:"#ffffff"},["coal black","blood red","bone white"],"horn",
    "The Wild Hunt rode out on the Night Walk at the Pack's heels and never stopped riding. They were the hounds of every dark story, and every stormy night they hunted the Old Wood with horns. The Accord forbade the Hunt in 1726, and its last Houses lay down in their kennels that winter and have not got up.",
    [["Cerberus","1726","Guarded the gate between the Old Wood and the grounds; three locks on her door, and all of them hers."],
     ["Orthrus","1726","The Hunt's second hound, always one step behind Cerberus and never once out of step."],
     ["Barghest","1680","Appeared at the gate the night before a quarrel turned into a feud."],
     ["Black Shuck","1726","Walked the sea cliffs in storms; the Tide would not row while she was out."],
     ["Fenrir","1711","Chained, by tradition, to her House's table at feasts, and she broke the chain every year."],
     ["Warg","1699","The Hunt's rider of wolves, and the Pack's bitterest rival for its leadership."],
     ["Garm","1726","Barked once at the Accord's signing, and the bells answered."],
     ["Cù Sìth","1706","A great green hound of the Hollow Hills who went over to the Hunt for love."],
     ["Amarok","1720","Hunted alone, as the old stories say, and was never seen in the great hall."],
     ["Gytrash","1700","Haunted the lonely roads to Everhythe and walked lost candidates home."]]],
  ["wyrms","The Wyrms","dusk","coil","Serpents and dragons of the old dark","Coil and wait.","The Wyrm Stair, a sealed spiral under the Duskward Wing",{a:"#1f3b26",b:"#b3d94a",e:"#efffc9",f:"#ffffff"},["serpent green","venom lime","bone"],"ouroboros",
    "Long before Serpent's drawing room, the Wyrms coiled in the dark of the Wyrm Stair: basilisks, hydras and lindworms, the cold old monsters of the Coil's own stories. They lent the Coil its patience and its ledger. They fell asleep one by one waiting for the ledger to balance, and the Coil insists they will wake when it does.",
    [["Basilisk","1615","Her stare was said to turn rivals to stone; in practice, it turned them very quiet."],
     ["Hydra","1702","For every rival she drove off, two more appeared; she enjoyed that."],
     ["Wyvern","1688","Two-legged and fierce, the Wyrms' messenger across the Duskward roofs."],
     ["Cockatrice","1660","Hatched, the story goes, from a ledger entry; the Coil does not deny it."],
     ["Lindworm","1690","Kept the oldest pages of the Coil's ledger, which the Coil would like back."],
     ["Amphisbaena","1721","A head at either end and an opinion from each."],
     ["Naga","1640","The Wyrms' queen, guardian of the Stair's treasure, whatever it was."],
     ["Salamander","1744","Lived in the Duskward hearths and could not be put out."],
     ["Tarasque","1655","Armored and immovable; once sat on the Legends' table for a week."],
     ["Jormungandr","1600","The oldest House of the Wyrms; its banner wraps the whole Stair and its tail is in its mouth."]]],
  ["masquerade","The Masquerade","dusk","pack","Tricksters, mimics and shapeshifters","Never the same twice.","The Masquers' Gallery, the old theater above the Duskward Wing",{a:"#4a1e3a",b:"#e0a83c",e:"#ffeacb",f:"#ffffff"},["plum","gilt","pale gold"],"mask",
    "Every Dusk ball was theirs. The Masquerade were tricksters, mimics and shapeshifters, and for two centuries they ran the Duskward theater and played everyone, including each other. When the theater went dark in 1885 the last of them took their masks off, and nobody has been quite sure since whether they are sleeping or simply in disguise.",
    [["Tanuki","1885","Changed shape at every party and paid for drinks in leaves."],
     ["Púca","1840","Offered rides home from the Everhythe pubs; nobody arrived where they meant to."],
     ["Kumiho","1802","A nine-tailed fox spirit, and Kitsune's oldest rival, from before Kitsune woke."],
     ["Lyrebird","1885","Could perfectly imitate any voice, including the Headmaster's, once."],
     ["Cuckoo","1830","Left her letters in other Houses' post, and her rivals in other Houses' beds."],
     ["Mimic Octopus","1885","Could be anyone at a masked ball, and frequently was."],
     ["Shrike","1790","Pinned her rivals' secrets to the gallery wall for all to read."],
     ["Jackdaw","1856","Stole only from the stage, and every prop she stole turned up in a better play."],
     ["Bakeneko","1820","A cat who walked on two legs at midnight and danced in the theater's empty boxes."],
     ["Nue","1760","Monkey's face, tiger's body, serpent's tail, and nobody ever saw all three at once."]]],
  ["sands","The Sands","dusk","hive","Survivors of the desert","Endure.","The Glass Room, a hall of sand-blown windows on the west side",{a:"#9a5a23",b:"#e9c58c",e:"#fff1da",f:"#ffffff"},["desert ochre","dune beige","terracotta"],"pyramid",
    "The Sands came across the sea in the age of the voyages, with caravans and stories of the deep desert, and made the hot west rooms their own. They were patient, hard to impress and impossible to wear down, and they joined Dusk because Dusk asked first. The Glass Room's windows were shuttered in 1927, and the last of the Sands have slept behind them since.",
    [["Camel","1927","Crossed the moor in a blizzard to bring a dean back, and never let the dean forget it."],
     ["Sand Cat","1912","Small, fierce, and never once seen to drink anything."],
     ["Jerboa","1900","Bounded through the Long Gallery so fast that the portraits complained."],
     ["Sidewinder","1888","Approached every argument from an angle nobody expected."],
     ["Gila Monster","1906","Slow to bite and slower to let go; the Sands' negotiator."],
     ["Roadrunner","1927","Ran the Everhythe road every morning; the town set its clocks by her."],
     ["Oryx","1876","Long-horned and serene; she led the caravans' prayers at sunset."],
     ["Monitor","1919","Watched the Glass Room's door for twenty years and saw everything."],
     ["Thorny Devil","1922","Charming, prickly and impossible to hug."],
     ["Addax","1895","Pale as the dunes, she painted the Glass Room's windows with desert maps."]]],
  ["familiars","The Familiars","dusk","talons","The companions of witches","Bound by choice.","The Witches' Walk, a stone path through the herb gardens",{a:"#24202e",b:"#7fae5a",e:"#e2f0c9",f:"#ffffff"},["shadow black","herb green","candle cream"],"cauldron",
    "Officially, nothing at Everspire is magic. Unofficially, the Familiars kept the herb gardens, brewed the infirmary's remedies and were consulted on matters the handbook does not mention. They chose Dusk because Dawn kept asking them to explain themselves. They have slept since the Witches' Walk was paved over, and the herbs still grow up through the stones.",
    [["Black Cat","1798","Crossed the dean's path every morning for forty years, and the dean never had a bad day."],
     ["Toad","1760","Kept the infirmary's remedies, some of which worked."],
     ["Rook","1777","Ran the Familiars' parliament, which met in the rookery and never adjourned."],
     ["Barn Owl","1810","Carried messages between Houses after curfew for anyone who asked nicely."],
     ["Newt","1801","The Academy's leading authority on potions, and the most often singed."],
     ["Witch Hare","1754","Said to turn into a woman at midnight, or a woman who turned into a hare; she never clarified."],
     ["Weasel","1790","Talked her way out of every punishment and into most of the Familiars' secrets."],
     ["Polecat","1812","Fierce, musky and banned from the library."],
     ["Adder","1770","The Familiars' poisoner, retained for antidotes."],
     ["Deathshead","1798","A great moth with a skull on her back, who came to every funeral and was never invited."]]],
  ["heavens","The Heavens","none","","Beasts of the stars, the sun and the moon","As above.","The old observatory floor, beneath the Talons' dome",{a:"#0d1030",b:"#7a8cff",e:"#e8ecff",f:"#fff4c2"},["star navy","nebula blue","starlight silver"],"star",
    "The Heavens are the oldest entries on the Roll and the strangest: beasts out of the sky, sun-chasers and moon-wolves and a whale that swims between the stars. They were here before the factions and swore to neither. The observatory's uncharted stars are, some say, their Houses' banners, still flying where no one else can see them.",
    [["Sköll","before 1600","The wolf who chases the sun; her Keeper ran from dawn to dusk every midsummer and never caught it."],
     ["Hati","before 1600","The wolf who chases the moon, and Sköll's eternal racing partner."],
     ["Yatagarasu","1620","A three-legged crow of the sun; her Keeper guided lost candidates up the crag at dawn."],
     ["Jade Hare","1640","Pounded medicine on the moon, and in the infirmary when the moon was busy."],
     ["Starwhale","before 1600","Swims between the stars; the observatory once logged it crossing the sky in an hour."],
     ["Rahu","1660","An eclipse with a grudge; every eclipse over the Everlake is said to be her."],
     ["Tianma","1610","A heavenly horse that ran on starlight, and Pegasus's distant cousin."],
     ["Bennu","before 1600","The heron of the first sunrise, who called the Academy's first morning."],
     ["Chrysomallos","1630","The golden ram of the sky, whose fleece was the Academy's first banner."],
     ["Cetus","1650","A sea monster made of stars; the Deep claims her, and so does the Tide."]]],
  ["titans","The Titans","none","","Giants from before the world was young","We were first.","The Titans' Hall, an empty cavern in the crag's roots",{a:"#3e3a33",b:"#b9a27a",e:"#efe6d2",f:"#ffffff"},["stone gray","fossil tan","ivory"],"tusks",
    "The Titans are the Academy's first Houses, if the oldest stories are true: giants from the ages before the world was young, mammoths and sabertooths and creatures of the ancient sea. They slept before there were factions and never swore to either. The Titans' Hall is a cavern in the roots of the crag, and the bones in its walls are not decoration.",
    [["Mammoth","before 1600","Her tusks were carved into the great hall's first doors."],
     ["Smilodon","before 1600","The first great cat; the Pride claims her, and she would hate that."],
     ["Megalodon","before 1600","The Deep's ancestor and the Shark's nightmare; her door is under the lake."],
     ["Cave Bear","before 1600","Slept through a thousand winters, the last of them on purpose."],
     ["Dire Wolf","before 1600","The Pack's oldest story, and the only wolf Wolf respects."],
     ["Megatherium","before 1600","A giant sloth who took a century to finish a sentence and was always right."],
     ["Glyptodon","before 1600","Armored like a tortoise the size of a carriage; immovable in arguments."],
     ["Terror Bird","before 1600","Flightless, enormous and furious about it."],
     ["Pteranodon","before 1600","Rode the cliff winds before there were birds to share them with."],
     ["Triceratops","before 1600","Three horns, one opinion, and it was always no."]]],
  ["wilds","The Wilds","none","","Creatures of the deep green jungle","Grow anywhere.","The old palm house, a ruined glasshouse beyond the conservatory",{a:"#14533a",b:"#e86f3a",e:"#e8ffd6",f:"#ffffff"},["jungle green","parrot orange","leaf yellow"],"leaf",
    "The Wilds filled the old palm house with heat, noise and green, and refused to take a side on the Night Walk because the jungle has never chosen anything. They were the Academy's wildest neighbors and its best gardeners. When the palm house's glass broke in the frost of 1895, the last of them let the jungle die back into sleep with it.",
    [["Sloth","1895","Took three years to cross the palm house and arrived exactly when needed."],
     ["Pangolin","1880","Rolled into a ball at any argument and won every one by waiting."],
     ["Orangutan","1895","The palm house's keeper of the keys, and the cleverest girl in her year."],
     ["Toucan","1870","Loud, bright and the Plumes' only rival for color."],
     ["Harpy Eagle","1860","The jungle's queen of the canopy, and the Talons' envy."],
     ["Ocelot","1888","Spotted, sleek and the Pride's favorite cousin."],
     ["Capybara","1895","Everyone liked her, including creatures who liked nobody."],
     ["Anaconda","1874","The Coil courted her for a decade; she never answered."],
     ["Quetzal","1852","A bird so beautiful the Plumes made her an honorary member, against her will."],
     ["Coati","1890","Led raids on the kitchens with a ringed tail held high like a banner."]]],
  ["peaks","The Peaks","none","frost","Beasts of the high mountains","Above the quarrel.","The High Lodge, a stone hut on the moor's highest tor",{a:"#4b5a6b",b:"#d8e3ea",e:"#ffffff",f:"#bfe3ff"},["slate gray","snow white","glacier blue"],"peak",
    "The Peaks lived on the high moor, in a stone lodge above the clouds, and came down to the Academy only for exams and feasts. When the Academy split into Dawn and Dusk, the Peaks simply stayed up the mountain. They slept when the High Lodge's roof fell in, and climbers on the moor still leave bread on its doorstep.",
    [["Yak","1840","Carried the Lodge's supplies up the tor on her own back, for fun."],
     ["Ibex","1820","Climbed the Spire higher than anyone before or since, and would not say how high."],
     ["Marmot","1866","Whistled warnings across the moor; the Talons stole the idea."],
     ["Pika","1880","Stored hay for the Lodge's winters and gossip for its summers."],
     ["Lammergeier","1790","The great bearded vulture of the cliffs; dropped bones on rivals from a great height."],
     ["Wolverine","1802","Small, ferocious and feared by everyone, including the Wild Hunt."],
     ["Chamois","1850","Danced across the scree faster than anyone could follow."],
     ["Takin","1871","Golden, stubborn and impossible to move from a warm spot."],
     ["Markhor","1830","Spiral-horned and proud; the Peaks' champion at every feast."],
     ["Bighorn","1862","Settled disputes by butting heads, literally, at the top of the tor."]]],
  ["hollowhills","The Hollow Hills","none","grove","Creatures of fairy stories","Mind the rings.","The fairy rings in the Old Wood's clearings",{a:"#3b2a5c",b:"#9fe0a8",e:"#f6eaff",f:"#ffffff"},["twilight violet","fae green","moonlight"],"toadstool",
    "Some Houses were never quite part of the Academy at all. The Hollow Hills kept their doors in the fairy rings of the Old Wood, and a girl who joined them came back to the castle only when she felt like it. They swore to nobody, owed favors to everybody and fell asleep in the rings one by one as the Old Wood was cut back, the last of them in 1898. The rings are still there.",
    [["Kelpie","1868","A water-horse who offered rides across the Everlake; wise girls said no."],
     ["Selkie","1855","Kept a sealskin in her wardrobe and a sweetheart in every harbor."],
     ["Cait Sìth","1868","A great black fae cat who stole souls at wakes, or so the Familiars claimed."],
     ["Wolpertinger","1830","Antlers, wings and fangs; even the Hollow Hills found her a bit much."],
     ["Jackalope","1880","Seen only at dusk and dawn, and only by girls who were lost; she always showed them the way home."],
     ["Questing Beast","1700","Pursued by Keepers of every House for a century; nobody ever caught her."],
     ["Al-mi'raj","1720","A golden horned hare, gentle until someone cornered her."],
     ["Bunyip","1850","Lived in the reeds at the Everlake's far end and boomed at night."],
     ["Tatzelwurm","1820","A cat-faced worm of the mountain passes who came down for the Midsummer ball."],
     ["Hodag","1898","Covered in horns and grinning; she claimed to be a fairy, and nobody could prove otherwise."]]],
  ["hearth","The Hearth","none","","The companions of house and home","We feed everyone.","The castle kitchens, the stables and the old dairy",{a:"#7a3b2e",b:"#f0b65a",e:"#fff0dc",f:"#ffffff"},["hearth red","amber","oatmeal"],"hearth",
    "The Hearth kept the castle's kitchens, stables, dovecotes and fires, and when the Academy split in two they refused to choose a side, because both sides still had to eat. They fed Dawn and Dusk at the same table for a hundred years. They slept when the Academy hired cooks, which the Hearth considered an insult, and the kitchens still leave a bowl out for them on Founders' Night.",
    [["Tabby","1890","Ruled the kitchens from the warmest stone by the oven, and fought the Familiars' Black Cat for it."],
     ["Hound","1870","Followed the deans everywhere and was the only one allowed to."],
     ["Ram","1844","Butted down the dairy door during the Long Quarrel to feed both sides."],
     ["Goat","1855","Ate the Accord's first draft, which is why there is a second."],
     ["Goose","1820","Guarded the gate better than the Gilded ever did, and louder."],
     ["Dove","1726","Carried the Accord's peace from wing to wing; the Hearth's proudest day."],
     ["Donkey","1866","Carried every candidate's trunk up the crag for thirty years and complained about all of them."],
     ["Ferret","1879","Found anything lost in the castle, for a price."],
     ["Llama","1890","Brought from over the sea, unimpressed by all of it, and loved by everyone."],
     ["Alpaca","1890","The Llama's best friend and the softest Keeper in the Academy's history."]]]];
  ENC.ROLL=R.map(([id,name,faction,kin,kind,motto,haunt,cols,words,emblem,story,houses])=>({id,name,faction,kin,kind,motto,haunt,cols,words,emblem:EM[emblem],emblemName:emblem,story,
    houses:houses.map(([n,since,lore])=>({id:n.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,""),name:n,since,lore}))}));
  /* v254: the Roll as the canon changes layer has it (a new lost group too) */
  ENC.ROLL_EMBLEMS=EM;
  if(typeof ACAD!=="undefined"&&ACAD.canonApply)ACAD.canonApply("roll",{roll:ENC.ROLL,EM,slug:n=>String(n||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"")});
})();

/* ---- v229: the Roll of Sleeping Houses (an index by allegiance and a page for each of the twenty lost groups, with a
   crest for every group and a sigil for every House), chapter 9 Original Characters (three ways in, a House finder,
   the steps, the rules) with "Begin a girl" buttons that start a new design in a House's colors, a "second chair" card
   on every living House's page, and the Encyclopedia in the studio's dark mode. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.ROLL||typeof ACAD==="undefined")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,G=ENC.G;
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const sec=id=>ENC.SECTIONS.find(s=>s.id===id);
  const low=n=>String(n||"").replace(/^The /,"the ");
  const ROLL=ENC.ROLL,LOST=Object.fromEntries(ROLL.map(g=>[g.id,g]));
  const FX=id=>ENC.FACTIONS.find(f=>f.id===id);
  const ALLEG=new Proxy({dawn:"Sworn to Dawn",dusk:"Sworn to Dusk",none:"Unsworn"},{get:(o,k)=>o[k]||(FX(k)?"Sworn to "+FX(k).short:"Unsworn")});
  const nH=()=>ROLL.reduce((n,g)=>n+g.houses.length,0);

  /* ---------- crests for the lost groups, sigils for their Houses ---------- */
  const SHIELD=["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaaaaaaaaaao","oaaaaaaaaaaaaaao","oaaaaaaaaaaaaaao","oaaaaaaaaaaaaaao","oaaaaaaaaaaaaaao",
    "oaaaaaaaaaaaaaao","oaaaaaaaaaaaaaao",".oaaaaaaaaaaaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"];
  const cache={};
  function draw(key,rows,cols){if(cache[key])return cache[key];const cv=document.createElement("canvas");cv.width=16;cv.height=16;const x=cv.getContext("2d");
    rows.forEach((row,y)=>{for(let i=0;i<16;i++){const ch=row[i];if(!ch||ch===".")continue;x.fillStyle=cols[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return cache[key]=cv.toDataURL("image/png")}catch(e){return""}}
  const colsOf=g=>({o:"#1d1b22",b:g.cols.b,a:g.cols.a,e:g.cols.e,f:g.cols.f});
  /* v269: the rows of a sleeping group's crest, for a group woken from the Roll to keep as its own */
  ENC.lostCrestRows=id=>{const g=LOST[id];if(!g)return null;const rows=SHIELD.map(r=>r.split(""));g.emblem.forEach((line,r)=>line.split("").forEach((ch,c)=>{if(ch!==".")rows[4+r][4+c]=ch}));return rows.map(r=>r.join(""))};
  ENC.lostCrestURL=id=>{const g=LOST[id];if(!g)return"";const rows=SHIELD.map(r=>r.split(""));
    g.emblem.forEach((line,r)=>line.split("").forEach((ch,c)=>{if(ch!==".")rows[4+r][4+c]=ch}));
    return draw("g:"+id,rows.map(r=>r.join("")),colsOf(g))};
  const hash=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
  ENC.sigilURL=(gid,hname)=>{const g=LOST[gid];if(!g)return"";let h=hash(gid+":"+hname),n=0;const rows=SHIELD.map(r=>r.split(""));
    for(let r=0;r<6;r++)for(let c=0;c<3;c++){h=Math.imul(h^(h>>>15),2246822519)>>>0;const on=(h%100)<52;const hi=(h>>>8)%9===0;
      if(on){n++;const ch=hi?"f":"e";rows[4+r][5+c]=ch;rows[4+r][10-c]=ch}}
    if(n<5){rows[5][7]=rows[5][8]=rows[6][7]=rows[6][8]="e"}
    return draw("h:"+gid+":"+hname,rows.map(r=>r.join("")),colsOf(g))};
  const img=(src,size,cls)=>{const im=E("img",{src,width:size,height:size,alt:"",class:"enc-px"+(cls?" "+cls:"")});return im};
  ENC.lostCrest=(id,size)=>img(ENC.lostCrestURL(id),size||16);
  ENC.sigil=(gid,hname,size)=>img(ENC.sigilURL(gid,hname),size||32,"sigil");

  /* ---------- begin a girl in a House's colors ---------- */
  ENC.beginGirl=(o)=>{
    if(typeof replaceState!=="function"||typeof blankState!=="function")return;
    const st=blankState();try{st.out=JSON.parse(JSON.stringify(S.out));st.layers=JSON.parse(JSON.stringify(S.layers||{}));st.order=(S.order||st.order).slice()}catch(e){}
    st.name=o.name;Object.assign(st.pal,o.pal||{});if(o.bio)st.bio=Object.assign({},o.bio);st.c=Object.assign({},st.c,{age:"young woman",sex:"female"});
    replaceState(st);
    ENC.close();
    if(typeof toast==="function")toast(o.toast||`Started “${o.name}”. Undo brings your previous design back.`)};
  const beginLost=(g,h)=>ENC.beginSleeping?ENC.beginSleeping(g,h):ENC.beginGirl({name:h.name,pal:{primary:g.words[0],secondary:g.words[1],third:g.words[2]},
    toast:`Started a girl for ${h.name} House, in ${low(g.name)}'s colors. Undo brings your previous design back.`});
  const beginWard=hid=>{if(ENC.beginWardBio)return ENC.beginWardBio(hid);const t=T(hid+"robes"),pal=t&&t.pal?Object.assign({},t.pal):{};
    ENC.beginGirl({name:"Ward of "+HN(hid),pal,toast:`Started a ward of ${HN(hid)} House, in its colors. Undo brings your previous design back.`})};
  ENC.beginWard=beginWard;

  /* ---------- the Roll ---------- */
  ENC.NAV_AFTER_GROUPS=[{page:"roll",title:"The Sleeping Houses"}];
  /* every allegiance a lost group can have: each faction, then none */
  const ALLS=()=>ENC.FACTIONS.map(f=>[f.id,"Sworn to "+f.short]).concat([["none","Unsworn"]]);
  const allegPill=g=>{const f=FX(g.faction);return f?lnk("faction:"+f.id,f.name):E("span",null,"Unsworn")};
  ENC.page("roll",{title:"The Roll of Sleeping Houses",short:"The Sleeping Houses",sec:"groups",crumbs:["groups"],kind:"Houses",
    searchText:()=>"sleeping houses roll lost groups dormant wake "+ROLL.map(g=>g.name+" "+g.kind+" "+g.houses.map(h=>h.name).join(" ")).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"The Roll of Sleeping Houses"),
        E("p",{class:"enc-lead enc-n"},ACAD.lore("lead.roll","In the library vault, beside the founders' charter, lies a roll of names written in a thousand years of hands: every House that has ever kept a student and fallen quiet. ")+ACAD.numWords(nH()).replace(/^./,c=>c.toUpperCase())+" of them are still legible. They sleep in "+ACAD.numWords(ROLL.length)+" lost groups, each with its crest, its motto, its old haunt and its allegiance, and any one of them may wake for the right girl.",tag("n")),
        E("p",{class:"enc-p enc-n"},ACAD.lore("roll.allegiance","A lost group's allegiance is the one its waking Houses swore. Houses that fell asleep before the Night Walk are counted with their group, but a girl who wakes one may choose for herself. The Unsworn never chose at all: a girl who wakes an Unsworn House must choose by her first Founders' Night, or keep the old neutrality and answer only to the Headmaster."),tag("n")),
        E("p",{class:"enc-note"},"Every sleeping House has a sigil and a button to begin your own girl in its colors. ",lnk("oc","Original Characters")," has the whole guide."));
      const filt=E("div",{class:"enc-filter",role:"group","aria-label":"Show"});
      const body=E("div");
      const show=k=>{filt.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===k?"true":"false"));
        body.textContent="";ALLS().forEach(([a,t])=>{if(k!=="all"&&k!==a)return;const gs=ROLL.filter(g=>g.faction===a);if(!gs.length)return;
          body.append(E("h3",{class:"enc-h"},t,E("small",null,gs.length+(gs.length===1?" group, ":" groups, ")+gs.reduce((n,g)=>n+g.houses.length,0)+" Houses")),E("div",{class:"enc-lostcards"},gs.map(g=>lostCard(g))))})};
      [["all","All "+ACAD.numWords(ROLL.length)]].concat(ALLS().filter(([a])=>ROLL.some(g=>g.faction===a)).map(([a,t])=>[a,a==="none"?"Unsworn":(FX(a)||{short:a}).short])).forEach(([k,t])=>filt.append(E("button",{type:"button",class:"enc-chip","data-k":k,onclick:()=>show(k)},t)));
      art.append(filt,body);show("all");el.append(art)}});
  function lostCard(g){
    return E("a",{href:"#",class:"enc-lostcard",style:{"--gc":g.cols.a,"--gb":g.cols.b},onclick:ev=>{ev.preventDefault();ENC.go("lost:"+g.id)}},
      E("div",{class:"hd"},ENC.lostCrest(g.id,44),E("div",null,E("b",null,g.name),E("small",null,g.kind))),
      E("i",null,"“"+g.motto+"”"),
      E("div",{class:"sig"},g.houses.map(h=>{const im=ENC.sigil(g.id,h.name,20);im.title=h.name;return im})),
      E("small",{class:"al"},ALLEG[g.faction]+(g.kin&&G(g.kin)?", kin to "+low(G(g.kin).name):"")))}
  ROLL.forEach(g=>ENC.page("lost:"+g.id,{title:g.name,short:g.name,sec:"groups",crumbs:["groups","roll"],kind:"Sleeping Houses",
    searchText:()=>[g.name,g.kind,g.motto,g.haunt,g.story,g.houses.map(h=>h.name+" "+h.lore).join(" ")].join(" "),build:el=>buildLost(el,g)}));
  function buildLost(el,g){
    const ink=ENC.inkOn(g.cols.a),f=FX(g.faction),kin=g.kin&&G(g.kin);
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${g.cols.a} 0%,${g.cols.a} 55%,${g.cols.b} 170%)`,color:ink}},
      E("div",{class:"pat",style:{backgroundImage:`url(${ENC.lostCrestURL(g.id)})`}}),
      E("div",{class:"enc-row"},Object.assign(ENC.lostCrest(g.id,120),{className:"crestbig enc-px"}),
        E("div",null,E("h1",null,g.name),E("p",{class:"kind"},g.kind+". Ten Houses, all asleep."),E("p",{class:"motto"},"“"+g.motto+"”"),
          f?E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("faction:"+f.id)}},ALLEG[g.faction]):E("span",{class:"pill"},"Unsworn"))),
      E("div",{class:"band",style:{background:g.cols.b}})));
    const mainCol=E("div");
    mainCol.append(E("p",{class:"enc-lead enc-n"},g.story,tag("n")),
      E("h3",{class:"enc-h"},"The ten sleeping Houses"),
      E("p",{class:"enc-note"},"Each is waiting for a Keeper. Begin a girl for one, and she starts in ",low(g.name),"'s colors: ",g.words.join(", "),". ",tag("n")),
      E("div",{class:"enc-sleepers"},g.houses.map(h=>E("div",{class:"sl",id:"sl-"+h.id,style:{"--gc":g.cols.a}},
        ENC.sigil(g.id,h.name,56),
        E("div",{class:"tx"},E("b",null,h.name+" House"),E("small",null,"Asleep since "+h.since),E("p",null,h.lore)),
        E("button",{type:"button",class:"enc-load",title:`Start a new design named ${h.name}, in ${low(g.name)}'s colors`,onclick:()=>beginLost(g,h)},"Begin a girl for "+h.name)))));
    mainCol.append(E("h3",{class:"enc-h"},"If she wakes it"),
      E("p",{class:"enc-p enc-n"},"A girl who wakes one of these Houses becomes its Keeper and is called by its name. She may revive ",low(g.name)," itself, the first of its Houses awake in a lifetime, or ask to sit with a living group",kin?[" (",low(g.name)," has always been close to ",lnk("group:"+kin.id,low(kin.name)),")"]:"",", which may take her as an eleventh. ",
        f?["Her allegiance is ",lnk("faction:"+f.id,f.name),"'s unless she chooses otherwise, and she answers to ",lnk("staff:"+f.dean,ENC.STAFF[f.dean].name),"."]:["The Unsworn answer only to ",lnk("staff:vael","the Headmaster")," until they choose."],tag("n")));
    const side=E("aside",{class:"enc-side"},
      E("div",{class:"enc-card"},E("h4",null,"At a glance"),E("dl",null,
        E("dt",null,"Allegiance"),E("dd",null,allegPill(g)),
        E("dt",null,"Kin"),E("dd",null,kin?lnk("group:"+kin.id,kin.name):"None living"),
        E("dt",null,"Old haunt"),E("dd",null,g.haunt),
        E("dt",null,"Motto"),E("dd",null,g.motto),
        E("dt",null,"Colors"),E("dd",null,g.words.join(", "),E("div",{class:"enc-swatches"},E("i",{style:{background:g.cols.a}}),E("i",{style:{background:g.cols.b}}),E("i",{style:{background:g.cols.e}})))),tag("n")),
      E("div",{class:"enc-card"},E("h4",null,"The other lost groups"),E("ul",{class:"enc-jump"},ROLL.filter(x=>x.faction===g.faction&&x.id!==g.id).map(x=>E("li",null,lnk("lost:"+x.id,x.name))))));
    el.append(E("div",{class:"enc-cols"},mainCol,side))}

  /* the Houses and Groups index points to the Roll */
  {const p=ENC.pages["groups"];if(p&&p.build){const ob=p.build;p.build=el=>{ob(el);const art=el.querySelector(".enc-article")||el;
    art.append(E("h3",{class:"enc-h"},"The sleeping Houses"),
      E("p",{class:"enc-p enc-n"},"The hundred Houses on the rolls are not all there have ever been. "+ACAD.numWords(nH()).replace(/^./,c=>c.toUpperCase())+" more sleep on the ",lnk("roll","Roll of Sleeping Houses"),", in "+ACAD.numWords(ROLL.length)+" lost groups, waiting to wake.",tag("n")),
      E("div",{class:"enc-lostcards"},ROLL.slice(0,4).map(lostCard)),E("p",{class:"enc-note"},lnk("roll","All twenty lost groups")))}}}

  /* living House pages: the second chair (v230: shown under the banner, see enc230.js) */
  /* =====================================================================================================
     9. ORIGINAL CHARACTERS
     ===================================================================================================== */
  sec("oc").page="oc";
  const KINDS=[["any","Any kind"],["myth","Myth and legend"],["sky","Birds"],["sea","Sea"],["land","Beasts of the land"],["small","Small creatures"],["star","Stars and the ancient world"]];
  const KIND_OF={gilded:"myth",blazon:"myth",wildhunt:"myth",wyrms:"myth",masquerade:"myth",hollowhills:"myth",choir:"sky",tide:"sea",abyss:"sea",herd:"land",savanna:"land",sands:"land",wilds:"land",peaks:"land",nightcourt:"small",orchard:"small",familiars:"small",hearth:"small",heavens:"star",titans:"star"};
  ENC.page("oc",{title:"Original Characters",short:"Original Characters",sec:"oc",crumbs:[],
    searchText:()=>"original character oc your own girl wake sleeping House second chair ward guest begin keeper finder",
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Original Characters"),
        E("p",{class:"enc-lead enc-n"},"Everspire has room for your own girl. It always has: the Roll is long, the second chair can be set at any table, and the Academy has never once turned away a grown woman a House has chosen. This chapter is how she arrives, where she belongs and who she finds there.",tag("n")));
      /* three ways in */
      art.append(E("h3",{class:"enc-h"},"Three ways in"),E("div",{class:"enc-ways"},
        E("div",{class:"way"},E("b",null,"Wake a sleeping House"),E("p",null,"She becomes the Keeper of one of the "+ACAD.numWords(nH())+" Houses on the Roll, the first girl it has chosen in a lifetime, and is called by its name. She may revive its lost group or sit with a living one."),lnk("roll","The Roll of Sleeping Houses")),
        E("div",{class:"way"},E("b",null,"Take a second chair"),E("p",null,"She becomes a ward of one of the "+ACAD.CT.b("houses")+" living Houses: Tamsin of Fox, Mira of Serpent. She wears its colors, joins its group and answers to its headmistress; the Keeper keeps the House's name."),lnk("groups","Choose a group, then a House")),
        E("div",{class:"way"},E("b",null,"Come as a guest"),E("p",null,"She has finished her candidate year and no House has chosen her yet, or she is a visiting scholar from abroad for a term. She belongs to no group, which means every group is trying to claim her."),lnk("places","Find her somewhere to stay"))));
      /* the finder */
      art.append(E("h3",{class:"enc-h"},"Find her a House"),E("p",{class:"enc-note"},"Choose an allegiance and a kind; every sleeping House that fits is shown. Choose one to read about it, or let the Roll choose."));
      const state={al:"any",k:"any"},res=E("div",{class:"enc-finder-res"}),count=E("p",{class:"enc-note"});
      const row=(opts,key)=>E("div",{class:"enc-filter",role:"group"},opts.map(([v,t])=>E("button",{type:"button",class:"enc-chip","data-v":v,"aria-pressed":state[key]===v?"true":"false",onclick:ev=>{state[key]=v;ev.target.parentNode.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.v===v?"true":"false"));run()}},t)));
      const pool=()=>ROLL.filter(g=>(state.al==="any"||g.faction===state.al)&&(state.k==="any"||KIND_OF[g.id]===state.k)).flatMap(g=>g.houses.map(h=>[g,h]));
      const run=()=>{const p=pool();res.textContent="";count.textContent=p.length+" sleeping Houses fit.";
        p.forEach(([g,h])=>res.append(E("a",{href:"#",title:h.name+" House, "+g.name+": "+h.lore,onclick:ev=>{ev.preventDefault();openHouse(g,h)}},ENC.sigil(g.id,h.name,32),E("span",null,h.name))))};
      const openHouse=(g,h)=>{ENC.go("lost:"+g.id);setTimeout(()=>{const x=document.getElementById("sl-"+h.id);if(x){x.scrollIntoView({block:"center"});x.classList.add("hot");setTimeout(()=>x.classList.remove("hot"),1600)}},30)};
      art.append(row([["any","Any allegiance"],["dawn","Dawn"],["dusk","Dusk"],["none","Unsworn"]],"al"),row(KINDS,"k"),
        E("div",{class:"enc-loads",style:{margin:"6px 0"}},E("button",{type:"button",class:"enc-load",onclick:()=>{const p=pool();if(p.length){const [g,h]=p[Math.floor(Math.random()*p.length)];openHouse(g,h)}}},"Let the Roll choose")),
        count,res);run();
      /* the steps */
      art.append(E("h3",{class:"enc-h"},"Making her"),E("ol",{class:"enc-steps"},
        E("li",null,E("b",null,"Choose her way in."),E("span",null," A sleeping House to wake, a living House's second chair, or a guest's room in the Sunward or Duskward Wing.")),
        E("li",null,E("b",null,"Begin her."),E("span",null," Every sleeping House has a ",E("i",null,"Begin a girl")," button, and every living girl's page has ",E("i",null,"Design your own ward"),": either starts a new design named for the House, in its colors. Undo brings your previous design back.")),
        E("li",null,E("b",null,"Give her a look."),E("span",null," Turn on ",E("i",null,"Take parts")," at the top of the Encyclopedia and choose any look in ",lnk("wardrobe","the Wardrobe")," to bring in just its outfits, hair or palette: a living House's robes for a ward, a group's colors for an eleventh member.")),
        E("li",null,E("b",null,"Find her people."),E("span",null," A best friend, a rival, a girlfriend and a boyfriend. ",lnk("conflicts","Conflicts and Stories")," lists every rivalry and every secret across the line; a newcomer is the perfect excuse to start another.")),
        E("li",null,E("b",null,"Put her in a scene."),E("span",null," Save her, then turn on ",E("i",null,"Keep my character in scenes")," in Starting points and choose any scene in ",lnk("scenebook","the Scene Book"),": she takes the first character's place.")),
        E("li",null,E("b",null,"Write her into the world."),E("span",null," Answer one of the ",lnk("history","open questions")," or ",lnk("conflicts","mysteries"),", or take a story seed from her group. The Encyclopedia leaves them open for her."))));
      /* the rules */
      art.append(E("h3",{class:"enc-h"},"What every girl at Everspire shares"),E("ul",{class:"enc-list enc-n"},[
        "She belongs to one House, as its Keeper or as a ward, never both and never two.",
        "She was chosen. Whatever else is true of her, a headmistress, a House or the Roll itself decided she belonged here.",
        "Everything that happens between the Academy's people is chosen, too."].map(x=>E("li",null,x)),E("li",{class:"enc-list-tag"},tag("n"))));
      el.append(art)}});

  /* ---------- styles, and the Encyclopedia in dark mode ---------- */
  const st=document.createElement("style");st.id="encCss229";st.textContent=`
#encDlg main:focus{outline:none}
#encDlg nav .fac .enc-link{text-decoration:none}
#encDlg .enc-filter{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}
#encDlg .enc-filter .enc-chip[aria-pressed="true"]{background:var(--e-night2);color:#f1e3c4;border-color:var(--e-night2);border-left-color:var(--e-gold)}
#encDlg .enc-lostcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin:8px 0 14px}
#encDlg .enc-lostcard{display:flex;flex-direction:column;gap:6px;background:var(--e-card);border:1px solid var(--e-vellum2);border-top:5px solid var(--gc);border-radius:12px;padding:12px 14px;text-decoration:none;color:var(--e-ink)}
#encDlg .enc-lostcard:hover{border-color:var(--gb);box-shadow:0 4px 14px rgba(20,22,50,.12)}
#encDlg .enc-lostcard .hd{display:flex;gap:10px;align-items:center}
#encDlg .enc-lostcard b{display:block;font-family:var(--e-serif);font-size:20px;line-height:1.1}
#encDlg .enc-lostcard small{color:var(--e-muted);font-size:12.5px}
#encDlg .enc-lostcard i{font-family:var(--e-serif);font-size:16px}
#encDlg .enc-lostcard .sig{display:flex;gap:2px;flex-wrap:wrap;filter:saturate(.55)}
#encDlg .enc-lostcard:hover .sig{filter:none}
#encDlg .enc-lostcard .al{font-weight:600}
#encDlg .enc-sleepers{display:grid;gap:8px;margin:8px 0 16px}
#encDlg .enc-sleepers .sl{display:grid;grid-template-columns:56px 1fr auto;gap:14px;align-items:center;background:var(--e-card);border:1px solid var(--e-vellum2);border-left:5px solid var(--gc);border-radius:10px;padding:10px 14px;transition:box-shadow .3s}
#encDlg .enc-sleepers .sl.hot{box-shadow:0 0 0 3px var(--e-gold)}
#encDlg .enc-sleepers .sigil{filter:saturate(.5) brightness(.95);transition:filter .3s}
#encDlg .enc-sleepers .sl:hover .sigil{filter:none}
#encDlg .enc-sleepers b{display:block;font-family:var(--e-serif);font-size:19px}
#encDlg .enc-sleepers small{color:var(--e-muted);font-size:12.5px}
#encDlg .enc-sleepers p{margin:3px 0 0;font-size:14px;line-height:1.5}
#encDlg .enc-ways{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;margin:8px 0}
#encDlg .enc-ways .way{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:12px;padding:14px 16px}
#encDlg .enc-ways b{display:block;font-family:var(--e-serif);font-size:21px;margin-bottom:4px}
#encDlg .enc-ways p{margin:0 0 8px;font-size:14px;line-height:1.55}
#encDlg .enc-finder-res{display:flex;flex-wrap:wrap;gap:4px;margin:6px 0 14px;max-height:340px;overflow:auto;padding:4px}
#encDlg .enc-finder-res a{display:flex;flex-direction:column;align-items:center;width:84px;font-size:12px;text-decoration:none;color:var(--e-ink);text-align:center;padding:4px;border-radius:8px}
#encDlg .enc-finder-res a:hover,#encDlg .enc-finder-res a:focus-visible{background:var(--e-vellum2)}
#encDlg .enc-steps{margin:8px 0 12px;padding-left:24px;line-height:1.6}
#encDlg .enc-steps li{margin:0 0 8px}
@media (max-width:860px){#encDlg .enc-sleepers .sl{grid-template-columns:44px 1fr}#encDlg .enc-sleepers .sl .enc-load{grid-column:1/-1}}
/* dark mode: the studio's own switch (html[data-theme=dark]) turns the vellum to night */
html[data-theme="dark"] #encDlg{--e-vellum:#121529;--e-vellum2:#2a2f52;--e-card:#1a1e3a;--e-line:#373d6a;--e-ink:#e8e5f4;--e-muted:#a5a1c7;--e-gold2:#d4ad5c}
html[data-theme="dark"] #encDlg .enc-link{color:#b3b9ff;text-decoration-color:rgba(179,185,255,.4)}
html[data-theme="dark"] #encDlg .enc-tag-c{background:#1d3352;color:#b4d3f5}
html[data-theme="dark"] #encDlg .enc-tag-n{background:#3e3018;color:#f0d29a}
html[data-theme="dark"] #encDlg .enc-load{background:var(--e-card);color:var(--e-ink);border-color:var(--e-line)}
html[data-theme="dark"] #encDlg .enc-load:hover{border-color:var(--e-gold)}
html[data-theme="dark"] #encDlg .enc-chip{background:#20254a;color:var(--e-ink);border-color:var(--e-line)}
html[data-theme="dark"] #encDlg .enc-chip:hover{background:#2a305a}
html[data-theme="dark"] #encDlg .enc-filter .enc-chip[aria-pressed="true"]{background:#d8b25a;color:#151931;border-color:#d8b25a}
html[data-theme="dark"] #encDlg .enc-loves .lv{background-image:linear-gradient(90deg,#e9a25f1f,#6c4fa333)}
html[data-theme="dark"] #encDlg .enc-maplegend a{border-bottom-color:var(--e-line)}
html[data-theme="dark"] #encDlg .enc-map{border-color:var(--e-line)}
html[data-theme="dark"] #encDlg .enc-member:hover,html[data-theme="dark"] #encDlg .enc-setcard:hover,html[data-theme="dark"] #encDlg .enc-staffcard:hover,html[data-theme="dark"] #encDlg .enc-lostcard:hover{box-shadow:0 4px 18px rgba(0,0,0,.45)}
html[data-theme="dark"] #encDlg .enc-px{filter:drop-shadow(0 0 1px rgba(255,255,255,.35))}
html[data-theme="dark"] #encDlg .enc-banner .enc-px,html[data-theme="dark"] #encDlg nav .enc-px,html[data-theme="dark"] #encDlg .enc-map .enc-px{filter:none}
html[data-theme="dark"] #encDlg .enc-sleepers .sigil,html[data-theme="dark"] #encDlg .enc-lostcard .sig{filter:saturate(.6) drop-shadow(0 0 1px rgba(255,255,255,.35))}
html[data-theme="dark"] #encDlg .enc-sleepers .sl:hover .sigil{filter:drop-shadow(0 0 1px rgba(255,255,255,.35))}
html[data-theme="dark"] #encDlg .enc-timeline .ev::before{background:var(--e-vellum)}
html[data-theme="dark"] #encDlg .enc-year .ev small{filter:brightness(1.25)}
html[data-theme="dark"] #encDlg ::selection{background:#d8b25a55}`;
  document.head.append(st);
})();

/* ---- v231: 32x32 heads for the 200 sleeping Houses (px/px32.py), shown once a girl wakes a House. ---- */
window.ENC=window.ENC||{};
