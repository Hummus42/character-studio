/* ---- v299: Furry. Every Academy girl as a sexy, nude anthro version of her House animal: Griffin a feathered
   lion-eagle, Kitsune a nine-tailed fox, Penguin a sleek penguin, Kraken a tentacled sea creature. The girl herself is the
   anthro (an adult woman, 18+ by her biography; the faction girls are ageless adults); there are never animals in the
   picture, and the studio's minor safeguard still applies. The faction Houses have no animal, so each girl has one
   chosen to fit her, in her faction's style: Synth girls are robotic anthros with exposed joints, Void girls have
   starfield fur, Clockwork girls brass gears, Vigil girls nocturnal animals. Her own hair and eye colours stay; the
   setting is her House-costume place. After dark, on its own "Furry" shelf. Danbooru tags checked with tagcheck.js.
   Key suffix "fzx" ends in no House name. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof tplById!=="function")return;
  const SET=(ACAD.HOUSE_COSTUMES&&ACAD.HOUSE_COSTUMES.setting)||{};
  const must=(a,s)=>`an anime style with high detail, she is depicted as a sexy anthropomorphic ${a} with an animal head, fur-covered body and her own hair and eye colours, completely nude, ${s}, and particular emphasis on highly detailed fur, hair and eyes`;
  const BODY={
    M:["furry female, body fur, animal nose, snout, pawpads","covered in soft, sleek fur"],
    B:["furry female, bird girl, feathers, beak, winged arms, feathered wings","covered in soft, glossy feathers"],
    R:["furry female, scales, snout, lizard tail","covered in smooth, glossy scales"],
    S:["furry female, fish girl, fins, head fins, scales, wet","sleek, wet and glistening"],
    I:["furry female, arthropod girl, antennae, insect wings","smooth, glossy and iridescent"]};
  const FAC={synth:"mechabare, robot joints, glowing eyes",void:"starry sky print, glowing eyes",clock:"gears, robot joints",vigil:"glowing eyes, night"};
  const NUDE="completely nude, nipples, pussy, navel, looking at viewer, sexually suggestive";
  /* house: [animal, body, species tags, faction] */
  const D={
  griffin:["griffin, a feathered eagle-headed lioness","B","lion tail, feathered wings"],
  dragon:["dragon","R","dragon girl, dragon horns, dragon tail, dragon wings"],
  phoenix:["phoenix with fiery plumage","B","fiery wings, fire"],
  unicorn:["unicorn mare","M","horse girl, horse ears, horse tail, single horn"],
  kitsune:["nine-tailed kitsune fox","M","fox girl, fox ears, fox tail, multiple tails"],
  pegasus:["winged pegasus mare","M","horse girl, horse ears, horse tail, feathered wings"],
  kirin:["kirin, a scaled deer-dragon","R","dragon girl, antlers, dragon tail"],
  sphinx:["winged sphinx lioness","M","lion girl, lion ears, lion tail, feathered wings"],
  siren:["siren mermaid","S","mermaid, fish tail"],
  manticore:["manticore lioness","M","lion girl, lion ears, scorpion tail, bat wings"],
  lioness:["lioness","M","lion girl, lion ears, lion tail"],
  tiger:["tigress","M","tiger girl, tiger ears, tiger tail"],
  jaguar:["jaguar","M","jaguar girl, leopard ears, leopard tail"],
  cougar:["cougar","M","cat girl, cat ears, cat tail"],
  cheetah:["cheetah","M","cheetah girl, leopard ears, leopard tail"],
  leopard:["leopard","M","leopard girl, leopard ears, leopard tail"],
  panther:["black panther","M","cat girl, cat ears, cat tail"],
  lynx:["lynx","M","cat girl, cat ears, fluffy"],
  caracal:["caracal","M","cat girl, cat ears, cat tail"],
  serval:["serval","M","cat girl, cat ears, cat tail"],
  wolf:["wolf","M","wolf girl, wolf ears, wolf tail"],
  fox:["red fox","M","fox girl, fox ears, fox tail"],
  arcticfox:["white arctic fox","M","fox girl, fox ears, fox tail, fluffy"],
  coyote:["coyote","M","wolf girl, wolf ears, wolf tail"],
  hyena:["spotted hyena","M","hyena girl"],
  jackal:["black jackal","M","dog girl, dog ears, dog tail"],
  husky:["husky","M","dog girl, dog ears, dog tail, fluffy"],
  dingo:["dingo","M","dog girl, dog ears, dog tail"],
  fennec:["fennec fox with huge ears","M","fox girl, fox ears, fox tail"],
  shiba:["shiba inu","M","dog girl, dog ears, dog tail"],
  orca:["orca","S","shark girl, shark tail"],
  penguin:["penguin","B","penguin girl"],
  harpseal:["white harp seal","M","seal (animal), fluffy"],
  narwhal:["narwhal with a spiral tusk","S","single horn, fish tail"],
  polarbear:["polar bear","M","bear girl, bear ears, bear tail, fluffy"],
  otter:["otter","M","otter girl, otter ears"],
  reindeer:["reindeer doe","M","deer girl, deer ears, antlers"],
  beluga:["beluga whale","S","fish tail"],
  ermine:["white ermine","M","fluffy"],
  puffin:["puffin","B","penguin girl"],
  kraken:["kraken with tentacles","S","monster girl, tentacles"],
  shark:["shark","S","shark girl, shark tail"],
  dolphin:["dolphin","S","fish tail"],
  jellyfish:["translucent jellyfish","S","monster girl, tentacles, see-through clothes"],
  salmon:["salmon","S","fish tail"],
  seahorse:["seahorse","S","monster girl"],
  manta:["manta ray","S","monster girl"],
  koi:["koi carp","S","fish tail"],
  eel:["electric eel","S","monster girl, electricity"],
  angelfish:["striped angelfish","S","fish tail"],
  raven:["raven","B","black wings"],
  crow:["crow","B","black wings"],
  owl:["owl","B","owl girl"],
  eagle:["golden eagle","B","harpy"],
  falcon:["falcon","B","harpy"],
  hawk:["hawk","B","harpy"],
  vulture:["vulture","B","harpy, black wings"],
  osprey:["osprey","B","harpy"],
  magpie:["magpie","B","harpy"],
  snowyowl:["snowy owl","B","owl girl, white wings"],
  peacock:["peafowl with a peacock-feather train","B","peacock feathers"],
  swan:["swan","B","white wings"],
  flamingo:["flamingo","B","harpy"],
  crane:["red-crowned crane","B","white wings"],
  lovebird:["lovebird","B","harpy"],
  hummingbird:["hummingbird","B","harpy"],
  macaw:["scarlet macaw","B","harpy"],
  cockatoo:["cockatoo","B","harpy"],
  birdofparadise:["bird of paradise","B","harpy"],
  kingfisher:["kingfisher","B","harpy"],
  stag:["deer doe with antlers","M","deer girl, deer ears, antlers"],
  badger:["badger","M","bear ears"],
  panda:["giant panda","M","panda girl, panda ears, bear tail"],
  raccoon:["raccoon","M","raccoon girl, raccoon ears, raccoon tail"],
  rat:["rat","M","mouse girl, mouse ears, mouse tail"],
  rabbit:["white rabbit","M","rabbit girl, rabbit ears, rabbit tail"],
  squirrel:["red squirrel","M","squirrel girl, squirrel ears, squirrel tail"],
  hedgehog:["hedgehog","M","hedgehog girl"],
  redpanda:["red panda","M","raccoon tail, fluffy"],
  koala:["koala","M","koala, bear ears"],
  serpent:["serpent","R","lamia, snake tail"],
  cobra:["cobra with a flared hood","R","lamia, snake tail"],
  viper:["green viper","R","lamia, snake tail"],
  chameleon:["chameleon","R","chameleon girl"],
  gecko:["gecko","R","lizard tail"],
  crocodile:["crocodile","R","crocodile"],
  iguana:["iguana","R","lizard tail"],
  axolotl:["pink axolotl","S","axolotl girl"],
  frog:["frog","S","frog girl"],
  turtle:["sea turtle","R","turtle"],
  bee:["bee","I","bee girl"],
  scorpion:["scorpion","I","scorpion tail"],
  mantis:["praying mantis","I","monster girl"],
  spider:["spider","I","spider girl"],
  firefly:["glowing firefly","I","glowing"],
  butterfly:["butterfly","I","butterfly wings"],
  ladybug:["ladybug","I","monster girl"],
  moth:["fluffy moth","I","moth girl, fluffy"],
  dragonfly:["dragonfly","I","monster girl"],
  beetle:["rhinoceros beetle","I","horns"],
  sovereign:["white lioness","M","lion girl, lion ears, lion tail","synth"],
  valkyrie:["snow wolf","M","wolf girl, wolf ears, wolf tail","synth"],
  android:["pink rabbit","M","rabbit girl, rabbit ears, rabbit tail","synth"],
  automaton:["lavender cat","M","cat girl, cat ears, cat tail","synth"],
  golem:["mountain ram","M","goat girl, sheep horns","synth"],
  hologram:["cyan fox","M","fox girl, fox ears, fox tail","synth"],
  cipher:["black cat","M","cat girl, cat ears, cat tail","synth"],
  archive:["owl","B","owl girl","synth"],
  medic:["white doe","M","deer girl, deer ears","synth"],
  companion:["fluffy white puppy","M","dog girl, dog ears, dog tail","synth"],
  seraph:["swan","B","white wings","synth"],
  nereid:["otter","M","otter girl, otter ears","synth"],
  vector:["cheetah","M","cheetah girl, leopard ears, leopard tail","synth"],
  voyager:["hare","M","rabbit girl, rabbit ears","synth"],
  glitch:["raccoon","M","raccoon girl, raccoon ears, raccoon tail","synth"],
  muse:["snow leopard","M","leopard girl, leopard ears, leopard tail","synth"],
  lullaby:["sheep","M","sheep girl, sheep ears, sheep horns","synth"],
  bloom:["fawn","M","deer girl, deer ears","synth"],
  titan:["bear","M","bear girl, bear ears, bear tail","synth"],
  prototype:["white mouse","M","mouse girl, mouse ears, mouse tail","synth"],
  horizon:["black panther","M","cat girl, cat ears, cat tail","void"],
  eclipse:["black wolf","M","wolf girl, wolf ears, wolf tail","void"],
  umbra:["black cat","M","cat girl, cat ears, cat tail","void"],
  penumbra:["raven","B","black wings","void"],
  oblivion:["grey wolf","M","wolf girl, wolf ears, wolf tail","void"],
  hush:["black rabbit","M","rabbit girl, rabbit ears, rabbit tail","void"],
  aurora:["arctic fox","M","fox girl, fox ears, fox tail","void"],
  comet:["lynx","M","cat girl, cat ears","void"],
  nova:["tigress","M","tiger girl, tiger ears, tiger tail","void"],
  entropy:["hyena","M","hyena girl","void"],
  pulsar:["jaguar","M","jaguar girl, leopard ears, leopard tail","void"],
  cradle:["bear","M","bear girl, bear ears, bear tail","void"],
  quasar:["snow leopard","M","leopard girl, leopard ears, leopard tail","void"],
  singularity:["black dragon","R","dragon girl, dragon horns, dragon tail, dragon wings","void"],
  rapture:["red fox","M","fox girl, fox ears, fox tail","void"],
  maw:["deep-sea shark","S","shark girl, shark tail, sharp teeth","void"],
  stardust:["cat","M","cat girl, cat ears, cat tail","void"],
  wraith:["pale moth","I","moth girl, fluffy","void"],
  nebula:["deer doe","M","deer girl, deer ears","void"],
  hollow:["black sheep","M","sheep girl, sheep ears, sheep horns","void"],
  regent:["lioness","M","lion girl, lion ears, lion tail","clock"],
  chronicle:["owl","B","owl girl","clock"],
  pendulum:["silver serpent","R","lamia, snake tail","clock"],
  mainspring:["squirrel","M","squirrel girl, squirrel ears, squirrel tail","clock"],
  gearwright:["badger","M","bear ears","clock"],
  sundial:["golden hare","M","rabbit girl, rabbit ears","clock"],
  hourglass:["cow","M","cow girl, cow ears, cow tail","clock"],
  metronome:["horse","M","horse girl, horse ears, horse tail","clock"],
  almanac:["fox","M","fox girl, fox ears, fox tail","clock"],
  tourbillon:["peafowl","B","peacock feathers","clock"],
  augur:["white owl","B","owl girl, white wings","vigil"],
  nightmare:["black horse","M","horse girl, horse ears, horse tail","vigil"],
  reverie:["lavender sheep","M","sheep girl, sheep ears, sheep horns","vigil"],
  insomnia:["raccoon","M","raccoon girl, raccoon ears, raccoon tail","vigil"],
  seance:["black cat","M","cat girl, cat ears, cat tail","vigil"],
  vesper:["bat","M","bat girl, bat wings","vigil"],
  lantern:["fox","M","fox girl, fox ears, fox tail","vigil"],
  grimoire:["green serpent","R","lamia, snake tail","vigil"],
  lethe:["white deer","M","deer girl, deer ears","vigil"],
  portent:["crow","B","black wings","vigil"]};
  /* v304: the Great Waking's hundred girls (data-expansion-looks.js) */
  if(window.FURRY_EXTRA&&window.FURRY_EXTRA.looks)Object.entries(window.FURRY_EXTRA.looks).forEach(([h,v])=>{if(!D[h])D[h]=[v[0],v[1],v[2]]});
  const ex=["sultry, half-lidded look","playful, teasing smile","shy blush, eyes on the viewer"];
  const PO={M:["stretching on all fours, tail raised","lying on her side, one leg lifted","sitting with her knees apart, leaning back"],
    B:["spreading her wings wide, chest out","preening, wings draped around her","perched with her legs crossed, wings half open"],
    R:["coiled on a warm rock, looking back","lounging on her back, tail curled","rising up, arms behind her head"],
    S:["lying in the shallows, back arched","floating on her back, arms spread","sitting on a rock, wet and glistening"],
    I:["stretching her wings in sunlight","kneeling with her back arched","lying on a giant leaf, legs crossed"]};
  const H=ACAD.HOUSES.filter(h=>D[h]);
  Object.values(PO).forEach(p=>{try{ACAD.opts("posture",p,"Furry")}catch(e){}});
  try{ACAD.opts("expression",ex,"Furry")}catch(e){}
  ACAD.set("Academy Furry","Academy Au Naturel","fzx","furry","boudoir",{tags:["after dark","furry","nude"],oname:"Furry",c:{age:"woman"}},
    H.map((h,i)=>{const b=D[h][1];return[h,{},ex[i%ex.length],PO[b][i%3],"a furry "+D[h][0].split(",")[0],{}]}));
  H.forEach(h=>{const t=tplById(h+"fzx");if(!t)return;const [a,b,sp,f]=D[h];
    t.name="Furry "+a.split(",")[0].replace(/^(a|an) /,"")+" ("+ACAD.cap(h)+")";
    t.c=Object.assign({},t.c,{skinFinish:BODY[b][1]});
    t.out=Object.assign({},t.out,{must:must(a,SET[h]||"a softly lit bedroom"),notes:[BODY[b][0],sp,f&&FAC[f],NUDE].filter(Boolean).join(", ")});
    if(typeof t.blurb==="string")t.blurb=`${ACAD.cap(h)} as a nude anthro ${a.split(",")[0]}. Hair and eye colours come from the ${ACAD.cap(h)} robes.`});
  ACAD.FURRY={girls:H.length,missing:ACAD.HOUSES.filter(h=>!D[h])};
})();

