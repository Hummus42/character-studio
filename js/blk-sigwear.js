/* ---- v331: signature wear. ACAD.SIGWEAR[girl] = {slot: [item, colour]} is worn in every one of her looks: her robes, every
   wardrobe set, the Scene Archive and the scenes she is cast in (a scene's characters come straight from her templates).
   Her headmistress's and her boyfriend's looks are left alone. A sunglasses item already in a look is kept for that look.
   The item goes into a copy of each outfit, never into an outfit object another girl's template may share. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function")return;
  ACAD.SIGWEAR=Object.assign({
    /* 2026-11-19: Oriole's thick black glasses (test g2, seed 42) */
    oriole:{eyewear:["oversized thick black-framed glasses","-"]}
  },ACAD.SIGWEAR||{});
  let NOT=null;   /* her headmistress's and boyfriend's looks, by the Academy shelves they are on */
  const notHers=()=>NOT||(NOT=new Set(((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).filter(g=>/Headmistress|Boys'|\bMen\b/i.test(g.label||"")).flatMap(g=>g.keys||[])));
  const girls=()=>Object.keys(ACAD.SIGWEAR).sort((a,b)=>b.length-a.length);
  /* her key starts most ids (oriolerobes); a few sets put a short code first (rv1oriole, aporiole, acoriole) */
  const girlOf=id=>{if(typeof id!=="string")return"";const g=girls().find(x=>id.startsWith(x)||(id.endsWith(x)&&/^[a-z]{1,3}\d?$/.test(id.slice(0,id.length-x.length))));if(!g)return"";
    if(id.startsWith(g+"head")||id.startsWith(g+"man")||notHers().has(id))return"";return g};
  const wear=(o,W)=>{if(!o||typeof o!=="object")return o;const c=Object.assign({},o,{items:Object.assign({},o.items||{})});
    Object.entries(W).forEach(([slot,it])=>{const cur=c.items[slot];if(cur&&/sunglasses/i.test(String(cur[0]||"")))return;c.items[slot]=it.slice()});return c};
  const patch=t=>{if(!t||t._sigwear||typeof t!=="object")return t;const g=girlOf(t.id);if(!g)return t;const W=ACAD.SIGWEAR[g];
    try{if(t.outfit)t.outfit=wear(t.outfit,W);if(Array.isArray(t.more))t.more=t.more.map(o=>wear(o,W));t._sigwear=true}catch(e){}return t};
  if(typeof TEMPLATES!=="undefined")TEMPLATES.forEach(patch);
  const tb=tplById;tplById=function(id){return patch(tb.apply(this,arguments))};
  ACAD.sigwearOf=girlOf;
})();
