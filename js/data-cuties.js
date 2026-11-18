/* ---- v323: the Cuties shelf. Ten extremely cute looks for every Academy girl, from window.CUTIES (data-cutiesx.js,
   which also builds their matching Scene Archive scenes). All clothing is in the Outfit tab in her own palette; the
   notes, settings, poses and expressions carry no clothing words. Grown women in cute fashion (age: woman). Loads
   after data-everyday2.js and before data-wardrobe.js, which files them on the "Cuties" shelf. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof tplById!=="function"||!Array.isArray(window.CUTIES))return;
  const H=(ACAD.HOUSES||[]).slice();
  const must=set=>`an anime style with high detail, ${set}, and particular emphasis on highly detailed skin, hair and eyes`;
  let after="Academy Cozy Crop";ACAD.CUTIES_LABELS=[];
  window.CUTIES.forEach(([suf,name,oname,items,ex,po,set,tags,theme])=>{
    const label="Academy "+name;
    ACAD.set(label,after,suf,theme.replace(/^an? /,""),"casual",{tags:["cute","cuties"].concat(tags.split(",").slice(0,3).map(s=>s.trim())),oname,c:{age:"woman"}},
      H.map(h=>[h,items,ex[H.indexOf(h)%ex.length],po[H.indexOf(h)%po.length],theme,{}]));
    after=label;ACAD.CUTIES_LABELS.push(label);
    H.forEach(h=>{const t=tplById(h+suf);if(!t)return;t.out=Object.assign({},t.out,{must:must(set),notes:tags})})});
})();
