/* ADMIN-ONLY END */
/* ADMIN-ONLY BEGIN */
/* ---- v259: Edit him. Each boy of the Houses has a page and a full biography; the admin changes it from his page. His
   name and his look are changed from his girl's editor (Boyfriend and headmistress), so his name follows him everywhere;
   what is worked out from the groups (his House, his group, his role, the other boys, his rivals) is not edited here.
   Saved like every other change, as edits.boys[house] = {field: text}. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages||typeof tplById!=="function")return;
  const K=ACAD.admin.kit,{h,HN,clone,say,drafts,ensure,commit,linkProblems}=K;
  if(!K.admin)return;
  const SECS=(window.BIO_FIELDS||[]);
  const SKIP=new Set(["fullName","house","group","group2","rivalGroup","friends","status","partner","romType"]);
  const EXTRA={title:["His House title","t"],shoe:["Shoe size","t"],hand:["Dominant hand","t"],exes:["Exes","t"],pets:["Pets","t"]};
  const boy=x=>{const t=tplById(x+"man");return t&&t.bio&&t.bio.fullName?t:null};
  /* his sections: the girls' biography sections, with only the fields he has */
  function sections(b){const seen=new Set(),out=[];
    SECS.forEach(([id,label,fields])=>{const fs=fields.filter(f=>!SKIP.has(f[0])&&b[f[0]]!==undefined);fs.forEach(f=>seen.add(f[0]));if(fs.length)out.push([id,label,fs])});
    const more=Object.keys(b).filter(k=>!seen.has(k)&&!SKIP.has(k)&&typeof b[k]==="string").map(k=>[k,(EXTRA[k]||[k])[0],(EXTRA[k]||[0,"t"])[1]]);
    if(more.length){const idn=out.find(s=>s[0]==="identity")||out[0];if(idn)idn[2]=idn[2].concat(more);else out.push(["more","More",more])}
    return out}
  const FL={};SECS.forEach(s=>s[2].forEach(f=>{FL[f[0]]=f[1]}));Object.entries(EXTRA).forEach(([k,v])=>{FL[k]=FL[k]||v[0]});
  K.addChanges((d,out)=>Object.entries(((d.edits||{}).boys)||{}).forEach(([x,p])=>Object.keys(p||{}).forEach(f=>{const t=boy(x);
    out.push({label:`${t?t.bio.fullName:"The boy of "+HN(x)+" House"}: ${FL[f]||f}`,path:["edits","boys",x,f]})})));
  let dlg=null;
  function openBoy(x){const t=boy(x);if(!t)return say("There's no boy to edit.");if(dlg)dlg.remove();
    const b=t.bio,W={};const S=sections(b);S.forEach(s=>s[2].forEach(f=>{W[f[0]]=String(b[f[0]]==null?"":b[f[0]])}));const W0=clone(W);
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    /* v261: his portrait, uploaded here and saved as edits.images[<house>man] */
    const PK=x+"man";let por=null;const porBox=h("div",{class:"adm-row adm-por"});
    const pin=h("input",{type:"file",accept:"image/*",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;K.portraitFrom(f).then(p=>{por=p;drawPor()}).catch(()=>say("That image couldn't be read."));e.target.value=""}});
    const drawPor=()=>{porBox.textContent="";const cur=por||(ACAD.portraitURL&&ACAD.portraitURL(PK)?{h:ACAD.portraitURL(PK),c:ACAD.portraitURL(PK,true)}:null);
      if(cur)porBox.append(h("img",{src:cur.c,class:"adm-porc",alt:"Portrait card"}),h("img",{src:cur.h,class:"adm-porh",alt:"Round crop"}));
      porBox.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>pin.click()},cur?"Replace portrait":"Upload portrait"),pin))};
    pane.append(h("h3",{class:"adm-sub"},"Portrait"),h("p",{class:"adm-muted"},"A tall image works best (832×1216, like every portrait). It shows on his page and as his round portrait."),porBox);drawPor();
    pane.append(h("p",{class:"adm-muted"},`His name and his look are changed from ${HN(x)}'s editor (Boyfriend and headmistress). His House, group and the other boys follow from the groups; his title, role and rivals are written here.`));
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
      const d=drafts();if(Object.keys(ch).length)Object.assign(ensure(d,"edits","boys",x),ch);if(por)ensure(d,"edits","images",PK).por={h:por.h,c:por.c};commit(d,{page:"boy:"+x})};
    dlg=h("dialog",{class:"adm-dlg adm-wide",id:"boyDlg","aria-label":"Edit him: "+b.fullName},
      h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Edit him"),h("h2",null,b.fullName),h("p",{class:"adm-lead"},`${b.title?b.title+", ":""}${HN(x)} House. His biography, as his page shows it.`),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>dlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:save},"Save changes"))));
    document.body.append(dlg);dlg.showModal()}
  /* the card on his page */
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build||p.build.boyed259)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("boyed259",e)}};p.build.boyed259=true};
  (ACAD.HOUSES||[]).forEach(x=>wrap("boy:"+x,el=>{const side=el.querySelector(".enc-side");if(!side)return;
    side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Change his biography. His name and look are changed from his girl's editor."),
      h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openBoy(x)},"Edit him"),h("button",{type:"button",class:"enc-load",onclick:()=>ACAD.admin.edit(x,"men")},"Her editor")))) }));
  ACAD.admin.boy=openBoy;
  {const st=document.createElement("style");st.textContent="#boyDlg .adm-sub{margin:18px 0 6px;font-size:15px}";document.head.append(st)}
})();
