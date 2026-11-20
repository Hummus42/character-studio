/* ---- v335: The Fifty States, redone "less is more". Fifty studio starting points (not the Academy), one girl per US state.
   NovelAI learned from Danbooru tags, so every state is drawn from common tags with real post counts (checked 2026-11-19):
   palette colors, ordinary clothing, one simple held object and a few setting tags. No flags, no brands, no overly
   specific objects (the first pass's flag prints, Old Bay tin and crab mallet did not render). Adults, glamorous and lewd.
   One outfit each plus Nude. Every value is registered as a studio option (group "The Fifty States"), so nothing loads as a
   custom value. Maryland (usmd) is the owner's own state: take care with it. ---- */
(function(){
  if(typeof START==="undefined"||typeof CHAR==="undefined"||typeof OUTFIT==="undefined")return;
  const GROUP="The Fifty States";
  /* ---------- shared base: cute faces, sleek hair, hourglass figures ---------- */
  const FACE={age:"young woman",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"bright, intricately detailed irises",
    faceShape:"soft, heart-shaped face",browShape:"soft, natural brows",noseShape:"small button nose",mouthShape:"soft, full lips",
    eyeShape:"large, almond-shaped eyes with long lashes",lashNatural:"long, thick eyelashes",skinFinish:"dewy, glowing skin",
    nailStyle:"long almond fingernails",makeupStyle:"soft glam makeup",eyelinerStyle:"thin winged eyeliner",lashStyle:"long defined lashes",
    blushStyle:"soft rosy blush",lipFinish:"glossy lips",faceAccents:"soft cheekbone highlight",
    shoulderShape:"soft shoulders",armShape:"slender arms",handShape:"slender, graceful hands",waistShape:"tiny waist",stomachShape:"flat stomach",
    nippleType:"soft and rounded",nippleLength:"medium-length",areolaSize:"medium-sized",areolaType:"smooth",vaginaType:"plump with soft outer lips",
    pubicHair:"a neatly trimmed patch of pubic hair"};
  const BODY={
    hg:{heightStature:"average height",bustSize:"large, full breasts",bustShape:"round, perky shape",bustWeight:"soft fullness",torsoShape:"curvy torso",
      hipShape:"wide, curvy hips",buttSize:"round, full butt",thighBuild:"soft, full thighs",legShape:"long, shapely legs",bodySoftness:"curvy hourglass figure"},
    busty:{heightStature:"average height",bustSize:"very large, full breasts",bustShape:"round, top-heavy shape",bustWeight:"heavy, soft fullness",torsoShape:"curvy torso",
      hipShape:"wide, curvy hips",buttSize:"round, full butt",thighBuild:"thick, shapely thighs",legShape:"shapely legs",bodySoftness:"top-heavy hourglass figure"},
    petite:{heightStature:"a petite frame",bustSize:"large, full breasts",bustShape:"round, perky shape",bustWeight:"soft fullness",torsoShape:"petite, curvy torso",
      hipShape:"curvy hips",buttSize:"round, perky butt",thighBuild:"soft thighs",legShape:"slender, shapely legs",bodySoftness:"petite, curvy hourglass figure"},
    tall:{heightStature:"tall, statuesque stature",bustSize:"large, full breasts",bustShape:"round, perky shape",bustWeight:"soft fullness",torsoShape:"long, slender torso",
      hipShape:"curvy hips",buttSize:"round, firm butt",thighBuild:"slender, toned thighs",legShape:"very long, shapely legs",bodySoftness:"tall, slender hourglass figure"},
    big:{heightStature:"average height",bustSize:"huge, full breasts",bustShape:"round, top-heavy shape",bustWeight:"heavy, soft fullness",torsoShape:"curvy torso",
      hipShape:"very wide, curvy hips",buttSize:"big, round butt",thighBuild:"thick, soft thighs",legShape:"shapely legs",bodySoftness:"exaggerated, voluptuous hourglass figure"},
    peach:{heightStature:"average height",bustSize:"large, full breasts",bustShape:"round, perky shape",bustWeight:"soft fullness",torsoShape:"curvy torso",
      hipShape:"very wide, curvy hips",buttSize:"big, round, peach-shaped butt",thighBuild:"thick, shapely thighs",legShape:"shapely legs",bodySoftness:"curvy, bottom-heavy hourglass figure"}};
  /* intimate colors follow her skin */
  const TONE={fair:["rosy pink","soft pink","pink"],light:["soft pink","light pink","pink"],tan:["caramel brown","light brown","rosy brown"],
    olive:["light brown","rosy brown","dusky rose"],brown:["dark brown","deep brown","rosy brown"],deep:["dark brown","deep brown","deep rose-brown"]};
  const SKIN={fair:"fair",light:"light",tan:"tan",olive:"light olive",brown:"warm brown",deep:"deep brown"};
  /* s.h: [hair style, length, base color, bangs]; s.e: eye color; s.x: expression; s.p: posture; s.m: markings */
  const mk=s=>{const tn=TONE[s.tone||"light"];
    const c=Object.assign({},FACE,BODY[s.body||"hg"],{nippleColor:tn[0],areolaColor:tn[1],vaginaColor:tn[2]},
      {hairStyle:s.h[0],hairLength:s.h[1],hairBase:s.h[2],bangs:s.h[3]||"no bangs",hairTexture:"sleek, silky and straight",hairMovement:"falls smoothly",
       eyeOne:s.e,skinTone:SKIN[s.tone||"light"],undertone:"warm",expression:s.x,posture:s.p,impression:s.imp},
      s.m?{bodyMarkings:s.m}:{},s.c||{});
    return{id:s.id,name:s.name,blurb:s.blurb,pal:s.pal,c,outfit:{oname:s.oname,look:s.look,items:s.items,details:{},dcol:{}},
      out:{must:s.must},nude:true,tags:["states"]}};
  const R=v=>[v,"-"];

  const S=[
  /* ===== MARYLAND: blue crabs on the Chesapeake, the flag's black-and-gold as a checkered print, black-eyed Susans (yellow
     flowers), summer on the pier. Every piece is a common tag. ===== */
  {id:"usmd",name:"Maryland, the Old Line State",tone:"light",body:"hg",
    blurb:"A Chesapeake Bay girl holding up a blue crab on the pier: black-and-yellow checkered bikini, yellow flowers in her hair, tan lines.",
    pal:{primary:"yellow",secondary:"black",third:"red",accent:"white",extra:"blue"},oname:"Crabs on the bay",look:"swimwear",
    h:["high ponytail with a yellow flower","very long","blonde","wispy see-through bangs"],e:"blue",x:"grin",p:"holding up a crab",
    imp:"a sunny Chesapeake Bay girl",m:"tanlines, freckles",
    items:{top:R("black and yellow checkered bikini top"),bottom:R("denim shorts"),legwear:R("a pair of black and yellow striped thighhighs"),
      headwear:R("yellow flower hair ornament"),heldItem:R("crab")},
    must:"pier, ocean, sunset"},

  {id:"usal",name:"Alabama, the Heart of Dixie",tone:"light",body:"hg",blurb:"Crimson cheerleader in houndstooth with a big hair bow and pom-poms.",
    pal:{primary:"crimson",secondary:"white",third:"black",accent:"white",extra:"gold"},oname:"Game day",look:"sporty",
    h:["long curly hair with a big red bow","long","brown","no bangs"],e:"brown",x:"smile, open mouth",p:"cheering, arms up",imp:"a southern cheerleader",
    items:{top:R("red cheerleader crop top"),bottom:R("houndstooth pleated miniskirt"),legwear:R("white cowboy boots"),headwear:R("big red hair bow"),heldItem:R("pom poms")},
    must:"stadium, sunny day"},

  {id:"usak",name:"Alaska, the Last Frontier",tone:"fair",body:"tall",blurb:"Silver hair, an open white fur-trimmed coat over a bikini, earmuffs, snow and the aurora.",
    pal:{primary:"white",secondary:"light blue",third:"green",accent:"silver",extra:"brown"},oname:"Under the aurora",look:"glam",
    h:["long straight hair","very long","silver","long side-swept bangs"],e:"light blue",x:"gentle smile, blush",p:"holding her coat open",imp:"an icy northern beauty",
    items:{outerwear:R("open white fur-trimmed coat"),top:R("white bikini"),legwear:R("white fur-trimmed boots"),headwear:R("white earmuffs"),earAccessory:R("snowflake hair ornament")},
    must:"snow, snowing, aurora, night"},

  {id:"usaz",name:"Arizona, the Grand Canyon State",tone:"tan",body:"hg",blurb:"Desert sunset cowgirl: orange bikini, fringe shorts, cowboy hat, cacti all around.",
    pal:{primary:"orange",secondary:"light blue",third:"brown",accent:"aqua",extra:"beige"},oname:"Desert sunset",look:"resort",
    h:["long straight hair","very long","red","no bangs"],e:"amber",x:"seductive smile",p:"hand on own hip",imp:"a sun-baked desert beauty",m:"tanlines, sweat",
    items:{top:R("orange bikini top"),bottom:R("brown fringe trim shorts"),legwear:R("brown cowboy boots"),headwear:R("brown cowboy hat"),neckAccessory:R("aqua gemstone necklace")},
    must:"desert, cactus, sunset"},

  {id:"usar",name:"Arkansas, the Natural State",tone:"light",body:"busty",blurb:"Red plaid and overall shorts with pig ears, out in the Ozark forest. Woo pig sooie.",
    pal:{primary:"red",secondary:"white",third:"blue",accent:"silver",extra:"green"},oname:"Razorback country",look:"casual",
    h:["long wavy hair","long","brown","curtain bangs"],e:"hazel",x:"grin, open mouth",p:"waving",imp:"an Ozark country girl",
    items:{top:R("red plaid shirt, tied shirt"),bottom:R("blue overall shorts"),legwear:R("brown cowboy boots"),headwear:R("pig ears"),neckAccessory:R("diamond necklace")},
    must:"forest, mountain"},

  {id:"usca",name:"California, the Golden State",tone:"tan",body:"tall",blurb:"Beach-blonde surfer starlet in a white bikini with a surfboard and sunglasses on her head.",
    pal:{primary:"white",secondary:"blue",third:"orange",accent:"gold",extra:"pink"},oname:"Malibu",look:"swimwear",
    h:["long wavy hair","very long","blonde","no bangs"],e:"blue",x:"smile",p:"holding a surfboard",imp:"a Hollywood surfer girl",m:"tanlines",
    items:{top:R("white bikini top"),bottom:R("denim shorts"),eyewear:R("sunglasses, eyewear on head"),headwear:R("orange hair flower"),heldItem:R("surfboard")},
    must:"beach, palm tree, sunset"},

  {id:"usco",name:"Colorado, the Centennial State",tone:"light",body:"hg",blurb:"Ski bunny in the Rockies: open white jacket over a blue bikini, goggles on her head.",
    pal:{primary:"blue",secondary:"white",third:"red",accent:"yellow",extra:"green"},oname:"Après-ski",look:"sporty",
    h:["twin braids","long","brown","wispy see-through bangs"],e:"blue",x:"smile, blush",p:"holding a snowboard",imp:"a Rocky Mountain ski bunny",
    items:{outerwear:R("open white winter jacket"),top:R("blue bikini top"),bottom:R("blue snow pants"),headwear:R("ski goggles, goggles on head"),heldItem:R("snowboard")},
    must:"snow, mountain, pine tree"},

  {id:"usct",name:"Connecticut, the Constitution State",tone:"fair",body:"tall",blurb:"Old-money prep: tennis whites, a pink sweater around her neck and pearls.",
    pal:{primary:"pink",secondary:"navy blue",third:"white",accent:"green",extra:"white"},oname:"Country club",look:"preppy",
    h:["sleek straight hair with a headband","shoulder-length","blonde","no bangs"],e:"blue",x:"smug, closed mouth smile",p:"holding a tennis racket on her shoulder",imp:"an old-money prep heiress",
    items:{top:R("white tennis uniform"),outerwear:R("pink sweater around neck"),neckAccessory:R("pearl necklace"),headwear:R("navy blue headband"),legwear:R("white sneakers"),heldItem:R("tennis racket")},
    must:"tennis court, sunny day"},

  {id:"usde",name:"Delaware, the First State",tone:"light",body:"petite",blurb:"Small and overlooked office lady: blue blazer, pencil skirt and an armful of shopping bags.",
    pal:{primary:"blue",secondary:"beige",third:"gold",accent:"white",extra:"black"},oname:"First State, tax free",look:"glam",
    h:["bob cut","short","light brown","blunt bangs"],e:"blue",x:"pout",p:"carrying shopping bags",imp:"a tiny office lady",
    items:{outerwear:R("blue blazer"),top:R("white shirt, unbuttoned"),bottom:R("black pencil skirt"),legwear:R("pantyhose, high heels"),eyewear:R("glasses"),heldItem:R("shopping bag")},
    must:"city, street"},

  {id:"usfl",name:"Florida, the Sunshine State",tone:"tan",body:"busty",blurb:"Sun-baked and fearless in a pink micro bikini with an orange in hand, flamingos and palms behind.",
    pal:{primary:"pink",secondary:"orange",third:"aqua",accent:"white",extra:"green"},oname:"Florida sunshine",look:"swimwear",
    h:["high ponytail","very long","blonde","no bangs"],e:"green",x:"crazy smile",p:"holding an orange",imp:"a wild Florida party girl",m:"tanlines, tattoo",
    items:{top:R("pink micro bikini"),eyewear:R("orange sunglasses"),legwear:R("anklet, barefoot"),heldItem:R("orange (fruit)")},
    must:"beach, palm tree, flamingo, sunny day"},

  {id:"usga",name:"Georgia, the Peach State",tone:"deep",body:"peach",blurb:"Sweet southern belle in a sundress and sun hat, biting a peach.",
    pal:{primary:"peach",secondary:"pink",third:"white",accent:"green",extra:"gold"},oname:"Georgia peach",look:"sweet",
    h:["long curly hair","long","black","no bangs"],e:"brown",x:"smile",p:"eating a peach",imp:"a sweet southern belle",
    items:{top:R("peach sundress"),headwear:R("white sun hat with a peach ribbon"),legwear:R("white sandals"),earAccessory:R("peach earrings"),heldItem:R("peach")},
    must:"fruit tree, sunny day"},

  {id:"ushi",name:"Hawaii, the Aloha State",tone:"brown",body:"hg",blurb:"Hibiscus in her hair, a flower lei, a red bikini and a pineapple on the beach.",
    pal:{primary:"red",secondary:"aqua",third:"white",accent:"green",extra:"yellow"},oname:"Aloha",look:"resort",
    h:["very long straight hair with a hibiscus","absurdly long","black","no bangs"],e:"brown",x:"smile",p:"holding a pineapple",imp:"an island beauty",
    items:{top:R("red bikini"),neckAccessory:R("lei, flower necklace"),headwear:R("red hibiscus hair flower"),legwear:R("anklet, barefoot"),heldItem:R("pineapple")},
    must:"beach, ocean, palm tree"},

  {id:"usid",name:"Idaho, the Gem State",tone:"light",body:"hg",blurb:"Farm girl in overalls and a straw hat, holding a potato in the field.",
    pal:{primary:"brown",secondary:"red",third:"blue",accent:"beige",extra:"green"},oname:"Potato harvest",look:"cottage",
    h:["twin braids","long","brown","wispy see-through bangs"],e:"green",x:"smile",p:"holding a potato",imp:"a wholesome farm girl",m:"freckles",
    items:{top:R("red bikini top"),bottom:R("overalls"),legwear:R("rubber boots"),headwear:R("straw hat"),heldItem:R("potato")},
    must:"field, farm, mountain"},

  {id:"usil",name:"Illinois, the Prairie State",tone:"olive",body:"hg",blurb:"Windy City girl in a red leather jacket and thigh boots with a slice of pizza.",
    pal:{primary:"light blue",secondary:"red",third:"white",accent:"black",extra:"silver"},oname:"Windy City",look:"street",
    h:["straight hair blowing in the wind","shoulder-length","black","long side-swept bangs"],e:"brown",x:"smirk",p:"holding a pizza slice",imp:"a windswept big-city girl",
    items:{outerwear:R("red leather jacket"),top:R("white crop top"),bottom:R("black miniskirt"),legwear:R("black thigh boots"),earAccessory:R("red earrings"),heldItem:R("pizza slice")},
    must:"city, skyscraper, wind"},

  {id:"usin",name:"Indiana, the Hoosier State",tone:"light",body:"tall",blurb:"Race queen at the speedway waving a checkered flag.",
    pal:{primary:"red",secondary:"black",third:"white",accent:"gold",extra:"blue"},oname:"Race queen",look:"sporty",
    h:["sleek high ponytail","very long","blonde","no bangs"],e:"blue",x:"smile, one eye closed",p:"waving a checkered flag",imp:"a speedway race queen",
    items:{top:R("race queen, red and white leotard"),gloves:R("white elbow gloves"),legwear:R("white thigh boots"),heldItem:R("checkered flag")},
    must:"race track, sunny day"},

  {id:"usia",name:"Iowa, the Hawkeye State",tone:"light",body:"busty",blurb:"Corn-fed country sweetheart in a tied plaid shirt and denim shorts, an ear of corn in hand.",
    pal:{primary:"yellow",secondary:"green",third:"red",accent:"white",extra:"blue"},oname:"Corn country",look:"cottage",
    h:["twin braids","long","blonde","wispy see-through bangs"],e:"blue",x:"smile, blush",p:"holding corn",imp:"a corn-fed country girl",m:"freckles",
    items:{top:R("red plaid shirt, tied shirt"),bottom:R("denim shorts"),legwear:R("brown cowboy boots"),headwear:R("straw hat"),heldItem:R("corn")},
    must:"field, farm, blue sky"},

  {id:"usks",name:"Kansas, the Sunflower State",tone:"fair",body:"petite",blurb:"Twin braids, a blue checkered pinafore, red high heels and a basket in a sunflower field.",
    pal:{primary:"blue",secondary:"white",third:"red",accent:"yellow",extra:"gold"},oname:"Sunflower field",look:"sweet",
    h:["twin braids with blue ribbons","long","auburn","bangs"],e:"brown",x:"smile",p:"holding a basket",imp:"a sweet farm girl",
    items:{top:R("blue checkered pinafore dress, white shirt"),legwear:R("red high heels"),headwear:R("blue hair ribbon"),heldItem:R("basket")},
    must:"sunflower field, wind, blue sky"},

  {id:"usky",name:"Kentucky, the Bluegrass State",tone:"light",body:"hg",blurb:"Derby Day: a big flower-covered hat, a pink dress and a cocktail glass, horses behind.",
    pal:{primary:"pink",secondary:"green",third:"white",accent:"red",extra:"gold"},oname:"Derby Day",look:"glam",
    h:["low bun","long","strawberry blonde","no bangs"],e:"green",x:"smile, blush",p:"holding a cocktail glass",imp:"a Derby Day socialite",
    items:{top:R("pink dress"),headwear:R("big pink sun hat with red roses, hat flower"),gloves:R("white lace gloves"),legwear:R("high heels"),neckAccessory:R("pearl necklace"),heldItem:R("cocktail glass")},
    must:"horse, sunny day"},

  {id:"usla",name:"Louisiana, the Pelican State",tone:"brown",body:"busty",blurb:"Mardi Gras in purple, green and gold: bead necklaces, a masquerade mask and a trumpet.",
    pal:{primary:"purple",secondary:"green",third:"gold",accent:"black",extra:"white"},oname:"Mardi Gras",look:"costume",
    h:["long wavy hair","very long","black","no bangs"],e:"gold",x:"smile, open mouth",p:"holding a trumpet",imp:"a New Orleans party girl",
    items:{top:R("purple corset"),bottom:R("gold miniskirt"),neckAccessory:R("purple green and gold bead necklace"),maskAccessory:R("masquerade mask"),
      legwear:R("fishnet pantyhose, high heels"),shoulderPiece:R("purple feather boa"),heldItem:R("trumpet")},
    must:"night, city lights, confetti"},

  {id:"usme",name:"Maine, the Pine Tree State",tone:"fair",body:"hg",blurb:"A yellow raincoat over a red bikini, rubber boots and a lobster by the lighthouse.",
    pal:{primary:"red",secondary:"yellow",third:"navy blue",accent:"green",extra:"white"},oname:"Lobster boat",look:"casual",
    h:["long wavy hair","long","auburn","curtain bangs"],e:"green",x:"grin",p:"holding a lobster",imp:"a coastal fisher girl",m:"freckles",
    items:{outerwear:R("open yellow raincoat"),top:R("red bikini"),legwear:R("yellow rubber boots"),heldItem:R("lobster")},
    must:"lighthouse, rocks, ocean"},

  {id:"usma",name:"Massachusetts, the Bay State",tone:"light",body:"hg",blurb:"A colonial rebel in a tricorne and navy coat with a teacup, ships in the harbor.",
    pal:{primary:"navy blue",secondary:"white",third:"red",accent:"gold",extra:"brown"},oname:"Tea party",look:"costume",
    h:["low ponytail with a ribbon","long","brown","no bangs"],e:"grey",x:"smirk",p:"holding a teacup",imp:"a colonial rebel girl",
    items:{headwear:R("black tricorne"),outerwear:R("open navy blue coat"),top:R("white bra"),bottom:R("white shorts"),legwear:R("white thighhighs, boots"),heldItem:R("teacup")},
    must:"harbor, ship"},

  {id:"usmi",name:"Michigan, the Great Lakes State",tone:"light",body:"hg",blurb:"Mechanic girl with her jumpsuit around her waist, one hand in a mitten, by the lake.",
    pal:{primary:"blue",secondary:"red",third:"silver",accent:"white",extra:"navy blue"},oname:"The Mitten",look:"street",
    h:["long straight hair","long","brown","long side-swept bangs"],e:"blue",x:"smile",p:"holding up a mitten",imp:"a Motor City mechanic girl",
    items:{outerwear:R("blue jumpsuit, clothes around waist"),top:R("white tank top"),gloves:R("blue mittens"),legwear:R("boots"),heldItem:R("wrench")},
    must:"lake, blue sky"},

  {id:"usmn",name:"Minnesota, the Land of 10,000 Lakes",tone:"fair",body:"tall",blurb:"Ice-skating Nordic blonde in a blue sweater, earmuffs and snow by a lake.",
    pal:{primary:"blue",secondary:"white",third:"black",accent:"red",extra:"green"},oname:"Frozen lake",look:"sporty",
    h:["twin braids","very long","platinum blonde","wispy see-through bangs"],e:"light blue",x:"smile, blush",p:"ice skating",imp:"a polite Nordic snow girl",
    items:{top:R("blue sweater"),bottom:R("white shorts"),legwear:R("white thighhighs, ice skates"),headwear:R("white earmuffs"),gloves:R("white mittens")},
    must:"snow, lake, pine tree"},

  {id:"usms",name:"Mississippi, the Magnolia State",tone:"deep",body:"hg",blurb:"Southern belle in white lace with a parasol and a white flower, by the big river.",
    pal:{primary:"white",secondary:"brown",third:"blue",accent:"green",extra:"gold"},oname:"Southern belle",look:"glam",
    h:["long wavy hair with a white flower","long","black","no bangs"],e:"brown",x:"gentle smile",p:"holding a parasol",imp:"a southern belle",
    items:{top:R("white lace dress"),headwear:R("white hair flower"),gloves:R("white elbow gloves"),legwear:R("white thighhighs, high heels"),heldItem:R("white parasol")},
    must:"river, sunset"},

  {id:"usmo",name:"Missouri, the Show-Me State",tone:"light",body:"hg",blurb:"Barbecue girl in a red crop top and cowboy boots with a plate of meat, city behind.",
    pal:{primary:"red",secondary:"gold",third:"silver",accent:"white",extra:"brown"},oname:"Show me",look:"casual",
    h:["long wavy hair","long","auburn","curtain bangs"],e:"hazel",x:"smirk",p:"hand on own hip",imp:"a barbecue-loving Midwest girl",
    items:{top:R("red crop top"),bottom:R("white shorts"),legwear:R("brown cowboy boots"),heldItem:R("meat")},
    must:"city, barbecue, sunny day"},

  {id:"usmt",name:"Montana, Big Sky Country",tone:"light",body:"tall",blurb:"Mountain ranch girl in an open plaid shirt and cowboy hat with a fishing rod by the river.",
    pal:{primary:"blue",secondary:"brown",third:"red",accent:"green",extra:"white"},oname:"Big Sky",look:"casual",
    h:["long braid","long","light brown","no bangs"],e:"blue",x:"smile",p:"holding a fishing rod",imp:"a big-sky ranch girl",
    items:{outerwear:R("open red plaid shirt"),top:R("brown bikini top"),bottom:R("denim shorts"),headwear:R("brown cowboy hat"),legwear:R("brown cowboy boots"),heldItem:R("fishing rod")},
    must:"mountain, river, blue sky"},

  {id:"usne",name:"Nebraska, the Cornhusker State",tone:"light",body:"busty",blurb:"Husker-red tailgate girl in a baseball cap with a steak, fields to the horizon.",
    pal:{primary:"red",secondary:"white",third:"yellow",accent:"white",extra:"green"},oname:"Husker tailgate",look:"sporty",
    h:["ponytail through a baseball cap","long","blonde","no bangs"],e:"blue",x:"deadpan",p:"holding a steak",imp:"a Cornhusker tailgate girl",
    items:{top:R("red crop top"),bottom:R("red pleated miniskirt"),headwear:R("red baseball cap"),legwear:R("white sneakers"),heldItem:R("steak")},
    must:"field, wheat field, blue sky"},

  {id:"usnv",name:"Nevada, the Silver State",tone:"light",body:"tall",blurb:"Las Vegas showgirl in a silver leotard with a feather boa and playing cards under the neon.",
    pal:{primary:"silver",secondary:"pink",third:"black",accent:"gold",extra:"white"},oname:"Las Vegas",look:"glam",
    h:["long wavy hair with feather hair ornament","long","platinum blonde","no bangs"],e:"grey",x:"seductive smile",p:"holding playing cards",imp:"a Las Vegas showgirl",
    items:{top:R("silver leotard"),shoulderPiece:R("pink feather boa"),headwear:R("feather hair ornament"),legwear:R("fishnet pantyhose, high heels"),heldItem:R("playing card")},
    must:"casino, neon lights, night"},

  {id:"usnh",name:"New Hampshire, the Granite State",tone:"light",body:"hg",blurb:"Free spirit in plaid and jeans, holding a maple leaf in the autumn mountains.",
    pal:{primary:"red",secondary:"orange",third:"grey",accent:"green",extra:"beige"},oname:"Live free",look:"casual",
    h:["long wavy hair","long","auburn","curtain bangs"],e:"green",x:"smile",p:"holding a maple leaf",imp:"a free-spirited mountain girl",
    items:{outerwear:R("open red plaid shirt"),top:R("white crop top"),bottom:R("jeans"),legwear:R("brown boots"),heldItem:R("maple leaf")},
    must:"autumn leaves, forest, mountain"},

  {id:"usnj",name:"New Jersey, the Garden State",tone:"olive",body:"busty",blurb:"Jersey Shore: big hair, deep tan, leopard print bikini and big hoop earrings.",
    pal:{primary:"leopard print",secondary:"black",third:"pink",accent:"gold",extra:"red"},oname:"Down the shore",look:"swimwear",
    h:["voluminous blowout hair","long","black","no bangs"],e:"brown",x:"smirk",p:"hand on own hip",imp:"a Jersey Shore party girl",m:"tan, tanlines",
    items:{top:R("leopard print bikini"),earAccessory:R("gold hoop earrings"),eyewear:R("sunglasses"),legwear:R("high heels")},
    must:"beach, pier, night"},

  {id:"usnm",name:"New Mexico, the Land of Enchantment",tone:"tan",body:"hg",blurb:"Yellow and red under the desert sun with a chili pepper, hot air balloons in the sky.",
    pal:{primary:"yellow",secondary:"red",third:"aqua",accent:"beige",extra:"blue"},oname:"Land of Enchantment",look:"resort",
    h:["long straight hair","very long","black","no bangs"],e:"brown",x:"gentle smile",p:"holding a chili pepper",imp:"an enchanting desert girl",
    items:{top:R("yellow bikini top"),bottom:R("red skirt"),neckAccessory:R("aqua gemstone necklace"),wristAccessory:R("silver bracelet"),legwear:R("sandals"),heldItem:R("chili pepper")},
    must:"desert, hot air balloon, sunset"},

  {id:"usny",name:"New York, the Empire State",tone:"light",body:"tall",blurb:"Liberty in a green toga with a crown and a raised torch above the skyline.",
    pal:{primary:"green",secondary:"yellow",third:"black",accent:"white",extra:"red"},oname:"Liberty",look:"glam",
    h:["long straight hair","very long","black","no bangs"],e:"green",x:"confident smile",p:"raising a torch",imp:"a big-city goddess",
    items:{top:R("green toga"),headwear:R("green crown"),legwear:R("black high heels"),wristAccessory:R("gold bracelet"),heldItem:R("torch")},
    must:"city, skyscraper, night"},

  {id:"usnc",name:"North Carolina, the Tar Heel State",tone:"light",body:"hg",blurb:"First-in-flight aviator girl in a bomber jacket and aviator cap with goggles, a biplane overhead.",
    pal:{primary:"light blue",secondary:"white",third:"brown",accent:"navy blue",extra:"red"},oname:"First in flight",look:"costume",
    h:["short wavy hair","short","brown","no bangs"],e:"hazel",x:"grin",p:"saluting",imp:"a daredevil aviator girl",
    items:{headwear:R("brown aviator cap, goggles on head"),outerwear:R("open brown bomber jacket"),top:R("light blue crop top"),bottom:R("brown shorts"),neckAccessory:R("white scarf"),legwear:R("brown boots")},
    must:"biplane, beach, blue sky"},

  {id:"usnd",name:"North Dakota, the Peace Garden State",tone:"fair",body:"hg",blurb:"Prairie girl in a hard hat and fur coat over a glossy black bikini, oil-shiny skin.",
    pal:{primary:"brown",secondary:"black",third:"yellow",accent:"orange",extra:"white"},oname:"Oil boom",look:"edgy",
    h:["long straight hair","long","platinum blonde","wispy see-through bangs"],e:"grey",x:"expressionless",p:"arms crossed",imp:"a quiet prairie girl",m:"shiny skin",
    items:{outerwear:R("open brown fur coat"),top:R("black latex bikini"),headwear:R("yellow hard hat"),legwear:R("black boots")},
    must:"field, snow, grey sky"},

  {id:"usoh",name:"Ohio, the Buckeye State",tone:"light",body:"hg",blurb:"An astronaut with her spacesuit around her waist and helmet in hand, Earth behind her. Always has been.",
    pal:{primary:"red",secondary:"grey",third:"white",accent:"brown",extra:"black"},oname:"Always has been",look:"costume",
    h:["long straight hair","long","brown","long side-swept bangs"],e:"brown",x:"creepy smile",p:"holding a space helmet",imp:"an astronaut girl",
    items:{outerwear:R("white spacesuit, clothes around waist"),top:R("red sports bra"),legwear:R("white boots"),heldItem:R("space helmet")},
    must:"space, earth (planet), stars"},

  {id:"usok",name:"Oklahoma, the Sooner State",tone:"light",body:"hg",blurb:"Diner waitress on roller skates with a milkshake, hair whipping in the prairie wind.",
    pal:{primary:"red",secondary:"white",third:"beige",accent:"silver",extra:"light blue"},oname:"Roadside diner",look:"sweet",
    h:["high ponytail with a red scarf","long","blonde","bangs"],e:"blue",x:"smile",p:"holding a milkshake",imp:"a roadside diner waitress",
    items:{top:R("red waitress dress"),waistAccessory:R("white apron"),legwear:R("roller skates"),headwear:R("red bandana"),heldItem:R("milkshake")},
    must:"diner, wind"},

  {id:"usor",name:"Oregon, the Beaver State",tone:"light",body:"hg",blurb:"Rainy-forest hipster in an open yellow raincoat and beanie with arm tattoos and an umbrella.",
    pal:{primary:"green",secondary:"grey",third:"yellow",accent:"brown",extra:"white"},oname:"Rainy forest",look:"street",
    h:["bob cut","short","green","blunt bangs"],e:"green",x:"smirk",p:"holding an umbrella",imp:"an artsy rainy-city hipster",m:"arm tattoo, nose piercing",
    items:{outerwear:R("open yellow raincoat"),top:R("white bikini top"),bottom:R("brown skirt"),headwear:R("green beanie"),legwear:R("brown boots"),heldItem:R("umbrella")},
    must:"rain, forest"},

  {id:"uspa",name:"Pennsylvania, the Keystone State",tone:"light",body:"hg",blurb:"Philly girl in a green jersey crop with bell earrings and a sandwich.",
    pal:{primary:"green",secondary:"silver",third:"black",accent:"white",extra:"brown"},oname:"Philly",look:"street",
    h:["high ponytail","long","brown","no bangs"],e:"brown",x:"grin",p:"eating a sandwich",imp:"a cocky Philly girl",
    items:{top:R("green jersey crop top"),bottom:R("black bike shorts"),legwear:R("white sneakers"),earAccessory:R("bell earrings"),heldItem:R("sandwich")},
    must:"city, street"},

  {id:"usri",name:"Rhode Island, the Ocean State",tone:"fair",body:"petite",blurb:"The littlest state as a sailor sweetheart: sailor collar, sailor hat and anchors, sailboats behind.",
    pal:{primary:"navy blue",secondary:"white",third:"gold",accent:"blue",extra:"yellow"},oname:"Ocean State sailor",look:"preppy",
    h:["twin tails","long","strawberry blonde","bangs"],e:"blue",x:"smile, one eye closed",p:"salute",imp:"a tiny sailor sweetheart",
    items:{top:R("sailor collar crop top"),bottom:R("white shorts"),headwear:R("sailor hat"),earAccessory:R("anchor earrings"),legwear:R("navy blue kneehighs")},
    must:"harbor, sailboat, ocean"},

  {id:"ussc",name:"South Carolina, the Palmetto State",tone:"tan",body:"hg",blurb:"Beach belle in a navy blue bikini with a crescent hair ornament under palms and a crescent moon.",
    pal:{primary:"navy blue",secondary:"white",third:"green",accent:"pink",extra:"red"},oname:"Palmetto beach",look:"swimwear",
    h:["long wavy hair","very long","brown","no bangs"],e:"brown",x:"smile",p:"holding a cup",imp:"a southern beach belle",
    items:{top:R("navy blue bikini"),headwear:R("crescent hair ornament"),wristAccessory:R("pink bracelet"),legwear:R("anklet, barefoot"),heldItem:R("cup")},
    must:"beach, palm tree, night, crescent moon"},

  {id:"ussd",name:"South Dakota, the Mount Rushmore State",tone:"light",body:"hg",blurb:"Biker babe in black leather and chaps with a bandana and a motorcycle.",
    pal:{primary:"black",secondary:"silver",third:"grey",accent:"light blue",extra:"gold"},oname:"Biker rally",look:"edgy",
    h:["long straight hair","very long","brown","no bangs"],e:"grey",x:"smirk",p:"leaning on a motorcycle",imp:"a biker babe",
    items:{top:R("black leather bikini"),bottom:R("chaps"),headwear:R("black bandana"),eyewear:R("sunglasses"),gloves:R("fingerless gloves"),legwear:R("black boots")},
    must:"motorcycle, mountain, road"},

  {id:"ustn",name:"Tennessee, the Volunteer State",tone:"fair",body:"big",blurb:"Country singer in a white cowboy hat, denim skirt and cowboy boots with an acoustic guitar on stage.",
    pal:{primary:"orange",secondary:"white",third:"blue",accent:"silver",extra:"brown"},oname:"Country stage",look:"glam",
    h:["big curly hair","long","platinum blonde","bangs"],e:"blue",x:"smile, open mouth",p:"playing guitar",imp:"a country music star",
    items:{top:R("orange crop top"),outerwear:R("white fringe trim jacket"),bottom:R("denim skirt"),headwear:R("white cowboy hat"),legwear:R("white cowboy boots"),heldItem:R("acoustic guitar")},
    must:"stage, spotlight"},

  {id:"ustx",name:"Texas, the Lone Star State",tone:"light",body:"big",blurb:"Everything's bigger: cowgirl in a star print bikini and cowboy hat with a lasso.",
    pal:{primary:"red",secondary:"white",third:"blue",accent:"silver",extra:"brown"},oname:"Rodeo",look:"costume",
    h:["long wavy hair","very long","blonde","no bangs"],e:"blue",x:"grin",p:"holding a lasso",imp:"a big rodeo cowgirl",
    items:{top:R("blue star print bikini top"),bottom:R("denim shorts"),belt:R("brown belt with a silver star buckle"),headwear:R("white cowboy hat"),legwear:R("red cowboy boots"),heldItem:R("lasso")},
    must:"desert, sunset"},

  {id:"usut",name:"Utah, the Beehive State",tone:"fair",body:"hg",blurb:"Beehive hairdo and a honeycomb bikini, honey in hand, red rocks behind. Wholesome, mostly.",
    pal:{primary:"yellow",secondary:"orange",third:"black",accent:"white",extra:"light blue"},oname:"Beehive",look:"sweet",
    h:["beehive hairdo","long","blonde","no bangs"],e:"blue",x:"innocent smile",p:"holding honey",imp:"a sweet, wholesome girl with a secret",
    items:{top:R("yellow honeycomb (pattern) bikini"),legwear:R("a pair of black and yellow striped thighhighs"),heldItem:R("honey")},
    must:"desert, red rocks, blue sky"},

  {id:"usvt",name:"Vermont, the Green Mountain State",tone:"fair",body:"busty",blurb:"Dairy girl in a cow print bikini under open flannel, mittens on, a milk bottle in hand.",
    pal:{primary:"green",secondary:"brown",third:"black",accent:"white",extra:"red"},oname:"Green Mountain dairy",look:"cottage",
    h:["long wavy hair","long","brown","curtain bangs"],e:"green",x:"smile, blush",p:"holding a milk bottle",imp:"a cozy dairy farm girl",
    items:{top:R("cow print bikini"),outerwear:R("open red plaid shirt"),gloves:R("mittens"),legwear:R("brown boots"),heldItem:R("milk bottle")},
    must:"farm, field, mountain"},

  {id:"usva",name:"Virginia, the Old Dominion",tone:"light",body:"hg",blurb:"For lovers: red heart print lingerie, heart-shaped sunglasses and a heart-shaped box.",
    pal:{primary:"red",secondary:"white",third:"pink",accent:"navy blue",extra:"gold"},oname:"For lovers",look:"boudoir",
    h:["long wavy hair","long","brown","long side-swept bangs"],e:"brown",x:"blush, kiss",p:"blowing a kiss",imp:"a lovestruck sweetheart",
    items:{bra:R("red heart print bra"),panties:R("red heart print panties"),eyewear:R("heart-shaped sunglasses"),headwear:R("white hair flower"),heldItem:R("heart-shaped box")},
    must:"hearts, pink background"},

  {id:"uswa",name:"Washington, the Evergreen State",tone:"light",body:"hg",blurb:"Grunge girl in the rain with plaid around her waist, combat boots and a coffee cup.",
    pal:{primary:"green",secondary:"grey",third:"red",accent:"brown",extra:"black"},oname:"Grunge in the rain",look:"street",
    h:["long straight wet hair","long","black","long side-swept bangs"],e:"grey",x:"half-closed eyes",p:"holding a coffee cup",imp:"a moody grunge girl",
    items:{top:R("black crop top"),waistAccessory:R("green plaid shirt, clothes around waist"),bottom:R("black skirt"),legwear:R("fishnets, combat boots"),heldItem:R("disposable coffee cup")},
    must:"rain, city, forest"},

  {id:"uswv",name:"West Virginia, the Mountain State",tone:"fair",body:"hg",blurb:"Mountain girl in a hard hat with a headlamp, overalls and a lantern on a country road.",
    pal:{primary:"black",secondary:"gold",third:"navy blue",accent:"white",extra:"red"},oname:"Country roads",look:"casual",
    h:["long straight hair","long","brown","wispy see-through bangs"],e:"blue",x:"gentle smile",p:"holding a lantern",imp:"a sweet mountain girl",m:"dirty face",
    items:{headwear:R("yellow hard hat, headlamp"),top:R("white tank top"),bottom:R("overalls"),legwear:R("boots"),heldItem:R("lantern")},
    must:"mountain, road, forest, night"},

  {id:"uswi",name:"Wisconsin, America's Dairyland",tone:"fair",body:"busty",blurb:"Green-and-gold tailgate girl with a wedge of cheese and a beer mug.",
    pal:{primary:"green",secondary:"yellow",third:"white",accent:"brown",extra:"red"},oname:"Tailgate",look:"sporty",
    h:["twin tails","long","blonde","bangs"],e:"blue",x:"smile, open mouth",p:"holding a beer mug",imp:"a cheerful Dairyland tailgate girl",
    items:{top:R("green jersey crop top"),bottom:R("yellow shorts"),legwear:R("white sneakers"),heldItem:R("beer mug, cheese")},
    must:"stadium, autumn"},

  {id:"uswy",name:"Wyoming, the Cowboy State",tone:"light",body:"tall",blurb:"Rodeo rider on horseback in a fringe vest and chaps, mountains behind.",
    pal:{primary:"brown",secondary:"light blue",third:"red",accent:"white",extra:"green"},oname:"Rodeo rider",look:"costume",
    h:["long braid","very long","brown","no bangs"],e:"brown",x:"grin, open mouth",p:"horseback riding",imp:"a rodeo cowgirl",
    items:{outerwear:R("brown fringe trim vest"),top:R("red bikini top"),bottom:R("chaps, denim shorts"),headwear:R("brown cowboy hat"),legwear:R("brown cowboy boots"),neckAccessory:R("red bandana")},
    must:"horse, mountain, blue sky"}
  ];
  const entries=S.map(mk);
  /* ---------- every value they use becomes a studio option ---------- */
  entries.forEach(e=>{
    Object.entries(e.c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@"&&Array.isArray(CHAR[f])&&CHAR[f].length)START.option(f,v,GROUP)});
    Object.entries(e.outfit.items).forEach(([f,a])=>START.item(f,a[0],"CUS",e.outfit.look))});
  START.add(GROUP,entries);
})();
