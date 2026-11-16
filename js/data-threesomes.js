/* ---- v287: threesome positions for the Scene Archive (every girl's shelf). One image each, no panels, no captions or
   speech: just the scene and a Danbooru tag line (each tag checked against the Danbooru tag list), so the image
   generator spends its attention on the bodies and the position. FFM is her and her best friend with a faceless man;
   FMM is her with her boyfriend and a second, faceless man. Everyone is nude (the scene outfits are empty). Merged into
   the archive by part-13 (v271 block), on every girl's shelf ("g":"ALL"). All adults; consensual throughout. ---- */
window.ARCH_EXTRA=(function(){
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const W='{"name":"Nude","f":{},"m":{}}';
  const R=penis=>({compact:false,dir:"mutual",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis,must:MUST});
  const V=(q,count,penis,name,scene,ex1,po1,ex2)=>({f:Object.assign({scene,count,name,w1:W,w2:W,act:scene.split(/\.\s+/).pop().split(",").slice(0,6).join(","),
      "c1.expression":ex1,"c1.posture":po1,"c1.blushStyle":"heavy aroused blush","c1.skinFinish":"flushed, sweat-glistening skin","pc.expression":ex2},q==="bestfriend"?{"pc.age":"woman"}:{}),
    r:R(penis),fv:{},sl:[],g:"ALL",m:[],q,qv:null,p:[]});
  const FFM="2girls, 1boy, ffm threesome, hetero, faceless male",FMM="1girl, 2boys, mmf threesome, hetero";
  const ffm=(...a)=>V("bestfriend",FFM,false,...a),fmm=(...a)=>V("boyfriend",FMM,true,...a);
  return{S:[
  {s:"Academy FFM Positions",v:[
    ffm("Cowgirl and face-sitting","On a wide bed in {@room}, the woman rides a faceless man in the cowgirl position while {partner} sits on his face, the two women facing each other, kissing and squeezing each other's breasts. ffm threesome, threesome, cowgirl position, girl on top, sitting on face, kiss, grabbing another's breast, sex, vaginal, hetero, faceless male, completely nude, on bed",
      "blissful, flushed, eyes half-closed","straddling him, hips grinding","moaning into the kiss"),
    ffm("Sharing him","In {@room}, the woman and {partner} kneel side by side in front of a standing faceless man, sharing his penis, licking it from both sides and looking up at the viewer. ffm threesome, cooperative fellatio, fellatio, licking penis, kneeling, side-by-side, pov, looking at viewer, tongue out, faceless male, completely nude",
      "eager, flushed, tongue out","kneeling, hands on her thighs","playful, tongue out"),
    ffm("Stacked","On a bed in {@room}, {partner} lies on her back and the woman lies on top of her, face to face and kissing, their legs spread, while a faceless man kneels behind them and takes the woman from behind. ffm threesome, girl sandwich, lying on person, sex from behind, kiss, yuri, spread legs, sex, vaginal, faceless male, completely nude, on bed",
      "dazed, kissing deeply","lying on top of another woman, hips raised","flushed, kissing back"),
    ffm("Doggystyle and licking","On a bed in {@room}, the woman is on all fours with her face between {partner}'s spread thighs, licking her, while a faceless man takes the woman doggystyle from behind. ffm threesome, doggystyle, sex from behind, all fours, cunnilingus, spread legs, sex, vaginal, faceless male, completely nude, on bed",
      "eyes closed, moaning","on all fours, back arched","head thrown back, gasping"),
    ffm("Sharing with her breasts","In {@room}, the woman and {partner} kneel face to face and press their breasts together around a faceless man's penis, smiling up at the viewer. ffm threesome, cooperative paizuri, paizuri, kneeling, pov, looking at viewer, faceless male, completely nude",
      "sultry smile up at the viewer","kneeling, squeezing her breasts together","teasing grin"),
    ffm("Side by side","On a bed in {@room}, the woman and {partner} are on all fours side by side, hips raised and holding hands, while a faceless man takes the woman from behind. ffm threesome, doggystyle, all fours, side-by-side, holding hands, sex from behind, looking back, sex, vaginal, faceless male, completely nude, on bed",
      "looking back, mouth open","on all fours, hips raised","flushed, watching her"),
    ffm("Reverse cowgirl and breasts","On a bed in {@room}, the woman rides a faceless man in the reverse cowgirl position while {partner} kneels in front of her, sucking on her breast. ffm threesome, reverse cowgirl position, breast sucking, girl on top, spread legs, sex, vaginal, faceless male, completely nude, on bed",
      "head tipped back, blissful","riding him, leaning back","eyes closed, sucking")]},
  {s:"Academy FMM Positions",v:[
    fmm("Spitroast","On a bed in {@room}, the woman is on all fours between two men in a spitroast: {partner} takes her doggystyle from behind while she sucks a second, faceless man's penis in front of her. mmf threesome, spitroast, doggystyle, sex from behind, fellatio, all fours, sex, vaginal, group sex, 2boys, faceless male, completely nude, on bed",
      "eyes watering, mouth full","on all fours between them","focused, gripping her hips"),
    fmm("Double penetration","On a bed in {@room}, the woman rides {partner} in the cowgirl position while a second, faceless man takes her anally from behind, sandwiched between them. mmf threesome, double penetration, sandwiched, cowgirl position, anal, vaginal, sex, group sex, faceless male, completely nude, on bed",
      "overwhelmed ahegao, tongue out","leaning forward onto his chest, sandwiched","holding her close"),
    fmm("Both hands and her mouth","In {@room}, the woman kneels between two standing men, stroking {partner} with one hand and sucking a second, faceless man's penis. mmf threesome, double handjob, handjob, fellatio, kneeling, group sex, faceless male, completely nude",
      "eyes up, cheeks hollowed","kneeling between them","watching her, smiling"),
    fmm("Over the edge of the bed","On a bed in {@room}, the woman lies on her back with her head tipped over the edge, {partner} between her legs in the missionary position while a second, faceless man stands at her head and she sucks his penis. mmf threesome, missionary, on back, fellatio, spread legs, sex, vaginal, group sex, faceless male, completely nude, on bed",
      "dazed, mouth full","on her back, head over the edge of the bed","intent, thrusting"),
    fmm("Reverse cowgirl and her mouth","On a bed in {@room}, the woman rides {partner} in the reverse cowgirl position while sucking the penis of a second, faceless man standing beside the bed. mmf threesome, reverse cowgirl position, fellatio, girl on top, sex, vaginal, group sex, faceless male, completely nude, on bed",
      "flushed, eyes half-closed","riding him, turned to the side","gripping her waist"),
    fmm("Standing sandwich","In {@room}, the woman is lifted between two standing men, her legs wrapped around {partner} in suspended congress while a second, faceless man takes her anally from behind. mmf threesome, suspended congress, standing sex, double penetration, sandwiched, anal, sex, group sex, faceless male, completely nude",
      "clinging on, crying out in pleasure","lifted, legs wrapped around him","holding her up, kissing her neck"),
    fmm("Double finish","In {@room}, the woman kneels between {partner} and a second, faceless man, smiling with her tongue out as they both finish on her face. mmf threesome, facial, bukkake, cum on body, tongue out, kneeling, after sex, group sex, faceless male, completely nude",
      "proud, messy smile, tongue out","kneeling between them","satisfied grin")]}]};
})();
