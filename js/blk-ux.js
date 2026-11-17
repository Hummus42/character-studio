/*UX-BEGIN*/
/* ---- v312: the studio's look and the Academy beside it.
   1. The app icon is the mark in the top left, and the Encyclopedia has its own place beside the title: Encyclopedia opens
      the full book; Browse opens the Academy drawer.
   2. The Academy drawer: factions, groups, Houses and girls, browsed beside the studio without leaving it. A girl's card loads
      her, her boyfriend or her headmistress into the studio, follows her friends, girlfriend, rivals and family, and opens her
      full Encyclopedia page. Search finds any girl by House, name or nickname.
   3. The studio sits over the Everspire art made with Codex: the castle across the lake by day (light theme) and the lantern
      festival at dusk (dark theme), under a veil so the panels stay readable. ---- */
(function(){
  "use strict";
  if(typeof ACAD==="undefined"||typeof ENC==="undefined"||!ENC.E)return;
  const E=ENC.E,HN=h=>(ENC.HN?ENC.HN(h):h);
  const css=`
  body::before{content:"";position:fixed;inset:0;z-index:-2;background:url(assets/bg/everspire-day.webp) center 35%/cover no-repeat}
  body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;
    background:linear-gradient(180deg,rgba(238,241,243,.62) 0,rgba(238,241,243,.8) 240px,rgba(238,241,243,.86) 100%)}
  :root[data-theme="dark"] body::before{background-image:url(assets/bg/everspire-dusk.webp)}
  :root[data-theme="dark"] body::after{background:linear-gradient(180deg,rgba(15,22,38,.5) 0,rgba(15,22,38,.74) 240px,rgba(15,22,38,.82) 100%)}
  .top{background:color-mix(in srgb,var(--panel) 82%,transparent);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
  .stepbody,.stage,.panel{background:color-mix(in srgb,var(--panel) 93%,transparent);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
  .rail-btn.on{background:color-mix(in srgb,var(--panel) 92%,transparent)}
  .brand .mark{width:30px;height:30px;border-radius:8px;object-fit:cover;box-shadow:0 0 0 1px var(--rule),0 2px 8px rgba(0,0,0,.18)}
  #encBtn{display:none!important}
  @media (min-width:861px){.design-name{min-width:150px}.top{gap:12px}}
  :root{--gold:#b7841f;--gold2:#e7c56a;--goldink:#2a1d05}
  .acad-nav{display:flex;gap:6px;align-items:center;flex:none}
  .acad-btn{display:inline-flex;align-items:center;gap:7px;border:1.5px solid var(--gold);background:transparent;color:var(--ink);padding:6px 13px;border-radius:999px;font-weight:600;line-height:1.2}
  .acad-btn svg{width:17px;height:17px;flex:none}
  .acad-btn:hover{background:color-mix(in srgb,var(--gold2) 22%,transparent)}
  .acad-btn.acad-main{background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--goldink);border-color:var(--gold);box-shadow:0 2px 10px rgba(183,132,31,.35)}
  .acad-btn.acad-main:hover{filter:brightness(1.06)}
  .acad-btn[aria-expanded="true"]{background:color-mix(in srgb,var(--gold2) 30%,transparent)}
  /* the drawer */
  .acad-drawer{position:fixed;left:0;top:var(--acad-top,58px);bottom:0;width:min(400px,100vw);z-index:35;display:flex;flex-direction:column;
    background:color-mix(in srgb,var(--panel) 96%,transparent);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-right:1px solid var(--rule);
    box-shadow:var(--shadow);transform:translateX(-105%);visibility:hidden;transition:transform .22s ease,visibility 0s .22s}
  .acad-drawer.open{transform:none;visibility:visible;transition:transform .22s ease}
  .ad-head{display:flex;align-items:center;gap:8px;padding:12px 14px 8px;border-bottom:1px solid var(--rule2)}
  .ad-head h2{font-size:1.05rem;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ad-ib{border:1px solid var(--rule);background:transparent;border-radius:8px;padding:4px 9px;font-size:.85rem;line-height:1.3}
  .ad-ib:hover{border-color:var(--ink)}
  .ad-search{padding:8px 14px;border-bottom:1px solid var(--rule2)}
  .ad-search input{width:100%;border:1px solid var(--rule);background:var(--panel2);border-radius:8px;padding:7px 10px}
  .ad-crumbs{display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-size:.8rem;color:var(--muted);padding:6px 14px 0}
  .ad-crumbs a{color:inherit}
  .ad-body{flex:1;overflow:auto;padding:8px 14px 24px;overscroll-behavior:contain}
  .ad-fac{margin:12px 0 4px;font-family:var(--fh);font-size:.95rem;display:flex;align-items:center;gap:8px}
  .ad-fac small{font-family:var(--fb);color:var(--muted);font-weight:400}
  .ad-row{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;background:transparent;border-radius:9px;padding:6px 8px}
  .ad-row:hover,.ad-row:focus-visible{background:var(--panel2)}
  .ad-row b{display:block;font-weight:600}.ad-row span.k{display:block;font-size:.78rem;color:var(--muted);line-height:1.3}
  .ad-row img,.ad-row canvas{flex:none}
  .ad-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(82px,1fr));gap:8px;margin-top:6px}
  .ad-tile{display:flex;flex-direction:column;align-items:center;gap:4px;border:1px solid var(--rule2);background:var(--panel);border-radius:10px;padding:8px 4px;font-size:.78rem;line-height:1.2;text-align:center}
  .ad-tile:hover{border-color:var(--gold)}
  .ad-tile .sw{font-size:.7rem;color:var(--gold)}
  .ad-h{font-family:var(--fh);font-size:.88rem;margin:16px 0 4px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
  .ad-girl{display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px;margin-top:6px}
  .ad-por{width:92px;flex:none;height:auto;aspect-ratio:400/585;object-fit:cover;border-radius:10px;box-shadow:0 0 0 1px var(--rule2),0 4px 12px rgba(0,0,0,.16);background:#fff}
  .ad-girl{display:grid!important;grid-template-columns:92px 1fr;grid-template-rows:auto auto auto 1fr;column-gap:12px;row-gap:2px;align-items:start;text-align:left!important}
  .ad-girl .ad-por{grid-row:1/5}.ad-girl h3{font-size:1.15rem!important;line-height:1.2}.ad-girl .fn,.ad-girl .role{font-size:.82rem!important}
  .ad-girl .ad-acts{justify-content:flex-start!important;margin:6px 0 0!important;gap:5px!important}.ad-girl .ad-act{padding:4px 9px;font-size:.78rem}
  .ad-girl h3{font-size:1.3rem}.ad-girl .fn{color:var(--muted);font-size:.9rem}
  .ad-girl .role{font-size:.88rem;max-width:34ch}
  .ad-p{font-size:.88rem;line-height:1.5;margin:6px 0}
  .ad-facts{display:grid;grid-template-columns:auto 1fr;gap:2px 10px;font-size:.84rem;margin:6px 0}
  .ad-facts dt{color:var(--muted)}.ad-facts dd{margin:0}
  .ad-chips{display:flex;flex-wrap:wrap;gap:6px}
  .ad-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--rule);background:transparent;border-radius:999px;padding:2px 9px 2px 3px;font-size:.8rem}
  .ad-chip:hover{border-color:var(--gold)}
  .ad-chip em{font-style:normal;color:var(--muted)}
  .ad-acts{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin:10px 0 2px}
  .ad-act{border:1px solid var(--gold);background:transparent;border-radius:8px;padding:6px 11px;font-weight:600;font-size:.85rem}
  .ad-act.main{background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--goldink)}
  .ad-act:hover{filter:brightness(1.05)}
  .ad-about{margin:4px 0 6px;font-size:.88rem}.ad-about summary{cursor:pointer;color:var(--muted);font-weight:600;font-size:.82rem}
  .ad-tabs{position:sticky;top:-8px;z-index:2;display:flex;flex-wrap:wrap;gap:4px;padding:8px 0 6px;margin-top:6px;background:color-mix(in srgb,var(--panel) 97%,transparent);border-bottom:1px solid var(--rule2)}
  .ad-tab{border:1px solid var(--rule);background:transparent;border-radius:999px;padding:4px 10px;font-size:.82rem;font-weight:600}
  .ad-tab span{margin-left:5px;font-weight:500;color:var(--muted);font-size:.75rem}
  .ad-tab[aria-selected="true"]{background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--goldink);border-color:var(--gold)}
  .ad-tab[aria-selected="true"] span{color:inherit;opacity:.75}
  .ad-filter{width:100%;border:1px solid var(--rule);background:var(--panel2);border-radius:8px;padding:6px 10px;margin:8px 0 4px;font-size:.88rem}
  .ad-cat{border-bottom:1px solid var(--rule2);padding:2px 0}
  .ad-cat summary{cursor:pointer;display:flex;align-items:center;gap:6px;padding:7px 2px;font-weight:600;font-size:.86rem;list-style:none}
  .ad-cat summary::-webkit-details-marker{display:none}
  .ad-cat summary::before{content:"▸";color:var(--muted);font-size:.75rem;transition:transform .15s}
  .ad-cat[open] summary::before{transform:rotate(90deg)}
  .ad-cat summary span{margin-left:auto;color:var(--muted);font-weight:500;font-size:.75rem}
  .ad-loads{display:flex;flex-wrap:wrap;gap:5px;padding:2px 0 10px}
  .ad-load{border:1px solid var(--rule);background:var(--panel);border-radius:8px;padding:4px 9px;font-size:.8rem;line-height:1.25;text-align:left}
  .ad-load:hover{border-color:var(--gold)}
  .ad-load.x{border-style:dashed}
  .ad-load.on{background:linear-gradient(180deg,var(--gold2),var(--gold));color:var(--goldink);border-color:var(--gold)}
  .ad-gate{border:1px solid var(--rule);border-radius:10px;padding:12px;margin-top:10px}
  .ad-badge{font-size:.7rem;border:1px solid currentColor;border-radius:999px;padding:0 6px;margin-left:4px;color:var(--gold)}
  @media (max-width:860px){
    .acad-btn{padding:5px 10px}.acad-btn span{font-size:.88rem}
    .acad-drawer{top:0;z-index:45;width:100vw}
  }
  @media (max-width:420px){#acadBrowseBtn span{display:none}#acadBrowseBtn{padding:5px 8px}}
  `;
  document.head.append(E("style",{id:"ux312"},css));

  /* ---------- data helpers ---------- */
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id);
  const groupOf=h=>ACAD.GROUP_OF?ACAD.GROUP_OF(h):null;
  const bio=h=>(typeof BIOS==="object"&&BIOS[h])||{};
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const low=s=>String(s||"").replace(/^The /,"the ");
  const crest=(gid,n)=>ACAD.crestImg?ACAD.crestImg(gid,n):null;
  const face=(h,n)=>{try{return ENC.pixel?ENC.pixel(h,n):null}catch(e){return null}};

  /* ---------- the drawer ---------- */
  let dr,body,crumbs,input,title,stack=[{k:"home"}];
  const KEY="everspire.acadDrawer";
  const save=()=>{try{localStorage.setItem(KEY,JSON.stringify({open:dr&&dr.classList.contains("open"),v:stack[stack.length-1]}))}catch(e){}};
  function build(){
    if(dr)return;
    input=E("input",{type:"search",placeholder:"Search the Academy: a House, a name, a nickname",oninput:()=>{const q=input.value.trim();if(q)show({k:"search",q},true);else back(true)},"aria-label":"Search the Academy"});
    title=E("h2",null,"The Academy");crumbs=E("nav",{class:"ad-crumbs","aria-label":"Where you are"});body=E("div",{class:"ad-body"});
    dr=E("aside",{class:"acad-drawer",id:"acadDrawer","aria-label":"Browse the Academy"},
      E("div",{class:"ad-head"},title,
        E("button",{type:"button",class:"ad-ib",title:"Back",onclick:()=>back()},"Back"),
        E("button",{type:"button",class:"ad-ib",title:"Open this in the full Encyclopedia",onclick:openFull},"Full page"),
        E("button",{type:"button",class:"ad-ib","aria-label":"Close the Academy drawer",onclick:()=>toggle(false)},"Close")),
      E("div",{class:"ad-search"},input),crumbs,body);
    document.body.append(dr);
    dr.addEventListener("keydown",ev=>{if(ev.key==="Escape"){ev.stopPropagation();toggle(false)}});
  }
  function setTop(){const hd=document.querySelector("header.top");if(hd)document.documentElement.style.setProperty("--acad-top",Math.round(hd.getBoundingClientRect().bottom)+"px")}
  function toggle(on){build();on=on===undefined?!dr.classList.contains("open"):on;setTop();
    dr.classList.toggle("open",on);const b=document.getElementById("acadBrowseBtn");if(b)b.setAttribute("aria-expanded",on?"true":"false");
    if(on){render();setTimeout(()=>{try{(dr.querySelector(".ad-body button")||input).focus({preventScroll:true})}catch(e){}},60)}else if(b)b.focus({preventScroll:true});save()}
  function show(v,replace){if(replace&&stack.length>1&&stack[stack.length-1].k==="search"&&v.k==="search")stack[stack.length-1]=v;else stack.push(v);render();save()}
  function back(keepInput){if(stack.length>1)stack.pop();if(!keepInput&&input&&stack[stack.length-1].k!=="search")input.value="";render();save()}
  function home(){stack=[{k:"home"}];if(input)input.value="";render();save()}
  function openFull(){const v=stack[stack.length-1];const id=v.k==="girl"?"house:"+v.h:v.k==="group"?"group:"+v.id:v.k==="faction"?"faction:"+v.id:"home";
    try{ENC.open(id)}catch(e){ENC.open()}}

  const link=(t,fn)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();fn()}},t);
  function renderCrumbs(){crumbs.textContent="";const v=stack[stack.length-1];const parts=[link("The Academy",home)];
    if(v.k==="group"||v.k==="girl"){const gid=v.k==="group"?v.id:(groupOf(v.h)||{}).id;const g=G(gid),f=gid&&ENC.factionOf(gid);
      if(f)parts.push(document.createTextNode(f.short||f.name));if(g&&v.k==="girl")parts.push(link(g.name,()=>show({k:"group",id:g.id})))}
    parts.forEach((p,i)=>{if(i)crumbs.append(" › ");crumbs.append(p)})}
  const groupRow=g=>E("button",{type:"button",class:"ad-row",onclick:()=>show({k:"group",id:g.id})},crest(g.id,28),
    E("span",null,E("b",null,g.name),E("span",{class:"k"},`${g.kind||""} · ${g.members.length} girls${ACAD.swornMembers&&ACAD.swornMembers(g.id).length?` · ${ACAD.swornMembers(g.id).length} sworn`:""}`)));
  const girlTile=(h,sworn)=>E("button",{type:"button",class:"ad-tile",onclick:()=>show({k:"girl",h}),title:bio(h).fullName||HN(h)},face(h,56),E("span",null,HN(h)),sworn?E("span",{class:"sw"},"⚑ sworn"):null);
  const girlRow=h=>{const g=groupOf(h),b=bio(h);return E("button",{type:"button",class:"ad-row",onclick:()=>show({k:"girl",h})},face(h,40),
    E("span",null,E("b",null,HN(h)+(b.fullName?" · "+b.fullName:"")),E("span",{class:"k"},g?g.name:"")))};

  /* ---------- a girl's library: everything of hers that loads into the studio ---------- */
  const TABS=[["looks","Looks"],["scenes","Scenes"],["after","After dark"],["archive","Archive"],["people","People"]];
  const LIB={};
  function library(h){if(LIB[h])return LIB[h];
    const I=(ENC.index&&ENC.index()[h])||{looks:[],scenes:[],after:[]};
    const it=r=>({cat:r.cat||"Other",name:r.name,key:r.k,x:!!r.x,load:()=>ENC.load(r.k)});
    /* the archive's categories are read now, not at load: later blocks add most of them (Lovers, Wilder nights, Cheating...) */
    const RCAT=new Map();(ACAD.RX_CATS||[]).forEach(([c,ls])=>ls.forEach(l=>RCAT.set("Academy "+l,c)));
    let arch=[];try{const RX=ACAD.RX,rows=(ENC.rIndex&&ENC.rIndex(h).lead)||[];
      const per={};rows.forEach(r=>{per[r.s.si]=(per[r.s.si]||0)+1});
      const hook=r=>{try{return String(RX.hookOf(r.s.si,r.vi)||"").trim()}catch(e){return ""}};
      const vname=r=>{try{const v=RX.variant(r.s.si,r.vi);return String((v&&v.f&&v.f.name)||"").trim()}catch(e){return ""}};
      /* a variant's own name, without its unfilled slots ({@name}, {@s1}...), and only when it says more than the set's name */
      const clean=(vn,set)=>{const t=vn.replace(/\{@[^}]*\}('s)?/g,"").replace(/\s+/g," ").replace(/^[\s,:;·-]+|[\s,:;·-]+$/g,"").trim();
        if(!t||t.length<3)return "";const a=t.toLowerCase(),b=set.toLowerCase();return b.includes(a)||a===b?"":t.charAt(0).toUpperCase()+t.slice(1)};
      const cleanHook=hk=>hk.replace(/\{@[^}]*\}('s)?/g,"").replace(/\s+/g," ").trim();
      arch=rows.map(r=>{const hk=cleanHook(hook(r)),own=clean(vname(r),r.s.name);
        return {cat:RCAT.get(r.s.label)||"More scenes",name:own?r.s.name+" · "+own:per[r.s.si]>1&&hk?r.s.name+" · "+hk:r.s.name,tip:hk,key:"rx"+r.s.si+"."+r.vi,
        x:!!(RX&&RX.explicitOf&&RX.explicitOf(r.s.si,r.vi)),load:()=>{RX.loadWith(r.s.si,r.vi,h);try{ENC.close()}catch(e){}}}})}catch(e){}
    return LIB[h]={looks:I.looks.map(it),scenes:I.scenes.map(it),after:I.after.map(it),archive:arch}}
  const ok18=()=>ACAD.RX_ADULT&&ACAD.RX_ADULT.ok18?ACAD.RX_ADULT.ok18():true;
  const minor=h=>!!(ACAD.isMinor&&ACAD.isMinor(h));
  let LAST="";
  function shelf(pane,h,items,tab,v){
    const needs18=items.some(i=>i.x);
    if(needs18&&(minor(h)||!ok18())&&(tab==="after"||items.every(i=>i.x))){
      if(minor(h)){pane.append(E("p",{class:"ad-p muted"},"Not for her."));return}
      pane.append(E("div",{class:"ad-gate"},E("b",null,"Explicit looks and scenes"),E("p",{class:"ad-p"},"These are sexually explicit. Every character in them is an adult. Confirm you are 18 or over to show them."),
        E("button",{type:"button",class:"ad-act main",onclick:()=>{try{localStorage.setItem("everspire.adult18","1")}catch(e){}render()}},"I am 18 or over, show them")));return}
    const shown=items.filter(i=>!i.x||(ok18()&&!minor(h)));
    const q=E("input",{type:"search",class:"ad-filter",placeholder:`Filter ${shown.length} ${TABS.find(t=>t[0]===tab)[1].toLowerCase()}`,value:v.q||"","aria-label":"Filter"});
    const list=E("div");pane.append(q,list);
    const draw=()=>{list.textContent="";const s=(q.value||"").trim().toLowerCase();
      const hits=shown.filter(i=>!s||(i.name+" "+i.cat).toLowerCase().includes(s));
      if(!hits.length){list.append(E("p",{class:"ad-p muted"},"Nothing matches."));return}
      const cats=new Map();hits.forEach(i=>{if(!cats.has(i.cat))cats.set(i.cat,[]);cats.get(i.cat).push(i)});
      let n=0;cats.forEach((is,c)=>{n++;
        const det=E("details",{class:"ad-cat"},E("summary",null,c,E("span",null,String(is.length))),
          E("div",{class:"ad-loads"},is.map(i=>E("button",{type:"button",class:"ad-load"+(LAST===h+"|"+i.key?" on":"")+(i.x?" x":""),title:(i.tip&&!i.name.includes(i.tip)?i.tip+". ":"")+"Load "+i.name+" into the studio",
            onclick:ev=>{LAST=h+"|"+i.key;i.load();list.querySelectorAll(".ad-load.on").forEach(b=>b.classList.remove("on"));ev.currentTarget.classList.add("on");if(innerWidth<=860)toggle(false)}},i.name))));
        if(s||n<=2||cats.size<=3)det.open=true;list.append(det)})};
    q.addEventListener("input",()=>{v.q=q.value;draw()});draw()}
  function people(pane,h,g){
    const R=ACAD.RELDATA||{},chip=(o,why)=>E("button",{type:"button",class:"ad-chip",onclick:()=>show({k:"girl",h:o}),title:why||""},face(o,22),HN(o),why?E("em",null,why):null);
    const sec=(t,list)=>{if(list.length)pane.append(E("div",{class:"ad-h"},t),E("div",{class:"ad-chips"},list))};
    sec("Best friends",(ACAD.BFOF?ACAD.BFOF(h):[]).map(o=>chip(o)));
    const sg=(ACAD.SGOF||{})[h];sec("Secret girlfriend",sg?[chip(sg)]:[]);
    sec("Rivals",((ACAD.RIVALS||{})[h]||[]).map(([o])=>chip(o)));
    sec("Family",(R.FAM||[]).filter(p=>p[0]===h||p[1]===h).map(p=>chip(p[0]===h?p[1]:p[0],String(p[0]===h?p[3]:p[4]).split(",")[0])));
    sec("Flings",(R.FLING||[]).filter(p=>p[0]===h||p[1]===h).map(p=>chip(p[0]===h?p[1]:p[0])));
    if(g)sec("Groupmates",g.members.filter(x=>x!==h).map(o=>chip(o)))}
  function aboutFacts(h,b){const facts=E("dl",{class:"ad-facts"});[["Age",b.age],["From",b.birthplace],["Studies",b.occupation],["Boyfriend",b.partner]].forEach(([k,x])=>{if(x)facts.append(E("dt",null,k),E("dd",null,String(x)))});
    const ex=ACAD.extraGroups?ACAD.extraGroups(h):[];
    if(ex.length)facts.append(E("dt",null,"Banners"),E("dd",null,ex.map((e,i)=>[i?", ":"",link(G(e.g).name,()=>show({k:"group",id:e.g})),e.kind!=="sworn"?E("span",{class:"ad-badge"},(ACAD.BANNER_KINDS||{})[e.kind]||e.kind):null])));
    return facts}

  function render(){if(!dr)return;const v=stack[stack.length-1];body.textContent="";renderCrumbs();body.scrollTop=0;
    if(v.k==="home"){title.textContent="The Academy";
      body.append(E("p",{class:"ad-p muted"},"Every faction, group and girl at Everspire. Pick a girl to load her into the studio, or open her full page."));
      (ENC.FACTIONS||[]).forEach(f=>{const gs=f.groups.map(G).filter(Boolean);if(!gs.length)return;
        body.append(E("div",{class:"ad-fac"},f.name,E("small",null,gs.length+" groups")),...gs.map(groupRow))})}
    else if(v.k==="group"){const g=G(v.id);if(!g)return back();title.textContent=g.name;const f=ENC.factionOf(g.id),rv=G(g.rival);
      body.append(E("div",{class:"ad-row",style:{cursor:"default"}},crest(g.id,44),E("span",null,E("b",null,g.name),E("span",{class:"k"},[g.kind,f&&f.name].filter(Boolean).join(" · ")))));
      if(g.motto)body.append(E("p",{class:"ad-p"},E("i",null,g.motto)));
      const facts=E("dl",{class:"ad-facts"});if(g.leader)facts.append(E("dt",null,"Leader"),E("dd",null,link(HN(g.leader),()=>show({k:"girl",h:g.leader}))));
      if(rv)facts.append(E("dt",null,"Rivals"),E("dd",null,link(rv.name,()=>show({k:"group",id:rv.id}))));
      if(g.hangout)facts.append(E("dt",null,"Hangout"),E("dd",null,g.hangout));body.append(facts);
      body.append(E("div",{class:"ad-h"},"Its girls"),E("div",{class:"ad-grid"},g.members.map(h=>girlTile(h))));
      const sw=ACAD.swornMembers?ACAD.swornMembers(g.id):[];
      if(sw.length)body.append(E("div",{class:"ad-h"},"Also of "+low(g.name)),E("div",{class:"ad-grid"},sw.map(h=>girlTile(h,true))))}
    else if(v.k==="girl"){const h=v.h,b=bio(h),g=groupOf(h);title.textContent=HN(h);
      const por=E("img",{class:"ad-por",src:`assets/portraits/${h}.c.webp`,alt:HN(h)+"'s portrait",loading:"lazy"});
      por.addEventListener("error",()=>{const f=face(h,96);if(f)por.replaceWith(f);else por.remove()},{once:true});
      const card=E("div",{class:"ad-girl"},por,E("h3",null,HN(h)),b.fullName?E("div",{class:"fn"},b.fullName+(b.nickname?` · “${String(b.nickname).split(",")[0]}”`:"")):null,
        g?E("div",{class:"role"},link(g.name,()=>show({k:"group",id:g.id})),(ACAD.GROUP_ROLE||{})[h]?" · "+String(ACAD.GROUP_ROLE[h]).split(".")[0]:""):null);
      const acts=E("div",{class:"ad-acts"});
      const act=(label,id,main)=>{if(!T(id))return;acts.append(E("button",{type:"button",class:"ad-act"+(main?" main":""),title:"Load into the studio",onclick:()=>{ENC.load(id);if(innerWidth<=860)toggle(false)}},label))};
      act("Load her",ACAD.robes?ACAD.robes(h):h+"robes",true);act("Her boyfriend",h+"man");act("Her headmistress",h+"head");
      acts.append(E("button",{type:"button",class:"ad-act",onclick:()=>ENC.open("house:"+h)},"Full page"));
      card.append(acts);body.append(card);
      if(b.summary)body.append(E("details",{class:"ad-about"},E("summary",null,"About her"),E("p",{class:"ad-p"},b.summary),aboutFacts(h,b)));
      /* everything of hers that loads: looks, scenes, after dark, the archive, and her people */
      const lib=library(h),tab=v.tab||"looks";
      const tabs=E("div",{class:"ad-tabs",role:"tablist","aria-label":"Her library"});
      const pane=E("div",{class:"ad-pane"});
      TABS.forEach(([id,label])=>{const n=id==="people"?null:lib[id].length;if(n===0)return;
        tabs.append(E("button",{type:"button",role:"tab","aria-selected":id===tab?"true":"false",class:"ad-tab",onclick:()=>{v.tab=id;v.q="";save();render()}},label,n!=null?E("span",null,String(n)):null))});
      body.append(tabs,pane);
      if(tab==="people")people(pane,h,g);else shelf(pane,h,lib[tab],tab,v)}
    else if(v.k==="search"){title.textContent="Search";const q=v.q.toLowerCase();
      const hits=(ACAD.HOUSES||[]).filter(h=>{const b=bio(h),g=groupOf(h);return [h,HN(h),b.fullName,b.nickname,g&&g.name].some(x=>String(x||"").toLowerCase().includes(q))}).slice(0,60);
      const gh=(ACAD.GROUPS||[]).filter(g=>g.name.toLowerCase().includes(q));
      if(gh.length)body.append(E("div",{class:"ad-h"},"Groups"),...gh.map(groupRow));
      body.append(E("div",{class:"ad-h"},hits.length?"Girls":"No girl matches"),...hits.map(girlRow))}
  }
  ACAD.academyDrawer={open:v=>{toggle(true);if(v)show(v)},close:()=>toggle(false),toggle:()=>toggle()};

  /* ---------- header buttons ---------- */
  function wire(){
    const enc=document.getElementById("acadEncBtn"),br=document.getElementById("acadBrowseBtn");
    if(enc&&!enc.dataset.w){enc.dataset.w=1;enc.addEventListener("click",()=>ENC.open())}
    if(br&&!br.dataset.w){br.dataset.w=1;br.addEventListener("click",()=>toggle())}
    const old=document.getElementById("encBtn");if(old)old.remove();
    window.addEventListener("resize",()=>{if(dr&&dr.classList.contains("open"))setTop()});
    try{const s=JSON.parse(localStorage.getItem(KEY)||"null");if(s&&s.v&&s.v.k!=="search")stack=s.v.k==="home"?[{k:"home"}]:[{k:"home"},s.v];if(s&&s.open&&innerWidth>860)toggle(true)}catch(e){}
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",()=>setTimeout(wire,0));else wire();
})();
/*UX-END*/
