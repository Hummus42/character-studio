/* ---- v322: lighter days. Ten more Everyday life looks (cute, airy, everyday) and ten more Everyday, revealing looks
   (playful and showing off, but clothed), for every Academy girl. All clothing is in the Outfit tab, in her own palette;
   the notes, settings, poses and expressions carry no clothing words, only what she is doing and where. The wardrobe
   (data-wardrobe.js) files them on the Everyday life and Everyday, revealing shelves. All adults. Loads after
   data-casual.js and before data-wardrobe.js. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof tplById!=="function")return;
  const H=(ACAD.HOUSES||[]).slice();
  const must=set=>`an anime style with high detail, ${set}, and particular emphasis on highly detailed skin, hair and eyes`;
  /* [key, set label, outfit name, items, expressions, poses, setting, tags (no clothing), theme] */
  const LIFE=[
    ["dlpicnic","Meadow Picnic","Picnic dress",{top:["{c} gingham puff-sleeve sundress","@primary"],headwear:["wide straw sun hat with a {c} ribbon","@secondary"],legwear:["white canvas sneakers","white"]},
      ["sunny, carefree smile","laughing with her eyes closed","sweet, dreamy look"],
      ["sitting on a picnic blanket, legs tucked to one side","lying on her back in the grass, arms spread","kneeling on the blanket, offering a strawberry"],
      "a sunny wildflower meadow with a picnic blanket and a wicker basket","picnic, picnic basket, strawberry, flower field, sunlight, outdoors, smile","a meadow picnic"],
    ["dlraincafe","Rainy Day Cafe","Cozy knit",{top:["oversized cream cable-knit sweater","@third"],bottom:["{c} plaid pleated skirt","@primary"],legwear:["opaque tights and ankle boots","@secondary"]},
      ["soft, content smile","peaceful, eyes half-closed","shy smile over her cup"],
      ["sitting by the cafe window, both hands around a warm mug","resting her chin on her hand, watching the rain","curled in an armchair with a book"],
      "a cozy cafe on a rainy afternoon, rain streaking the window","cafe, rain, window, mug, steam, indoors, cozy, smile","a rainy day at the cafe"],
    ["dlmarket","Farmers' Market","Market day",{top:["loose {c} linen blouse with rolled sleeves","@primary"],bottom:["high-waisted light-wash jeans","light blue"],legwear:["white sneakers","white"],heldItem:["woven tote bag full of fruit and flowers","-"]},
      ["bright, chatty smile","curious, delighted look","cheerful grin"],
      ["picking out peaches at a stall","walking with a bouquet in one arm","sampling honey from a little spoon"],
      "a sunny open-air farmers' market with fruit stalls and flower buckets","market stall, fruit, flower, bouquet, outdoors, sunlight, smile","a farmers' market morning"],
    ["dlbookshop","Bookshop Afternoon","Bookish",{top:["{c} cardigan over a white collared blouse","@primary"],bottom:["long pleated midi skirt","@secondary"],eyewear:["round reading glasses","-"],legwear:["brown loafers","brown"]},
      ["absorbed, gentle smile","surprised, delighted look at a page","quiet, thoughtful look"],
      ["reaching for a book on a high shelf","sitting on a step stool, reading","hugging a stack of books to her chest"],
      "a cozy secondhand bookshop with towering shelves and warm lamps","bookshelf, book, reading, library, indoors, warm lighting, smile","a bookshop afternoon"],
    ["dlbicycle","Bicycle Ride","Bike ride",{top:["{c} and white striped boat-neck tee","@primary"],bottom:["cropped wide-leg trousers","@secondary"],headwear:["{c} silk headscarf","@accent"],legwear:["canvas slip-on sneakers","white"]},
      ["windswept, joyful grin","laughing, hair flying","bright, happy smile"],
      ["riding a bicycle with a flower basket, hair blowing","standing beside her bicycle, one foot on the pedal","coasting downhill, legs out"],
      "a quiet country lane lined with sunflowers","bicycle, bicycle basket, sunflower, country road, riding, wind, outdoors, smile","a bicycle ride"],
    ["dlcatcafe","Kitten Cafe","Cat cafe",{top:["{c} oversized hoodie","@primary"],bottom:["denim skirt","@secondary"],legwear:["knee socks and sneakers","white"]},
      ["melting, adoring smile","giggling, cheek squished by a kitten","soft, cooing look"],
      ["sitting on the floor with kittens climbing on her","holding a kitten up to her face","lying on her stomach dangling a feather toy"],
      "a bright cat cafe full of cushions and sleepy kittens","cat, kitten, holding cat, cat cafe, indoors, cushions, smile","a visit to the cat cafe"],
    ["dlflowers","Flower Shop","Florist",{top:["{c} puff-sleeve blouse","@third"],bottom:["{c} linen pinafore dress","@primary"],legwear:["mary jane shoes","@secondary"]},
      ["warm, gentle smile","nose buried in a bloom, eyes closed","proud little smile"],
      ["arranging a bouquet at the counter","carrying a bucket of tulips","smelling a bunch of roses"],
      "a sunlit flower shop overflowing with buckets of blooms","flower, bouquet, tulip, rose, flower shop, indoors, sunlight, smile","the flower shop"],
    ["dlseaside","Seaside Stroll","Seaside",{top:["breezy {c} cotton maxi dress","@primary"],outerwear:["light knit cardigan","@third"],legwear:["leather sandals","brown"]},
      ["peaceful, wind-kissed smile","laughing as the wind catches her hair","soft, wistful look out to sea"],
      ["walking along the shore, waves at her feet","holding her hair back in the breeze","sitting on a sea wall, legs swinging"],
      "a breezy seaside promenade at golden hour","beach, ocean, seashore, wind, golden hour, outdoors, smile","a seaside stroll"],
    ["dlsnowday","Snow Day","Snow day",{outerwear:["puffy {c} winter coat","@primary"],neckAccessory:["chunky knit scarf","@secondary"],headwear:["pom-pom beanie","@secondary"],gloves:["fluffy mittens","@third"],legwear:["snow boots","brown"]},
      ["rosy-cheeked, gleeful grin","laughing, snowflakes in her lashes","mischievous smile"],
      ["packing a snowball","lying in the snow making a snow angel","catching snowflakes on her tongue"],
      "a snowy park on a bright winter morning","snow, snowing, snowball, snow angel, winter, outdoors, smile","a snow day"],
    ["dlstarlight","Stargazing Night","Stargazing",{top:["oversized {c} hoodie","@primary"],bottom:["soft lounge shorts","@secondary"],legwear:["fuzzy socks","@third"]},
      ["awed, starry-eyed look","sleepy, content smile","soft, wondering smile"],
      ["lying on a blanket pointing at the stars","wrapped in a blanket, sipping cocoa","sitting with her knees hugged to her chest, looking up"],
      "a hilltop at night under a sky full of stars and a blanket on the grass","starry sky, night sky, stars, blanket, mug, outdoors, night, smile","a night of stargazing"]];
  const REV=[
    ["rvboardwalk","Boardwalk Day","Boardwalk",{bra:["{c} triangle string bikini top","@primary"],bottom:["sheer {c} sarong tied low on her hips","@secondary"],eyewear:["heart-shaped sunglasses","@accent"],legwear:["flip-flops","@secondary"]},
      ["sunny, flirty smile","playful wink over her sunglasses","laughing with ice cream on her lip"],
      ["leaning on the boardwalk railing, hip cocked","walking with an ice cream cone","sitting on the railing, legs crossed"],
      "a sunny beach boardwalk with the sea sparkling behind","boardwalk, beach, ocean, ice cream, summer, outdoors, sunlight","a day on the boardwalk"],
    ["rvtennis","Tennis Whites","Tennis",{top:["cropped {c} polo shirt, top buttons open","@third"],bottom:["{c} pleated tennis micro skirt","@primary"],legwear:["ankle socks and white tennis shoes","white"],headwear:["{c} visor","@primary"]},
      ["confident, sporty grin","breathless, flushed laugh","playful smirk"],
      ["mid-serve, arching her back","bending down to pick up a ball","resting a racket on her shoulder"],
      "a sunny tennis court","tennis, tennis racket, tennis ball, tennis court, sweat, outdoors, sunlight","a game of tennis"],
    ["rvfestival","Festival Day","Festival",{bra:["{c} crochet bralette","@primary"],bottom:["frayed denim cutoff shorts","light blue"],headwear:["flower crown","@secondary"],legwear:["suede ankle boots","brown"]},
      ["blissed-out, dancing smile","laughing, arms in the air","dreamy, sun-drunk look"],
      ["dancing with her arms up","sitting on someone's shoulders in the sunlight","twirling in the grass"],
      "a sunny music festival field with flags and string lights","music festival, dancing, sunlight, outdoors, glitter, smile","a summer festival"],
    ["rvlaundry","Laundry Day","Laundry day",{top:["cropped ribbed {c} tank top","@primary"],panties:["{c} cotton boyshorts","@secondary"],legwear:["mismatched fuzzy socks","@third"]},
      ["sleepy, lazy smile","caught-off-guard blush","yawning, stretching"],
      ["folding laundry on the bed","stretching up to hang the washing","sitting on the washing machine, legs swinging"],
      "a sunny little laundry room","laundry, laundry basket, stretching, indoors, sunlight, sleepy","laundry day"],
    ["rvpool","Pool Party","Pool party",{top:["{c} high-cut one-piece swimsuit with side cutouts and a plunging back","@primary"],eyewear:["oversized sunglasses","@secondary"]},
      ["glamorous, sun-soaked smile","laughing as she's splashed","sultry look over her sunglasses"],
      ["lounging on a pool float","sitting on the pool edge, feet in the water","climbing out of the pool, water streaming"],
      "a sparkling pool at a sunny afternoon party","pool, poolside, pool float, water, wet, summer, outdoors, sunlight","a pool party"],
    ["rvbrunch","Backless Brunch","Brunch",{top:["backless {c} halter top","@primary"],bottom:["{c} satin mini skirt","@secondary"],legwear:["strappy heeled sandals","@secondary"]},
      ["charming, bubbly smile","laughing over a mimosa","sly, flirty glance back"],
      ["sitting at a brunch table, legs crossed","looking back over her bare shoulder","raising a mimosa in a toast"],
      "a sunny garden brunch terrace","brunch, champagne flute, terrace, garden, outdoors, sunlight, smile","a backless brunch"],
    ["rvjog","Morning Jog","Jogging",{bra:["{c} sports bra","@primary"],bottom:["tiny {c} running shorts","@secondary"],legwear:["running shoes","white"],wristAccessory:["fitness tracker","black"]},
      ["glowing, breathless smile","determined, flushed look","cheerful wave"],
      ["jogging along the path, ponytail swinging","stretching a leg on a park bench","pausing to catch her breath, hands on her knees"],
      "a leafy park path in the early morning","jogging, running, sweat, park, morning, outdoors, ponytail","a morning jog"],
    ["rvromper","Summer Romper","Romper",{top:["low-cut {c} floral romper with a tie front","@primary"],legwear:["espadrille sandals","@secondary"]},
      ["sweet, sunny smile","flirty, head-tilted look","giggling, covering her mouth"],
      ["twirling on the sidewalk","leaning against a sunny wall, one knee bent","sitting on a bench licking a popsicle"],
      "a sunny little street lined with cafes","popsicle, summer, street, sunlight, outdoors, smile","a summer romper"],
    ["rvslitdress","Thigh-High Slit","Slit dress",{top:["{c} satin wrap dress with a thigh-high slit","@primary"],legwear:["strappy heels","@secondary"]},
      ["confident, sultry smile","teasing, over-the-shoulder look","soft, glowing smile"],
      ["stepping forward, one long leg first","leaning on a balcony rail","sitting on a stool, legs crossed high"],
      "a warm evening balcony overlooking city lights","balcony, city lights, evening, outdoors, crossed legs, smile","a thigh-high slit"],
    ["rvcozycrop","Cozy Crop","Cozy crop",{top:["cropped {c} knit sweater","@primary"],bottom:["low-rise {c} sweatpants","@secondary"],legwear:["fuzzy slippers","@third"]},
      ["sleepy, cozy smile","playful, stretching yawn","soft, content look"],
      ["stretching her arms up by the window","curled on the sofa with a mug","standing in the kitchen, hip against the counter"],
      "a sunny apartment on a lazy morning","mug, sofa, window, morning, sunlight, indoors, stretching","a cozy crop top morning"]];
  const ALL=[[LIFE,"everyday","Academy Morning After"],[REV,"revealing","Academy Pasties and Leather"]];
  ACAD.EVERYDAY2={life:[],revealing:[]};
  ALL.forEach(([L,kind,after0])=>{let after=after0;
    L.forEach(([suf,name,oname,items,ex,po,set,tags,theme])=>{
      const label="Academy "+name;
      ACAD.set(label,after,suf,theme.replace(/^an? /,""),"casual",{tags:["everyday",kind].concat(tags.split(",").slice(0,3).map(s=>s.trim())),oname,c:{age:"woman"}},
        H.map((h,i)=>[h,items,ex[i%ex.length],po[i%po.length],theme,{}]));
      after=label;ACAD.EVERYDAY2[kind==="everyday"?"life":"revealing"].push(label);
      H.forEach(h=>{const t=tplById(h+suf);if(!t)return;t.out=Object.assign({},t.out,{must:must(set),notes:tags})})})});
})();
