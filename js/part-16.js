(function(){
  if(typeof TEMPLATES==="undefined"||typeof tplById!=="function")return;
  const HNm=h=>(typeof ACAD!=="undefined"&&ACAD.HNAME&&ACAD.HNAME[h])||h.charAt(0).toUpperCase()+h.slice(1);
  Object.entries(BOYS257).forEach(([h,b])=>{const t=tplById(h+"man");if(!t)return;
    t.name=b.name+", "+HNm(h)+"'s boyfriend";t.blurb=b.blurb;t.bio=Object.assign({},t.bio||{},b.bio,{status:"In a relationship",romType:"boyfriend"});
    /* her biography: his name where it said what he does */
    if(typeof BIOS==="object"&&BIOS[h]){const g=BIOS[h],p=String(g.partner||"");
      const consort=/\bconsort\b/i.test(p);
      const secret=/secret girlfriend/i.exec(p)?p.split(/[,(]/)[0].trim():"";
      g.partner=b.name+(consort?", her consort":", her boyfriend")+(secret?` (and ${secret}, her secret girlfriend)`:"")}});
})();
/* ---- v215: the Academy's ten groups, every girl's relationships, and a clean scene list (lore and starting points; nothing
   here reaches the prompt).
   Groups: The Legends · The Pride · The Pack · The Frost · The Deep · The Talons (birds of prey) · The Plumes (birds of paradise)
   · The Grove · The Coil (reptiles and amphibians) · The Hive (bugs). Five rivalries: Legends–Coil, Pride–Pack, Frost–Deep,
   Talons–Grove, Plumes–Hive.
   Relationships (REL below) are the one source for the biographies' Best friends, Friends, Rivals and Secret girlfriend,
   and for who character 2 is in the best-friend, rival and secret-girlfriend scenes. audit/rel215.py checks them on every build.
   Scenes: everything except her boyfriend's romance and intimacy sets, best friends, rivals, secret girlfriends and the anime
   close-ups goes to the Archive (still in Starting points, out of the way). */
const ACAD_GROUPS=[
  {id:"legends",name:"The Legends",kind:"Mythic beasts",leader:"griffin",rival:"coil",members:["griffin","dragon","phoenix","unicorn","kitsune","pegasus","kirin","sphinx","siren","manticore"],
    motto:"Born to be remembered.",hangout:"The Champions' Hall, under the old banners",
    lore:"The Academy's living legends: champions, warriors and the girls the old stories are about. Kitsune tricks, Sphinx riddles, Siren sings, Pegasus flies, Kirin stands guard and Manticore fights anyone who looks at their table wrong. They've held the best table in the dining hall since the day they arrived, and the Coil has wanted it just as long."},
  {id:"pride",name:"The Pride",kind:"Big cats",leader:"lioness",rival:"pack",members:["lioness","tiger","jaguar","cougar","cheetah","leopard","panther","lynx","caracal","serval"],
    motto:"We hunt together.",hangout:"The sunlit courtyard steps everyone calls Pride Rock",
    lore:"The biggest group at Everspire: a queen and her cats. They bicker, sulk and challenge each other constantly, then close ranks the second anyone from the Pack looks at one of them wrong."},
  {id:"pack",name:"The Pack",kind:"Canines",leader:"wolf",rival:"pride",members:["wolf","fox","arcticfox","coyote","hyena","jackal","husky","dingo","fennec","shiba"],
    motto:"The strength of the wolf is the pack.",hangout:"The old forest trail behind the stables, around a bonfire",
    lore:"Loyal and loud: girls who would follow Wolf off a cliff, and who have been at war with the Pride since before any of them can remember why."},
  {id:"frost",name:"The Frost",kind:"Polar",leader:"orca",rival:"deep",members:["orca","penguin","harpseal","narwhal","polarbear","otter","reindeer","beluga","ermine","puffin"],
    motto:"Stay cool.",hangout:"The frozen lake in winter and the cocoa bar the rest of the year",
    lore:"The coldest corner of the Academy and the warmest group in it. Orca runs them like a swim team, Penguin and Beluga keep them cheerful, Harp Seal keeps them napping, Narwhal tells them what's coming, Polar Bear bakes for everyone, Puffin pranks everyone and Ermine is convinced she outranks everyone."},
  {id:"deep",name:"The Deep",kind:"Sea",leader:"kraken",rival:"frost",members:["kraken","shark","dolphin","jellyfish","salmon","seahorse","manta","koi","eel","angelfish"],
    motto:"Still waters run deep.",hangout:"The aquarium wing after hours",
    lore:"Mysterious, competitive and quietly running half the Academy's clubs. Kraken rules from the aquarium wing, Manta glides through it, Eel slips through every locked door, Koi brings the luck, Seahorse writes the love letters and Angelfish dances for all of them. The pool is the Deep's territory, and the Frost keeps swimming in it."},
  {id:"talons",name:"The Talons",kind:"Birds of prey",leader:"raven",rival:"grove",members:["raven","crow","owl","eagle","falcon","hawk","vulture","osprey","magpie","snowyowl"],
    motto:"Strike from above.",hangout:"The observatory tower and the rooftops above it",
    lore:"The Academy's hunters, thieves, champions and night watchers. Raven runs the Talons like a spy network and knows everything that happens at Everspire before it happens; Eagle flies their colors, Hawk and Falcon hunt for them, Snowy Owl watches the sky, and the Grove has been losing things to Crow and Magpie since their first term."},
  {id:"plumes",name:"The Plumes",kind:"Birds of paradise",leader:"peacock",rival:"hive",members:["peacock","swan","flamingo","crane","lovebird","hummingbird","macaw","cockatoo","birdofparadise","kingfisher"],
    motto:"Be seen.",hangout:"The glass conservatory and its fountain",
    lore:"The Academy's showstoppers: dancers, divas, singers, princesses and romantics who set every trend at Everspire. They throw the best parties, Macaw sings at all of them, Cockatoo and Bird of Paradise fight over every dance floor, and the Hive keeps crashing them over the conservatory's flowers."},
  {id:"grove",name:"The Grove",kind:"Woodland",leader:"stag",rival:"talons",members:["stag","badger","panda","raccoon","rat","rabbit","squirrel","hedgehog","redpanda","koala"],
    motto:"Deep roots.",hangout:"The greenhouse and the old oak behind it",
    lore:"The coziest group at Everspire: bakers, nappers, tinkerers, tea-brewers, bookworms and two very good thieves. Rabbit hugs everyone, Squirrel hides snacks in every tree, Hedgehog reads in the garden, Red Panda keeps the teapot hot and Koala sleeps through all of it. Gentle until someone steals from one of them, which the Talons do constantly."},
  {id:"coil",name:"The Coil",kind:"Reptiles and amphibians",leader:"serpent",rival:"legends",members:["serpent","cobra","viper","chameleon","gecko","crocodile","iguana","axolotl","frog","turtle"],
    motto:"Patience is venom.",hangout:"The emerald drawing room, by invitation only",
    lore:"The Academy's cold-blooded club, founded by an heiress who wants the Legends' table and is very, very patient. After the bugs left to start the Hive, Serpent chose her new members carefully, and now the Coil is ten strong and coming for that table."},
  {id:"hive",name:"The Hive",kind:"Bugs",leader:"bee",rival:"plumes",members:["bee","scorpion","mantis","spider","firefly","butterfly","ladybug","moth","dragonfly","beetle"],
    motto:"Many wings, one sting.",hangout:"The old apiary and the moth-lit greenhouse loft",
    lore:"The bugs split from the Coil and started their own court, and they want the conservatory's flowers. Scorpion held the Hive together until its queen arrived; now Bee rules from the apiary tower, and the Hive has never been busier."}];
/* v249: the Synth and the Void, two groups that stand apart from Dawn and Dusk (sv249data.js) */
if(typeof SV249!=="undefined")SV249.groups.forEach(g=>{if(!ACAD_GROUPS.some(x=>x.id===g.id))ACAD_GROUPS.push(JSON.parse(JSON.stringify(g)))});
(function(){
  if(typeof ACAD==="undefined")return;
  /* v241: the canon changes layer, applied before anything below is worked out from the data */
  if(ACAD.canonApply){ACAD.canonApply("groups",ACAD_GROUPS);if(ACAD.HOUSES)ACAD.canonApply("houses",ACAD.HOUSES);if(ACAD.HNAME)ACAD.canonApply("names",ACAD.HNAME);
    if(typeof BIOS==="object")ACAD.canonApply("bios",BIOS);if(ACAD.RELDATA)ACAD.canonApply("rel",ACAD.RELDATA)}
  ACAD.GROUPS=ACAD_GROUPS;
  const G={};ACAD_GROUPS.forEach(g=>{G[g.id]=g;g.members.forEach(h=>{G[h]=g})});
  ACAD.GROUP_OF=h=>{const g=G[h];return g&&g.members?g:null};
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);
  const gname=g=>g.name.replace(/^The /,"the ");
  const ROLE={
    griffin:"Leader. The undefeated champion leads the Legends from the front and has never let a challenge go unanswered, least of all one from Serpent.",
    dragon:"The Sword. Griffin's best friend and the Legends' fiercest fighter; nobody touches a Legend while Dragon is standing.",
    phoenix:"The Flame. The showstopper who never stays down; every comeback the Legends ever made was hers. Spends half her time with Lioness's Pride, which Griffin pretends not to notice.",
    unicorn:"The Heart. The gentle one who keeps the peace, the only Legend everyone else at Everspire actually likes.",
    lioness:"Leader. The queen of the Pride: every big cat at Everspire answers to her, eventually. She took the crown in her first week and has defended it against Cougar thirty-one times.",
    tiger:"The Muscle. The toughest fighter in the Pride and the Pack's least favorite person at Everspire.",
    jaguar:"The Right Hand. Lioness's enforcer and second-in-command, at least until Cougar takes the job from her (she won't).",
    cougar:"The Challenger. Challenges Lioness for the crown once a month and loses every time; the Pride's best climber and worst loser.",
    cheetah:"The Scout. The fastest girl alive carries every message, every rumor and every dare in the Pride, and always gets there first.",
    leopard:"The Sunshine. The sweetheart of the Pride, who everyone protects and nobody can stay mad at.",
    panther:"The Strategist. Plans every Pride scheme from her library tower, and is secretly best friends with the Pack's Coyote.",
    lynx:"The Spy. Sees everything, says nothing, and reports only to Lioness. Wages a private prank war with the Grove's Panda.",
    caracal:"The Wildcard. The smallest and feistiest of the Pride, who'll pounce on anyone, including Pack girls three times her size. Lioness adopted her on the spot.",
    wolf:"Leader. The Pack's alpha: tough, fair and impossible to scare, the only girl at Everspire who stares Lioness down without blinking.",
    fox:"The Trickster. The Pack's schemer, whose best friend is the Grove's Badger, which the Pack has learned to forgive.",
    arcticfox:"The Prankster. Fox's snow-white shadow and the Pack's walking chaos; half of the Pride's missing hair ties are in her room.",
    coyote:"The Drifter. The Pack's lone wolf, who comes and goes as she pleases, and whose best friend is the Pride's Panther (a scandal on both sides).",
    orca:"Leader. The Frost's captain, who runs her group like a swim team: early mornings, cold water, nobody left behind.",
    penguin:"The Sweetheart. The Frost's cheerful heart and unofficial mascot. The whole group guards her innocence fiercely, and Orca threatens anyone who tells a dirty joke near her.",
    harpseal:"The Snuggler. The Frost's sleepy soft spot, who naps through every meeting and is somehow always right about the snacks.",
    narwhal:"The Dreamer. The Frost's seer: Orca never makes a decision without hearing one of Narwhal's hunches first.",
    kraken:"Leader. The queen of the Deep: cool, quiet and always three moves ahead. The Frost has never once caught her by surprise.",
    shark:"The Enforcer. The Deep's cocky star athlete, who settles every argument with a race and has never lost one to the Frost.",
    dolphin:"The Splash. The Deep's bubbly star swimmer and Orca's rival in the pool; she'd switch groups for the Frost's cocoa bar if anyone asked.",
    jellyfish:"The Mystic. Drifts in and out of the Deep's meetings, and somehow always knows things nobody told her.",
    salmon:"The Perfectionist. Keeps the Deep's schedule, its finances and its grudges in perfect order.",
    raven:"Leader. The mastermind of the Talons, who runs her birds of prey like a spy network from the observatory tower.",
    crow:"The Thief. Steals whatever the Talons need (and plenty they don't); Raven's secret girlfriend and the Grove's public enemy number one.",
    owl:"The Scholar. The Talons' library and their oldest member; Raven asks her opinion and then does the opposite. Her best friend is the Grove's Rat, which nobody on either side is allowed to mention.",
    swan:"The Grace. Prima ballerina and Peacock's second-in-command; the reason the Plumes get invited everywhere.",
    crane:"The Poise. Keeps the Plumes' ceremonies, manners and seating charts perfect.",
    flamingo:"The Princess. The Plumes' most spoiled member, who funds every party and expects to be thanked for it.",
    peacock:"Leader. The vainest bird alive rules the Plumes from the conservatory fountain, and has never once been upstaged; the Hive's queen keeps trying.",
    lovebird:"The Romantic. The Plumes' matchmaker, responsible for at least six couples at Everspire and one disaster.",
    hummingbird:"The Messenger. The Plumes' fastest flirt and fastest gossip; a secret told to Hummingbird reaches every bird at Everspire in under an hour.",
    stag:"Leader. The Grove's gentle guardian, soft-spoken and unbending, who has never once let the Talons take one of her own.",
    badger:"The Hearth. Bakes for everyone, mothers everyone, and fights anyone who touches her friends; best friends with the Pack's Fox.",
    panda:"The Dozer. The Grove's sweetest and sleepiest member, locked in a prank war with the Pride's Lynx that she is somehow winning.",
    raccoon:"The Bandit. The Grove's thief and Crow's nemesis, who steals back everything the Talons take (and a little extra). Firefly's secret girlfriend.",
    rat:"The Fixer. Can get anything for anyone, for a price; the Grove's quartermaster, and Owl's best friend across enemy lines.",
    serpent:"Leader. The haughty heiress who founded the Coil, the Academy's cold-blooded club, to take the Legends' table, and who has been patiently plotting it ever since.",
    scorpion:"The Venom. The queen's right hand and the Hive's enforcer, who held the bugs together until Bee arrived. Left the Coil when the bugs and the reptiles split, and took the drawing room's best chair with her; her rivalry with Lioness is Academy legend.",
    bee:"Leader. The Hive's long-awaited queen, warm as honey and twice as sticky: she rules from the apiary tower, and the Plumes' Peacock has finally met someone she can't upstage.",
    mantis:"The Blade. The queen's bodyguard and the Hive's martial artist; nobody gets near Bee without going through her first.",
    spider:"The Widow. Spins the Hive's webs of rumor and secrets from her lace-draped attic; every Plume who has crossed the Hive has ended up tangled in one.",
    ladybug:"The Charm. The Hive's lucky charm and its sweetest member; even the Plumes like her, which drives Flamingo crazy.",
    moth:"The Dreamer. The Hive's sleepy night-flier, drawn to every light at Everspire and most of the bad ideas.",
    dragonfly:"The Racer. The Hive's fastest flier and its scout, who races every Plume at Everspire and has never lost to Hummingbird twice in a row.",
    beetle:"The Shell. The Hive's tinkerer and its toughest member, who builds everything the Hive needs and fixes everything Dragonfly breaks.",
    cobra:"The Hood. Serpent's herald and second-in-command, a snake charmer who dances at every gala the Legends throw and steals every eye in the room.",
    viper:"The Fang. The Coil's enforcer, quiet and lethal; nobody touches the Coil while Viper is watching, and she is always watching.",
    chameleon:"The Mask. The Coil's spy and master of disguise, who has walked through the Legends' hall a dozen times without anyone noticing.",
    gecko:"The Climber. The Coil's scout, who scales every tower at Everspire and has been inside the Legends' trophy room more times than Griffin knows.",
    crocodile:"The Jaw. The Coil's muscle: lazy, patient and terrifying, she has never needed to move fast to win.",
    iguana:"The Sun. The Coil's laid-back charm, who naps through every meeting and somehow always knows what was decided.",
    axolotl:"The Smile. The Coil's heart, the only cold-blooded girl everyone at Everspire likes; she regenerates from any setback with a smile.",
    frog:"The Song. The Coil's loudest voice, who sings at every party and croaks at every Legend who looks at her wrong.",
    turtle:"The Sage. The Coil's oldest soul and its patience made flesh; Serpent asks her advice before every move.",
    rabbit:"The Bounce. The Grove's sweetheart, who hugs everyone, flirts with everyone and has a flower for every girl at Everspire.",
    squirrel:"The Scurry. The Grove's fastest climber, who has hidden a snack in every tree at Everspire and remembers where almost half of them are.",
    hedgehog:"The Quill. The Grove's shy bookworm and herbalist, soft-hearted and prickly when startled, who knows a remedy for everything.",
    redpanda:"The Kettle. The Grove's coziest member, who keeps the teapot hot and the cushions fluffed, and naps wherever the sun is warmest.",
    koala:"The Doze. The Grove's sleepiest girl, who naps through every meeting in the old oak and somehow always wakes up for dessert.",
    kitsune:"The Trick. The Legends' nine-tailed fox spirit, older than she looks, who has tricked every girl at Everspire at least once and Griffin twice.",
    pegasus:"The Wing. The Legends' sky dancer, who performs on the aerial silks in the Champions' Hall and never touches the ground if she can help it.",
    kirin:"The Shield. The Legends' righteous guardian, gentle until someone breaks the rules, which the Coil does constantly.",
    sphinx:"The Riddle. The Legends' cleverest member, who guards the Champions' Hall with a riddle nobody from the Coil has ever answered.",
    siren:"The Song. The Legends' enchantress, whose voice has lured half the Coil into the lake at least once.",
    manticore:"The Claw. The Legends' fiercest fighter, who settles every argument with the Coil in the courtyard, and has never lost one.",
    polarbear:"The Hug. The Frost's gentle giant, who bakes for the whole group and has never once lost an arm-wrestle, a snowball fight or a hug.",
    otter:"The Splash. The Frost's playful swimmer, who turns every training session into a game and every game into a water fight.",
    reindeer:"The Guide. The Frost's gentle heart, who leads them home through every snowstorm and knows every path in the winter woods.",
    beluga:"The Chirp. The Frost's cheeriest voice, who sings on the ice every morning and can make even Orca smile.",
    ermine:"The Crown. The Frost's haughtiest member, a petite, fierce royal who is convinced she outranks everyone, including Orca.",
    puffin:"The Clown. The Frost's prankster, with a whoopee cushion on every chair in the Deep's wing and a fish in every Deep girl's locker.",
    seahorse:"The Heart. The Deep's romantic, who writes love letters for every girl in the group and believes in soulmates for all of them.",
    manta:"The Glide. The Deep's most graceful swimmer, calm and vast, who glides through every fight without a ripple.",
    koi:"The Luck. The Deep's lucky charm and its perfectionist; nothing goes wrong for the Deep while Koi is watching.",
    eel:"The Spark. The Deep's slipperiest member, who slides through every locked door at Everspire and leaves a shock behind.",
    angelfish:"The Grace. The Deep's prima ballerina, who dances in the aquarium wing every night and makes the Frost's skaters look clumsy.",
    eagle:"The Champion. The Talons' proudest flier and their flag-bearer, who has never lost an air race and never lets anyone forget it.",
    falcon:"The Strike. The fastest thing in the Talons, on a racing bike or with a saber, and the first to move when Raven gives the word.",
    hawk:"The Hunter. The Talons' best tracker and archer, who can spot a Grove girl sneaking through the woods from a mile away.",
    vulture:"The Patience. The Talons' gothic survivor, who waits out every fight and collects whatever everyone else leaves behind.",
    osprey:"The Lifeguard. The Talons' steadiest wings, who fishes everyone out of the lake after Raven's dares and has never missed a catch.",
    magpie:"The Sleight. The Talons' magician and second thief, who steals for fun and gives most of it back with a flourish; Crow pretends not to be impressed.",
    snowyowl:"The Watcher. The Talons' silent stargazer, who sees everything from the observatory and says almost nothing.",
    macaw:"The Voice. The loudest Plume, who sings at every party and can be heard from the far side of the grounds.",
    cockatoo:"The Diva. The Plumes' most dramatic dancer; she shrieks when she's happy, shrieks when she's not, and never leaves a dance floor first.",
    birdofparadise:"The Showstopper. The Plumes' most dazzling dancer, whose courtship dance is the reason half the Academy turns up at the conservatory.",
    kingfisher:"The Dive. The Plumes' jewel-bright diver, who has never missed a mark and beats Dragonfly to the water every time.",
    hyena:"The Laugh. The Pack's loudest member and its best brawler, who cackles through every fight with the Pride and has never once lost her grin.",
    jackal:"The Guardian. The Pack's silent watcher, who walks the grounds at night and keeps every secret the Pack has ever had.",
    husky:"The Runner. The Pack's tireless runner and its most dramatic member; she howls when she's happy, howls when she's sad, and outruns everyone.",
    dingo:"The Wild. The Pack's free spirit, who comes and goes like the wind and always turns up when Wolf needs her.",
    fennec:"The Ears. The Pack's listener and its DJ; she hears every rumor at Everspire before it's finished being whispered.",
    shiba:"The Grin. The Pack's most stubborn and cheerful member, who will not move until she's had dinner and will not back down from anyone.",
    serval:"The Spring. The Pride's newest cat and its highest jumper, who pounces on Pack girls for fun and always lands on her feet.",
    firefly:"The Spark. The Hive's bright one, who keeps the others from going full villain; secretly dating the Grove's Raccoon.",
    butterfly:"The Lure. The prettiest face in the Hive; nobody ever suspects the ballerina, which is exactly the point."};
  if(typeof SV249!=="undefined")Object.keys(SV249.roles).forEach(k=>{if(!ROLE[k])ROLE[k]=SV249.roles[k]});
  if(ACAD.canonApply)ACAD.canonApply("roles",ROLE);
  ACAD.GROUP_ROLE=ROLE;

  /* ---------- relationships: the one source ---------- */
  const {BF,BF_OUT,SG,RV}=ACAD.RELDATA;
  ACAD.REL={BF,SG,RV};
  const SGOF={};SG.forEach(([a,b])=>{SGOF[a]=b;SGOF[b]=a});
  const RIV={};RV.forEach(([a,b,sc,na,nb])=>{(RIV[a]=RIV[a]||[]).push([b,na,sc]);(RIV[b]=RIV[b]||[]).push([a,nb,sc])});
  ACAD.SGOF=SGOF;ACAD.RIVALS=RIV;ACAD.BFOF=h=>BF[h]||[];

  /* ---------- biographies ---------- */
  if(typeof BIOS==="object")ACAD_GROUPS.forEach(g=>g.members.forEach(h=>{const b=BIOS[h];if(!b)return;
    b.house=h;b.group=g.name;b.groupRole=ROLE[h]||"";b.rivalGroup=(G[g.rival]||{}).name||"";
    if(b.occupation)b.occupation=b.occupation.replace(/,\s*[A-Z][A-Za-z ]*? House(:|,)?\s*/,": ").replace(/^:\s*/,"");
    /* best friends */
    const bf=(BF[h]||[]).map(o=>{const og=G[o];const across=og&&og.members&&og.id===g.rival;
      return HN(o)+(across?` (across enemy lines: ${gname(og)}'s ${(ROLE[o]||"").split(".")[0].replace(/^The /,"").replace(/,.*$/,"").toLowerCase()})`:"")});
    b.bestFriends=BF_OUT[h]||bf.join("; ");
    /* friends: every groupmate, then up to two from outside she already had */
    const mates=g.members.filter(x=>x!==h&&!(BF[h]||[]).includes(x));
    const known=(String(b.friends||"").split(/[,;]| and /).map(s=>s.replace(/\(.*?\)/g,"").replace(/^\s*(and|her pack:|plus)\s*/i,"").trim()).filter(Boolean));
    const outside=[];ACAD.HOUSES.forEach(x=>{if(x===h||g.members.includes(x)||outside.length>=2||(BF[h]||[]).includes(x)||SGOF[h]===x)return;if(known.some(k=>k===HN(x)))outside.push(x)});
    b.friends=[mates.length?`In ${gname(g)}: ${mates.map(HN).join(", ")}`:"",outside.length?`Outside it: ${outside.map(HN).join(", ")}`:""].filter(Boolean).join(". ");
    /* rivals */
    b.rivals=(RIV[h]||[]).map(([o,n])=>`${HN(o)} (${n})`).join("; ");
    /* secret girlfriend (the field the earlier versions called the yuri fuckbuddy) */
    const sg=SG.find(p=>p[0]===h||p[1]===h);b.romType=sg?(sg[4]||"girlfriend"):"";b.yuriBuddy=sg?`${HN(sg[0]===h?sg[1]:sg[0])}. ${sg[0]===h?sg[2]:sg[3]}`:((ACAD.RELDATA.SG_PENDING||{})[h]||"");
    /* v249: flings, for adults only (lore; never a scene) */
    const adult=x=>{const a=/\d+/.exec(String(((BIOS||{})[x]||{}).age||""));return !a||+a[0]>=18};
    const fl=(ACAD.RELDATA.FLING||[]).filter(p=>(p[0]===h||p[1]===h)&&adult(p[0])&&adult(p[1]));b.flings=fl.map(p=>`${HN(p[0]===h?p[1]:p[0])}. ${p[0]===h?p[2]:p[3]}`).join(" ");
  }));
  /* the robes say who she runs with */
  ACAD_GROUPS.forEach(g=>g.members.forEach(h=>{const t=tplById(h+"robes");if(!t||!t.blurb)return;
    t.blurb=t.blurb.replace(/\s*(Leader|The [A-Z][a-z]+(?: [A-Z][a-z]+)?(?:, and the Hive's acting leader until its queen arrives)?) of the (Legends|Pride|Pack|Frost|Deep|Flock|Grove|Coil|Talons|Plumes|Hive)\.\s*$/,"");
    const role=(ROLE[h]||"").split(".")[0].replace(/,.*$/,"");t.blurb=t.blurb.replace(/\s*$/,"")+(role==="Leader"?` Leader of ${gname(g)}.`:` ${role} of ${gname(g)}.`)}));

  /* ---------- the scene list: keep, re-pair, archive ---------- */
  const houseOf=t=>{if(!t)return null;if(t._house)return t._house;const k=t.id;const p=ACAD.HOUSES.slice().sort((a,b)=>b.length-a.length).find(x=>k.startsWith(x)||k.endsWith(x));
    return p||(t.tags||[]).find(x=>ACAD.HOUSES.includes(x))||(k==="crowbody"?"crow":null)};
  const grp=l=>PRESET_GROUPS.start.find(x=>x.label===l);
  const pid=h=>ACAD.robes?ACAD.robes(h):h+"robes";
  const outOf=t=>t.out;   /* reading a house copy's scene translates it once */
  function repair(label,partnerOf,blurb){const g=grp(label);if(!g)return;
    g.keys.forEach(k=>{const t=tplById(k),h=houseOf(t),p=h&&partnerOf(h);if(!t||!p)return;const o=outOf(t);if(!o||!o.pair)return;
      const old=o.pair.id;o.pair.id=pid(p);if(typeof o.pair.outfit==="number")o.pair.outfit=0;
      if(t.tags){const oh=houseOf(tplById(old));t.tags=t.tags.map(x=>x===oh?p:x)}
      t.name=String(t.name).replace(/^([A-Z][a-z]+(?: Fox| Seal| Owl| of Paradise| Bear| Leopard| Panda)?) & [A-Z][a-z]+(?: Fox| Seal| Owl| of Paradise| Bear| Leopard| Panda)?:/,`${HN(h)} & ${HN(p)}:`);
      if(blurb)t.blurb=blurb(h,p,t)})}
  const BFSETS=["Academy Best Friend Selfie","Academy Pillow Fight","Academy Blanket Fort","Academy Karaoke Duet","Academy Photo Booth","Academy Matching Outfits","Academy Late-Night Whispers","Academy Braiding Hair"];
  BFSETS.forEach(l=>repair(l,h=>(BF[h]||[])[0],(h,p,t)=>`${HN(h)} and her best friend ${HN(p)}: ${String(t.name).replace(/^.*?(best friend |: )/,"").toLowerCase()}. ${HN(p)} is character 2 in the Scene tab.`));
  const SGSETS=["Academy Secret Girlfriends: Sleepover Excuse","Academy Secret Girlfriends: Family Holidays","Academy Secret Girlfriends: Close Calls","Academy Secret Girlfriends: Just Roommates","Academy Secret Girlfriends: Dear Diary"];
  /* a girl still waiting for her secret girlfriend has no secret-girlfriend scenes yet */
  {const PEND=ACAD.RELDATA.SG_PENDING||{};SGSETS.forEach(l=>{const g=grp(l);if(g)g.keys=g.keys.filter(k=>!PEND[houseOf(tplById(k))])})}
  SGSETS.forEach(l=>repair(l,h=>SGOF[h],(h,p,t)=>`“${String(t.name).replace(/^“|”$/g,"").replace(/([^.?!])$/,"$1.")}” ${HN(h)} and her secret girlfriend ${HN(p)} (character 2), hiding it from everyone.`));

  /* the three rival sets, rebuilt so every girl faces her first rival (the nine duels are reused) */
  {const SRC={hall:"hall",storm:"storm",forest:"forest",bakeoff:"bakeoff",race:"race",chess:"chess",night:"night",ice:"ice",catwalk:"catwalk"};
   const SCW={hall:"the great hall",storm:"the storm",forest:"the forest",bakeoff:"the bake-off",race:"the race",chess:"the chess match",night:"the rooftops",ice:"the ice",catwalk:"the catwalk"};   /* v217: names that survive the library's house-name stripping */
   const R=START.RAW,steps=[["Academy Rivals","rival","rv1",(h,p,sc)=>`${HN(h)} vs ${HN(p)}: ${SCW[sc]||"face-off"}`,(h,p,n)=>`${HN(h)} and her rival ${HN(p)}: ${n}. ${HN(p)} is character 2 in the Scene tab.`],
     ["Academy Rivals Truce","truce","rv2",(h,p,sc)=>`${HN(h)} and ${HN(p)}: truce after ${SCW[sc]||"the fight"}`,(h,p)=>`Rivals to lovers, step 2 of 3: ${HN(h)} and ${HN(p)} call a truce. ${HN(p)} is character 2.`],
     ["Academy Rivals Lovers","lovers","rv3",(h,p,sc)=>`${HN(h)} and ${HN(p)}: lovers after ${SCW[sc]||"the fight"}`,(h,p)=>`Rivals to lovers, step 3 of 3: ${HN(h)} and ${HN(p)}, finally. ${HN(p)} is character 2.`]];
   steps.forEach(([label,pre,suf,nm,bl])=>{const g=grp(label);if(!g)return;
     const rows=ACAD.HOUSES.filter(h=>RIV[h]&&RIV[h].length&&tplById(pid(h))).map(h=>{const [p,note,sc]=RIV[h][0],src=R[pre+SRC[sc]];if(!src)return null;
       const out=JSON.parse(JSON.stringify(src.out||{}));if(out.pair){out.pair.id=pid(p);if(typeof out.pair.outfit==="number")out.pair.outfit=out.pair.explicit?1:0}
       return{id:suf+h,base:pid(h),name:nm(h,p,sc),blurb:bl(h,p,note),c:Object.assign({},src.c||{}),
         outfit:src.outfit?JSON.parse(JSON.stringify(src.outfit)):undefined,more:JSON.parse(JSON.stringify(src.more||[])),nude:true,
         drop:(src.drop||[]).slice(),out,tags:(src.tags||["rivals","pair"]).filter(x=>!ACAD.HOUSES.includes(x)).concat([h,p])}}).filter(Boolean);
     const before=g.keys.slice();g.keys.length=0;START.add(label,rows);
     ACAD.RIVAL_OLD=(ACAD.RIVAL_OLD||[]).concat(before)});
   /* the original duels (old pairings) stay loadable from the Archive instead of floating loose under More */
   const old=(ACAD.RIVAL_OLD||[]).filter((k,i,a)=>a.indexOf(k)===i&&tplById(k));
   if(old.length&&!grp("Academy Rivals: Original Duels"))PRESET_GROUPS.start.push({label:"Academy Rivals: Original Duels",keys:old})}

  /* what stays on the Scenes list; every other scene set goes to the Archive */
  const KEEP=new Set(BFSETS.concat(SGSETS,["Academy Secret Girlfriends: Booty Call","Academy Secret Girlfriends: Study Break","Academy Secret Girlfriends: Steamy Shower","Academy Secret Girlfriends: Same Time Next Week",
    "Academy Rivals","Academy Rivals Truce","Academy Rivals Lovers",
    "Academy Sweethearts","Academy First Date","Academy First Kiss","Academy Slow Dance","Academy Stargazing","Academy Moving In","Academy Proposal","Academy Wedding",
    "Academy Intimacy","Academy Morning Sex","Academy Pure Love","Academy Honeymoon Suite",
    "Academy Anime: Portraits","Academy Anime: Cozy","Academy Anime: Lingerie","Academy Anime: Wet","Academy Anime: Nude"]));
  const LOOKS=new Set((ACAD.CATS||[]).flatMap(([,l])=>l).concat(["Academy","Academy Men"]));
  const peek=t=>ACAD.peekOut?ACAD.peekOut(t):t&&t.out;
  ACAD.ARCHIVED=new Set();
  PRESET_GROUPS.start.forEach(g=>{if(!/^Academy/.test(g.label)||KEEP.has(g.label)||LOOKS.has(g.label))return;
    if(g.keys.some(k=>{const t=tplById(k),o=t&&peek(t);return o&&o.pair}))ACAD.ARCHIVED.add(g.label)});
  ACAD.SCENES_KEPT=KEEP;
  /* the Scenes list, in the order the relationships run (the same categories head the Scene tab's library) */
  const CATS2=[["Best friends",BFSETS],["Rivals",["Academy Rivals","Academy Rivals Truce","Academy Rivals Lovers"]],
    ["Secret girlfriends",SGSETS.concat(["Academy Secret Girlfriends: Booty Call","Academy Secret Girlfriends: Study Break","Academy Secret Girlfriends: Steamy Shower","Academy Secret Girlfriends: Same Time Next Week"])],
    ["Her boyfriend",["Academy First Date","Academy First Kiss","Academy Sweethearts","Academy Slow Dance","Academy Stargazing","Academy Moving In","Academy Proposal","Academy Wedding"]],
    ["Making love",["Academy Intimacy","Academy Morning Sex","Academy Pure Love","Academy Honeymoon Suite"]],
    ["Anime close-ups",["Academy Anime: Portraits","Academy Anime: Cozy","Academy Anime: Lingerie","Academy Anime: Wet","Academy Anime: Nude"]]];
  if(ACAD.SCENE_CATS){ACAD.SCENE_CATS.length=0;CATS2.forEach(([n,l])=>ACAD.SCENE_CATS.push([n,l.map(x=>x.replace(/^Academy /,""))]))}   /* the category lists hold display names */
  if(ACAD.SCENE_ORDER){const flat=CATS2.flatMap(c=>c[1]),rest=ACAD.SCENE_ORDER.filter(l=>!flat.includes(l));ACAD.SCENE_ORDER.length=0;ACAD.SCENE_ORDER.push(...flat,...rest)}
})();

/* ---- v241: one roster, and counts in words. ACAD.ROSTER.girls() is every canon girl, group by group (the one list pages
   and pickers should read); ACAD.CT turns the roster's size into words for text that describes the world as it is now.
   Fill-in tokens for prose: {{n:houses}} "one hundred", {{N:houses}} "One hundred", {{a:houses}} "a hundred" (or "one hundred
   and three"), {{A:houses}} "A hundred", {{b:houses}} "hundred" (bare, "the hundred Houses"), {{d:houses}} "100"; the same for groups (ten) and groupsize (ten, or "ten to eleven" when the groups differ),
   and {{n:faction}} (groups in a faction). ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  const ONES=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  const words=n=>{n=Math.floor(+n||0);if(n<20)return ONES[n];if(n<100)return TENS[Math.floor(n/10)]+(n%10?"-"+ONES[n%10]:"");
    if(n<1000)return ONES[Math.floor(n/100)]+" hundred"+(n%100?" and "+words(n%100):"");if(n<1e6)return words(Math.floor(n/1000))+" thousand"+(n%1000?(n%1000<100?" and ":" ")+words(n%1000):"");return String(n)};
  ACAD.numWords=words;
  const groups=()=>ACAD.GROUPS||[];
  const girls=()=>{const out=[],seen=new Set();groups().forEach(g=>g.members.forEach(h=>{if(!seen.has(h)){seen.add(h);out.push(h)}}));
    (ACAD.HOUSES||[]).forEach(h=>{if(!seen.has(h)&&ACAD.canon&&ACAD.canon.isAdded(h)){seen.add(h);out.push(h)}});return out};
  ACAD.ROSTER={girls,count:()=>girls().length,groups:()=>groups().slice(),groupCount:()=>groups().length};
  const sizes=()=>{const s=groups().map(g=>g.members.length);return s.length?[Math.min(...s),Math.max(...s)]:[0,0]};
  const factionSize=()=>{const F=ACAD.FACTIONS||null;if(F&&F.length){const s=F.map(f=>(f.groups||[]).length);return Math.max(...s)}return Math.round(groups().length/2)};
  /* v249: the counts ("the hundred", "ten groups of ten") are the Academy's: groups that stand apart (the Synth and the Void)
     are left out of them, though every list still has their girls */
  /* v268: a group with fewer than ACAD.ESTABLISH Houses is forming (woken or founded and still filling); the counts of
     groups ("ten groups") are of established groups, though a forming group's girls count among the Houses */
  ACAD.ESTABLISH=5;
  ACAD.groupStatus=g=>{g=typeof g==="string"?(ACAD.GROUPS||[]).find(x=>x.id===g):g;if(!g)return"";return (g.members||[]).length>=ACAD.ESTABLISH?"established":"forming"};
  ACAD.formingLabel=g=>{g=typeof g==="string"?(ACAD.GROUPS||[]).find(x=>x.id===g):g;if(!g||ACAD.groupStatus(g)!=="forming")return"";const n=(g.members||[]).length;return `Forming, ${n} of ${ACAD.ESTABLISH} Houses`};
  const acGroups=()=>groups().filter(g=>!g.apart&&ACAD.groupStatus(g)==="established");
  const academy=()=>{const ap=new Set();groups().filter(g=>g.apart).forEach(g=>g.members.forEach(h=>ap.add(h)));return girls().filter(h=>!ap.has(h))};
  ACAD.apartWords=()=>{const ord=typeof ENC!=="undefined"&&ENC.FACTIONS?ENC.FACTIONS.filter(f=>f.apart).reduce((r,f)=>r.concat(f.groups||[]),[]):[],rk=g=>{const i=ord.indexOf(g.id);return i<0?99:i};const a=(ACAD.GROUPS||[]).filter(g=>g.apart).sort((x,y)=>rk(x)-rk(y)).map(g=>g.name.replace(/^The /,"the "));return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1]};ACAD.ROSTER.academy=academy;ACAD.ROSTER.apart=()=>girls().filter(h=>!academy().includes(h));ACAD.ROSTER.academyGroups=()=>acGroups().slice();
  const acSizes=()=>{const s=acGroups().map(g=>g.members.length);return s.length?[Math.min(...s),Math.max(...s)]:[0,0]};
  const acFaction=()=>{const F=(ACAD.FACTIONS||[]).filter(f=>!f.apart);if(F.length){return Math.max(...F.map(f=>(f.groups||[]).length))}return Math.round(acGroups().length/2)};
  /* v268: how many of the Academy's Houses never slept, and how many woke (the Great Waking, and any woken since) */
  const neverslept=()=>academy().filter(h=>ACAD.NEVERSLEPT&&ACAD.NEVERSLEPT.has(h)).length;
  const num={houses:()=>academy().length,groups:()=>acGroups().length,groupsize:()=>acSizes(),faction:()=>acFaction(),
    neverslept,woke:()=>academy().length-neverslept()};
  /* word form: n lower, N capitalised, a "a hundred" style, d digits */
  function W(kind,form){let v=(num[kind]||(()=>0))();let w;
    if(Array.isArray(v)){const [lo,hi]=v;w=lo===hi?words(lo):words(lo)+" to "+words(hi);v=lo===hi?lo:hi;if(form==="d")return lo===hi?String(lo):lo+"–"+hi}
    else{if(form==="d")return String(v);w=words(v);if((form==="a"||form==="A")&&v===100)w="a hundred";if(form==="b"&&v===100)w="hundred"}
    return form==="N"||form==="A"?w.charAt(0).toUpperCase()+w.slice(1):w}
  ACAD.CT={w:W,
    n:k=>W(k,"n"),N:k=>W(k,"N"),a:k=>W(k,"a"),d:k=>W(k,"d"),
    /* "All hundred" for a hundred, "All 103" otherwise */
    A:k=>W(k,"A"),b:k=>W(k,"b"),
    all:()=>"All "+W("houses","b"),
    fill:s=>String(s==null?"":s).replace(/\{\{([nNadAb]):(houses|groups|groupsize|faction|neverslept|woke)\}\}/g,(m,f,k)=>W(k,f)).replace(/\{\{(ages|agesApart|years)\}\}/g,(m,k)=>k==="years"?YEARS():AGES(k==="ages"?academy():ACAD.ROSTER.apart()))};
  /* v250: the ages on the rolls, from the girls' biographies ("twenty to twenty-four"), and the years they are in (a girl
     of twenty is in her second year) */
  const ageSpan=list=>{const a=list.map(h=>parseInt(((typeof BIOS!=="undefined"&&BIOS[h])||{}).age,10)).filter(n=>n>0&&n<200);return a.length?[Math.min(...a),Math.max(...a)]:null};
  function AGES(list){const r=ageSpan(list);if(!r)return "";return r[0]===r[1]?words(r[0]):words(r[0])+" to "+words(r[1])}
  const ORD=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"];
  function YEARS(){const r=ageSpan(academy());if(!r)return "";const y=n=>ORD[Math.max(0,Math.min(ORD.length-1,n-19))];return r[0]===r[1]?y(r[0]):y(r[0])+" to "+y(r[1])}
  ACAD.CT.ages=k=>AGES(k==="apart"?ACAD.ROSTER.apart():academy());ACAD.CT.ageSpan=k=>ageSpan(k==="apart"?ACAD.ROSTER.apart():academy());ACAD.CT.years=YEARS;
})();

