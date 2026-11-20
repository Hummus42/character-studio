/* ---- v341: Couch Stars. Ten original adult girls (studio starting points, not the Academy), each built around a body type
   the studio was short of, the kinds common in adult film: skinny petite, petite with a huge butt, toned, tall and leggy,
   natural and heavy-chested, enhanced bombshell, thick, soft and plump, shortstack, and mature curvy. Faces, hair, names and
   outfits are original; none is a likeness of a real person. No poses, props or backgrounds, so they drop into any scene.
   Each body is also a studio body preset ("Couch: ..."), for future Academy girls. Body wording leads with Danbooru tags
   that have real post counts (checked 2026-11-20: skinny 12k, petite 34k, huge ass 39k, thick thighs 167k, wide hips 61k,
   plump 46k, shortstack 6.9k, tall female 6.6k, sagging breasts 10.6k, gigantic breasts 17k, toned 63k, thigh gap 99k).
   Every value they use is registered as a studio option (group "Couch Stars"), so none loads as a custom value. ---- */
(function(){
  if(typeof START==="undefined"||typeof CHAR==="undefined"||typeof OUTFIT==="undefined"||typeof BODY_PRESETS==="undefined")return;
  const GROUP="Couch Stars";
  /* ---------- ten body presets ---------- */
  const P={
    couchSkinny:{label:"Couch: skinny petite",blurb:"Skinny and petite: small breasts, narrow hips, thigh gap.",v:{
      heightStature:"petite, short stature",bustSize:"small breasts",bustShape:"small, perky breasts",bustWeight:"minimal weight",shoulderShape:"narrow shoulders",
      torsoShape:"slim, narrow torso",armShape:"thin arms",waistShape:"narrow waist",stomachShape:"flat stomach",hipShape:"slim hips",buttSize:"small, round butt",
      thighBuild:"slender thighs with a thigh gap",legShape:"slender legs",bodySoftness:"skinny, petite figure"}},
    couchPetiteBooty:{label:"Couch: petite with a huge butt",blurb:"Petite and small-chested on top, with wide hips, a huge butt and thick thighs.",v:{
      heightStature:"petite, short stature",bustSize:"small breasts",bustShape:"small, perky breasts",bustWeight:"light weight",shoulderShape:"narrow shoulders",
      torsoShape:"slim upper torso",armShape:"slender arms",waistShape:"narrow waist",stomachShape:"flat stomach",hipShape:"wide hips",buttSize:"huge ass, big round butt",
      thighBuild:"thick thighs",legShape:"shapely legs",bodySoftness:"petite, bottom-heavy figure"}},
    couchToned:{label:"Couch: toned",blurb:"Toned and fit, firm medium breasts, a tight waist and toned legs.",v:{
      heightStature:"average height",bustSize:"medium breasts",bustShape:"firm, perky breasts",bustWeight:"moderate fullness",shoulderShape:"toned shoulders",
      torsoShape:"toned torso",armShape:"toned arms",waistShape:"tight, narrow waist",stomachShape:"toned, flat stomach",hipShape:"curvy hips",buttSize:"firm, round butt",
      thighBuild:"toned thighs",legShape:"long, toned legs",bodySoftness:"toned female, fit figure"}},
    couchTall:{label:"Couch: tall and leggy",blurb:"Tall and slim, with very long legs, a thigh gap and medium breasts.",v:{
      heightStature:"tall female, tall stature",bustSize:"medium breasts",bustShape:"perky breasts",bustWeight:"moderate fullness",shoulderShape:"slim shoulders",
      torsoShape:"long, slender torso",armShape:"long, slender arms",waistShape:"narrow waist",stomachShape:"flat stomach",hipShape:"slim hips",buttSize:"small, firm butt",
      thighBuild:"slender thighs with a thigh gap",legShape:"very long legs",bodySoftness:"tall, slim model figure"}},
    couchNatural:{label:"Couch: natural and heavy",blurb:"Huge, soft, natural breasts that hang heavy, on a slim waist and curvy hips.",v:{
      heightStature:"average height",bustSize:"huge breasts",bustShape:"soft, natural, teardrop-shaped sagging breasts",bustWeight:"heavy, soft natural weight",shoulderShape:"soft shoulders",
      torsoShape:"curvy torso",armShape:"slender arms",waistShape:"slim waist",stomachShape:"flat, soft stomach",hipShape:"curvy hips",buttSize:"round butt",
      thighBuild:"soft thighs",legShape:"shapely legs",bodySoftness:"curvy, top-heavy natural figure"}},
    couchBombshell:{label:"Couch: enhanced bombshell",blurb:"Gigantic, round, high-set breasts, a tiny waist, wide hips and a huge butt.",v:{
      heightStature:"average height",bustSize:"gigantic breasts",bustShape:"round, high, firm breasts",bustWeight:"heavy, firm fullness",shoulderShape:"slim shoulders",
      torsoShape:"slim torso",armShape:"slender arms",waistShape:"tiny, narrow waist",stomachShape:"flat stomach",hipShape:"wide hips",buttSize:"huge ass, big round butt",
      thighBuild:"thick thighs",legShape:"long, shapely legs",bodySoftness:"exaggerated bombshell hourglass figure"}},
    couchThick:{label:"Couch: thick",blurb:"Thick all over: large breasts, wide hips, a huge butt, thick thighs and a soft stomach.",v:{
      heightStature:"average height",bustSize:"large breasts",bustShape:"full, round breasts",bustWeight:"heavy fullness",shoulderShape:"soft, rounded shoulders",
      torsoShape:"thick, curvy torso",armShape:"soft arms",waistShape:"defined waist",stomachShape:"soft stomach",hipShape:"wide hips",buttSize:"huge ass, big round butt",
      thighBuild:"thick thighs",legShape:"thick legs",bodySoftness:"curvy, thick figure"}},
    couchPlump:{label:"Couch: soft and plump",blurb:"Plump and soft: huge breasts, a soft round belly, wide hips and thick thighs.",v:{
      heightStature:"average height",bustSize:"huge breasts",bustShape:"soft, heavy, natural breasts",bustWeight:"heavy, soft weight",shoulderShape:"soft, rounded shoulders",
      torsoShape:"plump torso",armShape:"soft, plump arms",waistShape:"soft waist",stomachShape:"soft, round belly",hipShape:"wide hips",buttSize:"big, soft butt",
      thighBuild:"thick, soft thighs",legShape:"soft legs",bodySoftness:"plump, soft figure"}},
    couchShortstack:{label:"Couch: shortstack",blurb:"Very short and stacked: huge breasts, wide hips and thick thighs on a small frame.",v:{
      heightStature:"shortstack, very short stature",bustSize:"huge breasts",bustShape:"round, full breasts",bustWeight:"heavy fullness",shoulderShape:"small shoulders",
      torsoShape:"short, curvy torso",armShape:"small arms",waistShape:"narrow waist",stomachShape:"flat, soft stomach",hipShape:"wide hips",buttSize:"big, round butt",
      thighBuild:"thick thighs",legShape:"short, thick legs",bodySoftness:"shortstack figure"}},
    couchMature:{label:"Couch: mature curvy",blurb:"A grown woman's curves: large, heavy breasts, wide hips, full thighs and a softly rounded stomach.",v:{
      heightStature:"average height",bustSize:"large breasts",bustShape:"full, heavy, natural breasts",bustWeight:"heavy natural weight",shoulderShape:"soft shoulders",
      torsoShape:"full, curvy torso",armShape:"soft arms",waistShape:"defined waist",stomachShape:"softly rounded stomach",hipShape:"wide hips",buttSize:"full, round butt",
      thighBuild:"full thighs",legShape:"shapely legs",bodySoftness:"mature, curvy hourglass figure"}}};
  Object.entries(P).forEach(([k,p])=>{if(!BODY_PRESETS[k])BODY_PRESETS[k]=Object.assign({adultOnly:true},p)});

  /* ---------- shared face and makeup; each girl sets her own look ---------- */
  const FACE={age:"young woman",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"bright, intricately detailed irises",
    browShape:"soft, natural brows",noseShape:"small button nose",lashNatural:"long, thick eyelashes",skinFinish:"smooth, glowing skin",
    nailStyle:"long almond fingernails",lashStyle:"long defined lashes",faceAccents:"soft cheekbone highlight",handShape:"slender, graceful hands",
    nippleType:"soft and rounded",nippleLength:"medium-length",areolaSize:"medium-sized",areolaType:"smooth",vaginaType:"plump with soft outer lips",
    pubicHair:"a neatly trimmed patch of pubic hair",undertone:"warm",hairMovement:"falls smoothly"};
  const TONE={fair:["rosy pink","soft pink","pink"],light:["soft pink","light pink","pink"],tan:["caramel brown","light brown","rosy brown"],
    olive:["light brown","rosy brown","dusky rose"],brown:["dark brown","deep brown","rosy brown"],deep:["dark brown","deep brown","deep rose-brown"]};
  const R=v=>[v,"-"];
  const mk=s=>{const tn=TONE[s.tone];
    const c=Object.assign({},FACE,P[s.body].v,{nippleColor:tn[0],areolaColor:tn[1],vaginaColor:tn[2]},s.c);
    return{id:s.id,name:s.name,blurb:s.blurb,pal:s.pal,c,drop:["posture"],outfit:{oname:s.oname,look:s.look,items:s.items,details:{},dcol:{}},
      out:{must:""},nude:true,tags:["couch stars"]}};

  const S=[
  {id:"cs_pixie",name:"Pixie",tone:"fair",body:"couchSkinny",blurb:"Skinny and petite, a pale, sultry woman with a sleek black bob and red lips, in an oversized hoodie and thigh-high socks.",
    pal:{primary:"grey",secondary:"white",third:"black",accent:"pink",extra:"pale blue"},oname:"Oversized hoodie",look:"casual",
    /* reads clearly as a grown woman: an adult face, glam makeup and a confident look on the skinny, petite body */
    c:{heightStature:"short stature",faceShape:"slender oval face",mouthShape:"full lips",eyeShape:"almond-shaped eyes with long lashes",eyeOne:"grey",expression:"confident smirk",impression:"a slim, sultry grown woman",
      hairStyle:"sleek bob cut",hairLength:"chin-length",hairTexture:"sleek, silky and straight",bangs:"long side-swept bangs",hairBase:"black",skinTone:"pale",
      faceMark:"freckles across her nose",makeupStyle:"glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"soft contour",lipFinish:"red lips"},
    items:{top:R("oversized grey hoodie"),panties:R("white panties"),legwear:R("white thighhighs")}},
  {id:"cs_peaches",name:"Peaches",tone:"tan",body:"couchPetiteBooty",blurb:"Petite on top with a huge butt and thick thighs, long dark curls, in tight leggings and a sports bra.",
    pal:{primary:"black",secondary:"pink",third:"white",accent:"gold",extra:"peach"},oname:"Gym leggings",look:"sporty",
    c:{faceShape:"oval face with high cheekbones",mouthShape:"full, pouty lips",eyeShape:"almond-shaped eyes with long lashes",eyeOne:"brown",expression:"seductive smile",impression:"a sultry grown woman with a huge butt",
      hairStyle:"long curly hair in a high ponytail",hairLength:"long",hairTexture:"glossy defined curls",bangs:"no bangs",hairBase:"dark brown",skinTone:"tan",
      makeupStyle:"glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"bronzed contour",lipFinish:"glossy nude lips"},
    items:{top:R("pink sports bra"),bottom:R("tight black leggings"),earAccessory:R("small gold hoop earrings")}},
  {id:"cs_sloane",name:"Sloane",tone:"tan",body:"couchToned",blurb:"Toned and fit, a sun-tanned blonde with a high ponytail, in a white crop top and tiny shorts.",
    pal:{primary:"white",secondary:"light blue",third:"grey",accent:"gold",extra:"black"},oname:"Crop top and shorts",look:"sporty",
    c:{faceShape:"oval face",mouthShape:"soft, full lips",eyeShape:"almond-shaped eyes",eyeOne:"blue",expression:"confident smile",impression:"a fit, sun-kissed blonde",
      hairStyle:"sleek high ponytail",hairLength:"long",hairTexture:"sleek, silky and straight",bangs:"no bangs",hairBase:"blonde",skinTone:"tan",bodyMarkings:"tanlines",
      makeupStyle:"natural makeup",eyelinerStyle:"thin eyeliner",blushStyle:"sun-kissed blush",lipFinish:"glossy lips"},
    items:{top:R("white crop top"),bottom:R("light blue short shorts"),legwear:R("white sneakers")}},
  {id:"cs_valentina",name:"Valentina",tone:"olive",body:"couchTall",blurb:"Tall and leggy, olive-skinned with long straight black hair, in a little black dress and high heels.",
    pal:{primary:"black",secondary:"gold",third:"red",accent:"white",extra:"silver"},oname:"Little black dress",look:"glam",
    c:{faceShape:"slender, elegant face",mouthShape:"full lips",eyeShape:"sharp, almond-shaped eyes",eyeOne:"dark brown",expression:"seductive smile",impression:"a tall, elegant model",
      hairStyle:"long straight hair",hairLength:"very long",hairTexture:"sleek, silky and straight",bangs:"long side-swept bangs",hairBase:"black",skinTone:"light olive",
      makeupStyle:"glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"soft contour",lipFinish:"red lips"},
    items:{top:R("little black dress"),legwear:R("black high heels"),earAccessory:R("gold earrings")}},
  {id:"cs_rosie",name:"Rosie",tone:"fair",body:"couchNatural",blurb:"Natural and heavy-chested, a pale redhead with long waves and freckles, in a white tank top and panties.",
    pal:{primary:"white",secondary:"pink",third:"green",accent:"red",extra:"cream"},oname:"Tank top and panties",look:"casual",
    c:{faceShape:"soft, heart-shaped face",mouthShape:"soft, full lips",eyeShape:"large, almond-shaped eyes",eyeOne:"green",expression:"sweet smile",impression:"a soft, freckled redhead",
      hairStyle:"long wavy hair",hairLength:"long",hairTexture:"soft and wavy",bangs:"curtain bangs",hairBase:"red",skinTone:"fair",
      faceMark:"freckles across her nose and cheeks",bodyMarkings:"freckles on her shoulders and chest",makeupStyle:"natural makeup",eyelinerStyle:"thin eyeliner",blushStyle:"soft rosy blush",lipFinish:"soft pink lips"},
    items:{top:R("white tank top"),panties:R("pink panties")}},
  {id:"cs_brandi",name:"Brandi",tone:"tan",body:"couchBombshell",blurb:"An enhanced bombshell: deep tan, platinum hair, gigantic breasts and a huge butt, in a hot pink micro bikini.",
    pal:{primary:"hot pink",secondary:"white",third:"gold",accent:"black",extra:"silver"},oname:"Micro bikini",look:"swimwear",
    c:{faceShape:"oval face",mouthShape:"full, plump lips",eyeShape:"almond-shaped eyes with long lashes",eyeOne:"blue",expression:"seductive smile",impression:"a glamorous bombshell",
      hairStyle:"long voluminous waves",hairLength:"very long",hairTexture:"glossy and voluminous",bangs:"no bangs",hairBase:"platinum blonde",skinTone:"deep tan",bodyMarkings:"tanlines",
      makeupStyle:"heavy glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"bronzed contour",lipFinish:"glossy pink lips"},
    items:{top:R("hot pink micro bikini"),earAccessory:R("gold hoop earrings"),neckAccessory:R("gold necklace")}},
  {id:"cs_jada",name:"Jada",tone:"deep",body:"couchThick",blurb:"Thick all over, dark-skinned with long sleek black hair, in a crop top and denim shorts.",
    pal:{primary:"white",secondary:"blue",third:"gold",accent:"black",extra:"pink"},oname:"Crop top and denim",look:"street",
    c:{faceShape:"soft, round face",mouthShape:"full, plump lips",eyeShape:"large, almond-shaped eyes",eyeOne:"dark brown",expression:"confident smile",impression:"a thick, gorgeous girl",
      hairStyle:"long straight hair",hairLength:"very long",hairTexture:"sleek, silky and straight",bangs:"no bangs",hairBase:"black",skinTone:"deep brown",
      makeupStyle:"glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"warm blush",lipFinish:"glossy lips"},
    items:{top:R("white crop top"),bottom:R("denim shorts"),earAccessory:R("gold hoop earrings")}},
  {id:"cs_honey",name:"Honey",tone:"light",body:"couchPlump",blurb:"Soft and plump, a light-brown-haired sweetheart with a round belly and huge breasts, in a lace lingerie set.",
    pal:{primary:"lavender",secondary:"white",third:"pink",accent:"gold",extra:"cream"},oname:"Lace lingerie",look:"boudoir",
    c:{faceShape:"soft, round face",mouthShape:"soft, full lips",eyeShape:"large, round eyes",eyeOne:"hazel",expression:"gentle smile, blush",impression:"a soft, plump sweetheart",
      hairStyle:"long wavy hair",hairLength:"long",hairTexture:"soft and wavy",bangs:"long side-swept bangs",hairBase:"light brown",skinTone:"light",
      makeupStyle:"soft glam makeup",eyelinerStyle:"thin eyeliner",blushStyle:"soft rosy blush",lipFinish:"glossy pink lips"},
    items:{bra:R("lavender lace bra"),panties:R("lavender lace panties"),legwear:R("white thighhighs")}},
  {id:"cs_kiki",name:"Kiki",tone:"light",body:"couchShortstack",blurb:"A shortstack with pink twin tails, huge breasts and thick thighs, in a crop top, plaid mini skirt, choker and thigh-highs.",
    pal:{primary:"pink",secondary:"black",third:"white",accent:"red",extra:"lavender"},oname:"E-girl",look:"street",
    c:{faceShape:"soft, round face",mouthShape:"small, soft lips",eyeShape:"large, round eyes",eyeOne:"pink",expression:"smug smile",impression:"a short, stacked e-girl",
      hairStyle:"twin tails",hairLength:"long",hairTexture:"sleek and silky",bangs:"blunt bangs",hairBase:"pink",skinTone:"light",
      makeupStyle:"e-girl makeup",eyelinerStyle:"winged eyeliner",blushStyle:"heavy blush",lipFinish:"glossy lips"},
    items:{top:R("black crop top"),bottom:R("pink plaid miniskirt"),neckAccessory:R("black choker"),legwear:R("black thighhighs")}},
  {id:"cs_vivienne",name:"Vivienne",tone:"light",body:"couchMature",blurb:"Mature and curvy, with an auburn updo and glasses, in a white blouse, pencil skirt and pantyhose.",
    pal:{primary:"white",secondary:"black",third:"red",accent:"gold",extra:"grey"},oname:"Office",look:"preppy",
    c:{age:"mature woman",faceShape:"elegant oval face",mouthShape:"full lips",eyeShape:"almond-shaped eyes",eyeOne:"green",expression:"knowing smile",impression:"a confident, mature woman",
      hairStyle:"elegant updo",hairLength:"long",hairTexture:"sleek and glossy",bangs:"no bangs",hairBase:"auburn",skinTone:"light",
      makeupStyle:"glam makeup",eyelinerStyle:"winged eyeliner",blushStyle:"soft contour",lipFinish:"red lips"},
    items:{top:R("white blouse, unbuttoned"),bottom:R("black pencil skirt"),legwear:R("pantyhose, high heels"),eyewear:R("glasses")}}];
  /* ---------- v342: details pass, the way Oriole, Chessie and Crab were brought to life: freckle and mole maps, tan lines,
     tattoos and piercings, stretch marks and veins where her body would have them, iris detail, eyeshadow and nails, and her
     own nipples, areolae and pussy rather than the skin-tone default ---------- */
  const D={
    cs_pixie:{faceMark:"faint freckles over her nose and a tiny beauty mark above her lip",
      bodyMarkings:"porcelain skin with faint blue veins at her wrists and inner thighs, a scatter of tiny dark moles across her collarbone and ribs, visible hip bones, a small black star tattoo on her inner wrist, and a silver navel piercing",
      skinFinish:"smooth, porcelain skin",irisDetail:"cool grey irises with a darker limbal ring",eyeshadowStyle:"smoky charcoal eyeshadow",nailStyle:"short glossy black nails",
      nippleType:"small and perky",nippleColor:"pale pink",nippleLength:"short",areolaSize:"small",areolaType:"smooth",areolaColor:"pale pink",
      vaginaType:"small and neat, with tight outer lips",pubicHair:"completely shaved",hairMovement:"swings sharply at her jaw"},
    cs_peaches:{faceMark:"a small beauty mark high on her cheekbone",
      bodyMarkings:"glossy caramel skin with faint bikini tan lines, soft light stretch marks on her hips and the sides of her butt, two dimples at the base of her spine, and a small butterfly tattoo on her lower back",
      skinFinish:"glossy, glowing caramel skin",irisDetail:"warm honey-brown irises",eyeshadowStyle:"warm bronze eyeshadow",nailStyle:"long pink coffin nails",
      nippleType:"puffy",nippleColor:"caramel brown",nippleLength:"medium-length",areolaSize:"medium-sized",areolaType:"slightly bumpy",areolaColor:"light brown",
      vaginaType:"plump and puffy, with soft outer lips",pubicHair:"smooth and shaved",hairMovement:"bounces in big glossy spirals"},
    cs_sloane:{faceMark:"light sun freckles across her nose and cheeks",
      bodyMarkings:"crisp white bikini tan lines, sun freckles across her shoulders and chest, soft definition along her flat stomach, a faint sheen of sweat, and a small sun tattoo on her ankle",
      skinFinish:"sun-kissed, glowing skin with a light sheen of sweat",irisDetail:"bright blue irises with gold flecks",eyeshadowStyle:"soft bronze eyeshadow",nailStyle:"short french-tip nails",
      nippleType:"perky",nippleColor:"light pink",nippleLength:"medium-length",areolaSize:"small",areolaType:"smooth",areolaColor:"soft pink",
      vaginaType:"neat with minimal labia",pubicHair:"a thin landing strip of pubic hair",hairMovement:"swings high behind her"},
    cs_valentina:{faceMark:"a beauty mark just below her left eye",
      bodyMarkings:"smooth olive skin, a delicate script tattoo along her ribs, a tiny mole on her left hip, and a faint shimmer of body highlighter down her long legs",
      skinFinish:"smooth, satin skin",irisDetail:"deep, almost black brown irises",eyeshadowStyle:"sharp smoky eyeshadow",nailStyle:"long red stiletto nails",
      nippleType:"perky",nippleColor:"dark brown",nippleLength:"medium-length",areolaSize:"small",areolaType:"smooth",areolaColor:"brown",
      vaginaType:"neat with minimal labia",pubicHair:"completely shaved",hairMovement:"falls in a sleek black sheet"},
    cs_rosie:{faceMark:"dense freckles over her nose and cheeks",
      bodyMarkings:"milky pale skin, heavy freckles across her breasts, shoulders and thighs, faint blue veins on her heavy breasts, soft pink stretch marks along the sides of her breasts and hips, and a tiny mole under her left breast",
      skinFinish:"milky, soft, lightly flushed skin",irisDetail:"bright green irises",eyeshadowStyle:"soft rose eyeshadow",nailStyle:"short rounded pink nails",
      nippleType:"puffy",nippleColor:"rosy pink",nippleLength:"medium-length",areolaSize:"large",areolaType:"slightly bumpy",areolaColor:"pale pink",
      vaginaType:"plump with soft pink outer lips",pubicHair:"a natural patch of red pubic hair",hairMovement:"falls in soft copper waves"},
    cs_brandi:{faceMark:"a beauty mark above her lip",
      bodyMarkings:"a deep, even bronze tan with stark white bikini tan lines, glossy oiled skin, a lower-back tattoo, a diamond navel piercing, and barbell nipple piercings",
      skinFinish:"glossy, oiled bronze skin",irisDetail:"icy blue irises",eyeshadowStyle:"pink shimmer eyeshadow",nailStyle:"long pink acrylic nails",lipFinish:"glossy pink overlined lips",
      nippleType:"puffy",nippleColor:"light brown",nippleLength:"long",areolaSize:"large",areolaType:"smooth",areolaColor:"caramel brown",
      vaginaType:"plump and puffy",pubicHair:"completely shaved",hairMovement:"cascades in big platinum waves"},
    cs_jada:{faceMark:"a small mole on her cheek",
      bodyMarkings:"rich, deep brown skin with a warm glow, soft stretch marks on her hips, thighs and butt, a small script tattoo on her collarbone, and a gold navel ring",
      skinFinish:"glowing, moisturized skin",irisDetail:"dark brown irises with a warm amber ring",eyeshadowStyle:"gold shimmer eyeshadow",nailStyle:"long gold almond nails",
      nippleType:"puffy",nippleColor:"dark brown",nippleLength:"medium-length",areolaSize:"large",areolaType:"textured with tiny bumps",areolaColor:"deep brown",
      vaginaType:"plump with full outer lips",pubicHair:"smooth and shaved",hairMovement:"falls straight to her hips"},
    cs_honey:{faceMark:"rosy round cheeks and a dimple when she smiles",
      bodyMarkings:"soft, plush skin, a soft round belly with a deep navel, faint stretch marks on her belly, hips and thighs, dimpled thighs, and a scatter of small moles across her chest",
      skinFinish:"soft, flushed, velvety skin",irisDetail:"warm hazel irises",eyeshadowStyle:"soft pink eyeshadow",nailStyle:"short rounded pink nails",
      nippleType:"puffy",nippleColor:"rosy pink",nippleLength:"medium-length",areolaSize:"large",areolaType:"smooth",areolaColor:"soft pink",
      vaginaType:"plump and puffy",pubicHair:"a neatly trimmed patch of pubic hair",hairMovement:"falls in soft waves over her shoulders"},
    cs_kiki:{faceMark:"a tiny heart tattoo under her left eye",
      bodyMarkings:"porcelain skin flushed pink at her shoulders and knees, a garter tattoo around her thigh, a pink heart navel piercing, and a cluster of tiny star tattoos on her hip",
      skinFinish:"smooth, porcelain skin",irisDetail:"bright pink irises",eyeshadowStyle:"pink glitter eyeshadow",nailStyle:"long pastel pink nails",
      nippleType:"puffy",nippleColor:"pink",nippleLength:"short",areolaSize:"medium-sized",areolaType:"smooth",areolaColor:"pink",
      vaginaType:"plump and puffy",pubicHair:"completely shaved",hairMovement:"twin tails bouncing at her sides"},
    cs_vivienne:{faceMark:"a beauty mark on her cheekbone and faint laugh lines at her eyes",
      bodyMarkings:"fair skin with a dusting of freckles across her chest, faint stretch marks on her hips, a soft natural weight to her breasts, and a small rose tattoo on her hip",
      skinFinish:"smooth skin with a soft, mature glow",irisDetail:"deep green irises",eyeshadowStyle:"smoky brown eyeshadow",nailStyle:"long red manicured nails",
      nippleType:"puffy",nippleColor:"dusky rose",nippleLength:"long",areolaSize:"large",areolaType:"slightly bumpy",areolaColor:"dusky rose",
      vaginaType:"full, with soft outer lips",pubicHair:"a neatly trimmed dark patch of pubic hair",hairMovement:"pinned up, a few strands falling loose"}};
  S.forEach(s=>{if(D[s.id])Object.assign(s.c,D[s.id])});
  const entries=S.map(mk);
  entries.forEach(e=>{
    Object.entries(e.c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@"&&Array.isArray(CHAR[f])&&CHAR[f].length)START.option(f,v,GROUP)});
    Object.entries(e.outfit.items).forEach(([f,a])=>START.item(f,a[0],"CUS",e.outfit.look))});
  START.add(GROUP,entries);
})();
