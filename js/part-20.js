/* ---- v250: the first content pass. Places and history become canon the admin can change.
   Edit place (on every place page): name, where it is, its opening line and description, whose haunt it is, whose
   ground it is, whose seat, and its pin on the map (click the map, or nudge it). Add a place (on the Locations
   chapter page) makes a new one with a page, a pin and a number of its own; a place you added can be removed again.
   Edit history (on the Historical Foundations page, and on every event): the eras and their events, in order, and the
   questions the histories leave open. Saved like every other change: into the drafts, listed under Admin with Revert,
   and baked into the file by Save admin edition. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages)return;
  const K=ACAD.admin.kit,{h,clone,say,drafts,ensure,commit,linkProblems,slug,C}=K;
  const AREAS=ENC.PLACE_AREAS||[["walls","Within the walls"],["grounds","The grounds"],["beyond","Beyond the walls"]];
  const PLACES=()=>ENC.PLACES||[];
  const PL=id=>PLACES().find(p=>p.id===id);
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id);
  const gname=id=>(G(id)||{name:id}).name;
  const low=n=>String(n||"").replace(/^The /,"the ");
  const paras=t=>String(t||"").split(/\n\s*\n/).map(x=>x.replace(/\s+/g," ").trim()).filter(Boolean);
  const card=(text,...btns)=>h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},text),h("div",{class:"enc-loads"},...btns));
  const btn=(label,fn,cls)=>h("button",{type:"button",class:cls||"enc-load",onclick:fn},label);

  /* ---------- the change list ---------- */
  const PF={name:"name",area:"where it is",pin:"pin on the map",lead:"opening line",lore:"description",groups:"whose haunt it is",turf:"whose ground it is",faction:"whose seat it is"};
  K.addChanges((d,out)=>{const E=d.edits||{};
    Object.entries(E.places||{}).forEach(([id,p])=>{const nm=(PL(id)||{name:id}).name;Object.keys(p).forEach(f=>out.push({label:`${nm}: ${PF[f]||f}`,path:["edits","places",id,f]}))});
    Object.entries((d.add||{}).places||{}).forEach(([id,a])=>out.push({label:`New place: ${a.name||id}`,path:["add","places",id]}));
    const H=E.history||{};
    if(H.eras)out.push({label:"History: the timeline",path:["edits","history","eras"]});
    if(H.open)out.push({label:"History: what the histories leave open",path:["edits","history","open"]})});
  /* the Admin button counts what the hook adds */
  setTimeout(()=>{try{ACAD.admin.refreshBtn()}catch(e){}},0);

  /* ---------- a map you can click to place a pin ---------- */
  function pinMap(W,id,onmove){
    const wrap=h("div",{class:"adm-map"});
    function draw(){wrap.textContent="";
      const s=ENC.mapSVG({mini:true,mark:"__none"});s.classList.add("adm-pinmap");s.setAttribute("role","img");s.setAttribute("aria-label","Map: click to place the pin");
      s.querySelectorAll(".pin").forEach(a=>{if(a.getAttribute("data-place")===id)a.remove()});
      const NS="http://www.w3.org/2000/svg";const g=document.createElementNS(NS,"g");g.setAttribute("class","pin on adm-newpin");
      const c=document.createElementNS(NS,"circle");c.setAttribute("cx",W.x);c.setAttribute("cy",W.y);c.setAttribute("r",19);
      const t=document.createElementNS(NS,"text");t.setAttribute("x",W.x);t.setAttribute("y",+W.y+5);t.setAttribute("text-anchor","middle");t.textContent=String(W.n||"•");
      g.append(c,t);s.append(g);
      s.addEventListener("click",ev=>{const pt=s.createSVGPoint();pt.x=ev.clientX;pt.y=ev.clientY;const m=s.getScreenCTM();if(!m)return;const q=pt.matrixTransform(m.inverse());
        W.x=Math.round(Math.max(20,Math.min(980,q.x)));W.y=Math.round(Math.max(20,Math.min(620,q.y)));draw();onmove&&onmove()});
      const nud=(dx,dy,l)=>h("button",{type:"button",class:"adm-btn sm","aria-label":"Move the pin "+l,onclick:()=>{W.x=Math.max(20,Math.min(980,W.x+dx));W.y=Math.max(20,Math.min(620,W.y+dy));draw();onmove&&onmove()}},
        {left:"←",up:"↑",down:"↓",right:"→"}[l]);
      wrap.append(s,h("div",{class:"adm-row adm-nudgerow"},h("span",{class:"adm-muted",style:"margin:0"},"Click the map to place the pin, or nudge it:"),nud(-10,0,"left"),nud(0,-10,"up"),nud(0,10,"down"),nud(10,0,"right")))}
    draw();return wrap}

  /* ---------- Edit place / Add a place ---------- */
  let pdlg=null;
  function rivalPairs(){const seen=new Set(),out=[];(ACAD.GROUPS||[]).forEach(g=>{if(!g.rival||!G(g.rival))return;const k=[g.id,g.rival].sort().join("|");if(seen.has(k))return;seen.add(k);const [a,b]=k.split("|");out.push([k,`${gname(a)} and ${low(gname(b))}`])});return out}
  /* a new pin starts on open ground near the castle, clear of every other pin */
  function freeSpot(){let best=[600,330],bd=-1;for(let y=60;y<=600;y+=30)for(let x=60;x<=940;x+=30){const d=Math.min(...PLACES().map(q=>Math.hypot(q.x-x,q.y-y)));
    const score=Math.min(d,60)*1000-Math.hypot(x-610,y-320);if(score>bd){bd=score;best=[x,y]}}return best}
  const hauntOf=gid=>PLACES().find(p=>(p.groups||[]).includes(gid));
  function openPlace(id){if(id&&ACAD.mayEdit&&!ACAD.mayEdit("place:"+id))return say("Only the admin changes what is already in Everspire. Add something new instead.");if(pdlg)pdlg.remove();const isNew=!id;const p=id?PL(id):null;if(id&&!p)return say("That place isn't on the map.");
    const added=isNew||(C.isAddedPlace&&C.isAddedPlace(id));
    const W={name:p?p.name:"",area:p?p.area:"walls",lead:p?p.lead:"",lore:p?(p.lore||[]).join("\n\n"):"",groups:p?(p.groups||[]).slice():[],turf:p&&p.turf?p.turf.slice().sort().join("|"):"",faction:p?p.faction||"":"",
      x:p?p.x:freeSpot()[0],y:p?p.y:freeSpot()[1],n:p?p.n:PLACES().reduce((m,q)=>Math.max(m,+q.n||0),0)+1};
    const W0=clone(W);
    pdlg=h("dialog",{class:"adm-dlg",id:"placeDlg","aria-label":isNew?"New place":"Edit place"});
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    const inp=(lab,k,rows,ph,help)=>h("label",{class:"adm-f"},h("span",null,lab,help?h("small",{style:"display:block;font-size:12px"},help):null),
      rows?h("textarea",{class:"adm-in",rows,placeholder:ph||"",oninput:e=>{W[k]=e.target.value}},W[k]):h("input",{class:"adm-in",type:"text",placeholder:ph||"",value:W[k],oninput:e=>{W[k]=e.target.value}}));
    const sel=(lab,k,opts,none)=>h("label",{class:"adm-f"},h("span",null,lab),h("select",{class:"adm-in",onchange:e=>{W[k]=e.target.value}},none?h("option",{value:""},none):null,
      opts.map(([v,l])=>{const o=h("option",{value:v},l);if(v===W[k])o.selected=true;return o})));
    function draw(){pane.textContent="";
      pane.append(inp("Name","name",0,"The bell tower"),sel("Where it is","area",AREAS),
        inp("Opening line","lead",3,"A narrow tower of grey stone above the north gate, where…","The first thing its page says."),
        inp("What happens there","lore",6,"Who goes there, what it is known for, what people say about it.","Separate paragraphs with a blank line. Link to a page with [[place:hall|the great hall]] or [[group:pack|the Pack]]."));
      pane.append(h("h4",null,"Who it belongs to"),
        h("div",{class:"adm-f"},h("span",null,"Whose haunt it is",h("small",{style:"display:block;font-size:12px"},"A group's page links to its haunt.")),
          h("div",{class:"adm-chips adm-checkgrid"},(ACAD.GROUPS||[]).map(g=>{const at=hauntOf(g.id);const elsewhere=at&&at.id!==id;
            const cb=h("input",{type:"checkbox",onchange:e=>{if(e.target.checked){if(!W.groups.includes(g.id))W.groups.push(g.id)}else W.groups=W.groups.filter(x=>x!==g.id);draw()}});cb.checked=W.groups.includes(g.id);
            return h("label",{class:"adm-radio",style:"margin-right:6px"},cb,g.name,elsewhere&&W.groups.includes(g.id)?h("small",{class:"adm-muted",style:"margin:0"},` (moves here from ${at.name})`):null)}))),
        sel("Whose ground it is","turf",rivalPairs(),"Nobody's"),h("p",{class:"adm-muted"},"Rivals whose feud is fought here. Its page shows where they clash and their rivalry scenes."),
        sel("Whose seat it is","faction",(ENC.FACTIONS||[]).map(f=>[f.id,f.name]),"No faction's"));
      pane.append(h("h4",null,"On the map"),pinMap(W,id,()=>{}))}
    const problems=()=>{const P=[];const nm=String(W.name||"").trim();
      if(!nm)P.push("Give the place a name.");else if(PLACES().some(q=>q.id!==id&&q.name.toLowerCase()===nm.toLowerCase()))P.push(`There is already a place called ${nm}.`);
      if(!String(W.lead||"").trim())P.push("Write its opening line.");
      const bad=[...linkProblems(W.lead),...linkProblems(W.lore)];if(bad.length)P.push(`These links don't lead to a page: ${[...new Set(bad)].join(", ")}. Check the spelling, or remove the brackets.`);
      if(isNew){const nid=slug(nm.replace(/^the\s+/i,""));if(nm&&(!nid||PLACES().some(q=>q.id===nid)||ENC.pages["place:"+nid]))P.push("Choose a different name: that one is taken by another place's page.")}
      const near=PLACES().find(q=>q.id!==id&&Math.hypot(q.x-W.x,q.y-W.y)<26);if(near)P.push(`The pin sits on top of ${near.name}'s. Move it a little.`);
      return P};
    const entry=()=>{const o={name:String(W.name).trim(),area:W.area,x:W.x,y:W.y,lead:String(W.lead).replace(/\s+/g," ").trim(),lore:paras(W.lore)};
      if(W.groups.length)o.groups=W.groups.slice();if(W.turf)o.turf=W.turf.split("|");if(W.faction)o.faction=W.faction;return o};
    /* a group that now haunts this place leaves the place it haunted before */
    const moveHaunts=(d,pid)=>{W.groups.forEach(gid=>{const at=hauntOf(gid);if(!at||at.id===pid)return;const left=(at.groups||[]).filter(x=>x!==gid);
      if(C.isAddedPlace&&C.isAddedPlace(at.id)){const a=ensure(d,"add","places");a[at.id]=Object.assign({},((C.layer().add||{}).places||{})[at.id]||{},a[at.id]||{});if(left.length)a[at.id].groups=left;else delete a[at.id].groups}
      else ensure(d,"edits","places",at.id).groups=left.length?left:null})};
    const saveIt=()=>{const P=problems();msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.map(x=>h("li",null,x))));return}
      const d=drafts();const o=entry();
      if(isNew){const nid=slug(o.name.replace(/^the\s+/i,""));ensure(d,"add","places")[nid]=o;moveHaunts(d,nid);return commit(d,{page:"place:"+nid})}
      if(added){ensure(d,"add","places")[id]=o;moveHaunts(d,id);return commit(d,{page:"place:"+id})}
      const ch={};
      if(o.name!==p.name)ch.name=o.name;if(o.area!==p.area)ch.area=o.area;if(o.lead!==p.lead)ch.lead=o.lead;
      if(JSON.stringify(o.lore)!==JSON.stringify(p.lore||[]))ch.lore=o.lore;
      if(W.x!==W0.x||W.y!==W0.y)ch.pin=[W.x,W.y];
      if(JSON.stringify(W.groups)!==JSON.stringify(W0.groups))ch.groups=W.groups.length?W.groups.slice():null;
      if(W.turf!==W0.turf)ch.turf=W.turf?W.turf.split("|"):null;
      if(W.faction!==W0.faction)ch.faction=W.faction||null;
      if(!Object.keys(ch).length){pdlg.close();return say("Nothing changed.")}
      Object.assign(ensure(d,"edits","places",id),ch);moveHaunts(d,id);commit(d,{page:"place:"+id})};
    const removeIt=()=>{const rx="[[place:"+id+"|";const where=[];
      (ENC.HISTORY||[]).forEach(e=>(e.items||[]).forEach(i=>{if(String(i.text).includes(rx))where.push(`the event “${i.title}”`)}));
      (ENC.HISTORY_OPEN||[]).forEach(q=>{if(String(q[1]).includes(rx))where.push(`the question “${q[0]}”`)});
      PLACES().forEach(q=>{if(q.id!==id&&(String(q.lead)+(q.lore||[]).join(" ")).includes(rx))where.push(q.name)});
      if(!window.confirm(`Remove ${p.name}? Its page and its pin go.`+(where.length?` Links to it in ${where.slice(0,4).join(", ")}${where.length>4?" and "+(where.length-4)+" more":""} will stop leading anywhere; edit those afterwards.`:"")))return;
      if(((C.base().add||{}).places||{})[id]){say(`${p.name} is already saved into this file; it can't be removed here.`);return}
      const d=drafts();if(d.add&&d.add.places)delete d.add.places[id];if(d.edits&&d.edits.places)delete d.edits.places[id];
      commit(d,{page:"places"})};
    pdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>pdlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},isNew?"New place":"Edit place"),h("h2",null,isNew?"A new place":p.name),
        h("p",{class:"adm-lead"},isNew?"It gets a page, a numbered pin on the map and a place in the list. Places you write are new lore.":"Change what its page says, who it belongs to and where its pin is."),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},added&&!isNew?h("button",{type:"button",class:"adm-btn danger",onclick:removeIt},"Remove place"):null,
        h("button",{type:"button",class:"adm-btn",onclick:()=>pdlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:saveIt},isNew?"Make the place canon":"Save changes"))));
    document.body.append(pdlg);pdlg.showModal();draw()}

  /* ---------- Edit history ---------- */
  let hdlg=null;
  function openHistory(focus){if(hdlg)hdlg.remove();
    /* v258: a player adds events (to an era, or in a new era of her own); the events already there stay as they are */
    const ADD=!K.admin;const key=i=>JSON.stringify([String(i.when||""),String(i.title||""),String(i.text||"")]);
    const CANON=new Set(ADD&&C.canonHistory?[].concat(...C.canonHistory().map(e=>(e.items||[]).map(key))):[]);const CANONERA=new Set(ADD&&C.canonHistory?C.canonHistory().map(e=>e.era):[]);
    const locked=it=>ADD&&CANON.has(key(it));
    const W={eras:clone(ENC.HISTORY||[]).map(e=>({era:e.era,items:(e.items||[]).map(i=>({when:i.when||"",title:i.title||"",text:i.text||"",tag:i.tag||"n"}))})),open:clone(ENC.HISTORY_OPEN||[])};
    const J0=JSON.stringify(W.eras),O0=JSON.stringify(W.open);let tab=focus&&focus.tab==="open"&&!ADD?"open":"time";
    hdlg=h("dialog",{class:"adm-dlg adm-wide",id:"historyDlg","aria-label":"Edit history"});
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"}),tabs=h("div",{class:"adm-tabs",role:"tablist"});
    const field=(lab,o,k,rows,ph)=>h("label",{class:"adm-f"},h("span",null,lab),rows?h("textarea",{class:"adm-in",rows,placeholder:ph||"",oninput:e=>{o[k]=e.target.value}},o[k]):h("input",{class:"adm-in",type:"text",placeholder:ph||"",value:o[k],oninput:e=>{o[k]=e.target.value}}));
    const mv=(arr,i,d)=>{const j=i+d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]]};
    function drawTabs(){tabs.textContent="";if(ADD)return;[["time","The timeline"],["open","Left open"]].forEach(([k,l])=>tabs.append(h("button",{type:"button",role:"tab","aria-selected":tab===k?"true":"false",onclick:()=>{tab=k;draw()}},l)))}
    function draw(){drawTabs();pane.textContent="";
      if(tab==="time"){
        pane.append(h("p",{class:"adm-muted"},ADD?"Add events to any era, or begin a new era of your own. The events already in the history stay as they are. Link to a page with [[place:hall|the great hall]] or [[group:deep|the Deep]].":"Eras run from the oldest to now, and so do the events in each. Link to a page with [[place:hall|the great hall]] or [[group:deep|the Deep]]."));
        W.eras.forEach((e,ei)=>{const box=h("div",{class:"adm-card adm-era"});
          if(ADD&&CANONERA.has(e.era))box.append(h("h4",{style:"margin:0 0 6px"},e.era));else box.append(h("div",{class:"adm-row"},h("input",{class:"adm-in adm-eraname",type:"text","aria-label":"Era name",value:e.era,placeholder:"The Modern Academy",oninput:ev=>{e.era=ev.target.value}}),
            h("button",{type:"button",class:"adm-btn sm","aria-label":"Move this era earlier",onclick:()=>{mv(W.eras,ei,-1);draw()}},"↑"),
            h("button",{type:"button",class:"adm-btn sm","aria-label":"Move this era later",onclick:()=>{mv(W.eras,ei,1);draw()}},"↓"),
            h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{if(e.items.some(i=>String(i.when+i.title+i.text).trim())&&!window.confirm(`Remove the era “${e.era}” and its ${e.items.length} events?`))return;W.eras.splice(ei,1);draw()}},"Remove era")));
          e.items.forEach((it,ii)=>{if(locked(it)){box.append(h("div",{class:"adm-card adm-ev adm-locked","data-ev":ei+":"+ii},h("b",null,it.when+": "+it.title),h("p",{class:"adm-muted",style:"margin:4px 0 0"},String(it.text).replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,"$1"))));return}
            const c=h("div",{class:"adm-card adm-ev","data-ev":ei+":"+ii});
            c.append(field("When",it,"when",0,"About a century ago"),field("Title",it,"title",0,"The aquarium wing is sealed"),field("What happened",it,"text",4),
              h("div",{class:"adm-actions"},ADD?null:
                h("button",{type:"button",class:"adm-btn sm","aria-label":"Move this event earlier",onclick:()=>{if(ii>0)mv(e.items,ii,-1);else if(ei>0){W.eras[ei-1].items.push(e.items.splice(ii,1)[0])}draw()}},"↑ Earlier"),
                ADD?null:h("button",{type:"button",class:"adm-btn sm","aria-label":"Move this event later",onclick:()=>{if(ii<e.items.length-1)mv(e.items,ii,1);else if(ei<W.eras.length-1){W.eras[ei+1].items.unshift(e.items.splice(ii,1)[0])}draw()}},"↓ Later"),
                h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{e.items.splice(ii,1);draw()}},"Remove event")));
            box.append(c)});
          box.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>{e.items.push({when:"",title:"",text:"",tag:"n"});draw();
            const last=[...pane.querySelectorAll(`[data-ev="${ei}:${e.items.length-1}"] input`)][0];if(last)last.focus()}},"Add an event to this era")));
          pane.append(box)});
        pane.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{W.eras.push({era:"",items:[{when:"",title:"",text:"",tag:"n"}]});draw();const ins=pane.querySelectorAll(".adm-eraname");if(ins.length)ins[ins.length-1].focus()}},"Add an era")))}
      else{
        pane.append(h("p",{class:"adm-muted"},"Questions the histories leave unanswered on purpose, each with what people say."));
        W.open.forEach((q,qi)=>{const o={q:q[0],a:q[1]};const c=h("div",{class:"adm-card"});
          const f1=field("Question",o,"q",0,"Who rang the first bell?"),f2=field("What people say",o,"a",3);
          [f1,f2].forEach(f=>f.addEventListener("input",()=>{W.open[qi]=[o.q,o.a]}));
          c.append(f1,f2,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>{mv(W.open,qi,-1);draw()}},"↑"),h("button",{type:"button",class:"adm-btn sm",onclick:()=>{mv(W.open,qi,1);draw()}},"↓"),
            h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{W.open.splice(qi,1);draw()}},"Remove question")));pane.append(c)});
        pane.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{W.open.push(["",""]);draw();const ins=pane.querySelectorAll(".adm-card input");if(ins.length)ins[ins.length-1].focus()}},"Add a question")))}}
    const problems=()=>{const P=[];const names=new Set();
      if(!W.eras.length)P.push("The timeline needs at least one era.");
      W.eras.forEach((e,ei)=>{const nm=String(e.era||"").trim();if(!nm)P.push(`Era ${ei+1} needs a name.`);else if(names.has(nm.toLowerCase()))P.push(`Two eras are called “${nm}”.`);names.add(nm.toLowerCase());
        if(!e.items.length)P.push(`“${nm||"Era "+(ei+1)}” has no events. Add one, or remove the era.`);
        e.items.forEach((it,ii)=>{const lab=`“${String(it.title||"").trim()||"Event "+(ii+1)}” in ${nm||"era "+(ei+1)}`;["when","title","text"].forEach(k=>{if(!String(it[k]||"").trim())P.push(`${lab} needs ${k==="when"?"a when":k==="title"?"a title":"its story"}.`)});
          const bad=linkProblems(it.text);if(bad.length)P.push(`${lab}: these links don't lead to a page: ${bad.join(", ")}.`)})});
      W.open.forEach((q,qi)=>{if(!String(q[0]||"").trim()||!String(q[1]||"").trim())P.push(`Question ${qi+1} needs both the question and what people say.`);const bad=linkProblems(q[1]);if(bad.length)P.push(`Question ${qi+1}: these links don't lead to a page: ${bad.join(", ")}.`)});
      return P};
    const tidy=()=>({eras:W.eras.map(e=>({era:String(e.era).trim(),items:e.items.map(i=>({when:String(i.when).trim(),title:String(i.title).trim(),text:String(i.text).replace(/\s+/g," ").trim(),tag:i.tag||"n"}))})),
      open:W.open.map(q=>[String(q[0]).trim(),String(q[1]).replace(/\s+/g," ").trim()])});
    const saveIt=()=>{const P=problems();msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.slice(0,8).map(x=>h("li",null,x)),P.length>8?h("li",null,`and ${P.length-8} more`):null));return}
      const t=tidy();const d=drafts();const H=ensure(d,"edits","history");let any=false;
      if(JSON.stringify(t.eras)!==J0){H.eras=t.eras;any=true}if(JSON.stringify(t.open)!==O0){H.open=t.open;any=true}
      if(!any){hdlg.close();return say("Nothing changed.")}commit(d,{page:"history"})};
    hdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>hdlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},ADD?"Add to the history":"Edit history"),h("h2",null,"Historical Foundations"),tabs,pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>hdlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:saveIt},ADD?"Add to my lore":"Save changes"))));
    document.body.append(hdlg);hdlg.showModal();draw();
    if(focus&&focus.ev){const c=pane.querySelector(`[data-ev="${focus.ev}"]`);if(c){c.scrollIntoView({block:"center"});c.classList.add("adm-focus");const i=c.querySelector("input");if(i)i.focus()}}}

  /* ---------- where the buttons go ---------- */
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("admin250",e)}}};
  PLACES().forEach(p=>wrap("place:"+p.id,el=>{const side=el.querySelector(".enc-side");if(!side||!(ACAD.mayEdit?ACAD.mayEdit("place:"+p.id):K.admin))return;
    const added=C.isAddedPlace&&C.isAddedPlace(p.id);
    side.prepend(card(added?"A place you added. Change what its page says, who it belongs to or where its pin is, or remove it.":"Change the place's name, description, who it belongs to or where its pin is.",btn("Edit place",()=>openPlace(p.id))))}));
  wrap("places",el=>{const art=el.querySelector(".enc-article");if(!art)return;const n=art.querySelector(".enc-note");
    const c=card("Add a place to the map. It gets a numbered pin, a page and a place in the list.",btn("Add a place",()=>openPlace(null)));c.classList.add("adm-card-inline");(n||art.firstChild).after(c)});
  wrap("history",el=>{const art=el.querySelector(".enc-article");if(!art)return;const lead=art.querySelector(".enc-lead");
    const c=K.admin?card("Change, add, reorder or remove the eras, the events and the questions the histories leave open.",btn("Edit history",()=>openHistory())):card("Add events to the history: in an era, or in a new era of your own.",btn("Add to the history",()=>openHistory({add:true})));c.classList.add("adm-card-inline");(lead||art.firstChild).after(c);if(!K.admin)return;
    let ei=-1,ii=0;art.querySelectorAll(".enc-timeline > li").forEach(li=>{if(li.classList.contains("era")){ei++;ii=0;return}
      const what=li.querySelector(".what");if(!what)return;const key=ei+":"+(ii++);what.append(h("button",{type:"button",class:"adm-evedit","aria-label":"Edit this event",onclick:()=>openHistory({ev:key})},"Edit"))});
    const dl=art.querySelector(".enc-open");if(dl)dl.after(h("div",{class:"enc-loads",style:"margin-top:8px"},btn("Edit the open questions",()=>openHistory({tab:"open"}))))});

  ACAD.admin.place=openPlace;ACAD.admin.history=openHistory;

  const st=document.createElement("style");st.id="admCss250";st.textContent=`
.adm-dlg.adm-wide{width:min(860px,calc(100vw - 32px))}
.adm-map .enc-map{cursor:crosshair;max-width:100%}
.adm-map .enc-map .pin.dim{opacity:.55}
.adm-map .adm-newpin circle{fill:#d8b25a;stroke:#fff;stroke-width:2.5}
.adm-map .adm-newpin text{fill:#151931;font:700 15px system-ui,sans-serif}
.adm-nudgerow{margin-top:6px;gap:6px}
.adm-checkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:4px 10px;margin:0}
.adm-checkgrid .adm-radio{margin:0;font-size:14px}
.adm-era{padding:12px 14px}.adm-era>.adm-row .adm-eraname{font-weight:600;font-size:15px}
.adm-ev{margin:10px 0 0;background:var(--a-bg)}.adm-ev.adm-focus{outline:2px solid var(--a-accent);outline-offset:2px}
.adm-card-inline{max-width:560px;margin:10px 0 14px}
.adm-evedit{margin-top:4px;font:inherit;font-size:12.5px;border:1px solid currentColor;background:none;color:inherit;opacity:.7;border-radius:6px;padding:1px 8px;cursor:pointer}
.adm-evedit:hover,.adm-evedit:focus-visible{opacity:1}`;
  /* the map's own styles live under the Encyclopedia; borrow them for the map in the editor */
  try{const src=document.getElementById("encCss227");if(src){const rules=src.textContent.split("}").filter(r=>r.includes(".enc-map")).map(r=>r.replace(/#encDlg /g,".adm-map ")+"}").join("\n");st.textContent=rules+"\n"+st.textContent}}catch(e){}
  document.head.append(st);
})();
/* ---- v251: the second content pass. Culture and reference become canon the admin can change: the Everspire year,
   the Spire Cup, when regalia is worn, names and address, the unwritten rules, every group's traditions, the customs
   of the heart, what is at stake in each great rivalry, the mysteries (the Canon Reference's open questions), every
   group's story seeds, the rules every story keeps and the glossary. Each has an Edit button where it is shown; one
   editor handles them all, by the shape of the lore (a text, a list, a list of named entries, rows with fields, or the
   year's seasons). Saved like every other change. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages)return;
  const K=ACAD.admin.kit,{h,clone,say,drafts,ensure,commit,linkProblems}=K,C=ACAD.canon;
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id);
  const gname=id=>(G(id)||{name:id}).name;
  const pairName=k=>{const [a,b]=k.split("|");return `${gname(a)} and ${gname(b).replace(/^The /,"the ")}`};
  const D=k=>(ENC.LORE_DATA||{})[k]?ENC.LORE_DATA[k]():undefined;
  const ROWS={gloss:[["Word","input","the Accord"],["Meaning","textarea"],["Its page","link","history"]],myst:[["Question","input","Who rings the bells?"],["What people say","textarea"],["Pages it links to","links","place:spire, group:deep"]]};
  /* v254: lore the later tools add (the World Overview's blocks, the chapters' openings) */
  const EXTRA=[];
  /* every piece of lore the editor knows: its label, its shape, where it is shown and its value now */
  function spec(key){
    const fixed={
      "culture.year":{label:"The Everspire year",page:"culture",shape:"year"},
      "culture.cup":{label:"The Spire Cup",page:"culture",shape:"text"},
      "culture.dress":{label:"When regalia is worn",page:"culture",shape:"text"},
      "culture.names":{label:"Names and address",page:"culture",shape:"strings",item:"Custom"},
      "culture.rules":{label:"The unwritten rules",page:"culture",shape:"strings",item:"Rule"},
      "cast.customs":{label:"Customs of the heart",page:"cast",shape:"strings",item:"Custom"},
      "ref.rules":{label:"Rules every story keeps",page:"canon",shape:"strings",item:"Rule"},
      "ref.gloss":{label:"The glossary",page:"canon",shape:"rows",fields:ROWS.gloss},
      "conflicts.myst":{label:"The mysteries and open questions",page:"conflicts",shape:"rows",fields:ROWS.myst}}[key];
    if(fixed)return Object.assign({key,value:D(key)},fixed);
    for(const x of EXTRA){const s=x(key);if(s)return s}
    let m;
    if((m=/^group\.traditions\.(.+)$/.exec(key)))return {key,label:`${gname(m[1])}: traditions`,page:"group:"+m[1],shape:"named",item:"Tradition",value:((ENC.GROUPLORE||{})[m[1]]||{}).traditions||[]};
    if((m=/^conflicts\.seeds\.(.+)$/.exec(key)))return {key,label:`${gname(m[1])}: story seeds`,page:"group:"+m[1],shape:"strings",item:"Story seed",value:(ENC.SEEDS||{})[m[1]]||[]};
    if((m=/^conflicts\.stakes\.(.+)$/.exec(key)))return {key,label:`${pairName(m[1])}: what is at stake`,page:"conflicts",shape:"text",value:(ENC.STAKES||{})[m[1]]||""};
    return null}

  /* ---------- the change list ---------- */
  K.addChanges((d,out)=>{Object.keys(((d.edits||{}).lore)||{}).forEach(k=>{const s=spec(k);out.push({label:s?s.label:k,path:["edits","lore",k]})})});
  setTimeout(()=>{try{ACAD.admin.refreshBtn()}catch(e){}},0);

  /* ---------- one editor for every shape ---------- */
  let dlg=null;
  const resolves=id=>{try{return !!(ENC.resolve?ENC.resolve(id):ENC.pages[id])}catch(e){return false}};
  function openLore(key){const S=spec(key);if(!S)return say("That lore can't be edited here.");if(dlg)dlg.remove();
    /* v258: a player adds entries after the ones already there, which stay as they are */
    const ADD=!K.admin;if(ADD&&!(C.playerLore&&C.playerLore(key)))return say("Only the admin changes this.");
    const CAN=ADD&&C.canonLore?C.canonLore(key):null;
    const n0=ADD&&Array.isArray(CAN)&&S.shape!=="year"?CAN.length:0;
    const n0s=season=>{if(!ADD||!Array.isArray(CAN))return 0;const c=CAN.find(x=>x&&x.season===season);return c?(c.items||[]).length:0};
    const lockedCard=txt=>h("div",{class:"adm-card adm-locked"},h("p",{style:"margin:0"},String(txt||"").replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,"$1")));
    let W;
    if(S.shape==="text")W={text:String(S.value||"")};
    else if(S.shape==="strings")W={items:(S.value||[]).map(String)};
    else if(S.shape==="named")W={items:(S.value||[]).map(t=>{const i=String(t).indexOf(": ");return i>0?{name:t.slice(0,i),text:t.slice(i+2)}:{name:"",text:String(t)}})};
    else if(S.shape==="rows")W={rows:(S.value||[]).map(r=>S.fields.map((f,i)=>f[1]==="links"?(r[i]||[]).join(", "):String(r[i]==null?"":r[i])))};
    else if(S.shape==="blocks")W={blocks:(S.value||[]).map(b=>{const k=b[0];return k==="list"?{k,t:(b[1]||[]).join("\n"),tag:b[2]||"n"}:k==="facts"?{k,t:(b[1]||[]).map(([a,v])=>a+": "+v).join("\n"),tag:b[2]||"n"}:k==="quote"?{k,t:b[1]||"",cite:b[2]||"",tag:b[3]||"n"}:{k,t:b[1]||"",tag:b[2]||"n"}})};
    else if(S.shape==="year")W={seasons:clone(S.value||[]).map(s=>({season:s.season,cls:s.cls,items:s.items.map(i=>[i[0],i[1],i[2],(i[3]||[]).join(", ")])}))};
    const out0=JSON.stringify(result());
    dlg=h("dialog",{class:"adm-dlg adm-wide",id:"loreDlg","aria-label":"Edit "+S.label});
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    const mv=(arr,i,d)=>{const j=i+d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]]};
    const fld=(lab,o,k,type,ph)=>h("label",{class:"adm-f"},h("span",null,lab),type==="textarea"?h("textarea",{class:"adm-in",rows:3,placeholder:ph||"",oninput:e=>{o[k]=e.target.value}},o[k]):h("input",{class:"adm-in",type:"text",placeholder:ph||"",value:o[k],oninput:e=>{o[k]=e.target.value}}));
    const tools=(arr,i,what)=>ADD?h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{arr.splice(i,1);draw()}},"Remove "+what.toLowerCase())):h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm","aria-label":"Move up",onclick:()=>{mv(arr,i,-1);draw()}},"↑"),h("button",{type:"button",class:"adm-btn sm","aria-label":"Move down",onclick:()=>{mv(arr,i,1);draw()}},"↓"),
      h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{arr.splice(i,1);draw()}},"Remove "+what.toLowerCase()));
    const addBtn=(label,fn)=>h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{fn();draw();const c=[...pane.querySelectorAll(".adm-card")].pop();const i=c&&c.querySelector("input,textarea");if(i)i.focus()}},label));
    const LINKHELP="Link to a page with [[place:hall|the great hall]] or [[group:pack|the Pack]].";
    function draw(){pane.textContent="";
      if(S.shape==="text"){pane.append(h("p",{class:"adm-muted"},LINKHELP),fld("Text",W,"text","textarea"));const ta=pane.querySelector("textarea");ta.rows=6;
        /* v259: counts in double braces are filled in as the world changes; show how the text reads today */
        if(/\{\{/.test(W.text)&&ACAD.CT&&ACAD.CT.fill){const now=h("p",{class:"adm-muted adm-reads"});const show=()=>{now.textContent="Reads today: "+ACAD.CT.fill(W.text).replace(/\[\[[^|\]]+\|([^\]]+)\]\]/g,"$1")};show();ta.addEventListener("input",show);
          pane.append(h("p",{class:"adm-muted"},"Words in double braces, like {{n:groups}}, are counts the page fills in as Houses and groups are added. Keep them as they are."),now)}}
      if(S.shape==="strings"){pane.append(h("p",{class:"adm-muted"},"In the order they are shown. "+LINKHELP));
        W.items.forEach((t,i)=>{if(i<n0)return pane.append(lockedCard(t));const o={t};const c=h("div",{class:"adm-card"});const f=fld(S.item+" "+(i+1),o,"t","textarea");f.addEventListener("input",()=>{W.items[i]=o.t});c.append(f,tools(W.items,i,S.item));pane.append(c)});
        pane.append(addBtn("Add "+S.item.toLowerCase(),()=>W.items.push("")))}
      if(S.shape==="named"){pane.append(h("p",{class:"adm-muted"},"Each has a name and what it is. "+LINKHELP));
        W.items.forEach((it,i)=>{if(i<n0)return pane.append(lockedCard((it.name?it.name+": ":"")+it.text));const c=h("div",{class:"adm-card"});c.append(fld("Name",it,"name","input","The Long Run"),fld("What it is",it,"text","textarea"),tools(W.items,i,S.item));pane.append(c)});
        pane.append(addBtn("Add "+S.item.toLowerCase(),()=>W.items.push({name:"",text:""})))}
      if(S.shape==="rows"){pane.append(h("p",{class:"adm-muted"},"Pages are written as their address: place:hall, group:pack, history. "+LINKHELP));
        W.rows.forEach((r,i)=>{if(i<n0)return pane.append(lockedCard(r.filter(Boolean).join(" · ")));const c=h("div",{class:"adm-card"});S.fields.forEach((f,j)=>{const o={v:r[j]};const e=fld(f[0],o,"v",f[1]==="textarea"?"textarea":"input",f[2]);e.addEventListener("input",()=>{r[j]=o.v});c.append(e)});c.append(tools(W.rows,i,"entry"));pane.append(c)});
        pane.append(addBtn("Add an entry",()=>W.rows.push(S.fields.map(()=>""))))}
      if(S.shape==="blocks"){pane.append(h("p",{class:"adm-muted"},"The page from top to bottom. A list takes one item per line; facts take one “Label: value” per line. "+LINKHELP));
        const KINDS=[["lead","Opening paragraph"],["h","Heading"],["p","Paragraph"],["list","List"],["facts","Facts"],["quote","Quotation"]];
        W.blocks.forEach((bk,i)=>{const c=h("div",{class:"adm-card"});
          c.append(h("label",{class:"adm-f"},h("span",null,"Kind"),h("select",{class:"adm-in",onchange:e=>{bk.k=e.target.value;draw()}},KINDS.map(([v,l])=>{const o=h("option",{value:v},l);if(v===bk.k)o.selected=true;return o}))),
            fld(bk.k==="h"?"Heading":bk.k==="list"?"Items":bk.k==="facts"?"Facts":"Text",bk,"t",bk.k==="h"?"input":"textarea"));
          if(bk.k==="quote")c.append(fld("Who said it",bk,"cite","input"));
          const ta=c.querySelector("textarea");if(ta&&(bk.k==="list"||bk.k==="facts"||bk.k==="lead"))ta.rows=Math.min(10,Math.max(3,String(bk.t).split("\n").length+1));
          c.append(tools(W.blocks,i,"block"));pane.append(c)});
        pane.append(addBtn("Add a paragraph",()=>W.blocks.push({k:"p",t:"",tag:"n"})))}
      if(S.shape==="year"){pane.append(h("p",{class:"adm-muted"},"The seasons run from Choosing Morning to Graduation. Pages are written as their address: place:hall, group:pack. "+LINKHELP));
        W.seasons.forEach(s=>{const box=h("div",{class:"adm-card adm-era"},h("h4",{style:"margin:0 0 4px"},s.season));
          s.items.forEach((it,i)=>{if(i<n0s(s.season))return box.append(lockedCard(it[0]+" ("+it[1]+"): "+it[2]));const c=h("div",{class:"adm-card adm-ev"});[["Name","input","The Long Run"],["When","input","Every full moon"],["What happens","textarea"],["Pages it links to","input","group:pack, place:trail"]].forEach((f,j)=>{const o={v:it[j]};const e=fld(f[0],o,"v",f[1],f[2]);e.addEventListener("input",()=>{it[j]=o.v});c.append(e)});
            c.append(tools(s.items,i,"day"));box.append(c)});
          box.append(h("div",{class:"adm-actions",style:"margin-top:8px"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>{s.items.push(["","","",""]);draw()}},"Add a day to "+s.season.toLowerCase())));pane.append(box)})}}
    function result(){const tidy=t=>String(t||"").replace(/\s+/g," ").trim(),ids=t=>String(t||"").split(/[,\s]+/).map(x=>x.trim()).filter(Boolean);
      if(S.shape==="text")return tidy(W.text);
      if(S.shape==="strings")return W.items.map(tidy);
      if(S.shape==="named")return W.items.map(it=>tidy(it.name)?tidy(it.name)+": "+tidy(it.text):tidy(it.text));
      if(S.shape==="rows")return W.rows.map(r=>S.fields.map((f,j)=>f[1]==="links"?ids(r[j]):tidy(r[j])));
      if(S.shape==="blocks")return W.blocks.map(bk=>{const t=String(bk.t||"");
        if(bk.k==="list")return["list",t.split("\n").map(x=>x.trim()).filter(Boolean),bk.tag||"n"];
        if(bk.k==="facts")return["facts",t.split("\n").map(x=>x.trim()).filter(Boolean).map(x=>{const i=x.indexOf(":");return i>0?[x.slice(0,i).trim(),x.slice(i+1).trim()]:[x,""]}),bk.tag||"n"];
        if(bk.k==="quote")return["quote",tidy(t),tidy(bk.cite),bk.tag||"n"];
        if(bk.k==="h")return["h",tidy(t)];
        return[bk.k,tidy(t),bk.tag||"n"]});
      if(S.shape==="year")return W.seasons.map(s=>({season:s.season,cls:s.cls,items:s.items.map(i=>[tidy(i[0]),tidy(i[1]),tidy(i[2]),ids(i[3])])}))}
    function problems(v){const P=[];const texts=[],pageIds=[];
      if(S.shape==="text"){if(!v)P.push("Write the text.");texts.push(v)}
      if(S.shape==="strings"||S.shape==="named"){v.forEach((t,i)=>{if(!t)P.push(`${S.item} ${i+1} is empty. Write it, or remove it.`);texts.push(t)});
        if(S.shape==="named")W.items.forEach((it,i)=>{if(!String(it.name||"").trim())P.push(`${S.item} ${i+1} needs a name.`)})}
      if(S.shape==="rows"){const seen=new Set();v.forEach((r,i)=>{S.fields.forEach((f,j)=>{if(f[1]==="links")pageIds.push(...r[j]);else if(f[1]==="link"){if(r[j])pageIds.push(r[j])}else{if(!r[j])P.push(`Entry ${i+1} needs ${f[0].toLowerCase()}.`);texts.push(r[j])}});
        const w=String(r[0]).toLowerCase();if(w&&seen.has(w))P.push(`“${r[0]}” is in the list twice.`);seen.add(w)})}
      if(S.shape==="blocks"){if(!v.length)P.push("The page needs at least one block.");v.forEach((b,i)=>{const txt=b[0]==="list"?b[1]:b[0]==="facts"?b[1].map(x=>x.join(" ")):[b[1]];
        if(!txt.length||txt.some(x=>!String(x).trim()))P.push(`Block ${i+1} is empty. Write it, or remove it.`);if(b[0]==="facts")b[1].forEach(([a,x])=>{if(!x)P.push(`Block ${i+1}: “${a}” needs “Label: value”.`)});texts.push(...txt)})}
      if(S.shape==="year")v.forEach(s=>s.items.forEach((it,i)=>{const lab=`${s.season}, custom ${i+1}`;if(!it[0])P.push(`${lab} needs a name.`);if(!it[2])P.push(`${lab} needs what happens.`);texts.push(it[1],it[2]);pageIds.push(...it[3])}));
      const bad=[...new Set(texts.flatMap(t=>linkProblems(t)))];if(bad.length)P.push(`These links don't lead to a page: ${bad.join(", ")}.`);
      const badIds=[...new Set(pageIds.filter(x=>!resolves(x)))];if(badIds.length)P.push(`These pages don't exist: ${badIds.join(", ")}. Write them as place:hall, group:pack or history.`);
      return P}
    const saveIt=()=>{const v=result();const P=problems(v);msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.slice(0,8).map(x=>h("li",null,x)),P.length>8?h("li",null,`and ${P.length-8} more`):null));return}
      if(JSON.stringify(v)===out0){dlg.close();return say("Nothing changed.")}
      const d=drafts();ensure(d,"edits","lore")[key]=v;commit(d,{page:S.page})};
    dlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},ADD?"Add to the lore":"Edit lore"),h("h2",null,S.label),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>dlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:saveIt},ADD?"Add to my lore":"Save changes"))));
    document.body.append(dlg);dlg.showModal();draw()}

  /* ---------- where the Edit buttons go ---------- */
  const eb=(key,label)=>!K.admin&&!(C.playerLore&&C.playerLore(key))?document.createTextNode(""):!K.admin?h("button",{type:"button",class:"adm-evedit adm-loreedit","aria-label":"Add to "+(label||spec(key).label),onclick:()=>openLore(key)},"Add"):h("button",{type:"button",class:"adm-evedit adm-loreedit","aria-label":"Edit "+(label||spec(key).label),onclick:()=>openLore(key)},"Edit");
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("admin251",e)}}};
  const atHeading=(el,text,key)=>{const hh=[...el.querySelectorAll("h3.enc-h")].find(x=>x.textContent.replace(/(Edit|Add)$/,"").trim()===text);const b=eb(key);if(b&&hh&&!hh.querySelector(".adm-loreedit"))hh.append(" ",b)};
  wrap("culture",el=>{
    atHeading(el,"The Everspire year","culture.year");atHeading(el,"The Spire Cup","culture.cup");atHeading(el,"Robes, regalia and colors","culture.dress");
    atHeading(el,"Names and address","culture.names");atHeading(el,"The unwritten rules","culture.rules");
    el.querySelectorAll(".enc-trads .tr").forEach((c,i)=>{const g=(ACAD.GROUPS||[])[i];if(g)c.querySelector(".gh").append(eb("group.traditions."+g.id))})});
  wrap("cast",el=>atHeading(el,"Customs of the heart","cast.customs"));
  wrap("canon",el=>{atHeading(el,"Rules every story keeps","ref.rules");atHeading(el,"Open questions","conflicts.myst");atHeading(el,"Glossary","ref.gloss")});
  wrap("conflicts",el=>{atHeading(el,"Mysteries","conflicts.myst");
    el.querySelectorAll(".enc-seeds .sd").forEach((c,i)=>{const g=(ACAD.GROUPS||[])[i];if(g)c.querySelector(".gh").append(eb("conflicts.seeds."+g.id))});
    el.querySelectorAll(".enc-vs").forEach(v=>{const ids=[...v.querySelectorAll(".top a.vside")].map(a=>{const g=(ACAD.GROUPS||[]).find(x=>x.name===(a.querySelector("b")||{}).textContent);return g&&g.id}).filter(Boolean);
      if(ids.length!==2)return;const k=ids.slice().sort().join("|");const p=[...v.querySelectorAll(".body p")].find(x=>/^At stake\./.test(x.textContent));if(p)p.append(" ",eb("conflicts.stakes."+k))})});
  (ACAD.GROUPS||[]).forEach(g=>wrap("group:"+g.id,el=>{atHeading(el,"Traditions","group.traditions."+g.id);atHeading(el,"Stories waiting to happen","conflicts.seeds."+g.id);
    /* a group with none yet can start them */
    const side=el.querySelector(".enc-side");if(!side)return;const tr=((ENC.GROUPLORE||{})[g.id]||{}).traditions||[],sd=(ENC.SEEDS||{})[g.id]||[];
    if(!K.admin){side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Your lore"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Add a tradition or a story of your own to this group's lore."),
      h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openLore("group.traditions."+g.id)},"Add a tradition"),h("button",{type:"button",class:"enc-load",onclick:()=>openLore("conflicts.seeds."+g.id)},"Add a story seed"))));return}
    if(!tr.length||!sd.length)side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Lore"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Write this group's "+(!tr.length&&!sd.length?"traditions and story seeds":!tr.length?"traditions":"story seeds")+"."),
      h("div",{class:"enc-loads"},!tr.length?h("button",{type:"button",class:"enc-load",onclick:()=>openLore("group.traditions."+g.id)},"Write traditions"):null,!sd.length?h("button",{type:"button",class:"enc-load",onclick:()=>openLore("conflicts.seeds."+g.id)},"Write story seeds"):null)))}));

  ACAD.admin.lore=openLore;ACAD.admin.addLoreSpec=f=>EXTRA.push(f);ACAD.admin.loreSpec=k=>{const s=spec(k);return s?{label:s.label,shape:s.shape,page:s.page}:null};
  const st=document.createElement("style");st.id="admCss251";st.textContent=`
.adm-loreedit{vertical-align:middle;margin-left:6px;font-family:var(--e-sans,system-ui,sans-serif);font-weight:400}
h3.enc-h .adm-loreedit{font-size:12.5px}`;
  document.head.append(st);
})();
/* ---- v254: the third content pass. The wider world becomes canon the admin can change:
   Edit faction (on each faction page) and Add a faction (on Houses and Groups): name, short name, motto, tagline, seat,
   sigil, colors, its lore and, for a new faction, its dean and the groups that join it.
   Edit dean / Edit Headmaster (on their pages): name, title, look, lore, a line of their own.
   Edit lost group (on each lost group's page) and Add a lost group (on the Roll): name, kind, motto, old haunt, story,
   allegiance, kin, colors, crest emblem, its Houses (each with when it fell asleep, its lore and any second banner) and
   its champion. Edit opening (on every chapter) and Edit page (on the World Overview) use the lore editor.
   Saved like every other change. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||typeof ENC==="undefined"||!ENC.pages)return;
  const K=ACAD.admin.kit,{h,HN,clone,say,drafts,ensure,commit,linkProblems,slug,C}=K;
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id);
  const FX=id=>(ENC.FACTIONS||[]).find(f=>f.id===id);
  const LOSTG=id=>(ENC.ROLL||[]).find(g=>g.id===id);
  const paras=t=>String(t||"").split(/\n\s*\n/).map(x=>x.replace(/\s+/g," ").trim()).filter(Boolean);
  const tidy=t=>String(t||"").replace(/\s+/g," ").trim();
  const HEX=/^#[0-9a-f]{6}$/i;
  const card=(text,...btns)=>h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},text),h("div",{class:"enc-loads"},...btns));
  const btn=(label,fn)=>h("button",{type:"button",class:"enc-load",onclick:fn},label);
  const L0=()=>C.layer();

  /* ---------- the change list ---------- */
  K.addChanges((d,out)=>{const E=d.edits||{},A=d.add||{};
    Object.keys(E.factions||{}).forEach(id=>out.push({label:`${(FX(id)||{name:id}).name}: faction`,path:["edits","factions",id]}));
    Object.entries(A.factions||{}).forEach(([id,a])=>out.push({label:`New faction: ${a.name||id}`,path:["add","factions",id]}));
    Object.keys(E.staff||{}).forEach(id=>out.push({label:`${((ENC.STAFF||{})[id]||{name:id}).name}`,path:["edits","staff",id]}));
    Object.keys(E.lost||{}).forEach(id=>out.push({label:`${(LOSTG(id)||{name:id}).name}: lost group`,path:["edits","lost",id]}));
    Object.entries(A.lost||{}).forEach(([id,a])=>out.push({label:`New lost group: ${a.name||id}`,path:["add","lost",id]}));
    Object.keys(E.champ||{}).forEach(id=>out.push({label:`${(LOSTG(id)||{name:id}).name}: champion`,path:["edits","champ",id]}));
    Object.keys(E.also||{}).forEach(id=>out.push({label:`${id}: second banner`,path:["edits","also",id]}))});
  setTimeout(()=>{try{ACAD.admin.refreshBtn()}catch(e){}},0);

  /* ---------- small form parts ---------- */
  function form(id,kicker,title,lead){const dlg=h("dialog",{class:"adm-dlg adm-wide",id,"aria-label":kicker});const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});
    const foot=h("div",{class:"adm-actions"});
    dlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},kicker),h("h2",null,title),lead?h("p",{class:"adm-lead"},lead):null,pane),h("div",{class:"adm-foot"},msg,foot));
    const problems=P=>{msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.slice(0,8).map(x=>h("li",null,x))));return true}return false};
    return {dlg,pane,foot,problems,show:()=>{document.body.append(dlg);dlg.showModal()}}}
  const fld=(o,k,lab,type,ph,help)=>h("label",{class:"adm-f"},h("span",null,lab,help?h("small",{style:"display:block;font-size:12px"},help):null),
    type==="textarea"?h("textarea",{class:"adm-in",rows:4,placeholder:ph||"",oninput:e=>{o[k]=e.target.value}},o[k]||""):h("input",{class:"adm-in",type:"text",placeholder:ph||"",value:o[k]||"",oninput:e=>{o[k]=e.target.value}}));
  const sel=(o,k,lab,opts,none)=>h("label",{class:"adm-f"},h("span",null,lab),h("select",{class:"adm-in",onchange:e=>{o[k]=e.target.value}},none!=null?h("option",{value:""},none):null,
    opts.map(([v,l])=>{const x=h("option",{value:v},l);if(v===o[k])x.selected=true;return x})));
  const colors=(o,keys)=>h("div",{class:"adm-f"},h("span",null,"Colors"),h("div",{class:"adm-row"},keys.map(([k,l])=>h("label",{class:"adm-col"},h("input",{type:"color",value:HEX.test(o[k]||"")?o[k]:"#888888","aria-label":l,oninput:e=>{o[k]=e.target.value}}),l))));
  const girlSel=(o,k,lab,none)=>h("label",{class:"adm-f"},h("span",null,lab),h("select",{class:"adm-in",onchange:e=>{o[k]=e.target.value}},h("option",{value:""},none||"Nobody"),
    (ACAD.GROUPS||[]).map(g=>h("optgroup",{label:g.name},g.members.map(x=>{const op=h("option",{value:x},HN(x));if(x===o[k])op.selected=true;return op})))));

  /* ---------- the dean and the Headmaster ---------- */
  function openStaff(id){if(ACAD.mayEdit&&!ACAD.mayEdit("staff:"+id))return say("Only the admin changes what is already in Everspire. Add something new instead.");const s=(ENC.STAFF||{})[id];if(!s)return say("There is no such person.");
    const fac=(ENC.FACTIONS||[]).find(f=>f.dean===id),addedFac=fac&&C.isAddedFaction&&C.isAddedFaction(fac.id);
    const W={name:s.name,title:s.title,look:s.look,lore:(s.lore||[]).join("\n\n"),quote:s.quote||""};const W0=clone(W);
    const F=form("staffDlg",id==="vael"?"Edit Headmaster":"Edit dean",s.name,"What the Encyclopedia says about "+(id==="vael"?"him":"this dean")+".");
    F.pane.append(fld(W,"name","Name","input"),fld(W,"title","Title","input","Dean of the Order of Dawn"),fld(W,"look","Look","textarea","A small, stooped, very old man with…","His page and the faction page use the first sentence."),
      fld(W,"lore","Lore","textarea","","Separate paragraphs with a blank line. Link with [[place:spire|the Spire]]."),fld(W,"quote","A line of his own","input"));
    F.pane.querySelectorAll("textarea")[1].rows=8;
    const save=()=>{const P=[];if(!tidy(W.name))P.push("Give him a name.");if(!tidy(W.title))P.push("Give him a title.");
      const bad=[...linkProblems(W.look),...linkProblems(W.lore),...linkProblems(W.quote)];if(bad.length)P.push(`These links don't lead to a page: ${[...new Set(bad)].join(", ")}.`);
      if(F.problems(P))return;
      const o={name:tidy(W.name),title:tidy(W.title),look:tidy(W.look),lore:paras(W.lore),quote:tidy(W.quote)};const d=drafts();
      if(addedFac){const a=ensure(d,"add","factions");a[fac.id]=Object.assign({},((L0().add||{}).factions||{})[fac.id]||{},a[fac.id]||{});a[fac.id].dean=Object.assign({id},o);return commit(d,{page:"staff:"+id})}
      const ch={};["name","title","look","quote"].forEach(k=>{if(o[k]!==tidy(W0[k]))ch[k]=o[k]});if(JSON.stringify(o.lore)!==JSON.stringify(paras(W0.lore)))ch.lore=o.lore;
      if(!Object.keys(ch).length){F.dlg.close();return say("Nothing changed.")}
      Object.assign(ensure(d,"edits","staff",id),ch);commit(d,{page:"staff:"+id})};
    F.foot.append(h("button",{type:"button",class:"adm-btn",onclick:()=>F.dlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:save},"Save changes"));F.show()}

  /* ---------- factions ---------- */
  function openFaction(fid){if(fid&&ACAD.mayEdit&&!ACAD.mayEdit("faction:"+fid))return say("Only the admin changes what is already in Everspire. Add something new instead.");const isNew=!fid;const f=fid?FX(fid):null;if(fid&&!f)return say("There is no such faction.");
    const added=isNew||(C.isAddedFaction&&C.isAddedFaction(fid));
    const W={name:f?f.name:"",short:f?f.short:"",motto:f?f.motto||"":"",tagline:f?f.tagline||"":"",wing:f?f.wing:"",sigil:f?f.sigil:"",
      a:f?f.cols.a:"#5d5a7e",b:f?f.cols.b:"#a7a2c8",ink:f?f.cols.ink:"#ffffff",lore:((ENC.FLORE||{})[fid]||[]).join("\n\n"),groups:f?f.groups.slice():[],
      dname:"",dtitle:"",dlook:"",dlore:"",dquote:""};
    const W0=clone(W);
    const F=form("factionDlg",isNew?"Add a faction":"Edit faction",isNew?"A new faction":f.name,isNew?"A faction gets a page, a dean with a page of his own, and the groups you put in it. Its lore is new lore.":"Change what its page says, its colors and its seat.");
    function draw(){F.pane.textContent="";
      F.pane.append(fld(W,"name","Name","input","The Order of the Ember"),fld(W,"short","Short name","input","Ember","Used in labels: “Sworn to Ember”."),fld(W,"motto","Motto","input","We keep the fire."),
        fld(W,"tagline","In a line","input","Courage, craft and the forge. Those who make."),fld(W,"wing","Its seat","input","the Ember Hall above the forges",ENC.PLACES&&ENC.PLACES.length?"A place you name here; add it to the map from the Locations page.":""),
        fld(W,"sigil","Sigil","input","an anvil under a falling star"),colors(W,[["a","First"],["b","Second"],["ink","Words on them"]]),
        fld(W,"lore","Its story","textarea","","Separate paragraphs with a blank line. Link with [[group:pack|the Pack]]."));
      F.pane.append(h("h4",null,"Its groups"),h("p",{class:"adm-muted"},K.admin?"A group in another faction moves here. A faction can start with none.":"Groups you are adding can join it. A faction can start with none; add a group later and choose this faction for it."),
        h("div",{class:"adm-chips adm-checkgrid"},(ACAD.GROUPS||[]).filter(g=>!g.apart&&(K.admin||(ACAD.mayEdit&&ACAD.mayEdit("group:"+g.id)))).map(g=>{const cb=h("input",{type:"checkbox",onchange:e=>{if(e.target.checked){if(!W.groups.includes(g.id))W.groups.push(g.id)}else W.groups=W.groups.filter(x=>x!==g.id)}});cb.checked=W.groups.includes(g.id);
          const cur=ENC.factionOf?ENC.factionOf(g.id):null;return h("label",{class:"adm-radio",style:"margin-right:6px"},cb,g.name,cur&&cur.id!==fid?h("small",{class:"adm-muted",style:"margin:0"}," ("+cur.short+")"):null)})));
      if(isNew)F.pane.append(h("h4",null,"Its dean"),fld(W,"dname","Name","input","Bartholomew Ashe"),fld(W,"dtitle","Title","input","Dean of the Order of the Ember"),fld(W,"dlook","Look","textarea","A broad, soot-browed old man with…"),
        fld(W,"dlore","Lore","textarea",""),fld(W,"dquote","A line of his own","input"))}
    const save=()=>{const P=[];const nm=tidy(W.name);const id=fid||slug(nm.replace(/^the\s+/i,""));
      if(!nm)P.push("Give the faction a name.");else if((ENC.FACTIONS||[]).some(x=>x.id!==fid&&x.name.toLowerCase()===nm.toLowerCase()))P.push(`There is already a faction called ${nm}.`);
      if(isNew&&nm&&(!id||FX(id)||ENC.pages["faction:"+id]))P.push("Choose a different name: that one is taken by another faction's page.");
      if(!tidy(W.short))P.push("Give it a short name.");
      if(![W.a,W.b,W.ink].every(c=>HEX.test(c||"")))P.push("Choose its colors.");
      if(isNew&&!tidy(W.dname))P.push("Give its dean a name.");
      const bad=[...linkProblems(W.lore),...linkProblems(W.dlore)];if(bad.length)P.push(`These links don't lead to a page: ${[...new Set(bad)].join(", ")}.`);
      if(F.problems(P))return;
      const d=drafts();const o={name:nm,short:tidy(W.short),motto:tidy(W.motto),tagline:tidy(W.tagline),wing:tidy(W.wing),sigil:tidy(W.sigil),cols:{a:W.a,b:W.b,ink:W.ink},lore:paras(W.lore)};
      if(isNew){o.dean={id:"dean"+id,name:tidy(W.dname),title:tidy(W.dtitle)||("Dean of "+nm),look:tidy(W.dlook),lore:paras(W.dlore),quote:tidy(W.dquote)};ensure(d,"add","factions")[id]=o}
      else if(added){const a=ensure(d,"add","factions");a[id]=Object.assign({},((L0().add||{}).factions||{})[id]||{},a[id]||{},o)}
      else{const ch={};["name","short","motto","tagline","wing","sigil"].forEach(k=>{if(o[k]!==tidy(W0[k]))ch[k]=o[k]});if(W.a!==W0.a||W.b!==W0.b||W.ink!==W0.ink)ch.cols=o.cols;
        if(JSON.stringify(o.lore)!==JSON.stringify(paras(W0.lore)))ch.lore=o.lore;if(Object.keys(ch).length)Object.assign(ensure(d,"edits","factions",id),ch)}
      /* groups that join it */
      W.groups.filter(g=>!W0.groups.includes(g)).forEach(gid=>{if(C.isAddedGroup&&C.isAddedGroup(gid)){const a=ensure(d,"add","groups");a[gid]=Object.assign({},((L0().add||{}).groups||{})[gid]||{},a[gid]||{},{faction:id})}
        else ensure(d,"edits","groups",gid).faction=id});
      const left=W0.groups.filter(g=>!W.groups.includes(g));if(left.length&&!isNew){P.push(`To take ${left.map(g=>G(g).name).join(" and ")} out, put ${left.length>1?"them":"it"} in another faction instead.`);if(F.problems(P))return}
      commit(d,{page:"faction:"+id})};
    const remove=()=>{if(f.groups.length)return F.problems([`Move ${f.groups.map(g=>G(g).name).join(" and ")} to another faction first.`]);
      if(((C.base().add||{}).factions||{})[fid])return say(`${f.name} is already saved into this file; it can't be removed here.`);
      if(!window.confirm(`Remove ${f.name} and its dean?`))return;const d=drafts();if(d.add&&d.add.factions)delete d.add.factions[fid];if(d.edits&&d.edits.factions)delete d.edits.factions[fid];commit(d,{page:"groups"})};
    F.foot.append(...[added&&!isNew?h("button",{type:"button",class:"adm-btn danger",onclick:remove},"Remove faction"):null,h("button",{type:"button",class:"adm-btn",onclick:()=>F.dlg.close()},"Cancel"),
      h("button",{type:"button",class:"adm-btn primary",onclick:save},isNew?"Make the faction canon":"Save changes")].filter(Boolean));draw();F.show()}

  /* ---------- the Roll's lost groups ---------- */
  function openLost(lid){if(lid&&ACAD.mayEdit&&!ACAD.mayEdit("lost:"+lid))return say("Only the admin changes what is already in Everspire. Add something new instead.");const isNew=!lid;const g=lid?LOSTG(lid):null;if(lid&&!g)return say("There is no such lost group.");
    const added=isNew||(C.isAddedLost&&C.isAddedLost(lid));const EM=ENC.ROLL_EMBLEMS||{};
    const ch0=(ENC.CHAMP||{})[lid]||null;
    const W={name:g?g.name:"",kind:g?g.kind:"",motto:g?g.motto:"",haunt:g?g.haunt:"",story:g?g.story:"",faction:g?g.faction:"none",kin:g?g.kin||"":"",
      a:g?g.cols.a:"#3b3a58",b:g?g.cols.b:"#b39b62",e:g?g.cols.e:"#efe6cf",f:g?g.cols.f:"#ffffff",w1:g?(g.words||[])[0]||"":"",w2:g?(g.words||[])[1]||"":"",w3:g?(g.words||[])[2]||"":"",
      emblem:g?g.emblemName:"star",houses:g?g.houses.map(x=>({name:x.name,since:x.since,lore:x.lore,also:(ENC.ALSO_ID||{})[x.id]||"",id:x.id})):[{name:"",since:"",lore:"",also:""}],
      champ:ch0?ch0[0]:"",why:ch0?ch0[1]:""};
    const W0=clone(W);
    const F=form("lostDlg",isNew?"Add a lost group":"Edit lost group",isNew?"A new lost group":g.name,isNew?"A group on the Roll of Sleeping Houses, with its Houses, waiting to wake. All of it is new lore.":"Change its story, its colors and crest, its Houses and its champion.");
    const groupOpts=()=>(ACAD.GROUPS||[]).map(x=>[x.id,x.name]).concat((ENC.ROLL||[]).filter(x=>x.id!==lid).map(x=>[x.id,x.name+" (sleeping)"]));
    function draw(){F.pane.textContent="";
      F.pane.append(fld(W,"name","Name","input","The Ember Court"),fld(W,"kind","Kind","input","Fire-born beasts"),fld(W,"motto","Motto","input","We burn bright."),fld(W,"haunt","Its old haunt","input","the cold forge under the north tower"),
        fld(W,"story","Its story","textarea",""),sel(W,"faction","Allegiance",(ENC.FACTIONS||[]).map(x=>[x.id,"Sworn to "+x.short]).concat([["none","Unsworn"]])),
        sel(W,"kin","Kin to",(ACAD.GROUPS||[]).map(x=>[x.id,x.name]),"No living group"),
        colors(W,[["a","Field"],["b","Band"],["e","Mark"],["f","Highlight"]]),
        h("div",{class:"adm-f"},h("span",null,"Colors in words",h("small",{style:"display:block;font-size:12px"},"A girl who wakes one of its Houses starts in these.")),h("div",{class:"adm-row adm-cols3"},["w1","w2","w3"].map((k,i)=>h("input",{class:"adm-in",type:"text",placeholder:["ember red","soot black","gold"][i],value:W[k],oninput:e=>{W[k]=e.target.value}})))),
        sel(W,"emblem","Crest emblem",Object.keys(EM).map(k=>[k,k.charAt(0).toUpperCase()+k.slice(1)])));
      F.pane.append(h("h4",null,"Its Houses"),h("p",{class:"adm-muted"},"Each sleeping House: its beast, when it fell asleep and what is remembered of it. A second banner is a living group it would also fly."));
      W.houses.forEach((x,i)=>{const c=h("div",{class:"adm-card"});c.append(fld(x,"name","House","input","Salamander"),fld(x,"since","Asleep since","input","1741"),fld(x,"lore","Remembered","textarea",""),
        sel(x,"also","Second banner",groupOpts(),"None"),h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{W.houses.splice(i,1);draw()}},"Remove House")));c.querySelector("textarea").rows=2;F.pane.append(c)});
      F.pane.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{W.houses.push({name:"",since:"",lore:"",also:""});draw()}},"Add a House")));
      F.pane.append(h("h4",null,"Its champion"),h("p",{class:"adm-muted"},"A girl awake now who has sworn to carry its banner if it wakes."),girlSel(W,"champ","Champion","No champion"),fld(W,"why","Why she swore","input","she was born under the north tower's forge"))}
    const save=()=>{const P=[];const nm=tidy(W.name);const id=lid||slug(nm.replace(/^the\s+/i,""));
      if(!nm)P.push("Give the lost group a name.");else if((ENC.ROLL||[]).some(x=>x.id!==lid&&x.name.toLowerCase()===nm.toLowerCase())||(ACAD.GROUPS||[]).some(x=>x.name.toLowerCase()===nm.toLowerCase()))P.push(`There is already a group called ${nm}.`);
      if(isNew&&nm&&(!id||LOSTG(id)||G(id)||ENC.pages["lost:"+id]))P.push("Choose a different name: that one is taken by another group's page.");
      if(!W.houses.length)P.push("A lost group needs at least one House.");
      const seen=new Set(),others=new Set();(ENC.ROLL||[]).forEach(x=>{if(x.id!==lid)x.houses.forEach(y=>others.add(y.name.toLowerCase()))});(ACAD.HOUSES||[]).forEach(x=>others.add(HN(x).toLowerCase()));
      W.houses.forEach((x,i)=>{const n=tidy(x.name);if(!n)P.push(`House ${i+1} needs a name.`);else if(seen.has(n.toLowerCase())||others.has(n.toLowerCase()))P.push(`There is already a House called ${n}.`);seen.add(n.toLowerCase());if(!tidy(x.lore))P.push(`${n||"House "+(i+1)} needs what is remembered of it.`)});
      if(![W.a,W.b,W.e,W.f].every(c=>HEX.test(c||"")))P.push("Choose its colors.");
      if(W.champ&&!tidy(W.why))P.push("Write why her champion swore.");
      const bad=[...linkProblems(W.story),...W.houses.flatMap(x=>linkProblems(x.lore))];if(bad.length)P.push(`These links don't lead to a page: ${[...new Set(bad)].join(", ")}.`);
      if(F.problems(P))return;
      const o={name:nm,kind:tidy(W.kind),motto:tidy(W.motto),haunt:tidy(W.haunt),story:tidy(W.story),faction:W.faction||"none",kin:W.kin||"",cols:{a:W.a,b:W.b,e:W.e,f:W.f},
        words:[W.w1,W.w2,W.w3].map(tidy).filter(Boolean),emblem:W.emblem,houses:W.houses.map(x=>[tidy(x.name),tidy(x.since),tidy(x.lore)])};
      const d=drafts();
      if(added)ensure(d,"add","lost")[id]=o;
      else{const ch={};["name","kind","motto","haunt","story","faction","kin","emblem"].forEach(k=>{if(o[k]!==(k==="emblem"?W0.emblem:tidy(W0[k])))ch[k]=o[k]});
        if(JSON.stringify(o.cols)!==JSON.stringify({a:W0.a,b:W0.b,e:W0.e,f:W0.f}))ch.cols=o.cols;if(JSON.stringify(o.words)!==JSON.stringify([W0.w1,W0.w2,W0.w3].map(tidy).filter(Boolean)))ch.words=o.words;
        if(JSON.stringify(o.houses)!==JSON.stringify(W0.houses.map(x=>[tidy(x.name),tidy(x.since),tidy(x.lore)])))ch.houses=o.houses;
        if(Object.keys(ch).length)Object.assign(ensure(d,"edits","lost",id),ch)}
      /* second banners, by the House's id */
      const hid=n=>String(n||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"");
      W.houses.forEach(x=>{const k=hid(x.name),was=(ENC.ALSO_ID||{})[k]||"";if((x.also||"")!==was)ensure(d,"edits","also")[k]=x.also||null});
      W0.houses.forEach(x=>{if(!W.houses.some(y=>hid(y.name)===hid(x.name))&&x.also)ensure(d,"edits","also")[hid(x.name)]=null});
      if(W.champ!==W0.champ||tidy(W.why)!==tidy(W0.why))ensure(d,"edits","champ")[id]=W.champ?[W.champ,tidy(W.why)]:null;
      commit(d,{page:"lost:"+id})};
    const remove=()=>{if(((C.base().add||{}).lost||{})[lid])return say(`${g.name} is already saved into this file; it can't be removed here.`);
      if(!window.confirm(`Remove ${g.name} and its Houses from the Roll?`))return;const d=drafts();if(d.add&&d.add.lost)delete d.add.lost[lid];if(d.edits&&d.edits.champ)delete d.edits.champ[lid];commit(d,{page:"roll"})};
    F.foot.append(...[added&&!isNew?h("button",{type:"button",class:"adm-btn danger",onclick:remove},"Remove lost group"):null,h("button",{type:"button",class:"adm-btn",onclick:()=>F.dlg.close()},"Cancel"),
      h("button",{type:"button",class:"adm-btn primary",onclick:save},isNew?"Make the lost group canon":"Save changes")].filter(Boolean));draw();F.show()}

  /* ---------- the chapters' openings and the World Overview, in the lore editor ---------- */
  const LEADNOW={};
  ACAD.admin.addLoreSpec(key=>{let m;
    if(key==="world.blocks")return {key,label:"World Overview: the page",page:"world",shape:"blocks",value:ENC.LORE_DATA&&ENC.LORE_DATA["world.blocks"]?ENC.LORE_DATA["world.blocks"]():[]};
    if((m=/^lead\.(.+)$/.exec(key))){const p=ENC.pages[m[1]];return {key,label:`${p?p.title:m[1]}: opening`,page:m[1],shape:"text",value:ACAD.loreEdited&&ACAD.loreEdited(key)?ACAD.lore(key,""):(LEADNOW[m[1]]||"")}}
    return null});

  /* ---------- where the buttons go ---------- */
  const wrap=(id,fn)=>{const p=ENC.pages[id];if(!p||!p.build)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("admin254",e)}}};
  (ENC.FACTIONS||[]).forEach(f=>wrap("faction:"+f.id,el=>{const side=el.querySelector(".enc-side");if(!side||!(ACAD.mayEdit?ACAD.mayEdit("faction:"+f.id):K.admin))return;
    side.prepend(card(C.isAddedFaction&&C.isAddedFaction(f.id)?"A faction you added. Change its name, story, colors or seat, or remove it.":"Change the faction's name, motto, story, colors or seat.",btn("Edit faction",()=>openFaction(f.id)),btn(f.dean==="vael"?"Edit Headmaster":"Edit dean",()=>openStaff(f.dean))))}));
  Object.keys(ENC.STAFF||{}).forEach(k=>wrap("staff:"+k,el=>{if(!(ACAD.mayEdit?ACAD.mayEdit("staff:"+k):K.admin))return;const side=el.querySelector(".enc-side");const where=side||el.querySelector(".enc-article")||el;
    const c=card(k==="vael"?"Change the Headmaster's name, title, look and lore.":"Change the dean's name, title, look and lore.",btn(k==="vael"?"Edit Headmaster":"Edit dean",()=>openStaff(k)));if(side)side.prepend(c);else where.prepend(c)}));
  wrap("groups",el=>{const art=el.querySelector(".enc-article");if(!art)return;const lead=art.querySelector(".enc-lead");const c=card("Add a faction: a name, colors, a dean and the groups that join it.",btn("Add a faction",()=>openFaction(null)));c.classList.add("adm-card-inline");(lead||art.firstChild).after(c)});
  wrap("roll",el=>{const art=el.querySelector(".enc-article");if(!art)return;const n=art.querySelector(".enc-note");const c=card("Add a lost group to the Roll, with its Houses, crest and allegiance.",btn("Add a lost group",()=>openLost(null)));c.classList.add("adm-card-inline");(n||art.firstChild).after(c)});
  (ENC.ROLL||[]).forEach(g=>wrap("lost:"+g.id,el=>{if(!(ACAD.mayEdit?ACAD.mayEdit("lost:"+g.id):K.admin))return;const side=el.querySelector(".enc-side");const c=card(C.isAddedLost&&C.isAddedLost(g.id)?"A lost group you added. Change it, or remove it.":"Change its story, colors and crest, its Houses and its champion.",btn("Edit lost group",()=>openLost(g.id)));
    if(side)side.prepend(c);else{const art=el.querySelector(".enc-article")||el;c.classList.add("adm-card-inline");art.prepend(c)}}));
  /* every chapter's opening, and the World Overview whole */
  (ENC.LEAD_PAGES||[]).forEach(id=>wrap(id,el=>{const lead=el.querySelector(".enc-lead");if(!lead||!K.admin)return;
    if(!(ACAD.loreEdited&&ACAD.loreEdited("lead."+id))){const cl=lead.cloneNode(true);cl.querySelectorAll(".enc-tag").forEach(x=>x.remove());LEADNOW[id]=cl.textContent.trim()}
    lead.append(" ",h("button",{type:"button",class:"adm-evedit adm-leadedit","aria-label":"Edit the opening",onclick:()=>ACAD.admin.lore("lead."+id)},"Edit opening"))}));
  {const p=ENC.pages.world;if(p){if(!p.build)p.build=function(el){el.append(h("article",{class:"enc-article"},h("h1",{class:"enc-title"},p.title),ENC.renderBlocks(p.blocks||ENC.blocks.world||[])))};
    wrap("world",el=>{if(!K.admin)return;const art=el.querySelector(".enc-article")||el;const c=card("Change the World Overview: every paragraph, heading, list and fact on it.",btn("Edit page",()=>ACAD.admin.lore("world.blocks")));c.classList.add("adm-card-inline");
      const t=art.querySelector(".enc-title");(t||art.firstChild).after(c)})}}
  {const st=document.createElement("style");st.id="admCss254";st.textContent=`.enc-lead .adm-leadedit{font-size:12.5px;line-height:1.4;padding:1px 8px;margin:0 0 0 6px;vertical-align:middle;font-family:var(--e-sans,system-ui,sans-serif);font-weight:400}
#lostDlg .adm-card,#factionDlg .adm-card{margin:8px 0}
#encDlg .adm-card-inline{background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:12px;padding:14px 18px}
#encDlg .adm-card-inline h4{font-family:var(--e-serif);font-size:20px;margin:0 0 6px}`;document.head.append(st)}
  ACAD.admin.faction=openFaction;ACAD.admin.staff=openStaff;ACAD.admin.lost=openLost;
})();
/* ---- v258: submissions, in both editions. make() turns drafts into a change set (the canon layer's own format with its
   author, the revision it was made on and its relationships as pairs added or dropped); check() runs the checks every
   submission meets before review (whose records it changes, whether they changed since, names already taken, the
   under-18 rule, links, relationships with other authors' girls, and, for a player, that lore and history are only
   added to). The player's My lore dialog lists what she is adding and saves it as a submission file for the admin.
   The admin edition reviews and approves them (admin256.js). ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||!ACAD.records||!ACAD.perm)return;
  const K=ACAD.admin.kit,{h,HN,clone,say,drafts,ensure,commit,linkProblems,C,download,ROMANTIC,INTIMATE}=K;
  const R=ACAD.records,P=ACAD.perm,ADMIN=P.ADMIN;
  const FORMAT="everspire-changeset";
  const PARTW={BF:"best friends",SG:"partners",RV:"rivals",FAM:"family",FLING:"a fling"};
  const isObj=o=>o&&typeof o==="object"&&!Array.isArray(o);
  const merge=(a,b)=>{Object.keys(b||{}).forEach(k=>{if(isObj(b[k])){a[k]=isObj(a[k])?a[k]:{};merge(a[k],b[k])}else a[k]=clone(b[k])});return a};
  const ageOf=(cs,h)=>{const add=(((cs.add||{}).girls||{})[h]||{}).bio,ed=(((cs.edits||{}).bios||{})[h]),b=(typeof BIOS!=="undefined"&&BIOS[h])||{};
    const src=Object.assign({},b,add||{},ed||{});return ACAD.ageOf?ACAD.ageOf({age:src.age,dob:src.dob}):(parseInt(src.age,10)||null)};
  const girlName=(cs,h)=>(((cs.add||{}).girls||{})[h]||{}).name||HN(h);

  /* ---------- making a change set from drafts ---------- */
  function make(d,author,note){d=clone(d||drafts());const r=R.relDiff((d.edits||{}).rel);if(d.edits)delete d.edits.rel;
    ["base","note","meta","users","pending","log","rev"].forEach(k=>delete d[k]);
    return {format:FORMAT,v:1,author:author||ADMIN,base:C.rev(),made:new Date().toISOString().slice(0,10),note:note||"",edits:d.edits||{},add:d.add||{},rel:r}}

  /* ---------- the checks a submission meets before anyone reviews it ---------- */
  function check(cs){const out={problems:[],pending:[],labels:[],keys:[]};
    if(!cs||cs.format!==FORMAT||cs.v!==1||typeof cs.author!=="string"||!cs.author.trim()||typeof cs.base!=="number"){out.problems.push("This isn't a submission file.");return out}
    const who=cs.author.trim(),admin=P.role(who)==="admin";
    const T=R.touched(cs,{rel:true}),keys=[...T.keys];out.keys=keys;
    /* a player checks her submission in her own copy, where what she is adding is already in the world: leave it out */
    const mine=k=>!K.admin&&!!(ACAD.mineNow&&ACAD.mineNow(k));
    const recs=new Map(R.list().filter(r=>!mine(r.key)).map(r=>[r.key,r]));
    const newKeys=new Set();const A=cs.add||{};
    Object.keys(A.girls||{}).forEach(x=>newKeys.add("girl:"+x));Object.keys(A.groups||{}).forEach(x=>newKeys.add("group:"+x));Object.keys(A.factions||{}).forEach(x=>newKeys.add("faction:"+x));
    Object.keys(A.places||{}).forEach(x=>newKeys.add("place:"+x));Object.keys(A.lost||{}).forEach(x=>newKeys.add("lost:"+x));
    /* whose records it changes, and whether they changed since */
    keys.forEach(k=>{const r=recs.get(k);if(newKeys.has(k)){if(r)out.problems.push(`There is already a ${R.KIND[r.kind]} with the id “${r.id}”.`);return}
      if(!r)return;
      const relOnly=k.startsWith("girl:")&&![...R.touched(Object.assign({},cs,{rel:{add:[],drop:[]}}))].includes(k);
      if(!relOnly&&!P.can(who,"edit",k))out.problems.push(r.original?`${who} can't change ${r.name}: the original ${R.KIND[r.kind]}s are yours alone to change.`:`${who} can't change ${r.name}: only the admin changes what is already in Everspire.`);
      if(r.rev>cs.base)out.problems.push(`${r.name} changed in revision ${r.rev}, after this was made (revision ${cs.base}). Ask ${who} to make it again from the current world.`)});
    /* names must be unique across the whole world */
    const N=R.names(mine),seen=new Map();const nm=(n,what)=>{const k=R.norm(n);if(!k)return;if(N.has(k))out.problems.push(`There is already a ${N.get(k)} called ${n}.`);else if(seen.has(k))out.problems.push(`${n} is named twice in this submission.`);seen.set(k,what)};
    /* a girl who wakes a sleeping House (or whose House is one) takes its name */
    const woken=new Set();Object.entries(A.girls||{}).forEach(([x,g])=>{const pl=(g&&g.place)||{};const hid=pl.kind==="wake"&&pl.house?pl.house:x;
      (ENC.ROLL||[]).forEach(lg=>lg.houses.forEach(y=>{if(y.id===hid)woken.add(R.norm(y.name))}))});
    Object.entries(A.girls||{}).forEach(([x,g])=>{if(!woken.has(R.norm(g.name)))nm(g.name,"girl");if(g.bio&&g.bio.fullName)nm(g.bio.fullName,"girl")});
    Object.values(A.groups||{}).forEach(g=>nm(g.name,"group"));Object.values(A.factions||{}).forEach(f=>{nm(f.name,"faction");if(f.short&&R.norm(f.short)!==R.norm(f.name))nm(f.short,"faction")});
    Object.values(A.places||{}).forEach(p=>nm(p.name,"place"));Object.values(A.lost||{}).forEach(g=>{nm(g.name,"lost group");(g.houses||[]).forEach(x=>nm(x[0],"sleeping House"))});
    /* the under-18 rule: no romantic partner or intimate details, never in a romantic pair */
    const girls=new Set([...Object.keys(A.girls||{}),...Object.keys((cs.edits||{}).bios||{})]);
    girls.forEach(x=>{const a=ageOf(cs,x);if(a==null||a>=18)return;const b=Object.assign({},(((A.girls||{})[x])||{}).bio||{},((cs.edits||{}).bios||{})[x]||{});
      const bad=Object.keys(b).filter(f=>b[f]&&(INTIMATE.has(f)||(ROMANTIC.has(f)&&!/^single$/i.test(b[f]))));
      if(bad.length)out.problems.push(`${girlName(cs,x)} is under 18: no romantic partner or intimate details.`)});
    /* relationships: both girls must exist; a pair with another author's girl waits for her author */
    const exists=x=>recs.has("girl:"+x)||newKeys.has("girl:"+x);
    (T.rel.add||[]).forEach(e=>{const [part,a,b]=e;if(!PARTW[part])return out.problems.push(`An unknown kind of relationship: ${part}.`);
      if(!exists(a)||!exists(b))return out.problems.push(`A relationship names someone who isn't in Everspire: ${[a,b].filter(x=>!exists(x)).join(", ")}.`);
      if((part==="SG"||part==="FLING")&&[a,b].some(x=>{const g=ageOf(cs,x);return g!=null&&g<18}))return out.problems.push(`Romantic partners are for adults: ${[a,b].map(x=>girlName(cs,x)).join(" and ")}.`);
      const others=[a,b].filter(x=>!newKeys.has("girl:"+x)&&!admin&&!P.can(who,"relate","girl:"+x));
      if(others.length)others.forEach(x=>out.pending.push({part,entry:e.slice(1),owner:recs.get("girl:"+x).author,girl:x,label:`${girlName(cs,a)} and ${girlName(cs,b)}: ${PARTW[part]}`}))});
    /* a pair ended because one of its girls takes a new partner waits with that new pair; any other pair a player
       ends must have one of her own girls in it */
    (T.rel.drop||[]).forEach(([part,a,b])=>{const mine=[a,b].some(x=>admin||P.can(who,"relate","girl:"+x));if(mine)return;
      const w=out.pending.find(p=>p.part===part&&(p.entry[0]===a||p.entry[1]===a||p.entry[0]===b||p.entry[1]===b));
      if(w){(w.also=w.also||[]).push([part,a,b]);w.label+=`, and ${girlName(cs,a)} and ${girlName(cs,b)} are no longer ${PARTW[part]}`}
      else out.problems.push(`${who} can't end a relationship between two girls who aren't hers: ${girlName(cs,a)} and ${girlName(cs,b)}.`)});
    /* v258: a player adds to lore and history, and changes nothing already there */
    if(!admin){const E=cs.edits||{};const J=x=>JSON.stringify(x);
      const label=k=>{const sp=ACAD.admin&&ACAD.admin.loreSpec&&ACAD.admin.loreSpec(k);return sp?sp.label:k};
      Object.entries(E.lore||{}).forEach(([k,v])=>{if(!C.playerLore||!C.playerLore(k))return out.problems.push(`${who} can't change ${label(k)}: only the admin changes it.`);
        const cur=K.admin?(ACAD.loreCurrent?ACAD.loreCurrent(k):null):(C.canonLore?C.canonLore(k):null);if(!Array.isArray(cur)||!Array.isArray(v))return;
        const keeps=k==="culture.year"?cur.every(s=>{const n=v.find(x=>x&&x.season===s.season);return n&&J(n.items.slice(0,s.items.length))===J(s.items)}):J(v.slice(0,cur.length))===J(cur);
        if(!keeps)out.problems.push(`${label(k)}: what is already there can't be changed or removed. Add new entries after it.`)});
      if(E.history&&Array.isArray(E.history.eras)){const cur=K.admin?(ENC.HISTORY||[]):(C.canonHistory?C.canonHistory():[]),v=E.history.eras;const key=i=>J([i.when,i.title,i.text]);
        const keeps=cur.every(e=>{const n=v.find(x=>x.era===e.era);if(!n)return false;let j=0;const ks=n.items.map(key);return e.items.every(i=>{const at=ks.indexOf(key(i),j);if(at<0)return false;j=at+1;return true})});
        if(!keeps)out.problems.push("The history: events and eras already there can't be changed, moved or removed. Add new events beside them.")}}
    /* links lead to a page, or to something this submission adds */
    const strings=[];const walk=v=>{if(typeof v==="string")strings.push(v);else if(Array.isArray(v))v.forEach(walk);else if(isObj(v))Object.values(v).forEach(walk)};walk(cs.edits);walk(cs.add);walk(cs.rel);
    const newPage=id=>{const m=/^(house|group|faction|place|lost|staff):(.+)$/.exec(id);return m&&newKeys.has((m[1]==="house"?"girl":m[1])+":"+m[2])};
    const bad=[...new Set(strings.flatMap(t=>linkProblems(t)))].filter(id=>!newPage(id));if(bad.length)out.problems.push(`These links don't lead to a page: ${bad.join(", ")}.`);
    /* what it changes, in words */
    const dd={edits:clone(cs.edits||{}),add:clone(cs.add||{})};out.labels=K.changesOf(dd).map(c=>c.label);
    (T.rel.add||[]).forEach(([p,a,b])=>out.labels.push(`Relationships: ${girlName(cs,a)} and ${girlName(cs,b)}, ${PARTW[p]||p}`));
    (T.rel.drop||[]).forEach(([p,a,b])=>out.labels.push(`Relationships: ${girlName(cs,a)} and ${girlName(cs,b)} are no longer ${PARTW[p]||p}`));
    out.problems=[...new Set(out.problems)];return out}

  /* ---------- relationships into a drafts layer ---------- */
  function relApply(d,part,entry,drop){const cur=ensure(d,"edits","rel");const now=cur[part]!==undefined?cur[part]:clone((ACAD.RELDATA||{})[part]||(part==="BF"?{}:[]));
    const [a,b]=entry;
    if(part==="BF"){const add=(x,y)=>{now[x]=(now[x]||[]).filter(z=>z!==y);if(!drop)now[x].push(y)};add(a,b);add(b,a)}
    else{const k=R.pkey(part,a,b);const i=now.findIndex(e=>R.pkey(part,e[0],e[1])===k);if(i>=0)now.splice(i,1);if(!drop)now.push(clone(entry))}
    cur[part]=now}


  ACAD.changeset=Object.assign(ACAD.changeset||{},{FORMAT,make,check,relApply,PARTW,merge,girlName});

  /* ---------- a player's My lore dialog ---------- */
  if(K.admin)return;
  const NAMEKEY="everspire.player.name";
  const myName=()=>{try{return localStorage.getItem(NAMEKEY)||""}catch(e){return""}};
  let pdlg=null;
  function openPlayer(){if(pdlg)pdlg.remove();const d=drafts(),list=K.changesOf(d);
    pdlg=h("dialog",{class:"adm-dlg",id:"playerDlg","aria-label":"My lore"});
    const body=h("div",{class:"adm-body"});
    const nameIn=h("input",{class:"adm-in",type:"text",value:myName(),placeholder:"The name your work is credited to","aria-label":"Your name",oninput:e=>{try{localStorage.setItem(NAMEKEY,e.target.value.trim())}catch(er){}}});
    body.append(h("h2",null,"My lore"),h("p",{class:"adm-lead"},"Add to Everspire: new girls and their Houses, groups, factions, places, lost groups, and new history, traditions, story seeds and customs. What you add is yours until you submit it; the admin reviews every submission before it becomes canon for everyone."),
      h("h3",null,"Your name"),h("p",{class:"adm-muted"},"Your work is credited to this name."),nameIn);
    body.append(h("h3",null,list.length?`What you're adding (${list.length})`:"What you're adding"));
    if(!list.length)body.append(h("p",{class:"adm-muted"},"Nothing yet. Start below."));
    else body.append(h("ul",{class:"adm-changes"},list.map(c=>h("li",null,h("span",null,c.label),h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const x=drafts();K.delPath(x,c.path);commit(x,{admin:true})}},"Remove")))));
    const go=fn=>()=>{pdlg.close();fn()};
    body.append(h("h3",null,"Start something new"),h("div",{class:"adm-actions"},
      h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.makeNew())},"A girl, from the studio's character"),
      h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.group(null))},"A group"),
      ACAD.admin.faction?h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.faction(null))},"A faction"):null,
      ACAD.admin.place?h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.place(null))},"A place"):null,
      ACAD.admin.lost?h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.lost(null))},"A lost group"):null,
      ACAD.admin.history?h("button",{type:"button",class:"adm-btn",onclick:go(()=>ACAD.admin.history({add:true}))},"History"):null),
      h("p",{class:"adm-muted"},"Traditions, story seeds, customs, glossary words and mysteries are added from their pages in the Encyclopedia: look for Add."));
    /* the checks, before it goes anywhere */
    const box=h("div");
    const run=()=>{box.textContent="";if(!list.length)return null;const cs=make(d,nameIn.value.trim()||"(your name)",d.note);const r=check(cs);
      if(!nameIn.value.trim())r.problems.unshift("Write your name above: your work is credited to it.");
      box.append(r.problems.length?h("div",{class:"adm-checks",role:"alert"},h("b",null,"Fix these first"),h("ul",null,r.problems.map(x=>h("li",null,x)))):h("p",{class:"adm-ok"},"It passes every check."),
        r.pending.length?[h("p",{class:"adm-muted"},"These relationships name girls that aren't yours; each waits for her author to accept it after the admin approves your submission:"),h("ul",{class:"adm-changes"},r.pending.map(p=>h("li",null,h("span",null,`${p.label}: waits for ${p.owner}`))))]:null);
      return r};
    nameIn.addEventListener("change",run);
    const note=h("textarea",{class:"adm-in",rows:2,placeholder:"A note for the admin (optional)"},d.note||"");note.addEventListener("change",()=>{const x=drafts();x.note=note.value.trim();if(!x.note)delete x.note;C.saveDrafts(x)});
    if(list.length)body.append(h("h3",null,"Submit"),h("p",{class:"adm-muted"},"Save your submission as a file and send it to the admin. Keep your lore here until it's approved."),note,box,
      h("div",{class:"adm-actions",style:"margin-top:10px"},h("button",{type:"button",class:"adm-btn primary",id:"plSave",onclick:()=>{const r=run();if(!r||r.problems.length)return;
          const cs=make(drafts(),nameIn.value.trim(),note.value.trim());download(`everspire_submission_${nameIn.value.trim().replace(/[^A-Za-z0-9]+/g,"_")}_r${C.rev()}.json`,JSON.stringify(cs,null,1),"application/json");say("Submission saved. Send the file to the admin.")}},"Save my submission"),
        h("button",{type:"button",class:"adm-btn danger",onclick:()=>{if(window.confirm("Discard everything you've added?"))commit(C.empty(),{admin:true})}},"Discard all")));
    pdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>pdlg.close()},"×"),body);document.body.append(pdlg);pdlg.showModal();run()}
  ACAD.submit={open:openPlayer,name:myName};
})();
/* ---- v261: every option has somewhere to go when a design changes sex, both ways.
   1. Options tagged male-only that nothing makes male (a crew-neck tee, a scar, a tattoo, a tousled hair line) are worn by
      anyone: they are tagged for both, so they show in the female lists too and a switch to female keeps them.
   2. Where the switch tables have no rule for an option, it no longer just disappears: it becomes the nearest option of
      the same kind that suits the new sex (a satin corset becomes a waistcoat, pearl drop earrings small stud earrings, a
      flustered face a flustered face), matched on its words, with women's words read as their men's counterparts.
   3. Jewelry no longer comes off wholesale when a design becomes male: jewelry a man wears stays, the rest becomes the
      nearest piece a man wears, and only what has no counterpart at all comes off.
   Anatomy (facial hair, body hair and the intimate fields) is the one exception: it has no counterpart and is cleared. ---- */