/* ---- v210: Biography (tail block). A step between Outfit and Finish for everything about her that is not in the
   picture: name, birthday, sizes, personality, favorites, family, friends and rivals, her love life and notes.
   Nothing here goes into the prompt. It is saved with the design (S.bio), comes along with starting points that have one
   (every Academy girl does: loading any of her looks brings her biography), and New or a blank character empties it.
   The intimacy section is for adults: it stays closed for a girl-labeled design (the studio's safeguard) and for a
   biography age under 18. */
(function(){
  if(typeof STEPS==="undefined"||typeof RENDER==="undefined")return;
  const EXP=["Virgin","Inexperienced","Some experience","Experienced","Very experienced","Insatiable","Slut","Whore"];
  const ORIENT=["Straight","Straight, a little curious","Bisexual","Pansexual","Lesbian","Mostly lesbian","Asexual"];
  const STATUS=["Single","Has a crush","Dating","In a relationship","In a secret relationship","Engaged","Married","It's complicated"];
  const BLOOD=["A","B","AB","O","A−","B−","AB−","O−"];
  /* [id, label, kind, placeholder or options]; kind: t text, a long text, s select, d date */
  const SECTIONS=[
    ["identity","Identity",[["fullName","Full name","t","Aurelia Castellane"],["nickname","Nicknames","t","Rory, the Captain"],["age","Age","t","22"],["dob","Date of birth","d"],
      ["birthplace","Hometown","t","A harbor town on the south coast"],["occupation","School year or work","t","Fourth year, dance and sailing"],["house","House","h"],["languages","Languages","t","English, French"]]],
    ["sizes","Body and sizes",[["height","Height","t","168 cm (5′6″)"],["weight","Weight","t","52 kg (115 lb)"],["bust","Bust","t","84 cm (33″)"],["cup","Cup size","t","C"],
      ["waist","Waist","t","58 cm (23″)"],["hips","Hips","t","86 cm (34″)"],["butt","Butt","t","Small, round and firm"],["shoe","Shoe size","t","US 7"],["bloodType","Blood type","s",BLOOD],["hand","Dominant hand","t","Right"]]],
    ["personality","Personality",[["summary","In a few words","a","Who she is, the way her best friend would put it."],["traits","Traits","t","Brave, competitive, secretly shy"],
      ["strengths","Strengths","t"],["flaws","Flaws","t"],["likes","Likes","t"],["dislikes","Dislikes","t"],["hobbies","Favorite things to do","t"],["habits","Habits and quirks","t"],
      ["fears","Fears","t"],["dreams","Dreams and goals","t"],["catchphrase","Catchphrase","t"]]],
    ["favorites","Favorites",[["favColor","Colors","t"],["favFood","Foods","t"],["favDrink","Drink","t"],["favDessert","Dessert","t"],["favSubject","Subject","t"],["favMusic","Music","t"],
      ["favBook","Book or film","t"],["favSeason","Season","t"],["favFlower","Flower","t"],["favAnimal","Animal","t"],["favPlace","Place","t"],["favScent","Scent","t"]]],
    ["family","Background and family",[["backstory","Background","a","Where she grew up and how she got here."],["mother","Mother","t"],["father","Father","t"],["siblings","Siblings","t"],["family","Other family","t"]]],
    ["relations","Relationships",[["group","Group","g"],["group2","Second banner","g"],["groupRole","Group role","t","Leader, right hand, the spy…"],["rivalGroup","Rival group","g"],["status","Relationship status","s",STATUS],["partner","Partner or crush","t"],["yuriBuddy","Girlfriend or partner","t"],["bestFriends","Best friends","t"],["friends","Friends","t"],["rivals","Rivals","t"],["exes","Exes","t"],["pets","Pets","t"]]],
    ["intimacy","Intimacy",[["experience","Experience","s",EXP],["orientation","Orientation","s",ORIENT],["bodyCount","Partners so far","t"],["firstTime","First time","t"],
      ["turnOns","Turn-ons","t"],["turnOffs","Turn-offs","t"],["favPosition","Favorite position","t"],["kinks","Kinks and fantasies","t"],["limits","Limits","t"]]],
    ["notes","Notes",[["notes","Notes","a","Anything else: secrets, plans, things to remember."]]]];
  const FIELDS=SECTIONS.flatMap(s=>s[2].map(f=>f[0]));
  const INTIMATE=new Set(SECTIONS.find(s=>s[0]==="intimacy")[2].map(f=>f[0]).concat(["yuriBuddy"]));   /* v213: the yuri fuckbuddy line follows the intimacy rule */
  window.BIO_FIELDS=SECTIONS;

  /* ---------- state ---------- */
  const clean=b=>{if(!b||typeof b!=="object"||Array.isArray(b))return null;const o={};FIELDS.forEach(k=>{const v=b[k];if(typeof v==="string"&&v.trim())o[k]=v});return Object.keys(o).length?o:null};
  const n0=normalize;
  normalize=function(st){const o=n0(st),b=clean(o.bio);if(b)o.bio=b;else delete o.bio;return o};
  /* which Academy girl a starting point is (her robes, any of her looks, or a new house's copy) */
  const ROOT={};
  const roots=()=>{if(ROOT.n===ACAD.HOUSES.length)return ROOT;ACAD.HOUSES.forEach(h=>{ROOT[h+"robes"]=h});Object.entries(ACAD.BASES||{}).forEach(([h,id])=>{ROOT[id]=h});ROOT.n=ACAD.HOUSES.length;return ROOT};
  function girlOf(t){
    if(!t||!t.id||typeof ACAD==="undefined")return null;
    const R=roots();if(R[t.id]&&R[t.id]!==true)return R[t.id];
    if(t._clone){if(t._house)return t._house;const src=tplById(t._clone),h=girlOf(src);return h&&ACAD.SISTER?Object.keys(ACAD.SISTER).find(n=>ACAD.SISTER[n]===h)||null:null}
    let k=t.id,g=0;const RAW=START.RAW||{};
    while(k&&g++<40){if(R[k]&&R[k]!==true)return R[k];const e=RAW[k];if(!e||!e.base)return null;k=e.base}
    return null;
  }
  window.BIO_GIRL=girlOf;
  const bioOf=t=>{if(!t)return null;if(t.bio)return t.bio;const h=girlOf(t);return h&&typeof BIOS!=="undefined"&&BIOS[h]||null};
  const sft=stateFromTemplate;
  stateFromTemplate=function(t){const b=sft.apply(this,arguments);const bio=bioOf(t);if(bio)b.bio=JSON.parse(JSON.stringify(bio));else delete b.bio;return b};

  /* ---------- helpers ---------- */
  const SIGNS=[["Capricorn",1,19],["Aquarius",2,18],["Pisces",3,20],["Aries",4,19],["Taurus",5,20],["Gemini",6,20],["Cancer",7,22],["Leo",8,22],["Virgo",9,22],["Libra",10,22],["Scorpio",11,21],["Sagittarius",12,21],["Capricorn",12,31]];
  function signOf(d){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||"");if(!m)return"";const mo=+m[2],da=+m[3];for(const[s,M,D]of SIGNS){if(mo<M||(mo===M&&da<=D))return s}return""}
  function ageOf(d){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(d||"");if(!m)return null;const now=new Date(),b=new Date(+m[1],+m[2]-1,+m[3]);let a=now.getFullYear()-b.getFullYear();
    if(now.getMonth()<b.getMonth()||(now.getMonth()===b.getMonth()&&now.getDate()<b.getDate()))a--;return a}
  /* v214: houses and groups */
  const houseName=k=>!k?"":(typeof ACAD!=="undefined"&&ACAD.HOUSES&&ACAD.HOUSES.includes(k))?((ACAD.HNAME&&ACAD.HNAME[k])||ACAD.cap(k))+" House":k;
  const GROUPS=()=>(typeof ACAD!=="undefined"&&ACAD.GROUPS)||[];
  const groupByName=n=>GROUPS().find(g=>g.name===n)||null;
  function houseCtl(fid,v){
    const isKey=v&&ACAD.HOUSES&&ACAD.HOUSES.includes(v);
    const lab=h("span",{class:"bio-hlab",text:v?houseName(v):"Not set"});
    const sl=!isKey&&v&&window.ENC&&ENC.sleepingByName?ENC.sleepingByName(v):null;   /* v230: a sleeping House she woke shows its icon */
    const btn=h("button",{type:"button",id:fid,class:"pick bio-hbtn","aria-haspopup":"true","aria-expanded":"false"},isKey&&ACAD.pixelImg?ACAD.pixelImg(v,24):sl?ENC.rollIcon(sl.h.id,24):null,lab,h("i",{class:"caret","aria-hidden":"true"}));
    const panel=h("div",{class:"bio-hpanel",hidden:true,role:"group","aria-label":"Houses"});
    const pick=k=>{const b=S.bio||{};setBio("house",k);
      /* a built-in house brings its group along, if she has none yet */
      const g=ACAD.GROUP_OF&&ACAD.GROUP_OF(k);if(g&&!b.group){setBio("group",g.name);const rv=GROUPS().find(x=>x.id===g.rival);if(rv&&!b.rivalGroup)setBio("rivalGroup",rv.name)}
      renderMain()};
    GROUPS().forEach(g=>{panel.append(h("div",{class:"bio-hg",text:g.name+" · "+g.kind}));
      const row=h("div",{class:"bio-hrow"});
      g.members.forEach(k=>row.append(h("button",{type:"button",class:"bio-hopt"+(v===k?" on":""),"aria-pressed":v===k?"true":"false",onclick:()=>pick(k)},ACAD.pixelImg?ACAD.pixelImg(k,32):null,h("span",{text:(ACAD.HNAME&&ACAD.HNAME[k])||ACAD.cap(k)}))));
      panel.append(row)});
    /* v230: the sleeping Houses, by lost group; choosing one wakes it for her */
    if(window.ENC&&ENC.ROLL){const det=h("details",{class:"bio-sleep"},h("summary",{text:"Wake a sleeping House (200 on the Roll)"}));
      ENC.ROLL.forEach(g=>{det.append(h("div",{class:"bio-hg",text:g.name+" · sleeping · "+(g.faction==="dawn"?"Dawn":g.faction==="dusk"?"Dusk":"Unsworn")}));
        const row=h("div",{class:"bio-hrow"});
        g.houses.forEach(x=>{const nm=x.name+" House";row.append(h("button",{type:"button",class:"bio-hopt"+(v===nm?" on":""),"aria-pressed":v===nm?"true":"false",onclick:()=>{const b=S.bio||{};setBio("house",nm);if(!b.group)setBio("group",g.name);
          const al=ENC.ALSO&&ENC.ALSO[x.id];if(al&&!b.group2)setBio("group2",al);if(ENC.markRevived)ENC.markRevived(x.id);renderMain()}},ENC.rollIconOrSigil?ENC.rollIconOrSigil(g.id,x,32):null,h("span",{text:x.name})))});
        det.append(row)});
      panel.append(det)}
    const own=h("input",{type:"text",placeholder:"Or name a house of your own",value:isKey?"":(v||""),onchange:e=>{setBio("house",e.target.value.trim());renderMain()}});
    panel.append(h("div",{class:"bio-hown"},own,h("button",{type:"button",class:"btn sm",onclick:()=>{setBio("house","");renderMain()},text:"No house"})));
    btn.onclick=()=>{panel.hidden=!panel.hidden;btn.setAttribute("aria-expanded",panel.hidden?"false":"true")};
    return h("div",{class:"bio-house"},btn,panel);
  }
  function groupCtl(fid,k,v){
    const sel=h("select",{id:fid,onchange:e=>{setBio(k,e.target.value);
        if(k==="group"){const g=groupByName(e.target.value),b=S.bio||{};if(g&&!b.rivalGroup){const rv=GROUPS().find(x=>x.id===g.rival);if(rv)setBio("rivalGroup",rv.name)}}
        renderMain()}},h("option",{value:"",text:"Not set"}),...GROUPS().map(g=>h("option",{value:g.name,text:g.name+" ("+g.kind.toLowerCase()+")"})),
      window.ENC&&ENC.ROLL?h("optgroup",{label:"Sleeping groups (if she wakes them)"},...ENC.ROLL.map(g=>h("option",{value:g.name,text:g.name+" ("+g.kind.toLowerCase()+")"}))):null);
    if(v&&!GROUPS().some(g=>g.name===v)&&!(window.ENC&&ENC.ROLL&&ENC.ROLL.some(g=>g.name===v)))sel.append(h("option",{value:v,text:v}));
    sel.value=v||"";
    /* v245b: or a group of her own (for her group; Make her canon offers to create it) */
    const ownG=k==="group"&&!groupByName(v)&&!(window.ENC&&ENC.ROLL&&ENC.ROLL.some(x=>x.name===v));
    const own=k==="group"?h("input",{type:"text",class:"bio-gown",placeholder:"Or name a group of your own",value:ownG?(v||""):"","aria-label":"Or name a group of your own",onchange:e=>{setBio("group",e.target.value.trim());renderMain()}}):null;
    const g=k==="group"&&groupByName(v);if(!g)return own?h("div",{class:"bio-gwrap"},sel,own):sel;
    const L=ACAD.HNAME||{},nm=x=>L[x]||ACAD.cap(x),rv=GROUPS().find(x=>x.id===g.rival);
    const card=h("div",{class:"bio-gcard"},
      h("div",{class:"bio-gfaces","aria-hidden":"true"},ACAD.crestImg?ACAD.crestImg(g.id,32):null,...g.members.map(x=>ACAD.pixelImg?ACAD.pixelImg(x,x===g.leader?32:24):null)),
      h("p",{},h("b",{text:"“"+g.motto+"” "}),g.lore),
      h("p",{class:"muted small",text:`Leader: ${nm(g.leader)}. Members: ${g.members.map(nm).join(", ")}. Hangout: ${g.hangout}.`+(rv?` Rivals: ${rv.name}.`:"")+(g.principal?` Principal: ${g.principal}.`:"")+(g.colorWords?` Colors: ${g.colorWords}.`:"")}));
    return h("div",{},sel,own,card);
  }
  const hst=document.createElement("style");
  hst.textContent=".bio-gwrap{display:flex;flex-direction:column;gap:6px}.bio-gown{margin-top:6px}.bio-house{position:relative}.bio-hbtn{display:flex;align-items:center;gap:8px;width:100%;text-align:left}.bio-hbtn .bio-hlab{flex:1}"+
    ".bio-hpanel{margin-top:6px;padding:8px 10px;border:1px solid var(--rule2);border-radius:10px;background:var(--panel);max-height:420px;overflow:auto}"+
    ".bio-hg{font-size:12px;font-weight:600;color:var(--muted);margin:8px 0 4px}.bio-hg:first-child{margin-top:0}.bio-hrow{display:flex;flex-wrap:wrap;gap:6px}"+
    ".bio-hopt{display:flex;flex-direction:column;align-items:center;gap:2px;width:76px;padding:6px 4px;border:1px solid var(--rule2);border-radius:8px;background:var(--bg);font-size:12px;cursor:pointer;color:inherit}"+
    ".bio-hopt.on{border-color:var(--ink);box-shadow:0 0 0 1px var(--ink)}.bio-hopt:focus-visible{outline:2px solid var(--blue)}"+
    ".bio-hown{display:flex;gap:6px;margin-top:10px}.bio-hown input{flex:1}"+
    ".bio-gcard{margin-top:8px;padding:10px 12px;border-left:3px solid var(--blue);background:var(--panel2);border-radius:0 8px 8px 0}.bio-gcard p{margin:6px 0 0}"+
    ".bio-gfaces{display:flex;gap:4px;align-items:flex-end;flex-wrap:wrap}.bio-f.wide-g{grid-column:1/-1}";
  document.head.append(hst);
  /* the intimacy section is for adults only */
  function intimacyOk(){
    try{if(Policy.restricted())return false}catch(e){}
    const b=S.bio||{},a=parseInt(b.age,10),da=ageOf(b.dob);
    if((!isNaN(a)&&a<18)||(da!=null&&da<18))return false;
    return true;
  }
  const filled=()=>{const b=S.bio||{};return FIELDS.filter(k=>b[k]&&(!INTIMATE.has(k)||intimacyOk())).length};
  const setBio=(k,v)=>{const was=k==="house"&&S.bio?S.bio.house:"";typing="main";if(was&&was!==v&&window.ENC&&ENC.houseLeft)ENC.houseLeft(was);try{mut(()=>{const b=Object.assign({},S.bio||{});if(v&&String(v).trim())b[k]=v;else delete b[k];if(Object.keys(b).length)S.bio=b;else delete S.bio},"bio:"+k)}finally{typing=""}};
  function asText(){
    const b=S.bio||{},lines=[];
    SECTIONS.forEach(([id,label,fs])=>{if(id==="intimacy"&&!intimacyOk())return;const got=fs.filter(f=>b[f[0]]&&(!INTIMATE.has(f[0])||intimacyOk()));if(!got.length)return;
      lines.push(label.toUpperCase());got.forEach(([k,l])=>lines.push(`${l}: ${k==="dob"?b[k]+(signOf(b[k])?" ("+signOf(b[k])+")":""):k==="house"?houseName(b[k]):b[k]}`));lines.push("")});
    return lines.join("\n").trim();
  }
  window.BIO={text:asText,sign:signOf,fields:FIELDS,girlOf,bioOf};

  /* ---------- the step ---------- */
  const css=document.createElement("style");
  css.textContent=".bio-sec{border:1px solid var(--rule,rgba(0,0,0,.12));border-radius:12px;margin:0 0 12px;background:var(--panel)}"+
    ".bio-sec>summary{cursor:pointer;padding:12px 14px;font-weight:600;display:flex;justify-content:space-between;gap:8px;align-items:baseline}"+
    ".bio-sec>summary small{font-weight:400;color:var(--muted)}"+
    ".bio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px 14px;padding:0 14px 14px}"+
    ".bio-f{display:flex;flex-direction:column;gap:4px;min-width:0}.bio-f.wide{grid-column:1/-1}"+
    ".bio-f label{font-size:13px;color:var(--muted)}"+
    ".bio-f input,.bio-f select,.bio-f textarea{width:100%;font:inherit;color:var(--ink);background:var(--bg,transparent);border:1px solid var(--rule,rgba(0,0,0,.18));border-radius:8px;padding:7px 9px;box-sizing:border-box}"+
    ".bio-f textarea{resize:vertical;min-height:4.5em}.bio-f textarea.bio-line{min-height:0;line-height:1.35;overflow:hidden;resize:none;field-sizing:content}.bio-f .bio-aux{font-size:12px;color:var(--muted)}"+
    ".bio-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}.bio-held{padding:0 14px 14px;margin:0;color:var(--muted);font-size:14px}"+
    "@media (max-width:520px){.bio-grid{grid-template-columns:1fr}}";
  document.head.append(css);
  const OPEN=new Set(["identity","personality"]);
  const SHORT=new Set(["age","height","weight","bust","cup","waist","hips","shoe","hand","bodyCount","languages"]);
  const fit=ta=>{ta.style.height="auto";ta.style.height=Math.min(ta.scrollHeight+2,200)+"px"};
  const fitAll=()=>requestAnimationFrame(()=>document.querySelectorAll("#stepView textarea.bio-line").forEach(fit));
  function stepBio(){
    const f=document.createDocumentFragment(),b=S.bio||{};
    const n=filled();
    f.append(h("div",{class:"bio-top"},
      h("p",{class:"muted small",style:"margin:0;flex:1 1 260px",text:n?`${n} of ${FIELDS.length} filled in. None of this is written into the prompt.`:"Fill in as much or as little as you like. None of this is written into the prompt."}),
      h("button",{type:"button",class:"btn sm",disabled:n?null:true,onclick:()=>{const t=asText();try{navigator.clipboard.writeText(t).then(()=>toast("Biography copied."),()=>toast("Copy failed: select the text yourself."))}catch(e){toast("Copy failed.")}},text:"Copy biography"}),
      h("button",{type:"button",class:"btn sm",disabled:n?null:true,onclick:()=>{if(confirm("Empty the whole biography? Undo brings it back."))mut(()=>{delete S.bio},"bioClear")},text:"Empty biography"})));
    SECTIONS.forEach(([id,label,fs])=>{
      const cnt=fs.filter(x=>b[x[0]]).length;
      const d=h("details",{class:"bio-sec","data-sec":id});d.open=OPEN.has(id);
      d.addEventListener("toggle",()=>{if(d.open){OPEN.add(id);fitAll()}else OPEN.delete(id)});
      d.append(h("summary",{},h("span",{text:label}),h("small",{text:cnt?`${cnt} of ${fs.length}`:""})));
      if(id==="intimacy"&&!intimacyOk()){d.append(h("p",{class:"bio-held",text:"Only for adult characters: this design is girl-labeled, or the age above is under 18."}));f.append(d);return}
      const grid=h("div",{class:"bio-grid"});
      fs.forEach(([k,l,kind,ph])=>{
        if(INTIMATE.has(k)&&!intimacyOk())return;
        const fid="bio_"+k,v=b[k]||"";let ctl,aux=null;
        if(kind==="h"){grid.append(h("div",{class:"bio-f wide"},h("label",{for:fid,text:l}),houseCtl(fid,v)));return}
        if(kind==="g"){grid.append(h("div",{class:"bio-f"+(k==="group"&&v?" wide":"")},h("label",{for:fid,text:l}),groupCtl(fid,k,v)));return}
        if(kind==="a")ctl=h("textarea",{id:fid,rows:"3",placeholder:ph||"",oninput:e=>setBio(k,e.target.value)});
        else if(kind==="s"){ctl=h("select",{id:fid,onchange:e=>{setBio(k,e.target.value);renderMain()}},h("option",{value:"",text:"Not set"}),...ph.map(o=>h("option",{value:o,text:o})));
          if(v&&!ph.includes(v))ctl.append(h("option",{value:v,text:v}))}
        else if(kind==="d"){ctl=h("input",{type:"date",id:fid,onchange:e=>{setBio(k,e.target.value);renderMain()}});
          const sg=signOf(v),a=ageOf(v);aux=h("span",{class:"bio-aux",text:v?[sg?"Star sign: "+sg:"",a!=null?"Age today: "+a:""].filter(Boolean).join(" · "):""})}
        else if(SHORT.has(k))ctl=h("input",{type:"text",id:fid,placeholder:ph||"",oninput:e=>setBio(k,e.target.value)});
        /* longer answers wrap and grow instead of scrolling out of sight */
        else{ctl=h("textarea",{id:fid,class:"bio-line",rows:"1",placeholder:ph||"",oninput:e=>{fit(e.target);setBio(k,e.target.value)}})}
        ctl.value=v;
        grid.append(h("div",{class:"bio-f"+(kind==="a"?" wide":"")},h("label",{for:fid,text:l}),ctl,aux));
      });
      d.append(grid);f.append(d);
    });
    fitAll();
    return f;
  }
  const fi=STEPS.findIndex(s=>s.id==="finish");
  STEPS.splice(fi<0?STEPS.length:fi,0,{id:"bio",label:"Biography",blurb:"Her story: name, birthday, sizes, personality, family, friends, love life. None of it goes into the prompt."});
  RENDER.bio=stepBio;STEP_FIELDS.bio=[];
  const rr=renderRail;
  renderRail=function(){rr.apply(this,arguments);
    const b=[...document.querySelectorAll("#rail .rail-btn")].find(x=>{const l=x.querySelector(".rl");return l&&l.textContent==="Biography"});
    if(b){const n=filled(),d=b.querySelector(".dot");if(d)d.classList.toggle("set",n>0);
      let c=b.querySelector(".bio-n");if(n){if(!c){c=h("small",{class:"bio-n"});b.append(c)}c.textContent=n+"/"+FIELDS.length}else if(c)c.remove()}};

  /* ---------- her biography on the girl's profile card in Starting points ---------- */
  if(typeof renderStartList==="function"){
    const rl=renderStartList;
    renderStartList=function(){rl.apply(this,arguments);
      try{const card=document.querySelector("#startGrid .sp-prof");if(!card||card.querySelector(".sp-bio"))return;
        const hh=(card.getAttribute("aria-label")||"").replace(/ profile$/,"").toLowerCase(),B=typeof BIOS!=="undefined"&&BIOS[hh];if(!B)return;
        const bits=[B.fullName,B.age?B.age+" years old":"",B.dob&&signOf(B.dob)?signOf(B.dob):"",B.height].filter(Boolean).join(" · ");
        const g=B.group&&groupByName(B.group);
        const p=h("p",{class:"sp-bio"},h("b",{text:bits}),B.summary?h("br"):null,B.summary||"",
          g?h("span",{class:"sp-grp"},h("br"),h("b",{text:g.name+": "}),B.groupRole||""):null);
        {const t=card.querySelector("h3");if(t&&ACAD.pixelImg&&!t.querySelector(".pxhead,[data-por]")){const im=(ACAD.portraitImg&&ACAD.portraitImg(hh,44))||ACAD.pixelImg(hh,32);if(im){im.style.marginRight="12px";t.prepend(im)}}}
        const acts=card.querySelector(".sp-acts");card.insertBefore(p,acts||null)}catch(e){}};
  }
})();

