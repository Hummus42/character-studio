/* ---- v296: the wardrobe, reorganised. Every girl's looks are filed into clearer shelves: regular wardrobe first
   (robes, everyday, revealing everyday, occasions, seasons, travel, sport, work, costumes, animal costumes,
   traditional, fantasy, sci-fi, story), then After dark (sensual, tease, exhibition, body, lewd costumes, pet play,
   food play, kink, bondage, power play, toys, explicit). ACAD.CATS is rebuilt in place (other files hold the same
   array), so the studio picker, the Cast picker and the Encyclopedia all follow it. Any set not named here stays on its
   old shelf (or "More looks"), so nothing can drop out. Loads after every file that adds looks. ---- */
(function(){
  if(typeof ACAD==="undefined"||!Array.isArray(ACAD.CATS)||typeof PRESET_GROUPS==="undefined")return;
  const A=s=>s.split("|").map(x=>x==="Academy"?x:"Academy "+x);
  const REG=[
    ["Robes and faculty",A("Academy|Signature|House Regalia|Group Colors|Headmistresses|Headmistress Night")],
    ["Everyday life",A("Day Off|Lazy Sunday|Pajama Day|Morning After|Study Night|Cooking Club|Spa Day|Onsen")],
    ["Everyday, revealing",A("Spring Fling|Summer Heat|Autumn Tease|Winter Warmer|Gym Bunny|See-Through Yoga|Lowleg Jeans|Caught in the Rain|Lazy Day Tank|Unbuttoned Office|Torn and Teasing|Sideless Errands|Center Opening|Sheer Mesh Night|Answering the Door|Pasties and Leather")],
    ["Nights out and occasions",A("Date Night|Night Out|Ballgowns|Graduation|Valentine's|New Year's Eve")],
    ["Seasons and holidays",A("Spring Blossoms|Summer Days|Autumn Harvest|Winter Break|Festival|Halloween|Christmas")],
    ["Travel and outdoors",A("Tropical Island|Vacation|Road Trip|City Postcards|Hiking")],
    ["Sports and stage",A("Cheerleaders|Swim Team|Beach Volleyball|Sports Day|Gym Rats|Locker Room|Idol Concert|Music Video")],
    ["Work and uniforms",A("Housewives|Cafe Maids|French Maids|Bartenders|Corporate|Nurses|Flight Attendants|Racing Queens|Firefighters|Police|Military")],
    ["Costumes and cosplay",A("House Costume|Waifus|Cosplay|Pokemon Trainers|Bunny Girls|Latex|Cowgirls|Pirates|Noir")],
    ["Animal costumes",A("Cat Costume|Puppy Costume|Fox Costume|Snow Bunny|Cow Print|Wolf Costume|Mouse Costume|Tiger Costume|Leopard Costume|Lioness Costume|Bear Hoodie|Sheep Costume|Reindeer Costume|Panda Costume|Tanuki Costume|Squirrel Costume|Bee Costume|Bat Costume|Shark Costume|Snake Charmer")],
    ["Traditional and period",A("Qipao|Geishas|Belly Dancers|Victorian|Steampunk|Prehistoric")],
    ["Fantasy",A("Monster Girls|Mermaids|Sirens|Elves|Fairies|Witches|Succubi|Vampires|Angels|Goddesses|Royal Court|Elementals|Magical Heroines|Battle Maidens|Knights|Dragon Riders|Kunoichi")],
    ["Sci-fi and heroes",A("Superheroines|Spider Heroines|Aliens|Space Pilots|Cyberpunk|Post-Apocalypse")],
    ["Story and drama",A("Dungeon Trap|Funeral|Breakup|Pregnancy Test")]];
  const AFTER=[
    ["Sensual",A("Boudoir|Lingerie Try-On|Artists' Models|Pregnant|First Time|Afterglow")],
    ["Tease",A("Sheer Babydoll|Crotchless Lace|Fishnet Bodystocking|Micro Bikini|Slingshot Swimsuit|Naked Apron|His Shirt Only|Gift-Wrapped|Towel Drop|Virgin Killer Sweater|Wet T-Shirt|Naked Bandages|Pasties and Tape|Body Paint")],
    ["Exhibition",A("Mirror Selfie|Camgirl Stream|No Panties Breeze|Panty Drop|Trench Coat Flash|Nudist Beach|Strip Club|Pole Dancer|Bathroom Show|Public Exhibition|Public Masturbation|Public Pee|Highest Bidder")],
    ["Body focus",A("Oiled Up|Tan Lines|Post-Workout|Au Naturel|Topless|Peach Focus|Armpit Tease|Foot Worship|Bimbo Glam|Muscle Goddess|Thick and Soft|Gigantic Breasts|Futanari|Glitter Glam|Body Jewelry|Pierced|Womb Tattoo|Written On|Lipstick Marks")],
    ["Furry",A("Furry")],
    ["Lewd costumes and roleplay",A("Classic Bunny|Reverse Bunny Suit|Maid Bikini|Lewd Maid|Lewd Nurse|Office Lady|Lewd Nun|Lewd Shrine Maiden|Harem Dancer")],
    ["Pet play",A("Collar and Leash|Kitten Play|Pony Play|Hucow|Pet Bowl Training")],
    ["Food play",A("Whipped Cream Bikini|Chocolate Valentine|Honey Drizzle|Nyotaimori")],
    /* v320: fetish wear, sensation play, bondage and humiliation no longer overlap (Kink and fetish was split, Power play
       and the BDSM humiliation shelf became Humiliation, and the duplicate looks were merged in data-afterdark.js) */
    ["Fetish wear",A("Leather Harness|Latex Catsuit|Dominatrix|Chastity Belt")],
    ["Sensation play",A("Spanked|Nipple Clamps|Wax Play|Tickle Torture|Denied")],
    ["Bondage",A("Shibari|Rope Suspension|Breast Bondage|Hogtie|Frogtie|Armbinder|Straitjacket|Spreader Bar|Shackles and Chain|Pillory|Predicament Bondage|Inspection|Face Down, Ass Up|Gag and Blindfold|Cleave Gag|Tape Gag|Sensory Deprivation|Latex Hood")],
    ["Humiliation",A("Dogeza|Living Furniture|Sign of Shame|Degrading Words|Runny Makeup|Used Condom Display")],
    ["Toys",A("Wand Vibrator|Egg Vibrator|Remote Vibrator in Public|Clothed Masturbation|Dildo Riding|Shower Head|Anal Beads|Jeweled Plug|Sex Machine")],
    ["Explicit",A("Office Hours|Library After Hours|Fucked Silly|Cum-Covered|Dripping Aftermath|Ruined")],
    ["Impregnation positions",A("Impregnation: Missionary|Impregnation: Mating press|Impregnation: Riding|Impregnation: From behind|Impregnation: Prone bone|Impregnation: Against the wall|Impregnation: Legs on his shoulders|Impregnation: Spooning|Impregnation: Full nelson|Impregnation: Reverse cowgirl|Impregnation: Lotus|Impregnation: Piledriver")]];
  const OLD=ACAD.CATS.map(([c,l])=>[c,l.slice()]),OLD_AFTER=new Set(ACAD.AFTER_CATS||["Sensual","Exhibition","Explicit"]);
  const exists=l=>PRESET_GROUPS.start.some(g=>g.label===l);
  const NEW=REG.concat(AFTER).map(([c,l])=>[c,l.slice()]),placed=new Set(NEW.flatMap(([,l])=>l));
  /* anything not named above keeps its old shelf (regular leftovers in "More looks", After dark ones in "More after dark") */
  const left=[];
  OLD.forEach(([c,ls])=>ls.forEach(l=>{if(placed.has(l))return;placed.add(l);left.push(l);
    const same=NEW.find(x=>x[0]===c);if(same){same[1].push(l);return}
    const name=OLD_AFTER.has(c)?"More after dark":"More looks";let m=NEW.find(x=>x[0]===name);
    if(!m){m=[name,[]];if(OLD_AFTER.has(c))NEW.push(m);else NEW.splice(REG.length,0,m)}m[1].push(l)}));
  /* named sets that do not exist (purged, or never built) are dropped, and so are empty shelves */
  const final=NEW.map(([c,l])=>[c,l.filter(exists)]).filter(([,l])=>l.length);
  ACAD.CATS.length=0;ACAD.CATS.push(...final);
  ACAD.AFTER_CATS=AFTER.map(([c])=>c).concat(["More after dark"]);
  /* the studio's own list follows the same order */
  {const order=ACAD.CATS.flatMap(([,l])=>l).concat(["Academy Men"],ACAD.SCENE_ORDER||[]);
   const ac=PRESET_GROUPS.start.filter(g=>/^Academy/.test(g.label)),rest=PRESET_GROUPS.start.filter(g=>!/^Academy/.test(g.label));
   const pos=new Map(ac.map((g,i)=>[g,i]));
   ac.sort((a,b)=>((order.indexOf(a.label)+1||999)-(order.indexOf(b.label)+1||999))||pos.get(a)-pos.get(b));
   PRESET_GROUPS.start.length=0;PRESET_GROUPS.start.push(...rest,...ac)}
  /* v297: sets added after part-13 built the outfit presets (revealing everyday, animal costumes, the newer After dark
     looks) get theirs now, so the Outfit tab's browser has every set */
  let added=0;
  if(ACAD.addOutfitSet&&typeof OUTFIT_PRESETS!=="undefined"){
    const have=new Set(OUTFIT_PRESETS.map(p=>(/^acad_o_\d+_(.+)$/.exec(p.id)||[])[1]).filter(Boolean));
    const after=new Set(ACAD.AFTER_CATS);
    ACAD.CATS.forEach(([c,ls])=>ls.forEach(l=>{if(have.has(l.replace(/\W+/g,"").toLowerCase()))return;
      try{added+=ACAD.addOutfitSet(l,after.has(c)?"Explicit":c,c==="Animal costumes"||l==="Academy House Costume")}catch(e){}}));
  }
  ACAD.WARDROBE_ORDER={shelves:ACAD.CATS.length,leftovers:left,outfitsAdded:added};
})();