/* ---- v300: the Furry looks, mapped back to the Character Studio. Every look is now built from Concept-tab fields:
   Subject (her species), Animal form "Full (beast-like anthropomorph)", Animal pattern, and the trait rows (ears,
   horns, tail, wings, claws, aura), so the studio writes the anthro sentence itself and every piece can be changed
   there. Species the studio did not have are added as Subject options (the big cats, hyena, coyote, husky, fennec,
   the sea mammals, the fish, every House bird, badger, hedgehog, koala, the reptiles, the insects, and the mythic
   griffin, sphinx, manticore and kirin), with new body families where none fitted (whale, seal, fish, octopus,
   jellyfish, insect, spider, turtle, hedgehog). Fur takes her hair colour (palette primary), markings her secondary.
   Faction looks use studio markings: Synth panel seams, Void starfield skin and a cosmic aura, Clockwork brass and
   gear seams, Vigil a moonlit aura. Human-only face and skin fields are cleared. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.FURRY||typeof ANIMALS==="undefined"||typeof SPECIES_INFO==="undefined")return;
  const FAM={
    cetacean:{noun:"skin",light:"smooth, glossy {c} skin along her forearms and calves",cov:"smooth, rubbery {c} skin covering her arms and legs",snoutM:"a short rounded rostrum with a small blowhole",limbM:"flipper-like hands with webbed fingers",snoutF:"a full rounded cetacean head with a smooth rostrum and a blowhole",limbF:"flipper arms, webbed hands and a broad tail fluke"},
    pinniped:{noun:"fur",light:"short, sleek {c} fur along her forearms",cov:"dense, velvety {c} fur covering her arms and legs",snoutM:"a short whiskered muzzle with a dark nose",limbM:"webbed, clawed flipper hands",snoutF:"a full round seal face with big dark eyes and long whiskers",limbF:"webbed flipper hands and feet"},
    fish:{noun:"scales",light:"shimmering {c} scales along her forearms and calves",cov:"shimmering {c} scales covering her arms and legs, with fins at her elbows",snoutM:"gill slits along her neck and finned ears",limbM:"webbed hands with fins along her forearms",snoutF:"a full fish-like face with gills, finned cheeks and large round eyes",limbF:"finned arms, webbed hands and a fish tail"},
    cephalopod:{noun:"skin",light:"smooth {c} skin with suckers along her forearms",cov:"smooth, glossy {c} skin covering her arms and legs, dotted with suckers",snoutM:"tentacle-like hair tendrils and large eyes",limbM:"tentacle fingers with small suckers",snoutF:"a full cephalopod face with large eyes and a mantle of tentacles",limbF:"long tentacles in place of legs and suckered arms"},
    jelly:{noun:"bell",light:"translucent {c} skin along her forearms",cov:"translucent, glowing {c} skin covering her arms and legs",snoutM:"a soft translucent bell over her head",limbM:"trailing ribbon-like tendrils from her wrists",snoutF:"a full translucent jellyfish bell over her head",limbF:"translucent limbs and long trailing tendrils"},
    insect:{noun:"chitin",light:"glossy {c} chitin plates along her forearms and calves",cov:"glossy {c} chitin plates covering her arms and legs",snoutM:"antennae and a faint compound-eye sheen",limbM:"segmented chitin-plated hands",snoutF:"a full insectoid face with compound eyes, mandibles and antennae",limbF:"segmented chitin-plated limbs"},
    arachnid:{noun:"chitin",light:"glossy {c} chitin along her forearms and calves",cov:"glossy {c} chitin with fine hairs covering her arms and legs",snoutM:"a cluster of small extra eyes on her brow",limbM:"long, clawed, segmented fingers",snoutF:"a full arachnid face with eight glossy eyes and small fangs",limbF:"long segmented limbs and extra spider legs"},
    chelonian:{noun:"scales",light:"tough {c} scales along her forearms and calves",cov:"tough {c} scales covering her arms and legs, with a shell on her back",snoutM:"a short beak-like snout",limbM:"clawed, scaly hands",snoutF:"a full turtle face with a hooked beak",limbF:"scaly clawed limbs and a domed shell on her back"},
    hedgehog:{noun:"spines",light:"short {c} spines along her forearms",cov:"soft {c} fur on her front and {c2} spines covering her back and arms",snoutM:"a small pointed muzzle with a black button nose",limbM:"small clawed paw hands",snoutF:"a full pointed hedgehog snout with a black nose",limbF:"small clawed paws and a back of spines"}};
  Object.entries(FAM).forEach(([k,v])=>{if(!ANIMALS.families[k])ANIMALS.families[k]=v});
  const FX=window.FURRY_EXTRA||{};Object.entries(FX.families||{}).forEach(([k,v])=>{if(!ANIMALS.families[k])ANIMALS.families[k]=v});
  if(Array.isArray(CHAR.animalPattern)&&!CHAR.animalPattern.some(x=>x[0]==="auto"))CHAR.animalPattern.unshift(["auto","Pattern"]);
  const T=(e,t,w,h,f,a)=>Object.assign({},e&&{earStyle:e},t&&{tailStyle:t},w&&{wingStyle:w},h&&{hornStyle:h},f&&{fangClawStyle:f},a&&{auraStyle:a});
  const K="Kemonomimi",AQ="Aquatic",FH="Fantasy Humanoid";
  /* name: [family, Subject group, skin family, patterns, auto traits] */
  const NEW={
    griffin:["avian",FH,"winged",["{c2} lion-tawny fur on her lower body"],T("feathered ear tufts","tufted lion tail","great feathered eagle wings",null,"bird talons")],
    sphinx:["feline",FH,"feline",["a {c2} desert-gold coat"],T("lion ears","tufted lion tail","feathered wings",null,"subtle fangs and small claws")],
    manticore:["feline",FH,"feline",["a {c2} tawny coat"],T("lion ears","segmented scorpion tail","leathery bat wings",null,"sharp fangs and claws")],
    kirin:["dragon",FH,"scaled",["{c2} scale edges","a {c2} flame-like mane"],T("deer ears","long scaled tail with a tufted tip",null,"branching antlers","small claws")],
    jaguar:["feline",K,"feline",["{c2} rosettes"],T("round cat ears","spotted feline tail",null,null,"subtle fangs and small claws")],
    cheetah:["feline",K,"feline",["{c2} solid spots and tear marks"],T("small round cat ears","long spotted tail with a ringed tip",null,null,"subtle fangs and small claws")],
    panther:["feline",K,"feline",["faint {c2} rosettes under the dark coat"],T("cat ears","long sleek feline tail",null,null,"subtle fangs and small claws")],
    lynx:["feline",K,"feline",["{c2} spots and a ruffed face"],T("tufted lynx ears","short bobbed tail",null,null,"subtle fangs and small claws")],
    caracal:["feline",K,"feline",["{c2} face markings"],T("long black-tufted ears","short feline tail",null,null,"subtle fangs and small claws")],
    serval:["feline",K,"feline",["{c2} spots and stripes"],T("large round cat ears","ringed feline tail",null,null,"subtle fangs and small claws")],
    cougar:["feline",K,"feline",["a {c2} muzzle and chest"],T("round cat ears","long dark-tipped tail",null,null,"subtle fangs and small claws")],
    "snow leopard":["feline",K,"feline",["{c2} rosettes"],T("small round cat ears","very thick, long spotted tail",null,null,"subtle fangs and small claws")],
    hyena:["canine",K,"canine",["{c2} spots","{c2} stripes"],T("round hyena ears","short bushy tail",null,null,"sharp fangs")],
    coyote:["lupine",K,"canine",["a {c2} saddle and pale belly"],T("tall pointed ears","bushy black-tipped tail",null,null,"subtle fangs")],
    husky:["canine",K,"canine",["a {c2} mask and saddle markings"],T("pointed husky ears","curled fluffy tail",null,null,"subtle fangs")],
    dingo:["canine",K,"canine",["{c2} socks and chest"],T("upright dog ears","bushy tail",null,null,"subtle fangs")],
    shiba:["canine",K,"canine",["{c2} cheeks and chest"],T("small pointed dog ears","curled fluffy tail",null,null,"subtle fangs")],
    fennec:["vulpine",K,"fox",["{c2} cheek and chest fur"],T("huge fennec fox ears","fluffy black-tipped fox tail",null,null,"subtle fangs")],
    "polar bear":["ursine",K,"sturdy",[],T("small round bear ears","short bear tail",null,null,"small claws")],
    koala:["ursine",K,"gentle",["{c2} ear fluff and chest"],T("big fluffy round ears",null,null,null,"small claws")],
    badger:["mustelid",K,"sturdy",["{c2} face stripes"],T("small round ears","short bushy tail",null,null,"digging claws")],
    ermine:["mustelid",K,"gentle",["a {c2} tail tip"],T("small round ears","long slender tail",null,null,"small claws")],
    rat:["rodent",K,"gentle",["a {c2} belly"],T("round mouse ears","long thin tail",null,null,"small claws")],
    hedgehog:["hedgehog",K,"gentle",["{c2} spine tips"],T("small round ears","short stubby tail",null,null,"small claws")],
    seal:["pinniped",AQ,"aquatic",["{c2} harp markings"],T(null,"short flipper tail",null,null,null)],
    orca:["cetacean",AQ,"aquatic",["{c2} eye patches and belly"],T(null,"orca tail fluke with a dorsal fin",null,null,null)],
    dolphin:["cetacean",AQ,"aquatic",["a {c2} pale belly"],T(null,"dolphin tail fluke with a dorsal fin",null,null,null)],
    beluga:["cetacean",AQ,"aquatic",[],T(null,"white whale tail fluke",null,null,null)],
    narwhal:["cetacean",AQ,"aquatic",["{c2} mottling"],T(null,"whale tail fluke",null,"long spiral tusk",null)],
    fish:["fish",AQ,"aquatic",["{c2} fin edges","{c2} stripes","{c2} patches"],T("finned ears","finned fish tail",null,null,null)],
    seahorse:["fish",AQ,"aquatic",["{c2} ridges"],T("frilled fin ears","curling seahorse tail",null,"small crown of spines",null)],
    manta:["fish",AQ,"aquatic",["a {c2} underside"],T(null,"long thin whip tail","wide manta-wing fins",null,null)],
    eel:["fish",AQ,"aquatic",["glowing {c2} electric stripes"],T("small finned ears","long eel tail",null,null,null,"crackling electric aura")],
    kraken:["cephalopod",AQ,"aquatic",["{c2} suckers"],T(null,"mass of tentacles",null,null,null)],
    jellyfish:["jelly",AQ,"aquatic",["glowing {c2} bands"],T(null,"long trailing tendrils",null,null,null,"soft bioluminescent glow")],
    penguin:["avian",K,"winged",["a {c2} chest"],T(null,"short stiff tail","small flipper wings",null,null)],
    puffin:["avian",K,"winged",["a {c2} face and chest"],T(null,"short tail","small black wings",null,"bird talons")],
    raven:["avian",K,"winged",["a {c2} sheen"],T("feathered ear tufts","fanned black tail feathers","large black feathered wings",null,"bird talons")],
    crow:["avian",K,"winged",["a {c2} sheen"],T(null,"black tail feathers","black feathered wings",null,"bird talons")],
    eagle:["avian",K,"winged",["a {c2} head"],T(null,"broad tail feathers","great eagle wings",null,"sharp talons")],
    falcon:["avian",K,"winged",["{c2} barring on the chest"],T(null,"barred tail feathers","pointed falcon wings",null,"sharp talons")],
    hawk:["avian",K,"winged",["a {c2} streaked chest"],T(null,"red-brown tail feathers","broad hawk wings",null,"sharp talons")],
    vulture:["avian",K,"winged",["a {c2} ruff"],T(null,"ragged tail feathers","huge ragged black wings",null,"hooked talons")],
    osprey:["avian",K,"winged",["{c2} eye stripes and a pale chest"],T(null,"barred tail feathers","long angled wings",null,"sharp talons")],
    magpie:["avian",K,"winged",["{c2} wing patches"],T(null,"long iridescent tail feathers","black-and-white wings",null,"bird talons")],
    peafowl:["avian",K,"winged",["{c2} eyespots"],T(null,"long peacock train with eyespot feathers","iridescent wings","small feather crest",null)],
    swan:["avian",K,"winged",[],T(null,"short white tail feathers","great white swan wings",null,null)],
    flamingo:["avian",K,"winged",["{c2} wing tips"],T(null,"short pink tail feathers","pink wings with black tips",null,null)],
    crane:["avian",K,"winged",["a {c2} crown and neck"],T(null,"bustle of tail feathers","long white wings with black edges",null,null)],
    lovebird:["avian",K,"winged",["a {c2} face"],T(null,"short tail feathers","small green wings",null,null)],
    hummingbird:["avian",K,"winged",["an iridescent {c2} throat"],T(null,"forked tail feathers","small blurred wings",null,null)],
    macaw:["avian",K,"winged",["{c2} and blue wing bands"],T(null,"long red tail feathers","bright rainbow wings",null,"hooked talons")],
    cockatoo:["avian",K,"winged",["a {c2} crest"],T("tall yellow crest","short white tail feathers","white wings",null,"bird talons")],
    "bird of paradise":["avian",K,"winged",["{c2} plumes"],T(null,"long ribbon-like tail plumes","flared display wings","head plumes",null)],
    kingfisher:["avian",K,"winged",["a {c2} chest"],T(null,"short blue tail","bright blue wings",null,"bird talons")],
    chameleon:["reptile",FH,"scaled",["shifting {c2} bands"],T(null,"curled prehensile tail",null,"small head casque","clawed grip")],
    gecko:["reptile",FH,"scaled",["{c2} spots"],T(null,"thick gecko tail",null,null,"sticky toe pads")],
    iguana:["reptile",FH,"scaled",["{c2} bands"],T(null,"long banded tail",null,"spiny head crest","small claws")],
    crocodile:["reptile",FH,"scaled",["{c2} armored ridges"],T(null,"heavy ridged tail",null,null,"sharp teeth and claws")],
    cobra:["serpent",FH,"serpent",["a {c2} hood pattern"],T(null,"long coiled serpent tail",null,"flared cobra hood","venomous snake fangs")],
    viper:["serpent",FH,"serpent",["{c2} diamond markings"],T(null,"long coiled serpent tail",null,"small brow horns","venomous snake fangs")],
    turtle:["chelonian",AQ,"aquatic",["{c2} shell plates"],T(null,"short scaly tail",null,null,null)],
    frog:["amphibian",AQ,"aquatic",["{c2} spots"],T(null,null,null,null,null)],
    scorpion:["insect",FH,"generic",["{c2} segments"],T(null,"segmented scorpion tail",null,null,"pincer claws")],
    spider:["arachnid",FH,"generic",["a {c2} hourglass mark"],T(null,null,null,null,"small venomous fangs")],
    mantis:["insect",FH,"generic",["{c2} leaf-like edges"],T(null,null,"long green insect wings",null,"bladed forelimbs")],
    ladybug:["insect",FH,"generic",["{c2} polka dots"],T(null,null,"red spotted wing cases",null,null)],
    dragonfly:["insect",FH,"generic",["{c2} banding"],T(null,"long segmented tail","four iridescent dragonfly wings",null,null)],
    beetle:["insect",FH,"generic",["a {c2} sheen"],T(null,null,"glossy wing cases","large rhinoceros beetle horn",null)],
    firefly:["insect",FH,"generic",["a glowing {c2} abdomen"],T(null,"glowing abdomen tail","sheer insect wings",null,null,"soft firefly glow")]};
  Object.entries(FX.species||{}).forEach(([n,v])=>{if(!NEW[n])NEW[n]=[v[0],v[1],v[2],v[3],v[4]]});
  const have=new Set((CHAR.subjectType||[]).map(x=>x[0]));
  Object.entries(NEW).forEach(([n,[fam,grp,skin,pats,auto]])=>{
    if(SPECIES_INFO[n])return;
    const key=n+"-girl";
    if(!have.has(n))CHAR.subjectType.push([n,grp]);
    SPECIES_INFO[n]={type:"hyphen",legacy:[key]};
    ANIMALS.species[key]={family:fam,patterns:pats};
    AUTO_TRAITS[key]=auto;
    try{SPECIES_FAMILY[n]=skin}catch(e){}
  });
  /* each house's studio species */
  const SPEC={griffin:"griffin",dragon:"dragon",phoenix:"phoenix",unicorn:"unicorn",kitsune:"kitsune",pegasus:"pegasus",kirin:"kirin",sphinx:"sphinx",siren:"fish",manticore:"manticore",
    lioness:"lion",tiger:"tiger",jaguar:"jaguar",cougar:"cougar",cheetah:"cheetah",leopard:"leopard",panther:"panther",lynx:"lynx",caracal:"caracal",serval:"serval",
    wolf:"wolf",fox:"fox",arcticfox:"fox",coyote:"coyote",hyena:"hyena",jackal:"jackal",husky:"husky",dingo:"dingo",fennec:"fennec",shiba:"shiba",
    orca:"orca",penguin:"penguin",harpseal:"seal",narwhal:"narwhal",polarbear:"polar bear",otter:"otter",reindeer:"deer",beluga:"beluga",ermine:"ermine",puffin:"puffin",
    kraken:"kraken",shark:"shark",dolphin:"dolphin",jellyfish:"jellyfish",salmon:"fish",seahorse:"seahorse",manta:"manta",koi:"fish",eel:"eel",angelfish:"fish",
    raven:"raven",crow:"crow",owl:"owl",eagle:"eagle",falcon:"falcon",hawk:"hawk",vulture:"vulture",osprey:"osprey",magpie:"magpie",snowyowl:"owl",
    peacock:"peafowl",swan:"swan",flamingo:"flamingo",crane:"crane",lovebird:"lovebird",hummingbird:"hummingbird",macaw:"macaw",cockatoo:"cockatoo",birdofparadise:"bird of paradise",kingfisher:"kingfisher",
    stag:"deer",badger:"badger",panda:"panda",raccoon:"raccoon",rat:"rat",rabbit:"bunny",squirrel:"squirrel",hedgehog:"hedgehog",redpanda:"red panda",koala:"koala",
    serpent:"snake",cobra:"cobra",viper:"viper",chameleon:"chameleon",gecko:"gecko",crocodile:"crocodile",iguana:"iguana",axolotl:"axolotl",frog:"frog",turtle:"turtle",
    bee:"bee",scorpion:"scorpion",mantis:"mantis",spider:"spider",firefly:"firefly",butterfly:"butterfly",ladybug:"ladybug",moth:"moth",dragonfly:"dragonfly",beetle:"beetle",
    sovereign:"lion",valkyrie:"wolf",android:"bunny",automaton:"cat",golem:"goat",hologram:"fox",cipher:"cat",archive:"owl",medic:"deer",companion:"dog",
    seraph:"swan",nereid:"otter",vector:"cheetah",voyager:"bunny",glitch:"raccoon",muse:"snow leopard",lullaby:"sheep",bloom:"deer",titan:"bear",prototype:"mouse",
    horizon:"panther",eclipse:"wolf",umbra:"cat",penumbra:"raven",oblivion:"wolf",hush:"bunny",aurora:"fox",comet:"lynx",nova:"tiger",entropy:"hyena",
    pulsar:"jaguar",cradle:"bear",quasar:"snow leopard",singularity:"dragon",rapture:"fox",maw:"shark",stardust:"cat",wraith:"moth",nebula:"deer",hollow:"sheep",
    regent:"lion",chronicle:"owl",pendulum:"snake",mainspring:"squirrel",gearwright:"badger",sundial:"bunny",hourglass:"cow",metronome:"horse",almanac:"fox",tourbillon:"peafowl",
    augur:"owl",nightmare:"horse",reverie:"sheep",insomnia:"raccoon",seance:"cat",vesper:"bat",lantern:"fox",grimoire:"snake",lethe:"deer",portent:"crow"};
  Object.entries(FX.looks||{}).forEach(([h,v])=>{if(!SPEC[h])SPEC[h]=v[3]});
  const FACT={synth:{markings:"thin silver panel seams along her collarbones, arms and thighs",bodyMarkings:"faint glowing gear-line seams at her shoulders, elbows and knees"},
    void:{markings:"faint swirling starfield patterns drifting across her skin",auraStyle:"cosmic aura"},
    clock:{markings:"thin brass seams along her wrists and the backs of her hands",bodyMarkings:"faint glowing gear-line seams at her shoulders, elbows and knees"},
    vigil:{auraStyle:"moonlit aura"}};
  const FL={synth:"sovereign valkyrie android automaton golem hologram cipher archive medic companion seraph nereid vector voyager glitch muse lullaby bloom titan prototype",
    void:"horizon eclipse umbra penumbra oblivion hush aurora comet nova entropy pulsar cradle quasar singularity rapture maw stardust wraith nebula hollow",
    clock:"regent chronicle pendulum mainspring gearwright sundial hourglass metronome almanac tourbillon",
    vigil:"augur nightmare reverie insomnia seance vesper lantern grimoire lethe portent"};
  const FOF=h=>Object.keys(FL).find(k=>FL[k].split(" ").includes(h))||null;
  const XTRA={siren:{bodyForm:"mermaid tail (no legs)",earStyle:"fin-like ears"},griffin:{tailStyle:"tufted lion tail",wingStyle:"great feathered eagle wings"},reindeer:{hornStyle:"reindeer antlers"},stag:{hornStyle:"branching antlers"},
    phoenix:{wingStyle:"fiery feathered wings",auraStyle:"fiery aura"},singularity:{wingStyle:"black dragon wings"},valkyrie:{wingStyle:"mechanical feathered wings"},
    seraph:{auraStyle:"starlight aura"},golem:{hornStyle:"curled ram horns"},hollow:{hornStyle:"curled ram horns"},nightmare:{hornStyle:"small dark horns"}};
  const HUMAN=["skinTone","undertone","skinFinish","faceShape","noseShape","browShape","markings"];
  const OPTF=new Set(["earStyle","hornStyle","tailStyle","wingStyle","fangClawStyle","auraStyle","markings","bodyMarkings","expression","posture"]);
  let added=0;
  const addOpt=(f,v)=>{if(!OPTF.has(f)||typeof v!=="string"||!v||v[0]==="@"||!Array.isArray(CHAR[f]))return;
    if(CHAR[f].some(x=>x[0]===v))return;CHAR[f].push([v,f==="expression"||f==="posture"?"Furry":"Creature features"]);added++};
  Object.keys(NEW).forEach(n=>Object.entries(AUTO_TRAITS[n+"-girl"]||{}).forEach(([f,v])=>addOpt(f,v)));
  const SPN=n=>((SPECIES_INFO[n]||{}).legacy||[])[0];
  let mapped=0;const bad=[];
  ACAD.HOUSES.forEach(h=>{const t=tplById(h+"fzx"),sp=SPEC[h];if(!t)return;
    if(!sp||!SPECIES_INFO[sp]){bad.push(h+":"+sp);return}
    const c=Object.assign({},t.c);HUMAN.forEach(k=>delete c[k]);
    const pats=((ANIMALS.species[SPN(sp)]||{}).patterns)||[];
    Object.assign(c,{subjectType:sp},ANIMALS.species[SPN(sp)]?{animalForm:"Full (beast-like anthropomorph)"}:{},pats.length?{animalPattern:"auto"}:{},FACT[FOF(h)]||{},XTRA[h]||{});
    t.c=c;
    /* every value these looks use is a pickable studio option */
    Object.entries(c).forEach(([f,v])=>addOpt(f,v));
    const set=((ACAD.HOUSE_COSTUMES&&ACAD.HOUSE_COSTUMES.setting)||{})[h]||"a softly lit bedroom";
    t.out=Object.assign({},t.out,{must:`an anime style with high detail, completely nude, ${set}, and particular emphasis on highly detailed fur, hair and eyes`});
    mapped++});
  ACAD.FURRY.studio={mapped,bad,newSpecies:Object.keys(NEW).length,optionsAdded:added};
})();
