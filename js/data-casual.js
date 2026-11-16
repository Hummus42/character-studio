/* ---- v294: Everyday, revealing. Four casual day-to-day looks for every Academy girl, one per season, cut to show
   off: a see-through sundress worn braless for spring, a tube top and unbuttoned micro shorts for summer, an
   off-shoulder sweater and a plaid microskirt for autumn, and a cropped puffer over a plunging highleg bodysuit for
   winter. They sit in her regular wardrobe (a new "Everyday, revealing" shelf after Everyday life), not After dark:
   revealing and lewd, but clothed. All adult women (18+ by their biographies); the studio's minor safeguard still
   applies. Each look's Notes hold a line of Danbooru tags, each one checked against the Danbooru tag list
   (scratch: tagcheck.js). Colours come from each girl's own palette; her House light (SISLORE touch) is left out, since snow or sea
   spray would fight the season. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof START==="undefined"||typeof tplById!=="function")return;
  const H=ACAD.HOUSES.slice();
  const must=set=>`an anime style with high detail, ${set}, and particular emphasis on highly detailed skin, hair and eyes`;
  /* [key, set label, outfit name, items, expressions, poses, setting, Danbooru tags, theme, extra c] */
  const L=[
  ["rvspring","Spring Fling","Spring sundress",{top:["short, see-through spaghetti-strap sundress worn braless","@primary"],panties:["lace thong","white"],headwear:["wide-brimmed sun hat","@secondary"],legwear:["strappy sandals","@secondary"]},
    ["bright, flirty smile","carefree laugh, eyes half-closed","coy look from under her hat brim"],
    ["holding her hat as the breeze lifts her hem","strolling along the path, glancing back over her shoulder","leaning against a cherry tree, one knee bent, a strap slipping off her shoulder"],
    "a park path under blooming cherry trees on a breezy spring day",
    "sundress, see-through dress, no bra, covered nipples, spaghetti strap, strap slip, bare shoulders, thong, wind lift, sun hat, sandals, thighs, cherry blossoms, park, outdoors","a see-through spring sundress"],
  ["rvsummer","Summer Heat","Summer shorts",{top:["tight cropped tube top worn braless, riding up into underboob","@primary"],bottom:["unbuttoned frayed denim micro shorts","light blue"],panties:["string thong pulled high over her hips","@secondary"],eyewear:["sunglasses pushed up on her head","@secondary"],legwear:["flip-flop sandals","@secondary"]},
    ["sun-dazed, sultry smile","playful tongue-out grin","confident smirk over an iced coffee"],
    ["standing with her hip cocked, thumb hooked in her open shorts","licking an ice cream cone, leaning on the pier railing","walking ahead, looking back over her shoulder"],
    "a sun-bleached seaside pier on a blazing summer afternoon",
    "tube top, crop top, strapless, underboob, no bra, covered nipples, midriff, navel, micro shorts, denim shorts, open fly, panties under shorts, string panties, highleg panties, sweat, shiny skin, tanlines, pier, beach, outdoors","a summer tube top and micro shorts",{skinFinish:"sun-kissed, sweat-glistening skin"}],
  ["rvautumn","Autumn Tease","Autumn sweater",{top:["loose cropped off-shoulder knit sweater worn braless","@primary"],bottom:["plaid pleated microskirt","@secondary"],panties:["lace panties","@primary"],legwear:["thighhighs with garter straps and ankle boots","black"],neckAccessory:["thin choker","black"]},
    ["teasing smile over her coffee cup","flushed, playful wink","sleepy, sultry gaze"],
    ["sitting on a park bench with her legs crossed, skirt riding up","bending to pick up a fallen leaf, skirt lifting behind her","twirling in the falling leaves, sweater slipping off one shoulder"],
    "a park path drifting with red and gold autumn leaves",
    "off-shoulder sweater, cropped sweater, no bra, cleavage, bare shoulders, midriff, plaid skirt, pleated skirt, microskirt, panty peek, thighhighs, garter straps, zettai ryouiki, choker, holding cup, coffee, autumn leaves, outdoors","an autumn sweater and microskirt"],
  ["rvwinter","Winter Warmer","Winter bodysuit",{top:["plunging highleg bodysuit","@primary"],outerwear:["cropped fur-trimmed puffer jacket, worn open","white"],legwear:["sheer pantyhose and knee boots","black"],headwear:["fluffy earmuffs","@secondary"],neckAccessory:["knit scarf","@secondary"]},
    ["rosy-cheeked, teasing smile","cheeky grin, her breath fogging","shy, blushing smile in the cold"],
    ["standing in the falling snow, jacket held open","hugging herself against the cold, chest pressed together","walking down the street with shopping bags, looking back"],
    "a snowy city street at dusk lit by shop windows and christmas lights",
    "bodysuit, highleg, plunging neckline, cleavage, groin, cropped jacket, open jacket, fur-trimmed jacket, pantyhose, knee boots, earmuffs, scarf, breath, snow, snowing, christmas lights, city, street, outdoors","a winter puffer and plunging bodysuit",{blushStyle:"cold-flushed pink cheeks"}],
  /* v295: twelve more, far lewder: everyday clothes that hide almost nothing */
  ["rvmesh","Sheer Mesh Night","Mesh top",{top:["see-through black mesh crop top with nothing underneath","black"],bottom:["tight leather microskirt","@primary"],panties:["string thong","@primary"],legwear:["fishnet thighhighs and platform boots","black"],neckAccessory:["studded choker","black"]},
    ["smug, heavy-lidded smirk","bold grin with her tongue out","cool, unbothered stare"],
    ["leaning against a neon-lit wall, one boot up behind her","walking down the street, hips swaying","standing with her arms crossed under her breasts"],
    "a rain-slick city street at night under neon signs",
    "see-through shirt, see-through clothes, crop top, nipples, no bra, miniskirt, thong, fishnet thighhighs, choker, revealing clothes, night, neon lights, city, street, outdoors","a sheer mesh top"],
  ["rvhalter","Sideless Errands","Sideless dress",{top:["sideless backless halterneck short dress worn with nothing underneath","@primary"],legwear:["strappy heeled sandals","@secondary"]},
    ["breezy, carefree smile","teasing look over her sunglasses","flustered blush as the wind catches her dress"],
    ["walking with shopping bags, sideboob on full display","reaching for a high shelf, her dress riding up","glancing back over her shoulder, bare back to the viewer"],
    "a sunny shopping street",
    "sideless outfit, backless dress, halterneck, short dress, sideboob, no bra, no panties, butt crack, revealing clothes, shopping bag, shopping, street, outdoors","a sideless backless dress"],
  ["rvgym","Gym Bunny","Gym wear",{bra:["tiny cropped sports bra, riding up into underboob","@primary"],bottom:["tiny dolphin shorts riding up into a wedgie","@secondary"],legwear:["ankle socks and sneakers","white"]},
    ["sweaty, breathless grin","flushed, focused frown","cheeky wink over her shoulder"],
    ["bent over stretching, shorts wedged up","sitting on a bench with her legs spread, drinking from a water bottle","adjusting her wedgie, looking back"],
    "a busy gym with mirrors and weight racks",
    "sports bra, underboob, covered nipples, midriff, navel, dolphin shorts, short shorts, wedgie, ass, cameltoe, sweat, shiny skin, gym, from behind","gym wear",{skinFinish:"sweat-glistening, flushed skin"}],
  ["rvyoga","See-Through Yoga","Yoga pants",{top:["thin cropped tank top worn braless","white"],bottom:["sheer white yoga pants","white"],panties:["thong visible through the leggings","@primary"]},
    ["serene, smug little smile","eyes closed, calm breathing","playful look between her legs"],
    ["in a downward dog pose, hips high","in a deep lunge, back arched","sitting in a wide-legged stretch"],
    "a sunlit yoga studio with wooden floors",
    "yoga pants, see-through clothes, panties visible through clothes, thong, tank top, crop top, no bra, covered nipples, cameltoe, ass, midriff, stretching, yoga","see-through yoga pants"],
  ["rvblouse","Unbuttoned Office","Open blouse",{top:["white blouse unbuttoned to her navel with no bra","white"],bottom:["tight pencil microskirt with a high side slit","black"],legwear:["sheer black thighhighs with garter straps and stiletto heels","black"],eyewear:["thin-rimmed glasses","@secondary"]},
    ["prim smile with a knowing look","sultry, peering over her glasses","bored, unbothered pout"],
    ["leaning over a desk, blouse falling open","sitting on the desk edge with her legs crossed","bending to pick up dropped papers"],
    "a modern office at the end of the day",
    "unbuttoned shirt, open shirt, white shirt, no bra, cleavage, downblouse, nipple slip, pencil skirt, miniskirt, side slit, thighhighs, garter straps, glasses, office","an unbuttoned office blouse"],
  ["rvtank","Lazy Day Tank","Loose tank",{top:["huge, loose men's tank top with deep armholes and nothing underneath","@primary"],panties:["low-cut cotton panties","@secondary"]},
    ["sleepy, lazy smile","yawning, eyes half-closed","flushed, playful grin"],
    ["standing at the fridge, tank sagging open at the sides","sprawled on the couch, one leg over the armrest","stretching with her arms over her head"],
    "a sunny apartment kitchen on a lazy morning",
    "tank top, loose clothes, oversized clothes, sideboob, no bra, nipple slip, panties, no pants, thighs, kitchen, morning, indoors","a loose tank top"],
  ["rvwet","Caught in the Rain","Wet T-shirt",{top:["soaked, clinging thin white t-shirt worn braless","white"],bottom:["tiny denim short shorts","light blue"],legwear:["canvas sneakers","white"]},
    ["surprised, laughing gasp","flustered, embarrassed pout","cheeky grin, rain on her lips"],
    ["standing in the downpour, shirt plastered to her chest","wringing out her shirt hem, lifting it high","sheltering under an awning, shivering"],
    "a city sidewalk in a sudden summer downpour",
    "wet shirt, wet clothes, white shirt, see-through shirt, no bra, nipples, short shorts, denim shorts, wet hair, rain, outdoors, street","a soaked white t-shirt",{skinFinish:"rain-soaked, glistening skin"}],
  ["rvpasties","Pasties and Leather","Pasties",{top:["heart-shaped nipple pasties","@primary"],outerwear:["open cropped leather jacket","black"],bottom:["lowleg micro skirt","black"],panties:["highleg string thong pulled over her hips","@primary"],legwear:["thigh-high boots","black"]},
    ["fierce, cocky grin","cool, smoldering stare","playful wink"],
    ["standing with the jacket pulled wide open","leaning on a motorcycle, one leg up","walking toward the viewer, hands in her pockets"],
    "a city alley at night with graffiti and neon",
    "heart pasties, pasties, open jacket, cropped jacket, leather jacket, lowleg, miniskirt, highleg panties, thong, thigh boots, revealing clothes, navel, night, neon lights","heart pasties and a leather jacket"],
  ["rvlowleg","Lowleg Jeans","Lowleg jeans",{top:["string bikini top","@primary"],bottom:["extreme lowleg torn jeans riding below her hip bones","light blue"],panties:["highleg thong straps showing high above her jeans","@secondary"]},
    ["confident, flirty smirk","bright, cheeky laugh","sultry glance over her shoulder"],
    ["standing with her thumbs hooked in her jeans, pulling them lower","walking away, thong straps showing above her jeans","leaning on a car, hips pushed forward"],
    "a sunny beach town parking lot",
    "lowleg pants, lowleg, jeans, torn jeans, highleg panties, thong, string bikini, bikini top only, hip bones, groin, navel, midriff, butt crack, outdoors","lowleg jeans and a bikini top"],
  ["rvcutout","Center Opening","Cutout dress",{top:["clinging short dress with a center opening from collar to navel, worn with nothing underneath","@primary"],legwear:["stiletto heels","@secondary"],wristAccessory:["thin bangles","gold"]},
    ["sultry, half-lidded smile","confident, dazzling smile","playful bite of her lip"],
    ["standing at the bar with a cocktail, one hip cocked","walking into the club, chest bouncing","sitting in a booth with her legs crossed"],
    "a dim cocktail bar at night",
    "center opening, short dress, no bra, cleavage, sideboob, navel, revealing clothes, bracelet, high heels, holding cup, cocktail, bar (place), night","a center-opening dress"],
  ["rvnightie","Answering the Door","Sheer camisole",{top:["see-through silk camisole with thin straps, worn braless","@primary"],panties:["matching see-through panties","@primary"]},
    ["sleepy, unbothered smile","surprised blush","teasing smirk, leaning on the doorframe"],
    ["leaning in the doorway, one strap slipping","signing for a package at the door","stretching sleepily in the hallway"],
    "the open front door of an apartment in the morning",
    "see-through camisole, camisole, see-through clothes, nipples, panties, strap slip, no pants, doorway, morning, messy hair, indoors","a sheer camisole at the door"],
  ["rvtorn","Torn and Teasing","Torn jeans",{top:["cropped tube top worn braless","@primary"],bottom:["heavily torn jeans with ripped-open seat and thighs","light blue"],panties:["lace thong showing through the rips","@secondary"],legwear:["heeled ankle boots","black"]},
    ["mischievous grin","bored, pouty glance","flirty look over her shoulder"],
    ["walking away, her bare ass showing through the ripped seat","bending over to look in a shop window","squatting on the curb, rips gaping open"],
    "a trendy city street in the afternoon",
    "torn jeans, torn clothes, ass cutout, ass, thong, tube top, crop top, strapless, no bra, midriff, from behind, looking back, street, outdoors","torn jeans"]];

  {const seenI=new Set(),G="Everyday, revealing";
    L.forEach(([, ,,items,ex,po,,,,c])=>{
      Object.entries(items).forEach(([f,a])=>{const k=f+"|"+a[0];if(seenI.has(k))return;seenI.add(k);ACAD.items(f,[a[0]],"LS","casual")});
      ACAD.opts("expression",ex,G);ACAD.opts("posture",po,G);
      Object.entries(c||{}).forEach(([f,v])=>{if(typeof v==="string")ACAD.opts(f,[v],G)})})}
  let after="Academy Onsen";
  const labels=[];
  L.forEach(([suf,name,oname,items,ex,po,set,tags,theme,c])=>{
    const label="Academy "+name;
    ACAD.set(label,after,suf,theme.replace(/^an? /,""),"casual",{tags:["everyday","revealing"].concat(tags.split(",").slice(0,4).map(s=>s.trim())),oname,c:Object.assign({age:"woman"},c||{})},
      H.map((h,i)=>[h,items,ex[i%ex.length],po[i%po.length],theme,{}]));
    after=label;labels.push(label);
    H.forEach(h=>{const t=tplById(h+suf);if(!t)return;t.out=Object.assign({},t.out,{must:must(set),notes:tags});if(typeof t.blurb==="string")t.blurb=t.blurb.replace(/: \. /,". ")});
  });
  /* the shelf, right after Everyday life */
  if(Array.isArray(ACAD.CATS)){const at=ACAD.CATS.findIndex(c=>c[0]==="Everyday life");ACAD.CATS.splice(at<0?ACAD.CATS.length:at+1,0,["Everyday, revealing",labels])}
  ACAD.CASUAL={looks:L.length,girls:H.length};
})();
