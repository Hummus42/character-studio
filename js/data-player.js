/* ---- v291: the Player Character. A generic 18-year-old fourth-year of the Legends, a stand-in for the player's own
   male character in scenes with the girls. Built from the user's robes prompt (1.61 era), made more muscular and
   defined. In the studio as a starting point ("Player Character"), in the Cast picker, and in the Encyclopedia
   (Characters and Relationships). Id "playerchar" (it neither starts nor ends with a House name, so the purge's
   girl-matching leaves it alone). ---- */
(function(){
  if(typeof START==="undefined"||!START.add)return;
  const C={sex:"male",age:"young man",
    expression:"calm, composed, quietly dignified expression with a faint closed-mouth smile",impression:"a quiet, self-assured presence, eighteen and in his fourth year",
    eyeShape:"steady, perceptive almond-shaped eyes",pupilStyle:"round pupils",eyeConfig:"matching",eyeOne:"grey-blue",irisDetail:"clear grey-blue irises",lashNatural:"dark, understated eyelashes",
    browShape:"straight dark brows",noseShape:"straight nose",mouthShape:"calm, firm mouth",faceShape:"gentle oval face with a clean, defined jaw",
    markings:"a tiny faint pale nick in his left eyebrow",
    hairBase:"black",hairLength:"short",hairTexture:"tousled, blue-black",
    hairStyle:"messy, layered short cut with a single ahoge",bangs:"uneven fringe falling over his forehead and partly over one eye",
    facialHair:"clean-shaven",facialHairColor:"black",
    skinTone:"light brown",undertone:"warm",skinFinish:"healthy, natural skin",
    heightStature:"tall stature",shoulderShape:"broad, muscular shoulders",torsoShape:"athletic, well-defined V-shaped torso",
    armShape:"toned, muscular arms with defined forearms",handShape:"long-fingered and strong",
    bustSize:"firm, muscular chest",bustShape:"defined pecs",bustWeight:"firm definition",
    waistShape:"trim waist with a V-taper",stomachShape:"defined six-pack abs",hipShape:"narrow hips",buttSize:"firm, athletic butt",
    thighBuild:"strong, muscular thighs",legShape:"long, strong legs",bodySoftness:"lean, muscular athletic build",
    posture:"standing upright with relaxed shoulders, arms resting loosely at his sides, feet together, still and composed",
    nailStyle:"short, clean natural nails",
    penisColor:"light brown",penisSize:"large",penisType:"thick and veiny",pubicHair:"short, closely trimmed pubic hair"};
  const ROBES={oname:"Academy uniform",look:"costume",items:{
      top:["tailored black academy blazer with crimson piping and gold buttons over a crisp white shirt","black"],
      corset:["fitted {c} waistcoat","charcoal gray"],
      neckAccessory:["{c}-and-{c2} striped necktie","red",null,"gold"],
      tagCharm:["small Legends crest pin on the lapel","gold"],
      outerwear:["long {c} hooded academy robe with {c2} lining, worn open","black",null,"crimson"],
      bottom:["tailored trousers","black"],
      legwear:["leather boots","brown"]},
    details:{detailOne:"a thin dark cord with a small plain silver pendant around his neck"},dcol:{}};
  try{if(typeof ACAD!=="undefined"&&ACAD.opts){Object.entries(C).forEach(([k,v])=>{if(typeof v==="string"&&k!=="sex"&&k!=="age")ACAD.opts(k,[v],"Player Character")});
    Object.entries(ROBES.items).forEach(([k,a])=>ACAD.items(k,[a[0]],"CU","costume"));ACAD.items("detailOne",[ROBES.details.detailOne],"CU","costume")}}catch(e){}
  START.add("Player Character",[{id:"playerchar",name:"The Player Character",
    pal:{primary:"black",secondary:"crimson",third:"charcoal gray",accent:"gold",extra:"silver"},
    c:C,outfit:ROBES,
    more:[{oname:"Shirtless",look:"casual",items:{bottom:["low-slung gray sweatpants","charcoal gray"]},details:{detailOne:"a thin dark cord with a small plain silver pendant around his neck"},dcol:{}},
      {oname:"Nude",look:"",items:{},details:{},dcol:{}}],
    out:{framing:"full body",must:"an anime style with high detail, a simple white background, and particular emphasis on detailed hair and eyes"},
    tags:["player character","young man","legends","male"],
    blurb:"The Player Character: an eighteen-year-old fourth-year of the Legends, a stand-in for your own character in scenes with the girls. Tall and muscular, black hair with a single ahoge, grey-blue eyes."}],
    {after:"Academy Men"});
  window.PLAYER_ID="playerchar";
})();
