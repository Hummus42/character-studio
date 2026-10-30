/* species with no gendered word of their own get "male" in front so the generator does not default to a woman */
const MALE_SOLO={incubus:"incubus",merman:"merman",god:"god",siren:"male siren",harpy:"male harpy",valkyrie:"male valkyrie",dryad:"male dryad",naiad:"male naiad",arachne:"male arachne","yuki-onna":"male yuki-onna",nekomata:"male nekomata","fallen angel":"male fallen angel",archangel:"male archangel"};
function maleSubjectNoun(sp,type,noun,pre){
  if(type==="hyphen")return pre+sp+"-"+noun;
  if(type==="word")return pre+sp+" "+noun;
  return pre+(MALE_SOLO[sp]||"male "+sp);
}

/* ---- conversion tables: [regex, replacement] in order; null clears the option; "Def" is the fallback ---- */
const R_=a=>a.map(([rx,v])=>[new RegExp(rx,"i"),v]);
const SW={
  age:{f2m:R_([["^young woman$","young man"],["^woman$","man"],["^mature woman$","mature man"],["^older woman$","older man"]]),m2f:R_([["^young man$","young woman"],["^man$","woman"],["^mature man$","mature woman"],["^older man$","older woman"]])},
  subjectType:{f2m:R_([["^succubus$","incubus"],["^mermaid$","merman"],["^goddess$","god"]]),m2f:R_([["^incubus$","succubus"],["^merman$","mermaid"],["^god$","goddess"]])},
  faceShape:{f2m:R_([["petite|doll-like|youthful","oval face with balanced features"],["pretty|delicate|feminine","refined face"],["V-shaped","tapered face"],["heart-shaped","heart-shaped face with high cheekbones and a tapered chin"],["cute|bunny|mouse","round face"],["woodland","long narrow face"]]),f2mDef:"oval face with balanced features",
    m2f:R_([["square|rugged|heavy|broad|strong","balanced face with a softly squared jaw"],["chisel|angular|sculpted|sharp|hollow","elegant angular face"],["diamond","diamond-shaped face"],["long|narrow|refined","long oval face"],["round","round face"]]),m2fDef:"oval face with balanced features"},
  expression:{f2m:R_([["puffed-cheek","cool aloof expression"],["tiny cat-mouth","subtle smile"],["bubbly","bright cheerful expression"]]),f2mDef:null,
    m2f:R_([["smirk|cocky|roguish","smirk"],["grin","playful smile"],["stoic|gruff|cold|brooding|intense|furrowed|steady","stern, serious expression"],["smile","gentle smile"]]),m2fDef:"relaxed neutral expression"},
  browShape:{f2mDef:"full natural brows",m2fDef:"softly arched brows"},
  noseShape:{f2mDef:"straight nose with a moderate bridge",m2fDef:"small straight nose"},
  mouthShape:{f2mDef:"full natural lips",m2fDef:"soft lips"},
  eyeShape:{f2m:R_([["seductive","heavy-lidded sultry eyes"],["sparkling|glossy","large, warm eyes"]]),f2mDef:"almond-shaped eyes",m2fDef:"almond-shaped eyes"},
  lashNatural:{f2mDef:"thick, understated eyelashes",m2fDef:"long eyelashes"},
  impression:{f2m:R_([["sultry|alluring|seduc|bedroom|temptress|bombshell|femme","a smoldering, magnetic allure"],["lewd|lustful","a seductive, confident allure"],["sweet|cute|adorable|innocent|doll|plush|huggable|sparkling","a friendly, easygoing look"],["elegant|glamorous|striking|feminine|beauty|pretty|delicate|porcelain","a refined, aristocratic presence"]]),f2mDef:"a handsome, easygoing charm",
    m2f:R_([["smolder|seductive|dangerous","an alluring, sultry presence"],["aristocratic|gentleman|polished|dashing","an elegant, mature presence"],["masculine|chiseled|model","a striking, feminine appearance"],["stoic|battle|noble|commanding","a noble, stoic presence"]]),m2fDef:"an approachable appearance"},
  hairStyle:{f2m:R_([["pixie|bixie","textured crop"],["\\bbob\\b|lob\\b|pageboy","layered medium-length hair"],["twin|pigtail|bunny|bow|ribbon|wrapped ponytail","ponytail"],["space buns|double|odango|twin buns|bubble","top knot"],["ballerina|chignon|bridal|beehive|victory|ornamental","man bun"],["braid|milkmaid|halo","single braid"],["princess|hime|jellyfish|butterfly|U-shaped|V-shaped|finger waves","long layered hair"]]),f2mDef:"loose layered hair",
    m2f:R_([["man bun|topknot|top knot","top knot"],["pompadour|quiff|slicked|side part|swept|windswept|comb-over","swept-back hair"],["curtains","long curtain layers"],["mullet|shaggy|bedhead|tousled|medium","short shag"],["two-strand","twist-out curls"],["tied|braided|ponytail|long","low ponytail"],["crop|crew|ivy|flat top|high and tight|fade|faux hawk|mohawk|spik|short|coils|waves|undercut","pixie cut"]]),m2fDef:"loose layered hair"},
  bangs:{f2mDef:"side-swept fringe",m2f:R_([["long fringe","long side bangs"]]),m2fDef:"side-swept bangs"},
  hairTexture:{f2mDef:"softly tousled",m2f:R_([["neat|sleek","silky and smooth"]]),m2fDef:"softly tousled"},
  heightStature:{f2m:R_([["very short|short|petite","below-average height"],["tall|graceful|elegant|statuesque","tall stature"]]),f2mDef:"average height",m2f:R_([["tower|imposing|lanky|tall","tall stature"],["stocky","short, sturdy stature"]]),m2fDef:"average height"},
  shoulderShape:{f2mDef:"balanced shoulders",m2f:R_([["broad|heavy|wide|powerful","slightly broad balanced shoulders"]]),m2fDef:"balanced shoulders"},
  torsoShape:{f2mDef:"compact torso",m2f:R_([["V-shaped|barrel|heavyset","athletic torso with a defined back"],["lean|narrow|wiry|athletic","long, lean torso"]]),m2fDef:null},
  armShape:{f2m:R_([["soft|full|rounded","thick, soft arms"],["feminine|delicate|slender|graceful|slim","lean arms with defined forearms"]]),f2mDef:"strong forearms and capable hands",
    m2f:R_([["thick, soft","full, soft arms"],["powerful|heavily|defined|broad","strong, muscular arms"],["lean|wiry","toned arms with defined shoulders"]]),m2fDef:"softly toned arms"},
  handShape:{f2m:R_([["slender|graceful|elegant","long-fingered and elegant"]]),f2mDef:"strong and capable",m2f:R_([["long-fingered|lean","long, slender fingers"],["large|broad|big|calloused|scarred","strong and capable"]]),m2fDef:"slender and graceful"},
  bustSize:{f2m:R_([["flat chest|petite chest","narrow chest"],["small breasts","lean chest"],["small-to-medium|^medium breasts","average chest"],["medium-large|full breasts","broad chest"],["^large breasts","broad, muscular chest"],["very large","deep, powerful chest"],["huge|enormous|massive","huge, heavily muscled chest"]]),f2mDef:"average chest",
    m2f:R_([["narrow|lean","small breasts"],["average","medium breasts"],["^broad chest","full breasts"],["muscular|deep|thick|soft","large breasts"],["huge","very large breasts"]]),m2fDef:"medium breasts"},
  bustShape:{f2m:R_([["firm, athletic","defined pecs"],["plush|full|heavy|rounded|exaggerat|teardrop|bell|pendulous|perky|sloping|lifted|upper-heavy|gravity|prominent|oval|set","full, rounded pecs"]]),f2mDef:"natural chest shape",
    m2f:R_([["flat","gently flat shape"],["defined|squared|chiseled","firm, athletic shape"],["full|rounded|soft","soft rounded shape"]]),m2fDef:"natural breast shape"},
  bustWeight:{f2m:R_([["minimal|light","light definition"],["firm","firm definition"],["heavy|lush|exaggerat|extreme","heavy, solid mass"]]),f2mDef:"soft definition",
    m2f:R_([["light","light delicate fullness"],["firm|pronounced","firm natural fullness"],["dense|heavy","heavy natural fullness"],["soft","soft natural fullness"]]),m2fDef:"moderate fullness"},
  waistShape:{f2m:R_([["cinch|hourglass|extremely|pronounced|tiny|substantially","narrow waist with a V-taper"],["soft|rounded|full midsection|curving","soft, thick waist"],["narrow|petite|slender|thin|tapered|defined|high|short|small|long","narrow, tapered waist"]]),f2mDef:"trim waist",
    m2f:R_([["V-taper|narrow|trim|lean|slim","narrow waist"],["thick|broad|solid|soft","soft, rounded waist"]]),m2fDef:"defined waist"},
  stomachShape:{f2mDef:"flat stomach",m2f:R_([["six-pack|eight-pack|sculpt","defined abs"],["abs","toned stomach with light definition"],["thick|broad|soft","softly rounded lower belly"]]),m2fDef:"flat stomach"},
  hipShape:{f2m:R_([["exaggerat|dramatic|extremely|very wide|lewd","broad hips"],["narrow|petite|slender","lean, narrow hips"],["wide|curvy|full|round|pear|flared|thick|soft|high|beautifully|smooth|gently|widen|average|hourglass|pronounced","solid hips"]]),f2mDef:"slim, straight hips",
    m2f:R_([["lean|slim|narrow","narrow hips"],["solid","balanced hips"],["broad|thick","wide hips"]]),m2fDef:"balanced hips"},
  buttSize:{f2m:R_([["very large|extremely|enormous|big|substantial|prominent|projecting","broad, powerful butt"],["large|plump|full|round|soft|lifted","round, muscular butt"]]),f2mDef:"muscular butt",
    m2f:R_([["lean|flat","small butt"],["round, muscular","round butt"],["muscular","toned butt"],["broad","large butt"],["soft, round","plump butt"]]),m2fDef:"medium butt"},
  thighBuild:{f2m:R_([["extremely|exceptionally|plush|voluptuous|juicy|sexy|wide|very thick|thick|full","thick, solid thighs"]]),f2mDef:"lean, sinewy thighs",
    m2f:R_([["powerful|heavily","strong, muscular thighs"],["lean|sinewy","lean, toned thighs"],["thick|solid","thick thighs"],["long","long, lean thighs"]]),m2fDef:"toned thighs"},
  legShape:{f2m:R_([["soft|full|shapely|thick|plush","thick, sturdy legs"],["long","long, strong legs"]]),f2mDef:"lean, wiry legs",
    m2f:R_([["lean|wiry","slender legs"],["powerful|strong","toned legs"],["thick|sturdy","thick legs"],["long","long legs"]]),m2fDef:"shapely legs"},
  bodySoftness:{f2m:R_([["petite|delicate|doll|slender|graceful|slim","slender, elegant build"],["bombshell|extremely|exaggerat|top-heavy|lewd|juicy|plus-size","broad, heavyset build"],["tall|statuesque|long-legged","tall, broad-shouldered build with a lean waist"],["plush|thick|soft|full","soft, burly build"],["hourglass|voluptuous|curv","broad, muscular build"]]),f2mDef:"slim, toned build with defined muscle",
    m2f:R_([["lean|wiry|lanky|swimmer","slim build"],["bodybuilder|muscular|ripped","strong, athletic build with defined muscle"],["heavyset|burly|bulky|barrel","thick build"],["tall","tall, long-legged, slender figure"],["stocky|compact","sturdy, compact build"]]),m2fDef:"toned build"},
  posture:{f2m:R_([["graceful","squared, confident posture"],["soft poised","calm composed posture"],["hip-popped","wide-legged confident stance"],["dancer","tall, proud posture"],["arched|kneeling","leaning forward posture"],["shy|playful","slouched, relaxed posture"]]),f2mDef:null,
    m2f:R_([["squared|chin-up","gentle confident posture"],["slouch|lazy","relaxed posture"],["pockets|crossed","standing posture"],["wide-legged","relaxed, weight-shifted stance"],["military","elegant posture"],["hunched","slightly shy posture"]]),m2fDef:"relaxed posture"},
  markings:{f2m:R_([["light freckles dusting the shoulders","freckles across the nose and shoulders"]])},
  makeupStyle:{f2mDef:"light foundation and defined brows",m2fDef:"soft natural makeup"},
  lashStyle:{f2mDef:"natural lashes"},
  blushStyle:{f2mDef:"subtle blush"},
  lipFinish:{f2mDef:"matte lips"},
  nailStyle:{f2mDef:"short, clean natural nails"},
  pubicHair:{f2m:R_([["heart-shaped","short, closely trimmed pubic hair"]]),m2fDef:"a neatly trimmed patch of pubic hair"}
};
/* fields whose male-only values are cleared when going back to female */
const MALE_ONLY_FIELDS=["facialHair","facialHairColor","bodyHair","penisColor","penisType","penisSize"];

/* returns a replacement string, null (clear the option) or undefined (keep it) */
function swapChar(field,v,toMale){
  if(typeof v!=="string"||!v||v[0]==="@"||v==="none"||v==="auto")return undefined;
  if(!CHAR[field]||!CHAR[field].length)return undefined;
  if(sexFits(field,v,toMale))return undefined;
  const t=SW[field];
  if(t){
    const rules=toMale?t.f2m:t.m2f;
    if(rules)for(const [rx,val] of rules)if(rx.test(v))return val;
    const def=toMale?t.f2mDef:t.m2fDef;
    if(def!==undefined)return def;
  }
  return null;
}
const SEX_IDENT=["age","subjectType"];
const heldField=f=>!SEX_IDENT.includes(f)&&kept(f);
function convertChars(c,toMale,rep){
  /* hair the swap leaves alone (locked, or already a style a man wears) keeps its movement line too */
  const hairHold=toMale&&(kept("hairStyle")||hairAction(c.hairStyle)==="keep");
  Object.keys(c).forEach(f=>{
    if(f==="sex"||heldField(f))return;
    if(hairHold&&f==="hairMovement")return;
    const r=swapChar(f,c[f],toMale);
    if(r===undefined)return;
    if(r===null){delete c[f];rep.cleared++;(rep.names=rep.names||[]).push(labelOf(f).toLowerCase())}
    else{c[f]=r;rep.changed++}
  });
  /* the one cross-field case: anatomy */
  if(toMale){
    if(!heldField("vaginaColor")){
      if(c.vaginaColor&&!c.penisColor&&CHAR.penisColor.some(x=>x[0]===c.vaginaColor))c.penisColor=c.vaginaColor;
      delete c.vaginaColor;
    }
    if(!heldField("vaginaType"))delete c.vaginaType;
  }else{
    if(!heldField("penisColor")&&c.penisColor&&!c.vaginaColor&&CHAR.vaginaColor.some(x=>x[0]===c.penisColor)&&!heldField("vaginaColor"))c.vaginaColor=c.penisColor;
    MALE_ONLY_FIELDS.forEach(f=>{if(!heldField(f))delete c[f]});
  }
}

/* ---- outfit conversion ---- */
const LK=o=>(o&&o.look)||"";
const byLook=(m,dflt)=>o=>m[LK(o)]!==undefined?m[LK(o)]:dflt;
const SWO={
  top:{f2m:R_([["camisole|cami\\b|\\bslip\\b|negligee|chemise|nightgown","tank top"],["sweater|knit|pullover|cardigan","crew-neck sweater"],["crop|tube|bandeau|halter|strapless|bralette|bustier|babydoll|tutu","fitted cotton t-shirt"],["bodysuit|leotard","athletic compression shirt"],["bikini|swimsuit|one-piece|underboob",null],["corset|harness","leather chest harness"],["blouse|ruffle|frill|lace|\\bbow\\b|ribbon|puff|smocked|peplum|sweetheart|plunge|plunging|wrap|tie-front|knot-front|keyhole|cut|sheer|mesh|off-shoulder|off the shoulder|cold-shoulder|one-shoulder|floral|flower|heart|sailor|maid|nurse|bunny|witch|princess|lolita|kimono-style","button-up shirt"]]),f2mDef:"fitted cotton t-shirt"},
  bottom:{f2m:R_([["leather|latex|vinyl|pvc","leather pants"],["denim","@denim"],["leggings|tights","jogger pants"],["bikini|thong|cheeky|string","swim trunks"],["shorts|hot pants|booty|bloomers|pumpkin|ultra-short|ultra-high","chino shorts"],["tennis|pleated|plaid|sailor|school|kilt","pleated trousers"],["maxi|midi|long|floor|tea-length|knee-length|a-line|wrap|straight|pencil|capri|palazzo|pantaloons|culotte|harem","wide-leg trousers"],["high-waisted|high-rise","slim tailored trousers"],["mini|skort|ruffle|frill|lace|bow|ribbon","chino shorts"]]),f2mDef:"chino trousers"},
  legwear:{f2m:R_([["boots?\\b","lace-up combat boots"],["knee-high sock|knee sock|ankle sock|sock|slouch|warmer","crew socks"],["heel|stiletto|pump|platform|wedge|strappy|mary jane|ballet|lolita|maid","leather oxford shoes"],["thigh-?high|stocking|pantyhose|garter|fishnet|tights|leggings|lace|sheer",null]]),f2mDef:null},
  corset:{f2m:R_([["leather|vinyl|latex|buckled|techwear|harness|lace-up","lace-up leather vest"]]),f2mDef:byLook({glam:"fitted waistcoat layer",preppy:"fitted waistcoat layer",costume:"fitted waistcoat layer",gothic:"lace-up leather vest",edgy:"lace-up leather vest",cyber:"lace-up leather vest",boudoir:"lace-up leather vest"},null),m2f:R_([["leather|harness|bandolier|armor|plate","lace-up leather corset"]]),m2fDef:"underbust corset"},
  outerwear:{f2m:R_([["shrug|bolero","denim jacket"],["kimono","haori jacket"],["robe|negligee|peignoir|sheer|transparent|chiffon","silk robe"],["cover-up|sarong|kaftan|beach|crochet","linen shirt worn open"],["cape|capelet|shawl|stole|poncho|wrap",byLook({glam:"tuxedo jacket",preppy:"tailored blazer",resort:"linen shirt worn open",casual:"denim jacket",sporty:"zip-up track jacket"},"hooded travel cloak")]]),f2mDef:byLook({resort:"linen shirt worn open",sporty:"zip-up track jacket",glam:"tailored blazer",preppy:"tailored blazer",edgy:"leather jacket",gothic:"leather jacket",cyber:"holographic jacket",costume:"hooded travel cloak",boudoir:"silk robe",casual:"denim jacket",cottage:"lightweight cardigan",sweet:"lightweight cardigan"},"tailored blazer")},
  belt:{f2mDef:"leather belt with a metal buckle"},
  waistAccessory:{f2mDef:null},
  neckAccessory:{f2m:R_([["choker",null],["ribbon|bow|jabot|frill|ruffle|lace",byLook({glam:"bow tie",preppy:"slim necktie"},null)]]),f2mDef:null},
  wristAccessory:{f2mDef:null},
  headwear:{f2m:R_([["tiara|halo|crown",null],["bonnet|cowgirl","cowboy hat"],["witch","wizard's pointed hat"]]),f2mDef:null},
  eyewear:{f2m:R_([["sun|shade","aviator sunglasses"]]),f2mDef:"thick-framed glasses"},
  gloves:{f2m:R_([["satin|opera|evening|long|elbow","formal gloves"],["bunny|paw|mitten",null]]),f2mDef:"leather driving gloves"},
  tagCharm:{f2mDef:null},
  hipAccessory:{f2m:R_([["plush|charm|bell|tassel|pom|butterfly",null]]),f2mDef:"leather messenger bag"},
  pocketItem:{f2mDef:null},loopItem:{f2mDef:null},
  earAccessory:{f2mDef:null},ringAccessory:{f2mDef:null},
  thighAccessory:{f2mDef:null},kneeAccessory:{f2mDef:null},maskAccessory:{f2mDef:null},shoulderPiece:{f2mDef:null},tailPiece:{f2mDef:null},wingPiece:{f2mDef:null},heldItem:{f2mDef:null},
  bra:{f2m:R_([["sports|athletic|compression","compression undershirt"],["mesh|sheer|lace|strappy|harness|cage|latex|vinyl|micro|bandeau|bikini|triangle",byLook({boudoir:"sheer mesh undershirt",edgy:"cropped mesh tank",cyber:"cropped mesh tank"},"ribbed undershirt")]]),f2mDef:"ribbed undershirt",
    m2f:R_([["mesh","mesh bralette"],["compression|sports?","sports bralette"]]),m2fDef:"plain cotton bralette"},
  panties:{f2m:R_([["thong|string|g-string|cheeky","thong briefs"],["sheer|mesh|latex|vinyl|strappy|garter|cage|metallic","mesh briefs"],["lace|satin|silk","silk boxers"],["athletic|sport","compression shorts"],["boyshort","cotton boxers"]]),f2mDef:"plain cotton boxer briefs",
    m2f:R_([["thong|g-string|sheer pouch","string thong"],["silk|satin","satin panties"],["mesh","mesh briefs"],["compression|boxer|trunks","boyshort panties"],["jockstrap|fundoshi|bikini|low-rise","high-cut panties"]]),m2fDef:"cotton briefs"},
  detailOne:{f2mDef:null},detailTwo:{f2mDef:null},detailThree:{f2mDef:null}
};
function swapItem(field,v,toMale,o){
  const t=SWO[field];if(!t)return undefined;
  const res=x=>typeof x==="function"?x(o):x;
  const rules=toMale?t.f2m:t.m2f;
  if(rules)for(const [rx,val] of rules)if(rx.test(v)){
    if(val==="@denim")return/mini|micro|short|skort/i.test(v)?"denim shorts":"slim-fit jeans";
    return res(val);
  }
  const def=toMale?t.f2mDef:t.m2fDef;
  return def===undefined?undefined:res(def);
}
/* a dress becomes a top plus a bottom */
function swapDress(v,hasBottom){
  const s=v.toLowerCase();
  let top="button-up shirt",bot="chino trousers";
  if(/gown|evening|ball|formal|cocktail|satin|velvet|silk|sequin/.test(s)){top="tuxedo shirt with a pleated front";bot="tailored suit trousers"}
  else if(/summer|sun|beach|floral|linen|cotton|picnic/.test(s)){top="linen button-up shirt";bot="chino shorts"}
  else if(/sweater|knit|hoodie|winter|wool/.test(s)){top="crew-neck sweater";bot="chino trousers"}
  else if(/leather|latex|vinyl|gothic|punk|corset|lace/.test(s)){top="fitted mesh long-sleeve shirt";bot="leather pants"}
  return{top,bot:hasBottom?null:bot};
}
/* jewelry: when a design is switched to male, the female design's jewelry comes off (nothing is swapped in).
   Watches, trackers, wristbands, scarves, ties and collars are not jewelry and stay. */
const JEWEL_O={
  earAccessory:{rx:/./,not:/pencil|pen tucked|earbud|headphone/i},
  ringAccessory:{rx:/./},
  neckAccessory:{rx:/necklace|choker|pendant|locket|medallion|amulet|pearl strand|\bchain\b|cameo|gemstone|diamond|\bbeads?\b|beaded|charm/i,not:/collar|scarf|\btie\b|glasses chain|stethoscope|whistle|headphones|lanyard|bandana|neckerchief|bolo/i},
  wristAccessory:{rx:/bracelet|bangle|charm|anklet|armlet/i,not:/watch|tracker|wristband|sweatband|bracer|guard|handcuff/i},
  waistAccessory:{rx:/waist chain|chain belt|belly chain|body chain|charm/i},
  hipAccessory:{rx:/hip chain|hip charm|chains with charms|charm at the hip|chain hip/i},
  thighAccessory:{rx:/chain/i},
  legwear:{rx:/anklet|thigh chain|toe-ring/i},
  eyewear:{rx:/glasses chain/i},
  top:{rx:/body chains/i}
};
const isJewel=(f,v)=>{const t=JEWEL_O[f];return !!t&&t.rx.test(v)&&!(t.not&&t.not.test(v))};
function convertOutfit(o,toMale,rep){
  const L=o.lock||{};
  if(L["*"])return;
  const items=o.items||{},out={},add={};
  Object.keys(items).forEach(f=>{
    const it=items[f];
    if(!it||typeof it.v!=="string"){return}
    if(L[f]){out[f]=it;return}
    if(toMale&&rep.jewelry&&isJewel(f,it.v)){rep.removed++;return}
    if(itemSexFits(f,it.v,toMale)){out[f]=it;return}
    if(toMale&&f==="top"&&kindOf("top",it.v)==="dress"){
      const d=swapDress(it.v,!!items.bottom);
      out.top={...it,v:d.top};delete out.top.w;if(!/\{c2\}/.test(d.top))delete out.top.c2;
      if(d.bot)add.bottom={v:d.bot,c:"auto"};
      rep.items++;return;
    }
    const r=swapItem(f,it.v,toMale,o);
    if(r===undefined){out[f]=it;return}
    if(r===null){rep.removed++;if(toMale&&f==="top"&&/bikini|swimsuit|one-piece/i.test(it.v)&&!items.bottom)add.bottom={v:"swim trunks",c:"auto"};return}
    if(out[f]&&out[f].v===r){rep.removed++;return}
    const n={...it,v:r};delete n.w;if(!/\{c2\}/.test(r))delete n.c2;
    out[f]=n;rep.items++;
  });
  Object.keys(add).forEach(f=>{if(!out[f]){out[f]=add[f];rep.items++}});
  if(toMale)Object.keys(out).forEach(f=>{
    if(L[f]||!MASC_O[f])return;
    const it=out[f];if(!it||typeof it.v!=="string")return;
    for(const [rx,val] of MASC_O[f])if(rx.test(it.v)){
      if(it.v!==val&&(OUTFIT[f]||[]).some(i=>i.v===val)){const n={...it,v:val};delete n.w;if(!/\{c2\}/.test(val))delete n.c2;out[f]=n;rep.items++}
      break;
    }
  });
  o.items=out;
  ["detailOne","detailTwo","detailThree"].forEach(f=>{
    const v=(o.details||{})[f];
    if(v&&!L["d:"+f]&&!itemSexFits(f,v,toMale)){delete o.details[f];if(o.dcol)delete o.dcol[f];rep.removed++}
  });
}

/* ---- hair: converting a design to male gives it a short male cut, unless the hair is locked ---- */
const SHORT_LEN=new Set(["buzzed","very short","short"]);
const BANG_KEEP=/^(no bangs|open forehead|forehead-baring pushed-back hair)$/i;
function hairAction(v){
  if(!v)return"none";
  if((SEXTAG.hairStyle||{})[v]==="m")return"keep";              /* already a male style: leave the whole hair block alone */
  const g=(CHAR.hairStyle.find(x=>x[0]===v)||[0,""])[1];
  const fem=!!((FEM_RX.hairStyle&&FEM_RX.hairStyle.test(v))||FEM_RX_ALL.test(v));
  if(g==="Fantasy Hair"&&!fem)return"keep";                      /* effect hair has no short equivalent */
  if(/^box braids$/i.test(v))return"convert";
  if(/^(cornrows)$/i.test(v)||(g==="Natural / Textured"&&!fem))return"natural";   /* natural styles stay, length and fringe still follow */
  if(/\blong\b|very long|waist|hip-length|knee/i.test(v))return"convert";
  if(g==="Short Styles"&&!fem)return"short";
  if(!g&&!fem&&/\b(short|cropped|buzz(ed)?|crew|fade|undercut|crop)\b/i.test(v))return"short";
  return"convert";
}
function maleStyleFor(v){
  const s=String(v).toLowerCase();
  if(/^box braids$/.test(s))return"cornrows";
  if(/pixie|bixie/.test(s))return"textured crop";
  if(/\bbob\b|\blob\b|pageboy/.test(s))return"short wolf cut";
  if(/swept-back|slicked|pulled back|tied back/.test(s))return"slicked-back hair";
  if(/\bcurl(y|s)\b|coil|spiral|kinky/.test(s))return"short curly hair";
  if(/wav/.test(s))return"waves haircut";
  if(/ponytail|bun|updo|knot|chignon|twist|beehive|ballerina|halo|crown/.test(s))return"side-swept undercut";
  if(/braid|twin|pigtail|bunny|bow|ribbon|princess|hime|jellyfish|butterfly/.test(s))return"textured crop";
  if(/layer|shag|wolf|feather|curtain/.test(s))return"short wolf cut";
  if(/straight|sleek|blunt|glossy|silk|parted/.test(s))return"classic side part";
  return"textured crop";
}
function maleBangsFor(v){
  const s=String(v).toLowerCase();
  if(/ahoge/.test(s))return"messy fringe";
  if(/curtain/.test(s))return"curtain fringe";
  if(/open forehead|center-parted|neat center part/.test(s))return"swept-back front";
  if(/side|diagonal|asymmetr/.test(s))return"side-swept fringe";
  return"textured fringe";
}
function maleHair(c,rep){
  if(kept("hairStyle"))return;                       /* locked style (or locked hair step): leave the hair as it is */
  const act=hairAction(c.hairStyle);
  if(act==="keep")return;
  if(act==="convert"){c.hairStyle=maleStyleFor(c.hairStyle);rep.changed++}
  if(c.hairLength&&!kept("hairLength")&&!SHORT_LEN.has(c.hairLength)){c.hairLength="short";rep.changed++}
  if(c.hairMovement&&!kept("hairMovement")&&!/wind|breeze/i.test(c.hairMovement)){delete c.hairMovement;rep.cleared++;(rep.names=rep.names||[]).push("hair movement")}
  if(c.bangs&&!kept("bangs")&&!BANG_KEEP.test(c.bangs)&&(SEXTAG.bangs||{})[c.bangs]!=="m"){c.bangs=maleBangsFor(c.bangs);rep.changed++}
}

/* ---- masculinizing step: when a design is converted to male, shared soft options step toward firm, confident male equivalents.
   Palette, colors, skin tone, hair color and species features are left alone. Locked options are never touched. ---- */
const hasOpt=(f,v)=>(CHAR[f]||[]).some(x=>x[0]===v);
const isMOpt=(f,v)=>(SEXTAG[f]||{})[v]==="m";
const firstRule=(rules,v)=>{for(const [rx,t] of rules)if(rx.test(v))return t;return undefined};
const MASC={
  faceShape:{keep:/angular|square|strong|(defined|sharp|heavy|firm|chiseled|wide|prominent|pronounced)[^.]*jaw|jawline|jawed|broad|diamond-shaped face$|elven|fae|ethereal|muzzle|snout|beak|draconic|scale|demon|angelic|celestial/i,
    rules:[[/round|full-cheeked|doll|chubby|baby|petite|youthful|puffy|cheeks/i,"broad face with high, wide cheekbones and a strong jaw"],[/heart|tapered|v-line|pointed chin|diamond/i,"diamond-shaped face"],[/./,"oval face with a strong, defined jaw and prominent brow"]]},
  expression:{keep:/snarl|predatory|disdain|otherworldly|fanged|hollow|divine|fox-like|battle|cat-like|perked-up|fierce|wild|haunting|ahegao|focused|determined|stern|confident|cool|aloof|scowl|furrow|intense|stoic|brooding|gruff|cocky|roguish|assured/i,
    rules:[[/pout|puffed|tongue-out|cute|adorable|innocent|tear|shy|blush|sleepy|dreamy|soft, tired|surprised|wide-eyed/i,"calm, assured gaze"],
      [/seductive|sultry|come-hither|lustful|breathless|aroused|bedroom|smoldering|biting/i,"heavy-lidded, lazy smile"],
      [/mischiev|sly|teas|playful|smirk/i,"confident smirk"],
      [/laugh|cheer|bright|delight|sparkl|happy|excited|radian|sun-drenched|warm|genuine|bubbly|open-mouthed/i,"warm, crinkle-eyed grin"],
      [/gentle smile|subtle smile|soft smile|half-smile|relaxed smile/i,"gentle, reserved smile"],
      [/soft|gentle|serene|calm|relaxed|elegant|thoughtful|curious/i,"calm, assured gaze"]]},
  browShape:{kill:/soft|gentle|delicate|arched/i,keep:/thick|heavy|strong|bold|furrowed|scar|low-set|untamed|devilish|metallic|brooding|angular|full|neat/i,
    rules:[[/thin|pale|fine|light|delicate|nearly invisible/i,"full natural brows"],[/soft|gentle|arched|sweeping|tapered|raised|defined|straight/i,"strong, straight brows"]]},
  noseShape:{keep:/broad|aquiline|strong|prominent|crooked|sturdy|roman|beak|broken|large|cat-like|fox-like|wolf|dog-like|bear|flat, nearly|sharp|high|defined|moderate bridge/i,
    rules:[[/./,"strong, straight nose"]]},
  mouthShape:{keep:/cat-like|cheshire|scale|metallic|frost|outline|tongue|bitten|dark|firm|thin|scar|chapped|narrow|strong/i,
    rules:[[/wide/i,"wide mouth with a relaxed lip line"],[/./,"firm, defined lips"]]},
  eyeShape:{fn:v=>{
      if(/angelic|celestial|cosmic|demonic|dragon|fae|gem|luminous|moonlit|prismatic|reptilian|star|wolfish|fox|owl|monolid|sharp|narrow|steady|stern|hooded|heavy|deep-set|close-set|downturned|tapered|small/i.test(v)&&!/^large/i.test(v))return undefined;
      if(/^large,? /i.test(v)){const t=v.replace(/^large,? /i,"");if(hasOpt("eyeShape",t)&&!/round|doe|wide/i.test(t))return t}
      if(/round|doe|wide|large|big|innocent|sparkl/i.test(v))return"steady, almond-shaped eyes"}},
  lashNatural:{rules:[[/long|curl|flutter|feather|wisp|dramatic|voluminous/i,"thick, understated eyelashes"]]},
  impression:{kill:/beautiful|pretty|gorgeous|lovely|glow|cute|sweet|adorable|doll|delicate|feminine/i,keep:/heritage|otherworldly|feral|divine|haunting|ancient|woodland|animal|trickster|predatory|noble|stoic|warrior|haughty|imperious|regal|commanding|mysterious|dangerous|rugged|masculine|handsome|dashing|gentleman|brooding|authoritative|chiseled|charm/i,
    rules:[[/bombshell|sultry|seductive|alluring|sensual|lustful|femme|allure/i,"a smoldering, magnetic allure"],[/beautiful|pretty|gorgeous|lovely|glow|cute|sweet|adorable|doll|delicate|feminine/i,"a handsome, easygoing charm"],[/fierce|power/i,"a commanding, authoritative presence"],[/cool|aloof|enchant/i,"a cool, aloof handsomeness"],
      [/beaut|elegan|refined|aristocratic|graceful|poised|sophisticated|polished|mature/i,"a sharp, polished gentleman's presence"],
      [/playful|mischiev|bubbly|cheerful|radiant|dazzling|warm|welcoming|smile/i,"a charismatic, playful charm"],
      [/sweet|cute|adorable|innocent|shy|gentle|soft|kind|friendly|approachable|delicate|dainty|pretty|feminine|natural|understated|plain/i,"a handsome, easygoing charm"]]},
  skinFinish:{keep:/scale|fur|feather|chitin|bark|stone|metal|pearlescent|iridescent|down along|plated|crystal|ember|glowing|spectral|ghost|weathered|windburned|sweat|oiled|pores|tanned/i,
    rules:[[/dewy|luminous|glow|velvety|satin|downy|supple|fresh|reflective|highlights|sheen|silk|soft|porcelain/i,"natural skin texture with a soft matte finish"]]},
  hairTexture:{rules:[[/silk|gloss|satin|glass|shiny|wet and glossy/i,"neat and combed"]]},
  posture:{keep:/squared|strong|military|confident stance|chin-up|arms-crossed|hands-in-pockets|wide-legged|slouch|hunched|lean|reclin|standing|glance|hands-behind|tall, proud/i,
    rules:[[/elegant|gentle|soft|poised|graceful|calm composed|relaxed|hip-popped|sultry|dancer|demure|ballet|delicate|weight-shifted/i,"squared, confident posture"]]},
  heightStature:{fn:v=>{
      if(isMOpt("heightStature",v))return undefined;
      if(/very short|short|petite|below-average|compact/i.test(v))return"average height";
      if(/^average height$/i.test(v))return"slightly above-average height";
      if(/^slightly above/i.test(v))return"above-average height";
      if(/^above-average/i.test(v))return"tall stature";
      if(/very tall|statuesque|tall/i.test(v)&&!/broad|imposing|lanky|towering|lean/i.test(v))return"tall, broad-shouldered stature"}},
  nailStyle:{keep:/claw|^natural fingernails|^short (rounded|square) fingernails|^short, (clean|blunt)|^blunt, calloused/i,rules:[[/./,"short, clean natural nails"]]},
  nippleType:{rules:[[/perky|puffy|soft and rounded|prominent/i,"flat"]]},
  areolaType:{rules:[[/puffy|softly blended/i,"flat"]]},
  nippleLength:{rules:[[/long/i,"short"]]},
  areolaSize:{rules:[[/wide|large/i,"medium-sized"]]}
};
/* three male builds; the female design's own proportions decide which one a conversion uses */
const MASC_TIERS={
  lean:{shoulderShape:"broad shoulders tapering to a lean waist",torsoShape:"athletic torso with a defined back",armShape:"lean arms with defined forearms",bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",waistShape:"lean, defined waist",stomachShape:"flat stomach with faint abs",hipShape:"slim, straight hips",buttSize:"toned butt",thighBuild:"lean, sinewy thighs",legShape:"long, strong legs",bodySoftness:"lean, athletic swimmer's build"},
  athletic:{shoulderShape:"broad shoulders tapering to a lean waist",torsoShape:"athletic, well-defined torso",armShape:"defined biceps and forearms",bustSize:"broad chest",bustShape:"defined pecs",bustWeight:"firm definition",waistShape:"narrow waist with a V-taper",stomachShape:"defined abs and obliques",hipShape:"narrow hips with a V-taper",buttSize:"toned butt",thighBuild:"strong, muscular thighs",legShape:"powerful legs with defined calves",bodySoftness:"slim, toned build with defined muscle"},
  sturdy:{shoulderShape:"broad, strong shoulders",torsoShape:"broad ribcage with a strong back",armShape:"strong, muscular arms",bustSize:"broad, muscular chest",bustShape:"squared, sculpted pecs",bustWeight:"firm definition",waistShape:"straight, athletic waist",stomachShape:"firm, toned stomach",hipShape:"solid hips",buttSize:"muscular butt",thighBuild:"strong, muscular thighs",legShape:"strong, muscular legs",bodySoftness:"strong, athletic build with defined muscle"},
  powerful:{shoulderShape:"very broad, powerful shoulders",torsoShape:"broad V-shaped torso tapering to the waist",armShape:"thick, powerful arms",bustSize:"broad, muscular chest",bustShape:"squared, sculpted pecs",bustWeight:"dense, thick muscle",waistShape:"trim waist",stomachShape:"defined abs and obliques",hipShape:"solid hips",buttSize:"broad, powerful butt",thighBuild:"powerful, muscular thighs",legShape:"powerful legs with defined calves",bodySoftness:"broad, muscular build"}
};
function bodyTier(pre){
  const vals=["bodySoftness","thighBuild","hipShape","buttSize","bustSize","legShape","waistShape","stomachShape"].map(f=>String((pre&&pre[f])||"")).filter(Boolean).join(" | ");
  const n=rx=>(vals.match(rx)||[]).length;
  const s=n(/\b(thick|curvy|full|voluptuous|plush|plump|wide|large|huge|enormous|hourglass|exaggerated|bombshell|heavy|massive)\b/gi)-n(/\b(slender|slim|petite|willowy|delicate|thin|lithe|dancer|narrow|small|flat|lean)\b/gi);
  return s>=8?"powerful":s>=4?"sturdy":s<=-4?"lean":"athletic";
}
const MAKEUP_FIELDS_M=["makeupStyle","eyelinerStyle","eyeshadowStyle","lashStyle","blushStyle","lipFinish","faceAccents","makeupColor"];
function mascPass(c,pre,rep,opts){
  opts=opts||{};
  const ok=f=>!opts.only||opts.only.has(f);
  const set=(f,v)=>{
    if(heldField(f)||!ok(f)||v===undefined||c[f]===v)return;
    if(v===null){delete c[f];rep.cleared++}else{c[f]=v;rep.changed++}
  };
  Object.keys(MASC).forEach(f=>{
    const v=c[f];if(typeof v!=="string"||!v||heldField(f)||!ok(f)||isMOpt(f,v))return;
    const t=MASC[f];if(t.keep&&t.keep.test(v)&&!(t.kill&&t.kill.test(v)))return;
    const r=t.fn?t.fn(v):firstRule(t.rules||[],v);
    if(r&&hasOpt(f,r))set(f,r);
  });
  /* lip color goes when the lips are re-shaped */
  if(c.mouthShapeColor&&!heldField("mouthShapeColor")&&/pink|red|rose|coral|peach|berry|plum|nude|cherry|magenta|mauve/i.test(c.mouthShapeColor))set("mouthShapeColor",null);
  /* proportions */
  if(opts.tiers!==false){const tier=MASC_TIERS[bodyTier(pre)];
    Object.keys(tier).forEach(f=>{if(c[f]!=null&&c[f]!==""&&!heldField(f)&&hasOpt(f,tier[f]))set(f,tier[f])})}
  /* makeup */
  /* makeup comes off completely and nails go clean; marks that are not cosmetics (war paint, scars, sunscreen) stay */
  if(opts.makeup!==false){
    MAKEUP_FIELDS_M.forEach(f=>{
      if(c[f]==null||heldField(f))return;
      if(f==="faceAccents"&&/tribal|war paint|scar|zinc|sunscreen/i.test(c[f]))return;
      set(f,null);
    });
    MAKEUP_FIELDS_M.forEach(f=>{if(f!=="makeupColor"&&c[f]==null&&c[f+"Color"]!=null&&!heldField(f+"Color"))set(f+"Color",null)});
    if(c.nailColor!=null&&!heldField("nailColor")&&!/claw/i.test(c.nailStyle||""))set("nailColor",null);
  }
}
const MASC_O={};


/* free text the design carries (Must include, Notes) gets the same treatment */
const MALE_WORDS=[[/exaggerated curves/gi,"a strong physique"],[/\bcurvy\b/gi,"muscular"],[/\bcurves\b/gi,"physique"],[/\bcute\b/gi,"handsome"],[/\badorable\b/gi,"rugged"],[/\bsweet\b/gi,"confident"],[/\bbeautiful\b/gi,"charismatic"],[/\bpretty\b/gi,"handsome"],[/\bgorgeous\b/gi,"striking"],[/\bdainty\b/gi,"minimal"],[/\bdelicate\b/gi,"refined"],[/\bfeminine\b/gi,"masculine"],[/\bbombshell\b/gi,"magnetic"],[/\bbreasts?\b|\bbust\b|\bcleavage\b/gi,"chest"]];
/* jewelry and makeup themes in the free text come out with the pieces themselves */
function stripTrinkets(s){
  const lead="(?:,\\s*)?(?:\\band\\s+)?(?:\\ban?\\s+|\\bthe\\s+)?(?:\\b(?!(?:with|and|or|of|in|on|for|to|the|an?|plus|including|featuring)\\b)[\\w-]+\\s+){0,2}";
  s=s.replace(new RegExp(lead+"jewel(?:le)?ry(?:\\s+(?:theme|accents?|details?|set|pieces?|touches))?","gi"),"")
     .replace(new RegExp(lead+"(?:make-?up|lipstick|eyeliner|eyeshadow|mascara|nail polish)(?:\\s+(?:theme|look|accents?|details?))?","gi"),"");
  return s.replace(/\s{2,}/g," ").replace(/\s+([,.;])/g,"$1").replace(/,\s*,/g,",").replace(/\b(with|of|plus|including|featuring)\s+and\s+/gi,"$1 ").replace(/\b(?:with|and|of|plus|including|featuring)\s*([,.;]|$)/gi,"$1").replace(/^[\s,;]+(?:and\s+)?/i,"").replace(/[\s,;]+(?:and\s*)?$/i,"").trim();
}
function maleText(t){
  if(!t)return t;
  let s=maleize(t);
  MALE_WORDS.forEach(([rx,v])=>{s=s.replace(rx,v)});
  s=stripTrinkets(s);
  return s.replace(/\b(\w+), \1\b/gi,"$1");
}
const OUT_TEXT=["must","notes"];

/* make everything the current sex allows (used after a female-designed preset is applied in male mode) */
function fixSexChars(){
  if(!isMale())return;
  const rep={changed:0,cleared:0,items:0,removed:0};
  convertChars(S.c,true,rep);return rep;
}
function fixSexOutfit(o){
  if(!isMale())return;
  const rep={changed:0,cleared:0,items:0,removed:0};
  convertOutfit(o||cur(),true,rep);return rep;
}

/* ---- the swap itself ---- */
/* the swap remembers what it replaced, so switching back restores every option you did not change in between */
const jq=v=>JSON.stringify(v===undefined?null:v);
function outShape(o){return{items:{...(o.items||{})},details:{...(o.details||{})},dcol:{...(o.dcol||{})}}}
function swapSex(to){
  const toMale=to==="male";
  if(toMale===isMale())return;
  /* v210: only a girl-labeled design (the safeguard's age rule) stays female; male ages are all adult, and a male design is
     still checked by the safeguard like any other */
  if(toMale&&Policy.restricted()){
    const why=Policy.reason()||Policy.banner()||"";
    toast("The age safeguard flags this design"+(why?" ("+why.replace(/[.\s]+$/,"")+")":"")+", so it can’t be switched to male. Adjust it or start from an adult design.");
    return;
  }
  const rep={changed:0,cleared:0,items:0,removed:0,restored:0,jewelry:toMale};
  mut(()=>{
    const memo=S.sexMemo&&S.sexMemo.to===(toMale?"female":"male")?S.sexMemo:null;
    const cPre={...S.c},oPre=S.outfits.map(outShape),tPre={};OUT_TEXT.forEach(k=>{tPre[k]=S.out[k]});
    if(toMale)maleHair(S.c,rep);
    convertChars(S.c,toMale,rep);
    if(toMale){mascPass(S.c,cPre,rep);OUT_TEXT.forEach(k=>{if(S.out[k]&&!/^\s*$/.test(S.out[k])){const n=maleText(S.out[k]);if(n!==S.out[k]){S.out[k]=n;rep.changed++}}})}
    if(toMale)S.c.sex="male";else delete S.c.sex;
    S.outfits.forEach(o=>convertOutfit(o,toMale,rep));
    if(memo){
      /* options that still hold exactly what the earlier swap produced go back to the original */
      Object.keys(memo.c).forEach(k=>{
        const [was,became]=memo.c[k];
        if(jq(cPre[k])!==jq(became))return;
        if(was===null||was===undefined)delete S.c[k];else S.c[k]=was;
        rep.restored++;
      });
      (memo.o||[]).forEach((m,i)=>{
        const o=S.outfits[i],pre=oPre[i];if(!o||!m)return;
        ["items","details","dcol"].forEach(part=>{
          Object.keys(m[part]||{}).forEach(k=>{
            const [was,became]=m[part][k];
            if(jq((pre||{})[part]&&pre[part][k])!==jq(became))return;
            if(was===null||was===undefined)delete o[part][k];else o[part][k]=was;
            if(part==="items")rep.restored++;
          });
        });
      });
      if(memo.out)Object.keys(memo.out).forEach(k=>{const [was,became]=memo.out[k];if(S.out[k]===became&&tPre[k]===became){S.out[k]=was;rep.restored++}});
      delete S.sexMemo;
    }else{
      /* first swap of this design: remember the originals */
      const m={to:toMale?"male":"female",c:{},o:[]};
      new Set([...Object.keys(cPre),...Object.keys(S.c)]).forEach(k=>{
        if(k==="sex")return;
        if(jq(cPre[k])!==jq(S.c[k]))m.c[k]=[cPre[k]===undefined?null:cPre[k],S.c[k]===undefined?null:S.c[k]];
      });
      S.outfits.forEach((o,i)=>{
        const mo={items:{},details:{},dcol:{}},post=outShape(o);
        ["items","details","dcol"].forEach(part=>{
          new Set([...Object.keys(oPre[i][part]),...Object.keys(post[part])]).forEach(k=>{
            if(jq(oPre[i][part][k])!==jq(post[part][k]))mo[part][k]=[oPre[i][part][k]===undefined?null:oPre[i][part][k],post[part][k]===undefined?null:post[part][k]];
          });
        });
        m.o.push(mo);
      });
      m.out={};OUT_TEXT.forEach(k=>{if(tPre[k]!==S.out[k])m.out[k]=[tPre[k]===undefined?"":tPre[k],S.out[k]]});
      S.sexMemo=m;
    }
  },"sexswap");
  const n=rep.changed+rep.items,gone=rep.cleared+rep.removed;
  toast((toMale?"Switched to male. ":"Switched to female. ")+(rep.restored?`${rep.restored} original option${rep.restored===1?"":"s"} restored. `:"")+(n?`${n} option${n===1?"":"s"} converted`:"Nothing needed converting")+(gone?`, ${gone} cleared because they have no ${toMale?"male":"female"} equivalent`:"")+". Undo restores the previous design.");
}

/* ---- Sex control (Concept step) ---- */
function sexRow(){
  const male=isMale();
  const seg=(label,val)=>h("button",{type:"button",class:"chip"+((val==="male")===male?" on":""),"aria-pressed":((val==="male")===male)?"true":"false",onclick:()=>swapSex(val),text:label});
  const lab=h("div",{class:"lab"},h("div",{class:"labtop"},h("label",{text:"Sex"})),h("small",{class:"hint",text:male?"Male options, outfits and wording are active. Switching back converts the design to female.":"Switch to convert this whole design (options and outfits) to a male character."}));
  const ctl=h("div",{class:"ctl"},h("div",{class:"chips",role:"group","aria-label":"Sex"},seg("Female","female"),seg("Male","male")));
  const both=h("label",{class:"inline",style:"display:flex;gap:8px;align-items:center;margin-top:8px;font-size:13px"},
    h("input",{type:"checkbox",checked:SEXPREF.both?true:null,onchange:e=>{SEXPREF.both=!!e.target.checked;saveJSON(KEY_SEXPREF,SEXPREF);changed()}}),
    h("span",{text:"Show options for both sexes"}));
  ctl.append(both);
  return h("div",{class:"row","data-field":"sex"},lab,ctl);
}

/* ---- steps, facial hair and body hair wiring ---- */
Object.defineProperty(STEPS[0],"blurb",{get(){return isMale()?"Who he is and what he is. Everything else builds on this.":"Who she is and what she is. Everything else builds on this."},enumerable:true,configurable:true});
if(!STEP_FIELDS.face.includes("facialHair"))STEP_FIELDS.face.push("facialHair","facialHairColor");
if(!STEP_FIELDS.body.includes("bodyHair"))STEP_FIELDS.body.push("bodyHair");
function facialHairText(){
  const v=g("facialHair");if(!v)return"";
  if(/^clean-shaven$/i.test(v))return"a clean-shaven face";
  const c=g("facialHairColor"),base=/stubble|sideburns|chops|shadow/i.test(v)?(/shadow/i.test(v)?withArticle(v):v):withArticle(v);
  return c?`${base} in ${c}`:base;
}
/* LABELS itself answers per sex, so every row, pop-up, clear button and lock label follows the current mode */
Object.keys(MALE_LABELS).forEach(id=>{
  let base=LABELS[id];
  Object.defineProperty(LABELS,id,{get(){return(isMale()&&MALE_LABELS[id])||base},set(v){base=v},enumerable:true,configurable:true});
});

/* look and coverage names that read differently for men */
{const ML={sweet:"Soft & pastel",boudoir:"Underwear & boudoir"};
 LOOKS.forEach(l=>{const base=l[1];if(ML[l[0]])Object.defineProperty(l,1,{get(){return isMale()?ML[l[0]]:base},enumerable:true,configurable:true})});
 const u=COVER.find(x=>x[0]==="U");if(u){const base=u[1];Object.defineProperty(u,1,{get(){return isMale()?"Relaxed":base},enumerable:true,configurable:true})}}

/* randomizer helpers for male mode */
const MASC_BIAS=new Set(["faceShape","expression","browShape","noseShape","mouthShape","eyeShape","lashNatural","impression","faceMark","heightStature","shoulderShape","torsoShape","armShape","handShape","waistShape","stomachShape","hipShape","buttSize","thighBuild","legShape","bodySoftness","posture","skinFinish","markings","nailStyle"]);
function mascRollFields(steps){
  const only=new Set();
  ["face"].forEach(st=>{if(steps.has(st)&&!stepFrozen(st))STEP_FIELDS[st].forEach(f=>only.add(f))});
  if(only.size)mascPass(S.c,S.c,{changed:0,cleared:0},{only,tiers:false,makeup:false});
  if(only.has("faceShape")){
    ["faceShape","browShape","noseShape","mouthShape","impression"].forEach(f=>{
      if(heldField(f)||!CHAR[f]||Math.random()>.55)return;
      const a=CHAR[f].filter(([x])=>isMOpt(f,x)&&Policy.optionAllowed(f,x)).map(x=>x[0]);
      if(a.length)S.c[f]=a[Math.floor(Math.random()*a.length)];
    });
  }
}
function mascBodyRoll(free,pick1){
  const r=Math.random(),tk=r<.25?"lean":r<.65?"athletic":r<.9?"sturdy":"powerful";
  Object.entries(MASC_TIERS[tk]).forEach(([f,v])=>{
    if(!hasOpt(f,v)||!free(f))return;
    S.c[f]=v;
  });
  /* one small variation per roll, kept in the same build so the body still reads as one man */
  const big=tk==="sturdy"||tk==="powerful",skip=big?/lean|wiry|slim|slender|skinny|narrow|soft|gaunt/i:/burly|bulky|massive|heavy|thick|hulking|barrel/i;
  const wild=["torsoShape","armShape","stomachShape","hipShape","buttSize","handShape"].filter(f=>free(f)&&CHAR[f]);
  if(wild.length&&Math.random()<.5){
    const f=pick1(wild),a=CHAR[f].filter(([x])=>isMOpt(f,x)&&Policy.optionAllowed(f,x)&&!skip.test(x)).map(x=>x[0]);
    if(a.length)S.c[f]=pick1(a);
  }
  if(free("heightStature")){const a=CHAR.heightStature.filter(([x])=>isMOpt("heightStature",x)||/^(average|slightly above|above-average|tall)/.test(x)).map(x=>x[0]);if(a.length)S.c.heightStature=pick1(a)}
}
function mascMakeupRoll(free,pick1,clr){
  STEP_FIELDS.makeup.forEach(clr);
  if(Math.random()<.25){const ms=CHAR.makeupStyle.filter(([v])=>isMOpt("makeupStyle",v)).map(x=>x[0]);if(free("makeupStyle")&&ms.length)S.c.makeupStyle=pick1(ms)}
  if(free("nailStyle")&&Math.random()<.5){const ns=CHAR.nailStyle.filter(([v])=>isMOpt("nailStyle",v)).map(x=>x[0]);const plain=ns.filter(v=>!/paint|polish/i.test(v));if(ns.length)S.c.nailStyle=pick1(plain.length&&Math.random()<.85?plain:ns)}
}

function stateFromTemplate(t){
  const b=blankState();b.name=t.name;Object.assign(b.pal,t.pal);
  const c={...t.c};const body=c._body;delete c._body;
  if(body&&BODY_PRESETS[body])Object.assign(c,BODY_PRESETS[body].v);
  b.c=c;
  const mk=(sp,nm)=>{const o=newOutfit(sp.oname||nm);o.look=sp.look||"";o.showUnder=!!sp.showUnder;
    Object.entries(sp.items).forEach(([f,[v,col,w,c2]])=>{o.items[f]={v,c:col,...(w?{w}:{}),...(c2?{c2}:{})}});Object.assign(o.details,sp.details||{});o.dcol={...(sp.dcol||{})};return o};
  b.outfits=[mk(t.outfit,t.name.split(" ")[0]+" outfit")].concat((t.more||[]).map((m,i)=>mk(m,"Outfit "+(i+2))));
  b.out={...S.out,...(t.out||{})};b.out.palName=(t.out&&t.out.palName)||"";b.out.repeatBody=!!(t.out&&t.out.repeatBody);b.layers={...S.layers};b.order=S.order.slice();if(b.out.style==="narrative")b.order=narrOrder(b.order,true);
  return b;
}
/* ---- v129/v130 (v151: Salmon and Crow boyfriends): "Academy Men". Thirteen hand-made men, one per house, each written as the ideal boyfriend and
   intimate partner for that house's girl. They are adult men (age "man") in male mode (c.sex "male") and
   load like any starting point; the Academy Intimacy scenes use them as the default partner.
   v130: each man also has "House robes" (second outfit), cut differently from the girls' robes.
   This block runs after the male-mode code, so it can add male-only options (addM) and menswear (addMO). */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  /* ---------- new male options ---------- */
  addM("faceShape",["striking, high-cheekboned face with a sculpted jaw","princely, finely chiseled face with a straight jaw","handsome face with a strong brow and a square jaw",
    "warm, open face with a broad jaw and full cheeks"],"Men’s faces");
  addM("eyeShape",["warm, deep-set eyes","sharp, hawk-like eyes","gentle, crinkled eyes","piercing, hooded eyes","bright, laughing eyes"],"Men’s eyes");
  addM("expression",["warm, adoring gaze","gentle, loving smile","hungry, possessive stare","dominant, knowing smirk","feral, hungry grin","smoldering, confident gaze",
    "serene, gentle smile","gritted-teeth grimace of pleasure","lustful, half-lidded stare","protective, tender look"],"Men’s expressions");
  /* partner expressions the Intimacy scenes set; usable for anyone */
  tagB("expression",["hungry, possessive stare","gritted-teeth grimace of pleasure","dominant, knowing smirk","lustful, half-lidded stare","feral, hungry grin","warm, adoring gaze"]);
  addM("impression",["a protective, devoted presence","a laid-back, sun-soaked charm","a warm, steady devotion","a wild, untamed masculinity","a magnetic, glamorous presence","a fierce, warlike presence"],"Natural and everyday");
  addM("hairStyle",["long wolf-cut shag","shoulder-length layered hair","loose shoulder-length waves","tousled surfer hair","long locs tied back","half-up warrior braid",
    "slicked-back side part","short textured quiff","messy curly top","long hair worn loose past the shoulders","buzz cut","French crop","swept-back mane of layered hair"],"Men’s Styles");
  addM("hairTexture",["thick and wavy","glossy and heavy","sun-bleached and salty","soft, loose waves"],"Texture");
  addM("bodySoftness",["lean, muscular dancer's build","towering, burly gentle-giant build","broad, powerful warrior's build","lean, defined surfer's build","tall, rangy, hard-muscled build",
    "broad, solid, cuddly-strong build"],"Overall Build");
  addM("posture",["relaxed, open stance","leaning back against a wall, arms folded","offering a hand with a slight bow","standing close and protective","raking one hand back through his hair",
    "hooking his thumbs into his belt loops"],"Posture");
  addM("markings",["a griffin tattoo across one shoulder blade","a constellation tattoo along one forearm","a serpent tattoo coiling across the chest and shoulder",
    "a dragon tattoo coiling over one shoulder and down the arm","a stag-antler tattoo on one forearm","a shark-tooth tattoo along the ribs","a fox tattoo on one forearm",
    "a peacock-feather tattoo down one side of the ribs","a tribal wave tattoo across one shoulder","faint scars across the knuckles"],"Scars and tattoos");
  addM("skinFinish",["healthy, sun-warmed skin","smooth, even skin","sun-kissed skin with a salty sheen","warm, glowing skin"],"Men’s skin");
  addM("penisType",["thick and veiny","long and veiny","thick, veiny and slightly curved upward","uncircumcised and veiny","circumcised and veiny"]);
  addM("bodyHair",["a dusting of hair across the chest","dark hair across the chest and down the stomach"]);
  /* v141: the Penguin boyfriend's new look */
  addM("faceShape",["striking, chiseled face with a razor-sharp jaw"],"Men’s faces");
  addM("expression",["slow, devastating smirk"],"Men’s expressions");
  addM("hairStyle",["slicked-back undercut with a few loose strands falling forward"],"Men’s Styles");
  addM("markings",["an ice-crystal tattoo winding down one forearm"],"Scars and tattoos");
  addM("posture",["loosening his bow tie with one hand"],"Posture");
  /* v146: the Kraken boyfriend */
  addM("faceShape",["pale, sculpted face with a sharp jaw and high cheekbones"],"Men’s faces");
  addM("markings",["a kraken tattoo whose tentacles wind across his chest and down one arm"],"Scars and tattoos");
  /* v151: the Salmon and Crow boyfriends */
  addM("markings",["a leaping-salmon tattoo down one forearm","a crow-feather tattoo along one forearm"],"Scars and tattoos");
  /* ---------- new menswear ---------- */
  addMO("top",[["fitted black shirt with the sleeves rolled up","CUS","glam,preppy,costume"],["fitted henley with the sleeves pushed up","CUS","casual,edgy"],
    ["silk shirt unbuttoned to the chest","US","glam,boudoir"],["linen shirt unbuttoned to the chest","CUS","resort,casual","s"],["tight black t-shirt","CUS","casual,edgy,sporty"],
    ["thermal waffle-knit henley","CU","casual,cottage","w"],["sleeveless leather vest over a bare chest","US","edgy,costume"],["rash guard","CU","sporty,resort","s"],
    ["chunky roll-neck fisherman's sweater","CU","cottage,casual","w"],["sleeveless muscle shirt with deep armholes","US","sporty,edgy"]]);
  addMO("bottom",[["low-slung gray sweatpants","CUS","casual,sporty,boudoir"],["unbuttoned jeans riding low on the hips","US","casual,boudoir,edgy"],
    ["dress trousers with the belt undone","US","glam,boudoir"],["fitted leather trousers","CUS","edgy,glam"],["loose drawstring linen trousers","CU","resort,cottage","s"],
    ["fitted black dance trousers","CU","sporty,glam"]]);
  addMO("outerwear",[["velvet tuxedo jacket","CU","glam"],["long tailored coat","CU","glam,preppy","w"],["fur-lined leather coat","CU","edgy,costume","w"],["worn leather jacket","CU","edgy,casual"]]);
  addMO("corset",[["waistcoat left unbuttoned","CU","preppy,glam"]]);
  addMO("neckAccessory",[["shark-tooth necklace on a leather cord","CU","resort,edgy"],["gold chain necklace","CU","glam"],["signet pendant on a chain","CU","glam,preppy"],
    ["wolf-fang pendant on a leather cord","CU","edgy,cottage"]]);
  addMO("legwear",[["black dance shoes","CU","glam,sporty"],["leather sandals","C","resort,cottage","s"]]);
  addMO("wristAccessory",[["gold wristwatch","CU","glam,preppy"],["leather wrist cuffs","CU","edgy"]]);
  addMO("panties",[["tight black boxer briefs","CS","boudoir,casual"],["low-slung boxer briefs with a branded waistband","CS","boudoir,sporty"]]);
  addMO("earAccessory",[["gold hoop earring","CU","glam,edgy"]]);
  addMO("headwear",[["slouchy knit beanie","C","casual","w"]]);
  addMO("top",[["tuxedo shirt unbuttoned to the chest","US","glam,boudoir"]]);
  addMO("neckAccessory",[["bow tie hanging untied around the neck","CU","glam,boudoir"]]);

  /* ---------- the men ---------- */
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const BASE={sex:"male",age:"man",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"clear iris detail",lashNatural:"thick, understated eyelashes",
    nailStyle:"short, clean natural nails",hairBase:"@primary",facialHairColor:"@primary",markings:"no markings"};
  const O=(oname,look,items)=>({oname,look,items,details:{},dcol:{}});
  /* house robes for the men: an open-front, high-collared robe (the women's is hooded) over a double-breasted
     waistcoat, a silk cravat with a crest pin, tailored trousers, a crest brooch and house embroidery.
     Colors are the house's own (from the girls' robes), so they match their house rather than each man's palette.
     [robe, lining, waistcoat, piping, cravat, pin, trousers, brooch, motif embroidery, shoes] */
  const ROBE_IT="long {c} open-front robe with a high standing collar, wide sleeves and {c2} lining",VEST="double-breasted {c} waistcoat with {c2} piping",CRAVAT="{c} silk cravat with a {c2} crest pin";
  const RB={
    griffin:["black","red","red","gold","gold","red","charcoal gray","gold","gold feather-and-claw embroidery along the collar and cuffs","leather oxford shoes"],
    badger:["mustard yellow","chocolate brown","chocolate brown","yellow","black","yellow","black","chocolate brown","yellow honeycomb embroidery along the collar and cuffs","leather oxford shoes"],
    raven:["midnight blue","storm blue","navy blue","bronze","storm blue","bronze","black","bronze","bronze star-and-feather embroidery along the collar and cuffs","leather oxford shoes"],
    serpent:["black","emerald green","emerald green","silver","emerald green","silver","charcoal gray","silver","silver serpent-scale embroidery along the collar and cuffs","leather oxford shoes"],
    wolf:["black","ice blue","steel gray","ice blue","navy blue","ice blue","navy blue","ice blue","ice-blue moon-and-pine embroidery along the collar and cuffs","riding boots"],
    swan:["pearl white","dusty rose","pearl white","rose gold","dusty rose","rose gold","soft gray","rose gold","rose-gold swan-feather embroidery along the collar and cuffs","leather oxford shoes"],
    dragon:["black","crimson","crimson","gold","gold","crimson","black","gold","gold dragon-scale embroidery along the collar and cuffs","riding boots"],
    stag:["forest green","cream","cream","gold","forest green","gold","chestnut brown","gold","gold antler-and-oak-leaf embroidery along the collar and cuffs","riding boots"],
    shark:["black","white","steel blue","coral red","coral red","white","charcoal gray","coral red","white wave-and-fin embroidery along the collar and cuffs","leather oxford shoes"],
    penguin:["black","white","ice blue","orange","orange","white","black","orange","white snowflake embroidery along the collar and cuffs","leather oxford shoes"],
    fox:["charcoal gray","cream","burnt orange","amber gold","amber gold","cream","charcoal gray","amber gold","amber-gold flame-tail embroidery along the collar and cuffs","leather oxford shoes"],
    lovebird:["cream","creamsicle orange","soft peach","mint green","creamsicle orange","mint green","cream","mint green","mint-green lovebird-and-feather embroidery along the collar and cuffs","leather oxford shoes"],
    flamingo:["white","hot pink","hot pink","black","black","hot pink","white","black","salmon palm-frond embroidery along the collar and cuffs","leather oxford shoes"],
    kraken:["black","deep violet","deep violet","teal","teal","silver","black","teal","teal tentacle-and-wave embroidery along the collar and cuffs","riding boots"],
    salmon:["porcelain","rose gold","salmon","rose gold","oatmeal","rose gold","black","rose gold","rose-gold leaping-salmon embroidery along the collar and cuffs","leather oxford shoes"],
    crow:["silvery white","dusty lavender","ink blue","platinum","opal","platinum","ink blue","platinum","platinum crow-feather embroidery along the collar and cuffs","leather oxford shoes"]};
  addMO("outerwear",[[ROBE_IT,"CU","costume,preppy"]]);
  addMO("corset",[[VEST,"CU","costume,preppy,glam"]]);
  addMO("neckAccessory",[[CRAVAT,"CU","costume,preppy,glam"]]);
  addMO("detailOne",Object.values(RB).map(r=>[r[8],"CU","costume,preppy"]));
  const robes=h=>{const[rb,ln,vs,pp,cv,pn,tr,br,motif,shoes]=RB[h];
    return{oname:"House robes",look:"costume",items:{top:["crisp collared button-up shirt","white"],corset:[VEST,vs,null,pp],outerwear:[ROBE_IT,rb,null,ln],
      neckAccessory:[CRAVAT,cv,null,pn],bottom:["tailored suit trousers",tr],legwear:[shoes,"black"],tagCharm:[h+" crest brooch",br]},details:{detailOne:motif},dcol:{}}};
  const man=(h,name,blurb,pal,c,outfit,more)=>({id:h+"man",name,blurb,pal,c:Object.assign({},BASE,c),outfit,more:[robes(h)].concat(more),nude:true,
    out:{framing:"full body",must:MUST},tags:["man","boyfriend","partner","male",h]});

  addM("faceShape",[]);addM("hairStyle",["soft, tousled wavy hair"],"Men");addM("bangs",["soft fringe falling over the brow"],"Men");
  addM("hairMovement",["falls softly over the forehead"],"Men");addM("impression",["a warm, devoted presence"],"Men");addM("posture",["rolling up his sleeves"],"Men");
  addM("bodyHair",["a light dusting of hair across the chest"],"Men");
  addMO("waistAccessory",[["canvas work apron","C","casual,cottage"]]);
  addMO("top",[["crisp white chef's coat with {c2} piping","CU","casual,preppy"]]);
  addMO("headwear",[["twisted {c} hachimaki headband","CU","casual,costume"]]);
  addMO("waistAccessory",[["{c} sushi chef's apron tied at the waist","CU","casual"],["pocket watch on a chain","CU","preppy,glam"]]);
  addMO("eyewear",[["watchmaker's loupe flipped up on wire-rimmed glasses","CU","preppy"]]);
  START.add("Academy Men",[
    man("griffin","Griffin boyfriend","Her brave, warm-hearted dance partner: a tall, broad-shouldered lead dancer with a tawny swept-back mane, amber eyes, light stubble and a griffin tattoo across one shoulder blade. Dance-floor black, a leather jacket, sweatpants or nothing at all.",
      {primary:"tawny gold",secondary:"black",third:"crimson",accent:"gold",extra:"chocolate brown"},
      {faceShape:"sculpted, handsome face with high cheekbones and a firm jaw",expression:"easy, lopsided grin",browShape:"strong, straight brows",noseShape:"strong, straight nose",mouthShape:"firm, defined lips",
       impression:"a noble, heroic presence",eyeShape:"warm, deep-set eyes",eyeOne:"amber",hairStyle:"swept-back mane of layered hair",hairLength:"shoulder-length",hairTexture:"thick and wavy",
       bangs:"swept-back front",hairMovement:"is swept back off the forehead",hairHighlights:"@accent",facialHair:"light stubble",
       skinTone:"golden tan",undertone:"warm",skinFinish:"healthy, sun-warmed skin",markings:"a griffin tattoo across one shoulder blade",
       bustSize:"broad, muscular chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"defined biceps and forearms",handShape:"large and strong",waistShape:"narrow waist with a V-taper",stomachShape:"six-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"muscular butt",thighBuild:"powerful, muscular thighs",legShape:"long, strong legs",bodySoftness:"lean, muscular dancer's build",
       posture:"offering a hand with a slight bow",bodyHair:"a trail of hair down the stomach",penisSize:"large",penisType:"thick and veiny",penisColor:"tan",pubicHair:"short, closely trimmed pubic hair"},
      O("Dance partner","glam",{top:["fitted black shirt with the sleeves rolled up","@secondary"],bottom:["fitted black dance trousers","@secondary"],legwear:["black dance shoes","@secondary"],wristAccessory:["leather strap watch","@extra"]}),
      [O("Leather jacket","edgy",{top:["plain crew-neck tee","@third"],outerwear:["worn leather jacket","@secondary"],bottom:["dark-wash jeans","navy blue"],legwear:["leather ankle boots","@extra"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"]})]),

    man("badger","Badger boyfriend","Her gentle giant: a towering, burly baker with a thick chestnut beard, short curls, warm brown eyes, a hairy chest and the softest smile. Flannel and jeans, a henley with rolled sleeves, or shirtless.",
      {primary:"chestnut brown",secondary:"mustard yellow",third:"cream",accent:"black",extra:"forest green"},
      {faceShape:"warm, open face with a broad jaw and full cheeks",expression:"gentle, reserved smile",browShape:"thick, untamed brows",noseShape:"wide, sturdy nose",mouthShape:"full lips with a strong lip line",
       impression:"a warm, reliable presence",eyeShape:"gentle, crinkled eyes",eyeOne:"warm brown",hairStyle:"short curly hair",hairLength:"short",hairTexture:"thick and coarse",
       bangs:"messy fringe",hairMovement:"looks lived-in and casually rumpled",facialHair:"thick full beard",
       skinTone:"light beige",undertone:"warm",skinFinish:"warm, glowing skin",markings:"laugh lines around the eyes",
       bustSize:"thick, heavy chest",bustShape:"full, rounded pecs",bustWeight:"dense, thick muscle",heightStature:"towering stature",shoulderShape:"very broad, powerful shoulders",
       torsoShape:"thick, barrel-chested torso",armShape:"thick, powerful arms",handShape:"big and capable",waistShape:"thick, solid waist",stomachShape:"thick, solid midsection",
       hipShape:"solid hips",buttSize:"broad, powerful butt",thighBuild:"thick, solid thighs",legShape:"thick, sturdy legs",bodySoftness:"towering, burly gentle-giant build",
       posture:"standing close and protective",bodyHair:"hairy chest, stomach and arms",penisSize:"huge",penisType:"thick and veiny",penisColor:"light brown",pubicHair:"thick, untrimmed pubic hair"},
      O("Flannel and jeans","casual",{top:["plaid flannel shirt","@secondary"],bottom:["relaxed-fit jeans","navy blue"],legwear:["work boots","@primary"],belt:["leather belt with a metal buckle","@primary"]}),
      [O("Rolled-up henley","cottage",{top:["fitted henley with the sleeves pushed up","@third"],bottom:["chino trousers","@primary"],legwear:["work boots","@primary"]}),
       O("Shirtless","casual",{bottom:["unbuttoned jeans riding low on the hips","navy blue"]})]),

    man("raven","Raven boyfriend","Her quiet match: a tall, lean astronomer with a black half-up man bun, storm-gray eyes behind round wire glasses, designer stubble and a constellation tattoo along one forearm. A turtleneck and long coat, a shirt and waistcoat, or an open shirt.",
      {primary:"black",secondary:"midnight blue",third:"silver",accent:"bronze",extra:"charcoal gray"},
      {faceShape:"sharp-featured, elegant face with a tapered jaw",expression:"calm, assured gaze",browShape:"neat, defined brows",noseShape:"sharp, narrow nose",mouthShape:"thin, firm lips",
       impression:"a scholarly, composed presence",eyeShape:"steady, almond-shaped eyes",eyeOne:"storm gray",hairStyle:"half-up man bun",hairLength:"shoulder-length",hairTexture:"glossy and heavy",
       bangs:"long fringe falling over the forehead",hairMovement:"drops loosely over the forehead",facialHair:"designer stubble",
       skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, even skin",markings:"a constellation tattoo along one forearm",
       bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"lean, sinewy shoulders",
       torsoShape:"lean, wiry torso",armShape:"lean, wiry arms with visible veins",handShape:"long-fingered and elegant",waistShape:"lean, defined waist",stomachShape:"lean stomach with a visible V-line",
       hipShape:"lean, narrow hips",buttSize:"muscular butt",thighBuild:"lean, sinewy thighs",legShape:"long legs with strong calves",bodySoftness:"slim, toned build with defined muscle",
       posture:"leaning back against a wall, arms folded",bodyHair:"light chest hair",penisSize:"large",penisType:"long and veiny",penisColor:"pale pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Stargazer","preppy",{top:["turtleneck sweater","@secondary"],outerwear:["long wool overcoat","@primary"],bottom:["slim tailored trousers","@extra"],legwear:["chelsea boots","@primary"],eyewear:["round wire glasses","@third"]}),
      [O("Shirt and waistcoat","preppy",{top:["crisp collared button-up shirt","white"],corset:["waistcoat left unbuttoned","@secondary"],bottom:["slim tailored trousers","@extra"],eyewear:["round wire glasses","@third"]}),
       O("Open shirt","boudoir",{top:["unbuttoned shirt hanging open","white"],bottom:["slim tailored trousers","@extra"],eyewear:["round wire glasses","@third"]})]),

    man("serpent","Serpent boyfriend","The only man who can put her in her place: tall, cold and immaculate, with slicked-back black hair, piercing silver-gray eyes, a knowing smirk and a serpent tattoo coiling across his chest. A black suit and emerald tie, a silk shirt open to the chest, or less.",
      {primary:"jet black",secondary:"charcoal gray",third:"emerald green",accent:"silver",extra:"white"},
      {faceShape:"chiseled face with a sharp jawline and high cheekbones",expression:"dominant, knowing smirk",browShape:"sharp, slanted brows",noseShape:"straight nose with a defined tip",mouthShape:"thin, firm lips",
       impression:"a commanding, authoritative presence",eyeShape:"piercing, hooded eyes",eyeOne:"silver-gray",hairStyle:"slicked-back hair",hairLength:"short",hairTexture:"sleek and slicked",
       bangs:"slicked-back hairline",hairMovement:"stays sharply combed and clean",facialHair:"clean-shaven",
       skinTone:"fair",undertone:"cool",skinFinish:"smooth, even skin",markings:"a serpent tattoo coiling across the chest and shoulder",
       bustSize:"broad chest",bustShape:"squared, sculpted pecs",bustWeight:"pronounced definition",heightStature:"tall, imposing stature",shoulderShape:"wide, squared-off shoulders",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"defined biceps and forearms",handShape:"long-fingered and elegant",waistShape:"narrow, tapered waist",stomachShape:"sculpted eight-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"muscular butt",thighBuild:"long, strong thighs",legShape:"long, strong legs",bodySoftness:"tall, broad-shouldered build with a lean waist",
       posture:"hands-in-pockets stance",bodyHair:"smooth, hairless chest",penisSize:"huge",penisType:"thick, veiny and slightly curved upward",penisColor:"soft pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Black suit","glam",{top:["crisp collared button-up shirt","@primary"],outerwear:["single-breasted suit jacket","@primary"],bottom:["tailored suit trousers","@primary"],
        neckAccessory:["slim necktie","@third"],legwear:["leather oxford shoes","@primary"],ringAccessory:["signet ring","@accent"]}),
      [O("Silk shirt","glam",{top:["silk shirt unbuttoned to the chest","@third"],bottom:["tailored suit trousers","@primary"],ringAccessory:["signet ring","@accent"],gloves:["leather driving gloves","@primary"]}),
       O("Belt undone","boudoir",{bottom:["dress trousers with the belt undone","@primary"],ringAccessory:["signet ring","@accent"]})]),

    man("wolf","Wolf boyfriend","Her wild match: a huge, rugged mountain ranger with a long dark wolf-cut shag, amber eyes, heavy stubble, a hairy chest and claw-mark scars. Flannel and a shearling jacket, or shirtless in worn jeans.",
      {primary:"dark brown",secondary:"charcoal gray",third:"forest green",accent:"amber",extra:"black"},
      {faceShape:"weathered, strong-featured face with deep-set eyes",expression:"feral, hungry grin",browShape:"thick, untamed brows",noseShape:"slightly crooked nose",mouthShape:"wide mouth with a relaxed lip line",
       impression:"a wild, untamed masculinity",eyeShape:"hooded, intense eyes",eyeOne:"amber",hairStyle:"long wolf-cut shag",hairLength:"shoulder-length",hairTexture:"wiry and unruly",
       bangs:"messy fringe",hairMovement:"has a rugged, windblown look",facialHair:"heavy stubble",
       skinTone:"tan",undertone:"warm",skinFinish:"weathered, sun-roughened skin",markings:"claw-mark scars across the torso",
       bustSize:"deep, powerful chest",bustShape:"full, rounded pecs",bustWeight:"dense, thick muscle",heightStature:"tall, imposing stature",shoulderShape:"heavy, muscular shoulders",
       torsoShape:"athletic, well-defined torso",armShape:"heavily muscled arms",handShape:"broad and calloused",waistShape:"lean, defined waist",stomachShape:"defined abs and obliques",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"heavily muscled thighs",legShape:"powerful legs with defined calves",bodySoftness:"broad, muscular build",
       posture:"hooking his thumbs into his belt loops",bodyHair:"thick, hairy chest",penisSize:"huge",penisType:"thick and veiny",penisColor:"light brown",pubicHair:"thick, untrimmed pubic hair"},
      O("Mountain ranger","casual",{top:["plaid flannel shirt","@third"],outerwear:["shearling-lined jacket","@primary"],bottom:["cargo pants","@secondary"],legwear:["work boots","@primary"],neckAccessory:["wolf-fang pendant on a leather cord","@extra"]}),
      [O("Shirtless","edgy",{bottom:["distressed jeans","navy blue"],belt:["leather belt with a metal buckle","@primary"],legwear:["work boots","@primary"],neckAccessory:["wolf-fang pendant on a leather cord","@extra"]})]),

    man("swan","Swan boyfriend","Her prince: a tall, slender premier danseur with platinum side-swept hair, ice-blue eyes, a clean-shaven, finely chiseled face and a gentle, loving smile. A white tuxedo, an open silk shirt, or nothing.",
      {primary:"platinum blonde",secondary:"white",third:"navy blue",accent:"silver",extra:"dusty rose"},
      {faceShape:"princely, finely chiseled face with a straight jaw",expression:"gentle, loving smile",browShape:"neat, defined brows",noseShape:"straight nose with a defined tip",mouthShape:"firm, defined lips",
       impression:"a refined, aristocratic presence",eyeShape:"steady, almond-shaped eyes",eyeOne:"ice blue",hairStyle:"medium-length swept hair",hairTexture:"soft and fine",
       bangs:"side-swept fringe",hairMovement:"stays crisp and neatly in place",facialHair:"clean-shaven",
       skinTone:"fair",undertone:"cool",skinFinish:"smooth, even skin",
       bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"athletic, well-defined torso",armShape:"lean arms with defined forearms",handShape:"long-fingered and elegant",waistShape:"narrow, tapered waist",stomachShape:"lean stomach with a visible V-line",
       hipShape:"lean, narrow hips",buttSize:"round, muscular butt",thighBuild:"long, strong thighs",legShape:"long legs with strong calves",bodySoftness:"lean, muscular dancer's build",
       posture:"offering a hand with a slight bow",bodyHair:"smooth, shaved body",penisSize:"large",penisType:"smooth",penisColor:"soft pink",pubicHair:"short, closely trimmed pubic hair"},
      O("White tuxedo","glam",{top:["tuxedo shirt with a pleated front","@secondary"],outerwear:["tuxedo jacket","@secondary"],bottom:["tailored suit trousers","@secondary"],
        neckAccessory:["bow tie","@third"],legwear:["leather oxford shoes","@secondary"],wristAccessory:["gold wristwatch","@accent"]}),
      [O("Silk shirt","glam",{top:["silk shirt unbuttoned to the chest","@secondary"],bottom:["slim tailored trousers","@third"],legwear:["loafers","@third"]}),
       O("Open shirt","boudoir",{top:["unbuttoned shirt hanging open","@secondary"],bottom:["slim tailored trousers","@third"]})]),

    man("dragon","Dragon boyfriend","A warrior fierce enough for her: a huge, bronze-skinned fighter with a long black half-up warrior braid, molten gold eyes, a short boxed beard and a dragon tattoo coiling down one arm. Leather and chains, battle armor, or bare.",
      {primary:"black",secondary:"crimson",third:"bronze",accent:"gold",extra:"charcoal gray"},
      {faceShape:"angular face with a defined jaw and pronounced cheekbones",expression:"cocky half-smile",browShape:"bold, angular brows",noseShape:"prominent, Roman nose",mouthShape:"firm, defined lips",
       impression:"a fierce, warlike presence",eyeShape:"sharp, hawk-like eyes",eyeOne:"molten gold",hairStyle:"half-up warrior braid",hairLength:"long",hairTexture:"glossy and heavy",
       bangs:"swept-back front",hairMovement:"is swept back off the forehead",hairHighlights:"@secondary",facialHair:"short boxed beard",
       skinTone:"bronze",undertone:"warm",skinFinish:"healthy, sun-warmed skin",markings:"a dragon tattoo coiling over one shoulder and down the arm",
       bustSize:"huge, heavily muscled chest",bustShape:"squared, sculpted pecs",bustWeight:"heavy, solid mass",heightStature:"towering stature",shoulderShape:"very broad, powerful shoulders",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"heavily muscled arms",handShape:"rough, with scarred knuckles",waistShape:"lean, defined waist",stomachShape:"defined abs and obliques",
       hipShape:"narrow hips with a V-taper",buttSize:"broad, powerful butt",thighBuild:"heavily muscled thighs",legShape:"powerful legs with defined calves",bodySoftness:"broad, powerful warrior's build",
       posture:"wide-legged confident stance",bodyHair:"a dusting of hair across the chest",penisSize:"huge",penisType:"thick and veiny",penisColor:"caramel brown",pubicHair:"short, closely trimmed pubic hair"},
      O("Leather and chains","edgy",{top:["sleeveless leather vest over a bare chest","@primary"],bottom:["fitted leather trousers","@primary"],legwear:["lace-up combat boots","@primary"],
        neckAccessory:["gold chain necklace","@accent"],wristAccessory:["leather wrist cuffs","@secondary"]}),
      [O("Battle armor","costume",{top:["leather chest harness","@primary"],shoulderPiece:["armored pauldrons","@third"],wristAccessory:["armored vambrace","@third"],bottom:["leather pants","@primary"],legwear:["tall armored boots","@third"]}),
       O("Shirtless","edgy",{bottom:["fitted leather trousers","@primary"],neckAccessory:["gold chain necklace","@accent"]})]),

    man("stag","Stag boyfriend","Her gentle forest guardian: a tall, warm-brown ranger with loose chestnut waves, green eyes, a neatly trimmed beard and a stag-antler tattoo on one forearm. A linen tunic and travel cloak, an open linen shirt, or shirtless.",
      {primary:"chestnut brown",secondary:"moss green",third:"cream",accent:"gold",extra:"forest green"},
      {faceShape:"oval face with a defined jaw and a cleft chin",expression:"warm, adoring gaze",browShape:"full brows with a slight arch",noseShape:"strong, straight nose",mouthShape:"full lips with a strong lip line",
       impression:"a gentle, soft-spoken presence",eyeShape:"calm, slightly drooping eyes",eyeOne:"forest green",hairStyle:"loose shoulder-length waves",hairLength:"shoulder-length",hairTexture:"soft, loose waves",
       bangs:"curtain fringe",hairMovement:"looks lived-in and casually rumpled",hairHighlights:"@accent",facialHair:"neatly trimmed beard",
       skinTone:"warm brown",undertone:"golden",skinFinish:"warm, glowing skin",markings:"a stag-antler tattoo on one forearm",
       bustSize:"broad chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"towering stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"athletic, well-defined torso",armShape:"strong forearms and capable hands",handShape:"broad and calloused",waistShape:"trim waist",stomachShape:"flat stomach with faint abs",
       hipShape:"slim, straight hips",buttSize:"muscular butt",thighBuild:"long, strong thighs",legShape:"long, strong legs",bodySoftness:"tall, rangy, hard-muscled build",
       posture:"relaxed, open stance",bodyHair:"light chest hair",penisSize:"large",penisType:"uncircumcised and veiny",penisColor:"chocolate brown",pubicHair:"short, closely trimmed pubic hair"},
      O("Forest ranger","cottage",{top:["laced-front linen tunic","@third"],outerwear:["hooded travel cloak","@secondary"],bottom:["rugged travel trousers","@primary"],legwear:["cuffed leather boots","@primary"],wristAccessory:["leather bracer","@primary"]}),
      [O("Linen","resort",{top:["linen shirt unbuttoned to the chest","@third"],bottom:["loose drawstring linen trousers","@third"],legwear:["leather sandals","@primary"]}),
       O("Shirtless","cottage",{bottom:["loose drawstring linen trousers","@third"]})]),

    man("shark","Shark boyfriend","Her laid-back lifeguard: a tanned, ripped surfer with tousled sun-bleached hair, sea-blue eyes, a toothy grin, light stubble and a shark-tooth necklace. An open Hawaiian shirt and board shorts, beach linen, or just the trunks.",
      {primary:"sandy blonde",secondary:"ocean blue",third:"white",accent:"coral red",extra:"charcoal gray"},
      {faceShape:"diamond-shaped face with a firm chin",expression:"mischievous, toothy grin",browShape:"strong, straight brows",noseShape:"straight nose with a defined tip",mouthShape:"wide mouth with a relaxed lip line",
       impression:"a laid-back, sun-soaked charm",eyeShape:"bright, laughing eyes",eyeOne:"sea blue",hairStyle:"tousled surfer hair",hairLength:"medium",hairTexture:"sun-bleached and salty",
       bangs:"messy fringe",hairMovement:"has a rugged, windblown look",facialHair:"light stubble",
       skinTone:"golden tan",undertone:"golden",skinFinish:"sun-kissed skin with a salty sheen",markings:"a shark-tooth tattoo along the ribs",
       bustSize:"broad, muscular chest",bustShape:"chiseled pecs with a visible center line",bustWeight:"pronounced definition",heightStature:"lean, tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"defined biceps and forearms",handShape:"big and capable",waistShape:"slim waist with defined obliques",stomachShape:"six-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"long, strong thighs",legShape:"long, strong legs",bodySoftness:"lean, defined surfer's build",
       posture:"raking one hand back through his hair",bodyHair:"smooth, hairless chest",penisSize:"huge",penisType:"long and veiny",penisColor:"tan",pubicHair:"short, closely trimmed pubic hair"},
      O("Lifeguard","resort",{top:["open Hawaiian-print shirt","@secondary"],bottom:["board shorts","@accent"],neckAccessory:["shark-tooth necklace on a leather cord","@third"],legwear:["flip-flops","@extra"]}),
      [O("Beach linen","resort",{top:["linen shirt unbuttoned to the chest","@third"],bottom:["chino shorts","@primary"],neckAccessory:["shark-tooth necklace on a leather cord","@third"]}),
       O("Board shorts","resort",{bottom:["board shorts","@accent"],neckAccessory:["shark-tooth necklace on a leather cord","@third"]})]),

    man("penguin","Penguin boyfriend","Her dangerously handsome heartthrob, a penguin in black tie: tall, ripped and devastatingly cool, with a slicked-back black undercut, piercing ice-blue eyes, designer stubble, an ice-crystal tattoo down one forearm and a slow, devastating smirk. An open-collared tuxedo with the bow tie hanging loose, a leather jacket over a black henley, low-slung sweatpants, or nothing.",
      {primary:"black",secondary:"white",third:"ice blue",accent:"silver",extra:"orange"},
      {faceShape:"striking, chiseled face with a razor-sharp jaw",expression:"slow, devastating smirk",browShape:"bold, angular brows",noseShape:"strong, straight nose",mouthShape:"firm, defined lips",
       impression:"a smoldering, magnetic allure",eyeShape:"piercing, hooded eyes",eyeOne:"ice blue",irisDetail:"defined limbal ring",hairStyle:"slicked-back undercut with a few loose strands falling forward",hairLength:"short",hairTexture:"sleek and slicked",
       bangs:"slicked-back hairline",hairMovement:"is pushed back with a careless hand",facialHair:"designer stubble",
       skinTone:"fair",undertone:"cool",skinFinish:"smooth, even skin",markings:"an ice-crystal tattoo winding down one forearm",
       bustSize:"broad, muscular chest",bustShape:"chiseled pecs with a visible center line",bustWeight:"pronounced definition",heightStature:"tall, imposing stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"defined biceps and forearms",handShape:"lean and veined",waistShape:"narrow waist with a V-taper",stomachShape:"sculpted eight-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"powerful, muscular thighs",legShape:"long, strong legs",bodySoftness:"tall, broad-shouldered build with a lean waist",
       posture:"loosening his bow tie with one hand",bodyHair:"a trail of hair down the stomach",penisSize:"huge",penisType:"thick, veiny and slightly curved upward",penisColor:"soft pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Black tie","glam",{top:["tuxedo shirt unbuttoned to the chest","@secondary"],outerwear:["tuxedo jacket","@primary"],bottom:["tailored suit trousers","@primary"],
        neckAccessory:["bow tie hanging untied around the neck","@primary"],legwear:["leather oxford shoes","@primary"],wristAccessory:["analog wristwatch","@accent"]}),
      [O("Leather jacket","edgy",{top:["fitted henley with the sleeves pushed up","@primary"],outerwear:["worn leather jacket","@primary"],bottom:["slim-fit jeans","@primary"],legwear:["lace-up combat boots","@primary"],wristAccessory:["analog wristwatch","@accent"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"],wristAccessory:["analog wristwatch","@accent"]})]),

    man("fox","Fox boyfriend","A rogue who can keep up with her: a lean, charming gambler with a copper side-swept undercut, heavy-lidded amber eyes, a van dyke beard, a single hoop earring and tattooed forearms. Waistcoat and rolled sleeves, an open shirt, or nothing.",
      {primary:"copper red",secondary:"charcoal gray",third:"cream",accent:"amber gold",extra:"black"},
      {faceShape:"sharp-featured, elegant face with a tapered jaw",expression:"roguish grin",browShape:"sharp, slanted brows",noseShape:"sharp, narrow nose",mouthShape:"thin, firm lips",
       impression:"a roguish charm",eyeShape:"heavy-lidded eyes",eyeOne:"amber gold",hairStyle:"side-swept undercut",hairLength:"short",hairTexture:"thick and wavy",
       bangs:"side-swept fringe",hairMovement:"is pushed back with a careless hand",facialHair:"van dyke beard",
       skinTone:"light beige",undertone:"warm",skinFinish:"smooth, even skin",markings:"a fox tattoo on one forearm",
       bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"lean, sinewy shoulders",
       torsoShape:"lean, wiry torso",armShape:"lean, wiry arms with visible veins",handShape:"long-fingered and elegant",waistShape:"slim waist with defined obliques",stomachShape:"lean stomach with a visible V-line",
       hipShape:"lean, narrow hips",buttSize:"muscular butt",thighBuild:"lean, sinewy thighs",legShape:"lean, wiry legs",bodySoftness:"ripped, lean build",
       posture:"leaning back against a wall, arms folded",bodyHair:"a trail of hair down the stomach",penisSize:"large",penisType:"thick, veiny and slightly curved upward",penisColor:"rosy pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Gambler","preppy",{top:["crisp collared button-up shirt","@third"],corset:["fitted waistcoat layer","@secondary"],bottom:["slim tailored trousers","@secondary"],legwear:["loafers","@extra"],
        waistAccessory:["pocket watch on a chain","@accent"],earAccessory:["single hoop earring","@accent"]}),
      [O("Open shirt","boudoir",{top:["unbuttoned shirt hanging open","@third"],bottom:["slim tailored trousers","@secondary"],earAccessory:["single hoop earring","@accent"]})]),

    man("lovebird","Lovebird boyfriend","Her devoted sweetheart: a tall, broad-shouldered pastry chef with soft, tousled strawberry-blond waves, warm sage-green eyes, freckles, light stubble and a slow, doting smile, never more than an arm's length from her. A cream cable-knit sweater, a henley with a baker's apron, an open shirt, or nothing.",
      {primary:"cream",secondary:"creamsicle orange",third:"sage green",accent:"mint green",extra:"light brown"},
      {faceShape:"sculpted, handsome face with high cheekbones and a firm jaw",expression:"gentle, loving smile",browShape:"strong, straight brows",noseShape:"straight nose with a defined tip",mouthShape:"firm, defined lips",
       impression:"a warm, devoted presence",eyeShape:"warm, deep-set eyes",eyeOne:"@third",hairStyle:"soft, tousled wavy hair",hairLength:"medium",hairTexture:"thick and wavy",
       bangs:"soft fringe falling over the brow",hairMovement:"falls softly over the forehead",hairBase:"strawberry blonde",hairHighlights:"@secondary",facialHair:"light stubble",facialHairColor:"strawberry blonde",
       skinTone:"fair warm",undertone:"warm",skinFinish:"healthy, sun-warmed skin",markings:"light freckles across the nose and cheeks, with faint freckles on the shoulders",
       bustSize:"broad, muscular chest",bustShape:"chiseled pecs with a visible center line",bustWeight:"pronounced definition",heightStature:"tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"defined biceps and forearms",handShape:"large and strong",waistShape:"narrow waist with a V-taper",stomachShape:"sculpted eight-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"powerful, muscular thighs",legShape:"long, strong legs",bodySoftness:"tall, broad-shouldered build with a lean waist",
       posture:"rolling up his sleeves",bodyHair:"a light dusting of hair across the chest",penisSize:"huge",penisType:"thick, veiny and slightly curved upward",penisColor:"pale pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Sweetheart","casual",{top:["cable-knit sweater","@primary"],bottom:["chino trousers","@extra"],legwear:["low-top canvas sneakers","@primary"],neckAccessory:["knit scarf","@secondary"]}),
      [O("Baker","casual",{top:["fitted henley with the sleeves pushed up","@primary"],waistAccessory:["canvas work apron","@secondary"],bottom:["chino trousers","@extra"],legwear:["low-top canvas sneakers","@primary"]}),
       O("Open shirt","boudoir",{top:["unbuttoned shirt hanging open","@primary"],bottom:["chino trousers","@extra"]})]),

    man("flamingo","Flamingo boyfriend","Her serene island love: a tall, golden-bronze man with loose black waves, calm dark eyes, light stubble, a tribal wave tattoo and a gentle smile. An open white linen shirt and puka shells, or pink swim trunks.",
      {primary:"black",secondary:"white",third:"hot pink",accent:"golden yellow",extra:"salmon"},
      {faceShape:"long face with a strong chin and a straight jaw",expression:"serene, gentle smile",browShape:"strong, straight brows",noseShape:"strong, straight nose",mouthShape:"full lips with a strong lip line",
       impression:"a calm, dependable presence",eyeShape:"calm, slightly drooping eyes",eyeOne:"dark brown",hairStyle:"loose shoulder-length waves",hairLength:"shoulder-length",hairTexture:"soft, loose waves",
       bangs:"curtain fringe",hairMovement:"has a rugged, windblown look",facialHair:"light stubble",
       skinTone:"golden bronze",undertone:"golden",skinFinish:"sun-kissed skin with a salty sheen",markings:"a tribal wave tattoo across one shoulder",
       bustSize:"broad, muscular chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"towering stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"thick, powerful arms",handShape:"large and strong",waistShape:"trim waist",stomachShape:"six-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"powerful, muscular thighs",legShape:"long, strong legs",bodySoftness:"broad, muscular build",
       posture:"relaxed, open stance",bodyHair:"light chest hair",penisSize:"huge",penisType:"thick and veiny",penisColor:"caramel brown",pubicHair:"short, closely trimmed pubic hair"},
      O("Island linen","resort",{top:["linen shirt unbuttoned to the chest","@secondary"],bottom:["loose drawstring linen trousers","@secondary"],neckAccessory:["puka shell necklace","@secondary"],legwear:["leather sandals","@extra"]}),
      [O("Swim trunks","resort",{bottom:["swim trunks","@third"],neckAccessory:["puka shell necklace","@secondary"]})]),

    man("kraken","Kraken boyfriend","Her deep-sea captain: a towering, pale, broad-shouldered sea captain with long black hair slicked back into a low ponytail and streaked deep violet, glowing teal eyes, rugged stubble along a sharp jaw, a heavy-lidded lazy smile and a kraken tattoo whose tentacles wind across his chest and down one arm. An open shirt under a long captain's coat, a rain-soaked shirt hanging open, or nothing.",
      {primary:"black",secondary:"deep violet",third:"teal",accent:"silver",extra:"crimson"},
      {faceShape:"pale, sculpted face with a sharp jaw and high cheekbones",expression:"heavy-lidded, lazy smile",browShape:"sharp, slanted brows",noseShape:"straight nose with a defined tip",mouthShape:"firm, defined lips",
       impression:"a dangerous, brooding allure",eyeShape:"hooded, intense eyes",eyeOne:"@third",irisDetail:"luminous iris rim",hairStyle:"slicked-back undercut ponytail",hairLength:"long",hairTexture:"glossy and heavy",
       bangs:"swept-back front",hairMovement:"is swept back off the forehead",hairHighlights:"@secondary",facialHair:"rugged stubble along the jaw",
       skinTone:"pale ivory",undertone:"cool",skinFinish:"smooth, even skin",markings:"a kraken tattoo whose tentacles wind across his chest and down one arm",
       bustSize:"broad, muscular chest",bustShape:"chiseled pecs with a visible center line",bustWeight:"pronounced definition",heightStature:"towering stature",shoulderShape:"very broad, powerful shoulders",
       torsoShape:"broad V-shaped torso tapering to the waist",armShape:"heavily muscled arms",handShape:"large and strong",waistShape:"narrow waist with a V-taper",stomachShape:"sculpted eight-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"round, muscular butt",thighBuild:"powerful, muscular thighs",legShape:"long, strong legs",bodySoftness:"tall, broad-shouldered build with a lean waist",
       posture:"hands-in-pockets stance",bodyHair:"a trail of hair down the stomach",penisSize:"huge",penisType:"thick, veiny and slightly curved upward",penisColor:"pale pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Sea captain","glam",{top:["linen shirt unbuttoned to the chest","white"],outerwear:["long tailored coat","@primary"],bottom:["fitted leather trousers","@primary"],legwear:["riding boots","@primary"],
        neckAccessory:["signet pendant on a chain","@accent"],ringAccessory:["signet ring","@accent"]}),
      [O("Rain-soaked shirt","edgy",{top:["unbuttoned shirt hanging open","white"],bottom:["fitted leather trousers","@primary"],legwear:["riding boots","@primary"],neckAccessory:["signet pendant on a chain","@accent"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"],neckAccessory:["signet pendant on a chain","@accent"]})]),

    man("salmon","Salmon boyfriend","Her itamae: a tall, lean sushi chef with a jet-black textured crop under an indigo hachimaki, calm dark eyes, light stubble along a clean jaw, a precise, unhurried knife hand and a leaping-salmon tattoo down one forearm; he saves her the first slice of every fish. A crisp white chef's coat and apron, an indigo haori over a black shirt, or nothing.",
      {primary:"jet black",secondary:"white",third:"indigo",accent:"salmon",extra:"charcoal gray"},
      {faceShape:"angular face with a defined jaw and pronounced cheekbones",expression:"smoldering, confident gaze",browShape:"neat, defined brows",noseShape:"straight nose with a defined tip",mouthShape:"thin, firm lips",
       impression:"a calm, dependable presence",eyeShape:"steady, almond-shaped eyes",eyeOne:"dark brown",hairStyle:"textured crop",hairLength:"short",hairTexture:"glossy and heavy",
       bangs:"textured fringe",facialHair:"light stubble",
       skinTone:"light beige",undertone:"warm",skinFinish:"smooth, even skin",markings:"a leaping-salmon tattoo down one forearm",
       bustSize:"broad chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"athletic, well-defined torso",armShape:"strong forearms and capable hands",handShape:"long-fingered and elegant",waistShape:"trim waist",stomachShape:"six-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"muscular butt",thighBuild:"long, strong thighs",legShape:"long, strong legs",bodySoftness:"tall, rangy, hard-muscled build",
       posture:"rolling up his sleeves",bodyHair:"smooth, hairless chest",penisSize:"huge",penisType:"thick and veiny",penisColor:"light brown",pubicHair:"short, closely trimmed pubic hair"},
      O("Sushi bar","casual",{top:["crisp white chef's coat with {c2} piping","@secondary",null,"@accent"],headwear:["twisted {c} hachimaki headband","@third"],
        waistAccessory:["{c} sushi chef's apron tied at the waist","@third"],bottom:["slim tailored trousers","@primary"],legwear:["leather oxford shoes","@primary"]}),
      [O("Indigo haori","glam",{top:["fitted black shirt with the sleeves rolled up","@primary"],outerwear:["haori jacket","@third"],bottom:["slim tailored trousers","@primary"],legwear:["leather oxford shoes","@primary"]}),
       O("Shirtless","casual",{bottom:["loose drawstring linen trousers","@secondary"],headwear:["twisted {c} hachimaki headband","@third"]})]),

    man("crow","Crow boyfriend","Her watchmaker: a tall, soft-spoken clockmaker with messy ink-black curls, warm silver-gray eyes, light stubble and a crow-feather tattoo along one forearm, the only person she trusts to mend her treasures, and the keeper of every shiny thing she has ever given him. A shirt, waistcoat and loupe, a long coat and knit scarf, or nothing.",
      {primary:"black",secondary:"charcoal gray",third:"dusty lavender",accent:"silver",extra:"ink blue"},
      {faceShape:"sculpted, handsome face with high cheekbones and a firm jaw",expression:"warm, adoring gaze",browShape:"neat, defined brows",noseShape:"straight nose with a defined tip",mouthShape:"firm, defined lips",
       impression:"a warm, devoted presence",eyeShape:"gentle, crinkled eyes",eyeOne:"silver-gray",hairStyle:"curly top with tapered sides",hairLength:"medium",hairTexture:"thick and wavy",
       bangs:"messy fringe",hairMovement:"looks lived-in and casually rumpled",hairHighlights:"@extra",facialHair:"light stubble",
       skinTone:"fair",undertone:"cool",skinFinish:"smooth, even skin",markings:"a crow-feather tattoo along one forearm",
       bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"lean, sinewy shoulders",
       torsoShape:"lean, wiry torso",armShape:"lean arms with defined forearms",handShape:"long-fingered and elegant",waistShape:"lean, defined waist",stomachShape:"lean stomach with a visible V-line",
       hipShape:"lean, narrow hips",buttSize:"muscular butt",thighBuild:"lean, sinewy thighs",legShape:"long legs with strong calves",bodySoftness:"slim, toned build with defined muscle",
       posture:"leaning back against a wall, arms folded",bodyHair:"light chest hair",penisSize:"large",penisType:"long and veiny",penisColor:"pale pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Watchmaker","preppy",{top:["crisp collared button-up shirt","@third"],corset:["fitted waistcoat layer","@secondary"],bottom:["slim tailored trousers","@primary"],
        eyewear:["watchmaker's loupe flipped up on wire-rimmed glasses","@accent"],waistAccessory:["pocket watch on a chain","@accent"],legwear:["chelsea boots","@primary"]}),
      [O("Long coat","preppy",{top:["turtleneck sweater","@primary"],outerwear:["long wool overcoat","@secondary"],neckAccessory:["knit scarf","@third"],bottom:["slim tailored trousers","@primary"],legwear:["chelsea boots","@primary"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"],waistAccessory:["pocket watch on a chain","@accent"]})])
  ],{after:"Academy Couples"});
})();

/* ---- v167: the Owl and Rat boyfriends (Academy Men), built like men151.js.
   Owl: her night archivist, a rare-book restorer who keeps the library open for her after midnight.
   Rat: her locksmith and street mechanic, a charming rogue who can open any door for her. ---- */
(function(){
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const BASE={sex:"male",age:"man",eyeConfig:"matching",pupilStyle:"round pupils",irisDetail:"clear iris detail",lashNatural:"thick, understated eyelashes",
    nailStyle:"short, clean natural nails",hairBase:"@primary",facialHairColor:"@primary",markings:"no markings"};
  const O=(oname,look,items)=>({oname,look,items,details:{},dcol:{}});
  const ROBE_IT="long {c} open-front robe with a high standing collar, wide sleeves and {c2} lining",VEST="double-breasted {c} waistcoat with {c2} piping",CRAVAT="{c} silk cravat with a {c2} crest pin";
  const RB={owl:["espresso brown","caramel brown","antique ivory","amber","caramel brown","amber","espresso brown","amber","amber owl-feather embroidery along the collar and cuffs","leather oxford shoes"],
    rat:["charcoal gray","rose pink","ash gray","mustard yellow","rose pink","silver","charcoal gray","mustard yellow","rose-pink patchwork stitching along the collar and cuffs","chelsea boots"]};
  addMO("detailOne",Object.values(RB).map(r=>[r[8],"CU","costume,preppy"]));
  const robes=h=>{const[rb,ln,vs,pp,cv,pn,tr,br,motif,shoes]=RB[h];
    return{oname:"House robes",look:"costume",items:{top:["crisp collared button-up shirt","white"],corset:[VEST,vs,null,pp],outerwear:[ROBE_IT,rb,null,ln],
      neckAccessory:[CRAVAT,cv,null,pn],bottom:["tailored suit trousers",tr],legwear:[shoes,"black"],tagCharm:[h+" crest brooch",br]},details:{detailOne:motif},dcol:{}}};
  const man=(h,name,blurb,pal,c,outfit,more)=>({id:h+"man",name,blurb,pal,c:Object.assign({},BASE,c),outfit,more:[robes(h)].concat(more),nude:true,
    out:{framing:"full body",must:MUST},tags:["man","boyfriend","partner","male",h]});
  addM("facialHair",["short, neatly trimmed beard"],"Men");
  addM("markings",["an owl tattoo spreading its wings across his back","a rat-and-key tattoo along one forearm"],"Scars and tattoos");
  addM("hairStyle",["tousled, swept-back hair","messy undercut"],"Men");addM("expression",["patient, knowing smile","roguish, lopsided grin"],"Men’s expressions");
  addM("posture",["leaning on a bookshelf with an open book","spinning a ring of keys on one finger"],"Posture");
  addMO("top",[["soft knit cardigan over a {c2} henley","CU","preppy,cottage"],["grease-smudged {c} tank top","CU","casual,edgy"]]);
  addMO("waistAccessory",[["{c} leather tool belt with lockpicks","CU","casual,edgy"]]);
  addMO("eyewear",[["round wire-rimmed glasses","CU","preppy"]]);
  addMO("neckAccessory",[["ring of keys on a chain","CU","casual,edgy"]]);
  START.add("Academy Men",[
    man("owl","Owl boyfriend","Her night archivist: a tall, gentle rare-book restorer with tousled honey-brown hair, warm amber eyes behind round wire-rimmed glasses, a short neat beard and an owl tattoo spreading its wings across his back. He keeps the library open for her long after midnight and always saves her the window seat. A cardigan and henley, a long coat and scarf, or nothing.",
      {primary:"honey brown",secondary:"antique ivory",third:"espresso brown",accent:"amber",extra:"caramel brown"},
      {faceShape:"sculpted, handsome face with high cheekbones and a firm jaw",expression:"patient, knowing smile",browShape:"neat, defined brows",noseShape:"straight nose with a defined tip",mouthShape:"firm, defined lips",
       impression:"a warm, devoted presence",eyeShape:"gentle, crinkled eyes",eyeOne:"amber",hairStyle:"tousled, swept-back hair",hairLength:"medium",hairTexture:"thick and wavy",
       bangs:"soft fringe falling over the brow",facialHair:"short, neatly trimmed beard",
       skinTone:"light beige",undertone:"warm",skinFinish:"smooth, even skin",markings:"an owl tattoo spreading its wings across his back",
       bustSize:"broad chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"broad shoulders tapering to a lean waist",
       torsoShape:"athletic, well-defined torso",armShape:"strong forearms and capable hands",handShape:"long-fingered and elegant",waistShape:"trim waist",stomachShape:"six-pack abs",
       hipShape:"narrow hips with a V-taper",buttSize:"muscular butt",thighBuild:"long, strong thighs",legShape:"long, strong legs",bodySoftness:"tall, rangy, hard-muscled build",
       posture:"leaning on a bookshelf with an open book",bodyHair:"a light dusting of hair across the chest",penisSize:"huge",penisType:"thick and veiny",penisColor:"light brown",pubicHair:"short, closely trimmed pubic hair"},
      O("Night archivist","preppy",{top:["soft knit cardigan over a {c2} henley","@primary",null,"@secondary"],bottom:["slim tailored trousers","@third"],eyewear:["round wire-rimmed glasses","@accent"],legwear:["leather oxford shoes","@third"]}),
      [O("Long coat","preppy",{top:["turtleneck sweater","@third"],outerwear:["long wool overcoat","@primary"],neckAccessory:["knit scarf","@secondary"],bottom:["slim tailored trousers","@third"],legwear:["chelsea boots","@third"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"],eyewear:["round wire-rimmed glasses","@accent"]})]),
    man("rat","Rat boyfriend","Her locksmith: a lean, wiry street mechanic with a messy black undercut, sly gray eyes, stubble, a roguish lopsided grin and a rat-and-key tattoo along one forearm. He can open any door in the city for her, and has never once asked where she got the key. A grease-smudged tank top and tool belt, a battered leather jacket, or nothing.",
      {primary:"black",secondary:"charcoal gray",third:"rose pink",accent:"silver",extra:"ash gray"},
      {faceShape:"angular face with a defined jaw and pronounced cheekbones",expression:"roguish, lopsided grin",browShape:"neat, defined brows",noseShape:"straight nose with a defined tip",mouthShape:"thin, firm lips",
       impression:"a wild, untamed masculinity",eyeShape:"sharp, hawk-like eyes",eyeOne:"slate gray",hairStyle:"messy undercut",hairLength:"short",hairTexture:"thick and wavy",
       bangs:"messy fringe",facialHair:"light stubble",
       skinTone:"fair",undertone:"cool",skinFinish:"smooth, even skin",markings:"a rat-and-key tattoo along one forearm",
       bustSize:"lean chest",bustShape:"defined pecs",bustWeight:"firm definition",heightStature:"lean, tall stature",shoulderShape:"lean, sinewy shoulders",
       torsoShape:"lean, wiry torso",armShape:"lean arms with defined forearms",handShape:"long-fingered and elegant",waistShape:"lean, defined waist",stomachShape:"lean stomach with a visible V-line",
       hipShape:"lean, narrow hips",buttSize:"muscular butt",thighBuild:"lean, sinewy thighs",legShape:"long legs with strong calves",bodySoftness:"slim, toned build with defined muscle",
       posture:"spinning a ring of keys on one finger",bodyHair:"light chest hair",penisSize:"huge",penisType:"long and veiny",penisColor:"pale pink",pubicHair:"short, closely trimmed pubic hair"},
      O("Locksmith","edgy",{top:["grease-smudged {c} tank top","@secondary"],waistAccessory:["{c} leather tool belt with lockpicks","@primary"],bottom:["slim tailored trousers","@primary"],
        neckAccessory:["ring of keys on a chain","@accent"],legwear:["chelsea boots","@primary"]}),
      [O("Leather jacket","edgy",{top:["grease-smudged {c} tank top","@secondary"],outerwear:["leather jacket","@primary"],bottom:["slim tailored trousers","@primary"],legwear:["chelsea boots","@primary"]}),
       O("Shirtless","casual",{bottom:["low-slung gray sweatpants","charcoal gray"],neckAccessory:["ring of keys on a chain","@accent"]})])
  ]);
})();

/* ===== v150: male-mode tagging for the popular Danbooru tags (data only) =====
   Hair styles and outfit pieces that read as women's wear stay out of male mode, like the existing ones. */
(function(){
  tagF("hairStyle",["two side up","one side up","drill hair ringlets","twin drills","sidelocks wrapped in hair tubes"]);
  tagF("posture",["sitting in wariza on the floor"]);
  tagF("expression",["flustered >_< face","flustered wavy mouth"]);
  const f=(field,vals)=>{OSEX[field]=OSEX[field]||{};vals.forEach(v=>{OSEX[field][v]="f"})};
  f("headwear",["frilled mob cap","hair bobbles"]);
  f("detailTwo",["puffy short sleeves","puffy long sleeves","juliet sleeves","frilled sleeves","a cleavage cutout","a strapless neckline","clothing cutouts"]);
})();

/* ---- v129 (v151: Salmon and Crow): "Academy Intimacy". One explicit two-panel sex scene per girl, built on her robes entry (face, hair,
   body and intimate details are her own) and opened in the Scene tab with her Academy Men boyfriend as character 2,
   in his Nude outfit. The girl is always the one the act is done to: the action tags are written source# on
   character 2 and target# on character 1. The scene text uses {partner} {his} {he} {him} {cock}, so picking any
   other partner still reads right; a woman picked as partner is written as a futanari (pair.penis).
   Explicit scenes follow the safeguard: if Policy holds back either character, the scene and actions are left out. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  const G="Explicit (adult)";
  const EX={a:"full ahegao face, tongue lolling out, eyes crossed and rolled up, mouth hanging open and drooling, mid-orgasm",
            b:"ahegao, tongue fully out, crossed eyes rolling up, drool running down the chin, blushing hard, orgasming",
            c:"ruined ahegao face, mouth open with the tongue out and eyes rolled up, drooling, trembling in orgasm",
            gag:"eyes rolled back, gagging expression with drool running down the chin"};
  START.option("expression",EX.gag,G);
  START.option("bodyMarkings","thick white cum and glistening fluids drip down her inner thighs",G);START.option("bodyMarkings","thick white cum pools on the breasts and drips down the chest",G);
  const POSE={
    griffin:"standing in a standing split, one leg raised high",badger:"lying on her back with her legs spread",
    raven:"bracing herself against a window, bent forward",serpent:"kneeling face down with her hips raised high",
    wolf:"crouching on all fours with her back arched",swan:"lying on her back with her legs spread",
    dragon:"riding on top, straddling her lover's hips",stag:"sitting in her lover's lap with her legs wrapped around him",
    shark:"kneeling with her mouth open and her tongue out",penguin:"lying folded on her back with her knees pressed up to her shoulders",
    fox:"riding in reverse, looking back over her shoulder",lovebird:"bouncing in her lover's lap, kissing him over and over",
    flamingo:"being carried with her legs wrapped around her lover's waist",kraken:"wrapped around her lover, arms and legs locked around him",
    salmon:"bracing herself against a mossy rock under a waterfall",crow:"lying back on a workbench scattered with gears, legs wrapped around her lover"};
  Object.values(POSE).forEach(v=>START.option("posture",v,G));

  const TAIL="2koma, cross-section, x-ray, motion lines, speech bubble, heart-shaped pupils, ahegao, sweat";
  const SC={
griffin:{act:"sex, vaginal, standing sex, standing split, leg up, deep penetration, creampie",ex:EX.a,pc:"hungry, possessive stare",
  items:{legwear:["thigh-high stockings","@secondary"]},where:"a mirrored dance studio",what:"a standing split at the barre",
  scene:`The image is split into two scenes. In the first scene, the woman and {partner} are alone in a mirror-walled dance studio at night, lit by moonlight through tall windows. She stands at the ballet barre in a graceful standing split, one leg raised high against {his} shoulder, blushing shyly and looking back at {him}. She whispers "Don't hold back... I trust you" with a small heart. In the second scene, {partner} fucks her in a standing split against the barre, holding her raised leg to {his} chest. {His} thick, veiny {cock} is buried to the hilt in her vagina, thrusting hard, with motion lines and impact lines, and their bodies are reflected in the mirror wall. The woman makes an ahegao face with her mouth open, tongue out and eyes rolling up, moaning and drooling, and cries "I'M CUMMING! FILL ME UP!" with heart-shaped pupils. {Partner} cums deep inside her: a cross-section shows {his} {cock} pumping thick cum into her womb, and cum overflows from her vagina and drips down her trembling inner thigh. Lewd sound effects fill the scene. ${TAIL}, cum in pussy, cum overflow, standing split, mirror, trembling`},
badger:{act:"paizuri, sex, vaginal, missionary, breast grab, lactation, creampie",ex:EX.b,pc:"lustful, half-lidded stare",
  items:{neckAccessory:["velvet ribbon choker","@primary"]},where:"a cozy cottage bedroom",what:"paizuri, then missionary with her milk spraying",
  scene:`The image is split into two scenes. In the first scene, the woman kneels on a quilted bed in a cozy cottage bedroom lit by warm fairy lights. She squeezes her enormous breasts around {partner}'s {cock} in a slow paizuri, smiling sweetly up at {him} with rosy cheeks, and asks "Does it feel good? Cum on my boobs!" with hearts, as thick white cum splatters across her breasts and chin. In the second scene, she lies on her back while {partner} fucks her missionary style, gripping and squeezing her huge breasts as milk sprays from her nipples. {His} veiny {cock} is buried to the hilt in her vagina, with motion lines showing how hard {he} pounds her. The woman makes an ahegao face with her tongue out and eyes crossed and rolling up, drooling, and cries "Fill me up! I want your babies!" with heart eyes. A cross-section shows {his} cum flooding her womb, and cum overflows from her vagina onto the quilt. She thinks in a pink squiggly thought bubble "SO MUCH!!". Lewd squelching sound effects. ${TAIL}, paizuri, cum on breasts, lactation, breast milk, cum in pussy, cum overflow, thought bubble`},
raven:{act:"sex, vaginal, standing sex, sex from behind, against glass, breasts on glass, creampie",ex:EX.c,pc:"hungry, possessive stare",
  items:{legwear:["sheer thigh-highs","@extra"]},where:"a candlelit astronomy tower",what:"from behind against the window glass under the stars",
  scene:`The image is split into two scenes. In the first scene, the woman stands at the tall window of a candlelit astronomy tower under a sky full of stars, an open star chart on the desk beside her. {Partner} pulls her close from behind and kisses her neck as she blushes and bites her lip, saying "Show me something I can't learn from books." In the second scene, {partner} fucks her standing from behind against the window, her breasts and cheek pressed flat against the cold glass, her palms spread on it and her breath fogging it. {His} thick {cock} is buried deep in her vagina, thrusting relentlessly, with motion lines. She makes an ahegao face with her mouth open, tongue out and eyes rolling up, moaning and drooling onto the glass, and cries "DEEPER! RIGHT THERE!" with heart eyes. {Partner} cums inside her: a cross-section shows {his} cum filling her womb, and it overflows from her vagina and runs down her thighs while the stars glitter outside. ${TAIL}, against glass, breasts on glass, sex from behind, cum in pussy, cum overflow, night sky`},
serpent:{act:"anal, sex from behind, doggystyle, hair pulling, spanking, ass grab, anal creampie",ex:EX.a,pc:"dominant, knowing smirk",
  items:{legwear:["garter-strap stockings with lace tops","@secondary"],neckAccessory:["velvet choker","@third"]},where:"her emerald-silk bedchamber",what:"anal, with her hair pulled and her pride broken",
  scene:`The image is split into two scenes. In the first scene, the woman lies on her stomach on a bed of black and emerald silk in a candlelit chamber, looking back over her shoulder with a haughty scowl, and sneers "Hmph. As if you could ever make me beg." {Partner} grips her hair and spanks her plump ass, leaving a red handprint. In the second scene, {partner} fucks her ass doggystyle, pulling her head back by her hair with one hand and spanking her with the other. {His} veiny {cock} is buried to the hilt in her anus, pounding her relentlessly, with motion lines and impact stars. Her pride is broken: she makes an ahegao face with her mouth open, tongue lolling out and eyes crossed and rolling up, drooling, and screams "I'M SORRY! I'LL BE GOOD! CUM IN MY ASS!" with heart eyes. {Partner} cums deep in her ass: a cross-section shows thick cum flooding her, and it overflows from her gaping anus down her thighs. Explosive lewd sound effects. ${TAIL}, anal, anal creampie, hair pulling, spanking, handprint on ass, cum in ass, cum overflow`},
wolf:{act:"sex, vaginal, doggystyle, sex from behind, all fours, neck biting, hair grab, rough sex, creampie",ex:EX.b,pc:"feral, hungry grin",
  items:{neckAccessory:["leather collar with a ring","@extra"]},where:"a log cabin under the full moon",what:"rough doggystyle on a fur rug",
  scene:`The image is split into two scenes. In the first scene, the woman crouches on all fours on a fur rug before a roaring fire in a log cabin, the full moon in the window, smirking back at {partner} and growling "Come on, show me you can keep up." In the second scene, {partner} mounts her from behind and fucks her doggystyle like an animal, one hand fisted in her short hair and {his} teeth sinking into the back of her neck. {His} thick, veiny {cock} is buried to the hilt in her vagina, slamming into her hard and fast, with motion lines and action lines. Her smirk is gone: she makes an ahegao face with her tongue out and eyes rolling up, drooling and panting, and howls "HARDER! BREED ME!" with heart eyes. {Partner} cums inside her: a cross-section shows {his} cum flooding her womb, and cum overflows from her vagina and drips onto the fur rug. Wild, lewd sound effects. ${TAIL}, doggystyle, all fours, neck biting, hair grab, rough sex, cum in pussy, cum overflow, full moon`},
swan:{act:"sex, vaginal, missionary, breast grab, leg lock, creampie, impregnation",ex:EX.a,pc:"warm, adoring gaze",
  items:{thighAccessory:["lace thigh garter","@primary"]},where:"her moonlit bedroom",what:"missionary, impregnation and a womb cross-section",
  scene:`The image is split into two scenes. In the first scene, the woman and {partner} are in her bedroom at night, with moonlight lighting the room. The woman lies on her back on her bed with her arms reaching out towards {partner} lovingly, inviting {him} to her bed. She wears silk pajamas that are open and falling off her shoulders, with lacy underwear underneath. She says "Come fuck me raw" with love and hearts, blushing and making a expression. In the second scene, {partner} fucks the woman missionary style with {his} hands on her breasts. {Partner}'s impressive veiny {cock} is buried to the hilt in her vagina, fucking her relentlessly, with motion lines and action lines showing how hard {he} fucks her. The woman makes an ahegao expression with her mouth open, tongue out and eyes crossed and rolling upwards, moaning and drooling, and says "CUM INSIDE ME!" with crazy heart eyes. {Partner} impregnates her passionately, showing full penetration and the cum shot that fertilizes her womb, with a cross-section of her womb being fertilized by {his} cum. Explosive lewd sounds come from {his} {cock} as {he} cums, and equally lewd noises come from the woman as she is filled. She thinks in a squiggly pink thought bubble "I WANT TO GET FILLED UP!!". {Partner} says in veiny bold black letters "GET PREGNANT GET PREGNANT GET PREGNANT!" in the bottom right of the scene. ${TAIL}, missionary, impregnation, ovum, sperm cell, cum in pussy, thought bubble`},
dragon:{act:"sex, vaginal, cowgirl position, girl on top, hands on another's hips, stomach bulge, creampie",ex:EX.c,pc:"gritted-teeth grimace of pleasure",
  items:{legwear:["fishnet stockings","@extra"]},where:"a torchlit treasure hoard",what:"cowgirl on a bed of gold until she begs to be bred",
  scene:`The image is split into two scenes. In the first scene, the woman sits astride {partner} on a bed of crimson silk heaped with gold coins in a torchlit treasure chamber, pinning {his} chest with one hand and glaring down fiercely: "Is that all you've got?" In the second scene, she rides {him} cowgirl style while {partner} grips her hips and slams up into her from below, her large breasts bouncing. {His} huge, veiny {cock} is buried to the hilt in her vagina, with motion lines and impact lines, her stomach bulging with each thrust. Her fierce glare melts into an ahegao face with her tongue out and eyes crossed and rolling up, drooling, as she screams "MORE! BREED ME! MAKE ME YOURS!" with heart eyes. {Partner} cums inside her: a cross-section shows {his} thick cum flooding her womb, and cum gushes out around {his} {cock} onto the gold coins. Explosive lewd sound effects. ${TAIL}, cowgirl position, girl on top, bouncing breasts, stomach bulge, cum in pussy, cum overflow, gold coin`},
stag:{act:"sex, vaginal, lotus position, sitting on lap, embrace, kiss, creampie",ex:EX.b,pc:"warm, adoring gaze",
  items:{headwear:["flower crown","@third"]},where:"an enchanted forest glade",what:"the lotus position among fireflies",
  scene:`The image is split into two scenes. In the first scene, the woman lies on a bed of soft moss and wildflowers in an enchanted forest glade at night, fireflies glowing around her, and holds out her arms to {partner} with a dreamy, loving smile, whispering "Stay with me... all night" with floating hearts. In the second scene, she sits in {partner}'s lap in the lotus position, her long legs wrapped around {his} waist and her arms around {his} neck, kissing {him} deeply as {he} lifts her hips and thrusts up into her. {His} thick {cock} is buried to the hilt in her vagina, with gentle motion lines. She breaks the kiss with an ahegao face, tongue out and eyes rolling up, drooling and moaning "Cum inside... I want all of it!" with heart eyes. {Partner} cums deep inside her: a cross-section shows {his} cum filling her womb, and it overflows from her vagina onto the moss. Soft lewd sound effects drift among the fireflies. ${TAIL}, lotus position, sitting on lap, embrace, kiss, cum in pussy, cum overflow, fireflies`},
shark:{act:"irrumatio, deepthroat, fellatio, hair grab, twintails, throat bulge, cum in mouth",ex:EX.gag,pc:"lustful, half-lidded stare",
  items:{legwear:["fishnet thigh-high stockings","@extra"]},where:"a moonlit beach",what:"a rough deepthroat by her twin ponytails",
  scene:`The image is split into two scenes. In the first scene, the woman kneels on wet sand on a moonlit beach with waves rolling in behind her, sticking her tongue out with a teasing pout in front of {partner}'s hard {cock}, and says "Bet you can't make me gag~" with a heart. In the second scene, {partner} grabs both of her twin ponytails like handlebars and fucks her throat. {His} huge, veiny {cock} is buried to the hilt down her throat in a deepthroat, her nose pressed against {his} groin and her throat bulging, with motion lines. Her eyes roll up and cross as drool and spit run down her chin and she gags. {Partner} cums down her throat: thick white cum overflows from her mouth and drips down her chin onto her breasts, and an x-ray cross-section shows {his} {cock} deep in her throat pumping cum. She thinks in a pink squiggly thought bubble "I LOST... SO GOOD!!". Lewd gagging sound effects. 2koma, irrumatio, deepthroat, fellatio, hair grab, twintails, throat bulge, cum in mouth, cum on breasts, cum overflow, x-ray, cross-section, drooling, rolling eyes, motion lines, speech bubble, thought bubble, sweat, beach, night`},
penguin:{act:"sex, vaginal, mating press, legs up, deep penetration, creampie, impregnation",ex:EX.a,pc:"gritted-teeth grimace of pleasure",
  items:{legwear:["sheer stockings","@primary"]},where:"a snowed-in ski lodge",what:"a mating press under the furs by the fire",
  scene:`The image is split into two scenes. In the first scene, the woman snuggles under a thick fur blanket in front of a crackling fireplace in a snowed-in ski lodge, snow falling outside the window, and peeks out with a bright, eager smile, saying "It's cold... warm me up from the inside!" with hearts. In the second scene, {partner} pins her petite body in a mating press, her legs folded back to her shoulders with her ankles in the air and {his} weight driving down into her. {His} huge, veiny {cock} is buried to the hilt in her vagina, pounding straight down relentlessly, with motion lines and impact lines, her large breasts squeezed between her thighs. She makes an ahegao face with her tongue out and eyes crossed and rolling up, drooling, and cries "I'M GONNA GET PREGNANT!" with heart eyes. {Partner} cums deep inside her: a cross-section shows {his} cum flooding her womb and fertilizing an egg, and cum overflows from her vagina onto the fur. {Partner} says in bold letters "TAKE IT ALL!". Explosive lewd sound effects. ${TAIL}, mating press, legs up, impregnation, ovum, sperm cell, cum in pussy, cum overflow, fireplace, snow`},
fox:{act:"sex, vaginal, reverse cowgirl position, girl on top, ass grab, creampie",ex:EX.c,pc:"gritted-teeth grimace of pleasure",
  items:{legwear:["lace-top stockings","@secondary"]},where:"a lantern-lit tatami room",what:"reverse cowgirl until she loses the bet",
  scene:`The image is split into two scenes. In the first scene, the woman sits on {partner}'s lap on a futon in a lantern-lit tatami room, glancing back over her shoulder with a sly, fox-like smirk as she grinds her ass against {him}, teasing "Bet you can't last a minute~" with a wink. In the second scene, she rides {him} in reverse cowgirl, facing away, while {partner} grips her hips and thrusts up into her. {His} thick, veiny {cock} is buried to the hilt in her vagina, with motion lines, her hips and breasts bouncing. Her sly smirk collapses into an ahegao face with her tongue out and eyes crossed and rolling up, drooling, as she wails "I LOST! I LOST! CUM IN ME!" with heart eyes. {Partner} cums inside her: a cross-section shows {his} cum flooding her womb, and cum gushes out around {his} {cock}. Paper lanterns glow and lewd sound effects fill the room. ${TAIL}, reverse cowgirl position, girl on top, ass grab, cum in pussy, cum overflow, paper lantern, tatami`},
lovebird:{act:"sex, vaginal, cowgirl position, girl on top, interlocked fingers, kiss, creampie",ex:EX.b,pc:"warm, adoring gaze",
  items:{headwear:["ribbon bows tied at the twintails","@accent"],legwear:["thigh-high socks with bows","@secondary"]},where:"a cozy bedroom strung with fairy lights and plushies",what:"bouncing on him and kissing him like a lovebird",
  scene:`The image is split into two scenes. In the first scene, the woman sits in {partner}'s lap on a bed piled with pastel plushies under strings of fairy lights, peppering {his} face with little kisses, blush stickers on her cheeks, and chirps "Kiss, kiss, kiss~ I can't stop♡" with floating hearts. In the second scene, she rides {him} in the cowgirl position with both hands laced in {his}, bouncing happily with her twintails flying and leaning down to kiss {him} between bounces. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, her breasts bouncing. Her bubbly grin melts into an ahegao with her tongue out and heart-shaped pupils, drooling, and she squeals "SO GOOD! FILL ME UP♡" with heart eyes. {Partner} cums inside her: a cross-section shows {his} cum flooding her womb, and cum overflows from her vagina onto the sheets. Cute, lewd sound effects. ${TAIL}, cowgirl position, girl on top, interlocked fingers, kiss, bouncing breasts, twintails, stuffed toy, fairy lights, cum in pussy, cum overflow`},
flamingo:{act:"sex, vaginal, suspended congress, standing sex, carrying, leg lock, ass grab, creampie",ex:EX.c,pc:"warm, adoring gaze",
  items:{},where:"a tropical lagoon at a pink sunset",what:"held up in suspended congress in the shallows",
  scene:`The image is split into two scenes. In the first scene, the woman stands on one leg in the shallow water of a tropical lagoon at a pink sunset, palm trees behind her, and wraps her other leg around {partner}'s hip with a serene, inviting smile, saying "Hold me up... don't let go" with a heart. In the second scene, {partner} lifts her off her feet and fucks her standing in suspended congress, her long legs locked around {his} waist, her arms around {his} neck and {his} hands gripping her ass. {His} thick, veiny {cock} is buried to the hilt in her vagina, bouncing her on it, with motion lines and splashing water, her huge breasts pressed against {his} chest. Her serene look melts into an ahegao face with her tongue out and eyes crossed and rolling up, drooling, and she cries "DEEPER! CUM INSIDE!" with heart eyes. {Partner} cums inside her: a cross-section shows {his} cum flooding her womb, and cum drips from her vagina into the water. Lewd splashing sound effects. ${TAIL}, suspended congress, standing sex, carrying, leg lock, ass grab, cum in pussy, cum overflow, sunset, water`},
kraken:{act:"sex, vaginal, missionary, leg lock, arms around neck, deep penetration, creampie",ex:EX.b,pc:"hungry, possessive stare",
  items:{legwear:["garter-strap stockings with lace tops","@primary"]},where:"a captain's cabin in a storm",what:"wrapped around him like a kraken, never letting go",
  scene:`The image is split into two scenes. In the first scene, the woman lounges in the captain's bunk of a ship's cabin at night, a storm lashing the porthole and a brass lantern swinging overhead, wearing only {partner}'s long coat hanging open over her heavy breasts, and holds out one hand to {him} with a shy, breathless smile, whispering "Come here, Captain... once I wrap around you, I'm never letting go♡" with a heart. In the second scene, {partner} is on top of her in the bunk and she has wrapped herself around {him} completely, her legs locked around {his} waist and her arms around {his} neck, her long hair fanned across the pillow. {His} thick, veiny {cock} is buried to the hilt in her vagina, pounding deep as the ship rolls, with motion lines, her heavy breasts crushed against {his} chest. A cross-section shows {his} {cock} reaching her womb. She makes an ahegao face with her tongue out and her eyes rolling up, drooling, and moans "DON'T PULL OUT... DEEPER♡" with heart eyes. {Partner} cums deep inside her, cum flooding her womb and overflowing from her vagina onto the sheets, as {he} growls "You're mine" in bold letters. Explosive lewd sound effects. ${TAIL}, leg lock, arms around neck, missionary, deep penetration, cum in pussy, cum overflow, ship, cabin, storm, lantern, porthole`},
salmon:{act:"sex, vaginal, sex from behind, standing sex, bent over, deep penetration, creampie",ex:EX.c,pc:"hungry, possessive stare",
  items:{},where:"a waterfall pool in a cedar forest",what:"caught under the falls, against the current",
  scene:`The image is split into two scenes. In the first scene, the woman stands waist-deep in a misty waterfall pool deep in a cedar forest at dawn, salmon leaping up the falls behind her, water streaming down her freckled shoulders and her long salmon hair clinging to her back, and she looks back at {partner} on the bank with a poised, self-assured smile, saying "Catch me if you can♡" with a heart. In the second scene, {partner} has caught her under the falls: she braces both hands against a mossy rock, bent forward, as {he} takes her from behind with the waterfall crashing over them both. {His} thick, veiny {cock} is buried to the hilt in her vagina, slamming into her with motion lines and splashing water, her heavy breasts swaying. A cross-section shows {his} {cock} pressed against her womb. Her poise is gone: she makes an ahegao face with her tongue out and her eyes rolling up, drooling, and moans "AGAINST THE CURRENT... DEEPER♡" with heart eyes. {Partner} cums deep inside her, cum overflowing from her vagina into the churning water. Lewd splashing sound effects. ${TAIL}, waterfall, forest, cedar, river, fish, salmon, wet, wet hair, sex from behind, standing sex, bent over, against rock, looking back, cum in pussy, cum overflow, water`},
crow:{act:"sex, vaginal, missionary, on table, leg lock, deep penetration, creampie",ex:EX.b,pc:"warm, adoring gaze",
  items:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},where:"a clock-tower workshop at midnight",what:"on his workbench until the last bell",
  scene:`The image is split into two scenes. In the first scene, in {partner}'s clock-tower workshop at midnight, the great glowing clock face turning behind the window, the woman perches on the workbench among scattered gears and open pocket watches wearing only her opal pendant, and holds out a small shiny brass key to {him} in both hands with a bright, curious little smile, saying "I found something shiny for you♡" with a heart. In the second scene, she lies back on the workbench with gears and tiny springs scattering, her legs locked around {his} waist and her arms around {his} neck, as {partner} fucks her deep and slow and the clock begins to strike midnight. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines in time with the bells, her heavy breasts bouncing. A cross-section shows {his} {cock} reaching her womb. She makes an ahegao face with her tongue out and her eyes rolling up, drooling, and moans "Don't stop until the last bell♡" with heart eyes, as "DONG" sound effects ring out and {partner} cums inside her, cum overflowing from her vagina onto the bench. ${TAIL}, clock, clock tower, gears, workbench, on table, night, moonlight, missionary, leg lock, arms around neck, key, pendant, cum in pussy, cum overflow, sound effects`}
  };
  /* character 1's scene settings, also applied when another woman is picked as character 1 in the Scene tab */
  /* v139: the girls keep their own makeup and are marked with cum and fluids */
  const C1={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  START.add("Academy Intimacy",ACAD.HOUSES.map(h=>{const x=SC[h],m=h+"man",mt=tplById(m);
    return{id:h+"intimacy",base:ACAD.robes(h),name:cap(h)+" intimacy",
      c:{age:"woman",expression:x.ex,posture:POSE[h],bodyMarkings:h==="shark"?"thick white cum pools on the breasts and drips down the chest":"thick white cum and glistening fluids drip down her inner thighs",pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
        nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"},
      outfit:{oname:"In the act",look:"boudoir",items:x.items,details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:nudeAt(m),scene:x.scene,act:x.act,dir:"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1:Object.assign({},C1,{expression:x.ex,posture:POSE[h],bodyMarkings:h==="shark"?"thick white cum pools on the breasts and drips down the chest":"thick white cum and glistening fluids drip down her inner thighs"}),compact:false,fit:true}},
      tags:["intimacy","sex","explicit","pair",h],
      blurb:`${cap(h)} and her boyfriend in ${x.where}: ${x.what}. Opens in the Scene tab with the ${mt?mt.name:cap(h)+" boyfriend"} as character 2; pick any other partner and the scene follows.`};
  }),{after:"Academy Men"});
})();

/* ---- v133-v135 (v151: Salmon and Crow): "Academy Sweethearts" and "Academy Depraved", one scene per girl (13 each, in house order).
   v135: scene outfits are written in tones (@c1 @c2 @c3 @dark @light @metal @hair, see the Pair code) so they
   take each wearer's own clothing colors, and the women's cuts are full date outfits with accessories.
   Each is one single scene for the Scene tab, opened with a girl and her Academy Men boyfriend, and written to swap:
   character 1 is "the woman"; character 2 is written with {partner} {lover} {his} {he} {him} {cock}, so any man
   or woman works (in Depraved scenes a woman partner becomes a futanari). Each scene dresses both characters
   (pair.w1 / pair.w2, cut for a woman or a man, in each character's own palette) and carries character 1's
   expression and pose (pair.c1) and character 2's expression (pair.pc), so switching either character in the
   Scene tab keeps the scene together. Depraved scenes are explicit and follow the safeguard like Intimacy. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","clinging to her partner's arm in front of a glowing tank","Couple scenes");
  START.option("posture","kneeling, squeezing her oiled breasts together around her lover","Explicit (adult)");
  const GC="Couple scenes",GX="Explicit (adult)";
  /* v151: Salmon and Crow */
  START.option("posture","sitting at a sushi counter, leaning in to take a bite",GC);START.option("posture","holding out a small shiny trinket in both hands",GC);
  START.option("posture","lying on a sushi counter with sashimi arranged on her body",GX);START.option("posture","bent over a jewel display case, wrists cuffed behind her back",GX);
  START.option("expression","aloof look failing to hide a blush",GC);START.option("expression","bright, curious little smile","Cute");
  START.item("wristAccessory","handcuffs locking her wrists behind her back","L","boudoir,edgy");START.item("maskAccessory","slim eye mask","CU","costume");
  START.item("top","crisp white chef's coat with {c2} piping","CU","casual");START.item("headwear","twisted {c} hachimaki headband","CU","casual,costume");
  /* ---------- shared items and options ---------- */
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t,fam));
  it("heldItem",["large clear umbrella","smartphone held up for a selfie","bowl of buttered popcorn","glass milk bottle half full of breast milk",
    "thick ribbed dildo","smartphone held up to record"],"CU","casual");
  it("legwear",["white ice skates","black ice skates"],"CU","casual,sporty");
  it("top",["yukata with a {c2} firework print and a wide obi"],"CU","costume");
  it("eyewear",["black silk blindfold over the eyes"],"LS","boudoir,edgy");
  it("neckAccessory",["shibari rope harness criss-crossing the chest and torso"],"L","boudoir,edgy");
  it("wristAccessory",["rope binding her wrists above her head","leather cuffs chained overhead"],"LS","boudoir,edgy");
  it("legwear",["ankle cuffs locked to a spreader bar"],"L","boudoir,edgy");
  it("thighAccessory",["pink vibrator taped to the inner thigh","garter strap stuffed with tied-off used condoms"],"L","boudoir");
  addMO("top",[["dark men's yukata with a slim {c2} obi","CU","costume"]]);
  addMO("waistAccessory",[["canvas work apron","C","casual,cottage"]]);
  ["gentle, loving smile","protective, tender look","serene, gentle smile"].forEach(v=>tagB("expression",[v]));
  const opt=(f,list,g)=>list.forEach(v=>START.option(f,v,g));
  opt("posture",["leaning into her partner under an umbrella","kneeling on a picnic blanket, holding out a strawberry","slow dancing, forehead to forehead",
    "wobbling on ice skates, clinging to both hands","riding piggyback, arms wrapped around her partner's neck","standing at a kitchen counter, holding up a whisk",
    "leaning in to kiss her partner's cheek, phone held up","lying across her partner's lap under a blanket","standing hand in hand, looking up at the sky",
    "being carried in a princess carry, arms crossed","sitting at a candlelit table, holding a red rose","posing in a photo booth, making heart hands",
    "lying on her partner's chest in a hammock"],GC);
  opt("expression",["pretend-annoyed pout with a hidden smile","shining-eyed, happy smile","sly kiss with a wink","aloof look failing to hide a blush"],GC);
  opt("posture",["crawling on all fours with her back arched","lying spread-eagle on her back, tied down","bending over a glass balcony railing",
    "kneeling with her tongue out, making double peace signs","kneeling on all fours with her breasts hanging heavy","lying back with her legs spread wide and held open",
    "hanging from chained wrists with her ankles spread wide","lying on her back with her head hanging off the edge of the bed",
    "riding on top while holding up a phone to film herself","lying folded on her back with her knees pressed up to her shoulders",
    "lying flat on her stomach on the forest floor","bending over the edge of a pool, hair pulled back","lying folded upside down in a piledriver, legs over her head"],GX);
  opt("expression",["desperate, begging ahegao with heart eyes and her tongue out","blindfolded, open-mouthed, drooling moan","smug, cum-drunk grin with her tongue out",
    "fucked-silly ahegao, eyes crossed, tongue out, drooling"],GX);
  opt("faceAccents",["thick white cum glazing her face, hair and tongue","cum and drool running down the chin and neck"],GX);
  opt("expression",["eyes rolled back, gagging expression with drool running down the chin"],GX);
  opt("bodyMarkings",["thick white cum and glistening fluids drip down her inner thighs","thick white cum is smeared over the breasts, stomach and thighs"],GX);
  opt("bodyMarkings",["body writing reads 'GOOD GIRL' across her stomach, with an arrow pointing down","tally marks in marker run down her thigh, with lewd body writing across her stomach",
    "red rope marks crisscross her skin"],GX);

  /* ---------- builder ---------- */
  const nudeAt=id=>{const t=tplById(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).findIndex(o=>o.oname==="Nude");return i<0?0:i};
  const AROUSE={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal"};
  function scene(key,h,name,x,adult){
    const m=h+"man",mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const res=items=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    /* v139: no smudged makeup or marks; explicit scenes mark her with cum and fluids unless the scene sets its own markings */
    const c1=Object.assign({},adult?AROUSE:{},adult?{bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"}:{},x.c1||{},{expression:x.ex,posture:x.pose});
    const w1={name:x.wname,look:x.look1||(adult?"boudoir":"casual"),f:x.w1};
    const w2={name:x.wname,look:x.look2||(adult?"boudoir":"casual"),m:x.w2m,f:x.w2f};
    const id=(adult?"depraved":"sweet")+key;
    return{id,base:ACAD.robes(h),name,
      c:Object.assign({},adult?{age:"woman"}:{},c1),
      outfit:{oname:x.wname,look:w1.look,items:res(x.w1),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:!!adult,lewdtag:!!adult,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:x.dir||(adult?"ba":"mutual"),couple:!adult,explicit:!!adult,penis:!!adult,
          pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:(adult?["depraved","explicit","sex"]:["sweethearts","cute","couple"]).concat(["pair",h]),
      blurb:`${x.blurb} Opens in the Scene tab with ${cap(h)} and the ${mt?mt.name:cap(h)+" boyfriend"}; switch either character and the scene, outfits and poses follow.`};
  }

  /* ---------- Academy Sweethearts ---------- */
  const SW=[
["umbrella","raven","Umbrella for two",{act:"shared umbrella, arm hug",ex:"blushing shy smile",pose:"leaning into her partner under an umbrella",pc:"protective, tender look",
  wname:"Rainy night",w1:{top:["fuzzy knit sweater","@secondary"],outerwear:["trench coat","@extra"],bottom:["pleated midi skirt","@primary"],legwear:["opaque tights","@extra"]},
  w2m:{top:["turtleneck sweater","@primary"],outerwear:["long wool overcoat","@secondary"],bottom:["slim tailored trousers","@extra"],legwear:["chelsea boots","@primary"],heldItem:["large clear umbrella","-"]},
  w2f:{top:["cable-knit sweater","@primary"],outerwear:["wool coat","@secondary"],bottom:["high-waisted jeans","@extra"],legwear:["over-the-knee leather boots","@primary"],heldItem:["large clear umbrella","-"]},
  blurb:"Sharing one clear umbrella on a neon-lit city street in the rain.",
  scene:`On a rainy night in the city, the woman and {lover} share one clear umbrella on a sidewalk glowing with neon reflections. {Partner} holds the umbrella tilted over her, letting {his} own shoulder get soaked, while she hugs {his} arm and rests her head against {his} shoulder with a soft, blushing smile. Raindrops sparkle in the lamplight, puddles mirror the pink and blue signs, and their breath fogs in the cool air. A tiny heart floats between them. shared umbrella, rain, night, city lights, neon, reflection, arm hug, leaning on person, romantic, wholesome, blush, smile`}],
["picnic","stag","Cherry blossom picnic",{act:"feeding",dir:"ab",ex:"radiant, head-tilted smile",pose:"kneeling on a picnic blanket, holding out a strawberry",pc:"warm, adoring gaze",
  wname:"Spring picnic",w1:{top:["floral sundress","@third"],headwear:["wide-brim sun hat","@third"],heldItem:["chocolate-dipped strawberry","-"]},
  w2m:{top:["linen button-up shirt","@third"],bottom:["chino trousers","@primary"],legwear:["low-top canvas sneakers","@third"]},
  w2f:{top:["linen shirt dress","@third"],legwear:["strappy flat sandals","@primary"]},
  blurb:"Feeding her boyfriend a strawberry on a picnic blanket under the cherry blossoms.",
  scene:`Under blooming cherry trees on a sunny spring afternoon, the woman and {lover} share a picnic on a checkered blanket, pink petals drifting down around them. She leans in with a playful smile and feeds {partner} a chocolate-dipped strawberry, holding it up to {his} lips, while {he} blushes and smiles back at her. A wicker basket, sandwiches and a thermos of tea sit beside them, and petals catch in their hair. picnic, cherry blossoms, falling petals, feeding, spring, sunlight, blanket, picnic basket, romantic, wholesome, smile, blush`}],
["dance","swan","Slow dance",{act:"slow dancing, forehead-to-forehead",ex:"happy closed-eye smile",pose:"slow dancing, forehead to forehead",pc:"gentle, loving smile",
  wname:"Evening in",look1:"glam",w1:{top:["wrap midi dress","@secondary"]},
  w2m:{top:["crisp collared button-up shirt","white"],bottom:["slim tailored trousers","@third"]},
  w2f:{top:["silk blouse","@secondary"],bottom:["knee-length pencil skirt","@third"]},
  blurb:"Slow dancing barefoot to a record under fairy lights.",
  scene:`In a softly lit living room strung with warm fairy lights, the woman and {lover} slow dance barefoot to a record spinning on an old turntable. Her arms rest around {his} neck and {his} hands hold her waist as they sway, foreheads touching, eyes closed, both smiling. Candles flicker on the windowsill, snow falls past the dark window, and little musical notes drift through the air around them. slow dance, dancing, forehead-to-forehead, hands on another's waist, arms around neck, barefoot, fairy lights, candlelight, record player, indoors, night, romantic, wholesome, closed eyes, smile`}],
["skating","penguin","Ice skating",{act:"holding hands, shared scarf",ex:"laughing expression",pose:"wobbling on ice skates, clinging to both hands",pc:"warm, adoring gaze",
  wname:"Skating date",w1:{top:["fuzzy knit sweater","@secondary"],bottom:["wool a-line skirt","@primary"],legwear:["white ice skates","white"],neckAccessory:["puffy scarf","@accent"],headwear:["fluffy earmuffs","@third"],gloves:["pastel knit mittens","@third"]},
  w2m:{top:["chunky roll-neck fisherman's sweater","@secondary"],bottom:["dark-wash jeans","navy blue"],legwear:["black ice skates","black"],neckAccessory:["knit scarf","@accent"],headwear:["slouchy knit beanie","@primary"]},
  w2f:{top:["cable-knit sweater","@secondary"],bottom:["high-waisted jeans","navy blue"],legwear:["white ice skates","white"],neckAccessory:["puffy scarf","@accent"],headwear:["knit earflap hat","@primary"]},
  blurb:"Wobbling on an outdoor rink at night while her boyfriend skates backward, holding both her hands.",
  scene:`At an outdoor ice rink at night, ringed with fairy lights and a tall decorated tree, the woman wobbles on her skates and clings to both of {lover}'s hands with a bright, laughing, slightly panicked smile. {Partner} skates backward in front of her, holding her hands and steadying her with a warm grin, one long scarf wrapped around both of their necks. Snowflakes drift down, their cheeks are pink from the cold, and their breath puffs in little clouds. ice skating, ice rink, holding hands, shared scarf, snow, winter, night, fairy lights, christmas tree, blush, laughing, romantic, wholesome`}],
["piggyback","shark","Sunset piggyback",{act:"piggyback, carrying",dir:"ba",ex:"laughing expression",pose:"riding piggyback, arms wrapped around her partner's neck",pc:"mischievous, toothy grin",
  wname:"Beach day",look1:"resort",look2:"resort",w1:{top:["triangle bikini top","@primary"],bottom:["side-tie bikini bottoms","@primary"]},
  w2m:{top:["open Hawaiian-print shirt","@secondary"],bottom:["swim trunks","@accent"]},
  w2f:{top:["bandeau bikini top","@secondary"],bottom:["high-waisted bikini bottoms","@secondary"]},
  blurb:"Riding piggyback through the surf at sunset, laughing.",
  scene:`On a golden beach at sunset, the woman rides piggyback on {lover}'s back, arms wrapped around {his} neck and legs hooked at {his} sides, laughing with her head thrown back. {Partner} grins over {his} shoulder at her, wading through the shallow surf as foamy waves wash around {his} ankles. The sky glows orange and pink, seagulls wheel overhead, and their long shadows stretch across the wet sand. piggyback, carrying, beach, sunset, ocean, waves, laughing, smile, summer, romantic, wholesome`}],
["baking","badger","Baking together",{act:"wiping face",dir:"ba",ex:"laughing expression",pose:"standing at a kitchen counter, holding up a whisk",pc:"gentle, loving smile",
  wname:"Baking day",look1:"cottage",look2:"cottage",w1:{top:["oversized cotton sweater","@secondary"],bottom:["high-waisted jeans","navy blue"],waistAccessory:["bib apron with deep pockets","@third"],heldItem:["whisk dripping with batter","-"]},
  w2m:{top:["fitted henley with the sleeves pushed up","@third"],bottom:["relaxed-fit jeans","navy blue"],waistAccessory:["canvas work apron","@primary"]},
  w2f:{top:["ribbed long-sleeve tee","@third"],bottom:["relaxed straight jeans","navy blue"],waistAccessory:["half apron tied at the waist","@primary"]},
  blurb:"Flour on her nose in a cozy kitchen, and her boyfriend wiping it off.",
  scene:`In a cozy, sunlit cottage kitchen, the woman and {lover} bake together at a flour-dusted counter covered in mixing bowls and cookie cutters. She has a smudge of flour on the tip of her nose and holds up a batter-covered whisk, laughing, while {partner} gently wipes the flour off her nose with {his} thumb, smiling at her. A tray of heart-shaped cookies cools beside a steaming teapot, and a little puff of flour hangs in the air. baking, cooking, kitchen, flour, flour on face, wiping face, apron, cookies, laughing, smile, indoors, romantic, wholesome`}],
["ferriswheel","fox","Ferris wheel selfie",{act:"kissing cheek",dir:"ab",ex:"sly kiss with a wink",pose:"leaning in to kiss her partner's cheek, phone held up",pc:"surprised expression",
  wname:"Day out",w1:{top:["cropped cardigan top","@primary"],bottom:["denim mini skirt","navy blue"],heldItem:["smartphone held up for a selfie","-"]},
  w2m:{top:["plain crew-neck tee","@third"],outerwear:["bomber jacket","@secondary"],bottom:["dark-wash jeans","navy blue"]},
  w2f:{top:["fitted tee","@third"],outerwear:["denim jacket","navy blue"],bottom:["high-waisted shorts","@secondary"]},
  blurb:"A sneaky cheek kiss for a selfie at the top of the Ferris wheel.",
  scene:`Inside a Ferris wheel gondola at the very top of the ride, with a sunset city spread out below, the woman holds up her phone for a selfie and kisses {lover} on the cheek with a sly, mischievous smile and a wink. {Partner} blushes bright red in surprise, eyes wide, caught completely off guard on the phone screen. Golden light pours through the windows, the gondola sways gently, and little hearts float around them. ferris wheel, kissing cheek, selfie, holding phone, sunset, cityscape, blush, surprised, wink, smile, romantic, wholesome`}],
["movienight","wolf","Movie night",{act:"lap pillow, hand in another's hair",dir:"ba",ex:"sleepy, cat-like contentment",pose:"lying across her partner's lap under a blanket",pc:"gentle, loving smile",
  wname:"Lounging",w1:{top:["oversized graphic sweatshirt","@primary"],bottom:["fleece lounge shorts","@secondary"],legwear:["slouchy socks","@third"],heldItem:["bowl of buttered popcorn","-"]},
  w2m:{top:["pullover hoodie","@secondary"],bottom:["sweatpants","@extra"]},
  w2f:{top:["cropped hoodie","@secondary"],bottom:["soft pajama pants with cuffed ankles","@extra"]},
  blurb:"Sprawled across her boyfriend's lap under a blanket, munching popcorn.",
  scene:`On a squashy couch in a dim living room lit only by the flickering glow of a TV, the woman lies sprawled across {lover}'s lap under a fluffy blanket, munching popcorn with a lazy, contented grin. {Partner} absentmindedly runs {his} fingers through her hair, smiling down at her instead of watching the movie. Snack wrappers, a second bowl of popcorn and two mugs crowd the coffee table, and rain patters on the window. movie night, couch, blanket, popcorn, lap pillow, hand in another's hair, television, cozy, night, indoors, smile, romantic, wholesome`}],
["fireworks","griffin","Fireworks festival",{act:"holding hands",ex:"shining-eyed, happy smile",pose:"standing hand in hand, looking up at the sky",pc:"warm, adoring gaze",
  wname:"Festival yukata",look1:"costume",look2:"costume",w1:{top:["yukata with a {c2} firework print and a wide obi","@secondary",null,"@accent"],heldItem:["small water bag with a goldfish","-"],legwear:["wooden geta sandals","@primary"]},
  w2m:{top:["dark men's yukata with a slim {c2} obi","@secondary",null,"@accent"],legwear:["tabi socks with geta sandals","white"]},
  w2f:{top:["yukata with a {c2} firework print and a wide obi","@secondary",null,"@accent"],legwear:["wooden geta sandals","@primary"]},
  blurb:"Hand in hand in yukata, watching fireworks over the festival stalls.",
  scene:`On a hillside on a summer festival night, the woman and {lover} stand hand in hand in yukata, watching huge fireworks bloom over the lantern-lit stalls below. She looks up at the sky with shining eyes and a shy, happy smile, holding a little bag with a goldfish, while {partner} watches her face instead of the fireworks, smiling softly. Paper lanterns glow, sparks reflect in her eyes, and colorful light washes over them both. summer festival, fireworks, yukata, holding hands, goldfish, paper lantern, night sky, looking up, blush, smile, romantic, wholesome`}],
["princesscarry","dragon","Princess carry",{act:"princess carry, carrying",dir:"ba",ex:"pretend-annoyed pout with a hidden smile",pose:"being carried in a princess carry, arms crossed",pc:"laughing expression",
  wname:"Autumn walk",w1:{top:["knit sweater dress","@secondary"],legwear:["opaque tights","@extra"]},
  w2m:{top:["tight black t-shirt","@extra"],outerwear:["worn leather jacket","@primary"],bottom:["dark-wash jeans","navy blue"],legwear:["leather ankle boots","@primary"]},
  w2f:{top:["fitted tee","@extra"],outerwear:["cropped leather jacket","@primary"],bottom:["ripped jeans","navy blue"],legwear:["over-the-knee leather boots","@primary"]},
  blurb:"Carried through the autumn leaves, pretending to be annoyed and failing.",
  scene:`In a park ablaze with autumn colors, {lover} carries the woman in a princess carry along a path of fallen red and gold leaves. She crosses her arms and pouts, pretending to be annoyed, but her cheeks are bright red and she is hiding a smile, one hand sneaking around {his} neck. {Partner} laughs, holding her securely against {his} chest, as leaves swirl around them in the warm afternoon light. princess carry, carrying, autumn, autumn leaves, falling leaves, park, pout, blush, tsundere, laughing, romantic, wholesome`}],
["dinner","serpent","Candlelit dinner",{act:"holding hands",ex:"aloof look failing to hide a blush",pose:"sitting at a candlelit table, holding a red rose",pc:"warm, adoring gaze",
  wname:"Dinner date",look1:"glam",look2:"glam",w1:{top:["slip dress","@third"],neckAccessory:["pearl choker","@extra"],heldItem:["long-stemmed red rose","-"]},
  w2m:{top:["crisp collared button-up shirt","white"],outerwear:["single-breasted suit jacket","@primary"],bottom:["tailored suit trousers","@primary"],neckAccessory:["slim necktie","@third"]},
  w2f:{top:["satin cowl-neck camisole","@third"],bottom:["satin mini skirt","@primary"]},
  blurb:"Trying to look unimpressed at a candlelit dinner, and blushing anyway when she's handed a red rose.",
  scene:`At a candlelit corner table in an elegant restaurant, the woman sits with her chin raised, trying to look unimpressed, but her cheeks flush pink as {lover} reaches across the table to take her hand and gives her a single red rose. {Partner} smiles warmly at her, and she glances away, hiding a small, embarrassed smile behind the rose. Wine glasses glint, candle flames flicker, and the city lights glow through the window behind them. candlelit dinner, restaurant, holding hands, rose, blush, embarrassed, looking away, tsundere, wine glass, candlelight, night, romantic, wholesome`}],
["photobooth","lovebird","Photo booth",{act:"heart hands duo, cheek-to-cheek",ex:"bubbly open-mouthed grin",pose:"posing in a photo booth, making heart hands",pc:"laughing expression",
  wname:"Night out",look1:"sweet",look2:"glam",w1:{top:["frilly puff-sleeve mini dress","@primary"],headwear:["ribbon bows tied at the twintails","@accent"]},
  w2m:{top:["fitted black shirt with the sleeves rolled up","@primary"],bottom:["slim tailored trousers","@primary"]},
  w2f:{top:["satin cowl-neck camisole","@secondary"],bottom:["satin mini skirt","@primary"]},
  blurb:"Cheek to cheek in a sticker photo booth, making one big heart with their hands.",
  scene:`Squeezed together inside a bright sticker photo booth, the woman and {lover} pose cheek to cheek, making one big heart with their hands. She beams at the camera with a bubbly open-mouthed grin and blush stickers on her cheeks while {partner} laughs and leans in close. Sparkly stickers and doodled hearts and stars frame the shot like a decorated print, the flash glows white, and a strip of finished photos hangs from the slot beside them. photo booth, purikura, heart hands duo, cheek-to-cheek, sticker, doodle, sparkle, camera flash, laughing, smile, romantic, wholesome`}],
["hammock","flamingo","Sunset hammock",{act:"lying on person, head on chest",dir:"ab",ex:"happy closed-eye smile",pose:"lying on her partner's chest in a hammock",pc:"serene, gentle smile",
  wname:"Island evening",look1:"resort",look2:"resort",w1:{top:["halter sundress","@primary"],headwear:["flower hair clip","@third"]},
  w2m:{top:["linen shirt unbuttoned to the chest","@secondary"],bottom:["loose drawstring linen trousers","@secondary"]},
  w2f:{top:["tiered cotton sundress","@secondary"],headwear:["flower hair clip","@third"]},
  blurb:"Swaying in a hammock between palm trees at a pink sunset, her head on his chest.",
  scene:`Between two palm trees on a quiet tropical beach at a pink sunset, the woman and {lover} share a woven hammock, swaying gently. She lies on {his} chest with her eyes closed and a peaceful smile, one hand resting over {his} heart, while {partner} holds her close with an arm around her waist and kisses the top of her head. The sky glows pink and gold, the sea shimmers, and hibiscus petals lie scattered on the sand. hammock, lying on person, head on chest, kissing head, palm tree, beach, sunset, tropical, closed eyes, smile, relaxing, romantic, wholesome`}],
["aquarium","kraken","Aquarium date",{act:"arm hug, pointing",ex:"shining-eyed, happy smile",pose:"clinging to her partner's arm in front of a glowing tank",pc:"warm, adoring gaze",
  wname:"Aquarium date",w1:{top:["off-shoulder knit top","@c2"],bottom:["high-waisted pleated mini skirt","@c1"],legwear:["sheer thigh-highs","black"],neckAccessory:["pearl choker","-"]},
  w2m:{top:["fitted black shirt with the sleeves rolled up","@dark"],bottom:["slim tailored trousers","@dark"],legwear:["chelsea boots","@dark"]},
  w2f:{top:["cable-knit sweater","@c1"],bottom:["high-waisted jeans","navy blue"],legwear:["over-the-knee leather boots","@dark"]},
  blurb:"An aquarium date in the blue glow of the giant octopus tank, hugging his arm and pointing out her 'cousin'.",
  scene:`In a dim aquarium hall glowing blue, the woman hugs {lover}'s arm with both of hers in front of a giant tank where a huge red octopus drifts past the glass, jellyfish glowing in the next tank. She leans her cheek on {his} shoulder and points at the octopus with a delighted, shining-eyed smile, saying "Look, it's waving at us♡" in a speech bubble, while {partner} looks down at her with a warm, adoring smile. Their reflections glow faintly in the glass. aquarium, octopus, jellyfish, fish tank, blue theme, arm hug, pointing, couple, blush, smile, speech bubble, romantic, wholesome, indoors`}],
["omakase","salmon","Omakase for one",{act:"feeding",dir:"ba",ex:"aloof look failing to hide a blush",pose:"sitting at a sushi counter, leaning in to take a bite",pc:"warm, adoring gaze",
  wname:"Sushi bar",w1:{top:["satin slip dress with a plunging cowl neckline and a high thigh slit","@c1"],earAccessory:["large hoop earrings","@metal"]},
  w2m:{top:["crisp white chef's coat with {c2} piping","white",null,"@c1"],headwear:["twisted {c} hachimaki headband","@dark"],bottom:["slim tailored trousers","@dark"]},
  w2f:{top:["cropped chef-style jacket","white"],headwear:["twisted {c} hachimaki headband","@dark"],bottom:["high-waisted jeans","navy blue"]},
  blurb:"After closing at his tiny sushi bar, hand-fed a salmon rose across the counter and trying very hard not to blush.",
  scene:`After closing time at a tiny sushi bar, warm lamplight glowing on the pale cypress counter and an indigo noren curtain hanging still in the doorway, the woman sits alone at the counter while {lover} stands behind it and leans across to hand-feed her a glistening piece of salmon nigiri shaped like a little rose. She leans in to take the bite with an aloof look that is failing completely to hide her blush, cheeks pink, while {partner} watches her with a warm, adoring smile. A tiny heart floats above the counter. sushi, sushi bar, counter, nigiri, salmon, feeding, chef, noren, lamplight, night, couple, blush, romantic, wholesome, indoors`}],
["shiny","crow","Something shiny",{act:"giving, gift",dir:"ab",ex:"bright, curious little smile",pose:"holding out a small shiny trinket in both hands",pc:"warm, adoring gaze",
  wname:"Autumn walk",w1:{top:["fuzzy knit sweater","@c1"],outerwear:["trench coat","@c2"],bottom:["pleated midi skirt","@dark"],legwear:["opaque tights","@dark"]},
  w2m:{top:["turtleneck sweater","@dark"],outerwear:["long wool overcoat","@c1"],neckAccessory:["knit scarf","@c2"],bottom:["slim tailored trousers","@dark"],legwear:["chelsea boots","@dark"]},
  w2f:{top:["cable-knit sweater","@c1"],outerwear:["wool coat","@dark"],bottom:["high-waisted jeans","navy blue"]},
  blurb:"On a park bench under the autumn trees, giving him the shiniest thing she found today, the way crows do for the ones they love.",
  scene:`On a park bench under golden autumn trees at dusk, a few crows watching curiously from the branches above, the woman turns to {lover} and holds out a small, perfectly polished silver key in both cupped hands like a treasure, with a bright, curious little smile and pink cheeks, saying "I found it for you... it's the shiniest one♡" in a speech bubble. {Partner} looks at the gift with a warm, adoring smile, a little tin of every trinket she has ever given {him} peeking out of {his} coat pocket. Falling leaves drift around them. park, bench, autumn, autumn leaves, falling leaves, crow, bird, key, giving, gift, holding object, couple, blush, smile, speech bubble, sunset, wholesome, outdoors`}]
  ];;

  /* ---------- Academy Depraved ---------- */
  const DP=[
["leash","wolf","Leashed pet",{act:"sex, vaginal, doggystyle, sex from behind, leash pull, collar, pet play, hair grab, creampie",ex:"desperate, begging ahegao with heart eyes and her tongue out",
  pose:"crawling on all fours with her back arched",pc:"dominant, knowing smirk",c1:{bodyMarkings:"body writing reads 'GOOD GIRL' across her stomach, with an arrow pointing down"},
  wname:"Pet",w1:{headwear:["floppy dog ear headband","@primary"],neckAccessory:["leather collar with a ring","@extra"],legwear:["fishnet thigh-high stockings","@extra"]},
  w2m:{heldItem:["leather leash","@extra"]},w2f:{heldItem:["leather leash","@extra"]},
  blurb:"Collared, leashed and crawling, fucked doggystyle with the leash pulled tight.",
  scene:`In a dim, luxurious penthouse at night, the woman crawls on all fours across a black rug wearing nothing but dog ears, a leather collar and fishnet stockings, a leash clipped to her collar. {Partner} kneels behind her and fucks her doggystyle, yanking the leash so her head jerks back and her back arches, {his} other hand gripping her hip. {His} thick, veiny {cock} is buried to the hilt in her vagina, slamming into her with motion lines and impact lines. Lewd body writing reads "GOOD GIRL" across her stomach with an arrow pointing down. She pants with her tongue lolling out, drooling, eyes rolled up in a desperate ahegao with heart-shaped pupils, and whimpers "Woof... use your pet♡" in a heart-filled speech bubble as cum overflows from her vagina and drips onto the rug. Lewd slapping sound effects. doggystyle, all fours, leash, leash pull, collar, dog ears, pet play, body writing, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["bound","serpent","Bound and overstimulated",{act:"sex, vaginal, missionary, bondage, shibari, spread eagle, blindfold, vibrator, multiple orgasms, squirting, creampie",ex:"blindfolded, open-mouthed, drooling moan",
  pose:"lying spread-eagle on her back, tied down",pc:"hungry, possessive stare",c1:{bodyMarkings:"red rope marks crisscross her skin"},
  wname:"Tied up",w1:{neckAccessory:["shibari rope harness criss-crossing the chest and torso","@third"],wristAccessory:["rope binding her wrists above her head","@third"],eyewear:["black silk blindfold over the eyes","@secondary"],thighAccessory:["pink vibrator taped to the inner thigh","hot pink"]},
  w2m:{heldItem:["wand massager","-"]},w2f:{heldItem:["wand massager","-"]},
  blurb:"Tied spread-eagle in shibari, blindfolded, with a vibrator and a wand on her while she's fucked through orgasm after orgasm.",
  scene:`In a candlelit bedroom draped in dark silk, the woman lies spread-eagle on the bed, her wrists tied above her head and her body bound in an intricate red shibari rope harness that squeezes her breasts, a black silk blindfold over her eyes and a pink vibrator taped buzzing against her clit. {Partner} kneels between her spread thighs and pounds into her, pressing a wand massager against her as {he} fucks her. {His} veiny {cock} is buried to the hilt in her vagina, with motion lines and vibration marks. She arches off the bed, mouth wide open in a drooling, tongue-out scream, squirting through orgasm after orgasm, and cries "Too much... don't stop!" in a trembling speech bubble. Cum overflows from her vagina onto the sheets. Buzzing and squelching sound effects. missionary, bondage, shibari, rope, bound wrists, spread eagle, blindfold, vibrator, sex toy, multiple orgasms, squirting, trembling, open mouth, tongue out, drooling, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["cream","lovebird","Cream-filled",{act:"sex, vaginal, missionary, spread legs, food play, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying on a bakery counter, decorated like a dessert",pc:"hungry, possessive stare",
  c1:{bodyMarkings:"thick white cum is smeared over the breasts, stomach and thighs"},
  wname:"Dessert",look1:"sweet",w1:{headwear:["ribbon bows tied at the twintails","@accent"],legwear:["thigh-high socks with bows","@secondary"]},
  w2m:{waistAccessory:["canvas work apron","@secondary"]},w2f:{waistAccessory:["frilled apron tied at the waist","@secondary"]},
  blurb:"Laid out on a bakery counter after closing like a creamsicle dessert, whipped cream and orange slices on her skin, filled with cream of a different kind.",
  scene:`On the marble counter of a pastel bakery after closing, the woman lies on her back with her legs spread like a dessert on display, her body decorated with swirls of whipped cream, orange slices and sprinkles, a cherry on each nipple, wearing only her ribbon bows and bow-trimmed socks. {Partner} fucks her hard between the cake stands, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, licking whipped cream off her breasts between thrusts. She makes a fucked-silly ahegao with her tongue out and heart-shaped pupils, drooling, and moans "Eat me up... then fill me with cream♡" in a speech bubble, as {he} cums inside her and cum mixes with the whipped cream dripping down her thighs. Sticky, lewd sound effects. missionary, spread legs, food play, whipped cream, cream on body, fruit, orange (fruit), sprinkles, cherry, bakery, counter, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["cumdrunk","fox","Cum-drunk",{act:"bukkake, facial, cum on tongue, cum on breasts, ejaculation",ex:"smug, cum-drunk grin with her tongue out",
  pose:"kneeling with her tongue out, making double peace signs",pc:"gritted-teeth grimace of pleasure",
  c1:{faceAccents:"thick white cum glazing her face, hair and tongue",bodyMarkings:"thick white cum is smeared over the breasts, stomach and thighs"},
  wname:"Glazed",w1:{legwear:["lace-top stockings","@secondary"],neckAccessory:["velvet choker","@third"]},
  w2m:{},w2f:{},
  blurb:"Kneeling with a double peace sign, glazed in cum and asking for more.",
  scene:`In a messy love-hotel room lit by pink neon, the woman kneels on the floor in only lace-top stockings and a velvet choker, her face, hair, tongue and breasts glazed with thick white cum. She sticks out her cum-covered tongue and flashes a double peace sign with a smug, cum-drunk grin and heart-shaped pupils, while {partner} stands over her, stroking {his} veiny {cock} and shooting another thick rope of cum across her face. Cum drips from her chin onto her breasts and pools on her thighs. She says "More♡ I'm not full yet~" in a heart-filled speech bubble. Sticky, splattering sound effects. bukkake, facial, cum on face, cum on tongue, cum in mouth, cum on breasts, cum on hair, excessive cum, double v, tongue out, kneeling, heart-shaped pupils, smug, ejaculation, love hotel, speech bubble, sweat`}],
["breeding","griffin","Breeding marathon",{act:"sex, vaginal, mating press, deep penetration, creampie, impregnation, cum inflation",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying folded on her back with her knees pressed up to her shoulders",pc:"gritted-teeth grimace of pleasure",
  c1:{bodyMarkings:"tally marks in marker run down her thigh, with lewd body writing across her stomach",vaginaType:"flushed, gaping, full of and overflowing with thick white cum, squirting"},
  wname:"All night",w1:{legwear:["thigh-high stockings","@secondary"]},w2m:{},w2f:{},
  blurb:"Dawn after a whole night of breeding: tally marks, a cum-swollen belly and one more load.",
  scene:`In a rumpled bedroom at dawn, the woman lies folded in a mating press beneath {partner}, her ankles pinned beside her head, after a whole night of breeding. Tally marks in marker run down her thigh beside the words "BREEDING IN PROGRESS", and her stomach is swollen and bulging with cum. {Partner}'s huge, veiny {cock} slams straight down to the hilt in her vagina with heavy impact lines as {he} pumps yet another load deep inside her. An x-ray cross-section shows her womb flooded and stretched with cum and an egg surrounded by sperm. She is completely fucked silly, eyes crossed and rolled up, tongue out, drooling, and moans "Again... make it stick♡" with heart eyes as cum gushes out around {his} {cock} onto the sheets. Explosive lewd sound effects. mating press, legs up, deep penetration, creampie, multiple creampies, cum inflation, stomach bulge, impregnation, cross-section, x-ray, ovum, sperm cell, body writing, tally, ahegao, tongue out, drooling, heart-shaped pupils, cum overflow, motion lines, speech bubble, sweat`}],
["milking","badger","Milking",{act:"sex, vaginal, doggystyle, sex from behind, lactation, milking, breast grab, creampie",ex:"desperate, begging ahegao with heart eyes and her tongue out",
  pose:"kneeling on all fours with her breasts hanging heavy",pc:"lustful, half-lidded stare",c1:{nippleType:"hard, flushed, and lactating with milk dripping from them"},
  wname:"Cow costume",w1:{headwear:["floppy cow ear headband","white"],neckAccessory:["collar with a large bell","@accent"],legwear:["cow-print thigh-high stockings","white"]},
  w2m:{heldItem:["glass milk bottle half full of breast milk","-"]},w2f:{heldItem:["glass milk bottle half full of breast milk","-"]},
  blurb:"Cow ears and a cowbell in a lantern-lit barn, milked into a bottle while she's fucked from behind.",
  scene:`In a straw-strewn barn lit by warm lantern light, the woman is on her hands and knees in floppy cow ears, a large cowbell collar and cow-print thigh-high stockings, her breasts hanging heavy and swaying. {Partner} fucks her from behind while milking her, squeezing one swollen nipple so that thick streams of breast milk spray into a glass bottle, milk already dripping from both nipples onto the straw. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, and her cowbell clangs with every thrust. She moos with a drooling, tongue-out ahegao and heart-shaped pupils, "Moo♡ milk me more!", as cum overflows from her vagina. Lewd sloshing and clanging sound effects. doggystyle, sex from behind, all fours, lactation, breast milk, milking, cow ears, cowbell, cow print, hanging breasts, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, barn, sweat`}],
["doublestuffed","dragon","Double stuffed",{act:"anal, double penetration, dildo, sex toy, spread legs, stomach bulge, anal creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying back with her legs spread wide and held open",pc:"feral, hungry grin",
  wname:"Stuffed",w1:{legwear:["fishnet stockings","@extra"]},w2m:{heldItem:["thick ribbed dildo","hot pink"]},w2f:{heldItem:["thick ribbed dildo","hot pink"]},
  blurb:"Both holes at once: anal and a thick dildo, with an x-ray of both.",
  scene:`On a crimson silk bed, the woman lies back with her legs spread wide and held open, stuffed in both holes at once. {Partner}'s veiny {cock} is buried to the hilt in her ass while {he} pumps a thick ribbed dildo in and out of her vagina with {his} other hand. An x-ray cross-section shows both holes stretched full, the {cock} and the toy grinding against each other through her, and her stomach bulges with every thrust. She claws at the sheets with her eyes crossed and rolled up, tongue out, drooling, screaming "BOTH... I'M BREAKING♡" with heart eyes, squirting as {partner} cums deep in her ass and cum overflows from her gaping anus. Wet, squelching sound effects. anal, double penetration, dildo, sex toy, spread legs, stomach bulge, cross-section, x-ray, anal creampie, squirting, ahegao, tongue out, drooling, heart-shaped pupils, cum overflow, motion lines, speech bubble, sweat`}],
["dungeon","flamingo","Dungeon",{act:"sex, vaginal, standing sex, bondage, chains, spreader bar, bdsm, creampie",ex:"desperate, begging ahegao with heart eyes and her tongue out",
  pose:"hanging from chained wrists with her ankles spread wide",pc:"dominant, knowing smirk",c1:{bodyMarkings:"thick white cum is smeared over the breasts, stomach and thighs"},
  wname:"Chained",look1:"edgy",w1:{wristAccessory:["leather cuffs chained overhead","@accent"],legwear:["ankle cuffs locked to a spreader bar","@accent"],neckAccessory:["leather collar with a ring","@accent"]},
  w2m:{heldItem:["riding crop","@accent"]},w2f:{heldItem:["riding crop","@accent"]},
  blurb:"Chained by the wrists in a torchlit dungeon, ankles on a spreader bar, fucked standing with a riding crop in hand.",
  scene:`In a stone dungeon lit by flickering torches, the woman hangs from leather cuffs chained above her head, her ankles locked to a wide spreader bar that holds her legs apart, her skin glistening with sweat. {Partner} lifts one of her thighs and fucks her standing, a riding crop in {his} hand. {His} thick, veiny {cock} is buried to the hilt in her vagina, thrusting up into her with motion lines, her breasts bouncing as the chains rattle. She moans with her tongue out and eyes rolled up, drooling, begging "Harder, Master♡" in a heart-filled speech bubble, as cum overflows from her vagina and drips down the spreader bar. Clanking chain and slapping sound effects. standing sex, bondage, bdsm, chains, cuffs, arms up, spreader bar, riding crop, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, dungeon, torch, sweat`}],
["throat","raven","Upside-down throat",{act:"irrumatio, deepthroat, upside-down, throat bulge, breast grab, cum in mouth",ex:"eyes rolled back, gagging expression with drool running down the chin",
  pose:"lying on her back with her head hanging off the edge of the bed",pc:"lustful, half-lidded stare",c1:{faceAccents:"cum and drool running down the chin and neck",bodyMarkings:"thick white cum pools on the breasts and drips down the chest"},
  wname:"Bare",w1:{legwear:["sheer thigh-highs","@extra"]},w2m:{},w2f:{},
  blurb:"Head hanging off the bed, her throat fucked upside down until cum overflows.",
  scene:`In a moonlit bedroom, the woman lies on her back across the bed with her head hanging off the edge, upside down, as {partner} stands over her and fucks her throat. {His} huge, veiny {cock} is buried to the hilt down her throat, her neck visibly bulging with every thrust, while {he} gropes and squeezes her breasts. Her eyes are rolled back, drool and spit running up over her face and into her hair. {Partner} cums straight down her throat and thick white cum overflows from her mouth, running down her face. An x-ray cross-section shows {his} {cock} deep in her throat. She thinks in a pink squiggly thought bubble "SO DEEP... SO GOOD♡". Wet, gagging sound effects. irrumatio, deepthroat, upside-down, head hanging off bed, throat bulge, breast grab, cum in mouth, cum overflow, x-ray, cross-section, drooling, rolling eyes, motion lines, thought bubble, sweat`}],
["filming","swan","Filming it",{act:"sex, vaginal, cowgirl position, girl on top, recording, double v, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"riding on top while holding up a phone to film herself",pc:"gritted-teeth grimace of pleasure",c1:{bodyMarkings:"tally marks in marker run down her thigh, with lewd body writing across her stomach"},
  wname:"On camera",w1:{heldItem:["smartphone held up to record","-"],thighAccessory:["garter strap stuffed with tied-off used condoms","@primary"]},w2m:{},w2f:{},
  blurb:"Riding on a love-hotel bed, filming herself with a double peace sign and a garter full of used condoms.",
  scene:`In a pink-lit love hotel room, the woman rides {partner} cowgirl style on a round bed, holding up her phone to film herself with one hand and flashing a double peace sign with the other. A garter on her thigh is stuffed with tied-off used condoms, more used condoms are strewn across the sheets, and tally marks cover her stomach. {His} thick, veiny {cock} is buried to the hilt in her vagina as {he} grips her hips and thrusts up into her, with motion lines. She stares into the camera with a ruined ahegao, tongue out, eyes rolled up, drooling, and says "Look how good I'm being bred♡" in a heart-filled speech bubble as cum overflows around {his} {cock}. The phone screen shows a red REC dot. Lewd sound effects. cowgirl position, girl on top, recording, holding phone, double v, used condom, condom on thigh, body writing, tally, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, love hotel, sweat`}],
["forest","stag","Wild in the woods",{act:"sex, vaginal, prone bone, sex from behind, lying on stomach, outdoor sex, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying flat on her stomach on the forest floor",pc:"feral, hungry grin",c1:{skinFinish:"wet skin with water droplets"},
  wname:"Wild",look1:"cottage",w1:{headwear:["flower crown","@third"]},w2m:{},w2f:{},
  blurb:"Pressed flat into the moss of a rainy forest glade and fucked prone bone like an animal.",
  scene:`In a rain-soaked forest glade, the woman lies flat on her stomach on the moss and fallen flower petals, her flower crown askew, as {partner} lies on top of her and fucks her prone bone, pressing her hips down into the wet moss. {His} thick, veiny {cock} is buried to the hilt in her vagina from behind, pounding down into her with motion lines, mud and petals smeared across her thighs, rain streaming over their bodies. She turns her face to the side with her tongue out and eyes rolled up, drooling into the moss, and moans "Deeper... like animals♡" in a heart-filled speech bubble as cum overflows from her vagina and runs down her thighs. Wet, slapping sound effects. prone bone, sex from behind, lying on stomach, outdoor sex, forest, rain, wet, mud, moss, petals, flower crown, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["pool","shark","Poolside brat",{act:"sex, vaginal, sex from behind, standing sex, hair pulling, bent over, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"bending over the edge of a pool, hair pulled back",pc:"dominant, knowing smirk",c1:{skinFinish:"wet skin with water droplets"},
  wname:"Skinny dip",look1:"resort",w1:{},w2m:{},w2f:{},
  blurb:"A bratty skinny dip that ends bent over the pool edge, her hair pulled like handlebars.",
  scene:`At the edge of a moonlit swimming pool at night, the woman is bent over the wet tiles with her lower body in the water, her hair grabbed in both of {partner}'s fists like handlebars. {Partner} stands in the water behind her and fucks her hard, yanking her head back by her hair so her back arches and her breasts lift off the tiles. {His} thick, veiny {cock} is buried to the hilt in her vagina, with motion lines and splashing water. The bratty grin she started with is gone: her eyes are rolled up, her tongue hangs out, she drools onto the tiles and gasps "Okay, okay, you win♡" in a heart-filled speech bubble as cum overflows from her vagina into the pool. Splashing, slapping sound effects. sex from behind, standing sex, hair pulling, hair grab, bent over, pool, poolside, partially submerged, wet, night, ahegao, tongue out, drooling, heart-shaped pupils, cum in pussy, cum overflow, motion lines, speech bubble`}],
["piledriver","penguin","Piledriver",{act:"sex, vaginal, piledriver, legs over head, upside-down, deep penetration, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying folded upside down in a piledriver, legs over her head",pc:"gritted-teeth grimace of pleasure",c1:{faceAccents:"cum and drool running down the chin and neck",bodyMarkings:"thick white cum pools on the breasts and drips down the chest"},
  wname:"By the fire",w1:{legwear:["sheer seamed thigh-high stockings","@primary"]},w2m:{},w2f:{},
  blurb:"Folded upside down in a piledriver by the lodge fire, with every load running down onto her.",
  scene:`On a thick fur rug in front of a crackling fireplace in a snowed-in ski lodge, the woman is folded completely upside down in a piledriver, her shoulders on the rug, her legs pinned back over her head and her breasts pressed toward her face. {Partner} squats over her and pounds straight down into her. {His} huge, veiny {cock} is buried to the hilt in her vagina with heavy impact lines as {he} cums again and again, and thick white cum overflows from her vagina and runs down her stomach onto her own breasts and face. Upside down, she grins dizzily with her tongue out to catch it, eyes rolled up, drooling, and squeals "It's all running down onto me♡" in a heart-filled speech bubble. Snow falls past the window. Explosive lewd sound effects. piledriver, legs over head, upside-down, deep penetration, creampie, cum overflow, cum on self, cum on breasts, cum on face, ahegao, tongue out, drooling, heart-shaped pupils, motion lines, speech bubble, fireplace, sweat`}],
["pearls","kraken","Pearl necklace",{act:"paizuri, breasts squeezed together, licking penis, cum on breasts, facial, ejaculation",ex:"smug, cum-drunk grin with her tongue out",
  pose:"kneeling, squeezing her oiled breasts together around her lover",pc:"gritted-teeth grimace of pleasure",
  c1:{skinFinish:"glistening oiled skin",bodyMarkings:"thick white cum pools on the breasts and drips down the chest",faceAccents:"thick white cum glazing her face, hair and tongue"},
  wname:"Pearls",w1:{neckAccessory:["pearl choker","-"],legwear:["garter-strap stockings with lace tops","black"]},w2m:{},w2f:{},
  blurb:"Oiled breasts wrapped around him on a velvet bed, a rope of pearls between them, until he gives her a pearl necklace of his own.",
  scene:`On a velvet bed by candlelight, the woman kneels between {partner}'s legs, her heavy breasts glistening with oil and a long rope of pearls draped between them, and squeezes them together around {his} {cock}, sliding up and down. {His} huge, veiny {cock} pokes out of her cleavage with motion lines as she licks the tip with a shy, breathless look. {Partner} groans and cums, spurting thick white cum over her breasts, neck and face, mixing with the pearls, and she licks her lips with a smug, cum-drunk grin and her tongue out, purring "Now THAT'S a pearl necklace♡" in a heart-filled speech bubble. Wet, sticky sound effects. paizuri, breasts squeezed together, large breasts, oiled, shiny skin, pearl necklace, cum on breasts, facial, cum on face, ejaculation, licking penis, tongue out, smug, heart-shaped pupils, motion lines, speech bubble, candlelight, sweat`}],
["omakase","salmon","Omakase",{act:"sex, vaginal, missionary, on table, food play, nyotaimori, creampie",ex:"fucked-silly ahegao, eyes crossed, tongue out, drooling",
  pose:"lying on a sushi counter with sashimi arranged on her body",pc:"hungry, possessive stare",
  wname:"Last course",w1:{headwear:["jeweled hair comb","@metal"]},w2m:{headwear:["twisted {c} hachimaki headband","@dark"]},w2f:{headwear:["twisted {c} hachimaki headband","@dark"]},
  blurb:"The last course after closing: laid out nyotaimori-style on his cypress counter under rose-petal salmon sashimi, then eaten up properly.",
  scene:`After closing at a high-end sushi bar, the woman lies naked on the long cypress counter as the evening's last course, nyotaimori style: rose-petal slices of salmon sashimi, shiso leaves and glistening orange roe arranged across her breasts, stomach and thighs, a jeweled comb in her hair. {Partner} plucks a slice of salmon off her breast with chopsticks and eats it, then climbs onto the counter between her spread legs and fucks her, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, sashimi sliding off her bouncing breasts. Her editorial poise melts into a fucked-silly ahegao with her tongue out and heart-shaped pupils, drooling, and she moans "Itadakimasu... eat me all up♡" in a heart-filled speech bubble, as {he} cums inside her and cum overflows onto the counter. Wet, lewd sound effects. nyotaimori, food on body, sashimi, sushi, counter, on table, chopsticks, missionary, spread legs, cum in pussy, cum overflow, ahegao, heart-shaped pupils, motion lines, speech bubble, sweat, indoors`}],
["thief","crow","Caught red-handed",{act:"sex, vaginal, sex from behind, bent over, handcuffs, roleplay, creampie",ex:"desperate, begging ahegao with heart eyes and her tongue out",
  pose:"bent over a jewel display case, wrists cuffed behind her back",pc:"dominant, knowing smirk",
  wname:"Phantom thief",w1:{maskAccessory:["slim eye mask","@dark"],wristAccessory:["handcuffs locking her wrists behind her back","silver"],legwear:["fishnet thigh-high stockings","@dark"]},
  w2m:{headwear:["peaked leather cap","@dark"]},w2f:{headwear:["peaked leather cap","@dark"]},
  blurb:"Their favorite game: the phantom thief caught red-handed in the jewel gallery, cuffed over the display case with the diamond still in her fingers.",
  scene:`In a museum jewel gallery at night, moonlight falling through the skylight and red alarm lights sweeping the walls, the woman is playing their favorite game: a phantom thief caught red-handed. She is bent over a glass jewel display case in nothing but her eye mask and fishnet stockings, her wrists handcuffed behind her back and a stolen diamond still clutched in her fingers, while {partner}, playing the detective who caught her, holds her cuffed wrists and fucks her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina, slamming into her with motion lines, her breasts squashed against the glass above the glittering jewels. She looks back with a desperate, begging ahegao, heart eyes and her tongue out, and moans "Okay, you caught me... confiscate everything♡" in a heart-filled speech bubble, as {he} cums inside her and cum drips down her thighs. Lewd sound effects. roleplay, thief, phantom thief, handcuffs, bound wrists, arms behind back, display case, jewelry, gem, diamond, museum, night, moonlight, sex from behind, bent over, looking back, cum in pussy, cum drip, motion lines, speech bubble, sweat`}]
  ];;

  /* ---------- scene outfits, in tones (w1 = character 1, w2m / w2f = character 2 as a man / a woman) ---------- */
  const WEAR={
    fireworks:{w1:{top:["yukata with a {c2} firework print and a wide obi","@c1",null,"@metal"],headwear:["flower hair clip","@c2"],legwear:["wooden geta sandals","@dark"],heldItem:["small water bag with a goldfish","-"]},
      w2m:{top:["dark men's yukata with a slim {c2} obi","@dark",null,"@c1"],legwear:["tabi socks with geta sandals","white"]},
      w2f:{top:["yukata with a {c2} firework print and a wide obi","@c1",null,"@metal"],headwear:["jeweled hair comb","@metal"],legwear:["wooden geta sandals","@dark"],heldItem:["round paper fan","@c2"]}},
    baking:{w1:{top:["oversized cotton sweater","@c1"],bottom:["high-waisted jeans","navy blue"],waistAccessory:["bib apron with deep pockets","@c2"],headwear:["scrunchie","@c2"],heldItem:["whisk dripping with batter","-"]},
      w2m:{top:["fitted henley with the sleeves pushed up","@c1"],bottom:["relaxed-fit jeans","navy blue"],waistAccessory:["canvas work apron","@dark"]},
      w2f:{top:["off-shoulder knit top","@c1"],bottom:["pleated midi skirt","@dark"],waistAccessory:["frilled apron tied at the waist","@light"],headwear:["ribbon hair bow","@c2"],earAccessory:["small pearl earrings","-"]}},
    umbrella:{w1:{top:["fuzzy knit sweater","@c1"],outerwear:["trench coat","beige"],bottom:["pleated midi skirt","@c2"],legwear:["opaque tights","@dark"],earAccessory:["small pearl earrings","-"]},
      w2m:{top:["turtleneck sweater","@c1"],outerwear:["long wool overcoat","@dark"],bottom:["slim tailored trousers","@dark"],legwear:["chelsea boots","@dark"],heldItem:["large clear umbrella","-"]},
      w2f:{top:["cable-knit sweater","@light"],outerwear:["double-breasted peacoat","@c1"],bottom:["wool a-line skirt","@dark"],legwear:["over-the-knee leather boots","@dark"],neckAccessory:["silk scarf tied loosely","@c2"],heldItem:["large clear umbrella","-"]}},
    dinner:{w1:{top:["slip dress","@c1"],neckAccessory:["pearl choker","-"],earAccessory:["pearl drop earrings","-"],heldItem:["long-stemmed red rose","-"]},
      w2m:{top:["crisp collared button-up shirt","@light"],outerwear:["single-breasted suit jacket","@dark"],bottom:["tailored suit trousers","@dark"],neckAccessory:["slim necktie","@c1"]},
      w2f:{top:["bodycon mini dress","@c1"],outerwear:["cropped blazer","@dark"],earAccessory:["delicate drop earrings","@metal"],neckAccessory:["delicate chain necklace","@metal"],hipAccessory:["mini clutch bag","@c2"]}},
    movienight:{w1:{top:["oversized graphic sweatshirt","@c1"],bottom:["fleece lounge shorts","@c2"],legwear:["slouchy socks","@light"],heldItem:["bowl of buttered popcorn","-"]},
      w2m:{top:["pullover hoodie","@c1"],bottom:["sweatpants","@dark"]},
      w2f:{top:["off-shoulder knit top","@c1"],bottom:["matching pajama shorts","@c2"],legwear:["fuzzy slipper socks","@light"],headwear:["scrunchie","@c3"]}},
    dance:{w1:{top:["wrap midi dress","@c1"],earAccessory:["pearl drop earrings","-"]},
      w2m:{top:["crisp collared button-up shirt","@light"],bottom:["slim tailored trousers","@dark"]},
      w2f:{top:["velvet slip dress","@c1"],neckAccessory:["delicate chain necklace","@metal"],earAccessory:["dangling crystal earrings","-"]}},
    princesscarry:{w1:{top:["knit sweater dress","@c1"],legwear:["opaque tights","@dark"],headwear:["beret","@c2"]},
      w2m:{top:["plain crew-neck tee","@light"],outerwear:["worn leather jacket","@dark"],bottom:["dark-wash jeans","navy blue"],legwear:["leather ankle boots","@dark"]},
      w2f:{top:["boat-neck striped knit top","@light"],outerwear:["long coat","@c1"],bottom:["high-waisted jeans","navy blue"],legwear:["over-the-knee leather boots","@dark"],neckAccessory:["floral scarf","@c2"]}},
    picnic:{w1:{top:["floral sundress","@c1"],headwear:["wide-brim sun hat","@light"],heldItem:["chocolate-dipped strawberry","-"]},
      w2m:{top:["linen button-up shirt","@light"],bottom:["chino trousers","@c1"],legwear:["low-top canvas sneakers","@light"]},
      w2f:{top:["puff-sleeve linen blouse","@light"],bottom:["flowy maxi skirt","@c1"],headwear:["ribbon hair bow","@c2"],legwear:["strappy flat sandals","@dark"],hipAccessory:["wicker basket bag","-"]}},
    piggyback:{w1:{top:["triangle bikini top","@c1"],bottom:["side-tie bikini bottoms","@c1"]},
      w2m:{top:["open Hawaiian-print shirt","@c2"],bottom:["swim trunks","@c1"]},
      w2f:{top:["bandeau bikini top","@c1"],bottom:["sarong-style swim bottoms","@c1"],earAccessory:["flower tucked behind one ear","@c2"]}},
    skating:{w1:{top:["fuzzy knit sweater","@c1"],bottom:["wool a-line skirt","@c2"],legwear:["white ice skates","white"],neckAccessory:["puffy scarf","@c3"],headwear:["fluffy earmuffs","@light"],gloves:["pastel knit mittens","@c3"]},
      w2m:{top:["turtleneck sweater","@dark"],outerwear:["shearling-lined jacket","@dark"],bottom:["slim-fit jeans","@dark"],legwear:["black ice skates","black"],neckAccessory:["knit scarf","@c1"]},
      w2f:{top:["cable-knit sweater","@light"],outerwear:["double-breasted peacoat","@c1"],bottom:["pleated midi skirt","@dark"],legwear:["white ice skates","white"],neckAccessory:["puffy scarf","@c2"],headwear:["beret","@c2"],gloves:["knit gloves","@c2"]}},
    ferriswheel:{w1:{top:["cropped cardigan top","@c1"],bottom:["denim mini skirt","navy blue"],heldItem:["smartphone held up for a selfie","-"]},
      w2m:{top:["plain crew-neck tee","@light"],outerwear:["bomber jacket","@c1"],bottom:["dark-wash jeans","navy blue"]},
      w2f:{top:["puff-sleeve blouse","@light"],bottom:["satin mini skirt","@c1"],hipAccessory:["mini shoulder bag","@c2"],earAccessory:["heart earrings","@metal"]}},
    photobooth:{w1:{top:["sequin mini dress","@c1"]},
      w2m:{top:["fitted black shirt with the sleeves rolled up","black"],bottom:["slim tailored trousers","@dark"]},
      w2f:{top:["off-shoulder silk blouse","@c1"],bottom:["leather mini skirt","@dark"],earAccessory:["chunky hoop earrings","@metal"],neckAccessory:["layered delicate necklaces","@metal"]}},
    hammock:{w1:{top:["halter sundress","@c1"],headwear:["flower hair clip","@c2"]},
      w2m:{top:["linen shirt unbuttoned to the chest","@light"],bottom:["loose drawstring linen trousers","@light"]},
      w2f:{top:["crochet beach dress","@light"],earAccessory:["flower tucked behind one ear","@c1"],wristAccessory:["woven flower bracelet","@c2"]}},
    leash:{w1:{headwear:["floppy dog ear headband","@hair"],neckAccessory:["leather collar with a ring","@dark"],legwear:["fishnet thigh-high stockings","@dark"]},w2m:{heldItem:["leather leash","@dark"]},w2f:{heldItem:["leather leash","@dark"]}},
    bound:{w1:{neckAccessory:["shibari rope harness criss-crossing the chest and torso","red"],wristAccessory:["rope binding her wrists above her head","red"],eyewear:["black silk blindfold over the eyes","black"],thighAccessory:["pink vibrator taped to the inner thigh","hot pink"]}},
    balcony:{w1:{legwear:["garter-strap stockings with lace tops","@dark"],neckAccessory:["pearl choker","-"]}},
    cumdrunk:{w1:{legwear:["lace-top stockings","@dark"],neckAccessory:["velvet choker","@c1"]}},
    breeding:{w1:{legwear:["thigh-high stockings","@dark"]}},
    milking:{w1:{headwear:["floppy cow ear headband","white"],neckAccessory:["collar with a large bell","@c1"],legwear:["cow-print thigh-high stockings","white"]}},
    doublestuffed:{w1:{legwear:["fishnet stockings","@dark"]}},
    dungeon:{w1:{wristAccessory:["leather cuffs chained overhead","black"],legwear:["ankle cuffs locked to a spreader bar","black"],neckAccessory:["leather collar with a ring","black"]},w2m:{heldItem:["riding crop","black"]},w2f:{heldItem:["riding crop","black"]}},
    throat:{w1:{legwear:["sheer thigh-highs","@dark"]}},
    filming:{w1:{heldItem:["smartphone held up to record","-"],thighAccessory:["garter strap stuffed with tied-off used condoms","@c1"]}},
    forest:{w1:{headwear:["flower crown","@c1"]}},
    piledriver:{w1:{legwear:["sheer seamed thigh-high stockings","@dark"]}}
  };
  SW.concat(DP).forEach(r=>{const o=WEAR[r[0]];if(o)Object.assign(r[3],o)});
  const ORD=h=>ACAD.HOUSES.indexOf(h),byHouse=(a,b)=>ORD(a[1])-ORD(b[1]);
  SW.sort(byHouse);DP.sort(byHouse);
  START.add("Academy Sweethearts",SW.map(([k,h,n,x])=>scene(k,h,n,x,false)),{after:"Academy Intimacy"});
  START.add("Academy Depraved",DP.map(([k,h,n,x])=>scene(k,h,n,x,true)),{after:"Academy Sweethearts"});
  /* catalog check for the scene outfits (the registry only checks character 1's own outfits) */
  const bad=[];
  SW.concat(DP).forEach(([k,h,n,x])=>[x.w1,x.w2m,x.w2f].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")})));
  SW.concat(DP).forEach(([k,h,n,x])=>[["expression",x.ex],["posture",x.pose],["expression",x.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")}));
  bad.forEach(m=>{START.problems.push("scene outfit: "+m);try{console.warn("[scenes] "+m)}catch(e){}});
})();

/* ---- v139 (v151: Salmon and Crow): "Academy Pure Love". One explicit single scene per girl (house order) with her own boyfriend:
   passionate, tender, vanilla love-making (eye contact, kissing, laced fingers, "I love you"), ending in a
   creampie. No degradation, no marks; she keeps her own makeup and is marked only with sweat, cum and fluids.
   Built like the other scene sets: swappable in the Scene tab ({lover} follows the partner; a woman partner is
   written as a futanari), matching couple rings on both, and held back by the safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","sitting in her lover's lap at the top of a lighthouse, wrapped around him","Explicit (adult)");
  const G="Explicit (adult)";
  START.item("ringAccessory","matching couple ring","CU","casual,glam");
  const opt=(f,list)=>list.forEach(v=>START.option(f,v,G));
  opt("expression",["loving, blissful smile with heart eyes","sleepy, loving smile","melting, lovestruck gaze with parted lips","rare, soft, embarrassed smile",
    "joyful, breathless grin","warm, loving smile","soft, honest smile"]);
  opt("posture",["lying on her back on rose petals, fingers laced with her lover's","lying on her side, spooned from behind, looking back for a kiss",
    "sitting in her lover's lap, wrapped in a blanket","riding on top, holding her lover's hands","lying on her back, legs wrapped around her lover, laughing",
    "lying on her back on white sheets, gazing up","riding on top under the stars, hands on her lover's chest","lying on her back in a wildflower meadow, arms around her lover's neck",
    "lying on a blanket by a bonfire, legs wrapped around her lover","sitting in her lover's lap under a fur blanket","lying face to face on a futon, one leg over her lover's hip",
    "standing at a window, held from behind","lying on her back facing the sunset sea, arms around her lover"]);
  /* v151: Salmon and Crow */
  opt("posture",["lying beneath her lover by a cabin window, fingers laced with his","sitting astride her lover on a quilt, fingers laced with his"]);
  opt("bodyMarkings",["her skin glistens with sweat, cum and dripping love juices"]);
  const LOVE={pupilStyle:"heart pupils",blushStyle:"flushed cheeks and chest",skinFinish:"lightly sweaty, dewy skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"her skin glistens with sweat, cum and dripping love juices"};
  const RING={ringAccessory:["matching couple ring","@metal"]};
  const TAIL="lovey-dovey, romantic, pure love";
  const PL=[
["rosepetals","griffin","Rose petals",{act:"sex, vaginal, missionary, interlocked fingers, forehead-to-forehead, creampie",ex:"loving, blissful smile with heart eyes",
  pose:"lying on her back on rose petals, fingers laced with her lover's",pc:"warm, adoring gaze",w1:{earAccessory:["pearl drop earrings","-"]},
  blurb:"Slow, deep missionary on a bed of rose petals, fingers laced and foreheads touching.",
  scene:`In a candlelit bedroom scattered with red rose petals, the woman lies on her back while {lover} makes love to her slowly and deeply in the missionary position, their fingers laced together on the pillow and their foreheads touching. {His} thick, veiny {cock} is buried to the hilt in her vagina with soft motion lines, her legs wrapped around {his} waist. She gazes up into {his} eyes with a loving, blissful smile and heart-shaped pupils and whispers "I love you... stay inside me♡" in a heart-filled speech bubble, as {he} cums deep inside her and warm cum overflows from her vagina onto the petals. Floating hearts and soft sparkles fill the air. ${TAIL}, missionary, interlocked fingers, forehead-to-forehead, eye contact, leg lock, rose petals, candlelight, heart-shaped pupils, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["sunday","badger","Lazy Sunday",{act:"sex, vaginal, spooning, sex from behind, kiss, creampie",ex:"sleepy, loving smile",
  pose:"lying on her side, spooned from behind, looking back for a kiss",pc:"gentle, loving smile",w1:{},
  blurb:"Spooning under the quilt on a sunlit Sunday morning, turning back for a sleepy kiss.",
  scene:`On a lazy Sunday morning in a sunlit cottage bedroom, the woman lies on her side under a soft quilt while {lover} spoons her from behind, making love to her slowly, one arm wrapped around her and {his} hand laced with hers over her breasts. {His} thick, veiny {cock} slides deep into her vagina from behind with soft motion lines. She turns her head back for a sleepy, loving kiss, cheeks rosy, and murmurs "Good morning... I love you so much♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum seeps from her vagina onto the sheets. Sunlight streams through lace curtains and a breakfast tray waits on the nightstand. ${TAIL}, spooning, lying on side, sex from behind, kiss, interlocked fingers, morning, sunlight, quilt, blush, smile, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts`}],
["rainyloft","raven","Rainy loft",{act:"sex, vaginal, lotus position, embrace, kiss, creampie",ex:"melting, lovestruck gaze with parted lips",
  pose:"sitting in her lover's lap, wrapped in a blanket",pc:"warm, adoring gaze",w1:{},
  blurb:"Wrapped in one blanket in the lotus position, kissing while the rain streaks the window.",
  scene:`On a rainy night in a cozy loft lit by candles, the woman sits in {lover}'s lap in the lotus position, a soft blanket wrapped around both of their shoulders, her arms around {his} neck and {his} arms holding her close. She rocks slowly on {his} thick, veiny {cock}, buried deep in her vagina, as they kiss deeply, rain streaking the big window behind them. She pulls back just enough to look into {his} eyes with a melting, lovestruck gaze and whispers "Never let go of me♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. Floating hearts drift in the candlelight. ${TAIL}, lotus position, sitting on lap, embrace, kiss, eye contact, blanket, rain, window, candlelight, night, heart-shaped pupils, blush, cum in pussy, cum overflow, speech bubble, floating hearts, sweat`}],
["guarddown","serpent","Guard down",{act:"sex, vaginal, cowgirl position, girl on top, interlocked fingers, creampie",ex:"rare, soft, embarrassed smile",
  pose:"riding on top, holding her lover's hands",pc:"gentle, loving smile",w1:{},
  blurb:"Riding slowly with both hands laced in his, and finally admitting it: \"I love you, you idiot.\"",
  scene:`In her silk-draped bedroom, the woman rides {lover} slowly in the cowgirl position, both of her hands laced with {his}, her usual haughty scowl melted into a rare, soft, embarrassed smile. {His} thick, veiny {cock} is buried to the hilt in her vagina as she rolls her hips with gentle motion lines, her cheeks bright red. She looks away, then back into {his} eyes, and admits "...I love you, you idiot♡" in a small, flustered speech bubble, as {he} cums inside her and warm cum overflows from her vagina down {his} {cock}. Moonlight falls across the silk sheets and little hearts float around them. ${TAIL}, cowgirl position, girl on top, interlocked fingers, holding hands, eye contact, tsundere, embarrassed, blush, smile, silk sheets, moonlight, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["firelight","wolf","Firelight",{act:"sex, vaginal, missionary, leg lock, kiss, creampie",ex:"joyful, breathless grin",
  pose:"lying on her back, legs wrapped around her lover, laughing",pc:"warm, adoring gaze",w1:{},
  blurb:"On a fur rug by the cabin fire, laughing breathlessly between kisses.",
  scene:`In front of a crackling fire in a log cabin, the woman lies on her back on a thick fur rug with her legs wrapped around {lover}'s waist, laughing breathlessly between kisses as {he} makes love to her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, their bodies pressed together and her fingers tangled in {his} hair. She grins up at {him}, flushed and glowing, and pants "Hey... I love you, you know that?♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the fur. Firelight glows on their sweaty skin. ${TAIL}, missionary, leg lock, kiss, laughing, hand in another's hair, fireplace, fur rug, cabin, grin, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["honeymoon","swan","Honeymoon suite",{act:"sex, vaginal, missionary, hand on another's cheek, interlocked fingers, creampie",ex:"loving, blissful smile with heart eyes",
  pose:"lying on her back on white sheets, gazing up",pc:"gentle, loving smile",w1:{earAccessory:["pearl drop earrings","-"]},
  blurb:"A tender honeymoon night among white petals and candles: \"Forever and always.\"",
  scene:`In a white honeymoon suite strewn with rose petals and lit by a hundred candles, the woman lies on her back as {lover} makes love to her tenderly, one of {his} hands cradling her cheek and the other laced with hers. {His} thick, veiny {cock} is buried deep in her vagina with soft motion lines, her long legs wrapped around {him}. They gaze into each other's eyes, and she whispers "Forever and always♡" in a heart-filled speech bubble with a blissful, shining smile, as {he} cums deep inside her and warm cum overflows from her vagina onto the white sheets. Sheer curtains drift in the breeze and hearts float upward. ${TAIL}, missionary, hand on another's cheek, interlocked fingers, eye contact, leg lock, honeymoon, rose petals, candlelight, white sheets, heart-shaped pupils, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["starlight","dragon","Under the stars",{act:"sex, vaginal, cowgirl position, girl on top, kiss, creampie",ex:"warm, loving smile",
  pose:"riding on top under the stars, hands on her lover's chest",pc:"warm, adoring gaze",w1:{},
  blurb:"Riding slowly on a castle rooftop under the stars, her fierce look gone soft.",
  scene:`On a blanket spread across a castle rooftop under a sky full of stars, the woman rides {lover} slowly in the cowgirl position, her hands on {his} chest and {his} hands holding her waist, her fierce look softened into a warm, loving smile. {His} thick, veiny {cock} is buried to the hilt in her vagina as she moves with gentle motion lines, her hair falling around them. She leans down to kiss {him} and murmurs "You're mine, and I'm yours♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. A shooting star streaks across the sky. ${TAIL}, cowgirl position, girl on top, hands on another's chest, kiss, starry sky, night, shooting star, rooftop, blanket, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["meadow","stag","Wildflower meadow",{act:"sex, vaginal, missionary, leg lock, creampie",ex:"melting, lovestruck gaze with parted lips",
  pose:"lying on her back in a wildflower meadow, arms around her lover's neck",pc:"warm, adoring gaze",w1:{headwear:["flower crown","@c1"]},
  blurb:"Making love slowly in a wildflower meadow at golden hour, petals and butterflies drifting by.",
  scene:`In a wildflower meadow at golden hour, the woman lies on her back on a soft blanket among swaying flowers, her arms around {lover}'s neck, as {he} makes love to her slowly. {His} thick, veiny {cock} is buried deep in her vagina with gentle motion lines, her long legs wrapped around {him} and petals and butterflies drifting around them. She smiles up at {him} with dreamy, heart-shaped eyes and whispers "I want this every day with you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the blanket. Warm sunlight glows through the grass. ${TAIL}, missionary, arms around neck, leg lock, eye contact, meadow, flower field, golden hour, sunlight, butterfly, flower crown, heart-shaped pupils, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["bonfire","shark","Bonfire beach",{act:"sex, vaginal, missionary, leg lock, kiss, creampie",ex:"joyful, breathless grin",
  pose:"lying on a blanket by a bonfire, legs wrapped around her lover",pc:"gentle, loving smile",w1:{earAccessory:["small shark tooth earrings","-"]},
  blurb:"By a bonfire on a moonlit beach, no teasing this time: just \"I love you.\"",
  scene:`On a blanket beside a crackling bonfire on a moonlit beach, the woman lies on her back with her legs wrapped around {lover}, pulling {him} down into a long kiss as {he} makes love to her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, waves washing softly up the sand behind them. She breaks the kiss with a soft, toothy, glowing smile and whispers "I'm not teasing this time... I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the blanket. Sparks drift up into the starry sky. ${TAIL}, missionary, leg lock, kiss, bonfire, beach, night, moonlight, starry sky, waves, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["snowedin","penguin","Snowed in",{act:"sex, vaginal, straddling, sitting on lap, hug, creampie",ex:"joyful, breathless grin",
  pose:"sitting in her lover's lap under a fur blanket",pc:"warm, adoring gaze",w1:{},
  blurb:"Snowed in under a fur blanket by the frosted window, hugging him tight.",
  scene:`In a snowed-in cabin, the woman sits in {lover}'s lap under a thick fur blanket by a frosted window, hugging {him} tightly as they make love, her cheeks pink and her eyes shining. {His} thick, veiny {cock} is buried deep in her vagina as she bounces gently with soft motion lines, two mugs of cocoa steaming on the windowsill. She nuzzles {his} neck with a bright, happy, breathless smile and squeals "So warm... I love you, I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. Snow falls softly outside. ${TAIL}, sitting on lap, straddling, hug, fur blanket, window, snow, hot cocoa, cabin, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["ryokan","fox","Ryokan night",{act:"sex, vaginal, lying on side, face-to-face, kiss, creampie",ex:"soft, honest smile",
  pose:"lying face to face on a futon, one leg over her lover's hip",pc:"gentle, loving smile",w1:{},
  blurb:"Face to face on a futon in a lantern-lit ryokan: \"No tricks tonight.\"",
  scene:`On a futon in a lantern-lit ryokan room, the woman lies on her side facing {lover}, one leg hooked over {his} hip, as they make love slowly face to face, their noses brushing between kisses. {His} thick, veiny {cock} is buried deep in her vagina with soft motion lines, {his} hand resting on the small of her back. Her usual sly smirk has become a soft, honest smile, and she whispers "No tricks tonight... just love me♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the futon. Paper lanterns glow and autumn leaves drift past the shoji screens. ${TAIL}, lying on side, face-to-face, leg over hip, kiss, futon, ryokan, paper lantern, autumn leaves, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["orangegrove","lovebird","Orange grove",{act:"sex, vaginal, missionary, eskimo kiss, interlocked fingers, creampie",ex:"loving, blissful smile with heart eyes",
  pose:"lying on a blanket under orange blossoms, nose to nose with her lover",pc:"warm, adoring gaze",w1:{headwear:["ribbon bows tied at the twintails","@accent"]},
  blurb:"Under orange blossoms on a picnic blanket at golden hour, rubbing noses between kisses: \"I'm never flying away from you.\"",
  scene:`In a sunlit orange grove at golden hour, white blossoms drifting down around them, the woman lies on her back on a checkered picnic blanket as {lover} makes love to her slowly, their fingers laced together beside her head and their noses brushing in little eskimo kisses between soft kisses. {His} thick, veiny {cock} is buried deep in her vagina with soft motion lines, her legs wrapped around {him}. Her cheeks are pink, her eyes turn to hearts, and she giggles "I'm never flying away from you... I love you, I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. Two little lovebirds sit side by side on the branch above them. ${TAIL}, missionary, eskimo kiss, nose-to-nose, interlocked fingers, leg lock, orange tree, orange blossom, petals, picnic blanket, golden hour, bird, heart-shaped pupils, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["bungalow","flamingo","Sunset bungalow",{act:"sex, vaginal, missionary, leg lock, creampie",ex:"warm, loving smile",
  pose:"lying on her back facing the sunset sea, arms around her lover",pc:"gentle, loving smile",w1:{earAccessory:["flower tucked behind one ear","@c1"]},
  blurb:"In an overwater bungalow open to a pink sunset: \"Let's stay here forever.\"",
  scene:`In an overwater bungalow with its doors open to a pink-and-gold sunset over the sea, the woman lies on her back on a white bed with her arms around {lover}'s neck as {he} makes love to her slowly. {His} thick, veiny {cock} is buried deep in her vagina with gentle motion lines, her long legs wrapped around {him} and hibiscus petals scattered across the sheets. She gazes up with a serene, glowing smile and heart-shaped pupils and whispers "Let's stay here forever♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. The sea glitters behind them. ${TAIL}, missionary, arms around neck, leg lock, eye contact, overwater bungalow, sunset, ocean, petals, white sheets, heart-shaped pupils, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["lighthouse","kraken","The lighthouse",{act:"sex, vaginal, lotus position, sitting on lap, leg lock, forehead-to-forehead, creampie",ex:"loving, blissful smile with heart eyes",
  pose:"sitting in her lover's lap at the top of a lighthouse, wrapped around him",pc:"warm, adoring gaze",w1:{earAccessory:["pearl drop earrings","-"]},
  blurb:"At the top of a lighthouse at night, wrapped all the way around him as the beam sweeps the sea: \"I'm never letting go of you.\"",
  scene:`At the top of an old lighthouse at night, the great lamp turning slowly and its beam sweeping across a moonlit sea, the woman sits in {lover}'s lap in the lotus position on a blanket, her legs and arms wrapped all the way around {him}, making love slowly. {His} thick, veiny {cock} is buried deep in her vagina as she rocks gently with soft motion lines, their foreheads touching. Her cool, faraway composure has melted into something soft and shy, and she whispers "I'm never letting go of you... I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. Moonlight and the turning beam wash over them. ${TAIL}, lotus position, sitting on lap, leg lock, arms around neck, forehead-to-forehead, eye contact, lighthouse, night, moonlight, ocean, light rays, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["homecoming","salmon","Coming home",{act:"sex, vaginal, missionary, interlocked fingers, eye contact, creampie",ex:"melting, lovestruck gaze with parted lips",
  pose:"lying beneath her lover by a cabin window, fingers laced with his",pc:"warm, adoring gaze",w1:{earAccessory:["large hoop earrings","@metal"]},
  blurb:"Home at dawn after months of fashion weeks abroad, in his cedar cabin above the river where the salmon come back every year: \"Every road leads back to you.\"",
  scene:`At dawn in a cedar cabin above a wide river, after months away on the other side of the world, the woman lies on a quilt beneath {lover} by the big window, her suitcase still open on the floor and her long salmon hair spread across the pillow. Outside, salmon leap the rapids, making their way home. {He} makes love to her slowly and deeply, their fingers laced together beside her head and their eyes locked, {his} thick, veiny {cock} buried deep in her vagina with soft motion lines, her legs wrapped around {his} waist. Her editorial poise has melted into a lovestruck gaze with parted lips and tears of happiness at the corners of her eyes, and she whispers "Every road I take leads back to you... I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina onto the quilt. Golden morning light through the window. ${TAIL}, missionary, interlocked fingers, eye contact, leg lock, cabin, wooden wall, window, river, salmon, morning, sunrise, light rays, tears of joy, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}],
["treasure","crow","My treasure",{act:"sex, vaginal, cowgirl position, girl on top, interlocked fingers, creampie",ex:"loving, blissful smile with heart eyes",
  pose:"sitting astride her lover on a quilt, fingers laced with his",pc:"warm, adoring gaze",w1:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},
  blurb:"In their moonlit attic among her jars of keys, buttons and sea glass, she gives him the one treasure she never showed anyone: \"It's you.\"",
  scene:`In a cozy attic room under a round moonlit window, shelves glittering with her collection of jars full of keys, buttons, marbles and sea glass, the woman sits astride {lover} on a patchwork quilt, wearing only her opal pendant, and makes love to {him} slowly, their fingers laced together. {His} thick, veiny {cock} is buried deep in her vagina as she rocks her hips with soft motion lines. She has just pressed her smallest, oldest treasure box into {his} hand; it holds only a tiny note that reads "you". She gazes down at {him} with a loving, blissful smile and heart eyes and whispers "You're the shiniest thing I ever found... I love you♡" in a heart-filled speech bubble, as {he} cums inside her and warm cum overflows from her vagina. Moonlight glints off every jar. ${TAIL}, cowgirl position, girl on top, interlocked fingers, eye contact, attic, round window, moonlight, night, shelf, jar, key, gift, pendant, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, floating hearts, sweat`}]
  ];;
  const ORD=h=>ACAD.HOUSES.indexOf(h);PL.sort((a,b)=>ORD(a[1])-ORD(b[1]));
  START.add("Academy Pure Love",PL.map(([key,h,name,x])=>{
    const m=h+"man",mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const w1i=Object.assign({},RING,x.w1||{});
    const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},LOVE,{expression:x.ex,posture:x.pose});
    const w1={name:"Together",look:"boudoir",f:w1i},w2={name:"Together",look:"boudoir",m:RING,f:RING};
    return{id:"love"+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Together",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:["pure love","romantic","vanilla","explicit","sex","pair",h],
      blurb:`${x.blurb} ${cap(h)} with the ${mt?mt.name:cap(h)+" boyfriend"}; switch either character in the Scene tab and the scene follows.`};
  }),{after:"Academy Sweethearts"});
  const bad=[];
  PL.forEach(([k,h,n,x])=>{Object.entries(x.w1||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")});
    [["expression",x.ex],["posture",x.pose],["expression",x.pc]].forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("pure love scene: "+m);try{console.warn("[pure love] "+m)}catch(e){}});
})();

/* ---- v141 (v151: Salmon with Badger, Crow with Penguin): "Academy Yuri". One explicit girl-on-girl single scene per girl (house order), each themed to her,
   with sex toys and sensual woman-on-woman play (oral, fingering, tribadism, a strap-on, glass and vibrating toys).
   The partner is another Academy girl (her robes entry in a scene outfit). No futanari here (pair.penis false),
   so a woman partner stays a woman; the base prompt gets "2girls, yuri". Swappable like the other scene sets, and
   held back by the safeguard like every explicit scene. Placed after Pure Love in the soft-to-intense order.
   Penguin's scene (the snowy hot spring) is the set's centrepiece. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","standing behind her lover at an aquarium window, wrapped around her","Explicit (adult)");
  const G="Explicit (adult)";
  const it=(f,list,t,fam)=>list.forEach(v=>START.item(f,v,t,fam));
  it("waistAccessory",["strap-on harness with a {c} dildo"],"L","boudoir");
  it("heldItem",["small bullet vibrator","remote control for a vibrating egg","chilled ice-blue glass dildo","rose-shaped clit suction toy","waterproof vibrator",
    "crystal glass dildo","double-ended dildo","pink rabbit vibrator","bottle of champagne","open book of poetry","thick ribbed dildo"],"LS","boudoir");
  it("tailPiece",["fluffy fox-tail butt plug"],"L","boudoir,costume");
  it("headwear",["small white onsen towel folded on her head"],"CU","casual");
  const opt=(f,list)=>list.forEach(v=>START.option(f,v,G));
  opt("expression",["shy, trembling moan with parted lips","sweet, dazed, blushing smile","breaking, flustered moan","flushed, drooling, tongue-out surrender",
    "breathless, competitive grin","blissful, closed-eye moan","fierce, triumphant grin","dreamy, overwhelmed, heart-eyed smile","teasing, sharp-toothed grin",
    "rosy, giggling, heart-eyed bliss","sly smirk melting into a moan","radiant, heart-eyed smile","melting, blissful, heart-eyed smile"]);
  opt("posture",["holding a standing split at a ballet barre","lying back on the pillows, hands in her lover's hair","sitting in a velvet armchair with an open book",
    "kneeling on all fours on silk sheets","lying tangled with her lover, legs interlocked","lying back on a velvet chaise in a split","sitting astride her lover's face",
    "lying back on moss and petals with her legs spread","lying in a sixty-nine on a beach towel","sitting in her lover's lap in a steaming hot spring",
    "kneeling on all fours with her hips raised, tail swishing","stretching luxuriously on a bed of peacock feathers","reclining in a bubble bath, one leg raised"]);
  /* v151: Salmon and Crow */
  opt("posture",["standing in a waterfall pool, caught in her lover's arms from behind","kneeling between her lover's thighs on a fur rug, holding up a pebble"]);
  opt("bodyMarkings",["her thighs glisten with dripping love juices","snowflakes melt on her steaming, rosy skin"]);

  const YURI={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",bodyMarkings:"her thighs glisten with dripping love juices"};
  const TAIL="yuri";
  /* [key, girl, partner girl, name, scene] */
  const YS=[
["barre","griffin","swan","At the barre",{act:"cunnilingus, licking pussy, vibrator, standing split",ex:"shy, trembling moan with parted lips",
  pose:"holding a standing split at a ballet barre",pc:"half-lidded sultry gaze",w1:{legwear:["thigh-high stockings","@dark"]},w2:{heldItem:["small bullet vibrator","hot pink"]},
  blurb:"Holding a standing split at the barre while another dancer kneels and eats her out with a bullet vibrator.",
  scene:`In a mirror-walled dance studio at night, lit by moonlight through tall windows, the woman holds a graceful standing split at the ballet barre, one leg raised high, while {partner} kneels beneath her and eats her out, {his} tongue buried in her vagina and a small buzzing bullet vibrator pressed to her clit. The woman grips the barre with trembling hands, blushing shyly, eyes half closed and lips parted in a soft moan, and whispers "Don't stop... right there♡" in a heart-filled speech bubble. Her juices drip down her raised thigh, and their bodies are reflected in the mirror wall. Soft buzzing and wet sound effects. ${TAIL}, cunnilingus, standing split, leg up, vibrator, sex toy, ballet barre, mirror, reflection, trembling, blush, moaning, pussy juice, heart-shaped pupils, speech bubble, sweat, night`}],
["worship","badger","flamingo","Breast worship",{act:"breast sucking, breast grab, dildo, sex toy",ex:"sweet, dazed, blushing smile",
  pose:"lying back on the pillows, hands in her lover's hair",pc:"lustful expression",w1:{neckAccessory:["heart pendant necklace","@metal"]},w2:{heldItem:["thick ribbed dildo","hot pink"]},
  blurb:"Her breasts kneaded and worshipped under the fairy lights while she's fucked slowly with a pink dildo.",
  scene:`On a quilted bed in a cozy cottage bedroom lit by warm fairy lights, {partner} kneels over the woman, squeezing and kneading her breasts together and sucking one hard nipple while slowly fucking her with a thick pink dildo. The woman lies back on the pillows with a sweet, dazed, blushing smile, her hands buried in {partner}'s hair, and moans "Mmh... they're so sensitive♡" in a heart-filled speech bubble. Her juices glisten on the toy and drip onto the quilt. Wet, squelching sound effects. ${TAIL}, breast sucking, nipple sucking, breast grab, dildo, sex toy, lying, on bed, quilt, fairy lights, blush, smile, moaning, pussy juice, heart-shaped pupils, speech bubble, sweat`}],
["remote","raven","fox","Remote control",{act:"vibrator, remote control vibrator, fingering, neck kiss",ex:"breaking, flustered moan",
  pose:"sitting in a velvet armchair with an open book",pc:"smirk",w1:{legwear:["sheer thigh-highs","@dark"],heldItem:["open book of poetry","-"]},w2:{heldItem:["remote control for a vibrating egg","-"]},
  blurb:"Trying to read poetry aloud while her lover holds the remote to the egg vibrator inside her.",
  scene:`In a candlelit reading nook piled with old books, the woman sits in a velvet armchair trying to read poetry aloud from an open book while a vibrating egg buzzes inside her. {Partner} perches on the arm of the chair holding the remote with a sly smile, kisses her neck and slides {his} fingers between her thighs, turning the dial up. The woman's voice breaks into a moan, her thighs trembling and her toes curling, and her reading dissolves into "Ah... n-no fair♡" in a speech bubble. Her juices soak the velvet. Buzzing sound effects. ${TAIL}, vibrator, remote control vibrator, egg vibrator, fingering, neck kiss, book, reading, sitting, armchair, trembling, toes curling, blush, moaning, pussy juice, heart-shaped pupils, candlelight, speech bubble, sweat`}],
["strapon","serpent","griffin","The rival's strap-on",{act:"strap-on, dildo, sex from behind, doggystyle",ex:"flushed, drooling, tongue-out surrender",
  pose:"kneeling on all fours on silk sheets",pc:"dominant, knowing smirk",w1:{legwear:["garter-strap stockings with lace tops","@dark"]},
  w2:{waistAccessory:["strap-on harness with a {c} dildo","black",null,"@c1"]},
  blurb:"On all fours on her own silk sheets while the rival she looked down on fucks her with a strap-on.",
  scene:`In her black-and-emerald silk bedroom, the haughty woman is on her hands and knees on the bed while {partner}, the rival she always looked down on, fucks her from behind with a strap-on, gripping her hips. The thick dildo of the harness is buried to the hilt in her vagina, thrusting with motion lines. Her scowl has melted into a flushed, drooling, tongue-out face with heart-shaped pupils, and she gasps "F-fine... you win... harder♡" in a speech bubble, her juices dripping down her thighs onto the silk. Wet slapping sound effects. ${TAIL}, strap-on, dildo, sex toy, sex from behind, doggystyle, all fours, hands on another's hips, tongue out, drooling, heart-shaped pupils, blush, pussy juice, motion lines, speech bubble, sweat`}],
["sparring","wolf","shark","Sparring partners",{act:"tribadism, double dildo, legs intertwined, interlocked fingers",dir:"mutual",ex:"breathless, competitive grin",
  pose:"lying tangled with her lover, legs interlocked",pc:"smirk",w1:{gloves:["fingerless training gloves","@c1"]},
  w2:{gloves:["fingerless training gloves","@c1"],heldItem:["double-ended dildo","hot pink"]},
  blurb:"After sparring in an empty boxing gym, scissoring on the mat with a double-ended dildo between them.",
  scene:`On the mat of an empty boxing gym after a sparring match, the woman and {partner} lie tangled together, scissoring, their legs interlocked and a double-ended dildo buried deep in both of them, grinding their hips against each other with motion lines. Sweat drips from their toned bodies, training gloves still on, and they grip each other's hands as they push and grind. The woman grins through a breathless, flushed face, panting "Still... not giving up♡" in a speech bubble, as their juices slick the mat. Wet slapping sound effects. ${TAIL}, tribadism, scissoring, double dildo, sex toy, legs intertwined, interlocked fingers, gym, exercise mat, sweaty, grin, blush, pussy juice, motion lines, speech bubble`}],
["pasdedeux","swan","lovebird","Pas de deux",{act:"dildo, glass dildo, kissing thigh, spread legs",ex:"blissful, closed-eye moan",
  pose:"lying back on a velvet chaise in a split",pc:"seductive smile",w1:{earAccessory:["pearl drop earrings","-"]},w2:{heldItem:["crystal glass dildo","-"]},
  blurb:"Legs elegantly split on a velvet chaise backstage, a crystal glass toy sliding slowly in and out.",
  scene:`On a velvet chaise backstage after the ballet, surrounded by bouquets, the woman lies back with her long legs elegantly spread in a split while {partner} kneels between them and slides a crystal glass dildo slowly in and out of her vagina, kissing her inner thigh. The woman arches her back gracefully, one hand over her mouth to stifle a soft moan, eyes closed in bliss, and breathes "So elegant... so deep♡" in a speech bubble. Her juices glisten on the crystal toy. Soft lewd sound effects among the roses. ${TAIL}, dildo, glass dildo, sex toy, spread legs, splits, kissing thigh, arched back, covering own mouth, closed eyes, blush, pussy juice, bouquet, rose, speech bubble, sweat`}],
["throne","dragon","wolf","Treasure throne",{act:"facesitting, cunnilingus, grinding",ex:"fierce, triumphant grin",
  pose:"sitting astride her lover's face",pc:"lustful expression",w1:{legwear:["fishnet stockings","@dark"]},w2:{},
  blurb:"Enthroned on her lover's face in a treasure chamber, grinding down and giving orders.",
  scene:`In a torchlit treasure chamber heaped with gold coins, the woman sits enthroned on {partner}'s face, grinding down as {partner} eats her out, {his} hands gripping her thighs. The woman throws her head back with a fierce, triumphant grin, one hand fisted in {partner}'s hair and the other squeezing her own breast, and commands "Don't you dare stop♡" in a speech bubble, her juices dripping onto {partner}'s face. Gold glitters all around them. Wet, lewd sound effects. ${TAIL}, facesitting, cunnilingus, grinding, hand in another's hair, grabbing own breast, gold coin, treasure, torch, grin, blush, pussy juice, heart-shaped pupils, speech bubble, sweat`}],
["greenhouse","stag","badger","The rose in the greenhouse",{act:"sex toy, fingering, spread legs, squirting",ex:"dreamy, overwhelmed, heart-eyed smile",
  pose:"lying back on moss and petals with her legs spread",pc:"warm, adoring gaze",w1:{headwear:["flower crown","@c1"]},w2:{heldItem:["rose-shaped clit suction toy","pink"]},
  blurb:"On moss and petals in a sunlit greenhouse, a rose-shaped suction toy making her bloom.",
  scene:`In a sunlit greenhouse overflowing with flowers, the woman lies back on a bed of moss and petals while {partner} holds a rose-shaped clit suction toy against her, its pink petals pulsing, and slides two fingers inside her. The woman's long legs tremble and spread wide, flowers caught in her hair, and she gazes up with a dreamy, overwhelmed, heart-eyed smile, sighing "It's like... blooming♡" in a heart-filled speech bubble as she squirts across the petals. Soft pulsing sound effects. ${TAIL}, sex toy, fingering, spread legs, squirting, greenhouse, flowers, petals, flower crown, sunlight, heart-shaped pupils, blush, smile, pussy juice, trembling, speech bubble, sweat`}],
["sixtynine","shark","penguin","Sunscreen sixty-nine",{act:"69, cunnilingus, vibrator",dir:"mutual",ex:"teasing, sharp-toothed grin",
  pose:"lying in a sixty-nine on a beach towel",pc:"lustful expression",w1:{heldItem:["waterproof vibrator","@c1"]},w2:{},
  blurb:"An oiled-up sixty-nine on a secluded beach, racing to make each other cum first.",
  scene:`On a striped beach towel under a sun umbrella on a secluded beach, the woman and {partner} lie in a sixty-nine, their bodies glistening with sunscreen oil, each licking the other's pussy, a waterproof vibrator buzzing in the woman's hand as she presses it between {partner}'s thighs. The woman bares her sharp teeth in a teasing grin between licks while {partner} moans into her, and a speech bubble reads "Bet I make you cum first~♡". Juices and oil drip onto the towel, and waves sparkle behind them. Wet, buzzing sound effects. ${TAIL}, 69, cunnilingus, vibrator, sex toy, oil, oiled skin, beach, beach towel, beach umbrella, sharp teeth, grin, blush, pussy juice, speech bubble, sweat, summer`}],
["hotspring","penguin","swan","Ice and steam",{act:"kiss, glass dildo, temperature play, nipple sucking",ex:"rosy, giggling, heart-eyed bliss",
  pose:"sitting in her lover's lap in a steaming hot spring",pc:"warm, adoring gaze",
  c1:{skinFinish:"wet skin with water droplets",bodyMarkings:"snowflakes melt on her steaming, rosy skin"},
  w1:{headwear:["small white onsen towel folded on her head","-"]},w2:{headwear:["small white onsen towel folded on her head","-"],heldItem:["chilled ice-blue glass dildo","-"]},
  blurb:"A private hot spring in the falling snow: a glass toy chilled in the snowbank, steam, giggles and melting snowflakes.",
  scene:`In a private outdoor hot spring at night, snow falling softly around the steaming water and paper lanterns glowing on the black rocks, {partner} holds the woman in {his} lap in the water and kisses her slowly, then slides a chilled ice-blue glass dildo, cooled in the snowbank beside them, deep into her vagina. The woman gasps and giggles at the cold, her cheeks rosy and her freckles flushed, her breasts bobbing on the steaming water with snowflakes melting on her hard nipples, which {partner} warms with {his} mouth. Clinging to {partner}'s neck with bright, heart-shaped eyes, the woman squeals "So cold... so good... more♡" in a heart-filled speech bubble, toes curling as she trembles into orgasm. Steam swirls around them and a little snow-dusted lantern glows beside a tray with two cups of warm sake. Soft lewd sound effects. ${TAIL}, onsen, hot spring, partially submerged, steam, snow, snowing, night, paper lantern, sitting on lap, kiss, glass dildo, temperature play, nipple sucking, hard nipples, giggling, trembling, orgasm, toes curling, heart-shaped pupils, blush, smile, wet, speech bubble`}],
["foxtail","fox","raven","Fox tail",{act:"cunnilingus, fingering, tail pull, butt plug",ex:"sly smirk melting into a moan",
  pose:"kneeling on all fours with her hips raised, tail swishing",pc:"seductive smile",w1:{headwear:["fluffy fox ear headband","@hair"],tailPiece:["fluffy fox-tail butt plug","@hair"]},w2:{},
  blurb:"Fox ears and a fluffy fox-tail plug, her tail tugged while she's eaten out from behind.",
  scene:`On a futon in a lantern-lit tatami room, the woman kneels on all fours wearing fluffy fox ears and a fluffy fox-tail butt plug, her hips raised and her tail swishing as she looks back with a sly, flushed smirk. {Partner} kneels behind her, tugging gently on the tail while eating her out from behind and pushing two fingers inside her. The woman's smirk wobbles into a drooling, tongue-out moan, and she purrs "Kon kon~ tug it again♡" in a heart-filled speech bubble, her juices dripping onto the futon. Lewd sound effects. ${TAIL}, fox ears, fox tail, tail plug, butt plug, cunnilingus, licking from behind, fingering, all fours, looking back, smirk, tongue out, drooling, heart-shaped pupils, blush, pussy juice, paper lantern, tatami, speech bubble, sweat`}],
["creamsicle","lovebird","serpent","Creamsicle",{act:"cunnilingus, licking, food play",ex:"giggling, heart-eyed moan",
  pose:"lying back on a picnic blanket, a popsicle dripping on her breasts",pc:"half-lidded sultry gaze",w1:{headwear:["ribbon bows tied at the twintails","@accent"],heldItem:["orange creamsicle popsicle","-"]},w2:{},
  blurb:"A melting creamsicle on a hot afternoon: she lets it drip down her breasts, and Serpent licks every sweet drop all the way down.",
  scene:`On a pastel picnic blanket under a striped parasol on a hot summer afternoon, the woman lies back holding a melting orange-and-cream creamsicle popsicle, letting it drip down over her breasts and stomach while {partner} licks the sweet drops off her skin, slowly working lower until {his} face is buried between her thighs, eating her out. The woman giggles and squirms with blush stickers on her cheeks and heart-shaped pupils, moaning "So sweet... don't stop♡" in a heart-filled speech bubble, the popsicle melting down her fingers as she trembles into orgasm. Soft lewd sound effects. ${TAIL}, cunnilingus, licking, food play, popsicle, ice cream, melting, cream on body, picnic blanket, parasol, summer, giggling, heart-shaped pupils, blush, pussy juice, speech bubble, sweat`}],
["bubblebath","flamingo","stag","Pink bubble bath",{act:"breast press, kiss, vibrator, rabbit vibrator",ex:"melting, blissful, heart-eyed smile",
  pose:"reclining in a bubble bath, one leg raised",pc:"warm, adoring gaze",w1:{headwear:["flower hair clip","@c1"]},w2:{heldItem:["pink rabbit vibrator","-"]},
  blurb:"A rose-petal bubble bath at sunset, breasts pressed together and a rabbit vibrator under the bubbles.",
  scene:`In a pink-tiled bathroom at sunset, rose petals floating on a bubble bath, the woman reclines in the tub while {partner} straddles her, their breasts pressed and sliding together, kissing deeply as {partner} works a pink rabbit vibrator inside her beneath the bubbles. The woman's serene face melts into a flushed, blissful, heart-eyed smile, one long leg lifted out of the water with her toes curled, and she sighs "Don't stop... I'm melting♡" in a heart-filled speech bubble. Golden light streams through the window. Soft buzzing and splashing sound effects. ${TAIL}, bathtub, bubble bath, rose petals, breast press, kiss, vibrator, rabbit vibrator, sex toy, leg up, toes curling, heart-shaped pupils, blush, smile, wet, sunset, speech bubble`}],
["penguins","kraken","penguin","After closing",{act:"fingering, vibrator, breast grab, kiss on neck, hug from behind",dir:"ab",ex:"cool, otherworldly half-smile",
  pose:"standing behind her lover at an aquarium window, wrapped around her",pc:"rosy, giggling, heart-eyed bliss",
  w1:{neckAccessory:["pearl choker","-"],heldItem:["small bullet vibrator","-"]},w2:{neckAccessory:["chunky knit scarf","orange"]},
  blurb:"After closing at the aquarium, wrapped around Penguin in front of the glowing penguin tank while the little penguins watch.",
  scene:`After closing time in an empty aquarium, the only light the blue glow of the penguin exhibit, the woman stands behind {partner} at the big glass window and wraps herself around {him} like an octopus, one arm across {his} breasts, squeezing, and the other hand slipped down between {his} thighs, working a small bullet vibrator against {his} clit while she kisses {his} neck. Little penguins waddle and swim just on the other side of the glass, peering at them. {Partner} giggles and squirms in her arms, cheeks rosy and eyes turning to hearts, squealing "They're watching us~!" in a speech bubble, and the woman murmurs "Let them look, little bird♡" with a cool, otherworldly half-smile as {partner} trembles into orgasm against the glass. Soft lewd sound effects. ${TAIL}, aquarium, penguin, fish tank, blue theme, hug from behind, fingering, vibrator, breast grab, kiss on neck, giggling, trembling, orgasm, heart-shaped pupils, blush, smile, speech bubble`}],
["catch","salmon","badger","Catch of the day",{act:"fingering, breast grab, hug from behind, kiss on neck",dir:"ba",ex:"sly smirk melting into a moan",
  pose:"standing in a waterfall pool, caught in her lover's arms from behind",pc:"breathless, competitive grin",w1:{},w2:{},
  blurb:"Bear catches salmon: Badger wades into the waterfall pool and scoops her up from behind, and the house icon lets herself be caught.",
  scene:`In a sunlit waterfall pool deep in a cedar forest, salmon leaping the falls behind them, the woman stands waist-deep in the cold, sparkling water while {partner} wades up behind her like a bear at the river and catches her in {his} arms, one hand squeezing her heavy, freckled breast and the other slipped down between her thighs under the water, fingering her, as {he} nibbles her neck. {Partner} grins against her shoulder, saying "Caught you, little fish♡" in a speech bubble, and the woman's poised, self-assured smile melts into a sly smirk and then a moan, "...you just got lucky" in a smaller speech bubble, as she trembles into orgasm with water streaming down her body. Soft splashing sound effects. ${TAIL}, waterfall, river, forest, salmon, fish, partially submerged, wet, wet hair, hug from behind, fingering, breast grab, kiss on neck, smirk, grin, trembling, orgasm, heart-shaped pupils, blush, speech bubble`}],
["pebble","crow","penguin","A perfect pebble",{act:"cunnilingus, licking pussy, spread legs, kiss on thigh",dir:"ab",ex:"sweet, dazed, blushing smile",
  pose:"kneeling between her lover's thighs on a fur rug, holding up a pebble",pc:"melting, blissful, heart-eyed smile",
  w1:{neckAccessory:["opal teardrop pendant on a fine chain","-"]},w2:{neckAccessory:["chunky knit scarf","orange"]},
  blurb:"In a snug cabin on a snowy beach, Crow offers Penguin the smoothest, shiniest pebble on the shore, which in Penguin's world means forever, and then shows her what it means in hers.",
  scene:`In a snug wooden cabin on a snowy beach at night, a fire crackling in the hearth and a colony of little penguins huddled on the moonlit shore outside the frosted window, {partner} lies back on a thick white fur rug in nothing but an orange knit scarf, and the woman kneels between {his} spread thighs holding up a perfectly smooth, shiny gray pebble she spent all day searching the beach for. She asks shyly "In your world this means forever, right?♡" in a speech bubble, and {partner} answers with a teary, heart-eyed nod. Then the woman lowers her head and licks {his} pussy slowly, kissing {his} inner thighs between strokes, the pebble clutched in {partner}'s hand against {his} heart. {Partner} melts with a blissful, heart-eyed smile, toes curling in the fur, and trembles into orgasm. Soft lewd sound effects. ${TAIL}, cabin, fireplace, fur rug, snow, beach, night, window, penguin, pebble, holding object, gift, cunnilingus, licking pussy, spread legs, kiss on thigh, scarf, blush, smile, tears of joy, trembling, orgasm, heart-shaped pupils, speech bubble`}]
  ];;
  const ORD=h=>ACAD.HOUSES.indexOf(h);YS.sort((a,b)=>ORD(a[1])-ORD(b[1]));
  START.add("Academy Yuri",YS.map(([key,h,ph,name,x])=>{
    const m=ACAD.robes(ph),mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const w1i=x.w1||{};
    const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},YURI,x.c1||{},{expression:x.ex,posture:x.pose});
    const w2f=x.w2||{},w2m=Object.fromEntries(Object.entries(w2f).filter(([f])=>f!=="waistAccessory"));
    if(w2f.waistAccessory&&!w2m.heldItem)w2m.heldItem=["thick ribbed dildo","hot pink"];
    const w1={name:"Girls' night",look:"boudoir",f:w1i},w2={name:"Girls' night",look:"boudoir",f:w2f,m:w2m};
    return{id:"yuri"+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Girls' night",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:x.dir||"ba",explicit:true,penis:false,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:["yuri","girl on girl","lesbian","sex toy","explicit","sex","pair",h,ph],
      blurb:`${x.blurb} ${cap(h)} with ${cap(ph)}; switch either character in the Scene tab and the scene follows.`};
  }),{after:"Academy Pure Love"});
  const bad=[];
  YS.forEach(([k,h,ph,n,x])=>{[x.w1,x.w2].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")}));
    [["expression",x.ex],["posture",x.pose],["expression",x.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("yuri scene: "+m);try{console.warn("[yuri] "+m)}catch(e){}});
})();

/* ---- v136 (v151: Salmon with Wolf, Crow with Raven): "Academy Affairs". One explicit single scene per girl (house order): a secret, guilty-but-willing
   affair with another house's boyfriend. She is plainly willing (pulling her lover in, asking for more); the guilt
   comes from her absent boyfriend: a call, a text, a photo, a gift, a voice through a door. Built like the
   Depraved scenes: swappable in the Scene tab (a woman partner is written as a futanari), scene outfits in tones,
   character 1's pose and expression carried by pair.c1, and held back by the safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","bending over a yacht's railing at night, looking back","Explicit (adult)");
  const GX="Explicit (adult)";
  START.item("ringAccessory","matching couple ring","CU","casual,glam");
  START.item("heldItem","smartphone pressed to her ear","CU","casual");
  START.item("legwear","satin pointe shoes with ribbons laced up the ankles","CU","costume");
  START.item("neckAccessory","initial pendant necklace","CU","casual,glam");
  START.item("neckAccessory","shark-tooth pendant on a cord","CU","resort,edgy");
  START.item("maskAccessory","fox-face masquerade mask","CU","costume,glam");
  START.item("maskAccessory","black domino masquerade mask","CU","costume,glam");
  const opt=(f,list)=>list.forEach(v=>START.option(f,v,GX));
  opt("expression",["guilty, flushed, eager expression, biting her lip","guilty, defiant smirk with flushed cheeks","guilty, flushed smile",
    "flushed, guilty face with her eyes rolling up"]);
  opt("posture",["standing against a door with one leg hooked high","bending over a kitchen counter, looking back","lying back across a card table, legs wrapped around her lover",
    "riding on top, hands braced on her lover's chest","lying on her back with her legs over her lover's shoulders, phone to her ear","bending over a dressing table in front of a mirror",
    "sitting on the edge of a desk, legs locked around her lover","lying back on a velvet chaise, legs wrapped around her lover","being held up against a shower wall, legs locked around her lover",
    "straddling her lover's lap in a hot tub","leaning against a coat rack, bent forward","lying back on a daybed, ankles hooked behind her lover",
    "riding on top in a cramped back seat, hands on the fogged window"]);
  /* v151: Salmon and Crow */
  opt("posture",["riding on top on a bearskin rug by a lodge fire, phone in hand","riding on top beneath a great telescope"]);

  const AROUSE={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};   /* v139: cum and fluids, no smudged makeup or marks */
  const RING={ringAccessory:["matching couple ring","@metal"]};
  const TAIL="cheating (relationship), infidelity, secret affair";
  /* [key, girl, partner (another house's boyfriend), name, scene] */
  const AF=[
["rival","griffin","serpent","The rival's door",{act:"sex, vaginal, standing sex, against door, leg up, creampie",ex:"guilty, flushed, eager expression, biting her lip",
  pose:"standing against a door with one leg hooked high",pc:"dominant, knowing smirk",w1:{legwear:["thigh-high stockings","@dark"]},
  blurb:"Pinned against the door of the rival she swore she hated, while her boyfriend calls.",
  scene:`Just inside the door of a dark apartment, the woman is pressed against the door by {partner}, the rival she swore she hated, her coat and dress dropped on the floor and one leg hooked high around {his} hip. {His} thick, veiny {cock} is buried deep in her vagina, thrusting hard with motion lines, while she clings to {his} shoulders and pulls {him} closer. On the floor her phone lights up with an incoming call from "Babe ♡" over a lock-screen photo of her and her boyfriend. She glances at it with a guilty, flushed face, bites her lip, looks away and gasps "Don't stop... just don't stop♡" in a speech bubble. Cum drips down her inner thigh. Lewd sound effects. ${TAIL}, standing sex, against door, leg up, phone, incoming call, guilty, blush, biting lip, cum in pussy, motion lines, speech bubble, sweat, night`}],
["kitchen","badger","dragon","Just this once",{act:"sex, vaginal, sex from behind, bent over, ass grab, creampie",ex:"guilty, flushed, eager expression, biting her lip",
  pose:"bending over a kitchen counter, looking back",pc:"hungry, possessive stare",w1:{neckAccessory:["locket necklace","@metal"]},
  blurb:"Bent over her own kitchen counter, under the couple photo on the fridge, while her boyfriend texts that he's nearly home.",
  scene:`In her own cozy kitchen, with a photo of her and her boyfriend stuck to the fridge and his apron hanging on a hook, the woman is bent over the flour-dusted counter by {partner}, her clothes scattered across the floor. {Partner} fucks her from behind, gripping her hips, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, her breasts swaying over the counter. She looks back over her shoulder with a guilty, flushed, eager face, biting her lip, and whispers "Just this once... please, harder♡" in a speech bubble, pushing her hips back against {him}. Her phone buzzes beside a half-iced cake with a text from her boyfriend: "home in 20 min ♡". Wet slapping sound effects. ${TAIL}, sex from behind, bent over, kitchen, counter, ass grab, photo (object), phone, text message, looking back, guilty, blush, biting lip, cum in pussy, motion lines, speech bubble, sweat`}],
["cardtable","raven","fox","The bet",{act:"sex, vaginal, missionary, on table, leg lock, kiss, creampie",ex:"guilty, flushed smile",
  pose:"lying back across a card table, legs wrapped around her lover",pc:"dominant, knowing smirk",w1:{legwear:["sheer thigh-highs","@dark"]},
  blurb:"Across a felt card table in a gambling den's back room, paying off a bet her boyfriend will never hear about.",
  scene:`In the candlelit back room of a gambling den, the woman lies back across a green felt card table among scattered chips and cards, her dress pooled on the floor and her legs wrapped tight around {partner}'s waist. {Partner} leans over her and fucks her on the table, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, chips spilling to the floor with every thrust. Beside her head, her phone shows a text from her boyfriend: "where are you?". She turns it face down with a guilty, flushed smile, pulls {partner} down into a kiss and breathes "I lost the bet... so take your prize♡" in a speech bubble. Cum overflows from her vagina onto the felt. Lewd sound effects. ${TAIL}, missionary, on table, leg lock, kiss, poker chip, playing card, phone, text message, guilty, blush, smile, cum in pussy, cum overflow, motion lines, speech bubble, sweat, candlelight`}],
["portrait","serpent","griffin","He'll never know",{act:"sex, vaginal, cowgirl position, girl on top, grinding, creampie",ex:"guilty, defiant smirk with flushed cheeks",
  pose:"riding on top, hands braced on her lover's chest",pc:"gritted-teeth grimace of pleasure",w1:{legwear:["garter-strap stockings with lace tops","@dark"]},
  blurb:"Riding the hero she always sneered at, in her own bed, and turning her boyfriend's portrait face down.",
  scene:`In her own silk-draped bedroom, beside a framed portrait of her and her boyfriend on the nightstand, the woman rides {partner} cowgirl style, the hero she always sneered at, her hands braced on {his} chest and her boyfriend's suit jacket hanging over a chair. {His} thick, veiny {cock} is buried to the hilt in her vagina as she grinds down on it with motion lines, her breasts bouncing. She looks down at {him} with a flushed, guilty, defiant smirk, reaches over to turn the portrait face down, and purrs "He'll never know... so cum inside♡" in a speech bubble. Cum overflows from her vagina down {his} {cock}. Lewd sound effects. ${TAIL}, cowgirl position, girl on top, grinding, picture frame, photo (object), guilty, smirk, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["phonecall","wolf","swan","On the phone",{act:"sex, vaginal, missionary, legs over shoulders, deep penetration, creampie",ex:"flushed, guilty face with her eyes rolling up",
  pose:"lying on her back with her legs over her lover's shoulders, phone to her ear",pc:"dominant, knowing smirk",w1:{heldItem:["smartphone pressed to her ear","-"]},
  blurb:"Taking her boyfriend's call in a hotel suite and trying to sound normal while she's fucked deep and slow.",
  scene:`In a white-and-gold luxury hotel suite, the woman lies on her back across the bed with her legs over {partner}'s shoulders while {he} fucks her deep and slow, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines. She holds her phone to her ear on a call with her boyfriend, trying to sound normal, her other hand clamped over her own mouth to muffle her moans, her face flushed and guilty and her eyes rolling up. The phone's speech bubble says "babe? you sound out of breath..." and she answers in a shaky bubble "j-just got back from a run♡". {Partner} smirks and thrusts harder. Cum leaks from her vagina onto the sheets. Muffled lewd sound effects. ${TAIL}, missionary, legs over shoulders, deep penetration, phone call, holding phone, hand over own mouth, covering own mouth, guilty, blush, rolling eyes, cum in pussy, motion lines, speech bubble, sweat`}],
["dressingroom","swan","wolf","Dressing room",{act:"sex, vaginal, sex from behind, standing sex, bent over, creampie",ex:"guilty, flushed, eager expression, biting her lip",
  pose:"bending over a dressing table in front of a mirror",pc:"feral, hungry grin",w1:{legwear:["satin pointe shoes with ribbons laced up the ankles","pale pink"]},
  blurb:"Bent over her dressing table after the performance, beside her boyfriend's bouquet.",
  scene:`Backstage in a ballet dressing room after a performance, surrounded by bulb-lit mirrors, the woman is bent over the dressing table by {partner}, her stage costume tossed aside and her pointe shoes still laced on. {Partner} fucks her from behind, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, rattling the makeup brushes. On the table sits a huge bouquet of roses from her boyfriend with a card reading "To my prima ♡". She watches herself in the mirror with a flushed, guilty, hungry face, biting her lip, and moans "Not here... no, don't you dare stop♡" in a speech bubble, pushing back against {him}. Cum drips down her thighs. Lewd sound effects. ${TAIL}, sex from behind, standing sex, bent over, dressing room, vanity mirror, reflection, bouquet, rose, pointe shoes, guilty, blush, biting lip, cum in pussy, motion lines, speech bubble, sweat`}],
["study","dragon","raven","The scholar's desk",{act:"sex, vaginal, sex on desk, leg lock, collar grab, creampie",ex:"guilty, defiant smirk with flushed cheeks",
  pose:"sitting on the edge of a desk, legs locked around her lover",pc:"gritted-teeth grimace of pleasure",w1:{neckAccessory:["initial pendant necklace","@metal"]},
  blurb:"On a scholar's cluttered desk, her boyfriend's initial swinging on a pendant between her breasts.",
  scene:`In a book-lined study lit by a green banker's lamp, the woman sits on the edge of a cluttered desk with her legs locked around {partner}'s waist, papers and open books scattered beneath her, and pulls {him} in by the collar. {Partner} fucks her on the desk, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, books tumbling to the floor. A pendant engraved with her boyfriend's initial swings between her bouncing breasts. Her fierce glare has melted into a flushed, guilty, hungry look, and she growls "Shut up and keep going... I chose this♡" in a speech bubble. Cum overflows from her vagina onto the papers. Lewd sound effects. ${TAIL}, sex on desk, sitting on desk, leg lock, collar grab, pendant, book, desk lamp, guilty, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["photoshoot","stag","lovebird","After the shoot",{act:"sex, vaginal, missionary, leg lock, creampie",ex:"guilty, flushed smile",
  pose:"lying back on a velvet chaise, legs wrapped around her lover",pc:"lustful, half-lidded stare",w1:{legwear:["lace-top stockings","@c1"]},
  blurb:"On a velvet chaise in a photo studio after hours, the camera still firing on its timer.",
  scene:`In a photo studio after hours, under softboxes and a seamless backdrop, the woman lies back on a velvet chaise with {partner} between her thighs, a camera on a tripod blinking as it fires on a timer. {Partner} fucks her missionary on the chaise, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines, flashes going off around them. Her phone on the floor shows a lock-screen photo of her smiling with her boyfriend. She wraps her long legs around {partner} and pulls {him} deeper with a dreamy, guilty, flushed smile, whispering "Just one more shot... inside me♡" in a speech bubble. Cum overflows from her vagina onto the velvet. Camera shutter sound effects. ${TAIL}, missionary, chaise longue, leg lock, photo studio, camera, tripod, camera flash, phone, lock screen, guilty, blush, smile, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["shower","shark","badger","Beach house shower",{act:"sex, vaginal, standing sex, carrying, against wall, leg lock, kiss, creampie",ex:"guilty, flushed smile",
  pose:"being held up against a shower wall, legs locked around her lover",pc:"lustful, half-lidded stare",w1:{neckAccessory:["shark-tooth pendant on a cord","-"]},
  blurb:"Held up against the tiles of a beach-house shower, wearing the necklace her boyfriend gave her.",
  scene:`In the steamy glass shower of a beach house, water streaming over them, {partner} lifts the woman against the tiled wall and fucks her standing, her legs locked around {his} waist and her arms around {his} neck. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines and splashing water. Around her neck swings the shark-tooth pendant her boyfriend gave her, and his towel hangs on the door. She grins guiltily, cheeks flushed, and pants "Bad idea... best idea♡" in a speech bubble, pulling {partner} into a wet kiss. Cum drips down her thighs and swirls into the drain. Splashing sound effects. ${TAIL}, shower, steam, wet, standing sex, carrying, against wall, leg lock, kiss, necklace, guilty, grin, blush, cum in pussy, motion lines, speech bubble`}],
["hottub","penguin","shark","Hot tub",{act:"sex, vaginal, straddling, sitting on lap, kiss, creampie",ex:"guilty, flushed smile",
  pose:"straddling her lover's lap in a hot tub",pc:"hungry, possessive stare",w1:{},
  blurb:"Riding in the lodge hot tub in the snow while her boyfriend sleeps on the couch inside.",
  scene:`In a steaming outdoor hot tub on the deck of a snowed-in ski lodge at night, the woman sits in {partner}'s lap facing {him}, riding {him} in the bubbling water, her arms around {his} neck and her breasts pressed to {his} chest. {His} thick, veiny {cock} is buried to the hilt in her vagina as she bounces with motion lines and splashing steam. Behind her, a warm-lit lodge window shows her boyfriend asleep on the couch inside. She glances back at the window with a guilty, flushed giggle, then turns and kisses {partner}, whispering "Shh... warm me up quick♡" in a speech bubble. Snow falls into the steam. Splashing sound effects. ${TAIL}, hot tub, steam, snow, night, straddling, sitting on lap, partially submerged, wet, window, kiss, guilty, blush, giggling, cum in pussy, motion lines, speech bubble`}],
["masquerade","fox","stag","Masquerade coat room",{act:"sex, vaginal, sex from behind, standing sex, creampie",ex:"guilty, defiant smirk with flushed cheeks",
  pose:"leaning against a coat rack, bent forward",pc:"hungry, possessive stare",w1:{maskAccessory:["fox-face masquerade mask","@c1"]},
  w2:{maskAccessory:["black domino masquerade mask","black"]},
  blurb:"In the coat room of a masquerade ball, masked, while her boyfriend calls for her just outside the door.",
  scene:`In the dim coat room of a masquerade ball, the woman leans against a rack of fur coats in a fox-face masquerade mask, her gown pooled at her ankles, as {partner} fucks her from behind, standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, the coats swaying around them. Through the door comes her boyfriend's voice in an off-screen speech bubble: "Has anyone seen my date?". She bites her lip behind the mask with a sly, guilty, flushed grin, reaches back to pull {partner} closer, and whispers "Faster, before he finds us♡" in a speech bubble. Cum drips down her thighs. Muffled music and lewd sound effects. ${TAIL}, sex from behind, standing sex, masquerade mask, fox mask, coat rack, masquerade, off-screen, guilty, smirk, biting lip, blush, cum in pussy, motion lines, speech bubble, sweat`}],
["cabana","lovebird","flamingo","Cabana",{act:"sex, vaginal, missionary, leg lock, creampie",ex:"bubbly, guilty grin",
  pose:"lying back on a daybed, ankles hooked behind her lover",pc:"lustful, half-lidded stare",w1:{thighAccessory:["lace thigh garter","@accent"],headwear:["ribbon bows tied at the twintails","@accent"]},
  blurb:"On a cabana daybed behind billowing curtains while her boyfriend texts from the beach bar.",
  scene:`Inside a resort cabana with sheer curtains billowing in the sea breeze, the woman lies back on a white daybed with her legs around {partner} as {he} fucks her missionary, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines. Her phone buzzes on the daybed with a text from her boyfriend at the beach bar: "got you a drink babe ♡". She glances at it with a bubbly, guilty grin while hooking her ankles behind {partner}'s back to pull {him} deeper, and giggles "He's bringing me a drink~ cum before he gets here♡" in a speech bubble. Cum overflows from her vagina onto the daybed. Ocean and lewd sound effects. ${TAIL}, missionary, daybed, cabana, curtains, leg lock, beach, tropical, phone, text message, guilty, smile, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["backseat","flamingo","penguin","Back seat",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"flushed, guilty face with her eyes rolling up",
  pose:"riding on top in a cramped back seat, hands on the fogged window",pc:"gritted-teeth grimace of pleasure",w1:{legwear:["sheer stockings","@dark"]},
  blurb:"Fogging up a car's back seat in a parking garage while her boyfriend's call rings out on the dashboard.",
  scene:`In the back seat of a car in a dim parking garage, the windows fogged with steam, the woman rides {partner} cowgirl style, her head bowed under the low roof and one hand pressed to the fogged glass, leaving a handprint. {His} thick, veiny {cock} is buried to the hilt in her vagina as she bounces with motion lines, the car rocking. On the dashboard her phone buzzes with a call from "My love ♡", and a little couple charm swings from the mirror. She looks at it with a flushed, guilty face, lets it ring, and moans "Let it ring... cum for me♡" in a speech bubble. Cum overflows from her vagina. Creaking and lewd sound effects. ${TAIL}, car interior, back seat, fogged glass, handprint, cowgirl position, girl on top, phone, incoming call, guilty, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["yacht","kraken","serpent","The other captain",{act:"sex, vaginal, sex from behind, standing sex, bent over, creampie",ex:"guilty, defiant smirk with flushed cheeks",
  pose:"bending over a yacht's railing at night, looking back",pc:"dominant, knowing smirk",w1:{},
  blurb:"Bent over the railing of another man's yacht at night, while her captain's ship sounds its horn across the harbor.",
  scene:`On the deck of a sleek private yacht anchored in a moonlit harbor, the woman bends over the polished railing while {partner} takes her from behind, her long hair blowing in the sea wind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Across the dark water her boyfriend's ship sits at the pier with its cabin light on, and its horn sounds low across the harbor; she glances toward it with a guilty, defiant smirk, then looks back at {partner} and purrs "He'll be at sea for months... don't stop♡" in a speech bubble, as {he} cums inside her and cum drips down her thighs onto the deck. Lewd sound effects. ${TAIL}, yacht, boat, deck, railing, harbor, night, moonlight, ocean, wind, sex from behind, standing sex, bent over, looking back, smirk, blush, cum in pussy, cum drip, motion lines, speech bubble, sweat`}],
["lodge","salmon","wolf","The fishing lodge",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"guilty, flushed smile",
  pose:"riding on top on a bearskin rug by a lodge fire, phone in hand",pc:"feral, hungry grin",w1:{earAccessory:["large hoop earrings","@metal"]},
  blurb:"A \"photoshoot weekend\" at a mountain fishing lodge, riding the ranger by the fire while her sushi chef texts her a photo of the season's first salmon.",
  scene:`In a log-walled fishing lodge in the mountains at night, rods and nets hung on the walls and a fire roaring in the stone hearth, the woman rides {partner} on a thick rug in front of the fire, her long salmon hair swinging down her freckled back. {His} thick, veiny {cock} is buried to the hilt in her vagina as she grinds down on {him} with motion lines, her heavy breasts bouncing. Her phone glows in her hand with a text from her boyfriend and a photo of a gleaming salmon on his counter: "First salmon of the season! Saved you the best cut♡". She bites her lip with a guilty, flushed smile, turns the phone face down on {his} chest and keeps riding, moaning "Don't you dare stop" in a speech bubble, as {he} cums inside her and cum drips down onto the rug. Lewd sound effects. ${TAIL}, cabin, log cabin, fireplace, fire, rug, night, fishing rod, cowgirl position, girl on top, phone, cellphone, text message, holding phone, biting lip, blush, cum in pussy, cum drip, motion lines, speech bubble, sweat`}],
["telescope","crow","raven","Under the telescope",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"guilty, flushed, eager expression, biting her lip",
  pose:"riding on top beneath a great telescope",pc:"lustful, half-lidded stare",w1:{},
  blurb:"Riding the stargazer under the observatory dome, while the pocket watch her watchmaker made for her ticks on the floor beside them.",
  scene:`Under the open dome of an old observatory at night, the great brass telescope pointed at a sky full of stars, the woman rides {partner} on a blanket on the observatory floor, her long ink-blue hair spilling down her back in the starlight. {His} thick, veiny {cock} is buried to the hilt in her vagina as she bounces on {him} with motion lines. Beside them on the floorboards lies the little silver pocket watch her boyfriend made for her with his own hands, lid open, engraved "Forever yours", still ticking. She glances at it, bites her lip with a guilty, flushed, eager look, then reaches over and snaps it shut, moaning "Just tonight... don't stop♡" in a speech bubble, as {he} cums inside her and cum overflows from her vagina. Lewd sound effects. ${TAIL}, observatory, telescope, dome, night, starry sky, stars, blanket, cowgirl position, girl on top, pocket watch, engraving, biting lip, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}]
  ];;
  const ORD=h=>ACAD.HOUSES.indexOf(h);AF.sort((a,b)=>ORD(a[1])-ORD(b[1]));
  START.add("Academy Affairs",AF.map(([key,h,ph,name,x])=>{
    const m=ph+"man",mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const w1i=Object.assign({},RING,x.w1||{});
    const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},AROUSE,{expression:x.ex,posture:x.pose});
    const w1={name:"Affair",look:"boudoir",f:w1i},w2={name:"Affair",look:"boudoir",m:x.w2||{},f:x.w2||{}};
    return{id:"affair"+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Affair",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:["affair","cheating","explicit","sex","pair",h,ph],
      blurb:`${x.blurb} ${cap(h)} with the ${mt?mt.name:cap(ph)+" boyfriend"}; switch either character in the Scene tab and the scene follows.`};
  }),{after:"Academy Depraved"});
  const bad=[];
  AF.forEach(([k,h,ph,n,x])=>{[x.w1,x.w2].forEach(o=>Object.entries(o||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")}));
    [["expression",x.ex],["posture",x.pose],["expression",x.pc]].forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("affair scene: "+m);try{console.warn("[affairs] "+m)}catch(e){}});
})();

/* ---- v138 (v151: Salmon with Shark, Crow with Fox): "Academy NTR". One explicit single scene per girl (house order): she is taken from her boyfriend by
   another house's man (a different one from her Affairs partner) and she chooses it. She is plainly willing and
   says so; the "netorare" is aimed at the absent boyfriend: a video call, his point of view at the door, his ring,
   his gifts, a breakup note, a selfie sent to him. He is never a third figure in the image (the Scene tab draws two),
   only the viewer, a voice, a screen or an object. Built like Affairs: swappable, scene outfits in tones, pair.c1 /
   pair.pc, a woman partner written as a futanari, and held back by the safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1);
  START.option("posture","riding on top in a captain's bed, a ship in a bottle in hand","Explicit (adult)");
  const GX="Explicit (adult)";
  START.item("ringAccessory","matching couple ring","CU","casual,glam");
  START.item("ringAccessory","engagement ring with a large diamond","CU","glam");
  START.item("heldItem","wooden ruler","C","casual");
  START.item("heldItem","red lipstick tube","CU","glam");
  START.item("headwear","red Santa hat with a white pom-pom","CU","costume");
  const opt=(f,list)=>list.forEach(v=>START.option(f,v,GX));
  opt("expression",["flushed, apologetic but blissful smile","smug, teasing smile","cold, satisfied smirk","lewd, triumphant grin with her tongue out","blissed-out, heart-eyed smile"]);
  opt("posture",["riding on top, facing a propped-up tablet","kneeling on all fours on the bed, looking back at the viewer","kneeling with a ruler held up beside her lover",
    "bending over the bed, pulling a ring off her finger","kneeling on all fours in front of a mirror, phone held up","standing with one leg lifted, showing off her body writing",
    "lying back across a dinner table","bending over a packed suitcase","riding in reverse on a hotel bed, phone in hand","lying on her back under a Christmas tree",
    "lying on her back with her ringed hand laced with her lover's","bracing herself against a mirror in a bridal veil","leaning against a mirror, writing on it in lipstick"]);
  /* v151: Salmon and Crow */
  opt("posture",["lying back on a sushi counter, phone held up for a selfie","riding on top on a hotel bed, admiring a diamond on her finger"]);
  opt("bodyMarkings",["body writing reads 'NOT HIS ANYMORE♡' across her stomach, with tally marks on her thigh and a heart drawn over her womb"]);

  const AROUSE={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};   /* v139: cum and fluids, no smudged makeup or marks */
  const RING={ringAccessory:["matching couple ring","@metal"]};
  const TAIL="netorare, cheating (relationship), infidelity";
  /* [key, girl, partner house, name, scene] */
  const NT=[
["videocall","griffin","dragon","Breaking up on camera",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"flushed, apologetic but blissful smile",
  pose:"riding on top, facing a propped-up tablet",pc:"dominant, knowing smirk",w1:{legwear:["thigh-high stockings","@dark"]},
  blurb:"Riding him on a video call with her boyfriend, and breaking up with him mid-ride.",
  scene:`In a dim bedroom, the woman rides {partner} cowgirl style, facing a tablet propped on the nightstand that shows a video call with her shocked boyfriend in a small window. {Partner}'s huge, veiny {cock} is buried to the hilt in her vagina as she bounces on it with motion lines, {his} hands gripping her hips. She looks into the camera with a flushed, apologetic but blissful smile and says "I'm sorry... it's over between us. I belong to {him} now♡" in a speech bubble, as cum overflows from her vagina down {his} {cock}. The call screen shows "REC" and a red dot. Lewd sound effects. ${TAIL}, video call, tablet, screen, cowgirl position, girl on top, looking at screen, breakup, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["doorway","badger","serpent","Welcome home",{act:"sex, vaginal, doggystyle, sex from behind, looking at viewer, creampie",ex:"flushed, apologetic but blissful smile",
  pose:"kneeling on all fours on the bed, looking back at the viewer",pc:"cold, satisfied smirk",w1:{neckAccessory:["heart pendant necklace","@metal"]},
  blurb:"Seen from her boyfriend's eyes at the bedroom door: on all fours in their bed with another man, and not stopping.",
  scene:`Seen from the open doorway of her own bedroom, through her boyfriend's eyes as he comes home, the woman is on all fours in their bed with {partner} fucking her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, the couple photo on the nightstand knocked over. She looks back at the viewer with a flushed, apologetic but blissful smile, still pushing her hips back against {partner}, and says "Welcome home... sorry, I belong to {him} now♡" in a speech bubble, while {partner} smirks at the viewer over her back. Cum drips from her vagina onto the sheets. Lewd sound effects. ${TAIL}, pov, doorway, looking at viewer, looking back, doggystyle, sex from behind, all fours, bed, picture frame, blush, cum in pussy, motion lines, speech bubble, sweat`}],
["ruler","raven","wolf","The comparison",{act:"licking penis, fellatio, handjob, size difference",ex:"smug, teasing smile",
  pose:"kneeling with a ruler held up beside her lover",pc:"dominant, knowing smirk",w1:{heldItem:["wooden ruler","-"]},
  blurb:"Measuring her new lover with a ruler beside a photo of her boyfriend, and letting the numbers speak.",
  scene:`On a rumpled bed, the woman kneels between {partner}'s legs holding a wooden ruler up against {his} huge, veiny, erect {cock}, which runs far past the end of it, while a framed photo of her and her boyfriend lies beside her for comparison. She licks up the length with a smug, teasing smile and heart-shaped pupils, her phone showing a sent photo of the ruler in a chat with her boyfriend, and says "The results are conclusive... you lose♡" in a speech bubble. Precum and drool glisten on her tongue. Lewd sound effects. ${TAIL}, size difference, ruler, measuring, licking penis, fellatio, handjob, picture frame, phone, tongue out, smug, heart-shaped pupils, speech bubble, sweat`}],
["ringdrop","serpent","dragon","Dropping the ring",{act:"sex, vaginal, sex from behind, bent over, doggystyle, creampie",ex:"cold, satisfied smirk",
  pose:"bending over the bed, pulling a ring off her finger",pc:"gritted-teeth grimace of pleasure",w1:{legwear:["garter-strap stockings with lace tops","@dark"]},
  blurb:"Bent over a penthouse bed, pulling off her boyfriend's ring and letting it fall.",
  scene:`In a penthouse bedroom with the city glittering behind the glass, the woman is bent over the bed while {partner} fucks her from behind, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines. She holds up her hand, slides her boyfriend's couple ring off her finger with a cold, satisfied smirk and lets it fall to the floor, where it bounces beside a crumpled photo of the two of them, and says "I don't need this anymore♡" in a speech bubble. Cum overflows from her vagina down her thighs. Lewd sound effects. ${TAIL}, sex from behind, bent over, doggystyle, ring, falling, removing ring, photo (object), cityscape, night, smirk, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["selfie","wolf","fox","The selfie",{act:"sex, vaginal, doggystyle, sex from behind, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"kneeling on all fours in front of a mirror, phone held up",pc:"dominant, knowing smirk",w1:{heldItem:["smartphone held up for a selfie","-"]},
  blurb:"A doggystyle mirror selfie sent straight to her boyfriend: 'found someone better'.",
  scene:`In a hotel room, the woman is on all fours on the bed in front of a full-length mirror while {partner} fucks her from behind, and she holds up her phone to take a mirror selfie of it. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. The phone screen shows the photo sent in a chat with her boyfriend, captioned "found someone better ;)" and marked read. She grins at her reflection, tongue out, flashing a peace sign with her free hand, and says "Hope he's watching♡" in a speech bubble as cum drips from her vagina. Lewd sound effects. ${TAIL}, mirror, reflection, selfie, holding phone, text message, doggystyle, sex from behind, all fours, v, tongue out, grin, blush, cum in pussy, motion lines, speech bubble, sweat`}],
["marked","swan","shark","Not his anymore",{act:"sex, vaginal, standing sex, sex from behind, leg lift, creampie",ex:"blissed-out, heart-eyed smile",
  pose:"standing with one leg lifted, showing off her body writing",pc:"lustful, half-lidded stare",
  c1:{bodyMarkings:"body writing reads 'NOT HIS ANYMORE♡' across her stomach, with tally marks on her thigh and a heart drawn over her womb"},w1:{legwear:["sheer stockings","@dark"]},
  blurb:"Fucked standing with one leg lifted to show off the body writing: 'NOT HIS ANYMORE'.",
  scene:`In a bright bedroom, {partner} holds one of the woman's legs up high and fucks her standing from behind, putting her body on show to the viewer. Lewd body writing across her stomach reads "NOT HIS ANYMORE♡", with tally marks down her thigh and a heart drawn over her womb, and her boyfriend's photo lies face down on the dresser. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She gazes at the viewer with a blissed-out, heart-eyed smile and makes a heart with her hands, saying "Look how happy I am now♡" in a speech bubble, as cum overflows from her vagina down her raised leg. Lewd sound effects. ${TAIL}, standing sex, sex from behind, leg lift, standing on one leg, body writing, tally, womb tattoo, heart hands, looking at viewer, heart-shaped pupils, blush, smile, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["anniversary","dragon","wolf","Anniversary dinner",{act:"sex, vaginal, missionary, on table, leg lock, creampie",ex:"cold, satisfied smirk",
  pose:"lying back across a dinner table",pc:"feral, hungry grin",w1:{neckAccessory:["pearl necklace","-"]},
  blurb:"The anniversary dinner she cooked for her boyfriend, and another man taking her across the table.",
  scene:`In a candlelit dining room set for an anniversary dinner, the woman lies back across the table among scattered plates, spilled wine and a smeared cake iced "Happy Anniversary ♡", her legs locked around {partner}'s waist as {he} fucks her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, candles wobbling with every thrust, and her boyfriend's chair sits empty at the end of the table. She grabs {partner} by the hair, pulls {him} down and smirks "He's late. His loss♡" in a speech bubble. Cum overflows from her vagina onto the tablecloth. Lewd sound effects. ${TAIL}, sex on table, missionary, leg lock, dining table, candlelight, cake, wine glass, spilled drink, empty chair, smirk, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["suitcase","stag","fox","Moving out",{act:"sex, vaginal, sex from behind, bent over, creampie",ex:"blissed-out, heart-eyed smile",
  pose:"bending over a packed suitcase",pc:"dominant, knowing smirk",w1:{legwear:["lace-top stockings","@c1"]},
  blurb:"Bent over her packed suitcase on the way out the door, a breakup note on the table.",
  scene:`In the hallway of the apartment she shares with her boyfriend, the woman is bent over her packed suitcase by the front door while {partner} fucks her from behind, {his} thick, veiny {cock} buried to the hilt in her vagina with motion lines. On the side table, beside her house key, lies a handwritten note: "I'm sorry. I belong to {him} now." She looks back at {partner} with a dreamy, blissed-out, heart-eyed smile and says "Take me home with you♡" in a speech bubble, as cum drips down her thighs onto the suitcase. Lewd sound effects. ${TAIL}, sex from behind, bent over, suitcase, luggage, note, key, hallway, front door, looking back, heart-shaped pupils, blush, smile, cum in pussy, motion lines, speech bubble, sweat`}],
["missedcalls","shark","serpent","37 missed calls",{act:"sex, vaginal, reverse cowgirl position, girl on top, creampie",ex:"smug, teasing smile",
  pose:"riding in reverse on a hotel bed, phone in hand",pc:"cold, satisfied smirk",w1:{legwear:["fishnet thigh-high stockings","@dark"]},
  blurb:"Riding in reverse in a hotel bed, waving a phone with 37 missed calls from her boyfriend.",
  scene:`On a hotel bed at night, the woman rides {partner} in reverse cowgirl, facing the viewer, and holds up her phone to show its screen: "37 missed calls: Babe ♡". {His} thick, veiny {cock} is buried to the hilt in her vagina as she bounces with motion lines, {his} hands on her hips. She grins with her sharp teeth, a smug, teasing smile, and says "Oops~ I'm busy♡" in a speech bubble, tossing the phone onto the pillows. Cum overflows from her vagina down {his} {cock}. Lewd sound effects. ${TAIL}, reverse cowgirl position, girl on top, phone, missed call, holding phone, looking at viewer, grin, sharp teeth, smug, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["christmas","penguin","dragon","Christmas Eve",{act:"sex, vaginal, missionary, mating press, creampie",ex:"blissed-out, heart-eyed smile",
  pose:"lying on her back under a Christmas tree",pc:"gritted-teeth grimace of pleasure",w1:{headwear:["red Santa hat with a white pom-pom","red"],legwear:["sheer stockings","@dark"]},
  blurb:"Under the Christmas tree on Christmas Eve, the presents for her boyfriend crushed beneath her.",
  scene:`On Christmas Eve, beneath a glowing Christmas tree, the woman lies on her back on the rug in a Santa hat while {partner} fucks her in a mating press, crushing the wrapped presents around them, one gift tag reading "To my boyfriend ♡". {His} huge, veiny {cock} is buried to the hilt in her vagina with motion lines, the tree lights twinkling. She smiles up at {partner} with blissed-out, heart-shaped eyes and says "Best present ever... the rest can wait♡" in a speech bubble, as cum overflows from her vagina onto the gift wrap. Snow falls outside the window. Lewd sound effects. ${TAIL}, christmas, christmas tree, santa hat, gift, gift box, christmas lights, missionary, mating press, heart-shaped pupils, blush, smile, cum in pussy, cum overflow, motion lines, speech bubble, sweat, night`}],
["proposal","fox","lovebird","She said yes this morning",{act:"sex, vaginal, missionary, interlocked fingers, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"lying on her back with her ringed hand laced with her lover's",pc:"dominant, knowing smirk",ring:"engagement",
  blurb:"Engaged this morning, and in another man's bed tonight, the new ring on the hand she laces with his.",
  scene:`In a luxury bed, the woman lies on her back while {partner} fucks her missionary, their fingers interlocked on the pillow beside her head, the engagement ring her boyfriend gave her this morning glinting on her finger. An open ring box sits on the nightstand. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She grins with her tongue out, eyes rolling up, and says "I said yes to him this morning... and yes to you tonight♡" in a speech bubble, as cum overflows from her vagina onto the sheets. Lewd sound effects. ${TAIL}, missionary, interlocked fingers, holding hands, engagement ring, ring box, bed, tongue out, rolling eyes, blush, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["bridal","lovebird","wolf","The dress fitting",{act:"sex, vaginal, standing sex, sex from behind, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"bracing herself against a mirror in a bridal veil",pc:"feral, hungry grin",ring:"engagement",
  w1:{headwear:["cathedral-length veil","white"],thighAccessory:["lace thigh garter","white"],legwear:["lace-top stockings","white"]},
  blurb:"In a bridal boutique fitting room, in her veil and garter, a week before the wedding.",
  scene:`In the fitting room of a bridal boutique, the woman braces herself against a frilly boutique mirror wearing a long wedding veil, a lace garter and white stockings, her wedding dress pooled around her ankles, as {partner} fucks her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, her engagement ring pressed to the glass. A card tucked in the mirror frame reads "Fitting: one week before the wedding ♡". She grins at her reflection with her tongue out and says "Something new for the bride♡" in a speech bubble, as cum drips down her stockings. Lewd sound effects. ${TAIL}, bride, wedding veil, bridal garter, white thighhighs, engagement ring, fitting room, mirror, reflection, standing sex, sex from behind, tongue out, grin, blush, cum in pussy, motion lines, speech bubble, sweat`}],
["lipstick","flamingo","shark","Goodbye in lipstick",{act:"sex, vaginal, standing sex, sex from behind, against mirror, creampie",ex:"blissed-out, heart-eyed smile",
  pose:"leaning against a mirror, writing on it in lipstick",pc:"lustful, half-lidded stare",w1:{heldItem:["red lipstick tube","-"]},
  blurb:"Writing her goodbye on the mirror in red lipstick while she's fucked against it.",
  scene:`In a hotel bathroom, the woman leans against the mirror while {partner} fucks her from behind, and with a red lipstick she writes across the glass "BYE BYE BABE ♡", beside a photo of her and her boyfriend tucked into the mirror frame. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, her breasts pressed to the cold glass. She smiles at her reflection with blissed-out, heart-shaped eyes and says "Tell him I'm not coming back♡" in a speech bubble, as cum drips down her thighs onto the tiles. Lewd sound effects. ${TAIL}, mirror, reflection, writing on mirror, lipstick, photo (object), standing sex, sex from behind, against mirror, breasts on glass, heart-shaped pupils, blush, smile, cum in pussy, motion lines, speech bubble, sweat`}],
["bottle","kraken","griffin","Message in a bottle",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"cool, otherworldly half-smile",
  pose:"riding on top in a captain's bed, a ship in a bottle in hand",pc:"gritted-teeth grimace of pleasure",w1:{},
  blurb:"Riding another man in her captain's own bed, rolling a note into his ship in a bottle: \"Don't wait for me♡\".",
  scene:`In her boyfriend's captain's cabin, charts and brass instruments on the walls, the woman rides {partner} in the cowgirl position on the captain's own bed, holding his treasured ship in a bottle in one hand and sliding a rolled-up note into its neck with the other; the note reads "Don't wait for me♡". {His} thick, veiny {cock} is buried to the hilt in her vagina as she grinds down with motion lines, her heavy breasts bouncing. She gives the viewer a cool, otherworldly half-smile and says "Tell the captain he's been replaced♡" in a speech bubble, as cum overflows from her vagina onto his sheets. Lewd sound effects. ${TAIL}, cowgirl position, girl on top, ship in a bottle, bottle, note, cabin, map, bed, smile, looking at viewer, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}],
["catch","salmon","shark","Catch of the day",{act:"sex, vaginal, missionary, on table, selfie, creampie",ex:"smug, teasing smile",
  pose:"lying back on a sushi counter, phone held up for a selfie",pc:"gritted-teeth grimace of pleasure",w1:{},
  blurb:"On the counter of her boyfriend's own sushi bar after closing, taken by the lifeguard and sending him a selfie: \"Found a bigger fish♡\".",
  scene:`After closing in her boyfriend's sushi bar, his knives laid out neatly and his indigo noren hanging in the doorway, the woman lies back on his pale cypress counter with her legs spread and {partner} between them, fucking her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, sending a stack of sushi plates rattling. She holds her phone up for a selfie of the two of them, her boyfriend's chat already open on the screen, and types "Found a bigger fish♡" with a smug, teasing smile at the viewer, as {he} cums inside her and cum drips onto his counter. Lewd sound effects. ${TAIL}, sushi bar, counter, on table, noren, missionary, spread legs, phone, cellphone, selfie, holding phone, smirk, looking at viewer, cum in pussy, cum drip, motion lines, sweat`}],
["diamond","crow","fox","Shinier",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"blissed-out, heart-eyed smile",ring:"engagement",
  pose:"riding on top on a hotel bed, admiring a diamond on her finger",pc:"gritted-teeth grimace of pleasure",w1:{},
  blurb:"She always did love shiny things: riding the gambler in a high-roller suite in the huge diamond he won for her, her watchmaker's pocket watch stopped on the nightstand.",
  scene:`In a high-roller hotel suite at night, the casino's lights glittering through the window, the woman rides {partner} in the cowgirl position on the rumpled bed, holding up her hand to admire the enormous diamond ring {he} won for her at the tables, its facets throwing sparkles across her face. {His} thick, veiny {cock} is buried to the hilt in her vagina as she grinds down with motion lines. On the nightstand lies the little silver pocket watch her boyfriend made for her with his own hands, stopped, beside her phone lit up with his name calling. She lets it ring, gives the viewer a blissed-out, heart-eyed smile and coos "Sorry, it's just... so much shinier♡" in a speech bubble, as cum overflows from her vagina. Lewd sound effects. ${TAIL}, hotel room, night, window, city lights, bed, cowgirl position, girl on top, diamond, ring, engagement ring, sparkle, pocket watch, phone, incoming call, smile, looking at viewer, cum in pussy, cum overflow, motion lines, speech bubble, sweat`}]
  ];;
  const ORD=h=>ACAD.HOUSES.indexOf(h);NT.sort((a,b)=>ORD(a[1])-ORD(b[1]));
  START.add("Academy NTR",NT.map(([key,h,ph,name,x])=>{
    const m=ph+"man",mt=tplById(m),rb=tplById(h+"robes");
    const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
    const ring=x.ring==="engagement"?{ringAccessory:["engagement ring with a large diamond","-"]}:RING;
    const w1i=Object.assign({},ring,x.w1||{});
    const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
    const c1=Object.assign({},AROUSE,x.c1||{},{expression:x.ex,posture:x.pose});
    const w1={name:"Taken",look:"boudoir",f:w1i},w2={name:"Taken",look:"boudoir",m:{},f:{}};
    return{id:"ntr"+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
      outfit:{oname:"Taken",look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
      out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
        pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
      tags:["ntr","netorare","cheating","explicit","sex","pair",h,ph],
      blurb:`${x.blurb} ${cap(h)} with the ${mt?mt.name:cap(ph)+" boyfriend"}; switch either character in the Scene tab and the scene follows.`};
  }),{after:"Academy Affairs"});
  const bad=[];
  NT.forEach(([k,h,ph,n,x])=>{Object.entries(x.w1||{}).forEach(([f,a])=>{if(!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")});
    [["expression",x.ex],["posture",x.pose],["expression",x.pc]].concat(Object.entries(x.c1||{})).forEach(([f,v])=>{if(CHAR[f]&&!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")})});
  bad.forEach(m=>{START.problems.push("ntr scene: "+m);try{console.warn("[ntr] "+m)}catch(e){}});
})();

/* ---- v176: three cheating sets, built like Academy NTR (one explicit single scene per girl, house order):
   "Academy Cheating Brides"      on her wedding day (or its eve, or the honeymoon), with a man who is not the groom
   "Academy Cheating Housewives"  a married woman with the gardener, the neighbor, the husband's boss …
   "Academy NTR Sisters"          she takes her sister's husband, fiancé or boyfriend
   All are adult women, plainly willing, and the man is character 2. The one being cheated on (the groom, the husband,
   the sister) is never drawn: only a voice through a door, a phone, a photo, a ring or a text. Swappable in the Scene tab
   like every scene (a woman picked as partner is written as a futanari), and held back by the safeguard like every
   explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),GX="Explicit (adult)";
  const H=["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","lovebird","flamingo","kraken","salmon","crow","owl","rat"];
  /* outfit pieces these scenes need */
  [["headwear","long sheer bridal veil","CU","glam"],["headwear","short birdcage veil","CU","glam"],["headwear","flower crown with a short bridal veil","CU","cottage,glam"],
   ["headwear","rhinestone tiara with a short bridal veil","CU","glam,costume"],
   ["top","lace wedding gown pulled down off the breasts and hiked up around the waist","L","boudoir,glam"],
   ["top","unzipped wedding gown slipping down to the waist","L","boudoir,glam"],
   ["top","white wedding kimono pushed open off the shoulders","L","cultural,boudoir"],
   ["top","short lace bridal slip pulled down off the breasts","L","boudoir,glam"],
   ["top","bridesmaid dress pulled down to the waist","L","boudoir,glam"],
   ["top","cardigan unbuttoned over bare breasts","L","casual,boudoir"],
   ["top","sundress pulled down to the waist","L","casual,boudoir"],
   ["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],
   ["top","short silk robe hanging open","L","boudoir"],
   ["bottom","skirt hiked up around the waist","L","casual,boudoir"],
   ["bottom","yoga pants pulled down to the thighs","L","sporty,boudoir"],
   ["panties","lace panties pulled aside","L","boudoir"],
   ["panties","lace panties pulled down around one ankle","L","boudoir"],
   ["ringAccessory","gold wedding band","CU","glam,casual"],
   ["ringAccessory","engagement ring with a large diamond","CU","glam"],
   ["gloves","long satin opera gloves","CUS","glam"],
   ["thighAccessory","lace thigh garter","LS","boudoir,glam"],
   ["legwear","lace garter stockings","LS","boudoir"],["top","{c} frilled apron over bare skin","US","costume,cottage"],
   ["neckAccessory","dainty pendant necklace","CU","glam,casual"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));

  const AROUSE={pupilStyle:"heart pupils",blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};
  const EX=["guilty, flushed, blissful smile","biting her lip to stay quiet, eyes rolling back","covering her mouth to stay quiet, eyes rolled up in bliss",
    "breathless, guilty smile with tears of pleasure in her eyes","smug, wicked giggle","teary-eyed, overwhelmed, ecstatic expression","flushed, defiant smirk",
    "dazed, heart-eyed, drooling smile","sweet, innocent smile hiding a wicked glint","lewd, triumphant grin with her tongue out","flushed, apologetic but blissful smile",
    "smug, teasing smile","cold, satisfied smirk","blissed-out, heart-eyed smile"];
  EX.forEach(v=>START.option("expression",v,GX));
  ["dominant, knowing smirk","cold, satisfied smirk","gritted-teeth grimace of pleasure"].forEach(v=>START.option("expression",v,GX));

  /* builder: [key, girl, partner house, name, {act, ex, pose, pc, dir, w1, blurb, scene}] */
  function make(label,after,pre,lewdName,tags,baseW1,list){
    list.forEach(x=>START.option("posture",x[4].pose,GX));
    const ORD=h=>H.indexOf(h);list.sort((a,b)=>ORD(a[1])-ORD(b[1]));
    START.add(label,list.map(([key,h,ph,name,x])=>{
      const m=ph+"man",mt=tplById(m),rb=tplById(ACAD.robes(h))||tplById(h+"robes");
      const T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({},baseW1,x.w1||{});Object.keys(w1i).forEach(k=>{if(!w1i[k])delete w1i[k]});
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const c1=Object.assign({},AROUSE,x.c1||{},{expression:x.ex,posture:x.pose});
      const w1={name:lewdName,look:"boudoir",f:w1i},w2={name:lewdName,look:"boudoir",m:{},f:{}};
      return{id:pre+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname:lewdName,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",
          pair:{id:m,outfit:"scene",scene:x.scene,act:x.act,dir:x.dir||"ba",explicit:true,penis:true,pc:{expression:x.pc,posture:null},c1,w1,w2,compact:false,fit:true}},
        tags:tags.concat(["explicit","sex","pair",h,ph]),
        blurb:`${x.blurb} ${cap(h)} with the ${mt?mt.name:cap(ph)+" boyfriend"}; switch either character in the Scene tab and the scene follows.`};
    }),{after});
    const bad=[];
    list.forEach(([k,h,ph,n,x])=>{Object.entries(Object.assign({},baseW1,x.w1||{})).forEach(([f,a])=>{if(a&&!(OUTFIT[f]||[]).some(i=>i.v===a[0]))bad.push(k+": "+f+" “"+a[0]+"”")});
      [["expression",x.ex],["expression",x.pc]].forEach(([f,v])=>{if(!CHAR[f].some(o=>o[0]===v))bad.push(k+": "+f+" “"+v+"”")});
      if(!tplById(ph+"man"))bad.push(k+": no "+ph+"man")});
    bad.forEach(m=>{START.problems.push(label+": "+m);try{console.warn("["+label+"] "+m)}catch(e){}});
  }

  /* ======================= Cheating Brides ======================= */
  const BT="netorare, cheating (relationship), infidelity, bride, wedding dress, bridal veil, wedding ring";
  const BRIDE={headwear:["long sheer bridal veil","white"],top:["lace wedding gown pulled down off the breasts and hiked up around the waist","white"],
    legwear:["lace garter stockings","white"],thighAccessory:["lace thigh garter","@c1"],ringAccessory:["engagement ring with a large diamond","-"]};
  make("Academy Cheating Brides","Academy NTR","cb","Bride",["cheating","bride","ntr","netorare"],BRIDE,[
["bestman","griffin","wolf","The best man",{act:"sex, vaginal, sex from behind, standing sex, creampie",ex:"biting her lip to stay quiet, eyes rolling back",
  pose:"bending over a vanity table in her wedding gown",pc:"dominant, knowing smirk",
  blurb:"Bent over the vanity in the bridal suite with the best man, minutes before the ceremony, while the groom knocks.",
  scene:`In a grand bridal suite hung with crimson-and-gold banners, minutes before the ceremony, the bride is bent over her vanity table in her wedding gown, the skirt hiked up around her waist and her veil spilling over her back, as {partner}, the best man in his tuxedo, fucks her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, rattling the perfume bottles. In the vanity mirror her face is flushed, biting her lip to stay quiet with her eyes rolling back. A knock at the door and a speech bubble from outside reads "Five minutes, love!" while she gasps "Almost... ready♡". Her bouquet lies crushed on the floor. Cum drips down her garter. Lewd sound effects. ${BT}, bridal suite, vanity, mirror, reflection, bent over, sex from behind, standing sex, skirt lift, tuxedo, bouquet, knocking, speech bubble, blush, cum in pussy, motion lines, sweat`}],
["hayloft","badger","fox","Something borrowed",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"riding on top in a hayloft, one hand over her mouth",pc:"gritted-teeth grimace of pleasure",w1:{headwear:["flower crown with a short bridal veil","@c2"]},
  blurb:"Up in the hayloft of the barn wedding, riding the groomsman while the guests take their seats below.",
  scene:`High in the hayloft of a rustic wedding barn strung with fairy lights, sunflowers and honey-gold light, the bride rides {partner}, one of the groomsmen, cowgirl style in a pile of hay, her lace gown hiked up around her waist and her flower crown slipping. {His} thick, veiny {cock} is buried to the hilt in her vagina as she bounces with motion lines. Through the gaps in the floorboards the guests below are taking their seats in rows of white chairs, and she clamps one hand over her mouth, eyes rolled up in bliss, as the string quartet starts to play. Hay sticks to her stockings and cum overflows from her vagina. Lewd sound effects. ${BT}, barn, hayloft, hay, fairy lights, sunflower, flower crown, cowgirl position, girl on top, hand over own mouth, covering mouth, rolling eyes, cum in pussy, cum overflow, motion lines, sweat`}],
["telescope","raven","serpent","Under the stars",{act:"sex, vaginal, standing sex, sex from behind, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"leaning against a brass telescope, looking back over her shoulder",pc:"cold, satisfied smirk",
  blurb:"On the observatory platform during her starlit wedding night, taken against the telescope by her ex, the groom's texts lighting up her phone.",
  scene:`On the platform of an observatory dome open to a sky thick with stars, where her wedding reception glows below, the bride leans against a great brass telescope as {partner}, her ex, takes her from behind in her lace gown, its train pooled at their feet. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She looks back over her shoulder with a breathless, guilty smile and tears of pleasure in her eyes, while her phone on the railing lights up again and again with the groom's texts: "Where are you? We're cutting the cake!". Starlight glints off her diamond. Cum runs down her inner thighs. Lewd sound effects. ${BT}, observatory, telescope, starry sky, night, standing sex, sex from behind, looking back, phone, text message, tears, cum in pussy, cum drip, motion lines, sweat`}],
["vows","serpent","griffin","Reading the vows",{act:"sex, vaginal, missionary, on bed, creampie",ex:"flushed, defiant smirk",
  pose:"lying on her back on a bridal bed, phone held to her ear",pc:"dominant, knowing smirk",w1:{gloves:["long satin opera gloves","white"]},
  blurb:"On the penthouse bridal bed, rehearsing her vows to the groom over the phone while another man takes her.",
  scene:`In a velvet-draped penthouse bridal suite in moody emerald light, the bride lies on her back across rose petals on the bed, her gown pulled down off her breasts and her legs wrapped around {partner}, who fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She holds her phone to her ear with a satin-gloved hand, reciting her vows to the groom on the other end, and her speech bubble reads "...and I promise to be faithful... ahh♡... always..." with a flushed, defiant smirk up at {partner}. Cum overflows onto the petals. Lewd sound effects. ${BT}, bridal suite, rose petals, bed, on back, missionary, leg lock, phone, talking on phone, elbow gloves, speech bubble, smirk, cum in pussy, cum overflow, motion lines, sweat`}],
["justmarried","wolf","shark","The getaway car",{act:"sex, vaginal, reverse cowgirl position, car sex, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"riding in reverse in the back seat of a car",pc:"gritted-teeth grimace of pleasure",
  blurb:"In the back of the 'Just Married' getaway car at the edge of the forest venue, riding the groom's rival before the send-off.",
  scene:`In the back seat of a vintage getaway car parked at the edge of a moonlit pine forest, a "Just Married" sign and strings of tin cans tied to its bumper, the bride rides {partner} in the reverse cowgirl position, her veil caught on the headrest and her gown bunched around her hips. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines as the car rocks on its springs. Through the fogged rear window the lanterns of the send-off line glow in the distance. She grins at the viewer with her tongue out, lewd and triumphant, fogging the glass with her breath. Cum drips onto the leather seat. Lewd sound effects. ${BT}, car interior, car sex, back seat, just married, tin can, fogged window, night, forest, reverse cowgirl position, tongue out, grin, looking at viewer, cum in pussy, motion lines, sweat`}],
["coatcheck","swan","dragon","First dance",{act:"sex, vaginal, standing sex, leg lift, creampie",ex:"teary-eyed, overwhelmed, ecstatic expression",
  pose:"standing on one leg against a wall of coats, one leg lifted",pc:"dominant, knowing smirk",w1:{gloves:["long satin opera gloves","white"]},
  blurb:"In the coat check during her own first dance song, one leg lifted high, a ballerina to the end.",
  scene:`In the dim coat check room of a candlelit marble ballroom, her first-dance song spilling through the door, the bride stands with her back against a rack of coats, one leg lifted high in a dancer's extension and held by {partner}, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, her lace gown bunched up and her veil tangled in the coats. Her face is teary-eyed, overwhelmed and ecstatic, satin-gloved hands clutching {his} shoulders, while a sliver of the dance floor glows through the half-open door. Cum drips down her standing leg. Lewd sound effects. ${BT}, coat check, coat rack, standing sex, leg lift, standing split, flexible, elbow gloves, ballroom, door ajar, tears, cum in pussy, cum drip, motion lines, sweat`}],
["vestry","dragon","stag","The ex",{act:"sex, vaginal, carrying, against wall, standing sex, creampie",ex:"flushed, defiant smirk",
  pose:"carried against a stone wall, legs wrapped around her lover",pc:"gritted-teeth grimace of pleasure",
  blurb:"Carried against the stone wall of the castle chapel's vestry by the one she was supposed to be over.",
  scene:`In the torchlit stone vestry of a castle chapel, red lanterns flickering and the organ booming through the wall, the bride is carried against the cold stone by {partner}, her ex, her legs wrapped around {his} waist and her gown hiked up. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines as {he} pins her to the wall. She digs her nails into {his} back with a flushed, defiant smirk and her veil askew, her bouquet dropped on a pile of hymn books. Cum drips onto the flagstones. Lewd sound effects. ${BT}, chapel, vestry, stone wall, torch, carrying, against wall, legs around waist, standing sex, nail marks, smirk, bouquet, cum in pussy, cum drip, motion lines, sweat`}],
["arch","stag","kraken","The flower arch",{act:"sex, vaginal, missionary, outdoor sex, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"lying back on a bed of moss and petals",pc:"cold, satisfied smirk",w1:{headwear:["flower crown with a short bridal veil","@c2"]},
  blurb:"Deep in the forest behind her own wedding arch, on a bed of moss and wildflowers, before she ever reaches the altar.",
  scene:`Deep in an enchanted forest at dawn, fireflies drifting and the wedding arch of ivy and wildflowers glimpsed through the trees, the bride lies back on a bed of moss and scattered petals, her boho lace gown pushed up and her flower crown askew, as {partner} fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She gazes up with a dazed, heart-eyed, drooling smile, her bare feet in the moss, while faint harp music drifts from the clearing where the guests wait. Cum overflows onto the petals. Lewd sound effects. ${BT}, forest, outdoors, outdoor sex, moss, flower petals, flower crown, wedding arch, missionary, on back, spread legs, heart-shaped pupils, drooling, cum in pussy, cum overflow, motion lines, sweat`}],
["pier","shark","salmon","Beach wedding",{act:"sex, vaginal, sex from behind, standing sex, outdoor sex, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"bracing herself against a wooden pier post in the surf",pc:"gritted-teeth grimace of pleasure",w1:{headwear:["short birdcage veil","white"]},
  blurb:"Under the pier at her beach wedding, ankle-deep in the surf with the lifeguard, while the ceremony waits in the sun.",
  scene:`Under a wooden pier at a sunny beach wedding, waves crashing around their ankles and the white chairs of the ceremony lined up on the sand beyond, the bride braces herself against a barnacled pier post as {partner}, the lifeguard, takes her from behind, her soaked lace gown clinging and hiked up. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Sea spray glitters in the sunlight between the planks. She looks back at the viewer with a lewd, triumphant grin and her tongue out. Cum drips into the surf. Lewd sound effects. ${BT}, beach, under pier, ocean, waves, splashing, wet clothes, see-through, outdoor sex, standing sex, sex from behind, looking back, tongue out, grin, cum in pussy, cum drip, motion lines, sweat`}],
["snowed","penguin","owl","Winter wedding",{act:"sex, vaginal, missionary, on rug, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"lying back on a fur rug by a crackling fire",pc:"dominant, knowing smirk",
  blurb:"Snowed in at the mountain chapel the night before the wedding, on a fur rug by the fire with the officiant's handsome nephew, while the groom shovels the path outside.",
  scene:`In a snowed-in mountain chapel lodge the night before her winter wedding, snow falling thickly past the frosted windows, the bride lies back on a white fur rug by a crackling fire, her short lace bridal slip pulled down off her breasts and her veil spread around her head like a halo, as {partner} fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Through the frosted window the groom's silhouette shovels the snowy path by lantern light. She looks up with a breathless, guilty smile and tears of pleasure in her eyes, her cheeks flushed from the heat. Cum overflows onto the fur. Lewd sound effects. ${BT}, snow, snowing, winter, cabin, fireplace, fur rug, frosted window, silhouette, missionary, on back, tears, blush, cum in pussy, cum overflow, motion lines, sweat`,
  w1:{top:["short lace bridal slip pulled down off the breasts","white"]}}],
["kitsune","fox","crow","The fox's wedding",{act:"sex, vaginal, mating press, creampie",ex:"sweet, innocent smile hiding a wicked glint",
  pose:"lying folded on a tatami floor, legs pressed back",pc:"gritted-teeth grimace of pleasure",w1:{headwear:null,top:["white wedding kimono pushed open off the shoulders","white"],legwear:null,thighAccessory:null},
  blurb:"A fox's wedding: sun-shower rain on the shrine, and the bride in the storeroom in her white kimono with a trickster.",
  scene:`During a sun-shower at a hillside fox shrine, rain glittering in the sunlight past the glowing torii gates, the bride lies in a dim shrine storeroom on the tatami in her white wedding kimono, pushed open off her shoulders, her white wedding hood fallen beside her, as {partner} pins her in a mating press with her legs pressed back. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She smiles up sweetly and innocently, a wicked glint in her half-lidded eyes, while the procession's paper parasols pass by the shoji screen outside. Cum overflows onto the tatami. Lewd sound effects. ${BT}, shrine, japanese clothes, kimono, white kimono, shiromuku, tatami, shouji, sunshower, rain, torii, mating press, legs up, smile, half-closed eyes, cum in pussy, cum overflow, motion lines, sweat`}],
["bouquet","lovebird","flamingo","Bouquet toss",{act:"sex, vaginal, sitting on counter, legs around waist, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"sitting on a restroom counter with her legs wrapped around her lover",pc:"cold, satisfied smirk",
  blurb:"Sitting on the counter of the pastel bridal restroom, bouquet still in hand, while the bridesmaids call her for the toss.",
  scene:`In the pastel bridal restroom of a wedding hall full of hearts and fairy lights, the bride sits on the marble counter with her legs wrapped around {partner}, her gown pulled down off her breasts, her bouquet still clutched in one hand behind {his} neck. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. In the mirror behind her, her face is a dazed, heart-eyed, drooling smile. A speech bubble from beyond the door reads "Bouquet toss! Where's the bride?!" and petals rain from the trembling bouquet. Cum drips onto the counter. Lewd sound effects. ${BT}, restroom, counter, sitting on counter, mirror, reflection, legs around waist, bouquet, falling petals, heart, fairy lights, heart-shaped pupils, drooling, speech bubble, cum in pussy, motion lines, sweat`}],
["poolboy","flamingo","badger","Honeymoon",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"smug, wicked giggle",
  pose:"riding on top on a poolside lounger",pc:"gritted-teeth grimace of pleasure",w1:{headwear:["short birdcage veil","white"],top:["short lace bridal slip pulled down off the breasts","white"],legwear:null},
  blurb:"Day one of the honeymoon: riding the villa's pool boy on a lounger while her new husband naps in the suite.",
  scene:`On the first morning of her honeymoon at a pink villa with palm trees and a turquoise private pool, the bride rides {partner}, the pool boy, cowgirl style on a striped lounger, wearing nothing but her little birdcage veil and a lace bridal slip pulled down off her breasts. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Behind the sliding glass door of the suite her new husband sleeps face-down, and she gives the viewer a smug, wicked giggle with a finger to her lips. A "Just Married" sash hangs on the lounger. Cum overflows down {his} shaft. Lewd sound effects. ${BT}, honeymoon, poolside, pool, palm tree, lounge chair, sliding door, cowgirl position, girl on top, finger to mouth, shushing, giggling, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`}],
["aquarium","kraken","penguin","Something blue",{act:"sex, vaginal, sex from behind, standing sex, against glass, creampie",ex:"teary-eyed, overwhelmed, ecstatic expression",
  pose:"pressed against an aquarium tank wall",pc:"dominant, knowing smirk",
  blurb:"Her something blue: pressed against the glowing aquarium wall of her own reception hall.",
  scene:`In a dark aquarium hall turned wedding venue, lit only by the shimmering blue of a huge tank where jellyfish drift, the bride is pressed breasts-first against the glass as {partner} takes her from behind, her gown hiked up and her veil floating. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Her breasts squash against the glass and a curious octopus watches from the other side, her face teary-eyed, overwhelmed and ecstatic in the blue light. The empty reception tables glitter behind them. Cum drips down her stockings. Lewd sound effects. ${BT}, aquarium, against glass, breasts on glass, breast press, jellyfish, octopus, blue theme, underwater lighting, standing sex, sex from behind, tears, cum in pussy, cum drip, motion lines, sweat`}],
["rehearsal","salmon","wolf","Rehearsal dinner",{act:"sex, vaginal, bent over, sex from behind, creampie",ex:"biting her lip to stay quiet, eyes rolling back",
  pose:"bent over a steel prep counter",pc:"gritted-teeth grimace of pleasure",w1:{top:["lace wedding gown pulled down off the breasts and hiked up around the waist","@light"]},
  blurb:"In the kitchen of the riverside restaurant after her rehearsal dinner, bent over the prep counter while the toasts go on.",
  scene:`In the steel kitchen of a riverside restaurant during her rehearsal dinner, the clink of glasses and a toast drifting through the swinging door, the bride-to-be is bent over a prep counter beside a platter of sushi as {partner} takes her from behind, her ivory gown hiked up. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She bites her lip to stay quiet, eyes rolling back, gripping the counter's edge with her diamond ring flashing, while through the porthole window of the door the groom raises his glass. Cum drips onto the tiles. Lewd sound effects. ${BT}, kitchen, restaurant, counter, bent over, sex from behind, swinging door, window, biting lip, rolling eyes, ring, cum in pussy, cum drip, motion lines, sweat`}],
["lastfling","crow","rat","Last fling",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"riding on top on a motel bed, phone in hand",pc:"cold, satisfied smirk",w1:{headwear:["rhinestone tiara with a short bridal veil","-"],top:["short lace bridal slip pulled down off the breasts","white"],legwear:null},
  blurb:"The bachelorette night ends in a neon motel off the strip, riding the bartender in her tiara and veil, the groom texting goodnight.",
  scene:`In a neon-lit motel room off the strip after her bachelorette party, glitter and a "BRIDE" sash on the floor, the bride-to-be rides {partner} cowgirl style on the bed in a rhinestone tiara with a short veil and a lace slip pulled down off her breasts. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She holds up her phone showing the groom's text, "Goodnight, can't wait to marry you tomorrow ❤", and grins at the viewer with her tongue out, lewd and triumphant. Shiny trinkets and a stolen hotel key glitter on the nightstand. Cum overflows from her vagina. Lewd sound effects. ${BT}, motel, neon lights, night, bachelorette, tiara, sash, cowgirl position, girl on top, phone, text message, holding phone, tongue out, grin, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`}],
["stacks","owl","swan","Between the stacks",{act:"sex, vaginal, standing sex, against bookshelf, leg lift, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"pressed against a tall bookshelf, one leg lifted",pc:"dominant, knowing smirk",w1:{gloves:["long satin opera gloves","white"]},
  blurb:"Her midnight wedding in the old library: between the stacks with the archivist, while the guests mingle under the reading lamps.",
  scene:`At a midnight wedding in a grand old library, a full moon in the tall window, the bride is pressed against a towering bookshelf between the stacks, one stockinged leg lifted and held by {partner}, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, books tumbling from the shelf. She clamps a satin-gloved hand over her mouth, eyes rolled up in bliss, while the warm glow and murmur of the guests drift from the reading room at the end of the aisle. Cum drips down her garter. Lewd sound effects. ${BT}, library, bookshelf, book, falling, moonlight, night, standing sex, leg lift, against bookshelf, hand over own mouth, covering mouth, elbow gloves, rolling eyes, cum in pussy, cum drip, motion lines, sweat`}],
["courthouse","rat","griffin","Courthouse",{act:"sex, vaginal, on table, missionary, creampie",ex:"smug, wicked giggle",
  pose:"lying back on a filing table among scattered papers",pc:"gritted-teeth grimace of pleasure",w1:{headwear:["short birdcage veil","white"],top:["short lace bridal slip pulled down off the breasts","white"],ringAccessory:["gold wedding band","-"]},
  blurb:"Married at city hall at noon; by one she's on the records-room table with the clerk who signed the license.",
  scene:`In the cramped records room of a city courthouse an hour after her quick wedding, a bouquet of convenience-store carnations on the floor, the new bride lies back on a filing table among scattered marriage licenses, a cheap birdcage veil pinned in her hair and her short lace slip pulled down off her breasts, as {partner}, the clerk, fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She gives the viewer a smug, wicked giggle and flashes the brand-new gold wedding band on her finger. Cum drips onto the paperwork. Lewd sound effects. ${BT}, office, courthouse, table, on table, paper, documents, scattered papers, flower, missionary, on back, wedding band, showing ring, giggling, looking at viewer, cum in pussy, cum drip, motion lines, sweat`}]
  ]);

  /* ======================= Cheating Housewives ======================= */
  const HT="netorare, cheating (relationship), infidelity, housewife, married woman, wedding ring";
  const WIFE={top:["{c} frilled apron over bare skin","@c1"],ringAccessory:["gold wedding band","-"]};
  make("Academy Cheating Housewives","Academy Cheating Brides","hw","Housewife",["cheating","housewife","married","ntr","netorare"],WIFE,[
["boss","griffin","dragon","The husband's boss",{act:"sex, vaginal, bent over, sex from behind, creampie",ex:"biting her lip to stay quiet, eyes rolling back",
  pose:"bent over a kitchen island",pc:"dominant, knowing smirk",w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},
  blurb:"At her own dinner party, bent over the kitchen island by her husband's boss while he carves the roast next door.",
  scene:`In a grand kitchen hung with crimson-and-gold, a dinner party roaring in the dining room beyond the archway, the housewife is bent over the marble kitchen island beside the dessert tray, her cardigan unbuttoned over bare breasts and her skirt hiked up, as {partner}, her husband's boss, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Through the archway her husband laughs at the head of the table, and she bites her lip to stay quiet, eyes rolling back, her gold wedding band gripping the counter. Cum drips down her thighs. Lewd sound effects. ${HT}, kitchen, kitchen island, dinner party, bent over, sex from behind, skirt lift, open cardigan, biting lip, rolling eyes, cum in pussy, cum drip, motion lines, sweat`}],
["greenhouse","badger","stag","The gardener",{act:"sex, vaginal, missionary, on table, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"lying back on a potting bench among flowerpots",pc:"gritted-teeth grimace of pleasure",w1:{top:["sundress pulled down to the waist","@c1"]},
  blurb:"In the greenhouse with the gardener, on the potting bench among her prize sunflowers.",
  scene:`In a sunny cottage greenhouse full of honey-gold light, pots of herbs and towering sunflowers, the housewife lies back on a wooden potting bench, her sundress pulled down to her waist and her gardening gloves tossed aside, as {partner}, the gardener, fucks her in the missionary position with soil still on his hands. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, knocking over a watering can. She gazes up with a dazed, heart-eyed, drooling smile, her gold wedding band glinting as she grips a flowerpot. Cum overflows onto the bench. Lewd sound effects. ${HT}, greenhouse, plant, sunflower, flower pot, watering can, table, on table, missionary, on back, dirty hands, heart-shaped pupils, drooling, cum in pussy, cum overflow, motion lines, sweat`}],
["piano","raven","owl","The piano lesson",{act:"sex, vaginal, sitting on piano, legs spread, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"sitting on the keys of a grand piano, legs spread",pc:"cold, satisfied smirk",w1:{top:["short silk robe hanging open","@c1"],ringAccessory:["gold wedding band","-"]},
  blurb:"Her weekly piano lesson under the skylight, sitting on the keys while her teacher plays something else entirely.",
  scene:`In a music room under a skylight full of stars, the housewife sits on the keys of a grand piano with her silk robe hanging open and her legs spread around {partner}, her piano teacher, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, each thrust striking a jangling chord. Sheet music scatters to the floor and her wedding photo topples on the piano lid. She looks up with a breathless, guilty smile and tears of pleasure in her eyes. Cum drips onto the ivory keys. Lewd sound effects. ${HT}, piano, grand piano, sitting on object, piano keys, sheet music, skylight, night, open robe, spread legs, picture frame, tears, cum in pussy, cum drip, motion lines, sweat`}],
["study","serpent","kraken","On his desk",{act:"sex, vaginal, missionary, on desk, phone call, creampie",ex:"flushed, defiant smirk",
  pose:"lying back across a mahogany desk, phone to her ear",pc:"dominant, knowing smirk",w1:{top:["short silk robe hanging open","@c1"],legwear:["lace garter stockings","@dark"]},
  blurb:"Across her husband's own desk with his business partner, answering when he calls to say he'll be late.",
  scene:`In her husband's mahogany study in a velvet-draped penthouse, moody emerald light and silver accents, the housewife lies back across his desk in an open silk robe and garter stockings as {partner}, his business partner, fucks her in the missionary position, scattering contracts. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She holds the desk phone to her ear and her speech bubble reads "Working late again, darling? Take all the time you need♡" with a flushed, defiant smirk up at {partner}, her ring hand spread over his nameplate. Cum drips onto the leather blotter. Lewd sound effects. ${HT}, study, office, desk, on desk, papers, nameplate, telephone, talking on phone, open robe, garter straps, missionary, smirk, speech bubble, cum in pussy, cum drip, motion lines, sweat`}],
["fence","wolf","griffin","Over the fence",{act:"sex, vaginal, standing sex, sex from behind, outdoor sex, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"bracing herself against a backyard fence",pc:"gritted-teeth grimace of pleasure",w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],bottom:["yoga pants pulled down to the thighs","@dark"]},
  blurb:"The neighbor climbed the fence after her morning run; she's braced against it now, with her husband's car in the drive.",
  scene:`In a suburban backyard at dusk, pines dark against a rising full moon, the housewife braces herself against the wooden fence in her running clothes, her oversized t-shirt pushed up over her breasts and her yoga pants pulled down to her thighs, as {partner}, the neighbor, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, rattling the fence. Her husband's car sits in the driveway beyond and the kitchen light is on, and she looks back at the viewer with a lewd, triumphant grin and her tongue out. Cum drips down to her pulled-down pants. Lewd sound effects. ${HT}, backyard, fence, outdoors, outdoor sex, dusk, full moon, standing sex, sex from behind, shirt lift, pants pull, sportswear, looking back, tongue out, grin, cum in pussy, cum drip, motion lines, sweat`}],
["poolclean","swan","salmon","The pool cleaner",{act:"sex, vaginal, doggystyle, sex from behind, creampie",ex:"teary-eyed, overwhelmed, ecstatic expression",
  pose:"on all fours on a white poolside lounger",pc:"cold, satisfied smirk",w1:{top:null},
  blurb:"On all fours on her white poolside lounger with the pool cleaner, his net forgotten on the tiles.",
  scene:`Beside a pristine white villa pool in soft pearly morning light, the housewife is on all fours on a white lounger, wearing nothing but her wedding band and a sunhat knocked askew, as {partner}, the pool cleaner, fucks her from behind, his skimmer net forgotten on the tiles. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Her face is teary-eyed, overwhelmed and ecstatic, a glass of white wine tipped over and spilling, a feather drifting on the water. Cum drips onto the lounger. Lewd sound effects. ${HT}, pool, poolside, lounge chair, all fours, doggystyle, sex from behind, completely nude, sun hat, wine glass, spill, tears, cum in pussy, cum drip, motion lines, sweat`}],
["plumber","dragon","shark","The plumber",{act:"sex, vaginal, cowgirl position, girl on top, on floor, creampie",ex:"smug, wicked giggle",
  pose:"riding on top on a kitchen floor",pc:"gritted-teeth grimace of pleasure",
  blurb:"The plumber came for the sink and never got back under it: she rides him on the kitchen floor in nothing but her apron.",
  scene:`On the floor of a red-tiled kitchen lit by red lanterns, the cabinet doors under the sink open and a wrench abandoned, the housewife rides {partner}, the plumber, cowgirl style in nothing but her frilled apron, pushed aside to bare her breasts. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, a puddle of water spreading beneath them from the dripping pipe. She giggles down at the viewer, smug and wicked, twirling the wrench, her wedding band flashing. Cum overflows down {his} shaft. Lewd sound effects. ${HT}, kitchen, kitchen sink, wrench, on floor, water, puddle, naked apron, cowgirl position, girl on top, giggling, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`}],
["firewood","stag","wolf","Firewood",{act:"sex, vaginal, missionary, on couch, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"lying back on a couch by the hearth, legs wrapped around her lover",pc:"dominant, knowing smirk",w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},
  blurb:"The woodcutter stacked the firewood and stayed to warm up: on the couch by the hearth of her forest cottage.",
  scene:`In a forest cottage with ivy at the windows and dappled light, logs freshly stacked by the hearth, the housewife lies back on a worn couch with her cardigan unbuttoned over bare breasts and her skirt hiked up, legs wrapped around {partner}, the woodcutter, who fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She gazes up with a dazed, heart-eyed, drooling smile, her husband's reading glasses still folded on the arm of the couch. Cum overflows onto the cushions. Lewd sound effects. ${HT}, cottage, living room, couch, fireplace, firewood, missionary, on back, leg lock, open cardigan, skirt lift, eyewear, heart-shaped pupils, drooling, cum in pussy, cum overflow, motion lines, sweat`}],
["yacht","shark","serpent","The yacht club",{act:"sex, vaginal, prone bone, lying on stomach, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"lying face-down on a yacht cabin bed",pc:"cold, satisfied smirk",w1:{top:null,panties:["lace panties pulled down around one ankle","@c1"]},
  blurb:"Below deck on her husband's yacht with his sailing rival, face-down on the cabin bed while he hosts on deck.",
  scene:`Below deck on her husband's yacht, the ocean glittering through the round portholes and his party's laughter thudding overhead, the housewife lies face-down on the cabin bed, her lace panties pulled down around one ankle, as {partner}, his sailing rival, presses her flat in a prone bone. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She clamps a hand over her mouth, eyes rolled up in bliss, her wedding band glinting, as a pair of deck shoes passes by the hatch above. Cum drips onto the navy sheets. Lewd sound effects. ${HT}, yacht, boat, cabin, porthole, bed, lying, on stomach, prone bone, panties around one leg, hand over own mouth, rolling eyes, cum in pussy, cum drip, motion lines, sweat`}],
["snowplow","penguin","fox","Snowed in",{act:"sex, vaginal, on table, missionary, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"lying back on a cabin kitchen table",pc:"dominant, knowing smirk",w1:{top:["oversized t-shirt pushed up over her breasts","@c1"]},
  blurb:"A blizzard keeps her husband at the office and the snowplow driver at her door, then on her kitchen table.",
  scene:`In a cozy cabin kitchen during a blizzard, snow piling against the frosted window and the snowplow's orange light flashing outside, the housewife lies back on the kitchen table in an oversized t-shirt pushed up over her breasts as {partner}, the snowplow driver, fucks her in the missionary position, his snowy coat still on. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, rattling two mugs of cocoa. Her phone on the table shows a text from her husband, "Stuck at the office, the roads are closed ❤". She looks up with a breathless, guilty smile and tears of pleasure in her eyes. Cum drips onto the table. Lewd sound effects. ${HT}, snow, snowing, blizzard, winter, cabin, kitchen, table, on table, frosted window, hot chocolate, mug, phone, text message, missionary, shirt lift, tears, cum in pussy, cum drip, motion lines, sweat`}],
["delivery","fox","badger","The delivery",{act:"sex, vaginal, standing sex, sex from behind, against door, creampie",ex:"sweet, innocent smile hiding a wicked glint",
  pose:"pressed against her front door in the entryway",pc:"gritted-teeth grimace of pleasure",w1:{top:["short silk robe hanging open","@c1"]},
  blurb:"She signed for the package and then for the delivery man, against her own front door in the genkan.",
  scene:`In the stone-floored entryway of a house with paper screens and autumn leaves blowing past the frosted glass, a delivery box dropped and burst open at their feet, the housewife is pressed against her own front door in an open silk robe as {partner}, the delivery man, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, the door rattling in its frame. She looks back over her shoulder with a sweet, innocent smile hiding a wicked glint, her husband's shoes neatly lined up beside her bare feet. Cum drips onto the stone. Lewd sound effects. ${HT}, genkan, entryway, door, against door, cardboard box, package, autumn leaves, open robe, standing sex, sex from behind, looking back, smile, cum in pussy, cum drip, motion lines, sweat`}],
["bakesale","lovebird","rat","Bake sale",{act:"sex, vaginal, sitting on counter, legs around waist, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"sitting on a flour-dusted counter, legs wrapped around her lover",pc:"cold, satisfied smirk",
  blurb:"Baking for the neighborhood bake sale with the neighbor, flour and frosting everywhere, cupcakes forgotten.",
  scene:`In a pastel kitchen full of hearts and fairy lights, trays of heart-shaped cupcakes everywhere, the housewife sits on the flour-dusted counter in nothing but her frilled apron, pushed aside, with her legs wrapped around {partner}, the neighbor, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, sending a puff of flour into the air. Pink frosting is smeared across her breasts and lips, and she gazes at {him} with a dazed, heart-eyed, drooling smile, her wedding band sticky with icing. Cum drips onto the counter. Lewd sound effects. ${HT}, kitchen, counter, sitting on counter, legs around waist, flour, cupcake, frosting, food on body, naked apron, heart, heart-shaped pupils, drooling, cum in pussy, cum drip, motion lines, sweat`}],
["tennis","flamingo","crow","The tennis coach",{act:"sex, vaginal, standing sex, leg lift, creampie",ex:"smug, wicked giggle",
  pose:"standing against a locker, one leg lifted",pc:"dominant, knowing smirk",w1:{top:null,bottom:["skirt hiked up around the waist","white"]},
  blurb:"Her private lessons at the country club: in the pink locker room with the tennis coach, one leg up on his shoulder.",
  scene:`In a pink country-club locker room with sunset light through the slatted windows and palm silhouettes beyond, the housewife stands against a locker in her white tennis skirt hiked up and nothing else, one leg lifted onto the shoulder of {partner}, the tennis coach, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. A tennis racket and her diamond-studded visor lie on the bench, and she giggles at the viewer, smug and wicked. Cum drips down her standing leg. Lewd sound effects. ${HT}, locker room, locker, tennis racket, tennis, skirt lift, topless, standing sex, leg lift, leg on shoulder, giggling, looking at viewer, sunset, cum in pussy, cum drip, motion lines, sweat`}],
["laundry","kraken","raven","Spin cycle",{act:"sex, vaginal, sitting on washing machine, legs spread, creampie",ex:"teary-eyed, overwhelmed, ecstatic expression",
  pose:"sitting on a rumbling washing machine, legs spread",pc:"gritted-teeth grimace of pleasure",w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled down around one ankle","@c2"]},
  blurb:"Her brother-in-law in the laundry room, her on the washing machine in the middle of the spin cycle.",
  scene:`In a laundry room bathed in shimmering blue light from the porthole of a running washer, the housewife sits on the rumbling washing machine mid-spin cycle, her oversized t-shirt pushed up over her breasts and her lace panties around one ankle, legs spread around {partner}, her husband's brother, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, the machine shaking beneath them. Her face is teary-eyed, overwhelmed and ecstatic as she grips the machine's edge, her wedding band clinking on the metal. Cum drips down the washer's front. Lewd sound effects. ${HT}, laundry room, washing machine, sitting on object, vibration, shirt lift, panties around one leg, spread legs, standing sex, tears, cum in pussy, cum drip, motion lines, sweat`}],
["fishing","salmon","owl","The fishing trip",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"flushed, apologetic but blissful smile",
  pose:"riding on top in a riverside bedroom",pc:"cold, satisfied smirk",w1:{top:null},
  blurb:"Her husband's away on his fishing trip; his best friend stayed behind. She rides him under their wedding photo.",
  scene:`In a minimalist riverside bedroom with cherry-wood accents and the river glinting through the window, the housewife rides {partner}, her husband's best friend, cowgirl style on the marriage bed, nude but for her wedding band. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Above the headboard hangs their wedding photo, and on the nightstand her phone shows a picture her husband just sent of himself holding up a big salmon. She looks down with a flushed, apologetic but blissful smile. Cum overflows down {his} shaft. Lewd sound effects. ${HT}, bedroom, bed, wedding photo, picture frame, phone, cowgirl position, girl on top, completely nude, ring, blush, smile, cum in pussy, cum overflow, motion lines, sweat`}],
["pawn","crow","salmon","Pawned",{act:"sex, vaginal, on table, missionary, creampie",ex:"smug, wicked giggle",
  pose:"lying back on a glass shop counter among trinkets",pc:"gritted-teeth grimace of pleasure",w1:{top:["short silk robe hanging open","@c1"],ringAccessory:null},
  blurb:"She came to the pawn shop to sell her wedding ring and paid the broker in kind, on his glass counter among the trinkets.",
  scene:`In a cluttered pawn shop at night, moonlight glittering on shelves of watches, keys and trinkets, the housewife lies back on the glass display counter in an open silk robe as {partner}, the pawnbroker, fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Beside her head her wedding band sits on a velvet tray under a jeweler's loupe with a price tag, and she giggles up at the viewer, smug and wicked, a handful of cash fanned in her fingers. Cum drips onto the glass. Lewd sound effects. ${HT}, shop, counter, glass, display case, ring, price tag, money, holding money, night, open robe, missionary, giggling, looking at viewer, cum in pussy, cum drip, motion lines, sweat`}],
["nightshift","owl","penguin","3 a.m.",{act:"sex, vaginal, sitting, reverse cowgirl position, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"sitting in her lover's lap in a reading armchair",pc:"cold, satisfied smirk",w1:{top:["cardigan unbuttoned over bare breasts","@c1"]},
  blurb:"3 a.m. in the reading nook with the night-shift neighbor, her husband snoring upstairs.",
  scene:`At three in the morning in a reading nook lit by a single lamp, a full moon in the window and books piled everywhere, the housewife sits in {partner}'s lap in a deep armchair facing away from {him}, her cardigan unbuttoned over bare breasts, as {he} thrusts up into her. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She clamps a hand over her mouth, eyes rolled up in bliss, as a speech bubble of snoring drifts down the staircase from her husband upstairs. A clock on the wall reads 3:00. Cum drips onto the armchair. Lewd sound effects. ${HT}, night, reading, armchair, lamp, books, stairs, sitting on lap, reverse cowgirl position, hand over own mouth, rolling eyes, open cardigan, clock, cum in pussy, cum drip, motion lines, sweat`}],
["rent","rat","stag","Rent's due",{act:"sex, vaginal, doggystyle, sex from behind, creampie",ex:"flushed, defiant smirk",
  pose:"on all fours on a lumpy thrifted couch",pc:"dominant, knowing smirk",w1:{top:["oversized t-shirt pushed up over her breasts","@c1"],bottom:["yoga pants pulled down to the thighs","@dark"]},
  blurb:"Rent's due and her husband spent it again, so the landlord gets paid another way, on their thrifted couch.",
  scene:`In a cramped, cluttered apartment full of thrifted treasures and string lights, an overdue rent notice taped to the fridge, the housewife is on all fours on a lumpy thrifted couch, her oversized t-shirt pushed up and her yoga pants pulled down to her thighs, as {partner}, the landlord, fucks her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She looks back at the viewer with a flushed, defiant smirk, waving the torn-up rent notice, her cheap gold wedding band on the hand gripping the couch. Cum drips onto the cushions. Lewd sound effects. ${HT}, apartment, messy room, couch, string lights, all fours, doggystyle, sex from behind, shirt lift, pants pull, paper, looking back, smirk, cum in pussy, cum drip, motion lines, sweat`}]
  ]);

  /* ======================= NTR Sisters ======================= */
  const ST="netorare, cheating (relationship), infidelity, affair";
  const SIS={top:["oversized t-shirt pushed up over her breasts","@c1"],panties:["lace panties pulled aside","@c2"]};
  make("Academy NTR Sisters","Academy Cheating Housewives","ns","Sister's man",["ntr","netorare","cheating","sister"],SIS,[
["engagement","griffin","serpent","Her sister's fiancé",{act:"sex, vaginal, standing sex, against door, sex from behind, creampie",ex:"smug, wicked giggle",
  pose:"pressed against a door, looking back over her shoulder",pc:"dominant, knowing smirk",w1:{top:["bridesmaid dress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"]},
  blurb:"At her sister's engagement party, pressed against the coat-room door by the fiancé himself.",
  scene:`In the coat room of a grand hall hung with crimson-and-gold banners, her sister's engagement party roaring outside with a "Congratulations!" banner visible through the crack of the door, the woman is pressed against the door in her party dress pulled down to the waist, as {partner}, her sister's fiancé, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She looks back over her shoulder with a smug, wicked giggle, her sister's voice in a speech bubble from outside: "Has anyone seen my fiancé?". Cum drips down her thighs. Lewd sound effects. ${ST}, coat room, against door, door ajar, banner, party, standing sex, sex from behind, looking back, giggling, speech bubble, cum in pussy, cum drip, motion lines, sweat`}],
["bbq","badger","wolf","Family barbecue",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"riding on top in a garden shed, one hand over her mouth",pc:"gritted-teeth grimace of pleasure",w1:{top:["sundress pulled down to the waist","@c1"],panties:null},
  blurb:"The family barbecue goes on outside; in the garden shed she rides her sister's husband on a sack of potting soil.",
  scene:`In a garden shed full of honey-gold light slanting through the slats, pots of herbs and tools on the walls, the woman rides {partner}, her sister's husband, cowgirl style on a pile of feed sacks, her sundress pulled down to her waist. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Through the slats the family barbecue goes on, smoke rising from the grill, and her sister's voice calls in a speech bubble, "Honey, the burgers are ready!". She clamps a hand over her mouth, eyes rolled up in bliss. Cum overflows down {his} shaft. Lewd sound effects. ${ST}, shed, garden, tools, barbecue, smoke, cowgirl position, girl on top, hand over own mouth, covering mouth, rolling eyes, sundress, speech bubble, cum in pussy, cum overflow, motion lines, sweat`}],
["sistersbed","raven","crow","Her sister's bed",{act:"sex, vaginal, missionary, on bed, creampie",ex:"cold, satisfied smirk",
  pose:"lying back on her sister's bed, hand on a fallen wedding photo",pc:"cold, satisfied smirk",w1:{top:null},
  blurb:"In her sister's bed under the skylight, her hand resting on their knocked-over wedding photo.",
  scene:`In her sister's bedroom under a skylight full of stars, the woman lies back in her sister's bed, nude, as {partner}, her sister's husband, fucks her in the missionary position. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Her hand rests on the couple's wedding photo, knocked face-down on the nightstand, and her sister's robe hangs on the door. She looks up at {him} with a cold, satisfied smirk, her dark hair fanned across her sister's pillow. Cum overflows onto the sheets. Lewd sound effects. ${ST}, bedroom, bed, pillow, night, skylight, starry sky, wedding photo, picture frame, missionary, on back, completely nude, smirk, cum in pussy, cum overflow, motion lines, sweat`}],
["herdress","serpent","swan","Wearing her dress",{act:"sex, vaginal, sitting on table, legs spread, selfie, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"sitting on a vanity table, phone held up for a selfie",pc:"dominant, knowing smirk",w1:{top:["bridesmaid dress pulled down to the waist","@c1"],gloves:["long satin opera gloves","@dark"],panties:null},
  blurb:"In her sister's best dress, on her sister's vanity, sending her sister the selfie.",
  scene:`In her sister's velvet-draped dressing room in moody emerald light, the woman sits on her sister's vanity wearing her sister's best satin dress pulled down to the waist, legs spread around {partner}, her sister's husband, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, toppling perfume bottles. She holds up her phone for a selfie of the two of them, the chat open to her sister's name, and grins at the camera with her tongue out, lewd and triumphant, the caption reading "Borrowed your dress... and something else♡". Cum drips onto the vanity. Lewd sound effects. ${ST}, vanity, mirror, perfume bottle, sitting on table, spread legs, phone, selfie, holding phone, text message, elbow gloves, tongue out, grin, cum in pussy, cum drip, motion lines, sweat`}],
["cabin","wolf","stag","Thin walls",{act:"sex, vaginal, prone bone, lying on stomach, creampie",ex:"biting her lip to stay quiet, eyes rolling back",
  pose:"lying face-down on a bunk, biting the pillow",pc:"gritted-teeth grimace of pleasure",
  blurb:"The family cabin trip: on the bottom bunk with her sister's boyfriend, her sister asleep on the other side of a thin log wall.",
  scene:`In a log cabin bunk room at night, a full moon over dark pines through the little window, the woman lies face-down on the bottom bunk in an oversized t-shirt, her panties pulled aside, as {partner}, her sister's boyfriend, presses her flat in a prone bone. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, the bunk creaking. She bites her lip to stay quiet, eyes rolling back, her fingers clawing the pillow, while a muffled "zzz" speech bubble comes through the thin log wall from the next room. Cum drips onto the quilt. Lewd sound effects. ${ST}, cabin, bunk bed, log wall, night, moonlight, lying, on stomach, prone bone, pillow grab, biting lip, rolling eyes, panties aside, cum in pussy, cum drip, motion lines, sweat`}],
["maidofhonor","swan","griffin","Maid of honor",{act:"sex, vaginal, standing sex, leg lift, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"standing on one leg against a wall, one leg lifted high",pc:"dominant, knowing smirk",w1:{top:["bridesmaid dress pulled down to the waist","@c1"],legwear:["sheer stockings","@light"],panties:null},
  blurb:"Her sister's wedding day, and the maid of honor is in the groom's dressing room with one leg lifted high.",
  scene:`In the groom's dressing room on her sister's wedding day, soft pearly morning light and white feathers drifting past the window, the maid of honor stands against the wall in her bridesmaid dress pulled down to the waist, one leg lifted high in a dancer's extension and held by {partner}, the groom himself in his half-buttoned tuxedo. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. His boutonniere has fallen to the floor and the "Bride" garment bag hangs on the door. She looks up at {him} with a breathless, guilty smile and tears of pleasure in her eyes. Cum drips down her standing leg. Lewd sound effects. ${ST}, bridesmaid, dressing room, tuxedo, groom, wedding, standing sex, leg lift, standing split, flexible, boutonniere, tears, cum in pussy, cum drip, motion lines, sweat`}],
["newyear","dragon","badger","Family dinner",{act:"sex, vaginal, sex from behind, bent over, creampie",ex:"flushed, defiant smirk",
  pose:"bent over a stack of rice sacks in a storeroom",pc:"gritted-teeth grimace of pleasure",w1:{top:["sundress pulled down to the waist","@c1"],panties:["lace panties pulled aside","@c2"]},
  blurb:"New Year dinner with the whole family, and she sends her sister's husband to the storeroom for more rice, then follows.",
  scene:`In the storeroom behind a family restaurant during the New Year dinner, red lanterns flickering and firecrackers popping outside, the woman is bent over a stack of rice sacks in her red dress pulled down to the waist, as {partner}, her sister's husband, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. A red envelope is tucked in her cleavage, and through the bead curtain the family toasts around a round table. She looks back with a flushed, defiant smirk. Cum drips onto the sacks. Lewd sound effects. ${ST}, storeroom, sack, red lantern, firecrackers, new year, bead curtain, bent over, sex from behind, red envelope, looking back, smirk, cum in pussy, cum drip, motion lines, sweat`}],
["guestroom","stag","penguin","The guest room",{act:"sex, vaginal, spooning, sex from behind, lying on side, creampie",ex:"dazed, heart-eyed, drooling smile",
  pose:"lying on her side in a guest bed, held from behind",pc:"cold, satisfied smirk",
  blurb:"Staying in her sister's forest cottage guest room, and her sister's husband slips in at dawn.",
  scene:`At dawn in the guest room of her sister's forest cottage, dappled light through the ivy at the window, the woman lies on her side in the guest bed in an oversized t-shirt, held from behind by {partner}, her sister's husband, who has slipped in under the quilt and fucks her spooning. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, {his} hand cupping her breast. From the kitchen comes the sound of her sister humming over breakfast in a speech bubble, and she melts into {him} with a dazed, heart-eyed, drooling smile. Cum drips onto the quilt. Lewd sound effects. ${ST}, bedroom, morning, dawn, quilt, under covers, lying, on side, spooning, sex from behind, breast grab, heart-shaped pupils, drooling, speech bubble, cum in pussy, cum drip, motion lines, sweat`}],
["poolhouse","shark","flamingo","The pool party",{act:"sex, vaginal, standing sex, sex from behind, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"bracing herself on a pool-house window",pc:"gritted-teeth grimace of pleasure",w1:{top:null,panties:["lace panties pulled down around one ankle","@c2"]},
  blurb:"Her sister's pool party: in the pool house with the host, her sister's boyfriend, braced on the window over the party.",
  scene:`In a beach-house pool house during her sister's pool party, the ocean glittering beyond and inflatables bobbing in the pool, the woman braces her hands on the window, topless with her bikini bottoms down around one ankle, as {partner}, her sister's boyfriend, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, her breasts swaying against the glass. Outside her sister waves at the window from a pool float, and she waves back with a lewd, triumphant grin and her tongue out. Cum drips down her wet thighs. Lewd sound effects. ${ST}, pool house, window, pool, beach, inflatable, pool party, topless, wet, standing sex, sex from behind, waving, tongue out, grin, cum in pussy, cum drip, motion lines, sweat`}],
["mudroom","penguin","kraken","Snow day",{act:"sex, vaginal, sitting, cowgirl position, on bench, creampie",ex:"breathless, guilty smile with tears of pleasure in her eyes",
  pose:"straddling her lover on a mudroom bench",pc:"dominant, knowing smirk",w1:{top:["cardigan unbuttoned over bare breasts","@c1"],legwear:["thigh-high socks","@light"]},
  blurb:"Snowed in at her sister's house: her sister drives off for groceries, and in the mudroom she straddles the man who shoveled the drive.",
  scene:`In the mudroom of her sister's snowed-in cabin, snow falling past the frosted window and her sister's car pulling away down the plowed drive, the woman straddles {partner}, her sister's husband, on the wooden bench among snowy boots and dripping coats, her cardigan unbuttoned over bare breasts and her thigh-high socks still on. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, his shovel leaning beside them. She looks down with a breathless, guilty smile and tears of pleasure in her eyes, her cheeks pink from the cold. Cum drips onto the bench. Lewd sound effects. ${ST}, snow, snowing, winter, mudroom, bench, boots, coat, frosted window, car, straddling, cowgirl position, sitting on lap, open cardigan, thighhighs, tears, blush, cum in pussy, cum drip, motion lines, sweat`}],
["futon","fox","dragon","Her sister's futon",{act:"sex, vaginal, doggystyle, sex from behind, creampie",ex:"sweet, innocent smile hiding a wicked glint",
  pose:"on all fours on a futon, looking back over her shoulder",pc:"gritted-teeth grimace of pleasure",
  blurb:"On her sister's futon behind the paper screens, her sister's photos smiling down from the shelf.",
  scene:`In her sister's tatami room behind paper screens, dusk light and autumn leaves outside, the woman is on all fours on her sister's futon, her t-shirt pushed up and her panties pulled aside, as {partner}, her sister's husband, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. On the shelf above sit framed photos of the two sisters smiling arm in arm, and she looks back over her shoulder with a sweet, innocent smile hiding a wicked glint. Cum drips onto the futon. Lewd sound effects. ${ST}, tatami, futon, shouji, japanese room, dusk, picture frame, photo, all fours, doggystyle, sex from behind, looking back, panties aside, smile, cum in pussy, cum drip, motion lines, sweat`}],
["twinning","lovebird","fox","Matching outfits",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"smug, wicked giggle",
  pose:"riding on top on a pastel couch",pc:"cold, satisfied smirk",w1:{top:["sundress pulled down to the waist","@c1"],panties:null},
  blurb:"She and her sister bought matching dresses; only one of them is riding her sister's boyfriend on the couch in hers.",
  scene:`In a pastel living room full of hearts and fairy lights, the woman rides {partner}, her sister's boyfriend, cowgirl style on a pink couch, in the same pastel sundress her sister wears in the framed photo beside them, pulled down to her waist. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. A shopping bag with a second matching dress lies on the floor, and she giggles at the viewer, smug and wicked, holding up two fingers in a peace sign. Cum overflows down {his} shaft. Lewd sound effects. ${ST}, living room, couch, heart, fairy lights, picture frame, shopping bag, matching outfits, sundress, cowgirl position, girl on top, peace sign, giggling, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`}],
["birthday","flamingo","salmon","Her sister's birthday",{act:"sex, vaginal, sitting on counter, legs around waist, creampie",ex:"lewd, triumphant grin with her tongue out",
  pose:"sitting on a bathroom counter, frosting on her lips",pc:"dominant, knowing smirk",w1:{top:["bridesmaid dress pulled down to the waist","@c1"],panties:null},
  blurb:"While everyone sings to her sister, she's on the bathroom counter with her sister's husband, licking cake off her fingers.",
  scene:`In a pink villa bathroom bathed in sunset light during her sister's birthday party, a slice of birthday cake on the sink, the woman sits on the counter in her party dress pulled down to the waist, legs wrapped around {partner}, her sister's husband, who fucks her standing. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Through the door comes the whole party singing "Happy birthday to you♪" in a speech bubble, and she licks frosting off her fingers with a lewd, triumphant grin and her tongue out, a party hat askew on her head. Cum drips onto the counter. Lewd sound effects. ${ST}, bathroom, sink, counter, sitting on counter, legs around waist, cake, frosting, party hat, birthday, singing, speech bubble, tongue out, grin, cum in pussy, cum drip, motion lines, sweat`}],
["speaker","kraken","wolf","On speaker",{act:"sex, vaginal, mating press, phone call, creampie",ex:"teary-eyed, overwhelmed, ecstatic expression",
  pose:"folded back in a mating press, phone beside her head",pc:"gritted-teeth grimace of pleasure",w1:{top:null},
  blurb:"Her sister calls on speaker to ask if she's seen her husband. She has; he's on top of her.",
  scene:`In a bedroom with a glowing aquarium wall, everything bathed in shimmering blue, the woman lies folded back in a mating press under {partner}, her sister's husband, nude, her phone on the pillow beside her head on speaker with her sister's name on the screen. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. Her sister's voice comes from the phone in a speech bubble, "Have you seen him? He's not answering...", and she answers "N-no... haven't seen him♡" with a teary-eyed, overwhelmed, ecstatic expression. Cum overflows from her vagina. Lewd sound effects. ${ST}, bedroom, aquarium, blue theme, phone, speakerphone, phone call, lying, on back, mating press, legs up, completely nude, tears, speech bubble, cum in pussy, cum overflow, motion lines, sweat`}],
["anniversary","salmon","raven","The anniversary gift",{act:"sex, vaginal, reverse cowgirl position, creampie",ex:"flushed, apologetic but blissful smile",
  pose:"riding in reverse, holding up a jewelry box",pc:"cold, satisfied smirk",w1:{top:null,panties:null},
  blurb:"The necklace was meant for her sister's anniversary. She's wearing it now, riding him in reverse.",
  scene:`In a minimalist riverside apartment with cherry-wood accents and the river glinting at night, the woman rides {partner}, her sister's husband, in the reverse cowgirl position on the couch, nude but for a delicate gold necklace. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She holds up an open jewelry box with a card reading "Happy anniversary, my love" in her sister's name, and looks at the viewer with a flushed, apologetic but blissful smile. Cum overflows down {his} shaft. Lewd sound effects. ${ST}, apartment, night, couch, river, reverse cowgirl position, jewelry box, necklace, card, completely nude, blush, smile, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`,
  w1:{top:null,panties:null,neckAccessory:["dainty pendant necklace","@metal"]}}],
["borrowed","crow","griffin","Borrowed",{act:"sex, vaginal, cowgirl position, girl on top, creampie",ex:"smug, wicked giggle",
  pose:"riding on top in an attic, a ring dangling on a chain",pc:"dominant, knowing smirk",w1:{top:null,neckAccessory:["dainty pendant necklace","@metal"],panties:null},
  blurb:"She's always borrowed her sister's things. Tonight it's her sister's husband, and his wedding ring hangs on her chain.",
  scene:`In a moonlit attic full of curiosities, keys and glittering trinkets, the woman rides {partner}, her sister's husband, cowgirl style on an old mattress, nude except for a chain around her neck where his wedding ring now dangles among her other little treasures. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She twirls the ring between her fingers and giggles at the viewer, smug and wicked. Cum overflows down {his} shaft. Lewd sound effects. ${ST}, attic, night, moonlight, mattress, trinket, key, necklace, ring, wedding ring, cowgirl position, girl on top, completely nude, giggling, looking at viewer, cum in pussy, cum overflow, motion lines, sweat`}],
["bookshop","owl","rat","Above the bookshop",{act:"sex, vaginal, sex from behind, standing sex, against bookshelf, creampie",ex:"covering her mouth to stay quiet, eyes rolled up in bliss",
  pose:"bracing herself against a bookshelf",pc:"gritted-teeth grimace of pleasure",w1:{top:["cardigan unbuttoned over bare breasts","@c1"],bottom:["skirt hiked up around the waist","@c2"]},
  blurb:"After closing in the bookshop her sister owns with her husband, between the shelves, the sister upstairs.",
  scene:`After closing in the cozy bookshop her sister runs with her husband, a single lamp lit and a full moon in the window, the woman braces herself against a bookshelf, her cardigan unbuttoned over bare breasts and her skirt hiked up, as {partner}, her sister's husband, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines, books tumbling. Footsteps creak on the ceiling from the flat upstairs, and she clamps a hand over her mouth, eyes rolled up in bliss. Cum drips onto the floorboards. Lewd sound effects. ${ST}, bookshop, bookshelf, book, falling, lamp, night, moonlight, standing sex, sex from behind, open cardigan, skirt lift, hand over own mouth, rolling eyes, cum in pussy, cum drip, motion lines, sweat`}],
["handmedowns","rat","owl","Hand-me-downs",{act:"sex, vaginal, sex from behind, doggystyle, creampie",ex:"flushed, defiant smirk",
  pose:"on all fours on a closet floor among fallen clothes",pc:"cold, satisfied smirk",w1:{panties:null},
  blurb:"She grew up in her sister's hand-me-downs; now she's on all fours in her sister's walk-in closet with her sister's husband.",
  scene:`On the floor of her sister's walk-in closet, rows of designer clothes and shoe boxes above and a heap of dresses pulled down around them, the woman is on all fours in a worn, oversized t-shirt pushed up over her breasts as {partner}, her sister's husband, takes her from behind. {His} thick, veiny {cock} is buried to the hilt in her vagina with motion lines. She looks back with a flushed, defiant smirk, one of her sister's expensive heels dangling from her hand. Cum drips onto a silk blouse. Lewd sound effects. ${ST}, closet, walk-in closet, clothes, clothes on floor, high heels, holding shoes, all fours, doggystyle, sex from behind, shirt lift, looking back, smirk, cum in pussy, cum drip, motion lines, sweat`}]
  ]);
})();

/* ---- v177: two more explicit sets, all about the girl.
   "Academy Not His Anymore" (NTR)  she moans that she doesn't need her husband anymore, to his photo, his ring, his call …
   "Academy Guilty Cheating"        she cheats and is crushed by guilt and embarrassment: tears, a full-face blush, covering
                                    her face, apologizing to the one she's betraying, and still not stopping.
   The man is nobody in particular. Each scene runs with no partner picked: the base prompt has "1girl, 1boy, faceless male,
   muscular male" (with "pov" for the point-of-view ones) and the girl is the only character prompt, so the generator spends
   everything on her: her face, her words, her body, the act. Picking a partner in the Scene tab still works; the same scene
   is written for them. All adult women and willing; held back by the safeguard like every explicit scene. */
(function(){
  const cap=s=>s[0].toUpperCase()+s.slice(1),GX="Explicit (adult)";
  const H=["griffin","badger","raven","serpent","wolf","swan","dragon","stag","shark","penguin","fox","lovebird","flamingo","kraken","salmon","crow","owl","rat"];
  const dedupe=s=>[...new Set(String(s).split(",").map(x=>x.trim()).filter(Boolean))].join(", ");
  [["ringAccessory","gold wedding band","CU","glam,casual"],["top","short silk robe hanging open","L","boudoir"],["top","oversized t-shirt pushed up over her breasts","L","casual,boudoir"],
   ["legwear","lace garter stockings","LS","boudoir"],["panties","lace panties pulled aside","L","boudoir"],["top","cardigan unbuttoned over bare breasts","L","casual,boudoir"],
   ["bottom","skirt hiked up around the waist","L","casual,boudoir"],["eyewear","round glasses","CU","preppy,casual"]].forEach(([f,v,t,fam])=>START.item(f,v,t,fam));
  const AROUSE={blushStyle:"heavy aroused blush",skinFinish:"wet, sweat-glistening skin",lipFinish:"wet glossy lips",
    nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet with arousal",
    bodyMarkings:"thick white cum and glistening fluids drip down her inner thighs"};

  /* positions: text uses %M% (the man), %m% (lowercase), %his%, %him%, %he%, %cock% */
  const POS={
    cowgirl:{pov:true,act:"sex, vaginal, cowgirl position, girl on top",pose:"riding on top, facing the viewer",
      text:"rides %m% in the cowgirl position, %his% huge, veiny %cock% buried to the hilt in her vagina as she bounces on it with motion lines, her breasts bouncing",tags:"cowgirl position, girl on top, straddling, bouncing breasts, looking at viewer"},
    missionary:{pov:true,act:"sex, vaginal, missionary",pose:"lying on her back with her legs spread wide",
      text:"lies on her back with her legs spread wide as %m% pounds into her in the missionary position, %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines, %his% strong hands pinning her thighs open",tags:"missionary, on back, spread legs, leg grab, looking at viewer"},
    press:{pov:true,act:"sex, vaginal, mating press",pose:"lying folded in a mating press, legs pressed back",
      text:"lies folded in a mating press, her legs pressed back over her shoulders as %m% drives %his% huge, veiny %cock% straight down into her vagina with motion lines, a cross-section showing it pushing deep against her womb",tags:"mating press, legs up, folded, cross-section, x-ray, deep penetration"},
    doggy:{pov:true,act:"sex, vaginal, doggystyle, sex from behind",pose:"kneeling on all fours, looking back over her shoulder",
      text:"is on all fours as %m% fucks her from behind, %his% strong hands gripping her hips and %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines, her ass rippling, and she looks back over her shoulder",tags:"doggystyle, sex from behind, all fours, ass, ass grab, looking back"},
    window:{pov:false,act:"sex, vaginal, standing sex, sex from behind",pose:"bending against a window, breasts pressed to the glass",
      text:"is pressed breasts-first against the glass as %m% takes her standing from behind, %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines, %his% hand fisted in her hair",tags:"standing sex, sex from behind, against glass, breasts on glass, breast press, hair pull"},
    reverse:{pov:true,act:"sex, vaginal, reverse cowgirl position",pose:"riding in reverse, looking back over her shoulder",
      text:"rides %m% in the reverse cowgirl position, her ass slapping down onto %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines, and she looks back over her shoulder",tags:"reverse cowgirl position, girl on top, ass, looking back"},
    nelson:{pov:false,act:"sex, vaginal, full nelson, legs up",pose:"held up in a full nelson, legs spread wide",
      text:"is held up in a full nelson by %m% behind her, her legs spread wide and pinned up by %his% muscular arms, her body on full display as %his% huge, veiny %cock% pumps into her vagina with motion lines",tags:"full nelson, legs up, spread legs, held up, presenting, facing viewer"},
    prone:{pov:true,act:"sex, vaginal, prone bone",pose:"lying face-down with her ass raised",
      text:"lies flat on her stomach with her ass raised as %m% pins her down in a prone bone, %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines, %his% hand pressing her head into the pillow",tags:"prone bone, lying, on stomach, ass up, pillow grab"},
    legup:{pov:false,act:"sex, vaginal, standing sex, leg lift",pose:"standing on one leg, the other lifted high",
      text:"stands on one leg with the other lifted high and held by %m%, who fucks her standing, %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines",tags:"standing sex, leg lift, standing split, against wall"},
    lap:{pov:true,act:"sex, vaginal, upright straddle, sitting on lap",pose:"straddling the viewer's lap, arms around his neck",
      text:"straddles %m%'s lap face to face, arms thrown around %his% neck, grinding down onto %his% huge, veiny %cock% buried to the hilt in her vagina with motion lines",tags:"upright straddle, sitting on lap, straddling, arms around neck, face to face"},
    oral:{pov:true,act:"fellatio, deepthroat",pose:"kneeling between his legs, his cock in her mouth",dir:"ab",
      text:"kneels between %m%'s legs, %his% huge, veiny %cock% stretching her lips as she takes it deep, drool and precum running down her chin, %his% hand on her head",tags:"fellatio, deepthroat, kneeling, drooling, saliva trail, hand on another's head"}};
  /* the man: nobody in particular */
  const MAN={pov:"Seen from the man's point of view (pov), only his muscular body, strong hands and huge, veiny cock are visible; his face is never shown.",
    far:"The man is a faceless, muscular, broad-shouldered man whose head stays out of frame; only his strong body, hands and huge, veiny cock are seen."};
  const cnt=pv=>pv?"1girl, 1boy, pov, faceless male, muscular male, hetero":"1girl, 1boy, faceless male, head out of frame, muscular male, hetero";
  const fillM=(s,solo)=>s.replace(/%M%/g,solo?"The man":"{Partner}").replace(/%m%/g,solo?"the man":"{partner}").replace(/%his%/g,solo?"his":"{his}")
    .replace(/%him%/g,solo?"him":"{him}").replace(/%he%/g,solo?"he":"{he}").replace(/%cock%/g,solo?"cock":"{cock}");

  const EXN=["full ahegao face, eyes rolled back, tongue out and drooling","blissed-out, heart-eyed, lewd smile","mocking, lustful grin","smug, half-lidded, lustful smile",
    "lewd, triumphant grin with her tongue out","open-mouthed, moaning, heart-eyed expression","dazed, heart-eyed, drooling smile"];
  const EXG=["crying, guilt-ridden, deeply flushed face","ashamed, teary-eyed expression, blushing to her ears","mortified face half hidden behind her hands, ears bright red",
    "lip-biting, tear-streaked, guilty and aroused expression","sobbing, guilty, but lustful expression","flustered, mortified, full-face blush with tears in her eyes","guilty, trembling, heavy-lidded expression with tears on her cheeks"];
  EXN.concat(EXG).forEach(v=>START.option("expression",v,GX));
  Object.values(POS).forEach(p=>START.option("posture",p.pose,GX));
  START.option("pupilStyle","heart pupils",GX);

  /* r: [house, key, name, pos, place, ex (index or text), line, detail, tags, w1 overrides, blurb] */
  function make(label,after,pre,oname,TAIL,kind,list){
    START.add(label,list.map(([h,key,name,pk,place,ex,line,detail,tags,w,blurb])=>{
      const P=POS[pk],exv=typeof ex==="number"?(kind==="ntr"?EXN:EXG)[ex]:ex;
      const rb=tplById(ACAD.robes(h))||tplById(h+"robes"),T=PAIR.sceneColors(rb&&rb.pal,rb&&rb.c);
      const w1i=Object.assign({ringAccessory:["gold wedding band","-"]},w||{});Object.keys(w1i).forEach(k=>{if(!w1i[k])delete w1i[k]});
      const res=items=>{const o={};Object.entries(items).forEach(([f,a])=>{const b=a.slice();b[1]=PAIR.toneOf(b[1],T);if(b[3])b[3]=PAIR.toneOf(b[3],T);o[f]=b});return o};
      const art=/^[aeiou]/i.test(exv)?"an":"a";
      const face=kind==="ntr"?`She has ${art} ${exv}, and she moans "${line}" in a big speech bubble full of hearts.`
        :`She has ${art} ${exv}; she is overwhelmed with guilt and embarrassment but clings on and keeps going, and she sobs "${line}" in a trembling speech bubble.`;
      const body=s=>`Setting: ${place}. The woman ${fillM(P.text,s)}. ${fillM(detail,s)} ${face} ${s?MAN[P.pov?"pov":"far"]+" ":""}Lewd sound effects. `;
      const tg=dedupe(`${TAIL}, ${P.tags}, ${tags}, speech bubble, sweat, motion lines, cum in pussy, cum overflow`);
      const c1=Object.assign({},AROUSE,{expression:exv,posture:P.pose},kind==="ntr"?{pupilStyle:"heart pupils"}:{});
      return{id:pre+key,base:ACAD.robes(h),name,c:Object.assign({age:"woman"},c1),
        outfit:{oname,look:"boudoir",items:res(w1i),details:{},dcol:{}},more:[],nude:true,
        out:{framing:P.pov?"cowboy shot":"full body",explicit:true,lewdtag:true,must:"an anime style with high detail, and particular emphasis on her face, her expression, highly detailed skin, hair and eyes",
          pair:{id:"",outfit:"scene",solo:body(true)+tg,soloCount:cnt(P.pov),scene:body(false)+tg,act:P.act,dir:P.dir||"ba",explicit:true,penis:true,
            c1,w1:{name:oname,look:"boudoir",f:w1i},w2:{name:oname,look:"boudoir",m:{},f:{}},compact:false,fit:true}},
        tags:(kind==="ntr"?["ntr","netorare","cheating"]:["cheating","guilty"]).concat(["explicit","sex","faceless male","single scene",h]),
        blurb:`${blurb} ${cap(h)}; the man is faceless, so it's all about her. Pick a partner in the Scene tab to make him someone.`};
    }),{after});
  }

  /* ======================= Not His Anymore (NTR) ======================= */
  const NT="netorare, cheating (relationship), infidelity, married woman, wedding ring, heart, spoken heart";
  make("Academy Not His Anymore","Academy NTR Sisters","nh","Not his",NT,"ntr",[
["griffin","videocall","Hang up, honey","nelson","her captain's quarters, a tablet propped on the desk showing a video call with her husband's shocked face in a small window",0,
  "I don't need you anymore, honey♡ He's so much better than you! I'm his now♡",
  "She is spread wide toward the tablet so her husband can see everything, her wedding band glinting on the hand flashing a peace sign at the screen, cum already spilling out of her around %his% shaft.",
  "video call, tablet, screen, peace sign, ring, ahegao, spread pussy",{},"Held up in a full nelson in front of a video call, telling her husband she's done with him."],
["badger","photo","Your little thing","cowgirl","a sunny cottage kitchen, a framed wedding photo of her and her husband knocked over on the table beside them",1,
  "Your little thing never made me feel like this... I'm done with you, honey♡",
  "She holds the wedding photo up beside her face with one hand while she bounces, comparing, her enormous breasts swaying, and her vagina clenches and squirts around %his% %cock%.",
  "kitchen, table, wedding photo, picture frame, holding picture, comparison, squirting, female ejaculation",{},"Riding him on the kitchen table, holding up her wedding photo to compare."],
["raven","forget","Forget him","press","her marriage bed under a skylight full of stars, her wedding ring abandoned on the nightstand",0,
  "Forget my husband... only this cock... only you, forever♡",
  "Her toes curl in the air above %his% shoulders and her belly twitches with each deep thrust, her ringless hand clawing at the sheets, cum pumping out of her stretched vagina.",
  "bed, night, skylight, ring, curled toes, sheet grab, cum overflow, ringless",{ringAccessory:null},"Folded in a mating press on her marriage bed, her ring on the nightstand."],
["serpent","dropring","Never enough","window","a penthouse window at night, the city glittering far below",3,
  "He was never enough for me... ruin me for him, completely♡",
  "With her free hand she holds her wedding ring up against the glass, then lets it drop, her breath fogging the window and her breasts squashed flat against it.",
  "window, night, city lights, cityscape, fogged glass, ring, dropping, smug",{legwear:["lace garter stockings","@dark"]},"Against the penthouse window, letting her husband's ring drop."],
["wolf","cantcum","Can't even make me cum","reverse","a log cabin bedroom with a fur throw, a full moon over dark pines in the window",4,
  "My husband can't even make me cum... yours makes me scream♡ I'm never going back to him♡",
  "Body writing on her ass reads 'NOT HUBBY'S♡' with tally marks on her thigh, and she spreads her own cheeks with one hand to show %him% everything.",
  "cabin, fur, full moon, night, body writing, tally, spread ass, looking back, tongue out",{},"Riding in reverse with 'NOT HUBBY'S♡' written on her ass."],
["swan","vows","Everything else","legup","a white bedroom with gauzy curtains, her framed marriage certificate on the wall",5,
  "I gave him my vows... I'm giving you everything else♡ I don't want him anymore♡",
  "Her lifted leg is held straight up past her ear in a dancer's split, her pointed foot trembling, and cum runs down the inside of her standing leg.",
  "bedroom, curtains, certificate, standing split, flexible, pointed toes, cum drip",{},"In a standing split under her own marriage certificate."],
["dragon","divorce","Sign them after","lap","a red-draped tower bedroom, divorce papers and a pen on the table beside them",2,
  "The divorce papers are right there... I'll sign them after you fill me up♡ He's nothing to me now♡",
  "She grinds down hard, nails digging into %his% shoulders, the unsigned divorce papers scattering under her knee.",
  "divorce papers, paper, pen, nail marks, grinding, smirk",{},"Straddling his lap beside her unsigned divorce papers."],
["stag","ourbed","His side of the bed","missionary","her marriage bed in a forest cottage, her husband's pajamas folded on his pillow",6,
  "This bed is yours now... he can sleep on the couch forever♡ I don't need him at all♡",
  "Her head lies on her husband's pillow, crumpling his folded pajamas, as her legs shake around %his% hips and cum overflows onto his side of the bed.",
  "bedroom, bed, pillow, pajamas, trembling, shaking legs, heart-shaped pupils",{},"In the missionary position on her husband's side of the bed."],
["shark","breed","Never going back","doggy","the balcony of a beach house at sunset, the ocean glittering beyond the railing",0,
  "I'm never going back to him... breed me, make me yours♡",
  "She is bent over the balcony railing on all fours on a deck lounger, tongue lolling, her wedding band clinking against the metal as cum drips onto the deck.",
  "balcony, beach, ocean, sunset, railing, lounge chair, ahegao, cum drip",{},"On the beach-house balcony, begging to be his instead."],
["penguin","snowedin","Stay snowed in","cowgirl","a snowed-in cabin by a crackling fire, snow piling against the frosted window, her phone ringing on the rug with her husband's name",1,
  "Stay snowed in, honey... I don't need you home anymore♡",
  "She lets her husband's call ring on the fur rug and bounces harder instead, her heavy breasts swaying and her freckled skin flushed pink from the fire.",
  "snow, winter, cabin, fireplace, fur rug, frosted window, phone, incoming call, ignoring",{},"Riding by the fire while she lets her husband's call ring."],
["fox","toy","A toy compared","press","a tatami room with paper screens at dusk, her husband's yukata folded neatly in the corner",0,
  "His was a toy compared to this... I'm yours now, only yours♡",
  "Her bushy hair is spread across the tatami and her fox-like eyes are rolled back, her stomach bulging slightly with each thrust, cum flooding out of her.",
  "tatami, shouji, dusk, yukata, stomach bulge, ahegao, cum overflow",{},"Folded in a mating press on the tatami beside her husband's folded yukata."],
["lovebird","heart","Only this","lap","a pastel bedroom full of hearts and fairy lights, a heart-shaped couple's photo frame turned face-down",5,
  "My heart only beats for this cock now... sorry, hubby, it's over♡",
  "Little hearts float all around her as she kisses %his% neck between moans, her heart-shaped pupils glowing and her ring finger tracing a heart on %his% chest.",
  "heart, fairy lights, picture frame, kissing neck, heart-shaped pupils, spoken heart",{},"In his lap in her pastel bedroom, telling her husband it's over."],
["flamingo","stay","Tell him I'm staying","reverse","a pink villa poolside at sunset with palm silhouettes, her husband's text on the phone beside her: \"When are you coming home?\"",4,
  "Tell him I'm staying here forever♡ I don't need him anymore♡",
  "She types a reply with one thumb while bouncing, her ass rippling, the screen reading \"never♡\".",
  "poolside, pool, palm tree, sunset, phone, text message, holding phone, looking back, tongue out",{},"Riding poolside while she texts her husband \"never♡\"."],
["kraken","deep","He never reached","nelson","a bedroom with a glowing aquarium wall, everything bathed in shimmering blue",0,
  "Look how deep... he never reached here! Bye-bye, husband♡",
  "A cross-section shows %his% %cock% pressed all the way against her womb, and she cradles her twitching lower belly with both hands, wedding band and all.",
  "aquarium, blue theme, cross-section, x-ray, hands on own stomach, ahegao, spread legs",{},"Held in a full nelson, showing off how deep he goes."],
["salmon","forgot","Can't even remember","prone","a minimalist riverside bedroom with cherry-wood accents, her husband's photo on the nightstand",6,
  "Hubby's tiny dick... I can't even remember it anymore♡ only yours, only yours♡",
  "She turns her face from the pillow toward her husband's photo, drooling onto the sheets with a dazed, heart-eyed grin, her ass bouncing against %his% hips.",
  "bedroom, bed, picture frame, drooling, heart-shaped pupils, ass, ass ripple",{},"Pinned in a prone bone, looking at her husband's photo."],
["crow","keepring","Keep the ring","cowgirl","a glittering high-roller hotel suite at night",3,
  "Keep your little ring, honey... I want this instead♡",
  "She flicks her wedding band off her finger and it spins away through the air, sparkling, as she sinks all the way down onto %his% %cock%.",
  "hotel room, night, city lights, ring, flicking, sparkle, smug, ringless",{ringAccessory:null},"Flicking her wedding ring away while she rides him."],
["owl","boringbed","Never going back","legup","between the towering shelves of an old library at night, a full moon in the tall window",5,
  "I'll never go back to his boring bed... this is what I needed all along♡",
  "Her round glasses are fogged and askew, books tumble off the shelf behind her, and her long legs tremble as cum drips down to her ankle.",
  "library, bookshelf, night, moonlight, glasses, fogged glasses, falling books, cum drip",{eyewear:["round glasses","@metal"]},"Against a library bookshelf, done with her husband's boring bed."],
["rat","realman","A real man","doggy","a cramped, cluttered apartment full of thrifted treasures and string lights, on a lumpy couch",2,
  "Look, honey, this is what a real man feels like♡ don't bother coming home♡",
  "She holds her phone up and back in one hand, recording a video for her husband with the screen showing \"REC\", grinning into it as she pushes back against %him%.",
  "apartment, couch, string lights, phone, recording, rec, holding phone, looking back, grin",{},"On all fours on her couch, recording a video for her husband."]
  ]);

  /* ======================= Guilty Cheating ======================= */
  const GT="cheating (relationship), infidelity, guilt, embarrassed, tears, crying, full-face blush, wedding ring, consensual";
  make("Academy Guilty Cheating","Academy Not His Anymore","gc","Guilty",GT,"guilty",[
["griffin","sorry","I love my husband","missionary","a captain's quarters at night, her husband's coat hanging on the door",0,
  "I'm so sorry... I love my husband... why can't I stop...♡",
  "She covers her eyes with her ringed hand as she cries, but her legs wrap tighter around %him% with every thrust.",
  "door, coat, covering eyes, ring, leg lock, tears",{},"Crying that she loves her husband, legs wrapped tighter anyway."],
["badger","calling","He's calling","window","a cottage pantry window looking out on the garden, honey jars on the shelves",3,
  "No, no, it's him calling... I'm sorry, honey, I'm so sorry...",
  "Her phone buzzes on the windowsill beside her face with her husband's name and a heart, and she stares at it with tears streaming as she is pushed against the glass again and again.",
  "pantry, window, garden, jar, phone, incoming call, staring, tears",{},"Against the pantry window while her husband's name lights up her phone."],
["raven","dontlook","Don't look at me","cowgirl","a dim hotel room in the rain, raindrops streaking the window",2,
  "Don't look at me... I'm the worst wife in the world...",
  "She tries to hide her face behind her long hair and both hands as she rides, ears bright red, her hips moving on their own.",
  "hotel room, rain, window, covering face, hair over face, embarrassed, blush",{},"Riding him in a rainy hotel room, hiding her face in shame."],
["serpent","never","This never happened","lap","the back seat of a luxury car in a dark parking garage, the windows fogged",5,
  "This never happened... please, he can never, ever know...",
  "Her haughty composure is shattered, tears on her cheeks and a full-face blush, her silky hair a mess as she clings to %him%.",
  "car interior, back seat, parking garage, fogged window, clinging, messy hair, tears, blush",{},"In the back seat, begging that this never happened."],
["wolf","neverbefore","Never cheated before","doggy","a log cabin bedroom with a fur throw, her husband's flannel shirt hanging on the bedpost",3,
  "I've never cheated before... I'm sorry, I'm sorry... I'm sorry...",
  "She bites the pillow to muffle herself between sobbed apologies, her tough face crumpled with guilt and pleasure.",
  "cabin, fur, flannel, pillow biting, biting, tears, crying with eyes open",{},"On all fours in the cabin, sobbing her first-time-cheating apologies."],
["swan","mirror","Can't look at myself","legup","a ballet studio after hours, a wall of mirrors and a barre",1,
  "I can't even look at myself... what kind of wife am I...",
  "In the mirror wall her reflection stares back, flushed and crying with her leg held high, and she turns her face away in shame.",
  "ballet studio, mirror, reflection, barre, standing split, looking away, tears",{},"In the ballet studio, unable to face herself in the mirror."],
["dragon","justonce","Just this once","press","a neon love hotel room with a round bed and red lights",4,
  "Just this once... just once... I'll never do it again...",
  "Her fierce face is crumpled, tears rolling into her hair, her ringed hand gripping %his% arm as her legs shake.",
  "love hotel, round bed, neon lights, red lights, shaking legs, tears",{},"Folded under him in a love hotel, promising herself it's just once."],
["stag","tent","Shh","missionary","a tent at a camping trip at night, her husband's sleeping bag empty beside her and a campfire glowing through the canvas",2,
  "Shh... he's just at the campfire... I'm so ashamed...",
  "She presses her own hand over her mouth, eyes wet and wide, glancing toward the glowing tent flap while her body arches.",
  "tent, camping, night, campfire, sleeping bag, hand over own mouth, glancing, tears",{},"In the tent while her husband sits at the campfire."],
["shark","ring","My ring","window","a beach changing room, sunlight through the slats, the glass of a mirror against her",3,
  "My ring... I forgot to take it off... I'm sorry...",
  "Her ringed hand is splayed on the mirror in front of her face, the wedding band glinting right in her eyeline as she cries.",
  "changing room, mirror, sunlight, ring, hand on glass, tears",{},"Against a changing-room mirror, her wedding ring right in front of her eyes."],
["penguin","car","Terrible girlfriend","lap","a car parked on a snowy mountain road, snow piling on the windshield and the windows steamed",6,
  "This is so wrong... I'm a terrible girlfriend... I'm sorry...",
  "Her freckled cheeks are wet and pink from cold and shame, her heavy breasts pressed to %his% chest, a couple's keychain dangling from the rearview mirror.",
  "car interior, snow, winter, steamed window, keychain, clinging, tears, blush",{ringAccessory:null},"In a car on a snowy road, crying she's a terrible girlfriend."],
["fox","forgive","Forgive me","prone","a room at a hot-spring inn, a futon on the tatami and steam drifting past the paper screens",2,
  "Forgive me... forgive me... dear, forgive me...",
  "Her sly face is gone; she buries it in the futon and sobs, ears red, her ass raised for %him% anyway.",
  "onsen, inn, futon, tatami, shouji, steam, face in pillow, tears",{},"Face-down on an inn futon, sobbing for forgiveness."],
["lovebird","photos","Our photos","missionary","her own pastel bedroom, couple's photos with her boyfriend on every wall",0,
  "I'm sorry, baby... I'm so sorry... I still love you...",
  "She reaches out and turns a couple's photo face-down on the nightstand with a trembling hand, tears running into her ears.",
  "bedroom, heart, picture frame, turning, reaching, tears",{ringAccessory:null},"In her own bedroom, turning their couple's photo face-down."],
["flamingo","fiance","I have a fiancé","window","a hotel bathroom on a business trip, a big mirror over the sink",1,
  "What am I doing... I have a fiancé... I'm getting married...",
  "Her engagement ring sparkles on the hand braced on the mirror, and she watches her own tear-streaked, flushed face in it in disbelief.",
  "bathroom, sink, mirror, reflection, engagement ring, tears",{ringAccessory:["engagement ring with a large diamond","-"]},"In a hotel bathroom on a work trip, staring at her engagement ring."],
["kraken","homesoon","Home soon","missionary","an office after hours, on a desk among papers, a text from her husband on her phone: \"Love you, home soon?\"",5,
  "I'll be home soon, honey... I'm so sorry...",
  "She types \"working late, love you\" with shaking fingers between sobs, papers scattering under her back.",
  "office, desk, on desk, papers, phone, text message, typing, tears",{top:["short silk robe hanging open","@c1"]},"On an office desk, texting her husband she's working late."],
["salmon","karaoke","Wrong song","lap","a karaoke booth with flashing colored lights, a love song still playing on the screen",3,
  "This is our song... I'm sorry... I'm so sorry...",
  "The couple's love song she sings with her husband plays on the screen behind her as she cries and grinds, the microphone dropped on the couch.",
  "karaoke, microphone, screen, colored lights, grinding, tears",{},"In a karaoke booth while her and her husband's song plays."],
["crow","horrible","Horrible person","reverse","a cheap motel room with a buzzing neon sign outside",2,
  "I'm a horrible person... a horrible, horrible person...",
  "She covers her face with both hands as she rides, peeking through her fingers, her cheeks and ears burning red.",
  "motel, neon lights, covering face, peeking through fingers, embarrassed, blush",{},"Riding in reverse in a motel, hiding her face in her hands."],
["owl","married","I'm married","missionary","a library study room at night, on a long table among open books",6,
  "Shh... this is wrong... I'm married... I'm married...",
  "Her round glasses are fogged and crooked, tears trickling under them, her ringed hand gripping the table's edge.",
  "library, study room, night, table, on table, books, glasses, fogged glasses, tears",{eyewear:["round glasses","@metal"]},"On a library table at night, whispering that she's married."],
["rat","waiting","He's waiting at home","doggy","the back room of a laundromat at night, on top of a rumbling dryer",3,
  "He's waiting for me at home... I'm sorry... I'm sorry...",
  "Her laundry basket with her husband's shirts sits right beside her, and she clutches one of them to her face as she cries.",
  "laundromat, dryer, laundry basket, holding clothes, night, tears",{},"On a laundromat dryer, clutching her husband's shirt."]
  ]);
})();
