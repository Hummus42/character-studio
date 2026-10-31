/* Everspire: Climb the Spire, the girls' presets. Every girl has her own signature weapon (a base behaviour with a twist), her own heirloom item,
   her own active ability, and her own awakened weapon. One line each: id | weapon.twist | weapon name | icon | heirloom | stats | ability | ability name.
   Stats: M damage, A area, C cooldown, S projectile speed, D duration, V move, G pickup range, L luck, X experience, $ gold, R regen, H health, W armor. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb)return;
const C=ACAD.climb;
C.TWISTS={bn:["Burn","sets enemies alight"],sl:["Chill","slows what it hits"],ch:["Arc","jumps to a nearby enemy"],lc:["Leech","heals her now and then"],cr:["Keen","often strikes twice as hard"],sp:["Shatter","kills throw off shards"],
 ex:["Burst","kills explode"],pu:["Draw","drags enemies toward her"],mk:["Mark","marked enemies take more damage from everything"],ps:["Venom","poison that stacks"],fr:["Frost","may freeze for a moment"],gd:["Gilt","kills drop coins"]};
C.ABILITIES={nova:{d:"A ring of force hits everything near her.",cd:22},dash:{d:"A swift dash that cuts through enemies and leaves her unhurt.",cd:16},heal:{d:"Restores a third of her health.",cd:34},
 freeze:{d:"Stops every enemy in sight for a moment.",cd:30},summon:{d:"Spirits fly out and hunt the enemies.",cd:24},dome:{d:"A ward that makes her untouchable and throws enemies back.",cd:32},
 gravity:{d:"Drags every enemy close and crushes them.",cd:26},blink:{d:"Blinks forward and bursts at both ends.",cd:18},storm:{d:"Ten bolts of lightning in a few heartbeats.",cd:30},
 meteor:{d:"Meteors rain on the enemies.",cd:34},volley:{d:"Two dozen shots in every direction.",cd:20},haste:{d:"Moves and fights much faster for six seconds.",cd:30}};
const T=`
griffin|crest.cr|Gryphon's Talon|🦅|Crown of Feathers|MC|dash|Stoop of the Gryphon
dragon|ember.ex|Wyrmfire Rod|🐉|Scale Mantle|WH|meteor|Dragonfall
phoenix|ember.bn|Ashen Plume|🔥|Rebirth Ember|RH|heal|Cinder Rebirth
unicorn|wand.ch|Horn of Dawn|🦄|Pearl Mane|RX|nova|Dawn Nova
kitsune|wand.mk|Foxfire Lantern|🦊|Nine-Tail Charm|LV|blink|Trickster's Step
pegasus|gale.sl|Skyward Pinions|🐴|Cloud-Steed Bridle|VS|dash|Skybound Charge
kirin|storm.ch|Kirin's Thunderhoof|⚡|Auspicious Scroll|LX|dome|Guardian's Calm
sphinx|wand.cr|Riddle Bolt|🗿|Tablet of Riddles|XC|freeze|Answer in Stillness
siren|song.sl|Tidecalling Song|🧜|Pearl Shell|GL|gravity|Undertow
manticore|cleaver.ps|Stinger Cleaver|🦂|Lion's Pride Ring|MW|volley|Quill Storm
lioness|lash.lc|Hunter's Lash|🦁|Pride Mane|HR|haste|Hunting Roar
tiger|cleaver.cr|Stripe Cleaver|🐯|Ember Stripes|MA|dash|Pounce
jaguar|pins.ps|Rosette Pins|🐆|Jungle Jade|LC|blink|Ambush
cougar|lash.pu|Mountain Whip|⛰️|Highland Cloak|WH|dome|Ridge Guard
cheetah|pins.sl|Sprint Needles|💨|Swift Collar|VC|haste|Hundred-Yard Dash
leopard|pins.cr|Shadow Rosette|🌑|Night Spots|LM|blink|Branch Leap
panther|gale.mk|Midnight Claws|🖤|Velvet Dark|MW|dash|Shadow Rush
lynx|wand.cr|Tufted Arrow|🏹|Tuft Charm|SL|volley|Lynx Eye
caracal|pins.ex|Sprung Dart|🎯|Ear Tassel|VA|dash|Spring Leap
serval|pins.ch|Savannah Darts|🌾|Tall Grass Band|SC|nova|Leap Burst
wolf|pins.lc|Fang Pins|🐺|Alpha Collar|MR|summon|Pack Call
fox|wand.gd|Cunning Fire|🍂|Red Brush|$L|blink|Slip Away
arcticfox|wand.fr|Snowdrift Wand|❄️|White Pelt|CW|freeze|Whiteout
coyote|ember.sp|Yip Fire|🌵|Desert Trickery|LX|summon|Dusk Chorus
hyena|cleaver.ps|Laughing Cleaver|😈|Bone Crown|MH|haste|Cackle Frenzy
jackal|pins.mk|Anubis Needles|🏺|Golden Collar|XM|gravity|Tomb Draw
husky|lash.sl|Sled Lash|🛷|Frost Harness|HV|haste|Sled Sprint
dingo|gale.ps|Outback Gale|🌅|Red Dust Charm|VG|volley|Wild Run
fennec|pins.cr|Big-Ear Pins|🏜️|Sand Veil|LC|blink|Dune Dart
shiba|wand.gd|Lucky Coin Wand|🧧|Fortune Charm|$L|nova|Treat Burst
orca|song.pu|Black-and-White Wave|🐋|Pod Whistle|MR|gravity|Breach
penguin|gale.sl|Slide Gale|🐧|Waddle Vest|VH|dash|Belly Slide
harpseal|song.lc|Pup's Lullaby|🐚|Silver Coat|RH|heal|Pup Chorus
narwhal|pins.cr|Tusk Lance|🔱|Spiral Tusk|MS|dash|Ice Lance Charge
polarbear|lash.pu|Glacier Paw|🐻|Thick Fur|WH|dome|Hibernate Shell
otter|fountain.gd|River Juggle|💦|Pocket Stone|$G|summon|Raft of Friends
reindeer|crest.sl|Antler Sleigh Bells|🔔|Aurora Bells|VL|volley|Sleigh Rush
beluga|song.sl|Melon Chime|🐳|Smile Pearl|XR|freeze|Hush of the Deep Ice
ermine|pins.cr|Winter Ermine Pins|🤍|Royal Mantle|LM|blink|Snow Vanish
puffin|dove.lc|Puffin Dive|🐦|Beak Bundle|GX|dash|Cliff Dive
kraken|fountain.pu|Tentacle Surge|🦑|Abyss Eye|MA|gravity|Maelstrom
shark|cleaver.lc|Razor Fin|🦈|Tooth Necklace|MH|dash|Feeding Frenzy
dolphin|wand.ch|Echo Clicks|🐬|Sonar Bell|SC|nova|Sonic Leap
jellyfish|storm.ps|Venom Veil|🎐|Glow Bell|WR|dome|Drift Shield
salmon|pins.sl|Upstream Spears|🍣|Spawn Charm|VH|dash|Leap the Falls
seahorse|fountain.sl|Bubble Charm|💧|Curl Tail Pin|DR|heal|Soothing Eddy
manta|gale.pu|Glide Gale|🌊|Wing Cape|VA|volley|Ray Barrage
koi|fountain.gd|Lucky Koi Pool|🎏|Gold Scale|$X|summon|Koi Procession
eel|storm.ch|Live Wire|🔌|Slip Coil|CS|blink|Shock Slip
angelfish|dove.sl|Veil Fin|🐠|Halo Scale|AV|haste|Graceful Glide
raven|raven.mk|Omen Feather|🌘|Dark Quill|XL|freeze|Hush of Wings
crow|pins.gd|Trinket Throw|💎|Shiny Hoard|$M|summon|Murder Call
owl|wand.cr|Wisdom Eyes|🦉|Night Reader|XC|freeze|Silent Hour
eagle|crest.cr|Aerie Spear|🏔️|Sky Sovereign Band|MS|dash|Stoop
falcon|pins.cr|Peregrine Needles|🔺|Wind Brace|LC|dash|Peregrine Dive
hawk|pins.ch|Hawk-Eye Arrows|👁️|Sharp Sight|SL|volley|Talon Volley
vulture|perfume.ps|Carrion Wind|🦴|Patient Wings|HW|nova|Circle Overhead
osprey|fountain.cr|Plunge Strike|🎣|Fisher's Catch|$G|dash|Plunge
magpie|pins.gd|Collector's Needles|🧵|Stolen Brooch|$L|summon|Borrowed Friends
snowyowl|wand.fr|Whiteout Hoot|☃️|Snowfall Feather|CL|freeze|Blizzard Hush
peacock|dove.cr|Eye Fan|🦚|Jeweled Train|AX|nova|Full Display
swan|dove.lc|Lakeside Grace|🦢|Silent Lake|RH|dome|White Wings
flamingo|dove.bn|Rosy Flare|🦩|One-Leg Stance|RV|haste|Perfect Balance
crane|song.cr|Origami Crane|🎎|Thousand Folds|LX|heal|Paper Wish
lovebird|dove.ch|Twin Heart Notes|💕|Paired Rings|MR|summon|Duet
hummingbird|gale.cr|Needle Hover|🌺|Nectar Vial|VC|blink|Hover Zip
macaw|dove.ps|Rainbow Squawk|🌈|Painted Plume|M$|volley|Feather Salvo
cockatoo|gale.mk|Crest Raise|🎉|Pink Crest|XA|nova|Screech
birdofparadise|dove.sp|Dance Ribbons|💃|Display Plumage|AX|haste|Courtship Dance
kingfisher|fountain.cr|Dive Splash|🔹|Blue Bolt|CS|dash|Kingfisher Dive
stag|crest.pu|Antler Crown Gale|🦌|Moss Crown|HA|dome|Forest Guardian
badger|cleaver.lc|Burrow Cleaver|🦡|Stripe Mask|WM|dome|Sett Shield
panda|perfume.sl|Bamboo Aura|🎋|Bamboo Rations|RH|heal|Snack Break
raccoon|pins.gd|Midnight Raid|🗑️|Bandit Mask|$G|summon|Raiding Party
rat|pins.ps|Alley Daggers|🧀|Cheese Charm|LM|blink|Gutter Dash
rabbit|wand.sp|Lucky Foot Hop|🐰|Rabbit's Foot|LV|blink|Burrow Hop
squirrel|pins.gd|Acorn Barrage|🌰|Hidden Cache|$X|volley|Nut Barrage
hedgehog|grimoire.pu|Spine Orbit|🦔|Prickle Armor|WH|dome|Roll Up
redpanda|fountain.bn|Ember Tail Splash|🍁|Fire Fox Fur|RV|haste|Treetop Dash
koala|perfume.sl|Eucalyptus Haze|🍃|Sleepy Branch|RW|dome|Drowsy Cuddle
serpent|pinion.ps|Venom Trail|🐍|Shed Skin|MC|dash|Serpent Strike
cobra|pins.ps|Spitting Hood|☠️|Hooded Gaze|MA|freeze|Mesmerize
viper|pins.cr|Pit Viper Pins|🗡️|Pit Sense|LC|dash|Viper Lunge
chameleon|wand.mk|Chromatic Tongue|🎨|Camouflage Cloak|LS|blink|Blend In
gecko|pins.sl|Sticky Step|🦎|Clinging Foot|VG|blink|Wall Run
crocodile|cleaver.lc|Death Roll|🐊|Armored Hide|WM|dash|Death Roll
iguana|ember.bn|Sunbaker's Fire|🌋|Basking Stone|RM|heal|Bask
axolotl|fountain.lc|Regrowth Pool|💖|Gill Frills|RH|heal|Regenerate
frog|fountain.sl|Leap Pond|🐸|Lily Pad|VL|nova|Croak
turtle|grimoire.pu|Shell Orbit|🐢|Ancient Shell|WH|dome|Withdraw
bee|pins.ps|Stinger Pins|🐝|Honey Comb|RM|summon|Swarm Call
scorpion|cleaver.ps|Tail Cleaver|🧿|Venom Gland|MA|dash|Tail Strike
mantis|lash.cr|Prayer Scythe|🙏|Folded Arms|MC|dash|Ambush Strike
spider|pins.sl|Silk Spinner|🕷️|Web Anchor|CW|gravity|Web Trap
firefly|perfume.bn|Lantern Swarm|💡|Glow Jar|XR|summon|Light the Way
butterfly|gale.sl|Scale Dust|🏵️|Wing Dust|AV|nova|Metamorphosis
ladybug|pins.lc|Spotted Luck|🐞|Lucky Spots|LH|dome|Shell Pop
moth|perfume.mk|Moonlit Powder|🌕|Lantern Pull|GX|gravity|Lamp Lure
dragonfly|gale.cr|Four-Wing Flicker|💫|Pond Shimmer|VC|haste|Hover Dash
beetle|cleaver.pu|Horn Ram|🐛|Iridescent Shell|WM|dash|Beetle Charge
sovereign|storm.ch|Sovereign Edict|🏛️|Imperial Circuit|MX|nova|Decree
valkyrie|cleaver.cr|Valkyrie Lance|⚔️|Winged Helm|MS|dash|Ride of the Valkyrie
android|pins.ch|Servo Darts|🤖|Core Chip|CM|haste|Overclock
automaton|grimoire.pu|Clockwork Orbs|⚙️|Brass Heart|WH|dome|Fail-Safe
golem|cleaver.pu|Stone Fist|🧱|Rune Core|WH|dome|Stoneskin
hologram|wand.mk|Phantom Beam|🔆|Flicker Mantle|LC|blink|Flicker
cipher|rune.mk|Encrypted Rune|🔐|Key Fragment|XL|freeze|Lock Down
archive|grimoire.mk|Indexed Pages|🗄️|Memory Core|XM|volley|Recall
medic|perfume.lc|Mender's Mist|🩺|Vital Kit|RH|heal|Triage
companion|wand.lc|Friendly Spark|🤝|Heart Locket|RL|summon|Best Friend
seraph|crest.bn|Halo Disc|😇|Six Wings|MH|nova|Holy Burst
nereid|fountain.sl|Sea-Glass Pool|🧊|Tide Charm|VD|gravity|Riptide
vector|pins.sp|Vector Lines|➡️|Trajectory Chip|SC|dash|Straight Line
voyager|wand.pu|Deep-Space Probe|🛰️|Golden Record|GX|blink|Slingshot
glitch|storm.sp|Corrupted Packet|📟|Bad Sector|LM|blink|Rewind
muse|song.cr|Inspired Verse|🎼|Blank Canvas|XL|haste|Creative Surge
lullaby|song.sl|Sleep Code|🛌|Soft Hum|RH|freeze|Sleep Mode
bloom|perfume.sp|Seed Burst|🌼|Greenhouse Core|RX|heal|Bloom
titan|cleaver.ex|Titan Maul|🔨|Colossus Plate|MW|nova|Quake
prototype|gale.ch|Experimental Rig|🧰|Beta Chip|$L|volley|Test Fire
horizon|rune.pu|Horizon Line|🌅|Event Ring|CG|gravity|Event Horizon
eclipse|storm.fr|Corona Flare|🌒|Umbral Crown|MA|freeze|Totality
umbra|pinion.mk|Shadow Veil|🌫️|Dark Veil|LW|dome|Cloak of Night
penumbra|pinion.sl|Half-Shadow Edge|🌓|Twilight Hem|VC|blink|Edge Step
oblivion|rune.ex|Erasing Ink|🕳️|Forgotten Name|ML|nova|Unmaking
hush|gale.fr|Silent Gale|🤫|Muffled Bell|CR|freeze|Perfect Silence
aurora|storm.ch|Dawn Curtain|🌌|Polar Light|XL|nova|Curtain Call
comet|pins.ex|Tail Fire|🌠|Ice Core|SV|dash|Streak
nova|ember.ex|Stellar Burst|💥|Supernova Seed|MA|nova|Going Nova
entropy|rune.ps|Decay Orbit|⏳|Heat Death|CM|gravity|Unravel
pulsar|storm.cr|Beacon Pulse|📡|Spin Core|CS|nova|Pulse
cradle|perfume.lc|Lullaby Void|🍼|Cradle Star|RH|heal|Rock Gently
quasar|storm.bn|Blazing Jet|🔭|Bright Heart|MD|volley|Radiant Jet
singularity|rune.pu|Pinpoint Collapse|⚫|Dense Core|GX|gravity|Collapse
rapture|song.mk|Ecstatic Hymn|🎇|Veil of Joy|XL|haste|Ecstasy
maw|cleaver.lc|Hungry Dark|🌑|Gaping Hunger|MH|gravity|Devour
stardust|gale.gd|Glitter Trail|⭐|Dust Pouch|$M|volley|Sprinkle
wraith|pinion.ps|Haunting Wail|👻|Spectral Chain|LW|blink|Phase
nebula|fountain.sp|Cloud Nursery|☁️|Birth Cloud|XA|summon|Seed the Stars
hollow|pinion.mk|Echo Chamber|⭕|Empty Locket|HW|dome|Hollow Hush
regent|crest.ch|Regent's Cogwheel|🏰|Gilded Gear|MC|nova|Royal Order
chronicle|grimoire.mk|Living Pages|📚|Ink Well|XL|volley|Footnote Barrage
pendulum|lash.pu|Swinging Weight|⏲️|Brass Bob|MS|gravity|Swing
mainspring|crest.sp|Wound Coil|🔩|Tension Spring|CV|dash|Release
gearwright|cleaver.ex|Wrench Toss|🔧|Toolbelt|MA|summon|Assembly Line
sundial|pinion.sl|Shadow Hand|🌞|Noon Mark|DV|freeze|Noon, Standing Still
hourglass|fountain.sl|Sand Pour|🕐|Fine Sand|DC|freeze|Last Grain
metronome|pins.cr|Tempo Ticks|🎚️|Steady Beat|CS|haste|Allegro
almanac|wand.mk|Forecast Bolt|📅|Weather Notes|LX|storm|Predicted Storm
tourbillon|pinion.ch|Whirling Escapement|🌪️|Gravity Cage|CM|blink|Escapement
augur|wand.mk|Omen Spark|🥠|Entrails Glass|LX|freeze|Foretell
nightmare|cat.sl|Night Terror|😱|Dream Eater|MR|gravity|Terror
reverie|song.lc|Daydream Haze|💭|Wistful Thread|XR|heal|Sweet Dream
insomnia|gale.ch|Sleepless Gale|☕|Third Coffee|CV|haste|Wide Awake
seance|grimoire.pu|Table-Turn Pages|🧙|Ouija Planchette|GL|summon|Call the Dead
vesper|perfume.sl|Evening Bell|⛪|Compline Candle|RD|dome|Evensong
lantern|grimoire.bn|Lantern Orbit|🏮|Guiding Wick|XM|summon|Light the Path
grimoire|grimoire.sp|Self-Writing Tome|📘|Margin Notes|MX|volley|Spell Cascade
lethe|fountain.sl|River of Forgetting|🥀|Poppy Crown|CL|freeze|Forgetting
portent|storm.mk|Sign of Doom|⚠️|Black Mirror|LW|storm|Doom Rain`;
C.KITX={};
T.trim().split("\n").forEach(l=>{const p=l.split("|");if(p.length<8)return;const [b,tw]=p[1].split(".");C.KITX[p[0]]={base:b,tw,wn:p[2],wi:p[3],hn:p[4],st:p[5].split(""),ab:p[6],an:p[7]}});
})();
