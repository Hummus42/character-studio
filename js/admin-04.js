/* ADMIN-ONLY END */
/* ADMIN-ONLY BEGIN */
/* ---- v260: Edit her. Every headmistress has a page and a full biography; the admin changes it from her page, the same way
   as the boys' (boyed259.js). Her name and her look are changed from her Keeper's editor (Boyfriend and headmistress), so
   her name and address follow her everywhere; her House and group are worked out from the groups and are not edited here.
   Saved like every other change, as edits.heads[house] = {field: text}. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages||typeof tplById!=="function")return;
  const K=ACAD.admin.kit,{h,HN,clone,say,drafts,ensure,commit,linkProblems}=K;
  if(!K.admin)return;
  const SECS=(window.BIO_FIELDS||[]);
  const SKIP=new Set(["fullName","house","group","group2","groupRole","rivalGroup","friends","occupation","address","romType"]);
  const EXTRA={keeperYears:["Keeper of her House (years)","t"],headSince:["Headmistress since","t"],woke:["Her House woke (year; empty if it never slept)","t"],teaches:["Teaches","t"],choosing:["How she chose her Keeper","a"],shoe:["Shoe size","t"],hand:["Dominant hand","t"],exes:["Exes","t"],pets:["Pets","t"]};
  const boy=x=>{const t=tplById(x+"head");return t&&t.bio&&t.bio.fullName?t:null};
  /* her sections: the girls' biography sections, with only the fields she has; her House's own fields first */
  function sections(b){const seen=new Set(),out=[];
    SECS.forEach(([id,label,fields])=>{const fs=fields.filter(f=>!SKIP.has(f[0])&&b[f[0]]!==undefined);fs.forEach(f=>seen.add(f[0]));if(fs.length)out.push([id,label,fs])});
    const more=Object.keys(b).filter(k=>!seen.has(k)&&!SKIP.has(k)&&typeof b[k]==="string").map(k=>[k,(EXTRA[k]||[k])[0],(EXTRA[k]||[0,"t"])[1]]);
    if(more.length){const hs=more.filter(m=>["keeperYears","headSince","woke","teaches","choosing"].includes(m[0])),rest=more.filter(m=>!hs.includes(m));
      if(hs.length)out.unshift(["house","Her House",hs]);if(rest.length){const idn=out.find(s=>s[0]==="identity")||out[0];if(idn)idn[2]=idn[2].concat(rest);else out.push(["more","More",rest])}}
    return out}
  const FL={};SECS.forEach(s=>s[2].forEach(f=>{FL[f[0]]=f[1]}));Object.entries(EXTRA).forEach(([k,v])=>{FL[k]=FL[k]||v[0]});
  K.addChanges((d,out)=>Object.entries(((d.edits||{}).heads)||{}).forEach(([x,p])=>Object.keys(p||{}).forEach(f=>{const t=boy(x);
    out.push({label:`${t?t.bio.fullName:"The "+HN(x)+" headmistress"}: ${FL[f]||f}`,path:["edits","heads",x,f]})})));
  let dlg=null;
  function openHead(x){const t=boy(x);if(!t)return say("There's no headmistress to edit.");if(dlg)dlg.remove();
    const b=t.bio,W={};const S=sections(b);S.forEach(s=>s[2].forEach(f=>{W[f[0]]=String(b[f[0]]==null?"":b[f[0]])}));const W0=clone(W);
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    /* v261: her portrait, uploaded here and saved as edits.images[<house>man] */
    const PK=x+"head";let por=null;const porBox=h("div",{class:"adm-row adm-por"});
    const pin=h("input",{type:"file",accept:"image/*",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;K.portraitFrom(f).then(p=>{por=p;drawPor()}).catch(()=>say("That image couldn't be read."));e.target.value=""}});
    const drawPor=()=>{porBox.textContent="";const cur=por||(ACAD.portraitURL&&ACAD.portraitURL(PK)?{h:ACAD.portraitURL(PK),c:ACAD.portraitURL(PK,true)}:null);
      if(cur)porBox.append(h("img",{src:cur.c,class:"adm-porc",alt:"Portrait card"}),h("img",{src:cur.h,class:"adm-porh",alt:"Round crop"}));
      porBox.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>pin.click()},cur?"Replace portrait":"Upload portrait"),pin))};
    pane.append(h("h3",{class:"adm-sub"},"Portrait"),h("p",{class:"adm-muted"},"A tall image works best (832×1216, like every portrait). It shows on her page and as her round portrait."),porBox);drawPor();
    pane.append(h("p",{class:"adm-muted"},`Her name and her look are changed from ${HN(x)}'s editor (Boyfriend and headmistress); her address follows her name. Her House and group follow from the groups.`));
    S.forEach(([id,label,fields])=>{pane.append(h("h3",{class:"adm-sub"},label));
      fields.forEach(([k,lab,kind,ph])=>{let input;
        if(kind==="s"&&Array.isArray(ph)){const opts=ph.includes(W[k])||!W[k]?ph:[W[k]].concat(ph);input=h("select",{class:"adm-in",onchange:e=>{W[k]=e.target.value}},h("option",{value:""},"Not said"),opts.map(o=>{const op=h("option",{value:o},o);if(o===W[k])op.selected=true;return op}))}
        else if(kind==="a"||String(W[k]).length>90)input=h("textarea",{class:"adm-in",rows:String(W[k]).length>300?6:3,oninput:e=>{W[k]=e.target.value}},W[k]);
        else input=h("input",{class:"adm-in",type:"text",value:W[k],oninput:e=>{W[k]=e.target.value}});
        pane.append(h("label",{class:"adm-f"},h("span",null,lab),input))})});
    const save=()=>{const ch={};Object.keys(W).forEach(k=>{const v=String(W[k]).replace(/[ \t]+/g," ").trim();if(v!==String(W0[k]).trim())ch[k]=v});
      if(!Object.keys(ch).length&&!por){dlg.close();return say("Nothing changed.")}
      const bad=[...new Set(Object.values(ch).flatMap(v=>linkProblems(v)))];msg.textContent="";
      if(bad.length){msg.append(h("b",null,"Fix these first"),h("ul",null,h("li",null,`These links don't lead to a page: ${bad.join(", ")}.`)));return}
      const d=drafts();if(Object.keys(ch).length)Object.assign(ensure(d,"edits","heads",x),ch);if(por)ensure(d,"edits","images",PK).por={h:por.h,c:por.c};commit(d,{page:"head:"+x})};
    dlg=h("dialog",{class:"adm-dlg adm-wide",id:"headDlg","aria-label":"Edit her: "+b.fullName},
      h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Edit her"),h("h2",null,b.fullName),h("p",{class:"adm-lead"},`Headmistress of ${HN(x)} House. Her biography, as her page shows it.`),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>dlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:save},"Save changes"))));
    document.body.append(dlg);dlg.showModal()}
  /* the card on her page */
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build||p.build.heads260ed)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("heads260ed",e)}};p.build.heads260ed=true};
  (ACAD.HOUSES||[]).forEach(x=>wrap("head:"+x,el=>{const side=el.querySelector(".enc-side");if(!side)return;
    side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Change her biography. Her name and look are changed from her Keeper's editor."),
      h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openHead(x)},"Edit her"),h("button",{type:"button",class:"enc-load",onclick:()=>ACAD.admin.edit(x,"men")},"Her Keeper's editor")))) }));
  ACAD.admin.head=openHead;
  {const st=document.createElement("style");st.textContent="#headDlg .adm-sub{margin:18px 0 6px;font-size:15px}";document.head.append(st)}
})();
