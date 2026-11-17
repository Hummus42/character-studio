/* ---- v304: the Great Waking's outfit pieces. The hundred girls added in 2026-11 (ten groups woken from the Roll) bring
   their boyfriends' House robes pieces (waistcoat, high-collared robe, silk tie, crest brooch); these are registered in the
   outfit catalog here, before the canon waves build the boys' wardrobes, so every piece is pickable in the studio and the
   starting points carry no "not in the outfit catalog" problems. Reads the canon layer, so any later canon boy is covered. ---- */
(function(){
  if(typeof START==="undefined"||typeof EVERSPIRE_CANON!=="object"||!EVERSPIRE_CANON)return;
  const ADD=(EVERSPIRE_CANON.add&&EVERSPIRE_CANON.add.girls)||{};
  const seen=new Set();
  const reg=(f,v,fam)=>{if(!v||typeof v!=="string")return;const k=f+"|"+v;if(seen.has(k))return;seen.add(k);try{START.item(f,v,"CUS",fam||"costume")}catch(e){}};
  Object.values(ADD).forEach(a=>{const men=(a&&a.men)||{};
    ["man","head"].forEach(s=>{const lk=men[s]&&men[s].look;if(!lk)return;
      [lk.outfit].concat(lk.more||[]).forEach(o=>{if(!o||!o.items)return;Object.entries(o.items).forEach(([f,it])=>reg(f,Array.isArray(it)?it[0]:it&&it.v,o.look))})})});
})();
