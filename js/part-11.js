/* ---- v210: the new houses' lore, written to parallel each sister house's. The clone pass (girls210.js) swaps every
   sister phrase for the new girl's own: her room, her setting light, her outdoor spot, her motif, her pet name, her
   descriptor tags for the Real and Anime close-ups, her partner Pokemon. "words" are the sister's animal and motif wording
   and "colors" her palette wording in free text; both are swapped only in the new girl's own copies (and her partners').
   touch: setting line added to shared settings · room/roomL: her bedroom, short and long · out: her outdoor spot
   g: Real/Anime identity tags {id, fig, col, out, light, room, bath} · fx: anime light effects
   mot: magical-heroine brooch motif · mot2: embroidery motif · tmot: travel print motif · emb: superhero emblem · pk: trainer Pokemon */
const NEWLORE={
lioness:{touch:"with amber-and-gold banners and warm savanna light",room:"her sunlit trophy suite",roomL:"her sunlit trophy suite with a view of the savanna",out:"a sunlit savanna lookout at golden hour",
  g:{id:"hip-length thick glossy honey-gold hair in a high ponytail with bronze highlights and a terracotta underlayer, curtain bangs, amber eyes, golden tan skin, soft dimples",fig:"tall, athletic hourglass, large breasts",col:"terracotta",
    out:"a golden savanna at sunset, tall grass",light:"golden hour, warm sunlight, rim light",room:"a sunlit bedroom with amber curtains",bath:"a sandstone bathtub, candles, amber-and-gold tiles"},
  fx:"lens flare, golden light, drifting pollen",mot:"lion-paw",mot2:"lion-paw",tmot:"sunburst",emb:"roaring-lion",pk:"a Litleo bounding proudly at her side",
  words:[["spread griffin wings","roaring lion heads"],["tiny griffin wings","tiny lion heads"],["griffin wings","lion heads"],["griffin heads","lion heads"],["rampant griffin","rampant lion"],
    ["griffin-feather","lion-paw"],["griffin-claw","lion-claw"],["feather-and-claw embroidery","lion-paw embroidery"],["feather embroidery","sunburst embroidery"],["feather-trim","fringe-trim"],
    ["feather print","sunburst print"],["feathered epaulettes","gold-fringed epaulettes"],["captain's quarters","trophy suite"],["captain's suite","trophy suite"],["captain's chair","throne-like armchair"],
    ["overlooking the harbor","overlooking the savanna"],["a view of the harbor","a view of the savanna"],["the ship's bow at sunset","a sunset safari lookout"],["the top of the Academy lighthouse","the top of a sunlit rock outcrop"]],
  colors:[["chocolate brown","honey gold"],["chocolate-brown","honey-gold"],["crimson-and-gold","amber-and-gold"],["crimson curtains","amber curtains"],["crimson banners","amber banners"]]},
panda:{touch:"with soft lantern light and bamboo screens",room:"a cozy bamboo-screened bedroom",roomL:"a cozy bamboo-screened bedroom with a fluffy quilt",out:"a misty bamboo grove path",
  g:{id:"waist-length soft wavy black hair in a half-up bun with a snow-white underlayer and blush-pink highlights, wispy bangs, big round dark eyes, porcelain skin, rosy cheeks",fig:"soft, voluptuous, very large breasts",col:"bamboo green",
    out:"a misty bamboo forest, soft sunbeams",light:"soft diffused daylight, mist",room:"a cozy bedroom with paper lanterns and a fluffy quilt",bath:"a wooden soaking tub, bamboo screens, steam"},
  fx:"bamboo leaves, soft sunbeams",mot:"bamboo-heart",mot2:"bamboo-leaf",tmot:"bamboo-leaf",emb:"panda-face",pk:"a Pancham hugging her leg, chewing on a bamboo leaf",
  words:[["fluffy badger-striped onesie","fluffy panda onesie"],["badger-striped","panda-patterned"],["striped badger-pelt patterns","black-and-white bamboo patterns"],["badger pelt","panda-print fur wrap"],
    ["yellow honeycomb embroidery","green bamboo-leaf embroidery"],["honeycomb-heart","bamboo-heart"],["honeycomb","bamboo-leaf"],["burrow-like","den-like"],["a yellow fur rug","a black-and-white fur rug"],
    ["warm honey-gold light","soft lantern light"],["honey-gold light","soft lantern light"],["honey-gold backdrop","bamboo-green backdrop"],["Honey vat","Honey vat"],["Honey and drool","Honey and drool"]],
  colors:[["mustard yellow","bamboo green"],["mustard-yellow","bamboo-green"],["Mustard yellow","Bamboo green"],["regal yellow","regal black"]]},
firefly:{touch:"under a violet dusk sky with fireflies glowing all around",room:"a glass-roofed attic bedroom glowing with string lights",roomL:"a glass-roofed attic bedroom glowing with string lights",out:"a summer meadow at dusk, fireflies rising",
  g:{id:"mid-back midnight-indigo wolf cut with chartreuse inner layers and gold streaks, see-through bangs, glowing chartreuse eyes, peachy fair skin, soft freckles",fig:"petite, slim, medium breasts",col:"chartreuse",
    out:"a summer meadow at dusk, glowing fireflies",light:"dusk, warm bokeh, soft ambient light",room:"an attic bedroom with string lights and plants",bath:"a glass-roofed bathroom, lantern jars, dusk light"},
  fx:"glowing fireflies, light particles",mot:"firefly-lantern",mot2:"firefly",tmot:"firefly",emb:"glowing-firefly",pk:"a Volbeat glowing on a rock behind her",
  words:[["outstretched raven feathers","glowing firefly wings"],["layered raven feathers","layered gossamer wings"],["raven feathers","firefly wings"],["raven-feather","firefly"],
    ["bronze star-and-feather embroidery","gold firefly embroidery"],["Two black birds over a chessboard","A firefly and a raccoon over a chessboard"],["crescent-moon brooch","firefly-lantern brooch"],["crescent-moon emblem","glowing-firefly emblem"],["star print","firefly print"]],
  colors:[["midnight blue","midnight indigo"],["midnight-blue","midnight-indigo"],["Midnight blue","Midnight indigo"],["navy blue","chartreuse"],["storm blue","black"],["Storm blue","Black"],["storm-blue","black"]]},
scorpion:{touch:"in smoldering crimson light with gold accents",room:"an obsidian-and-gold penthouse bedroom",roomL:"an obsidian-and-gold penthouse bedroom",out:"a moonlit desert palace terrace",
  g:{id:"past-the-waist sleek obsidian-black hair with blunt bangs and a crimson underlayer, antique-gold catlike eyes, golden olive skin, a beauty mark beneath one eye",fig:"tall, exaggerated hourglass, large breasts",col:"crimson",
    out:"a desert palace terrace at night, lanterns, dunes",light:"warm lantern light, night, rim light",room:"a penthouse bedroom with crimson silk and gold",bath:"an obsidian marble bathtub, gold fixtures, candlelight"},
  fx:"desert wind, drifting sand, golden sparks",mot:"scorpion",mot2:"curled-scorpion",tmot:"scorpion-tail",emb:"golden-scorpion",pk:"a Drapion crouched menacingly at her feet",
  words:[["coiled-serpent","curled-scorpion"],["serpent-scale","scorpion-tail"],["snake-scale","scorpion"],["snake-chain body jewelry","gold-chain body jewelry"],["snake-chain","gold-chain"],
    ["a scale-beaded bodice","a gold-beaded bodice"],["scale-patterned","gold-patterned"],["scale pattern","gold pattern"],["scale-print","gold-print"],["scale-trim","gold-trim"],["scale trim","gold trim"],
    ["micro scaled halter bodysuit","micro gold-chain halter bodysuit"],["sheer scaled thigh-high stockings","sheer gold-dusted thigh-high stockings"],["snakeskin print","scorpion print"],
    ["small coiled snake hair clips","small gold scorpion hair clips"],["plush snake toy","plush scorpion toy"],["small snake familiar coiled around her shoulders","small scorpion familiar perched on her shoulder"],
    ["scaled armor bikini top with a serpent clasp","gold armor bikini top with a scorpion clasp"],["scaled armor bikini top with a {c2} serpent clasp","gold armor bikini top with a {c2} scorpion clasp"],["silver serpent-scale embroidery","gold scorpion embroidery"],["coils down","slides down"],
    ["coiling back against","arching back against"],["coiled back against","arched back against"],["snakeskin shoulder wrap","desert-silk shoulder wrap"],["cobra headdress","golden scorpion headdress"],
    ["snake arm cuffs","gold scorpion arm cuffs"],["coiling serpents","curling scorpion tails"],["snake heads","scorpion stingers"],["coiled snakes","scorpion tails"],["crest of a coiled serpent","crest of a golden scorpion"],
    ["coiling up in a green glow","curling up in a crimson glow"],["crown of coiled serpents","crown of golden scorpions"],["glowing green venom","glowing crimson venom"],["coiled serpent ring","golden scorpion ring"],
    ["emerald drapes","crimson drapes"],["emerald velvet","crimson velvet"]],
  colors:[["emerald green","antique gold"],["emerald-green","antique-gold"],["Emerald green","Antique gold"],["platinum-blonde","obsidian-black"],["heather gray","bronze"]]},
tiger:{touch:"with a tropical sunset glowing through jungle leaves",room:"a jungle loft bedroom",roomL:"a jungle loft bedroom with a striped throw",out:"a jungle trail at sunset",
  g:{id:"waist-length tangerine-orange hair with bold black tiger streaks and a snow-white underlayer, side-swept bangs, amber eyes, small whisker marks on the cheeks, warm tan skin",fig:"tall, toned athletic build, large breasts",col:"tangerine orange",
    out:"a jungle waterfall at sunset, lush leaves",light:"sunset, warm rim light, dappled light",room:"a jungle loft bedroom with a striped throw",bath:"a stone jungle shower, ferns, a waterfall spout"},
  fx:"sunset glow, drifting leaves",mot:"tiger-stripe",mot2:"roaring-tiger",tmot:"tiger-stripe",emb:"roaring-tiger",pk:"an Incineroar crouched beside her",
  words:[["howling wolf heads","roaring tiger heads"],["howling-wolf","roaring-tiger"],["howling wolf","roaring tiger"],["wolf-fang pendant","tiger-claw pendant"],["wolf-moon","tiger-stripe"],["moon-and-pine","tiger-stripe"],
    ["wolfish crouches","feline crouches"],["wolfish crouch","feline crouch"],["Pack hunt","Big cat hunt"],["howls","roars"],["howling","roaring"],["howl","roar"],
    ["a fur rug","a striped rug"],["fur rug","striped rug"],["a fur throw","a striped throw"],["fur throw","striped throw"],["log cabin","jungle loft"],["cabin fire","fire pit"]],
  colors:[["steel gray","tangerine orange"],["steel-gray","tangerine-orange"],["Steel gray","Tangerine orange"],["ice-blue moon-and-pine embroidery","amber tiger-stripe embroidery"]]},
butterfly:{touch:"in soft, shimmering morning light with blue butterflies drifting",room:"a sunlit bedroom draped in blue silk",roomL:"a sunlit bedroom draped in blue silk",out:"a wildflower meadow path at dawn",
  g:{id:"hip-length silky electric-blue hair in butterfly layers with sky-blue inner layers and silver strands over a black underlayer, curtain bangs, big doe-like sky-blue eyes, porcelain skin",fig:"lithe dancer's build, small-to-medium breasts",col:"electric blue",
    out:"a wildflower meadow at dawn, blue butterflies drifting",light:"dawn, soft diffused light, mist",room:"a sunlit bedroom with blue silk curtains",bath:"a white freestanding bathtub, blue silk curtains, morning light"},
  fx:"floating butterflies, morning mist",mot:"butterfly",mot2:"butterfly",tmot:"butterfly",emb:"butterfly-wing",pk:"a Vivillon fluttering beside her",
  words:[["swan wings folded across her chest","butterfly wings spread across her chest"],["swan-feather crown","butterfly-wing crown"],["swan-feather","butterfly-wing"],["swan feathers","butterfly wings"],["swan wings","butterfly wings"],["swan-wing","butterfly-wing"],
    ["swans gliding by","butterflies fluttering by"],["white feathers drifting down","blue butterflies drifting down"],["white feathers drifting past the window","blue butterflies drifting past the window"],["white feathers drifting","blue butterflies drifting"],
    ["White feathers","Blue butterflies"],["white feathers","blue butterflies"],["floating feathers","floating butterflies"],["feathers settling on her skin","butterflies settling on her skin"],["as feathers drift down","as butterflies drift past"],
    ["shower of white feathers","shower of blue butterflies"],["strewn with feathers","strewn with petals"],["feather trim","shimmer trim"],["feather-trim","shimmer-trim"],["feathered bodice","sequined bodice"],["feather filigree","wing filigree"],
    ["rose-gold swan-feather embroidery","silver butterfly-wing embroidery"],["a feather drifting on the water","a butterfly resting on the water"],["fluffy swan-white pajama top","fluffy sky-blue pajama top"],
    ["white feather mantle","shimmering wing-shaped mantle"],["black feathered ballet leotard","black butterfly-winged ballet leotard"],["black feather tutu","black tulle tutu"],["black feather headpiece","black butterfly headpiece"],
    ["pearl-white dragon with feathered wings","electric-blue dragon with shimmering wings"],["feather hairpiece","butterfly hairpiece"],["lotus print","butterfly print"],["while swans glide past","while butterflies flutter past"]],
  colors:[["pearl white","electric blue"],["pearl-white","electric-blue"],["Pearl white","Electric blue"],["dusty rose","sky blue"],["dusty-rose","sky-blue"]]},
phoenix:{touch:"lit by flickering firelight and a sunset-gold glow",room:"a sun-gold tower bedroom",roomL:"a sun-gold tower bedroom",out:"a sunlit clifftop at sunset",
  g:{id:"hip-length thick glossy scarlet hair in long side-swept waves with sunset-orange and golden-yellow streaks, long side bangs, golden eyes, light golden tan skin, a beauty mark on the cheek",fig:"voluptuous bombshell, very large breasts",col:"scarlet",
    out:"a clifftop at sunset, the sky on fire",light:"sunset, warm rim light, lens flare",room:"a tower bedroom with scarlet silk drapes",bath:"a copper bathtub in a sunset-gold bathhouse, candles"},
  fx:"floating embers, glowing feathers",mot:"phoenix-flame",mot2:"phoenix",tmot:"flame",emb:"rising-phoenix",pk:"a Talonflame perched behind her, wings ablaze",
  words:[["dragon scales and claws","phoenix feathers and flames"],["dragon-heart","phoenix-flame"],["gold dragon-scale embroidery","gold fire-feather embroidery"],["dragon-scale trim","fire-feather trim"],["dragon-scale pauldron","fire-feather pauldron"],
    ["dragon-scale breastplate","fire-feather breastplate"],["cozy dragon-scale hooded onesie with little horns and a tail","cozy phoenix hooded onesie with little wings and tail feathers"],["dragon-scale","fire-feather"],["dragon scale","fire-feather"],
    ["scale embroidery","feather embroidery"],["scale-edged","feather-edged"],["small curved horn headband","small flame-feather headband"],["large bat wings (costume)","large fiery feathered wings (costume)"],
    ["long scaled dragon tail","long fiery phoenix tail feathers"],["plush spa headband with small horns","plush spa headband with small flame feathers"],["horn spikes","flame-feather spikes"],["scaled hide shoulder wrap","fire-feather shoulder wrap"],
    ["dragon horns","phoenix feathers"],["red-draped tower","sun-gold tower"]],
  colors:[["crimson red","scarlet"],["Crimson red","Scarlet"],["burgundy","sunset orange"],["Burgundy","Sunset orange"],["cheeks flushed crimson","cheeks flushed crimson"],["cheeks crimson","cheeks crimson"],["face is crimson","face is crimson"],
    ["regal crimson","regal scarlet"],["A crimson","A scarlet"],["crimson backdrop","scarlet backdrop"],["crimson silk","scarlet silk"],["crimson rope","scarlet rope"],["crimson battle crown","scarlet battle crown"],["Crimson cheer","Scarlet cheer"],["and crimson over-the-knee","and scarlet over-the-knee"]]},
unicorn:{touch:"with crystals, pastel flowers and soft rainbow light",room:"a pastel tower bedroom",roomL:"a pastel tower bedroom, rainbow light through the crystal window",out:"a pastel flower meadow under a rainbow",
  g:{id:"past-the-waist soft wavy pearl-white hair with pastel lavender, pastel pink and mint-green streaks, wispy curtain bangs, very large sparkling lavender eyes, rosy fair skin, a small jewel on the forehead",fig:"very tall, slender, full breasts",col:"pastel lavender",
    out:"a pastel flower meadow, a rainbow in the sky",light:"soft daylight, pastel light, sparkles",room:"a pastel tower bedroom with crystal windows",bath:"a pearl-white bathtub, rainbow light through crystals"},
  fx:"rainbow sparkles, sunbeam",mot:"star",mot2:"unicorn-horn-and-star",tmot:"star",emb:"unicorn-horn",pk:"a Galarian Ponyta standing beside her, its pastel mane glowing",
  words:[["antler-and-oak-leaf","unicorn-horn-and-star"],["antler headband with bells","unicorn-horn headband with bells"],["small antler-style flower crown","small unicorn-horn flower crown"],["plush spa headband with small antlers","plush spa headband with a small unicorn horn"],
    ["antler clasps","unicorn-horn clasps"],["a stag-antler tattoo","a unicorn tattoo"],["antler crown woven with flowers","unicorn-horn crown woven with flowers"],["antler crown","unicorn-horn crown"],["antlers and oak leaves","unicorn horns and stars"],
    ["small antlers","a small unicorn horn"],["stag antlers","unicorn horns"],["antler horns","a spiraling horn"],["antler-shaped hair comb","unicorn-horn hair comb"],["a antler emblem","a unicorn-horn emblem"],["antler emblem","unicorn-horn emblem"],
    ["a deer watches from the trees","a unicorn watches from the trees"],["deer hide","pastel silk"],["deer","unicorn"],["leaf-sequin","star-sequin"],["leaf print","star print"],["leaf-print","star-print"],["leaf brooch","star brooch"],["leaf embroidery","star embroidery"]],
  colors:[["forest green","pearl white"],["forest-green","pearl-white"],["Forest green","Pearl white"],["chestnut brown","pastel lavender"],["chestnut-brown","pastel-lavender"],["moss green","silver"]]},
dolphin:{touch:"with a turquoise lagoon sparkling in the background",room:"a seaside cabana bedroom",roomL:"a seaside cabana bedroom with the lagoon outside",out:"a lagoon pier at sunset",
  g:{id:"waist-length salt-tousled aqua hair in a high side ponytail with a seafoam-green underlayer and sun-bleached white tips, round aqua eyes, light tan skin, faint tan lines",fig:"tall, toned swimmer's build, medium-large breasts",col:"aqua",
    out:"a turquoise lagoon at sunset, sea spray",light:"sunset, backlight, warm rim light",room:"a seaside cabana bedroom, the lagoon outside",bath:"an outdoor seaside shower, shells, the lagoon behind"},
  fx:"water splash, sparkling sea spray",mot:"wave",mot2:"wave-and-dolphin",tmot:"wave",emb:"leaping-dolphin",pk:"a Palafin leaping out of the water behind her",
  words:[["sharp-toothed smirk","cheeky smirk"],["sharp-toothed grin","cheeky grin"],["toothy grin","cheeky grin"],["toothy mouth","open mouth"],["with sharp teeth","with a cheeky smile"],["her sharp teeth","her bright smile"],["sharp teeth","a bright smile"],
    ["careful with her sharp teeth","careful with her teeth"],["shark tooth earrings","dolphin charm earrings"],["shark-tooth necklace","dolphin pendant necklace"],["shark-tooth pendant","dolphin pendant"],["shark-tooth clasp","dolphin clasp"],
    ["fin-shaped train","wave-shaped train"],["tooth-trimmed hood","wave-trimmed hood"],["jagged tooth-edged neckline","wave-edged neckline"],["shark fins and cresting waves","leaping dolphins and cresting waves"],["shark teeth","pearls"],
    ["wave-and-fin","wave-and-dolphin"],["sharkskin shoulder wrap","sea-silk shoulder wrap"],["Predator and prey","Splash and dash"],["I bite♡","I splash♡"],["Bite?♡","Splash?♡"]],
  colors:[["steel blue","aqua"],["steel-blue","aqua"],["Steel blue","Aqua"],["coral red","coral pink"],["coral-red","coral-pink"]]},
leopard:{touch:"with snow drifting softly past the chalet window",room:"a snowy chalet bedroom, snow drifting past the window",roomL:"a snowy chalet bedroom, snow drifting past the frosted window",out:"a snowy mountain ridge at dusk, snow drifting",
  g:{id:"hip-length feathery platinum-silver hair in long princess layers over a charcoal underlayer with pale pink highlights, wispy bangs, huge glossy ice-blue eyes, very fair skin, faint gray rosette freckles, a beauty mark above the lip",fig:"petite, slim, very large breasts, top-heavy",col:"ash gray",
    out:"a snowy mountain ridge, snowflakes falling",light:"soft winter daylight, soft rim light",room:"a snowy chalet bedroom, snow past the frosted window",bath:"a cedar hot tub on a snowy chalet deck at night, lanterns"},
  fx:"falling snowflakes, frosty breath",mot:"snowflake",mot2:"snowflake",tmot:"tiny snow leopard",emb:"snow-leopard-and-snowflake",pk:"a Glaceon in a tiny matching pink scarf padding at her heels",
  low:"snow leopard",
  words:[["with a white belly and a flipper-trimmed hood","with a spotted belly and a fur-trimmed hood"],["tuxedo-style lapel trim","faux-fur lapel trim"],["tuxedo-style gown","rosette-print gown"],["tuxedo-front bunny leotard","rosette-print bunny leotard"],
    ["tuxedo-style stage leotard","rosette-print stage leotard"],["tiny orange knitted baby hat with little penguin eyes and a beak","tiny pink knitted baby hat with little snow leopard ears"],["little penguins waddle","little penguins waddle"],
    ["chunky orange knit scarf","chunky pale pink knit scarf"],["orange knit scarf","pale pink knit scarf"],["orange scarf","pale pink scarf"],["orange towel","pale pink towel"],["orange satin ribbon","pale pink satin ribbon"],["snowed-in cabin","snowy chalet"],["snowy cabin","snowy chalet"]],
  colors:[["Ice blue cheer","Ice blue cheer"]]},
lynx:{touch:"at dusk in misty mountain moonlight among silver birches",room:"a misty mountain lodge room",roomL:"a misty mountain lodge room with paper screens and lanterns",out:"a misty mountain pass at dusk",
  g:{id:"waist-length dusty-mauve hair in a loose side braid with a smoky-gray underlayer and champagne highlights, long side bangs over one eye, champagne eyes, warm beige skin, a small mole on the cheek",fig:"voluptuous, bottom-heavy hourglass, large breasts",col:"dusty mauve",
    out:"a misty mountain pass at dusk, silver birches",light:"dusk, soft moonlight, mist",room:"a mountain lodge room with paper screens",bath:"a misty cedar onsen at dusk, lanterns"},
  fx:"silver mist, moonbeams",mot:"lynx-paw",mot2:"lynx-paw",tmot:"lynx-and-moon",emb:"crouching-lynx",pk:"a Luxray curling up around her feet",
  words:[["amber foxlike eyes","champagne catlike eyes"],["foxlike eyes","catlike eyes"],["large bushy fox tail","short fluffy lynx tail"],["fox-eared hooded onesie with a bushy tail","lynx-eared hooded onesie with a short fluffy tail"],
    ["A kitsune costume","A lynx-girl costume"],["fox-tail pattern","lynx-paw pattern"],["fox-tail pocket","lynx-paw pocket"],["fox-tail embroidery","lynx-paw embroidery"],["amber-gold flame-tail embroidery","champagne lynx-paw embroidery"],
    ["fox-and-flame","lynx-and-moon"],["fox-flame","lynx-paw"],["fluffy fox ears","tufted lynx ears"],["nine-tailed-fox","crouching-lynx"],["a nine-tailed fox","a crouching lynx"],["fox tails and foxfire flames","lynx tufts and silver moons"],
    ["blue foxfire","silver moonfire"],["FOXFIRE♡","MOONLIGHT♡"],["foxfire","moonfire"],["kitsune","lynx-girl"],["nine-tailed fire dragon","silver-furred storm dragon"],["crown of foxfire","crown of silver moonlight"],["stone foxes","stone lynxes"],
    ["sly, fox-like smirk","sly, catlike smirk"],["fox mask","lynx mask"],["Kitsune Lantern","Moonlit Lodge"]],
  colors:[["burnt orange","dusty mauve"],["burnt-orange","dusty-mauve"],["Burnt orange","Dusty mauve"]]},
hummingbird:{touch:"with hibiscus blooms and glittering string lights everywhere",room:"a greenhouse bedroom full of hibiscus",roomL:"a greenhouse bedroom full of hibiscus and string lights",out:"a tropical flower garden full of hibiscus",
  g:{id:"glossy chin-length ruby-pink wavy bob with an emerald-green underlayer and violet inner strands, asymmetrical bangs, large emerald eyes, warm beige skin, dewy skin",fig:"slim, petite waist, medium breasts",col:"ruby pink",
    out:"a tropical flower garden, hibiscus blooms, hummingbirds",light:"bright daylight, dappled light, sparkles",room:"a greenhouse bedroom with hibiscus and string lights",bath:"a glass shower with hibiscus tiles, steam"},
  fx:"hibiscus petals, sparkles, hearts",mot:"hummingbird-heart",mot2:"heart-and-hummingbird",tmot:"hibiscus",emb:"hummingbird-heart",pk:"a tiny Cutiefly hovering by her shoulder",
  words:[["a fluffy creamsicle lovebird onesie","a fluffy ruby hummingbird onesie"],["a creamsicle feathered bikini top","a ruby feathered bikini top"],["mint feathered leg warmers","emerald feathered leg warmers"],
    ["mint-green lovebird-and-feather embroidery","emerald hummingbird-and-feather embroidery"],["winged-heart","hummingbird-heart"],["orange-blossom","hibiscus"]],
  colors:[["creamsicle orange","ruby pink"],["creamsicle-orange","ruby-pink"],["soft peach","violet"],["soft-peach","violet"],["powder blue","white"],["creamsicle","ruby-pink"]]},
peacock:{touch:"bathed in jewel-toned sunset light with palm silhouettes",room:"a jeweled palace bedroom",roomL:"a jeweled palace bedroom with palms outside",out:"a palace garden with peacocks at sunset",
  g:{id:"hip-length peacock-blue drill ringlets with teal, violet and gold streaks, split bangs, violet eyes, golden beige skin, a subtle beauty mark",fig:"extremely curvy hourglass, huge breasts",col:"peacock blue",
    out:"a palace garden at sunset, peacocks, fountains",light:"sunset, jewel-toned light, warm rim light",room:"a palace bedroom with teal silk and gold",bath:"a sunken jeweled bathtub, teal-and-gold tiles"},
  fx:"peacock feathers, golden sparkles",mot:"peacock-feather",mot2:"peacock",tmot:"peacock-feather",emb:"peacock",pk:"a Togekiss spreading its wings beside her",
  words:[["heart brooch","peacock-feather brooch"],["pink feather mantle","iridescent peacock-feather mantle"],["crown of pink feathers","crown of peacock feathers"],["feather boa","peacock-feather boa"],["feathered corset bodysuit","peacock-feathered corset bodysuit"],
    ["palm-frond","peacock-feather"],["pink villa","jeweled palace"],["Princess carry","Princess carry"],["Princess Carry","Princess Carry"],["a lagoon at sunset with flamingos wading","a palace garden at sunset with peacocks strutting"]],
  colors:[["hot pink","peacock blue"],["hot-pink","peacock-blue"],["Hot pink","Peacock blue"],["golden yellow","ivory"],["salmon","gold"]]},
jellyfish:{touch:"in pulsing pink-and-violet bioluminescent light",room:"a bedroom with a glowing jellyfish tank",roomL:"a bedroom with a glowing jellyfish tank wall",out:"a moonlit beach glowing with bioluminescent waves",
  g:{id:"past-the-waist straight lavender jellyfish cut with neon-pink inner hair and cyan tips over a deep-violet underlayer, hime bangs, sleepy cyan eyes, pale ivory skin, a teardrop mark beneath one eye",fig:"tall, slender, large breasts",col:"lavender",
    out:"a jellyfish aquarium tunnel, glowing jellyfish all around",light:"pulsing bioluminescent light, soft glow",room:"a bedroom lit by a glowing jellyfish tank",bath:"a dark bathroom lit by glowing jellyfish tanks, violet light"},
  fx:"bubbles, glowing jellyfish, bioluminescence",mot:"jellyfish-pearl",mot2:"tentacle",tmot:"tentacle",emb:"glowing-jellyfish",pk:"a Jellicent drifting lazily beside her",
  words:[["fluffy octopus onesie","fluffy jellyfish onesie"],["plush octopus hugged close","plush jellyfish hugged close"],["fluffy octopus hooded onesie","fluffy jellyfish hooded onesie"],["plush octopus toy","plush jellyfish toy"],
    ["octopus-and-wave","jellyfish-and-wave"],["small octopus familiar draped over her shoulder","small jellyfish familiar drifting over her shoulder"],
    ["a kraken tattoo whose tentacles wind across his chest and down one arm","a jellyfish tattoo whose tentacles trail across his chest and down one arm"],["giant octopus tank","giant jellyfish tank"],
    ["a huge red octopus drifts past the glass","a huge glowing jellyfish drifts past the glass"],["points at the octopus","points at the jellyfish"],["like an octopus","like a jellyfish"],["a curious octopus watches from the other side","a glowing jellyfish drifts past on the other side"],
    ["an octopus drifts past","a jellyfish drifts past"],["a drifting octopus","a drifting jellyfish"],["an octopus drifting past","a jellyfish drifting past"],["octopus shadows","jellyfish shadows"],
    ["octopus-ink painted hide wrap","glowing jellyfish-silk wrap"],["black ink rum cocktail","glowing blue rum cocktail"],["tentacle emblem","glowing-jellyfish emblem"]],
  colors:[["deep violet","neon pink"],["deep-violet","neon-pink"],["Deep violet","Neon pink"],["dark teal backdrop","dark violet backdrop"],["teal bioluminescence","pink bioluminescence"],["teal trim","cyan trim"],["teal collar","cyan collar"],["teal cap","cyan cap"],["Teal cheer","Cyan cheer"],["teal tentacle-curl","cyan tentacle-curl"]]},
crane:{touch:"with a moonlit pond view and paper cranes hanging overhead",room:"a minimalist zen bedroom",roomL:"a minimalist zen bedroom",out:"a moonlit garden bridge at dusk",
  g:{id:"knee-length silky snow-white hime cut with a black underlayer and vermilion inner strands, straight bangs, dark brown almond eyes, ivory skin, a small mole above the lip",fig:"very tall, lean, medium breasts",col:"vermilion red",
    out:"a moonlit zen garden, a red bridge over a pond",light:"moonlight, soft lantern light",room:"a minimalist zen bedroom with paper screens",bath:"a hinoki soaking tub with a moonlit pond view"},
  fx:"paper cranes, moonlight reflections",mot:"flying-crane",mot2:"flying-crane",tmot:"flying-crane",emb:"flying-crane",pk:"a graceful Altaria gliding beside her",
  nolow:true,
  words:[["leaping-salmon","flying-crane"],["salmon crest","crane crest"],["fluffy salmon hooded onesie with a fin-trimmed hood","fluffy crane hooded onesie with a feather-trimmed hood"],["salmon onesie","crane onesie"],["salmon fins","crane feathers"],
    ["salmon scales","crane feathers"],["while the salmon he taught her to love run upstream around her ankles","while the cranes he taught her to love wade through the shallows around her"],
    ["while salmon run upstream around her ankles","while cranes wade through the shallows around her"],["as salmon leap upstream past her","as cranes take flight past her"],["watches salmon leap upstream","watches cranes take flight"],
    ["Swimming upstream was supposed to be her thing","Grace was supposed to be her thing"],["UPSTREAM♡","SO GRACEFUL♡"],["It's spawning season♡","It's mating season♡"],["during spawning season","during mating season"],
    ["scale accents","feather accents"],["scale-shimmer","feather-shimmer"],["scale sequins","feather sequins"],["scale-sequin","feather-sequin"],["scale embroidery","feather embroidery"],["scale-trim","feather-trim"],["scale-knit","feather-knit"],
    ["scale-print","feather-print"],["scale-panelled","feather-panelled"],["fishtail hem","feathered hem"],["mermaid-tail skirt with scale sequins","crane-feather skirt with sequins"],["small fins","small crane feathers"],["small {c2} fins","small {c2} crane feathers"],["fin-trimmed hood","feather-trimmed hood"],
    ["fish-scale hide wrap","white feather wrap"],["shaped like salmon scales","shaped like crane feathers"],["crown of river reeds and silver scales","crown of river reeds and white feathers"],["Salmon cheer","Snow white cheer"],["scaled armor bikini top","feathered armor bikini top"]],
  colors:[["salmon pink","vermilion red"],["salmon-pink","vermilion-red"],["salmon","snow white"],["rose-gold","silver-gray"],["rose gold","silver gray"],["oatmeal","vermilion red"]]},
raccoon:{touch:"under a moonlit sky, stolen treasures scattered about",room:"a hideout bedroom full of stolen treasures",roomL:"a hideout bedroom full of glittering stolen treasures",out:"a moonlit back alley behind a bakery",
  g:{id:"shoulder-length ash-brown shag cut with a cream underlayer and charcoal streaks, choppy bangs, wide teal eyes, smoky raccoon-eye makeup, fair skin, freckles across the nose",fig:"short, curvy, large breasts",col:"ash brown",
    out:"a moonlit back alley, string lights",light:"night, warm bokeh, soft ambient light",room:"a cluttered hideout bedroom full of stolen treasures",bath:"a clawfoot tub in a cluttered hideout, stolen soaps on the sill"},
  fx:"glittering stolen jewels, city lights",mot:"raccoon-paw",mot2:"raccoon-mask",tmot:"paw-and-moon",emb:"raccoon-and-moon",pk:"a Galarian Zigzagoon at her feet with a stolen ring in its paws",
  words:[["Caw caw","Chitter chitter"],["CAW CAW","CHITTER CHITTER"],["CAW♡","CHITTER♡"],["CAW..","CHITTER.."],["CAW","CHITTER"],["Caw","Chitter"],["caw","chitter"],["crow-feather fan","striped paper fan"],
    ["platinum crow-feather embroidery","ash-brown raccoon-paw embroidery"],["crow-feather brooch","raccoon-paw brooch"],["crow-feather tattoo","raccoon-paw tattoo"],["crow-feather","raccoon-paw"],["crow feathers and crescent moons","raccoon tails and crescent moons"],["crow feathers","raccoon tails"],
    ["swirl of black feathers","puff of glittering dust"],["black feathers","glittering dust"],["dark feathered wings","a fluffy striped raccoon tail"],["small feathered wings","small round ears"],["feathered sleeves","fuzzy sleeves"],["feather-charm ties","charm ties"],
    ["feather-trimmed corset bodice","lace-trimmed corset bodice"],["feather-trimmed hips","lace-trimmed hips"],["feather-trimmed sleeves","fuzzy-trimmed sleeves"],["ink-blue feather print","ash-brown paw print"],["feather-and-moon print","paw-and-moon print"],
    ["feather print","paw print"],["feather embroidery","paw embroidery"],["feather lace","paw-print lace"],["feather pattern","paw pattern"],["feather-print pocket","paw-print pocket"],["feather-trimmed shoulders","fur-trimmed shoulders"],
    ["feather-trimmed stage dress","fur-trimmed stage dress"],["feather-trim hem","fur-trim hem"],["small crow familiar perched on her shoulder with a shiny button in its beak","small raccoon familiar on her shoulder with a shiny button in its paws"],
    ["black-feathered armor","riveted armor"],["perches on","crouches on"],["perches","crouches"],["perched","crouched"],["Perched","Crouched"],["giant nest woven from silver ribbon and twigs","giant pile of stolen pillows and blankets"],
    ["treasure-nest set","treasure-pile set"],["the giant nest","the pile of stolen pillows"],["arms spread like wings among the crows","arms spread wide among the raccoons"],["a moonlit city rooftop crowded with crows","a moonlit city rooftop crowded with curious raccoons"],
    ["a flock of crows perched along the railings","a band of raccoons crouched along the railings"],["among a flock of curious crows","among a band of curious raccoons"],["among a flock of crows","among a band of raccoons"],["flock","band"],
    ["where a wild crow perched every morning for six years","where a wild raccoon visited every night for six years"],["birds on branch","raccoon in a tree"],["a silver feather","a silver key"],
    ["black feather mantle with a crow skull clasp","patched fur mantle with a silver key clasp"],["shaped like crow wings","shaped like raccoon tails"],["crow wings","raccoon tails"],["crows","raccoons"],["opal pendant","stolen silver locket"],["crescent-moon","raccoon-mask"]],
  colors:[["ink blue","ash brown"],["ink-blue","ash-brown"],["Ink blue","Ash brown"],["silvery white","charcoal gray"],["silvery-white","charcoal-gray"],["dusty lavender","teal"],["dusty-lavender","teal"],["opal","silver"]]},
panther:{touch:"at night, lit by a single desk lamp and a crescent moon",room:"a velvet-dark study bedroom, books piled everywhere",roomL:"a velvet-dark study bedroom at night, books piled everywhere",out:"the Academy rooftops at midnight under a crescent moon",
  g:{id:"waist-length silky black hair in loose side-parted waves with deep-violet and plum glints, gold eyes behind rectangular glasses, deep brown skin, soft dimples",fig:"tall, voluptuous hourglass, very large breasts",col:"deep violet",
    out:"a rooftop at midnight, a crescent moon",light:"warm lamp light, moonlight",room:"a velvet-dark study bedroom lit by a single lamp",bath:"a black marble clawfoot tub at night, books stacked beside it"},
  fx:"crescent moon, floating dust motes",mot:"panther-paw",mot2:"panther-and-moon",tmot:"panther-paw",emb:"prowling-panther",pk:"a Liepard curled around her feet",
  words:[["amber owl-feather embroidery","gold panther-paw embroidery"],["owl-feather embroidery","panther-paw embroidery"],["an owl tattoo spreading its wings across his back","a panther tattoo prowling across his back"],
    ["feathery caramel-brown hair over an antique-ivory underlayer","silky black hair with deep-violet glints"],["tawny night dragon with owl-like feathers and huge amber eyes","sleek black night dragon with glowing gold eyes"],["tawny night dragon with owl-like feathers","sleek black night dragon"],
    ["crown of laurel and silver owl feathers","crown of laurel and silver panther claws"],["a plunging caramel feathered micro bodysuit","a plunging black velvet micro bodysuit"],["micro feathered bodysuit","micro velvet bodysuit"],["feathered ear-tuft headband","black cat-ear headband"],
    ["feathered harpy wings",""],["feathered wings","a sleek black tail"],["small owl familiar perched on her shoulder","small black kitten familiar on her shoulder"],["outstretched owl feathers","prowling panthers"],["layered owl feathers","layered panther claws"],["owl feathers","panther claws"],
    ["swooping down from a high ladder with her robe flaring like wings","leaping down from a high ladder with her robe flaring behind her"],["HOOT♡","PURR♡"],["an owl harpy","a panther girl"],["owl harpy","panther girl"],["an owl","a panther"],["An owl","A panther"]],
  colors:[["caramel brown","black"],["caramel-brown","black"],["Caramel brown","Black"],["antique ivory","deep violet"],["antique-ivory","deep-violet"],["espresso brown","gold"],["espresso-brown","gold"]]},
coyote:{touch:"in a sun-faded desert trailer full of thrifted treasures",room:"a sun-faded desert trailer",roomL:"a sun-faded desert trailer full of thrifted treasures",out:"a dusty desert highway at sunset",
  g:{id:"mid-back sandy-tan hair in a messy ponytail with rust-orange streaks and sun-bleached cream ends, messy fringe, turquoise eyes, golden tan skin, light freckles",fig:"compact, toned, medium breasts",col:"rust orange",
    out:"a desert highway at sunset, red rocks",light:"sunset, warm rim light, dust in the air",room:"a sun-faded trailer bedroom with string lights",bath:"a cramped trailer shower, a cracked mirror, string lights"},
  fx:"desert dust, sunset glow, string lights",mot:"coyote-paw",mot2:"key-and-coyote",tmot:"coyote-paw",emb:"howling-coyote",pk:"a Dusk Lycanroc at her feet with a stolen ring in its teeth",
  words:[["Squeak squeak","Yip yip"],["SQUEAK♡","AWOO♡"],["SQUEAK..","YIP.."],["squeaks","yips"],["squeak","yip"],["a stolen wedge of cheese","a stolen bag of beef jerky"],["wedge of cheese","bag of beef jerky"],["cheese stalls","chili stalls"],
    ["round mouse ears","pointed coyote ears"],["long thin rat tail attached at the lower back","bushy coyote tail attached at the lower back"],["long thin rat tail","bushy coyote tail"],["rat ears","coyote ears"],["rat-tail charms","coyote-tooth charms"],["rat-tail","coyote-tooth"],
    ["treasure-nest set","treasure-pile set"],["giant nest woven from silver ribbon and twigs","giant pile of thrifted blankets"],["the giant nest","the pile of thrifted blankets"],["rose quartz pendant","turquoise pendant"],["neon-lit city alley","dusty desert roadside"],["a row of rats watches from the branches","a lone coyote watches from the ridge"],["arms spread like wings among the rats","arms spread wide under the moon"],["a moonlit city rooftop crowded with rats","a moonlit desert mesa"],["a pack of rats crouched along the railings around her","a pack of coyotes howling on the ridge behind her"],["among a pack of rats","among a howling coyote pack"],["rooftop rats","desert howl"]],
  colors:[["ash gray","sandy tan"],["ash-gray","sandy-tan"],["Ash gray","Sandy tan"],["rose pink","turquoise"],["rose-pink","turquoise"],["mustard yellow","cream"]]}};

/* the headmistresses: each new girl grown up, in her sister headmistress's faculty clothes (recolored and re-crested) */
const NEWHEADS={
lioness:{c:{age:"mature woman",faceShape:"long oval face with high, defined cheekbones",expression:"regal, composed smile",impression:"a regal, commanding presence",hairStyle:"twisted chignon",bangs:"open forehead",makeupStyle:"classic glam makeup",eyelinerStyle:"classic winged eyeliner",bodySoftness:"tall, statuesque, mature hourglass figure"},
  blurb:"The Lioness headmistress: a tall, statuesque, golden-tanned woman with honey-gold hair in a twisted chignon, amber eyes and a regal, composed smile."},
panda:{c:{age:"mature woman",faceShape:"soft round face with gentle cheekbones",expression:"warm, motherly smile",impression:"a warm, nurturing presence",hairStyle:"low bun",bangs:"cute wispy bangs",makeupStyle:"soft natural makeup",bodySoftness:"soft, mature, voluptuous figure"},
  blurb:"The Panda headmistress: a soft, voluptuous woman with black hair in a low bun over a snow-white underlayer, big dark eyes, rosy cheeks and a warm, motherly smile."},
firefly:{c:{age:"mature woman",faceShape:"refined V-shaped face with high cheekbones",expression:"knowing, sparkling smile",impression:"a bright, enchanting presence",hairStyle:"French twist",bangs:"see-through wispy bangs",makeupStyle:"shimmer makeup",eyelinerStyle:"classic winged eyeliner"},
  blurb:"The Firefly headmistress: a slender woman with midnight-indigo hair in a French twist glowing chartreuse underneath, glowing eyes and a knowing, sparkling smile."},
scorpion:{c:{age:"mature woman",faceShape:"sharp, elegant face with a pointed chin and high cheekbones",expression:"cold, imperious smirk",impression:"an imperious, dangerous elegance",hairStyle:"sleek chignon",bangs:"blunt bangs",makeupStyle:"femme fatale makeup"},
  blurb:"The Scorpion headmistress: a tall, imperious woman with obsidian hair in a sleek chignon over a crimson underlayer, antique-gold eyes and a cold, imperious smirk."},
tiger:{c:{age:"mature woman",faceShape:"strong heart-shaped face with high cheekbones",expression:"fierce, confident smile",impression:"a powerful, untamed presence",hairStyle:"braided ponytail",bangs:"side-swept bangs",makeupStyle:"seductive smoky makeup"},
  blurb:"The Tiger headmistress: a tall, powerful woman with tangerine hair striped black in a thick braided ponytail, amber eyes, whisker marks and a fierce, confident smile."},
butterfly:{c:{age:"mature woman",faceShape:"oval face with balanced features",expression:"serene, graceful smile",impression:"an elegant, mature presence",hairStyle:"ballerina bun",bangs:"curtain bangs",makeupStyle:"soft natural makeup"},
  blurb:"The Butterfly headmistress: a lithe, graceful woman with electric-blue hair in a ballerina bun, sky-blue eyes and a serene, graceful smile."},
phoenix:{c:{age:"mature woman",faceShape:"refined oval face with prominent cheekbones",expression:"warm, fiery smile",impression:"a radiant, commanding presence",hairStyle:"elegant updo",bangs:"long side bangs",makeupStyle:"classic glam makeup"},
  blurb:"The Phoenix headmistress: a voluptuous woman with scarlet hair streaked sunset orange and gold in an elegant updo, golden eyes and a warm, fiery smile."},
unicorn:{c:{age:"mature woman",faceShape:"soft oval face with gentle cheekbones",expression:"gentle, dreamy smile",impression:"an ethereal, gentle grace",hairStyle:"crown braid",bangs:"wispy curtain bangs",makeupStyle:"soft natural makeup"},
  blurb:"The Unicorn headmistress: a tall, slender woman with pearl-white hair in a crown braid streaked with pastel colors, lavender eyes, a forehead jewel and a gentle, dreamy smile."},
dolphin:{c:{age:"mature woman",faceShape:"soft round face with full cheeks",expression:"bright, playful smile",impression:"a bright, sunny presence",hairStyle:"messy bun",bangs:"soft diagonal bangs",makeupStyle:"sun-bronzed makeup"},
  blurb:"The Dolphin headmistress: an athletic woman with aqua hair in a messy bun, round aqua eyes, sun-kissed skin and a bright, playful smile."},
leopard:{c:{age:"mature woman",faceShape:"softly rounded face with a delicate tapered jawline",expression:"warm, radiant smile",impression:"a warm, welcoming presence with a radiant smile",hairStyle:"loose waves",bangs:"cute wispy bangs",makeupStyle:"soft glam makeup"},
  blurb:"The Leopard headmistress: a petite, top-heavy woman with platinum-silver waves over a charcoal underlayer, ice-blue eyes, faint rosette freckles and a warm, radiant smile."},
lynx:{c:{age:"mature woman",faceShape:"refined heart-shaped face with high cheekbones",expression:"sly, amused smile",impression:"a sly, knowing, worldly allure",hairStyle:"side fishtail braid",bangs:"long side bangs over one eye",makeupStyle:"glamorous soft smoky makeup"},
  blurb:"The Lynx headmistress: a voluptuous woman with a dusty-mauve side fishtail braid, champagne eyes and a sly, amused smile."},
hummingbird:{c:{age:"mature woman",faceShape:"soft feminine face with defined cheekbones",expression:"flirty, warm smile",impression:"a vivacious, feminine presence",hairStyle:"curly bob",bangs:"asymmetrical bangs",makeupStyle:"classic glam makeup"},
  blurb:"The Hummingbird headmistress: a slim woman with a glossy ruby-pink curly bob over an emerald underlayer, emerald eyes and a flirty, warm smile."},
peacock:{c:{age:"mature woman",faceShape:"refined, softly rounded face with high cheekbones",expression:"proud, haughty smile",impression:"a glamorous, regal presence",hairStyle:"ornamental updo",bangs:"split bangs",makeupStyle:"glam glitter makeup"},
  blurb:"The Peacock headmistress: a jaw-droppingly curvy woman with peacock-blue hair in an ornamental updo streaked teal and gold, violet eyes and a proud, haughty smile."},
jellyfish:{c:{age:"mature woman",faceShape:"long, narrow face with high cheekbones",expression:"slow, dreamy smile",impression:"a cool, otherworldly beauty",hairStyle:"hime cut",bangs:"hime bangs",makeupStyle:"mermaidcore makeup"},
  blurb:"The Jellyfish headmistress: a tall, ethereal woman with a lavender hime cut glowing neon pink inside, sleepy cyan eyes and a slow, dreamy smile."},
crane:{c:{age:"mature woman",faceShape:"refined face with high cheekbones",expression:"serene, composed smile",impression:"a quiet, refined elegance",hairStyle:"chignon",bangs:"straight bangs",makeupStyle:"classic glam makeup"},
  blurb:"The Crane headmistress: a very tall, poised woman with snow-white hair in a chignon with vermilion strands, dark almond eyes and a serene, composed smile."},
raccoon:{c:{age:"mature woman",faceShape:"soft, round-cheeked face with a sly look",expression:"knowing, mischievous smirk",impression:"a teasing, worldly charm",hairStyle:"shag layers",bangs:"choppy, uneven bangs",makeupStyle:"smudged grunge makeup"},
  blurb:"The Raccoon headmistress: a short, curvy woman with ash-brown shag layers, smoky raccoon-eye makeup, teal eyes and a knowing, mischievous smirk."},
panther:{c:{age:"mature woman",faceShape:"refined oval face with high cheekbones",expression:"wise, sultry smile",impression:"a commanding, scholarly elegance",hairStyle:"sleek chignon",bangs:"slightly side-parted with loose face-framing strands",makeupStyle:"smoky evening makeup"},
  blurb:"The Panther headmistress: a tall, voluptuous woman with black hair in a sleek chignon glinting violet, gold eyes behind her glasses, deep brown skin and a wise, sultry smile."},
coyote:{c:{age:"mature woman",faceShape:"sharp, sun-weathered face with high cheekbones",expression:"wry, lopsided smile",impression:"a tough, sun-weathered allure",hairStyle:"low braided ponytail",bangs:"messy fringe",makeupStyle:"natural, barely-there makeup"},
  blurb:"The Coyote headmistress: a lean, toned woman with sandy-tan hair in a low braided ponytail, turquoise eyes, freckles and a wry, lopsided smile."}};

/* the boyfriends: each sister boyfriend's job and wardrobe, with his own look */
const NEWMEN={
lioness:{c:{eyeOne:"amber",skinTone:"warm tan",markings:"a roaring lion tattoo across his back"},
  blurb:"Her dance partner: a tall, broad-shouldered lead dancer with a dark honey-blond mane, warm amber eyes, light stubble and a roaring lion tattoo across his back. Dance-floor black, a leather jacket, sweatpants or nothing at all."},
panda:{c:{eyeOne:"dark brown",facialHair:"thick full beard",markings:"laugh lines around the eyes"},
  blurb:"Her gentle giant: a towering, burly baker with a thick black beard, short curls, warm dark eyes, a hairy chest and the softest smile; he steams her favorite buns every morning. Flannel and jeans, a henley with rolled sleeves, or shirtless."},
firefly:{c:{eyeOne:"hazel",skinTone:"warm beige",undertone:"peach",markings:"a firefly constellation tattoo along one forearm"},
  blurb:"Her quiet match: a tall, lean astronomer with a dark brown half-up man bun, warm hazel eyes behind round wire glasses, designer stubble and a tattoo of glowing fireflies along one forearm. A turtleneck and long coat, a shirt and waistcoat, or an open shirt."},
scorpion:{c:{eyeOne:"dark brown",skinTone:"olive",undertone:"warm",markings:"a scorpion tattoo curling across the chest and shoulder"},
  blurb:"The only man who can put her in her place: tall, cold and immaculate, with slicked-back jet-black hair, piercing dark eyes, a knowing smirk and a scorpion tattoo curling across his chest. A black suit and crimson tie, a silk shirt open to the chest, or less."},
tiger:{c:{eyeOne:"amber",skinTone:"deep tan",markings:"claw-mark scars across the torso"},
  blurb:"Her wild match: a huge, rugged jungle guide with a long dark auburn shag, amber eyes, heavy stubble, a hairy chest and claw-mark scars. Rugged work shirts and boots, or shirtless in worn jeans."},
butterfly:{c:{eyeOne:"sky blue",markings:"a small butterfly tattoo over his heart"},
  blurb:"Her prince: a tall, slender premier danseur with platinum side-swept hair, sky-blue eyes, a clean-shaven, finely chiseled face, a small butterfly tattoo over his heart and a gentle, loving smile. A white tuxedo, an open silk shirt, or nothing."},
phoenix:{c:{eyeOne:"molten gold",markings:"a phoenix tattoo spreading its fiery wings across his back"},
  blurb:"A warrior fierce enough for her: a huge, bronze-skinned fighter with a long black half-up warrior braid, molten gold eyes, a short boxed beard and a phoenix tattoo spreading its fiery wings across his back. Leather and chains, battle armor, or bare."},
unicorn:{c:{eyeOne:"gray",skinTone:"fair",undertone:"cool",markings:"a unicorn tattoo on one forearm"},
  blurb:"Her gentle guardian: a tall ranger with loose silver-blond waves, soft gray eyes, a neatly trimmed beard and a unicorn tattoo on one forearm. A linen tunic and travel cloak, an open linen shirt, or shirtless."},
dolphin:{c:{eyeOne:"aqua",markings:"a leaping dolphin tattoo along the ribs"},
  blurb:"Her laid-back lifeguard: a tanned, ripped surfer with tousled sandy-blond hair, aqua eyes, a cheeky grin, light stubble and a leaping dolphin tattoo along his ribs. An open Hawaiian shirt and board shorts, beach linen, or just the trunks."},
leopard:{c:{eyeOne:"ice blue",markings:"a snow leopard tattoo winding down one forearm"},
  blurb:"Her dangerously handsome heartthrob in black tie: tall, ripped and devastatingly cool, with a slicked-back ash-blond undercut, piercing ice-blue eyes, designer stubble, a snow leopard tattoo down one forearm and a slow, devastating smirk. An open-collared tuxedo, a leather jacket, or nothing."},
lynx:{c:{eyeOne:"hazel",markings:"a lynx tattoo on one forearm"},
  blurb:"A rogue who can keep up with her: a lean, charming gambler with a smoky-brown side-swept undercut, heavy-lidded hazel eyes, a van dyke beard, a single hoop earring and tattooed forearms. Waistcoat and rolled sleeves, an open shirt, or nothing."},
hummingbird:{c:{eyeOne:"emerald green",skinTone:"warm beige",markings:"light freckles across the nose and cheeks"},
  blurb:"Her devoted sweetheart: a tall, broad-shouldered pastry chef with soft, tousled dark brown waves, warm green eyes, freckles, light stubble and a slow, doting smile; he grows hibiscus for her on the bakery windowsill. A cable-knit sweater, a henley with a baker's apron, an open shirt, or nothing."},
peacock:{c:{eyeOne:"dark brown",markings:"a peacock-feather tattoo across one shoulder"},
  blurb:"Her serene palace love: a tall, golden-bronze man with loose black waves, calm dark eyes, light stubble, a peacock-feather tattoo across one shoulder and a gentle smile. An open white linen shirt, or swim trunks by the jeweled pool."},
jellyfish:{c:{markings:"a jellyfish tattoo whose tentacles trail across his chest and down one arm"},
  blurb:"Her deep-sea captain: a towering, pale, broad-shouldered sea captain with long black hair slicked back into a low ponytail and streaked deep violet, glowing cyan eyes, rugged stubble along a sharp jaw, a heavy-lidded lazy smile and a jellyfish tattoo whose tentacles trail across his chest and down one arm."},
crane:{c:{eyeOne:"dark brown",markings:"a flying crane tattoo down one forearm"},
  blurb:"Her itamae: a tall, lean sushi chef with a jet-black textured crop under a red hachimaki, calm dark eyes, light stubble along a clean jaw, a precise, unhurried knife hand and a flying crane tattoo down one forearm; he folds her a paper crane with every meal."},
raccoon:{c:{eyeOne:"gray",markings:"a raccoon tattoo along one forearm"},
  blurb:"Her watchmaker: a tall, soft-spoken clockmaker with messy ash-brown curls, warm gray eyes, light stubble and a raccoon tattoo along one forearm, the only person she trusts to mend her stolen treasures. A shirt, waistcoat and loupe, a long coat and knit scarf, or nothing."},
panther:{c:{eyeOne:"gold",skinTone:"deep brown",undertone:"warm",markings:"a panther tattoo prowling across his back"},
  blurb:"Her night archivist: a tall, gentle rare-book restorer with tousled black hair, warm gold eyes behind round wire-rimmed glasses, a short neat beard and a panther tattoo prowling across his back. He keeps the library open for her long after midnight. A cardigan and henley, a long coat, or nothing."},
coyote:{c:{eyeOne:"hazel",skinTone:"tan",undertone:"warm",markings:"a howling coyote tattoo along one forearm"},
  blurb:"Her mechanic: a lean, wiry desert mechanic with a messy sandy-brown undercut, sly hazel eyes, stubble, a roguish lopsided grin and a howling coyote tattoo along one forearm. He can fix anything with an engine, and has never once asked where she found the parts."}};

/* each new girl's own signature look (Academy Signature): [look name, theme, expression, posture, setting, items] */
const NEWSIG={
lioness:["Pride Queen","the queen of the Academy pride","confident, dazzling smile","standing tall on a sunlit rock, one hand on her hip","a golden savanna at sunset from the top of a rock outcrop, the grass glowing",
  {top:["{c} plunging halter bodysuit","@primary"],outerwear:["sheer {c} chiffon cape","@third"],waistAccessory:["{c} wide belt with a lion-head buckle","@accent"],legwear:["{c} strappy gladiator sandals","@accent"],neckAccessory:["{c} collar necklace","@accent"]}],
panda:["Tea House Sweetheart","the sweetheart of the Academy tea house","sleepy, contented smile","carrying a steaming tea tray in both hands","a cozy tea house in a misty bamboo grove, paper lanterns glowing",
  {top:["{c} off-shoulder qipao mini dress with a keyhole neckline","@secondary"],waistAccessory:["{c} wide obi sash","@third"],headwear:["{c} ribbon tied in her hair","@accent"],legwear:["{c} thigh-high socks","@primary"],heldItem:["tea tray with a steaming teapot"]}],
firefly:["Lantern Keeper","the keeper of the Academy's night garden","curious, sparkling smile","holding up a glowing lantern jar full of fireflies","an overgrown glass greenhouse at dusk, fireflies glowing among the vines",
  {top:["sheer {c} slip dress with a plunging neckline","@primary"],outerwear:["short {c} cropped cardigan","@secondary"],legwear:["sheer {c} stockings with glittering firefly dots","@third"],heldItem:["glass jar of glowing fireflies"]}],
scorpion:["Desert Heiress","the heiress of a desert dynasty","haughty, half-lidded smirk","lounging on a silk divan, one leg crossed over the other","a desert palace hall at night, silk curtains, gold lamps and dunes beyond the arches",
  {top:["{c} jeweled bralette","@third"],bottom:["sheer {c} harem skirt with a high slit","@primary"],headwear:["{c} chain headpiece","@third"],neckAccessory:["{c} scorpion pendant necklace","@accent"],wristAccessory:["{c} stacked bangles","@third"]}],
tiger:["Jungle Queen","the wild queen of the jungle","fierce, toothy grin","crouching on a mossy branch, ready to pounce","a lush jungle canopy at sunset, a waterfall roaring below",
  {top:["{c} tiger-stripe bikini top","@primary"],bottom:["{c} ragged suede micro skirt","@extra"],neckAccessory:["{c} tooth-and-bead necklace","@accent"],legwear:["{c} lace-up knee boots","@secondary"]}],
butterfly:["Blue Morpho","the Academy's star dancer","dreamy, graceful smile","rising onto pointe with her arms spread like wings","a sunlit garden stage among wildflowers, blue butterflies swirling",
  {top:["{c} sheer chiffon dance dress with wing-shaped sleeves","@primary"],legwear:["{c} satin pointe shoes with ribbons laced up the calves","@third"],headwear:["{c} butterfly hair clip","@third"],earAccessory:["butterfly-wing drop earrings","@primary"]}],
phoenix:["Firebird","the Academy's undying flame","fiery, confident grin","standing with her arms flung wide as flames rise around her","a mountain summit at sunset, a burst of flame and feathers behind her",
  {top:["{c} feathered corset bodysuit","@primary"],outerwear:["sheer {c} flame-chiffon cape","@third"],headwear:["{c} feathered tiara","@secondary"],legwear:["{c} thigh-high heeled boots","@primary"]}],
unicorn:["Rainbow Dream","the gentlest dreamer at the Academy","gentle, dreamy smile","twirling in a meadow with her skirt flaring","a pastel meadow under a rainbow, petals and sparkles in the air",
  {top:["{c} tiered tulle mini dress with a sweetheart neckline","@primary"],headwear:["{c} unicorn-horn hair clip","@extra"],legwear:["{c} thigh-high socks with {c2} star trim","@primary",null,"@extra"],neckAccessory:["{c} ribbon choker","@third"]}],
dolphin:["Lagoon Star","the Academy's star swimmer","playful, cheeky grin","sitting on a pier with her feet in the water","a turquoise lagoon at golden hour, a wooden pier and dolphins leaping offshore",
  {top:["{c} high-cut one-piece swimsuit with an open back","@primary"],outerwear:["sheer {c} beach shirt worn open","@third"],headwear:["{c} swim goggles pushed up on her head","@accent"],neckAccessory:["dolphin pendant necklace","-"]}],
leopard:["Snow Princess","the sunniest girl in the snow","sunny, wide smile","catching snowflakes with her arms spread wide","a snowy mountain slope at dusk, a chalet glowing below",
  {outerwear:["cropped {c} faux-fur jacket","@primary"],top:["{c} ribbed knit crop top","@secondary"],bottom:["{c} ski pants","@secondary"],headwear:["{c} fluffy pom-pom beanie","@accent"],gloves:["{c} fluffy mittens","@primary"]}],
lynx:["Moonlit Lodge","the slyest guest at the mountain lodge","sly, knowing smirk","peeking around a paper screen with a sake cup","a misty mountain lodge at dusk, paper screens, silver birches and a full moon",
  {top:["{c} short silk kimono robe worn loose off the shoulders","@primary"],waistAccessory:["{c} wide obi sash","@third"],legwear:["sheer {c} thigh-high stockings","@extra"],heldItem:["sake cup"]}],
hummingbird:["Hibiscus Heart","the flirtiest romantic at the Academy","flirty, sparkling wink","blowing a kiss over a bouquet of hibiscus","a tropical greenhouse garden, hibiscus everywhere and hummingbirds darting through the light",
  {top:["{c} wrap sundress with a plunging neckline","@primary"],headwear:["{c} hibiscus hair flower","@primary"],neckAccessory:["{c} ribbon choker","@secondary"],heldItem:["bouquet of hibiscus"]}],
peacock:["Jewel of the Court","the vainest princess of the court","spoiled, haughty pout","fanning herself with a peacock-feather fan","a jeweled palace courtyard at sunset, fountains and strutting peacocks",
  {top:["{c} jeweled corset gown with a plunging neckline","@primary"],outerwear:["sheer {c} train cape","@secondary"],headwear:["{c} jeweled tiara","@third"],heldItem:["peacock-feather fan"]}],
jellyfish:["Deep Glow","the dreamer of the glowing deep","dreamy, faraway half-smile","floating weightless with her hair drifting like tentacles","an underwater cavern full of glowing jellyfish",
  {top:["sheer layered {c} gown with long trailing tentacle-like hems","@primary"],neckAccessory:["pearl choker","-"],headwear:["{c} translucent jellyfish hair clip","@third"]}],
crane:["Paper Crane","the poised perfectionist","serene, poised smile","kneeling to fold a paper crane","a moonlit zen garden with a red bridge over a still pond, paper cranes hanging from the trees",
  {top:["{c} silk kimono with {c2} flying-crane embroidery","@primary",null,"@third"],waistAccessory:["{c} wide obi sash","@third"],headwear:["{c} origami-crane hairpin","@third"],heldItem:["folded paper crane"]}],
raccoon:["Midnight Bandit","the Academy's sneakiest little bandit","sneaky, toothy grin","tiptoeing with a bulging sack slung over her shoulder","a moonlit rooftop at midnight, a bakery window glowing below",
  {top:["{c} cropped hoodie","@secondary"],bottom:["{c} micro shorts","@primary"],legwear:["{c}-and-{c2} striped thigh-high socks","@secondary",null,"@third"],maskAccessory:["{c} domino mask","@accent"],heldItem:["bulging sack of stolen treats"]}],
panther:["Night Prowler","the Academy's night scholar","sultry, knowing smile","prowling along a library balcony rail","the Academy library at midnight, velvet shadows and a crescent moon in the window",
  {top:["{c} velvet bodysuit with a plunging neckline","@primary"],outerwear:["long {c} velvet coat worn open","@secondary"],eyewear:["rectangular glasses","@third"],legwear:["{c} thigh-high heeled boots","@primary"]}],
coyote:["Desert Drifter","the drifter who answers to no one","cocky, lopsided grin","leaning on a dusty motorcycle at the roadside","a desert highway at sunset, red rocks and a lone diner sign",
  {top:["{c} cropped tank top","@accent"],outerwear:["cropped {c} leather jacket","@secondary"],bottom:["{c} ripped denim micro shorts","@primary"],neckAccessory:["{c} bandana neckerchief","@third"],legwear:["{c} cowboy boots","@secondary"]}]};

/* ---- v210: the sister houses' own lore, copied from the blocks that use it (quality169 TOUCH, scenes169/singles170/friends174 ROOM and OUT,
   real186 G, anime187 FX, batchC151/sets167/travel157 motifs, hero159 emblems, trainer158 Pokemon, hum180 ROLE, forb182 ACC). Generated by
   an/gensis.js; Owl and Rat values that older blocks never listed are the Raven and Crow values re-cut the way owlRatClone167 re-cut them. */
const SISLORE={"griffin":{"touch":"with crimson-and-gold banners and warm golden light","room":"her captain's quarters","roomL":"her captain's quarters with a view of the harbor","roomF":"her captain's quarters","out":"a harbor promenade at golden hour","g":{"id":"waist-length wavy chocolate-brown hair in a high half-up ponytail with red and gold streaks and a black underlayer, gold eyes, fair skin, a small mole beneath one eye","fig":"slender dancer's build, small-to-medium breasts","col":"crimson","out":"a castle courtyard at golden hour, crimson banners","light":"golden hour, warm sunlight, rim light","room":"a sunlit bedroom with crimson curtains","bath":"a marble bathtub, candles, crimson-and-gold tiles"},"fx":"lens flare, golden light","mot":"griffin-wing","mot2":"griffin-wing","tmot":"feather","emb":"winged-lion","pk":"a Pyroar standing proudly at her side","role":"the champion","acc":"crimson-and-gold accents"},"badger":{"touch":"with honey-gold light and pots of herbs","room":"a cozy cottage bedroom","roomL":"a cozy cottage bedroom with a patchwork quilt","roomF":"a cozy cottage bedroom with a patchwork quilt","out":"a sunflower-lined country lane","g":{"id":"hip-length very thick glossy yellow hair in a high half-up ponytail with mustard and chocolate streaks and a black underlayer, heterochromia, one yellow eye and one black eye, peachy fair skin, rosy cheeks","fig":"petite, enormous breasts, top-heavy","col":"mustard yellow","out":"a sunflower field in summer","light":"bright sunlight, soft rim light","room":"a cottage bedroom with a patchwork quilt","bath":"a clawfoot tub in a cottage bathroom, dried herbs"},"fx":"sunflower petals, sunbeam","mot":"honeycomb-heart","mot2":"honeycomb","tmot":"honeycomb","emb":"honeycomb","pk":"a Teddiursa hugging her leg, licking honey from its paw","role":"the sweet one","acc":"warm honey-gold light"},"raven":{"touch":"under a deep blue twilight sky with the first stars out","room":"a bedroom under a skylight full of stars","roomL":"a bedroom under a skylight full of stars","roomF":"a bedroom under a skylight full of stars","out":"a quiet old-town street at twilight","g":{"id":"very long straight center-parted midnight-blue hair with storm-blue and bronze streaks, hime cut, bronze eyes, porcelain skin, soft freckles across the nose and cheeks, a beauty mark near the lips","fig":"slender, medium-large breasts","col":"midnight blue","out":"an observatory balcony at blue hour, the first stars out","light":"blue hour, soft ambient light","room":"a bedroom under a skylight at dusk","bath":"a dark-tiled bathroom under a skylight, stars above"},"fx":"starry sky, shooting star","mot":"crescent-moon","mot2":"raven-feather","tmot":"star","emb":"crescent-moon","pk":"a Corviknight perched on a rock behind her","role":"the clever one","acc":"deep blue twilight through the window"},"serpent":{"touch":"in moody emerald light with silver accents","room":"a velvet-draped penthouse bedroom","roomL":"a velvet-draped penthouse bedroom","roomF":"a velvet-draped penthouse bedroom","out":"a lantern-lit palace garden","g":{"id":"waist-length straight silky platinum-blonde hair with curtain bangs, green eyes, ringed irises, fair skin, large hoop earrings","fig":"curvy, large breasts","col":"emerald green","out":"a rainy city street at night, neon reflections","light":"neon bokeh, soft window light","room":"a penthouse bedroom with emerald velvet","bath":"an emerald marble bathtub, city lights through the window"},"fx":"rain, neon lights, reflections","mot":"serpent","mot2":"coiled-serpent","tmot":"serpent-scale","emb":"coiled-serpent","pk":"a Serperior coiled elegantly around her feet","role":"the heiress","acc":"moody emerald light"},"wolf":{"touch":"with a full moon rising over dark pines","room":"a log cabin bedroom","roomL":"a log cabin bedroom with a fur throw","roomF":"a log cabin bedroom with a fur throw","out":"a forest trail under a full moon","g":{"id":"short tousled steel-gray wolf cut with white tips, ice-blue eyes, ivory skin, a faint scar through one eyebrow","fig":"toned athletic build, small-to-medium breasts","col":"charcoal gray","out":"a pine forest at dusk, a full moon rising","light":"dusk, cool ambient light, moonlight","room":"a log cabin bedroom with a fur throw","bath":"a rough stone outdoor shower among pines"},"fx":"moonlight, fireflies","mot":"wolf-moon","mot2":"howling-wolf","tmot":"moon-and-pine","emb":"howling-wolf","pk":"a Midnight Lycanroc crouched beside her","role":"the alpha","acc":"a full moon through the window"},"swan":{"touch":"in soft, pearly morning light with white feathers drifting","room":"a white bedroom with gauzy curtains","roomL":"a white bedroom with gauzy curtains","roomF":"a white bedroom with gauzy curtains","out":"a lakeside path at dawn","g":{"id":"very long pearl-white hair in a ballerina bun with dusty-rose and rose-gold strands, sky-blue eyes, pale ivory skin","fig":"tall, slender dancer's build, small-to-medium breasts","col":"pearl white","out":"a misty lakeside at dawn, white feathers drifting","light":"dawn, soft diffused light, mist","room":"a white bedroom with sheer curtains","bath":"a white freestanding bathtub, sheer curtains, morning light"},"fx":"floating feathers, morning mist","mot":"swan","mot2":"swan","tmot":"lotus","emb":"swan-wing","pk":"a Swanna gliding beside her","role":"the prima ballerina","acc":"soft pearly light"},"dragon":{"touch":"lit by flickering firelight and red lanterns","room":"a red-draped tower bedroom","roomL":"a red-draped tower bedroom","roomF":"a red-draped tower bedroom","out":"a castle wall at sunset","g":{"id":"hip-length thick black hair in a high braided ponytail with crimson and gold streaks, gold eyes, light tan skin","fig":"fit, large breasts","col":"crimson red","out":"a lantern-lit night street, red lanterns overhead","light":"warm lantern light, night","room":"a bedroom with red silk drapes","bath":"a stone bathhouse with red lanterns"},"fx":"floating embers, paper lanterns","mot":"dragon-heart","mot2":"dragon","tmot":"flame","emb":"dragon","pk":"a Charizard looming behind her, tail flame blazing","role":"the warrior","acc":"red lantern light"},"stag":{"touch":"with ivy, wildflowers and dappled forest light","room":"a bedroom in a forest cottage","roomL":"a bedroom in a forest cottage, ivy at the window","roomF":"a bedroom in a forest cottage","out":"a mossy forest path","g":{"id":"short chestnut-brown hair in a messy updo with gold highlights, forest-green eyes, caramel skin, soft dimples","fig":"very tall, lean, large breasts","col":"forest green","out":"a forest glade, dappled sunlight through the leaves","light":"dappled sunlight, soft natural light","room":"a forest cottage bedroom with ivy at the window","bath":"a mossy stone bath in the forest"},"fx":"falling leaves, sunbeam","mot":"leaf","mot2":"antler-and-oak-leaf","tmot":"leaf","emb":"antler","pk":"a Sawsbuck in its spring form standing beside her","role":"the gentle one","acc":"dappled green light"},"shark":{"touch":"with the ocean glittering in the background","room":"a beach house bedroom","roomL":"a beach house bedroom with the ocean outside","roomF":"a beach house bedroom","out":"a beach boardwalk at sunset","g":{"id":"mid-back steel-blue hair in high twin ponytails fading to white with coral-red tips, black eyes, ivory skin","fig":"tall, toned, medium breasts","col":"steel blue","out":"a beach at sunset, sea spray","light":"sunset, backlight, warm rim light","room":"a beach house bedroom, the ocean outside","bath":"an outdoor beach shower, the ocean behind"},"fx":"sunset, water splash","mot":"wave","mot2":"wave-and-fin","tmot":"wave","emb":"shark-fin","pk":"a Sharpedo leaping out of the water behind her","role":"the star athlete","acc":"ocean-blue light"},"penguin":{"touch":"with snow falling softly outside","room":"a snowed-in cabin bedroom, snow falling past the window","roomL":"a snowed-in cabin bedroom, snow falling past the frosted window","roomF":"a snowed-in cabin bedroom, snow falling past the frosted window","out":"a snowy street lit by warm shop windows, snow falling","g":{"id":"very long straight black hair with white, ice-blue and pale gold streaks, heterochromia, one orange eye and one ice-blue eye, warm light-brown skin, freckles across her nose and cheeks, heart-shaped face","fig":"petite, very large breasts","col":"ice blue","out":"outdoors in the snow, snowflakes falling","light":"soft winter daylight, soft rim light","room":"a snowy cabin bedroom, snow past the frosted window","bath":"an outdoor onsen at night, snow on the rocks, lanterns"},"fx":"falling snowflakes, breath","mot":"snowflake","mot2":"snowflake","tmot":"tiny penguin","emb":"penguin-and-snowflake","pk":"a Piplup in a tiny matching orange scarf waddling at her heels","role":"the cheerful one","acc":"snow falling past the window"},"fox":{"touch":"at dusk under glowing paper lanterns and autumn leaves","room":"a tatami room with paper screens","roomL":"a tatami room with paper screens and lanterns","roomF":"a tatami room with paper screens","out":"a lantern-lit festival street","g":{"id":"hip-length fluffy burnt-orange hair in a side ponytail with white tips, amber eyes, foxlike eyes, peachy fair skin, freckles across the nose and cheeks","fig":"curvy hourglass, large breasts","col":"burnt orange","out":"a shrine path of torii gates at dusk, paper lanterns","light":"dusk, warm lantern light","room":"a tatami room with paper screens","bath":"a cedar onsen bath at dusk, lanterns"},"fx":"floating lanterns, spirit fire","mot":"fox-flame","mot2":"fox-tail","tmot":"fox-and-flame","emb":"nine-tailed-fox","pk":"a Ninetales curling its nine tails around her","role":"the trickster","acc":"glowing paper-lantern light"},"lovebird":{"touch":"with pastel fairy lights and little hearts everywhere","room":"a pastel bedroom full of hearts","roomL":"a pastel bedroom full of hearts and fairy lights","roomF":"a pastel bedroom full of hearts and fairy lights","out":"a rose garden full of heart balloons","g":{"id":"very long voluminous creamsicle-orange hair in high twin ponytails with powder-blue and peach streaks, mint-green eyes, peachy fair skin, dimples","fig":"petite, soft, large breasts","col":"pastel pink","out":"a cherry blossom park in spring, petals falling","light":"soft spring daylight, pastel light","room":"a pastel bedroom with fairy lights","bath":"a pink bathtub full of bubbles and rose petals"},"fx":"falling petals, cherry blossoms, hearts","mot":"lovebird-heart","mot2":"heart-and-lovebird","tmot":"orange-blossom","emb":"winged-heart","pk":"a fluffy Swablu nestled on her shoulder","role":"the romantic","acc":"pink fairy lights"},"flamingo":{"touch":"bathed in pink sunset light with palm silhouettes","room":"a pink villa bedroom","roomL":"a pink villa bedroom with palms outside","roomF":"a pink villa bedroom","out":"a palm-lined beach at sunset","g":{"id":"long hot-pink hair in a high bun with salmon and white strands, heterochromia, one hot-pink eye and one white eye, warm light-brown skin, freckles, a beauty mark beneath one eye","fig":"tall, very large breasts, top-heavy","col":"hot pink","out":"palm trees at sunset, pink sky","light":"pink sunset light, warm rim light","room":"a pink villa bedroom with palm shadows","bath":"a gold bathtub in a pink villa bathroom"},"fx":"pink sky, palm leaves","mot":"heart","mot2":"flamingo","tmot":"palm-frond","emb":"flamingo","pk":"a Flamigo balancing on one leg beside her","role":"the princess","acc":"pink sunset light"},"kraken":{"touch":"in shimmering blue, underwater-like light","room":"a bedroom with an aquarium wall","roomL":"a bedroom with a glowing aquarium wall","roomF":"a bedroom with a glowing aquarium wall","out":"a moonlit pier","g":{"id":"very long straight black hair with deep-violet and teal streaks, heterochromia, one crimson eye and one deep-violet eye, pale ivory skin, a small mole beneath one eye","fig":"petite, very large breasts, top-heavy","col":"deep violet","out":"an aquarium tunnel, fish and blue light all around","light":"shimmering blue underwater light, caustics","room":"a bedroom lit by an aquarium wall","bath":"a dark bathroom lit by an aquarium wall, blue caustics"},"fx":"bubbles, caustics, underwater light","mot":"kraken-pearl","mot2":"tentacle","tmot":"tentacle","emb":"tentacle","pk":"a Grapploct sprawled lazily beside her","role":"the mysterious one","acc":"shimmering blue light"},"salmon":{"touch":"with a river view and warm cherry-wood accents","room":"a minimalist riverside bedroom","roomL":"a minimalist riverside bedroom","roomF":"a minimalist riverside bedroom","out":"a riverside walk at dusk","g":{"id":"mid-thigh-length straight glossy salmon-pink hair with black and rose-gold streaks, rose-gold eyes, peachy fair skin, dense freckles all over her face and shoulders, a beauty mark beneath one eye","fig":"voluptuous hourglass, medium-large breasts","col":"salmon pink","out":"a riverside at golden hour, cherry trees","light":"golden hour, warm sunlight","room":"a minimalist bedroom with cherry-wood accents","bath":"a cherry-wood soaking tub with a river view"},"fx":"cherry blossoms, river reflections","mot":"leaping-salmon","mot2":"leaping-salmon","tmot":"leaping-salmon","emb":"leaping-salmon","pk":"a Magikarp leaping in a splash of water beside her","role":"the perfect one","acc":"cherry-wood warmth"},"crow":{"touch":"under a moonlit sky, glittering trinkets scattered about","room":"an attic bedroom full of trinkets","roomL":"an attic bedroom full of glittering trinkets","roomF":"an attic bedroom full of glittering trinkets","out":"a moonlit rooftop","g":{"id":"long wavy ink-blue hair in face-framing layers with silver-white and lavender strands, lavender eyes, rosy fair skin, light freckles across the nose, dimples","fig":"short, slim, large breasts","col":"ink blue","out":"a rooftop at night, city lights","light":"night, city bokeh, soft ambient light","room":"an attic bedroom full of trinkets","bath":"a clawfoot tub in an attic, trinkets on the sill, moonlight"},"fx":"city lights, glittering particles","mot":"crow-feather","mot2":"crescent-moon","tmot":"feather-and-moon","emb":"crow-and-moon","pk":"a Murkrow perched on her shoulder with a stolen ring in its beak","role":"the thief no one could catch","acc":"glinting trinkets on every surface"},"owl":{"touch":"at night, lit by a single lamp and a full moon","room":"a bedroom above a bookshop, books piled everywhere","roomL":"a bedroom above a bookshop at night, books piled everywhere","roomF":"a bedroom above a bookshop at night, books piled everywhere","out":"the Academy grounds at midnight under a full moon","g":{"id":"very long thick feathery caramel-brown hair with espresso and honey-gold streaks, amber eyes, large round eyes, ivory skin, faint speckled freckles, a beauty mark beneath one eye","fig":"tall, pear-shaped, large soft breasts","col":"caramel brown","out":"by a tall library window at night, a full moon","light":"warm lamp light, moonlight","room":"a book-lined bedroom lit by a single lamp","bath":"an old-fashioned bathtub at night, books stacked beside it"},"fx":"full moon, floating dust motes","mot":"crescent-moon","mot2":"owl-and-moon","tmot":"star","emb":"crescent-moon","pk":"a Noctowl perched on her shoulder","role":"the scholar","acc":"a single lamp and a full moon"},"rat":{"touch":"in a cozy, cluttered corner full of thrifted treasures","room":"a cluttered studio apartment","roomL":"a cluttered studio apartment full of thrifted treasures","roomF":"a cluttered studio apartment full of thrifted treasures","out":"a neon-lit city alley after rain","g":{"id":"very long ash-gray hair in a thin low braid with rose-pink and silver strands, rose-red eyes, porcelain skin, light freckles across the nose, a beauty mark above the lip","fig":"compact, toned, medium breasts","col":"rose pink","out":"a neon alley at night, string lights","light":"neon light, soft ambient light","room":"a cluttered apartment bedroom with string lights","bath":"a cramped bathtub under string lights"},"fx":"neon lights, string lights","mot":"rat-tail","mot2":"key-and-rat","tmot":"feather-and-moon","emb":"rat-and-moon","pk":"a Raticate at her feet with a stolen ring in its teeth","role":"the tough one","acc":"string lights and thrifted clutter"}};

/* ---- v211: four new aquatic and arctic Academy houses (a second wave of girls210.js). Each one shares a sister house
   with a v210 girl and gets every set, scene and story that sister has, re-cut for her:
   Orca (Shark), Harp Seal (Penguin), Narwhal (Kraken), Arctic Fox (Fox). */
(function(){
  /* colors the palettes use that the color lists did not have yet */
  const NEWCOL={"glacier blue":"#a6d4e6","dove gray":"#b9b8c0","pastel blue":"#aecdee","aquamarine":"#7fd8cf","pale lavender":"#d9cdef"};
  if(typeof COLORS==="object")Object.entries(NEWCOL).forEach(([k,v])=>{if(COLORS[k])return;COLORS[k]=v;
    if(typeof ALL_COLORS!=="undefined"&&!ALL_COLORS.includes(k))ALL_COLORS.push(k);
    if(typeof PAL_POOL!=="undefined"&&!PAL_POOL.includes(k))PAL_POOL.push(k)});
})();
const NEWGIRLS2=[
{k:"orca",sis:"shark",pal:{primary:"jet black",secondary:"snow white",third:"glacier blue",accent:"coral",extra:"silver"},
 man:{primary:"jet black",secondary:"white",third:"glacier blue",accent:"silver",extra:"charcoal gray"},
 room:"an oceanfront glass house with orcas breaching in the bay outside",pride:"the fearless swim captain",pet:"Tuxie",
 bath:"an oceanfront slate shower with the cold bay glittering beyond",role:"the swim captain",acc:"cold blue ocean light",
 c:{age:"young woman",faceShape:"heart-shaped face with high cheekbones and soft, full cheeks",eyeConfig:"matching",eyeShape:"large, upturned eyes",pupilStyle:"round pupils",irisDetail:"icy, crystalline iris detail",
  lashNatural:"thick, dark eyelashes",eyeOne:"@third",browShape:"sleek, arched brows",noseShape:"small, upturned nose",mouthShape:"full, glossy lips with a defined cupid's bow",
  expression:"confident, dimpled grin",impression:"a bold, sporty confidence with a sweet, dimpled smile",faceMark:"deep dimples in both cheeks",
  hairStyle:"sleek high ponytail",hairLength:"hip-length",hairTexture:"glossy, straight and silky",bangs:"sleek curtain bangs",hairMovement:"swings behind her in a glossy arc",
  hairBase:"@primary",hairUnderlayer:"@primary",hairInner:"@secondary",hairHighlights:"@secondary",hairBlend:"bold snow-white streaks at the temples like orca eye patches",
  skinTone:"porcelain",undertone:"cool",skinFinish:"smooth, dewy skin with a subtle athletic sheen",markings:"no markings",bodyMarkings:"a small black-and-white orca tattoo low on one hip",
  makeupStyle:"clean sporty glam makeup",eyelinerStyle:"sharp winged eyeliner",eyeshadowStyle:"icy blue shimmer eyeshadow",lashStyle:"lifted lashes",blushStyle:"soft coral blush",lipFinish:"glossy coral lips",faceAccents:"dewy cheekbone highlight",nailStyle:"short almond fingernails",nailColor:"@accent",
  heightStature:"tall stature",shoulderShape:"broad swimmer's shoulders",torsoShape:"long, athletic torso",armShape:"toned, strong arms",handShape:"long and strong",
  bustSize:"large, full breasts",bustShape:"round, full, high-set shape",bustWeight:"firm fullness",waistShape:"narrow, cinched waist",stomachShape:"flat, toned stomach with light ab definition",
  hipShape:"wide, curvy hips",buttSize:"large, round, muscular butt",thighBuild:"thick, powerful thighs",legShape:"long, strong legs",bodySoftness:"tall, athletic hourglass build",
  posture:"standing tall with her hands on her hips",
  nippleColor:"rosy pink",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"rosy pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} thigh-high socks with {c2} tops","@primary",null,"@secondary"],earAccessory:["silver orca-tail ear cuffs","@extra"],tagCharm:["small orca crest badge","@third"]},
 blurb:"A tall, athletic swim captain with a hip-length glossy jet-black ponytail streaked snow white at the temples, icy glacier-blue eyes, porcelain skin, deep dimples and a confident grin. A black hooded robe lined in white over a white vest and black pleated skirt, black-and-white thigh-highs and orca-tail ear cuffs."},

{k:"harpseal",disp:"Harp Seal",sis:"penguin",pal:{primary:"snow white",secondary:"dove gray",third:"powder blue",accent:"baby pink",extra:"pearl white"},
 man:{primary:"dark brown",secondary:"cream",third:"powder blue",accent:"silver",extra:"charcoal gray"},
 room:"a cozy ice lodge piled with white furs, the frozen bay glittering past the frosted window",pride:"the snuggliest sweetheart in the snow",pet:"Snuggles",
 bath:"a steamy lodge bathroom, the frozen bay past the fogged window",role:"the snuggly one",acc:"pale winter sun on the snow",
 c:{age:"young woman",faceShape:"round, soft face with full, squishy cheeks",eyeConfig:"matching",eyeShape:"huge, round, glossy eyes",pupilStyle:"large round pupils",irisDetail:"glossy, liquid-dark irises",
  lashNatural:"long, thick eyelashes",eyeOne:"dark chocolate brown",browShape:"soft, straight brows",noseShape:"small button nose",mouthShape:"pouty, full lips",
  expression:"sleepy, contented smile",impression:"a soft, cuddly sweetness",faceMark:"a rosy blush across the nose and cheeks",
  hairStyle:"half-up twin buns with long loose waves",hairLength:"hip-length",hairTexture:"fluffy and voluminous",bangs:"fluffy blunt bangs",hairMovement:"spills softly over her shoulders",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"a soft snow-white to dove-gray gradient",
  skinTone:"rosy fair",undertone:"rosy",skinFinish:"soft, velvety skin with a rosy flush",markings:"a scattering of faint gray freckle spots across her shoulders",
  makeupStyle:"soft winter blush makeup",eyelinerStyle:"puppy-eye eyeliner",eyeshadowStyle:"soft pink shimmer eyeshadow",lashStyle:"fluffy lashes",blushStyle:"heavy rosy blush across the nose",lipFinish:"glossy pink lips",faceAccents:"soft under-eye highlight",nailStyle:"short rounded fingernails with tiny snowflake nail art",nailColor:"@accent",
  heightStature:"a petite frame",shoulderShape:"soft, rounded shoulders",torsoShape:"softly rounded torso",armShape:"soft arms",handShape:"small and soft",
  bustSize:"large breasts",bustShape:"soft, round, natural shape",bustWeight:"heavy, soft fullness",waistShape:"soft, defined waist",stomachShape:"soft stomach with a flat lower abdomen",
  hipShape:"wide, soft hips",buttSize:"big, round, plush butt",thighBuild:"thick, soft thighs",legShape:"short shapely legs",bodySoftness:"soft, plush, petite hourglass figure",
  posture:"curled up on a pile of white furs, hugging a pillow",
  nippleColor:"pale pink",nippleType:"puffy",nippleLength:"short",areolaColor:"pale pink",areolaType:"puffy and softly domed",areolaSize:"large",vaginaColor:"pale pink",vaginaType:"full and plump",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with a {c2} fur-trimmed hood","@secondary",null,"@primary"],neckAccessory:["ribbon bow tie","@accent"],
  legwear:["{c} thigh-high socks with {c2} pom-poms","@primary",null,"@accent"],earAccessory:["fluffy {c} earmuffs","@primary"],tagCharm:["small harp seal crest badge","@third"]},
 blurb:"A petite, plush, sleepy sweetheart with hip-length fluffy snow-white waves in half-up twin buns fading to dove gray, huge glossy dark eyes, rosy fair skin with a blush across her nose and a sleepy, contented smile. A dove-gray hooded robe with a white fur-trimmed hood over a white vest, pom-pom thigh-highs and fluffy earmuffs."},

{k:"narwhal",sis:"kraken",pal:{primary:"pearl white",secondary:"pastel blue",third:"lilac",accent:"silver",extra:"aquamarine"},
 man:{primary:"silver",secondary:"navy blue",third:"pastel blue",accent:"silver",extra:"charcoal gray"},
 room:"a bedroom with a window onto a moonlit fjord under the northern lights",pride:"the dreamy sea unicorn",pet:"Twirl",
 bath:"a bathroom of pale blue glacier tile, the aurora glowing through the window",role:"the dreamy one",acc:"shimmering aurora light",
 c:{age:"young woman",faceShape:"delicate oval face with soft cheeks and a small pointed chin",eyeConfig:"matching",eyeShape:"large, dreamy, downturned eyes",pupilStyle:"round pupils",irisDetail:"shimmering, star-flecked irises",
  lashNatural:"long, pale silvery lashes",eyeOne:"@extra",browShape:"pale, fine brows",noseShape:"small, delicate nose",mouthShape:"soft, small lips with a gentle pout",
  expression:"dreamy, faraway smile",impression:"an ethereal, dreamy sweetness",faceMark:"a tiny star-shaped beauty mark beneath one eye",
  hairStyle:"long spiral-twisted braid with loose waves around it",hairLength:"floor-length",hairTexture:"silky and fine",bangs:"wispy see-through bangs",hairMovement:"drifts softly as if underwater",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@secondary",hairBlend:"a pastel ombre from pearl white to pastel blue and lilac tips",
  skinTone:"very fair",undertone:"pearl",skinFinish:"luminous, pearly skin with a soft iridescent sheen",markings:"faint silver speckles across her shoulders and back like starlight",
  makeupStyle:"ethereal glitter makeup",eyelinerStyle:"no eyeliner",eyeshadowStyle:"iridescent pastel eyeshadow",lashStyle:"silvery lashes",blushStyle:"soft pink blush",lipFinish:"pearly pink gloss",faceAccents:"iridescent highlight on the cheekbones",nailStyle:"long almond fingernails with pearl chrome",nailColor:"@primary",
  heightStature:"tall stature",shoulderShape:"slender, delicate shoulders",torsoShape:"long, slender torso",armShape:"slim, graceful arms",handShape:"long, elegant fingers",
  bustSize:"medium breasts",bustShape:"perky, teardrop shape",bustWeight:"soft fullness",waistShape:"slim waist",stomachShape:"flat stomach",
  hipShape:"softly curved hips",buttSize:"small, perky butt",thighBuild:"slender thighs",legShape:"very long, slender legs",bodySoftness:"tall, willowy, slender figure",
  posture:"drifting with one arm raised gracefully overhead",
  nippleColor:"pale pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"pale pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pale pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["ribbon bow tie","@third"],
  legwear:["sheer {c} stockings with {c2} lace tops","@primary",null,"@secondary"],earAccessory:["pearl drop earrings","-"],headwear:["spiral silver hair stick","-"],tagCharm:["small narwhal crest badge","@third"]},
 blurb:"A tall, willowy dreamer with floor-length silky pearl-white hair in a spiral-twisted braid fading to pastel blue and lilac, dreamy aquamarine eyes, pearly fair skin with silver starlight speckles and a faraway smile. A pastel-blue hooded robe lined in pearl white over a white vest, lace-top stockings and a spiral silver hair stick."},

{k:"arcticfox",disp:"Arctic Fox",sis:"fox",pal:{primary:"snow white",secondary:"silver",third:"pale lavender",accent:"crimson",extra:"black"},
 man:{primary:"silver",secondary:"black",third:"pale lavender",accent:"crimson",extra:"charcoal gray"},
 room:"a snowy shrine guest room with paper screens and a glowing brazier",pride:"the untouchable snow trickster",pet:"Frosty",
 bath:"an outdoor onsen in falling snow, lanterns glowing",role:"the snow trickster",acc:"lantern light on falling snow",
 c:{age:"young woman",faceShape:"heart-shaped face with a small, pointed chin",eyeConfig:"matching",eyeShape:"sharp, upturned foxlike eyes",pupilStyle:"round pupils",irisDetail:"glowing golden irises",
  lashNatural:"long, white eyelashes",eyeOne:"gold",browShape:"fine, arched white brows",noseShape:"small, pointed nose",mouthShape:"small, smirking lips with a pouty lower lip",
  expression:"mischievous, sly smirk",impression:"a playful, teasing mischief",faceMark:"a small beauty mark beside the mouth",
  hairStyle:"high, fluffy ponytail with long face-framing strands",hairLength:"hip-length",hairTexture:"thick, fluffy and feathery",bangs:"fluffy, choppy bangs",hairMovement:"bounces with a fluffy, tail-like swish",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"snow-white hair with silver ends and pale lavender lowlights",
  skinTone:"fair",undertone:"cool",skinFinish:"smooth, cool skin with frost-flushed cheeks",markings:"no markings",bodyMarkings:"a small snowflake tattoo on her inner thigh",
  makeupStyle:"kitsune-inspired makeup with red eye accents",eyelinerStyle:"red winged eyeliner",eyeshadowStyle:"crimson-tipped eyeshadow at the outer corners",lashStyle:"fluttery lashes",blushStyle:"frosty pink blush",lipFinish:"glossy crimson lips",faceAccents:"red kitsune markings at the outer corners of the eyes",nailStyle:"long pointed fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"narrow, sloped shoulders",torsoShape:"soft, curvy torso",armShape:"slim arms",handShape:"slender and nimble",
  bustSize:"medium-large breasts",bustShape:"perky, round shape",bustWeight:"soft fullness",waistShape:"tiny waist",stomachShape:"flat, soft stomach",
  hipShape:"very wide, curvy hips",buttSize:"big, bouncy, heart-shaped butt",thighBuild:"thick, soft thighs",legShape:"shapely legs",bodySoftness:"bottom-heavy hourglass figure",
  posture:"glancing back over her shoulder with a finger to her lips",
  nippleColor:"light pink",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"full and plump",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@extra"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@accent"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} thigh-high socks with {c2} fur-trimmed cuffs","@primary",null,"@secondary"],earAccessory:["{c} tassel earrings","@accent"],tagCharm:["small arctic fox crest badge","@third"]},
 blurb:"A curvy, bottom-heavy trickster with a hip-length fluffy snow-white ponytail with silver ends and pale lavender lowlights, golden foxlike eyes with red kitsune markings, fair skin and a mischievous, sly smirk. A white hooded robe lined in crimson over a white vest and black pleated skirt, fur-cuffed thigh-highs and crimson tassel earrings."}
];

/* ---- v211: lore for the second wave (same fields as girls210lore.js) */
const NEWLORE2={
orca:{touch:"with the cold blue bay glittering in the background",room:"an oceanfront glass-house bedroom",roomL:"an oceanfront glass-house bedroom with the bay outside",out:"a rocky northern shore at sunset, orcas breaching offshore",
  g:{id:"hip-length glossy jet-black hair in a sleek high ponytail with snow-white streaks at the temples, icy glacier-blue eyes, porcelain skin, deep dimples",fig:"tall, athletic hourglass, large breasts",col:"glacier blue",
    out:"a rocky northern shore at sunset, sea spray, orcas breaching",light:"cold sunset, backlight, rim light",room:"an oceanfront glass-house bedroom, the bay outside",bath:"an outdoor slate shower by the ocean, the bay behind"},
  fx:"water splash, cold sea spray",mot:"wave",mot2:"wave-and-orca",tmot:"orca",emb:"breaching-orca",pk:"a Wailmer splashing in the surf behind her",
  words:[["sharp-toothed smirk","dimpled smirk"],["sharp-toothed grin","dimpled grin"],["toothy grin","dimpled grin"],["shark tooth earrings","orca-tail earrings"],["shark-tooth necklace","orca-tail pendant necklace"],["shark-tooth pendant","orca-tail pendant"],["shark-tooth clasp","orca-tail clasp"],
    ["fin-shaped train","orca-fin train"],["tooth-trimmed hood","black-and-white hood"],["jagged tooth-edged neckline","black-and-white paneled neckline"],["shark fins and cresting waves","orca fins and cresting waves"],
    ["wave-and-fin","wave-and-orca"],["sharkskin shoulder wrap","glossy black-and-white shoulder wrap"],["shark skin stockings","black-and-white paneled stockings"]],
  colors:[["steel blue","jet black"],["steel-blue","jet-black"],["Steel blue","Jet black"],["coral red","coral"],["coral-red","coral"]]},
harpseal:{touch:"with soft snow falling over the frozen bay",room:"a cozy ice-lodge bedroom piled with white furs",roomL:"a cozy ice-lodge bedroom piled with white furs, the frozen bay past the frosted window",out:"a sunlit ice floe on a frozen bay, snow sparkling",
  g:{id:"hip-length fluffy snow-white hair in half-up twin buns with long loose waves fading to dove gray, fluffy blunt bangs, huge glossy dark brown eyes, rosy fair skin, a blush across her nose",fig:"petite, soft, plush hourglass, large breasts, thick thighs",col:"powder blue",
    out:"a frozen bay on a sunny winter day, sparkling snow",light:"bright winter sunlight, soft rim light",room:"an ice-lodge bedroom piled with white furs",bath:"a steamy wooden tub by a frosted window over the frozen bay"},
  fx:"sparkling snow, frosty breath",mot:"snowflake-and-heart",mot2:"snowflake",tmot:"tiny harp seal",emb:"harp-seal-and-snowflake",pk:"a Spheal rolling along at her heels",
  low:"harp seal",
  words:[["with a white belly and a flipper-trimmed hood","with a fluffy white belly and a fur-trimmed hood"],["tuxedo-style lapel trim","fluffy faux-fur lapel trim"],["tuxedo-style gown","snow-white faux-fur-trimmed gown"],["tuxedo-front bunny leotard","snow-white bunny leotard"],
    ["tuxedo-style stage leotard","snow-white fur-trimmed stage leotard"],["tiny orange knitted baby hat with little penguin eyes and a beak","tiny white knitted baby hat with little harp seal pup eyes"],["little penguins waddle","little penguins waddle"],
    ["chunky orange knit scarf","chunky baby pink knit scarf"],["orange knit scarf","baby pink knit scarf"],["orange scarf","baby pink scarf"],["orange towel","baby pink towel"],["orange satin ribbon","baby pink satin ribbon"],["snowed-in cabin","snowed-in ice lodge"],["snowy cabin","snowy ice lodge"],
    ["long black hair","long snow-white hair"],["her black hair","her snow-white hair"],["straight black hair","fluffy snow-white hair"],["glossy black hair","fluffy snow-white hair"]],
  colors:[["Ice blue cheer","Powder blue cheer"]]},
narwhal:{touch:"in shimmering aurora light over a moonlit fjord",room:"a bedroom with a window onto an aurora-lit fjord",roomL:"a bedroom with a tall window onto a moonlit fjord under the northern lights",out:"a moonlit fjord pier under the northern lights",
  g:{id:"floor-length silky pearl-white hair in a long spiral-twisted braid with pastel blue and lilac ombre tips, wispy see-through bangs, dreamy aquamarine eyes, very fair pearly skin, a tiny star-shaped mark beneath one eye",fig:"tall, willowy, slender, medium breasts",col:"pastel blue",
    out:"a moonlit glacier fjord under the northern lights",light:"aurora glow, soft moonlight",room:"a bedroom with a window onto an aurora-lit fjord",bath:"a pale blue glacier-tiled bathroom, the aurora glowing through the window"},
  fx:"aurora, sparkles, floating bubbles",mot:"narwhal-pearl",mot2:"spiral-horn",tmot:"narwhal",emb:"spiral-horn",pk:"a Dewgong gliding through the water beside her",
  words:[["fluffy octopus onesie","fluffy narwhal onesie"],["plush octopus hugged close","plush narwhal hugged close"],["fluffy octopus hooded onesie","fluffy narwhal hooded onesie"],["plush octopus toy","plush narwhal toy"],["octopus-and-wave","narwhal-and-wave"],
    ["small octopus familiar draped over her shoulder","small narwhal familiar swimming around her shoulder"],["a kraken tattoo whose tentacles wind across his chest and down one arm","a narwhal tattoo spiraling across his chest and down one arm"],
    ["giant octopus tank","giant beluga tank"],["a huge red octopus drifts past the glass","a huge white beluga glides past the glass"],["points at the octopus","points at the beluga"],["like an octopus","like a narwhal"],
    ["a curious octopus watches from the other side","a curious beluga watches from the other side"],["an octopus drifts past","a beluga glides past"],["a drifting octopus","a gliding beluga"],["an octopus drifting past","a beluga gliding past"],
    ["octopus shadows","whale shadows"],["octopus-ink painted hide wrap","pearl-white silk wrap"],["black ink rum cocktail","blue curaçao cocktail"],["tentacle emblem","spiral-horn emblem"],["tentacle-curl","spiral"],
    ["long straight black hair","floor-length pearl-white hair"],["straight black hair","silky pearl-white hair"],["crimson eye","aquamarine eye"]],
  colors:[["deep violet","lilac"],["deep-violet","lilac"],["Deep violet","Lilac"],["dark teal backdrop","pale blue backdrop"],["teal bioluminescence","pale blue bioluminescence"],["teal trim","pastel blue trim"],["teal collar","pastel blue collar"],["teal cap","pastel blue cap"],["Teal cheer","Pastel blue cheer"]]},
arcticfox:{touch:"at dusk under glowing paper lanterns with snow falling",room:"a snowy shrine guest room with paper screens",roomL:"a snowy shrine guest room with paper screens and a glowing brazier",out:"a snow-covered shrine path lit by lanterns",
  g:{id:"hip-length fluffy snow-white hair in a high fluffy ponytail with silver ends and pale lavender lowlights, fluffy choppy bangs, golden foxlike eyes, fair skin, red kitsune markings at the corners of her eyes",fig:"curvy, bottom-heavy hourglass, medium-large breasts, very wide hips",col:"crimson",
    out:"a snowy shrine path of torii gates at dusk, paper lanterns",light:"dusk, warm lantern light on snow",room:"a snowy shrine guest room with paper screens",bath:"an outdoor onsen in falling snow, lanterns"},
  fx:"falling snow, frostfire, floating lanterns",mot:"frost-flame",mot2:"snowy fox-tail",tmot:"fox-and-snowflake",emb:"nine-tailed-snow-fox",pk:"an Alolan Ninetales curling its snowy tails around her",
  low:"arctic fox",
  words:[["amber foxlike eyes","golden foxlike eyes"],["large bushy fox tail","large fluffy white fox tail"],["fox-eared hooded onesie with a bushy tail","white fox-eared hooded onesie with a fluffy tail"],["A kitsune costume","A snow-kitsune costume"],
    ["fox-tail pattern","snowy fox-tail pattern"],["fox-tail pocket","snowy fox-tail pocket"],["fox-tail embroidery","snowy fox-tail embroidery"],["amber-gold flame-tail embroidery","silver frost-tail embroidery"],["fox-and-flame","fox-and-snowflake"],["fox-flame","frost-flame"],
    ["fluffy fox ears","fluffy white fox ears"],["fox ears","white fox ears"],["fox tail","white fox tail"],["nine-tailed-fox","nine-tailed-snow-fox"],["a nine-tailed fox","a nine-tailed snow fox"],["fox tails and foxfire flames","snowy fox tails and frostfire flames"],
    ["blue foxfire","pale blue frostfire"],["FOXFIRE♡","FROSTFIRE♡"],["foxfire","frostfire"],["kitsune","snow kitsune"],["stone foxes","stone snow foxes"],["sly, fox-like smirk","sly, fox-like smirk"],["fox-like","fox-like"],
    ["fox mask","white fox mask"],["Kitsune Lantern","Snow Lantern"],["burnt-orange hair","snow-white hair"]],
  colors:[["burnt orange","snow white"],["burnt-orange","snow-white"],["Burnt orange","Snow white"]]}};

const NEWHEADS2={
orca:{c:{age:"mature woman",faceShape:"strong heart-shaped face with high cheekbones",expression:"confident, commanding smile",impression:"a powerful, commanding presence",hairStyle:"sleek high ponytail",bangs:"open forehead",makeupStyle:"classic glam makeup",eyelinerStyle:"sharp winged eyeliner",bodySoftness:"tall, powerful, mature hourglass figure"},
  blurb:"The Orca headmistress: a tall, powerful woman with a sleek jet-black ponytail streaked white at the temples, glacier-blue eyes, deep dimples and a confident, commanding smile."},
harpseal:{c:{age:"mature woman",faceShape:"soft round face with full cheeks",expression:"warm, sleepy smile",impression:"a warm, cozy, nurturing presence",hairStyle:"loose low bun",bangs:"fluffy blunt bangs",makeupStyle:"soft natural makeup",bodySoftness:"soft, plush, mature hourglass figure"},
  blurb:"The Harp Seal headmistress: a soft, plush woman with fluffy snow-white hair in a loose low bun fading to dove gray, big glossy dark eyes, rosy cheeks and a warm, sleepy smile."},
narwhal:{c:{age:"mature woman",faceShape:"refined oval face with high cheekbones",expression:"serene, dreamy smile",impression:"an ethereal, otherworldly grace",hairStyle:"spiral-twisted crown braid",bangs:"wispy see-through bangs",makeupStyle:"ethereal glitter makeup",bodySoftness:"tall, willowy, mature figure"},
  blurb:"The Narwhal headmistress: a tall, willowy woman with pearl-white hair in a spiral-twisted crown braid tipped pastel blue and lilac, aquamarine eyes and a serene, dreamy smile."},
arcticfox:{c:{age:"mature woman",faceShape:"refined heart-shaped face with high cheekbones",expression:"sly, amused smile",impression:"a sly, seductive, worldly allure",hairStyle:"side fishtail braid",bangs:"long side bangs",makeupStyle:"glamorous soft smoky makeup"},
  blurb:"The Arctic Fox headmistress: a wide-hipped woman with a long snow-white side fishtail braid tipped silver, golden foxlike eyes with red kitsune markings and a sly, amused smile."}};

const NEWMEN2={
orca:{c:{eyeOne:"glacier blue",hairStyle:"short textured crop",skinTone:"fair",undertone:"cool",markings:"an orca tattoo across one shoulder blade"},
  blurb:"Her rescue diver: a towering, broad-shouldered ocean rescue diver with a short jet-black crop, glacier-blue eyes, light stubble, a cocky grin and an orca tattoo across one shoulder blade. An open Hawaiian shirt and board shorts, beach linen, or just the trunks."},
harpseal:{c:{eyeOne:"warm brown",hairStyle:"tousled curls",facialHair:"short neat beard",expression:"slow, warm smile",impression:"a gentle, protective warmth",markings:"a harp seal tattoo on one forearm"},
  blurb:"Her gentle heartthrob in black tie: a tall, broad, soft-spoken man with tousled dark brown curls, warm brown eyes, a short neat beard, a harp seal tattoo on one forearm and a slow, warm smile. An open-collared tuxedo, a leather jacket over a henley, low-slung sweatpants, or nothing."},
narwhal:{c:{eyeOne:"aquamarine",markings:"a narwhal tattoo spiraling across his chest and down one arm"},
  blurb:"Her arctic captain: a towering, pale, broad-shouldered icebreaker captain with long silver hair tied back in a low ponytail, aquamarine eyes, rugged stubble, a heavy-lidded lazy smile and a narwhal tattoo spiraling across his chest and down one arm. An open shirt under a long captain's coat, or nothing."},
arcticfox:{c:{eyeOne:"gold",markings:"an arctic fox tattoo on one forearm"},
  blurb:"A rogue who can keep up with her: a lean, charming gambler with a silver side-swept undercut, heavy-lidded golden eyes, a van dyke beard, a single hoop earring and an arctic fox tattoo on one forearm. Waistcoat and rolled sleeves, an open shirt, or nothing."}};

const NEWSIG2={
orca:["Pod Leader","the captain of the Academy pod","confident, dimpled grin","standing on a rock with one foot up, wringing out her ponytail","a rocky northern shore at sunset, orcas breaching in the bay",
  {top:["{c} high-neck racer-back swimsuit with {c2} side panels","@primary",null,"@secondary"],outerwear:["{c} cropped zip-up rash guard worn open","@secondary"],heldItem:["{c} swim goggles","@third"],neckAccessory:["silver orca-tail pendant","-"]}],
harpseal:["Ice Floe Nap","the sleepiest girl on the ice","sleepy, contented smile","curled up on a pile of white furs, mid-yawn","a sunlit ice floe on a frozen bay, snow sparkling",
  {outerwear:["oversized fluffy {c} faux-fur coat","@primary"],top:["{c} cropped knit sweater","@third"],bottom:["{c} fluffy knit shorts","@secondary"],headwear:["fluffy {c} earmuffs","@primary"],legwear:["{c} fluffy leg warmers","@primary"]}],
narwhal:["Aurora Tide","the dreamer under the northern lights","dreamy, faraway smile","rising from the water with her spiral braid trailing behind her","a moonlit fjord under swirling northern lights",
  {top:["sheer {c} iridescent wrap gown","@primary"],neckAccessory:["pearl choker","-"],headwear:["silver spiral horn tiara","-"],waistAccessory:["{c} pearl-strand belt","@accent"]}],
arcticfox:["Snow Kitsune","the snow trickster of the winter shrine","mischievous, sly smirk","peeking out from behind a torii gate with a finger to her lips","a snowy shrine of red torii gates at dusk, paper lanterns glowing on the snow",
  {top:["{c} short silk kimono robe worn off the shoulders","@primary"],waistAccessory:["{c} wide obi sash","@accent"],legwear:["{c} thigh-high stockings","@primary"],headwear:["white fox mask tilted on her head","-"]}]};

/* ---- v213: the Lioness's pack: four feisty cats with short and medium hair (a third wave of the house pass).
   Jaguar (Dragon's stories), Cheetah (Shark's), Cougar (Wolf's), Caracal (Rat's). In every story the sister shared with her
   usual partner (Griffin, Salmon, Stag, Owl), the partner is Lioness. */
const NEWGIRLS3=[
{k:"jaguar",sis:"dragon",pal:{primary:"amber gold",secondary:"black",third:"emerald green",accent:"gold",extra:"bronze"},
 man:{primary:"black",secondary:"emerald green",third:"bronze",accent:"gold",extra:"charcoal gray"},
 room:"a jungle temple tower room hung with jade lanterns, her spears on the wall",pride:"the fiercest little warrior in the jungle",pet:"Kitten",
 bath:"a jungle temple bathhouse with a carved stone tub",role:"the jungle warrior",acc:"jade lantern light through jungle leaves",
 c:{age:"young woman",faceShape:"soft heart-shaped face with high cheekbones",eyeConfig:"matching",eyeShape:"large, almond-shaped catlike eyes",pupilStyle:"round pupils",irisDetail:"bright, gold-flecked irises",
  lashNatural:"thick, dark eyelashes",eyeOne:"@third",browShape:"bold, arched brows",noseShape:"small, cute nose",mouthShape:"full, pouty lips",
  expression:"feisty, pouty glare",impression:"a fierce, fiery spirit with an adorable pout",faceMark:"a tiny beauty mark beneath one eye",
  hairStyle:"sleek layered lob",hairLength:"shoulder-length",hairTexture:"thick, glossy and smooth",bangs:"blunt bangs",hairMovement:"swings sharply when she turns her head",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"black rosette-like lowlights through the golden hair",
  skinTone:"golden tan",undertone:"warm golden",skinFinish:"smooth, glowing skin with a warm sheen",markings:"no markings",bodyMarkings:"a ring of tiny jaguar-rosette tattoos around one thigh",
  makeupStyle:"bold glam makeup",eyelinerStyle:"sharp winged eyeliner",eyeshadowStyle:"emerald and gold shimmer eyeshadow",lashStyle:"lifted lashes",blushStyle:"warm bronzed blush",lipFinish:"glossy nude-pink lips",faceAccents:"golden cheekbone highlight",nailStyle:"long pointed fingernails",nailColor:"@accent",
  heightStature:"slightly above-average height",shoulderShape:"balanced, athletic shoulders",torsoShape:"lean, toned torso",armShape:"toned arms",handShape:"strong and graceful",
  bustSize:"large, full breasts",bustShape:"round, perky, full shape",bustWeight:"firm fullness",waistShape:"narrow, defined waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy hips",buttSize:"round, firm, athletic butt",thighBuild:"toned thighs",legShape:"strong, shapely legs",bodySoftness:"lean, athletic hourglass build",
  posture:"crouched low and ready to pounce, glaring up through her bangs",
  nippleColor:"caramel pink",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"caramel pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"a small, neatly trimmed landing strip"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@accent"],
  legwear:["sheer {c} stockings with {c2} rosette-print tops","@secondary",null,"@primary"],earAccessory:["gold ear cuffs","@accent"],tagCharm:["small jaguar crest badge","@third"]},
 blurb:"A feisty jungle warrior with a sleek shoulder-length golden lob shot through with black rosette lowlights, blunt bangs, emerald catlike eyes, golden-tan skin and an adorable pouty glare. A black hooded robe lined in gold over a golden vest and black pleated skirt, rosette-print stockings and gold ear cuffs."},

{k:"cheetah",sis:"shark",pal:{primary:"sandy blonde",secondary:"black",third:"cream",accent:"tangerine orange",extra:"white"},
 man:{primary:"dark brown",secondary:"white",third:"cream",accent:"tangerine orange",extra:"charcoal gray"},
 room:"a sunny trophy-lined dorm room with a view of the savanna track",pride:"the fastest girl alive",pet:"Zoomies",
 bath:"a sunlit locker-room shower beside the savanna track",role:"the star sprinter",acc:"golden savanna light",
 c:{age:"young woman",faceShape:"small, softly rounded face with a pointed chin",eyeConfig:"matching",eyeShape:"large, bright, upturned eyes",pupilStyle:"round pupils",irisDetail:"bright amber irises with a dark limbal ring",
  lashNatural:"long, dark eyelashes",eyeOne:"amber",browShape:"soft, straight brows",noseShape:"small, upturned nose",mouthShape:"small, cheeky lips",
  expression:"cocky, sparkling grin",impression:"a bright, cocky, bouncy energy",faceMark:"faint dark tear-line markings from the inner corners of her eyes",
  hairStyle:"layered bob with wispy face-framing pieces",hairLength:"chin-length",hairTexture:"silky and feathery",bangs:"wispy see-through bangs",hairMovement:"flips out behind her as she runs",
  hairBase:"@primary",hairUnderlayer:"@primary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"a few black spotted flecks through the golden blonde",
  skinTone:"light golden tan",undertone:"golden",skinFinish:"smooth, sun-kissed skin with a light sheen",markings:"a sprinkle of dark freckles across her nose, shoulders and back",
  makeupStyle:"sporty natural makeup",eyelinerStyle:"thin dark eyeliner",eyeshadowStyle:"warm peach shimmer eyeshadow",lashStyle:"natural lashes",blushStyle:"sporty flushed blush",lipFinish:"tinted lip balm",faceAccents:"nose-tip highlight",nailStyle:"short rounded fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"narrow, sloped shoulders",torsoShape:"lean, slim torso",armShape:"slim, toned arms",handShape:"slender and quick",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, perky fullness",waistShape:"tiny waist",stomachShape:"flat stomach with light ab definition",
  hipShape:"slim, rounded hips",buttSize:"small, round, toned butt",thighBuild:"lean, toned thighs",legShape:"very long, slender sprinter's legs",bodySoftness:"slim, lean hourglass figure",
  posture:"bouncing on her toes at the starting line with a cocky grin",
  nippleColor:"light pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["{c} knee-high socks with {c2} spotted tops","@third",null,"@secondary"],earAccessory:["small gold stud earrings","-"],tagCharm:["small cheetah crest badge","@accent"]},
 blurb:"A cocky little sprinter with a chin-length golden-blonde layered bob flecked with black, bright amber eyes with faint tear-line markings, freckled sun-kissed skin and a sparkling grin. A golden hooded robe lined in black over a cream vest and black pleated skirt, spotted knee-high socks and a tangerine tie."},

{k:"cougar",sis:"wolf",pal:{primary:"caramel brown",secondary:"cream",third:"chocolate brown",accent:"sage green",extra:"silver"},
 man:{primary:"dark brown",secondary:"charcoal gray",third:"forest green",accent:"amber",extra:"black"},
 room:"a mountain lodge loft above the canyon, a woven blanket on the bed",pride:"the scrappiest mountain lion in the pride",pet:"Cub",
 bath:"a stone lodge shower, the red-rock canyon outside the window",role:"the mountain lion",acc:"red-rock canyon light at sunset",
 c:{age:"young woman",faceShape:"oval face with defined cheekbones and soft cheeks",eyeConfig:"matching",eyeShape:"large, upturned, sharp eyes",pupilStyle:"round pupils",irisDetail:"golden-green irises with a bright inner ring",
  lashNatural:"long, dark eyelashes",eyeOne:"hazel",browShape:"straight, defined brows",noseShape:"straight, slightly upturned nose",mouthShape:"wide, full lips",
  expression:"smug, challenging smirk",impression:"a scrappy, competitive confidence with a cute, boyish charm",faceMark:"a small scar through the edge of one eyebrow",
  hairStyle:"sleek layered cut with curtain bangs",hairLength:"shoulder-length",hairTexture:"smooth, straight and glossy",bangs:"curtain bangs",hairMovement:"falls neatly around her shoulders",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"cream highlights through the caramel with darker chocolate roots",
  skinTone:"warm beige",undertone:"honey",skinFinish:"smooth, healthy skin with a sun-warmed glow",markings:"no markings",bodyMarkings:"a small mountain-and-paw-print tattoo on her ribs",
  makeupStyle:"natural glam makeup",eyelinerStyle:"smudged brown eyeliner",eyeshadowStyle:"warm bronze eyeshadow",lashStyle:"natural lashes",blushStyle:"soft terracotta blush",lipFinish:"satin rose-brown lips",faceAccents:"soft cheekbone highlight",nailStyle:"short square fingernails",nailColor:"@accent",
  heightStature:"very tall stature",shoulderShape:"broad, athletic shoulders",torsoShape:"long, lean torso",armShape:"long, toned arms",handShape:"long and strong",
  bustSize:"very large breasts",bustShape:"full, round, natural shape",bustWeight:"heavy fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"wide hips",buttSize:"round, firm, muscular butt",thighBuild:"long, powerful thighs",legShape:"very long, strong legs",bodySoftness:"tall, lean, athletic hourglass build",
  posture:"leaning against a rock with her arms crossed under her breasts, smirking",
  nippleColor:"dusky rose",nippleType:"puffy",nippleLength:"medium-length",areolaColor:"dusky rose",areolaType:"smooth",areolaSize:"large",vaginaColor:"rosy pink",vaginaType:"full and plump",pubicHair:"short, closely trimmed pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@third"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} over-the-knee socks","@third"],earAccessory:["silver hoop earrings","@extra"],tagCharm:["small cougar crest badge","@accent"],wristAccessory:["{c} leather cuff","@third"]},
 blurb:"A tall, scrappy mountain lion with a sleek shoulder-length caramel cut with cream highlights and curtain bangs, golden-green eyes, a tiny scar through one brow, warm beige skin and a smug, challenging smirk. A caramel hooded robe lined in cream over a cream vest and chocolate pleated skirt, over-the-knee socks and a sage tie."},

{k:"caracal",sis:"rat",pal:{primary:"copper red",secondary:"black",third:"cream",accent:"gold",extra:"turquoise"},
 man:{primary:"black",secondary:"charcoal gray",third:"copper red",accent:"gold",extra:"cream"},
 room:"a tiny rooftop room above a desert market, piled with cushions and treasures she bargained for",pride:"the feistiest little hunter in the pride",pet:"Pounce",
 bath:"a little tiled bathhouse with a copper tub above the desert market",role:"the feisty one",acc:"lantern light over a desert market",
 c:{age:"young woman",faceShape:"small, heart-shaped face with round cheeks",eyeConfig:"matching",eyeShape:"huge, round, upturned eyes",pupilStyle:"round pupils",irisDetail:"glossy gold irises",
  lashNatural:"long, dark eyelashes",eyeOne:"amber gold",browShape:"short, expressive brows",noseShape:"small button nose",mouthShape:"small, pouty lips",
  expression:"feisty, puffed-cheek pout",impression:"a tiny, fiery, adorable feistiness",faceMark:"white highlights above her eyes and on her chin like caracal markings",
  hairStyle:"sleek pixie cut with long side-swept bangs",hairLength:"short",hairTexture:"silky and smooth",bangs:"long side-swept bangs",hairMovement:"frames her face with two long black-tipped locks that flick like ear tufts",
  hairBase:"@primary",hairUnderlayer:"@primary",hairInner:"@third",hairHighlights:"@secondary",hairBlend:"black tips on the long locks framing her face",
  skinTone:"golden beige",undertone:"warm",skinFinish:"smooth, warm skin with a soft glow",markings:"no markings",bodyMarkings:"a tiny gold belly-button piercing",
  makeupStyle:"cat-eye glam makeup",eyelinerStyle:"bold black cat-eye eyeliner",eyeshadowStyle:"copper shimmer eyeshadow",lashStyle:"fluttery lashes",blushStyle:"rosy flushed blush",lipFinish:"glossy rose lips",faceAccents:"soft under-eye highlight",nailStyle:"short almond fingernails",nailColor:"@accent",
  heightStature:"a petite frame",shoulderShape:"small, narrow shoulders",torsoShape:"small, slim torso",armShape:"slim arms",handShape:"small and quick",
  bustSize:"small, perky breasts",bustShape:"perky, round shape",bustWeight:"light fullness",waistShape:"tiny waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy little hips",buttSize:"round, perky, bubbly butt",thighBuild:"toned thighs",legShape:"short, toned legs",bodySoftness:"petite, lean hourglass figure",
  posture:"springing up on her toes with her fists balled, ready to fight",
  nippleColor:"rosy pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"rosy pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["{c} thigh-high socks with {c2} tassels","@secondary",null,"@accent"],earAccessory:["little gold tassel earrings","@accent"],tagCharm:["small caracal crest badge","@extra"]},
 blurb:"A tiny, fiery little hunter with a sleek copper-red pixie cut, long side-swept bangs and black-tipped locks at her temples like ear tufts, huge gold eyes, golden-beige skin and a puffed-cheek pout. A black hooded robe lined in copper over a cream vest and copper pleated skirt, tasseled thigh-highs and gold tassel earrings."}
];

/* ---- v213: lore for the Lioness's pack (same fields as girls210lore.js) */
const NEWLORE3={
jaguar:{touch:"lit by jade lanterns and green jungle light",room:"a jade-draped jungle temple bedroom",roomL:"a jade-draped jungle temple bedroom",out:"a jungle temple stairway at sunset",
  g:{id:"shoulder-length sleek golden lob with black rosette lowlights and blunt bangs, emerald catlike eyes, golden tan skin, a tiny beauty mark beneath one eye",fig:"lean, athletic hourglass, large breasts",col:"emerald green",
    out:"a jungle temple stairway at sunset, vines and jade lanterns",light:"warm jungle sunset, dappled light",room:"a bedroom with jade silk drapes",bath:"a carved stone temple bath with jade lanterns"},
  fx:"drifting jungle leaves, glowing jade lanterns",mot:"jaguar-heart",mot2:"jaguar",tmot:"rosette",emb:"roaring-jaguar",pk:"a Liepard prowling at her side",
  words:[["dragon scales and claws","jaguar rosettes and claws"],["gold dragon-scale embroidery","gold rosette embroidery"],["dragon-scale trim","rosette-print trim"],["dragon-scale pauldron","jaguar-pelt pauldron"],
    ["dragon-scale breastplate","jaguar-pelt breastplate"],["cozy dragon-scale hooded onesie with little horns and a tail","cozy jaguar hooded onesie with little round ears and a spotted tail"],["dragon-scale","rosette-print"],["dragon scale","rosette-print"],
    ["scale embroidery","rosette embroidery"],["scale-edged","rosette-edged"],["small curved horn headband","small round jaguar-ear headband"],["large bat wings (costume)","long spotted jaguar tail (costume)"],["long scaled dragon tail","long spotted jaguar tail"],
    ["plush spa headband with small horns","plush spa headband with small round ears"],["horn spikes","jade spikes"],["scaled hide shoulder wrap","jaguar-pelt shoulder wrap"],["dragon horns","jaguar ears"],["red-draped tower","jade-draped temple"]],
  colors:[["crimson red","amber gold"],["Crimson red","Amber gold"],["burgundy","emerald green"],["Burgundy","Emerald green"],["cheeks flushed crimson","cheeks flushed crimson"],["cheeks crimson","cheeks crimson"],["face is crimson","face is crimson"],
    ["regal crimson","regal emerald"],["crimson backdrop","emerald backdrop"],["crimson silk","emerald silk"],["crimson rope","emerald rope"],["crimson battle crown","gold battle crown"],["Crimson cheer","Emerald cheer"]]},
cheetah:{touch:"in warm golden savanna light",room:"a sunny dorm room lined with trophies",roomL:"a sunny dorm room lined with trophies, the savanna track outside",out:"a savanna running track at golden hour",
  g:{id:"chin-length golden-blonde layered bob flecked with black, wispy bangs, bright amber eyes, faint dark tear-line markings, light golden tan skin, freckles",fig:"slim, lean sprinter's hourglass, medium breasts",col:"tangerine orange",
    out:"a savanna track at golden hour, acacia trees",light:"golden hour, warm backlight, rim light",room:"a sunny dorm room lined with trophies",bath:"a sunlit locker-room shower, golden light"},
  fx:"speed lines, golden dust",mot:"lightning-bolt",mot2:"spot-and-stripe",tmot:"cheetah-spot",emb:"running-cheetah",pk:"a Boltund racing beside her",
  words:[["sharp-toothed smirk","cocky smirk"],["sharp-toothed grin","cocky grin"],["toothy grin","cocky grin"],["toothy mouth","open mouth"],["with sharp teeth","with a cocky smile"],["her sharp teeth","her cocky smile"],["sharp teeth","a cocky smile"],
    ["careful with her sharp teeth","careful with her teeth"],["shark tooth earrings","gold medal earrings"],["shark-tooth necklace","gold medal necklace"],["shark-tooth pendant","cheetah-spot pendant"],["shark-tooth clasp","cheetah-spot clasp"],
    ["fin-shaped train","spotted train"],["tooth-trimmed hood","spot-trimmed hood"],["jagged tooth-edged neckline","spotted neckline"],["shark fins and cresting waves","cheetah spots and racing stripes"],["shark teeth","gold medals"],
    ["wave-and-fin","spot-and-stripe"],["sharkskin shoulder wrap","cheetah-print shoulder wrap"],["shark skin stockings","cheetah-print stockings"],["Predator and prey","Cat and mouse"],["I bite♡","I pounce♡"],["Bite?♡","Pounce?♡"],
    ["sharks and rays","sharks and rays"],["passing shark","passing shark"],["sharks","sharks"],["shark tank","shark tank"]],
  colors:[["steel blue","sandy blonde"],["steel-blue","sandy-blonde"],["Steel blue","Sandy blonde"],["coral red","tangerine orange"],["coral-red","tangerine-orange"]]},
cougar:{touch:"with red-rock canyon light at sunset",room:"a mountain lodge loft above the canyon",roomL:"a mountain lodge loft above the canyon, a woven blanket on the bed",out:"a canyon rim trail at sunset",
  g:{id:"shoulder-length sleek caramel hair with cream highlights and curtain bangs, golden-green eyes, a small scar through one eyebrow, warm beige skin",fig:"very tall, lean athletic hourglass, very large breasts",col:"sage green",
    out:"a red-rock canyon at sunset, pines on the rim",light:"sunset, warm canyon light, rim light",room:"a mountain lodge loft with a woven blanket",bath:"a stone lodge shower, the canyon outside the window"},
  fx:"canyon dust, sunset glow",mot:"cougar-paw",mot2:"prowling-cougar",tmot:"canyon-and-pine",emb:"prowling-cougar",pk:"a Persian lounging on a rock beside her",
  words:[["howling wolf heads","snarling cougar heads"],["howling-wolf","prowling-cougar"],["howling wolf","prowling cougar"],["wolf-fang pendant","cougar-claw pendant"],["wolf-moon","cougar-paw"],["moon-and-pine","canyon-and-pine"],
    ["wolfish crouches","feline crouches"],["wolfish crouch","feline crouch"],["Pack hunt","Pride hunt"],["howls","growls"],["howling","growling"],["howl","growl"],["a fur rug","a woven rug"],["fur rug","woven rug"],["a fur throw","a woven blanket"],["fur throw","woven blanket"],
    ["log cabin","mountain lodge"],["cabin fire","lodge fire"]],
  colors:[["steel gray","caramel brown"],["steel-gray","caramel-brown"],["Steel gray","Caramel brown"],["ice-blue moon-and-pine embroidery","sage canyon-and-pine embroidery"]]},
caracal:{touch:"in warm lantern light over a desert market",room:"a tiny rooftop room above a desert market",roomL:"a tiny rooftop room above a desert market, piled with cushions and treasures",out:"a lantern-lit desert market alley at night",
  g:{id:"short sleek copper-red pixie cut with long side-swept bangs and black-tipped locks at the temples, huge gold eyes, white markings above the eyes, golden beige skin",fig:"petite, lean hourglass, small breasts, round butt",col:"copper red",
    out:"a desert market alley at night, hanging lanterns",light:"warm lantern light, soft ambient light",room:"a rooftop room piled with embroidered cushions",bath:"a tiled bathhouse with a copper tub, lanterns"},
  fx:"lantern glow, drifting spice dust",mot:"caracal-ear",mot2:"tassel-and-moon",tmot:"crescent-moon",emb:"leaping-caracal",pk:"a Purrloin perched on her shoulder with a stolen ring in its paws",
  words:[["Squeak squeak","Mrrp mrrp"],["SQUEAK♡","MRRP♡"],["SQUEAK..","MRRP.."],["squeaks","chirps"],["squeak","chirp"],["a stolen wedge of cheese","a stolen pomegranate"],["wedge of cheese","pomegranate"],["cheese stalls","spice stalls"],
    ["round mouse ears","tall tufted caracal ears"],["long thin rat tail attached at the lower back","short caracal tail attached at the lower back"],["long thin rat tail","short caracal tail"],["rat ears","tufted caracal ears"],["rat-tail charms","tassel charms"],["rat-tail","tassel"],
    ["treasure-nest set","treasure-cushion set"],["giant nest woven from silver ribbon and twigs","giant pile of embroidered floor cushions"],["the giant nest","the pile of embroidered cushions"],["rose quartz pendant","carnelian pendant"],
    ["neon-lit city alley","lantern-lit desert market alley"],["a row of rats watches from the branches","a caracal watches from the palm branches"],["arms spread like wings among the rats","arms spread wide under the desert moon"],
    ["a moonlit city rooftop crowded with rats","a moonlit rooftop above the desert market"],["a pack of rats crouched along the railings around her","a pair of caracals perched on the railings around her"],["among a pack of rats","among the market cats"],["rooftop rats","rooftop cats"]],
  colors:[["ash gray","copper red"],["ash-gray","copper-red"],["Ash gray","Copper red"],["rose pink","gold"],["rose-pink","gold"],["mustard yellow","cream"]]}};

const NEWHEADS3={
jaguar:{c:{age:"mature woman",faceShape:"strong heart-shaped face with high cheekbones",expression:"fierce, knowing smile",impression:"a fierce, regal presence",hairStyle:"sleek chin-length bob",bangs:"blunt bangs",makeupStyle:"bold glam makeup",bodySoftness:"tall, athletic, mature hourglass figure"},
  blurb:"The Jaguar headmistress: a tall, athletic woman with a sleek golden chin-length bob streaked with black, emerald eyes, golden-tan skin and a fierce, knowing smile."},
cheetah:{c:{age:"mature woman",faceShape:"refined, softly rounded face",expression:"bright, competitive grin",impression:"a quick, energetic, sporty presence",hairStyle:"sleek pixie cut",bangs:"side-swept bangs",makeupStyle:"sporty natural makeup",bodySoftness:"slim, lean, mature figure"},
  blurb:"The Cheetah headmistress: a slim, long-legged woman with a sleek golden-blonde pixie cut, amber eyes with faint tear-line markings, freckles and a bright, competitive grin."},
cougar:{c:{age:"mature woman",faceShape:"strong oval face with high cheekbones",expression:"cool, appraising smirk",impression:"a cool, confident, worldly allure",hairStyle:"sleek layered bob",bangs:"curtain bangs",makeupStyle:"glamorous soft smoky makeup",bodySoftness:"very tall, mature hourglass figure"},
  blurb:"The Cougar headmistress: a very tall, voluptuous woman with a sleek caramel layered bob, golden-green eyes and a cool, appraising smirk."},
caracal:{c:{age:"mature woman",faceShape:"small heart-shaped face with high cheekbones",expression:"sharp, sly smile",impression:"a sharp, quick-witted charm",hairStyle:"sleek asymmetric bob",bangs:"long side-swept bangs",makeupStyle:"cat-eye glam makeup"},
  blurb:"The Caracal headmistress: a petite, toned woman with a sleek copper-red asymmetric bob tipped black, huge gold eyes behind a monocle and a sharp, sly smile."}};

const NEWMEN3={
jaguar:{c:{eyeOne:"emerald green",markings:"a jaguar tattoo coiling down one arm"},
  blurb:"A warrior fierce enough to win her over: a huge, bronze-skinned fighter with a long black half-up warrior braid, emerald eyes, a short boxed beard and a jaguar tattoo coiling down one arm. She hasn't let him past a kiss yet. Leather and chains, battle armor, or bare."},
cheetah:{c:{eyeOne:"warm brown",hairStyle:"short textured crop",markings:"a lightning-bolt tattoo along the ribs"},
  blurb:"Her training partner: a tall, ripped lifeguard and track coach with a short dark brown crop, warm brown eyes, a cocky grin, light stubble and a lightning-bolt tattoo along his ribs; the only one who can keep up with her on the sand. An open Hawaiian shirt and board shorts, beach linen, or just the trunks."},
cougar:{c:{eyeOne:"amber",markings:"claw-mark scars across the torso"},
  blurb:"Her wild match: a huge, rugged mountain ranger with a long dark shag, amber eyes, heavy stubble, a hairy chest and claw-mark scars. She makes him earn every inch. Flannel and a shearling jacket, or shirtless in worn jeans."},
caracal:{c:{eyeOne:"gray",markings:"a caracal-and-key tattoo along one forearm"},
  blurb:"Her locksmith: a lean, wiry street mechanic with a slicked-back black undercut, sly gray eyes, stubble, a roguish lopsided grin and a caracal-and-key tattoo along one forearm. He can open any door in the market for her. A grease-smudged tank top and tool belt, a battered leather jacket, or nothing."}};

const NEWSIG3={
jaguar:["Jungle Warrior","the fiercest warrior in the jungle","feisty, pouty glare","crouched on a temple step with a spear, ready to pounce","a jungle temple stairway at sunset, vines and jade lanterns",
  {top:["{c} rosette-print halter crop top with gold trim","@primary"],bottom:["{c} wrapped loincloth skirt with jade beads","@secondary"],shoulderPiece:["{c} feathered warrior pauldron","@third"],heldItem:["jade-tipped spear","-"],neckAccessory:["gold jaguar-fang collar","@accent"]}],
cheetah:["Golden Sprint","the fastest girl alive","cocky, sparkling grin","crouched in a sprinter's start on a golden track","a savanna running track at golden hour, acacia trees beyond",
  {top:["{c} spotted racer-back sports bra","@primary"],bottom:["{c} high-cut running briefs","@secondary"],outerwear:["cropped {c} track jacket worn open","@third"],headwear:["{c} sweatband","@accent"],neckAccessory:["gold medal on a ribbon","-"]}],
cougar:["Canyon Queen","the scrappiest mountain lion in the pride","smug, challenging smirk","sitting on a red rock ledge with one knee up","a red-rock canyon at sunset, pines on the rim",
  {top:["{c} plaid flannel shirt tied above the waist","@third"],bra:["{c} lace bralette","@secondary"],bottom:["{c} high-waisted denim shorts","@primary"],legwear:["{c} lace-up hiking boots","@third"],headwear:["{c} wide-brim hat","@primary"]}],
caracal:["Market Thief","the feistiest little hunter in the pride","feisty, puffed-cheek pout","springing off a market awning with a stolen pomegranate","a lantern-lit desert market at night, rugs and spice stalls below",
  {top:["{c} cropped silk bolero with gold coin trim","@primary"],bra:["{c} coin-trimmed bandeau","@accent"],bottom:["sheer {c} harem pants","@secondary"],waistAccessory:["gold coin hip chain","-"],heldItem:["stolen pomegranate","-"]}]};

/* ---- v217: wave 4 of the house pass. The Hive gets its queen and six new bugs, and the Pride its tenth cat.
   Bee (Flamingo's stories), Mantis (Dragon's), Spider (Serpent's), Ladybug (Lovebird's), Moth (Owl's), Dragonfly (Shark's),
   Beetle (Badger's), Serval (Fox's). Only the look sets and the scene sets still on the Scenes list are re-cut for them. */
const NEWGIRLS4=[
{k:"bee",sis:"flamingo",pal:{primary:"honey gold",secondary:"soft black",third:"cream",accent:"gold",extra:"amber"},
 man:{primary:"soft black",secondary:"honey gold",third:"cream",accent:"gold",extra:"charcoal gray"},
 room:"a honey-gold tower suite with hexagonal windows and a canopy bed",pride:"the queen of the Hive",pet:"Honey",
 bath:"a honey-gold marble bath under hexagonal windows",role:"the queen",acc:"warm honey-gold light through hexagonal windows",
 c:{age:"young woman",faceShape:"soft oval face with full cheeks and a rounded chin",eyeConfig:"matching",eyeShape:"large, warm, doe-like eyes",pupilStyle:"round pupils",irisDetail:"honey-gold irises with amber flecks",
  lashNatural:"long, full eyelashes",eyeOne:"amber",browShape:"softly arched brows",noseShape:"small, softly rounded nose",mouthShape:"full, heart-shaped lips",
  expression:"warm, regal smile",impression:"a warm, commanding sweetness",faceMark:"a tiny beauty mark above her lip",
  hairStyle:"long voluminous curls with a braided crown",hairLength:"waist-length",hairTexture:"thick, glossy curls",bangs:"soft curtain bangs",hairMovement:"falls in bouncing honey-gold curls down her back",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"a few black underlayer stripes peeking through the honey-gold curls",
  skinTone:"golden tan",undertone:"warm golden",skinFinish:"smooth, glowing skin with a honeyed sheen",markings:"no markings",bodyMarkings:"a small honeycomb tattoo on her hip",
  makeupStyle:"glamorous golden makeup",eyelinerStyle:"soft winged eyeliner",eyeshadowStyle:"honey-gold shimmer eyeshadow",lashStyle:"full glamorous lashes",blushStyle:"warm peach blush",lipFinish:"glossy honey-nude lips",faceAccents:"golden cheekbone highlight",nailStyle:"long almond fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"soft, rounded shoulders",torsoShape:"soft, feminine torso",armShape:"soft, slender arms",handShape:"graceful hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"soft, heavy fullness",waistShape:"narrow waist",stomachShape:"soft, flat stomach",
  hipShape:"wide, curvy hips",buttSize:"full, round butt",thighBuild:"soft, full thighs",legShape:"shapely legs",bodySoftness:"voluptuous hourglass figure",
  posture:"standing with one hand on her hip, chin lifted like a queen",
  nippleColor:"caramel pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"caramel pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@secondary"],
  legwear:["{c} thigh-high stockings with {c2} striped tops","@secondary",null,"@primary"],earAccessory:["gold honeycomb earrings","@accent"],headwear:["small {c} crown hairpin","@accent"],tagCharm:["small bee crest badge","@accent"]},
 blurb:"The Hive's long-awaited queen: waist-length honey-gold curls in a braided crown with black underlayer stripes, warm amber eyes, golden-tan skin and a voluptuous hourglass figure. A black hooded robe lined in honey gold over a cream vest and black pleated skirt, a striped tie, striped-top stockings, gold honeycomb earrings and a little crown hairpin."},

{k:"mantis",sis:"dragon",pal:{primary:"jade green",secondary:"white",third:"mint green",accent:"gold",extra:"black"},
 man:{primary:"black",secondary:"white",third:"jade green",accent:"gold",extra:"charcoal gray"},
 room:"a minimalist dojo bedroom with paper screens and a jade bonsai",pride:"the deadliest blade in the Hive",pet:"Grasshopper",
 bath:"a cedar soaking tub behind paper screens, a bamboo garden outside",role:"the martial artist",acc:"soft green light through paper screens",
 c:{age:"young woman",faceShape:"slender, angular face with high cheekbones and a delicate pointed chin",eyeConfig:"matching",eyeShape:"large, sharp, upturned almond eyes",pupilStyle:"round pupils",irisDetail:"bright jade irises with a gold ring",
  lashNatural:"long, straight dark eyelashes",eyeOne:"emerald green",browShape:"straight, elegant brows",noseShape:"small, straight nose",mouthShape:"soft, composed lips",
  expression:"cool, focused calm",impression:"a poised, deadly elegance",faceMark:"two small beauty marks beneath her left eye",
  hairStyle:"sleek high ponytail",hairLength:"hip-length",hairTexture:"sleek, silky straight",bangs:"long side-swept bangs",hairMovement:"swings like a blade with every turn",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"a soft fade from deep jade to mint green at the ends",
  skinTone:"porcelain",undertone:"neutral",skinFinish:"smooth, flawless porcelain skin",markings:"no markings",bodyMarkings:"a slender green mantis tattoo along her spine",
  makeupStyle:"clean, elegant makeup",eyelinerStyle:"sharp thin winged eyeliner",eyeshadowStyle:"soft jade shimmer eyeshadow",lashStyle:"lifted lashes",blushStyle:"faint rosy blush",lipFinish:"soft satin rose lips",faceAccents:"subtle highlight on the nose bridge",nailStyle:"long pointed fingernails",nailColor:"@third",
  heightStature:"tall stature with long limbs",shoulderShape:"slim, square shoulders",torsoShape:"long, lean torso",armShape:"long, toned arms",handShape:"long, elegant fingers",
  bustSize:"small-to-medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"slim, defined waist",stomachShape:"flat, toned stomach with faint abs",
  hipShape:"slim, elegant hips",buttSize:"small, firm, toned butt",thighBuild:"long, toned thighs",legShape:"very long, lean legs",bodySoftness:"tall, lean, long-limbed build",
  posture:"poised in a martial arts stance, hands raised like folded blades",
  nippleColor:"soft pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"soft pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@extra"],
  legwear:["sheer {c} stockings","@extra"],earAccessory:["jade drop earrings","@primary"],tagCharm:["small mantis crest badge","@accent"]},
 blurb:"The Hive's blade: a tall, long-limbed martial artist with hip-length jade-green hair in a sleek high ponytail fading to mint, sharp emerald eyes, porcelain skin and a cool, focused calm. A white hooded robe lined in jade over a mint vest and jade pleated skirt, a gold-and-black tie, sheer black stockings and jade drop earrings."},

{k:"spider",sis:"serpent",pal:{primary:"black",secondary:"deep crimson",third:"charcoal gray",accent:"silver",extra:"white"},
 man:{primary:"charcoal gray",secondary:"black",third:"deep crimson",accent:"silver",extra:"white"},
 room:"a gothic attic bedroom draped in black lace, a spinning wheel by the window",pride:"the Hive's black widow",pet:"Itsy",
 bath:"a black marble clawfoot tub under a lace canopy, candles burning",role:"the black widow",acc:"candlelight through black lace",
 c:{age:"young woman",faceShape:"elegant oval face with sharp cheekbones and a delicate chin",eyeConfig:"matching",eyeShape:"heavy-lidded, sultry almond eyes",pupilStyle:"round pupils",irisDetail:"deep crimson irises with dark rings",
  lashNatural:"long, thick black eyelashes",eyeOne:"crimson",browShape:"sharp, arched brows",noseShape:"small, straight nose",mouthShape:"full, dark-painted lips",
  expression:"slow, knowing smile",impression:"a dark, patient, seductive allure",faceMark:"a small beauty mark at the corner of her mouth",
  hairStyle:"sleek hime cut",hairLength:"very long",hairTexture:"silky straight",bangs:"blunt bangs",hairMovement:"falls like black silk to her thighs",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"a hidden deep-crimson underlayer that flashes when she moves",
  skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, pale, flawless skin",markings:"no markings",bodyMarkings:"a small red hourglass tattoo on her lower back",
  makeupStyle:"gothic glam makeup",eyelinerStyle:"smoky black eyeliner",eyeshadowStyle:"smoky charcoal and crimson eyeshadow",lashStyle:"dramatic lashes",blushStyle:"faint cool blush",lipFinish:"matte deep-crimson lips",faceAccents:"high cheekbone highlight",nailStyle:"long pointed fingernails",nailColor:"@primary",
  heightStature:"tall stature",shoulderShape:"slender shoulders",torsoShape:"slim upper torso",armShape:"slender arms",handShape:"long, delicate fingers",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"soft, heavy fullness",waistShape:"very narrow waist",stomachShape:"flat stomach",
  hipShape:"wide, curvy hips",buttSize:"full, round butt",thighBuild:"soft, full thighs",legShape:"long, shapely legs",bodySoftness:"tall, exaggerated hourglass figure",
  posture:"lounging back on her hands with one leg crossed slowly over the other",
  nippleColor:"dusky rose",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"dusky rose",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@accent"],
  legwear:["{c} spiderweb lace thigh-high stockings","@primary"],earAccessory:["silver spider earrings","@accent"],tagCharm:["small spider crest badge","@accent"]},
 blurb:"The Hive's black widow: a tall, pale seductress with thigh-length black hair in a blunt hime cut over a hidden crimson underlayer, heavy-lidded crimson eyes, dark lips and an exaggerated hourglass figure. A black hooded robe lined in deep crimson over a charcoal vest and black pleated skirt, spiderweb-lace stockings and silver spider earrings."},

{k:"ladybug",sis:"lovebird",pal:{primary:"cherry red",secondary:"black",third:"white",accent:"gold",extra:"leaf green"},
 man:{primary:"black",secondary:"cherry red",third:"white",accent:"gold",extra:"leaf green"},
 room:"a sunny garden cottage bedroom full of potted flowers and polka-dot cushions",pride:"the luckiest girl in the Hive",pet:"Lucky",
 bath:"a white clawfoot tub surrounded by potted flowers",role:"the lucky charm",acc:"bright garden sunlight through flowering vines",
 c:{age:"young woman",faceShape:"round, sweet face with soft full cheeks",eyeConfig:"matching",eyeShape:"big, round, sparkling eyes",pupilStyle:"round pupils",irisDetail:"warm brown irises with bright highlights",
  lashNatural:"long, curled eyelashes",eyeOne:"warm brown",browShape:"soft, rounded brows",noseShape:"small button nose",mouthShape:"soft, full lips",
  expression:"bright, dimpled smile",impression:"a sunny, lucky, bubbly charm",faceMark:"a scattering of dark freckles across her nose and cheeks like ladybug spots",
  hairStyle:"glossy rounded bob",hairLength:"chin-length",hairTexture:"glossy and smooth",bangs:"blunt rounded bangs",hairMovement:"bounces with every step",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@primary",hairBlend:"a black underlayer peeking out beneath the cherry red",
  skinTone:"rosy fair",undertone:"warm pink",skinFinish:"soft, dewy skin",markings:"dark freckles scattered across her shoulders like ladybug spots",bodyMarkings:"a tiny ladybug tattoo on her ankle",
  makeupStyle:"fresh, rosy makeup",eyelinerStyle:"thin black eyeliner",eyeshadowStyle:"soft peach shimmer eyeshadow",lashStyle:"curled lashes",blushStyle:"rosy round blush",lipFinish:"glossy cherry lips",faceAccents:"soft highlight on the cheeks",nailStyle:"short rounded fingernails",nailColor:"@primary",
  heightStature:"short stature",shoulderShape:"soft, narrow shoulders",torsoShape:"soft torso",armShape:"soft arms",handShape:"soft hands",
  bustSize:"large, full breasts",bustShape:"round, soft shape",bustWeight:"soft fullness",waistShape:"narrow waist",stomachShape:"soft, flat stomach",
  hipShape:"rounded hips",buttSize:"round, soft butt",thighBuild:"soft thighs",legShape:"short, shapely legs",bodySoftness:"soft, curvy hourglass figure",
  posture:"rising onto her toes and holding up a four-leaf clover",
  nippleColor:"pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"a small, neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@secondary"],
  legwear:["{c} thigh-high socks with {c2} polka dots","@secondary",null,"@primary"],earAccessory:["gold ladybug stud earrings","@accent"],headwear:["{c} polka-dot hair clips","@secondary"],tagCharm:["small ladybug crest badge","@accent"]},
 blurb:"The Hive's lucky charm: a short, curvy sweetheart with a glossy cherry-red bob over a black underlayer, big warm brown eyes, ladybug-spot freckles, rosy fair skin and a dimpled smile. A black hooded robe lined in cherry red over a white vest and red pleated skirt, polka-dot socks, polka-dot hair clips and gold ladybug earrings."},

{k:"moth",sis:"owl",pal:{primary:"pale lavender",secondary:"mint green",third:"cream",accent:"pale gold",extra:"dusty lavender"},
 man:{primary:"charcoal gray",secondary:"dusty lavender",third:"cream",accent:"pale gold",extra:"black"},
 room:"a lamp-lit attic bedroom strung with fairy lights and paper lanterns",pride:"the Hive's night-blooming dreamer",pet:"Moonbeam",
 bath:"a lamp-lit attic bathtub surrounded by candles and paper lanterns",role:"the dreamer",acc:"warm lantern light glowing in the dark",
 c:{age:"young woman",faceShape:"soft, rounded oval face",eyeConfig:"matching",eyeShape:"large, sleepy, round eyes",pupilStyle:"round pupils",irisDetail:"pale gold irises with a soft glow",
  lashNatural:"long, feathery pale eyelashes",eyeOne:"pale gold",browShape:"soft, feathery brows",noseShape:"small, softly rounded nose",mouthShape:"soft, full lips",
  expression:"dreamy, sleepy smile",impression:"a soft, dreamy, nocturnal sweetness",faceMark:"faint silvery freckles across her cheeks",
  hairStyle:"long, soft, layered waves",hairLength:"waist-length",hairTexture:"soft and feathery",bangs:"wispy feathered bangs",hairMovement:"drifts softly around her shoulders",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"pale mint-green tips like luna moth wings",
  skinTone:"very fair",undertone:"cool",skinFinish:"soft, luminous skin",markings:"no markings",bodyMarkings:"a pale luna-moth tattoo across her upper back",
  makeupStyle:"soft ethereal makeup",eyelinerStyle:"soft brown eyeliner",eyeshadowStyle:"lilac shimmer eyeshadow",lashStyle:"fluttery lashes",blushStyle:"soft lavender-pink blush",lipFinish:"soft glossy pink lips",faceAccents:"pearly highlight",nailStyle:"short oval fingernails",nailColor:"@secondary",
  heightStature:"average height",shoulderShape:"soft, rounded shoulders",torsoShape:"soft, curvy torso",armShape:"soft arms",handShape:"soft, delicate hands",
  bustSize:"very large, soft breasts",bustShape:"round, heavy shape",bustWeight:"soft, heavy fullness",waistShape:"soft, narrow waist",stomachShape:"soft stomach",
  hipShape:"wide, soft hips",buttSize:"full, soft butt",thighBuild:"thick, soft thighs",legShape:"soft, shapely legs",bodySoftness:"soft, voluptuous hourglass figure",
  posture:"drifting toward a glowing lantern, reaching out for it",
  nippleColor:"pale pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pale pink",areolaType:"smooth",areolaSize:"large",vaginaColor:"pale pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@extra"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@accent"],
  legwear:["{c} fuzzy knit thigh-high socks","@secondary"],earAccessory:["pale gold moon-drop earrings","@accent"],tagCharm:["small moth crest badge","@accent"]},
 blurb:"The Hive's sleepy night-flier: waist-length soft pale-lavender waves tipped in mint like luna moth wings, glowing pale-gold eyes, very fair skin and a soft, voluptuous figure. A lavender hooded robe lined in mint over a cream vest and dusty-lavender pleated skirt, fuzzy mint socks and pale gold moon-drop earrings."},

{k:"dragonfly",sis:"shark",pal:{primary:"teal",secondary:"cobalt blue",third:"silver",accent:"lime green",extra:"black"},
 man:{primary:"black",secondary:"cobalt blue",third:"silver",accent:"lime green",extra:"white"},
 room:"a hangar-loft bedroom with model planes hanging from the rafters",pride:"the fastest flier in the Hive",pet:"Zip",
 bath:"a steel-and-glass shower in a hangar loft, the airfield outside",role:"the daredevil",acc:"bright summer sky over a grassy airfield",
 c:{age:"young woman",faceShape:"small, sharp face with a pointed chin",eyeConfig:"matching",eyeShape:"large, bright, wide-set eyes",pupilStyle:"round pupils",irisDetail:"iridescent blue-green irises",
  lashNatural:"short, dark eyelashes",eyeOne:"turquoise",browShape:"straight, confident brows",noseShape:"small, straight nose",mouthShape:"wide, grinning mouth",
  expression:"cocky, sparkling grin",impression:"a quick, fearless, electric energy",faceMark:"a light dusting of freckles across her nose",
  hairStyle:"sleek pixie cut with a long swept fringe",hairLength:"short",hairTexture:"sleek and smooth",bangs:"long swept fringe",hairMovement:"whips back in the wind",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"an iridescent teal, cobalt and lime sheen like dragonfly wings",
  skinTone:"light tan",undertone:"warm",skinFinish:"smooth, sun-kissed skin",markings:"no markings",bodyMarkings:"a dragonfly tattoo on her shoulder blade",
  makeupStyle:"sporty natural makeup",eyelinerStyle:"thin graphic eyeliner",eyeshadowStyle:"iridescent teal eyeshadow",lashStyle:"natural lashes",blushStyle:"sun-flushed blush",lipFinish:"tinted lip balm",faceAccents:"nose-tip highlight",nailStyle:"short square fingernails",nailColor:"@accent",
  heightStature:"tall stature",shoulderShape:"athletic shoulders",torsoShape:"lean, toned torso",armShape:"toned arms",handShape:"quick, slender hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"firm fullness",waistShape:"slim waist",stomachShape:"flat, toned stomach with light abs",
  hipShape:"slim hips",buttSize:"small, firm butt",thighBuild:"toned thighs",legShape:"long, athletic legs",bodySoftness:"lean, athletic build",
  posture:"balanced on one foot with her arms flung out like wings, grinning",
  nippleColor:"light pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@accent"],
  legwear:["{c} thigh-high socks with {c2} stripes","@extra",null,"@accent"],earAccessory:["silver wing ear cuffs","@third"],headwear:["{c} aviator goggles pushed up on her head","@third"],tagCharm:["small dragonfly crest badge","@accent"]},
 blurb:"The Hive's daredevil: a tall, lean speed demon with a sleek iridescent teal pixie cut and long swept fringe, bright turquoise eyes, light-tan skin and a cocky, sparkling grin. A black hooded robe lined in teal over a silver vest and cobalt pleated skirt, striped socks, silver wing ear cuffs and aviator goggles pushed up on her head."},

{k:"beetle",sis:"badger",pal:{primary:"deep teal",secondary:"emerald green",third:"bronze",accent:"metallic gold",extra:"black"},
 man:{primary:"black",secondary:"deep teal",third:"bronze",accent:"metallic gold",extra:"charcoal gray"},
 room:"a workshop loft bedroom full of tools, gears and half-built inventions",pride:"the toughest shell in the Hive",pet:"Jewel",
 bath:"a big copper tub in the corner of a workshop loft",role:"the tinkerer",acc:"warm forge light glinting off copper",
 c:{age:"young woman",faceShape:"round face with a strong jaw and full cheeks",eyeConfig:"matching",eyeShape:"round, bright eyes",pupilStyle:"round pupils",irisDetail:"iridescent green-gold irises",
  lashNatural:"thick, dark eyelashes",eyeOne:"emerald green",browShape:"thick, determined brows",noseShape:"small, upturned nose",mouthShape:"full, wide lips",
  expression:"stubborn, cheerful grin",impression:"a tough, sunny, unshakable warmth",faceMark:"a smudge of grease on one cheek",
  hairStyle:"long thick braid over one shoulder",hairLength:"waist-length",hairTexture:"thick and glossy",bangs:"short straight bangs",hairMovement:"swings heavily when she turns",
  hairBase:"@primary",hairUnderlayer:"@extra",hairInner:"@secondary",hairHighlights:"@accent",hairBlend:"an iridescent green-and-gold sheen like a jewel beetle's shell",
  skinTone:"warm brown",undertone:"warm",skinFinish:"smooth, glowing brown skin",markings:"no markings",bodyMarkings:"a small gold scarab tattoo on her collarbone",
  makeupStyle:"minimal makeup",eyelinerStyle:"thin eyeliner",eyeshadowStyle:"metallic green-gold eyeshadow",lashStyle:"natural lashes",blushStyle:"warm bronze blush",lipFinish:"glossy plum lips",faceAccents:"golden highlight",nailStyle:"short square fingernails",nailColor:"@accent",
  heightStature:"short stature",shoulderShape:"strong shoulders",torsoShape:"strong, curvy torso",armShape:"strong, toned arms",handShape:"strong, capable hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"firm, heavy fullness",waistShape:"defined waist",stomachShape:"firm stomach",
  hipShape:"wide, strong hips",buttSize:"round, muscular butt",thighBuild:"thick, strong thighs",legShape:"strong, shapely legs",bodySoftness:"strong, curvy athletic hourglass build",
  posture:"hefting a huge wrench over her shoulder with a grin",
  nippleColor:"dark brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"dark brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"dark pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@accent"],
  legwear:["{c} knee-high lace-up boots","@extra"],belt:["{c} leather tool belt","@third"],earAccessory:["gold scarab earrings","@accent"],tagCharm:["small beetle crest badge","@accent"]},
 blurb:"The Hive's tinkerer: a short, strong, curvy mechanic with a waist-length deep-teal braid shot with an iridescent green-and-gold sheen, emerald eyes, warm brown skin and a stubborn, cheerful grin. A black hooded robe lined in teal over a bronze vest and emerald pleated skirt, a leather tool belt, lace-up boots and gold scarab earrings."},

{k:"serval",sis:"fox",pal:{primary:"golden blonde",secondary:"black",third:"cream",accent:"sunset orange",extra:"gold"},
 man:{primary:"dark brown",secondary:"cream",third:"sunset orange",accent:"gold",extra:"black"},
 room:"a sunny savanna-lodge bedroom with a hammock and tall grass outside",pride:"the highest jumper in the Pride",pet:"Bounce",
 bath:"an open-air stone shower at a savanna lodge, tall grass beyond",role:"the high jumper",acc:"golden savanna light through tall grass",
 c:{age:"young woman",faceShape:"small, heart-shaped face with high cheekbones",eyeConfig:"matching",eyeShape:"huge, round, curious eyes",pupilStyle:"round pupils",irisDetail:"bright gold irises with dark rims",
  lashNatural:"long, dark eyelashes",eyeOne:"amber gold",browShape:"high, curious brows",noseShape:"small, upturned nose",mouthShape:"wide, playful smile",
  expression:"playful, curious grin",impression:"a bouncy, curious, leggy playfulness",faceMark:"dark spot freckles along her cheekbones",
  hairStyle:"long high ponytail with spotted streaks",hairLength:"hip-length",hairTexture:"silky and straight",bangs:"wispy bangs",hairMovement:"swings high behind her like a tail",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"small black spots scattered through the golden blonde",
  skinTone:"caramel",undertone:"warm golden",skinFinish:"smooth, sun-kissed skin",markings:"no markings",bodyMarkings:"a trail of tiny spot tattoos down the outside of one thigh",
  makeupStyle:"sporty glam makeup",eyelinerStyle:"bold cat-eye eyeliner",eyeshadowStyle:"warm gold shimmer eyeshadow",lashStyle:"lifted lashes",blushStyle:"sunny peach blush",lipFinish:"glossy peach lips",faceAccents:"golden cheekbone highlight",nailStyle:"short almond fingernails",nailColor:"@accent",
  heightStature:"very tall stature with very long legs",shoulderShape:"slim, sloped shoulders",torsoShape:"slim torso",armShape:"long, slender arms",handShape:"slender hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"slim waist",stomachShape:"flat, toned stomach",
  hipShape:"slim, curvy hips",buttSize:"round, perky butt",thighBuild:"long, toned thighs",legShape:"extremely long, slender legs",bodySoftness:"tall, slim, long-legged build",
  posture:"springing high into the air with her legs tucked, mid-pounce",
  nippleColor:"caramel pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"caramel pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["{c} thigh-high socks with {c2} spotted tops","@secondary",null,"@primary"],earAccessory:["large gold hoop earrings","@extra"],tagCharm:["small serval crest badge","@accent"]},
 blurb:"The Pride's high jumper: a very tall, leggy savanna cat with a hip-length golden-blonde high ponytail scattered with black spots, huge curious gold eyes, caramel skin and a playful grin. A black hooded robe lined in gold over a cream vest and golden pleated skirt, spotted-top socks and big gold hoops."}
];

/* ---- v217: lore for wave 4 (same fields as girls210lore.js): the Hive's queen and six new bugs, and the Pride's Serval */
const NEWLORE4={
bee:{touch:"in warm honey-gold light through hexagonal windows",room:"a honey-gold tower suite",roomL:"a honey-gold tower suite with hexagonal windows and a canopy bed",out:"a sunflower meadow humming with bees",
  g:{id:"waist-length voluminous honey-gold curls in a braided crown with black underlayer stripes, warm amber eyes, golden tan skin, a beauty mark above the lip",fig:"voluptuous hourglass, large breasts",col:"honey gold",
    out:"a sunflower meadow at golden hour, bees drifting",light:"golden hour, warm honey light",room:"a honey-gold suite with hexagonal windows",bath:"a honey-gold marble bath under hexagonal windows"},
  fx:"drifting pollen, honey-gold light",mot:"honeybee",mot2:"queen-bee",tmot:"honeycomb",emb:"queen-bee",pk:"a Vespiquen hovering regally behind her",
  words:[["frozen pink daiquiri", "frozen honey daiquiri"],["pink cocktail with a paper umbrella", "honey cocktail with a paper umbrella"],["pink cocktail", "honey cocktail"],["a pink disco floor", "a golden disco floor"],["glowing pink summoning circles", "glowing golden summoning circles"],["a temple on a pink lagoon at sunset", "a honey-gold temple in a sunflower valley at sunset"],["The queen of the Pink Isles", "The queen of the Golden Hive"],["a pink coral palace by the lagoon", "a golden honeycomb palace in a sunflower valley"],["flamingo feathers", "golden honeycomb"],["a pink dragon with long legs", "a golden dragon with honeycomb scales"],["a pink lei", "a sunflower lei"],["pink-walled", "honey-walled"],["Pink neon", "Gold neon"],["Pink shower", "Gold-tiled shower"],["in a pink shower", "in a gold-tiled shower"],["pink-tiled", "gold-tiled"],["a pink daybed", "a golden daybed"],["balanced on one leg like a flamingo", "one hand on her hip like a queen"],["pink-lit lagoon", "golden-lit lagoon"],["standing in lagoon shallows on one leg", "standing in lagoon shallows with one hand on her hip"],["Pink swing", "Golden swing"],["pink swing", "golden swing"],["pink sunset", "golden sunset"],["a pink rooftop pool bar", "a golden rooftop pool bar"],["pink sky", "golden sky"],["pink background", "gold background"],["pink, neon", "gold, neon"],["pink, smile", "golden, smile"],["a lagoon at sunset with flamingos wading","a sunflower meadow at sunset with bees drifting"],["crown of pink feathers","crown of golden honeycomb"],["feather boa","honey-gold silk stole"],
    ["feathered corset bodysuit","honeycomb-lace corset bodysuit"],["pink feather mantle","honey-gold silk mantle"],["pink villa","honey-gold palace"],["pink feathers","golden honeycomb"],["pink feather","honeycomb"],
    ["flamingo-pink","honey-gold"],["standing on one leg","standing with one hand on her hip"],["balancing on one leg","standing tall"]],
  colors:[["hot pink","honey gold"],["Hot pink","Honey gold"],["hot-pink","honey-gold"],["salmon","amber"]]},
mantis:{touch:"in soft green light through paper screens",room:"a minimalist dojo bedroom",roomL:"a minimalist dojo bedroom with paper screens and a jade bonsai",out:"a bamboo grove at dawn",
  g:{id:"hip-length sleek jade-green hair in a high ponytail fading to mint, sharp emerald eyes, porcelain skin, two small beauty marks beneath one eye",fig:"tall, lean, long-limbed, small-to-medium breasts",col:"jade green",
    out:"a bamboo grove at dawn, mist between the stalks",light:"soft dawn light, green-filtered",room:"a dojo bedroom with paper screens",bath:"a cedar soaking tub, a bamboo garden outside"},
  fx:"drifting bamboo leaves, morning mist",mot:"jade-leaf",mot2:"praying-mantis",tmot:"bamboo-leaf",emb:"praying-mantis",pk:"a Lurantis standing guard beside her, blades raised",
  words:[["dragon rider","dragon rider"],["flame pattern", "bamboo-leaf pattern"],["flame hem", "leaf hem"],["flame-trim", "leaf-trim"],["flame-print", "leaf-print"],["flame sequins", "jade sequins"],["flame lace", "leaf lace"],["a stage engulfed in flames", "a stage under falling bamboo leaves and green light"],["flame-edged greatsword", "jade-edged glaive"],["A fire elf", "A forest elf"],["flaming sword", "jade sword"],["blazing flame aura", "shimmering jade aura"],["A fire elemental", "A wind elemental"],["a bikini of living flame clinging to her body", "a bikini of swirling leaves and wind clinging to her body"],["wisps of living flame barely covering her", "wisps of swirling leaves barely covering her"],["a magical landscape swirling with living flame", "a magical bamboo forest swirling with wind and leaves"],["flame-and-ember trail (no legs)", "whirlwind of leaves (no legs)"],["ember lines down the arms", "leaf-vein lines down the arms"],["ember-like", "leaf-like"],["infernal crimson", "jade green"],["dragonlike fangs and claws", "mantis-like blades and claws"],["short curved horns", "slender antennae"],["crest of a dragon breathing fire", "crest of a mantis with raised blades"],["an enormous crimson dragon breathing fire", "an enormous jade-green dragon"],["A crimson bodycon", "A jade bodycon"],["Crimson palette", "Jade palette"],["Crimson cheer", "Jade cheer"],["crimson over-the-knee socks", "jade over-the-knee socks"],["cozy dragon-scale hooded onesie with little horns and a tail","cozy jade hooded onesie with little antennae"],["dragon horns","mantis antennae"],["dragon scales and claws","jade leaves and blades"],
    ["dragon-scale breastplate","jade lamellar breastplate"],["dragon-scale pauldron","jade lamellar pauldron"],["dragon-scale trim","jade-leaf trim"],["gold dragon-scale embroidery","gold leaf-and-blade embroidery"],
    ["dragon-scale","jade-leaf"],["dragon scale","jade-leaf"],["horn spikes","jade spikes"],["large bat wings (costume)","sheer green mantis wings (costume)"],["long scaled dragon tail","pair of curved jade practice blades"],
    ["plush spa headband with small horns","plush spa headband with little antennae"],["red-draped tower","jade-screened dojo"],["scale embroidery","leaf embroidery"],["scale-edged","leaf-edged"],
    ["scaled hide shoulder wrap","jade silk shoulder wrap"],["small curved horn headband","small antenna headband"]],
  colors:[["crimson red","jade green"],["Crimson red","Jade green"],["burgundy","mint green"],["Burgundy","Mint green"],["cheeks flushed crimson","cheeks flushed crimson"],["cheeks crimson","cheeks crimson"],["face is crimson","face is crimson"],
    ["regal crimson","regal jade"],["crimson backdrop","jade backdrop"],["crimson silk","jade silk"],["crimson rope","jade rope"],["crimson battle crown","gold battle crown"]]},
spider:{touch:"in candlelight through black lace",room:"a gothic attic bedroom draped in black lace",roomL:"a gothic attic bedroom draped in black lace, a spinning wheel by the window",out:"a moonlit gothic garden hung with dew-covered webs",
  g:{id:"thigh-length straight black hair in a blunt hime cut over a hidden deep-crimson underlayer, heavy-lidded crimson eyes, pale ivory skin, dark crimson lips",fig:"tall, exaggerated hourglass, large breasts",col:"deep crimson",
    out:"a moonlit gothic garden, dew-covered webs between the roses",light:"moonlight, candlelight",room:"a gothic bedroom draped in black lace",bath:"a black marble clawfoot tub under a lace canopy, candles"},
  fx:"silver spider silk, dew drops, candle smoke",mot:"spider",mot2:"spider-web",tmot:"spiderweb",emb:"spider-and-web",pk:"a Galvantula perched in a glittering web behind her",
  words:[["glowing emerald absinthe", "glowing crimson absinthe"],["An emerald silk slip dress", "A crimson silk slip dress"],["micro scaled string bottoms", "micro web-lace string bottoms"],["venomous snake fangs", "venomous spider fangs"],["The empress of the Emerald Court", "The empress of the Silken Court"],["an emerald-and-silver throne room", "a black-and-silver throne room hung with webs"],["scales along the neck", "web tattoos along the neck"],["micro scaled armor loincloth", "micro web-lace armor loincloth"],["a long, emerald wyrm", "a long, black wyrm"],["Emerald satin", "Crimson satin"],["an emerald satin backdrop", "a crimson satin backdrop"],["an emerald-tiled bathroom", "a black-tiled bathroom"],["an emerald chaise", "a crimson chaise"],["emerald-silk bedchamber", "black-silk bedchamber"],["a scale-beaded bodice","a web-beaded bodice"],["cobra headdress","black lace spider headdress"],["coiled back against","arched back against"],["coiled serpent ring","silver spider ring"],["coiled snakes","silk webs"],
    ["coiled-serpent","spider-web"],["coiling back against","arching back against"],["coiling serpents","spinning webs"],["coiling up in a green glow","spinning out in a silver glow"],["coils down","spins down"],
    ["crest of a coiled serpent","crest of a spider in its web"],["crown of coiled serpents","crown of silver webs"],["emerald drapes","black lace drapes"],["emerald velvet","black velvet"],["glowing green venom","glowing crimson venom"],
    ["micro scaled halter bodysuit","micro web-lace halter bodysuit"],["plush snake toy","plush spider toy"],["scale pattern","web pattern"],["scale trim","web-lace trim"],["scale-patterned","web-patterned"],["scale-print","web-print"],["scale-trim","web-lace-trim"],
    ["scaled armor bikini top with a serpent clasp","web-lace bikini top with a spider clasp"],["scaled armor bikini top with a {c2} serpent clasp","web-lace bikini top with a {c2} spider clasp"],["serpent-scale","spider-web"],
    ["sheer scaled thigh-high stockings","sheer web-lace thigh-high stockings"],["silver serpent-scale embroidery","silver spider-web embroidery"],["small coiled snake hair clips","small silver spider hair clips"],
    ["small snake familiar coiled around her shoulders","small black spider familiar perched on her shoulder"],["snake arm cuffs","web-lace arm cuffs"],["snake heads","spider charms"],["snake-chain body jewelry","silver web-chain body jewelry"],["snake-chain","web-chain"],
    ["snake-scale","web-lace"],["snakeskin print","spiderweb print"],["snakeskin shoulder wrap","black lace shoulder wrap"]],
  colors:[["emerald green","deep crimson"],["Emerald green","Deep crimson"],["emerald-green","deep-crimson"],["platinum-blonde","jet-black"],["heather gray","charcoal gray"]]},
ladybug:{touch:"in bright garden sunlight through flowering vines",room:"a sunny garden cottage bedroom",roomL:"a sunny garden cottage bedroom full of potted flowers",out:"a sunny flower garden full of clover",
  g:{id:"chin-length glossy cherry-red bob with blunt rounded bangs over a black underlayer, big warm brown eyes, rosy fair skin, ladybug-spot freckles across the nose and cheeks",fig:"short, soft hourglass, large breasts",col:"cherry red",
    out:"a sunny flower garden, clover and daisies",light:"bright sunlight, soft rim light",room:"a garden cottage bedroom full of potted flowers",bath:"a white clawfoot tub surrounded by potted flowers"},
  fx:"four-leaf clovers, drifting petals",mot:"ladybug",mot2:"ladybug-and-clover",tmot:"four-leaf-clover",emb:"ladybug",pk:"a Ledian fluttering around her head",
  words:[["mint ribbon choker", "black ribbon choker"],["mint ribbon bows", "black polka-dot ribbon bows"],["mint ribbon", "black ribbon"],["glass of peach iced tea", "glass of cherry iced tea"],["Creamsicle", "Cherry red"],["mint swim ring", "black polka-dot swim ring"],["mint collar and cuffs", "black collar and cuffs"],["pair of fluffy {c} feathered wings", "pair of shiny {c} ladybug wing cases"],["A fluffy lovebird harpy", "A ladybug fairy"],["big fluffy wings", "shiny spotted wings"],["feather hair clips", "polka-dot hair clips"],["fluffy feathered bikini top", "polka-dot bikini top"],["feathered leg warmers", "polka-dot leg warmers"],["bright feather mantle", "bright polka-dot capelet"],["feather filigree", "clover filigree"],["a small, peach-colored dragon with heart-shaped scales", "a small, cherry-red dragon with black spots"],["a mint garter", "a black lace garter"],["peach-scented", "cherry-scented"],["at the twintails", "in her hair"],["on her twintails", "in her hair"],["Hair is put up in fluffy buns", "Hair is pinned back with polka-dot clips"],["a creamsicle feathered bikini top","a cherry-red polka-dot bikini top"],["a fluffy creamsicle lovebird onesie","a cozy cherry-red ladybug onesie with black spots"],["mint feathered leg warmers","black polka-dot leg warmers"],
    ["mint-green lovebird-and-feather embroidery","black polka-dot and clover embroidery"]],
  colors:[["creamsicle orange","cherry red"],["creamsicle-orange","cherry-red"],["creamsicle","cherry red"],["powder blue","leaf green"],["soft peach","white"],["soft-peach","white"]]},
moth:{touch:"in warm lantern light glowing in the dark",room:"a lamp-lit attic bedroom",roomL:"a lamp-lit attic bedroom strung with fairy lights and paper lanterns",out:"a night garden lit by paper lanterns",
  g:{id:"waist-length soft pale-lavender waves tipped in mint, wispy feathered bangs, glowing pale-gold eyes, very fair skin, faint silvery freckles",fig:"soft, voluptuous hourglass, very large breasts",col:"pale lavender",
    out:"a night garden lit by paper lanterns, moths circling the light",light:"warm lantern light, night",room:"an attic bedroom strung with fairy lights",bath:"an attic bathtub surrounded by candles and paper lanterns"},
  fx:"glowing lanterns, drifting moth-wing dust",mot:"moth-wing",mot2:"luna-moth",tmot:"moon-and-lantern",emb:"luna-moth",pk:"a Frosmoth drifting softly beside her",
  words:[["midnight espresso martini", "midnight lavender martini"],["Espresso brown", "Mint green"],["black feather mantle", "pale moth-wing mantle"],["feather filigree", "moth-wing filigree"],["An owl","A moth"],["HOOT♡","FLUTTER♡"],["a plunging caramel feathered micro bodysuit","a plunging pale lavender fuzzy micro bodysuit"],["amber owl-feather embroidery","pale gold moth-wing embroidery"],["an owl harpy","a moth fairy"],["an owl","a moth"],
    ["an owl tattoo spreading its wings across his back","a moth tattoo spreading its wings across his back"],["crown of laurel and silver owl feathers","crown of silver moth antennae and moonflowers"],["feathered ear-tuft headband","feathery moth-antenna headband"],
    ["feathered harpy wings","large pale luna-moth wings"],["feathered wings","pale moth wings"],["feathery caramel-brown hair over an antique-ivory underlayer","soft pale-lavender hair over a mint-green underlayer"],["layered owl feathers","layered moth-wing scales"],
    ["micro feathered bodysuit","micro fuzzy bodysuit"],["outstretched owl feathers","outstretched moth wings"],["owl feathers","moth wings"],["owl harpy","moth fairy"],["owl-feather embroidery","moth-wing embroidery"],
    ["small owl familiar perched on her shoulder","small luna moth familiar resting on her shoulder"],["swooping down from a high ladder with her robe flaring like wings","drifting down from a high ladder with her robe fluttering like wings"],
    ["tawny night dragon with owl-like feathers and huge amber eyes","pale night dragon with moth-like wings and huge golden eyes"],["tawny night dragon with owl-like feathers","pale night dragon with moth-like wings"]],
  colors:[["caramel brown","pale lavender"],["Caramel brown","Pale lavender"],["caramel-brown","pale-lavender"],["espresso brown","mint green"],["espresso-brown","mint-green"],["antique ivory","cream"],["antique-ivory","cream"]]},
dragonfly:{touch:"under a bright summer sky over a glittering pond",room:"a hangar-loft bedroom",roomL:"a hangar-loft bedroom with model planes hanging from the rafters",out:"a grassy airfield beside a reed-lined pond",
  g:{id:"short sleek iridescent teal pixie cut with a long swept fringe and cobalt and lime sheen, bright turquoise eyes, light tan skin, freckles across the nose",fig:"tall, lean athletic build, medium breasts",col:"teal",
    out:"a reed-lined pond in summer, dragonflies over the water",light:"bright summer sunlight, sparkling water",room:"a hangar-loft bedroom with model planes",bath:"a steel-and-glass shower, the airfield outside"},
  fx:"glittering water, darting dragonflies",mot:"dragonfly",mot2:"wing-and-reed",tmot:"dragonfly",emb:"dragonfly",pk:"a Yanmega zipping in circles around her",
  words:[["shark-fin hooded sweatshirt", "dragonfly-wing hooded sweatshirt"],["shark-fin hood", "dragonfly-wing hood"],["hooded onesie with a fin", "hooded onesie with sheer wings"],["plush spa headband with a shark fin", "plush spa headband with little dragonfly wings"],["shark tail fin", "pair of sheer dragonfly wings"],["fin-like ears", "pointed ears"],["wave hem", "wing hem"],["wave-trim hem", "wing-trim hem"],["wave lace", "wing lace"],["blue ocean margarita", "lime margarita"],["A coral cutout dress", "A teal cutout dress"],["pearl-and-coral hair crown", "silver wing hair crown"],["coral and pearl crown", "silver and teal crown"],["playful, fanged grin", "playful, cocky grin"],["tongue out, fang", "tongue out, grin"],["Bite?♡","Catch me?♡"],["I bite♡","Catch me♡"],["Predator and prey","Cat and mouse"],["careful with her sharp teeth","careful with her teeth"],["fin-shaped train","wing-shaped train"],["her sharp teeth","her cocky grin"],
    ["jagged tooth-edged neckline","wing-edged neckline"],["shark fins and cresting waves","dragonfly wings and reeds"],["shark skin stockings","iridescent stockings"],["shark teeth","silver wings"],["shark tooth earrings","silver wing earrings"],
    ["shark-tooth clasp","wing clasp"],["shark-tooth necklace","silver wing necklace"],["shark-tooth pendant","dragonfly pendant"],["sharkskin shoulder wrap","iridescent shoulder wrap"],["sharp teeth","a cocky grin"],
    ["sharp-toothed grin","cocky grin"],["sharp-toothed smirk","cocky smirk"],["tooth-trimmed hood","wing-trimmed hood"],["toothy grin","cocky grin"],["toothy mouth","open mouth"],["wave-and-fin","wing-and-reed"],["with sharp teeth","with a cocky grin"],
    ["sharks and rays","sharks and rays"],["passing shark","passing shark"],["sharks","sharks"],["shark tank","shark tank"]],
  colors:[["steel blue","teal"],["Steel blue","Teal"],["steel-blue","teal"],["coral red","lime green"],["coral-red","lime-green"]]},
beetle:{touch:"in warm forge light glinting off copper",room:"a workshop loft bedroom",roomL:"a workshop loft bedroom full of tools and half-built inventions",out:"a sunny junkyard workshop full of gears",
  g:{id:"waist-length deep-teal braid with an iridescent green-and-gold sheen, short straight bangs, emerald eyes, warm brown skin, a smudge of grease on one cheek",fig:"short, strong, curvy, large breasts",col:"emerald green",
    out:"a sunny workshop yard full of gears and machines",light:"warm forge light, sparks",room:"a workshop loft bedroom full of tools",bath:"a big copper tub in a workshop loft"},
  fx:"flying sparks, glinting gears",mot:"scarab",mot2:"jewel-beetle",tmot:"gear-and-leaf",emb:"scarab",pk:"a Heracross flexing its horn beside her",
  words:[["honey bourbon cocktail", "ginger bourbon cocktail"],["giant vat of golden honey", "giant vat of glowing green slime"],["a giant vat of honey", "a giant vat of green slime"],["a vat of honey", "a vat of green slime"],["honey dripping from their hair", "slime dripping from their hair"],["bees buzzing around them", "bubbles popping around them"],["bees buzzing", "bubbles popping"],["honey-soaked", "slime-soaked"],["honey, sticky", "slime, sticky"],["see-through, bee, dripping", "see-through, slime, dripping"],["a big glass honey pot with a dipper", "a big brass gear sculpture"],["golden honey drips over her breasts and stomach", "glittering gold body paint streaks over her breasts and stomach"],["Yellow palette", "Emerald palette"],["a cottage with a garden full of sunflowers", "a converted workshop loft with a rooftop garden"],["a sunflower field", "a hilltop at sunset beside her restored motorcycle"],["a garden wedding among the beehives and sunflowers", "a workshop-yard wedding strung with lights and brass gears"],["Honey and drool","Oil and grease"],["Honey vat","Oil drum"],["a yellow fur rug","a green woven rug"],["badger pelt","beetle-shell"],["badger-striped","iridescent"],["burrow-like","workshop-like"],
    ["fluffy badger-striped onesie","cozy iridescent green beetle onesie with little horns"],["honey-gold backdrop","emerald backdrop"],["honey-gold light","warm forge light"],["honeycomb-heart","scarab-heart"],["honeycomb","scarab"],
    ["striped badger-pelt patterns","iridescent shell patterns"],["warm honey-gold light","warm forge light"],["yellow honeycomb embroidery","green-gold scarab embroidery"]],
  colors:[["mustard yellow","deep teal"],["Mustard yellow","Deep teal"],["mustard-yellow","deep-teal"],["regal yellow","regal emerald"]]},
serval:{touch:"in golden savanna light through tall grass",room:"a savanna-lodge bedroom",roomL:"a sunny savanna-lodge bedroom with a hammock",out:"a savanna at golden hour, tall grass rippling",
  g:{id:"hip-length golden-blonde high ponytail scattered with small black spots, wispy bangs, huge curious gold eyes, caramel skin, dark spot freckles along the cheekbones",fig:"very tall, slim, long-legged, medium breasts",col:"sunset orange",
    out:"a savanna at golden hour, tall grass and acacia trees",light:"golden hour, warm backlight",room:"a savanna-lodge bedroom with a hammock",bath:"an open-air stone shower, tall grass beyond"},
  fx:"golden grass seeds, warm haze",mot:"leaping-cat",mot2:"spot-and-grass",tmot:"serval-spot",emb:"leaping-serval",pk:"a Glameow pouncing at her heels",
  words:[["under a torii gate at dusk", "under an acacia tree at dusk"],["the fox shrine at the autumn festival", "a savanna lodge deck at sunset"],["a shrine wedding under red torii gates", "a sunset wedding on the savanna under an acacia tree"],["A kitsune costume","A savanna cat costume"],["FOXFIRE♡","POUNCE♡"],["Kitsune Lantern","Savanna Lantern"],["a nine-tailed fox","a spotted savanna cat"],["amber foxlike eyes","gold catlike eyes"],
    ["amber-gold flame-tail embroidery","gold spot-and-grass embroidery"],["blue foxfire","golden fireflies"],["burnt-orange hair","golden blonde hair"],["crown of foxfire","crown of golden grass"],["fluffy fox ears","large spotted cat ears"],
    ["fox ears","cat ears"],["fox mask","cat mask"],["fox tail","cat tail"],["fox tails and foxfire flames","spots and tall savanna grass"],["fox-and-flame","spot-and-grass"],["fox-eared hooded onesie with a bushy tail","cat-eared hooded onesie with a spotted tail"],
    ["fox-flame","spotted-paw"],["fox-like","catlike"],["fox-tail embroidery","spotted-tail embroidery"],["fox-tail pattern","spot pattern"],["fox-tail pocket","spotted pocket"],["foxfire","savanna fireflies"],["foxlike eyes","catlike eyes"],
    ["kitsune","savanna cat"],["large bushy fox tail","long spotted cat tail"],["nine-tailed fire dragon","golden savanna dragon"],["sly, fox-like smirk","playful, catlike smirk"],["stone foxes","stone cats"]],
  colors:[["burnt orange","golden blonde"],["Burnt orange","Golden blonde"],["burnt-orange","golden-blonde"]]}};

const NEWHEADS4={
bee:{c:{age:"mature woman",faceShape:"soft oval face with high cheekbones",expression:"warm, regal smile",impression:"a gracious, commanding warmth",hairStyle:"curly updo with a braided crown",bangs:"soft curtain bangs",makeupStyle:"glamorous golden makeup",bodySoftness:"voluptuous, mature hourglass figure"},
  blurb:"The Bee headmistress: a voluptuous, gracious woman with honey-gold curls pinned in a braided crown, warm amber eyes, golden-tan skin and a warm, regal smile."},
mantis:{c:{age:"mature woman",faceShape:"refined, angular face with high cheekbones",expression:"calm, appraising gaze",impression:"a serene, razor-sharp poise",hairStyle:"sleek low chignon",bangs:"long side-swept bangs",makeupStyle:"clean, elegant makeup",bodySoftness:"tall, lean, mature figure"},
  blurb:"The Mantis headmistress: a tall, lean woman with jade-green hair in a sleek low chignon, sharp emerald eyes, porcelain skin and a calm, appraising gaze."},
spider:{c:{age:"mature woman",faceShape:"elegant oval face with sharp cheekbones",expression:"slow, knowing smile",impression:"a dark, patient, regal allure",hairStyle:"sleek hime cut",bangs:"blunt bangs",makeupStyle:"gothic glam makeup",bodySoftness:"tall, mature hourglass figure"},
  blurb:"The Spider headmistress: a tall, pale woman with long black hair in a blunt hime cut over a crimson underlayer, heavy-lidded crimson eyes, dark lips and a slow, knowing smile."},
ladybug:{c:{age:"mature woman",faceShape:"round, warm face with soft cheeks",expression:"bright, motherly smile",impression:"a cheerful, lucky warmth",hairStyle:"glossy chin-length bob",bangs:"side-swept bangs",makeupStyle:"fresh, rosy makeup",bodySoftness:"soft, mature hourglass figure"},
  blurb:"The Ladybug headmistress: a short, curvy, cheerful woman with a glossy cherry-red bob, warm brown eyes, spot freckles and a bright smile."},
moth:{c:{age:"mature woman",faceShape:"soft oval face",expression:"dreamy, knowing smile",impression:"a soft, mysterious calm",hairStyle:"long soft waves",bangs:"wispy bangs",makeupStyle:"soft ethereal makeup",bodySoftness:"soft, voluptuous, mature figure"},
  blurb:"The Moth headmistress: a soft, voluptuous woman with long pale-lavender waves tipped in mint, glowing pale-gold eyes, very fair skin and a dreamy, knowing smile."},
dragonfly:{c:{age:"mature woman",faceShape:"sharp, refined face",expression:"bright, daring grin",impression:"a quick, fearless energy",hairStyle:"sleek pixie cut",bangs:"side-swept bangs",makeupStyle:"sporty natural makeup",bodySoftness:"tall, lean, mature figure"},
  blurb:"The Dragonfly headmistress: a tall, lean former test pilot with a sleek iridescent teal pixie cut, turquoise eyes, light-tan skin and a daring grin."},
beetle:{c:{age:"mature woman",faceShape:"round face with a strong jaw",expression:"steady, cheerful smile",impression:"a tough, dependable warmth",hairStyle:"thick braided crown",bangs:"short straight bangs",makeupStyle:"minimal makeup",bodySoftness:"strong, curvy, mature figure"},
  blurb:"The Beetle headmistress: a short, strong, curvy woman with a thick deep-teal braided crown, emerald eyes, warm brown skin and a steady, cheerful smile."},
serval:{c:{age:"mature woman",faceShape:"heart-shaped face with high cheekbones",expression:"playful, knowing smile",impression:"a lively, elegant playfulness",hairStyle:"sleek high ponytail",bangs:"wispy bangs",makeupStyle:"sporty glam makeup",bodySoftness:"very tall, slim, mature figure"},
  blurb:"The Serval headmistress: a very tall, long-legged woman with a sleek golden-blonde ponytail scattered with black spots, gold eyes, caramel skin and a playful, knowing smile."}};

const NEWMEN4={
bee:{c:{eyeOne:"warm brown",hairStyle:"loose shoulder-length waves",markings:"a small bee tattoo over his heart"},
  blurb:"Her devoted consort: a towering, golden-bronze beekeeper with loose black waves, calm warm-brown eyes, light stubble and a bee tattoo over his heart, who would do anything his queen asked. An open white linen shirt and shell necklace, or swim trunks."},
mantis:{c:{eyeOne:"gray",hairStyle:"half-up warrior topknot",markings:"a mantis tattoo coiling down one arm"},
  blurb:"Her sparring partner: a huge, bronze-skinned fighter with a long black half-up topknot, steady gray eyes, a short boxed beard and a mantis tattoo down one arm, the only man who has ever lasted three rounds with her. Leather and chains, battle armor, or bare."},
spider:{c:{eyeOne:"silver-gray",markings:"a spiderweb tattoo across the chest and shoulder"},
  blurb:"The one man who walked into her web on purpose: tall, cold and immaculate, with slicked-back black hair, piercing silver-gray eyes, a knowing smirk and a spiderweb tattoo across his chest. A black suit and crimson tie, a silk shirt open to the chest, or less."},
ladybug:{c:{eyeOne:"warm brown",markings:"light freckles across the nose and cheeks, and a four-leaf clover tattoo on one wrist"},
  blurb:"Her lucky find: a tall, broad-shouldered pastry chef with soft, tousled wavy hair, warm brown eyes, freckles, light stubble and a four-leaf clover tattoo on his wrist, who swears she's the best luck he ever had. A cream cable-knit sweater, a henley with a baker's apron, an open shirt, or nothing."},
moth:{c:{eyeOne:"pale gray",markings:"a luna moth tattoo spreading its wings across his back"},
  blurb:"Her night light: a tall, gentle lamp-maker and glassblower with tousled swept-back hair, pale gray eyes behind round wire-rimmed glasses, a short neat beard and a luna moth tattoo across his back. He leaves a lantern burning in his window for her every night. A cardigan and henley, a long coat and scarf, or nothing."},
dragonfly:{c:{eyeOne:"sea blue",hairStyle:"tousled sun-bleached hair",markings:"a pair of dragonfly wings tattooed along the ribs"},
  blurb:"Her wingman: a tanned, ripped stunt pilot with tousled sun-bleached hair, sea-blue eyes, a cocky grin, light stubble and dragonfly wings tattooed along his ribs, who still can't beat her in a race. An open shirt and shorts, airfield linen, or just the trunks."},
beetle:{c:{eyeOne:"warm brown",markings:"grease-smudged forearms and a gear tattoo on one bicep"},
  blurb:"Her gentle giant: a towering, burly blacksmith with a thick chestnut beard, short curls, warm brown eyes, a hairy chest and the softest smile, who forges every part she draws. Flannel and jeans, a henley with rolled sleeves, or shirtless."},
serval:{c:{eyeOne:"amber gold",hairStyle:"side-swept undercut",markings:"a leaping-cat tattoo on one forearm"},
  blurb:"A rogue who can keep up with her: a lean, charming safari guide and gambler with a side-swept undercut, heavy-lidded amber eyes, a van dyke beard, a single hoop earring and a leaping-cat tattoo. Waistcoat and rolled sleeves, an open shirt, or nothing."}};

const NEWSIG4={
bee:["Queen of the Hive","the queen of the Hive","warm, regal smile","seated on a honeycomb throne with one leg crossed, a golden scepter in hand","a honey-gold throne room with hexagonal windows and honey dripping from golden combs",
  {corset:["{c} honeycomb-lace corset","@primary"],bottom:["{c} layered tulle ball skirt with black stripes","@secondary"],outerwear:["sheer {c} wing-shaped cape","@third"],headwear:["{c} honeycomb crown","@accent"],heldItem:["golden honey-dipper scepter","-"],legwear:["{c} sheer stockings","@secondary"]}],
mantis:["Jade Blade","the deadliest blade in the Hive","cool, focused calm","in a deep martial arts stance, twin jade blades crossed before her","a bamboo dojo courtyard at dawn, mist and falling leaves",
  {top:["{c} silk qipao top with a high collar and gold frog closures","@primary"],bottom:["{c} side-slit martial arts trousers","@secondary"],belt:["{c} silk sash","@accent"],heldItem:["pair of curved jade practice blades","-"],legwear:["{c} cloth martial arts shoes","@extra"],earAccessory:["jade drop earrings","@primary"]}],
spider:["Black Widow","the Hive's black widow","slow, knowing smile","seated in a web of silver silk, one leg crossed, toying with a single silk thread","a gothic attic at midnight, a giant silver web glittering in candlelight",
  {top:["{c} sheer spiderweb lace bodysuit","@primary"],corset:["{c} lace-up underbust corset","@secondary"],outerwear:["long {c} lace mourning veil","@primary"],gloves:["{c} long lace gloves","@primary"],legwear:["{c} spiderweb lace thigh-high stockings","@primary"],neckAccessory:["silver spider choker","@accent"]}],
ladybug:["Lucky Charm","the luckiest girl in the Hive","bright, dimpled smile","twirling in a field of clover, a four-leaf clover held up to the sun","a sunny clover field full of daisies, ladybugs everywhere",
  {top:["{c} polka-dot halter sundress bodice","@primary"],bottom:["{c} flared polka-dot circle skirt","@primary"],outerwear:["cropped {c} cardigan","@secondary"],headwear:["{c} polka-dot ribbon headband","@secondary"],legwear:["{c} strappy sandals","@accent"],heldItem:["four-leaf clover","-"]}],
moth:["Moon Lantern","the Hive's night-blooming dreamer","dreamy, sleepy smile","drifting toward a glowing paper lantern with her wings of sheer silk spread","a night garden lit by floating paper lanterns, moths circling the light",
  {top:["{c} fuzzy off-shoulder knit crop sweater","@primary"],bottom:["{c} sheer layered chiffon skirt","@secondary"],wingPiece:["large sheer {c} luna-moth wings","@secondary"],headwear:["{c} feathery antenna headband","@accent"],heldItem:["glowing paper lantern","-"],legwear:["{c} fuzzy knit thigh-high socks","@third"]}],
dragonfly:["Sky Racer","the fastest flier in the Hive","cocky, sparkling grin","perched on the wing of a little biplane, goggles on, arms spread","a grassy airfield beside a glittering pond, a biplane behind her",
  {top:["{c} iridescent racing crop top","@primary"],bottom:["{c} high-waisted flight shorts","@secondary"],outerwear:["cropped {c} leather bomber jacket","@extra"],headwear:["{c} aviator goggles","@third"],legwear:["{c} lace-up flight boots","@extra"],wingPiece:["sheer iridescent {c} dragonfly wings","@primary"]}],
beetle:["Jewel Engineer","the toughest shell in the Hive","stubborn, cheerful grin","leaning on a half-built mechanical beetle with a wrench over her shoulder","a sunny workshop yard full of gears, sparks flying",
  {top:["{c} iridescent bandeau top","@primary"],bottom:["{c} work overalls tied at the waist","@secondary"],belt:["{c} leather tool belt","@third"],gloves:["{c} leather work gloves","@extra"],headwear:["{c} brass welding goggles","@accent"],heldItem:["huge brass wrench","-"]}],
serval:["Savanna Spring","the highest jumper in the Pride","playful, curious grin","leaping high over the tall grass with her legs tucked, mid-pounce","a savanna at golden hour, tall grass and acacia trees",
  {top:["{c} spotted halter crop top","@primary"],bottom:["{c} high-cut spotted shorts","@secondary"],outerwear:["sheer {c} tied shirt","@third"],headwear:["{c} spotted cat-ear headband","@primary"],neckAccessory:["gold collar necklace","-"],legwear:["{c} lace-up sandals","@accent"]}]};

/* ---- v210: eighteen new Academy houses (tail block, after every Academy set is registered, before generic176.js).
   Each new house is the counterpart of an older one (its "sister": Lioness for Griffin, Panda for Badger, Firefly for
   Raven …), chosen so every story the sister has fits her too. Built in four steps:
   1. Her robes design (girls210data.js), headmistress (her, grown up, in the sister headmistress's faculty clothes) and
      boyfriend (the sister's boyfriend's job and wardrobe with his own look), and her own Signature look.
   2. Every Academy set, scene and story the sister has is re-cut for her: the same set, outfit and scene, rebuilt on her
      robes, so her face, hair, body, skin, makeup, intimate details and palette replace the sister's wherever the set
      did not change them. Set-specific changes (expressions, poses, scene makeup, set hairstyles) carry over.
   3. Wording: house names, her room, pride, pet name, bathroom, setting light, outdoor spot, Real and Anime identity
      tags, motifs, Pokemon and animal words are swapped for hers (girls210lore.js, girls210sis.js), in her copies and in
      the copies she shares with a partner. A partner from another house becomes that house's counterpart too, so every
      couple, rivalry and best-friend pairing has a new-house twin.
   4. ACAD.HOUSES gains the new houses (the picker's girl chips, profiles and libraries read it).
   Speed: copies are built straight from the finished sister entries (no re-resolving), unchanged outfit pieces are
   shared rather than copied, and each distinct string is translated once per house pairing. */
/* v211: the pass runs once per wave of new houses. The first wave (v210) gives every original house a counterpart; a later
   wave may give a few original houses a second one (Orca for Shark beside Dolphin). A wave's partners from houses outside
   the wave stay as they are, so an Orca copy of a Shark and Raven scene pairs Orca with Raven. */
/* v213: PMAP sends a partner house outside the wave to a newer girl instead ({stag:"lioness"}: a Cougar copy of a Wolf and
   Stag scene pairs Cougar with Lioness), with the partner's words, room and lore swapped for that girl's. */
/* v217: ONLY (a Set of set labels) limits step 2 to those sets: from wave 4 on, a new girl gets the look sets and the scene
   sets still on the Scenes list, never copies of the archived scenes. */
function ACAD_WAVE(NEWGIRLS,NEWLORE,NEWHEADS,NEWMEN,NEWSIG,tag,PMAP,ONLY){
  if(typeof ACAD==="undefined"||!START.RAW||!NEWGIRLS||!NEWLORE||typeof SISLORE==="undefined")return;
  const T0=performance.now();
  const R=START.RAW,cap=ACAD.cap,MUST=ACAD.MUST;
  const OLD=ACAD.OLDHOUSES||(ACAD.OLDHOUSES=ACAD.HOUSES.slice());
  const BIJ={},GIRL={};NEWGIRLS.forEach(g=>{BIJ[g.sis]=g.k;GIRL[g.k]=g});
  const SIS=NEWGIRLS.map(g=>g.sis);
  if(!SIS.every(h=>OLD.includes(h)&&SISLORE[h]))return;
  ACAD.WAVEDATA=ACAD.WAVEDATA||{};NEWGIRLS.forEach(g=>{ACAD.WAVEDATA[g.k]={g,L:NEWLORE[g.k]}});
  /* partner houses sent to an earlier wave's girl */
  const PB=Object.assign({},BIJ),PSIS=[];
  Object.entries(PMAP||{}).forEach(([s,n])=>{if(!BIJ[s]&&OLD.includes(s)&&SISLORE[s]&&ACAD.WAVEDATA[n]){PB[s]=n;PSIS.push(s)}});
  const ALLS=SIS.concat(PSIS);
  const GOF=n=>GIRL[n]||(ACAD.WAVEDATA[n]&&ACAD.WAVEDATA[n].g),LOF=n=>NEWLORE[n]||(ACAD.WAVEDATA[n]&&ACAD.WAVEDATA[n].L);
  /* display names: "Arctic Fox" for the arcticfox house */
  const DISP=n=>(GIRL[n]&&GIRL[n].disp)||(ACAD.HNAME&&ACAD.HNAME[n])||cap(n);
  ACAD.HNAME=ACAD.HNAME||{};NEWGIRLS.forEach(g=>{ACAD.HNAME[g.k]=DISP(g.k)});
  const VOW=w=>/^[aeiou]/i.test(w)&&!/^(uni|use|eu|one)/i.test(w);
  const NEWH=NEWGIRLS.map(g=>g.k);
  const problems=[];
  const capF=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
  const titleOf=s=>s.split(" ").map(w=>/^(in|the|of|to|no|and|a|an|any|at|on)$/.test(w)?w:cap(w)).join(" ").replace(/^./,c=>c.toUpperCase());
  const isWc=x=>(x>=48&&x<=57)||(x>=65&&x<=90)||(x>=97&&x<=122);

  /* ---------- string translation: one dictionary per sister house, compiled per (owner, partner) pairing ---------- */
  const GLOBAL=[];
  ALLS.forEach(s=>{const n=PB[s],d=DISP(n);GLOBAL.push([cap(s),d],[s.toUpperCase(),d.toUpperCase()],[s+"robes",n+"robes"],[s+"head",n+"head"],[s+"man",n+"man"]);
    if(VOW(d)!==VOW(s)){const a=VOW(d)?"an":"a",a0=VOW(s)?"an":"a";GLOBAL.push([a0+" "+cap(s),a+" "+d],[cap(a0)+" "+cap(s),cap(a)+" "+d])}});
  /* capitalized house words that are not the house (scene names) */
  [["Dragon rider","Dragon rider"],["Dragon's rest","Dragon's rest"],["Fox Spirit","Fox Spirit"],["His Stag","His Stag"],["Princess carry","Princess carry"],["Princess Carry","Princess Carry"]].forEach(e=>GLOBAL.unshift(e));
  const PL={wolf:"wolves",fox:"foxes",salmon:"salmon",lioness:"lionesses",firefly:"fireflies",butterfly:"butterflies",phoenix:"phoenixes",lynx:"lynxes",jellyfish:"jellyfish"};
  const DICT={};
  ALLS.forEach(s=>{
    const n=PB[s],g=GOF(n),L=LOF(n),S=SISLORE[s],HD=(ACAD.HUM&&ACAD.HUM.HD||{})[s]||[],E=[];
    /* flags: 1 capitalized copy, 2 UPPER copy, 4 Title Case copy */
    const add=(a,b,fl,keep)=>{if(typeof a!=="string"||typeof b!=="string"||!a||a===b&&!keep)return;E.push([a,b]);
      if((fl&1)&&/^[a-z]/.test(a))E.push([capF(a),capF(b)]);if(fl&2)E.push([a.toUpperCase(),b.toUpperCase()]);if(fl&4){const t=titleOf(a);if(t!==a)E.push([t,titleOf(b)])}};
    /* her lore */
    add(HD[0],g.room,1);add(HD[1],g.pride,1|2|4);add(HD[2],g.pet,2);add(HD[3],g.bath,1);
    if(S.role){add(S.role,g.role,1|2);add(S.role.replace(/^the /,"").toUpperCase(),g.role.replace(/^the /,"").toUpperCase(),0)}
    add(S.acc,g.acc,1);add(S.touch,L.touch,1);add(S.room,L.room,1);add(S.roomL,L.roomL,1);
    if(S.roomF&&S.roomF!==S.room&&S.roomF!==S.roomL)add(S.roomF,L.roomL,1);
    add(S.out,L.out,1);
    if(S.g&&L.g){["id","fig","out","light","room","bath"].forEach(f=>add(S.g[f],L.g[f],1));
      /* the Real and Anime sets color their sweaters, scarves and lingerie in her accent color */
      const c0=S.g.col,c1=L.g.col;
      [" chunky knit sweater"," knit scarf"," chunky knit scarf"," lace bra"," lace panties"," sweater slipping off one shoulder"].forEach(x=>add(c0+x,c1+x,1));
      add("oversized "+c0+" sweater","oversized "+c1+" sweater",1)}
    /* motifs only where the sets put them (some are everyday words: "heart", "leaf", "star") */
    add(S.fx,L.fx,0);add(S.pk,L.pk,1);
    if(S.mot&&L.mot)add(S.mot+" brooch",L.mot+" brooch",0);
    if(S.mot2&&L.mot2){add(S.mot2+" embroidery",L.mot2+" embroidery",0);add(S.mot2+" and cherry blossom print",L.mot2+" and cherry blossom print",0)}
    if(S.tmot&&L.tmot)add(S.tmot+" print",L.tmot+" print",0);
    if(S.emb&&L.emb)add(S.emb+" emblem",L.emb+" emblem",0);
    (L.words||[]).forEach(([a,b])=>add(a,b,1,true));(L.colors||[]).forEach(([a,b])=>add(a,b,0,true));
    /* the house word itself, lowercase, only in her own copies and her partners' (it is also an animal or a color elsewhere) */
    if(!L.nolow){const lw=L.low||n;add(s,lw,0);add(PL[s]||s+"s",PL[lw]||lw+"s",0);
      if(VOW(lw)!==VOW(s)){const a=VOW(lw)?"an":"a",a0=VOW(s)?"an":"a";add(a0+" "+s,a+" "+lw,1)}
      if(s==="wolf")E.unshift(["wolf cut","wolf cut"],["wolf-cut","wolf-cut"],["long wolf cut","long wolf cut"],["short wolf cut","short wolf cut"])}
    DICT[s]=E;
  });
  /* each dictionary is indexed by its first word that is not a little word ("the", "her", "with" …), so the most common
     words in a text never trigger a lookup; a rolling hash of each word is checked before any string is cut */
  const STOP=new Set(["the","a","an","her","his","with","in","at","on","under","lit","bathed","by","to","of","and","for","from","into","over","as","is","she","it","its","their",
    "The","A","An","Her","With","In","At","On","Under","Lit","Bathed","By","She"]);
  const AH=new Set();
  const hashOf=w=>{let h=0;for(let i=0;i<w.length;i++)h=(h*31+w.charCodeAt(i))|0;return h};
  function compile(list){
    const by=new Map(),seen=new Set(),rx=/[A-Za-z0-9]+/g;
    list.forEach(([a,b])=>{if(seen.has(a))return;seen.add(a);rx.lastIndex=0;let m,first=null,anchor=null;
      while((m=rx.exec(a))){if(!first)first=m;if(!STOP.has(m[0])){anchor=m;break}}
      anchor=anchor||first;if(!anchor)return;
      AH.add(hashOf(anchor[0]));
      let L=by.get(anchor[0]);if(!L)by.set(anchor[0],L=[]);L.push([a,b,anchor.index])});
    by.forEach(L=>L.sort((x,y)=>y[0].length-x[0].length));
    return by;
  }
  const BYH={};ALLS.forEach(s=>{BYH[s]=compile(DICT[s])});const BYG=compile(GLOBAL);
  const HITS=new Map();
  const STAT={runs:0,chars:0,lookups:0};
  /* the longest entry around a word wins; on a tie the owner's dictionary wins */
  function run(s,maps){
    let out=null,last=0,i=0;const n=s.length;STAT.runs++;STAT.chars+=n;
    while(i<n){
      let c=s.charCodeAt(i);
      if(!isWc(c)){i++;continue}
      let j=i,h=0;
      while(j<n&&isWc(c=s.charCodeAt(j))){h=(h*31+c)|0;j++}
      if(AH.has(h)){
        const w=s.slice(i,j);let hit=null,hs=0;STAT.lookups++;
        for(let m=0;m<maps.length;m++){const L=maps[m].get(w);if(!L)continue;
          for(let q=0;q<L.length;q++){const e=L[q],a=e[0];if(hit&&a.length<=hit[0].length)break;
            const st=i-e[2];if(st<last||(st>0&&isWc(s.charCodeAt(st-1))))continue;
            if(s.startsWith(a,st)){const end=st+a.length;if(end===n||!isWc(s.charCodeAt(end))||!isWc(a.charCodeAt(a.length-1))){hit=e;hs=st;break}}}}
        if(hit){if(out===null)out=[];out.push(s.slice(last,hs),hit[1]);last=hs+hit[0].length;i=last;HITS.set(hit[0],(HITS.get(hit[0])||0)+1);continue}
      }
      i=j;
    }
    if(out===null)return s;out.push(s.slice(last));return out.join("").replace(/ {2,}/g," ");
  }
  /* a translator for one pairing: the owner's words first, then the partner's, then every house name */
  const MEMO=new Map();
  function translator(o,p){
    const key=o+"|"+(p||"");let fn=MEMO.get(key);if(fn)return fn;
    const maps=[BYH[o]];if(p&&p!==o&&BYH[p])maps.push(BYH[p]);maps.push(BYG);const memo=new Map();
    fn=s=>{if(typeof s!=="string"||!s)return s;let r=memo.get(s);if(r===undefined){r=run(s,maps);if(r!==s)r=r.replace(/\b([Aa]) (?=(orca|Orca|arctic|Arctic|owl|Owl|emerald|amber|ice|umber)\b)/g,(m,a)=>a+"n ");memo.set(s,r)}return r};
    fn.o=o;MEMO.set(key,fn);return fn;
  }

  /* ---------- catalog lookups (option groups, item tiers) ---------- */
  const optGroup=new Map();
  const groupOf=(f,v)=>{let m=optGroup.get(f);if(!m){m=new Map();(CHAR[f]||[]).forEach(e=>{if(!m.has(e[0]))m.set(e[0],e[1])});optGroup.set(f,m)}return m.get(v)};
  /* item index per outfit field; items appended since the last look are folded in rather than re-indexing the field */
  const itemIdx=new Map();
  const itemOf=(f,v)=>{const a=OUTFIT[f]||[];let m=itemIdx.get(f);
    if(!m||m.a!==a||m.n>a.length){m=new Map();m.a=a;m.n=0;itemIdx.set(f,m)}
    for(;m.n<a.length;m.n++){const i=a[m.n];if(!m.has(i.v))m.set(i.v,i)}
    return m.get(v)};
  const maleItem=(f,v)=>typeof OSEX==="object"&&OSEX[f]&&OSEX[f][v]==="m";
  function regItem(f,v0,v1){
    if(v1===v0||!v1||itemOf(f,v1))return;
    const src=itemOf(f,v0);
    if(maleItem(f,v0)&&typeof addMO==="function")addMO(f,[[v1,src&&src.t||"CU",src&&src.f]]);
    else START.item(f,v1,src&&src.t,src&&src.f);
  }
  function regOpt(f,v0,v1,male){
    if(typeof v1!=="string"||!v1||v1[0]==="@"||!CHAR[f])return;
    if(groupOf(f,v1)!==undefined)return;
    const g=groupOf(f,v0)||"Academy";
    if(male&&typeof addM==="function")addM(f,[v1],g);else START.option(f,v1,g);
    optGroup.get(f).set(v1,g);
  }

  /* ---------- translating the parts of an entry ---------- */
  /* the Real and Anime close-ups color her knitwear and lingerie in her own accent color, written out rather than a palette slot */
  const COL={};SIS.forEach(s=>{const S=SISLORE[s],L=NEWLORE[BIJ[s]];if(S&&S.g&&L&&L.g&&S.g.col!==L.g.col)COL[s]=[S.g.col,L.g.col]});
  const items=(it,tr)=>{if(!it)return it;let ch=false;const o={};const cm=COL[tr.o];
    for(const f in it){const a=it[f];
      if(!Array.isArray(a)){o[f]=a;continue}
      const v=typeof a[0]==="string"?tr(a[0]):a[0];
      const c1=cm&&a[1]===cm[0],c3=cm&&a[3]===cm[0];
      if(v!==a[0]||c1||c3){const b=a.slice();b[0]=v;if(c1)b[1]=cm[1];if(c3)b[3]=cm[1];o[f]=b;ch=true;if(v!==a[0])regItem(f,a[0],v)}else o[f]=a}
    return ch?o:it};
  const details=(d,tr)=>{if(!d)return d;let ch=false;const o={};for(const f in d){const v=d[f],w=typeof v==="string"?tr(v):v;if(w!==v){ch=true;regItem(f,v,w)}o[f]=w}return ch?o:d};
  const outfit=(o,tr)=>{if(!o)return o;const on=typeof o.oname==="string"?tr(o.oname):o.oname,it=items(o.items,tr),de=details(o.details,tr);
    return on===o.oname&&it===o.items&&de===o.details?o:Object.assign({},o,{oname:on,items:it,details:de})};
  const deep=(v,tr)=>{if(typeof v==="string")return tr(v);if(Array.isArray(v))return v.map(x=>deep(x,tr));
    if(v&&typeof v==="object"){const o={};for(const k in v)o[k]=deep(v[k],tr);return o}return v};
  const scene=(w,tr)=>{if(!w)return w;const o=deep(Object.assign({},w,{f:null,m:null}),tr);if(w.f)o.f=items(w.f,tr);if(w.m)o.m=items(w.m,tr);
    if(o.f===null)delete o.f;if(o.m===null)delete o.m;return o};

  /* ---------- roots ---------- */
  const tpl=id=>tplById(id);
  const ROOTOF={};OLD.forEach(h=>{ROOTOF[h+"robes"]=["robes",h];ROOTOF[h+"head"]=["head",h];ROOTOF[h+"man"]=["man",h]});
  if(ACAD.BASES)Object.entries(ACAD.BASES).forEach(([h,id])=>{ROOTOF[id]=["robes",h]});
  const newRootId=id=>{const r=ROOTOF[id];return r&&BIJ[r[1]]?BIJ[r[1]]+r[0]:null};
  const rootOf=id=>{let k=id,g=0;while(k&&g++<40){if(ROOTOF[k])return k;const e=R[k];if(!e||!e.base)return null;k=e.base}return null};
  const dropsOf=id=>{const out=new Set();let k=id,g=0;while(k&&!ROOTOF[k]&&g++<40){const e=R[k];if(!e)break;(e.drop||[]).forEach(f=>out.add(f));k=e.base}return out};

  /* 1a. robes */
  const ROBEIT={top:"CU",bottom:"CU",outerwear:"CU",neckAccessory:"CU",legwear:"CU",earAccessory:"CU",tagCharm:"CU",headwear:"CU",corset:"CU",belt:"CU",eyewear:"CU"};
  NEWGIRLS.forEach(g=>{
    Object.entries(g.c).forEach(([f,v])=>{if(typeof v==="string"&&v[0]!=="@")START.option(f,v,"Academy")});
    Object.entries(g.robes).forEach(([f,a])=>{if(!itemOf(f,a[0]))START.item(f,a[0],ROBEIT[f]||"CU","costume,preppy")});
  });
  START.add("Academy",NEWGIRLS.map(g=>({id:g.k+"robes",name:DISP(g.k)+" robes",blurb:g.blurb,pal:Object.assign({},g.pal),c:Object.assign({},g.c),
    outfit:{oname:"Robe, sweater vest and pleated skirt",look:"costume",items:JSON.parse(JSON.stringify(g.robes)),details:{},dcol:{}},
    nude:true,tags:["academy","robes",g.k],out:{framing:"full body",must:MUST}})));

  /* 1b. headmistresses: her robes face and figure, grown up, in the sister headmistress's faculty clothes */
  const heads=[];
  NEWGIRLS.forEach(g=>{
    const sh=tpl(g.sis+"head"),nr=tpl(g.k+"robes"),H=NEWHEADS[g.k];if(!sh||!nr||!H)return;
    const tr=translator(g.sis,null);
    const c=Object.assign({},nr.c,H.c);if(H.c.hairStyle)delete c.hairMovement;
    Object.entries(H.c).forEach(([f,v])=>regOpt(f,sh.c[f],v,false));
    heads.push({id:g.k+"head",name:DISP(g.k)+" headmistress",blurb:H.blurb+" In the "+DISP(g.k)+" faculty robes.",pal:Object.assign({},nr.pal),c,
      outfit:JSON.parse(JSON.stringify(outfit(sh.outfit,tr))),more:(sh.more||[]).filter(m=>m.oname!=="Nude").map(m=>JSON.parse(JSON.stringify(outfit(m,tr)))),
      nude:true,tags:(sh.tags||["headmistress"]).map(x=>x===g.sis?g.k:tr(x)).concat((sh.tags||[]).includes(g.sis)?[]:[g.k]),out:JSON.parse(JSON.stringify(deep(sh.out||{},tr)))});
  });
  START.add("Academy Headmistresses",heads);

  /* 1c. boyfriends: the sister boyfriend's job and wardrobe, with his own look and her house's colors */
  const men=[];
  NEWGIRLS.forEach(g=>{
    const sm=tpl(g.sis+"man"),M=NEWMEN[g.k];if(!sm||!M)return;
    const tr=translator(g.sis,null);
    const c={};Object.entries(sm.c).forEach(([f,v])=>{const w=typeof v==="string"?tr(v):v;if(w!==v)regOpt(f,v,w,true);c[f]=w});
    Object.entries(M.c).forEach(([f,v])=>{regOpt(f,sm.c[f],v,true);c[f]=v});
    men.push({id:g.k+"man",name:DISP(g.k)+" boyfriend",blurb:M.blurb,pal:Object.assign({},g.man),c,
      outfit:JSON.parse(JSON.stringify(outfit(sm.outfit,tr))),more:(sm.more||[]).filter(m=>m.oname!=="Nude").map(m=>JSON.parse(JSON.stringify(outfit(m,tr)))),
      nude:true,tags:(sm.tags||[]).map(x=>x===g.sis?g.k:tr(x)),out:JSON.parse(JSON.stringify(deep(sm.out||{},tr)))});
  });
  START.add("Academy Men",men);

  /* 1d. her own Signature look (built the way signature169.js builds the others) */
  {
    const must=s=>`an anime style with high detail, ${s}, and particular emphasis on highly detailed skin, hair and eyes`;
    const LING={bra:["{c} lace balconette bra with a {c2} bow","@primary",null,"@accent"],panties:["{c} lace panties with a {c2} bow","@primary",null,"@accent"],legwear:["{c} lace-top thigh-high stockings","@secondary"]};
    NEWH.forEach(h=>{const r=NEWSIG[h];if(!r)return;Object.entries(r[5]).forEach(([f,a])=>{if(a&&a[0]&&!itemOf(f,a[0]))START.item(f,a[0],"US","glam")});
      START.option("posture",r[3],"Posture");START.option("expression",r[2],"Academy")});
    if(PRESET_GROUPS.start.some(x=>x.label==="Academy Signature"))
      ACAD.set("Academy Signature",null,"signature","signature","glam",{tags:["signature look","hero outfit"],oname:"Signature",must:must("a place that is all her own")},
        NEWH.filter(h=>NEWSIG[h]).map(h=>{const r=NEWSIG[h];return[h,Object.assign({},r[5]),r[2],r[3],r[1],{more:[{oname:"Signature lingerie",look:"boudoir",items:LING}]}]}));
    NEWH.forEach(h=>{const r=NEWSIG[h],t=tpl(h+"signature");if(!r||!t)return;t.name=r[0]+" ("+DISP(h)+")";t.out=Object.assign({},t.out,{must:must(r[4])})});
  }

  /* ---------- 2. every other Academy entry, re-cut for the counterpart house ---------- */
  const SKIP=new Set(["Academy","Academy Headmistresses","Academy Men","Academy Signature"]);
  const ownerOf=new Map();   /* sister entry id -> sister house */
  const jobs=[];
  PRESET_GROUPS.start.forEach(g=>{
    if(!/^Academy/.test(g.label)||SKIP.has(g.label)||(ONLY&&!ONLY.has(g.label)))return;
    g.keys.forEach(k=>{if(ownerOf.has(k))return;const r=rootOf(k);if(!r||!BIJ[ROOTOF[r][1]])return;ownerOf.set(k,ROOTOF[r][1]);jobs.push([g,k,r])});
  });
  const PREF=SIS.slice().sort((a,b)=>b.length-a.length);
  const takenIds=new Set(TEMPLATES.map(t=>t.id));
  const cidMemo=new Map();
  function cloneId(id){
    let v=cidMemo.get(id);if(v)return v;
    const o=ownerOf.get(id),t=tpl(id),tags=t&&t.tags||[];
    const pre=PREF.find(h=>id.startsWith(h)&&(h===o||tags.includes(h)));
    if(pre)v=BIJ[pre]+id.slice(pre.length);
    else if(o&&o!=="rat"&&id.includes(o))v=id.replace(o,BIJ[o]);
    else v=BIJ[o]+"_"+id;
    let w=v,i=2;while(takenIds.has(w))w=v+"_"+(i++);
    takenIds.add(w);cidMemo.set(id,w);return w;
  }
  jobs.forEach(([,k])=>cloneId(k));
  /* an earlier wave's copy of a partner entry ("stagbikini" has no Lioness copy, "griffinbikini" does) */
  const REV=new Map();if(PSIS.length&&ACAD.CLONEOF)Object.entries(ACAD.CLONEOF).forEach(([cid,sid])=>{const t=tplById(cid);if(t&&t._house)REV.set(t._house+"|"+sid,cid)});
  const pfall=new Set();
  const mapPairId=id=>{
    if(typeof id!=="string"||!id)return id;
    const nr=newRootId(id);if(nr)return nr;
    {const rr=ROOTOF[id];if(rr&&PB[rr[1]]&&!BIJ[rr[1]])return PB[rr[1]]+rr[0]}
    if(cidMemo.has(id))return cidMemo.get(id);
    const r=rootOf(id);
    if(r){const h=ROOTOF[r][1];
      if(!BIJ[h]&&PB[h]){const n=PB[h],c=REV.get(n+"|"+id);if(c)return c;if(/signature$/.test(id)&&tpl(n+"signature"))return n+"signature";pfall.add(id);return n+(ROOTOF[r][0]==="robes"?"robes":ROOTOF[r][0])}
      if(!BIJ[h])return id;if(/signature$/.test(id)&&tpl(BIJ[h]+"signature"))return BIJ[h]+"signature";
      problems.push(id+": partner has no counterpart copy");}
    return id;
  };
  const partnerHouse=id=>{if(typeof id!=="string"||!id)return null;const r=rootOf(id);return r?ROOTOF[r][1]:null};

  /* her own face, figure and palette replace the sister's wherever the set kept the sister's */
  function rebaseC(tc,sc,nc,drops,tr,male){
    const c={};
    for(const f in tc){const v=tc[f];
      if(f in sc&&sc[f]===v){if(f in nc)c[f]=nc[f];continue}
      const w=typeof v==="string"?tr(v):v;
      if(w===""){continue}
      if(w!==v)regOpt(f,v,w,male);
      c[f]=w;
    }
    for(const f in nc){if(f in c||f in tc||f in sc||drops.has(f))continue;c[f]=nc[f]}
    return c;
  }
  function rebasePal(tp,sp,np,tr){
    const p=Object.assign({},np);
    for(const k in tp){const v=tp[k];if(sp&&sp[k]===v)continue;p[k]=typeof v==="string"?tr(v):v}
    return p;
  }
  /* the copy's character fields are worked out the first time anything reads them (most entries are never opened);
     options the set itself changed are registered now, from the set's own entry, so the option lists have them from the start */
  const preReg=(k,tr,male)=>{let id=k,g=0;while(id&&!ROOTOF[id]&&g++<40){const e=R[id];if(!e)break;
      [e.c,e.out&&e.out.pair&&e.out.pair.c1].forEach(c=>{if(c)for(const f in c){const v=c[f];if(typeof v==="string"){const w=tr(v);if(w&&w!==v)regOpt(f,v,w,male)}}});
      id=e.base}};
  const own=(T,k,v)=>{Object.defineProperty(T,k,{value:v,writable:true,configurable:true,enumerable:true});return v};
  const lazy=(T,k,make)=>{Object.defineProperty(T,"_mk_"+k,{value:make});Object.defineProperty(T,k,{configurable:true,enumerable:true,get(){return own(T,k,make())},set(v){own(T,k,v)}})};
  /* a look at a copy's character fields without keeping them (the picker's search text) */
  ACAD.peekC=t=>{if(!t)return t;const d=t._mk_c&&Object.getOwnPropertyDescriptor(t,"c");return d&&d.get?t._mk_c():t.c};
  /* the scene and setting text of a copy is translated when it is first read; lists that only need to know whether an
     entry is a scene, or what acts it uses, can read the sister's (ACAD.peekOut) without translating anything */
  ACAD.peekOut=t=>{if(!t)return t;const d=t._clone&&Object.getOwnPropertyDescriptor(t,"out");return d&&d.get?(tplById(t._clone)||{}).out:t.out};
  function outOf(t,tr){
    const out=deep(Object.assign({},t.out||{},{pair:null}),tr);delete out.pair;
    if(t.out&&t.out.pair){const p=t.out.pair,q=deep(Object.assign({},p,{id:null,w1:null,w2:null,c1:null,c2:null}),tr);
      q.id=mapPairId(p.id);
      if(pfall.has(p.id)&&typeof q.outfit==="number")q.outfit=p.explicit?1:0;   /* a fallback partner wears her robes or nothing */
      if(p.w1)q.w1=scene(p.w1,tr);else delete q.w1;if(p.w2)q.w2=scene(p.w2,tr);else delete q.w2;
      if(p.c1){q.c1={};for(const f in p.c1){const v=p.c1[f],w=typeof v==="string"?tr(v):v;if(w!==v)regOpt(f,v,w,false);q.c1[f]=w}}else delete q.c1;
      if(p.c2){q.c2=deep(p.c2,tr)}else delete q.c2;
      out.pair=q}
    return out;
  }
  const made=[],byGroup=new Map();
  let nShared=0;
  jobs.forEach(([g,k,r])=>{
    const t=tpl(k);if(!t)return;
    const o=ROOTOF[r][1],kind=ROOTOF[r][0],n=BIJ[o];
    const sr=tpl(r),nr=tpl(n+kind);if(!sr||!nr){problems.push(k+": no root for "+n+kind);return}
    const pid=t.out&&t.out.pair&&t.out.pair.id,ph=partnerHouse(pid);
    const tr=translator(o,ph);
    const male=kind==="man";
    const T={id:cloneId(k),name:tr(t.name||k),blurb:tr(t.blurb||"")};
    T.pal=rebasePal(t.pal||{},sr.pal||{},nr.pal||{},tr);
    lazy(T,"c",()=>rebaseC(t.c||{},sr.c||{},nr.c||{},dropsOf(k),tr,male));preReg(k,tr,male);
    T.outfit=outfit(t.outfit,tr);if(T.outfit===t.outfit)nShared++;
    T.more=(t.more||[]).map(m=>outfit(m,tr));
    lazy(T,"out",()=>outOf(t,tr));
    if(t.tags)T.tags=t.tags.map(x=>x===o?n:x===ph&&PB[ph]?PB[ph]:tr(x));
    if(t.adultOnly)T.adultOnly=true;
    Object.defineProperty(T,"_clone",{value:k,enumerable:false});Object.defineProperty(T,"_house",{value:n,enumerable:false});
    made.push(T);
    let L=byGroup.get(g);if(!L)byGroup.set(g,L=[]);L.push(T.id);
  });
  /* register: straight into the library and its index (START.add would re-resolve and deep-copy each one) */
  const start=TEMPLATES.length;
  made.forEach(T=>TEMPLATES.push(T));
  if(tplById.m&&tplById.n===start){made.forEach((T,i)=>tplById.m.set(T.id,start+i));tplById.n=TEMPLATES.length}
  byGroup.forEach((ids,g)=>{g.keys.push(...ids)});
  ACAD.CLONEOF=ACAD.CLONEOF||{};made.forEach(T=>{ACAD.CLONEOF[T.id]=T._clone});

  /* ---------- 4. the house list, lore and Real/Anime tags the rest of the studio reads ---------- */
  NEWH.forEach(h=>{if(!ACAD.HOUSES.includes(h))ACAD.HOUSES.push(h)});
  if(ACAD.HUM){NEWGIRLS.forEach(g=>{ACAD.HUM.HD[g.k]=[g.room,g.pride,g.pet,g.bath];if(!ACAD.HUM.HS.includes(g.k))ACAD.HUM.HS.push(g.k)})}
  if(ACAD.REALG)NEWH.forEach(h=>{if(NEWLORE[h]&&NEWLORE[h].g)ACAD.REALG[h]=NEWLORE[h].g});
  ACAD.SISTER=Object.assign(ACAD.SISTER||{},Object.fromEntries(NEWGIRLS.map(g=>[g.k,g.sis])));
  ACAD["CLONE"+tag]={stat:STAT,made:made.length,shared:nShared,ms:Math.round(performance.now()-T0),problems,hits:HITS,dict:DICT};
  problems.forEach(p=>START.problems.push(p));
}
ACAD_WAVE(typeof NEWGIRLS!=="undefined"&&NEWGIRLS,typeof NEWLORE!=="undefined"&&NEWLORE,typeof NEWHEADS!=="undefined"&&NEWHEADS,typeof NEWMEN!=="undefined"&&NEWMEN,typeof NEWSIG!=="undefined"&&NEWSIG,"210");
if(typeof NEWGIRLS2!=="undefined")ACAD_WAVE(NEWGIRLS2,NEWLORE2,NEWHEADS2,NEWMEN2,NEWSIG2,"211");
/* v213: the Lioness's pack. Each cat's sister shares most of her scenes with one partner; that partner becomes Lioness. */
if(typeof NEWGIRLS3!=="undefined")ACAD_WAVE(NEWGIRLS3,NEWLORE3,NEWHEADS3,NEWMEN3,NEWSIG3,"213",{griffin:"lioness",salmon:"lioness",stag:"lioness",owl:"lioness"});
/* v217: wave 4, the Hive's queen and new bugs, and the Pride's tenth cat. Only the look sets and the kept scene sets. */
if(typeof NEWGIRLS4!=="undefined"){
  const KEPT=["Academy Best Friend Selfie","Academy Pillow Fight","Academy Blanket Fort","Academy Karaoke Duet","Academy Photo Booth","Academy Matching Outfits","Academy Late-Night Whispers","Academy Braiding Hair",
    "Academy Secret Girlfriends: Sleepover Excuse","Academy Secret Girlfriends: Family Holidays","Academy Secret Girlfriends: Close Calls","Academy Secret Girlfriends: Just Roommates","Academy Secret Girlfriends: Dear Diary",
    "Academy Secret Girlfriends: Booty Call","Academy Secret Girlfriends: Study Break","Academy Secret Girlfriends: Steamy Shower","Academy Secret Girlfriends: Same Time Next Week",
    "Academy Sweethearts","Academy First Date","Academy First Kiss","Academy Slow Dance","Academy Stargazing","Academy Moving In","Academy Proposal","Academy Wedding",
    "Academy Intimacy","Academy Morning Sex","Academy Pure Love","Academy Honeymoon Suite",
    "Academy Anime: Portraits","Academy Anime: Cozy","Academy Anime: Lingerie","Academy Anime: Wet","Academy Anime: Nude"];
  ACAD.WAVE_ONLY=new Set(KEPT.concat((ACAD.CATS||[]).flatMap(([,l])=>l)));
  ACAD_WAVE(NEWGIRLS4,NEWLORE4,NEWHEADS4,NEWMEN4,NEWSIG4,"217",null,ACAD.WAVE_ONLY);
}

/* ---- v218: wave 5 of the house pass. The Coil grows to ten: Cobra (Serpent's stories), Viper (Fox's), Chameleon (Crow's),
   Gecko (Rat's), Crocodile (Dragon's), Iguana (Flamingo's), Axolotl (Salmon's), Frog (Lovebird's), Turtle (Owl's); Axolotl takes Salmon's stories (river and blossom, not Penguin's snow).
   Only the look sets and the scene sets still on the Scenes list are re-cut for them. */
const NEWGIRLS5=[
{k:"cobra",sis:"serpent",pal:{primary:"black",secondary:"gold",third:"turquoise",accent:"royal blue",extra:"ivory"},
 man:{primary:"black",secondary:"ivory",third:"gold",accent:"turquoise",extra:"royal blue"},
 room:"a candlelit desert-palace bedroom with lapis tiles and gold-draped pillars",pride:"the queen of the desert dance",pet:"Nefi",
 bath:"a lapis-tiled sunken bath strewn with lotus petals",role:"the snake charmer",acc:"warm lamplight glinting off gold and lapis",
 c:{age:"young woman",faceShape:"elegant, angular face with high cheekbones",eyeConfig:"matching",eyeShape:"long, kohl-lined almond eyes",pupilStyle:"round pupils",irisDetail:"gold irises with thin dark rings",
  lashNatural:"long, thick black eyelashes",eyeOne:"gold",browShape:"sharp, straight brows",noseShape:"straight, elegant nose",mouthShape:"full, sculpted lips",
  expression:"hypnotic, half-lidded smile",impression:"a regal, hypnotic grace",faceMark:"a beauty mark on one cheekbone",
  hairStyle:"sleek blunt bob with gold-beaded braids at the temples",hairLength:"chin-length",hairTexture:"glossy and straight",bangs:"blunt straight bangs",hairMovement:"swings in a sharp, glossy line",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"a hidden turquoise underlayer and thin gold-beaded braids",
  skinTone:"golden bronze",undertone:"warm golden",skinFinish:"smooth, glowing skin with a golden sheen",markings:"no markings",bodyMarkings:"a coiled cobra tattoo winding around one thigh",
  makeupStyle:"dramatic kohl glam makeup",eyelinerStyle:"bold kohl winged eyeliner",eyeshadowStyle:"gold and lapis shimmer eyeshadow",lashStyle:"dramatic lashes",blushStyle:"bronzed blush",lipFinish:"glossy deep-nude lips",faceAccents:"gold highlight on the cheekbones",nailStyle:"long pointed fingernails",nailColor:"@secondary",
  heightStature:"tall stature",shoulderShape:"elegant, straight shoulders",torsoShape:"slim, long torso",armShape:"slender, graceful arms",handShape:"long, expressive fingers",
  bustSize:"medium-large, full breasts",bustShape:"round, perky shape",bustWeight:"firm fullness",waistShape:"very narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy, swaying hips",buttSize:"round, firm butt",thighBuild:"toned thighs",legShape:"long, shapely legs",bodySoftness:"tall, sinuous hourglass figure",
  posture:"swaying with her arms raised in a slow, hypnotic dance",
  nippleColor:"light brown",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"light brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy brown",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@secondary"],
  legwear:["sheer {c} stockings with {c2} scale-print tops","@primary",null,"@secondary"],earAccessory:["gold cobra ear cuffs","@secondary"],tagCharm:["small cobra crest badge","@secondary"]},
 blurb:"The Coil's snake charmer: a tall, sinuous dancer with a sleek black bob over a hidden turquoise underlayer, gold-beaded braids at her temples, kohl-lined gold eyes and golden-bronze skin. A black hooded robe lined in gold over an ivory vest and black pleated skirt, scale-print stockings and gold cobra ear cuffs."},

{k:"viper",sis:"fox",pal:{primary:"black",secondary:"lime green",third:"charcoal gray",accent:"silver",extra:"emerald green"},
 man:{primary:"charcoal gray",secondary:"black",third:"lime green",accent:"silver",extra:"white"},
 room:"a sleek black-and-green loft with a weapons rack and a terrarium wall",pride:"the deadliest fang in the Coil",pet:"Fang",
 bath:"a black slate rain shower behind green glass",role:"the assassin",acc:"cold green light through tinted glass",
 c:{age:"young woman",faceShape:"sharp, narrow face with a pointed chin",eyeConfig:"matching",eyeShape:"narrow, upturned, catlike eyes",pupilStyle:"slit pupils",irisDetail:"acid-green irises",
  lashNatural:"long, dark eyelashes",eyeOne:"lime green",browShape:"thin, sharply arched brows",noseShape:"small, sharp nose",mouthShape:"thin, smirking lips",
  expression:"cold, amused smirk",impression:"a quiet, lethal cool",faceMark:"a thin scar through her lower lip",
  hairStyle:"sleek low braid",hairLength:"waist-length",hairTexture:"silky straight",bangs:"long side-swept bangs over one eye",hairMovement:"falls over one eye",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"acid-green streaks running through the black",
  skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, pale skin",markings:"no markings",bodyMarkings:"a coiled green viper tattoo along her ribs",
  makeupStyle:"sharp graphic makeup",eyelinerStyle:"sharp black eyeliner",eyeshadowStyle:"smoky green eyeshadow",lashStyle:"lifted lashes",blushStyle:"barely-there blush",lipFinish:"matte dark berry lips",faceAccents:"sharp contour",nailStyle:"short pointed fingernails",nailColor:"@primary",
  heightStature:"slightly above-average height",shoulderShape:"lean, defined shoulders",torsoShape:"lean, toned torso",armShape:"lean, toned arms",handShape:"quick, slender hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"firm fullness",waistShape:"slim waist",stomachShape:"flat stomach with defined abs",
  hipShape:"slim hips",buttSize:"small, firm butt",thighBuild:"lean, toned thighs",legShape:"long, lean legs",bodySoftness:"lean, athletic, wiry build",
  posture:"crouched low with a dagger reversed in one hand",
  nippleColor:"pale pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"pale pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@primary"],
  legwear:["{c} thigh-high stockings","@primary"],gloves:["{c} fingerless gloves","@primary"],earAccessory:["silver fang ear cuffs","@accent"],tagCharm:["small viper crest badge","@secondary"]},
 blurb:"The Coil's fang: a lean, wiry assassin with a waist-length black braid streaked acid green, long bangs over one slit-pupiled lime eye, pale skin and a cold, amused smirk. A black hooded robe lined in lime over a charcoal vest and black pleated skirt, fingerless gloves and silver fang ear cuffs."},

{k:"chameleon",sis:"crow",pal:{primary:"mint green",secondary:"lavender",third:"teal",accent:"coral",extra:"cream"},
 man:{primary:"charcoal gray",secondary:"teal",third:"cream",accent:"coral",extra:"black"},
 room:"an artist's attic studio splashed with paint, canvases on every wall",pride:"the Coil's girl of a thousand faces",pet:"Hue",
 bath:"a claw-foot tub in a paint-splattered attic studio",role:"the master of disguise",acc:"soft daylight through a paint-smeared skylight",
 c:{age:"young woman",faceShape:"small, soft heart-shaped face",eyeConfig:"matching",eyeShape:"large, round, slightly wide-set eyes",pupilStyle:"round pupils",irisDetail:"shifting teal-to-amber irises",
  lashNatural:"long, curled eyelashes",eyeOne:"teal",browShape:"soft, straight brows",noseShape:"small, rounded nose",mouthShape:"small, shy lips",
  expression:"shy, bashful smile",impression:"a shy, shifting, artistic sweetness",faceMark:"a smudge of paint on her cheek",
  hairStyle:"long layered waves",hairLength:"waist-length",hairTexture:"soft and wavy",bangs:"soft side-swept bangs",hairMovement:"seems to shift color as she moves",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@accent",hairBlend:"a shifting ombre from mint through teal to lavender with coral tips",
  skinTone:"fair",undertone:"neutral",skinFinish:"soft skin that flushes easily",markings:"no markings",bodyMarkings:"a tiny chameleon tattoo curled around her wrist",
  makeupStyle:"soft pastel makeup",eyelinerStyle:"thin brown eyeliner",eyeshadowStyle:"iridescent pastel eyeshadow",lashStyle:"curled lashes",blushStyle:"heavy rosy blush",lipFinish:"soft coral gloss",faceAccents:"pearly highlight",nailStyle:"short rounded fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"soft, narrow shoulders",torsoShape:"soft torso",armShape:"slim arms",handShape:"paint-stained, delicate hands",
  bustSize:"large, soft breasts",bustShape:"round, soft shape",bustWeight:"soft fullness",waistShape:"narrow waist",stomachShape:"soft, flat stomach",
  hipShape:"rounded hips",buttSize:"round, soft butt",thighBuild:"soft thighs",legShape:"shapely legs",bodySoftness:"soft, curvy hourglass figure",
  posture:"peeking out shyly from behind a canvas",
  nippleColor:"soft pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"soft pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@third"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@accent"],
  legwear:["{c} thigh-high socks with {c2} ombre tops","@third",null,"@primary"],earAccessory:["mismatched pastel stud earrings","@accent"],tagCharm:["small chameleon crest badge","@accent"]},
 blurb:"The Coil's girl of a thousand faces: a shy, curvy painter with waist-length waves shifting from mint through teal to lavender with coral tips, big teal eyes, fair skin that flushes at everything and a smudge of paint on her cheek. A lavender hooded robe lined in mint over a cream vest and teal pleated skirt, ombre socks and mismatched earrings."},

{k:"gecko",sis:"rat",pal:{primary:"sunflower yellow",secondary:"chocolate brown",third:"cream",accent:"tangerine orange",extra:"black"},
 man:{primary:"black",secondary:"tangerine orange",third:"cream",accent:"gold",extra:"chocolate brown"},
 room:"a tiny rooftop room reached only by climbing, sun-warmed and full of plants",pride:"the best climber in the Coil",pet:"Sticky",
 bath:"a sun-warmed rooftop outdoor tub among potted plants",role:"the climber",acc:"warm afternoon sun on a rooftop garden",
 c:{age:"young woman",faceShape:"round, cheeky face with a pointed chin",eyeConfig:"matching",eyeShape:"huge, round, dark eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with bright highlights",
  lashNatural:"long, dark eyelashes",eyeOne:"dark brown",browShape:"high, playful brows",noseShape:"small button nose",mouthShape:"wide, smiling mouth",
  expression:"cheeky, wide smile",impression:"a cheeky, fearless, sunny energy",faceMark:"tiny dark freckles scattered across her nose and cheeks",
  hairStyle:"chin-length layered bob",hairLength:"chin-length",hairTexture:"sleek and glossy",bangs:"wispy side bangs",hairMovement:"flicks out at the ends",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"sunny yellow with tangerine tips and a few dark spots",
  skinTone:"warm tan",undertone:"warm",skinFinish:"smooth, sun-kissed skin",markings:"small dark freckles dotted across her shoulders",bodyMarkings:"a gecko tattoo climbing up her ankle",
  makeupStyle:"fresh, sporty makeup",eyelinerStyle:"thin eyeliner",eyeshadowStyle:"warm orange shimmer eyeshadow",lashStyle:"natural lashes",blushStyle:"sunny peach blush",lipFinish:"glossy peach lips",faceAccents:"nose-tip highlight",nailStyle:"short rounded fingernails",nailColor:"@accent",
  heightStature:"short stature",shoulderShape:"small, athletic shoulders",torsoShape:"compact, toned torso",armShape:"toned, strong arms",handShape:"small, strong hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"rounded hips",buttSize:"round, perky, athletic butt",thighBuild:"toned thighs",legShape:"toned, shapely legs",bodySoftness:"compact, athletic hourglass build",
  posture:"clinging to a wall with one hand, grinning down over her shoulder",
  nippleColor:"caramel pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"caramel pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@accent"],
  legwear:["{c} thigh-high socks with {c2} tops","@secondary",null,"@primary"],earAccessory:["little gold gecko ear climbers","@accent"],tagCharm:["small gecko crest badge","@accent"]},
 blurb:"The Coil's climber: a compact, athletic free-runner with a sleek sunny-yellow bob tipped tangerine, huge dark eyes, freckles, warm tan skin and a cheeky grin. A black hooded robe lined in yellow over a cream vest and chocolate pleated skirt, yellow-topped socks and little gold gecko ear climbers."},

{k:"crocodile",sis:"dragon",pal:{primary:"forest green",secondary:"bronze",third:"sand",accent:"gold",extra:"black"},
 man:{primary:"black",secondary:"forest green",third:"sand",accent:"gold",extra:"bronze"},
 room:"a stilted bayou house bedroom with a mosquito-net canopy bed",pride:"the queen of the swamp",pet:"Snappy",
 bath:"a clawfoot tub on a screened bayou porch",role:"the swamp queen",acc:"warm golden light through bayou moss",
 c:{age:"young woman",faceShape:"strong, broad face with full cheeks and a wide smile",eyeConfig:"matching",eyeShape:"heavy-lidded, sleepy eyes",pupilStyle:"round pupils",irisDetail:"gold irises with dark rings",
  lashNatural:"long, thick eyelashes",eyeOne:"gold",browShape:"thick, straight brows",noseShape:"broad, straight nose",mouthShape:"wide, full lips",
  expression:"lazy, toothy grin",impression:"a lazy, powerful, dangerous calm",faceMark:"a faint scar along her jaw",
  hairStyle:"long thick braid down her back",hairLength:"hip-length",hairTexture:"thick and smooth",bangs:"no bangs",hairMovement:"hangs heavy down her back",
  hairBase:"@primary",hairUnderlayer:"@extra",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"bronze highlights through the deep green",
  skinTone:"deep brown",undertone:"warm",skinFinish:"smooth, glowing skin",markings:"no markings",bodyMarkings:"a band of scale tattoos along her spine",
  makeupStyle:"bold glam makeup",eyelinerStyle:"smoky eyeliner",eyeshadowStyle:"bronze and green shimmer eyeshadow",lashStyle:"full lashes",blushStyle:"warm bronze blush",lipFinish:"glossy deep plum lips",faceAccents:"golden highlight",nailStyle:"long square fingernails",nailColor:"@secondary",
  heightStature:"very tall, powerful stature",shoulderShape:"broad, muscular shoulders",torsoShape:"strong, muscular torso",armShape:"muscular arms",handShape:"strong hands",
  bustSize:"very large, full breasts",bustShape:"round, heavy shape",bustWeight:"heavy, firm fullness",waistShape:"defined waist",stomachShape:"firm stomach with defined abs",
  hipShape:"wide, powerful hips",buttSize:"big, round, muscular butt",thighBuild:"thick, muscular thighs",legShape:"long, powerful legs",bodySoftness:"very tall, muscular, curvy amazon build",
  posture:"lounging lazily with her arms folded behind her head",
  nippleColor:"dark brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"dark brown",areolaType:"smooth",areolaSize:"large",vaginaColor:"dark pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@primary"],
  legwear:["{c} knee-high boots","@extra"],earAccessory:["gold tooth earrings","@accent"],tagCharm:["small crocodile crest badge","@accent"]},
 blurb:"The Coil's muscle: a very tall, muscular amazon with a hip-length deep-green braid shot with bronze, sleepy gold eyes, deep brown skin and a lazy, toothy grin. A black hooded robe lined in green over a sand vest and green pleated skirt, knee-high boots and gold tooth earrings."},

{k:"iguana",sis:"flamingo",pal:{primary:"lime green",secondary:"turquoise",third:"coral",accent:"gold",extra:"sand"},
 man:{primary:"sand",secondary:"turquoise",third:"white",accent:"gold",extra:"lime green"},
 room:"a breezy beach-hut bedroom with a hammock and a sun-warmed terrace",pride:"the laziest sunbather in the Coil",pet:"Sunny",
 bath:"an open-air shower under palm fronds, sea breeze through the slats",role:"the sunbather",acc:"warm tropical sun through palm fronds",
 c:{age:"young woman",faceShape:"oval face with high cheekbones",eyeConfig:"matching",eyeShape:"half-lidded, relaxed eyes",pupilStyle:"round pupils",irisDetail:"warm amber irises",
  lashNatural:"long, thick eyelashes",eyeOne:"amber",browShape:"relaxed, straight brows",noseShape:"small, straight nose",mouthShape:"full, lazy smile",
  expression:"lazy, contented smile",impression:"a relaxed, sun-drunk, easygoing allure",faceMark:"light freckles across her nose",
  hairStyle:"high ponytail with spiky crest-like layers",hairLength:"waist-length",hairTexture:"thick and silky",bangs:"short choppy bangs",hairMovement:"fans out like a crest behind her head",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"lime-green hair fading to turquoise at the tips",
  skinTone:"bronze",undertone:"warm",skinFinish:"sun-kissed, glowing skin with a light sheen",markings:"faint tan lines",bodyMarkings:"a small iguana tattoo on her hip",
  makeupStyle:"beachy bronzed makeup",eyelinerStyle:"soft brown eyeliner",eyeshadowStyle:"turquoise shimmer eyeshadow",lashStyle:"natural lashes",blushStyle:"sun-flushed blush",lipFinish:"glossy coral lips",faceAccents:"bronzed highlight",nailStyle:"medium almond fingernails",nailColor:"@third",
  heightStature:"tall stature",shoulderShape:"soft, rounded shoulders",torsoShape:"long, soft torso",armShape:"soft, toned arms",handShape:"relaxed hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"soft, heavy fullness",waistShape:"narrow waist",stomachShape:"soft, flat stomach",
  hipShape:"wide, curvy hips",buttSize:"full, round butt",thighBuild:"soft, full thighs",legShape:"long, shapely legs",bodySoftness:"tall, voluptuous hourglass figure",
  posture:"stretched out on a warm rock with her eyes half closed",
  nippleColor:"caramel brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"caramel brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy brown",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@secondary"],
  legwear:["{c} thigh-high socks","@secondary"],eyewear:["{c} sunglasses pushed up on her head","@third"],earAccessory:["gold hoop earrings","@accent"],tagCharm:["small iguana crest badge","@accent"]},
 blurb:"The Coil's sunbather: a tall, voluptuous, sun-drunk beauty with a waist-length lime-green ponytail fanning out in crest-like layers and fading to turquoise, half-lidded amber eyes, bronze skin and a lazy smile. A turquoise hooded robe lined in lime over a sand vest and lime pleated skirt, coral sunglasses pushed up on her head and gold hoops."},

{k:"axolotl",sis:"salmon",pal:{primary:"pastel pink",secondary:"hot pink",third:"white",accent:"aqua",extra:"lavender"},
 man:{primary:"charcoal gray",secondary:"pastel pink",third:"white",accent:"aqua",extra:"black"},
 room:"a softly lit aquarium-lab bedroom with glowing tanks and pink fairy lights",pride:"the sweetest smile in the Coil",pet:"Smiley",
 bath:"a pink-tiled bathroom with a glowing aquarium wall",role:"the smiling one",acc:"soft blue-pink light from glowing aquarium tanks",
 c:{age:"young woman",faceShape:"round, soft face with full cheeks",eyeConfig:"matching",eyeShape:"big, round, sparkling eyes",pupilStyle:"round pupils",irisDetail:"dark irises with bright highlights",
  lashNatural:"long, curled eyelashes",eyeOne:"dark brown",browShape:"soft, rounded brows",noseShape:"small button nose",mouthShape:"wide, smiling lips",
  expression:"wide, happy smile",impression:"a sweet, endlessly cheerful warmth",faceMark:"a tiny beauty mark beneath her lip",
  hairStyle:"long soft waves with feathery tufts at the sides",hairLength:"waist-length",hairTexture:"soft and wavy",bangs:"soft curtain bangs",hairMovement:"three feathery hot-pink tufts flare out on each side of her head like axolotl gills",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"hot-pink tufts framing her face",
  skinTone:"very fair",undertone:"pink",skinFinish:"soft, dewy, pearly skin",markings:"no markings",bodyMarkings:"a tiny axolotl tattoo on her shoulder",
  makeupStyle:"soft pastel makeup",eyelinerStyle:"thin eyeliner",eyeshadowStyle:"pink shimmer eyeshadow",lashStyle:"curled lashes",blushStyle:"rosy round blush",lipFinish:"glossy pink lips",faceAccents:"pearly highlight",nailStyle:"short rounded fingernails",nailColor:"@secondary",
  heightStature:"average height",shoulderShape:"soft shoulders",torsoShape:"soft torso",armShape:"soft arms",handShape:"soft hands",
  bustSize:"large, soft breasts",bustShape:"round, soft shape",bustWeight:"soft fullness",waistShape:"narrow waist",stomachShape:"soft stomach",
  hipShape:"wide, soft hips",buttSize:"full, soft butt",thighBuild:"soft, thick thighs",legShape:"soft, shapely legs",bodySoftness:"soft, curvy hourglass figure",
  posture:"waving with both hands and a huge smile",
  nippleColor:"pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@accent"],
  legwear:["sheer {c} thigh-high stockings with {c2} lace tops","@third",null,"@secondary"],earAccessory:["pearl drop earrings","@third"],tagCharm:["small axolotl crest badge","@accent"]},
 blurb:"The Coil's sweetest smile: a soft, curvy, endlessly cheerful girl with waist-length pastel-pink waves and feathery hot-pink tufts flaring at her temples like axolotl gills, big dark eyes, very fair pearly skin and a huge smile. A lavender hooded robe lined in pink over a white vest and pink pleated skirt, lace-topped stockings and pearl drops."},

{k:"frog",sis:"lovebird",pal:{primary:"cobalt blue",secondary:"black",third:"sunflower yellow",accent:"lime green",extra:"white"},
 man:{primary:"black",secondary:"cobalt blue",third:"white",accent:"sunflower yellow",extra:"charcoal gray"},
 room:"a fern-filled greenhouse bedroom with a little stage for her karaoke machine",pride:"the loudest voice in the Coil",pet:"Ribbit",
 bath:"a rain-forest shower under hanging ferns",role:"the singer",acc:"green rain-forest light and drifting mist",
 c:{age:"young woman",faceShape:"round face with full cheeks and a wide smile",eyeConfig:"matching",eyeShape:"huge, round, bright eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with golden flecks",
  lashNatural:"long eyelashes",eyeOne:"dark brown",browShape:"expressive, arched brows",noseShape:"small nose",mouthShape:"wide, expressive mouth",
  expression:"big, open-mouthed laugh",impression:"a loud, bubbly, irrepressible spark",faceMark:"a scatter of dark freckles across her cheeks",
  hairStyle:"long high ponytail with a big curled end",hairLength:"hip-length",hairTexture:"glossy and bouncy",bangs:"blunt bangs",hairMovement:"bounces with every hop",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"black and sunny-yellow streaks through the cobalt blue",
  skinTone:"light brown",undertone:"warm",skinFinish:"smooth, glowing skin with a dewy sheen",markings:"no markings",bodyMarkings:"a small blue frog tattoo on her inner wrist",
  makeupStyle:"bright pop makeup",eyelinerStyle:"graphic blue eyeliner",eyeshadowStyle:"yellow and blue shimmer eyeshadow",lashStyle:"full lashes",blushStyle:"bright peach blush",lipFinish:"glossy berry lips",faceAccents:"sparkly highlight",nailStyle:"short square fingernails",nailColor:"@third",
  heightStature:"average height",shoulderShape:"athletic shoulders",torsoShape:"toned torso",armShape:"toned arms",handShape:"quick, expressive hands",
  bustSize:"medium-large, perky breasts",bustShape:"round, perky shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy hips",buttSize:"round, bouncy butt",thighBuild:"strong, toned thighs",legShape:"strong, springy legs",bodySoftness:"toned, curvy athletic build",
  posture:"mid-hop with a microphone raised, singing her heart out",
  nippleColor:"rosy brown",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"rosy brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@third"],
  legwear:["{c} thigh-high socks with {c2} stripes","@secondary",null,"@third"],earAccessory:["lime green drop earrings","@accent"],tagCharm:["small frog crest badge","@accent"]},
 blurb:"The Coil's loudest voice: a bubbly, toned singer with a hip-length cobalt-blue ponytail streaked black and sunny yellow, huge bright eyes, freckles, light brown skin and a big laugh. A black hooded robe lined in cobalt over a yellow vest and blue pleated skirt, striped socks and lime drop earrings."},

{k:"turtle",sis:"owl",pal:{primary:"seafoam green",secondary:"deep teal",third:"sand",accent:"bronze",extra:"cream"},
 man:{primary:"sand",secondary:"deep teal",third:"cream",accent:"bronze",extra:"charcoal gray"},
 room:"a quiet beach-cottage bedroom full of shells, books and a reading nook",pride:"the oldest soul in the Coil",pet:"Shelly",
 bath:"a deep stone soaking tub overlooking a quiet beach",role:"the sage",acc:"slow golden light over a quiet beach",
 c:{age:"young woman",faceShape:"soft oval face with gentle features",eyeConfig:"matching",eyeShape:"large, calm, heavy-lidded eyes",pupilStyle:"round pupils",irisDetail:"warm brown irises with green flecks",
  lashNatural:"long, soft eyelashes",eyeOne:"warm brown",browShape:"soft, relaxed brows",noseShape:"small, soft nose",mouthShape:"soft, full lips",
  expression:"calm, patient smile",impression:"a calm, wise, unhurried warmth",faceMark:"a sprinkle of freckles across her nose",
  hairStyle:"very long, thick, flowing waves",hairLength:"very long",hairTexture:"thick and wavy",bangs:"middle part",hairMovement:"drifts slowly like seaweed in a current",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"sandy highlights through the sea-green",
  skinTone:"golden beige",undertone:"warm",skinFinish:"smooth, sun-warmed skin",markings:"no markings",bodyMarkings:"a sea turtle tattoo across her shoulder blade",
  makeupStyle:"minimal natural makeup",eyelinerStyle:"soft brown eyeliner",eyeshadowStyle:"soft sea-green eyeshadow",lashStyle:"natural lashes",blushStyle:"soft peach blush",lipFinish:"tinted lip balm",faceAccents:"soft glow highlight",nailStyle:"short rounded fingernails",nailColor:"@accent",
  heightStature:"tall stature",shoulderShape:"soft, broad shoulders",torsoShape:"long, soft torso",armShape:"soft arms",handShape:"slow, gentle hands",
  bustSize:"very large, heavy breasts",bustShape:"round, heavy shape",bustWeight:"soft, heavy fullness",waistShape:"soft waist",stomachShape:"soft stomach",
  hipShape:"wide, soft hips",buttSize:"full, round butt",thighBuild:"thick, soft thighs",legShape:"long, soft legs",bodySoftness:"tall, soft, voluptuous figure",
  posture:"sitting cross-legged with a book in her lap, completely at peace",
  nippleColor:"rosy brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"rosy brown",areolaType:"smooth",areolaSize:"large",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"a natural, neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} knee-high socks","@third"],eyewear:["round {c} reading glasses","@accent"],earAccessory:["shell drop earrings","@third"],tagCharm:["small turtle crest badge","@accent"]},
 blurb:"The Coil's sage: a tall, soft, voluptuous old soul with very long, thick sea-green waves highlighted with sand, calm warm-brown eyes behind round reading glasses, golden-beige skin and a patient smile. A teal hooded robe lined in seafoam over a cream vest and teal pleated skirt, sand knee socks and shell earrings."}
];

/* ---- v218: lore for wave 5, the Coil (same fields as girls210lore.js) */
const NEWLORE5={
cobra:{touch:"in warm lamplight glinting off gold and lapis",room:"a candlelit desert-palace bedroom",roomL:"a candlelit desert-palace bedroom with lapis tiles and gold-draped pillars",out:"a desert palace courtyard at dusk, lanterns and palms",
  g:{id:"sleek black chin-length bob with blunt bangs over a hidden turquoise underlayer, gold-beaded braids at the temples, kohl-lined gold eyes, golden bronze skin",fig:"tall, sinuous hourglass, medium-large breasts",col:"turquoise",
    out:"a desert palace courtyard at dusk, lanterns and palms",light:"warm lamplight, dusk",room:"a desert-palace bedroom with lapis tiles",bath:"a lapis-tiled sunken bath strewn with lotus petals"},
  fx:"drifting incense smoke, glinting gold",mot:"cobra",mot2:"hooded-cobra",tmot:"scale",emb:"rearing-cobra",pk:"an Arbok rearing up behind her, hood spread",
  words:[["emerald drapes","lapis-blue drapes"],["emerald velvet","black velvet"],["glowing green venom","glowing golden venom"],["glowing emerald absinthe","glowing golden absinthe"],["An emerald silk slip dress","A gold silk slip dress"],
    ["The empress of the Emerald Court","The empress of the Golden Sands"],["an emerald-and-silver throne room","a gold-and-lapis throne room"],["a long, emerald wyrm","a long, golden wyrm"],["Emerald satin","Gold satin"],["an emerald satin backdrop","a gold satin backdrop"],
    ["an emerald-tiled bathroom","a lapis-tiled bathroom"],["an emerald chaise","a gold chaise"],["emerald-silk bedchamber","gold-silk bedchamber"],["silver serpent-scale embroidery","gold cobra-scale embroidery"]],
  colors:[["emerald green","turquoise"],["Emerald green","Turquoise"],["emerald-green","turquoise"],["platinum-blonde","black"],["heather gray","ivory"]]},
viper:{touch:"in cold green light through tinted glass",room:"a sleek black-and-green loft",roomL:"a sleek black-and-green loft with a weapons rack and a terrarium wall",out:"a rain-slick rooftop at night, green neon below",
  g:{id:"waist-length black braid streaked acid green, long bangs over one eye, slit-pupiled lime-green eyes, pale ivory skin, a thin scar through the lower lip",fig:"lean, wiry, athletic, medium breasts",col:"lime green",
    out:"a rain-slick rooftop at night, green neon below",light:"cold green neon, night",room:"a black-and-green loft with a terrarium wall",bath:"a black slate rain shower behind green glass"},
  fx:"green neon reflections, rain",mot:"viper",mot2:"coiled-viper",tmot:"viper-scale",emb:"striking-viper",pk:"a Seviper coiled on the railing beside her",
  words:[["A kitsune costume","A viper costume"],["FOXFIRE♡","HISS♡"],["Kitsune Lantern","Viper Lantern"],["a nine-tailed fox","a coiled green viper"],["amber foxlike eyes","lime-green slitted eyes"],
    ["amber-gold flame-tail embroidery","silver scale embroidery"],["blue foxfire","green venom-fire"],["burnt-orange hair","black-and-green hair"],["crown of foxfire","crown of green venom-fire"],["fluffy fox ears","small silver scale hair clips"],
    ["fox ears","scale hair clips"],["fox mask","viper mask"],["fox tail","snake tail"],["fox tails and foxfire flames","coiled vipers and green venom-fire"],["fox-and-flame","viper-and-fang"],["fox-eared hooded onesie with a bushy tail","snake hooded onesie with a long tail"],
    ["fox-flame","viper"],["fox-like","snakelike"],["fox-tail embroidery","snake-scale embroidery"],["fox-tail pattern","scale pattern"],["fox-tail pocket","scale-print pocket"],["foxfire","venom-fire"],["foxlike eyes","slitted eyes"],
    ["kitsune","viper spirit"],["large bushy fox tail","long scaled snake tail"],["nine-tailed fire dragon","nine-headed venom hydra"],["sly, fox-like smirk","cold, snakelike smirk"],["stone foxes","stone serpents"],
    ["the fox shrine at the autumn festival","a moonlit temple garden at the autumn festival"]],
  colors:[["burnt orange","lime green"],["Burnt orange","Lime green"],["burnt-orange","lime-green"]]},
chameleon:{touch:"in soft daylight through a paint-smeared skylight",room:"an artist's attic studio",roomL:"an artist's attic studio splashed with paint, canvases on every wall",out:"a colorful street of painted murals",
  g:{id:"waist-length waves shifting from mint through teal to lavender with coral tips, soft side-swept bangs, big teal eyes, fair skin, a smudge of paint on one cheek",fig:"soft, curvy hourglass, large breasts",col:"mint green",
    out:"a street of colorful painted murals, afternoon light",light:"soft daylight, pastel light",room:"an attic studio splashed with paint",bath:"a claw-foot tub in a paint-splattered studio"},
  fx:"drifting paint splashes, shifting rainbow light",mot:"chameleon",mot2:"rainbow-scale",tmot:"paint-splash",emb:"curled-chameleon",pk:"a Kecleon blending into the wall beside her",
  words:[["Caw caw","Peekaboo"],["CAW CAW","PEEKABOO"],["CAW♡","PEEK♡"],["CAW..","PEEK.."],["CAW","PEEK"],["Caw","Peek"],["caw","peek"],["crow-feather fan","painted paper fan"],["platinum crow-feather embroidery","rainbow scale embroidery"],
    ["crow-feather brooch","chameleon brooch"],["crow-feather tattoo","chameleon tattoo"],["crow-feather","rainbow-scale"],["crow feathers and crescent moons","paint splashes and rainbows"],["crow feathers","paint splashes"],["swirl of black feathers","swirl of rainbow paint"],
    ["black feathers","rainbow paint"],["dark feathered wings","a curled chameleon tail"],["small feathered wings","small curled tail"],["feathered sleeves","paint-splashed sleeves"],["feather-charm ties","charm ties"],["feather-trimmed corset bodice","ombre-trimmed corset bodice"],
    ["feather-trimmed hips","ombre-trimmed hips"],["feather-trimmed sleeves","ombre-trimmed sleeves"],["ink-blue feather print","pastel scale print"],["feather-and-moon print","rainbow scale print"],["feather print","scale print"],["feather embroidery","scale embroidery"],
    ["feather lace","ombre lace"],["feather pattern","ombre pattern"],["feather-print pocket","paint-splash pocket"],["feather-trimmed shoulders","ombre-trimmed shoulders"],["feather-trimmed stage dress","ombre stage dress"],["feather-trim hem","ombre-trim hem"],
    ["small crow familiar perched on her shoulder with a shiny button in its beak","small chameleon familiar curled on her shoulder, changing color"],["black-feathered armor","iridescent scale armor"],["perches on","sits on"],["perches","sits"],["perched","clinging"],["Perched","Clinging"],
    ["giant nest woven from silver ribbon and twigs","giant pile of paint-splashed drop cloths"],["treasure-nest set","art-studio set"],["the giant nest","the pile of drop cloths"],["arms spread like wings among the crows","arms spread wide among her paintings"],
    ["a moonlit city rooftop crowded with crows","a moonlit rooftop covered in her murals"],["a flock of crows perched along the railings","a row of her canvases along the railings"],["among a flock of curious crows","among her half-finished canvases"],["among a flock of crows","among her canvases"],
    ["flock","crowd"],["where a wild crow perched every morning for six years","where a wild chameleon sunned itself every morning for six years"],["birds on branch","chameleon on branch"],["a silver feather","a paintbrush"],
    ["black feather mantle with a crow skull clasp","rainbow-scaled mantle with a paintbrush clasp"],["shaped like crow wings","shaped like curled tails"],["crow wings","curled tails"],["crows","chameleons"],["opal pendant","color-changing mood pendant"]],
  colors:[["ink blue","mint green"],["ink-blue","mint-green"],["Ink blue","Mint green"],["silvery white","lavender"],["silvery-white","lavender"],["dusty lavender","teal"],["dusty-lavender","teal"],["opal","mother-of-pearl"]]},
gecko:{touch:"in warm afternoon sun on a rooftop garden",room:"a tiny rooftop room",roomL:"a tiny rooftop room full of plants, reached only by climbing",out:"sun-warmed rooftops above the old town",
  g:{id:"sleek chin-length sunny-yellow bob tipped tangerine with a few dark spots, huge dark eyes, warm tan skin, dark freckles across the nose and cheeks",fig:"short, compact, athletic hourglass, medium breasts",col:"tangerine orange",
    out:"sun-warmed rooftops above the old town, potted plants",light:"warm afternoon sun",room:"a rooftop room full of plants",bath:"a sun-warmed rooftop tub among potted plants"},
  fx:"warm sun flare, drifting leaves",mot:"gecko",mot2:"gecko-and-sun",tmot:"gecko-spot",emb:"climbing-gecko",pk:"a Helioptile basking on the ledge beside her",
  words:[["Squeak squeak","Chirp chirp"],["SQUEAK♡","CHIRP♡"],["SQUEAK..","CHIRP.."],["squeaks","chirps"],["squeak","chirp"],["a stolen wedge of cheese","a stolen mango"],["wedge of cheese","ripe mango"],["cheese stalls","fruit stalls"],
    ["round mouse ears","little gecko-crest hair clips"],["long thin rat tail attached at the lower back","long striped gecko tail attached at the lower back"],["long thin rat tail","long striped gecko tail"],["rat ears","gecko-crest clips"],["rat-tail charms","gecko charms"],["rat-tail","gecko"],
    ["treasure-nest set","rooftop-garden set"],["giant nest woven from silver ribbon and twigs","giant hammock strung between rooftop plants"],["the giant nest","the rooftop hammock"],["rose quartz pendant","amber pendant"],["neon-lit city alley","sunny rooftop garden"],
    ["a row of rats watches from the branches","a row of little geckos watches from the wall"],["arms spread like wings among the rats","arms spread wide on the rooftop"],["a moonlit city rooftop crowded with rats","a moonlit rooftop garden"],
    ["a pack of rats crouched along the railings around her","a row of little geckos clinging to the railings around her"],["among a pack of rats","among a scatter of little geckos"],["rooftop rats","rooftop geckos"]],
  colors:[["ash gray","sunflower yellow"],["ash-gray","sunflower-yellow"],["Ash gray","Sunflower yellow"],["rose pink","tangerine orange"],["rose-pink","tangerine-orange"],["mustard yellow","cream"]]},
crocodile:{touch:"in warm golden light through bayou moss",room:"a stilted bayou house bedroom",roomL:"a stilted bayou house bedroom with a mosquito-net canopy bed",out:"a misty bayou at golden hour, cypress trees and moss",
  g:{id:"hip-length thick deep-green braid with bronze highlights, sleepy gold eyes, deep brown skin, a faint scar along the jaw",fig:"very tall, muscular, curvy amazon, very large breasts",col:"forest green",
    out:"a misty bayou at golden hour, cypress trees and hanging moss",light:"warm golden haze",room:"a bayou house bedroom with a mosquito-net canopy bed",bath:"a clawfoot tub on a screened bayou porch"},
  fx:"drifting mist, fireflies over the water",mot:"crocodile",mot2:"crocodile-and-reed",tmot:"croc-scale",emb:"crocodile",pk:"a Krookodile grinning in the reeds behind her",
  words:[["dragon rider","dragon rider"],["cozy dragon-scale hooded onesie with little horns and a tail","cozy crocodile hooded onesie with little teeth and a tail"],["dragon horns","crocodile-scale hair clips"],["dragon scales and claws","crocodile scales and teeth"],
    ["dragon-scale breastplate","crocodile-hide breastplate"],["dragon-scale pauldron","crocodile-hide pauldron"],["dragon-scale trim","croc-scale trim"],["gold dragon-scale embroidery","gold croc-scale embroidery"],["dragon-scale","croc-scale"],["dragon scale","croc-scale"],
    ["horn spikes","bronze spikes"],["large bat wings (costume)","long scaled crocodile tail (costume)"],["long scaled dragon tail","long scaled crocodile tail"],["plush spa headband with small horns","plush spa headband with little crocodile eyes"],
    ["red-draped tower","moss-draped bayou house"],["scaled hide shoulder wrap","crocodile-hide shoulder wrap"],["small curved horn headband","small crocodile-eye headband"],
    ["flame pattern","croc-scale pattern"],["flame hem","scale hem"],["flame-trim","scale-trim"],["flame-print","scale-print"],["flame sequins","bronze sequins"],["flame lace","scale lace"],["a stage engulfed in flames","a misty bayou stage strung with lanterns"],
    ["flame-edged greatsword","bronze-toothed greatsword"],["A fire elf","A swamp elf"],["flaming sword","bronze sword"],["blazing flame aura","misty swamp aura"],["A fire elemental","A swamp elemental"],
    ["a bikini of living flame clinging to her body","a bikini of living vines and moss clinging to her body"],["wisps of living flame barely covering her","wisps of moss barely covering her"],["a magical landscape swirling with living flame","a misty magical bayou"],
    ["flame-and-ember trail (no legs)","long scaled tail (no legs)"],["ember lines down the arms","scale patterns down the arms"],["ember-like","scale-like"],["infernal crimson","forest green"],["dragonlike fangs and claws","crocodile teeth and claws"],
    ["crest of a dragon breathing fire","crest of a crocodile in the reeds"],["an enormous crimson dragon breathing fire","an enormous swamp-green dragon"],["A crimson bodycon","A forest-green bodycon"],["Crimson palette","Swamp palette"],["Crimson cheer","Forest green cheer"],["crimson over-the-knee socks","forest green over-the-knee socks"]],
  colors:[["crimson red","forest green"],["Crimson red","Forest green"],["burgundy","bronze"],["Burgundy","Bronze"],["cheeks flushed crimson","cheeks flushed crimson"],["cheeks crimson","cheeks crimson"],["face is crimson","face is crimson"],
    ["regal crimson","regal green"],["crimson backdrop","forest-green backdrop"],["crimson silk","green silk"],["crimson rope","green rope"],["crimson battle crown","bronze battle crown"]]},
iguana:{touch:"in warm tropical sun through palm fronds",room:"a breezy beach-hut bedroom",roomL:"a breezy beach-hut bedroom with a hammock and a sun-warmed terrace",out:"a tropical beach of warm black rocks and palms",
  g:{id:"waist-length lime-green high ponytail in spiky crest-like layers fading to turquoise, short choppy bangs, half-lidded amber eyes, bronze skin, freckles across the nose",fig:"tall, voluptuous hourglass, large breasts",col:"turquoise",
    out:"a tropical beach of warm black rocks and palm trees",light:"bright tropical sun, warm haze",room:"a beach-hut bedroom with a hammock",bath:"an open-air shower under palm fronds"},
  fx:"tropical sun flare, palm shadows",mot:"iguana",mot2:"iguana-and-hibiscus",tmot:"hibiscus",emb:"basking-iguana",pk:"a Heliolisk basking on the rock beside her",
  words:[["frozen pink daiquiri","frozen lime daiquiri"],["pink cocktail with a paper umbrella","lime cocktail with a paper umbrella"],["pink cocktail","lime cocktail"],["a pink disco floor","a turquoise disco floor"],["glowing pink summoning circles","glowing green summoning circles"],
    ["a temple on a pink lagoon at sunset","a temple on a turquoise lagoon at sunset"],["The queen of the Pink Isles","The queen of the Emerald Isles"],["a pink coral palace by the lagoon","a turquoise coral palace by the lagoon"],["flamingo feathers","iguana scales"],
    ["a pink dragon with long legs","a lime-green dragon with a spiny crest"],["a pink lei","a hibiscus lei"],["pink-walled","turquoise-walled"],["Pink neon","Green neon"],["Pink shower","Turquoise shower"],["in a pink shower","in a turquoise-tiled shower"],["pink-tiled","turquoise-tiled"],
    ["a pink daybed","a turquoise daybed"],["balanced on one leg like a flamingo","basking lazily like an iguana"],["pink-lit lagoon","golden-lit lagoon"],["standing in lagoon shallows on one leg","lounging in the lagoon shallows"],["Pink swing","Hammock swing"],["pink swing","rope hammock swing"],
    ["pink sunset","golden sunset"],["a pink rooftop pool bar","a tropical rooftop pool bar"],["pink sky","golden sky"],["pink background","turquoise background"],["pink, neon","green, neon"],["pink, smile","green, smile"],
    ["a lagoon at sunset with flamingos wading","a lagoon at sunset with iguanas basking on the rocks"],["crown of pink feathers","crown of tropical flowers"],["feather boa","silk sarong"],["feathered corset bodysuit","scale-sequin corset bodysuit"],
    ["pink feather mantle","tropical flower mantle"],["pink villa","beach hut"],["pink feathers","tropical flowers"],["pink feather","tropical flower"],["flamingo-pink","lime-green"],["standing on one leg","stretched out lazily"],["balancing on one leg","lounging lazily"]],
  colors:[["hot pink","lime green"],["Hot pink","Lime green"],["hot-pink","lime-green"],["salmon","coral"]]},
axolotl:{touch:"in soft blue-pink light from glowing aquarium tanks",room:"a softly lit aquarium-lab bedroom",roomL:"a softly lit aquarium-lab bedroom with glowing tanks and pink fairy lights",out:"a misty lake at dawn, lily pads and reeds",
  g:{id:"waist-length pastel-pink waves with feathery hot-pink tufts flaring at the temples like axolotl gills, big dark eyes, very fair pearly skin, a beauty mark beneath the lip",fig:"soft, curvy hourglass, large breasts",col:"pastel pink",
    out:"a misty lake at dawn, lily pads and reeds",light:"soft dawn light, pastel mist",room:"an aquarium-lab bedroom with glowing tanks",bath:"a pink-tiled bathroom with a glowing aquarium wall"},
  fx:"floating bubbles, soft aquarium glow",mot:"axolotl",mot2:"smiling-axolotl",tmot:"bubble",emb:"axolotl",pk:"a Wooper smiling up at her from the water",
  words:[["Upstream", "Lily pond"],["Rose-gold waterfall", "Pink waterfall"],["leaping-salmon", "smiling-axolotl"],["salmon crest", "axolotl crest"],["fluffy salmon hooded onesie with a fin-trimmed hood", "fluffy axolotl hooded onesie with frilly gill tufts on the hood"],["salmon onesie", "axolotl onesie"],["salmon fins", "frilly gills"],["salmon scales", "pearly shimmer"],["while the salmon he taught her to love run upstream around her ankles", "while the axolotls he taught her to love drift through the shallows around her"],["while salmon run upstream around her ankles", "while axolotls drift through the shallows around her"],["as salmon leap upstream past her", "as bubbles rise past her"],["watches salmon leap upstream", "watches axolotls drift in the shallows"],["Swimming upstream was supposed to be her thing", "Smiling through anything was supposed to be her thing"],["UPSTREAM♡", "SMILE♡"],["It's spawning season♡", "It's mating season♡"],["during spawning season", "during mating season"],["scale accents", "pearl accents"],["scale-shimmer", "pearl-shimmer"],["scale sequins", "pearl sequins"],["scale-sequin", "pearl-sequin"],["scale embroidery", "bubble embroidery"],["scale-trim", "frill-trim"],["scale-knit", "bubble-knit"],["scale-print", "bubble-print"],["scale-panelled", "frill-panelled"],["fishtail hem", "frilly hem"],["mermaid-tail skirt with scale sequins", "frilly mermaid-tail skirt with pearl sequins"],["small fins", "small frilly gills"],["small {c2} fins", "small frilly {c2} gills"],["fin-trimmed hood", "frill-trimmed hood"],["fish-scale hide wrap", "pearly shimmer wrap"],["shaped like salmon scales", "shaped like little bubbles"],["crown of river reeds and silver scales", "crown of water lilies and pearls"],["Salmon cheer", "Pastel pink cheer"],["scaled armor bikini top", "pearl armor bikini top"]],
  colors:[["salmon pink", "pastel pink"],["salmon-pink", "pastel-pink"],["salmon", "pastel pink"],["rose-gold", "aqua"],["rose gold", "aqua"]]},
frog:{touch:"in green rain-forest light and drifting mist",room:"a fern-filled greenhouse bedroom",roomL:"a fern-filled greenhouse bedroom with a little karaoke stage",out:"a rain-forest pond at dusk, lily pads and glowing mist",
  g:{id:"hip-length cobalt-blue high ponytail streaked black and sunny yellow with blunt bangs, huge bright dark eyes, light brown skin, dark freckles across the cheeks",fig:"toned, curvy athletic build, medium-large breasts",col:"cobalt blue",
    out:"a rain-forest pond at dusk, lily pads and mist",light:"green rain-forest light, mist",room:"a fern-filled greenhouse bedroom",bath:"a rain-forest shower under hanging ferns"},
  fx:"drifting mist, rain drops, lily pads",mot:"frog",mot2:"lily-pad-and-frog",tmot:"lily-pad",emb:"leaping-frog",pk:"a Frogadier leaping beside her",
  words:[["mint hair bows", "yellow hair bows"],["a creamsicle feathered bikini top","a cobalt-blue spotted bikini top"],["a fluffy creamsicle lovebird onesie","a cozy cobalt-blue frog onesie with big eyes on the hood"],["mint feathered leg warmers","yellow-spotted leg warmers"],
    ["mint-green lovebird-and-feather embroidery","lily-pad and frog embroidery"],["mint ribbon choker","yellow ribbon choker"],["mint ribbon bows","yellow ribbon bows"],["mint ribbon","yellow ribbon"],["glass of peach iced tea","glass of lime iced tea"],["Creamsicle","Cobalt blue"],
    ["mint swim ring","lily-pad swim ring"],["mint collar and cuffs","yellow collar and cuffs"],["pair of fluffy {c} feathered wings","pair of sheer {c} fairy wings"],["A fluffy lovebird harpy","A frog fairy"],["big fluffy wings","sheer fairy wings"],
    ["feather hair clips","lily-pad hair clips"],["fluffy feathered bikini top","spotted bikini top"],["feathered leg warmers","spotted leg warmers"],["bright feather mantle","bright lily-pad capelet"],["feather filigree","lily-pad filigree"],
    ["a small, peach-colored dragon with heart-shaped scales","a small, cobalt-blue dragon with yellow spots"],["a mint garter","a yellow lace garter"],["peach-scented","rain-scented"],["at the twintails","in her ponytail"],["on her twintails","in her ponytail"],
    ["Hair is put up in fluffy buns","Hair is up in a bouncy ponytail"]],
  colors:[["creamsicle orange","cobalt blue"],["creamsicle-orange","cobalt-blue"],["creamsicle","cobalt blue"],["powder blue","sunflower yellow"],["soft peach","lime green"],["soft-peach","lime-green"]]},
turtle:{touch:"in slow golden light over a quiet beach",room:"a quiet beach-cottage bedroom",roomL:"a quiet beach-cottage bedroom full of shells and books",out:"a quiet beach at sunrise, sea turtles in the surf",
  g:{id:"very long thick sea-green waves highlighted with sand, a middle part, calm warm-brown eyes behind round reading glasses, golden beige skin, freckles across the nose",fig:"tall, soft, voluptuous, very large breasts",col:"seafoam green",
    out:"a quiet beach at sunrise, gentle surf",light:"slow golden sunrise light",room:"a beach-cottage bedroom full of shells and books",bath:"a deep stone soaking tub overlooking the beach"},
  fx:"slow sea foam, drifting sand",mot:"sea-turtle",mot2:"turtle-and-wave",tmot:"shell-pattern",emb:"sea-turtle",pk:"a Torterra resting peacefully behind her",
  words:[["An owl","A turtle"],["HOOT♡","SNOOZE♡"],["a plunging caramel feathered micro bodysuit","a plunging sea-green scale-sequin micro bodysuit"],["amber owl-feather embroidery","bronze shell-pattern embroidery"],["an owl harpy","a sea turtle girl"],["an owl","a turtle"],
    ["an owl tattoo spreading its wings across his back","a sea turtle tattoo across his back"],["crown of laurel and silver owl feathers","crown of seashells and sea glass"],["feathered ear-tuft headband","seashell headband"],["feathered harpy wings","patterned turtle shell"],
    ["feathered wings","turtle shell"],["feathery caramel-brown hair over an antique-ivory underlayer","wavy sea-green hair over a deep-teal underlayer"],["layered owl feathers","layered shell plates"],["micro feathered bodysuit","micro scale-sequin bodysuit"],
    ["outstretched owl feathers","outstretched flippers"],["owl feathers","shell plates"],["owl harpy","sea turtle girl"],["owl-feather embroidery","shell-pattern embroidery"],["small owl familiar perched on her shoulder","small baby sea turtle familiar cradled in her hands"],
    ["swooping down from a high ladder with her robe flaring like wings","climbing slowly down a high ladder, her robe trailing"],["tawny night dragon with owl-like feathers and huge amber eyes","green sea dragon with a turtle shell and huge calm eyes"],
    ["tawny night dragon with owl-like feathers","green sea dragon with a turtle shell"],["midnight espresso martini","sea-salt martini"],["Espresso brown","Seafoam green"],["black feather mantle","shell-plated mantle"],["feather filigree","shell filigree"]],
  colors:[["caramel brown","seafoam green"],["Caramel brown","Seafoam green"],["caramel-brown","seafoam-green"],["espresso brown","deep teal"],["espresso-brown","deep-teal"],["antique ivory","sand"],["antique-ivory","sand"]]}};

const NEWHEADS5={
cobra:{c:{age:"mature woman",faceShape:"elegant, angular face with high cheekbones",expression:"hypnotic, knowing smile",impression:"a regal, commanding grace",hairStyle:"sleek blunt bob",bangs:"blunt straight bangs",makeupStyle:"dramatic kohl glam makeup",bodySoftness:"tall, sinuous, mature hourglass figure"},
  blurb:"The Cobra headmistress: a tall, sinuous woman with a sleek black bob and gold-beaded braids, kohl-lined gold eyes, golden-bronze skin and a hypnotic, knowing smile."},
viper:{c:{age:"mature woman",faceShape:"sharp, narrow face",expression:"cold, appraising smirk",impression:"a quiet, dangerous poise",hairStyle:"sleek low chignon",bangs:"long side-swept bangs",makeupStyle:"sharp graphic makeup",bodySoftness:"lean, wiry, mature figure"},
  blurb:"The Viper headmistress: a lean, wiry woman with black hair streaked green in a sleek low chignon, slit-pupiled lime eyes, pale skin and a cold, appraising smirk."},
chameleon:{c:{age:"mature woman",faceShape:"soft heart-shaped face",expression:"gentle, knowing smile",impression:"a warm, artistic calm",hairStyle:"long layered waves",bangs:"side-swept bangs",makeupStyle:"soft pastel makeup",bodySoftness:"soft, curvy, mature figure"},
  blurb:"The Chameleon headmistress: a soft, curvy woman with long waves shifting from mint to lavender, teal eyes, fair skin and a gentle, knowing smile."},
gecko:{c:{age:"mature woman",faceShape:"round face with a pointed chin",expression:"cheeky, warm grin",impression:"a quick, sunny energy",hairStyle:"sleek bob",bangs:"wispy side bangs",makeupStyle:"fresh, sporty makeup",bodySoftness:"compact, athletic, mature figure"},
  blurb:"The Gecko headmistress: a compact, athletic woman with a sleek sunny-yellow bob, huge dark eyes, freckles, warm tan skin and a cheeky grin."},
crocodile:{c:{age:"mature woman",faceShape:"strong, broad face",expression:"lazy, knowing grin",impression:"a powerful, unhurried calm",hairStyle:"thick braided crown",bangs:"no bangs",makeupStyle:"bold glam makeup",bodySoftness:"very tall, muscular, mature figure"},
  blurb:"The Crocodile headmistress: a very tall, muscular woman with a thick deep-green braided crown, sleepy gold eyes, deep brown skin and a lazy, knowing grin."},
iguana:{c:{age:"mature woman",faceShape:"oval face with high cheekbones",expression:"lazy, amused smile",impression:"a relaxed, sun-warmed allure",hairStyle:"high ponytail",bangs:"short bangs",makeupStyle:"beachy bronzed makeup",bodySoftness:"tall, voluptuous, mature figure"},
  blurb:"The Iguana headmistress: a tall, voluptuous woman with a lime-green ponytail fading to turquoise, half-lidded amber eyes, bronze skin and a lazy, amused smile."},
axolotl:{c:{age:"mature woman",faceShape:"round, soft face",expression:"warm, beaming smile",impression:"a sweet, endlessly patient warmth",hairStyle:"long soft waves",bangs:"curtain bangs",makeupStyle:"soft pastel makeup",bodySoftness:"soft, curvy, mature figure"},
  blurb:"The Axolotl headmistress: a soft, curvy woman with long pastel-pink waves and hot-pink tufts at her temples, big dark eyes, pearly fair skin and a warm, beaming smile."},
frog:{c:{age:"mature woman",faceShape:"round face with a wide smile",expression:"big, warm laugh",impression:"a loud, bubbly warmth",hairStyle:"high ponytail",bangs:"blunt bangs",makeupStyle:"bright pop makeup",bodySoftness:"toned, curvy, mature figure"},
  blurb:"The Frog headmistress: a toned, curvy former opera singer with a cobalt-blue ponytail streaked yellow, bright dark eyes, light brown skin and a big, warm laugh."},
turtle:{c:{age:"mature woman",faceShape:"soft oval face",expression:"calm, patient smile",impression:"a deep, unhurried wisdom",hairStyle:"long braided crown",bangs:"middle part",makeupStyle:"minimal natural makeup",bodySoftness:"tall, soft, mature figure"},
  blurb:"The Turtle headmistress: a tall, soft woman with long sea-green hair in a braided crown, calm brown eyes behind reading glasses, golden-beige skin and a patient smile."}};

const NEWMEN5={
cobra:{c:{eyeOne:"gold",markings:"a cobra tattoo coiling across the chest and shoulder"},
  blurb:"The only man she will dance for: tall, cold and immaculate, with slicked-back black hair, piercing gold eyes, a knowing smirk and a cobra tattoo across his chest. A black suit and gold tie, a silk shirt open to the chest, or less."},
viper:{c:{eyeOne:"green",markings:"a viper tattoo on one forearm"},
  blurb:"Her partner in crime: a lean, charming cat burglar with a side-swept undercut, heavy-lidded green eyes, a van dyke beard, a single hoop earring and a viper tattoo on one forearm. Waistcoat and rolled sleeves, an open shirt, or nothing."},
chameleon:{c:{eyeOne:"warm brown",markings:"paint-stained forearms and a chameleon tattoo along one wrist"},
  blurb:"Her gallery owner: a tall, soft-spoken art restorer with dark curls, warm brown eyes, light stubble and paint-stained forearms, the only person she lets see her unfinished work. A shirt, waistcoat and loupe, a long coat and knit scarf, or nothing."},
gecko:{c:{eyeOne:"slate gray",markings:"a gecko-and-key tattoo along one forearm"},
  blurb:"Her climbing partner: a lean, wiry rope-access mechanic with an undercut, sly gray eyes, stubble, a roguish grin and a gecko-and-key tattoo, who belays her up every wall at Everspire. A grease-smudged tank top and tool belt, a battered leather jacket, or nothing."},
crocodile:{c:{eyeOne:"gold",markings:"a crocodile tattoo coiling down one arm"},
  blurb:"A man big enough for her: a huge, bronze-skinned bayou fisherman and brawler with a long black half-up braid, gold eyes, a short boxed beard and a crocodile tattoo down one arm. Leather and chains, battle armor, or bare."},
iguana:{c:{eyeOne:"dark brown",markings:"a hibiscus-and-wave tattoo across one shoulder"},
  blurb:"Her beach bum: a towering, golden-bronze surf instructor with loose black waves, calm dark eyes, light stubble and a hibiscus tattoo, who naps in the sun beside her for hours. An open white linen shirt and shell necklace, or swim trunks."},
axolotl:{c:{eyeOne:"warm brown",markings:"a little axolotl tattoo down one forearm"},
  blurb:"Her sushi chef: a tall, lean itamae with a jet-black textured crop under an indigo hachimaki, warm brown eyes, light stubble and a little axolotl tattoo down one forearm, who melts the second she smiles at him and saves her the first slice of every fish. A crisp white chef's coat and apron, an indigo haori over a black shirt, or nothing."},
frog:{c:{eyeOne:"warm brown",markings:"a music-note tattoo on one wrist"},
  blurb:"Her accompanist: a tall, broad-shouldered pianist with soft tousled waves, warm brown eyes, freckles, light stubble and a music-note tattoo, who plays every song she wants to sing. A cream cable-knit sweater, a henley with an apron, an open shirt, or nothing."},
turtle:{c:{eyeOne:"warm brown",markings:"a sea turtle tattoo spreading across his back"},
  blurb:"Her slow-and-steady love: a tall, gentle marine conservationist with tousled swept-back hair, warm brown eyes behind round glasses, a short neat beard and a sea turtle tattoo across his back, who has never once rushed her. A cardigan and henley, a long coat and scarf, or nothing."}};

const NEWSIG5={
cobra:["Desert Charmer","the queen of the desert dance","hypnotic, half-lidded smile","swaying in a slow, hypnotic dance with her arms raised over her head","a desert palace courtyard at dusk, lanterns and palms",
  {top:["{c} jeweled bra top with gold coins","@secondary"],bottom:["{c} sheer harem skirt with a high slit","@third"],belt:["{c} coin hip belt","@secondary"],headwear:["{c} cobra-head circlet","@secondary"],wristAccessory:["{c} coiled snake arm cuffs","@secondary"],legwear:["{c} ankle chains","@secondary"]}],
viper:["Green Fang","the deadliest fang in the Coil","cold, amused smirk","crouched on a rooftop ledge with twin daggers reversed in her hands","a rain-slick rooftop at night, green neon below",
  {top:["{c} high-collared sleeveless bodysuit","@primary"],outerwear:["cropped {c} hooded jacket","@secondary"],belt:["{c} dagger harness","@primary"],gloves:["{c} fingerless gloves","@primary"],legwear:["{c} thigh-high boots","@primary"],heldItem:["pair of curved daggers","-"]}],
chameleon:["Living Canvas","the Coil's girl of a thousand faces","shy, bashful smile","half-hidden behind an easel, peeking out with a paintbrush in her mouth","a sunny attic studio, canvases and paint everywhere",
  {top:["paint-splattered {c} cropped tank top","@primary"],bottom:["{c} denim overall shorts with one strap down","@third"],headwear:["{c} beret","@secondary"],heldItem:["paint palette and brush","-"],legwear:["{c} mismatched knee socks","@accent"]}],
gecko:["Wall Runner","the best climber in the Coil","cheeky, wide smile","clinging to a sunny wall with one hand, grinning down over her shoulder","sun-warmed rooftops above the old town",
  {top:["{c} cropped racer-back tank top","@primary"],bottom:["{c} climbing shorts","@secondary"],belt:["{c} chalk-bag belt","@accent"],gloves:["{c} fingerless climbing gloves","@secondary"],legwear:["{c} climbing shoes","@accent"]}],
crocodile:["Bayou Queen","the queen of the swamp","lazy, toothy grin","lounging on a mossy cypress log with one boot dangling in the water","a misty bayou at golden hour, cypress trees and moss",
  {top:["{c} leather bustier with bronze buckles","@primary"],bottom:["{c} ripped cutoff shorts","@third"],outerwear:["{c} crocodile-hide vest","@secondary"],neckAccessory:["gold tooth necklace","-"],legwear:["{c} knee-high boots","@extra"]}],
iguana:["Sun Worshipper","the laziest sunbather in the Coil","lazy, contented smile","stretched out on a warm black rock with her eyes half closed","a tropical beach of warm black rocks and palms",
  {top:["{c} string bikini top","@primary"],bottom:["{c} string bikini bottoms","@primary"],outerwear:["sheer {c} sarong","@secondary"],eyewear:["{c} sunglasses","@third"],neckAccessory:["hibiscus flower lei","-"]}],
axolotl:["Smile Forever","the sweetest smile in the Coil","wide, happy smile","waving with both hands in a cloud of bubbles","a misty lake at dawn, lily pads and reeds",
  {top:["frilly {c} off-shoulder swim top","@primary"],bottom:["frilly {c} swim skirt","@secondary"],headwear:["{c} frilly gill-tuft headband","@secondary"],legwear:["{c} sheer stockings","@third"],neckAccessory:["pearl choker","-"]}],
frog:["Lily Pad Diva","the loudest voice in the Coil","big, open-mouthed laugh","mid-hop on a lily-pad stage with a microphone raised","a rain-forest pond stage at dusk, lily pads and glowing mist",
  {top:["{c} sequined halter top with {c2} spots","@primary",null,"@third"],bottom:["{c} sequined mini skirt","@secondary"],gloves:["{c} short satin gloves","@third"],heldItem:["sparkly microphone","-"],legwear:["{c} glossy knee-high boots","@primary"]}],
turtle:["Old Soul","the oldest soul in the Coil","calm, patient smile","sitting cross-legged on the sand with a book in her lap","a quiet beach at sunrise, gentle surf",
  {top:["{c} loose knit sweater slipping off one shoulder","@primary"],bottom:["{c} linen wrap skirt","@secondary"],eyewear:["round {c} reading glasses","@accent"],heldItem:["old leather-bound book","-"],neckAccessory:["{c} shell necklace","@third"]}]};

/* ---- v218: wave 5 of the house pass, the Coil (tail block, right after girls217.js) */
if(typeof NEWGIRLS5!=="undefined"&&typeof ACAD_WAVE==="function")ACAD_WAVE(NEWGIRLS5,NEWLORE5,NEWHEADS5,NEWMEN5,NEWSIG5,"218",null,ACAD.WAVE_ONLY);

/* ---- v219: wave 6 of the house pass. The Pack grows to ten: Hyena (Rat's stories), Jackal (Raven's), Husky (Penguin's),
   Dingo (Shark's), Fennec (Fox's), Shiba (Badger's). Only the look sets and the kept scene sets are re-cut for them. */
const NEWGIRLS6=[
{k:"hyena",sis:"rat",pal:{primary:"sandy tan",secondary:"dark brown",third:"cream",accent:"amber",extra:"black"},
 man:{primary:"black",secondary:"sandy tan",third:"cream",accent:"amber",extra:"dark brown"},
 room:"a graffiti-covered warehouse loft with a punching bag and a ratty old couch she loves",pride:"the loudest laugh in the Pack",pet:"Giggles",
 bath:"a big tiled shower in a converted warehouse",role:"the laughing one",acc:"warm sunset light through warehouse windows",
 c:{age:"young woman",faceShape:"strong, wide face with high cheekbones and a big grin",eyeConfig:"matching",eyeShape:"bright, mischievous almond eyes",pupilStyle:"round pupils",irisDetail:"amber irises with dark flecks",
  lashNatural:"thick, dark eyelashes",eyeOne:"amber",browShape:"bold, expressive brows",noseShape:"broad, straight nose",mouthShape:"wide, laughing mouth",
  expression:"wild, cackling laugh",impression:"a loud, scrappy, irresistible energy",faceMark:"a scatter of dark spot freckles along her cheekbones",
  hairStyle:"short undercut with a long swept top",hairLength:"short",hairTexture:"thick and sleek",bangs:"long swept fringe",hairMovement:"flops across her forehead when she laughs",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@extra",hairBlend:"dark brown spots and a black shaved underside under the sandy top",
  skinTone:"warm brown",undertone:"warm",skinFinish:"smooth, glowing skin",markings:"no markings",bodyMarkings:"a laughing hyena tattoo across her shoulder blade",
  makeupStyle:"bold punk makeup",eyelinerStyle:"smudged black eyeliner",eyeshadowStyle:"bronze shimmer eyeshadow",lashStyle:"full lashes",blushStyle:"warm bronze blush",lipFinish:"glossy dark plum lips",faceAccents:"golden highlight",nailStyle:"short square fingernails",nailColor:"@extra",
  heightStature:"tall stature",shoulderShape:"broad, athletic shoulders",torsoShape:"strong, toned torso",armShape:"strong, toned arms",handShape:"strong, scrappy hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"firm, heavy fullness",waistShape:"defined waist",stomachShape:"toned stomach with faint abs",
  hipShape:"strong, curvy hips",buttSize:"round, muscular butt",thighBuild:"thick, strong thighs",legShape:"long, powerful legs",bodySoftness:"tall, strong, curvy athletic build",
  posture:"doubled over laughing with one hand slapping her knee",
  nippleColor:"dark brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"dark brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"dark pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@primary",null,"@secondary"],
  legwear:["{c} ripped fishnet stockings","@extra"],earAccessory:["silver hoop earrings up one ear","@extra"],tagCharm:["small hyena crest badge","@accent"]},
 blurb:"The Pack's loudest laugh: a tall, strong, curvy brawler with a sandy undercut swept long on top and spotted dark brown, mischievous amber eyes, warm brown skin and a wild cackle. A black hooded robe lined in sand over a cream vest and brown pleated skirt, ripped fishnets and a row of silver hoops."},

{k:"jackal",sis:"raven",pal:{primary:"black",secondary:"gold",third:"sandstone",accent:"deep burgundy",extra:"ivory"},
 man:{primary:"black",secondary:"sandstone",third:"gold",accent:"deep burgundy",extra:"ivory"},
 room:"a candlelit study lined with scrolls and old maps, a jackal statue by the door",pride:"the Pack's silent guardian",pet:"Anubis",
 bath:"a dark stone bath lit by oil lamps",role:"the guardian",acc:"flickering oil-lamp light over old scrolls",
 c:{age:"young woman",faceShape:"long, elegant face with high cheekbones and a narrow chin",eyeConfig:"matching",eyeShape:"long, narrow, upturned eyes",pupilStyle:"round pupils",irisDetail:"molten gold irises with dark rims",
  lashNatural:"long, dark eyelashes",eyeOne:"gold",browShape:"straight, serious brows",noseShape:"long, straight nose",mouthShape:"composed, full lips",
  expression:"calm, unreadable gaze",impression:"a solemn, watchful mystique",faceMark:"a thin gold piercing through one eyebrow",
  hairStyle:"very long sleek straight hair in a high ponytail bound with gold cuffs",hairLength:"hip-length",hairTexture:"sleek, silky straight",bangs:"center part",hairMovement:"falls in a straight black line down her back",
  hairBase:"@primary",hairUnderlayer:"@primary",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"gold-tipped ends and gold cuffs down the ponytail",
  skinTone:"rich brown",undertone:"warm",skinFinish:"smooth, luminous skin",markings:"no markings",bodyMarkings:"an eye-of-the-guardian tattoo between her shoulder blades",
  makeupStyle:"dramatic gold-and-kohl makeup",eyelinerStyle:"long kohl wings",eyeshadowStyle:"gold leaf eyeshadow",lashStyle:"dramatic lashes",blushStyle:"barely-there blush",lipFinish:"matte burgundy lips",faceAccents:"gold highlight on the brow bone",nailStyle:"long almond fingernails",nailColor:"@secondary",
  heightStature:"tall stature",shoulderShape:"straight, slender shoulders",torsoShape:"long, slim torso",armShape:"long, slender arms",handShape:"long, elegant fingers",
  bustSize:"small-to-medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"slim waist",stomachShape:"flat, toned stomach",
  hipShape:"slim, elegant hips",buttSize:"small, firm butt",thighBuild:"slender thighs",legShape:"very long, slender legs",bodySoftness:"tall, slender, long-legged build",
  posture:"standing very still with a lantern raised, watching the dark",
  nippleColor:"dark brown",nippleType:"small and perky",nippleLength:"short",areolaColor:"dark brown",areolaType:"smooth",areolaSize:"small",vaginaColor:"dark pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["sheer {c} stockings","@primary"],earAccessory:["long gold ear cuffs","@secondary"],tagCharm:["small jackal crest badge","@secondary"]},
 blurb:"The Pack's silent guardian: a tall, slender, solemn scholar with hip-length straight black hair bound in gold cuffs, molten gold eyes lined in kohl, rich brown skin and a calm, unreadable gaze. A black hooded robe lined in gold over a sandstone vest and black pleated skirt, sheer stockings and long gold ear cuffs."},

{k:"husky",sis:"penguin",pal:{primary:"silver gray",secondary:"white",third:"ice blue",accent:"charcoal gray",extra:"black"},
 man:{primary:"charcoal gray",secondary:"ice blue",third:"white",accent:"silver",extra:"black"},
 room:"a snowed-in cabin bedroom with a sled on the wall and a pile of blankets",pride:"the fastest runner in the snow",pet:"Snowball",
 bath:"an outdoor hot tub steaming in the snow",role:"the runner",acc:"bright snowlight through frosted windows",
 c:{age:"young woman",faceShape:"bright, heart-shaped face with a pointed chin",eyeConfig:"heterochromatic",eyeShape:"large, bright, almond eyes",pupilStyle:"round pupils",irisDetail:"striking pale irises",
  lashNatural:"long, pale eyelashes",eyeOne:"ice blue",eyeTwo:"warm brown",browShape:"expressive, arched brows",noseShape:"small, straight nose",mouthShape:"wide, grinning mouth",
  expression:"huge, excited grin",impression:"a bright, tireless, dramatic energy",faceMark:"a dusting of freckles across her nose",
  hairStyle:"long, thick high ponytail",hairLength:"waist-length",hairTexture:"thick, silky and straight",bangs:"side-swept bangs",hairMovement:"swishes wildly when she runs",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@secondary",hairHighlights:"@extra",hairBlend:"silver-gray on top fading to snow white underneath, with a dark gray streak at the part",
  skinTone:"fair",undertone:"cool",skinFinish:"smooth skin with cold-flushed cheeks",markings:"no markings",bodyMarkings:"a paw-print tattoo on her hip",
  makeupStyle:"fresh, sporty makeup",eyelinerStyle:"thin dark eyeliner",eyeshadowStyle:"icy silver shimmer eyeshadow",lashStyle:"lifted lashes",blushStyle:"cold-flushed rosy blush",lipFinish:"tinted lip balm",faceAccents:"icy highlight",nailStyle:"short rounded fingernails",nailColor:"@third",
  heightStature:"average height",shoulderShape:"athletic shoulders",torsoShape:"toned torso",armShape:"toned arms",handShape:"quick hands",
  bustSize:"large, perky breasts",bustShape:"round, perky shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy hips",buttSize:"round, firm, athletic butt",thighBuild:"strong, toned thighs",legShape:"strong, athletic legs",bodySoftness:"athletic, curvy hourglass build",
  posture:"bounding forward mid-run through the snow, ponytail flying",
  nippleColor:"pink",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@accent"],outerwear:["long {c} hooded robe with {c2} faux-fur lining","@extra",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} thigh-high socks with {c2} stripes","@extra",null,"@third"],earAccessory:["silver paw-print stud earrings","@primary"],tagCharm:["small husky crest badge","@third"]},
 blurb:"The Pack's runner: a bright, tireless, dramatic snow dog with a waist-length silver ponytail fading to white underneath, one ice-blue eye and one brown, fair cold-flushed skin and a huge grin. A black hooded robe lined in white faux fur over a white vest and charcoal pleated skirt, striped socks and silver paw earrings."},

{k:"dingo",sis:"shark",pal:{primary:"ginger",secondary:"sandstone",third:"cream",accent:"turquoise",extra:"rust orange"},
 man:{primary:"sandstone",secondary:"rust orange",third:"cream",accent:"turquoise",extra:"charcoal gray"},
 room:"a sun-bleached outback cabin room with a swag on the floor and the door always open",pride:"the wildest girl in the Pack",pet:"Red",
 bath:"an outdoor bush shower under a gum tree",role:"the wild one",acc:"red-gold outback sunset light",
 c:{age:"young woman",faceShape:"sun-kissed oval face with high cheekbones",eyeConfig:"matching",eyeShape:"narrow, amber, faraway eyes",pupilStyle:"round pupils",irisDetail:"amber irises with gold flecks",
  lashNatural:"light, sun-bleached eyelashes",eyeOne:"amber",browShape:"straight, sun-bleached brows",noseShape:"small, freckled nose",mouthShape:"wide, easy smile",
  expression:"free, crooked grin",impression:"a wild, restless, sun-soaked freedom",faceMark:"dense freckles across her nose and cheeks",
  hairStyle:"long, loose, sun-bleached waves",hairLength:"waist-length",hairTexture:"thick and wavy",bangs:"no bangs",hairMovement:"blows wild in the hot wind",
  hairBase:"@primary",hairUnderlayer:"@extra",hairInner:"@primary",hairHighlights:"@third",hairBlend:"sun-bleached cream tips on ginger-gold waves",
  skinTone:"light tan",undertone:"warm",skinFinish:"sun-kissed, freckled skin",markings:"freckles across her shoulders and arms",bodyMarkings:"a Southern Cross tattoo on her ribs",
  makeupStyle:"bare, sun-kissed makeup",eyelinerStyle:"no eyeliner",eyeshadowStyle:"bronze shimmer eyeshadow",lashStyle:"natural lashes",blushStyle:"sunburnt flush",lipFinish:"tinted lip balm",faceAccents:"sun-kissed highlight",nailStyle:"short natural fingernails",nailColor:"@third",
  heightStature:"tall stature",shoulderShape:"lean, strong shoulders",torsoShape:"lean torso",armShape:"lean, strong arms",handShape:"weathered, capable hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"slim waist",stomachShape:"flat, toned stomach",
  hipShape:"slim, curvy hips",buttSize:"small, firm butt",thighBuild:"lean, toned thighs",legShape:"long, lean legs",bodySoftness:"tall, lean, rangy build",
  posture:"standing barefoot on a red rock, shading her eyes against the sun",
  nippleColor:"light pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"a natural, neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@third"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} lace-up boots","@secondary"],earAccessory:["turquoise stud earrings","@accent"],tagCharm:["small dingo crest badge","@accent"]},
 blurb:"The Pack's wild one: a tall, rangy free spirit with waist-length sun-bleached ginger waves, faraway amber eyes, dense freckles, light-tan skin and a crooked grin. A rust hooded robe lined in ginger over a cream vest and sandstone pleated skirt, lace-up boots and turquoise studs."},

{k:"fennec",sis:"fox",pal:{primary:"cream",secondary:"sandy tan",third:"terracotta",accent:"gold",extra:"black"},
 man:{primary:"black",secondary:"terracotta",third:"cream",accent:"gold",extra:"sandy tan"},
 room:"a desert-night studio full of synthesizers, cushions and string lights",pride:"the sharpest ears in the Pack",pet:"Sandy",
 bath:"a tiled desert bathhouse lit by brass lanterns",role:"the listener",acc:"warm brass-lantern light on a desert night",
 c:{age:"young woman",faceShape:"small, sharp heart-shaped face",eyeConfig:"matching",eyeShape:"large, dark, upturned eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with gold flecks",
  lashNatural:"long, dark eyelashes",eyeOne:"dark brown",browShape:"high, arched brows",noseShape:"small, pointed nose",mouthShape:"small, sly smile",
  expression:"sly, knowing smile",impression:"a sharp, sly, nocturnal charm",faceMark:"a beauty mark beside her eye",
  hairStyle:"long waves with two swept-up side loops",hairLength:"hip-length",hairTexture:"soft and voluminous",bangs:"wispy bangs",hairMovement:"the two swept-up loops stand up like big ears",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"cream-blonde with sandy tan underneath and terracotta tips",
  skinTone:"golden beige",undertone:"warm",skinFinish:"smooth, glowing skin",markings:"no markings",bodyMarkings:"a small sound-wave tattoo behind her ear",
  makeupStyle:"sultry desert glam makeup",eyelinerStyle:"winged black eyeliner",eyeshadowStyle:"terracotta and gold eyeshadow",lashStyle:"fluttery lashes",blushStyle:"warm terracotta blush",lipFinish:"glossy nude lips",faceAccents:"golden highlight",nailStyle:"medium almond fingernails",nailColor:"@accent",
  heightStature:"short stature",shoulderShape:"narrow, soft shoulders",torsoShape:"slim, curvy torso",armShape:"slim arms",handShape:"quick, delicate hands",
  bustSize:"medium-large, full breasts",bustShape:"round, perky shape",bustWeight:"soft fullness",waistShape:"tiny waist",stomachShape:"flat stomach",
  hipShape:"curvy hips",buttSize:"round, perky butt",thighBuild:"soft thighs",legShape:"shapely legs",bodySoftness:"short, curvy hourglass figure",
  posture:"leaning in with one hand cupped to her ear, listening",
  nippleColor:"caramel pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"caramel pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@third"],outerwear:["long {c} hooded robe with {c2} lining","@extra",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} thigh-high socks","@secondary"],headwear:["oversized {c} headphones around her neck","@extra"],earAccessory:["gold crescent earrings","@accent"],tagCharm:["small fennec crest badge","@accent"]},
 blurb:"The Pack's sharpest ears: a short, curvy, sly DJ with hip-length cream-blonde waves swept into two big ear-like loops, terracotta tips, big dark eyes, golden-beige skin and oversized headphones always around her neck. A black hooded robe lined in cream over a cream vest and terracotta pleated skirt, sandy socks and gold crescent earrings."},

{k:"shiba",sis:"badger",pal:{primary:"honey orange",secondary:"cream",third:"chocolate brown",accent:"red",extra:"white"},
 man:{primary:"chocolate brown",secondary:"cream",third:"honey orange",accent:"red",extra:"charcoal gray"},
 room:"a cozy tatami bedroom above a little ramen shop, a futon and a mountain of cushions",pride:"the most stubborn girl in the Pack",pet:"Mochi",
 bath:"a wooden soaking tub in a little bathhouse behind the ramen shop",role:"the stubborn one",acc:"warm paper-lantern light from the ramen shop below",
 c:{age:"young woman",faceShape:"round, soft face with full cheeks",eyeConfig:"matching",eyeShape:"almond-shaped, smiling eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with warm highlights",
  lashNatural:"long, dark eyelashes",eyeOne:"dark brown",browShape:"short, expressive brows",noseShape:"small, upturned nose",mouthShape:"wide, smug smile",
  expression:"smug, satisfied smile",impression:"a cheerful, stubborn, cuddly confidence",faceMark:"cream-colored highlights on her cheeks like a shiba's markings",
  hairStyle:"long, thick high ponytail with a big curled end",hairLength:"hip-length",hairTexture:"thick and glossy",bangs:"blunt bangs",hairMovement:"the curled ponytail bounces like a happy tail",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"honey-orange on top with a cream underlayer",
  skinTone:"peachy fair",undertone:"warm",skinFinish:"soft, rosy skin",markings:"no markings",bodyMarkings:"a curled-tail tattoo on her ankle",
  makeupStyle:"soft, rosy makeup",eyelinerStyle:"thin brown eyeliner",eyeshadowStyle:"warm orange shimmer eyeshadow",lashStyle:"curled lashes",blushStyle:"rosy round blush",lipFinish:"glossy red lips",faceAccents:"soft cheek highlight",nailStyle:"short rounded fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"soft shoulders",torsoShape:"soft, curvy torso",armShape:"soft arms",handShape:"small, soft hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"soft fullness",waistShape:"narrow waist",stomachShape:"soft stomach",
  hipShape:"wide, curvy hips",buttSize:"round, soft butt",thighBuild:"soft, thick thighs",legShape:"soft, shapely legs",bodySoftness:"soft, curvy hourglass figure",
  posture:"sitting stubbornly with her arms crossed and her nose in the air",
  nippleColor:"pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@third",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["{c} thigh-high socks","@extra"],earAccessory:["little red bell earrings","@accent"],tagCharm:["small shiba crest badge","@accent"]},
 blurb:"The Pack's most stubborn member: a soft, curvy, cheerful girl with a hip-length honey-orange ponytail curled at the end over a cream underlayer, smiling dark eyes, peachy fair skin and a smug grin. A chocolate hooded robe lined in orange over a cream vest and orange pleated skirt, white socks and little red bell earrings."}
];

/* ---- v219: lore for wave 6, the Pack (same fields as girls210lore.js) */
const NEWLORE6={
hyena:{touch:"in warm sunset light through warehouse windows",room:"a graffiti-covered warehouse loft",roomL:"a graffiti-covered warehouse loft with a punching bag and an old couch",out:"a graffiti-covered scrapyard at sunset",
  g:{id:"short sandy undercut swept long on top with dark brown spots and a black shaved underside, mischievous amber eyes, warm brown skin, spot freckles along the cheekbones",fig:"tall, strong, curvy athletic build, large breasts",col:"sandy tan",
    out:"a graffiti-covered scrapyard at sunset",light:"warm sunset light, dust",room:"a graffiti-covered warehouse loft",bath:"a big tiled shower in a warehouse"},
  fx:"dust and sparks, sunset haze",mot:"hyena",mot2:"laughing-hyena",tmot:"hyena-spot",emb:"laughing-hyena",pk:"a Mightyena grinning at her side",
  words:[["a long thin tail","a short bushy spotted tail"],["Squeak squeak","Hee hee hee"],["SQUEAK♡","CACKLE♡"],["SQUEAK..","HEE HEE.."],["squeaks","cackles"],["squeak","cackle"],["a stolen wedge of cheese","a stolen rack of ribs"],["wedge of cheese","rack of ribs"],["cheese stalls","barbecue stalls"],
    ["round mouse ears","round spotted hyena-ear headband"],["long thin rat tail attached at the lower back","short bushy spotted tail attached at the lower back"],["long thin rat tail","short bushy spotted tail"],["rat ears","hyena ears"],["rat-tail charms","bone charms"],["rat-tail","bone"],
    ["treasure-nest set","scrapyard set"],["giant nest woven from silver ribbon and twigs","giant pile of salvaged tires and blankets"],["the giant nest","the pile of salvaged tires"],["rose quartz pendant","bone pendant"],["neon-lit city alley","graffiti-covered warehouse alley"],
    ["a row of rats watches from the branches","a clan of hyenas watches from the shadows"],["arms spread like wings among the rats","arms spread wide among her laughing clan"],["a moonlit city rooftop crowded with rats","a moonlit scrapyard"],
    ["a pack of rats crouched along the railings around her","a clan of hyenas cackling along the fence around her"],["among a pack of rats","among a cackling clan of hyenas"],["rooftop rats","scrapyard clan"]],
  colors:[["ash gray","sandy tan"],["ash-gray","sandy-tan"],["Ash gray","Sandy tan"],["rose pink","amber"],["rose-pink","amber"],["mustard yellow","cream"]]},
jackal:{touch:"in flickering oil-lamp light over old scrolls",room:"a candlelit study lined with scrolls",roomL:"a candlelit study lined with scrolls and old maps",out:"a desert necropolis under the stars",
  g:{id:"hip-length sleek straight black hair in a high ponytail bound with gold cuffs, molten gold eyes lined in kohl, rich brown skin, a gold eyebrow piercing",fig:"tall, slender, long-legged, small-to-medium breasts",col:"gold",
    out:"a desert necropolis at night under a sky full of stars",light:"oil-lamp light, starlight",room:"a candlelit study lined with scrolls",bath:"a dark stone bath lit by oil lamps"},
  fx:"drifting sand, lamp smoke",mot:"jackal",mot2:"jackal-and-eye",tmot:"hieroglyph",emb:"jackal-head",pk:"a Lucario standing guard beside her",
  words:[["outstretched raven feathers","outstretched gold-trimmed robes"],["layered raven feathers","layered gold-and-black linen"],["raven feathers","gold-and-black linen"],["raven-feather","jackal"],["bronze star-and-feather embroidery","gold hieroglyph embroidery"],
    ["Two black birds over a chessboard","Two rivals over a chessboard"],["crescent-moon brooch","gold eye brooch"],["crescent-moon emblem","jackal-head emblem"],["star print","hieroglyph print"]],
  colors:[["midnight blue","black"],["midnight-blue","black"],["Midnight blue","Black"],["navy blue","sandstone"],["storm blue","gold"],["Storm blue","Gold"],["storm-blue","gold"]]},
husky:{touch:"with bright snowlight through frosted windows",room:"a snowed-in cabin bedroom",roomL:"a snowed-in cabin bedroom with a sled on the wall",out:"a snowy forest trail, sled tracks in fresh powder",
  g:{id:"waist-length silver-gray high ponytail fading to snow white underneath, heterochromia, one ice-blue eye and one warm brown eye, fair skin with cold-flushed cheeks, freckles",fig:"athletic, curvy hourglass, large breasts",col:"ice blue",
    out:"a snowy forest trail, sled tracks in fresh powder",light:"bright snowlight, crisp winter sun",room:"a snowed-in cabin bedroom",bath:"an outdoor hot tub steaming in the snow"},
  fx:"flying snow, frosty breath",mot:"paw-print",mot2:"husky-and-snowflake",tmot:"snowflake",emb:"howling-husky",pk:"a Manectric bounding through the snow beside her",
  words:[["an Antarctic research base","an Arctic research base"],["snowy Antarctic mountains","snowy Arctic mountains"],["Antarctic","Arctic"],["with a white belly and a flipper-trimmed hood","with a white belly and a fur-trimmed hood with husky ears"],["tuxedo-style lapel trim","faux-fur lapel trim"],["tuxedo-style gown","silver faux-fur gown"],["tuxedo-front bunny leotard","silver faux-fur bunny leotard"],
    ["tuxedo-style stage leotard","silver faux-fur stage leotard"],["tiny orange knitted baby hat with little penguin eyes and a beak","tiny blue knitted baby hat with little husky ears"],["little penguins waddle","little husky pups tumble"],["chunky orange knit scarf","chunky ice-blue knit scarf"],
    ["orange knit scarf","ice-blue knit scarf"],["orange scarf","ice-blue scarf"],["orange towel","ice-blue towel"],["orange satin ribbon","ice-blue satin ribbon"],["long black hair","long silver hair"],["her black hair","her silver hair"],["straight black hair","thick silver hair"],["glossy black hair","thick silver hair"]],
  colors:[["pale yellow","silver gray"]]},
dingo:{touch:"in red-gold outback sunset light",room:"a sun-bleached outback cabin room",roomL:"a sun-bleached outback cabin room with a swag on the floor",out:"red outback dunes at sunset",
  g:{id:"waist-length loose sun-bleached ginger waves with cream tips, faraway amber eyes, light tan skin, dense freckles across the nose and cheeks",fig:"tall, lean, rangy, medium breasts",col:"rust orange",
    out:"red outback dunes at sunset, a lone gum tree",light:"red-gold sunset light, heat haze",room:"a sun-bleached outback cabin room",bath:"an outdoor bush shower under a gum tree"},
  fx:"red dust, heat shimmer",mot:"dingo",mot2:"sun-and-dune",tmot:"dingo-paw",emb:"howling-dingo",pk:"a Boltund racing across the dunes beside her",
  words:[["an underwater coral reef with sunbeams and bubbles","a red-rock gorge waterhole with sunbeams and dragonflies"],["A sea elf","A desert elf"],["coral spear","hunting spear"],["an underwater temple of coral and pearls","an ancient red-rock temple under the outback stars"],["a coral palace beneath the waves","a sandstone palace in the red desert"],["An ocean elemental","A dust-storm elemental"],["a bikini of churning seawater","a bikini of swirling red dust"],["an alien ocean world with bioluminescent tide pools","an alien red desert world with glowing crystal dunes"],["sharp-toothed grin","fanged grin"],["sharp teeth","fang"],["a flared fin-shaped train","a flared fringed train"],["shark-fin hooded sweatshirt","dingo-eared hooded sweatshirt"],["shark-fin hood","dingo-eared hood"],["hooded onesie with a fin","hooded onesie with ears and a bushy tail"],["plush spa headband with a shark fin","plush spa headband with little dingo ears"],
    ["shark tail fin","bushy ginger tail"],["fin-like ears","pointed ears"],["wave hem","sunburst hem"],["wave-trim hem","sunburst-trim hem"],["wave lace","sunburst lace"],["blue ocean margarita","outback sunset cocktail"],["A coral cutout dress","A rust cutout dress"],
    ["pearl-and-coral hair crown","turquoise-and-gold hair crown"],["coral and pearl crown","turquoise and gold crown"],["shark fins and cresting waves","dingoes and red dunes"],["shark skin stockings","ginger stockings"],["shark teeth","fangs"],
    ["shark tooth earrings","dingo tooth earrings"],["shark-tooth clasp","dingo-tooth clasp"],["shark-tooth necklace","dingo-tooth necklace"],["shark-tooth pendant","dingo-tooth pendant"],["sharkskin shoulder wrap","suede shoulder wrap"],["tooth-trimmed hood","fur-trimmed hood"],
    ["wave-and-fin","sun-and-dune"],["sharks and rays","sharks and rays"],["passing shark","passing shark"],["sharks","sharks"],["shark tank","shark tank"]],
  colors:[["steel blue","ginger"],["Steel blue","Ginger"],["steel-blue","ginger"],["coral red","rust orange"],["coral-red","rust-orange"]]},
fennec:{touch:"in warm brass-lantern light on a desert night",room:"a desert-night music studio",roomL:"a desert-night music studio full of synthesizers, cushions and string lights",out:"a desert oasis at night, lanterns over the water",
  g:{id:"hip-length cream-blonde waves swept into two big ear-like loops with terracotta tips, wispy bangs, big dark eyes, golden beige skin, a beauty mark beside one eye",fig:"short, curvy hourglass, medium-large breasts",col:"terracotta",
    out:"a desert oasis at night, brass lanterns over the water",light:"warm lantern light, starry night",room:"a desert music studio with string lights",bath:"a tiled desert bathhouse lit by brass lanterns"},
  fx:"sound waves, drifting sand, lantern glow",mot:"fennec",mot2:"fennec-ears",tmot:"desert-star",emb:"listening-fennec",pk:"a Fennekin curled up in her lap",
  words:[["nine-tailed fire dragon","sand-gold desert dragon"],["a shrine of a thousand torii gates","a desert shrine of a thousand sandstone arches"],["A kitsune costume","A fennec costume"],["a nine-tailed fox","a desert fox spirit"],["nine-tailed-fox","desert-fox"],["kitsune","desert fox spirit"],["burnt-orange hair","cream-blonde hair"],["amber foxlike eyes","dark foxlike eyes"],
    ["fluffy fox ears","huge fennec ears"],["large bushy fox tail","fluffy cream fox tail"],["under a torii gate at dusk","under a desert archway at dusk"],["the fox shrine at the autumn festival","a desert oasis at the lantern festival"],
    ["a shrine wedding under red torii gates","a desert wedding under lantern-lit arches"]],
  colors:[["burnt orange","cream"],["Burnt orange","Cream"],["burnt-orange","cream"]]},
shiba:{touch:"in warm paper-lantern light from the ramen shop below",room:"a cozy tatami bedroom above a ramen shop",roomL:"a cozy tatami bedroom above a little ramen shop, a mountain of cushions",out:"a lantern-lit ramen alley at night",
  g:{id:"hip-length honey-orange high ponytail curled at the end over a cream underlayer, blunt bangs, smiling dark eyes, peachy fair skin, cream highlights on the cheeks",fig:"soft, curvy hourglass, large breasts",col:"honey orange",
    out:"a lantern-lit ramen alley at night",light:"warm lantern light, steam",room:"a tatami bedroom above a ramen shop",bath:"a wooden soaking tub behind a ramen shop"},
  fx:"ramen steam, paper lanterns",mot:"shiba",mot2:"curled-tail",tmot:"paw-print",emb:"smug-shiba",pk:"a Yamper bouncing at her heels",
  words:[["honey bourbon cocktail","yuzu highball"],["yellow background","orange background"],["Yellow palette","Orange palette"],["Honey and drool","Ramen and drool"],["a yellow fur rug","a cream fur rug"],["badger pelt","shiba-fur"],["badger-striped","cream-and-orange"],["burrow-like","cozy"],["fluffy badger-striped onesie","fluffy shiba onesie with little ears and a curled tail"],
    ["honey-gold backdrop","honey-orange backdrop"],["honeycomb-heart","paw-heart"],["honeycomb","paw-print"],["striped badger-pelt patterns","shiba-fur patterns"],["yellow honeycomb embroidery","orange paw-print embroidery"]],
  colors:[["mustard yellow","honey orange"],["Mustard yellow","Honey orange"],["mustard-yellow","honey-orange"],["regal yellow","regal orange"]]}};

const NEWHEADS6={
hyena:{c:{age:"mature woman",faceShape:"strong, wide face with high cheekbones",expression:"big, knowing grin",impression:"a loud, warm, scrappy charm",hairStyle:"short undercut with a swept top",bangs:"swept fringe",makeupStyle:"bold punk makeup",bodySoftness:"tall, strong, mature figure"},
  blurb:"The Hyena headmistress: a tall, strong woman with a spotted sandy undercut, amber eyes, warm brown skin and a big, knowing grin."},
jackal:{c:{age:"mature woman",faceShape:"long, elegant face",expression:"calm, solemn gaze",impression:"a solemn, ancient wisdom",hairStyle:"sleek high ponytail bound with gold cuffs",bangs:"center part",makeupStyle:"dramatic gold-and-kohl makeup",bodySoftness:"tall, slender, mature figure"},
  blurb:"The Jackal headmistress: a tall, slender woman with a sleek black ponytail bound in gold, kohl-lined gold eyes, rich brown skin and a calm, solemn gaze."},
husky:{c:{age:"mature woman",faceShape:"bright, heart-shaped face",expression:"warm, energetic smile",impression:"a bright, tireless warmth",hairStyle:"long high ponytail",bangs:"side-swept bangs",makeupStyle:"fresh, sporty makeup",bodySoftness:"athletic, curvy, mature figure"},
  blurb:"The Husky headmistress: a former sled-race champion with a silver ponytail fading to white, one ice-blue eye and one brown, fair skin and a warm, energetic smile."},
dingo:{c:{age:"mature woman",faceShape:"sun-weathered oval face",expression:"easy, crooked grin",impression:"a free, sun-soaked calm",hairStyle:"long loose waves",bangs:"no bangs",makeupStyle:"bare, sun-kissed makeup",bodySoftness:"tall, lean, mature figure"},
  blurb:"The Dingo headmistress: a tall, lean outback ranger with long sun-bleached ginger waves, amber eyes, freckled light-tan skin and an easy, crooked grin."},
fennec:{c:{age:"mature woman",faceShape:"sharp heart-shaped face",expression:"sly, knowing smile",impression:"a sharp, sultry charm",hairStyle:"long waves with two swept-up side loops",bangs:"wispy bangs",makeupStyle:"sultry desert glam makeup",bodySoftness:"short, curvy, mature figure"},
  blurb:"The Fennec headmistress: a short, curvy former radio host with cream-blonde waves swept into ear-like loops, big dark eyes, golden-beige skin and a sly, knowing smile."},
shiba:{c:{age:"mature woman",faceShape:"round, soft face",expression:"smug, warm smile",impression:"a cheerful, stubborn warmth",hairStyle:"high curled ponytail",bangs:"blunt bangs",makeupStyle:"soft, rosy makeup",bodySoftness:"soft, curvy, mature figure"},
  blurb:"The Shiba headmistress: a soft, curvy woman who runs the best ramen shop in town, with a curled honey-orange ponytail, smiling dark eyes, peachy skin and a smug, warm smile."}};

const NEWMEN6={
hyena:{c:{eyeOne:"amber",markings:"a laughing-hyena tattoo along one forearm"},
  blurb:"Her partner in chaos: a lean, wiry scrapyard mechanic with a messy black undercut, amber eyes, stubble, a roguish grin and a laughing-hyena tattoo, who laughs at all her jokes, even the terrible ones. A grease-smudged tank top and tool belt, a battered leather jacket, or nothing."},
jackal:{c:{eyeOne:"gold",markings:"hieroglyph tattoos along one forearm"},
  blurb:"Her quiet match: a tall, lean archaeologist with a black half-up man bun, gold-brown eyes behind round wire glasses, designer stubble and hieroglyph tattoos along one forearm, who reads old scrolls with her by lamplight. A shirt and waistcoat, a long coat and scarf, or nothing."},
husky:{c:{eyeOne:"ice blue",markings:"a paw-print tattoo winding down one forearm"},
  blurb:"Her dangerously handsome musher: tall, ripped and devastatingly cool, with a slicked-back black undercut, piercing ice-blue eyes, designer stubble and a paw-print tattoo, who has never once kept up with her on the trail. An open-collared tuxedo, a leather jacket over a black henley, low-slung sweatpants, or nothing."},
dingo:{c:{eyeOne:"sea blue",markings:"a sun-faded compass tattoo along the ribs"},
  blurb:"Her sometimes-man: a tanned, ripped outback surfer with tousled sun-bleached hair, sea-blue eyes, a crooked grin, light stubble and a compass tattoo, who never asks her to stay. An open shirt and board shorts, bush linen, or just the trunks."},
fennec:{c:{eyeOne:"dark brown",markings:"a sound-wave tattoo on one forearm"},
  blurb:"Her nightlife rogue: a lean, charming club promoter and card shark with a side-swept undercut, heavy-lidded dark eyes, a van dyke beard, a single hoop earring and a sound-wave tattoo. Waistcoat and rolled sleeves, an open shirt, or nothing."},
shiba:{c:{eyeOne:"warm brown",markings:"flour-dusted forearms and a curled-tail tattoo on one bicep"},
  blurb:"Her gentle giant: a towering, burly ramen chef with a thick chestnut beard, short curls, warm brown eyes, a hairy chest and the softest smile, who saves her the biggest bowl every night. Flannel and jeans, a henley with rolled sleeves, or shirtless."}};

const NEWSIG6={
hyena:["Scrapyard Queen","the loudest laugh in the Pack","wild, cackling laugh","perched on a stack of old tires, doubled over laughing","a graffiti-covered scrapyard at sunset",
  {top:["{c} cropped spotted tank top","@primary"],bottom:["{c} ripped cargo shorts","@secondary"],outerwear:["{c} studded leather vest","@extra"],legwear:["{c} ripped fishnets with combat boots","@extra"],gloves:["{c} fingerless gloves","@extra"],neckAccessory:["spiked {c} choker","@extra"]}],
jackal:["Desert Guardian","the Pack's silent guardian","calm, unreadable gaze","standing very still at a tomb door with a lantern raised","a desert necropolis at night under a sky full of stars",
  {top:["{c} pleated linen halter top with a gold collar","@third"],bottom:["{c} long sheer linen skirt with a high slit","@primary"],neckAccessory:["{c} broad jeweled collar","@secondary"],wristAccessory:["{c} gold arm cuffs","@secondary"],heldItem:["oil lantern","-"],legwear:["{c} gold-laced sandals","@secondary"]}],
husky:["Snow Sprinter","the fastest runner in the snow","huge, excited grin","bounding mid-run through fresh snow, ponytail flying","a snowy forest trail, sled tracks in fresh powder",
  {top:["{c} cropped puffer jacket over a sports bra","@primary"],bottom:["{c} running leggings","@extra"],headwear:["{c} knit ear warmer","@third"],gloves:["{c} running gloves","@third"],legwear:["{c} snow running shoes","@secondary"]}],
dingo:["Outback Wanderer","the wildest girl in the Pack","free, crooked grin","barefoot on a red rock at sunset, shading her eyes against the sun","red outback dunes at sunset, a lone gum tree",
  {top:["{c} knotted cropped shirt","@secondary"],bottom:["{c} cutoff denim shorts","@third"],headwear:["{c} wide-brimmed bush hat","@extra"],neckAccessory:["dingo-tooth necklace","-"],legwear:["{c} worn leather boots","@secondary"]}],
fennec:["Desert Night DJ","the sharpest ears in the Pack","sly, knowing smile","behind a DJ deck with one headphone cup pressed to her ear","a desert oasis at night, brass lanterns and a glowing DJ booth",
  {top:["{c} sequined bralette","@primary"],bottom:["{c} high-waisted sheer harem pants","@third"],headwear:["oversized {c} headphones","@extra"],wristAccessory:["{c} stacked bangles","@accent"],legwear:["{c} strappy sandals","@accent"]}],
shiba:["Ramen Shop Darling","the most stubborn girl in the Pack","smug, satisfied smile","sitting on the ramen counter with her arms crossed and her nose in the air","a lantern-lit ramen alley at night",
  {top:["{c} cropped happi coat tied at the waist over a bandeau","@primary"],bottom:["{c} short pleated skirt","@third"],headwear:["{c} knotted headband","@accent"],heldItem:["steaming bowl of ramen","-"],legwear:["{c} thigh-high socks","@extra"]}]};

/* ---- v219: wave 6, the Pack (hyena, jackal, husky, dingo, fennec, shiba) */
if(typeof NEWGIRLS6!=="undefined"&&typeof ACAD_WAVE==="function")ACAD_WAVE(NEWGIRLS6,NEWLORE6,NEWHEADS6,NEWMEN6,NEWSIG6,"219",null,ACAD.WAVE_ONLY);

/* ---- v220: wave 7 of the house pass. The Talons grow to ten: Eagle (Griffin's stories), Falcon (Dragon's), Hawk (Wolf's),
   Vulture (Rat's), Osprey (Salmon's), Magpie (Crow's), Snowy Owl (Owl's); the Plumes grow to ten: Macaw (Lovebird's),
   Cockatoo (Flamingo's), Bird of Paradise (Swan's), Kingfisher (Shark's). Only the look sets and the kept scene sets are re-cut. */
const NEWGIRLS7=[
{k:"eagle",sis:"griffin",pal:{primary:"chocolate brown",secondary:"snow white",third:"gold",accent:"navy blue",extra:"black"},
 man:{primary:"navy blue",secondary:"chocolate brown",third:"snow white",accent:"gold",extra:"black"},
 room:"a high tower room with a wall of windows over the mountains, trophies and a flight map above the bed",pride:"the proudest champion in the Talons",pet:"Wings",
 bath:"a marble bath under a skylight high above the clouds",role:"the proud one",acc:"bright high-altitude sunlight",
 c:{age:"young woman",faceShape:"strong, sculpted face with high cheekbones and a proud chin",eyeConfig:"matching",eyeShape:"sharp, piercing almond eyes",pupilStyle:"round pupils",irisDetail:"golden irises with dark rims",
  lashNatural:"long, dark eyelashes",eyeOne:"gold",browShape:"strong, straight, dark brows",noseShape:"straight, aquiline nose",mouthShape:"full, firm lips",
  expression:"proud, piercing gaze",impression:"a proud, regal, fearless confidence",faceMark:"a faint scar through one eyebrow",
  hairStyle:"long, thick, layered hair swept back from her face",hairLength:"waist-length",hairTexture:"thick and silky",bangs:"swept back, no bangs",hairMovement:"streams back like wings in the wind",
  hairBase:"@secondary",hairUnderlayer:"@primary",hairInner:"@secondary",hairHighlights:"@third",hairBlend:"platinum white on top over a chocolate-brown underlayer, with gold-tipped ends",
  skinTone:"golden tan",undertone:"warm",skinFinish:"smooth, sun-kissed skin",markings:"no markings",bodyMarkings:"a spread-winged eagle tattoo across her upper back",
  makeupStyle:"bold, polished makeup",eyelinerStyle:"sharp winged eyeliner",eyeshadowStyle:"bronze and gold eyeshadow",lashStyle:"full lashes",blushStyle:"bronzed contour",lipFinish:"satin nude-brown lips",faceAccents:"golden highlight on the cheekbones",nailStyle:"long almond fingernails",nailColor:"@third",
  heightStature:"tall stature",shoulderShape:"broad, straight shoulders",torsoShape:"long, toned torso",armShape:"toned, strong arms",handShape:"strong, elegant hands",
  bustSize:"large, full breasts",bustShape:"round, high shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy hips",buttSize:"round, firm butt",thighBuild:"strong, toned thighs",legShape:"very long, strong legs",bodySoftness:"tall, statuesque, athletic hourglass build",
  posture:"standing tall on a cliff edge with her arms spread like wings",
  nippleColor:"light brown",nippleType:"small and perky",nippleLength:"medium-length",areolaColor:"light brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@third"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@third"],
  legwear:["sheer {c} stockings","@extra"],earAccessory:["gold feather ear cuffs","@third"],tagCharm:["small eagle crest badge","@third"]},
 blurb:"The Talons' proudest champion: a tall, statuesque, fearless flier with waist-length platinum-white hair over a chocolate underlayer, piercing gold eyes, golden-tan skin and a proud gaze. A brown hooded robe lined in gold over a white vest and brown pleated skirt, sheer black stockings and gold feather ear cuffs."},

{k:"falcon",sis:"dragon",pal:{primary:"slate gray",secondary:"cream",third:"black",accent:"gold",extra:"white"},
 man:{primary:"black",secondary:"slate gray",third:"cream",accent:"gold",extra:"white"},
 room:"a glass-walled penthouse room at the top of a skyscraper, her sabers on the wall and a racing helmet on the shelf",pride:"the fastest blade in the Talons",pet:"Bullet",
 bath:"a glass rooftop shower above the city lights",role:"the fastest one",acc:"cool blue city light through floor-to-ceiling windows",
 c:{age:"young woman",faceShape:"sleek, sharp oval face with a pointed chin",eyeConfig:"matching",eyeShape:"large, dark, intense eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with a gold ring",
  lashNatural:"thick, dark eyelashes",eyeOne:"dark brown",browShape:"sleek, angled brows",noseShape:"small, sharp nose",mouthShape:"small, determined lips",
  expression:"focused, daring smirk",impression:"a sleek, fearless, razor-sharp focus",faceMark:"dark wing-shaped markings beneath her eyes",
  hairStyle:"sleek asymmetrical bob, longer at the front",hairLength:"chin-length",hairTexture:"sleek, glossy and straight",bangs:"long side-swept bangs",hairMovement:"whips back in the wind",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"slate-gray on top with a black underside and cream streaks",
  skinTone:"light olive",undertone:"neutral",skinFinish:"smooth, matte skin",markings:"no markings",bodyMarkings:"a diving-falcon tattoo down her spine",
  makeupStyle:"sleek, graphic makeup",eyelinerStyle:"sharp graphic eyeliner",eyeshadowStyle:"smoky slate eyeshadow",lashStyle:"lifted lashes",blushStyle:"sculpted contour",lipFinish:"matte mauve lips",faceAccents:"sharp cheekbone highlight",nailStyle:"short square fingernails",nailColor:"@accent",
  heightStature:"average height",shoulderShape:"narrow, athletic shoulders",torsoShape:"slim, toned torso",armShape:"slim, toned arms",handShape:"quick, precise hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"tiny waist",stomachShape:"flat, toned stomach with faint abs",
  hipShape:"slim, curvy hips",buttSize:"small, round, firm butt",thighBuild:"lean, toned thighs",legShape:"long, toned legs",bodySoftness:"slim, sleek, athletic build",
  posture:"lunging forward with a saber, perfectly balanced",
  nippleColor:"rosy brown",nippleType:"small and perky",nippleLength:"short",areolaColor:"rosy brown",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@third",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} thigh-high socks","@third"],earAccessory:["gold bar stud earrings","@accent"],tagCharm:["small falcon crest badge","@accent"]},
 blurb:"The Talons' fastest blade: a slim, sleek, fearless fencer and racer with a slate-gray asymmetrical bob over a black underside, intense dark eyes with dark markings beneath them, light olive skin and a daring smirk. A black hooded robe lined in slate over a cream vest and slate pleated skirt, black socks and gold bar studs."},

{k:"hawk",sis:"wolf",pal:{primary:"rust red",secondary:"cream",third:"chocolate brown",accent:"forest green",extra:"tan"},
 man:{primary:"chocolate brown",secondary:"forest green",third:"cream",accent:"rust red",extra:"tan"},
 room:"a timber canyon lodge room with a bow on the wall and a hawk's perch by the window",pride:"the fiercest hunter in the Talons",pet:"Hawkeye",
 bath:"a stone bath on a canyon ledge, steam rising into the pines",role:"the hunter",acc:"golden canyon light through tall pines",
 c:{age:"young woman",faceShape:"angular face with high, sharp cheekbones",eyeConfig:"matching",eyeShape:"narrow, hooded, piercing eyes",pupilStyle:"round pupils",irisDetail:"amber irises with gold flecks",
  lashNatural:"dark eyelashes",eyeOne:"amber",browShape:"low, fierce, straight brows",noseShape:"strong, slightly hooked nose",mouthShape:"firm, determined lips",
  expression:"fierce, narrow-eyed glare",impression:"a fierce, focused, predatory grace",faceMark:"a thin scar across one cheek",
  hairStyle:"long braid over one shoulder with loose strands framing her face",hairLength:"waist-length",hairTexture:"thick and coarse",bangs:"loose face-framing strands",hairMovement:"the braid swings when she turns",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"rust-red with chocolate-brown underneath and cream-banded streaks",
  skinTone:"warm tan",undertone:"warm",skinFinish:"smooth, sun-kissed skin",markings:"freckles across her shoulders",bodyMarkings:"a hawk-feather tattoo along her forearm",
  makeupStyle:"minimal, fierce makeup",eyelinerStyle:"smudged brown eyeliner",eyeshadowStyle:"rust-brown eyeshadow",lashStyle:"natural lashes",blushStyle:"light bronze blush",lipFinish:"matte brick-red lips",faceAccents:"subtle cheekbone highlight",nailStyle:"short natural fingernails",nailColor:"@primary",
  heightStature:"tall stature",shoulderShape:"strong, defined shoulders",torsoShape:"lean, muscular torso",armShape:"toned, muscular arms",handShape:"strong, calloused archer's hands",
  bustSize:"medium-large, firm breasts",bustShape:"round, high shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"defined abs",
  hipShape:"lean, curvy hips",buttSize:"round, muscular butt",thighBuild:"strong, muscular thighs",legShape:"long, powerful legs",bodySoftness:"tall, lean, muscular build",
  posture:"drawing a bow at full stretch, one eye narrowed",
  nippleColor:"brown",nippleType:"firm and perky",nippleLength:"medium-length",areolaColor:"light brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"dusky pink",vaginaType:"neat with minimal labia",pubicHair:"a neatly trimmed patch"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@third"],outerwear:["long {c} hooded robe with {c2} lining","@third",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@primary"],
  legwear:["{c} lace-up knee boots","@third"],earAccessory:["single hawk-feather earring","@primary"],tagCharm:["small hawk crest badge","@primary"]},
 blurb:"The Talons' hunter: a tall, lean, muscular archer with a waist-length rust-red braid, piercing amber eyes under fierce brows, warm tan skin and a narrow-eyed glare. A brown hooded robe lined in rust over a cream vest and brown pleated skirt, lace-up knee boots and a single hawk-feather earring."},

{k:"vulture",sis:"rat",pal:{primary:"black",secondary:"ash gray",third:"plum",accent:"blood red",extra:"ivory"},
 man:{primary:"black",secondary:"plum",third:"ivory",accent:"blood red",extra:"ash gray"},
 room:"a candlelit gothic attic full of bones, pressed flowers and thrifted antique curiosities",pride:"the toughest survivor in the Talons",pet:"Bones",
 bath:"a black clawfoot tub ringed with candles and dried roses",role:"the patient one",acc:"dim candlelight through stained glass",
 c:{age:"young woman",faceShape:"long, elegant face with hollow cheeks and a sharp jaw",eyeConfig:"matching",eyeShape:"heavy-lidded, languid eyes",pupilStyle:"round pupils",irisDetail:"pale gray irises with dark rims",
  lashNatural:"long, dark eyelashes",eyeOne:"pale gray",browShape:"thin, arched dark brows",noseShape:"long, elegant nose",mouthShape:"full, dark lips",
  expression:"slow, knowing smile",impression:"a patient, macabre, velvet calm",faceMark:"a small beauty mark under her lip",
  hairStyle:"long, straight hair with a shaved undercut on one side",hairLength:"hip-length",hairTexture:"sleek, silky and straight",bangs:"long curtain bangs",hairMovement:"falls like a dark veil",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"jet black with an ash-gray shaved side and a plum sheen",
  skinTone:"porcelain pale",undertone:"cool",skinFinish:"smooth, flawless matte skin",markings:"no markings",bodyMarkings:"a vulture-wing and rose tattoo across her collarbones",
  makeupStyle:"dark gothic glam makeup",eyelinerStyle:"heavy black eyeliner",eyeshadowStyle:"smoky plum eyeshadow",lashStyle:"dramatic lashes",blushStyle:"barely-there blush",lipFinish:"matte black-cherry lips",faceAccents:"cool pale highlight",nailStyle:"long stiletto fingernails",nailColor:"@primary",
  heightStature:"tall stature",shoulderShape:"elegant, sloped shoulders",torsoShape:"long, curvy torso",armShape:"slender arms",handShape:"long, pale fingers",
  bustSize:"large, full, heavy breasts",bustShape:"round, full shape",bustWeight:"heavy, soft fullness",waistShape:"cinched waist",stomachShape:"soft, flat stomach",
  hipShape:"wide, curvy hips",buttSize:"round, full butt",thighBuild:"soft, full thighs",legShape:"long, shapely legs",bodySoftness:"tall, voluptuous hourglass figure",
  posture:"perched on an old stone wall with her legs crossed, waiting patiently",
  nippleColor:"dusky rose",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"dusky rose",areolaType:"smooth",areolaSize:"large",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@accent"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} lace-top stockings","@primary"],earAccessory:["small silver bone earrings","@secondary"],tagCharm:["small vulture crest badge","@accent"]},
 blurb:"The Talons' patient one: a tall, voluptuous gothic beauty with hip-length jet-black hair shaved on one side, heavy-lidded pale gray eyes, porcelain skin and a slow, knowing smile. A black hooded robe lined in blood red over an ivory vest and black pleated skirt, lace-top stockings and little silver bone earrings."},

{k:"osprey",sis:"salmon",pal:{primary:"dark brown",secondary:"white",third:"lake blue",accent:"golden yellow",extra:"charcoal gray"},
 man:{primary:"lake blue",secondary:"white",third:"dark brown",accent:"golden yellow",extra:"charcoal gray"},
 room:"a lakeside boathouse loft with fishing rods on the wall and a window over the water",pride:"the steadiest wings in the Talons",pet:"Skipper",
 bath:"an outdoor cedar tub on a dock over the lake",role:"the steady one",acc:"bright lake light glittering off the water",
 c:{age:"young woman",faceShape:"fresh oval face with a strong jaw",eyeConfig:"matching",eyeShape:"bright, wide-set eyes",pupilStyle:"round pupils",irisDetail:"golden-hazel irises with dark rims",
  lashNatural:"long, dark eyelashes",eyeOne:"golden hazel",browShape:"straight, dark brows",noseShape:"small, straight nose",mouthShape:"wide, warm smile",
  expression:"bright, confident grin",impression:"a bright, steady, outdoorsy confidence",faceMark:"sun freckles across her nose",
  hairStyle:"long hair in a high ponytail",hairLength:"waist-length",hairTexture:"thick, sleek and straight",bangs:"swept back, no bangs",hairMovement:"flicks water when she shakes her head",
  hairBase:"@secondary",hairUnderlayer:"@primary",hairInner:"@secondary",hairHighlights:"@primary",hairBlend:"snow-white on top with a dark brown streak from temple to tail and a dark brown underlayer",
  skinTone:"lightly tanned fair",undertone:"neutral",skinFinish:"fresh, sun-kissed skin",markings:"light freckles on her shoulders",bodyMarkings:"a diving osprey tattoo along her side",
  makeupStyle:"fresh, waterproof makeup",eyelinerStyle:"long dark eyeliner swept back to the temples",eyeshadowStyle:"soft brown eyeshadow",lashStyle:"waterproof lashes",blushStyle:"fresh pink flush",lipFinish:"tinted lip balm",faceAccents:"dewy highlight",nailStyle:"short rounded fingernails",nailColor:"@third",
  heightStature:"tall stature",shoulderShape:"broad swimmer's shoulders",torsoShape:"strong, V-shaped torso",armShape:"strong, toned arms",handShape:"strong, steady hands",
  bustSize:"medium-large, perky breasts",bustShape:"round, perky shape",bustWeight:"firm fullness",waistShape:"narrow waist",stomachShape:"flat, toned stomach",
  hipShape:"athletic hips",buttSize:"round, firm butt",thighBuild:"strong, toned thighs",legShape:"long, strong legs",bodySoftness:"tall, athletic swimmer's build",
  posture:"poised on the end of a dock, arms swept back, about to dive",
  nippleColor:"pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"pink",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@third"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@secondary"],
  legwear:["{c} knee socks","@secondary"],earAccessory:["small silver fish-hook earrings","@extra"],tagCharm:["small osprey crest badge","@accent"]},
 blurb:"The Talons' lifeguard: a tall, strong, sunny swimmer with a waist-length white ponytail streaked dark brown, golden-hazel eyes lined back to the temples, lightly tanned skin and a confident grin. A brown hooded robe lined in lake blue over a white vest and brown pleated skirt, white knee socks and silver fish-hook earrings."},

{k:"magpie",sis:"crow",pal:{primary:"black",secondary:"white",third:"iridescent blue",accent:"emerald green",extra:"silver"},
 man:{primary:"black",secondary:"silver",third:"white",accent:"emerald green",extra:"iridescent blue"},
 room:"a cluttered magician's attic full of mirrors, playing cards and jars of shiny trinkets",pride:"the quickest hands in the Talons",pet:"Trinket",
 bath:"a copper tub under a ceiling hung with glittering crystals",role:"the sleight of hand",acc:"glittering light from a hundred hanging crystals",
 c:{age:"young woman",faceShape:"small, heart-shaped face with a pointed chin",eyeConfig:"matching",eyeShape:"large, bright, quick eyes",pupilStyle:"round pupils",irisDetail:"deep blue irises with an iridescent green sheen",
  lashNatural:"long, dark eyelashes",eyeOne:"deep blue",browShape:"arched, mischievous brows",noseShape:"small, upturned nose",mouthShape:"small mouth with a crooked smile",
  expression:"mischievous, chattering grin",impression:"a quick, clever, sparkling mischief",faceMark:"a tiny rhinestone beside one eye",
  hairStyle:"glossy chin-length bob with one long lock",hairLength:"chin-length",hairTexture:"glossy and straight",bangs:"blunt bangs",hairMovement:"flips when she turns her head",
  hairBase:"@primary",hairUnderlayer:"@third",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"glossy black with an iridescent blue-green sheen and a white streak",
  skinTone:"fair",undertone:"cool",skinFinish:"smooth, porcelain skin",markings:"no markings",bodyMarkings:"a little magpie tattoo holding a ring on her hip",
  makeupStyle:"glittery, playful makeup",eyelinerStyle:"black cat-eye eyeliner",eyeshadowStyle:"iridescent blue-green glitter eyeshadow",lashStyle:"fluttery lashes",blushStyle:"pink flush",lipFinish:"glossy berry lips",faceAccents:"glitter on the cheekbones",nailStyle:"medium almond fingernails",nailColor:"@third",
  heightStature:"petite stature",shoulderShape:"narrow shoulders",torsoShape:"slim torso",armShape:"slim arms",handShape:"quick, nimble fingers",
  bustSize:"small-to-medium, perky breasts",bustShape:"perky shape",bustWeight:"light fullness",waistShape:"tiny waist",stomachShape:"flat stomach",
  hipShape:"curvy hips",buttSize:"round, perky butt",thighBuild:"slim thighs",legShape:"slim, shapely legs",bodySoftness:"petite, slim, curvy figure",
  posture:"flicking a coin across her knuckles with a sly wink",
  nippleColor:"pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@third"],neckAccessory:["{c}-and-{c2} striped necktie","@accent",null,"@secondary"],
  legwear:["{c} fishnet stockings","@primary"],earAccessory:["mismatched glittering earrings","@extra"],tagCharm:["small magpie crest badge","@extra"]},
 blurb:"The Talons' sleight of hand: a petite, curvy, chattering magician and pickpocket with a glossy black bob shot with blue-green sheen and a white streak, quick deep-blue eyes, fair skin and a mischievous grin. A black hooded robe lined in iridescent blue over a white vest and black pleated skirt, fishnet stockings and mismatched glittering earrings."},

{k:"snowyowl",disp:"Snowy Owl",sis:"owl",pal:{primary:"snow white",secondary:"silver",third:"golden yellow",accent:"black",extra:"ice blue"},
 man:{primary:"charcoal gray",secondary:"snow white",third:"silver",accent:"golden yellow",extra:"black"},
 room:"a snowbound observatory room with a brass telescope, star charts and a pile of white furs",pride:"the quietest wings in the Talons",pet:"Starlight",
 bath:"a steaming outdoor hot spring under the northern lights",role:"the stargazer",acc:"pale blue moonlight on snow",
 c:{age:"young woman",faceShape:"soft, round face with gentle features",eyeConfig:"matching",eyeShape:"large, round, unblinking eyes",pupilStyle:"round pupils",irisDetail:"golden-yellow irises",
  lashNatural:"long, white eyelashes",eyeOne:"golden yellow",browShape:"soft, pale brows",noseShape:"small button nose",mouthShape:"small, soft lips",
  expression:"calm, wide-eyed stare",impression:"a silent, dreamy, otherworldly calm",faceMark:"a scatter of tiny dark freckles across her cheeks",
  hairStyle:"long, voluminous, feathery layers",hairLength:"hip-length",hairTexture:"soft and fluffy",bangs:"wispy bangs",hairMovement:"drifts softly like falling snow",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@accent",hairBlend:"snow-white with silver underneath and a few black-speckled strands",
  skinTone:"very fair",undertone:"cool",skinFinish:"smooth, luminous skin",markings:"faint freckles across her shoulders",bodyMarkings:"a constellation tattoo along her ribs",
  makeupStyle:"soft, frosty makeup",eyelinerStyle:"thin white eyeliner",eyeshadowStyle:"frosted silver eyeshadow",lashStyle:"pale lashes",blushStyle:"soft pink blush",lipFinish:"sheer pink gloss",faceAccents:"icy highlight",nailStyle:"medium oval fingernails",nailColor:"@secondary",
  heightStature:"tall stature",shoulderShape:"soft shoulders",torsoShape:"soft, curvy torso",armShape:"soft arms",handShape:"slender, cool fingers",
  bustSize:"very large, soft breasts",bustShape:"round, full shape",bustWeight:"heavy, soft fullness",waistShape:"defined waist",stomachShape:"soft stomach",
  hipShape:"wide, soft hips",buttSize:"full, round, soft butt",thighBuild:"soft, thick thighs",legShape:"long, soft legs",bodySoftness:"tall, soft, curvy hourglass figure",
  posture:"sitting perfectly still by a telescope, head tilted, watching",
  nippleColor:"pale pink",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"pale pink",areolaType:"smooth",areolaSize:"large",vaginaColor:"pale pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@secondary"],outerwear:["long {c} hooded robe with {c2} faux-fur lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} thigh-high socks","@primary"],earAccessory:["small gold star earrings","@third"],tagCharm:["small snowy owl crest badge","@third"]},
 blurb:"The Talons' stargazer: a tall, soft, curvy, silent dreamer with hip-length feathery snow-white hair, huge golden eyes, very fair skin and a calm, wide-eyed stare. A silver hooded robe lined in white faux fur over a white vest and silver pleated skirt, white socks and little gold star earrings."},

{k:"macaw",sis:"lovebird",pal:{primary:"scarlet red",secondary:"royal blue",third:"sunflower yellow",accent:"emerald green",extra:"white"},
 man:{primary:"royal blue",secondary:"white",third:"scarlet red",accent:"sunflower yellow",extra:"emerald green"},
 room:"a bright loft full of plants, speakers and a hammock, the rainforest outside the window",pride:"the loudest voice in the Plumes",pet:"Rio",
 bath:"a tropical open-air shower under hanging plants",role:"the singer",acc:"warm, dappled rainforest light",
 c:{age:"young woman",faceShape:"round, radiant face with full cheeks",eyeConfig:"matching",eyeShape:"big, sparkling almond eyes",pupilStyle:"round pupils",irisDetail:"warm amber irises",
  lashNatural:"long, thick eyelashes",eyeOne:"warm amber",browShape:"bold, arched brows",noseShape:"small, rounded nose",mouthShape:"full, wide, laughing lips",
  expression:"huge, dazzling smile",impression:"a loud, vivid, irresistible warmth",faceMark:"white face-paint dots along her cheekbones",
  hairStyle:"huge voluminous curls",hairLength:"waist-length",hairTexture:"thick, bouncy curls",bangs:"curly bangs",hairMovement:"bounces wildly when she dances",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@third",hairHighlights:"@accent",hairBlend:"scarlet curls with royal blue underneath and sunflower-yellow streaks",
  skinTone:"golden brown",undertone:"warm",skinFinish:"glowing, dewy skin",markings:"no markings",bodyMarkings:"a scarlet macaw-feather tattoo down her thigh",
  makeupStyle:"bold, colorful makeup",eyelinerStyle:"bright blue graphic eyeliner",eyeshadowStyle:"rainbow eyeshadow",lashStyle:"dramatic lashes",blushStyle:"bright coral blush",lipFinish:"glossy red lips",faceAccents:"golden glitter highlight",nailStyle:"long almond fingernails",nailColor:"@primary",
  heightStature:"average height",shoulderShape:"soft shoulders",torsoShape:"curvy torso",armShape:"soft arms",handShape:"expressive hands",
  bustSize:"large, full breasts",bustShape:"round, full shape",bustWeight:"heavy fullness",waistShape:"narrow waist",stomachShape:"flat stomach",
  hipShape:"very wide, curvy hips",buttSize:"big, round, full butt",thighBuild:"thick, soft thighs",legShape:"curvy legs",bodySoftness:"curvy bombshell hourglass figure",
  posture:"belting out a high note with one arm flung wide",
  nippleColor:"brown",nippleType:"soft and rounded",nippleLength:"medium-length",areolaColor:"brown",areolaType:"smooth",areolaSize:"medium-sized",vaginaColor:"dark pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@extra"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@secondary",null,"@primary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["{c} thigh-high socks","@secondary"],earAccessory:["big gold hoop earrings","@third"],tagCharm:["small macaw crest badge","@third"]},
 blurb:"The Plumes' loudest voice: a curvy, dazzling singer with waist-length scarlet curls over royal blue and streaked sunflower yellow, sparkling amber eyes, golden-brown skin and a huge smile. A royal blue hooded robe lined in scarlet over a white vest and scarlet pleated skirt, blue socks and big gold hoops."},

{k:"cockatoo",sis:"flamingo",pal:{primary:"snow white",secondary:"lemon yellow",third:"blush pink",accent:"black",extra:"pale gray"},
 man:{primary:"white",secondary:"pale gray",third:"lemon yellow",accent:"black",extra:"blush pink"},
 room:"a sunny beach bungalow room covered in dance posters and mirrors, music always playing",pride:"the most dramatic dancer in the Plumes",pet:"Sunny",
 bath:"a bright tiled shower with a waterproof speaker blasting music",role:"the diva",acc:"bright, sunny bungalow light",
 c:{age:"young woman",faceShape:"small, heart-shaped face with a pointed chin",eyeConfig:"matching",eyeShape:"big, round, sparkling eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with bright highlights",
  lashNatural:"long, dark eyelashes",eyeOne:"dark brown",browShape:"high, expressive brows",noseShape:"small, upturned nose",mouthShape:"wide, open, delighted smile",
  expression:"shrieking, delighted laugh",impression:"a bubbly, dramatic, endless energy",faceMark:"a pink blush mark on each cheek",
  hairStyle:"spiky upswept crest of hair with long layers behind",hairLength:"shoulder-length",hairTexture:"light, fluffy and voluminous",bangs:"swept-up crest bangs",hairMovement:"the crest rises when she gets excited",
  hairBase:"@primary",hairUnderlayer:"@extra",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"snow-white with a bright lemon-yellow crest",
  skinTone:"fair with a golden tan",undertone:"warm",skinFinish:"glowing skin",markings:"no markings",bodyMarkings:"a tiny cockatoo tattoo on her ankle",
  makeupStyle:"bright, bubbly makeup",eyelinerStyle:"flicked black eyeliner",eyeshadowStyle:"lemon-yellow shimmer eyeshadow",lashStyle:"fluttery lashes",blushStyle:"bright pink cheek blush",lipFinish:"glossy pink lips",faceAccents:"sparkly highlight",nailStyle:"short rounded fingernails",nailColor:"@secondary",
  heightStature:"petite stature",shoulderShape:"narrow shoulders",torsoShape:"slim, toned torso",armShape:"slim, toned arms",handShape:"small, quick hands",
  bustSize:"medium, perky breasts",bustShape:"perky, round shape",bustWeight:"light, firm fullness",waistShape:"tiny waist",stomachShape:"flat, toned stomach",
  hipShape:"slim, curvy hips",buttSize:"round, perky, toned butt",thighBuild:"toned dancer's thighs",legShape:"slim, toned legs",bodySoftness:"petite, slim, toned dancer's figure",
  posture:"mid-dance with her arms up, bobbing to the beat",
  nippleColor:"pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"light pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@primary"],bottom:["pleated mini skirt","@extra"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@accent"],
  legwear:["{c} leg warmers","@third"],earAccessory:["lemon-yellow feather earrings","@secondary"],tagCharm:["small cockatoo crest badge","@secondary"]},
 blurb:"The Plumes' diva: a petite, toned, bubbly, dramatic dancer with fluffy snow-white hair swept up into a lemon-yellow crest, big sparkling dark eyes, a golden tan and a delighted shriek of a laugh. A white hooded robe lined in lemon yellow over a white vest and pale gray pleated skirt, pink leg warmers and yellow feather earrings."},

{k:"birdofparadise",disp:"Bird of Paradise",sis:"swan",pal:{primary:"velvet black",secondary:"emerald green",third:"gold",accent:"electric blue",extra:"flame orange"},
 man:{primary:"black",secondary:"gold",third:"emerald green",accent:"electric blue",extra:"flame orange"},
 room:"a jungle-canopy dressing room full of feathered costumes, mirrors and orchids",pride:"the most dazzling dancer in the Plumes",pet:"Jewel",
 bath:"a rainforest pool under an orchid-draped waterfall",role:"the showstopper",acc:"golden stage light through orchids",
 c:{age:"young woman",faceShape:"sculpted, elegant oval face with high cheekbones",eyeConfig:"matching",eyeShape:"long, sultry, upturned eyes",pupilStyle:"round pupils",irisDetail:"emerald green irises with gold flecks",
  lashNatural:"long, dark eyelashes",eyeOne:"emerald green",browShape:"high, dramatic arched brows",noseShape:"elegant, straight nose",mouthShape:"full, sultry lips",
  expression:"sultry, dazzling smile",impression:"a dazzling, elegant, untouchable allure",faceMark:"a few iridescent gems at the corners of her eyes",
  hairStyle:"long sleek hair with a cascade of plume-like layers",hairLength:"hip-length",hairTexture:"sleek, glossy and straight",bangs:"center part",hairMovement:"fans out like plumes when she spins",
  hairBase:"@primary",hairUnderlayer:"@extra",hairInner:"@primary",hairHighlights:"@secondary",hairBlend:"velvet black with flame-orange plume-like layers underneath and an emerald sheen",
  skinTone:"warm bronze",undertone:"warm",skinFinish:"smooth, glowing skin with a soft shimmer",markings:"no markings",bodyMarkings:"a sweeping plume tattoo along her side",
  makeupStyle:"dazzling stage makeup",eyelinerStyle:"dramatic emerald winged eyeliner",eyeshadowStyle:"iridescent emerald and gold eyeshadow",lashStyle:"dramatic lashes",blushStyle:"bronze contour",lipFinish:"glossy deep red lips",faceAccents:"gold shimmer highlight",nailStyle:"long stiletto fingernails",nailColor:"@third",
  heightStature:"tall stature",shoulderShape:"elegant, straight shoulders",torsoShape:"long, slender torso",armShape:"long, graceful arms",handShape:"long, graceful fingers",
  bustSize:"medium, round breasts",bustShape:"round, high shape",bustWeight:"firm fullness",waistShape:"tiny waist",stomachShape:"flat, toned stomach",
  hipShape:"curvy hips",buttSize:"round, firm butt",thighBuild:"toned dancer's thighs",legShape:"very long, toned legs",bodySoftness:"tall, long-legged, slender hourglass dancer's figure",
  posture:"mid-spin with her arms raised and her hair fanning out like plumes",
  nippleColor:"rosy brown",nippleType:"small and perky",nippleLength:"short",areolaColor:"rosy brown",areolaType:"smooth",areolaSize:"small",vaginaColor:"rosy pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@secondary"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],
  legwear:["sheer {c} stockings","@primary"],earAccessory:["long gold feather earrings","@third"],tagCharm:["small bird-of-paradise crest badge","@third"]},
 blurb:"The Plumes' showstopper: a tall, long-legged, dazzling stage dancer with hip-length velvet-black hair layered flame orange underneath, sultry emerald eyes, warm bronze skin and a dazzling smile. A black hooded robe lined in emerald over an emerald vest and black pleated skirt, sheer stockings and long gold feather earrings."},

{k:"kingfisher",sis:"shark",pal:{primary:"cobalt blue",secondary:"tangerine orange",third:"turquoise",accent:"white",extra:"black"},
 man:{primary:"black",secondary:"cobalt blue",third:"white",accent:"tangerine orange",extra:"turquoise"},
 room:"a riverside cottage room with diving medals on the wall and a window over the rapids",pride:"the best diver in the Plumes",pet:"Kiki",
 bath:"a clear river pool under a mossy waterfall",role:"the diver",acc:"sparkling light off rushing river water",
 c:{age:"young woman",faceShape:"small, sharp oval face with a pointed chin",eyeConfig:"matching",eyeShape:"bright, focused almond eyes",pupilStyle:"round pupils",irisDetail:"dark brown irises with bright highlights",
  lashNatural:"thick, dark eyelashes",eyeOne:"dark brown",browShape:"straight, focused brows",noseShape:"small, sharp nose",mouthShape:"small, determined smile",
  expression:"focused, competitive smirk",impression:"a quick, precise, jewel-bright intensity",faceMark:"a tiny turquoise gem beside one eye",
  hairStyle:"short, sleek pixie cut with a long fringe",hairLength:"short",hairTexture:"sleek and glossy",bangs:"long side fringe",hairMovement:"slicked back and dripping after every dive",
  hairBase:"@primary",hairUnderlayer:"@secondary",hairInner:"@primary",hairHighlights:"@third",hairBlend:"electric cobalt blue with a tangerine-orange underside and turquoise streaks",
  skinTone:"light golden",undertone:"warm",skinFinish:"smooth, sun-kissed skin",markings:"no markings",bodyMarkings:"a diving kingfisher tattoo on her shoulder blade",
  makeupStyle:"sporty, waterproof makeup",eyelinerStyle:"thin cobalt eyeliner",eyeshadowStyle:"turquoise shimmer eyeshadow",lashStyle:"waterproof lashes",blushStyle:"warm tangerine blush",lipFinish:"glossy coral lips",faceAccents:"dewy highlight",nailStyle:"short square fingernails",nailColor:"@secondary",
  heightStature:"short stature",shoulderShape:"strong, compact shoulders",torsoShape:"compact, toned torso",armShape:"toned arms",handShape:"small, strong hands",
  bustSize:"small-to-medium, perky breasts",bustShape:"perky shape",bustWeight:"light, firm fullness",waistShape:"narrow waist",stomachShape:"toned stomach with faint abs",
  hipShape:"athletic hips",buttSize:"round, firm, muscular butt",thighBuild:"powerful, toned thighs",legShape:"strong, toned legs",bodySoftness:"short, compact, toned athletic build",
  posture:"poised on the edge of a high diving board, arms raised, perfectly still",
  nippleColor:"pink",nippleType:"small and perky",nippleLength:"short",areolaColor:"pink",areolaType:"smooth",areolaSize:"small",vaginaColor:"pink",vaginaType:"neat with minimal labia",pubicHair:"no pubic hair"},
 robes:{top:["sweater vest over a collared shirt","@accent"],bottom:["pleated mini skirt","@primary"],outerwear:["long {c} hooded robe with {c2} lining","@primary",null,"@secondary"],neckAccessory:["{c}-and-{c2} striped necktie","@secondary",null,"@primary"],
  legwear:["{c} knee socks","@accent"],earAccessory:["small turquoise drop earrings","@third"],tagCharm:["small kingfisher crest badge","@secondary"]},
 blurb:"The Plumes' diver: a short, compact, toned competitive diver with a sleek electric-blue pixie cut over a tangerine underside, focused dark eyes, light golden skin and a competitive smirk. A cobalt hooded robe lined in tangerine over a white vest and cobalt pleated skirt, white knee socks and turquoise drop earrings."}
];

/* ---- v220: lore for wave 7, the Talons and the Plumes (same fields as girls210lore.js) */
const NEWLORE7={
eagle:{touch:"in bright high-altitude sunlight",room:"a high tower room over the mountains",roomL:"a high tower room with a wall of windows over the mountains and a shelf of trophies",out:"a windswept cliff-top aerie above the clouds",
  g:{id:"waist-length platinum-white hair swept back over a chocolate-brown underlayer with gold-tipped ends, piercing gold eyes, golden-tan skin, a faint scar through one eyebrow",fig:"tall, statuesque, athletic hourglass, large breasts",col:"navy blue",
    out:"a windswept cliff-top aerie above the clouds, mountains below",light:"bright high-altitude sunlight, wind",room:"a high tower room over the mountains",bath:"a marble bath under a skylight above the clouds"},
  fx:"wind-swept feathers, drifting clouds",mot:"eagle",mot2:"spread-eagle",tmot:"eagle-feather",emb:"spread-eagle",pk:"a Braviary perched proudly on her arm",
  words:[["plush spa headband with lion ears","plush spa headband with little feather tufts"],["rounded lion ears","feathered ear tufts"],["tufted lion tail","fanned tail feathers"],["lion pelt draped over one shoulder","eagle-feather cape draped over one shoulder"],["lion tamer","falconer"],["swept-back mane of layered hair","swept-back crown of layered hair"],["spread griffin wings","spread eagle wings"],["tiny griffin wings","tiny eagle wings"],["griffin wings","eagle wings"],["griffin heads","eagle heads"],["rampant griffin","spread eagle"],["griffin-feather","eagle-feather"],["griffin-claw","eagle-talon"],
    ["overlooking the harbor","overlooking the mountains"],["a view of the harbor","a view of the mountains"],["the ship's bow at sunset","a cliff-top aerie at sunset"],["the top of the Academy lighthouse","the top of the Academy bell tower"]],
  colors:[["crimson-and-gold","navy-and-gold"],["crimson curtains","navy curtains"],["crimson banners","navy banners"]]},
falcon:{touch:"in cool blue city light",room:"a glass-walled penthouse room above the city",roomL:"a glass-walled penthouse room above the city, sabers on the wall and a racing helmet on the shelf",out:"a skyscraper rooftop at dusk, the city glittering below",
  g:{id:"sleek chin-length asymmetrical slate-gray bob over a black underside with cream streaks, intense dark eyes with dark wing-shaped markings beneath them, light olive skin",fig:"slim, sleek, athletic, medium breasts",col:"slate gray",
    out:"a skyscraper rooftop at dusk, the city glittering below",light:"cool blue city light, neon reflections",room:"a glass-walled penthouse room above the city",bath:"a glass rooftop shower above the city lights"},
  fx:"speed lines, rushing wind",mot:"falcon",mot2:"diving-falcon",tmot:"feather",emb:"diving-falcon",pk:"a Talonflame streaking past her",
  words:[["thorn crown with dragon horns","thorn crown with falcon feathers"],["broad, powerful warrior's build","slim, sleek fencer's build"],["half-up warrior braid","sleek swept-back bob"],["broadsword","saber"],["dragon rider","dragon rider"],["flame pattern","wind-streak pattern"],["flame hem","feather hem"],["flame-trim","feather-trim"],["flame-print","speed-stripe print"],["flame sequins","silver sequins"],["flame lace","feather lace"],
    ["a stage engulfed in flames","a stage swept by wind and falling feathers"],["flame-edged greatsword","razor-edged saber"],["A fire elf","A sky elf"],["flaming sword","silver saber"],["blazing flame aura","rushing wind aura"],
    ["A fire elemental","A wind elemental"],["a bikini of living flame clinging to her body","a bikini of rushing wind and feathers clinging to her body"],["wisps of living flame barely covering her","wisps of wind-blown feathers barely covering her"],
    ["a magical landscape swirling with living flame","a magical sky swirling with wind and clouds"],["flame-and-ember trail (no legs)","whirlwind of feathers (no legs)"],["ember lines down the arms","feather patterns down the arms"],["ember-like","feather-like"],
    ["infernal crimson","slate gray"],["dragonlike fangs and claws","falcon-like talons"],["short curved horns","slate feather hair clips"],["crest of a dragon breathing fire","crest of a diving falcon"],["an enormous crimson dragon breathing fire","an enormous slate-gray dragon"],
    ["A crimson bodycon","A slate bodycon"],["Crimson palette","Slate palette"],["Crimson cheer","Slate cheer"],["crimson over-the-knee socks","slate over-the-knee socks"],
    ["cozy dragon-scale hooded onesie with little horns and a tail","cozy falcon hooded onesie with a little beak and wings"],["dragon horns","slate feather hair clips"],["dragon scales and claws","feathers and talons"],
    ["dragon-scale breastplate","feathered breastplate"],["dragon-scale pauldron","feathered pauldron"],["dragon-scale trim","feather trim"],["gold dragon-scale embroidery","gold feather embroidery"],["dragon-scale","feathered"],["dragon scale","feather"],
    ["horn spikes","silver spikes"],["large bat wings (costume)","large falcon wings (costume)"],["long scaled dragon tail","short barred tail feathers"],["plush spa headband with small horns","plush spa headband with little feathers"],
    ["red-draped tower","glass-walled tower"],["scale embroidery","feather embroidery"],["scale-edged","feather-edged"],["scaled hide shoulder wrap","feathered shoulder wrap"],["small curved horn headband","small feathered headband"]],
  colors:[["crimson red","slate gray"],["Crimson red","Slate gray"],["burgundy","cream"],["Burgundy","Cream"],["cheeks flushed crimson","cheeks flushed crimson"],["cheeks crimson","cheeks crimson"],["face is crimson","face is crimson"],
    ["regal crimson","regal slate"],["crimson backdrop","slate-gray backdrop"],["crimson silk","slate silk"],["crimson rope","black rope"],["crimson battle crown","gold battle crown"]]},
hawk:{touch:"in golden canyon light through tall pines",room:"a timber canyon lodge room",roomL:"a timber canyon lodge room with a bow on the wall and a hawk's perch by the window",out:"a red-rock canyon rim at sunset, pines below",
  g:{id:"waist-length rust-red braid over one shoulder with chocolate-brown underneath and loose strands framing her face, piercing amber eyes under fierce brows, warm tan skin, a thin scar across one cheek",fig:"tall, lean, muscular, medium-large breasts",col:"rust red",
    out:"a red-rock canyon rim at sunset, pines below",light:"golden canyon light, long shadows",room:"a timber canyon lodge room",bath:"a stone bath on a canyon ledge"},
  fx:"drifting feathers, canyon dust",mot:"hawk",mot2:"hawk-and-arrow",tmot:"hawk-feather",emb:"screaming-hawk",pk:"a Staraptor gliding overhead",
  words:[["A werewolf costume","A harpy costume"],["micro fur-trimmed leather bikini top","micro feather-trimmed leather bikini top"],["micro fur-trimmed leather loincloth skirt","micro feather-trimmed leather loincloth skirt"],["fuzzy wolf ear headband","feathered hawk-crest headband"],["fluffy wolf tail attached at the lower back","fanned hawk tail feathers attached at the lower back"],["fluffy wolf tail","fanned hawk tail feathers"],["wolf fangs","hawk talons"],["wolf-and-moon","hawk-and-feather"],["moon-and-wave print","feather-and-wave print"],["crescent-moon crown","feathered crown"],["a huge glowing full-moon light","a huge glowing sunset light"],["moonlit aura","golden sunlit aura"],["fur shoulder pelt","feathered shoulder mantle"],["fur loincloth","leather loincloth"],["White cheer crop top","Rust red cheer crop top"],["howling wolf heads","screaming hawk heads"],["howling-wolf","screaming-hawk"],["howling wolf","screaming hawk"],["wolf-fang pendant","hawk-talon pendant"],["wolf-moon","hawk-feather"],["moon-and-pine","feather-and-pine"],
    ["wolfish crouches","predatory crouches"],["wolfish crouch","predatory crouch"],["Pack hunt","Talon hunt"],["howls","cries"],["howling","crying out"],["howl","cry"],
    ["a fur rug","a woven rug"],["fur rug","woven rug"],["a fur throw","a woven blanket"],["fur throw","woven blanket"],["log cabin","canyon lodge"],["cabin fire","lodge fire"]],
  colors:[["navy blue","cream"],["ice blue","forest green"],["ice-blue","forest-green"],["steel gray","rust red"],["steel-gray","rust-red"],["Steel gray","Rust red"],["ice-blue moon-and-pine embroidery","rust feather-and-pine embroidery"]]},
vulture:{touch:"by dim candlelight through stained glass",room:"a candlelit gothic attic",roomL:"a candlelit gothic attic full of bones, pressed flowers and antique curiosities",out:"an overgrown old cemetery at dusk",
  g:{id:"hip-length straight jet-black hair with one shaved ash-gray side and a plum sheen, heavy-lidded pale gray eyes, porcelain pale skin, a beauty mark under her lip",fig:"tall, voluptuous hourglass, large heavy breasts",col:"plum",
    out:"an overgrown old cemetery at dusk, crooked trees and mist",light:"dim candlelight, purple dusk",room:"a candlelit gothic attic",bath:"a black clawfoot tub ringed with candles"},
  fx:"drifting black feathers, candle smoke",mot:"vulture",mot2:"vulture-and-rose",tmot:"bone",emb:"perched-vulture",pk:"a Mandibuzz perched on a gravestone beside her",
  words:[["outdoors, neon lights","outdoors, fog"],["Squeak squeak","Hss hss"],["SQUEAK♡","HSSS♡"],["SQUEAK..","HSSS.."],["squeaks","hisses"],["squeak","hiss"],["a stolen wedge of cheese","a stolen bottle of red wine"],["wedge of cheese","bottle of red wine"],["cheese stalls","antique stalls"],
    ["round mouse ears","black feather hair clips"],["long thin rat tail attached at the lower back","long black tail feathers attached at the lower back"],["long thin rat tail","long black tail feathers"],["a long thin tail","long black tail feathers"],
    ["rat ears","feathered hair clips"],["rat-tail charms","bone charms"],["rat-tail","bone"],["rose quartz pendant","garnet pendant"],["neon-lit city alley","moonlit cemetery path"],
    ["a pack of rats crouched along the railings around her","a committee of vultures hunched along the railings around her"],["among a pack of rats","among a committee of vultures"],["rooftop rats","rooftop vultures"]],
  colors:[["Rose-pink","Plum"],["Rose pink","Plum"],["ash gray","black"],["ash-gray","black"],["Ash gray","Black"],["rose pink","plum"],["rose-pink","plum"],["mustard yellow","blood red"]]},
osprey:{nolow:true,touch:"in bright lake light glittering off the water",room:"a lakeside boathouse loft",roomL:"a lakeside boathouse loft with fishing rods on the wall and a window over the water",out:"a misty mountain lake at dawn, pines along the shore",
  g:{id:"waist-length snow-white high ponytail with a dark brown streak from temple to tail and a dark brown underlayer, golden-hazel eyes lined back to the temples, lightly tanned fair skin, sun freckles",fig:"tall, athletic swimmer's build, medium-large breasts",col:"lake blue",
    out:"a misty mountain lake at dawn, pines along the shore",light:"bright lake light, glittering water",room:"a lakeside boathouse loft",bath:"an outdoor cedar tub on a dock over the lake"},
  fx:"water spray, glittering ripples",mot:"osprey",mot2:"diving-osprey",tmot:"ripple",emb:"diving-osprey",pk:"a Pelipper bobbing on the lake beside her",
  words:[["a salmon crest","an osprey crest"],["fin-like ears","feathered ear tufts"],["fin ears","feathered ear tufts"],["micro scaled armor loincloth","micro feathered armor loincloth"],["Rose-gold waterfall","Golden waterfall"],["leaping-salmon","diving-osprey"],["salmon crest","osprey crest"],["fluffy salmon hooded onesie with a fin-trimmed hood","fluffy osprey hooded onesie with a feather-trimmed hood"],["salmon onesie","osprey onesie"],["salmon fins","osprey feathers"],["salmon scales","osprey feathers"],
    ["while the salmon he taught her to love run upstream around her ankles","while the salmon he taught her to catch run upstream around her ankles"],["while salmon run upstream around her ankles","while salmon run upstream around her ankles"],
    ["as salmon leap upstream past her","as salmon leap upstream past her"],["watches salmon leap upstream","watches salmon leap upstream"],["Swimming upstream was supposed to be her thing","Diving was supposed to be her thing"],["UPSTREAM♡","DIVE♡"],
    ["It's spawning season♡","It's mating season♡"],["during spawning season","during mating season"],["scale accents","feather accents"],["scale-shimmer","feather-shimmer"],["scale sequins","feather sequins"],["scale-sequin","feather-sequin"],
    ["scale embroidery","feather embroidery"],["scale-trim","feather-trim"],["scale-knit","feather-knit"],["scale-print","feather-print"],["scale-panelled","feather-panelled"],["fishtail hem","feathered hem"],
    ["mermaid-tail skirt with scale sequins","feathered skirt with sequins"],["small fins","small feathers"],["small {c2} fins","small {c2} feathers"],["fin-trimmed hood","feather-trimmed hood"],["fish-scale hide wrap","brown feather wrap"],
    ["shaped like salmon scales","shaped like osprey feathers"],["crown of river reeds and silver scales","crown of river reeds and brown feathers"],["Salmon cheer","Lake blue cheer"],["scaled armor bikini top","feathered armor bikini top"]],
  colors:[["porcelain","white"],["Rose-gold","Golden-yellow"],["Rose gold","Golden yellow"],["salmon pink","lake blue"],["salmon-pink","lake-blue"],["salmon","lake blue"],["rose-gold","golden-yellow"],["rose gold","golden yellow"],["oatmeal","dark brown"]]},
magpie:{touch:"in glittering light from a hundred hanging crystals",room:"a cluttered magician's attic",roomL:"a cluttered magician's attic full of mirrors, playing cards and jars of shiny trinkets",out:"a moonlit city rooftop strung with glittering lights",
  g:{id:"glossy black chin-length bob with an iridescent blue-green sheen, one long lock and a white streak, quick deep-blue eyes, fair porcelain skin, a tiny rhinestone beside one eye",fig:"petite, slim, curvy, small-to-medium breasts",col:"iridescent blue",
    out:"a moonlit city rooftop strung with glittering lights",light:"glittering crystal light, moonlight",room:"a cluttered magician's attic",bath:"a copper tub under hanging crystals"},
  fx:"glitter, flying playing cards",mot:"magpie",mot2:"magpie-and-ring",tmot:"diamond",emb:"magpie-with-a-ring",pk:"a Sableye clutching a stolen gem beside her",
  words:[["Caw caw","Chak chak"],["CAW CAW","CHAK CHAK"],["CAW♡","CHAK♡"],["CAW..","CHAK.."],["CAW","CHAK"],["Caw","Chak"],["caw","chatter"],["crow-feather fan","magpie-feather fan"],["platinum crow-feather embroidery","silver magpie-feather embroidery"],
    ["crow-feather","magpie-feather"],["crow feathers","magpie feathers"],["swirl of black feathers","swirl of black-and-white feathers"],["black feathers","black-and-white feathers"],["dark feathered wings","black-and-white feathered wings"],
    ["small crow familiar perched on her shoulder with a shiny button in its beak","small magpie familiar perched on her shoulder with a stolen ring in its beak"],["black-feathered armor","black-and-white feathered armor"],
    ["among a flock of curious crows","among a mischief of curious magpies"],["among a flock of crows","among a mischief of magpies"],["a flock of crows perched along the railings","a mischief of magpies perched along the railings"],
    ["black feather mantle with a crow skull clasp","black-and-white feather mantle with a diamond clasp"],["opal pendant","stolen diamond pendant"]],
  colors:[["Dusty-lavender","Emerald-green"],["Dusty lavender","Emerald green"],["lavender ribbon","emerald ribbon"],["lavender hair bows","emerald hair bows"],["lavender feather-trimmed","emerald feather-trimmed"],["lavender garter","emerald garter"],["silvery","silver"],["opals","sapphires"],["opalescent","iridescent"],["ink blue","black"],["ink-blue","black"],["Ink blue","Black"],["silvery white","white"],["silvery-white","white"],["dusty lavender","emerald green"],["dusty-lavender","emerald-green"],["opal","sapphire"],["platinum","silver"]]},
snowyowl:{low:"snowy owl",touch:"in pale blue moonlight on snow",room:"a snowbound observatory room",roomL:"a snowbound observatory room with a brass telescope, star charts and a pile of white furs",out:"a snowy tundra under the northern lights",
  g:{id:"hip-length feathery snow-white hair with silver underneath and a few black-speckled strands, huge golden-yellow eyes, very fair skin, tiny dark freckles across her cheeks",fig:"tall, soft, curvy hourglass, very large breasts",col:"silver",
    out:"a snowy tundra under the northern lights",light:"pale moonlight on snow, green aurora glow",room:"a snowbound observatory room",bath:"a steaming hot spring under the northern lights"},
  fx:"falling snow, aurora shimmer",mot:"snowy-owl",mot2:"owl-and-star",tmot:"snowflake",emb:"snowy-owl",pk:"a Noctowl watching silently from the telescope",
  words:[["a plunging caramel feathered micro bodysuit","a plunging snow-white feathered micro bodysuit"],["amber owl-feather embroidery","silver owl-feather embroidery"],
    ["feathery caramel-brown hair over an antique-ivory underlayer","feathery snow-white hair over a silver underlayer"],
    ["tawny night dragon with owl-like feathers and huge amber eyes","snow-white night dragon with owl-like feathers and huge golden eyes"],["tawny night dragon with owl-like feathers","snow-white night dragon with owl-like feathers"],
    ["midnight espresso martini","white chocolate martini"],["Espresso brown","Silver"]],
  colors:[["caramel brown","snow white"],["Caramel brown","Snow white"],["caramel-brown","snow-white"],["espresso brown","silver"],["espresso-brown","silver"],["antique ivory","ice blue"],["antique-ivory","ice-blue"],["honey gold","golden yellow"]]},
macaw:{touch:"in warm, dappled rainforest light",room:"a bright loft full of plants and speakers",roomL:"a bright loft full of plants, speakers and a hammock, the rainforest outside the window",out:"a rainforest waterfall at golden hour",
  g:{id:"waist-length huge scarlet curls over royal blue with sunflower-yellow streaks, sparkling amber eyes, golden-brown skin, white face-paint dots along her cheekbones",fig:"curvy bombshell hourglass, large breasts, wide hips",col:"scarlet red",
    out:"a rainforest waterfall at golden hour",light:"warm dappled rainforest light",room:"a bright loft full of plants",bath:"a tropical open-air shower under hanging plants"},
  fx:"bright feathers, music notes",mot:"macaw",mot2:"macaw-and-heart",tmot:"tropical-feather",emb:"singing-macaw",pk:"a Chatot singing along on her shoulder",
  words:[["a pastel pink set","a tropical set"],["an orange-and-cream striped backdrop, giant inflatable orange slices","a scarlet-and-blue striped backdrop, giant inflatable mangoes"],[", twintails",", curly hair"],["fluffy twintails","bouncy curls"],["twintails","curls"],["fluffy twin buns","big bouncy curls"],["pastel kitchen","bright tropical kitchen"],["pastel cabinets","bright painted cabinets"],["pastel stage","bright tropical stage"],["pastel cafe","bright tropical cafe"],["pastel apartment","bright apartment"],["pastel plushies","bright plushies"],["pastel highlighter pen","neon highlighter pen"],["a fluffy creamsicle lovebird onesie","a fluffy scarlet macaw onesie"],["a creamsicle feathered bikini top","a scarlet feathered bikini top"],["mint feathered leg warmers","emerald feathered leg warmers"],
    ["mint-green lovebird-and-feather embroidery","emerald macaw-and-feather embroidery"],["mint hair bows","emerald hair bows"],["mint ribbon choker","emerald ribbon choker"],["mint ribbon bows","emerald ribbon bows"],["mint ribbon","emerald ribbon"],
    ["mint swim ring","emerald swim ring"],["mint collar and cuffs","emerald collar and cuffs"],["a mint garter","an emerald lace garter"],["glass of peach iced tea","glass of passion-fruit iced tea"],["peach-scented","passion-fruit-scented"],
    ["a small, peach-colored dragon with heart-shaped scales","a small scarlet dragon with blue-and-yellow wings"],["at the twintails","in her curls"],["on her twintails","in her curls"],["Hair is put up in fluffy buns","Hair is piled up in big curls"],["orange-blossom","hibiscus"]],
  colors:[["creamsicle orange","scarlet red"],["creamsicle-orange","scarlet-red"],["Creamsicle","Scarlet"],["creamsicle","scarlet"],["powder blue","royal blue"],["soft peach","sunflower yellow"],["soft-peach","sunflower-yellow"]]},
cockatoo:{touch:"in bright, sunny bungalow light",room:"a sunny beach bungalow room",roomL:"a sunny beach bungalow room covered in dance posters and mirrors",out:"a sunny surf beach lined with palms",
  g:{id:"shoulder-length fluffy snow-white hair swept up into a spiky lemon-yellow crest, big sparkling dark brown eyes, fair skin with a golden tan, pink blush marks on her cheeks",fig:"petite, slim, toned dancer's figure, medium breasts",col:"lemon yellow",
    out:"a sunny surf beach lined with palms, cockatoos in the trees",light:"bright sunny light, warm sunset",room:"a sunny beach bungalow room",bath:"a bright tiled shower with music blasting"},
  fx:"confetti, white feathers",mot:"cockatoo",mot2:"crested-cockatoo",tmot:"white-feather",emb:"dancing-cockatoo",pk:"a Squawkabilly bobbing its head to the beat beside her",
  words:[["a lagoon at sunset with flamingos wading","a beach at sunset with cockatoos screeching in the palms"],["balanced on one leg like a flamingo","bobbing her head to the beat like a cockatoo"],["standing in lagoon shallows on one leg","dancing in the lagoon shallows"],
    ["standing on one leg","bobbing to the music"],["balancing on one leg","dancing on the spot"],["a pink dragon with long legs","a white dragon with a lemon-yellow crest"],["flamingo-pink","lemon-yellow"],["crown of pink feathers","crown of white and yellow feathers"],
    ["pink feather mantle","white feather mantle with a yellow crest"],["pink feathers","white feathers"],["pink feather","white feather"],["pink villa","beach bungalow"],["The queen of the Pink Isles","The queen of the Sunshine Coast"],["frozen pink daiquiri","frozen pineapple daiquiri"]],
  colors:[["hot pink","lemon yellow"],["Hot pink","Lemon yellow"],["hot-pink","lemon-yellow"],["salmon","blush pink"]]},
birdofparadise:{low:"bird of paradise",touch:"in golden stage light through orchids",room:"a jungle-canopy dressing room",roomL:"a jungle-canopy dressing room full of feathered costumes, mirrors and orchids",out:"a misty rainforest canopy at dawn",
  g:{id:"hip-length sleek velvet-black hair with flame-orange plume-like layers underneath and an emerald sheen, sultry emerald eyes, warm bronze skin, tiny iridescent gems at the corners of her eyes",fig:"tall, long-legged, slender hourglass, medium breasts",col:"emerald green",
    out:"a misty rainforest canopy at dawn",light:"golden stage light, dappled jungle light",room:"a jungle-canopy dressing room",bath:"a rainforest pool under an orchid-draped waterfall"},
  fx:"flying plumes, orchid petals",mot:"plume",mot2:"bird-of-paradise",tmot:"plume",emb:"dancing-bird-of-paradise",pk:"an Oricorio dancing beside her",
  words:[["pearl drop earrings","gold drop earrings"],["pearl earrings","gold earrings"],["pearl strand","gold chain"],["black pearl choker","black emerald choker"],["pearl choker","emerald choker"],["pearl-like skin sheen","golden skin sheen"],["pearl necklace","emerald necklace"],["pearlescent satin","iridescent satin"],["swans","birds of paradise"],["swan wings folded across her chest","plumes folded across her chest"],["swan-feather crown","plumed crown"],["swan-feather","plume"],["swan feathers","bright plumes"],["swan wings","plumed wings"],["swan-wing","plume"],
    ["swans gliding by","birds of paradise dancing in the trees"],["while swans glide past","while birds of paradise dance in the trees"],["white feathers drifting down","flame-orange plumes drifting down"],["white feathers drifting past the window","flame-orange plumes drifting past the window"],
    ["white feathers drifting","flame-orange plumes drifting"],["White feathers","Flame-orange plumes"],["white feathers","flame-orange plumes"],["floating feathers","floating plumes"],["feathers settling on her skin","plumes settling on her skin"],
    ["as feathers drift down","as plumes drift down"],["shower of white feathers","shower of flame-orange plumes"],["rose-gold swan-feather embroidery","gold plume embroidery"],["a feather drifting on the water","a plume drifting on the water"],
    ["fluffy swan-white pajama top","silky emerald pajama top"],["white feather mantle","flame-orange plumed mantle"],["black feather headpiece","emerald plumed headpiece"],["pearl-white dragon with feathered wings","velvet-black dragon with flame-orange plumes"]],
  colors:[["pearl white","emerald green"],["pearl-white","emerald-green"],["Pearl white","Emerald green"],["dusty rose","flame orange"],["dusty-rose","flame-orange"],["rose gold","gold"],["rose-gold","gold"]]},
kingfisher:{touch:"in sparkling light off rushing river water",room:"a riverside cottage room",roomL:"a riverside cottage room with diving medals on the wall and a window over the rapids",out:"a clear river gorge with a high diving rock",
  g:{id:"short sleek electric cobalt-blue pixie cut with a tangerine-orange underside and turquoise streaks, focused dark brown eyes, light golden skin, a tiny turquoise gem beside one eye",fig:"short, compact, toned athletic build, small-to-medium breasts",col:"cobalt blue",
    out:"a clear river gorge with a high diving rock",light:"sparkling river light, spray",room:"a riverside cottage room",bath:"a clear river pool under a mossy waterfall"},
  fx:"water spray, ripples",mot:"kingfisher",mot2:"diving-kingfisher",tmot:"ripple",emb:"diving-kingfisher",pk:"a Cramorant diving into the river beside her",
  words:[["A coral cutout dress","A tangerine cutout dress"],["an underwater coral reef with sunbeams and bubbles","a crystal-clear river pool with sunbeams and bubbles"],["coral spear","fishing spear"],["sharp-toothed smirk","cocky smirk"],["sharp-toothed grin","cocky grin"],["toothy grin","cocky grin"],["toothy mouth","open mouth"],["with sharp teeth","with a cocky smile"],["her sharp teeth","her cocky smile"],["careful with her sharp teeth","careful with her teeth"],["sharp teeth","grin"],
    ["shark tooth earrings","kingfisher-feather earrings"],["shark-tooth necklace","turquoise bead necklace"],["shark-tooth pendant","kingfisher pendant"],["shark-tooth clasp","kingfisher clasp"],["fin-shaped train","wing-shaped train"],["tooth-trimmed hood","feather-trimmed hood"],
    ["jagged tooth-edged neckline","feather-edged neckline"],["shark fins and cresting waves","diving kingfishers and ripples"],["shark teeth","turquoise beads"],["wave-and-fin","wave-and-wing"],["sharkskin shoulder wrap","feathered shoulder wrap"],
    ["Predator and prey","Dive and catch"],["I bite♡","I dive♡"],["Bite?♡","Dive?♡"],["shark-fin hooded sweatshirt","kingfisher hooded sweatshirt"],["shark-fin hood","feathered hood"],["hooded onesie with a fin","hooded onesie with a little beak"],
    ["plush spa headband with a shark fin","plush spa headband with little blue feathers"],["shark tail fin","short blue tail feathers"],["fin-like ears","feathered ears"],["blue ocean margarita","blue lagoon cocktail"],["shark skin stockings","cobalt stockings"],
    ["An ocean elemental","A river elemental"],["a bikini of churning seawater","a bikini of rushing river water"],["a coral palace beneath the waves","a crystal palace behind a waterfall"],
    ["sharks and rays","sharks and rays"],["passing shark","passing shark"],["sharks","sharks"],["shark tank","shark tank"]],
  colors:[["steel blue","cobalt blue"],["steel-blue","cobalt-blue"],["Steel blue","Cobalt blue"],["coral red","tangerine orange"],["coral-red","tangerine-orange"]]}};
