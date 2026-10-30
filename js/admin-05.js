/* ADMIN-ONLY END */
/* ADMIN-ONLY BEGIN */
/* ---- v268: Change leader. A group's leadership moves as a whole: the crown on the group page, the "Leader" title in the new
   leader's role (and so her banner line, her placard, "Leader of the Pack" in her description and the chain of office),
   and the old leader takes a role of her own, by default the one the new leader leaves. Saved together, as
   edits.groups[group].leader and edits.roles[house] for both girls, so it reads in the changes list and on What's new.
   Opened from the Canon card on a group page (Change leader) and from Edit group. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages)return;
  const K=ACAD.admin.kit,{h,HN,say,drafts,ensure,commit}=K;
  if(!K.admin)return;
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id),mid=n=>String(n||"").replace(/^The /,"the ");
  const ROLE=x=>String((ACAD.GROUP_ROLE||{})[x]||"");
  /* a role is "Title. Sentence…": the title, and the rest */
  const titleOf=r=>{const m=/^([^.]*)\.\s*/.exec(r);return m?m[1].trim():""};
  const restOf=r=>{const m=/^[^.]*\.\s*/.exec(r);return m?r.slice(m[0].length).trim():r.trim()};
  const lead=r=>/^leader\b/i.test(titleOf(r));
  ACAD.leaderRoles=(gid,nu)=>{const g=G(gid);if(!g)return null;const old=g.leader||"";const rn=ROLE(nu),ro=old?ROLE(old):"";
    const nuTitle=titleOf(rn)&&!lead(rn)?titleOf(rn):"The "+HN(nu);
    return {old,nu,newRole:"Leader. "+restOf(rn),oldRole:old?(nuTitle+". "+restOf(ro)):""}};
  let dlg=null;
  function openLeader(gid,pick){const g=G(gid);if(!g)return say("There's no such group.");if(!g.members.length)return say(`${g.name} has no girls yet.`);
    if(dlg)dlg.remove();const W={nu:pick&&pick!==g.leader?pick:(g.members.find(x=>x!==g.leader)||""),newRole:"",oldRole:""};
    const fill=()=>{const r=ACAD.leaderRoles(gid,W.nu);if(r){W.newRole=r.newRole;W.oldRole=r.oldRole}};fill();
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    function draw(){pane.textContent="";const old=g.leader;
      pane.append(h("p",{class:"adm-muted"},old?`${HN(old)} leads ${mid(g.name)} now. The new leader takes the crown and the title Leader everywhere it's written; ${HN(old)} takes the role below.`:`${g.name} has no leader yet.`));
      pane.append(h("label",{class:"adm-f"},h("span",null,"New leader"),h("select",{class:"adm-in",onchange:e=>{W.nu=e.target.value;fill();draw()}},
        g.members.filter(x=>x!==old).map(x=>{const o=h("option",{value:x},HN(x)+(ROLE(x)?" ("+titleOf(ROLE(x))+")":""));if(x===W.nu)o.selected=true;return o}))));
      pane.append(h("label",{class:"adm-f"},h("span",null,`${HN(W.nu)}'s role as leader`),h("textarea",{class:"adm-in",rows:3,oninput:e=>{W.newRole=e.target.value}},W.newRole)));
      if(old)pane.append(h("label",{class:"adm-f"},h("span",null,`${HN(old)}'s new role`),h("textarea",{class:"adm-in",rows:3,oninput:e=>{W.oldRole=e.target.value}},W.oldRole)),
        h("p",{class:"adm-muted"},`By default she takes the title ${HN(W.nu)} leaves. A role is a short title, a full stop, then a sentence.`))}
    const save=()=>{msg.textContent="";const bad=[];const nr=W.newRole.replace(/\s+/g," ").trim(),orl=W.oldRole.replace(/\s+/g," ").trim();
      if(!W.nu)bad.push("Choose the new leader.");if(!lead(nr))bad.push(`${HN(W.nu||"her")}'s role should start with “Leader.”`);
      if(g.leader&&!orl)bad.push(`${HN(g.leader)} needs a role.`);if(g.leader&&lead(orl))bad.push(`${HN(g.leader)}'s new role can't be Leader too.`);
      if(bad.length){msg.append(h("b",null,"Fix these first"),h("ul",null,bad.map(b=>h("li",null,b))));return}
      const d=drafts();ensure(d,"edits","groups",gid).leader=W.nu;ensure(d,"edits","roles")[W.nu]=nr;if(g.leader)ensure(d,"edits","roles")[g.leader]=orl;
      commit(d,{page:"group:"+gid})};
    dlg=h("dialog",{class:"adm-dlg",id:"leaderDlg","aria-label":"Change leader: "+g.name},
      h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Change leader"),h("h2",null,g.name),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>dlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:save},"Change leader"))));
    document.body.append(dlg);draw();dlg.showModal()}
  ACAD.admin.leader=openLeader;
  /* the button, beside Edit group in the Canon card of each group page, and "Make leader" under each other girl's placard */
  (ACAD.GROUPS||[]).forEach(g=>{const p=ENC.pages["group:"+g.id];if(!p||!p.build||p.build.leader268)return;const b0=p.build;
    p.build=function(el){b0.apply(this,arguments);try{const c=el.querySelector(".adm-card-enc .enc-loads");if(!c||!g.members.length)return;
      c.append(h("button",{type:"button",class:"enc-load",onclick:()=>openLeader(g.id)},"Change leader"));
      el.querySelectorAll("[data-house]").forEach(m=>{const x=m.dataset.house;if(!x||x===g.leader||!g.members.includes(x))return;
        m.append(h("span",{role:"button",tabindex:"0",class:"enc-linkbtn adm-mklead",onclick:e=>{e.preventDefault();e.stopPropagation();openLeader(g.id,x)},onkeydown:e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();e.stopPropagation();openLeader(g.id,x)}}},"Make leader"))})}catch(e){console.warn("leader268",e)}};p.build.leader268=true});
  {const st=document.createElement("style");st.textContent=".adm-mklead{display:block;text-align:center;margin:4px 0 0;font-size:12px;cursor:pointer}";document.head.append(st)}
})();
