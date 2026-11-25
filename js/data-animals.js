/* ---- v296: Animal costumes. Twenty lewd, revealing animal costumes for every Academy girl, in her regular wardrobe
   (their own "Animal costumes" shelf, beside Costumes and cosplay). They are costumes worn by the girls (fake ears,
   fake tails), never animals in the picture. All adult women (18+ by their biographies); the studio's minor safeguard
   still applies. Each look's Notes hold a line of Danbooru tags, each one checked against the Danbooru tag list
   (scratch: tagcheck.js). Colours come from each girl's own palette. Keys are "zoo01".."zoo20": most House names are
   animals, so a key like "zoobee" would end in a House name and the purge would take it for a girl. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.set||typeof START==="undefined"||typeof tplById!=="function")return;
  const H=ACAD.HOUSES.slice();
  const must=set=>`an anime style with high detail, ${set}, and particular emphasis on highly detailed skin, hair and eyes`;
  const FAKE="fake animal ears, fake tail, animal costume, revealing clothes";
  /* [key, set label, outfit name, items, expressions, poses, setting, Danbooru tags, theme, extra c] */
  const L=[
  ["zoo01","Cat Costume","Cat lingerie",{bra:["cat lingerie bra with a cat-shaped keyhole cutout","@primary"],panties:["cat lingerie panties with a little bow","@primary"],headwear:["fluffy cat ears headband","@primary"],tailPiece:["long cat tail with a ribbon bow","@primary"],gloves:["fluffy paw gloves","@secondary"],neckAccessory:["choker with a jingle bell","@secondary"],legwear:["thighhighs","@primary"]},
    ["playful 'nya' smile","sly, half-lidded cat smile","pouty, demanding look"],
    ["in a paw pose on the bed, hips raised","stretching like a cat on the rug, back arched","sitting with her knees together, paws curled at her chin"],
    "a cozy bedroom with fairy lights",
    "cat lingerie, cat cutout, cleavage cutout, cat ears, cat tail, tail bow, paw gloves, neck bell, choker, thighhighs, paw pose, "+FAKE,"a cat lingerie costume"],
  ["zoo02","Puppy Costume","Puppy",{bra:["micro bikini top","@primary"],panties:["micro bikini bottom","@primary"],headwear:["floppy dog ears headband","@secondary"],tailPiece:["wagging fluffy dog tail","@secondary"],gloves:["dog paw gloves","@secondary"],neckAccessory:["studded collar with a bone tag","@primary"]},
    ["eager, tongue-out grin","happy, panting smile","begging, puppy-eyed look"],
    ["kneeling with her paws raised, begging","on all fours, tail up, looking back","sitting back on her heels, head tilted"],
    "a sunny living room",
    "dog ears, dog tail, paw gloves, collar, micro bikini, tongue out, paw pose, "+FAKE,"a puppy costume"],
  ["zoo03","Fox Costume","Fox",{top:["short off-shoulder kimono, falling open with nothing underneath","@primary"],headwear:["fluffy fox ears headband","@secondary"],tailPiece:["huge fluffy fox tail","@secondary"],neckAccessory:["fur collar","white"],legwear:["thighhighs and wooden sandals","white"]},
    ["sly, foxy smirk","teasing, narrow-eyed smile","playful wink behind her sleeve"],
    ["kneeling, kimono slipping off her shoulders","peeking out from behind her tail","standing with one knee raised, hand in a fox sign"],
    "a shrine path lit by paper lanterns at night",
    "fox ears, fox tail, short kimono, off shoulder, cleavage, no bra, fur collar, thighhighs, fox shadow puppet, "+FAKE,"a fox costume"],
  ["zoo04","Snow Bunny","Fluffy bunny",{bra:["fluffy white fur bikini top","white"],panties:["fluffy white fur bikini bottom","white"],headwear:["floppy rabbit ears headband","white"],tailPiece:["round fluffy rabbit tail","white"],legwear:["fur-trimmed boots","white"],wristAccessory:["fluffy fur cuffs","white"]},
    ["sweet, bashful smile","bouncy, excited grin","shy look from behind her ears"],
    ["hopping with her hands up like paws","sitting in the snow, knees drawn up","bending forward, fluffy tail toward the viewer"],
    "a snowy forest clearing",
    "rabbit ears, rabbit tail, fur bikini, fur-trimmed bikini, fur boots, fur-trimmed legwear, cleavage, navel, snow, "+FAKE,"a fluffy bunny costume"],
  ["zoo05","Cow Print","Cow print",{top:["cow-print highleg leotard with a deep cleavage cutout","white"],headwear:["cow ears and little horns","white"],tailPiece:["cow tail with a ribbon","white"],neckAccessory:["cowbell collar","gold"],legwear:["cow-print thighhighs","white"]},
    ["sleepy, gentle smile","flustered, blushing 'moo'","soft, motherly smile"],
    ["squeezing her breasts together, cowbell ringing","kneeling in the straw, leaning forward","standing with her hands behind her back, chest out"],
    "a sunny barn with hay bales",
    "cow print, cow ears, cow horns, cow tail, cowbell, cow print thighhighs, highleg leotard, cleavage cutout, cleavage, cow girl, "+FAKE,"a cow-print costume"],
  ["zoo06","Wolf Costume","Wolf",{top:["torn fur-trimmed crop top that barely covers her breasts","gray"],bottom:["tiny torn fur shorts","gray"],headwear:["wolf ears headband","@secondary"],tailPiece:["bushy wolf tail","@secondary"],gloves:["clawed paw gloves","@secondary"]},
    ["fierce, fanged grin","hungry, predatory stare","howling, head thrown back"],
    ["crouching low, ready to pounce","howling under the moon, arms spread","prowling on all fours toward the viewer"],
    "a moonlit forest",
    "wolf ears, wolf tail, fur trim, torn clothes, crop top, underboob, short shorts, paw gloves, fangs, full moon, "+FAKE,"a wolf costume"],
  ["zoo07","Mouse Costume","Mouse",{top:["tiny gray highleg leotard","@primary"],headwear:["round mouse ears headband","@primary"],tailPiece:["long thin mouse tail with a bow","@primary"],legwear:["sheer pantyhose","black"],neckAccessory:["detached collar with a bowtie","@secondary"]},
    ["timid, blushing smile","mischievous, cheese-stealing grin","squeaky, surprised gasp"],
    ["nibbling a cheese wedge, kneeling","peeking out from behind a cupboard","curled up small, glancing up"],
    "a pantry full of cheese wheels",
    "mouse ears, mouse tail, highleg leotard, pantyhose, detached collar, bowtie, groin, tail bow, "+FAKE,"a mouse costume"],
  ["zoo08","Tiger Costume","Tiger",{bra:["tiger-print micro bikini top","orange"],panties:["tiger-print micro bikini bottom","orange"],headwear:["tiger ears headband","orange"],tailPiece:["striped tiger tail","orange"],gloves:["tiger paw gloves","orange"],legwear:["tiger-striped thighhighs","orange"]},
    ["fierce, playful growl","confident, predatory grin","smug, lazy look"],
    ["lounging across a rock, tail curled","clawing the air, growling","crouching on all fours, hips high"],
    "a jungle temple ruin in green light",
    "tiger ears, tiger tail, tiger print, animal print, micro bikini, paw gloves, striped thighhighs, fangs, "+FAKE,"a tiger costume"],
  ["zoo09","Leopard Costume","Snow Leopard",{top:["leopard-print bodycon micro dress, strapless and barely covering her ass","yellow"],headwear:["leopard ears headband","yellow"],tailPiece:["spotted leopard tail","yellow"],legwear:["fishnet pantyhose and stiletto heels","black"],neckAccessory:["gold chain choker","gold"]},
    ["sultry, half-lidded stare","cocky smirk","glamorous, pouty lips"],
    ["walking the runway, hips swaying","leaning on a bar, ass out","sitting with her legs crossed high on a stool"],
    "a dark nightclub with a velvet rope",
    "leopard ears, leopard tail, leopard print, animal print, strapless dress, short dress, fishnet pantyhose, high heels, choker, "+FAKE,"a leopard costume"],
  ["zoo10","Lioness Costume","Lion",{bra:["gold bikini top","gold"],panties:["gold bikini bottom","gold"],headwear:["round lion ears headband","@primary"],tailPiece:["lion tail with a tufted end","@primary"],neckAccessory:["big fluffy mane-like fur collar","@primary"],wristAccessory:["gold bangles and anklets","gold"]},
    ["proud, regal smile","fierce roar","lazy, satisfied look"],
    ["lounging on a throne, one leg over the arm","standing tall on a rock, hands on her hips","stretching out in the sun, chest up"],
    "a golden savanna at sunset",
    "lion ears, lion tail, lion girl, fur collar, gold bikini, bikini, jewelry, anklet, navel, cleavage, "+FAKE,"a lioness costume"],
  ["zoo11","Bear Hoodie","Bear",{top:["unzipped fluffy bear-ear hooded jacket with nothing underneath","@primary"],panties:["cotton panties","@secondary"],legwear:["fluffy bear paw slippers","@primary"]},
    ["sleepy, cuddly smile","grumpy, pouting cuteness","shy blush behind her sleeves"],
    ["hugging a giant teddy bear, jacket open","curled up on the couch, hood up","standing, holding the jacket open"],
    "a cozy cabin by the fireplace",
    "bear ears, bear hood, animal hood, hooded jacket, open jacket, no bra, cleavage, navel, panties, no pants, paw shoes, stuffed animal, "+FAKE,"a bear hoodie"],
  ["zoo12","Sheep Costume","Sheep",{bra:["fluffy wool bikini top","white"],panties:["fluffy wool bikini bottom","white"],headwear:["curled sheep horns and sheep ears","@primary"],tailPiece:["little fluffy sheep tail","white"],neckAccessory:["collar with a little bell","@secondary"],legwear:["fluffy leg warmers","white"]},
    ["dreamy, sleepy smile","soft, bashful blush","gentle, yawning smile"],
    ["lying on a fluffy rug, half asleep","sitting in a meadow, hugging her knees","standing with her hands clasped shyly"],
    "a soft green meadow under fluffy clouds",
    "sheep horns, sheep ears, fur bikini, neck bell, leg warmers, navel, cleavage, "+FAKE,"a sheep costume"],
  ["zoo13","Reindeer Costume","Reindeer",{bra:["red fur-trimmed santa bikini top","red"],panties:["red fur-trimmed bikini bottom","red"],headwear:["reindeer antlers headband with a jingle bell","brown"],tailPiece:["short fluffy deer tail","brown"],legwear:["fur-trimmed thighhighs","red"],neckAccessory:["jingle bell choker","gold"]},
    ["cheerful, festive smile","giggling, rosy-cheeked","cheeky wink"],
    ["sitting under the christmas tree, presents around her","kneeling in the snow, antlers jingling","pulling a sleigh rope over her shoulder"],
    "a living room with a christmas tree and a crackling fire",
    "reindeer antlers, fake antlers, santa bikini, fur-trimmed bikini, fur trim, fur-trimmed legwear, neck bell, christmas, "+FAKE,"a reindeer costume"],
  ["zoo14","Panda Costume","Panda",{top:["black-and-white panda bodysuit with a cleavage cutout and open sides","white"],headwear:["round panda ears headband","black"],tailPiece:["tiny round panda tail","black"],gloves:["black panda paw gloves","black"],legwear:["black thighhighs","black"]},
    ["lazy, content smile","sleepy, chewing bamboo","playful, rolling giggle"],
    ["lying on her back chewing bamboo","rolling on her side, paws in the air","sitting cross-legged with a bamboo stalk"],
    "a bamboo grove in soft green light",
    "panda ears, bodysuit, cleavage cutout, sideboob, paw gloves, thighhighs, "+FAKE,"a panda costume"],
  ["zoo15","Tanuki Costume","Tanuki",{top:["very short open yukata tied loosely, slipping off her shoulders","brown"],headwear:["round raccoon ears and a leaf on her head","brown"],tailPiece:["big striped raccoon tail","brown"],panties:["fundoshi-style loincloth","white"],legwear:["wooden sandals","brown"]},
    ["mischievous, trickster grin","sly, sideways glance","flustered, caught-out blush"],
    ["kneeling with a leaf on her head, about to transform","sitting with her knees apart, yukata gaping","peeking out from behind a sake jug"],
    "a summer festival at night",
    "raccoon ears, raccoon tail, leaf on head, short kimono, off shoulder, cleavage, fundoshi, thighs, "+FAKE,"a tanuki costume"],
  ["zoo16","Squirrel Costume","Squirrel",{top:["tiny cropped fur-trimmed vest worn open","@primary"],bottom:["tiny fur-trimmed short shorts","@primary"],headwear:["tufted squirrel ears headband","@primary"],tailPiece:["huge curled squirrel tail","@primary"],legwear:["fur boots","@primary"]},
    ["chipper, cheeky grin","cheeks puffed, holding an acorn","bright, excited smile"],
    ["holding an acorn to her lips","curled up in a tree hollow, tail around her","climbing a tree branch, looking back"],
    "an autumn forest with golden leaves",
    "squirrel ears, squirrel tail, open vest, no bra, cleavage, short shorts, fur trim, fur boots, autumn leaves, "+FAKE,"a squirrel costume"],
  ["zoo17","Bee Costume","Bee",{top:["yellow-and-black striped highleg leotard with a plunging neckline","yellow"],headwear:["bee antennae headband","black"],wingPiece:["small sheer insect wings (costume)","white"],legwear:["striped thighhighs","yellow"]},
    ["sweet, buzzing smile","bubbly, excited grin","honey-sweet, sultry look"],
    ["holding a honey dipper to her lips","bending over a flower bed, hips high","fluttering on tiptoes, arms out"],
    "a sunny flower garden",
    "bee girl, antennae, insect wings, striped clothes, highleg leotard, plunging neckline, cleavage, striped thighhighs, honey, revealing clothes, animal costume","a bee costume"],
  ["zoo18","Bat Costume","Bat",{top:["black latex bandeau that barely covers her nipples","black"],bottom:["black latex micro shorts","black"],headwear:["bat wing headband","black"],wingPiece:["black bat wings (costume)","black"],legwear:["fishnet thighhighs and platform boots","black"],neckAccessory:["spiked choker","black"]},
    ["fanged, playful smirk","dark, sultry stare","giggling, gothic grin"],
    ["hanging upside down from a branch, arms crossed","wrapping her wings around herself","perched on a gravestone, legs crossed"],
    "a misty graveyard under a full moon",
    "bat wings, head wings, latex, tube top, short shorts, fishnets, thighhighs, choker, fangs, full moon, revealing clothes, animal costume","a bat costume"],
  ["zoo19","Shark Costume","Shark",{top:["shark-hood highleg one-piece swimsuit, cut low at the sides","@primary"],headwear:["shark hood with little fins and teeth","@primary"],tailPiece:["shark tail","@primary"]},
    ["toothy, sharp grin","chomping, playful snarl","smug, smirking"],
    ["chomping playfully at the viewer","lying on her stomach at the pool edge, tail up","standing in the shallows, arms behind her head"],
    "a sunny poolside",
    "shark hood, shark tail, shark costume, highleg, one-piece swimsuit, sideboob, sharp teeth, poolside, wet, "+FAKE,"a shark costume"],
  ["zoo20","Snake Charmer","Snake",{bra:["snake-print bikini top","green"],bottom:["sheer sarong with a high slit over a snake-print thong","green"],headwear:["golden snake circlet","gold"],wristAccessory:["coiled gold snake armlets and anklets","gold"]},
    ["hypnotic, half-lidded stare","sly, forked-tongue smile","seductive, swaying smile"],
    ["swaying her hips in a slow dance","reclining on silk cushions, legs crossed","coiling her arms above her head"],
    "a desert palace hall with silk cushions and lanterns",
    "snake print, animal print, bikini, sarong, side slit, thong, armlet, anklet, circlet, navel, cleavage, revealing clothes, animal costume","a snake costume"]];

  {const seenI=new Set(),G="Animal costumes";
    L.forEach(([, ,,items,ex,po,,,,c])=>{
      Object.entries(items).forEach(([f,a])=>{const k=f+"|"+a[0];if(seenI.has(k))return;seenI.add(k);ACAD.items(f,[a[0]],"LS","costume")});
      ACAD.opts("expression",ex,G);ACAD.opts("posture",po,G);
      Object.entries(c||{}).forEach(([f,v])=>{if(typeof v==="string")ACAD.opts(f,[v],G)})})}
  let after="Academy Pokemon Trainers";
  const labels=[];
  L.forEach(([suf,name,oname,items,ex,po,set,tags,theme,c])=>{
    const label="Academy "+name;
    ACAD.set(label,after,suf,theme.replace(/^an? /,""),"costume",{tags:["animal costume","revealing"].concat(tags.split(",").slice(0,3).map(s=>s.trim())),oname,c:Object.assign({age:"woman"},c||{})},
      H.map((h,i)=>[h,items,ex[i%ex.length],po[i%po.length],theme,{}]));
    after=label;labels.push(label);
    H.forEach(h=>{const t=tplById(h+suf);if(!t)return;t.out=Object.assign({},t.out,{must:must(set),notes:tags});if(typeof t.blurb==="string")t.blurb=t.blurb.replace(/: \. /,". ")});
  });
  if(Array.isArray(ACAD.CATS)){const at=ACAD.CATS.findIndex(c=>c[0]==="Costumes");ACAD.CATS.splice(at<0?ACAD.CATS.length:at+1,0,["Animal costumes",labels])}
  ACAD.ANIMALS={looks:L.length,girls:H.length};
})();
