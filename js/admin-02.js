/* ADMIN-ONLY END */
/* ADMIN-ONLY BEGIN */
/* ---- v256: submissions. A player's contribution arrives as a change set (the canon layer's own format, with its author,
   the revision it was made on and its relationships as pairs added or dropped). Review a submission runs the checks
   before you read it: whose records it changes, whether they changed since, names already taken anywhere in the world,
   the under-18 rule, links, and relationships with other authors' girls, which wait for those authors to accept them.
   Approve puts it into your drafts, credited to its author; Send back and Reject write a note for the player.
   The Admin dialog also lists the relationships waiting for approval, every record with its author and revision, and
   the moderators (only you can make them). ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||!ACAD.records||!ACAD.perm)return;
  const K=ACAD.admin.kit,{h,HN,clone,say,drafts,ensure,commit,C,download}=K;
  const R=ACAD.records,P=ACAD.perm,ADMIN=P.ADMIN;
  if(!ACAD.changeset||!ACAD.changeset.check)return;
  const {FORMAT,make,check,relApply,PARTW,merge}=ACAD.changeset;
  /* ---------- approving ---------- */
  /* v258: lore and history a player adds to go in beside what is there now, so nothing written since is lost */
  const J=x=>JSON.stringify(x);
  const addTo=(cur,v)=>{const have=new Set((cur||[]).map(J));return (cur||[]).concat((v||[]).filter(x=>!have.has(J(x))))};
  function addLore(k,v){const cur=ACAD.loreCurrent?ACAD.loreCurrent(k):null;
    if(k==="culture.year"&&Array.isArray(cur))return cur.map(s=>{const n=(v||[]).find(x=>x&&x.season===s.season);return n?Object.assign({},s,{items:addTo(s.items,n.items)}):s});
    return Array.isArray(cur)?addTo(cur,v):v}
  function addHistory(v){const cur=clone(ENC.HISTORY||[]).map(e=>({era:e.era,items:(e.items||[]).map(i=>({when:i.when||"",title:i.title||"",text:i.text||"",tag:i.tag||"n"}))}));const key=i=>J([i.when,i.title,i.text]);
    (v||[]).forEach(ne=>{let e=cur.find(x=>x.era===ne.era);if(!e){cur.push(clone(ne));return}const have=new Set(e.items.map(key));
      ne.items.forEach((it,i)=>{if(have.has(key(it)))return;/* after the event it followed */let at=e.items.length;for(let j=i-1;j>=0;j--){const q=e.items.findIndex(x=>key(x)===key(ne.items[j]));if(q>=0){at=q+1;break}}e.items.splice(at,0,clone(it));have.add(key(it))})});
    return cur}
  function approve(cs,res){const d=drafts();const who=cs.author.trim();const admin=P.role(who)==="admin";
    const ed=clone(cs.edits||{});
    if(!admin){if(ed.lore)Object.keys(ed.lore).forEach(k=>{ed.lore[k]=addLore(k,ed.lore[k])});if(ed.history&&ed.history.eras)ed.history={eras:addHistory(ed.history.eras)}}
    merge(d,{edits:ed,add:cs.add||{}});
    const held=new Set(res.pending.map(p=>R.pkey(p.part,p.entry[0],p.entry[1])));
    (cs.rel.add||[]).forEach(([part,...e])=>{if(!held.has(R.pkey(part,e[0],e[1])))relApply(d,part,e)});
    const heldDrop=new Set(res.pending.flatMap(p=>(p.also||[]).map(([pt,a,b])=>R.pkey(pt,a,b))));
    (cs.rel.drop||[]).forEach(([part,a,b])=>{if(!heldDrop.has(R.pkey(part,a,b)))relApply(d,part,[a,b],true)});
    const seenP=new Set();res.pending.forEach(p=>{const k=R.pkey(p.part,p.entry[0],p.entry[1]);if(seenP.has(k))return;seenP.add(k);
      const list=d.pending=d.pending||clone(R.pending());list.push({id:"p"+Date.now().toString(36)+list.length,from:who,owner:p.owner,part:p.part,entry:p.entry,also:p.also||[],made:cs.made||""})});
    /* new records are credited to their author */
    res.keys.forEach(k=>{const r=R.get(k);if(!r||(r.author===who)){d.meta=d.meta||{};d.meta[k]=Object.assign({},d.meta[k]||{},{author:r?r.author:who})}});
    d.reviews=(d.reviews||[]).concat([{author:who,made:cs.made||"",note:cs.note||"",verdict:"approved",changes:res.labels.length}]);
    commit(d,{admin:true})}

  /* ---------- the review dialog ---------- */
  let rdlg=null;
  function review(cs){if(rdlg)rdlg.remove();const res=check(cs);const ok=!res.problems.length;
    rdlg=h("dialog",{class:"adm-dlg adm-wide",id:"reviewDlg","aria-label":"Review a submission"});
    const notes=h("textarea",{class:"adm-in",rows:3,placeholder:"Notes for the player (they see these if you send it back or reject it)"});
    const verdict=v=>{download(`everspire_review_${String(cs.author||"player").replace(/[^A-Za-z0-9]+/g,"_")}.json`,JSON.stringify({format:"everspire-review",v:1,author:cs.author,made:cs.made,verdict:v,notes:notes.value.trim(),problems:res.problems},null,1),"application/json");
      rdlg.close();say(v==="sent back"?`Sent back to ${cs.author}: save the note file and pass it on.`:`Rejected: save the note file and pass it on to ${cs.author}.`)};
    rdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>rdlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Review a submission"),h("h2",null,res.problems[0]==="This isn't a submission file."?"Not a submission":`From ${cs.author}`),
        cs.format===FORMAT?h("p",{class:"adm-lead"},`Made on revision ${cs.base}${cs.made?", "+cs.made:""}. This file is revision ${C.rev()}.`,cs.note?h("span",{style:"display:block;margin-top:6px"},"“"+cs.note+"”"):null):null,
        res.problems.length?h("div",{class:"adm-checks adm-review-problems",role:"alert"},h("b",null,"Fix these first"),h("ul",null,res.problems.map(x=>h("li",null,x)))):h("p",{class:"adm-ok"},"It passes every check."),
        res.labels.length?[h("h3",null,`What it changes (${res.labels.length})`),h("ul",{class:"adm-changes adm-review-list"},res.labels.map(l=>h("li",null,h("span",null,l))))]:null,
        res.pending.length?[h("h3",null,"Waits for approval"),h("p",{class:"adm-muted"},"These relationships name another author's girl. They wait until that author accepts them; the rest goes in now."),
          h("ul",{class:"adm-changes adm-review-pending"},res.pending.map(p=>h("li",null,h("span",null,`${p.label}: waiting for ${p.owner}`))))]:null,
        h("h3",null,"Notes"),notes),
      h("div",{class:"adm-foot"},h("div",{class:"adm-actions"},
        h("button",{type:"button",class:"adm-btn danger",onclick:()=>verdict("rejected")},"Reject"),
        h("button",{type:"button",class:"adm-btn",onclick:()=>verdict("sent back")},"Send back"),
        h("button",{type:"button",class:"adm-btn primary",disabled:!ok,onclick:()=>approve(cs,res)},"Approve"))));
    document.body.append(rdlg);rdlg.showModal()}

  /* ---------- records ---------- */
  let recdlg=null;
  function records(){if(recdlg)recdlg.remove();const all=R.list();const F={kind:"",author:"",q:""};
    const authors=[...new Set(all.map(r=>r.author))].sort();
    const tb=h("tbody");const count=h("p",{class:"adm-muted"});
    const draw=()=>{tb.textContent="";const q=F.q.toLowerCase();const rows=all.filter(r=>(!F.kind||r.kind===F.kind)&&(!F.author||r.author===F.author)&&(!q||r.name.toLowerCase().includes(q)||r.id.includes(q)));
      rows.forEach(r=>tb.append(h("tr",null,h("td",null,r.name),h("td",null,R.KIND[r.kind]),h("td",null,r.author),h("td",null,r.draft?`${r.rev} (changed since)`:String(r.rev)),h("td",{class:"adm-muted",style:"margin:0"},r.key))));
      count.textContent=`${rows.length} of ${all.length} records.`};
    const sel=(k,opts,none)=>h("select",{class:"adm-in","aria-label":none,onchange:e=>{F[k]=e.target.value;draw()}},h("option",{value:""},none),opts.map(([v,l])=>h("option",{value:v},l)));
    recdlg=h("dialog",{class:"adm-dlg adm-wide",id:"recordsDlg","aria-label":"Records"});
    recdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>recdlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Records"),h("h2",null,"Everything in Everspire"),
        h("p",{class:"adm-lead"},"Each record keeps its id for good, the author it is credited to and the revision it last changed in. The originals are yours, at revision 0."),
        h("div",{class:"adm-row"},sel("kind",Object.entries(R.KIND).map(([k,v])=>[k,v[0].toUpperCase()+v.slice(1)+"s"]),"Every kind"),sel("author",authors.map(a=>[a,a]),"Every author"),
          h("input",{class:"adm-in",type:"search",placeholder:"Name or id","aria-label":"Find a record",oninput:e=>{F.q=e.target.value;draw()}})),count,
        h("table",{class:"adm-records"},h("thead",null,h("tr",null,["Name","Kind","Author","Revision","Id"].map(x=>h("th",null,x)))),tb)));
    document.body.append(recdlg);draw();recdlg.showModal()}

  /* ---------- the Admin dialog's new sections ---------- */
  K.addPanel((body,d)=>{
    const imp=h("input",{type:"file",accept:"application/json,.json",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{let x=null;try{x=JSON.parse(t)}catch(er){}review(x||{})})}});
    body.append(h("h3",null,"Submissions"),h("p",{class:"adm-muted"},"A player's girl, group, place or lore arrives as a submission file. Review it: the checks run first, then you approve it, send it back or reject it."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",id:"admReview",onclick:()=>imp.click()},"Review a submission"),imp,
        h("button",{type:"button",class:"adm-btn",disabled:!K.changesOf(d).length,onclick:()=>download(`everspire_submission_${ADMIN}_r${C.rev()}.json`,JSON.stringify(make(d,ADMIN,d.note),null,1),"application/json")},"Save my drafts as a submission")));
    /* relationships waiting for an author */
    const pend=(d.pending||R.pending()).filter(Boolean);
    if(pend.length){body.append(h("h3",null,`Waiting for approval (${pend.length})`),h("p",{class:"adm-muted"},"Relationships that name another author's girl. Hers to accept; as admin you may accept or decline any of them."),
      h("ul",{class:"adm-changes adm-pending"},pend.map(p=>h("li",null,h("span",null,`${HN(p.entry[0])} and ${HN(p.entry[1])}: ${PARTW[p.part]||p.part}${(p.also||[]).map(([pt,a,b])=>`, and ${HN(a)} and ${HN(b)} are no longer ${PARTW[pt]||pt}`).join("")}, from ${p.from}, waiting for ${p.owner}`),
        h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const x=drafts();x.pending=(x.pending||clone(R.pending())).filter(q=>q.id!==p.id);(p.also||[]).forEach(([pt,a,b])=>relApply(x,pt,[a,b],true));relApply(x,p.part,p.entry);commit(x,{admin:true})}},p.owner===ADMIN?"Accept":"Accept as admin"),
        h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const x=drafts();x.pending=(x.pending||clone(R.pending())).filter(q=>q.id!==p.id);commit(x,{admin:true})}},"Decline")))))}
    /* records */
    const all=R.list(),by={};all.forEach(r=>{by[r.author]=(by[r.author]||0)+1});
    body.append(h("h3",null,"Records"),h("p",{class:"adm-muted"},`${all.length} records: `+Object.entries(by).map(([a,n])=>`${n} by ${a}`).join(", ")+"."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:records},"Show records")));
    /* moderators: only the admin makes them */
    const users=Object.assign({},P.users(),d.users||{});const mods=Object.keys(users).filter(u=>users[u]&&users[u].role==="moderator");
    const inp=h("input",{class:"adm-in",type:"text",placeholder:"A player's name","aria-label":"Make a moderator"});
    body.append(h("h3",null,"Moderators"),h("p",{class:"adm-muted"},"Moderators review submissions. Only you can make or remove them; a moderator can never make another."),
      mods.length?h("ul",{class:"adm-changes adm-mods"},mods.map(u=>h("li",null,h("span",null,u),h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const x=drafts();x.users=Object.assign({},P.users(),x.users||{});x.users[u]=null;commit(x,{admin:true})}},"Remove")))):h("p",{class:"adm-muted"},"None yet."),
      h("div",{class:"adm-row"},inp,h("button",{type:"button",class:"adm-btn",onclick:()=>{const n=inp.value.trim();if(!n)return;if(n===ADMIN)return say("Hummus is the admin.");
        const x=drafts();x.users=Object.assign({},x.users||{});x.users[n]={role:"moderator"};commit(x,{admin:true})}},"Make moderator")))});
  K.addChanges((d,out)=>{if(d.users)Object.entries(d.users).forEach(([u,v])=>out.push({label:v&&v.role==="moderator"?`Moderator: ${u}`:`No longer a moderator: ${u}`,path:["users",u]}));
    if(d.pending)out.push({label:`Relationships waiting for approval (${d.pending.length})`,path:["pending"]});
    (d.reviews||[]).forEach((r,i)=>out.push({label:`Approved: ${r.author}'s submission`,path:["reviews",i]}))});
  {const st=document.createElement("style");st.id="admCss256";st.textContent=`.adm-records{width:100%;border-collapse:collapse;font-size:14px;margin-top:8px}.adm-records th,.adm-records td{text-align:left;padding:5px 8px;border-bottom:1px solid var(--a-line)}.adm-records th{font-weight:600}
.adm-ok{color:#2f7a3d;font-weight:600;margin:10px 0}`;document.head.append(st)}
  Object.assign(ACAD.changeset,{approve,review,records});
})();
