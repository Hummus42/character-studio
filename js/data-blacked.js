/* ---- v314: BLACKED. The Cut-outs' whole repertoire (Positions, Oral, Hands and Body, Anal, Finish) with the faceless man
   made a muscular, dark-skinned man with a veiny, rock-hard cock, and a set of group scenes with several of them. Her
   expression defaults to fucked silly; every act is played as hard, rough and passionate as it goes, and always consensual
   (she is eager and begging for it). Like the Cut-outs: one image on a transparent background, no furniture, no speech,
   captions or narration, only small lewd sound effects. On every girl's shelf in its own category, "BLACKED". All adults.
   Built from ARCH_EXTRA's Cut-out sets (data-cutouts.js), so it must load after it and before part-13. ---- */
(function(){
  const X=window.ARCH_EXTRA;if(!X||!X.S)return;
  const SILLY="fucked silly, ahegao, rolling eyes, tongue out, drooling, tears of pleasure, heavy blush, heavy breathing, sweat";
  const MAN="dark-skinned male, muscular male, faceless male, interracial, large penis, veiny penis, erection";
  const MUST="an anime style with high detail, transparent background, and particular emphasis on highly detailed skin, hair, eyes and bodies, and on the contrast between her skin and his dark skin";
  const ROUGH={
    "Positions":"He takes her hard and rough, gripping her hips hard enough to dimple the skin and pounding into her with relentless, brutal force, and she begs for more, trembling and drooling.",
    "Anal":"He takes her ass hard and deep, one fist in her hair, slamming into her again and again while she screams for more, eyes rolling.",
    "Oral":"He grips her hair in his fist and thrusts deep, rough and greedy, and she takes every inch eagerly, eyes rolling, spit everywhere.",
    "Hands and Body":"He handles her roughly and hungrily, rock-hard and dripping, and she shudders with desperate, begging need.",
    "Finish":"Wrecked from being taken hard and rough, she is trembling, glassy-eyed and grinning, utterly fucked silly."};
  const ROUGHT={"Positions":"rough sex, hip grab, pounding, deep penetration, trembling, motion lines, sweat, steam",
    "Anal":"rough sex, hair pull, grabbing another's hair, deep penetration, trembling, motion lines, sweat, steam",
    "Oral":"rough sex, irrumatio, hair pull, grabbing another's hair, deepthroat, saliva, saliva trail, tears, motion lines",
    "Hands and Body":"rough sex, ass grab, groping, sweat, steam, motion lines",
    "Finish":"after sex, trembling, cum overflow, sweat, steam"};
  const swap=t=>String(t||"").replace(/\ba faceless man's\b/g,"a muscular, dark-skinned faceless man's").replace(/\ba faceless man\b/g,"a muscular, dark-skinned faceless man")
    .replace(/\b(a|the) (standing|kneeling|lying) faceless man\b/g,"$1 muscular, dark-skinned $2 faceless man").replace(/\bthick, veiny penis\b/g,"huge, veiny, rock-hard cock").replace(/\bhis penis\b/g,"his veiny, rock-hard cock");
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const src=X.S.filter(st=>/^Academy Cut-out /.test(st.s));
  const out=src.map(st=>{const part=st.s.replace("Academy Cut-out ","");const R=ROUGH[part]||ROUGH.Positions,RT=ROUGHT[part]||ROUGHT.Positions;
    return {s:"Academy BLACKED "+part,v:st.v.map(v=>{const f=Object.assign({},v.f),r=Object.assign({},v.r);
      const sent=f["texts.0.s"]||"";
      let body=swap(f.scene).replace(" "+sent,"");
      const cut=body.indexOf(", transparent background");/* the prose ends where the tag list begins */
      const prose=body.replace(/\s+[a-z][^.]*$/,"");const tags=body.slice(prose.length).trim();
      f.scene=`${prose} ${R} ${sent} ${uniq([tags,MAN,RT,"fucked silly"].join(", "))}`;
      f.act=uniq(swap(f.act)+", interracial, rough sex");f.count="1girl, 1boy, hetero, faceless male, interracial, dark-skinned male";
      f["c1.expression"]=SILLY;r.must=MUST;
      return Object.assign({},v,{f,r})})}});
  /* group scenes: several muscular, dark-skinned faceless men */
  const W='{"name":"Nude","f":{},"m":{}}';
  const AROUSE={"c1.blushStyle":"heavy aroused blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const sfxLine=t=>`Small lewd sound effects reading "${t}" float around them.`;
  const GM=(name,n,body,tags,sfx,po)=>{const sent=sfxLine(sfx),cnt=`1girl, ${n}, gangbang, group sex, faceless male, interracial, dark-skinned male`;
    return{f:Object.assign({name,count:cnt,w1:W,w2:W,act:tags.split(",").slice(0,5).map(s=>s.trim()).join(", "),
        scene:`Against a transparent background, with no scenery and no furniture, ${body} ${sent} ${uniq([cnt,tags,"muscular male, large penis, veiny penis, erection, multiple penises, rough sex, motion lines, sweat, steam, fucked silly, transparent background, completely nude, nude, sound effects"].join(", "))}`,
        "c1.expression":SILLY,"c1.posture":po,"texts.0.k":"sfx","texts.0.st":"lewd","texts.0.t":sfx,"texts.0.who":"","texts.0.s":sent},AROUSE),
      r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:"far",must:MUST,"texts.n":1,txTags:["sound effects"]},
      fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  out.push({s:"Academy BLACKED Group",v:[
    GM("Spitroast","2boys","the woman is spitroasted between two muscular, dark-skinned faceless men, one pounding her pussy hard from behind while the other grips her hair and fucks her throat, both huge, veiny, rock-hard cocks buried deep, and she shudders between them, begging for more.","spitroast, doggystyle, irrumatio, hair pull, sex from behind, vaginal, deepthroat, saliva","plap plap","on all fours between them"),
    GM("Double penetration","2boys","the woman is sandwiched between two muscular, dark-skinned faceless men, one under her and one behind her, both huge, veiny, rock-hard cocks stretching her pussy and ass at once as they slam into her in rhythm.","double penetration, sandwiched, vaginal, anal, girl on top, sex from behind, deep penetration, trembling","plap plap","sandwiched between them"),
    GM("Airtight","3boys","the woman is filled completely by three muscular, dark-skinned faceless men, one in her pussy, one in her ass and one in her throat, held up and used hard from every side while she shakes with pleasure.","airtight, double penetration, irrumatio, vaginal, anal, deepthroat, saliva, tears","gluk gluk","held up between them"),
    GM("Lifted between them","2boys","the woman is lifted off her feet between two muscular, dark-skinned faceless men, her legs hooked over their arms, both huge, veiny, rock-hard cocks driving up into her pussy and ass while she clings to them.","suspended congress, double penetration, standing sex, carrying, legs held, vaginal, anal","thrust thrust","held in the air between them"),
    GM("Surrounded","multiple boys","the woman kneels at the center of a ring of muscular, dark-skinned faceless men, a huge, veiny, rock-hard cock in each hand and another in her mouth, the rest pressing in around her.","gangbang, kneeling, double handjob, fellatio, multiple penises, surrounded, penis on face","shlick shlick","kneeling in the middle of them"),
    GM("Riding and stroking","3boys","the woman rides one muscular, dark-skinned faceless man hard, bouncing on his huge, veiny cock, while she strokes two more rock-hard cocks, one in each hand.","cowgirl position, girl on top, double handjob, vaginal, bouncing breasts, multiple penises","plap plap","riding, a cock in each hand"),
    GM("Taking turns","multiple boys","the woman is folded into a mating press by one muscular, dark-skinned faceless man pounding her hard, while the others stand over her stroking their huge, veiny, rock-hard cocks, waiting their turn.","mating press, folded, legs up, deep penetration, vaginal, multiple penises, penis grab, waiting","pomf pomf","folded on her back, legs up"),
    GM("Double fellatio","2boys","the woman kneels between two muscular, dark-skinned faceless men, licking and sucking both huge, veiny, rock-hard cocks at once, cheeks bulging.","double fellatio, fellatio, kneeling, licking penis, multiple penises, saliva, cheek bulge","slurp slurp","kneeling between them"),
    GM("Bukkake","multiple boys","the woman kneels with her tongue out as a ring of muscular, dark-skinned faceless men finish over her face and breasts at once.","bukkake, cum on face, cum on breasts, facial, tongue out, kneeling, multiple penises, ejaculation","splurt","kneeling, tongue out"),
    GM("Used and overflowing","multiple boys","the woman lies spent and grinning among several muscular, dark-skinned faceless men, cum overflowing from her pussy and ass and covering her body, still twitching.","after sex, cum overflow, cum in pussy, cum in ass, cumdrip, cum on body, spread legs, on back, trembling, multiple penises","drip drip","lying spent on her back")]});
  /* v317: BLACKED Impregnation. The After dark Impregnation positions as transparent cut-outs: an x-ray inset of the
     creampie, a cross-section of her womb being fertilized, motion and action lines, ahegao with heart eyes, and four
     Text and sound items (a shouted line in veiny bold black lettering, a squiggly pink thought bubble, a big explosive
     sound effect, small lewd ones). No furniture, so nothing needs cutting out. */
  const IMPEX="ahegao, heart-shaped pupils, crossed eyes, rolling eyes, tongue out, drooling, moaning, heavy blush, tears of pleasure";
  const IMPT="x-ray, cross-section, internal cumshot, cum in pussy, impregnation, fertilization, sperm cell, ovum, uterus, cum overflow, ejaculation, deep penetration, motion lines, speed lines, heart, steam, sweat, trembling, pussy juice, speech bubble, thought bubble, english text, colored text, sound effects";
  const IM=(name,body,tags,po,say,think,big,lewd)=>{
    const tx=[["speech","shout","c1",say,"veiny, bold black",`She shouts "${say}" in a big, jagged speech bubble with bold letters, in veiny, bold black lettering.`],
      ["thought","cloud","c1",think,"squiggly pink",`She thinks "${think}" in a cloud-shaped thought bubble, in squiggly pink lettering.`],
      ["sfx","big","",big,"",`A big, bold sound effect reads "${big}".`],["sfx","lewd","",lewd,"",sfxLine(lewd)]];
    const f={name,count:"1girl, 1boy, hetero, faceless male, interracial, dark-skinned male",w1:W,w2:W,act:tags.split(",").slice(0,4).map(s=>s.trim()).join(", "),
      scene:`Against a transparent background, with no scenery and no furniture, ${body} Motion lines and action lines show how hard he is fucking her. An x-ray inset shows his cock buried inside her and thick cum flooding into her, and a cross-section of her womb shows his cum surging in and fertilizing her egg. ${tx.map(x=>x[5]).join(" ")} `
        +uniq(["1girl, 1boy, hetero",tags,MAN,IMPT,"fucked silly, transparent background"].join(", ")),
      "c1.expression":IMPEX,"c1.posture":po};
    tx.forEach(([k,st,who,t,c,s],i)=>{f[`texts.${i}.k`]=k;f[`texts.${i}.st`]=st;f[`texts.${i}.who`]=who;f[`texts.${i}.t`]=t;if(c)f[`texts.${i}.c`]=c;f[`texts.${i}.s`]=s});
    return{f:Object.assign(f,AROUSE),r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:"far",must:MUST,"texts.n":4,
      txTags:["speech bubble","thought bubble","english text","colored text","sound effects"]},fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  out.push({s:"Academy BLACKED Impregnation",v:[
    IM("Missionary","the woman lies on her back with her legs spread wide while a muscular, dark-skinned faceless man pins her down, his hands squeezing her breasts, pounding his huge, veiny, rock-hard cock into her to the hilt until he erupts deep inside her.","missionary, on back, spread legs, grabbing another's breast, sex, vaginal","lying on her back, legs spread wide","CUM INSIDE ME! BREED ME!","I'm getting pregnant... I'm really getting pregnant","BYURURURU","plap plap"),
    IM("Mating press","the woman is folded beneath a muscular, dark-skinned faceless man in a mating press, knees crushed to her shoulders, as he slams down into her with his whole weight and floods her womb.","mating press, folded, legs up, knees to chest, sex, vaginal","folded on her back, legs over his shoulders","DON'T PULL OUT! FILL ME UP!","His seed is pouring straight into my womb","DOPYU DOPYU","pomf pomf"),
    IM("Riding","the woman rides a muscular, dark-skinned faceless man lying beneath her, his hands dragging her hips down onto his huge, veiny cock as he bucks up and cums inside her.","cowgirl position, girl on top, straddling, hands on another's hips, bouncing breasts, sex, vaginal","straddling him, bouncing","I'M TAKING ALL OF IT! EVERY DROP!","I want his baby so badly","BYUBYURU","plap plap"),
    IM("From behind","the woman is on all fours as a muscular, dark-skinned faceless man pulls her back by both arms and pounds her from behind, buried to the hilt as he pumps her full.","doggystyle, sex from behind, all fours, arm grab, arched back, sex, vaginal","on all fours, arms pulled back","BREED ME! MAKE ME A MOTHER!","Knock me up, knock me up, knock me up","DOKU DOKU","pan pan"),
    IM("Prone bone","the woman lies flat on her stomach with her ass raised as a muscular, dark-skinned faceless man presses her down and drives into her, cumming deep.","prone bone, lying on stomach, ass up, sex from behind, pinned, sex, vaginal","lying face down, hips raised","DEEPER! CUM DEEPER!","I can feel it filling me","BYURU BYURU","pan pan"),
    IM("Held up","a muscular, dark-skinned faceless man lifts the woman off her feet, her legs locked around his waist and her arms around his neck, thrusting up into her as he unloads inside her.","suspended congress, carrying, legs around waist, arms around neck, standing sex, sex, vaginal","lifted in his arms, legs wrapped around him","GIVE ME YOUR BABY!","I'm going to be so full of him","DOPYU","pan pan"),
    IM("Legs on his shoulders","the woman lies back with her legs resting on the shoulders of a muscular, dark-skinned faceless man as he grips her thighs and plunges into her as deep as he can go, cumming against her cervix.","legs over shoulders, leg grab, missionary, deep penetration, sex, vaginal","on her back, legs up on his shoulders","RIGHT THERE! CUM RIGHT THERE!","He's pressing right against my womb","BYURURU","plap plap"),
    IM("Spooning","the woman lies on her side, held tight from behind by a muscular, dark-skinned faceless man, one leg lifted in his hand, as he grinds deep into her and cums inside her.","spooning, lying on side, leg lift, sex from behind, sex, vaginal","lying on her side, one leg lifted","KEEP IT INSIDE ME...","Stay in me until it takes","DOKUN","nuchu nuchu"),
    IM("Full nelson","a muscular, dark-skinned faceless man holds the woman up in a full nelson, her legs spread wide in the air, bouncing her on his huge, veiny cock as he cums deep inside her.","full nelson, held up, legs up, spread legs, standing sex, sex, vaginal","held up in a full nelson, legs spread wide","I'M YOURS! BREED ME!","Everyone will see I'm his","BYURURURU","plap plap"),
    IM("Reverse cowgirl","the woman rides a muscular, dark-skinned faceless man reverse cowgirl, looking back over her shoulder, grinding down as he grabs her waist and cums up into her.","reverse cowgirl position, girl on top, looking back, sex, vaginal","riding facing away, looking back over her shoulder","CUM! CUM IN ME NOW!","I want to feel him fill me","DOPYU DOPYU","plap plap"),
    IM("Lotus","the woman sits in the lap of a muscular, dark-skinned faceless man sitting cross-legged, her arms and legs wrapped tight around him, grinding down until he cums inside her.","lotus position, sitting on lap, legs around waist, arms around neck, hug, sex, vaginal","sitting in his lap, wrapped around him","I LOVE IT! GIVE ME EVERYTHING!","I don't ever want him to stop","DOKU DOKU","nuchu nuchu"),
    IM("Piledriver","the woman is rolled onto her shoulders with her legs over her head as a muscular, dark-skinned faceless man drives straight down into her, cumming so deep it overflows.","piledriver (sex), legs over head, folded, from above, sex, vaginal","rolled onto her shoulders, legs over her head","SO MUCH! IT'S ALL GOING IN!","There's no way I'm not pregnant now","BYURURURURU","pan pan")]});
  /* v319: BLACKED Group Impregnation. Several muscular, dark-skinned faceless men breed her at once or in turn, as
     transparent cut-outs, with the same x-ray inset, womb cross-section and four Text and sound items. */
  const IG=(name,n,body,tags,po,say,think,big,lewd)=>{const v=IM(name,body,tags,po,say,think,big,lewd);
    const cnt=`1girl, ${n}, gangbang, group sex, faceless male, interracial, dark-skinned male`;
    v.f.count=cnt;
    v.f.scene=v.f.scene.replace("Motion lines and action lines show how hard he is fucking her. An x-ray inset shows his cock buried inside her and thick cum flooding into her, and a cross-section of her womb shows his cum surging in and fertilizing her egg.",
      "Motion lines and action lines show how hard they are fucking her. An x-ray inset shows a cock buried inside her and thick cum flooding into her, and a cross-section of her womb shows their cum surging in and fertilizing her egg.")
      .replace("1girl, 1boy, hetero, ",cnt+", multiple penises, ");
    return v};
  out.push({s:"Academy BLACKED Group Impregnation",v:[
    IG("Spitroast breeding","2boys","the woman is spitroasted between two muscular, dark-skinned faceless men, one fucking her throat while the other pounds her from behind and erupts deep inside her.","spitroast, doggystyle, irrumatio, sex from behind, vaginal, deepthroat, saliva","on all fours between them","MMMPH! BREED ME!","Fill my womb while I choke on him","BYURURURU","gluk gluk"),
    IG("Double creampie","2boys","the woman is sandwiched between two muscular, dark-skinned faceless men, one under her and one behind her, both huge, veiny cocks stretching her and both cumming inside her at once.","double penetration, sandwiched, girl on top, sex from behind, vaginal, anal, cum in ass","sandwiched between them","BOTH OF YOU! FILL ME UP!","Two loads at once... I'm definitely pregnant","DOPYU DOPYU","pan pan"),
    IG("Breeding line","multiple boys","the woman lies on her back with her legs spread while a line of muscular, dark-skinned faceless men take turns breeding her, the latest erupting inside her as the last load still overflows.","missionary, on back, spread legs, taking turns, cumdrip, waiting","lying on her back, legs spread wide","NEXT! WHO'S NEXT?!","One of them is going to knock me up","BYURURU","plap plap"),
    IG("Airtight breeding","3boys","the woman is filled by three muscular, dark-skinned faceless men at once, in her pussy, her ass and her throat, all three cumming inside her together.","airtight, double penetration, irrumatio, vaginal, anal, deepthroat, cum in ass, cum in mouth","held up between them","MMMH! ALL OF IT!","Every hole, every drop","DOKU DOKU DOKU","gluk gluk"),
    IG("Lifted and bred","2boys","the woman is lifted off her feet between two muscular, dark-skinned faceless men, her legs hooked over their arms, both driving up into her and unloading deep inside her.","suspended congress, double penetration, standing sex, carrying, legs held, vaginal, anal","held in the air between them","DON'T STOP! KEEP CUMMING!","I can't even touch the ground","BYUBYURU","plap plap")]});
  X.S.push(...out);
  /* its own category on every girl's shelf (the archive reads ACAD.RX_CATS when it draws, so this lands after part-18) */
  const LABELS=out.map(o=>o.s.replace(/^Academy /,""));
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="BLACKED"))ACAD.RX_CATS.push(["BLACKED",LABELS])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
