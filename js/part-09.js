/* ---- v163: five more explicit two-panel scene sets, one per girl, built like the Kink Club and Anal sets
   (adult women, age "woman", own base, Scene tab, Nude outfits, held back by the safeguard like every explicit scene).
   Shower Sex, Kitchen Counter, Paizuri and Oral Showcase pair her with her Academy Men boyfriend.
   Threesomes pair her with another Academy girl as character 2 (her best friend in the Academy) and their boyfriend,
   who is written into the scene as a faceless man ("2girls, 1boy"). Everything is eager and mutual. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const VAG="flushed, gaping, full of and overflowing with thick white cum, squirting",WET="flushed and glistening with arousal";
  const C1=(vag,more)=>Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:vag},more||{});
  /* rows: [house, place, panel 1, posture, panel 2, acts, line 1, line 2, tags] (+ partner house for threesomes) */
  function build(label,after,suf,nameSuf,rows,o){
    START.option("expression",o.ahe,G);START.option("expression",o.pcEx,G);
    const by={};rows.forEach(r=>{by[r[0]]=r;START.option("posture",r[3],G)});
    START.add(label,ACAD.HOUSES.filter(h=>by[h]).map(h=>{const r=by[h];
      const m=o.partner?ACAD.robes(r[9]):h+"man",mt=tplById(m);
      const c1=C1(o.vag,{expression:o.ahe,posture:r[3]});
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:Object.assign({id:m,outfit:nudeAt(m),scene:o.scene(r),act:o.act+", "+r[5],dir:o.dir||"ba",explicit:true,penis:!o.partner,
            pc:Object.assign({expression:o.pcEx,posture:null},o.partner?{age:"woman"}:{}),c1,compact:false,fit:true},o.count?{count:o.count}:{})},
        tags:o.tags.concat([h],o.partner?[r[9]]:[]),
        blurb:o.blurb(r,mt?mt.name:cap(h)+" boyfriend")};
    }),{after});
  }
  const sc=(lead,tail)=>([h,room,p1,pose,p2,acts,q1,q2,tags])=>lead(room,p1,p2,q1,q2)+" "+dedupe(tail+", "+acts+", "+tags);

  /* ======================= Shower Sex ======================= */
  const SH=[
["griffin","a marble shower with gold fixtures","soaps up her body under the spray, then pulls {partner} in by the wrist with a cocky grin","pinned to the marble shower wall","{partner} lifts her against the marble wall and fucks her under the spray, her legs locked around {him}","against wall, lifted, standing sex, legs wrapped","Get in here♡","DON'T STOP♡","marble, gold fixtures, steam, wet hair"],
["badger","a cozy cottage bathroom with a clawfoot tub shower","giggles under the spray as she lathers bubbles over her huge breasts and presses them against {partner}","bent forward against the tub's edge","{partner} takes her from behind as she braces on the tub's edge, bubbles sliding down her back","sex from behind, bent forward, soap bubbles","Bubble hug♡","SO GOOD♡","clawfoot tub, bubbles, soap, steam"],
["raven","a dark slate rain shower lit by a single candle","stands silently under the rain shower with her eyes closed, then reaches back and draws {partner} to her","pressed against dark slate tiles","{partner} fucks her from behind against the slate tiles, water streaming down her arched back","standing sex, sex from behind, against wall","Stay","I'M MELTING♡","slate, rain shower, candle, dim lighting"],
["serpent","a glass-walled shower in a penthouse","presses her breasts flat against the fogged glass and writes {partner}'s name in the steam with a smirk","pressing her breasts flat on the shower glass","{partner} fucks her against the glass from behind, her breasts squished flat, the city lights blurred behind the fog","against glass, breasts on glass, sex from behind, standing sex","Come and get it♡","HARDER♡","glass shower, fog, city lights, night"],
["wolf","an outdoor cabin shower in the woods","shakes her wet hair like a dog under the outdoor shower, laughing and splashing {partner}","standing with one leg hooked up on a wooden bench","{partner} fucks her standing with one leg hooked up on the wooden bench, birds scattering from the trees","standing sex, leg up, outdoor","Catch me♡","AWOO♡","outdoor shower, forest, wooden planks, sunlight"],
["swan","a white rainfall shower","rinses her hair gracefully in the rainfall, one leg raised in a perfect arabesque against the tiles","in a standing split against the tiles","{partner} holds her leg up in a standing split and fucks her under the rainfall","standing split, leg up, standing sex","Hold my leg♡","DEEPER♡","rainfall shower, white tiles, steam, white theme"],
["dragon","a volcanic stone steam room","sits on the hot stone bench in the billowing steam, legs spread, smirking and crooking a finger at {partner}","straddling him on a hot stone bench","she rides {partner} on the stone bench through the billowing steam, nails digging into {his} shoulders","cowgirl position, girl on top, straddling","On your back♡","MINE... ALL MINE♡","steam room, stone bench, steam, heat"],
["stag","a mossy outdoor waterfall shower","stands under a gentle waterfall among ferns, smiling shyly as {partner} washes her back","lifted against mossy rocks under the falls","{partner} lifts her against the mossy rocks and fucks her under the waterfall, ferns dripping around them","lifted, standing sex, legs wrapped, outdoor","Wash me too♡","I'M FLOATING♡","waterfall, ferns, moss, outdoor, nature"],
["shark","a beach outdoor shower","rinses sand off her body under a beach shower with a toothy grin, bikini strings hanging loose","bent over with her hands on the shower post","{partner} pounds her from behind as she grips the shower post, the ocean sparkling behind them","sex from behind, bent over, outdoor","Rinse me off♡","CHOMP♡","beach shower, sand, ocean, sunlight"],
["penguin","an outdoor hot shower at a snowy lodge","stands under a steaming outdoor shower while snow falls around her, cheeks pink, holding out a hand to {partner}","wrapped around him in steam and falling snow","{partner} holds her close and fucks her under the hot water as snowflakes melt on her shoulders and steam swirls around them","lifted, standing sex, legs wrapped, outdoor","Come warm up with me♡","SO WARM♡","outdoor shower, snow, snowing, steam, night, cabin"],
["fox","a cedar onsen shower corner","kneels on a wooden stool and soaps {partner}'s back, sly fingers sliding lower","on her knees on a wooden stool","she straddles {partner} on the wooden stool and rides {him} slowly, steam curling around her","cowgirl position, straddling, sitting sex","I'll wash everything♡","SO DEEP♡","onsen, wooden stool, cedar, steam"],
["lovebird","a pink-tiled shower full of steam","draws a heart in the fogged mirror and kisses {partner} under the spray","kissing him while lifted against the tiles","{partner} lifts her up and fucks her while they kiss, her legs wrapped around {him} and hearts drawn on the fog","lifted, kissing, standing sex, legs wrapped","Kiss me♡","I LOVE YOU♡","pink tiles, fogged mirror, heart, steam"],
["flamingo","a pink neon spa shower","stands on one leg under the shower, the other leg lifted onto {partner}'s shoulder","on one leg, her other leg on his shoulder","{partner} fucks her standing as she balances on one leg, pink light glittering in the water","standing on one leg, leg up, standing sex","Hold me steady♡","I'M SLIPPING♡","neon, pink theme, shower, water droplets"],
["kraken","an aquarium-walled shower","presses her back to the aquarium glass as fish drift behind her, calmly beckoning","standing with her back to the aquarium glass","{partner} fucks her against the aquarium glass, fish scattering behind her as her calm finally breaks","against glass, standing sex, legs wrapped","Come here","DEEPER♡","aquarium, fish, blue theme, glass"],
["salmon","a sleek black marble shower","poses under the spray like a perfume ad, then turns her head with a poised smile","bent over with her palms on black marble","{partner} grips her hips and fucks her from behind on the black marble, her poise dissolving","sex from behind, bent over, standing sex","Make it artistic♡","HARDER♡","black marble, luxury, steam, rain shower"],
["crow","a gothic bathroom with a moonlit window","giggles under the spray and flicks water at {partner}, then pulls {him} in by the hand","straddling him on the shower floor","she rides {partner} on the shower floor, water raining down on them both","cowgirl position, girl on top, on floor","Got you♡","CAW♡","gothic, moonlight, window, shower"]];
  build("Academy Shower Sex","Academy Public Sex","shower","shower sex",SH,{ahe:"blissful, cross-eyed ahegao with heart eyes and her tongue out",pcEx:"dominant, knowing smirk",vag:VAG,
    act:"sex, vaginal, creampie",tags:["shower","wet","explicit","sex","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}, steam everywhere and water streaming over her skin. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, dripping wet and trembling, and cries "${q2}" with hearts, cum running down her wet thighs.`,
      "2koma, shower, wet, wet hair, water drops, steam, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble"),
    blurb:(r,man)=>`A shower that turns into ${r[5].split(", ").slice(0,2).join(", ")}, then a creampie. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});

  /* ======================= Kitchen Counter ======================= */
  const KC=[
["griffin","a sleek modern kitchen at night","hops up onto the island counter in nothing but an apron, spreading her knees and daring {partner} to skip dinner","sitting on the counter, legs spread","{partner} fucks her right on the island counter, pans rattling, her legs locked around {him}","on counter, sitting sex, legs wrapped, apron","Dinner can wait♡","FORGET DINNER♡","kitchen, island counter, apron, night"],
["badger","a cozy farmhouse kitchen with fresh bread","bends over the floury counter in a frilled apron, wiggling her hips at {partner} with flour on her cheek","bent over a floury counter","{partner} takes her from behind over the floury counter, flour puffing up with every thrust","bent over, sex from behind, apron, flour","Want a taste?♡","KNEAD ME♡","flour, bread, farmhouse kitchen, apron, frills"],
["raven","a dark kitchen lit by the open fridge","sits on the counter in the fridge's cold glow eating a strawberry, holding out a second one to {partner}","sitting on the counter in the fridge light","{partner} fucks her on the counter in the fridge light, strawberries spilled across the counter","on counter, sitting sex, legs spread","Midnight snack?","MORE♡","fridge light, midnight, strawberries, dark kitchen"],
["serpent","a gleaming penthouse kitchen","lounges on the marble counter with a glass of wine, crossing and uncrossing her legs","lying back on marble, legs held up","{partner} pulls her to the counter's edge and fucks her with her legs held up, the wine glass tipping over","on counter, legs up, missionary","You're late♡","FINALLY♡","marble counter, wine glass, penthouse, spilled wine"],
["wolf","a log cabin kitchen with a cast-iron stove","sits on the counter gnawing on a drumstick, grinning and pulling {partner} close with her legs","sitting on the counter, legs locked around him","{partner} fucks her hard on the counter as she wraps her legs around {him} and howls with laughter","on counter, sitting sex, legs wrapped","Hungry?♡","AWOO♡","cabin kitchen, cast iron, food, rustic"],
["swan","an elegant white kitchen","stretches one leg up along the cabinets while stirring a pot, perfectly balanced","in a standing split against the cabinets","{partner} fucks her in a standing split against the cabinets, the pot forgotten","standing split, leg up, standing sex","Stir slowly♡","DEEPER♡","white kitchen, cabinets, leg up, elegant"],
["dragon","a red-tiled kitchen with a flaming wok","flambés a wok with a whoosh of fire, then turns and shoves {partner} back against the fridge","riding him against the fridge","she climbs onto {partner} against the fridge and rides {him} standing, magnets clattering to the floor","standing sex, lifted, legs wrapped","My kitchen, my rules♡","MINE♡","wok, flames, red tiles, fridge"],
["stag","a sunny kitchen full of herbs and flowers","stands at the sink arranging wildflowers, looking over her shoulder and blushing as {partner} hugs her from behind","bent over the farmhouse sink","{partner} takes her from behind at the sink, sunlight streaming over the herbs","sex from behind, bent over, standing sex","Good morning♡","I'M BLOOMING♡","herbs, flowers, sunlight, farmhouse sink"],
["shark","a beach-house kitchen with an ocean view","sits on the counter slurping a popsicle, legs swinging, grinning with sharp teeth","sitting on the counter, legs spread","{partner} fucks her on the counter with the ocean glittering through the window, her popsicle melting down her chest","on counter, sitting sex, legs spread","Bite?♡","CHOMP♡","popsicle, beach house, ocean view, kitchen"],
["penguin","a cabin kitchen on a snowy night","stands on tiptoe stirring a pot of hot cocoa in his sweater, snow falling outside the window, and lifts the spoon for {partner} to taste","sitting on the counter by the snowy window","{partner} lifts her onto the counter by the frosted window and fucks her slowly, cocoa steaming beside them and snow falling outside","on counter, sitting sex, legs wrapped","Taste it♡","SO SWEET♡","cocoa, mug, snowing, window, cabin kitchen, night, warm lighting"],
["fox","a lantern-lit kitchen with paper screens","kneels on the counter in a loose robe, feeding {partner} a dumpling with chopsticks and a sly smile","on all fours on the counter","{partner} fucks her from behind as she kneels on the counter, the robe sliding off her shoulders","sex from behind, all fours, on counter","Open wide♡","YOU'RE MINE♡","lanterns, paper screens, dumplings, chopsticks"],
["lovebird","a pastel kitchen full of heart-shaped cookies","frosts heart-shaped cookies and smears frosting on {partner}'s nose with a giggle","sitting on the counter among cookies","{partner} fucks her on the counter among the cookies, frosting smeared on her breasts","on counter, sitting sex, legs wrapped","Lick it off♡","SWEETER♡","cookies, frosting, hearts, pastel kitchen"],
["flamingo","a tropical kitchen with a cocktail bar","balances on one leg mixing a pink cocktail, the other foot tucked up against her knee","on one leg against the bar","{partner} fucks her standing at the bar as she balances on one leg, cocktail glasses rattling","standing on one leg, standing sex","Shaken or stirred?♡","SHAKEN♡","cocktails, tropical, pink theme, bar"],
["kraken","a sleek black kitchen","sits on the counter slicing sashimi with calm precision, then sets down the knife and opens her knees","lying back on a black counter","{partner} fucks her on the black counter, her calm slipping away with every thrust","on counter, missionary, legs spread","Dessert","MORE♡","black kitchen, sashimi, sleek"],
["salmon","an after-hours sushi bar kitchen","sits on the cypress counter in a chef's jacket left open, legs crossed, poised and waiting","lying back on the cypress counter, ankles held up","{partner} holds her ankles up and fucks her on the cypress counter","on counter, legs up, legs held","Omakase♡","CHEF'S CHOICE♡","sushi bar, cypress counter, chef's jacket"],
["crow","a gothic kitchen with copper pots","perches on the counter swinging her legs, stealing a shiny spoon from the drawer and giggling","sitting on the counter, legs swinging","{partner} fucks her on the counter as copper pots clang above them","on counter, sitting sex, legs wrapped","Shiny♡","CAW♡","copper pots, gothic kitchen, spoon"]];
  build("Academy Kitchen Counter","Academy Shower Sex","kitchen","kitchen counter",KC,{ahe:"blissful, cross-eyed ahegao with heart eyes and her tongue out",pcEx:"dominant, knowing smirk",vag:VAG,
    act:"sex, vaginal, creampie",tags:["kitchen","counter","explicit","sex","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, trembling, and cries "${q2}" with hearts, cum dripping onto the counter.`,
      "2koma, kitchen, kitchen counter, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat"),
    blurb:(r,man)=>`Cooking turns into ${r[5].split(", ").slice(0,2).join(", ")}, then a creampie. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});

  /* ======================= Paizuri ======================= */
  const PZ=[
["griffin","a trophy-lined captain's suite","kneels between {partner}'s legs and squeezes her breasts together with a cocky grin","kneeling, squeezing her breasts together","she wraps her breasts around {partner}'s {cock} and pumps fast, licking the tip each time it pops out","paizuri, licking penis","Bet you can't last♡","SO MUCH♡","kneeling, trophies, between legs"],
["badger","a cozy bedroom piled with pillows","pours warm oil over her enormous breasts, blushing and giggling","kneeling on pillows, oiled breasts in her hands","she smothers {partner}'s {cock} completely in her enormous oiled breasts, bouncing them up and down","paizuri, oil, huge breasts, breast squeeze","All for you♡","IT'S SO HOT♡","oil, oiled, pillows, huge breasts"],
["raven","a dim library nook","unbuttons her blouse slowly, eyes never leaving {partner}","kneeling with her blouse open","she slides {partner}'s {cock} between her breasts with slow, precise strokes, staring up at {him}","paizuri, open shirt, eye contact","Hold still","...MORE♡","library, books, open blouse, dim lighting"],
["serpent","a velvet boudoir","lounges on velvet and lets {partner} kneel over her chest with a smug smile","lying back, breasts pressed together","she squeezes her breasts around {partner}'s {cock} as {he} straddles her chest, smirking up at {him}","paizuri, straddling, lying","You may proceed♡","GOOD BOY♡","velvet, boudoir, green theme, lying on back"],
["wolf","a moonlit cabin","pants playfully on her knees with her tongue out, breasts bouncing","kneeling, tongue out","she pumps {partner}'s {cock} between her breasts, tongue out to catch the tip","paizuri, tongue out","Gimme♡","AWOO♡","cabin, moonlight, kneeling, tongue out"],
["swan","a ballet dressing room","sits gracefully on a bench in only her pointe shoes, cupping her small breasts with a shy smile","sitting on a bench, cupping her breasts","she rubs {partner}'s {cock} between her soft breasts and kisses the tip with perfect poise","paizuri, kissing penis","Is this right?♡","OH MY♡","dressing room, mirror, pointe shoes"],
["dragon","a treasure hoard of gold","sprawls on her gold, pushing her breasts together and demanding tribute","lying on gold, breasts pushed together","she wraps her breasts around {partner}'s {cock} on her pile of gold, pumping hard","paizuri, lying, gold coins","Tribute♡","MORE TREASURE♡","gold coins, treasure, lying on back"],
["stag","a sunlit meadow on a blanket","kneels on a picnic blanket and shyly unties her top","kneeling on a picnic blanket","she squeezes {partner}'s {cock} between her breasts, blushing, petals in her hair","paizuri, outdoor, picnic","Like this?♡","SO WARM♡","meadow, picnic blanket, flowers, outdoor"],
["shark","a beach towel on the sand","grins with sharp teeth as she unties her bikini top","kneeling on a beach towel","she pumps {partner}'s {cock} between her sun-oiled breasts, laughing","paizuri, sunscreen, outdoor","Hold on tight♡","CHOMP♡","beach, towel, bikini, sunscreen"],
["penguin","a snowed-in cabin on a white fur rug by the fire","kneels on the fur rug in the firelight, cheeks pink, pushing her very large breasts together with both hands","kneeling on a fur rug by the fire","she wraps her breasts around {partner}'s {cock} and pumps slowly, firelight dancing on her skin as snow falls past the window","paizuri, kneeling, firelight","Let me warm you up♡","SO MUCH♡","fur rug, fireplace, snowing, window, cabin, firelight"],
["fox","a tatami room","kneels in a slipping robe and teasingly bares one breast at a time","kneeling in a slipping robe","she slides {partner}'s {cock} between her breasts with a sly smile, robe pooled at her waist","paizuri, kimono, robe","Do you want both?♡","GOTCHA♡","tatami, robe, lanterns"],
["lovebird","a bedroom full of hearts","makes a heart with her hands around her breasts and giggles","kneeling with heart hands","she pumps {partner}'s {cock} between her breasts, beaming with love","paizuri, heart hands","Love you♡","LOVE YOU♡","heart hands, hearts, pink theme"],
["flamingo","a pink poolside lounger","lounges on a pink lounger and beckons {partner} closer","lying on a pool lounger","she squeezes {partner}'s {cock} between her breasts on the lounger","paizuri, lying, pool","Come here, cutie♡","OHHH♡","pool, lounger, pink theme"],
["kraken","an aquarium room","sits calmly with her hands resting on her breasts","sitting with her hands on her breasts","she rolls {partner}'s {cock} between her breasts in slow waves","paizuri","Relax","MORE♡","aquarium, blue theme"],
["salmon","a photo studio","poses under the lights, cupping her breasts like a magazine cover","kneeling under studio lights","she pumps {partner}'s {cock} between her breasts while camera flashes go off","paizuri, camera flash","Perfect angle♡","WHAT A SHOT♡","photo studio, camera flash"],
["crow","a gothic bedroom","peeks over her breasts with a mischievous grin","kneeling on the bed, grinning","she squeezes {partner}'s {cock} between her breasts, giggling every time it pokes out","paizuri, kneeling","Peekaboo♡","SO MUCH♡","gothic, bed, moonlight"]];
  build("Academy Paizuri","Academy Kitchen Counter","paizuri","paizuri",PZ,{ahe:"blissful, flushed smile with heart eyes and her tongue out",pcEx:"blissful expression",vag:WET,
    act:"paizuri, cum on breasts, facial",tags:["paizuri","titfuck","explicit","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is squeezed between her breasts with heavy motion lines as {he} cums, spurting thick white cum across her breasts, neck and face. She looks up with a blissful, flushed smile, heart eyes and her tongue out, and cries "${q2}" with hearts, cum dripping off her breasts.`,
      "2koma, paizuri, breasts, cum on breasts, cum on body, facial, ejaculation, heart-shaped pupils, motion lines, speech bubble, sweat, consensual"),
    blurb:(r,man)=>`${r[5].split(", ").slice(0,2).join(", ")}, ending with cum on her breasts and face. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});

  /* ======================= Oral Showcase ======================= */
  /* panel 1: he eats her out; panel 2: she returns the favor, ending with cum in her mouth */
  const OR=[
["griffin","a captain's suite","sits on the edge of the desk with her legs spread over {partner}'s shoulders, gripping {his} hair as {he} eats her out","sitting on a desk, legs over his shoulders","she kneels and deepthroats {partner} with a cocky look","cunnilingus, legs over shoulders, deepthroat","Right there♡","MMMH♡","desk, gripping hair, kneeling"],
["badger","a pillow-piled bedroom","lies back in the pillows with her knees up, squealing as {partner} licks her","lying in pillows, knees up","she kneels and bobs on {partner}'s {cock} with both hands, cheeks bulging","cunnilingus, fellatio, two-handed","Eek! Don't stop♡","MMPH♡","pillows, knees up, bedroom"],
["raven","a candlelit study","sits in a leather armchair with one leg over the armrest, calmly watching {partner} eat her out","in an armchair, one leg over the armrest","she kneels before the armchair and sucks {partner} slowly, eyes locked on {his}","cunnilingus, armchair, fellatio, eye contact","Slower","MMN♡","armchair, candles, study"],
["serpent","a velvet boudoir","sits on {partner}'s face with a smug smile, grinding slowly","sitting on his face","she takes {partner} deep down her throat, smirking up through her lashes","facesitting, cunnilingus, deepthroat","Good boy♡","GLK♡","facesitting, velvet, boudoir"],
["wolf","a cabin by the fire","sprawls on a fur rug with her legs spread wide, howling as {partner} licks her","on her back on a fur rug, legs spread","she licks {partner} from base to tip like a treat, then swallows {him} down","cunnilingus, licking penis, fellatio","Awoo♡","MMMH♡","fur rug, fireplace, cabin"],
["swan","a ballet studio","stands at the barre with one leg up while {partner} kneels and licks her","standing at the barre, leg up","she kneels gracefully and sucks {partner} with delicate care","cunnilingus, standing cunnilingus, leg up, fellatio","Oh♡","MMN♡","ballet barre, mirror, leg up"],
["dragon","a throne room","sits on her throne with her legs over the armrests as {partner} kneels to worship her","on her throne, legs over the armrests","she pins {partner} to the throne and sucks {him} hard","cunnilingus, throne, fellatio","Worship me♡","GLK♡","throne, legs over armrests"],
["stag","a forest glade","lies in the wildflowers, petals in her hair, as {partner} kisses between her thighs","lying in wildflowers","she kneels in the flowers and sucks {partner} shyly","cunnilingus, outdoor, fellatio","So gentle♡","MMH♡","wildflowers, forest, outdoor"],
["shark","a beach at sunset","lies on a towel with her bikini bottoms pulled aside as {partner} licks her","on a beach towel, bikini pulled aside","she sucks {partner} with a toothy grin, careful with her sharp teeth","cunnilingus, bikini aside, fellatio","Careful of my teeth♡","MMPH♡","beach, sunset, towel, bikini"],
["penguin","a snowy cabin by the fire","lies back on a white fur rug wrapped in a blanket, cheeks pink, as {partner} disappears beneath it between her thighs","lying under a blanket on a fur rug","she sits up in the blanket and sucks {partner} slowly by the firelight, snow falling past the window","cunnilingus, under blanket, fellatio","It's warm under here♡","MMH♡","fur rug, blanket, fireplace, snowing, window, cabin"],
["fox","a tatami room","kneels on all fours as {partner} licks her from behind","on all fours on the tatami","she turns around and sucks {partner} with a sly smile","cunnilingus from behind, fellatio","Lick it all♡","MMM♡","tatami, all fours, lanterns"],
["lovebird","a heart-filled bedroom","lies on her back hugging a heart pillow as {partner} licks her","on her back hugging a heart pillow","she sucks {partner} lovingly, making a heart with her hands","cunnilingus, fellatio, heart hands","I love you♡","MMH♡","heart pillow, hearts, pink theme"],
["flamingo","a pink poolside cabana","stands on one leg with the other draped over {partner}'s shoulder as {he} licks her","standing on one leg, the other over his shoulder","she kneels by the pool and sucks {partner}","cunnilingus, standing on one leg, fellatio","Don't let me fall♡","MMH♡","cabana, pool, pink theme"],
["kraken","an aquarium room","lies on a padded bench with her knees apart as {partner} licks her","lying on a padded bench","she sucks {partner} with a calm, hypnotic rhythm","cunnilingus, fellatio","Deeper","MMN♡","aquarium, blue theme"],
["salmon","a sushi bar after closing","sits on the cypress counter with her knees apart as {partner} licks her","sitting on the counter, knees apart","she kneels on the counter and sucks {partner} elegantly","cunnilingus, on counter, fellatio","Itadakimasu♡","MMH♡","sushi bar, counter"],
["crow","a moonlit gothic bedroom","lies upside down off the edge of the bed, giggling as {partner} licks her","lying upside down off the bed","she takes {partner} deep from upside down off the edge of the bed","cunnilingus, upside-down, deepthroat","Hehe♡","GLK♡","gothic, moonlight, bed"]];
  build("Academy Oral Showcase","Academy Paizuri","oral","oral",OR,{ahe:"blissful, flushed expression with heart eyes",pcEx:"blissful expression",vag:WET,
    act:"cunnilingus, fellatio, cum in mouth",tags:["oral","cunnilingus","fellatio","explicit","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, moaning "${q1}" with a heart and squirting. In the second scene, ${p2}. {His} thick, veiny {cock} fills her mouth with heavy motion lines as {he} cums, her cheeks bulging with thick white cum. She looks up with heart eyes, drool and cum dripping from her lips, and moans "${q2}" with hearts.`,
      "2koma, oral, cunnilingus, fellatio, cum in mouth, cum on tongue, squirting, heart-shaped pupils, drooling, motion lines, speech bubble, sweat, consensual"),
    blurb:(r,man)=>`He goes down on her, then she returns the favor: ${r[5].split(", ").slice(0,2).join(", ")}. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});

  /* ======================= Threesomes (two Academy girls and a faceless man) ======================= */
  const TH=[
["griffin","a captain's suite","and {partner} kneel side by side and kiss, sharing a faceless man between them","riding him while kissing her friend","the woman rides the faceless man's penis while {partner} sits on his face, the two women kissing and squeezing each other's breasts","ffm threesome, cowgirl position, facesitting, kissing","Share?♡","BOTH OF US♡","kissing, breasts grab, bed","dragon"],
["badger","a cozy bedroom full of pillows","and {partner} giggle and lick the faceless man's penis together from both sides","on her back with her friend on top of her","the faceless man fucks the woman in missionary while {partner} lies on top of her, their breasts pressed together, taking turns","ffm threesome, double lick, stacked, missionary","Together♡","IT'S MY TURN♡","pillows, stacked, breasts press"],
["raven","a candlelit study","and {partner} kneel together and share a slow, double blowjob, eyes locked","bent over the desk beside her friend","both women are bent over the desk side by side as the faceless man fucks the woman, {partner} holding her hand","ffm threesome, double fellatio, bent over desk, holding hands","Share","DON'T STOP♡","desk, candles, holding hands"],
["serpent","a velvet boudoir","lounges on the bed as {partner} kisses down her body and the faceless man watches","on all fours, her friend beneath her","the faceless man fucks the woman doggystyle while {partner} lies beneath her, licking where they join","ffm threesome, doggystyle, cunnilingus, 69","Watch closely♡","SO GOOD♡","velvet, boudoir, green theme"],
["wolf","a moonlit cabin","and {partner} tackle the faceless man onto a fur rug, laughing","riding him, her friend riding his face","the woman rides the faceless man while {partner} rides his face, the two women high-fiving and kissing","ffm threesome, cowgirl position, facesitting, kissing","Pack hunt♡","AWOO♡","fur rug, cabin, moonlight"],
["swan","a ballet studio","and {partner} pose together in a mirrored arabesque, holding hands","in a standing split, her friend kissing her","the faceless man fucks the woman in a standing split while {partner} kisses her and holds her raised leg","ffm threesome, standing split, kissing, standing sex","Hold my leg♡","DEEPER♡","mirror, ballet barre, holding hands"],
["dragon","a treasure hoard","sprawls on her gold with {partner} curled against her, both beckoning the faceless man","on her back on gold, her friend beside her","the faceless man fucks the woman in missionary while {partner} sucks on her nipple and fingers herself","ffm threesome, missionary, nipple sucking","Bring tribute♡","MINE... OURS♡","gold coins, treasure"],
["stag","a forest glade","and {partner} weave flower crowns for each other in the grass, then pull the faceless man down between them","lying in wildflowers, her friend beside her","the faceless man fucks the woman in the wildflowers while {partner} kisses her softly, petals everywhere","ffm threesome, missionary, kissing, outdoor","Join us♡","SO GENTLE♡","wildflowers, flower crowns, forest"],
["shark","a beach at sunset","and {partner} splash in the surf, then drag the faceless man onto the sand","on all fours, her friend under her","the faceless man fucks the woman doggystyle on the sand while {partner} lies under her, licking her","ffm threesome, doggystyle, 69, outdoor","Fresh catch♡","CHOMP♡","beach, sunset, sand, surf","salmon"],
["penguin","a snowed-in cabin by the fire","and {partner} cuddle under one blanket by the fire, giggling, then pull the faceless man under it with them","in a blanket pile by the fire, her friend kissing her","the faceless man fucks the woman slowly under the blanket while {partner} kisses her and holds her hand, snow falling past the window","ffm threesome, missionary, kissing, holding hands, under blanket","Room for one more♡","SO WARM♡","blanket, fireplace, snowing, window, cabin, cozy","crow"],
["fox","a tatami room","and {partner} kneel side by side and lick the faceless man together","on all fours beside her friend","both women kneel on all fours side by side as the faceless man takes turns fucking them","ffm threesome, double fellatio, doggystyle, side by side","Who's first?♡","ME AGAIN♡","tatami, lanterns, side by side"],
["lovebird","a heart-filled bedroom","and {partner} share a heart-shaped kiss, pressing their breasts together","riding him, her friend kissing her","the woman rides the faceless man while {partner} kisses her, the two women's hands making a heart","ffm threesome, cowgirl position, kissing, heart hands","Love you both♡","LOVE♡","hearts, pink theme, heart hands"],
["flamingo","a pink poolside cabana","and {partner} stand on one leg each, legs intertwined, giggling","on one leg, her friend holding her","the faceless man fucks the woman standing while {partner} holds her steady and kisses her neck","ffm threesome, standing sex, standing on one leg, neck kiss","Hold me up♡","WOBBLY♡","cabana, pool, pink theme"],
["kraken","an aquarium room","and {partner} lie entwined on a padded bench, their legs tangled like tentacles","scissored with her friend","the faceless man fucks the woman while she and {partner} press their bodies together, legs entwined","ffm threesome, missionary, entwined legs, kissing","Wrap around me","DEEPER♡","aquarium, blue theme, entwined"],
["salmon","a photo studio","and {partner} pose cheek to cheek for the camera, nude","bent over beside her friend","both women are bent over a studio stool side by side as the faceless man fucks the woman, flashes going off","ffm threesome, bent over, side by side, camera flash","Cover shoot♡","WHAT A SHOT♡","photo studio, camera flash","serpent"],
["crow","a moonlit gothic bedroom","and {partner} giggle under the covers, then pull the faceless man in","riding him, her friend at his side","the woman rides the faceless man while {partner} cuddles against her, the two women kissing and giggling","ffm threesome, cowgirl position, kissing, cuddling","Shiny new toy♡","CAW♡","gothic, moonlight, bed, covers","penguin"]];
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin"};
  TH.forEach(r=>{r[9]=PAL[r[0]]});
  build("Academy Threesomes","Academy Oral Showcase","threesome","threesome",TH,{ahe:"blissful, cross-eyed ahegao with heart eyes and her tongue out",pcEx:"flushed, heart-eyed smile",vag:VAG,
    partner:true,dir:"mutual",count:"2girls, 1boy, ffm threesome, hetero, faceless male",act:"sex, vaginal, creampie",tags:["threesome","ffm","explicit","sex","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. The faceless man's thick, veiny penis is buried to the hilt in the woman's vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as he cums. Both women make blissful ahegao faces with heart eyes, and the woman cries "${q2}" with hearts, cum overflowing from her vagina.`,
      "2koma, ffm threesome, threesome, 2girls, 1boy, faceless male, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat"),
    blurb:(r,man)=>`A threesome with ${man.replace(/ robes$/i,"")} and a faceless man: ${r[5].split(", ").slice(1,3).join(", ")}. Opens in the Scene tab with her friend as character 2.`});
})();

/* ---- v163: "Academy Rivals". Eight non-explicit two-girl portraits of natural house rivals, built like the Academy Couples
   (late block, after the pair code): character 1 is one girl's base, character 2 her rival, both in their own outfits. ---- */
(function(){
  const tpl=id=>tplById(id);
  const R=(id,a,b,name,scene,act,blurb,tags)=>({id,base:a,name,out:{pair:{id:b,outfit:0,scene,act,dir:"mutual"}},tags:["rivals","pair","two girls"].concat(tags),
    blurb:`${blurb} Opens in the Scene tab with the ${(tpl(b)||{name:b}).name} as character 2.`});
  START.add("Academy Rivals",[
    R("rivalhall","griffinrobes","serpentrobes","Griffin vs Serpent","a tense standoff in the Academy great hall, the two women nose to nose, one gripping her wand and the other smirking, house banners hanging behind them","face-to-face, eye contact, rivalry",
      "The oldest rivalry in the Academy: Griffin and Serpent nose to nose in the great hall.",["griffin","serpent"]),
    R("rivalrace","sharkrobes","salmonrobes","Shark vs Salmon","two swimmers crouched on neighboring starting blocks at an ocean pool, glaring sideways at each other, water glittering below","side by side, rivalry, glaring",
      "Predator and prey on the starting blocks: Shark and Salmon about to race.",["shark","salmon"]),
    R("rivalchess","ravenrobes",ACAD.robes("crow")==="crowbody"?"crowrobes":ACAD.robes("crow"),"Raven vs Crow","a candlelit chess match in the library, one woman calmly moving a piece while the other leans across the board grinning, a stolen shiny chess piece hidden in her fingers","facing each other, chess, table",
      "Two black birds over a chessboard: Raven plays it straight, Crow has already pocketed a piece.",["raven","crow"]),
    R("rivalcatwalk","flamingorobes","lovebirdrobes","Flamingo vs Lovebird","a catwalk showdown, the two women striking fierce poses back to back as photographers' flashes go off and pink confetti falls","back-to-back, posing, rivalry",
      "Pink against pink on the runway: Flamingo and Lovebird striking poses back to back.",["flamingo","lovebird"]),
    R("rivalstorm","dragonrobes","krakenrobes","Dragon vs Kraken","sky against sea, a duel on a stormy cliff above crashing waves, one woman wreathed in flame and the other in swirling sea spray, both mid-spell","facing each other, battle, magic",
      "Sky against sea: Dragon and Kraken dueling on a storm-lashed cliff.",["dragon","kraken"]),
    R("rivalforest","wolfrobes","stagrobes","Wolf vs Stag","a footrace through an autumn forest, the two women mid-stride, laughing and shoving each other, leaves flying","running, side by side, rivalry",
      "Hunter and hunted, racing through the autumn woods and laughing about it.",["wolf","stag"]),
    R("rivalbakeoff","foxrobes","badgerrobes","Fox vs Badger","a bake-off in the Academy kitchen, flour flying everywhere, the two women pointing accusingly at each other's lopsided cakes","pointing at each other, kitchen, rivalry",
      "A bake-off gone wrong: Fox and Badger blaming each other's cakes, covered in flour.",["fox","badger"]),
    R("rivalice","swanwinter","penguinwinter","Swan vs Penguin","an ice-skating showdown on a frozen lake at dusk, one woman in a perfect, elegant spin while the other glides happily on her belly across the ice past her, and a judge's scorecard held up behind them reads a perfect ten for the belly slide","side by side, ice skating, snow",
      "Swan's flawless spin against Penguin's belly slide, and Penguin gets the perfect ten.",["swan","penguin"])]);
})();

/* ---- v164: "Academy Pregnancy Sex" and "Academy Impregnation". Two-panel explicit pair scenes with her Academy Men boyfriend,
   built like the other scene sets (adult women, age "woman", own base, Scene tab, Nude outfits, held back by the safeguard).
   Pregnancy Sex: she is heavily pregnant (stomachShape) and they make love in belly-friendly positions.
   Impregnation: she is trying for a baby with him; it ends in a creampie with an x-ray of sperm reaching her egg.
   (No birth scenes: a newborn is never put into this studio's sexual content.) */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const VAG="flushed, gaping, full of and overflowing with thick white cum, squirting";
  START.option("stomachShape","round, heavily pregnant belly","Body");
  function build(label,after,suf,nameSuf,rows,o){
    START.option("expression",o.ahe,G);
    const by={};rows.forEach(r=>{by[r[0]]=r;START.option("posture",r[3],G)});
    START.add(label,ACAD.HOUSES.filter(h=>by[h]).map(h=>{const r=by[h],m=h+"man",mt=tplById(m);
      const c1=Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
        nippleType:"hard and flushed with arousal",vaginaType:VAG,expression:o.ahe,posture:r[3]},o.c||{});
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:m,outfit:nudeAt(m),scene:o.scene(r),act:o.act+", "+r[5],dir:"ba",explicit:true,penis:true,
            pc:{expression:o.pcEx,posture:null},c1,compact:false,fit:true}},
        tags:o.tags.concat([h]),blurb:o.blurb(r,mt?mt.name:cap(h)+" boyfriend")};
    }),{after});
  }
  const sc=(lead,tail)=>([h,room,p1,pose,p2,acts,q1,q2,tags])=>lead(room,p1,p2,q1,q2)+" "+dedupe(tail+", "+acts+", "+tags);

  /* ======================= Pregnancy Sex ======================= */
  /* [house, place, panel 1, posture, panel 2, acts, line 1, line 2, tags] */
  const PS=[
["griffin","a captain's suite","stands proudly in profile, both hands on her huge round belly, grinning at {partner}","riding him, hands on her belly","she rides {partner} with her belly bouncing, his hands cradling it","cowgirl position, girl on top, hands on belly","Still the captain♡","STILL... SO GOOD♡","bed, profile, belly grab"],
["badger","a cozy bedroom full of pillows","lies propped on a mountain of pillows, rubbing her round belly and her swollen breasts, blushing","lying on her side, spooned among pillows","{partner} spoons her from behind on her side, one hand on her belly, sliding in slowly","spooning, side-lying, hand on belly, lactation","Be gentle with us♡","SO GENTLE♡","pillows, swollen breasts, lactation, milk"],
["raven","a candlelit study","sits in a leather armchair with her belly resting on her thighs, calmly beckoning","straddling him in an armchair","she straddles {partner} in the armchair, her belly pressed between them, moving slowly","straddling, sitting sex, belly press","Carefully","DEEPER♡","armchair, candles, study"],
["serpent","a velvet boudoir","lounges on velvet cushions, belly bare, with a smug, satisfied smile","on her side, one leg raised over his shoulder","{partner} takes her on her side with one of her legs over {his} shoulder, her belly supported on the cushions","side-lying, leg up, leg over shoulder","Look what you did♡","AGAIN♡","velvet, cushions, green theme"],
["wolf","a moonlit cabin","kneels on a fur rug on all fours, her heavy belly hanging low, wagging her hips playfully","on all fours, belly hanging low","{partner} takes her doggystyle, gently, her belly swaying beneath her","doggystyle, all fours, sex from behind","Still want me?♡","AWOO♡","fur rug, cabin, moonlight, all fours"],
["swan","a sunlit ballet studio","rests her round belly against the barre, stretching gracefully","holding the barre, belly forward","{partner} takes her from behind as she holds the barre, one hand under her belly","sex from behind, standing sex, holding barre","Hold us both♡","SO DEEP♡","ballet barre, mirror, sunlight"],
["dragon","a treasure hoard of gold","lounges on her gold, belly bare and gleaming, smirking possessively","riding him on her hoard","she rides {partner} on the gold, her belly heavy and proud","cowgirl position, girl on top, gold coins","My greatest treasure♡","MINE♡","gold coins, treasure"],
["stag","a sunlit meadow","lies in wildflowers with a flower crown, hands folded over her belly, smiling softly","on her side in wildflowers","{partner} lies behind her in the flowers and makes love to her slowly, petals in her hair","spooning, side-lying, outdoor","So peaceful♡","SO WARM♡","wildflowers, flower crown, meadow, sunlight"],
["shark","a beach at sunset","floats in the warm shallows on her back, belly breaking the water","straddling him in the shallows","she straddles {partner} in the warm shallows, her belly bobbing above the water","straddling, partially submerged, outdoor","Floats nicely♡","CHOMP♡","beach, sunset, shallows, water"],
["penguin","a snowed-in cabin by the fire","sits on a fur rug in an unbuttoned knit sweater, cradling her round belly and smiling at {partner} as snow falls outside","lying on her side on a fur rug by the fire, spooned","{partner} spoons her on the fur rug by the fire, one hand on her belly, making love slowly as snow falls past the window","spooning, side-lying, hand on belly","Feel that?♡","SO WARM♡","fur rug, fireplace, snowing, window, cabin, cozy"],
["fox","a tatami room","kneels in a loose robe open over her belly, smiling slyly","riding him in reverse, robe open","she rides {partner} in reverse cowgirl, her robe slipping and her belly swaying","reverse cowgirl, girl on top, robe","Can you handle both of us?♡","STILL YOURS♡","tatami, robe, lanterns"],
["lovebird","a heart-filled bedroom","draws a heart on her belly with a marker, giggling","lying back, belly cradled","{partner} makes love to her on her back propped on pillows, kissing her belly","missionary, propped on pillows, belly kiss","Say hi♡","I LOVE US♡","hearts, pillows, pink theme"],
["flamingo","a pink poolside cabana","poses on one leg in profile, showing off her belly","on her side on a lounger","{partner} takes her on her side on the lounger, her belly resting on a pillow","side-lying, sex from behind","Am I glowing?♡","GLOWING♡","cabana, pool, pink theme"],
["kraken","an aquarium room","floats in a warm pool with her belly glowing in blue light","riding him in the warm water","she rides {partner} in the warm pool, her belly buoyed by the water","cowgirl position, partially submerged","Weightless","DEEPER♡","pool, aquarium, blue theme"],
["salmon","a soft white photo studio","poses for a maternity shoot, cradling her belly elegantly","on all fours on a studio bench","{partner} takes her from behind on the studio bench, her belly resting on a cushion","sex from behind, all fours","Make it elegant♡","STUNNING♡","photo studio, drapes"],
["crow","a moonlit gothic bedroom","perches on the bed, patting her round belly with a mischievous grin","riding him, hands on his chest","she rides {partner}, giggling, her belly bouncing","cowgirl position, girl on top","Guess what I made♡","CAW♡","gothic, moonlight, bed"]];
  build("Academy Pregnancy Sex","Academy Anal","pregsex","pregnancy sex",PS,{ahe:"blissful, glowing ahegao with heart eyes and her tongue out",pcEx:"warm, adoring smile",
    c:{stomachShape:"round, heavily pregnant belly"},act:"sex, vaginal, pregnant, creampie",tags:["pregnant","pregnancy sex","explicit","sex","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. She is heavily pregnant with a round belly. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried in her vagina with motion lines as {he} cums. She makes a blissful, glowing ahegao with heart eyes and her tongue out, trembling, and cries "${q2}" with hearts, cum dripping down her thighs beneath her round belly.`,
      "2koma, pregnant, big belly, round belly, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat"),
    blurb:(r,man)=>`Heavily pregnant and still eager: ${r[5].split(", ").slice(0,2).join(", ")}, then a creampie. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});

  /* ======================= Impregnation ======================= */
  const IM=[
["griffin","a captain's suite","holds up a positive ovulation test with a cocky grin and orders {partner} to the bed","in a mating press, legs locked around him","{partner} breeds her in a deep mating press as she locks her legs around {him} and pulls {him} deeper","mating press, leg lock, ovulation test","Today's the day♡","BREED ME♡","ovulation test, bed"],
["badger","a cozy bedroom","hugs a pillow and shyly whispers that she wants {partner}'s baby","on her back, hips raised on a pillow","{partner} breeds her with her hips propped on a pillow, holding her hands","missionary, hips on pillow, holding hands","I want your baby♡","FILL ME UP♡","pillow under hips, holding hands"],
["raven","a candlelit study","circles today's date on a calendar and looks at {partner} over her shoulder","bent over the desk, the calendar beside her","{partner} breeds her bent over the desk beside the circled calendar","bent over desk, sex from behind","It's time","INSIDE... ALL OF IT♡","calendar, desk, candles"],
["serpent","a velvet boudoir","lounges with her legs spread and a smug smile, declaring she'll have {partner}'s heir","in a mating press on velvet","{partner} pins her in a mating press and pumps load after load into her","mating press, multiple creampies","Give me an heir♡","MORE... ALL OF IT♡","velvet, green theme"],
["wolf","a moonlit cabin","howls at the full moon in heat, presenting on all fours","on all fours in heat, presenting","{partner} mounts and breeds her doggystyle under the full moon","doggystyle, mating, in heat","Breed me under the moon♡","AWOOOO♡","full moon, fur rug, in heat"],
["swan","a moonlit lake pavilion","removes her robe slowly, asking {partner} to make her a mother","on her back, legs held up","{partner} holds her legs up and breeds her deep","missionary, legs up, legs held","Make me a mother♡","DEEPER♡","pavilion, moonlight, lake"],
["dragon","a treasure hoard of gold","sprawls on her gold and demands an heir","in a mating press on gold","{partner} breeds her in a mating press on her hoard, gold spilling everywhere","mating press, gold coins","An heir for my hoard♡","FILL ME♡","gold coins, treasure"],
["stag","a spring meadow","lies in blooming wildflowers in the spring sunshine, arms open to {partner}","on her back in wildflowers, legs wrapped","{partner} breeds her slowly in the flowers, her legs wrapped around {him}","missionary, legs wrapped, outdoor","It's spring♡","I'M BLOOMING♡","wildflowers, spring, sunlight"],
["shark","a beach at night under a full moon","drags {partner} into the surf, grinning","straddling him in the surf","she rides {partner} in the moonlit surf, grinding down to take every drop","cowgirl position, outdoor, surf","Spawning season♡","CHOMP♡","beach, full moon, surf, night"],
["penguin","a snowed-in cabin by the fire","sits on a fur rug, takes {partner}'s hand and places it on her stomach, cheeks pink, asking softly if they can start a family","on her back on a fur rug, holding his hands","{partner} makes love to her slowly on the fur rug by the fire, their fingers laced, as snow falls past the window","missionary, holding hands, interlocked fingers","Let's start a family♡","I LOVE YOU♡","fur rug, fireplace, snowing, window, cabin, cozy"],
["fox","a lantern-lit shrine room","offers a fertility charm with a sly smile","on all fours, looking back","{partner} breeds her from behind as the charm swings from her wrist","doggystyle, sex from behind","The charm says tonight♡","IT'S WORKING♡","shrine, lanterns, fertility charm"],
["lovebird","a heart-filled bedroom","holds up a list of baby names with heart eyes","on her back, legs wrapped around him","{partner} breeds her face to face, kissing her, her legs wrapped tight around {him}","missionary, kissing, leg lock","I picked names♡","LOVE YOU♡","hearts, pink theme, kissing"],
["flamingo","a pink poolside cabana","stretches on a lounger and asks {partner} for a baby with a dreamy smile","lying with her legs up on his shoulders on a lounger","{partner} breeds her with her long legs over {his} shoulders","legs on shoulders, missionary","Baby flamingos♡","DEEPER♡","cabana, pool, pink theme"],
["kraken","an aquarium room","lies back calmly and simply says she is ready","in a mating press on a padded bench","{partner} breeds her in a mating press as fish drift past the glass","mating press","I'm ready","FILL ME♡","aquarium, blue theme"],
["salmon","a river lodge during spawning season","watches salmon leap upstream and turns to {partner} with a poised smile","bent over the windowsill","{partner} breeds her bent over the windowsill as salmon leap in the river outside","sex from behind, bent over","It's spawning season♡","UPSTREAM♡","river, window, leaping salmon"],
["crow","a moonlit gothic bedroom","builds a little nest of blankets on the bed and pats it, grinning","on her back in a nest of blankets","{partner} breeds her in her blanket nest, her legs locked around {him}","missionary, leg lock, blanket nest","Nest's ready♡","CAW♡","blanket nest, gothic, moonlight"]];
  build("Academy Impregnation","Academy Pregnancy Sex","breed","impregnation",IM,{ahe:"blissful, cross-eyed ahegao with heart eyes and her tongue out",pcEx:"dominant, knowing smirk",
    act:"sex, vaginal, impregnation, creampie",tags:["impregnation","breeding","explicit","sex","pair"],
    scene:sc((room,p1,p2,q1,q2)=>`The image is split into two scenes in ${room}. She wants a baby. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and an x-ray cross-section shows {him} cumming deep against her cervix, sperm swimming into her womb and reaching her egg. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, trembling, and cries "${q2}" with hearts, cum overflowing from her vagina.`,
      "2koma, impregnation, x-ray, cross-section, internal cumshot, sperm cell, ovum, fertilization, womb, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat"),
    blurb:(r,man)=>`Trying for a baby: ${r[5].split(", ").slice(0,2).join(", ")}, ending with an x-ray of fertilization. Opens in the Scene tab with the ${man}; switch either character and the scene follows.`});
})();

/* ---- v165: "Academy Knights", from the user's generic knight armor, personalized per house.
   Every girl wears the same full plate kit (steel plate with chainmail sleeves and leggings, ornate pauldrons, thick leg armor,
   a steel crotch plate, a breastplate shaped to her bust, a steel thorn crown, fingerless gloves, a black leather neck cover,
   a black steel sword and shield) on the user's misty battlefield. Each house makes it her own: her house colors in the
   enamel, engravings and filigree, her animal in the breastplate decorations, pauldrons, crown and shield crest.
   Penguin's battlefield is snowbound, with a fur-lined cloak against the cold. Second outfit: battle-damaged plate. */
(function(){
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const M={  /* [breastplate decoration, pauldron shape, crown detail, shield crest, stance] */
    griffin:["spread griffin wings","griffin heads","tiny griffin wings","rampant griffin","standing tall with her sword raised to the sky"],
    badger:["striped badger-pelt patterns","rounded badger heads","oak leaves","badger","bracing behind her shield in a defensive stance"],
    raven:["outstretched raven feathers","layered raven feathers","raven feathers","raven in flight","standing still with her sword point resting on the ground"],
    serpent:["coiling serpents","coiled snakes","snake heads","coiled serpent","standing with her sword held low in a cold, ready stance"],
    wolf:["howling wolf heads","snarling wolf heads","wolf fangs","howling wolf","crouching mid-charge with her shield forward"],
    swan:["swan wings folded across her chest","swan wings","swan feathers","swan","standing gracefully with her sword held in a salute"],
    dragon:["dragon scales and claws","dragon heads","dragon horns","dragon breathing fire","planting her sword in the ground with one boot on a fallen banner"],
    stag:["antlers and oak leaves","stag antlers","small antlers","stag","standing among the grass with her shield lowered and her sword at her side"],
    shark:["shark fins and cresting waves","shark fins","shark teeth","circling shark","grinning over the rim of her shield in a fighting stance"],
    penguin:["snowflakes and penguins","rounded penguin wings","snowflakes","penguin under a snowflake","standing firm in the snow with her shield raised and her cloak blowing"],
    fox:["fox tails and foxfire flames","fox heads","fox ears","nine-tailed fox","resting her sword on her shoulder in a sly, relaxed stance"],
    lovebird:["hearts and lovebird wings","lovebird wings","little hearts","pair of lovebirds","holding her sword aloft with a cheerful battle cry"],
    flamingo:["flamingo feathers","curved flamingo necks","flamingo feathers","flamingo","balancing on one leg in a poised fencing pose"],
    kraken:["curling tentacles","tentacles","tentacle tips","kraken","standing calmly as mist curls around her like tentacles"],
    salmon:["leaping salmon and river waves","salmon scales","salmon fins","leaping salmon","standing at attention with her sword held upright before her face"],
    crow:["crow feathers and crescent moons","crow wings","crescent moons","crow on a crescent moon","perching on a broken stone pillar with her sword over her shoulder"]};
  const EX={griffin:"confident smile",badger:"determined expression",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"calm expression",shark:"playful fanged grin",penguin:"determined expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"elegant composed expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression"};
  const top=h=>`a suit of full plate steel knight armor with chainmail sleeves, {c} enamel accents and a breastplate that emphasizes her breasts, decorated with ${M[h][0]} in ornate {c2} engravings and filigree`;
  const items=h=>({top:[top(h),"@primary",null,"@accent"],shoulderPiece:[`ornate steel pauldrons with {c} filigree, shaped like ${M[h][1]}`,"@accent"],
    bottom:["steel crotch plate","-"],legwear:["thick steel greaves over chainmail leggings","-"],
    headwear:[`{c}-inlaid steel thorn crown with ${M[h][2]}`,"@accent"],gloves:["{c} fingerless leather gloves","black"],neckAccessory:["{c} leather neck cover","black"],
    heldItem:[`{c} steel sword and a {c} steel shield bearing the {c2} crest of a ${M[h][3]}`,"black",null,"@accent"]});
  const dmg=h=>({top:[`a suit of battle-damaged steel armor with a breastplate cracked open over bare skin and ${M[h][0]} in {c} filigree`,"@accent"],
    shoulderPiece:[`ornate steel pauldrons with {c} filigree, shaped like ${M[h][1]}`,"@accent"],bottom:["torn chainmail loincloth","-"],
    headwear:[`{c}-inlaid steel thorn crown with ${M[h][2]}`,"@accent"],neckAccessory:["{c} leather neck cover","black"],heldItem:["{c} steel sword","black"]});
  const reg=(o,t,f)=>Object.entries(o).forEach(([k,a])=>START.item(k,a[0],t,f));
  ACAD.HOUSES.forEach(h=>{reg(items(h),"CU","costume");reg(dmg(h),"L","costume,boudoir");START.option("posture",M[h][4],"Posture")});
  START.item("outerwear","{c} fur-lined cloak billowing in the wind","CU","costume");
  ACAD.set("Academy Knights","Academy Battle Maidens","knight","knight","costume",
    {tags:["knight","full armor","plate armor","sword","shield","battlefield"],oname:"Full plate",
     must:must("a misty battlefield on a wide open grass plain in front of the ruins of an abandoned castle, a blurry background and a detailed foreground outlined in black")},
    ACAD.HOUSES.map(h=>{const it=items(h);if(h==="penguin")it.outerwear=["{c} fur-lined cloak billowing in the wind","@secondary"];
      return[h,it,EX[h],M[h][4],"a knight of the "+ACAD.cap(h)+" house",{more:[{oname:"Battle-damaged",look:"costume",items:dmg(h)}]}]}));
  const t=tplById("penguinknight");
  if(t)t.out=Object.assign({},t.out,{must:must("a snowy, misty battlefield on a wide white plain in front of the ice-glazed ruins of an abandoned castle, snow falling, a blurry background and a detailed foreground outlined in black")});
})();

/* ---- v166: three futanari scene sets (adult women, age "woman", explicit, held back by the safeguard like every explicit scene).
   Futa Surprise: solo two-panel scene; a magical mishap that fits her house gives her a futanari penis, then her reaction.
   Futa Masturbation: solo two-panel scene; she strokes her new cock to a huge orgasm.
   Both are solo by default (Scene tab "No partner"); picking a partner switches to the scene text with {partner} watching.
   Futa Best Friends: she, as a futanari, fucks her Academy best friend, who asked for it and loves it. Character 1 is the friend
   (her robes base), character 2 is the girl herself (pair.penis, so the pair code writes her as the futanari). */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const FUTA="She is a futanari woman with a thick, veiny, hard, erect futanari penis and testicles above her pussy.";
  const C1=more=>Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed and glistening with arousal"},more||{});
  function solo(label,after,suf,nameSuf,rows,o){
    START.option("expression",o.ex,G);
    START.add(label,ACAD.HOUSES.filter(h=>rows[h]).map(h=>{const r=rows[h];START.option("posture",r[2],G);
      const c1=C1({expression:o.ex,posture:r[2]}),text=o.text(r);
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",outfit:0,solo:`${FUTA} ${text} ${dedupe(o.tail+", "+r[6])}`,
            scene:`${FUTA} ${text} {Partner} watches from the doorway, blushing and wide-eyed. ${dedupe(o.tail+", "+r[6])}`,
            soloCount:"1girl, solo, futanari",act:"",dir:"mutual",explicit:true,penis:false,pc:{expression:"blushing, wide-eyed smile",posture:null},c1,compact:false,fit:true}},
        tags:o.tags.concat([h]),blurb:o.blurb(r)};
    }),{after});
    START.option("expression","blushing, wide-eyed smile",G);
  }

  /* ======================= Futa Surprise ======================= */
  /* house: [place, what happens (panel 1), posture, reaction (panel 2), line 1, line 2, tags] */
  const TR={
    griffin:["a captain's suite","drinks a fizzing golden victory potion from a trophy cup and gasps as a futanari penis springs up between her thighs in a burst of golden light","standing with her hands on her hips, cock standing proud","she plants her hands on her hips and grins down at her huge new cock, already sizing it up","What did they put in this?!","...I'M KEEPING IT♡","trophy cup, potion, golden light, hands on hips"],
    badger:["a cozy cottage kitchen","takes a bite of a glowing honey-cake and squeaks as her skirt suddenly tents with a huge futanari penis","sitting on the kitchen floor, cupping her new cock in both hands","she sits on the kitchen floor cradling her new cock in both hands, blushing furiously and poking it","Eep! Was it the honey?!","IT'S SO WARM♡","honey cake, kitchen, tented skirt, sitting on floor"],
    raven:["an observatory under the stars","misreads a star chart and a flash of starlight swirls into her hips, a futanari penis forming in sparkles","sitting cross-legged with a book open on her lap, examining her new cock","she sits with a spellbook open, calmly measuring her new cock with a ruler and taking notes","Fascinating.","...SCIENTIFICALLY IMPRESSIVE♡","star chart, spellbook, ruler, notes, sparkles"],
    serpent:["a velvet potions lab","smirks as she swaps a rival's potion and drinks the wrong one, a futanari penis coiling up in a green glow","lounging on a velvet chaise, stroking her new cock thoughtfully","she lounges on the chaise and strokes her new cock thoughtfully, her smirk returning","This was not the plan.","...ACTUALLY, I LOVE IT♡","potion bottle, green glow, chaise, velvet"],
    wolf:["a forest clearing under a full moon","howls at the full moon and yelps as a big futanari penis bursts from her shorts in a silver glow","on all fours, looking back at her new cock between her legs","she drops on all fours and wags her hips, peering back between her legs at her new cock with a huge grin","AWOO?!","SO BIG♡","full moon, moonlight, forest, torn shorts"],
    swan:["a moonlit lake","dances a forbidden ballet step by the lake and a futanari penis blooms between her legs in a shower of white feathers","standing on pointe, hands covering her mouth, cock bobbing","she stands frozen on pointe with both hands over her mouth, her new cock bobbing as she blushes crimson","Oh my...!","IT'S... ELEGANT♡","white feathers, lake, moonlight, pointe shoes"],
    dragon:["a treasure hoard cavern","counts a cursed gold coin and roars as a huge futanari penis erupts in flame-colored light","sitting on her gold, legs spread, admiring her new cock","she sprawls on her gold and admires her enormous new cock with a hungry smirk","WHAT?!","THE BIGGEST TREASURE♡","gold coins, cursed coin, flames, treasure"],
    stag:["a forest glade","picks a strange glowing mushroom and a futanari penis sprouts between her thighs in a swirl of petals","kneeling in the flowers, cradling her new cock","she kneels in the flowers, gently cradling her new cock with a dreamy, curious smile","It... grew?","IT'S BLOOMING♡","glowing mushroom, petals, flowers, forest"],
    shark:["a beach at sunset","swallows a mouthful of strange glowing seawater and her bikini bottoms burst as a huge futanari penis appears","standing in the surf, hands on her hips, cock out","she stands in the surf with her hands on her hips, laughing at the giant cock jutting from her torn bikini","Pfft... what?!","CHOMP... IT'S HUGE♡","beach, sunset, torn bikini, glowing water"],
    penguin:["a cozy snowed-in cabin","shakes a strange old snow globe and gasps as glittering snowflakes swirl down into her lap and a futanari penis appears under her sweater","sitting on a fur rug, lifting her sweater to peek at her new cock","she sits on the fur rug and lifts the hem of her sweater to peek at her new cock, cheeks bright pink, snow falling outside","The snow globe?!","IT'S... KIND OF CUTE♡","snow globe, sparkles, sweater lift, fur rug, snowing, window, cabin"],
    fox:["a lantern-lit shrine","pranks a shrine spirit and gets pranked back, a futanari penis appearing in a puff of blue foxfire","sitting on the shrine steps, legs spread, grinning at her new cock","she sits on the shrine steps, legs spread, grinning slyly at her new cock and giving it a teasing flick","Hey! No fair!","...OKAY, I'LL TAKE IT♡","foxfire, shrine, lanterns, puff of smoke"],
    lovebird:["a heart-filled bedroom","drinks a pink love potion meant for her crush and hearts burst everywhere as a futanari penis pops up","lying on her bed hugging a pillow, peeking at her new cock","she lies on her bed hugging a pillow, peeking at her new cock with heart eyes and giggling","It was supposed to be a love potion!","I LOVE IT♡","love potion, hearts, pink theme, pillow"],
    flamingo:["a pink poolside cabana","sips a strange pink cocktail and her bikini bottoms burst as a long futanari penis unfolds","standing on one leg, admiring her new cock","she poses on one leg by the pool, admiring her long new cock with a dreamy smile","Is this... fashion?","IT'S FABULOUS♡","cocktail, pool, torn bikini, pink theme"],
    kraken:["an aquarium room","touches a glowing sea relic and a futanari penis emerges in curling blue light","standing calmly, examining her new cock in one hand","she stands calmly, weighing her new cock in one hand with cool, quiet interest","Interesting.","...VERY INTERESTING♡","sea relic, blue glow, aquarium"],
    salmon:["a sushi bar after closing","tastes a strange glowing roe and a futanari penis appears beneath her apron","sitting on the counter, lifting her apron to look","she sits on the counter and lifts her apron to look, her poise slipping into a stunned, flushed smile","The roe?!","...CHEF'S KISS♡","sushi, roe, apron lift, counter"],
    crow:["a moonlit gothic bedroom","steals a shiny cursed ring from a jewelry box and slips it on, and a futanari penis appears in a swirl of black feathers","sitting on the bed, poking her new cock","she sits on the bed poking her new cock and giggling, the ring sparkling on her finger","Ooh... shiny curse?","CAW... I LIKE IT♡","cursed ring, black feathers, gothic, moonlight"]};
  solo("Academy Futa Surprise","Academy Bound and Gagged","futasurprise","futa surprise",TR,{ex:"shocked, flustered expression with a growing grin",tags:["futanari","transformation","explicit","solo"],
    tail:"2koma, futanari, transformation, surprised, erection, large penis, testicles, nude, blush, speech bubble, magic, glowing",
    text:([place,p1,pose,p2,q1,q2])=>`The image is split into two scenes in ${place}. In the first scene, the woman ${p1}, crying "${q1}" in shock. In the second scene, ${p2}, saying "${q2}" with hearts.`,
    blurb:r=>`A magical mishap: she ${r[1].split(" and ")[0]}. Solo by default; pick a partner in the Scene tab to add one.`});

  /* ======================= Futa Masturbation ======================= */
  const MB={
    griffin:["her captain's chair","sprawls in her captain's chair, legs over the armrests, stroking her cock with a cocky grin","sitting in a chair with her legs over the armrests, stroking","she pumps hard with both hands and erupts, cum shooting high over her chest","Watch the captain work♡","CUMMING♡","chair, legs over armrests, two-handed"],
    badger:["a cozy bed of pillows","lies in a nest of pillows, squeezing her cock between her enormous breasts","lying in pillows, cock between her breasts","she pumps her cock between her own breasts and cums all over her face and chest","I can reach it♡","SO MUCH♡","self paizuri, pillows, huge breasts"],
    raven:["a candlelit study","sits at her desk with her legs spread, stroking slowly while reading a book","sitting at a desk, stroking slowly","she keeps the book open as she cums across the pages, her composure finally breaking","Research","...AHHH♡","desk, book, candles"],
    serpent:["a velvet bed","lies on velvet with a smug smile, stroking her cock in long slow pulls","lying on velvet, stroking slowly","she arches off the velvet and cums in long ropes across her stomach","Mm, perfect♡","SO GOOD♡","velvet, green theme, arched back"],
    wolf:["a cabin on a full-moon night","kneels on a fur rug, humping her fist eagerly","kneeling on a fur rug, humping her fist","she howls as she cums all over the fur rug","Can't stop♡","AWOOO♡","fur rug, full moon, kneeling"],
    swan:["a ballet studio","stretches into a split on the floor, stroking her cock with graceful fingers","in a split on the floor, stroking","she cums in a graceful arc across the studio floor, blushing","So elegant♡","OHHH♡","split, ballet studio, mirror"],
    dragon:["her treasure hoard","lounges on her gold, stroking her huge cock with both hands","lying on gold, stroking with both hands","she erupts all over her gold, cum dripping between the coins","My treasure♡","ALL MINE♡","gold coins, two-handed, huge penis"],
    stag:["a forest glade","sits against a tree, stroking slowly with petals in her hair","sitting against a tree, stroking slowly","she cums into the wildflowers, trembling, petals stuck to her skin","Nature's gift♡","I'M BLOOMING♡","tree, flowers, forest, outdoor"],
    shark:["a beach at sunset","lies on a beach towel, stroking fast with sunscreen-slick hands","lying on a beach towel, stroking fast","she cums high into the air with a toothy grin, splashing her sun-oiled stomach","Hold still♡","CHOMP♡","beach, towel, sunscreen, sunset"],
    penguin:["a warm bath in a snowed-in cabin","sits in a steaming bath by a frosted window, shyly stroking her cock under the bubbles as snow falls outside","sitting in a bubble bath, stroking shyly","she leans back in the bath with a shiver and cums, the bubbles flecked white as snow falls past the window","This feels so nice♡","SO WARM♡","bath, bubbles, steam, snowing, window, cabin"],
    fox:["a lantern-lit room","kneels on a cushion, tail swishing, stroking with a sly smile","kneeling on a cushion, stroking","she cums across the tatami with her tongue out","Watching?♡","FOXFIRE♡","tatami, lanterns, cushion"],
    lovebird:["a heart-filled bedroom","lies on her back hugging a heart pillow with one arm, stroking with the other","lying on her back, stroking with a pillow hug","she cums on her heart pillow, giggling breathlessly","Love myself♡","LOVE♡","heart pillow, hearts, pink theme"],
    flamingo:["a pink bathroom with a mirror","stands on one leg before the mirror, stroking and admiring herself","standing on one leg before a mirror, stroking","she cums onto the mirror, wobbling on one leg","Gorgeous♡","OHHH♡","mirror, standing on one leg, pink theme"],
    kraken:["an aquarium room","lies back calmly, stroking in slow waves as fish drift past","lying back, stroking in slow waves","she cums in a sudden, shuddering wave, her calm gone","Slowly","...MORE♡","aquarium, blue theme"],
    salmon:["a photo studio","poses on a stool before her own camera, stroking elegantly","sitting on a stool, stroking elegantly","she cums as the camera flash goes off","For the portfolio♡","WHAT A SHOT♡","photo studio, camera flash, stool"],
    crow:["a moonlit gothic bedroom","sits on the bed with a shiny ring on her cock, giggling as she strokes","sitting on the bed, stroking","she cums with a giggle, the ring sparkling","Shiny♡","CAW♡","cock ring, gothic, moonlight, bed"]};
  const MB2={};Object.entries(MB).forEach(([h,[place,p1,pose,p2,q1,q2,tags]])=>{MB2[h]=[place,p1,pose,p2,q1,q2,tags]});
  solo("Academy Futa Masturbation","Academy Futa Surprise","futasolo","futa masturbation",MB2,{ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",tags:["futanari","masturbation","explicit","solo"],
    tail:"2koma, futanari, masturbation, penis grab, stroking, erection, large penis, testicles, ejaculation, cum, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat",
    text:([place,p1,pose,p2,q1,q2])=>`The image is split into two scenes in ${place}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}, making a blissful, cross-eyed ahegao with heart eyes and crying "${q2}" with hearts.`,
    blurb:r=>`Solo futanari masturbation in ${r[0]}. Solo by default; pick a partner in the Scene tab to add one.`});

  /* ======================= Futa Best Friends ======================= */
  /* [futa house (character 2), friend house (character 1), place, panel 1, friend posture, panel 2, acts, line 1 (friend), line 2 (friend), tags] */
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin"};
  const BF={
    griffin:["a captain's suite","{partner} shows off her new cock with a cocky grin and the woman, her best friend, drops to her knees, eager to try it","bent over the desk, looking back eagerly","{partner} bends the woman over the desk and fucks her hard as she begs for more","sex from behind, bent over desk","Let me try it♡","DON'T STOP♡","desk, bent over"],
    badger:["a cozy bedroom","{partner} shyly lifts her skirt to show her best friend, and the woman squeals and pulls her into bed","lying back in pillows, arms open","{partner} fucks the woman in missionary in a nest of pillows, both giggling and kissing","missionary, kissing, pillows","Come here, you♡","SO CUTE... SO BIG♡","pillows, bed, kissing"],
    raven:["a candlelit study","{partner} calmly explains her new anatomy and the woman, grinning, climbs into her lap","riding her in an armchair","the woman rides {partner}'s futanari penis in the armchair, both gasping","cowgirl position, armchair, straddling","Show me, then♡","IT'S PERFECT♡","armchair, candles, study"],
    serpent:["a velvet boudoir","{partner} lounges with her new cock out and a smug look, and the woman crawls toward her, licking her lips","on all fours, looking back","{partner} takes the woman doggystyle on the velvet, smug and slow","doggystyle, sex from behind","I want it♡","DEEPER♡","velvet, green theme"],
    wolf:["a forest clearing","{partner} tackles her best friend into the grass, laughing, her new cock bobbing","on her back in the grass, legs wrapped","{partner} fucks the woman in the grass as she wraps her legs around her, both laughing and moaning","missionary, outdoor, legs wrapped","Get over here!♡","AWOO♡","forest, grass, outdoor"],
    swan:["a ballet studio","{partner} blushes as her best friend lifts her own leg high, inviting her in","in a standing split at the barre","{partner} fucks the woman in a standing split at the barre, both watching in the mirror","standing split, standing sex, mirror","I'm flexible♡","SO DEEP♡","ballet barre, mirror"],
    dragon:["a treasure hoard","{partner} sprawls on her gold and her best friend climbs on top, demanding a turn","riding her on the gold","the woman rides {partner} on the gold, coins spilling everywhere","cowgirl position, gold coins","My turn♡","ALL OF IT♡","gold coins, treasure"],
    stag:["a sunlit glade","{partner} shyly shows her new cock and her best friend kisses her, pulling her down into the flowers","lying in wildflowers, legs open","{partner} makes love to the woman in the wildflowers, petals in both their hair","missionary, outdoor, kissing","It's okay, I want to♡","SO GENTLE♡","wildflowers, forest"],
    shark:["a beach at sunset","{partner} grins as her best friend pulls her bikini aside and drags her into the shallows","bent over in the shallows","{partner} fucks the woman from behind in the warm shallows, waves splashing","sex from behind, partially submerged","Come and get me♡","CHOMP... HARDER♡","beach, sunset, shallows"],
    penguin:["a snowed-in cabin by the fire","{partner} shyly admits what the snow globe did, and the woman, her best friend, giggles, kisses her and pulls her under a big blanket by the fire","lying under a blanket on a fur rug, arms around her","{partner} makes love to the woman slowly under the blanket by the fire, both of them blushing and kissing as snow falls past the window","missionary, kissing, under blanket, holding hands","Show me♡ Under here♡","SO WARM♡","blanket, fur rug, fireplace, snowing, window, cabin, cozy"],
    fox:["a lantern-lit room","{partner} slyly lets her robe fall open and her best friend gasps, then grins and kneels","on all fours on the tatami","{partner} takes the woman from behind on the tatami, laughing together","doggystyle, sex from behind","Sneaky♡ Let me♡","AGAIN♡","tatami, lanterns, robe"],
    lovebird:["a heart-filled bedroom","{partner} confesses her love and her new cock at once, and her best friend squeals and kisses her","on her back hugging her","{partner} fucks the woman in missionary as they kiss and say I love you","missionary, kissing, legs wrapped","I love you too♡","I LOVE YOU♡","hearts, pink theme, kissing"],
    flamingo:["a pink poolside cabana","{partner} poses on one leg showing off, and her best friend pulls her onto a lounger","riding her on a lounger","the woman rides {partner} on the lounger by the pool","cowgirl position, pool, lounger","Gorgeous♡ Let me ride♡","FABULOUS♡","pool, lounger, pink theme"],
    kraken:["an aquarium room","{partner} calmly reveals her new cock and her best friend, delighted, pulls her close","lying on a padded bench, legs wrapped around her","{partner} fucks the woman on the padded bench, their legs entwined","missionary, entwined legs","Oh, let me♡","DEEPER♡","aquarium, blue theme"],
    salmon:["a photo studio","{partner} poses with her new cock and her best friend sets the camera on a timer, grinning","bent over a studio stool","{partner} fucks the woman over the studio stool as the timer flashes","sex from behind, bent over, camera flash","For the album♡","WHAT A SHOT♡","photo studio, camera flash"],
    crow:["a moonlit gothic bedroom","{partner} giggles and shows off her shiny cursed ring and new cock, and her best friend laughs and tackles her onto the bed","riding her on the bed","the woman rides {partner}, both giggling and kissing","cowgirl position, kissing","Ooh, let me try♡","CAW♡","gothic, moonlight, bed"]};
  const AHE="blissful, cross-eyed ahegao with heart eyes and her tongue out";
  START.option("expression",AHE,G);START.option("expression","flushed, heart-eyed smile",G);
  START.add("Academy Futa Best Friends",ACAD.HOUSES.filter(h=>BF[h]).map(h=>{const fr=PAL[h],[place,p1,pose,p2,acts,q1,q2,tags]=BF[h];
    START.option("posture",pose,G);
    const futa=ACAD.robes(h),c1=C1({expression:AHE,posture:pose,vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting"});
    const scene=`The image is split into two scenes in ${place}. Two best friends: {partner} has a thick, veiny futanari penis. In the first scene, ${p1}, the woman saying "${q1}" with a heart. In the second scene, ${p2}. The futanari penis is buried to the hilt in the woman's vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {partner} cums. The woman makes a blissful, cross-eyed ahegao with heart eyes and her tongue out and cries "${q2}" with hearts, cum overflowing from her vagina. `+
      dedupe("2koma, futanari, futa with female, best friends, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat, "+acts+", "+tags);
    return{id:h+"futafriend",base:ACAD.robes(fr),name:cap(h)+" and "+cap(fr),c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
      out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
        pair:{id:futa,outfit:nudeAt(futa),scene,act:"sex, vaginal, creampie, "+acts,dir:"ba",explicit:true,penis:true,
          pc:{expression:"flushed, heart-eyed smile",posture:null,age:"woman"},c1,compact:false,fit:true}},
      tags:["futanari","best friends","yuri","explicit","sex","pair",h,fr],
      blurb:`${cap(h)}, as a futanari, with her best friend ${cap(fr)}: ${acts.split(", ")[0]}, then a creampie. Character 1 is ${cap(fr)}; ${cap(h)} is character 2 in the Scene tab.`};
  }),{after:"Academy Futa Masturbation"});
})();

/* ---- v167: twenty-three more Academy sets, one girl per house (all eighteen, Owl and Rat included), each with a main
   outfit, a lewder second outfit and Nude. Not explicit (the Strip Club is lewd, not explicit).
   Everyday: Bartenders, Lazy Sunday.  Seasons and travel: Road Trip, Spring Blossoms, Autumn Harvest, New Year's Eve,
   Tropical Island, City Postcards.  Costumes: French Maids, Belly Dancers, Qipao, Geishas, Firefighters, Police, Military,
   Steampunk, Latex.  Fantasy: Dragon Riders, Goddesses, Elementals, Fairies.  Sensual: Artists' Models.  Exhibition: Strip Club.
   Penguin, Owl and Rat each get a look thought through for them in every set (Penguin's always somewhere snowy). */
(function(){
  const{set,cap}=ACAD;
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const setMust=(id,s)=>{const t=tplById(id);if(t)t.out=Object.assign({},t.out,{must:must(s)})};
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression",
    owl:"knowing, half-lidded smile",rat:"cheeky, scheming grin"};
  const SX={griffin:"seductive smile",badger:"biting her lip",raven:"half-lidded sultry gaze",serpent:"come-hither look",wolf:"teasing tongue-out expression",swan:"half-lidded sultry gaze",
    dragon:"smoldering sultry expression",stag:"biting her lip",shark:"teasing tongue-out expression",penguin:"bright cheerful expression",fox:"come-hither look",
    lovebird:"seductive smile",flamingo:"half-lidded sultry gaze",kraken:"cool, otherworldly half-smile",salmon:"seductive smile",crow:"mischievous expression",
    owl:"knowing, half-lidded smile",rat:"teasing tongue-out expression"};
  /* each house's motif, for embroidery, prints and crests */
  const MOT={griffin:"griffin-wing",badger:"honeycomb",raven:"raven-feather",serpent:"coiled-serpent",wolf:"howling-wolf",swan:"swan",dragon:"dragon",stag:"antler-and-oak-leaf",
    shark:"wave-and-fin",penguin:"snowflake",fox:"fox-tail",lovebird:"heart-and-lovebird",flamingo:"flamingo",kraken:"tentacle",salmon:"leaping-salmon",crow:"crescent-moon",
    owl:"owl-and-moon",rat:"key-and-rat"};
  const reg=(items,tier,fam)=>Object.entries(items||{}).forEach(([f,a])=>{if(a&&a[0])START.item(f,a[0],tier,fam)});
  const clean=o=>{Object.keys(o).forEach(k=>o[k]==null&&delete o[k]);return o};
  const cyc=(l,i)=>l[i%l.length];
  function quick(label,after,suf,nameSuf,look,o){
    const per=o.per||{},exm=o.ex==="sultry"?SX:(o.ex||EX);
    const rows=H.map((h,i)=>{const p=per[h]||{};
      const items=clean(Object.assign({},o.main(h,i),p.items||{}));reg(items,"US",look);
      const pose=p.pose||(o.pose?o.pose(h,i):cyc(o.poses,i)),ex=p.ex||exm[h]||EX[h];
      START.option("posture",pose,"Posture");START.option("expression",ex,"Sultry (adult)");
      const more=[];
      if(o.second){const si=clean(Object.assign({},o.second.items(h,i),p.second||{}));reg(si,"L",(o.second.look||"boudoir")+",boudoir");
        more.push({oname:o.second.oname,look:o.second.look||"boudoir",items:si})}
      (p.more||[]).forEach(m=>{reg(m.items,"US",m.look||look);more.push(m)});
      const c=Object.assign({},o.cOf?o.cOf(h):{},p.c||{});Object.entries(c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@")START.option(f,v,"Academy")});
      return[h,items,ex,pose,typeof o.theme==="function"?o.theme(h):o.theme,{c,more}];
    });
    Object.entries(o.c||{}).forEach(([f,v])=>{if(typeof v==="string")START.option(f,v,"Academy")});
    set(label,after,suf,nameSuf,look,{tags:o.tags,oname:o.oname,c:o.c,must:must(o.must)},rows);
    H.forEach(h=>{const p=per[h]||{};const m=p.must||(o.mustOf&&o.mustOf(h));if(m)setMust(h+suf,m)});
  }

  /* ======================= Bartenders ======================= */
  const DRINK={griffin:"flaming whiskey cocktail",badger:"honey bourbon cocktail",raven:"inky black martini",serpent:"glowing emerald absinthe",wolf:"smoky old fashioned",
    swan:"pearl-garnished champagne coupe",dragon:"flaming shot glass",stag:"herb-garnished gin and tonic",shark:"blue ocean margarita",penguin:"steaming hot toddy",
    fox:"smoking whiskey sour",lovebird:"pink cosmopolitan with a heart garnish",flamingo:"frozen pink daiquiri",kraken:"black ink rum cocktail",salmon:"cedar cup of sake",
    crow:"cocktail glittering with gold flakes",owl:"midnight espresso martini",rat:"dusty bottle of contraband rum"};
  quick("Academy Bartenders","Academy Cafe Maids","bartender","bartender","glam",{tags:["bartender","cocktail","speakeasy"],oname:"Behind the bar",
    must:"a dim speakeasy bar glowing with amber light and shelves of bottles",theme:h=>"a bartender serving a "+DRINK[h],
    main:h=>({top:["{c} fitted vest over a {c2} unbuttoned dress shirt with rolled sleeves","@primary",null,"@secondary"],bottom:["high-waisted pencil skirt","@primary"],
      neckAccessory:["{c} satin bow tie","@accent"],legwear:["sheer black tights and stiletto heels","black"],heldItem:[DRINK[h]]}),
    poses:["shaking a cocktail shaker over her shoulder","leaning on the bar on her elbows","pouring a drink from high above the glass","sliding a drink across the bar with a wink"],
    second:{oname:"Last call",items:()=>({top:["{c} vest worn open over a {c2} lace bra","@primary",null,"@secondary"],bottom:["{c} pencil skirt hiked up over a {c2} garter belt","@primary",null,"black"],
      legwear:["sheer {c} thigh-high stockings with garter straps","black"]})},
    per:{penguin:{pose:"warming a hot toddy over a candle",must:"a cozy ski-lodge bar with a roaring fire, snow falling past the windows"},
      owl:{pose:"leaning on the bar on her elbows",must:"a secret bar hidden behind a library bookcase, lit by green banker's lamps"},
      rat:{pose:"sliding a drink across the bar with a wink",must:"a back-alley dive bar with flickering neon and mismatched stools"}}});

  /* ======================= Lazy Sunday ======================= */
  quick("Academy Lazy Sunday","Academy Pajama Day","sunday","lazy Sunday","casual",{tags:["lazy day","hoodie","couch","cozy"],oname:"Lazy Sunday",
    must:"a cozy, messy living room on a rainy Sunday, takeout boxes on the table and a glowing TV",theme:"a lazy Sunday on the couch",
    main:(h,i)=>({top:["oversized {c} hoodie","@primary"],bottom:["{c} sleep shorts","@secondary"],legwear:["{c} fuzzy socks","@secondary"],
      heldItem:[cyc(["takeout box with chopsticks","game controller","bowl of ramen","phone"],i)]}),
    poses:["sprawled across the couch","lying upside down on the couch, legs over the back","sitting cross-legged on the couch with takeout","curled up under a blanket"],
    second:{oname:"No pants",look:"casual",items:()=>({top:["oversized {c} hoodie","@primary"],panties:["{c} cotton panties","@secondary"],legwear:["{c} fuzzy socks","@secondary"]})},
    per:{penguin:{items:{heldItem:["mug of cocoa"]},pose:"curled up under a blanket",must:"a cozy living room on a snow day, snow piling up on the windowsill and a glowing TV"},
      owl:{items:{heldItem:["stack of library books"]},pose:"sprawled across the couch",must:"a cozy reading nook piled with books on a rainy afternoon"},
      rat:{items:{heldItem:["slice of pizza"]},pose:"sitting cross-legged on the couch with takeout",must:"a messy studio apartment full of thrifted treasures and pizza boxes"}}});
  START.item("panties","{c} cotton panties","L","casual,boudoir");

  /* ======================= Road Trip ======================= */
  quick("Academy Road Trip","Academy Vacation","roadtrip","road trip","casual",{tags:["road trip","convertible","denim shorts"],oname:"Road trip",
    must:"a desert highway at sunset with a vintage convertible and a gas station's neon sign",theme:"a summer road trip",
    main:(h,i)=>({top:["{c} cropped tank top","@primary"],bottom:["{c} distressed denim cutoffs","@secondary"],eyewear:["cat-eye sunglasses","@accent"],legwear:["{c} cowboy boots","@secondary"],
      heldItem:[cyc(["road map","gas station slushie","instant camera"],i)]}),
    poses:["sitting on the hood of a convertible","lounging with her feet on the dashboard","leaning on a gas pump","hanging out the window of a moving car"],
    second:{oname:"Motel pool",items:()=>({top:["{c} string bikini top","@primary"],bottom:["{c} string bikini bottoms","@primary"],eyewear:["cat-eye sunglasses","@accent"]})},
    per:{penguin:{items:{outerwear:["{c} cropped puffer jacket","@secondary"],legwear:["{c} snow boots","@secondary"],heldItem:["thermos of cocoa"]},pose:"sitting on the hood of a convertible",
        must:"a snowy mountain pass pull-off, a convertible dusted with snow and pine trees all around"},
      owl:{pose:"lounging with her feet on the dashboard",must:"a desert highway at night under a sky full of stars, headlights glowing"},
      rat:{pose:"hanging out the window of a moving car",must:"a city highway at night with the skyline blurring past"}}});
  ["{c} string bikini top","{c} string bikini bottoms"].forEach((v,i)=>START.item(i?"bottom":"top",v,"L","resort,boudoir"));

  /* ======================= Spring Blossoms ======================= */
  quick("Academy Spring Blossoms","Academy Summer Days","spring","spring","resort",{tags:["spring","cherry blossoms","kimono"],oname:"Hanami",
    must:"a cherry blossom grove in full bloom, petals drifting through the air",theme:"a spring day under the cherry blossoms",
    main:(h,i)=>({top:[`sheer {c} short kimono with {c2} ${MOT[h]} and cherry blossom print, loosely tied`,"@secondary",null,"@primary"],headwear:["{c} cherry blossom hair ornament","@primary"],
      legwear:["wooden geta sandals","@secondary"],heldItem:[cyc(["paper parasol","sakura branch","cup of tea"],i)]}),
    poses:["twirling under the cherry blossoms","sitting on a picnic blanket under the trees","reaching up to a blossoming branch","walking under a paper parasol"],
    second:{oname:"Petals",items:h=>({top:[`sheer {c} short kimono with {c2} ${MOT[h]} and cherry blossom print, slipping off her shoulders`,"@secondary",null,"@primary"],headwear:["{c} cherry blossom hair ornament","@primary"]})},
    per:{penguin:{pose:"reaching up to a blossoming branch",must:"a cherry blossom grove dusted with a late spring snowfall, pink petals and snowflakes falling together"},
      owl:{pose:"sitting on a picnic blanket under the trees",must:"a cherry blossom grove at night lit by paper lanterns under the moon"},
      rat:{pose:"sitting on a picnic blanket under the trees",must:"a crowded city park in cherry blossom season, picnic blankets everywhere"}}});

  /* ======================= Autumn Harvest ======================= */
  quick("Academy Autumn Harvest","Academy Spring Blossoms","autumn","autumn","cottage",{tags:["autumn","orchard","sweater","pumpkins"],oname:"Harvest",
    must:"an autumn orchard with red and gold leaves, apple trees and pumpkins",theme:"an autumn harvest",
    main:(h,i)=>({top:["{c} cropped cable-knit sweater slipping off one shoulder","@primary"],bottom:["{c} plaid micro skirt","@secondary"],legwear:["{c} over-the-knee boots","@secondary"],
      heldItem:[cyc(["basket of apples","small pumpkin","cup of hot cider"],i)]}),
    poses:["picking apples from a ladder","sitting on a hay bale with a pumpkin","kicking up a pile of leaves","carrying a basket of apples on her hip"],
    second:{oname:"Hayloft",items:()=>({top:["{c} flannel shirt open over a {c2} lace bra","@secondary",null,"@primary"],bottom:["{c} denim micro shorts","@secondary"]})},
    per:{penguin:{items:{heldItem:["cup of hot cider"]},pose:"kicking up a pile of leaves",must:"an orchard in late autumn as the first snow falls on red leaves and pumpkins"},
      owl:{pose:"sitting on a hay bale with a pumpkin",must:"an orchard at dusk under a huge harvest moon, an owl calling from the barn"},
      rat:{items:{heldItem:["wedge of cheese"]},pose:"sitting on a hay bale with a pumpkin",must:"a busy harvest market with cheese stalls, pumpkins and apple crates"}}});

  /* ======================= New Year's Eve ======================= */
  quick("Academy New Year's Eve","Academy Valentine's","newyear","New Year's Eve","glam",{tags:["new year's eve","party","sequins","fireworks"],oname:"Midnight",ex:"sultry",
    must:"a rooftop party at midnight with fireworks bursting over the city skyline",theme:"a New Year's Eve party",
    main:(h,i)=>({top:["{c} sequin mini dress with a plunging neckline and an open back","@primary"],legwear:["{c} glittering stiletto heels","@accent"],headwear:["{c} glittering party tiara","@accent"],
      heldItem:[cyc(["champagne flute","sparkler","party horn"],i)]}),
    poses:["raising a champagne flute to the fireworks","holding up a sparkler","blowing a kiss at midnight","dancing with confetti falling around her"],
    second:{oname:"After midnight",items:()=>({bra:["{c} sequin bra","@primary"],panties:["{c} lace panties","@primary"],legwear:["{c} glittering stiletto heels","@accent"]})},
    per:{penguin:{pose:"holding up a sparkler",ex:"bright cheerful expression",must:"a snowy rooftop at midnight, fireworks bursting over a frozen harbor and snow drifting down"},
      owl:{pose:"raising a champagne flute to the fireworks",must:"the roof of the Academy library at midnight, fireworks over the clock tower"},
      rat:{pose:"dancing with confetti falling around her",must:"a crowded city square at midnight under a giant countdown screen, confetti everywhere"}}});
  START.item("bra","{c} sequin bra","L","glam,boudoir");START.item("panties","{c} lace panties","L","boudoir");

  /* ======================= Tropical Island ======================= */
  quick("Academy Tropical Island","Academy Vacation","island","island","resort",{tags:["tropical","island","lei","bikini"],oname:"Island",c:{skinFinish:"sun-kissed skin with a dewy glow"},
    must:"a tropical island with a waterfall pool, palm trees and turquoise water",theme:"a tropical island getaway",
    main:h=>({top:["{c} hibiscus-print bikini top","@primary"],bottom:["{c} grass skirt over a {c2} bikini bottom","@extra",null,"@primary"],neckAccessory:["{c} flower lei","@accent"],
      headwear:["{c} hibiscus flower behind her ear","@accent"]}),
    poses:["dancing hula on the beach","wading into a waterfall pool","lounging in a hammock between palms","climbing a leaning palm tree"],
    second:{oname:"Waterfall",items:()=>({top:["{c} string bikini top","@primary"],bottom:["{c} string bikini bottoms","@primary"],neckAccessory:["{c} flower lei","@accent"]})},
    per:{penguin:{pose:"wading into the surf",must:"a volcanic island beach of black lava rock where little penguins waddle along the shore under the equator sun"},
      owl:{pose:"lounging in a hammock between palms",must:"a tropical island beach at night under a sky thick with stars, a bonfire glowing"},
      rat:{pose:"climbing a leaning palm tree",must:"a pirate-cove island beach with a half-buried treasure chest"}}});

  /* ======================= City Postcards ======================= */
  const CITY={griffin:["Rome","Rome at golden hour beside the Colosseum","cone of gelato"],badger:["Amsterdam","an Amsterdam canal lined with tulips and bicycles","bunch of tulips"],
    raven:["Prague","a misty Prague square before the old astronomical clock","guidebook"],serpent:["Monaco","a Monte Carlo casino terrace overlooking yachts","stack of casino chips"],
    wolf:["Banff","a turquoise lake ringed by the Canadian Rockies","thermos"],swan:["Paris","a Paris balcony with the Eiffel Tower glittering at night","croissant"],
    dragon:["Hong Kong","a neon-lit Hong Kong street at night","paper lantern"],stag:["Kyoto","a Kyoto bamboo grove path","matcha cup"],
    shark:["Sydney","Sydney harbor with the Opera House behind her","surfboard"],penguin:["Reykjavik","Reykjavik under the northern lights, snow on colorful rooftops","mug of cocoa"],
    fox:["Tokyo","the Shibuya crossing in Tokyo at night","shopping bags"],lovebird:["Venice","a Venice canal in a gondola at sunset","single red rose"],
    flamingo:["Miami","Miami Beach's pastel art deco hotels","pink cocktail"],kraken:["Santorini","Santorini's white walls and blue domes above the sea","glass of wine"],
    salmon:["Seattle","Seattle's Pike Place fish market","bouquet of flowers"],crow:["London","the Tower of London with its ravens","red umbrella"],
    owl:["Oxford","an Oxford college library quad at night","old leather book"],rat:["New York","a New York subway platform and graffiti","folded slice of pizza"]};
  quick("Academy City Postcards","Academy Road Trip","postcard","postcard","casual",{tags:["travel","city","postcard"],oname:"Sightseeing",
    must:"a famous city",theme:h=>"a postcard from "+CITY[h][0],mustOf:h=>CITY[h][1],
    main:h=>({top:["{c} wrap mini dress with a plunging neckline","@primary"],outerwear:["{c} cropped jacket","@secondary"],legwear:["{c} ankle boots","@secondary"],heldItem:[CITY[h][2]]}),
    poses:["posing for a photo with a wink","strolling with her hands in her jacket","leaning on a railing taking in the view","holding up a souvenir"],
    second:{oname:"Hotel window",items:()=>({bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"],outerwear:["sheer {c} hotel robe","@secondary"]})},
    per:{penguin:{items:{outerwear:["{c} cropped puffer jacket","@secondary"],legwear:["{c} snow boots","@secondary"]},pose:"posing for a photo with a wink"}}});

  /* ======================= French Maids ======================= */
  quick("Academy French Maids","Academy Cafe Maids","frenchmaid","French maid","costume",{tags:["french maid","maid","stockings"],oname:"French maid",ex:"sultry",
    must:"a grand mansion hall with a crystal chandelier and marble stairs",theme:"a French maid",
    main:(h,i)=>({top:["{c} French maid dress with a plunging neckline, a micro-length skirt and a {c2} frilled apron","black",null,"white"],headwear:["{c} frilled maid headband","white"],
      legwear:["sheer {c} thigh-high stockings with garter straps","black"],neckAccessory:["detached {c} collar with a bow tie","@accent"],heldItem:[cyc(["feather duster","silver tray with tea"],i)]}),
    poses:["dusting a high shelf on tiptoe","bending over to polish the banister","curtsying with her skirt lifted","serving tea on a silver tray"],
    second:{oname:"After service",items:()=>({top:["{c} frilled apron over {c2} lace lingerie","white",null,"@primary"],headwear:["{c} frilled maid headband","white"],legwear:["sheer {c} thigh-high stockings with garter straps","black"]})},
    per:{penguin:{pose:"serving tea on a silver tray",ex:"bright cheerful expression",must:"a snowbound manor's library with a crackling fireplace and frosted windows"},
      owl:{pose:"dusting a high shelf on tiptoe",must:"a mansion's towering private library at night, rolling ladders and candlelight"},
      rat:{pose:"bending over to polish the banister",must:"a grand mansion hall, her apron pocket bulging with pocketed silverware"}}});

  /* ======================= Belly Dancers ======================= */
  quick("Academy Belly Dancers","Academy Bunny Girls","bellydance","belly dancer","costume",{tags:["belly dancer","coin belt","veil"],oname:"Belly dancer",ex:"sultry",
    must:"a desert palace hall with lanterns, silk cushions and a fountain",theme:"a belly dancer",
    main:()=>({top:["{c} coin-trimmed bra top with {c2} beading","@primary",null,"@accent"],bottom:["sheer {c} harem pants slung low on the hips with a {c2} coin belt","@secondary",null,"@accent"],
      maskAccessory:["{c} sheer face veil","@secondary"],wristAccessory:["{c} stacked bangles","@accent"]}),
    poses:["swaying her hips mid-dance, arms raised","spinning with a flowing veil","dancing in a slow backbend","kneeling on silk cushions"],
    second:{oname:"Seven veils",items:()=>({top:["a few sheer {c} veils draped barely across her body","@secondary"],wristAccessory:["{c} stacked bangles","@accent"]})},
    per:{penguin:{pose:"spinning with a flowing veil",ex:"bright cheerful expression",must:"a desert palace courtyard at night as a rare snow falls on the dunes and lanterns"},
      owl:{pose:"dancing in a slow backbend",must:"a palace hall at midnight lit by a hundred lanterns under a starry dome"},
      rat:{pose:"swaying her hips mid-dance, arms raised",must:"a bustling night bazaar with spice stalls and hanging rugs"}}});

  /* ======================= Qipao ======================= */
  quick("Academy Qipao","Academy Ballgowns","qipao","qipao","glam",{tags:["qipao","china dress","silk"],oname:"Qipao",ex:"sultry",
    must:"a lantern-lit old Shanghai street at night",theme:"a silk qipao",
    main:(h,i)=>({top:[`{c} silk qipao with {c2} ${MOT[h]} embroidery, a high side slit and a keyhole cutout`,"@primary",null,"@accent"],headwear:["{c} jade hairpin","@accent"],
      legwear:["{c} strappy heels","@secondary"],heldItem:[cyc(["silk fan","teacup","red paper lantern"],i)]}),
    poses:["leaning on a lacquered balcony rail","sitting with her legs crossed through the slit","walking down a lantern-lit street","fanning herself in a doorway"],
    second:{oname:"Slit to the waist",items:h=>({top:[`{c} silk qipao with {c2} ${MOT[h]} embroidery, slit to the waist on both sides`,"@primary",null,"@accent"],headwear:["{c} jade hairpin","@accent"]})},
    per:{penguin:{pose:"walking down a lantern-lit street",must:"a snowy lantern festival street at night, red lanterns glowing through falling snow"},
      owl:{pose:"leaning on a lacquered balcony rail",must:"a moonlit pagoda balcony above a sleeping city"},
      rat:{pose:"fanning herself in a doorway",must:"a smoky mahjong parlor down a back alley"}}});

  /* ======================= Geishas ======================= */
  quick("Academy Geishas","Academy Qipao","geisha","geisha","glam",{tags:["geisha","kimono","kanzashi"],oname:"Geisha",
    must:"a lantern-lit teahouse in Gion at night",theme:"a geisha",
    main:(h,i)=>({top:[`{c} silk kimono with {c2} ${MOT[h]} embroidery, worn low off the shoulders with a wide obi`,"@primary",null,"@accent"],headwear:["{c} kanzashi hairpins","@accent"],
      legwear:["wooden geta sandals","@secondary"],heldItem:[cyc(["folding fan","paper umbrella","sake cup"],i)]}),
    poses:["kneeling to pour sake","peeking over a folding fan","walking under a paper umbrella","dancing slowly with a fan"],
    second:{oname:"Obi undone",items:h=>({top:[`{c} silk kimono with {c2} ${MOT[h]} embroidery, falling open with the obi untied`,"@primary",null,"@accent"],headwear:["{c} kanzashi hairpins","@accent"]})},
    per:{penguin:{pose:"walking under a paper umbrella",must:"a teahouse garden in deep snow, stone lanterns glowing"},
      owl:{pose:"kneeling to pour sake",must:"a quiet teahouse room at midnight, a full moon through the shoji"},
      rat:{pose:"peeking over a folding fan",must:"a lively teahouse party, sake cups and card games scattered across the tatami"}}});

  /* ======================= Firefighters ======================= */
  quick("Academy Firefighters","Academy Racing Queens","fire","firefighter","costume",{tags:["firefighter","fire truck","suspenders"],oname:"Firefighter",ex:"sultry",
    must:"a firehouse bay with a gleaming red fire engine",theme:"a sexy firefighter",
    main:(h,i)=>({top:["{c} turnout jacket open over a {c2} sports bra","@primary",null,"@secondary"],bottom:["{c} turnout trousers held up by suspenders","@primary"],
      headwear:["{c} firefighter helmet","@accent"],heldItem:[cyc(["fire hose","fire axe"],i)]}),
    poses:["spraying a fire hose","leaning on the fire engine's bumper","sliding down the fire pole","wiping soot from her cheek"],
    second:{oname:"Calendar shoot",items:()=>({top:["{c} suspenders over her bare chest","@accent"],bottom:["{c} turnout trousers","@primary"],headwear:["{c} firefighter helmet","@accent"]})},
    per:{penguin:{pose:"leaning on the fire engine's bumper",must:"a mountain fire station in deep snow, icicles on the bay doors"},
      owl:{pose:"wiping soot from her cheek",must:"a firehouse at night, the engine's lights glowing in the dark bay"},
      rat:{pose:"sliding down the fire pole",must:"a city firehouse with the bay doors open onto a busy street"}}});

  /* ======================= Police ======================= */
  quick("Academy Police","Academy Firefighters","police","police officer","costume",{tags:["police","handcuffs","police cap"],oname:"Police",ex:"sultry",
    must:"a city street at night lit by flashing patrol car lights",theme:"a sexy police officer",
    main:()=>({top:["{c} fitted police shirt unbuttoned to show a {c2} bra","@primary",null,"@secondary"],bottom:["{c} micro police skirt","@primary"],headwear:["{c} police cap","@primary"],
      waistAccessory:["{c} duty belt with handcuffs","black"],eyewear:["aviator sunglasses","-"],legwear:["{c} thigh-high boots","@primary"]}),
    poses:["twirling a pair of handcuffs","writing a ticket on a motorcycle","leaning on a patrol car","blowing a whistle"],
    second:{oname:"Off duty",items:()=>({bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"],headwear:["{c} police cap","@primary"],waistAccessory:["{c} duty belt with handcuffs","black"]})},
    per:{penguin:{pose:"leaning on a patrol car",must:"a snowy mountain town at night, a patrol car's lights flashing on the snow"},
      owl:{pose:"writing a ticket on a motorcycle",must:"a detective's office at night, case files pinned to the wall"},
      rat:{pose:"twirling a pair of handcuffs",ex:"cheeky, scheming grin",must:"a precinct evidence room she definitely should not be in"}}});

  /* ======================= Military ======================= */
  quick("Academy Military","Academy Police","military","soldier","costume",{tags:["military","combat boots","dog tags"],oname:"Military",
    must:"a sunlit military airfield with a jet and an open hangar",theme:"a sexy soldier",
    main:()=>({top:["{c} fitted military jacket open over a {c2} tank top","@primary",null,"@secondary"],bottom:["{c} cargo micro shorts","@primary"],headwear:["{c} beret","@accent"],
      neckAccessory:["dog tags on a chain","-"],legwear:["{c} combat boots","black"]}),
    poses:["saluting","leaning on a jeep","sitting on an ammo crate","standing at attention"],
    second:{oname:"At ease",items:()=>({top:["{c} tank top","@secondary"],panties:["{c} cotton panties","@primary"],neckAccessory:["dog tags on a chain","-"],legwear:["{c} combat boots","black"]})},
    per:{penguin:{items:{outerwear:["{c} fur-lined parka","white"]},pose:"saluting",must:"an Antarctic research base in the snow with a ski plane on the ice"},
      owl:{pose:"standing at attention",must:"a dark command center lit by radar screens at night"},
      rat:{pose:"sitting on an ammo crate",must:"a supply depot stacked with crates she is quietly helping herself to"}}});
  ["{c} tank top"].forEach(v=>START.item("top",v,"L","casual,boudoir"));

  /* ======================= Steampunk ======================= */
  quick("Academy Steampunk","Academy Victorian","steampunk","steampunk","costume",{tags:["steampunk","goggles","corset","airship"],oname:"Steampunk",
    must:"the deck of a brass airship above a city of chimneys and gears",theme:"a steampunk adventurer",
    main:(h,i)=>({top:["{c} leather corset over a {c2} ruffled blouse","@primary",null,"@secondary"],bottom:["{c} bustled micro skirt","@secondary"],headwear:["{c} small top hat with brass goggles","@primary"],
      gloves:["{c} leather gloves","@primary"],legwear:["{c} lace-up boots","@primary"],heldItem:[cyc(["brass ray pistol","pocket watch","oversized wrench"],i)]}),
    poses:["standing at the airship's wheel","tinkering with a brass engine","leaning over the railing with a spyglass","adjusting her goggles"],
    second:{oname:"Engine room",items:()=>({top:["{c} leather corset over bare skin, smudged with oil","@primary"],headwear:["{c} small top hat with brass goggles","@primary"]})},
    per:{penguin:{pose:"leaning over the railing with a spyglass",must:"a brass airship sailing over icy mountain peaks and glaciers"},
      owl:{pose:"leaning over the railing with a spyglass",must:"an airship observatory deck under the stars, brass telescopes everywhere"},
      rat:{items:{heldItem:["oversized wrench"]},pose:"tinkering with a brass engine",must:"a cluttered airship engine room full of pipes, steam and salvaged parts"}}});

  /* ======================= Latex ======================= */
  quick("Academy Latex","Academy Steampunk","latex","latex","glam",{tags:["latex","catsuit","glossy"],oname:"Latex",ex:"sultry",c:{skinFinish:"glossy, high-shine skin"},
    must:"a high-gloss photo studio with a mirror floor and hard light",theme:"a glossy latex look",
    main:()=>({top:["{c} glossy latex catsuit unzipped to the navel","@primary"],gloves:["{c} latex opera gloves","@primary"],legwear:["{c} latex thigh-high boots","@primary"]}),
    poses:["posing against a white wall, one hand on her hip","kneeling on the mirror floor","stretching on her back on the mirror floor","standing with her back arched to the camera"],
    second:{oname:"Latex lingerie",items:()=>({bra:["{c} latex micro bra","@primary"],panties:["{c} latex micro thong","@primary"],legwear:["{c} latex thigh-high boots","@primary"]})},
    per:{penguin:{pose:"kneeling on the mirror floor",must:"an all-white studio with fake snow falling through hard light"},
      owl:{pose:"standing with her back arched to the camera",must:"a dark studio lit by a single moonlike spotlight"},
      rat:{pose:"kneeling on the mirror floor",must:"a grungy warehouse studio with graffiti and a chain-link fence"}}});

  /* ======================= Dragon Riders ======================= */
  const DR={griffin:"a golden dragon with feathered wings",badger:"a stout, earth-brown dragon",raven:"a midnight-black dragon with starry wings",serpent:"a long, emerald wyrm",
    wolf:"a frost-gray dragon with a wolf-like mane",swan:"a pearl-white dragon with feathered wings",dragon:"an enormous crimson dragon breathing fire",stag:"a moss-covered forest dragon with antler horns",
    shark:"a blue sea dragon with fins",penguin:"a glittering ice dragon",fox:"a nine-tailed fire dragon",lovebird:"a small, peach-colored dragon with heart-shaped scales",
    flamingo:"a pink dragon with long legs",kraken:"a deep-sea dragon trailing tentacles",salmon:"a silver river dragon",crow:"a black dragon dripping with stolen jewels",
    owl:"a tawny night dragon with owl-like feathers and huge amber eyes",rat:"a scrappy gray wyvern with a notched ear"};
  quick("Academy Dragon Riders","Academy Knights","dragonrider","dragon rider","costume",{tags:["dragon rider","dragon","riding","fantasy"],oname:"Dragon rider",
    must:"a sky full of clouds",theme:h=>"a rider on "+DR[h],mustOf:h=>`riding ${DR[h]} high above the clouds, wind in her hair`,
    main:()=>({top:["{c} fitted leather riding corset with {c2} buckles","@primary",null,"@accent"],bottom:["{c} leather riding micro skirt","@secondary"],gloves:["{c} riding gloves","@secondary"],
      legwear:["{c} thigh-high riding boots","@secondary"],outerwear:["{c} flowing riding cape","@primary"]}),
    pose:()=>"riding astride her dragon, leaning into the wind",
    second:{oname:"Dragon's rest",items:()=>({bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"],outerwear:["{c} flowing riding cape","@primary"]})},
    per:{penguin:{must:"riding a glittering ice dragon over glaciers and snowy peaks, snow streaming past"},
      owl:{must:"riding a tawny night dragon with owl-like feathers under a full moon, silent as an owl"},
      rat:{must:"riding a scrappy gray wyvern low over the rooftops of a city at dusk, laughing"}}});

  /* ======================= Goddesses ======================= */
  const GD={griffin:["the sun","golden sun-ray crown","golden radiance","a sunlit marble temple in the sky"],badger:["the harvest","wheat-sheaf crown","golden radiance","a temple of golden fields and overflowing harvest baskets"],
    raven:["fate","crown of silver threads","moonlit aura","a temple of looms weaving glowing threads of fate"],serpent:["temptation","crown of coiled serpents","faint demonic aura","a temple garden with a single golden apple tree"],
    wolf:["the hunt","crescent-moon crown","moonlit aura","a moonlit forest temple with a silver bow on the altar"],swan:["grace","swan-feather crown","angelic radiance","a white marble temple on a moonlit lake"],
    dragon:["war","crimson battle crown","blazing flame aura","a temple of war hung with banners and burning braziers"],stag:["the forest","antler crown woven with flowers","verdant forest aura","an ancient temple overgrown with vines and blossoms"],
    shark:["the sea","coral and pearl crown","watery aura","an underwater temple of coral and pearls"],penguin:["winter","crown of ice crystals","frosty mist aura","an ice temple on a glacier under the aurora"],
    fox:["trickery","crown of foxfire","magical aura","a shrine of a thousand torii gates lit with blue foxfire"],lovebird:["love","crown of roses","celestial aura","a temple of roses and doves"],
    flamingo:["the sunset","crown of pink feathers","golden radiance","a temple on a pink lagoon at sunset"],kraken:["the deep","crown of black pearls","watery aura","a sunken temple in the dark depths"],
    salmon:["rivers","crown of river reeds and silver scales","watery aura","a temple at the head of a roaring waterfall"],crow:["fortune","crown of glittering stolen jewels","starlight aura","a temple overflowing with gold and treasure"],
    owl:["wisdom","crown of laurel and silver owl feathers","starlight aura","a moonlit temple library of endless scrolls"],rat:["thieves and lost things","crown of mismatched keys","smoky magical aura","a hidden temple heaped with every lost thing in the world"]};
  quick("Academy Goddesses","Academy Angels","goddess","goddess","glam",{tags:["goddess","divine","gown","crown"],oname:"Goddess",
    must:"a divine temple",theme:h=>"the goddess of "+GD[h][0],mustOf:h=>GD[h][3],cOf:h=>({auraStyle:GD[h][2]}),
    main:h=>({top:["sheer {c} one-shoulder goddess gown slit to the hip","@primary"],headwear:[GD[h][1],"-"],wristAccessory:["{c} arm cuffs","@accent"],legwear:["{c} lace-up gladiator sandals","@accent"]}),
    pose:()=>"floating with her arms open, radiating light",
    second:{oname:"Divine",items:h=>({top:["sheer {c} veil draped barely across her body","@primary"],headwear:[GD[h][1],"-"]})},
    per:{penguin:{ex:"serene expression"}}});
  Object.values(GD).forEach(g=>START.option("auraStyle",g[2],"Aura"));

  /* ======================= Elementals ======================= */
  const EL={griffin:["lightning","crackling lightning","lightning aura",null,"lightning-shaped marks down the arms"],badger:["earth","glittering stone and amber","golden radiance","stone skin",null],
    raven:["shadow","living shadow","shadowy aura","smoke tail (no legs)",null],serpent:["venom","glowing green venom","faint demonic aura",null,"scales along the neck"],
    wolf:["wind","swirling wind and snowflakes","wind-swept aura",null,null],swan:["cloud","soft white cloud","angelic radiance","mist trail (no legs)",null],
    dragon:["fire","living flame","blazing flame aura","flame-and-ember trail (no legs)","ember lines down the arms"],stag:["wood","living vines and blossoms","verdant forest aura","bark skin and vines",null],
    shark:["ocean","churning seawater","watery aura","watery translucent limbs",null],penguin:["ice","glittering ice crystals","frosty mist aura",null,"frost patterns across the cheeks"],
    fox:["foxfire","blue foxfire","magical aura",null,"glowing runes along the neck"],lovebird:["rose quartz","glowing rose quartz crystal","crystalline aura",null,"crystals across the cheeks"],
    flamingo:["sunset light","shimmering sunset light","golden radiance",null,"aurora streaks across the cheeks"],kraken:["slime","translucent violet slime","watery aura","gelatinous body",null],
    salmon:["river water","rushing river water","watery aura","watery translucent limbs",null],crow:["silver","liquid silver","starlight aura",null,"gold leaf flecks across the collarbones"],
    owl:["starlight","drifting starlight","starlight aura",null,"constellations around the eyes"],rat:["smoke","curling smoke and sparks","smoky magical aura","smoke tail (no legs)",null]};
  quick("Academy Elementals","Academy Goddesses","elemental","elemental","costume",{tags:["elemental","magic","monster girl"],oname:"Elemental",ex:"sultry",
    must:"a swirling storm of magic",theme:h=>(/^[aeiou]/.test(EL[h][0])?"an ":"a ")+EL[h][0]+" elemental",mustOf:h=>`a magical landscape swirling with ${EL[h][1]}`,
    cOf:h=>{const c={auraStyle:EL[h][2]};if(EL[h][3])c.bodyForm=EL[h][3];if(EL[h][4])c.markings=EL[h][4];return c},
    main:h=>({top:[`a bikini of ${EL[h][1]} clinging to her body`,"-"]}),
    pose:()=>"floating with her element swirling around her",
    second:{oname:"Unleashed",items:h=>({top:[`wisps of ${EL[h][1]} barely covering her`,"-"]})}});

  /* ======================= Fairies ======================= */
  quick("Academy Fairies","Academy Elves","fairy","fairy","cottage",{tags:["fairy","fae","wings","flowers"],oname:"Fairy",c:{wingStyle:"translucent fairy wings",earStyle:"fae pointed ears",auraStyle:"fae shimmer"},
    must:"an enchanted moonlit meadow with glowing mushrooms and fireflies",theme:"a fae queen of the meadow",
    main:()=>({top:["{c} petal bodysuit with a plunging neckline","@primary"],headwear:["{c} flower crown","@accent"]}),
    poses:["sitting on a giant glowing mushroom","dancing in a fairy ring","hovering above the flowers","lounging on a giant leaf"],
    second:{oname:"Dewdrops",items:()=>({top:["strands of glittering dewdrops draped across her body","-"],headwear:["{c} flower crown","@accent"]})},
    per:{penguin:{pose:"hovering above the snow",must:"a snowy pine forest glittering with ice crystals and frost-covered mushrooms"},
      owl:{pose:"sitting on a giant glowing mushroom",must:"a moonlit forest hollow inside an ancient tree, glowing moths all around"},
      rat:{pose:"lounging on a giant leaf",must:"a hidden garden behind an old city wall, overgrown and glowing"}}});
  START.item("top","{c} petal bodysuit with a plunging neckline","US","cottage,costume");

  /* ======================= Artists' Models (Sensual) ======================= */
  quick("Academy Artists' Models","Academy Nude Photoshoot","lifemodel","artists' model","boudoir",{tags:["life drawing","nude model","art class"],oname:"Draped",
    must:"a sunlit art studio with easels and canvases all around and students sketching",theme:"a life-drawing model",
    main:()=>({top:["sheer {c} silk drape over one shoulder","@primary"]}),
    poses:["reclining on a draped chaise","sitting on a stool with one knee raised","standing in contrapposto","lying on her side with her head propped on one hand"],
    second:{oname:"Sketch break",look:"casual",items:()=>({top:["{c} paint-smeared oversized shirt","white"]})},
    per:{penguin:{pose:"sitting on a stool with one knee raised",must:"a winter art studio under a snowy skylight, students sketching around a little heater"},
      owl:{pose:"reclining on a draped chaise",must:"a night life-drawing class by lamplight, charcoal sketches pinned all around"},
      rat:{pose:"lying on her side with her head propped on one hand",must:"a cluttered artists' squat with graffiti walls and paint everywhere"}}});
  START.item("top","{c} paint-smeared oversized shirt","US","casual");

  /* ======================= Strip Club (Exhibition) ======================= */
  quick("Academy Strip Club","Academy Public Exhibition","strip","stripper","glam",{tags:["stripper","pole dance","strip club"],oname:"On stage",ex:"sultry",
    must:"a neon-lit strip club stage with a chrome pole and scattered bills",theme:"a pole dancer",
    main:()=>({top:["{c} rhinestone micro bikini top","@primary"],bottom:["{c} rhinestone micro thong","@primary"],legwear:["{c} clear platform heels","@secondary"],thighAccessory:["{c} lace garter stuffed with bills","@accent"]}),
    poses:["spinning upside down on the pole","sliding down the pole","crawling across the stage","dropping into a split on stage"],
    second:{oname:"Topless",items:()=>({bottom:["{c} rhinestone micro thong","@primary"],legwear:["{c} clear platform heels","@secondary"],thighAccessory:["{c} lace garter stuffed with bills","@accent"]})},
    per:{penguin:{pose:"sliding down the pole",ex:"bright cheerful expression",must:"an ice-themed lounge stage with frosted mirrors and a chrome pole glowing blue"},
      owl:{pose:"spinning upside down on the pole",must:"a dark, velvet-draped club lit by a single spotlight"},
      rat:{pose:"crawling across the stage",must:"a seedy neon club with sticky floors and a rowdy crowd"}}});
})();

/* ---- v167: eleven more explicit two-panel scene sets, all eighteen girls (Owl and Rat included), adult women (age "woman"),
   eager and mutual, held back by the safeguard like every explicit scene.
   With her boyfriend: Car Sex, Massage, Sex Tape, Glory Hole, Lap Dance, Edging, Gangbang (him and several faceless men,
   her idea), Femdom (she is in charge: pegging, facesitting, teasing).  Solo: Squirting.
   With her best friend (another Academy girl as character 2): Yuri Scissoring, Yuri Strap-on. Owl and Rat are each other's. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const VAG="flushed, gaping, full of and overflowing with thick white cum, squirting",WET="flushed and glistening with arousal";
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const C1=(vag,more)=>Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:vag},more||{});
  /* rows: {house:[place, panel 1, posture, panel 2, acts, line 1, line 2, tags]} */
  function build(label,after,suf,nameSuf,rows,o){
    START.option("expression",o.ahe,G);if(o.pcEx)START.option("expression",o.pcEx,G);
    START.add(label,H.filter(h=>rows[h]).map(h=>{const r=rows[h];START.option("posture",r[2],G);
      const friend=o.friend?PAL[h]:null,m=o.friend?ACAD.robes(friend):h+"man",mt=tplById(m);
      const c1=C1(o.vag||VAG,Object.assign({expression:o.ahe,posture:r[2]},o.c||{}));
      const text=o.scene(r)+" "+dedupe(o.tail+", "+r[4]+", "+r[7]);
      const pair=o.solo?{id:"",outfit:0,solo:text,scene:text.replace(/^/,"")+"",soloCount:o.soloCount||"1girl, solo",act:"",dir:"mutual",explicit:true,penis:false,
          pc:{expression:"blushing, wide-eyed smile",posture:null},c1,compact:false,fit:true}
        :Object.assign({id:m,outfit:nudeAt(m),scene:text,act:o.act+", "+r[4],dir:o.dir||"ba",explicit:true,penis:o.penis!==false,
          pc:Object.assign({expression:o.pcEx||"dominant, knowing smirk",posture:null},o.friend?{age:"woman"}:{}),c1,compact:false,fit:true},o.count?{count:o.count}:{});
      if(o.solo)pair.scene=`{Partner} watches, wide-eyed and blushing. `+text;
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,pair},
        tags:o.tags.concat([h],friend?[friend]:[]),
        blurb:(o.blurb?o.blurb(r):r[4].split(", ").slice(0,2).join(", "))+(o.solo?". Solo by default; pick a partner in the Scene tab to add one.":`. Opens in the Scene tab with ${friend?"her best friend, the "+cap(friend)+" girl,":"the "+(mt?mt.name:cap(h)+" boyfriend")} as character 2.`)};
    }),{after});
  }
  START.option("expression","blushing, wide-eyed smile",G);
  START.option("vaginaType","flushed, swollen and squirting",G);START.option("vaginaType","flushed and dripping wet, squirting",G);
  const two=(room,p1,p2,q1,q2,end)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. ${end} and cries "${q2}" with hearts`;
  const CREAM=`{His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, trembling,`;
  const AHE="blissful, cross-eyed ahegao with heart eyes and her tongue out";
  const SEX_TAIL="2koma, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat";

  /* ======================= Car Sex ======================= */
  const CAR={
    griffin:["a convertible parked at a cliffside lookout","climbs into the back seat and pulls {partner} in by his collar","riding him in the back seat","she rides {partner} in the back seat of the convertible, the city lights below","cowgirl position, back seat, car interior","Back seat. Now♡","FOG UP THE WINDOWS♡","convertible, lookout, city lights, night"],
    badger:["a cozy station wagon at a drive-in movie","snuggles under a blanket in the back of the wagon, feeding {partner} popcorn","on her back in the wagon, blanket half off","{partner} makes love to her in the back of the wagon as the movie flickers on the screen","missionary, car interior, blanket","Watch the movie♡","WHAT MOVIE♡","drive-in theater, popcorn, blanket, movie screen"],
    raven:["a black sedan parked in a rainy alley","sits calmly in the passenger seat, then reclines it all the way back","reclined in the passenger seat","{partner} fucks her in the reclined passenger seat as rain streams down the windows","missionary, car seat, reclined","Lock the doors","MORE♡","rain, rain on window, night, car interior"],
    serpent:["a luxury sports car in a private garage","sprawls across the hood of the sports car with a smirk","bent over the hood of the car","{partner} takes her bent over the gleaming hood","sex from behind, bent over car hood","Careful with the paint♡","DENT IT♡","sports car, garage, car hood, bent over"],
    wolf:["a pickup truck bed under the stars","throws a sleeping bag in the truck bed and tackles {partner} onto it","riding him in the truck bed","she rides {partner} in the truck bed under the full moon, howling","cowgirl position, truck bed, outdoor","Saddle up♡","AWOO♡","pickup truck, starry sky, full moon, sleeping bag"],
    swan:["a vintage limousine after a gala","lifts her gown to the hip in the back of the limousine","straddling him in the limousine","she straddles {partner} in the limousine's back seat, her gown pooled around her","straddling, sitting sex, limousine","Driver, take the long way♡","DON'T STOP♡","limousine, gown, champagne, night"],
    dragon:["a muscle car at a desert drag strip","slides across the hood of her muscle car and spreads her legs","on her back on the car hood","{partner} fucks her on the hood of the muscle car, the engine still ticking","missionary, on car hood","Start your engine♡","FULL THROTTLE♡","muscle car, desert, car hood, sunset"],
    stag:["a camper van parked in a forest","opens the van's back doors to a mattress and fairy lights","on her back in the camper van","{partner} makes love to her in the van with the back doors open to the forest","missionary, camper van, legs wrapped","Stay the night♡","SO GOOD♡","camper van, forest, fairy lights"],
    shark:["a jeep on the beach at sunset","climbs onto the jeep's hood in her bikini, grinning","bent over the jeep's hood","{partner} pounds her from behind against the jeep, the surf crashing behind","sex from behind, bent over, outdoor","Hop in♡","CHOMP♡","jeep, beach, sunset, bikini"],
    penguin:["a warm car parked at a snowy overlook","cranks up the heater, fogging the windows, and climbs into {partner}'s lap in the driver's seat as snow falls outside","straddling him in the driver's seat","she rides {partner} slowly in the warm driver's seat, heart doodles drawn in the fogged windows and snow piling on the windshield","straddling, sitting sex, car interior","It's warm in here♡","SO WARM♡","snowing, foggy window, heart doodle, car interior, night"],
    fox:["a sports car at a mountain pass","teases {partner} with her hand on his thigh while he drives, then pulls over","riding him in the passenger seat","she rides {partner} in the passenger seat at the pass, the switchbacks glowing below","cowgirl position, car interior","Pull over♡","GOTCHA♡","mountain pass, night, car interior"],
    lovebird:["a pastel convertible at a drive-in","shares a milkshake with {partner}, then kisses him","straddling him in the front seat","she straddles {partner} in the front seat, kissing him while the movie plays","straddling, kissing, car interior","Kiss me♡","LOVE YOU♡","drive-in theater, milkshake, pastel"],
    flamingo:["a pink convertible on an ocean road","stands up in the convertible with her arms out, then sinks into {partner}'s lap","riding him in the convertible","she rides {partner} in the convertible as the ocean sparkles","cowgirl position, convertible, outdoor","Faster♡","FABULOUS♡","pink convertible, ocean, sunlight"],
    kraken:["a car parked at a harbor at night","sits calmly in the back seat, then pulls {partner} down onto her","on her back in the back seat","{partner} fucks her in the back seat as the harbor lights shimmer on the water","missionary, back seat","Come here","DEEPER♡","harbor, night, back seat"],
    salmon:["a sleek black car in a riverside garage","adjusts her lipstick in the rearview mirror, then climbs into the back","bent over the back seat","{partner} takes her from behind over the back seat","sex from behind, back seat","Make it quick, darling♡","DON'T BE QUICK♡","garage, riverside, back seat"],
    crow:["a beat-up hatchback full of shiny trinkets","clears a pile of trinkets off the back seat, giggling","riding him among the trinkets","she rides {partner} in the back seat as trinkets jingle around them","cowgirl position, back seat","Mind the shinies♡","CAW♡","trinkets, back seat, car interior"],
    owl:["a car parked at a dark-sky observatory","reclines her seat to watch the meteor shower, then reaches for {partner}","on her back with the sunroof open to the stars","{partner} makes love to her with the sunroof open as meteors streak overhead","missionary, sunroof, night sky","Make a wish♡","I SEE STARS♡","meteor shower, starry sky, sunroof, night"],
    rat:["a stolen-looking getaway car in an underground garage","dangles the keys with a cheeky grin and climbs into the back","riding him in the back seat","she rides {partner} in the getaway car, the engine running","cowgirl position, back seat","We have about five minutes♡","WORTH IT♡","underground garage, getaway car, keys"]};
  build("Academy Car Sex","Academy Kitchen Counter","car","car sex",CAR,{ahe:AHE,act:"sex, vaginal, creampie",tags:["car sex","car","explicit","sex","pair"],tail:SEX_TAIL+", car",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, cum dripping onto the seat.`});

  /* ======================= Massage ======================= */
  const MS=[["griffin","oils her back","a firelit captain's suite"],["badger","warms honey-scented oil","a cozy cottage spa room"],["raven","lights a single candle","a dim, candlelit room"],
    ["serpent","lies back with a smirk","a velvet spa suite"],["wolf","stretches out on a fur","a log cabin by the fire"],["swan","rolls her sore ankles","a white spa with a reflecting pool"],
    ["dragon","demands a deep-tissue massage","a hot volcanic stone spa"],["stag","lies on a bed of moss and petals","a forest spa with a waterfall"],["shark","lies on a beach towel slick with sunscreen","a beach cabana"],
    ["penguin","lies on a heated table under a fluffy towel","a cozy spa cabin with snow falling outside the window"],["fox","lies on a tatami mat","a lantern-lit onsen massage room"],
    ["lovebird","scatters rose petals on the table","a rose-scented couples' spa"],["flamingo","lies on a pink massage table","a pink resort spa"],["kraken","floats in a warm pool","an aquarium spa"],
    ["salmon","lies on a hinoki table","a minimalist riverside spa"],["crow","lies on a velvet table among candles","a gothic spa with a moon window"],
    ["owl","lies on a table beside a crackling fire","a library turned spa at midnight"],["rat","lies on a borrowed massage table","a messy apartment with a borrowed massage table"]];
  const MAS={};MS.forEach(([h,does,room])=>{MAS[h]=[room,`${does} and lies face-down as {partner} rubs warm oil into her back, slowly working lower`,"lying face-down on a massage table, slick with oil",
    `the massage turns into sex as {partner} slides into her from behind on the massage table, her body glistening with oil`,"oil massage, prone bone, sex from behind, oiled",
    h==="raven"||h==="kraken"||h==="owl"?"Lower":"Lower... please♡",h==="crow"?"CAW♡":h==="rat"?"BEST. MASSAGE. EVER♡":h==="wolf"?"AWOO♡":"DON'T STOP♡","massage table, oil, shiny skin, towel"]});
  MAS.penguin[1]="lies face-down under a fluffy towel on a heated table, snow falling outside, as {partner} rubs warm oil into her shoulders and slowly works lower";
  build("Academy Massage","Academy Car Sex","massage","massage",MAS,{ahe:AHE,act:"sex, vaginal, creampie",tags:["massage","oil","explicit","sex","pair"],tail:SEX_TAIL+", massage, oil, oiled, shiny skin",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, oil and cum dripping down her thighs.`});

  /* ======================= Sex Tape ======================= */
  const TAPE={};
  const TP=[["griffin","a trophy-lined suite","holds the phone at arm's length and grins into it","riding him on camera"],["badger","a cozy bedroom","giggles and props the phone against a pillow","on her back, phone propped on a pillow"],
    ["raven","a candlelit study","sets up a tripod with precise calm","bent over the desk, the camera on a tripod"],["serpent","a velvet boudoir","points the phone at herself and smirks","riding him, phone in hand"],
    ["wolf","a moonlit cabin","films a messy selfie video, laughing","on all fours, looking back at the camera"],["swan","a ballet studio","sets the camera on the barre and stretches","in a standing split, filmed in the mirror"],
    ["dragon","a treasure hoard","demands {partner} film her","riding him on her gold, filmed from below"],["stag","a forest cabin","shyly hands the phone to {partner}","on her back, filmed from above"],
    ["shark","a beach house","holds the phone with a toothy grin","on all fours, filmed from behind"],["penguin","a snowed-in cabin by the fire","props the phone on the mantel, blushing, snow falling outside","on the fur rug, waving at the camera"],
    ["fox","a tatami room","winks into the lens","riding him in reverse, facing the camera"],["lovebird","a heart-filled bedroom","makes a heart with her hands for the camera","on her back, making a heart sign"],
    ["flamingo","a pink bathroom","films in the mirror on one leg","standing on one leg, filmed in the mirror"],["kraken","an aquarium room","stares calmly into the lens","on her back, filmed from above"],
    ["salmon","a photo studio","sets up studio lights and a camera","bent over a stool under studio lights"],["crow","a gothic bedroom","holds up a shiny phone, giggling","riding him, phone in hand"],
    ["owl","a library loft at midnight","balances the phone on a stack of books","on her back on a reading couch"],["rat","a messy apartment","tapes a phone to the headboard with a cheeky grin","riding him under the taped-up phone"]];
  TP.forEach(([h,room,p1,pose])=>{TAPE[h]=[room,`${p1}, the red recording light glowing`,pose,`{partner} fucks her on camera, a POV shot from the phone with a REC indicator and battery icon in the corner of the frame`,
    "recording, pov, phone screen, sex",h==="raven"||h==="kraken"?"Recording":"Say hi to the camera♡",h==="crow"?"CAW♡":"KEEP RECORDING♡","viewfinder, rec, recording, phone"]});
  build("Academy Sex Tape","Academy Massage","sextape","sex tape",TAPE,{ahe:AHE,act:"sex, vaginal, creampie",tags:["sex tape","recording","pov","explicit","sex","pair"],tail:SEX_TAIL+", recording, viewfinder, rec",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, looking straight into the lens.`});

  /* ======================= Glory Hole (her and her boyfriend's game) ======================= */
  const GH={};
  const GP=[["griffin","a locker room"],["badger","a cozy bathroom stall decorated with stickers"],["raven","a library study carrel"],["serpent","a velvet-lined booth at a private club"],
    ["wolf","a wooden outhouse in the woods"],["swan","a ballet dressing room"],["dragon","a red-lit club booth"],["stag","a garden shed"],["shark","a beach changing cabin"],
    ["penguin","a cozy ski-lodge changing room, snow outside the frosted window"],["fox","a shrine's paper-screened booth"],["lovebird","a heart-wallpapered photo booth"],
    ["flamingo","a pink club bathroom stall"],["kraken","an aquarium maintenance room"],["salmon","a sushi bar's back room"],["crow","a gothic confessional"],
    ["owl","a library's hidden reading room"],["rat","a graffiti-covered club bathroom stall"]];
  GP.forEach(([h,room])=>{GH[h]=[room,`kneels by a glory hole in the wall, grinning, as {partner}'s {cock} pokes through, their secret little game`,"kneeling at a glory hole",
    `she turns around and backs onto {partner}'s {cock} through the glory hole, pressing her ass against the wall`,"glory hole, fellatio, sex through wall",
    h==="raven"||h==="owl"?"Is that you?♡":h==="penguin"?"I know it's you♡":"There you are♡",h==="crow"?"CAW♡":h==="rat"?"BEST GAME EVER♡":"AGAIN♡","glory hole, wall, stall, kneeling"]});
  build("Academy Glory Hole","Academy Sex Tape","gloryhole","glory hole",GH,{ahe:AHE,act:"glory hole, sex, vaginal, creampie",tags:["glory hole","explicit","sex","pair"],tail:SEX_TAIL+", glory hole",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, her cheek against the wall.`});

  /* ======================= Lap Dance ======================= */
  const LD={};
  const LP=[["griffin","a VIP room with gold trim"],["badger","a cozy living room"],["raven","a dim velvet VIP booth"],["serpent","a green-lit VIP room"],["wolf","a roadhouse back room"],
    ["swan","a private ballet studio"],["dragon","a red VIP room"],["stag","a forest cabin by the fire"],["shark","a beach bar's back room"],["penguin","a cozy cabin by the fire, snow falling outside"],
    ["fox","a lantern-lit private room"],["lovebird","a pink heart-filled room"],["flamingo","a pink neon VIP room"],["kraken","an aquarium-walled lounge"],["salmon","a minimalist private lounge"],
    ["crow","a gothic parlor"],["owl","a library reading room at midnight"],["rat","a back-alley club's VIP room"]];
  LP.forEach(([h,room])=>{LD[h]=[room,`grinds slowly in {partner}'s lap in a private lap dance, his hands held behind the chair`,"straddling him in a chair, mid lap dance",
    `the lap dance turns into sex as she sinks down onto {partner}'s {cock} in reverse cowgirl in the chair`,"lap dance, reverse cowgirl, sitting sex, chair",
    h==="raven"||h==="kraken"||h==="owl"?"No touching. Yet.":"No touching♡",h==="crow"?"CAW♡":"OKAY, TOUCH ME♡","lap dance, chair, dim lighting"]});
  build("Academy Lap Dance","Academy Glory Hole","lapdance","lap dance",LD,{ahe:AHE,act:"sex, vaginal, creampie",tags:["lap dance","explicit","sex","pair"],tail:SEX_TAIL+", lap dance",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, bouncing in his lap.`});

  /* ======================= Edging ======================= */
  const ED={};
  H.forEach(h=>{ED[h]=[h==="penguin"?"a snowed-in cabin by the fire":h==="owl"?"a library loft at midnight":h==="rat"?"a messy apartment":"a candlelit bedroom",
    `lies back as {partner} holds a buzzing wand vibrator against her, pulling it away every time she gets close, again and again`,"lying back, legs trembling, being edged",
    `{partner} finally lets her cum, fucking her as the wand buzzes on her clit and she squirts all over the sheets`,"edging, wand vibrator, orgasm denial, squirting, forced orgasm",
    h==="raven"||h==="kraken"||h==="owl"?"Please... let me":"Please let me cum♡",h==="crow"?"CAW♡":h==="rat"?"FINALLY♡":"CUMMING♡","vibrator, sheets, trembling, squirting"]});
  build("Academy Edging","Academy Lap Dance","edging","edging",ED,{ahe:AHE,act:"sex, vaginal, edging, creampie",tags:["edging","orgasm denial","explicit","sex","pair"],tail:SEX_TAIL+", edging, squirting, female ejaculation",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, squirting hard.`});

  /* ======================= Gangbang (her idea, her boyfriend and his friends) ======================= */
  const GB={};
  H.forEach(h=>{GB[h]=[h==="penguin"?"a ski lodge's hot tub room, snow falling outside":h==="owl"?"the Academy library at midnight":h==="rat"?"a warehouse party":"a dim, candlelit lounge",
    `kneels in the middle of {partner} and several faceless men, grinning, having asked for this herself`,"kneeling, surrounded",
    `{partner} fucks her while she sucks and strokes the faceless men around her, cum on her face, breasts and stomach`,"gangbang, group sex, multiple penises, fellatio, handjob",
    h==="raven"||h==="kraken"||h==="owl"?"All of you. Now.":"All of you♡",h==="crow"?"CAW♡":"MORE♡","group sex, faceless male, cum on body, bukkake"]});
  build("Academy Gangbang","Academy Edging","gangbang","gangbang",GB,{ahe:AHE,act:"sex, vaginal, gangbang, creampie",count:"1girl, multiple boys, gangbang, faceless male, hetero",tags:["gangbang","group sex","explicit","sex","pair"],
    tail:SEX_TAIL+", gangbang, group sex, multiple boys, faceless male, cum on body",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, glazed in cum and loving it.`});

  /* ======================= Femdom ======================= */
  const FD={
    griffin:["facesits {partner} on her captain's chair, gripping his hair","sitting on his face","she rides {partner}'s {cock} hard, pinning his wrists, ordering him not to cum until she says so","facesitting, femdom, cowgirl position, wrists pinned"],
    badger:["sits on {partner}'s face, giggling and squeezing her thighs","sitting on his face, giggling","she bounces on {partner}'s {cock}, holding his hands down and teasing him","facesitting, femdom, cowgirl position"],
    raven:["ties {partner}'s wrists to the bed with silk and blindfolds him","standing over him, holding a riding crop","she rides {partner} slowly, a crop under his chin, setting every rhythm","femdom, riding crop, bondage, cowgirl position, blindfold"],
    serpent:["puts a leash on {partner} and makes him kneel","holding a leash, standing over him","she pegs {partner} with a strap-on, smirking, before riding his {cock}","femdom, leash, pegging, strap-on"],
    wolf:["pins {partner} to the fur rug, growling playfully","pinning him to a fur rug","she rides {partner} wildly, biting his neck","femdom, cowgirl position, biting"],
    swan:["presses her heel to {partner}'s chest, perfectly poised","her heel pressed to his chest","she rides {partner} with perfect poise, never letting him move","femdom, foot on chest, cowgirl position"],
    dragon:["chains {partner} to her throne","seated on him on her throne","she rides {partner} on her throne, choking him gently with a hand on his throat","femdom, throne, cowgirl position"],
    stag:["ties {partner} to a tree with vines, blushing at her own boldness","standing over him in the forest","she rides {partner} against the tree, shy and thrilled","femdom, tied to tree, cowgirl position"],
    shark:["drags {partner} into the shallows and sits on his face","sitting on his face in the shallows","she rides {partner} in the surf, pinning his arms","femdom, facesitting, cowgirl position, partially submerged"],
    penguin:["sits on {partner}'s chest on the fur rug by the fire, cheeks pink, trying her very best to look stern as snow falls outside","straddling his chest, trying to look stern","she rides {partner} on the fur rug, holding his hands down, giggling every time she forgets to be strict","femdom, cowgirl position, wrists held"],
    fox:["teases {partner} with a feather, never letting him touch","teasing him with a feather","she edges {partner} with her hand, then rides him at the last second","femdom, handjob, teasing, cowgirl position"],
    lovebird:["handcuffs {partner} with fluffy pink cuffs, giggling","sitting on him, fluffy cuffs dangling","she rides {partner}, kissing him between commands","femdom, handcuffs, cowgirl position, kissing"],
    flamingo:["stands over {partner} on one long leg, her heel on his chest","standing over him on one leg","she rides {partner} in reverse, admiring herself in the mirror","femdom, reverse cowgirl, mirror"],
    kraken:["binds {partner} with tentacle-like ropes, utterly calm","seated on his face","she sits on {partner}'s face, then pegs him with a tentacle strap-on","femdom, facesitting, pegging, strap-on"],
    salmon:["makes {partner} kneel and kiss her heels","seated, legs crossed, before him","she pegs {partner} on the studio bench, poised and in control","femdom, foot worship, pegging, strap-on"],
    crow:["sits on {partner} and steals his watch, giggling","sitting on him, dangling his watch","she rides {partner}, dangling his watch out of reach","femdom, cowgirl position, teasing"],
    owl:["lectures {partner} from a high-backed chair, glasses low on her nose","seated in a high-backed chair, legs crossed","she sits on {partner}'s face in the chair, then rides him, correcting his technique","femdom, facesitting, cowgirl position, glasses"],
    rat:["picks the lock on {partner}'s cuffs, then locks him to the bed instead","sitting on him, swinging the cuff keys","she rides {partner}, swinging the keys just out of his reach","femdom, handcuffs, cowgirl position, keys"]};
  const FDR={};Object.entries(FD).forEach(([h,[p1,pose,p2,acts]])=>{FDR[h]=[h==="penguin"?"a snowed-in cabin by the fire":"her room",p1,pose,p2,acts,
    h==="penguin"?"You have to do what I say♡":h==="raven"||h==="kraken"||h==="owl"?"You'll wait until I say.":"Be good for me♡",h==="crow"?"CAW♡":h==="penguin"?"GOOD BOY♡":"NOW YOU CAN CUM♡","femdom, female dominance"]});
  build("Academy Femdom","Academy Gangbang","femdom","femdom",FDR,{ahe:"triumphant, flushed ahegao with heart eyes",pcEx:"blissful expression",act:"femdom, sex, vaginal, creampie",dir:"ab",
    tags:["femdom","female dominance","explicit","sex","pair"],tail:SEX_TAIL+", femdom, girl on top",
    scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,`{He} cums deep inside her with heavy motion lines and a cross-section. She makes a triumphant, flushed ahegao with heart eyes`)+`, cum overflowing from her vagina.`});

  /* ======================= Squirting (solo) ======================= */
  const SQ={};
  H.forEach(h=>{SQ[h]=[h==="penguin"?"a warm bed piled with quilts by a frosted window, snow falling outside":h==="owl"?"a library loft at midnight":h==="rat"?"a messy apartment":h==="shark"||h==="kraken"?"a beach house bedroom":"her bedroom",
    `spreads her legs and rubs herself faster and faster, a toy buzzing between her fingers`,"lying back with her legs spread, rubbing herself",
    `she arches her back and squirts in a huge arc, soaking the sheets`,"masturbation, female masturbation, fingering, squirting, female ejaculation",
    h==="raven"||h==="kraken"||h==="owl"?"Almost":"So close♡",h==="crow"?"CAW♡":"CUMMING♡","sex toy, vibrator, wet sheets, arched back"]});
  build("Academy Squirting","Academy Public Masturbation","squirt","squirting",SQ,{solo:true,ahe:AHE,vag:"flushed, swollen and squirting",tags:["squirting","masturbation","explicit","solo"],
    tail:"2koma, masturbation, female masturbation, squirting, female ejaculation, orgasm, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat",
    scene:([room,p1,pose,p2,acts,q1,q2])=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, moaning "${q1}" with a heart. In the second scene, ${p2}, making a blissful, cross-eyed ahegao with heart eyes and crying "${q2}" with hearts.`,
    blurb:()=>"Solo: she rubs herself to a huge squirting orgasm"});
  START.option("vaginaType","flushed, swollen and squirting",G);

  /* ======================= Yuri Scissoring ======================= */
  const YS={};
  H.forEach(h=>{const f=PAL[h];YS[h]=[h==="penguin"||f==="penguin"?"a snowed-in cabin by the fire, snow falling outside":h==="owl"||h==="rat"?"a hidden reading room with a daybed in the Academy library at midnight":"a candlelit bedroom",
    `and {partner}, her best friend, tumble into bed giggling and kissing, tangling their legs together`,"scissoring her best friend",
    `the woman and {partner} scissor, grinding their wet pussies together, gripping each other's thighs`,"tribadism, scissoring, kissing, yuri",
    "Come here♡",h==="crow"?"CAW♡":"TOGETHER♡","2girls, yuri, scissoring, best friends"]});
  build("Academy Yuri Scissoring","Academy Yuri","scissor","scissoring",YS,{friend:true,penis:false,ahe:AHE,vag:"flushed and dripping wet, squirting",dir:"mutual",pcEx:"blissful, cross-eyed ahegao with heart eyes and her tongue out",
    act:"tribadism, scissoring",tags:["yuri","scissoring","best friends","explicit","pair"],tail:"2koma, 2girls, yuri, tribadism, scissoring, pussy juice, squirting, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat, consensual",
    scene:([room,p1,pose,p2,acts,q1,q2])=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. Both women make blissful ahegao faces with heart eyes, squirting together, and cry "${q2}" with hearts.`});
  START.option("vaginaType","flushed and dripping wet, squirting",G);

  /* ======================= Yuri Strap-on ======================= */
  const YT={};
  H.forEach(h=>{const f=PAL[h];YT[h]=[h==="penguin"||f==="penguin"?"a snowed-in cabin by the fire, snow falling outside":h==="owl"||h==="rat"?"a hidden reading room with a daybed in the Academy library at midnight":"a candlelit bedroom",
    `kneels on the bed as {partner}, her best friend, buckles on a strap-on and grins`,"on all fours, looking back at her best friend",
    `{partner} fucks her from behind with the strap-on, gripping her hips, both of them laughing and moaning`,"strap-on, sex from behind, yuri, doggystyle",
    "Be gentle... or don't♡",h==="crow"?"CAW♡":"HARDER♡","2girls, yuri, strap-on, best friends"]});
  build("Academy Yuri Strap-on","Academy Yuri Scissoring","strapon","strap-on",YT,{friend:true,penis:false,ahe:AHE,vag:"flushed and dripping wet, squirting",pcEx:"flushed, heart-eyed smile",
    act:"strap-on, sex from behind",tags:["yuri","strap-on","best friends","explicit","pair"],tail:"2koma, 2girls, yuri, strap-on, sex from behind, doggystyle, pussy juice, squirting, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat, consensual",
    scene:([room,p1,pose,p2,acts,q1,q2])=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. The strap-on is buried deep in the woman's vagina with heavy motion lines. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, squirting, and cries "${q2}" with hearts.`});
})();

/* ---- v169: "Academy Signature". One hand-designed hero look per girl, separate from her robes: the outfit and the place
   that define her, the way the owner's own Salmon and Crow designs do. Each also has a matching lingerie outfit and Nude.
   Placed with the robes and headmistresses. ---- */
(function(){
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const reg=(items,t,f)=>Object.entries(items).forEach(([k,a])=>{if(a&&a[0])START.item(k,a[0],t,f)});
  /* house: [look name, theme, expression, posture, setting, items] */
  const S={
    griffin:["The Captain","the captain of the Academy fleet","confident smile","standing at the ship's wheel, one hand on her sabre","the deck of a flagship at golden hour, crimson-and-gold banners snapping in the wind",
      {outerwear:["{c} fitted naval dress coat with {c2} epaulettes worn open","@primary",null,"@accent"],corset:["{c} leather underbust corset","@extra"],top:["sheer {c} blouse with a plunging neckline","@secondary"],
       bottom:["{c} high-waisted leather shorts","@extra"],legwear:["{c} over-the-knee riding boots","@extra"],waistAccessory:["{c} silk captain's sash","@accent"],heldItem:["cavalry sabre"]}],
    badger:["Honey and Hearth","the heart of the Academy kitchen garden","bubbly open-mouthed grin","carrying a basket of honeycomb on her hip","a sunny cottage kitchen garden with beehives, sunflowers and a stone path",
      {top:["cropped {c} knit cardigan over a {c2} lace bralette","@primary",null,"@extra"],bottom:["{c} high-waisted corduroy mini skirt","@extra"],legwear:["{c} honeycomb-patterned thigh-high stockings","@primary"],
       headwear:["{c} ribbon tied in her hair","@secondary"],heldItem:["basket of honeycomb"]}],
    raven:["Starkeeper","the keeper of the Academy observatory","cool aloof expression","standing beside a brass telescope, one hand on its dial","an observatory dome open to a sky thick with stars and a glowing nebula",
      {top:["backless {c} silk slip dress with a plunging neckline","@secondary"],outerwear:["long {c} velvet hooded cloak lined with {c2} star embroidery","@primary",null,"@accent"],
       earAccessory:["{c} star drop earrings","@accent"],heldItem:["brass astrolabe"]}],
    serpent:["The Heiress","the heiress to an old fortune","smirk","descending a marble staircase with one gloved hand on the rail","a candlelit marble ballroom with emerald drapes and a crystal chandelier",
      {top:["{c} satin corset gown with a plunging neckline and a thigh-high slit","@third"],gloves:["{c} satin opera gloves","@extra"],neckAccessory:["{c} snake-chain body jewelry draped over her collarbones","@accent"],
       ringAccessory:["{c} coiled serpent ring","@accent"],heldItem:["champagne coupe"]}],
    wolf:["Moon Runner","a midnight rider","playful fanged grin","leaning back against a motorcycle, arms crossed","a moonlit mountain road with pines and a black motorcycle, a full moon overhead",
      {outerwear:["cropped {c} leather biker jacket with a {c2} fur collar","@primary",null,"@secondary"],top:["{c} ribbed crop top","@secondary"],bottom:["{c} ripped denim micro shorts","@primary"],
       legwear:["{c} lace-up biker boots","@primary"],neckAccessory:["{c} studded choker","@third"]}],
    swan:["Prima","the Academy's prima ballerina","serene expression","rising onto pointe with her arms in a soft fifth position","a grand old theater stage under a single warm spotlight, red velvet seats beyond",
      {top:["{c} romantic tulle ballet dress with a plunging sweetheart bodice","@primary"],legwear:["{c} satin pointe shoes with ribbons laced up the calves","@secondary"],neckAccessory:["pearl choker","-"],
       headwear:["{c} feather hairpiece","@primary"]}],
    dragon:["The Warlord's Daughter","the heir to a conquering throne","fierce, battle-ready glare","standing with a greatsword planted at her feet","the ruins of a burning fortress at night, embers drifting through the smoke",
      {corset:["{c} leather corset armor with {c2} dragon-scale trim","@primary",null,"@accent"],shoulderPiece:["{c} dragon-scale pauldron on one shoulder","@accent"],bottom:["{c} high-slit war skirt","@extra"],
       legwear:["{c} thigh-high armored boots","@extra"],heldItem:["greatsword"]}],
    stag:["Forest Keeper","the keeper of the old forest","dreamy expression","holding a lantern aloft on a mossy path","a misty enchanted forest at dawn, fireflies and moss-covered stones",
      {top:["{c} wrap dress with {c2} leaf embroidery and a plunging neckline","@primary",null,"@accent"],outerwear:["{c} knit shawl","@third"],headwear:["{c} antler-shaped hair comb","@accent"],
       heldItem:["glowing lantern"]}],
    shark:["Riptide","the Academy's fearless surfer","playful fanged grin","carrying a surfboard under one arm, wading out of the waves","a wild beach with crashing waves and spray in the sunlight",
      {top:["{c} wetsuit unzipped to the navel over a {c2} bikini top","@secondary",null,"@third"],neckAccessory:["shark-tooth necklace","-"],heldItem:["surfboard"]}],
    penguin:["First Snow","the girl who loves the first snow of the year","bright cheerful expression","holding a mug of cocoa in both hands, catching a snowflake on her tongue","a lamplit city street on the evening of the first snowfall, shop windows glowing",
      {outerwear:["{c} wool coat with {c2} faux fur trim worn open","@primary",null,"@secondary"],top:["{c} knit sweater dress","@third"],neckAccessory:["{c} chunky knit scarf","@accent"],
       headwear:["{c} fluffy earmuffs","@secondary"],legwear:["{c} thigh-high boots","@primary"],heldItem:["mug of cocoa"]}],
    fox:["Kitsune Lantern","the spirit of the fox shrine","sly, fox-like smirk","peeking around a torii gate with a lantern","a hillside fox shrine at dusk, a path of glowing torii gates and stone foxes",
      {top:["{c} off-shoulder kimono-cut dress with a high slit","@primary"],waistAccessory:["{c} wide obi sash","@secondary"],headwear:["{c} fox mask worn on the side of her head","white"],
       heldItem:["paper lantern"]}],
    lovebird:["Sweetheart","the Academy's hopeless romantic","sparkling-eyed excited expression","twirling with a bouquet held to her chest","a pastel rose garden with an arbor of climbing roses and drifting petals",
      {top:["{c} sundress with a heart cutout back and a sweetheart neckline","@primary"],neckAccessory:["{c} ribbon choker","@third"],eyewear:["heart-shaped sunglasses","-"],heldItem:["bouquet of roses"]}],
    flamingo:["Flamingo Lounge","the queen of the pool deck","serene expression","lounging on a pool float, one leg raised","a pink art-deco hotel pool with palm trees and striped umbrellas",
      {outerwear:["sheer {c} feather-trimmed satin robe","@primary"],top:["{c} plunging one-piece swimsuit","@primary"],eyewear:["oversized white sunglasses","white"],legwear:["{c} kitten heels","@extra"],
       heldItem:["pink cocktail"]}],
    kraken:["Abyssal","a queen of the sunken deep","cool, otherworldly half-smile","floating weightless with her gown drifting like tentacles","the ruins of a sunken temple deep underwater, lit by glowing jellyfish",
      {top:["sheer layered {c} gown with long trailing tentacle-like hems","@secondary"],neckAccessory:["black pearl choker","-"],wristAccessory:["{c} glowing coral cuffs","@third"]}],
    salmon:["Editorial","the face on every magazine cover","poised, self-assured smile","posing with one hand on her hip, chin lifted","a city rooftop at golden hour set up for a fashion shoot, reflectors and a camera",
      {top:["{c} tailored blazer dress with a plunging neckline","@secondary"],neckAccessory:["{c} silk neck scarf","@primary"],earAccessory:["large hoop earrings","@accent"],legwear:["{c} pointed stiletto heels","@extra"]}],
    crow:["Magpie","the Academy's collector of shiny things","mischievous expression","holding up a jar of shiny trinkets to the moonlight","a moonlit attic full of curiosities, keys and glittering trinkets",
      {top:["{c} velvet mini dress covered in mismatched brooches and charms","@primary"],legwear:["sheer {c} tights","@secondary"],outerwear:["short {c} cape","@accent"],heldItem:["jar of shiny trinkets"]}],
    owl:["Midnight Archivist","the keeper of the library after midnight","knowing, half-lidded smile","perched on a rolling ladder with an open book","the Academy library at midnight, towering shelves lit by candles and a full moon in the window",
      {top:["{c} silk blouse unbuttoned low","@secondary"],outerwear:["{c} cardigan worn off the shoulders","@primary"],bottom:["{c} high-waisted pencil skirt","@third"],
       eyewear:["round glasses","@extra"],legwear:["sheer {c} thigh-high stockings","@third"],heldItem:["stack of old books"]}],
    rat:["The Fixer","the Academy's fixer, who can get anything","cheeky, scheming grin","leaning in a doorway, twirling a lockpick","a rainy back alley glowing with neon signs and steam from the grates",
      {outerwear:["cropped {c} cargo jacket covered in pockets","@secondary"],top:["{c} tube top","@third"],bottom:["{c} cargo micro skirt","@primary"],legwear:["ripped {c} fishnet stockings","@secondary"],
       belt:["{c} utility belt with little pouches","@secondary"],heldItem:["set of lockpicks"]}]};
  const LING={bra:["{c} lace balconette bra with a {c2} bow","@primary",null,"@accent"],panties:["{c} lace panties with a {c2} bow","@primary",null,"@accent"],legwear:["{c} lace-top thigh-high stockings","@secondary"]};
  H.forEach(h=>{const r=S[h];if(!r)return;reg(r[5],"US","glam");START.option("posture",r[3],"Posture");START.option("expression",r[2],"Academy")});
  START.item("eyewear","oversized white sunglasses","CU","resort");
  ACAD.set("Academy Signature","Academy Headmistress Night","signature","signature","glam",{tags:["signature look","hero outfit"],oname:"Signature",
    must:must("a place that is all her own")},
    H.filter(h=>S[h]).map(h=>{const r=S[h];return[h,Object.assign({},r[5]),r[2],r[3],r[1],{more:[{oname:"Signature lingerie",look:"boudoir",items:LING}]}]}));
  H.forEach(h=>{const r=S[h],t=tplById(h+"signature");if(!r||!t)return;t.name=r[0]+" ("+ACAD.cap(h)+")";t.out=Object.assign({},t.out,{must:must(r[4])})});
})();

/* ---- v169: two story arcs.
   Courtship (one entry per girl in each step, with her Academy Men boyfriend, both dressed for the moment):
     First Date → First Kiss → Moving In → Proposal → Wedding (all sweet, not explicit) → Honeymoon Suite (explicit).
     It leads naturally into the existing Pure Love, Pregnancy Test, Pregnancy Sex and Impregnation sets.
   Rivals to Lovers (the nine Academy Rivals pairs): Truce (not explicit) → Lovers (explicit yuri, both adult women).
   Every step is set somewhere that belongs to her house; Penguin's are snowy, Owl's are at night, Rat's are scrappy. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  if(typeof addMO==="function")addMO("top",[["tailored blazer over an open-collar shirt","CU","preppy"],["black tuxedo with a bow tie","CU","glam"],["plain fitted t-shirt","C","casual"],
    ["sharp three-piece suit","CU","preppy,glam"],["unbuttoned white tuxedo shirt","CU","glam"]]);
  if(typeof addMO==="function")addMO("bottom",[["dark jeans","C","casual"]]);
  const reg=(items,t,f)=>Object.entries(items).forEach(([k,a])=>{if(a&&a[0])START.item(k,a[0],t,f)});
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"aloof look failing to hide a blush",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"smirk",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",lovebird:"sparkling-eyed excited expression",
    flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression",owl:"knowing, half-lidded smile",rat:"cheeky, scheming grin"};
  /* where each step happens, per house */
  const P={
    griffin:["a rooftop restaurant overlooking the harbor","the ship's bow at sunset","a sunny loft with a view of the harbor","the top of the Academy lighthouse","a cliffside chapel above the sea"],
    badger:["a cozy little bakery cafe","a cottage garden gate at twilight","a cottage with a garden full of sunflowers","a sunflower field","a garden wedding among the beehives and sunflowers"],
    raven:["a quiet bookshop cafe","the observatory under a meteor shower","an apartment with a telescope by the window","the observatory dome under the stars","a candlelit chapel beneath a star-painted ceiling"],
    serpent:["an exclusive candlelit restaurant","a mansion balcony at midnight","a sleek penthouse","a private garden maze lit with lanterns","a grand marble cathedral"],
    wolf:["a roadside diner at night","a forest clearing under the full moon","a log cabin in the woods","a mountain peak at dawn","a forest wedding under the full moon"],
    swan:["the ballet, in a private box","a moonlit lake pavilion","a sunny apartment with a ballet barre","a lakeside dock at sunset with swans gliding by","a white lakeside pavilion strewn with feathers and flowers"],
    dragon:["a fiery teppanyaki grill","the battlements of a castle at sunset","a castle tower suite","the top of a volcano overlooking the lava fields","a grand throne hall hung with red banners"],
    stag:["a picnic in a forest glade","under a blossoming tree in the rain","a cottage in the woods","a waterfall in the forest","an ancient forest grove draped in flowers"],
    shark:["a beach shack serving fish tacos","the end of a pier at sunset","a beach house","a boat at sea under the stars","a barefoot beach wedding at sunset"],
    penguin:["a cozy cafe on a snowy evening, hot cocoa on the table","a lamplit street during the first snowfall","a little apartment with frosted windows and a heap of blankets","a frozen lake under the northern lights, a heart drawn in the snow","a snowy chapel lit with candles and twinkling lights"],
    fox:["a lantern-lit night market","under a torii gate at dusk","a traditional house with paper screens","the fox shrine at the autumn festival","a shrine wedding under red torii gates"],
    lovebird:["a heart-shaped booth in a pastel cafe","a Ferris wheel at the top","a pastel apartment full of plants","a rose garden full of heart balloons","a rose-covered garden chapel"],
    flamingo:["a pink rooftop pool bar","a tropical beach at sunset","a pastel villa by the sea","a lagoon at sunset with flamingos wading","a tropical beach wedding under a flower arch"],
    kraken:["an aquarium after hours","an underwater tunnel at the aquarium","a lighthouse keeper's cottage","a moonlit sea cave","a seaside cliff wedding over crashing waves"],
    salmon:["an omakase sushi counter","a riverside walk at dusk","a minimalist riverside apartment","a bridge over the river at sunset","an elegant riverside wedding"],
    crow:["a quirky antique shop cafe","a rooftop under the moon","an attic apartment full of trinkets","a rooftop at midnight under the full moon","a moonlit gothic chapel glittering with candles"],
    owl:["a late-night bookshop cafe","between the library shelves at midnight","a little flat above a bookshop","the library reading room at midnight under the moon","a candlelit library chapel at midnight"],
    rat:["a street food stall at midnight","a fire escape in the rain","a scrappy studio apartment full of thrifted finds","a city rooftop with the skyline behind them","a city rooftop wedding strung with mismatched lights"]};
  /* her outfit and his, for each step */
  const STEPS=[
    ["Academy First Date","date1","first date",0,"on their first date at {P}, laughing nervously across the table, their hands almost touching","first date, sitting across from each other, smiling",
      {top:["{c} fitted wrap mini dress with a plunging neckline","@primary"],legwear:["{c} strappy stiletto heels","@secondary"]},{top:["tailored blazer over an open-collar shirt","@c1"],bottom:["slim tailored trousers","@dark"]}],
    ["Academy First Kiss","kiss1","first kiss",1,"sharing their first kiss at {P}, her eyes closed and her hands on his chest","kiss, first kiss, eyes closed, hands on chest",
      {top:["{c} off-shoulder sweater dress","@primary"],legwear:["{c} ankle boots","@secondary"]},{top:["tailored blazer over an open-collar shirt","@c1"],bottom:["slim tailored trousers","@dark"]}],
    ["Academy Moving In","movein","moving in",2,"moving in together at {P}, sitting on a pile of cardboard boxes and laughing, takeout boxes between them","moving in, boxes, sitting together, laughing",
      {top:["oversized {c} hoodie","@primary"],bottom:["{c} sleep shorts","@secondary"],heldItem:["cardboard box marked fragile","-"]},{top:["plain fitted t-shirt","@c1"],bottom:["dark jeans","-"]}],
    ["Academy Proposal","propose","proposal",3,"getting engaged at {P}, the man down on one knee holding up an open ring box while she covers her mouth with both hands, tears of joy in her eyes","proposal, kneeling, ring box, covering mouth, tears of joy",
      {top:["{c} satin slip dress with a plunging neckline","@primary"],legwear:["{c} strappy stiletto heels","@secondary"]},{top:["sharp three-piece suit","@dark"]}],
    ["Academy Wedding","wedding","wedding",4,"getting married at {P}, kissing at the altar as petals fall around them","wedding, bride, groom, kiss, petals",
      {top:["white lace wedding gown with a plunging neckline and a long train","white"],headwear:["cathedral-length veil","white"],heldItem:["bridal bouquet","-"]},{top:["black tuxedo with a bow tie","black"]}]];
  STEPS.forEach(([label,suf,nameSuf,i,scene,act,her,him],k)=>{
    reg(her,"US","glam");
    START.add(label,H.map(h=>({id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:{age:"woman",expression:EX[h],posture:"standing posture"},
      outfit:{oname:cap(nameSuf),look:"glam",items:JSON.parse(JSON.stringify(her)),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:false,lewdtag:false,must:must(P[h][i]),pair:{id:h+"man",outfit:"scene",scene:"a couple "+scene.replace("{P}",P[h][i]),act,dir:"mutual",couple:true,
        w2:{name:cap(nameSuf),look:"glam",m:JSON.parse(JSON.stringify(him)),f:JSON.parse(JSON.stringify(him))},compact:false,fit:true}},
      tags:["courtship","couple","romance","pair",h],
      blurb:`Courtship, step ${k+1} of 6: ${nameSuf} at ${P[h][i]}. Opens in the Scene tab with her boyfriend as character 2.`})),
      {after:k?STEPS[k-1][0]:"Academy Sweethearts"});
  });
  /* Honeymoon Suite (explicit) */
  START.option("expression","blissful, cross-eyed ahegao with heart eyes and her tongue out",G);
  START.item("top","white lace wedding gown pulled down to her waist","L","glam,boudoir");
  START.add("Academy Honeymoon Suite",H.map(h=>{const m=h+"man",c1={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
      nippleType:"hard and flushed with arousal",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting",expression:"blissful, cross-eyed ahegao with heart eyes and her tongue out",posture:"lying back on rose petals, legs wrapped around him"};
    START.option("posture",c1.posture,G);
    const room=h==="penguin"?"a honeymoon cabin in the snow, a fire crackling and snow falling past the window":h==="owl"?"a honeymoon suite in an old library tower under the full moon":h==="rat"?"a borrowed penthouse honeymoon suite she somehow got the keys to":"a honeymoon suite strewn with rose petals and candles";
    return{id:h+"honeymoon",base:ACAD.robes(h),name:cap(h)+" honeymoon",c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Wedding night",look:"boudoir",items:{top:["white lace wedding gown pulled down to her waist","white"],headwear:["cathedral-length veil","white"]},details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,pair:{id:m,outfit:"scene",
        scene:`The image is split into two scenes in ${room}. In the first scene, the woman, still in her veil with her wedding gown pulled down to her waist, pulls {partner} onto the bed by his loosened tie, saying "Husband♡" with a heart. In the second scene, {partner} makes love to his new wife on the rose petals, her veil spread across the pillows and her legs wrapped around {him}. {His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, trembling, and cries "I LOVE YOU♡" with hearts, a wedding ring glinting on her hand. 2koma, wedding night, honeymoon, bride, wedding veil, wedding ring, rose petals, consensual, sex, vaginal, creampie, cum in pussy, missionary, legs wrapped, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat`,
        act:"sex, vaginal, creampie, missionary, wedding night",dir:"ba",explicit:true,penis:true,pc:{expression:"warm, adoring smile",posture:null},c1,
        w2:{name:"Wedding night",look:"glam",m:{top:["unbuttoned white tuxedo shirt","white"]},f:{}},compact:false,fit:true}},
      tags:["honeymoon","wedding night","explicit","sex","pair",h],blurb:"Courtship, step 6 of 6: the wedding night, in her veil. Opens in the Scene tab with her new husband."}}),{after:"Academy Wedding"});

  /* ---------- Rivals to Lovers ---------- */
  /* [id, girl 1 (character 1), girl 2, truce scene, lovers place, lovers panel 1, lovers panel 2, lovers line 1, lovers line 2] */
  const RV=[
    ["hall","griffin","serpent","the two women sharing a bottle of wine on the castle battlements at sunset, their wands laid down side by side, laughing together for the first time",
      "the deserted great hall at midnight","the two rivals kiss furiously against the banquet table, the house banners torn down around them","{partner} lays the woman across the table and grinds against her, their legs tangled, both of them gasping","Shut up and kiss me♡","WE SHOULD HAVE DONE THIS YEARS AGO♡"],
    ["race","shark","salmon","the two women floating side by side on their backs in the ocean pool after a race, holding hands and grinning",
      "the empty pool locker room","the two rivals press together under the shower, kissing hungrily","the woman pins {partner} to the tiles and scissors with her under the spray","Rematch?♡","YOU WIN... WE BOTH WIN♡"],
    ["chess","raven","crow","the two women bent over the chessboard together laughing, one returning the stolen piece and the other letting her keep it",
      "the library's private reading room","the two rivals sweep the chessboard aside and kiss across the table","the woman lies back on the table as {partner} kisses down her body and licks her","Checkmate♡","...I YIELD♡"],
    ["catwalk","flamingo","lovebird","the two women sharing a pink milkshake backstage after the show with two straws, cheeks touching",
      "a pink dressing room full of mirrors","the two rivals kiss in front of the mirrors, smearing each other's lipstick","the woman and {partner} scissor on the vanity, watching themselves in the mirrors","Pink suits you♡","WE'RE PERFECT TOGETHER♡"],
    ["storm","dragon","kraken","the two women sitting together on the cliff edge after the storm, a rainbow over the sea, their shoulders touching",
      "a sea cave lit by glowing embers and bioluminescence","the two rivals crash together in a fierce kiss, steam rising where fire meets water","{partner} pins the woman to the cave floor and they grind together, fire and water swirling","Burn for me♡","DROWN ME♡"],
    ["forest","wolf","stag","the two women resting under an oak after their race, one with her head in the other's lap, leaves falling",
      "a moonlit forest glade","the two rivals tumble into the moss, laughing and kissing","the woman and {partner} scissor in the moss under the full moon","Caught you♡","AWOO♡"],
    ["bakeoff","fox","badger","the two women sharing one perfect cake together, frosting on their noses, laughing",
      "the Academy kitchen after hours","the two rivals kiss on the floury counter, frosting smeared everywhere","the woman licks frosting off {partner}'s breasts, then between her thighs","You've got a little frosting...♡","SWEETER THAN CAKE♡"],
    ["ice","swan","penguin","the two women skating hand in hand on the frozen lake at dusk, one teaching the other a slow spin while the other teaches her how to belly slide",
      "a cozy cabin by the frozen lake, snow falling outside and a fire crackling","the two rivals warm up by the fire, kissing under a heap of blankets","the woman and {partner} make love slowly by the fire, legs entwined, snow drifting past the window","You're cold... come here♡","SO WARM♡"],
    ["night","owl","rat","the two women sitting on the library roof at midnight, sharing a stolen wedge of cheese and a rare book, heads together",
      "the hidden reading room in the library at midnight","the two rivals kiss among the toppled stacks of books, laughing breathlessly","{partner} pushes the woman down onto the reading couch and goes down on her by candlelight","Caught me♡","KEEP THE BOOK... KEEP ME♡"]];
  START.add("Academy Rivals Truce",RV.map(([id,a,b,truce])=>({id:"truce"+id,base:ACAD.robes(a),name:cap(a)+" and "+cap(b)+": truce",
    out:{framing:"full body",explicit:false,lewdtag:false,must:MUST,pair:{id:ACAD.robes(b),outfit:0,scene:truce,act:"side by side, friendship, smiling",dir:"mutual"}},
    tags:["rivals","truce","pair","two girls",a,b],blurb:`Rivals to lovers, step 2 of 3: ${cap(a)} and ${cap(b)} call a truce. Opens in the Scene tab with ${cap(b)} as character 2.`})),{after:"Academy Rivals"});
  START.add("Academy Rivals Lovers",RV.map(([id,a,b,truce,place,p1,p2,q1,q2])=>{
    const c1={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",nippleType:"hard and flushed with arousal",
      vaginaType:"flushed and dripping wet, squirting",expression:"blissful, cross-eyed ahegao with heart eyes and her tongue out",posture:"lying tangled with her rival"};
    START.option("posture",c1.posture,G);
    return{id:"lovers"+id,base:ACAD.robes(a),name:cap(a)+" and "+cap(b)+": lovers",c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
      out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,pair:{id:ACAD.robes(b),outfit:nudeAt(ACAD.robes(b)),
        scene:`The image is split into two scenes in ${place}. Two former rivals, finally together. In the first scene, ${p1}, the woman saying "${q1}" with a heart. In the second scene, ${p2}. Both women make blissful ahegao faces with heart eyes, squirting, and cry "${q2}" with hearts. 2koma, 2girls, yuri, rivals, enemies to lovers, consensual, kissing, tribadism, pussy juice, squirting, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat`,
        act:"yuri, kissing, tribadism",dir:"mutual",explicit:true,penis:false,pc:{expression:"blissful, cross-eyed ahegao with heart eyes and her tongue out",posture:null,age:"woman"},c1,compact:false,fit:true}},
      tags:["rivals","lovers","yuri","explicit","pair",a,b],blurb:`Rivals to lovers, step 3 of 3: ${cap(a)} and ${cap(b)}, finally. Opens in the Scene tab with ${cap(b)} as character 2.`}}),{after:"Academy Rivals Truce"});
})();

/* ---- v169: seven more Academy sets (all eighteen girls): Graduation, Music Video, Royal Court, Noir, Sirens, Post-Apocalypse, Space Pilots. ---- */
(function(){
  const{set,cap}=ACAD;
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const setMust=(id,s)=>{const t=tplById(id);if(t)t.out=Object.assign({},t.out,{must:must(s)})};
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"cool aloof expression",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"fierce, battle-ready glare",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",
    lovebird:"sparkling-eyed excited expression",flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression",
    owl:"knowing, half-lidded smile",rat:"cheeky, scheming grin"};
  const SX={griffin:"seductive smile",badger:"biting her lip",raven:"half-lidded sultry gaze",serpent:"come-hither look",wolf:"teasing tongue-out expression",swan:"half-lidded sultry gaze",
    dragon:"smoldering sultry expression",stag:"biting her lip",shark:"teasing tongue-out expression",penguin:"bright cheerful expression",fox:"come-hither look",
    lovebird:"seductive smile",flamingo:"half-lidded sultry gaze",kraken:"cool, otherworldly half-smile",salmon:"seductive smile",crow:"mischievous expression",
    owl:"knowing, half-lidded smile",rat:"teasing tongue-out expression"};
  /* each house's motif, for embroidery, prints and crests */
  const MOT={griffin:"griffin-wing",badger:"honeycomb",raven:"raven-feather",serpent:"coiled-serpent",wolf:"howling-wolf",swan:"swan",dragon:"dragon",stag:"antler-and-oak-leaf",
    shark:"wave-and-fin",penguin:"snowflake",fox:"fox-tail",lovebird:"heart-and-lovebird",flamingo:"flamingo",kraken:"tentacle",salmon:"leaping-salmon",crow:"crescent-moon",
    owl:"owl-and-moon",rat:"key-and-rat"};
  const reg=(items,tier,fam)=>Object.entries(items||{}).forEach(([f,a])=>{if(a&&a[0])START.item(f,a[0],tier,fam)});
  const clean=o=>{Object.keys(o).forEach(k=>o[k]==null&&delete o[k]);return o};
  const cyc=(l,i)=>l[i%l.length];
  function quick(label,after,suf,nameSuf,look,o){
    const per=o.per||{},exm=o.ex==="sultry"?SX:(o.ex||EX);
    const rows=H.map((h,i)=>{const p=per[h]||{};
      const items=clean(Object.assign({},o.main(h,i),p.items||{}));reg(items,"US",look);
      const pose=p.pose||(o.pose?o.pose(h,i):cyc(o.poses,i)),ex=p.ex||exm[h]||EX[h];
      START.option("posture",pose,"Posture");START.option("expression",ex,"Sultry (adult)");
      const more=[];
      if(o.second){const si=clean(Object.assign({},o.second.items(h,i),p.second||{}));reg(si,"L",(o.second.look||"boudoir")+",boudoir");
        more.push({oname:o.second.oname,look:o.second.look||"boudoir",items:si})}
      (p.more||[]).forEach(m=>{reg(m.items,"US",m.look||look);more.push(m)});
      const c=Object.assign({},o.cOf?o.cOf(h):{},p.c||{});Object.entries(c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@")START.option(f,v,"Academy")});
      return[h,items,ex,pose,typeof o.theme==="function"?o.theme(h):o.theme,{c,more}];
    });
    Object.entries(o.c||{}).forEach(([f,v])=>{if(typeof v==="string")START.option(f,v,"Academy")});
    set(label,after,suf,nameSuf,look,{tags:o.tags,oname:o.oname,c:o.c,must:must(o.must)},rows);
    H.forEach(h=>{const p=per[h]||{};const m=p.must||(o.mustOf&&o.mustOf(h));if(m)setMust(h+suf,m)});
  }


  /* ======================= Graduation ======================= */
  quick("Academy Graduation","Academy Study Night","grad","graduation","preppy",{tags:["graduation","cap and gown","diploma"],oname:"Cap and gown",
    must:"the Academy courtyard on graduation day, caps flying into a blue sky",theme:"graduation day",
    main:()=>({outerwear:["{c} graduation gown worn open","@primary"],top:["{c} fitted wrap mini dress with a plunging neckline","@secondary"],headwear:["{c} mortarboard cap with a {c2} tassel","@primary",null,"@accent"],
      neckAccessory:["{c} honor stole","@accent"],legwear:["{c} strappy stiletto heels","@secondary"],heldItem:["rolled diploma tied with a ribbon"]}),
    poses:["tossing her cap into the air","holding up her diploma with a grin","posing on the Academy steps","hugging her diploma to her chest"],
    second:{oname:"Under the gown",items:()=>({outerwear:["{c} graduation gown worn open","@primary"],bra:["{c} lace bra","@secondary"],panties:["{c} lace panties","@secondary"],headwear:["{c} mortarboard cap with a {c2} tassel","@primary",null,"@accent"]})},
    per:{penguin:{pose:"tossing her cap into the air",must:"the snowy Academy courtyard on a winter graduation day, caps flying through falling snow"},
      owl:{pose:"hugging her diploma to her chest",must:"the Academy library steps at dusk on graduation day, lanterns being lit"},
      rat:{pose:"holding up her diploma with a grin",must:"the Academy courtyard on graduation day, a diploma she may or may not have earned held high"}}});

  /* ======================= Music Video ======================= */
  const MV={griffin:["arena rock","a stadium stage with pyrotechnics"],badger:["country pop","a sunlit barn dance stage with string lights"],raven:["dream pop","a misty stage under a projected night sky"],
    serpent:["dark R&B","a velvet-draped stage in moody green light"],wolf:["punk rock","a sweaty club stage with a mosh pit"],swan:["classical crossover","a moonlit lake stage with a string orchestra"],
    dragon:["metal","a stage engulfed in flames"],stag:["folk","a forest clearing lit with lanterns"],shark:["surf rock","a beach stage at sunset"],penguin:["winter ballad","a snowy outdoor stage lit with fairy lights, snow falling"],
    fox:["city pop","a neon Tokyo rooftop stage"],lovebird:["bubblegum pop","a pastel stage full of heart balloons"],flamingo:["disco","a pink disco floor under a mirror ball"],
    kraken:["synthwave","a stage of glowing blue lasers and fog"],salmon:["jazz","a smoky jazz club stage with a grand piano"],crow:["goth pop","a candlelit cathedral stage"],
    owl:["lo-fi","a cozy late-night radio booth lit by a desk lamp"],rat:["hip-hop","a graffiti-covered alley stage with speakers stacked high"]};
  quick("Academy Music Video","Academy Idol Concert","musicvideo","music video","glam",{tags:["music video","performer","stage"],oname:"Music video",ex:"sultry",
    must:"a music video set",theme:h=>"a "+MV[h][0]+" music video",mustOf:h=>MV[h][1],
    main:(h,i)=>({top:["{c} sequin crop top","@primary"],bottom:["{c} high-waisted leather micro shorts","@secondary"],legwear:["{c} thigh-high platform boots","@secondary"],
      heldItem:[["microphone","electric guitar","microphone stand"][i%3]]}),
    poses:["belting into a microphone","striking a pose mid-chorus","kneeling at the edge of the stage","dancing with her hair flying"],
    second:{oname:"Encore",items:()=>({top:["{c} sequin bra top","@primary"],bottom:["{c} high-waisted leather micro shorts","@secondary"],legwear:["{c} thigh-high platform boots","@secondary"]})}});

  /* ======================= Royal Court ======================= */
  const RC={griffin:["queen of the Sun Kingdom","a golden throne room with sunlight pouring through stained glass"],badger:["duchess of the Harvest Valley","a cozy great hall with harvest banners"],
    raven:["queen of the Night","a throne room of black marble under a starry glass dome"],serpent:["empress of the Emerald Court","an emerald-and-silver throne room"],
    wolf:["queen of the Northern Woods","a timber hall with wolf pelts and a roaring hearth"],swan:["princess of the Lake","a white palace on a moonlit lake"],dragon:["empress of the Burning Mountain","a volcanic throne room glowing with lava"],
    stag:["queen of the Green Wood","a throne grown from living trees"],shark:["queen of the Seven Seas","a coral palace beneath the waves"],penguin:["queen of the Frozen South","an ice palace throne room glittering with frost and aurora light"],
    fox:["princess of the Lantern Court","a lantern-lit palace of red lacquer and gold"],lovebird:["princess of Hearts","a rose-filled palace ballroom"],flamingo:["queen of the Pink Isles","a pink coral palace by the lagoon"],
    kraken:["queen of the Abyss","a sunken throne room lit by glowing jellyfish"],salmon:["duchess of the River","a riverside palace with lacquered bridges"],crow:["queen of Thieves' Treasure","a throne room heaped with glittering stolen treasure"],
    owl:["queen of the Night Library","a throne room lined with endless bookshelves under a full moon"],rat:["queen of the Undercity","a throne made of salvaged treasures in a candlelit undercity"]};
  quick("Academy Royal Court","Academy Ballgowns","royal","royal","glam",{tags:["royalty","queen","princess","gown","crown"],oname:"Royal gown",
    must:"a royal throne room",theme:h=>"the "+RC[h][0],mustOf:h=>RC[h][1],
    main:h=>({top:[`{c} royal ball gown with a plunging neckline and {c2} ${MOT[h]} embroidery`,"@primary",null,"@accent"],outerwear:["long {c} velvet royal cape trimmed with ermine","@secondary"],
      headwear:["{c} jeweled crown","@accent"],heldItem:["jeweled scepter"]}),
    pose:()=>"seated on her throne, legs crossed",
    second:{oname:"Royal chambers",items:()=>({top:["sheer {c} silk nightgown","@primary"],headwear:["{c} jeweled crown","@accent"]})}});

  /* ======================= Noir Detectives ======================= */
  quick("Academy Noir","Academy Police","noir","noir detective","gothic",{tags:["film noir","detective","trench coat","fedora"],oname:"Noir",ex:"sultry",
    must:"a rain-soaked noir city at night, venetian-blind shadows falling across a detective's office",theme:"a noir detective",
    main:(h,i)=>({outerwear:["{c} trench coat belted at the waist","@primary"],top:["{c} satin blouse unbuttoned low","@secondary"],bottom:["{c} pencil skirt with a high back slit","@extra"],
      headwear:["{c} fedora","@primary"],legwear:["sheer {c} seamed stockings","black"],heldItem:[["case file","magnifying glass","revolver"][i%3]]}),
    poses:["leaning against a rain-streaked window","sitting on the edge of a desk, legs crossed","lighting a match under a streetlamp","peering through venetian blinds"],
    second:{oname:"After the case",items:()=>({outerwear:["{c} trench coat belted at the waist","@primary"],bra:["{c} lace bra","black"],panties:["{c} lace panties","black"],headwear:["{c} fedora","@primary"]})},
    per:{penguin:{pose:"lighting a match under a streetlamp",must:"a snowy noir city at night, snow falling through the streetlamp's glow"},
      owl:{pose:"peering through venetian blinds",must:"a detective's office at midnight, a single desk lamp and a wall of pinned clues"},
      rat:{pose:"leaning against a rain-streaked window",must:"a smoky back-alley informant's hideout, rain dripping from the fire escape"}}});
  START.item("legwear","sheer {c} seamed stockings","US","gothic,glam");

  /* ======================= Sirens ======================= */
  quick("Academy Sirens","Academy Mermaids","siren","siren","gothic",{tags:["siren","mermaid","dark","sea"],oname:"Siren",ex:"sultry",
    c:{bodyForm:"mermaid tail (no legs)",earStyle:"fin-like ears",skinFinish:"pearl-like skin sheen",pupilStyle:"glowing pupils"},
    must:"jagged black rocks in a stormy sea at night, a shipwreck in the distance and lightning on the horizon",theme:"a siren of the dark sea",
    main:()=>({top:["{c} kelp-and-pearl bikini top","@primary"],neckAccessory:["black pearl choker","-"],headwear:["{c} crown of shells and bones","@accent"]}),
    poses:["lounging on a black rock, singing","rising from the waves with her arms outstretched","combing her hair on a rock under the moon","reaching up from the water toward a ship"],
    second:{oname:"Bare",items:()=>({neckAccessory:["black pearl choker","-"],headwear:["{c} crown of shells and bones","@accent"]})},
    per:{penguin:{pose:"lounging on a black rock, singing",must:"an icy black sea at night, icebergs glowing under the aurora and a frozen shipwreck in the distance"},
      owl:{pose:"combing her hair on a rock under the moon",must:"a still black sea under a huge full moon, mist curling over the water"},
      rat:{pose:"reaching up from the water toward a ship",must:"a stormy harbor at night, wrecked ships and spilled treasure in the shallows"}}});

  /* ======================= Post-Apocalypse ======================= */
  quick("Academy Post-Apocalypse","Academy Cyberpunk","wasteland","wasteland","edgy",{tags:["post-apocalyptic","wasteland","scavenger"],oname:"Scavenger",
    must:"a sun-scorched wasteland of ruined highways and rusted cars under a dusty orange sky",theme:"a wasteland scavenger",
    main:(h,i)=>({top:["{c} torn crop top under a {c2} leather harness","@primary",null,"@extra"],bottom:["{c} patched cargo micro shorts","@secondary"],legwear:["{c} battered combat boots","@extra"],
      eyewear:["dust goggles pushed up on her head","-"],neckAccessory:["{c} scarf pulled down from her face","@accent"],heldItem:[["scrap-metal crossbow","makeshift spear","canteen"][i%3]]}),
    poses:["standing on the roof of a rusted car","crouching behind a ruined wall","walking through the dust with a crossbow over her shoulder","sitting on a pile of salvaged scrap"],
    second:{oname:"Bathing at the oasis",items:()=>({top:["{c} torn crop top knotted under her breasts","@primary"],panties:["{c} cotton panties","@secondary"]})},
    per:{penguin:{pose:"walking through the snow with a crossbow over her shoulder",must:"a frozen wasteland of snow-buried highways and ice-covered ruins"},
      owl:{pose:"crouching behind a ruined wall",must:"a ruined city at night lit by a single campfire and the moon"},
      rat:{items:{heldItem:["bag of salvaged treasures"]},pose:"sitting on a pile of salvaged scrap",ex:"cheeky, scheming grin",must:"a scrapyard kingdom of salvaged junk she clearly rules"}}});
  START.item("top","{c} torn crop top knotted under her breasts","L","edgy,boudoir");

  /* ======================= Space Pilots ======================= */
  quick("Academy Space Pilots","Academy Aliens","pilot","space pilot","cyber",{tags:["space pilot","flight suit","starship","science fiction"],oname:"Flight suit",
    must:"the cockpit of a sleek starship, stars streaking past the canopy",theme:"a starship pilot",
    main:()=>({top:["{c} fitted flight suit unzipped to the navel with {c2} piping","@primary",null,"@accent"],gloves:["{c} flight gloves","@secondary"],legwear:["{c} flight boots","@secondary"],
      heldItem:["flight helmet under one arm"]}),
    poses:["sitting in the pilot's seat, hand on the throttle","walking across the hangar with her helmet under one arm","leaning on the starship's wing","saluting on the flight deck"],
    second:{oname:"Off duty in the bunk",items:()=>({top:["{c} flight suit tied around her waist","@primary"],bra:["{c} sports bra","@secondary"]})},
    per:{penguin:{pose:"walking across the hangar with her helmet under one arm",must:"a starship hangar on an ice moon, frost on the hull and a ringed planet outside the bay doors"},
      owl:{pose:"sitting in the pilot's seat, hand on the throttle",must:"a night-black starship cockpit gliding silently past a nebula"},
      rat:{pose:"leaning on the starship's wing",must:"a junkyard spaceport where she is fixing up a patched-together starship"}}});
  START.item("bra","{c} sports bra","L","sporty,boudoir");
})();

/* ---- v169: four more explicit scene sets (all eighteen girls, with her boyfriend): Morning Sex, Rough and Passionate (consensual and intense), Mirror Sex, Sixty-Nine. ---- */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const VAG="flushed, gaping, full of and overflowing with thick white cum, squirting",WET="flushed and glistening with arousal";
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const C1=(vag,more)=>Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:vag},more||{});
  /* rows: {house:[place, panel 1, posture, panel 2, acts, line 1, line 2, tags]} */
  function build(label,after,suf,nameSuf,rows,o){
    START.option("expression",o.ahe,G);if(o.pcEx)START.option("expression",o.pcEx,G);
    START.add(label,H.filter(h=>rows[h]).map(h=>{const r=rows[h];START.option("posture",r[2],G);
      const friend=o.friend?PAL[h]:null,m=o.friend?ACAD.robes(friend):h+"man",mt=tplById(m);
      const c1=C1(o.vag||VAG,Object.assign({expression:o.ahe,posture:r[2]},o.c||{}));
      const text=o.scene(r)+" "+dedupe(o.tail+", "+r[4]+", "+r[7]);
      const pair=o.solo?{id:"",outfit:0,solo:text,scene:text.replace(/^/,"")+"",soloCount:o.soloCount||"1girl, solo",act:"",dir:"mutual",explicit:true,penis:false,
          pc:{expression:"blushing, wide-eyed smile",posture:null},c1,compact:false,fit:true}
        :Object.assign({id:m,outfit:nudeAt(m),scene:text,act:o.act+", "+r[4],dir:o.dir||"ba",explicit:true,penis:o.penis!==false,
          pc:Object.assign({expression:o.pcEx||"dominant, knowing smirk",posture:null},o.friend?{age:"woman"}:{}),c1,compact:false,fit:true},o.count?{count:o.count}:{});
      if(o.solo)pair.scene=`{Partner} watches, wide-eyed and blushing. `+text;
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,pair},
        tags:o.tags.concat([h],friend?[friend]:[]),
        blurb:(o.blurb?o.blurb(r):r[4].split(", ").slice(0,2).join(", "))+(o.solo?". Solo by default; pick a partner in the Scene tab to add one.":`. Opens in the Scene tab with ${friend?"her best friend, the "+cap(friend)+" girl,":"the "+(mt?mt.name:cap(h)+" boyfriend")} as character 2.`)};
    }),{after});
  }
  START.option("expression","blushing, wide-eyed smile",G);
  START.option("vaginaType","flushed, swollen and squirting",G);START.option("vaginaType","flushed and dripping wet, squirting",G);
  const two=(room,p1,p2,q1,q2,end)=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. ${end} and cries "${q2}" with hearts`;
  const CREAM=`{His} thick, veiny {cock} is buried to the hilt in her vagina with heavy motion lines, and a cross-section shows it pressed deep inside her as {he} cums. She makes a blissful, cross-eyed ahegao with heart eyes and her tongue out, trembling,`;
  const AHE="blissful, cross-eyed ahegao with heart eyes and her tongue out";
  const SEX_TAIL="2koma, consensual, sex, vaginal, creampie, cum in pussy, cum overflow, ahegao, heart-shaped pupils, trembling, motion lines, speech bubble, sweat";


  const ROOM={griffin:"her captain's quarters",badger:"a cozy cottage bedroom",raven:"a bedroom under a skylight full of stars",serpent:"a velvet-draped penthouse bedroom",wolf:"a log cabin bedroom",
    swan:"a white bedroom with gauzy curtains",dragon:"a red-draped tower bedroom",stag:"a bedroom in a forest cottage",shark:"a beach house bedroom",penguin:"a snowed-in cabin bedroom, snow falling past the window",
    fox:"a tatami room with paper screens",lovebird:"a pastel bedroom full of hearts",flamingo:"a pink villa bedroom",kraken:"a bedroom with an aquarium wall",salmon:"a minimalist riverside bedroom",
    crow:"an attic bedroom full of trinkets",owl:"a bedroom above a bookshop, books piled everywhere",rat:"a cluttered studio apartment"};
  const Q=h=>h==="crow"?"CAW♡":h==="rat"?"SQUEAK♡":h==="wolf"?"AWOO♡":"DON'T STOP♡";

  /* ======================= Morning Sex ======================= */
  const MO={};H.forEach(h=>{MO[h]=[ROOM[h]+" in soft morning light",`wakes up sleepy and warm in rumpled sheets, hair a mess, and pulls {partner} back under the covers${h==="penguin"?" as snow drifts past the frosted window":""}`,
    "spooned under rumpled sheets, half asleep",`{partner} spoons her from behind under the covers and makes love to her slowly and lazily as morning light spills across the bed`,
    "morning sex, spooning, under covers, lazy sex","Five more minutes... with you♡",h==="owl"?"GOOD MORNING♡":Q(h),"morning, sunlight, bed, messy hair, sleepy, rumpled sheets"]});
  build("Academy Morning Sex","Academy Intimacy","morningsex","morning sex",MO,{ahe:"blissful, sleepy ahegao with heart eyes",pcEx:"warm, adoring smile",act:"sex, vaginal, creampie",tags:["morning sex","lazy","explicit","sex","pair"],
    tail:SEX_TAIL+", morning, bed",scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, still half asleep.`});
  START.option("expression","blissful, sleepy ahegao with heart eyes",G);

  /* ======================= Rough and Passionate ======================= */
  const RP={};H.forEach(h=>{RP[h]=[h==="penguin"?"the doorway of a snowed-in cabin, snow blowing in":h==="owl"?"the library stacks at midnight":h==="rat"?"a cramped apartment hallway":ROOM[h],
    `and {partner} crash together the moment the door closes, tearing at each other's clothes, buttons flying, kissing hungrily`,"pinned against the wall, legs wrapped around him",
    `{partner} pins her against the wall and fucks her hard and deep, her nails digging into his back, clothes torn and scattered on the floor`,
    "against wall, standing sex, legs wrapped, torn clothes, passionate, rough sex","Don't you dare be gentle♡",Q(h),"torn clothes, scattered clothes, wall, passion"]});
  build("Academy Rough and Passionate","Academy Morning Sex","rough","rough and passionate",RP,{ahe:AHE,act:"sex, vaginal, creampie",tags:["passionate","rough sex","explicit","sex","pair"],
    tail:SEX_TAIL+", passionate, consensual rough sex",scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, scratches down his back.`});

  /* ======================= Mirror Sex ======================= */
  const MI={};H.forEach(h=>{MI[h]=[ROOM[h]+" with a full-length mirror",`stands before a full-length mirror as {partner} wraps his arms around her from behind, both of them watching`,
    "bent forward before a full-length mirror, watching herself",`{partner} takes her from behind in front of the mirror, one hand lifting her chin so she watches herself in the reflection`,
    "mirror, reflection, sex from behind, standing sex, watching","Watch with me♡",Q(h),"mirror, reflection, full-length mirror"]});
  build("Academy Mirror Sex","Academy Rough and Passionate","mirror","mirror sex",MI,{ahe:AHE,act:"sex, vaginal, creampie",tags:["mirror","reflection","explicit","sex","pair"],
    tail:SEX_TAIL+", mirror, reflection",scene:([room,p1,pose,p2,acts,q1,q2])=>two(room,p1,p2,q1,q2,CREAM)+`, her eyes locked on her own reflection.`});

  /* ======================= Sixty-Nine ======================= */
  const SN={};H.forEach(h=>{SN[h]=[ROOM[h],`climbs on top of {partner} the other way around, grinning back at him over her shoulder`,"on top of him in a sixty-nine",
    `the woman and {partner} pleasure each other in a sixty-nine, her lips around his {cock} while he licks her, until they both cum, his cum spilling from her mouth as she squirts`,
    "69, fellatio, cunnilingus, mutual oral, girl on top","Together♡",Q(h),"69, bed"]});
  build("Academy Sixty-Nine","Academy Oral Showcase","sixtynine","sixty-nine",SN,{ahe:"blissful, heart-eyed expression",vag:"flushed and dripping wet, squirting",act:"69, fellatio, cunnilingus, cum in mouth",dir:"mutual",
    tags:["69","oral","explicit","pair"],tail:"2koma, 69, mutual oral, fellatio, cunnilingus, cum in mouth, squirting, heart-shaped pupils, motion lines, speech bubble, sweat, consensual",
    scene:([room,p1,pose,p2,acts,q1,q2])=>`The image is split into two scenes in ${room}. In the first scene, the woman ${p1}, saying "${q1}" with a heart. In the second scene, ${p2}. She moans "${q2}" with hearts, cum dripping from her lips.`});
  START.option("expression","blissful, heart-eyed expression",G);
})();

/* ---- v170: single-scene sets. One panel, one moment, so the image generator can spend everything on the subject, the
   action and the details instead of drawing the scene twice. All eighteen girls in every set.
   Cute moments (not explicit, with her boyfriend unless noted; both dressed for it): Forehead Kiss, Piggyback, Princess
   Carry, Couch Cuddles, Shared Umbrella, Slow Dance, Back Hug, Asleep on His Shoulder, Feeding Each Other, Stargazing,
   Holding Hands, Lazy Morning Cuddles, plus Best Friend Selfie and Pillow Fight with her best friend.
   Single-scene sex (explicit, adult women, held back by the safeguard like every explicit scene): Missionary, Cowgirl,
   Reverse Cowgirl, Doggystyle, Mating Press, Against the Wall, Spooning, Prone Bone, Lotus, Blowjob, Cunnilingus,
   Titjob, Anal, Creampie Aftermath, plus Yuri Scissoring and Yuri Oral with her best friend.
   Every girl's moment happens somewhere of her own; Penguin's are snowy, Owl's are at night, Rat's are scrappy. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const dedupe=s=>[...new Set(s.split(", ").map(x=>x.trim()).filter(Boolean))].join(", ");
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const EX={griffin:"confident smile",badger:"bubbly open-mouthed grin",raven:"aloof look failing to hide a blush",serpent:"smirk",wolf:"playful fanged grin",swan:"serene expression",
    dragon:"smirk",stag:"dreamy expression",shark:"playful fanged grin",penguin:"bright cheerful expression",fox:"sly, fox-like smirk",lovebird:"sparkling-eyed excited expression",
    flamingo:"serene expression",kraken:"cool, otherworldly half-smile",salmon:"poised, self-assured smile",crow:"mischievous expression",owl:"knowing, half-lidded smile",rat:"cheeky, scheming grin"};
  /* her room, and her outdoors */
  const ROOM={griffin:"her captain's quarters with a view of the harbor",badger:"a cozy cottage bedroom with a patchwork quilt",raven:"a bedroom under a skylight full of stars",
    serpent:"a velvet-draped penthouse bedroom",wolf:"a log cabin bedroom with a fur throw",swan:"a white bedroom with gauzy curtains",dragon:"a red-draped tower bedroom",
    stag:"a bedroom in a forest cottage, ivy at the window",shark:"a beach house bedroom with the ocean outside",penguin:"a snowed-in cabin bedroom, snow falling past the frosted window",
    fox:"a tatami room with paper screens and lanterns",lovebird:"a pastel bedroom full of hearts and fairy lights",flamingo:"a pink villa bedroom with palms outside",
    kraken:"a bedroom with a glowing aquarium wall",salmon:"a minimalist riverside bedroom",crow:"an attic bedroom full of glittering trinkets",
    owl:"a bedroom above a bookshop at night, books piled everywhere",rat:"a cluttered studio apartment full of thrifted treasures"};
  const OUT={griffin:"a harbor promenade at golden hour",badger:"a sunflower-lined country lane",raven:"a quiet old-town street at twilight",serpent:"a lantern-lit palace garden",
    wolf:"a forest trail under a full moon",swan:"a lakeside path at dawn",dragon:"a castle wall at sunset",stag:"a mossy forest path",shark:"a beach boardwalk at sunset",
    penguin:"a snowy street lit by warm shop windows, snow falling",fox:"a lantern-lit festival street",lovebird:"a rose garden full of heart balloons",flamingo:"a palm-lined beach at sunset",
    kraken:"a moonlit pier",salmon:"a riverside walk at dusk",crow:"a moonlit rooftop",owl:"the Academy grounds at midnight under a full moon",rat:"a neon-lit city alley after rain"};
  const reg=(items,t,f)=>Object.entries(items||{}).forEach(([k,a])=>{if(a&&a[0])START.item(k,a[0],t,f)});
  if(typeof addMO==="function"){addMO("top",[["cozy knit sweater","C","casual"],["soft pajama shirt","C","casual"],["tailored blazer over an open-collar shirt","CU","preppy"],["plain fitted t-shirt","C","casual"]]);
    addMO("bottom",[["dark jeans","C","casual"],["soft pajama pants","C","casual"]])}
  START.item("top","{c} soft pajama shirt","C","casual");START.item("bottom","{c} soft pajama pants","C","casual");
  const HER={casual:{top:["{c} off-shoulder sweater dress","@primary"],legwear:["{c} ankle boots","@secondary"]},
    date:{top:["{c} fitted wrap mini dress with a plunging neckline","@primary"],legwear:["{c} strappy stiletto heels","@secondary"]},
    cozy:{top:["oversized {c} hoodie","@primary"],bottom:["{c} sleep shorts","@secondary"],legwear:["{c} fuzzy socks","@secondary"]},
    pj:{top:["{c} soft pajama shirt","@primary"],bottom:["{c} soft pajama pants","@primary"]}};
  const HIM={casual:{top:["cozy knit sweater","@c1"],bottom:["dark jeans","-"]},date:{top:["tailored blazer over an open-collar shirt","@c1"],bottom:["slim tailored trousers","@dark"]},
    cozy:{top:["plain fitted t-shirt","@c1"],bottom:["soft pajama pants","@dark"]},pj:{top:["soft pajama shirt","@c1"],bottom:["soft pajama pants","@c1"]}};
  Object.values(HER).forEach(o=>reg(o,"US","casual"));
  /* ---------- cute: one moment, not explicit ---------- */
  function cute(label,after,suf,nameSuf,o){
    START.add(label,H.map(h=>{const place=o.place(h),friend=o.friend?PAL[h]:null;START.option("posture",o.pose,"Posture");START.option("expression",o.ex||EX[h],"Cute");
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:{age:"woman",expression:o.ex||EX[h],posture:o.pose},
        outfit:{oname:cap(nameSuf),look:"casual",items:JSON.parse(JSON.stringify(HER[o.her]||HER.casual)),details:{},dcol:{}},more:[],nude:true,
        out:{framing:o.framing||"full body",explicit:false,lewdtag:false,must:must(place),
          pair:{id:friend?ACAD.robes(friend):h+"man",outfit:"scene",scene:"Setting: "+place+". "+cap(o.text(h).replace(/^a single tender moment: /,"").replace(/^\{partner\}/,"{Partner}"))+". "+o.tags,act:o.act,dir:o.dir||"mutual",couple:!friend,
            w2:{name:cap(nameSuf),look:"casual",m:JSON.parse(JSON.stringify(HIM[o.her]||HIM.casual)),f:JSON.parse(JSON.stringify(HER[o.her]||HER.casual))},compact:false,fit:true}},
        tags:["cute","single scene","pair",h].concat(friend?[friend,"best friends"]:["couple"]),
        blurb:`One moment: ${nameSuf}, at ${place}. Opens in the Scene tab with ${friend?"her best friend "+cap(friend):"her boyfriend"} as character 2.`}}),{after});
  }
  const C=(label,suf,name,o)=>cute(label,"Academy Couples",suf,name,o);
  C("Academy Forehead Kiss","foreheadkiss","forehead kiss",{place:h=>OUT[h],pose:"standing close, eyes closed",act:"forehead kiss, hug, eyes closed",
    text:h=>`a single tender moment: {partner} gently kisses the woman's forehead as she closes her eyes with a soft, happy smile, her hands resting on {his} chest`,tags:"forehead kiss, hug, eyes closed, smile, couple, romantic, close-up",framing:"upper body"});
  C("Academy Piggyback","piggyback","piggyback ride",{place:h=>OUT[h],pose:"riding piggyback, arms around his neck",act:"piggyback, laughing",
    text:h=>`the woman rides piggyback on {partner}'s back, arms wrapped around {his} neck, laughing with her cheek pressed to {his}`,tags:"piggyback, carrying, laughing, couple, happy"});
  C("Academy Princess Carry","princesscarry","princess carry",{place:h=>OUT[h],pose:"held in a princess carry, arms around his neck",act:"princess carry, carrying, blush",
    text:h=>`{partner} sweeps the woman up in a princess carry, her arms around {his} neck and her cheeks pink as she gazes up at {him}`,tags:"princess carry, carrying, blush, couple, romantic",her:"date"});
  C("Academy Couch Cuddles","couch","couch cuddles",{place:h=>h==="penguin"?"a cozy cabin living room, snow falling past the window":h==="owl"?"a living room above a bookshop at midnight, books stacked everywhere":h==="rat"?"a cluttered studio apartment with a thrifted couch":"a cozy living room on a rainy evening",pose:"curled up on the couch against him",act:"cuddling, blanket, couch",
    text:h=>`the woman is curled up against {partner} on the couch under one big blanket, her head on {his} chest, a movie glowing on the screen`,tags:"cuddling, couch, blanket, head on chest, cozy, couple",her:"cozy"});
  C("Academy Shared Umbrella","umbrella","shared umbrella",{place:h=>h==="penguin"?"a snowy street at night, snow falling all around":OUT[h]+" in the rain",pose:"huddled under one umbrella, holding his arm",act:"sharing umbrella, holding arm",
    text:h=>`the woman and {partner} share one umbrella${h==="penguin"?" in the falling snow":" in the rain"}, her arm looped through {his}, leaning into {him} with a shy smile`,tags:"sharing umbrella, umbrella, rain, holding arm, couple"});
  C("Academy Slow Dance","slowdance","slow dance",{place:h=>h==="penguin"?"a snow-covered gazebo strung with lights at night":h==="owl"?"the empty library at midnight, moonlight across the floor":OUT[h],pose:"slow dancing, head on his chest",act:"slow dancing, embrace",
    text:h=>`the woman slow dances with {partner}, her head resting on {his} chest and {his} arms around her waist, swaying together`,tags:"slow dancing, dancing, embrace, head on chest, romantic, couple",her:"date"});
  C("Academy Back Hug","backhug","back hug",{place:h=>h==="penguin"?"a cozy cabin kitchen, snow falling outside the window":h==="owl"?"a tiny kitchen above a bookshop at midnight":h==="rat"?"a cramped apartment kitchenette":"a sunny kitchen",pose:"cooking at the stove, hugged from behind",act:"hug from behind, cooking",
    text:h=>`{partner} hugs the woman from behind as she cooks at the stove, {his} chin on her shoulder, and she laughs and offers {him} a taste from the spoon`,tags:"hug from behind, cooking, kitchen, apron, laughing, couple",her:"cozy"});
  C("Academy Asleep On His Shoulder","asleep","asleep on his shoulder",{place:h=>h==="penguin"?"a warm train carriage at night, snowy fields passing the window":h==="owl"?"a library reading table at midnight, books open":"a train carriage at sunset, the window glowing",
    pose:"sitting, asleep on his shoulder",act:"sleeping on shoulder, sitting side by side",ex:"peaceful sleeping expression",
    text:h=>`the woman has fallen asleep with her head on {partner}'s shoulder, and {he} smiles softly and doesn't move a muscle`,tags:"sleeping, head on shoulder, sitting, train, peaceful, couple"});
  START.option("expression","peaceful sleeping expression","Cute");
  C("Academy Feeding Each Other","feeding","feeding each other",{place:h=>h==="penguin"?"a cozy cafe on a snowy evening":h==="rat"?"a late-night street food stall":"a cozy cafe",pose:"leaning across the table, holding out a spoon",act:"feeding, spoon, dessert",
    text:h=>`the woman leans across the table to feed {partner} a spoonful of dessert, giggling, cream on the corner of her lip`,tags:"feeding, spoon, dessert, cake, cafe, laughing, couple",her:"date"});
  C("Academy Stargazing","stargaze","stargazing",{place:h=>h==="penguin"?"a snowy hill under the northern lights":h==="owl"?"the observatory roof under a sky thick with stars":"a grassy hill under a sky full of stars and a shooting star",
    pose:"lying on a blanket, pointing at the stars",act:"stargazing, lying on blanket, pointing",
    text:h=>`the woman lies on a blanket beside {partner}, pointing up at a shooting star, her head on {his} arm`,tags:"stargazing, night sky, lying on blanket, pointing up, shooting star, couple"});
  C("Academy Holding Hands","holdhands","holding hands",{place:h=>OUT[h],pose:"walking hand in hand, looking back at him",act:"holding hands, walking",
    text:h=>`the woman walks hand in hand with {partner}, looking back over her shoulder at {him} with a bright smile`,tags:"holding hands, walking, looking back, smile, couple"});
  C("Academy Lazy Morning Cuddles","morningcuddle","morning cuddles",{place:h=>ROOM[h]+" in soft morning light",pose:"lying in bed in his arms",act:"cuddling, lying in bed",her:"pj",
    text:h=>`the woman lies in bed wrapped in {partner}'s arms in the soft morning light, her face snuggled into {his} neck, both of them in pajamas and half asleep`,tags:"cuddling, lying in bed, morning, sunlight, pajamas, sleepy, couple"});
  C("Academy Best Friend Selfie","bfselfie","best friend selfie",{place:h=>OUT[h],pose:"cheek to cheek, holding up a phone",act:"selfie, cheek to cheek, peace sign",friend:true,
    text:h=>`the woman and {partner}, her best friend, squeeze cheek to cheek for a selfie, both making peace signs and laughing`,tags:"selfie, cheek to cheek, peace sign, laughing, best friends, 2girls"});
  C("Academy Pillow Fight","pillowfight","pillow fight",{place:h=>ROOM[h],pose:"mid pillow fight, feathers flying",act:"pillow fight, laughing",friend:true,her:"pj",
    text:h=>`the woman and {partner}, her best friend, are in the middle of a pillow fight in pajamas, feathers flying everywhere, both laughing`,tags:"pillow fight, pillows, feathers, pajamas, laughing, best friends, 2girls"});

  /* ---------- single-scene sex ---------- */
  const C1=(more)=>Object.assign({pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting"},more||{});
  function sex(label,suf,nameSuf,o){
    START.option("expression",o.ex,G);START.option("posture",o.pose,G);
    START.add(label,H.map(h=>{const friend=o.friend?PAL[h]:null,m=friend?ACAD.robes(friend):h+"man",c1=C1(Object.assign({expression:o.ex,posture:o.pose},o.c||{}));
      const place=o.place?o.place(h):ROOM[h];
      return{id:h+suf,base:ACAD.robes(h),name:cap(h)+" "+nameSuf,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Nude",look:"boudoir",items:{},details:{},dcol:{}},more:[],nude:false,
        out:{framing:o.framing||"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:m,outfit:nudeAt(m),scene:`In ${place}, ${o.text(h)}. `+dedupe(o.tags+", consensual, heart-shaped pupils, sweat, motion lines"),act:o.act,dir:o.dir||"ba",explicit:true,penis:!friend&&o.penis!==false,
            pc:Object.assign({expression:o.pcEx||"lustful, half-lidded stare",posture:null},friend?{age:"woman"}:{}),c1,compact:false,fit:true}},
        tags:["single scene","explicit","sex","pair",h].concat(friend?[friend,"yuri"]:[]),
        blurb:`One scene: ${nameSuf}, in ${place}. Opens in the Scene tab with ${friend?"her best friend "+cap(friend):"her boyfriend"} as character 2.`}}),{after:o.after||"Academy Intimacy"});
  }
  const CUM="{His} thick, veiny {cock} is buried deep inside her with heavy motion lines, and a cross-section shows {him} cumming deep inside her";
  sex("Academy Missionary","missionary","missionary",{pose:"on her back, legs wrapped around him",ex:"blissful, loving gaze with heart eyes",pcEx:"warm, adoring gaze",act:"sex, vaginal, missionary, creampie",
    text:h=>`the woman lies on her back gazing up at {partner} with love in her eyes as {he} makes love to her in missionary, her legs wrapped around {his} waist and their fingers laced on the pillow. ${CUM}`,
    tags:"sex, vaginal, missionary, legs wrapped, holding hands, interlocked fingers, eye contact, creampie, cum in pussy, romantic"});
  START.option("expression","blissful, loving gaze with heart eyes",G);
  sex("Academy Cowgirl","cowgirlsex","cowgirl ride",{pose:"riding him, hands on his chest",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, cowgirl position, girl on top, creampie",dir:"ab",
    text:h=>`the woman rides {partner} in cowgirl, her hands braced on {his} chest, breasts bouncing and her hair flying as she grinds down onto {his} {cock}. ${CUM}`,
    tags:"sex, vaginal, cowgirl position, girl on top, straddling, bouncing breasts, creampie, cum in pussy, ahegao"});
  sex("Academy Reverse Cowgirl","reverse","reverse cowgirl",{pose:"riding him facing away, looking back",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, reverse cowgirl position, girl on top, creampie",dir:"ab",
    text:h=>`the woman rides {partner} in reverse cowgirl, facing away and looking back over her shoulder, her ass bouncing as {his} {cock} slides in and out of her. ${CUM}`,
    tags:"sex, vaginal, reverse cowgirl position, girl on top, looking back, ass, creampie, cum in pussy, ahegao"});
  sex("Academy Doggystyle","doggy","doggystyle",{pose:"on all fours, looking back",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, doggystyle, sex from behind, creampie",
    text:h=>`the woman is on all fours, arching her back and looking back over her shoulder as {partner} grips her hips and fucks her from behind. ${CUM}`,
    tags:"sex, vaginal, doggystyle, sex from behind, all fours, looking back, arched back, hand on hip, creampie, cum in pussy, ahegao"});
  sex("Academy Mating Press","matingpress","mating press",{pose:"folded in a mating press",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, mating press, creampie",
    text:h=>`{partner} pins the woman in a deep mating press, her legs folded back over her shoulders and locked around {him} as {he} drives down into her. ${CUM}`,
    tags:"sex, vaginal, mating press, legs up, leg lock, deep penetration, creampie, cum in pussy, ahegao"});
  sex("Academy Against The Wall","wall","against the wall",{pose:"lifted against the wall, legs wrapped around him",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, standing sex, against wall, lifted, creampie",
    text:h=>`{partner} lifts the woman against the wall, her legs wrapped around {his} waist and her arms around {his} neck as {he} thrusts up into her. ${CUM}`,
    tags:"sex, vaginal, standing sex, against wall, lifted, legs wrapped, arms around neck, creampie, cum in pussy, ahegao"});
  sex("Academy Spooning","spoon","spooning",{pose:"on her side, spooned from behind",ex:"blissful, half-lidded expression with heart eyes",act:"sex, vaginal, spooning, sex from behind, creampie",
    text:h=>`the woman lies on her side as {partner} spoons her from behind, one hand on her breast and {his} lips on her neck, sliding into her slowly. ${CUM}`,
    tags:"sex, vaginal, spooning, side-lying, sex from behind, grabbing breast, neck kiss, creampie, cum in pussy"});
  START.option("expression","blissful, half-lidded expression with heart eyes",G);
  sex("Academy Prone Bone","prone","prone bone",{pose:"lying flat on her stomach, ass raised",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"sex, vaginal, prone bone, sex from behind, creampie",
    text:h=>`the woman lies flat on her stomach, gripping the sheets, as {partner} pins her down and fucks her in prone bone, her ass pressed up to meet {him}. ${CUM}`,
    tags:"sex, vaginal, prone bone, lying on stomach, sex from behind, sheet grab, creampie, cum in pussy, ahegao"});
  sex("Academy Lotus","lotus","lotus",{pose:"in his lap, wrapped around him",ex:"blissful, loving gaze with heart eyes",pcEx:"warm, adoring gaze",act:"sex, vaginal, lotus position, sitting, kissing, creampie",
    text:h=>`the woman sits in {partner}'s lap in the lotus position, wrapped around {him}, their foreheads touching as they rock together slowly. ${CUM}`,
    tags:"sex, vaginal, lotus position, sitting, straddling, forehead to forehead, embrace, creampie, cum in pussy, romantic"});
  sex("Academy Blowjob","blowjob","blowjob",{pose:"kneeling between his legs",ex:"blissful, heart-eyed expression",act:"fellatio, kneeling, cum in mouth",dir:"ab",c:{vaginaType:"flushed and glistening with arousal"},
    text:h=>`the woman kneels between {partner}'s legs, gazing up at {him} with heart eyes as she takes {his} {cock} deep into her mouth, and {he} cums, her cheeks bulging with thick white cum`,
    tags:"fellatio, oral, kneeling, looking up, deepthroat, cum in mouth, cum, drooling, pov"});
  START.option("expression","blissful, heart-eyed expression",G);
  sex("Academy Cunnilingus","cunnilingus","cunnilingus",{pose:"on her back, legs over his shoulders",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"cunnilingus, licking pussy, legs over shoulders",dir:"ba",c:{vaginaType:"flushed, swollen and squirting"},
    text:h=>`the woman lies back with her legs over {partner}'s shoulders, gripping {his} hair as {he} eats her out, and she squirts, arching off the bed`,
    tags:"cunnilingus, licking pussy, oral, legs over shoulders, hair grab, squirting, female ejaculation, arched back, ahegao"});
  sex("Academy Titjob","titjob","titjob",{pose:"kneeling, squeezing her breasts together",ex:"blissful, heart-eyed expression",act:"paizuri, cum on breasts, facial",dir:"ab",c:{vaginaType:"flushed and glistening with arousal"},
    text:h=>`the woman kneels and squeezes her breasts around {partner}'s {cock}, pumping it between them and licking the tip, and {he} cums across her breasts and face`,
    tags:"paizuri, breasts, breast squeeze, licking penis, cum on breasts, facial, ejaculation"});
  sex("Academy Bent Over Anal","analone","anal",{pose:"bent over, reaching back to spread herself",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"anal, anal sex, sex from behind, anal creampie",c:{vaginaType:"flushed and glistening with arousal"},
    text:h=>`the woman bends over and reaches back to spread herself as {partner} slides {his} {cock} into her ass, and a cross-section shows {him} cumming deep inside her ass`,
    tags:"anal, anal sex, sex from behind, bent over, spread ass, lube, anal creampie, cum in ass, ahegao"});
  sex("Academy Creampie Aftermath","aftermath","aftermath",{pose:"lying back, legs spread, catching her breath",ex:"dazed, blissful smile with heart eyes",act:"after sex, cum in pussy",
    text:h=>`the woman lies back on the rumpled sheets after sex, legs spread and trembling, cum overflowing from her pussy, catching her breath with a dazed, blissful smile while {partner} lies beside her`,
    tags:"after sex, aftermath, cum in pussy, cum overflow, spread legs, trembling, rumpled sheets, afterglow"});
  START.option("expression","dazed, blissful smile with heart eyes",G);
  sex("Academy Tribbing","scissorone","scissoring",{friend:true,penis:false,pose:"scissoring her best friend",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"tribadism, scissoring",dir:"mutual",
    pcEx:"blissful, cross-eyed ahegao with heart eyes and her tongue out",c:{vaginaType:"flushed and dripping wet, squirting"},after:"Academy Yuri",
    text:h=>`the woman and {partner}, her best friend, scissor with their legs entwined, grinding their wet pussies together and squirting at the same time`,tags:"2girls, yuri, tribadism, scissoring, legs entwined, pussy juice, squirting"});
  sex("Academy Yuri Oral","yurioral","yuri oral",{friend:true,penis:false,pose:"lying back, legs spread for her best friend",ex:"blissful, cross-eyed ahegao with heart eyes and her tongue out",act:"cunnilingus, licking pussy",dir:"ba",
    pcEx:"flushed, heart-eyed smile",c:{vaginaType:"flushed, swollen and squirting"},after:"Academy Yuri",
    text:h=>`the woman lies back with her legs spread as {partner}, her best friend, licks her pussy, and she squirts, gripping {partner}'s hair`,tags:"2girls, yuri, cunnilingus, licking pussy, spread legs, hair grab, squirting"});
  ACAD.SINGLE_CUTE=["Academy Forehead Kiss","Academy Piggyback","Academy Princess Carry","Academy Couch Cuddles","Academy Shared Umbrella","Academy Slow Dance","Academy Back Hug",
    "Academy Asleep On His Shoulder","Academy Feeding Each Other","Academy Stargazing","Academy Holding Hands","Academy Lazy Morning Cuddles","Academy Best Friend Selfie","Academy Pillow Fight"];
  ACAD.SINGLE_SEX=["Academy Missionary","Academy Cowgirl","Academy Reverse Cowgirl","Academy Doggystyle","Academy Mating Press","Academy Against The Wall","Academy Spooning","Academy Prone Bone",
    "Academy Lotus","Academy Blowjob","Academy Cunnilingus","Academy Titjob","Academy Bent Over Anal","Academy Creampie Aftermath","Academy Tribbing","Academy Yuri Oral"];
})();

/* ---- v174: the best-friend scenes, re-directed (replaces friends172.js; same sets and ids).
   Every scene now directs both girls separately:
     · her own expression, chosen for the moment (shy, flustered, smug, pouting, teasing, aroused … not a default smile),
     · where she is looking (at her friend, at her friend's breasts, at the mirror, away in embarrassment …),
     · her own Danbooru tags (pair.tags1 for the girl, pair.tags2 for her best friend: breast envy, jealous, looking at another,
       covering breasts, grabbing another's breast, smug, pout, :o …), so the generator draws each girl doing her own part.
   Comparing Breasts and Comparing Butts read both girls' real figures: the bigger one is smug and shows off, the smaller one
   pouts with breast envy (or butt envy); if they are evenly matched, both are surprised and competitive.
   All are adult women (age "woman"). The lewd ones are playful nudity, not sex, with explicit tags held back by the
   safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),G="Explicit (adult)";
  const H=ACAD.HOUSES.concat(ACAD.NEWHOUSES.filter(h=>!ACAD.HOUSES.includes(h)));
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const ROOM={griffin:"her captain's quarters",badger:"a cozy cottage bedroom with a patchwork quilt",raven:"a bedroom under a skylight full of stars",serpent:"a velvet-draped penthouse bedroom",
    wolf:"a log cabin bedroom with a fur throw",swan:"a white bedroom with gauzy curtains",dragon:"a red-draped tower bedroom",stag:"a bedroom in a forest cottage",shark:"a beach house bedroom",
    penguin:"a snowed-in cabin bedroom, snow falling past the frosted window",fox:"a tatami room with paper screens",lovebird:"a pastel bedroom full of hearts and fairy lights",
    flamingo:"a pink villa bedroom",kraken:"a bedroom with a glowing aquarium wall",salmon:"a minimalist riverside bedroom",crow:"an attic bedroom full of glittering trinkets",
    owl:"a bedroom above a bookshop at night, books piled everywhere",rat:"a cluttered studio apartment full of thrifted treasures"};
  const BATH=h=>h==="penguin"?"a steamy bathroom with a frosted window, snow falling outside":h==="owl"?"a candlelit old bathroom with a claw-foot tub at midnight":h==="rat"?"a cramped apartment bathroom with mismatched tiles":"a bright, steamy bathroom";
  const BEACH=h=>h==="penguin"?"a hot spring by a snowy shore, steam rising into falling snow":h==="owl"?"a moonlit beach at midnight":h==="rat"?"a hidden rooftop pool at night":"a sunny secluded beach";
  const MIRROR=h=>ROOM[h]+", a full-length mirror against the wall";
  const KITCHEN=h=>h==="penguin"?"a cozy cabin kitchen, snow falling outside":h==="rat"?"a cramped apartment kitchenette":"a sunny kitchen";
  const W={pj:{top:["{c} soft pajama shirt","@primary"],bottom:["{c} soft pajama pants","@primary"]},
    cozy:{top:["oversized {c} hoodie","@primary"],bottom:["{c} sleep shorts","@secondary"],legwear:["{c} fuzzy socks","@secondary"]},
    casual:{top:["{c} off-shoulder sweater dress","@primary"],legwear:["{c} ankle boots","@secondary"]},
    under:{bra:["{c} lace bra","@primary"],panties:["{c} lace panties","@primary"]},panties:{panties:["{c} lace panties","@primary"]},nude:{}};
  /* how big: read from each girl's own body */
  const RANK=[[/\b(enormous|huge|gigantic|massive)\b/,6],[/\bvery large|extremely large|very full\b/,5],[/\bmedium-large\b/,3.5],[/\blarge\b/,4],[/\bsmall-to-medium\b/,2],[/\bmedium\b/,3],[/\bsmall|petite|flat\b/,1]];
  const rank=v=>{v=String(v||"").toLowerCase();for(const[r,n]of RANK)if(r.test(v))return n;return 3};
  /* a butt is judged by the butt and the hips together ("full, round butt" on "rounded hips" beats "firm, round butt" on "lean, athletic hips") */
  const buttScore=c=>{const bt=String(c.buttSize||"").toLowerCase(),hp=String(c.hipShape||"").toLowerCase();let n=0;
    if(/very full|very large|extremely|huge|bubble|heart-shaped|projecting|projection|large/.test(bt))n+=2;else if(/full|soft/.test(bt))n+=1;if(/small|toned|firm/.test(bt))n-=0.5;
    if(/very wide|wide|broad|prominent/.test(hp))n+=1.5;else if(/rounded|hourglass|curvy|flared/.test(hp))n+=0.5;if(/narrow|lean|athletic/.test(hp))n-=1;return n};
  const body=h=>{const t=tplById(ACAD.robes(h))||tplById(h+"robes");return t?t.c:{}};
  const reg=(items,t,f)=>Object.entries(items||{}).forEach(([k,a])=>{if(a&&a[0])START.item(k,a[0],t,f)});
  Object.values(W).forEach(o=>reg(o,"US","casual"));

  /* r: {label, after, suf, name, place, wear, framing, lewd, pose, ex1, ex2, t1, t2, act, text, tags, size} — text uses {partner} for the friend */
  function scene(r){
    const lewd=!!r.lewd,cat=lewd?G:"Cute";
    START.add(r.label,H.map(h=>{const fr=PAL[h],place=typeof r.place==="function"?r.place(h):r.place[h];
      let ex1=r.ex1,ex2=r.ex2,t1=r.t1,t2=r.t2,text=r.text;
      if(r.size){const sc=x=>r.size==="breasts"?rank(x.bustSize):buttScore(x),a=sc(body(h)),b=sc(body(fr));
        const v=a>b?r.big:a<b?r.small:r.even;ex1=v.ex1;ex2=v.ex2;t1=v.t1;t2=v.t2;text=v.text}
      [ex1,ex2].concat(r.size?[r.big,r.small,r.even].flatMap(v=>[v.ex1,v.ex2]):[]).forEach(e=>START.option("expression",e,cat));START.option("posture",r.pose,cat);
      const c=Object.assign({age:"woman",expression:ex1,posture:r.pose},lewd?{blushStyle:"heavy aroused blush",skinFinish:"dewy skin",nippleType:"hard and flushed with arousal"}:{});
      const w=JSON.parse(JSON.stringify(W[r.wear||"casual"]));
      return{id:h+r.suf,base:ACAD.robes(h),name:cap(h)+" & "+cap(fr)+": "+r.name,c,
        outfit:{oname:cap(r.name),look:lewd?"boudoir":"casual",items:w,details:{},dcol:{}},more:[],nude:true,
        out:{framing:r.framing||"full body",explicit:lewd,lewdtag:lewd,must:must(place),
          pair:{id:ACAD.robes(fr),outfit:"scene",scene:"Setting: "+place+". "+cap(text)+". "+dedupe(r.tags+", best friends, 2girls"+(lewd?", consensual, playful":"")),
            act:r.act,dir:"mutual",explicit:lewd,penis:false,count:lewd?"2girls, best friends":undefined,
            tags1:dedupe(t1),tags2:dedupe(t2),
            /* v176: the comparison is worked out again from whoever is picked as character 1 and character 2 */
            sz:r.size?{size:r.size,pre:"Setting: "+place+". ",post:". "+dedupe(r.tags+", best friends, 2girls"+(lewd?", consensual, playful":"")),
              v:{big:r.big,small:r.small,even:r.even}}:undefined,
            pc:{expression:ex2,posture:null,age:"woman"},c1:lewd?c:undefined,
            w2:{name:cap(r.name),look:lewd?"boudoir":"casual",f:JSON.parse(JSON.stringify(W[r.wear||"casual"])),m:{}},compact:false,fit:true}},
        tags:["best friends","single scene","pair",h,fr].concat(lewd?["lewd","nude","explicit"]:["cute"]),
        blurb:`${cap(h)} and her best friend ${cap(fr)}: ${r.name}. One scene; ${cap(fr)} is character 2 in the Scene tab.`}}),{after:r.after});
  }
  const C=(o)=>scene(Object.assign({after:"Academy Best Friend Selfie"},o));
  const L=(o)=>scene(Object.assign({after:"Academy Pillow Fight",lewd:true},o));

  /* ======================= cute ======================= */
  C({label:"Academy Blanket Fort",suf:"bffort",name:"blanket fort",place:ROOM,wear:"pj",pose:"sitting cross-legged in a blanket fort",act:"sitting together, sharing food",
    ex1:"laughing with her mouth wide open",ex2:"giggling behind her hand",
    t1:"laughing, open mouth, looking at screen, holding popcorn",t2:"giggling, hand over own mouth, looking at screen, leaning on another",
    text:"the woman and {partner}, her best friend, sit cross-legged in a blanket fort strung with fairy lights, sharing a bowl of popcorn; the woman bursts out laughing at the movie on the laptop while {partner} giggles behind her hand and leans against her shoulder",
    tags:"blanket fort, fairy lights, popcorn, laptop, pajamas, sleepover"});
  C({label:"Academy Makeup Swap",suf:"bfmakeup",name:"makeup swap",place:ROOM,wear:"cozy",framing:"upper body",pose:"leaning in close, painting her friend's lips",act:"applying makeup, face to face",
    ex1:"intensely focused, tongue poking out",ex2:"trying very hard not to laugh, eyes squeezed shut",
    t1:"concentrating, tongue out, looking at another's lips, holding lipstick, leaning forward",t2:"eyes closed, puckered lips, holding back laughter, sitting still",
    text:"the woman leans in close, tongue poking out in concentration, painting lipstick onto {partner}'s puckered lips while {partner} squeezes her eyes shut and tries very hard not to laugh",
    tags:"applying makeup, lipstick, face to face, makeup brush, close-up"});
  C({label:"Academy Braiding Hair",suf:"bfbraid",name:"braiding hair",place:ROOM,wear:"cozy",framing:"upper body",pose:"sitting behind her friend, braiding her hair",act:"braiding hair, sitting",
    ex1:"soft, focused little smile",ex2:"blissful, eyes-closed contentment",
    t1:"braiding hair, looking down, gentle smile, sitting behind another",t2:"eyes closed, content, relaxed, sitting, flower in hair",
    text:"the woman sits behind {partner}, eyes on her work as she braids {partner}'s long hair and tucks a little flower into it, while {partner} relaxes with her eyes closed, utterly content",
    tags:"braiding hair, hair braid, sitting, flower in hair"});
  C({label:"Academy Matching Outfits",suf:"bfmatching",name:"matching outfits",place:h=>h==="penguin"?"a cozy boutique with snow falling past the windows":h==="rat"?"a crowded thrift store":"a bright clothing boutique",
    wear:"casual",pose:"holding a dress up to herself in the mirror",act:"shopping, holding clothes",
    ex1:"sparkling-eyed, open-mouthed excitement",ex2:"squealing delight with a hand on her cheek",
    t1:"excited, sparkling eyes, open mouth, holding clothes, looking at mirror",t2:"happy, hand on own cheek, holding clothes, looking at another",
    text:"the woman holds a dress up to herself and stares at the mirror with sparkling eyes, while {partner} squeals and turns to her holding the exact same dress",
    tags:"shopping, holding clothes, matching outfits, mirror, boutique"});
  C({label:"Academy Karaoke Duet",suf:"bfkaraoke",name:"karaoke duet",place:h=>"a neon karaoke booth with a glowing screen",wear:"casual",pose:"belting into a microphone",act:"karaoke, singing, arm around shoulder",
    ex1:"passionate, eyes-closed belting",ex2:"laughing while trying to sing",
    t1:"singing, eyes closed, holding microphone, open mouth, passionate",t2:"singing, laughing, looking at another, arm around shoulder, holding microphone",
    text:"the woman belts out the chorus with her eyes squeezed shut, completely committed, while {partner} throws an arm around her shoulders and laughs too hard to keep singing",
    tags:"karaoke, singing, microphone, neon lights, arm around shoulder, duet"});
  C({label:"Academy Sharing a Sundae",suf:"bfsundae",name:"sharing a sundae",place:h=>h==="penguin"?"a cozy diner booth on a snowy night":h==="rat"?"a 24-hour diner at 3 a.m.":"a retro ice cream parlor",wear:"casual",
    pose:"stealing the cherry with her spoon",act:"sharing food, ice cream",
    ex1:"mischievous, triumphant grin",ex2:"indignant pout with puffed cheeks",
    t1:"mischievous grin, holding spoon, cherry, looking at another, tongue out",t2:"pout, puffed cheeks, pointing at another, holding spoon",
    text:"the woman steals the cherry off the top of their giant sundae with a triumphant grin, looking right at {partner}, who pouts with puffed-out cheeks and points at her accusingly",
    tags:"ice cream, sundae, sharing food, spoon, cherry, diner"});
  C({label:"Academy Photo Booth",suf:"bfphotobooth",name:"photo booth",place:h=>"a photo booth with a curtain and a flash going off",wear:"casual",framing:"upper body",pose:"pulling a silly face, cheek to cheek",act:"photo booth, cheek to cheek",
    ex1:"tongue-out wink",ex2:"cross-eyed, puffed-cheek silly face",
    t1:"one eye closed, tongue out, peace sign, looking at viewer",t2:"puffed cheeks, crossed eyes, silly face, looking at viewer",
    text:"the woman and {partner} squeeze cheek to cheek in a photo booth as the flash goes off, the woman winking with her tongue out and {partner} pulling a cross-eyed, puffed-cheek face",
    tags:"photo booth, silly face, cheek to cheek, camera flash, looking at viewer"});
  C({label:"Academy Face Masks",suf:"bfmasks",name:"face masks",place:ROOM,wear:"cozy",pose:"lying on the bed in a sheet face mask",act:"face mask, lying together",
    ex1:"blissed-out relaxation under a sheet mask",ex2:"relaxed, peeking out from under a cucumber slice",
    t1:"face mask, sheet mask, eyes closed, relaxed, lying on back",t2:"face mask, cucumber slice, one eye open, looking at another, smile",
    text:"the woman lies blissed out on the bed in a sheet face mask with cucumber slices on her eyes, while {partner} lies beside her peeking out from under one cucumber slice to look at her",
    tags:"face mask, sheet mask, cucumber slices, lying on bed, spa night"});
  C({label:"Academy Gaming Night",suf:"bfgaming",name:"gaming night",place:ROOM,wear:"cozy",pose:"leaning forward with a game controller",act:"playing video games",
    ex1:"fierce, gritted-teeth concentration",ex2:"cackling, sly grin",
    t1:"determined, clenched teeth, leaning forward, holding controller, looking at screen",t2:"evil grin, laughing, elbowing another, holding controller, looking at another",
    text:"the woman leans toward the screen with gritted teeth, mashing the controller, while {partner} cackles and elbows her in the ribs to throw her off",
    tags:"playing video games, controller, sitting on floor, snacks, competitive"});
  C({label:"Academy Late-Night Whispers",suf:"bfwhisper",name:"late-night whispers",place:h=>ROOM[h]+" at night, lit by a single lamp",wear:"pj",framing:"upper body",pose:"lying in bed facing her friend",act:"lying face to face, whispering",
    ex1:"secretive, whispering smile",ex2:"wide-eyed gasp with a blush",
    t1:"whispering, hand to own mouth, looking at another, lying on side, under covers",t2:"wide-eyed, covering own mouth, gasp, blush, looking at another, lying on side",
    text:"the woman cups a hand to her mouth, whispering a secret to {partner} as they lie facing each other under the covers in the lamplight, and {partner} gasps with wide eyes and a blush",
    tags:"lying in bed, face to face, whispering, under covers, lamplight, sleepover"});
  C({label:"Academy Baking Mess",suf:"bfbaking",name:"baking mess",place:KITCHEN,wear:"casual",pose:"throwing a handful of flour",act:"baking, flour fight",
    ex1:"gleeful, wide-open laugh",ex2:"spluttering, flour-dusted pout",
    t1:"laughing, throwing flour, looking at another, flour on face",t2:"pout, flour on face, flour in hair, eyes closed, holding whisk",
    text:"the woman flings a handful of flour at {partner} with a gleeful laugh, and {partner}, already white with flour from head to toe, splutters and pouts with her eyes squeezed shut",
    tags:"baking, flour, flour on face, kitchen, apron, cake, food fight"});
  C({label:"Academy Pajama Dance Party",suf:"bfdance",name:"pajama dance party",place:ROOM,wear:"pj",pose:"dancing on the bed, singing into a hairbrush",act:"dancing, jumping on bed",
    ex1:"eyes-closed, all-out singing",ex2:"laughing mid-jump",
    t1:"singing, eyes closed, hairbrush, holding hairbrush, dancing",t2:"jumping, arms up, laughing, looking at another, hair flying",
    text:"the woman sings into a hairbrush with her eyes closed, dancing on the bed, while {partner} jumps beside her with both arms in the air, laughing",
    tags:"dancing, jumping on bed, pajamas, hairbrush, music, motion lines"});

  /* ======================= lewd ======================= */
  L({label:"Academy Changing Together",suf:"bfchanging",name:"changing together",place:h=>h==="penguin"?"a ski lodge locker room, snow outside the window":h==="rat"?"a cramped club changing room":"a locker room",
    wear:"under",pose:"unhooking her friend's bra from behind",act:"undressing, unhooking bra",
    ex1:"teasing, mischievous smile with a light blush",ex2:"flustered, embarrassed blush, looking away",
    t1:"unhooking another's bra, standing behind another, teasing smile, light blush, looking at another's back",
    t2:"covering breasts, arm across chest, embarrassed, blush, looking away, flustered, underwear only",
    text:"the woman stands behind {partner} at the lockers and unhooks her bra for her with a teasing smile, and {partner} catches the cups against her chest with one arm, blushing and looking away",
    tags:"changing clothes, undressing, underwear, locker room, bra removed, bra lift"});
  L({label:"Academy Bathroom Buddies",suf:"bfbathroom",name:"bathroom buddies",place:BATH,wear:"panties",pose:"sitting on the toilet, panties around her ankles",act:"chatting, peeing",
    ex1:"mortified, hot-faced embarrassment",ex2:"totally unbothered, chatty smile",
    t1:"peeing, sitting on toilet, panties around ankles, embarrassed, full-face blush, looking at another, knees together",
    t2:"topless, applying makeup, looking at mirror, casual, smile, talking",
    text:"the woman sits peeing on the toilet with her panties around her ankles and her knees pressed together, red to the ears and staring at {partner}, who fixes her makeup at the mirror topless and keeps chatting as if nothing is unusual",
    tags:"peeing, toilet, toilet use, bathroom, mirror"});
  L({label:"Academy Boob Squeeze",suf:"bfsqueeze",name:"boob squeeze",place:ROOM,wear:"panties",pose:"grabbing her friend's breasts from behind",act:"grabbing breasts from behind",
    ex1:"mischievous, gleeful grin",ex2:"startled, open-mouthed gasp with a deep blush",
    t1:"grabbing another's breast, grabbing from behind, mischievous grin, looking at another's breasts, topless",
    t2:":o, surprised, open mouth, blush, flustered, arms up, topless, breast grab, looking back",
    text:"the woman sneaks up behind topless {partner} and grabs both of her breasts with a gleeful grin, and {partner} jumps, gasping open-mouthed with a deep blush as she looks back over her shoulder",
    tags:"grabbing another's breast, breast grab, grabbing from behind, topless, surprised"});
  L({label:"Academy Comparing Breasts",suf:"bfcompare",name:"comparing breasts",place:ROOM,wear:"panties",pose:"topless, pressing her breasts against her friend's",act:"comparing breasts, breast press",size:"breasts",
    tags:"comparing breasts, breasts press, symmetrical docking, topless, measuring tape, breasts",
    big:{ex1:"smug, teasing grin with her chest pushed out",ex2:"jealous pout with a flustered blush",
      t1:"smug, chest out, showing off, hand on own hip, looking down at another, topless",t2:"pout, breast envy, jealous, envy, looking at another's breasts, blush, hands on own chest, topless",
      text:"the woman and {partner} press their bare breasts together to compare them; the woman pushes her bigger chest out with a smug, teasing grin and looks down at {partner}, who pouts jealously at her chest with a flustered blush, hands cupping her own smaller breasts"},
    small:{ex1:"jealous pout with a flustered blush",ex2:"smug, teasing grin with her chest pushed out",
      t1:"pout, breast envy, jealous, envy, looking at another's breasts, blush, hands on own chest, topless",t2:"smug, chest out, showing off, hand on own hip, looking down at another, topless",
      text:"the woman and {partner} press their bare breasts together to compare them; the woman pouts jealously at {partner}'s bigger chest with a flustered blush, hands cupping her own smaller breasts, while {partner} pushes her chest out with a smug, teasing grin"},
    even:{ex1:"surprised, competitive blush",ex2:"surprised, competitive blush",
      t1:"surprised, blush, looking at another's breasts, measuring tape, topless",t2:"surprised, blush, looking at another's breasts, competitive, topless",
      text:"the woman and {partner} press their bare breasts together and measure, then stare at each other's chests in blushing surprise at how evenly matched they are"}});
  L({label:"Academy Comparing Butts",suf:"bfbutts",name:"comparing butts",place:MIRROR,wear:"panties",pose:"bending over beside her friend, looking back at the mirror",act:"comparing butts, bent over, looking back",size:"butt",
    tags:"comparing butts, bent over, looking back, mirror, ass, panties, topless",
    big:{ex1:"smug, satisfied smirk",ex2:"sulky, envious pout",
      t1:"smug, looking back, ass focus, bent over, hand on own ass, looking at mirror",t2:"pout, envy, jealous, looking at another's ass, bent over, blush",
      text:"the woman and {partner} bend over side by side in their panties and look back at the mirror; the woman smirks smugly and gives her own bigger butt a pat, while {partner} pouts enviously at it, blushing"},
    small:{ex1:"sulky, envious pout",ex2:"smug, satisfied smirk",
      t1:"pout, envy, jealous, looking at another's ass, bent over, blush",t2:"smug, looking back, ass focus, bent over, hand on own ass, looking at mirror",
      text:"the woman and {partner} bend over side by side in their panties and look back at the mirror; the woman pouts enviously at {partner}'s bigger butt with a blush, while {partner} smirks smugly and gives it a pat"},
    even:{ex1:"giggling, competitive grin",ex2:"giggling, competitive grin",
      t1:"giggling, looking back, bent over, looking at mirror, ass slap, slapping another's ass",t2:"giggling, looking back, bent over, blush, surprised",
      text:"the woman and {partner} bend over side by side in their panties, look back at the mirror, find it a tie, and the woman settles it by giving {partner}'s butt a playful slap"}});
  L({label:"Academy Naked Pillow Fight",suf:"bfnakedpillow",name:"naked pillow fight",place:ROOM,wear:"nude",pose:"swinging a pillow, completely nude",act:"pillow fight",
    ex1:"wild, open-mouthed laugh",ex2:"squinting, flinching laugh with a blush",
    t1:"laughing, open mouth, swinging pillow, holding pillow, motion lines, bouncing breasts, completely nude, looking at another",
    t2:"flinching, squinting, laughing, blush, hit with pillow, arms up, completely nude, bouncing breasts",
    text:"the woman swings a pillow with a wild laugh, completely nude on the bed, and it smacks {partner} square in the face as she flinches and squints, laughing and blushing, feathers bursting everywhere",
    tags:"pillow fight, completely nude, feathers, motion lines, on bed"});
  L({label:"Academy Skinny Dipping",suf:"bfskinny",name:"skinny dipping",place:BEACH,wear:"nude",pose:"wading in the water, completely nude",act:"skinny dipping, splashing",
    ex1:"carefree, splashing laugh",ex2:"shy, flustered blush, covering herself",
    t1:"splashing, laughing, completely nude, wading, wet, looking at another",t2:"covering breasts, shy, embarrassed, blush, looking at another, partially submerged, wet hair",
    text:"the woman wades in, completely nude, and splashes {partner} with a carefree laugh, while {partner}, shy and blushing, hunches in the water with an arm across her chest and splashes back",
    tags:"skinny dipping, completely nude, splashing, wet, water, partially submerged, clothes on ground"});
  L({label:"Academy Bubble Bath Together",suf:"bfbubblebath",name:"bubble bath together",place:BATH,wear:"nude",pose:"in the bath, washing her friend's back",act:"bathing together, washing back",
    ex1:"tender, focused smile",ex2:"blissful, half-lidded relaxation with a pink blush",
    t1:"washing another, holding sponge, looking at another's back, gentle smile, in bathtub, wet",t2:"half-closed eyes, relaxed, blush, sitting in bathtub, back to another, wet hair, bubbles",
    text:"the woman sits behind {partner} in the bubble bath and washes her back with a sponge, smiling softly as she works, while {partner} leans back into it with half-lidded eyes and a pink blush, bubbles clinging to her breasts",
    tags:"bathing, bubble bath, bathtub, washing back, sponge, wet, steam, nude"});
  L({label:"Academy Sunscreen",suf:"bfsunscreen",name:"sunscreen",place:BEACH,wear:"panties",pose:"rubbing sunscreen onto her friend's back",act:"applying sunscreen",
    ex1:"teasing, playful smile",ex2:"shivering, embarrassed blush, peeking back",
    t1:"applying sunscreen, hands on another's back, teasing smile, looking at another, topless, kneeling",t2:"lying on stomach, untied bikini, embarrassed, blush, shiver, looking back, shiny skin",
    text:"the woman kneels over {partner}, topless, and rubs cold sunscreen down her bare back with a teasing smile, and {partner}, lying on her stomach, shivers and peeks back at her with an embarrassed blush",
    tags:"applying sunscreen, lotion, beach towel, shiny skin, oil, lying on stomach, topless"});
  L({label:"Academy Bra Try-On",suf:"bfbratry",name:"bra try-on",place:h=>"a boutique fitting room with a velvet curtain and a three-way mirror",wear:"panties",pose:"holding a bra up to her bare chest",act:"trying on bras, mirror",
    ex1:"excited, sparkling eyes",ex2:"shy, flustered blush, looking away",
    t1:"holding bra, excited, sparkling eyes, looking at mirror, topless",t2:"covering breasts, shy, embarrassed, blush, looking away, topless, holding bra",
    text:"the woman holds a lacy bra up to her bare chest and stares at the three-way mirror with sparkling eyes, while {partner} covers her own breasts with a bra she is too shy to try, blushing and looking away",
    tags:"fitting room, topless, bra, holding clothes, mirror, lingerie shopping"});
  L({label:"Academy Topless Mirror Selfie",suf:"bfselfietop",name:"topless mirror selfie",place:MIRROR,wear:"panties",pose:"taking a mirror selfie, topless",act:"mirror selfie, cheek to cheek",
    ex1:"confident, playful wink",ex2:"shy, nervous smile with a deep blush",
    t1:"mirror selfie, holding phone, looking at phone, one eye closed, peace sign, topless, confident",t2:"covering nipples, shy, blush, nervous smile, looking at phone, topless",
    text:"the woman takes a mirror selfie of them both in nothing but panties, winking with a peace sign, while {partner} leans in shyly beside her, covering her nipples with her hands and blushing hard",
    tags:"mirror selfie, selfie, holding phone, topless, panties, cheek to cheek"});
  L({label:"Academy Shower Together",suf:"bfshower",name:"shower together",place:BATH,wear:"nude",pose:"soaping her friend's shoulders under the shower",act:"showering together, washing",
    ex1:"playful, flirty smile",ex2:"shy, aroused blush, biting her lip",
    t1:"washing another, soap bubbles, hands on another's shoulders, playful smile, looking at another, wet, nude",t2:"blush, biting own lip, looking down, shy, wet hair, wet, nude, soap bubbles",
    text:"the woman soaps {partner}'s shoulders and lets her hands slide lower with a playful smile, and {partner} looks down, biting her lip with a shy, aroused blush as foam runs down her wet body",
    tags:"showering, shower, soap bubbles, washing, wet, steam, nude"});
  L({label:"Academy Naked Wrestling",suf:"bfwrestle",name:"naked wrestling",place:ROOM,wear:"nude",pose:"pinning her friend to the bed, completely nude",act:"wrestling, pinning",
    ex1:"triumphant, breathless grin",ex2:"flustered, breathless laugh with a deep blush",
    t1:"on top, straddling, pinning another's wrists, triumphant, grin, looking down at another, completely nude",t2:"pinned, wrists held, on back, laughing, blush, struggling, looking up at another, completely nude",
    text:"the woman straddles {partner} completely nude and pins her wrists above her head, grinning down in triumph, while {partner} squirms beneath her, breathless, laughing and blushing furiously",
    tags:"wrestling, pinned, pinning, straddling, completely nude, on bed, playful"});
  L({label:"Academy Spanking Game",suf:"bfspank",name:"spanking game",place:ROOM,wear:"panties",pose:"lying across her friend's lap",act:"spanking, over the knee",
    ex1:"startled, wincing blush, looking back",ex2:"wicked, teasing grin",
    t1:"lying on lap, over the knee, ass up, wince, blush, open mouth, looking back at another, panties",t2:"spanking, raised hand, teasing grin, looking at another's ass, sitting",
    text:"the woman lies across {partner}'s lap in nothing but panties and looks back with a startled, wincing blush as {partner} raises her hand with a wicked grin and lands a spank that leaves a pink handprint",
    tags:"spanking, over the knee, ass, handprint, panties, topless"});
  L({label:"Academy Tangled After the Sleepover",suf:"bftangled",name:"tangled after the sleepover",place:h=>ROOM[h]+" in soft morning light",wear:"nude",pose:"waking up tangled with her friend",act:"cuddling, waking up",
    ex1:"wide-eyed, mortified blush",ex2:"sleepy, drowsy half-smile",
    t1:"waking up, wide-eyed, embarrassed, full-face blush, looking at another, holding sheet, completely nude",t2:"sleepy, half-closed eyes, drowsy, smile, yawning, arm around another, completely nude",
    text:"the woman wakes up completely nude, tangled in the sheets with {partner}, and stares at her wide-eyed with a mortified blush, while {partner} just yawns, smiles sleepily and pulls her closer",
    tags:"waking up, morning, cuddling, completely nude, tangled sheets, bedroom"});

  /* the two earlier best-friend scenes get the same direction */
  H.forEach(h=>{const s=tplById(h+"bfselfie");if(s&&s.out&&s.out.pair){const p=s.out.pair;
      p.tags1="looking at phone, holding phone, one eye closed, peace sign, cheek to cheek";p.tags2="cheek to cheek, peace sign, laughing, looking at phone";
      s.c=Object.assign({},s.c,{expression:"tongue-out wink"});p.pc={expression:"laughing with her mouth open",posture:null,age:"woman"}}
    const f=tplById(h+"pillowfight");if(f&&f.out&&f.out.pair){const p=f.out.pair;
      p.tags1="laughing, open mouth, swinging pillow, holding pillow, motion lines, looking at another";p.tags2="flinching, squinting, laughing, hit with pillow, arms up";
      f.c=Object.assign({},f.c,{expression:"wild, open-mouthed laugh"});p.pc={expression:"squinting, flinching laugh with a blush",posture:null,age:"woman"}}});
  ["tongue-out wink","laughing with her mouth open","wild, open-mouthed laugh","squinting, flinching laugh with a blush"].forEach(e=>START.option("expression",e,"Cute"));

  ACAD.FRIENDS_CUTE=["Academy Best Friend Selfie","Academy Pillow Fight","Academy Blanket Fort","Academy Makeup Swap","Academy Braiding Hair","Academy Matching Outfits","Academy Karaoke Duet",
    "Academy Sharing a Sundae","Academy Photo Booth","Academy Face Masks","Academy Gaming Night","Academy Late-Night Whispers","Academy Baking Mess","Academy Pajama Dance Party"];
  ACAD.FRIENDS_LEWD=["Academy Changing Together","Academy Bathroom Buddies","Academy Boob Squeeze","Academy Comparing Breasts","Academy Comparing Butts","Academy Naked Pillow Fight",
    "Academy Skinny Dipping","Academy Bubble Bath Together","Academy Sunscreen","Academy Bra Try-On","Academy Topless Mirror Selfie","Academy Shower Together","Academy Naked Wrestling",
    "Academy Spanking Game","Academy Tangled After the Sleepover"];
})();

/* ---- v146: Kraken in the Academy Couples (late block, after the pair code): a night swim with Shark, the other sea house. ---- */
(function(){
  const tpl=id=>tplById(id);
  START.add("Academy Couples",[{id:"couplenightswim",base:"krakenswim",name:"Night swim",
    out:{pair:{id:"sharkswim",outfit:0,scene:"a moonlit night swim in a lagoon glowing with bioluminescent plankton, floating close together, laughing",act:"",dir:"mutual"}},
    tags:["couple","pair","two girls","kraken","shark"],
    blurb:`Kraken and Shark, the two sea houses, floating together in a glowing lagoon. Opens in the Scene tab with the ${(tpl("sharkswim")||{name:"Shark swim"}).name} as character 2.`}]);
})();

/* ---- v151: Salmon and Crow in the Academy Couples (late block, after the pair code).
   Salmon and Flamingo shoot a magazine cover, pink on pink; Crow brings Penguin the shiniest pebble on a snowy rooftop. ---- */
(function(){
  const tpl=id=>tplById(id);
  const C=(id,a,b,name,scene,act,blurb,tags)=>({id,base:a,name,out:{pair:{id:b,outfit:0,scene,act,dir:"mutual"}},tags:["couple","pair","two girls"].concat(tags),
    blurb:`${blurb} Opens in the Scene tab with the ${(tpl(b)||{name:b}).name} as character 2.`});
  START.add("Academy Couples",[
    C("couplecover","salmongown","flamingogown","Cover shoot","two models posing together for a fashion magazine cover in a white studio, camera flashes bursting, back to back in their gowns","back-to-back",
      "Salmon and Flamingo, pink on pink, shooting a magazine cover in their ballgowns.",["salmon","flamingo"]),
    C("couplerooftop","crowwinter","penguinwinter","Snowy rooftop","sharing one blanket on a snowy rooftop at night under the stars, one girl showing the other a smooth, shiny pebble she found in the snow, both smiling","hug",
      "Crow and Penguin wrapped in one blanket on a snowy rooftop; Crow has found Penguin the shiniest pebble in the snow.",["crow","penguin"])]);
})();

/* ===== Starting points picker (v114) =====
   One searchable list of every starting point and your saves. Tap a row to load it, or open Parts to take
   only some of it (palette, face, hair, body, skin, makeup, intimate details, outfits, age, prompt extras). */
const KEY_RECENT_STARTS="charstudio.recentStarts.v1";
const PARTS=[["palette","Palette"],["face","Face and eyes"],["hair","Hair"],["body","Body shape"],["skin","Skin"],["makeup","Makeup and nails"],["intimate","Intimate details"],["outfits","Outfits"],["concept","Age and species"],["finish","Prompt extras"]];
const PART_NAME={palette:"the palette",face:"face and eyes",hair:"hair",body:"body shape",skin:"skin",makeup:"makeup",intimate:"intimate details",outfits:"outfits",concept:"age and species",finish:"prompt extras"};
const PART_SKIN=new Set(["skinTone","undertone","skinFinish","finishColor","markings","markingColor","bodyMarkings"]);
const PART_INTIMATE=/^(nipple|areola|vagina|pubicHair|penis)/;
const PART_FINISH=["framing","must","avoid","notes","style","palName","repeatBody"];
const PART_PERSON=new Set(["face","hair","body","skin","makeup","intimate","outfits","concept"]);
const SP={q:"",grp:"all",data:null,src:null,ret:null};
const spHex=n=>hexFor(n)||(typeof Sprite!=="undefined"&&Sprite.hexFor&&Sprite.hexFor(n))||"transparent";
const spRx=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function partOf(f){
  if(f==="sex"||f==="_body")return null;
  const b=baseField(f);
  if(PART_SKIN.has(f)||PART_SKIN.has(b))return"skin";
  if(PART_INTIMATE.test(b))return"intimate";
  const s=stepOf(f);
  return s==="palette"||s==="outfit"?null:s;
}
/* a color reference such as "@primary" or "@primary+@accent" as plain color names from a palette */
function litColor(v,pal){
  if(typeof v!=="string"||v[0]!=="@")return v;
  const names=v.split("+").map(x=>x[0]==="@"?(pal[x.slice(1)]||""):x).filter(Boolean);
  return names.length?joinNatural(names):v;
}
function recentStarts(){return loadJSON(KEY_RECENT_STARTS,[])}
function noteRecent(key){saveJSON(KEY_RECENT_STARTS,[key].concat(recentStarts().filter(k=>k!==key)).slice(0,10))}

/* ---- catalog: every starting point, then your saves ---- */
function spCatalog(){
  const tById=Object.fromEntries(TEMPLATES.map(t=>[t.id,t]));
  const groups=PRESET_GROUPS.start.concat([{label:"More",keys:TEMPLATES.map(t=>t.id).filter(id=>!PRESET_GROUPS.start.some(g=>g.keys.includes(id)))}])
    .map(g=>({label:g.label,keys:g.keys.filter(k=>tById[k])})).filter(g=>g.keys.length);
  const list=[],seen=new Set();
  groups.forEach(g=>g.keys.forEach(k=>{if(seen.has(k))return;seen.add(k);const t=tById[k];list.push({key:"t:"+k,t,name:t.name,blurb:t.blurb||"",pal:t.pal||{},c:t.c||{},group:g.label})}));
  readSaves().forEach(s=>{const st=s.state||{};list.push({key:"s:"+s.id,s,name:s.name||"Untitled",blurb:"Saved "+new Date(s.ts).toLocaleDateString(),pal:st.pal||{},c:st.c||{},group:"My saves"})});
  list.forEach((e,i)=>{e.i=i;e.hay=spHay(e)});
  return{list,groups,byKey:Object.fromEntries(list.map(e=>[e.key,e]))};
}
function spHay(e){
  const out=[e.name,e.group,e.blurb,...Object.values(e.pal)];
  const res=v=>typeof v==="string"&&v[0]==="@"?litColor(v,e.pal):v;
  const c={...e.c};if(c._body&&BODY_PRESETS[c._body])Object.assign(c,BODY_PRESETS[c._body].v);
  ["age","subjectType","hairStyle","hairLength","hairTexture","hairBase","hairUnderlayer","hairHighlights","eyeOne","eyeTwo","skinTone","bodySoftness","heightStature","bustSize","expression","impression","makeupStyle"].forEach(f=>{if(c[f])out.push(String(res(c[f])))});
  if(e.t){[e.t.outfit].concat(e.t.more||[]).forEach(o=>{if(!o)return;out.push(o.oname||"");Object.values(o.items||{}).forEach(a=>out.push(Array.isArray(a)?a[0]:a&&a.v))});(e.t.tags||[]).forEach(x=>out.push(x))}
  return out.filter(Boolean).join("\n").toLowerCase();
}
function spScore(e,terms){
  let s=0;const n=e.name.toLowerCase(),g=e.group.toLowerCase(),pals=Object.values(e.pal).join(" ").toLowerCase();
  for(const t of terms){
    if(!e.hay.includes(t))return-1;
    if(n.startsWith(t))s+=20;else if(new RegExp("(^|\\W)"+spRx(t)).test(n))s+=14;else if(n.includes(t))s+=10;
    else if(g.includes(t))s+=6;else if(pals.includes(t))s+=4;else s+=1;
  }
  return s;
}

/* ---- rows ---- */
function spTile(pal,cls){const cols=SLOT_KEYS.map(k=>pal&&pal[k]).filter(Boolean);return h("span",{class:"sp-tile"+(cls?" "+cls:""),"aria-hidden":"true"},cols.map(n=>h("i",{style:`background:${spHex(n)}`})))}
function spRow(e,showGroup){
  return h("div",{class:"sp-row",role:"listitem"},
    h("button",{type:"button",class:"sp-main","data-key":e.key,onclick:()=>spLoad(e)},
      spTile(e.pal),
      h("span",{class:"sp-txt"},h("b",{text:e.name}),h("small",{class:"sp-sub"},showGroup?h("span",{class:"sp-g",text:e.group}):null,e.blurb))),
    h("button",{type:"button",class:"sp-pb","aria-label":`Take parts from ${e.name}`,onclick:ev=>spOpenParts(e,ev.currentTarget),text:"Parts"}));
}
function spBlankRow(){
  return h("div",{class:"sp-row",role:"listitem"},
    h("button",{type:"button",class:"sp-main start blank",onclick:()=>{replaceState({...blankState(),out:S.out,layers:S.layers,order:S.order});$("#startsDlg").close()}},
      h("span",{class:"sp-tile blank","aria-hidden":"true"}),
      h("span",{class:"sp-txt"},h("b",{text:"Blank"}),h("small",{class:"sp-sub",text:"Nothing set. Build from nothing."}))));
}
function renderStartGroups(){
  const wrap=$("#spGroups");wrap.textContent="";
  const chip=(id,label)=>h("button",{type:"button",class:"chip"+(SP.grp===id?" on":""),"aria-pressed":SP.grp===id?"true":"false",onclick:()=>{SP.grp=id;renderStartGroups();renderStartList();$("#spScroll").scrollTop=0},text:label});
  wrap.append(chip("all","All"));
  if(recentStarts().some(k=>SP.data.byKey[k]))wrap.append(chip("recent","Recent"));
  SP.data.groups.forEach(g=>wrap.append(chip("g:"+g.label,g.label)));
  if(SP.data.list.some(e=>e.s))wrap.append(chip("saves","My saves"));
}
function renderStartList(){
  const box=$("#startGrid");box.textContent="";
  const terms=SP.q.toLowerCase().split(/\s+/).filter(Boolean);
  let pool=SP.data.list;
  if(SP.grp==="recent")pool=recentStarts().map(k=>SP.data.byKey[k]).filter(Boolean);
  else if(SP.grp==="saves")pool=pool.filter(e=>e.s);
  else if(SP.grp.startsWith("g:"))pool=pool.filter(e=>!e.s&&e.group===SP.grp.slice(2));
  if(terms.length){
    const hits=pool.map(e=>[e,spScore(e,terms)]).filter(x=>x[1]>=0).sort((a,b)=>b[1]-a[1]||a[0].i-b[0].i).map(x=>x[0]);
    if(!hits.length){
      box.append(h("div",{class:"sp-empty"},h("p",{text:`No starting points match “${SP.q.trim()}”. Try a house, a color or a hair style.`}),
        h("button",{type:"button",class:"btn sm",onclick:()=>{SP.q="";$("#spQ").value="";SP.grp="all";renderStartGroups();renderStartList();$("#spQ").focus()},text:"Clear the search"})));
      return;
    }
    hits.forEach(e=>box.append(spRow(e,SP.grp==="all"||SP.grp==="recent")));
    return;
  }
  if(SP.grp==="all"){
    box.append(spBlankRow());
    let last="";
    pool.forEach(e=>{if(e.group!==last){last=e.group;const n=pool.filter(x=>x.group===e.group).length;box.append(h("h3",{class:"sp-gh"},e.group,h("small",{text:String(n)})))}box.append(spRow(e,false))});
    return;
  }
  pool.forEach(e=>box.append(spRow(e,SP.grp==="recent")));
}
function openStarts(){
  const d=$("#startsDlg");
  SP.data=spCatalog();SP.q="";SP.src=null;
  if(SP.grp!=="all"&&!(SP.grp==="recent"||SP.grp==="saves"||SP.data.groups.some(g=>"g:"+g.label===SP.grp)))SP.grp="all";
  const q=$("#spQ");q.value="";q.placeholder=`Search ${SP.data.list.length} starting points`;
  q.oninput=()=>{SP.q=q.value;renderStartList();$("#spScroll").scrollTop=0};
  q.onkeydown=ev=>{if(ev.key==="Enter"){const b=$("#startGrid .sp-main:not(.blank)");if(b){ev.preventDefault();b.click()}}};
  spShowParts(false);renderStartGroups();renderStartList();
  d.showModal();$("#spScroll").scrollTop=0;
  if(matchMedia("(pointer:fine)").matches)q.focus();
}
function spLoad(e){
  const d=$("#startsDlg");
  if(e.t)loadStart(e.t);else{replaceState(e.s.state);toast(`Loaded “${e.name}”.`)}
  noteRecent(e.key);d.close();
}

/* ---- Parts: take only some of a starting point ---- */
function spSource(e){return e.t?stateFromTemplate(e.t):normalize(JSON.parse(JSON.stringify(e.s.state)))}
/* the same conversion Switch Sex runs, on a copy; null when the safeguard refuses it */
function sexCopy(st,toMale){
  const keep=S;
  try{
    S=normalize(JSON.parse(JSON.stringify(st)));
    if(toMale&&Policy.restricted())return null;
    const rep={changed:0,cleared:0,items:0,removed:0,restored:0,jewelry:toMale},cPre={...S.c};
    if(toMale)maleHair(S.c,rep);
    convertChars(S.c,toMale,rep);
    if(toMale){mascPass(S.c,cPre,rep);OUT_TEXT.forEach(k=>{if(S.out[k]&&!/^\s*$/.test(S.out[k]))S.out[k]=maleText(S.out[k])})}
    if(toMale)S.c.sex="male";else delete S.c.sex;
    S.outfits.forEach(o=>convertOutfit(o,toMale,rep));
    delete S.sexMemo;
    return S;
  }catch(err){return null}
  finally{S=keep}
}
function partInfo(src,raw){
  const info={};
  const res=v=>litColor(v,src.pal);
  const ORDER=[].concat(STEP_FIELDS.concept,STEP_FIELDS.face,STEP_FIELDS.hair,["skinTone","undertone","skinFinish","markings","bodyMarkings"],STEP_FIELDS.body,STEP_FIELDS.makeup);
  const rank=f=>{const i=ORDER.indexOf(f);return i<0?999:i};
  const vals=p=>Object.keys(src.c).filter(f=>partOf(f)===p&&!/Color$/.test(f)&&src.c[f]!==""&&src.c[f]!=null).sort((a,b)=>rank(a)-rank(b)).map(f=>String(res(src.c[f])));
  PARTS.forEach(([p])=>{
    if(p==="palette"){const n=SLOT_KEYS.map(k=>src.pal[k]).filter(Boolean);if(n.length)info[p]=joinNatural(n);return}
    if(p==="outfits"){const n=src.outfits.filter(o=>Object.keys(o.items||{}).length||/nude/i.test(o.name||"")).map(o=>o.name);if(n.length)info[p]=joinNatural(n);return}
    if(p==="finish"){const o=raw&&raw.out?raw.out:src.out;const bits=[];if(o.framing)bits.push(o.framing+" framing");if(o.must)bits.push("must-haves");if(o.avoid)bits.push("things to avoid");if(o.style==="narrative")bits.push("sentence style");if(o.notes)bits.push("notes");if(bits.length)info[p]=bits.join(", ");return}
    const v=vals(p);if(!v.length)return;
    const all=Object.keys(src.c).filter(f=>partOf(f)===p&&src.c[f]!==""&&src.c[f]!=null).length;
    info[p]=p==="intimate"?`${all} details for the Nude outfit`:v.slice(0,3).join(", ")+(v.length>3?` and ${v.length-3} more`:"");
  });
  return info;
}
function spShowParts(on){
  $("#spParts").hidden=!on;["#spScroll",".sp-bar",".sp-foot"].forEach(s=>{const n=$("#startsDlg "+s);if(n)n.hidden=on});
}
function spOpenParts(e,from){
  SP.ret=from||null;
  const raw=e.t||null,src=spSource(e),info=partInfo(src,raw&&{out:raw.out||{}});
  const wantMale=isMale(),srcMale=!!(src.c&&src.c.sex==="male");
  let conv=src,convNote="",blockPerson=false;
  if(wantMale!==srcMale){conv=sexCopy(src,wantMale);if(conv)convNote=wantMale?"Your design is male, so these parts are converted to male as they come in.":"Your design is female, so these parts are converted to female as they come in.";else{blockPerson=true;conv=src;convNote="Your design is male, and the age safeguard flags this one, so only its palette can be taken."}}
  const box=$("#spParts");box.textContent="";
  const pick=new Set();
  const take=h("button",{type:"button",class:"btn primary",disabled:true,onclick:()=>{spApplyParts(e,conv,pick,{mine:mine.querySelector("input").checked});$("#startsDlg").close()}});
  const mine=h("label",{class:"sp-opt chk"},h("input",{type:"checkbox"}),h("span",{text:"Use my palette for its colors"}));
  const sync=()=>{
    take.disabled=!pick.size;take.textContent=pick.size?`Take ${pick.size} part${pick.size>1?"s":""}`:"Pick parts to take";
    const colored=[...pick].some(p=>p!=="palette"&&p!=="finish"&&p!=="concept");
    mine.hidden=pick.has("palette")||!colored;
    box.querySelectorAll(".sp-part").forEach(l=>l.classList.toggle("on",pick.has(l.dataset.part)));
  };
  const rows=PARTS.filter(([p])=>info[p]).map(([p,label])=>{
    const off=blockPerson&&PART_PERSON.has(p);
    const cb=h("input",{type:"checkbox",disabled:off?true:null,onchange:ev=>{if(ev.target.checked)pick.add(p);else pick.delete(p);sync()}});
    return h("label",{class:"sp-part"+(off?" off":""),"data-part":p},cb,h("span",{},h("b",{text:label}),
      p==="palette"?h("span",{class:"sp-pal","aria-hidden":"true"},SLOT_KEYS.map(k=>src.pal[k]).filter(Boolean).map(n=>h("i",{style:`background:${spHex(n)}`}))):null,
      h("small",{text:info[p]})));
  });
  box.append(...[
    h("div",{class:"sp-ph"},h("button",{type:"button",class:"btn sm",onclick:()=>{spShowParts(false);if(SP.ret&&SP.ret.isConnected)SP.ret.focus()},text:"‹ All starting points"})),
    h("div",{class:"sp-src"},spTile(e.pal,"big"),h("div",{},h("h3",{tabindex:"-1",text:`Take parts from ${e.name}`}),h("p",{class:"muted small",text:"Pick what to bring into your design. Everything else stays as it is."}))),
    h("div",{class:"sp-plist"},rows),
    mine,
    convNote?h("p",{class:"sp-note small",text:convNote}):null,
    h("div",{class:"sp-actions"},take,h("button",{type:"button",class:"btn",onclick:()=>spLoad(e),text:"Load all of it"}))].filter(Boolean));
  sync();spShowParts(true);box.scrollTop=0;
  const hd=box.querySelector("h3");if(hd)hd.focus({preventScroll:true});
}
function spApplyParts(e,src,pick,opt){
  const keepColors=!pick.has("palette")&&!opt.mine;
  const fix=v=>keepColors?litColor(v,src.pal):v;
  const fixOutfit=o=>{const n=JSON.parse(JSON.stringify(o));Object.values(n.items||{}).forEach(it=>{if(it){it.c=fix(it.c);if(it.c2)it.c2=fix(it.c2)}});Object.keys(n.dcol||{}).forEach(k=>{n.dcol[k]=fix(n.dcol[k])});delete n.lock;return n};
  const steps=new Set();let opts=0,outfitKept=false;
  const skip=f=>{const st=stepOf(f);if(stepFrozen(st)){steps.add(stepName(st));return true}if(isLocked(f)){opts++;return true}return false};
  mut(()=>{
    if(pick.has("palette"))SLOT_KEYS.forEach(k=>{if(skip("pal:"+k))return;S.pal[k]=src.pal[k]||""});
    if([...pick].some(p=>p!=="palette"&&p!=="outfits"&&p!=="finish")){
      new Set([...Object.keys(S.c),...Object.keys(src.c)]).forEach(f=>{
        const p=partOf(f);if(!p||!pick.has(p)||skip(f))return;
        const v=src.c[f];if(v==null||v==="")delete S.c[f];else S.c[f]=typeof v==="string"?fix(v):JSON.parse(JSON.stringify(v));
      });
      if(pick.has("concept")){if(src.c.sex==="male")S.c.sex="male";else delete S.c.sex}
    }
    if(pick.has("outfits")){
      if(stepFrozen("outfit"))outfitKept=true;
      else{
        const fo=cur(),tl=fo.lock||{},next=src.outfits.map(fixOutfit);
        if(!next.length)next.push(newOutfit("Outfit 1"));
        const o0=next[0];
        Object.keys(tl).forEach(k=>{
          if(k.startsWith("d:")){const f=k.slice(2);if(fo.details[f]){o0.details[f]=fo.details[f];if(fo.dcol&&fo.dcol[f])o0.dcol[f]=fo.dcol[f];(o0.lock=o0.lock||{})[k]=true;opts++}}
          else if(fo.items[k]){o0.items[k]=JSON.parse(JSON.stringify(fo.items[k]));(o0.lock=o0.lock||{})[k]=true;opts++}
        });
        S.outfits=next;S.cur=0;
      }
    }
    if(pick.has("finish")){PART_FINISH.forEach(k=>{if(src.out[k]!==undefined)S.out[k]=src.out[k]});if(S.out.style==="narrative")S.order=narrOrder(S.order,true)}
  });
  noteRecent(e.key);
  const names=PARTS.filter(([p])=>pick.has(p)).map(([p])=>PART_NAME[p]);
  const bits=[];if(opts)bits.push(`${opts} locked option${opts>1?"s":""}`);if(steps.size)bits.push(`the locked ${joinNatural([...steps])} step${steps.size>1?"s":""}`);if(outfitKept)bits.push("your locked outfit");
  toast(`Took ${joinNatural(names)} from “${e.name}”.${bits.length?` Kept ${joinNatural(bits)}.`:""} Undo brings back your previous design.`);
}
function readSaves(){return loadJSON(KEY_SAVES,[])}
function openSaves(){
  const d=$("#savesDlg");renderSaves();d.showModal();
}
function renderSaves(){
  const list=$("#saveList");list.textContent="";const saves=readSaves();
  if(!saves.length)list.append(h("p",{class:"muted",text:"Nothing saved yet. Name your design and press Save."}));
  saves.forEach(s=>list.append(h("div",{class:"saved"},h("div",{},h("b",{text:s.name}),h("small",{text:new Date(s.ts).toLocaleString()})),
    h("div",{class:"btnrow"},
      h("button",{type:"button",class:"btn sm",onclick:()=>{replaceState(s.state);$("#savesDlg").close();toast(`Loaded “${s.name}”.`)},text:"Load"}),
      h("button",{type:"button",class:"btn sm",onclick:()=>{const all=readSaves();all.unshift({id:"s"+Date.now(),name:s.name+" copy",ts:Date.now(),state:s.state});saveJSON(KEY_SAVES,all);renderSaves()},text:"Duplicate"}),
      h("button",{type:"button",class:"btn sm danger",onclick:()=>{saveJSON(KEY_SAVES,readSaves().filter(x=>x.id!==s.id));renderSaves()},text:"Delete"})))));
  const mine=$("#myOpts");mine.textContent="";
  const keys=Object.keys(CUSTOM);
  if(!keys.length)mine.append(h("p",{class:"muted",text:"Options you save from any picker appear here."}));
  keys.forEach(k=>{const lab=k==="__colors"?"Colors":k.startsWith("o:")?OUT_LABEL[k.slice(2)]:LABELS[k];
    mine.append(h("div",{class:"myopt"},h("b",{text:lab||k}),h("div",{class:"chips"},CUSTOM[k].map(v=>h("button",{type:"button",class:"chip on",title:"Remove “"+v+"”",onclick:()=>{removeCustom(k,v);renderSaves();renderMain()},text:v+" ×"})))))});
}
async function download(name,text,type){try{const f=new File([text],name,{type:type||"application/json"});if(matchMedia("(pointer:coarse)").matches&&navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:name});return}}catch(e){if(e&&e.name==="AbortError")return}const a=h("a",{href:URL.createObjectURL(new Blob([text],{type:type||"application/json"})),download:name});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function exportAll(){
  const all=readSaves();
  const cur_={id:"current",name:S.name,ts:Date.now(),state:S};
  download("character-studio-designs.json",JSON.stringify({format:"charstudio",v:1,designs:[cur_,...all.filter(x=>x.id!=="current")],custom:CUSTOM},null,1));
}
function importFile(file){
  const r=new FileReader();
  r.onload=()=>{try{
    const j=JSON.parse(r.result);if(j.format!=="charstudio")throw new Error("not an Everspire file");
    const all=readSaves();let n=0;(j.designs||[]).forEach(d=>{all.unshift({id:"i"+Date.now()+n++,name:d.name||"Imported",ts:d.ts||Date.now(),state:normalize(d.state)})});saveJSON(KEY_SAVES,all);
    Object.entries(j.custom||{}).forEach(([k,arr])=>{(Array.isArray(arr)?arr:[]).forEach(v=>{if(typeof v==="string")addCustom(k,v)})});
    renderSaves();renderMain();toast(`Imported ${n} design${n===1?"":"s"}.`);
  }catch(e){toast("That file isn’t an Everspire export.")}};
  r.readAsText(file);
}

/* ---------- phone prompt sheet ---------- */
function setSide(on){document.body.classList.toggle("showSide",!!on);const b=$("#barPreview");if(b){b.setAttribute("aria-expanded",on?"true":"false");b.lastElementChild.textContent=on?"Edit":"Prompt"}if(on){const s=$("#side");if(s)s.scrollTop=0}}
/* ---------- copy & misc ---------- */
async function copyText(text,btn,label){
  try{await navigator.clipboard.writeText(text)}catch(e){const ta=h("textarea",{style:"position:fixed;top:0;left:0;opacity:0;font-size:16px",readonly:"true"});ta.value=text;document.body.append(ta);ta.focus();ta.select();ta.setSelectionRange(0,text.length);try{document.execCommand("copy")}catch(_){}ta.remove()}
  toast(label||"Copied");if(btn){const o=btn.dataset.l||btn.textContent;btn.dataset.l=o;btn.textContent="Copied";setTimeout(()=>btn.textContent=o,1200)}
}
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.setItem(KEY_THEME,t)}catch(e){}$("#themeBtn").textContent=t==="dark"?"Light":"Dark"}

/* ===== v140/v141: starting points, organized (v141: the last search is remembered) =====
   The picker had one chip per group (about 50) and an "All" list of every starting point. Now:
     sections   All · Characters · Academy · Men · Scenes · Recent · My saves
     Academy    pick a girl (all her looks, by category) and/or a set (the girls in it)
     Scenes     the two-character sets (soft to intense), also by girl
     All        an overview: the Characters groups, then compact cards for each Academy set and scene set
   Search works across the current section (everything from All). Group labels are unchanged underneath
   (other code places groups by label); only what the picker shows is shortened ("Academy Swim Team" → "Swim Team"). */
(function(){
  const HOUSES=(typeof ACAD!=="undefined"&&ACAD.HOUSES)||[];
  const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
  /* v160: the Academy reorganized into clearer categories, everyday to explicit, now that there are over fifty sets */
  const CATS=[
    ["Robes and faculty",["Academy","Academy Signature","Academy Headmistresses","Academy Headmistress Night"]],
    ["Everyday life",["Academy Day Off","Academy Pajama Day","Academy Morning After","Academy Study Night","Academy Graduation","Academy Cooking Club","Academy Housewives","Academy Cafe Maids","Academy Bartenders","Academy Corporate",
      "Academy Lazy Sunday","Academy Date Night","Academy Night Out","Academy Ballgowns","Academy Spa Day","Academy Onsen"]],
    ["Seasons and travel",["Academy Spring Blossoms","Academy Summer Days","Academy Tropical Island","Academy Vacation","Academy Road Trip","Academy City Postcards","Academy Hiking","Academy Autumn Harvest","Academy Festival","Academy Halloween","Academy Winter Break","Academy Christmas","Academy New Year's Eve","Academy Valentine's"]],
    ["Sports and clubs",["Academy Cheerleaders","Academy Swim Team","Academy Beach Volleyball","Academy Sports Day","Academy Gym Rats","Academy Locker Room","Academy Idol Concert","Academy Music Video"]],
    ["Costumes",["Academy Waifus","Academy Bunny Girls","Academy Cosplay","Academy French Maids","Academy Nurses","Academy Flight Attendants","Academy Racing Queens","Academy Firefighters","Academy Police","Academy Noir","Academy Military",
      "Academy Belly Dancers","Academy Qipao","Academy Geishas","Academy Victorian","Academy Steampunk","Academy Latex","Academy Pirates","Academy Cowgirls","Academy Pokemon Trainers"]],
    ["Fantasy and sci-fi",["Academy Monster Girls","Academy Mermaids","Academy Sirens","Academy Elves","Academy Fairies","Academy Witches","Academy Succubi","Academy Angels","Academy Goddesses","Academy Royal Court","Academy Elementals","Academy Vampires","Academy Prehistoric",
      "Academy Aliens","Academy Space Pilots","Academy Cyberpunk","Academy Post-Apocalypse","Academy Magical Heroines","Academy Superheroines","Academy Spider Heroines","Academy Battle Maidens","Academy Knights","Academy Dragon Riders","Academy Kunoichi"]],
    ["Story and drama",["Academy Dungeon Trap","Academy Funeral","Academy Breakup","Academy Pregnancy Test"]],
    ["Sensual",["Academy Boudoir","Academy Lingerie Try-On","Academy Artists' Models","Academy Nude Photoshoot","Academy Pregnant","Academy First Time","Academy Afterglow"]],
    ["Exhibition",["Academy Bathroom Show","Academy Public Exhibition","Academy Public Masturbation","Academy Strip Club","Academy Public Pee","Academy Highest Bidder"]],
    ["Explicit",["Academy Ruined","Academy Office Hours","Academy Library After Hours"]]];
  const SCENE_ORDER=["Academy Forehead Kiss","Academy Piggyback","Academy Princess Carry","Academy Couch Cuddles","Academy Shared Umbrella","Academy Slow Dance","Academy Back Hug","Academy Asleep On His Shoulder","Academy Feeding Each Other","Academy Stargazing","Academy Holding Hands","Academy Lazy Morning Cuddles","Academy Best Friend Selfie","Academy Pillow Fight",
    "Academy Couples","Academy Rivals","Academy Rivals Truce","Academy Sweethearts","Academy First Date","Academy First Kiss","Academy Moving In","Academy Proposal","Academy Wedding","Academy Pure Love","Academy Honeymoon Suite","Academy Yuri","Academy Real: Portraits","Academy Real: Cozy","Academy Real: Lingerie","Academy Real: Wet","Academy Real: Nude","Academy Anime: Portraits","Academy Anime: Cozy","Academy Anime: Lingerie","Academy Anime: Wet","Academy Anime: Nude","Academy Secret Girlfriends: Sleepover Excuse","Academy Secret Girlfriends: Family Holidays","Academy Secret Girlfriends: Close Calls","Academy Secret Girlfriends: Just Roommates","Academy Secret Girlfriends: Dear Diary","Academy Rivals Lovers","Academy Missionary","Academy Cowgirl","Academy Reverse Cowgirl","Academy Doggystyle","Academy Mating Press","Academy Against The Wall","Academy Spooning","Academy Prone Bone","Academy Lotus","Academy Blowjob","Academy Cunnilingus","Academy Titjob","Academy Bent Over Anal","Academy Creampie Aftermath","Academy Tribbing","Academy Yuri Oral",
    "Academy Intimacy","Academy Morning Sex","Academy Massage","Academy Shower Sex","Academy Kitchen Counter","Academy Car Sex","Academy Lap Dance","Academy Sex Tape",
    "Academy Public Sex","Academy Rough and Passionate","Academy Mirror Sex","Academy Oral Showcase","Academy Sixty-Nine","Academy Paizuri","Academy Squirting","Academy Edging","Academy All Night","Academy Threesomes","Academy Yuri Scissoring","Academy Yuri Strap-on","Academy Glory Hole","Academy Femdom","Academy Affairs","Academy NTR","Academy Cheating Brides","Academy Cheating Housewives","Academy NTR Sisters","Academy Not His Anymore","Academy Guilty Cheating","Academy Secret Affairs","Academy Stolen Wives","Academy Mortified","Academy Lost the Bet","Academy Degradation Play","Academy Human Furniture","Academy Free-Use Toy","Academy Cum Receptacle","Academy Pet Girls","Academy Hucows","Academy Body Writing","Academy Self-Degradation","Academy Bukkake","Academy Spit","Academy Golden Showers","Academy Brought Low","Academy Cuckqueen","Academy Orgasm Denial","Academy Kink Club Stage","Academy Fan Page","Academy Bimbofication","Academy Pony Girls","Academy Property Tattoo","Academy Condom Trophies","Academy Bathroom Wall","Academy Urinal Girl","Academy Desperation","Academy Clearance Sale","Academy Sploshing","Academy Cum on Her Food","Academy Eating off the Floor","Academy Slave Contract","Academy Confession Booth","Academy Mind Break","Academy Toothbrush Maid","Academy Foot Servant","Academy Panty Gag","Academy Best Friend's Man","Academy Best Friend's Man II","Academy Caught by Her Best Friend","Academy Caught: Broken Trust","Academy Caught: The Worst Possible Night","Academy Caught: It Was Never an Accident","Academy Power Plays","Academy Strangers","Academy Hate Sex","Academy Hate Sex II","Academy Forbidden Places","Academy Depraved","Academy Pregnancy Sex","Academy Impregnation","Academy Anal",
    "Academy Bound and Gagged","Academy Futa Surprise","Academy Futa Masturbation","Academy Futa Best Friends","Academy Gangbang","Academy Kink Club","Academy Cosplay Punishment: On the Clock","Academy Cosplay Punishment: In Uniform","Academy Cosplay Punishment: Office Hours","Academy Depraved Cosplay: Fantasy Kingdom","Academy Depraved Cosplay: Myths and Legends","Academy Depraved Cosplay: Cosmic","Academy Cosplay Baby Fever: Fertility Rites","Academy Cosplay Baby Fever: Bedroom Schemes","Academy Cosplay Baby Fever: Total Commitment"];
  /* the same order underneath, so every other list (the Scene tab's pickers, for one) follows it */
  {const order=CATS.flatMap(([,l])=>l).concat(["Academy Men"],SCENE_ORDER);
   const ac=PRESET_GROUPS.start.filter(g=>/^Academy/.test(g.label)),rest=PRESET_GROUPS.start.filter(g=>!/^Academy/.test(g.label));
   ac.sort((a,b)=>(order.indexOf(a.label)+1||999)-(order.indexOf(b.label)+1||999));
   PRESET_GROUPS.start.length=0;PRESET_GROUPS.start.push(...rest,...ac);}
  /* v176: shared with the generic outfit library */
  if(typeof ACAD!=="undefined"){ACAD.CATS=CATS;ACAD.SCENE_ORDER=SCENE_ORDER}
  const SECTIONS=[["chars","Characters"],["academy","Academy"],["men","Men"],["scenes","Scenes"],["archive","Archive"]];
  const disp=l=>l==="Academy"?"Robes":String(l).replace(/^Academy /,"");
  const catOf=l=>{const c=CATS.find(([,ls])=>ls.includes(l));return c?c[0]:"More"};
  const T=id=>tplById(id);
  const peek=t=>typeof ACAD!=="undefined"&&ACAD.peekOut?ACAD.peekOut(t):t&&t.out;   /* v210: a house copy answers from its sister without translating */
  const isScene=g=>SCENE_ORDER.includes(g.label)||g.keys.some(k=>{const t=T(k),o=t&&peek(t);return o&&o.pair&&o.pair.id});
  function sectionOf(label,data){
    if(typeof ACAD!=="undefined"&&ACAD.ARCHIVED&&ACAD.ARCHIVED.has(label))return"archive";   /* v215: the scene archive */
    if(label==="Academy Men"||label==="Academy Principals")return"men";   /* v216: the principals stand with the men */
    if(CATS.some(([,ls])=>ls.includes(label)))return"academy";   /* v142: an Academy set that can also take a partner stays with the Academy sets */
    const g=data.groups.find(x=>x.label===label);
    if(g&&isScene(g))return"scenes";
    if(/^Academy/.test(label))return"academy";
    return"chars";
  }
  function houseOf(e){
    if(!e.t)return"";const id=e.t.id;
    const byId=HOUSES.filter(h=>id.startsWith(h)).sort((a,b)=>b.length-a.length)[0];if(byId)return byId;
    const tag=(e.t.tags||[]).find(x=>HOUSES.includes(x));if(tag)return tag;
    const w=String(e.blurb||"").split(/\W+/)[0].toLowerCase();return HOUSES.includes(w)?w:"";
  }
  /* order: the Academy sets by category, the scene sets soft to intense */
  function setOrder(sec,data){
    const ls=data.groups.map(g=>g.label).filter(l=>sectionOf(l,data)===sec);
    if(sec==="academy"){const flat=CATS.flatMap(([,l])=>l);return ls.slice().sort((a,b)=>(flat.indexOf(a)+1||999)-(flat.indexOf(b)+1||999))}
    if(sec==="scenes"||sec==="archive")return ls.slice().sort((a,b)=>(SCENE_ORDER.indexOf(a)+1||999)-(SCENE_ORDER.indexOf(b)+1||999));
    return ls;
  }
  const css=document.createElement("style");
  css.textContent=
    ".sp-sub{margin-top:6px}.sp-sub .chip{font-size:.82rem}.sp-sub .sp-cat{font-size:.72rem;color:var(--muted);align-self:center;white-space:nowrap;padding:0 2px 0 8px}"+
    ".sp-sec{grid-column:1/-1;font-size:1.15rem;margin:20px 6px 2px}"+
    "#startsDlg .sp-main.sp-set{flex-direction:row;justify-content:flex-start;align-items:center;gap:12px;border:0;background:transparent;padding:8px;width:100%;text-align:left}#startsDlg .sp-main.sp-set:hover{background:var(--panel2)}"+
    ".sp-dots{display:grid;grid-template-columns:repeat(5,10px);gap:3px;width:62px;flex:none}.sp-dots i{width:10px;height:10px;border-radius:50%;display:block;border:1px solid rgba(0,0,0,.14)}"+
    ".sp-girls{display:flex;flex-wrap:wrap;gap:6px;grid-column:1/-1;margin:4px 6px 8px}";
  document.head.append(css);

  const st=()=>{if(!SP.sec)SP.sec="all";if(SP.set==null)SP.set="";if(SP.girl==null)SP.girl="";return SP};
  function subRow(){let r=$("#spSub");if(!r){r=h("div",{id:"spSub",class:"sp-groups sp-sub",role:"group","aria-label":"Sets"});$("#spGroups").after(r)}return r}
  function girlRow(){let r=$("#spGirl");if(!r){r=h("div",{id:"spGirl",class:"sp-groups sp-sub",role:"group","aria-label":"Girls"});subRow().after(r)}return r}
  function go(sec,set,girl){const s=st();s.sec=sec;s.set=set||"";s.girl=girl||"";renderStartGroups();renderStartList();$("#spScroll").scrollTop=0}

  renderStartGroups=function(){
    const s=st(),data=SP.data,wrap=$("#spGroups");wrap.textContent="";
    const chip=(on,label,fn)=>h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:fn,text:label});
    wrap.append(chip(s.sec==="all","All",()=>go("all")));
    SECTIONS.forEach(([id,label])=>{if(data.groups.some(g=>sectionOf(g.label,data)===id))wrap.append(chip(s.sec===id,label,()=>go(id)))});
    if(recentStarts().some(k=>data.byKey[k]))wrap.append(chip(s.sec==="recent","Recent",()=>go("recent")));
    if(data.list.some(e=>e.s))wrap.append(chip(s.sec==="saves","My saves",()=>go("saves")));
    /* second row: sets (and girls) for the chosen section */
    const sub=subRow();sub.textContent="";sub.hidden=true;
    if(s.sec==="chars"||s.sec==="academy"||s.sec==="scenes"||s.sec==="archive"){
      sub.hidden=false;
      sub.append(chip(!s.set,s.sec==="chars"?"All groups":"All sets",()=>go(s.sec,"",s.girl)));
      let lastCat="";
      setOrder(s.sec,data).forEach(l=>{
        if(s.sec==="academy"){const c=catOf(l);if(c!==lastCat){lastCat=c;sub.append(h("span",{class:"sp-cat",text:c}))}}
        sub.append(chip(s.set===l,disp(l),()=>go(s.sec,l,s.girl)));
      });
      /* v163: "Surprise me" loads a random look (or scene) from what is showing: the chosen set and girl, or the whole section */
      if(s.sec==="academy"||s.sec==="scenes"||s.sec==="archive")sub.append(h("button",{type:"button",class:"chip",title:"Load a random starting point from this list",onclick:()=>{
        const pool=data.list.filter(e=>!e.s&&sectionOf(e.group,data)===s.sec&&(!s.set||e.group===s.set)&&(!s.girl||houseOf(e)===s.girl));
        if(pool.length)spLoad(pool[Math.floor(Math.random()*pool.length)])},text:"Surprise me"}));
    }
    /* third row: the girls (Academy and Scenes) */
    const gr=girlRow();gr.textContent="";gr.hidden=!(s.sec==="academy"||s.sec==="scenes"||s.sec==="archive");
    if(!gr.hidden){gr.append(chip(!s.girl,"All girls",()=>go(s.sec,s.set,"")));const FAM=ACAD.FAMILY||{};let last="";   /* v213: the girls in families, each family labeled */
      HOUSES.forEach(hh=>{const f=FAM[hh];if(f&&f!==last){last=f;const gg=(ACAD.GROUPS||[]).find(x=>x.name===f),ci=gg&&ACAD.crestImg?ACAD.crestImg(gg.id,16):null;gr.append(h("span",{class:"sp-fam"},ci,h("span",{text:f})))}const c=chip(s.girl===hh,(ACAD.HNAME&&ACAD.HNAME[hh])||cap(hh),()=>go(s.sec,s.set,hh));if(ACAD.pixelImg){const im=ACAD.pixelImg(hh,16);if(im){im.style.marginRight="4px";c.prepend(im)}}gr.append(c)})}
    const q=$("#spQ");if(q){const nm={chars:"characters",academy:"the Academy",men:"the men",scenes:"scenes",archive:"the scene archive",recent:"recent",saves:"your saves"}[s.sec];
      q.placeholder=nm?`Search ${nm}`:`Search ${data.list.length} starting points`}
  };

  /* v210: each group's entries, gathered once per opening of the picker (not once per set card) */
  const byGroup=data=>data._byGroup||(data._byGroup=(()=>{const m=new Map();data.list.forEach(e=>{if(e.s)return;let a=m.get(e.group);if(!a)m.set(e.group,a=[]);a.push(e)});return m})());
  function setCard(label){
    const data=SP.data,es=byGroup(data).get(label)||[];
    const dots=h("span",{class:"sp-dots","aria-hidden":"true"},es.slice(0,15).map(e=>h("i",{style:`background:${spHex(e.pal.primary||Object.values(e.pal)[0]||"")}`})));
    const sec=sectionOf(label,data);
    return h("div",{class:"sp-row",role:"listitem"},
      h("button",{type:"button",class:"sp-main sp-set",onclick:()=>go(sec==="men"?"men":sec,sec==="men"?"":label)},dots,
        h("span",{class:"sp-txt"},h("b",{text:disp(label)}),h("small",{class:"sp-sub",text:`${es.length} ${sec==="scenes"||sec==="archive"?"scenes":es.length===1?"look":"looks"}`+(sec==="academy"?` · ${catOf(label)}`:"")}))));
  }
  const row=(e,showGroup)=>{const r=spRow(e,showGroup);const g=r.querySelector(".sp-g");if(g)g.textContent=(typeof ACAD!=="undefined"&&ACAD.ARCHIVED&&ACAD.ARCHIVED.has(e.group)?"Archive · ":"")+disp(e.group);return r};

  renderStartList=function(){
    const s=st(),data=SP.data,box=$("#startGrid");box.textContent="";
    const terms=SP.q.toLowerCase().split(/\s+/).filter(Boolean);
    let pool=data.list;
    if(s.sec==="recent")pool=recentStarts().map(k=>data.byKey[k]).filter(Boolean);
    else if(s.sec==="saves")pool=pool.filter(e=>e.s);
    else if(s.sec!=="all")pool=pool.filter(e=>!e.s&&sectionOf(e.group,data)===s.sec&&(!s.set||e.group===s.set)&&(!s.girl||houseOf(e)===s.girl));
    if(terms.length){
      const hits=pool.map(e=>[e,spScore(e,terms)]).filter(x=>x[1]>=0).sort((a,b)=>b[1]-a[1]||a[0].i-b[0].i).map(x=>x[0]);
      if(!hits.length){
        box.append(h("div",{class:"sp-empty"},h("p",{text:`No starting points match “${SP.q.trim()}”${s.sec!=="all"?" here":""}. Try a house, a color or a hair style.`}),
          h("button",{type:"button",class:"btn sm",onclick:()=>{SP.q="";$("#spQ").value="";saveQ("");go("all");$("#spQ").focus()},text:"Clear the search"})));
        return;
      }
      if(s.sec==="all")box.append(spBlankRow());   /* Blank stays reachable while a remembered search is showing */
      hits.forEach(e=>box.append(row(e,!s.set)));
      return;
    }
    const header=(label,n,cls)=>h("h3",{class:cls||"sp-gh"},label,n!=null?h("small",{text:String(n)}):null);
    if(s.sec==="all"){
      box.append(spBlankRow());
      const groups=data.groups.map(g=>g.label);
      const chars=groups.filter(l=>sectionOf(l,data)==="chars");
      if(chars.length){box.append(header("Characters",null,"sp-sec"));
        chars.forEach(l=>{const es=byGroup(data).get(l)||[];box.append(header(disp(l),es.length));es.forEach(e=>box.append(row(e,false)))})}
      const ac=setOrder("academy",data);
      if(ac.length){box.append(header("Academy",null,"sp-sec"));let last="";
        ac.forEach(l=>{const c=catOf(l);if(c!==last){last=c;box.append(header(c))}box.append(setCard(l))})}
      const men=groups.filter(l=>sectionOf(l,data)==="men");
      if(men.length){box.append(header("Men",null,"sp-sec"));men.forEach(l=>box.append(setCard(l)))}
      const sc=setOrder("scenes",data);
      if(sc.length){box.append(header("Scenes",null,"sp-sec"));sc.forEach(l=>box.append(setCard(l)))}
      {const ar=setOrder("archive",data);if(ar.length){box.append(header("Scene archive",ar.length,"sp-sec"));   /* v215: one row, not two hundred */
        box.append(h("div",{class:"sp-row",role:"listitem"},h("button",{type:"button",class:"sp-main sp-set",onclick:()=>go("archive")},h("span",{class:"sp-txt"},h("b",{text:"Open the scene archive"}),h("small",{class:"sp-sub",text:`${ar.length} older scene sets, kept for reference. The Scenes list holds the sets that fit the Academy as it is now.`})))))}}
      if(data.list.some(e=>e.s)){const sv=data.list.filter(e=>e.s);box.append(header("My saves",sv.length,"sp-sec"));sv.forEach(e=>box.append(row(e,false)))}
      return;
    }
    if(s.sec==="academy"||s.sec==="scenes"||s.sec==="archive"){
      if(!s.set&&!s.girl){   /* overview of the sets */
        let last="";
        setOrder(s.sec,data).forEach(l=>{if(s.sec==="academy"){const c=catOf(l);if(c!==last){last=c;box.append(header(c))}}box.append(setCard(l))});
        return;
      }
      if(!s.set){   /* one girl across every set, by category (Academy) or by set (Scenes) */
        let last="";
        setOrder(s.sec,data).forEach(l=>{const es=pool.filter(e=>e.group===l);if(!es.length)return;
          const head=s.sec==="academy"?catOf(l):disp(l);
          if(head!==last){last=head;box.append(header(head,s.sec==="academy"?pool.filter(e=>catOf(e.group)===head).length:es.length))}
          es.forEach(e=>box.append(row(e,s.sec==="academy")))});
        return;
      }
      pool.forEach(e=>box.append(row(e,false)));
      if(!pool.length)box.append(h("p",{class:"sp-empty",text:"Nothing here for that girl in this set."}));
      return;
    }
    if(s.sec==="chars"&&!s.set){
      data.groups.map(g=>g.label).filter(l=>sectionOf(l,data)==="chars").forEach(l=>{const es=pool.filter(e=>e.group===l);box.append(header(disp(l),es.length));es.forEach(e=>box.append(row(e,false)))});
      return;
    }
    pool.forEach(e=>box.append(row(e,s.sec==="recent"||s.sec==="saves")));
  };

  /* v141: the last search is kept (in this browser) and is back when the picker opens again */
  const KEYQ="charstudio.startQ.v1";
  function loadQ(){try{return localStorage.getItem(KEYQ)||""}catch(e){return""}}
  function saveQ(v){try{if(v&&v.trim())localStorage.setItem(KEYQ,v);else localStorage.removeItem(KEYQ)}catch(e){}}
  const os=openStarts;
  openStarts=function(){os();st();
    const q=$("#spQ"),prev=loadQ();
    if(prev){q.value=prev;SP.q=prev}
    q.oninput=()=>{SP.q=q.value;saveQ(q.value);renderStartList();$("#spScroll").scrollTop=0};
    renderStartGroups();renderStartList();
    if(prev&&matchMedia("(pointer:fine)").matches)q.select();
  };
})();
/* ---- v146: a multi-word search ("deep teal", "black hair") ranks entries that contain the whole phrase first,
   so an exact palette colour beats an entry whose name merely starts with the first word. ---- */
(function(){
  if(typeof spScore!=="function")return;
  const base=spScore;
  spScore=function(e,terms){
    let s=base(e,terms);if(s<0||!terms||terms.length<2)return s;
    const q=terms.join(" ");
    if(e.name.toLowerCase().includes(q))s+=25;
    else if(Object.values(e.pal||{}).join(" | ").toLowerCase().includes(q))s+=18;
    else if(e.hay.includes(q))s+=8;
    return s;
  };
})();

/* ---- v167: four picker features, layered over the v160+ picker (tail block, after picker167.js).
   Favorites      a star on every starting point; starred ones get their own "Favorites" section (kept in this browser).
   Girl profiles  picking a girl in the Academy section (with no set chosen) opens her profile card first: palette, her robes
                  description, how many looks and scenes she has, and quick buttons for her robes, headmistress, boyfriend
                  and a random look of hers.
   Tag search     search also matches each entry's tags, set and setting, so "snow", "latex", "outdoor" or "pirate" find
                  looks across every set.
   Penguin's snow when Penguin is the chosen girl, a "Snowy looks only" chip narrows her list to her snow-and-ice looks. */
(function(){
  if(typeof renderStartList!=="function"||typeof spRow!=="function")return;
  const KEY="charstudio.favs.v1";
  const load=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch(e){return[]}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}};
  let favs=load();
  const isFav=k=>favs.includes(k);
  const toggle=k=>{favs=isFav(k)?favs.filter(x=>x!==k):favs.concat([k]);save(favs)};
  const HOUSES=(typeof ACAD!=="undefined"&&ACAD.HOUSES)||[];
  const cap=s=>s?s[0].toUpperCase()+s.slice(1):s;
  const SNOW=/\b(snow\w*|ice(?![- ]blue)|icy|frost\w*|glacier\w*|winter|aurora|frozen|antarctic|polar|blizzard|igloo|ski|skis|skiing|ski-lodge|icicle\w*)\b/i;
  const css=document.createElement("style");
  css.textContent=".sp-fav{border:0;background:transparent;font-size:1.15rem;line-height:1;cursor:pointer;padding:6px 8px;color:var(--muted);flex:none}"+
    ".sp-fav[aria-pressed=true]{color:#e0a400}.sp-fav:focus-visible{outline:2px solid currentColor;border-radius:6px}"+
    ".sp-prof{grid-column:1/-1;border:1px solid var(--line,rgba(0,0,0,.12));border-radius:12px;padding:14px 16px;margin:4px 6px 12px;background:var(--panel2,transparent)}"+
    ".sp-prof h3{margin:0 0 6px;font-size:1.2rem}.sp-prof p{margin:6px 0 10px;font-size:.9rem;line-height:1.45}"+
    ".sp-prof .sp-pal{display:flex;gap:6px;margin:4px 0}.sp-prof .sp-pal i{width:18px;height:18px;border-radius:50%;border:1px solid rgba(0,0,0,.15);display:block}"+
    ".sp-prof .sp-acts{display:flex;flex-wrap:wrap;gap:6px}.sp-prof small{color:var(--muted)}";
  document.head.append(css);

  /* a star on every row */
  const baseRow=spRow;
  spRow=function(e,showGroup){
    const r=baseRow(e,showGroup);
    if(e&&e.key&&!e.s){const on=isFav(e.key);
      const b=h("button",{type:"button",class:"sp-fav","aria-pressed":on?"true":"false","aria-label":(on?"Remove from":"Add to")+" favorites: "+e.name,title:on?"Remove from favorites":"Add to favorites",text:on?"★":"☆",
        onclick:ev=>{ev.stopPropagation();toggle(e.key);const now=isFav(e.key);b.textContent=now?"★":"☆";b.setAttribute("aria-pressed",now?"true":"false");
          b.title=now?"Remove from favorites":"Add to favorites";renderStartGroups();if(SP.sec==="favs")renderStartList()}});
      r.prepend(b)}
    return r;
  };

  /* tag search: tags, set label and setting text count too */
  if(typeof spScore==="function"){
    const base=spScore;
    spScore=function(e,terms){
      let s=base(e,terms);if(s>=0||!terms||!terms.length)return s;
      const t=e.t||{},o=(typeof ACAD!=="undefined"&&ACAD.peekOut?ACAD.peekOut(t):t.out)||{},p=o.pair||{};
      const hay=[(t.tags||[]).join(" "),e.group||"",o.must||"",p.scene||"",p.solo||""].join(" ").toLowerCase();
      return terms.every(x=>hay.includes(x))?2:-1;
    };
  }

  const nav=(sec,set,girl)=>{SP.sec=sec;SP.set=set||"";SP.girl=girl||"";renderStartGroups();renderStartList();const sc=$("#spScroll");if(sc)sc.scrollTop=0};

  /* Favorites section chip, and the Snowy chip for Penguin */
  const baseGroups=renderStartGroups;
  renderStartGroups=function(){
    baseGroups();
    const wrap=$("#spGroups");
    if(wrap&&favs.some(k=>SP.data&&SP.data.byKey[k])){const on=SP.sec==="favs";
      const c=h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:()=>nav("favs"),text:"★ Favorites"});
      const rec=[...wrap.children].find(x=>/Recent|My saves/.test(x.textContent));wrap.insertBefore(c,rec||null)}
    const gr=$("#spGirl");
    if(gr&&!gr.hidden&&SP.girl==="penguin"){const on=!!SP.snow;
      gr.append(h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",title:"Only Penguin's snow and ice looks",onclick:()=>{SP.snow=!SP.snow;renderStartGroups();renderStartList()},text:"❄ Snowy looks only"}))}
    if(SP.girl!=="penguin")SP.snow=false;
    const q=$("#spQ");if(q&&SP.sec==="favs")q.placeholder="Search your favorites";
  };

  function profile(hh){
    const data=SP.data,rb=TEMPLATES.find(t=>t.id===ACAD.robes(hh)&&t.id.endsWith("robes"))||tplById(hh+"robes");
    const of=sec=>data.list.filter(e=>!e.s&&(e.t&&(e.t.id.startsWith(hh)||(e.t.tags||[])[0]===hh))&&((sec==="scenes")===!!(e.t.out&&e.t.out.explicit))).length;
    const pal=rb&&rb.pal?Object.values(rb.pal):[];
    const btn=(label,id)=>{const e=data.list.find(x=>x.t&&x.t.id===id);return e?h("button",{type:"button",class:"btn sm",onclick:()=>spLoad(e),text:label}):null};
    const mine=data.list.filter(e=>!e.s&&e.t&&e.t.id.startsWith(hh));
    return h("div",{class:"sp-prof",role:"region","aria-label":cap(hh)+" profile"},
      h("h3",{text:((ACAD.HNAME&&ACAD.HNAME[hh])||cap(hh))+" house"}),
      h("div",{class:"sp-pal","aria-hidden":"true"},pal.map(c=>h("i",{style:`background:${spHex(c)}`}))),
      h("p",{text:rb?rb.blurb:""}),
      h("small",{text:`${of("looks")} looks and ${of("scenes")} explicit scenes across the Academy.`}),
      h("div",{class:"sp-acts",style:"margin-top:10px"},btn("Robes",hh+"robes"),btn("Headmistress",hh+"head"),btn("Boyfriend",hh+"man"),
        mine.length?h("button",{type:"button",class:"btn sm",onclick:()=>spLoad(mine[Math.floor(Math.random()*mine.length)]),text:"Random look"}):null));
  }

  const baseList=renderStartList;
  renderStartList=function(){
    const data=SP.data,box=$("#startGrid");
    if(SP.sec==="favs"){
      box.textContent="";
      const terms=(SP.q||"").toLowerCase().split(/\s+/).filter(Boolean);
      let pool=favs.map(k=>data.byKey[k]).filter(Boolean);
      if(terms.length)pool=pool.filter(e=>spScore(e,terms)>=0);
      if(!pool.length){box.append(h("p",{class:"sp-empty",text:"No favorites yet. Tap the ☆ beside any starting point to keep it here."}));return}
      pool.forEach(e=>box.append(spRow(e,true)));return;
    }
    const snow=SP.snow&&SP.girl==="penguin";
    if(snow){const keep=data;
      const ok=e=>{const t=e.t||{},o=t.out||{},p=o.pair||{};return SNOW.test([o.must||"",p.scene||"",p.solo||"",(t.tags||[]).join(" ")].join(" "))};
      SP.data=Object.assign({},data,{list:data.list.filter(e=>e.s||ok(e))});
      try{baseList()}finally{SP.data=keep}
    }else baseList();
    if(SP.sec==="academy"&&SP.girl&&!SP.set&&!(SP.q||"").trim()&&HOUSES.includes(SP.girl))box.prepend(profile(SP.girl));
  };
})();

/* ---- v168: a compact Academy picker. With about a hundred sets, the set chips wrapped into a wall that pushed the
   starting points off the screen. Now:
     row 1  All sets · Robes and faculty · Everyday life · Seasons and travel · … (the categories)
     row 2  only the sets in the chosen category, on one line that scrolls sideways
     row 3  the girls, on one line that scrolls sideways
   Picking a category also narrows the list below to that category. The chosen chip is scrolled into view.
   Scenes keep their single set row, also on one scrolling line. (Tail block, after pickerx167.js.) */
(function(){
  if(typeof renderStartGroups!=="function")return;
  const css=document.createElement("style");
  css.textContent=
    "#spCats,#spSub,#spGirl{flex-wrap:nowrap!important;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;padding-bottom:4px;-webkit-overflow-scrolling:touch}"+
    "#spCats>*,#spSub>*,#spGirl>*{flex:none}"+
    "#spCats .chip{font-weight:600}";
  document.head.append(css);
  const nav=()=>{renderStartGroups();renderStartList();const sc=$("#spScroll");if(sc)sc.scrollTop=0};
  const into=el=>{try{el.scrollIntoView({inline:"center",block:"nearest"})}catch(e){}};
  const baseGroups=renderStartGroups;
  renderStartGroups=function(){
    baseGroups();
    let cats=$("#spCats");
    const sub=$("#spSub");if(!sub)return;
    if(SP.sec!=="academy"){if(cats)cats.remove();const on=sub.querySelector(".chip.on");if(on)into(on);const g=$("#spGirl .chip.on");if(g)into(g);return}
    if(!cats){cats=h("div",{id:"spCats",class:"sp-groups sp-sub",role:"group","aria-label":"Categories"});sub.before(cats)}
    cats.textContent="";cats.hidden=false;
    /* read the categories and their sets from the row the picker just drew */
    const kids=[...sub.children],map=[],extra=[];let cur=null,all=null;
    kids.forEach(k=>{
      if(k.classList.contains("sp-cat")){cur={name:k.textContent,chips:[]};map.push(cur);return}
      if(!cur){all=k;return}
      if(/Surprise me/.test(k.textContent)){extra.push(k);return}
      cur.chips.push(k);
    });
    if(SP.set){const c=map.find(m=>m.chips.some(ch=>ch.classList.contains("on")));if(c)SP.cat=c.name}
    const active=SP.cat&&map.some(m=>m.name===SP.cat)?SP.cat:"";
    const chip=(on,label,fn)=>h("button",{type:"button",class:"chip"+(on?" on":""),"aria-pressed":on?"true":"false",onclick:fn,text:label});
    cats.append(chip(!active&&!SP.set,"All sets",()=>{SP.cat="";SP.set="";nav()}));
    map.forEach(m=>cats.append(chip(active===m.name,m.name,()=>{SP.cat=m.name;SP.set="";nav()})));
    /* row 2: only the active category's sets */
    sub.textContent="";
    if(active){map.find(m=>m.name===active).chips.forEach(c=>sub.append(c));extra.forEach(c=>sub.append(c));sub.hidden=false}
    else{if(extra.length){extra.forEach(c=>sub.append(c));sub.hidden=false}else sub.hidden=true}
    if(all&&all.parentNode)all.remove();
    const on=cats.querySelector(".chip.on");if(on)into(on);
    const s2=sub.querySelector(".chip.on");if(s2)into(s2);
    const g=$("#spGirl .chip.on");if(g)into(g);
  };
  /* the list follows the chosen category when no set is chosen */
  const baseList=renderStartList;
  renderStartList=function(){
    baseList();
    if(SP.sec!=="academy"||!SP.cat||SP.set||(SP.q||"").trim())return;
    const box=$("#startGrid");let head=null;
    [...box.children].forEach(n=>{
      if(n.classList.contains("sp-prof"))return;
      if(n.tagName==="H3"&&!n.classList.contains("sp-sec")){head=n.firstChild&&n.firstChild.nodeType===3?n.firstChild.textContent:n.textContent;n.hidden=head!==SP.cat;return}
      if(head!==null)n.hidden=head!==SP.cat;
    });
  };
})();

/* ---- v170: the Scenes section organized like the Academy: a category row, then that category's sets on one scrolling
   line, then the girls. Single-scene sets get their own categories ("Cute moments" and "Single-scene sex") so they are
   easy to find. Picking a category also narrows the list below. (Tail block, after pickery168.js.) */
(function(){
  if(typeof renderStartGroups!=="function")return;
  const S=l=>l.replace(/^Academy /,"");
  const CATS=[
    ["Best friends",(ACAD.FRIENDS_CUTE||[])],
    ["Best friends, lewd",(ACAD.FRIENDS_LEWD||[])],
    ["Cute moments",(ACAD.SINGLE_CUTE||[])],
    ["Sweet and romantic",["Academy Couples","Academy Sweethearts","Academy First Date","Academy First Kiss","Academy Moving In","Academy Proposal","Academy Wedding","Academy Rivals","Academy Rivals Truce"]],
    ["Single-scene sex",(ACAD.SINGLE_SEX||[])],
    ["Making love",["Academy Pure Love","Academy Honeymoon Suite","Academy Intimacy","Academy Morning Sex","Academy Massage","Academy Mirror Sex","Academy All Night"]],
    ["Anywhere",["Academy Shower Sex","Academy Kitchen Counter","Academy Car Sex","Academy Lap Dance","Academy Public Sex","Academy Sex Tape","Academy Glory Hole"]],
    ["Oral and more",["Academy Oral Showcase","Academy Sixty-Nine","Academy Paizuri","Academy Edging","Academy Squirting","Academy Anal"]],
    ["Girls together",["Academy Yuri","Academy Rivals Lovers","Academy Yuri Scissoring","Academy Yuri Strap-on","Academy Threesomes"]],
    ["Ultra-realistic",["Academy Real: Portraits","Academy Real: Cozy","Academy Real: Lingerie","Academy Real: Wet","Academy Real: Nude"]],
    ["Ultra-anime",["Academy Anime: Portraits","Academy Anime: Cozy","Academy Anime: Lingerie","Academy Anime: Wet","Academy Anime: Nude"]],
    ["Secret girlfriends",["Academy Secret Girlfriends: Sleepover Excuse","Academy Secret Girlfriends: Family Holidays","Academy Secret Girlfriends: Close Calls","Academy Secret Girlfriends: Just Roommates","Academy Secret Girlfriends: Dear Diary"]],
    ["Futanari",["Academy Futa Surprise","Academy Futa Masturbation","Academy Futa Best Friends"]],
    ["Pregnancy",["Academy Pregnancy Sex","Academy Impregnation"]],
    ["Kink",["Academy Rough and Passionate","Academy Femdom","Academy Bound and Gagged","Academy Kink Club","Academy Depraved","Academy Gangbang"]],
    ["Cosplay roleplay",["Academy Cosplay Punishment: On the Clock","Academy Cosplay Punishment: In Uniform","Academy Cosplay Punishment: Office Hours","Academy Depraved Cosplay: Fantasy Kingdom","Academy Depraved Cosplay: Myths and Legends","Academy Depraved Cosplay: Cosmic","Academy Cosplay Baby Fever: Fertility Rites","Academy Cosplay Baby Fever: Bedroom Schemes","Academy Cosplay Baby Fever: Total Commitment"]],
    ["Humiliation",["Academy Mortified","Academy Lost the Bet","Academy Degradation Play","Academy Human Furniture","Academy Free-Use Toy","Academy Cum Receptacle","Academy Pet Girls","Academy Hucows","Academy Body Writing","Academy Self-Degradation","Academy Bukkake","Academy Spit","Academy Golden Showers","Academy Brought Low","Academy Cuckqueen","Academy Orgasm Denial","Academy Kink Club Stage","Academy Fan Page","Academy Bimbofication","Academy Pony Girls","Academy Property Tattoo","Academy Condom Trophies","Academy Bathroom Wall","Academy Urinal Girl","Academy Desperation","Academy Clearance Sale","Academy Sploshing","Academy Cum on Her Food","Academy Eating off the Floor","Academy Slave Contract","Academy Confession Booth","Academy Mind Break","Academy Toothbrush Maid","Academy Foot Servant","Academy Panty Gag"]],
    ["Cheating and forbidden",["Academy Affairs","Academy NTR","Academy Cheating Brides","Academy Cheating Housewives","Academy NTR Sisters","Academy Not His Anymore","Academy Guilty Cheating","Academy Secret Affairs","Academy Stolen Wives","Academy Best Friend's Man","Academy Best Friend's Man II","Academy Caught by Her Best Friend","Academy Caught: Broken Trust","Academy Caught: The Worst Possible Night","Academy Caught: It Was Never an Accident","Academy Power Plays","Academy Strangers","Academy Hate Sex","Academy Hate Sex II","Academy Forbidden Places"]]].map(([n,l])=>[n,l.map(S)]);
  ACAD.SCENE_CATS=CATS;   /* v176: shared with the Scene tab's scene library */
  const catOf=name=>{const c=CATS.find(([,l])=>l.includes(name));return c?c[0]:"More"};
  const into=el=>{try{el.scrollIntoView({inline:"center",block:"nearest"})}catch(e){}};
  const nav=()=>{renderStartGroups();renderStartList();const sc=$("#spScroll");if(sc)sc.scrollTop=0};
  const baseGroups=renderStartGroups;
  renderStartGroups=function(){
    baseGroups();
    if(SP.sec!=="scenes")return;
    const sub=$("#spSub");if(!sub)return;
    let cats=$("#spCats");if(!cats){cats=h("div",{id:"spCats",class:"sp-groups sp-sub",role:"group","aria-label":"Scene categories"});sub.before(cats)}
    cats.textContent="";
    const kids=[...sub.children];let all=null;const extra=[],sets=[];
    kids.forEach(k=>{if(/^All sets$/.test(k.textContent))all=k;else if(/Surprise me/.test(k.textContent))extra.push(k);else if(k.classList.contains("chip"))sets.push(k)});
    const on=sets.find(k=>k.classList.contains("on"));if(on)SP.scat=catOf(on.textContent);
    const names=[...new Set(sets.map(k=>catOf(k.textContent)))];
    const order=CATS.map(c=>c[0]).concat(["More"]).filter(n=>names.includes(n));
    const active=SP.scat&&order.includes(SP.scat)?SP.scat:"";
    const chip=(o,label,fn)=>h("button",{type:"button",class:"chip"+(o?" on":""),"aria-pressed":o?"true":"false",onclick:fn,text:label});
    cats.append(chip(!active&&!SP.set,"All scenes",()=>{SP.scat="";SP.set="";nav()}));
    order.forEach(n=>cats.append(chip(active===n,n,()=>{SP.scat=n;SP.set="";nav()})));
    sub.textContent="";
    if(active){const list=CATS.find(c=>c[0]===active);const ord=list?list[1]:[];
      sets.filter(k=>catOf(k.textContent)===active).sort((a,b)=>(ord.indexOf(a.textContent)+1||999)-(ord.indexOf(b.textContent)+1||999)).forEach(k=>sub.append(k));
      extra.forEach(k=>sub.append(k));sub.hidden=false}
    else{extra.forEach(k=>sub.append(k));sub.hidden=!extra.length}
    const c1=cats.querySelector(".chip.on");if(c1)into(c1);const s1=sub.querySelector(".chip.on");if(s1)into(s1);
  };
  const baseList=renderStartList;
  renderStartList=function(){
    baseList();
    if(SP.sec!=="scenes"||!SP.scat||SP.set||(SP.q||"").trim())return;
    const box=$("#startGrid");let head=null;
    [...box.children].forEach(n=>{
      if(n.tagName==="H3"){head=n.firstChild&&n.firstChild.nodeType===3?n.firstChild.textContent:n.textContent;n.hidden=catOf(head)!==SP.scat;return}
      if(head!==null){n.hidden=catOf(head)!==SP.scat;return}
      const b=n.querySelector&&n.querySelector(".sp-set b");if(b)n.hidden=catOf(b.textContent)!==SP.scat;
    });
  };
})();

/* ---- v152: "Silver braid" rebuilt as Prinz Heinrich (Azur Lane), from Danbooru (prinz_heinrich_(azur_lane), 493 posts, Oct 2026):
   character wiki: very long white hair in a low braid with a black hair ribbon, red eyes; a red, white and black outfit of a crop top
   with detached sleeves that bares the underboob, a black jacket with a red anchor ornament and a pleated skirt.
   Her top-scored posts agree on: white hair (sometimes tagged grey), very long hair, low-braided long hair / single braid,
   parted bangs, red eyes, mole under eye (on nearly every post), huge / large breasts, curvy, thick thighs, long red nails,
   and a teasing look (one eye closed, smile, tongue out). No fang tags, so the fangs are gone; the rose corset and foil
   sheath were fan-art guesses and are gone too. Her most-drawn skin, "Rabbit on Watch" (red strapless highleg lifeguard
   swimsuit, rabbit-eared cap, whistle, thigh pouch), is added as a second outfit. Intimate details and the Nude outfit stay. */
(function(){
  START.option("hairStyle","single low braid","Braids");
  START.option("impression","a teasing, mischievous charm","Natural and everyday");
  START.item("top","{c} crop top with detached sleeves, cut high to bare the underboob","L","edgy,costume");
  START.item("outerwear","{c} military jacket with a {c2} anchor ornament","CUS","edgy,costume");
  const T=tplById("silverbraid");
  const lg=(OUTFIT_PRESETS.find(o=>o.id==="ref_lifeguard")||{}).items||{};
  const life=Object.assign({},lg);
  START.item("outerwear","cropped {c} jacket worn open off the shoulders","CU","resort,costume");
  /* the red cross and armband stripe are white, as drawn (not the palette's silver) */
  Object.keys(life).forEach(f=>{const a=life[f].slice();if(/\{c2\}/.test(a[0])&&(a[3]==null||a[3]==="@accent")){while(a.length<3)a.push("");a[3]="white"};life[f]=a});
  life.outerwear=["cropped {c} jacket worn open off the shoulders","@third"];
  /* v152b: her other two skins, from their Danbooru costume wikis.
     "Fireworks and Tapestries" (49 posts): a black kimono with a red print, fur trim, wide sleeves and sideless cuts, an obi with
     obijime cords, a black choker with an iron-cross charm, kanzashi and hair sticks with a red ribbon, black nails.
     "Heinrich on Stage" (16 posts): a strapless floor-length red evening gown with a side slit, red elbow gloves, a red choker,
     pearls and a cross, a feather boa and rabbit ears. */
  START.item("top","{c} kimono with a {c2} floral print, fur-trimmed wide sleeves and sideless cutouts","US","cultural,glam");
  START.item("waistAccessory","{c} obi with {c2} obijime cords","CU","cultural");
  START.item("neckAccessory","{c} choker with an iron-cross charm","CU","gothic,edgy");
  START.item("headwear","kanzashi and hair sticks with a {c} ribbon","CU","cultural");
  START.item("top","strapless floor-length {c} evening gown with a high side slit","US","glam");
  START.item("neckAccessory","{c} choker with a pearl strand and a cross pendant","CU","glam");
  START.item("outerwear","{c} feather boa draped over the arms","CU","glam,costume");
  START.item("gloves","long satin opera gloves","CU","glam");START.item("headwear","bunny-ear headband","CU","costume");
  START.item("wristAccessory","fur-trimmed {c} wrist cuffs","CU","cultural,glam");
  const KIMONO={oname:"Fireworks and Tapestries",look:"cultural",items:{
      top:["{c} kimono with a {c2} floral print, fur-trimmed wide sleeves and sideless cutouts","@secondary",null,"@third"],
      waistAccessory:["{c} obi with {c2} obijime cords","@third",null,"@secondary"],neckAccessory:["{c} choker with an iron-cross charm","@secondary"],
      headwear:["kanzashi and hair sticks with a {c} ribbon","@third"],wristAccessory:["fur-trimmed {c} wrist cuffs","@extra"]},
    details:{detailOne:"fur trim"},dcol:{}};
  const STAGE={oname:"Heinrich on Stage",look:"glam",items:{
      top:["strapless floor-length {c} evening gown with a high side slit","@third"],gloves:["long satin opera gloves","@third"],
      neckAccessory:["{c} choker with a pearl strand and a cross pendant","@third"],outerwear:["{c} feather boa draped over the arms","@extra"],
      headwear:["bunny-ear headband","@third"]},details:{detailThree:"lustrous silk satin finish"},dcol:{}};
  START.add(null,[{id:"silverbraid",name:"Silver braid",
    blurb:"Prinz Heinrich: very long white hair in a single low braid tied with a black ribbon, red eyes, a mole under one eye and a teasing wink. A white crop top with detached sleeves that bares the underboob, a black jacket with a red anchor ornament worn off the shoulders, a pleated skirt and a thigh strap; plus her three other looks (the red lifeguard, the black fur-trimmed kimono and the red stage gown) and a nude outfit.",
    pal:{primary:"silvery white",secondary:"black",third:"crimson red",accent:"silver",extra:"white"},
    c:Object.assign({},T?T.c:{},{
      age:"woman",expression:"playful wink",impression:"a teasing, mischievous charm",eyeShape:"large upturned eyes",eyeOne:"ruby red",eyeTwo:"ruby red",
      faceMark:"a small mole beneath one eye",hairStyle:"single low braid",hairLength:"knee-length",hairTexture:"silky straight",bangs:"parted bangs",
      bustSize:"huge breasts",bustShape:"full, heavy, round shape",bustWeight:"heavy natural fullness",thighBuild:"thick thighs",
      bodySoftness:"extremely curvy, exaggerated hourglass figure",nailStyle:"long almond fingernails",nailColor:"@third"}),
    drop:["fangClawStyle","hairMovement"],
    outfit:{oname:"Prinz Heinrich",look:"edgy",items:{
      top:["{c} crop top with detached sleeves, cut high to bare the underboob","@extra"],
      outerwear:["{c} military jacket with a {c2} anchor ornament","@secondary","hanging off the shoulders","@third"],
      bottom:["pleated mini skirt","@secondary"],neckAccessory:["loosened thin tie","@secondary"],
      headwear:["hair ribbon","@secondary","tied at the end of the braid"],
      thighAccessory:["{c}-and-{c2} buckled thigh strap","@third","on one leg","@extra"]},
      details:{detailOne:"{c} trim",detailTwo:"detached sleeves"},dcol:{detailOne:"@third"}},
    more:[{oname:"Rabbit on Watch",look:"resort",items:life,details:{},dcol:{}},KIMONO,STAGE],
    nude:true,tags:["prinz heinrich","azur lane","white hair","braid","red eyes"]}]);
  /* the template is resolved without a base, so drop the removed fields by hand */
  const N=tplById("silverbraid");if(N){delete N.c.fangClawStyle;delete N.c.hairMovement}
})();

/* ---- v153/v154: "Anime favorites" (named "Danbooru favorites" in v153). The ten most-posted adult female characters on Danbooru (character tags by post count,
   a1111 tagcomplete list, July 2026), each turned into an original starting point modeled on her look; none is named after
   the character. Characters who are minors or drawn as children (the top-ranked idol and shrine-maiden/witch pair, the vampire
   sisters, the ice fairy, the half-ghost swordswoman, the mind-reading sisters and the other teen leads) are left out, so the
   list starts at the 6th tag and runs to the 27th. Each comes with her signature outfit, a Nude outfit and intimate details. */
(function(){
  const G="Anime favorites";
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const op=(f,v,g)=>START.option(f,v,g||"Popular characters");
  const it=(f,v,t,fam)=>START.item(f,v,t||"CUS",fam||"costume");
  /* options and items each design needs (no-ops when they already exist) */
  [["hairStyle","short bob with two thin side braids tied with ribbons"],["hairStyle","braided bun with a single ahoge"],["hairStyle","loose locks with small ribbons tied at the tips"],
   ["hairStyle","loose locks with twin side braids tied with ribbons"],["hairStyle","soft wavy bob"],["hairStyle","side ponytail"],["hairStyle","long straight hair"],
   ["hairStyle","short layered bob"],["hairStyle","wavy bob"],["bodySoftness","slender, poised figure"],["impression","a quiet, refined presence"],["impression","a cool, stoic presence"],
   ["posture","martial-arts stance with one palm raised"],["posture","hands tucked into her wide sleeves"],["posture","holding a camera up to her eye"],
   ["expression","expressionless face"],["expression","slow, lazy, teasing smile"]].forEach(([f,v])=>op(f,v));
  it("top","short-sleeved {c} maid dress with a frilled {c2} apron","US","costume,sweet");it("headwear","lace maid-style headband","CU","costume");
  it("heldItem","fan of silver throwing knives","CU","costume");it("waistAccessory","pocket watch on a chain","CU","preppy");it("neckAccessory","{c} ribbon bow tie","CU","costume");
  it("top","{c} armored dress with a {c2} breastplate","CUS","costume");it("gloves","armored silver gauntlets","CU","costume");it("legwear","knee-high armored greaves","CU","costume");
  it("headwear","hair ribbon","CU","sweet");it("heldItem","longsword","CU","costume");
  it("top","{c} dress with a {c2} capelet","CUS","costume,sweet");it("headwear","{c} lace-trimmed hairband","CU","sweet");it("neckAccessory","neck ribbon tied in a bow","CU","sweet");
  it("shoulderPiece","small doll in a red dress floating beside her shoulder","CU","costume");it("heldItem","leather-bound grimoire","CU","costume");
  it("top","{c} tabard dress with trigram symbols over a {c2} long-sleeved blouse","CUS","costume");it("headwear","{c} mob cap with a {c2} ribbon","CU","costume");
  it("gloves","long satin opera gloves","CU","glam");it("heldItem","frilled {c} parasol","CU","costume");
  it("shoulderPiece","a rift in space behind her, lined with staring eyes and tied with ribbons","CU","costume");
  it("top","white short-sleeved collared shirt","CU","casual");it("bottom","pleated mini skirt","CU","preppy");it("headwear","small tengu tokin cap","CU","costume");
  it("legwear","tall {c} tengu geta","CU","costume");it("heldItem","vintage camera","CU","casual");
  it("top","crisp collared button-up shirt","CU","preppy");it("outerwear","{c} blazer with a {c2} crescent-moon badge","CU","preppy");it("neckAccessory","thin {c} tie","CU","preppy");
  it("legwear","thigh-high stockings","CU","casual");
  it("top","{c} china dress with side slits and a high collar","US","cultural");it("headwear","{c} beret-style cap with a {c2} star badge","CU","costume");
  it("top","{c} frilled kimono-style dress with wide sleeves","CUS","cultural");it("headwear","{c} mob cap with a wavy triangular cloth","CU","costume");it("heldItem","folding fan","CU","cultural");
  it("shoulderPiece","ghostly wisps and cherry blossom petals drifting around her","CU","costume");
  it("top","{c} archery kimono top with a {c2} chest guard","CU","cultural");it("bottom","short {c} hakama skirt","CU","cultural");it("gloves","single archery glove","CU","cultural");
  it("heldItem","longbow","CU","costume");it("shoulderPiece","flight-deck shield strapped to one arm","CU","costume");
  it("top","long {c} tabard dress with {c2} talisman patterns and wide sleeves","CUS","cultural,costume");it("headwear","white pillow hat with paper talismans","CU","costume");

  const BASE={eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"bright, intricately detailed irises",lashNatural:"long dark eyelashes",markings:"no markings",
    makeupStyle:"soft natural makeup",blushStyle:"soft cheek blush",lipFinish:"natural lip finish",nailStyle:"natural fingernails",
    nippleColor:"soft pink",nippleType:"soft and rounded",nippleLength:"short",areolaColor:"soft pink",areolaType:"smooth",areolaSize:"medium-sized",
    vaginaColor:"soft pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch of pubic hair"};
  const P=(id,name,blurb,pal,c,oname,look,items,details,dcol)=>({id,name,blurb,pal,c:Object.assign({},BASE,{hairBase:"@primary"},c),
    outfit:{oname,look,items,details:details||{},dcol:dcol||{}},more:[],nude:true,out:{framing:"full body",must:MUST},tags:["danbooru","popular character"]});
  START.add(G,[
    P("dbsilvermaid","Silver maid","A cool, tall head maid with a silver bob and two thin braided sidelocks tied with green ribbons, steel-blue eyes, a navy maid dress with a white frilled apron, a lace headdress, white thigh-highs, a pocket watch and a fan of throwing knives.",
      {primary:"silvery white",secondary:"navy blue",third:"white",accent:"forest green",extra:"silver"},
      {age:"young woman",faceShape:"oval face with defined cheekbones and a softly pointed chin",expression:"elegant composed expression",impression:"an elegant, mature presence",
       eyeShape:"sharp eyes",eyeOne:"steel blue",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"short bob with two thin side braids tied with ribbons",hairLength:"short",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"porcelain",undertone:"cool",skinFinish:"satin-smooth skin",bustSize:"medium breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"gently curving hips",
       thighBuild:"thick, shapely thighs",legShape:"long elegant legs",bodySoftness:"slender, poised figure",posture:"graceful upright posture",nippleColor:"pale pink",areolaColor:"pale pink"},
      "Head maid","costume",{top:["short-sleeved {c} maid dress with a frilled {c2} apron","@secondary",null,"@third"],headwear:["lace maid-style headband","@third"],neckAccessory:["{c} ribbon bow tie","@accent"],
       legwear:["thigh-high stockings","@third"],waistAccessory:["pocket watch on a chain","@extra"],heldItem:["fan of silver throwing knives","-"]}),
    P("dbblueknight","Blue knight","A noble knight with golden-blonde hair in a braided bun with a single ahoge, emerald eyes and a determined look, in a royal-blue armored dress with a silver breastplate, gauntlets and greaves, a longsword in hand.",
      {primary:"golden blonde",secondary:"royal blue",third:"silver",accent:"white",extra:"gold"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"determined expression",impression:"a noble, heroic presence",
       eyeShape:"large almond-shaped eyes",eyeOne:"emerald green",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"braided bun with a single ahoge",hairLength:"medium",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"fair",undertone:"neutral",skinFinish:"satin-smooth skin",bustSize:"medium breasts",heightStature:"average height",waistShape:"narrow waist",hipShape:"gently curving hips",
       thighBuild:"thick, shapely thighs",legShape:"long elegant legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",posture:"strong, squared posture"},
      "Armored dress","costume",{top:["{c} armored dress with a {c2} breastplate","@secondary",null,"@third"],gloves:["armored silver gauntlets","@third"],legwear:["knee-high armored greaves","@third"],
       headwear:["hair ribbon","@secondary"],heldItem:["longsword","-"]},{detailOne:"{c} trim"},{detailOne:"@extra"}),
    P("dbdollmaker","Doll maker","A quiet, refined puppeteer with a short golden wavy bob, a red lace hairband and sky-blue eyes, in a blue dress with a white capelet and a red neck ribbon, a little doll in a red dress floating at her shoulder and a grimoire in hand.",
      {primary:"golden blonde",secondary:"cobalt blue",third:"white",accent:"crimson red",extra:"gold"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"gentle smile",impression:"a quiet, refined presence",
       eyeShape:"large almond-shaped eyes",eyeOne:"sky blue",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"wavy bob",hairLength:"short",hairTexture:"soft, loose waves",bangs:"parted bangs",
       skinTone:"porcelain",undertone:"cool",skinFinish:"satin-smooth skin",bustSize:"medium-large, full breasts",heightStature:"average height",waistShape:"narrow waist",hipShape:"gently curving hips",
       thighBuild:"thick, shapely thighs",legShape:"long elegant legs",bodySoftness:"slender, poised figure",posture:"soft poised posture",nippleColor:"pale pink",areolaColor:"pale pink"},
      "Puppeteer","costume",{top:["{c} dress with a {c2} capelet","@secondary",null,"@third"],headwear:["{c} lace-trimmed hairband","@accent"],neckAccessory:["neck ribbon tied in a bow","@accent"],
       shoulderPiece:["small doll in a red dress floating beside her shoulder","-"],heldItem:["leather-bound grimoire","-"]}),
    P("dbgapmistress","Gap mistress","A tall, voluptuous, ageless youkai with very long golden hair tied with little ribbons at the ends, violet eyes and a slow, teasing smile, in a purple tabard dress with trigram symbols, a white mob cap with a red ribbon and long white gloves, a frilled parasol in hand and a rift full of staring eyes opening behind her.",
      {primary:"golden blonde",secondary:"violet",third:"white",accent:"crimson red",extra:"gold"},
      {age:"mature woman",faceShape:"refined, softly rounded face with high cheekbones and a gently tapered jawline",expression:"slow, lazy, teasing smile",impression:"a mysterious, enchanting presence",
       eyeShape:"half-lidded bedroom eyes",eyeOne:"violet",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"loose locks with small ribbons tied at the tips",hairLength:"very long",hairTexture:"silky straight",bangs:"parted bangs",
       skinTone:"porcelain",undertone:"neutral",skinFinish:"satin-smooth skin",bustSize:"huge breasts",bustShape:"full, heavy, round shape",heightStature:"tall stature",
       waistShape:"narrow waist",hipShape:"wide, curvy hips",buttSize:"large, rounded butt",thighBuild:"thick thighs",legShape:"long elegant legs",
       bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"elegant posture",makeupStyle:"soft glam makeup",lipFinish:"soft satin lips",pubicHair:"a soft natural triangle of pubic hair"},
      "Gap youkai","costume",{top:["{c} tabard dress with trigram symbols over a {c2} long-sleeved blouse","@secondary",null,"@third"],headwear:["{c} mob cap with a {c2} ribbon","@third",null,"@accent"],
       gloves:["long satin opera gloves","@third"],heldItem:["frilled {c} parasol","@third"],shoulderPiece:["a rift in space behind her, lined with staring eyes and tied with ribbons","-"]}),
    P("dbtenguscoop","Tengu reporter","A fast, nosy crow-tengu reporter with short black hair, red eyes and a mischievous grin, black feathered wings, a little red tokin cap, a white short-sleeved shirt, a black pleated skirt, tall red tengu geta and a vintage camera raised to her eye.",
      {primary:"black",secondary:"white",third:"crimson red",accent:"burnt orange",extra:"charcoal gray"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"mischievous expression",impression:"a charismatic, playful charm",
       eyeShape:"large almond-shaped eyes",eyeOne:"ruby red",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",wingStyle:"dark feathered wings",
       hairStyle:"short layered bob",hairLength:"short",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"fair",undertone:"neutral",skinFinish:"satin-smooth skin",bustSize:"medium breasts",heightStature:"average height",waistShape:"narrow waist",hipShape:"gently curving hips",
       thighBuild:"thick, shapely thighs",legShape:"long elegant legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",posture:"holding a camera up to her eye"},
      "Reporter","casual",{top:["white short-sleeved collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],headwear:["small tengu tokin cap","@third"],
       legwear:["tall {c} tengu geta","@third"],heldItem:["vintage camera","-"]}),
    P("dbmoonrabbit","Moon rabbit","A shy moon-rabbit soldier with ankle-grazing lavender hair, long rabbit ears and glowing red eyes, in a black blazer with a crescent-moon badge, a white collared shirt and red tie, a pink pleated mini skirt and thigh-high stockings.",
      {primary:"lavender",secondary:"black",third:"white",accent:"crimson red",extra:"baby pink"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"slightly shy expression",impression:"a charismatic, playful charm",
       eyeShape:"large almond-shaped eyes",eyeOne:"ruby red",irisDetail:"luminous iris rim",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       earStyle:"long floppy bunny ears",hairStyle:"long straight hair",hairLength:"knee-length",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"porcelain",undertone:"cool",skinFinish:"satin-smooth skin",bustSize:"large breasts",heightStature:"average height",waistShape:"narrow waist",hipShape:"wide, curvy hips",
       thighBuild:"thick thighs",legShape:"long elegant legs",bodySoftness:"tall, statuesque hourglass figure with long limbs and balanced curves",posture:"soft poised posture"},
      "Lunar soldier","preppy",{top:["crisp collared button-up shirt","@third"],outerwear:["{c} blazer with a {c2} crescent-moon badge","@secondary",null,"@accent"],
       neckAccessory:["thin {c} tie","@accent"],bottom:["pleated mini skirt","@extra"],legwear:["thigh-high stockings","@secondary"]}),
    P("dbgateguard","Gate guard","A tall, cheerful martial-artist gatekeeper with very long crimson hair and twin braids tied with ribbons, blue-gray eyes, a green cap with a gold star and a green china dress with high slits, full curves and a strong build.",
      {primary:"crimson red",secondary:"forest green",third:"white",accent:"gold",extra:"black"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"bright cheerful expression",impression:"a warm, naturally feminine presence with expressive features",
       eyeShape:"large almond-shaped eyes",eyeOne:"steel blue",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"loose locks with twin side braids tied with ribbons",hairLength:"very long",hairTexture:"silky straight",bangs:"parted bangs",
       skinTone:"fair",undertone:"warm",skinFinish:"satin-smooth skin",bustSize:"very large breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"wide, curvy hips",
       buttSize:"large, rounded butt",thighBuild:"thick thighs",legShape:"long elegant legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",
       posture:"martial-arts stance with one palm raised",nippleColor:"rosy pink",areolaColor:"rosy pink",vaginaColor:"rosy pink"},
      "Gatekeeper","cultural",{top:["{c} china dress with side slits and a high collar","@secondary"],headwear:["{c} beret-style cap with a {c2} star badge","@secondary",null,"@accent"]}),
    P("dbghostprincess","Ghost princess","A graceful, gently smiling ghost princess with short, soft wavy pink hair and rose-pink eyes, a sky-blue mob cap with a wavy triangular cloth, a frilled sky-blue kimono-style dress with wide sleeves and a folding fan, ghostly wisps and cherry petals drifting around her.",
      {primary:"blush pink",secondary:"sky blue",third:"white",accent:"baby pink",extra:"gold"},
      {age:"woman",faceShape:"soft oval face with gentle cheekbones",expression:"gentle smile",impression:"a graceful, mature elegance with warmth and quiet confidence",
       eyeShape:"large almond-shaped eyes",eyeOne:"rose pink",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"soft wavy bob",hairLength:"short",hairTexture:"soft, loose waves",bangs:"parted bangs",
       skinTone:"porcelain",undertone:"rosy",skinFinish:"satin-smooth skin",bustSize:"huge breasts",bustShape:"full, soft, naturally sloping shape",heightStature:"average height",
       waistShape:"softly cinched waist",hipShape:"wide, flared hips with soft fullness",buttSize:"soft, full, rounded butt",thighBuild:"full, soft thighs tapering to the knees",
       legShape:"soft, full legs tapering to slim ankles",bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"elegant posture"},
      "Ghost princess","cultural",{top:["{c} frilled kimono-style dress with wide sleeves","@secondary"],headwear:["{c} mob cap with a wavy triangular cloth","@secondary"],
       heldItem:["folding fan","@accent"],shoulderPiece:["ghostly wisps and cherry blossom petals drifting around her","-"]}),
    P("dbcarrierarcher","Carrier archer","A tall, stoic archer with a brown side ponytail, calm brown eyes and an expressionless face, in a white archery kimono top with a dark chest guard, a short navy hakama skirt, black thigh-highs, a single archery glove, a longbow and a flight-deck shield on one arm.",
      {primary:"chestnut brown",secondary:"navy blue",third:"white",accent:"charcoal gray",extra:"black"},
      {age:"woman",faceShape:"oval face with defined cheekbones and a softly pointed chin",expression:"expressionless face",impression:"a cool, stoic presence",
       eyeShape:"sharp eyes",eyeOne:"warm brown",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"side ponytail",hairLength:"medium",hairTexture:"silky straight",bangs:"parted bangs",
       skinTone:"fair",undertone:"neutral",skinFinish:"satin-smooth skin",bustSize:"very large breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"wide, curvy hips",
       buttSize:"large, rounded butt",thighBuild:"thick thighs",legShape:"long elegant legs",bodySoftness:"tall, statuesque hourglass figure with long limbs and balanced curves",
       posture:"graceful upright posture",nippleColor:"rosy pink",areolaColor:"rosy pink"},
      "Archer","cultural",{top:["{c} archery kimono top with a {c2} chest guard","@third",null,"@extra"],bottom:["short {c} hakama skirt","@secondary"],legwear:["thigh-high stockings","@extra"],
       gloves:["single archery glove","@primary"],heldItem:["longbow","-"],shoulderPiece:["flight-deck shield strapped to one arm","-"]}),
    P("dbninetails","Nine-tailed shikigami","A calm, wise nine-tailed fox spirit with short golden hair, golden eyes and nine huge fluffy tails, in a white pillow hat with paper talismans and a long white tabard dress with blue talisman patterns and wide sleeves, hands tucked into her sleeves.",
      {primary:"golden blonde",secondary:"white",third:"royal blue",accent:"gold",extra:"crimson red"},
      {age:"woman",faceShape:"soft oval face with gentle cheekbones",expression:"gentle smile",impression:"an ancient, wise presence",
       eyeShape:"large almond-shaped eyes",eyeOne:"golden yellow",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",tailStyle:"nine fox tails",
       hairStyle:"short layered bob",hairLength:"short",hairTexture:"silky straight",bangs:"parted bangs",
       skinTone:"fair",undertone:"warm",skinFinish:"satin-smooth skin",bustSize:"very large breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"wide, curvy hips",
       buttSize:"large, rounded butt",thighBuild:"thick thighs",legShape:"long elegant legs",bodySoftness:"tall, statuesque hourglass figure with long limbs and balanced curves",
       posture:"hands tucked into her wide sleeves"},
      "Shikigami","cultural",{top:["long {c} tabard dress with {c2} talisman patterns and wide sleeves","@secondary",null,"@third"],headwear:["white pillow hat with paper talismans","-"]})
  ],{after:"Stylish"});

  /* v154: adults in canon, often drawn young; built as clearly adult women */
  [["hairStyle","loose locks tied with many small ribbon bows"],["hairStyle","short layered bob"],
   ["posture","hands in her pockets, flames curling around her"],["posture","holding a sword and a round shield"],["posture","reading an open book held in one hand"]].forEach(([f,v])=>op(f,v));
  it("top","loose {c} striped dress-robe with long sleeves","CUS","cottage,costume");it("headwear","{c} mob cap with a crescent-moon pin","CU","costume");
  it("heldItem","heavy open spellbook","CU","costume");
  it("top","white collared shirt with rolled sleeves","CU","casual");it("bottom","baggy {c} trousers covered in paper talismans, held up with suspenders","CU","costume");
  it("shoulderPiece","phoenix-like wings of fire flaring behind her","CU","costume");
  it("top","white sleeveless top with detached wide sleeves","CU","costume");it("bottom","{c} skirt with a {c2} maple-leaf hem","CU","costume");
  it("heldItem","curved sword and a round shield with a maple-leaf crest","CU","costume");it("headwear","small tengu tokin cap","CU","costume");
  START.add(G,[
    P("dbarchmage","Library archmage","A sleepy, brilliant archmage of a vast library: tall and softly curvy, with very long purple hair tied with small ribbons at the ends, half-lidded purple eyes, a mob cap with a crescent-moon pin and a loose pink-and-purple striped dress-robe, a heavy spellbook open in one hand.",
      {primary:"lavender",secondary:"violet",third:"baby pink",accent:"crimson red",extra:"gold"},
      {age:"woman",faceShape:"refined, softly rounded face with high cheekbones and a gently tapered jawline",expression:"calm expression",impression:"an ancient, wise presence",
       eyeShape:"half-lidded bedroom eyes",eyeOne:"violet",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"loose locks with small ribbons tied at the tips",hairLength:"very long",hairTexture:"silky straight",bangs:"parted bangs",
       skinTone:"porcelain",undertone:"cool",skinFinish:"satin-smooth skin",bustSize:"huge breasts",bustShape:"full, soft, naturally sloping shape",heightStature:"tall stature",
       waistShape:"softly cinched waist",hipShape:"wide, flared hips with soft fullness",buttSize:"soft, full, rounded butt",thighBuild:"full, soft thighs tapering to the knees",
       legShape:"soft, full legs tapering to slim ankles",bodySoftness:"mature, voluptuous, full-figured silhouette with soft, generous curves",posture:"reading an open book held in one hand",
       nippleColor:"pale pink",areolaColor:"pale pink"},
      "Archmage","cottage",{top:["loose {c} striped dress-robe with long sleeves","@third"],headwear:["{c} mob cap with a crescent-moon pin","@secondary"],heldItem:["heavy open spellbook","-"]}),
    P("dbphoenix","Undying phoenix","A tall, wiry immortal with very long white hair tied with many small red-and-white ribbon bows, burning red eyes and a cocky half-smile, in a white collared shirt and baggy red talisman-covered trousers with suspenders, hands in her pockets as fire wings flare behind her.",
      {primary:"white",secondary:"crimson red",third:"white",accent:"flame orange",extra:"black"},
      {age:"woman",faceShape:"oval face with defined cheekbones and a softly pointed chin",expression:"confident smile",impression:"a charismatic, playful charm",
       eyeShape:"sharp eyes",eyeOne:"ruby red",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       hairStyle:"loose locks tied with many small ribbon bows",hairLength:"very long",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"porcelain",undertone:"cool",skinFinish:"satin-smooth skin",bustSize:"large breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"gently curving hips",
       thighBuild:"thick, shapely thighs",legShape:"long elegant legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",posture:"hands in her pockets, flames curling around her"},
      "Immortal","casual",{top:["white collared shirt with rolled sleeves","@third"],bottom:["baggy {c} trousers covered in paper talismans, held up with suspenders","@secondary"],
       shoulderPiece:["phoenix-like wings of fire flaring behind her","-"]}),
    P("dbwolfguard","Wolf sentry","A tall, athletic white-wolf sentry of the mountain with short white hair, white wolf ears and a fluffy tail, alert red eyes, a red tokin cap, a white sleeveless top with detached wide sleeves and a black skirt with a red maple-leaf hem, a curved sword and maple-leaf shield in hand.",
      {primary:"white",secondary:"black",third:"crimson red",accent:"burnt orange",extra:"silver"},
      {age:"young woman",faceShape:"soft oval face with gentle cheekbones",expression:"determined expression",impression:"a playful, animal-like energy",
       eyeShape:"sharp eyes",eyeOne:"ruby red",browShape:"softly arched brows",noseShape:"small straight nose",mouthShape:"soft full lips",
       earStyle:"tufted wolf ears",tailStyle:"thick bushy wolf tail",hairStyle:"short layered bob",hairLength:"short",hairTexture:"silky straight",bangs:"bangs with hair between the eyes",
       skinTone:"fair",undertone:"neutral",skinFinish:"satin-smooth skin",bustSize:"large breasts",heightStature:"tall stature",waistShape:"narrow waist",hipShape:"wide, curvy hips",
       thighBuild:"thick thighs",legShape:"long elegant legs",bodySoftness:"strong, curvy athletic figure with defined muscle and full curves",posture:"holding a sword and a round shield"},
      "Sentry","costume",{top:["white sleeveless top with detached wide sleeves","@secondary"],bottom:["{c} skirt with a {c2} maple-leaf hem","@secondary",null,"@third"],
       headwear:["small tengu tokin cap","@third"],heldItem:["curved sword and a round shield with a maple-leaf crest","-"]})
  ]);
})();

/* ---- v167: Owl and Rat in every older Academy set (tail block, after every set is registered).
   For each Academy group that has no Owl/Rat entry yet, the Raven entry is re-cut for Owl and the Crow entry for Rat:
   same set, same outfit (house colors come from the new girl's palette), same scene, rebuilt on owlrobes / ratrobes
   (so both have the Ideal body), with house words, palette words, signature expressions and bird-only wording swapped
   ("Caw" → "Squeak", "perches" → "crouches", crow feathers → rat-tail charms). Newer sets list Owl and Rat directly.
   Then ACAD.HOUSES gains "owl" and "rat" (the picker's girl chips read that list), and the pair get their own
   Academy Couples scene and Academy Rivals portrait. */
(function(){
  const R=START.RAW;if(!R)return;
  const SKIP=["Academy","Academy Headmistresses","Academy Men","Academy Couples","Academy Rivals"];
  const J=[
    {src:"raven",dst:"owl",bases:{ravenrobes:"owlrobes",ravenhead:"owlhead"},
     exp:{"cool aloof expression":"knowing, half-lidded smile"},
     words:[[/\bRAVENS\b/g,"OWLS"],[/\bRAVEN\b/g,"OWL"],[/\bRavens\b/g,"Owls"],[/\bravens\b/g,"owls"],[/\bRaven\b/g,"Owl"],[/\braven\b/g,"owl"],
       [/\bmidnight[- ]blue\b/g,"caramel brown"],[/\bnavy[- ]blue\b/g,"espresso brown"],[/\bstorm[- ]blue\b/g,"antique ivory"],[/\bbronze\b/g,"amber"]],
     colors:{"midnight blue":"caramel brown","navy blue":"espresso brown","storm blue":"antique ivory","bronze":"amber"}},
    {src:"crow",dst:"rat",bases:{crowbody:"ratrobes",crowrobes:"ratrobes",crowhead:"rathead"},
     exp:{"mischievous expression":"cheeky, scheming grin"},
     words:[[/\bCaw caw\b/g,"Squeak squeak"],[/\bCAW CAW\b/g,"SQUEAK SQUEAK"],[/\bCAW\b/g,"SQUEAK"],[/\bCaw\b/g,"Squeak"],[/\bcaw\b/g,"squeak"],
       [/\bcrow-feather\b/g,"rat-tail"],[/\bcrow feathers\b/g,"rat-tail charms"],[/\bblack feathers\b/g,"glittering dust"],[/\bswirl of feathers\b/g,"puff of glittering dust"],
       [/\bCROWS\b/g,"RATS"],[/\bCROW\b/g,"RAT"],[/\bCrows\b/g,"Rats"],[/\bcrows\b/g,"rats"],[/\bCrow\b/g,"Rat"],[/\bcrow\b/g,"rat"],
       [/\brat wings\b/g,"rat ears"],[/\bperches\b/g,"crouches"],[/\bperching\b/g,"crouching"],[/\bperched\b/g,"crouched"],
       [/\bink[- ]blue\b/g,"charcoal gray"],[/\bsilvery[- ]white\b/g,"ash gray"],[/\bdusty[- ]lavender\b/g,"rose pink"],[/\bplatinum\b/g,"silver"],[/\bopal\b/g,"rose quartz"],
       [/\bin its beak\b/g,"in its mouth"],[/\bflock of\b/g,"pack of"],[/, bird, birds on branch\b/g,", candle"],[/, bird\b/g,""],[/, flock\b/g,""],[/\bPerched\b/g,"Crouched"],
       [/\bfeather-trimmed\b/g,"lace-trimmed"],[/\bfeathered sleeves\b/g,"fuzzy sleeves"],[/\bsmall feathered wings\b/g,"small round ears"],[/\bfeather-and-moon print\b/g,"key-and-moon print"],
       [/\bfeather-print\b/g,"key-print"],[/\bfeather print\b/g,"key print"],[/\bfeather pattern\b/g,"key pattern"],[/\bfeather lace\b/g,"keyhole lace"],[/\bfeather-charm\b/g,"key-charm"],
       [/\bfeather embroidery\b/g,"key embroidery"],[/\bfeather-trim\b/g,"lace-trim"],[/\bblack feather mantle\b/g,"patched fur mantle"],[/\bblack-feathered\b/g,"riveted"],
       [/\bwinged pauldrons\b/g,"spiked pauldrons"],[/\bDusty-lavender\b/g,"Rose-pink"],[/\blavender\b/g,"rose pink"],[/\bsilvery\b/g,"ash-gray"],[/\ba silver feather\b/g,"a silver thimble"],[/, feather,/g,", thimble,"],
       [/where a wild rat crouched every morning for six years/g,"where her pet rat rode on her shoulder for six years"],
       [/every gift the rat ever left on her windowsill/g,"every trinket he ever hoarded in her pockets"],
       [/A row of rats watches silently from the branches above\./g,"A single candle flickers beside the little grave."]],
     colors:{"ink blue":"charcoal gray","silvery white":"ash gray","dusty lavender":"rose pink","platinum":"silver","opal":"rose pink"}}];
  const isFn=v=>typeof v==="function";
  function run(j){
    /* v210: each distinct string is re-cut once (most repeat across a girl's entries) */
    const memo=new Map(),fix=s=>{let r=memo.get(s);if(r===undefined){r=j.words.reduce((a,[x,y])=>a.replace(x,y),s);memo.set(s,r)}return r};
    const deep=v=>Array.isArray(v)?v.map(deep):v&&typeof v==="object"?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,deep(x)])):typeof v==="string"?fix(v):v;
    const col=v=>typeof v==="string"&&j.colors[v]?j.colors[v]:v;
    /* outfit items: [value, color, wear, color2]; a value that changes is registered like the original */
    const items=(o,fieldOf)=>{if(!o)return o;const out={};Object.entries(o).forEach(([f,a])=>{if(!Array.isArray(a)){out[f]=deep(a);return}
      const b=a.slice();const v0=b[0];b[0]=typeof v0==="string"?fix(v0):v0;b[1]=col(b[1]);if(b.length>3)b[3]=col(b[3]);
      if(b[0]!==v0){const src=(OUTFIT[fieldOf||f]||[]).find(i=>i.v===v0);START.item(fieldOf||f,b[0],src&&src.t,src&&src.f)}
      out[f]=b});return out};
    const outfit=o=>o&&Object.assign({},o,{oname:fix(o.oname||""),items:items(o.items),details:deep(o.details||{}),dcol:Object.fromEntries(Object.entries(o.dcol||{}).map(([k,v])=>[k,col(v)]))});
    const scene=w=>w&&Object.assign({},deep(w),{f:items(w.f),m:items(w.m)});
    const mapId=id=>!id?id:j.bases[id]?j.bases[id]:id.startsWith(j.src)?j.dst+id.slice(j.src.length):id;
    const newId=k=>k.startsWith(j.src)?j.dst+k.slice(j.src.length):j.dst+k;
    const isSrc=(k,e)=>k.startsWith(j.src)||(e.base&&j.bases[e.base]!==undefined);
    const jobs=[],HOUSEL=ACAD.HOUSES.concat(ACAD.NEWHOUSES);
    PRESET_GROUPS.start.filter(g=>/^Academy/.test(g.label)&&!SKIP.includes(g.label)).forEach(g=>{
      if(g.keys.some(k=>{const e=R[k];return k.startsWith(j.dst)||(e&&(e.base===j.dst+"robes"||e.base===j.dst+"head"))}))return;
      g.keys.forEach(k=>{const e=R[k];if(!e||!isSrc(k,e)||k.endsWith("robes"))return;
        /* skip another girl's scene that only uses this girl as her partner (its id starts with the other girl's house) */
        if(!k.startsWith(j.src)&&HOUSEL.some(h=>h!==j.src&&k.startsWith(h)))return;
        jobs.push([g.label,k,e])});
    });
    const made=[];
    jobs.forEach(([label,k,e])=>{
      const n=Object.assign({},e);
      n.id=newId(k);if(tplById(n.id))return;
      if(e.base)n.base=mapId(e.base);
      n.name=fix(e.name||"");if(n.name===e.name)n.name=n.name.replace(new RegExp("^"+j.src,"i"),ACAD.cap(j.dst));
      n.tags=(e.tags||[]).map(t=>t===j.src?j.dst:fix(t));if(!n.tags.includes(j.dst))n.tags.push(j.dst);
      if(e.c){n.c=deep(e.c);if(j.exp[n.c.expression])n.c.expression=j.exp[n.c.expression];Object.keys(n.c).forEach(f=>{if(typeof n.c[f]==="string")START.option(f,n.c[f],"Academy")})}
      if(e.outfit)n.outfit=outfit(e.outfit);
      if(e.more)n.more=e.more.map(outfit);
      if(e.out){n.out=deep(e.out);
        if(e.out.pair){const p=e.out.pair,q=n.out.pair;q.id=mapId(p.id);
          if(p.c1){q.c1=deep(p.c1);if(j.exp[q.c1.expression])q.c1.expression=j.exp[q.c1.expression]}
          if(p.w1)q.w1=scene(p.w1);if(p.w2)q.w2=scene(p.w2);
          ["posture","expression"].forEach(f=>{if(q.c1&&typeof q.c1[f]==="string")START.option(f,q.c1[f],"Academy")})}}
      if(isFn(e.blurb))n.blurb=T=>fix(e.blurb(T));else if(e.blurb)n.blurb=fix(e.blurb);
      made.push([label,n]);
    });
    /* add in dependency order (an entry built on another clone waits for it) */
    let left=made,guard=0;
    while(left.length&&guard++<10){const next=[];
      left.forEach(([label,n])=>{if(!n.base||tplById(n.base))START.add(label,[n]);else next.push([label,n])});
      if(next.length===left.length)break;left=next}
    left.forEach(([,n])=>START.problems.push(n.id+": base "+n.base+" missing for the "+j.dst+" copy"));
    return made.length;
  }
  ACAD.CLONED={owl:run(J[0]),rat:run(J[1])};
  /* Owl and Rat are each other's best friend in the Futa Best Friends set */
  [["owlfutafriend","ratrobes","Owl and Rat","Owl, as a futanari, with her best friend Rat. Character 1 is Rat; Owl is character 2 in the Scene tab."],
   ["ratfutafriend","owlrobes","Rat and Owl","Rat, as a futanari, with her best friend Owl. Character 1 is Owl; Rat is character 2 in the Scene tab."]].forEach(([id,base,name,blurb])=>{
    const e=R[id];if(!e)return;START.add(null,[Object.assign({},e,{base,name,blurb,tags:["futanari","best friends","yuri","explicit","sex","pair","owl","rat"]})])});
  /* hand-cut replacements where a bird-themed Raven or Crow look does not fit */
  START.item("shoulderPiece","a Noctowl perched on her shoulder","CU","costume");START.item("shoulderPiece","a Raticate at her feet with a stolen ring in its teeth","CU","costume");
  [["owltrainer","a Noctowl perched on her shoulder"],["rattrainer","a Raticate at her feet with a stolen ring in its teeth"]].forEach(([id,v])=>{const t=tplById(id);
    if(t&&t.outfit.items.shoulderPiece)t.outfit.items.shoulderPiece=[v,"-"]});
  START.item("top","micro feathered bodysuit with a plunging neckline","L","costume,boudoir");START.item("headwear","feathered ear-tuft headband","CU","costume");
  START.item("top","micro fur-trimmed bodysuit with a plunging neckline","L","costume,boudoir");START.item("headwear","round mouse-ear headband","CU","costume");
  START.item("tailPiece","long thin rat tail attached at the lower back","S","costume");START.item("heldItem","wedge of cheese","CU","costume");
  START.option("wingStyle","feathered harpy wings","Wings");
  START.add("Academy Monster Girls",[
    {id:"owlmonster",base:"owlrobes",name:"Owl monster",c:{expression:"knowing, half-lidded smile",posture:"hip-popped sultry stance",wingStyle:"feathered harpy wings"},nude:true,tags:["monster girl","harpy","costume","owl"],
     outfit:{oname:"Owl harpy",look:"costume",items:{top:["micro feathered bodysuit with a plunging neckline","@primary"],headwear:["feathered ear-tuft headband","@primary"],legwear:["thigh-high stockings","@third"],eyewear:["round glasses","@extra"]},details:{},dcol:{}},
     out:{framing:"full body",must:"an anime style with high detail, a moonlit forest with a huge full moon, and particular emphasis on highly detailed skin, hair and eyes"},
     blurb:"A owl harpy: feathered wings, a plunging caramel feathered micro bodysuit, ear tufts and her round glasses under a huge full moon."},
    {id:"ratmonster",base:"ratrobes",name:"Rat monster",c:{expression:"cheeky, scheming grin",posture:"hip-popped sultry stance",earStyle:"round mouse ears"},drop:["wingStyle"],nude:true,tags:["monster girl","rat girl","costume","rat"],
     outfit:{oname:"Rat girl",look:"costume",items:{top:["micro fur-trimmed bodysuit with a plunging neckline","@primary"],legwear:["ripped {c} fishnet stockings","@secondary"],tailPiece:["long thin rat tail attached at the lower back","@third"],heldItem:["wedge of cheese","-"]},details:{},dcol:{}},
     out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"},
     blurb:"A rat girl: round ears, a plunging ash-gray fur-trimmed micro bodysuit, a long thin tail, ripped fishnets and a stolen wedge of cheese."}]);
  ACAD.NEWHOUSES.forEach(h=>{if(!ACAD.HOUSES.includes(h))ACAD.HOUSES.push(h)});

  /* their own couple scene and rivalry portrait */
  const tpl=id=>tplById(id);
  START.add("Academy Couples",[{id:"couplecheese",base:"owlrobes",name:"Midnight snack",
    out:{pair:{id:"ratrobes",outfit:0,scene:"sharing a midnight snack on the library windowsill under a full moon, one woman reading aloud from an old book while the other steals a wedge of cheese from a picnic basket and offers her half, both laughing",act:"sitting side by side, sharing food",dir:"mutual"}},
    tags:["couple","pair","two girls","owl","rat"],blurb:"Owl and Rat on the library windowsill at midnight, a book, a full moon and a stolen wedge of cheese. Opens in the Scene tab with the Rat robes as character 2."}]);
  START.add("Academy Rivals",[{id:"rivalnight",base:"owlrobes",name:"Owl vs Rat",
    out:{pair:{id:"ratrobes",outfit:0,scene:"a midnight chase through the Academy library stacks, one woman swooping down from a high ladder with her robe flaring like wings while the other darts between the shelves clutching a stolen rare book, both grinning",act:"chasing, running, rivalry",dir:"mutual"}},
    tags:["rivals","pair","two girls","owl","rat"],blurb:"The hunter and the thief: Owl swoops from the ladders while Rat makes off with a rare book through the midnight stacks. Opens in the Scene tab with the Rat robes as character 2."}]);
  const c=tplById("couplecheese");if(c&&c.out&&c.out.pair)c.out.pair.act="sitting side by side, sharing food";
})();

/* ---- v169: a quality pass over every Academy entry (tail block, runs last).
   1. Poses that still got folded into the body description ("…, a dancer's build, and heroic pose with her wand held high")
      are rewritten so they read as their own sentence ("She is striking a heroic pose with her wand held high.").
   2. Every girl gets her own setting. In each non-explicit Academy set where two or more girls shared the same setting
      line, each girl's copy gains her house's own touch (Griffin's crimson-and-gold banners, Kraken's shimmering blue
      light, Owl's single lamp and full moon …). Girls who already had their own setting (Penguin, Owl and Rat in most
      sets) keep it. Robes, headmistresses and the men are left exactly as they are.
   3. The boyfriend is dressed for the scene in the scene sets where it fits (an apron at the kitchen counter, a towel at
      the massage table, an open shirt in the car, a loosened tie for the lap dance) instead of always being nude.
   4. Small wording fixes ("a owl" → "an owl"). */
(function(){
  const R=START.RAW||{};
  /* ---------- 1. poses ---------- */
  const POSE={"battle-ready stance, weapon raised":"holding a battle-ready stance, weapon raised","mid-dance pose with one arm raised":"striking a mid-dance pose with one arm raised",
    "heroic pose with her wand held high":"striking a heroic pose with her wand held high","face-down, ass up on a star-chart rug":"lying face-down with her ass up on a star-chart rug",
    "wrists tied above her head with pink rope":"lying with her wrists tied above her head with pink rope","posed in a collar with cuffs chained to it":"posing in a collar with cuffs chained to it",
    "reclined in the passenger seat":"reclining in the passenger seat","her heel pressed to his chest":"standing over him, her heel pressed to his chest",
    "martial-arts stance with one palm raised":"holding a martial-arts stance with one palm raised","hands tucked into her wide sleeves":"standing with her hands tucked into her wide sleeves",
    "hands in her pockets, flames curling around her":"standing with her hands in her pockets, flames curling around her"};
  Object.values(POSE).forEach(v=>START.option("posture",v,"Posture"));
  const fixPose=c=>{if(c&&POSE[c.posture])c.posture=POSE[c.posture]};
  TEMPLATES.forEach(t=>{fixPose(t.c);if(t.out&&t.out.pair)fixPose(t.out.pair.c1)});
  Object.values(R).forEach(e=>{fixPose(e.c);if(e.out&&e.out.pair)fixPose(e.out.pair.c1)});

  /* ---------- 4. wording ---------- */
  const W=[[/\ba owl/g,"an owl"],[/\bA owl/g,"An owl"]];
  const fixS=s=>typeof s==="string"?W.reduce((a,[r,b])=>a.replace(r,b),s):s;
  TEMPLATES.forEach(t=>{t.blurb=fixS(t.blurb);t.name=fixS(t.name);if(t.out){if(typeof t.out.must==="string")t.out.must=fixS(t.out.must);   /* v190: never write an undefined must (it wiped "Must include" on load) */
    const p=t.out.pair;if(p){p.scene=fixS(p.scene);p.solo=fixS(p.solo)}}});

  /* ---------- 2. each girl's own setting ---------- */
  const TOUCH={griffin:"with crimson-and-gold banners and warm golden light",badger:"with honey-gold light and pots of herbs",raven:"under a deep blue twilight sky with the first stars out",
    serpent:"in moody emerald light with silver accents",wolf:"with a full moon rising over dark pines",swan:"in soft, pearly morning light with white feathers drifting",
    dragon:"lit by flickering firelight and red lanterns",stag:"with ivy, wildflowers and dappled forest light",shark:"with the ocean glittering in the background",
    penguin:"with snow falling softly outside",fox:"at dusk under glowing paper lanterns and autumn leaves",lovebird:"with pastel fairy lights and little hearts everywhere",
    flamingo:"bathed in pink sunset light with palm silhouettes",kraken:"in shimmering blue, underwater-like light",salmon:"with a river view and warm cherry-wood accents",
    crow:"under a moonlit sky, glittering trinkets scattered about",owl:"at night, lit by a single lamp and a full moon",rat:"in a cozy, cluttered corner full of thrifted treasures"};
  const HEAD=/^an anime style with high detail, (.*), and particular emphasis on (.*)$/;
  const BARE=/^an anime style with high detail, and particular emphasis on (.*)$/;
  const SKIP=["Academy","Academy Headmistresses","Academy Men","Academy Couples","Academy Rivals"];
  const HOUSES=ACAD.HOUSES;
  const houseOf=t=>HOUSES.filter(h=>t.id.startsWith(h)).sort((a,b)=>b.length-a.length)[0]||(t.tags||[]).find(x=>HOUSES.includes(x));
  let touched=0;
  PRESET_GROUPS.start.filter(g=>/^Academy/.test(g.label)&&!SKIP.includes(g.label)).forEach(g=>{
    const ts=g.keys.map(k=>tplById(k)).filter(t=>t&&t.out&&!t.out.explicit&&!(t.out.pair&&t.out.pair.id));
    const count={};ts.forEach(t=>{const m=t.out.must||"";count[m]=(count[m]||0)+1});
    ts.forEach(t=>{const m=t.out.must||"",h=houseOf(t);if(!h||!TOUCH[h]||count[m]<2)return;
      let a=m.match(HEAD),b=!a&&m.match(BARE);
      if(a)t.out=Object.assign({},t.out,{must:`an anime style with high detail, ${a[1]}, ${TOUCH[h]}, and particular emphasis on ${a[2]}`});
      else if(b)t.out=Object.assign({},t.out,{must:`an anime style with high detail, a setting ${TOUCH[h]}, and particular emphasis on ${b[1]}`});
      else return;
      touched++});
  });
  ACAD.TOUCHED=touched;

  /* ---------- 3. the boyfriend dressed for the scene ---------- */
  if(typeof addMO==="function"){
    addMO("bottom",[["white towel wrapped around his waist","C","casual"],["dark jeans unbuttoned at the waist","C","casual"]]);
    addMO("neckAccessory",[["loosened silk tie hanging around his neck","CU","preppy"]]);
  }
  START.item("bottom","white towel wrapped around her waist","C","casual");
  const OUT={
    kitchen:{name:"Kitchen",look:"casual",m:{waistAccessory:["canvas work apron","@c1"],bottom:["dark jeans unbuttoned at the waist","-"]},f:{}},
    massage:{name:"Massage",look:"casual",m:{bottom:["white towel wrapped around his waist","white"]},f:{bottom:["white towel wrapped around her waist","white"]}},
    car:{name:"Car",look:"casual",m:{top:["unbuttoned shirt hanging open","white"],bottom:["dark jeans unbuttoned at the waist","-"]},f:{}},
    lapdance:{name:"Lap dance",look:"preppy",m:{top:["unbuttoned shirt hanging open","white"],neckAccessory:["loosened silk tie hanging around his neck","@c1"],bottom:["tailored suit trousers","@dark"]},f:{}}};
  Object.entries(OUT).forEach(([suf,w2])=>HOUSES.forEach(h=>{const t=tplById(h+suf);if(t&&t.out&&t.out.pair&&/man$/.test(t.out.pair.id||"")){t.out.pair.outfit="scene";t.out.pair.w2=w2}}));
})();