/* ---- v216: group identity data. Crests (16x16, drawn by px/crest.py), group colors, each group's settings for its scenes,
   its Group Colors outfit, and its principal: an older man who runs the group's faculty, the headmistresses' boss. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  ACAD.CREST={"legends":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaaaaaaaaaao","oaaaeaaeeaaeaaao","oaaaeeaeeaeeaaao","oaaaeeeeeeeeaaao","oaaaefeefeefaaao","oaaaeeeeeeeeaaao","oaaaeeeeeeeeaaao",".oaaaaaaaaaaaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#d9a62e","a":"#a3202c","e":"#e8c25a","f":"#f4ecd8","o":"#1d1b22"}},"pride":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaeaaeaaaaao","oaaaaeeaaeeaaaao","oaaeaeeaaeeaeaao","oaaeeaaaaaaeeaao","oaaeeaeeeeaeeaao","oaaaaeeeeeeaaaao","oaaaeeeeeeeeaaao",".oaaeeeeeeeeaao.",".oaaaeeeeeeaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#e3a22c","a":"#5a3620","e":"#f0b440","f":"#f4ead2","o":"#1d1b22"}},"pack":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaeeeeaaaaao","oaaaeeeaaaaaaaao","oaaaeeaaaaaaaaao","oaaeeaaaaafaaaao","oaaeeaaaafffaaao","oaaeeaaaaafaaaao","oaaaeeaaaaaaaaao",".oaaeeeaaaaaaao.",".oaaaaeeeeaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#2f5d43","a":"#3c3f45","e":"#c9ced6","f":"#e8edf2","o":"#1d1b22"}},"frost":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaaeaaaaaaao","oaaaeaaeaaeaaaao","oaaaaeaeaeaaaaao","oaaaaaeeeaaaaaao","oaaeeeefeeeeaaao","oaaaaaeeeaaaaaao","oaaaaeaeaeaaaaao",".oaaeaaeaaeaaao.",".oaaaaaeaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#e9f2fa","a":"#5f9fd0","e":"#ffffff","f":"#cfe4f5","o":"#1d1b22"}},"deep":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaeaaeaaeaaaao","oaaaeaaeaaeaaaao","oaaaeeaeaeeaaaao","oaaaaeeeeeaaaaao","oaaaaaaeaaaaaaao","oaaaaaaeaaaaaaao","oaaaaafefaaaaaao",".oaaaaaeaaaaaao.",".oaaaaaeaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#1f8a8a","a":"#1b2a52","e":"#efe9dc","f":"#4fc3c3","o":"#1d1b22"}},"talons":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaeaaeaaeaao","oaaaaaeaaeaaeaao","oaaaaeeaeeaeeaao","oaaaaeaaeaaeaaao","oaaaaeaaeaaeaaao","oaaaeeaeeaeeaaao","oaaaeaaeaaeaaaao",".oaafaafaafaaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#6e1a1f","a":"#1c1c22","e":"#9aa0a8","f":"#c8ccd2","o":"#1d1b22"}},"plumes":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaaaaaeeaaao","oaaaaaaaaeeeaaao","oaaaaaaaeeefaaao","oaaaaaaeeefaaaao","oaaaaaeeefaaaaao","oaaaaeeefaaaaaao","oaaaaeefaaaaaaao",".oaafafaaaaaaao.",".oafaaaaaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#e8458b","a":"#1d7a50","e":"#e8cf8a","f":"#f6e7b8","o":"#1d1b22"}},"grove":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaaeaaaaaaao","oaaaaeeeeeeaaaao","oaaaeeeeeeeeaaao","oaaaeaeaeaeeaaao","oaaaaffffffaaaao","oaaaaffffffaaaao","oaaaaffffffaaaao",".oaaaaffffaaaao.",".oaaaaaffaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#a86b32","a":"#2f5a2a","e":"#7a4a22","f":"#e6d6b2","o":"#1d1b22"}},"coil":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaeeeeeaaaao","oaaaaeeafaeeaaao","oaaaaeeaaaaaaaao","oaaaaaeeeaaaaaao","oaaaaaaaeeeaaaao","oaaaaaaaaaeeaaao","oaaaeaaaaaeeaaao",".oaaeeeeeeeaaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#b3913f","a":"#18191c","e":"#3fae7a","f":"#e8c25a","o":"#1d1b22"}},"hive":{"r":["oooooooooooooooo","obbbbbbbbbbbbbbo","obbbbbbbbbbbbbbo","oaaaaaeeeeaaaaao","oaaaaeeeeeeaaaao","oaaaeeffffeeaaao","oaaeeffffffeeaao","oaaeeffffffeeaao","oaaaeeffffeeaaao","oaaaaeeeeeeaaaao",".oaaaaeeaeaaaao.",".oaaaaaeaaaaaao.","..oaaaaaaaaaao..","...oaaaaaaaao...","....ooaaaaoo....","......oooo......"],"c":{"b":"#e8b43a","a":"#4b2a6e","e":"#f2c14e","f":"#b8781e","o":"#1d1b22"}}};
  /* [colors (for the outfit and the bio), color words, crest emblem, hall, hangout (prompt words), party room, council room, faculty room] */
  ACAD.GX={
legends:{cols:["gold","crimson","ivory"],words:"crimson, gold and ivory",crest:"golden crown",
  hall:"in a grand champions' hall hung with crimson-and-gold banners of griffins, dragons, phoenixes and unicorns",
  hang:"the champions' hall, lounging on its long banquet benches under the old banners",
  party:"a candlelit suite with crimson velvet drapes and a huge canopy bed",
  council:"in a vaulted war room under crimson banners",faculty:"a vaulted, banner-hung council chamber with a roaring fireplace",
  outfit:{outerwear:["fitted {c} brocade tailcoat with {c2} embroidered mythical beasts","crimson",null,"gold"],top:["{c} silk blouse with a high ruffled collar","ivory"],
    bottom:["high-waisted {c} pleated skirt with {c2} trim","crimson",null,"gold"],legwear:["{c} thigh-high boots with {c2} buckles","ivory",null,"gold"],tagCharm:["{c} crown crest brooch","gold"]}},
pride:{cols:["amber gold","chocolate brown","cream"],words:"amber gold, chocolate brown and cream",crest:"lion's paw",
  hall:"on sunlit stone courtyard steps at golden hour, a great carved lion fountain behind them",
  hang:"the sunlit courtyard steps, sprawled across the warm stone like lazy cats",
  party:"a lavish lounge piled with golden silk cushions in warm lamplight",
  council:"on a sun-warmed stone terrace at dusk",faculty:"a sunlit council hall with carved lion pillars and tall open windows",
  outfit:{outerwear:["cropped {c} suede jacket with {c2} fringe","chocolate brown",null,"amber gold"],top:["{c} silk wrap top","cream"],
    bottom:["high-waisted {c} wrap skirt with a {c2} belt","amber gold",null,"chocolate brown"],legwear:["{c} knee-high lace-up boots","chocolate brown"],tagCharm:["{c} paw crest brooch","amber gold"]}},
pack:{cols:["charcoal gray","silver","pine green"],words:"charcoal gray, silver and pine green",crest:"silver crescent moon",
  hall:"in a bonfire clearing on a forest trail at night, tall pines and a full moon above",
  hang:"a bonfire on the old forest trail, toasting marshmallows on sticks",
  party:"a log cabin by firelight, fur throws and a crackling hearth",
  council:"in a firelit hunting lodge",faculty:"a timber-beamed lodge hall with antler chandeliers and a stone hearth",
  outfit:{outerwear:["{c} wool greatcoat with a {c2} faux-fur collar","charcoal gray",null,"silver"],top:["{c} cable-knit turtleneck sweater","pine green"],
    bottom:["{c} plaid skirt with {c2} stripes","charcoal gray",null,"pine green"],legwear:["{c} over-the-knee boots","charcoal gray"],tagCharm:["{c} crescent-moon crest brooch","silver"]}},
frost:{cols:["ice blue","snow white","platinum"],words:"ice blue, snow white and platinum",crest:"white snowflake",
  hall:"on the shore of a frozen lake at twilight, snowflakes drifting and lanterns glowing along the ice",
  hang:"the cocoa bar by the frozen lake, wrapped in blankets with steaming mugs",
  party:"a cozy chalet loft, snow piled against the windows, fur rugs and a fire",
  council:"in an ice-blue boathouse lit by lanterns",faculty:"a frosted glass council room overlooking a frozen lake",
  outfit:{outerwear:["{c} quilted parka with a {c2} faux-fur hood","ice blue",null,"snow white"],top:["{c} fuzzy knit sweater","snow white"],
    bottom:["{c} pleated skirt","ice blue"],legwear:["{c} fur-trimmed snow boots","snow white"],tagCharm:["{c} snowflake crest brooch","platinum"]}},
deep:{cols:["navy blue","teal","pearl white"],words:"navy blue, teal and pearl white",crest:"pearl trident",
  hall:"in a dim aquarium hall after hours, huge glowing tanks of blue water and drifting jellyfish behind them",
  hang:"the aquarium wing after hours, sitting on the floor in the blue glow of the tanks",
  party:"a moody pool house at night, underwater lights rippling across the walls",
  council:"in a blue-lit room behind the shark tank",faculty:"a dark wood council room lined with glowing aquarium windows",
  outfit:{outerwear:["fitted double-breasted {c} captain's coat with {c2} piping","navy blue",null,"teal"],top:["{c} silk blouse with pearl buttons","pearl white"],
    bottom:["high-waisted {c} wide-leg trousers","navy blue"],legwear:["{c} heeled ankle boots","teal"],tagCharm:["{c} trident crest brooch","pearl white"]}},
talons:{cols:["black","oxblood","gunmetal"],words:"black, oxblood and gunmetal",crest:"claw-mark",
  hall:"atop a stone observatory tower at night, a brass telescope and a sky full of stars behind them",
  hang:"the observatory rooftop at night, legs dangling over the edge above the sleeping grounds",
  party:"a secret attic room under the observatory dome, candles everywhere and stars through the skylight",
  council:"in the observatory's shadowy map room",faculty:"a dark-paneled tower chamber with star charts and a brass orrery",
  outfit:{outerwear:["{c} leather longcoat with {c2} buckles","black",null,"gunmetal"],top:["{c} lace-up bodice top","oxblood"],
    bottom:["{c} asymmetric skirt","black"],legwear:["{c} tall heeled boots","black"],gloves:["{c} fingerless leather gloves","black"],tagCharm:["{c} claw crest brooch","gunmetal"]}},
plumes:{cols:["hot pink","emerald green","champagne gold"],words:"hot pink, emerald green and champagne gold",crest:"golden feather",
  hall:"in a glass conservatory around a marble fountain, exotic flowers and golden afternoon light",
  hang:"the conservatory fountain, dangling their feet in the water among the flowers",
  party:"a glamorous suite strewn with rose petals, pink neon and silk sheets",
  council:"in a mirrored dressing room",faculty:"a gilded salon with mirrors, chandeliers and potted palms",
  outfit:{outerwear:["cropped {c} jacket with {c2} feather trim","emerald green",null,"champagne gold"],top:["{c} satin bustier top","hot pink"],
    bottom:["high-waisted {c} ruffled skirt","emerald green"],legwear:["{c} strappy heels","champagne gold"],tagCharm:["{c} feather crest brooch","champagne gold"]}},
grove:{cols:["forest green","bronze","oatmeal"],words:"forest green, bronze and oatmeal",crest:"bronze acorn",
  hall:"in a sunny greenhouse beneath an ancient oak, potted plants, string lights and a tea table",
  hang:"the greenhouse under the old oak, sharing tea, cake and a nap in the warm sun",
  party:"a cozy treehouse loft with quilts, fairy lights and floor cushions",
  council:"in the potting shed behind the greenhouse",faculty:"a cozy oak-paneled study full of plants, books and a teapot",
  outfit:{outerwear:["{c} waxed field jacket with {c2} buttons","forest green",null,"bronze"],top:["{c} linen peasant blouse","oatmeal"],
    bottom:["high-waisted {c} corduroy skirt","forest green"],legwear:["{c} leather lace-up ankle boots","bronze"],tagCharm:["{c} acorn crest brooch","bronze"]}},
coil:{cols:["jade green","obsidian black","antique gold"],words:"jade green, obsidian black and antique gold",crest:"jade serpent",
  hall:"in an emerald drawing room with green velvet chairs, a marble fireplace and a glowing terrarium wall",
  hang:"the emerald drawing room, draped over the velvet chairs with cups of tea",
  party:"a decadent emerald suite with silk sheets and low golden lamps",
  council:"by the drawing room fire",faculty:"an emerald-green study with a terrarium wall and leather armchairs",
  outfit:{outerwear:["high-collared {c} silk duster coat with {c2} scale embroidery","obsidian black",null,"jade green"],top:["{c} satin halter top","jade green"],
    bottom:["{c} pencil skirt with a high slit","obsidian black"],legwear:["{c} heeled boots","obsidian black"],tagCharm:["{c} serpent crest brooch","antique gold"]}},
hive:{cols:["honey gold","deep violet","soft black"],words:"honey gold, deep violet and soft black",crest:"honeycomb",
  hall:"in a greenhouse loft at dusk lit by hundreds of fireflies, honeycomb lanterns and hanging flowers",
  hang:"the greenhouse loft at dusk, catching fireflies in jars",
  party:"a honey-gold boudoir with hexagonal lanterns and silk drapes",
  council:"in the old apiary by lantern light",faculty:"a honey-lit study with hexagonal windows and shelves of jars",
  outfit:{outerwear:["structured {c} cropped blazer with {c2} hexagon-stitched lapels","deep violet",null,"honey gold"],top:["{c} fitted top with {c2} stripes","honey gold",null,"soft black"],
    bottom:["high-waisted {c} pleated skirt","soft black"],legwear:["{c} sheer stockings","soft black"],tagCharm:["{c} honeycomb crest brooch","honey gold"]}}};
  /* the turf two rival groups fight over */
  ACAD.GTURF={"coil|legends":"in the great dining hall, fighting over the best table","pack|pride":"where the sunlit courtyard steps meet the old forest trail",
    "deep|frost":"at the edge of the glowing indoor pool","grove|talons":"in the greenhouse beneath the old oak at night","hive|plumes":"among the flowers of the glass conservatory"};
  /* ---------- the principals: one older man over each group's headmistresses ----------
     c: his own fields (merged over shared older-man defaults); o: his principal's robes; d: off duty */
  ACAD.PRINCIPALS={
legends:{full:"Edmund Kingsley",title:"the Sovereign",pal:{primary:"silver",secondary:"crimson",third:"ivory",accent:"gold",extra:"black"},
  c:{faceShape:"long, noble face with high cheekbones and fine laugh lines",expression:"calm, knowing smile",browShape:"thick silver brows",noseShape:"straight, aristocratic nose",mouthShape:"thin, composed lips",
    impression:"a regal, commanding presence",eyeShape:"deep-set, piercing eyes",eyeOne:"gold",hairStyle:"long hair swept back into a low ponytail",hairLength:"long",hairTexture:"silky straight",bangs:"no bangs",
    hairMovement:"falls in a silver sheet down his back",facialHair:"neatly trimmed beard",skinTone:"fair",undertone:"warm",skinFinish:"lightly lined, mature skin",heightStature:"very tall, regal stature",
    bodySoftness:"lean, broad-shouldered build",posture:"standing tall with both hands resting on a cane",markings:"no markings",penisColor:"pink"},
  o:{outerwear:["long {c} ceremonial academic robe embroidered with {c2} griffins, dragons, phoenixes and unicorns","@secondary",null,"@accent"],top:["high-collared {c} dress shirt","@third"],
    corset:["{c} brocade waistcoat","@accent"],bottom:["tailored suit trousers","@extra"],legwear:["polished oxford shoes","@extra"],neckAccessory:["heavy {c} chain of office with a crown medallion","@accent"],heldItem:["ebony cane topped with a gold crown","-"]},
  d:{top:["{c} cashmere turtleneck","@third"],outerwear:["{c} wool overcoat","@secondary"],bottom:["tailored trousers","@extra"],legwear:["leather loafers","@extra"]},
  blurb:"The Legends' principal: a tall, regal old man with long silver hair in a low ponytail, a trimmed white beard and piercing gold eyes, in a crimson academic robe embroidered with gold mythical beasts and a heavy chain of office.",
  bio:{nickname:"The Sovereign; \"the Old Man\" (never to his face)",age:"64",birthplace:"A crumbling castle on the northern coast",languages:"English, Latin, French, Old Norse",height:"193 cm (6′4″)",
    summary:"The oldest and grandest of the principals, who has run the Legends' faculty for thirty years and treats every one of his girls as a story still being written.",
    traits:"Regal, patient, theatrical, fiercely loyal",strengths:"Commands any room by standing up; remembers every name and every grudge",flaws:"Vain about his hair; cannot resist a speech",
    likes:"Old banners, fencing, epic poetry, a good champion",dislikes:"Cowardice, the Coil's principal, being rushed",hobbies:"Fencing, restoring tapestries, telling the same three war stories",
    habits:"Taps his cane twice before he speaks",catchphrase:"\"Be worth the telling.\"",
    backstory:"A fencing champion in his youth, he came to the Academy to teach swordsmanship and never left. He has outlasted four rival principals and intends to outlast Strand too.",
    family:"A late wife he still writes letters to; two grown sons abroad",status:"Widowed",pets:"An old wolfhound named Beowulf",
    notes:"He keeps the Legends' best table by law of tradition, and he wrote the tradition."}},
pride:{full:"Augustin Leone",title:"the Old Lion",pal:{primary:"silver blond",secondary:"chocolate brown",third:"cream",accent:"amber gold",extra:"dark brown"},
  c:{faceShape:"broad, rugged face with a strong jaw and sun lines",expression:"proud, warm smile",browShape:"heavy golden-gray brows",noseShape:"broad, straight nose",mouthShape:"wide mouth",
    impression:"a proud, protective patriarch",eyeShape:"warm, hooded eyes",eyeOne:"amber",hairStyle:"thick, swept-back mane",hairLength:"shoulder-length",hairTexture:"thick and wavy",bangs:"no bangs",
    hairMovement:"swept back like a lion's mane",facialHair:"thick full beard",skinTone:"golden tan",undertone:"warm",skinFinish:"sun-weathered skin",heightStature:"tall, imposing stature",
    bodySoftness:"broad, powerful build with a barrel chest",posture:"seated in a carved chair like a throne, legs wide",markings:"a faded scar across one cheek",penisColor:"light brown"},
  o:{outerwear:["long {c} suede longcoat with a {c2} faux-fur collar","@secondary",null,"@accent"],top:["{c} linen dress shirt open at the collar","@third"],corset:["{c} waistcoat","@accent"],
    bottom:["tailored trousers","@secondary"],legwear:["riding boots","@extra"],neckAccessory:["{c} lion-head medallion","@accent"],heldItem:["walking stick topped with a gold lion's head","-"]},
  d:{top:["{c} linen shirt with rolled sleeves","@third"],bottom:["{c} chinos","@secondary"],legwear:["leather sandals","@extra"],neckAccessory:["{c} lion-head medallion","@accent"]},
  blurb:"The Pride's principal: a big, proud old lion of a man with a swept-back silver-blond mane, a thick beard, amber eyes and a faded scar, in a chocolate suede longcoat with a fur collar and a gold lion medallion.",
  bio:{nickname:"The Old Lion",age:"61",birthplace:"A vineyard estate in the hills above the sea",languages:"English, Italian, Swahili",height:"190 cm (6′3″)",
    summary:"Loud, warm and protective, he treats the Pride's nine girls like a lion treats his pride: he lets them squabble, and he roars at anyone else who tries it.",
    traits:"Proud, generous, hot-tempered, sentimental",strengths:"Fearless; makes everyone feel like family",flaws:"Holds a grudge against the Pack's principal over a card game from 1998",
    likes:"Long lunches, red wine, safari stories, a good argument",dislikes:"Cold food, quiet rooms, Rourke Hale",hobbies:"Wildlife photography, cooking for forty, napping in the sun",
    habits:"Naps in a patch of sunlight every afternoon and denies it",catchphrase:"\"The pride eats together.\"",
    backstory:"A former wildlife ranger who ran a reserve for twenty years before the Academy recruited him. He still carries a scar from a lioness he raised by hand.",
    family:"A big, loud family of sisters and nieces who visit every summer",status:"Long divorced, happily",pets:"A one-eyed tomcat named Simba",
    notes:"Lioness is the only student who has ever told him to sit down. He did."}},
pack:{full:"Rourke Hale",title:"the Grey",pal:{primary:"silver gray",secondary:"charcoal gray",third:"pine green",accent:"silver",extra:"black"},
  c:{faceShape:"rugged, weathered face with a strong jaw",expression:"dry, crooked half-smile",browShape:"heavy brows, one split by an old scar",noseShape:"slightly crooked nose",mouthShape:"firm mouth",
    impression:"a quiet, dangerous calm",eyeShape:"narrow, watchful eyes",eyeOne:"steel gray",hairStyle:"short, cropped hair",hairLength:"short",hairTexture:"coarse",bangs:"no bangs",
    hairMovement:"stays short and neat",facialHair:"short boxed beard",skinTone:"tan",undertone:"neutral",skinFinish:"weathered, sun-roughened skin",heightStature:"tall, rangy stature",
    bodySoftness:"lean, wiry and strong build",posture:"leaning against a tree with his arms folded",markings:"a scar through one eyebrow",penisColor:"light brown"},
  o:{outerwear:["long {c} wool greatcoat with a {c2} faux-fur collar","@secondary",null,"@accent"],top:["{c} cable-knit turtleneck sweater","@third"],bottom:["dark work trousers","@secondary"],
    legwear:["worn leather boots","@extra"],neckAccessory:["{c} crescent-moon pendant on a leather cord","@accent"],heldItem:["storm lantern","-"]},
  d:{top:["{c} flannel shirt","@third"],outerwear:["{c} canvas work jacket","@secondary"],bottom:["worn jeans","@secondary"],legwear:["work boots","@extra"]},
  blurb:"The Pack's principal: a rangy, weathered old tracker with cropped gray hair, a short gray beard, steel-gray eyes and a scar through one brow, in a charcoal greatcoat with a fur collar and a silver moon pendant.",
  bio:{nickname:"The Grey",age:"58",birthplace:"A logging town at the edge of the northern forest",languages:"English, a little French",height:"188 cm (6′2″)",
    summary:"A man of very few words who runs the Pack's faculty from a bonfire. His girls would follow him into the woods at midnight without asking why; most of them have.",
    traits:"Quiet, steady, loyal, unshakable",strengths:"Tracks anything; never loses his temper",flaws:"Says nothing for weeks, then everything at once",
    likes:"Woodsmoke, long walks, strong coffee, silence",dislikes:"Speeches, Augustin Leone's laugh, city noise",hobbies:"Tracking, whittling, fly fishing",
    habits:"Answers questions with a single raised eyebrow",catchphrase:"\"Stay together.\"",
    backstory:"A search-and-rescue ranger who found three lost students in a blizzard and was offered a job on the spot. He took it on the condition that he never has to wear a tie.",
    family:"An older sister who runs the family sawmill",status:"Single",pets:"A gray wolfdog named Ash",
    notes:"The Pride-Pack feud started with him and Leone over a card game. Neither will say who cheated."}},
frost:{full:"Nils Haraldsen",title:"the Captain",pal:{primary:"snow white",secondary:"ice blue",third:"white",accent:"platinum",extra:"navy blue"},
  c:{faceShape:"broad, ruddy face with rosy cheeks and smile lines",expression:"jolly, twinkling grin",browShape:"bushy white brows",noseShape:"broad nose",mouthShape:"wide, smiling mouth",
    impression:"a warm, grandfatherly giant",eyeShape:"bright, crinkled eyes",eyeOne:"ice blue",hairStyle:"short hair combed back",hairLength:"short",hairTexture:"thick",bangs:"no bangs",
    hairMovement:"stays combed back",facialHair:"walrus mustache",skinTone:"rosy fair",undertone:"cool",skinFinish:"ruddy, wind-burned skin",heightStature:"tall, towering stature",
    bodySoftness:"broad, barrel-chested build",posture:"standing with his thumbs hooked in his coat pockets",markings:"an anchor tattoo on one forearm",penisColor:"pink"},
  o:{outerwear:["long {c} quilted naval greatcoat with {c2} faux-fur trim","@secondary",null,"@third"],top:["{c} fisherman's turtleneck sweater","@third"],bottom:["wool trousers","@extra"],
    legwear:["fur-lined boots","@extra"],neckAccessory:["{c} compass pendant","@accent"]},
  d:{top:["{c} reindeer-pattern knit sweater","@secondary"],bottom:["wool trousers","@extra"],legwear:["fur-lined slippers","@third"],neckAccessory:["{c} compass pendant","@accent"]},
  blurb:"The Frost's principal: a huge, jolly old sea captain with a snow-white walrus mustache, rosy cheeks and twinkling ice-blue eyes, in an ice-blue naval greatcoat with white fur trim.",
  bio:{nickname:"The Captain; \"Grandpa Nils\" (Penguin only)",age:"67",birthplace:"A fishing village on a fjord in the far north",languages:"English, Norwegian, Icelandic",height:"196 cm (6′5″)",
    summary:"A retired icebreaker captain with a laugh like a foghorn, who runs the Frost's faculty like a ship's galley: warm, loud and always serving cocoa.",
    traits:"Jolly, booming, kind, stubborn",strengths:"Calm in any storm; tells the best stories",flaws:"Cannot whisper; spoils his girls rotten",
    likes:"Snow, sea shanties, cocoa with too much cream, the northern lights",dislikes:"Summer, the Deep's principal 'stealing' his pool hours",hobbies:"Ice fishing, carving wooden boats, sauna",
    habits:"Hums sea shanties under his breath",catchphrase:"\"Steady as she goes.\"",
    backstory:"Forty years captaining icebreakers through the polar seas, then a heart scare and a doctor who told him to slow down. He chose the Academy's frozen lake.",
    family:"A wife, Ingrid, who knits for the entire Frost; three daughters and nine grandchildren",status:"Married",pets:"A fat old husky named Bjørn",
    notes:"Penguin calls him Grandpa Nils and he has never once corrected her."}},
deep:{full:"Silas Marrow",title:"the Admiral",pal:{primary:"silvery white",secondary:"navy blue",third:"teal",accent:"brass",extra:"pearl white"},
  c:{faceShape:"strong, chiseled face with deep lines",expression:"stern, unreadable calm",browShape:"straight, heavy brows",noseShape:"broad, straight nose",mouthShape:"full lips set in a firm line",
    impression:"a calm, commanding authority",eyeShape:"heavy-lidded eyes",eyeOne:"gray",hairStyle:"close-cropped hair",hairLength:"very short",hairTexture:"short and neat",bangs:"no bangs",
    hairMovement:"stays close-cropped",facialHair:"short boxed beard",skinTone:"deep brown",undertone:"warm",skinFinish:"smooth, weathered skin",heightStature:"tall, imposing stature",
    bodySoftness:"broad, powerful build",posture:"standing with his hands clasped behind his back",markings:"a thin scar along the jaw",penisColor:"dark brown"},
  o:{outerwear:["double-breasted {c} admiral's greatcoat with {c2} piping and brass buttons","@secondary",null,"@third"],top:["crisp {c} dress shirt","@extra"],neckAccessory:["{c} silk cravat","@third"],
    bottom:["tailored trousers","@secondary"],legwear:["polished boots","black"],headwear:["{c} peaked captain's cap","@secondary"],heldItem:["brass spyglass","-"]},
  d:{top:["{c} linen shirt","@extra"],bottom:["{c} linen trousers","@secondary"],legwear:["boat shoes","@third"]},
  blurb:"The Deep's principal: a tall, stern old admiral with close-cropped white hair, a short white beard, deep brown skin and sea-gray eyes, in a navy admiral's greatcoat with teal piping and brass buttons.",
  bio:{nickname:"The Admiral",age:"62",birthplace:"A harbor city on a warm southern coast",languages:"English, Portuguese, French",height:"191 cm (6′3″)",
    summary:"Silent, precise and impossible to read, he runs the Deep's faculty the way he ran a submarine fleet: quietly, from below, and always three moves ahead.",
    traits:"Calm, precise, secretive, fair",strengths:"Never raises his voice and never needs to",flaws:"Trusts no one he hasn't tested; terrible at small talk",
    likes:"Chess by mail, deep water, jazz, punctuality",dislikes:"Lateness, the Frost's principal humming, noise",hobbies:"Free diving, chess, restoring ship models",
    habits:"Checks his pocket watch whenever someone lies to him",catchphrase:"\"Still waters.\"",
    backstory:"A decorated naval admiral who commanded submarines for twenty years. He took the Academy post to be near the sea, and because Kraken's grandmother asked him to.",
    family:"A wife, Amara, a marine biologist; a son in the navy",status:"Married",pets:"A moray eel in his office tank named Admiral Jr.",
    notes:"He and Haraldsen fight over pool hours every term, then share a bottle of rum every winter."}},
talons:{full:"Lucan Thorne",title:"the Sentinel",pal:{primary:"silver gray",secondary:"black",third:"oxblood",accent:"gunmetal",extra:"charcoal gray"},
  c:{faceShape:"gaunt, angular face with sharp cheekbones",expression:"thin, knowing smirk",browShape:"sharp, arched brows",noseShape:"hooked, aquiline nose",mouthShape:"thin lips",
    impression:"a cold, razor-sharp intellect",eyeShape:"narrow, hawkish eyes",eyeOne:"pale gray",hairStyle:"slicked-back hair",hairLength:"short",hairTexture:"sleek",bangs:"no bangs",
    hairMovement:"slicked perfectly into place",facialHair:"mustache and goatee",skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, pale skin",heightStature:"tall, gaunt stature",
    bodySoftness:"lean, wiry build",posture:"standing very still, gloved hands folded on the head of his cane",markings:"no markings",penisColor:"pink"},
  o:{outerwear:["long {c} frock coat with {c2} lining and gunmetal clasps","@secondary",null,"@third"],top:["{c} high-collared shirt","@secondary"],neckAccessory:["{c} silk cravat with a talon pin","@third"],
    bottom:["slim tailored trousers","@extra"],legwear:["polished riding boots","@secondary"],gloves:["{c} leather gloves","@secondary"],heldItem:["black cane with a silver talon grip","-"]},
  d:{top:["{c} silk shirt","@secondary"],outerwear:["{c} velvet smoking jacket","@third"],bottom:["slim trousers","@extra"],legwear:["leather slippers","@secondary"]},
  blurb:"The Talons' principal: a tall, gaunt old spymaster with slicked-back silver hair, a sharp goatee, a hooked nose and pale hawkish eyes, in a black frock coat lined in oxblood, gloved hands on a talon-gripped cane.",
  bio:{nickname:"The Sentinel",age:"60",birthplace:"Unknown (he says London; his passport says otherwise)",languages:"English, Russian, German, Arabic, Latin",height:"189 cm (6′2″)",
    summary:"A former intelligence officer who sees everything from the observatory tower. Raven reports to him; he pretends he doesn't already know what she's going to say.",
    traits:"Cold, brilliant, dry, quietly kind",strengths:"Knows every secret on the grounds; never forgets a face",flaws:"Trusts no one; enjoys being feared a little too much",
    likes:"Chess, black tea, codes, ravens on the windowsill",dislikes:"Surprises, the Grove's principal's beard, loud laughter",hobbies:"Cryptography, falconry, collecting antique keys",
    habits:"Appears silently behind people",catchphrase:"\"I already know.\"",
    backstory:"Thirty years in intelligence, then a quiet retirement that lasted three weeks. He took the Talons because nobody else wanted a group of thieves and spies, and because he understood them.",
    family:"None he will admit to",status:"Single",pets:"A pair of ravens who live on his windowsill, Hugin and Munin",
    notes:"He has known about Raven and Crow since the first night. He has told no one."}},
plumes:{full:"Julian Ashcombe",title:"the Showman",pal:{primary:"platinum silver",secondary:"emerald green",third:"hot pink",accent:"champagne gold",extra:"black"},
  c:{faceShape:"handsome oval face with laugh lines",expression:"dazzling, theatrical grin",browShape:"expressive arched brows",noseShape:"straight nose",mouthShape:"wide, charming smile",
    impression:"a flamboyant, magnetic showman",eyeShape:"sparkling, expressive eyes",eyeOne:"emerald green",hairStyle:"swept-back pompadour",hairLength:"short",hairTexture:"glossy",bangs:"no bangs",
    hairMovement:"holds a perfect silver wave",facialHair:"van dyke beard",skinTone:"light brown",undertone:"warm",skinFinish:"smooth, glowing skin",heightStature:"average height",
    bodySoftness:"slim, elegant build",posture:"one arm flung wide mid-flourish",markings:"no markings",penisColor:"light brown"},
  o:{outerwear:["{c} velvet tailcoat with {c2} embroidered feathers","@secondary",null,"@accent"],top:["{c} silk shirt","@extra"],neckAccessory:["{c} silk cravat and matching pocket square","@third"],
    corset:["{c} brocade waistcoat","@accent"],bottom:["slim tailored trousers","@extra"],legwear:["patent leather shoes","@extra"],heldItem:["gold-tipped cane with a feather plume","-"]},
  d:{top:["{c} silk shirt unbuttoned at the collar","@third"],outerwear:["{c} velvet blazer","@secondary"],bottom:["white linen trousers","white"],legwear:["velvet loafers","@secondary"]},
  blurb:"The Plumes' principal: a dapper old showman with a silver pompadour, a Van Dyke beard and sparkling emerald eyes, in an emerald velvet tailcoat embroidered with gold feathers and a hot-pink cravat.",
  bio:{nickname:"The Showman; \"Jules\"",age:"57",birthplace:"Backstage at a theater in the old city",languages:"English, French, Italian",height:"178 cm (5′10″)",
    summary:"A retired stage director and choreographer who turns every faculty meeting into a performance and every one of his girls into a star.",
    traits:"Flamboyant, generous, dramatic, sharp-eyed",strengths:"Spots talent instantly; can stage anything",flaws:"Cannot let an entrance go unremarked; overspends wildly",
    likes:"Opening nights, champagne, sequins, gossip",dislikes:"Beige, the Hive's principal's bees in his conservatory",hobbies:"Choreography, costume design, ballroom dancing",
    habits:"Applauds everything, including bad news",catchphrase:"\"Darling, be seen.\"",
    backstory:"Thirty years directing ballets and musicals around the world, then one standing ovation too many. He came to the Academy to build the most beautiful group it had ever seen.",
    family:"A husband, Theo, a set designer",status:"Married",pets:"A white peacock named Liberace who roams the conservatory",
    notes:"He has a standing feud with Kell's bees and a secret soft spot for Hummingbird's chaos."}},
grove:{full:"Elias Oakhart",title:"the Warden",pal:{primary:"ash gray",secondary:"forest green",third:"oatmeal",accent:"bronze",extra:"chocolate brown"},
  c:{faceShape:"kind, weathered face with deep smile lines",expression:"gentle, twinkling smile",browShape:"bushy gray brows",noseShape:"rounded nose",mouthShape:"soft smile",
    impression:"a kind, patient gardener",eyeShape:"warm, crinkled eyes",eyeOne:"warm brown",hairStyle:"long hair loosely tied back",hairLength:"shoulder-length",hairTexture:"wavy",bangs:"no bangs",
    hairMovement:"a few loose strands fall around his face",facialHair:"long beard",skinTone:"tan",undertone:"warm",skinFinish:"sun-weathered skin",heightStature:"tall, sturdy stature",
    bodySoftness:"sturdy, broad build",posture:"leaning on a walking staff",markings:"no markings",penisColor:"light brown"},
  o:{outerwear:["{c} waxed field coat with {c2} buttons","@secondary",null,"@accent"],top:["{c} chunky knit cardigan over a linen shirt","@third"],bottom:["corduroy trousers","@extra"],
    legwear:["muddy leather boots","@extra"],neckAccessory:["{c} acorn pendant","@accent"],heldItem:["gnarled oak walking staff","-"]},
  d:{top:["{c} linen shirt with rolled sleeves","@third"],bottom:["{c} gardening overalls","@secondary"],legwear:["rubber garden boots","@secondary"]},
  blurb:"The Grove's principal: a kindly old gardener with long gray hair tied back, a long gray beard and warm brown eyes, in a forest-green field coat over an oatmeal cardigan, leaning on an oak staff.",
  bio:{nickname:"The Warden; \"Old Oak\"",age:"66",birthplace:"A farmhouse in an apple valley",languages:"English, Welsh",height:"185 cm (6′1″)",
    summary:"The gentlest man at the Academy, who runs the Grove's faculty from a greenhouse armchair with a teapot, and who has never once caught Raccoon or Rat in the act.",
    traits:"Gentle, patient, wise, unhurried",strengths:"Calms anyone down; grows anything",flaws:"Too forgiving; loses track of time completely",
    likes:"Rain on the glass roof, apple pie, naps, old oaks",dislikes:"The Talons' principal's ravens eating his seedlings, hurry",hobbies:"Gardening, beekeeping (badly), woodcarving",
    habits:"Hands out acorns as rewards",catchphrase:"\"Deep roots, little ones.\"",
    backstory:"A botanist who planted half the Academy's grounds forty years ago and was eventually made principal mostly because nobody could get him out of the greenhouse.",
    family:"A wife, Rosalind, who bakes for the whole Grove; four grown children",status:"Married",pets:"A badger-faced old dog named Bramble",
    notes:"He knows exactly who keeps stealing from the kitchens, and leaves extra pie out."}},
coil:{full:"Viktor Strand",title:"the Alchemist",pal:{primary:"silver gray",secondary:"obsidian black",third:"jade green",accent:"antique gold",extra:"black"},
  c:{faceShape:"sharp, angular face with high cheekbones",expression:"slow, sly smile",browShape:"thin, arched brows",noseShape:"narrow, straight nose",mouthShape:"thin, curling lips",
    impression:"a patient, venomous charm",eyeShape:"narrow, heavy-lidded eyes",eyeOne:"jade green",hairStyle:"close-cropped hair",hairLength:"very short",hairTexture:"fine",bangs:"no bangs",
    hairMovement:"stays close-cropped",facialHair:"anchor beard",skinTone:"golden bronze",undertone:"warm",skinFinish:"smooth, lightly lined skin",heightStature:"tall, slender stature",
    bodySoftness:"tall, wiry build",posture:"lounging in a velvet armchair, fingers steepled",markings:"no markings",penisColor:"light brown"},
  o:{outerwear:["long high-collared {c} silk duster coat with {c2} scale embroidery","@secondary",null,"@third"],top:["{c} silk shirt","@secondary"],neckAccessory:["{c} serpent-head collar pin","@accent"],
    bottom:["slim tailored trousers","@extra"],legwear:["polished boots","@extra"],heldItem:["black cane with a gold serpent-head handle","-"]},
  d:{top:["{c} silk shirt open at the collar","@third"],outerwear:["{c} velvet smoking jacket","@secondary"],bottom:["slim trousers","@extra"],legwear:["velvet slippers","@secondary"]},
  blurb:"The Coil's principal: a tall, sly old alchemist with close-cropped silver hair, a sharp anchor beard and jade-green eyes, in a high-collared black silk duster embroidered with jade scales.",
  bio:{nickname:"The Alchemist",age:"59",birthplace:"An old merchant house in a river city",languages:"English, Czech, Russian, Latin",height:"187 cm (6′1″)",
    summary:"A chemist and collector of rare and poisonous things, who has spent twenty years and enormous patience building the Coil into something to fear. He wants the Legends' table even more than Serpent does.",
    traits:"Patient, sly, charming, ruthless",strengths:"Plays the long game; nothing rattles him",flaws:"Can't resist a scheme; holds grudges for decades",
    likes:"Rare orchids, old poisons (in glass cases), chess, revenge served cold",dislikes:"Edmund Kingsley, haste, the Hive leaving",hobbies:"Chemistry, terrarium keeping, collecting antique apothecary jars",
    habits:"Lets silences run until someone else breaks them",catchphrase:"\"Patience is venom.\"",
    backstory:"Heir to a family of apothecaries and perfumers who sold everything but the house to fund his laboratory. He took the Coil when no one else would, and he has never forgiven the Legends for laughing.",
    family:"A sister who runs the family perfumery",status:"Single",pets:"A green tree python named Duchess",
    notes:"Since the bugs left for the Hive, he and Serpent have been choosing new members together, very carefully."}},
hive:{full:"Ambrose Kell",title:"the Keeper",pal:{primary:"steel gray",secondary:"deep violet",third:"honey gold",accent:"brass",extra:"soft black"},
  c:{faceShape:"long, thin face with a kind, crinkled smile",expression:"absent-minded, gentle smile",browShape:"wispy gray brows",noseShape:"long, thin nose",mouthShape:"thin smile",
    impression:"an eccentric, gentle scholar",eyeShape:"soft eyes",eyeOne:"hazel",hairStyle:"neatly combed hair",hairLength:"short",hairTexture:"wavy",bangs:"no bangs",
    hairMovement:"a single curl falls over his forehead",facialHair:"salt-and-pepper beard",skinTone:"fair",undertone:"neutral",skinFinish:"lined, mature skin",heightStature:"very tall, lanky stature",
    bodySoftness:"tall, lean build",posture:"holding up a jar of honey to the light",markings:"no markings",penisColor:"pink"},
  o:{outerwear:["{c} tweed jacket with {c2} elbow patches","@secondary",null,"@third"],corset:["{c} waistcoat with a hexagon pattern","@third"],top:["{c} dress shirt","@extra"],
    neckAccessory:["{c} pocket watch chain","@accent"],bottom:["tailored trousers","@secondary"],legwear:["brogues","@extra"],eyewear:["round {c}-rimmed spectacles","@accent"],heldItem:["jar of golden honey","-"]},
  d:{top:["{c} knit sweater vest over a shirt","@third"],bottom:["{c} corduroy trousers","@secondary"],legwear:["brogues","@extra"],eyewear:["round {c}-rimmed spectacles","@accent"]},
  blurb:"The Hive's principal: a tall, lanky, gentle old scholar with neatly combed gray hair, a salt-and-pepper beard and round brass spectacles, in a violet tweed jacket over a honey-gold hexagon waistcoat.",
  bio:{nickname:"The Keeper",age:"63",birthplace:"A cottage full of beehives in the downs",languages:"English, German, Latin",height:"195 cm (6′5″)",
    summary:"An entomologist so gentle that bees land on him to rest. He agreed to lead the Hive when the bugs split from the Coil, mostly so someone kind would.",
    traits:"Gentle, curious, eccentric, unexpectedly stubborn",strengths:"Infinite patience; knows every insect by name",flaws:"Forgets meetings; forgets meals; forgets his spectacles are on his head",
    likes:"Honey, moths, dusk, field notes",dislikes:"Pesticides, the Plumes' principal's peacock, being hurried",hobbies:"Beekeeping, moth-watching, pressing flowers",
    habits:"Talks to bees; they seem to listen",catchphrase:"\"Many wings, one sting.\"",
    backstory:"A professor of entomology who kept hives on the Academy roof for twenty years before anyone noticed. When the bugs left the Coil, he was the only faculty member Scorpion would talk to.",
    family:"A late partner; a niece who sends him jars of honey from every country she visits",status:"Widowed",pets:"Several hundred thousand bees",
    notes:"He found the Hive's queen in Bee's first week, and has brought her a jar of honey every morning since. Strand has not forgiven him."}}};
  window.GROUPDATA216={crests:Object.keys(ACAD.CREST).length,groups:Object.keys(ACAD.GX).length,principals:Object.keys(ACAD.PRINCIPALS).length};
})();

