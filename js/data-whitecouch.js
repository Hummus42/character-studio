/* ---- v319: Scene Archive, White Couch. The After dark White Couch, played out: she is thrown around on and over a white
   couch in a bright, minimalist white room and fucked silly by several muscular, dark-skinned faceless men. Ten group sex
   scenes and three group impregnation scenes (an x-ray inset and a cross-section of her womb, a shouted line in veiny bold
   black lettering, a squiggly pink thought bubble and sound effects). Her white tee is her wardrobe in the scene (Scene
   step, Wearing...), so it can be changed or removed; the scene text never names it. Rough and passionate, always
   consensual: she is eager for all of it. Adults only. One image each. On every girl's shelf in its own category.
   Loads after data-bdsmx.js and before part-13. ---- */
(function(){
  const X=window.ARCH_EXTRA;if(!X||!X.S)return;
  const MUST="an anime style with high detail, a bright, minimalist white room, and particular emphasis on highly detailed skin, hair, eyes and bodies, and on the contrast between her skin and their dark skin";
  const SILLY="fucked silly, ahegao, rolling eyes, tongue out, drooling, tears of pleasure, heavy blush, heavy breathing, sweat";
  const BRED="ahegao, heart-shaped pupils, crossed eyes, rolling eyes, tongue out, drooling, moaning, heavy blush, tears of pleasure";
  const AROUSE={"c1.blushStyle":"heavy aroused blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const MEN="faceless male, dark-skinned male, muscular male, interracial, large penis, veiny penis, erection, multiple penises, gangbang, group sex";
  const ROOM="white couch, couch, white room, indoors, rough sex, manhandling, motion lines, speed lines, sweat, steam, fucked silly";
  const IMP="x-ray, cross-section, internal cumshot, cum in pussy, impregnation, fertilization, sperm cell, ovum, uterus, cum overflow, ejaculation, deep penetration, speech bubble, thought bubble, english text, colored text";
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const TEE=JSON.stringify({name:"White tee",f:{top:["plain white t-shirt pushed up over her breasts","white"]},m:{}});
  const W2='{"name":"Nude","f":{},"m":{}}';
  const sfx=(t,st)=>st==="big"?`A big, bold sound effect reads "${t}".`:`Small lewd sound effects reading "${t}" float around them.`;
  /* one scene; tx = [[kind, style, text, colour]] */
  const V=(name,n,body,tags,po,tx,imp)=>{
    const S=tx.map(([k,st,t,c])=>k==="speech"?`She shouts "${t}" in a big, jagged speech bubble with bold letters, in ${c} lettering.`:k==="thought"?`She thinks "${t}" in a cloud-shaped thought bubble, in ${c} lettering.`:sfx(t,st));
    const count=`1girl, ${n}, hetero, gangbang`;
    const f={name,count,w1:TEE,w2:W2,act:tags.split(",").slice(0,4).map(s=>s.trim()).join(", "),
      scene:`In a bright, minimalist white room, ${body}${imp?" An x-ray inset shows a cock buried inside her and thick cum flooding into her, and a cross-section of her womb shows the cum surging in and fertilizing her egg.":""} ${S.join(" ")} `+uniq([count,tags,MEN,ROOM,imp?IMP:"","sound effects"].join(", ")),
      "c1.expression":imp?BRED:SILLY,"c1.posture":po};
    tx.forEach(([k,st,t,c],i)=>{f[`texts.${i}.k`]=k;f[`texts.${i}.st`]=st;f[`texts.${i}.who`]=k==="sfx"?"":"c1";f[`texts.${i}.t`]=t;if(c)f[`texts.${i}.c`]=c;f[`texts.${i}.s`]=S[i]});
    return{f:Object.assign(f,AROUSE),r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:"far",must:MUST,"texts.n":tx.length,
      txTags:imp?["speech bubble","thought bubble","english text","colored text","sound effects"]:["sound effects"]},fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  const BLK="veiny, bold black",PINK="squiggly pink";
  X.S.push({s:"Academy White Couch Gangbang",v:[
    V("Thrown onto the couch","2boys","two muscular, dark-skinned faceless men throw the woman down across a white couch and spitroast her, one pounding her pussy from behind while the other grips her hair and fucks her throat, both huge, veiny, rock-hard cocks buried deep.",
      "spitroast, thrown, on couch, all fours, sex from behind, irrumatio, hair pull, vaginal, deepthroat, saliva","on all fours across the couch",[["sfx","big","THUD"],["sfx","lewd","plap plap"]]),
    V("Sandwiched on the couch","2boys","the woman rides a muscular, dark-skinned faceless man sprawled on a white couch while a second one shoves her forward and takes her ass, the two of them slamming into her at once.",
      "double penetration, sandwiched, girl on top, sex from behind, vaginal, anal, on couch, trembling","straddling one man on the couch, the other behind her",[["sfx","lewd","plap plap"]]),
    V("Upside down","2boys","the woman is flipped upside down on a white couch, her head hanging off the edge of the seat as one muscular, dark-skinned faceless man fucks her throat and another pins her legs open and pounds her pussy.",
      "upside-down, head hanging off couch, irrumatio, deepthroat, spread legs, vaginal, on couch, saliva, tears","upside down, head hanging off the seat",[["sfx","lewd","gluk gluk"]]),
    V("Over the armrest","2boys","the woman is bent over the armrest of a white couch, one muscular, dark-skinned faceless man pounding her from behind while another holds her face and fills her mouth.",
      "bent over, over armrest, sex from behind, fellatio, irrumatio, spitroast, vaginal, on couch","bent over the armrest",[["sfx","lewd","pan pan"]]),
    V("Lifted off the couch","2boys","a muscular, dark-skinned faceless man hoists the woman off the white couch in a full nelson, legs spread in the air, while a second one steps in and fucks her from the front, both cocks in her at once.",
      "full nelson, held up, legs up, double penetration, standing sex, vaginal, anal, spread legs","held up in a full nelson in front of the couch",[["sfx","lewd","plap plap"]]),
    V("Riding and stroking","3boys","the woman rides a muscular, dark-skinned faceless man on the white couch, bouncing hard on his huge, veiny cock, a rock-hard cock in each hand from the men standing on either side.",
      "cowgirl position, girl on top, double handjob, on couch, vaginal, bouncing breasts, multiple penises","riding on the couch, a cock in each hand",[["sfx","lewd","shlick shlick"]]),
    V("Pressed into the cushions","multiple boys","the woman is folded into a mating press in the white couch's cushions by one muscular, dark-skinned faceless man, while the others lean over the back of the couch stroking their huge, veiny cocks, waiting their turn.",
      "mating press, folded, legs up, on couch, deep penetration, vaginal, multiple penises, penis grab","folded into the cushions, legs up",[["sfx","lewd","pomf pomf"]]),
    V("Passed around","multiple boys","the woman is passed from man to man in front of the white couch, carried in the arms of one muscular, dark-skinned faceless man and fucked in midair while the next reaches for her.",
      "suspended congress, carrying, passed around, legs around waist, standing sex, vaginal, multiple boys","carried, legs wrapped around the man holding her",[["sfx","lewd","plap plap"]]),
    V("Kneeling on the cushions","multiple boys","the woman kneels on the white couch's cushions, surrounded on every side by muscular, dark-skinned faceless men, sucking one huge, veiny cock while stroking two more.",
      "kneeling, on couch, fellatio, double handjob, surrounded, multiple penises, penis on face, saliva","kneeling on the cushions, surrounded",[["sfx","lewd","slurp slurp"]]),
    V("Glazed on the couch","multiple boys","the woman sprawls dazed across the white couch, legs over the armrest, as a ring of muscular, dark-skinned faceless men finish across her face, breasts and stomach at once.",
      "bukkake, cum on face, cum on breasts, cum on stomach, cum on body, lying on couch, legs over armrest, ejaculation, multiple penises","sprawled across the couch, legs over the armrest",[["sfx","big","SPLURT"],["sfx","lewd","drip drip"]]),
    V("Breeding line","multiple boys","the woman lies on her back across the white couch while muscular, dark-skinned faceless men take turns breeding her, the latest pounding into her and erupting deep inside her as the last load still drips out.",
      "missionary, on back, on couch, spread legs, taking turns, cum overflow, cumdrip, multiple penises","on her back across the couch, legs spread",[["speech","shout","NEXT! BREED ME NEXT!",BLK],["thought","cloud","One of them is going to knock me up",PINK],["sfx","big","BYURURURU"],["sfx","lewd","plap plap"]],true),
    V("Double creampie","2boys","the woman is sandwiched on the white couch between two muscular, dark-skinned faceless men, one under her and one behind her, both cumming deep inside her at once.",
      "double penetration, sandwiched, girl on top, sex from behind, vaginal, anal, cum in ass, on couch","sandwiched between two men on the couch",[["speech","shout","BOTH OF YOU! FILL ME UP!",BLK],["thought","cloud","So full... I'm definitely pregnant",PINK],["sfx","big","DOPYU DOPYU"],["sfx","lewd","pan pan"]],true),
    V("Bred into the cushions","multiple boys","the woman is crushed into a mating press on the white couch by a muscular, dark-skinned faceless man who unloads deep inside her, while the others stand over the couch waiting to breed her next.",
      "mating press, folded, legs up, on couch, multiple penises, waiting","folded into the cushions, legs up",[["speech","shout","DON'T PULL OUT! BREED ME!",BLK],["thought","cloud","I want all of their babies",PINK],["sfx","big","BYURURU"],["sfx","lewd","pomf pomf"]],true),
    V("Drenched on the couch","multiple boys","the woman kneels on the floor in front of a white couch, her head tipped back, mouth wide open and both hands cupped in front of her, as a ring of muscular, dark-skinned faceless men stand over her and piss all over her, the streams pouring into her mouth and her cupped hands while she drinks it all down, eager and drenched.",
      "peeing, urine, pee on body, pee in mouth, golden shower, urination, pee stream, open mouth, tongue out, cupped hands, kneeling, wet, dripping, drinking, multiple penises","kneeling, head tipped back, mouth open, hands cupped",[["sfx","big","SHOOOOO"],["sfx","lewd","gulp gulp"],["sfx","lewd","drip drip"]])]});
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="White Couch"))ACAD.RX_CATS.push(["White Couch",["White Couch Gangbang"]])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