(function(){
  if(typeof CHAR==="undefined"||typeof OUTFIT==="undefined"||typeof swapChar!=="function"||typeof swapItem!=="function")return;
  const MALE_RX=/\b(beards?|bearded|stubble|mustache|moustache|goatee|sideburns?|o'clock shadow|jockstraps?|boxers?|briefs|trunks|codpiece|bulge|penis|his|him|himself|he|man|men|man's|men's|masculine|gentleman|gentlemen|boyish|chest hair|bare chest|bare-chested|shirtless|pecs|adam's apple|groom|king|prince|lord|monk|priest)\b/i;
  const ANATOMY=new Set(["facialHair","facialHairColor","bodyHair","penisColor","penisType","penisSize","vaginaColor","vaginaType","nippleColor","nippleType","nippleLength","areolaColor","areolaType","areolaSize","pubicHair"]);
  const BODY=new Set(["bustSize","bustShape","bustWeight","shoulderShape","torsoShape","armShape","handShape","waistShape","stomachShape","hipShape","buttSize","thighBuild","legShape","bodySoftness","heightStature","faceShape","age","impression","hairStyle","hairLength","bangs","browShape","noseShape","mouthShape","eyeShape","lashNatural","makeupStyle","lashStyle","blushStyle","lipFinish","posture"]);
  let retag=0;
  /* 1. male-only tags that nothing makes male */
  Object.entries(SEXTAG).forEach(([f,m])=>{if(ANATOMY.has(f)||BODY.has(f))return;Object.keys(m).forEach(v=>{if(m[v]==="m"&&!MALE_RX.test(v)){m[v]="b";retag++}})});
  Object.entries(OSEX).forEach(([f,m])=>{Object.keys(m).forEach(v=>{if(m[v]==="m"&&!MALE_RX.test(v)){m[v]="b";retag++}})});
  /* pieces anyone wears that the women's filters caught */
  [["neckAccessory",["fresh flower lei","{c} flower lei"]],["gloves",["fluffy mittens","{c} fluffy mittens"]],["wristAccessory",["sleeve garters"]],
   ["detailThree",["rainbow gradient","sequin-and-bead embroidery"]],["detailOne",["appliqué flowers"]],["neckAccessory",["crystal amulet"]]].forEach(([f,vs])=>{OSEX[f]=OSEX[f]||{};vs.forEach(v=>{OSEX[f][v]="b";retag++})});
  /* a piece that is a woman's only by its pronoun ("a Piplup waddling at her heels") gets a twin that says "his" */
  const FEMW=/\b(breasts?|bust|busty|cleavage|nipples?|underboob|sideboob|bras?|bralette|bikini|skirts?|miniskirt|lingerie|garters?|thigh-?highs?|stockings|pantyhose|(?<!at (?:his|her) )heels|stilettos?|pumps|bodysuit|leotard|corset|camisole|chemise|negligee|babydoll|petticoat|blouse|dress|gown|sundress|qipao|halter|tiara|choker|panties|thong|plunging|her|she|herself|woman|women|girl|girls|feminine)\b/i;
  const manOk=(f,w)=>!FEMW.test(w)&&!(OFEM_ALL[f])&&!(OFEM_RX[f]&&OFEM_RX[f].test(w));
  const TWIN={true:{},false:{}};
  Object.entries(OUTFIT).forEach(([f,l])=>{if(!Array.isArray(l))return;l.slice().forEach(i=>{const v=i.v;if(typeof v!=="string"||!/\bher(self)?\b/.test(v)||itemSexFits(f,v,true))return;
    const w=v.replace(/\bherself\b/g,"himself").replace(/\bher\b/g,"his");if(w===v||!manOk(f,w))return;
    OSEX[f]=OSEX[f]||{};if(!l.some(x=>x.v===w)){const o=JSON.parse(JSON.stringify(i));o.v=w;l.push(o);OSEX[f][w]="m";retag++}
    TWIN.true[f+"|"+v]=w;TWIN.false[f+"|"+w]=v})});
  /* a woman's garment whose cut has a man's name keeps everything else it says ("a brocade corset embroidered with a
     peacock" becomes "a brocade waistcoat embroidered with a peacock") */
  const CUT=[[/\b(corset|bustier|bodice)( (corset|bustier|bodice))?\b/gi,"waistcoat"],[/\bsilk blouse\b/gi,"silk shirt"],[/\bblouse\b/gi,"shirt"],[/\b(pleated|long|midi|maxi|knee-length) (pleated )?skirt\b/gi,"tailored trousers"],
    [/ that (emphasizes|shows off|hugs) her (breasts|chest|curves)/gi,""],[/\bherself\b/g,"himself"],[/\bher\b/g,"his"]];
  const recut=(f,v)=>{let w=v;CUT.forEach(([rx,to])=>{w=w.replace(rx,to)});w=w.replace(/\b(\w+) \1\b/gi,"$1");if(w===v||FEMW.test(w)||(OFEM_RX[f]&&OFEM_RX[f].test(w)))return null;
    OSEX[f]=OSEX[f]||{};if(!OSEX[f][w])OSEX[f][w]="m";return w};
  /* 2. the nearest option of the same kind */
  const STOP=new Set(["a","an","the","and","or","with","of","in","on","at","to","her","she","his","he","for","by","over","under","from","into","its","that","is","c","c2","one","two","very","soft","softly"]);
  const F2M={woman:"man",women:"men",lady:"gentleman",girl:"boy",girls:"boys",feminine:"masculine",corset:"waistcoat",bustier:"vest",bodice:"waistcoat",blouse:"shirt",camisole:"tank",
    skirt:"trousers",miniskirt:"shorts",dress:"suit",gown:"robe",heels:"shoes",stilettos:"shoes",pumps:"shoes",stockings:"socks",tights:"socks",pantyhose:"socks",earrings:"stud",earring:"stud",
    necklace:"pendant",choker:"chain",pearls:"chain",pearl:"silver",tiara:"crown",diadem:"crown",anklet:"chain",anklets:"chain",bangle:"bracelet",bangles:"bracelet",purse:"bag",clutch:"bag",handbag:"bag",
    ribbon:"band",bow:"tie",lace:"linen",frilly:"plain",ruffled:"plain",lingerie:"loungewear",bra:"undershirt",bikini:"trunks",leotard:"tank",halter:"tank",crop:"tee",mary:"shoes",ballet:"shoes",flats:"shoes",
    hairpin:"band",barrette:"band",veil:"hood",sundress:"shirt",negligee:"robe",nightgown:"pajama",chemise:"shirt",petticoat:"trousers",tutu:"shorts",garter:"band",garters:"band",cute:"easy",pretty:"handsome",
    sultry:"smoldering",capelet:"cape",shawl:"cloak",stole:"cloak",thighhigh:"socks","thigh-high":"socks",garter:"holster",scrunchie:"headband",kanzashi:"headband",plush:"thick",waves:"wavy",flustered:"flustered",smile:"smile",lipstick:"lips",makeup:"grooming"};
  const M2F={};Object.entries(F2M).forEach(([a,b])=>{if(!M2F[b])M2F[b]=a});Object.assign(M2F,{man:"woman",men:"women",gentleman:"lady",boy:"girl",masculine:"feminine",waistcoat:"corset",vest:"bustier",trousers:"skirt",suit:"dress",undershirt:"camisole",trunks:"bikini",handsome:"pretty"});
  const words=(v,map)=>{const out=new Set();String(v).toLowerCase().replace(/\{c2?\}/g," ").split(/[^a-z']+/).forEach(w=>{if(!w||STOP.has(w))return;out.add(w);if(map[w])out.add(map[w]);if(w.endsWith("s")&&map[w.slice(0,-1)])out.add(map[w.slice(0,-1)])});return out};
  const MEMO=new Map();
  function nearest(kind,f,v,toMale){const key=kind+"|"+f+"|"+v+"|"+toMale;if(MEMO.has(key))return MEMO.get(key);
    const list=kind==="c"?(CHAR[f]||[]).map(x=>x[0]):(OUTFIT[f]||[]).map(i=>i.v);
    const fits=kind==="c"?(x=>sexFits(f,x,toMale)):(x=>itemSexFits(f,x,toMale));
    const cands=list.filter(x=>typeof x==="string"&&x&&x[0]!=="@"&&x!==v&&x!=="none"&&fits(x));
    let best=null,bs=0;
    if(cands.length){const W=words(v,toMale?F2M:M2F),df={};cands.forEach(c=>words(c,{}).forEach(w=>{df[w]=(df[w]||0)+1}));
      const hasC=/\{c\}/.test(v);
      cands.forEach(c=>{const cw=words(c,{});let s=0;cw.forEach(w=>{if(W.has(w))s+=1+Math.log(cands.length/df[w])});if(!s)return;
        s=s/Math.sqrt(cw.size+1);if(hasC===/\{c\}/.test(c))s*=1.1;if(s>bs){bs=s;best=c}})}
    MEMO.set(key,best);return best}
  const swapChar0=swapChar,swapItem0=swapItem;
  /* where nothing is near enough, a plain default of the same kind */
  const DEF={true:{hairMovement:"falls softly over the forehead",markings:"no markings"},false:{}};
  window.swapChar=function(field,v,toMale){const r=swapChar0(field,v,toMale);if(r!==null||ANATOMY.has(field))return r;const n=nearest("c",field,v,toMale);
    if(n!==null)return n;const d=DEF[toMale][field];return d&&(CHAR[field]||[]).some(x=>x[0]===d)?d:null};
  window.swapItem=function(field,v,toMale,o){const tw=TWIN[toMale][field+"|"+v];if(tw)return tw;if(toMale&&!itemSexFits(field,v,true)){const rc=recut(field,v);if(rc)return rc}const r=swapItem0(field,v,toMale,o);if(r!==null&&r!==undefined)return r;
    if(r===undefined&&itemSexFits(field,v,toMale))return r;
    const n=nearest("o",field,v,toMale);return n===null?(r===undefined?undefined:null):n};
  /* 3. jewelry: what a man wears stays; the rest finds its nearest counterpart */
  if(typeof JEWEL_O==="object")Object.keys(JEWEL_O).forEach(f=>{const t=JEWEL_O[f],rx=t.rx;
    t.rx={test:v=>rx.test(v)&&!itemSexFits(f,v,true)&&!nearest("o",f,v,true),source:rx.source}});
  /* what a switch to male deliberately takes off: pieces that exist only to show or shape a woman's body, and child ages
     (which the age safeguard never lets switch at all) */
  const OFF=/garter(?! band)|anklet|fishnet|bodystocking|cleavage|plunging|skirt|tulle|chiffon|sheer|cutout|cut-out|keyhole|\blace\b|ribbon|bow clusters|petal|condom|eyelets/i;
  ACAD&&(ACAD.SEXMAP261={retag,nearest,ANATOMY,OFF});
})();