/* ---- v249: the Synth and the Void as groups: colors, crest, scene settings, principal, and where they clash. Runs after
   groupdata216.js (the groups' identity data) and before groups216.js builds their scenes from it. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof SV249==="undefined"||!ACAD.GX||!ACAD.CREST)return;
  const clone=o=>JSON.parse(JSON.stringify(o));
  Object.entries(SV249.gx).forEach(([g,x])=>{if(!ACAD.GX[g])ACAD.GX[g]=clone(x)});
  Object.entries(SV249.crest).forEach(([g,x])=>{if(!ACAD.CREST[g])ACAD.CREST[g]=clone(x)});
  ACAD.PRINCIPALS=ACAD.PRINCIPALS||{};Object.entries(SV249.principals).forEach(([g,x])=>{if(!ACAD.PRINCIPALS[g])ACAD.PRINCIPALS[g]=clone(x)});
  ACAD.GTURF=ACAD.GTURF||{};Object.entries(SV249.gturf).forEach(([k,v])=>{if(!ACAD.GTURF[k])ACAD.GTURF[k]=v});
})();

/* ---- v245: groups made canon. Runs after the groups' identity data (groupdata216) and before the group scenes are built
   from it (groups216): a new group gets a crest (an existing group's emblem in its own colors), its colors and its scene
   settings (copied from the group it is based on unless the admin wrote its own), and an existing group restyled through
   edits.glooks gets its new colors and crest. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon||!ACAD.CREST||!ACAD.GX)return;
  const L=ACAD.canon.layer(),ADDG=(L.add&&L.add.groups)||{},GL=(L.edits&&L.edits.glooks)||{};
  const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
  const look=(gid,lk,base)=>{if(!lk)return;const shape=ACAD.CREST[lk.shape]||ACAD.CREST[base]||ACAD.CREST[gid]||Object.values(ACAD.CREST)[0];
    const c=Object.assign({o:"#1d1b22"},(ACAD.CREST[gid]||shape).c||{},lk.c||{});ACAD.CREST[gid]={r:clone(Array.isArray(lk.r)&&lk.r.length===16?lk.r:shape.r),c};   /* v269: lk.r, a woken group's own crest */
    const X=ACAD.GX[gid]||clone(ACAD.GX[base]||Object.values(ACAD.GX)[0]);
    if(lk.cols&&lk.cols.length){const old=(X.cols||[]).slice();const sw=v=>{const i=old.indexOf(v);return i>=0&&lk.cols[i]?lk.cols[i]:v};
      if(X.outfit)Object.values(X.outfit).forEach(t=>{if(Array.isArray(t)){t[1]=sw(t[1]);if(t[3])t[3]=sw(t[3])}});X.cols=lk.cols.slice();X.words=lk.words||(lk.cols.length>1?lk.cols.slice(0,-1).join(", ")+" and "+lk.cols[lk.cols.length-1]:lk.cols[0])}
    if(lk.outfit)X.outfit=JSON.parse(JSON.stringify(lk.outfit));if(lk.crest)X.crest=lk.crest;["hall","hang","party","council","faculty"].forEach(k=>{if(lk[k])X[k]=lk[k]});
    ACAD.GX[gid]=X};
  Object.entries(ADDG).forEach(([gid,a])=>{try{look(gid,Object.assign({shape:a.base},a.look||{}),a.base)}catch(e){}});
  Object.entries(GL).forEach(([gid,lk])=>{try{look(gid,lk,gid)}catch(e){}});
  /* v246: where a group clashes with its rivals, and its principal (add.groups[gid].turf / .principal for new groups,
     edits.gextra[gid] for the others). A new principal starts from the based-on group's, in the new group's colors. */
  const GX0=(L.edits&&L.edits.gextra)||{};const G=id=>(ACAD.GROUPS||[]).find(z=>z.id===id);
  ACAD.GTURF=ACAD.GTURF||{};ACAD.PRINCIPALS=ACAD.PRINCIPALS||{};
  /* v255: where each rivalry is fought, and the principals, read from the data file */
  if(ACAD.canonApply){ACAD.canonApply("t.turf",ACAD.GTURF);ACAD.canonApply("t.principals",ACAD.PRINCIPALS)}
  const extraOf=gid=>Object.assign({},ADDG[gid]?{turf:ADDG[gid].turf,principal:ADDG[gid].principal}:{},GX0[gid]||{});
  (ACAD.GROUPS||[]).forEach(g=>{try{const x=extraOf(g.id);if(!Object.keys(x).length)return;
    if(x.turf!==undefined&&g.rival){const k=[g.id,g.rival].sort().join("|");if(x.turf)ACAD.GTURF[k]=String(x.turf);else if(GX0[g.id]&&GX0[g.id].turf==="")delete ACAD.GTURF[k]}
    if(x.principal&&x.principal.full){const cur=ACAD.PRINCIPALS[g.id];
      if(cur)Object.assign(cur,{full:x.principal.full,title:x.principal.title||cur.title,blurb:x.principal.blurb||cur.blurb});
      else{const base=(ADDG[g.id]&&ADDG[g.id].base)||Object.keys(ACAD.PRINCIPALS)[0];const src=ACAD.PRINCIPALS[base]||Object.values(ACAD.PRINCIPALS)[0];if(!src)return;
        const P=clone(src);P.full=x.principal.full;P.title=x.principal.title||"";delete P.bio;
        P.blurb=x.principal.blurb||(g.name+"'s principal.");
        /* his colors: the based-on group's colors become the new group's */
        const oc=((ACAD.GX[base]||{}).cols)||[],nc=((ACAD.GX[g.id]||{}).cols)||[];
        if(P.pal)Object.keys(P.pal).forEach(k=>{const i=oc.indexOf(P.pal[k]);if(i>=0&&nc[i])P.pal[k]=nc[i]});
        ACAD.PRINCIPALS[g.id]=P}}
  }catch(e){if(window.console)console.warn("group extra "+g.id,e)}});
})();

