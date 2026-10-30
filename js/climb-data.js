/* Everspire: Climb the Spire, data. A survivors-like in which each girl is a hero. Weapons, passives, evolutions and rules follow the genre's
   well-known structure (6 weapon slots, 6 passive slots, 8 levels, evolutions through chests); names, art and stories are Everspire's own. */
(function(){
"use strict";
if(typeof ACAD==="undefined")return;
const C=ACAD.climb=ACAD.climb||{};

/* ---------- passives: per-level stat gain, max 5 unless stated ---------- */
C.PASSIVES={
 might:{n:"Champion's Sash",ic:"🎗️",max:5,per:{might:.1},d:"+10% damage"},
 armor:{n:"Warding Cloak",ic:"🧥",max:5,per:{armor:1},d:"-1 damage taken"},
 maxhp:{n:"Heartstone",ic:"❤️",max:5,per:{maxhp:.2},d:"+20% max health"},
 recovery:{n:"Honey Tea",ic:"🍯",max:5,per:{regen:.2},d:"+0.2 health a second"},
 cooldown:{n:"Blank Folio",ic:"📖",max:5,per:{cooldown:-.08},d:"-8% cooldown"},
 area:{n:"Chandelier",ic:"🕯️",max:5,per:{area:.1},d:"+10% area"},
 speed:{n:"Courier's Bracer",ic:"📿",max:5,per:{speed:.1},d:"+10% projectile speed"},
 duration:{n:"Hourglass Locket",ic:"⌛",max:5,per:{dur:.1},d:"+10% duration"},
 amount:{n:"Mirror Charm",ic:"👥",max:2,per:{amount:1},d:"+1 projectile"},
 move:{n:"Swiftwing Ribbon",ic:"🎀",max:5,per:{move:.1},d:"+10% move speed"},
 magnet:{n:"Lodestar",ic:"🧲",max:5,per:{magnet:.25},d:"+25% pickup range"},
 luck:{n:"Clover Brooch",ic:"🍀",max:5,per:{luck:.1},d:"+10% luck"},
 growth:{n:"Scholar's Crown",ic:"👑",max:5,per:{growth:.08},d:"+8% experience"},
 greed:{n:"Gilded Mask",ic:"🎭",max:5,per:{greed:.1},d:"+10% gold"},
 curse:{n:"Starless Sigil",ic:"🌑",max:5,per:{curse:.1},d:"+10% enemy speed, health and count; more rewards"},
 revive:{n:"Phoenix Feather",ic:"🐦",max:2,per:{revive:1},d:"+1 revival"}};

/* ---------- weapons ---------- */
/* up: one string per level 2..max, "stat+n" tokens separated by space. stats: dmg amt cd area speed dur pierce iv */
const W=C.WEAPONS={};
const def=(id,o)=>{o.id=id;W[id]=o};
def("lash",{n:"Prefect's Lash",ic:"➰",c:"#e8c777",b:"whip",rar:100,d:"Cracks across her front and behind, through every enemy.",base:{dmg:10,amt:1,cd:1.35,area:1,iv:.1},
 up:["amt+1","dmg+7","area+.1","dmg+7","area+.1","dmg+8","dmg+8"],evo:["maxhp","bloodrose"]});
def("wand",{n:"Inkwell Wand",ic:"🔮",c:"#8fd0ff",b:"shot",aim:"near",rar:100,d:"Fires at the nearest enemy.",base:{dmg:10,amt:1,cd:1.2,iv:.1,pierce:1,speed:1},
 up:["amt+1","cd-.2","amt+1","dmg+10","amt+1","pierce+1","dmg+10"],evo:["cooldown","starfall"]});
def("pins",{n:"Silver Pins",ic:"📍",c:"#dfe6f0",b:"shot",aim:"face",rar:100,d:"Flies fast in the direction she is facing.",base:{dmg:6.5,amt:1,cd:1,iv:.1,pierce:1,speed:1.4},
 up:["amt+1","amt+1","dmg+5","amt+1","pierce+1","dmg+5","amt+1"],evo:["speed","thousand"]});
def("cleaver",{n:"Hall Cleaver",ic:"🔪",c:"#ffb15a",b:"axe",rar:100,d:"Thrown high; heavy damage, pierces.",base:{dmg:20,amt:1,cd:4,iv:.2,pierce:3,area:1},
 up:["amt+1","dmg+20","pierce+1","amt+1","dmg+20","pierce+2","dmg+20"],evo:["area","spiral"]});
def("crest",{n:"Returning Crest",ic:"✝️",c:"#ffe27a",b:"boomerang",rar:80,d:"Flies at the nearest enemy and comes back.",base:{dmg:5,amt:1,cd:2,iv:.1,speed:1,area:1},
 up:["amt+1","speed+.25","dmg+10","area+.1","amt+1","dmg+10","dmg+10"],evo:["luck","heaven"]});
def("grimoire",{n:"Orbiting Grimoire",ic:"📕",c:"#ff7a9a",b:"orbit",rar:80,d:"Circles her, striking all it touches.",base:{dmg:10,amt:1,cd:3,dur:3,speed:1,area:1},
 up:["amt+1","area+.25","speed+.3","dmg+10","amt+1","area+.25","dmg+10"],evo:["duration","vespers"]});
def("ember",{n:"Ember Rod",ic:"🔥",c:"#ff7a3a",b:"shot",aim:"rand",rar:80,d:"Hurls fire at a random enemy.",base:{dmg:20,amt:1,cd:3,iv:.12,pierce:1,speed:.75},
 up:["dmg+10","amt+1","dmg+20","amt+1","dmg+20","speed+.2","dmg+20"],evo:["might","hellfire"]});
def("perfume",{n:"Lavender Aura",ic:"💜",c:"#c58aff",b:"aura",rar:70,d:"Hurts everything near her.",base:{dmg:5,cd:1.3,area:1},
 up:["area+.4","dmg+3","area+.2","dmg+3","area+.2","dmg+2","area+.2"],evo:["recovery","soulbloom"]});
def("fountain",{n:"Fountain Vial",ic:"🧪",c:"#6fd8ff",b:"pool",rar:100,d:"Shatters into a pool that burns whoever stands in it.",base:{dmg:10,amt:1,cd:4.5,dur:2,area:1,iv:.3},
 up:["area+.2","amt+1","dmg+10","dur+.3","amt+1","dmg+10","dmg+10"],evo:["magnet","borra"]});
def("rune",{n:"Bouncing Rune",ic:"🔷",c:"#7ad8ff",b:"bounce",rar:80,d:"Ricochets around the screen, through everything.",base:{dmg:10,amt:1,cd:3,dur:2.25,speed:1,pierce:99},
 up:["amt+1","dmg+10","speed+.2","dur+.5","amt+1","dmg+10","dur+.5"],evo:["armor","noFuture"]});
def("storm",{n:"Stormcall Ring",ic:"⚡",c:"#fff27a",b:"strike",rar:80,d:"Calls lightning on random enemies.",base:{dmg:15,amt:2,cd:4.5,area:1,iv:.08},
 up:["amt+1","dmg+10","amt+1","dmg+10","amt+1","area+.4","dmg+10"],evo:["amount","thunderloop"]});
def("seal",{n:"Seal of the Spire",ic:"✴️",c:"#ffe7ff",b:"purge",rar:60,d:"Banishes everything in sight. Rarely.",base:{dmg:0,cd:42,area:1},
 up:["cd-3","cd-3","cd-3","cd-3","cd-3","cd-3","cd-3"],evo:["growth","starlessMoon"]});
def("dove",{n:"Dove Wing",ic:"🕊️",c:"#ffffff",b:"spray",dir:1,rar:50,d:"Fires in a turning circle, clockwise.",base:{dmg:10,amt:1,cd:1,iv:.07,pierce:2,speed:.9,area:1},
 up:["amt+1","cd-.1","dmg+5","amt+1","cd-.1","dmg+5","amt+1"],union:["raven","dawnDusk"]});
def("raven",{n:"Raven Wing",ic:"🦅",c:"#9a7aff",b:"spray",dir:-1,rar:50,d:"Fires in a turning circle, counter-clockwise.",base:{dmg:10,amt:1,cd:1,iv:.07,pierce:2,speed:.9,area:1},
 up:["amt+1","cd-.1","dmg+5","amt+1","cd-.1","dmg+5","amt+1"],union:["dove","dawnDusk"]});
def("cat",{n:"Cat Familiar",ic:"🐈",c:"#ffb0d0",b:"wander",rar:50,d:"A restless spirit that bounces about, hurting what it meets.",base:{dmg:10,amt:1,cd:5,dur:5,speed:.4,area:1},
 up:["amt+1","dur+1","speed+.2","amt+1","dur+1","speed+.2","amt+1"],evo:["greed","famished"]});
def("song",{n:"Siren's Song",ic:"🎵",c:"#8affd8",b:"column",rar:50,d:"A tall wave of sound that passes through.",base:{dmg:10,amt:1,cd:2.4,dur:.6,area:1},
 up:["area+.3","dmg+10","amt+1","area+.3","dmg+10","amt+1","dmg+10"],evo:["curse","mannajja"]});
def("pinion",{n:"Shade Feather",ic:"🖋️",c:"#a58aff",b:"trail",rar:50,d:"Leaves burning shadow behind her as she moves.",base:{dmg:10,amt:1,cd:.35,dur:1.2,area:1},
 up:["dur+.3","dmg+5","area+.2","dur+.3","dmg+5","area+.2","dmg+5"],evo:["move","valkyrie"]});
def("lancet",{n:"Orrery Hand",ic:"🕰️",c:"#9affc8",b:"freeze",rar:70,d:"Stops every enemy in sight for a moment.",base:{dmg:0,cd:8,dur:1.6,area:1},
 up:["dur+.5","cd-1","dur+.5","cd-1","dur+.5","cd-1"]});
def("laurel",{n:"Laurel Ward",ic:"🌿",c:"#9aff9a",b:"shield",rar:60,d:"A ward that turns aside harm for a while.",base:{dmg:0,cd:10,dur:3,area:1},
 up:["dur+.5","cd-1","dur+.5","cd-1","dur+.5","cd-1"]});
def("gale",{n:"Wind Scroll",ic:"🌬️",c:"#c8f2ff",b:"gale",rar:50,d:"Blades of wind; keeps stronger the longer she keeps moving.",base:{dmg:4,amt:4,cd:1.6,dur:.5,area:1.4,iv:.05},
 up:["amt+1","dmg+2","area+.15","amt+1","dmg+2","amt+1","dmg+3"]});

/* evolved weapons: no levels; they replace the base weapon when the chest opens */
const evo=(id,o)=>{o.id=id;o.evolved=true;W[id]=o};
evo("bloodrose",{n:"Bloodrose Lash",ic:"🌹",c:"#ff4a6a",b:"whip",lifesteal:1,d:"The lash drinks. Heals on every hit.",base:{dmg:55,amt:2,cd:1.2,area:1.4,iv:.1}});
evo("starfall",{n:"Starfall Wand",ic:"🌟",c:"#bfe6ff",b:"shot",aim:"near",d:"Fires almost without pause.",base:{dmg:35,amt:4,cd:.35,iv:.05,pierce:3,speed:1.3}});
evo("thousand",{n:"Thousand Pins",ic:"✨",c:"#ffffff",b:"shot",aim:"face",d:"An unbroken stream of silver.",base:{dmg:18,amt:6,cd:.35,iv:.03,pierce:4,speed:1.7}});
evo("spiral",{n:"Spiral Cleaver",ic:"🌀",c:"#ff8a3a",b:"axe",spiral:1,d:"Cleavers spin outward forever.",base:{dmg:90,amt:4,cd:2.6,iv:.12,pierce:999,area:1.6}});
evo("heaven",{n:"Crest of Heaven",ic:"☀️",c:"#fff2a0",b:"boomerang",trail:1,d:"Enormous crests that scatter light.",base:{dmg:50,amt:3,cd:1.5,iv:.1,speed:1.6,area:1.7}});
evo("vespers",{n:"Vespers Grimoire",ic:"📜",c:"#ff3a6a",b:"orbit",forever:1,d:"Five books that never leave her side.",base:{dmg:35,amt:5,cd:0,dur:999,speed:1.6,area:1.5}});
evo("hellfire",{n:"Hellfire Rod",ic:"☄️",c:"#ff4a1a",b:"shot",aim:"rand",boom:1,d:"Fireballs that burst on contact.",base:{dmg:110,amt:3,cd:2.4,iv:.12,pierce:99,speed:1.4,area:1.6}});
evo("soulbloom",{n:"Soul Bloom",ic:"🌸",c:"#e8a0ff",b:"aura",lifesteal:1,d:"A great bloom that feeds her.",base:{dmg:22,cd:.9,area:2.4}});
evo("borra",{n:"Fountain Flood",ic:"🌊",c:"#4ac8ff",b:"pool",roam:1,d:"Pools that drift and follow.",base:{dmg:35,amt:4,cd:3.5,dur:4,area:2.2,iv:.25}});
evo("noFuture",{n:"Rune of Ruin",ic:"💠",c:"#4aa8ff",b:"bounce",boom:1,d:"Every rebound is an explosion.",base:{dmg:55,amt:3,cd:2.6,dur:4,speed:1.4,pierce:999,area:1.4}});
evo("thunderloop",{n:"Thunderloop",ic:"🌩️",c:"#fff04a",b:"strike",twice:1,d:"Each bolt strikes twice.",base:{dmg:70,amt:6,cd:3,area:1.6,iv:.06}});
evo("starlessMoon",{n:"Starless Moon",ic:"🌙",c:"#e8d0ff",b:"purge",pull:1,d:"Banishes all, and the stars fall to her.",base:{dmg:0,cd:22,area:1}});
evo("famished",{n:"Famished Familiar",ic:"😼",c:"#ff6aa8",b:"wander",lifesteal:1,d:"Hungry, and fast.",base:{dmg:40,amt:3,cd:4,dur:8,speed:.9,area:1.5}});
evo("mannajja",{n:"Song of Everhythe",ic:"🎶",c:"#4affc0",b:"column",d:"The wave rolls on without end.",base:{dmg:55,amt:3,cd:1.4,dur:1,area:2.3}});
evo("valkyrie",{n:"Valkyrie's Gale",ic:"🦋",c:"#c8a8ff",b:"trail",bolt:1,d:"Her shadow strikes where she halts.",base:{dmg:40,amt:2,cd:.25,dur:2,area:1.8}});
evo("dawnDusk",{n:"Dawn and Dusk",ic:"☯️",c:"#ffd8ff",b:"spray",dir:1,both:1,d:"Both wings, one endless turning.",base:{dmg:30,amt:3,cd:.45,iv:.05,pierce:4,speed:1.3,area:1.3}});

C.evolutionOf=(w,passives)=>{const o=W[w];if(!o||!o.evo)return null;return passives[o.evo[0]]?o.evo[1]:null};
C.maxLv=id=>(W[id].up?W[id].up.length:0)+1;

/* ---------- the tower: one floor per group, in climbing order ---------- */
C.FLOORS=[
 {g:"legends",n:"The Champions' Gate",tint:["#2a2438","#1b1628"],acc:"#ffd24a",en:["bat","blob","wisp"]},
 {g:"pride",n:"The Pride Lawns",tint:["#33291a","#241c10"],acc:"#ffb04a",en:["blob","thorn","bat"]},
 {g:"pack",n:"The Frost Trail",tint:["#1c2a34","#111b24"],acc:"#9ad8ff",en:["thorn","wisp","blob"]},
 {g:"grove",n:"The Old Grove",tint:["#1c3022","#10201a"],acc:"#7ae89a",en:["thorn","shade","blob"]},
 {g:"frost",n:"The Glacier Hall",tint:["#1a2c3c","#0f1c2c"],acc:"#8ae8ff",en:["wisp","shade","thorn"]},
 {g:"deep",n:"The Drowned Stair",tint:["#10243c","#08162a"],acc:"#4ac8ff",en:["blob","wisp","shade"]},
 {g:"plumes",n:"The Plume Terraces",tint:["#3a1f3a","#26102c"],acc:"#ff8ad8",en:["bat","wisp","shade"]},
 {g:"talons",n:"The Rookery",tint:["#222030","#12101e"],acc:"#a58aff",en:["bat","shade","thorn"]},
 {g:"coil",n:"The Coil Cellars",tint:["#1c3020","#0c1e12"],acc:"#9aff6a",en:["thorn","blob","shade"]},
 {g:"hive",n:"The Hive Galleries",tint:["#3a2c10","#261c08"],acc:"#ffd24a",en:["bat","thorn","gear"]},
 {g:"clockwork",n:"The Orrery Vault",tint:["#2a2a22","#181810"],acc:"#e8c777",en:["gear","wisp","thorn"]},
 {g:"vigil",n:"The Dark Hours",tint:["#14102c","#0a0818"],acc:"#8a7aff",en:["shade","wisp","bat"]},
 {g:"synth",n:"The Lattice",tint:["#102c34","#08181e"],acc:"#4affd8",en:["gear","wisp","shade"]},
 {g:"void",n:"The Starless Spire",tint:["#1a0c2c","#08040e"],acc:"#e86bd8",en:["shade","wisp","gear"]}];

/* ---------- heroes: a kit for every girl, from her House and her best aptitudes ---------- */
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return (h>>>0)/4294967296};
const WPOOL={grace:["song","dove","raven","gale","lash"],wit:["wand","rune","lancet","grimoire","crest"],heart:["perfume","fountain","laurel","cat","wand"],
 vigor:["cleaver","lash","pins","ember","grimoire"],craft:["pins","crest","cleaver","rune","fountain"],nerve:["seal","storm","pinion","ember","cat"]};
/* a few hand picks that read right at a glance; everyone else is chosen by aptitude and her own hash */
const PICK={kitsune:"wand",lioness:"lash",wolf:"pins",griffin:"crest",dragon:"ember",phoenix:"ember",kraken:"fountain",siren:"song",sphinx:"wand",crow:"pins",raven:"raven",peacock:"dove",swan:"dove",owl:"wand",bee:"pins",tiger:"cleaver",serpent:"pinion",cobra:"pinion",orca:"song",stag:"crest",panda:"perfume",fox:"pins",arcticfox:"pins",jaguar:"lash",hummingbird:"gale",unicorn:"laurel",sovereign:"seal",valkyrie:"cleaver",horizon:"lancet",eclipse:"seal",umbra:"pinion",regent:"lancet",augur:"lancet",nightmare:"cat",reverie:"laurel",android:"storm"};
const TRAITS=[
 {k:"might",d:"+10% damage every 10 levels",f:L=>({might:.1*Math.floor(L/10)})},
 {k:"growth",d:"+10% experience every 5 levels, up to +30%",f:L=>({growth:.1*Math.min(3,Math.floor(L/5))})},
 {k:"cooldown",d:"-5% cooldown every 10 levels, up to -15%",f:L=>({cooldown:-.05*Math.min(3,Math.floor(L/10))})},
 {k:"speed",d:"+10% projectile speed every 5 levels, up to +40%",f:L=>({speed:.1*Math.min(4,Math.floor(L/5))})},
 {k:"area",d:"+8% area every 8 levels",f:L=>({area:.08*Math.floor(L/8)})},
 {k:"regen",d:"+0.1 health a second every 8 levels",f:L=>({regen:.1*Math.floor(L/8)})},
 {k:"armor",d:"+1 armor at levels 8, 16 and 24",f:L=>({armor:Math.min(3,Math.floor(L/8))})},
 {k:"luck",d:"+10% luck every 6 levels",f:L=>({luck:.1*Math.floor(L/6)})},
 {k:"move",d:"+5% move speed every 4 levels",f:L=>({move:.05*Math.floor(L/4)})},
 {k:"greed",d:"+15% gold every 5 levels",f:L=>({greed:.15*Math.floor(L/5)})},
 {k:"amount",d:"+1 projectile at level 12",f:L=>({amount:L>=12?1:0})},
 {k:"magnet",d:"+25% pickup range every 5 levels",f:L=>({magnet:.25*Math.floor(L/5)})}];
const TRAIT_BY={grace:["move","speed","magnet"],wit:["cooldown","growth","luck"],heart:["regen","armor","greed"],vigor:["might","armor","regen"],craft:["amount","area","might"],nerve:["luck","speed","cooldown"]};
const kits={};
C.heroKit=h=>{if(kits[h])return kits[h];
  const apt=(ACAD.game&&ACAD.game.aptitude)?ACAD.game.aptitude(h):{grace:1,wit:1,heart:1,vigor:1,craft:1,nerve:1};
  const ord=Object.keys(apt).sort((a,b)=>apt[b]-apt[a]),top=ord[0],sec=ord[1],r=hash(h+"|w"),r2=hash(h+"|t");
  const pool=WPOOL[top],start=PICK[h]&&W[PICK[h]]?PICK[h]:pool[Math.floor(r*pool.length)];
  const tk=TRAIT_BY[sec][Math.floor(r2*3)],trait=TRAITS.find(t=>t.k===tk)||TRAITS[0];
  const rar=(ACAD.head&&ACAD.head.rarityOf)?ACAD.head.rarityOf(h):1;
  return kits[h]={h,start,trait,top,sec,rar,hp:100+10*rar+Math.round((apt.heart-1)*40),move:1+(apt.grace-1)*.25,might:1+(apt.vigor-1)*.2+rar*.02,armor:0}};

/* ---------- enemy kinds: hp, speed, touch damage, xp, size, drawn by climb-engine ---------- */
C.ENEMY={
 bat:{hp:5,sp:78,dmg:5,xp:1,r:11,fly:1},blob:{hp:14,sp:46,dmg:6,xp:1,r:14},wisp:{hp:10,sp:62,dmg:6,xp:2,r:12,fly:1},
 shade:{hp:26,sp:54,dmg:8,xp:3,r:15},thorn:{hp:38,sp:38,dmg:9,xp:3,r:16},gear:{hp:90,sp:30,dmg:14,xp:8,r:22}};

/* ---------- the permanent powers bought between runs, rank 1-5 ---------- */
C.UPGRADES=[
 {k:"might",n:"Fortitude",ic:"💪",st:{might:.05},base:150},{k:"armor",n:"Bulwark",ic:"🛡️",st:{armor:1},base:400,max:3},
 {k:"maxhp",n:"Vitality",ic:"💗",st:{maxhp:.1},base:150},{k:"recovery",n:"Mending",ic:"🌱",st:{regen:.1},base:200},
 {k:"cooldown",n:"Tempo",ic:"⏱️",st:{cooldown:-.025},base:300},{k:"area",n:"Reach",ic:"📐",st:{area:.05},base:200},
 {k:"speed",n:"Flight",ic:"🏹",st:{speed:.1},base:200},{k:"dur",n:"Lasting",ic:"🕰️",st:{dur:.15},base:200},
 {k:"amount",n:"Echo",ic:"🔁",st:{amount:1},base:1500,max:1},{k:"move",n:"Stride",ic:"👟",st:{move:.05},base:200},
 {k:"magnet",n:"Pull",ic:"🧲",st:{magnet:.25},base:200},{k:"luck",n:"Fortune",ic:"🍀",st:{luck:.1},base:300},
 {k:"growth",n:"Study",ic:"🎓",st:{growth:.03},base:300},{k:"greed",n:"Thrift",ic:"💰",st:{greed:.1},base:200},
 {k:"curse",n:"Dare",ic:"🌑",st:{curse:.1},base:1000},{k:"revive",n:"Second Wind",ic:"🪶",st:{revive:1},base:1500,max:1},
 {k:"reroll",n:"Reroll",ic:"🎲",st:{reroll:1},base:500,max:4},{k:"skip",n:"Skip",ic:"⏭️",st:{skip:1},base:500,max:4},{k:"banish",n:"Banish",ic:"🚫",st:{banish:1},base:500,max:4}];
C.upCost=(u,rank)=>Math.round(u.base*(1+rank*.9));
C.hash=hash;
})();
