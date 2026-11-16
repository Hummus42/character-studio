/* ---- v297: the outfit browser. The Outfit tab's Preset used to open a 440-pixel popover holding ~1,700 outfits in
   100 sections. It now opens a full dialog:
   - a sidebar of shelves: Recently used, the general library (Everyday and style, Costumes, World cultures, Character
     outfits, Adult only, Scene and men's outfits, More), then the Academy wardrobe and Academy after dark, which
     follow the girls' own wardrobe sections (ACAD.CATS), set by set;
   - chips for the sets (sub-lists) of the chosen shelf;
   - one search box over everything, with results grouped by shelf;
   - a card grid (name, short description, Adult tag), keyboard friendly.
   Academy outfits are filed by the set their id names (acad_o_<n>_<set>), not by their old group labels, so they follow
   the reorganised wardrobe. Picking one calls the same applyOutfitPreset as before. ---- */
(function(){
  if(typeof presetRow!=="function"||typeof h!=="function")return;
  const RKEY="ev_outfit_recent";
  const recent=()=>{try{return JSON.parse(localStorage.getItem(RKEY)||"[]")}catch(e){return[]}};
  const remember=k=>{try{const r=recent().filter(x=>x!==k);r.unshift(k);localStorage.setItem(RKEY,JSON.stringify(r.slice(0,24)))}catch(e){}};
  const norm=l=>String(l).replace(/\W+/g,"").toLowerCase();
  const disp=l=>l==="Academy"?"House robes":String(l).replace(/^Academy /,"");

  /* ---------- the shelves ---------- */
  function build(P,groups){
    const ok=k=>P[k]&&(typeof presetSexOk!=="function"||presetSexOk(P[k]));
    const GEN=[["Everyday and style",[]],["Costumes",[]],["World cultures",[]],["Character outfits",[]],["Adult only",[]],["Scene and men's outfits",[]]];
    const gen=n=>GEN.find(x=>x[0]===n)[1];
    const setCat=new Map(),setName=new Map(),after=new Set((typeof ACAD!=="undefined"&&ACAD.AFTER_CATS)||[]);
    const CATS=(typeof ACAD!=="undefined"&&ACAD.CATS)||[];
    CATS.forEach(([c,ls])=>ls.forEach(l=>{setCat.set(norm(l),c);setName.set(norm(l),disp(l))}));
    setCat.set("academymen","Men");setName.set("academymen","Academy men");
    const acad=new Map();   /* category -> Map(set -> keys) */
    const listed=new Set();
    /* a set that is no longer on any shelf (House Regalia, Sirens...) goes by its old group label */
    const OLDMAP={"Robes and faculty":"Robes and faculty","Everyday":"Everyday life","Seasons and travel":"Seasons and holidays","Sports and clubs":"Sports and stage","Costumes":"Costumes and cosplay",
      "Fantasy and sci-fi":"Fantasy","Moody":"Story and drama","Sensual":"Sensual","Exhibition":"Exhibition","Explicit":"Explicit"};
    const addAcad=(k,gl)=>{const m=/^acad_o_\d+_(.+)$/.exec(k);if(!m)return false;
      let s=m[1],c=setCat.get(s);
      if(!c){const g=/^([^:]+): (.+?)( \(adult only\))?$/.exec(gl||"");if(!g||!OLDMAP[g[1]])return false;c=OLDMAP[g[1]];
        if(!setName.has(s))setName.set(s,/more sets/.test(g[2])?"More":g[2])}
      if(c==="Men"){gen("Scene and men's outfits").push(["Academy men",[k]]);return true}
      if(!acad.has(c))acad.set(c,new Map());const M=acad.get(c),n=setName.get(s);if(!M.has(n))M.set(n,[]);M.get(n).push(k);return true};
    groups.forEach(g=>{const keys=g.keys.filter(ok);keys.forEach(k=>listed.add(k));
      const rest=keys.filter(k=>!addAcad(k,g.label));if(!rest.length)return;
      const L=g.label;let m;
      if((m=/^Culture: (.+)/.exec(L)))gen("World cultures").push([m[1],rest]);
      else if(/adult only|BDSM|Hedonistic|No clothing|^Adult/i.test(L))gen("Adult only").push([L.replace(/ \(adult only\)/,""),rest]);
      else if((m=/^Costumes: (.+)/.exec(L)))gen("Costumes").push([m[1],rest]);
      else if(/^(Resort and bunny sets|Military)/.test(L))gen("Costumes").push([L,rest]);
      else if(/ outfits$/.test(L)&&!/^Scene/.test(L))gen("Character outfits").push([L.replace(/ outfits$/,""),rest]);
      else if(/^Scene outfits|Men's/.test(L))gen("Scene and men's outfits").push([L.replace(/^Scene outfits/,"Scene outfits"),rest]);
      else if(/^[^:]+: /.test(L)&&rest.every(k=>/^acad_/.test(k)))gen("Scene and men's outfits").push([L,rest]);
      else gen("Everyday and style").push([L,rest])});
    /* merge duplicate sub-lists that share a name */
    const merge=subs=>{const m=new Map();subs.forEach(([n,ks])=>{if(!m.has(n))m.set(n,[]);ks.forEach(k=>{if(!m.get(n).includes(k))m.get(n).push(k)})});return[...m.entries()]};
    const shelves=[];
    const rec=recent().filter(ok);
    if(rec.length)shelves.push({id:"recent",name:"Recently used",head:"",subs:[["Recently used",rec]]});
    GEN.forEach(([n,subs])=>{if(subs.length)shelves.push({id:"g:"+n,name:n,head:"Outfit library",subs:merge(subs)})});
    const more=Object.keys(P).filter(k=>!listed.has(k)&&ok(k));
    if(more.length)shelves.push({id:"g:More",name:"More",head:"Outfit library",subs:[["More",more]]});
    CATS.forEach(([c])=>{const M=acad.get(c);if(!M||!M.size)return;
      shelves.push({id:"a:"+c,name:c,head:after.has(c)?"Academy after dark":"Academy wardrobe",subs:[...M.entries()]})});
    shelves.forEach(s=>{s.n=s.subs.reduce((a,[,k])=>a+k.length,0)});
    return shelves;
  }

  /* ---------- the dialog ---------- */
  const css=document.createElement("style");
  css.textContent=
    "#opDlg{width:min(1100px,96vw);height:min(820px,92vh);max-width:none;max-height:none;padding:0;border:1px solid var(--rule);border-radius:16px;background:var(--panel);color:var(--ink);overflow:hidden}"+
    "#opDlg[open]{display:flex;flex-direction:column}#opDlg::backdrop{background:rgba(0,0,0,.55)}"+
    "#opDlg .op-head{display:flex;align-items:center;gap:10px;padding:14px 16px 10px;border-bottom:1px solid var(--rule)}"+
    "#opDlg .op-head h2{margin:0;font-size:1.2rem;flex:none}#opDlg .op-q{flex:1;min-width:0;padding:8px 12px;border-radius:10px;border:1px solid var(--rule);background:var(--panel2);color:var(--ink);font:inherit}"+
    "#opDlg .op-x{background:none;border:0;color:var(--muted);font-size:1.5rem;cursor:pointer;padding:0 6px}"+
    "#opDlg .op-body{display:flex;flex:1;min-height:0}"+
    "#opDlg .op-side{width:230px;flex:none;overflow:auto;border-right:1px solid var(--rule);padding:8px 6px 16px}"+
    "#opDlg .op-side h4{margin:12px 8px 4px;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}"+
    "#opDlg .op-shelf{display:flex;justify-content:space-between;gap:6px;width:100%;text-align:left;background:none;border:0;color:var(--ink);font:inherit;font-size:.9rem;padding:6px 10px;border-radius:8px;cursor:pointer}"+
    "#opDlg .op-shelf small{color:var(--muted)}#opDlg .op-shelf:hover{background:var(--panel2)}#opDlg .op-shelf.on{background:var(--panel2);box-shadow:inset 3px 0 0 var(--focus,var(--blue));font-weight:600}"+
    "#opDlg .op-main{flex:1;min-width:0;min-height:0;display:flex;flex-direction:column}"+
    "#opDlg .op-subs{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px;border-bottom:1px solid var(--rule);max-height:132px;overflow:auto}"+
    "#opDlg .op-subs:empty{display:none}"+
    "#opDlg .op-chip{border:1px solid var(--rule);background:var(--panel2);color:var(--ink);border-radius:999px;padding:4px 11px;font:inherit;font-size:.8rem;cursor:pointer}"+
    "#opDlg .op-chip.on{border-color:var(--focus,var(--blue));box-shadow:inset 0 0 0 1px var(--focus,var(--blue))}#opDlg .op-chip small{color:var(--muted);margin-left:4px}"+
    "#opDlg .op-list{flex:1;overflow:auto;padding:6px 14px 20px}"+
    "#opDlg .op-sec{margin:14px 2px 6px;font-size:.95rem;color:var(--muted)}#opDlg .op-sec b{color:var(--ink)}"+
    "#opDlg .op-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}"+
    "#opDlg .op-card{display:flex;flex-direction:column;gap:3px;text-align:left;border:1px solid var(--rule);background:var(--panel2);color:var(--ink);border-radius:10px;padding:9px 11px;font:inherit;cursor:pointer;min-height:64px}"+
    "#opDlg .op-card:hover,#opDlg .op-card:focus-visible{border-color:var(--focus,var(--blue))}#opDlg .op-card[disabled]{opacity:.45;cursor:not-allowed}"+
    "#opDlg .op-card .ol{font-weight:600;font-size:.9rem}#opDlg .op-card small{color:var(--muted);font-size:.76rem;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}"+
    "#opDlg .op-tag{font-size:.66rem;border:1px solid var(--rule);border-radius:6px;padding:0 5px;margin-left:6px;color:var(--muted);font-weight:400;vertical-align:1px}"+
    "#opDlg .op-foot{display:flex;gap:8px;align-items:center;padding:10px 14px;border-top:1px solid var(--rule)}#opDlg .op-foot span{color:var(--muted);font-size:.8rem;flex:1}"+
    "#opDlg .op-empty{color:var(--muted);padding:30px 4px}"+
    "@media (max-width:720px){#opDlg{width:100vw;height:100vh;border-radius:0}#opDlg .op-body{flex-direction:column}"+
      "#opDlg .op-side{width:auto;display:flex;gap:4px;overflow-x:auto;overflow-y:hidden;border-right:0;border-bottom:1px solid var(--rule);padding:6px 10px;flex:none}"+
      "#opDlg .op-side h4{display:none}#opDlg .op-foot span{display:none}#opDlg .op-foot{justify-content:flex-end}#opDlg .op-shelf{width:auto;white-space:nowrap;flex:none}#opDlg .op-grid{grid-template-columns:1fr}}";
  document.head.append(css);

  let state={shelf:"",sub:""};
  function open(P,groups,apply,clearFn,clearLabel){
    let d=document.getElementById("opDlg");if(d)d.remove();
    const shelves=build(P,groups),total=new Set(shelves.filter(s=>s.id!=="recent").flatMap(s=>s.subs.flatMap(([,k])=>k))).size;
    if(!shelves.some(s=>s.id===state.shelf))state={shelf:(shelves.find(s=>s.id!=="recent")||shelves[0]||{}).id,sub:""};
    const q=h("input",{type:"search",class:"op-q",placeholder:`Search ${total} outfits by name or piece (e.g. "kimono", "fishnet", "maid")`,"aria-label":"Search outfits",autocomplete:"off"});
    const side=h("nav",{class:"op-side","aria-label":"Outfit shelves"}),subs=h("div",{class:"op-subs",role:"group","aria-label":"Sets"}),list=h("div",{class:"op-list"});
    const foot=h("span");
    d=h("dialog",{id:"opDlg","aria-label":"Outfit presets"},
      h("div",{class:"op-head"},h("h2",{text:"Outfits"}),q,h("button",{type:"button",class:"op-x","aria-label":"Close",onclick:()=>d.close(),text:"×"})),
      h("div",{class:"op-body"},side,h("div",{class:"op-main"},subs,list)),
      h("div",{class:"op-foot"},foot,h("button",{type:"button",class:"btn sm",onclick:()=>{d.close();clearFn()},text:clearLabel||"Clear outfit"})));
    document.body.append(d);
    /* setName: in a flat grid (sets of one or two), the card is titled by its set and the outfit name joins the description */
    const card=(k,setName)=>{const p=P[k];const ok=typeof presetAvailable!=="function"||presetAvailable(p);
      const note=ok?"":((typeof Policy!=="undefined"&&Policy.presetNote&&Policy.presetNote(p))||"Not available for this age category");
      const nm=p.label||p.name,title=setName||nm,sub=(setName&&setName!==nm?nm+". ":"")+(p.blurb||"");
      return h("button",{type:"button",class:"op-card",disabled:ok?null:true,title:note||p.blurb||"",onclick:()=>{remember(k);d.close();apply(k,p)}},
        h("span",{class:"ol"},title,p.adultOnly?h("span",{class:"op-tag",text:"Adult"}):null),h("small",{text:sub}))};
    const sec=(title,keys,cap)=>{const ks=cap?keys.slice(0,cap):keys;return[h("div",{class:"op-sec"},h("b",{text:title})," · "+keys.length),h("div",{class:"op-grid"},ks.map(k=>card(k)))]};
    function drawSide(){side.textContent="";let head=null;
      shelves.forEach(s=>{if(s.head&&s.head!==head){head=s.head;side.append(h("h4",{text:head}))}
        side.append(h("button",{type:"button",class:"op-shelf"+(s.id===state.shelf&&!q.value.trim()?" on":""),"aria-pressed":s.id===state.shelf?"true":"false",
          onclick:()=>{q.value="";state={shelf:s.id,sub:""};draw()}},h("span",{text:s.name}),h("small",{text:String(s.n)})))})}
    function draw(){
      drawSide();subs.textContent="";list.textContent="";list.scrollTop=0;
      const term=q.value.trim().toLowerCase();
      if(term){
        const words=term.split(/\s+/);let n=0;
        shelves.filter(s=>s.id!=="recent").forEach(s=>s.subs.forEach(([name,keys])=>{
          const hit=keys.filter(k=>{const p=P[k],t=((p.label||p.name||"")+" "+(p.blurb||"")+" "+name+" "+s.name).toLowerCase();return words.every(w=>t.includes(w))});
          if(!hit.length)return;n+=hit.length;list.append(...sec(s.name+" › "+name,hit,60))}));
        foot.textContent=n?`${n} outfits match "${q.value.trim()}".`:"";
        if(!n)list.append(h("div",{class:"op-empty",text:"No outfit matches that. Try a single garment word, like skirt, kimono or latex."}));
        return}
      const s=shelves.find(x=>x.id===state.shelf);if(!s)return;
      if(s.subs.length>1){subs.append(h("button",{type:"button",class:"op-chip"+(!state.sub?" on":""),onclick:()=>{state.sub="";draw()}},"All",h("small",{text:String(s.n)})));
        s.subs.forEach(([name,keys])=>subs.append(h("button",{type:"button",class:"op-chip"+(state.sub===name?" on":""),onclick:()=>{state.sub=name;draw()}},name,h("small",{text:String(keys.length)}))))}
      const show=state.sub?s.subs.filter(([n])=>n===state.sub):s.subs;
      if(show.length>3&&show.every(([,k])=>k.length<=2))list.append(h("div",{class:"op-grid",style:"margin-top:10px"},show.flatMap(([name,keys])=>keys.map(k=>card(k,name)))));
      else show.forEach(([name,keys])=>list.append(...sec(name,keys)));
      foot.textContent=(s.head?s.head+" › ":"")+s.name+(state.sub?" › "+state.sub:"")+". Colours follow your palette; empty palette slots take the outfit's own.";
    }
    let t=null;q.addEventListener("input",()=>{clearTimeout(t);t=setTimeout(draw,120)});
    q.addEventListener("keydown",e=>{if(e.key==="Enter"){const c=list.querySelector(".op-card:not([disabled])");if(c)c.focus();e.preventDefault()}});
    d.addEventListener("close",()=>d.remove());
    draw();d.showModal();q.focus();
  }

  const base=presetRow;
  presetRow=function(id,PRESETS,groups,apply,clearFn,clearLabel,hint,opts){
    if(id!=="opreset")return base.apply(this,arguments);
    const btn=h("button",{type:"button",class:"pick","aria-haspopup":"dialog",onclick:()=>open(PRESETS,groups,apply,clearFn,clearLabel)},h("span",{text:"Browse outfits…"}),h("i",{class:"caret","aria-hidden":"true"}));
    return row("preset:"+id,"Preset",h("div",{class:"pickwrap"},btn),hint,"presetrow");
  };
  window.OUTFIT_BROWSER={build};
})();
