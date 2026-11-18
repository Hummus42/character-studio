/* ---- v322: Scene Archive, Public Sex. A full repertoire of positions and acts in everyday public places, with a
   muscular, dark-skinned faceless man. She is embarrassed, guilty or ashamed, and very turned on; she whispers one
   apologetic, painfully shy line (a Text item, editable in the Scene step) and small sound effects float around them.
   Each scene dresses her for its place in her own wardrobe (Scene step, Wearing...): the outfit and how it is pushed
   aside live only there, never in the scene text. Every place is deserted or out of sight, with only the risk of being
   seen (no crowds drawn). One image each. Adults only and consensual. On every girl's shelf in its own category.
   Loads after data-whitecouch.js and before part-13. ---- */
(function(){
  const X=window.ARCH_EXTRA;if(!X||!X.S)return;
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair, eyes and bodies, and on the contrast between her skin and his dark skin";
  const SHY="embarrassed, ashamed, guilty, heavy blush, teary eyes, biting her lip, aroused, half-lidded eyes, trembling";
  const AROUSE={"c1.blushStyle":"heavy embarrassed blush","c1.skinFinish":"flushed, sweat-glistening skin","c1.vaginaType":"flushed, swollen, and dripping wet","c1.nippleType":"hard and flushed with arousal"};
  const MAN="faceless male, dark-skinned male, muscular male, interracial, large penis, veiny penis, erection";
  const PUB="public indecency, sex in public, risk of discovery, embarrassed, blush, nervous sweating, trembling, sweat, motion lines";
  const uniq=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const W2='{"name":"Nude","f":{},"m":{}}';
  const wear=(name,f)=>JSON.stringify({name,f,m:{}});
  /* name, place, her outfit for it, what happens, tags, her pose, her line, sound, camera */
  const V=(name,place,w1,body,tags,po,say,sfx,gm)=>{
    const sp=`She whispers "${say}" in a small, dotted speech bubble.`,sx=`Small lewd sound effects reading "${sfx}" float around them.`;
    const f={name,count:"1girl, 1boy, hetero, faceless male, interracial, dark-skinned male",w1,w2:W2,act:tags.split(",").slice(0,4).map(s=>s.trim()).join(", "),
      scene:`In ${place}, with nobody else in sight but anyone able to walk in at any moment, ${body} ${sp} ${sx} `+uniq(["1girl, 1boy, hetero",tags,MAN,PUB,"speech bubble, english text, sound effects"].join(", ")),
      "c1.expression":SHY,"c1.posture":po,
      "texts.0.k":"speech","texts.0.st":"whisper","texts.0.who":"c1","texts.0.t":say,"texts.0.s":sp,
      "texts.1.k":"sfx","texts.1.st":"lewd","texts.1.who":"","texts.1.t":sfx,"texts.1.s":sx};
    return{f:Object.assign(f,AROUSE),r:{compact:false,dir:"ba",explicit:true,fit:true,framing:"full body",lewdtag:true,oexplicit:true,outfit:"scene",penis:true,gm:gm||"far",must:MUST,"texts.n":2,
      txTags:["speech bubble","english text","sound effects"]},fv:{},sl:[],g:"ALL",m:[],q:"none",qv:null,p:[]}};
  const C=c=>c;/* palette roles pass through */
  X.S.push({s:"Academy Caught in Public",v:[
    /* positions */
    V("Library stacks","the quiet back stacks of a library",wear("Library",{top:["{c} cardigan unbuttoned over a white blouse pulled open","@primary"],bottom:["pleated {c} skirt flipped up over her hips","@secondary"],panties:["white cotton panties pulled aside","white"]}),
      "the woman braces her hands on a bookshelf while a muscular, dark-skinned faceless man takes her from behind, a hand over her own mouth to keep quiet.","standing sex, sex from behind, against bookshelf, hand over own mouth, library, bookshelf, vaginal","bent forward against the shelf, hand over her mouth","I-I'm sorry... we're in the library... please don't stop...","pat pat"),
    V("Empty train carriage","an empty late-night train carriage",wear("Commute",{top:["{c} office blouse half-unbuttoned","@third"],bottom:["{c} pencil skirt pushed up around her waist","@primary"],legwear:["sheer pantyhose torn open at the crotch","black"]}),
      "the woman grips a handrail as a muscular, dark-skinned faceless man pounds her from behind with the train rocking under them.","standing sex, sex from behind, holding handrail, train interior, vaginal, ass grab","standing, gripping the handrail, bent at the waist","S-sorry... I'm so sorry... the next station is so close...","clatter clatter","far"),
    V("Fitting room","a cramped fitting room in a clothing store",wear("Shopping",{top:["{c} sundress pulled down to her waist","@primary"],panties:["lace panties around one ankle","@secondary"]}),
      "the woman faces the fitting room mirror as a muscular, dark-skinned faceless man fucks her from behind, watching her own blushing face in the glass.","fitting room, mirror, reflection, sex from behind, standing sex, vaginal, looking at mirror","standing, palms on the mirror","I'm sorry... the clerk is right outside... I can't stop...","pan pan"),
    V("Park bench","a park at night under a single streetlamp",wear("Evening walk",{top:["{c} oversized knit sweater","@primary"],bottom:["{c} flared skirt spread over his lap","@secondary"]}),
      "the woman rides a muscular, dark-skinned faceless man sitting on a park bench, bouncing in his lap while glancing nervously down the path.","cowgirl position, girl on top, on bench, park bench, sitting on lap, straddling, vaginal, night, streetlamp","straddling him on the bench, looking over her shoulder","I'm sorry... someone's walking a dog... d-don't stop...","plap plap"),
    V("Behind the beach rocks","a sunny beach, hidden behind tall rocks",wear("Beach day",{bra:["{c} bikini top pulled up over her breasts","@primary"],panties:["{c} bikini bottoms pulled aside","@primary"]}),
      "the woman is on her hands and knees in the sand behind the rocks while a muscular, dark-skinned faceless man fucks her from behind, the waves crashing just past them.","doggystyle, all fours, sex from behind, beach, sand, rock, vaginal, sunlight","on all fours in the sand","S-sorry... there are people on the beach... it feels so good...","splash plap"),
    V("Office copy room","an empty office copy room after hours",wear("Office",{top:["white office blouse pulled open","white"],bottom:["{c} pencil skirt hiked up around her waist","@primary"],legwear:["black pantyhose torn open","black"]}),
      "the woman lies back on the copy machine with her legs spread while a muscular, dark-skinned faceless man pounds into her, the machine rattling under them.","missionary, on back, spread legs, on table, office, copy machine, vaginal","lying back on the copier, legs spread","I'm so sorry... my boss is still here... please, harder...","rattle rattle"),
    V("Empty classroom","an empty classroom after the last bell",wear("After class",{top:["{c} cardigan over a blouse pulled open","@primary"],bottom:["{c} pleated skirt flipped up","@secondary"],legwear:["knee socks","@third"]}),
      "the woman is bent over a desk while a muscular, dark-skinned faceless man takes her from behind, her fingers clutching the desk's edge.","bent over desk, sex from behind, classroom, desk, vaginal, ass grab","bent over the desk","S-sorry... we shouldn't do this here... don't stop...","creak creak"),
    V("Back row of the cinema","the dark back row of a movie theater",wear("Movie night",{top:["{c} hoodie","@primary"],bottom:["{c} denim skirt pushed up","@secondary"]}),
      "the woman sits reverse cowgirl in the lap of a muscular, dark-skinned faceless man in the back row, lit by the flicker of the screen, grinding down on him.","reverse cowgirl position, sitting on lap, girl on top, movie theater, theater seat, dark, screen light, vaginal","sitting in his lap facing the screen","I'm sorry... I'm sorry... I can't watch the movie...","nuchu nuchu"),
    V("Cafe restroom","a tiny cafe restroom",wear("Cafe date",{top:["{c} summer dress pushed up to her waist","@primary"]}),
      "a muscular, dark-skinned faceless man lifts the woman against the restroom wall, her legs wrapped around him as he thrusts up into her.","suspended congress, against wall, carrying, legs around waist, restroom, vaginal","lifted against the wall, legs wrapped around him","S-sorry... someone keeps knocking... I'm almost...","thud thud"),
    V("Elevator","a stalled elevator",wear("Work",{top:["{c} silk blouse unbuttoned","@primary"],bottom:["{c} tailored trousers pulled down to her knees","@secondary"]}),
      "the woman is pinned to the elevator's mirrored wall as a muscular, dark-skinned faceless man fucks her from behind, the floor numbers frozen above them.","against wall, sex from behind, standing sex, elevator, mirror, vaginal","pressed against the mirrored wall","I'm sorry... what if it starts moving... please don't stop...","pan pan"),
    V("Stairwell","an echoing stairwell",wear("Errands",{top:["{c} t-shirt pulled up","@primary"],bottom:["jeans pulled down to her knees","blue"]}),
      "the woman is on her hands and knees on the stairs while a muscular, dark-skinned faceless man pounds her from behind, every sound echoing.","doggystyle, all fours, on stairs, stairwell, sex from behind, vaginal","on all fours on the stairs","S-so sorry... it echoes... everyone will hear me...","plap plap"),
    V("Back alley","a back alley behind a row of shops",wear("Night out",{outerwear:["{c} denim jacket","@secondary"],bottom:["{c} mini skirt hiked up","@primary"]}),
      "the woman stands against the brick wall with one leg hooked over the arm of a muscular, dark-skinned faceless man as he thrusts into her.","standing sex, leg lift, against wall, brick wall, alley, vaginal, night","standing against the wall, one leg lifted","I'm sorry... I-I shouldn't want this so much...","thud thud"),
    V("Rooftop at night","an empty rooftop at night above the city lights",wear("Date night",{top:["{c} slip dress pulled down off her shoulders and up over her hips","@primary"]}),
      "the woman bends over the rooftop railing while a muscular, dark-skinned faceless man takes her from behind, the city glittering below.","bent over, against railing, sex from behind, rooftop, cityscape, city lights, night, vaginal","bent over the railing","Sorry... the whole city's down there... harder, please...","plap plap"),
    V("Parked car","the backseat of a car in an empty parking lot",wear("Road trip",{top:["{c} sundress pushed up","@primary"]}),
      "the woman rides a muscular, dark-skinned faceless man in the cramped backseat, her palm pressed to the fogged window.","cowgirl position, girl on top, car interior, backseat, hand on window, condensation, vaginal","straddling him in the backseat","I'm sorry... the windows... someone could look in...","squeak squeak"),
    V("Gym after hours","an empty gym after closing",wear("Workout",{bra:["{c} sports bra pushed up","@primary"],bottom:["{c} leggings pulled down to her knees","@secondary"]}),
      "the woman lies back on a workout bench, legs up, while a muscular, dark-skinned faceless man pounds into her.","missionary, on back, legs up, on bench, gym, weights, vaginal, sweat","lying back on the bench, legs up","S-sorry... the cleaner's still here... don't stop...","clank plap"),
    V("Hotel pool","an empty hotel pool at night",wear("Swim",{top:["{c} one-piece swimsuit pulled aside","@primary"]}),
      "the woman stands in the shallow end with her arms on the pool's edge while a muscular, dark-skinned faceless man fucks her from behind in the glowing water.","sex from behind, standing sex, partially submerged, pool, water, wet, night, vaginal","standing in the water, arms on the pool edge","Sorry... there's a balcony right above us...","splash splash"),
    V("Hiking trail","a forest hiking trail",wear("Hike",{top:["{c} tank top pulled up","@primary"],bottom:["{c} hiking shorts pulled down to her knees","@secondary"]}),
      "the woman hugs a tree as a muscular, dark-skinned faceless man takes her from behind just off the trail.","standing sex, sex from behind, against tree, forest, outdoors, vaginal, sunlight","hugging a tree, bent at the waist","I'm sorry... I hear hikers coming... k-keep going...","pan pan"),
    V("Festival night","behind the stalls of a summer festival",wear("Yukata",{top:["{c} yukata slipped off her shoulders and open to the waist","@primary"]}),
      "the woman is pressed against a wooden fence behind the stalls while a muscular, dark-skinned faceless man fucks her from behind, lanterns glowing beyond.","sex from behind, standing sex, against fence, summer festival, paper lantern, night, vaginal","bent forward against the fence","S-sorry... the fireworks are starting... I can't stop...","pan pan"),
    V("Ferris wheel","a ferris wheel cabin at the top of the ride",wear("Fairground date",{top:["{c} date dress pushed up","@primary"]}),
      "the woman rides a muscular, dark-skinned faceless man in the swaying cabin, the fairground lights spread out far below.","cowgirl position, girl on top, sitting on lap, ferris wheel, night, city lights, vaginal","in his lap in the cabin","I'm sorry... it's almost at the bottom...","sway plap"),
    V("Bus shelter","a bus shelter on an empty late-night street",wear("Late night",{top:["{c} hoodie","@primary"],bottom:["{c} shorts pulled down","@secondary"]}),
      "the woman braces against the shelter's glass as a muscular, dark-skinned faceless man fucks her from behind under the flickering light.","sex from behind, standing sex, against glass, bus stop, night, vaginal","braced against the glass","Sorry... the bus is coming... please hurry...","pan pan"),
    V("Laundromat","a quiet laundromat",wear("Laundry run",{top:["oversized {c} t-shirt pulled up","@primary"],bottom:["{c} sleep shorts pulled aside","@secondary"]}),
      "the woman sits on a rumbling washing machine with her legs spread while a muscular, dark-skinned faceless man thrusts into her.","sitting, on washing machine, spread legs, laundromat, vaginal, vibration","sitting on the washer, legs spread","I'm sorry... the spin cycle... it's too much...","rumble plap"),
    V("Supermarket aisle","an empty supermarket aisle near closing",wear("Groceries",{top:["{c} casual blouse","@primary"],bottom:["jeans pushed down to her thighs","blue"]}),
      "the woman grips a shelf of cereal boxes as a muscular, dark-skinned faceless man takes her quickly from behind.","sex from behind, standing sex, supermarket, shelf, vaginal, quickie","bent forward, gripping the shelf","S-sorry... the cashier... we have to be quick...","pan pan"),
    /* oral and finish */
    V("Under the study table","under a long study table in the library",wear("Study",{top:["{c} sweater","@primary"],bottom:["{c} pleated skirt","@secondary"]}),
      "the woman kneels hidden under the table, sucking the huge, veiny cock of a muscular, dark-skinned faceless man, glancing guiltily up.","fellatio, kneeling, under table, library, looking up, saliva","kneeling under the table, looking up","Mmh... s-sorry... I couldn't wait...","slurp slurp","pov"),
    V("Front seat","the front seat of a car in an empty parking lot",wear("Drive",{top:["{c} hoodie","@primary"],bottom:["{c} skirt","@secondary"]}),
      "the woman leans across the front seat to suck a muscular, dark-skinned faceless man, her cheeks hollowed, eyes darting to the windows.","fellatio, car interior, leaning, cheek bulge, saliva, looking up","leaning across the seat","Sorry... is anyone looking?","gluk gluk","pov"),
    V("Dripping in the restroom","a public restroom stall",wear("Night out",{top:["{c} party dress hitched up","@primary"],panties:["lace panties at her knees","@secondary"]}),
      "the woman stands trembling in the stall, legs shaking, cum dripping down her thighs after a muscular, dark-skinned faceless man filled her.","after sex, cumdrip, cum in pussy, standing, trembling, restroom, thighs","standing, legs shaking","I'm sorry... it's still coming out...","drip drip"),
    V("Finished in the bushes","behind thick bushes in a park",wear("Picnic",{top:["{c} sundress pulled down to her waist","@primary"]}),
      "the woman kneels behind the bushes as a muscular, dark-skinned faceless man finishes across her face and breasts, her eyes squeezed shut.","facial, cum on face, cum on breasts, kneeling, bush, park, outdoors, ejaculation","kneeling behind the bushes","S-sorry... I'm a mess... is anyone coming?","splurt","pov")]});
  const reg=()=>{if(typeof ACAD!=="undefined"&&ACAD.RX_CATS&&!ACAD.RX_CATS.some(x=>x[0]==="Public sex"))ACAD.RX_CATS.push(["Public sex",["Caught in Public"]])};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",reg);else setTimeout(reg,0);
})();
