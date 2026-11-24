/* ---- v326: mismatched nipples and areolae (Body step, intimate details). Two optional fields, "Left nipple color"
   and "Left areola color": empty means both sides match, as before. When one is set and differs, the prompt names each
   side ("her right nipple is pale pink and her left nipple is chocolate brown"), the way heterochromatic eyes name each
   eye. Loads after part-03.js, whose intimateText and intimateRows it replaces (same gate, same rules, adults only). ---- */
(function(){
  if(typeof CHAR==="undefined"||typeof INTIMATE_FIELDS==="undefined")return;
  const copy=(from,to)=>{CHAR[to]=(CHAR[from]||[]).map(x=>x.slice())};
  copy("nippleColor","nippleColorTwo");copy("areolaColor","areolaColorTwo");
  Object.assign(LABELS,{nippleColor:"Nipple color (right, or both)",nippleColorTwo:"Left nipple color, if different",areolaColor:"Areola color (right, or both)",areolaColorTwo:"Left areola color, if different"});
  ["nippleColorTwo","areolaColorTwo"].forEach(f=>{if(!INTIMATE_FIELDS.includes(f))INTIMATE_FIELDS.push(f)});
  /* v2.42: an areola rim (a bold coloured ring around each areola, found with Kaia, the Blue-ringed Octopus) and nipple
     piercings. The rim is worded as the areola's own outer rim plus a weighted tag: "tattoo" wording does not render. */
  CHAR.areolaRim=["electric blue","black","gold","rose gold","silver","crimson","hot pink","violet","teal","emerald green"].map(v=>[v,""]);
  CHAR.nipplePiercing=["small silver nipple rings","small gold nipple rings","small silver barbell nipple piercings","small gold barbell nipple piercings","small heart-shaped nipple rings","small electric blue ring nipple piercings"].map(v=>[v,""]);
  Object.assign(LABELS,{areolaRim:"Areola rim color (a bold ring around each areola)",nipplePiercing:"Nipple piercings"});
  ["nippleColorTwo","areolaColorTwo","areolaRim","nipplePiercing"].forEach(f=>{if(!INTIMATE_FIELDS.includes(f))INTIMATE_FIELDS.push(f)});
  {const B=STEP_FIELDS.body;["nippleColorTwo","areolaColorTwo","areolaRim","nipplePiercing"].forEach(f=>{if(!B.includes(f))B.push(f)});if(typeof _fieldStep!=="undefined")_fieldStep=null}

  intimateText=function(){
    const G=id=>{const v=S.c[id];return v&&v!=="none"?rc(String(v)):""},C=CK.compact;
    const two=(a,b)=>a&&b&&a.toLowerCase()!==b.toLowerCase();
    const nc=G("nippleColor"),nc2=G("nippleColorTwo"),ac=G("areolaColor"),ac2=G("areolaColorTwo");
    const nRest=[G("nippleType"),G("nippleLength")].filter(Boolean),aRest=[G("areolaType"),G("areolaSize")].filter(Boolean);
    const nMis=two(nc,nc2),aMis=two(ac,ac2);
    const vc=G("vaginaColor"),vt=G("vaginaType"),ph=G("pubicHair"),pc=G("penisColor"),pt=G("penisType"),ps=G("penisSize"),out=[];
    const rim=G("areolaRim"),pierce=G("nipplePiercing");
    if(C){
      if(pierce)out.push(pierce);
      if(rim)out.push(`1.3::${rim}-rimmed areolae, ${rim} outline around areolae::`);
      if(nMis)out.push(`1.4::asymmetrical nipples, one ${nc} nipple and one ${nc2} nipple::, ${nc} right nipple, ${nc2} left nipple`+(nRest.length?", "+nRest.join(", ")+" nipples":""));
      else{const nip=[nc||nc2].concat(nRest).filter(Boolean);if(nip.length)out.push(nip.join(", ")+" nipples")}
      if(aMis)out.push(`${ac} right areola, ${ac2} left areola`+(aRest.length?", "+aRest.join(", ")+" areolae":""));
      else{const are=[ac||ac2].concat(aRest).filter(Boolean);if(are.length)out.push(are.join(", ")+" areolae")}
      if(vc||vt)out.push([vc,vt].filter(Boolean).join(", ")+" vagina");
      if(pc||pt||ps)out.push([ps,pc,pt].filter(Boolean).join(", ")+" penis");
      if(ph)out.push(ph);
      return out.join(", ");
    }
    /* the image generator ignores a left/right difference written only as a sentence; a weighted tag carries it */
    if(nMis)out.push(`1.4::asymmetrical nipples, one ${nc} nipple and one ${nc2} nipple::. Her nipples are mismatched: her right nipple is ${nc} and her left nipple is ${nc2}`+(nRest.length?`, and both are ${joinNatural(nRest)}`:"")+".");
    else{const nip=[nc||nc2].concat(nRest).filter(Boolean);if(nip.length)out.push(`Her nipples are ${joinNatural(nip)}.`)}
    if(pierce)out.push(`She has ${pierce}.`);
    const rimTxt=rim?`a thick, vivid ${rim} outer rim`:"";if(rim)out.push(`1.3::${rim}-rimmed areolae, ${rim} outline around areolae::.`);
    if(aMis)out.push(`Her right areola is ${ac} and her left areola is ${ac2}`+(aRest.length?`, both ${joinNatural(aRest)}`:"")+(rim?`, and both have ${rimTxt}`:"")+".");
    else{const are=[ac||ac2].concat(aRest).filter(Boolean);if(are.length)out.push(`Her areolae are ${joinNatural(are)}${rim?`, with ${rimTxt}`:""}.`);else if(rim)out.push(`Her areolae have ${rimTxt}.`)}
    if(vt)out.push(`Her ${vc?vc+" ":""}vagina is ${vt}.`);else if(vc)out.push(`Her vagina is ${vc}.`);
    {const pa=[ps,pc].filter(Boolean);if(pt)out.push(`Her ${pa.length?pa.join(", ")+" ":""}penis is ${pt}.`);else if(pa.length)out.push(`Her penis is ${joinNatural(pa)}.`)}
    if(ph)out.push(`She has ${ph}.`);
    return out.join(" ");
  };

  intimateRows=function(f){
    const gt=intimateGate();
    f.append(sub("Intimate details","Adult subjects only. Used only when the outfit is nude (no top, bottom, "+(isMale()?"vest or armor layer, outerwear, undershirt or underwear":"corset, outerwear, bra or panties")+") or the output mode is Character only. Written after the body paragraph. Leave the left colors empty for a matching pair."));
    if(!gt.open){
      f.append(h("p",{class:"callout warn"},gt.msg));
      if(gt.why==="clothed")f.append(h("div",{class:"btnrow"},h("button",{type:"button",class:"btn sm",onclick:intimateFix().fn,text:"Remove clothing from this outfit"})));
    }
    {const pb=presetBar(INTIMATE_PRESETS,INTIMATE_FIELDS,"Clear intimate details","ipreset",PRESET_GROUPS.intimate);
      if(!gt.open){pb.classList.add("dropped");pb.setAttribute("inert","")}f.append(pb)}
    [["Nipples",["nippleColor","nippleColorTwo","nippleType","nippleLength","nipplePiercing"]],["Areolae",["areolaColor","areolaColorTwo","areolaType","areolaSize","areolaRim"]],isMale()?["Genitals and hair",["penisColor","penisType","penisSize","pubicHair"]]:["Vagina and hair",["vaginaColor","vaginaType","pubicHair"]]].forEach(([t,ids])=>{
      f.append(h("p",{class:"muted small",text:t}));ids.forEach(id=>f.append(fieldRow(id)));
    });
  };
})();
