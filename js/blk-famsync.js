/*OPTS2-END*/
/*FAMSYNC-BEGIN*/
/* v310: the sisters, twins and cousins in the family table are written into the biographies each time the world loads, so the two never disagree.
   A written-in clause sits between two invisible word joiners; the next load strips it and writes it again from the table. */
(function(){
  if(typeof BIOS!=="object"||typeof ACAD==="undefined"||!ACAD.RELDATA)return;
  const MK="\u2060",RE=/(?:;\s*)?\u2060[^\u2060]*\u2060/g;
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  const FIRST={mantis:"Yue"};   /* names written family-name first */
  const nm=h=>(ENC&&ENC.HN?ENC.HN(h):(ACAD.HNAME&&ACAD.HNAME[h])||cap(h));
  const given=h=>FIRST[h]||String((BIOS[h]||{}).fullName||"").split(" ")[0];
  const TYPEW={blood:"by blood",chosen:"step, adoptive or chosen"};
  ACAD.syncFamily=function(){
    const gen={};
    (ACAD.RELDATA.FAM||[]).forEach(([a,b,type,bIs,aIs])=>[[a,b,bIs],[b,a,aIs]].forEach(([x,y,rel])=>{
      if(!BIOS[x]||!BIOS[y])return;
      const parts=String(rel||"relative").split(","),word=parts[0].trim()||"relative";
      const field=/\b(sister|brother|twin|sibling)\b/i.test(word)?"siblings":"family";
      const g=given(y),n=nm(y),who=g&&g.toLowerCase()!==n.toLowerCase()?g+" ("+n+")":n,why=parts.slice(1).join(",").trim();
      ((gen[x]=gen[x]||{})[field]=gen[x][field]||[]).push(cap(word)+" "+who+(why?", "+why:""))}));
    Object.keys(BIOS).forEach(h=>{["siblings","family"].forEach(f=>{
        const base=String(BIOS[h][f]||"").replace(RE,"").trim(),g=gen[h]&&gen[h][f];
        BIOS[h][f]=g?(base?base+"; ":"")+MK+g.join("; ")+MK:base});
      const k=ACAD.FAMOF?ACAD.FAMOF(h):[];
      if(k.length)BIOS[h].kin=k.map(x=>nm(x.who)+(x.is?", her "+x.is:"")+" ("+(TYPEW[x.type]||"family")+")").join("; ");else delete BIOS[h].kin});
  };
  ACAD.syncFamily();
})();
