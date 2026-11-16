/* ---- v290: Cut-outs. Detailed sex scenes on a transparent background, for putting the girls onto any background
   afterwards. Each one: the girl and a faceless man (the studio's own faceless partner), both nude, no furniture or
   props that would need cutting out, one image, no speech, captions or narration; only small lewd sound effects (as
   a Text and sound item, so they can be edited or removed in the Scene step). Danbooru tags checked against the tag
   list (positions and acts with real posts; "creampie" -> cum in pussy, "thighjob" -> thigh sex, hotdogging -> buttjob).
   On every girl's shelf, in their own category. All adults; consensual. Added to ARCH_EXTRA (merged by part-13). ---- */
(function(){
  const X=window.ARCH_EXTRA=window.ARCH_EXTRA||{S:[]};
  const MUST="an anime style with high detail, transparent background, and particular emphasis on highly detailed skin, hair, eyes and bodies";
  const W='{"name":"Nude","f":{},"m":{}}';
  const COMMON="transparent background, hetero, faceless male, completely nude, nude, sound effects";
  const AROUSE={"c1.blushStyle":"heavy aroused blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const sfxLine=t=>`Small lewd sound effects reading "${t}" float around them.`;
  /* name, what happens, the act's tags, sound effect, her expression, her pose, faceless view ("far" or "pov") */
  const V=(name,body,tags,sfx,ex,po,gm,dir)=>{const sent=sfxLine(sfx);
    return{f:Object.assign({name,count:"1girl, 1boy, hetero, faceless male",w1:W,w2:W,act:tags.split(",").slice(0,5).map(s=>s.trim()).join(", "),
        scene:`Against a transparent background, with no scenery and no furniture, ${body} ${sent} ${tags}, ${COMMON}`,
        "c1.expression":ex,"c1.posture":po,"texts.0.k":"sfx","texts.0.st":"lewd","texts.0.t":sfx,"texts.0.who":"","texts.0.s":sent},AROUSE),
      r:{compact:false,dir:dir||"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:gm||"far",must:MUST,"texts.n":1,txTags:["sound effects"]},
      fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  const set=(s,v)=>X.S.push({s:"Academy "+s,v});
  set("Cut-out Positions",[
    V("Missionary","the woman lies back with her legs spread wide while a faceless man kneels between them and thrusts his thick, veiny penis deep into her vagina, her breasts bouncing.","missionary, on back, spread legs, sex, vaginal, penis, veiny penis, bouncing breasts, pussy juice, motion lines, sweat","thrust thrust","blissful, flushed, mouth open","lying on her back, legs spread wide"),
    V("Mating press","the woman lies folded on her back with her knees pushed up to her shoulders while a faceless man presses down on her in a mating press, his penis buried deep in her vagina.","mating press, folded, legs up, knees to chest, sex, vaginal, deep penetration, penis, testicles, pussy juice, trembling, ahegao, sweat","plap plap","fucked-silly ahegao, tongue out","folded on her back, legs over his shoulders"),
    V("Legs over head","the woman is rolled onto her shoulders with her legs over her head while a faceless man drives down into her from above.","piledriver (sex), legs over head, folded, sex, vaginal, from above, penis, pussy juice, sweat, trembling","pound pound","eyes rolled up, mouth open","rolled onto her shoulders, legs over her head"),
    V("Cowgirl","the woman straddles a faceless man lying beneath her, riding his penis in the cowgirl position, her breasts bouncing as she grinds down.","cowgirl position, girl on top, straddling, sex, vaginal, penis, bouncing breasts, pussy juice, motion lines, sweat","bounce bounce","eager, flushed grin","straddling him, hands on his chest","far","ab"),
    V("Reverse cowgirl","the woman rides a faceless man in the reverse cowgirl position, facing away from him, leaning back with his penis deep inside her.","reverse cowgirl position, girl on top, straddling, sex, vaginal, penis, spread legs, pussy juice, arched back, sweat","slap slap","head tipped back, moaning","riding him facing away, leaning back","far","ab"),
    V("Squatting cowgirl","the woman squats over a faceless man with her knees wide, bouncing on his penis in the squatting cowgirl position.","squatting cowgirl position, squatting, spread legs, girl on top, sex, vaginal, penis, testicles, pussy juice, motion lines","plap plap","biting her lip, eyes half-closed","squatting over him, knees wide","far","ab"),
    V("Doggystyle","the woman is on all fours with her back arched while a faceless man takes her doggystyle from behind, gripping her hips.","doggystyle, sex from behind, all fours, arched back, hands on another's hips, sex, vaginal, penis, ass, hanging breasts, motion lines, sweat","slap slap","looking back over her shoulder, mouth open","on all fours, back arched"),
    V("Prone bone","the woman lies flat on her stomach with her hips slightly raised while a faceless man lies over her, thrusting into her from behind in a prone bone.","prone bone, on stomach, lying, sex from behind, sex, vaginal, penis, ass, trembling, sweat","thrust thrust","face turned to the side, drooling","lying flat on her stomach"),
    V("Spooning","the woman lies on her side with her top leg lifted while a faceless man spoons her from behind, sliding his penis into her.","spooning, on side, leg lift, sex from behind, sex, vaginal, penis, hug, sweat","squish","soft, blissful moan","lying on her side, top leg raised"),
    V("Standing from behind","the woman stands bent forward at the waist while a faceless man takes her from behind, his hands on her hips.","standing sex, bent over, sex from behind, hands on another's hips, sex, vaginal, penis, ass, hanging breasts, motion lines","plap plap","looking back, flushed","standing, bent forward"),
    V("Full nelson","a faceless man lifts the woman from behind in a full nelson, her legs spread high and her pussy fully exposed as he thrusts up into her.","full nelson, lifting person, spread legs, sex from behind, sex, vaginal, penis, testicles, pussy juice, ahegao, trembling","thrust thrust","ahegao, tongue out","held in a full nelson, legs spread high"),
    V("Suspended congress","a faceless man holds the woman up in his arms, her legs wrapped around his waist and her arms around his neck, as he thrusts up into her.","suspended congress, standing sex, carrying, leg lock, arms around neck, sex, vaginal, penis, hug, sweat","thrust thrust","clinging to him, moaning","held up, legs around his waist","far","mutual"),
    V("Reverse suspended congress","a faceless man holds the woman up from behind by her thighs, her legs spread wide and facing the viewer, as he thrusts up into her.","reverse suspended congress, carrying, spread legs, sex from behind, sex, vaginal, penis, pussy juice, looking at viewer","plap plap","dazed, looking at the viewer","held up from behind, legs spread"),
    V("Standing split","the woman stands on one leg with the other raised high against a faceless man's shoulder while he thrusts into her.","standing split, standing sex, leg lift, sex, vaginal, penis, spread legs, pussy juice, sweat","thrust","flushed, gasping","standing on one leg, the other raised high"),
    V("Amazon","the woman straddles a faceless man who lies with his knees pulled back, taking him in the amazon position, in control.","amazon position, girl on top, straddling, sex, vaginal, penis, smug, sweat","pomf pomf","smug, dominant smile","on top, in control","far","ab"),
    V("On his lap","the woman sits on a faceless man's lap facing him, legs wrapped around him, rocking her hips as they kiss.","upright straddle, sitting on lap, leg lock, kiss, sex, vaginal, penis, hug, breast press","squish squish","kissing, eyes closed","on his lap, facing him","far","mutual"),
    V("On his lap, facing away","the woman sits on a faceless man's lap facing away from him with her legs spread, his hands on her breasts as she rides him.","reverse upright straddle, sitting on lap, spread legs, grabbing another's breast, sex, vaginal, penis, pussy juice, looking at viewer","bounce","flushed, looking at the viewer","on his lap, facing away, legs spread"),
    V("Face down, ass up","the woman kneels with her face down and her ass high in the air while a faceless man takes her from behind.","top-down bottom-up, sex from behind, ass, arched back, sex, vaginal, penis, motion lines, drooling","plap plap","cheek pressed down, drooling","face down, ass up")]);
  set("Cut-out Oral",[
    V("Fellatio","the woman kneels in front of a standing faceless man and sucks his penis, looking up at the viewer.","fellatio, kneeling, penis, saliva, looking at viewer, pov, hand on another's head","slurp slurp","eyes up, cheeks hollowed","kneeling","pov","ab"),
    V("Deepthroat","the woman kneels and takes a faceless man's penis all the way down her throat, eyes watering.","deepthroat, fellatio, kneeling, penis, saliva, tears, drooling, hand on another's head","gulp","eyes watering, throat full","kneeling","pov","ab"),
    V("Licking","the woman licks up the length of a faceless man's penis resting on her face, tongue out, smiling.","licking penis, penis on face, tongue out, saliva, penis, testicles, looking at viewer","lick lick","playful, tongue out","kneeling close","pov","ab"),
    V("Balls","the woman kneels low and sucks a faceless man's testicles while stroking his penis.","testicle sucking, handjob, penis, testicles, saliva, kneeling","slurp","eyes closed, devoted","kneeling low","pov","ab"),
    V("Cunnilingus","the woman lies back with her legs spread over a faceless man's shoulders while he licks her pussy.","cunnilingus, spread legs, on back, pussy, pussy juice, trembling, arched back, toe scrunch","lick lick","head thrown back, moaning","lying back, legs over his shoulders"),
    V("Sitting on his face","the woman sits on a faceless man's face, grinding her pussy against his mouth.","sitting on face, girl on top, cunnilingus, grinding, pussy juice, grabbing own breast","squish","biting her lip, eyes rolling","sitting on his face, grinding","far","ab"),
    V("69","the woman lies on top of a faceless man in a 69, sucking his penis while he licks her pussy.","69, fellatio, cunnilingus, girl on top, penis, pussy, saliva, pussy juice","slurp slurp","mouth full, flushed","on top of him, head to toe","far","mutual"),
    V("Rimming","the woman lies on her stomach with her hips raised while a faceless man licks her ass.","anilingus, on stomach, ass, anus, trembling, blush","lick","flustered, burning blush","lying on her stomach, hips raised")]);
  set("Cut-out Hands and Body",[
    V("Handjob","the woman kneels and strokes a faceless man's penis with one hand, precum glistening.","handjob, penis, precum, kneeling, looking at viewer, pov","fap fap","teasing smile","kneeling","pov","ab"),
    V("Two hands","the woman strokes a faceless man's penis with both hands, leaning close.","two-handed handjob, handjob, penis, testicles, precum, kneeling","fap fap","focused, eager","kneeling close","pov","ab"),
    V("Paizuri","the woman squeezes her breasts around a faceless man's penis and slides them up and down.","paizuri, breasts squeezed together, penis, precum, sweat, looking at viewer","squish squish","sultry smile","kneeling, breasts pressed together","pov","ab"),
    V("Footjob","the woman sits back and strokes a faceless man's penis between her soles.","footjob, feet, soles, toes, penis, sitting, spread legs","rub rub","smug, teasing","sitting back, feet forward","pov","ab"),
    V("Thighs","the woman lies on her side with a faceless man's penis sliding between her pressed thighs.","thigh sex, on side, penis, thighs, precum, blush","squish","shy, flushed","lying on her side, thighs pressed together"),
    V("Hotdogging","a faceless man slides his penis between the cheeks of the woman's ass as she bends forward.","buttjob, ass, penis, bent over, from behind, looking back","slide slide","looking back, teasing","bent forward"),
    V("Armpit","the woman raises one arm while a faceless man thrusts his penis into her armpit.","armpit sex, armpits, arm up, penis, sweat, blush","squish","embarrassed, flushed","one arm raised"),
    V("Fingering","the woman lies back with her legs spread while a faceless man fingers her dripping pussy.","fingering, spread legs, pussy, pussy juice, on back, trembling, arched back","squelch","gasping, back arched","lying back, legs spread"),
    V("Grinding","the woman straddles a faceless man and grinds her bare pussy along the length of his penis.","grinding, straddling, girl on top, penis, pussy, pussy juice, imminent penetration","rub rub","teasing, flushed","straddling him","far","ab")]);
  set("Cut-out Anal",[
    V("Anal from behind","the woman is on all fours while a faceless man takes her ass from behind, spreading her cheeks.","anal, doggystyle, sex from behind, all fours, ass, penis, arched back, trembling","thrust thrust","eyes squeezed shut, mouth open","on all fours"),
    V("Anal, riding","the woman rides a faceless man's penis in her ass in the reverse cowgirl position, legs spread to the viewer.","anal, reverse cowgirl position, girl on top, spread legs, penis, pussy, pussy juice","bounce","dazed, overwhelmed","riding him facing away","far","ab"),
    V("Anal mating press","the woman lies folded on her back while a faceless man presses into her ass in a mating press.","anal, mating press, folded, legs up, penis, testicles, ahegao, trembling","plap plap","ahegao, tongue out","folded on her back"),
    V("Anal prone","the woman lies flat on her stomach while a faceless man thrusts into her ass from above.","anal, prone bone, on stomach, sex from behind, penis, ass, drooling","thrust","face turned aside, drooling","lying flat on her stomach"),
    V("Anal spooning","the woman lies on her side with her leg lifted while a faceless man slides into her ass from behind.","anal, spooning, on side, leg lift, penis, ass, blush","squish","soft, surprised moan","lying on her side, leg lifted"),
    V("Anal fingering","the woman lies on her back with her legs up while a faceless man works a finger into her ass.","anal fingering, legs up, on back, anus, pussy juice, trembling, blush","squelch","flustered, gasping","lying back, legs up")]);
  set("Cut-out Finish",[
    V("Cum inside","the woman lies back, spent, as cum overflows from her pussy after a faceless man pulls out.","cum in pussy, cumdrip, cum overflow, after sex, spread legs, pussy, on back, trembling, heavy breathing","drip drip","spent, glowing","lying back, legs open"),
    V("Facial","the woman kneels with her tongue out as a faceless man finishes across her face.","facial, ejaculation, cum on hair, tongue out, kneeling, penis, closed eyes","splurt","eyes closed, tongue out","kneeling","pov","ab"),
    V("On her breasts","the woman holds her breasts up as a faceless man finishes across them.","cum on breasts, ejaculation, cum on body, penis, kneeling","splurt","pleased, flushed","kneeling, breasts lifted","pov","ab"),
    V("In her mouth","the woman kneels with her mouth open and tongue out, cum pooling on her tongue.","cum in mouth, cum on tongue, tongue out, open mouth, cum string, kneeling, looking at viewer","gulp","mouth open, tongue out","kneeling","pov","ab"),
    V("On her ass","the woman looks back over her shoulder as a faceless man finishes across her ass.","cum on ass, ejaculation, ass, looking back, all fours, penis","splurt","looking back, smug","on all fours"),
    V("On her stomach","the woman lies back as a faceless man pulls out and finishes across her stomach.","cum on stomach, ejaculation, cum on body, on back, spread legs, penis, heavy breathing","splurt","breathless, flushed","lying back"),
    V("Afterglow","the woman lies spent on her back, covered in sweat and cum, chest heaving.","after sex, cum on body, cumdrip, sweat, heavy breathing, on back, spread legs, steam","pant pant","dazed, blissful","lying spent on her back")]);
  /* v292: the same 48 with the Player Character as her partner (his own look, nude), on every girl's shelf in their own
     category. The faceless man becomes {partner} (him); "faceless male", "pov" and the head-out-of-frame setting go. */
  const PC=X.S.filter(st=>/^Academy Cut-out /.test(st.s)).map(st=>({s:st.s.replace("Academy Cut-out ","Academy PC Cut-out "),v:st.v.map(v=>{
    const f=Object.assign({},v.f),r=Object.assign({},v.r);
    const swap=t=>String(t||"").replace(/\ba faceless man's\b/g,"{partner}'s").replace(/\ba faceless man\b/g,"{partner}").replace(/\bthe faceless man\b/g,"{partner}").replace(/\b(?:a|the) (?:standing |kneeling |lying )faceless man('s)?\b/g,(m,s)=>"{partner}"+(s||""))
      .replace(/,\s*faceless male\b/g,"").replace(/\bfaceless male,\s*/g,"").replace(/,\s*pov\b/g,"").replace(/\bpov,\s*/g,"");
    f.scene=swap(f.scene);f.act=swap(f.act);f.count="1girl, 1boy, hetero";
    /* v293: her moaning pleasure and his passion, as the scene's expression presets (changeable in the Scene step) */
    f.ex1="blush, half-closed eyes, open mouth, moaning, heavy breathing, sweat";r.ex1k="pleasure";
    f.ex2="half-closed eyes, eye contact, heavy breathing, sweat, light blush, parted lips, furrowed brow";r.ex2k="m_passion";
    delete r.gm;r.dir=r.dir||"ba";
    return Object.assign({},v,{f,r,q:"none",p:"PC"})})}));
  X.S.push(...PC);
})();
