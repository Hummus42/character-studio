/* ADMIN-ONLY END */
/* ---- v226: Starting points hold only the characters outside the Academy (tail block, after the Encyclopedia).
   The Academy's looks, scenes, men and archive are browsed in the Academy Encyclopedia instead; nothing else changes:
   PRESET_GROUPS keeps every set, so the Scene tab's lists, the random roll and the outfit library work as before.
   From Starting points, an "Academy Encyclopedia" chip opens it on top; picking a look there while choosing a character
   for a scene ("Browse…" in the Scene tab, or "Use in a scene") still fills that slot, because both go through spLoad. ---- */
(function(){
  if(typeof spCatalog!=="function"||typeof openStarts!=="function"||typeof ENC==="undefined")return;
  const isAcad=l=>/^Academy\b/.test(String(l||""));
  let inStarts=0;
  const cat0=spCatalog;
  spCatalog=function(){const d=cat0.apply(this,arguments);if(!inStarts)return d;
    const list=d.list.filter(e=>e.s||!isAcad(e.group));const byKey={};list.forEach(e=>{byKey[e.key]=e});
    return Object.assign({},d,{list,groups:d.groups.filter(g=>!isAcad(g.label)),byKey})};
  ACAD.STARTS_ACADEMY_HIDDEN=true;
  const os=openStarts;
  openStarts=function(){inStarts++;try{return os.apply(this,arguments)}finally{inStarts--}};
  const keep=()=>typeof CAST!=="undefined"&&CAST.keep;
  const openEnc=()=>ENC.open(keep()?"scenebook":"home");
  /* a chip beside All, Characters and the rest */
  const rg=renderStartGroups;
  renderStartGroups=function(){const r=rg.apply(this,arguments);
    try{const wrap=document.getElementById("spGroups");if(wrap&&!wrap.querySelector(".sp-enc"))
      wrap.append(h("button",{type:"button",class:"chip sp-enc",title:"The Academy's girls, looks, scenes and boyfriends are in the Academy Encyclopedia",onclick:openEnc,text:"Academy Encyclopedia (scenes and looks)"}))}catch(e){}
    return r};
  /* the overview names where the Academy went; a search offers to look there too */
  const rl=renderStartList;
  renderStartList=function(){const r=rl.apply(this,arguments);
    try{const box=document.getElementById("startGrid");const s=SP||{};const q=String(s.q||"").trim();
      if(box&&(!s.sec||s.sec==="all")){
        const card=h("div",{class:"sp-row sp-encrow",role:"listitem"},h("button",{type:"button",class:"sp-main sp-set",onclick:openEnc},
          h("span",{class:"sp-txt"},h("b",{text:q?`Search the Academy Encyclopedia for “${q}”`:"The Academy has moved to the Academy Encyclopedia"}),
            h("small",{class:"sp-sub",text:q?ACAD.CT.fill("Its {{b:houses}} girls, their groups, looks, scenes and boyfriends."):(()=>{const R=ACAD.ROSTER,w=ACAD.numWords||String;return R?`${w(R.count())[0].toUpperCase()+w(R.count()).slice(1)} girls in ${w(R.groupCount())} groups, every look and scene, the boys of the Houses, the faculty and the Scene Archive.`:ACAD.CT.fill("{{A:houses}} girls in {{n:groups}} groups, every look and scene, the boyfriends, the faculty and the Scene Archive.")})()}))));
        if(q)card.querySelector("button").onclick=()=>ENC.search(q);
        const blank=box.querySelector(".sp-row");
        if(!q&&blank&&blank.querySelector(".blank"))blank.after(card);else box.append(card)}
    }catch(e){}
    return r};
  const css=document.createElement("style");
  css.textContent="#spGroups .sp-enc{border-color:#b08a4a;font-weight:600}#startsDlg .sp-encrow .sp-main{border:1px dashed #b08a4a!important;border-radius:10px}";
  document.head.append(css);
})();
