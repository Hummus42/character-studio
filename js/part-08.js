/* ---- v142 (v151: Salmon and Crow): "Academy Nude Photoshoot". One nude studio shoot per girl (house order), each on its own themed set,
   in very sexy poses. It is an Academy set (Adult, after Boudoir) and works alone: each entry opens as a solo shot
   ("1girl, solo") with no partner; pick a partner in the Scene tab and the same shoot becomes a two-person scene
   (pair.scene, "2girls" or "1girl, 1boy"). The studio itself (softboxes, flash, backdrop) is also in the entry's
   own prompt (out.must), so the Character prompt tab works for a single image too. Penguin's snow-globe set is the centrepiece. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","reclining in a giant clam shell prop, one leg raised, pearls draped over her breasts","Explicit (adult)");
  const G="Explicit (adult)";
  START.item("waistAccessory","thin gold body chain draped over the hips","LS","boudoir,glam");
  START.item("neckAccessory","thin satin ribbon tied at the throat","CUS","boudoir,sweet");
  const opt=(f,list)=>list.forEach(v=>START.option(f,v,G));
  /* v151: Salmon and Crow */
  START.option("posture","lying back in a giant nest of glittering trinkets, legs raised in a wide V",G);
  opt("expression",["shy, blushing peek through her fingers","sweet, giggly smile with her tongue out","haughty, smoldering glare over her shoulder",
    "serene, half-lidded look","cheerful wink with the tip of her tongue out","serene, sultry smile"]);
  opt("posture",["sitting on a tall stool with her legs spread in a wide V, toes pointed","kneeling on a fur rug, squeezing her breasts together",
    "reclining on a chaise with one leg hooked over the armrest","kneeling on all fours on a satin cube, hips raised, looking back",
    "squatting low on her heels with her knees spread wide","lying on her back with her legs raised in a wide V, toes pointed",
    "lounging on a throne with one leg over the armrest","lying on her side with her top leg raised high",
    "kneeling in shallow water with her knees spread and her back arched","kneeling with her knees spread wide, pushing her breasts together",
    "bending over and looking back through her legs","standing with one foot up on a pedestal, an arm behind her head",
    "standing on one leg, the other knee raised high and open"]);
  opt("bodyMarkings",["golden honey drips over her breasts and stomach","snowflakes melt on her steaming, rosy skin"]);
  const PH={blushStyle:"flushed cheeks and chest",skinFinish:"glistening oiled skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"};
  const STUDIO="photo shoot, studio, studio lighting, softbox, light stand, camera flash, backdrop, posing, completely nude, looking at viewer";
  /* [house, name, set (for the studio line), entry] */
  const SH=[
["griffin","Gold stool","a deep red velvet backdrop with gold trim and a tall gold stool",{ex:"shy, blushing peek through her fingers",
  pose:"sitting on a tall stool with her legs spread in a wide V, toes pointed",w1:{waistAccessory:["thin gold body chain draped over the hips","@metal"]},act:"holding legs open, neck kiss",
  solo:`The woman sits on the tall gold stool completely nude with her legs spread wide in a V and her toes pointed like a dancer, leaning back on one hand, her other hand half covering her blushing face as she peeks shyly at the camera through her fingers, her pussy fully on display.`,
  duo:`The woman sits on the tall gold stool completely nude with her legs spread wide in a V while {partner} stands behind her, holding her knees apart for the camera and kissing her neck; the woman peeks shyly at the camera through her fingers, blushing hard, her pussy fully on display.`,
  tags:"spread legs, sitting, stool, pointed toes, covering face, peeking through fingers, shy, blush, pussy, red background, gold"}],
["badger","Honey","a honey-gold backdrop, a yellow fur rug and a big glass honey pot with a dipper",{ex:"sweet, giggly smile with her tongue out",
  pose:"kneeling on a fur rug, squeezing her breasts together",c1:{bodyMarkings:"golden honey drips over her breasts and stomach"},w1:{neckAccessory:["heart pendant necklace","@metal"]},act:"licking, breast squeeze",
  solo:`The woman kneels on the fur rug completely nude with her knees parted, squeezing her breasts together with both arms as thick golden honey drizzles from the dipper over her nipples and runs down her cleavage and stomach; she sticks out her tongue to catch a drop with a sweet, giggly smile at the camera.`,
  duo:`{Partner} kneels behind the woman, drizzling golden honey over her breasts from the dipper and licking it from her nipple, while the woman squeezes her breasts together with her knees parted and smiles sweetly at the camera with her tongue out.`,
  tags:"kneeling, breast squeeze, honey, dripping, tongue out, smile, fur rug, yellow background"}],
["raven","Starlit chaise","a midnight-blue backdrop scattered with projected stars and a velvet chaise beside a stack of old books",{ex:"half-lidded sultry gaze",
  pose:"reclining on a chaise with one leg hooked over the armrest",w1:{eyewear:["round glasses","@metal"]},act:"fingering, spread pussy, shoulder kiss",
  solo:`The woman reclines on the chaise completely nude with one leg hooked over the armrest and the other stretched long, her legs spread, one hand behind her head and the other spreading her pussy open with two fingers, gazing at the camera through half-lidded eyes over a pair of round glasses.`,
  duo:`The woman reclines on the chaise completely nude with one leg hooked over the armrest while {partner} lies against her side, spreading the woman's pussy open with two fingers for the camera and kissing her shoulder; the woman gazes at the camera through half-lidded eyes over a pair of round glasses.`,
  tags:"reclining, chaise longue, leg over armrest, spread legs, spread pussy, glasses, half-closed eyes, stars, blue background, book"}],
["serpent","Emerald satin","an emerald satin backdrop and a black satin cube",{ex:"haughty, smoldering glare over her shoulder",
  pose:"kneeling on all fours on a satin cube, hips raised, looking back",w1:{earAccessory:["large hoop earrings","@metal"]},act:"spread ass, ass grab",
  solo:`The woman kneels on all fours on the black satin cube completely nude, her back deeply arched and her ass raised high toward the camera, one hand reaching back to spread her cheeks, and she looks back over her shoulder with a haughty, smoldering glare.`,
  duo:`The woman kneels on all fours on the black satin cube completely nude, her back deeply arched and her ass raised toward the camera, while {partner} kneels beside her, gripping and spreading her cheeks for the lens; the woman looks back over her shoulder with a haughty, smoldering glare.`,
  tags:"all fours, arched back, ass, looking back, spread ass, glare, green background, satin"}],
["wolf","Full moon","a slate-gray backdrop with a huge glowing full-moon light",{ex:"playful fanged grin",
  pose:"squatting low on her heels with her knees spread wide",w1:{neckAccessory:["leather collar with a ring","@dark"]},act:"back-to-back",dir:"mutual",
  solo:`The woman squats low on her heels completely nude in front of the moon, knees spread wide and forearms resting on them in a wolfish crouch, everything on display, grinning at the camera with a fanged smirk, her hair tousled.`,
  duo:`The woman and {partner} squat low back to back completely nude in front of the moon, knees spread wide in matching wolfish crouches, everything on display, grinning at the camera over their shoulders.`,
  tags:"squatting, spread legs, full moon, grin, fang, gray background"}],
["swan","White feathers","a pure white backdrop with white feathers drifting down",{ex:"serene, half-lidded look",
  pose:"lying on her back with her legs raised in a wide V, toes pointed",w1:{earAccessory:["pearl drop earrings","-"]},act:"holding ankles, legs up",
  solo:`The woman lies on her back on a white fur throw completely nude, her long legs raised straight up and parted in a wide V with her toes pointed like a ballerina, arms stretched gracefully above her head, feathers settling on her skin, gazing at the camera with a serene, half-lidded look.`,
  duo:`The woman lies on her back on a white fur throw completely nude with her long legs raised straight up in a wide V while {partner} kneels behind her head, holding her ankles apart for the camera; the woman gazes up at the lens with a serene, half-lidded look as feathers drift down.`,
  tags:"lying, on back, legs up, spread legs, pointed toes, arms up, feathers, white background, fur rug"}],
["dragon","Throne","a crimson backdrop, a gilded throne prop and gold coins scattered across the floor",{ex:"smoldering sultry expression",
  pose:"lounging on a throne with one leg over the armrest",w1:{neckAccessory:["chunky chain necklace","@metal"]},act:"kneeling, between legs",
  solo:`The woman lounges on the throne completely nude, one leg slung over the armrest and her legs spread wide, one hand on her inner thigh and the other propping her chin, staring down the camera with a smoldering, fierce gaze.`,
  duo:`The woman lounges on the throne completely nude with one leg slung over the armrest while {partner} kneels at her feet between her spread thighs, looking up at her; the woman stares down the camera with a smoldering, fierce gaze.`,
  tags:"sitting, throne, leg over armrest, spread legs, hand on own thigh, gold coin, red background"}],
["stag","Garden wall","a lush wall of greenery and hanging flowers over a bed of moss",{ex:"dreamy expression",
  pose:"lying on her side with her top leg raised high",w1:{headwear:["flower crown","@c1"]},act:"holding leg up, neck kiss",
  solo:`The woman lies on her side on a bed of moss completely nude, propped on one elbow, her top leg raised high into the air to show everything, a flower crown on her head, smiling dreamily at the camera.`,
  duo:`The woman lies on her side on a bed of moss completely nude while {partner} lies behind her, holding her top leg high in the air for the camera and kissing her neck; the woman smiles dreamily at the lens, a flower crown on her head.`,
  tags:"lying on side, leg up, spread legs, flower crown, plants, flowers, moss, green background"}],
["shark","Wet set","a glossy black floor under a thin layer of water, with a rain machine misting from above",{ex:"teasing tongue-out expression",
  pose:"kneeling in shallow water with her knees spread and her back arched",c1:{skinFinish:"wet skin with water droplets"},w1:{},act:"breast press, licking neck",dir:"mutual",
  solo:`The woman kneels in the shallow water completely nude, knees spread wide and back arched, dripping wet under the mist, both hands pulling her wet hair back, her tongue out in a teasing, sharp-toothed grin at the camera.`,
  duo:`The woman and {partner} kneel facing each other in the shallow water completely nude, dripping wet, their breasts pressed together and knees spread, as {partner} licks a drop of water from the woman's neck; the woman flashes a teasing, sharp-toothed grin at the camera.`,
  tags:"kneeling, spread legs, arched back, wet, water, rain, hand in own hair, tongue out, sharp teeth, grin, black background"}],
["penguin","Snow globe","a winter-wonderland set: an ice-blue backdrop, a snow machine scattering glittering flakes, crystal icicles hanging overhead and a plush white fur rug",{ex:"cheerful wink with the tip of her tongue out",
  pose:"kneeling with her knees spread wide, pushing her breasts together",c1:{bodyMarkings:"snowflakes melt on her steaming, rosy skin"},w1:{neckAccessory:["thin satin ribbon tied at the throat","@accent"]},act:"breast lift, hug from behind, chin on shoulder",
  solo:`The woman kneels on the plush white fur rug completely nude, knees spread wide and sitting back on her heels, arching her back as she presses her breasts together with both arms, glittering snowflakes catching on her skin and in her hair, and she gives the camera a cheerful wink with the tip of her tongue peeking out, cheeks rosy. A thin satin ribbon is tied in a little bow at her throat, and a row of instant photos of her earlier poses is pinned along the edge of the set.`,
  duo:`The woman kneels on the plush white fur rug completely nude with her knees spread wide while {partner} kneels behind her, cupping and lifting the woman's breasts toward the camera with {his} chin resting on her shoulder; glittering snowflakes catch in their hair, and the woman gives the camera a cheerful wink with the tip of her tongue peeking out, cheeks rosy. A row of instant photos of their earlier poses is pinned along the edge of the set.`,
  tags:"kneeling, sitting on heels, spread legs, breast squeeze, arched back, snow, snowflakes, icicle, fur rug, polaroid, ribbon, wink, tongue out, blush, smile, blue background"}],
["fox","Autumn leaves","an amber backdrop with autumn leaves fluttering in front of a wind fan",{ex:"sly, fox-like smirk",
  pose:"bending over and looking back through her legs",w1:{headwear:["fluffy fox ear headband","@hair"]},act:"spread ass",
  solo:`The woman stands bent all the way over completely nude, legs apart, looking back at the camera upside down between her legs with a sly wink, one hand reaching back to spread her pussy open, autumn leaves swirling around her.`,
  duo:`The woman stands bent all the way over completely nude with her legs apart while {partner} stands behind her, spreading the woman's cheeks for the camera; the woman looks back upside down between her legs with a sly wink, autumn leaves swirling around them.`,
  tags:"bent over, looking through legs, upside-down, spread pussy, wink, autumn leaves, orange background"}],
["lovebird","Creamsicle dream","a pastel creamsicle set: an orange-and-cream striped backdrop, giant inflatable orange slices, floating heart balloons and a tiered cake stand piled with cream puffs",{ex:"giggling, heart-eyed moan",
  pose:"kneeling on a giant cream-puff cushion, licking cream off one finger",w1:{headwear:["ribbon bows tied at the twintails","@accent"],legwear:["thigh-high socks with bows","@secondary"]},act:"hug from behind, licking",dir:"mutual",
  solo:`The woman kneels on a giant cream-puff cushion completely nude except for her ribbon bows and bow-trimmed thigh-high socks, knees apart and back arched, a dollop of whipped cream on each nipple, licking cream off one finger with a giggly, heart-eyed look into the camera, blush stickers on her cheeks and her fluffy twintails bouncing.`,
  duo:`The woman and {partner} kneel together on a giant cream-puff cushion completely nude, {partner} hugging her from behind and licking a stripe of whipped cream off her shoulder while she giggles into the camera with heart-shaped pupils, a dollop of cream on each of her nipples.`,
  tags:"kneeling, arched back, spread legs, whipped cream, cream on body, licking finger, heart balloon, cake stand, cream puff, orange (fruit), striped background, giggling, heart-shaped pupils, blush stickers, twintails"}],
["flamingo","Pink neon","a hot-pink backdrop with a glowing neon flamingo sign",{ex:"serene, sultry smile",
  pose:"standing on one leg, the other knee raised high and open",w1:{earAccessory:["flower tucked behind one ear","@c1"]},act:"holding leg up",
  solo:`The woman stands on one leg like a flamingo completely nude, her other knee raised high and opened out to the side to put everything on display, arms raised above her head and her breasts lifted, with a serene, sultry smile at the camera.`,
  duo:`The woman stands on one leg like a flamingo completely nude while {partner} kneels beside her, holding her other leg high and open for the camera; the woman raises her arms above her head with a serene, sultry smile.`,
  tags:"standing on one leg, leg up, spread legs, arms up, neon sign, pink background"}],
["kraken","Deep-sea grotto","a deep-sea grotto set: a dark teal backdrop, glowing jellyfish lanterns drifting overhead, strands of pearls and a giant open clam shell prop",{ex:"half-lidded sultry gaze",
  pose:"reclining in a giant clam shell prop, one leg raised, pearls draped over her breasts",w1:{neckAccessory:["pearl choker","-"]},act:"hug from behind, breast grab",
  solo:`The woman reclines across the giant open clam shell completely nude, one leg raised and pointed toward the ceiling, strands of pearls draped across her heavy breasts and spilling between her thighs, her long hair fanned over the shell's rim, and she gazes into the camera with a half-lidded, sultry gaze, lips parted, as the jellyfish lanterns glow above her.`,
  duo:`The woman reclines across the giant open clam shell completely nude while {partner} lies behind her, cupping her breasts through the draped strands of pearls; the woman gazes into the camera with a half-lidded, sultry gaze as the jellyfish lanterns glow above them.`,
  tags:"clam shell, seashell, pearls, pearl necklace, reclining, leg up, jellyfish, blue background, half-closed eyes, parted lips"}],
["salmon","Rose-gold waterfall","a waterfall set: a misty cedar-forest backdrop, a water feature cascading over mossy rocks into a shallow pool, and rose-gold rim lights",{ex:"serene, half-lidded look",
  pose:"kneeling in shallow water with her knees spread and her back arched",w1:{earAccessory:["large hoop earrings","@metal"]},act:"hug from behind, breast grab",
  solo:`The woman kneels in the shallow pool beneath the cascading water completely nude, her knees spread and her back arched, water pouring over her freckled shoulders and down her heavy breasts, her long salmon hair plastered down her back, and she gazes into the camera with a serene, half-lidded look as the rose-gold rim lights catch every droplet on her skin.`,
  duo:`The woman kneels in the shallow pool beneath the cascading water completely nude while {partner} kneels behind her, cupping her wet breasts as the water pours over them both; the woman gazes into the camera with a serene, half-lidded look, rose-gold rim lights catching every droplet.`,
  tags:"waterfall, water, wet, wet hair, partially submerged, kneeling, spread legs, arched back, freckles, half-closed eyes, rim lighting"}],
["crow","Treasure nest","a treasure-nest set: a moonlit dusty-lavender backdrop and a giant nest woven from silver ribbon and twigs, heaped with glittering keys, buttons, coins and opals",{ex:"cheerful wink with the tip of her tongue out",
  pose:"lying back in a giant nest of glittering trinkets, legs raised in a wide V",w1:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},act:"hug from behind, breast grab",
  solo:`The woman lies back in the giant nest completely nude except for her opal pendant, her legs raised in a wide V with her toes pointed, glittering keys, coins and opals spilling around her and over her breasts and a few fine silver chains draped across her hips, and she gives the camera a cheerful wink with the tip of her tongue out, holding up one shiny key between two fingers.`,
  duo:`The woman lies back in the giant nest of glittering trinkets completely nude while {partner} lies behind her, cupping her breasts through a spill of coins and silver chains; the woman gives the camera a cheerful wink with the tip of her tongue out, a shiny key held up between two fingers.`,
  tags:"nest, treasure, coin, key, gem, jewelry, chain, lying, on back, legs up, spread legs, toes, one eye closed, wink, tongue out, moonlight"}]
  ];;
  START.add("Academy Nude Photoshoot",SH.map(([h,name,setLine,x])=>{
    const rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const w1i=x.w1||{};
    const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},PH,x.c1||{},{expression:x.ex,posture:x.pose});
    const lead=`A professional nude photo shoot in a studio with ${setLine}, softboxes and light stands framing the set and a camera flash bursting.`;
    return{id:h+"shoot",base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Photo shoot",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,
        must:`an anime style with high detail, a professional nude photo shoot in a studio with ${setLine}, softboxes and a camera flash, and particular emphasis on highly detailed skin, hair and eyes`,
        pair:{id:"",outfit:"scene",solo:`${lead} ${x.solo} ${STUDIO}, ${x.tags}`,scene:`${lead} ${x.duo} ${STUDIO}, duo, ${x.tags}`,act:x.act,dir:x.dir||"ba",
          explicit:true,penis:false,pc:{expression:"seductive smile",posture:null},c1,w1:{name:"Photo shoot",look:"boudoir",f:w1i},w2:{name:"Photo shoot",look:"boudoir",m:{},f:{}},compact:false,fit:true}},
      tags:["photo shoot","nude","studio","explicit",h],
      blurb:`${cap(h)}'s nude shoot on ${setLine.replace(/^a /,"a set with a ")}. Solo by default; pick a partner in the Scene tab for a shoot for two.`};
  }),{after:"Academy Boudoir"});
  const bad=[];
  SH.forEach(([h,n,sl,x])=>{Object.entries(x.w1||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(h+": "+f+" “"+a[0]+"”")});
    [["expression",x.ex],["posture",x.pose]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(h+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("photo shoot: "+m);try{console.warn("[photo shoot] "+m)}catch(e){}});
})();

/* ---- v143 (v151: Salmon and Crow): three solo-first sets for the Academy girls, each with an optional partner (the Scene tab's solo mode):
     "Academy Bathroom Show"   (Adult)   she knows she's watched and performs for the viewer: showering, peeing, toys, cumming
     "Academy Highest Bidder"  (Adult)   at a masked gala she auctions one night with herself, keeps the winnings,
                                         and puts on her own depraved stage show to drive the bids up (masked crowd behind)
     "Academy Dungeon Trap"    (Clubs, costumes and fantasy)  adventurer mishaps from silly to perilous: nude fanservice,
                                         flustered, furious or laughing, never sex and never degradation; not explicit
   All in house order, built on the robes entries; Penguin's scenes get the extra care. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","pressed against an aquarium wall in a glass shower, fingering herself","Explicit (adult)");
  START.option("posture","reclining in a giant clam shell, drawing a rope of pearls between her legs","Explicit (adult)");
  START.option("expression","amused, unbothered smile","Adventure mishaps");
  START.option("posture","standing waist-deep in a grotto, covering herself, amused","Adventure mishaps");
  const G="Explicit (adult)",GA="Adventure mishaps";
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t,fam));
  const opt=(f,list,g)=>list.forEach(v=>START.option(f,v,g));
  const tl=(a,b)=>[...new Set((a+", "+b).split(/,\s*/).filter(Boolean))].join(", ");
  /* v151: Salmon and Crow */
  START.option("posture","leaning back against cedar planks in an outdoor shower, a hand between her thighs","Explicit (adult)");
  START.option("posture","sitting on the rim of a claw-foot tub, a waterproof vibrator between her legs","Explicit (adult)");
  START.option("posture","arching back under a stage waterfall, legs spread","Explicit (adult)");
  START.option("posture","kneeling in a pile of glittering coins, pouring them over her breasts","Explicit (adult)");
  START.option("posture","clinging to a rock in a rushing magical current","Adventure mishaps");
  START.option("posture","buried chest-deep in a pile of gold coins, clutching a gem","Adventure mishaps");
  /* ---------- shared builder ---------- */
  function soloSet(label,after,suf,cfg,rows){
    START.add(label,rows.map(([h,name,x])=>{
      const rb=tplById(h+"robes");
      const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const c1=Object.assign({},cfg.c1||{},x.c1||{},{expression:x.ex,posture:x.pose});
      return{id:h+suf,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname:cfg.oname,look:cfg.look,items:res(x.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:!!cfg.explicit,lewdtag:!!cfg.explicit,
          must:`an anime style with high detail, ${x.set}, and particular emphasis on highly detailed skin, hair and eyes`,
          pair:{id:"",outfit:"scene",solo:`${x.solo} ${tl(cfg.tail,x.tags)}`,scene:`${x.duo} ${tl(cfg.tail,x.tags)}`,soloCount:cfg.soloCount||"",
            act:x.act||"",dir:x.dir||"mutual",explicit:!!cfg.explicit,penis:false,pc:{expression:x.pc||cfg.pc,posture:null},c1,
            w1:{name:cfg.oname,look:cfg.look,f:x.w1||{}},w2:{name:cfg.oname,look:cfg.look,f:x.w2f||cfg.w2f||{},m:x.w2m||cfg.w2m||{}},compact:false,fit:true}},
        tags:cfg.tags.concat([h]),blurb:`${x.blurb} Solo by default; pick a partner in the Scene tab to add one.`};
    }),{after});
    const bad=[];
    rows.forEach(([h,n,x])=>{[x.w1,x.w2f||cfg.w2f,x.w2m||cfg.w2m].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(h+": "+f+" “"+a[0]+"”")}));
      [["expression",x.ex],["posture",x.pose],["expression",x.pc||cfg.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(h+": "+f+" “"+v+"”")})});
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }

  /* ======================= Bathroom Show ======================= */
  it("heldItem",["detachable shower head","waterproof vibrator","pink rabbit vibrator","open book of poetry"],"LS","boudoir");
  it("headwear",["towel wrapped around the hair"],"CU","casual");
  opt("posture",["leaning against fogged shower glass, one hand between her thighs","sitting in a bubble bath, holding the shower head between her legs",
    "lounging in a clawfoot tub with a book, one leg over the rim","sitting on the toilet with the door wide open, knees apart",
    "squatting over a shower drain, knees spread","standing in a rainfall shower with one leg raised on the wall rail",
    "riding a dildo suctioned to the tile, sitting on the bath's edge","standing in an outdoor garden shower, legs apart",
    "standing under a shower, aiming the jet between her legs","sitting on a sauna bench, legs spread, drawing on the fogged window",
    "bending over in the shower, spreading herself under the water","sitting on a marble vanity counter, legs spread before the mirror",
    "standing on one leg in a pink-tiled shower, the other foot up on the ledge"],G);
  opt("bodyMarkings",["water and love juices stream down her thighs"],G);
  const BATH={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet skin with water droplets",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"water and love juices stream down her thighs"};
  const BT="steam, wet, completely nude, looking at viewer, exhibitionism";
  soloSet("Academy Bathroom Show","Academy Nude Photoshoot","bath",{oname:"Bath time",look:"boudoir",explicit:true,c1:BATH,pc:"lustful expression",tail:BT,tags:["bathroom","shower","exhibitionism","explicit"]},[
["griffin","Fogged glass",{ex:"shy, blushing peek through her fingers",pose:"leaning against fogged shower glass, one hand between her thighs",w1:{},
  set:"a steamy marble shower behind fogged glass",act:"kiss, fingering",blurb:"Fingering herself against the fogged glass of a marble shower, knowing you're watching, and drawing you a heart.",
  solo:`In a steamy marble shower, the woman knows the viewer is watching and leans against the fogged glass, completely nude and dripping wet, drawing a little heart in the fog with one finger while her other hand slides between her thighs, fingering herself. She blushes hard and peeks shyly at the viewer, lips parted in a soft moan, her legs trembling as she squirts against the glass.`,
  duo:`In a steamy marble shower behind fogged glass, the woman and {partner} stand completely nude under the water while {partner} presses against her from behind, fingering her as she leans on the glass; the woman blushes hard, peeking shyly at the viewer as she squirts against the glass.`,
  tags:"shower, fogged glass, writing on glass, heart, fingering, masturbation, squirting, shy, blush, trembling, marble"}],
["badger","Shower-head bath",{ex:"sweet, giggly smile with her tongue out",pose:"sitting in a bubble bath, holding the shower head between her legs",w1:{heldItem:["detachable shower head","-"]},
  set:"a cozy bathroom with a bubble bath and fairy lights",act:"kiss, breast grab",blurb:"Giggling in a bubble bath with the shower head held between her legs.",
  solo:`In a cozy bathroom strung with fairy lights, the woman sits in a bubble bath completely nude, her breasts heaped with suds, holding the detachable shower head between her legs so the jet pounds her clit. She looks at the viewer with a sweet, giggly smile, tongue peeking out, toes curling over the rim as she cums with a happy squeal.`,
  duo:`In a cozy bubble bath under fairy lights, {partner} sits behind the woman, squeezing her soapy breasts while she holds the shower head between her legs; the woman giggles at the viewer with her tongue out as she cums, toes curling over the rim.`,
  tags:"bathroom, bathtub, bubble bath, soap bubbles, shower head, masturbation, toes curling, orgasm, giggling, tongue out, fairy lights"}],
["raven","Tub and a book",{ex:"half-lidded sultry gaze",pose:"lounging in a clawfoot tub with a book, one leg over the rim",w1:{heldItem:["open book of poetry","-"]},
  set:"a candlelit bathroom with a clawfoot tub and stacks of books",act:"kiss, vibrator",blurb:"Reading in a clawfoot tub with a vibrator under the water, glancing up at you over the page.",
  solo:`In a candlelit bathroom stacked with books, the woman lounges in a clawfoot tub completely nude with one long leg draped over the rim, holding an open book of poetry in one hand while the other works a waterproof vibrator between her thighs beneath the water. She glances up at the viewer over the page with a half-lidded, knowing look, cheeks flushed, and murmurs "Still watching? Good♡" in a speech bubble.`,
  duo:`In a candlelit bathroom, the woman lounges in a clawfoot tub with one leg over the rim while {partner} kneels beside it, working a waterproof vibrator between her thighs; the woman keeps reading aloud, then glances up at the viewer over the page with a half-lidded, knowing look.`,
  tags:"bathroom, bathtub, clawfoot tub, reading, book, vibrator, masturbation, leg over rim, candlelight, half-closed eyes, speech bubble"}],
["serpent","Door wide open",{ex:"haughty, smoldering glare over her shoulder",pose:"sitting on the toilet with the door wide open, knees apart",w1:{earAccessory:["large hoop earrings","@metal"]},c1:{bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"},
  set:"an emerald-tiled bathroom with the door wide open",act:"",blurb:"Peeing on the toilet with the door wide open, staring you down.",
  solo:`In an emerald-tiled bathroom, the woman sits on the toilet completely nude with the door wide open and her knees spread apart, peeing in a clear golden stream while she stares straight at the viewer with a haughty, smoldering look, chin raised, and sneers "Enjoying the view?" in a speech bubble.`,
  duo:`In an emerald-tiled bathroom with the door wide open, the woman sits on the toilet completely nude with her knees apart, peeing, while {partner} leans in the doorway beside her; the woman stares straight at the viewer with a haughty, smoldering look and sneers "Enjoying the view?" in a speech bubble.`,
  tags:"bathroom, toilet, sitting on toilet, peeing, pee, spread legs, open door, smirk, haughty, speech bubble"}],
["wolf","Post-run shower",{ex:"playful fanged grin",pose:"squatting over a shower drain, knees spread",w1:{},
  set:"a steamy concrete shower room after a long run",act:"",blurb:"Squatting over the drain in a steamy shower after a run, peeing with a cocky grin.",
  solo:`In a steamy concrete shower room after a long run, the woman squats low over the drain completely nude, knees spread wide and forearms on her knees, peeing in a strong golden stream onto the tiles while hot water pours over her toned back, and she grins at the viewer with a cocky, fanged smirk.`,
  duo:`In a steamy concrete shower room, the woman and {partner} squat side by side over the drain completely nude, knees spread, peeing onto the tiles under the hot water, and the woman grins at the viewer with a cocky, fanged smirk.`,
  tags:"shower, squatting, peeing, pee, spread legs, grin, fang, sweat, concrete"}],
["swan","Rainfall shower",{ex:"serene, half-lidded look",pose:"standing in a rainfall shower with one leg raised on the wall rail",w1:{earAccessory:["pearl drop earrings","-"]},
  set:"a white marble rainfall shower",act:"kiss, fingering",blurb:"One leg raised to the rail like a barre under a rainfall shower, fingering herself to a squirting finish.",
  solo:`Under a white marble rainfall shower, the woman stands completely nude with one long leg raised gracefully onto the wall rail as if it were a barre, water cascading over her, fingering herself slowly with two fingers. She gazes at the viewer with a serene, half-lidded look, lips parted, and squirts in a glittering arc as she cums.`,
  duo:`Under a white marble rainfall shower, the woman stands with one long leg raised onto the wall rail while {partner} kneels before her, fingering her; she gazes at the viewer with a serene, half-lidded look and squirts in a glittering arc as she cums.`,
  tags:"shower, rainfall shower, leg up, standing on one leg, fingering, masturbation, squirting, orgasm, marble, half-closed eyes"}],
["dragon","Stone bathhouse",{ex:"smoldering sultry expression",pose:"riding a dildo suctioned to the tile, sitting on the bath's edge",w1:{neckAccessory:["chunky chain necklace","@metal"]},
  set:"a steaming stone bathhouse lit by braziers",act:"kiss, breast grab",blurb:"Riding a dildo suctioned to the bathhouse tile, holding your eyes the whole time.",
  solo:`In a steaming stone bathhouse lit by braziers, the woman sits astride a thick dildo suctioned to the tiled edge of the bath, completely nude and dripping wet, riding it hard with her hands braced on her knees. She holds the viewer's gaze with a smoldering, fierce stare, steam curling around her, and growls "Don't look away♡" in a speech bubble.`,
  duo:`In a steaming stone bathhouse, the woman rides a dildo suctioned to the tiled edge of the bath while {partner} stands behind her in the water, squeezing her breasts; she holds the viewer's gaze with a smoldering, fierce stare and growls "Don't look away♡".`,
  tags:"bathhouse, dildo, suction cup dildo, riding, masturbation, steam, brazier, glare, speech bubble"}],
["stag","Garden shower",{ex:"dreamy expression",pose:"standing in an outdoor garden shower, legs apart",w1:{headwear:["flower crown","@c1"]},
  set:"an outdoor garden shower among ferns and flowers",act:"",blurb:"Watering the flowers: peeing with her legs apart in an outdoor garden shower.",
  solo:`In an outdoor garden shower among ferns and blooming flowers, the woman stands completely nude with her legs apart, water streaming over her, and pees in a golden arc onto the flowers at her feet with a dreamy, playful smile at the viewer, as if she's watering the garden.`,
  duo:`In an outdoor garden shower among ferns and flowers, the woman and {partner} stand completely nude with their legs apart, peeing onto the flowers at their feet, and the woman smiles dreamily at the viewer.`,
  tags:"outdoors, outdoor shower, garden, flowers, ferns, standing, peeing, pee, legs apart, smile, flower crown"}],
["shark","Pressure jet",{ex:"teasing tongue-out expression",pose:"standing under a shower, aiming the jet between her legs",w1:{heldItem:["detachable shower head","-"]},
  set:"a slate-tiled shower with a high-pressure shower head",act:"kiss, breast grab",blurb:"Aiming a high-pressure shower jet between her legs, tongue out, cumming hard.",
  solo:`In a slate-tiled shower, the woman stands completely nude with one foot up on the ledge, aiming the high-pressure shower head straight between her legs, her wet hair plastered to her back. She sticks her tongue out at the viewer with a teasing, sharp-toothed grin that breaks into a gasp as she cums, thighs shaking.`,
  duo:`In a slate-tiled shower, {partner} holds the high-pressure shower head between the woman's legs while she braces one foot on the ledge; the woman sticks her tongue out at the viewer with a teasing, sharp-toothed grin that breaks into a gasp as she cums.`,
  tags:"shower, shower head, masturbation, foot up, orgasm, trembling, tongue out, sharp teeth, wet hair"}],
["penguin","Sauna after the slopes",{ex:"cheerful wink with the tip of her tongue out",pose:"sitting on a sauna bench, legs spread, drawing on the fogged window",
  w1:{headwear:["towel wrapped around the hair","@accent"]},c1:{skinFinish:"wet, sweat-glistening skin",bodyMarkings:"snowflakes melt on her steaming, rosy skin"},
  set:"a cedar sauna at a ski lodge, with a frosted window onto falling snow",act:"kiss, fingering",blurb:"A cedar sauna after the slopes: drawing a little penguin on the fogged window while she fingers herself, winking at you.",
  solo:`In a cedar sauna at a ski lodge, a frosted window showing snow falling outside, the woman sits on the wooden bench completely nude with her legs spread, glowing with sweat, her hair wrapped in an orange towel. With one finger she draws a little heart and a tiny penguin on the fogged window, while her other hand slides between her thighs, fingering herself. She gives the viewer a cheerful wink with the tip of her tongue peeking out, cheeks rosy, then shivers into orgasm, toes curling on the warm cedar as steam hisses off the stove.`,
  duo:`In a cedar sauna at a ski lodge, snow falling past the frosted window, the woman sits on the bench completely nude with her legs spread while {partner} sits close beside her, fingering her slowly; the woman draws a little heart and a tiny penguin on the fogged glass and gives the viewer a cheerful wink with the tip of her tongue out, cheeks rosy, shivering into orgasm.`,
  tags:"sauna, steam, wooden bench, window, snow, drawing on window, heart, penguin, towel on head, fingering, masturbation, orgasm, toes curling, wink, tongue out, blush, sweat"}],
["fox","Peek in the shower",{ex:"sly, fox-like smirk",pose:"bending over in the shower, spreading herself under the water",w1:{},
  set:"a steamy shower with amber tiles",act:"",blurb:"Bent over under the water, spreading herself with a sly wink back at you.",
  solo:`In a steamy shower with amber tiles, the woman bends over completely nude under the hot water, reaching back with both hands to spread herself open for the viewer, water running down her back and between her cheeks, and looks back over her shoulder with a sly, fox-like smirk and a wink.`,
  duo:`In a steamy amber-tiled shower, the woman bends over under the hot water while {partner} spreads her open for the viewer; the woman looks back over her shoulder with a sly, fox-like smirk and a wink.`,
  tags:"shower, bent over, spread pussy, spread ass, looking back, wink, smirk, wet, amber"}],
["lovebird","Rubber duck",{ex:"giggling, heart-eyed moan",pose:"sitting in a bubble bath with a rubber duck between her legs",w1:{headwear:["ribbon bows tied at the twintails","@accent"],heldItem:["rubber duck vibrator","-"]},
  set:"a bathroom tiled in creamsicle orange and cream, with a bubble bath",act:"kiss, vibrator",blurb:"A peach-scented bubble bath, a rubber duck that buzzes, and a giggly little wave: \"Quack quack♡\"",
  solo:`In a bathroom tiled in creamsicle orange and cream, the woman sits in a bubble bath heaped with peach-scented foam, completely nude with her ribbon bows still in her twintails, holding a yellow rubber duck vibrator between her legs under the bubbles. She knows the viewer is watching and gives a giggly little wave with her free hand, blush stickers on her cheeks and her eyes turning to hearts, and squeaks "Quack quack♡" in a speech bubble as her toes curl over the rim and she cums.`,
  duo:`In a bubble bath tiled in creamsicle orange and cream, {partner} sits behind the woman and holds a rubber duck vibrator between her legs under the peach-scented foam while she giggles and waves at the viewer with heart-shaped pupils, toes curling over the rim as she cums.`,
  tags:"bathroom, bathtub, bubble bath, soap bubbles, rubber duck, vibrator, masturbation, toes curling, orgasm, waving, giggling, heart-shaped pupils, blush stickers, twintails, speech bubble"}],
["flamingo","Pink shower",{ex:"serene, sultry smile",pose:"standing on one leg in a pink-tiled shower, the other foot up on the ledge",w1:{earAccessory:["flower tucked behind one ear","@c1"]},
  set:"a pink-tiled shower with a neon flamingo light",act:"",blurb:"Standing on one leg in a pink shower and peeing with a serene smile.",
  solo:`In a pink-tiled shower glowing under a neon flamingo light, the woman stands on one leg like a flamingo, completely nude, her other foot up on the tiled ledge, and pees in a golden arc onto the shower floor, smiling at the viewer with a serene, sultry smile as the water runs over her breasts.`,
  duo:`In a pink-tiled shower under a neon flamingo light, the woman stands on one leg with her other foot on the ledge while {partner} stands close behind her, both completely nude and peeing onto the shower floor; the woman smiles at the viewer with a serene, sultry smile.`,
  tags:"shower, pink, neon, standing on one leg, foot up, peeing, pee, smile"}],
["kraken","Aquarium shower",{ex:"half-lidded sultry gaze",pose:"pressed against an aquarium wall in a glass shower, fingering herself",w1:{earAccessory:["pearl drop earrings","-"]},
  set:"a glass shower built into the wall of a giant aquarium",act:"kiss, fingering",blurb:"Breasts pressed to the glass of a shower built into a giant aquarium, fingering herself while an octopus drifts past.",
  solo:`In a luxurious bathroom where the glass shower is built into the wall of a giant aquarium, fish and a drifting octopus swirling behind the glass, the woman presses her heavy breasts against the cool glass under the hot water, completely nude and dripping wet, one hand sliding between her thighs, fingering herself. She looks back at the viewer over her shoulder with a half-lidded, sultry gaze and murmurs "You can watch... I like it♡" in a speech bubble, steam fogging the glass around her.`,
  duo:`In a glass shower built into the wall of a giant aquarium, {partner} presses against the woman from behind under the hot water, fingering her as her heavy breasts are squashed against the aquarium glass, fish and an octopus drifting past; she looks back at the viewer with a half-lidded, sultry gaze.`,
  tags:"shower, aquarium, fish tank, octopus, fish, against glass, breasts on glass, fingering, masturbation, looking back, half-closed eyes, steam, wet, speech bubble"}],
["salmon","Cedar shower",{ex:"half-lidded sultry gaze",pose:"leaning back against cedar planks in an outdoor shower, a hand between her thighs",w1:{earAccessory:["large hoop earrings","@metal"]},
  set:"an outdoor cedar shower on a deck above a misty river",act:"kiss, fingering",blurb:"An outdoor cedar shower above a misty river at dawn, fingering herself slowly against the wet planks for the one watching.",
  solo:`On a cedar deck above a misty river at dawn, the woman stands under an outdoor rain shower completely nude, leaning back against the wet cedar planks with water streaming over her freckled breasts, one hand between her thighs, fingering herself slowly. She knows the viewer is watching and gives a half-lidded, sultry gaze, murmuring "Don't look away now♡" in a speech bubble as her knees start to tremble.`,
  duo:`On a cedar deck above a misty river at dawn, the woman stands nude under an outdoor rain shower, leaning back against the wet planks while {partner} kneels before her, fingering her as the water streams down; she gives the viewer a half-lidded, sultry gaze.`,
  tags:"outdoor shower, shower, outdoors, wooden wall, deck, river, fog, morning, leaning back, fingering, masturbation, freckles, half-closed eyes, trembling, speech bubble"}],
["crow","Moonlit tub",{ex:"biting her lip",pose:"sitting on the rim of a claw-foot tub, a waterproof vibrator between her legs",w1:{heldItem:["waterproof vibrator","-"]},
  set:"a moonlit bathroom with a claw-foot tub under a round window",act:"kiss, vibrator",blurb:"On the rim of a bubble-filled claw-foot tub by a moonlit round window, her rings and opals set aside in a little dish, a vibrator between her legs.",
  solo:`In a moonlit bathroom with a round window, the woman sits on the rim of a claw-foot tub brimming with bubbles, completely nude and dripping wet, her legs parted as she presses a buzzing waterproof vibrator between them. On the windowsill beside her sits a little dish of the rings and opals she took off, glittering in the moonlight. She looks straight at the viewer, biting her lip, and whispers "Only you get to see this♡" in a speech bubble.`,
  duo:`In a moonlit bathroom, the woman sits nude on the rim of a bubble-filled claw-foot tub while {partner} kneels in the bath before her, holding a buzzing waterproof vibrator between her legs; she bites her lip, looking at the viewer.`,
  tags:"bathtub, claw-foot bathtub, bubble bath, bubbles, round window, moonlight, night, sitting, spread legs, vibrator, sex toy, masturbation, wet, biting lip, speech bubble"}]
  ]);

  /* ======================= Highest Bidder ======================= */
  it("heldItem",["bidding paddle with her own number","crystal glass dildo"],"CU","glam,boudoir");
  opt("posture",["hanging upside down in a split on a stage pole","squeezing milk from her breasts into a champagne tower","straddling a velvet lectern with a dildo",
    "reclining on a velvet chaise, legs spread","hanging upside down in aerial silks, legs spread","dancing en pointe on a stage, a toy inside her",
    "riding a saddle machine on a gold pedestal","swinging in a flower-decked aerial hoop, legs spread","pressed against the glass of a water tank on stage",
    "riding an ice-carved toy on an ice throne","pulling a string of silk scarves from between her legs","posing on a rotating pedestal, spreading a feather fan",
    "swinging on a pink swing, legs spread, squirting"],G);
  opt("skinFinish",["a gold shimmer across the skin"],"Finish");
  const BID={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"glistening oiled skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"her thighs glisten with dripping love juices"};
  const BTL="auction, stage, spotlight, masquerade, crowd, masked audience, bidding paddle, completely nude, exhibitionism, looking at viewer";
  const lead=`At a candlelit masquerade gala, the woman is auctioning one night with herself to the highest bidder, keeping every coin, while a crowd of masked bidders raise numbered paddles below the stage and a gilded board shows her price climbing.`;
  const leadDuo=`At a candlelit masquerade gala, the woman and {partner} are auctioning one night with themselves as a pair to the highest bidder, keeping every coin, while masked bidders raise numbered paddles and a gilded board shows the price climbing.`;
  const hb=rows=>rows.map(([h,n,x])=>[h,n,Object.assign({},x,{solo:lead+" "+x.solo,duo:leadDuo+" "+x.duo})]);
  soloSet("Academy Highest Bidder","Academy Bathroom Show","bidder",{oname:"On stage",look:"glam",explicit:true,c1:BID,pc:"seductive smile",tail:BTL,soloCount:"1girl, audience",tags:["auction","stage","exhibitionism","explicit"]},hb([
["griffin","Upside-down split",{ex:"shy, blushing peek through her fingers",pose:"hanging upside down in a split on a stage pole",w1:{waistAccessory:["thin gold body chain draped over the hips","@metal"]},
  set:"a candlelit masquerade gala stage with a brass pole",act:"",blurb:"Hanging upside down in a split on the pole, blushing as her price climbs.",
  solo:`On stage she hangs upside down from a brass pole completely nude, her legs opened in a perfect dancer's split so everything is on show, blushing furiously and peeking at the crowd through her fingers as the paddles fly up.`,
  duo:`On stage they hang from twin brass poles completely nude in mirrored dancer's splits, the woman blushing furiously and peeking at the crowd through her fingers.`,
  tags:"pole dancing, upside-down, splits, spread legs, shy, blush, peeking through fingers, gold"}],
["badger","Champagne tower",{ex:"sweet, giggly smile with her tongue out",pose:"squeezing milk from her breasts into a champagne tower",c1:{nippleType:"hard, flushed, and lactating with milk dripping from them"},w1:{neckAccessory:["heart pendant necklace","@metal"]},
  set:"a candlelit masquerade gala stage with a champagne tower",act:"",blurb:"Filling a champagne tower with her own breast milk while the bids pour in.",
  solo:`On stage she leans over a tall champagne tower completely nude, squeezing her heavy breasts so that streams of breast milk spray into the top glass and cascade down the tower, giggling sweetly at the crowd with her tongue out as the bids pour in.`,
  duo:`On stage {partner} squeezes the woman's breasts from behind so that streams of breast milk spray into a tall champagne tower and cascade down, while the woman giggles sweetly at the crowd with her tongue out.`,
  tags:"lactation, breast milk, milking, breast squeeze, champagne tower, champagne glass, giggling, tongue out"}],
["raven","The reading",{ex:"half-lidded sultry gaze",pose:"straddling a velvet lectern with a dildo",w1:{heldItem:["open book of poetry","-"],eyewear:["round glasses","@metal"]},
  set:"a candlelit masquerade gala stage with a velvet lectern",act:"",blurb:"Reading an erotic poem aloud from the lectern while she rides a dildo mounted on it.",
  solo:`On stage she straddles a velvet lectern completely nude, riding a thick dildo mounted on its edge while she reads an erotic poem aloud from an open book through round glasses, her voice catching between lines, a half-lidded gaze lifted to the crowd over the page.`,
  duo:`On stage the woman reads an erotic poem aloud at a velvet lectern completely nude while {partner} kneels behind her, fucking her with a thick dildo between lines; she lifts a half-lidded gaze to the crowd over her round glasses.`,
  tags:"lectern, reading, book, glasses, dildo, riding, masturbation, half-closed eyes"}],
["serpent","Peasants, bid higher",{ex:"haughty, smoldering glare over her shoulder",pose:"reclining on a velvet chaise, legs spread",w1:{heldItem:["crystal glass dildo","-"],earAccessory:["large hoop earrings","@metal"]},
  set:"a candlelit masquerade gala stage with an emerald velvet chaise",act:"",blurb:"Fucking herself with a crystal toy on an emerald chaise and sneering at the bidders to go higher.",
  solo:`On stage she reclines on an emerald velvet chaise completely nude with her legs spread toward the crowd, sliding a crystal glass dildo deep inside herself, and sneers down at the bidders with a haughty glare: "Is that all? Bid higher, peasants♡".`,
  duo:`On stage the woman reclines on an emerald velvet chaise with her legs spread while {partner} works a crystal glass dildo inside her; she sneers down at the bidders with a haughty glare: "Bid higher, peasants♡".`,
  tags:"chaise longue, reclining, spread legs, glass dildo, masturbation, haughty, smirk, speech bubble, green"}],
["wolf","Aerial silks",{ex:"playful fanged grin",pose:"hanging upside down in aerial silks, legs spread",w1:{},
  set:"a candlelit masquerade gala stage hung with aerial silks",act:"",blurb:"Upside down in aerial silks, legs spread, squirting over the stage.",
  solo:`High above the stage she hangs upside down in aerial silks completely nude, wrapped at the waist with her strong legs spread wide, fingering herself with a cocky, fanged grin until she squirts in an arc over the stage below.`,
  duo:`High above the stage the woman and {partner} hang upside down in aerial silks completely nude, legs spread, fingering each other until the woman squirts in an arc over the stage, grinning a cocky, fanged grin.`,
  tags:"aerial silks, upside-down, spread legs, fingering, masturbation, squirting, grin, fang, athletic"}],
["swan","En pointe",{ex:"serene, half-lidded look",pose:"dancing en pointe on a stage, a toy inside her",w1:{earAccessory:["pearl drop earrings","-"],legwear:["satin pointe shoes with ribbons laced up the ankles","pale pink"],heldItem:["bidding paddle with her own number","-"]},
  set:"a candlelit masquerade gala stage under a single spotlight",act:"",blurb:"Dancing en pointe in only her pointe shoes, a vibrating toy inside her and the remote given to the top bidder.",
  solo:`Under a single spotlight she dances en pointe completely nude except for her pointe shoes, a vibrating toy buried inside her whose remote she has handed to the leading bidder, holding a perfect arabesque as her thighs tremble and her juices glisten down her legs, her serene face flushed.`,
  duo:`Under a single spotlight the woman and {partner} dance a nude pas de deux, the woman en pointe in only her pointe shoes with a vibrating toy inside her, holding a trembling arabesque in {partner}'s arms, her serene face flushed.`,
  tags:"ballet, dancing, en pointe, arabesque, pointe shoes, vibrator, remote control vibrator, trembling, spotlight, pussy juice"}],
["dragon","Saddle machine",{ex:"smoldering sultry expression",pose:"riding a saddle machine on a gold pedestal",w1:{neckAccessory:["chunky chain necklace","@metal"]},
  set:"a candlelit masquerade gala stage with a gold pedestal",act:"",blurb:"Riding a roaring saddle machine on a gold pedestal and daring the crowd to outbid each other.",
  solo:`On a gold pedestal at center stage she rides a roaring saddle machine completely nude, its thick dildo pumping inside her, gripping the handles with her head thrown back and a smoldering, fierce stare at the crowd as her juices drip down the saddle.`,
  duo:`On a gold pedestal the woman rides a roaring saddle machine completely nude while {partner} stands behind her, holding her hips down onto it; she gives the crowd a smoldering, fierce stare.`,
  tags:"sex machine, riding, dildo, pedestal, gold, glare, pussy juice, sweat"}],
["stag","Flower hoop",{ex:"dreamy expression",pose:"swinging in a flower-decked aerial hoop, legs spread",w1:{headwear:["flower crown","@c1"]},
  set:"a candlelit masquerade gala stage with a flower-decked aerial hoop",act:"",blurb:"Swinging in a flower-wrapped aerial hoop with her legs spread, honey dripping down her body.",
  solo:`Above the stage she swings in an aerial hoop wrapped with flowers and ivy, completely nude, legs spread over the hoop, drizzling golden honey down her breasts and between her thighs and rubbing it into herself with a dreamy smile at the crowd.`,
  duo:`Above the stage the woman and {partner} swing together in a flower-wrapped aerial hoop completely nude, {partner} drizzling golden honey down the woman's breasts and between her spread thighs as she smiles dreamily at the crowd.`,
  tags:"aerial hoop, flowers, ivy, spread legs, honey, masturbation, flower crown, smile"}],
["shark","Water tank",{ex:"teasing tongue-out expression",pose:"pressed against the glass of a water tank on stage",c1:{skinFinish:"wet skin with water droplets"},w1:{},
  set:"a candlelit masquerade gala stage with a glass water tank",act:"",blurb:"Pressed against the glass of an on-stage water tank, using a toy underwater and grinning at the bidders.",
  solo:`On stage she swims in a tall glass water tank completely nude, pressing her breasts and pussy flat against the glass for the crowd while she works a waterproof vibrator between her legs, bubbles streaming from her teasing, sharp-toothed grin.`,
  duo:`On stage the woman and {partner} swim in a tall glass water tank completely nude, the woman pressed flat against the glass for the crowd while {partner} works a waterproof vibrator between her legs.`,
  tags:"water tank, underwater, against glass, breasts on glass, vibrator, masturbation, bubbles, sharp teeth, grin"}],
["penguin","The ice throne",{ex:"rosy, giggling, heart-eyed bliss",pose:"riding an ice-carved toy on an ice throne",
  c1:{bodyMarkings:"snowflakes melt on her steaming, rosy skin"},w1:{neckAccessory:["thin satin ribbon tied at the throat","@accent"]},
  set:"a candlelit masquerade gala stage with a glittering ice throne and falling snow",act:"",blurb:"Riding an ice-carved toy on a glittering ice throne in falling snow, gasping and giggling as she sets a record bid.",
  solo:`At center stage, under falling stage snow, she sits on a glittering throne carved from ice, completely nude except for a thin orange satin ribbon tied in a bow at her throat, riding a smooth toy carved from clear ice that rises from its seat. She gasps and giggles at the cold, cheeks rosy and freckles flushed, pressing her breasts together and winking at the crowd with heart-shaped eyes, steam rising from her warm skin, as the gilded board flashes "RECORD BID" and a hundred paddles shoot up.`,
  duo:`At center stage under falling stage snow, the woman rides a smooth toy carved from clear ice on a glittering ice throne while {partner} stands behind the throne, cupping her breasts and kissing her neck; the woman gasps and giggles at the cold with rosy cheeks and heart-shaped eyes as the board flashes "RECORD BID".`,
  tags:"ice throne, ice, ice dildo, temperature play, riding, snow, ribbon, giggling, wink, breast squeeze, heart-shaped pupils, blush, steam"}],
["fox","The magic act",{ex:"sly, fox-like smirk",pose:"pulling a string of silk scarves from between her legs",w1:{headwear:["fluffy fox ear headband","@hair"]},
  set:"a candlelit masquerade gala stage with a magician's table",act:"",blurb:"A dirty magic act: a string of silk scarves pulled from between her legs.",
  solo:`On stage she performs a dirty magic act completely nude, one foot up on a magician's table, slowly pulling a long string of knotted silk scarves out from between her legs with a sly, fox-like smirk and a wink, while the crowd gasps and the paddles go up.`,
  duo:`On stage the woman performs a dirty magic act completely nude with one foot up on a magician's table while {partner}, her glamorous assistant, slowly pulls a long string of knotted silk scarves out from between her legs; the woman winks at the crowd with a sly, fox-like smirk.`,
  tags:"magic trick, magician, silk scarves, object insertion, foot up, spread legs, wink, smirk"}],
["lovebird","Birdcage",{ex:"giggling, heart-eyed moan",pose:"swinging in a giant gilded birdcage, legs spread",w1:{headwear:["ribbon bows tied at the twintails","@accent"],legwear:["thigh-high socks with bows","@secondary"]},
  set:"a candlelit masquerade gala stage with a giant gilded birdcage swing",act:"",blurb:"Swinging in a giant gilded birdcage with her legs spread, chirping for bids: \"I'll be your little lovebird♡\"",
  solo:`On stage, a giant gilded birdcage hangs from the ceiling with its door open, and she swings on the perch inside completely nude except for her ribbon bows and bow-trimmed thigh-high socks, her legs spread wide over the swing, rubbing herself with one hand and blowing kisses to the crowd with the other. She giggles with heart-shaped pupils and blush stickers on her cheeks, chirping "Bid high and I'll be your little lovebird♡" in a speech bubble as the paddles fly up.`,
  duo:`On stage, the woman and {partner} sit together on the swinging perch of a giant gilded birdcage completely nude, {partner} spreading the woman's legs wide for the crowd and fingering her as she giggles and blows kisses with heart-shaped pupils.`,
  tags:"birdcage, cage, swing, spread legs, masturbation, blowing kiss, heart-shaped pupils, blush stickers, twintails, gold, speech bubble"}],
["flamingo","Pink swing",{ex:"serene, sultry smile",pose:"swinging on a pink swing, legs spread, squirting",w1:{earAccessory:["flower tucked behind one ear","@c1"]},
  set:"a candlelit masquerade gala stage with a flower-wrapped pink swing",act:"",blurb:"Swinging over the stage with her legs spread, squirting in arcs as she flies.",
  solo:`On a pink swing wrapped in flowers, she swings out over the stage completely nude, her long legs spread wide and one hand between her thighs, squirting in glittering arcs every time she flies forward, with a serene, sultry smile at the crowd below.`,
  duo:`On a pink swing wrapped in flowers, the woman swings out over the stage completely nude with her legs spread while {partner} pushes her from behind, the woman squirting in glittering arcs with a serene, sultry smile.`,
  tags:"swing, flowers, spread legs, masturbation, squirting, pink, smile"}],
["kraken","The giant clam",{ex:"cool, otherworldly half-smile",pose:"reclining in a giant clam shell, drawing a rope of pearls between her legs",c1:{skinFinish:"glistening oiled skin"},w1:{neckAccessory:["pearl choker","-"]},
  set:"a candlelit masquerade gala stage with a giant gilded clam shell",act:"",blurb:"Reclining in a giant gilded clam shell on stage, slowly drawing a long rope of pearls between her legs as the bids climb.",
  solo:`On stage she reclines in a giant gilded clam shell lined with satin, completely nude and glistening with oil, her long hair spilling over the rim, and slowly draws a long rope of pearls in and out between her spread legs, the pearls glistening wet, while she gives the crowd a cool, otherworldly half-smile and the gilded board's numbers spin higher.`,
  duo:`On stage the woman reclines in a giant gilded clam shell lined with satin, completely nude and oiled, while {partner} kneels beside her, slowly drawing a long rope of pearls in and out between her spread legs; she gives the crowd a cool, otherworldly half-smile.`,
  tags:"clam shell, seashell, pearls, object insertion, spread legs, oiled, shiny skin, reclining, smile, spotlight"}],
["salmon","Stage waterfall",{ex:"poised, self-assured smile",pose:"arching back under a stage waterfall, legs spread",w1:{waistAccessory:["thin gold body chain draped over the hips","@metal"]},
  set:"a candlelit masquerade gala stage with a glittering stage waterfall",act:"",blurb:"Arching under a rose-lit stage waterfall with the water running down between her thighs, utterly composed while the bids race.",
  solo:`On stage she stands beneath a glittering curtain of falling water lit rose gold, completely nude except for a fine gold body chain over her hips, arching her back with her legs spread as the water streams over her freckled breasts and down between her thighs, and gives the crowd a poised, self-assured smile as the gilded board's numbers race upward.`,
  duo:`On stage the woman arches her back beneath a glittering stage waterfall, completely nude with her legs spread, while {partner} stands behind her running {his} hands down her wet, freckled body; she gives the crowd a poised, self-assured smile.`,
  tags:"waterfall, water, wet, standing, arched back, spread legs, body chain, freckles, smile, spotlight"}],
["crow","Every coin",{ex:"playful wink",pose:"kneeling in a pile of glittering coins, pouring them over her breasts",w1:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},
  set:"a candlelit masquerade gala stage heaped with glittering coins",act:"",blurb:"Kneeling nude in a glittering heap of the coins bid so far, pouring them over her breasts: every last one is hers.",
  solo:`On stage she kneels completely nude in a glittering heap of gold coins from the bids so far, pouring handfuls of them over her breasts so they cascade down her body and spill between her spread knees, and gives the crowd a playful wink as the gilded board climbs higher: she is keeping every one.`,
  duo:`On stage the woman kneels nude in a glittering heap of gold coins with {partner} kneeling behind her, the two of them pouring handfuls of coins over her breasts and between her spread knees; she gives the crowd a playful wink.`,
  tags:"coin, gold coin, treasure, kneeling, spread legs, pouring, pendant, one eye closed, wink, smile, spotlight"}]
  ]));

  /* ======================= Dungeon Trap (not explicit) ======================= */
  it("top",["adventurer's tunic torn to shreds","a few slime-eaten scraps of a tunic","frost-shattered scraps of a tunic","tunic sliced into ribbons","honey-soaked tunic",
    "glitter-drenched tunic","tunic singed and pinned full of arrows","frilly fox-themed costume conjured by a curse"],"S","costume");
  it("bottom",["shredded leather shorts"],"S","costume");
  it("outerwear",["tattered {c} cloak"],"CU","costume");
  it("legwear",["scuffed leather adventuring boots"],"CU","costume");
  it("heldItem",["short sword","flickering lantern"],"CU","costume");
  opt("expression",["flustered, furious blush","panicked but determined grimace","mortified, wide-eyed blush","helpless, sheepish laugh","indignant, appalled scowl"],GA);
  opt("posture",["dangling upside down in a rope net","stuck waist-deep in a vat of honey","kicking her legs out of a mimic chest's jaws","standing waist-deep in a slime pit, covering herself",
    "dangling upside down from a snare by one ankle","caught spread-eagled in a giant spider web","pinned to the wall by a ring of arrows",
    "sinking chest-deep in quicksand, reaching for a vine","treading water in a flooding chamber","standing in a frozen circle, covering herself and laughing",
    "posing awkwardly in a cursed costume","standing frozen, drenched in glitter and paint","balancing on one leg on a narrow ledge"],GA);
  opt("bodyMarkings",["frost glitters on her skin and eyelashes"],GA);
  const DUN={blushStyle:"heavy rosy cheek blush",skinFinish:"lightly sweaty, dewy skin"};
  const DT="dungeon, trap, adventurer, fantasy, embarrassed, torn clothes, fanservice";
  const W2F={top:["adventurer's tunic torn to shreds","@c1"],bottom:["shredded leather shorts","@dark"],legwear:["scuffed leather adventuring boots","@dark"],outerwear:["tattered {c} cloak","@c2"]};
  const W2M={top:["padded gambeson","@c1"],bottom:["rugged travel trousers","@dark"],legwear:["cuffed leather boots","@dark"],outerwear:["hooded travel cloak","@c2"]};
  soloSet("Academy Dungeon Trap","Academy Battle Maidens","trap",{oname:"Trapped",look:"costume",explicit:false,c1:DUN,pc:"surprised expression",tail:DT,w2f:W2F,w2m:W2M,tags:["dungeon","trap","fanservice","adventure"]},[
["griffin","Net trap",{ex:"flustered, furious blush",pose:"dangling upside down in a rope net",w1:{top:["adventurer's tunic torn to shreds","@c1"],bottom:["shredded leather shorts","@dark"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a torchlit dungeon corridor",blurb:"Silly: scooped up in a rope net and dangling upside down, tunic flipped over her head and her sword just out of reach.",
  solo:`In a torchlit dungeon corridor, the woman dangles upside down in a rope net that snapped shut around her, her shredded tunic flopped down over her chest and her legs tangled in the ropes, reaching furiously for her short sword lying just out of reach on the flagstones below, her face bright red with a flustered, furious blush.`,
  duo:`In a torchlit dungeon corridor, the woman and {partner} dangle upside down together in the same rope net, tangled in a heap, the woman's shredded tunic flopped down over her chest as she blushes furiously.`,
  tags:"net, rope, upside-down, hanging, tangled, sword, flustered, blush, angry, torch"}],
["badger","Honey vat",{ex:"mortified, wide-eyed blush",pose:"stuck waist-deep in a vat of honey",w1:{top:["honey-soaked tunic","@c1"]},
  set:"a cellar dungeon with a giant vat of honey",blurb:"Silly: fell into a giant vat of honey, stuck waist-deep, tunic soaked see-through, bees buzzing.",
  solo:`In a cellar dungeon, the woman is stuck waist-deep in a giant vat of golden honey after a trapdoor dropped her in, her honey-soaked tunic plastered see-through to her chest, strings of honey dripping from her hair and fingers as she tries to climb out, a cloud of curious bees buzzing around her and her face frozen in a mortified, wide-eyed blush.`,
  duo:`In a cellar dungeon, the woman and {partner} are stuck waist-deep in a giant vat of golden honey, their tunics soaked see-through, honey dripping from their hair as they try to haul each other out, bees buzzing around them.`,
  tags:"honey, sticky, vat, stuck, wet clothes, see-through, bee, dripping, embarrassed, blush"}],
["raven","Mimic chest",{ex:"indignant, appalled scowl",pose:"kicking her legs out of a mimic chest's jaws",w1:{top:["adventurer's tunic torn to shreds","@c1"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a dusty dungeon library vault",blurb:"Silly: a mimic treasure chest snapped shut on her and swallowed her to the waist, legs kicking.",
  solo:`In a dusty dungeon library vault, a toothy mimic treasure chest has snapped shut around the woman's waist, swallowing her from the hips up so only her kicking legs and the torn hem of her tunic stick out of its jaws, gold coins spilling around, while a speech bubble from inside the chest reads "Let me OUT, you overgrown jewelry box!".`,
  duo:`In a dusty dungeon library vault, {partner} grabs the woman's kicking legs and pulls with all {his} strength as a toothy mimic treasure chest clamps around her waist, gold coins spilling everywhere.`,
  tags:"mimic, treasure chest, stuck, legs, kicking, gold coin, comedy, speech bubble, library"}],
["serpent","Slime pit",{ex:"indignant, appalled scowl",pose:"standing waist-deep in a slime pit, covering herself",w1:{top:["a few slime-eaten scraps of a tunic","@c1"]},
  set:"a dripping dungeon chamber with a pit of green slime",blurb:"Embarrassing: a clothes-eating slime has dissolved nearly everything she wore.",
  solo:`In a dripping dungeon chamber, the woman stands waist-deep in a pit of glowing green slime that has dissolved almost all of her clothes, only a few slime-eaten scraps of her tunic left clinging to her, one arm across her chest and the other hand flung out in outrage, her face twisted into an indignant, appalled scowl as green goo drips from her hair.`,
  duo:`In a dripping dungeon chamber, the woman and {partner} stand waist-deep in a pit of glowing green slime that has eaten nearly all their clothes, covering themselves with their arms, the woman glaring in indignant outrage.`,
  tags:"slime, clothes-melting slime, green slime, covering breasts, torn clothes, angry, glare, dripping"}],
["wolf","Snare",{ex:"panicked but determined grimace",pose:"dangling upside down from a snare by one ankle",w1:{top:["adventurer's tunic torn to shreds","@c1"],bottom:["shredded leather shorts","@dark"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a cavern over a dark chasm",blurb:"Perilous: snared by one ankle and swung out over a dark chasm, tunic falling away.",
  solo:`In a cavern, the woman dangles upside down by one ankle from a rope snare swinging out over a dark chasm, her shredded tunic falling down around her shoulders, one arm stretched toward the rock ledge and her teeth gritted in a panicked but determined grimace as pebbles tumble into the darkness below.`,
  duo:`In a cavern, the woman dangles upside down by one ankle from a rope snare out over a dark chasm while {partner} lies flat on the ledge, gripping her wrist to haul her back, her shredded tunic falling down around her shoulders.`,
  tags:"snare, upside-down, hanging, chasm, cliff, danger, gritted teeth, determined, torn clothes"}],
["swan","Spider web",{ex:"panicked but determined grimace",pose:"caught spread-eagled in a giant spider web",w1:{top:["adventurer's tunic torn to shreds","@c1"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a cobwebbed dungeon hall",blurb:"Perilous: caught mid-leap in a giant spider web as an enormous spider lowers itself toward her.",
  solo:`In a cobwebbed dungeon hall, the woman is stuck spread-eagled in a giant sticky spider web, caught mid-leap like a ballerina, her torn tunic snagged away in strands of silk, struggling against the threads with a panicked but determined grimace as an enormous spider lowers itself toward her from the shadows above.`,
  duo:`In a cobwebbed dungeon hall, the woman is stuck spread-eagled in a giant spider web while {partner} hacks at the sticky strands with a sword, an enormous spider lowering itself from the shadows above them.`,
  tags:"spider web, giant spider, stuck, spread eagle, torn clothes, danger, struggling, dark"}],
["dragon","Arrow trap",{ex:"flustered, furious blush",pose:"pinned to the wall by a ring of arrows",w1:{top:["tunic singed and pinned full of arrows","@c1"]},
  set:"a dungeon gallery of arrow slits",blurb:"Perilous: a volley of arrows pinned her tunic to the wall in a perfect outline and tore most of it away.",
  solo:`In a dungeon gallery lined with arrow slits, the woman stands pinned flat against the stone wall by a perfect ring of arrows that outline her body and have shot most of her tunic away, a few arrows still quivering beside her ears, her chest heaving and her face blazing with a flustered, furious blush.`,
  duo:`In a dungeon gallery lined with arrow slits, the woman and {partner} stand pinned side by side against the stone wall by a perfect outline of arrows that shot most of their clothes away, the woman blazing with a flustered, furious blush.`,
  tags:"arrow, pinned, against wall, torn clothes, danger, angry, blush, heavy breathing"}],
["stag","Quicksand",{ex:"panicked but determined grimace",pose:"sinking chest-deep in quicksand, reaching for a vine",w1:{top:["adventurer's tunic torn to shreds","@c1"],headwear:["flower crown","@c1"]},
  set:"an overgrown jungle ruin in the dungeon",blurb:"Perilous: sinking chest-deep in quicksand in an overgrown ruin, straining for a hanging vine.",
  solo:`In an overgrown jungle ruin deep in the dungeon, the woman is sinking chest-deep in quicksand, her torn tunic dragged down into the mud, stretching one long arm up toward a hanging vine just out of reach with a panicked but determined grimace, her flower crown askew.`,
  duo:`In an overgrown jungle ruin, the woman is sinking chest-deep in quicksand while {partner} leans out from a fallen pillar, reaching for her outstretched hand, her torn tunic dragged down into the mud.`,
  tags:"quicksand, sinking, mud, jungle, ruins, vines, reaching, danger, torn clothes, flower crown"}],
["shark","Flooding chamber",{ex:"helpless, sheepish laugh",pose:"treading water in a flooding chamber",c1:{skinFinish:"wet skin with water droplets"},w1:{top:["adventurer's tunic torn to shreds","@c1"]},
  set:"a sealed stone chamber flooding with water",blurb:"Perilous: sealed in a flooding chamber with the water at her chin, and laughing about it, because she's a shark girl.",
  solo:`In a sealed stone chamber, water gushes from the walls and the woman treads water with it already up to her chin, her torn tunic floating away around her, her wet hair fanned out on the surface, and she laughs despite herself with a sharp-toothed grin, as if a flooding room were the least scary thing a shark could face.`,
  duo:`In a sealed stone chamber flooding with water, the woman and {partner} tread water with it up to their chins, torn clothes floating away around them, the woman laughing with a sharp-toothed grin while {partner} pounds on the sealed door.`,
  tags:"flooding, water, partially submerged, treading water, wet, torn clothes, sharp teeth, laughing, danger"}],
["penguin","Frost rune",{ex:"helpless, sheepish laugh",pose:"standing in a frozen circle, covering herself and laughing",
  c1:{skinFinish:"lightly sweaty, dewy skin",bodyMarkings:"frost glitters on her skin and eyelashes"},w1:{top:["frost-shattered scraps of a tunic","@c1"],neckAccessory:["chunky knit scarf","@accent"]},
  set:"an icy dungeon vault glittering with frost",blurb:"Embarrassing (and pretty): a frost rune flash-froze her clothes, which shattered into glittering shards, all except her orange scarf.",
  solo:`In an icy dungeon vault, the woman stepped on a glowing frost rune that flash-froze her clothes solid, and now stands in a circle of frost as her tunic shatters into glittering ice shards around her, leaving only a few scraps and her chunky orange knit scarf, which somehow survived intact. Frost sparkles on her eyelashes and freckles, her breath puffs in little clouds, and she covers herself with her arms while laughing helplessly at the absurdity, cheeks rosy, heterochromatic eyes shining.`,
  duo:`In an icy dungeon vault, the woman and {partner} stand in a circle of frost from a glowing frost rune as their frozen clothes shatter into glittering ice shards, leaving only scraps and the woman's chunky orange knit scarf; the woman covers herself and laughs helplessly, cheeks rosy, while {partner} stares in disbelief.`,
  tags:"ice, frost, frozen, magic circle, rune, ice shards, sparkle, scarf, covering breasts, torn clothes, laughing, blush, visible breath, snow"}],
["fox","Cursed costume",{ex:"mortified, wide-eyed blush",pose:"posing awkwardly in a cursed costume",w1:{top:["frilly fox-themed costume conjured by a curse","@c1"],headwear:["fluffy fox ear headband","@hair"]},
  set:"a dungeon shrine with a glowing curse circle",blurb:"Embarrassing: a curse rune turned her armor into a tiny frilly fox costume, ears and all.",
  solo:`In a dungeon shrine, a glowing curse circle has transformed the woman's armor into a tiny, frilly fox-themed costume with fluffy fox ears, barely covering anything, and the curse forces her into a cutesy pose, one hand making a fox shape beside her face, while her face burns with a mortified, wide-eyed blush and a speech bubble reads "This is NOT funny!".`,
  duo:`In a dungeon shrine, a glowing curse circle has turned the woman's and {partner}'s armor into tiny frilly matching fox costumes with fluffy ears, forcing them into cutesy poses side by side, the woman mortified and blushing.`,
  tags:"curse, magic circle, transformation, costume, frills, fox ears, fox shadow puppet, embarrassed, blush, speech bubble, comedy"}],
["lovebird","Tickle trap",{ex:"helpless, sheepish laugh",pose:"stuck in a wooden pillory, laughing helplessly",w1:{top:["adventurer's tunic torn to shreds","@c1"],bottom:["shredded leather shorts","@dark"],headwear:["ribbon bows tied at the twintails","@accent"]},
  set:"a dungeon chamber full of enchanted feather dusters",blurb:"Silly: locked in a wooden pillory while enchanted feather dusters tickle her senseless and pick her tunic apart.",
  solo:`In a dungeon chamber, the woman is locked in a wooden pillory by her neck and wrists, bent forward with her twintails dangling, while a swarm of enchanted feather dusters tickles her sides, armpits and bare feet and plucks her tunic into shreds. She laughs helplessly with tears in the corners of her eyes and blush stickers on her cheeks, kicking her feet and squealing "Nooo, not there, hahaha!" in a speech bubble.`,
  duo:`In a dungeon chamber, the woman and {partner} are locked side by side in a wooden pillory while enchanted feather dusters tickle them senseless and pluck their clothes into shreds, the woman laughing helplessly with tears in her eyes.`,
  tags:"pillory, stocks, tickling, feather duster, feathers, laughing, tears, barefoot, torn clothes, bent over, twintails, blush stickers, speech bubble, comedy"}],
["flamingo","Pendulum blades",{ex:"panicked but determined grimace",pose:"balancing on one leg on a narrow ledge",w1:{top:["tunic sliced into ribbons","@c1"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a pendulum hall over a bottomless pit",blurb:"Perilous: balancing on one leg on a narrow ledge as swinging blades slice her tunic into ribbons.",
  solo:`In a hall of swinging pendulum blades above a bottomless pit, the woman balances on one leg on a narrow stone ledge like a flamingo, arms out, as the giant blades whoosh past inches from her and slice her tunic into fluttering ribbons, her face set in a panicked but determined grimace.`,
  duo:`In a hall of swinging pendulum blades above a bottomless pit, the woman and {partner} balance back to back on a narrow stone ledge as the giant blades whoosh past and slice their clothes into fluttering ribbons.`,
  tags:"pendulum, blade, trap, bottomless pit, balancing, standing on one leg, torn clothes, danger, determined"}],
["kraken","The octopus's garden",{ex:"amused, unbothered smile",pose:"standing waist-deep in a grotto, covering herself, amused",w1:{top:["adventurer's tunic torn to shreds","@c1"]},
  set:"a flooded sea-cave grotto glowing with bioluminescence",blurb:"Silly: a giant, friendly octopus has stolen nearly everything she wore and is juggling it, delighted to meet a cousin.",
  solo:`In a flooded sea-cave grotto glowing with teal bioluminescence, the woman stands waist-deep in the water, covering her bare breasts with one arm, while a giant, friendly octopus rises behind her juggling her stolen boots, sword belt and most of her tunic in its tentacles, delighted to have met a cousin. Only a few torn scraps of her tunic still cling to her. She looks up at it with an amused, unbothered smile and says "Give those back, cousin" in a speech bubble.`,
  duo:`In a flooded sea-cave grotto glowing with teal bioluminescence, the woman and {partner} stand waist-deep in the water covering themselves while a giant, friendly octopus juggles their stolen clothes in its tentacles; {partner} is mortified, but the woman just smiles, amused.`,
  tags:"cave, grotto, bioluminescence, octopus, giant octopus, tentacles, stolen clothes, partially submerged, covering breasts, torn clothes, smile, comedy, speech bubble"}],
["salmon","Against the current",{ex:"panicked but determined grimace",pose:"clinging to a rock in a rushing magical current",w1:{top:["tunic sliced into ribbons","@c1"],legwear:["scuffed leather adventuring boots","@dark"]},
  set:"a flooded dungeon river tunnel glowing with enchanted water",blurb:"Perilous: swept into an enchanted underground river that only flows uphill, clinging to a rock while the current strips her tunic to ribbons. Swimming upstream was supposed to be her thing.",
  solo:`In a flooded dungeon tunnel, an enchanted river glowing rose-gold roars uphill past her, and the woman clings to a slick rock in the middle of the rushing current with both arms, her tunic torn to fluttering ribbons that barely cover her and her long salmon hair streaming out behind her. She grits her teeth with a panicked but determined grimace, hauling herself upward, and growls "I was BORN for this" in a speech bubble.`,
  duo:`In a flooded dungeon tunnel, an enchanted river roars uphill, and the woman and {partner} cling to the same slick rock in the rushing current, their clothes torn to ribbons; the woman grits her teeth with a panicked but determined grimace.`,
  tags:"river, water, current, splashing, rock, clinging, wet, wet hair, torn clothes, determined, clenched teeth, speech bubble, magic"}],
["crow","Too shiny",{ex:"helpless, sheepish laugh",pose:"buried chest-deep in a pile of gold coins, clutching a gem",w1:{top:["adventurer's tunic torn to shreds","@c1"]},
  set:"a glittering dungeon treasure vault",blurb:"Silly: she could not resist the biggest gem on the pedestal, the vault tipped its whole hoard on top of her and swallowed her clothes, and she is still holding the gem.",
  solo:`In a glittering dungeon treasure vault, the woman sits buried chest-deep in an avalanche of gold coins that poured from the ceiling the moment she lifted the biggest gem off its pedestal, her tunic swallowed by the hoard except for a few torn scraps, coins sliding off her bare shoulders. She holds the enormous gem up triumphantly in one hand anyway, with a helpless, sheepish laugh, saying "Worth it" in a speech bubble.`,
  duo:`In a glittering dungeon treasure vault, the woman and {partner} sit buried chest-deep in an avalanche of gold coins, their clothes swallowed by the hoard; the woman holds up an enormous gem with a helpless, sheepish laugh while {partner} glares at her.`,
  tags:"treasure, gold coin, gem, holding gem, pedestal, partially buried, torn clothes, laughing, sheepish, comedy, speech bubble"}]
  ]);
})();

/* ---- v144 (v151: Salmon and Crow): three exhibitionist sets for the Academy girls, all off campus (night streets, trains, rooftops, venues):
     "Academy Public Exhibition"   (Adult)  solo first: she shows herself off in public; optional partner joins her
     "Academy Public Masturbation" (Adult)  solo first: she touches herself in public; optional partner helps
     "Academy Public Sex"          (Scenes) with her Academy Men boyfriend, swappable like the other scene sets
   Everyone involved is a willing adult; bystanders stay in the background. Clothing is pushed aside with
   accessory-style items (shoulder, waist, legwear) where possible so the intimate details stay in the prompt.
   Penguin's three scenes share one winter-resort story: snow angel, fireside lodge, chairlift. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","standing on the rocks below a lighthouse, arms raised to the beam","Explicit (adult)");
  START.option("posture","lounging on a deck chair, one leg up, a hand between her thighs","Explicit (adult)");
  START.option("posture","straddling her lover in a crowded outdoor mixed bath","Explicit (adult)");
  const G="Explicit (adult)";
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t,fam));
  const opt=(f,list,g)=>list.forEach(v=>START.option(f,v,g||G));
  const tl=(a,b)=>[...new Set((a+", "+b).split(/,\s*/).filter(Boolean))].join(", ");
  const ORD=h=>ACAD.HOUSES.indexOf(h);
  /* v151: Salmon and Crow */
  ["posing nude beneath a giant billboard of herself","perched on a rooftop ledge, nude, arms spread like wings","reclining in a rowboat under a footbridge, a hand between her thighs",
   "curled in a velvet armchair in an antique shop, a hand under her skirt","bent over a prep counter behind a noren curtain, hand over her mouth",
   "straddling her lover in the back row of a planetarium"].forEach(v=>START.option("posture",v,G));
  START.item("legwear","black high heels","CU","glam");

  /* ---------- shared items ---------- */
  it("shoulderPiece",["{c} trench coat held wide open","white fur stole slipping from the shoulders to the elbows","{c} yukata pulled wide open and slipping from the shoulders",
    "{c} ski jacket unzipped and hanging open off the shoulders","{c} leather jacket slipping open from the shoulders","{c} blouse pulled open and slipping from the shoulders",
    "long {c} coat draped loosely over the shoulders","sheer {c} silk robe slipping from the shoulders"],"CU","casual,glam");
  it("waistAccessory",["{c} skirt hiked up around the waist","{c} sundress rucked up around the waist","{c} evening gown hiked up around the waist",
    "{c} tulle skirt bunched up around the waist","{c} cocktail dress hiked up around the waist","{c} leotard peeled down to the waist",
    "{c} sarong untied and falling open at the hips"],"CU","casual,glam");
  it("legwear",["pulled-down {c} panties around one ankle","leggings pulled down to the knees","leather pants pulled down to the thighs",
    "snow pants pushed down to the thighs","black high heels","gold stiletto heels","stiletto heels","white sneakers","running shoes",
    "wooden geta sandals","lace-up combat boots","thigh-high stockings","fishnet stockings","satin pointe shoes with ribbons laced up the ankles"],"CU","casual,glam");
  it("thighAccessory",["tugged-down {c} bikini bottoms around one thigh"],"CU","casual");
  it("headwear",["peacock feather headpiece","ski goggles pushed up on the forehead","sports headband","knit pom-pom beanie","flower crown",
    "fox mask worn on the side of the head","fluffy fox ear headband","silk sleep mask pushed up on the forehead"],"CU","casual,glam");
  it("gloves",["fluffy knit mittens","{c} satin opera gloves reaching past the elbows"],"CU","casual,glam");
  it("tagCharm",["tiny penguin charm on the zipper"],"CU","casual");
  it("heldItem",["mug of hot cocoa topped with marshmallows","karaoke microphone","pink cocktail with a paper umbrella","large clear umbrella",
    "bowl of buttered popcorn","open book of poetry","crystal glass dildo","pink rabbit vibrator","remote control for a vibrating egg"],"CU","casual,glam");
  it("neckAccessory",["{c} feather boa","chunky knit scarf","chunky chain necklace"],"CU","glam");
  it("top",["fuzzy knit sweater","cable-knit sweater","sheer blouse unbuttoned to the navel","micro cropped hoodie unzipped to the navel"],"CU","casual");
  it("bottom",["pleated skirt hiked up to the waist","denim shorts unbuttoned and pushed down","long skirt hiked up over the knees","pencil skirt hiked up to the waist"],"CU","casual");
  addMO("bottom",[["ski pants pushed down to the thighs","CU","sporty"],["swim trunks pulled down to the thighs","CU","casual"]]);
  addMO("headwear",[["ski goggles pushed up on the forehead","CU","sporty"]]);

  opt("expression",["bright red, nervous but thrilled smile","haughty, imperious smirk","fierce, exhilarated grin","breathless, giggling grin with rosy cheeks",
    "lip-biting, stifled moan","shushing giggle with a finger to her lips","haughty, half-lidded smirk","breathless, cocky grin","sneaky, giggling wink",
    "hand clamped over her mouth, eyes wide with thrill"]);
  opt("bodyMarkings",["colorful painted flowers and hearts across her bare skin"]);

  /* ---------- solo-first builder (as in v143), with per-scene partner outfits ---------- */
  function soloSet(label,after,suf,cfg,rows){
    START.add(label,rows.map(([h,name,x])=>{
      const rb=tplById(h+"robes");
      const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const c1=Object.assign({},cfg.c1||{},x.c1||{},{expression:x.ex,posture:x.pose});
      return{id:h+suf,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname:cfg.oname,look:cfg.look,items:res(x.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:true,lewdtag:true,
          must:`an anime style with high detail, ${x.set}, and particular emphasis on highly detailed skin, hair and eyes`,
          pair:{id:"",outfit:"scene",solo:`${x.solo} ${tl(cfg.tail,x.tags)}`,scene:`${x.duo} ${tl(cfg.tailDuo||cfg.tail,x.tags)}`,soloCount:cfg.soloCount||"",
            act:x.act||"",dir:x.dir||cfg.dir||"mutual",explicit:true,penis:false,pc:{expression:x.pc||cfg.pc,posture:null},c1,
            w1:{name:cfg.oname,look:cfg.look,f:x.w1||{}},w2:{name:cfg.oname,look:cfg.look,f:x.w2f||{},m:x.w2m||{}},compact:false,fit:true}},
        tags:cfg.tags.concat([h]),blurb:`${x.blurb} Solo by default; pick a partner in the Scene tab to add one.`};
    }),{after});
    const bad=[];
    rows.forEach(([h,n,x])=>{[x.w1,x.w2f,x.w2m].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(h+": "+f+" “"+a[0]+"”")}));
      [["expression",x.ex],["posture",x.pose],["expression",x.pc||cfg.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(h+": "+f+" “"+v+"”")})});
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }

  /* ======================= Public Exhibition ======================= */
  opt("posture",["flinging her trench coat wide open under a streetlamp","riding a bicycle nude, waving","walking nude in the rain under a clear umbrella",
    "striding through a hotel lobby, chin raised","jogging nude along a waterfront path","dancing an arabesque in a plaza fountain",
    "standing on a rooftop ledge, arms spread wide","riding a white horse bareback","standing at the end of a pier, arms raised to dive",
    "lying in fresh snow, making a snow angel","pulling her yukata wide open on festival steps","strutting down a runway, hand on her hip",
    "balancing in a tree pose on one leg"]);
  const EXPO={blushStyle:"heavy aroused blush",lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",
    vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"her thighs glisten with dripping love juices"};
  const ET="public nudity, exhibitionism, completely nude, looking at viewer";
  soloSet("Academy Public Exhibition","Academy Highest Bidder","exhib",{oname:"In public",look:"glam",c1:EXPO,pc:"seductive smile",tail:ET,soloCount:"1girl, solo focus",
    tags:["public","exhibitionism","nudity","explicit"]},[
["griffin","Trench coat flash",{ex:"bright red, nervous but thrilled smile",pose:"flinging her trench coat wide open under a streetlamp",
  w1:{shoulderPiece:["{c} trench coat held wide open","camel"],legwear:["black high heels","-"]},w2f:{shoulderPiece:["{c} trench coat held wide open","camel"]},
  set:"a lamplit city street at night",blurb:"Under a streetlamp at night, flinging her trench coat wide open to show you she's wearing nothing underneath.",
  solo:`On a lamplit city street at night, the woman stands under a streetlamp and flings her camel trench coat wide open to show the viewer she is completely nude underneath, wearing only black high heels. Her face burns bright red and she bites her lip with a nervous but thrilled smile, knees pressed together, nipples hard in the cool air, while a couple of late-night passersby stop and stare in the background.`,
  duo:`On a lamplit city street at night, the woman and {partner} stand side by side under a streetlamp and fling their coats wide open to show the viewer they are completely nude underneath; the woman blushes bright red with a nervous but thrilled smile while late-night passersby stare.`,
  tags:"flashing, trench coat, open coat, naked coat, high heels, street, night, streetlamp, blush, nervous smile, public indecency"}],
["badger","Naked bike ride",{ex:"sweet, giggly smile with her tongue out",pose:"riding a bicycle nude, waving",c1:{bodyMarkings:"colorful painted flowers and hearts across her bare skin"},
  w1:{legwear:["white sneakers","-"],headwear:["flower crown","@c1"]},
  set:"a sunny city street during a naked bike ride",blurb:"Pedalling through the city in a naked bike ride, painted with flowers and hearts, waving at you.",
  solo:`On a sunny city street during a naked bike ride, the woman pedals a vintage bicycle with a flower basket, completely nude except for white sneakers and a flower crown, painted flowers and hearts decorating her bare skin and her breasts bouncing. She waves at the viewer with a sweet, giggly smile and her tongue peeking out, cheeks pink, as a crowd of other nude cyclists rides behind her and onlookers cheer from the sidewalks.`,
  duo:`On a sunny city street during a naked bike ride, the woman and {partner} pedal a tandem bicycle completely nude, painted with flowers and hearts, while other nude cyclists ride behind them; the woman waves at the viewer with a sweet, giggly smile and her tongue peeking out.`,
  tags:"bicycle, riding bicycle, naked bike ride, body paint, flower basket, sneakers, bouncing breasts, waving, giggling, tongue out, street, crowd, day"}],
["raven","Rain walk",{ex:"half-lidded sultry gaze",pose:"walking nude in the rain under a clear umbrella",c1:{skinFinish:"wet skin with water droplets"},
  w1:{heldItem:["large clear umbrella","-"],legwear:["stiletto heels","@dark"]},
  set:"a rain-slicked neon street at night",blurb:"Walking a rainy neon street at night in nothing but heels, under a clear umbrella.",
  solo:`On a rain-slicked neon street at night, the woman walks completely nude under a large clear umbrella, wearing nothing but stiletto heels, raindrops beading on her skin and neon signs reflecting in the puddles. She glances back at the viewer over her shoulder with a half-lidded, sultry gaze, utterly unhurried, while people huddled under an awning across the street stare open-mouthed.`,
  duo:`On a rain-slicked neon street at night, the woman and {partner} walk arm in arm completely nude under one large clear umbrella, neon reflecting in the puddles; the woman glances back at the viewer with a half-lidded, sultry gaze.`,
  tags:"rain, umbrella, transparent umbrella, wet, high heels, walking, looking back, neon lights, city, night, puddle, reflection"}],
["serpent","Lobby in furs",{ex:"haughty, imperious smirk",pose:"striding through a hotel lobby, chin raised",
  w1:{shoulderPiece:["white fur stole slipping from the shoulders to the elbows","-"],legwear:["stiletto heels","@metal"],earAccessory:["large hoop earrings","@metal"]},
  set:"the marble lobby of a grand hotel",blurb:"Striding through a grand hotel lobby in nothing but heels, hoops and a fur stole, chin raised.",
  solo:`Across the marble lobby of a grand hotel, the woman strides toward the viewer completely nude except for stiletto heels, large hoop earrings and a white fur stole slipping down off her elbows, chin raised with a haughty, imperious smirk, while the stunned concierge drops his pen and guests in evening wear gape from the velvet sofas.`,
  duo:`Across the marble lobby of a grand hotel, the woman strides toward the viewer on {partner}'s arm, both completely nude, her white fur stole slipping off her elbows and her chin raised with a haughty, imperious smirk, while guests in evening wear gape.`,
  tags:"hotel, lobby, marble floor, chandelier, fur stole, high heels, hoop earrings, walking towards viewer, smirk, confident, luxury"}],
["wolf","Dawn run",{ex:"playful fanged grin",pose:"jogging nude along a waterfront path",c1:{skinFinish:"wet, sweat-glistening skin"},
  w1:{legwear:["running shoes","@c1"],headwear:["sports headband","@c1"]},
  set:"a waterfront running path at dawn",blurb:"A dawn run along the waterfront in nothing but running shoes, grinning back at you.",
  solo:`On a waterfront running path at dawn, the woman jogs completely nude except for her running shoes and a sweatband, her toned body glistening with sweat and her breasts bouncing with each stride, and flashes the viewer a cocky, fanged grin over her shoulder as two early joggers do a double take behind her.`,
  duo:`On a waterfront running path at dawn, the woman and {partner} jog side by side completely nude except for their running shoes, glistening with sweat, and the woman flashes the viewer a cocky, fanged grin as early joggers do a double take.`,
  tags:"jogging, running, sweat, running shoes, sweatband, bouncing breasts, waterfront, sunrise, athletic, toned, grin, fang"}],
["swan","Fountain ballet",{ex:"serene, half-lidded look",pose:"dancing an arabesque in a plaza fountain",c1:{skinFinish:"wet skin with water droplets"},
  w1:{earAccessory:["pearl drop earrings","-"],legwear:["satin pointe shoes with ribbons laced up the ankles","pale pink"]},
  set:"a lantern-lit city plaza fountain at night",blurb:"Dancing an arabesque in a plaza fountain at night, nude but for her pointe shoes.",
  solo:`In a lantern-lit city plaza at night, the woman dances completely nude in the shallow basin of a grand fountain, holding a perfect arabesque in her satin pointe shoes as the jets arc around her and water streams down her skin, gazing at the viewer with a serene, half-lidded look while couples on an evening stroll stop to watch, transfixed.`,
  duo:`In a lantern-lit city plaza at night, the woman and {partner} dance a nude pas de deux in the basin of a grand fountain, the woman held in a perfect arabesque in her pointe shoes as the jets arc around them, gazing at the viewer with a serene, half-lidded look.`,
  tags:"fountain, ballet, arabesque, pointe shoes, dancing, wet, water, plaza, night, lantern, splashing"}],
["dragon","Rooftop ledge",{ex:"fierce, exhilarated grin",pose:"standing on a rooftop ledge, arms spread wide",
  w1:{legwear:["lace-up combat boots","@dark"],neckAccessory:["chunky chain necklace","@metal"]},
  set:"a skyscraper rooftop at night beside a giant billboard",blurb:"Arms spread on a skyscraper ledge at night, in front of a giant billboard and every window across the street.",
  solo:`On the ledge of a skyscraper rooftop at night, framed by a giant glowing billboard, the woman stands completely nude except for her combat boots and a chunky chain necklace, arms spread wide against the wind and hair whipping behind her, while office workers in the lit windows of the tower across the street press against the glass to stare. She looks down at the viewer with a fierce, exhilarated grin.`,
  duo:`On the ledge of a skyscraper rooftop at night, framed by a giant glowing billboard, the woman and {partner} stand completely nude with their arms spread wide against the wind, while office workers in the tower across the street stare; the woman looks down at the viewer with a fierce, exhilarated grin.`,
  tags:"rooftop, ledge, billboard, cityscape, night, wind, outstretched arms, combat boots, chain necklace, windows, grin, from below"}],
["stag","Lady Godiva",{ex:"dreamy expression",pose:"riding a white horse bareback",w1:{headwear:["flower crown","@c1"]},
  set:"the cobbled square of a flower-decked village",blurb:"A Lady Godiva ride through a flower-decked village square, her long hair hiding almost nothing.",
  solo:`Through the cobbled square of a flower-decked village, the woman rides a white horse bareback in the manner of Lady Godiva, completely nude except for a flower crown, her very long hair spilling over one shoulder and hiding almost nothing. She smiles dreamily at the viewer while the tavern crowd spills out of the doorway to watch, mugs raised.`,
  duo:`Through the cobbled square of a flower-decked village, the woman rides a white horse bareback, completely nude in the manner of Lady Godiva, while {partner} walks beside the horse holding the reins, also nude; the woman smiles dreamily at the viewer as the tavern crowd spills out to watch.`,
  tags:"horse, horseback riding, bareback, white horse, lady godiva, very long hair, village, cobblestone, flowers, flower crown, smile, day"}],
["shark","Pier dive",{ex:"teasing tongue-out expression",pose:"standing at the end of a pier, arms raised to dive",c1:{skinFinish:"wet skin with water droplets"},
  w1:{earAccessory:["small shark tooth earrings","-"]},
  set:"the end of a weathered pier at sunset",blurb:"Poised on the end of a pier at sunset, nude and about to dive, while the fishermen forget their rods.",
  solo:`At the end of a weathered pier at sunset, the woman stands completely nude on the very edge, arms raised over her head, about to dive into the sea, her wet hair plastered down her back, aiming a teasing, sharp-toothed grin at the viewer with her tongue out, while fishermen along the railing drop their rods and gawk.`,
  duo:`At the end of a weathered pier at sunset, the woman and {partner} stand completely nude on the edge hand in hand, about to dive into the sea together, the woman aiming a teasing, sharp-toothed grin at the viewer while fishermen along the railing gawk.`,
  tags:"pier, ocean, sunset, arms up, about to dive, wet, wet hair, sharp teeth, tongue out, grin, fishing rod"}],
["penguin","Snow angel",{ex:"breathless, giggling grin with rosy cheeks",pose:"lying in fresh snow, making a snow angel",
  c1:{skinFinish:"lightly sweaty, dewy skin",bodyMarkings:"snowflakes melt on her steaming, rosy skin"},
  w1:{neckAccessory:["chunky knit scarf","@accent"],headwear:["knit pom-pom beanie","ice blue"],gloves:["fluffy knit mittens","white"]},
  w2f:{neckAccessory:["chunky knit scarf","@accent"],gloves:["fluffy knit mittens","white"]},w2m:{neckAccessory:["knit scarf","@accent"]},
  set:"fresh powder snow outside a glowing ski lodge under a full moon",blurb:"Making a nude snow angel under a full moon outside the ski lodge, in just her orange scarf, beanie and mittens.",
  solo:`Under a full moon outside a glowing ski lodge, the woman lies on her back in fresh powder snow, completely nude except for her chunky orange knit scarf, an ice blue pom-pom beanie and fluffy white mittens, sweeping her arms and legs wide to make a snow angel. Steam rises from her warm skin, snowflakes melt on her freckles and her breath puffs in little clouds as she giggles up at the viewer with rosy cheeks and shining eyes, while lodge guests in the steaming hot tub on the deck cheer and whistle.`,
  duo:`Under a full moon outside a glowing ski lodge, the woman and {partner} lie side by side in fresh powder snow, completely nude except for scarves and mittens, making snow angels and holding hands; steam rises from their skin and the woman giggles up at the viewer with rosy cheeks while lodge guests in the hot tub cheer.`,
  tags:"snow angel, lying in snow, on back, snow, full moon, night, ski lodge, scarf, beanie, mittens, steam, visible breath, freckles, giggling, blush, spread arms, spread legs, from above, hot tub"}],
["fox","Festival flash",{ex:"sly, fox-like smirk",pose:"pulling her yukata wide open on festival steps",
  w1:{shoulderPiece:["{c} yukata pulled wide open and slipping from the shoulders","@c1"],headwear:["fox mask worn on the side of the head","white"],legwear:["wooden geta sandals","-"]},
  w2f:{shoulderPiece:["{c} yukata pulled wide open and slipping from the shoulders","@c1"]},w2m:{top:["dark men's yukata with a slim {c2} obi","-"]},
  set:"a lantern-lit stone stairway above a night festival",blurb:"Pulling her yukata wide open on the shrine steps as the fireworks go off, a fox mask on her head.",
  solo:`At a summer festival at night, on a lantern-lit stone stairway above the crowded food stalls, the woman pulls her yukata wide open to show the viewer she is completely nude beneath, a fox mask tilted on the side of her head, as fireworks burst overhead and light up her bare skin. She winks with a sly, fox-like smirk while the festival crowd below gazes up at the fireworks, oblivious.`,
  duo:`At a summer festival at night, on a lantern-lit stone stairway, the woman pulls her yukata wide open to show the viewer she is completely nude beneath while {partner} stands behind her, holding the fabric open, as fireworks burst overhead; she winks with a sly, fox-like smirk.`,
  tags:"summer festival, yukata, open yukata, flashing, fox mask, mask on head, fireworks, paper lantern, stairs, night, wink, smirk, geta"}],
["lovebird","Ice cream truck",{ex:"sparkling-eyed excited expression",pose:"standing at an ice cream truck window, pointing at the menu",
  w1:{headwear:["ribbon bows tied at the twintails","@accent"],legwear:["thigh-high socks with bows","@secondary"]},
  set:"a late-night ice cream truck parked outside a nightclub",blurb:"Nude at an ice cream truck's window at midnight, pointing at the menu: \"One creamsicle, please♡\"",
  solo:`In the pastel glow of a late-night ice cream truck parked outside a nightclub, the woman stands at the service window completely nude except for her ribbon bows and bow-trimmed thigh-high socks, pointing happily at the menu and ordering "One creamsicle, please♡" in a speech bubble, while the vendor freezes mid-scoop and the line of clubgoers behind her stares. She glances back at the viewer with a sparkling-eyed, excited grin.`,
  duo:`At the window of a late-night ice cream truck parked outside a nightclub, the woman and {partner} stand completely nude, sharing one big creamsicle cone while the vendor freezes mid-scoop and the line of clubgoers stares; the woman grins at the viewer with sparkling eyes.`,
  tags:"ice cream truck, food truck, ice cream, menu, pointing, night, neon lights, crowd, looking back, twintails, smile, speech bubble"}],
["flamingo","Sunrise yoga",{ex:"serene, sultry smile",pose:"balancing in a tree pose on one leg",w1:{earAccessory:["flower tucked behind one ear","@c1"]},
  set:"a beach boardwalk at sunrise",blurb:"A nude tree pose on one leg on the beach boardwalk at sunrise, stopping the early joggers.",
  solo:`On a beach boardwalk at sunrise, the woman holds a graceful tree pose completely nude on a pink yoga mat, balanced on one long leg like a flamingo with her palms pressed together above her head, the pink-gold sky glowing behind her, and gives the viewer a serene, sultry smile while early joggers on the boardwalk stumble to a stop.`,
  duo:`On a beach boardwalk at sunrise, the woman and {partner} hold mirrored tree poses completely nude on pink yoga mats, balanced on one leg against the pink-gold sky, while early joggers stumble to a stop; the woman gives the viewer a serene, sultry smile.`,
  tags:"yoga, tree pose, standing on one leg, arms up, yoga mat, beach, boardwalk, sunrise, pink sky, smile"}],
["kraken","Lighthouse beam",{ex:"shy, breathless smile with parted lips",pose:"standing on the rocks below a lighthouse, arms raised to the beam",
  w1:{earAccessory:["pearl drop earrings","-"],neckAccessory:["pearl choker","-"]},
  set:"the rocks beneath a lighthouse at night",blurb:"Nude on the rocks below a lighthouse, posing each time the beam sweeps over her, for a passing cruise ship.",
  solo:`On the black rocks beneath a lighthouse at night, waves crashing below, the woman stands completely nude except for her pearls, her long hair whipping in the sea wind, and lifts her arms to pose each time the sweeping beam lights her up, while a brightly lit cruise ship passing close offshore erupts with cheering passengers at its rails. She gives the viewer a shy, breathless smile over her shoulder, cheeks flushed.`,
  duo:`On the black rocks beneath a lighthouse at night, the woman and {partner} stand completely nude in the sea wind, posing each time the sweeping beam lights them up, while a passing cruise ship's passengers cheer from the rails; the woman gives the viewer a shy, breathless smile.`,
  tags:"lighthouse, light rays, rocks, ocean, waves, night, wind, arms up, pearl necklace, cruise ship, crowd, smile, looking back"}],
["salmon","Billboard",{ex:"haughty, half-lidded smirk",pose:"posing nude beneath a giant billboard of herself",
  w1:{legwear:["black high heels","@dark"],earAccessory:["large hoop earrings","@metal"]},
  set:"a crowded city square at night beneath a giant lit billboard",blurb:"Nude in a crowded square at night, striking the exact pose of her own giant editorial billboard overhead.",
  solo:`In a crowded city square at night, a giant illuminated billboard of her own editorial campaign towers overhead, and the woman stands directly beneath it completely nude except for black high heels and her rose-gold hoops, one hand on her hip, matching the pose in the ad exactly, while passersby stop and stare and phone flashes go off all around her. She gives the viewer a haughty, half-lidded smirk, every freckle on show.`,
  duo:`In a crowded city square at night beneath a giant billboard of her own campaign, the woman and {partner} stand completely nude, the woman matching the pose in the ad, while passersby stare and phones flash; she gives the viewer a haughty, half-lidded smirk.`,
  tags:"billboard, city, night, neon lights, crowd, phone, camera flash, standing, hand on hip, high heels, earrings, freckles, smirk, half-closed eyes"}],
["crow","Rooftop moon",{ex:"breathless, giggling grin with rosy cheeks",pose:"perched on a rooftop ledge, nude, arms spread like wings",
  w1:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},
  set:"a moonlit city rooftop crowded with crows",blurb:"Perched nude on a rooftop ledge under the full moon, arms spread like wings among the crows, while the windows across the street light up one by one.",
  solo:`On the ledge of a city rooftop under a huge full moon, a flock of crows perched along the railings around her, the woman stands completely nude except for her opal pendant, arms flung wide like wings in the cold night wind, while the windows of the apartment building across the street light up one by one with silhouettes leaning out to watch. She looks back at the viewer with a breathless, giggling grin, her cheeks rosy.`,
  duo:`On the ledge of a moonlit city rooftop among a flock of crows, the woman and {partner} stand completely nude, arms spread wide in the night wind, while silhouettes watch from the lit windows across the street; the woman gives the viewer a breathless, giggling grin.`,
  tags:"rooftop, city, night, full moon, moon, crow, bird, flock, wind, outstretched arms, spread arms, windows, silhouette, pendant, looking back, grin, blush"}]
  ]);

  /* ======================= Public Masturbation ======================= */
  opt("posture",["sitting at a café table, a hand under her skirt","slouched in a cinema seat, a hand down her shorts","curled in a bookshop armchair, a book over her lap",
    "lounging in a first-class seat, legs over the armrests","straddling a gym bench before the mirror","standing at a ballet barre, one leg extended high",
    "leaning back across her motorcycle, legs spread","lying in a flower meadow beside a trail, legs spread","pressing her hips to a pool jet, gripping the edge",
    "curled in a fireside armchair, one leg over the armrest","sitting sideways on a train seat, one foot up","sitting on a velvet ottoman in a shop window, legs spread",
    "lounging on a daybed, one leg raised, cocktail in hand"]);
  const PM=Object.assign({},EXPO,{pupilStyle:"heart pupils",skinFinish:"lightly sweaty, dewy skin"});
  const MT="public masturbation, masturbation, exhibitionism, public indecency";
  soloSet("Academy Public Masturbation","Academy Public Exhibition","pmast",{oname:"In public",look:"casual",c1:PM,pc:"lustful expression",tail:MT,tailDuo:"exhibitionism, public indecency",soloCount:"1girl, solo focus",dir:"ba",
    tags:["public","exhibitionism","masturbation","explicit"]},[
["griffin","Café table",{ex:"lip-biting, stifled moan",pose:"sitting at a café table, a hand under her skirt",act:"fingering",
  w1:{top:["fuzzy knit sweater","@c2"],bottom:["pleated skirt hiked up to the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@light"]},
  set:"a busy café by the window",blurb:"Two fingers under her skirt at a busy café table, biting her lip so nobody hears.",
  solo:`In a busy café by the window, the woman sits at a small table with a latte, her pleated skirt hiked up under the tabletop and two fingers slipped inside herself, legs trembling beneath the table. She bites her lip to stifle a moan and blushes furiously, glancing at the viewer through her lashes, while the barista and other customers carry on just a few steps away.`,
  duo:`In a busy café by the window, the woman sits beside {partner} at a small table, {his} hand slipped under her hiked-up pleated skirt, fingering her beneath the tabletop; she bites her lip to stifle a moan and blushes furiously at the viewer while customers carry on a few steps away.`,
  tags:"cafe, table, sitting, latte, under table, skirt lift, panties around one ankle, fingering, biting lip, blush, trembling, window"}],
["badger","Back row",{ex:"shushing giggle with a finger to her lips",pose:"slouched in a cinema seat, a hand down her shorts",act:"hand in panties",
  w1:{top:["cable-knit sweater","@c2"],bottom:["denim shorts unbuttoned and pushed down","-"],heldItem:["bowl of buttered popcorn","-"]},
  set:"the back row of a dark, crowded cinema",blurb:"Back row of a packed cinema, popcorn in her lap and a hand down her unbuttoned shorts.",
  solo:`In the flickering dark of a crowded cinema, the woman slouches in a back-row seat with a bowl of buttered popcorn in her lap and her hand down the front of her unbuttoned denim shorts, rubbing herself as the screen glows on her flushed face. She giggles at the viewer with a finger pressed to her lips, shushing, while the rows of moviegoers in front of her stare at the screen.`,
  duo:`In the flickering dark of a crowded cinema, the woman slouches in a back-row seat beside {partner}, {his} hand down the front of her unbuttoned denim shorts, popcorn spilling from the bowl in her lap; she giggles at the viewer with a finger pressed to her lips while the moviegoers in front watch the screen.`,
  tags:"movie theater, cinema, dark, screen light, popcorn, sitting, hand in panties, unbuttoned shorts, finger to mouth, shushing, giggling, blush"}],
["raven","Bookshop armchair",{ex:"half-lidded sultry gaze",pose:"curled in a bookshop armchair, a book over her lap",act:"fingering",
  w1:{top:["cable-knit sweater","@c1"],bottom:["long skirt hiked up over the knees","@dark"],heldItem:["open book of poetry","-"],eyewear:["round glasses","@metal"]},
  set:"a cozy, lamplit secondhand bookshop",blurb:"Curled in a bookshop armchair, a book of poetry propped over the hand under her skirt.",
  solo:`In a cozy, lamplit secondhand bookshop, the woman is curled in a worn leather armchair between the shelves, an open book of poetry propped on her lap to hide her hand moving beneath her hiked-up long skirt as she fingers herself. She lifts a half-lidded, sultry gaze to the viewer over her round glasses, lips parted, while another customer browses the shelf right behind her chair.`,
  duo:`In a cozy, lamplit bookshop, the woman sits curled in {partner}'s lap in a worn leather armchair, reading aloud from an open book of poetry while {his} hand works beneath her hiked-up long skirt; she lifts a half-lidded, sultry gaze to the viewer over her round glasses.`,
  tags:"bookshop, bookshelf, armchair, reading, book, glasses, skirt lift, fingering, half-closed eyes, parted lips, lamp"}],
["serpent","First class",{ex:"haughty, half-lidded smirk",pose:"lounging in a first-class seat, legs over the armrests",act:"dildo",
  w1:{top:["sheer blouse unbuttoned to the navel","@c1"],bottom:["pencil skirt hiked up to the waist","@dark"],headwear:["silk sleep mask pushed up on the forehead","@c2"],heldItem:["crystal glass dildo","-"]},
  set:"the first-class cabin of a night flight",blurb:"Legs hooked over both armrests in first class, a crystal toy and not a care, as the flight attendant freezes.",
  solo:`In the first-class cabin of a night flight, the woman lounges in a wide leather seat with her legs hooked over both armrests, her pencil skirt hiked up to her waist and a silk sleep mask pushed up on her forehead, sliding a crystal glass dildo in and out of herself without a care. She gives the viewer a haughty, half-lidded smirk as a flight attendant freezes in the aisle with a tray of champagne.`,
  duo:`In the first-class cabin of a night flight, the woman lounges with her legs hooked over both armrests and her pencil skirt hiked up while {partner} leans across from the next seat, sliding a crystal glass dildo in and out of her; she gives the viewer a haughty, half-lidded smirk as a flight attendant freezes in the aisle.`,
  tags:"airplane interior, first class, airplane seat, legs over armrest, spread legs, skirt lift, glass dildo, sleep mask, mask on head, champagne, smirk, night"}],
["wolf","Gym mirror",{ex:"breathless, cocky grin",pose:"straddling a gym bench before the mirror",act:"fingering",c1:{skinFinish:"wet, sweat-glistening skin"},
  w1:{bra:["sports bra with {c2} trim, pulled halfway up","@c1"],legwear:["leggings pulled down to the knees","@dark"]},
  set:"a busy gym lined with mirrors",blurb:"Straddling a weight bench in a busy gym, leggings down, rubbing herself while she watches in the mirror.",
  solo:`In a busy gym lined with mirrors, the woman straddles a weight bench with her leggings pulled down to her knees and her sports bra shoved up over her breasts, rubbing herself hard with one hand while she watches herself in the mirror, sweat-soaked and panting, and flashes the viewer a breathless, cocky grin as gym-goers on the treadmills behind her stare.`,
  duo:`In a busy gym lined with mirrors, the woman straddles a weight bench with her leggings pulled down to her knees while {partner} spots her from behind, fingering her as she watches in the mirror, sweat-soaked and panting; she flashes the viewer a breathless, cocky grin.`,
  tags:"gym, mirror, reflection, weight bench, straddling, leggings pull, sports bra lift, rubbing, sweat, toned, grin, fang, panting"}],
["swan","Studio window",{ex:"serene, half-lidded look",pose:"standing at a ballet barre, one leg extended high",act:"fingering",
  w1:{waistAccessory:["{c} leotard peeled down to the waist","@c1"],legwear:["satin pointe shoes with ribbons laced up the ankles","pale pink"],earAccessory:["pearl drop earrings","-"]},
  set:"a dance studio with a tall window onto the street at night",blurb:"At the barre by the studio's street window, leotard peeled down, while a crowd gathers outside the glass.",
  solo:`In a dance studio with a tall window onto a lamplit street at night, the woman stands at the ballet barre with one leg extended high along it, her leotard peeled down to her waist, fingering herself slowly right in front of the glass. She gazes at the viewer with a serene, half-lidded look, lips parted, while a small crowd gathers on the sidewalk outside to watch.`,
  duo:`In a dance studio with a tall window onto a lamplit street at night, the woman stands at the ballet barre with one leg extended high while {partner} stands behind her, fingering her slowly in front of the glass; she gazes at the viewer with a serene, half-lidded look as a crowd gathers outside.`,
  tags:"dance studio, ballet barre, leg up, standing split, pointe shoes, leotard pull, fingering, window, night, onlookers"}],
["dragon","Gas station",{ex:"smoldering sultry expression",pose:"leaning back across her motorcycle, legs spread",act:"vibrator",
  w1:{shoulderPiece:["{c} leather jacket slipping open from the shoulders","@dark"],legwear:["leather pants pulled down to the thighs","@dark"],heldItem:["pink rabbit vibrator","-"],neckAccessory:["chunky chain necklace","@metal"]},
  set:"a neon gas station at night",blurb:"Leaning back across her idling motorcycle under a gas station's neon, vibrator to her clit, staring down the truckers.",
  solo:`Under the neon canopy of a gas station at night, the woman leans back across her idling motorcycle with her leather jacket hanging open off her shoulders and her leather pants pushed down to her thighs, pressing a buzzing vibrator against her clit while the engine rumbles beneath her. She stares the viewer down with a smoldering, fierce look while truckers at the pumps freeze mid-fill.`,
  duo:`Under the neon canopy of a gas station at night, the woman leans back across her idling motorcycle with her leather pants pushed down to her thighs while {partner} holds a buzzing vibrator against her clit; she stares the viewer down with a smoldering, fierce look as truckers at the pumps freeze.`,
  tags:"gas station, neon lights, night, motorcycle, leaning back, leather jacket, open jacket, pants pull, vibrator, glare"}],
["stag","Trailside meadow",{ex:"dreamy expression",pose:"lying in a flower meadow beside a trail, legs spread",act:"fingering",
  w1:{waistAccessory:["{c} sundress rucked up around the waist","@c1"],headwear:["flower crown","@c1"]},
  set:"a wildflower meadow beside a busy hiking trail",blurb:"Sundress rucked up in a wildflower meadow, a few steps from a line of passing hikers.",
  solo:`In a meadow of wildflowers just beside a busy hiking trail, the woman lies on her back with her sundress rucked up around her waist and her legs spread among the flowers, fingering herself with a dreamy smile at the viewer, butterflies drifting over her, as a line of hikers walks past on the trail only a few steps away.`,
  duo:`In a meadow of wildflowers beside a busy hiking trail, the woman lies on her back with her sundress rucked up and her legs spread while {partner} lies beside her, fingering her among the flowers; she smiles dreamily at the viewer as hikers walk past a few steps away.`,
  tags:"meadow, flowers, field, lying on back, spread legs, sundress, dress lift, fingering, butterfly, hiking trail, outdoors, smile, day"}],
["shark","Pool jet",{ex:"teasing tongue-out expression",pose:"pressing her hips to a pool jet, gripping the edge",act:"",c1:{skinFinish:"wet skin with water droplets"},
  w1:{thighAccessory:["tugged-down {c} bikini bottoms around one thigh","@c1"],earAccessory:["small shark tooth earrings","-"]},
  set:"a rooftop hotel pool at a late-night party",blurb:"Hips pressed to a pool jet at a rooftop party, bikini bottoms tugged down, grinning at you.",
  solo:`In a rooftop hotel pool glowing turquoise at a late-night party, the woman floats with her hips pressed to a wall jet, her tugged-down {c} bikini bottoms around one thigh so the stream pounds right against her clit, gripping the pool edge and sticking her tongue out at the viewer with a teasing, sharp-toothed grin as partygoers splash and laugh around her, oblivious.`,
  duo:`In a rooftop hotel pool glowing turquoise at a late-night party, {partner} holds the woman's hips against a wall jet, her tugged-down {c} bikini bottoms around one thigh, while she grips the pool edge and sticks her tongue out at the viewer with a teasing, sharp-toothed grin.`,
  tags:"swimming pool, rooftop, pool jet, night, pool party, partially submerged, wet, bikini pull, gripping edge, tongue out, sharp teeth, grin"}],
["penguin","Fireside lodge",{ex:"sneaky, giggling wink",pose:"curled in a fireside armchair, one leg over the armrest",act:"fingering",
  c1:{bodyMarkings:"snowflakes melt on her steaming, rosy skin"},
  w1:{shoulderPiece:["{c} ski jacket unzipped and hanging open off the shoulders","white"],legwear:["snow pants pushed down to the thighs","@dark"],
    neckAccessory:["chunky knit scarf","@accent"],tagCharm:["tiny penguin charm on the zipper","-"],heldItem:["mug of hot cocoa topped with marshmallows","-"]},
  set:"a crowded après-ski lodge by a roaring fire",blurb:"Curled by the fire in a crowded ski lodge, jacket open and cocoa in hand, fingering herself with a sneaky wink.",
  solo:`In a crowded après-ski lodge at night, warm with firelight and the hum of guests sipping mulled wine, the woman is curled in a big fireside armchair with one leg hooked over the armrest, her white ski jacket unzipped and hanging open off her bare shoulders, a tiny penguin charm swinging from its zipper, her snow pants pushed down to her thighs and her chunky orange knit scarf still wrapped around her neck. One hand holds a mug of hot cocoa topped with marshmallows; the other slides between her thighs, fingering herself. Her freckled cheeks glow rosy as she gives the viewer a sneaky, giggling wink, biting back a tiny gasp, while the skiers at the bar behind her laugh, oblivious.`,
  duo:`In a crowded après-ski lodge at night, the woman sits curled in {partner}'s lap in a big fireside armchair, her white ski jacket hanging open and her snow pants pushed down while {his} hand slides between her thighs, fingering her; she holds a mug of hot cocoa, her orange scarf around her neck, and gives the viewer a sneaky, giggling wink while the skiers at the bar laugh, oblivious.`,
  tags:"ski lodge, fireplace, fire, armchair, leg over armrest, ski jacket, open jacket, pants pull, scarf, hot chocolate, mug, marshmallow, fingering, wink, biting lip, blush, freckles, night, indoors"}],
["fox","Last train",{ex:"sly, fox-like smirk",pose:"sitting sideways on a train seat, one foot up",act:"vibrator",
  w1:{top:["micro cropped hoodie unzipped to the navel","@c1"],bottom:["pleated skirt hiked up to the waist","@c2"],legwear:["thigh-high stockings","@dark"],
    headwear:["fluffy fox ear headband","@hair"],heldItem:["remote control for a vibrating egg","-"]},
  set:"a nearly empty train carriage late at night",blurb:"On the last train, skirt hiked up and one foot on the seat, thumbing a vibrator remote to full power.",
  solo:`In a nearly empty train carriage late at night, the woman sits sideways on the bench seat with her pleated skirt hiked up to her waist and one foot up on the seat, a vibrating egg buried inside her as she thumbs its remote up to full power, legs trembling while the city lights streak past the windows. She gives the viewer a sly, fox-like smirk and a wink while a dozing passenger across the aisle stirs.`,
  duo:`In a nearly empty train carriage late at night, the woman sits sideways on the bench seat with her skirt hiked up and one foot on the seat while {partner}, beside her, holds the remote of the vibrating egg inside her and turns it up to full power; she gives the viewer a sly, fox-like smirk and a wink, legs trembling.`,
  tags:"train interior, night, sitting, foot up, skirt lift, thighhighs, egg vibrator, remote control vibrator, trembling, wink, smirk, city lights"}],
["lovebird","Spin cycle",{ex:"giggling, heart-eyed moan",pose:"sitting on a rumbling washing machine, legs apart",act:"fingering",
  w1:{top:["oversized {c} hoodie worn as a dress","@c1"],legwear:["fuzzy {c} thigh-high socks","@c2"],headwear:["ribbon bows tied at the twintails","@accent"]},
  set:"a 24-hour laundromat late at night",blurb:"Perched on a rumbling washing machine in a late-night laundromat, hoodie hiked up, giggling as the spin cycle helps.",
  solo:`In a brightly lit 24-hour laundromat late at night, the woman sits on top of a rumbling washing machine in its spin cycle, her oversized hoodie hiked up to her waist with nothing underneath, her knees apart and one hand between her thighs, giggling and trembling as the machine shakes beneath her. Blush stickers on her cheeks and her eyes turning to hearts, she bites her sleeve to stay quiet while a sleepy customer folding laundry two machines away hasn't noticed yet.`,
  duo:`In a 24-hour laundromat late at night, the woman sits on a rumbling washing machine with her hoodie hiked up and her knees apart while {partner} stands between them, fingering her as the spin cycle shakes them both; she giggles into her sleeve with heart-shaped pupils.`,
  tags:"laundromat, washing machine, sitting, spread legs, hoodie, no panties, fingering, sleeve bite, trembling, night, giggling, heart-shaped pupils, blush stickers, twintails"}],
["flamingo","Rooftop bar",{ex:"serene, sultry smile",pose:"lounging on a daybed, one leg raised, cocktail in hand",act:"",
  w1:{waistAccessory:["{c} sarong untied and falling open at the hips","@c1"],heldItem:["pink cocktail with a paper umbrella","-"],earAccessory:["flower tucked behind one ear","@c1"]},
  set:"a chic rooftop bar at sunset",blurb:"Sarong falling open on a pink daybed at a rooftop bar, one leg in the air and a cocktail in hand.",
  solo:`At a chic rooftop bar at sunset, the woman lounges on a pink velvet daybed among the cocktail tables, her sarong untied and falling open at her hips, one long leg raised gracefully into the air as she rubs herself slowly with one hand and sips a pink cocktail from the other, giving the viewer a serene, sultry smile as the patrons at the next table fall silent.`,
  duo:`At a chic rooftop bar at sunset, the woman lounges on a pink velvet daybed with her sarong falling open and one long leg raised while {partner} sits beside her, rubbing her slowly; she sips a pink cocktail and gives the viewer a serene, sultry smile as the patrons at the next table fall silent.`,
  tags:"rooftop, bar, sunset, daybed, lying, leg up, sarong, cocktail, drinking, rubbing, pink, smile"}],
["kraken","Deck lounger",{ex:"half-lidded sultry gaze",pose:"lounging on a deck chair, one leg up, a hand between her thighs",act:"fingering",
  w1:{thighAccessory:["tugged-down {c} bikini bottoms around one thigh","@c1"],eyewear:["cat-eye sunglasses","@dark"]},
  set:"the pool deck of a cruise ship at night",blurb:"On a cruise ship's pool deck at night, bikini bottoms tugged down on a lounger, fingering herself under the stars.",
  solo:`On the pool deck of a cruise ship at night, under strings of lights and a sky full of stars, the woman lounges on a deck chair with one leg propped up, her bikini top untied and her bikini bottoms tugged down around one thigh, two fingers sliding slowly inside herself while guests laugh in the hot tub a few steps away. She lowers her sunglasses and gives the viewer a half-lidded, sultry gaze, lips parted.`,
  duo:`On the pool deck of a cruise ship at night, the woman lounges on a deck chair with one leg propped up and her bikini bottoms tugged down while {partner} sits on the edge of the lounger, fingering her slowly as guests laugh in the hot tub nearby; she gives the viewer a half-lidded, sultry gaze.`,
  tags:"cruise ship, pool, deck chair, lying, leg up, bikini, bikini pull, untied bikini, fingering, night, string lights, starry sky, sunglasses, half-closed eyes, parted lips"}],
["salmon","Rowboat",{ex:"lip-biting, stifled moan",pose:"reclining in a rowboat under a footbridge, a hand between her thighs",act:"fingering",
  w1:{waistAccessory:["{c} sundress rucked up around the waist","@c1"],headwear:["wide-brim sun hat","@dark"]},
  set:"a quiet park river with a drifting rowboat beneath a stone footbridge",blurb:"Drifting under a stone footbridge in a rowboat, sundress rucked up, while couples stroll overhead.",
  solo:`On a quiet river in a city park, the woman reclines in a drifting wooden rowboat beneath a stone footbridge where couples stroll overhead, her sundress rucked up around her waist and her legs parted over the oars, two fingers sliding slowly inside herself, a wide sun hat tipped low over her eyes. She bites her lip to stifle a moan, gaze locked on the viewer.`,
  duo:`On a quiet park river, the woman reclines in a rowboat beneath a footbridge, her sundress rucked up around her waist, while {partner} sits facing her at the oars and fingers her slowly as couples stroll overhead; she bites her lip to stifle a moan.`,
  tags:"rowboat, boat, river, park, bridge, outdoors, day, reclining, spread legs, dress lift, sun hat, fingering, biting lip, stifled moan"}],
["crow","Antique shop",{ex:"shushing giggle with a finger to her lips",pose:"curled in a velvet armchair in an antique shop, a hand under her skirt",act:"fingering",
  w1:{top:["fuzzy knit sweater","@c1"],bottom:["pleated skirt hiked up to the waist","@c2"],legwear:["thigh-high stockings","@dark"]},
  set:"a cluttered antique shop glittering with jewelry cases on a rainy afternoon",blurb:"Curled in a velvet armchair among glittering cases of rings and pocket watches, a hand under her skirt while the shopkeeper hums just out of sight.",
  solo:`In a cluttered antique shop on a rainy afternoon, glass cases glittering with old rings, keys and pocket watches, the woman curls up in a worn velvet armchair in a quiet corner with her pleated skirt hiked up to her waist and one hand slipped between her thighs, while the shopkeeper hums at the counter just out of sight behind a tall cabinet. She holds a finger to her lips with a shushing giggle at the viewer.`,
  duo:`In a cluttered antique shop on a rainy afternoon, the woman curls in a velvet armchair with her skirt hiked up while {partner} kneels beside her, fingering her, the shopkeeper humming just out of sight; she holds a finger to her lips with a shushing giggle.`,
  tags:"antique shop, shop, indoors, rain, display case, jewelry, pocket watch, armchair, sitting, skirt lift, fingering, finger to mouth, shushing, giggling"}]
  ]);

  /* ======================= Public Sex (scene set) ======================= */
  opt("posture",["riding her lover in a Ferris wheel gondola","bent over in a fitting room, hand over her mouth","sitting in her lover's lap on a train seat, coat draped over them",
    "bent over the velvet railing of an opera box","pinned against a brick wall, legs locked around her lover","standing in a gazebo, one leg raised onto her lover's shoulder",
    "bent over a speaker stack beside a concert stage","lying back on a mossy bench among orchids","sitting on a bar counter, legs wrapped around her lover",
    "straddling her lover on a ski chairlift","riding her lover on a karaoke sofa, microphone in hand","standing up through a limousine sunroof, arms raised",
    "riding her lover on a giant flamingo pool float"]);
  const SEX={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"lightly sweaty, dewy skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};
  const ST="public sex, exhibitionism";
  const TUXM={top:["tuxedo shirt unbuttoned to the chest","white"],bottom:["dress trousers with the belt undone","@dark"],neckAccessory:["bow tie hanging untied around the neck","@dark"]};
  const TUXF={outerwear:["open tuxedo jacket worn over bare shoulders","@dark"],bottom:["dress trousers with the belt undone","@dark"]};
  const CASM={top:["unbuttoned shirt hanging open","@c1"],bottom:["unbuttoned jeans riding low on the hips","@dark"]};
  const CASF={top:["oversized open button-up shirt","@c1"],bottom:["unbuttoned jeans riding low on the hips","@dark"]};
  const PS=[
["ferris","griffin","Ferris wheel",{act:"sex, vaginal, cowgirl position, girl on top, breasts on glass, creampie",ex:"bright red, nervous but thrilled smile",
  pose:"riding her lover in a Ferris wheel gondola",pc:"lustful expression",
  w1:{waistAccessory:["{c} skirt hiked up around the waist","@c1"],shoulderPiece:["{c} blouse pulled open and slipping from the shoulders","@light"],legwear:["pulled-down {c} panties around one ankle","@light"]},w2m:CASM,w2f:CASF,
  blurb:"Riding him at the top of a Ferris wheel over the city lights, while the gondola below looks straight up.",
  scene:`Inside a Ferris wheel gondola at the very top of its turn, the city lights glittering below, the woman rides {lover} on the bench seat in the cowgirl position, her skirt hiked up around her waist and her blouse pulled open off her shoulders, her bare breasts pressed against the cold window glass. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She blushes bright red and glances down at the next gondola, where a couple is staring straight up at them, and gasps "They can see us...♡" in a speech bubble, as {he} cums inside her and cum overflows from her vagina. ${ST}, ferris wheel, gondola, cowgirl position, girl on top, breasts on glass, against glass, skirt lift, open shirt, cityscape, night, blush, nervous smile, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["fitting","badger","Fitting room",{act:"sex, vaginal, standing sex, sex from behind, covering own mouth, creampie",ex:"hand clamped over her mouth, eyes wide with thrill",
  pose:"bent over in a fitting room, hand over her mouth",pc:"lustful, half-lidded stare",
  w1:{waistAccessory:["{c} sundress rucked up around the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@light"]},w2m:CASM,w2f:CASF,
  blurb:"Taken from behind in a fitting room with the curtain not quite closed, a hand over her mouth as the assistant checks in.",
  scene:`Inside a department store fitting room with the curtain not quite closed, the woman braces one hand against the mirror while {lover} fucks her from behind, her sundress rucked up around her waist and her panties around one ankle, a pile of tried-on clothes at her feet. {His} thick, veiny {cock} pumps deep in her vagina with motion lines. She clamps her other hand over her mouth to muffle her squeals, eyes wide and sparkling with the thrill, as a shop assistant's shoes wait just outside the gap in the curtain and a voice calls "Everything fitting okay in there?" in a speech bubble. {He} cums inside her, and cum drips down her thighs onto the carpet. ${ST}, fitting room, curtain, mirror, reflection, standing sex, sex from behind, covering own mouth, dress lift, panties around one ankle, cum in pussy, cum drip, motion lines, speech bubble, sweat`}],
["nighttrain","raven","Night train",{act:"sex, vaginal, reverse cowgirl position, sitting on lap, spread legs, creampie",ex:"half-lidded sultry gaze",
  pose:"sitting in her lover's lap on a train seat, coat draped over them",pc:"lustful, half-lidded stare",
  w1:{shoulderPiece:["long {c} coat draped loosely over the shoulders","@c1"],legwear:["thigh-high stockings","@dark"]},
  w2m:{outerwear:["long wool overcoat","@dark"],bottom:["dress trousers with the belt undone","@dark"]},w2f:TUXF,
  blurb:"Grinding slowly in his lap on a rainy late-night train, her long coat fallen open over them both.",
  scene:`On a late-night train rattling through the rain, the woman sits in {lover}'s lap on a bench seat in the reverse cowgirl position, her long coat draped over both of them but fallen open at the front, her thighs spread over {his} knees. {His} thick, veiny {cock} is buried deep in her vagina as she grinds slowly, rain streaking the window behind them and a few tired commuters dozing further down the carriage. She meets the viewer's gaze with a half-lidded, sultry look and murmurs "Don't make a sound♡" in a speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the seat. ${ST}, train interior, night, rain, reverse cowgirl position, sitting on lap, spread legs, open coat, thighhighs, half-closed eyes, cum in pussy, cum overflow, speech bubble, sweat`}],
["opera","serpent","Opera box",{act:"sex, vaginal, standing sex, sex from behind, bent over, creampie",ex:"haughty, smoldering glare over her shoulder",
  pose:"bent over the velvet railing of an opera box",pc:"dominant, knowing smirk",
  w1:{waistAccessory:["{c} evening gown hiked up around the waist","@c1"],gloves:["{c} satin opera gloves reaching past the elbows","@dark"],earAccessory:["large hoop earrings","@metal"]},w2m:TUXM,w2f:TUXF,
  blurb:"Bent over the railing of a private opera box above a packed house: \"Let them look.\"",
  scene:`In a gilded private box at the opera, high above a packed audience, the woman leans over the red velvet railing as {lover} takes her from behind, her evening gown hiked up around her waist and her breasts spilling over the balustrade in full view of the seats below. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines as the soprano hits her highest note. She tosses a haughty, smoldering glare back over her shoulder and purrs "Let them look♡" in a speech bubble, as {he} cums inside her and cum drips down her thighs onto the velvet. ${ST}, opera house, theater box, balcony, railing, audience, sex from behind, standing sex, bent over, dress lift, evening gown, opera gloves, hanging breasts, looking back, smirk, cum in pussy, cum drip, motion lines, speech bubble, sweat`}],
["alley","wolf","Club alley",{act:"sex, vaginal, standing sex, against wall, leg lock, carrying, creampie",ex:"breathless, cocky grin",
  pose:"pinned against a brick wall, legs locked around her lover",pc:"feral, hungry grin",
  w1:{shoulderPiece:["{c} leather jacket slipping open from the shoulders","@dark"],waistAccessory:["{c} skirt hiked up around the waist","@c1"],legwear:["fishnet stockings","@dark"]},
  w2m:{top:["tight black t-shirt","-"],bottom:["unbuttoned jeans riding low on the hips","@dark"]},w2f:CASF,
  blurb:"Pinned to the brick wall behind a nightclub, legs locked around him, while the smokers at the back door watch.",
  scene:`In a neon-lit alley behind a nightclub, bass thumping through the steel door, {lover} pins the woman against the graffiti-covered brick wall and fucks her standing up, her legs locked around {his} waist, her skirt hiked up and her leather jacket slipping off her shoulders. {His} thick, veiny {cock} slams deep into her vagina with impact lines. Smokers at the club's back door stop mid-drag to watch, and she throws her head back with a breathless, cocky grin, howling "Harder♡" in a speech bubble, as {he} cums inside her and cum drips onto the wet asphalt. ${ST}, alley, nightclub, neon lights, night, brick wall, graffiti, against wall, standing sex, leg lock, carrying, skirt lift, open jacket, fishnets, grin, fang, cum in pussy, cum drip, impact lines, speech bubble, sweat`}],
["gazebo","swan","Moonlit gazebo",{act:"sex, vaginal, standing sex, standing split, leg on shoulder, creampie",ex:"serene, half-lidded look",
  pose:"standing in a gazebo, one leg raised onto her lover's shoulder",pc:"warm, adoring gaze",
  w1:{waistAccessory:["{c} tulle skirt bunched up around the waist","@c1"],shoulderPiece:["{c} blouse pulled open and slipping from the shoulders","@light"],earAccessory:["pearl drop earrings","-"]},
  w2m:{top:["crisp collared button-up shirt","@light"],bottom:["dress trousers with the belt undone","@dark"]},w2f:CASF,
  blurb:"In a moonlit park gazebo, one leg raised straight up onto his shoulder, while couples on the path slow down to watch.",
  scene:`In a white gazebo in a moonlit park strung with fairy lights, the woman stands with one long leg raised straight up onto {lover}'s shoulder in a perfect standing split while {he} makes love to her, her tulle skirt bunched up around her waist and her blouse pulled open. {His} thick, veiny {cock} is buried deep in her vagina with soft motion lines. Couples strolling the lamplit path below slow down to watch, and she gazes at the viewer with a serene, half-lidded look, cheeks flushed, as {he} cums inside her and cum drips down her inner thigh. ${ST}, gazebo, park, night, moonlight, fairy lights, standing sex, standing split, leg up, leg on shoulder, flexible, skirt lift, open shirt, half-closed eyes, cum in pussy, cum drip, motion lines, sweat`}],
["concert","dragon","Side stage",{act:"sex, vaginal, sex from behind, bent over, hair pulling, creampie",ex:"fierce, exhilarated grin",
  pose:"bent over a speaker stack beside a concert stage",pc:"feral, hungry grin",
  w1:{shoulderPiece:["{c} leather jacket slipping open from the shoulders","@dark"],legwear:["leather pants pulled down to the thighs","@dark"],neckAccessory:["chunky chain necklace","@metal"]},
  w2m:{top:["sleeveless leather vest over a bare chest","@dark"],bottom:["unbuttoned jeans riding low on the hips","@dark"]},w2f:CASF,
  blurb:"Bent over a speaker stack at the side of a roaring rock stage, while the front rows scream.",
  scene:`At the side of a roaring rock concert stage, lasers and smoke sweeping over a sea of fans, the woman is bent over a towering speaker stack with her leather pants yanked down to her thighs and her leather jacket hanging off her shoulders while {lover} grips her hair and fucks her hard from behind. {His} thick, veiny {cock} slams deep into her vagina with impact lines in time with the drums. The front rows have spotted them and are screaming, and she turns to the viewer with a fierce, exhilarated grin, roaring "LOUDER♡" in a speech bubble, as {he} cums inside her and cum drips down her thighs. ${ST}, concert, stage, crowd, stage lights, laser, smoke, speaker, bent over, sex from behind, hair pulling, pants pull, open jacket, chain necklace, grin, cum in pussy, cum drip, impact lines, speech bubble, sweat`}],
["glasshouse","stag","Glasshouse",{act:"sex, vaginal, missionary, spread legs, creampie",ex:"dreamy expression",
  pose:"lying back on a mossy bench among orchids",pc:"warm, adoring gaze",
  w1:{waistAccessory:["{c} sundress rucked up around the waist","@c1"],headwear:["flower crown","@c1"]},
  w2m:{top:["linen shirt unbuttoned to the chest","@light"],bottom:["loose drawstring linen trousers","@c1"]},w2f:CASF,
  blurb:"On a mossy bench in a botanical glasshouse, a finger to her lips as the garden club tour passes behind the ferns.",
  scene:`In the great Victorian glasshouse of a public botanical garden, among towering palms and orchids, the woman lies back on a mossy stone bench with her sundress rucked up to her waist and her legs spread around {lover} as {he} makes love to her, sunlight streaming through the misted glass. {His} thick, veiny {cock} is buried deep in her vagina with motion lines. An elderly garden club on a guided tour is visible through the ferns just across the path, and she smiles up at the viewer with a dreamy, heart-eyed look and a finger to her lips, as {he} cums inside her and cum drips onto the moss. ${ST}, greenhouse, botanical garden, plant, orchid, palm tree, sunlight, light rays, missionary, spread legs, dress lift, flower crown, finger to mouth, heart-shaped pupils, cum in pussy, cum drip, motion lines, sweat`}],
["aquarium","shark","Aquarium gala",{act:"sex, vaginal, sitting, leg lock, creampie",ex:"teasing tongue-out expression",
  pose:"sitting on a bar counter, legs wrapped around her lover",pc:"lustful expression",
  w1:{waistAccessory:["{c} cocktail dress hiked up around the waist","@c1"],earAccessory:["small shark tooth earrings","-"]},w2m:TUXM,w2f:TUXF,
  blurb:"On the bar of an after-hours aquarium gala, sharks gliding overhead, legs locked around him.",
  scene:`At an after-hours cocktail gala inside an aquarium's glass tunnel, glowing blue with sharks and rays gliding overhead, the woman sits on the edge of the bar counter with her cocktail dress hiked up and her legs locked around {lover} as {he} fucks her, a toppled martini glass beside her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Gala guests in evening wear have turned from the sharks to stare, and she sticks her tongue out at the viewer with a teasing, sharp-toothed grin, waving at a passing shark, as {he} cums inside her and cum drips down the bar. ${ST}, aquarium, underwater tunnel, shark, manta ray, blue theme, bar counter, sitting on counter, leg lock, dress lift, cocktail dress, martini glass, sharp teeth, tongue out, cum in pussy, cum drip, motion lines, sweat`}],
["chairlift","penguin","Chairlift",{act:"sex, vaginal, straddling, sitting on lap, face-to-face, hug, creampie",ex:"rosy, giggling, heart-eyed bliss",
  pose:"straddling her lover on a ski chairlift",pc:"dominant, knowing smirk",
  w1:{shoulderPiece:["{c} ski jacket unzipped and hanging open off the shoulders","white"],legwear:["snow pants pushed down to the thighs","@dark"],
    neckAccessory:["chunky knit scarf","@accent"],headwear:["knit pom-pom beanie","ice blue"],gloves:["fluffy knit mittens","white"],tagCharm:["tiny penguin charm on the zipper","-"]},
  w2m:{outerwear:["puffer jacket","@dark"],bottom:["ski pants pushed down to the thighs","@dark"],headwear:["ski goggles pushed up on the forehead","@metal"]},
  w2f:{shoulderPiece:["{c} ski jacket unzipped and hanging open off the shoulders","@dark"],legwear:["snow pants pushed down to the thighs","@dark"],headwear:["ski goggles pushed up on the forehead","@metal"]},
  blurb:"Straddling him on a swaying chairlift in the falling snow, one orange scarf wrapped around them both.",
  scene:`On a ski chairlift swaying high above the snowy slopes at dusk, snow falling softly and the lodge lights glowing far below, the woman straddles {lover} face to face on the narrow seat, her white ski jacket unzipped and hanging open over her bare breasts, her snow pants pushed down to her thighs and her chunky orange knit scarf wrapped around both of their necks. {His} thick, veiny {cock} is buried deep in her vagina as she bounces with motion lines, the chair creaking. Skiers on the chair behind them whoop and whistle; she hugs {him} tight and giggles with rosy, freckled cheeks and heart-shaped eyes, squealing "We're almost at the top♡" in a speech bubble, her breath puffing in little clouds, as {he} cums inside her and warm cum overflows from her vagina. ${ST}, chairlift, ski lift, ski resort, snow, snowing, dusk, mountain, straddling, sitting on lap, face-to-face, hug, open jacket, pants pull, shared scarf, beanie, mittens, visible breath, giggling, blush, freckles, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["karaoke","fox","Karaoke box",{act:"sex, vaginal, cowgirl position, girl on top, holding microphone, creampie",ex:"sly, fox-like smirk",
  pose:"riding her lover on a karaoke sofa, microphone in hand",pc:"lustful expression",
  w1:{waistAccessory:["{c} skirt hiked up around the waist","@c1"],shoulderPiece:["{c} blouse pulled open and slipping from the shoulders","@light"],headwear:["fluffy fox ear headband","@hair"],heldItem:["karaoke microphone","-"]},
  w2m:{top:["graphic band tee","@dark"],bottom:["unbuttoned jeans riding low on the hips","@dark"]},w2f:CASF,
  blurb:"Riding him in a neon karaoke box, still singing into the mic, as the waiter freezes at the glass door.",
  scene:`In a neon-lit karaoke box, the woman rides {lover} on the vinyl sofa in the cowgirl position, her skirt hiked up and her blouse pulled open, still belting into the microphone as lyrics scroll across the giant screen behind her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. A waiter frozen at the glass door with a tray of drinks stares in, and she gives the viewer a sly, fox-like smirk and a wink, moaning into the mic so the whole hallway can hear, as {he} cums inside her and cum overflows from her vagina. ${ST}, karaoke, karaoke box, neon lights, microphone, singing, screen, sofa, cowgirl position, girl on top, skirt lift, open shirt, fox ears, wink, smirk, cum in pussy, cum overflow, motion lines, sweat`}],
["tunnel","lovebird","Tunnel of love",{act:"sex, vaginal, cowgirl position, girl on top, kiss, creampie",ex:"giggling, heart-eyed moan",
  pose:"riding her lover in a swan boat in a tunnel of love",pc:"warm, adoring gaze",
  w1:{waistAccessory:["{c} skirt hiked up around the waist","@c1"],shoulderPiece:["{c} blouse pulled open and slipping from the shoulders","@light"],headwear:["ribbon bows tied at the twintails","@accent"]},w2m:CASM,w2f:CASF,
  blurb:"Riding him in a swan boat through the tunnel of love, glowing hearts overhead and the next boat drifting right behind them.",
  scene:`Inside the tunnel of love at an amusement park at night, glowing pink and orange hearts drifting past on the walls, the woman rides {lover} in the cowgirl position in a little swan boat as it floats slowly through the dark water, her skirt hiked up and her blouse pulled open, kissing {him} between bounces. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. The next swan boat glides out of the dark right behind them, its couple staring, and she giggles with heart-shaped pupils and blush stickers, squealing "They can see us~ don't stop♡" in a speech bubble, as {he} cums inside her and cum overflows from her vagina. ${ST}, tunnel of love, swan boat, boat, water, amusement park, night, heart, glowing, cowgirl position, girl on top, kiss, skirt lift, open shirt, twintails, giggling, heart-shaped pupils, blush stickers, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["float","flamingo","Flamingo float",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"serene, sultry smile",
  pose:"riding her lover on a giant flamingo pool float",pc:"lustful expression",c1:{skinFinish:"wet skin with water droplets"},
  w1:{thighAccessory:["tugged-down {c} bikini bottoms around one thigh","@c1"],heldItem:["pink cocktail with a paper umbrella","-"],earAccessory:["flower tucked behind one ear","@c1"]},
  w2m:{bottom:["swim trunks pulled down to the thighs","@c1"]},w2f:{thighAccessory:["tugged-down {c} bikini bottoms around one thigh","@c1"]},
  blurb:"Riding him on a giant pink flamingo float in the middle of a night pool party, cocktail raised.",
  scene:`At a glamorous night pool party under strings of pink lights, the woman rides {lover} in the cowgirl position on a giant inflatable pink flamingo floating in the middle of the pool, her tugged-down {c} bikini bottoms around one thigh, water lapping at the float. {His} thick, veiny {cock} is buried to the hilt in her vagina as she rolls her hips with motion lines. Partygoers in the water around them raise their drinks and cheer, and she gives the viewer a serene, sultry smile with a pink cocktail in one hand, as {he} cums inside her and cum overflows from her vagina. ${ST}, pool party, swimming pool, night, string lights, pool float, inflatable flamingo, cowgirl position, girl on top, bikini pull, cocktail, crowd, cheering, smile, cum in pussy, cum overflow, motion lines, sweat`}],
["mixedbath","kraken","Mixed bath",{act:"sex, vaginal, straddling, sitting on lap, partially submerged, creampie",ex:"cool, otherworldly half-smile",
  pose:"straddling her lover in a crowded outdoor mixed bath",pc:"lustful, half-lidded stare",c1:{skinFinish:"wet skin with water droplets"},
  w1:{headwear:["small white onsen towel folded on her head","-"]},w2m:{headwear:["small white onsen towel folded on her head","-"]},w2f:{headwear:["small white onsen towel folded on her head","-"]},
  blurb:"Straddling him under the milky water of a busy mixed bath at night, a towel on her head and a perfectly innocent smile.",
  scene:`In a busy outdoor mixed bath at night, steam rising from the milky water under paper lanterns, the woman sits facing {lover} in {his} lap, straddling {him} chest-deep in the hot water with a small towel folded on her head, while a few other bathers soak and chat only a few feet away. Beneath the milky surface, {his} thick, veiny {cock} is buried to the hilt in her vagina as she rolls her hips slowly, ripples spreading with motion lines, her heavy breasts floating at the surface. She keeps a cool, otherworldly half-smile on her face as if nothing is happening and whispers "Don't make a sound~" in a speech bubble, as {he} cums inside her and cum clouds the water between them. ${ST}, onsen, mixed bathing, hot spring, steam, night, paper lantern, partially submerged, straddling, sitting on lap, towel on head, smile, cum in pussy, motion lines, speech bubble, wet`}],
["noren","salmon","Behind the noren",{act:"sex, vaginal, sex from behind, standing sex, covering mouth, creampie",ex:"lip-biting, stifled moan",
  pose:"bent over a prep counter behind a noren curtain, hand over her mouth",pc:"lustful, half-lidded stare",
  w1:{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},w2m:{top:["crisp white chef's coat with {c2} piping","white",null,"@c1"],headwear:["twisted {c} hachimaki headband","@dark"]},
  w2f:{top:["cropped chef-style jacket","white"],headwear:["twisted {c} hachimaki headband","@dark"]},
  blurb:"In the middle of dinner service, bent over the prep counter behind his noren while customers chatter on the other side.",
  scene:`During a busy dinner service at a tiny sushi bar, the woman is bent over the prep counter in the narrow kitchen behind the indigo noren curtain, her skirt hiked up around her waist, while {lover}, still in {his} chef's coat, fucks her from behind; through the gap in the noren, customers laugh and chatter at the counter only a few feet away. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, rattling the knives and plates. She clamps a hand over her mouth, biting back her moans with flushed cheeks, and whispers "They'll hear us♡" in a tiny speech bubble, as {he} cums inside her and cum drips down her thighs. ${ST}, sushi bar, kitchen, noren, counter, restaurant, crowd, standing sex, sex from behind, bent over, skirt lift, covering own mouth, blush, cum in pussy, cum drip, motion lines, speech bubble, sweat`}],
["planetarium","crow","Planetarium",{act:"sex, vaginal, straddling, sitting on lap, covering mouth, creampie",ex:"hand clamped over her mouth, eyes wide with thrill",
  pose:"straddling her lover in the back row of a planetarium",pc:"lustful, half-lidded stare",
  w1:{top:["fuzzy knit sweater","@c2"],bottom:["long skirt hiked up over the knees","@c1"]},w2m:{},w2f:{},
  blurb:"In the very back row of a packed planetarium show, straddling him under her long skirt while the stars wheel overhead.",
  scene:`In the darkened dome of a busy planetarium during the evening star show, the woman sits facing {lover} in {his} lap in the very back row, her long skirt spread over them both, rolling her hips while a starfield and glowing constellations wheel across the dome and rows of visitors gaze up in front of them. Beneath her skirt {his} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She clamps a hand over her mouth, eyes wide with thrill and starlight reflected in them, as a constellation shaped like a crow lights up overhead and {he} cums inside her, cum dripping down her thighs. ${ST}, planetarium, dome, starry sky, constellation, theater, audience, dark, straddling, sitting on lap, skirt, covering own mouth, wide-eyed, blush, cum in pussy, cum drip, motion lines, sweat`}]
  ];
  PS.sort((a,b)=>ORD(a[1])-ORD(b[1]));
  START.add("Academy Public Sex",PS.map(([key,h,name,x])=>{
    const m=h+"man",mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},SEX,x.c1||{},{expression:x.ex,posture:x.pose});
    const w1={name:"In public",look:"casual",f:x.w1},w2={name:"In public",look:"casual",m:x.w2m||{},f:x.w2f||{}};
    return{id:"public"+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"In public",look:"casual",items:res(x.w1),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:["public sex","exhibitionism","explicit","sex","pair",h],
      blurb:`${x.blurb} ${cap(h)} with the ${mt?mt.name:cap(h)+" boyfriend"}; switch either character in the Scene tab and the scene follows.`};
  }),{after:"Academy Intimacy"});
  const bad=[];
  PS.forEach(([k,h,n,x])=>{[x.w1,x.w2m,x.w2f].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")}));
    [["expression",x.ex],["posture",x.pose],["expression",x.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("public sex scene: "+m);try{console.warn("[public sex] "+m)}catch(e){}});
})();

/* ---- v145 (v151: Salmon and Crow): three heartbreak sets for the Academy girls, not explicit, solo first with an optional partner:
     "Academy Funeral"         grief: each girl mourns someone (or something) she loved
     "Academy Breakup"         the moment it ends, or the moment right after
     "Academy Pregnancy Test"  two lines nobody wanted to see alone, or one line after hoping
   Tags follow Danbooru's own tear/emotion vocabulary (crying, streaming tears, crying with eyes open, tears from one eye,
   wiping tears, sobbing, sad smile, forced smile, despair, empty eyes; funeral dress, funeral veil, funeral kimono,
   tombstone, graveyard, coffin, incense, iei, holding photo, burial at sea; pregnancy test; comforting, hug,
   hand on another's shoulder, head on chest). "broken heart" is left out on purpose: on Danbooru it is a comedic symbol.
   Makeup stays clean: tears are clear tracks, never running mascara. Penguin's three stories: her grandmother's scarf,
   the penguin keychain at the bus stop, and the tiny penguin hat she knitted in secret. */
(function(){
  const G="Heartbreak";
  START.option("expression","tearful, faraway gaze at the sea","Heartbreak");
  START.option("expression","pleading, tear-filled eyes and a trembling smile","Heartbreak");
  START.option("expression","stunned, breaking half-smile with brimming eyes","Heartbreak");
  START.option("posture","standing at a lighthouse lamp, her palm on the brass","Heartbreak");
  START.option("posture","clinging to someone's sleeve on a rainy street","Heartbreak");
  START.option("posture","standing at a dark window over the sea, a test in her hand","Heartbreak");
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t,fam));
  const opt=(f,list,g)=>list.forEach(v=>START.option(f,v,g||G));
  const tl=(...a)=>[...new Set(a.filter(Boolean).join(", ").split(/,\s*/).filter(Boolean))].join(", ");
  /* v151: Salmon and Crow */
  ["standing knee-deep in a river, letting ashes go into the current","kneeling under a bare tree, burying a small wooden box",
   "sitting alone at a sushi counter before two untouched plates","standing on a doorstep holding a box of returned trinkets",
   "sitting on a backstage bathroom floor in a couture gown, a test in her hand","sitting on the edge of a bathtub beside an open trinket tin, a test in her hand"].forEach(v=>START.option("posture",v,"Heartbreak"));
  START.item("heldItem","dented tin box of shiny trinkets","CU","casual");START.item("heldItem","shoebox full of returned trinkets","CU","casual");
  START.item("top","black linen dress","CU","casual");START.item("heldItem","simple brass urn","CU","casual");

  /* ---------- items ---------- */
  it("top",["black funeral dress","black mourning dress with long sleeves","black funeral kimono","black linen dress","flowing black sundress",
    "{c} pretty wrap dress","oversized {c} knit sweater","elegant {c} satin slip dress","{c} tank top","soft {c} cashmere sweater","{c} band tee",
    "flowing {c} sundress","{c} crop top","{c} silk pajama shirt","oversized {c} sleep shirt","cozy {c} pajamas","{c} silk robe tied at the waist",
    "{c} team training shirt","{c} penguin-print pajamas","faded flannel shirt","fuzzy knit sweater"],"CU","casual");
  it("bottom",["worn jeans","pleated midi skirt","gray sweatpants","ripped black jeans","denim shorts","{c} running shorts"],"CU","casual");
  it("outerwear",["long black wool coat","{c} belted trench coat","black leather jacket","oversized yellow fisherman's raincoat","{c} puffer coat"],"CU","casual");
  it("headwear",["black funeral veil","black pillbox hat with a short veil","crown of white flowers","old captain's cap","wilted flower crown",
    "knit pom-pom beanie","fluffy fox ear headband"],"CU","casual");
  it("legwear",["sheer black tights","black ankle boots"],"CU","casual");
  it("neckAccessory",["his dog tags on a chain","chunky knit scarf"],"CU","casual");
  it("gloves",["short black lace gloves","fluffy knit mittens"],"CU","casual");
  it("heldItem",["folded flag","faded floral apron","folded eulogy pages","black umbrella","worn leather dog collar with a tag","pair of worn pointe shoes",
    "simple brass urn","small knitted penguin plush","smoking incense stick","string of pearls cradled in both hands","plumeria flower lei","white rose",
    "smartphone showing a text message","handwritten goodbye letter","oversized gray hoodie that was his","diamond engagement ring",
    "stack of photos and love letters","one half of a matching penguin keychain","smartphone held up for a selfie","smartphone glowing in the dark",
    "positive pregnancy test with two pink lines","negative pregnancy test with a single line","open journal and a pen",
    "pair of tiny knitted baby booties","tiny orange knitted baby hat with penguin eyes"],"CU","casual");

  /* ---------- character options ---------- */
  opt("expression",["trembling lower lip and brimming eyes","crumpling, sobbing face","quiet, shattered composure","single tear sliding down a composed face",
    "clenched jaw and tears spilling over","quiet, trembling sob","furious, tear-streaked scream","soft, tearful smile through her grief","silent, wide-eyed grief",
    "broken, shaking sob","forced, brittle smile with tears spilling over","serene, tear-filled gaze","desperate, tear-streaked cry","hollow, tear-streaked stare",
    "hand pressed over her mouth to muffle sobs","fierce, tear-streaked glare","shattered, disbelieving stare","brave, wavering smile through streaming tears",
    "trembling, brave little smile with tears freezing on her lashes","goofy, wobbling grin with tears pouring down","red-eyed, exhausted stare",
    "closed-eyed, trembling smile","pale, frightened stare","lost, faraway look with brimming eyes","cold, composed face cracking into tears",
    "stunned, trembling stare","fragile, terrified hope in tear-filled eyes","small, broken smile through her tears","nervous, cracking laugh with tears welling",
    "crumpling, tearful face, her smile gone","stunned, hurt look with tears welling","frozen, frightened stare at her reflection",
    "numb, faraway stare with tears sliding down"]);
  const PC=["grief-stricken, tender look","pained, guilty look","cold, distant look","tearful, gentle look","stunned, frightened look","relieved, oblivious look","carefree, laughing look"];
  opt("expression",PC);tagB("expression",PC);
  opt("faceAccents",["glistening tear tracks down both cheeks","a single tear track down one cheek","tears welling at the lower lashes"]);
  opt("blushStyle",["red-rimmed eyes and tear-flushed cheeks"]);
  const CRY={faceAccents:"glistening tear tracks down both cheeks",blushStyle:"red-rimmed eyes and tear-flushed cheeks"};
  const ONE={faceAccents:"a single tear track down one cheek",blushStyle:"lightly flushed cheeks"};
  const WELL={faceAccents:"tears welling at the lower lashes",blushStyle:"lightly flushed cheeks"};

  /* ---------- builder: solo first, not explicit, optional partner ---------- */
  function soloSet(label,after,suf,cfg,rows){
    START.add(label,rows.map(([h,name,x])=>{
      const rb=tplById(h+"robes");
      const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const c1=Object.assign({},CRY,x.c1||{},{expression:x.ex,posture:x.pose});
      return{id:h+suf,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname:cfg.oname,look:"casual",items:res(x.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"cowboy shot",explicit:false,lewdtag:false,
          must:`an anime style with high detail, ${x.set}, and particular emphasis on highly detailed skin, hair, eyes and tears`,
          pair:{id:"",outfit:"scene",solo:`${x.solo} ${tl(cfg.tail,x.tags,x.stags)}`,scene:`${x.duo} ${tl(cfg.tail,x.tags,x.dtags)}`,soloCount:"1girl, solo focus",
            act:x.act||"",dir:"mutual",explicit:false,penis:false,pc:{expression:x.pc||cfg.pc,posture:null},c1,
            w1:{name:cfg.oname,look:"casual",f:x.w1||{}},w2:{name:cfg.oname,look:"casual",f:x.w2f||cfg.w2f||{},m:x.w2m||cfg.w2m||{}},compact:false,fit:true}},
        tags:cfg.tags.concat([h]),blurb:`${x.blurb} Solo by default; pick a partner in the Scene tab to add one.`};
    }),{after});
    const bad=[];
    rows.forEach(([h,n,x])=>{[x.w1,x.w2f||cfg.w2f,x.w2m||cfg.w2m].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(h+": "+f+" “"+a[0]+"”")}));
      [["expression",x.ex],["posture",x.pose],["expression",x.pc||cfg.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(h+": "+f+" “"+v+"”")})});
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }
  const MOURN_M={top:["black turtleneck sweater","-"],outerwear:["long wool overcoat","black"],bottom:["tailored suit trousers","black"]};
  const MOURN_F={top:["black funeral dress","-"],outerwear:["long black wool coat","-"]};
  addMO("top",[["black turtleneck sweater","CU","casual"]]);

  /* ======================= Funeral ======================= */
  opt("posture",["kneeling at a graveside in the rain, clutching a folded flag","standing alone in a kitchen, holding an apron to her face",
    "standing at a lectern, reading from trembling pages","standing at a grave under a black umbrella","kneeling by a fresh grave under a tree",
    "kneeling to lay pointe shoes on a grave","on her knees in a storm, screaming at the sky","kneeling in the earth, planting a sapling",
    "leaning over a boat's rail, scattering ashes","kneeling at a snowy grave, holding a scarf to her face","kneeling before a funeral altar, holding incense",
    "sitting alone in a front pew, holding a string of pearls","standing waist-deep in the sea, releasing a flower lei"]);
  soloSet("Academy Funeral","Academy Cosplay","funeral",{oname:"Mourning",pc:"grief-stricken, tender look",tail:"funeral, mourning, sad",w2m:MOURN_M,w2f:MOURN_F,
    tags:["funeral","mourning","heartbreak","sad"]},[
["griffin","Folded flag",{ex:"trembling lower lip and brimming eyes",pose:"kneeling at a graveside in the rain, clutching a folded flag",c1:{skinFinish:"wet skin with water droplets"},
  w1:{top:["black funeral dress","-"],legwear:["sheer black tights","-"],heldItem:["folded flag","-"]},
  set:"a military cemetery on a gray, rainy day",blurb:"Kneeling in the rain at her father's grave, clutching his folded flag: \"You promised you'd come home.\"",
  solo:`At a military cemetery under a gray, rainy sky, the woman kneels in the wet grass before her father's fresh grave in a black funeral dress, rain soaking her hair, clutching his folded flag to her chest with both arms. Rows of white headstones stretch away behind her. Her lower lip trembles and tears stream down her face as she whispers "You promised you'd come home" in a speech bubble.`,
  duo:`At a military cemetery under a gray, rainy sky, the woman kneels in the wet grass before her father's fresh grave in a black funeral dress, clutching his folded flag to her chest, while {partner} kneels behind her, holding a black umbrella over her with one hand on her shoulder; tears stream down her trembling face.`,
  tags:"funeral dress, black dress, kneeling, grave, tombstone, graveyard, rain, wet hair, folded flag, hugging object, trembling, crying, streaming tears, overcast",stags:"speech bubble",dtags:"comforting, hand on another's shoulder, black umbrella"}],
["badger","Grandma's apron",{ex:"crumpling, sobbing face",pose:"standing alone in a kitchen, holding an apron to her face",
  w1:{top:["black funeral dress","-"],heldItem:["faded floral apron","-"]},
  set:"her late grandmother's sunny cottage kitchen",blurb:"Home from the funeral, alone in her grandmother's kitchen, sobbing into the apron that still smells like her.",
  solo:`After the funeral, in her late grandmother's sunny cottage kitchen, the woman stands alone in a black funeral dress, pressing her grandmother's faded floral apron to her face and breathing it in, her shoulders shaking as she sobs. On the flour-dusted table lies a handwritten recipe card beside an unbaked pie, and an empty rocking chair sits by the window.`,
  duo:`After the funeral, in her late grandmother's sunny cottage kitchen, the woman sobs into her grandmother's faded floral apron while {partner} wraps {his} arms around her from behind, resting {his} cheek against her hair; a handwritten recipe card and an unbaked pie lie on the table.`,
  tags:"kitchen, apron, holding clothes, covering face, sobbing, crying, tears, funeral dress, black dress, recipe, pie, rocking chair, empty chair, sunlight, cottage",stags:"alone",dtags:"comforting, hug from behind"}],
["raven","The eulogy",{ex:"quiet, shattered composure",pose:"standing at a lectern, reading from trembling pages",c1:ONE,
  w1:{top:["black funeral dress","-"],eyewear:["round glasses","@metal"],heldItem:["folded eulogy pages","-"]},
  set:"a candlelit stone chapel",blurb:"Reading her mother's eulogy beside the coffin, voice breaking on the last line.",
  solo:`In a hushed stone chapel lit by tall candles, the woman stands at the lectern in a black funeral dress beside her mother's flower-covered coffin and a black-ribboned portrait, reading the eulogy she wrote. The pages tremble in her hands, her voice breaks, and a single tear rolls out from under her glasses as she stops, unable to read the last line: "...and she always left the light on for me."`,
  duo:`In a hushed, candlelit stone chapel, the woman stands at the lectern in a black funeral dress beside her mother's flower-covered coffin, her voice breaking over the eulogy, while {partner} steps up beside her and rests a steadying hand on her back; a single tear rolls out from under her glasses.`,
  tags:"church, chapel, candle, lectern, holding paper, reading, coffin, portrait (object), iei, flowers, glasses, funeral dress, black dress, tears from one eye, single tear, trembling",dtags:"comforting, hand on another's back"}],
["serpent","After they've gone",{ex:"single tear sliding down a composed face",pose:"standing at a grave under a black umbrella",c1:ONE,
  w1:{top:["black mourning dress with long sleeves","-"],headwear:["black funeral veil","-"],gloves:["short black lace gloves","-"],heldItem:["black umbrella","-"]},
  set:"a misty cemetery at dusk",blurb:"Alone at her father's grave long after everyone left: perfect posture, chin high, one tear behind the veil.",
  solo:`In a misty cemetery at dusk, long after the other mourners have gone, the woman stands alone before her father's black marble headstone in an elegant black mourning dress and a black funeral veil, holding a black umbrella. Her posture is perfect and her chin is high, but behind the veil a single tear slides down her composed face, and the white rose she meant to leave lies crushed in her gloved fist.`,
  duo:`In a misty cemetery at dusk, long after the other mourners have gone, the woman stands before her father's black marble headstone in a black mourning dress and funeral veil, chin high, while {partner}, the only one who stayed, stands close beside her under her umbrella and quietly takes her gloved hand; a single tear slides down her composed face.`,
  tags:"graveyard, tombstone, grave, dusk, fog, black umbrella, funeral veil, veil, funeral dress, black dress, black gloves, lace gloves, white rose, single tear, tears from one eye, expressionless, standing",stags:"alone",dtags:"holding hands"}],
["wolf","Under the oak",{ex:"clenched jaw and tears spilling over",pose:"kneeling by a fresh grave under a tree",
  w1:{top:["faded flannel shirt","@c1"],bottom:["worn jeans","-"],heldItem:["worn leather dog collar with a tag","-"]},
  set:"a big oak tree at the edge of a field at sunset",blurb:"Burying the old dog who grew up with her, under the oak, his collar held to her chest.",
  solo:`Under a big oak tree at the edge of a field at sunset, the woman kneels in the dirt beside a small fresh grave marked with a wooden cross and a faded tennis ball, clutching her old dog's worn leather collar to her chest. A shovel leans against the trunk. She clenches her jaw, trying so hard not to cry, but the tears spill over and run down her cheeks anyway.`,
  duo:`Under a big oak tree at sunset, the woman kneels in the dirt beside a small fresh grave marked with a wooden cross and a faded tennis ball, clutching her old dog's worn collar, while {partner} kneels beside her with {his} arm around her shoulders; her jaw is clenched and tears spill down her cheeks.`,
  tags:"grave, tree, oak tree, field, sunset, kneeling, shovel, collar, holding, tennis ball, wooden cross, clenched teeth, crying, streaming tears, plaid shirt, jeans, outdoors",dtags:"comforting, arm around shoulder"}],
["swan","Her first pointe shoes",{ex:"quiet, trembling sob",pose:"kneeling to lay pointe shoes on a grave",c1:{skinFinish:"wet skin with water droplets"},
  w1:{top:["black funeral dress","-"],earAccessory:["pearl drop earrings","-"],heldItem:["pair of worn pointe shoes","pale pink"]},
  set:"a quiet cemetery of white stone in soft spring rain",blurb:"Laying her first pair of pointe shoes on her ballet teacher's grave, back straight, shoulders shaking.",
  solo:`In a quiet cemetery of white stone in the soft spring rain, the woman kneels gracefully in a black funeral dress before the grave of the ballet teacher who made her a dancer, laying her first pair of worn pointe shoes, ribbons and all, against the headstone among white lilies. Her back is still perfectly straight, but her shoulders shake with quiet sobs and tears drip from her chin onto the satin.`,
  duo:`In a quiet cemetery in the soft spring rain, the woman kneels gracefully in a black funeral dress, laying her first worn pointe shoes against her ballet teacher's headstone among white lilies, while {partner} stands over her holding an umbrella; her shoulders shake with quiet sobs.`,
  tags:"graveyard, tombstone, kneeling, pointe shoes, ballet slippers, white lily, lily (flower), flowers, rain, funeral dress, black dress, crying, tears, sobbing, pearl earrings",dtags:"umbrella, comforting"}],
["dragon","Rage at the sky",{ex:"furious, tear-streaked scream",pose:"on her knees in a storm, screaming at the sky",c1:{skinFinish:"wet skin with water droplets"},
  w1:{top:["black funeral dress","-"],outerwear:["black leather jacket","-"],neckAccessory:["his dog tags on a chain","@metal"]},
  set:"a cemetery in a thunderstorm",blurb:"On her knees in the mud at her brother's grave, in his jacket and dog tags, screaming at the storm.",
  solo:`In a cemetery lashed by a thunderstorm, the woman drops to her knees in the mud before her brother's grave in a black funeral dress and his old leather jacket, his dog tags swinging from her neck, and screams at the sky with her fists clenched, tears and rain streaming down her face, as lightning splits the clouds above the headstones.`,
  duo:`In a cemetery lashed by a thunderstorm, the woman screams at the sky on her knees in the mud before her brother's grave, fists clenched, in his old leather jacket and dog tags, while {partner} drops to {his} knees beside her and pulls her into {his} arms; tears and rain stream down her face.`,
  tags:"graveyard, tombstone, storm, rain, lightning, kneeling, mud, screaming, clenched hands, crying, streaming tears, wet, funeral dress, leather jacket, dog tags, looking up, despair",dtags:"comforting, hug"}],
["stag","Grow tall",{ex:"soft, tearful smile through her grief",pose:"kneeling in the earth, planting a sapling",
  w1:{top:["black linen dress","-"],headwear:["crown of white flowers","-"]},
  set:"a sunlit woodland clearing used for natural burials",blurb:"Planting an oak sapling over her mother's resting place with her bare hands: \"Grow tall for me, Mama.\"",
  solo:`In a sunlit woodland clearing used for natural burials, the woman kneels in the soft earth in a simple black linen dress, a crown of white flowers in her hair, pressing the soil around a young oak sapling planted over her mother's resting place with her bare hands. A deer watches from the trees and petals drift down, and she smiles softly through her tears, whispering "Grow tall for me, Mama" in a speech bubble.`,
  duo:`In a sunlit woodland clearing used for natural burials, the woman kneels in the soft earth in a black linen dress, pressing soil around a young oak sapling planted over her mother's resting place, while {partner} kneels beside her and pours water from a watering can over it; she smiles softly through her tears.`,
  tags:"forest, clearing, sunlight, light rays, kneeling, planting, sapling, tree, soil, deer, petals, head wreath, white flower, black dress, sad smile, tears",stags:"speech bubble",dtags:"watering can"}],
["shark","Burial at sea",{ex:"silent, wide-eyed grief",pose:"leaning over a boat's rail, scattering ashes",
  w1:{top:["black funeral dress","-"],outerwear:["oversized yellow fisherman's raincoat","-"],headwear:["old captain's cap","-"],heldItem:["simple brass urn","-"]},
  set:"a gray, choppy sea at dawn",blurb:"Tipping her fisherman father's ashes into the waves from his old boat, in his raincoat and cap, her grin gone.",
  solo:`At dawn on a gray, choppy sea, the woman leans over the rail of her late father's old fishing boat in a black funeral dress under his oversized yellow raincoat, his battered captain's cap on her head, tipping his ashes from a simple brass urn into the wind and the waves. Gulls wheel overhead and the empty wheelhouse creaks behind her; her usual sharp-toothed grin is gone, and tears run silently down her face as she stares at the horizon.`,
  duo:`At dawn on a gray, choppy sea, the woman leans over the rail of her late father's fishing boat in his yellow raincoat and captain's cap, tipping his ashes from a brass urn into the waves, while {partner} stands behind her with {his} hands on her shoulders; tears run silently down her face.`,
  tags:"burial at sea, boat, ocean, dawn, overcast, waves, urn, ashes, seagull, raincoat, yellow raincoat, peaked cap, funeral dress, leaning on rail, crying, tears, expressionless, wind",dtags:"comforting, hands on another's shoulders"}],
["penguin","Grandma's scarf",{ex:"broken, shaking sob",pose:"kneeling at a snowy grave, holding a scarf to her face",
  w1:{top:["black funeral dress","-"],outerwear:["long black wool coat","-"],neckAccessory:["chunky knit scarf","@accent"],legwear:["sheer black tights","-"],heldItem:["small knitted penguin plush","-"]},
  set:"a hushed, snow-covered cemetery as soft flakes fall",blurb:"Kneeling in the snow at her grandmother's grave, holding the orange scarf her grandmother knitted for her to her face.",
  solo:`In a hushed, snow-covered cemetery as soft flakes fall, the woman kneels in the snow before her grandmother's headstone in a black funeral dress and a long black wool coat, pressing the end of the chunky orange knit scarf her grandmother made for her against her face, breathing in the last trace of her. A tiny knitted penguin, the first thing they ever knitted together, sits on top of the snowy headstone. Her cheerful smile is gone; her freckled cheeks are wet, tears freeze on her eyelashes, and she sobs "Who's going to teach me the rest of the pattern?" in a speech bubble, her breath clouding in the cold.`,
  duo:`In a hushed, snow-covered cemetery as soft flakes fall, the woman kneels before her grandmother's headstone in a black funeral dress and long black coat, pressing the orange scarf her grandmother knitted for her against her face, a tiny knitted penguin on the snowy headstone, while {partner} kneels beside her in the snow and wraps her in {his} arms, holding a black umbrella over them both; she sobs, tears freezing on her eyelashes.`,
  tags:"graveyard, tombstone, snow, snowing, winter, kneeling, scarf, holding scarf, covering face, knitted toy, stuffed penguin, funeral dress, black coat, sobbing, crying, tears, visible breath, freckles",stags:"speech bubble",dtags:"comforting, hug, black umbrella"}],
["fox","Incense for grandfather",{ex:"forced, brittle smile with tears spilling over",pose:"kneeling before a funeral altar, holding incense",
  w1:{top:["black funeral kimono","-"],heldItem:["smoking incense stick","-"]},
  set:"a traditional funeral altar banked with white chrysanthemums",blurb:"Keeping the playful smile her grandfather loved in place for the guests, while it cracks.",
  solo:`At a traditional funeral altar banked with white chrysanthemums, the woman kneels on a cushion in a black funeral kimono before her grandfather's black-ribboned portrait, holding a smoking stick of incense in her joined hands. She keeps the playful smile he loved fixed on her face for the guests behind her, but it is cracking, tears spilling down her cheeks onto her folded hands. His old fox mask rests beside the portrait.`,
  duo:`At a traditional funeral altar banked with white chrysanthemums, the woman kneels in a black funeral kimono before her grandfather's black-ribboned portrait, holding a stick of incense, while {partner} kneels beside her in black and lays {his} hand over hers; her playful smile is cracking as tears spill down her cheeks.`,
  tags:"funeral kimono, kimono, black kimono, seiza, kneeling, incense, altar, chrysanthemum, white flower, portrait (object), iei, fox mask, forced smile, sad smile, crying, tears, tatami, indoors",dtags:"hand on another's hand"}],
["lovebird","Sixty years",{ex:"wobbly, tearful little smile",pose:"kneeling at a shared headstone, holding a wedding photo",
  w1:{top:["black funeral dress","-"],legwear:["sheer black tights","-"],heldItem:["wedding photo in a silver frame","-"],headwear:["ribbon bows tied at the twintails","black"]},
  set:"a quiet cemetery under blossoming trees",blurb:"At the headstone her grandparents now share after sixty years together, holding their wedding photo while two lovebirds land on the stone.",
  solo:`In a quiet cemetery under blossoming trees, the woman kneels in a black funeral dress, black ribbons in her twintails, before a fresh headstone carved with both of her grandparents' names, sixty years together and now side by side again. She holds their old wedding photo in a silver frame against her chest. Two little lovebirds land on top of the headstone and press together, and she tries to smile at them through her tears with a wobbly, tearful little smile, whispering "You found her, Grandpa" in a speech bubble.`,
  duo:`In a quiet cemetery under blossoming trees, the woman kneels in a black funeral dress before the headstone her grandparents now share, holding their wedding photo, while {partner} kneels beside her with {his} arm around her shoulders; two lovebirds land on the stone and she smiles a wobbly, tearful little smile.`,
  tags:"graveyard, tombstone, kneeling, holding photo, picture frame, wedding photo, bird, petals, cherry blossoms, funeral dress, black dress, black ribbon, twintails, sad smile, crying, tears",stags:"speech bubble",dtags:"comforting, arm around shoulder"}],
["flamingo","Leis on the water",{ex:"serene, tear-filled gaze",pose:"standing waist-deep in the sea, releasing a flower lei",
  w1:{top:["flowing black sundress","-"],heldItem:["plumeria flower lei","pink"]},
  set:"a quiet beach at sunset during a memorial paddle-out",blurb:"Letting a pink lei drift out to sea at a sunset memorial, among dozens of others.",
  solo:`At sunset on a quiet beach, the woman stands waist-deep in the warm sea in a flowing black sundress at a memorial paddle-out, letting a pink plumeria lei slip from her fingers onto the water, where dozens of other flower leis drift in a wide circle toward the setting sun. Her long hair lifts in the breeze, and she gazes after the flowers with a serene, tear-filled gaze, tears catching the pink-gold light.`,
  duo:`At sunset on a quiet beach, the woman stands waist-deep in the warm sea in a flowing black sundress, letting a pink plumeria lei slip onto the water among dozens of drifting leis, while {partner} stands in the water beside her with {his} arm around her waist; tears catch the pink-gold light.`,
  tags:"beach, ocean, sunset, wading, partially submerged, lei, flower lei, plumeria, floating flowers, black dress, sundress, wind, tears, sad, sad smile",dtags:"arm around waist"}],
["kraken","The last light",{ex:"tearful, faraway gaze at the sea",pose:"standing at a lighthouse lamp, her palm on the brass",
  w1:{top:["black funeral dress","-"],outerwear:["long black wool coat","-"],neckAccessory:["pearl strand","-"]},
  set:"the lamp room of an old lighthouse on a stormy night",blurb:"The night after her grandmother's funeral, climbing the lighthouse she kept and lighting the lamp one last time.",
  solo:`The night after the funeral, the woman stands alone at the top of the old lighthouse her grandmother kept for fifty years, in a black funeral dress and a long black coat, her grandmother's pearls at her throat. She has just lit the great lamp one last time, and its beam sweeps out over the black, storm-tossed sea while rain streaks the glass. She rests her palm against the warm brass with a tearful, faraway gaze at the sea, tears sliding down her face, and whispers "Your light's still on, Grandma" in a speech bubble.`,
  duo:`The night after the funeral, at the top of the old lighthouse her grandmother kept, the woman stands in a black funeral dress and long black coat beside the freshly lit lamp, its beam sweeping the stormy sea, while {partner} holds her from behind with {his} chin on her shoulder; tears slide down her face.`,
  tags:"lighthouse, light rays, lamp, night, rain, storm, ocean, window, funeral dress, black dress, black coat, pearl necklace, standing, crying, tears",stags:"alone, speech bubble",dtags:"hug from behind, comforting"}],
["salmon","Upstream",{ex:"single tear sliding down a composed face",pose:"standing knee-deep in a river, letting ashes go into the current",c1:ONE,
  w1:{top:["black linen dress","-"],heldItem:["simple brass urn","-"]},
  set:"a wide mountain river at dawn in autumn",blurb:"Knee-deep in the river where the salmon come home every autumn, letting her grandfather's ashes go into the current: \"Go on home, Grandpa.\"",
  solo:`At dawn on a wide mountain river in autumn, red and gold leaves drifting on the water and mist rising off the current, the woman stands knee-deep in the cold river in a simple black linen dress, holding an open brass urn and letting her grandfather's ashes drift from her fingers into the water, while the salmon he taught her to love run upstream around her ankles, heading home. A single tear slides down her composed face, and she whispers "Go on home, Grandpa" in a speech bubble.`,
  duo:`At dawn on a misty autumn river, the woman stands knee-deep in the current in a black linen dress, letting her grandfather's ashes drift from an open brass urn while salmon run upstream around her ankles, and {partner} stands in the water behind her with one hand on her shoulder; a single tear slides down her composed face.`,
  tags:"river, autumn, autumn leaves, dawn, fog, standing in water, partially submerged, black dress, urn, ashes, salmon, fish, single tear, tears, sad",stags:"speech bubble",dtags:"comforting, hand on another's shoulder"}],
["crow","Every gift",{ex:"soft, tearful smile through her grief",pose:"kneeling under a bare tree, burying a small wooden box",
  w1:{top:["black mourning dress with long sleeves","-"],heldItem:["dented tin box of shiny trinkets","-"]},
  set:"a quiet backyard at dusk beneath a bare old tree",blurb:"Burying the wild crow who visited her window every morning for six years, beside the tin of every gift he ever left her.",
  solo:`In a quiet backyard at dusk, beneath the bare old tree where a wild crow perched every morning for six years, the woman kneels in a black mourning dress and lowers a little wooden box into a small hole in the earth, a dented tin beside her holding every gift the crow ever left on her windowsill: buttons, bottle caps, a silver ring, a blue marble. A row of crows watches silently from the branches above. She smiles softly through her tears and whispers "Thank you for every single one" in a speech bubble.`,
  duo:`In a quiet backyard at dusk beneath a bare old tree, the woman kneels in a black mourning dress, burying a little wooden box beside a dented tin of trinkets, while {partner} kneels next to her with an arm around her shoulders and a row of crows watches from the branches; she smiles softly through her tears.`,
  tags:"backyard, tree, bare tree, dusk, autumn, kneeling, digging, grave, box, tin, crow, bird, birds on branch, black dress, crying, tears, sad smile",stags:"speech bubble",dtags:"comforting, arm around shoulder"}]
  ]);

  /* ======================= Breakup ======================= */
  opt("posture",["running along a rainy platform, reaching after a train","sitting alone at a candlelit table set for two","sitting on the floor against the bed, reading a letter",
    "sitting slumped against a closed door","kneeling by a cardboard box, hugging a hoodie","sliding an engagement ring off her finger",
    "kneeling by a fire pit, feeding photos into the flames","kneeling in a meadow, watching someone walk away","standing at the end of a dock, waving with both arms",
    "standing at a snowy bus stop, clutching a keychain","sitting cross-legged on her bed, giving a thumbs up to her phone",
    "lying curled on her side in bed, lit by her phone","slow dancing alone, arms wrapped around herself"]);
  const CASM={top:["fitted cotton t-shirt","@dark"],outerwear:["bomber jacket","@dark"],bottom:["straight-leg jeans","-"]};
  const CASF={top:["oversized {c} knit sweater","@c1"],bottom:["worn jeans","-"]};
  soloSet("Academy Breakup","Academy Funeral","breakup",{oname:"The end",pc:"pained, guilty look",tail:"sad",w2m:CASM,w2f:CASF,tags:["breakup","heartbreak","sad"]},[
["griffin","Last train",{ex:"desperate, tear-streaked cry",pose:"running along a rainy platform, reaching after a train",c1:{skinFinish:"wet skin with water droplets"},
  w1:{outerwear:["{c} belted trench coat","@c1"],top:["fuzzy knit sweater","@c2"],bottom:["pleated midi skirt","@c1"],legwear:["black ankle boots","-"]},
  set:"a rain-soaked train platform at night",blurb:"Running down a rainy platform after the last train, one hand reaching for the window: \"Wait, please!\"",
  solo:`On a rain-soaked station platform at night, the woman runs after a departing train in her trench coat, one hand reaching out toward the last carriage window as it pulls away, rain plastering her hair to her face. She cries out "Wait... please!" in a speech bubble, tears streaming, as the red tail lights blur into the rain.`,
  duo:`On a rain-soaked station platform at night, the woman runs after a departing train in her trench coat, one hand reaching out, while {partner} stands behind the window of the last carriage with {his} palm pressed to the glass, unable to look at her; tears stream down her face as the train pulls away.`,
  tags:"train station, railroad tracks, train, rain, night, running, reaching, outstretched hand, trench coat, wet hair, crying, streaming tears, open mouth, motion blur",stags:"speech bubble",dtags:"window, hand on glass"}],
["badger","Two candles",{pc:"cold, distant look",ex:"trembling lower lip and brimming eyes",pose:"sitting alone at a candlelit table set for two",c1:WELL,
  w1:{top:["{c} pretty wrap dress","@c1"],heldItem:["smartphone showing a text message","-"]},
  set:"a cozy apartment late at night",blurb:"Anniversary night, the cake she baked untouched, two candles burned down, and one text: \"I think we should break up.\"",
  solo:`In a cozy apartment late at night, the woman sits alone at a little table set for two in her prettiest dress, the anniversary cake she baked untouched in front of her and two candles burned almost to nothing. Her phone glows in her hand with one new message: "I think we should break up." Her lower lip trembles, her eyes brim and spill over, and a tear drops onto the frosting.`,
  duo:`In a cozy apartment late at night, the woman sits at a little table set for two in her prettiest dress, the anniversary cake she baked untouched and two candles burned almost to nothing, while {partner} stands by the door in {his} coat, keys in hand, looking away; her lower lip trembles and her eyes spill over.`,
  tags:"table, candle, cake, anniversary, dinner, sitting, holding phone, cellphone, text message, phone screen, dress, night, indoors, tears, tearing up, sad, trembling",stags:"alone"}],
["raven","The letter",{ex:"hollow, tear-streaked stare",pose:"sitting on the floor against the bed, reading a letter",
  w1:{top:["oversized {c} knit sweater","@c1"],heldItem:["handwritten goodbye letter","-"]},
  set:"a dim bedroom on a rainy afternoon",blurb:"On the floor against the bed, reading his goodbye letter over and over while the rain runs down the window.",
  solo:`In a dim bedroom on a rainy afternoon, the woman sits on the floor against the side of the bed in an oversized knit sweater, knees drawn up, reading a handwritten goodbye letter over and over, the torn envelope and a pressed flower he once gave her lying beside her. Rain streaks the window and casts moving shadows across her face; she stares at the last line with a hollow, tear-streaked stare, tears dripping onto the ink and blurring the words.`,
  duo:`In a dim bedroom on a rainy afternoon, the woman sits on the floor against the bed in an oversized knit sweater, reading a handwritten goodbye letter, while {partner} stands in the doorway with a packed bag, watching her read; tears drip onto the ink.`,
  tags:"bedroom, sitting on floor, knees up, against bed, holding letter, letter, reading, envelope, pressed flower, oversized sweater, rain, window, shadow, dim lighting, crying, tears, empty eyes",dtags:"doorway, bag"}],
["serpent","The door closes",{pc:"cold, distant look",ex:"hand pressed over her mouth to muffle sobs",pose:"sitting slumped against a closed door",
  w1:{top:["elegant {c} satin slip dress","@c1"],earAccessory:["large hoop earrings","@metal"]},
  set:"an elegant penthouse at night",blurb:"Composed and cutting until the door clicks shut, then sliding down it with a hand over her mouth.",
  solo:`In her elegant penthouse at night, the moment the door clicks shut behind him, the woman slides down against it to the marble floor in her satin slip dress, one stiletto kicked off, pressing a hand over her mouth to muffle her sobs, the cool, cutting words she just said still hanging in the air. Her engagement ring sits alone on the side table under the lamp, and tears stream down her face while the city glitters indifferently through the window.`,
  duo:`In her elegant penthouse at night, the woman stands rigid by the open door in her satin slip dress, chin raised and face composed, as {partner} walks out carrying a box of {his} things; her hand trembles on the doorknob and a single tear escapes.`,
  tags:"against door, slouching, covering own mouth, crying, streaming tears, slip dress, high heels, shoe removed, ring, night, city lights, penthouse, indoors, marble floor",stags:"sitting on floor",dtags:"door, cardboard box, single tear"}],
["wolf","His hoodie",{ex:"clenched jaw and tears spilling over",pose:"kneeling by a cardboard box, hugging a hoodie",
  w1:{top:["{c} tank top","@c1"],bottom:["gray sweatpants","-"],heldItem:["oversized gray hoodie that was his","-"]},
  set:"a messy apartment",blurb:"Packing a box marked HIS STUFF, until she gets to his hoodie and can't let go of it.",
  solo:`In a messy apartment, the woman kneels on the floor beside a half-packed cardboard box marked "HIS STUFF" in angry marker, wearing a tank top and sweatpants; his game controller, a framed photo turned face-down and a pair of sneakers are already thrown inside. She was going to throw his oversized gray hoodie in too, but instead she is hugging it to her face, breathing it in, jaw clenched and tears spilling over as she shakes.`,
  duo:`In a messy apartment, the woman kneels beside a half-packed cardboard box marked "HIS STUFF", hugging his oversized gray hoodie to her face, while {partner} stands in the doorway waiting to take the box, staring at the floor; her jaw is clenched and tears spill over.`,
  tags:"cardboard box, kneeling, hugging object, hoodie, holding clothes, picture frame, tank top, sweatpants, clenched teeth, crying, tears, messy room, indoors",dtags:"doorway, looking down"}],
["swan","Returning the ring",{ex:"single tear sliding down a composed face",pose:"sliding an engagement ring off her finger",c1:ONE,
  w1:{top:["soft {c} cashmere sweater","@c1"],earAccessory:["pearl drop earrings","-"],heldItem:["diamond engagement ring","-"]},
  set:"a quiet café by a rain-streaked window",blurb:"Sliding the engagement ring off at a quiet café table, perfectly composed: \"Be happy.\"",
  solo:`In a quiet café by a rain-streaked window, the woman sits very straight across from an empty chair, slowly sliding her diamond engagement ring off her finger and setting it on the table beside a cooling cup of tea. Her face is perfectly composed, but her fingers tremble on the ring, and a single tear slides down her cheek as she whispers "Be happy" in a speech bubble.`,
  duo:`In a quiet café by a rain-streaked window, the woman sits very straight across the table from {partner}, slowly sliding her diamond engagement ring off her finger and setting it beside a cooling cup of tea, while {partner} stares at the ring and cannot meet her eyes; a single tear slides down her composed face.`,
  tags:"cafe, table, sitting, window, rain, holding ring, ring, engagement ring, removing jewelry, teacup, sweater, pearl earrings, single tear, tears from one eye, sad",stags:"empty chair, speech bubble",dtags:"sitting across table, looking down"}],
["dragon","Burning the letters",{pc:"cold, distant look",ex:"fierce, tear-streaked glare",pose:"kneeling by a fire pit, feeding photos into the flames",
  w1:{outerwear:["black leather jacket","-"],top:["{c} band tee","@c1"],bottom:["ripped black jeans","-"],heldItem:["stack of photos and love letters","-"]},
  set:"a backyard fire pit at night",blurb:"Feeding their photos and love letters into a fire pit one by one, glaring through the tears.",
  solo:`At night in a backyard, the woman kneels by a roaring fire pit in her leather jacket, feeding their photos and love letters into the flames one by one, the firelight blazing on her face. A photo of the two of them laughing curls and blackens in the fire, and she glares at it with a fierce, tear-streaked glare, tears running down her cheeks even as she refuses to look away.`,
  duo:`At night in a backyard, the woman kneels by a roaring fire pit in her leather jacket, feeding their photos and love letters into the flames, while {partner} watches from the dark edge of the yard, hands in {his} pockets; she glares into the fire with a fierce, tear-streaked glare.`,
  tags:"fire, fire pit, campfire, night, burning, photo (object), letter, kneeling, leather jacket, glaring, crying, tears, firelight, backyard, embers",dtags:"hands in pockets, standing"}],
["stag","Down the path",{pc:"cold, distant look",ex:"shattered, disbelieving stare",pose:"kneeling in a meadow, watching someone walk away",
  w1:{top:["flowing {c} sundress","@c1"],headwear:["wilted flower crown","@c1"]},
  set:"a vast wildflower meadow at golden hour",blurb:"On her knees in the wildflowers, watching him walk away down the long path without looking back.",
  solo:`In a vast wildflower meadow at golden hour, the woman kneels among the flowers in a flowing sundress, her flower crown slipped askew, staring after a lone figure walking away down the long dirt path toward the hills, never looking back. A picnic basket lies overturned beside her and the daisy chain she was making has fallen apart in her hands; she stares with a shattered, disbelieving look, tears welling and spilling over.`,
  duo:`In a vast wildflower meadow at golden hour, the woman kneels among the flowers in a flowing sundress, her flower crown askew and a broken daisy chain in her hands, while {partner} walks away from her down the long dirt path toward the hills, seen from behind, never looking back; tears well and spill over.`,
  tags:"meadow, field, flowers, golden hour, sunset, kneeling, path, picnic basket, head wreath, daisy, sundress, tears, crying, shocked",stags:"distant, silhouette",dtags:"walking away, from behind"}],
["shark","I'm fine!",{pc:"tearful, gentle look",ex:"brave, wavering smile through streaming tears",pose:"standing at the end of a dock, waving with both arms",
  w1:{top:["{c} crop top","@c1"],bottom:["denim shorts","-"],earAccessory:["small shark tooth earrings","-"]},
  set:"a wooden dock at sunset",blurb:"Waving the ferry off with her biggest grin, shouting that she's fine, while the tears run off her chin.",
  solo:`On a wooden dock at sunset, the woman stands at the very end waving both arms high at a ferry pulling away toward the horizon, grinning her widest sharp-toothed grin and shouting "Go get 'em! I'm fine!" in a speech bubble, while tears stream down her face and drip off her chin. Her flip-flops lie where she kicked them off running to catch the last glimpse.`,
  duo:`On a wooden dock at sunset, the woman waves both arms high at a ferry pulling away, grinning her widest sharp-toothed grin while tears stream down her face, as {partner} stands at the ferry's stern rail, waving back slowly.`,
  tags:"dock, pier, ferry, ship, ocean, sunset, waving, arms up, grin, sharp teeth, smile, crying, streaming tears, forced smile, crop top, denim shorts",stags:"speech bubble",dtags:"waving, railing"}],
["penguin","Bus stop in the snow",{ex:"trembling, brave little smile with tears freezing on her lashes",pose:"standing at a snowy bus stop, clutching a keychain",
  w1:{outerwear:["{c} puffer coat","white"],neckAccessory:["chunky knit scarf","@accent"],headwear:["knit pom-pom beanie","ice blue"],gloves:["fluffy knit mittens","white"],
    heldItem:["one half of a matching penguin keychain","-"]},
  set:"a lonely bus stop on a snowy night",blurb:"At a snowy bus stop, holding her half of their matching penguin keychain while his half lies in the snow.",
  solo:`At a lonely bus stop on a snowy night, under a flickering streetlamp, the woman stands in her puffer coat and chunky orange scarf, clutching her half of their matching penguin couple keychain to her chest in her mittens. The other half, the little penguin that fit against hers, lies half-buried in the snow at her feet, and one line of footprints leads away into the falling snow. She keeps a trembling, brave little smile on her face as tears freeze on her eyelashes, whispering "Okay... okay" in a speech bubble, her breath clouding in the cold.`,
  duo:`At a lonely bus stop on a snowy night, under a flickering streetlamp, the woman stands in her puffer coat and orange scarf, clutching her half of their matching penguin keychain, while {partner} walks away into the falling snow, seen from behind, hands in {his} pockets, not looking back; she reaches one mittened hand after {him}, a trembling, brave little smile on her face as tears freeze on her eyelashes.`,
  tags:"bus stop, snow, snowing, night, streetlight, winter, keychain, holding, penguin, footprints, scarf, beanie, mittens, puffer jacket, sad smile, forced smile, crying, tears, visible breath",stags:"speech bubble",dtags:"walking away, from behind, reaching"}],
["fox","Totally fine",{pc:"cold, distant look",ex:"goofy, wobbling grin with tears pouring down",pose:"sitting cross-legged on her bed, giving a thumbs up to her phone",
  w1:{top:["oversized {c} knit sweater","@c1"],headwear:["fluffy fox ear headband","@hair"],heldItem:["smartphone held up for a selfie","-"]},
  set:"her bedroom late at night",blurb:"Recording a cheerful \"it's totally fine, we're still friends!\" video with a thumbs up and tears pouring down.",
  solo:`Sitting cross-legged on her bed late at night, surrounded by crumpled tissues and an empty ice cream tub, the woman holds her phone up to record a video message, giving a big thumbs up with a goofy, wobbling grin and saying "Haha, no, it's totally fine! We're still friends!" in a speech bubble, while tears pour down her face and her chin trembles. Behind her, one photo on her corkboard has been torn in half.`,
  duo:`Sitting cross-legged on her bed late at night among crumpled tissues, the woman gives {partner} a big thumbs up and a goofy, wobbling grin as {he} stands at the bedroom door with {his} jacket on, about to leave; tears pour down her face and her chin trembles.`,
  tags:"bed, sitting, indian style, tissue box, tissue, ice cream, holding phone, thumbs up, forced smile, smile, crying, streaming tears, torn photo, corkboard, night, bedroom, oversized sweater",stags:"selfie, speech bubble",dtags:"doorway, jacket"}],
["lovebird","Love locks",{pc:"cold, distant look",ex:"wobbly, tearful little smile",pose:"leaning on a bridge railing covered in love locks",
  w1:{outerwear:["{c} belted trench coat","@c3"],top:["fuzzy knit sweater","@c1"],heldItem:["padlock engraved with two initials","-"]},
  set:"a love-lock bridge over a river at dusk",blurb:"On the love-lock bridge at dusk, holding the padlock with their initials that she can't unlock, because they threw the key in the river.",
  solo:`On a bridge over a river at dusk, its railings covered in thousands of love locks, the woman leans her forehead against the rail, holding one small padlock engraved with their two initials and a heart. She tugs at it, but it will never open: they threw the key into the river together a year ago. Her twintails droop, tears drip onto the lock, and she gives a wobbly, tearful little smile, whispering "We said forever..." in a speech bubble as the streetlamps flicker on.`,
  duo:`On a love-lock bridge over a river at dusk, the woman holds the padlock engraved with their initials while {partner} stands a few steps away with {his} hands in {his} pockets, looking out at the water and not at her; tears drip onto the lock.`,
  tags:"bridge, railing, padlock, love lock, river, dusk, streetlight, holding, leaning on rail, trench coat, sweater, twintails, sad smile, crying, tears",stags:"speech bubble",dtags:"hands in pockets, looking away"}],
["flamingo","The last dance",{pc:"tearful, gentle look",ex:"closed-eyed, trembling smile",pose:"slow dancing alone, arms wrapped around herself",
  w1:{top:["flowing {c} sundress","@c1"],earAccessory:["flower tucked behind one ear","@c1"]},
  set:"a half-empty living room at dusk",blurb:"Slow dancing alone among the moving boxes to the record that's still playing, arms around herself.",
  solo:`In a half-empty living room at dusk, moving boxes stacked by the door and pink light pouring through the windows, the woman slow dances alone and barefoot in a flowing sundress to the old record still spinning on the turntable, arms wrapped around herself as if someone were still holding her, eyes closed and smiling a trembling smile as tears slide silently down her cheeks.`,
  duo:`In a half-empty living room at dusk among stacked moving boxes, the woman and {partner} slow dance one last time to the old record still spinning, her head on {his} chest and {his} chin resting on her hair, her eyes closed and tears sliding silently down her cheeks.`,
  tags:"dancing, slow dancing, barefoot, record player, living room, cardboard box, sunset, window, sundress, closed eyes, sad smile, tears, crying",stags:"hugging self",dtags:"head on chest, hug"}],
["kraken","One more minute",{ex:"pleading, tear-filled eyes and a trembling smile",pose:"clinging to someone's sleeve on a rainy street",pc:"pained, guilty look",c1:{skinFinish:"wet skin with water droplets"},
  w1:{outerwear:["long black wool coat","-"],legwear:["black ankle boots","-"]},
  set:"a rain-soaked city street at night",blurb:"The girl who never lets go, holding on to his coat sleeve in the rain as he pulls away: \"Just one more minute.\"",
  solo:`On a rain-soaked city street at night under a flickering streetlamp, the woman stands drenched in her long black coat, both hands clinging to the sleeve of a man's coat as its owner pulls away out of frame, her fingers slipping. Her usual cool, faraway composure is crumbling, her lips trembling and her eyes full of tears as she pleads "Just one more minute... please" in a speech bubble, rain running down her face with the tears.`,
  duo:`On a rain-soaked city street at night, the woman clings with both hands to {partner}'s coat sleeve as {he} pulls away, her fingers slipping, while {partner} looks back over {his} shoulder with a pained, guilty look; rain and tears run down her face.`,
  tags:"rain, night, street, streetlight, wet, wet hair, coat, sleeve grab, holding another's sleeve, crying, tears, streaming tears, trembling, sad smile",stags:"speech bubble, out of frame",dtags:"looking back, walking away"}],
["salmon","Table for two",{ex:"cold, composed face cracking into tears",pose:"sitting alone at a sushi counter before two untouched plates",pc:"pained, guilty look",
  w1:{top:["elegant {c} satin slip dress","@c1"],earAccessory:["large hoop earrings","@metal"]},
  set:"a quiet sushi bar late at night",blurb:"Their anniversary, at his own counter, in front of two plates of salmon roses he made for her, and he has just told her it's over.",
  solo:`Late at night in a quiet sushi bar, the woman sits alone at the pale cypress counter in an elegant satin slip dress, their anniversary reservation card still propped in front of her beside two untouched plates of salmon nigiri shaped like roses; the chef has just turned away into the kitchen behind the indigo noren. Her poised, editorial composure cracks: her lips press together and tears spill down her cheeks as she stares at the empty seat beside her.`,
  duo:`Late at night in a quiet sushi bar, the woman sits at the counter in an elegant satin slip dress before two untouched plates of salmon roses, while {partner} stands behind the counter with {his} back half turned and a pained, guilty look; her composed face cracks into tears.`,
  tags:"sushi bar, counter, restaurant, night, sitting, plate, sushi, empty seat, slip dress, earrings, crying, tears, streaming tears",stags:"alone",dtags:"looking away, chef"}],
["crow","Returned gifts",{ex:"small, broken smile through her tears",pose:"standing on a doorstep holding a box of returned trinkets",pc:"cold, distant look",c1:{skinFinish:"wet skin with water droplets"},
  w1:{top:["fuzzy knit sweater","@c1"],bottom:["pleated midi skirt","@dark"],heldItem:["shoebox full of returned trinkets","-"]},
  set:"a rain-dark doorstep at dusk",blurb:"He handed back a shoebox of every trinket she ever gave him, each one still tagged in her handwriting, and closed the door.",
  solo:`On a rain-dark doorstep at dusk, the door has just closed in her face, and the woman stands holding the shoebox he handed back: every trinket she ever gave him, keys, buttons, sea glass and a silver feather, each still with its little paper tag in her handwriting. Rain drips from the porch roof onto her hair. She looks down into the box with a small, broken smile through her tears and whispers "You kept all of them..." in a speech bubble.`,
  duo:`On a rain-dark doorstep at dusk, the woman stands holding a shoebox full of every trinket she ever gave {partner}, while {partner} stands in the half-open doorway with a cold, distant look; she looks down at the box with a small, broken smile through her tears.`,
  tags:"doorstep, door, porch, rain, dusk, standing, holding box, box, key, button, feather, wet hair, sweater, crying, tears, sad smile",stags:"speech bubble, closed door",dtags:"doorway"}]
  ]);

  /* ======================= Pregnancy Test ======================= */
  opt("posture",["sitting on a bathroom floor, holding a pregnancy test","sitting on the edge of the bathtub, holding a test and a onesie","curled on a window seat with a journal",
    "standing at a marble vanity, staring at a pregnancy test","sitting on a closed toilet lid, elbows on her knees","sitting on the nursery floor, holding a test and a photo",
    "sitting on the bathroom floor against the wall, a test crushed in her fist","sitting on a porch swing, holding a test and baby booties",
    "sitting in a bathroom stall, staring at a pregnancy test","sitting on the bathroom floor, holding a tiny knitted hat","sitting on a bathroom counter, staring at her phone",
    "standing sideways before a full-length mirror, hand on her stomach","sitting on the edge of the bed, a test in her lap"]);
  const PCAS_M={top:["fitted cotton t-shirt","@dark"],bottom:["sweatpants","-"]};
  const PCAS_F={top:["oversized {c} sleep shirt","@c1"]};
  soloSet("Academy Pregnancy Test","Academy Breakup","ptest",{oname:"Waiting",pc:"tearful, gentle look",tail:"pregnancy test, holding",w2m:PCAS_M,w2f:PCAS_F,tags:["pregnancy test","heartbreak","sad"]},[
["griffin","No answer",{ex:"pale, frightened stare",pose:"sitting on a bathroom floor, holding a pregnancy test",pc:"stunned, frightened look",c1:WELL,
  w1:{top:["oversized {c} sleep shirt","@c1"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a cold tiled bathroom late at night",blurb:"Two pink lines on the bathroom floor at midnight, and her phone calling him for the seventh time.",
  solo:`On a cold tiled bathroom floor late at night, the woman sits with her back against the bathtub in an oversized sleep shirt, knees drawn up, staring at the positive pregnancy test in her trembling hand: two pink lines. Her phone lies on the tiles beside her, the screen showing "Calling..." for the seventh time, unanswered. She is pale and frightened, tears welling as she whispers "Please pick up" in a speech bubble.`,
  duo:`On a cold tiled bathroom floor late at night, the woman sits against the bathtub in an oversized sleep shirt, holding a positive pregnancy test with two pink lines in her trembling hand, while {partner} sits on the edge of the tub above her, staring at it in stunned silence, {his} face pale; tears well in her eyes.`,
  tags:"bathroom, tiles, sitting on floor, against bathtub, knees up, phone, cellphone, phone screen, sleep shirt, oversized shirt, pale, scared, worried, tearing up, trembling, night",stags:"speech bubble",dtags:"sitting on bathtub, shocked"}],
["badger","A whole year",{ex:"crumpling, sobbing face",pose:"sitting on the edge of the bathtub, holding a test and a onesie",
  w1:{top:["cozy {c} pajamas","@c1"],heldItem:["negative pregnancy test with a single line","-"]},
  set:"a sunny little bathroom",blurb:"One line again, after a whole year of trying, holding the tiny onesie she bought months ago.",
  solo:`In a sunny little bathroom, the woman sits on the edge of the bathtub in cozy pajamas, holding a negative pregnancy test with a single line in one hand and a tiny yellow baby onesie she bought months ago in the other. The vanity drawer beside her hangs open, full of negative tests from a whole year of trying, and a calendar with circled dates hangs on the door. Her sweet face crumples and she sobs, pressing the onesie to her mouth.`,
  duo:`In a sunny little bathroom, the woman sits on the edge of the bathtub in cozy pajamas, holding a negative pregnancy test and a tiny yellow baby onesie, while {partner} kneels in front of her holding her hands, {his} own eyes wet; a drawer full of negative tests hangs open beside them, and her face crumples as she sobs.`,
  tags:"bathroom, sitting, bathtub, baby clothes, onesie, drawer, calendar (object), pajamas, sobbing, crying, tears, covering own mouth, sunlight",dtags:"kneeling, holding hands, comforting"}],
["raven","What do I do?",{ex:"lost, faraway look with brimming eyes",pose:"curled on a window seat with a journal",pc:"stunned, frightened look",c1:WELL,
  w1:{top:["oversized {c} knit sweater","@c1"],eyewear:["round glasses","@metal"],heldItem:["open journal and a pen","-"]},
  set:"a window seat on a rainy night",blurb:"Two lines on the windowsill and a journal page that ends in \"What do I do?\"",
  solo:`On a rainy night, the woman is curled on a cushioned window seat in an oversized knit sweater, a positive pregnancy test with two pink lines resting on the windowsill beside a cold cup of tea. An open journal lies on her knees, the page full of crossed-out lines ending in "What do I do?", and she gazes out at the rain through her round glasses with a lost, faraway look, eyes brimming, one hand resting on her stomach.`,
  duo:`On a rainy night, the woman is curled on a cushioned window seat in an oversized knit sweater, a positive pregnancy test on the windowsill and an open journal on her knees, while {partner} sits on the floor below with {his} head resting against her knee, both of them staring out at the rain; her eyes brim with tears.`,
  tags:"window seat, rain, window, night, sitting, knees up, journal, notebook, holding pen, teacup, oversized sweater, glasses, hand on own stomach, tearing up, sad, worried, indoors",dtags:"sitting on floor, head rest"}],
["serpent","Didn't want it anyway",{ex:"cold, composed face cracking into tears",pose:"standing at a marble vanity, staring at a pregnancy test",pc:"relieved, oblivious look",
  w1:{top:["{c} silk robe tied at the waist","@c1"],heldItem:["negative pregnancy test with a single line","-"]},
  set:"a cold marble bathroom",blurb:"One line. \"Good. I didn't want it anyway,\" she tells the mirror, with her other hand over her stomach.",
  solo:`In a cold marble bathroom, the woman stands at the vanity in a silk robe, holding a negative pregnancy test with a single line. She tells her reflection "Good. I didn't want it anyway" in a speech bubble, but her cold, composed face is cracking, her knuckles white on the counter and tears spilling over, and in the mirror her other hand rests over her flat stomach.`,
  duo:`In a cold marble bathroom, the woman stands at the vanity in a silk robe, holding a negative pregnancy test with a single line, while behind her in the mirror {partner} leans in the doorway, visibly relieved; she sees it, and her cold, composed face cracks into tears.`,
  tags:"bathroom, marble, vanity, mirror, reflection, standing, silk robe, hand on own stomach, crying, tears",stags:"speech bubble",dtags:"doorway, smile"}],
["wolf","The other letter",{ex:"stunned, trembling stare",pose:"sitting on a closed toilet lid, elbows on her knees",
  w1:{top:["{c} team training shirt","@c1"],bottom:["{c} running shorts","@dark"],legwear:["running shoes","@c1"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a small bathroom at dawn",blurb:"Two lines, and beside the sink the letter she trained her whole life for: her acceptance to the national team.",
  solo:`In a small bathroom at dawn, the woman sits on the closed toilet lid in her team training shirt and running shorts, elbows on her knees, holding a positive pregnancy test with two pink lines. On the sink beside her lies an open envelope and a letter with a gold crest: her acceptance to the national team, the dream she trained her whole life for. Her running shoes are still laced. She stares at the two lines with a stunned, trembling stare, tears spilling down her cheeks.`,
  duo:`In a small bathroom at dawn, the woman sits on the closed toilet lid in her training clothes, holding a positive pregnancy test, her national team acceptance letter on the sink beside her, while {partner} kneels in front of her and wraps {his} hands around her shaking ones; tears spill down her cheeks.`,
  tags:"bathroom, sitting, toilet, elbows on knees, letter, envelope, sportswear, running shoes, shocked, crying, tears, dawn",dtags:"kneeling, holding hands"}],
["swan","Please stay",{ex:"fragile, terrified hope in tear-filled eyes",pose:"sitting on the nursery floor, holding a test and a photo",
  w1:{top:["soft {c} cashmere sweater","@c1"],earAccessory:["pearl drop earrings","-"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a quiet nursery that was painted and then closed off",blurb:"Two lines again, on the floor of the nursery she closed off, holding the ultrasound from the baby she lost: \"Please stay this time.\"",
  solo:`In a quiet nursery that was painted and then closed off, a white crib still under a dust sheet, the woman sits on the floor in a soft cashmere sweater, holding a new positive pregnancy test in one hand and, in the other, the small framed ultrasound photo from the baby she lost last spring. Afternoon light falls across her face; she is too afraid to smile, her eyes filling with tears and a fragile, terrified hope as she whispers "Please stay this time" in a speech bubble.`,
  duo:`In a quiet nursery that was painted and then closed off, the woman sits on the floor in a soft cashmere sweater, holding a new positive pregnancy test and a small framed ultrasound photo, while {partner} sits behind her with {his} arms around her and {his} hands over hers; her eyes fill with tears and a fragile, terrified hope.`,
  tags:"nursery, crib, sitting on floor, ultrasound, picture frame, holding picture frame, sweater, sunlight, pearl earrings, tearing up, tears, worried, sad",stags:"speech bubble",dtags:"hug from behind, comforting"}],
["dragon","Don't call me",{ex:"fierce, tear-streaked glare",pose:"sitting on the bathroom floor against the wall, a test crushed in her fist",pc:"cold, distant look",
  w1:{top:["{c} band tee","@c1"],bottom:["ripped black jeans","-"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a bathroom floor",blurb:"Two lines crushed in her fist, and his last text on her cracked phone: \"I'm not ready for this. Don't call me.\"",
  solo:`On the bathroom floor, the woman sits against the wall in a band tee and ripped jeans, a positive pregnancy test with two pink lines crushed in her fist. Her phone lies cracked on the tiles across the room where she threw it, the screen still lit with his last message: "I'm not ready for this. Don't call me." She glares at it with a fierce, tear-streaked glare, jaw set, tears of fury running down her face.`,
  duo:`On the bathroom floor, the woman sits against the wall in a band tee and ripped jeans, a positive pregnancy test crushed in her fist, while {partner} stands in the doorway with {his} car keys in hand, already half turned to leave; she glares up at {him} with a fierce, tear-streaked glare.`,
  tags:"bathroom, sitting on floor, against wall, clenched hand, phone, broken phone, cracked screen, text message, band shirt, ripped jeans, glaring, angry, crying, tears, clenched teeth",dtags:"doorway, keys, looking away"}],
["stag","Just you and me",{ex:"small, broken smile through her tears",pose:"sitting on a porch swing, holding a test and baby booties",pc:"pained, guilty look",
  w1:{top:["flowing {c} sundress","@c1"],heldItem:["pair of tiny knitted baby booties","cream"]},
  set:"the porch of a lonely farmhouse at dusk",blurb:"On the porch swing at dusk with two lines and tiny knitted booties, his boots gone from beside the door.",
  solo:`On the porch swing of a lonely farmhouse at dusk, fireflies rising from the tall grass, the woman sits in a flowing sundress holding a positive pregnancy test and a pair of tiny knitted baby booties. His boots are gone from their place beside the door and his side of the swing is empty. She smiles a small, broken smile through her tears and whispers "It's just you and me now" to her stomach in a speech bubble.`,
  duo:`On the porch swing of a farmhouse at dusk, fireflies rising from the tall grass, the woman sits in a flowing sundress holding a positive pregnancy test and tiny knitted baby booties, while {partner} stands at the bottom of the porch steps with a duffel bag over {his} shoulder; she smiles a small, broken smile through her tears.`,
  tags:"porch, porch swing, farmhouse, dusk, fireflies, tall grass, sitting, sundress, baby clothes, hand on own stomach, sad smile, tears",stags:"speech bubble",dtags:"duffel bag, standing"}],
["shark","Club bathroom",{ex:"nervous, cracking laugh with tears welling",pose:"sitting in a bathroom stall, staring at a pregnancy test",pc:"stunned, frightened look",c1:WELL,
  w1:{top:["{c} crop top","@c1"],bottom:["denim shorts","-"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a graffiti-covered bathroom stall at a loud nightclub",blurb:"In a nightclub bathroom stall, trying to laugh off two pink lines while her friends call her name.",
  solo:`In a graffiti-covered bathroom stall at a loud nightclub, bass thumping through the walls, the woman sits on the closed lid in a crop top and denim shorts, staring at a positive pregnancy test with two pink lines. She tries to laugh it off with her usual sharp-toothed grin, but it cracks, tears welling as she presses the back of her hand to her mouth, her friends' voices calling her name from outside the door.`,
  duo:`In a graffiti-covered nightclub bathroom stall, the woman sits on the closed lid in a crop top and denim shorts, staring at a positive pregnancy test, while {partner} crouches in the open stall door staring at it too; her nervous, sharp-toothed grin cracks as tears well up.`,
  tags:"bathroom stall, toilet, graffiti, nightclub, neon lights, sitting, crop top, denim shorts, sharp teeth, nervous smile, tearing up, covering own mouth",dtags:"squatting"}],
["penguin","Tiny penguin hat",{ex:"crumpling, tearful face, her smile gone",pose:"sitting on the bathroom floor, holding a tiny knitted hat",
  w1:{top:["{c} penguin-print pajamas","ice blue"],heldItem:["tiny orange knitted baby hat with penguin eyes","-"]},
  set:"a cozy bathroom on a snowy morning",blurb:"One line on the bathmat, and in her hands the tiny orange penguin baby hat she knitted in secret: \"Maybe next time.\"",
  solo:`On the bathroom floor on a snowy morning, the woman sits with her back against the tub in penguin-print pajamas, a negative pregnancy test with a single line lying on the bathmat beside her. In both hands she holds the tiny orange knitted baby hat with little penguin eyes and a beak that she made in secret, the yarn still trailing to the needles in her knitting basket by the door. Snow drifts past the frosted window; her cheerful, freckled face crumples, tears dripping onto the hat, and she whispers "Not yet... maybe next time" in a speech bubble.`,
  duo:`On the bathroom floor on a snowy morning, the woman sits against the tub in penguin-print pajamas, a negative pregnancy test on the bathmat beside her, holding the tiny orange penguin baby hat she knitted in secret, while {partner} sits beside her and pulls her into {his} chest, pressing a kiss to the top of her head; her freckled face crumples and tears drip onto the hat.`,
  tags:"bathroom, sitting on floor, against bathtub, baby clothes, knit hat, penguin, holding, yarn, knitting needles, yarn ball, pajamas, snow, window, morning, crying, tears, sad, freckles",stags:"speech bubble",dtags:"hug, comforting, kiss on head"}],
["fox","Nice try",{ex:"stunned, hurt look with tears welling",pose:"sitting on a bathroom counter, staring at her phone",pc:"carefree, laughing look",c1:WELL,
  w1:{top:["oversized {c} knit sweater","@c1"],headwear:["fluffy fox ear headband","@hair"],heldItem:["smartphone showing a text message","-"]},
  set:"a small bathroom",blurb:"She sends him the two lines; after all her pranks, he replies \"lol nice try, not falling for that again.\"",
  solo:`Sitting on the bathroom counter with her knees up in an oversized knit sweater, the woman holds a positive pregnancy test with two pink lines in one hand and her phone in the other, the screen showing his reply to her photo of the test: "lol nice try, not falling for that again". Her mouth is still half open around the joke she was going to make, and her eyes fill with hurt as the tears start.`,
  duo:`Sitting on the bathroom counter with her knees up in an oversized knit sweater, the woman holds up a positive pregnancy test with two pink lines while {partner} leans in the doorway laughing, sure it is another of her pranks; her eyes fill with hurt as the tears start.`,
  tags:"bathroom, sitting on counter, knees up, phone, cellphone, phone screen, text message, oversized sweater, fox ears, hurt, tearing up, tears, open mouth",dtags:"doorway, laughing"}],
["lovebird","The reveal box",{ex:"wobbly, tearful little smile",pose:"sitting on the kitchen floor beside a gift box",pc:"relieved, oblivious look",c1:WELL,
  w1:{top:["cozy {c} pajamas","@c1"],heldItem:["positive pregnancy test with two pink lines","-"],headwear:["ribbon bows tied at the twintails","@accent"]},
  set:"a pastel kitchen at night",blurb:"Two lines, and a ribbon-tied reveal box ready for his birthday, until she reads his text: \"glad we agree, no kids ever lol\".",
  solo:`On the floor of a pastel kitchen at night, the woman sits in cozy pajamas beside a ribbon-tied gift box she prepared for his birthday: inside, a tiny cream onesie embroidered with two lovebirds and a box of creamsicle cupcakes. A positive pregnancy test with two pink lines is in one hand and her phone in the other, its screen showing his text: "glad we agree, no kids ever lol". Her twintails droop and she keeps a wobbly, tearful little smile as her eyes fill up.`,
  duo:`On the floor of a pastel kitchen at night, the woman sits in cozy pajamas beside a ribbon-tied reveal box holding a tiny lovebird onesie, a positive pregnancy test in her hand, while {partner} leans in the doorway scrolling on {his} phone, laughing at something, unaware; her eyes fill with tears.`,
  tags:"kitchen, sitting on floor, gift box, ribbon, baby clothes, cupcake, phone, cellphone, phone screen, text message, pajamas, twintails, sad smile, tearing up, tears, night",dtags:"doorway, laughing"}],
["flamingo","Third round",{ex:"numb, faraway stare with tears sliding down",pose:"sitting on the edge of the bed, a test in her lap",
  w1:{top:["cozy {c} pajamas","@c1"],heldItem:["negative pregnancy test with a single line","-"]},
  set:"a pink-walled bedroom at dawn",blurb:"One line at dawn after the third round of IVF, the injection pens still lined up on the nightstand.",
  solo:`At dawn in a pink-walled bedroom, the woman sits on the edge of the bed in cozy pajamas with a negative pregnancy test lying in her lap, a single line. On the nightstand beside her stand a neat row of fertility injection pens, a box of tissues and a calendar counting the days of their third IVF round. Pink light filters through the curtains as she stares at nothing with a numb, faraway stare, tears sliding silently down her cheeks.`,
  duo:`At dawn in a pink-walled bedroom, the woman sits on the edge of the bed in cozy pajamas with a negative pregnancy test in her lap and a row of fertility injection pens on the nightstand, while {partner} sits beside her with {his} arm around her and {his} forehead pressed to her temple; tears slide silently down her cheeks.`,
  tags:"bedroom, sitting on bed, nightstand, syringe, tissue box, calendar (object), pajamas, dawn, curtains, empty eyes, crying, tears, sad",dtags:"arm around shoulder, comforting"}],
["kraken","Out of range",{ex:"stunned, breaking half-smile with brimming eyes",pose:"standing at a dark window over the sea, a test in her hand",pc:"stunned, frightened look",c1:WELL,
  w1:{top:["oversized {c} sleep shirt","@c1"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a dark seaside cottage window at night",blurb:"Two lines, alone at the window over the night sea where his ship is, the satellite phone reading \"Out of range until spring.\"",
  solo:`In a dark seaside cottage at night, the woman stands at the window in an oversized sleep shirt, a positive pregnancy test with two pink lines in one hand and a satellite phone in the other, its screen reading "Out of range until spring." Far out on the black sea, a single ship's light blinks on the horizon. Her reflection in the glass wears a stunned, breaking half-smile, her eyes brimming, one hand drifting to rest on her stomach.`,
  duo:`In a dark seaside cottage at night, the woman stands at the window in an oversized sleep shirt holding a positive pregnancy test, while {partner} stands frozen in the doorway behind her with a sea bag over {his} shoulder, on {his} way out to sea; her eyes brim with tears.`,
  tags:"window, night, ocean, ship, reflection, standing, phone, cellphone, phone screen, sleep shirt, oversized shirt, hand on own stomach, tearing up, sad, worried",dtags:"doorway, bag"}],
["salmon","Five minutes",{ex:"fragile, terrified hope in tear-filled eyes",pose:"sitting on a backstage bathroom floor in a couture gown, a test in her hand",pc:"stunned, frightened look",c1:WELL,
  w1:{top:["off-shoulder mermaid gown with {c2} scale sequins cascading down the skirt and a high thigh slit","@c1",null,"@metal"],heldItem:["positive pregnancy test with two pink lines","-"]},
  set:"a cramped backstage bathroom at fashion week",blurb:"Two lines on a backstage bathroom floor at fashion week, five minutes before the biggest walk of her career.",
  solo:`In a cramped backstage bathroom at fashion week, the muffled thump of runway music coming through the door, the woman sits on the tiled floor in a sequined couture gown, a positive pregnancy test with two pink lines trembling in her hand, while someone outside calls "Five minutes!" in a speech bubble. Her editorial makeup is still flawless, but her eyes are full of tears and fragile, terrified hope as one hand settles slowly on her stomach.`,
  duo:`In a cramped backstage bathroom at fashion week, the woman sits on the tiled floor in a sequined couture gown holding a positive pregnancy test, while {partner} crouches in the doorway with a stunned, frightened look; her eyes fill with tears and fragile hope.`,
  tags:"bathroom, backstage, tile floor, sitting on floor, gown, sequins, pregnancy test, hand on own stomach, tearing up, worried",stags:"speech bubble",dtags:"doorway, crouching"}],
["crow","One line",{ex:"crumpling, tearful face, her smile gone",pose:"sitting on the edge of a bathtub beside an open trinket tin, a test in her hand",pc:"tearful, gentle look",
  w1:{top:["oversized {c} sleep shirt","@c1"],heldItem:["negative pregnancy test with a single line","-"]},
  set:"a small bathroom at dawn",blurb:"One line, after months of hoping, and in her trinket tin the tiny silver baby rattle she has been saving.",
  solo:`At dawn in a small bathroom, the woman sits on the edge of the bathtub in an oversized sleep shirt, holding a negative pregnancy test with a single line. Beside her on the sink sits her little trinket tin, open, and inside it, wrapped in tissue, a tiny silver baby rattle she found at a flea market months ago and has been saving ever since. Her hopeful smile crumples, and tears roll down her face as she stares at the single line.`,
  duo:`At dawn in a small bathroom, the woman sits on the edge of the bathtub in an oversized sleep shirt holding a negative pregnancy test, a tiny silver baby rattle in an open tin beside her, while {partner} kneels in front of her holding her free hand with a tearful, gentle look; her face crumples into tears.`,
  tags:"bathroom, bathtub, sitting, dawn, morning, sleep shirt, oversized shirt, pregnancy test, tin, rattle, crying, tears, sad",dtags:"kneeling, holding hands, comforting"}]
  ]);
})();

/* ---- v155: "Academy All Night". The most explicit set: one whole night with her Academy Men boyfriend, told as three panels
   in one image (oral, then sex with an x-ray cross-section, then the creampie aftermath), each in a place that fits her house.
   Adult women only (age "woman"), adult venues, no uniforms; built on each girl's own base (Crow's "crowbody"), opened in the
   Scene tab with her boyfriend in his Nude outfit, swappable like Intimacy, and held back by the safeguard like every explicit scene.
   Makeup stays clean: she is marked with cum and fluids. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const TAIL="3koma, cross-section, x-ray, fellatio, sex, vaginal, creampie, cum in pussy, cum overflow, cum on body, after sex, ahegao, heart-shaped pupils, motion lines, speech bubble, sweat, steam";
  const AHE="fucked-silly ahegao, eyes crossed, tongue out, drooling";
  START.option("expression",AHE,G);
  START.option("bodyMarkings","thick white cum is smeared over the breasts, stomach and thighs",G);
  START.option("vaginaType","flushed, gaping, full of and overflowing with thick white cum, squirting",G);
  START.option("faceAccents","thick white cum glazing her face, hair and tongue",G);
  /* [house, place, panel-1 (oral), sex position (posture option), panel-2 position words, act tags, line 1, line 2, line 3, place tags] */
  const N=[
["griffin","a moonlit penthouse terrace above the city","kneels on the warm stone and takes {his} {cock} deep in her mouth, gazing up at {him} with flushed, adoring eyes","standing in a split against the glass, one leg on her lover's shoulder","in a standing split against the glass railing, one leg hooked over {his} shoulder","standing sex, standing split","Let me show you how flexible I am♡","DEEPER... ALL THE WAY♡","...one more dance?♡","rooftop, night, city lights, terrace"],
["badger","a honey-lit log cabin in a snowstorm","kneels between {his} knees by the fire and licks {his} {cock} from base to tip with a sweet, eager smile","bouncing in her lover's lap on a fur rug, breasts bouncing","in {his} lap on a thick fur rug, bouncing hard as her enormous breasts bounce with every thrust","cowgirl position, girl on top, breast grab","Is it all for me?♡","SO BIG... I'M MELTING♡","...seconds, please♡","log cabin, fireplace, fur rug, snow, night"],
["raven","a candlelit observatory loft under the stars","sucks {his} {cock} slowly beneath the great telescope, one hand at its base, her eyes half-lidded","on all fours on a star-chart rug, looking back","on all fours on a rug printed with star charts, {his} hands gripping her hips from behind","doggystyle, sex from behind","Let me study you♡","I SEE STARS♡","...a whole constellation♡","observatory, telescope, starry sky, candle, night"],
["serpent","a black-silk bedroom with an emerald canopy","coils down {his} body and swallows {his} {cock} to the base with a slow, wicked smirk","riding in reverse on silk sheets, coiled back against her lover","riding {him} in reverse on emerald silk, back arched and coiling back against {his} chest","reverse cowgirl position, girl on top","Don't you dare move","YOU'RE MINE♡","...again. Now.♡","bedroom, canopy bed, silk sheets, night"],
["wolf","a steaming mountain hot spring under the full moon","kneels on the wet rocks and sucks {his} {cock} hungrily, the moon behind her","bent over the hot spring's rocks, taken from behind","bent over the steaming rocks, {his} hands pinning her hips as {he} pounds her from behind","doggystyle, sex from behind, bent over, partially submerged","Mine to taste♡","HARDER... AWOO♡","...don't let me go♡","onsen, hot spring, full moon, rocks, mountain, night"],
["swan","a lakeside pavilion strung with lanterns","kneels on silk cushions and kisses {his} {cock} with slow, graceful devotion before taking it deep","in a standing split against a lantern-lit pillar","in a graceful standing split against a lantern-lit pillar, one leg raised over {his} shoulder","standing sex, standing split, leg up","Allow me♡","TOO DEEP... DON'T STOP♡","...my prince♡","pavilion, lake, lantern, night, cherry blossoms"],
["dragon","a dragon's hoard of gold coins and jewels","sprawls on the gold and swallows {his} {cock} with a fierce, hungry grin","riding on top in a hoard of gold coins, pinning her lover down","on top of {him} in the gold, pinning {his} wrists as she rides {him} hard and coins slide everywhere","cowgirl position, girl on top, pinned","Kneel to your queen♡","TAKE IT... TAKE ALL OF ME♡","...my treasure♡","treasure, gold coin, hoard, cave, firelight"],
["stag","a moss-bed in a glowing forest glade","kneels in the moss and takes {his} {cock} in her mouth with dreamy, worshipful eyes","sitting in her lover's lap in a mossy glade, legs wrapped around him","in {his} lap in the lotus position on the moss, her legs wrapped around {him} as fireflies swirl","lotus position, sitting on lap, leg lock","Let me worship you♡","SO DEEP... IN FULL BLOOM♡","...stay inside♡","forest, moss, fireflies, glade, night"],
["shark","a moonlit beach with the surf rolling in","kneels in the wet sand and sucks {his} {cock} with a sharp-toothed grin and her tongue out","on all fours in the surf, taken from behind","on all fours in the surf as waves crash around them, {his} hands in her twin ponytails","doggystyle, sex from behind, hair pull, partially submerged","Careful, I bite♡","HARDER... DROWN ME IN IT♡","...round two, chum♡","beach, ocean, surf, waves, moonlight, night"],
["penguin","a snowed-in ski lodge by a roaring fire","snuggles under the furs and takes {his} {cock} in her mouth, peeking up at {him} with bright, eager eyes and rosy cheeks","folded in a mating press under the furs by the fire","folded beneath {him} in a mating press under the furs, her ankles beside her head and her toes curling","mating press, legs up, deep penetration","It's cold... warm me up♡","DEEPER... FILL ME UP♡","...don't you dare go anywhere♡","ski lodge, fireplace, fur blanket, snow, window, night"],
["fox","a lantern-lit ryokan room with paper screens","kneels on the tatami and licks {his} {cock} with a sly, fox-like smirk, her tail swishing","riding in reverse on a futon, looking back over her shoulder","riding {him} in reverse on the futon, looking back over her shoulder as paper lanterns glow","reverse cowgirl position, girl on top, looking back","Bet you can't last♡","YOU WIN... I LOSE♡","...double or nothing?♡","ryokan, tatami, futon, paper lantern, shoji, night"],
["lovebird","a pastel bedroom strung with fairy lights","peppers {his} {cock} with little kisses before sucking it with a giggling, heart-eyed smile","bouncing in her lover's lap, kissing him over and over","in {his} lap, bouncing on {him} and kissing {him} over and over between moans","cowgirl position, girl on top, kiss","Kiss, kiss♡","LOVE YOU... LOVE YOU♡","...forever and ever♡","bedroom, fairy lights, pastel, hearts, night"],
["flamingo","a tropical lagoon at a pink sunset","kneels in the warm shallows and takes {his} {cock} deep with a serene, half-lidded smile","held up in her lover's arms in the shallows, legs locked around him","held up in {his} arms in the shallows, legs locked around {his} waist as {he} bounces her","suspended congress, standing sex, carrying, leg lock","Let me take care of you♡","HOLD ME... DEEPER♡","...paradise♡","lagoon, sunset, palm tree, water, beach"],
["kraken","a ship's cabin in a storm","wraps both hands around {his} {cock} and sucks it with a shy, breathless look as the ship rolls","wrapped around her lover in a ship's bunk, arms and legs locked","beneath {him} in the bunk, every limb wrapped around {him} like a kraken","missionary, leg lock, arms around neck","Come here, Captain♡","NEVER LETTING GO♡","...stay. Forever.♡","ship, cabin, storm, lantern, porthole, night"],
["salmon","a cedar cabin above a rushing river","kneels by the big window and takes {his} {cock} deep, her editorial poise slipping as she gazes up","bent against a rain-streaked cabin window, taken from behind","bent forward against the rain-streaked window, {his} hands on her freckled hips as the river rushes below","sex from behind, standing sex, against glass","Let me break the rules once♡","AGAINST THE CURRENT... HARDER♡","...I'm home♡","cabin, window, rain, river, forest, night"],
["crow","a moonlit attic full of glittering trinkets","kneels among her jars of keys and buttons and sucks {his} {cock} with a bright, curious look","riding on top on a quilt among glittering trinkets","on top of {him} on a patchwork quilt, riding {him} as the jars of trinkets glitter in the moonlight","cowgirl position, girl on top","Something shiny for me?♡","THE BEST TREASURE♡","...I'm keeping you♡","attic, round window, moonlight, jar, key, quilt, night"]];
  N.forEach(r=>START.option("posture",r[3],G));
  const scene=([h,place,p1,pose,p2,acts,q1,q2,q3,tags])=>`The image is split into three scenes, one whole night in ${place}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, she is ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and an x-ray cross-section shows it pressed against her womb as {he} cums deep inside her. She makes a fucked-silly ahegao with her eyes crossed and her tongue out, drooling, and screams "${q2}" with heart eyes. In the third scene, at dawn, she lies limp and glistening with sweat, her face, breasts and stomach glazed with thick white cum and more overflowing from her gaping vagina beneath her, still smiling and whispering "${q3}". ${TAIL}, ${acts}, ${tags}`;
  const C1={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting",
    bodyMarkings:"thick white cum is smeared over the breasts, stomach and thighs",faceAccents:"thick white cum glazing her face, hair and tongue"};
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const by={};N.forEach(r=>{by[r[0]]=r});
  START.add("Academy All Night",ACAD.HOUSES.filter(h=>by[h]).map(h=>{const r=by[h],m=h+"man",mt=tplById(m);
    const c1=Object.assign({},C1,{expression:AHE,posture:r[3]});
    return{id:h+"allnight",base:ACAD.robes(h),name:cap(h)+" all night",c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:nudeAt(m),scene:scene(r),act:"fellatio, sex, vaginal, "+r[5]+", creampie",dir:"ba",explicit:true,penis:true,
          pc:{expression:"gritted-teeth grimace of pleasure",posture:null},c1,compact:false,fit:true}},
      tags:["all night","explicit","sex","oral","creampie","3koma","pair",h],
      blurb:`One whole night in ${r[1]}: oral, then ${r[5].split(",")[0]}, then dawn, glazed and overflowing. Opens in the Scene tab with the ${mt?mt.name:cap(h)+" boyfriend"}; switch either character and the scene follows.`};
  }),{after:"Academy Depraved"});
})();

/* ---- v156: "Academy Kink Club". Kinkier than Depraved: one two-panel scene per girl at a private, members-only fetish club,
   with her Academy Men boyfriend as her partner in a scene they agreed on (a red safeword ribbon is tied at her wrist in every one).
   Bondage, shibari and suspension, spreader bars, gags, latex, wax and ice play, impact, chains and clamps, toys and machines,
   edging and forced orgasms, then a creampie. Adult women only (age "woman"), adult venues, no uniforms; built on each girl's own
   base (Crow's "crowbody"), opened in the Scene tab with her boyfriend in his Nude outfit, and held back by the safeguard like every
   explicit scene. No degradation or humiliation; makeup stays clean and she is marked with cum, fluids and rope marks. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const TAIL="2koma, bdsm, bondage, consensual, safeword ribbon, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat";
  const AHE="desperate, begging ahegao with heart eyes and her tongue out";
  START.option("expression",AHE,G);START.option("bodyMarkings","red rope marks crisscross her skin",G);
  /* [house, club room, panel 1 (the setup), posture, panel 2 (the scene), acts, line 1, line 2, tags] */
  const K=[
["griffin","a mirrored club room with a padded black bench","is strapped face-down over the padded bench, her ankles locked to a spreader bar and a wand vibrator buckled between her thighs, edged again and again until she begs","strapped over a padded bench, ankles locked to a spreader bar","{partner} finally takes her from behind on the bench as the vibrator keeps buzzing, forcing orgasm after orgasm out of her","sex from behind, spreader bar, vibrator, edging, forced orgasm","Please... please let me cum♡","AGAIN... DON'T STOP♡","spreader bar, padded bench, wand vibrator, mirror, restrained"],
["badger","a warm, rope-hung club suite","is bound in an intricate red shibari harness that squeezes her enormous breasts, her arms tied behind her, swaying gently as {partner} tightens the last knot","suspended in red shibari rope, legs tied open","{partner} fucks her as she hangs in the ropes with her legs tied open, every thrust swinging her, her bound breasts bouncing","shibari, rope suspension, suspension bondage, bound arms","Tighter... I trust you♡","I'M FLOATING... CUM IN ME♡","shibari, rope, suspension, red rope, breasts squeezed"],
["raven","a candlelit club room draped in black","lies blindfolded and gagged with a silk scarf on a black sheet while {partner} drips hot candle wax in slow lines across her breasts and stomach","lying blindfolded on black silk, wrists tied to the bed","{partner} fucks her slowly while she can't see a thing, her body twitching at every drop of wax, every sensation a surprise","wax play, blindfold, sensory deprivation, gag, tied to bed","...","MORE... I CAN'T SEE♡","wax play, candle, candle wax, blindfold, gag, black sheets"],
["serpent","a dungeon room with a St Andrew's cross","is strapped spread-eagle to a St Andrew's cross in a glossy latex catsuit unzipped from throat to crotch, a ball gag between her lips, glaring with defiant, delighted eyes","strapped spread-eagle to a St Andrew's cross","{partner} fucks her standing against the cross, the latex squeaking, her straps creaking as her haughty glare dissolves into a drooling, gagged ahegao","st. andrew's cross, ball gag, latex, catsuit, standing sex, spread eagle","Mmph♡","MMMPH♡♡","st. andrew's cross, latex, catsuit, unzipped, ball gag, drool"],
["wolf","a club room with a leather pet bed","kneels on all fours wearing wolf ears, a thick collar and a fluffy tail plug, wagging it as {partner} scratches under her chin","on all fours with a tail plug, collared","{partner} fucks her doggystyle with the tail plug still in, holding her collar like a handle, her tail jerking with every thrust","pet play, tail plug, anal plug, collar, doggystyle, sex from behind","Good girl? Say it♡","AWOO... I'M YOURS♡","pet play, wolf ears, tail plug, butt plug, collar, all fours"],
["swan","a white silk aerial room","hangs in white silk ropes in a perfect suspended split, her pointe shoes still laced, completely exposed","suspended in a split from white silk ropes","{partner} stands between her suspended legs and fucks her as she hangs in the split, gracefully helpless in the silks","rope suspension, suspended split, aerial silks, standing sex","Hold me here♡","DON'T LET ME FALL... DEEPER♡","aerial silks, suspension, split, pointe shoes, white rope, white theme"],
["dragon","a red club room with a leather spanking bench","is draped over {partner}'s knee, bratting and laughing, her ass already glowing red with handprints as {he} spanks her","bent over a spanking bench, ass red with handprints","{partner} pins her over the spanking bench and fucks her hard from behind, spanking her between thrusts until her brattiness breaks into begging","spanking, impact play, brat, bent over, sex from behind","Is that all you've got?♡","OKAY, OKAY... HARDER♡","spanking, spanked, handprint, red ass, spanking bench, brat"],
["stag","a moonlit forest glade behind the club","is tied to an old mossy tree with soft green rope, arms above her head, wildflowers in her hair, quivering as {partner} kisses down her body","tied to a mossy tree with green rope","{partner} lifts her bound thighs and fucks her against the tree, the ropes creaking, fireflies swirling around them","tied to tree, rope bondage, outdoor, standing sex","Keep me here forever♡","I'M BLOOMING♡","tree, forest, moss, rope, arms up, fireflies, night"],
["shark","a beach-house club room with a fucking machine","is tied on all fours on a bench in front of a fucking machine, its thick dildo pistoning into her while her twin ponytails are tied to a ring overhead","on all fours in front of a fucking machine","{partner} takes her mouth from the front while the machine fucks her from behind, spit-roasted between {partner} and the machine","fucking machine, sex machine, spitroast, fellatio, hair tied up","Turn it up, chum♡","GLRK... FASTER♡","fucking machine, sex machine, dildo, all fours, ponytails, spitroast"],
["penguin","a snowy club cabin with a crackling fire","lies blindfolded on a white fur rug while {partner} traces ice cubes over her nipples, down her stomach and between her thighs, her whole body shivering and pink","lying blindfolded on a fur rug, ice melting on her skin","{partner} warms her up the best way, fucking her deep in a mating press on the fur as the ice melts on her skin and the fire crackles","ice play, temperature play, blindfold, mating press","So cold... so good♡","WARM ME UP INSIDE♡","ice cube, ice play, blindfold, fur rug, fireplace, snow, shivering"],
["fox","a masquerade play-party room full of masked guests","kneels on a velvet stage in only a fox mask, a remote-controlled vibrator buzzing inside her while {partner} holds the remote and the masked guests watch","kneeling on a velvet stage in a fox mask","{partner} fucks her in reverse cowgirl on the stage in front of the masked crowd, the vibrator still buzzing as she shows everyone her face","remote vibrator, exhibitionism, audience, reverse cowgirl, girl on top","Let them watch♡","EVERYONE'S LOOKING... CUM♡","masquerade, fox mask, masked audience, stage, remote vibrator, crowd"],
["lovebird","a gilded birdcage suite","sits inside a giant gilded birdcage in only a heart-lock collar, giggling and squirming as {partner} teases her through the bars with a long feather","inside a giant gilded birdcage, heart-lock collar on","{partner} unlocks the cage and fucks her on the cage floor, her collar's little heart lock jingling with every thrust","cage, collar, feather, tickling, missionary","Lock me up♡","YOUR LITTLE BIRD... CUM♡","birdcage, cage, gilded, collar, heart lock, feather"],
["flamingo","a pink neon club room","stands on one leg in a pink neon spotlight, her other leg tied up high to an overhead ring, arms bound behind her back","standing on one leg, the other tied up high","{partner} fucks her standing as she balances on one leg, her raised leg tied wide open, trembling to keep her balance","one leg tied up, standing on one leg, bound arms, standing sex","Hold me steady♡","I CAN'T STAND... DON'T STOP♡","standing on one leg, leg up, rope, neon lights, pink theme, arms behind back"],
["kraken","an aquarium-walled club room","is bound to a padded table by soft silicone tentacle restraints, a thick tentacle dildo pumping into her while octopus shadows drift past the glass","bound by tentacle restraints on a padded table","{partner} pulls the tentacle dildo out and fucks her {him}self as the restraints coil tighter, her cool composure completely gone","tentacle restraints, tentacle dildo, sex toy, missionary","Tighter... wrap me up♡","NEVER LET GO♡","tentacles, tentacle dildo, restraints, aquarium, blue theme"],
["salmon","a club photo studio lined with mirrors and cameras","poses in black latex opera gloves and thigh-high boots, a ball gag between her lips and her wrists cuffed behind her back, watching herself in the mirrors as the flashes go off","cuffed and gagged before mirrors, bent forward","{partner} fucks her from behind in front of the mirrors, gripping her cuffed wrists, every flash capturing her poise falling apart","ball gag, handcuffs, latex, mirror, sex from behind, camera","Make it editorial♡","MMMPH... HARDER♡","mirror, camera flash, latex, opera gloves, thigh boots, ball gag, cuffs"],
["crow","a jewel-lit club boudoir","lies back draped in fine silver chains, jeweled clamps on her nipples linked by a glittering chain and a gem plug sparkling between her thighs, giggling as {partner} tugs the chain","draped in silver chains, jeweled nipple clamps on","{partner} fucks her slowly, tugging the clamp chain with each thrust as the jewels sparkle all over her body","nipple clamps, chain, jewelry, gem plug, missionary","So shiny... pull it♡","PULL IT... MORE♡","nipple clamps, chain, jewelry, gem, butt plug, sparkle"]];
  K.forEach(r=>START.option("posture",r[3],G));
  const scene=([h,room,p1,pose,p2,acts,q1,q2,tags])=>`The image is split into two scenes at a private, members-only fetish club, in ${room}, a red safeword ribbon tied around her wrist. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a desperate, begging ahegao with heart eyes and her tongue out, drooling and trembling, and cries "${q2}" with hearts, cum overflowing from her vagina. ${[...new Set((TAIL+", "+acts+", "+tags).split(", "))].join(", ")}`;
  const C1={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting",bodyMarkings:"red rope marks crisscross her skin"};
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const by={};K.forEach(r=>{by[r[0]]=r});
  START.add("Academy Kink Club",ACAD.HOUSES.filter(h=>by[h]).map(h=>{const r=by[h],m=h+"man",mt=tplById(m);
    const c1=Object.assign({},C1,{expression:AHE,posture:r[3]});
    return{id:h+"kink",base:ACAD.robes(h),name:cap(h)+" kink club",c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:nudeAt(m),scene:scene(r),act:"sex, vaginal, "+r[5]+", creampie",dir:"ba",explicit:true,penis:true,
          pc:{expression:"dominant, knowing smirk",posture:null},c1,compact:false,fit:true}},
      tags:["kink","bdsm","bondage","explicit","sex","pair",h],
      blurb:`At a private fetish club, safeword ribbon on her wrist: ${r[5].split(", ").slice(0,3).join(", ")}, then a creampie. Opens in the Scene tab with the ${mt?mt.name:cap(h)+" boyfriend"}; switch either character and the scene follows.`};
  }),{after:"Academy All Night"});
})();

/* ---- v157: "Academy Vacation" and "Academy Hiking". One girl per house in each, built on her own base (Crow's "crowbody"),
   each with a main outfit, a lewder second outfit and a Nude outfit with her intimate details. Not explicit.
   Vacation: a sundress with her house print at a resort, then a micro bikini. Hiking: trail gear, then a sweaty summit look.
   Penguin's two are the thoughtful ones: a warm granite beach where wild penguins nest among the boulders, and a snowy
   trail up to a glacier lookout with a thermos of cocoa. */
(function(){
  const{set}=ACAD;
  const op=(f,list,g)=>list.forEach(v=>START.option(f,v,g||"Posture"));
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"CU",fam||"resort,casual"));
  op("posture",["sitting on a beach lounger under a palm tree","wading ankle-deep in turquoise water, holding her hat","lying on a beach towel, propped on her elbows",
    "sitting on a sun-warmed granite boulder beside nesting penguins","leaning on a resort balcony railing above the sea",
    "standing at a summit lookout, hands on her hips","resting on a boulder, drinking from a water bottle","climbing a rocky trail, looking back over her shoulder",
    "pausing on a snowy trail, holding a steaming thermos cup","stretching her arms up at a mountain viewpoint","crossing a stream on stepping stones"]);
  op("expression",["carefree, laughing look"],"Expression");
  START.option("skinFinish","sun-kissed skin with a dewy glow","Finish");
  const MOT={griffin:"feather",badger:"honeycomb",raven:"star",serpent:"serpent-scale",wolf:"moon-and-pine",swan:"lotus",dragon:"flame",stag:"leaf",shark:"wave",
    penguin:"tiny penguin",fox:"fox-and-flame",lovebird:"orange-blossom",flamingo:"palm-frond",kraken:"tentacle",salmon:"leaping-salmon",crow:"feather-and-moon"};
  const DRESS=h=>`{c} wrap sundress with a {c2} ${MOT[h]} print`;
  it("top",Object.keys(MOT).map(DRESS),"US","resort,sweet");
  it("top",["{c} micro string bikini top"],"L","resort,boudoir");it("bottom",["{c} micro string bikini bottoms"],"L","resort,boudoir");
  it("headwear",["wide-brim sun hat","straw sun hat with a ribbon","{c} baseball cap","{c} bandana tied over the hair","knit pom-pom beanie"]);
  it("eyewear",["cat-eye sunglasses","oversized sunglasses"]);it("legwear",["strappy flat sandals","{c} hiking boots with {c2} laces","{c} wool hiking socks"]);
  it("heldItem",["tropical cocktail with a paper umbrella","coconut drink with a straw","striped beach ball","paperback novel","seashell","sunscreen bottle",
    "trekking pole","water bottle","trail map","steaming thermos cup of cocoa","handful of wildflowers","camera on a strap","small hiking backpack held by one strap"],"CU","casual");
  it("outerwear",["sheer {c} beach cover-up","{c} windbreaker tied around the waist","{c} puffer vest"]);it("gloves",["fluffy mittens"]);
  it("top",["cropped {c} hiking tank top","{c} sports bra","fitted {c} thermal top"],"CUS","sporty,casual");
  it("bottom",["high-waisted {c} hiking shorts","{c} hiking shorts unbuttoned and rolled low","{c} fleece-lined leggings"],"CUS","sporty,casual");
  /* vacation: [house, dress color, print color, hat, held, expression, posture] */
  const V=(h,c1,c2,hat,held,ex,po,o)=>[h,{top:[DRESS(h),c1,null,c2],headwear:[hat,hat==="straw sun hat with a ribbon"?"@accent":c2],eyewear:["cat-eye sunglasses","@secondary","pushed up on the head"],
      legwear:["strappy flat sandals",c2],heldItem:[held]},ex,po,"a resort vacation",
    Object.assign({more:[{oname:"Micro bikini",look:"resort",items:{top:["{c} micro string bikini top",c1],bottom:["{c} micro string bikini bottoms",c1],
      outerwear:["sheer {c} beach cover-up",c2,"slipping off one shoulder"],heldItem:[held]}}],c:{skinFinish:"sun-kissed skin with a dewy glow"}},o||{})];
  set("Academy Vacation","Academy Summer Days","vacation","vacation","resort",{tags:["vacation","resort","beach","sundress","bikini"],oname:"Resort",
    must:"an anime style with high detail, a bright tropical resort with turquoise sea and palm trees, and particular emphasis on highly detailed skin, hair and eyes"},[
    V("griffin","@third","@accent","wide-brim sun hat","tropical cocktail with a paper umbrella","radiant, head-tilted smile","leaning on a resort balcony railing above the sea"),
    V("badger","@primary","@secondary","straw sun hat with a ribbon","coconut drink with a straw","happy closed-eye smile","sitting on a beach lounger under a palm tree"),
    V("raven","@primary","@accent","wide-brim sun hat","paperback novel","gentle smile","lying on a beach towel, propped on her elbows"),
    V("serpent","@third","@extra","wide-brim sun hat","tropical cocktail with a paper umbrella","half-lidded sultry gaze","sitting on a beach lounger under a palm tree"),
    V("wolf","@secondary","@third","straw sun hat with a ribbon","striped beach ball","playful fanged grin","wading ankle-deep in turquoise water, holding her hat"),
    V("swan","@primary","@secondary","wide-brim sun hat","seashell","serene expression","wading ankle-deep in turquoise water, holding her hat"),
    V("dragon","@primary","@accent","wide-brim sun hat","tropical cocktail with a paper umbrella","confident smile","leaning on a resort balcony railing above the sea"),
    V("stag","@primary","@accent","straw sun hat with a ribbon","seashell","dreamy expression","lying on a beach towel, propped on her elbows"),
    V("shark","@primary","@third","straw sun hat with a ribbon","striped beach ball","playful fanged grin","wading ankle-deep in turquoise water, holding her hat"),
    /* Penguin: a warm granite beach where wild penguins nest among the boulders */
    V("penguin","@secondary","@primary","straw sun hat with a ribbon","camera on a strap","carefree, laughing look","sitting on a sun-warmed granite boulder beside nesting penguins",
      {d:{detailOne:"ruffle trim"}}),
    V("fox","@primary","@secondary","wide-brim sun hat","tropical cocktail with a paper umbrella","sly, fox-like smirk","leaning on a resort balcony railing above the sea"),
    V("lovebird","@primary","@accent","straw sun hat with a ribbon","coconut drink with a straw","sparkling-eyed excited expression","wading ankle-deep in turquoise water, holding her hat"),
    V("flamingo","@primary","@secondary","wide-brim sun hat","tropical cocktail with a paper umbrella","serene expression","sitting on a beach lounger under a palm tree"),
    V("kraken","@secondary","@third","wide-brim sun hat","paperback novel","cool, otherworldly half-smile","lying on a beach towel, propped on her elbows"),
    V("salmon","@secondary","@primary","wide-brim sun hat","sunscreen bottle","poised, self-assured smile","leaning on a resort balcony railing above the sea"),
    V("crow","@primary","@third","straw sun hat with a ribbon","seashell","bright, curious little smile","wading ankle-deep in turquoise water, holding her hat")
  ]);
  /* hiking: [house, top color, shorts color, hat, held, expression, posture] */
  const HK=(h,c1,c2,hat,held,ex,po,o)=>[h,{top:["cropped {c} hiking tank top",c1],bottom:["high-waisted {c} hiking shorts",c2],legwear:["{c} hiking boots with {c2} laces",c2,null,c1],
      headwear:[hat,c1],outerwear:["{c} windbreaker tied around the waist","@accent"],heldItem:[held]},ex,po,"a mountain hike",
    Object.assign({more:[{oname:"Sweaty summit",look:"sporty",items:{top:["{c} sports bra",c1],bottom:["{c} hiking shorts unbuttoned and rolled low",c2],
      legwear:["{c} hiking boots with {c2} laces",c2,null,c1],heldItem:["water bottle"]}}],c:{skinFinish:"lightly sweaty, dewy skin",blushStyle:"flushed cheeks and chest"}},o||{})];
  set("Academy Hiking","Academy Vacation","hiking","hiking","sporty",{tags:["hiking","mountain","trail","outdoors"],oname:"Trail",
    must:"an anime style with high detail, a mountain trail with pine forests and a sweeping valley view, and particular emphasis on highly detailed skin, hair and eyes"},[
    HK("griffin","@third","@secondary","{c} baseball cap","trekking pole","determined expression","standing at a summit lookout, hands on her hips"),
    HK("badger","@primary","@secondary","{c} bandana tied over the hair","handful of wildflowers","happy closed-eye smile","resting on a boulder, drinking from a water bottle"),
    HK("raven","@primary","@extra","{c} baseball cap","trail map","focused expression","climbing a rocky trail, looking back over her shoulder"),
    HK("serpent","@third","@primary","{c} baseball cap","water bottle","wry, knowing look","resting on a boulder, drinking from a water bottle"),
    HK("wolf","@secondary","@primary","{c} bandana tied over the hair","trekking pole","playful fanged grin","stretching her arms up at a mountain viewpoint"),
    HK("swan","@primary","@secondary","{c} baseball cap","camera on a strap","serene expression","crossing a stream on stepping stones"),
    HK("dragon","@primary","@extra","{c} bandana tied over the hair","trekking pole","confident smile","standing at a summit lookout, hands on her hips"),
    HK("stag","@primary","@third","{c} bandana tied over the hair","handful of wildflowers","dreamy expression","crossing a stream on stepping stones"),
    HK("shark","@primary","@secondary","{c} baseball cap","water bottle","playful fanged grin","climbing a rocky trail, looking back over her shoulder"),
    /* Penguin: a snowy trail up to a glacier lookout, a thermos of cocoa to share */
    HK("penguin","@secondary","@primary","knit pom-pom beanie","steaming thermos cup of cocoa","bright cheerful expression","pausing on a snowy trail, holding a steaming thermos cup",
      {c:{skinFinish:"natural skin texture with wind-flushed rosy cheeks",blushStyle:"nose-tip blush"}}),
    HK("fox","@primary","@secondary","{c} bandana tied over the hair","trail map","sly, fox-like smirk","climbing a rocky trail, looking back over her shoulder"),
    HK("lovebird","@primary","@secondary","{c} baseball cap","handful of wildflowers","sparkling-eyed excited expression","crossing a stream on stepping stones"),
    HK("flamingo","@primary","@secondary","{c} baseball cap","water bottle","serene expression","stretching her arms up at a mountain viewpoint"),
    HK("kraken","@secondary","@primary","{c} baseball cap","camera on a strap","cool, otherworldly half-smile","resting on a boulder, drinking from a water bottle"),
    HK("salmon","@primary","@extra","{c} baseball cap","trekking pole","determined expression","crossing a stream on stepping stones"),
    HK("crow","@primary","@secondary","{c} bandana tied over the hair","trail map","curious expression","stretching her arms up at a mountain viewpoint")
  ]);
  /* Penguin's trail is snowy, so her scene line says so */
  /* her trail is snowy: warm layers instead of a tank top and shorts, and a puffer vest left open at the summit */
  const pt=tplById("penguinhiking");
  if(pt){pt.out=Object.assign({},pt.out,{must:"an anime style with high detail, a snowy mountain trail winding up to a blue glacier lookout, and particular emphasis on highly detailed skin, hair and eyes"});
    pt.outfit.items={top:["fitted {c} thermal top","@secondary"],bottom:["{c} fleece-lined leggings","@primary"],outerwear:["{c} puffer vest","@extra"],
      legwear:["{c} hiking boots with {c2} laces","@primary",null,"@extra"],headwear:["knit pom-pom beanie","@extra"],gloves:["fluffy mittens","@secondary"],heldItem:["steaming thermos cup of cocoa","-"]};
    const m=pt.more.find(o=>o.oname==="Sweaty summit");if(m)m.items={top:["{c} sports bra","@secondary"],outerwear:["{c} puffer vest","@extra","unzipped and slipping off the shoulders"],
      bottom:["{c} fleece-lined leggings","@primary"],headwear:["knit pom-pom beanie","@extra"],heldItem:["steaming thermos cup of cocoa","-"]}}
  /* her beach is the warm granite cove where wild penguins nest among the boulders */
  const pv=tplById("penguinvacation");
  if(pv)pv.out=Object.assign({},pv.out,{must:"an anime style with high detail, a warm white-sand cove among huge granite boulders where wild penguins nest, turquoise sea, and particular emphasis on highly detailed skin, hair and eyes"});
})();

/* ---- v158: "Academy Pokemon Trainers". One very lewd trainer cosplay per house, built on her own base (Crow's "crowbody"),
   with the Pokemon closest to her house as a companion in her main outfit only. The Pokemon is never part of anything sexual:
   the lewder "Gym leader" outfit and the Nude outfit leave it out, and the set is not explicit.
   Penguin's partner is a Piplup in a tiny matching scarf, the one detail chosen just for her. */
(function(){
  const{set}=ACAD;
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"US",fam||"costume"));
  ["throwing a Poke Ball with a wink","posing with one hand on the brim of her cap","crouching beside her partner Pokemon, giving a peace sign",
   "pointing forward, calling out an attack","holding a Poke Ball up to her lips","standing hip-cocked with a Poke Ball on one finger"].forEach(v=>START.option("posture",v,"Posture"));
  it("top",["cropped {c} trainer jacket worn open over a {c2} micro tube top"],"LS","costume,sporty");
  it("top",["{c} micro bikini top with a {c2} Poke Ball print"],"L","costume,boudoir");
  it("bottom",["{c} micro shorts unbuttoned and riding low"],"L","costume,sporty");
  it("legwear",["{c} thigh-high socks with {c2} stripes"],"CU","costume,sporty");
  it("headwear",["{c} trainer cap worn backwards"],"CU","costume,sporty");
  it("waistAccessory",["{c} belt of Poke Balls slung low on the hips"],"CU","costume");
  it("gloves",["{c} fingerless trainer gloves"],"CU","costume,sporty");
  it("heldItem",["Poke Ball"],"CU","costume");
  /* [house, Pokemon (how it sits with her), expression, posture] */
  const PK={griffin:["a Pyroar standing proudly at her side","confident smile","standing hip-cocked with a Poke Ball on one finger"],
    badger:["a Teddiursa hugging her leg, licking honey from its paw","bubbly open-mouthed grin","crouching beside her partner Pokemon, giving a peace sign"],
    raven:["a Corviknight perched on a rock behind her","cool aloof expression","posing with one hand on the brim of her cap"],
    serpent:["a Serperior coiled elegantly around her feet","half-lidded sultry gaze","holding a Poke Ball up to her lips"],
    wolf:["a Midnight Lycanroc crouched beside her","playful fanged grin","pointing forward, calling out an attack"],
    swan:["a Swanna gliding beside her","serene expression","posing with one hand on the brim of her cap"],
    dragon:["a Charizard looming behind her, tail flame blazing","smirk","pointing forward, calling out an attack"],
    stag:["a Sawsbuck in its spring form standing beside her","dreamy expression","crouching beside her partner Pokemon, giving a peace sign"],
    shark:["a Sharpedo leaping out of the water behind her","playful fanged grin","throwing a Poke Ball with a wink"],
    penguin:["a Piplup in a tiny matching orange scarf waddling at her heels","bright cheerful expression","crouching beside her partner Pokemon, giving a peace sign"],
    fox:["a Ninetales curling its nine tails around her","sly, fox-like smirk","holding a Poke Ball up to her lips"],
    lovebird:["a fluffy Swablu nestled on her shoulder","sparkling-eyed excited expression","throwing a Poke Ball with a wink"],
    flamingo:["a Flamigo balancing on one leg beside her","serene expression","standing hip-cocked with a Poke Ball on one finger"],
    kraken:["a Grapploct sprawled lazily beside her","cool, otherworldly half-smile","holding a Poke Ball up to her lips"],
    salmon:["a Magikarp leaping in a splash of water beside her","poised, self-assured smile","posing with one hand on the brim of her cap"],
    crow:["a Murkrow perched on her shoulder with a stolen ring in its beak","mischievous expression","throwing a Poke Ball with a wink"]};
  it("shoulderPiece",Object.values(PK).map(x=>x[0]),"CU","costume");
  const T=h=>{const[mon,ex,po]=PK[h];
    const it={top:["cropped {c} trainer jacket worn open over a {c2} micro tube top","@primary",null,"@secondary"],bottom:["{c} micro shorts unbuttoned and riding low","@secondary"],
      legwear:["{c} thigh-high socks with {c2} stripes","@secondary",null,"@accent"],headwear:["{c} trainer cap worn backwards","@accent"],
      waistAccessory:["{c} belt of Poke Balls slung low on the hips","@extra"],gloves:["{c} fingerless trainer gloves","@accent"],shoulderPiece:[mon,"-"]};
    return[h,it,ex,po,"a Pokemon trainer",{more:[{oname:"Gym leader",look:"boudoir",items:{top:["{c} micro bikini top with a {c2} Poke Ball print","@primary",null,"@secondary"],
      bottom:["{c} micro shorts unbuttoned and riding low","@secondary"],headwear:["{c} trainer cap worn backwards","@accent"],legwear:["{c} thigh-high socks with {c2} stripes","@secondary",null,"@accent"],
      heldItem:["Poke Ball"]}}]}]};
  set("Academy Pokemon Trainers","Academy Cosplay","trainer","trainer","costume",{tags:["pokemon","pokemon trainer","cosplay","lewd"],oname:"Trainer",
    must:"an anime style with high detail, a bright outdoor battle field under a blue sky, and particular emphasis on highly detailed skin, hair and eyes"},
    ACAD.HOUSES.filter(h=>PK[h]).map(T));
})();

/* ---- v159: "Academy Superheroines" and "Academy Public Pee".
   Superheroines: a house-emblem superhero bodysuit, cape, mask and boots, then a battle-torn suit and a Nude outfit. Not explicit.
   Public Pee: solo-first exhibitionist set like the Public sets (Scene tab solo mode, optional partner): each girl, a willing adult,
   pees outdoors somewhere that fits her house while bystanders stay far in the background. Nobody else is involved or peed on.
   Penguin's two: a frost heroine skating on her own ice trail over the city, and melting a little heart into fresh snow by a mountain hut. */
(function(){
  const{set}=ACAD,cap=s=>s[0].toUpperCase()+s.slice(1);
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"US",fam||"costume"));
  const op=(f,list,g)=>list.forEach(v=>START.option(f,v,g||"Posture"));
  /* ======================= Superheroines ======================= */
  op("posture",["landing in a superhero crouch, one fist on the ground","hovering in midair, cape billowing","standing on a rooftop ledge, cape snapping in the wind",
    "flexing with one fist raised to the sky","skating along a trail of ice through the air"]);
  const EMB={griffin:"winged-lion",badger:"honeycomb",raven:"crescent-moon",serpent:"coiled-serpent",wolf:"howling-wolf",swan:"swan-wing",dragon:"dragon",stag:"antler",
    shark:"shark-fin",penguin:"penguin-and-snowflake",fox:"nine-tailed-fox",lovebird:"winged-heart",flamingo:"flamingo",kraken:"tentacle",salmon:"leaping-salmon",crow:"crow-and-moon"};
  const SUIT=h=>`{c} superhero bodysuit with a {c2} ${EMB[h]} emblem and a plunging neckline`;
  it("top",Object.keys(EMB).map(SUIT),"US","costume");
  it("top",["{c} superhero bodysuit torn open at the chest and hips"],"L","costume,boudoir");
  it("outerwear",["flowing {c} cape"],"CU");it("maskAccessory",["{c} domino mask"],"CU");it("legwear",["{c} thigh-high hero boots"],"CU");
  it("gloves",["{c} elbow-length hero gloves"],"CU");it("belt",["{c} utility belt"],"CU");
  const POSE={griffin:["determined expression","landing in a superhero crouch, one fist on the ground"],badger:["bubbly open-mouthed grin","flexing with one fist raised to the sky"],
    raven:["cool aloof expression","standing on a rooftop ledge, cape snapping in the wind"],serpent:["smirk","hovering in midair, cape billowing"],
    wolf:["playful fanged grin","landing in a superhero crouch, one fist on the ground"],swan:["serene expression","hovering in midair, cape billowing"],
    dragon:["fierce, battle-ready glare","flexing with one fist raised to the sky"],stag:["dreamy expression","hovering in midair, cape billowing"],
    shark:["playful fanged grin","landing in a superhero crouch, one fist on the ground"],penguin:["bright cheerful expression","skating along a trail of ice through the air"],
    fox:["sly, fox-like smirk","standing on a rooftop ledge, cape snapping in the wind"],lovebird:["sparkling-eyed excited expression","flexing with one fist raised to the sky"],
    flamingo:["serene expression","standing on a rooftop ledge, cape snapping in the wind"],kraken:["cool, otherworldly half-smile","hovering in midair, cape billowing"],
    salmon:["poised, self-assured smile","landing in a superhero crouch, one fist on the ground"],crow:["mischievous expression","standing on a rooftop ledge, cape snapping in the wind"]};
  const SH=h=>{const[ex,po]=POSE[h];
    return[h,{top:[SUIT(h),"@primary",null,"@accent"],outerwear:["flowing {c} cape","@secondary"],maskAccessory:["{c} domino mask","@secondary"],
      legwear:["{c} thigh-high hero boots","@secondary"],gloves:["{c} elbow-length hero gloves","@secondary"],belt:["{c} utility belt","@accent"]},ex,po,"a superheroine",
      {more:[{oname:"Battle-torn",look:"boudoir",items:{top:["{c} superhero bodysuit torn open at the chest and hips","@primary"],outerwear:["flowing {c} cape","@secondary","in tatters"],
        maskAccessory:["{c} domino mask","@secondary"],legwear:["{c} thigh-high hero boots","@secondary"]}}]}]};
  set("Academy Superheroines","Academy Magical Heroines","hero","superheroine","costume",{tags:["superhero","superheroine","cape","costume"],oname:"Hero suit",
    c:{skinFinish:"sweat-sheened skin"},must:"an anime style with high detail, a city skyline at night lit by searchlights, and particular emphasis on highly detailed skin, hair and eyes"},
    ACAD.HOUSES.filter(h=>EMB[h]).map(SH));
  const ph=tplById("penguinhero");
  if(ph)ph.out=Object.assign({},ph.out,{must:"an anime style with high detail, a frozen city skyline at night with a glittering trail of ice through the air, and particular emphasis on highly detailed skin, hair and eyes"});

  /* ======================= Public Pee ======================= */
  const G="Explicit (adult)";
  const tl=(a,b)=>[...new Set((a+", "+b).split(/,\s*/).filter(Boolean))].join(", ");
  const PEE={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",lipFinish:"wet glossy lips",vaginaType:"flushed, swollen, and dripping wet with arousal",skinFinish:"lightly sweaty, dewy skin"};
  const TAILP="peeing, pee, urine stream, outdoors, public indecency, exhibitionism, looking at viewer";
  it("waistAccessory",["{c} skirt hiked up around the waist","{c} evening gown hiked up around the waist","{c} yukata hiked up around the waist","{c} sundress rucked up around the waist"],"CU","casual");
  it("legwear",["pulled-down {c} panties around one ankle","snow pants pushed down to the thighs","leggings pulled down to the knees"],"CU","casual");
  it("headwear",["knit pom-pom beanie"],"CU","casual");
  const P=[
["griffin","City fountain","squatting on the rim of a city fountain at night, skirt hiked up","confident smile","a city plaza at night with a lit fountain",{waistAccessory:["{c} skirt hiked up around the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@c2"]},
  `squats on the rim of a lit city fountain at night with her skirt hiked up and her panties around one ankle, peeing a glittering stream into the fountain while the plaza's late crowd laughs at a café far behind her, and gives the viewer a confident smile`,"fountain, plaza, night, city, squatting, skirt lift, panties around one leg"],
["badger","Picnic hedge","squatting behind a low park hedge, waving","blushing shy smile","a sunny park full of picnics",{waistAccessory:["{c} sundress rucked up around the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@c2"]},
  `squats behind a low hedge at a busy park picnic, sundress rucked up and panties around one ankle, peeing into the grass while picnickers sit on their blankets in the distance, and waves at the viewer with a blushing, shy smile`,"park, hedge, grass, picnic, day, squatting, dress lift, waving, blush"],
["raven","Rooftop drain","standing over a rooftop drain under the stars, legs apart","half-lidded sultry gaze","a city rooftop under a starry sky",{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},
  `stands over a rooftop drain under a sky full of stars, skirt hiked up and legs apart, peeing in a long arc while the windows of the towers around her glow, and gives the viewer a half-lidded, sultry gaze`,"rooftop, night, starry sky, city lights, standing, legs apart, skirt lift"],
["serpent","Gala balcony","squatting at a gala balcony's edge, gown hiked up","smirk","a moonlit gala balcony above a dark garden",{waistAccessory:["{c} evening gown hiked up around the waist","@c1"]},
  `squats at the edge of a moonlit gala balcony with her evening gown hiked up to her waist, peeing between the balusters into an empty flowerbed far below while the ball glitters through the glass doors behind her, and smirks at the viewer`,"balcony, gala, night, moonlight, evening gown, dress lift, squatting, smirk"],
["wolf","Trail marker","squatting beside a pine on a mountain trail","playful fanged grin","a pine forest on a mountain trail",{legwear:["leggings pulled down to the knees","@c1"]},
  `squats beside a big pine on a mountain trail with her leggings pulled down to her knees, marking the tree with a hot stream while hikers pass on the switchback far below, and flashes the viewer a playful, fanged grin`,"forest, pine tree, mountain, trail, squatting, leggings pull, fang, grin"],
["swan","Lake jetty","squatting at the end of a lake jetty at dawn","serene expression","a misty lake at dawn",{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},
  `squats at the very end of a wooden jetty on a misty lake at dawn, skirt hiked up, peeing in a thin stream into the still water while swans glide past and an early rower drifts far off, her face serene`,"lake, jetty, pier, dawn, fog, swan, squatting, skirt lift, serene"],
["dragon","Neon alley","standing legs apart in a neon alley","confident smile","a neon-lit city alley at night",{waistAccessory:["{c} skirt hiked up around the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@c2"]},
  `stands with her legs apart in a neon-lit alley, skirt hiked up and panties around one ankle, peeing a bold stream onto the wet pavement while a club's crowd queues at the far end of the alley, and grins at the viewer, completely unbothered`,"alley, neon lights, night, city, standing, legs apart, skirt lift, grin"],
["stag","Forest stream","squatting over a forest stream on mossy stones","dreamy expression","a sunlit forest stream",{waistAccessory:["{c} sundress rucked up around the waist","@c1"]},
  `squats over a clear forest stream on two mossy stones, sundress rucked up, peeing into the water as sunbeams fall through the leaves and distant hikers' voices echo along the bank, her face dreamy`,"forest, stream, moss, sunbeam, day, squatting, dress lift"],
["shark","Pier","squatting at the edge of a pier above the surf","playful fanged grin","a beach pier above the surf",{},
  `squats at the edge of a wooden pier in a tiny swimsuit pulled aside, peeing a long arc into the surf while surfers bob far out on the waves, and sticks her tongue out at the viewer with a playful, fanged grin`,"pier, beach, ocean, waves, day, squatting, swimsuit aside, tongue out, fang"],
["penguin","Fresh snow","squatting in fresh snow beside a mountain hut, steam rising","bright cheerful expression","fresh snow beside a lamplit mountain hut",{legwear:["snow pants pushed down to the thighs","@c1"],headwear:["knit pom-pom beanie","@c2"]},
  `squats in deep fresh snow beside a lamplit mountain hut, snow pants pushed down to her thighs and a pom-pom beanie on, peeing a little steaming heart into the snow while skiers glide past on the far slope, and beams at the viewer with rosy, wind-flushed cheeks`,"snow, mountain, hut, lamplight, winter, steam, squatting, snow pants, beanie, heart, smile, blush"],
["fox","Shrine path","squatting behind a stone lantern on a festival shrine path","sly, fox-like smirk","a lantern-lit shrine path during a summer festival",{waistAccessory:["{c} yukata hiked up around the waist","@c1"]},
  `squats behind a moss-covered stone lantern on a lantern-lit shrine path, yukata hiked up to her waist, peeing onto the gravel while festivalgoers stroll past the torii gate in the distance, and gives the viewer a sly, fox-like smirk`,"shrine, stone lantern, torii, festival, night, yukata, squatting, smirk"],
["lovebird","Fairground","squatting behind a carousel, giggling","sweet, giggly smile with her tongue out","a twinkling fairground at night",{waistAccessory:["{c} skirt hiked up around the waist","@c1"],legwear:["pulled-down {c} panties around one ankle","@c2"]},
  `squats behind a twinkling carousel at a night fair, skirt hiked up and panties around one ankle, peeing onto the grass while the rides spin and families laugh far across the fairground, and giggles at the viewer with her tongue out`,"fairground, carousel, night, lights, squatting, skirt lift, giggling, tongue out"],
["flamingo","Lagoon shallows","standing in lagoon shallows on one leg","serene expression","a tropical lagoon at sunset",{},
  `stands knee-deep in a pink-lit lagoon at sunset, balanced on one leg like a flamingo, peeing into the warm shallows while couples walk the beach far behind her, her smile serene`,"lagoon, sunset, beach, water, standing on one leg, wading, serene"],
["kraken","Ship's rail","squatting at a ship's rail at night","cool, otherworldly half-smile","the moonlit deck of a ship at sea",{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},
  `squats between the rails at the stern of a ship at sea under the moon, skirt hiked up, peeing into the black, foaming wake while the lit cabins glow far forward, and gives the viewer a cool, otherworldly half-smile`,"ship, deck, railing, night, moonlight, ocean, wake, squatting, skirt lift"],
["salmon","River crossing","squatting in a river at dawn, skirt gathered up","poised, self-assured smile","a rushing river at dawn",{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},
  `squats knee-deep in a rushing river at dawn, her skirt gathered up at her waist, peeing into the current as salmon leap upstream past her and anglers cast far downstream, and keeps a perfectly poised, self-assured smile for the viewer`,"river, dawn, salmon, fish, water, squatting, partially submerged, skirt lift, smile"],
["crow","Rooftop crows","squatting on a rooftop among the crows","mischievous expression","a moonlit rooftop full of crows",{waistAccessory:["{c} skirt hiked up around the waist","@c1"]},
  `squats on a moonlit rooftop among a flock of curious crows, skirt hiked up, peeing into the gutter while the city glitters far below, and gives the viewer a mischievous, giggling look as one crow tilts its head at her`,"rooftop, night, full moon, crow, bird, city lights, squatting, skirt lift, giggling"]];
  op("posture",P.map(r=>r[2]),G);
  START.add("Academy Public Pee",P.map(([h,name,pose,ex,setLine,w1,solo,tags])=>{
    const rb=tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},PEE,{expression:ex,posture:pose});
    return{id:h+"pee",base:ACAD.robes(h),name:cap(h)+" "+name.toLowerCase(),c:Object.assign({age:"woman"},c1),
      outfit:{oname:"In public",look:"casual",items:res(w1),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:`an anime style with high detail, ${setLine}, and particular emphasis on highly detailed skin, hair and eyes`,
        pair:{id:"",outfit:"scene",solo:`The woman ${solo}. ${tl(TAILP,tags)}`,
          scene:`The woman and {partner} sneak off together, and the woman ${solo}, while {partner} stands guard beside her, grinning. ${tl(TAILP,tags)}`,
          soloCount:"1girl, solo focus",act:"",dir:"mutual",explicit:true,penis:false,pc:{expression:"smirk",posture:null},c1,
          w1:{name:"In public",look:"casual",f:w1},w2:{name:"In public",look:"casual",f:{},m:{}},compact:false,fit:true}},
      tags:["peeing","public","exhibitionism","explicit",h],blurb:`${name}: ${pose}, in ${setLine}. Solo by default; pick a partner in the Scene tab to add one.`};
  }),{after:"Academy Public Masturbation"});
})();

/* ---- v160: "Academy Pirates", "Academy Cowgirls" and "Academy Spider Heroines" (a sleek web-suit heroine in the spirit of
   Silk's costume: a fitted bodysuit with web lines, a web eye mask, long gloves and boots, in each girl's house colors).
   One girl per house in each, on her own base (Crow's "crowbody"), each with a lewder second outfit and a Nude outfit. Not explicit.
   Penguin's three are set on the snow: an icebound pirate ship, a snowy ranch at dusk and a snow-dusted gargoyle. */
(function(){
  const{set}=ACAD;
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"US",fam||"costume"));
  const op=list=>list.forEach(v=>START.option("posture",v,"Posture"));
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression"};
  const H=ACAD.HOUSES.filter(h=>EX[h]);
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const setMust=(id,s)=>{const t=tplById(id);if(t)t.out=Object.assign({},t.out,{must:must(s)})};

  /* ======================= Pirates ======================= */
  op(["standing with one boot on a treasure chest, cutlass raised","leaning on a ship's rail with a spyglass","swinging from the rigging by one hand","sitting on a treasure chest, legs crossed",
    "standing at the prow of an icebound ship, spyglass raised"]);
  it("top",["{c} plunging pirate corset over a {c2} ruffled blouse slipping off the shoulders"],"US");
  it("bottom",["{c} micro ruffled skirt with a {c2} sash"],"US");it("headwear",["{c} tricorn hat with a {c2} feather"],"CU");
  it("legwear",["{c} thigh-high pirate boots"],"CU");it("outerwear",["long {c} captain's coat worn open off the shoulders"],"CU");
  it("heldItem",["cutlass","spyglass","treasure map","flintlock pistol","bottle of rum","gold doubloon"],"CU");
  it("top",["torn white blouse knotted under the bust"],"L","costume,boudoir");it("bottom",["{c} micro shorts slung low"],"L","costume,boudoir");
  const PH={griffin:["cutlass","standing with one boot on a treasure chest, cutlass raised"],badger:["bottle of rum","sitting on a treasure chest, legs crossed"],raven:["spyglass","leaning on a ship's rail with a spyglass"],
    serpent:["flintlock pistol","sitting on a treasure chest, legs crossed"],wolf:["cutlass","swinging from the rigging by one hand"],swan:["treasure map","leaning on a ship's rail with a spyglass"],
    dragon:["cutlass","standing with one boot on a treasure chest, cutlass raised"],stag:["treasure map","sitting on a treasure chest, legs crossed"],shark:["cutlass","swinging from the rigging by one hand"],
    penguin:["spyglass","standing at the prow of an icebound ship, spyglass raised"],fox:["gold doubloon","sitting on a treasure chest, legs crossed"],lovebird:["treasure map","swinging from the rigging by one hand"],
    flamingo:["bottle of rum","leaning on a ship's rail with a spyglass"],kraken:["flintlock pistol","leaning on a ship's rail with a spyglass"],salmon:["spyglass","standing with one boot on a treasure chest, cutlass raised"],
    crow:["gold doubloon","swinging from the rigging by one hand"]};
  set("Academy Pirates","Academy Cosplay","pirate","pirate","costume",{tags:["pirate","costume","ship"],oname:"Pirate",c:{skinFinish:"sun-kissed skin with a dewy glow"},
    must:must("the deck of a tall pirate ship on a sparkling sea")},
    H.map(h=>[h,{top:["{c} plunging pirate corset over a {c2} ruffled blouse slipping off the shoulders","@primary",null,"@third"],bottom:["{c} micro ruffled skirt with a {c2} sash","@secondary",null,"@accent"],
      headwear:["{c} tricorn hat with a {c2} feather","@primary",null,"@accent"],legwear:["{c} thigh-high pirate boots","@secondary"],
      outerwear:["long {c} captain's coat worn open off the shoulders","@primary"],heldItem:[PH[h][0]]},EX[h],PH[h][1],"a sexy pirate",
      {more:[{oname:"Shipwrecked",look:"boudoir",items:{top:["torn white blouse knotted under the bust","white"],bottom:["{c} micro shorts slung low","@secondary"],
        headwear:["{c} tricorn hat with a {c2} feather","@primary",null,"@accent"],heldItem:[PH[h][0]]}}]}]));
  setMust("penguinpirate","the prow of a pirate ship pushing through ice floes on a frosty sea");

  /* ======================= Cowgirls ======================= */
  op(["leaning on a fence rail, one boot on the bottom rung","swinging a lasso overhead","sitting on a hay bale, one boot up","riding a mechanical bull, one hand in the air"]);
  it("top",["{c} cropped plaid shirt knotted under the bust"],"US");it("bottom",["{c} micro denim shorts"],"US");
  it("legwear",["{c} cowgirl boots with {c2} stitching"],"CU");it("headwear",["{c} cowgirl hat"],"CU");it("neckAccessory",["{c} bandana neckerchief"],"CU");
  it("outerwear",["{c} fringed suede vest"],"CU");it("belt",["{c} leather belt with a big silver buckle"],"CU");it("heldItem",["coiled lasso","lit lantern"],"CU");
  it("bottom",["{c} leather chaps over a {c2} thong"],"L","costume,boudoir");it("top",["{c} fringed bikini top"],"L","costume,boudoir");
  const CP={griffin:"swinging a lasso overhead",badger:"sitting on a hay bale, one boot up",raven:"leaning on a fence rail, one boot on the bottom rung",serpent:"riding a mechanical bull, one hand in the air",
    wolf:"swinging a lasso overhead",swan:"leaning on a fence rail, one boot on the bottom rung",dragon:"riding a mechanical bull, one hand in the air",stag:"sitting on a hay bale, one boot up",
    shark:"riding a mechanical bull, one hand in the air",penguin:"leaning on a fence rail, one boot on the bottom rung",fox:"sitting on a hay bale, one boot up",lovebird:"swinging a lasso overhead",
    flamingo:"leaning on a fence rail, one boot on the bottom rung",kraken:"sitting on a hay bale, one boot up",salmon:"leaning on a fence rail, one boot on the bottom rung",crow:"swinging a lasso overhead"};
  set("Academy Cowgirls","Academy Pirates","cowgirl","cowgirl","costume",{tags:["cowgirl","western","ranch","costume"],oname:"Cowgirl",
    must:must("a sunny ranch with wooden fences, hay bales and open prairie")},
    H.map(h=>[h,{top:["{c} cropped plaid shirt knotted under the bust","@primary"],bottom:["{c} micro denim shorts","@secondary"],legwear:["{c} cowgirl boots with {c2} stitching","@secondary",null,"@accent"],
      headwear:["{c} cowgirl hat","@secondary"],neckAccessory:["{c} bandana neckerchief","@accent"],belt:["{c} leather belt with a big silver buckle","@extra"],
      heldItem:[h==="penguin"?"lit lantern":"coiled lasso"]},EX[h],CP[h],"a sexy cowgirl",
      {more:[{oname:"Rodeo night",look:"boudoir",items:{top:["{c} fringed bikini top","@primary"],bottom:["{c} leather chaps over a {c2} thong","@secondary",null,"@primary"],
        legwear:["{c} cowgirl boots with {c2} stitching","@secondary",null,"@accent"],headwear:["{c} cowgirl hat","@secondary"]}}]}]));
  setMust("penguincowgirl","a snowy ranch at dusk, wooden fences frosted white and a warm lantern-lit barn behind her");

  /* ======================= Spider Heroines ======================= */
  op(["hanging upside down from a web line","crouched on a brick wall, one hand flat on the bricks","swinging through the city on a web line","perched on a gargoyle above the street"]);
  it("top",["{c} web-suit bodysuit with {c2} web-line patterning and a plunging neckline"],"US");it("maskAccessory",["{c} web-patterned eye mask"],"CU");
  it("gloves",["{c} long web-patterned gloves"],"CU");it("legwear",["{c} web-patterned thigh-high boots"],"CU");
  it("top",["{c} web-suit bodysuit torn open down to the navel"],"L","costume,boudoir");
  const SP=["hanging upside down from a web line","crouched on a brick wall, one hand flat on the bricks","swinging through the city on a web line","perched on a gargoyle above the street"];
  set("Academy Spider Heroines","Academy Superheroines","spider","spider heroine","costume",{tags:["spider heroine","web suit","superhero","costume"],oname:"Web suit",c:{skinFinish:"sweat-sheened skin"},
    must:must("a city at night seen from the rooftops, web lines strung between the towers")},
    H.map((h,i)=>[h,{top:["{c} web-suit bodysuit with {c2} web-line patterning and a plunging neckline","@primary",null,"@secondary"],maskAccessory:["{c} web-patterned eye mask","@primary"],
      gloves:["{c} long web-patterned gloves","@primary"],legwear:["{c} web-patterned thigh-high boots","@primary"]},EX[h],h==="penguin"?"perched on a gargoyle above the street":SP[i%4],"a spider heroine",
      {more:[{oname:"Web-torn",look:"boudoir",items:{top:["{c} web-suit bodysuit torn open down to the navel","@primary"],maskAccessory:["{c} web-patterned eye mask","@primary"],
        legwear:["{c} web-patterned thigh-high boots","@primary"]}}]}]));
  setMust("penguinspider","a snow-dusted gargoyle high above a city street at night with snow falling");
})();

/* ---- v161: "Academy Waifus", "Academy Prehistoric", "Academy Aliens" and "Academy Corporate" ----
   One girl per house in each, on her own base (Crow's "crowbody"), each with a lewder second outfit and a Nude outfit. Not explicit.
   Waifus: each house as a classic anime-waifu archetype with the outfit that goes with it.
   Prehistoric: fur-and-hide cavewomen with a pelt or trophy from her house's animal.
   Aliens: each girl with her own alien skin tone, markings and features in a sleek space suit.
   Corporate: office ladies from intern to CEO in a glass tower.
   Penguin's four are thought through on their own: a kotatsu girlfriend in a snowed-in room, an ice-age huntress
   with a woolly mammoth behind her, an ice-moon alien under a ringed planet, and a late-night corner office in falling snow. */
/* v161: postures that start with a participle or a place ("perched on…", "bent over…", "on all fours…", "slow dancing…")
   read as their own sentence ("She is …") instead of being folded into the body list */
poseAction=function(p){return !!p&&/^(\w+ing|curled|propped|perched|crouched|seated|sprawled|slumped|slouched|collapsed|bent|pressed|pinned|stuck|caught|buried|wrapped|folded|held|strapped|suspended|tied|cuffed|draped|bound|lifted|scissored|on|in|inside|slow)\b/i.test(p)&&!/(posture|stance|glance|pose)$/i.test(p)};
(function(){
  const{set}=ACAD;
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t||"US",fam||"costume"));
  const op=list=>list.forEach(v=>START.option("posture",v,"Posture"));
  const ex=(list,g)=>list.forEach(v=>START.option("expression",v,g||"Cute"));
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const setMust=(id,s)=>{const t=tplById(id);if(t)t.out=Object.assign({},t.out,{must:must(s)})};
  const H=ACAD.HOUSES.slice();
  const LING={oname:"Lingerie",look:"boudoir",items:{bra:["{c} lace balconette bra with a {c2} bow","@primary",null,"@accent"],panties:["{c} lace panties with a {c2} bow","@primary",null,"@accent"],
    legwear:["{c} lace-top thigh-high stockings","@secondary"]}};
  it("bra",["{c} lace balconette bra with a {c2} bow"],"L","boudoir");it("panties",["{c} lace panties with a {c2} bow"],"L","boudoir");
  it("legwear",["{c} lace-top thigh-high stockings"],"LS","boudoir");

  /* ======================= Waifus ======================= */
  ex(["flustered pout with crossed arms and a blush","sweet, adoring smile"],"Cute");
  ex(["sweet smile with shadowed, obsessive eyes","teasing half-lidded smile","dramatic smirk behind one hand"],"Sultry (adult)");
  op(["standing with arms crossed under the bust, looking away","sitting at a kotatsu, hugging a mug of cocoa","laughing haughtily with a hand to her mouth","sitting cross-legged in a gaming chair",
    "leaning forward with her chin on her hand","striking a dramatic pose, one hand splayed over her eye","kneeling to pour tea","peeking over the top of a book","flashing a peace sign beside her face"]);
  it("top",["{c} backless open-chest knit sweater dress","{c} frilled apron over bare skin","oversized white dress shirt unbuttoned to the navel","{c} lace slip dress with a plunging neckline",
    "{c} cropped hoodie with cat-ear hood","{c} lace corset gown with a high thigh slit","{c} chiffon princess gown with a plunging neckline and a thigh slit","{c} cropped cardigan buttoned once over a {c2} lace bralette",
    "{c} tube top","oversized {c} knit sweater slipping off one shoulder","tight {c} ribbed sweater dress with a keyhole neckline","{c} heart-cutout chemise","{c} mesh crop top over a {c2} bra",
    "sheer {c} yukata loosely tied and slipping off the shoulders","{c} gothic lace micro dress with a corset bodice"],"US");
  it("bottom",["{c} low-rise micro skirt","{c} dolphin shorts","{c} leather micro skirt"],"US");
  it("legwear",["{c} thigh-high knit socks","{c} striped thigh-high socks","{c} platform boots","{c} fishnet stockings","{c} lace-up platform boots"],"CU");
  it("neckAccessory",["{c} heart-lock choker","{c} spiked choker","pearl necklace"],"CU");it("headwear",["{c} jeweled tiara"],"CU");it("eyewear",["{c} eyepatch"],"CU");
  it("wristAccessory",["bandage wrapped around one forearm"],"CU");
  it("heldItem",["soup ladle","mug of cocoa","game controller","paperback novel","phone in a glittery case","heart-shaped box of chocolates","folding fan","teacup"],"CU");
  const W={
    griffin:["tsundere",{top:["{c} backless open-chest knit sweater dress","@primary"],legwear:["{c} thigh-high knit socks","@secondary"]},"flustered pout with crossed arms and a blush","standing with arms crossed under the bust, looking away"],
    badger:["newlywed deredere",{top:["{c} frilled apron over bare skin","@primary"],headwear:null,heldItem:["soup ladle"]},"sweet, adoring smile","over-the-shoulder glance"],
    raven:["kuudere",{top:["oversized white dress shirt unbuttoned to the navel","white"],legwear:["{c} thigh-high knit socks","@primary"]},"cool aloof expression","relaxed posture"],
    serpent:["yandere",{top:["{c} lace slip dress with a plunging neckline","@primary"],neckAccessory:["{c} heart-lock choker","@accent"]},"sweet smile with shadowed, obsessive eyes","leaning forward with her chin on her hand"],
    wolf:["genki gamer girl",{top:["{c} cropped hoodie with cat-ear hood","@primary"],bottom:["{c} dolphin shorts","@secondary"],legwear:["{c} striped thigh-high socks","@primary"],heldItem:["game controller"]},"playful fanged grin","sitting cross-legged in a gaming chair"],
    swan:["ojou-sama",{top:["{c} lace corset gown with a high thigh slit","@primary"],gloves:["long satin opera gloves","@primary"],heldItem:["folding fan"]},"elegant composed expression","laughing haughtily with a hand to her mouth"],
    dragon:["himedere princess",{top:["{c} chiffon princess gown with a plunging neckline and a thigh slit","@primary"],headwear:["{c} jeweled tiara","@accent"]},"smirk","hip-popped sultry stance"],
    stag:["dandere bookworm",{top:["{c} cropped cardigan buttoned once over a {c2} lace bralette","@primary",null,"@accent"],bottom:["{c} micro pleated skirt","@secondary"],legwear:["{c} thigh-high knit socks","@secondary"],heldItem:["paperback novel"]},"slightly shy expression","peeking over the top of a book"],
    shark:["gyaru",{top:["{c} tube top","@primary"],bottom:["{c} low-rise micro skirt","@secondary"],legwear:["{c} platform boots","@primary"],heldItem:["phone in a glittery case"]},"playful fanged grin","flashing a peace sign beside her face",{skinFinish:"sun-kissed skin with a dewy glow"}],
    penguin:["cozy kotatsu girlfriend",{top:["oversized {c} knit sweater slipping off one shoulder","@primary"],legwear:["{c} thigh-high knit socks","@secondary"],heldItem:["mug of cocoa"]},"bright cheerful expression","sitting at a kotatsu, hugging a mug of cocoa"],
    fox:["teasing onee-san",{top:["tight {c} ribbed sweater dress with a keyhole neckline","@primary"],legwear:["{c} lace-top thigh-high stockings","@secondary"]},"teasing half-lidded smile","leaning forward with her chin on her hand"],
    lovebird:["lovestruck deredere",{top:["{c} heart-cutout chemise","@primary"],legwear:["{c} lace-top thigh-high stockings","@secondary"],heldItem:["heart-shaped box of chocolates"]},"sweet, adoring smile","over-the-shoulder glance",{pupilStyle:"heart pupils"}],
    flamingo:["bubbly airhead",{top:["{c} tube top","@primary"],bottom:["{c} low-rise micro skirt","@secondary"],legwear:["{c} platform boots","@primary"]},"bubbly open-mouthed grin","flashing a peace sign beside her face"],
    kraken:["goth girlfriend",{top:["{c} mesh crop top over a {c2} bra","@primary",null,"@secondary"],bottom:["{c} leather micro skirt","@secondary"],legwear:["{c} fishnet stockings","@primary"],neckAccessory:["{c} spiked choker","@secondary"]},"cool, otherworldly half-smile","hip-popped sultry stance"],
    salmon:["yamato nadeshiko",{top:["sheer {c} yukata loosely tied and slipping off the shoulders","@primary"],heldItem:["teacup"]},"poised, self-assured smile","kneeling to pour tea"],
    crow:["dramatic dark-lord poser",{top:["{c} gothic lace micro dress with a corset bodice","@primary"],eyewear:["{c} eyepatch","@secondary"],wristAccessory:["bandage wrapped around one forearm","-"],legwear:["{c} lace-up platform boots","@secondary"]},"dramatic smirk behind one hand","striking a dramatic pose, one hand splayed over her eye"]};
  it("bottom",["{c} micro pleated skirt"],"US");it("gloves",["long satin opera gloves"],"CU");
  set("Academy Waifus","Academy Cosplay","waifu","waifu","costume",{tags:["waifu","anime girlfriend"],oname:"Waifu",
    must:must("a cozy anime bedroom with soft window light")},
    H.map(h=>{const[a,items,e,p,c]=W[h];Object.keys(items).forEach(k=>items[k]==null&&delete items[k]);
      return[h,items,e,p,`a ${a} waifu`,{c:c||{},more:[LING]}]}));
  const WT={griffin:["tsundere"],badger:["deredere","naked apron"],raven:["kuudere","dress shirt"],serpent:["yandere"],wolf:["gamer girl"],swan:["ojou-sama"],dragon:["himedere","princess"],
    stag:["dandere"],shark:["gyaru"],penguin:["kotatsu","oversized sweater"],fox:["onee-san"],lovebird:["deredere"],flamingo:["gyaru"],kraken:["goth"],salmon:["yamato nadeshiko"],crow:["eyepatch","gothic"]};
  /* each archetype's tag, and settings that match her */
  const WM={badger:"a sunny newlywed kitchen with a pot on the stove",serpent:"a dim bedroom with a wall of pinned photos and a single candle",wolf:"a gamer's room lit by RGB lights and monitors",
    swan:"a gilded mansion drawing room",dragon:"a throne room with velvet drapes",stag:"a cozy library nook with stacked books",shark:"a neon shopping street at night",
    penguin:"a cozy room with a quilted kotatsu, warm string lights and a big window full of falling snow",fox:"a dim lounge bar with warm lamplight",lovebird:"a bedroom scattered with rose petals and heart balloons",
    flamingo:"a pastel shopping mall",kraken:"a candlelit gothic bedroom",salmon:"a tatami room opening onto a garden at dusk",crow:"a moonlit rooftop with a crescent moon behind her"};
  Object.entries(WM).forEach(([h,s])=>setMust(h+"waifu",s));
  H.forEach(h=>{const t=tplById(h+"waifu");if(t)t.tags=["waifu","anime girlfriend"].concat(WT[h]||[])});

  /* ======================= Prehistoric ======================= */
  op(["standing with one foot on a boulder, spear planted","crouching by a campfire","holding a torch aloft at a cave mouth","leaning on a bone club over her shoulder","striding through tall ferns",
    "standing in the snow with a torch, fur cape blowing"]);
  it("top",["{c} fur bikini top tied with leather cord"],"US");it("bottom",["{c} fur loincloth on a leather thong"],"US");
  it("neckAccessory",["bone-and-tooth necklace","shark-tooth necklace","claw necklace"],"CU");it("wristAccessory",["leather wrist wraps"],"CU");
  it("legwear",["{c} fur leg wraps","leather ankle cords on bare feet"],"CU");
  it("shoulderPiece",["lion pelt draped over one shoulder","badger pelt draped over one shoulder","black feather mantle","snakeskin shoulder wrap","wolf pelt worn as a hood and cape","white feather mantle",
    "scaled hide shoulder wrap","deer hide draped over one shoulder","sharkskin shoulder wrap","thick white fur cape","fox pelt draped over one shoulder","bright feather mantle","pink feather mantle",
    "octopus-ink painted hide wrap","fish-scale hide wrap","black feather mantle with a crow skull clasp"],"CU");
  it("heldItem",["flint spear","bone club","lit torch","stone axe","bone fishing spear"],"CU");
  it("top",["{c} hide wrap barely tied across the bust"],"L","costume,boudoir");
  const PR={griffin:["lion pelt draped over one shoulder","flint spear","standing with one foot on a boulder, spear planted"],badger:["badger pelt draped over one shoulder","stone axe","crouching by a campfire"],
    raven:["black feather mantle","lit torch","holding a torch aloft at a cave mouth"],serpent:["snakeskin shoulder wrap","flint spear","leaning on a bone club over her shoulder"],
    wolf:["wolf pelt worn as a hood and cape","flint spear","striding through tall ferns"],swan:["white feather mantle","lit torch","holding a torch aloft at a cave mouth"],
    dragon:["scaled hide shoulder wrap","bone club","leaning on a bone club over her shoulder"],stag:["deer hide draped over one shoulder","flint spear","striding through tall ferns"],
    shark:["sharkskin shoulder wrap","bone fishing spear","standing with one foot on a boulder, spear planted"],penguin:["thick white fur cape","lit torch","standing in the snow with a torch, fur cape blowing"],
    fox:["fox pelt draped over one shoulder","stone axe","crouching by a campfire"],lovebird:["bright feather mantle","flint spear","striding through tall ferns"],
    flamingo:["pink feather mantle","bone fishing spear","standing with one foot on a boulder, spear planted"],kraken:["octopus-ink painted hide wrap","bone club","crouching by a campfire"],
    salmon:["fish-scale hide wrap","bone fishing spear","standing with one foot on a boulder, spear planted"],crow:["black feather mantle with a crow skull clasp","lit torch","holding a torch aloft at a cave mouth"]};
  const PEX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"dreamy expression",shark:"playful fanged grin",penguin:"determined expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression"};
  set("Academy Prehistoric","Academy Monster Girls","cave","cavewoman","costume",{tags:["cavewoman","prehistoric","fur bikini"],oname:"Cavewoman",
    c:{skinFinish:"sun-kissed skin with a dewy glow",markings:"tribal markings over the shoulders"},
    must:must("a prehistoric jungle of giant ferns with a smoking volcano and long-necked dinosaurs in the distance")},
    H.map(h=>[h,{top:["{c} fur bikini top tied with leather cord","@primary"],bottom:["{c} fur loincloth on a leather thong","@secondary"],
      shoulderPiece:[PR[h][0],"-"],neckAccessory:[h==="shark"?"shark-tooth necklace":h==="griffin"||h==="wolf"?"claw necklace":"bone-and-tooth necklace","-"],
      wristAccessory:["leather wrist wraps","-"],legwear:h==="penguin"?["{c} fur leg wraps","@secondary"]:["leather ankle cords on bare feet","-"],heldItem:[PR[h][1]]},
      PEX[h],PR[h][2],"a sexy cavewoman",
      {c:h==="penguin"?{skinFinish:"dewy skin",markings:"tribal markings across the cheeks"}:{},
       more:[{oname:"Firelight",look:"boudoir",items:{top:["{c} hide wrap barely tied across the bust","@primary"],bottom:["{c} fur loincloth on a leather thong","@secondary"],
        neckAccessory:["bone-and-tooth necklace","-"]}}]}]));
  setMust("penguincave","an ice-age tundra at dusk, snow drifting across the plain and a woolly mammoth herd behind her");
  setMust("ravencave","a firelit cave mouth with ochre hand paintings on the rock walls");
  setMust("swancave","a firelit cave mouth with ochre hand paintings on the rock walls");
  setMust("crowcave","a firelit cave mouth with ochre hand paintings on the rock walls");
  setMust("badgercave","a campfire in a rocky hollow under a starry prehistoric sky");
  setMust("foxcave","a campfire in a rocky hollow under a starry prehistoric sky");
  setMust("krakencave","a campfire on a prehistoric beach with ammonite shells in the sand");
  setMust("sharkcave","a prehistoric lagoon with a plesiosaur's neck rising from the water");
  setMust("salmoncave","a roaring prehistoric river with salmon leaping up the falls");

  /* ======================= Aliens ======================= */
  op(["floating weightless with her hair drifting","stepping off a landing ramp","reaching out with a glowing palm","posing atop a crystal spire","standing on the ice under a ringed planet"]);
  it("top",["{c} metallic micro bodysuit with {c2} glowing seams and deep cutouts"],"US","cyber");it("legwear",["{c} glossy thigh-high space boots"],"CU","cyber");
  it("neckAccessory",["{c} sleek collar with a glowing gem"],"CU","cyber");it("gloves",["{c} glossy long gloves"],"CU","cyber");
  it("headwear",["{c} sleek circlet with a glowing gem"],"CU","cyber");it("heldItem",["ray gun","glowing crystal orb"],"CU","cyber");
  it("bra",["{c} holographic micro bikini top"],"L","cyber,boudoir");it("panties",["{c} holographic micro bikini bottoms"],"L","cyber,boudoir");
  /* skin tone, markings and features per house */
  const AL={griffin:[{skinTone:"champagne gold",undertone:"divine gold",markings:"sun sigils over the shoulders",pupilStyle:"glowing pupils"},"stepping off a landing ramp"],
    badger:[{skinTone:"lavender",markings:"constellations around the eyes",earStyle:"slightly pointed ears"},"reaching out with a glowing palm"],
    raven:[{skinTone:"cosmic violet",undertone:"cosmic",markings:"galaxy speckles scattered over the body",irisDetail:"galaxy-like iris pattern"},"floating weightless with her hair drifting"],
    serpent:[{skinTone:"jade green",markings:"scales along the neck",pupilStyle:"vertical slit pupils"},"posing atop a crystal spire"],
    wolf:[{skinTone:"starlight silver",undertone:"silvery",markings:"glowing circuitry lines down the arms",earStyle:"long pointed elf ears"},"stepping off a landing ramp"],
    swan:[{skinTone:"pearl white",undertone:"pearl",markings:"stars across the collarbones",auraStyle:"starlight aura"},"floating weightless with her hair drifting"],
    dragon:[{skinTone:"infernal crimson",undertone:"ember-like",markings:"lightning-shaped marks down the arms",hornStyle:"short curved horns"},"posing atop a crystal spire"],
    stag:[{skinTone:"seafoam green",markings:"vines down the arms",hornStyle:"feathery moth antennae"},"reaching out with a glowing palm"],
    shark:[{skinTone:"cerulean blue",markings:"wave patterns down the arms",earStyle:"fin-like ears",fangClawStyle:"sharp shark teeth"},"stepping off a landing ramp"],
    penguin:[{skinTone:"celestial blue",undertone:"lunar",markings:"frost patterns across the cheeks",irisDetail:"crystalline facets",skinFinish:"crystalline skin shimmer"},"standing on the ice under a ringed planet"],
    fox:[{skinTone:"aurora-shifting",undertone:"aurora",markings:"glowing runes along the neck",pupilStyle:"star pupils"},"reaching out with a glowing palm"],
    lovebird:[{skinTone:"rose quartz",markings:"stars across the cheeks",hornStyle:"thin insect antennae",pupilStyle:"heart pupils"},"floating weightless with her hair drifting"],
    flamingo:[{skinTone:"soft pink",undertone:"iridescent",markings:"pearls across the collarbones",earStyle:"fae pointed ears"},"posing atop a crystal spire"],
    kraken:[{skinTone:"cosmic violet",markings:"glowing runes over the shoulders",earStyle:"feathery external gills",pupilStyle:"horizontal pupils"},"floating weightless with her hair drifting"],
    salmon:[{skinTone:"rose quartz",undertone:"pearl",markings:"mermaid scales along the neck",earStyle:"fin-like ears"},"stepping off a landing ramp"],
    crow:[{skinTone:"ashen gray",undertone:"silvery",markings:"celestial sigils down the arms",pupilStyle:"crescent moon pupils"},"posing atop a crystal spire"]};
  const AEX=Object.assign({},PEX,{penguin:"bright cheerful expression",dragon:"smirk"});
  set("Academy Aliens","Academy Prehistoric","alien","alien","cyber",{tags:["alien girl","colored skin","science fiction"],oname:"Space suit",c:{skinFinish:"soft opalescent sheen"},
    must:must("an alien planet with crystal spires, glowing flora and two moons in a violet sky")},
    H.map(h=>[h,{top:["{c} metallic micro bodysuit with {c2} glowing seams and deep cutouts","@primary",null,"@accent"],legwear:["{c} glossy thigh-high space boots","@secondary"],
      gloves:["{c} glossy long gloves","@secondary"],neckAccessory:["{c} sleek collar with a glowing gem","@accent"],heldItem:[h==="dragon"||h==="shark"||h==="wolf"?"ray gun":"glowing crystal orb"]},
      AEX[h],AL[h][1],"a sexy alien",
      {c:AL[h][0],more:[{oname:"Off duty",look:"boudoir",items:{bra:["{c} holographic micro bikini top","@primary"],panties:["{c} holographic micro bikini bottoms","@primary"],
        headwear:["{c} sleek circlet with a glowing gem","@accent"]}}]}]));
  setMust("penguinalien","a frozen alien moon of blue ice spires, a huge ringed planet filling the sky and snow-like crystals drifting down");
  setMust("ravenalien","the starlit observation deck of a spaceship with a nebula outside the window");
  setMust("swanalien","the starlit observation deck of a spaceship with a nebula outside the window");
  setMust("krakenalien","an alien ocean world with bioluminescent tide pools under three moons");
  setMust("sharkalien","an alien ocean world with bioluminescent tide pools under three moons");
  setMust("griffinalien","a sleek spaceship landing ramp lowered onto a golden desert planet");
  setMust("wolfalien","a sleek spaceship landing ramp lowered onto a golden desert planet");
  setMust("salmonalien","a sleek spaceship landing ramp lowered onto a golden desert planet");

  /* ======================= Corporate ======================= */
  ex(["cool, appraising stare over her glasses"],"Sultry (adult)");
  op(["sitting on the edge of a desk, legs crossed","leaning over a desk on both palms","leaning back in an executive chair, heels on the desk","leaning against the elevator wall",
    "standing at a floor-to-ceiling window, coffee in hand","adjusting her glasses with one finger"]);
  it("top",["{c} silk blouse unbuttoned to show a {c2} lace bra","{c} silk blouse open over a {c2} lace bra"],"US","preppy");
  it("bottom",["{c} pencil skirt with a high back slit","{c} pencil skirt hiked up over a {c2} garter belt"],"US","preppy");
  it("legwear",["sheer black tights and stiletto heels","sheer {c} thigh-high stockings with garter straps"],"US","preppy");
  it("outerwear",["{c} cropped blazer with the sleeves pushed up"],"CU","preppy");it("eyewear",["{c} thin-framed glasses"],"CU","preppy");
  it("neckAccessory",["{c} lanyard with an ID badge","pearl necklace"],"CU","preppy");
  it("heldItem",["tablet","coffee cup","clipboard","fountain pen","stack of files"],"CU","preppy");
  const CO={griffin:["CEO","leaning back in an executive chair, heels on the desk","confident smile","fountain pen"],badger:["receptionist","leaning over a desk on both palms","bubbly open-mouthed grin","coffee cup"],
    raven:["executive assistant","adjusting her glasses with one finger","cool, appraising stare over her glasses","tablet"],serpent:["corporate lawyer","sitting on the edge of a desk, legs crossed","smirk","stack of files"],
    wolf:["sales manager","leaning over a desk on both palms","playful fanged grin","tablet"],swan:["HR director","sitting on the edge of a desk, legs crossed","serene expression","clipboard"],
    dragon:["chief financial officer","standing at a floor-to-ceiling window, coffee in hand","fierce, battle-ready glare","coffee cup"],stag:["new intern","leaning against the elevator wall","slightly shy expression","stack of files"],
    shark:["hostile-takeover consultant","leaning over a desk on both palms","playful fanged grin","fountain pen"],penguin:["night-shift analyst","standing at a floor-to-ceiling window, coffee in hand","bright cheerful expression","coffee cup"],
    fox:["marketing director","sitting on the edge of a desk, legs crossed","sly, fox-like smirk","tablet"],lovebird:["event planner","leaning against the elevator wall","sparkling-eyed excited expression","clipboard"],
    flamingo:["brand ambassador","standing at a floor-to-ceiling window, coffee in hand","serene expression","coffee cup"],kraken:["IT security chief","adjusting her glasses with one finger","cool, otherworldly half-smile","tablet"],
    salmon:["chief operating officer","leaning back in an executive chair, heels on the desk","poised, self-assured smile","fountain pen"],crow:["office gossip","leaning against the elevator wall","mischievous expression","coffee cup"]};
  const GLASSES=["raven","stag","kraken","swan","penguin","serpent"];
  set("Academy Corporate","Academy Cafe Maids","corporate","office lady","preppy",{tags:["office lady","pencil skirt","business attire"],oname:"Office",
    must:must("a glass-walled corner office high above a city skyline")},
    H.map(h=>{const items={top:["{c} silk blouse unbuttoned to show a {c2} lace bra","@secondary",null,"@primary"],bottom:["{c} pencil skirt with a high back slit","@primary"],
      legwear:["sheer black tights and stiletto heels","black"],heldItem:[CO[h][3]]};
      if(GLASSES.includes(h))items.eyewear=["{c} thin-framed glasses","@accent"];
      if(["griffin","dragon","salmon","serpent","fox"].includes(h))items.outerwear=["{c} cropped blazer with the sleeves pushed up","@primary"];
      else items.neckAccessory=["{c} lanyard with an ID badge","@accent"];
      return[h,items,CO[h][2],CO[h][1],`a sexy ${CO[h][0]}`,{more:[{oname:"After hours",look:"boudoir",items:{top:["{c} silk blouse open over a {c2} lace bra","@secondary",null,"@primary"],
        bottom:["{c} pencil skirt hiked up over a {c2} garter belt","@primary",null,"black"],legwear:["sheer {c} thigh-high stockings with garter straps","black"]}}]}]}));
  setMust("penguincorporate","a quiet corner office late at night, snow falling past floor-to-ceiling windows over a glittering city and a steaming mug on the desk");
  setMust("badgercorporate","a bright modern lobby reception desk with a logo wall behind her");
  ["stag","lovebird","crow"].forEach(h=>setMust(h+"corporate","a mirrored office elevator with brushed steel doors"));
  H.forEach(h=>{const t=tplById(h+"corporate");if(t)t.name=ACAD.cap(h)+" "+CO[h][0]});
})();

/* ---- v162: "Academy Anal" and "Academy Bound and Gagged". Two-panel explicit pair scenes, one per girl, with her Academy Men
   boyfriend, built like the Kink Club (adult women, age "woman", own base, Scene tab, Nude outfits, held back by the safeguard).
   Both are written as eager and consensual: in Anal she asks for it and guides him in; in Bound and Gagged she chose the scene,
   holds a small silver bell she can drop to stop (and never does), and nods and smiles around the gag. No fear, tears or pain. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const dedupe=s=>[...new Set(s.split(", "))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const build=(label,after,suf,nameSuf,rows,scene,act,tags,c1base,ahe,pc,blurb)=>{
    START.option("expression",ahe,G);
    const by={};rows.forEach(r=>{by[r[0]]=r;START.option("posture",r[3],G)});
    START.add(label,ACAD.HOUSES.filter(h=>by[h]).map(h=>{const r=by[h],m=h+"man",mt=tplById(m);
      const c1=Object.assign({},c1base,{expression:ahe,posture:r[3]});
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:m,outfit:nudeAt(m),scene:scene(r),act:act+", "+r[5],dir:"ba",explicit:true,penis:true,
            pc:{expression:pc,posture:null},c1,compact:false,fit:true}},
        tags:tags.concat([h]),
        blurb:blurb(r,mt?mt.name:cap(h)+" boyfriend")};
    }),{after});
  };

  /* ======================= Anal ======================= */
  /* [house, place, panel 1, posture, panel 2, acts, line 1, line 2, tags] */
  const A=[
["griffin","a trophy-lined captain's suite","bends over the arm of a leather couch and spreads her cheeks with both hands, a glistening jeweled plug in her ass, looking back with a cocky grin as she dares {partner} to take it out","bent over a couch arm, spreading herself","{partner} pulls the plug and slides into her ass as she pushes back to meet {him}, her cocky grin melting into bliss","bent over, spread ass, butt plug, sex from behind","Think you can handle this?♡","IT'S SO DEEP... DON'T STOP♡","jeweled butt plug, couch, spread ass, looking back, trophies"],
["badger","a cozy burrow-like bedroom full of pillows","lies on her side in a nest of pillows, slicking {partner}'s {cock} with lube and blushing as she guides it between her cheeks, whispering that she's been wanting this all day","lying on her side in a nest of pillows","{partner} spoons her from behind and slowly sinks all the way into her ass, holding her close as she squeals and squeezes a pillow","spooning, side-lying, lube, sex from behind","Go slow... okay, now deeper♡","IT'S ALL THE WAY IN♡","pillows, spooning, lube, lube bottle, cozy"],
["raven","an observatory dome under the stars","kneels on a star-chart rug with her face pressed to the floor and her ass high, reaching back to spread herself and coolly telling {partner} she's ready","face-down, ass up on a star-chart rug","{partner} grips her hips and takes her ass in a deep prone bone as the stars wheel overhead, her composure scattering","face down ass up, top-down bottom-up, sex from behind","I've thought about this. Do it♡","I SEE STARS♡","observatory, telescope, star chart, night sky, face down ass up"],
["serpent","a velvet-draped boudoir lit with green candles","straddles {partner} facing away from {him}, lowering herself onto {his} {cock} with a slow, smug smile and taking every inch into her ass","riding reverse cowgirl, sinking down slowly","she rides {partner}'s {cock} with her ass in reverse cowgirl, bouncing hard, her smug smile melting into a drooling ahegao","reverse cowgirl, girl on top, anal riding","Watch me take all of it♡","IT'S MY FAVORITE♡","reverse cowgirl, girl on top, candles, velvet, green theme"],
["wolf","a moonlit cabin with the door open to the forest","crouches on all fours on a fur rug, wagging her hips and howling with laughter as she begs {partner} to breed her ass","on all fours on a fur rug, hips raised","{partner} mounts her doggystyle and pounds her ass, her playful howls turning into breathless moans","doggystyle, all fours, sex from behind","Come on, I'm ready♡","AWOOO... FILL IT♡","doggystyle, fur rug, cabin, full moon, all fours"],
["swan","a ballet studio with a wall of mirrors","lifts one leg straight up against {partner}'s shoulder in a standing split at the barre, slowly guiding {his} {cock} into her ass","in a standing split at the barre, one leg on his shoulder","{partner} fucks her ass in the standing split, her pointed foot trembling beside {his} head, both of them watching in the mirror","standing split, leg up, standing sex, mirror","Gently... I'm ready♡","SO DEEP... DON'T STOP♡","ballet barre, mirror, standing split, pointe shoes, leg up"],
["dragon","a treasure hoard cavern of gold coins","sprawls on her back in a pile of gold coins with her legs pulled back to her chest, smirking as she orders {partner} to take her ass","on her back in gold coins, legs pulled back","{partner} takes her ass in a deep mating press on the gold, coins spilling everywhere as her bratty orders turn into begging","mating press, legs up, missionary","Claim your treasure♡","HARDER... IT'S YOURS♡","gold coins, treasure hoard, mating press, legs up, cavern"],
["stag","a sunlit glade in an ancient forest","kneels in the wildflowers with her ass raised, looking back shyly and nodding as {partner} pours lube over her","kneeling in wildflowers, ass raised","{partner} slowly sinks into her ass from behind in the flowers, dappled sunlight on her back, petals clinging to her sweaty skin","sex from behind, outdoor, lube","Be gentle with me♡","I'M SO FULL♡","wildflowers, forest, outdoor, sunlight, petals, nature"],
["shark","a beach-house shower with glass walls","presses her chest against the steamy glass, twin ponytails dripping, reaching back to spread her cheeks with a toothy grin","pressed against shower glass, reaching back","{partner} fucks her ass against the glass, her breasts squished flat and her toothy grin turning into a drooling ahegao","against glass, shower, standing sex, sex from behind, breasts on glass","Bite-sized? I can take more♡","CHOMP... DEEPER♡","shower, steam, glass, breasts against glass, wet, twin tails"],
["penguin","a hot tub on a snowy cabin deck under a green aurora","sits on the edge of the steaming hot tub in the snowfall, cheeks pink, and turns around to lean over the rim, telling {partner} she's warmed up and ready","leaning over the edge of a steaming hot tub in the snow","{partner} takes her ass from behind in the steaming water, snowflakes melting on her flushed back as the aurora glows above them","hot tub, sex from behind, outdoor, partially submerged","I'm warm enough now... please♡","SO HOT INSIDE♡","hot tub, steam, snow, snowing, aurora, night, wet"],
["fox","a lantern-lit shrine room","kneels on a cushion with her hips tilted up, a fluffy fox-tail plug in her ass, wagging it at {partner} with a sly look over her shoulder","kneeling on a cushion, tail plug wagging","{partner} swaps the tail plug for {his} {cock} and fucks her ass from behind, the tail tossed aside and her sly smirk long gone","tail plug, butt plug, sex from behind, prone","Want to swap it for the real thing?♡","I WAS RIGHT... IT'S BETTER♡","fox tail plug, tail plug, lanterns, shrine, cushion"],
["lovebird","a bedroom strewn with rose petals and heart balloons","lies on her back, legs spread in a V, heart-shaped plug sparkling in her ass, giggling as she asks {partner} to be her first","on her back in rose petals, legs spread wide","{partner} takes her ass in missionary, gazing into her heart eyes, her legs wrapped around {him} as she squeals with joy","missionary, legs wrapped, first anal","Will you be my first here?♡","I LOVE YOU... I LOVE IT♡","heart plug, rose petals, heart balloons, missionary, romantic"],
["flamingo","a pink-lit poolside cabana","stands on one leg by the pool, the other leg hooked over {partner}'s arm, guiding {his} {cock} to her ass with a dreamy smile","standing on one leg, the other hooked over his arm","{partner} fucks her ass standing up as she balances on one leg, pink light shimmering on the water","standing on one leg, leg lift, standing sex","Balance me♡","I'M WOBBLING... MORE♡","standing on one leg, pool, cabana, pink theme, leg lift"],
["kraken","an aquarium room glowing blue","lies back on a padded bench with her knees pulled up, a tentacle-shaped plug in her ass, calmly asking {partner} to replace it","on her back on a bench, knees pulled up","{partner} pulls the tentacle plug and fucks her ass as fish drift past the glass, her cool otherworldly calm finally cracking","missionary, knees up, sex toy","Something bigger, please♡","DEEPER... DEEPER♡","aquarium, tentacle plug, butt plug, blue theme, fish"],
["salmon","a sushi bar after closing","lies back on the long cypress counter, legs held up by the ankles, a pearl-handled plug in her ass, smiling with poised elegance","on her back on a counter, ankles held up","{partner} fucks her ass on the counter, holding her ankles wide, her poise unraveling with every stroke","legs held up, on counter, missionary","Omakase, please♡","CHEF'S CHOICE... DEEPER♡","sushi bar, counter, pearl plug, butt plug, legs held up"],
["crow","a gothic bedroom with a moon window","perches on top of {partner} in a squatting position, lowering her ass onto {his} {cock} with a mischievous grin","squatting on top of him, sinking down","she bounces on {partner}'s {cock} with her ass, squatting cowgirl, giggling breathlessly","squatting cowgirl, girl on top, anal riding","Caw caw... here I come♡","SO DEEP... I'M BREAKING♡","squatting cowgirl position, girl on top, moon, gothic, window"]];
  const ATAIL="2koma, anal, anal sex, consensual, sex, cum in ass, anal creampie, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat, lube";
  const AAHE="blissful, cross-eyed ahegao with heart eyes and her tongue out";
  build("Academy Anal","Academy Depraved","anal","anal",A,
    ([h,room,p1,pose,p2,acts,q1,q2,tags])=>`The image is split into two scenes in ${room}. In the first scene, the woman eagerly ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her ass with heavy motion lines, and a cross-section shows it stretching her ass as {he} cums deep inside. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, drooling and trembling with pleasure, and cries "${q2}" with hearts, cum leaking from her gaping ass. ${dedupe(ATAIL+", "+acts+", "+tags)}`,
    "anal sex, anal, anal creampie",["anal","explicit","sex","pair"],
    {pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
      nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},AAHE,"dominant, knowing smirk",
    (r,man)=>`She asks for it: ${r[5].split(", ").slice(0,2).join(", ")}, then an anal creampie. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`);
  START.option("expression",AAHE,G);

  /* ======================= Bound and Gagged ======================= */
  /* [house, place, panel 1 (bound and gagged), posture, panel 2 (sex), acts, muffled line 1, muffled line 2, tags] */
  const B=[
["griffin","a captain's quarters with a four-poster bed","is tied spread-eagle to the four bedposts with red silk cords, a ball gag in her mouth, grinning around it and flexing against the cords to show off","tied spread-eagle to a four-poster bed","{partner} fucks her in missionary as she strains happily against the cords, her gagged grin melting","spread eagle, tied to bed, ball gag, missionary","Mmph mmph♡","MMMPH♡♡","four-poster bed, red silk rope, spread eagle, ball gag, drool"],
["badger","a warm cottage bedroom","sits in a soft rope frogtie on a quilt, each thigh bound to its calf, a cloth cleave gag between her lips, giggling and wriggling happily","in a rope frogtie on a quilt","{partner} lays her back and fucks her in the frogtie, her bound legs held open and her muffled giggles turning to moans","frogtie, cleave gag, missionary, legs spread","Hmm-hmm♡","MMMH♡♡","frogtie, rope, quilt, cleave gag, cozy, legs spread"],
["raven","a black-draped study lit by candles","kneels in a black leather armbinder with her arms laced together behind her back, a bit gag in her mouth and a black blindfold over her eyes, calm and expectant","kneeling in an armbinder, blindfolded","{partner} bends her over the desk and fucks her from behind, holding the armbinder's strap like a handle, her blindfolded face slack with pleasure","armbinder, bit gag, blindfold, bent over desk, sex from behind","Mm♡","MMNH♡♡","armbinder, bit gag, blindfold, desk, candles, black leather"],
["serpent","a velvet bedroom lit with green candles","lies in a tight hogtie on black satin sheets, wrists and ankles tied together behind her, a ball gag in her mouth, giving {partner} a smug, satisfied look","in a hogtie on black satin sheets","{partner} unties her ankles and fucks her prone on the satin, her wrists still tied behind her, her smug look dissolving into a gagged ahegao","hogtie, ball gag, prone bone, bound wrists","Mmph♡","MMMMPH♡♡","hogtie, ball gag, black satin, green candles, bound"],
["wolf","a moonlit log cabin","sits with her wrists cuffed behind her in fur-lined leather cuffs, a bone-shaped bit gag in her mouth, wagging her hips and grinning around it","kneeling with wrists cuffed behind her","{partner} fucks her doggystyle holding her cuffed wrists, her happy muffled howls echoing around the cabin","cuffs, bit gag, doggystyle, wrists held","Rrf♡","AWMMPH♡♡","fur-lined cuffs, bit gag, cabin, full moon, doggystyle"],
["swan","a white rehearsal studio","stands in a strict ballet tie, arms bound behind her in white rope and ankles tied together, a white silk cleave gag in her mouth, poised on pointe","standing on pointe, arms tied behind her","{partner} lifts her bound body against the mirror and fucks her standing, her tied ankles hooked around {his} waist","standing sex, against mirror, lifted, cleave gag","Mm♡","MMMN♡♡","white rope, cleave gag, pointe shoes, mirror, white theme"],
["dragon","a red-lit throne room","sits bound to her own throne with crimson rope, arms to the armrests and legs over them, a ball gag in her mouth, smirking defiantly","tied to a throne, legs over the armrests","{partner} fucks her right there on her throne, the ropes creaking, her defiant smirk giving way to rolling eyes","tied to chair, ball gag, legs over armrests, sitting sex","Mmph♡","MMMMPH♡♡","throne, red rope, tied to chair, ball gag, legs spread"],
["stag","a mossy forest glade","stands tied to a birch tree with soft green rope, arms above her head, a leaf-green silk gag in her mouth, gazing at {partner} with soft, trusting eyes","tied to a birch tree, arms above her head","{partner} lifts one of her thighs and fucks her against the tree, fireflies drifting around them as she moans into the gag","tied to tree, arms up, standing sex, cleave gag","Mm-hm♡","MMMH♡♡","tree, forest, green rope, arms up, cleave gag, fireflies"],
["shark","a beach-house bedroom","lies on her back with her wrists tied to her ankles with blue rope, a ring gag holding her toothy mouth open in a grin","on her back, wrists tied to ankles","{partner} fucks her in the tied position, her legs held wide by her own bound wrists, drool running from the ring gag","ring gag, wrists tied to ankles, missionary, legs spread","Ahh♡","AHHHH♡♡","ring gag, blue rope, drool, bed, legs spread"],
["penguin","a snowed-in cabin room by a big frosted window","sits on a white fur rug tied in a soft white rope harness whose diamond pattern looks like snowflakes, her own orange scarf knotted as a cleave gag, hands tied behind her, cheeks pink and eyes bright","sitting on a fur rug in a white rope harness","{partner} lays her back on the fur and fucks her slowly as snow falls past the window, her scarf gag damp and her muffled moans happy","rope harness, cleave gag, missionary, bound arms","Mm♡ mm♡","MMMH♡♡","white rope, karada, scarf gag, fur rug, window, snowing, cozy"],
["fox","a lantern-lit tatami room","kneels in an elaborate red shibari box tie, a silk scarf gag in her mouth, her fox tail swishing as she bats her eyes at {partner}","kneeling in a red shibari box tie","{partner} pushes her shoulders down to the tatami and fucks her from behind, her bound arms trembling as she moans through the silk","shibari, box tie, scarf gag, sex from behind, face down","Mmhm♡","MMMNH♡♡","shibari, red rope, box tie, tatami, lanterns, scarf gag"],
["lovebird","a pink bedroom full of heart pillows","lies on her back with her wrists tied above her head with fluffy pink rope, a heart-shaped ball gag in her mouth, squirming happily","wrists tied above her head with pink rope","{partner} fucks her in missionary, kissing her neck as she wraps her legs around {him} and moans through the heart gag","wrists tied above head, heart ball gag, missionary, legs wrapped","Mmph♡","MMMMH♡♡","pink rope, heart ball gag, heart pillows, wrists tied, pink theme"],
["flamingo","a pink-lit poolside cabana","stands balanced on one leg, the other tied up high to a beam with pink rope, arms bound behind her and a pink ball gag in her mouth","standing on one leg, the other tied up high","{partner} fucks her standing as she balances on one leg, holding her waist to steady her as she drools around the gag","one leg tied up, standing on one leg, ball gag, standing sex","Mmh♡","MMMPH♡♡","one leg up, pink rope, ball gag, cabana, pink theme"],
["kraken","an aquarium room glowing blue","lies wrapped in coils of dark violet rope like tentacles, arms bound and a silicone tentacle-shaped bit gag in her mouth, totally serene","wrapped in violet rope coils on a padded table","{partner} fucks her on the padded table as fish drift past the glass, her serene face finally flushing and slackening","rope bondage, bit gag, missionary","Mm♡","MMNN♡♡","violet rope, bit gag, aquarium, blue theme, coiled rope"],
["salmon","a mirrored photo studio","poses in a polished steel collar and matching wrist cuffs chained to it, a ball gag in her mouth, checking her angle in the mirror with poised satisfaction","posed in a collar with cuffs chained to it","{partner} fucks her from behind in front of the mirrors, her chained hands at her throat and her poise falling apart","collar, cuffs, chain, ball gag, mirror, sex from behind","Mm♡","MMMPH♡♡","steel collar, cuffs, chain, ball gag, mirror, camera flash"],
["crow","a moonlit gothic bedroom","lies tied in a crisscross of silver-gray rope with jewels knotted into it, a lace cleave gag in her mouth, giggling mischievously","tied in jeweled silver rope on the bed","{partner} fucks her slowly on the bed, the jewels in her ropes catching the moonlight, her giggles turning into gagged moans","rope bondage, cleave gag, missionary","Mmhehe♡","MMMMH♡♡","silver rope, jewels, lace gag, moon, gothic, bed"]];
  const BTAIL="2koma, bondage, bound, gagged, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, drooling, trembling, motion lines, speech bubble, sweat";
  const BAHE="blissful gagged ahegao with heart eyes rolling up and drool around the gag";
  START.option("bodyMarkings","faint rope marks on her skin",G);START.option("expression","warm, adoring smile",G);
  build("Academy Bound and Gagged","Academy Anal","bound","bound and gagged",B,
    ([h,room,p1,pose,p2,acts,q1,q2,tags])=>`The image is split into two scenes in ${room}. She asked for tonight's scene herself and holds a small silver bell in her fingers, her signal to stop, which she never drops. In the first scene, the woman ${p1}, nodding eagerly and moaning "${q1}" through the gag. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful gagged ahegao with heart eyes rolling up and drool running around the gag, trembling with pleasure, and moans "${q2}" with hearts, cum overflowing from her vagina. ${dedupe(BTAIL+", "+acts+", "+tags)}`,
    "sex, vaginal, bondage, gag, creampie",["bondage","gag","explicit","sex","pair"],
    {pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
      nippleType:"hard and flushed with arousal",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting",bodyMarkings:"faint rope marks on her skin"},BAHE,"warm, adoring smile",
    (r,man)=>`Her own idea, safety bell in hand: ${r[5].split(", ").slice(0,2).join(", ")}, then a creampie. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`);
})();

/* ---- v163: twenty-one more Academy sets, one girl per house in each, built with a shared helper (ACAD.quick).
   Everyday: Morning After, Night Out, Housewives.   Seasons: Halloween, Christmas, Valentine's.   Sports: Gym Rats, Beach Volleyball.
   Costumes: Nurses, Flight Attendants, Racing Queens, Victorian.   Fantasy and sci-fi: Kunoichi, Mermaids, Succubi, Angels, Elves,
   Cyberpunk, Vampires.   Sensual: Lingerie Try-On, Pregnant.
   Each girl has her set's main outfit, a lewder second outfit and Nude; none are explicit. Penguin gets her own snowy take in
   every set (and Christmas is her centerpiece, with an extra Christmas-sweater outfit). No set uses youth-coded wording
   (the safeguard's word list: "uniform", "babydoll" and the rest are avoided). */
(function(){
  const{set,cap}=ACAD;
  const H=ACAD.HOUSES.slice();
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const setMust=(id,s)=>{const t=tplById(id);if(t)t.out=Object.assign({},t.out,{must:must(s)})};
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression"};
  const SX={griffin:"seductive smile",badger:"biting her lip",raven:"half-lidded sultry gaze",serpent:"come-hither look",wolf:"teasing tongue-out expression",swan:"half-lidded sultry gaze",
    dragon:"smoldering sultry expression",stag:"biting her lip",shark:"teasing tongue-out expression",penguin:"bright cheerful expression",fox:"come-hither look",
    lovebird:"seductive smile",flamingo:"half-lidded sultry gaze",kraken:"cool, otherworldly half-smile",salmon:"seductive smile",crow:"mischievous expression"};
  const reg=(items,tier,fam)=>Object.entries(items||{}).forEach(([f,a])=>{if(a&&a[0])START.item(f,a[0],tier,fam)});
  const clean=o=>{Object.keys(o).forEach(k=>o[k]==null&&delete o[k]);return o};
  /* quick(label, after, suffix, name suffix, look, o)
     o: {tags, oname, must, c, theme, main(h,i), poses[], ex:"sultry"|map, second:{oname, look, items(h,i)}, per:{house:{pose, ex, items, second, c, must, more}}} */
  function quick(label,after,suf,nameSuf,look,o){
    const per=o.per||{},exm=o.ex==="sultry"?SX:(o.ex||EX);
    const rows=H.map((h,i)=>{const p=per[h]||{};
      const items=clean(Object.assign({},o.main(h,i),p.items||{}));reg(items,"US",look);
      const pose=p.pose||o.poses[i%o.poses.length],ex=p.ex||exm[h]||EX[h];
      START.option("posture",pose,"Posture");START.option("expression",ex,"Sultry (adult)");
      const more=[];
      if(o.second){const si=clean(Object.assign({},o.second.items(h,i),p.second||{}));reg(si,"L",(o.second.look||"boudoir")+",boudoir");
        more.push({oname:o.second.oname,look:o.second.look||"boudoir",items:si})}
      (p.more||[]).forEach(m=>{reg(m.items,"US",m.look||look);more.push(m)});
      return[h,items,ex,pose,typeof o.theme==="function"?o.theme(h):o.theme,{c:p.c||{},more}];
    });
    set(label,after,suf,nameSuf,look,{tags:o.tags,oname:o.oname,c:o.c,must:must(o.must)},rows);
    Object.entries(per).forEach(([h,p])=>{if(p.must)setMust(h+suf,p.must)});
  }
  ACAD.quick=quick;
  const cyc=(list,i)=>list[i%list.length];

  /* ======================= Morning After ======================= */
  START.option("expression","sleepy, satisfied smile","Sultry (adult)");
  quick("Academy Morning After","Academy Pajama Day","morning","morning after","boudoir",{tags:["morning","messy hair","after sex","oversized shirt"],oname:"His shirt",
    must:"a sunlit bedroom in the morning with rumpled white sheets",theme:"a morning after in his shirt",ex:Object.fromEntries(H.map(h=>[h,"sleepy, satisfied smile"])),
    main:(h,i)=>({top:["oversized white men's dress shirt, half-buttoned and slipping off one shoulder","white"],panties:["{c} lace panties","@primary"],
      heldItem:i%2?["mug of coffee"]:null}),
    poses:["sitting up in rumpled sheets, stretching","standing at a sunny window with a mug of coffee","lying on her stomach in bed, feet kicked up","leaning in the kitchen doorway, hair a mess"],
    second:{oname:"Bedsheet",items:()=>({top:["white bedsheet wrapped loosely around her body","white"]})},
    per:{penguin:{items:{top:["his oversized {c} knit sweater slipping off one shoulder","@primary"],legwear:["{c} thigh-high knit socks","@secondary"],heldItem:["mug of cocoa"]},
      pose:"sitting up in bed, hugging her knees in his sweater",ex:"bright cheerful expression",must:"a sunlit bedroom on a snowy morning, frost on the window and snow-covered pines outside"}}});

  /* ======================= Night Out ======================= */
  quick("Academy Night Out","Academy Date Night","nightout","night out","glam",{tags:["nightclub","party","mini dress"],oname:"Night out",ex:"sultry",
    must:"a crowded nightclub with neon lights, haze and a glowing bar",theme:"a night out clubbing",
    main:(h,i)=>({top:["{c} sequin bodycon mini dress with a plunging neckline","@primary"],legwear:["{c} strappy stiletto heels","@secondary"],neckAccessory:["{c} thin choker","@accent"],
      heldItem:[cyc(["cocktail glass","sparkly clutch","phone in a glittery case"],i)]}),
    poses:["dancing with her arms up under the strobe lights","leaning on the bar with a cocktail","posing for a mirror selfie in the club bathroom","stepping out of a taxi in heels"],
    second:{oname:"After party",items:()=>({top:["{c} sheer lace bodysuit","@primary"],outerwear:["{c} cropped faux fur jacket worn off the shoulders","@secondary"],legwear:["{c} strappy stiletto heels","@secondary"]})},
    per:{penguin:{items:{outerwear:["{c} cropped faux fur jacket worn off the shoulders","@secondary"]},pose:"leaning on an ice bar with a glowing cocktail",
      must:"a rooftop ice bar at night with ice sculptures, neon lights and snow drifting through the glow"}}});

  /* ======================= Housewives ======================= */
  quick("Academy Housewives","Academy Cooking Club","wife","housewife","cottage",{tags:["housewife","apron","retro"],oname:"Housewife",
    must:"a bright retro suburban kitchen with pastel cabinets",theme:"a retro housewife",
    main:(h,i)=>({top:["{c} fitted wrap dress with a plunging neckline","@primary"],waistAccessory:["{c} frilled half apron","@secondary"],neckAccessory:["pearl necklace","-"],
      legwear:["{c} kitten heels","@secondary"],heldItem:[cyc(["pie in an oven mitt","rolling pin","cocktail shaker","watering can","feather duster"],i)]}),
    poses:["pulling a pie from the oven, hips cocked","watering the roses by the front porch","leaning on the kitchen counter with a cocktail","dusting a shelf on tiptoe in heels"],
    second:{oname:"Home alone",items:()=>({top:["{c} frilled apron over {c2} lace lingerie","@secondary",null,"@primary"],legwear:["{c} kitten heels","@secondary"]})},
    per:{penguin:{items:{heldItem:["tray of fresh cookies"]},pose:"setting a tray of cookies on the counter",
      must:"a cozy kitchen with snow falling outside the window and cookies cooling on the counter"}}});

  /* ======================= Halloween ======================= */
  const HW={
    griffin:["a sexy lion tamer",{top:["{c} corset with a {c2} tailcoat","@primary",null,"@secondary"],headwear:["{c} top hat","@secondary"],bottom:["{c} micro shorts","@secondary"],legwear:["{c} thigh-high boots","@secondary"],heldItem:["coiled whip"]}],
    badger:["a sexy pumpkin",{top:["{c} pumpkin-shaped corset bodysuit with a plunging neckline","@primary"],headwear:["{c} leaf-and-stem headband","@accent"],legwear:["{c} striped thigh-high stockings","@secondary"],heldItem:["jack-o'-lantern bucket"]}],
    raven:["a sexy grim reaper",{top:["{c} sheer hooded robe over a {c2} lace bodysuit","@primary",null,"@secondary"],legwear:["{c} lace-top thigh-high stockings","@secondary"],heldItem:["scythe"]}],
    serpent:["a sexy Cleopatra",{top:["{c} sheer pleated gown with a {c2} jeweled collar","@primary",null,"@accent"],headwear:["{c} cobra headdress","@accent"],wristAccessory:["{c} snake arm cuffs","@accent"]}],
    wolf:["a sexy Red Riding Hood",{top:["{c} corset dress with a ruffled micro skirt","@primary"],outerwear:["{c} hooded riding cape","@primary"],legwear:["{c} thigh-high stockings","@secondary"],heldItem:["wicker picnic basket"]}],
    swan:["a sexy black swan",{top:["black feathered ballet leotard with a plunging neckline","black"],bottom:["black feather tutu","black"],headwear:["black feather headpiece","black"],legwear:["black satin pointe shoes","black"]}],
    dragon:["a sexy knight",{top:["{c} bikini armor with {c2} trim","@primary",null,"@accent"],gloves:["{c} armored gauntlets","@secondary"],legwear:["{c} armored thigh-high greaves","@secondary"],heldItem:["broadsword"]}],
    stag:["a sexy scarecrow",{top:["{c} plaid shirt knotted under the bust","@primary"],bottom:["{c} patched denim micro shorts","@secondary"],headwear:["{c} floppy straw hat","@extra"],heldItem:["bundle of straw"]}],
    shark:["a sexy zombie",{top:["{c} shredded tank top barely hanging on","@primary"],bottom:["{c} torn micro skirt","@secondary"],legwear:["{c} ripped fishnet stockings","@secondary"]}],
    penguin:["a sexy snow queen",{top:["sheer white gown with a plunging neckline and snowflake embroidery","white"],headwear:["{c} crystal crown","@secondary"],outerwear:["{c} long sheer cape","@secondary"],heldItem:["ice scepter"]}],
    fox:["a sexy police officer",{top:["{c} micro police dress with a plunging zip front","@primary"],headwear:["{c} police cap","@primary"],legwear:["{c} thigh-high boots","@primary"],heldItem:["handcuffs"]}],
    lovebird:["a sexy fortune teller",{top:["{c} boho off-shoulder blouse","@secondary"],bottom:["{c} sheer tiered skirt with coin trim","@primary"],headwear:["{c} coin-trimmed headscarf","@accent"],heldItem:["glowing crystal ball"]}],
    flamingo:["a sexy flamingo",{top:["{c} feathered corset bodysuit","@primary"],neckAccessory:["{c} feather boa","@primary"],legwear:["{c} sheer thigh-high stockings","@primary"]}],
    kraken:["a sexy sea witch",{top:["{c} shell bustier","@secondary"],bottom:["{c} tentacle-hem micro skirt","@primary"],neckAccessory:["{c} glowing shell necklace","@accent"],heldItem:["trident"]}],
    salmon:["a sexy cat burglar",{top:["{c} glossy catsuit unzipped to the navel","@secondary"],maskAccessory:["{c} domino mask","@primary"],headwear:["{c} cat-ear headband","@secondary"],heldItem:["sack of stolen loot"]}],
    crow:["a sexy plague doctor",{top:["{c} leather corset over a sheer {c2} blouse","@primary",null,"@secondary"],maskAccessory:["{c} beaked plague doctor mask pushed up on her head","@primary"],headwear:["{c} wide-brim hat","@primary"],heldItem:["cane"]}]};
  quick("Academy Halloween","Academy Festival","halloween","Halloween","costume",{tags:["halloween","costume party","costume"],oname:"Halloween costume",ex:"sultry",
    must:"a haunted house party with jack-o'-lanterns, cobwebs and orange string lights",theme:h=>HW[h][0]+" costume",
    main:h=>HW[h][1],poses:["posing in a doorway with jack-o'-lanterns","sitting on a staircase with cobwebs","dancing at the costume party","peeking around a creaky door"],
    second:{oname:"Costume falling off",items:h=>({bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"],headwear:HW[h][1].headwear||null,legwear:HW[h][1].legwear||null})},
    per:{penguin:{pose:"standing in a frost-covered doorway with an ice scepter",ex:"bright cheerful expression",must:"a frost-covered Halloween party, jack-o'-lanterns glowing in the snow and icicles on the porch"}}});
  START.item("bra","{c} lace bra","L","boudoir");

  /* ======================= Christmas (Penguin's centerpiece) ======================= */
  const XG=["wrapped present with a big bow","candy cane","sprig of mistletoe","string of twinkle lights","tray of gingerbread cookies","mug of cocoa"];
  quick("Academy Christmas","Academy Winter Break","xmas","Christmas","costume",{tags:["christmas","santa costume","holiday"],oname:"Santa",ex:"sultry",
    must:"a cozy living room with a decorated Christmas tree, a crackling fireplace and hung stockings",theme:"a sexy Santa",
    main:(h,i)=>({top:["{c} velvet bra top trimmed with {c2} fur","@primary",null,"white"],bottom:["{c} velvet micro skirt trimmed with {c2} fur","@primary",null,"white"],headwear:["{c} Santa hat","@primary"],
      legwear:["{c} thigh-high stockings with {c2} fur cuffs","@secondary",null,"white"],heldItem:[cyc(XG,i)]}),
    poses:["kneeling by the Christmas tree","sitting on a pile of presents","holding mistletoe overhead with a wink","hanging ornaments on the tree on tiptoe"],
    second:{oname:"Gift-wrapped",items:()=>({top:["{c} satin ribbon wrapped around her body and tied in a big {c2} bow","@primary",null,"@accent"],headwear:["{c} Santa hat","@primary"]})},
    per:{penguin:{items:{heldItem:["wrapped present with a big orange bow"]},pose:"kneeling by the tree, placing a present underneath",ex:"bright cheerful expression",
      must:"a snowy log cabin on Christmas Eve, a huge tree glowing with orange and ice blue lights, snow falling past the window and a fire crackling",
      more:[{oname:"Christmas sweater",look:"casual",items:{top:["oversized {c} knit Christmas sweater with a penguin pattern","@primary"],legwear:["{c} thigh-high knit socks","@secondary"],heldItem:["mug of cocoa","-"]}}]}}});

  /* ======================= Valentine's ======================= */
  quick("Academy Valentine's","Academy Christmas","valentine","Valentine","glam",{tags:["valentine's day","hearts","roses","lingerie"],oname:"Valentine",ex:"sultry",
    must:"a romantic bedroom scattered with rose petals and lit candles",theme:"a Valentine's surprise",
    main:(h,i)=>({top:["{c} heart-cutout lace bodysuit","@primary"],legwear:["{c} sheer thigh-high stockings with heart garters","@secondary"],
      heldItem:[cyc(["heart-shaped box of chocolates","single red rose","love letter sealed with a heart","bouquet of red roses"],i)]}),
    poses:["lying on a bed of rose petals","offering a box of chocolates with both hands","kneeling on the bed, blowing a kiss","sitting on the bed's edge, legs crossed"],
    second:{oname:"Rose petals",items:()=>({bra:["{c} lace bra with heart-shaped cups","@primary"],panties:["{c} heart-back lace panties","@primary"]})},
    per:{lovebird:{pose:"lying on a bed of rose petals, hugging a giant heart pillow",ex:"sparkling-eyed excited expression",must:"a pink bedroom bursting with heart balloons, rose petals and fairy lights"},
      penguin:{items:{heldItem:["two mugs of cocoa topped with heart marshmallows"]},pose:"sitting at a candlelit table by a frosted window",ex:"bright cheerful expression",
        must:"a candlelit table for two by a frosted window, snow falling outside"}}});

  /* ======================= Gym Rats ======================= */
  quick("Academy Gym Rats","Academy Sports Day","gym","gym","sporty",{tags:["gym","workout","sports bra","leggings"],oname:"Workout",
    must:"a bright modern gym with mirrors and weight racks",theme:"a sweaty workout",c:{skinFinish:"wet, sweat-glistening skin"},
    main:(h,i)=>({top:["{c} seamless sports bra","@primary"],bottom:["{c} high-waisted seamless leggings","@secondary"],legwear:["{c} training sneakers","@accent"],
      heldItem:i%3===1?["phone in a glittery case"]:i%3===2?["water bottle"]:null}),
    poses:["squatting with a barbell across her shoulders","taking a mirror selfie mid-workout","stretching in a deep lunge on a yoga mat","resting on a bench, towel around her neck"],
    second:{oname:"Gym selfie",look:"sporty",items:()=>({top:["{c} micro sports bra","@primary"],bottom:["{c} high-cut booty shorts","@secondary"],legwear:["{c} training sneakers","@accent"]})},
    per:{penguin:{pose:"stretching in a deep lunge on a yoga mat",must:"a gym with floor-to-ceiling windows looking out on a snowy mountain"}}});

  /* ======================= Beach Volleyball ======================= */
  quick("Academy Beach Volleyball","Academy Swim Team","volley","beach volleyball","sporty",{tags:["beach volleyball","bikini","beach"],oname:"Volleyball",c:{skinFinish:"sun-kissed skin with a dewy glow"},
    must:"a sunny beach volleyball court with a net and a sparkling ocean",theme:"a beach volleyball player",
    main:()=>({top:["{c} micro sports bikini top","@primary"],bottom:["{c} micro sports bikini bottoms","@primary"],headwear:["{c} sport visor","@secondary"],heldItem:["volleyball"]}),
    poses:["diving for the ball, sand spraying","jumping to spike the ball","crouching in a ready stance","bending over to brush sand off her thighs"],
    second:{oname:"Sandy",items:()=>({top:["{c} string bikini top slipping off","@primary"],bottom:["{c} string bikini bottoms","@primary"]})},
    per:{penguin:{items:{top:["{c} thermal long-sleeve crop top","@primary"],legwear:["{c} knee-high snow boots","@secondary"]},pose:"diving for the ball, snow spraying",
      must:"a snow volleyball court on a frozen lakeshore under a bright winter sun"}}});

  /* ======================= Nurses ======================= */
  quick("Academy Nurses","Academy Cafe Maids","nurse","nurse","costume",{tags:["nurse","nurse cap","latex"],oname:"Nurse",ex:"sultry",
    must:"a clean white hospital exam room",theme:"a nurse",
    main:(h,i)=>({top:["{c} latex nurse dress with a plunging zip front","@primary"],headwear:["{c} nurse cap with a {c2} cross","white",null,"@primary"],
      legwear:["sheer {c} thigh-high stockings with garter straps","white"],neckAccessory:["stethoscope","-"],heldItem:i%2?["clipboard"]:null}),
    poses:["leaning over a hospital bed","checking a pulse with a stethoscope","sitting on an exam table, legs crossed","snapping on a latex glove with a wink"],
    second:{oname:"Night shift",items:()=>({bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"],headwear:["{c} nurse cap with a {c2} cross","white",null,"@primary"]})},
    per:{penguin:{pose:"checking a pulse with a stethoscope",ex:"bright cheerful expression",must:"a cozy ski-patrol first-aid lodge, skis by the door and snow outside the window"}}});

  /* ======================= Flight Attendants ======================= */
  quick("Academy Flight Attendants","Academy Nurses","flight","flight attendant","preppy",{tags:["flight attendant","airplane","pencil skirt"],oname:"Flight attendant",
    must:"a luxury first-class airplane cabin",theme:"a flight attendant",
    main:()=>({top:["{c} fitted blazer dress with a plunging neckline","@primary"],neckAccessory:["{c} silk neck scarf","@accent"],headwear:["{c} pillbox hat","@primary"],
      legwear:["sheer black tights and stiletto heels","black"]}),
    poses:["pushing a drinks cart down the aisle","demonstrating a seatbelt with a wink","leaning in the galley doorway","serving champagne with a bow"],
    second:{oname:"Mile high",items:()=>({top:["{c} silk blouse open over a {c2} lace bra","white",null,"@primary"],bottom:["{c} pencil skirt hiked up over a {c2} garter belt","@primary",null,"black"],
      legwear:["sheer {c} thigh-high stockings with garter straps","black"]})},
    per:{penguin:{pose:"serving champagne with a bow",must:"a jet cabin with a window full of snowy Antarctic mountains far below"}}});

  /* ======================= Racing Queens ======================= */
  quick("Academy Racing Queens","Academy Cosplay","racing","race queen","glam",{tags:["race queen","racing","umbrella"],oname:"Race queen",ex:"sultry",
    must:"a sunny race track pit lane with race cars",theme:"a race queen",
    main:()=>({top:["{c} glossy race queen bodysuit with {c2} racing-stripe panels","@primary",null,"@secondary"],outerwear:["{c} cropped racing jacket","@secondary"],
      legwear:["{c} glossy thigh-high boots","@primary"],heldItem:["race umbrella"]}),
    poses:["holding a race umbrella over her shoulder","posing on the hood of a race car","spraying champagne on the podium","leaning on the pit wall"],
    second:{oname:"Podium",items:()=>({top:["{c} glossy micro tube top","@primary"],bottom:["{c} glossy micro skirt","@secondary"],legwear:["{c} glossy thigh-high boots","@primary"],heldItem:["champagne bottle"]})},
    per:{penguin:{pose:"holding a race umbrella over her shoulder",must:"an ice-racing track on a frozen lake with rally cars and snowbanks"}}});

  /* ======================= Victorian ======================= */
  quick("Academy Victorian","Academy Ballgowns","victorian","Victorian","gothic",{tags:["victorian","corset","gown"],oname:"Victorian gown",
    must:"a gaslit Victorian parlor with velvet drapes",theme:"a Victorian lady",
    main:(h,i)=>({top:["{c} corseted Victorian gown with a plunging neckline and a bustle","@primary"],gloves:["{c} lace gloves","@secondary"],
      headwear:["{c} small tilted top hat with a veil","@secondary"],heldItem:[cyc(["lace parasol","teacup","folding fan"],i)]}),
    poses:["strolling with a lace parasol","sipping tea in a parlor chair","descending a grand staircase","fanning herself by a window"],
    second:{oname:"Undressed",items:()=>({top:["{c} Victorian corset over a sheer {c2} chemise","@primary",null,"white"],legwear:["{c} silk stockings with garters","@secondary"]})},
    per:{penguin:{pose:"strolling with a lace parasol",must:"a snowy Victorian street at dusk with gas lamps and carolers"}}});

  /* ======================= Kunoichi ======================= */
  quick("Academy Kunoichi","Academy Battle Maidens","ninja","kunoichi","costume",{tags:["kunoichi","ninja","fishnets"],oname:"Kunoichi",
    must:"moonlit tiled rooftops of a feudal castle town",theme:"a kunoichi",
    main:(h,i)=>({top:["{c} short sleeveless kimono with a plunging neckline over a fishnet bodysuit","@primary"],waistAccessory:["{c} wide obi sash","@secondary"],
      legwear:["{c} thigh-high tabi boots","@secondary"],gloves:["{c} fingerless arm guards","@secondary"],headwear:["{c} forehead protector headband","@accent"],
      heldItem:[cyc(["kunai","katana","shuriken"],i)]}),
    poses:["crouching on a rooftop under the full moon","leaping between rooftops","drawing a katana in a fighting stance","perched on a castle wall"],
    second:{oname:"Infiltration",look:"costume",items:()=>({top:["{c} fishnet bodysuit","@primary"],waistAccessory:["{c} wide obi sash","@secondary"]})},
    per:{penguin:{pose:"crouching on a snowy temple roof",must:"a snowy mountain temple at night, snow on the tiled roofs"}}});

  /* ======================= Mermaids ======================= */
  quick("Academy Mermaids","Academy Monster Girls","mermaid","mermaid","costume",{tags:["mermaid","mermaid tail","underwater"],oname:"Mermaid",
    c:{bodyForm:"mermaid tail (no legs)",earStyle:"fin-like ears",skinFinish:"pearl-like skin sheen"},
    must:"an underwater coral reef with sunbeams and bubbles",theme:"a mermaid",
    main:(h,i)=>({top:["{c} seashell bikini top strung with pearls","@primary"],headwear:["pearl-and-coral hair crown","-"],heldItem:[cyc(["trident","conch shell","glowing pearl"],i)]}),
    poses:["lounging on a rock in the surf","swimming upward through sunbeams","sitting on the rail of a sunken ship","floating among swaying kelp"],
    second:{oname:"Pearls",items:()=>({top:["strands of pearls draped across her bare chest","-"]})},
    per:{penguin:{pose:"swimming upward through sunbeams",must:"an icy polar sea under floating ice, light filtering through the ice and a seal swimming past"}}});

  /* ======================= Succubi ======================= */
  quick("Academy Succubi","Academy Witches","succubus","succubus","gothic",{tags:["succubus","demon girl","horns","wings"],oname:"Succubus",ex:"sultry",
    c:{hornStyle:"demonic horns",wingStyle:"batlike wings",tailStyle:"heart-tipped demonic tail",auraStyle:"faint demonic aura"},
    must:"an infernal boudoir with glowing pink summoning circles and candles",theme:"a succubus",
    main:()=>({top:["{c} strappy latex harness bodysuit with heart cutouts","@primary"],legwear:["{c} latex thigh-high boots","@primary"],gloves:["{c} latex opera gloves","@primary"],
      neckAccessory:["{c} choker with a heart charm","@accent"]}),
    poses:["lounging on an infernal throne","floating cross-legged above a summoning circle","beckoning with one finger","stretching her wings on a velvet bed"],
    second:{oname:"Summoned",items:()=>({bra:["{c} latex micro bra","@primary"],panties:["{c} latex micro thong","@primary"],legwear:["{c} latex thigh-high boots","@primary"]})},
    per:{penguin:{pose:"lounging on an infernal throne",ex:"seductive smile",must:"the frozen lowest circle of the underworld, blue hellfire glowing on walls of ice"}}});

  /* ======================= Angels ======================= */
  quick("Academy Angels","Academy Succubi","angel","angel","glam",{tags:["angel","halo","wings"],oname:"Angel",
    c:{wingStyle:"large angelic wings",auraStyle:"angelic radiance"},
    must:"a heavenly sky of golden clouds and marble columns",theme:"an angel",
    main:()=>({top:["sheer white chiffon gown slit to the hip","white"],waistAccessory:["{c} sash","@primary"],headwear:["glowing golden halo","-"],legwear:["{c} lace-up gladiator sandals","@accent"]}),
    poses:["descending through the clouds with arms open","kneeling on a cloud in prayer","reclining on marble steps among the clouds","stretching her wings in golden light"],
    second:{oname:"Fallen",items:()=>({top:["sheer black chiffon gown slit to the hip","black"],headwear:["cracked golden halo","-"]})},
    per:{penguin:{pose:"descending through the clouds with arms open",must:"a heaven of snow-white clouds lit by shimmering aurora light"}}});

  /* ======================= Elves ======================= */
  const EL={griffin:["a high elf","golden longbow"],badger:["a hearth elf","wooden ladle"],raven:["a dark elf","obsidian staff"],serpent:["a serpent-priestess elf","jeweled dagger"],
    wolf:["a ranger elf","longbow"],swan:["a moon elf","silver harp"],dragon:["a fire elf","flaming sword"],stag:["a sylvan elf","flowering staff"],shark:["a sea elf","coral spear"],
    penguin:["a snow elf","crystal staff"],fox:["an autumn elf","maple-leaf fan"],lovebird:["a blossom elf","bouquet of blossoms"],flamingo:["a sun elf","golden staff"],
    kraken:["a deep elf","glowing orb"],salmon:["a river elf","fishing spear"],crow:["a shadow elf","curved dagger"]};
  quick("Academy Elves","Academy Mermaids","elf","elf","cottage",{tags:["elf","pointy ears","fantasy"],oname:"Elven gown",c:{earStyle:"long pointed elf ears"},
    must:"an ancient elven forest city of glowing trees and hanging lanterns",theme:h=>EL[h][0],
    main:h=>({top:["{c} sheer elven gown with a plunging neckline and a leaf-trimmed hem","@primary"],headwear:["{c} delicate elven circlet","@accent"],heldItem:[EL[h][1]]}),
    poses:["drawing back a bowstring","standing on a moss-covered root","reaching up to touch a glowing leaf","sitting by a moonlit spring"],
    second:{oname:"Spring bath",items:()=>({top:["{c} sheer silk wrap barely covering her","@primary"],headwear:["{c} delicate elven circlet","@accent"]})},
    per:{griffin:{pose:"drawing back a bowstring"},wolf:{pose:"drawing back a bowstring"},raven:{c:{skinTone:"lavender"}},
      penguin:{pose:"standing on a snowy ice bridge",must:"an elven ice citadel in a snowy pine forest"}}});

  /* ======================= Cyberpunk ======================= */
  quick("Academy Cyberpunk","Academy Aliens","cyber","cyberpunk","cyber",{tags:["cyberpunk","neon","techwear"],oname:"Cyberpunk",ex:"sultry",c:{markings:"glowing circuitry lines down the arms"},
    must:"a rain-soaked cyberpunk city at night full of neon signs and holograms",theme:"a cyberpunk runner",
    main:(h,i)=>({top:["{c} cropped techwear jacket over a {c2} latex bra","@primary",null,"@accent"],bottom:["{c} glossy micro shorts with harness straps","@secondary"],
      legwear:["{c} chunky platform boots","@secondary"],eyewear:["{c} futuristic visor","@accent"],heldItem:[cyc(["neon katana","smart pistol"],i)]}),
    poses:["leaning on a neon sign in the rain","riding a futuristic motorcycle","crouching on a rooftop ledge above neon traffic","hacking a glowing terminal"],
    second:{oname:"Neon bath",items:()=>({top:["{c} holographic mesh bodysuit","@primary"],legwear:["{c} chunky platform boots","@secondary"]})},
    per:{penguin:{pose:"leaning on a neon sign in the snow",must:"a snowy cyberpunk city at night, snow falling through neon holograms"}}});

  /* ======================= Vampires ======================= */
  quick("Academy Vampires","Academy Elves","vampire","vampire","gothic",{tags:["vampire","fangs","gothic"],oname:"Vampire",ex:"sultry",c:{fangClawStyle:"vampire fangs"},
    must:"a gothic castle hall with candelabras and a blood moon in the window",theme:"a vampire countess",
    main:()=>({top:["{c} velvet gown with a plunging neckline and a high slit","@primary"],outerwear:["{c} high-collared cape","@secondary"],gloves:["{c} lace gloves","@secondary"],
      neckAccessory:["{c} velvet choker with a ruby","@secondary"],heldItem:["goblet of wine"]}),
    poses:["lounging on a coffin lid","sipping from a goblet on a throne","standing on a castle balcony under a blood moon","licking a fang with a smile"],
    second:{oname:"The bite",items:()=>({top:["{c} sheer lace slip slipping off the shoulders","@primary"],neckAccessory:["{c} velvet choker with a ruby","@secondary"]})},
    per:{penguin:{pose:"standing on a castle balcony in the snow",must:"a frozen gothic castle on a snowy cliff under a pale moon"}}});

  /* ======================= Lingerie Try-On ======================= */
  quick("Academy Lingerie Try-On","Academy Boudoir","tryon","lingerie try-on","boudoir",{tags:["lingerie","fitting room","mirror"],oname:"First try",ex:"sultry",
    must:"a boutique fitting room with a velvet curtain and a three-way mirror",theme:"a lingerie try-on",
    main:()=>({bra:["{c} lace plunge bra with {c2} trim","@primary",null,"@accent"],panties:["{c} lace thong with {c2} trim","@primary",null,"@accent"],legwear:["{c} sheer thigh-high stockings","@primary"]}),
    poses:["peeking out of the fitting room curtain","checking her reflection in the three-way mirror","turning to look at her butt in the mirror","adjusting a bra strap in the mirror"],
    second:{oname:"Second try",items:()=>({bra:["{c} sheer mesh bra","@secondary"],panties:["{c} sheer mesh panties","@secondary"],waistAccessory:["{c} lace garter belt","@secondary"]})},
    per:{penguin:{pose:"peeking out of the fitting room curtain",must:"a boutique fitting room with a velvet curtain, a three-way mirror and snow-dusted shop windows behind"}}});

  /* ======================= Pregnant ======================= */
  START.option("stomachShape","round, heavily pregnant belly","Body");
  quick("Academy Pregnant","Academy Nude Photoshoot","pregnant","pregnant","boudoir",{tags:["pregnant","maternity","photoshoot"],oname:"Maternity",
    c:{stomachShape:"round, heavily pregnant belly"},
    must:"a soft white maternity photo studio with flowing drapes",theme:"a glowing maternity shoot",
    ex:Object.fromEntries(H.map(h=>[h,"gentle smile"])),
    main:()=>({top:["sheer {c} chiffon maternity gown open over her belly","@primary"],headwear:["{c} flower crown","@accent"]}),
    poses:["cradling her belly with both hands","standing in profile, one hand on her belly","sitting among flowing drapes, hands on her belly"],
    second:{oname:"Maternity lingerie",items:()=>({bra:["{c} lace maternity bra","@primary"],panties:["{c} lace panties","@primary"]})},
    per:{penguin:{pose:"cradling her belly with both hands",ex:"bright cheerful expression",must:"a soft white maternity photo studio with a window onto falling snow"}}});
})();
