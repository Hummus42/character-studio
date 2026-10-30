/* v172: Owl's and Rat's Corporate roles (that set was written before they joined) */
(function(){[["owlcorporate","Owl corporate archivist"],["ratcorporate","Rat mailroom fixer"]].forEach(([id,n])=>{const t=tplById(id);if(t)t.name=n})})();

/* ---- v170: scene audit fixes (tail block, after quality169.js).
   Scenes written for a boyfriend used plain "his"/"him"/"he"/"the man" in places, so swapping character 2 to a woman in the
   Scene tab left male words in the text. Those words now follow character 2 like the rest of the scene ({his}, {him}, {he},
   {partner}). Affairs and NTR are left alone: their extra "he" is a third person (the other boyfriend). */
(function(){
  const GROUPS=["Academy Lap Dance","Academy First Kiss","Academy Proposal","Academy Honeymoon Suite","Academy Rough and Passionate","Academy Mirror Sex","Academy Sixty-Nine",
    "Academy Femdom","Academy Car Sex","Academy Kitchen Counter","Academy Pregnancy Sex"];
  const tok=s=>String(s).split(/(\{[a-zA-Z]+\})/).map(part=>/^\{[a-zA-Z]+\}$/.test(part)?part:part
    .replace(/\bthe man's\b/g,"{partner}'s").replace(/\bthe man\b/g,"{partner}").replace(/\bThe man\b/g,"{Partner}")
    .replace(/\bhimself\b/g,"{him}self").replace(/\bhis\b/g,"{his}").replace(/\bHis\b/g,"{His}").replace(/\bhim\b/g,"{him}").replace(/\bhe\b/g,"{he}").replace(/\bHe\b/g,"{He}")
  ).join("");
  const R=START.RAW||{};
  GROUPS.forEach(l=>{const g=PRESET_GROUPS.start.find(x=>x.label===l);if(!g)return;
    g.keys.forEach(k=>{[tplById(k),R[k]].forEach(t=>{if(t&&t.out&&t.out.pair&&t.out.pair.scene)t.out.pair.scene=tok(t.out.pair.scene)})})});
})();
