/*PRINCMORE-END*/
/*HEALTH-BEGIN*/
/* v304: the admin Health check. It reads the world as it is now and lists what a new group or House is still missing. */
(function(){
  const kit=ACAD.admin&&ACAD.admin.kit;if(!kit||!kit.addPanel)return;
  const KINDS=["trap","funeral","breakup","ptest"];
  const THIN=["summary","backstory","orientation","experience","turnOns","turnOffs","favPosition","kinks","limits","exes","favDrink","favSubject","favSeason","rivals","friends"];
  function check(){
    const out=[],add=(area,what,items)=>{if(items.length)out.push({area,what,items})};
    const groups=ACAD.ROSTER.groups(),REL=ACAD.RELDATA||{},B=typeof BIOS==="object"?BIOS:{};
    const HN=h=>(ENC&&ENC.HN?ENC.HN(h):(ACAD.HNAME&&ACAD.HNAME[h]))||h;
    const members=[];groups.forEach(g=>g.members.forEach(h=>members.push([g,h])));
    add("Groups","fewer than four traditions",groups.filter(g=>((ENC.GROUPLORE[g.id]||{}).traditions||[]).length<4).map(g=>g.name));
    add("Groups","no story seeds",groups.filter(g=>!(ENC.SEEDS&&ENC.SEEDS[g.id]||[]).length).map(g=>g.name));
    add("Groups","no principal",groups.filter(g=>!(ACAD.PRINCIPALS||{})[g.id]).map(g=>g.name));
    add("Groups","no group history, culture or faction text",groups.filter(g=>{const l=ENC.GROUPLORE[g.id]||{};return !(l.history&&l.culture&&l.faction)}).map(g=>g.name));
    add("Girls","hair that does not use the House palette (the Synth and Void use fixed hair on purpose)",members.filter(([g,h])=>{if(g.id==="synth"||g.id==="void")return false;const t=tplById(h+"robes"),c=t&&t.c||{};return !/^@/.test(c.hairBase||"")}).map(([g,h])=>HN(h)));
    add("Girls","thin biography (missing "+THIN.length+" key fields)",members.filter(([g,h])=>THIN.some(f=>!B[h]||!String(B[h][f]||"").trim())).map(([g,h])=>HN(h)));
    const sgOf=new Set();(REL.SG||[]).forEach(p=>{sgOf.add(p[0]);sgOf.add(p[1])});
    const rvOf=new Set();(REL.RV||[]).forEach(p=>{rvOf.add(p[0]);rvOf.add(p[1])});
    add("Girls","no secret girlfriend",members.filter(([g,h])=>!sgOf.has(h)&&!((REL.SG_PENDING||{})[h])).map(([g,h])=>HN(h)));
    add("Girls","no rival",members.filter(([g,h])=>!rvOf.has(h)).map(([g,h])=>HN(h)));
    add("Boys and headmistresses","no bio name or story",members.filter(([g,h])=>{const m=tplById(h+"man"),k=tplById(h+"head");return !m||!k||!(m.bio&&m.bio.fullName)||!(k.bio&&k.bio.fullName)}).map(([g,h])=>HN(h)));
    const FAM=REL.FAM||[],key2=(x,y)=>[x,y].sort().join("|"),rom=new Set((REL.SG||[]).concat(REL.FLING||[]).map(p=>key2(p[0],p[1]))),ageOf=x=>+((B[x]||{}).age)||0;
    add("Family","a tie that is not by blood (the baked-in cast has only real family)",FAM.filter(r=>r[2]!=="blood").map(r=>HN(r[0])+" and "+HN(r[1])));
    add("Family","a family tie that is also a couple or a fling",FAM.filter(r=>rom.has(key2(r[0],r[1]))).map(r=>HN(r[0])+" and "+HN(r[1])));
    add("Family","an elder or younger sister that the ages contradict",FAM.filter(r=>(/younger/.test(r[3])&&!(ageOf(r[1])<ageOf(r[0])))||(/(elder|older)/.test(r[3])&&!(ageOf(r[1])>ageOf(r[0])))).map(r=>HN(r[0])+" and "+HN(r[1])));
    add("Family","a family tie whose biography does not say so",FAM.filter(r=>{const t=x=>String((B[x]||{}).siblings||"")+" "+String((B[x]||{}).family||"");return !t(r[0]).toLowerCase().includes(HN(r[1]).toLowerCase())||!t(r[1]).toLowerCase().includes(HN(r[0]).toLowerCase())}).map(r=>HN(r[0])+" and "+HN(r[1])));
    KINDS.forEach(k=>{const by={};members.forEach(([g,h])=>{const t=tplById(h+k);if(t)(by[t.name]=by[t.name]||[]).push(HN(h))});
      add("Scenes","same "+k+" scene name shared by several Houses",Object.entries(by).filter(([n,l])=>l.length>1).map(([n,l])=>"“"+n+"” ("+l.length+": "+l.slice(0,4).join(", ")+(l.length>4?"…":"")+")"))});
    return out;
  }
  ACAD.healthCheck=check;
  kit.addPanel((body)=>{const h=kit.h;
    body.append(h("h3",null,"Health check"),h("p",{class:"adm-muted"},"Lists what a group or House is still missing: lore, thin biographies, hair without palette roles, girls with no rival or secret girlfriend, boys and headmistresses without a story, and scenes shared by several Houses."));
    const res=h("div",{class:"adm-health"});
    body.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{res.textContent="";const r=check();
      if(!r.length){res.append(h("p",{class:"adm-muted"},"Nothing is missing."));return}
      r.forEach(x=>res.append(h("p",{class:"adm-muted"},h("b",null,x.area+": "+x.what+" ("+x.items.length+")"),h("br"),x.items.slice(0,40).join(", ")+(x.items.length>40?" …":""))))}},"Run the health check")),res)});
})();
