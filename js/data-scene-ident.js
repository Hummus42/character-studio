/* v271: scene details for the girls the archived scenes had never met (the Legends, the newer Houses, the Synth, Void,
   Clockwork and Vigil girls). The general scenes write a girl's own room, bathroom, outdoor spot, title, what she calls
   herself, pet name and accent light into the text ({@room}, {@out}, {@role} ...). The first 56 girls have them from the
   archive; these fill the rest as SISLORE entries, built from her biography, her House room and her robes look:
   - role:   what she calls herself, from her place in her group (hand-written below)
   - out:    her outdoor spot, from her favorite place (rewritten below where that is not a place)
   - acc:    her accent light, from her favorite color
   - room / roomL / roomF, and g.* (her look and figure for the photoreal sets), from her House room and robes.
   Runs after part-13.js (identOf reads SISLORE lazily) and never replaces an entry that is already there. */
(function(){
"use strict";
if(typeof SISLORE!=="object"||!SISLORE||typeof ACAD==="undefined")return;
const ROLE={kitsune:"the trickster",pegasus:"the high flyer",kirin:"the shield",sphinx:"the riddler",siren:"the songbird",manticore:"the brawler",
 jaguar:"the right hand",cougar:"the challenger",cheetah:"the scout",caracal:"the wildcard",serval:"the high jumper",arcticfox:"the prankster",
 hyena:"the troublemaker",jackal:"the guardian",husky:"the runner",dingo:"the wild one",fennec:"the DJ",shiba:"the sunshine girl",orca:"the matriarch",
 harpseal:"the snuggler",narwhal:"the dreamer",polarbear:"the big hug",otter:"the splash queen",reindeer:"the guide",beluga:"the chatterbox",ermine:"the princess",
 puffin:"the class clown",seahorse:"the romantic",manta:"the glider",koi:"the lucky charm",eel:"the live wire",angelfish:"the dancer",eagle:"the champion",
 falcon:"the striker",hawk:"the hunter",vulture:"the patient one",osprey:"the lifeguard",magpie:"the magician",snowyowl:"the watcher",macaw:"the voice",
 cockatoo:"the diva",birdofparadise:"the showstopper",kingfisher:"the diver",rabbit:"the bunny",squirrel:"the scamp",hedgehog:"the prickly one",redpanda:"the tea girl",
 koala:"the sleepyhead",cobra:"the snake charmer",viper:"the fang",chameleon:"the mask",gecko:"the climber",crocodile:"the jaws",iguana:"the sunbather",
 axolotl:"the smile",frog:"the singer",turtle:"the sage",bee:"the queen bee",mantis:"the blade",spider:"the widow",ladybug:"the lucky one",moth:"the dreamer",
 dragonfly:"the racer",beetle:"the tinkerer",sovereign:"the sovereign",valkyrie:"the shieldmaiden",android:"the helping hand",automaton:"the clockwork doll",
 golem:"the rock",hologram:"the spotlight",cipher:"the ghost",archive:"the keeper of records",medic:"the healer",companion:"the lapcat",seraph:"the halo",
 nereid:"the tide",vector:"the speedster",voyager:"the navigator",glitch:"the bug",muse:"the muse",lullaby:"the lullaby",bloom:"the gardener",titan:"the wall",
 prototype:"the blank slate",horizon:"the leader",eclipse:"the blade",umbra:"the shade",penumbra:"the bookworm",oblivion:"the fading one",hush:"the quiet one",
 aurora:"the lantern",comet:"the streak",nova:"the spark",entropy:"the chaos",pulsar:"the beat",cradle:"the cradle",quasar:"the star",singularity:"the pull",
 rapture:"the temptress",maw:"the deep",stardust:"the sparkle",wraith:"the haunting",nebula:"the dreamer",hollow:"the blank slate"};
/* favorite places that are not outdoor spots, or not places at all */
const OUT={pegasus:"the aerial rig above the Academy courtyard",manticore:"the Academy courtyard at dusk",harpseal:"a frozen bay glittering under a pale sun",
 polarbear:"a snowy cabin porch at dawn",otter:"a sunny kelp-forest cove",ermine:"a snowy palace garden at dusk",magpie:"the student theater steps at night",
 cockatoo:"a lantern-lit dance floor under the stars",birdofparadise:"an open-air stage under a single spotlight",kingfisher:"the ten-meter diving platform at the Academy pool",
 redpanda:"a tea garden in the rain",koala:"a hammock strung between eucalyptus trees",chameleon:"a rooftop at golden hour",axolotl:"the aquarium lab garden at night",
 frog:"an open-air stage by the lily pond",beetle:"the workshop yard at dusk",android:"the Gallery garden at dawn",glitch:"a neon-lit rooftop at night",
 lullaby:"a moonlit meadow",titan:"the forge yard at dusk",entropy:"the backwards clock tower at dusk",pulsar:"a midnight rooftop rave",quasar:"an empty open-air stage at night",
 singularity:"the edge of the old well at night",maw:"the dark lakeshore at night",hollow:"the white courtyard at noon",prototype:"the white courtyard at noon",
 companion:"a sunny garden wall",spider:"the castle roof at midnight",umbra:"the castle's shadowed cloister",penumbra:"the library courtyard after midnight",
 eel:"the aquarium wing's moonlit terrace",angelfish:"the reef-view terrace at night",hologram:"the conservatory terrace at night",cobra:"the ballroom terrace at midnight",
 muse:"the grand staircase terrace at night",rapture:"the grand staircase terrace at midnight",fennec:"a desert dune under the stars",shiba:"a lantern-lit ramen street at midnight",
 dingo:"the edge of a bonfire under the stars",hedgehog:"the greenhouse garden at midnight",voyager:"the observatory roof under the stars",archive:"the library's rooftop gallery",
 cipher:"the rooftops at midnight",medic:"the infirmary garden"};
/* colors that need a little help to read as a light */
const COL={orca:"black-and-coral",chameleon:"shifting rainbow",spider:"black-and-crimson",prototype:"soft white",hollow:"pale gray",eclipse:"black-and-gold",
 jaguar:"gold-and-emerald",cougar:"caramel-and-sage",cheetah:"gold-and-tangerine",caracal:"copper-and-gold",jackal:"black-and-gold",arcticfox:"snow-white-and-crimson",
 harpseal:"snow-white-and-powder-blue",narwhal:"pearl, pastel blue and lilac"};
const low=s=>s?s.charAt(0).toLowerCase()+s.slice(1):s;
const placeOf=s=>{s=String(s||"").trim().replace(/\.$/,"");if(!s)return"";return /^(The|A|An)\b/.test(s)?low(s):s};
const shortRoom=r=>{r=String(r||"");const m=/^(.*?)(?:,| with | lit | hung | full of | piled | lined | strung | opening | above | over | crammed )/.exec(r);return(m?m[1]:r).trim()};
function lookOf(h){
  let st=null;try{const t=typeof tplById==="function"?tplById(h+"robes"):null;st=t?stateFromTemplate(t):null}catch(e){}
  if(!st)return{};const c=st.c||{},pal=st.pal||{};
  const pc=v=>typeof v==="string"&&v[0]==="@"?pal[v.slice(1)]||"":v||"";
  const hair=c.hairBlend||[pc(c.hairBase),"hair"].filter(Boolean).join(" ");
  const id=[[c.hairLength,c.hairStyle].filter(Boolean).join(" "),hair,c.irisDetail||(pc(c.eyeOne)?pc(c.eyeOne)+" eyes":""),c.skinTone?c.skinTone+" skin":""].filter(Boolean).join(", ");
  const fig=[c.bodySoftness,c.bustSize].filter(Boolean).join(", ");
  return{gid:id,gfig:fig,gcol:pal.primary||""}}
/* filled once every data file has run (the biographies and some lore load after this file) */
function fillAll(){
let n=0;
(ACAD.HOUSES||[]).forEach(h=>{
  if(SISLORE[h])return;
  /* the girls written later carry their own details in NEWGIRLS / NEWLORE */
  if(typeof NEWGIRLS!=="undefined"&&typeof NEWLORE!=="undefined"&&NEWLORE[h]&&NEWGIRLS.some(g=>g.k===h))return;
  const b=(typeof BIOS==="object"&&BIOS[h])||{},HD=(ACAD.HUM&&ACAD.HUM.HD||{})[h]||[];
  const room=HD[0]||"",bath=HD[3]||"";
  const col=COL[h]||String(b.favColor||"").split(/,|;/)[0].trim().toLowerCase().replace(/ and /g,"-and-");
  const acc=col&&!/^(all of them|not decided|she's still)/.test(col)?col+" accents":"warm accent lights";
  const out=OUT[h]||placeOf(b.favPlace)||"the Academy grounds at golden hour";
  const role=ROLE[h]||("the "+low(String(b.groupRole||"").split(".")[0].replace(/^The /,"")||"one"));
  const e={role,acc,touch:"with "+acc+" and warm lamplight",room:shortRoom(room)||room,roomL:room,roomF:room,out};
  /* her look is read from her robes the first time a scene asks for it */
  let g=null;
  Object.defineProperty(e,"g",{enumerable:true,get(){if(!g){const L=lookOf(h);g={id:L.gid||"",fig:L.gfig||"",col:L.gcol||col,out,light:"soft warm light",room,bath}}return g}});
  SISLORE[h]=e;
  n++});
ACAD.SCENE_IDENT_FILLED=n;
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",fillAll,{once:true});else fillAll();
})();
