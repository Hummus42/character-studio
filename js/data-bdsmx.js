/* ---- v318: Scene Archive, BDSM humiliation. Ten transparent cut-out sex scenes in which she is the one dominated by a
   faceless man: leashed, spanked, hogtied, throat-used, spread, pinned by her hair, clamped, edged, displayed and marked.
   Her gear is her own wardrobe in the scene (w1: Scene step, Wearing...), so it can be changed or removed; the scene text
   says only what happens. One image on a transparent background, no furniture, no speech, captions or narration, only
   sound effects. Adults only and consensual; no injury. On every girl's shelf in its own category. Loads after
   data-blacked.js and before part-13. ---- */
(function(){
  const X=window.ARCH_EXTRA;if(!X||!X.S)return;
  const MUST="an anime style with high detail, transparent background, and particular emphasis on highly detailed skin, hair, eyes and bodies";
  const HUM="humiliated, teary-eyed, tears streaming, heavy blush, drooling, dazed, half-lidded eyes, open mouth, moaning";
  const AROUSE={"c1.blushStyle":"heavy humiliated blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const W2='{"name":"Nude","f":{},"m":{}}';
  const gear=(name,f)=>JSON.stringify({name,f,m:{}});
  const CUFFS=["leather cuffs clipped behind her back","black"];
  /* name, her gear (wardrobe), what happens, tags, her pose, [sound, style][], faceless view */
  const V=(name,w1,body,tags,po,fx,gm)=>{
    const tx=fx.map(([t,st])=>[t,st,st==="big"?`A big, bold sound effect reads "${t}".`:`Small lewd sound effects reading "${t}" float around them.`]);
    const f={name,count:"1girl, 1boy, hetero, faceless male",w1,w2:W2,act:tags.split(",").slice(0,4).map(s=>s.trim()).join(", "),
      scene:`Against a transparent background, with no scenery and no furniture, ${body} ${tx.map(x=>x[2]).join(" ")} `+uniq(["1girl, 1boy, hetero, faceless male",tags,"bdsm, humiliation, submission, femsub, motion lines, sweat, tears, transparent background, sound effects"].join(", ")),
      "c1.expression":HUM,"c1.posture":po};
    tx.forEach(([t,st,s],i)=>{f[`texts.${i}.k`]="sfx";f[`texts.${i}.st`]=st;f[`texts.${i}.who`]="";f[`texts.${i}.t`]=t;f[`texts.${i}.s`]=s});
    return{f:Object.assign(f,AROUSE),r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:gm||"far",must:MUST,"texts.n":tx.length,txTags:["sound effects"]},
      fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  X.S.push({s:"Academy BDSM Humiliation",v:[
    V("Leashed from behind",gear("Collar and leash",{neckAccessory:["leather collar with a chain leash","black"],wristAccessory:CUFFS}),
      "the woman is taken from behind on her knees by a faceless man who hauls her head back, arching her spine as he pounds into her, her face red and wet with tears.",
      "doggystyle, sex from behind, arched back, kneeling, sex, vaginal, penis","on her knees, back arched, head pulled back",[["plap plap","lewd"]]),
    V("Spanked and fucked",gear("Cuffs",{wristAccessory:["leather wrist cuffs linked by a chain","black"]}),
      "the woman is bent forward with her red ass in the air while a faceless man spanks her hard and fucks her from behind, a fresh handprint glowing on her skin.",
      "spanking, red ass, handprint, bent over, sex from behind, sex, vaginal, penis, looking back","bent forward, looking back over her shoulder",[["SMACK","big"],["plap plap","lewd"]]),
    V("Hogtied and used",gear("Hogtie and gag",{wristAccessory:["red jute rope binding her wrists to her ankles","red"],maskAccessory:["red ball gag","red"]}),
      "the woman lies on her side, wrists and ankles drawn together behind her, helpless and drooling, as a faceless man kneels behind her and fucks her deep.",
      "drooling, saliva, lying on side, arms behind back, sex from behind, sex, vaginal, penis, struggling","lying on her side, wrists and ankles drawn together",[["mmph mmph","lewd"]]),
    V("Throat used",gear("Ring gag and cuffs",{maskAccessory:["ring gag holding her mouth open","black"],wristAccessory:CUFFS}),
      "the woman kneels with her mouth held open while a faceless man grips her head with both hands and fucks her throat, tears and mascara running down her cheeks.",
      "irrumatio, deepthroat, kneeling, head grab, saliva, saliva trail, runny makeup, tears, penis","kneeling, head tilted back",[["gluk gluk","lewd"]],"pov"),
    V("Spread and pounded",gear("Spreader and cuffs",{wristAccessory:["leather cuffs holding her wrists above her head","black"],legwear:["leather ankle cuffs on a steel spreader bar","black"]}),
      "the woman lies on her back with her wrists held above her head and her legs forced wide, while a faceless man pins her and pounds into her relentlessly.",
      "missionary, on back, arms up, spread legs, pinned, sex, vaginal, penis, trembling","on her back, arms above her head, legs held wide",[["plap plap","lewd"]]),
    V("Face down, ass up",gear("Cuffs and ankle cuffs",{wristAccessory:["leather cuffs chained to her ankle cuffs","black"],legwear:["leather ankle cuffs","black"]}),
      "the woman is face down and ass up, arms reaching back to her ankles, while a faceless man presses her head down with one hand and fucks her hard from behind.",
      "top-down bottom-up, face down, ass up, head down, hand on another's head, sex from behind, sex, vaginal, penis, drooling","face down, ass up",[["pan pan","lewd"]]),
    V("Pinned by her hair",gear("Collar",{neckAccessory:["leather collar","black"]}),
      "the woman is folded into a mating press by a faceless man who holds her down by a fistful of her hair, slamming into her as she sobs with pleasure.",
      "mating press, hair pull, grabbing another's hair, folded, legs up, deep penetration, sex, vaginal, penis","folded on her back, legs up, held by her hair",[["pomf pomf","lewd"]]),
    V("Clamped and riding",gear("Clamps and cuffs",{top:["pair of nipple clamps joined by a chain","silver"],wristAccessory:CUFFS}),
      "the woman rides a faceless man with her hands behind her back, crying out as he tugs at her nipples with every thrust.",
      "cowgirl position, girl on top, nipple pull, hands behind back, bouncing breasts, sex, vaginal, penis, trembling","straddling him, hands behind her back, chest pulled forward",[["plap plap","lewd"]]),
    V("Edged and overstimulated",gear("Spread-eagle restraints",{wristAccessory:["leather cuffs stretching her arms wide","black"],legwear:["leather ankle cuffs stretching her legs wide","black"]}),
      "the woman lies spread-eagle and helpless while a faceless man fucks her slowly and holds a wand vibrator against her, keeping her shaking on the edge.",
      "spread eagle, vibrator, wand vibrator, overstimulation, trembling, sex, vaginal, penis, arched back","spread-eagle on her back",[["bzzzz","lewd"],["plap","lewd"]]),
    V("Marked and finished",gear("Collar and cuffs",{neckAccessory:["leather collar with a padlock","black"],wristAccessory:CUFFS}),
      "the woman kneels with her tongue out, her body covered in degrading words and tally marks, as a faceless man finishes across her face.",
      "facial, cum on face, tongue out, kneeling, body writing, tally marks, ejaculation, penis, looking up","kneeling, tongue out, looking up",[["splurt","lewd"]],"pov")]});
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="BDSM humiliation"))ACAD.RX_CATS.push(["BDSM humiliation",["BDSM Humiliation"]])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
