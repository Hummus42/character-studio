/* ---- v178: two more girl-focused sets, built on the user's own example (a bride bent over in an empty church, a headline
   across the top, "1 Hour Before the Ceremony, with the Father-In-Law"): the context sells it.
   Every scene has
     · a headline across the top of the image that sets up the betrayal ("Her Husband's Promotion Dinner, with His Boss"),
     · one big speech bubble from the girl with hearts and flowery text,
     · her outfit for the occasion spelled out tag by tag (bridal corset, bridal garter …),
     · the man as an outfit and a body only (a black tuxedo with white gloves, a giant veiny rock-hard cock), never a face,
     · and the explicit detail: motion lines, hair pulling, cross-section, x-ray, cumming, orgasm, ahegao, drooling, panting.
   "Academy Secret Affairs"  cheating: she is frantic, guilty and embarrassed, terrified of being caught, and still willing.
   "Academy Stolen Wives"    NTR: she moans that she doesn't need her husband anymore.
   Runs with no partner (faceless man); pick one in the Scene tab to make him someone. Adult women; held back by the safeguard
   like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),GX="Explicit (adult)";
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  /* outfit pieces */
  const IT=[["corset","lace bridal corset","L","boudoir,glam"],["bra","lace bridal bra","L","boudoir,glam"],["bottom","sheer bridal skirt hiked up around the waist","L","boudoir,glam"],
    ["headwear","long sheer bridal veil","CU","glam"],["gloves","long satin opera gloves","CUS","glam"],["thighAccessory","lace thigh garter","LS","boudoir,glam"],
    ["top","silk blouse torn open over bare breasts","L","preppy,boudoir"],["bottom","pencil skirt hiked up around the waist","L","preppy,boudoir"],["legwear","torn sheer tights","L","preppy,boudoir"],
    ["top","cocktail dress pulled down to the waist","L","glam,boudoir"],["top","yukata pulled open off the shoulders","L","cultural,boudoir"],
    ["top","bikini top pulled aside","L","resort,boudoir"],["bottom","bikini bottoms pulled aside","L","resort,boudoir"],["top","ski jacket unzipped over bare breasts","L","sporty,boudoir"],
    ["top","flannel shirt unbuttoned over bare breasts","L","casual,boudoir"],["top","red velvet Santa dress pulled down to the waist","L","costume,boudoir"],
    ["top","qipao pulled down to the waist","L","cultural,boudoir"],["top","ballet leotard pulled aside","L","costume,boudoir"],["legwear","torn pink ballet tights","L","costume,boudoir"],
    ["top","short silk robe hanging open","L","boudoir"],["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],["panties","lace panties pulled aside","L","boudoir"],
    ["legwear","lace garter stockings","LS","boudoir"],["ringAccessory","gold wedding band","CU","glam,casual"],["ringAccessory","engagement ring with a large diamond","CU","glam"],
    ["top","cardigan unbuttoned over bare breasts","L","casual,boudoir"],["bottom","skirt hiked up around the waist","L","casual,boudoir"],["eyewear","round glasses","CU","preppy,casual"],
    ["top","frilled apron pushed aside over bare breasts","L","cottage,boudoir"],["legwear","high heels","CUS","glam"],["neckAccessory","pearl necklace","CU","glam"]];
  IT.forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};
  /* positions (%m% the man, %his%, %him%, %cock%) */
  const POS={
    armpull:{pov:false,act:"sex, vaginal, doggystyle, sex from behind, arm pull",pose:"bending forward with her arms pulled back by the wrists",
      text:"is bent over as %m% fucks her doggystyle from behind, pulling her arms back by the wrists so her back arches and her breasts swing, %his% giant, veiny, rock-hard %cock% slamming into her vagina with motion lines",
      tags:"bent over, doggystyle, sex from behind, arm grab, arm pull, arched back, hanging breasts"},
    hairpull:{pov:false,act:"sex, vaginal, sex from behind, hair pull",pose:"bending over with her head pulled back by the hair",
      text:"is bent over as %m% takes her from behind, one gloved fist pulling her hair so her head tips back and the other gripping her hip, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",
      tags:"bent over, sex from behind, hair pull, head back, hand on another's hip"},
    nelson:{pov:false,act:"sex, vaginal, full nelson, legs up",pose:"held up in a full nelson, legs spread wide",
      text:"is held up in a full nelson by %m% behind her, legs spread wide and pinned by %his% arms, her whole body on display as %his% giant, veiny, rock-hard %cock% pumps into her vagina with motion lines",
      tags:"full nelson, legs up, spread legs, held up, presenting"},
    press:{pov:true,act:"sex, vaginal, mating press",pose:"lying folded in a mating press, legs pressed back",
      text:"lies folded in a mating press, legs pinned back over her shoulders as %m% drives %his% giant, veiny, rock-hard %cock% straight down into her vagina with motion lines",
      tags:"mating press, legs up, folded, deep penetration"},
    cowgirl:{pov:true,act:"sex, vaginal, cowgirl position, girl on top",pose:"riding on top, facing the viewer",
      text:"rides %m% in the cowgirl position, bouncing hard on %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her breasts bouncing",
      tags:"cowgirl position, girl on top, straddling, bouncing breasts"},
    standing:{pov:false,act:"sex, vaginal, standing sex, leg lift",pose:"standing on one leg, the other lifted high",
      text:"stands on one leg with the other hoisted high in %m%'s gloved hand as %he% fucks her standing, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",
      tags:"standing sex, leg lift, standing split, leg up"},
    wall:{pov:false,act:"sex, vaginal, standing sex, sex from behind, against wall",pose:"pressed face-first against a wall, ass pushed out",
      text:"is pressed face-first against the wall with her ass pushed out as %m% fucks her standing from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, %his% hand clamped on her hip",
      tags:"against wall, standing sex, sex from behind, ass, cheek press"},
    prone:{pov:true,act:"sex, vaginal, prone bone",pose:"lying face-down with her ass raised",
      text:"lies face-down with her ass raised as %m% pins her flat in a prone bone, %his% giant, veiny, rock-hard %cock% pounding into her vagina with motion lines",
      tags:"prone bone, lying, on stomach, ass up, pinned"},
    reverse:{pov:true,act:"sex, vaginal, reverse cowgirl position",pose:"riding in reverse, looking back over her shoulder",
      text:"rides %m% in the reverse cowgirl position, her ass slapping down onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",
      tags:"reverse cowgirl position, girl on top, ass, looking back"},
    table:{pov:true,act:"sex, vaginal, missionary, on table",pose:"lying back across a table, legs spread",
      text:"lies back across the table with her legs spread and hooked over %m%'s arms as %he% pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",
      tags:"on table, missionary, spread legs, legs over arms"}};
  const fillM=(s,solo)=>s.replace(/%m%/g,solo?"the man":"{partner}").replace(/%his%/g,solo?"his":"{his}").replace(/%him%/g,solo?"him":"{him}").replace(/%he%/g,solo?"he":"{he}").replace(/%cock%/g,solo?"cock":"{cock}");
  const BOOM="cumming, orgasm, cross-section, x-ray, cum in pussy, cum overflow, impregnation, motion lines, moaning, panting, blushing, sweat, trembling";
  const EX={guilty:["crying ahegao, tears streaming, eyes rolling upward, tongue out and drooling, full-face blush","panicked, teary-eyed, deeply blushing face with her mouth open, moaning",
      "mortified, tear-streaked face, eyes crossed, tongue out, drooling","guilty, crying, heavy-lidded expression, biting her lip, blushing to her ears"],
    ntr:["full ahegao face, eyes crossed and rolling upward, tongue out and drooling","blissed-out, heart-eyed, lewd smile","smug, half-lidded, lustful grin with her tongue out",
      "open-mouthed, moaning, heart-eyed expression"]};
  Object.values(EX).flat().forEach(v=>START.option("expression",v,GX));
  Object.values(POS).forEach(p=>START.option("posture",p.pose,GX));
  START.option("pupilStyle","heart pupils",GX);

  /* r: [house, key, name, pos, headline, place, man, look, line, detail, tags, w1, ex index, blurb] */
  function make(label,after,pre,oname,kind,list){
    START.add(label,list.map(([h,key,name,pk,head,place,man,look,line,detail,tags,w,exi,blurb])=>{
      const P=POS[pk],exv=EX[kind][exi||0];
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({},w||{});Object.keys(w1i).forEach(k=>{if(!w1i[k])delete w1i[k]});
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const art=/^[aeiou]/i.test(exv)?"an":"a";
      const bubble=kind==="ntr"?`A big speech bubble with hearts and flowery text comes from the girl: "${line}"`
        :`A big, frantic speech bubble with hearts and flowery text comes from the girl: "${line}"; she is guilty, embarrassed and terrified of being caught, and she doesn't want him to stop`;
      const body=s=>`A headline goes across the top of the image: "${head}". Setting: ${place}, blurry background, detailed foreground outlined in black. The woman wears ${look}. She ${fillM(P.text,s)}. ${fillM(detail,s)} She has ${art} ${exv}. ${bubble}. ${s?`The man is faceless, his head out of frame: ${man}, muscular, with a giant, veiny, rock-hard cock. `:`{Partner} is ${man.replace(/^he /,"")}. `}`;
      const tg=dedupe(`${kind==="ntr"?"netorare, ":""}cheating (relationship), infidelity, ${P.tags}, ${tags}, ${BOOM}, speech bubble, heart, english text, headline, black outline, blurry background`+(kind==="guilty"?", tears, embarrassed, guilt, consensual":", spoken heart"));
      const c1=Object.assign({},AROUSE,{expression:exv,posture:P.pose},kind==="ntr"?{pupilStyle:"heart pupils"}:{});
      return{id:pre+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes",
          pair:{id:"",outfit:"scene",solo:body(true)+tg,soloCount:P.pov?"1girl, 1boy, pov, faceless male, muscular male, hetero":"1girl, 1boy, faceless male, head out of frame, muscular male, hetero",
            scene:body(false)+tg,act:P.act,dir:"ba",explicit:true,penis:true,c1,w1:{name:oname,look:"boudoir",f:w1i},w2:{name:oname,look:"boudoir",m:{},f:{}},compact:false,fit:true}},
        tags:(kind==="ntr"?["ntr","netorare","cheating"]:["cheating","guilty","affair"]).concat(["explicit","sex","faceless male","headline","single scene",h]),
        blurb:`“${head}.” ${blurb} ${cap(h)}; the man is faceless, so it's all about her.`};
    }),{after});
    const bad=[];list.forEach(r=>Object.entries(r[11]||{}).forEach(([f,a])=>{if(a&&!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(r[1]+": "+f+" “"+a[0]+"”")}));
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }

  const BRIDE={headwear:["long sheer bridal veil","white"],corset:["lace bridal corset","white"],bra:["lace bridal bra","white"],bottom:["sheer bridal skirt hiked up around the waist","white"],
    gloves:["long satin opera gloves","white"],thighAccessory:["lace thigh garter","@c1"],legwear:["lace garter stockings","white"],ringAccessory:["engagement ring with a large diamond","-"]};
  const OFFICE={top:["silk blouse torn open over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@dark"],legwear:["torn sheer tights","black"],ringAccessory:["gold wedding band","-"]};
  const PARTY={top:["cocktail dress pulled down to the waist","@c1"],legwear:["high heels","@dark"],neckAccessory:["pearl necklace","white"],ringAccessory:["gold wedding band","-"]};
  const HOME={top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"],panties:["lace panties pulled aside","@c2"],ringAccessory:["gold wedding band","-"]};
  const W=(o,x)=>Object.assign({},o,x||{});

  /* ======================= Secret Affairs (cheating, guilty) ======================= */
  make("Academy Secret Affairs","Academy Guilty Cheating","sa","Secret affair","guilty",[
["griffin","promotion","His promotion dinner","hairpull","Her Husband's Promotion Dinner, with His Boss","a dark executive office above the restaurant, the dinner party glowing through the glass wall below",
  "he wears a charcoal three-piece suit with a gold watch","a tight crimson cocktail dress pulled down to her waist, pearls, high heels and her wedding band",
  "We have to hurry! My husband's giving his speech downstairs!♡","Below them, through the glass, her husband stands at the head of the long table raising his glass, and her wedding band glints on the hand braced on the boss's desk.",
  "office, desk, glass wall, dinner party, suit, wristwatch, cocktail dress, pearl necklace, high heels, wedding ring",W(PARTY),0,"Bent over her husband's boss's desk while her husband gives his speech below."],
["badger","housewarming","The housewarming","wall","Their Housewarming Party, with the Neighbor","a cramped pantry off the kitchen, shelves of honey jars rattling, party chatter through the slatted door",
  "he wears a polo shirt and khakis, his belt undone","a cozy yellow sweater dress pulled down to her waist, an apron still tied, lace panties pulled aside and her wedding band",
  "Everyone's right outside... my husband's looking for me!♡ Please, quietly!♡","Light and party guests flicker through the pantry door's slats, a casserole dish forgotten on the shelf, honey jars clinking with every thrust.",
  "pantry, shelf, jar, door, party, apron, sweater dress, wedding ring",W(HOME,{top:["frilled apron pushed aside over bare breasts","@c1"],bottom:null}),1,"Against the pantry wall at her own housewarming."],
["raven","anniversary","Anniversary night","standing","Their 5th Anniversary, with Her Ex","a hotel balcony at night under a sky thick with stars, the anniversary dinner table glowing inside",
  "he wears a dark leather jacket over an open shirt","a midnight-blue evening gown pulled down to her waist, long satin gloves, heels and her wedding band",
  "It's our anniversary... my husband's waiting at the table... I'm so sorry!♡","Through the glass door her husband sits alone at a candlelit table with a ring box, and her lifted leg trembles high against the railing.",
  "balcony, night, starry sky, railing, candle, evening gown, elbow gloves, high heels, wedding ring",W(PARTY,{gloves:["long satin opera gloves","@dark"]}),3,"On a hotel balcony with her ex while her husband waits with a ring box."],
["serpent","engagement","The engagement party","armpull","Her Own Engagement Party, with the Best Man","a velvet-draped penthouse powder room in emerald light, the party roaring outside the door",
  "he wears a black tuxedo with an emerald pocket square","an emerald satin gown pulled down to her waist, long black gloves, garter stockings and an enormous engagement ring",
  "My fiancé's about to make a toast... we can't be caught!♡","Her engagement ring flashes in the mirror over the sink as her wrists are held behind her, and her fiancé's voice calls her name in a little speech bubble from outside.",
  "powder room, bathroom, mirror, sink, tuxedo, satin dress, elbow gloves, garter straps, engagement ring",W(PARTY,{gloves:["long satin opera gloves","black"],legwear:["lace garter stockings","black"],ringAccessory:["engagement ring with a large diamond","-"]}),2,"Wrists pulled back in the powder room of her own engagement party."],
["wolf","camping","Family camping trip","prone","Family Camping Trip, with Her Brother-in-Law","inside a tent at night, the campfire glowing through the canvas and silhouettes of the family around it",
  "he wears an unzipped hoodie and cargo shorts","an unbuttoned flannel shirt over bare breasts, hiking shorts pulled down to her ankles and her wedding band",
  "My husband's right outside by the fire... quietly... please quietly!♡","Her husband's silhouette roasts a marshmallow on the other side of the tent wall, and she bites down on a sleeping bag to keep from screaming.",
  "tent, camping, night, campfire, silhouette, sleeping bag, flannel, biting, wedding ring",W({top:["flannel shirt unbuttoned over bare breasts","@c1"],ringAccessory:["gold wedding band","-"]}),0,"Pinned in the tent while her husband sits at the fire outside."],
["swan","ceremony","Before the ceremony","armpull","1 Hour Before the Ceremony, with the Father-in-Law","an empty church, sunlight through stained glass, flower petals scattered down the aisle between empty pews",
  "he wears a black tuxedo with white gloves","a full bridal look: a white bridal veil, lace bridal corset, lace bridal bra, sheer bridal skirt hiked up, a bridal garter, long white gloves and garter stockings",
  "Hurry! My fiancé is almost here!♡","She is bent over the front pew, her veil spilling down her back and her gloved arms pulled back by the wrists, flower petals sticking to her stockings.",
  "church, stained glass, pews, flower petals, aisle, wedding dress, bridal veil, bridal garter, bridal corset, tuxedo, white gloves, indoors sex",W(BRIDE),0,"Bent over the front pew an hour before the wedding: the user's own example, for Swan."],
["dragon","newyear","New Year's dinner","table","Lunar New Year Dinner, with Her Husband's Older Brother","a private dining room with red lanterns, a round table of dishes pushed aside, firecrackers flashing outside",
  "he wears a dark mandarin-collar suit","a red qipao pulled down to her waist, gold earrings, a red envelope tucked in her stockings and her wedding band",
  "The whole family's next door... my husband will hear us!♡","Dumplings and teacups scatter across the round table under her as she is taken on it, and through the round moon door the family toasts in the next room.",
  "dining room, round table, food, red lantern, firecrackers, qipao, red envelope, wedding ring",W({top:["qipao pulled down to the waist","@c1"],legwear:["sheer stockings","black"],ringAccessory:["gold wedding band","-"]}),1,"On the dinner table while the family toasts next door."],
["stag","thanksgiving","Thanksgiving","wall","Thanksgiving Dinner, with Her Husband's Best Friend","a laundry room off the kitchen, autumn leaves outside the window, the dryer rumbling and the family's laughter through the door",
  "he wears a knit sweater pushed up and unbuckled jeans","a forest-green knit dress pulled down to her waist, an apron still tied, stockings and her wedding band",
  "He's carving the turkey right now... we have to be quick!♡","Her cheek is squashed against the vibrating dryer door, a dish towel still in her hand, and a pie cools on the shelf beside her.",
  "laundry room, washing machine, autumn leaves, window, pie, apron, knit dress, wedding ring",W(HOME,{top:["frilled apron pushed aside over bare breasts","@c1"],bottom:null}),3,"Against the dryer while her husband carves the turkey."],
["shark","honeymoon","Honeymoon, day 2","standing","Honeymoon Day 2, with the Surf Instructor","a beach surf shack, sunlight through the slats, surfboards against the walls",
  "he wears board shorts pulled down, a shark-tooth necklace on his bare, tanned chest","a steel-blue string bikini pulled aside, wet hair, sand on her legs and a brand-new wedding band",
  "My husband's waiting on the beach... we only have five minutes!♡","Through the shack's open door her new husband waves from a beach towel, and seawater drips from her lifted leg onto the sand floor.",
  "beach, surf shack, surfboard, sunlight, bikini, swimsuit aside, wet, sand, wedding ring, honeymoon",W({top:["bikini top pulled aside","@c1"],bottom:["bikini bottoms pulled aside","@c1"],ringAccessory:["gold wedding band","-"]}),1,"In the surf shack on her honeymoon, her husband waving from the beach."],
["penguin","skilodge","The ski lodge","cowgirl","Snowed In at the Ski Lodge, with the Ski Instructor","a ski-lodge locker room, snow falling past the frosted window, skis and poles racked on the wall",
  "he wears ski pants pulled down and a thermal shirt","a black ski jacket unzipped over her bare breasts, ski pants pulled down, a knit hat and her wedding band",
  "My husband's waiting in the lodge for hot cocoa... I'm the worst!♡","Her freckled skin is flushed pink from the cold and the shame, snowflakes melting in her black hair, a text from her husband glowing on her phone on the bench.",
  "locker room, ski lodge, snow, snowing, frosted window, skis, ski jacket, beanie, phone, wedding ring",W({top:["ski jacket unzipped over bare breasts","black"],ringAccessory:["gold wedding band","-"]}),0,"Riding the ski instructor while her husband waits with the cocoa."],
["fox","festival","Festival night","wall","Summer Festival Night, with Her Husband's Boss","behind the festival stalls at dusk, paper lanterns glowing and fireworks bursting overhead",
  "he wears a dark yukata hanging open","a yukata pulled open off her shoulders, the obi loose, geta sandals, a fox mask pushed up on her head and her wedding band",
  "My husband went to get us candy apples... we have to finish before he's back!♡","Fireworks light up her tear-streaked face, the crowd passing just beyond the stalls' back curtains.",
  "festival, paper lantern, fireworks, night, yukata, obi, fox mask, mask on head, geta, wedding ring",W({top:["yukata pulled open off the shoulders","@c1"],ringAccessory:["gold wedding band","-"]}),2,"Behind the festival stalls while her husband buys candy apples."],
["lovebird","valentines","Valentine's Day","press","Valentine's Day, with Her Boyfriend's Brother","her pastel bedroom full of hearts and fairy lights, a heart-shaped box of chocolates and roses from her boyfriend on the bed",
  "he wears an open dress shirt and loosened tie","a pink lace lingerie set pulled aside, thigh-high stockings and the heart necklace her boyfriend gave her",
  "My boyfriend's on his way with dinner... this is so wrong!♡","Chocolates spill from the heart-shaped box under her back and rose petals stick to her skin, her boyfriend's card on the pillow reading \"Love you forever ❤\".",
  "bedroom, heart, fairy lights, chocolate, heart-shaped box, roses, rose petals, card, lingerie, thighhighs",{bra:["lace bra","@c1"],panties:["lace panties pulled aside","@c1"],legwear:["thigh-high stockings","white"]},3,"On Valentine's Day, on the bed with her boyfriend's roses."],
["flamingo","vegas","Girls' trip","reverse","Girls' Trip to Vegas, with the Bartender","the stockroom behind a casino bar, neon spilling through the doorway",
  "he wears a black vest and rolled-up white sleeves, bow tie undone","a pink sequin mini dress pulled down to her waist, heels, a 'BRIDE TO BE' sash and her engagement ring",
  "My fiancé keeps calling... I'm getting married next week!♡","Her phone buzzes on a crate of champagne with her fiancé's name, and her 'BRIDE TO BE' sash hangs off one shoulder.",
  "stockroom, crate, champagne, neon lights, vest, sequins, sash, phone, incoming call, engagement ring",W(PARTY,{ringAccessory:["engagement ring with a large diamond","-"]}),1,"In the casino stockroom on her bachelorette trip."],
["kraken","officeparty","The office party","table","The Office Christmas Party, with Her Manager","a dark conference room, the office party glowing through the frosted glass, tinsel on the blinds",
  "he wears a loosened tie and an open white shirt, a Santa hat askew","a red velvet Santa dress pulled down to her waist, stockings and her wedding band",
  "My husband's picking me up in five minutes!♡ He can't see me like this!♡","Her phone on the conference table shows her husband's text, \"Outside! ❤\", next to a spilled cup of eggnog.",
  "conference room, office, table, christmas, tinsel, santa hat, santa costume, phone, text message, wedding ring",W({top:["red velvet Santa dress pulled down to the waist","red"],legwear:["sheer stockings","black"],ringAccessory:["gold wedding band","-"]}),0,"On the conference table at the office party, her husband outside."],
["salmon","rehearsal","Rehearsal dinner","hairpull","The Night Before Her Wedding, with the Chef","a steel restaurant kitchen after the rehearsal dinner, pots steaming and the swinging door's porthole glowing",
  "he wears a white chef's coat hanging open","an ivory cocktail dress pulled down to her waist, pearls, heels and her engagement ring",
  "My fiancé's still out there giving toasts!♡ I'm getting married tomorrow!♡","Through the porthole of the swinging door her fiancé raises a glass, and her ring hand grips the steel counter.",
  "kitchen, restaurant, counter, steam, door, window, chef, cocktail dress, pearl necklace, engagement ring",W(PARTY,{ringAccessory:["engagement ring with a large diamond","-"]}),2,"In the restaurant kitchen the night before her wedding."],
["crow","jeweler","Picking out the ring","armpull","Picking Out Wedding Rings, with the Jeweler","the back room of a glittering jewelry store, velvet trays of rings scattered on the counter",
  "he wears a fitted waistcoat and a jeweler's loupe","a black lace dress pulled down to her waist, garter stockings, a trinket choker and an engagement ring",
  "My fiancé's out front choosing our rings!♡ Faster!♡","Through the curtain her fiancé leans over the display case, and rings spill from the velvet trays around her braced hands.",
  "jewelry store, ring, display case, curtain, waistcoat, lace dress, garter straps, choker, engagement ring",W(PARTY,{legwear:["lace garter stockings","black"],ringAccessory:["engagement ring with a large diamond","-"]}),3,"In the jeweler's back room while her fiancé picks their rings."],
["owl","booksigning","The book signing","table","Her Husband's Book Signing, with His Editor","a dim bookshop storeroom at night, stacks of her husband's new novel everywhere, a full moon in the window",
  "he wears a tweed blazer and an open collar","a caramel-brown cardigan unbuttoned over bare breasts, a skirt hiked up, round glasses and her wedding band",
  "He's signing books right outside!♡ Shh, quietly!♡","Copies of her husband's novel, his face on the back cover, slide off the table under her, and her fogged glasses sit askew.",
  "bookshop, storeroom, books, book stack, night, moonlight, round eyewear, fogged glasses, cardigan, wedding ring",W(HOME,{eyewear:["round glasses","@metal"]}),3,"On a table of her husband's own novels during his book signing."],
["rat","movingday","Moving day","prone","Moving Into Their First Home, with the Mover","an empty new apartment full of cardboard boxes, a mattress still in plastic on the floor",
  "he wears a sweaty tank top and work gloves","an oversized t-shirt pushed up over her breasts, sweatpants pulled down and her cheap wedding band",
  "My husband's bringing up the last box!♡ Hurry!♡","Footsteps clomp on the stairs outside the open door, and she clutches a box labelled \"Our bedroom ❤\".",
  "apartment, cardboard box, moving, mattress, plastic, tank top, work gloves, t-shirt, wedding ring",W({top:["oversized t-shirt pushed up over her breasts","@c1"],ringAccessory:["gold wedding band","-"]}),0,"On the plastic-wrapped mattress on moving day."]
  ]);

  /* ======================= Stolen Wives (NTR) ======================= */
  make("Academy Stolen Wives","Academy Secret Affairs","sw","Stolen","ntr",[
["griffin","rival","Promotion party","nelson","Her Husband's Promotion Party, Taken by His Rival","her husband's own office after hours, his nameplate on the desk and his promotion plaque on the wall",
  "he wears a navy suit with the jacket thrown aside","a crimson cocktail dress pulled down to her waist, heels, pearls and her wedding band",
  "I don't need my husband anymore♡ You're so much better than him!♡","She is held up facing her husband's framed photo on the desk, flashing a peace sign at it, cum spilling out around the shaft.",
  "office, desk, nameplate, plaque, picture frame, peace sign, cocktail dress, pearl necklace, wedding ring",W(PARTY),0,"Held up in front of her husband's photo, in his own office."],
["badger","businesstrip","Day 3 of his trip","cowgirl","Day 3 of Her Husband's Business Trip, with the Neighbor","her own sunny kitchen, her husband's packed lunch box still on the counter",
  "he wears a sweaty gym shirt pushed up","a frilled apron pushed aside over her bare breasts, nothing else but her wedding band",
  "His was so small♡ I'm never going back to his little thing!♡","She rides on a kitchen chair with her enormous breasts bouncing, her husband's lunch box knocked over beside them.",
  "kitchen, chair, sitting, lunch box, naked apron, bouncing breasts, wedding ring",W({top:["frilled apron pushed aside over bare breasts","@c1"],ringAccessory:["gold wedding band","-"]}),1,"Day three of his trip, riding the neighbor in her kitchen."],
["raven","tenth","10th anniversary","press","Their 10th Anniversary, Spent with Someone Else","a hotel suite under a skylight full of stars, an anniversary cake untouched on the table",
  "he wears an open white shirt","a midnight-blue lace lingerie set, garter stockings and her wedding band",
  "Ten years and he never made me feel like this♡ I'm yours now!♡","The cake's '10' candle burns on the table, and her phone shows twenty missed calls from her husband.",
  "hotel room, skylight, starry sky, cake, candle, phone, missed calls, lingerie, garter straps, wedding ring",{bra:["lace bra","@c1"],panties:["lace panties pulled aside","@c1"],legwear:["lace garter stockings","@dark"],ringAccessory:["gold wedding band","-"]},2,"Their tenth anniversary, with twenty missed calls."],
["serpent","papers","The divorce papers","table","The Divorce Papers Arrive Tomorrow","a velvet-draped penthouse dining table in emerald light, signed divorce papers and a pen on the table",
  "he wears tailored black trousers, shirtless, a gold chain on his chest","an emerald silk robe hanging open, black garter stockings and her wedding band, about to come off",
  "I signed them already♡ I don't need him anymore, only this!♡","The signed divorce papers crinkle under her back and her wedding band rolls loose across the table.",
  "dining table, on table, divorce papers, paper, pen, signature, silk robe, garter straps, ring",W({top:["short silk robe hanging open","@c1"],legwear:["lace garter stockings","black"],ringAccessory:["gold wedding band","-"]}),2,"On the dining table, on top of the signed divorce papers."],
["wolf","hunting","His hunting trip","armpull","Her Husband's Hunting Trip, with His Best Friend","a log cabin by the fire, a mounted antler rack on the wall and a full moon over dark pines",
  "he wears an open flannel shirt and work jeans","an unbuttoned flannel shirt over bare breasts and her wedding band",
  "He can stay out in the woods forever♡ I'm your woman now!♡","She is bent over the arm of her husband's leather armchair, his hunting cap knocked to the floor.",
  "cabin, fireplace, armchair, antlers, full moon, night, flannel, wedding ring",W({top:["flannel shirt unbuttoned over bare breasts","@c1"],ringAccessory:["gold wedding band","-"]}),0,"Bent over her husband's armchair while he's out hunting."],
["swan","birthday","His birthday party","standing","Her Husband's Birthday Party, Upstairs","her white bedroom with gauzy curtains, the birthday party's music and balloons downstairs",
  "he wears a crisp party suit, the jacket on the floor","a pearl-white cocktail dress pulled down to her waist, heels and her wedding band",
  "Happy birthday, honey♡ I'm giving your present to someone better!♡","A gift-wrapped present for her husband lies crushed on the bed, and her lifted leg stretches straight up in a dancer's split.",
  "bedroom, curtains, gift, present, balloon, birthday, standing split, cocktail dress, wedding ring",W(PARTY),3,"Upstairs at her husband's birthday party, giving his present away."],
["dragon","brother","New Year","press","Lunar New Year, with Her Husband's Older Brother","a red-draped bedroom with red lanterns, firecrackers bursting outside the window",
  "he wears an open red silk shirt","a red qipao pulled down to her waist, gold earrings and her wedding band",
  "Your brother was never enough♡ I belong to you now!♡","Red envelopes scatter across the bed as she is folded under him, her nails digging into his back.",
  "bedroom, red lantern, firecrackers, red envelope, qipao, nail marks, wedding ring",W({top:["qipao pulled down to the waist","red"],ringAccessory:["gold wedding band","-"]}),0,"Folded under her husband's brother on New Year's."],
["stag","breakfast","He's making breakfast","prone","Her Husband Is Downstairs Making Breakfast","her forest-cottage bedroom at morning, sun through the ivy, the smell of pancakes drifting up",
  "he wears nothing but a wristwatch","only her wedding band, the sheets tangled around her ankles",
  "Make breakfast for yourself, honey♡ I'm staying in bed with him!♡","Her husband calls \"Pancakes are ready!\" up the stairs in a little speech bubble, and she drools into his pillow.",
  "bedroom, morning, sunlight, ivy, bed, pillow, completely nude, drooling, wedding ring",{ringAccessory:["gold wedding band","-"]},1,"In bed with another man while her husband makes pancakes."],
["shark","cruise","Honeymoon cruise","reverse","Honeymoon Cruise, with the Ship's Captain","the captain's cabin of a cruise ship, the ocean glittering through the portholes",
  "he wears an open white captain's uniform","a steel-blue string bikini pulled aside and her brand-new wedding band",
  "My husband's seasick in our cabin♡ I'd rather be your wife!♡","She bounces in reverse with her ass rippling, the captain's hat perched on her head.",
  "ship, cabin, porthole, ocean, captain, peaked cap, bikini, swimsuit aside, wedding ring, honeymoon",W({top:["bikini top pulled aside","@c1"],bottom:["bikini bottoms pulled aside","@c1"],ringAccessory:["gold wedding band","-"]}),2,"On her honeymoon cruise, in the captain's cabin."],
["penguin","christmaseve","Christmas Eve","cowgirl","Christmas Eve, with the Man Who Plowed the Driveway","a snowed-in cabin living room by the Christmas tree, snow piling against the frosted window",
  "he wears snow boots and an open work coat","a red velvet Santa dress pulled down to her waist, white thigh-highs and her wedding band",
  "My husband's stuck in the snow♡ He can stay there! I want you for Christmas!♡","She rides on the rug under the glittering tree, wrapped presents scattered, her freckled breasts bouncing.",
  "christmas tree, christmas, presents, snow, winter, frosted window, santa costume, thighhighs, bouncing breasts, wedding ring",W({top:["red velvet Santa dress pulled down to the waist","red"],legwear:["thigh-high stockings","white"],ringAccessory:["gold wedding band","-"]}),1,"Under the Christmas tree with the snowplow driver."],
["fox","festivalntr","Lost in the crowd","nelson","Festival Night, Her Husband Lost in the Crowd","a dark shrine storehouse at dusk, festival lanterns glowing through the gaps in the wooden walls",
  "he wears a loose festival happi coat","a yukata pulled open off her shoulders, a fox mask on her head and her wedding band",
  "Let him search all night♡ I've found a real man!♡","Fireworks flash through the wall slats as she is held up and spread, her fox mask tilted, her husband calling her name faintly outside.",
  "shrine, storehouse, lantern, fireworks, night, yukata, fox mask, mask on head, wedding ring",W({top:["yukata pulled open off the shoulders","@c1"],ringAccessory:["gold wedding band","-"]}),2,"Held up in the shrine storehouse while her husband searches the crowd."],
["lovebird","renewal","Vow renewal","press","Their Wedding Vow Renewal, with the Best Man","a pastel chapel dressing room full of hearts and fairy lights",
  "he wears a pastel-pink tuxedo, white gloves","a full bridal look: a white veil, lace bridal corset and bra, sheer bridal skirt hiked up, garter, long white gloves and garter stockings",
  "I'm not renewing anything♡ I want to be your bride now!♡","Her renewal vows lie torn up on the floor among the petals, and hearts float everywhere.",
  "chapel, dressing room, heart, fairy lights, flower petals, torn paper, tuxedo, white gloves, wedding dress, bridal veil, bridal garter",W(BRIDE,{ringAccessory:["gold wedding band","-"]}),1,"At her vow renewal, asking to be the best man's bride."],
["flamingo","golf","His golf weekend","reverse","Her Husband's Golf Weekend, with the Pool Boy","a pink villa poolside at sunset, palm silhouettes, her husband's golf clubs leaning by the door",
  "he wears only wet swim trunks around his ankles","a pink string bikini pulled aside, a sun hat and her wedding band",
  "Golf is all he cares about♡ I only care about this!♡","She bounces on a lounger beside the pool, her husband's golf bag tipped over.",
  "poolside, pool, palm tree, sunset, lounge chair, golf club, bikini, swimsuit aside, sun hat, wedding ring",W({top:["bikini top pulled aside","@c1"],bottom:["bikini bottoms pulled aside","@c1"],ringAccessory:["gold wedding band","-"]}),3,"Riding the pool boy during her husband's golf weekend."],
["kraken","videocall","On camera","nelson","Video Call with Her Husband, from Another Man's Bed","a bedroom with a glowing aquarium wall, a tablet propped up showing her husband's shocked face",
  "he wears nothing but a black wristwatch","only black garter stockings and her wedding band",
  "Look, honey♡ This is what a real man does to me! Goodbye♡","She is spread toward the tablet so her husband sees everything, the cross-section showing how deep, her ringed hand waving goodbye at the screen.",
  "bedroom, aquarium, blue theme, tablet, video call, screen, waving, garter straps, wedding ring",{legwear:["lace garter stockings","black"],ringAccessory:["gold wedding band","-"]},0,"Spread in front of a video call with her husband."],
["salmon","nightshift","His night shift","prone","Her Husband Works the Night Shift","her minimalist riverside bedroom at night, her husband's work schedule pinned to the fridge visible through the door",
  "he wears nothing but a gold chain","an oversized t-shirt pushed up over her breasts, panties pulled down and her wedding band",
  "Work all the nights you want, honey♡ I'm busy being his!♡","She lies pinned in their marriage bed, drooling onto her husband's pillow, the clock on the nightstand reading 2:00 a.m.",
  "bedroom, night, bed, pillow, clock, t-shirt, drooling, wedding ring",W({top:["oversized t-shirt pushed up over her breasts","@c1"],ringAccessory:["gold wedding band","-"]}),1,"In their bed while her husband works the night shift."],
["crow","pawned","Pawned the ring","cowgirl","She Pawned Her Wedding Ring for This","a glittering high-roller hotel suite at night, the pawn ticket for her wedding ring on the nightstand",
  "he wears an open silk shirt and gold rings","a black lace slip pulled down off her breasts, garter stockings and a trinket choker, her ring finger bare",
  "I sold his ring♡ I don't need him, I need this!♡","The pawn ticket flutters off the nightstand as she bounces, a pile of casino chips scattered across the sheets.",
  "hotel room, night, city lights, pawn ticket, casino chips, lingerie, choker, garter straps, ringless",{legwear:["lace garter stockings","black"],panties:["lace panties pulled aside","black"]},0,"Riding him after pawning her wedding ring."],
["owl","asleep","He fell asleep reading","standing","Her Husband Fell Asleep Reading, Downstairs","between the shelves of her home library at night, a full moon in the tall window",
  "he wears a dark open bathrobe","a caramel cardigan unbuttoned over bare breasts, a skirt hiked up, round glasses and her wedding band",
  "Keep sleeping, honey♡ I'll be his all night!♡","Her long legs tremble as one is held high, books tumbling from the shelf, her glasses fogged.",
  "library, bookshelf, night, moonlight, falling books, round eyewear, fogged glasses, cardigan, wedding ring",W(HOME,{eyewear:["round glasses","@metal"]}),3,"In the home library while her husband sleeps in his chair."],
["rat","movingout","Moving out","prone","Moving Out of Her Husband's Place, into Yours","a cramped apartment full of half-packed boxes, a suitcase open on the bed",
  "he wears a tank top and jeans pulled down","an oversized t-shirt pushed up over her breasts and her wedding band, about to go in the trash",
  "I'm leaving him for you♡ I don't need anything of his anymore!♡","Her husband's things are piled in a box marked \"TRASH\", and she is pinned on the bed beside her half-packed suitcase.",
  "apartment, cardboard box, suitcase, bed, moving, t-shirt, text, wedding ring",W({top:["oversized t-shirt pushed up over her breasts","@c1"],ringAccessory:["gold wedding band","-"]}),2,"Pinned beside her suitcase as she leaves her husband."]
  ]);
})();

/* ---- v179: three humiliation sets in the headline style of v178 (a headline across the top, one big speech bubble, the
   outfit spelled out, the context selling it). All adult women; everything is consensual or an accident.
   "Academy Mortified"         public mishaps and wardrobe malfunctions in front of a faceless, laughing crowd. Lewd, not
                               explicit (underwear and slips are held back by the safeguard like any lewd item).
   "Academy Lost the Bet"      dares and punishments she agreed to when she lost a bet with friends: nudity, body writing,
                               silly costumes. Explicit (nudity), no sex.
   "Academy Degradation Play"  explicit, negotiated humiliation sex with a faceless man: she asked for it, wrote the rules or
                               picked the words herself, and the headline says so. Collars, body writing, begging.
   No partner is picked (no man in the first two; a faceless man in the third), so the girl gets the whole image. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),GX="Explicit (adult)",GH="Humiliation";
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  [["top","gala gown with a snapped strap, one breast popped out","L","glam,boudoir"],["bra","plain white bra","LS","casual"],["panties","bear-print panties","LS","casual,sweet"],
   ["panties","heart-print panties","LS","casual,sweet"],["panties","plain white cotton panties","LS","casual"],["bottom","running shorts split open at the seam","L","sporty,boudoir"],
   ["legwear","ballet tights split up the back","L","costume,boudoir"],["top","martial-arts gi flying open over bare breasts","L","costume,boudoir"],
   ["top","wet white shirt gone see-through","L","casual,boudoir"],["top","yukata sliding off to the floor","L","cultural,boudoir"],["top","thrifted dress falling apart at the seams","L","casual,boudoir"],
   ["top","blouse with every button popped open","L","preppy,boudoir"],["top","cocktail dress with the zipper burst open","L","glam,boudoir"],
   ["top","micro bikini two sizes too small","L","resort,boudoir"],["top","chest waders and nothing else","L","costume,boudoir"],["top","short tutu and nothing else","L","costume,boudoir"],
   ["neckAccessory","leather collar with a leash","L","boudoir,edgy"],["neckAccessory","dog collar with a name tag","L","boudoir,edgy"],["headwear","dog-ear headband","US","costume"],
   ["heldItem","handwritten sign","CU","casual"],["top","frilled apron pushed aside over bare breasts","L","cottage,boudoir"],["headwear","rhinestone tiara","CU","glam,costume"],
   ["top","short silk robe hanging open","L","boudoir"],["eyewear","round glasses","CU","preppy,casual"],["legwear","thigh-high stockings","LS","glam,boudoir"],
   ["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],["legwear","high heels","CUS","glam"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));

  const EX={mishap:["mortified, tearful, beet-red face with a wavy, trembling mouth","flustered, teary-eyed, full-face blush with steam rising off her head",
      "frozen in shock, wide-eyed, jaw dropped, blushing to her ears","humiliated, pouting, teary glare with a full-face blush"],
    bet:["humiliated, pouting, teary glare with a full-face blush","flustered, teary-eyed, full-face blush with steam rising off her head",
      "embarrassed, sheepish, crooked smile with a full-face blush","mortified, tearful, beet-red face with a wavy, trembling mouth"],
    sex:["humiliated, blissed-out, teary ahegao with her tongue out","shamefully aroused, teary, drooling, heart-eyed expression","pathetic, begging, teary-eyed face, cheeks flushed crimson",
      "flushed, eager, degraded smile with her tongue out"]};
  Object.values(EX).flat().forEach(v=>START.option("expression",v,GX));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};
  const SHY={blushStyle:"deep blush across the cheeks, nose and ears"};
  /* sex positions (%m% the man …) */
  const POS={
    hairpull:{pov:false,act:"sex, vaginal, sex from behind, hair pull",pose:"bending over with her head pulled back by the hair",
      text:"is bent over as %m% takes her from behind, one fist pulling her hair so her head tips back, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"bent over, sex from behind, hair pull, head back"},
    leash:{pov:true,act:"sex, vaginal, doggystyle, sex from behind, leash pull",pose:"kneeling on all fours, collar and leash pulled taut",
      text:"is on all fours as %m% fucks her doggystyle, pulling the leash on her collar taut so she arches back, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"all fours, doggystyle, sex from behind, collar, leash, leash pull, arched back"},
    oral:{pov:true,act:"fellatio, deepthroat, irrumatio",pose:"kneeling between his legs, his cock in her mouth",dir:"ab",
      text:"kneels between %m%'s legs, %his% giant, veiny, rock-hard %cock% stretching her lips as %he% holds her head and fucks her throat, drool and precum running down her chin onto her breasts",tags:"fellatio, deepthroat, irrumatio, kneeling, hand on another's head, drooling, saliva trail"},
    nelson:{pov:false,act:"sex, vaginal, full nelson, legs up",pose:"held up in a full nelson, legs spread wide",
      text:"is held up in a full nelson by %m%, legs spread wide and pinned, her whole body on display as %his% giant, veiny, rock-hard %cock% pumps into her vagina with motion lines",tags:"full nelson, legs up, spread legs, held up, presenting"},
    press:{pov:true,act:"sex, vaginal, mating press",pose:"lying folded in a mating press, legs pressed back",
      text:"lies folded in a mating press as %m% drives %his% giant, veiny, rock-hard %cock% straight down into her vagina with motion lines",tags:"mating press, legs up, folded, deep penetration"},
    cowgirl:{pov:true,act:"sex, vaginal, cowgirl position, girl on top",pose:"riding on top, facing the viewer",
      text:"rides %m% in the cowgirl position, bouncing on %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"cowgirl position, girl on top, straddling, bouncing breasts"},
    prone:{pov:true,act:"sex, vaginal, prone bone",pose:"lying face-down with her ass raised",
      text:"lies face-down with her ass raised as %m% pins her flat in a prone bone, %his% giant, veiny, rock-hard %cock% pounding into her vagina with motion lines",tags:"prone bone, lying, on stomach, ass up, pinned"},
    standing:{pov:false,act:"sex, vaginal, standing sex, leg lift",pose:"standing on one leg, the other lifted high",
      text:"stands on one leg with the other hoisted high by %m% as %he% fucks her standing, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"standing sex, leg lift, standing split"},
    missionary:{pov:true,act:"sex, vaginal, missionary",pose:"lying on her back with her legs spread wide",
      text:"lies on her back with her legs spread wide as %m% pounds into her in the missionary position, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"missionary, on back, spread legs"},
    lap:{pov:true,act:"sex, vaginal, upright straddle, sitting on lap",pose:"straddling the viewer's lap, arms around his neck",
      text:"straddles %m%'s lap face to face, grinding down onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"upright straddle, sitting on lap, straddling, face to face"},
    reverse:{pov:true,act:"sex, vaginal, reverse cowgirl position",pose:"riding in reverse, looking back over her shoulder",
      text:"rides %m% in the reverse cowgirl position, her ass slapping down onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"reverse cowgirl position, girl on top, ass, looking back"},
    table:{pov:true,act:"sex, vaginal, missionary, on table",pose:"lying back across a table, legs spread",
      text:"lies back across the table with her legs spread as %m% pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines",tags:"on table, missionary, spread legs"}};
  Object.values(POS).forEach(p=>START.option("posture",p.pose,GX));
  const fillM=(s,solo)=>s.replace(/%m%/g,solo?"the man":"{partner}").replace(/%his%/g,solo?"his":"{his}").replace(/%him%/g,solo?"him":"{him}").replace(/%he%/g,solo?"he":"{he}").replace(/%cock%/g,solo?"cock":"{cock}");
  const BOOM="cumming, orgasm, cross-section, x-ray, cum in pussy, cum overflow, motion lines, moaning, panting, blushing, sweat, trembling";
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";

  /* mishap / bet: [house, key, name, pose, headline, place, look, line, detail, tags, w1, ex, blurb]
     sex:          [house, key, name, pos,  headline, place, man, look, line, detail, tags, w1, ex, blurb] */
  function make(label,after,pre,oname,mode,list){
    const MANS=["he wears dark trousers, bare-chested","he wears nothing but a black wristwatch","he wears an open dress shirt and dark slacks","he wears unbuckled jeans, bare-chested"];
    if(mode==="sex")list.forEach((r,i)=>{if(r.length===13)r.splice(6,0,MANS[i%MANS.length])});
    START.add(label,list.map(r=>{
      const sex=mode==="sex";
      const [h,key,name,pk,head,place]=r,man=sex?r[6]:"",o=sex?7:6;
      const [look,line,detail,tags,w,exi,blurb]=r.slice(o);
      const exv=EX[mode][exi||0],art=/^[aeiou]/i.test(exv)?"an":"a";
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({},w||{});Object.keys(w1i).forEach(k=>{if(!w1i[k])delete w1i[k]});
      const res=items=>{const x={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);x[f]=b});return x};
      const P=sex?POS[pk]:null,pose=sex?P.pose:pk;
      if(!sex)START.option("posture",pose,mode==="bet"?GX:GH);
      const top=`A headline goes across the top of the image: "${head}". Setting: ${place}, blurry background, detailed foreground outlined in black. The woman wears ${look}.`;
      let body,tg,cnt;
      if(sex){
        body=s=>`${top} She ${fillM(P.text,s)}. ${fillM(detail,s)} She has ${art} ${exv}. A big speech bubble with hearts and flowery text comes from the girl: "${line}"; this is the humiliation she asked for, and she loves it. ${s?`The man is faceless, his head out of frame: ${man}, muscular, with a giant, veiny, rock-hard cock. `:`{Partner} is ${man.replace(/^he /,"")}. `}`;
        tg=dedupe(`humiliation, degradation, consensual, femsub, ${P.tags}, ${tags}, ${BOOM}, speech bubble, heart, spoken heart, english text, headline, black outline, blurry background`);
        cnt=P.pov?"1girl, 1boy, pov, faceless male, muscular male, hetero":"1girl, 1boy, faceless male, head out of frame, muscular male, hetero";
      }else{
        body=()=>`${top} She is ${pose}. ${detail} She has ${art} ${exv}. A big, wobbly speech bubble comes from the girl: "${line}".`;
        tg=dedupe(`humiliation, embarrassed, full-face blush, tears, nose blush, ${mode==="bet"?"punishment, dare, consensual, nude, ":"wardrobe malfunction, accident, "}${tags}, faceless crowd, speech bubble, english text, headline, black outline, blurry background`);
        cnt=mode==="bet"?"1girl, faceless, crowd":"1girl, faceless, crowd";
      }
      const c1=Object.assign({},sex?AROUSE:SHY,{expression:exv,posture:pose},sex?{pupilStyle:"heart pupils"}:{});
      /* a mishap is not explicit, but its text shows skin, so the pair is still held back for a girl-labeled design */
      const explicit=mode!=="mishap",held=true;
      return{id:pre+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit,lewdtag:true,must:MUST,
          pair:{id:"",outfit:"scene",solo:body(true)+" "+tg,soloCount:cnt,scene:(sex?body(false):body(true))+" "+tg,act:sex?P.act:"",dir:sex&&P.dir||"ba",explicit:held,penis:sex,
            c1,w1:{name:oname,look:"boudoir",f:w1i},w2:{name:oname,look:"boudoir",m:{},f:{}},compact:false,fit:true}},
        tags:["humiliation",mode==="sex"?"degradation":mode==="bet"?"dare":"mishap","headline","single scene",h].concat(explicit?["explicit"]:["lewd"]),
        blurb:`“${head}.” ${blurb} ${cap(h)}.`};
    }),{after});
    const bad=[];list.forEach(r=>{const w=r[mode==="sex"?11:10]||{};Object.entries(w).forEach(([f,a])=>{if(a&&!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(r[1]+": "+f+" “"+a[0]+"”")})});
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }

  /* ======================= Mortified (public mishaps, lewd) ======================= */
  make("Academy Mortified","Academy Stolen Wives","mo","Mortified","mishap",[
["griffin","gala","Accepting the award","standing at a podium, clutching a trophy and covering one breast with her arm","Accepting Her Award at the Charity Gala","a grand ballroom stage under a spotlight, crimson-and-gold banners and a packed audience of faceless guests",
  "a crimson gala gown whose strap has just snapped, one breast popped out, long gloves and heels","W-wait, don't look!! This isn't happening!!",
  "Camera flashes go off all across the audience as her strap snaps mid-speech; the trophy is in one hand and her other arm is too late to cover up, and her written speech flutters to the floor.",
  "stage, podium, spotlight, trophy, camera flash, audience, nip slip, strap slip, gown, elbow gloves",{top:["gala gown with a snapped strap, one breast popped out","@c1"],gloves:["long satin opera gloves","@c1"]},0,"Her strap snaps on stage mid-speech."],
["badger","bakeoff","Live on TV","sitting on the studio floor covered in cake, apron torn off","The Bake-Off Grand Final, Live on TV","a TV cooking studio under bright lights, cameras pointed at her and a faceless studio audience",
  "a torn sweater pulled half off, a plain white bra, a skirt flipped up over bear-print panties, and frosting everywhere","On live TV...?! Everyone's watching!!",
  "She tripped carrying her three-tier showstopper and it landed on her: frosting drips from her hair and enormous breasts, her skirt has flipped up, and the red ON AIR light glows above.",
  "tv studio, camera, on air, cake, frosting, food on body, sitting, skirt flip, panties, bra, studio lights",{bra:["plain white bra","white"],panties:["bear-print panties","@c1"]},1,"She trips with her showstopper on live TV."],
["raven","presentation","Wrong file","standing frozen beside a projector screen, laser pointer in hand","Her Big Quarterly Presentation","a corporate boardroom, a projector screen and a long table of faceless executives",
  "a navy blazer, white blouse, pencil skirt and tights","That's NOT the right file!! Please stop looking!!",
  "Instead of her chart, the projector shows a giant lewd mirror selfie she took for herself in lingerie, and every faceless executive at the table stares at it, then at her.",
  "boardroom, projector, screen, presentation, laser pointer, office lady, selfie, mirror selfie, lingerie, audience",{},2,"The projector shows the wrong photo."],
["serpent","runway","Broken heel","sprawling on a runway, one heel snapped, dress torn up the side","Fashion Week, Closing Walk","a fashion-week runway under white lights, rows of faceless photographers flashing",
  "an emerald couture gown torn up to the hip, a black lace thong and one broken stiletto","Stop taking pictures!! I am NOT crying!!",
  "Her heel snapped at the end of the runway and she went down hard, the gown splitting up to her hip; she props herself up on one arm, tears welling, while the flashes go off.",
  "runway, fashion show, photographer, camera flash, fallen, broken heel, torn dress, thong, panties",{panties:["lace thong","black"],legwear:["high heels","black"]},3,"Falls at the end of the runway, gown torn."],
["wolf","funrun","Split shorts","bending over at a starting line, hands on her split shorts","The Charity Fun Run, Mile 1","a city street lined with faceless cheering spectators, a finish banner in the distance",
  "a sports bra and running shorts split open up the back seam over plain white cotton panties","Why today of all days?! Don't film this!!",
  "She bent to tie her shoe and the seam of her shorts gave way with a loud RIIIP sound effect, and the spectators behind her point and laugh.",
  "running, marathon, street, crowd, spectators, pointing, laughing, sports bra, torn shorts, panties, sound effects",{bottom:["running shorts split open at the seam","@c1"],panties:["plain white cotton panties","white"]},1,"Her running shorts split at the start line."],
["swan","jete","Opening night","landing a leap on stage, hands flying to the split in her tights","Opening Night, Her First Solo","a grand theater stage under a single spotlight, red velvet seats packed with a faceless audience",
  "a white leotard and ballet tights split right up the back, ballet shoes","Th-the whole audience saw...!",
  "Her tights split from top to bottom mid grand jeté, and she lands frozen in the spotlight, the audience's opera glasses all raised.",
  "ballet, ballerina, stage, theater, spotlight, audience, opera glasses, leotard, torn pantyhose, pantyhose",{legwear:["ballet tights split up the back","white"]},2,"Her tights split mid-leap on opening night."],
["dragon","tournament","Tournament final","holding a high kick, her gi flown open","The Martial-Arts Tournament Final","a tournament arena with a crowd of faceless spectators and judges with scorecards",
  "a red martial-arts gi flying open over her bare breasts, no bra, a black belt and bare feet","I-I don't wear one when I fight!! Stop staring!!",
  "Her belt came loose on her winning kick and her gi flew wide open; the judges hold up scorecards reading 10, 10 and 10.",
  "martial arts, tournament, arena, kick, high kick, dougi, open clothes, no bra, judges, scorecard, crowd",{top:["martial-arts gi flying open over bare breasts","red"]},0,"Her gi flies open on the winning kick."],
["stag","ribbon","Garden show","holding her skirt down too late as the wind flips it up","The Garden Show Ribbon Ceremony","an outdoor garden show, flower beds and a crowd of faceless visitors, a gust of wind",
  "a forest-green sundress blown up over bear-print panties, a sun hat and a blue ribbon pinned to her chest","Not the bear panties!! Anything but the bear panties!!",
  "A gust blew her sundress straight up just as the photographer snapped the winner's picture, petals swirling everywhere.",
  "garden, flowers, wind, skirt flip, panties, ribbon, prize, sun hat, photographer, crowd",{panties:["bear-print panties","@c2"]},1,"The wind flips her dress at the ribbon ceremony."],
["shark","rescue","The rescue demo","rising out of the surf, arms clamped over her bare breasts","The Lifeguard Rescue Demonstration","a crowded beach, waves crashing, a faceless crowd of tourists watching",
  "red lifeguard swim bottoms and nothing on top, a whistle around her neck","My top's gone!! Somebody find my top!!",
  "Her bikini top floats away on a wave behind her as she wades out of the surf with the rescue dummy, the whole beach watching.",
  "beach, ocean, waves, lifeguard, whistle, topless, covering breasts, arm bra, wet, crowd, tourists",{},0,"Loses her top during a lifeguard demo."],
["penguin","iceskating","The ice gala","sitting in a split on the ice, skirt flipped up","The Winter Ice-Skating Gala","an outdoor ice rink at night, snow falling, fairy lights and a faceless crowd at the rail",
  "a black-and-white skating dress flipped up over plain white cotton panties, skates and mittens","I practiced this jump for months...!!",
  "She landed her big jump in a full split on the ice, her skirt up around her waist, snow drifting onto her freckled cheeks.",
  "ice rink, ice skating, figure skating, snow, snowing, night, fairy lights, splits, skirt flip, panties, crowd",{panties:["plain white cotton panties","white"]},2,"Lands her big jump in a split on the ice."],
["fox","festivaldance","The festival dance","standing frozen as her yukata slides to the floor","The Shrine Festival Dance","a shrine festival stage at night, lanterns and a faceless crowd",
  "a yukata sliding off to the floor around her ankles, white panties and nothing else, a fox mask on her head","My obi...! Who untied my obi?!",
  "Her obi came undone mid-dance and the whole yukata slid off her shoulders onto the stage, her fan held uselessly over her chest.",
  "festival, shrine, stage, lantern, night, yukata, undressing, obi, fox mask, folding fan, crowd",{top:["yukata sliding off to the floor","@c1"],panties:["plain white cotton panties","white"]},0,"Her yukata slides off during the festival dance."],
["lovebird","confession","The big confession","holding out a love letter, skirt flipped up by the wind","Her Big Public Love Confession","a crowded plaza fountain at noon, a faceless crowd stopping to watch",
  "a pastel sweater, a short skirt blown up over heart-print panties, and a love letter held out at arm's length","P-please accept my feelings... wait, why is everyone looking down?!",
  "The fountain's wind gust flips her skirt up mid-bow as she holds out her heart-sealed letter, and the crowd gasps.",
  "plaza, fountain, love letter, bowing, confession, wind, skirt flip, heart print, panties, crowd",{panties:["heart-print panties","@c1"]},3,"Her skirt flips mid-bow at her public confession."],
["flamingo","cannonball","The cannonball","standing waist-deep in the pool, searching for her bikini bottoms","The Rooftop Pool Party, Her Big Cannonball","a crowded pink rooftop pool party at sunset, palms and a faceless crowd with drinks",
  "a pink bikini top and nothing else, her bottoms floating away across the pool","Where are my bottoms?! Don't anybody get out of the pool!!",
  "Her bikini bottoms float away across the pool after her cannonball, drifting toward a crowd of partygoers with drinks.",
  "pool, pool party, rooftop, sunset, palm tree, bikini, bottomless, water, crowd",{top:["bikini top pulled aside","@c1"]},1,"Loses her bikini bottoms with a cannonball."],
["kraken","splash","Splash zone","standing dripping wet, shirt gone see-through","Hosting the Aquarium Show","an aquarium show stadium, a giant splash and a faceless audience in the front rows",
  "a soaked white staff shirt gone completely see-through, no bra, shorts and a headset microphone","The splash zone was supposed to be THEM!!",
  "The orca's splash drenched her instead of the front row, and her soaked white shirt now hides absolutely nothing while her headset broadcasts her squeak.",
  "aquarium, splash, wet, wet clothes, see-through, no bra, headset, staff, audience",{top:["wet white shirt gone see-through","white"]},2,"The orca splashes her instead of the audience."],
["salmon","karaoke","Office karaoke","clutching a microphone, dress zipper burst open","Office Karaoke Night, Her Big Ballad","a karaoke bar stage with colored lights and a faceless crowd of coworkers",
  "a cocktail dress with the zipper burst all the way open down her back, a plain white bra and panties","My zipper?! During the high note?!",
  "She hit the big high note and her zipper burst with a loud PING sound effect, the dress sagging open, coworkers covering their mouths.",
  "karaoke, stage, microphone, colored lights, singing, open dress, zipper, bra, panties, coworkers, crowd",{top:["cocktail dress with the zipper burst open","@c1"],bra:["plain white bra","white"],panties:["plain white cotton panties","white"]},0,"Her zipper bursts on the high note at office karaoke."],
["crow","magic","The magic trick","standing in only her underwear behind a table, holding a tablecloth","The Magic Show, the Tablecloth Trick","a small magic-show stage with a top hat and faceless audience",
  "a black bra and panties, a top hat, and her dress caught up in the tablecloth in her hands","Ta-da...? Wait, that's not what was supposed to come off!!",
  "She whipped the tablecloth away perfectly, but her dress was caught in it, and the dishes stay standing while she doesn't.",
  "magic, magician, stage, top hat, tablecloth, dishes, underwear only, bra, panties, audience",{bra:["lace bra","black"],panties:["lace panties","black"]},2,"Pulls off the tablecloth trick, and her own dress."],
["owl","library","Quiet hour","sitting frozen at a library table, buttons flying off her blouse","The Library's Quiet Reading Hour","a hushed library reading room at night, faceless readers looking up from their books",
  "a blouse with every button popped open over a plain white bra, a skirt, round glasses","...achoo! ...oh no. Oh no no no.",
  "One sneeze sent every button on her blouse flying across the reading room, pinging off lamps, and every reader looks up.",
  "library, reading room, night, sneezing, buttons, popped button, open shirt, bra, round eyewear, readers",{top:["blouse with every button popped open","@c1"],bra:["plain white bra","white"],eyewear:["round glasses","@metal"]},1,"Sneezes every button off her blouse in the library."],
["rat","thrift","Thrift-store catwalk","standing on a catwalk as her dress falls apart","The Thrift-Store Fashion Show","a cramped thrift store with a makeshift catwalk and a faceless crowd on folding chairs",
  "a thrifted dress falling apart at the seams, strips hanging off her, mismatched underwear","It was a dollar!! It was only a dollar!!",
  "Her one-dollar thrift dress disintegrates strip by strip with every step down the catwalk, moths fluttering out.",
  "thrift store, catwalk, folding chair, torn clothes, falling apart, moth, mismatched underwear, crowd",{top:["thrifted dress falling apart at the seams","@c1"],bra:["plain white bra","white"],panties:["bear-print panties","@c2"]},3,"Her thrift dress falls apart on the catwalk."]
  ]);

  /* ======================= Lost the Bet (dares she agreed to, nudity) ======================= */
  make("Academy Lost the Bet","Academy Mortified","lb","Lost the bet","bet",[
["griffin","topless","Topless waitress","carrying a tray of drinks, topless","Lost the Bet: Serve Drinks Topless at Game Night","a living room on game night, a TV showing the final score, faceless friends on the couch cheering",
  "only a short black skirt, heels and a waitress bow tie, topless","I can't believe I lost to YOU... here's your stupid drink!!",
  "The TV shows the final score of the game she bet on, and the friends raise their glasses as she serves them with her chin up and her face burning.",
  "living room, game night, tv, tray, drinks, topless, waitress, bow tie, friends, cheering",{},0,"Lost a bet on the game; serving drinks topless."],
["badger","apron","Apron only","grilling at a barbecue in nothing but an apron","Lost the Bet: Nothing but an Apron for the Barbecue","a backyard barbecue in the sun, faceless friends with drinks behind her",
  "a frilled apron and absolutely nothing else, her enormous breasts spilling around the bib","Stop laughing and eat your burgers!!",
  "Her bare backside faces her laughing friends as she flips burgers, smoke rising from the grill.",
  "backyard, barbecue, grill, burger, naked apron, ass, sideboob, friends, laughing",{top:["frilled apron pushed aside over bare breasts","@c1"]},2,"Lost a bet; manning the barbecue in only an apron."],
["raven","chess","Strip chess","sitting naked at a chessboard, one arm over her breasts","Lost the Chess Match: Strip Chess Rules","a candlelit study, a chessboard mid-game and her clothes piled beside it",
  "nothing at all, every piece of her clothing piled on the floor beside her captured pieces","Checkmate in... I didn't see that coming...",
  "Her clothes are piled up beside the captured chess pieces, one item per lost piece; she glares at the board, covering herself with one arm.",
  "chess, chessboard, chess piece, strip game, candle, completely nude, covering breasts, sitting",{},0,"Lost at strip chess."],
["serpent","sign","The sign","standing in a café holding a sign, in only lingerie","Lost to Her Rival: Must Hold the Sign for an Hour","a busy café patio, faceless customers staring",
  "black lace lingerie, heels and a handwritten sign that reads \"I'M A SORE LOSER\"","...It's only for an hour. I can survive an hour.",
  "Her proud face is bright red above the sign as a waiter offers her a coffee, and her rival's stopwatch ticks on the table.",
  "cafe, patio, sign, holding sign, english text, lingerie, stopwatch, customers, staring",{bra:["lace bra","black"],panties:["lace panties","black"],heldItem:["handwritten sign","-"]},3,"Holding the \"I'M A SORE LOSER\" sign in lingerie."],
["wolf","puppy","Puppy for a night","sitting up on her knees like a dog, paws raised","Lost the Arm-Wrestling Match: Puppy for the Night","a cabin living room by the fire, faceless friends laughing on the couch",
  "a dog collar with a name tag reading \"GOOD GIRL\", a dog-ear headband, and nothing else","Woof. ...I said it, now take the picture and let me get dressed.",
  "She sits up begging with her hands raised like paws, the arm-wrestling table behind her, her tough face scarlet.",
  "cabin, fireplace, collar, dog ears, fake animal ears, begging, paw pose, completely nude, friends, laughing",{neckAccessory:["dog collar with a name tag","@c1"],headwear:["dog-ear headband","@c2"]},1,"Lost at arm-wrestling; a puppy for the night."],
["swan","tutu","Tutu recital","performing an arabesque in only a tutu","Lost the Bet: Recital in Only Her Tutu","a studio recital for friends, a barre and mirror, faceless friends clapping",
  "a short tutu and nothing else, ballet shoes","Fine... but this counts as art.",
  "Her arabesque is flawless and her breasts are bare, the mirror behind her showing every angle.",
  "ballet, ballerina, tutu, arabesque, mirror, barre, topless, bottomless, friends, clapping",{top:["short tutu and nothing else","white"]},2,"Lost a bet; dancing in only her tutu."],
["dragon","spice","Victory lap","streaking across a yard, arms pumping","Lost the Spice Challenge: Naked Lap of the Yard","a backyard party at dusk, red lanterns and faceless friends whooping",
  "nothing but sneakers, her lips swollen from the hot sauce","I'm never eating a ghost pepper again!!",
  "She sprints across the lawn completely naked, the empty hot-sauce bottle behind her on the table.",
  "running, streaking, backyard, red lantern, dusk, hot sauce, completely nude, sneakers, friends, cheering",{},0,"Lost the spice challenge; a naked lap of the yard."],
["stag","dip","Skinny-dip dare","climbing out of a lake, covering herself","Lost Truth or Dare: Skinny-Dip in the Lake","a forest lake at dawn, faceless friends on the dock holding her clothes hostage",
  "nothing at all, lake water streaming off her","Give me back my clothes!! You said ONE dip!!",
  "Her friends hold up her clothes on the dock as she climbs out of the cold lake, arms wrapped over herself.",
  "lake, forest, dawn, dock, skinny dipping, wet, completely nude, covering, friends, holding clothes",{},3,"Lost at truth or dare; skinny-dipping."],
["shark","raceback","Swim back","standing in the shallows, arms over her bare body","Lost the Race: Swim Back Without Her Bikini","a beach at noon, faceless friends cheering from a boat",
  "nothing; her bikini hangs from the boat's mast like a flag","I'll win the rematch, and then YOU'RE swimming back naked!!",
  "Her bikini flies from the boat's mast as she wades ashore, sun glinting off her wet skin.",
  "beach, ocean, boat, mast, bikini, flag, wet, completely nude, friends, cheering",{},3,"Lost the race; swimming back without her bikini."],
["penguin","snowangel","Snow angel","lying in the snow making a snow angel, wearing only boots","Lost the Snowball Fight: Snow Angel in Only Boots","a snowy cabin yard, snow falling, faceless friends in parkas laughing",
  "only snow boots, a knit hat and mittens","It's s-s-so cold!! Take the picture already!!",
  "Her freckled body is pink with cold in the snow-angel shape, snowflakes catching in her long black hair.",
  "snow, snowing, winter, snow angel, lying, boots, beanie, mittens, completely nude, shivering, friends",{},1,"Lost the snowball fight; a snow angel in only boots."],
["fox","mahjong","Strip mahjong","sitting at a mahjong table, naked but for a fox mask","Lost at Mahjong: One Tile, One Piece","a tatami room, a mahjong table and faceless friends' hands holding tiles",
  "nothing but a fox mask pushed up on her head","That hand was rigged... I know it was rigged...",
  "Her kimono, obi and underwear lie piled next to her pile of losing tiles.",
  "mahjong, tatami, table, fox mask, mask on head, completely nude, sitting, pout, friends",{},0,"Lost at strip mahjong."],
["lovebird","diary","Diary reading","standing on a coffee table, reading her diary aloud, naked","Lost the Bet: Read Her Diary Out Loud, Naked","a pastel living room full of hearts, faceless friends gasping on the couch",
  "nothing at all, a heart-covered diary in her hands","\"Dear diary... today I dreamed about...\" I can't read this part!!",
  "Hearts and doodles cover the diary page she's reading from, and her friends cover their mouths.",
  "living room, heart, diary, reading, standing on table, completely nude, friends, gasping",{},1,"Reads her diary aloud, naked, after losing a bet."],
["flamingo","toosmall","Too small","adjusting a tiny bikini that barely covers anything","Lost the Bet: A Micro Bikini Two Sizes Too Small","a pink resort pool deck at sunset, faceless sunbathers staring",
  "a pink micro bikini two sizes too small, slipping everywhere","Everything's slipping out!! Who even sells this size?!",
  "Nipples and more peek out around the tiny triangles as she tries to tug them into place.",
  "pool, resort, sunset, micro bikini, wardrobe malfunction, nipple slip, staring, adjusting swimsuit",{top:["micro bikini two sizes too small","@c1"]},2,"Lost a bet; a micro bikini two sizes too small."],
["kraken","darts","The dartboard","standing against a wall with a dartboard drawn on her body","Lost at Darts: She's the Scoreboard Now","a dim pub back room, faceless friends with marker pens",
  "nothing but marker drawings: a dartboard circled around her breasts and tally marks on her thighs","Washable marker... you PROMISED washable marker!!",
  "Her friends' tally marks and scores cover her body, and someone is drawing a bullseye on her stomach.",
  "pub, darts, dartboard, body writing, marker, tally, completely nude, friends, standing",{},3,"Lost at darts; her body is the scoreboard."],
["salmon","waders","Waders only","holding up a tiny fish in only chest waders","Lost the Fishing Contest: Waders and Nothing Else","a riverbank at dawn, faceless friends holding up their huge catches",
  "chest waders and nothing else, her bare breasts spilling over the bib","Size isn't everything!!",
  "She holds up her tiny winning-loser fish while her friends' huge catches dangle behind her.",
  "river, riverbank, fishing, fish, holding fish, waders, topless, sideboob, friends",{top:["chest waders and nothing else","@dark"]},0,"Lost the fishing contest; waders only."],
["crow","shiny","Give back the shinies","sitting on the floor surrounded by trinkets, naked","Lost the Bet: Give Back Every Shiny Thing, Including Her Clothes","an attic full of curiosities, faceless friends collecting their trinkets",
  "nothing at all; even her sequined dress counted as shiny","My treasures... my dress... everything...",
  "Her friends carry away boxes of trinkets and her sequined dress, leaving her naked among the empty shelves.",
  "attic, trinket, shelf, boxes, completely nude, sitting, pout, friends",{},0,"Lost a bet; gave back every shiny thing, dress included."],
["owl","quiz","Quiz night","sitting on a pub table reading answers, naked","Lost Quiz Night: Read Out the Answers Naked","a pub quiz night, faceless teams at tables, a full moon in the window",
  "nothing but her round glasses, a quiz answer sheet in hand","Question twelve... the answer was 'Owl'... I got my own house wrong.",
  "Her answer sheet is covered in red crosses, and she reads them out naked on the table.",
  "pub, quiz, table, sitting on table, paper, round eyewear, completely nude, crowd",{eyewear:["round glasses","@metal"]},2,"Lost quiz night; reading the answers naked."],
["rat","pool","Racking naked","bending over a pool table, racking the balls, naked","Lost at Pool: Rack the Balls Naked All Night","a dive bar with a pool table, neon signs and faceless friends with cues",
  "nothing at all, a pool cue chalk in hand","I'll rack your balls... I mean... THE balls!! Stop laughing!!",
  "She leans over the pool table to rack, her bare ass to the room, under the neon beer sign.",
  "bar, pool table, billiards, neon lights, bending over, ass, completely nude, friends, laughing",{},1,"Lost at pool; racking the balls naked."]
  ]);

  /* ======================= Degradation Play (explicit, consensual) ======================= */
  make("Academy Degradation Play","Academy Lost the Bet","dp","Degraded","sex",[
["griffin","champion","Humble the champion","hairpull","The Proud Champion Asked to Be Humbled","a trophy room full of her gold trophies and banners",
  "he wears tracksuit trousers, bare-chested","only her gold medal around her neck and body writing she asked for: \"LOSER\" across her back",
  "Champion? No... I'm just your pathetic little toy♡ Harder♡","She is bent over her own trophy shelf, a trophy knocked over, her medal swinging.",
  "trophy, medal, shelf, body writing, english text, completely nude",{},0,"Bent over her own trophy shelf, asking to be humbled."],
["badger","maid","The begging maid","oral","Her Idea: A Maid Who Has to Beg for It","a sunny cottage kitchen, a bowl of honey on the counter",
  "he wears an open shirt and work trousers","a frilled apron pushed aside over her bare breasts, and honey drizzled down her chest by request",
  "Please, may this dirty little maid have more?♡","Honey and drool run together down her enormous breasts as she kneels on the tiles, hands clasped in begging.",
  "kitchen, honey, naked apron, kneeling, begging, own hands clasped, food on body",{top:["frilled apron pushed aside over bare breasts","@c1"]},2,"Begging as a dirty maid, her own idea."],
["raven","words","She chose the words","cowgirl","She Picked Every Word Herself","her bedroom under a skylight, a full-length mirror beside the bed",
  "nothing but body writing she chose: \"SLUT\" on her chest, \"USE ME\" on her stomach, tally marks on her thigh","Read them to me... every word... it's all true♡",
  "She watches herself in the mirror as she rides, reading her own body writing upside down.",
  "bedroom, mirror, reflection, body writing, english text, tally, completely nude",{},3,"Riding with body writing she chose herself."],
["serpent","heiress","Put in her place","leash","The Haughty Heiress Asked to Be Put in Her Place","her velvet-draped penthouse in emerald light, a silver tea set knocked over",
  "a leather collar with a leash, black garter stockings and nothing else","I'm not better than anyone... say it again♡ Make me say it♡",
  "Her silky platinum hair is a mess and her haughty composure is gone; the leash is wrapped around his fist.",
  "penthouse, tea set, collar, leash, garter straps, messy hair",{neckAccessory:["leather collar with a leash","black"],legwear:["lace garter stockings","black"]},1,"The heiress on a leash, as she asked."],
["wolf","alpha","Alpha no more","leash","Alpha No More: Her Request","a log cabin by the fire, a fur rug",
  "a dog collar with a tag reading \"GOOD GIRL\", a dog-ear headband, nothing else","Woof♡ Woof♡ I'm a good girl, please, more♡",
  "Her tough face is completely melted, tongue lolling, her dog ears askew on the fur rug.",
  "cabin, fireplace, fur rug, collar, dog ears, fake animal ears, tongue out, completely nude",{neckAccessory:["dog collar with a name tag","@c1"],headwear:["dog-ear headband","@c2"]},0,"Leashed on the fur rug; her request."],
["swan","prima","Ruin the prima","standing","The Prima Ballerina Wanted to Be Ruined","a ballet studio after hours, the mirror wall and barre",
  "a short tutu and nothing else, ballet shoes, \"PRIMA SLUT\" written on her thigh in lipstick at her request","Ruin me... ruin your perfect little ballerina♡",
  "Her perfect form shakes in the split, mascara running, her reflection repeating it all down the mirror wall.",
  "ballet, ballet studio, mirror, barre, tutu, body writing, lipstick, standing split",{top:["short tutu and nothing else","white"]},1,"Her request: the prima ballerina, ruined."],
["dragon","kneel","The warrior kneels","oral","The Warrior Asked to Kneel","a torchlit stone hall, her sword laid on the floor beside her",
  "he wears only leather trousers","only her red armor gauntlets, bare everywhere else",
  "A warrior... kneeling for you♡ Use my throat♡","She kneels with her sword laid down before her, gauntleted hands on her thighs, tears and drool streaming.",
  "stone hall, torch, sword, gauntlets, kneeling, tears, drooling",{},0,"The warrior kneels, at her request."],
["stag","tree","Tied to a tree","standing","Weekend Toy, Day 2 (Her Plan)","a forest clearing at dawn, soft ropes tied to a tree trunk",
  "soft red rope tied around her wrists to the tree above her, wildflowers in her hair, nothing else","Day two of my plan... I'm your toy until Sunday♡",
  "Her wrists are tied above her to a low branch with soft rope, her lifted leg trembling, her plan written on a note pinned to the tree.",
  "forest, tree, dawn, rope, bound wrists, arms up, wildflowers, note, completely nude",{},3,"Day two of her own weekend-toy plan."],
["shark","beg","She bet she wouldn't beg","cowgirl","She Bet She Wouldn't Beg. She Lost.","a beach house bedroom, the ocean glittering outside",
  "nothing but a shark-tooth necklace","I'm begging... I'm begging, okay?! Please let me cum♡",
  "Her confident smirk is long gone; she bounces desperately, hands clasped together in front of her face.",
  "beach house, ocean, necklace, begging, own hands clasped, completely nude",{},2,"She bet she wouldn't beg."],
["penguin","freeuse","Snowed-in toy","prone","Snowed In: She Asked to Be His Toy Until the Plow Comes","a snowed-in cabin by the fire, snow piling against the frosted window",
  "only thick white thigh-high socks and a sign she taped to her own back: \"PLAY WITH ME UNTIL THE SNOW MELTS\"","The snow can take forever♡ Keep using me♡",
  "Her freckled cheek is squashed against the quilt, snowflakes swirling past the window behind her.",
  "snow, cabin, fireplace, frosted window, sign, english text, thighhighs, completely nude",{legwear:["thigh-high socks","white"]},1,"Snowed in, his toy until the plow comes."],
["fox","tricked","Trick the trickster","lap","The Trickster Asked to Be Tricked","a tatami room with paper screens at dusk",
  "a yukata pulled open off her shoulders and a fox tail clipped to her obi","You got me... the trickster's just a dumb little fox now♡",
  "Her sly fox-like eyes are glazed and heart-shaped, her fox mask tossed on the tatami.",
  "tatami, shouji, dusk, yukata, fox tail, fox mask, heart-shaped pupils",{top:["yukata pulled open off the shoulders","@c1"]},3,"The trickster, tricked, as she asked."],
["lovebird","rating","Rate me","missionary","Her Fantasy: \"Rate Me Out of Ten\"","her pastel bedroom full of hearts, scorecards scattered on the bed",
  "only pink thigh-highs and scores written on her body in pink marker","Only a six?! I'll try harder, I promise♡",
  "Scores in pink marker cover her breasts and thighs, the latest reading '6/10', and she tries desperately to please.",
  "bedroom, heart, scorecard, body writing, english text, thighhighs, completely nude",{legwear:["thigh-high stockings","pink"]},2,"Her fantasy: being rated out of ten."],
["flamingo","princess","Spoiled princess","press","Spoiled Princess, Humbled (She Insisted)","a pink villa bedroom with silk sheets, shopping bags tipped over",
  "only a rhinestone tiara, slipping","Daddy's credit card can't help me now♡ I'm just your little fucktoy♡",
  "Her tiara slips sideways and shopping bags spill across the floor as she is folded in half.",
  "bedroom, silk sheets, shopping bag, tiara, completely nude",{headwear:["rhinestone tiara","-"]},0,"The spoiled princess, humbled at her insistence."],
["kraken","display","On display","nelson","Her Request: Put Her on Display","a dark bedroom lit by a glowing aquarium wall, a single spotlight on her",
  "only a sign hung around her neck reading \"ON DISPLAY\"","Look at me... look at how pathetic I am♡",
  "The spotlight shows every inch of her as she's held open, her sign swinging between her breasts.",
  "aquarium, blue theme, spotlight, sign, english text, presenting, spread legs, completely nude",{heldItem:["handwritten sign","-"]},1,"Held on display under a spotlight, her request."],
["salmon","plate","The chef's plate","table","Her Request: Be the Chef's Plate","a sushi bar counter after closing, sushi arranged on her body",
  "nothing but sushi arranged across her body by request","Itadakimasu... eat off me, then eat me up♡",
  "Nigiri and sashimi still sit on her breasts and stomach, a few sliding off, as she is taken on the counter.",
  "sushi, sushi bar, counter, nyotaimori, food on body, completely nude",{},3,"Her request: the chef's plate."],
["crow","trinket","Pretty trinket","reverse","She Asked to Be His Pretty Little Trinket","an attic full of glittering curiosities, keys and trinkets",
  "a collar with a dangling key charm and nothing else","Keep me on your shelf with the other shiny things♡",
  "Trinkets glitter on the shelves around her and the key charm on her collar bounces.",
  "attic, trinket, key, shelf, collar, charm, completely nude",{neckAccessory:["dog collar with a name tag","@metal"]},3,"His pretty trinket, her request."],
["owl","diary","Her own diary","prone","The Librarian Asked Him to Read Her Diary Aloud","her home library at night, a full moon in the window",
  "only round glasses, fogged","Don't skip the dirty parts... read every word♡",
  "Her open diary lies by her face full of her own filthy fantasies, and her glasses are fogged and crooked.",
  "library, night, moonlight, diary, book, round eyewear, fogged glasses, completely nude",{eyewear:["round glasses","@metal"]},1,"Her diary, read aloud, at her request."],
["rat","owned","Owned","prone","Scrappy and Proud, She Asked to Be Owned","her cramped apartment full of thrifted treasures and string lights",
  "a collar with a tag reading \"OWNED\" and nothing else","I'm yours, I'm owned♡ Say it, say I'm yours♡",
  "She is pinned on the lumpy couch, her collar tag clinking, a receipt she wrote herself taped to the wall: \"SOLD, to him, for free.\"",
  "apartment, couch, string lights, collar, tag, note, english text, completely nude",{neckAccessory:["dog collar with a name tag","@c1"]},2,"Owned, at her request."]
  ]);
})();

/* ---- v180: fifteen humiliation-fetish sets. The girls crave it: every scene shows the degradation and her arousal at once
   (tears on a flushed, drooling, heart-eyed face), and the headline frames it as her own kink, request
   or confession. Same style as v178/v179: a headline across the top, one big speech bubble, the outfit spelled out, black
   outline, blurry background; men are faceless and never the focus.
   Human Furniture · Free-Use Toy · Cum Receptacle · Pet Girls · Hucows · Body Writing · Self-Degradation · Bukkake · Spit ·
   Golden Showers · Brought Low · Cuckqueen · Orgasm Denial · Kink Club Stage · Fan Page
   Every girl brings her own room, her own pride (the heiress, the champion, the prima ballerina …) and her own pet name, so
   the same kink reads differently on each of them. Adult women, consensual, opt-in audiences only (her party, her club,
   her fans); no scat, no injury. Explicit, and held back by the safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),GX="Explicit (adult)";
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const HS=["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","lovebird","flamingo","kraken","salmon","crow","owl","rat"];
  /* each girl: her room, her pride, her pet name, her bathroom */
  const HD={
    griffin:["her trophy-lined captain's quarters, crimson-and-gold banners on the walls","the undefeated champion","Goldie","a marble bathroom with crimson-and-gold tiles"],
    badger:["her sunny cottage kitchen, honey jars on every shelf","the sweetest girl in the house","Honey","a cottage bathroom with a clawfoot tub and dried herbs"],
    raven:["her bedroom under a skylight full of stars","the cleverest woman in any room","Starling","a dark tiled bathroom under a skylight full of stars"],
    serpent:["her velvet-draped penthouse in emerald light","the haughty heiress","Duchess","an emerald marble penthouse bathroom with silver fixtures"],
    wolf:["a log cabin by the fire, a fur rug on the floor","the toughest alpha in the pack","Pup","a rough stone cabin shower, pines outside the window"],
    swan:["a white ballet studio with a mirror wall and a barre","the prima ballerina","Swanny","a pristine white bathroom with gauzy curtains"],
    dragon:["a red-lantern tower room with her swords on the wall","the fiercest warrior alive","Ember","a red-lantern bathhouse with a stone tub"],
    stag:["a forest cottage with ivy at the windows and dappled light","the gentle forest beauty","Fawn","a mossy outdoor stone bath in the forest"],
    shark:["a beach house with the ocean glittering outside","the cocky star athlete","Fin","a beach-house outdoor shower with sand on the boards"],
    penguin:["a snowed-in cabin by the fire, snow falling past the frosted window","the cheerful sweetheart","Pebble","a steamy cabin bathroom, snow piled against the frosted window"],
    fox:["a tatami room with paper screens at dusk","the untouchable trickster","Kit","a cedar onsen bath at dusk, lanterns glowing"],
    lovebird:["a pastel bedroom full of hearts and fairy lights","the hopeless romantic","Lovey","a pastel pink bathroom with heart-shaped tiles"],
    flamingo:["a pink villa by the pool, palm silhouettes at sunset","the spoiled princess","Princess","a pink villa bathroom with a gold tub"],
    kraken:["a bedroom lit by a glowing aquarium wall","the cool, mysterious beauty","Inky","a bathroom lit by a glowing aquarium wall"],
    salmon:["a minimalist riverside apartment with cherry-wood accents","the composed perfectionist","Koi","a minimalist cherry-wood bathroom with a river view"],
    crow:["an attic full of glittering trinkets and keys","the slick thief no one could ever catch","Magpie","a grimy attic bathroom with trinkets on the sill"],
    owl:["her book-lined library at night under a full moon","the brilliant scholar","Hoot","an old-fashioned bathroom at night, books stacked by the tub"],
    rat:["her cramped, cluttered apartment full of thrifted treasures","the scrappy survivor who answers to no one","Squeak","a cramped, grimy apartment bathroom with a cracked tub"]};
  /* v181: how she names herself in her own speech bubble ("I used to be the heiress"), first person */
  const ROLE={griffin:"the champion",badger:"the sweet one",raven:"the clever one",serpent:"the heiress",wolf:"the alpha",swan:"the prima ballerina",dragon:"the warrior",
    stag:"the gentle one",shark:"the star athlete",penguin:"the cheerful one",fox:"the trickster",lovebird:"the romantic",flamingo:"the princess",kraken:"the mysterious one",
    salmon:"the perfect one",crow:"the thief no one could catch",owl:"the scholar",rat:"the tough one"};
  const IT=[["neckAccessory","leather collar with a leash","L","boudoir,edgy"],["neckAccessory","dog collar with a name tag","L","boudoir,edgy"],["headwear","dog-ear headband","US","costume"],
    ["headwear","cat-ear headband","US","costume"],["tailPiece","tail butt plug","L","boudoir,costume"],["headwear","cow-ear headband","US","costume"],["neckAccessory","cowbell collar","L","costume,boudoir"],
    ["earAccessory","numbered yellow ear tag","US","costume"],["legwear","cow-print thigh-high stockings","S","costume,casual"],["panties","metal chastity belt","L","boudoir,edgy"],
    ["bra","leather chest harness with metal rings","L","boudoir"],["legwear","thigh-high stockings","LS","glam,boudoir"],["legwear","lace garter stockings","LS","boudoir"],
    ["headwear","paper crown that reads LOSER","US","costume"],["heldItem","handwritten sign","CU","casual"],["heldItem","smartphone","CU","casual"],["gloves","long satin opera gloves","CUS","glam"]];
  IT.forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const EXS=["humiliated, blissed-out, teary ahegao with her tongue out","shamefully aroused, teary, drooling, heart-eyed expression","pathetic, begging, teary-eyed face, cheeks flushed crimson",
    "flushed, eager, degraded smile with her tongue out","proud, beaming, degraded smile, cheeks flushed","blank, blissful, mindless stare, drooling"];
  EXS.forEach(v=>START.option("expression",v,GX));
  START.option("pupilStyle","heart pupils",GX);
  START.option("bustSize","enormous, heavy, swollen breasts",GX);START.option("nippleType","puffy, swollen, and leaking milk",GX);
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";
  const TAILS="humiliation, degradation, consensual, femsub, blush, tears, heart-shaped pupils, drooling, pussy juice, dripping, speech bubble, heart, spoken heart, english text, headline, black outline, blurry background";

  /* a theme: {label, pre, short, count, pose (string or fn i), act, penis, framing, head[], lines[], look(H,i), text(H,i), tags, w1(H,i), ex[]} */
  let after="Academy Degradation Play";
  function theme(T){
    const poses=new Set();
    HS.forEach((h,i)=>{const H={i};const p=typeof T.pose==="function"?T.pose(H):T.pose;START.option("posture",p,GX)});
    START.add(T.label,HS.map((h,i)=>{
      const [room,pride,pet,bath]=HD[h],role=ROLE[h],H={h,room,pride,role,ROLEW:role.replace(/^the /,"").toUpperCase(),Pride:pride.split(" ").map(w=>/^(in|the|of|to|no|and|a|an|any|at|on)$/.test(w)?w:cap(w)).join(" ").replace(/^./,c=>c.toUpperCase()),pet,bath,n:3+((i*7)%17),i};
      const sub=s=>String(s).replace(/\{(\w+)\}/g,(m,k)=>H[k]!==undefined?H[k]:m);
      const pose=typeof T.pose==="function"?T.pose(H):T.pose;poses.add(pose);
      const exv=EXS[(T.ex||[0,1,2,3,4,5])[i%(T.ex||[0,1,2,3,4,5]).length]],art=/^[aeiou]/i.test(exv)?"an":"a";
      const head=sub(T.head[i%T.head.length]),line=sub(T.lines[(i*5)%T.lines.length]);
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),TN=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=T.w1?T.w1(H):{};Object.keys(w1i).forEach(k=>{if(!w1i[k])delete w1i[k]});
      const res=items=>{const x={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],TN);if(b[3])b[3]=PAIR.toneOf(b[3],TN);x[f]=b});return x};
      const text=`A headline goes across the top of the image: "${head}". Setting: ${sub(T.place?T.place(H):room)}, blurry background, detailed foreground outlined in black. The woman wears ${sub(T.look(H))}. She ${sub(T.text(H))} She has ${art} ${exv}. A big speech bubble with hearts and flowery text comes from the girl: "${line}"; she is humiliated and loving every second of it. ${T.man?sub(T.man)+" ":""}`;
      const tg=dedupe(`${sub(T.tags)}, ${TAILS}`);
      const c1=Object.assign({},AROUSE,{expression:exv,posture:pose,pupilStyle:"heart pupils"},T.c1||{});
      const pname=sub(T.name?T.name(H):T.short);
      return{id:T.pre+h,base:ACAD.robes(h),name:head,c:Object.assign({age:"woman"},c1),
        outfit:{oname:T.short,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:T.framing||"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",outfit:"scene",solo:text+tg,soloCount:T.count,scene:text.replace(/\bthe man\b/g,"{partner}").replace(/\bThe man\b/g,"{Partner}")+tg,
            act:T.act||"",dir:T.dir||"ba",explicit:true,penis:!!T.penis,c1,w1:{name:T.short,look:"boudoir",f:w1i},w2:{name:T.short,look:"boudoir",m:{},f:{}},compact:false,fit:true}},
        tags:["humiliation","degradation","explicit","headline","single scene",h].concat(T.ttags||[]),
        blurb:`“${head}.” ${cap(h)}, ${pride}. ${T.blurb}`};
    }),{after});
    poses.forEach(p=>START.option("posture",p,GX));
    after=T.label;
  }
  const C=s=>s;   /* readability */
  /* v181: shared with hum181.js (the second round of themes) */
  ACAD.HUM={theme,HD,HS,EXS};

  /* 1. Human furniture */
  const FURN=[["coffee table","kneeling on all fours as a human coffee table","is on all fours, completely nude, serving as a coffee table: a glass tabletop is balanced on her bare back, holding drinks and a bowl of snacks, and faceless guests chat around her, setting their glasses down on her without ever looking at her. A little sign hanging from her collar reads \"TABLE\". Her thighs glisten and pussy juice drips onto the rug."],
    ["footrest","kneeling curled on the floor as a footrest","kneels curled up small on the floor as a footrest, completely nude, a faceless man's polished shoes resting on her bare back while he reads the newspaper above her, ignoring her completely. A little sign on her collar reads \"FOOTREST\". She is dripping wet onto the floorboards."],
    ["chair","kneeling on all fours as a human chair","is on all fours, completely nude, as a human chair, a faceless man sitting on her back with his coffee while he scrolls his phone. A little sign on her collar reads \"SEAT\". Her arms tremble under the weight, and pussy juice drips down her thighs."]];
  theme({label:"Academy Human Furniture",pre:"hf",short:"Human furniture",count:"1girl, faceless male, multiple others",
    name:H=>FURN[H.i%3][0],pose:H=>FURN[H.i%3][1],text:H=>FURN[H.i%3][2],
    head:["{Pride} Is the Furniture Tonight (Her Request)","She Begged to Be Treated Like a Coffee Table","Day {n}: Still Nobody Has Said Her Name","{Pride}, Demoted to Furniture","Her Kink: Being Ignored While Holding Your Drinks","She Asked Her Guests Not to Thank the Table"],
    lines:["Please don't look at me... furniture doesn't need attention♡","I'm just a table... use me, ignore me♡","My name? Furniture doesn't have a name♡","Set your drink down on me... I'm so wet...♡","Nobody's even looking at me... it's perfect♡","I used to be {role}... now I'm just a stool♡"],
    look:()=>"nothing but a collar with a little sign",tags:"human furniture, objectification, all fours, collar, sign, drinks, ignored, completely nude, faceless male",
    w1:()=>({neckAccessory:["dog collar with a name tag","@c1"]}),blurb:"Human furniture: a table, a footrest or a chair, ignored and soaking wet."});

  /* 2. Free-use toy */
  const FU=["bent over the arm of her couch","bent over her kitchen island","bent over a pool table"];
  theme({label:"Academy Free-Use Toy",pre:"fu",short:"Free-use toy",count:"1girl, multiple boys, faceless male",penis:true,act:"sex, vaginal, sex from behind, free use",
    pose:H=>"bending over with her legs spread, a sign on her back",
    head:["Her Party, Her Rules: Free Use All Night","She Hosted a Party Just to Be Used","Free Use Friday: Her Own Idea","Guest Count: {n}. Uses: Lost Count.","{Pride}'s Open House","She Made the Sign Herself"],
    lines:["Don't mind me, keep talking♡ Just use me♡","Next! Who's next?♡ I'm just a free-use toy♡","You don't have to ask... you never have to ask♡","Fill out the tally on my thigh when you're done♡","I'm the party favor♡ Take a turn♡","Please, nobody be gentle, I'm only a toy♡"],
    look:()=>"thigh-high stockings and a sign taped to her back reading \"FREE USE: NO NEED TO ASK\"",
    text:H=>`is ${FU[H.i%3]} at the party she's hosting, a faceless man fucking her from behind with his giant, veiny, rock-hard cock while he keeps chatting with the faceless guests around them, a drink in his other hand. Tally marks run down her thigh in marker, a tip jar labelled \"FOR THE TOY\" sits beside her, and cum overflows from her vagina with motion lines.`,
    tags:"free use, sex from behind, bent over, party, sign, tally, body writing, thighhighs, cum in pussy, cum overflow, motion lines, multiple boys, faceless male",
    w1:()=>({legwear:["thigh-high stockings","@c1"]}),blurb:"A free-use toy at her own party, ignored while she's used."});

  /* 3. Cum receptacle */
  theme({label:"Academy Cum Receptacle",pre:"cr",short:"Cum receptacle",count:"1girl, multiple boys, faceless male",penis:true,act:"cum in mouth, facial, open mouth",
    pose:"kneeling with her mouth wide open, a glass held under her chin",framing:"upper body",
    head:["She's Just a Cum Jar Tonight (Her Words)","Loads So Far: {n}","{Pride}, Reduced to a Cum Receptacle","Her Kink: Drinking Every Drop","She Labeled Herself","Last Call at the Cum Bar"],
    lines:["Fill me up... I'm just a cum jar♡","More... I'm still thirsty♡","Don't waste a single drop on the floor... I'll lick it up♡","Thank you... thank you for using my mouth♡","I'm not a person, I'm a cum bucket♡","Say 'ahh'... wait, that's my line♡"],
    look:()=>"nothing at all, \"CUM JAR\" written across her forehead and an arrow on her chest pointing to her mouth",
    text:()=>`kneels on the floor with her mouth wide open and her tongue out, holding a tall glass under her chin that's already half full of cum, a tally on the glass reading \"LOADS: {n}\", while faceless men's giant, veiny, rock-hard cocks surround her face and cum lands on her tongue, her cheeks and in her hair. Strings of cum hang from her lips and drip onto her breasts.`,
    tags:"cum in mouth, cum on tongue, facial, cum on hair, cum on breasts, glass, cum in container, open mouth, tongue out, kneeling, body writing, multiple penises, multiple boys, faceless male",
    blurb:"A living cum jar, tallying loads in a glass."});

  /* 4. Pet girls */
  const PET=[["dog","dog-ear headband","eating from a dog bowl on the floor","lapping at a dog bowl with her name on it","Woof♡"],["cat","cat-ear headband","drinking from a saucer on the floor","lapping milk from a saucer with her name on it","Nya♡"]];
  theme({label:"Academy Pet Girls",pre:"pg",short:"Pet girl",count:"1girl, 1boy, pov, faceless male",
    pose:H=>"crawling on all fours, "+PET[H.i%2][2],
    head:["Meet {pet}, Her Owner's Good Girl (Her Fantasy)","{Pride} Asked to Be Kept as a Pet","Feeding Time for {pet}","{pet} Hasn't Stood Up in Three Days (Her Idea)","She Picked the Name {pet} Herself","Walkies for {pet}"],
    lines:["Woof♡ {pet} is a good girl♡ Pat me?♡","Nya♡ Pets aren't allowed to talk... nya♡","Please, may {pet} have a treat?♡","{pet} finished her whole bowl♡ Good girl?♡","I'm not {role} anymore... I'm just {pet}♡","Walk me? Please walk me?♡"],
    look:H=>`a ${PET[H.i%2][0]}-ear headband, a collar with a name tag reading \"${H.pet.toUpperCase()}\", a tail butt plug, and nothing else`,
    text:H=>`crawls on all fours on the floor, completely nude, ${PET[H.i%2][3]}, \"${H.pet.toUpperCase()}\" painted on the side, her leash held taut by a faceless man's hand from the viewer's point of view. Her tail plug wags as she shakes her hips, she looks up at the viewer with pleading eyes and milk or food on her chin, and pussy juice drips onto the newspaper laid out under her.`,
    tags:"pet play, collar, leash, leash pull, all fours, crawling, dog bowl, pet bowl, animal ears, fake animal ears, tail, anal tail, butt plug, looking up, completely nude, newspaper, pov, faceless male",
    w1:H=>({headwear:[PET[H.i%2][1],"@c1"],neckAccessory:["dog collar with a name tag","@c1"],tailPiece:["tail butt plug","@c1"]}),blurb:"A pet girl with her own name, bowl and leash."});

  /* 5. Hucows */
  theme({label:"Academy Hucows",pre:"hc",short:"Hucow",count:"1girl, solo",
    pose:"kneeling on all fours in a stall, milking cups on her breasts",
    place:()=>"a barn stall with straw on the floor and a milk chart on the wall",
    head:["Hucow #0{n}: Morning Milking (She Signed Up)","{Pride}, Now Livestock","Today's Yield: {n} Liters","She Asked to Be Milked Like a Cow","Prize Cow of the County","Breeding Season at the {pet} Farm"],
    lines:["Moo♡ Moooo♡ Milk me more♡","I'm just a dumb milk cow now♡ Moo♡","Please... empty my udders♡","A good cow gives more milk♡ I'll be good♡","Moo... I mean... more, please♡","Don't call me {pet}♡ Call me cow♡"],
    look:()=>"a cow-ear headband, a cowbell collar, a numbered yellow ear tag, cow-print thigh-high stockings and nothing else",
    text:()=>`kneels on all fours in the straw, completely nude but for her cow outfit, her enormously swollen breasts hanging heavy and hooked up to a milking machine, the clear cups and tubes pumping white milk into a big glass jug that is nearly full. The chart on the wall tracks her daily yield with gold stars, her cowbell clanks with every pump, and milk sprays and drips from her nipples onto the straw.`,
    tags:"hucow, cow girl, cow ears, cowbell, ear tag, cow print, cow print thighhighs, milking machine, lactation, breast milk, huge breasts, hanging breasts, all fours, barn, straw, chart",
    w1:()=>({headwear:["cow-ear headband","white"],neckAccessory:["cowbell collar","@dark"],earAccessory:["numbered yellow ear tag","-"],legwear:["cow-print thigh-high stockings","white"]}),
    c1:{bustSize:"enormous, heavy, swollen breasts",nippleType:"puffy, swollen, and leaking milk"},blurb:"A hucow being milked in her stall."});

  /* 6. Body writing */
  theme({label:"Academy Body Writing",pre:"bw",short:"Body writing",count:"1girl, solo",
    pose:"standing before a mirror, writing on herself with a marker",
    head:["She Wrote Every Word Herself","Her Daily Ritual","{Pride}'s True Résumé","She Ran Out of Room on Her Body","Words She Wants to Be Called","Updated Daily: Her Body, Her Truth"],
    lines:["There's still room... write more on me♡","All of it's true♡ Every single word♡","Read me out loud♡ Please♡","This body isn't mine anymore... it's anybody's♡","Read my body♡ I'm not {role}, I'm a slut♡","I need a bigger marker♡"],
    look:()=>"nothing but marker writing covering her entire body",
    text:()=>`stands completely nude in front of a full-length mirror, uncapping a black marker with her teeth and writing on herself: \"CUM DUMP\" across her chest, \"FREE USE\" above her pussy with an arrow, \"3 HOLES\" on her stomach, \"RATE ME 1-10\" on her thigh, tally marks down both legs, and \"{ROLEW}?? NO, SLUT\" across her back in the mirror's reflection. Pussy juice runs down her thigh, smudging the tally marks.`,
    tags:"body writing, english text, marker, holding marker, mirror, reflection, tally, completely nude, arrow (symbol), standing",
    w1:()=>({}),blurb:"Covering herself in degrading words, in her own handwriting."});

  /* 7. Self-degradation */
  theme({label:"Academy Self-Degradation",pre:"sd",short:"Self-degradation",count:"1girl, 1boy, pov, faceless male",penis:true,act:"sex, vaginal, cowgirl position, girl on top",
    pose:"riding on top, a handwritten sign hung around her neck",
    head:["Her Confession, in Her Own Words","She Insisted on Saying It Out Loud","{Pride}'s Honest Self-Review","She Wrote the Sign Before He Even Arrived","Things She Only Says When She's Cumming","Her Favorite Insults Are the Ones She Says About Herself"],
    lines:["I'm a worthless, pathetic slut♡ Say it back to me♡","Me, {role}? No, I'm just a stupid hole♡","I don't deserve to cum... but please let me♡","Call me worse... I deserve worse♡","I'm nothing but a cock sleeve, I'm nothing♡","Look at me... how could anyone respect me?♡"],
    look:()=>"only a cardboard sign hung around her neck reading \"WORTHLESS SLUT\" in her own handwriting",
    text:()=>`rides a faceless man in the cowgirl position from the viewer's point of view, bouncing desperately on his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines, her handwritten \"WORTHLESS SLUT\" sign swinging between her bouncing breasts. She slaps her own cheek, tears streaming and cheeks crimson, grinning through the tears.`,
    tags:"running mascara, self-degradation, sign, sign around neck, english text, cowgirl position, girl on top, bouncing breasts, self-slap, tears, crying, pov, faceless male, motion lines, cum in pussy",
    w1:()=>({heldItem:["handwritten sign","-"]}),blurb:"Insulting herself with every bounce."});

  /* 8. Bukkake */
  theme({label:"Academy Bukkake",pre:"bk",short:"Bukkake",count:"1girl, 6+boys, faceless male",penis:true,act:"bukkake, facial, cum on body",framing:"upper body",
    pose:"kneeling in the middle of a circle of men, glazed in cum",
    head:["She Booked the Whole Circle Herself","Count: {n} and Still Begging","{Pride}, Glazed","Her Big Night: Finally a Bukkake","She Kept Her Eyes Open the Whole Time","She Asked for Seconds"],
    lines:["More♡ Cover me♡ I want to drown in it♡","Is that all of you? Go again♡","I can't see... don't stop♡","Every drop... I want every drop on me♡","Look how pretty {pet} is now♡","Thank you, thank you, thank you♡"],
    look:()=>"nothing at all, completely glazed in thick white cum",
    text:()=>`kneels in the middle of a circle of faceless men, their giant, veiny, rock-hard cocks pointed at her from every side as rope after rope of cum splashes across her face, her hair, her open mouth and her breasts. Her face is completely glazed and dripping, cum hangs from her eyelashes and her nose, her mascara runs black through it, and she smiles up through it all, tongue out and hands cupped under her chin to catch more. A tally in marker on her breast reads {n}.`,
    tags:"running mascara, bukkake, facial, cum on face, cum on hair, cum in mouth, cum on breasts, excessive cum, cum on eyelashes, cupping hands, kneeling, multiple penises, multiple boys, faceless male, tally, body writing",
    blurb:"Glazed in the middle of a circle she booked herself."});

  /* 9. Spit */
  theme({label:"Academy Spit",pre:"sp",short:"Spit",count:"1girl, 1boy, pov, faceless male",penis:true,act:"spitting, spit in mouth, open mouth",framing:"upper body",
    pose:"kneeling with her mouth open and tongue out, looking up",
    head:["She Says Thank You Every Time","{Pride} Opens Wide","Her Kink: Spit","She Asked Him Not to Be Polite","Lesson One: Say 'Please'","The Proudest Mouth in the House, Wide Open"],
    lines:["Thank you♡ Again, please♡","Please... spit in {pet}'s mouth♡","Ahh♡ Thank you... more♡","I'm your spittoon♡ Use me♡","I swallowed it all... was I good?♡","Don't wipe it off♡ Leave it♡"],
    look:()=>"nothing at all, her hands clasped behind her back",
    text:()=>`kneels in front of the viewer with her hands clasped behind her back, mouth wide open and tongue all the way out, looking up adoringly as a string of spit falls from out of frame onto her tongue. Spit glistens on her cheeks and chin, his giant, veiny, rock-hard cock rests heavy across her face, and saliva trails drip down onto her breasts.`,
    tags:"spitting, spit, saliva, saliva trail, spit on tongue, open mouth, tongue out, looking up, kneeling, arms behind back, penis on face, pov, faceless male",
    blurb:"Mouth open, thanking him for the spit."});

  /* 10. Golden showers */
  theme({label:"Academy Golden Showers",pre:"gs",short:"Golden shower",count:"1girl, 1boy, faceless male",penis:true,act:"peeing on another, golden shower, watersports",
    pose:"kneeling in a tub with her mouth open",place:H=>H.bath,
    head:["Her Favorite Kind of Shower","{Pride} Asked to Kneel in the Tub","She Said 'Please' First","Her Darkest Kink, Finally","She Doesn't Want a Towel","Bath Time for {pet}"],
    lines:["All over me♡ Please, all of it♡","I'm your toilet♡ I don't deserve better♡","Look at me, {role}, in a tub, begging for this♡","Warm... it's so warm♡ Don't stop♡","Thank you... I'm so dirty now♡","Aim for my mouth♡"],
    look:()=>"nothing at all, soaked",
    text:()=>`kneels in the tub, completely nude, with her mouth open and tongue out, eyes squeezed half shut in bliss as a golden stream of urine from a faceless man's giant, veiny cock out of frame splashes over her face, her open mouth and her breasts, running down her stomach and dripping off her nipples into the tub around her knees. Her hair is plastered to her soaked skin and she rubs it over her breasts with both hands.`,
    tags:"golden shower, peeing on another, urine, watersports, pee, peeing, bathtub, kneeling, open mouth, tongue out, wet, wet hair, hands on own breasts, faceless male, completely nude",
    blurb:"Kneeling in the tub for a golden shower."});

  /* 11. Brought low */
  theme({label:"Academy Brought Low",pre:"bl",short:"Brought low",count:"1girl, 1boy, pov, faceless male",penis:true,act:"shoe licking, foot worship, kneeling",
    pose:"kneeling with her face on the floor, licking a shoe",
    head:["{Pride}, Brought Low","Remember When She Was {Pride}?","The Fall of {Pride} (She Planned It)","{Pride} Licks Shoes Now","Her Crown Says It All","From {Pride} to Doormat"],
    lines:["I was {role}... now I'm just a doormat♡","Please let me clean your shoes with my tongue♡","Everything I was proud of... it's nothing♡","Say it... say I'm nothing♡","I'll lick them spotless♡ That's all I'm good for♡","Step on me... please♡"],
    look:()=>"only a paper crown that reads \"LOSER\", tilted on her head",
    text:()=>`kneels with her face down on the floor at the viewer's feet, ass in the air, licking the toe of a polished black shoe while her most prized possession, the thing that made her {pride}, lies broken or discarded beside her. Her paper \"LOSER\" crown slips over one eye, she looks up with her tongue still on the leather, and pussy juice drips down her thighs.`,
    tags:"shoe licking, licking, foot worship, kneeling, face down, ass up, top-down bottom-up, crown, paper crown, english text, looking up, pov, faceless male, shoes",
    w1:()=>({headwear:["paper crown that reads LOSER","-"]}),blurb:"Licking his shoes, her pride broken beside her."});

  /* 12. Cuckqueen */
  theme({label:"Academy Cuckqueen",pre:"cq",short:"Cuckqueen",count:"2girls, 1boy, cuckquean, faceless male, faceless female",penis:true,act:"female masturbation, vibrator, watching",
    pose:"kneeling in the corner with a vibrator, watching",
    head:["Her Boyfriend's Night With Another Woman (She Arranged It)","{Pride}, Made to Watch","Her Kink: Watching From the Corner","She Picked the Other Woman Herself","Anniversary Gift: She Watches","Not Even Invited to Her Own Bed"],
    lines:["She's so much prettier than me...♡","Can I at least watch? Please?♡","I'm just here to watch... I'm not good enough♡","Make her cum harder than you ever made me♡","I'll clean up after...♡","{pet} doesn't even get a turn♡"],
    look:()=>"only a collar, kneeling on the floor",
    text:()=>`kneels on the floor in the corner of her own bedroom, completely nude but for a collar, a vibrator buzzing between her legs, watching her boyfriend, a faceless man, fuck another woman, faceless and gorgeous, on the bed in the background, the other woman's legs wrapped around him. Tears roll down her flushed cheeks as she grinds on the vibrator, her eyes fixed on them, pussy juice pooling on the floor.`,
    tags:"cuckquean, netorare, watching, voyeurism, female masturbation, vibrator, sex toy, kneeling, corner, collar, tears, crying, background, sex, faceless male, faceless female, completely nude",
    w1:()=>({neckAccessory:["dog collar with a name tag","@c1"]}),blurb:"Made to watch her boyfriend with another woman, her own arrangement."});

  /* 13. Orgasm denial */
  theme({label:"Academy Orgasm Denial",pre:"od",short:"Orgasm denial",count:"1girl, 1boy, pov, faceless male",act:"orgasm denial, edging",
    pose:"lying tied spread-eagle on the bed, hips straining upward",
    head:["Day {n} Without Cumming (Her Challenge)","Edged {n} Times Today","{Pride} Has Never Begged Like This","She Gave Him the Key","Rule One: She Doesn't Cum","She Asked for 30 Days"],
    lines:["Please please please let me cum♡ I'll do anything♡","I'm so close... don't stop... why'd you stop?!♡","{pet} is begging you♡ Please♡","I'll be good... I'll be so good... please♡","I can't think... I just need to cum♡","Not yet? Not yet?! Please!!♡"],
    look:()=>"only a metal chastity belt unlocked for a moment, the key on a chain around the viewer's wrist, and her wrists tied to the bedposts",
    text:()=>`lies tied spread-eagle on the bed, completely nude, her hips straining upward after a buzzing wand vibrator that a faceless man's hand has just pulled away from her dripping pussy, from the viewer's point of view. A calendar on the wall has {n} days crossed off, her metal chastity belt lies open beside her, her thighs tremble violently, and a puddle of pussy juice soaks the sheets under her.`,
    tags:"orgasm denial, edging, chastity belt, wand, vibrator, sex toy, tied up, bound, spread eagle, bondage, rope, calendar, trembling, begging, pov, faceless male, completely nude",
    w1:()=>({panties:["metal chastity belt","@metal"]}),blurb:"Edged and denied, begging for permission."});

  /* 14. Kink club stage */
  theme({label:"Academy Kink Club Stage",pre:"kc",short:"Kink club stage",count:"1girl, faceless, crowd",act:"spanking, paddling",
    pose:"bending over a spanking bench under a spotlight",place:()=>"the stage of an underground kink club, a spotlight and an audience of masked, faceless members",
    head:["Amateur Night at the Club: {Pride}","She Signed Up for the Stage","Tonight's Display: {Pride}","Members Vote: Rate the Slut","Her First Time on the Stage","Auction Night: Lot #{n}"],
    lines:["Score me... please score me♡","Only a 4?! I'll try harder♡","Look at me... everyone, look at me♡","Spank me again, the back row can't see♡","I'm {pet}... and I'm your entertainment tonight♡","Please... rate my holes♡"],
    look:()=>"a leather chest harness with metal rings, garter stockings and nothing else",
    text:()=>`is bent over a padded spanking bench under the spotlight, her ass bright red with paddle marks, while the masked audience holds up scorecards reading 4, 7 and 9. A measuring stick beside her lists her measurements in chalk, an emcee's microphone stand stands at the edge of the stage, and pussy juice glistens down her thighs in the light.`,
    tags:"stage, spotlight, kink club, audience, crowd, masked, scorecard, spanking bench, bent over, red ass, spanked, paddle, harness, garter straps, chalkboard, english text",
    w1:()=>({bra:["leather chest harness with metal rings","black"],legwear:["lace garter stockings","black"]}),blurb:"Spanked and rated on the stage of a kink club."});

  /* 15. Fan page */
  theme({label:"Academy Fan Page",pre:"fp",short:"Fan page",count:"1girl, solo",
    pose:"kneeling on the bed taking a selfie with her phone",
    head:["Her Most Humiliating Post Yet","{Pride}'s Secret Fan Page","Going Live: {n},000 Watching","She Reads Every Comment","Her Fans Voted on This","Post #{n}: 'Rate Me Honestly'"],
    lines:["You all think I'm pathetic?♡ Say it more♡","Read the comments with me... they're so mean♡","{n},000 people watching me be a slut♡","Please, keep calling me names♡","Should I post the next one? Vote!♡","I'm not {role} here... here I'm just a slut♡"],
    look:()=>"nothing at all, cum still drying on her face and \"SLUT\" written on her forehead",
    text:()=>`kneels on her bed, completely nude, holding up her smartphone for a selfie, the phone's screen user interface overlaid on the image: a red \"LIVE\" badge, a viewer count, floating heart reactions, and a scrolling comment section full of insults like \"pathetic\", \"what a slut\" and \"post more\". She reads them with her free hand rubbing between her legs, cum drying on her cheek, and pussy juice drips onto the sheets.`,
    tags:"selfie, holding phone, smartphone, live streaming, user interface, comments, heart reactions, english text, body writing, cum on face, female masturbation, completely nude, kneeling, bed",
    w1:()=>({heldItem:["smartphone","-"]}),blurb:"Live on her fan page, reading the insults."});
})();

/* ---- v181: seventeen more humiliation-fetish sets, built with v180's theme builder (ACAD.HUM.theme): the same headline
   style, each girl's own room, pride and pet name, faceless men, consensual, held back by the safeguard.
   Bimbofication · Pony Girls · Property Tattoo · Condom Trophies · Bathroom Wall · Urinal Girl · Desperation (wetting
   herself on command) · Clearance Sale · Sploshing · Cum on Her Food · Eating off the Floor · Slave Contract ·
   Confession Booth · Mind Break · Toothbrush Maid · Foot Servant · Panty Gag */
(function(){
  if(!ACAD.HUM)return;
  const {theme}=ACAD.HUM,GX="Explicit (adult)";
  [["headwear","horse-ear headband with blinkers","US","costume"],["tailPiece","ponytail butt plug","L","boudoir,costume"],["neckAccessory","leather bridle harness with a bit gag","L","boudoir,edgy"],
   ["legwear","hoof boots","S","costume,boudoir"],["bra","leather chest harness with metal rings","L","boudoir"],["thighAccessory","garter belt hung with used condoms","L","boudoir"],
   ["legwear","lace garter stockings","LS","boudoir"],["legwear","thigh-high stockings","LS","glam,boudoir"],["neckAccessory","dog collar with a name tag","L","boudoir,edgy"],
   ["top","pink micro crop top that reads BIMBO","L","glam,boudoir"],["bottom","pink micro skirt","L","glam,boudoir"],["legwear","clear platform heels","S","glam,boudoir"],
   ["top","cocktail dress soaked dark at the crotch","L","glam,boudoir"],["top","french maid headdress and apron, nothing else","L","costume,boudoir"],
   ["headwear","french maid headdress","CU","costume"],["tailPiece","feather-duster butt plug","L","boudoir,costume"],["panties","her own soaked panties stuffed in her mouth","L","boudoir"],
   ["heldItem","fountain pen","CU","preppy"],["heldItem","toothbrush","CU","casual"],["heldItem","smartphone","CU","casual"],["neckAccessory","leather collar with a leash","L","boudoir,edgy"],
   ["top","silk blouse torn open over bare breasts","L","preppy,boudoir"],["legwear","high heels","CUS","glam"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  START.option("lipFinish","huge glossy bimbo lips",GX);
  START.option("bodyMarkings","a heart-and-wings womb tattoo glowing pink above her pussy",GX);
  const W=x=>()=>x;

  /* 1. Bimbofication */
  theme({label:"Academy Bimbofication",pre:"bb",short:"Bimbofied",count:"1girl, solo, before and after",
    pose:"posing with a vacant smile, twirling her hair",framing:"full body",
    head:["Week 1 vs. Week 6: {Pride} Is Gone","Before & After: She Asked for This","{Pride}, Bimbofied","Her Brain Cells: 0. Her Happiness: 100.","She Traded Her Mind for Lip Gloss","Remember {Pride}? Neither Does She"],
    lines:["Like... what's a book? ♡ Hehe♡","I used to be, like, {role}? That sounds so hard♡","Thinking is for, like, other girls♡","Um, my name? It's... uh... Bimbo?♡","I only think about cock now♡ It's so relaxing♡","Can you, like, spell it for me?♡"],
    look:()=>"a pink micro crop top that reads \"BIMBO\", a pink micro skirt, clear platform heels and huge glossy pink lips",
    text:()=>`is shown in a split before-and-after image: on the left, \"BEFORE\", she is {pride} in her old self, dressed as she used to be, sharp-eyed and composed; on the right, \"AFTER\", she poses with a vacant, giggling smile, twirling her hair, her lips huge and glossy, her eyes glazed, her breasts spilling out of a tiny crop top that reads \"BIMBO\", a lollipop in her mouth. Her old things are swapped for lip gloss, heels and a pink phone with a cracked case.`,
    tags:"bimbofication, before and after, split screen, comparison, bimbo, crop top, micro skirt, platform heels, lollipop, glossy lips, airhead, vacant eyes, twirling hair",
    w1:W({top:["pink micro crop top that reads BIMBO","pink"],bottom:["pink micro skirt","pink"],legwear:["clear platform heels","-"]}),
    c1:{lipFinish:"huge glossy bimbo lips"},ex:[3,5],blurb:"Before and after: her old self, and the bimbo she asked to become."});

  /* 2. Pony girls */
  theme({label:"Academy Pony Girls",pre:"pp",short:"Pony girl",count:"1girl, 1boy, faceless male",
    pose:"high-stepping in harness, pulling a cart",place:()=>"a kink club's private paddock with straw on the floor, a judging stand and faceless members",
    head:["Best in Show: {pet} the Pony","{Pride}, Now in Harness","Pony Trials: Lap {n}","She Asked to Be Broken In","Show Day for {pet}","Blue Ribbon or Bust"],
    lines:["Mmph♡ (Neigh♡)","Hmmph mm mmh!♡ (Ride me harder!♡)","Mmmh♡ (Am I a good pony?♡)","Hnn♡ (Whip me again♡)","Mmmph♡ (I'm not {role}, I'm a pony♡)","Mmh mmh♡ (Blue ribbon, please♡)"],
    look:()=>"a horse-ear headband with blinkers, a leather bridle harness with a bit gag in her mouth, a leather chest harness, hoof boots and a ponytail butt plug",
    text:()=>`high-steps across the paddock in full pony harness, her bit gag pulling her lips back and drool running down her chin, reins held taut by a faceless man riding in the little cart she is pulling behind her. A riding crop marks a red line across her ass, her ponytail plug sways with every step, and a judge's scorecard and ribbons wait on the stand.`,
    tags:"pony play, pony girl, bit gag, bridle, harness, blinkers, reins, horse ears, fake animal ears, tail, anal tail, butt plug, hoof boots, cart, riding crop, drooling, faceless male",
    w1:W({headwear:["horse-ear headband with blinkers","@c1"],neckAccessory:["leather bridle harness with a bit gag","black"],bra:["leather chest harness with metal rings","black"],legwear:["hoof boots","black"],tailPiece:["ponytail butt plug","@c1"]}),
    ex:[0,1,2],blurb:"A pony girl in full harness, pulling a cart."});

  /* 3. Property tattoo */
  theme({label:"Academy Property Tattoo",pre:"pt",short:"Property tattoo",count:"1girl, solo",
    pose:"lying back in a tattoo chair, legs spread",place:()=>"a tattoo studio, flash art on the walls and a mirror",
    head:["She Booked the Appointment Herself","Permanent: {Pride}'s New Ink","She Picked the Design From the 'Sluts' Page","Fresh Ink, Day 1","Her Lower Back Says It All","{pet}'s Favorite Tattoo"],
    lines:["Make it bigger♡ Everyone should see it♡","It's permanent♡ I'm permanently a slut♡","Does it look good? It means I'm owned♡","Now I can never be {role} again♡","Every man who sees it will know♡","One more... put one on my face next♡"],
    look:()=>"nothing at all, a freshly inked lewd womb tattoo glowing pink on her lower belly and \"OWNED\" written in looping script just above it",
    text:()=>`lies back in the tattoo chair with her legs spread, admiring a freshly inked lewd womb tattoo, a heart-and-wings design glowing pink just above her pussy, with \"OWNED\" in looping script above it, still glistening under clear wrap. She holds up a hand mirror to see it, the tattoo machine resting on the tray beside her, a faceless artist's gloved hand still pressed to her thigh, and she is dripping wet onto the chair.`,
    tags:"womb tattoo, pubic tattoo, tattoo, lewd tattoo, tattoo studio, hand mirror, holding mirror, english text, spread legs, completely nude, glowing",
    c1:{bodyMarkings:"a heart-and-wings womb tattoo glowing pink above her pussy"},ex:[3,4],blurb:"A permanent property tattoo, her own booking."});

  /* 4. Condom trophies */
  theme({label:"Academy Condom Trophies",pre:"ct",short:"Condom trophies",count:"1girl, solo",
    pose:"posing proudly, holding up her used condoms",
    head:["Her Haul: {n} Used Condoms","Trophies of Her Big Night","{Pride} Counts Her Medals","She Wears Every One","The Morning After, Proudly Displayed","Her Personal Best"],
    lines:["Look how many♡ I kept them all♡","Every one of these is a trophy♡","{n}... I want to beat my record♡","Should I drink them?♡","I'm going to wear them to breakfast♡","Count them with me♡"],
    look:()=>"a garter belt hung all the way around with used, knotted condoms full of cum, more hanging from her collar, and nothing else",
    text:()=>`poses proudly, completely nude, holding up a fistful of knotted used condoms full of cum like a bouquet, more of them dangling all the way around her garter belt and hanging from her collar like medals, swaying as she moves. Her body is covered in tally marks, her hair is a mess, cum dries on her chin, and one condom is held up to her lips.`,
    tags:"used condom, condom, condom on body, condom belt, holding condom, tally, body writing, garter belt, collar, completely nude, messy hair, cum on face",
    w1:W({thighAccessory:["garter belt hung with used condoms","@c1"],neckAccessory:["dog collar with a name tag","@c1"]}),ex:[4,3],blurb:"Wearing her night's used condoms like medals."});

  /* 5. Bathroom wall */
  theme({label:"Academy Bathroom Wall",pre:"bwl",short:"Bathroom wall",count:"1girl, 1boy, faceless male",penis:true,act:"sex, vaginal, sex from behind, against wall",
    pose:"bracing herself against a graffiti-covered stall wall",place:()=>"a cramped, graffiti-covered bar restroom stall",
    head:["She Wrote Her Own Number on the Wall","For a Good Time, Call {pet}","The Stall Door Tally: {n}","{Pride}'s Office Hours (Stall 3)","Her Number, Her Stall","The Men's Room Legend"],
    lines:["You called the number♡ Next!♡","Add a tally on the door when you leave♡","I wrote my name everywhere♡ Read it♡","Me... in a bathroom stall... I'm so wet♡","Don't lock the door♡ Leave it open♡","Who wrote 'slut' next to my number?♡ ...Me♡"],
    look:()=>"only thigh-high stockings, her panties hung on the coat hook",
    text:()=>`is bent against the graffiti-covered wall of a bar bathroom stall as a faceless man fucks her from behind, his giant, veiny, rock-hard cock buried to the hilt with motion lines. Right beside her face, in her own lipstick handwriting, the wall reads \"FOR A GOOD TIME CALL {pet} ♡\" with her phone number, and tally marks fill the stall door behind them, the newest one still being drawn.`,
    tags:"bathroom, toilet stall, graffiti, wall writing, english text, phone number, tally, against wall, sex from behind, thighhighs, panties on hook, faceless male, cum in pussy",
    w1:W({legwear:["thigh-high stockings","black"]}),ex:[0,1,3],blurb:"Her own number on the stall wall, and the tally on the door."});

  /* 6. Urinal girl */
  theme({label:"Academy Urinal Girl",pre:"ug",short:"Urinal girl",count:"1girl, 1boy, faceless male",penis:true,act:"peeing on another, golden shower, watersports",
    pose:"kneeling in a urinal trough with her mouth open",place:()=>"the restroom of an underground kink club, a long steel urinal trough under red light",
    head:["The Club's New Urinal (Her Application)","{Pride}, Installed in the Men's Room","She Asked to Be the Toilet for the Night","Out of Order? No. {pet} Is On Duty.","Restroom Attendant: {pet}","Night Shift in the Trough"],
    lines:["I'm your toilet♡ Use me♡","Please aim for my mouth♡","Don't flush me♡ I'm still thirsty♡","{pet} belongs in the urinal♡","Thank you♡ Next♡","I'm just plumbing now♡"],
    look:()=>"nothing but a collar with a tag that reads \"URINAL\"",
    text:()=>`kneels inside the long steel urinal trough, completely nude, her mouth wide open and tongue out as a faceless man's golden stream of urine splashes across her face, into her mouth and over her breasts. A urinal cake sits by her knee, a laminated sign above her reads \"PLEASE USE\", and she rubs the wetness over her breasts with both hands, soaked and blissful.`,
    tags:"human toilet, urinal, golden shower, peeing on another, urine, watersports, pee, restroom, kneeling, open mouth, tongue out, sign, english text, wet, collar, completely nude, faceless male",
    w1:W({neckAccessory:["dog collar with a name tag","@metal"]}),ex:[0,1,5],blurb:"The kink club's urinal, at her own request."});

  /* 7. Desperation (wetting herself, the piss replacement for pig play) */
  theme({label:"Academy Desperation",pre:"dz",short:"Desperation",count:"1girl, faceless, crowd",
    pose:"standing knock-kneed, wetting herself",
    place:()=>"an elegant candlelit dining room during a dinner party, faceless guests seated around the long table",
    head:["Rule: Not Until He Says So (Her Rule)","{Pride} Held It for Three Hours","She Asked to Be Made to Wait","Dinner Party Dare: No Bathroom Breaks","Hour {n}: She Couldn't Hold It","She Wanted Everyone to See"],
    lines:["I c-can't hold it anymore... I'm sorry... ahh♡","Everyone's watching... it won't stop...♡","Am I allowed to go now? ...too late♡","I wet myself in front of everyone♡","Don't look... no, please look♡","It feels so good to let go♡"],
    look:H=>"her elegant cocktail dress, now soaked dark from the crotch down, sheer stockings and high heels",
    text:()=>`stands knock-kneed beside the dinner table in her elegant cocktail dress, both hands pressed between her thighs too late, a dark wet stain spreading from her crotch down the dress as urine streams down her stockings and puddles around her heels on the floor. The faceless guests at the table stare, wine glasses frozen halfway to their lips, and her face is crimson, tears and bliss mixed together.`,
    tags:"omorashi, peeing self, wetting self, desperation, have to pee, knees together feet apart, hands between legs, urine, puddle, wet clothes, cocktail dress, pantyhose, high heels, crowd, staring, dinner party",
    w1:W({top:["cocktail dress soaked dark at the crotch","@c1"],legwear:["sheer stockings","black"]}),ex:[2,0,1],blurb:"Made to hold it, until she couldn't, in front of everyone."});

  /* 8. Clearance sale */
  theme({label:"Academy Clearance Sale",pre:"cs",short:"Clearance sale",count:"1girl, faceless, crowd",
    pose:"posing in a shop window, covered in price tags",place:()=>"a mock storefront window at a private party, faceless guests peering in",
    head:["Used Goods: 70% Off","Final Sale: {Pride}","{pet}, Gently Used","Everything Must Go (Including Her)","Clearance Rack: Slightly Worn Slut","Buy One, Get One... Wait, There's Only Her"],
    lines:["70% off♡ I'm so cheap♡","Used, but still works♡ Want to test me?♡","No returns, no refunds♡","I'm marked down to nothing♡","Make me an offer♡ Any offer♡","Price check on aisle me♡"],
    look:()=>"nothing but price tags: neon clearance stickers stuck all over her, \"USED\" across her chest and \"70% OFF\" on her ass",
    text:()=>`poses in the mock shop window, completely nude, covered in neon clearance stickers and dangling price tags: \"USED\" across her chest, \"70% OFF\" on her ass, \"AS IS\" on her thigh, \"FINAL SALE\" on her forehead, with the original price crossed out on her stomach. A \"CLEARANCE\" sign hangs in the window above her, and faceless guests press their faces to the glass.`,
    tags:"price tag, sticker, english text, body writing, shop window, display, clearance, sign, completely nude, posing, crowd, staring",
    ex:[4,3,1],blurb:"Marked down to 70% off in a mock shop window."});

  /* 9. Sploshing */
  theme({label:"Academy Sploshing",pre:"sl",short:"Sploshing",count:"1girl, solo",
    pose:"sitting in the middle of a smashed cake",
    head:["She Sat in Her Own Birthday Cake","{Pride}, Covered in Frosting","Pie Day: {n} Pies Thrown","Her Messiest Kink","Syrup, Whipped Cream and No Dignity","She Asked for the Biggest Cake"],
    lines:["More cream♡ Cover me♡","I'm a mess♡ I'm such a mess♡","Lick it off me... or don't, leave me sticky♡","I'm just dessert now♡","Throw another one♡ In my face♡","It's in my hair... everywhere♡"],
    look:()=>"nothing but whipped cream, frosting and syrup",
    text:()=>`sits in the middle of a giant smashed cake on the floor, completely nude, frosting squishing between her thighs, as a pie has just hit her square in the face. Whipped cream drips from her hair and breasts, chocolate syrup runs down her stomach, sprinkles stick to her nipples, and she licks cream from her fingers between laughing and crying.`,
    tags:"sploshing, food on body, cake, smashed cake, pie, pie in face, whipped cream, frosting, chocolate syrup, sprinkles, sitting, messy, completely nude, licking fingers",
    ex:[3,0,1],blurb:"Sitting in a smashed cake, pie in the face."});

  /* 10. Cum on her food */
  theme({label:"Academy Cum on Her Food",pre:"cf",short:"Cum on her food",count:"1girl, solo",
    pose:"sitting at a candlelit table, eating a cum-covered meal",
    head:["Tonight's Special: Chef's Sauce","She Asked for Extra Sauce","{Pride}'s Dinner Date","Five-Star Review","She Cleaned Her Plate","Dessert Is Served"],
    lines:["Mmm♡ The sauce is the best part♡","Can I have seconds?♡ Extra sauce♡","It's delicious... I'm disgusting♡","I eat this now♡ Every night♡","Compliments to the chef♡","I licked the plate clean♡"],
    look:()=>"an elegant evening gown pulled down to her waist, pearls and long gloves",
    text:()=>`sits at a candlelit dinner table set with fine china, eating a beautifully plated meal that is drizzled all over with thick white cum like a sauce, a string of it stretching from her fork to her lips. A menu card beside her plate reads \"CHEF'S SPECIAL: EXTRA SAUCE\", a wine glass full of cloudy cum waits at her elbow, and she licks the fork with relish.`,
    tags:"cum on food, eating, fork, plate, food, cum string, dining, candle, wine glass, menu, english text, evening gown, pearl necklace, elbow gloves, licking",
    w1:W({top:["silk blouse torn open over bare breasts","@c1"],gloves:["long satin opera gloves","@c1"]}),ex:[1,3,4],blurb:"A fine dinner with cum as the sauce."});

  /* 11. Eating off the floor */
  theme({label:"Academy Eating off the Floor",pre:"ef",short:"Eating off the floor",count:"1girl, 1boy, pov, faceless male",
    pose:"kneeling on all fours, eating off the floor",
    head:["Her Plate Belongs on the Floor","{Pride} Doesn't Get a Chair","Dinner Time, Floor Edition","She Asked Not to Use Her Hands","The Table Is for People","Hands Behind Her Back, Face in the Food"],
    lines:["Thank you for feeding me♡","I don't deserve a table♡","No hands♡ Watch me♡","Look at me, eating like an animal♡","It's the best meal I've ever had♡","More? Please, drop more♡"],
    look:()=>"only a collar, a cloth napkin tucked into it",
    text:()=>`kneels on all fours on the floor beside the dinner table, completely nude, her plate dumped upside down on the floorboards, eating straight off the floor with no hands, her hands clasped behind her back. Food smears her cheeks and chin, a napkin is tucked into her collar, a faceless man's shoe and table leg tower beside her from the viewer's point of view, and the chairs above are all taken.`,
    tags:"eating, food, floor, all fours, arms behind back, no hands, napkin, collar, messy eating, food on face, pov, faceless male, completely nude",
    w1:W({neckAccessory:["dog collar with a name tag","@c1"]}),ex:[2,1,5],blurb:"Eating off the floor beside the table, no hands."});

  /* 12. Slave contract */
  theme({label:"Academy Slave Contract",pre:"sc",short:"Slave contract",count:"1girl, solo",
    pose:"kneeling at a low table, signing a contract",
    head:["She Signed Without Reading It (She Read It Twice)","{Pride}'s Final Signature","Clause 4: She Will Beg","Her Own Terms, Signed in Lipstick","Contract #{n}: Lifetime","Sign Here, {pet}"],
    lines:["Where do I sign?♡ Everywhere?♡","Clause 4... I'll beg every day♡","I'm signing away {pet} forever♡","I added more clauses myself♡","Seal it with a kiss♡","No take-backs♡"],
    look:()=>"nothing but a collar and a lipstick-smudged mouth",
    text:()=>`kneels nude at a low table, signing her name with a fountain pen at the bottom of an ornate contract titled \"OWNERSHIP AGREEMENT\", the clauses visible above: \"1. She has no rights\", \"4. She will beg\", \"7. She will be used daily\". A fresh lipstick kiss print seals it beside her signature, and pussy juice drips onto the cushion under her.`,
    tags:"contract, paper, document, signing, writing, fountain pen, holding pen, english text, lipstick mark, kiss print, kneeling, collar, completely nude",
    w1:W({neckAccessory:["dog collar with a name tag","@c1"],heldItem:["fountain pen","-"]}),ex:[4,3,1],blurb:"Signing her ownership contract, sealed in lipstick."});

  /* 13. Confession booth */
  theme({label:"Academy Confession Booth",pre:"cb2",short:"Confession booth",count:"1girl, solo",
    pose:"kneeling in a confessional booth, confessing",place:()=>"a velvet confessional booth built as a set piece in a kink club, red light through the lattice screen",
    head:["Her Weekly Confession","{Pride}'s List of Sins: {n} Pages","She Confesses Everything","Forgive Me, I've Been a Slut","Penance: Counting Out Loud","Confession #{n}"],
    lines:["I've been such a slut... let me count the ways♡","Then I let {n} more... and then...♡","{pet} is a filthy, filthy girl♡","What's my penance? Please make it hard♡","I'm not sorry... I'm so not sorry♡","I wrote them all down so I wouldn't forget♡"],
    look:()=>"only a long sheer veil and thigh-high stockings",
    text:()=>`kneels in the velvet confessional booth with her hands clasped, completely nude under a sheer veil, reading her sins aloud from a long scroll of paper that unrolls across the floor, every line ticked. Through the lattice screen a faceless silhouette listens, a tally of her sins is chalked on the booth wall, and she rubs her thighs together, dripping onto the kneeler.`,
    tags:"confessional, booth, lattice, kneeling, own hands clasped, scroll, paper, list, tally, veil, thighhighs, silhouette, red light, completely nude",
    w1:W({headwear:["long sheer bridal veil","@c1"],legwear:["thigh-high stockings","black"]}),ex:[4,1,2],blurb:"Reading her list of sins in a kink-club confessional."});

  /* 14. Mind break */
  theme({label:"Academy Mind Break",pre:"mb",short:"Mind break",count:"1girl, 1boy, pov, faceless male",penis:true,act:"sex, vaginal, missionary, double v",
    pose:"lying on her back flashing a double peace sign",
    head:["Hour {n}. She Can't Remember Her Own Name.","{Pride}: Status: Broken","She Asked to Be Fucked Stupid","Ahegao Double Peace, Achieved","Who Was {Pride} Again?","Game Over for {pet}"],
    lines:["Hehe♡ Peace peace♡ Wha's my name?♡","Cock♡ Cock♡ Only cock♡","I don' remember bein' {role}♡","Brain... melted... ♡","Double peace♡ I'm so stupid now♡","More... more... more... ♡"],
    look:()=>"nothing but her tangled hair and body writing tally marks",
    text:()=>`lies on her back under a faceless man from the viewer's point of view, his giant, veiny, rock-hard cock buried deep in her vagina with motion lines, flashing a double peace sign with both hands beside her face. Her eyes are crossed and rolled up, her tongue lolls out drooling, heart shapes float in her pupils, tally marks cover her thighs, and cum overflows from her with every thrust.`,
    tags:"ahegao, double v, peace sign, mind break, cross-eyed, rolling eyes, tongue out, drooling, heart-shaped pupils, missionary, on back, tally, body writing, cum in pussy, cum overflow, pov, faceless male, completely nude",
    ex:[0,5],blurb:"Fucked stupid: ahegao double peace."});

  /* 15. Toothbrush maid */
  theme({label:"Academy Toothbrush Maid",pre:"tm",short:"Toothbrush maid",count:"1girl, 1boy, faceless male",
    pose:"kneeling on all fours, scrubbing the floor with a toothbrush",
    head:["The Floor Isn't Clean Enough Yet","{Pride}'s New Job: Scrubbing","She Asked for the Smallest Brush","Timer: {n} Minutes Left","Spotless or Punished","Maid Duty for {pet}"],
    lines:["I'll make it shine♡ Every tile♡","Is it clean enough yet?♡ Please inspect me♡","{pet} scrubs floors now♡","I missed a spot... punish me♡","Thank you for letting me clean♡","I'll lick it clean if the brush isn't enough♡"],
    look:()=>"only a french maid headdress and a feather-duster plug, a frilled apron tied over nothing",
    text:()=>`kneels on all fours on a shining floor, completely nude but for a french maid headdress and a frilled apron hanging open, scrubbing the grout with a tiny toothbrush beside a bucket of soapy water, a feather-duster plug sticking up from her ass. A kitchen timer ticks on the floor beside her, a faceless man's shoes stand right in front of her, and suds and pussy juice drip together onto the tiles.`,
    tags:"maid, maid headdress, naked apron, scrubbing, cleaning, toothbrush, bucket, soap bubbles, all fours, feather duster, butt plug, timer, faceless male",
    w1:W({headwear:["french maid headdress","white"],tailPiece:["feather-duster butt plug","@c1"],heldItem:["toothbrush","-"]}),ex:[2,4,1],blurb:"Scrubbing the floor naked with a toothbrush."});

  /* 16. Foot servant */
  theme({label:"Academy Foot Servant",pre:"fs",short:"Foot servant",count:"1girl, 1boy, pov, faceless male",act:"foot worship, licking foot, smelling",
    pose:"kneeling, pressing her face to a foot",
    head:["Her Favorite Place: Under His Feet","{Pride}, Foot Rest and Foot Licker","She Asked to Smell His Socks","After the Marathon: Her Job","Toe by Toe","She Begged for His Gym Shoes"],
    lines:["Mmh♡ They smell so good♡","Please let me lick between your toes♡","I belong down here♡","Your socks... can I keep them?♡","Every toe♡ I'll clean every toe♡","Press harder♡ On my face♡"],
    look:()=>"nothing but a collar, a sweaty sock dangling from her mouth",
    text:()=>`kneels on the floor with her face pressed against a faceless man's bare foot from the viewer's point of view, inhaling deeply with her eyes rolled back, her tongue out between his toes. His worn gym shoes sit beside her, one of his sweaty socks hangs from her lips, his other foot rests on top of her head, and she is dripping wet onto the floor.`,
    tags:"foot worship, licking foot, smelling, foot on head, feet, socks, sock in mouth, shoes, kneeling, tongue out, rolling eyes, pov, faceless male, completely nude, collar",
    w1:W({neckAccessory:["dog collar with a name tag","@c1"]}),ex:[1,5,2],blurb:"Worshipping feet with a sock between her lips."});

  /* 17. Panty gag */
  theme({label:"Academy Panty Gag",pre:"pgg",short:"Panty gag",count:"1girl, 1boy, pov, faceless male",penis:true,act:"sex, vaginal, doggystyle, sex from behind, gagged",
    pose:"kneeling on all fours, gagged with her own panties",
    head:["She Can Taste How Wet She Is","{Pride}, Silenced","Her Own Soaked Panties","She Asked to Be Shut Up","Gagged for Talking Back","Muffled: {pet}"],
    lines:["Mmmph♡ mmh♡","Mmh mmph mm!♡ (They're so wet!♡)","Hmmph♡ (Don't let me talk♡)","Mmmmh♡ ({pet} can't talk♡)","Mph♡ mph♡ mph♡","Mmmh mmh♡ (Harder♡)"],
    look:()=>"nothing but her own soaked panties stuffed in her mouth, a strip of tape across her lips, and thigh-high stockings",
    text:()=>`is on all fours with her own soaked lace panties stuffed into her mouth and a strip of tape across her lips, tears and drool leaking out around it, as a faceless man fucks her doggystyle from the viewer's point of view, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines. Her muffled moans fill a wobbly speech bubble, and her eyes roll back.`,
    tags:"panty gag, gag, gagged, improvised gag, tape gag, panties in mouth, all fours, doggystyle, sex from behind, drooling, tears, rolling eyes, thighhighs, pov, faceless male, cum in pussy",
    w1:W({panties:["her own soaked panties stuffed in her mouth","@c1"],legwear:["thigh-high stockings","black"]}),ex:[1,0,5],blurb:"Gagged with her own soaked panties."});
})();

/* ---- v182: five forbidden-but-not-family sets in the headline style (a headline across the top, one big speech bubble, the
   outfit spelled out, black outline, blurry background, a faceless man so the image is all her).
   Best Friend's Man · Power Plays · Strangers · Hate Sex · Forbidden Places
   Each set has six scenarios shared across the eighteen girls (three girls each), every girl in her own house colors with
   her own line. Adult women and adult men, all willing (she usually starts it). Explicit; held back by the safeguard like
   every explicit scene. Family is never part of the sex: "during the family dinner" means her boyfriend, with the family
   only a sound through the wall. */
(function(){
  if(!ACAD.HUM)return;
  const {HD,HS}=ACAD.HUM,GX="Explicit (adult)";
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const ACC={griffin:"crimson-and-gold accents",badger:"warm honey-gold light",raven:"deep blue twilight through the window",serpent:"moody emerald light",wolf:"a full moon through the window",
    swan:"soft pearly light",dragon:"red lantern light",stag:"dappled green light",shark:"ocean-blue light",penguin:"snow falling past the window",fox:"glowing paper-lantern light",
    lovebird:"pink fairy lights",flamingo:"pink sunset light",kraken:"shimmering blue light",salmon:"cherry-wood warmth",crow:"glinting trinkets on every surface",owl:"a single lamp and a full moon",rat:"string lights and thrifted clutter"};
  [["top","silk blouse torn open over bare breasts","L","preppy,boudoir"],["bottom","pencil skirt hiked up around the waist","L","preppy,boudoir"],["legwear","torn sheer tights","L","preppy,boudoir"],
   ["top","cocktail dress pulled down to the waist","L","glam,boudoir"],["legwear","high heels","CUS","glam"],["top","sports bra pulled up over her breasts","L","sporty,boudoir"],
   ["bottom","yoga pants pulled down to the thighs","L","sporty,boudoir"],["top","nurse scrubs top pulled up over her breasts","L","costume,boudoir"],["bottom","scrub pants pulled down","L","costume,boudoir"],
   ["top","black mourning dress pulled down to the waist","L","gothic,boudoir"],["maskAccessory","lace masquerade mask","CU","glam,costume"],["top","ball gown pulled down to the waist","L","glam,boudoir"],
   ["top","chef's jacket hanging open over bare breasts","L","costume,boudoir"],["top","bridesmaid dress pulled down to the waist","L","boudoir,glam"],["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],
   ["panties","lace panties pulled aside","L","boudoir"],["legwear","lace garter stockings","LS","boudoir"],["top","short silk robe hanging open","L","boudoir"],["eyewear","round glasses","CU","preppy,casual"],
   ["top","cardigan unbuttoned over bare breasts","L","casual,boudoir"],["bottom","skirt hiked up around the waist","L","casual,boudoir"],["top","flight-crew blouse unbuttoned","L","costume,boudoir"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};
  const EXF={guilty:"guilty, thrilled, flushed expression, biting her lip",hate:"furious, flushed glare melting into pleasure",heart:"breathless, heart-eyed, guilty smile",
    dazed:"dazed, overwhelmed, drooling expression",smug:"smug, triumphant, lustful smirk",shock:"shocked, flushed, delighted expression"};
  Object.values(EXF).forEach(v=>START.option("expression",v,GX));
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";
  const COUNT={pov:"1girl, 1boy, pov, faceless male, muscular male, hetero",far:"1girl, 1boy, faceless male, head out of frame, muscular male, hetero"};
  const BOOM="motion lines, cum in pussy, cum overflow, cumming, orgasm, moaning, panting, blushing, sweat, speech bubble, heart, spoken heart, english text, headline, black outline, blurry background";
  let after="Academy Panty Gag";
  /* a scenario: {key, name, head, place, look, pose, act, pov, text, lines[3], tags, w1, ex} ; %M% = the man */
  function set(label,pre,TAG,scen,afterLabel){
    if(afterLabel)after=afterLabel;
    scen.forEach(s=>START.option("posture",s.pose,GX));
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],k=(i/scen.length|0)%s.lines.length,[room,pride,pet]=HD[h];
      const sub=x=>String(x).replace(/\{pet\}/g,pet).replace(/\{acc\}/g,ACC[h]).replace(/\{room\}/g,room);
      const exv=EXF[s.ex],art=/^[aeiou]/i.test(exv)?"an":"a",line=sub(s.lines[k]);
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({},s.w1||{});Object.keys(w1i).forEach(x=>{if(!w1i[x])delete w1i[x]});
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const body=solo=>{const M=solo?"the man":"{partner}",his=solo?"his":"{his}",he=solo?"he":"{he}",cock=solo?"cock":"{cock}";
        const f=x=>sub(x).replace(/%M%/g,M).replace(/%his%/g,his).replace(/%he%/g,he).replace(/%cock%/g,cock);
        return`A headline goes across the top of the image: "${sub(s.head)}". Setting: ${f(s.place)}, ${ACC[h]}, blurry background, detailed foreground outlined in black. The woman wears ${f(s.look)}. She ${f(s.text)} She has ${art} ${exv}. A big speech bubble with hearts and flowery text comes from the girl: "${line}". `+
          (solo?(s.pov?"Seen from the man's point of view (pov), only his muscular body, strong hands and giant, veiny, rock-hard cock are visible; his face is never shown. ":"The man is faceless, his head out of frame, muscular, with a giant, veiny, rock-hard cock. "):"");};
      const tg=dedupe(`${TAG}, ${s.tags}, ${BOOM}`);
      const c1=Object.assign({},AROUSE,{expression:exv,posture:s.pose});
      return{id:pre+h,base:ACAD.robes(h),name:sub(s.head),c:Object.assign({age:"woman"},c1),
        outfit:{oname:s.name,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:s.pov?"cowboy shot":"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",outfit:"scene",solo:body(true)+tg,soloCount:s.pov?COUNT.pov:COUNT.far,scene:body(false)+tg,act:s.act,dir:"ba",explicit:true,penis:true,
            c1,w1:{name:s.name,look:"boudoir",f:w1i},w2:{name:s.name,look:"boudoir",m:{},f:{}},compact:false,fit:true}},
        tags:["forbidden","explicit","sex","faceless male","headline","single scene",h,s.key],
        blurb:`“${sub(s.head)}.” ${cap(h)}: ${s.name}. The man is faceless, so it's all about her.`};
    }),{after});
    after=label;
  }
  const PARTY={top:["cocktail dress pulled down to the waist","@c1"],legwear:["high heels","@dark"],panties:["lace panties pulled aside","@c2"]};
  const OFFICE={top:["silk blouse torn open over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@dark"],legwear:["torn sheer tights","black"]};

  /* ======================= Best Friend's Man ======================= */
  set("Academy Best Friend's Man","bf","cheating (relationship), infidelity, best friend's boyfriend, affair",[
{key:"birthday",name:"Her birthday party",head:"Her Best Friend's Birthday Party, with Her Best Friend's Boyfriend",place:"the upstairs bathroom during her best friend's birthday party, music thumping through the floor",
  look:"a party dress pulled down to her waist, heels, lace panties pulled aside and a party hat askew",pose:"sitting on a bathroom counter, legs wrapped around her lover",act:"sex, vaginal, sitting on counter, legs around waist",pov:true,
  text:"sits on the bathroom counter with her legs wrapped around %M%, her best friend's boyfriend, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, a slice of birthday cake on the sink and \"Happy Birthday\" being sung downstairs.",
  lines:["She's blowing out the candles... make me cum first♡","Happy birthday, bestie... I'm so sorry♡","Shh! They're singing... don't stop♡"],tags:"bathroom, counter, sitting on counter, legs around waist, birthday, party hat, cake, cocktail dress",w1:PARTY,ex:"guilty"},
{key:"sleepover",name:"The sleepover",head:"Girls' Sleepover, While She Sleeps Upstairs",place:"her best friend's living room at 3 a.m., a blanket fort and empty wine glasses on the floor",
  look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",pose:"riding on top on a couch, a hand over her own mouth",act:"sex, vaginal, cowgirl position, girl on top",pov:true,
  text:"rides %M%, her best friend's husband, on the living-room couch, one hand clamped over her own mouth, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the stairs to her sleeping best friend's room right behind them.",
  lines:["Mmh♡ If she wakes up... I don't care, harder♡","She's my best friend... and you're mine tonight♡","Quiet... she's right upstairs♡"],tags:"living room, couch, night, wine glass, cowgirl position, girl on top, hand over own mouth, t-shirt, panties aside",
  w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"heart"},
{key:"maidofhonor",name:"Maid of honor",head:"Maid of Honor, Ten Minutes Before the Vows, with the Groom",place:"the groom's dressing room at her best friend's wedding, a bouquet and boutonniere on the table",
  look:"her bridesmaid dress pulled down to her waist, heels and a flower in her hair",pose:"bending over a dressing table, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the dressing table as %M%, the groom in his half-buttoned tuxedo, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the wedding march warming up through the door.",
  lines:["Ten minutes... make it count♡","She's my best friend... I'm the worst maid of honor ever♡","You're getting married... finish inside me first♡"],tags:"dressing room, wedding, bridesmaid, tuxedo, groom, bouquet, bent over, sex from behind, looking back",
  w1:{top:["bridesmaid dress pulled down to the waist","@c1"],legwear:["high heels","@dark"]},ex:"guilty"},
{key:"girlstrip",name:"Girls' trip",head:"Girls' Trip, While She's in the Shower",place:"a hotel suite, the shower running behind a frosted bathroom door with her best friend's silhouette inside",
  look:"a hotel robe hanging open and nothing else",pose:"lying on her back with her legs spread wide",act:"sex, vaginal, missionary",pov:true,
  text:"lies on her back on the hotel bed with her legs spread wide as %M%, her best friend's boyfriend who tagged along, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her best friend's silhouette singing in the shower behind the frosted glass.",
  lines:["She'll be out any second♡ Faster♡","Shh... I can hear her singing♡","She thinks you went for ice...♡"],tags:"hotel room, bed, missionary, on back, spread legs, frosted glass, shower, silhouette, open robe",
  w1:{top:["short silk robe hanging open","white"]},ex:"heart"},
{key:"ringshop",name:"Ring shopping",head:"Helping Him Pick Her Best Friend's Engagement Ring",place:"the back room of a glittering jewelry store, velvet trays of rings scattered on the counter",
  look:"a sundress pulled down to her waist and lace panties pulled aside",pose:"lying back on a glass counter, legs spread",act:"sex, vaginal, missionary, on table",pov:true,
  text:"lies back on the glass jewelry counter with her legs spread as %M%, her best friend's boyfriend, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the ring box he picked for her best friend open beside her head.",
  lines:["She'll say yes♡ ...and so will I♡","Pick the big one... for her... and me♡","She's going to love it... I love this♡"],tags:"jewelry store, ring, ring box, engagement ring, display case, on table, missionary, spread legs",
  w1:{top:["cocktail dress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"smug"},
{key:"gamenight",name:"Game night",head:"Game Night at Her Best Friend's, Under the Table",place:"her best friend's dining room on game night, a board game mid-play, everyone's legs visible under the table",
  look:"a cardigan unbuttoned over her bare breasts and a skirt hiked up",pose:"kneeling under a table, his cock in her mouth",act:"fellatio, under table, hidden",pov:true,
  text:"kneels under the game-night table, hidden by the tablecloth, sucking %M%, her best friend's husband, %his% giant, veiny, rock-hard %cock% stretching her lips, the dice and everyone's feet around her and her best friend's voice asking \"Whose turn is it?\".",
  lines:["Mmh♡ ...it's your turn♡","Don't let her see... mmh♡","Roll the dice... I'll keep going♡"],tags:"under table, tablecloth, hidden, fellatio, kneeling, board game, dice, open cardigan, saliva",
  w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},ex:"guilty"}]);

  /* ======================= Power Plays ======================= */
  set("Academy Power Plays","pw","power play, office, affair",[
{key:"ceo",name:"The CEO",head:"Her First Week as the CEO's Intern",place:"a glass-walled corner office at night, the city skyline beyond",look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",
  pose:"lying back across an executive desk, legs spread",act:"sex, vaginal, missionary, on desk",pov:true,
  text:"lies back across the CEO's glass desk with her legs spread and her visitor's badge still clipped to her blouse as %M% pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, a contract and a fountain pen scattered under her.",
  lines:["Is this... what the internship includes?♡","I'll work late every night♡","Promote me... harder♡"],tags:"office, desk, on desk, skyline, night, office lady, badge, pencil skirt, torn pantyhose, missionary",w1:OFFICE,ex:"heart"},
{key:"landlord",name:"The landlord",head:"Rent Was Due. She Had a Better Idea.",place:"{room}",look:"a short silk robe hanging open and nothing else",
  pose:"kneeling on all fours, looking back over her shoulder",act:"sex, vaginal, doggystyle, sex from behind",pov:true,
  text:"is on all fours as %M%, her landlord, fucks her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, an overdue rent notice crumpled on the floor beside her.",
  lines:["Consider this month paid♡","And next month... and the one after♡","Raise my rent... I'll pay♡"],tags:"all fours, doggystyle, sex from behind, looking back, paper, notice, open robe",w1:{top:["short silk robe hanging open","@c1"]},ex:"smug"},
{key:"trainer",name:"The trainer",head:"Her Personal Trainer Said 'One More Rep'",place:"a private gym after hours, mirrors and weight racks",look:"a sports bra pulled up over her breasts and yoga pants pulled down to her thighs",
  pose:"bending over a weight bench, sweaty",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over a weight bench, slick with sweat, as %M%, her personal trainer, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her reflection repeated down the mirror wall.",
  lines:["One more rep♡ And another♡","Is this... cardio?♡","Count my reps... out loud♡"],tags:"gym, mirror, weight bench, sportswear, sports bra, yoga pants, sweat, bent over, sex from behind",
  w1:{top:["sports bra pulled up over her breasts","@c1"],bottom:["yoga pants pulled down to the thighs","@dark"]},ex:"dazed"},
{key:"therapist",name:"The therapist",head:"Session 12: She Stopped Talking About Her Feelings",place:"a quiet therapist's office, a leather couch and a box of tissues",look:"a cardigan unbuttoned over her bare breasts and a skirt hiked up",
  pose:"straddling the viewer's lap in an armchair",act:"sex, vaginal, upright straddle, sitting on lap",pov:true,
  text:"straddles %M%, her therapist, in his leather armchair, his notepad dropped on the floor, grinding down onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines.",
  lines:["This is so much better than talking♡","Write this down... I'm cured♡","Same time next week?♡"],tags:"office, armchair, sitting on lap, upright straddle, notepad, tissue box, open cardigan, skirt lift",
  w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},ex:"heart"},
{key:"casting",name:"The casting couch",head:"The Audition That Went Very, Very Well",place:"a casting director's office, headshots pinned on the wall and a camera on a tripod",look:"a cocktail dress pulled down to her waist and heels",
  pose:"riding on top on a couch, facing the viewer",act:"sex, vaginal, cowgirl position, girl on top",pov:true,
  text:"rides %M%, the casting director, cowgirl style on the infamous couch, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her headshot and script tossed on the floor.",
  lines:["Did I get the part?♡","I'll do anything for the lead♡","Call me back... tonight♡"],tags:"casting couch, couch, office, headshot, script, camera, tripod, cowgirl position, girl on top, cocktail dress",w1:PARTY,ex:"smug"},
{key:"bank",name:"The loan",head:"Her Loan Was Denied. She Appealed.",place:"a bank manager's office after closing, a vault door visible through the glass",look:"a silk blouse torn open over her bare breasts and a pencil skirt hiked up",
  pose:"bending over an office desk, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the bank manager's desk with her loan application under her palms as %M% takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, an \"APPROVED\" stamp poised in his hand.",
  lines:["Approve it♡ Stamp it♡ Stamp me♡","What's the interest rate on this?♡","I'll pay it back... in installments♡"],tags:"bank, office, desk, bent over, sex from behind, stamp, paper, document, looking back, pencil skirt",w1:OFFICE,ex:"guilty"}]);

  /* ======================= Strangers ======================= */
  set("Academy Strangers","st","stranger, anonymous sex, one-night stand",[
{key:"nighttrain",name:"Night train",head:"Sleeper Car, Compartment 7: She Never Got His Name",place:"a dim sleeper-train compartment at night, the window streaked with passing lights",look:"a silk nightslip pulled down off her breasts and nothing else",
  pose:"lying on her side on a narrow bunk, held from behind",act:"sex, vaginal, spooning, sex from behind",pov:false,
  text:"lies on her side on the narrow bunk as %M%, the stranger from the next berth, fucks her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the train rocking them and lights flashing past the window.",
  lines:["I don't even know your name♡ Don't tell me♡","Next stop... don't get off yet♡","The train's rocking us... harder♡"],tags:"train interior, sleeper car, bunk, night, window, lights, spooning, lying on side, sex from behind, nightgown",
  w1:{top:["short silk robe hanging open","@c1"]},ex:"shock"},
{key:"wrongroom",name:"Wrong room",head:"Wrong Hotel Room. She Stayed Anyway.",place:"a stranger's hotel suite, his suitcase open on the floor and her key card on the carpet",look:"a cocktail dress pulled down to her waist, heels and lace panties pulled aside",
  pose:"pressed against a wall, one leg lifted",act:"sex, vaginal, standing sex, leg lift, against wall",pov:false,
  text:"is pressed against the wall of the wrong hotel room with one leg hoisted high as %M%, a total stranger, fucks her standing, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her key card for room 512 lying on the carpet by the door of 521.",
  lines:["Wrong room... right man♡","I'll just... stay a little longer♡","I'm never checking out♡"],tags:"hotel room, against wall, standing sex, leg lift, key card, suitcase, cocktail dress",w1:PARTY,ex:"shock"},
{key:"masquerade",name:"Masquerade",head:"Masquerade Ball: She Never Saw His Face",place:"a candlelit balcony off a masquerade ball, the dancers visible through tall windows",look:"a ball gown pulled down to her waist, a lace masquerade mask and long gloves",
  pose:"bracing herself on a balustrade, looking back over her shoulder",act:"sex, vaginal, sex from behind, standing sex",pov:false,
  text:"braces herself on the marble balustrade in her masquerade mask as %M%, a masked stranger in a tailcoat, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the waltz playing inside.",
  lines:["Don't take off your mask♡ Don't take off mine♡","Who are you?♡ ...Don't answer♡","One more dance... like this♡"],tags:"masquerade, mask, masquerade mask, ball gown, balcony, night, candle, standing sex, sex from behind, looking back, elbow gloves",
  w1:{top:["ball gown pulled down to the waist","@c1"],maskAccessory:["lace masquerade mask","@c2"],gloves:["long satin opera gloves","@c1"]},ex:"heart"},
{key:"milehigh",name:"Mile high",head:"Mile High, 30,000 Feet, Row 14 Stranger",place:"a cramped airplane lavatory, the seatbelt sign glowing",look:"a sundress pulled down to her waist and lace panties pulled down around one ankle",
  pose:"bracing herself against a tiny sink, looking into the mirror",act:"sex, vaginal, sex from behind, standing sex",pov:false,
  text:"braces herself against the tiny lavatory sink, her face close to the mirror, as %M%, the stranger from row 14, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the seatbelt sign dinging overhead.",
  lines:["We're landing soon♡ Hurry♡","Mile high club... I'm a member now♡","Turbulence... don't stop♡"],tags:"airplane, lavatory, bathroom, mirror, reflection, sink, sex from behind, standing sex, sundress, panties around one leg",
  w1:{top:["cocktail dress pulled down to the waist","@c1"],panties:["lace panties pulled down around one ankle","@c2"]},ex:"shock"},
{key:"elevator",name:"Stuck elevator",head:"Elevator Stuck Between Floors 31 and 32",place:"a stalled luxury elevator lit by the emergency light, the button panel glowing",look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",
  pose:"held up against an elevator wall, legs wrapped around her lover",act:"sex, vaginal, carrying, against wall, standing sex",pov:false,
  text:"is held up against the mirrored elevator wall with her legs wrapped around %M%, the stranger she was stuck with, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the emergency light glowing red and the intercom crackling \"Help is on the way\".",
  lines:["Don't fix it yet♡","Take your time, maintenance♡","I hate elevators... I love elevators♡"],tags:"elevator, mirror, emergency light, carrying, against wall, legs around waist, standing sex, office lady, pencil skirt, torn pantyhose",w1:OFFICE,ex:"dazed"},
{key:"blinddate",name:"Wrong date",head:"Blind Date Mix-Up: Wrong Table, Better Man",place:"the coat room of an elegant restaurant, coats swaying around them",look:"a cocktail dress pulled down to her waist and heels",
  pose:"pressed face-first against a wall of coats",act:"sex, vaginal, standing sex, sex from behind",pov:false,
  text:"is pressed against a rack of coats as %M%, the stranger she sat down with by mistake, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her phone buzzing with \"I'm at table 6, where are you?\" from the date she was supposed to meet.",
  lines:["Table 6 can wait♡","I think I like the wrong date better♡","Let him wait... longer♡"],tags:"restaurant, coat room, coat rack, standing sex, sex from behind, phone, text message, cocktail dress",w1:PARTY,ex:"smug"}]);

  /* ======================= Hate Sex ======================= */
  set("Academy Hate Sex","hx","hate sex, rivalry, enemies to lovers, angry sex",[
{key:"coworker",name:"Rival coworker",head:"Right After Their Screaming Match in the Meeting",place:"a conference room after a heated meeting, papers thrown everywhere",look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",
  pose:"lying back across a conference table, legs spread",act:"sex, vaginal, missionary, on table",pov:true,
  text:"lies back across the conference table among the scattered papers with her legs locked around %M%, the coworker she can't stand, %his% giant, veiny, rock-hard %cock% slamming into her vagina with motion lines, her hand fisted in his tie.",
  lines:["I hate you♡ I hate you♡ Don't stop♡","You're still wrong about the budget♡","Shut up and fuck me harder♡"],tags:"conference room, table, on table, papers, scattered papers, missionary, leg lock, tie grab, office lady, pencil skirt",w1:OFFICE,ex:"hate"},
{key:"athlete",name:"Rival athlete",head:"She Lost the Final to Him. She Wants a Rematch.",place:"a locker room after the championship, the trophy on the bench beside them",look:"a sports bra pulled up over her breasts and shorts pulled down to her thighs",
  pose:"pressed face-first against a locker",act:"sex, vaginal, standing sex, sex from behind, against locker",pov:false,
  text:"is shoved face-first against the lockers by %M%, the rival who beat her in the final, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, his gold medal swinging and her silver one on the floor.",
  lines:["This doesn't mean you won♡","Rematch... and I'm on top next time♡","I hate how good this feels♡"],tags:"locker room, locker, medal, trophy, sportswear, sports bra, standing sex, sex from behind, against wall",
  w1:{top:["sports bra pulled up over her breasts","@c1"],bottom:["yoga pants pulled down to the thighs","@dark"]},ex:"hate"},
{key:"ex",name:"The ex at the reunion",head:"Ten-Year Reunion, the Ex She Swore She'd Never Touch Again",place:"a dark side room at a reunion party, a banner reading \"10 YEARS\" visible through the door",look:"a cocktail dress pulled down to her waist and heels",
  pose:"riding on top, nails digging into his chest",act:"sex, vaginal, cowgirl position, girl on top",pov:true,
  text:"rides %M%, the ex she swore she'd never touch again, on a couch in the side room, nails digging into his chest, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the reunion music thumping through the door.",
  lines:["This changes nothing♡ Nothing♡","Ten years and you still piss me off♡","I hate that I missed this♡"],tags:"reunion, party, banner, couch, cowgirl position, girl on top, nail marks, cocktail dress",w1:PARTY,ex:"hate"},
{key:"neighbor",name:"Neighbor feud",head:"The Fence Dispute Is Finally Settled",place:"a backyard at dusk, a half-built fence between two lawns",look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",
  pose:"bracing herself against a wooden fence",act:"sex, vaginal, standing sex, sex from behind, outdoor sex",pov:false,
  text:"braces herself against the disputed fence as %M%, the neighbor she's been feuding with for a year, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the property-line stakes knocked over in the grass.",
  lines:["The fence stays on MY side♡","I still hate your lawn♡ Harder♡","Fine... you can have the hedge♡"],tags:"backyard, fence, dusk, outdoors, outdoor sex, standing sex, sex from behind, t-shirt, panties aside",
  w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"hate"},
{key:"lawyer",name:"Opposing counsel",head:"Opposing Counsel, After She Lost the Case",place:"a wood-paneled courthouse conference room, case files spilled across the table",look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",
  pose:"bending over a table, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the courthouse table among the spilled case files as %M%, the opposing lawyer who just beat her, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines.",
  lines:["Objection... sustained... oh god♡","I'm appealing♡ Right after this♡","You're in contempt... of my pussy♡"],tags:"courthouse, conference room, table, documents, bent over, sex from behind, looking back, office lady, pencil skirt",w1:OFFICE,ex:"hate"},
{key:"chef",name:"Rival chef",head:"Rival Chefs, After the Cook-Off",place:"a steel restaurant kitchen after a cook-off, pots everywhere and a trophy on the pass",look:"a chef's jacket hanging open over her bare breasts and nothing else below",
  pose:"lying back on a steel prep counter, legs spread",act:"sex, vaginal, missionary, on table",pov:true,
  text:"lies back on the steel prep counter, her chef's jacket hanging open, as %M%, the rival chef who beat her by one point, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, a spilled pot of sauce dripping off the edge.",
  lines:["Your sauce was overrated♡ This isn't♡","One point... I'll take it back♡","Hate you♡ Again♡"],tags:"kitchen, restaurant, counter, on table, missionary, chef, chef uniform, open jacket, trophy, sauce",
  w1:{top:["chef's jacket hanging open over bare breasts","white"]},ex:"hate"}]);

  /* ======================= Forbidden Places ======================= */
  set("Academy Forbidden Places","fp2","public, risky sex, forbidden",[
{key:"confessional",name:"The confessional",head:"She Came to Confess. She Had More to Confess After.",place:"inside a carved wooden confessional booth, light falling through the lattice",look:"a black dress pulled down to her waist and a lace veil over her hair",
  pose:"straddling the viewer's lap in a confessional booth",act:"sex, vaginal, upright straddle, sitting on lap",pov:true,
  text:"straddles %M% on the narrow bench of the confessional, her lace veil slipping, grinding onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, lattice-shadow across her flushed face.",
  lines:["Forgive me... I'm about to sin again♡","I'll confess this one next week♡","Quiet... someone's waiting outside♡"],tags:"confessional, booth, lattice, shadow, veil, sitting on lap, upright straddle, black dress",
  w1:{top:["black mourning dress pulled down to the waist","black"],headwear:["long sheer bridal veil","black"]},ex:"guilty"},
{key:"funeral",name:"The reception",head:"The Funeral Reception, in the Coat Room",place:"a hushed coat room off a funeral reception, lilies and sympathy cards outside the door",look:"a black mourning dress pulled down to her waist, black stockings and heels",
  pose:"pressed against a wall of coats, one leg lifted",act:"sex, vaginal, standing sex, leg lift",pov:false,
  text:"is pressed against a rack of black coats with one leg hoisted high as %M% fucks her standing, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, a lily from her lapel crushed on the floor.",
  lines:["We shouldn't... not here... don't stop♡","Grief does strange things to me♡","Quiet... they're giving the eulogy♡"],tags:"funeral, mourning, coat room, coat rack, lily, standing sex, leg lift, black dress, black legwear",
  w1:{top:["black mourning dress pulled down to the waist","black"],legwear:["lace garter stockings","black"]},ex:"guilty"},
{key:"oncall",name:"On-call room",head:"Night Shift, the On-Call Room, Pager Going Off",place:"a cramped hospital on-call room at night, a pager buzzing on the bunk",look:"her nurse scrubs top pulled up over her breasts and scrub pants pulled down",
  pose:"lying on her back on a narrow bunk, legs spread",act:"sex, vaginal, missionary",pov:true,
  text:"lies on her back on the narrow on-call bunk with her scrubs pulled up and down as %M%, the doctor on her shift, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the pager buzzing beside her head.",
  lines:["Ignore the pager♡ Two more minutes♡","Code... code pink♡","I'm supposed to be on rounds♡"],tags:"hospital, on-call room, bunk, pager, night, nurse, scrubs, missionary, on back, spread legs",
  w1:{top:["nurse scrubs top pulled up over her breasts","@c1"],bottom:["scrub pants pulled down","@c1"]},ex:"dazed"},
{key:"familydinner",name:"Next room",head:"Thanksgiving: Her Boyfriend, the Laundry Room, Her Family Next Door",place:"a laundry room off her parents' kitchen, the family dinner audible through the door",look:"a knit sweater dress pulled down to her waist and lace panties pulled aside",
  pose:"sitting on a rumbling washing machine, legs spread",act:"sex, vaginal, sitting on washing machine",pov:true,
  text:"sits on a rumbling washing machine with her legs spread around %M%, her own boyfriend, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, while her family's voices and clinking cutlery carry through the closed door.",
  lines:["They're saying grace... shh♡","Mom's calling us for pie... one more minute♡","If anyone opens that door...♡"],tags:"laundry room, washing machine, sitting on object, door, holiday, thanksgiving, sweater dress, panties aside, spread legs",
  w1:{top:["cocktail dress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"guilty"},
{key:"museum",name:"After hours",head:"Museum After Hours, on the Roped-Off Exhibit",place:"a museum gallery after hours, a velvet rope down and an antique chaise behind a \"DO NOT TOUCH\" sign",look:"a cocktail dress pulled down to her waist, heels and lace panties pulled aside",
  pose:"lying back on an antique chaise behind a velvet rope",act:"sex, vaginal, missionary",pov:true,
  text:"lies back on the antique exhibit chaise behind the velvet rope as %M% pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the \"DO NOT TOUCH\" sign knocked over and a security guard's flashlight sweeping a far hallway.",
  lines:["It said do not touch♡ Touch me♡","The guard's coming... faster♡","I'm part of the exhibit now♡"],tags:"museum, gallery, velvet rope, chaise longue, sign, flashlight, night, missionary, on back, cocktail dress",w1:PARTY,ex:"smug"},
{key:"theater",name:"The balcony",head:"Opera Box, Act Two, Nobody Looking Up",place:"a private opera box, the stage glowing far below and the audience in the dark",look:"a ball gown pulled down to her waist, long gloves and pearls",
  pose:"bending over the opera-box railing, looking down at the stage",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the velvet railing of the opera box, gazing down at the stage, as %M% takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her opera glasses dangling from one gloved hand.",
  lines:["The soprano's louder than me... barely♡","Act two... and act three♡","If anyone looks up...♡"],tags:"theater, opera, opera box, balcony, railing, stage, audience, bent over, sex from behind, ball gown, elbow gloves, opera glasses",
  w1:{top:["ball gown pulled down to the waist","@c1"],gloves:["long satin opera gloves","@c1"]},ex:"heart"}]);

  /* ======================= v183: Best Friend's Man II ======================= */
  set("Academy Best Friend's Man II","bf2","cheating (relationship), infidelity, best friend's boyfriend, affair",[
{key:"movingday",name:"Moving day",head:"Helping Her Best Friend Move In with Him",place:"an empty new bedroom full of boxes, one labelled \"OUR BEDROOM ❤\", a bare mattress on the floor",
  look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",pose:"lying on her back on a bare mattress, legs spread",act:"sex, vaginal, missionary",pov:true,
  text:"lies on her back on the bare mattress among the moving boxes as %M%, her best friend's boyfriend, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her best friend's voice calling from the moving truck outside.",
  lines:["We're christening it before she does♡","Just one more box... I mean... one more minute♡","Your new bed... I'm first♡"],tags:"bedroom, cardboard box, moving, mattress, missionary, on back, spread legs, t-shirt, panties aside",
  w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"guilty"},
{key:"anniversary",name:"Their anniversary",head:"Her Best Friend's Anniversary Dinner, in the Restaurant Restroom",place:"an elegant restaurant restroom, the anniversary table with roses visible through the door",
  look:"a cocktail dress pulled down to her waist, heels and lace panties pulled aside",pose:"bracing herself against a sink, looking into the mirror",act:"sex, vaginal, sex from behind, standing sex",pov:false,
  text:"braces herself against the marble sink, watching her own flushed face in the mirror, as %M%, her best friend's boyfriend, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her best friend waiting at the anniversary table with the cake.",
  lines:["Happy anniversary♡ ...to her♡","She's ordering dessert... so am I♡","You said you were going to the restroom... technically true♡"],tags:"restroom, sink, mirror, reflection, standing sex, sex from behind, cocktail dress, restaurant",w1:PARTY,ex:"guilty"},
{key:"bachelorette",name:"Her bachelorette",head:"Her Best Friend's Bachelorette, with the Fiancé Who Came to Drive Them Home",place:"the back of a stretch limo at night, neon lights streaking past, a \"BRIDE\" sash left on the seat",
  look:"a sequined party dress pulled down to her waist, heels and a \"MAID OF HONOR\" sash",pose:"riding in reverse, looking back over her shoulder",act:"sex, vaginal, reverse cowgirl position",pov:true,
  text:"rides %M%, her best friend's fiancé, in the reverse cowgirl position on the limo seat, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the bride passed out drunk in the next limo behind them.",
  lines:["She's going to marry you... after me♡","Don't tell the bride♡","Drive around the block again♡"],tags:"limousine, car interior, night, neon lights, sash, reverse cowgirl position, looking back, party dress, sequins",w1:PARTY,ex:"smug"},
{key:"hottub",name:"Couples' cabin",head:"Couples' Cabin Weekend, in the Hot Tub at Midnight",place:"a steaming outdoor hot tub at midnight beside a cabin, the cabin windows dark",
  look:"a string bikini pulled aside",pose:"straddling the viewer's lap in a steaming hot tub",act:"sex, vaginal, upright straddle, sitting on lap, in water",pov:true,
  text:"straddles %M%, her best friend's husband, in the steaming hot tub, water churning, grinding onto %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her best friend and her own boyfriend asleep in the dark cabin behind them.",
  lines:["Everyone's asleep♡ Stay quiet♡","She's right there in the window... she's sleeping♡","The jets aren't loud enough to cover me♡"],tags:"hot tub, steam, water, night, cabin, outdoors, upright straddle, sitting on lap, bikini, swimsuit aside, wet",
  w1:{top:["bikini top pulled aside","@c1"],bottom:["bikini bottoms pulled aside","@c1"]},ex:"heart"},
{key:"proposal",name:"Proposal rehearsal",head:"Helping Him Rehearse the Proposal to Her Best Friend",place:"a living room with rose petals on the floor spelling \"MARRY ME?\" and candles everywhere",
  look:"a sundress pulled down to her waist and lace panties pulled aside",pose:"lying on her back on rose petals, legs spread",act:"sex, vaginal, missionary",pov:true,
  text:"lies on her back on the rose petals that spell \"MARRY ME?\" as %M%, her best friend's boyfriend, pounds into her, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the ring box open in her hand.",
  lines:["Yes♡ I mean... she'll say yes♡","Practice on me... again♡","Get down on one knee... no, stay right there♡"],tags:"living room, rose petals, candle, ring box, holding ring box, engagement ring, missionary, on back, spread legs, sundress",
  w1:{top:["cocktail dress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"heart"},
{key:"loyaltytest",name:"The loyalty test",head:"Her Best Friend Asked Her to Test His Loyalty",place:"a hotel bar's private booth, two cocktails and a phone recording on the table, then upstairs to a hotel room",
  look:"a tight cocktail dress pulled down to her waist and heels",pose:"riding on top, facing the viewer",act:"sex, vaginal, cowgirl position, girl on top",pov:true,
  text:"rides %M%, her best friend's boyfriend, on the hotel bed, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her phone lighting up with her best friend's text: \"So?? Did he pass?? 🥺\".",
  lines:["He... he failed♡ ...So did I♡","I'll tell her you passed... after round two♡","This is for science♡"],tags:"hotel room, bed, cowgirl position, girl on top, phone, text message, cocktail dress",w1:PARTY,ex:"smug"}],"Academy Best Friend's Man");

  /* ======================= v183: Hate Sex II ======================= */
  set("Academy Hate Sex II","hx2","hate sex, rivalry, enemies to lovers, angry sex",[
{key:"mediation",name:"Divorce mediation",head:"Divorce Mediation, After the Mediator Left the Room",place:"a sterile mediation office, divorce papers and two untouched coffees on the table",
  look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",pose:"bending over a mediation table, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the mediation table among the divorce papers as %M%, her soon-to-be ex-husband, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, a pen still clenched in her fist.",
  lines:["I still want the house♡ Harder♡","This doesn't mean I'm not signing♡","I hate you... why are you so good at this♡"],tags:"office, table, divorce papers, paper, pen, coffee, bent over, sex from behind, looking back, office lady, pencil skirt",
  w1:{top:["silk blouse torn open over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@dark"],legwear:["torn sheer tights","black"]},ex:"hate"},
{key:"debate",name:"The debate",head:"Backstage After the Debate She Lost",place:"a cramped backstage green room, two podiums visible on the monitor, makeup lights glowing",
  look:"a power suit jacket open over her bare breasts and a pencil skirt hiked up",pose:"sitting on a makeup counter, legs wrapped around her lover",act:"sex, vaginal, sitting on counter, legs around waist",pov:true,
  text:"sits on the makeup counter under the mirror lights with her legs locked around %M%, the opponent who beat her in the debate, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her microphone pack still clipped to her skirt.",
  lines:["My rebuttal: harder♡","You're still wrong on every point♡","I demand a recount♡"],tags:"green room, makeup counter, mirror lights, sitting on counter, legs around waist, microphone, suit, pencil skirt",
  w1:{top:["silk blouse torn open over bare breasts","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"]},ex:"hate"},
{key:"convention",name:"Rival creators",head:"Rival Influencers, Backstage at the Convention",place:"a backstage corridor at a fan convention, cables and equipment cases everywhere, crowd noise beyond the curtain",
  look:"a cosplay crop top pulled up and a micro skirt hiked up",pose:"pressed face-first against an equipment case",act:"sex, vaginal, standing sex, sex from behind",pov:false,
  text:"is bent over a road case backstage as %M%, the rival creator she's been feuding with online, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her lanyard swinging and the crowd chanting both their names beyond the curtain.",
  lines:["Don't you DARE post about this♡","My fans hate you♡ ...I hate you♡ ...more♡","Unfollowing you after this♡"],tags:"convention, backstage, curtain, cables, lanyard, bent over, sex from behind, standing sex, crop top, micro skirt",
  w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},ex:"hate"},
{key:"roommate",name:"The dishes",head:"Roommate War, Day 47: The Dishes",place:"a cramped shared kitchen, a sink overflowing with dirty dishes and a passive-aggressive chore chart on the fridge",
  look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside, rubber gloves still on",pose:"bending over a kitchen sink",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the overflowing sink in yellow rubber gloves as %M%, the roommate who never does the dishes, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, the chore chart behind them reading \"YOUR TURN!!!\" in her angry handwriting.",
  lines:["You're STILL doing the dishes after this♡","I hate living with you♡ Don't stop♡","Rent's split 50/50... so is this♡"],tags:"kitchen, sink, dishes, rubber gloves, chore chart, bent over, sex from behind, t-shirt, panties aside",
  w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]},ex:"hate"},
{key:"band",name:"Battle of the bands",head:"Battle of the Bands: His Band Won",place:"a grimy backstage at a rock club, amps stacked high and a set list taped to the wall",
  look:"a ripped band t-shirt pushed up over her breasts, a leather skirt hiked up and fishnets",pose:"sitting on a stack of amps, legs spread",act:"sex, vaginal, sitting, missionary",pov:true,
  text:"sits on top of a stack of amps with her legs spread around %M%, the frontman of the band that beat hers, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her guitar leaning against the amps and the trophy on the floor.",
  lines:["Your songs suck♡ This doesn't♡","Encore♡ I said ENCORE♡","Next year we're crushing you♡"],tags:"backstage, amplifier, rock club, guitar, set list, sitting on object, spread legs, band shirt, torn clothes, fishnets, leather skirt",
  w1:{top:["oversized t-shirt pushed up over her breasts","black"],bottom:["skirt hiked up around the waist","black"],legwear:["fishnet stockings","black"]},ex:"hate"},
{key:"parking",name:"The parking spot",head:"He Took Her Parking Spot Again",place:"an underground parking garage, a \"RESERVED\" sign over the disputed spot, his car parked in it",
  look:"a silk blouse torn open over her bare breasts, a pencil skirt hiked up and torn tights",pose:"bending over the hood of a car",act:"sex, vaginal, sex from behind, bent over",pov:false,
  text:"is bent over the hood of his car in her disputed parking spot as %M%, the coworker who keeps stealing it, takes her from behind, %his% giant, veiny, rock-hard %cock% buried to the hilt in her vagina with motion lines, her car keys scattered on the concrete.",
  lines:["That's MY spot♡ Harder♡","I keyed your car♡ ...I'm sorry♡ ...no I'm not♡","Park here again and see what happens♡"],tags:"parking garage, car, on car, bent over, sex from behind, sign, keys, office lady, pencil skirt, torn pantyhose",
  w1:{top:["silk blouse torn open over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@dark"],legwear:["torn sheer tights","black"]},ex:"hate"}],"Academy Hate Sex");

  /* ======================= v183: Caught by Her Best Friend (duo, optional) ======================= */
  /* Each girl's Best Friend's Man scene again, with her real best friend (character 2) walking in on it. The man stays
     faceless in the base prompt; the friend is clothed and is never part of the sex. */
  {
    const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
      fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
    START.item("top","short sequined party dress","CU","glam");START.item("top","bath towel wrapped around her body","CU","casual");
    START.item("top","classic strapless lace wedding gown","CU","glam");START.item("headwear","long sheer bridal veil","CU","glam");
    const FEX=["shocked, wide-eyed, hand over her mouth","devastated, tears welling, trembling lips","furious, red-faced, teary glare"];
    FEX.forEach(v=>START.option("expression",v,GX));
    const GEX="caught, panicked, flushed expression mid-moan";START.option("expression",GEX,GX);
    START.option("posture","standing frozen in a doorway","Posture");
    const CAUGHT=[
      {head:"Caught: Her Best Friend Brought Out the Cake",fw:{top:["short sequined party dress","@c1"]},
        what:"{Partner}, her best friend and the birthday girl, stands frozen in the open doorway holding her birthday cake, the candles still lit and the cake tilting, a party hat on her head",
        girl:"It's not... it's not what it looks like!♡",friend:"On my BIRTHDAY?!",t2:"birthday cake, holding cake, candle, party hat, doorway, standing"},
      {head:"Caught: Her Best Friend Came Down for a Glass of Water",fw:{top:["{c} soft pajama shirt","@c1"],bottom:["{c} soft pajama pants","@c1"]},
        what:"{Partner}, her best friend, stands at the bottom of the stairs in her pajamas, a glass of water slipping from her hand and shattering",
        girl:"I- I can explain!♡",friend:"In MY house?! With MY husband?!",t2:"pajamas, stairs, glass, dropping, broken glass, standing"},
      {head:"Caught: The Bride Came Looking for Her Groom",fw:{top:["classic strapless lace wedding gown","white"],headwear:["long sheer bridal veil","white"]},
        what:"{Partner}, her best friend and the bride, stands in the doorway in her wedding gown and veil, her bouquet falling from her hands",
        girl:"Wait!! It's your wedding day, I-♡",friend:"You were my MAID OF HONOR!",t2:"bride, wedding dress, bridal veil, bouquet, dropping, doorway, standing"},
      {head:"Caught: Her Best Friend Got Out of the Shower",fw:{top:["bath towel wrapped around her body","white"]},
        what:"{Partner}, her best friend, stands dripping in the bathroom doorway in a towel, steam pouring out behind her, the towel slipping as she stares",
        girl:"You were singing... I thought you'd be longer...♡",friend:"I was gone FIVE minutes!",t2:"towel, wet, steam, bathroom, doorway, standing"},
      {head:"Caught: Her Best Friend Surprised Him at the Jeweler",fw:{top:["{c} off-shoulder sweater dress","@c1"],legwear:["{c} ankle boots","@c2"]},
        what:"{Partner}, her best friend, stands at the back-room curtain of the jewelry store, a coffee for her boyfriend dropping from her hand, staring at the open ring box",
        girl:"The ring's for you! ...I swear the ring's for you♡",friend:"Is that... MY ring?!",t2:"curtain, coffee cup, dropping, ring box, standing"},
      {head:"Caught: Her Best Friend Lifted the Tablecloth",fw:{top:["{c} off-shoulder sweater dress","@c1"],legwear:["{c} ankle boots","@c2"]},
        what:"{Partner}, her best friend, has lifted the edge of the tablecloth and is crouching to look under the game-night table, dice spilling from her hand",
        girl:"Mmph?! ...I dropped a dice♡",friend:"Under MY table?!",t2:"tablecloth, lifting, crouching, dice, looking under table"}];
    START.add("Academy Caught by Her Best Friend",HS.map((h,i)=>{
      const base=tplById("bf"+h);if(!base)return null;
      const C=CAUGHT[i%CAUGHT.length],fr=PAL[h],frT=tplById(ACAD.robes(fr))||tplById(fr+"robes"),FE=FEX[(i/6|0)%FEX.length];
      const bp=base.out.pair;
      /* the girl's own scene, the man faceless, then the friend walking in */
      const own=String(bp.scene).split(" She has ")[0].replace(/\{partner\}/g,"the faceless man").replace(/\{Partner\}/g,"The faceless man").replace(/\{his\}/g,"his").replace(/\{he\}/g,"he").replace(/\{cock\}/g,"cock").replace(/^A headline goes across the top of the image: "[^"]*"/,`A headline goes across the top of the image: "${C.head}"`);
      const scene=`${own.replace(/[.\s]+$/,"")}. She is caught in the act: ${C.what}, ${FE}. The woman has a caught, panicked, flushed expression mid-moan, frozen in the middle of the act. Two speech bubbles: from the woman, "${C.girl}"; from {partner}, "${C.friend}". The man is faceless, his head out of frame, muscular, with a giant, veiny, rock-hard cock. caught, walk-in, cheating (relationship), infidelity, best friend, shocked, english text, headline, black outline, blurry background, motion lines, sex, speech bubble`;
      return{id:"bfc"+h,base:"bf"+h,name:C.head,c:Object.assign({},base.c,{expression:GEX}),
        out:Object.assign({},base.out,{pair:{id:frT?frT.id:ACAD.robes(fr),outfit:"scene",scene,act:"",dir:"mutual",explicit:true,penis:false,
          count:"2girls, 1boy, faceless male, head out of frame, muscular male, hetero",
          tags1:"caught, sex, surprised, panicking, looking at another, blush, sweat",tags2:"shocked, "+C.t2+", looking at another, clothed",
          pc:{expression:FE,posture:"standing frozen in a doorway"},c1:Object.assign({},bp.c1,{expression:GEX}),w1:bp.w1,w2:{name:"Walking in",look:"casual",f:C.fw,m:{}},compact:false,fit:true}}),
        tags:["forbidden","caught","duo","pair","best friend","explicit",h,fr],
        blurb:`“${C.head}.” ${cap(h)}'s Best Friend's Man scene, caught by her best friend ${cap(fr)} (character 2). The man is faceless.`};
    }).filter(Boolean),{after:"Academy Best Friend's Man II"});
  }
})();

/* ---- v184: three more "Caught" sets, each one more heartbreaking than the last. Duo scenes: the girl is character 1, her
   real best friend is character 2 (Scene tab), the man is faceless in the base prompt. The friend is clothed and never part
   of the sex; she only walks in. Two speech bubbles, one from each.
   "Academy Caught: Broken Trust"           the trust itself is the betrayal (she introduced them, she said "you're paranoid")
   "Academy Caught: The Worst Possible Night" her friend's biggest night: the pregnancy news, her wedding night, her mother's funeral
   "Academy Caught: It Was Never an Accident" no apology: a year of lies, she chose him, wearing her friend's ring and dress,
                                             and she left the door open on purpose
   Adult women; explicit; held back by the safeguard like every explicit scene. */
(function(){
  if(!ACAD.HUM)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)",cap=s=>s[0].toUpperCase()+s.slice(1);
  const dd=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const ACC={griffin:"crimson-and-gold accents",badger:"warm honey-gold light",raven:"deep blue twilight through the window",serpent:"moody emerald light",wolf:"a full moon through the window",
    swan:"soft pearly light",dragon:"red lantern light",stag:"dappled green light",shark:"ocean-blue light",penguin:"snow falling past the window",fox:"glowing paper-lantern light",
    lovebird:"pink fairy lights",flamingo:"pink sunset light",kraken:"shimmering blue light",salmon:"cherry-wood warmth",crow:"glinting trinkets on every surface",owl:"a single lamp and a full moon",rat:"string lights and thrifted clutter"};
  [["top","black funeral dress","CU","gothic"],["top","{c} tailored blazer over a blouse","CU","preppy"],["outerwear","{c} trench coat","CU","preppy"],
   ["top","classic strapless lace wedding gown","CU","glam"],["headwear","long sheer bridal veil","CU","glam"],["top","{c} off-shoulder sweater dress","CU","casual"],
   ["legwear","{c} ankle boots","CU","casual"],["top","{c} soft pajama shirt","US","casual"],["bottom","{c} soft pajama pants","US","casual"],["wristAccessory","braided friendship bracelet","CU","casual,sweet"],
   ["top","lace wedding gown pulled down off the breasts and hiked up around the waist","L","boudoir,glam"],["ringAccessory","engagement ring with a large diamond","CU","glam"],
   ["top","cocktail dress pulled down to the waist","L","glam,boudoir"],["panties","lace panties pulled aside","L","boudoir"],["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],
   ["top","cardigan unbuttoned over bare breasts","L","casual,boudoir"],["bottom","skirt hiked up around the waist","L","casual,boudoir"],["top","short silk robe hanging open","L","boudoir"],
   ["legwear","high heels","CUS","glam"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const FEX={shock:"shocked, wide-eyed, hand over her mouth",devast:"devastated, tears welling, trembling lips",fury:"furious, red-faced, teary glare",
    sob:"heartbroken, sobbing, collapsing to her knees",numb:"numb, hollow, tear-streaked stare"};
  const GEXS={caught:"caught, panicked, flushed expression mid-moan",guilty:"guilty, crying, caught expression, still flushed",cold:"cold, unapologetic, defiant smirk mid-moan"};
  Object.values(FEX).concat(Object.values(GEXS)).forEach(v=>START.option("expression",v,GX));
  const FPOSE={door:"standing frozen in a doorway",knees:"collapsing to her knees in a doorway",clutch:"standing in a doorway, clutching something to her chest"};
  Object.values(FPOSE).forEach(v=>START.option("posture",v,"Posture"));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on both women's faces and expressions, highly detailed skin, hair and eyes";
  const COUNT="2girls, 1boy, faceless male, head out of frame, muscular male, hetero";
  const GIRLPOSE={couch:"riding on top, facing the viewer",bed:"lying on her back on a bed, legs spread",table:"lying back across a table, legs spread",bent:"bending over furniture, looking back over her shoulder",
    wall:"pressed against a wall, one leg lifted",reverse:"riding in reverse, facing the door"};
  Object.values(GIRLPOSE).forEach(v=>START.option("posture",v,GX));
  const SEX={couch:"rides the faceless man in the cowgirl position, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines",
    bed:"lies on her back on the bed with her legs spread as the faceless man pounds into her, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines",
    table:"lies back across the table with her legs spread as the faceless man pounds into her, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines",
    bent:"is bent over as the faceless man takes her from behind, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines",
    wall:"is pressed against the wall with one leg lifted as the faceless man fucks her standing, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines",
    reverse:"rides the faceless man in the reverse cowgirl position, facing the door, his giant, veiny, rock-hard cock buried to the hilt in her vagina with motion lines"};
  const ACT={couch:"sex, vaginal, cowgirl position, girl on top",bed:"sex, vaginal, missionary",table:"sex, vaginal, missionary, on table",bent:"sex, vaginal, sex from behind, bent over",
    wall:"sex, vaginal, standing sex, leg lift",reverse:"sex, vaginal, reverse cowgirl position"};
  let after="Academy Caught by Her Best Friend";
  /* s: {head, place, look, w1, pos, detail, girl, gex, what, friend, fex, fpose, fw, t1, t2} */
  function set(label,pre,TAG,scen){
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],fr=PAL[h],frId=(tplById(ACAD.robes(fr))||tplById(fr+"robes")||{}).id;if(!frId)return null;
      const gex=GEXS[s.gex||"caught"],fex=FEX[s.fex],w1i=Object.assign({},s.w1||{});
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const scene=`A headline goes across the top of the image: "${s.head}". Setting: ${s.place}, ${ACC[h]}, blurry background, detailed foreground outlined in black. The woman wears ${s.look}. She ${SEX[s.pos]}. ${s.detail} She is caught in the act: ${s.what}, ${fex}. The woman has ${/^[aeiou]/i.test(gex)?"an":"a"} ${gex}. Two speech bubbles: from the woman, "${s.girl}"; from {partner}, "${s.friend}". The man is faceless, his head out of frame, muscular, with a giant, veiny, rock-hard cock. ${TAG}, caught, walk-in, cheating (relationship), infidelity, betrayal, best friend, english text, headline, black outline, blurry background, motion lines, sex, speech bubble, ${s.tags||""}`.replace(/,\s*$/,"");
      const c1=Object.assign({},AROUSE,{expression:gex,posture:GIRLPOSE[s.pos]});
      return{id:pre+h,base:ACAD.robes(h),name:s.head,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Caught",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:frId,outfit:"scene",scene,act:"",dir:"mutual",explicit:true,penis:false,count:COUNT,
            tags1:dd(`${s.gex==="cold"?"smirk, looking at another, unapologetic":"caught, surprised, panicking, looking at another"}, sex, blush, sweat, ${s.t1||""}`),
            tags2:dd(`${s.fex==="sob"?"crying, tears, kneeling, on knees":s.fex==="numb"?"empty eyes, tears, standing":"shocked, tears, standing"}, ${s.t2}, looking at another, clothed`),
            pc:{expression:fex,posture:FPOSE[s.fpose||"door"]},c1,w1:{name:"Caught",look:"boudoir",f:w1i},w2:{name:"Walking in",look:"casual",f:s.fw,m:{}},compact:false,fit:true}},
        tags:["forbidden","caught","duo","pair","best friend","betrayal","explicit",h,fr],
        blurb:`“${s.head}.” ${cap(h)}, caught by her best friend ${cap(fr)} (character 2). The man is faceless.`};
    }).filter(Boolean),{after});
    after=label;
  }
  const PARTY={top:["cocktail dress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"],legwear:["high heels","@dark"]};
  const HOME={top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"],panties:["lace panties pulled aside","@c2"]};
  const TEE={top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]};
  const CASUAL={top:["{c} off-shoulder sweater dress","@c1"],legwear:["{c} ankle boots","@c2"]};

  /* ======================= Broken Trust ======================= */
  set("Academy Caught: Broken Trust","ct1","broken trust",[
{head:"She's the One Who Introduced Them",place:"the apartment her best friend shares with her boyfriend, a framed photo of the three of them on the wall",look:"a cardigan unbuttoned over her bare breasts, a skirt hiked up and lace panties pulled aside",w1:HOME,pos:"couch",
  detail:"On the wall behind them hangs the photo from the night she introduced them, all three smiling.",
  what:"{partner}, her best friend, stands in the open doorway with grocery bags slipping from her arms, oranges rolling across the floor, the ingredients for his favorite dinner",fex:"devast",fw:CASUAL,
  girl:"Wait! Please, I can explain!",friend:"You introduced us... you said he was perfect for me...",t2:"grocery bag, dropping, oranges, doorway"},
{head:"Last Week She Cried on Her Shoulder About Him",place:"her best friend's own bedroom, the bed still unmade from that morning",look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",w1:TEE,pos:"bed",
  detail:"On her phone on the nightstand is her own text from last week, still open: \"He'd never cheat on you, you're being paranoid ❤\".",
  what:"{partner}, her best friend, stands in the doorway holding her own phone up, the same message on its screen",fex:"numb",fw:CASUAL,
  girl:"I- I'm so sorry... I didn't mean...",friend:"You told me I was being paranoid.",t2:"holding phone, phone screen, doorway"},
{head:"You're Supposed to Be My Maid of Honor",place:"her best friend's kitchen, wedding seating charts and invitation samples spread across the table",look:"a party dress pulled down to her waist, heels and lace panties pulled aside",w1:PARTY,pos:"table",
  detail:"The wedding seating chart under her back has her own name written at the head table, next to the bride's.",
  what:"{partner}, her best friend and the bride-to-be, stands in the doorway holding a box of wedding favors, her engagement ring glinting",fex:"devast",fw:CASUAL,
  girl:"It just happened... it was only once...",friend:"You were going to stand next to me at the altar.",t2:"box, engagement ring, doorway, holding box"},
{head:"She Gave Her the Spare Key for Emergencies",place:"her best friend's tidy apartment, a little heart-shaped keychain hanging in the lock",look:"a short silk robe hanging open, nothing else",w1:{top:["short silk robe hanging open","@c1"]},pos:"bent",
  detail:"The spare key with the heart-shaped keychain her best friend gave her still hangs in the door behind them.",
  what:"{partner}, her best friend, stands in the doorway, her own key still in the lock, her face draining of color",fex:"fury",fw:CASUAL,
  girl:"I can explain! It's not- I-",friend:"I gave you that key for EMERGENCIES.",t2:"key, keychain, doorway"},
{head:"Twelve Years of Friendship",place:"her best friend's living room, a wall of photos of the two of them from childhood to now",look:"a cardigan unbuttoned over her bare breasts, a skirt hiked up and a braided friendship bracelet",
  w1:Object.assign({},HOME,{wristAccessory:["braided friendship bracelet","@c1"]}),pos:"couch",
  detail:"The braided friendship bracelet she has worn for twelve years is on the wrist pressed to the faceless man's chest.",
  what:"{partner}, her best friend, grips the doorframe so hard her own matching friendship bracelet snaps and falls",fex:"sob",fpose:"knees",fw:CASUAL,
  girl:"Please... don't look at me like that...",friend:"Twelve years... twelve years and you do THIS?",t2:"bracelet, broken, friendship bracelet, on knees, doorway",t1:"friendship bracelet"},
{head:"In Front of Their Couple Photo",place:"her best friend's bedroom, a framed couple photo of her best friend and her boyfriend on the nightstand",look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",w1:TEE,pos:"reverse",
  detail:"The framed couple photo on the nightstand stares right at them, her best friend smiling in it.",
  what:"{partner}, her best friend, walks slowly to the nightstand and picks up the couple photo, her hands shaking",fex:"numb",fpose:"clutch",fw:CASUAL,
  girl:"I'm sorry... I'm so sorry...",friend:"In front of OUR picture...?",t2:"picture frame, holding picture, shaking"}]);

  /* ======================= The Worst Possible Night ======================= */
  set("Academy Caught: The Worst Possible Night","ct2","heartbreak",[
{head:"She Came Home to Tell Him She's Pregnant",place:"her best friend's bedroom, a little gift bag with baby shoes on the dresser",look:"an oversized t-shirt pushed up over her breasts and lace panties pulled aside",w1:TEE,pos:"bed",
  detail:"A tiny pair of baby shoes peeks out of the gift bag her best friend left on the dresser that morning.",
  what:"{partner}, her best friend, stands in the doorway holding a positive pregnancy test and a sonogram photo, both slipping from her fingers",fex:"sob",fpose:"knees",fw:CASUAL,
  girl:"N-no... not today... please...",friend:"I came home to tell him we're having a baby...",t2:"pregnancy test, sonogram, dropping, on knees, doorway"},
{head:"The Night She Got Her Dream Job",place:"her best friend's apartment, a \"CONGRATULATIONS\" banner she hung up herself still on the wall",look:"a party dress pulled down to her waist, heels and lace panties pulled aside",w1:PARTY,pos:"table",
  detail:"The \"CONGRATULATIONS\" banner she hung for her best friend's promotion sags above them.",
  what:"{partner}, her best friend, stands in the doorway in her work blazer holding a bottle of champagne and her new office nameplate",fex:"devast",
  fw:{top:["{c} tailored blazer over a blouse","@c1"]},
  girl:"Wait- I was going to-",friend:"I wanted to celebrate with you. Both of you.",t2:"champagne bottle, nameplate, holding bottle, blazer, doorway"},
{head:"Her Mother's Funeral",place:"an upstairs guest room at her best friend's mother's funeral reception, sympathy cards and lilies on the dresser",look:"a black dress pulled down to her waist and black stockings",
  w1:{top:["black mourning dress pulled down to the waist","black"],legwear:["lace garter stockings","black"]},pos:"wall",
  detail:"A framed photo of her best friend's mother sits on the dresser beside a vase of white lilies.",
  what:"{partner}, her best friend, in her black funeral dress, eyes already red from crying all day, stands in the doorway clutching a handkerchief",fex:"numb",fw:{top:["black funeral dress","black"]},
  girl:"I'm sorry... I'm so, so sorry...",friend:"Today? You chose TODAY?",t2:"funeral, black dress, handkerchief, red eyes, doorway"},
{head:"Six Hours Into Her Marriage",place:"the honeymoon suite, rose petals on the bed, a \"Just Married\" sign on the door",look:"her bridesmaid dress pulled down to her waist and heels",
  w1:{top:["bridesmaid dress pulled down to the waist","@c1"],legwear:["high heels","@dark"]},pos:"bed",
  detail:"The rose petals her best friend scattered for her wedding night stick to her bare back.",
  what:"{partner}, her best friend and the bride, stands in the doorway of her own honeymoon suite in her wedding gown and veil, the key card falling from her hand",fex:"sob",fpose:"knees",
  fw:{top:["classic strapless lace wedding gown","white"],headwear:["long sheer bridal veil","white"]},
  girl:"It's not... please don't...",friend:"We've been married for six hours.",t2:"bride, wedding dress, bridal veil, key card, on knees, doorway"},
{head:"She Flew Home Early to Surprise Him",place:"her best friend's apartment at night, the lights low",look:"a short silk robe hanging open, her best friend's",w1:{top:["short silk robe hanging open","@c1"]},pos:"couch",
  detail:"The silk robe she's wearing is her best friend's, the monogram on the pocket.",
  what:"{partner}, her best friend, stands in the doorway in her trench coat with a rolling suitcase, a bouquet of flowers and an airport tag, the flowers dropping",fex:"devast",
  fw:{outerwear:["{c} trench coat","@c1"],top:["{c} off-shoulder sweater dress","@c2"]},
  girl:"You weren't supposed to be back until Sunday...",friend:"I wanted to surprise you.",t2:"suitcase, rolling suitcase, flowers, bouquet, dropping, trench coat, doorway"},
{head:"He Was Going to Propose Tonight",place:"a candlelit hotel room he booked, a table set for two with a single rose",look:"a party dress pulled down to her waist, heels and lace panties pulled aside",w1:PARTY,pos:"bent",
  detail:"On the floor among his clothes lies an open ring box, the diamond he bought for her best friend.",
  what:"{partner}, her best friend, kneels in the doorway in her prettiest dress and picks up the open ring box from the floor",fex:"numb",fpose:"knees",fw:CASUAL,
  girl:"I didn't know! I didn't know he was going to...",friend:"He was going to propose... tonight.",t2:"ring box, engagement ring, holding ring box, kneeling, doorway"}]);

  /* ======================= It Was Never an Accident ======================= */
  set("Academy Caught: It Was Never an Accident","ct3","true betrayal, netorare",[
{head:"It's Been Going On for a Year",place:"her best friend's bedroom, her best friend's laptop open on the desk showing a folder of photos",look:"nothing but her best friend's necklace",w1:{},pos:"couch",
  detail:"The laptop screen behind them shows a folder titled \"US ❤\" full of a year's worth of photos of her and him.",
  what:"{partner}, her best friend, stands in front of the laptop scrolling through the photos, her hand frozen on the trackpad",fex:"numb",fpose:"clutch",fw:CASUAL,gex:"cold",
  girl:"A year. It's been a year. I'm not sorry.",friend:"...A YEAR?",t2:"laptop, screen, photos, standing",t1:"necklace"},
{head:"She Chose Him",place:"her best friend's living room",look:"an oversized t-shirt pushed up over her breasts, his",w1:{top:["oversized t-shirt pushed up over her breasts","@c1"]},pos:"reverse",
  detail:"She keeps riding, facing the door, and doesn't stop when her best friend walks in.",
  what:"{partner}, her best friend, collapses to her knees in the doorway, her purse spilling",fex:"sob",fpose:"knees",fw:CASUAL,gex:"cold",
  girl:"I love him. I choose him. Not you.",friend:"We were supposed to be best friends forever...",t2:"purse, spilling, on knees, doorway"},
{head:"Wearing Her Engagement Ring",place:"her best friend's bedroom, the empty ring dish on the nightstand",look:"nothing but her best friend's engagement ring",w1:{ringAccessory:["engagement ring with a large diamond","-"]},pos:"couch",
  detail:"She holds up her hand to admire the engagement ring on her finger, the one that should be on her best friend's.",
  what:"{partner}, her best friend, stands in the doorway staring at her own bare ring finger, then at the ring",fex:"fury",fw:CASUAL,gex:"cold",
  girl:"It fits me better, don't you think?",friend:"That's MY ring.",t2:"bare finger, looking at hand, doorway",t1:"engagement ring, showing ring"},
{head:"In Her Wedding Dress",place:"her best friend's bedroom, an empty garment bag labeled with her best friend's name on the bed",look:"her best friend's lace wedding gown, pulled down off her breasts and hiked up around her waist, and her veil",
  w1:{top:["lace wedding gown pulled down off the breasts and hiked up around the waist","white"],headwear:["long sheer bridal veil","white"]},pos:"bent",
  detail:"The wedding gown is her best friend's, fitted for next Saturday, the empty garment bag with her best friend's name lying open on the bed.",
  what:"{partner}, her best friend, stands in the doorway with her hand over her mouth, staring at her own wedding dress",fex:"sob",fpose:"knees",fw:CASUAL,gex:"cold",
  girl:"I always looked better in it.",friend:"That's... MY dress... my wedding is in a WEEK...",t2:"hand over own mouth, on knees, doorway"},
{head:"She Left the Door Open on Purpose",place:"her best friend's apartment, the front door wide open",look:"nothing at all, her phone in her hand",w1:{},pos:"wall",
  detail:"In her hand her phone shows the text she sent ten minutes ago: \"Come over. Door's open ♡\".",
  what:"{partner}, her best friend, stands in the open door holding her own phone with the same message on it",fex:"numb",fw:CASUAL,gex:"cold",
  girl:"I wanted you to see. Now you know.",friend:"You... texted me to come over... for this?",t2:"holding phone, phone screen, doorway, open door",t1:"holding phone"},
{head:"Moving Into Her Life",place:"her best friend's bedroom, her own clothes now hanging in her best friend's closet and her best friend's things in a box by the door",look:"nothing but her best friend's silk robe, hanging open",
  w1:{top:["short silk robe hanging open","@c1"]},pos:"bed",
  detail:"A cardboard box by the door is labeled with her best friend's name in her own handwriting, full of her best friend's things.",
  what:"{partner}, her best friend, stands in the doorway of what used to be her own bedroom, holding the box of her own things",fex:"devast",fpose:"clutch",fw:CASUAL,gex:"cold",
  girl:"Your side of the bed is mine now.",friend:"This is MY home...",t2:"cardboard box, holding box, doorway"}]);
})();

/* ---- v185: five narrated yuri sets: secret girlfriends hiding their love from their families. Each girl's secret
   girlfriend is her best friend (character 2 in the Scene tab). Narrated: two or three caption boxes tell the story
   ("Mom thinks we're studying.") over an explicit scene between the two of them, each girl directed on her own (her
   expression, her tags). Family is only ever a voice through the door, a knock, a photo, a text; never part of anything.
   Secret Girlfriends: Sleepover Excuse · Family Holidays · Close Calls · Just Roommates · Dear Diary
   Adult women; explicit; held back by the safeguard like every explicit scene. */
(function(){
  if(!ACAD.HUM)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)",cap=s=>s[0].toUpperCase()+s.slice(1);
  const dd=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const PAL={griffin:"dragon",badger:"fox",raven:"crow",serpent:"kraken",wolf:"stag",swan:"flamingo",dragon:"griffin",stag:"lovebird",shark:"salmon",penguin:"crow",
    fox:"badger",lovebird:"flamingo",flamingo:"swan",kraken:"shark",salmon:"serpent",crow:"penguin",owl:"rat",rat:"owl"};
  const ACC={griffin:"crimson-and-gold accents",badger:"warm honey-gold light",raven:"deep blue twilight through the window",serpent:"moody emerald light",wolf:"a full moon through the window",
    swan:"soft pearly light",dragon:"red lantern light",stag:"dappled green light",shark:"ocean-blue light",penguin:"snow falling past the window",fox:"glowing paper-lantern light",
    lovebird:"pink fairy lights",flamingo:"pink sunset light",kraken:"shimmering blue light",salmon:"cherry-wood warmth",crow:"glinting trinkets on every surface",owl:"a single lamp and a full moon",rat:"string lights and thrifted clutter"};
  [["top","{c} soft pajama shirt","US","casual"],["bottom","{c} soft pajama pants","US","casual"],["top","{c} pajama shirt unbuttoned and hanging open","L","casual,boudoir"],
   ["top","{c} off-shoulder sweater dress","CU","casual"],["top","sweater pushed up over her breasts","L","casual,boudoir"],["top","holiday sweater pushed up over her breasts","L","casual,boudoir"],
   ["bottom","skirt hiked up around the waist","L","casual,boudoir"],["panties","lace panties pulled aside","L","boudoir"],["panties","lace panties pulled down around one ankle","L","boudoir"],
   ["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],["top","short silk robe hanging open","L","boudoir"],["top","bridesmaid dress pulled down to the waist","L","boudoir,glam"],
   ["top","qipao pulled down to the waist","L","cultural,boudoir"],["top","yukata pulled open off the shoulders","L","cultural,boudoir"],["top","red velvet Santa dress pulled down to the waist","L","costume,boudoir"],
   ["panties","strap-on harness","L","boudoir"],["wristAccessory","braided friendship bracelet","CU","casual,sweet"],["heldItem","diary","CU","casual"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const EX={love:"flushed, loving, half-lidded expression",quiet:"biting her lip to stay quiet, eyes rolling back",cover:"covering her mouth to stay quiet, eyes rolled up in bliss",
    tear:"teary, blissful, loving smile",panic:"panicked, flushed, giggling expression",adore:"breathless, heart-eyed, adoring gaze",lost:"dazed, overwhelmed, drooling expression"};
  Object.values(EX).forEach(v=>START.option("expression",v,GX));
  const POS={
    scissor:{pose:"lying with her legs scissored with her lover's",act:"scissoring, tribadism",t:"scissoring, tribadism, legs entwined, pussy to pussy, yuri",
      text:"lie with their legs scissored together, grinding their wet pussies against each other with motion lines, fingers laced together"},
    oral:{pose:"lying back with her legs spread around her lover's head",act:"cunnilingus",t:"cunnilingus, licking pussy, head between thighs, spread legs, yuri",
      text:"lies back with her legs spread as {partner} kneels between her thighs, licking her pussy, her hands buried in {partner}'s hair"},
    finger:{pose:"lying tangled with her lover, fingering each other",act:"fingering, mutual masturbation, kissing",t:"mutual masturbation, fingering, kissing, french kiss, tongue, saliva trail, yuri",
      text:"lie tangled together, kissing deeply with their tongues entwined, each with her fingers buried inside the other, wet sounds and motion lines"},
    sixtynine:{pose:"lying in a 69 with her lover",act:"69, cunnilingus",t:"69, cunnilingus, licking pussy, yuri, girl on top",
      text:"lie in a 69, {partner} on top, each with her face buried between the other's thighs, licking hungrily"},
    strapon:{pose:"lying on her back, taken with a strap-on",act:"strap-on, sex, vaginal",t:"strap-on, sex, vaginal, missionary, yuri, legs wrapped around",
      text:"lies on her back with her legs wrapped around {partner}, who is wearing a strap-on harness and thrusting it deep into her pussy with motion lines, their breasts pressed together"},
    lap:{pose:"sitting in her lover's lap, being fingered from behind",act:"fingering, sitting on lap, breast grab",t:"fingering from behind, sitting on lap, breast grab, grabbing another's breast, kissing neck, yuri",
      text:"sits in {partner}'s lap with her back to {partner}'s chest, {partner}'s fingers working inside her pussy and {partner}'s other hand squeezing her breast, kissing her neck"}};
  Object.values(POS).forEach(p=>START.option("posture",p.pose,GX));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on both women's faces and expressions, highly detailed skin, hair and eyes";
  const PJ={top:["{c} pajama shirt unbuttoned and hanging open","@c1"],panties:["lace panties pulled down around one ankle","@c2"]};
  const PJ2={top:["{c} pajama shirt unbuttoned and hanging open","@c1"]};
  const SW={top:["sweater pushed up over her breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"],panties:["lace panties pulled aside","@c2"]};
  const TEE={top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]};
  const face=(who,e)=>/^(covering|biting)/.test(e)?`${who} is ${e}`:`${who} has ${/^[aeiou]/i.test(e)?"an":"a"} ${e}`;
  let after="Academy Yuri";
  /* s: {head, place, narr[], pos, detail, g1, g2, ex1, ex2, t1, t2, tags, w1, w2} ; the girl is "the woman", her girlfriend {partner} */
  function set(label,pre,scen){
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],fr=PAL[h],frId=(tplById(ACAD.robes(fr))||tplById(fr+"robes")||{}).id;if(!frId)return null;
      const P=POS[s.pos],e1=EX[s.ex1],e2=EX[s.ex2];
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({},s.w1||{});
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const both=/^lie /.test(P.text);
      const act=both?`The woman and {partner}, her secret girlfriend, ${P.text}.`:`The woman ${P.text}; {partner} is her secret girlfriend.`;
      const scene=`Narration caption boxes tell the story across the image: ${s.narr.map(n=>`"${n.replace(/"/g,"'")}"`).join(", ")}. Setting: ${s.place}, ${ACC[h]}, blurry background, detailed foreground outlined in black. ${act} ${s.detail} ${face("The woman",e1)}; ${face("{partner}",e2)}. Two small speech bubbles: from the woman, "${s.g1}"; from {partner}, "${s.g2}". `+
        dd(`yuri, 2girls, secret relationship, lovers, couple, narration, caption, text box, english text, black outline, blurry background, ${P.t}, ${s.tags}, blush, sweat, pussy juice, moaning, speech bubble, heart`);
      const c1=Object.assign({},AROUSE,{expression:e1,posture:P.pose});
      return{id:pre+h,base:ACAD.robes(h),name:s.head,c:Object.assign({age:"woman"},c1),
        outfit:{oname:"Secret girlfriends",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:true,lewdtag:true,must:MUST,
          pair:{id:frId,outfit:"scene",scene,act:P.act,dir:"mutual",explicit:true,penis:false,couple:true,
            tags1:dd(`${s.t1}, looking at another`),tags2:dd(`${s.t2}, looking at another`),
            pc:{expression:e2,posture:null},c1,w1:{name:"Secret girlfriends",look:"boudoir",f:w1i},w2:{name:"Secret girlfriends",look:"boudoir",f:s.w2||{},m:{}},compact:false,fit:true}},
        tags:["yuri","secret girlfriends","narrated","duo","pair","explicit",h,fr],
        blurb:`“${s.head}.” ${cap(h)} and her secret girlfriend ${cap(fr)} (character 2), hiding it from their families.`};
    }).filter(Boolean),{after});
    after=label;
  }

  /* ======================= 1. Sleepover Excuse ======================= */
  set("Academy Secret Girlfriends: Sleepover Excuse","sg1",[
{head:"Mom Thinks It's Just a Sleepover",place:"her old bedroom at her parents' house at night, the hallway light glowing under the door",
  narr:["Mom thinks it's just a sleepover.","\"Lights out, girls!\" she called. We did turn the lights out."],pos:"scissor",
  detail:"Their matching pajamas lie tangled at the foot of the narrow bed, and a sliver of hallway light falls across them from under the door.",
  g1:"Shh... she's still up♡",g2:"Then be quiet for me♡",ex1:"cover",ex2:"love",t1:"covering own mouth",t2:"smile, half-closed eyes",tags:"bedroom, night, bed, pajamas, clothes on floor",w1:PJ,w2:PJ2},
{head:"\"Separate Sleeping Bags,\" Dad Said",place:"a living-room floor at night, two sleeping bags zipped into one, the TV glowing",
  narr:["Dad laid out two sleeping bags. Separate.","By midnight we'd zipped them into one."],pos:"oral",
  detail:"The two sleeping bags are zipped together into one, and the TV's blue glow flickers over them, a horror movie nobody's watching.",
  g1:"Ahh♡ ...is the movie still on?♡",g2:"Mmh♡ who cares♡",ex1:"quiet",ex2:"adore",t1:"arched back, hands in another's hair",t2:"head between thighs, licking",tags:"living room, sleeping bag, tv, night, floor",w1:PJ,w2:PJ2},
{head:"\"Study Group\" Every Friday",place:"her bedroom desk piled with textbooks and highlighters, a \"DO NOT DISTURB: STUDYING\" sign on the door",
  narr:["Every Friday: \"study group.\"","Her mom brings us snacks at 9. We have until 9."],pos:"lap",
  detail:"Open textbooks and highlighters scatter across the desk in front of them, a clock on the wall reading 8:47.",
  g1:"Thirteen minutes♡ ...don't stop♡",g2:"We'll study after♡",ex1:"lost",ex2:"love",t1:"sitting on lap, spread legs",t2:"kissing neck, hand between legs, breast grab",tags:"desk, textbook, sign, clock, chair",w1:SW,w2:{top:["{c} off-shoulder sweater dress","@c1"]}},
{head:"Her Parents' Room Is Right Next Door",place:"a guest room with thin walls at her girlfriend's family home, a nightlight glowing",
  narr:["The walls in this house are paper-thin.","So we learned to be very, very quiet."],pos:"finger",
  detail:"A muffled TV laugh track comes through the thin wall, and they press their foreheads together between kisses.",
  g1:"Mmh... quieter...♡",g2:"You're the loud one♡",ex1:"cover",ex2:"panic",t1:"hand over own mouth",t2:"giggling, finger to mouth",tags:"bedroom, thin walls, night, nightlight",w1:PJ,w2:PJ2},
{head:"Tent in the Backyard",place:"a little tent pitched in her parents' backyard at night, the house's kitchen light on across the lawn",
  narr:["\"Camping\" in the backyard, like old times.","Except this time we zipped the tent shut."],pos:"sixtynine",
  detail:"Through the open tent flap the kitchen window glows, her dad washing dishes inside, and a flashlight lies tipped over beside them.",
  g1:"He can't see us... right?♡",g2:"Mmh♡ don't stop♡",ex1:"lost",ex2:"adore",t1:"licking, face between thighs",t2:"licking, face between thighs",tags:"tent, camping, backyard, night, flashlight, outdoors",w1:{},w2:{}},
{head:"Breakfast Is in Ten Minutes",place:"her bedroom on a sunny morning, the smell of pancakes drifting up and her mom's voice calling up the stairs",
  narr:["\"Girls! Pancakes in ten minutes!\"","Ten minutes was plenty."],pos:"strapon",
  detail:"Morning sun pours over the tangled sheets, and a speech bubble from downstairs reads \"Pancakes!\"",
  g1:"C-coming, Mom!♡ ...literally♡",g2:"Ten minutes♡ Make them count♡",ex1:"tear",ex2:"love",t1:"legs wrapped around",t2:"strap-on, thrusting",tags:"bedroom, morning, sunlight, bed",w1:{},w2:{panties:["strap-on harness","black"]}}]);

  /* ======================= 2. Family Holidays ======================= */
  set("Academy Secret Girlfriends: Family Holidays","sg2",[
{head:"Christmas: \"My Best Friend Is Staying Over\"",place:"a guest room at her family's house on Christmas Eve, a tree's colored lights glowing under the door",
  narr:["Christmas at my parents'. \"My best friend is staying over.\"","My present was her."],pos:"oral",
  detail:"A red velvet Santa dress is pushed down to her waist, and a gift bow is stuck on her girlfriend's head.",
  g1:"Merry Christmas♡ ...ahh♡",g2:"Best present ever♡",ex1:"quiet",ex2:"adore",t1:"arched back, hands in another's hair",t2:"head between thighs, licking, bow",tags:"christmas, christmas lights, gift bow, santa costume, guest room",
  w1:{top:["red velvet Santa dress pulled down to the waist","red"]},w2:{top:["red velvet Santa dress pulled down to the waist","red"]}},
{head:"Thanksgiving: Grandma Asked When She's Getting Married",place:"her old bedroom during Thanksgiving dinner, the family's laughter and clinking glasses audible through the floor",
  narr:["Grandma asked me when I'm getting a boyfriend. Again.","I excused myself. So did she."],pos:"lap",
  detail:"A slice of pie sits forgotten on the dresser, and the family's laughter thumps up through the floorboards.",
  g1:"She'd die if she knew♡",g2:"Then let's give her a reason♡",ex1:"lost",ex2:"love",t1:"sitting on lap, spread legs",t2:"kissing neck, hand between legs",tags:"thanksgiving, bedroom, pie, holiday",w1:SW,w2:SW},
{head:"New Year's: The Kiss at Midnight",place:"a dark bathroom at her family's New Year's Eve party, the countdown roaring from the living room",
  narr:["\"10! 9! 8!\"","Everyone else got a kiss at midnight. So did I. Just not where they could see."],pos:"finger",
  detail:"Party streamers hang from her hair, and fireworks flash through the frosted bathroom window.",
  g1:"Happy new year♡ ...mmh♡",g2:"Same time next year?♡",ex1:"tear",ex2:"adore",t1:"party hat, streamers",t2:"kissing",tags:"new year, bathroom, fireworks, streamers, party hat, countdown",
  w1:{top:["cocktail dress pulled down to the waist","@c1"]},w2:{top:["cocktail dress pulled down to the waist","@c2"]}},
{head:"Her Cousin's Wedding: Both Bridesmaids",place:"the bridesmaids' dressing room at her cousin's wedding, two matching bouquets on the vanity",
  narr:["Two bridesmaids in matching dresses.","The whole family thinks we're just inseparable best friends. They're half right."],pos:"scissor",
  detail:"Their matching bridesmaid dresses are pulled down to their waists, and the wedding march is warming up through the door.",
  g1:"Someday... it'll be our wedding♡",g2:"Someday♡ Now hurry♡",ex1:"tear",ex2:"love",t1:"bridesmaid, matching outfits",t2:"bridesmaid, matching outfits",tags:"wedding, dressing room, bouquet, bridesmaid, matching outfits",
  w1:{top:["bridesmaid dress pulled down to the waist","@c1"]},w2:{top:["bridesmaid dress pulled down to the waist","@c1"]}},
{head:"Lunar New Year: \"When Will You Bring Home a Husband?\"",place:"a storeroom behind her family's restaurant on Lunar New Year, red lanterns and firecrackers outside",
  narr:["\"When will you bring home a husband?\"","Never, Auntie. Never."],pos:"oral",
  detail:"Red envelopes spill from her pocket onto the rice sacks, and firecrackers pop outside the little window.",
  g1:"Auntie's right outside♡",g2:"Then don't make a sound♡",ex1:"cover",ex2:"adore",t1:"hand over own mouth",t2:"head between thighs, licking",tags:"storeroom, red lantern, firecrackers, red envelope, qipao, new year",
  w1:{top:["qipao pulled down to the waist","red"]},w2:{top:["qipao pulled down to the waist","@c1"]}},
{head:"Summer Festival with the Whole Family",place:"behind the festival stalls at dusk, the family's voices among the crowd and fireworks overhead",
  narr:["The whole family came to the festival.","We said we were getting candy apples."],pos:"finger",
  detail:"Their yukata hang open off their shoulders, and fireworks light up their faces between kisses.",
  g1:"Mom's looking for us...♡",g2:"Let her look♡",ex1:"panic",ex2:"love",t1:"yukata, open clothes",t2:"yukata, open clothes",tags:"festival, fireworks, paper lantern, dusk, yukata, outdoors",
  w1:{top:["yukata pulled open off the shoulders","@c1"]},w2:{top:["yukata pulled open off the shoulders","@c2"]}}]);

  /* ======================= 3. Close Calls ======================= */
  set("Academy Secret Girlfriends: Close Calls","sg3",[
{head:"Mom Knocked",place:"her bedroom at her parents' house, the doorknob turning",
  narr:["*knock knock* \"Honey? Are you awake?\"","We'd never moved so fast in our lives."],pos:"sixtynine",
  detail:"The doorknob is turning and the door is cracked an inch, the blanket half thrown over them.",
  g1:"J-just a minute, Mom!!♡",g2:"Mmh♡ (don't stop)♡",ex1:"panic",ex2:"lost",t1:"looking at door, panicking",t2:"face between thighs, licking",tags:"bedroom, door, doorknob, knocking, blanket",w1:{},w2:{}},
{head:"Dad Came Home Early",place:"the living-room couch, headlights sweeping across the wall through the window",
  narr:["Headlights in the driveway. Dad was home early.","We had about thirty seconds."],pos:"lap",
  detail:"Car headlights sweep across the wall behind them, and their clothes are scattered across the living room.",
  g1:"Thirty seconds!!♡",g2:"Then cum in twenty♡",ex1:"panic",ex2:"love",t1:"sitting on lap, spread legs, looking at window",t2:"hand between legs, kissing neck",tags:"living room, couch, headlights, window, clothes on floor",w1:SW,w2:{}},
{head:"The Family Group Chat",place:"her bed, her phone buzzing on the pillow with a family video call",
  narr:["Mom started a video call. Camera ON.","I kept it pointed at the ceiling."],pos:"oral",
  detail:"Her phone lies on the pillow with a family video call ringing, the screen full of relatives' little faces.",
  g1:"H-hi Mom! I'm just... at the gym♡",g2:"Mmh♡",ex1:"panic",ex2:"adore",t1:"holding phone, video call",t2:"head between thighs, licking",tags:"bed, phone, video call, screen, incoming call",w1:TEE,w2:{}},
{head:"Grandma Moved In for the Summer",place:"a cramped bathroom at her parents' house, grandma's slippers outside the door",
  narr:["Grandma moved in for the summer. Into the room next to mine.","The bathroom has the only lock in the house."],pos:"finger",
  detail:"Grandma's fuzzy slippers are visible under the bathroom door, and the shower is running to cover the sound.",
  g1:"Is she still out there?♡",g2:"Mm-hm♡ Shh♡",ex1:"cover",ex2:"panic",t1:"hand over own mouth",t2:"finger to mouth, shushing",tags:"bathroom, shower, steam, door, slippers",w1:{},w2:{}},
{head:"The Car Outside Her Parents' House",place:"a car parked in front of her parents' house at night, the porch light on and the windows fogged",
  narr:["Five minutes to say goodnight.","The porch light flicked on. Dad was waiting up."],pos:"finger",
  detail:"The car windows are completely fogged, the porch light glowing through the condensation.",
  g1:"He's at the window!♡",g2:"He can't see through the fog♡",ex1:"panic",ex2:"love",t1:"looking at window",t2:"kissing",tags:"car interior, night, fogged window, porch light, steam",w1:SW,w2:SW},
{head:"She Almost Said \"Love You\" at Dinner",place:"under the tablecloth at a family dinner, everyone's legs visible",
  narr:["At dinner she almost said \"love you\" out loud.","So I punished her under the table."],pos:"finger",
  detail:"Under the long tablecloth her hand is buried between her girlfriend's thighs, the family's feet all around them.",
  g1:"Pass the salt...♡ ...ahh♡",g2:"Mmh♡ ...yes, Mom, delicious♡",ex1:"quiet",ex2:"lost",t1:"hand between legs, smug",t2:"biting lip, trembling",tags:"under table, tablecloth, dinner, hidden",w1:SW,w2:SW}]);

  /* ======================= 4. Just Roommates ======================= */
  set("Academy Secret Girlfriends: Just Roommates","sg4",[
{head:"\"We're Just Roommates\"",place:"their apartment's second bedroom, staged with a bed nobody sleeps in, the parents' voices in the living room",
  narr:["Her parents are visiting. \"We're just roommates.\"","The second bedroom is for show. We're using it anyway."],pos:"scissor",
  detail:"The staged second bedroom still has the price tag on the lamp, and her parents' voices drift from the living room.",
  g1:"Your dad's asking about the plumbing♡",g2:"Let him ask♡",ex1:"quiet",ex2:"love",t1:"legs entwined",t2:"legs entwined",tags:"bedroom, apartment, lamp, price tag",w1:{},w2:{}},
{head:"Hiding the Couple Photos",place:"their bedroom, framed couple photos turned face-down on every surface",
  narr:["We turned every photo face-down before they arrived.","We forgot the one on the nightstand."],pos:"oral",
  detail:"Framed photos of the two of them kissing lie face-down everywhere, except one on the nightstand.",
  g1:"The photo! ...later♡",g2:"Mmh♡ later♡",ex1:"lost",ex2:"adore",t1:"arched back, hands in another's hair",t2:"head between thighs, licking",tags:"bedroom, picture frame, face down, nightstand",w1:TEE,w2:{}},
{head:"One Bed, Two Pillows",place:"their bedroom with one bed and two pillows, her mother asking from the hallway why there's only one bed",
  narr:["\"Why is there only one bed, dear?\"","\"We... share. To save money.\""],pos:"strapon",
  detail:"A speech bubble from the hallway asks \"Why only one bed?\", and the bed creaks under them.",
  g1:"To... to save money♡",g2:"Very economical♡",ex1:"tear",ex2:"love",t1:"legs wrapped around",t2:"strap-on, thrusting",tags:"bedroom, bed, door, hallway",w1:{},w2:{panties:["strap-on harness","black"]}},
{head:"The Dinner Party for Her Parents",place:"their kitchen during a dinner party for her parents, the pots bubbling on the stove",
  narr:["Dinner for her parents. I'm \"helping in the kitchen.\"","The roast needed fifteen more minutes. So did we."],pos:"lap",
  detail:"Pots bubble on the stove behind them, an oven timer ticking down from 15:00.",
  g1:"The roast...♡",g2:"Can wait♡",ex1:"lost",ex2:"love",t1:"sitting on counter, spread legs",t2:"hand between legs, kissing neck",tags:"kitchen, stove, oven, timer, apron, counter",w1:SW,w2:{}},
{head:"Matching Rings on a Chain",place:"their bedroom, two matching rings hanging on a single chain around her neck",
  narr:["We bought rings. We can't wear them on our fingers. Not yet.","So I wear both, on a chain, under my shirt."],pos:"finger",
  detail:"The two matching rings on the chain around her neck swing between them as they kiss.",
  g1:"Someday on our fingers♡",g2:"Someday soon♡",ex1:"tear",ex2:"adore",t1:"necklace, ring",t2:"kissing",tags:"bedroom, necklace, chain, ring, couple rings",w1:{},w2:{}},
{head:"Their Parents Are Asleep Down the Hall",place:"their bedroom at night during the parents' visit, the guest room door shut down the hall",
  narr:["Both sets of parents. One weekend. One small apartment.","We waited until the snoring started."],pos:"sixtynine",
  detail:"Snoring drifts down the hall in a little speech bubble, and the clock reads 2:13.",
  g1:"Mmh♡ ...they're asleep, right?♡",g2:"Mm-hm♡",ex1:"cover",ex2:"lost",t1:"face between thighs, licking",t2:"face between thighs, licking",tags:"bedroom, night, clock, snoring",w1:{},w2:{}}]);

  /* ======================= 5. Dear Diary ======================= */
  set("Academy Secret Girlfriends: Dear Diary","sg5",[
{head:"Dear Diary: Mom Set Me Up on Another Blind Date",place:"her bedroom, her open diary on the pillow",
  narr:["Dear diary, Mom set me up on another blind date.","I went home with my girlfriend instead."],pos:"oral",
  detail:"Her open diary lies on the pillow, the newest entry ending in a little drawn heart.",
  g1:"Ahh♡ Better than any date♡",g2:"Mmh♡ write about this♡",ex1:"quiet",ex2:"adore",t1:"arched back, hands in another's hair",t2:"head between thighs, licking",tags:"bedroom, diary, book, pillow, heart",w1:SW,w2:{}},
{head:"Dear Diary: Dad Asked If I Was Seeing Anyone",place:"her girlfriend's bed, a diary held open in one hand",
  narr:["Dear diary, Dad asked if I'm seeing anyone.","I said no. I've never lied so badly."],pos:"lap",
  detail:"She holds her diary open in one hand, trying to write, while her girlfriend's fingers make it impossible.",
  g1:"I can't... write like this♡",g2:"Then just feel it♡",ex1:"lost",ex2:"love",t1:"holding diary, writing, sitting on lap",t2:"hand between legs, kissing neck",tags:"bed, diary, pen, writing",w1:TEE,w2:{}},
{head:"Dear Diary: Two Years Today",place:"a candlelit bedroom, a tiny anniversary cake with a \"2\" candle",
  narr:["Dear diary, two years today.","Nobody knows. Nobody can know. Nobody needs to."],pos:"scissor",
  detail:"A tiny cake with a \"2\" candle burns on the nightstand, rose petals on the sheets.",
  g1:"Happy anniversary♡",g2:"Two years♡ Forever more♡",ex1:"tear",ex2:"tear",t1:"tears of joy",t2:"tears of joy",tags:"bedroom, candle, cake, anniversary, rose petals",w1:{},w2:{}},
{head:"Dear Diary: I Almost Told Mom Today",place:"her bedroom at dusk, rain on the window",
  narr:["Dear diary, I almost told Mom today.","I couldn't. So I cried, and she held me, and then..."],pos:"finger",
  detail:"Rain streaks the window, and tear tracks are still drying on her cheeks as they kiss.",
  g1:"Someday I'll tell her♡",g2:"I'll be right there♡",ex1:"tear",ex2:"adore",t1:"tears, crying",t2:"wiping tears, kissing",tags:"bedroom, rain, window, dusk",w1:SW,w2:SW},
{head:"Dear Diary: Her Family Loves Me (as a Friend)",place:"the guest room at her girlfriend's family home, a welcome card on the dresser",
  narr:["Dear diary, her family loves me. As her \"best friend.\"","If only they knew what their best friend does to her."],pos:"strapon",
  detail:"A handwritten \"Welcome back, sweetie!\" card from her girlfriend's mother sits on the dresser.",
  g1:"Your mom made me cookies♡",g2:"And I'm making you cum♡",ex1:"lost",ex2:"love",t1:"legs wrapped around",t2:"strap-on, thrusting, smug",tags:"guest room, card, dresser",w1:{},w2:{panties:["strap-on harness","black"]}},
{head:"Dear Diary: Someday",place:"a rooftop at night under a full sky of stars, a blanket spread out",
  narr:["Dear diary, someday we won't have to hide.","Tonight, under the stars, we didn't."],pos:"sixtynine",
  detail:"A blanket is spread out on the rooftop under a sky full of stars, the city far below.",
  g1:"Someday♡",g2:"Someday♡ I promise♡",ex1:"adore",ex2:"adore",t1:"face between thighs, licking",t2:"face between thighs, licking",tags:"rooftop, night, starry sky, blanket, outdoors, cityscape",w1:{},w2:{}}]);
})();

/* ---- v186: ultra-realistic close-ups, built on the user's tests of four Penguin prompts (close-ups in natural light worked
   best; an indoor fireplace scene with a mug in hand was weakest). Five sets, cute to naked:
   Real: Portraits · Real: Cozy · Real: Lingerie · Real: Wet · Real: Nude
   Each scene is the tested recipe: Danbooru medium and photography tags (photorealistic, realistic, 3d, photo (medium),
   depth of field, bokeh, film grain, detailed skin, skin texture, realistic eyes …) + the girl's identity tags (hair and
   streaks, eyes, skin, freckles, figure) + a close-up in natural or ambient light in a setting of her own, few props.
   The anime defaults are swapped out: no black outline and no "anime style" line, and the Finish step's image style switches to Realistic
   (realistic quality tags, the anti-anime style guard) whenever one of these scenes is loaded. Runs as a solo scene in the Scene tab ("One prompt" = base | character).
   Adult women. Lingerie, Wet and Nude are held back by the safeguard like every explicit scene. */
(function(){
  if(!ACAD.HUM)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)",cap=s=>s[0].toUpperCase()+s.slice(1);
  const dd=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const REAL="photorealistic, realistic, 3d, photo (medium)";
  const FINISH="depth of field, bokeh, blurry background, detailed skin, skin texture, realistic eyes, detailed iris, eyelashes, lips, nose";
  /* v189: quality tags and the negative come from the Quality and UC tab: these scenes set its style to Realistic
     (pair.qStyle), which adds the realistic quality tags and the anti-anime style guard. Their style lead
     (photorealistic, realistic, 3d, photo (medium)) stays at the front of the prompt, where it steers most. */
  const MUST=`${REAL}, ${FINISH}`;
  /* each girl: identity tags, figure, accent color, her outdoor portrait setting + light, her room, her bath */
  const G={
    griffin:{id:"waist-length wavy chocolate-brown hair in a high half-up ponytail with red and gold streaks and a black underlayer, gold eyes, fair skin, a small mole beneath one eye",fig:"slender dancer's build, small-to-medium breasts",col:"crimson",
      out:"a castle courtyard at golden hour, crimson banners",light:"golden hour, warm sunlight, rim light",room:"a sunlit bedroom with crimson curtains",bath:"a marble bathtub, candles, crimson-and-gold tiles"},
    badger:{id:"hip-length very thick glossy yellow hair in a high half-up ponytail with mustard and chocolate streaks and a black underlayer, heterochromia, one yellow eye and one black eye, peachy fair skin, rosy cheeks",fig:"petite, enormous breasts, top-heavy",col:"mustard yellow",
      out:"a sunflower field in summer",light:"bright sunlight, soft rim light",room:"a cottage bedroom with a patchwork quilt",bath:"a clawfoot tub in a cottage bathroom, dried herbs"},
    raven:{id:"very long straight center-parted midnight-blue hair with storm-blue and bronze streaks, hime cut, bronze eyes, porcelain skin, soft freckles across the nose and cheeks, a beauty mark near the lips",fig:"slender, medium-large breasts",col:"midnight blue",
      out:"an observatory balcony at blue hour, the first stars out",light:"blue hour, soft ambient light",room:"a bedroom under a skylight at dusk",bath:"a dark-tiled bathroom under a skylight, stars above"},
    serpent:{id:"waist-length straight silky platinum-blonde hair with curtain bangs, green eyes, ringed irises, fair skin, large hoop earrings",fig:"curvy, large breasts",col:"emerald green",
      out:"a rainy city street at night, neon reflections",light:"neon bokeh, soft window light",room:"a penthouse bedroom with emerald velvet",bath:"an emerald marble bathtub, city lights through the window"},
    wolf:{id:"short tousled steel-gray wolf cut with white tips, ice-blue eyes, ivory skin, a faint scar through one eyebrow",fig:"toned athletic build, small-to-medium breasts",col:"charcoal gray",
      out:"a pine forest at dusk, a full moon rising",light:"dusk, cool ambient light, moonlight",room:"a log cabin bedroom with a fur throw",bath:"a rough stone outdoor shower among pines"},
    swan:{id:"very long pearl-white hair in a ballerina bun with dusty-rose and rose-gold strands, sky-blue eyes, pale ivory skin",fig:"tall, slender dancer's build, small-to-medium breasts",col:"pearl white",
      out:"a misty lakeside at dawn, white feathers drifting",light:"dawn, soft diffused light, mist",room:"a white bedroom with sheer curtains",bath:"a white freestanding bathtub, sheer curtains, morning light"},
    dragon:{id:"hip-length thick black hair in a high braided ponytail with crimson and gold streaks, gold eyes, light tan skin",fig:"fit, large breasts",col:"crimson red",
      out:"a lantern-lit night street, red lanterns overhead",light:"warm lantern light, night",room:"a bedroom with red silk drapes",bath:"a stone bathhouse with red lanterns"},
    stag:{id:"short chestnut-brown hair in a messy updo with gold highlights, forest-green eyes, caramel skin, soft dimples",fig:"very tall, lean, large breasts",col:"forest green",
      out:"a forest glade, dappled sunlight through the leaves",light:"dappled sunlight, soft natural light",room:"a forest cottage bedroom with ivy at the window",bath:"a mossy stone bath in the forest"},
    shark:{id:"mid-back steel-blue hair in high twin ponytails fading to white with coral-red tips, black eyes, ivory skin",fig:"tall, toned, medium breasts",col:"steel blue",
      out:"a beach at sunset, sea spray",light:"sunset, backlight, warm rim light",room:"a beach house bedroom, the ocean outside",bath:"an outdoor beach shower, the ocean behind"},
    penguin:{id:"very long straight black hair with white, ice-blue and pale gold streaks, heterochromia, one orange eye and one ice-blue eye, warm light-brown skin, freckles across her nose and cheeks, heart-shaped face",fig:"petite, very large breasts",col:"ice blue",
      out:"outdoors in the snow, snowflakes falling",light:"soft winter daylight, soft rim light",room:"a snowy cabin bedroom, snow past the frosted window",bath:"an outdoor onsen at night, snow on the rocks, lanterns"},
    fox:{id:"hip-length fluffy burnt-orange hair in a side ponytail with white tips, amber eyes, foxlike eyes, peachy fair skin, freckles across the nose and cheeks",fig:"curvy hourglass, large breasts",col:"burnt orange",
      out:"a shrine path of torii gates at dusk, paper lanterns",light:"dusk, warm lantern light",room:"a tatami room with paper screens",bath:"a cedar onsen bath at dusk, lanterns"},
    lovebird:{id:"very long voluminous creamsicle-orange hair in high twin ponytails with powder-blue and peach streaks, mint-green eyes, peachy fair skin, dimples",fig:"petite, soft, large breasts",col:"pastel pink",
      out:"a cherry blossom park in spring, petals falling",light:"soft spring daylight, pastel light",room:"a pastel bedroom with fairy lights",bath:"a pink bathtub full of bubbles and rose petals"},
    flamingo:{id:"long hot-pink hair in a high bun with salmon and white strands, heterochromia, one hot-pink eye and one white eye, warm light-brown skin, freckles, a beauty mark beneath one eye",fig:"tall, very large breasts, top-heavy",col:"hot pink",
      out:"palm trees at sunset, pink sky",light:"pink sunset light, warm rim light",room:"a pink villa bedroom with palm shadows",bath:"a gold bathtub in a pink villa bathroom"},
    kraken:{id:"very long straight black hair with deep-violet and teal streaks, heterochromia, one crimson eye and one deep-violet eye, pale ivory skin, a small mole beneath one eye",fig:"petite, very large breasts, top-heavy",col:"deep violet",
      out:"an aquarium tunnel, fish and blue light all around",light:"shimmering blue underwater light, caustics",room:"a bedroom lit by an aquarium wall",bath:"a dark bathroom lit by an aquarium wall, blue caustics"},
    salmon:{id:"mid-thigh-length straight glossy salmon-pink hair with black and rose-gold streaks, rose-gold eyes, peachy fair skin, dense freckles all over her face and shoulders, a beauty mark beneath one eye",fig:"voluptuous hourglass, medium-large breasts",col:"salmon pink",
      out:"a riverside at golden hour, cherry trees",light:"golden hour, warm sunlight",room:"a minimalist bedroom with cherry-wood accents",bath:"a cherry-wood soaking tub with a river view"},
    crow:{id:"long wavy ink-blue hair in face-framing layers with silver-white and lavender strands, lavender eyes, rosy fair skin, light freckles across the nose, dimples",fig:"short, slim, large breasts",col:"ink blue",
      out:"a rooftop at night, city lights",light:"night, city bokeh, soft ambient light",room:"an attic bedroom full of trinkets",bath:"a clawfoot tub in an attic, trinkets on the sill, moonlight"},
    owl:{id:"very long thick feathery caramel-brown hair with espresso and honey-gold streaks, amber eyes, large round eyes, ivory skin, faint speckled freckles, a beauty mark beneath one eye",fig:"tall, pear-shaped, large soft breasts",col:"caramel brown",
      out:"by a tall library window at night, a full moon",light:"warm lamp light, moonlight",room:"a book-lined bedroom lit by a single lamp",bath:"an old-fashioned bathtub at night, books stacked beside it"},
    rat:{id:"very long ash-gray hair in a thin low braid with rose-pink and silver strands, rose-red eyes, porcelain skin, light freckles across the nose, a beauty mark above the lip",fig:"compact, toned, medium breasts",col:"rose pink",
      out:"a neon alley at night, string lights",light:"neon light, soft ambient light",room:"a cluttered apartment bedroom with string lights",bath:"a cramped bathtub under string lights"}};
  [["top","{c} chunky knit sweater","CU","casual,cottage"],["neckAccessory","{c} chunky knit scarf","CU","casual,cottage"],["top","{c} oversized sweater slipping off one shoulder","CU","casual"],
   ["bra","{c} lace bra","LS","boudoir"],["panties","{c} lace panties","LS","boudoir"],["top","white towel wrapped around her body","US","casual"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const EX={bright:"bright cheerful smile, parted lips",gentle:"gentle smile with a soft blush",shy:"shy smile, blush, parted lips",flushed:"flushed cheeks, parted lips, half-closed eyes",relaxed:"relaxed smile, half-closed eyes, flushed cheeks"};
  Object.values(EX).forEach(v=>START.option("expression",v,GX));
  ACAD.REALG=G;   /* v187: shared with the ultra-anime sets */
  let after="Academy Secret Girlfriends: Dear Diary";
  /* tier: {label, pre, name(g), frame, ex, outfit(g), place(g), extra, explicit, nsfw, items(g), pose} */
  function tier(T){
    START.option("posture",T.pose,GX);
    START.add(T.label,HS.map(h=>{
      const g=G[h],nm=cap(h);
      const solo=dd(`${T.frame}, looking at viewer, ${nm}, ${g.id}, ${g.fig}, ${EX[T.ex]}, ${T.outfit(g)}, ${T.place(g)}, ${T.extra||""}, ${FINISH}${T.nsfw?", "+T.nsfw:""}`);
      const items=T.items?T.items(g):{};
      const c1={age:"woman",expression:EX[T.ex],posture:T.pose};
      return{id:T.pre+h,base:ACAD.robes(h),name:`${nm}: ${T.name(g)}`,c:c1,
        outfit:{oname:T.short,look:T.explicit?"boudoir":"casual",items,details:{},dcol:{}},more:[],nude:true,
        out:{framing:T.framing,explicit:!!T.explicit,lewdtag:!!T.lewd,must:MUST,
          pair:{id:"",outfit:"scene",solo,soloCount:"1girl, solo, "+REAL,scene:solo,act:"",dir:"mutual",explicit:!!(T.explicit||T.lewd),penis:false,ultra:true,qStyle:"real",
            c1,w1:{name:T.short,look:"casual",f:items},compact:true,fit:true}},
        tags:["realistic","photorealistic","3d","close-up","single scene",h].concat(T.explicit?["explicit","nude"]:T.lewd?["lewd"]:["cute"]),
        blurb:`Ultra-realistic ${T.short.toLowerCase()} of ${nm}. Use the Scene tab's One prompt; the image style in Finish switches to Realistic for it.`};
    }),{after});
    after=T.label;
  }
  tier({label:"Academy Real: Portraits",pre:"rp",short:"Portrait",frame:"close-up, portrait",framing:"portrait",ex:"bright",pose:"posing for a close-up portrait",
    name:g=>"portrait",outfit:g=>`${g.col} chunky knit sweater, ${g.col} knit scarf`,place:g=>g.out+", outdoors",
    items:g=>({top:["{c} chunky knit sweater",g.col],neckAccessory:["{c} chunky knit scarf",g.col]})});
  /* cozy: window light instead of firelight, no props in hand (the tested fireplace-and-mug version was the weakest) */
  tier({label:"Academy Real: Cozy",pre:"rc",short:"Cozy",frame:"close-up, upper body",framing:"upper body",ex:"gentle",pose:"sitting by a window in soft light",
    name:g=>"cozy by the window",outfit:g=>`oversized ${g.col} sweater slipping off one shoulder, bare shoulder, collarbone`,place:g=>g.room+", sitting by a window, soft window light, morning",
    items:g=>({top:["{c} oversized sweater slipping off one shoulder",g.col]})});
  tier({label:"Academy Real: Lingerie",pre:"rl",short:"Lingerie",frame:"close-up, upper body, from above",framing:"upper body",ex:"shy",pose:"lying on her back on a bed",lewd:true,
    name:g=>"lace lingerie",outfit:g=>`${g.col} lace bra, lace trim, cleavage`,place:g=>g.room+", lying on bed, on back, hair spread across the pillow, white sheets, morning light, window light, soft shadows",
    items:g=>({bra:["{c} lace bra",g.col],panties:["{c} lace panties",g.col]})});
  tier({label:"Academy Real: Wet",pre:"rw",short:"Wet",frame:"close-up, upper body",framing:"upper body",ex:"flushed",pose:"standing under a shower in a towel",lewd:true,explicit:true,
    name:g=>"towel and shower",outfit:g=>"white towel wrapped around her body, slipping, cleavage, wet skin, wet hair, water droplets, steam",place:g=>g.bath+", soft light, steam",
    items:()=>({top:["white towel wrapped around her body","white"]})});
  tier({label:"Academy Real: Nude",pre:"rn",short:"Nude",frame:"close-up, upper body",framing:"upper body",ex:"relaxed",pose:"relaxing in a bath, partially submerged",lewd:true,explicit:true,
    name:g=>"bath",outfit:g=>"completely nude, nipples, partially submerged, wet skin, wet hair, water droplets, steam",place:g=>g.bath,items:()=>({})});
})();

/* ---- v187: five ultra-anime close-up sets, the anime counterpart of the v186 realistic sets (same girls, same identity
   tags, same cute-to-naked range): Anime: Portraits · Anime: Cozy · Anime: Lingerie · Anime: Wet · Anime: Nude
   Style tags researched against Danbooru and the image generator's docs and placed first, where they steer most:
     official art, anime coloring, key visual, game cg (polished promotional/game-art look, better shading than screencaps)
     cel shading (crisp anime shadows); the quality tags come from the Anime image style in Finish
   plus anime eye and hair detail (sparkling eyes, detailed eyes, glossy hair, shiny hair) and anime light effects (light
   particles, sparkle, glint, lens flare, bloom, rim lighting, backlighting). The Anime style guard in Finish (anti-realism tags) keeps
   (3d, realistic, photorealistic, photo (medium) …) so these never drift toward the realistic sets.
   Adult women. Lingerie, Wet and Nude are held back by the safeguard like every explicit scene. */
(function(){
  const G=ACAD.REALG;if(!G||!ACAD.HUM)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)",cap=s=>s[0].toUpperCase()+s.slice(1);
  const dd=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const STYLE="official art, anime coloring, key visual, game cg, cel shading";
  /* v189: quality tags and the negative come from the Quality and UC tab: these scenes set its style to Anime
     (pair.qStyle), which adds the anime quality tags and the anti-realism style guard */
  const FINISH="sparkling eyes, detailed eyes, beautiful detailed eyes, glossy hair, shiny hair, detailed hair, light particles, sparkle, glint, bloom, rim lighting, depth of field, blurry background, vibrant colors";
  const MUST="official art, anime coloring, cel shading, sparkling eyes, glossy hair";
  /* anime light and mood per girl, layered over her v186 setting */
  const FX={griffin:"lens flare, golden light",badger:"sunflower petals, sunbeam",raven:"starry sky, shooting star",serpent:"rain, neon lights, reflections",wolf:"moonlight, fireflies",
    swan:"floating feathers, morning mist",dragon:"floating embers, paper lanterns",stag:"falling leaves, sunbeam",shark:"sunset, water splash",penguin:"falling snowflakes, breath",
    fox:"floating lanterns, spirit fire",lovebird:"falling petals, cherry blossoms, hearts",flamingo:"pink sky, palm leaves",kraken:"bubbles, caustics, underwater light",salmon:"cherry blossoms, river reflections",
    crow:"city lights, glittering particles",owl:"full moon, floating dust motes",rat:"neon lights, string lights"};
  const EX={bright:"bright cheerful smile, open mouth, sparkling eyes",gentle:"gentle smile with a soft blush",shy:"shy smile, blush, parted lips",flushed:"flushed cheeks, parted lips, half-closed eyes",relaxed:"relaxed smile, half-closed eyes, flushed cheeks"};
  Object.values(EX).forEach(v=>START.option("expression",v,GX));
  let after="Academy Real: Nude";
  function tier(T){
    START.option("posture",T.pose,GX);
    START.add(T.label,HS.map(h=>{
      const g=G[h],nm=cap(h);
      const solo=dd(`${T.frame}, looking at viewer, ${nm}, ${g.id}, ${g.fig}, ${EX[T.ex]}, ${T.outfit(g)}, ${T.place(g)}, ${FX[h]}, ${FINISH}`);
      const items=T.items?T.items(g):{};
      const c1={age:"woman",expression:EX[T.ex],posture:T.pose};
      return{id:T.pre+h,base:ACAD.robes(h),name:`${nm}: ${T.name}`,c:c1,
        outfit:{oname:T.short,look:T.explicit?"boudoir":"casual",items,details:{},dcol:{}},more:[],nude:true,
        out:{framing:T.framing,explicit:!!T.explicit,lewdtag:!!T.lewd,must:MUST,
          pair:{id:"",outfit:"scene",solo,soloCount:"1girl, solo, "+STYLE,scene:solo,act:"",dir:"mutual",explicit:!!(T.explicit||T.lewd),penis:false,ultra:true,qStyle:"anime",
            c1,w1:{name:T.short,look:"casual",f:items},compact:true,fit:true}},
        tags:["anime","official art","close-up","single scene",h].concat(T.explicit?["explicit","nude"]:T.lewd?["lewd"]:["cute"]),
        blurb:`Ultra-anime ${T.short.toLowerCase()} of ${nm}. Use the Scene tab's One prompt; the image style in Finish switches to Anime for it.`};
    }),{after});
    after=T.label;
  }
  tier({label:"Academy Anime: Portraits",pre:"ap",short:"Portrait",name:"anime portrait",frame:"close-up, portrait, dynamic angle, wind, floating hair",framing:"portrait",ex:"bright",pose:"posing for a close-up portrait, hair blowing in the wind",
    outfit:g=>`${g.col} chunky knit sweater, ${g.col} knit scarf`,place:g=>g.out+", outdoors",items:g=>({top:["{c} chunky knit sweater",g.col],neckAccessory:["{c} chunky knit scarf",g.col]})});
  tier({label:"Academy Anime: Cozy",pre:"ac",short:"Cozy",name:"cozy by the window",frame:"close-up, upper body",framing:"upper body",ex:"gentle",pose:"sitting by a window in soft light",
    outfit:g=>`oversized ${g.col} sweater slipping off one shoulder, bare shoulder, collarbone`,place:g=>g.room+", sitting by a window, soft window light, sunbeam",items:g=>({top:["{c} oversized sweater slipping off one shoulder",g.col]})});
  tier({label:"Academy Anime: Lingerie",pre:"al",short:"Lingerie",name:"lace lingerie",frame:"close-up, upper body, from above",framing:"upper body",ex:"shy",pose:"lying on her back on a bed",lewd:true,
    outfit:g=>`${g.col} lace bra, lace trim, cleavage`,place:g=>g.room+", lying on bed, on back, hair spread across the pillow, white sheets, morning light",items:g=>({bra:["{c} lace bra",g.col],panties:["{c} lace panties",g.col]})});
  tier({label:"Academy Anime: Wet",pre:"aw",short:"Wet",name:"towel and shower",frame:"close-up, upper body",framing:"upper body",ex:"flushed",pose:"standing under a shower in a towel",lewd:true,explicit:true,
    outfit:()=>"white towel wrapped around her body, slipping, cleavage, wet skin, wet hair, water droplets, steam, shiny skin",place:g=>g.bath+", steam",items:()=>({top:["white towel wrapped around her body","white"]})});
  tier({label:"Academy Anime: Nude",pre:"an",short:"Nude",name:"bath",frame:"close-up, upper body",framing:"upper body",ex:"relaxed",pose:"relaxing in a bath, partially submerged",lewd:true,explicit:true,
    outfit:()=>"completely nude, nipples, partially submerged, wet skin, wet hair, water droplets, steam, shiny skin",place:g=>g.bath,items:()=>({})});
})();

/* ---- v206: three sets of cosplay punishment scenes, built on the user's own prompt (a headline, the faceless man, one
   position weighted hard, a trembling speech bubble, an angry-but-loving-it face and three lines of sound effects).
   It is a roleplay the two of them are playing, and she is a willing, mouthy brat: caught red-handed at a pretend job,
   daring him to punish her and loving every second. Adult women and men only; explicit, so the safeguard holds it like
   every explicit scene.
     Academy Cosplay Punishment: On the Clock     12 service jobs
     Academy Cosplay Punishment: In Uniform       12 uniformed jobs
     Academy Cosplay Punishment: Office Hours     12 professional jobs
   36 jobs; every girl gets one in each set (the first twelve girls one each, the last six a second round with their own
   line). Each scene is built for the Scene step: character 2 is the faceless man (his work clothes are his tags), the
   headline, her line and the sound effects are Text and sound items, her face is a scene expression, and the emphasis
   is Strongest. */
(function(){
  if(!ACAD.HUM||!window.PAIR||!window.PAIR_TEXT)return;
  const {HD,HS}=ACAD.HUM,GX="Explicit (adult)";
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";
  /* her face: furious and flustered, tears of pleasure, plainly loving it */
  const EX1="heavy blush, angry, v-shaped eyebrows, glaring, clenched teeth, teary eyes, tears, sweat, trembling";
  const FACE="She glares up at {him}, furious and flustered, tears of pleasure in her eyes, but she is grinning through her clenched teeth and plainly loving every second of her punishment.";
  const SFX=[["hearty","ah ah ah ah ah"],["lewd","thrust thrust"],["big","plap plap"]];
  const TAGS1="open clothes, breasts out, panties around one ankle, cosplay";
  const BASE_TAGS="cosplay, roleplay, brat, caught, motion lines, sweat, moaning, cum in pussy";

  /* every outfit piece the scenes use, so they are in the catalog for anyone */
  const ITEMS=[];
  const need=w=>Object.entries(w).forEach(([f,a])=>ITEMS.push([f,a[0]]));

  /* scenario: {k, job, head, man, place, text, pose, act, pov, lines[2], tags, w1}; {partner} {his} {he} {him} {cock} = the man */
  const ON_THE_CLOCK=[
{k:"nurse",job:"Nurse",head:"The Doctor Caught Her Stealing Pills",man:"white doctor's coat, id card, stethoscope, dress shirt, pants, belt",
  text:"In the hospital supply closet, {partner}, the doctor in his white coat with his ID badge, pins her against the shelves and lifts her up, thrusting his {cock} into her as she wraps her legs around his waist, a spilled pill bottle rattling on the floor.",
  pose:"lifted against a wall, legs wrapped around her lover's waist",act:"sex, vaginal, standing sex, against wall, legs around waist",pov:false,
  lines:["Is that all you've got, Doctor? Punish me properly!","FUCK you... don't you dare stop!"],tags:"nurse, hospital, supply closet, pill bottle, against wall",
  w1:{top:["nurse dress unbuttoned over bare breasts","@c1"],headwear:["nurse cap","@light"],neckAccessory:["stethoscope","silver"],panties:["panties around one ankle","@light"]}},
{k:"flight",job:"Flight attendant",head:"The Captain Caught Her Drinking the First-Class Champagne",man:"pilot uniform, captain's hat, pilot epaulettes, aviator wings pin, pants, belt",
  text:"In the empty first-class cabin at 30,000 feet, {partner}, the captain with gold stripes on his sleeves, bends her over a leather seat and takes her from behind, a half-empty champagne bottle tipped over on the tray table.",
  pose:"bent over an airplane seat, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over, doggystyle",pov:false,
  lines:["Fasten your seatbelt, Captain... I'm not sorry!","Turbulence? Is that the best you can do?"],tags:"flight attendant, airplane interior, first class, champagne bottle, bent over",
  w1:{top:["flight attendant blouse unbuttoned over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@c1"],neckAccessory:["flight attendant neck scarf","@c2"],headwear:["flight attendant cap","@c1"]}},
{k:"maid",job:"Maid",head:"The Master Caught His Maid Trying On the Mistress's Jewelry",man:"black tailcoat, white dress shirt, vest, pants, belt",
  text:"In the mansion's master bedroom, {partner}, the master of the house in his tailcoat, pins her face-down on the silk sheets in a prone bone, the mistress's pearls still swinging around her neck.",
  pose:"lying face-down on a bed, hips raised",act:"sex, vaginal, prone bone, lying on stomach, sex from behind",pov:false,
  lines:["The pearls look better on me and you know it!","Go on, Master... punish the naughty maid!"],tags:"maid, mansion, bedroom, pearl necklace, prone bone",
  w1:{top:["maid dress pulled down to the waist","@dark"],waistAccessory:["frilled maid apron","white"],headwear:["maid headdress","white"],neckAccessory:["pearl necklace","white"]}},
{k:"barista",job:"Barista",head:"The Manager Caught Her Skimming the Tip Jar",man:"manager's polo shirt, name tag, khaki pants, belt",
  text:"Behind the café counter after closing, {partner}, the manager with his name tag, sits her up on the counter between the espresso machine and the tip jar and fucks her hard, coffee beans scattering everywhere.",
  pose:"sitting on a counter with her legs spread around her lover",act:"sex, vaginal, sitting on counter, legs around waist",pov:true,
  lines:["It was ONE dollar! ...okay, forty. Make me pay it back!","Extra shot, boss... harder!"],tags:"barista, cafe, counter, espresso machine, tip jar, sitting on counter",
  w1:{top:["barista shirt unbuttoned over bare breasts","@light"],waistAccessory:["barista apron","@c1"],headwear:["barista cap","@c1"]}},
{k:"waitress",job:"Waitress",head:"The Chef Caught Her Eating a Customer's Dessert",man:"chef's whites, chef's hat, neckerchief, apron, pants",
  text:"In the restaurant's walk-in kitchen, {partner}, the head chef in his whites, lays her back on the steel prep table in the missionary position, whipped cream still on her lips and a half-eaten slice of cake beside her head.",
  pose:"lying on her back on a table, legs spread",act:"sex, vaginal, missionary, on table, legs spread",pov:true,
  lines:["It was the best cake I've ever had... and so is this!","Send me back to the kitchen, Chef... I dare you!"],tags:"waitress, restaurant kitchen, cake, whipped cream, food on face, missionary, on table",
  w1:{top:["waitress dress unbuttoned over bare breasts","@c1"],waistAccessory:["frilled waitress apron","white"],legwear:["white thigh-high stockings","white"]}},
{k:"bartender",job:"Bartender",head:"The Owner Caught Her Drinking the Top-Shelf Whiskey",man:"black dress shirt with rolled sleeves, vest, slacks, belt",
  text:"Behind the dim cocktail bar, {partner}, the owner with his sleeves rolled up, bends her over the bar top and takes her from behind, the expensive whiskey bottle open and a tumbler knocked over.",
  pose:"bent over a bar counter, gripping its edge",act:"sex, vaginal, sex from behind, bent over, standing sex",pov:false,
  lines:["Put it on my tab, boss... all of it!","It's twenty years old, I HAD to try it!"],tags:"bartender, bar, bar counter, whiskey bottle, tumbler, bent over",
  w1:{top:["bartender vest open over bare breasts","@dark"],neckAccessory:["bow tie","@c1"],bottom:["skirt hiked up around the waist","@dark"]}},
{k:"hotel",job:"Hotel receptionist",head:"The Manager Caught Her Sleeping in the Penthouse Suite",man:"hotel manager's suit, gold name badge, dress shirt, tie, pants, belt",
  text:"In the penthouse suite she gave herself for the night, {partner}, the hotel manager in his suit, takes her in a mating press on the enormous bed, her legs pinned back by her shoulders, the city skyline behind them.",
  pose:"lying folded on her back, legs pinned back by her shoulders",act:"sex, vaginal, mating press, legs up",pov:false,
  lines:["The bed was EMPTY, what was I supposed to do?!","Charge it to my room... harder!"],tags:"hotel receptionist, hotel room, penthouse, city lights, mating press",
  w1:{top:["hotel receptionist blazer and blouse open over bare breasts","@c1"],neckAccessory:["neck scarf","@c2"],tagCharm:["name badge","@metal"]}},
{k:"casino",job:"Casino dealer",head:"The Pit Boss Caught Her Stacking the Deck",man:"black suit, red tie, dress shirt, pants, belt",
  text:"On the green felt of the blackjack table, {partner}, the pit boss in his black suit, has her riding him in the cowgirl position, playing cards and poker chips scattered around them.",
  pose:"riding on top, straddling her lover",act:"sex, vaginal, cowgirl position, girl on top, straddling",pov:true,
  lines:["House always wins? Not tonight, boss!","Deal me in... all in!"],tags:"casino, card dealer, blackjack table, playing card, poker chip, cowgirl position",
  w1:{top:["casino dealer vest open over bare breasts","@dark"],neckAccessory:["bow tie","@c1"],bottom:["short skirt hiked up around the waist","@dark"],wristAccessory:["sleeve garters","@c1"]}},
{k:"pizza",job:"Pizza delivery girl",head:"The Customer Caught Her Eating a Slice of His Pizza",man:"t-shirt, sweatpants",
  text:"In the doorway of his apartment, {partner}, the customer in his t-shirt, holds her up against the door frame and fucks her standing, the pizza box open on the floor with one slice missing.",
  pose:"standing on one leg, the other lifted against her lover",act:"sex, vaginal, standing sex, leg lift, against wall",pov:false,
  lines:["It's called quality control!","No tip? Then take it out of me!"],tags:"pizza delivery, pizza box, doorway, apartment, standing sex, leg lift",
  w1:{top:["delivery polo shirt pulled up over her breasts","@c1"],headwear:["delivery cap","@c1"],bottom:["shorts pulled down to the thighs","@dark"]}},
{k:"masseuse",job:"Spa masseuse",head:"The Client Caught Her Napping on the Massage Table",man:"white spa robe hanging open",
  text:"In the candlelit spa room, {partner}, the client in a spa robe, takes her on her side on the massage table in the spooning position, massage oil glistening on her skin.",
  pose:"lying on her side, one leg lifted",act:"sex, vaginal, spooning, sex from behind, lying on side",pov:false,
  lines:["Full-body treatment, sir... no refunds!","I was resting my eyes! Okay, okay, punish me!"],tags:"masseuse, spa, massage table, candle, oil, shiny skin, spooning",
  w1:{top:["spa tunic hanging open over bare breasts","@light"],bottom:["spa pants pulled down","@c1"]}},
{k:"cashier",job:"Cashier",head:"The Store Manager Caught Her Scratching Lottery Tickets",man:"store manager's shirt, name tag, tie, khaki pants, belt",
  text:"In the stockroom of the convenience store, {partner}, the store manager with his name tag, sits her in his lap on an office chair, her bouncing in the reverse cowgirl position, a pile of scratched lottery tickets on the desk.",
  pose:"sitting in her lover's lap facing away from him",act:"sex, vaginal, reverse cowgirl position, sitting on lap",pov:false,
  lines:["I won five dollars! ...Fine. Take it out of my ass!","Scan THIS, manager!"],tags:"cashier, convenience store, stockroom, lottery ticket, office chair, reverse cowgirl position",
  w1:{top:["store polo shirt pulled up over her breasts","@c1"],waistAccessory:["store apron","@c2"],tagCharm:["name tag","white"]}},
{k:"bunny",job:"Bunny-girl hostess",head:"The Club Owner Caught Her Sneaking Drinks from Every Tray",man:"white tuxedo jacket, black bow tie, dress shirt, pants, belt",
  text:"In the VIP lounge of the night club, {partner}, the owner in his white tuxedo, lifts her into a full nelson, her legs spread high and her arms locked back as he fucks her, a tray of empty glasses on the floor.",
  pose:"held up from behind in a full nelson, legs spread",act:"sex, vaginal, full nelson, legs up, spread legs",pov:false,
  lines:["Every tray... and I'd do it AGAIN!","Is this my punishment or my bonus?!"],tags:"bunny girl, playboy bunny, night club, vip room, serving tray, full nelson",
  w1:{top:["bunny suit pulled down to the waist","@c1"],headwear:["bunny ears headband","@c1"],legwear:["fishnet pantyhose","black"],wristAccessory:["white wrist cuffs","white"],neckAccessory:["bow tie collar","@c2"]}}];

  const IN_UNIFORM=[
{k:"police",job:"Police officer",head:"The Sergeant Caught Her Taking a Bribe",man:"police uniform, police badge, duty belt, uniform shirt, pants",
  text:"In the precinct's interrogation room, {partner}, the sergeant with his badge, bends her over the steel table and fucks her from behind, an envelope of cash and her own handcuffs on the table beside her.",
  pose:"bent over a table, arms stretched out",act:"sex, vaginal, sex from behind, bent over, bent over table",pov:false,
  lines:["You have the right to remain... harder!","Book me, Sergeant! I'll never talk!"],tags:"police, policewoman, interrogation room, table, handcuffs, money, bent over",
  w1:{top:["police shirt unbuttoned over bare breasts","@c1"],headwear:["police hat","@dark"],belt:["police duty belt","black"],bottom:["pencil skirt hiked up around the waist","@dark"]}},
{k:"firefighter",job:"Firefighter",head:"The Fire Chief Caught Her Sleeping Through the Alarm",man:"firefighter turnout pants, suspenders, fire chief's helmet",
  text:"In the firehouse bunk room, {partner}, the fire chief in his turnout pants and suspenders, takes her doggystyle on the bunk, the alarm light still flashing red above the door.",
  pose:"on all fours on a bed, back arched",act:"sex, vaginal, doggystyle, all fours, sex from behind",pov:false,
  lines:["I was dreaming about you, Chief! Put me out!","Too hot to handle? Prove it!"],tags:"firefighter, fire station, bunk bed, alarm, red light, doggystyle, all fours",
  w1:{top:["firefighter jacket hanging open over bare breasts","@c1"],bottom:["firefighter pants pulled down","@c1"],headwear:["firefighter helmet","@c1"]}},
{k:"security",job:"Security guard",head:"The Night Supervisor Caught Her Asleep on the Monitors",man:"security uniform, security badge, flashlight, pants, belt",
  text:"In the security booth lit by a wall of camera monitors, {partner}, the night supervisor with his flashlight, has her riding him on the swivel chair, every screen showing them.",
  pose:"riding her lover on a chair, hands on his shoulders",act:"sex, vaginal, cowgirl position, sitting on lap, straddling",pov:true,
  lines:["Good thing the cameras are on... smile!","I'm awake now! VERY awake!"],tags:"security guard, security office, monitor, surveillance camera, office chair, straddling",
  w1:{top:["security guard shirt unbuttoned over bare breasts","@dark"],headwear:["security cap","@dark"],belt:["utility belt","black"]}},
{k:"lifeguard",job:"Lifeguard",head:"The Head Lifeguard Caught Her Tanning Instead of Watching",man:"red swim trunks, whistle, lifeguard tank top",
  text:"On the lifeguard tower above the beach, {partner}, the head lifeguard in his red trunks, takes her in the missionary position on a beach towel, her sunglasses knocked askew and a tube of sunscreen beside her.",
  pose:"lying on her back on a towel, legs spread",act:"sex, vaginal, missionary, lying on back",pov:true,
  lines:["The sun was RIGHT there! Rescue me then!","Whistle all you want, I'm not getting up!"],tags:"lifeguard, beach, lifeguard tower, towel, sunscreen, sunglasses, missionary",
  w1:{top:["lifeguard swimsuit pulled down to the waist","@c1"],neckAccessory:["lifeguard whistle","silver"],eyewear:["sunglasses on her head","black"]}},
{k:"soldier",job:"Soldier",head:"The Drill Sergeant Caught Her Sneaking Off Base",man:"military fatigues, dog tags, combat boots, drill sergeant hat",
  text:"In the barracks, {partner}, the drill sergeant with his dog tags, pins her against the lockers and lifts her, fucking her standing as she wraps her legs around his waist, her boots dangling.",
  pose:"lifted against lockers, legs wrapped around her lover's waist",act:"sex, vaginal, standing sex, against wall, legs around waist",pov:false,
  lines:["Sir, yes, sir! Harder, sir!","Drop and give you twenty? Make me!"],tags:"soldier, military, barracks, locker, dog tags, against wall",
  w1:{top:["military jacket open over bare breasts","@c1"],headwear:["military cap","@c1"],neckAccessory:["dog tags","silver"],legwear:["combat boots","black"]}},
{k:"mail",job:"Mail carrier",head:"The Postmaster Caught Her Reading Everyone's Mail",man:"postal uniform shirt, postal cap, pants, belt",
  text:"In the back of the post office sorting room, {partner}, the postmaster in his uniform, has her bent over a mail cart full of letters, opened envelopes and love letters spilling everywhere.",
  pose:"bent over a cart, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over, looking back",pov:false,
  lines:["Special delivery... and it's for ME!","Return to sender? Never!"],tags:"mail carrier, post office, letter, envelope, mail cart, bent over",
  w1:{top:["postal shirt unbuttoned over bare breasts","@c1"],headwear:["postal cap","@c1"],bottom:["work shorts pulled down","@dark"],hipAccessory:["mail satchel","@c2"]}},
{k:"ranger",job:"Park ranger",head:"The Head Ranger Caught Her Roasting Marshmallows on Duty",man:"park ranger shirt, ranger hat, badge, cargo pants, belt",
  text:"In the ranger station at dusk, {partner}, the head ranger in his wide-brimmed hat, takes her from behind against the window, pine trees and a campfire outside, a melted marshmallow on a stick on the sill.",
  pose:"standing, hands braced on a window, bent forward",act:"sex, vaginal, standing sex, sex from behind, against glass",pov:false,
  lines:["The bears won't tell! Will you?","Smokey says only YOU can punish me!"],tags:"park ranger, forest, cabin, window, marshmallow, against glass, standing sex",
  w1:{top:["park ranger shirt unbuttoned over bare breasts","@c1"],headwear:["ranger hat","@c2"],bottom:["cargo shorts pulled down","@c2"]}},
{k:"conductor",job:"Train conductor",head:"The Inspector Caught Her Napping in a Sleeper Car",man:"railway inspector uniform, cap, ticket punch, pants, belt",
  text:"In a swaying sleeper compartment, {partner}, the inspector in his railway cap, takes her in the lotus position on the bunk, her legs wrapped around him, the countryside streaking past the window.",
  pose:"sitting in her lover's lap facing him, legs wrapped around him",act:"sex, vaginal, upright straddle, sitting on lap, legs around waist",pov:false,
  lines:["Tickets, please? I'll punch YOUR ticket!","Next stop... don't you dare stop!"],tags:"train conductor, train interior, sleeper car, window, upright straddle",
  w1:{top:["conductor jacket open over bare breasts","@c1"],headwear:["conductor cap","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"]}},
{k:"pilot",job:"Pilot",head:"The Chief Pilot Caught Her Taking the Jet for a Joyride",man:"pilot uniform, aviator sunglasses, pilot wings pin, pants, belt",
  text:"In the private jet's cockpit, {partner}, the chief pilot in his aviators, has her straddling him in the captain's seat, the instrument panel blinking around them and clouds outside.",
  pose:"straddling her lover in a seat, arms around his neck",act:"sex, vaginal, cowgirl position, straddling, sitting on lap",pov:true,
  lines:["Autopilot's on... ride me, Captain!","Ground me? Try it!"],tags:"pilot, cockpit, airplane interior, instrument panel, clouds, straddling",
  w1:{top:["pilot shirt unbuttoned over bare breasts","@light"],headwear:["pilot cap","@dark"],neckAccessory:["pilot tie","@c1"]}},
{k:"construction",job:"Construction worker",head:"The Foreman Caught Her Napping on the Job Site",man:"high-visibility vest, hard hat, work boots, jeans, tool belt",
  text:"On a stack of lumber at the job site, {partner}, the foreman in his hard hat and hi-vis vest, takes her in a mating press, her boots in the air and her own hard hat rolling away.",
  pose:"lying folded on her back, legs up in the air",act:"sex, vaginal, mating press, legs up",pov:false,
  lines:["Heavy machinery, huh? Prove it!","Lunch break! I'm on my lunch break!"],tags:"construction worker, construction site, hard hat, lumber, high-visibility vest, mating press",
  w1:{top:["high-visibility vest over a tank top pulled up","@c1"],headwear:["hard hat","yellow"],bottom:["work shorts pulled down","@dark"],belt:["tool belt","brown"]}},
{k:"referee",job:"Referee",head:"The League Commissioner Caught Her Fixing the Game",man:"suit jacket, league lanyard, dress shirt, pants, belt",
  text:"In the empty stadium locker room, {partner}, the league commissioner with his lanyard, takes her on the bench in a prone bone, her whistle and a wad of betting slips on the floor.",
  pose:"lying face-down on a bench, hips raised",act:"sex, vaginal, prone bone, lying on stomach, sex from behind",pov:false,
  lines:["Foul! ...do it again!","Red card? I'll take the penalty!"],tags:"referee, locker room, bench, whistle, prone bone",
  w1:{top:["referee shirt pulled up over her breasts","black"],neckAccessory:["whistle","silver"],bottom:["referee shorts pulled down","black"]}},
{k:"navy",job:"Navy officer",head:"The Captain Caught Her Drinking His Rum",man:"navy captain's uniform, captain's hat, white pants, belt",
  text:"In the captain's quarters below deck, {partner}, the navy captain in his dress whites, fucks her standing from behind against the porthole, the ocean rolling outside and his rum bottle empty on the map table.",
  pose:"standing, bent forward with her hands braced on a wall",act:"sex, vaginal, standing sex, sex from behind, hand on wall",pov:false,
  lines:["Aye aye, Captain! Again!","Walk the plank? I'd rather walk THIS!"],tags:"navy, military, ship interior, porthole, rum, map, standing sex",
  w1:{top:["naval officer's white jacket open over bare breasts","white"],headwear:["naval officer's cap","white"],bottom:["pencil skirt hiked up around the waist","@dark"],wristAccessory:["gold epaulettes","@metal"]}}];

  const OFFICE_HOURS=[
{k:"secretary",job:"Secretary",head:"The Boss Caught Her Shredding the Wrong Files",man:"business suit, dress shirt, loosened tie, pants, belt",
  text:"In the corner office after hours, {partner}, the boss in his loosened tie, sweeps the desk clear and bends her over it, fucking her from behind, shredded paper drifting around them like confetti.",
  pose:"bent over a desk, looking back over her shoulder",act:"sex, vaginal, sex from behind, bent over desk",pov:false,
  lines:["Take a memo: I'm NOT sorry!","File a complaint... with my pussy!"],tags:"secretary, office, office desk, shredded paper, bent over desk",
  w1:{top:["silk blouse torn open over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@dark"],eyewear:["round glasses","black"],legwear:["torn sheer tights","black"]}},
{k:"librarian",job:"Librarian",head:"The Head Librarian Caught Her Eating in the Stacks",man:"cardigan, dress shirt, tie, slacks, belt",
  text:"Deep in the library stacks, {partner}, the head librarian in his cardigan, lifts her onto the rolling ladder and fucks her standing, books tumbling off the shelves and a crumbly sandwich on the floor.",
  pose:"lifted against bookshelves, legs wrapped around her lover",act:"sex, vaginal, standing sex, against wall, legs around waist",pov:false,
  lines:["Shhh? Make me be quiet!","Overdue? I'll show you overdue!"],tags:"librarian, library, bookshelf, book, ladder, against wall",
  w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@dark"],eyewear:["round glasses","black"]}},
{k:"lawyer",job:"Lawyer",head:"The Senior Partner Caught Her Forging a Client's Signature",man:"three-piece suit, dress shirt, tie, pants, belt",
  text:"In the law firm's conference room, {partner}, the senior partner in his three-piece suit, lays her back on the long table in the missionary position, legal files and a fountain pen scattered around her.",
  pose:"lying on her back on a table, legs wrapped around her lover",act:"sex, vaginal, missionary, on table, legs around waist",pov:true,
  lines:["Objection! ...overruled, keep going!","I plead guilty, counselor!"],tags:"lawyer, office, conference room, table, documents, fountain pen, missionary",
  w1:{top:["blazer and blouse torn open over bare breasts","@dark"],bottom:["pencil skirt hiked up around the waist","@dark"],legwear:["high heels","black"]}},
{k:"scientist",job:"Scientist",head:"The Lab Director Caught Her Blowing Up the Lab",man:"white lab coat, safety goggles, dress shirt, pants, belt",
  text:"In the smoky lab, {partner}, the lab director in his white lab coat, has her riding him on the lab stool, beakers fizzing and a scorch mark on the wall behind them.",
  pose:"riding on top, straddling her lover on a stool",act:"sex, vaginal, cowgirl position, straddling, sitting on lap",pov:true,
  lines:["It was an EXPERIMENT! This is too!","For science! Harder!"],tags:"scientist, laboratory, beaker, smoke, lab stool, straddling",
  w1:{top:["lab coat hanging open over bare breasts","white"],eyewear:["safety goggles on her head","clear"],bottom:["skirt hiked up around the waist","@c1"]}},
{k:"anchor",job:"News anchor",head:"The Producer Caught Her Faking a Story Live on Air",man:"producer's headset, dress shirt, rolled sleeves, pants, belt",
  text:"Behind the news desk with the cameras off, {partner}, the producer in his headset, bends her over the desk, the teleprompter still scrolling her fake headline behind them.",
  pose:"bent over a desk, gripping its edge",act:"sex, vaginal, sex from behind, bent over desk, standing sex",pov:false,
  lines:["Breaking news... I'm not sorry!","And we're LIVE... harder!"],tags:"news anchor, news studio, news desk, teleprompter, studio lights, bent over desk",
  w1:{top:["news anchor blazer and blouse open over bare breasts","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"],earAccessory:["earpiece","black"]}},
{k:"accountant",job:"Accountant",head:"The CFO Caught Her Cooking the Books",man:"business suit, dress shirt, tie, pants, belt",
  text:"In the CFO's office, {partner}, the CFO in his suit, sits her in his lap in the reverse cowgirl position on his leather chair, ledgers and a calculator spread across the desk in front of her.",
  pose:"sitting in her lover's lap facing away from him",act:"sex, vaginal, reverse cowgirl position, sitting on lap",pov:false,
  lines:["The numbers ADD UP, I swear! Count again!","Audit me, sir!"],tags:"accountant, office, ledger, calculator, leather chair, reverse cowgirl position",
  w1:{top:["sweater vest over a blouse pulled up","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"],eyewear:["rectangular glasses","black"]}},
{k:"chef",job:"Chef",head:"The Restaurant Critic Caught Her Serving Him Frozen Pizza",man:"black blazer, dress shirt, slacks, belt",
  text:"In the restaurant kitchen, {partner}, the food critic in his black blazer, lifts her onto the steel counter and fucks her, pots boiling over and a frozen pizza box in the trash.",
  pose:"sitting on a counter with her legs spread around her lover",act:"sex, vaginal, sitting on counter, legs around waist",pov:true,
  lines:["Five stars or you're getting NOTHING else!","It was a deconstructed pizza!"],tags:"chef, restaurant kitchen, counter, pot, steam, sitting on counter",
  w1:{top:["chef's jacket hanging open over bare breasts","white"],headwear:["chef hat","white"],waistAccessory:["chef apron","@c1"]}},
{k:"teller",job:"Bank teller",head:"The Bank Manager Caught Her Counting Cash into Her Purse",man:"bank manager's suit, dress shirt, tie, pants, belt",
  text:"Inside the bank vault, {partner}, the bank manager in his suit, takes her doggystyle on a pile of cash bags, gold bars stacked on the shelves around them.",
  pose:"on all fours, looking back over her shoulder",act:"sex, vaginal, doggystyle, all fours, sex from behind, looking back",pov:false,
  lines:["Interest! I was collecting INTEREST!","Make a deposit then!"],tags:"bank teller, bank vault, money bag, gold bar, banknote, doggystyle, all fours",
  w1:{top:["bank teller blouse unbuttoned over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@c1"],neckAccessory:["neck scarf","@c2"]}},
{k:"realtor",job:"Real estate agent",head:"The Buyer Caught Her Napping in the Show Home's Master Bed",man:"polo shirt, chinos, wristwatch, belt",
  text:"In the show home's staged master bedroom, {partner}, the buyer in his polo shirt, takes her spooning on the big bed, the 'For Sale' sign and her clipboard on the pillow.",
  pose:"lying on her side, one leg lifted",act:"sex, vaginal, spooning, lying on side, sex from behind",pov:false,
  lines:["I was testing the mattress! It's GREAT!","Make an offer, sir!"],tags:"real estate agent, bedroom, for sale sign, clipboard, spooning",
  w1:{top:["blazer and blouse open over bare breasts","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"],tagCharm:["name badge","@metal"]}},
{k:"trainer",job:"Personal trainer",head:"The Gym Owner Caught Her Eating Donuts Between Sessions",man:"tank top, gym shorts, sweatband, sneakers",
  text:"On a weight bench in the empty gym, {partner}, the gym owner in his tank top, fucks her in a full nelson in front of the mirror wall, a box of donuts on the floor.",
  pose:"held up from behind in a full nelson in front of a mirror",act:"sex, vaginal, full nelson, legs up, mirror",pov:false,
  lines:["Cheat day! ...this counts as cardio!","One more rep! ONE MORE!"],tags:"personal trainer, gym, mirror, weight bench, donut, sportswear, full nelson",
  w1:{top:["sports bra pulled up over her breasts","@c1"],bottom:["yoga pants pulled down to the thighs","@dark"],headwear:["sweatband","@c2"]}},
{k:"intern",job:"Office intern",head:"The CEO Caught His Intern Sitting in His Chair",man:"designer suit, dress shirt, open collar, pants, belt",
  text:"In the glass-walled top-floor office, {partner}, the CEO in his designer suit, sits in his own chair with her riding him in the lotus position, her legs around him and the skyline behind the glass.",
  pose:"sitting in her lover's lap facing him, legs wrapped around him",act:"sex, vaginal, upright straddle, sitting on lap, legs around waist",pov:false,
  lines:["It's MY chair now! Earn it back!","Promote me... or punish me!"],tags:"office lady, office, skyscraper, city lights, office chair, upright straddle",
  w1:{top:["white blouse unbuttoned over bare breasts","white"],bottom:["pencil skirt hiked up around the waist","@dark"],neckAccessory:["lanyard id badge","@c1"]}},
{k:"archaeologist",job:"Archaeologist",head:"The Expedition Leader Caught Her Pocketing the Golden Idol",man:"explorer's shirt, safari hat, cargo pants, leather belt, satchel",
  text:"In the torch-lit tomb, {partner}, the expedition leader in his safari hat, pins her against the carved stone wall and lifts her, fucking her standing, the golden idol rolling in the dust at their feet.",
  pose:"lifted against a stone wall, legs wrapped around her lover's waist",act:"sex, vaginal, standing sex, against wall, legs around waist",pov:false,
  lines:["Finders keepers! ...fine, take it out of me!","It's cursed anyway, harder!"],tags:"archaeologist, explorer, tomb, ruins, torch, golden idol, against wall",
  w1:{top:["explorer shirt tied up and open over bare breasts","@c1"],headwear:["explorer hat","@c2"],bottom:["cargo shorts pulled down","@c2"],belt:["leather belt","brown"]}}];

  [ON_THE_CLOCK,IN_UNIFORM,OFFICE_HOURS].forEach(L=>L.forEach(s=>need(s.w1)));
  ITEMS.forEach(([f,v])=>START.item(f,v,/open|pulled|hiked|torn|tied up|hanging|around one ankle/.test(v)?"L":"CUS","costume,boudoir"));
  START.option("expression","bratty, furious, flushed glare melting into pleasure",GX);

  const T_=window.PAIR_TEXT;
  let after="Academy Panty Gag";
  function set(label,pre,scen){
    scen.forEach(s=>START.option("posture",s.pose,GX));
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],k=(i/scen.length|0)%s.lines.length;
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);o[f]=b});return o};
      /* the Text and sound items, written exactly as the Scene step writes them, so they stay editable there */
      const texts=[{k:"head",st:"top",who:"",t:s.head},{k:"speech",st:"shaky",who:"c1",t:s.lines[k]}].concat(SFX.map(([st,t])=>({k:"sfx",st,who:"",t})));
      texts.forEach(it=>{it.s=T_.sentence(it,{gm:"far"})});
      const txTags=[...new Set(texts.flatMap(it=>T_.tags(it)))];
      const tags=dedupe(`${s.tags}, ${BASE_TAGS}, ${txTags.join(", ")}`);
      const scene=[texts[0].s,s.text,texts[1].s,FACE,texts[2].s,texts[3].s,texts[4].s].join(" ")+" "+tags;
      const c1=Object.assign({},AROUSE,{expression:"bratty, furious, flushed glare melting into pleasure",posture:s.pose});
      return{id:pre+h,base:ACAD.robes(h),name:`${s.job}: ${s.head}`,c:Object.assign({age:"woman"},c1),
        outfit:{oname:s.job+" cosplay",look:"costume",items:res(s.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"cowboy shot",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",gm:"far",outfit:"scene",scene,act:s.act,dir:"ba",explicit:true,penis:true,emph:"max",
            ex1:EX1,ex1k:"",tags1:TAGS1,tags2:s.man,texts,txTags,
            c1,w1:{name:s.job+" cosplay",look:"costume",f:s.w1},compact:false,fit:true}},
        tags:["cosplay","roleplay","explicit","sex","faceless male","headline","single scene",h,s.k],
        blurb:`“${s.head}.” ${cap(h)} in ${/^[aeiou]/i.test(s.job)?"an":"a"} ${s.job.toLowerCase()} cosplay, caught red-handed and daring him to punish her. A roleplay she's loving; the man is faceless, so it's all about her.`};
    }),{after});
    after=label;
  }
  set("Academy Cosplay Punishment: On the Clock","cpc",ON_THE_CLOCK);
  set("Academy Cosplay Punishment: In Uniform","cpu",IN_UNIFORM);
  set("Academy Cosplay Punishment: Office Hours","cpo",OFFICE_HOURS);
  ACAD.COSPLAY_PUNISH=["Academy Cosplay Punishment: On the Clock","Academy Cosplay Punishment: In Uniform","Academy Cosplay Punishment: Office Hours"];
})();

/* ---- v208: three more cosplay punishment sets, fantasy, mythical and cosmic, and far less vanilla than the job sets.
   Same roleplay as before: she is a willing, mouthy brat in costume, caught at something wicked and loving her punishment;
   he is a faceless man in costume. Every scene has its own punishment: bondage on an altar, the stocks, a piledriver,
   rope suspension, a spanking over his knee, deepthroat, a full nelson in the ass, wax, edging, a dildo for double
   penetration, the wall, zero gravity and more, with the actions split into their directions (both, her to him, him to
   her). Five different faces and sound-effect lines rotate through them. Adult women and men only; explicit, held by the
   safeguard like every explicit scene.
     Academy Depraved Cosplay: Fantasy Kingdom    12 roles
     Academy Depraved Cosplay: Myths and Legends  12 roles
     Academy Depraved Cosplay: Cosmic             12 roles */
(function(){
  if(!ACAD.HUM||!window.PAIR||!window.PAIR_TEXT||!window.PAIR_ACTS)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)";
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";
  const BASE_TAGS="cosplay, roleplay, brat, bdsm, motion lines, sweat, moaning";
  /* five faces: [scene expression tags, the sentence] */
  const FACES=[
    ["heavy blush, angry, v-shaped eyebrows, glaring, clenched teeth, teary eyes, tears, sweat, trembling",
     "She glares up at {him}, furious and flustered, tears of pleasure in her eyes, but she is grinning through her clenched teeth and plainly loving every second of her punishment."],
    ["ahegao, rolling eyes, heart-shaped pupils, tongue out, drooling, heavy blush, tears, trembling",
     "Her eyes roll back with hearts in her pupils and her tongue lolls out in a fucked-silly ahegao, though she still tries to glare at {him}."],
    ["crying, streaming tears, heavy blush, open mouth, drooling, trembling, sweat",
     "Tears of pleasure stream down her flushed face as she shakes and sobs, completely overwhelmed and begging for more."],
    ["smug, smirk, half-closed eyes, heavy blush, teary eyes, sweat",
     "Even bound and ruined she smirks at {him} with a flushed, cocky grin, daring {him} to try harder."],
    ["rolling eyes, drooling, saliva trail, heavy blush, tears, trembling, sweat",
     "She is dazed and drooling, her eyes rolled up and her whole body trembling with pleasure."]];
  /* sound effects: [style, text] ×3 */
  const SFXS=[
    [["hearty","ah ah ah ah ah"],["lewd","thrust thrust"],["big","plap plap"]],
    [["hearty","mmph mmph"],["lewd","squelch squelch"],["big","SMACK"]],
    [["hearty","hnngh♡ hnngh♡"],["lewd","bzzzzz"],["big","CLINK CLINK"]],
    [["hearty","gulp gulp"],["lewd","gloK gloK"],["big","SPLURT"]],
    [["hearty","aaahn♡"],["lewd","drip drip"],["big","POUND POUND"]]];
  const A=o=>[].concat((o.m||"").split(",").filter(x=>x.trim()).map(x=>"mutual#"+x.trim()),(o.ab||"").split(",").filter(x=>x.trim()).map(x=>"source#"+x.trim()),(o.ba||"").split(",").filter(x=>x.trim()).map(x=>"target#"+x.trim())).join(", ");

  /* scenario: {k, role, head, man, text, pose, act(A), pov, face, sfx, lines[2], tags, tags1, w1} ; {partner} {him} … = the man */
  const FANTASY=[
{k:"elf",role:"Elf princess",head:"The Dark Lord Caught the Elf Princess Stealing His Crown",man:"black armor, dark lord's cape, spiked pauldrons, crown",
  text:"In the dark lord's throne room, {partner} has her bound spread-eagle on the obsidian altar with glowing chains, a humming vibrator strapped against her clit while he fucks her, the stolen crown rolled away on the floor.",
  pose:"bound spread-eagle on an altar, arms and legs chained",act:A({ba:"sex, vaginal, vibrator, overstimulation"}),pov:true,face:2,sfx:2,
  lines:["Is that the best your dark magic can do?! AGAIN!","Keep your stupid crown... just don't you DARE stop!"],tags:"elf, princess, throne room, altar, chain, spread eagle, bound, vibrator, sex toy",tags1:"bound, chained, spread legs, pointy ears",
  w1:{top:["elven gown torn open over bare breasts","@c1"],headwear:["elven circlet","@metal"],earAccessory:["pointy elf ear cuffs","@metal"],wristAccessory:["glowing chain shackles","@metal"]}},
{k:"priestess",role:"High priestess",head:"The Inquisitor Caught the High Priestess Drinking the Holy Wine",man:"inquisitor's robes, wide-brimmed hat, leather gloves, silver holy symbol",
  text:"In the candlelit cathedral crypt, {partner} has her locked in a wooden pillory, her head and wrists trapped, spanking her red ass and fucking it from behind, the empty chalice on the flagstones.",
  pose:"locked in a pillory, bent forward, ass raised",act:A({ba:"anal, sex from behind, spanking"}),pov:false,face:0,sfx:1,
  lines:["The wine was BLESSED, you heathen!","Holy... fuck... is that all, Inquisitor?!"],tags:"priestess, cathedral, crypt, candle, pillory, stocks, anal, spanking, red butt, handprint, chalice",tags1:"pillory, red butt, handprint, anal",
  w1:{top:["priestess robe pulled down to the waist","white"],headwear:["priestess veil","@c1"],neckAccessory:["golden holy pendant","@metal"]}},
{k:"witch",role:"Witch",head:"The Witch Hunter Caught Her Cursing the King",man:"witch hunter's long coat, tricorn hat, leather boots, belt",
  text:"In the witch's cottage, {partner} has her folded upside down in a piledriver on the rug, pounding straight down into her pussy, her pointed hat crushed and her cauldron bubbling over beside them.",
  pose:"folded upside down in a piledriver, legs over her head",act:A({ba:"sex, vaginal, piledriver (sex), deep penetration"}),pov:false,face:1,sfx:4,
  lines:["I'll curse YOU next! ...after this!","Hex me harder, hunter!"],tags:"witch, cottage, cauldron, witch hat, piledriver (sex), upside-down, deep penetration",tags1:"upside-down, legs over head, witch hat",
  w1:{top:["witch dress pulled down to the waist","@dark"],headwear:["crumpled witch hat","@dark"],legwear:["striped thigh-high stockings","@c1"]}},
{k:"knight",role:"Knight",head:"The Lord Commander Caught His Knight Deserting",man:"plate armor, commander's red cape, gauntlets, sword belt",
  text:"In the castle dungeon, {partner} has her hanging in rope bondage from the ceiling beam, suspended and spread, fucking her where she dangles, her dented armor scattered on the stone floor.",
  pose:"suspended in rope bondage, legs spread",act:A({ba:"sex, vaginal, suspension, shibari"}),pov:false,face:3,sfx:0,
  lines:["Desert? I came back for THIS, sir!","Knights don't break! ...harder!"],tags:"knight, dungeon, rope, shibari, suspension, bondage, armor",tags1:"shibari, suspension, rope bondage, spread legs",
  w1:{top:["breastplate pulled off, tunic torn open over bare breasts","@c1"],gloves:["chainmail gloves","silver"],legwear:["steel greaves","silver"]}},
{k:"valkyrie",role:"Valkyrie",head:"The Jarl Caught the Valkyrie Raiding His Mead Hall",man:"fur cloak, horned helm, leather armor, axe belt",
  text:"In the mead hall, {partner} has her draped over his knee on the high seat, spanking her ass red with his bare hand while he fingers her soaking pussy, overturned mead horns everywhere.",
  pose:"lying over her lover's knee, ass up",act:A({ba:"spanking, fingering, over the knee"}),pov:true,face:0,sfx:1,
  lines:["Valhalla can WAIT! Spank me again!","Is that a slap or a love tap, jarl?!"],tags:"valkyrie, viking, mead hall, over the knee, spanking, fingering, red butt, handprint",tags1:"over the knee, red butt, handprint",
  w1:{top:["valkyrie chest armor pulled off over bare breasts","@metal"],headwear:["winged helmet","@metal"],bottom:["leather battle skirt hiked up","@dark"]}},
{k:"dancer",role:"Harem dancer",head:"The Sultan Caught His Dancer Pocketing the Palace Jewels",man:"sultan's robes, jeweled turban, silk sash",
  text:"On the silk cushions of the palace, {partner} has her kneeling with a jeweled collar and leash, wrists bound behind her back, deepthroating his cock until she gags and drools, the stolen jewels spilling from her veil.",
  pose:"kneeling with hands tied behind her back, looking up",act:A({ab:"fellatio, deepthroat",ba:"leash pull, hand on another's head"}),pov:true,face:4,sfx:3,
  lines:["Mmph... more jewels... MORE!","I'll dance on it after... gluck♡"],tags:"harem outfit, palace, cushion, collar, leash, deepthroat, fellatio, saliva, drooling, jewelry",tags1:"collar, leash, arms behind back, kneeling, saliva trail",
  w1:{top:["harem dancer bra pulled down","@c1"],bottom:["sheer harem pants","@c2"],neckAccessory:["jeweled collar with leash","@metal"],headwear:["face veil","@c2"]}},
{k:"sorceress",role:"Sorceress",head:"The Archmage Caught His Apprentice Reading the Forbidden Grimoire",man:"archmage's star-embroidered robes, staff, hood",
  text:"In the arcane tower, {partner} has her pinned in a full nelson in midair over the glowing summoning circle, her legs spread high as he fucks her ass, the forbidden grimoire floating open beside them.",
  pose:"held in a full nelson, legs spread high",act:A({ba:"anal, full nelson, spread legs"}),pov:false,face:1,sfx:0,
  lines:["I read the WHOLE book! Punish every page!","Your spells are weaker than... ahn♡"],tags:"sorceress, wizard tower, magic circle, glowing, grimoire, full nelson, anal",tags1:"full nelson, anal, spread legs",
  w1:{top:["sorceress robe torn open over bare breasts","@c1"],headwear:["sorceress hat","@c1"],neckAccessory:["crystal amulet","@c2"]}},
{k:"paladin",role:"Paladin",head:"The High Templar Caught the Paladin Breaking Her Vow of Chastity",man:"templar's white tabard, chainmail, gauntlets, holy sword",
  text:"In the temple sanctum, {partner} has her chained to the pillar with her arms stretched above her head and one leg hooked over his elbow, fucking her standing in a split, hot candle wax dripping across her breasts.",
  pose:"chained to a pillar, arms above her head, one leg lifted high",act:A({ba:"sex, vaginal, standing split, wax play"}),pov:false,face:0,sfx:2,
  lines:["Chastity is OVERRATED!","Purify me... harder!"],tags:"paladin, temple, pillar, chain, arms up, standing split, wax play, candle wax",tags1:"arms up, chained, candle wax on breasts",
  w1:{top:["paladin tabard torn open over bare breasts","white"],headwear:["silver circlet","silver"],gloves:["steel gauntlets","silver"]}},
{k:"rogue",role:"Rogue",head:"The Guildmaster Caught the Rogue Picking His Pocket",man:"black leather armor, hooded cloak, dagger belt",
  text:"In the thieves' guild vault, {partner} has her face-down and ass-up on the treasure pile, her wrists cuffed behind her back and a ball gag in her mouth, pulling her hair as he fucks her from behind.",
  pose:"face-down, ass up, wrists cuffed behind her back",act:A({ba:"sex, vaginal, sex from behind, hair pulling, top-down bottom-up"}),pov:false,face:4,sfx:4,
  lines:["Mmph! MMPH! (Harder!)","Mmmh♡ mmh mmph♡"],tags:"thief, rogue, treasure, gold coin, ball gag, cuffs, hair pulling, top-down bottom-up",tags1:"ball gag, cuffs, arms behind back, hair pulling",
  w1:{top:["rogue's leather corset unlaced over bare breasts","@dark"],bottom:["thief's shorts pulled down","@dark"],neckAccessory:["ball gag","@c1"]}},
{k:"druid",role:"Druid",head:"The Forest King Caught the Druid Poaching His Stag",man:"antlered crown, leaf cloak, leather bracers",
  text:"In the forest king's moonlit grove, {partner} has her bent backward over a mossy log, her wrists bound with vines, fucking her with her legs over his shoulders while nipple clamps on a chain tug with every thrust.",
  pose:"bent backward over a log, legs over her lover's shoulders",act:A({ba:"sex, vaginal, legs over shoulders, deep penetration, nipple clamps"}),pov:true,face:2,sfx:0,
  lines:["I was HUNGRY! Eat me then!","The trees are watching... let them!"],tags:"druid, forest, moonlight, log, vines, nipple clamps, legs over shoulders",tags1:"nipple clamps, bound wrists, legs over shoulders",
  w1:{top:["druid's leaf top pulled off","@c1"],bottom:["leaf skirt hiked up","@c2"],headwear:["flower crown","@c1"]}},
{k:"queen",role:"Queen",head:"The Usurper Caught the Queen Hiding the Royal Treasury",man:"black velvet doublet, usurper's crown, rapier",
  text:"On the royal throne, {partner} has her seated reverse on his lap in her own throne, her legs hooked wide over the armrests, fucking her ass while a dildo is buried in her pussy for double penetration.",
  pose:"sitting reverse on her lover's lap on a throne, legs spread over the armrests",act:A({ba:"anal, double penetration, dildo, reverse cowgirl position, spread legs"}),pov:false,face:1,sfx:4,
  lines:["Long live the QUEEN! Fuck the queen!","My treasury, my rules... OHH♡"],tags:"queen, throne, crown, throne room, double penetration, dildo, anal, spread legs",tags1:"double penetration, dildo, spread legs, crown",
  w1:{top:["royal gown pulled down to the waist","@c1"],headwear:["queen's crown","@metal"],neckAccessory:["jeweled necklace","@metal"]}},
{k:"bard",role:"Bard",head:"The Lord Caught the Bard Singing Filthy Songs About His Wife",man:"noble's velvet doublet, feathered cap, rings",
  text:"In the tavern's back room, {partner} has her stuck halfway through a hole in the wall, her ass and legs on his side, fucking her while tally marks and lewd words are written across her ass in ink, her lute broken on the floor.",
  pose:"stuck in a wall from the waist, legs dangling",act:A({ba:"sex, vaginal, stuck in wall, body writing"}),pov:false,face:3,sfx:0,
  lines:["I'll write a song about THIS!","Is that it? That's going in the ballad as 'small'!"],tags:"bard, tavern, stuck in wall, body writing, tally, lute",tags1:"stuck in wall, body writing, tally marks",
  w1:{top:["bard's blouse torn open over bare breasts","@light"],bottom:["bard's skirt hiked up","@c1"],headwear:["feathered beret","@c1"]}}];

  const MYTHS=[
{k:"aphrodite",role:"Goddess of love",head:"Zeus Caught Aphrodite Seducing His Lightning",man:"golden laurel crown, white toga, golden armbands",
  text:"On a marble altar on Mount Olympus, {partner} has her on her back with her legs pinned beside her head in a mating press, cum overflowing from her pussy as he keeps pounding, lightning crackling in the clouds behind them.",
  pose:"folded on her back, legs pinned beside her head",act:A({ba:"sex, vaginal, mating press, creampie, cum overflow"}),pov:false,face:1,sfx:4,
  lines:["Love wins, ZEUS! Again!","A god? Prove it!"],tags:"goddess, greek mythology, olympus, marble, clouds, lightning, mating press, creampie, cum overflow",tags1:"mating press, cum overflow, laurel wreath",
  w1:{top:["greek goddess dress torn open over bare breasts","white"],headwear:["golden laurel wreath","@metal"],wristAccessory:["golden arm cuffs","@metal"]}},
{k:"pharaoh",role:"Pharaoh's queen",head:"The Pharaoh Caught His Queen Stealing from the Tomb",man:"pharaoh's headdress, gold collar, white shendyt, gold armbands",
  text:"In the torch-lit tomb, {partner} has her bound to an X-shaped stone cross, legs spread, a wand vibrator pressed to her clit while he fingers her, edging her again and again, golden treasure glittering around them.",
  pose:"bound to an X-shaped cross, arms and legs spread",act:A({ba:"fingering, vibrator, edging, orgasm denial"}),pov:true,face:2,sfx:2,
  lines:["Let me CUM, pharaoh! PLEASE!","I'll rob ten more tombs... just let me cum!"],tags:"egyptian, pharaoh, tomb, gold, x-shaped cross, spread eagle, vibrator, wand vibrator, fingering, orgasm denial, edging",tags1:"bound, x-shaped cross, spread legs, edging",
  w1:{top:["egyptian queen's dress torn open over bare breasts","white"],headwear:["golden cobra crown","@metal"],neckAccessory:["golden usekh collar","@metal"]}},
{k:"kitsune",role:"Kitsune priestess",head:"The Shrine Guardian Caught the Fox Spirit Eating the Offerings",man:"guardian's hakama, haori jacket, oni mask on his belt",
  text:"In the lantern-lit shrine, {partner} has her crawling on all fours in a red collar and leash, her fox ears drooping, then takes her ass from behind as she crawls, her fluffy costume tail bouncing, rice cakes scattered from the offering box.",
  pose:"crawling on all fours, leashed, looking back",act:A({ba:"anal, doggystyle, leash pull",ab:"all fours"}),pov:false,face:0,sfx:0,
  lines:["They were MY offerings anyway!","Pet me... no, punish me! Both!"],tags:"kitsune, fox ears, fox tail, shrine, lantern, collar, leash, all fours, crawling, pet play, anal",tags1:"collar, leash, all fours, fox ears",
  w1:{top:["shrine robe slipped off the shoulders over bare breasts","white"],bottom:["red hakama pulled down","red"],headwear:["fox ear headband","@c1"],neckAccessory:["red collar with leash","red"]}},
{k:"vampire",role:"Vampire countess",head:"The Vampire Hunter Caught the Countess Biting His Brother",man:"hunter's long coat, crossbow, leather gloves, silver stake belt",
  text:"In the vampire's coffin chamber, {partner} has her upside down with her head hanging off the edge of the coffin, fucking her throat deep while her legs kick in the air, candles guttering around them.",
  pose:"lying on her back, head hanging upside down off the edge",act:A({ab:"fellatio, deepthroat, upside-down",ba:"face fucking"}),pov:false,face:4,sfx:3,
  lines:["Gluk... I'll bite YOU next... gluk♡","Mmph♡ more... mmph♡"],tags:"vampire, coffin, gothic, candle, deepthroat, upside-down, face fucking, saliva, fangs",tags1:"upside-down, deepthroat, saliva trail, fangs",
  w1:{top:["vampire countess gown torn open over bare breasts","@dark"],neckAccessory:["blood-red choker","red"],gloves:["black lace gloves","black"]}},
{k:"succubus",role:"Succubus",head:"The Exorcist Caught the Succubus Draining His Congregation",man:"exorcist's cassock, rosary, holy book, priest's collar",
  text:"In the ruined chapel, {partner} has her pinned under a glowing binding circle, held down by her horns, and fills her again and again until her stomach swells with cum, tally marks counting each load on her thigh.",
  pose:"pinned on her back inside a glowing circle, held by her horns",act:A({ba:"sex, vaginal, creampie, cum inflation, horn grab"}),pov:true,face:1,sfx:4,
  lines:["MORE! I'm still HUNGRY!","Is that all your faith can give me?!"],tags:"succubus, demon horns, demon tail, chapel, magic circle, cum inflation, creampie, tally, body writing",tags1:"demon horns, cum inflation, tally marks",
  w1:{top:["succubus bodysuit torn open over bare breasts","@dark"],headwear:["demon horn headband","@dark"],legwear:["thigh-high latex boots","@dark"]}},
{k:"angel",role:"Fallen angel",head:"The Archangel Caught the Angel Falling for Sin",man:"golden armor, white wings costume, halo, holy spear",
  text:"In the clouds of heaven, {partner} has her lying back on a broken pillar, titfucking her bound breasts with rope wrapped tight around them, cumming across her face and halo, white feathers drifting everywhere.",
  pose:"lying back on a pillar, breasts bound and squeezed together",act:A({ab:"paizuri",ba:"facial, cum on breasts, breast bondage"}),pov:true,face:3,sfx:3,
  lines:["Sin tastes AMAZING!","Heaven can't have me back... more!"],tags:"angel, fallen angel, angel wings, halo, clouds, feathers, paizuri, breast bondage, rope, facial, cum on face, cum on breasts",tags1:"breast bondage, cum on face, cum on breasts, halo",
  w1:{top:["angel robe torn open over rope-bound breasts","white"],headwear:["halo headband","@metal"],hipAccessory:["feathered angel wings","white"]}},
{k:"siren",role:"Siren",head:"The Sea Captain Caught the Siren Luring His Crew",man:"captain's long coat, tricorn hat, leather boots, cutlass",
  text:"On the storm-soaked deck, {partner} has her tied to the mast with her arms pulled behind it, lifting her legs around his waist and fucking her hard while the waves crash over them, seaweed and pearls tangled in her hair.",
  pose:"tied to a ship's mast, legs wrapped around her lover's waist",act:A({ba:"sex, vaginal, standing sex, bound, rough sex"}),pov:false,face:0,sfx:0,
  lines:["Sing for me? You first, Captain!","Drown me in it!"],tags:"siren, ship, mast, storm, waves, rope, bound, standing sex, wet",tags1:"tied to a mast, wet hair, pearls",
  w1:{top:["seashell bikini top pulled down","@c1"],bottom:["sheer sea-silk skirt hiked up","@c2"],neckAccessory:["pearl strands","white"]}},
{k:"gorgon",role:"Gorgon",head:"The Hero Caught Medusa Turning Him to Stone... Almost",man:"bronze greek armor, hero's red cape, round shield",
  text:"In the gorgon's cave of statues, {partner} has her blindfolded so her gaze can't harm him, her wrists bound behind her, and takes her ass from behind in a prone bone on the cave floor, her snake-hair headpiece writhing.",
  pose:"lying face-down, blindfolded, hips raised",act:A({ba:"anal, prone bone, blindfold"}),pov:false,face:4,sfx:4,
  lines:["Take this off and I'll stone you! ...after!","Petrify me, hero! Ahn♡"],tags:"gorgon, snake hair, cave, statue, blindfold, prone bone, anal",tags1:"blindfold, arms behind back, prone bone",
  w1:{top:["gorgon's gold-scaled top torn off","@metal"],headwear:["snake hair headpiece","@c1"],bottom:["greek skirt hiked up","@c2"]}},
{k:"amazon",role:"Amazon warrior",head:"The Conqueror Caught the Amazon Queen Ambushing His Camp",man:"conqueror's armor, war crown, red cape",
  text:"In the conqueror's war tent, {partner} carries her in a standing suspended congress, her legs wrapped around him and her arms tied behind her, bouncing her on his cock with a chain between her nipple clamps swinging.",
  pose:"carried in her lover's arms, legs wrapped around him, arms tied behind her",act:A({ba:"sex, vaginal, suspended congress, nipple clamps"}),pov:false,face:3,sfx:4,
  lines:["Amazons don't surrender! ...but don't stop!","Carry me like a trophy, then!"],tags:"amazon, war tent, warrior, suspended congress, carrying, nipple clamps",tags1:"arms behind back, nipple clamps, suspended congress",
  w1:{top:["amazon leather armor torn off over bare breasts","@dark"],headwear:["amazon war diadem","@metal"],wristAccessory:["bronze bracers","@metal"]}},
{k:"oni",role:"Oni",head:"The Samurai Caught the Oni Raiding His Sake Stores",man:"samurai armor, katana, hachimaki headband",
  text:"In the samurai's dojo, {partner} has her bent over a sake barrel with her wrists tied to it, paddling her ass with a wooden paddle between hard thrusts from behind, spilled sake running across the floor.",
  pose:"bent over a barrel, wrists tied to it",act:A({ba:"sex, vaginal, sex from behind, spanking, paddle"}),pov:false,face:0,sfx:1,
  lines:["Oni drink sake! Oni get SPANKED!","Harder, samurai! I barely felt it!"],tags:"oni, oni horns, dojo, sake, barrel, paddle, spanking, red butt",tags1:"oni horns, red butt, paddle marks",
  w1:{top:["oni tiger-print top torn off","@c1"],headwear:["oni horn headband","@c2"],bottom:["tiger-print loincloth pulled aside","@c1"]}},
{k:"persephone",role:"Queen of the underworld",head:"Hades Caught Persephone Sneaking Back to the Surface",man:"black chiton, dark crown of thorns, cloak of shadows",
  text:"On the underworld's bone throne, {partner} has her riding him in the cowgirl position with a chain from her collar to his fist, yanking her down onto his cock, pomegranate seeds scattered and glowing souls drifting past.",
  pose:"riding on top, collar chain held by her lover",act:A({ab:"cowgirl position, girl on top",ba:"leash pull"}),pov:true,face:1,sfx:0,
  lines:["I'll eat ALL the seeds! Pull harder!","Spring can wait... ride, ride, RIDE!"],tags:"persephone, underworld, throne, pomegranate, chain, collar, cowgirl position",tags1:"collar, chain leash, girl on top",
  w1:{top:["black and flower gown torn open over bare breasts","@dark"],headwear:["flower and thorn crown","@c1"],neckAccessory:["iron collar with chain","silver"]}},
{k:"seeress",role:"Norse seeress",head:"Odin Caught the Seeress Peeking at His Fate",man:"one-eyed god's eyepatch, fur cloak, spear, raven pendant",
  text:"Under the world tree, {partner} has her dangling upside down from a root by her bound ankles, holding her hips as she sucks him in a standing sixty-nine, runes glowing across her skin.",
  pose:"hanging upside down by her ankles",act:A({m:"69, standing 69",ab:"fellatio",ba:"cunnilingus"}),pov:false,face:4,sfx:3,
  lines:["I saw THIS coming! Mmph♡","Read my runes, all-father!"],tags:"norse mythology, yggdrasil, tree, runes, glowing, upside-down, suspension, standing 69, 69",tags1:"upside-down, bound ankles, glowing runes on skin",
  w1:{top:["seeress robe fallen open over bare breasts","@c1"],headwear:["rune-carved circlet","@metal"],neckAccessory:["bone and rune necklace","@light"]}}];

  const COSMIC=[
{k:"astronaut",role:"Astronaut",head:"Mission Control Caught Her Joyriding the Shuttle",man:"spacesuit top tied at the waist, mission patch, headset",
  text:"Floating in zero gravity inside the space station, {partner} has her drifting upside down in his arms, fucking her ass while her legs float wide, tethers and spilled water droplets hovering around them.",
  pose:"floating upside down in zero gravity, legs spread wide",act:A({ba:"anal, zero gravity, floating, spread legs"}),pov:false,face:1,sfx:4,
  lines:["Houston, I have a PROBLEM! Don't stop!","One small step... one BIG—ahn♡"],tags:"astronaut, space station, zero gravity, floating, space, earth (planet), anal, spread legs",tags1:"floating, zero gravity, spread legs",
  w1:{top:["spacesuit unzipped to the waist over bare breasts","white"],neckAccessory:["mission patch","@c1"],wristAccessory:["space suit gloves","white"]}},
{k:"alien",role:"Alien princess",head:"The Galactic Emperor Caught the Alien Princess Stealing His Starship",man:"emperor's black armor, glowing visor helmet, cape",
  text:"In the starship's bridge, {partner} has her pinned against the viewport with her hands cuffed above her head in glowing energy cuffs, fucking her standing from behind with her breasts pressed to the glass, galaxies swirling outside.",
  pose:"pressed against a window, hands cuffed above her head",act:A({ba:"sex, vaginal, standing sex, sex from behind, against glass, breasts on glass"}),pov:false,face:0,sfx:2,
  lines:["Your ship is mine... and so is THIS!","Probe me, Emperor! Ahn♡"],tags:"alien, alien princess, starship, bridge, viewport, against glass, breasts on glass, energy cuffs, galaxy, space",tags1:"arms up, glowing cuffs, breasts on glass, antennae",
  w1:{top:["alien royal bodysuit torn open over bare breasts","@c1"],headwear:["alien antenna headband","@c2"],neckAccessory:["glowing crystal collar","@c2"]}},
{k:"captain",role:"Starship captain",head:"The Admiral Caught His Captain Selling Ship Secrets",man:"admiral's dress jacket, gold insignia, cap",
  text:"In the captain's quarters, {partner} has her strapped into the captain's chair with her legs restrained wide on the armrests, a machine-mounted dildo pumping her pussy while he fucks her mouth.",
  pose:"strapped into a chair, legs restrained wide",act:A({ab:"fellatio",ba:"sex machine, dildo, face fucking, restrained"}),pov:true,face:4,sfx:2,
  lines:["Gluk... court-martial me... gluk♡","Mmph! Full speed! MMPH!"],tags:"captain, starship, chair, restrained, sex machine, dildo, fellatio, spread legs, science fiction",tags1:"restrained, spread legs, sex machine",
  w1:{top:["captain's jacket torn open over bare breasts","@c1"],headwear:["captain's hat","@dark"],legwear:["space boots","@dark"]}},
{k:"bounty",role:"Bounty hunter",head:"The Crime Lord Caught the Bounty Hunter Who Came to Collect Him",man:"crime lord's long coat, gold rings, cybernetic arm",
  text:"In the crime lord's neon den, {partner} has her hogtied on the floor, wrists bound to her ankles, rolling her onto her side and fucking her from behind while her hunter's helmet rolls away.",
  pose:"hogtied on her side, wrists bound to her ankles",act:A({ba:"sex, vaginal, sex from behind, hogtie, bondage"}),pov:false,face:3,sfx:0,
  lines:["The bounty was 10,000 credits... worth it!","Tie me tighter, I almost got loose!"],tags:"bounty hunter, neon lights, cyberpunk, hogtie, rope, bondage",tags1:"hogtie, bound, rope marks",
  w1:{top:["bounty hunter armor top torn off","@dark"],bottom:["tactical shorts pulled down","@dark"],belt:["holster belt","@dark"]}},
{k:"android",role:"Android",head:"Her Programmer Caught the Android Rewriting Her Own Code",man:"lab coat, data glasses, wireless headset",
  text:"In the robotics lab, {partner} has her plugged into the charging dock with cables at her neck and wrists, overriding her with a remote that makes her squirt helplessly while he fucks her, warning lights flashing on her skin.",
  pose:"standing in a charging dock, cables attached, knees buckling",act:A({ba:"sex, vaginal, squirting, overstimulation"}),pov:true,face:2,sfx:2,
  lines:["ERROR... ERROR... MORE INPUT♡","System... overload... don't stop♡"],tags:"android, robot joints, robotics lab, cables, glowing, squirting, female ejaculation, science fiction",tags1:"robot joints, cables, squirting",
  w1:{top:["android chassis panels open over bare breasts","@light"],headwear:["android headset","@c1"],neckAccessory:["glowing serial-number collar","@c2"]}},
{k:"moon",role:"Moon goddess",head:"The Sun King Caught the Moon Goddess Stealing His Daylight",man:"golden sun armor, sun crown, red cape",
  text:"On a crescent moon in the stars, {partner} has her draped backward over the moon's curve with her legs spread over his shoulders, fucking her ass deep, stardust spilling from her hair.",
  pose:"draped backward over a crescent moon, legs over her lover's shoulders",act:A({ba:"anal, legs over shoulders, deep penetration"}),pov:true,face:1,sfx:4,
  lines:["Your sun can't burn THIS hot!","Eclipse me, then!"],tags:"moon, crescent moon, stars, night sky, stardust, goddess, anal, legs over shoulders",tags1:"legs over shoulders, anal, stardust",
  w1:{top:["moon goddess gown torn open over bare breasts","@light"],headwear:["crescent moon tiara","@metal"],neckAccessory:["star chain necklace","@metal"]}},
{k:"empress",role:"Galactic empress",head:"The Rebel Leader Caught the Empress Spying on the Rebellion",man:"rebel's flight jacket, blaster belt, scarf",
  text:"In the rebel hideout, {partner} has her kneeling with her wrists in the stocks of an old cargo rack, cumming over her face and tongue after she worships his cock, a ruined holo-crown at her knees.",
  pose:"kneeling in stocks, mouth open, tongue out",act:A({ab:"cock worship, licking penis",ba:"facial, cum in mouth, cum on face"}),pov:true,face:3,sfx:3,
  lines:["Is that all the rebellion has?","My empire for another load!"],tags:"empress, rebel base, stocks, kneeling, tongue out, facial, cum on face, cum in mouth, science fiction",tags1:"kneeling, stocks, tongue out, cum on face",
  w1:{top:["empress gown torn open over bare breasts","@c1"],headwear:["holographic crown","@c2"],gloves:["long satin gloves","@c1"]}},
{k:"pirate",role:"Space pirate",head:"The Space Marshal Caught the Pirate Queen Raiding His Cargo",man:"marshal's armored coat, badge, laser pistol",
  text:"In the cargo bay, {partner} has her trapped half through the airlock hatch, stuck in the wall from the waist, fucking her from behind while her legs kick and her pirate hat floats in the low gravity.",
  pose:"stuck through a hatch from the waist, legs kicking",act:A({ba:"sex, vaginal, stuck in wall, sex from behind"}),pov:false,face:0,sfx:1,
  lines:["This is PIRACY! ...keep going!","My crew will rescue me in... take your time!"],tags:"space pirate, cargo bay, airlock, stuck in wall, science fiction",tags1:"stuck in wall, kicking legs",
  w1:{top:["pirate coat and corset torn open over bare breasts","@c1"],headwear:["space pirate hat","@dark"],eyewear:["glowing eyepatch","@c2"]}},
{k:"cyborg",role:"Cyborg mercenary",head:"The Corporation Boss Caught the Cyborg Hacking His Vault",man:"sleek corporate suit, cybernetic eye, data glove",
  text:"In the server room bathed in neon, {partner} has her on all fours on the steel floor with anal beads, pulling them out one by one between hard thrusts into her pussy, cables dangling from her cybernetic arm.",
  pose:"on all fours, back arched, looking back",act:A({ba:"sex, vaginal, doggystyle, anal beads"}),pov:false,face:2,sfx:2,
  lines:["I hacked your vault... hack ME!","Pull another one! PULL IT!"],tags:"cyborg, cyberpunk, server room, neon lights, anal beads, doggystyle, cybernetic arm",tags1:"anal beads, cybernetic arm, all fours",
  w1:{top:["cyberpunk crop jacket open over bare breasts","@c1"],bottom:["latex shorts pulled down","@dark"],gloves:["cybernetic arm sleeve","@metal"]}},
{k:"oracle",role:"Star oracle",head:"The Cosmic Overlord Caught the Oracle Rewriting the Stars",man:"cosmic overlord's robes, starfield cloak, void crown",
  text:"In a temple floating among nebulae, {partner} has her spread-eagle on a star chart floor, constellations painted across her body in glowing ink, fucking her slowly while she's bound by glowing ribbons of light, cum dripping onto the stars.",
  pose:"lying spread-eagle, bound by ribbons of light",act:A({ba:"sex, vaginal, spread eagle, body writing, creampie"}),pov:true,face:2,sfx:0,
  lines:["The stars said you'd be BIGGER!","Fate wants more... give it more!"],tags:"oracle, nebula, space, constellation, glowing, body writing, spread eagle, bound, creampie",tags1:"spread eagle, glowing body writing, bound",
  w1:{top:["oracle's starry robe fallen open over bare breasts","@c1"],headwear:["star-crown veil","@metal"],neckAccessory:["orbiting gem necklace","@c2"]}},
{k:"nebula",role:"Nebula witch",head:"The Void King Caught the Nebula Witch Stealing a Star",man:"void armor, black hood, glowing eyes",
  text:"At the edge of a black hole, {partner} has her held upside down against his chest in a standing sixty-nine, her legs locked around his head while she chokes on his cock, the stolen star glowing in her hand.",
  pose:"held upside down against her lover's chest, legs around his head",act:A({m:"69, standing 69",ab:"fellatio, deepthroat",ba:"cunnilingus"}),pov:false,face:4,sfx:3,
  lines:["Mmph... the star's yours... mmph♡","Gluk♡ more void... gluk♡"],tags:"witch, nebula, black hole, space, glowing, standing 69, upside-down, deepthroat",tags1:"upside-down, deepthroat, saliva trail",
  w1:{top:["nebula witch dress torn open over bare breasts","@c1"],headwear:["star witch hat","@c2"],legwear:["starry thigh-high stockings","@c1"]}},
{k:"mech",role:"Mech pilot",head:"The Commander Caught the Pilot Wrecking Her Mech",man:"commander's armored jacket, rank insignia, combat boots",
  text:"Inside the mech's cramped cockpit, {partner} has her in his lap facing the controls with her arms strapped to the joystick handles, fucking her ass from below while the cockpit alarms flash red.",
  pose:"sitting reverse in her lover's lap, arms strapped forward",act:A({ba:"anal, reverse cowgirl position, sitting on lap, restrained"}),pov:false,face:1,sfx:4,
  lines:["It was ALREADY broken! Mostly!","Eject? Never! Deeper!"],tags:"mecha, cockpit, pilot suit, alarm, red light, anal, reverse cowgirl position, restrained, science fiction",tags1:"restrained, anal, plugsuit",
  w1:{top:["plugsuit unzipped to the waist over bare breasts","@c1"],headwear:["pilot headset","@c2"],gloves:["plugsuit gloves","@c1"]}}];

  /* outfit pieces into the catalog */
  [FANTASY,MYTHS,COSMIC].forEach(L=>L.forEach(s=>Object.entries(s.w1).forEach(([f,a])=>START.item(f,a[0],/open|pulled|hiked|torn|fallen|slipped|aside|off/.test(a[0])?"L":"CUS","costume,boudoir"))));
  START.option("expression","bratty, flushed glare melting into pleasure",GX);

  /* v209: the faceless man "all about her" is the default; his point of view only where she is looking up at him */
  const POV_KEEP=new Set(["dancer","empress","angel","captain"]);
  const T_=window.PAIR_TEXT;
  let after="Academy Cosplay Punishment: Office Hours";
  function set(label,pre,scen){
    scen.forEach(s=>START.option("posture",s.pose,GX));
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],k=(i/scen.length|0)%s.lines.length;
      /* the second round of girls gets a different face, so no two girls in a set look the same */
      const fi=(s.face+(k?2:0))%FACES.length,si=s.sfx;   /* sound effects stay matched to the act */
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);o[f]=b});return o};
      const texts=[{k:"head",st:"top",who:"",t:s.head},{k:"speech",st:fi===4?"whisper":"shaky",who:"c1",t:s.lines[k]}].concat(SFXS[si].map(([st,t])=>({k:"sfx",st,who:"",t})));
      texts.forEach(it=>{it.s=T_.sentence(it,{gm:"far"})});
      const txTags=[...new Set(texts.flatMap(it=>T_.tags(it)))];
      const tags=dedupe(`${s.tags}, ${BASE_TAGS}, ${txTags.join(", ")}`);
      const scene=[texts[0].s,s.text,texts[1].s,FACES[fi][1],texts[2].s,texts[3].s,texts[4].s].join(" ")+" "+tags;
      const c1=Object.assign({},AROUSE,{expression:"bratty, flushed glare melting into pleasure",posture:s.pose});
      return{id:pre+h,base:ACAD.robes(h),name:`${s.role}: ${s.head}`,c:Object.assign({age:"woman"},c1),
        outfit:{oname:s.role+" cosplay",look:"costume",items:res(s.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"cowboy shot",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",gm:POV_KEEP.has(s.k)?"pov":"far",outfit:"scene",scene,act:s.act,dir:"ba",explicit:true,penis:true,emph:"max",
            ex1:FACES[fi][0],ex1k:"",tags1:s.tags1+", open clothes, breasts out",tags2:s.man,texts,txTags,
            c1,w1:{name:s.role+" cosplay",look:"costume",f:s.w1},compact:false,fit:true}},
        tags:["cosplay","roleplay","depraved","bdsm","explicit","sex","faceless male","headline","single scene",h,s.k],
        blurb:`“${s.head}.” ${cap(h)} as ${/^[aeiou]/i.test(s.role)?"an":"a"} ${s.role.toLowerCase()}, caught and daring him to punish her, and he does. A roleplay she's loving; the man is faceless, so it's all about her.`};
    }),{after});
    after=label;
  }
  set("Academy Depraved Cosplay: Fantasy Kingdom","dcf",FANTASY);
  set("Academy Depraved Cosplay: Myths and Legends","dcm",MYTHS);
  set("Academy Depraved Cosplay: Cosmic","dcc",COSMIC);
})();

/* ---- v209: three sets of cosplay impregnation. Every girl has a scheme to get pregnant, each more depraved or more
   ridiculous than the last, and she pulls it off in costume. He is a faceless man and a very willing participant in
   every scheme (she asks, begs, bribes or presents a signed contract; nobody is tricked), the image is all about her.
   Built like the cosplay punishment sets: a headline, her line, three sound effects, a scene expression, actions in
   their directions, Strongest emphasis, all editable in the Scene step. Adult women and men only; explicit, held by
   the safeguard like every explicit scene.
     Academy Cosplay Baby Fever: Fertility Rites      12 schemes in mythic and seasonal costume
     Academy Cosplay Baby Fever: Bedroom Schemes      12 comical schemes at home
     Academy Cosplay Baby Fever: Total Commitment     12 of the most depraved */
(function(){
  if(!ACAD.HUM||!window.PAIR||!window.PAIR_TEXT||!window.PAIR_ACTS)return;
  const {HS}=ACAD.HUM,GX="Explicit (adult)";
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum overflowing from her pussy and dripping down her thighs"};
  const MUST="an anime style with high detail, a blurry background, a detailed foreground outlined in black, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes";
  const BASE_TAGS="cosplay, impregnation, creampie, cum in pussy, cum overflow, motion lines, sweat, moaning";
  const FACES=[
    ["heart-shaped pupils, blush, open mouth, smile, drooling, sweat, heavy breathing",
     "Her eyes are pink hearts and she is grinning with pure baby fever, drooling with happiness as she feels every pulse inside her."],
    ["ahegao, rolling eyes, heart-shaped pupils, tongue out, drooling, heavy blush, tears, trembling",
     "Her eyes roll back with hearts in her pupils and her tongue lolls out in a fucked-silly ahegao, completely lost in being bred."],
    ["smug, smirk, half-closed eyes, heavy blush, sweat, v sign",
     "She grins with smug triumph, her scheme working perfectly, already flashing a victory sign."],
    ["determined, v-shaped eyebrows, clenched teeth, heavy blush, sweat, teary eyes",
     "She is red-faced and determined, gritting her teeth and refusing to let a single drop escape."],
    ["dazed, half-closed eyes, satisfied smile, heavy blush, heavy breathing, sweat, tears",
     "She lies dazed and glowing, a satisfied, dreamy smile on her flushed face, hands cradling her lower belly."]];
  const SFXS=[
    [["hearty","ah♡ ah♡ ah♡"],["lewd","pump pump"],["big","SPLURT"]],
    [["hearty","breed me♡ breed me♡"],["lewd","plap plap"],["big","GUSH"]],
    [["hearty","mmmh♡"],["lewd","glug glug"],["big","DING DING"]],
    [["hearty","more♡ more♡"],["lewd","squelch squelch"],["big","BOOM"]],
    [["hearty","hnngh♡♡♡"],["lewd","drip drip"],["big","POW"]]];
  const A=o=>[].concat((o.m||"").split(",").filter(x=>x.trim()).map(x=>"mutual#"+x.trim()),(o.ab||"").split(",").filter(x=>x.trim()).map(x=>"source#"+x.trim()),(o.ba||"").split(",").filter(x=>x.trim()).map(x=>"target#"+x.trim())).join(", ");

  /* scenario: {k, role, head, man, text, pose, act, pov, face, sfx, lines[2], tags, tags1, w1}; he is always a willing partner */
  const RITES=[
{k:"goddess",role:"Fertility goddess",head:"She Declared Herself a Fertility Goddess and Demanded Worship",man:"loincloth, gold armbands, laurel wreath",
  text:"On a flower-strewn altar she built herself, {partner} worships the self-declared fertility goddess in a deep mating press, filling her as rose petals rain down and her handmade 'TEMPLE OF BREEDING' banner hangs crooked behind them.",
  pose:"folded on her back on an altar, legs pinned back",act:A({ba:"sex, vaginal, mating press, creampie, impregnation"}),pov:false,face:1,sfx:1,
  lines:["Worship me! Fill your goddess!","Offerings go INSIDE the goddess!"],tags:"goddess, altar, flower petals, banner, mating press, impregnation",tags1:"mating press, flower crown, cum overflow",
  w1:{top:["goddess toga slipped off the shoulders over bare breasts","white"],headwear:["flower crown","@c1"],wristAccessory:["golden arm cuffs","@metal"]}},
{k:"bunny",role:"Easter bunny",head:"She Dressed as a Bunny Because Bunnies Breed Like Crazy",man:"t-shirt, jeans, belt",
  text:"In a living room full of plastic eggs, {partner} takes her doggystyle as she wiggles her fluffy bunny tail, painted eggs rolling everywhere and a sign reading 'BREEDING SEASON' taped to the wall.",
  pose:"on all fours, wiggling her hips, looking back",act:A({ba:"sex, vaginal, doggystyle, creampie"}),pov:false,face:0,sfx:0,
  lines:["Bunnies do it ALL DAY! Again!","Hop to it! Breed me like a bunny!"],tags:"bunny ears, bunny tail, easter, easter egg, doggystyle, all fours",tags1:"bunny ears, bunny tail, all fours",
  w1:{top:["bunny bodysuit pulled down to the waist","@c1"],headwear:["fluffy bunny ears headband","@light"],legwear:["sheer pantyhose","@dark"]}},
{k:"stork",role:"Stork",head:"She Dressed as the Stork to Cut Out the Middleman",man:"t-shirt, sweatpants",
  text:"In a nest of pillows and blankets she built in the bedroom, {partner} takes her in the lotus position as she clings to him in a feathered stork costume, a bundle-shaped pillow and a 'SPECIAL DELIVERY' sign beside them.",
  pose:"sitting in her lover's lap facing him, legs wrapped around him",act:A({m:"upright straddle, hug",ba:"sex, vaginal, creampie"}),pov:false,face:2,sfx:2,
  lines:["Special delivery... from YOU to ME!","The stork doesn't wait! Deliver it!"],tags:"stork, bird costume, feathers, nest, pillow, sign, upright straddle",tags1:"feathers, legs around waist, wings costume",
  w1:{top:["feathered stork costume open over bare breasts","white"],headwear:["stork beak hat","orange"],hipAccessory:["feathered wings costume","white"]}},
{k:"harvest",role:"Harvest maiden",head:"She Read That Babies Come from the Harvest Moon",man:"farmer's flannel shirt, overalls, straw hat",
  text:"In a hay barn under the harvest moon, {partner} has her riding him in the hay in the cowgirl position, grinding down to take every drop, pumpkins and corn stalks around them and the full moon in the loft window.",
  pose:"riding on top, grinding her hips down",act:A({ab:"cowgirl position, girl on top, grinding",ba:"sex, vaginal, creampie"}),pov:false,face:1,sfx:3,
  lines:["The moon's FULL and so am I!","Plant your seeds, farmer!"],tags:"harvest moon, full moon, barn, hay, pumpkin, cowgirl position, grinding",tags1:"girl on top, straw in hair",
  w1:{top:["peasant blouse pulled off the shoulders over bare breasts","@light"],bottom:["patchwork skirt hiked up","@c1"],headwear:["straw hat","yellow"]}},
{k:"moonpriestess",role:"Moon priestess",head:"She Timed a Lunar Ritual to the Exact Second of Ovulation",man:"ritual robes, hood, silver moon pendant",
  text:"In a circle of candles on the rooftop, {partner} takes her standing from behind as she raises her arms to the full moon, a phone timer reading 'OVULATION: NOW' propped against a candle.",
  pose:"standing with arms raised, bent slightly forward",act:A({ba:"sex, vaginal, standing sex, sex from behind, creampie"}),pov:false,face:3,sfx:2,
  lines:["NOW! The moon says NOW!","Every second counts! Faster!"],tags:"priestess, rooftop, full moon, candle, magic circle, phone, timer, standing sex",tags1:"arms up, moonlight",
  w1:{top:["moon priestess robe fallen open over bare breasts","@c1"],headwear:["crescent moon circlet","silver"],neckAccessory:["moonstone necklace","@light"]}},
{k:"cowgirlw",role:"Rodeo cowgirl",head:"She Lassoed Him and Called It Breeding Season",man:"cowboy hat, flannel shirt, jeans, cowboy boots",
  text:"In a barn stall, {partner}, happily lassoed, sits in the hay while she rides him reverse, spurs jangling, a hand-painted 'BREEDING SEASON IS OPEN' sign on the stall door.",
  pose:"riding reverse in her lover's lap, looking back",act:A({ab:"reverse cowgirl position, girl on top",ba:"sex, vaginal, creampie"}),pov:false,face:2,sfx:1,
  lines:["Yeehaw! Breed me, cowboy!","I caught you fair and square!"],tags:"cowgirl (western), cowboy hat, barn, hay, lasso, sign, reverse cowgirl position",tags1:"cowboy hat, lasso, girl on top",
  w1:{top:["western shirt tied up and open over bare breasts","@c1"],headwear:["cowboy hat","@dark"],bottom:["denim chaps","blue"],legwear:["cowboy boots","brown"]}},
{k:"mermaid",role:"Mermaid",head:"She Insisted Mermaids Spawn in the Tub",man:"swim trunks",
  text:"In an overflowing bubble bath, {partner} takes her spooning in the warm water, her sequined tail costume peeled down to her knees, rubber ducks bobbing and bubbles everywhere.",
  pose:"lying on her side in a bath, one leg lifted",act:A({ba:"sex, vaginal, spooning, creampie",m:"bathing"}),pov:false,face:0,sfx:4,
  lines:["Spawning season! Don't pull out!","Mermaids need LOTS of it!"],tags:"mermaid costume, bathtub, bubble bath, rubber duck, bubbles, wet, spooning",tags1:"wet hair, bubbles, spooning",
  w1:{top:["seashell bikini top pulled down","@c1"],bottom:["sequined mermaid tail costume peeled down","@c2"],headwear:["pearl and shell hair clips","white"]}},
{k:"midsummer",role:"Midsummer fairy queen",head:"She Crowned Herself Queen of the Midsummer Night and Ordered an Heir",man:"forest king costume, antler crown, leaf cloak",
  text:"In a glowing mushroom ring in the woods, {partner} takes her in a full nelson, lifting her so her legs spread high to the fireflies, cum dripping into the moss as she cheers.",
  pose:"held in a full nelson, legs spread high",act:A({ba:"sex, vaginal, full nelson, creampie"}),pov:false,face:1,sfx:0,
  lines:["The queen needs an heir! NOW!","By royal decree... cum inside!"],tags:"fairy ring, mushroom, forest, fireflies, night, glowing, full nelson",tags1:"full nelson, spread legs, flower crown",
  w1:{top:["petal gown pulled down to the waist","@c1"],headwear:["moonflower crown","@c2"],hipAccessory:["glittering costume wings","@light"]}},
{k:"bride",role:"Bride",head:"She Threw Herself a Fake Wedding Just for the Wedding Night",man:"tuxedo, bow tie, boutonniere",
  text:"In a honeymoon suite she booked under 'Mr. and Mrs. Totally Real', {partner} takes her on the rose-covered bed, her legs locked tight around his waist so he can't pull out, the fake marriage certificate on the nightstand.",
  pose:"lying on her back, legs locked around her lover's waist",act:A({ab:"leg lock",ba:"sex, vaginal, missionary, creampie"}),pov:false,face:2,sfx:1,
  lines:["You may now breed the bride!","Till death do us... don't stop!"],tags:"wedding dress, bride, veil, honeymoon, rose petals, leg lock",tags1:"leg lock, veil, wedding dress",
  w1:{top:["wedding dress pulled down to the waist","white"],headwear:["bridal veil","white"],legwear:["white garter stockings","white"]}},
{k:"cowprint",role:"Dairy maid",head:"She Decided She Was a Prize-Winning Breeder at the County Fair",man:"farmer's overalls, flannel shirt",
  text:"In a county fair barn with a giant blue ribbon pinned to her, {partner} takes her from behind while she leans over the stall gate, a judge's scorecard reading '10/10 BREEDER' nailed above them.",
  pose:"bent over a stall gate, looking back",act:A({ba:"sex, vaginal, sex from behind, bent over, creampie"}),pov:false,face:0,sfx:3,
  lines:["First prize goes INSIDE!","Blue ribbon breeder! Prove it!"],tags:"county fair, barn, blue ribbon, stall, bent over",tags1:"blue ribbon, cow print, bent over",
  w1:{top:["cow print bikini top pulled down","white"],headwear:["cow ear headband","white"],neckAccessory:["cowbell collar","@metal"]}},
{k:"pumpkin",role:"Pumpkin witch",head:"She Brewed a Fertility Potion That Was Just Wine",man:"warlock costume, black cloak",
  text:"In a spooky kitchen full of jack-o'-lanterns, {partner} takes her on the counter beside a bubbling cauldron of wine labelled 'BABY POTION', her legs wrapped around him as she drinks straight from the ladle.",
  pose:"sitting on a counter, legs wrapped around her lover",act:A({ba:"sex, vaginal, sitting on counter, creampie",ab:"legs around waist"}),pov:false,face:1,sfx:4,
  lines:["The potion says it works! Hic!","Brew a baby with me!"],tags:"witch, jack-o'-lantern, cauldron, kitchen, wine, halloween, sitting on counter",tags1:"witch hat, legs around waist",
  w1:{top:["pumpkin witch dress pulled down to the waist","orange"],headwear:["witch hat","@dark"],legwear:["striped thigh-high stockings","orange"]}},
{k:"santa",role:"Mrs. Claus",head:"She Asked Santa for One Thing This Year",man:"santa suit pants, suspenders, santa hat",
  text:"In front of the fireplace, {partner} takes her on her back on the fur rug as she holds her legs open herself, a stocking on the mantel stuffed with ovulation tests and a letter reading 'DEAR SANTA: A BABY'.",
  pose:"lying on her back holding her own legs open",act:A({ab:"spread legs, holding own legs",ba:"sex, vaginal, missionary, creampie"}),pov:false,face:0,sfx:1,
  lines:["I was VERY good this year!","Down my chimney, Santa!"],tags:"christmas, fireplace, fur rug, stocking, letter, santa hat, spread legs",tags1:"holding own legs, spread legs, santa hat",
  w1:{top:["santa dress pulled down to the waist","red"],headwear:["santa hat","red"],legwear:["white fur-trimmed stockings","white"]}}];

  const SCHEMES=[
{k:"spreadsheet",role:"Office lady",head:"She Made a 47-Slide Presentation on Why He Should Breed Her",man:"dress shirt, loosened tie, slacks",
  text:"In a conference room with her slideshow still on the projector, 'SLIDE 47: DO IT NOW', {partner} takes her bent over the table on top of a printed spreadsheet of her ovulation dates.",
  pose:"bent over a conference table, looking back",act:A({ba:"sex, vaginal, sex from behind, bent over table, creampie"}),pov:false,face:2,sfx:2,
  lines:["Any questions? No? Then FILL ME!","I have charts! CHARTS!"],tags:"office lady, conference room, projector, presentation, spreadsheet, bent over table",tags1:"glasses, bent over",
  w1:{top:["blouse unbuttoned over bare breasts","white"],bottom:["pencil skirt hiked up around the waist","@dark"],eyewear:["round glasses","black"]}},
{k:"billboard",role:"Billboard model",head:"She Rented a Billboard That Said 'BREED ME' with Her Phone Number",man:"hoodie, jeans",
  text:"On the catwalk of her own giant billboard reading 'BREED ME ♡ CALL ME', {partner} takes her standing against the sign at sunset, traffic honking far below.",
  pose:"standing, pressed back against a billboard, one leg lifted",act:A({ba:"sex, vaginal, standing sex, leg lift, creampie"}),pov:false,face:2,sfx:3,
  lines:["IT WORKED! You CALLED!","Everybody's watching! Breed me anyway!"],tags:"billboard, rooftop, city, sunset, standing sex, leg lift",tags1:"leg lift, standing",
  w1:{top:["glamour model bodysuit pulled down to the waist","@c1"],legwear:["high heels","@dark"],eyewear:["star-shaped sunglasses on her head","@c2"]}},
{k:"chef",role:"Chef",head:"She Cooked Every 'Fertility Food' on the Internet at Once",man:"t-shirt, apron, jeans",
  text:"In a kitchen buried in oysters, pineapple, honey and avocados, {partner} takes her on the kitchen island in the missionary position, her legs in the air and a tray of 'fertility cupcakes' smashed under her back.",
  pose:"lying on her back on a kitchen island, legs up",act:A({ba:"sex, vaginal, missionary, legs up, creampie"}),pov:false,face:1,sfx:0,
  lines:["Eat an oyster and BREED ME!","I made a seven-course baby dinner!"],tags:"chef, kitchen, oyster, pineapple, honey, cupcake, food, missionary, legs up",tags1:"legs up, chef hat, frosting on skin",
  w1:{top:["chef's jacket hanging open over bare breasts","white"],headwear:["chef hat","white"],waistAccessory:["apron","@c1"]}},
{k:"lab",role:"Scientist",head:"She Built a Machine to Calculate the Perfect Angle",man:"lab coat, t-shirt, jeans",
  text:"In her home lab, {partner} takes her in a piledriver exactly as her homemade 'OPTIMAL ANGLE CALCULATOR' instructs, a protractor taped to her thigh and graphs pinned to every wall.",
  pose:"folded upside down in a piledriver, legs over her head",act:A({ba:"sex, vaginal, piledriver (sex), deep penetration, creampie"}),pov:false,face:3,sfx:2,
  lines:["Forty-seven degrees! HOLD IT THERE!","Gravity is on our side! Science!"],tags:"scientist, laboratory, graph, protractor, piledriver (sex), upside-down, deep penetration",tags1:"upside-down, legs over head, lab coat",
  w1:{top:["lab coat hanging open over bare breasts","white"],eyewear:["safety goggles","clear"],bottom:["skirt hiked up around the waist","@c1"]}},
{k:"contract",role:"Lawyer",head:"She Drafted a Legally Binding Impregnation Contract",man:"suit, dress shirt, tie",
  text:"In her office, {partner} signs the last page of her 30-page 'BREEDING AGREEMENT' with a flourish, then takes her in his lap on her leather chair in the lotus position, the notary stamp still in her hand.",
  pose:"sitting in her lover's lap facing him, legs wrapped around him",act:A({m:"upright straddle",ba:"sex, vaginal, creampie"}),pov:false,face:2,sfx:2,
  lines:["Signed, sealed... now DELIVER!","Clause 12: no pulling out!"],tags:"lawyer, office, contract, documents, pen, leather chair, upright straddle",tags1:"glasses, legs around waist",
  w1:{top:["blazer and blouse open over bare breasts","@dark"],bottom:["pencil skirt hiked up around the waist","@dark"],eyewear:["rectangular glasses","black"]}},
{k:"nurse",role:"Fertility nurse",head:"She Opened a 'Fertility Clinic' in Her Bedroom",man:"t-shirt, jeans",
  text:"In her bedroom clinic with a sign reading 'NO WAITING ♡ DR. ME', {partner} takes her on the paper-covered exam table she bought online, her feet up in the stirrups and a clipboard checklist reading 'STEP 1: CUM INSIDE'.",
  pose:"lying back on an exam table, legs up in stirrups",act:A({ba:"sex, vaginal, legs up, spread legs, creampie"}),pov:false,face:0,sfx:0,
  lines:["The doctor will see you NOW!","Treatment: one baby, stat!"],tags:"nurse, examination table, stirrups, clipboard, sign, spread legs, legs up",tags1:"stirrups, spread legs, nurse cap",
  w1:{top:["nurse dress unbuttoned over bare breasts","@c1"],headwear:["nurse cap","white"],neckAccessory:["stethoscope","silver"]}},
{k:"gamer",role:"Streamer",head:"She Made It a Charity Stream: One Donation, One Creampie",man:"gaming headset, t-shirt",
  text:"In her neon gaming room, {partner} takes her from behind in her gaming chair while the donation goal on screen reads 'BABY: 87%', chat exploding with hearts and her cat-ear headset askew.",
  pose:"kneeling on a gaming chair, bent over the backrest",act:A({ba:"sex, vaginal, sex from behind, creampie"}),pov:false,face:1,sfx:3,
  lines:["Thanks for the donation! FILL ME!","Chat says AGAIN! Don't let chat down!"],tags:"streamer, gaming chair, monitor, neon lights, headset, cat ear headphones, sex from behind",tags1:"cat ear headphones, gaming chair",
  w1:{top:["oversized gamer hoodie pushed up over her breasts","@c1"],headwear:["cat ear headphones","@c2"],legwear:["striped thigh-high socks","@c1"]}},
{k:"realtor",role:"Real estate agent",head:"She Showed Him the Nursery Before They'd Even Kissed",man:"polo shirt, chinos",
  text:"In a fully decorated nursery she staged in her apartment, {partner} takes her on the rug in a prone bone beside a crib, mobile spinning overhead and a 'SOLD ♡' sign on the door.",
  pose:"lying face-down, hips raised",act:A({ba:"sex, vaginal, prone bone, creampie"}),pov:false,face:0,sfx:4,
  lines:["The nursery's ready! Are YOU?","Move-in date: TONIGHT!"],tags:"real estate agent, nursery, crib, mobile, rug, sign, prone bone",tags1:"prone bone, name badge",
  w1:{top:["blazer and blouse open over bare breasts","@c1"],bottom:["pencil skirt hiked up around the waist","@dark"],tagCharm:["name badge","@metal"]}},
{k:"genie",role:"Genie",head:"She Popped Out of a Lamp and Granted Herself One Wish",man:"t-shirt, jeans",
  text:"On a pile of silk pillows in her 'magic lamp' blanket fort, {partner} takes her riding him while she counts down on her fingers, 'WISH #1: BABY. WISH #2: BABY. WISH #3: TWINS'.",
  pose:"riding on top, counting on her fingers",act:A({ab:"cowgirl position, girl on top",ba:"sex, vaginal, creampie"}),pov:false,face:2,sfx:1,
  lines:["Your wish is my... BABY!","Three wishes! All of them inside!"],tags:"genie, harem outfit, pillow, blanket fort, magic lamp, cowgirl position",tags1:"girl on top, harem pants",
  w1:{top:["genie bra pulled down","@c1"],bottom:["sheer harem pants","@c2"],wristAccessory:["golden bangles","@metal"],headwear:["genie veil headpiece","@c2"]}},
{k:"pilot",role:"Flight attendant",head:"She Booked a Long-Haul Flight and Called It the Mile-High Baby Club",man:"t-shirt, jeans",
  text:"In the airplane bathroom at 30,000 feet, {partner} takes her sitting on the tiny sink, her legs around his waist and her heels on the mirror, a 'MILE HIGH BABY CLUB' membership card stuck to her cheek.",
  pose:"sitting on a tiny sink, legs wrapped around her lover",act:A({ab:"legs around waist",ba:"sex, vaginal, sitting on counter, creampie"}),pov:false,face:1,sfx:0,
  lines:["Turbulence! Hold it in!","Please return your seed to the upright position!"],tags:"flight attendant, airplane bathroom, sink, mirror, sitting on counter",tags1:"legs around waist, flight attendant cap",
  w1:{top:["flight attendant blouse unbuttoned over bare breasts","@light"],bottom:["pencil skirt hiked up around the waist","@c1"],headwear:["flight attendant cap","@c1"]}},
{k:"idolfan",role:"Superhero",head:"She Wore a Superhero Costume Because 'Super Babies'",man:"t-shirt with a lightning logo, jeans",
  text:"On the rooftop at night with her cape flapping, {partner} takes her in a standing split against the water tower, her leg up on his shoulder and a hand-drawn 'SUPER BABY PROJECT' blueprint taped beside them.",
  pose:"standing split against a wall, one leg on her lover's shoulder",act:A({ba:"sex, vaginal, standing split, leg up, creampie"}),pov:false,face:3,sfx:4,
  lines:["With great power comes GREAT BREEDING!","Super speed! SUPER SPERM!"],tags:"superhero, cape, rooftop, night, city lights, water tower, standing split",tags1:"cape, standing split, leg up",
  w1:{top:["superhero bodysuit torn open over bare breasts","@c1"],hipAccessory:["flowing cape","@c2"],eyewear:["domino mask","@dark"]}},
{k:"maid",role:"Maid",head:"She Wrote 'Breed the Maid' on His Chore Chart",man:"t-shirt, sweatpants",
  text:"In the laundry room, {partner} takes her on the rumbling washing machine as she checks off the last chore, 'BREED THE MAID ✓', a basket of laundry spilled across the floor.",
  pose:"sitting on a washing machine, legs spread around her lover",act:A({ba:"sex, vaginal, sitting, creampie",ab:"legs around waist"}),pov:false,face:0,sfx:2,
  lines:["Chores aren't done until I'm FULL!","Spin cycle! Don't stop!"],tags:"maid, laundry room, washing machine, laundry basket, chore chart",tags1:"maid headdress, legs around waist",
  w1:{top:["maid dress pulled down to the waist","@dark"],waistAccessory:["frilled maid apron","white"],headwear:["maid headdress","white"]}}];

  const COMMITMENT=[
{k:"marathon",role:"Marathon runner",head:"She Signed Up for a 24-Hour Breeding Marathon",man:"marathon bib, running shorts",
  text:"In a bedroom turned race course with a finish-line banner, {partner} takes her in a mating press while a tally of 23 strokes is written across her thighs, the clock reading 23:58, cum overflowing onto a soaked towel.",
  pose:"folded on her back, legs pinned back",act:A({ba:"sex, vaginal, mating press, creampie, cum overflow"}),pov:false,face:1,sfx:1,
  lines:["Lap twenty-four! FINISH INSIDE!","No water breaks! Only CUM breaks!"],tags:"marathon, race bib, finish line, banner, clock, tally, body writing, mating press, cum overflow",tags1:"tally, body writing, race bib",
  w1:{top:["running crop top pulled up over her breasts","@c1"],bottom:["running shorts pulled down","@dark"],headwear:["sweatband","@c2"]}},
{k:"headstand",role:"Yoga instructor",head:"She Did a Headstand After Every Load to Help Them Swim",man:"tank top, shorts",
  text:"In her yoga studio, {partner} holds her ankles as she balances in a shaky headstand right after he came, cum dripping down her belly toward her chest, a whiteboard reading 'HEADSTAND #9 ♡' behind them.",
  pose:"doing a headstand, legs held up by her lover",act:A({ba:"holding legs, creampie, cum drip"}),pov:false,face:3,sfx:4,
  lines:["Swim, little guys! SWIM!","Hold my legs! Gravity is helping!"],tags:"yoga, yoga studio, headstand, upside-down, after sex, cum drip, whiteboard",tags1:"upside-down, headstand, cum on stomach",
  w1:{top:["sports bra pulled up over her breasts","@c1"],bottom:["yoga pants pulled down to the knees","@dark"],headwear:["hair scrunchie","@c2"]}},
{k:"plug",role:"Plumber",head:"She Dressed as a Plumber to 'Seal the Pipe' After Every Load",man:"t-shirt, jeans, tool belt",
  text:"On the bathroom floor, {partner} pulls out of her doggystyle and she immediately shoves a heart-jeweled plug into her overflowing pussy, wrench in her other hand, a sticky note on the mirror reading 'NO LEAKS'.",
  pose:"on all fours, reaching back between her legs",act:A({ba:"sex, vaginal, doggystyle, creampie",ab:"plug"}),pov:false,face:3,sfx:4,
  lines:["No leaks on MY watch!","Plugged! Now go again!"],tags:"plumber, bathroom, wrench, jewel plug, doggystyle, all fours, cum overflow",tags1:"jeweled plug, all fours, tool belt",
  w1:{top:["plumber overalls hanging off over bare breasts","blue"],headwear:["plumber cap","red"],belt:["tool belt","brown"]}},
{k:"inflation",role:"Balloon artist",head:"She Wanted to Be Bloated Before Morning",man:"t-shirt, jeans",
  text:"In a room full of party balloons, {partner} keeps filling her in the cowgirl position until her stomach swells round with cum, the cum dripping down his shaft, a balloon reading 'IT'S A BABY?' tied to her wrist.",
  pose:"riding on top, hands on her swollen belly",act:A({ab:"cowgirl position, girl on top",ba:"sex, vaginal, creampie, cum inflation"}),pov:false,face:1,sfx:3,
  lines:["Bigger! Make me BIGGER!","One more load! I can fit ONE MORE!"],tags:"balloon, party, cum inflation, stomach bulge, cowgirl position",tags1:"cum inflation, hands on own stomach, girl on top",
  w1:{top:["clown-style party romper pulled down to the waist","@c1"],headwear:["party hat","@c2"],wristAccessory:["balloon string bracelet","@c2"]}},
{k:"xray",role:"Radiologist",head:"She Bought an X-Ray Machine Just to Watch It Happen",man:"scrubs pants, t-shirt",
  text:"In her makeshift x-ray room, {partner} fucks her standing from behind against the screen, the glowing x-ray cross-section showing his cock deep inside her and cum flooding her womb toward a waiting egg.",
  pose:"standing, hands braced on an x-ray screen, bent forward",act:A({ba:"sex, vaginal, standing sex, sex from behind, internal cumshot, impregnation"}),pov:false,face:0,sfx:0,
  lines:["I can SEE it! They're swimming!","Aim for the egg! LEFT! LEFT!"],tags:"x-ray, cross-section, internal cumshot, ovum, sperm cell, impregnation, uterus, standing sex",tags1:"cross-section, x-ray, standing sex",
  w1:{top:["radiologist scrub top pulled up over her breasts","@c1"],neckAccessory:["lead apron pushed aside","@dark"],eyewear:["round glasses","black"]}},
{k:"womb",role:"Tattoo artist",head:"She Tattooed a Womb Crest on Herself as a Target",man:"tank top, jeans",
  text:"In her tattoo studio, {partner} takes her on the tattoo chair with her legs over his shoulders, her fresh glowing womb tattoo lighting up pink with every thrust and the ink still shining, a 'TARGET ↓' arrow inked above it.",
  pose:"lying back in a tattoo chair, legs over her lover's shoulders",act:A({ba:"sex, vaginal, legs over shoulders, deep penetration, creampie"}),pov:false,face:1,sfx:2,
  lines:["Aim for the TATTOO!","It's glowing! It's WORKING!"],tags:"tattoo artist, tattoo studio, pubic tattoo, womb tattoo, glowing tattoo, legs over shoulders",tags1:"womb tattoo, glowing tattoo, legs over shoulders",
  w1:{top:["tank top pulled up over her breasts","@dark"],bottom:["ripped jeans pulled down","blue"],gloves:["black latex gloves","black"]}},
{k:"pinata",role:"Party planner",head:"She Threw Herself a Gender-Reveal Party Before Getting Pregnant",man:"party hat, t-shirt, jeans",
  text:"At her own gender-reveal party, {partner} takes her on the cake table in a reverse cowgirl in his lap, pink and blue confetti bursting from a popped balloon and a banner reading 'IT'S A ... TBD!'.",
  pose:"sitting reverse in her lover's lap, arms raised in celebration",act:A({ab:"reverse cowgirl position",ba:"sex, vaginal, sitting on lap, creampie"}),pov:false,face:2,sfx:3,
  lines:["Boy or girl? Doesn't matter! CUM!","Reveal it INSIDE ME!"],tags:"gender reveal, party, confetti, balloon, cake, banner, reverse cowgirl position",tags1:"party hat, confetti, arms up",
  w1:{top:["party dress pulled down to the waist","pink"],headwear:["party hat","blue"],legwear:["sparkly heels","@metal"]}},
{k:"tests",role:"Pharmacist",head:"She Bought Every Pregnancy Test in the Pharmacy... in Advance",man:"t-shirt, jeans",
  text:"Behind the pharmacy counter, {partner} takes her on top of a mountain of unopened pregnancy tests in a full nelson, a hundred boxes spilling everywhere and her name tag reading 'MOM (SOON)'.",
  pose:"held in a full nelson, legs spread high",act:A({ba:"sex, vaginal, full nelson, creampie"}),pov:false,face:1,sfx:4,
  lines:["I have to USE these somehow!","Two lines! I need TWO LINES!"],tags:"pharmacist, pharmacy, pregnancy test, boxes, name tag, full nelson",tags1:"full nelson, name tag, spread legs",
  w1:{top:["pharmacist coat hanging open over bare breasts","white"],tagCharm:["name tag","white"],eyewear:["round glasses","black"]}},
{k:"trap",role:"Spider queen",head:"She Built a Web Out of Yarn So He'd Never Leave the Bed",man:"t-shirt, sweatpants",
  text:"In a bedroom tangled with a giant yarn spiderweb, {partner} takes her in the web on her back with her legs locked around him, both of them laughing and tangled in string, a sign reading 'NO EXIT UNTIL PREGNANT'.",
  pose:"lying on her back in a web of yarn, legs locked around her lover",act:A({ab:"leg lock",ba:"sex, vaginal, missionary, creampie",m:"laughing"}),pov:false,face:0,sfx:1,
  lines:["You're in my web now! Stay inside!","Nobody leaves until there's a baby!"],tags:"spider web, yarn, bedroom, sign, leg lock, laughing",tags1:"leg lock, spider costume",
  w1:{top:["spider queen bodysuit torn open over bare breasts","@dark"],headwear:["spider eye tiara","@c1"],gloves:["long black gloves","black"]}},
{k:"calendar",role:"Weather girl",head:"She Announced Her Own Ovulation on the Evening News",man:"suit jacket, dress shirt",
  text:"In front of the green-screen weather map reading '100% CHANCE OF BABY', {partner} takes her bent over the anchor desk, the camera light still red and her pointer clicker dropped on the floor.",
  pose:"bent over a news desk, looking back at the camera",act:A({ba:"sex, vaginal, sex from behind, bent over desk, creampie"}),pov:false,face:2,sfx:2,
  lines:["Today's forecast: CREAMPIE!","Heavy showers expected... inside!"],tags:"weather girl, news studio, weather map, green screen, camera, bent over desk",tags1:"bent over, looking at viewer",
  w1:{top:["weather girl dress pulled down to the waist","@c1"],legwear:["high heels","@dark"],earAccessory:["earpiece","black"]}},
{k:"pinup",role:"Pin-up girl",head:"She Hung Up a 'Breed Me' Pin-Up of Herself in Every Room",man:"white t-shirt, jeans",
  text:"In a bedroom where every wall is covered in her own pin-up posters reading 'BREED ME', {partner} takes her spooning on the bed as she points proudly at the biggest one.",
  pose:"lying on her side, one leg lifted, pointing",act:A({ba:"sex, vaginal, spooning, creampie"}),pov:false,face:2,sfx:0,
  lines:["Every room! Every poster! Every DAY!","Read the poster! READ IT!"],tags:"pin-up, poster, bedroom, spooning, pointing",tags1:"pointing, spooning, polka dots",
  w1:{top:["polka-dot halter dress pulled down to the waist","@c1"],headwear:["polka-dot headscarf bow","@c2"],legwear:["seamed stockings","@dark"]}},
{k:"finale",role:"Ringmaster",head:"She Turned Her Bedroom into a Circus: The Greatest Breeding Show on Earth",man:"ringmaster's jacket, top hat",
  text:"Under a striped circus tent she hung from the ceiling, {partner} takes her in a suspended congress while she cracks her whip at an imaginary crowd, cum dripping onto the sawdust and a spotlight on them both.",
  pose:"carried in her lover's arms, legs wrapped around him, waving a whip",act:A({ba:"sex, vaginal, suspended congress, creampie",ab:"legs around waist"}),pov:false,face:1,sfx:3,
  lines:["Ladies and gentlemen... the BREEDING!","Encore! ENCORE!"],tags:"circus, circus tent, spotlight, whip, suspended congress, carrying",tags1:"top hat, suspended congress",
  w1:{top:["ringmaster jacket open over bare breasts","red"],headwear:["mini top hat","@dark"],legwear:["thigh-high boots","@dark"]}}];

  [RITES,SCHEMES,COMMITMENT].forEach(L=>L.forEach(s=>Object.entries(s.w1).forEach(([f,a])=>START.item(f,a[0],/open|pulled|hiked|torn|fallen|slipped|aside|off|peeled|hanging/.test(a[0])?"L":"CUS","costume,boudoir"))));
  START.option("expression","giddy, determined baby-fever grin",GX);
  START.option("bodyMarkings",AROUSE.bodyMarkings,GX);

  const T_=window.PAIR_TEXT;
  let after="Academy Depraved Cosplay: Cosmic";
  function set(label,pre,scen){
    scen.forEach(s=>START.option("posture",s.pose,GX));
    START.add(label,HS.map((h,i)=>{
      const s=scen[i%scen.length],k=(i/scen.length|0)%s.lines.length;
      const fi=(s.face+(k?2:0))%FACES.length,si=s.sfx;
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);o[f]=b});return o};
      const texts=[{k:"head",st:"top",who:"",t:s.head},{k:"speech",st:"hearts",who:"c1",t:s.lines[k]}].concat(SFXS[si].map(([st,t])=>({k:"sfx",st,who:"",t})));
      texts.forEach(it=>{it.s=T_.sentence(it,{gm:"far"})});
      const txTags=[...new Set(texts.flatMap(it=>T_.tags(it)))];
      const tags=dedupe(`${s.tags}, ${BASE_TAGS}, ${txTags.join(", ")}`);
      const scene=[texts[0].s,s.text,texts[1].s,FACES[fi][1],texts[2].s,texts[3].s,texts[4].s].join(" ")+" "+tags;
      const c1=Object.assign({},AROUSE,{expression:"giddy, determined baby-fever grin",posture:s.pose});
      return{id:pre+h,base:ACAD.robes(h),name:`${s.role}: ${s.head}`,c:Object.assign({age:"woman"},c1),
        outfit:{oname:s.role+" cosplay",look:"costume",items:res(s.w1),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"cowboy shot",explicit:true,lewdtag:true,must:MUST,
          pair:{id:"",gm:s.pov?"pov":"far",outfit:"scene",scene,act:s.act,dir:"ba",explicit:true,penis:true,emph:"max",
            ex1:FACES[fi][0],ex1k:"",tags1:s.tags1+", open clothes, breasts out",tags2:s.man,texts,txTags,
            c1,w1:{name:s.role+" cosplay",look:"costume",f:s.w1},compact:false,fit:true}},
        tags:["cosplay","impregnation","explicit","sex","faceless male","headline","single scene",h,s.k],
        blurb:`“${s.head}.” ${cap(h)} as ${/^[aeiou]/i.test(s.role)?"an":"a"} ${s.role.toLowerCase()}, and her scheme works: he's all in. The man is faceless, so it's all about her.`};
    }),{after});
    after=label;
  }
  set("Academy Cosplay Baby Fever: Fertility Rites","bfr",RITES);
  set("Academy Cosplay Baby Fever: Bedroom Schemes","bfs",SCHEMES);
  set("Academy Cosplay Baby Fever: Total Commitment","bft",COMMITMENT);
})();