/* ---- v216: the groups as groups. Crests and group colors, a Group Colors look for every girl, a principal for every
   group (an older man over its headmistresses), and the group scenes: portraits, hangouts, councils, nights out,
   initiations and an explicit after-party for each group; showdowns, truce mixers, leaders' feuds and an explicit
   after-dark for each rivalry; a faculty council and a boys' night for each group.
   Every scene is generated from ACAD.GROUPS, so a girl who joins a group joins its scenes. Each one opens in the Scene
   step with the group's lineup: tap members to add or drop them (up to six characters), to fit the image size.
   (Tail block, after bio210.js: it needs BIO_GIRL to find each girl's looks.) ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.GROUPS||!ACAD.GX||!ACAD.CREST)return;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);
  const T=id=>id&&tplById(id);
  const GROUPS=ACAD.GROUPS,G=id=>GROUPS.find(g=>g.id===id);
  const low=n=>n.replace(/^The /,"the ");                       /* "the Talons" mid-sentence */
  const list=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];

  /* ---------- crests ---------- */
  const cache={};
  ACAD.crestURL=g=>{if(cache[g])return cache[g];const p=ACAD.CREST[g];if(!p)return"";
    const cv=document.createElement("canvas");cv.width=16;cv.height=16;const x=cv.getContext("2d");
    p.r.forEach((row,y)=>{for(let i=0;i<16;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=p.c[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return cache[g]=cv.toDataURL("image/png")}catch(e){return""}};
  ACAD.crestImg=(g,size)=>{const u=ACAD.crestURL(g);if(!u)return null;const im=document.createElement("img");im.src=u;im.alt="";im.width=size||16;im.height=size||16;im.className="pxhead pxcrest";im.setAttribute("aria-hidden","true");return im};

  /* ---------- the groups learn their colors, crest and principal ---------- */
  const P=ACAD.PRINCIPALS||{};
  const pName=g=>P[g]?"Principal "+P[g].full.split(" ").pop():"";
  GROUPS.forEach(g=>{const X=ACAD.GX[g.id];if(X){g.colors=X.cols.slice();g.colorWords=X.words;g.crest=X.crest}
    if(P[g.id]){g.principal=`${P[g.id].full}, ${P[g.id].title}`;g.principalId="principal"+g.id}});

  /* options and pieces go where the studio's own lists keep them */
  const bestGroup=f=>{const a=CHAR[f]||[],cnt={};a.forEach(([,g])=>{if(g&&g!=="Academy")cnt[g]=(cnt[g]||0)+1});return(Object.entries(cnt).sort((x,y)=>y[1]-x[1])[0]||["More"])[0]};
  const opt=(f,v)=>{if(typeof v==="string"&&v&&v[0]!=="@")START.option(f,v,bestGroup(f))};
  const piece=(f,v,fam)=>{if(v)START.item(f,v,"CU",fam)};

  /* ---------- Group Colors: every girl in her group's colors ---------- */
  const mustAt=s=>`an anime style with high detail, ${String(s).replace(/^(in|on|atop) /,"")}, and particular emphasis on highly detailed skin, hair and eyes`;
  {const rows=[];
    GROUPS.forEach(g=>{const X=ACAD.GX[g.id];if(!X)return;
      Object.entries(X.outfit).forEach(([f,a])=>piece(f,a[0],"preppy,glam"));
      g.members.forEach(h=>{if(!T(ACAD.robes(h)))return;
        rows.push({id:h+"gcolors",base:ACAD.robes(h),name:`${HN(h)} in ${low(g.name).replace(/^the /,"")} colors`,
          blurb:`${HN(h)} in ${low(g.name)}'s colors, ${X.words}: ${X.outfit.outerwear[0].replace(/\{c2?\}\s?/g,"")} and the ${X.crest} crest brooch, ${X.hall}. Face, hair and build come from the ${HN(h)} robes.`,
          outfit:{oname:`${g.name.replace(/^The /,"")} colors`,look:"preppy",items:JSON.parse(JSON.stringify(X.outfit)),details:{},dcol:{}},more:[],nude:true,
          tags:[h,"academy","group colors",g.id],out:{framing:"cowboy shot",must:mustAt(X.hall)}})})});
    START.add("Academy Group Colors",rows,{after:"Academy House Regalia"});
    if(ACAD.CATS){const c=ACAD.CATS.find(x=>x[0]==="Robes and faculty");if(c&&!c[1].includes("Academy Group Colors")){const i=c[1].indexOf("Academy House Regalia");c[1].splice(i<0?c[1].length:i+1,0,"Academy Group Colors")}}}

  /* ---------- the principals ---------- */
  const MDEF={sex:"male",age:"older man",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"clear iris detail",lashNatural:"thick, understated eyelashes",nailStyle:"short, clean natural nails",
    hairBase:"@primary",facialHairColor:"@primary",bustSize:"broad chest",bustShape:"firm pecs",bustWeight:"solid muscle",shoulderShape:"broad shoulders",torsoShape:"solid, mature torso",
    armShape:"strong arms",handShape:"large, weathered hands",waistShape:"trim waist",stomachShape:"flat stomach",hipShape:"narrow hips",buttSize:"firm butt",thighBuild:"strong thighs",
    legShape:"long legs",bodyHair:"graying chest hair",penisSize:"large",penisType:"thick",pubicHair:"trimmed graying pubic hair"};
  {const rows=[];
    GROUPS.forEach(g=>{const p=P[g.id];if(!p)return;
      const c=Object.assign({},MDEF,p.c);Object.entries(c).forEach(([f,v])=>opt(f,v));
      [p.o,p.d].forEach(o=>Object.entries(o).forEach(([f,a])=>piece(f,a[0],"preppy")));
      rows.push({id:"principal"+g.id,name:"Principal "+p.full,blurb:p.blurb+" Off duty, or nude.",pal:Object.assign({},p.pal),c,
        outfit:{oname:"Principal's robes",look:"preppy",items:JSON.parse(JSON.stringify(p.o)),details:{},dcol:{}},
        more:[{oname:"Off duty",look:"casual",items:JSON.parse(JSON.stringify(p.d)),details:{},dcol:{}}],nude:true,
        tags:["man","principal","faculty","male",g.id],out:{framing:"full body",must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes"}})});
    START.add("Academy Principals",rows,{after:"Academy Men"});
    if(ACAD.CATS){const c=ACAD.CATS.find(x=>x[0]==="Robes and faculty");if(c&&c[1].includes("Academy Principals"))c[1].splice(c[1].indexOf("Academy Principals"),1)}}

  /* ---------- bios: the principals, and the headmistresses and boyfriends join their groups ---------- */
  const rivalOf=g=>G(g.rival);
  GROUPS.forEach(g=>{const p=P[g.id],t=T("principal"+g.id),rv=rivalOf(g),rp=rv&&P[rv.id];
    if(p&&t)t.bio=Object.assign({fullName:p.full},p.bio,{occupation:`Principal of ${low(g.name)}`,group:g.name,
      groupRole:`Principal. The head of ${low(g.name)}'s faculty and the boss of its headmistresses.`,rivalGroup:rv?rv.name:"",
      friends:`His headmistresses: ${list(g.members.filter(h=>T(h+"head")).map(h=>"the "+HN(h)+" headmistress"))}`,
      rivals:rp?`${rp.full}, ${rp.title}, principal of ${rv.name}`:""});
    g.members.forEach(h=>{
      const hd=T(h+"head");
      /* v249: a headmistress who already has her name keeps it, and learns her group */
      if(hd&&(!hd.bio||!hd.bio.group))hd.bio=Object.assign({occupation:`Headmistress of ${HN(h)} House`,house:h,group:g.name,
        groupRole:`Faculty. Headmistress of ${HN(h)} House${p?`, one of ${pName(g.id)}'s headmistresses`:""} in ${low(g.name)}.`,rivalGroup:rv?rv.name:"",
        notes:p?`Answers to ${p.full}, ${p.title}, principal of ${low(g.name)}.`:""},hd.bio||{});
      const mn=T(h+"man"),gb=typeof BIOS!=="undefined"&&BIOS[h];
      if(mn&&(!mn.bio||!mn.bio.group))mn.bio=Object.assign({house:h,group:g.name,groupRole:`Boyfriend. ${HN(h)}'s boyfriend, and one of ${low(g.name)}'s boys.`,
        status:"In a relationship",partner:HN(h)+(gb&&gb.fullName?` (${gb.fullName})`:""),
        friends:`The other ${low(g.name).replace(/^the /,"")} boyfriends: ${list(g.members.filter(x=>x!==h&&T(x+"man")).map(x=>HN(x)+"'s"))||"none yet"}`,
        notes:String(mn.blurb||"").split(/(?<=\.)\s/)[0]},mn.bio||{})})});

  /* ---------- scenes ---------- */
  const lookMap=label=>{const m={},gr=PRESET_GROUPS.start.find(x=>x.label===label);
    if(gr)gr.keys.forEach(k=>{const t=T(k),hh=t&&window.BIO_GIRL&&BIO_GIRL(t);if(hh&&!m[hh])m[hh]=k});return m};
  const DAY=lookMap("Academy Day Off"),DATE=lookMap("Academy Date Night");
  const ROBE=h=>ACAD.robes(h),GC=h=>T(h+"gcolors")?h+"gcolors":ROBE(h);
  const dayOf=h=>DAY[h]||ROBE(h),dateOf=h=>DATE[h]||ROBE(h);
  const looksFor=(fn,hs)=>{const o={};hs.forEach(h=>{const id=fn(h);if(id&&T(id))o[h]=id});return o};
  const nudeAt=id=>{const t=T(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).map(o=>o&&o.oname).indexOf("Nude");return i<0?0:i};
  const NUDE={oname:"Nude",look:"",items:{},details:{},dcol:{}};
  /* one scene: ids[0] is character 1 (the starting point's own look), ids[1] character 2, the rest characters 3 to 6 */
  function row(set,g,o){
    const ids=o.ids.filter(id=>T(id));if(ids.length<2)return null;
    const ex=!!o.explicit,oft=id=>ex?nudeAt(id):0;
    const p={id:ids[1],outfit:oft(ids[1]),group:g.id,scene:o.scene,act:o.act||"",dir:"mutual",tags1:o.tags1||"",tags2:o.tags2||o.mtags||"",mtags:o.mtags||"",compact:false,fit:true};
    /* a scene's expressions replace each character's own (ex1, ex2, and mex for everyone after them) */
    if(o.ex1)p.ex1=o.ex1;if(o.ex2||o.mex)p.ex2=o.ex2||o.mex;if(o.mex)p.mex=o.mex;
    const more=ids.slice(2,6).map(id=>({id,outfit:oft(id),tags:o.mtags||"",...(o.mex?{ex:o.mex}:{})}));if(more.length)p.more=more;
    if(o.group2)p.group2=o.group2;if(o.roster)p.roster=o.roster;if(o.looks&&Object.keys(o.looks).length)p.looks=o.looks;
    if(ex){p.explicit=true;p.c1={expression:"flushed, blissful smile"}}
    const hs=o.houses||[];
    const r={id:o.id,base:ids[0],name:o.name,blurb:o.blurb+` ${ids.length} characters; the Scene step's lineup adds or drops members (up to six), to suit the image size.`,
      tags:hs.concat(["group scene",g.id]).concat(o.group2?[o.group2]:[]),out:{framing:o.framing||"cowboy shot",pair:p}};
    if(ex){r.out.explicit=true;r.out.lewdtag=true;r.outfit=JSON.parse(JSON.stringify(NUDE));r.more=[];r.c={expression:"flushed, blissful smile"}}
    if(o.c)r.c=Object.assign(r.c||{},o.c);
    return r;
  }
  opt("expression","flushed, blissful smile");
  const PLEASURE="blush, half-closed eyes, open mouth, moaning, heavy breathing, sweat";
  const SETS={},add=(label,r)=>{if(r)(SETS[label]=SETS[label]||[]).push(r)};
  GROUPS.forEach(g=>{
    const X=ACAD.GX[g.id];if(!X)return;
    if(!g.leader||!g.members.length)return;   /* v245: a new group gets its scenes once a girl joins it */
    const L=g.leader,M=g.members.filter(h=>T(ROBE(h))),O=M.filter(h=>h!==L),gn=low(g.name),rv=rivalOf(g),RX=rv&&ACAD.GX[rv.id];
    const pick=(hs,fn)=>hs.map(fn);
    /* 1. portrait: the leader and three of her girls, in robes */
    {const hs=[L].concat(O.slice(0,3));
     add("Academy Group Portrait",row("p",g,{id:"grpportrait"+g.id,ids:pick(hs,ROBE),houses:hs,name:`${g.name}: group portrait`,
       blurb:`${list(hs.map(HN))} of ${gn} pose for a formal portrait ${X.hall}.`,
       scene:`A formal group portrait of the {n} girls of ${gn}, ${X.hall}, the ${X.crest} crest of ${gn} on a great banner behind them. Their leader stands at the center with the others gathered close around her, all of them proud and smiling at the viewer. group picture, looking at viewer, standing, smile`,
       tags1:"confident smile, hand on own hip",mtags:"smile, looking at viewer"}))}
    /* 2. the whole group in its colors (up to six) */
    {const hs=[L].concat(O.slice(0,5));
     add("Academy Group Colors Portrait",row("c",g,{id:"grpcolors"+g.id,ids:pick(hs,GC),houses:hs,looks:looksFor(GC,M),name:`${g.name}: in group colors`,
       blurb:`${gn.replace(/^t/,"T")} together in their colors, ${X.words}: ${list(hs.map(HN))}, ${X.hall}.`,
       scene:`The whole of ${gn} together in their group colors, ${X.words}: {n} girls posing shoulder to shoulder ${X.hall}, every one of them wearing the ${X.crest} crest brooch, proud and beaming. group picture, looking at viewer, smile, standing`,
       tags1:"proud smile, hand on own hip",mtags:"smile, looking at viewer"}))}
    /* 3. hangout: three of them on a day off */
    {const hs=[L].concat(O.slice(0,2));
     add("Academy Group Hangout",row("h",g,{id:"grphang"+g.id,ids:pick(hs,dayOf),houses:hs,looks:looksFor(dayOf,M),name:`${g.name}: hanging out`,
       blurb:`${list(hs.map(HN))} of ${gn} on a lazy afternoon at ${X.hang.split(",")[0]}.`,
       scene:`The {n} girls of ${gn} hanging out together on a lazy afternoon at ${X.hang}: laughing, gossiping and sprawled comfortably close to each other, completely at ease. laughing, sitting, casual, friends`,
       tags1:"laughing, relaxed",mtags:"smile, relaxed"}))}
    /* 4. the leader's council, plotting against the rival group */
    {const hs=[L].concat(O.slice(0,2));
     add("Academy Group Council",row("k",g,{id:"grpcouncil"+g.id,ids:pick(hs,ROBE),houses:hs,name:`${g.name}: the leader's council`,
       blurb:`${HN(L)} and her lieutenants plot against ${rv?low(rv.name):"their rivals"} ${X.council}.`,
       scene:`The leader of ${gn} and her lieutenants plot around a candlelit table ${X.council}, maps, notes and a chessboard spread before them${RX?` and the ${RX.crest} crest of ${low(rv.name)} pinned to the wall with a dagger`:""}. The leader leans forward to make her point while the others listen intently. scheming, table, candlelight, map, indoors`,
       ex1:"smirk, confident",tags1:"leaning forward, pointing",mex:"serious, attentive",mtags:"sitting, listening"}))}
    /* 5. a night out in their best */
    {const hs=[L].concat(O.slice(0,3));
     add("Academy Group Night Out",row("n",g,{id:"grpnight"+g.id,ids:pick(hs,dateOf),houses:hs,looks:looksFor(dateOf,M),name:`${g.name}: night out`,
       blurb:`${list(hs.map(HN))} of ${gn}, dressed up for a night out at a rooftop lounge.`,
       scene:`The {n} girls of ${gn} dressed to the nines for a night out at a glamorous rooftop lounge, city lights glittering below, raising their glasses together in a toast and laughing. night, cityscape, cocktail glass, toast, smile`,
       tags1:"raising glass, laughing",mtags:"holding drink, smile"}))}
    /* 6. initiation: the newest member (or your own girl, with Keep my character on) is welcomed in */
    if(O.length){const nw=O[O.length-1],hs=[nw,L].concat(O.filter(h=>h!==nw).slice(0,2));
     add("Academy Group Initiation",row("i",g,{id:"grpinit"+g.id,ids:pick(hs,ROBE),houses:hs,name:`${g.name}: initiation`,
       blurb:`${HN(nw)}'s initiation into ${gn}: ${HN(L)} pins the crest on her while the others applaud. With Keep my character on, your own girl is the one being welcomed in.`,
       scene:`An initiation ceremony by candlelight at ${X.hang.split(",")[0]}: the girls of ${gn} welcome their newest member, who stands nervous and glowing in the middle as their leader pins the ${X.crest} crest brooch onto her robe and the others applaud, beaming. candlelight, ceremony, applauding, smile`,
       ex1:"nervous smile, blush",tags1:"looking at another",ex2:"proud smile",tags2:"looking at another",mex:"smile, happy",mtags:"applauding"}))}
    /* 7. after-party (explicit, consensual, all adults) */
    {const hs=[L].concat(O.slice(0,2));
     add("Academy Group After-Party",row("a",g,{id:"grpafter"+g.id,ids:pick(hs,ROBE),houses:hs,explicit:true,framing:"full body",name:`${g.name}: after-party`,
       blurb:`Late after the celebration, ${list(hs.map(HN))} of ${gn} end up in one bed together in ${X.party}.`,
       scene:`Late after the celebration, in ${X.party}, the {n} women of ${gn} tangle together naked on a huge bed in a heated, giggling yuri group session, kissing deeply, fondling each other's breasts and fingering each other, flushed and breathless. nude, yuri, on bed, sweat, blush`,
       act:"kiss, breast grab, fingering",ex1:PLEASURE,mex:PLEASURE}))}
    /* rival groups: this group as character 1 */
    if(rv){const RL=rv.leader,RO=rv.members.filter(h=>h!==RL&&T(ROBE(h))),key=[g.id,rv.id].sort().join("|"),turf=(ACAD.GTURF||{})[key]||"in the great hall";
      const hs=[L,RL].concat(O.slice(0,1),RO.slice(0,1));
      const both=g.members.concat(rv.members);
      add("Academy Rival Groups: Showdown",row("s",g,{id:"rgshow"+g.id,ids:pick(hs,ROBE),houses:hs,group2:rv.id,name:`${g.name} vs ${low(rv.name)}: showdown`,
        blurb:`${gn.replace(/^t/,"T")} and ${low(rv.name)} square up ${turf}: ${HN(L)} nose to nose with ${HN(RL)}.`,
        scene:`${gn.replace(/^t/,"T")} and ${low(rv.name)} face off ${turf}: the two groups square up with their leaders nose to nose in the middle, glaring, their girls bristling at their backs, the ${X.crest} and ${RX.crest} banners hanging on either side. glaring, eye contact, rivalry, arms crossed`,
        ex1:"angry, glaring, v-shaped eyebrows",ex2:"smirk, glaring",mex:"glaring, frown",mtags:"arms crossed"}));
      add("Academy Rival Groups: Truce Mixer",row("t",g,{id:"rgtruce"+g.id,ids:pick(hs,dateOf),houses:hs,group2:rv.id,looks:looksFor(dateOf,both),name:`${g.name} and ${low(rv.name)}: truce mixer`,
        blurb:`A tense truce party ${turf}: ${gn} and ${low(rv.name)} in their best, trying very hard to get along.`,
        scene:`A tense truce party ${turf}: ${gn} and ${low(rv.name)} mingle in their finest, drinks in hand, the two leaders clinking glasses with stiff, forced smiles while their girls trade side-eyes and the first reluctant laughs. party, holding drink, forced smile, side glance`,
        ex1:"forced smile",ex2:"forced smile",tags1:"holding drink",tags2:"holding drink",mex:"side glance, pout",mtags:"holding drink"}));
      add("Academy Rival Groups: Leaders' Feud",row("f",g,{id:"rgfeud"+g.id,ids:[ROBE(L),ROBE(RL)],houses:[L,RL],group2:rv.id,name:`${HN(L)} vs ${HN(RL)}: leaders' feud`,
        blurb:`The leaders of ${gn} and ${low(rv.name)}, ${HN(L)} and ${HN(RL)}, argue nose to nose ${turf}.`,
        scene:`The leaders of ${gn} and ${low(rv.name)} argue nose to nose ${turf}, fingers jabbing, sparks practically flying between them, neither willing to back down an inch. argument, angry, eye contact, pointing at another`,
        ex1:"angry, shouting, v-shaped eyebrows",tags1:"pointing at another",ex2:"smug, glaring",tags2:"arms crossed",mex:"nervous, sweatdrop",mtags:"watching"}));
      add("Academy Rival Groups: After Dark",row("d",g,{id:"rgdark"+g.id,ids:pick(hs,ROBE),houses:hs,group2:rv.id,explicit:true,framing:"full body",name:`${g.name} and ${low(rv.name)}: after dark`,
        blurb:`Long after the truce party, the rivalry between ${gn} and ${low(rv.name)} turns into something else in ${X.party}.`,
        scene:`Long after the truce party ends, the rivalry between ${gn} and ${low(rv.name)} turns into something else entirely: the {n} women tumble together naked across a wide bed in ${X.party}, rivals kissing hungrily, fingering and grinding against each other in a heated yuri group session, flushed and breathless. nude, yuri, on bed, sweat, blush`,
        act:"kiss, fingering, breast grab",ex1:PLEASURE,mex:PLEASURE}))}
    /* faculty: the principal and the group's headmistresses */
    {const heads=[L].concat(O).filter(h=>T(h+"head")).slice(0,5),p=P[g.id];
     if(p&&T("principal"+g.id)&&heads.length)add("Academy Faculty Council",row("x",g,{id:"faccouncil"+g.id,ids:["principal"+g.id].concat(heads.map(h=>h+"head")),houses:heads,roster:"head",
       name:`${g.name}: faculty council`,framing:"cowboy shot",
       blurb:`${p.full}, ${p.title}, presides over ${gn}${/s$/.test(gn)?"'":"'s"} headmistresses: ${list(heads.map(h=>"the "+HN(h)+" headmistress"))}.`,
       scene:`The faculty of ${gn} in council: their principal, an older man, presides at the head of a long table in ${X.faculty}, his headmistresses seated around him in their academic gowns, papers, inkwells and teacups before them, the ${X.crest} crest carved above the fireplace. meeting, sitting, table, indoors`,
       ex1:"serious, calm",tags1:"sitting, hands together",mex:"attentive, serious",mtags:"sitting"}))}
    /* boys' night: the group's boys (v260: by name) */
    {const men=[L].concat(O).filter(h=>T(h+"man")).slice(0,4);
     if(men.length>=2)add("Academy Boys' Night",row("b",g,{id:"boysnight"+g.id,ids:men.map(h=>h+"man"),houses:men,roster:"man",name:`${g.name}: boys' night`,
       blurb:`The boys of ${gn} (${list(men.map(h=>{const m=T(h+"man");return m&&m.bio&&m.bio.fullName?m.bio.fullName:HN(h)+"'s"}))}) on a boys' night of cards and beer.`,
       scene:`The young men of ${gn} on a boys' night in a smoky games room: playing cards around a table with beers in hand, laughing, trading stories and arguing over the last hand. card game, holding drink, laughing, sitting, indoors`,
       tags1:"laughing, holding cards",mtags:"holding drink, grin"}))}
  });
  const ORDER=["Academy Group Portrait","Academy Group Colors Portrait","Academy Group Hangout","Academy Group Council","Academy Group Night Out","Academy Group Initiation","Academy Group After-Party",
    "Academy Rival Groups: Showdown","Academy Rival Groups: Truce Mixer","Academy Rival Groups: Leaders' Feud","Academy Rival Groups: After Dark","Academy Faculty Council","Academy Boys' Night"];
  let after="Academy Rivals Lovers";
  ORDER.forEach(l=>{if(SETS[l]&&SETS[l].length){START.add(l,SETS[l],{after});after=l}});
  /* the Scenes list: groups first, then rival groups, then the rest; faculty and boyfriends before the close-ups */
  const S2=l=>l.replace(/^Academy /,"");
  const CG=["Groups",ORDER.slice(0,7)],CR=["Rival groups",ORDER.slice(7,11)],CF=["Faculty and boyfriends",ORDER.slice(11)];
  if(ACAD.SCENE_CATS){const sc=ACAD.SCENE_CATS;const ai=sc.findIndex(c=>c[0]==="Anime close-ups");
    sc.splice(ai<0?sc.length:ai,0,[CF[0],CF[1].map(S2)]);sc.unshift([CG[0],CG[1].map(S2)],[CR[0],CR[1].map(S2)])}
  if(ACAD.SCENE_ORDER){const so=ACAD.SCENE_ORDER,first=CG[1].concat(CR[1]),rest=so.filter(l=>!first.includes(l)&&!CF[1].includes(l));
    const ai=rest.indexOf("Academy Anime: Portraits");if(ai>=0)rest.splice(ai,0,...CF[1]);else rest.push(...CF[1]);
    so.length=0;so.push(...first,...rest)}
  if(ACAD.SCENES_KEPT)ORDER.forEach(l=>ACAD.SCENES_KEPT.add(l));
  ACAD.GROUP_SCENES=ORDER.filter(l=>SETS[l]);
  window.GROUPS216={sets:ACAD.GROUP_SCENES.length,scenes:ORDER.reduce((n,l)=>n+(SETS[l]||[]).length,0),principals:Object.keys(P).length};
})();

/* ---- v252: Everspire carries no pre-made adult content. Every pre-made look or scene the studio marks explicit goes, and
   so does every set built for nudity, lingerie or the bedroom, and every undressed alternate outfit (Nude, boudoir looks,
   lingerie, topless and the like) on the sets that stay. A set that is mostly explicit goes whole; a set with a few
   explicit scenes keeps the rest. A scene whose partner was removed goes with it. The studio itself keeps every option:
   the intimate details, the Character only prompt and the explicit settings are the player's to use.
   Runs once every set is made (before the groups, the Encyclopedia and the pickers read them); ACAD.PURGED keeps the
   removed set labels, and ACAD.purgeTidy() drops them from every list of sets made before this ran. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof TEMPLATES==="undefined"||typeof PRESET_GROUPS==="undefined")return;
  const T0=performance.now();
  const peek=t=>ACAD.peekOut?ACAD.peekOut(t):t&&t.out;
  /* sets made for nudity, lingerie or the bedroom, though not marked explicit */
  const SUGGEST=["Headmistress Night","Morning After","Onsen","Boudoir","Lingerie Try-On","Artists' Models","Pregnant","First Time","Afterglow",
    "Ruined","Office Hours","Library After Hours","Strip Club","Latex","Anime: Lingerie","Real: Lingerie","Mortified","Locker Room"].map(x=>"Academy "+x);
  const S=PRESET_GROUPS.start||[];
  const isEx=k=>{const t=tplById(k),o=t&&peek(t);return !!(o&&o.explicit)};
  const REMOVE=new Set(SUGGEST);
  S.forEach(g=>{const n=g.keys.filter(isEx).length;if(n&&n*2>=g.keys.length)REMOVE.add(g.label)});
  /* v306: every girl has the same sets. A set that does not reach every girl goes; a set with no girl of its own (the groups' scenes) stays. */
  {const HS=(ACAD.HOUSES||[]).map(h=>h.id||h),byLen=HS.slice().sort((a,b)=>b.length-a.length);
   const hOf=k=>{const t=tplById(k);if(t&&t._house)return t._house;return byLen.find(x=>k.startsWith(x)||k.endsWith(x))||null};
   S.forEach(g=>{if(!/^Academy/.test(g.label)||REMOVE.has(g.label))return;const c=new Set();g.keys.forEach(k=>{const h=hOf(k);if(h)c.add(h)});if(c.size&&c.size<HS.length)REMOVE.add(g.label)})}
  const gone=new Set();
  S.forEach(g=>{if(REMOVE.has(g.label))g.keys.forEach(k=>gone.add(k))});
  TEMPLATES.forEach(t=>{const o=peek(t);if((o&&o.explicit)||(t.outfit&&t.outfit.look==="boudoir"))gone.add(t.id)});
  /* the archive's own scenes: a scene whose general scene was left out of the archive goes too */
  if(ACAD.RX&&ACAD.RX.SETS&&ACAD.RX.variant){const inArch=new Set(),labs=new Set();
    ACAD.RX.SETS.forEach(s=>{labs.add(s.label);for(let vi=0;vi<s.n;vi++)(ACAD.RX.variant(s.si,vi).m||[]).forEach(id=>inArch.add(id))});
    S.forEach(g=>{if(labs.has(g.label))g.keys.forEach(k=>{if(!inArch.has(k))gone.add(k)})})}
  /* a scene whose partner is gone goes too */
  for(let pass=0;pass<4;pass++){let more=0;TEMPLATES.forEach(t=>{if(gone.has(t.id))return;const o=peek(t),p=o&&o.pair;const pid=p&&typeof p.id==="string"?p.id:null;
    if(pid&&gone.has(pid)){gone.add(t.id);more++}});if(!more)break}
  /* undressed alternates */
  const UNDRESSED=/\b(nude|naked|topless|skyclad|bare|undone|undress|undressed|undressing|no pants|micro bikini|lingerie|negligee|bedsheet|towel|after the bath|fresh from the shower|mid-transformation|robe and panties|borrowed shirt)\b/i;
  const offAlt=m=>m&&(m.look==="boudoir"||UNDRESSED.test(String(m.oname||"")));
  const keep=[];let alts=0;
  TEMPLATES.forEach(t=>{if(gone.has(t.id))return;if(Array.isArray(t.more)){const n=t.more.length;t.more=t.more.filter(m=>!offAlt(m));alts+=n-t.more.length}keep.push(t)});
  TEMPLATES.length=0;for(let i=0;i<keep.length;i+=5000)TEMPLATES.push(...keep.slice(i,i+5000));
  /* Day Off and its group hangout: panties as the bottom become lounge shorts */
  ["Academy Day Off","Academy Group Hangout"].forEach(l=>{const g=S.find(x=>x.label===l);if(!g)return;g.keys.forEach(k=>{const t=tplById(k);const it=t&&t.outfit&&t.outfit.items;if(!it||!it.panties)return;
    if(!it.bottom)it.bottom=["soft cotton lounge shorts",it.panties[1]||"@secondary"];delete it.panties})});
  /* the sets themselves */
  for(let i=S.length-1;i>=0;i--){const g=S[i];if(REMOVE.has(g.label)){S.splice(i,1);continue}g.keys=g.keys.filter(k=>!gone.has(k));if(!g.keys.length&&/^Academy/.test(g.label)){REMOVE.add(g.label);S.splice(i,1)}}
  ACAD.PURGED=REMOVE;ACAD.PURGED_IDS=gone;
  ACAD.PURGE={sets:REMOVE.size,templates:gone.size,alternates:alts,ms:Math.round(performance.now()-T0)};
  /* every list of set labels made before this ran: drop the removed ones (and categories left empty) */
  const isLab=x=>typeof x==="string"&&(REMOVE.has(x)||REMOVE.has("Academy "+x));   /* some lists hold display names */
  function tidy(v,depth){if(depth>3||!v)return v;
    if(v instanceof Set){[...v].forEach(x=>{if(isLab(x))v.delete(x)});return v}
    if(Array.isArray(v)){if(v.some(isLab)){const k=v.filter(x=>!isLab(x));v.length=0;v.push(...k)}
      for(let i=v.length-1;i>=0;i--){const x=v[i];if(Array.isArray(x)&&x.length>=2&&typeof x[0]==="string"&&Array.isArray(x[1])){const had=x[1].some(isLab);tidy(x[1],depth+1);if(had&&!x[1].length)v.splice(i,1)}}
      return v}
    return v}
  ACAD.purgeTidy=()=>{Object.keys(ACAD).forEach(k=>{if(k==="PURGED"||k==="PURGED_IDS")return;const v=ACAD[k];if(!(v instanceof Set||Array.isArray(v)))return;
    const hadLabels=Array.isArray(v)?v.some(x=>isLab(x)||(Array.isArray(x)&&Array.isArray(x[1])&&x[1].some(isLab))):[...v].some(isLab);if(hadLabels)tidy(v,0)})};
  ACAD.purgeTidy();
})();

/* ---- v234: keep the 16x16 group crests before the 32x32 crests replace them (px234.js). ---- */
if(typeof ACAD!=="undefined"&&ACAD.crestURL)ACAD.crestURL16=ACAD.crestURL;

/* ---- v231: pixel art at 32x32 (tail block, after groups216.js). The heads come from pixel231.js (ACAD.PIXEL); here they
   are drawn at any size, and the crests are redrawn at 32x32: a bevelled shield with the group's band and field, and the
   group's emblem at twice the size with an outline of its own. ACAD.shield32URL(key, colors, cells) draws any shield in the
   same style (the Encyclopedia's lost groups and sleeping Houses use it). Images shown smaller than 32px are smoothed
   instead of having every other pixel dropped. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  const N=32;
  const draw=(rows,cols)=>{const n=rows.length,cv=document.createElement("canvas");cv.width=n;cv.height=n;const x=cv.getContext("2d");
    rows.forEach((row,y)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=cols[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return cv.toDataURL("image/png")}catch(e){return""}};
  const img=(src,size,cls)=>{if(!src)return null;const im=document.createElement("img");im.src=src;im.alt="";im.width=size||N;im.height=size||N;im.className=cls;im.setAttribute("aria-hidden","true");
    if((size||N)<N)im.style.imageRendering="auto";return im};
  ACAD.pxImg=img;
  /* heads */
  if(ACAD.PIXEL){const pc={};
    ACAD.pixelURL=h=>{if(pc[h])return pc[h];const p=ACAD.PIXEL[h];if(!p)return"";return pc[h]=draw(p.r,p.c)};
    ACAD.pixelImg=(h,size)=>img(ACAD.pixelURL(h),size,"pxhead")}
  /* the shield */
  const half=y=>y<=17?14:Math.max(0,14*Math.sqrt(Math.max(0,1-Math.pow((y-17)/14.2,2))));
  const inside=(x,y)=>y>=1&&y<=31&&Math.abs(x+.5-16)<=half(y);
  const hex2=(h,f)=>{const v=h.replace("#","");return"#"+[0,2,4].map(i=>Math.max(0,Math.min(255,Math.round(f>1?parseInt(v.slice(i,i+2),16)+(255-parseInt(v.slice(i,i+2),16))*(f-1):parseInt(v.slice(i,i+2),16)*f))).toString(16).padStart(2,"0")).join("")};
  const SHIELD=(()=>{const g=[];for(let y=0;y<N;y++){const r=[];for(let x=0;x<N;x++){
      if(!inside(x,y)){r.push(".");continue}
      const edge=!inside(x-1,y)||!inside(x+1,y)||!inside(x,y-1)||!inside(x,y+1);
      if(edge){r.push("o");continue}
      const nearL=!inside(x-2,y)||!inside(x,y-2),nearR=!inside(x+2,y)||!inside(x,y+2);
      const band=y>=2&&y<=6;
      r.push(band?(nearL?"B":nearR?"C":"b"):(nearL?"l":nearR?"m":"a"))}g.push(r)}return g})();
  ACAD.shield32URL=(key,col,cells)=>{
    if(ACAD.shield32URL.cache[key])return ACAD.shield32URL.cache[key];
    const g=SHIELD.map(r=>r.slice());const em=new Set();
    (cells||[]).forEach(([x,y,ch])=>{if(x>=0&&x<N&&y>=0&&y<N&&g[y][x]!=="."&&g[y][x]!=="o"){g[y][x]=ch;em.add(x+","+y)}});
    /* the emblem's own outline, inside the shield */
    const ring=[];em.forEach(k=>{const [x,y]=k.split(",").map(Number);[[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy;
      if(X>=0&&X<N&&Y>=0&&Y<N&&!em.has(X+","+Y)&&g[Y][X]!=="."&&g[Y][X]!=="o")ring.push([X,Y])})});
    ring.forEach(([x,y])=>{g[y][x]="o"});
    /* a shadow under the emblem */
    em.forEach(k=>{const [x,y]=k.split(",").map(Number);const X=x+1,Y=y+2;if(Y<N&&X<N&&!em.has(X+","+Y)&&/[alm]/.test(g[Y][X]))g[Y][X]="m"});
    const c=Object.assign({o:"#1d1b22"},col);c.l=hex2(col.a,1.18);c.m=hex2(col.a,.78);c.B=hex2(col.b,1.2);c.C=hex2(col.b,.8);
    return ACAD.shield32URL.cache[key]=draw(g.map(r=>r.join("")),c)};
  ACAD.shield32URL.cache={};
  /* the living groups' crests: their 16x16 emblem, doubled */
  if(ACAD.CREST){
    ACAD.crestURL=gid=>{const p=ACAD.CREST[gid];if(!p)return"";const cells=[];
      p.r.forEach((row,y)=>{for(let x=0;x<16;x++){const ch=row[x];if(ch==="."||ch==="o"||ch==="a"||ch==="b")continue;
        for(const [dx,dy] of [[0,0],[1,0],[0,1],[1,1]])cells.push([x*2+dx,y*2+dy,ch])}});
      return ACAD.shield32URL("crest:"+gid,p.c,cells)};
    ACAD.crestImg=(g,size)=>{const im=img(ACAD.crestURL(g),size||16,"pxhead pxcrest");return im}}
  const st=document.createElement("style");st.textContent="img.pxhead[style*='auto'],img.enc-px[style*='auto']{image-rendering:auto!important}";document.head.append(st);
})();

/* ---- v214: a house in the biography suggests that house's palettes and outfits. Pick Penguin House for your own girl
   and the Palette step offers Penguin's palettes, the Outfit step her robes, regalia, signature look and a few of her sets.
   Nothing is applied until a suggestion is tapped, and Undo brings back what was there. */
(function(){
  if(typeof RENDER!=="object"||typeof ACAD==="undefined")return;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);
  const houseNow=()=>{const k=S.bio&&S.bio.house;return k&&ACAD.HOUSES.includes(k)&&tplById(k+"robes")?k:null};
  const byLen=()=>ACAD.HOUSES.slice().sort((a,b)=>b.length-a.length);
  const isHers=(k,h)=>{const t=tplById(k);if(!t)return false;if(t._house)return t._house===h;return byLen().find(x=>k.startsWith(x))===h||(h==="crow"&&k==="crowbody")};
  const inGroup=(label,h)=>{const g=PRESET_GROUPS.start.find(x=>x.label===label);if(!g)return null;const k=g.keys.find(x=>isHers(x,h));return k?tplById(k):null};
  function h2(hk,title,note){return h("div",{class:"hs-head"},(ACAD.portraitImg&&ACAD.portraitImg(hk,48))||(ACAD.pixelImg?ACAD.pixelImg(hk,32):null),h("div",{},h("h3",{text:title}),h("p",{class:"muted small",text:note})))}
  const st=document.createElement("style");
  st.textContent=".hs-box{border:1px solid var(--rule2);border-radius:12px;padding:12px 14px;margin:0 0 16px;background:var(--panel2)}.hs-head{display:flex;gap:10px;align-items:center}.hs-head h3{margin:0;font-size:15px}.hs-head p{margin:2px 0 0}"+
    ".hs-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.hs-pal{display:flex;flex-direction:column;gap:4px;width:120px;padding:6px;border:1px solid var(--rule2);border-radius:8px;background:var(--bg);cursor:pointer;font-size:12px;text-align:left;color:inherit}"+
    ".hs-pal .strip{display:flex;height:18px;border-radius:4px;overflow:hidden}.hs-pal .strip i{flex:1}.hs-pal:hover,.hs-out:hover{border-color:var(--ink)}"+
    ".hs-out{padding:6px 10px;border:1px solid var(--rule2);border-radius:8px;background:var(--bg);cursor:pointer;font-size:13px;color:inherit;display:flex;align-items:center;gap:6px}.hs-out .strip{display:flex;width:28px;height:14px;border-radius:3px;overflow:hidden}.hs-out .strip i{flex:1}";
  document.head.append(st);
  const SL=["primary","secondary","third","accent","extra"];
  const strip=pal=>h("span",{class:"strip","aria-hidden":"true"},...SL.map(k=>{const hx=pal&&pal[k]&&nameHex(pal[k]);return h("i",{style:hx?`background:${hx}`:""})}));

  /* ---------- Palette ---------- */
  function palettes(hk){
    const out=[],seen=new Set();
    const add=(label,t)=>{if(!t||!t.pal)return;const key=SL.map(k=>t.pal[k]||"").join("|");if(seen.has(key)||!t.pal.primary)return;seen.add(key);out.push([label,t.pal])};
    add("House robes",tplById(hk+"robes"));add("Headmistress",tplById(hk+"head"));add("Boyfriend's colors",tplById(hk+"man"));
    PRESET_GROUPS.start.forEach(g=>{if(out.length>=8||!/^Academy/.test(g.label))return;const k=g.keys.find(x=>isHers(x,hk));if(k)add(g.label.replace(/^Academy /,""),tplById(k))});
    return out;
  }
  const P0=RENDER.palette;
  RENDER.palette=function(){const f=P0.apply(this,arguments);try{const hk=houseNow();if(!hk)return f;
    const box=h("div",{class:"hs-box"},h2(hk,`${HN(hk)} House palettes`,"Her biography puts her in this house. Tap one to fill your unlocked palette slots; Undo brings back yours."));
    const row=h("div",{class:"hs-row"});
    palettes(hk).forEach(([label,pal])=>row.append(h("button",{type:"button",class:"hs-pal",title:SL.map(k=>pal[k]).filter(Boolean).join(", "),onclick:()=>{
        let n=0;mut(()=>{SL.forEach(k=>{if(pal[k]&&!(typeof palLocked==="function"&&palLocked(k))){S.pal[k]=pal[k];n++}})},"housepal");toast(`${HN(hk)} House: ${label.toLowerCase()} palette applied.`)}},strip(pal),h("span",{text:label}))));
    box.append(row);f.prepend(box)}catch(e){}return f};

  /* ---------- Outfit ---------- */
  const SETS=[["Academy Signature","Signature look"],["Academy House Regalia","House regalia"],["Academy Group Colors","Group colors"],["Academy Day Off","Day off"],["Academy Date Night","Date night"],["Academy Ballgowns","Ballgown"],
    ["Academy Pajama Day","Pajamas"],["Academy Swim Team","Swim team"],["Academy Winter Break","Winter break"],["Academy Spa Day","Spa day"],["Academy Lingerie Try-On","Lingerie"]];
  function outfits(hk){
    const out=[];const add=(label,t)=>{if(t&&t.outfit&&t.outfit.items&&Object.keys(t.outfit.items).length)out.push([label,t])};
    add("House robes",tplById(hk+"robes"));SETS.forEach(([g,l])=>add(l,inGroup(g,hk)));add("Headmistress robes",tplById(hk+"head"));
    return out;
  }
  function wear(label,t,hk){
    if(typeof applyOutfitPreset!=="function")return;
    const o=t.outfit,p={id:"house:"+t.id,name:`${HN(hk)} ${label.toLowerCase()}`,items:o.items,details:o.details||{},dcol:o.dcol||{},look:o.look||"",pal:t.pal};
    mut(()=>{S.outfits.push(newOutfit(p.name));S.cur=S.outfits.length-1},"houseoutfit");
    applyOutfitPreset(p);
  }
  const O0=RENDER.outfit;
  RENDER.outfit=function(){const f=O0.apply(this,arguments);try{const hk=houseNow();if(!hk||(typeof isMale==="function"&&isMale()))return f;
    const box=h("div",{class:"hs-box"},h2(hk,`${HN(hk)} House outfits`,"Each one opens as a new outfit in your colors (empty palette slots take the house's). The outfits you have stay."));
    const row=h("div",{class:"hs-row"});
    outfits(hk).forEach(([label,t])=>row.append(h("button",{type:"button",class:"hs-out",title:t.name,onclick:()=>wear(label,t,hk)},strip(t.pal),h("span",{text:label}))));
    box.append(row);
    const tabs=f.querySelector&&f.querySelector(".wardrobe");if(tabs&&tabs.nextSibling)f.insertBefore(box,tabs);else f.prepend(box)}catch(e){}return f};
  window.HOUSE_SUGGEST={palettes,outfits};
})();

/* ---- v210: every color a starting point uses is a named color in the color pickers (tail block).
   Palettes and color fields (eyes, hair layers, nails, markings) named a color the color list did not have, so it could
   only be typed. Each one now joins the list with the swatch the studio already shows for it, so every starting point
   can be rebuilt from the pickers alone. (Character options, outfit pieces and outfit details are all in their lists
   already, and "Must include" is covered by the Setting and Emphasis pickers in Finish.) */
(function(){
  if(typeof COLORS!=="object"||typeof nameHex!=="function")return;
  const FIELDS=["eyeOne","eyeTwo","hairBase","hairUnderlayer","hairInner","hairHighlights","markingColor","nailColor","hairBlendColor","finishColor","makeupColor","mouthShapeColor","lipFinishColor"];
  const seen=new Set();let added=0;
  const take=v=>{if(typeof v!=="string")return;v=v.trim();if(!v||v[0]==="@"||v.includes("+")||seen.has(v))return;seen.add(v);
    if(COLORS[v]||COLORS[v.toLowerCase()])return;const hx=nameHex(v);if(!hx||!/^#[0-9a-f]{6}$/i.test(hx))return;
    const k=v.toLowerCase();COLORS[k]=hx;added++;
    if(typeof ALL_COLORS!=="undefined"&&!ALL_COLORS.includes(k)&&!(typeof EVERYDAY_SET!=="undefined"&&EVERYDAY_SET.has(k)))ALL_COLORS.push(k);
    if(typeof PAL_POOL!=="undefined"&&!PAL_POOL.includes(k)&&!(typeof HAIR_EYE_ONLY!=="undefined"&&HAIR_EYE_ONLY.test(k)))PAL_POOL.push(k)};
  TEMPLATES.forEach(t=>{Object.values(t.pal||{}).forEach(take);
    if(t._clone)return;   /* a house copy's own colors come from her robes, read below */
    const c=t.c||{};FIELDS.forEach(f=>take(c[f]))});
  if(typeof NEWGIRLS!=="undefined")NEWGIRLS.forEach(g=>{Object.values(g.pal).forEach(take);Object.values(g.man).forEach(take);FIELDS.forEach(f=>take(g.c[f]))});
  window.COVER210={colors:added};
})();

/* ---- v210: organization pass (tail block, after every group is built).
   Characters: "Seaside" and "Beach beauties" were two lists of the same kind of look; they are one "Beach and seaside"
     list now. The two-entry "The two extremes" joins "Stylish". The character lists run from originals to themes.
   Outfit presets: an Academy set whose outfits boil down to one or two looks no longer gets a list of its own; those
     looks are gathered, by category, under "<category>: more sets", each named after its set. */
(function(){
  const S0=PRESET_GROUPS.start,find=l=>S0.find(g=>g.label===l);
  /* ---------- characters ---------- */
  {
    const sea=find("Seaside"),beach=find("Beach beauties");
    if(sea&&beach){beach.keys.forEach(k=>{if(!sea.keys.includes(k))sea.keys.push(k)});S0.splice(S0.indexOf(beach),1)}
    if(sea)sea.label="Beach and seaside";else if(beach)beach.label="Beach and seaside";
    const two=find("The two extremes"),sty=find("Stylish");
    if(two&&sty){two.keys.forEach(k=>{if(!sty.keys.includes(k))sty.keys.push(k)});S0.splice(S0.indexOf(two),1)}
    const ORDER=["OCs","Everyday","Stylish","Beach and seaside","Fantasy","Anime favorites","Eeveelutions"];
    const chars=S0.filter(g=>!/^Academy/.test(g.label));
    const sorted=chars.slice().sort((a,b)=>(ORDER.indexOf(a.label)+1||99)-(ORDER.indexOf(b.label)+1||99));
    let i=0;S0.forEach((g,j)=>{if(!/^Academy/.test(g.label))S0[j]=sorted[i++]});
  }
  /* ---------- outfit presets ---------- */
  {
    const OG=PRESET_GROUPS.outfit||[],P=new Map((typeof OUTFIT_PRESETS!=="undefined"?OUTFIT_PRESETS:[]).map(p=>[p.id,p]));
    const CATS=["Robes and faculty","Everyday","Seasons and travel","Sports and clubs","Costumes","Fantasy and sci-fi","Moody","Sensual","Exhibition","Explicit"];
    const small=new Map();
    OG.forEach(g=>{const m=/^([^:]+): (.+?)( \(adult only\))?$/.exec(g.label);if(!m||!CATS.includes(m[1])||!g.keys.every(k=>/^acad_o_/.test(k)))return;
      if(g.keys.length>=3)return;
      let L=small.get(m[1]);if(!L)small.set(m[1],L=[]);L.push([g,m[2]])});
    small.forEach((list,cat)=>{
      if(list.length<2)return;
      const keys=[];
      list.forEach(([g,set])=>{g.keys.forEach(k=>{const p=P.get(k);if(p&&!String(p.label||"").startsWith(set+": "))p.label=set+": "+(p.label||p.name||"");keys.push(k)})});
      const adult=keys.every(k=>{const p=P.get(k);return p&&p.adultOnly});
      list.forEach(([g])=>{const i=OG.indexOf(g);if(i>=0)OG.splice(i,1)});
      /* after the category's last list */
      let at=-1;OG.forEach((g,i)=>{if(g.label.startsWith(cat+": "))at=i});
      OG.splice(at<0?OG.length:at+1,0,{label:`${cat}: more sets`+(adult?" (adult only)":""),keys});
    });
  }
  window.ORG210={characters:S0.filter(g=>!/^Academy/.test(g.label)).map(g=>g.label),outfitGroups:(PRESET_GROUPS.outfit||[]).length};
})();

/* ---- v213: the Academy girls in families. The girl chips, house profiles and every Academy list run family by
   family (mythic beasts, big cats, canines, polar, sea, birds, woodland, snakes and bugs) instead of in the order the
   houses were added. */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.HOUSES)return;
  const FAMILIES=[
    ["Mythic",["griffin","dragon","phoenix","unicorn"]],
    ["Big cats",["lioness","tiger","jaguar","cougar","cheetah","leopard","panther","lynx","caracal"]],
    ["Canines",["wolf","fox","arcticfox","coyote"]],
    ["Polar",["penguin","harpseal","orca","narwhal"]],
    ["Sea",["kraken","shark","dolphin","jellyfish","salmon"]],
    ["Birds",["raven","crow","owl","swan","crane","flamingo","peacock","lovebird","hummingbird"]],
    ["Woodland",["stag","badger","panda","raccoon","rat"]],
    ["Snakes and bugs",["serpent","scorpion","firefly","butterfly"]]];
  /* v214: the families are the Academy's groups; the labels are the group names */
  if(ACAD.GROUPS){FAMILIES.length=0;ACAD.GROUPS.forEach(g=>FAMILIES.push([g.name,g.members.slice()]))}   /* leader first */
  const ORDER=FAMILIES.flatMap(f=>f[1]).filter(h=>ACAD.HOUSES.includes(h));
  ACAD.HOUSES.filter(h=>!ORDER.includes(h)).forEach(h=>ORDER.push(h));
  const rank=new Map(ORDER.map((h,i)=>[h,i]));
  ACAD.HOUSES.sort((a,b)=>rank.get(a)-rank.get(b));   /* in place: the picker holds this array */
  ACAD.FAMILY={};ACAD.FAMILIES=FAMILIES;FAMILIES.forEach(([l,hs])=>hs.forEach(h=>{ACAD.FAMILY[h]=l}));
  /* every Academy list follows the same order (a set's own order within each girl is kept) */
  const byLen=ACAD.HOUSES.slice().sort((a,b)=>b.length-a.length);
  const houseOf=k=>{const t=tplById(k);if(!t)return null;if(t._house)return t._house;
    const tg=(t.tags||[]).find(x=>rank.has(x));const p=byLen.find(h=>k.startsWith(h));return p||tg||(ACAD.BASES&&Object.keys(ACAD.BASES).find(h=>ACAD.BASES[h]===k))||null};
  PRESET_GROUPS.start.forEach(g=>{if(!/^Academy/.test(g.label))return;
    const ks=g.keys.map((k,i)=>[k,i,rank.has(houseOf(k))?rank.get(houseOf(k)):999]);
    ks.sort((a,b)=>a[2]-b[2]||a[1]-b[1]);g.keys=ks.map(x=>x[0])});
  const st=document.createElement("style");
  st.textContent=".sp-fam{flex:none;align-self:center;display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--muted);margin:0 2px 0 10px;white-space:nowrap}.sp-fam img{image-rendering:pixelated}";
  document.head.append(st);
})();

