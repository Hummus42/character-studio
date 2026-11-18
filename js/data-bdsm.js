/* ---- v318: After dark, BDSM humiliation. Ten looks for every girl in which she is the one dominated: restrained,
   collared, displayed and humiliated, her dominant only a hand or a shadow at the edge of the frame. Every piece of gear
   is an Outfit item (so it can be changed or removed in the Outfit tab); the notes, setting and poses never name the
   gear, only her body and what is happening, so taking the gear off leaves nothing of it behind. Adults only and
   consensual; no injury. Loads after data-impreg.js; its shelf is placed once the page has loaded, after the wardrobe has
   rebuilt the shelves. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof tplById!=="function")return;
  const H=(ACAD.HOUSES||[]).slice();
  const AROUSED={blushStyle:"heavy humiliated blush",skinFinish:"flushed, sweat-glistening skin",nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet"};
  const MUST=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair, eyes and bodies`;
  /* [suffix, name, outfit name, items (the gear), expressions, poses, setting, tags] */
  const L=[
    ["bdleash","Leashed and Kneeling","Collar and leash",{neckAccessory:["leather collar with a steel ring and a short chain leash","black"],wristAccessory:["leather cuffs clipped together behind her back","black"]},
      ["humiliated, teary-eyed blush, looking up","flushed and trembling, lips parted","red-faced, eyes lowered in submission"],
      ["kneeling on the floor, arms behind her back, chin tipped up toward a hand at the edge of the frame","on all fours, crawling forward","kneeling with her head bowed"],
      "a dark playroom lit by a single lamp, a dominant's hand reaching down at the edge of the frame",
      "bdsm, humiliation, submission, kneeling, arms behind back, looking up, tears, blush, trembling"],
    ["bdhogtie","Hogtied","Hogtie and gag",{wristAccessory:["red jute rope hogtie binding her wrists to her ankles behind her back","red"],maskAccessory:["red ball gag","red"]},
      ["drooling, teary and flushed","dazed, breathless blush","pleading, wet eyes"],
      ["lying on her side on the floor, wrists and ankles drawn together behind her","lying face down, back arched, ankles drawn up to her wrists","lying on her side, squirming"],
      "a bare wooden floor in a dim room, a dominant's shadow falling across her",
      "bdsm, humiliation, drooling, saliva, tears, struggling, lying, arched back, arms behind back"],
    ["bdwords","Degrading Words","Collar",{neckAccessory:["thin leather collar with a heart-shaped tag","pink"]},
      ["red-faced, mortified smile","teary, humiliated blush","dazed, tongue out, eyes unfocused"],
      ["kneeling, hands on her thighs","lying back, arms above her head","standing with her hands behind her head"],
      "a bedroom against a plain wall, a marker pen held by a hand at the edge of the frame",
      "body writing, tally marks, written on breasts, written on thigh, humiliation, bdsm, blush, crying, embarrassed"],
    ["bdspanked","Spanked","Cuffs",{wristAccessory:["leather wrist cuffs linked by a short chain","black"]},
      ["tear-streaked, sniffling blush","pouting, red-faced, looking back","dazed and flushed"],
      ["bent over, hands together in front of her, looking back","standing facing the corner, hands on her head","kneeling with her red ass raised"],
      "a strict study with a wooden paddle hanging on the wall",
      "spanking, red ass, handprint, bent over, looking back, humiliation, tears, bdsm, corner time"],
    ["bdbowl","Pet Bowl","Pet gear",{neckAccessory:["studded leather collar with a name tag","black"],gloves:["padded paw mittens","black"]},
      ["embarrassed, flushed, glancing up","obedient, teary smile","humiliated pout"],
      ["on all fours, eating from a bowl on the floor","on all fours beside a pet bowl, looking up","kneeling, hands held up like paws"],
      "a kitchen floor with a pet bowl, a dominant's hand patting her head at the edge of the frame",
      "pet play, on all fours, pet bowl, eating, humiliation, bdsm, looking up, blush, headpat"],
    ["bdclamps","Clamped and Weighted","Clamps",{top:["pair of nipple clamps joined by a fine chain with small weights hanging from it","silver"],wristAccessory:["leather cuffs clipped behind her back","black"]},
      ["wincing, trembling, teary blush","biting her lip, eyes squeezed shut","flushed, panting, dazed"],
      ["kneeling, back arched, chest pushed out","kneeling upright, arms behind her back","on her knees, head thrown back"],
      "a dark playroom with a single spotlight",
      "arched back, arms behind back, trembling, tears, humiliation, bdsm, kneeling, panting"],
    ["bdfacedown","Face Down, Ass Up","Cuffs and gag",{wristAccessory:["leather wrist cuffs chained to her ankle cuffs","black"],legwear:["leather ankle cuffs","black"],maskAccessory:["ring gag","black"]},
      ["drooling, eyes rolled up","teary and flushed, cheek against the floor","dazed, humiliated blush"],
      ["face down, ass up, arms reaching back to her ankles","face down with a hand pressing her head to the floor","face down, ass up, knees spread"],
      "a bare playroom floor, a dominant's hand pressing her head down",
      "top-down bottom-up, face down, ass up, drooling, saliva, humiliation, bdsm, tears, presenting"],
    ["bdinspect","Inspection","Restraints",{wristAccessory:["leather cuffs chained to a hook overhead","black"],legwear:["leather ankle cuffs on a steel spreader bar","black"]},
      ["mortified, red-faced, eyes squeezed shut","teary, trembling blush","flushed, biting her lip"],
      ["standing with her arms raised overhead and her legs spread wide","standing on tiptoe, arms up, legs spread","turned around, arms up, looking back over her shoulder"],
      "a bare, brightly lit room, a dominant's hand inspecting her at the edge of the frame",
      "arms up, spread legs, presenting, embarrassed, humiliation, bdsm, crying, blush, standing"],
    ["bdfootstool","Footstool","Collar and cuffs",{neckAccessory:["leather collar","black"],wristAccessory:["leather wrist cuffs","black"],legwear:["leather ankle cuffs","black"]},
      ["calm, devoted, eyes lowered","flushed, humbled stillness","teary, obedient blush"],
      ["on all fours as a footstool, a pair of feet resting on her back","kneeling on all fours, perfectly still","on all fours, head bowed to the floor"],
      "an elegant drawing room, a dominant seated beside her with their feet on her back",
      "human furniture, footstool, all fours, humiliation, bdsm, submissive, head down, still"],
    ["bdsign","Free Use Sign","Sign and collar",{heldItem:["cardboard sign reading FREE USE","-"],neckAccessory:["leather collar with a padlock","black"]},
      ["red-faced, humiliated smile, tongue out","teary, flushed, looking up","dazed, embarrassed blush"],
      ["kneeling, hands held to her chest","kneeling, hands behind her head","sitting back on her heels, hands in her lap"],
      "a bedroom against a plain wall",
      "humiliation, bdsm, kneeling, blush, crying, tongue out, looking up"]];
  const LABELS=[];let after=tplById(H[0]+"imppile")?"Academy Impregnation: Piledriver":"Academy White Couch";
  L.forEach(([suf,name,oname,items,ex,po,set,tags])=>{
    const label="Academy BDSM: "+name;LABELS.push(label);
    ACAD.set(label,after,suf,"BDSM, "+name.toLowerCase(),"edgy",{tags:["after dark","explicit","bdsm","humiliation"],oname,c:Object.assign({age:"woman"},AROUSED)},
      H.map((h,i)=>[h,items,ex[i%ex.length],po[i%po.length],"BDSM, "+name.toLowerCase(),{}]));
    after=label;
    H.forEach(h=>{const t=tplById(h+suf);if(!t)return;t.out=Object.assign({},t.out,{must:MUST(set),notes:tags,explicit:true,lewdtag:true})})});
  function late(){
    if(Array.isArray(ACAD.CATS)){const S=new Set(LABELS);ACAD.CATS.forEach(c=>{c[1]=c[1].filter(l=>!S.has(l))});
      for(let i=ACAD.CATS.length-1;i>=0;i--)if(!ACAD.CATS[i][1].length&&ACAD.CATS[i][0]!=="BDSM humiliation")ACAD.CATS.splice(i,1);
      if(!ACAD.CATS.some(c=>c[0]==="BDSM humiliation")){const i=ACAD.CATS.findIndex(c=>c[0]==="Power play");ACAD.CATS.splice(i<0?ACAD.CATS.length:i+1,0,["BDSM humiliation",LABELS.slice()])}}
    if(Array.isArray(ACAD.AFTER_CATS)&&!ACAD.AFTER_CATS.includes("BDSM humiliation")){const i=ACAD.AFTER_CATS.indexOf("Power play");ACAD.AFTER_CATS.splice(i<0?ACAD.AFTER_CATS.length:i+1,0,"BDSM humiliation")}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",late);else late();
})();
