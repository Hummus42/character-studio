/* ADMIN-ONLY BEGIN */
/* ---- v255: the chapter text that moved into the data file can be changed in the lore editor: the Academy's admission,
   second chair, studies, handbook, day and discipline, the chain of office and the headmistresses, the Accord, the
   customs of the heart, the Roll's allegiances and the second banners. An Edit button sits at the end of each. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.addLoreSpec||!ACAD.loreNow||typeof ENC==="undefined"||!ENC.pages)return;
  const K=ACAD.admin.kit,{h}=K;
  const TEXT={
    "academy.office":["The Academy: the chain of office","academy"],
    "academy.heads":["The Academy: the headmistresses","academy"],
    "academy.heads2":["The Academy: how a headmistress comes to her chair","academy"],
    "academy.choosing":["The Academy: admission, the Choosing","academy"],
    "academy.secondchair":["The Academy: the second chair","academy"],
    "academy.boys":["The Academy: the boys of the Houses","academy"],
    "academy.study":["The Academy: what they study","academy"],
    "academy.handbook":["The Academy: the handbook","academy"],
    "academy.discipline":["The Academy: discipline and the bells","academy"],
    "conflicts.accord":["Conflicts: the Accord","conflicts"],
    "culture.hearts":["Culture: the customs of the heart","culture"],
    "roll.allegiance":["The Roll: allegiances","roll"],
    "groups.banners":["Houses and Groups: banners","groups"],
    "groups.banner.sleeping":["Houses and Groups: a sleeping group's banner","groups"],
    "groups.banner.waking":["Houses and Groups: a waking House's banners","groups"],
    "groups.banner.line":["Houses and Groups: a banner across the line","groups"]};
  const ROWS={
    "academy.rules":["The Academy: the seven rules","academy","The handbook",[["Rule","input","No student climbs the Spire."],["What it means","textarea"]]],
    "academy.day":["The Academy: a day at Everspire","academy","A day at Everspire",[["When","input","7:30"],["Where","input","The great dining hall"],["What happens","textarea"]]]};
  ACAD.admin.addLoreSpec(key=>{if(TEXT[key])return {key,label:TEXT[key][0],page:TEXT[key][1],shape:"text",value:String(ACAD.loreNow(key)||"")};
    if(ROWS[key])return {key,label:ROWS[key][0],page:ROWS[key][1],shape:"rows",fields:ROWS[key][3],value:ACAD.loreNow(key)||[]};return null});
  const eb=key=>h("button",{type:"button",class:"adm-evedit adm-textedit","aria-label":"Edit "+(TEXT[key]||ROWS[key])[0],onclick:()=>ACAD.admin.lore(key)},"Edit");
  const plain=t=>String(t||"").replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,"$1").replace(/\{\{[^}]*\}\}/g,"").replace(/\s+/g," ").trim();
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("admin255",e)}}};
  const byPage={};Object.entries(TEXT).forEach(([k,[,pg]])=>{(byPage[pg]=byPage[pg]||[]).push(k)});Object.entries(ROWS).forEach(([k,[,pg]])=>{(byPage[pg]=byPage[pg]||[]).push(k)});
  Object.entries(byPage).forEach(([pg,keys])=>wrap(pg,el=>keys.forEach(k=>{
    if(ROWS[k]){const hh=[...el.querySelectorAll("h3.enc-h")].find(x=>x.firstChild&&x.firstChild.textContent.trim()===ROWS[k][2]);if(hh)hh.append(" ",eb(k));return}
    /* the paragraph or list item that starts with this text (the first words, before any number the page fills in) */
    const head=plain(String(ACAD.loreNow(k)||"").split(/\{\{|\d/)[0]).slice(0,40).trim();if(head.length<12)return;
    const at=[...el.querySelectorAll("p.enc-p,p.enc-lead,p.enc-note,li")].find(x=>x.textContent.replace(/\s+/g," ").trim().startsWith(head));if(at&&!at.querySelector(".adm-textedit"))at.append(" ",eb(k))})));
  {const st=document.createElement("style");st.id="admCss255";st.textContent=`.adm-textedit{vertical-align:middle;margin:0 0 0 6px;font-size:12.5px;line-height:1.4;font-family:var(--e-sans,system-ui,sans-serif);font-weight:400}`;document.head.append(st)}
})();
