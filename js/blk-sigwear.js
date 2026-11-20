/* ---- v331/v332: signature wear. A girl's signature pieces are worn in every one of her looks: her robes, every wardrobe set,
   the Scene Archive and the scenes she is cast in (a scene's characters come straight from her templates). Her headmistress's
   and her boyfriend's looks are left alone. Each piece goes into a copy of each outfit, never into an outfit object another
   girl's template may share.
   Canon data: edits.sigwear[girl] (a canon girl) or add.girls[girl].sigwear (an added girl), shaped
     {slot: {v: "oversized thick black-framed glasses", c: "-" | "@primary" … "@extra", keep: "replace" | "except" | "keep", x: "sunglasses, goggles"}}
   keep: "replace" puts it on over whatever a look has in that slot; "except" does too, but a look's own piece stays when it
   mentions any of the words in x (comma-separated; Oriole keeps her sunglasses looks this way); "keep" only fills the slot
   where a look has nothing there. The old keep "sun" reads as "except" with x "sunglasses". An empty object clears a canon girl's signature wear.
   Set in Edit canon (her Look tab) and in Add to Everspire (Her look). ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function")return;
  const L=(ACAD.canon&&ACAD.canon.layer?ACAD.canon.layer():{})||{};
  const SIG={};
  Object.entries(((L.add||{}).girls)||{}).forEach(([g,a])=>{if(a&&a.sigwear&&Object.keys(a.sigwear).length)SIG[g]=a.sigwear});
  Object.entries(((L.edits||{}).sigwear)||{}).forEach(([g,s])=>{if(s&&Object.keys(s).length)SIG[g]=s;else delete SIG[g]});
  let NOT=null;   /* her headmistress's and boyfriend's looks, by the Academy shelves they are on */
  const notHers=()=>NOT||(NOT=new Set(((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).filter(g=>/Headmistress|Boys'|\bMen\b/i.test(g.label||"")).flatMap(g=>g.keys||[])));
  const girls=Object.keys(SIG).sort((a,b)=>b.length-a.length);
  /* her key starts most ids (oriolerobes); a few sets put a short code first (rv1oriole, aporiole, acoriole) */
  const girlOf=id=>{if(typeof id!=="string")return"";const g=girls.find(x=>id.startsWith(x)||(id.endsWith(x)&&/^[a-z]{1,3}\d?$/.test(id.slice(0,id.length-x.length))));if(!g)return"";
    if(id.startsWith(g+"head")||id.startsWith(g+"man")||notHers().has(id))return"";return g};
  const wear=(o,W)=>{if(!o||typeof o!=="object")return o;const c=Object.assign({},o,{items:Object.assign({},o.items||{})});
    Object.entries(W).forEach(([slot,p])=>{if(!p||!String(p.v||"").trim())return;const cur=c.items[slot],has=cur&&String(cur[0]||"").trim()&&cur[0]!=="-";
      if(has&&p.keep==="keep")return;
      if(has&&(p.keep==="except"||p.keep==="sun")){const words=String(p.keep==="sun"?"sunglasses":p.x||"").split(",").map(w=>w.trim().toLowerCase()).filter(Boolean);
        if(words.some(w=>String(cur[0]).toLowerCase().includes(w)))return}
      c.items[slot]=[String(p.v).trim(),p.c||"-"]});return c};
  const patch=t=>{if(!t||t._sigwear||typeof t!=="object")return t;const g=girlOf(t.id);if(!g)return t;const W=SIG[g];
    try{if(t.outfit)t.outfit=wear(t.outfit,W);if(Array.isArray(t.more))t.more=t.more.map(o=>wear(o,W));t._sigwear=true}catch(e){}return t};
  if(girls.length){if(typeof TEMPLATES!=="undefined")TEMPLATES.forEach(patch);const tb=tplById;tplById=function(id){return patch(tb.apply(this,arguments))}}

  /* ---------- the editor: her signature pieces ---------- */
  const SKIP=new Set(["bra","panties","corset","top","bottom","legwear","outerwear","detailOne","detailTwo","detailThree"]);
  const LAB=k=>{const l=typeof labelOf==="function"?labelOf(k):k;return l.charAt(0).toUpperCase()+l.slice(1)};
  const slots=()=>Object.keys(typeof OUTFIT!=="undefined"?OUTFIT:{eyewear:[]}).filter(k=>!SKIP.has(k));
  const COLS=[["-","No color (as written)"],["@primary","Her primary color"],["@secondary","Her secondary color"],["@third","Her third color"],["@accent","Her accent color"],["@extra","Her extra color"]];
  const KEEP=[["replace","Wear it in every look, over what the look has"],["except","Wear it, except where the look's own piece mentions…"],["keep","Only where the look has nothing there"]];
  const H=(t,a,...k)=>{const e=document.createElement(t);if(a)for(const[x,v]of Object.entries(a)){if(v==null||v===false)continue;if(x==="class")e.className=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else if(x==="value")e.value=v;else e.setAttribute(x,v===true?"":v)}
    k.flat().forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(String(c)))});return e};
  const sel=(opts,val,on)=>{const s=H("select",{class:"adm-in",onchange:e=>on(e.target.value)},opts.map(([v,l])=>{const o=H("option",{value:v},l);if(v===val)o.selected=true;return o}));return s};
  /* W.sig is the work's copy; who: "her" name for the wording */
  function field(W,who){W.sig=W.sig||{};const box=H("div",{class:"adm-sigwear"});
    const paint=()=>{box.textContent="";const S=W.sig;
      box.append(H("h4",null,"Signature wear"),H("p",{class:"adm-muted"},`Pieces ${who||"she"} wears in every look: her robes, every wardrobe set, the Scene Archive and her scenes. A look's own outfit is only changed in these slots.`));
      Object.keys(S).forEach(slot=>{const p=S[slot];const dl="sigdl-"+slot;
        box.append(H("div",{class:"adm-card",style:"padding:10px 12px;margin:6px 0"},
          H("div",{class:"adm-row",style:"gap:8px;flex-wrap:wrap;align-items:end"},
            H("label",{class:"adm-f",style:"min-width:150px"},H("span",null,"Slot"),sel(slots().filter(k=>k===slot||!S[k]).map(k=>[k,LAB(k)]),slot,v=>{if(v===slot)return;S[v]=p;delete S[slot];paint()})),
            H("label",{class:"adm-f",style:"flex:1;min-width:220px"},H("span",null,"Piece"),H("input",{class:"adm-in",type:"text",list:dl,value:p.v||"",placeholder:"thick black-framed glasses",oninput:e=>{p.v=e.target.value}}),
              H("datalist",{id:dl},((typeof OUTFIT!=="undefined"&&OUTFIT[slot])||[]).map(o=>H("option",{value:o.v}))))),
          H("div",{class:"adm-row",style:"gap:8px;flex-wrap:wrap;align-items:end"},
            H("label",{class:"adm-f",style:"min-width:190px"},H("span",null,"Color"),sel(COLS,p.c||"-",v=>{p.c=v})),
            H("label",{class:"adm-f",style:"flex:1;min-width:220px"},H("span",null,"When a look already has something there"),sel(KEEP,p.keep==="sun"?"except":(p.keep||"replace"),v=>{p.keep=v;if(v==="except"&&p.x==null)p.x="";paint()})),
            H("button",{type:"button",class:"adm-btn sm danger",onclick:()=>{delete S[slot];paint()}},"Remove")),
          p.keep==="except"||p.keep==="sun"?H("label",{class:"adm-f"},H("span",null,"Keep the look's own piece when it mentions (separate with commas)"),
            H("input",{class:"adm-in",type:"text",value:p.keep==="sun"?"sunglasses":(p.x||""),placeholder:"sunglasses, goggles",oninput:e=>{p.keep="except";p.x=e.target.value}})):null))});
      const free=slots().filter(k=>!S[k]);
      if(free.length)box.append(H("div",{class:"adm-actions"},H("button",{type:"button",class:"adm-btn sm",onclick:()=>{const k=free.includes("eyewear")?"eyewear":free[0];S[k]={v:"",c:"-",keep:"replace"};paint()}},"Add a signature piece")))};
    paint();return box}
  const clean=s=>{const o={};Object.entries(s||{}).forEach(([k,p])=>{if(p&&String(p.v||"").trim()){const keep=p.keep==="sun"?"except":(p.keep||"replace");o[k]={v:String(p.v).trim(),c:p.c||"-",keep};if(keep==="except")o[k].x=p.keep==="sun"?"sunglasses":String(p.x||"").split(",").map(w=>w.trim()).filter(Boolean).join(", ")}});return o};
  ACAD.sigwear={of:g=>JSON.parse(JSON.stringify(SIG[g]||{})),field,clean,girlOf,changed:(g,s)=>JSON.stringify(clean(s))!==JSON.stringify(clean(SIG[g]))};
})();