/* ---- v210: interface pass (tail block).
   - Finish no longer repeats the top bar's New, Starting points and Save or load buttons ("This design").
   - The Scene step's character lists hold the characters themselves; "Browse…" beside each opens Starting points to pick
     any look at all (a set outfit, a scene's partner, a save) for character 1 or character 2. */
(function(){
  /* Finish: drop the duplicate buttons */
  if(typeof RENDER==="object"&&RENDER.finish){
    const fin=RENDER.finish;
    RENDER.finish=function(){const f=fin.apply(this,arguments);
      try{const head=[...f.querySelectorAll("h3,h4,.sub,.subhead")].find(x=>x.textContent.trim()==="This design");
        if(head){const nx=head.nextElementSibling;if(nx&&nx.classList.contains("btnrow"))nx.remove();head.remove()}}catch(e){}
      return f};
  }
  /* Scene: pick any starting point for character 1 or 2 */
  const dlg=document.getElementById("startsDlg");
  if(!dlg||typeof spLoad!=="function")return;
  let pick=0;
  const banner=h("p",{class:"callout sp-pickmode",role:"status",hidden:true});
  const st=document.createElement("style");
  /* while picking: no Blank row, no Parts, no "Keep my character" switch and no load/Parts footer; they belong to loading */
  st.textContent=".sp-pickmode{margin:0;font-weight:600}"+
    "#startsDlg.picking .sp-pb,#startsDlg.picking .sp-keep,#startsDlg.picking .sp-foot,#startsDlg.picking .sp-row:has(.blank){display:none}"+
    ".scwho{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px;align-items:center}"+
    /* the free-text fields in Finish grow with what is in them */
    "textarea[aria-label='Must include'],textarea[aria-label='Notes']{field-sizing:content;min-height:3.2em;max-height:16em}";
  document.head.append(st);
  {const bar=dlg.querySelector(".sp-bar");if(bar)bar.prepend(banner);else dlg.prepend(banner)}
  const stop=()=>{pick=0;banner.hidden=true;dlg.classList.remove("picking")};
  dlg.addEventListener("close",stop);
  const sp0=spLoad;
  spLoad=function(e){
    if(pick&&e&&(e.t||e.s)){const who=pick;stop();
      const sel=document.getElementById(who===1?"pairSelf":"pairPartner");
      const v=e.t?e.t.id:"save:"+e.s.id;
      if(sel){if(!sel.querySelector('option[value="'+(window.CSS&&CSS.escape?CSS.escape(v):v)+'"]')){
          let og=sel.querySelector("optgroup[data-browsed]");if(!og){og=h("optgroup",{label:"Picked from Starting points","data-browsed":"1"});sel.append(og)}
          og.append(h("option",{value:v,text:e.name||v}))}
        dlg.close();sel.value=v;sel.dispatchEvent(new Event("change"));try{noteRecent(e.key)}catch(err){}}
      return}
    return sp0.apply(this,arguments);
  };
  const browse=who=>{openStarts();pick=who;banner.hidden=false;dlg.classList.add("picking");
    banner.textContent=who===1?"Choose character 1: any look, set or save. The scene stays.":"Choose character 2: any look, set or save. Your design stays character 1."};
  [["pairSelf",1],["pairPartner",2]].forEach(([id,who])=>{const sel=document.getElementById(id);if(!sel||!sel.parentNode)return;
    const b=h("button",{type:"button",class:"btn sm",id:id+"Browse","aria-label":`Browse all starting points for character ${who}`,text:"Browse…",onclick:()=>browse(who)});
    const wrap=h("div",{class:"scwho"});sel.parentNode.insertBefore(wrap,sel);wrap.append(sel,b)});
})();

