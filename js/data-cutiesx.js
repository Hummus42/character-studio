/* ---- v323: Cuties. Ten extremely cute outfits for every Academy girl (sailor, magical girl, sweet frills, neko,
   bunny pajamas, pop idol, strawberry maid, cloud angel, candy princess, pastel witch), defined once here as
   window.CUTIES so the wardrobe (data-cuties.js, a "Cuties" shelf) and the Scene Archive share them. The archive gets
   "Cuties, Ruined": ten matching single-image scenes where she is fucked silly by a muscular, dark-skinned faceless man in that same
   outfit, wrecked, messy and blissed out. Her outfit and its disheveled state live only in the scene's wardrobe (w1),
   never in the scene text; text is limited to sound effects. These are grown women in cute fashion: every look is
   marked adult, no school settings, no childlike tags. Consensual. Loads after data-publicsex.js and before part-13. ---- */
(function(){
  /* [key, set label, outfit name, items, expressions, poses, setting, tags (no clothing), theme] */
  window.CUTIES=[
    ["cusailor","Sailor Sweetheart","Sailor",{top:["{c} sailor-collar blouse with a big satin bow","@primary"],bottom:["{c} pleated skirt","@secondary"],legwear:["white thighhigh socks and {c} mary jane shoes","@primary"],headwear:["two {c} hair ribbons","@accent"]},
      ["bright, bubbly smile with a wink","shy, adoring smile, hands clasped","cheerful peace sign grin"],
      ["standing on her toes, hands clasped behind her back","giving a peace sign by her cheek, leaning forward","twirling with one foot kicked up"],
      "a sunny park by a duck pond in spring","cute, adorable, smile, peace sign, sparkles, cherry blossoms, park, sunlight, outdoors","a sailor sweetheart"],
    ["cumagical","Magical Girl","Magical girl",{top:["frilly {c} magical girl dress with puffy sleeves and a heart brooch","@primary"],gloves:["white ribbon-trimmed gloves","white"],legwear:["{c} knee-high boots with bows","@secondary"],headwear:["star-shaped hair clips","@accent"],heldItem:["heart-topped magical wand","@accent"]},
      ["determined, sparkly-eyed smile","cheerful wink","starry-eyed, beaming grin"],
      ["striking a magical pose, wand raised","leaping mid-air in a burst of sparkles","blowing a kiss over her wand"],
      "a starlit rooftop swirling with glowing hearts and sparkles","magical girl, cute, adorable, sparkles, glowing hearts, stars, night sky, rooftop, magic","a magical girl"],
    ["cufrills","Sweet Frills","Sweet frills",{top:["pastel {c} frilly dress with layered petticoats and lace trim","@primary"],headwear:["{c} lace bonnet with ribbon bows","@secondary"],legwear:["frilly white socks and {c} platform mary janes","@secondary"],heldItem:["lace parasol","white"]},
      ["sweet, doll-like smile","dainty giggle behind her hand","dreamy, rosy-cheeked look"],
      ["curtsying, holding out her skirts","sitting prettily at a tea table","twirling under her parasol"],
      "a rose garden set for an afternoon tea party","cute, adorable, tea party, teacup, cake, roses, garden, sunlight, outdoors","sweet frills"],
    ["cuneko","Neko Cutie","Neko",{top:["oversized {c} cat-ear hoodie","@primary"],bottom:["{c} ruffled shorts","@secondary"],gloves:["fluffy cat paw mittens","@third"],neckAccessory:["{c} ribbon choker with a jingle bell","@accent"],tailPiece:["fluffy cat tail attached at the lower back","@primary"]},
      ["playful, fang-tooth grin","sleepy cat-like smile","mischievous, purring look"],
      ["making paw gestures by her face","curled up on a cushion like a cat","stretching on all fours with a big yawn"],
      "a cozy room piled with cushions and sunbeams","cute, adorable, paw pose, fang, cat girl, cushions, sunbeam, indoors, smile","a neko cutie"],
    ["cubunny","Bunny Pajamas","Bunny pajamas",{top:["fluffy {c} bunny-ear hooded pajama onesie","@primary"],legwear:["fuzzy bunny slippers","white"],heldItem:["plush bunny","@third"]},
      ["sleepy, snuggly smile","yawning, eyes half-closed","giggling into her plushie"],
      ["hugging a plush bunny tight","sitting in bed with her knees drawn up","flopping onto a pile of pillows"],
      "a pastel bedroom full of plushies and fairy lights","cute, adorable, stuffed toy, fairy lights, pillows, bed, bedroom, indoors, sleepy, smile","bunny pajamas"],
    ["cuidol","Pop Idol","Idol",{top:["frilly {c} idol dress with a tiered skirt and heart sequins","@primary"],legwear:["white thighhigh socks and {c} heeled boots","@secondary"],headwear:["{c} star hair clip","@accent"],heldItem:["heart-shaped microphone","@accent"]},
      ["dazzling idol smile","winking with her tongue out","shining, joyful grin"],
      ["singing into the microphone, one hand reaching out","posing with a heart shape made with her hands","mid-dance spin"],
      "a small stage glowing with heart-shaped lights and confetti","idol, cute, adorable, singing, heart hands, stage, stage lights, confetti, sparkles","a pop idol"],
    ["cumaid","Strawberry Maid","Strawberry maid",{top:["pink {c} cafe maid dress with puff sleeves","@primary"],waistAccessory:["frilly strawberry-print apron","white"],headwear:["frilly maid headband with strawberry clips","white"],legwear:["white thighhigh socks and {c} mary janes","@secondary"],heldItem:["tray with a strawberry parfait","-"]},
      ["sugary, welcoming smile","cheerful wink","flustered, shy smile"],
      ["serving a parfait with a curtsy","making a heart with her hands over a dessert","leaning on the counter, chin in her hands"],
      "a pastel themed cafe full of strawberry desserts","cute, adorable, cafe, strawberry, parfait, heart hands, indoors, smile","a strawberry cafe maid"],
    ["cuangel","Cloud Angel","Angel",{top:["frilly white angel dress with gold trim","white"],headwear:["glowing golden halo","gold"],wingPiece:["small fluffy white feathered wings","white"],legwear:["white ribbon sandals","white"]},
      ["serene, angelic smile","soft, sleepy smile","bright, heavenly grin"],
      ["floating with her hands clasped","lying back on a cloud, kicking her feet","reaching down with an open hand"],
      "a soft dreamy sky of fluffy clouds and golden light","angel, cute, adorable, clouds, sky, light rays, feathers, sparkles, smile","a cloud angel"],
    ["cuprincess","Candy Princess","Candy princess",{top:["pastel {c} princess ballgown with candy-shaped jewels","@primary"],headwear:["sparkling candy tiara","@accent"],gloves:["white satin gloves","white"],heldItem:["giant swirl lollipop","@secondary"]},
      ["sweet, regal smile","giggling, licking her lollipop","proud, sparkly grin"],
      ["sitting on a throne, licking a lollipop","curtsying with her gown spread","skipping through the candy garden"],
      "a candy kingdom throne room of lollipops, frosting and gumdrops","cute, adorable, candy, lollipop, sweets, throne, sparkles, pastel colors, indoors","a candy princess"],
    ["cuwitch","Pastel Witch","Pastel witch",{top:["{c} frilly witch dress","@primary"],headwear:["oversized {c} witch hat with a star charm","@secondary"],outerwear:["short pastel cape","@third"],legwear:["striped thighhigh socks and {c} boots","@secondary"],heldItem:["little broom with a ribbon","@accent"]},
      ["cheeky, sparkly grin","clumsy, flustered smile","sleepy, dreamy smile"],
      ["riding a broom sidesaddle","stirring a bubbling cauldron of hearts","peeking out from under her hat brim with a wand"],
      "a cozy little witch's cottage with a bubbling cauldron of pink hearts","witch, cute, adorable, cauldron, potion, magic, sparkles, indoors, smile","a pastel witch"]];

  const X=window.ARCH_EXTRA;if(!X||!X.S)return;
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair, eyes and bodies, and on the contrast between her skin and his dark skin";
  const SILLY="fucked silly, ahegao, rolling eyes, tongue out, drooling, tears of pleasure, smeared makeup, heavy blush, heavy breathing, sweat";
  const AROUSE={"c1.blushStyle":"heavy aroused blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const MAN="faceless male, dark-skinned male, muscular male, interracial, large penis, veiny penis, erection";
  const RUIN="rough sex, fucked silly, ahegao, cum, excessive cum, cum overflow, cum on body, messy hair, tears, sweat, steam, motion lines, trembling, heart, spoken heart, mature female, adult";
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const W2='{"name":"Nude","f":{},"m":{}}';
  const SET=Object.fromEntries(window.CUTIES.map(e=>[e[0],e[6]]));
  /* key, name, her outfit as it ends up (wardrobe only), what happens, tags, her pose, sound, camera */
  const V=(key,name,f,body,tags,po,sfx,gm)=>{
    const sx=`Lewd sound effects reading "${sfx}" and little pink hearts burst around them.`;
    const ff={name,count:"1girl, 1boy, hetero, faceless male, interracial, dark-skinned male",w1:JSON.stringify({name,f,m:{}}),w2:W2,act:tags.split(",").slice(0,4).map(s=>s.trim()).join(", "),
      scene:`In ${SET[key]}, ${body} ${sx} `+uniq(["1girl, 1boy, hetero",tags,MAN,RUIN,"sound effects"].join(", ")),
      "c1.expression":SILLY,"c1.posture":po,"c1.age":"woman",
      "texts.0.k":"sfx","texts.0.st":"lewd","texts.0.who":"","texts.0.t":sfx,"texts.0.s":sx};
    return{f:Object.assign(ff,AROUSE),r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:gm||"far",must:MUST,"texts.n":1,
      txTags:["sound effects"]},fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  X.S.push({s:"Academy Cuties, Ruined",v:[
    V("cusailor","Sailor Sweetheart, ruined",{top:["{c} sailor-collar blouse pushed up over her breasts, its satin bow undone","@primary"],bottom:["{c} pleated skirt flipped up around her waist","@secondary"],legwear:["white thighhigh socks, one slipping down","white"],headwear:["two {c} hair ribbons, one coming loose","@accent"]},
      "a muscular, dark-skinned faceless man pins the woman in a deep mating press on a picnic blanket, her legs folded back over his shoulders as he pounds down into her, cum gushing out around him while she clings to his arms, utterly fucked silly.",
      "mating press, legs up, on back, deep penetration, cum in pussy, cum overflow, picnic blanket","folded in a mating press, legs over his shoulders","pan pan pan ♡","far"),
    V("cumagical","Magical Girl, ruined",{top:["frilly {c} magical girl dress torn open down the front, heart brooch dangling","@primary"],gloves:["white ribbon-trimmed gloves","white"],legwear:["{c} knee-high boots with bows","@secondary"],headwear:["star-shaped hair clips","@accent"]},
      "a muscular, dark-skinned faceless man holds the woman up in a full nelson in the glittering air, her legs spread wide as he thrusts up into her, her dropped wand sparkling on the rooftop below, cum dripping from her in strings.",
      "full nelson, spread legs, held up, sex from behind, vaginal, cum drip, sparkles, dropped wand","held up in a full nelson, legs spread","nyuu... ♡ sparkle pan pan","far"),
    V("cufrills","Sweet Frills, ruined",{top:["pastel {c} frilly dress with its layered petticoats flipped up over her back","@primary"],headwear:["{c} lace bonnet knocked askew","@secondary"],legwear:["frilly white socks and {c} platform mary janes","@secondary"]},
      "the woman is bent over the tea table, teacups toppled and cake smeared, while a muscular, dark-skinned faceless man takes her hard from behind, gripping her hips and slamming into her until her knees buckle.",
      "bent over table, sex from behind, doggystyle, standing sex, vaginal, ass grab, spilled tea, cake, knees together feet apart","bent over the tea table, knees buckling","clink clink pan pan ♡","far"),
    V("cuneko","Neko Cutie, ruined",{top:["oversized {c} cat-ear hoodie shoved up to her armpits","@primary"],bottom:["{c} ruffled shorts pulled down around one ankle","@secondary"],gloves:["fluffy cat paw mittens","@third"],neckAccessory:["{c} ribbon choker with a jingle bell","@accent"],tailPiece:["fluffy cat tail attached at the lower back","@primary"]},
      "the woman is face down and ass up in the cushions while a muscular, dark-skinned faceless man fucks her hard from behind, holding her by the hips, her paw mittens kneading the cushions and her tongue lolling out.",
      "top-down bottom-up, doggystyle, sex from behind, face down, vaginal, cushions, paw pose, cat girl","face down, ass up in the cushions","nya ♡ nya ♡ pan pan","far"),
    V("cubunny","Bunny Pajamas, ruined",{top:["fluffy {c} bunny-ear hooded pajama onesie unbuttoned and peeled down to her knees","@primary"],legwear:["fuzzy bunny slippers","white"]},
      "the woman is flattened face down among the plushies in a prone bone while a muscular, dark-skinned faceless man pounds her into the mattress, hugging a plush bunny tight, sweat and cum soaking the sheets.",
      "prone bone, lying on stomach, sex from behind, vaginal, stuffed toy, hugging object, bed, wet sheets","flattened face down, hugging a plushie","pan pan pan ♡ squish","far"),
    V("cuidol","Pop Idol, ruined",{top:["frilly {c} idol dress yanked down off her breasts, tiered skirt hiked up","@primary"],legwear:["white thighhigh socks and {c} heeled boots","@secondary"],headwear:["{c} star hair clip","@accent"]},
      "on the empty stage, a muscular, dark-skinned faceless man holds one of the woman's legs straight up in a standing split while he fucks her, the dropped heart microphone on the floor catching every moan under the heart lights.",
      "standing split, leg up, standing sex, vaginal, stage, stage lights, dropped microphone, heart","standing split, one leg held high","♡ ah ♡ ah ♡ pan pan","far"),
    V("cumaid","Strawberry Maid, ruined",{top:["pink {c} cafe maid dress unbuttoned to the waist","@primary"],waistAccessory:["frilly strawberry-print apron pushed aside","white"],headwear:["frilly maid headband with strawberry clips, crooked","white"],legwear:["white thighhigh socks and {c} mary janes","@secondary"]},
      "the woman lies back on the cafe counter in the spilled parfait, legs hooked high over a muscular, dark-skinned faceless man's shoulders as he pounds into her, whipped cream and cum smeared across her thighs.",
      "missionary, legs on shoulders, on table, vaginal, cream, whipped cream, food on body, cum on thighs, strawberry","lying back on the counter, legs on his shoulders","squelch squelch ♡","pov"),
    V("cuangel","Cloud Angel, ruined",{top:["frilly white angel dress slipped down to her waist and hiked up over her hips","white"],headwear:["glowing golden halo tilted askew","gold"],wingPiece:["small fluffy white feathered wings, ruffled","white"]},
      "the woman bounces wildly on a muscular, dark-skinned faceless man lying on a soft cloud, riding him cowgirl with her wings fluttering and stray feathers drifting, cum leaking down his shaft each time she drops.",
      "cowgirl position, girl on top, straddling, bouncing breasts, vaginal, clouds, feathers, cum drip","riding him, arching back","pa pa pa ♡ flutter","pov"),
    V("cuprincess","Candy Princess, ruined",{top:["pastel {c} princess ballgown pulled down off her breasts, skirts bunched up to her waist","@primary"],headwear:["sparkling candy tiara knocked crooked","@accent"],gloves:["white satin gloves","white"]},
      "the woman sits reverse cowgirl on a muscular, dark-skinned faceless man on the candy throne, legs spread wide as he holds her by the thighs and bounces her on him, candy scattered and a lollipop stuck to her cheek.",
      "reverse cowgirl position, spread legs, sitting on lap, throne, vaginal, candy, lollipop, cum overflow","reverse cowgirl on the throne, legs spread wide","boing ♡ pan pan","far"),
    V("cuwitch","Pastel Witch, ruined",{top:["{c} frilly witch dress pulled down and bunched at her waist","@primary"],headwear:["oversized {c} witch hat fallen half off her head","@secondary"],legwear:["striped thighhigh socks and {c} boots","@secondary"]},
      "the woman lies sprawled across the potion table, spent and glassy-eyed, as a muscular, dark-skinned faceless man pulls out and finishes over her, cum painting her belly, breasts and face while the cauldron bubbles pink hearts behind them.",
      "after sex, ejaculation, cum on body, cum on face, cum on breasts, bukkake, lying on table, spread legs, cumdrip, cauldron, potion","sprawled on her back across the table","splurt ♡ bubble bubble","pov")]});
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="Cuties"))ACAD.RX_CATS.push(["Cuties",["Cuties, Ruined"]])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
