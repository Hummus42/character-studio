/* ADMIN-ONLY END */
/* ADMIN-ONLY BEGIN */
/* ---- v270: a forming group that reaches its fifth House is established. The changes list (and so the What's new page of the
   file that is saved) says so, beside the girl whose House is the fifth. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.admin||!ACAD.admin.kit||!ACAD.groupStatus)return;
  const K=ACAD.admin.kit;if(!K.admin)return;
  K.addChanges((d,out)=>{const N=ACAD.ESTABLISH||5;const add=(d.add&&d.add.girls)||{};
    (ACAD.GROUPS||[]).forEach(g=>{if(g.apart)return;const nu=Object.keys(add).filter(h=>(add[h]||{}).group===g.id&&g.members.includes(h));
      const before=g.members.length-nu.length;if(before<N&&g.members.length>=N&&nu.length)
        out.push({label:`${g.name} is established: ${ACAD.numWords?ACAD.numWords(g.members.length):g.members.length} Houses, ${K.HN(nu[nu.length-1])}'s the ${before+1===N?"fifth":"latest"}`,path:["add","girls",nu[nu.length-1]]})})});
})();
