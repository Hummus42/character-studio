/* ---- v316: After dark, Impregnation. Twelve positions for every girl with a muscular, dark-skinned faceless man who
   finishes inside her: each one a single image with an x-ray inset of the creampie and a cross-section of her womb as
   his cum reaches it, motion and action lines, her ahegao with heart eyes, and four Text and sound items (a shouted line in
   veiny bold black lettering, a squiggly pink thought bubble, a big explosive sound effect and small lewd ones), all
   editable in the Scene step. Adults only, consensual; no family roles. Her outfit is "Nude" with no items, so the prompt
   carries no clothing words (the outfit lives only in the Outfit tab). Loads after data-afterdark.js, before part-18. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof tplById!=="function")return;
  const H=(ACAD.HOUSES||[]).slice();
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair, eyes and bodies, and on the contrast between her skin and his dark skin";
  const MAN="dark-skinned male, muscular male, faceless male, interracial, large penis, veiny penis, erection";
  const CUM="x-ray, cross-section, internal cumshot, cum in pussy, impregnation, fertilization, sperm cell, ovum, uterus, cum overflow, ejaculation, deep penetration";
  const FX="motion lines, speed lines, heart, steam, sweat, trembling, pussy juice";
  const SILLY="ahegao, heart-shaped pupils, crossed eyes, rolling eyes, tongue out, drooling, moaning, heavy blush, tears of pleasure";
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"flushed, sweat-glistening skin",vaginaType:"flushed, swollen, and dripping wet",nippleType:"hard and flushed with arousal"};
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  /* [suffix, name, what happens, position tags, her pose, she says, she thinks, big sound, lewd sound] */
  const P=[
    ["impmiss","Missionary","the woman lies on her back on a rumpled bed with her legs spread wide while a muscular, dark-skinned faceless man pins her down, his hands squeezing her breasts, and pounds his huge, veiny, rock-hard cock into her to the hilt until he erupts deep inside her",
      "missionary, on back, spread legs, grabbing another's breast, sex, vaginal","lying on her back, legs spread wide","CUM INSIDE ME! BREED ME!","I'm getting pregnant... I'm really getting pregnant","BYURURURU","plap plap"],
    ["imppress","Mating press","the woman is folded beneath a muscular, dark-skinned faceless man in a mating press, knees crushed to her shoulders, as he slams down into her with his whole weight and floods her womb",
      "mating press, folded, legs up, knees to chest, sex, vaginal","folded on her back, legs over his shoulders","DON'T PULL OUT! FILL ME UP!","His seed is pouring straight into my womb","DOPYU DOPYU","pomf pomf"],
    ["impcowgirl","Riding","the woman rides a muscular, dark-skinned faceless man hard, his hands gripping her hips and dragging her down onto his huge, veiny cock as he bucks up and cums inside her",
      "cowgirl position, girl on top, straddling, hands on another's hips, bouncing breasts, sex, vaginal","straddling him, bouncing","I'M TAKING ALL OF IT! EVERY DROP!","I want his baby so badly","BYUBYURU","plap plap"],
    ["impdoggy","From behind","the woman is on all fours as a muscular, dark-skinned faceless man pulls her back by both arms and pounds her from behind, buried to the hilt as he pumps her full",
      "doggystyle, sex from behind, all fours, arm grab, arched back, sex, vaginal","on all fours, arms pulled back","BREED ME! MAKE ME A MOTHER!","Knock me up, knock me up, knock me up","DOKU DOKU","pan pan"],
    ["impprone","Prone bone","the woman lies flat on her stomach with her ass raised as a muscular, dark-skinned faceless man presses her into the sheets and drives down into her, cumming deep",
      "prone bone, lying on stomach, ass up, sex from behind, pinned, sex, vaginal","lying face down, hips raised","DEEPER! CUM DEEPER!","I can feel it filling me","BYURU BYURU","pan pan"],
    ["impwall","Against the wall","a muscular, dark-skinned faceless man lifts the woman off her feet and pins her against the wall, her legs locked around his waist, thrusting up into her as he unloads inside her",
      "suspended congress, against wall, carrying, legs around waist, standing sex, sex, vaginal","lifted against the wall, legs wrapped around him","GIVE ME YOUR BABY!","I'm going to be so full of him","DOPYU","thud thud"],
    ["impshoulders","Legs on his shoulders","the woman lies back with her legs resting on the shoulders of a muscular, dark-skinned faceless man as he grips her thighs and plunges into her as deep as he can go, cumming against her cervix",
      "legs over shoulders, leg grab, missionary, deep penetration, sex, vaginal","on her back, legs up on his shoulders","RIGHT THERE! CUM RIGHT THERE!","He's pressing right against my womb","BYURURU","plap plap"],
    ["impspoon","Spooning","the woman lies on her side, held tight from behind by a muscular, dark-skinned faceless man, one leg lifted in his hand, as he grinds deep into her and cums inside her",
      "spooning, lying on side, leg lift, sex from behind, sex, vaginal","lying on her side, one leg lifted","KEEP IT INSIDE ME...","Stay in me until it takes","DOKUN","nuchu nuchu"],
    ["impnelson","Full nelson","a muscular, dark-skinned faceless man holds the woman up in a full nelson, her legs spread wide in the air, bouncing her on his huge, veiny cock as he cums deep inside her",
      "full nelson, held up, legs up, spread legs, standing sex, sex, vaginal","held up in a full nelson, legs spread wide","I'M YOURS! BREED ME!","Everyone will see I'm his","BYURURURU","plap plap"],
    ["imprevcow","Reverse cowgirl","the woman rides a muscular, dark-skinned faceless man reverse cowgirl, looking back over her shoulder, grinding down as he grabs her waist and cums up into her",
      "reverse cowgirl position, girl on top, looking back, sex, vaginal","riding facing away, looking back over her shoulder","CUM! CUM IN ME NOW!","I want to feel him fill me","DOPYU DOPYU","plap plap"],
    ["implotus","Lotus","the woman sits in the lap of a muscular, dark-skinned faceless man in the lotus position, arms and legs wrapped tight around him, grinding down until he cums inside her",
      "lotus position, sitting on lap, legs around waist, arms around neck, hug, sex, vaginal","sitting in his lap, wrapped around him","I LOVE IT! GIVE ME EVERYTHING!","I don't ever want him to stop","DOKU DOKU","nuchu nuchu"],
    ["imppile","Piledriver","the woman is rolled onto her shoulders with her legs over her head as a muscular, dark-skinned faceless man drives straight down into her, cumming so deep it overflows",
      "piledriver (sex), legs over head, folded, from above, sex, vaginal","rolled onto her shoulders, legs over her head","SO MUCH! IT'S ALL GOING IN!","There's no way I'm not pregnant now","BYURURURURU","pan pan"]];
  /* the looks are made now as plain looks (the purge drops sets whose looks are mostly scenes, and the wardrobe rebuilds
     the shelves from its own list); their scene, partner and text items, and the Impregnation shelf, are added once the
     page has loaded, after both have run */
  const LABELS=[],LATE=[];let after="Academy White Couch";
  P.forEach(([suf,name,body,pos,po,say,think,big,lewd])=>{
    const label="Academy Impregnation: "+name;LABELS.push(label);
    ACAD.set(label,after,suf,"impregnation, "+name.toLowerCase(),"boudoir",{tags:["after dark","explicit","impregnation"].concat(pos.split(",").slice(0,2).map(s=>s.trim())),oname:"Nude",c:Object.assign({age:"woman"},AROUSE)},
      H.map(h=>[h,{},SILLY,po,"impregnation, "+name.toLowerCase(),{}]));
    after=label;
    const texts=[
      {k:"speech",st:"shout",who:"c1",t:say,c:"veiny, bold black"},
      {k:"thought",st:"cloud",who:"c1",t:think,c:"squiggly pink"},
      {k:"sfx",st:"big",who:"",t:big},
      {k:"sfx",st:"lewd",who:"",t:lewd}];
    const sentence=it=>it.k==="speech"?`She shouts "${it.t}" in a big, jagged speech bubble with bold letters, in ${it.c} lettering.`:
      it.k==="thought"?`She thinks "${it.t}" in a cloud-shaped thought bubble, in ${it.c} lettering.`:
      it.st==="big"?`A big, bold sound effect reads "${it.t}".`:`Small lewd sound effects reading "${it.t}" float around them.`;
    texts.forEach(it=>it.s=sentence(it));
    const scene=`In a single image, ${body}. Motion lines and action lines show how hard he is fucking her. An x-ray inset shows his cock buried inside her and thick cum flooding into her, and a cross-section of her womb shows his cum surging in and fertilizing her egg. ${texts.map(t=>t.s).join(" ")} `
      +uniq(["1girl, 1boy, hetero",pos,MAN,CUM,FX,"speech bubble, thought bubble, english text, colored text, sound effects"].join(", "));
    LATE.push(()=>H.forEach(h=>{const t=tplById(h+suf);if(!t)return;
      t.out=Object.assign({},t.out,{framing:"full body",must:MUST,explicit:true,lewdtag:true,
        pair:{id:"",gm:"far",outfit:"scene",scene,act:pos.split(",").slice(0,3).map(s=>s.trim()).join(", "),dir:"ba",w1:{name:"Nude",f:{},m:{}},w2:{name:"Nude",f:{},m:{}},
          texts:texts.map(x=>Object.assign({},x)),txTags:["speech bubble","thought bubble","english text","colored text","sound effects"],penis:true,explicit:true,compact:false,fit:true,
          c1:Object.assign({expression:SILLY,posture:po},AROUSE)}});
      if(t.c){t.c.expression=SILLY;t.c.posture=po}
      t.blurb=`${(ACAD.HNAME&&ACAD.HNAME[h])||h}, impregnated ${name.toLowerCase()} by a muscular, dark-skinned faceless man: x-ray creampie and womb cross-section, one image.`}))});
  function late(){
    LATE.forEach(f=>f());
    /* its shelf is in the wardrobe list (data-wardrobe.js) */}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",late);else late();
})();
