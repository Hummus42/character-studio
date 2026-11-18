/* ---- v294: Everyday, revealing. Four casual day-to-day looks for every Academy girl, one per season, cut to show
   off: a see-through sundress worn braless for spring, a tube top and unbuttoned micro shorts for summer, an
   off-shoulder sweater and a plaid microskirt for autumn, and a cropped puffer over a plunging highleg bodysuit for
   winter. They sit in her regular wardrobe (a new "Everyday, revealing" shelf after Everyday life), not After dark:
   revealing and lewd, but clothed. All adult women (18+ by their biographies); the studio's minor safeguard still
   applies. Each look's Notes hold a line of Danbooru tags (v322: body, framing and setting only; every clothing tag
   and clothing state lives in the Outfit items so it can be changed), each one checked against the Danbooru tag list
   (scratch: tagcheck.js). Colours come from each girl's own palette; her House light (SISLORE touch) is left out, since snow or sea
   spray would fight the season. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof START==="undefined"||typeof tplById!=="function")return;
  const H=ACAD.HOUSES.slice();
  const must=set=>`an anime style with high detail, ${set}, and particular emphasis on highly detailed skin, hair and eyes`;
  /* [key, set label, outfit name, items, expressions, poses, setting, Danbooru tags, theme, extra c] */
  const L=[
  ["rvspring","Spring Fling","Spring sundress",{top:["short see-through spaghetti-strap sundress worn braless, see-through dress, its hem lifting in the breeze, one strap slipping off her shoulder","@primary"],panties:["lace thong","white"],headwear:["wide-brimmed sun hat tilted low","@secondary"],legwear:["strappy sandals","@secondary"]},
    ["bright, flirty smile","carefree laugh, eyes half-closed","coy look from under her lashes"],
    ["one hand raised against the breeze","strolling along the path, glancing back over her shoulder","leaning against a cherry tree, one knee bent"],
    "a park path under blooming cherry trees on a breezy spring day",
    "bare shoulders, thighs, cherry blossoms, park, outdoors","a see-through spring sundress"],
  ["rvsummer","Summer Heat","Summer shorts",{top:["tight cropped strapless tube top worn braless, riding up into underboob","@primary"],bottom:["unbuttoned frayed denim micro shorts with the fly open, a thumb hooked in them","light blue"],panties:["highleg string thong pulled high over her hips, showing under the shorts","@secondary"],eyewear:["sunglasses pushed up on her head","@secondary"],legwear:["flip-flop sandals","@secondary"]},
    ["sun-dazed, sultry smile","playful tongue-out grin","confident smirk over an iced coffee"],
    ["standing with her hip cocked, thumb hooked at her hip","licking an ice cream cone, leaning on the pier railing","walking ahead, looking back over her shoulder"],
    "a sun-bleached seaside pier on a blazing summer afternoon",
    "underboob, midriff, navel, sweat, shiny skin, tanlines, pier, beach, outdoors","a summer tube top and micro shorts",{skinFinish:"sun-kissed, sweat-glistening skin"}],
  ["rvautumn","Autumn Tease","Autumn sweater",{top:["loose cropped off-shoulder knit sweater worn braless, slipping off one shoulder","@primary"],bottom:["plaid pleated microskirt riding up and lifting behind her, a panty peek","@secondary"],panties:["lace panties","@primary"],legwear:["thighhighs with garter straps and ankle boots, zettai ryouiki","black"],neckAccessory:["thin choker","black"]},
    ["teasing smile over her coffee cup","flushed, playful wink","sleepy, sultry gaze"],
    ["sitting on a park bench with her legs crossed","bending to pick up a fallen leaf","twirling in the falling leaves"],
    "a park path drifting with red and gold autumn leaves",
    "cleavage, bare shoulders, midriff, holding cup, coffee, autumn leaves, outdoors","an autumn sweater and microskirt"],
  ["rvwinter","Winter Warmer","Winter bodysuit",{top:["plunging highleg bodysuit","@primary"],outerwear:["cropped fur-trimmed puffer jacket, worn open and held wide open","white"],legwear:["sheer pantyhose and knee boots","black"],headwear:["fluffy earmuffs","@secondary"],neckAccessory:["knit scarf","@secondary"]},
    ["rosy-cheeked, teasing smile","cheeky grin, her breath fogging","shy, blushing smile in the cold"],
    ["standing in the falling snow, arms spread","hugging herself against the cold, chest pressed together","walking down the street with shopping bags, looking back"],
    "a snowy city street at dusk lit by shop windows and christmas lights",
    "cleavage, groin, breath, snow, snowing, christmas lights, city, street, outdoors","a winter puffer and plunging bodysuit",{blushStyle:"cold-flushed pink cheeks"}],
  /* v295: twelve more, far lewder: everyday clothes that hide almost nothing */
  ["rvmesh","Sheer Mesh Night","Mesh top",{top:["see-through black mesh crop top with nothing underneath, revealing clothes","black"],bottom:["tight leather microskirt","@primary"],panties:["string thong","@primary"],legwear:["fishnet thighhighs and platform boots","black"],neckAccessory:["studded choker","black"]},
    ["smug, heavy-lidded smirk","bold grin with her tongue out","cool, unbothered stare"],
    ["leaning against a neon-lit wall, one foot up behind her","walking down the street, hips swaying","standing with her arms crossed under her breasts"],
    "a rain-slick city street at night under neon signs",
    "nipples, night, neon lights, city, street, outdoors","a sheer mesh top"],
  ["rvhalter","Sideless Errands","Sideless dress",{top:["sideless backless halterneck short dress worn with nothing underneath, revealing clothes, riding up and caught by the wind","@primary"],legwear:["strappy heeled sandals","@secondary"]},
    ["breezy, carefree smile","teasing look over her sunglasses","flustered, windswept blush"],
    ["walking with shopping bags, sideboob on full display","reaching for a high shelf","glancing back over her shoulder, bare back to the viewer"],
    "a sunny shopping street",
    "sideboob, butt crack, shopping bag, shopping, street, outdoors","a sideless backless dress"],
  ["rvgym","Gym Bunny","Gym wear",{bra:["tiny cropped sports bra, riding up into underboob","@primary"],bottom:["tiny dolphin shorts riding up and wedged up into a wedgie","@secondary"],legwear:["ankle socks and sneakers","white"]},
    ["sweaty, breathless grin","flushed, focused frown","cheeky wink over her shoulder"],
    ["bent over stretching","sitting on a bench with her legs spread, drinking from a water bottle","reaching back, looking over her shoulder"],
    "a busy gym with mirrors and weight racks",
    "underboob, midriff, navel, ass, cameltoe, sweat, shiny skin, gym, from behind","gym wear",{skinFinish:"sweat-glistening, flushed skin"}],
  ["rvyoga","See-Through Yoga","Yoga pants",{top:["thin cropped tank top worn braless","white"],bottom:["sheer see-through white yoga pants","white"],panties:["thong visible through the leggings","@primary"]},
    ["serene, smug little smile","eyes closed, calm breathing","playful look between her legs"],
    ["in a downward dog pose, hips high","in a deep lunge, back arched","sitting in a wide-legged stretch"],
    "a sunlit yoga studio with wooden floors",
    "cameltoe, ass, midriff, stretching, yoga","see-through yoga pants"],
  ["rvblouse","Unbuttoned Office","Open blouse",{top:["white blouse unbuttoned to her navel with no bra, an open shirt falling open, downblouse, nipple slip","white"],bottom:["tight pencil microskirt with a high side slit","black"],legwear:["sheer black thighhighs with garter straps and stiletto heels","black"],eyewear:["thin-rimmed glasses she peers over","@secondary"]},
    ["prim smile with a knowing look","sultry, peering look","bored, unbothered pout"],
    ["leaning over a desk, chest toward the viewer","sitting on the desk edge with her legs crossed","bending to pick up dropped papers"],
    "a modern office at the end of the day",
    "cleavage, office","an unbuttoned office blouse"],
  ["rvtank","Lazy Day Tank","Loose tank",{top:["huge, loose oversized men's tank top with deep armholes and nothing underneath, sagging open at the sides, nipple slip","@primary"],panties:["low-cut cotton panties","@secondary"]},
    ["sleepy, lazy smile","yawning, eyes half-closed","flushed, playful grin"],
    ["standing at the fridge, leaning in","sprawled on the couch, one leg over the armrest","stretching with her arms over her head"],
    "a sunny apartment kitchen on a lazy morning",
    "sideboob, thighs, kitchen, morning, indoors","a loose tank top"],
  ["rvwet","Caught in the Rain","Wet T-shirt",{top:["soaked, clinging thin white t-shirt worn braless, see-through wet clothes plastered to her chest, its hem wrung out and lifted high","white"],bottom:["tiny denim short shorts","light blue"],legwear:["canvas sneakers","white"]},
    ["surprised, laughing gasp","flustered, embarrassed pout","cheeky grin, rain on her lips"],
    ["standing in the downpour","wringing water out, arms raised","sheltering under an awning, shivering"],
    "a city sidewalk in a sudden summer downpour",
    "nipples, wet hair, rain, outdoors, street","a soaked white t-shirt",{skinFinish:"rain-soaked, glistening skin"}],
  ["rvpasties","Pasties and Leather","Pasties",{top:["heart-shaped nipple pasties","@primary"],outerwear:["open cropped leather jacket pulled wide open, revealing clothes","black"],bottom:["lowleg micro skirt","black"],panties:["highleg string thong pulled over her hips","@primary"],legwear:["thigh-high boots","black"]},
    ["fierce, cocky grin","cool, smoldering stare","playful wink"],
    ["standing with her arms spread wide","leaning on a motorcycle, one leg up","walking toward the viewer, hips swaying"],
    "a city alley at night with graffiti and neon",
    "navel, night, neon lights","heart pasties and a leather jacket"],
  ["rvlowleg","Lowleg Jeans","Lowleg jeans",{top:["string bikini top","@primary"],bottom:["extreme lowleg torn jeans riding below her hip bones, her thumbs hooked in them pulling them lower","light blue"],panties:["highleg thong straps showing high above her jeans","@secondary"]},
    ["confident, flirty smirk","bright, cheeky laugh","sultry glance over her shoulder"],
    ["standing with her thumbs hooked at her hips","walking away, glancing back","leaning on a car, hips pushed forward"],
    "a sunny beach town parking lot",
    "hip bones, groin, navel, midriff, butt crack, outdoors","lowleg jeans and a bikini top"],
  ["rvcutout","Center Opening","Cutout dress",{top:["clinging short dress with a center opening from collar to navel, worn with nothing underneath, revealing clothes","@primary"],legwear:["stiletto high heels","@secondary"],wristAccessory:["thin bangles","gold"]},
    ["sultry, half-lidded smile","confident, dazzling smile","playful bite of her lip"],
    ["standing at the bar with a cocktail, one hip cocked","walking into the club, chest bouncing","sitting in a booth with her legs crossed"],
    "a dim cocktail bar at night",
    "cleavage, sideboob, navel, holding cup, cocktail, bar (place), night","a center-opening dress"],
  ["rvnightie","Answering the Door","Sheer camisole",{top:["see-through silk camisole with thin straps, worn braless, one strap slipping","@primary"],panties:["matching see-through panties","@primary"]},
    ["sleepy, unbothered smile","surprised blush","teasing smirk, leaning on the doorframe"],
    ["leaning in the doorway","signing for a package at the door","stretching sleepily in the hallway"],
    "the open front door of an apartment in the morning",
    "nipples, doorway, morning, messy hair, indoors","a sheer camisole at the door"],
  ["rvtorn","Torn and Teasing","Torn jeans",{top:["cropped strapless tube top worn braless","@primary"],bottom:["heavily torn jeans with ripped-open seat and thighs, an ass cutout, the rips gaping open","light blue"],panties:["lace thong showing through the rips","@secondary"],legwear:["heeled ankle boots","black"]},
    ["mischievous grin","bored, pouty glance","flirty look over her shoulder"],
    ["walking away, her bare ass on show","bending over to look in a shop window","squatting on the curb"],
    "a trendy city street in the afternoon",
    "ass, midriff, from behind, looking back, street, outdoors","torn jeans"]];

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
