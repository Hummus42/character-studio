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
  X.S.push(...out);
  /* its own category on every girl's shelf (the archive reads ACAD.RX_CATS when it draws, so this lands after part-18) */
  const LABELS=out.map(o=>o.s.replace(/^Academy /,""));
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="BLACKED"))ACAD.RX_CATS.push(["BLACKED",LABELS])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