/* ---- v259: the side panel, tidied.
   - The tabs read on one line: Prompt, Layers, Checks, Scene (their full names are in the tooltip and for screen readers).
   - Under the prompt, the output settings sit together in one box: the image model and the style, which is a single choice
     of Standard, Ultra-anime or Ultra-realistic (the two Ultra boxes were already exclusive; now that reads at a glance).
   - The image model menu looks like every other menu in the studio.
   - Copy prompt and Copy Undesired Content share the row evenly. ---- */
(function(){
  if(typeof document==="undefined")return;
  const NAMES={prompt:["Prompt","Character prompt"],layers:["Layers","Character layers"],checks:["Checks","Checks"],pair:["Scene","Scene prompt"]};
  Object.entries(NAMES).forEach(([id,[short,full]])=>{const b=document.querySelector(`.tabs [data-tab="${id}"]`);if(!b)return;
    const tn=[...b.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(tn)tn.textContent=short+(b.querySelector(".badge")?" ":"");
    b.title=full;b.setAttribute("aria-label",full)});
  const mk=(t,a,...k)=>{const e=document.createElement(t);Object.entries(a||{}).forEach(([x,v])=>{if(x==="class")e.className=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else e.setAttribute(x,v)});k.forEach(c=>e.append(c));return e};
  /* each Ultra row gets a Standard choice in front, and the row reads as one control */
  function tidyUltra(row){if(!row||row.dataset.t259)return;row.dataset.t259="1";
    const std=mk("button",{type:"button",class:"u259-std",onclick:()=>{row.querySelectorAll("input[type=checkbox]").forEach(cb=>{if(cb.checked)cb.click()});sync()}},"Standard");
    row.prepend(std);const sync=()=>{std.classList.toggle("on",![...row.querySelectorAll("input")].some(cb=>cb.checked))};
    row.addEventListener("change",sync);sync();row._sync259=sync;
    /* shorter words on the buttons; the full names stay for screen readers */
    row.querySelectorAll("label.chk").forEach(l=>{const tn=[...l.childNodes].find(n=>n.nodeType===3&&n.textContent.trim());if(!tn)return;const full=tn.textContent.trim();
      tn.textContent=full==="Ultra-anime"?"Ultra anime":full==="Ultra-realistic"?"Ultra real":full;l.title=full;const cb=l.querySelector("input");if(cb)cb.setAttribute("aria-label",full)});
    const box=mk("div",{class:"u259-set"},mk("span",{class:"u259-lab"},"Style"),row);return box}
  /* Prompt tab */
  const panel=document.querySelector('.tabpanel[data-panel="prompt"]');
  if(panel){const model=panel.querySelector(".pairrow"),ultra=panel.querySelector(".ultrarow"),btns=panel.querySelector(".btnrow");
    if(model&&ultra){const set=mk("div",{class:"u259-out",role:"group","aria-label":"Output settings"});model.before(set);
      const lab=model.querySelector("label");if(lab)lab.textContent="Model";model.classList.add("u259-row");model.removeAttribute("style");set.append(model);
      const u=tidyUltra(ultra);if(u){u.classList.add("u259-row");set.append(u)}}
    if(btns)btns.classList.add("u259-copy")}
  /* Scene tab: the same style control */
  document.querySelectorAll('.tabpanel[data-panel="pair"] .ultrarow').forEach(r=>{const parent=r.parentNode,next=r.nextSibling;const u=tidyUltra(r);if(u){u.classList.add("u259-row","u259-scene");parent.insertBefore(u,next)}});
  /* the Ultra state can change elsewhere (Finish step, a loaded design): keep Standard in step */
  const syncAll=()=>document.querySelectorAll(".ultrarow").forEach(r=>r._sync259&&r._sync259());
  ["click","change","input"].forEach(ev=>document.addEventListener(ev,()=>setTimeout(syncAll,0),true));
  const chev="url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1.5l5 5 5-5' fill='none' stroke='%235B6678' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";
  const st=document.createElement("style");st.id="ui259";
  st.textContent=`
.tabs button{white-space:nowrap;min-height:0;padding:11px 4px;font-size:14px;line-height:1.2}
.u259-out{border:1px solid var(--rule);border-radius:10px;background:var(--panel2);padding:10px 12px;margin:10px 0 4px;display:grid;gap:8px}
.u259-row{display:grid;grid-template-columns:4.2em 1fr;gap:10px;align-items:center;margin:0}
.u259-row>label,.u259-lab{font-size:.84rem;font-weight:600;color:var(--muted)}
.u259-scene{margin:8px 0 2px}
.u259-out select,.pairrow select,.scgrid select{appearance:none;-webkit-appearance:none;width:100%;border:1px solid var(--rule);border-radius:8px;background:var(--panel) ${chev} no-repeat right 11px center;
  color:var(--ink);padding:7px 30px 7px 10px;font:inherit;font-size:.9rem;line-height:1.3}
.u259-out select:focus-visible,.pairrow select:focus-visible{outline:2px solid var(--focus);outline-offset:1px}
.u259-set .ultrarow{display:flex;gap:0;margin:0;border:1px solid var(--rule);border-radius:8px;overflow:hidden;flex-wrap:nowrap}
.u259-set .ultrarow>*{flex:1 1 0;min-width:0;position:relative;display:flex;align-items:center;justify-content:center;gap:0;padding:6px 4px;font-size:.84rem;background:var(--panel);
  border:0;border-right:1px solid var(--rule);color:var(--ink);cursor:pointer;text-align:center;white-space:nowrap}
.u259-set .ultrarow>*:last-child{border-right:0}
.u259-set .ultrarow label.chk input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.u259-set .ultrarow label.chk:has(input:checked),.u259-set .ultrarow .u259-std.on{background:var(--ink);color:var(--paper)}
.u259-set .ultrarow label.chk:has(input:focus-visible),.u259-set .ultrarow .u259-std:focus-visible{outline:2px solid var(--focus);outline-offset:-2px}
.u259-copy{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.u259-copy .btn{width:100%;justify-content:center;white-space:nowrap;padding-left:6px;padding-right:6px}
@media (max-width:420px){.u259-copy{grid-template-columns:1fr}}`;
  document.head.append(st);
})();

/* ---- v210: the starting-point picker opens without re-reading the whole library (tail block).
   The library cannot change while the studio is open, so its list is built once and only "My saves" is re-read each
   time the picker opens. Each entry's search text is put together the first time a search needs it (and, a little at a
   time, while the page is idle after loading), and a house copy's character fields are only looked at for it, not kept. */
(function(){
  if(typeof spCatalog!=="function"||typeof spHay!=="function")return;
  let C=null;
  const own=(e,v)=>{Object.defineProperty(e,"hay",{value:v,writable:true,configurable:true,enumerable:true});return v};
  const lazyHay=e=>Object.defineProperty(e,"hay",{configurable:true,enumerable:true,get(){return own(e,spHay(e))},set(v){own(e,v)}});
  const sigNow=()=>TEMPLATES.length+"|"+PRESET_GROUPS.start.length+"|"+PRESET_GROUPS.start.reduce((n,g)=>n+g.keys.length,0);
  function build(){
    const tById=new Map();TEMPLATES.forEach(t=>tById.set(t.id,t));
    const inGroup=new Set();PRESET_GROUPS.start.forEach(g=>g.keys.forEach(k=>inGroup.add(k)));
    const HIDE=new Set(['crowbody']);   /* v223: hidden bases (Crow's grown-up set base) are building blocks, not starting points */
    const more=TEMPLATES.filter(t=>!inGroup.has(t.id)&&!HIDE.has(t.id)&&!t.hidden).map(t=>t.id);
    const groups=PRESET_GROUPS.start.concat(more.length?[{label:"More",keys:more}]:[]).map(g=>({label:g.label,keys:g.keys.filter(k=>tById.has(k))})).filter(g=>g.keys.length);
    const list=[],seen=new Set();
    const peekC=typeof ACAD!=="undefined"&&ACAD.peekC;
    groups.forEach(g=>g.keys.forEach(k=>{if(seen.has(k))return;seen.add(k);const t=tById.get(k);
      const e={key:"t:"+k,t,name:t.name,blurb:t.blurb||"",pal:t.pal||{},group:g.label};
      Object.defineProperty(e,"c",{enumerable:true,configurable:true,get(){return(peekC?peekC(t):t.c)||{}}});
      lazyHay(e);list.push(e)}));
    return{list,groups,sig:sigNow()};
  }
  spCatalog=function(){
    if(!C||C.sig!==sigNow())C=build();
    const list=C.list.slice();
    readSaves().forEach(s=>{const st=s.state||{};const e={key:"s:"+s.id,s,name:s.name||"Untitled",blurb:"Saved "+new Date(s.ts).toLocaleDateString(),pal:st.pal||{},c:st.c||{},group:"My saves"};lazyHay(e);list.push(e)});
    const byKey={};list.forEach((e,i)=>{e.i=i;byKey[e.key]=e});
    return{list,groups:C.groups,byKey};
  };
  /* idle warm-up of the search text, a slice at a time */
  const idle=window.requestIdleCallback?f=>requestIdleCallback(f,{timeout:5000}):f=>setTimeout(()=>f({timeRemaining:()=>8}),60);
  let i=0;
  const step=dl=>{try{if(!C)C=build();const L=C.list;while(i<L.length&&dl.timeRemaining()>2){void L[i].hay;i++}if(i<L.length)idle(step)}catch(e){}};
  setTimeout(()=>idle(step),900);
})();

/* v252: the lists of sets made since the purge drop the removed ones too */
if(typeof ACAD!=="undefined"&&ACAD.purgeTidy)ACAD.purgeTidy();

/* v255: descriptions that still mentioned the nude outfits removed in v252 */
if(typeof TEMPLATES!=="undefined")TEMPLATES.forEach(t=>{if(!t||typeof t.blurb!=="string"||!/nude/i.test(t.blurb))return;
  t.blurb=t.blurb.replace(/ Off duty, or nude\./g," Off duty.").replace(/ and a nude outfit\./g,".").replace(/\s*Like every house's cheer entry, no Nude outfit\./g,"").trim()});

/* ---- v257: the rest of each boy's biography, once the groups are known: his role in his group, the other boys of his
   group, his best friend and his rivals by name (a boy's rivals are the boyfriends of his girl's rivals). Runs before the
   data file reads the people, so all of it is canon data. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function"||typeof BOYS257!=="object")return;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||(ACAD.cap?ACAD.cap(h):h);
  const low=n=>String(n||"").replace(/^The /,"the ");
  const boy=h=>{const t=tplById(h+"man");return t&&t.bio&&t.bio.fullName?t:null};
  const first=h=>{const t=boy(h);return t?t.bio.fullName.split(" ")[0]:""};
  const and=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];
  const YEAR={first:"first-year",second:"second-year",third:"third-year",fourth:"fourth-year",fifth:"fifth-year",sixth:"sixth-year"};
  const R=ACAD.RELDATA||{};
  Object.keys(BOYS257).forEach(h=>{const t=boy(h);if(!t)return;const g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h),b=t.bio;
    const y=/^(\w+) year/i.exec(b.occupation||"");const yr=y&&YEAR[y[1].toLowerCase()];
    b.house=h;if(g){b.group=g.name;const rv=(ACAD.GROUPS||[]).find(x=>x.id===g.rival);if(rv)b.rivalGroup=rv.name}
    b.groupRole=`Student. ${HN(h)}'s boyfriend, ${yr?"a "+yr:"a student"} of ${HN(h)} House${g?" and one of "+low(g.name)+"'s boys":""}.`;
    if(g){const o=g.members.filter(x=>x!==h&&boy(x)).map(x=>`${first(x)} (${HN(x)}'s)`);b.friends=o.length?`The other boys of ${low(g.name)}: ${and(o)}`:""}
    /* "Kirin's boyfriend, his sparring brother" names him */
    b.bestFriends=String(b.bestFriends||"").replace(/^(.+?)'s boyfriend/,(m,who)=>{const x=Object.keys(BOYS257).find(k=>HN(k)===who);const o=x&&boy(x);return o?`${o.bio.fullName}, ${who}'s boyfriend`:m});
    const rivals=(R.RV||[]).filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?p[1]:p[0]).filter(x=>boy(x));
    b.rivals=rivals.length?and(rivals.map(x=>`${boy(x).bio.fullName} (${HN(x)}'s boyfriend)`))+", because their girls are rivals":"";
    b.partner=`${HN(h)} (${((typeof BIOS==="object"&&BIOS[h])||{}).fullName||HN(h)})`});
})();
