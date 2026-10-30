/* ---- v230: four refinements.
   1. Robes are character sheets: each girl's House robes now stand in a plain stance, with no props, actions or scenery;
      the poses that told her story stay in her Signature look and her regalia, which already carry them.
   2. Sleeping Houses wake: when a girl is made for one (Begin a girl, or the Biography's House picker), its faded sigil is
      replaced everywhere by its own animal head, in the same pixel style as the living girls.
   3. The second chair sits under each girl's banner, where it is easy to find.
   4. Second banners: a girl has one House and one group, and may carry a second banner for another group, living or
      sleeping. Each lost group has a champion among the living girls, many sleeping Houses would fly a living group's
      banner as well as their own, and an Original Character can plan both and write them into her Biography. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  const T=id=>typeof tplById==="function"?tplById(id):null;

  /* ---------- 1. robes: a plain stance for every girl ---------- */
  const STANCE={
    kitsune:"standing with a sly, sidelong smile and one hand at her hip",pegasus:"standing tall and light on her feet, shoulders back",
    kirin:"standing upright and at attention, chin raised",sphinx:"standing with her arms folded and her chin lifted, wearing a knowing look",
    siren:"languid stance with her weight on one hip and her head tilted",manticore:"wide, aggressive stance with her fists clenched at her sides",
    jaguar:"low-shouldered, intense stance, glaring through her bangs",cougar:"relaxed stance with her arms crossed under her breasts",
    cheetah:"cocky, athletic stance with a confident grin",caracal:"tense, combative stance with her fists balled",serval:"springy, alert stance with her knees slightly bent",
    arcticfox:"standing with a finger to her lips and a secretive smile",hyena:"loose, slouching stance with a wide, cackling grin",
    jackal:"very still, watchful stance with her hands folded in front of her",husky:"eager, bright-eyed stance, leaning slightly forward",
    dingo:"barefoot, easy stance with her hands on her hips",fennec:"attentive stance with her head tilted, listening",shiba:"stubborn stance with her arms crossed and her nose in the air",
    harpseal:"soft, sleepy stance with her hands tucked under her chin",narwhal:"dreamy, graceful stance with one hand resting on her collarbone",
    polarbear:"gentle, relaxed stance with a sleepy smile",otter:"playful stance with her hands clasped behind her back",reindeer:"standing with her face tilted up and a soft smile",
    beluga:"cheerful stance with her hands pressed together under her chin",ermine:"haughty stance with her nose in the air and her hands folded",
    puffin:"cheerful, slightly pigeon-toed stance with a wide grin",dolphin:"sporty, easygoing stance with her arms loose at her sides",
    jellyfish:"languid, weightless-looking stance with her arms loose",seahorse:"dreamy stance with both hands pressed over her heart",
    manta:"calm, elegant stance with her arms held slightly out from her sides",koi:"serene stance with her hands folded in front of her",
    eel:"sly, sideways stance with a look over her shoulder",angelfish:"ballet stance in first position, arms in a soft curve",
    eagle:"commanding stance, standing tall with her shoulders squared",falcon:"balanced, upright fencer's stance with her hands at her sides",
    hawk:"upright archer's stance, one eye narrowed and focused",vulture:"patient stance with her arms crossed and her head tilted",
    osprey:"athletic diver's stance with her arms at her sides",magpie:"sly stance with a wink and one hand on her hip",
    snowyowl:"perfectly still stance with her head tilted, watching",peacock:"vain, chin-up stance with one hand on her hip",
    hummingbird:"flirty stance with a wink and her weight on one foot",macaw:"dramatic diva stance with one hand on her chest",
    cockatoo:"showy stance with her hands on her hips and a big grin",birdofparadise:"flamboyant, theatrical stance with one hand on her hip",
    kingfisher:"poised, athletic stance with her arms at her sides",raccoon:"sneaky stance with a sly glance over her shoulder",
    rabbit:"bright stance with her hands clasped in front of her, beaming",squirrel:"energetic stance with a mischievous grin",
    hedgehog:"shy stance with her hands clasped and a blush",redpanda:"sleepy, relaxed stance with heavy-lidded eyes",
    koala:"drowsy stance with heavy-lidded eyes and a soft smile",cobra:"sinuous stance with her hips swayed to one side",
    viper:"low, ready stance with her hands loose at her sides",chameleon:"shy stance, half-turned away with a hesitant smile",
    gecko:"springy stance with a grin over her shoulder",crocodile:"lazy, confident stance with her hands laced behind her head",
    iguana:"relaxed, sun-drowsy stance with her eyes half closed",axolotl:"cheerful stance with a huge smile and her hands open",
    frog:"lively stance with a big open-mouthed smile",turtle:"calm, unhurried stance with her hands folded",
    spider:"languid stance with her weight on one hip and her arms folded",ladybug:"sunny stance with her hands clasped behind her back",
    moth:"dreamy, wistful stance with her hands clasped at her chest",dragonfly:"light, energetic stance with a wide grin",
    beetle:"sturdy stance with her hands on her hips and a grin",mantis:"poised martial artist's stance with her hands at her sides"};
  ACAD.ROBES_STANCE=STANCE;
  Object.entries(STANCE).forEach(([h,v])=>{const t=T(h+"robes");if(!t)return;
    if(t.c&&typeof t.c==="object")t.c.posture=v;
    if(typeof t._mk_c==="function"){const mk=t._mk_c;t._mk_c=function(){const c=mk.apply(this,arguments);if(c)c.posture=v;return c}}});

  /* a color written twice ("bronze bronze claw pendant") when an item's own words repeat its color: the second goes */
  {const last=v=>String(v||"").trim().split(/\s+/).pop().toLowerCase();
    TEMPLATES.forEach(t=>{const pal=t.pal||{};const col=v=>typeof v==="string"&&v[0]==="@"?pal[v.slice(1)]:v;
      [t.outfit].concat(t.more||[]).forEach(o=>{if(!o||!o.items)return;Object.entries(o.items).forEach(([f,a])=>{if(!Array.isArray(a)||typeof a[0]!=="string")return;
        let s=a[0];const c1=last(col(a[1])),c2=last(col(a[3]));
        if(c1&&s.includes("{c} "+c1+" "))s=s.replace("{c} "+c1+" ","{c} ");
        if(c2&&s.includes("{c2} "+c2+" "))s=s.replace("{c2} "+c2+" ","{c2} ");
        if(c1&&!s.includes("{c")&&s.toLowerCase().startsWith(c1+" "))s=s.slice(c1.length+1);
        if(s!==a[0]){const b=a.slice();b[0]=s;o.items[f]=b}})})})}
  if(typeof ENC==="undefined"||!ENC.ROLL)return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl,G=ENC.G;
  const low=n=>String(n||"").replace(/^The /,"the ");
  const ROLL=ENC.ROLL,LOST=Object.fromEntries(ROLL.map(g=>[g.id,g]));
  const HOUSE={};ROLL.forEach(g=>g.houses.forEach(h=>{HOUSE[h.id]={g,h}}));
  const FX=id=>ENC.FACTIONS.find(f=>f.id===id);

  /* ---------- 2. the sleeping Houses' own heads, shown once woken ---------- */
  const PX=ENC.ROLLPX||{},pcache={};
  ENC.rollIconURL=id=>{if(pcache[id])return pcache[id];const p=PX[id];if(!p)return"";const cv=document.createElement("canvas");cv.width=16;cv.height=16;const x=cv.getContext("2d");
    p.r.forEach((row,y)=>{for(let i=0;i<16;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=p.c[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return pcache[id]=cv.toDataURL("image/png")}catch(e){return""}};
  ENC.rollIcon=(id,size)=>E("img",{src:ENC.rollIconURL(id),width:size||32,height:size||32,alt:"",class:"enc-px pxhead roll-head"});
  const KEY="everspire.awake.v1";
  const readAwake=()=>{try{return new Set(JSON.parse(localStorage.getItem(KEY)||"[]"))}catch(e){return new Set()}};
  const writeAwake=s=>{try{localStorage.setItem(KEY,JSON.stringify([...s]))}catch(e){}};
  let AW=readAwake();
  /* v267: "Let it sleep" puts a House back to sleep even when a saved design still names it as her House (the
     Houses put back to sleep are kept in everspire.slept.v1); only the design open now keeps it awake. Waking it
     again (beginning a girl for it, choosing it in her Biography) takes it off that list. ENC.houseLeft(name) lets
     a House sleep when the design's House changes away from it, if it was woken here. */
  const SKEY="everspire.slept.v1";let SL;try{SL=new Set(JSON.parse(localStorage.getItem(SKEY)||"[]"))}catch(e){SL=new Set()}
  const writeSlept=()=>{try{localStorage.setItem(SKEY,JSON.stringify([...SL]))}catch(e){}};
  ENC.markRevived=id=>{if(!HOUSE[id])return;AW.add(id);writeAwake(AW);if(SL.delete(id))writeSlept()};
  ENC.letSleep=id=>{AW.delete(id);writeAwake(AW);if(HOUSE[id]){SL.add(id);writeSlept()}};
  const byName={};ROLL.forEach(g=>g.houses.forEach(h=>{byName[h.name.toLowerCase()]=h.id;byName[(h.name+" House").toLowerCase()]=h.id}));
  ENC.sleepingByName=n=>{const id=byName[String(n||"").toLowerCase().replace(/,? *\(?ward\)?$/,"").trim()];return id?HOUSE[id]:null};
  /* a House is awake if a girl was begun for it here, or the current design or any saved design names it as her House */
  ENC.isAwake=id=>{if(AW.has(id))return true;const nm=(HOUSE[id]?HOUSE[id].h.name+" House":"").toLowerCase();if(!nm)return false;
    try{if(typeof S!=="undefined"&&S.bio&&String(S.bio.house||"").toLowerCase()===nm)return true}catch(e){}
    if(SL.has(id))return false;
    try{if(typeof readSaves==="function"&&readSaves().some(s=>s.state&&s.state.bio&&String(s.state.bio.house||"").toLowerCase()===nm))return true}catch(e){}
    return false};
  const curNames=id=>{try{const nm=(HOUSE[id].h.name+" House").toLowerCase();return typeof S!=="undefined"&&S.bio&&String(S.bio.house||"").toLowerCase()===nm}catch(e){return false}};
  ENC.houseLeft=name=>{const id=byName[String(name||"").toLowerCase().trim()];if(id&&AW.has(id))ENC.letSleep(id)};
  const idOf=(gid,hname)=>{const g=LOST[gid];const h=g&&g.houses.find(x=>x.name===hname);return h&&h.id};
  const sig0=ENC.sigil;
  ENC.sigil=(gid,hname,size)=>{const id=idOf(gid,hname);if(id&&ENC.isAwake(id)&&PX[id]){const im=ENC.rollIcon(id,size);im.classList.add("awake");im.title=hname+" House, awake";return im}return sig0(gid,hname,size)};
  ENC.rollIconOrSigil=(gid,h,size)=>ENC.sigil(gid,h.name,size);

  /* ---------- 4. second banners: data ---------- */
  const CHAMP={herd:["stag","the only hoofed girl in the Grove, who rides the old meadow at dawn"],choir:["lovebird","she still sings the Choir's morning songs in the conservatory"],
    gilded:["griffin","the Legends have kept the Gilded's table set for three centuries, and Griffin sets it"],orchard:["badger","she has been replanting the orchard and keeps a list of every tree"],
    tide:["otter","she studies the open sea the Tide once kept, and swims the sea stair every summer"],savanna:["lioness","the Pride learned to rule from the Savanna, and its queen has not forgotten"],
    blazon:["unicorn","the unicorn is the oldest beast in heraldry, and she knows every blazon by heart"],nightcourt:["moth","she keeps the hours between midnight and dawn, as the Night Court did"],
    abyss:["kraken","the Abyss was the Deep's own elders, and its queen would never leave them in the dark"],wildhunt:["wolf","the Hunt rode at the Pack's heels, and the Pack has never forgotten"],
    wyrms:["serpent","the Wyrms lent the Coil its patience and its ledger, and Serpent means to repay them"],masquerade:["fox","the best trickster awake would love an audience of tricksters"],
    sands:["scorpion","the Hive's sting has always admired the Sands' patience"],familiars:["raven","the Familiars' parliament met in the rookery, and Raven still keeps its minutes"],
    heavens:["snowyowl","she has watched the uncharted stars every night of the Rooftop Watch"],titans:["crocodile","she is as patient as the oldest things alive"],
    wilds:["jaguar","the jungle's own queen, born to it"],peaks:["leopard","a snow leopard belongs above the clouds"],
    hollowhills:["kitsune","a fox spirit has always been welcome in the fairy rings"],hearth:["panda","she feeds everyone, Dawn and Dusk alike, which is the Hearth's whole creed"]};
  const ALSO_ID={elk:"grove",moose:"grove",gazelle:"pride",nightingale:"plumes",mockingbird:"masquerade",hippogriff:"legends",roc:"talons",thunderbird:"talons",garuda:"talons",firebird:"plumes",simurgh:"plumes",
    marten:"talons",mole:"talons",skunk:"pack",walrus:"frost",sealion:"frost",humpback:"deep",swordfish:"deep",albatross:"talons",pelican:"plumes",
    meerkat:"talons",secretarybird:"talons",ostrich:"plumes",elephant:"grove",tyger:"pride",calygreyhound:"pack",opinicus:"legends",
    bat:"talons",nightjar:"talons",flyingfox:"pack",civet:"pride",genet:"pride",loris:"coil",
    barracuda:"deep",lionfish:"deep",moray:"deep",stingray:"deep",giantsquid:"deep",
    warg:"pack",fenrir:"pack",blackshuck:"pack",cusith:"hollowhills",naga:"coil",basilisk:"coil",hydra:"coil",wyvern:"legends",
    tanuki:"grove",jackdaw:"talons",shrike:"talons",lyrebird:"plumes",cuckoo:"plumes",kumiho:"hollowhills",bakeneko:"familiars",
    sandcat:"pride",sidewinder:"coil",gilamonster:"coil",monitor:"coil",thornydevil:"coil",
    blackcat:"pride",rook:"talons",barnowl:"talons",toad:"coil",newt:"coil",adder:"coil",deathshead:"hive",witchhare:"grove",
    skoll:"pack",hati:"pack",yatagarasu:"talons",jadehare:"grove",starwhale:"deep",tianma:"legends",bennu:"plumes",chrysomallos:"legends",cetus:"deep",
    smilodon:"pride",direwolf:"pack",megalodon:"deep",cavebear:"frost",mammoth:"frost",pteranodon:"talons",terrorbird:"talons",
    ocelot:"pride",harpyeagle:"talons",toucan:"plumes",quetzal:"plumes",anaconda:"coil",sloth:"grove",capybara:"grove",coati:"grove",orangutan:"grove",
    wolverine:"pack",lammergeier:"talons",marmot:"grove",pika:"grove",yak:"frost",takin:"frost",
    kelpie:"deep",selkie:"frost",caitsith:"familiars",jackalope:"grove",almiraj:"grove",bunyip:"deep",wolpertinger:"grove",
    hound:"pack",tabby:"pride",dove:"plumes",ferret:"grove"};
  /* v254: champions and second banners as the canon changes layer has them */
  if(ACAD.canonApply)ACAD.canonApply("champ",{CHAMP,ALSO_ID});
  const anyGroup=id=>G(id)||LOST[id]||null;
  const gName=id=>{const g=anyGroup(id);return g?g.name:""};
  ENC.ALSO={};Object.entries(ALSO_ID).forEach(([h,gid])=>{const n=gName(gid);if(n)ENC.ALSO[h]=n});
  ENC.CHAMP=CHAMP;ENC.ALSO_ID=ALSO_ID;
  const facOfGroup=gid=>{if(G(gid)){const f=ENC.factionOf(gid);return f?f.id:""}const l=LOST[gid];return l?l.faction:""};
  const gLink=gid=>G(gid)?lnk("group:"+gid,G(gid).name):LOST[gid]?lnk("lost:"+gid,LOST[gid].name):"";
  const champOf=h=>Object.entries(CHAMP).filter(([,v])=>v[0]===h).map(([k])=>k);
  /* the champions' Biographies name the banner they would carry */
  if(typeof BIOS!=="undefined")Object.entries(CHAMP).forEach(([k,[h]])=>{if(BIOS[h]&&!BIOS[h].group2)BIOS[h].group2=LOST[k].name});

  /* ---------- begin with a House record in her Biography ---------- */
  ENC.beginSleeping=(g,h)=>{const also=ENC.ALSO[h.id];
    ENC.markRevived(h.id);
    ENC.beginGirl({name:h.name,pal:{primary:g.words[0],secondary:g.words[1],third:g.words[2]},
      bio:Object.assign({house:h.name+" House",group:g.name,groupRole:"Keeper of "+h.name+" House, the first awake in a lifetime"},also?{group2:also}:{}),
      toast:`${h.name} House is awake. A new girl in ${low(g.name)}'s colors, with her House in her Biography. Undo brings your previous design back.`})};
  ENC.beginWardBio=hid=>{const t=T(hid+"robes"),pal=t&&t.pal?Object.assign({},t.pal):{},g=ACAD.GROUP_OF(hid),rv=g&&G(g.rival);
    ENC.beginGirl({name:"Ward of "+HN(hid),pal,bio:Object.assign({house:HN(hid)+" House (ward)",groupRole:"Ward of "+HN(hid)+" House"},g?{group:g.name}:{},rv?{rivalGroup:rv.name}:{}),
      toast:`Started a ward of ${HN(hid)} House, in its colors, with her House and group in her Biography. Undo brings your previous design back.`})};

  /* ---------- 3. the second chair, under the banner; and her second banner in the House record ---------- */
  const bh=ENC.buildHouse;
  ENC.buildHouse=(el,h)=>{bh(el,h);
    const banner=el.querySelector(".enc-banner");
    const bar=E("div",{class:"enc-chairbar"},E("span",null,E("b",null,"The second chair. "),HN(h)+" is "+HN(h)+" House's Keeper; her headmistress may still choose a ward."),
      E("button",{type:"button",class:"enc-load",onclick:()=>ENC.beginWard(h)},"Design your own ward of "+HN(h)+" House"));
    if(banner)banner.after(bar);
    /* v246: a canon girl's sworn banner (ENC.SWORN[h] = [lost group, oath]), beside the champions */
    const sw=(ENC.SWORN||{})[h];const ch=sw&&LOST[sw[0]]?[sw[0]]:champOf(h);const oath=sw&&LOST[sw[0]]?sw[1]:(ch.length?CHAMP[ch[0]][1]:"");
    if(ch.length){const rec=el.querySelector(".enc-side .enc-card dl");
      if(rec)ch.forEach(k=>rec.append(E("dt",null,"Second banner"),E("dd",null,lnk("lost:"+k,LOST[k].name),", if it wakes")));
      const mainCol=el.querySelector(".enc-cols>div");
      if(mainCol){const people=[...mainCol.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="Her people");
        const p=E("p",{class:"enc-p enc-n"},E("b",null,"Second banner. "),HN(h)," has sworn to carry the banner of ",ch.map((k,i)=>[i?" and ":"",lnk("lost:"+k,LOST[k].name)])," if it ever wakes: ",oath,".",tag("n"));
        if(people)people.before(p);else mainCol.append(p)}}};

  /* ---------- lost group pages: the champion, and each House's second banner ---------- */
  ROLL.forEach(g=>{const pg=ENC.pages["lost:"+g.id];if(!pg||!pg.build)return;const ob=pg.build;
    pg.build=el=>{ob(el);
      g.houses.forEach(h=>{const row=el.querySelector("#sl-"+h.id);if(!row)return;const tx=row.querySelector(".tx");
        if(ENC.isAwake(h.id)){const b=row.querySelector("b");if(b)b.append(E("span",{class:"enc-awake"},"Awake"));const sm=row.querySelector(".tx small");if(sm)sm.textContent="Asleep from "+h.since+"; awake now";
          const canonW=(ACAD.HOUSES||[]).includes(h.id)||(ACAD.canonAwake?ACAD.canonAwake():[]).includes(h.id);
          if(canonW){}else if(!curNames(h.id)){const ls=E("button",{type:"button",class:"enc-linkbtn",title:"Put it back to sleep and show its sigil again (this browser only)",onclick:()=>{ENC.letSleep(h.id);ENC.go("lost:"+g.id,true)}},"Let it sleep");row.querySelector(".tx").append(ls)}
          else{const sm2=row.querySelector(".tx");if(sm2)sm2.append(E("small",{class:"enc-muted",style:{display:"block"}},"It is the House of the design open now: give her another House in her Biography and it can sleep again."))}}
        const al=ALSO_ID[h.id];if(al&&tx)tx.append(E("small",{class:"enc-also"},"Would also fly ",gLink(al),"'s banner"))});
      const side=el.querySelector(".enc-side");const C=CHAMP[g.id];
      if(side&&C){const gl=ACAD.GROUP_OF(C[0]);
        side.insertBefore(E("div",{class:"enc-card"},E("h4",null,"Its champion"),E("div",{class:"enc-person"},ENC.pixel(C[0],48),E("div",null,E("b",null,lnk("house:"+C[0],HN(C[0]))),E("div",{class:"enc-note"},gl?gl.name:""))),
          E("p",{style:{fontSize:"14px",lineHeight:1.5,margin:"8px 0 0"}},"Has sworn to carry its banner if it wakes: ",C[1],"."),tag("n")),side.children[1]||null)}
      /* v246: girls who have also sworn to carry it */
      const SW=Object.entries(ENC.SWORN||{}).filter(([,v])=>v[0]===g.id);
      if(side&&SW.length)side.insertBefore(E("div",{class:"enc-card"},E("h4",null,SW.length===1?"Also sworn to it":"Also sworn to it ("+SW.length+")"),
        SW.map(([x,v])=>E("div",{class:"enc-person"},ENC.pixel(x,36),E("div",null,E("b",null,lnk("house:"+x,HN(x))),E("div",{class:"enc-note"},v[1]))))),side.children[C?2:1]||null);
      const mainCol=el.querySelector(".enc-cols>div");
      const n=g.houses.filter(h=>ALSO_ID[h.id]).length;
      if(mainCol)mainCol.append(E("h3",{class:"enc-h"},"Second banners"),
        E("p",{class:"enc-p enc-n"},"A girl who wakes one of these Houses carries ",low(g.name),"'s banner first. ",String(n)," of its Houses would fly a second banner as well, marked above"+(C?"; and ":"."),C?[lnk("house:"+C[0],HN(C[0]))," would carry ",low(g.name),"'s banner beside her own."]:"",tag("n")))}});

  /* ---------- living group pages: who carries a second banner, and who would fly theirs ---------- */
  ACAD.GROUPS.forEach(g=>{const pg=ENC.pages["group:"+g.id];if(!pg||!pg.build)return;const ob=pg.build;
    pg.build=el=>{ob(el);const mainCol=el.querySelector(".enc-cols>div");if(!mainCol)return;
      const champs=g.members.flatMap(h=>champOf(h).map(k=>[h,k]));
      const fly=Object.entries(ALSO_ID).filter(([,gid])=>gid===g.id).map(([hid])=>HOUSE[hid]).filter(Boolean);
      if(!champs.length&&!fly.length)return;
      const sec=[E("h3",{class:"enc-h"},"Second banners"),E("p",{class:"enc-note"},"A girl may carry a second group's banner beside her own. ",lnk("groups","How second banners work"),". ",tag("n"))];
      if(champs.length)sec.push(E("div",{class:"enc-pairs"},champs.map(([h,k])=>E("div",null,E("span",{class:"k"},"Champion"),ENC.pixel(h,22),lnk("house:"+h,HN(h)),"would carry",ENC.lostCrest(k,22),lnk("lost:"+k,LOST[k].name)))));
      if(fly.length)sec.push(E("p",{class:"enc-p enc-n"},String(fly.length)," sleeping Houses would fly ",low(g.name),"'s banner beside their own if they woke:"),
        E("div",{class:"enc-finder-res",style:{maxHeight:"none"}},fly.map(({g:lg,h})=>E("a",{href:"#",title:h.name+" House, "+lg.name,onclick:ev=>{ev.preventDefault();ENC.go("lost:"+lg.id)}},ENC.sigil(lg.id,h.name,32),E("span",null,h.name)))));
      const anchor=[...mainCol.querySelectorAll("h3.enc-h")].find(x=>/^In the /.test(x.textContent));
      sec.forEach(n=>anchor?mainCol.insertBefore(n,anchor):mainCol.append(n))}});

  /* ---------- the rules, on the Houses and Groups page ---------- */
  {const p=ENC.pages["groups"];if(p&&p.build){const ob=p.build;p.build=el=>{ob(el);const art=el.querySelector(".enc-article")||el;
    const at=[...art.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="The sleeping Houses");
    const nodes=[E("h3",{class:"enc-h",id:"banners"},"First and second banners"),
      E("p",{class:"enc-p enc-n"},ACAD.lore("groups.banners","Every girl has one House and flies one group's banner: her first banner. She may carry a second, for one other group, when that group's leader offers it and her own leader allows it. She may sit at either table, wears the second group's colors as a sash on feast days, and may compete for either group in the Spire Cup, though never for both in the same contest. Her points count for her first banner."),tag("n")),
      E("ul",{class:"enc-list enc-n"},
        E("li",null,ACAD.lore("groups.banner.sleeping","A second banner may be a sleeping group's. When a lost group wakes, girls of its kin carry its banner until it has ten Houses of its own; every lost group already has a sworn "),E("b",null,"champion"),", such as Kraken for the Abyss."),
        E("li",null,ACAD.lore("groups.banner.waking","A girl who wakes a sleeping House flies her lost group's banner first, and often a living group's second: a waking Barracuda or Lionfish would swim with the Deep as much as with the Abyss.")),
        E("li",null,ACAD.lore("groups.banner.line","A second banner across the line between Dawn and Dusk is allowed by the Accord, rare, and always a story.")),
        E("li",{class:"enc-list-tag"},tag("n"))),
      E("p",{class:"enc-note"},lnk("oc","Original Characters")," has a planner for her banners, and her Biography has a Second banner field.")];
    nodes.forEach(n=>at?art.insertBefore(n,at):art.append(n))}}}

  /* ---------- Original Characters: plan her House and banners ---------- */
  {const p=ENC.pages["oc"];if(p&&p.build){const ob=p.build;p.build=el=>{ob(el);const art=el.querySelector(".enc-article")||el;
    const at=[...art.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="Making her");
    const opt=(v,t)=>E("option",{value:v},t);
    const houseSel=E("select",{"aria-label":"Her House"},opt("","Choose her House"),
      E("optgroup",{label:"A ward of a living House"},...ACAD.GROUPS.flatMap(g=>g.members.map(h=>opt("live:"+h,HN(h)+" House ("+g.name+")")))),
      ...ROLL.map(g=>E("optgroup",{label:"Wake a sleeping House: "+g.name},...g.houses.map(h=>opt("lost:"+h.id,h.name+" House")))));
    const groupOpts=()=>[opt("","None"),E("optgroup",{label:"Living groups"},...ACAD.GROUPS.map(g=>opt(g.id,g.name))),E("optgroup",{label:"Sleeping groups"},...ROLL.map(g=>opt(g.id,g.name)))];
    const firstSel=E("select",{"aria-label":"Her first banner"},...groupOpts()),secondSel=E("select",{"aria-label":"Her second banner"},...groupOpts());
    const out=E("div",{class:"enc-plan-out"});
    const state=()=>{const v=houseSel.value;if(!v)return null;const [k,id]=v.split(":");if(k==="live")return {live:id};return HOUSE[id]?{lost:HOUSE[id]}:null};
    houseSel.onchange=()=>{const s=state();if(!s)return show();
      if(s.live){const g=ACAD.GROUP_OF(s.live);firstSel.value=g?g.id:"";secondSel.value=""}
      else{firstSel.value=s.lost.g.id;secondSel.value=ALSO_ID[s.lost.h.id]||s.lost.g.kin||""}
      show()};
    firstSel.onchange=secondSel.onchange=()=>show();
    const bioFor=()=>{const s=state();if(!s)return null;const b={};
      if(s.live){b.house=HN(s.live)+" House (ward)";b.groupRole="Ward of "+HN(s.live)+" House"}else{b.house=s.lost.h.name+" House";b.groupRole="Keeper of "+s.lost.h.name+" House"}
      if(firstSel.value){b.group=gName(firstSel.value);const lg=G(firstSel.value),rv=lg&&G(lg.rival);if(rv)b.rivalGroup=rv.name}
      if(secondSel.value&&secondSel.value!==firstSel.value)b.group2=gName(secondSel.value);return b};
    function show(){out.textContent="";const s=state();if(!s){out.append(E("p",{class:"enc-note"},"Choose a House to see where she stands."));return}
      const a=firstSel.value,b=secondSel.value&&secondSel.value!==firstSel.value?secondSel.value:"";
      const fa=facOfGroup(a),fb=b?facOfGroup(b):"";const F=FX(fa);
      const who=s.live?["A ward of ",lnk("house:"+s.live,HN(s.live)+" House"),", known by her own name joined to its own."]:["The Keeper of ",lnk("lost:"+s.lost.g.id,s.lost.h.name+" House"),", awake for the first time in a lifetime, and called by its name."];
      out.append(E("div",{class:"enc-plan-card"},
        E("div",{class:"icons"},s.live?ENC.pixel(s.live,48):ENC.rollIcon(s.lost.h.id,48),a?(G(a)?ENC.crest(a,32):ENC.lostCrest(a,32)):null,b?(G(b)?ENC.crest(b,32):ENC.lostCrest(b,32)):null),
        E("div",null,
          E("p",null,...who),
          a?E("p",null,"First banner: ",gLink(a),". ",F?["Sworn to ",lnk("faction:"+F.id,F.name),", under ",lnk("staff:"+F.dean,ENC.STAFF[F.dean].name),"."]:"Unsworn: she answers to the Headmaster until she chooses."):null,
          b?E("p",null,"Second banner: ",gLink(b),". ",fa&&fb&&fa!=="none"&&fb!=="none"&&fa!==fb?E("b",null,"Across the line between Dawn and Dusk: allowed by the Accord, rare, and always a story."):"She may sit at either table and compete for either, never both at once."):null)),
        E("div",{class:"enc-loads"},
          E("button",{type:"button",class:"enc-load",onclick:()=>{const bio=bioFor();if(!bio)return;
            if(s.live){const t=T(s.live+"robes");ENC.beginGirl({name:"Ward of "+HN(s.live),pal:t&&t.pal?Object.assign({},t.pal):{},bio,toast:`Started a ward of ${HN(s.live)} House with her banners in her Biography. Undo brings your previous design back.`})}
            else{const g=s.lost.g;ENC.markRevived(s.lost.h.id);ENC.beginGirl({name:s.lost.h.name,pal:{primary:g.words[0],secondary:g.words[1],third:g.words[2]},bio,toast:`${s.lost.h.name} House is awake, with her banners in her Biography. Undo brings your previous design back.`})}}},"Begin her with these banners"),
          E("button",{type:"button",class:"enc-load",title:"Write her House, group and second banner into the Biography of the design you have open",onclick:()=>{const bio=bioFor();if(!bio||typeof mut!=="function")return;
            mut(()=>{S.bio=Object.assign({},S.bio||{},bio)});if(s.lost)ENC.markRevived(s.lost.h.id);ENC.close();if(typeof toast==="function")toast("Her House and banners are in her Biography.")}},"Write them into my current design")))}
    const nodes=[E("h3",{class:"enc-h",id:"banners"},"Plan her House and banners"),
      E("p",{class:"enc-note"},"A girl flies one group's banner first and may carry a second, living or sleeping. Choose her House and the planner fills in the rest; change either banner as you like. ",lnk("groups","The rules"),". ",tag("n")),
      E("div",{class:"enc-plan"},E("label",null,E("span",null,"Her House"),houseSel),E("label",null,E("span",null,"First banner"),firstSel),E("label",null,E("span",null,"Second banner"),secondSel)),out];
    nodes.forEach(n=>at?art.insertBefore(n,at):art.append(n));show()}}}

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss230";st.textContent=`
#encDlg .enc-chairbar{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;padding:9px 40px;background:var(--e-card);border-bottom:1px solid var(--e-vellum2);font-size:14px;color:var(--e-muted)}
#encDlg .enc-chairbar b{color:var(--e-ink)}
#encDlg .enc-awake{display:inline-block;margin-left:8px;font:600 11px var(--e-sans);padding:1px 8px;border-radius:20px;background:#d8b25a;color:#151931;vertical-align:3px}
#encDlg .enc-also{display:block;margin-top:3px;font-size:12.5px;color:var(--e-muted)}
#encDlg .enc-linkbtn{background:none;border:0;padding:0;margin-left:10px;font:inherit;font-size:12.5px;color:var(--e-muted);text-decoration:underline;cursor:pointer}
#encDlg .roll-head.awake,#encDlg .sigil.awake{filter:none!important}
#encDlg .enc-plan{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;margin:8px 0}
#encDlg .enc-plan label{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--e-muted);font-weight:600}
#encDlg .enc-plan select{font:inherit;font-size:14px;padding:7px 9px;border-radius:8px;border:1px solid var(--e-line);background:var(--e-card);color:var(--e-ink)}
#encDlg .enc-plan-out{margin:8px 0 16px}
#encDlg .enc-plan-card{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:start;background:var(--e-card);border:1px solid var(--e-vellum2);border-radius:12px;padding:14px 16px;margin-bottom:8px}
#encDlg .enc-plan-card .icons{display:flex;flex-direction:column;gap:6px;align-items:center}
#encDlg .enc-plan-card p{margin:0 0 6px;font-size:14.5px;line-height:1.55}
@media (max-width:860px){#encDlg .enc-chairbar{padding:9px 16px}}
.bio-sleep{margin-top:10px}.bio-sleep>summary{cursor:pointer;font-weight:600;font-size:13px;padding:4px 0}`;
  document.head.append(st);
})();

/* ---- v234: keep the Encyclopedia's 16x16 lost-group crests and sigils before enc231.js redraws them at 32x32 (px234.js). ---- */
if(typeof ENC!=="undefined"){ENC.lostCrestURL16=ENC.lostCrestURL;ENC.sigilURL16=ENC.sigilURL}

/* ---- v231: the Encyclopedia's own pixel art at 32x32 (the lost groups' crests, the sleeping Houses' sigils and woken
   heads), and the third way in made real: a girl can arrive as a guest of the Sunward or Duskward Wing, with a "Begin a
   guest" button on both wings' pages, in chapter 9 and in the banner planner. ---- */
(function(){
  if(typeof ENC==="undefined"||typeof ACAD==="undefined"||!ACAD.shield32URL)return;
  const E=ENC.E,lnk=ENC.lnk,tag=ENC.tagEl;
  const ROLL=ENC.ROLL||[],LOST=Object.fromEntries(ROLL.map(g=>[g.id,g]));
  const dbl=(x,y,ch,ox,oy)=>[[0,0],[1,0],[0,1],[1,1]].map(([dx,dy])=>[ox+x*2+dx,oy+y*2+dy,ch]);
  const colsOf=g=>({a:g.cols.a,b:g.cols.b,e:g.cols.e,f:g.cols.f});
  /* lost groups' crests: the emblem doubled */
  ENC.lostCrestURL=id=>{const g=LOST[id];if(!g)return"";const cells=[];
    g.emblem.forEach((line,r)=>line.split("").forEach((ch,c)=>{if(ch!==".")cells.push(...dbl(c,r,ch,8,9))}));
    return ACAD.shield32URL("lost:"+id,colsOf(g),cells)};
  /* sigils: a woven mark, mirrored, in 2px threads */
  const hash=s=>{let h=2166136261;for(const ch of s){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
  ENC.sigilURL=(gid,hname)=>{const g=LOST[gid];if(!g)return"";let h=hash(gid+":"+hname),n=0;const cells=[];
    for(let r=0;r<7;r++)for(let c=0;c<4;c++){h=Math.imul(h^(h>>>15),2246822519)>>>0;const on=(h%100)<50||(c===3&&r%2===0);const hi=(h>>>8)%7===0;
      if(on){n++;const ch=hi?"f":"e";cells.push(...dbl(c,r,ch,8,9),...dbl(7-c,r,ch,8,9))}}
    return ACAD.shield32URL("sig:"+gid+":"+hname,colsOf(g),cells)};
  const img=(src,size,cls)=>{const im=E("img",{src,width:size,height:size,alt:"",class:"enc-px"+(cls?" "+cls:"")});if(size<32)im.style.imageRendering="auto";return im};
  ENC.lostCrest=(id,size)=>img(ENC.lostCrestURL(id),size||16);
  const sig0=ENC.sigil;   /* v230's wrapper shows the woken head; under it, the sigil is now 32x32 */
  ENC.sigil=(gid,hname,size)=>{const im=sig0(gid,hname,size);if(im&&im.classList.contains("sigil")&&!im.classList.contains("awake")){im.src=ENC.sigilURL(gid,hname)}if(im&&(size||32)<32)im.style.imageRendering="auto";return im};
  /* woken heads, any size */
  const pc={};
  ENC.rollIconURL=id=>{if(pc[id])return pc[id];const p=(ENC.ROLLPX||{})[id];if(!p)return"";const n=p.r.length,cv=document.createElement("canvas");cv.width=n;cv.height=n;const x=cv.getContext("2d");
    p.r.forEach((row,y)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=p.c[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return pc[id]=cv.toDataURL("image/png")}catch(e){return""}};
  const ri0=ENC.rollIcon;ENC.rollIcon=(id,size)=>{const im=ri0(id,size);if(im&&(size||32)<32)im.style.imageRendering="auto";return im};
  const px0=ENC.pixel;ENC.pixel=(h,size)=>{const im=px0(h,size);if(im&&(size||32)<32)im.style.imageRendering="auto";return im};
  const cr0=ENC.crest;ENC.crest=(g,size)=>{const im=cr0(g,size);if(im&&(size||32)<32)im.style.imageRendering="auto";return im};

  /* ---------- guests ---------- */
  const GUEST={dawn:{wing:"the Sunward Wing",place:"sunward",pal:{primary:"dawn gold",secondary:"cream",third:"rose pink"}},
               dusk:{wing:"the Duskward Wing",place:"duskward",pal:{primary:"plum",secondary:"silver",third:"midnight blue"}}};
  ENC.beginGuest=fid=>{const G=GUEST[fid],F=ENC.FACTIONS.find(f=>f.id===fid);if(!G||!F)return;
    ENC.beginGirl({name:"Guest of "+G.wing.replace(/^the /,"the "),pal:G.pal,
      bio:{house:"No House yet (a guest of "+G.wing+")",groupRole:"Guest of "+F.name+", lodging in "+G.wing,notes:"A guest at Everspire: no House has chosen her yet, and every group would like to be the one that does."},
      toast:`Started a guest of ${G.wing}, in ${F.short}'s colors. Undo brings your previous design back.`})};
  ENC.GUEST=GUEST;
  /* the two wings' pages */
  Object.entries(GUEST).forEach(([fid,G])=>{const pg=ENC.pages["place:"+G.place];if(!pg||!pg.build)return;const ob=pg.build;
    pg.build=el=>{ob(el);const mainCol=el.querySelector(".enc-cols>div");if(!mainCol)return;const F=ENC.FACTIONS.find(f=>f.id===fid);
      const box=E("div",{class:"enc-guestbox"},E("b",null,"Guests of "+G.wing+". "),
        "A girl whom no House has chosen yet, or a visiting scholar here for a term, lodges in "+G.wing+" as a guest of "+F.name.replace(/^The /,"the ")+". She belongs to no group, which means every group is trying to claim her.",
        E("div",{class:"enc-loads",style:{marginTop:"8px"}},E("button",{type:"button",class:"enc-load",onclick:()=>ENC.beginGuest(fid)},"Begin a guest of "+G.wing.replace(/^the /,"the "))),tag("n"));
      const lead=mainCol.querySelector(".enc-lead");if(lead)lead.after(box);else mainCol.prepend(box)}});
  /* chapter 9: the guest card gets its buttons; the planner gets guests */
  {const p=ENC.pages["oc"];if(p&&p.build){const ob=p.build;p.build=el=>{ob(el);
    const way=[...el.querySelectorAll(".enc-ways .way")].find(w=>/Come as a guest/.test(w.textContent));
    if(way){const l=way.querySelector("a");if(l)l.remove();
      way.append(E("div",{class:"enc-loads"},E("button",{type:"button",class:"enc-load",onclick:()=>ENC.beginGuest("dawn")},"Begin a guest of Dawn"),E("button",{type:"button",class:"enc-load",onclick:()=>ENC.beginGuest("dusk")},"Begin a guest of Dusk")),
        E("p",{class:"enc-note",style:{margin:"6px 0 0"}},lnk("place:sunward","The Sunward Wing")," and ",lnk("place:duskward","the Duskward Wing")))}
    const sel=el.querySelector(".enc-plan select");
    if(sel){const og=E("optgroup",{label:"A guest (no House yet)"},E("option",{value:"guest:dawn"},"Guest of the Sunward Wing (Dawn)"),E("option",{value:"guest:dusk"},"Guest of the Duskward Wing (Dusk)"));
      sel.insertBefore(og,sel.children[1]||null);
      sel.addEventListener("change",()=>{if(!/^guest:/.test(sel.value))return;const fid=sel.value.split(":")[1];
        const out=el.querySelector(".enc-plan-out"),F=ENC.FACTIONS.find(f=>f.id===fid),G=GUEST[fid];
        const sels=el.querySelectorAll(".enc-plan select");sels[1].value="";sels[2].value="";
        setTimeout(()=>{out.textContent="";out.append(E("div",{class:"enc-plan-card"},E("div",{class:"icons"}),
          E("div",null,E("p",null,"A guest of ",lnk("place:"+G.place,G.wing),", lodging with ",lnk("faction:"+fid,F.name.replace(/^The /,"the ")),"."),
            E("p",null,"No House has chosen her yet, so she flies no banner. When one does, she can wake it or take its second chair."))),
          E("div",{class:"enc-loads"},E("button",{type:"button",class:"enc-load",onclick:()=>ENC.beginGuest(fid)},"Begin her as a guest")))},0)},true)}}}}

  const st=document.createElement("style");st.id="encCss231";st.textContent=`
#encDlg .enc-guestbox{background:var(--e-card);border:1px solid var(--e-vellum2);border-left:5px solid var(--e-gold);border-radius:10px;padding:12px 16px;margin:4px 0 16px;font-size:14.5px;line-height:1.55}`;
  document.head.append(st);
})();

/* ---- v232: the last two chapters. 6. Characters and Relationships: every girl's circle drawn as a web you can walk,
   a who's who, the web between the groups (secret girlfriends and rivalries), best friends, every secret pair, rivals by
   day, the champions who would carry a sleeping group's banner, and the grown-ups. 10. Canon Reference: what the tags
   mean, the ledger of canon, new and open, the rules every story keeps, the timeline at a glance, the numbers, a glossary
   and a live count of the tags in every chapter. ---- */
(function(){
  if(typeof ENC==="undefined"||typeof ACAD==="undefined")return;
  const E=ENC.E,lnk=ENC.lnk,tag=ENC.tagEl,HN=ENC.HN,rich=ENC.rich;
  const G=id=>ACAD.GROUPS.find(g=>g.id===id);
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  const REL=()=>ACAD.RELDATA||{BF:{},SG:[],RV:[]};
  const facOf=h=>{const f=ACAD.FACTION_OF?ACAD.FACTION_OF(h):null;return f?f.id:""};
  const gOf=h=>{const g=ACAD.GROUP_OF(h);return g?g.id:""};
  const vis=gid=>ENC.vis?ENC.vis(gid):"#5c6080";
  const sec=id=>ENC.SECTIONS.find(s=>s.id===id);
  const role=h=>String((ACAD.GROUP_ROLE||{})[h]||"").split(".")[0].trim();
  const GN={hall:"in the great hall",race:"in the race",forest:"in the forest",bakeoff:"at the bake-off",chess:"at the chess match",night:"on the rooftops",ice:"on the ice",catwalk:"on the catwalk",storm:"in the storm"};
  const FORDER=["legends","pride","frost","grove","plumes","coil","pack","deep","talons","hive"];
  const NS="http://www.w3.org/2000/svg";
  const S=(t,a,...kids)=>{const el=document.createElementNS(NS,t);if(a)for(const [k,v] of Object.entries(a)){if(v==null)continue;if(k.startsWith("on"))el.addEventListener(k.slice(2),v);else el.setAttribute(k,v)}
    kids.flat().forEach(c=>{if(c!=null)el.append(c.nodeType?c:document.createTextNode(String(c)))});return el};
  const and=list=>list.length<2?list.join(""):list.slice(0,-1).join(", ")+" and "+list[list.length-1];
  const andEls=list=>list.map((x,i)=>[i?(i===list.length-1?" and ":", "):"",x]);

  /* ---------- relationships, both directions ---------- */
  const circleOf=h=>{const R=REL();
    const bf=[...new Set([...(R.BF[h]||[]),...Object.keys(R.BF).filter(k=>(R.BF[k]||[]).includes(h))])];
    const sg=R.SG.filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?{who:p[1],mine:p[2],theirs:p[3],type:p[4]}:{who:p[0],mine:p[3],theirs:p[2],type:p[4]});
    const rv=R.RV.filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?{who:p[1],ground:p[2],mine:p[3],theirs:p[4]}:{who:p[0],ground:p[2],mine:p[4],theirs:p[3]});
    const fm=ACAD.FAMOF?ACAD.FAMOF(h):[];   /* v242: family */
    return {bf,sg,rv,fm}};
  ENC.circleOf=circleOf;
  const champOf=h=>Object.entries(ENC.CHAMP||{}).find(([,v])=>v[0]===h);
  const ROLL=()=>Object.fromEntries((ENC.ROLL||[]).map(g=>[g.id,g]));
  const KIND={bf:"Best friend",sg:"Partner",rv:"Rival",fm:"Family"};

  /* ---------- her circle: a web you can walk ---------- */
  let circleSel="griffin";
  function circleWidget(){
    const wrap=E("div",{class:"enc-web"});
    const sel=E("select",{"aria-label":"Whose circle"},ACAD.GROUPS.map(g=>E("optgroup",{label:g.name},g.members.map(h=>E("option",{value:h},HN(h)+(B(h).fullName?" ("+B(h).fullName+")":""))))));
    const rnd=E("button",{type:"button",class:"enc-chip",onclick:()=>{const all=ACAD.HOUSES.filter(x=>x!==circleSel);show(all[Math.floor(Math.random()*all.length)])}},"Someone at random");
    const svgBox=E("div",{class:"web-svg"}),info=E("div",{class:"web-info"});
    const legend=E("div",{class:"web-legend"},E("span",{class:"k bf"},"Best friend"),E("span",{class:"k sg"},"Girlfriend"),E("span",{class:"k rv"},"Rival"),E("span",{class:"k fm"},"Family"));
    wrap.append(E("div",{class:"web-bar"},E("label",null,"Whose circle ",sel),rnd,legend),E("div",{class:"web-body"},svgBox,info));
    sel.addEventListener("change",()=>show(sel.value));
    function node(h,x,y,r,center,kind){
      const g=S("g",{class:"web-node"+(center?" center":"")+(kind?" "+kind:""),transform:`translate(${x},${y})`,tabindex:center?null:"0",role:center?null:"button","aria-label":center?null:`${KIND[kind]}: ${HN(h)}. Show her circle`});
      g.append(S("circle",{r,class:"ring",style:`stroke:${vis(gOf(h))}`}));
      const s=center?48:32;const pu=center&&ACAD.portraitURL?ACAD.portraitURL(h):"";g.append(S("image",{href:pu||(ACAD.pixelURL?ACAD.pixelURL(h):""),x:-s/2,y:-s/2,width:s,height:s,class:pu?"por":"px"}));
      g.append(S("text",{y:r+15,"text-anchor":"middle",class:"lbl"},HN(h)));
      if(!center){const go=()=>show(h);g.addEventListener("click",go);g.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();go()}});
        g.append(S("title",null,`${KIND[kind]}: ${HN(h)}`))}
      return g}
    function show(h){circleSel=h;sel.value=h;const C=circleOf(h);
      const sats=[...C.bf.map(x=>[x,"bf"]),...C.sg.map(x=>[x.who,"sg"]),...C.rv.map(x=>[x.who,"rv"]),...(C.fm||[]).map(x=>[x.who,"fm"])];
      /* a girl can be two things at once: a rival by day and a secret girlfriend by night */
      const seen={};const uniq=[];sats.forEach(([x,k])=>{if(seen[x]){seen[x].push(k);return}seen[x]=[k];uniq.push(x)});
      const W=560,H=340,cx=W/2,cy=H/2-6,R=128;
      const svg=S("svg",{viewBox:`0 0 ${W} ${H}`,class:"web",role:"img","aria-label":`${HN(h)}'s circle: ${uniq.map(x=>HN(x)+" ("+seen[x].map(k=>KIND[k].toLowerCase()).join(", ")+")").join("; ")}`});
      const n=uniq.length;const pos={};
      uniq.forEach((x,i)=>{const a=-Math.PI/2+(i+.5)*2*Math.PI/n-(n%2?Math.PI/n/2:0);pos[x]=[cx+Math.cos(a)*R*1.45,cy+Math.sin(a)*R]});
      const lines=S("g",null);uniq.forEach(x=>{const [x2,y2]=pos[x];seen[x].forEach((k,j)=>{const off=(j-(seen[x].length-1)/2)*7;const dx=y2-cy,dy=-(x2-cx),L=Math.hypot(dx,dy)||1;
        lines.append(S("line",{x1:cx+dx/L*off,y1:cy+dy/L*off,x2:x2+dx/L*off,y2:y2+dy/L*off,class:"ln "+k}))})});
      svg.append(lines);uniq.forEach(x=>svg.append(node(x,pos[x][0],pos[x][1],24,false,seen[x].includes("sg")?"sg":seen[x][0])));
      svg.append(node(h,cx,cy,34,true));
      svgBox.textContent="";svgBox.append(svg);
      /* the words beside it */
      const b=B(h),gid=gOf(h),g=G(gid),q=t=>t?E("q",null,t):null;
      const walk=x=>E("a",{href:"#",class:"enc-link",onclick:ev=>{ev.preventDefault();show(x)}},HN(x));
      const rows=[];
      if(C.bf.length)rows.push(E("div",{class:"rel bf"},E("b",null,C.bf.length>1?"Best friends":"Best friend"),E("span",null,andEls(C.bf.map(x=>walk(x))))));
      C.sg.forEach(s=>rows.push(E("div",{class:"rel sg"},E("b",null,ACAD.ROM?ACAD.ROM.label(s.type):"Girlfriend"),E("span",null,walk(s.who),gOf(s.who)!==gid?(facOf(s.who)!==facOf(h)?E("em",null," across the line"):E("em",null," of "+G(gOf(s.who)).name.replace(/^The /,"the "))):null),q(s.mine))));
      C.rv.forEach(r=>rows.push(E("div",{class:"rel rv"},E("b",null,"Rival"),E("span",null,walk(r.who),E("em",null," "+(GN[r.ground]||r.ground))),q(r.mine?r.mine.charAt(0).toUpperCase()+r.mine.slice(1)+".":""))));
      (C.fm||[]).forEach(f=>{const w=String(f.is||"").split(",")[0].trim(),why=String(f.is||"").split(",").slice(1).join(",").trim();
        rows.push(E("div",{class:"rel fm"},E("b",null,w?w.charAt(0).toUpperCase()+w.slice(1):"Family"),E("span",null,walk(f.who),E("em",null,(why?", "+why:"")+(f.type==="blood"?", by blood":", step, adoptive or chosen")))))});
      const ch=champOf(h),lost=ch?ROLL()[ch[0]]:null;
      info.textContent="";
      info.append(...[E("h4",null,lnk("house:"+h,HN(h)),b.fullName?E("small",null," "+b.fullName):null),
        E("p",{class:"who"},ENC.crest(gid,16)," ",role(h)?role(h)+" of ":"",g?lnk("group:"+gid,role(h)?g.name.replace(/^The /,"the "):g.name):"",g&&g.leader===h&&!/leader/i.test(role(h))?", and its leader":""),
        ...rows,
        lost?E("div",{class:"rel ch"},E("b",null,"Second banner"),E("span",null,"Would carry ",lnk("lost:"+lost.id,lost.name),"'s banner if it wakes")):null,
        E("div",{class:"enc-loads"},ENC.loadBtn(h+"robes","Load her robes"),ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"boy"):h+"man"),"Her partner"),ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"head"):h+"head"),"Her headmistress")),
        E("p",{class:"enc-note"},"Choose anyone in the web to walk to her circle.")].filter(Boolean))}
    wrap.show=show;show(circleSel);return wrap}

  /* ---------- who's who ---------- */
  function whosWho(onPick){
    const box=E("div",{class:"enc-who"});let gsel="all",q="";
    const grid=E("div",{class:"who-grid"}),count=E("p",{class:"enc-note"});
    const inp=E("input",{type:"search",class:"who-q",placeholder:"Find a girl by House or name","aria-label":"Find a girl by House or name"});
    const filt=E("div",{class:"enc-filter",role:"group","aria-label":"Group"},[["all",ACAD.CT.all()],...ACAD.GROUPS.map(g=>[g.id,g.name.replace(/^The /,"")])].map(([v,t])=>E("button",{type:"button",class:"enc-chip","aria-pressed":v===gsel?"true":"false",onclick:ev=>{gsel=v;filt.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b===ev.currentTarget?"true":"false"));draw()}},t)));
    inp.addEventListener("input",()=>{q=inp.value.trim().toLowerCase();draw()});
    function draw(){grid.textContent="";let n=0;
      ACAD.GROUPS.forEach(g=>{if(gsel!=="all"&&g.id!==gsel)return;g.members.forEach(h=>{const b=B(h);const hay=(HN(h)+" "+(b.fullName||"")+" "+(b.nickname||"")+" "+role(h)).toLowerCase();if(q&&!hay.includes(q))return;n++;
        grid.append(E("button",{type:"button",class:"who",style:{"--gc":vis(g.id)},onclick:()=>onPick(h),title:"Show "+HN(h)+"'s circle"},ENC.pixel(h,44),
          E("span",null,E("b",null,HN(h)),E("small",null,b.fullName||""),E("i",null,role(h)+(g.leader===h?", leader":"")))))})});
      const NT=ACAD.ROSTER.count();count.textContent=n===NT?"":n?`${n} of ${NT}.`:"Nobody matches. Try a House, a first name or a role such as “the Spring”.";}
    box.append(E("div",{class:"who-bar"},inp),filt,count,grid);draw();return box}

  /* ---------- the web between the groups ---------- */
  function groupWeb(){
    const box=E("div",{class:"enc-gweb"});let mode="sg",focus=null;
    const svgBox=E("div",{class:"gweb-svg"}),list=E("div",{class:"gweb-list"}),stat=E("p",{class:"enc-p enc-c"});
    const filt=E("div",{class:"enc-filter",role:"group","aria-label":"Show"},[["sg","Couples"],["rv","Rivalries"],["fm","Family"]].map(([v,t])=>E("button",{type:"button",class:"enc-chip","aria-pressed":v===mode?"true":"false",onclick:ev=>{mode=v;focus=null;filt.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b===ev.currentTarget?"true":"false"));draw()}},t)));
    const W=520,H=430,cx=W/2,cy=190,R=150;
    const APX={synth:[430,392],clockwork:[330,392],void:[90,392],vigil:[190,392]};   /* v311: the groups that stand apart, along the bottom, the Lattice beside Dawn and the Starless Court beside Dusk */
    const ang={};FORDER.forEach((gid,i)=>{const a=i<5?(-60+i*30):(240-(i-5)*30);ang[gid]=a*Math.PI/180});
    const P=gid=>APX[gid]||[cx+Math.cos(ang[gid])*R,cy+Math.sin(ang[gid])*R];
    function pairs(){const R2=REL();return (mode==="sg"?R2.SG:mode==="fm"?(R2.FAM||[]):R2.RV).map(p=>({a:p[0],b:p[1],ga:gOf(p[0]),gb:gOf(p[1]),ground:mode==="rv"?p[2]:null,rel:mode==="fm"?p[3]:null}))}
    function draw(){box.dataset.mode=mode;const ps=pairs();const by={};ps.forEach(p=>{const k=[p.ga,p.gb].sort().join("|");(by[k]=by[k]||[]).push(p)});
      const svg=S("svg",{viewBox:`0 0 ${W} ${H}`,class:"gweb",role:"img","aria-label":(mode==="sg"?"Couples":mode==="fm"?"Family ties":"Rivalries")+" between the "+ACAD.CT.n("groups")+" groups"});
      svg.append(S("text",{x:W-8,y:16,"text-anchor":"end",class:"fl dawn"},"Order of Dawn"),S("text",{x:8,y:16,class:"fl dusk"},"Court of Dusk"));
      svg.append(S("line",{x1:cx,y1:26,x2:cx,y2:H-10,class:"divide"}));
      const g=S("g",null);
      Object.entries(by).forEach(([k,list])=>{const [x,y]=k.split("|");if(x===y||!(x in ang||x in APX)||!(y in ang||y in APX))return;const [x1,y1]=P(x),[x2,y2]=P(y);   /* v307: the four groups that stand apart are not on the ring */
        const across=facOf(G(x).members[0])!==facOf(G(y).members[0]);
        const dim=focus&&focus!==x&&focus!==y;
        g.append(S("path",{d:`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,class:"ch "+(across?"across":"within")+(dim?" dim":""),"stroke-width":1.4+list.length*1.6},S("title",null,`${G(x).name} and ${G(y).name}: ${list.length}`)))});
      svg.append(g);
      FORDER.concat(Object.keys(APX)).forEach(gid=>{const [x,y]=P(gid),inside=(by[gid+"|"+gid]||[]).length;const gg=G(gid);
        const n=S("g",{class:"gn"+(focus===gid?" on":"")+(focus&&focus!==gid?" dim":""),transform:`translate(${x},${y})`,tabindex:"0",role:"button","aria-pressed":focus===gid?"true":"false","aria-label":gg.name});
        n.append(S("circle",{r:21,class:"ring",style:`stroke:${vis(gid)}`}),S("image",{href:ACAD.crestURL?ACAD.crestURL(gid):"",x:-16,y:-16,width:32,height:32,class:"px"}));
        const right=x>cx;n.append(S("text",{x:right?28:-28,y:4,"text-anchor":right?"start":"end",class:"lbl"},gg.name.replace(/^The /,"")));
        if(inside)n.append(S("text",{x:right?28:-28,y:18,"text-anchor":right?"start":"end",class:"sub"},inside+" inside"));
        const go=()=>{focus=focus===gid?null:gid;draw()};n.addEventListener("click",go);n.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();go()}});
        svg.append(n)});
      svgBox.textContent="";svgBox.append(svg);
      /* the numbers */
      const APG=new Set(ACAD.GROUPS.filter(g=>g.apart).map(g=>g.id)),isAp=p=>APG.has(p.ga)||APG.has(p.gb);
      const total=ps.length,inG=ps.filter(p=>p.ga===p.gb).length,apx=ps.filter(p=>p.ga!==p.gb&&isAp(p)).length,acr=ps.filter(p=>p.ga!==p.gb&&!isAp(p)&&facOf(p.a)!==facOf(p.b)).length,same=total-inG-acr-apx;
      const apT=apx?`, and ${apx} that reach past the Academy, between ${ACAD.apartWords()} and the Houses`:"";
      stat.textContent="";
      stat.append(mode==="fm"?`${total} family ties: ${inG} inside one group, ${same} between groups of the same faction, ${acr} across the line between Dawn and Dusk${apT}. `:mode==="sg"?`${total} couples: ${inG} inside one group, ${same} between groups of the same faction, ${acr} across the line between Dawn and Dusk${apT}. `
        :`${total} rivalries: ${inG} inside one group, ${same} between groups of the same faction, ${acr} across the line between Dawn and Dusk${apx?`, and ${apx} between ${ACAD.apartWords()} and the Houses`:""}. `,tag("c"));
      /* the list for the focused group */
      list.textContent="";
      if(focus){const mine=ps.filter(p=>p.ga===focus||p.gb===focus).sort((p,q)=>(p.ga===p.gb)-(q.ga===q.gb));
        list.append(E("h4",null,ENC.crest(focus,18)," ",G(focus).name,mode==="sg"?": every secret":mode==="fm"?": every family tie":": every rivalry"),
          E("ul",null,mine.map(p=>E("li",null,ENC.pixel(p.a,18),lnk("circle:"+p.a,HN(p.a))," and ",ENC.pixel(p.b,18),lnk("circle:"+p.b,HN(p.b)),
            p.ground?E("small",null," "+(GN[p.ground]||p.ground)):p.rel?E("small",null," "+HN(p.b)+" is "+HN(p.a)+"'s "+p.rel.split(",")[0]):null,
            p.ga!==p.gb&&facOf(p.a)!==facOf(p.b)?E("small",{class:"acr"}," across the line"):p.ga===p.gb?E("small",null," inside the group"):null))))}
      else list.append(E("p",{class:"enc-note"},"Choose a group's crest to see its pairs. Lines across the middle cross the line between Dawn and Dusk; the thicker the line, the more pairs."))}
    box.append(filt,E("div",{class:"gweb-body"},svgBox,list),stat);draw();return box}

  /* ---------- family: every blood tie, in its families (read from the table each time the page opens) ---------- */
  function familyTies(){
    const F=REL().FAM||[],adj={};F.forEach(([a,b])=>{(adj[a]=adj[a]||new Set()).add(b);(adj[b]=adj[b]||new Set()).add(a)});
    const seen=new Set(),comps=[];
    Object.keys(adj).forEach(h=>{if(seen.has(h))return;const c=[],st=[h];seen.add(h);while(st.length){const x=st.pop();c.push(x);adj[x].forEach(y=>{if(!seen.has(y)){seen.add(y);st.push(y)}})}comps.push(c)});
    comps.sort((p,q)=>q.length-p.length||String(p[0]).localeCompare(String(q[0])));
    if(!comps.length)return E("p",{class:"enc-note"},"No family ties yet.");
    return E("div",{class:"enc-bfs"},comps.map(c=>{const set=new Set(c),rows=F.filter(p=>set.has(p[0])),gids=[...new Set(c.map(gOf))];
      return E("div",{class:"bfg",style:{"--gc":vis(gids[0])}},
        E("div",{class:"gh"},c.slice(0,5).map(h=>ENC.pixel(h,22)),E("span",null,andEls(c.slice(0,5).map(h=>lnk("circle:"+h,HN(h)))),c.length>5?E("small",null," and "+(c.length-5)+" more"):null)),
        E("ul",null,rows.map(p=>E("li",null,E("span",null,lnk("circle:"+p[1],HN(p[1])),E("small",null," is "+HN(p[0])+"'s "+p[3]))))))}))}

  /* ---------- best friends, in their circles ---------- */
  function bestFriends(){const R2=REL();
    return E("div",{class:"enc-bfs"},ACAD.GROUPS.map(g=>{const set=new Set(g.members),adj={};g.members.forEach(h=>adj[h]=new Set());
      Object.entries(R2.BF).forEach(([a,l])=>(l||[]).forEach(b=>{if(set.has(a)&&set.has(b)){adj[a].add(b);adj[b].add(a)}}));
      const done=new Set(),comps=[];g.members.forEach(h=>{if(done.has(h))return;const c=[],st=[h];done.add(h);while(st.length){const x=st.pop();c.push(x);adj[x].forEach(y=>{if(!done.has(y)){done.add(y);st.push(y)}})}comps.push(c)});
      return E("div",{class:"bfg",style:{"--gc":vis(g.id)}},E("div",{class:"gh"},ENC.crest(g.id,20),lnk("group:"+g.id,g.name)),
        E("ul",null,comps.map(c=>{const out=c.length===1?(R2.BF[c[0]]||[]).find(x=>gOf(x)!==g.id):null;
          if(out)return E("li",null,E("span",{class:"heads"},ENC.pixel(c[0],22),ENC.pixel(out,22)),E("span",null,lnk("circle:"+c[0],HN(c[0]))," and ",lnk("circle:"+out,HN(out)),E("small",null," of "+G(gOf(out)).name.replace(/^The /,"the ")+(facOf(out)!==facOf(c[0])?", across the line":""))));
          return E("li",null,E("span",{class:"heads"},c.map(h=>ENC.pixel(h,22))),E("span",null,andEls(c.map(h=>lnk("circle:"+h,HN(h)))),c.length>2?E("small",null," ("+(c.length===3?"a trio":"a circle of "+c.length)+")"):null))})))}))}

  /* ---------- every secret pair ---------- */
  function secretPairs(){
    const box=E("div");let m="all";
    const grid=E("div",{class:"enc-sgs"});
    const kindOf=p=>gOf(p[0])===gOf(p[1])?"in":facOf(p[0])===facOf(p[1])?"same":"across";
    const LAB={in:"Inside one group",same:"Between groups",across:"Across the line"};
    const filt=E("div",{class:"enc-filter",role:"group","aria-label":"Show"},[["all","All "+ACAD.numWords(REL().SG.length)],["in","Inside one group"],["same","Between groups, same faction"],["across","Across the line"]].map(([v,t])=>E("button",{type:"button",class:"enc-chip","aria-pressed":v===m?"true":"false",onclick:ev=>{m=v;filt.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",b===ev.currentTarget?"true":"false"));draw()}},t)));
    function draw(){grid.textContent="";REL().SG.filter(p=>m==="all"||kindOf(p)===m).forEach(p=>{const k=kindOf(p);
      grid.append(E("div",{class:"sgc "+k},E("div",{class:"pair"},ENC.pixel(p[0],32),ENC.pixel(p[1],32),E("div",null,E("b",null,lnk("circle:"+p[0],HN(p[0]))," and ",lnk("circle:"+p[1],HN(p[1]))),E("small",{class:"k"},LAB[k]+(ACAD.ROM?", "+ACAD.ROM.label(p[4]).toLowerCase()+"s":"")))),
        E("p",null,p[2]),p[3]&&p[3]!==p[2]?E("p",{class:"theirs"},p[3]):null))})}
    box.append(filt,grid);draw();return box}

  /* ---------- rivals by day ---------- */
  function rivalsByDay(){const R2=REL();const key=(a,b)=>[a,b].sort().join("|");const sg=new Set(R2.SG.map(p=>key(p[0],p[1])));
    const both=R2.RV.filter(p=>sg.has(key(p[0],p[1])));
    return E("ul",{class:"enc-byday"},both.map(p=>E("li",null,ENC.pixel(p[0],22),lnk("circle:"+p[0],HN(p[0]))," and ",ENC.pixel(p[1],22),lnk("circle:"+p[1],HN(p[1])),E("small",null," rivals "+(GN[p[2]]||p[2])+", "+(ACAD.ROM?ACAD.ROM.label(ACAD.ROM.typeOf(p[0],p[1])).toLowerCase()+"s":"girlfriends")+" after dark"))))}

  /* ---------- the champions of the sleeping groups ---------- */
  function champions(){const L=ROLL();
    return E("div",{class:"enc-champs"},Object.entries(ENC.CHAMP||{}).map(([lid,[h,why]])=>{const g=L[lid];if(!g)return null;
      return E("div",{class:"chp"},ENC.lostCrest?ENC.lostCrest(lid,32):null,ENC.pixel(h,32),E("div",null,E("b",null,lnk("circle:"+h,HN(h))," for ",lnk("lost:"+lid,g.name)),E("small",null,why.charAt(0).toUpperCase()+why.slice(1)+".")))}))}

  /* ---------- the grown-ups ---------- */
  function grownUps(){const P=ACAD.PRINCIPALS||{};
    return E("div",null,
      E("p",{class:"enc-p enc-n"},"Above every girl stands a chain of grown-ups, and every one of them has opinions about her friends. ",lnk("staff:vael","Headmaster Cassius Vael")," keeps the Balance; ",lnk("staff:morrowgate","Dean Morrowgate")," and ",lnk("staff:vey","Dean Vey")," keep their factions and have been playing the same game of chess since 1966. ",tag("n")),
      E("div",{class:"enc-princ"},FORDER.map(gid=>{const p=P[gid],g=G(gid);if(!p||!g)return null;return E("a",{href:"#",style:{"--gc":vis(gid)},onclick:ev=>{ev.preventDefault();ENC.go("principal:"+gid)}},ENC.crest(gid,22),E("span",null,E("b",null,p.full),E("small",null,p.title.charAt(0).toUpperCase()+p.title.slice(1)+", "+g.name.replace(/^The /,"the "))))})),
      E("p",{class:"enc-p enc-n"},"Every House has its own headmistress, who was once its Keeper, chose the Keeper who sits there now and keeps her House's rooms and secrets. Every House has a young man on its rolls too, named by its Keeper: her partner, and a student with a title, friends and rivals of his own. "+ACAD.CT.all()+" headmistresses are in ",lnk("academy","The Academy"),"; all "+ACAD.CT.all().toLowerCase()+" boys are in ",lnk("boyfriends","The Boys of the Houses"),". ",tag("n")))}

  const CUSTOMS=[
    "Best friends share a table, a wardrobe and an alibi. At Graduation a girl's best friend carries her House banner across the courtyard behind her.",
    "A secret girlfriend is protected by the fifth unwritten rule: the secret is hers to tell, never yours. A girl who tells another's secret finds that no group has a seat for her until the term is out.",
    "Rivals bow to each other when they pass in the great hall. Not bowing is a challenge, and a challenge must be answered by breakfast.",
    "The boys of the Houses sit at the far end of their group's table, as far from the head table as the hall allows, and are expected to stand when their girl's headmistress walks in.",
    "A Keeper and her ward share a House, a table and, usually, a rival. A ward's best friend need not be in her House at all.",
    "A guest may sit at any group's table that asks her, and every group asks. Whoever she sits with most by Founders' Night is said to have the best claim on her."];

  ENC.page("cast",{title:"Characters and Relationships",short:"Characters",sec:"cast",crumbs:[],
    searchText:()=>"characters relationships cast who's who circle web best friends secret girlfriends rivals rivals by day champions second banner principals headmistresses boyfriends customs "+CUSTOMS.join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      const R2=REL();const nBF=new Set(Object.entries(R2.BF).flatMap(([a,l])=>(l||[]).map(b=>[a,b].sort().join("|")))).size;
      art.append(E("h1",{class:"enc-title"},"Characters and Relationships"),
        E("p",{class:"enc-lead enc-c"},`${ACAD.CT.A("houses")} girls${ACAD.ROSTER.apart&&ACAD.ROSTER.apart().length?`, ${ACAD.numWords(ACAD.ROSTER.apart().length)} more who stand apart with ${ACAD.apartWords()},`:""} and nobody at Everspire is alone: ${nBF} best friendships, ${R2.SG.length} couples, ${R2.RV.length} rivalries, ${(R2.FAM||[]).length} family ties, a boyfriend for every girl and a headmistress for every House. This chapter draws them all in one place.`,tag("c")),
        E("div",{class:"enc-toc",role:"navigation","aria-label":"On this page"},[["web","Her circle"],["who","Who's who"],["between","Between the groups"],["bf","Best friends"],["sg","Couples"],["fm","Family"],["rv","Rivals"],["champ","Champions"],["grown","The grown-ups"],["customs","Customs"],["yours","Your girl"]].map(([id,t])=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();const x=art.querySelector("#cast-"+id);if(x)x.scrollIntoView({behavior:"smooth",block:"start"})}},t))));
      const H=(id,t)=>E("h3",{class:"enc-h",id:"cast-"+id},t);
      const web=circleWidget();
      art.append(H("web","Her circle"),E("p",{class:"enc-note"},"Every girl's best friends, girlfriend and rivals, with what she says about each of them. Choose anyone in the web to walk on to her circle."),web);
      art.append(H("who","Who's who"),whosWho(h=>{web.show(h);web.scrollIntoView({behavior:"smooth",block:"start"})}));
      art.append(H("between","Between the groups"),E("p",{class:"enc-note"},"Who loves, and who fights, across the Academy."),groupWeb());
      art.append(H("bf","Best friends"),(()=>{const out=Object.entries(REL().BF).filter(([h,l])=>(l||[]).length&&(l||[]).every(x=>gOf(x)!==gOf(h))).map(([h])=>h);
        return E("p",{class:"enc-p enc-c"},"Every girl has a best friend, and some friendships run in threes and fours. Nearly all of them are inside a group; ",andEls(out.map(h=>lnk("circle:"+h,HN(h)))),out.length>1?" found theirs on the other side of a rivalry. ":" found hers on the other side of a rivalry. ",tag("c"))})(),bestFriends());
      art.append(H("sg","Couples"),E("p",{class:"enc-p enc-c"},(()=>{const c=ACAD.ROM?ACAD.ROM.counts():{};const parts=(ACAD.ROM?ACAD.ROM.TYPES:[]).filter(t=>c[t.id]).map(t=>c[t.id]+" "+(c[t.id]===1?t.label:t.plural).toLowerCase());
        return "Nearly every girl has a girlfriend: "+(parts.length>1?parts.slice(0,-1).join(", ")+" and "+parts[parts.length-1]:parts.join(""))+". Rivals who love each other keep it secret, and so do the couples with a line to hide behind. In each pair, the first line is what the first girl says about the second. "})(),tag("c")),secretPairs());
      const most=(()=>{const c={};R2.RV.forEach(p=>{c[p[0]]=(c[p[0]]||0)+1;c[p[1]]=(c[p[1]]||0)+1});const mx=Math.max(...Object.values(c));return [mx,Object.keys(c).filter(k=>c[k]===mx)]})();
      art.append(H("fm","Family"),E("p",{class:"enc-p enc-c"},"Sisters, twins and cousins, all by blood: every Synth girl is a sister of the other nineteen, and so is every Void girl, the Clockwork and the Vigil were made in the same Vault and the same dark hours, and the Houses have sisters of their own, some of them in other groups. Choose anyone to walk to her circle. ",tag("c")),familyTies());
      art.append(H("rv","Rivals"),
        E("p",{class:"enc-p enc-c"},`Five great rivalries set group against group inside the Academy, one older than all of them sets the Synth against the Void, and ${R2.RV.length} personal ones set girl against girl, each fought on one of the Nine Grounds. Every girl has at least one rival; `,andEls(most[1].map(h=>lnk("circle:"+h,HN(h)))),` ${most[1].length>1?"have":"has"} ${most[0]}. Every rivalry, by the ground it is fought on, is in `,lnk("conflicts","Conflicts and Stories"),". ",tag("c")),
        E("h4",{class:"enc-h4"},"Rivals by day"),E("p",{class:"enc-note"},"The pairs who are each other's rival and each other's secret."),rivalsByDay());
      art.append(H("champ","Champions of the sleeping groups"),
        E("p",{class:"enc-p enc-n"},"Twenty of the "+ACAD.CT.b("houses")+" have sworn to carry a sleeping group's banner beside their own if it ever wakes. A girl who wakes a House in one of these groups will find a champion already waiting for her. ",lnk("roll","The Roll")," has the rest. ",tag("n")),champions());
      art.append(H("grown","The grown-ups"),grownUps());
      art.append(H("customs","Customs of the heart"),E("ul",{class:"enc-list enc-n"},CUSTOMS.map(c=>E("li",null,rich(c))),E("li",{class:"enc-list-tag"},tag("n"))));
      art.append(H("yours","Your girl in the web"),
        E("p",{class:"enc-p enc-n"},"The "+ACAD.CT.b("houses")+"'s pairs are canon, and so are the Synth's and the Void's, and none of them is broken to make room. Your girl comes into the web the way new girls always have: as a second best friend, a new rival, the third person who knows a secret, or the reason a secret pair stops being secret. A ward inherits her Keeper's rival whether she likes it or not; a guest is courted by everyone. ",lnk("oc","Original Characters")," shows how she arrives. ",tag("n")));
      el.append(art);
      if(ENC._circleNext){web.show(ENC._circleNext);ENC._circleNext=null}}});
  ENC.resolvers=ENC.resolvers||[];
  ENC.resolvers.push((k,v)=>{if(k!=="circle"||!ACAD.HOUSES.includes(v))return null;ENC._circleNext=v;circleSel=v;return ENC.pages.cast});
  sec("cast").page="cast";sec("cast").plan="The whole cast in one place: every girl's circle, best friends, couples, rivals, champions and the grown-ups.";

  /* house pages: a way into her circle */
  {const bh=ENC.buildHouse;ENC.buildHouse=(el,h)=>{bh(el,h);const hd=[...el.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="Her people");
    if(hd){const dl=hd.nextElementSibling;const p=E("p",{class:"enc-note"},lnk("circle:"+h,"See her whole circle")," in Characters and Relationships.");(dl||hd).after(p)}}}

  /* =====================================================================================================
     10. CANON REFERENCE
     ===================================================================================================== */
  /* v251: customs of the heart as the canon changes layer has them */
  if(ACAD.loreInto)ACAD.loreInto("cast.customs",CUSTOMS);
  const LEDGER=[
    ["c",ACAD.CT.fill("The {{b:houses}} girls, their Houses, names, biographies and looks"),"groups"],
    ["c",ACAD.CT.fill("{{N:groups}} groups of {{n:groupsize}}")+": leaders, mottos, hangouts, crests and colors","groups"],
    ["c","The five great rivalries and the Nine Grounds","conflicts"],
    ["c","Every girl's best friends, girlfriend and rivals","cast"],
    ["n","A young man on every House's rolls, with a title, a story and a page of his own","boyfriends"],
    ["c","A headmistress for every House, each once its Keeper and each with a page of her own, and the ten principals with their titles","academy"],
    ["c","The wardrobe, the scene book and the Scene Archive","wardrobe"],
    ["c","Eel and the sealed aquarium wing; the Coil's ledger; Edmund Kingsley's thirty years","history"],
    ["n","The Headmaster, the two deans, and the Order of Dawn and the Court of Dusk","world"],
    ["n","The history: the First Bell, the Night Walk, the Long Quarrel, the Accord of 1726 and the Great Waking","history"],
    ["n","Keepers, the second chair and wards; guests of the Sunward and Duskward Wings","oc"],
    ["n","Admission, the candidate year, the handbook and an ordinary day","academy"],
    ["n","The castle and its grounds: the map and its twenty-two places","places"],
    ["n","The Everspire year, the Spire Cup, robes and regalia, names and address, the unwritten rules","culture"],
    ["n","Story seeds for every group","conflicts"],
    ["n","The Roll: two hundred sleeping Houses in twenty lost groups, their sigils, lore and allegiances","roll"],
    ["n","Second banners, champions and waking a House","oc"],
    ["n","The customs of the heart","cast"],
    ["o","What is at the top of the Spire, who rings the bells, and why the Houses woke","conflicts"],
    ["o","How old the Headmaster is","history"],
    ["o","Who won the card game of 1998","history"],
    ["o","Which sleeping House wakes next, and for whom","roll"]];
  const RULESFIX=[
    "Each House has one Keeper, called by its name. Wards take a second chair and keep their own names: Tamsin of Fox.",
    "{{N:groups}} groups of {{n:groupsize}}, {{n:faction}} in each faction. Every great rivalry crosses the line between Dawn and Dusk.",
    "Officially, nothing at Everspire is magic. Unofficially, the Academy neither confirms nor denies anything.",
    "The Academy is old and regal: candlelight, bells, banners, oaths. Modern life belongs to the girls' own days and scenes, not to the Academy's lore.",
    "Canon pairs stay paired. New girls join the web; they never break it."];
  const TIMELINE=[["About 1,000 years ago","The Year of the First Bell: the Founding"],["The first century","The first four Houses take the head table"],["About 500 years ago","The second chair"],["About 400 years ago","The Coil begins its ledger"],
    ["About 350 years ago","The Night Walk: Dawn and Dusk divide"],["The fifty years after","The Long Quarrel"],["1726","The Accord of the Single Bell; Cassius Vael appears"],["Late 19th century","Lecture halls: the Academy becomes a university too"],
    ["About a century ago","The aquarium wing is sealed"],["1966","The deans' chess game begins"],["1975","Morrowgate and Vey become deans"],["1996","Edmund Kingsley becomes the Sovereign"],["1998","The card game"],["2021","The Great Waking begins"],["2026","The Year of the Hundred"]];
  const GLOSS=[
    ["Accord, the","The peace of 1726 between Dawn and Dusk: Dawn keeps the light, Dusk keeps the rest, and the Headmaster keeps them both.","history"],
    ["Balance, the","What the Headmaster keeps: neither faction may rule the Academy.","staff:vael"],
    ["Banner Roll","The Legends' roll of graduates' names, stitched in gold thread.","group:legends"],
    ["Belltop","The fishermen's old name for the crag Everspire stands on.","history"],
    ["Candidate","A young woman in her first year, lodging in Everhythe and waiting for a House to choose her.","academy"],
    ["Champion","A living girl sworn to carry a sleeping group's banner if it wakes.","cast"],
    ["Choosing Morning","The first morning of the year, when chosen girls find an animal of their House's kind at the door.","culture"],
    ["Court of Dusk","The western faction: the Coil, the Pack, the Deep, the Talons and the Hive.","faction:dusk"],
    ["Dean","The head of a faction: Aldous Morrowgate for Dawn, Malachar Vey for Dusk, Octavian Thale for the Lattice and Severin Ashgrave for the Starless Court.","academy"],
    ["Everhythe","The town below the crag, where candidates lodge and families come up from on visiting days.","place:town"],
    ["Everlake","The cold, clear lake below the castle; it freezes for First Ice.","place:everlake"],
    ["Founders' Night","Late autumn's candlelit feast, at which the sleeping Houses' headmistresses are named.","culture"],
    ["Great Waking, the","The five years in which fifty-six sleeping Houses woke, ending in the Year of the Hundred.","history"],
    ["Guest","A girl no House has chosen yet, or a visiting scholar, lodging in the Sunward or Duskward Wing.","oc"],
    ["Headmistress","The woman who keeps a House, chooses its Keeper and may set a second chair.","academy"],
    ["Keeper","The first student a House's headmistress chose, called by the House's name.","world"],
    ["Long Quarrel, the","The fifty years in which Dawn and Dusk built against each other, ended by the Accord.","history"],
    ["Lost group","One of the twenty groups on the Roll whose Houses are all asleep.","roll"],
    ["Night Walk, the","The night the Pack walked out on Dawn's curfew and the Academy split in two.","history"],
    ["Nine Grounds","The places where rivals settle things: the great hall, the race, the forest, the bake-off, the chess match, the rooftops, the ice, the catwalk and the storm.","culture"],
    ["Order of Dawn","The eastern faction: the Legends, the Pride, the Frost, the Grove and the Plumes.","faction:dawn"],
    ["Principal","The older man who runs a group's faculty, known by his title: the Sovereign, the Grey, the Alchemist.","academy"],
    ["Roll of Sleeping Houses","The list in the library vault of every House that has fallen quiet; two hundred names are legible.","roll"],
    ["Second banner","A second group's colors carried beside a girl's own, for a living group or a sleeping one.","oc"],
    ["Second chair","The seat a headmistress sets for a ward beside her Keeper.","world"],
    ["Sigil","A sleeping House's woven mark, which gives way to its beast when a girl wakes it.","roll"],
    ["Sleeping House","A House with no student: its door locked, its banner furled, its headmistress's name still read aloud.","roll"],
    ["Spire, the","The impossible tower at the heart of the castle. Nobody has reached the top.","place:spire"],
    ["Spire Cup","The year-long contest between the {{n:groups}} groups, won on the Nine Grounds.","culture"],
    ["Sunward and Duskward Wings","The faction wings, east and west, built during the Long Quarrel; guests lodge in them.","place:sunward"],
    ["Unsworn","A lost group that never chose Dawn or Dusk.","roll"],
    ["Ward","A girl who takes a House's second chair: Tamsin of Fox, Mira of Serpent.","world"],
    ["Year of the Hundred","2026: for the first time, every House on the rolls has a student.","history"]];
  /* v251: the rules every story keeps and the glossary, as the canon changes layer has them */
  if(ACAD.loreInto){ACAD.loreInto("ref.rules",RULESFIX);ACAD.loreInto("ref.gloss",GLOSS)}
  ENC.LORE_DATA=Object.assign(ENC.LORE_DATA||{},{"cast.customs":()=>CUSTOMS,"ref.rules":()=>RULESFIX,"ref.gloss":()=>GLOSS});
  const ST={c:"Canon",n:"New lore",o:"Open"};
  /* count the tags in every chapter, by building each chapter off screen */
  function tagCounts(){const out=[];ENC.SECTIONS.forEach(s=>{if(!s.page||s.id==="canon")return;const p=ENC.resolve?ENC.resolve(s.page):ENC.pages[s.page];if(!p||!p.build&&!(p.blocks||ENC.blocks[p.id]))return;
      const box=document.createElement("div");try{if(p.build)p.build(box);else box.append(...[].concat(ENC.renderBlocks?ENC.renderBlocks(p.blocks||ENC.blocks[p.id]):[]))}catch(e){return}
      out.push({s,c:box.querySelectorAll(".enc-tag-c").length,n:box.querySelectorAll(".enc-tag-n").length})});return out}
  ENC.page("canon",{title:"Canon Reference",short:"Canon",sec:"canon",crumbs:[],
    searchText:()=>"canon reference new lore your own lore traditions cultures relationships biography notes open questions glossary timeline rules numbers "+ACAD.CT.fill(GLOSS.map(g=>g.join(" ")).join(" ")+" "+RULESFIX.join(" ")),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"Canon Reference"),
        E("p",{class:"enc-lead"},"Everything in this Encyclopedia is canon. Anything you add for your own characters is new lore, and it is yours to write."),
        E("div",{class:"enc-toc",role:"navigation","aria-label":"On this page"},[["tags","The two tags"],["yours","Adding your own lore"],["rules","Rules every story keeps"],["open","Open questions"],["time","Timeline"],["nums","By the numbers"],["gloss","Glossary"]].map(([id,t])=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();const x=art.querySelector("#canon-"+id);if(x)x.scrollIntoView({behavior:"smooth",block:"start"})}},t))));
      const H=(id,t)=>E("h3",{class:"enc-h",id:"canon-"+id},t);
      const NEWT=()=>E("span",{class:"enc-tag enc-tag-u"},"New lore"),OPENT=()=>E("span",{class:"enc-tag enc-tag-o"},"Open");
      art.append(H("tags","The two tags"),E("dl",{class:"enc-canon-key"},
        E("dt",null,NEWT()),E("dd",null,"Lore you add yourself: your girl's House, friendships, rivals, history, and any traditions or customs you invent for her group or House."),
        E("dt",null,OPENT()),E("dd",null,"Questions the Academy leaves unanswered. Your stories can answer them, or never do.")),
        E("p",{class:"enc-note"},"Anything without a tag is canon."));
      const step=(t,...d)=>E("li",null,E("b",null,t),E("span",null,...d));
      art.append(H("yours","Adding your own lore"),
        E("p",{class:"enc-p"},"Your lore lives with your character, in her Biography, and goes wherever she goes: into your saves, her prompts and her scenes."),
        E("ol",{class:"enc-howto"},
          step("Make her. ","Start a new design, or begin her from ",lnk("oc","Original Characters"),": as the Keeper of a sleeping House, a ward in a House's second chair, or a guest of the Sunward or Duskward Wing."),
          step("Give her a place. ","In the Biography step, set her House, Group, Second banner and Group role. A sleeping House she wakes is hers to describe."),
          step("Give her people. ","Fill in Best friends, Girlfriend or partner, Rivals, Friends, Partner or crush and Exes. Use the names of Academy girls to tie her into the canon cast, or invent your own."),
          step("Give her a history. ","Write her Background, family and Hometown."),
          step("Write your traditions. ","Put your own customs, feasts, rules, rivalries and group cultures in Notes. Start each with “New lore:” so you always know what you added."),
          step("Bring it into scenes. ","In the Scene step, Pre-made sentences has her details: her room, bathroom, outdoor spot, title, pet name and accent light. Set them once and every scene uses them."),
          step("Save her. ","Save or load keeps her design and all her lore together.")),
        E("p",{class:"enc-note"},"New lore can't change canon. One student per House, every girl's relationships and the rules below stay as they are; your girl joins them."));
      const M=ENC.MYST||[];
      art.append(H("rules","Rules every story keeps"),E("ol",{class:"enc-rules"},RULESFIX.map(r=>E("li",null,E("span",{style:{color:"var(--e-ink)"}},rich(r))))),
        E("p",{class:"enc-note"},"These "+ACAD.numWords(RULESFIX.length)+" hold the Academy together."));
      if(M.length)art.append(H("open","Open questions"),E("dl",{class:"enc-facts"},M.map(([q,a,ls])=>[E("dt",null,q,OPENT()),E("dd",null,a," ",(ls||[]).map(id=>{const p=ENC.resolve&&ENC.resolve(id);return p?[" ",lnk(id,p.short||p.title)]:null}))])));
      art.append(H("time","Timeline at a glance"),E("ol",{class:"enc-tl"},(ACAD.canon&&ACAD.canon.historyEdited&&ACAD.canon.historyEdited()?(ENC.HISTORY||[]).flatMap(e=>e.items.map(i=>[i.when,i.title])):TIMELINE).map(([d,t])=>E("li",null,E("b",null,d),E("span",null,t)))),E("p",{class:"enc-note"},"Dates before the Accord are the Academy's own reckoning. The whole story is in ",lnk("history","Historical Foundations"),"."));
      /* the numbers, counted live */
      const R2=REL(),L=ENC.ROLL||[];let awake=0;try{L.forEach(g=>g.houses.forEach(h=>{if(ENC.isAwake&&ENC.isAwake(h.id))awake++}))}catch(e){}
      let looks=0;try{const I=ENC.index?ENC.index():null;if(I&&I.griffin)looks=I.griffin.looks.length}catch(e){}
      const RO=ACAD.ROSTER,apG=(ACAD.GROUPS||[]).filter(g=>g.apart),Tp=x=>typeof tplById==="function"&&tplById(x);
      const nums=[["Houses on the rolls",String(RO.academy().length)],["Groups",ACAD.CT.d("groups")+", "+ACAD.CT.n("faction")+" in each faction"],["Factions",String((ENC.FACTIONS||[]).filter(f=>!f.apart).length)],
        apG.length?["Apart from the factions",ACAD.apartWords().replace(/^the /,"The ")+", "+RO.apart().length+" girls"]:null,["Sleeping Houses on the Roll",String(L.reduce((n,g)=>n+g.houses.length,0))],["Lost groups",`${L.length}: ${L.filter(g=>g.faction==="dawn").length} sworn to Dawn, ${L.filter(g=>g.faction==="dusk").length} to Dusk, ${L.filter(g=>g.faction!=="dawn"&&g.faction!=="dusk").length} Unsworn`],
        ["Best friendships",String(new Set(Object.entries(R2.BF).flatMap(([a,l])=>(l||[]).map(b=>[a,b].sort().join("|")))).size)],["Couples",R2.SG.length+" ("+R2.SG.filter(p=>ACAD.ROM&&ACAD.ROM.isSecret(p[4])).length+" secret)"],["Rivalries",String(R2.RV.length)],
        ["Champions of sleeping groups",String(Object.keys(ENC.CHAMP||{}).length)],["Sleeping Houses with a second banner",String(Object.keys(ENC.ALSO_ID||{}).length)],["Headmistresses",RO.girls().filter(h=>Tp(h+"head")).length+", one for each House"],["Principals",String(Object.keys(ACAD.PRINCIPALS||{}).length)],["Boys of the Houses",String(RO.girls().filter(h=>Tp(h+"man")).length)],
        looks?["Looks in each girl's wardrobe",String(looks)]:null,["Sleeping Houses you have woken",awake?String(awake):"None yet"]].filter(Boolean);
      art.append(H("nums","By the numbers"),E("dl",{class:"enc-facts"},nums.map(([a,v])=>[E("dt",null,a),E("dd",null,v)])));
      /* glossary */
      const gq=E("input",{type:"search",class:"who-q",placeholder:"Look up a word","aria-label":"Look up a word in the glossary"});const gl=E("dl",{class:"enc-gloss"});
      const drawG=()=>{const q=gq.value.trim().toLowerCase();gl.textContent="";GLOSS.filter(g=>!q||(g[0]+" "+ACAD.CT.fill(g[1])).toLowerCase().includes(q)).forEach(([w,d,id])=>gl.append(E("dt",null,ENC.resolve&&ENC.resolve(id)?lnk(id,w):w),E("dd",null,rich(d))));if(!gl.childNodes.length)gl.append(E("dd",null,"No entry. Try the search at the top, which reads the whole Encyclopedia."))};
      gq.addEventListener("input",drawG);drawG();
      art.append(H("gloss","Glossary"),E("div",{class:"who-bar"},gq),gl);
      el.append(art)}});
  sec("canon").page="canon";

  /* ---------- styles ---------- */
  const st=document.createElement("style");st.id="encCss232";st.textContent=`
#encDlg{--rel-bf:#b8892a;--rel-sg:#c0457a;--rel-rv:#a8353a}
html[data-theme="dark"] #encDlg{--rel-bf:#e2b95a;--rel-sg:#f07aaa;--rel-rv:#f0716f}
#encDlg .enc-toc{display:flex;flex-wrap:wrap;gap:4px 16px;margin:4px 0 6px;font-size:14px}#encDlg .enc-toc a{color:var(--e-ink)}
#encDlg .enc-h4{font-family:var(--e-serif);font-size:19px;margin:18px 0 4px;color:var(--e-ink)}
#encDlg .enc-web{background:var(--e-card);border:1px solid var(--e-line);border-radius:12px;padding:12px 14px;margin:8px 0 6px}
#encDlg .web-bar{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center}
#encDlg .web-bar label{font-size:14px;color:var(--e-muted)}
#encDlg .web-bar select{font:inherit;font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--e-line);background:var(--e-vellum);color:var(--e-ink);max-width:260px}
#encDlg .web-legend{display:flex;gap:12px;font-size:12.5px;color:var(--e-muted);margin-left:auto}
#encDlg .web-legend .k::before{content:"";display:inline-block;width:18px;height:0;border-top:3px solid;vertical-align:middle;margin-right:5px}
#encDlg .web-legend .bf::before{border-color:var(--rel-bf)}#encDlg .web-legend .sg::before{border-color:var(--rel-sg);border-top-style:dashed}#encDlg .web-legend .rv::before{border-color:var(--rel-rv)}
.web-legend .fm::before{border-color:#3f8f6b;border-top-style:dotted}
#encDlg .web-body{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:14px;align-items:start}
@media (max-width:860px){#encDlg .web-body{grid-template-columns:1fr}#encDlg .web-legend{margin-left:0}}
#encDlg svg.web{width:100%;height:auto;display:block}
#encDlg svg .ln{stroke-width:3;stroke-linecap:round}#encDlg svg .ln.bf{stroke:var(--rel-bf)}#encDlg svg .ln.sg{stroke:var(--rel-sg);stroke-dasharray:7 5}#encDlg svg .ln.rv{stroke:var(--rel-rv)}#encDlg svg .ln.fm{stroke:#3f8f6b;stroke-dasharray:2 5}#encDlg .web-info .rel.fm{border-color:#3f8f6b}
#encDlg svg .web-node .ring{fill:var(--e-vellum);stroke-width:3}
#encDlg svg .web-node.center .ring{stroke-width:4}
#encDlg svg .web-node .px{image-rendering:pixelated}
#encDlg svg .web-node .lbl{font:600 12.5px var(--e-sans);fill:var(--e-ink)}
#encDlg svg .web-node.center .lbl{font:700 16px var(--e-serif)}
#encDlg svg .web-node[role=button]{cursor:pointer}
#encDlg svg .web-node[role=button]:hover .ring,#encDlg svg .web-node[role=button]:focus .ring{fill:var(--e-card);stroke-width:5}
#encDlg svg .web-node:focus{outline:none}#encDlg svg .web-node:focus-visible .ring{stroke-dasharray:3 2}
#encDlg .web-info h4{font-family:var(--e-serif);font-size:24px;margin:2px 0 0}
#encDlg .web-info h4 small{font-family:var(--e-sans);font-size:13px;color:var(--e-muted);font-weight:400}
#encDlg .web-info .who{font-size:13.5px;color:var(--e-muted);margin:2px 0 10px}#encDlg .web-info .who img{vertical-align:-3px}
#encDlg .web-info .rel{border-left:3px solid var(--e-line);padding:3px 0 5px 10px;margin:0 0 8px;font-size:14px;line-height:1.45}
#encDlg .web-info .rel.bf{border-color:var(--rel-bf)}#encDlg .web-info .rel.sg{border-color:var(--rel-sg)}#encDlg .web-info .rel.rv{border-color:var(--rel-rv)}#encDlg .web-info .rel.ch{border-color:var(--e-gold)}
#encDlg .web-info .rel b{display:block;font-size:11.5px;font-weight:600;color:var(--e-muted);letter-spacing:.02em}
#encDlg .web-info .rel em{color:var(--e-muted);font-style:normal}
#encDlg .web-info .rel q{display:block;color:var(--e-ink);font-family:var(--e-serif);font-size:16px;font-style:italic;margin-top:2px}
#encDlg .who-bar{margin:6px 0}
#encDlg .who-q{font:inherit;font-size:14px;width:min(360px,100%);padding:7px 10px;border-radius:8px;border:1px solid var(--e-line);background:var(--e-card);color:var(--e-ink)}
#encDlg .who-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}
#encDlg button.who{display:flex;gap:9px;align-items:center;text-align:left;background:var(--e-card);color:var(--e-ink);border:1px solid var(--e-line);border-left:4px solid var(--gc);border-radius:9px;padding:7px 9px;cursor:pointer;font:inherit}
#encDlg button.who:hover,#encDlg button.who:focus-visible{border-color:var(--gc);background:var(--e-vellum)}
#encDlg button.who span{display:flex;flex-direction:column;min-width:0}
#encDlg button.who b{font-size:14px}#encDlg button.who small{font-size:12px;color:var(--e-muted)}#encDlg button.who i{font-size:12px;color:var(--e-muted)}
#encDlg .enc-gweb{background:var(--e-card);border:1px solid var(--e-line);border-radius:12px;padding:10px 14px}
#encDlg .gweb-body{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:14px;align-items:start}
@media (max-width:860px){#encDlg .gweb-body{grid-template-columns:1fr}}
#encDlg svg.gweb{width:100%;height:auto;display:block}
#encDlg svg.gweb .ch{fill:none;stroke-linecap:round;opacity:.75;transition:opacity .15s}
#encDlg svg.gweb .ch.across{stroke:var(--rel-sg)}#encDlg svg.gweb .ch.within{stroke:var(--e-muted)}
#encDlg .enc-gweb[data-mode=rv] svg.gweb .ch.across{stroke:var(--rel-rv)}
#encDlg svg.gweb .ch.dim{opacity:.12}#encDlg svg.gweb .gn.dim{opacity:.45}
#encDlg svg.gweb .divide{stroke:var(--e-line);stroke-dasharray:2 5}
#encDlg svg.gweb .fl{font:600 12px var(--e-sans)}#encDlg svg.gweb .fl.dawn{fill:var(--e-dawn)}#encDlg svg.gweb .fl.dusk{fill:var(--e-dusk)}
html[data-theme="dark"] #encDlg svg.gweb .fl.dusk{fill:#b59be8}
#encDlg svg.gweb .gn{cursor:pointer}#encDlg svg.gweb .gn .ring{fill:var(--e-vellum);stroke-width:3}#encDlg svg.gweb .gn.on .ring{stroke-width:5;fill:var(--e-card)}
#encDlg svg.gweb .gn .px{image-rendering:pixelated}#encDlg svg.gweb .gn:focus{outline:none}#encDlg svg.gweb .gn:focus-visible .ring{stroke-dasharray:3 2}
#encDlg svg.gweb .gn .lbl{font:600 13px var(--e-sans);fill:var(--e-ink)}#encDlg svg.gweb .gn .sub{font:12px var(--e-sans);fill:var(--e-muted)}
#encDlg .gweb-list h4{font-family:var(--e-serif);font-size:19px;margin:6px 0;display:flex;align-items:center;gap:4px}
#encDlg .gweb-list ul{list-style:none;padding:0;margin:0;font-size:14px;max-height:330px;overflow:auto}
#encDlg .gweb-list li{display:flex;flex-wrap:wrap;align-items:center;gap:4px;padding:4px 0;border-bottom:1px solid var(--e-vellum2)}
#encDlg .gweb-list small{color:var(--e-muted)}#encDlg .gweb-list small.acr{color:var(--rel-sg);font-size:12.5px}
#encDlg .enc-bfs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
#encDlg .enc-bfs .bfg{background:var(--e-card);border:1px solid var(--e-line);border-top:4px solid var(--gc);border-radius:10px;padding:8px 12px}
#encDlg .enc-bfs .gh{display:flex;align-items:center;gap:6px;font-weight:600;margin-bottom:4px}
#encDlg .enc-bfs ul{list-style:none;margin:0;padding:0;font-size:14px}
#encDlg .enc-bfs li{display:flex;align-items:center;gap:8px;padding:4px 0;border-top:1px solid var(--e-vellum2)}
#encDlg .enc-bfs .heads{display:flex;flex:none}#encDlg .enc-bfs .heads img{margin-right:-4px}
#encDlg .enc-bfs small{color:var(--e-muted)}
#encDlg .enc-sgs{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:10px}
#encDlg .sgc{background:var(--e-card);border:1px solid var(--e-line);border-left:4px solid var(--e-line);border-radius:10px;padding:9px 12px;font-size:14px}
#encDlg .sgc.across{border-left-color:var(--rel-sg)}#encDlg .sgc.same{border-left-color:var(--e-gold)}
#encDlg .sgc .pair{display:flex;align-items:center;gap:6px}
#encDlg .sgc .pair b{display:block}#encDlg .sgc .k{color:var(--e-muted);font-size:12px}
#encDlg .sgc p{margin:6px 0 0;font-family:var(--e-serif);font-size:16px;font-style:italic;line-height:1.35}
#encDlg .sgc p.theirs{color:var(--e-muted)}
#encDlg .enc-byday{list-style:none;padding:0;display:flex;flex-direction:column;gap:4px;font-size:14px}
#encDlg .enc-byday li{display:flex;flex-wrap:wrap;align-items:center;gap:5px}#encDlg .enc-byday small{color:var(--e-muted)}
#encDlg .enc-champs{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:8px}
#encDlg .enc-champs .chp{display:flex;gap:8px;align-items:center;background:var(--e-card);border:1px solid var(--e-line);border-radius:10px;padding:8px 10px;font-size:14px}
#encDlg .enc-champs .chp small{display:block;color:var(--e-muted);font-size:13px}
#encDlg .enc-princ{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px;margin:8px 0}
#encDlg .enc-princ a{display:flex;gap:8px;align-items:center;text-decoration:none;color:var(--e-ink);background:var(--e-card);border:1px solid var(--e-line);border-left:4px solid var(--gc);border-radius:9px;padding:7px 10px}
#encDlg .enc-princ a:hover{background:var(--e-vellum)}#encDlg .enc-princ small{display:block;color:var(--e-muted);font-size:12.5px}
#encDlg .enc-canon-key{display:grid;grid-template-columns:auto 1fr;gap:8px 14px;align-items:baseline;font-size:15px}
#encDlg .enc-canon-key dd{margin:0}
#encDlg .enc-tag-o{background:#e8e2f4;color:#4b3a78;border-color:#cbbfe6}
#encDlg .enc-tag-u{background:#f5e8cf;color:#7a531c}html[data-theme="dark"] #encDlg .enc-tag-u{background:#4a3a1c;color:#f3d79c}
#encDlg .enc-tag-c,#encDlg .enc-tag-n{display:none!important}
#encDlg .enc-howto{margin:8px 0 10px;padding-left:22px;font-size:15px;line-height:1.55}#encDlg .enc-howto li{margin:0 0 7px}#encDlg .enc-howto b{color:var(--e-ink)}
html[data-theme="dark"] #encDlg .enc-tag-o{background:#352c55;color:#d9cdfa;border-color:#4d417a}
#encDlg .enc-ledger{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
@media (max-width:860px){#encDlg .enc-ledger{grid-template-columns:1fr}}
#encDlg .enc-ledger .col{background:var(--e-card);border:1px solid var(--e-line);border-top:4px solid var(--e-line);border-radius:10px;padding:8px 12px}
#encDlg .enc-ledger .col.c{border-top-color:var(--e-gold)}#encDlg .enc-ledger .col.n{border-top-color:var(--e-dawn)}#encDlg .enc-ledger .col.o{border-top-color:var(--e-dusk)}
#encDlg .enc-ledger h4{margin:2px 0 6px;font-family:var(--e-serif);font-size:19px}
#encDlg .enc-ledger ul{margin:0;padding-left:18px;font-size:14px;line-height:1.45}#encDlg .enc-ledger li{margin:0 0 5px}
#encDlg .enc-tl{list-style:none;padding:0;margin:8px 0;border-left:2px solid var(--e-gold);font-size:14.5px}
#encDlg .enc-tl li{display:grid;grid-template-columns:170px 1fr;gap:10px;padding:3px 0 3px 14px;position:relative}
#encDlg .enc-tl li::before{content:"";position:absolute;left:-5px;top:10px;width:8px;height:8px;border-radius:50%;background:var(--e-gold)}
#encDlg .enc-tl b{color:var(--e-muted);font-weight:600}
@media (max-width:600px){#encDlg .enc-tl li{grid-template-columns:1fr;gap:0}}
#encDlg .enc-gloss{display:grid;grid-template-columns:minmax(150px,auto) 1fr;gap:6px 16px;font-size:14.5px;margin:8px 0}
#encDlg .enc-gloss dt{font-weight:600}#encDlg .enc-gloss dd{margin:0}
@media (max-width:600px){#encDlg .enc-gloss{grid-template-columns:1fr}#encDlg .enc-gloss dd{margin-bottom:6px}}
#encDlg .enc-count .row{display:grid;grid-template-columns:minmax(180px,240px) 1fr auto;gap:10px;align-items:center;font-size:14px;padding:4px 0}
#encDlg .enc-count .bar{display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--e-vellum2)}
#encDlg .enc-count .bar .c{background:var(--e-gold)}#encDlg .enc-count .bar .n{background:var(--e-dawn)}
#encDlg .enc-count small{color:var(--e-muted);min-width:110px;text-align:right}
@media (max-width:600px){#encDlg .enc-count .row{grid-template-columns:1fr}}`;
  document.head.append(st);
})();

/* ---- v233: the Scene Archive, rebuilt on the general scenes. Every archived scene now fits any characters: a set's page
   lists its scenes once (not once per girl), each loads onto the characters you have, or with any girl you choose; a girl's
   shelf lists the scenes she had in the archive, which load with her exactly as they were written. ---- */
(function(){
  if(typeof ENC==="undefined"||typeof ACAD==="undefined"||!ACAD.RX)return;
  const E=ENC.E,lnk=ENC.lnk,HN=ENC.HN,RX=ACAD.RX,tag=ENC.tagEl;
  const slug=l=>String(l).toLowerCase().replace(/^academy /,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"robes";
  const bySet=new Map(RX.SETS.map(s=>[s.label,s]));
  const vis=gid=>ENC.vis?ENC.vis(gid):"#5c6080";
  const PL={title:"titles",headline:"headlines",line:"lines of speech","c1.expression":"expressions","pc.expression":"expressions for character 2",number:"numbers",setting:"settings"};
  const load=(si,vi,h)=>{RX.loadWith(si,vi,h||null);ENC.close()};
  /* who to load with: the characters you have, or a girl */
  let WITH="";
  function withPicker(onChange){
    const sel=E("select",{class:"enc-with","aria-label":"Load with"},E("option",{value:""},"My current characters"),
      ACAD.GROUPS.map(g=>E("optgroup",{label:g.name},g.members.filter(h=>!(ACAD.isMinor&&ACAD.isMinor(h))).map(h=>E("option",{value:h},HN(h))))));
    sel.value=WITH;sel.addEventListener("change",()=>{WITH=sel.value;if(onChange)onChange()});
    return E("label",{class:"enc-withlab"},"Load with ",sel)}
  const total=()=>RX.SETS.reduce((n,s)=>n+s.n,0);
  const cats=()=>{const out=[],used=new Set();(ACAD.RX_CATS||[]).forEach(([c,ls])=>{const sets=ls.map(l=>bySet.get("Academy "+l)).filter(Boolean);sets.forEach(s=>used.add(s.label));if(sets.length)out.push([c,sets])});
    const rest=RX.SETS.filter(s=>!used.has(s.label));if(rest.length)out.push(["Other sets",rest]);return out};

  /* the collection page */
  ENC.page("restricted",{title:"The Scene Archive",short:"The Scene Archive",sec:"restricted",crumbs:[],
    searchText:()=>"restricted archive general scenes any girl "+RX.SETS.map(s=>s.name).join(" "),
    build:el=>{const art=E("article",{class:"enc-article wide"});
      art.append(E("h1",{class:"enc-title"},"The Scene Archive"),
        E("p",{class:"enc-lead"},`${total().toLocaleString()} scenes in ${RX.SETS.length} sets: tender moments, couples, best friends and the original duels. Open a set, choose who to load it with, and press Load. The scene opens in the Scene step with your characters in it.`));
      cats().forEach(([c,sets])=>{art.append(E("h3",{class:"enc-h"},c,E("small",null,sets.length+(sets.length===1?" set":" sets"))),
        E("div",{class:"enc-setcards"},sets.map(s=>E("a",{href:"#",class:"enc-setcard",onclick:ev=>{ev.preventDefault();ENC.go("set:"+slug(s.label))}},E("b",null,s.name),E("small",null,s.n+(s.n===1?" scene":" scenes"))))))});
      el.append(art)}});

  /* a set's page */
  RX.SETS.forEach(s=>{const id="set:"+slug(s.label);const pg=ENC.pages[id]||ENC.page(id,{title:s.name,short:s.name,sec:"restricted",crumbs:["restricted"],kind:"The Scene Archive"});
    ENC.SETS=ENC.SETS||{};ENC.SETS[id]=Object.assign(ENC.SETS[id]||{},{label:s.label,coll:"restricted"});
    pg.searchText=()=>s.name+" restricted "+Array.from({length:s.n},(x,vi)=>RX.hookOf(s.si,vi)).join(" ");
    pg.build=el=>{const art=E("article",{class:"enc-article wide"});const list=E("div",{class:"enc-rxlist"});
      const cat=(cats().find(([,ss])=>ss.includes(s))||["",[]])[0];
      art.append(E("p",{class:"enc-kicker"},lnk("restricted","The Scene Archive"),cat?" · "+cat:""),E("h1",{class:"enc-title"},s.name),
        E("p",{class:"enc-note"},(s.n===1?"One scene":s.n+" scenes")+". Choose who to load it with, then press Load."),
        E("div",{class:"enc-rxbar"},withPicker(draw)),list);
      function draw(){list.textContent="";
        for(let vi=0;vi<s.n;vi++){const v=RX.variant(s.si,vi);const G=RX.groupsOf(v);
          list.append(E("div",{class:"enc-rxrow"},E("span",{class:"n"},String(vi+1)),E("div",{class:"t"},E("b",null,RX.hookOf(s.si,vi)),
              G.length?E("small",null,"Choices: "+G.map(g=>g.opts.length+" "+(PL[g.k]||"versions")).join(", ")+"."):null),
            E("button",{type:"button",class:"enc-load",onclick:()=>load(s.si,vi,WITH)},WITH?"Load with "+HN(WITH):"Load")))}}
      draw();el.append(art)}});

  /* a girl's shelf: the scenes she had in the archive */
  const SHELF={};
  function ownShelf(h){const out=[];RX.SETS.forEach(s=>{for(let vi=0;vi<s.n;vi++){const v=RX.variant(s.si,vi);if((v.g||[]).includes(h))out.push({s,vi})}});return out}
  /* v246: a girl the archive wasn't written for takes the shelf of the girl her sets were modeled on (her "sister", and
     that girl's sister in turn), loaded with her; ENC.shelfFrom(h) names whose shelf it was */
  const FROM={};
  function shelfOf(h){if(SHELF[h])return SHELF[h];let out=ownShelf(h),s=h,n=0;FROM[h]=h;
    while(!out.length&&ACAD.SISTER&&ACAD.SISTER[s]&&n++<6){s=ACAD.SISTER[s];out=ownShelf(s);FROM[h]=s}
    if(!out.length)FROM[h]=h;return SHELF[h]=out}
  ENC.shelfFrom=h=>{shelfOf(h);return FROM[h]};
  ENC.rIndex=h=>({lead:shelfOf(h),guest:[]});
  /* v237 prep for personal shelves: a girl with no archived scenes is the counterpart of an older girl (NEWGIRLS "sis"), whose
     scenes are her shelf's starting list. Not shown yet; ENC.shelfPlan(h) = {from, scenes:[{si,vi}]} for the version that builds it. */
  ENC.shelfPlan=h=>{if(shelfOf(h).length)return{from:h,scenes:shelfOf(h).map(r=>({si:r.s.si,vi:r.vi}))};
    const g=typeof NEWGIRLS!=="undefined"?NEWGIRLS.find(x=>x.k===h):null;const src=g&&g.sis;if(!src)return{from:"",scenes:[]};
    return{from:src,scenes:shelfOf(src).map(r=>({si:r.s.si,vi:r.vi}))}};
  ENC.resolvers=ENC.resolvers||[];
  ENC.resolvers.unshift((k,v,id)=>{if(k!=="rshelf"||!ACAD.HOUSES.includes(v))return null;
    return ENC.page(id,{title:HN(v)+" in the Scene Archive",short:HN(v),sec:"restricted",crumbs:["restricted","house:"+v],build:el=>{
      const R=shelfOf(v),g=ACAD.GROUP_OF(v),col=vis(g?g.id:"");
      const art=E("article",{class:"enc-article wide"});
      art.append(E("p",{class:"enc-kicker"},lnk("restricted","The Scene Archive")),E("h1",{class:"enc-title"},ENC.pixel(v,48)," ",HN(v)),
        E("p",{class:"enc-note"},R.length?R.length+(R.length===1?" scene":" scenes")+" from her shelf"+(ENC.shelfFrom(v)!==v?", first written for "+HN(ENC.shelfFrom(v)):"")+". Press one to load it with her.":"Her own shelf is coming. For now, any scene in the section can be loaded with her: open a set and choose her under Load with."));
      const m=new Map();R.forEach(r=>{if(!m.has(r.s))m.set(r.s,[]);m.get(r.s).push(r)});
      const box=E("div",{class:"enc-chips"});
      m.forEach((rs,s)=>rs.forEach(r=>{const b=E("button",{type:"button",class:"enc-chip",title:RX.hookOf(r.s.si,r.vi),onclick:()=>load(r.s.si,r.vi,v)},s.name+(rs.length>1?" "+(rs.indexOf(r)+1):""));b.style.setProperty("--gc",col);box.append(b)}));
      if(R.length)art.append(E("h3",{class:"enc-h"},ENC.shelfFrom(v)!==v?"Her scenes":"Her archived scenes"),box);
      art.append(E("p",{class:"enc-p"},lnk("restricted","The whole Scene Archive"),"."));
      el.append(art)}})});

  const st=document.createElement("style");st.id="encCss233";st.textContent=`
#encDlg .enc-rxbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:8px 0 12px}
#encDlg .enc-withlab{font-size:14px;color:#b9b2cf}
#encDlg .enc-with{font:inherit;font-size:14px;padding:5px 8px;border-radius:8px;border:1px solid var(--e-line);background:var(--e-card);color:var(--e-ink);margin-left:4px}
#encDlg .enc-rxlist{display:flex;flex-direction:column;gap:6px}
#encDlg .enc-rxrow{display:grid;grid-template-columns:32px 1fr auto;gap:10px;align-items:center;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.13);border-radius:9px;padding:8px 12px;color:#ece6f6}
#encDlg .enc-rxrow .n{font-family:var(--e-serif);font-size:18px;color:#b9b2cf;text-align:right}
#encDlg .enc-rxrow b{display:block;font-size:14.5px;font-weight:600}
#encDlg .enc-rxrow small{display:block;color:#b9b2cf;font-size:12.5px;margin-top:2px}
@media (max-width:600px){#encDlg .enc-rxrow{grid-template-columns:24px 1fr}#encDlg .enc-rxrow .enc-load{grid-column:2}}`;
  document.head.append(st);
})();

/* ---- v234: the 16x16 heads of the 200 sleeping Houses (v230), kept for the 16x16 pixel-art setting. ---- */
window.ENC=window.ENC||{};ENC.ROLLPX16={"mustang":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a5a32","b":"#a8754a","c":"#2a1d18"}},"zebra":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoccaaao.....",".ccoaaeaaaao....",".ccoaccaaaaao...",".cccoaaaaaaaao..",".cccoaccaaabbbo.","..ccoaaaaabbbnbo","..cccocaaaobbbbo","...ccoacao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","n":"#3a2a2a","a":"#f4f4f4","b":"#e0e0e0","c":"#1d1b22"}},"gazelle":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#d9a35e","b":"#f5e6cc","d":"#3a2a20"}},"bison":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaaccccaaao..","...oooaccaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#5a3a24","b":"#7a5232","c":"#3a2418","d":"#e8dcc8"}},"moose":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaannaaaao..","..oaaabnnbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#5d4030","b":"#7a5a44","d":"#c9a77a"}},"elk":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8754a","b":"#e8d3b0","d":"#e8d8b8"}},"pronghorn":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c98d4a","b":"#fbf4ea","d":"#2a2028"}},"okapi":{"r":["........c.......","......c.c.......","......c.........","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#4a2a20","b":"#e8d8c8","c":"#2a1810"}},"impala":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9874a","b":"#fbf1e0","d":"#3a2a20"}},"kudu":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#9a8a78","b":"#ece4d6","d":"#5a4a3a"}},"nightingale":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#c9a36a","a":"#8a6a4a","b":"#e8d8c0"}},"skylark":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#6a5a4a","p":"#e9a99a","a":"#b08a5a","b":"#f0e2c8","c":"#8a6a4a"}},"robin":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#7a5a44","b":"#e8642a"}},"wren":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#5a3a2a","a":"#9a6a3a","b":"#d8b88a","c":"#e8d8c0"}},"canary":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8a03a","a":"#f6d63a","b":"#fbe98a"}},"goldfinch":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8b8a0","a":"#f2c81a","b":"#ffffff","c":"#c8302a"}},"bluebird":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a3a","a":"#3a7ad8","b":"#e8843a"}},"mockingbird":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a30","a":"#8a8f99","b":"#e8e9ec","c":"#f4f4f4"}},"swallow":{"r":["................",".....oooo.......","...oobbbboo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".occccewaaaannoo",".occaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a2a","a":"#2a3a7a","b":"#f2e6d6","c":"#c8442a"}},"oriole":{"r":["................",".....oooo.......","...ooaaaaoo.....","..occcaaaaao....",".oaccaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#7a7a7a","a":"#f08a1a","b":"#f6b44a","c":"#1d1b22"}},"hippogriff":{"r":["....b...........","...b.oooo.......","..booaaaaoo.....",".boaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8b13a","a":"#f2efe6","b":"#a8754a"}},"roc":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8c05a","a":"#7a4a26","b":"#c99a5a","c":"#f2e3c8"}},"thunderbird":{"r":["...ccc..........","..c..oooo.......",".c.ooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f6d34a","a":"#2a4a8a","b":"#f6d34a","c":"#f6d34a"}},"simurgh":{"r":["....d.d.d.......","....cococ.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c14a","a":"#2aa58a","b":"#f2c14a","c":"#e8402a","d":"#f2c14a"}},"fenghuang":{"r":["....d.d.d.......","....cococ.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f6d34a","a":"#e8402a","b":"#f6d34a","c":"#2a8ad8","d":"#f6d34a"}},"garuda":{"r":[".....dddddd.....","....doooo..d....","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f6e3a3","a":"#d8a03a","b":"#c8302a","c":"#7a4a1a","d":"#f6e3a3"}},"lamassu":{"r":["dd............dd",".od..........do.",".opd........dpo.",".oppo......oppo.",".ocacooooooocco.",".ocaacccccccaco.","ocaaaaaaaaaaaaco","ocaeeaaaaaaeeaco","ocaewaaaaaaewaco","ocaaaaaaaaaaaaco","ocaaabbbbbbaaaco",".ocabbbnnbbbaco.",".ocabbbbbbbbaco.","..occbbbbbbcco..","...ooccccccoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9a54a","b":"#f2e3b8","c":"#6a4a2a","d":"#f6e3a3"}},"firebird":{"r":["...ccc..........","..c..oooo.......",".c.ooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f6d34a","a":"#f08a1a","b":"#f6d34a","c":"#c8302a"}},"baku":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbaabbaaao.",".oaaaboaaobaaao.","..oaaaoaaoaaao..","...ooooaaoooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","p":"#e9a99a","a":"#3a3a4a","b":"#e8e4ee","c":"#2a2a3a"}},"haetae":{"r":[".......d........",".oo....dd....oo.",".opo...dd...opo.",".oppo......oppo.",".ocacooooooocco.",".ocaacccccccaco.","ocaaaaaaaaaaaaco","ocaeeaaaaaaeeaco","ocaewaaaaaaewaco","ocaaaaaaaaaaaaco","ocaaabbbbbbaaaco",".ocabbbnnbbbaco.",".ocabbbbbbbbaco.","..occbbbbbbcco..","...ooccccccoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#4aa58a","b":"#e8f6ee","c":"#2a6a5a","d":"#f6e3a3"}},"dormouse":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaeeeeaaaaeeeeao","oaeeweaaaaeeweao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9935a","b":"#f5e6cc","c":"#88633d"}},"mole":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabnnbaaaaao",".oaaabbnnbbaaao.",".oaaabbnnbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f1a9b4","p":"#e9a99a","a":"#3a3440","b":"#5a5060","c":"#27232b"}},"chipmunk":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaccaaaaccaoo.",".oaaccaaaaccaao.","oaaaccaaaaccaaao","oaaeccaaaacceaao","oaaeccaaaaccwaao","oaaaccaaaaccaaao","oaaaccbbbbccaaao",".oaaccbnnbccaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#b0703a","b":"#f5e6cc","c":"#3a2418"}},"beaver":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabwwbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#7a4a2a","b":"#a8754a","c":"#52321c"}},"porcupine":{"r":["................","..ooo......ooo..",".occcoc.c.occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.","coaaaaaaaaaaaaoc","oaaaaaaaaaaaaaao","caaeeaaaaaaeeaac","oaaewaaaaaaewaao","caaaaaaaaaaaaaac","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#5a4a3a","b":"#a8957a","c":"#e8dcc8"}},"skunk":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaccaaaaoo.",".oaaaaaccaaaaao.","oaaaaaaccaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#5a4a5a","p":"#6a5a74","a":"#1d1b22","b":"#2a2830","c":"#ffffff"}},"possum":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#f1b9c4","a":"#c8c6cc","b":"#ffffff","c":"#2a2830"}},"marten":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#6a3a1e","b":"#f2c84a"}},"wombat":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabnnbaaaaao",".oaaabbnnbbaaao.",".oaaabbnnbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a7a6a","b":"#a89a8a","c":"#5d5248"}},"harvestmouse":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#f1b9c4","a":"#d99a5a","b":"#f6e6d0","c":"#93683d"}},"manatee":{"r":["................","................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..",".oaaaaaaaaaaaao.",".oaeeeaaaaeeeao.","oaaeeweaaeeweaao","oaaeeeaaaaeeeaao","oaaaaaabbaaaaaao","oaaaaabnnbaaaaao",".oaaaabbbbaaaao.",".oaaaaaaaaaaaao.","..ooaaaaaaaaoo..","....oooooooo....","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#4a4e56","a":"#8a9098","b":"#b8bcc4"}},"walrus":{"r":["................","................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..",".oaaaaaaaaaaaao.",".oaeeeaaaaeeeao.","oaaeeweaaeeweaao","oaaeeeaaaaeeeaao","oaaaaaabbaaaaaao","oaaaaabnnbaaaaao",".oaaaabbbbaaaao.",".oaaaaaaaaaaaao.","..ooawaaaawaoo..","....owoooowo....","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#5a3a24","a":"#a8754a","b":"#c99a6a"}},"sealion":{"r":["................","................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..",".oaaaaaaaaaaaao.",".oaeeeaaaaeeeao.","oaaeeweaaeeweaao","oaaeeeaaaaeeeaao","oaaaaaabbaaaaaao","oaaaaabnnbaaaaao",".oaaaabbbbaaaao.",".oaaaaaaaaaaaao.","..ooaaaaaaaaoo..","....oooooooo....","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a1d18","a":"#6a4a32","b":"#8a6a4a"}},"pelican":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoonn",".oaaaaewaaaannon",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo..n","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2b84a","a":"#f4f2ee","b":"#e8e4dc"}},"albatross":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c8a0","a":"#ffffff","b":"#f4f4f4","c":"#3a3a44"}},"gull":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c84a","a":"#ffffff","b":"#e8eaee"}},"starfish":{"r":["................",".......oo.......","......oaao......","......oaao......",".oooooaaaaooooo.",".oaaaaaaaaaaaao.","..oaaeaaaaeaao..","...oaaaaaaaao...","...oaaabbaaao...","..oaaaaoaaaaao..","..oaaao..oaaao..",".oaaao....oaaao.",".oaao......oaao.",".ooo........ooo.","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","a":"#e8742a","b":"#c8442a"}},"crab":{"r":[".oo..........oo.","oaao........oaao","oaaao......oaaao",".oaaao....oaaao.","..oaaoo..ooaao..","...oaaaooaaao...","....oaaaaaao....","...oaeaaaaeao...","...oawaaaawao...","...oaaaaaaaao...","....oaccccao....",".....oaaaao.....",".....oaccao.....","......oaao......","......oaao......",".......oo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#d8442a","c":"#a8301a"}},"humpback":{"r":["................","................",".......oo.......","......oaao......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaacaaaaacaoo","oaaaaaaaacaaaaao","oaewaaaaaaacaaao","oaeeaaacaaaaaaao","obbbbbbbbbaaaaao",".obbbbbbbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#2a3a5a","b":"#c8d0dc","c":"#8a9aac"}},"swordfish":{"r":["................","................","................",".....oooooo.....","...ooaaaaaaoo..o","..oaaaacaaaaaooa","noaewaacaaaaaaao","noaeeaacaacaaaao",".oaaaaacaaaaaaao",".nobbbbcbbbbbooa","..oobbbbbbbbo..o","....oooooooo....","................","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#c8d8ec","a":"#3a5a8a","b":"#c8d8ec","c":"#2a3a6a"}},"elephant":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.","cooaaaaaaaaaaooc","coaaaaaaaaaaaaoc","caaaaaaaaaaaaaac","caaeeaaaaaaeeaac","caaewaaaaaaewaac","caaaaaaaaaaaaaac","oaaaaabbbbaaaaao",".oaaabbaabbaaao.",".oaaaboaaobaaao.","..oaawoaaowaao..","...oowoaaowoo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","p":"#e9a99a","a":"#9a9aa4","b":"#b8b8c2","c":"#8a8a94"}},"rhino":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaawaaaewaao","oaaaaaawwaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a8a92","b":"#a8a8b0","c":"#5d5d63"}},"hippo":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabnnbaaaaao",".oaaabbnnbbaaao.",".oaaabbnnbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#6a4a5a","p":"#e9a99a","a":"#9a7a8a","b":"#d8a8b8","c":"#68525d"}},"giraffe":{"r":["........c.......","......c.c.......","......c.........","...cc.ooo.......","..cccoaaao......","..ccoaacaao.....",".ccoaceacaao....",".ccoaawaaaaao...",".cccoaacaaaaao..",".cccoaaaaaabbbo.","..ccoacaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8b45a","b":"#f5dca8","c":"#8a4a1e"}},"meerkat":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaacccaaaacccaao","oaacwcaaaacecaao","oaaccaaaaaaccaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9a274","b":"#efe0c8","c":"#5a3a24"}},"ostrich":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2b8a0","a":"#f2e8dc","b":"#2a2830"}},"wildebeest":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaaccccaaao..","...oooaccaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#5a5a64","b":"#7a7a84","c":"#2a2a30","d":"#2a2a30"}},"buffalo":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a3436","b":"#5a5456","d":"#c8c0b0","c":"#272324"}},"secretarybird":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f08a3a","p":"#e9a99a","a":"#c8c8cc","b":"#f4f4f4","c":"#1d1b22"}},"hornbill":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoonn",".oaaaaewaaaannon",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c84a","a":"#1d1b22","b":"#2a2830"}},"yale":{"r":[".......d........","..ooo..dd..ooo..",".dccco.dd.occcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f2d16b","b":"#f5e6c8","d":"#c9a54a","c":"#a48e48"}},"enfield":{"r":[".o............o.",".oo..........oo.",".oco........oco.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e2722a","b":"#fbf4ea","c":"#1d1b22"}},"opinicus":{"r":["....b...........","...b.oooo.......","..booaaaaoo.....",".boaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8b13a","a":"#c9a54a","b":"#f5e6c8"}},"calygreyhound":{"r":["do.d........d.od","dood.d....d.dood",".opo.d....d.opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a2f6b","b":"#e8e0c8","d":"#c9a54a"}},"allocamelus":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#c9a274","b":"#f1e4cf","c":"#7a5232"}},"tyger":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".ocacooooooocco.",".ocaacccccccaco.","ocaaaaaaaaaaaaco","ocaeeaaaaaaeeaco","ocaewaaaaaaewaco","ocaaaaaaaaaaaaco","ocaaabbbbbbaaaco",".ocabbbnnbbbaco.",".ocabbbbbbbbaco.","..occbwbbwbcco..","...ooccccccoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9a54a","b":"#f5e6c8","c":"#2a2f6b"}},"bagwyn":{"r":["dd............dd","..d..........d..","...d........d...","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a5a32","b":"#e8d3b0","c":"#2a1d18","d":"#c9a54a"}},"pantheon":{"r":["d...............",".oo..........ood",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaacaaaaaacaao.","oaaaaaacaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oacaabbbbbbaacao",".oaabbbnnbbbaaod",".oacbbbbbbbbcao.","..oaabbbbbbaao..",".d.ooaaaaaaoo...",".....oooooo...d."],"c":{"o":"#1d1b22","e":"#c9a54a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a2f6b","b":"#4a508a","c":"#f2e6c3","d":"#f2e6c3"}},"alphyn":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a5a3a","b":"#e8e0c8"}},"musimon":{"r":["dd............dd","..doo......ood..",".dcdco....ocdcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e8dcc8","b":"#f5efe4","d":"#c9a54a","c":"#9d9588"}},"bat":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao","coaabbbnnbbbaaoc","coaabbbbbbbbaaoc","..oaabwbbwbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#c98aa8","a":"#3a2a44","b":"#5a4a64","c":"#2a1d34"}},"vampirebat":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao","coaabbbnnbbbaaoc","coaabbbbbbbbaaoc","..oaabwbbwbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#c8202a","w":"#ffffff","n":"#3a2a2a","p":"#8a1a2a","a":"#2a1d2e","b":"#4a2a3a","c":"#8a1a2a"}},"flyingfox":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","c.oaaabbbbaaao.c","c.oaabbbbbbaao.c","c..oabbnnbbao..c","cc.oabbbbbbao.cc","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#6a3a2a","b":"#c98a4a","c":"#3a1d14"}},"nightjar":{"r":["................",".....oooo.......","...ooaaaaoo.....","..occcaaaaao....",".oaccaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#7a6a5a","b":"#a89a8a","c":"#c8b8a0"}},"loris":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaecceaaaaecceao","oaecweaaaaeeceao","oaaccaaaaaaccaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#b0805a","b":"#efe0c8","c":"#5a3a24"}},"ayeaye":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaeeeeaaaaeeeeao","oaeeweaaaaeeweao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#6a5a64","a":"#3a3436","b":"#5a5456","c":"#272324"}},"tarsier":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaeeeeaaaaeeeeao","oaeeweaaaaeeweao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#c8902a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8875a","b":"#d8c0a0","c":"#725b3d"}},"kinkajou":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c98a3a","b":"#e8b46a","c":"#885d27"}},"civet":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaccecccccceccao","oaccwccccccwccao","oaaaaaaaaaaaaaao","oaacabbbbbbacaao",".oaabbbnnbbbaao.",".oaacbbbbbbcaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#b8ab94","b":"#f0e6d6","c":"#1d1b22"}},"genet":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaacaaaaaacaao.","oaaaaaacaacaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","ocaaaaaaaaaaaaco","oacaabbbbbbaacao",".oaabbbnnbbbaao.",".oacbbbbbbbbcao.","..oacbbbbbbcao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#d8ccb4","b":"#f4ecdc","c":"#2a2028"}},"anglerfish":{"r":["..dcc...........","..d..c..........",".....c..........",".....oooooo.....","...ooaaaaaaoo..o","..oaaaacaaaaaooa",".oaewaacaaaaaaao",".oaeeaacaacaaaao",".oaaaaacaaaaaaao",".nwbbbbcbbbbbooa","..owbbbbbbbbo..o","....oooooooo....","................","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#3a3a2a","b":"#5a5a3a","c":"#2a2a1a","d":"#c9fff4"}},"giantsquid":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..","..oaacaaaacaao..",".oaaaaaaaaaaaao.",".oaaeeaaaaeeaao.",".oaaewaaaaewaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..",".oaoaoaoaoaoaoo.","oaoaoaoaoaoaoao.","oao.oao.oao.oao.",".o..o.o..o..o.o.","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#c8442a","c":"#f2c84a"}},"oarfish":{"r":["......cccc......",".....ooccoo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaeeaaaaaaeeao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","n":"#3a2a2a","p":"#e9a99a","a":"#c8ccd8","b":"#e8eaf0","c":"#c8302a"}},"viperfish":{"r":["................","................","................",".....oooooo.....","...ooaaaaaaoo..o","..oaaaacaaaaaooa",".oaewaacaaaaaaao",".oaeeaacaacaaaao",".oaaaaacaaaaaaao",".nwbbbbcbbbbbooa","..owbbbbbbbbo..o","....oooooooo....","................","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#2a2a44","b":"#4a4a6a","c":"#8a8aff"}},"barracuda":{"r":["................","................","................",".....oooooo.....","...ooaaaaaaoo..o","..oaaaacaaaaaooa",".oaewaacaaaaaaao",".oaeeaacaacaaaao",".oaaaaacaaaaaaao",".nobbbbcbbbbbooa","..oobbbbbbbbo..o","....oooooooo....","................","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a9aaa","b":"#e8eef4","c":"#3a4a5a"}},"moray":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaccaacaaaao.",".oaecaaaaaaceao.",".oaeeaacaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","n":"#3a2a2a","p":"#e9a99a","a":"#4a6a2a","b":"#8a9a4a","c":"#2a3a1a"}},"lionfish":{"r":["................",".......oo.......","......obo.......",".....oooooo.....","...ooaaaaacoo..o","..oaaaacaacaaooa",".oaewaacaacaaaao",".oaeeaacaacaaaao",".oaaaaacaacaaaao",".nobbbbcbbcbbooa","..oobbbbbbbbo..o","....oooooooo....","......obo.......",".......oo.......","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8442a","b":"#f6e6dc","c":"#ffffff"}},"stingray":{"r":["................","................",".......oo.......","......oaao......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaacaaaaacaoo","oaaaaaaaacaaaaao","oaewaaaaaaacaaao","oaeeaaacaaaaaaao","obbbbbbbbbaaaaao",".obbbbbbbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#7a6a5a","b":"#e8e0d6","c":"#5a4a3a"}},"hammerhead":{"r":["................","................","......ooo.......",".....ooooo......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaaaaaaaaaaoo","oaaaaaaaaaaaaaao","oaewaccaaaaaaaao","oaeeacccaaaaaaao","obbbbbbbbbaaaaao",".wwwbwbwbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#6f8296","b":"#f2f4f7","c":"#4a5a6a"}},"nautilus":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..","..oaaccaaccaao..",".oaacaaaaaacaao.",".oaaceaaaaecaao.",".oaaewaaaaewaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..",".oaoaoaoaoaoaoo.","oaoaoaoaoaoaoao.","oao.oao.oao.oao.",".o..o.o..o..o.o.","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#f2e8dc","c":"#c8642a"}},"cerberus":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oabbaaaaaabbao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#e8402a","w":"#ffd0c0","n":"#3a2a2a","p":"#e9a99a","a":"#2a2628","b":"#4a4448"}},"orthrus":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#e8402a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a2a2a","b":"#5a4444"}},"barghest":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#5a4a5a","a":"#1d1b22","b":"#3a3440"}},"blackshuck":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#e8302a","w":"#ff8a7a","n":"#3a2a2a","p":"#3a2a30","a":"#141216","b":"#2a2628"}},"fenrir":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oabbaaaaaabbao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#5a5a64","b":"#9a9aa4"}},"warg":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#e8b02a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#4a3a2a","b":"#7a6a5a"}},"garm":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#f6d34a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#6a2a24","b":"#8a4a3a"}},"cusith":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#f2e8a0","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a7a4a","b":"#6aa87a"}},"amarok":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#3a7fb8","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#d8dce4","b":"#ffffff"}},"gytrash":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oabbaaaaaabbao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#a8e8ff","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a2a34","b":"#4a4a5a"}},"basilisk":{"r":["......cccc......",".....ooccoo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#4a6a2a","b":"#8aaa4a","c":"#f2c84a"}},"hydra":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a6a5a","b":"#5aa88a","c":"#1a4a3a"}},"wyvern":{"r":[".dd..........dd.","..dd........dd..","..odd......ddo..",".oaado....odaao.",".oaaaaooooaaaao.","oaaacaaaaaacaaao","oaaeeeaaaaeeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaccbbbbbbccaao",".oaabbbbbbbbaao.",".oabbnbbbbnbbao.","..obbbbbbbbbbo..","..owbwbwbwbwbo..","...oooooooooo...","................"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","a":"#3a5a2a","b":"#8aaa4a","c":"#1a3a1a","d":"#c8d88a"}},"cockatrice":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c84a","p":"#e9a99a","a":"#c8302a","b":"#f2c84a","c":"#3a6a2a"}},"lindworm":{"r":[".dd..........dd.","..dd........dd..","..odd......ddo..",".oaado....odaao.",".oaaaaooooaaaao.","oaaacaaaaaacaaao","oaaeeeaaaaeeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaccbbbbbbccaao",".oaabbbbbbbbaao.",".oabbnbbbbnbbao.","..obbbbbbbbbbo..","..owbwbwbwbwbo..","...oooooooooo...","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#5a3a6a","b":"#9a7aaa","c":"#2a1a3a","d":"#e8d8b8"}},"amphisbaena":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a2a2a","b":"#c8644a","c":"#f2c84a"}},"naga":{"r":["................",".....oooooo.....","..oooaaaaaaooo..",".occoaaaaaaocco.","occcoaaaaaaoccco","occcaeeaaeeaccco","occcaewaaewaccco","occcaaaaaaaaccco",".occaabbbbaacco.",".occabbbbbbacco.","..ocabnbbnbaco..","...ocabbbbaco...","....oooooooo....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a8a6a","b":"#f2c84a","c":"#1a5a4a"}},"salamander":{"r":["................","................","...oooooooooo...","..oaaaaaaaaaao..",".oooacaaacaaooo.","oeewoaaaaaaoweeo","oeeeoaacaaaoeeeo",".ooocaaaaaacooo.",".oaaaaaaaaaaaao.",".oaccaaaaaaccao.",".ocaannnnnnaaco.","..oaaaaaaaaaao..","...oooooooooo...","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8642a","c":"#c8302a"}},"tarasque":{"r":["................","....oooooooo....","..oocccbcbccoo..",".ocbbccbbccbbco.","ocbbbbccccbbbbco","ccbbcoooooocbbcc","ocbcoaaaaaaocbco","cbboaeeaaeeaobbc","obboaewaaewaobbo","coboaaaaaaaaoboc","..ooaaannaaaoo..","...oaaaaaaaao...","....oooooooo....","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#5a6a3a","b":"#8a9a5a","c":"#3a4a2a"}},"jormungandr":{"r":["......cccc......",".....ooccoo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#2a4a5a","b":"#5a8a9a","c":"#1a2a3a"}},"tanuki":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".occeccccccecco.",".occwccccccwcco.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#7a5a3a","b":"#e8d8c0","c":"#2a1d18"}},"puca":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","a":"#1d1b22","b":"#3a3440","c":"#2a2630"}},"kumiho":{"r":[".o............o.",".oo..........oo.",".oco........oco.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaccaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#6d7080","e":"#c8302a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f6f6fa","b":"#ffffff","c":"#c9cbd4"}},"lyrebird":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaabbbaonnn","coaaaaaaaaaoo...","c.oaaaaaaaao....","ccoabbbbbbao....","cc.obbbbbbbo....","cc.obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a6a4a","b":"#c9a77a","c":"#5a3a24"}},"cuckoo":{"r":["................",".....oooo.......","...oobbbboo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".occccewaaaannoo",".occaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c84a","a":"#7a8494","b":"#e8e4dc","c":"#3a4454"}},"mimicoctopus":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..","..oaaccaaccaao..",".oaacaaaaaacaao.",".oaaceaaaaecaao.",".oaaewaaaaewaao.",".oaaaaaaaaaaaao.","..oaaaaaaaaaao..",".oaoaoaoaoaoaoo.","oaoaoaoaoaoaoao.","oao.oao.oao.oao.",".o..o.o..o..o.o.","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#c9a274","c":"#5a3a24"}},"shrike":{"r":["................",".....oooo.......","...oobbbboo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".occccewaaaannoo",".occaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#1d1b22","a":"#9aa0aa","b":"#f4f4f4","c":"#1d1b22"}},"jackdaw":{"r":["................",".....oooo.......","...ooaaaaoo.....","..occcaaaaao....",".oaccaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#c8d8f0","w":"#ffffff","n":"#3a2a2a","a":"#2a2830","b":"#5a5866","c":"#8a8f9c"}},"bakeneko":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaacabbbbbbacaao",".oaabbbnnbbbaao.",".oaacbbbbbbcaaoc","..oaabbbbbbaaocc","...ooaaaaaaoo..c",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#f1b9c4","a":"#f4f2ee","b":"#ffffff","c":"#e8843a"}},"nue":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaccaaaaao.","oaaaaaccccaaaaao","oaaeeaaaaaaeeaao","ocaewaaaaaaewaco","oacaaaaaaaaaacao","oaacabbbbbbacaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a6a3a","b":"#c99a5a","c":"#2a2028"}},"camel":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#c99a5a","b":"#e8c98a","c":"#a8754a"}},"sandcat":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#d8c09a","b":"#f4ecdc"}},"jerboa":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaeeeeaaaaeeeeao","oaeeweaaaaeeweao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e0c090","b":"#f6ecd8","c":"#988261"}},"sidewinder":{"r":["dd............dd","..d..oooooo..d..","...doaaaaaaod...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#d8c09a","b":"#efe0c8","c":"#a88a6a","d":"#a88a6a"}},"gilamonster":{"r":["................","................","...oooooooooo...","..oaaaaaaaaaao..",".oooacaaacaaooo.","oeewoaaaaaaoweeo","oeeeoaacaaaoeeeo",".ooocaaaaaacooo.",".oaaaaaaaaaaaao.",".oaccaaaaaaccao.",".ocaannnnnnaaco.","..oaaaaaaaaaao..","...oooooooooo...","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8742a","c":"#2a2028"}},"roadrunner":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a2a","p":"#e9a99a","a":"#8a7a5a","b":"#e8dcc8","c":"#3a3a2a"}},"oryx":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#efe4d4","b":"#ffffff","d":"#2a2028"}},"monitor":{"r":["....c.c.c.c.....","...ccccccccc....","...occccccco....","..oaaaaaaaaao...",".oaaaaaaaaaaao..",".oaeeaaaaaeeao..",".oaewaaaaaewao..",".oaaaaaaaaaaao..",".oaaaannnaaaao..","..oaaaaaaaaao...","...obbbbbbbo....","....obbbbbo.....",".....obbbo......","......ooo.......","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#6a6a4a","b":"#9a9a6a","c":"#3a3a2a"}},"thornydevil":{"r":["....c.c.c.c.....","...ccccccccc....","...occccccco....","..oaaaaaaaaao...",".oaaaaaaaaaaao..","coaeeaaaaaeeao.c",".oaewaaaaaewao..","coaaaaaaaaaaao.c",".oaaaannnaaaao..","c.oaaaaaaaaao..c","...obbbbbbbo....","....obbbbbo.....",".....obbbo......","......ooo.......","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#d8944a","b":"#e8b46a","c":"#7a4a2a"}},"addax":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f2ece0","b":"#ffffff","d":"#c9b29a"}},"blackcat":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#0d0c10","e":"#7ad83a","w":"#e8ffd0","n":"#15131a","p":"#6a5a74","a":"#1d1b22","b":"#2a2830"}},"toad":{"r":["................","..oooo....oooo..",".oaaaao..oaaaao.",".oaeeao..oaeeao.",".oaewaooooaewao.","oaaaaaaaaaaaaaao","oaaccaaaaaaccaao","oaaaaaaaaaaaaaao","oannnnnnnnnnnnao","oaaaaaaaaaaaaaao",".oappaaaaaappao.","..oaaaaaaaaaao..","...oooooooooo...","................","................","................"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#7a6a3a","c":"#4a3a1a"}},"rook":{"r":["................",".....oooo.......","...ooaaaaoo.....","..occcaaaaao....",".oaccaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#c8c8cc","a":"#2a2830","b":"#4a4858","c":"#5a5866"}},"barnowl":{"r":[".o............o.",".oo..........oo.",".oaoo......ooao.",".oaaaooooooaaao.","oaaaaaaaaaaaaaao","oabbbbaaaabbbbao","obbweebaabweebbo","obbeeebaabeeebbo","oabbbbannabbbbao","oaaaaaannaaaaaao","oaaaaaaaaaaaaaao",".oacacacacacaao.",".oaacacacacacao.","..oaaaaaaaaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8c48a","b":"#ffffff","c":"#a8754a"}},"newt":{"r":["................","cc............cc",".ccc..oooo..ccc.","cc.coaaaaaaoc.cc",".ccoaaaaaaaaocc.","cc.oaaaaaaaao.cc","..oaeeaaaaeeao..","..oaewaaaaewao..","..oaaaaaaaaaao..","..oappaaaappao..","..oaaannnnaaao..","...oaaaaaaaao...","....oooooooo....","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e8742a","c":"#3a2a1a"}},"witchhare":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabwwbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#c8a02a","w":"#ffffff","n":"#3a2a2a","p":"#e8a9aa","a":"#8a7a6a","b":"#e8dcc8","c":"#5d5248"}},"weasel":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8642a","b":"#f4ecdc","c":"#72441c"}},"polecat":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaccecccccceccao","oaccwccccccwccao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a2a24","b":"#e8dcc8","c":"#1d1b22"}},"adder":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaaccacacaao..",".oaaaaccacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a8a7a","b":"#c8c4b0","c":"#2a2a24"}},"deathshead":{"r":["..c.c......c.c..","...c........c...","..c.o......o.c..",".oooo.oooo.oooo.","oaaaaoobbooaaaao","oaccaaobboaaccao","oaccaaobboaaccao","oaaaaaobboaaaaao",".oaaaaobboaaaao.","..obbbobbobbbo..",".obbccobboccbbo.",".obbbbobbobbbbo.","..oooo.oo.oooo..","................","................","................"],"c":{"o":"#1d1b22","a":"#3a2a24","b":"#e8b45a","c":"#f2e6c8"}},"skoll":{"r":["do............o.",".oo..........ood",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","d.oaabbbbbbaao..","...oabbnnbbao..d","...oabbbbbbao...","....oabbbbao....",".d...oaaaao.....","......oooo....d."],"c":{"o":"#1d1b22","e":"#e8402a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f2c84a","b":"#fbe98a","d":"#fff4c2"}},"hati":{"r":["do............o.",".oo..........ood",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","d.oaabbbbbbaao..","...oabbnnbbao..d","...oabbbbbbao...","....oabbbbao....",".d...oaaaao.....","......oooo....d."],"c":{"o":"#1d1b22","e":"#3a4a9a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c8d0e8","b":"#eef2ff","d":"#fff4c2"}},"yatagarasu":{"r":[".....dddddd.....","....doooo..d....","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#e8402a","w":"#ffffff","n":"#f2c84a","a":"#1d1b22","b":"#2a2830","d":"#f2c84a"}},"jadehare":{"r":["do............o.","..ooo......ooo.d",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaaod",".oaaabbbbbbaaao.","..oaaabwwbaaao..",".d.oooaaaaooo...","......oooo....d."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#f2b8c8","a":"#9ad8b8","b":"#e8fff4","d":"#fff4c2","c":"#68927d"}},"starwhale":{"r":["d...............","...............d",".......oo.......","......oaao......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaacaaaaacaoo","oaaaaaaaacaaaaao","oaewaaaaaaacaaao","oaeeaaacaaaaaaao","obbbbbbbbbaaaaao",".obbbbbbbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..",".d..............","..............d."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#1a2050","b":"#3a4a9a","c":"#e8ecff","d":"#fff4c2"}},"rahu":{"r":[".....dddddd.....","....dooooood....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaacaacaaaao.",".oaewaaaaaaweao.",".oaeeaaaaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#f2c84a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#1a1a2a","b":"#3a3a5a","c":"#f2c84a","d":"#f2c84a"}},"tianma":{"r":["d...............","...............d","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..","wcccoaaaaaabbbo.","wwccoaaaaabbbnbo","wwwccoaaaaobbbbo","ww.ccoaaao.oooo.","...ccoaaao......",".d..coaaao......",".....oooo.....d."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#e8ecff","b":"#ffffff","c":"#7a8cff","d":"#f2c84a"}},"bennu":{"r":[".....dddddd.....","....doooo..d....","...ooccaaoo.....","..oaccaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a3a","a":"#4a6aa8","b":"#e8ecff","c":"#f2c84a","d":"#f2c84a"}},"chrysomallos":{"r":[".....cccccc.....","..oooccccccooo..",".dccco....occcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f2c84a","b":"#fbe98a","d":"#e8a03a","c":"#a48832"}},"cetus":{"r":["d...............","...............d","......ooo.......",".....ooooo......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaaaaaaaaaaoo","oaaaaaaaaaaaaaao","oaewaccaaaaaaaao","oaeeacccaaaaaaao","obbbbbbbbbaaaaao",".wwwbwbwbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..",".d..............","..............d."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#2a3a7a","b":"#6a7ad8","c":"#4a5aa8","d":"#fff4c2"}},"mammoth":{"r":[".....cccccc.....","..oooccccccooo..",".occco....occco.",".ocpcoooooocpco.","cooaaaaaaaaaaooc","coaaaaaaaaaaaaoc","caaaaaaaaaaaaaac","caaeeaaaaaaeeaac","caaewaaaaaaewaac","caaaaaaaaaaaaaac","oaaaaabbbbaaaaao",".oaaabbaabbaaao.",".oaaaboaaobaaao.","..oaawoaaowaao..","...oowoaaowoo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","p":"#e9a99a","a":"#7a4a2a","b":"#a8754a","c":"#5a3a1a"}},"smilodon":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabwbbwbaao..","...ooawaawaoo...",".....owoowo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9a274","b":"#f1e2cc"}},"megalodon":{"r":["................","................","......ooo.......",".....ooooo......","....oooaaooo....","..ooaaaaaaaaoo..",".oaaaaaaaaaaaaoo","oaaaaaaaaaaaaaao","oaewaccaaaaaaaao","oaeeacccaaaaaaao","obbbbbbbbbaaaaao",".wwwbwbwbbbbaaao","..oobbbbbbbbbbo.","....oooooooooo..","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","a":"#4a5a6a","b":"#e8ecf0","c":"#2a3a4a"}},"cavebear":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a1d18","p":"#e9a99a","a":"#5a3a24","b":"#7a5232","c":"#3d2718"}},"direwolf":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oabbaaaaaabbao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oawbbwao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#e8b02a","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#4a4a52","b":"#8a8a94"}},"megatherium":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaacaaaaaacaaao","oaaacabbbbacaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a6a4a","b":"#a88a6a","c":"#5a4a3a"}},"glyptodon":{"r":["................","....oooooooo....","..oocccbcbccoo..",".ocbbccbbccbbco.","ocbbbbccccbbbbco","ccbbcoooooocbbcc","ocbcoaaaaaaocbco","cbboaeeaaeeaobbc","obboaewaaewaobbo","coboaaaaaaaaoboc","..ooaaannaaaoo..","...oaaaaaaaao...","....oooooooo....","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a7a5a","b":"#a89a7a","c":"#5a4a3a"}},"terrorbird":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8c45a","a":"#5a6a4a","b":"#8a9a6a","c":"#3a4a2a"}},"pteranodon":{"r":["................",".....oooo.......","...ooccaaoo.....","..oaccaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#e8c45a","a":"#8a6a5a","b":"#c9a88a","c":"#c8642a"}},"triceratops":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaawaaaewaao","oaaaaaawwaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#6a7a5a","b":"#8a9a7a","d":"#efe4d4","c":"#48523d"}},"sloth":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaacaaaaaacaaao","oaaacabbbbacaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#9a8a6a","b":"#e8dcc0","c":"#5a4a2a"}},"pangolin":{"r":["................","....oooooooo....","..ooccbbbbccoo..",".ocbbccbbccbbco.","ocbbbbccccbbbbco","ocbbcoooooocbbco","ocbcoaaaaaaocbco","obboaeeaaeeaobbo","obboaewaaewaobbo",".oboaaaaaaaaobo.","..ooaaannaaaoo..","...oaaaaaaaao...","....oooooooo....","................","................","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#a8754a","b":"#c99a6a","c":"#7a4a2a"}},"orangutan":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaeeeeaaaaeeeeao","oaeeweaaaaeeweao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c8642a","b":"#e8a46a","c":"#8a3a1a"}},"toucan":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoonn",".oaaaaewaaaannon",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f08a1a","a":"#1d1b22","b":"#ffffff"}},"harpyeagle":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2a30","p":"#e9a99a","a":"#8a8f99","b":"#f4f4f4","c":"#2a2a30"}},"ocelot":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaacaaaaaacaao.","oaaaaaacaacaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","ocaaaaaaaaaaaaco","oacaabbbbbbaacao",".oaabbbnnbbbaao.",".oacbbbbbbbbcao.","..oacbbbbbbcao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e2b46a","b":"#f6e3b8","c":"#2a2028"}},"capybara":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabnnbaaaaao",".oaaabbnnbbaaao.",".oaaabbnnbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8754a","b":"#c99a6a","c":"#724f32"}},"anaconda":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaccaacaaaao.",".oaecaaaaaaceao.",".oaeeaacaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","n":"#3a2a2a","p":"#e9a99a","a":"#5a6a2a","b":"#9aaa5a","c":"#1d1b22"}},"quetzal":{"r":["..cccc..........",".ccccoooo.......","cccooaaaaoo.....","c.oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaappannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f2c84a","p":"#e9a99a","a":"#2aa55a","b":"#c8302a","c":"#2aa55a"}},"coati":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".occeccccccecco.",".occwccccccwcco.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8642a","b":"#e8d8c0","c":"#3a2418"}},"yak":{"r":["dd...cccccc...dd","..dooccccccood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a2a24","b":"#5a4a3a","d":"#e8dcc8","c":"#2a1d18"}},"ibex":{"r":["................","..ooo......ooo..",".dccco....occcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaaccccaaao..","...oooaccaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8875a","b":"#d8c0a0","d":"#5a4a3a","c":"#725b3d"}},"marmot":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabwwbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8754a","b":"#d8b88a","c":"#724f32"}},"pika":{"r":[".o............o.","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a89a8a","b":"#d8ccc0","c":"#72685d"}},"lammergeier":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaacccccaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaooono","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#e8402a","w":"#ffffff","n":"#3a3a3a","a":"#e8a46a","b":"#f6e6d0","c":"#1d1b22"}},"wolverine":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaccaaaaccaoo.",".oaaccaaaaccaao.","oaaaccaaaaccaaao","oaaeccaaaacceaao","oaaeccaaaaccwaao","oaaaccaaaaccaaao","oaaaccbbbbccaaao",".oaaccbnnbccaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#4a3428","b":"#a88a5a","c":"#2a1d18"}},"chamois":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8875a","b":"#f4ecdc","d":"#1d1b22"}},"takin":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabnnbaaaaao",".oaaabbnnbbaaao.",".oaaabbnnbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#e8c45a","b":"#f2dc8a","d":"#2a2028","c":"#9d853d"}},"markhor":{"r":["d..d........d..d","dd.d.d....d.d.dd",".ddd.d....d.ddd.","..ddd......ddd..","..oo.ddddd...oo.",".opo..........o.",".oppo......oppo.",".oaaaoooooooaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.","..oaaaaaaaaaao..","..oaaabbbbaaao..","...oabbnnbbao...","....oaccccao....",".....oaccao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8a090","b":"#e8e4dc","d":"#6a5a4a","c":"#6a5a4a"}},"bighorn":{"r":["................","..ooo......ooo..",".dccco....occcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a6a4a","b":"#e8dcc8","d":"#c9a77a","c":"#5d4832"}},"kelpie":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#a8ffe8","w":"#ffffff","n":"#3a2a2a","a":"#2a4a4a","b":"#4a7a6a","c":"#5aa88a"}},"selkie":{"r":["................","................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..",".oaaaaaaaaaaaao.",".oaeeeaaaaeeeao.","oaaeeweaaeeweaao","oaaeeeaaaaeeeaao","oaaaaaabbaaaaaao","oaaaaabnnbaaaaao",".oaaaabbbbaaaao.",".oaaaaaaaaaaaao.","..ooaaaaaaaaoo..","....oooooooo....","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#2a2830","a":"#5a5a64","b":"#8a8a94"}},"caitsith":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaabbbbbbaaaao",".oaabbbnnbbbaao.",".oaabbbccbbbaao.","..oaabbccbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#0d0c10","e":"#7ad8a8","w":"#ffffff","n":"#3a2a2a","p":"#6a5a74","a":"#1d1b22","b":"#2a2830","c":"#ffffff"}},"wolpertinger":{"r":["d..d........d..d","ddoood....dooodd",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaawbbwaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a6a4a","b":"#e8d8c0","d":"#c9a77a","c":"#5d4832"}},"jackalope":{"r":["d..d........d..d","ddoood....dooodd",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabwwbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9a274","b":"#f1e4cf","d":"#e8dcc8","c":"#886e4e"}},"questingbeast":{"r":["................",".....oooooo.....","...ooaaaaaaoo...","..oaacaaaacaao..",".oaaaccaacaaaao.",".oaecaaaaaaceao.",".oaeeaacaaaeeao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabnbbnbao...","....oabbbbao....",".....oooooo.....",".......pp.......","......p..p......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","n":"#3a2a2a","p":"#e9a99a","a":"#e8b45a","b":"#f6dca8","c":"#8a5a2a"}},"almiraj":{"r":[".......d........","..ooo..dd..ooo..",".occco.dd.occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabwwbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#f2b8a0","a":"#f2c84a","b":"#fbe98a","d":"#ffffff","c":"#a48832"}},"bunyip":{"r":["................","................",".....oooooo.....","...ooaaaaaaoo...","..oaaaaaaaaaao..",".oaaaaaaaaaaaao.",".oaeeeaaaaeeeao.","oaaeeweaaeeweaao","oaaeeeaaaaeeeaao","oaaaaaabbaaaaaao","oaaaaabnnbaaaaao",".oaaaabbbbaaaao.",".oaaaaaaaaaaaao.","..ooaawaawaaoo..","....oooooooo....","................"],"c":{"o":"#1d1b22","e":"#e8c45a","w":"#ffffff","n":"#2a2a1a","a":"#3a3a2a","b":"#5a5a3a"}},"tatzelwurm":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaccaaaaao.","oaaaaaccccaaaaao","oaaeeaaaaaaeeaao","ocaewaaaaaaewaco","oacaaaaaaaaaacao","oaacabbbbbbacaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#8a8a6a","b":"#c8c8a8","c":"#4a4a3a"}},"hodag":{"r":["dd............dd","..doo......ood..",".ocdcoc.c.ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.","coaaaaaaaaaaaaoc","oaaaaaaaaaaaaaao","caaeeaaaaaaeeaac","oaaewaaaaaaewaao","caaaaaaaaaaaaaac","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaawbbwaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#3a5a3a","b":"#5a7a5a","d":"#efe4d4","c":"#efe4d4"}},"tabby":{"r":["................",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaccaaaaao.","oaaaaaccccaaaaao","oaaeeaaaaaaeeaao","ocaewaaaaaaewaco","oacaaaaaaaaaacao","oaacabbbbbbacaao",".oaabbbnnbbbaao.",".oaabbbbbbbbaao.","..oaabbbbbbaao..","...ooaaaaaaoo...",".....oooooo....."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#c9935a","b":"#f5e6cc","c":"#7a4a2a"}},"hound":{"r":[".o............o.",".oo..........oo.",".opo........opo.",".oppo......oppo.",".oaaaoooooooaao.",".oaaaaaaaaaaaao.",".oaeeaaaaaaeeao.",".oaewaaaaaaewao.",".oaaaaaaaaaaaao.","..oaaabbbbaaao..","..oaabbbbbbaao..","...oabbnnbbao...","...oabbbbbbao...","....oabbbbao....",".....oaaaao.....","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#a8642a","b":"#e8d8c0"}},"ram":{"r":[".....cccccc.....","..oooccccccooo..",".dccco....occcd.","docpcoooooocpcod","dooaaaaaaaaaaood","doaaaaaaaaaaaaod","oddaaaaaaaaaaddo","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#efe4d4","b":"#f8f2e8","d":"#c9a77a","c":"#a29b90"}},"goat":{"r":["dd............dd","..doo......ood..",".ocdco....ocdco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaaccccaaao..","...oooaccaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#ffffff","b":"#f4f4f4","d":"#a8a090","c":"#d8d4cc"}},"goose":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oaaaaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#f08a1a","a":"#ffffff","b":"#f4f4f4"}},"dove":{"r":["................",".....oooo.......","...ooaaaaoo.....","..oaaaaaaaao....",".oaaaaaaaaaao...",".oaaaaeeaaaaoo..",".oaaaaewaaaannoo",".oaaaaaaaaaannnn",".oaaaaaaaaaaonnn",".oaaaaaaaaaoo...","..oappaaaaao....","..oabbbbbbao....","...obbbbbbbo....","...obbbbbbo.....","....oooooo......","................"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#c8a0a8","p":"#f1b9c4","a":"#e8e8f0","b":"#ffffff"}},"donkey":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#8a8a92","b":"#d8d8de","c":"#4a4a52"}},"ferret":{"r":["................","..ooo......ooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaccecccccceccao","oaccwccccccwccao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#efe0c8","b":"#ffffff","c":"#6a4a2a"}},"llama":{"r":["................","................","................","...cc.ooo.......","..cccoaaao......","..ccoaaaaao.....",".ccoaaeaaaao....",".ccoaawaaaaao...",".cccoaaaaaaaao..",".cccoaaaaaabbbo.","..ccoaaaaabbbnbo","..cccoaaaaobbbbo","...ccoaaao.oooo.","...ccoaaao......","....coaaao......",".....oooo......."],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","a":"#f2ece0","b":"#ffffff","c":"#d8ccb8"}},"alpaca":{"r":[".....cccccc.....","..oooccccccooo..",".occco....occco.",".ocpcoooooocpco.",".ooaaaaaaaaaaoo.",".oaaaaaaaaaaaao.","oaaaaaaaaaaaaaao","oaaeeaaaaaaeeaao","oaaewaaaaaaewaao","oaaaaaaaaaaaaaao","oaaaaabbbbaaaaao",".oaaabbnnbbaaao.",".oaaabbbbbbaaao.","..oaaabbbbaaao..","...oooaaaaooo...","......oooo......"],"c":{"o":"#1d1b22","e":"#1d1b22","w":"#ffffff","n":"#3a2a2a","p":"#e9a99a","a":"#f4e8d8","b":"#ffffff","c":"#e8dcc8"}}};

/* v239: the hundred girls' portraits (the image generator, seed 42, 832x1216, robes prompt): h = head square 128px, c = full card 400x585. */
window.PORTRAITS=Object.assign(window.PORTRAITS||{},{"angelfish":{"h":"assets/portraits/angelfish.h.webp","c":"assets/portraits/angelfish.c.webp"},"arcticfox":{"h":"assets/portraits/arcticfox.h.webp","c":"assets/portraits/arcticfox.c.webp"},"axolotl":{"h":"assets/portraits/axolotl.h.webp","c":"assets/portraits/axolotl.c.webp"},"badger":{"h":"assets/portraits/badger.h.webp","c":"assets/portraits/badger.c.webp"},"bee":{"h":"assets/portraits/bee.h.webp","c":"assets/portraits/bee.c.webp"},"beetle":{"h":"assets/portraits/beetle.h.webp","c":"assets/portraits/beetle.c.webp"},"beluga":{"h":"assets/portraits/beluga.h.webp","c":"assets/portraits/beluga.c.webp"},"birdofparadise":{"h":"assets/portraits/birdofparadise.h.webp","c":"assets/portraits/birdofparadise.c.webp"},"butterfly":{"h":"assets/portraits/butterfly.h.webp","c":"assets/portraits/butterfly.c.webp"},"caracal":{"h":"assets/portraits/caracal.h.webp","c":"assets/portraits/caracal.c.webp"},"chameleon":{"h":"assets/portraits/chameleon.h.webp","c":"assets/portraits/chameleon.c.webp"},"cheetah":{"h":"assets/portraits/cheetah.h.webp","c":"assets/portraits/cheetah.c.webp"},"cobra":{"h":"assets/portraits/cobra.h.webp","c":"assets/portraits/cobra.c.webp"},"cockatoo":{"h":"assets/portraits/cockatoo.h.webp","c":"assets/portraits/cockatoo.c.webp"},"cougar":{"h":"assets/portraits/cougar.h.webp","c":"assets/portraits/cougar.c.webp"},"coyote":{"h":"assets/portraits/coyote.h.webp","c":"assets/portraits/coyote.c.webp"},"crane":{"h":"assets/portraits/crane.h.webp","c":"assets/portraits/crane.c.webp"},"crocodile":{"h":"assets/portraits/crocodile.h.webp","c":"assets/portraits/crocodile.c.webp"},"crow":{"h":"assets/portraits/crow.h.webp","c":"assets/portraits/crow.c.webp"},"dingo":{"h":"assets/portraits/dingo.h.webp","c":"assets/portraits/dingo.c.webp"},"dolphin":{"h":"assets/portraits/dolphin.h.webp","c":"assets/portraits/dolphin.c.webp"},"dragon":{"h":"assets/portraits/dragon.h.webp","c":"assets/portraits/dragon.c.webp"},"dragonfly":{"h":"assets/portraits/dragonfly.h.webp","c":"assets/portraits/dragonfly.c.webp"},"eagle":{"h":"assets/portraits/eagle.h.webp","c":"assets/portraits/eagle.c.webp"},"eel":{"h":"assets/portraits/eel.h.webp","c":"assets/portraits/eel.c.webp"},"ermine":{"h":"assets/portraits/ermine.h.webp","c":"assets/portraits/ermine.c.webp"},"falcon":{"h":"assets/portraits/falcon.h.webp","c":"assets/portraits/falcon.c.webp"},"fennec":{"h":"assets/portraits/fennec.h.webp","c":"assets/portraits/fennec.c.webp"},"firefly":{"h":"assets/portraits/firefly.h.webp","c":"assets/portraits/firefly.c.webp"},"flamingo":{"h":"assets/portraits/flamingo.h.webp","c":"assets/portraits/flamingo.c.webp"},"fox":{"h":"assets/portraits/fox.h.webp","c":"assets/portraits/fox.c.webp"},"frog":{"h":"assets/portraits/frog.h.webp","c":"assets/portraits/frog.c.webp"},"gecko":{"h":"assets/portraits/gecko.h.webp","c":"assets/portraits/gecko.c.webp"},"griffin":{"h":"assets/portraits/griffin.h.webp","c":"assets/portraits/griffin.c.webp"},"harpseal":{"h":"assets/portraits/harpseal.h.webp","c":"assets/portraits/harpseal.c.webp"},"hawk":{"h":"assets/portraits/hawk.h.webp","c":"assets/portraits/hawk.c.webp"},"hedgehog":{"h":"assets/portraits/hedgehog.h.webp","c":"assets/portraits/hedgehog.c.webp"},"hummingbird":{"h":"assets/portraits/hummingbird.h.webp","c":"assets/portraits/hummingbird.c.webp"},"husky":{"h":"assets/portraits/husky.h.webp","c":"assets/portraits/husky.c.webp"},"hyena":{"h":"assets/portraits/hyena.h.webp","c":"assets/portraits/hyena.c.webp"},"iguana":{"h":"assets/portraits/iguana.h.webp","c":"assets/portraits/iguana.c.webp"},"jackal":{"h":"assets/portraits/jackal.h.webp","c":"assets/portraits/jackal.c.webp"},"jaguar":{"h":"assets/portraits/jaguar.h.webp","c":"assets/portraits/jaguar.c.webp"},"jellyfish":{"h":"assets/portraits/jellyfish.h.webp","c":"assets/portraits/jellyfish.c.webp"},"kingfisher":{"h":"assets/portraits/kingfisher.h.webp","c":"assets/portraits/kingfisher.c.webp"},"kirin":{"h":"assets/portraits/kirin.h.webp","c":"assets/portraits/kirin.c.webp"},"kitsune":{"h":"assets/portraits/kitsune.h.webp","c":"assets/portraits/kitsune.c.webp"},"koala":{"h":"assets/portraits/koala.h.webp","c":"assets/portraits/koala.c.webp"},"koi":{"h":"assets/portraits/koi.h.webp","c":"assets/portraits/koi.c.webp"},"kraken":{"h":"assets/portraits/kraken.h.webp","c":"assets/portraits/kraken.c.webp"},"ladybug":{"h":"assets/portraits/ladybug.h.webp","c":"assets/portraits/ladybug.c.webp"},"leopard":{"h":"assets/portraits/leopard.h.webp","c":"assets/portraits/leopard.c.webp"},"lioness":{"h":"assets/portraits/lioness.h.webp","c":"assets/portraits/lioness.c.webp"},"lovebird":{"h":"assets/portraits/lovebird.h.webp","c":"assets/portraits/lovebird.c.webp"},"lynx":{"h":"assets/portraits/lynx.h.webp","c":"assets/portraits/lynx.c.webp"},"macaw":{"h":"assets/portraits/macaw.h.webp","c":"assets/portraits/macaw.c.webp"},"magpie":{"h":"assets/portraits/magpie.h.webp","c":"assets/portraits/magpie.c.webp"},"manta":{"h":"assets/portraits/manta.h.webp","c":"assets/portraits/manta.c.webp"},"manticore":{"h":"assets/portraits/manticore.h.webp","c":"assets/portraits/manticore.c.webp"},"mantis":{"h":"assets/portraits/mantis.h.webp","c":"assets/portraits/mantis.c.webp"},"moth":{"h":"assets/portraits/moth.h.webp","c":"assets/portraits/moth.c.webp"},"narwhal":{"h":"assets/portraits/narwhal.h.webp","c":"assets/portraits/narwhal.c.webp"},"orca":{"h":"assets/portraits/orca.h.webp","c":"assets/portraits/orca.c.webp"},"osprey":{"h":"assets/portraits/osprey.h.webp","c":"assets/portraits/osprey.c.webp"},"otter":{"h":"assets/portraits/otter.h.webp","c":"assets/portraits/otter.c.webp"},"owl":{"h":"assets/portraits/owl.h.webp","c":"assets/portraits/owl.c.webp"},"panda":{"h":"assets/portraits/panda.h.webp","c":"assets/portraits/panda.c.webp"},"panther":{"h":"assets/portraits/panther.h.webp","c":"assets/portraits/panther.c.webp"},"peacock":{"h":"assets/portraits/peacock.h.webp","c":"assets/portraits/peacock.c.webp"},"pegasus":{"h":"assets/portraits/pegasus.h.webp","c":"assets/portraits/pegasus.c.webp"},"penguin":{"h":"assets/portraits/penguin.h.webp","c":"assets/portraits/penguin.c.webp"},"phoenix":{"h":"assets/portraits/phoenix.h.webp","c":"assets/portraits/phoenix.c.webp"},"polarbear":{"h":"assets/portraits/polarbear.h.webp","c":"assets/portraits/polarbear.c.webp"},"puffin":{"h":"assets/portraits/puffin.h.webp","c":"assets/portraits/puffin.c.webp"},"rabbit":{"h":"assets/portraits/rabbit.h.webp","c":"assets/portraits/rabbit.c.webp"},"raccoon":{"h":"assets/portraits/raccoon.h.webp","c":"assets/portraits/raccoon.c.webp"},"rat":{"h":"assets/portraits/rat.h.webp","c":"assets/portraits/rat.c.webp"},"raven":{"h":"assets/portraits/raven.h.webp","c":"assets/portraits/raven.c.webp"},"redpanda":{"h":"assets/portraits/redpanda.h.webp","c":"assets/portraits/redpanda.c.webp"},"reindeer":{"h":"assets/portraits/reindeer.h.webp","c":"assets/portraits/reindeer.c.webp"},"salmon":{"h":"assets/portraits/salmon.h.webp","c":"assets/portraits/salmon.c.webp"},"scorpion":{"h":"assets/portraits/scorpion.h.webp","c":"assets/portraits/scorpion.c.webp"},"seahorse":{"h":"assets/portraits/seahorse.h.webp","c":"assets/portraits/seahorse.c.webp"},"serpent":{"h":"assets/portraits/serpent.h.webp","c":"assets/portraits/serpent.c.webp"},"serval":{"h":"assets/portraits/serval.h.webp","c":"assets/portraits/serval.c.webp"},"shark":{"h":"assets/portraits/shark.h.webp","c":"assets/portraits/shark.c.webp"},"shiba":{"h":"assets/portraits/shiba.h.webp","c":"assets/portraits/shiba.c.webp"},"siren":{"h":"assets/portraits/siren.h.webp","c":"assets/portraits/siren.c.webp"},"snowyowl":{"h":"assets/portraits/snowyowl.h.webp","c":"assets/portraits/snowyowl.c.webp"},"sphinx":{"h":"assets/portraits/sphinx.h.webp","c":"assets/portraits/sphinx.c.webp"},"spider":{"h":"assets/portraits/spider.h.webp","c":"assets/portraits/spider.c.webp"},"squirrel":{"h":"assets/portraits/squirrel.h.webp","c":"assets/portraits/squirrel.c.webp"},"stag":{"h":"assets/portraits/stag.h.webp","c":"assets/portraits/stag.c.webp"},"swan":{"h":"assets/portraits/swan.h.webp","c":"assets/portraits/swan.c.webp"},"tiger":{"h":"assets/portraits/tiger.h.webp","c":"assets/portraits/tiger.c.webp"},"turtle":{"h":"assets/portraits/turtle.h.webp","c":"assets/portraits/turtle.c.webp"},"unicorn":{"h":"assets/portraits/unicorn.h.webp","c":"assets/portraits/unicorn.c.webp"},"viper":{"h":"assets/portraits/viper.h.webp","c":"assets/portraits/viper.c.webp"},"vulture":{"h":"assets/portraits/vulture.h.webp","c":"assets/portraits/vulture.c.webp"},"wolf":{"h":"assets/portraits/wolf.h.webp","c":"assets/portraits/wolf.c.webp"}});

/* v256b: the Synth and the Void's forty portraits (the image generator, 832x1216, robes prompt), made like the hundred's (por239data.js): h = head square 128px, c = full card 400x585. */
window.PORTRAITS=Object.assign(window.PORTRAITS||{},{"android":{"h":"assets/portraits/android.h.webp","c":"assets/portraits/android.c.webp"},"archive":{"h":"assets/portraits/archive.h.webp","c":"assets/portraits/archive.c.webp"},"aurora":{"h":"assets/portraits/aurora.h.webp","c":"assets/portraits/aurora.c.webp"},"automaton":{"h":"assets/portraits/automaton.h.webp","c":"assets/portraits/automaton.c.webp"},"bloom":{"h":"assets/portraits/bloom.h.webp","c":"assets/portraits/bloom.c.webp"},"cipher":{"h":"assets/portraits/cipher.h.webp","c":"assets/portraits/cipher.c.webp"},"comet":{"h":"assets/portraits/comet.h.webp","c":"assets/portraits/comet.c.webp"},"companion":{"h":"assets/portraits/companion.h.webp","c":"assets/portraits/companion.c.webp"},"cradle":{"h":"assets/portraits/cradle.h.webp","c":"assets/portraits/cradle.c.webp"},"eclipse":{"h":"assets/portraits/eclipse.h.webp","c":"assets/portraits/eclipse.c.webp"},"entropy":{"h":"assets/portraits/entropy.h.webp","c":"assets/portraits/entropy.c.webp"},"glitch":{"h":"assets/portraits/glitch.h.webp","c":"assets/portraits/glitch.c.webp"},"golem":{"h":"assets/portraits/golem.h.webp","c":"assets/portraits/golem.c.webp"},"hollow":{"h":"assets/portraits/hollow.h.webp","c":"assets/portraits/hollow.c.webp"},"hologram":{"h":"assets/portraits/hologram.h.webp","c":"assets/portraits/hologram.c.webp"},"horizon":{"h":"assets/portraits/horizon.h.webp","c":"assets/portraits/horizon.c.webp"},"hush":{"h":"assets/portraits/hush.h.webp","c":"assets/portraits/hush.c.webp"},"lullaby":{"h":"assets/portraits/lullaby.h.webp","c":"assets/portraits/lullaby.c.webp"},"maw":{"h":"assets/portraits/maw.h.webp","c":"assets/portraits/maw.c.webp"},"medic":{"h":"assets/portraits/medic.h.webp","c":"assets/portraits/medic.c.webp"},"muse":{"h":"assets/portraits/muse.h.webp","c":"assets/portraits/muse.c.webp"},"nebula":{"h":"assets/portraits/nebula.h.webp","c":"assets/portraits/nebula.c.webp"},"nereid":{"h":"assets/portraits/nereid.h.webp","c":"assets/portraits/nereid.c.webp"},"nova":{"h":"assets/portraits/nova.h.webp","c":"assets/portraits/nova.c.webp"},"oblivion":{"h":"assets/portraits/oblivion.h.webp","c":"assets/portraits/oblivion.c.webp"},"penumbra":{"h":"assets/portraits/penumbra.h.webp","c":"assets/portraits/penumbra.c.webp"},"prototype":{"h":"assets/portraits/prototype.h.webp","c":"assets/portraits/prototype.c.webp"},"pulsar":{"h":"assets/portraits/pulsar.h.webp","c":"assets/portraits/pulsar.c.webp"},"quasar":{"h":"assets/portraits/quasar.h.webp","c":"assets/portraits/quasar.c.webp"},"rapture":{"h":"assets/portraits/rapture.h.webp","c":"assets/portraits/rapture.c.webp"},"seraph":{"h":"assets/portraits/seraph.h.webp","c":"assets/portraits/seraph.c.webp"},"singularity":{"h":"assets/portraits/singularity.h.webp","c":"assets/portraits/singularity.c.webp"},"sovereign":{"h":"assets/portraits/sovereign.h.webp","c":"assets/portraits/sovereign.c.webp"},"stardust":{"h":"assets/portraits/stardust.h.webp","c":"assets/portraits/stardust.c.webp"},"titan":{"h":"assets/portraits/titan.h.webp","c":"assets/portraits/titan.c.webp"},"umbra":{"h":"assets/portraits/umbra.h.webp","c":"assets/portraits/umbra.c.webp"},"valkyrie":{"h":"assets/portraits/valkyrie.h.webp","c":"assets/portraits/valkyrie.c.webp"},"vector":{"h":"assets/portraits/vector.h.webp","c":"assets/portraits/vector.c.webp"},"voyager":{"h":"assets/portraits/voyager.h.webp","c":"assets/portraits/voyager.c.webp"},"wraith":{"h":"assets/portraits/wraith.h.webp","c":"assets/portraits/wraith.c.webp"}});
/* v265: the boys' portraits (140, the image generator, 832x1216, House robes prompts of v263), keyed <house>man like the hundred-and-forty girls'
   (por239data.js, por256data.js): h = head square 128px, c = full card 400x585. */
window.PORTRAITS=Object.assign(window.PORTRAITS||{},{"androidman":{"h":"assets/portraits/androidman.h.webp","c":"assets/portraits/androidman.c.webp"},"angelfishman":{"h":"assets/portraits/angelfishman.h.webp","c":"assets/portraits/angelfishman.c.webp"},"archiveman":{"h":"assets/portraits/archiveman.h.webp","c":"assets/portraits/archiveman.c.webp"},"arcticfoxman":{"h":"assets/portraits/arcticfoxman.h.webp","c":"assets/portraits/arcticfoxman.c.webp"},"auroraman":{"h":"assets/portraits/auroraman.h.webp","c":"assets/portraits/auroraman.c.webp"},"automatonman":{"h":"assets/portraits/automatonman.h.webp","c":"assets/portraits/automatonman.c.webp"},"axolotlman":{"h":"assets/portraits/axolotlman.h.webp","c":"assets/portraits/axolotlman.c.webp"},"badgerman":{"h":"assets/portraits/badgerman.h.webp","c":"assets/portraits/badgerman.c.webp"},"beeman":{"h":"assets/portraits/beeman.h.webp","c":"assets/portraits/beeman.c.webp"},"beetleman":{"h":"assets/portraits/beetleman.h.webp","c":"assets/portraits/beetleman.c.webp"},"belugaman":{"h":"assets/portraits/belugaman.h.webp","c":"assets/portraits/belugaman.c.webp"},"birdofparadiseman":{"h":"assets/portraits/birdofparadiseman.h.webp","c":"assets/portraits/birdofparadiseman.c.webp"},"bloomman":{"h":"assets/portraits/bloomman.h.webp","c":"assets/portraits/bloomman.c.webp"},"butterflyman":{"h":"assets/portraits/butterflyman.h.webp","c":"assets/portraits/butterflyman.c.webp"},"caracalman":{"h":"assets/portraits/caracalman.h.webp","c":"assets/portraits/caracalman.c.webp"},"chameleonman":{"h":"assets/portraits/chameleonman.h.webp","c":"assets/portraits/chameleonman.c.webp"},"cheetahman":{"h":"assets/portraits/cheetahman.h.webp","c":"assets/portraits/cheetahman.c.webp"},"cipherman":{"h":"assets/portraits/cipherman.h.webp","c":"assets/portraits/cipherman.c.webp"},"cobraman":{"h":"assets/portraits/cobraman.h.webp","c":"assets/portraits/cobraman.c.webp"},"cockatooman":{"h":"assets/portraits/cockatooman.h.webp","c":"assets/portraits/cockatooman.c.webp"},"cometman":{"h":"assets/portraits/cometman.h.webp","c":"assets/portraits/cometman.c.webp"},"companionman":{"h":"assets/portraits/companionman.h.webp","c":"assets/portraits/companionman.c.webp"},"cougarman":{"h":"assets/portraits/cougarman.h.webp","c":"assets/portraits/cougarman.c.webp"},"coyoteman":{"h":"assets/portraits/coyoteman.h.webp","c":"assets/portraits/coyoteman.c.webp"},"cradleman":{"h":"assets/portraits/cradleman.h.webp","c":"assets/portraits/cradleman.c.webp"},"craneman":{"h":"assets/portraits/craneman.h.webp","c":"assets/portraits/craneman.c.webp"},"crocodileman":{"h":"assets/portraits/crocodileman.h.webp","c":"assets/portraits/crocodileman.c.webp"},"crowman":{"h":"assets/portraits/crowman.h.webp","c":"assets/portraits/crowman.c.webp"},"dingoman":{"h":"assets/portraits/dingoman.h.webp","c":"assets/portraits/dingoman.c.webp"},"dolphinman":{"h":"assets/portraits/dolphinman.h.webp","c":"assets/portraits/dolphinman.c.webp"},"dragonflyman":{"h":"assets/portraits/dragonflyman.h.webp","c":"assets/portraits/dragonflyman.c.webp"},"dragonman":{"h":"assets/portraits/dragonman.h.webp","c":"assets/portraits/dragonman.c.webp"},"eagleman":{"h":"assets/portraits/eagleman.h.webp","c":"assets/portraits/eagleman.c.webp"},"eclipseman":{"h":"assets/portraits/eclipseman.h.webp","c":"assets/portraits/eclipseman.c.webp"},"eelman":{"h":"assets/portraits/eelman.h.webp","c":"assets/portraits/eelman.c.webp"},"entropyman":{"h":"assets/portraits/entropyman.h.webp","c":"assets/portraits/entropyman.c.webp"},"ermineman":{"h":"assets/portraits/ermineman.h.webp","c":"assets/portraits/ermineman.c.webp"},"falconman":{"h":"assets/portraits/falconman.h.webp","c":"assets/portraits/falconman.c.webp"},"fennecman":{"h":"assets/portraits/fennecman.h.webp","c":"assets/portraits/fennecman.c.webp"},"fireflyman":{"h":"assets/portraits/fireflyman.h.webp","c":"assets/portraits/fireflyman.c.webp"},"flamingoman":{"h":"assets/portraits/flamingoman.h.webp","c":"assets/portraits/flamingoman.c.webp"},"foxman":{"h":"assets/portraits/foxman.h.webp","c":"assets/portraits/foxman.c.webp"},"frogman":{"h":"assets/portraits/frogman.h.webp","c":"assets/portraits/frogman.c.webp"},"geckoman":{"h":"assets/portraits/geckoman.h.webp","c":"assets/portraits/geckoman.c.webp"},"glitchman":{"h":"assets/portraits/glitchman.h.webp","c":"assets/portraits/glitchman.c.webp"},"golemman":{"h":"assets/portraits/golemman.h.webp","c":"assets/portraits/golemman.c.webp"},"griffinman":{"h":"assets/portraits/griffinman.h.webp","c":"assets/portraits/griffinman.c.webp"},"harpsealman":{"h":"assets/portraits/harpsealman.h.webp","c":"assets/portraits/harpsealman.c.webp"},"hawkman":{"h":"assets/portraits/hawkman.h.webp","c":"assets/portraits/hawkman.c.webp"},"hedgehogman":{"h":"assets/portraits/hedgehogman.h.webp","c":"assets/portraits/hedgehogman.c.webp"},"hollowman":{"h":"assets/portraits/hollowman.h.webp","c":"assets/portraits/hollowman.c.webp"},"hologramman":{"h":"assets/portraits/hologramman.h.webp","c":"assets/portraits/hologramman.c.webp"},"horizonman":{"h":"assets/portraits/horizonman.h.webp","c":"assets/portraits/horizonman.c.webp"},"hummingbirdman":{"h":"assets/portraits/hummingbirdman.h.webp","c":"assets/portraits/hummingbirdman.c.webp"},"hushman":{"h":"assets/portraits/hushman.h.webp","c":"assets/portraits/hushman.c.webp"},"huskyman":{"h":"assets/portraits/huskyman.h.webp","c":"assets/portraits/huskyman.c.webp"},"hyenaman":{"h":"assets/portraits/hyenaman.h.webp","c":"assets/portraits/hyenaman.c.webp"},"iguanaman":{"h":"assets/portraits/iguanaman.h.webp","c":"assets/portraits/iguanaman.c.webp"},"jackalman":{"h":"assets/portraits/jackalman.h.webp","c":"assets/portraits/jackalman.c.webp"},"jaguarman":{"h":"assets/portraits/jaguarman.h.webp","c":"assets/portraits/jaguarman.c.webp"},"jellyfishman":{"h":"assets/portraits/jellyfishman.h.webp","c":"assets/portraits/jellyfishman.c.webp"},"kingfisherman":{"h":"assets/portraits/kingfisherman.h.webp","c":"assets/portraits/kingfisherman.c.webp"},"kirinman":{"h":"assets/portraits/kirinman.h.webp","c":"assets/portraits/kirinman.c.webp"},"kitsuneman":{"h":"assets/portraits/kitsuneman.h.webp","c":"assets/portraits/kitsuneman.c.webp"},"koalaman":{"h":"assets/portraits/koalaman.h.webp","c":"assets/portraits/koalaman.c.webp"},"koiman":{"h":"assets/portraits/koiman.h.webp","c":"assets/portraits/koiman.c.webp"},"krakenman":{"h":"assets/portraits/krakenman.h.webp","c":"assets/portraits/krakenman.c.webp"},"ladybugman":{"h":"assets/portraits/ladybugman.h.webp","c":"assets/portraits/ladybugman.c.webp"},"leopardman":{"h":"assets/portraits/leopardman.h.webp","c":"assets/portraits/leopardman.c.webp"},"lionessman":{"h":"assets/portraits/lionessman.h.webp","c":"assets/portraits/lionessman.c.webp"},"lovebirdman":{"h":"assets/portraits/lovebirdman.h.webp","c":"assets/portraits/lovebirdman.c.webp"},"lullabyman":{"h":"assets/portraits/lullabyman.h.webp","c":"assets/portraits/lullabyman.c.webp"},"lynxman":{"h":"assets/portraits/lynxman.h.webp","c":"assets/portraits/lynxman.c.webp"},"macawman":{"h":"assets/portraits/macawman.h.webp","c":"assets/portraits/macawman.c.webp"},"magpieman":{"h":"assets/portraits/magpieman.h.webp","c":"assets/portraits/magpieman.c.webp"},"mantaman":{"h":"assets/portraits/mantaman.h.webp","c":"assets/portraits/mantaman.c.webp"},"manticoreman":{"h":"assets/portraits/manticoreman.h.webp","c":"assets/portraits/manticoreman.c.webp"},"mantisman":{"h":"assets/portraits/mantisman.h.webp","c":"assets/portraits/mantisman.c.webp"},"mawman":{"h":"assets/portraits/mawman.h.webp","c":"assets/portraits/mawman.c.webp"},"medicman":{"h":"assets/portraits/medicman.h.webp","c":"assets/portraits/medicman.c.webp"},"mothman":{"h":"assets/portraits/mothman.h.webp","c":"assets/portraits/mothman.c.webp"},"museman":{"h":"assets/portraits/museman.h.webp","c":"assets/portraits/museman.c.webp"},"narwhalman":{"h":"assets/portraits/narwhalman.h.webp","c":"assets/portraits/narwhalman.c.webp"},"nebulaman":{"h":"assets/portraits/nebulaman.h.webp","c":"assets/portraits/nebulaman.c.webp"},"nereidman":{"h":"assets/portraits/nereidman.h.webp","c":"assets/portraits/nereidman.c.webp"},"novaman":{"h":"assets/portraits/novaman.h.webp","c":"assets/portraits/novaman.c.webp"},"oblivionman":{"h":"assets/portraits/oblivionman.h.webp","c":"assets/portraits/oblivionman.c.webp"},"orcaman":{"h":"assets/portraits/orcaman.h.webp","c":"assets/portraits/orcaman.c.webp"},"ospreyman":{"h":"assets/portraits/ospreyman.h.webp","c":"assets/portraits/ospreyman.c.webp"},"otterman":{"h":"assets/portraits/otterman.h.webp","c":"assets/portraits/otterman.c.webp"},"owlman":{"h":"assets/portraits/owlman.h.webp","c":"assets/portraits/owlman.c.webp"},"pandaman":{"h":"assets/portraits/pandaman.h.webp","c":"assets/portraits/pandaman.c.webp"},"pantherman":{"h":"assets/portraits/pantherman.h.webp","c":"assets/portraits/pantherman.c.webp"},"peacockman":{"h":"assets/portraits/peacockman.h.webp","c":"assets/portraits/peacockman.c.webp"},"pegasusman":{"h":"assets/portraits/pegasusman.h.webp","c":"assets/portraits/pegasusman.c.webp"},"penguinman":{"h":"assets/portraits/penguinman.h.webp","c":"assets/portraits/penguinman.c.webp"},"penumbraman":{"h":"assets/portraits/penumbraman.h.webp","c":"assets/portraits/penumbraman.c.webp"},"phoenixman":{"h":"assets/portraits/phoenixman.h.webp","c":"assets/portraits/phoenixman.c.webp"},"polarbearman":{"h":"assets/portraits/polarbearman.h.webp","c":"assets/portraits/polarbearman.c.webp"},"prototypeman":{"h":"assets/portraits/prototypeman.h.webp","c":"assets/portraits/prototypeman.c.webp"},"puffinman":{"h":"assets/portraits/puffinman.h.webp","c":"assets/portraits/puffinman.c.webp"},"pulsarman":{"h":"assets/portraits/pulsarman.h.webp","c":"assets/portraits/pulsarman.c.webp"},"quasarman":{"h":"assets/portraits/quasarman.h.webp","c":"assets/portraits/quasarman.c.webp"},"rabbitman":{"h":"assets/portraits/rabbitman.h.webp","c":"assets/portraits/rabbitman.c.webp"},"raccoonman":{"h":"assets/portraits/raccoonman.h.webp","c":"assets/portraits/raccoonman.c.webp"},"raptureman":{"h":"assets/portraits/raptureman.h.webp","c":"assets/portraits/raptureman.c.webp"},"ratman":{"h":"assets/portraits/ratman.h.webp","c":"assets/portraits/ratman.c.webp"},"ravenman":{"h":"assets/portraits/ravenman.h.webp","c":"assets/portraits/ravenman.c.webp"},"redpandaman":{"h":"assets/portraits/redpandaman.h.webp","c":"assets/portraits/redpandaman.c.webp"},"reindeerman":{"h":"assets/portraits/reindeerman.h.webp","c":"assets/portraits/reindeerman.c.webp"},"salmonman":{"h":"assets/portraits/salmonman.h.webp","c":"assets/portraits/salmonman.c.webp"},"scorpionman":{"h":"assets/portraits/scorpionman.h.webp","c":"assets/portraits/scorpionman.c.webp"},"seahorseman":{"h":"assets/portraits/seahorseman.h.webp","c":"assets/portraits/seahorseman.c.webp"},"seraphman":{"h":"assets/portraits/seraphman.h.webp","c":"assets/portraits/seraphman.c.webp"},"serpentman":{"h":"assets/portraits/serpentman.h.webp","c":"assets/portraits/serpentman.c.webp"},"servalman":{"h":"assets/portraits/servalman.h.webp","c":"assets/portraits/servalman.c.webp"},"sharkman":{"h":"assets/portraits/sharkman.h.webp","c":"assets/portraits/sharkman.c.webp"},"shibaman":{"h":"assets/portraits/shibaman.h.webp","c":"assets/portraits/shibaman.c.webp"},"singularityman":{"h":"assets/portraits/singularityman.h.webp","c":"assets/portraits/singularityman.c.webp"},"sirenman":{"h":"assets/portraits/sirenman.h.webp","c":"assets/portraits/sirenman.c.webp"},"snowyowlman":{"h":"assets/portraits/snowyowlman.h.webp","c":"assets/portraits/snowyowlman.c.webp"},"sovereignman":{"h":"assets/portraits/sovereignman.h.webp","c":"assets/portraits/sovereignman.c.webp"},"sphinxman":{"h":"assets/portraits/sphinxman.h.webp","c":"assets/portraits/sphinxman.c.webp"},"spiderman":{"h":"assets/portraits/spiderman.h.webp","c":"assets/portraits/spiderman.c.webp"},"squirrelman":{"h":"assets/portraits/squirrelman.h.webp","c":"assets/portraits/squirrelman.c.webp"},"stagman":{"h":"assets/portraits/stagman.h.webp","c":"assets/portraits/stagman.c.webp"},"stardustman":{"h":"assets/portraits/stardustman.h.webp","c":"assets/portraits/stardustman.c.webp"},"swanman":{"h":"assets/portraits/swanman.h.webp","c":"assets/portraits/swanman.c.webp"},"tigerman":{"h":"assets/portraits/tigerman.h.webp","c":"assets/portraits/tigerman.c.webp"},"titanman":{"h":"assets/portraits/titanman.h.webp","c":"assets/portraits/titanman.c.webp"},"turtleman":{"h":"assets/portraits/turtleman.h.webp","c":"assets/portraits/turtleman.c.webp"},"umbraman":{"h":"assets/portraits/umbraman.h.webp","c":"assets/portraits/umbraman.c.webp"},"unicornman":{"h":"assets/portraits/unicornman.h.webp","c":"assets/portraits/unicornman.c.webp"},"valkyrieman":{"h":"assets/portraits/valkyrieman.h.webp","c":"assets/portraits/valkyrieman.c.webp"},"vectorman":{"h":"assets/portraits/vectorman.h.webp","c":"assets/portraits/vectorman.c.webp"},"viperman":{"h":"assets/portraits/viperman.h.webp","c":"assets/portraits/viperman.c.webp"},"voyagerman":{"h":"assets/portraits/voyagerman.h.webp","c":"assets/portraits/voyagerman.c.webp"},"vultureman":{"h":"assets/portraits/vultureman.h.webp","c":"assets/portraits/vultureman.c.webp"},"wolfman":{"h":"assets/portraits/wolfman.h.webp","c":"assets/portraits/wolfman.c.webp"},"wraithman":{"h":"assets/portraits/wraithman.h.webp","c":"assets/portraits/wraithman.c.webp"}});
/* v269: the headmistresses' portraits (140, the image generator, 832x1216, faculty robes prompts of v263), keyed <house>head: h = head square 128px, c = full card 400x585. */
window.PORTRAITS=Object.assign(window.PORTRAITS||{},{"androidhead":{"h":"assets/portraits/androidhead.h.webp","c":"assets/portraits/androidhead.c.webp"},"angelfishhead":{"h":"assets/portraits/angelfishhead.h.webp","c":"assets/portraits/angelfishhead.c.webp"},"archivehead":{"h":"assets/portraits/archivehead.h.webp","c":"assets/portraits/archivehead.c.webp"},"arcticfoxhead":{"h":"assets/portraits/arcticfoxhead.h.webp","c":"assets/portraits/arcticfoxhead.c.webp"},"aurorahead":{"h":"assets/portraits/aurorahead.h.webp","c":"assets/portraits/aurorahead.c.webp"},"automatonhead":{"h":"assets/portraits/automatonhead.h.webp","c":"assets/portraits/automatonhead.c.webp"},"axolotlhead":{"h":"assets/portraits/axolotlhead.h.webp","c":"assets/portraits/axolotlhead.c.webp"},"badgerhead":{"h":"assets/portraits/badgerhead.h.webp","c":"assets/portraits/badgerhead.c.webp"},"beehead":{"h":"assets/portraits/beehead.h.webp","c":"assets/portraits/beehead.c.webp"},"beetlehead":{"h":"assets/portraits/beetlehead.h.webp","c":"assets/portraits/beetlehead.c.webp"},"belugahead":{"h":"assets/portraits/belugahead.h.webp","c":"assets/portraits/belugahead.c.webp"},"birdofparadisehead":{"h":"assets/portraits/birdofparadisehead.h.webp","c":"assets/portraits/birdofparadisehead.c.webp"},"bloomhead":{"h":"assets/portraits/bloomhead.h.webp","c":"assets/portraits/bloomhead.c.webp"},"butterflyhead":{"h":"assets/portraits/butterflyhead.h.webp","c":"assets/portraits/butterflyhead.c.webp"},"caracalhead":{"h":"assets/portraits/caracalhead.h.webp","c":"assets/portraits/caracalhead.c.webp"},"chameleonhead":{"h":"assets/portraits/chameleonhead.h.webp","c":"assets/portraits/chameleonhead.c.webp"},"cheetahhead":{"h":"assets/portraits/cheetahhead.h.webp","c":"assets/portraits/cheetahhead.c.webp"},"cipherhead":{"h":"assets/portraits/cipherhead.h.webp","c":"assets/portraits/cipherhead.c.webp"},"cobrahead":{"h":"assets/portraits/cobrahead.h.webp","c":"assets/portraits/cobrahead.c.webp"},"cockatoohead":{"h":"assets/portraits/cockatoohead.h.webp","c":"assets/portraits/cockatoohead.c.webp"},"comethead":{"h":"assets/portraits/comethead.h.webp","c":"assets/portraits/comethead.c.webp"},"companionhead":{"h":"assets/portraits/companionhead.h.webp","c":"assets/portraits/companionhead.c.webp"},"cougarhead":{"h":"assets/portraits/cougarhead.h.webp","c":"assets/portraits/cougarhead.c.webp"},"coyotehead":{"h":"assets/portraits/coyotehead.h.webp","c":"assets/portraits/coyotehead.c.webp"},"cradlehead":{"h":"assets/portraits/cradlehead.h.webp","c":"assets/portraits/cradlehead.c.webp"},"cranehead":{"h":"assets/portraits/cranehead.h.webp","c":"assets/portraits/cranehead.c.webp"},"crocodilehead":{"h":"assets/portraits/crocodilehead.h.webp","c":"assets/portraits/crocodilehead.c.webp"},"crowhead":{"h":"assets/portraits/crowhead.h.webp","c":"assets/portraits/crowhead.c.webp"},"dingohead":{"h":"assets/portraits/dingohead.h.webp","c":"assets/portraits/dingohead.c.webp"},"dolphinhead":{"h":"assets/portraits/dolphinhead.h.webp","c":"assets/portraits/dolphinhead.c.webp"},"dragonflyhead":{"h":"assets/portraits/dragonflyhead.h.webp","c":"assets/portraits/dragonflyhead.c.webp"},"dragonhead":{"h":"assets/portraits/dragonhead.h.webp","c":"assets/portraits/dragonhead.c.webp"},"eaglehead":{"h":"assets/portraits/eaglehead.h.webp","c":"assets/portraits/eaglehead.c.webp"},"eclipsehead":{"h":"assets/portraits/eclipsehead.h.webp","c":"assets/portraits/eclipsehead.c.webp"},"eelhead":{"h":"assets/portraits/eelhead.h.webp","c":"assets/portraits/eelhead.c.webp"},"entropyhead":{"h":"assets/portraits/entropyhead.h.webp","c":"assets/portraits/entropyhead.c.webp"},"erminehead":{"h":"assets/portraits/erminehead.h.webp","c":"assets/portraits/erminehead.c.webp"},"falconhead":{"h":"assets/portraits/falconhead.h.webp","c":"assets/portraits/falconhead.c.webp"},"fennechead":{"h":"assets/portraits/fennechead.h.webp","c":"assets/portraits/fennechead.c.webp"},"fireflyhead":{"h":"assets/portraits/fireflyhead.h.webp","c":"assets/portraits/fireflyhead.c.webp"},"flamingohead":{"h":"assets/portraits/flamingohead.h.webp","c":"assets/portraits/flamingohead.c.webp"},"foxhead":{"h":"assets/portraits/foxhead.h.webp","c":"assets/portraits/foxhead.c.webp"},"froghead":{"h":"assets/portraits/froghead.h.webp","c":"assets/portraits/froghead.c.webp"},"geckohead":{"h":"assets/portraits/geckohead.h.webp","c":"assets/portraits/geckohead.c.webp"},"glitchhead":{"h":"assets/portraits/glitchhead.h.webp","c":"assets/portraits/glitchhead.c.webp"},"golemhead":{"h":"assets/portraits/golemhead.h.webp","c":"assets/portraits/golemhead.c.webp"},"griffinhead":{"h":"assets/portraits/griffinhead.h.webp","c":"assets/portraits/griffinhead.c.webp"},"harpsealhead":{"h":"assets/portraits/harpsealhead.h.webp","c":"assets/portraits/harpsealhead.c.webp"},"hawkhead":{"h":"assets/portraits/hawkhead.h.webp","c":"assets/portraits/hawkhead.c.webp"},"hedgehoghead":{"h":"assets/portraits/hedgehoghead.h.webp","c":"assets/portraits/hedgehoghead.c.webp"},"hollowhead":{"h":"assets/portraits/hollowhead.h.webp","c":"assets/portraits/hollowhead.c.webp"},"hologramhead":{"h":"assets/portraits/hologramhead.h.webp","c":"assets/portraits/hologramhead.c.webp"},"horizonhead":{"h":"assets/portraits/horizonhead.h.webp","c":"assets/portraits/horizonhead.c.webp"},"hummingbirdhead":{"h":"assets/portraits/hummingbirdhead.h.webp","c":"assets/portraits/hummingbirdhead.c.webp"},"hushhead":{"h":"assets/portraits/hushhead.h.webp","c":"assets/portraits/hushhead.c.webp"},"huskyhead":{"h":"assets/portraits/huskyhead.h.webp","c":"assets/portraits/huskyhead.c.webp"},"hyenahead":{"h":"assets/portraits/hyenahead.h.webp","c":"assets/portraits/hyenahead.c.webp"},"iguanahead":{"h":"assets/portraits/iguanahead.h.webp","c":"assets/portraits/iguanahead.c.webp"},"jackalhead":{"h":"assets/portraits/jackalhead.h.webp","c":"assets/portraits/jackalhead.c.webp"},"jaguarhead":{"h":"assets/portraits/jaguarhead.h.webp","c":"assets/portraits/jaguarhead.c.webp"},"jellyfishhead":{"h":"assets/portraits/jellyfishhead.h.webp","c":"assets/portraits/jellyfishhead.c.webp"},"kingfisherhead":{"h":"assets/portraits/kingfisherhead.h.webp","c":"assets/portraits/kingfisherhead.c.webp"},"kirinhead":{"h":"assets/portraits/kirinhead.h.webp","c":"assets/portraits/kirinhead.c.webp"},"kitsunehead":{"h":"assets/portraits/kitsunehead.h.webp","c":"assets/portraits/kitsunehead.c.webp"},"koalahead":{"h":"assets/portraits/koalahead.h.webp","c":"assets/portraits/koalahead.c.webp"},"koihead":{"h":"assets/portraits/koihead.h.webp","c":"assets/portraits/koihead.c.webp"},"krakenhead":{"h":"assets/portraits/krakenhead.h.webp","c":"assets/portraits/krakenhead.c.webp"},"ladybughead":{"h":"assets/portraits/ladybughead.h.webp","c":"assets/portraits/ladybughead.c.webp"},"leopardhead":{"h":"assets/portraits/leopardhead.h.webp","c":"assets/portraits/leopardhead.c.webp"},"lionesshead":{"h":"assets/portraits/lionesshead.h.webp","c":"assets/portraits/lionesshead.c.webp"},"lovebirdhead":{"h":"assets/portraits/lovebirdhead.h.webp","c":"assets/portraits/lovebirdhead.c.webp"},"lullabyhead":{"h":"assets/portraits/lullabyhead.h.webp","c":"assets/portraits/lullabyhead.c.webp"},"lynxhead":{"h":"assets/portraits/lynxhead.h.webp","c":"assets/portraits/lynxhead.c.webp"},"macawhead":{"h":"assets/portraits/macawhead.h.webp","c":"assets/portraits/macawhead.c.webp"},"magpiehead":{"h":"assets/portraits/magpiehead.h.webp","c":"assets/portraits/magpiehead.c.webp"},"mantahead":{"h":"assets/portraits/mantahead.h.webp","c":"assets/portraits/mantahead.c.webp"},"manticorehead":{"h":"assets/portraits/manticorehead.h.webp","c":"assets/portraits/manticorehead.c.webp"},"mantishead":{"h":"assets/portraits/mantishead.h.webp","c":"assets/portraits/mantishead.c.webp"},"mawhead":{"h":"assets/portraits/mawhead.h.webp","c":"assets/portraits/mawhead.c.webp"},"medichead":{"h":"assets/portraits/medichead.h.webp","c":"assets/portraits/medichead.c.webp"},"mothhead":{"h":"assets/portraits/mothhead.h.webp","c":"assets/portraits/mothhead.c.webp"},"musehead":{"h":"assets/portraits/musehead.h.webp","c":"assets/portraits/musehead.c.webp"},"narwhalhead":{"h":"assets/portraits/narwhalhead.h.webp","c":"assets/portraits/narwhalhead.c.webp"},"nebulahead":{"h":"assets/portraits/nebulahead.h.webp","c":"assets/portraits/nebulahead.c.webp"},"nereidhead":{"h":"assets/portraits/nereidhead.h.webp","c":"assets/portraits/nereidhead.c.webp"},"novahead":{"h":"assets/portraits/novahead.h.webp","c":"assets/portraits/novahead.c.webp"},"oblivionhead":{"h":"assets/portraits/oblivionhead.h.webp","c":"assets/portraits/oblivionhead.c.webp"},"orcahead":{"h":"assets/portraits/orcahead.h.webp","c":"assets/portraits/orcahead.c.webp"},"ospreyhead":{"h":"assets/portraits/ospreyhead.h.webp","c":"assets/portraits/ospreyhead.c.webp"},"otterhead":{"h":"assets/portraits/otterhead.h.webp","c":"assets/portraits/otterhead.c.webp"},"owlhead":{"h":"assets/portraits/owlhead.h.webp","c":"assets/portraits/owlhead.c.webp"},"pandahead":{"h":"assets/portraits/pandahead.h.webp","c":"assets/portraits/pandahead.c.webp"},"pantherhead":{"h":"assets/portraits/pantherhead.h.webp","c":"assets/portraits/pantherhead.c.webp"},"peacockhead":{"h":"assets/portraits/peacockhead.h.webp","c":"assets/portraits/peacockhead.c.webp"},"pegasushead":{"h":"assets/portraits/pegasushead.h.webp","c":"assets/portraits/pegasushead.c.webp"},"penguinhead":{"h":"assets/portraits/penguinhead.h.webp","c":"assets/portraits/penguinhead.c.webp"},"penumbrahead":{"h":"assets/portraits/penumbrahead.h.webp","c":"assets/portraits/penumbrahead.c.webp"},"phoenixhead":{"h":"assets/portraits/phoenixhead.h.webp","c":"assets/portraits/phoenixhead.c.webp"},"polarbearhead":{"h":"assets/portraits/polarbearhead.h.webp","c":"assets/portraits/polarbearhead.c.webp"},"prototypehead":{"h":"assets/portraits/prototypehead.h.webp","c":"assets/portraits/prototypehead.c.webp"},"puffinhead":{"h":"assets/portraits/puffinhead.h.webp","c":"assets/portraits/puffinhead.c.webp"},"pulsarhead":{"h":"assets/portraits/pulsarhead.h.webp","c":"assets/portraits/pulsarhead.c.webp"},"quasarhead":{"h":"assets/portraits/quasarhead.h.webp","c":"assets/portraits/quasarhead.c.webp"},"rabbithead":{"h":"assets/portraits/rabbithead.h.webp","c":"assets/portraits/rabbithead.c.webp"},"raccoonhead":{"h":"assets/portraits/raccoonhead.h.webp","c":"assets/portraits/raccoonhead.c.webp"},"rapturehead":{"h":"assets/portraits/rapturehead.h.webp","c":"assets/portraits/rapturehead.c.webp"},"rathead":{"h":"assets/portraits/rathead.h.webp","c":"assets/portraits/rathead.c.webp"},"ravenhead":{"h":"assets/portraits/ravenhead.h.webp","c":"assets/portraits/ravenhead.c.webp"},"redpandahead":{"h":"assets/portraits/redpandahead.h.webp","c":"assets/portraits/redpandahead.c.webp"},"reindeerhead":{"h":"assets/portraits/reindeerhead.h.webp","c":"assets/portraits/reindeerhead.c.webp"},"salmonhead":{"h":"assets/portraits/salmonhead.h.webp","c":"assets/portraits/salmonhead.c.webp"},"scorpionhead":{"h":"assets/portraits/scorpionhead.h.webp","c":"assets/portraits/scorpionhead.c.webp"},"seahorsehead":{"h":"assets/portraits/seahorsehead.h.webp","c":"assets/portraits/seahorsehead.c.webp"},"seraphhead":{"h":"assets/portraits/seraphhead.h.webp","c":"assets/portraits/seraphhead.c.webp"},"serpenthead":{"h":"assets/portraits/serpenthead.h.webp","c":"assets/portraits/serpenthead.c.webp"},"servalhead":{"h":"assets/portraits/servalhead.h.webp","c":"assets/portraits/servalhead.c.webp"},"sharkhead":{"h":"assets/portraits/sharkhead.h.webp","c":"assets/portraits/sharkhead.c.webp"},"shibahead":{"h":"assets/portraits/shibahead.h.webp","c":"assets/portraits/shibahead.c.webp"},"singularityhead":{"h":"assets/portraits/singularityhead.h.webp","c":"assets/portraits/singularityhead.c.webp"},"sirenhead":{"h":"assets/portraits/sirenhead.h.webp","c":"assets/portraits/sirenhead.c.webp"},"snowyowlhead":{"h":"assets/portraits/snowyowlhead.h.webp","c":"assets/portraits/snowyowlhead.c.webp"},"sovereignhead":{"h":"assets/portraits/sovereignhead.h.webp","c":"assets/portraits/sovereignhead.c.webp"},"sphinxhead":{"h":"assets/portraits/sphinxhead.h.webp","c":"assets/portraits/sphinxhead.c.webp"},"spiderhead":{"h":"assets/portraits/spiderhead.h.webp","c":"assets/portraits/spiderhead.c.webp"},"squirrelhead":{"h":"assets/portraits/squirrelhead.h.webp","c":"assets/portraits/squirrelhead.c.webp"},"staghead":{"h":"assets/portraits/staghead.h.webp","c":"assets/portraits/staghead.c.webp"},"stardusthead":{"h":"assets/portraits/stardusthead.h.webp","c":"assets/portraits/stardusthead.c.webp"},"swanhead":{"h":"assets/portraits/swanhead.h.webp","c":"assets/portraits/swanhead.c.webp"},"tigerhead":{"h":"assets/portraits/tigerhead.h.webp","c":"assets/portraits/tigerhead.c.webp"},"titanhead":{"h":"assets/portraits/titanhead.h.webp","c":"assets/portraits/titanhead.c.webp"},"turtlehead":{"h":"assets/portraits/turtlehead.h.webp","c":"assets/portraits/turtlehead.c.webp"},"umbrahead":{"h":"assets/portraits/umbrahead.h.webp","c":"assets/portraits/umbrahead.c.webp"},"unicornhead":{"h":"assets/portraits/unicornhead.h.webp","c":"assets/portraits/unicornhead.c.webp"},"valkyriehead":{"h":"assets/portraits/valkyriehead.h.webp","c":"assets/portraits/valkyriehead.c.webp"},"vectorhead":{"h":"assets/portraits/vectorhead.h.webp","c":"assets/portraits/vectorhead.c.webp"},"viperhead":{"h":"assets/portraits/viperhead.h.webp","c":"assets/portraits/viperhead.c.webp"},"voyagerhead":{"h":"assets/portraits/voyagerhead.h.webp","c":"assets/portraits/voyagerhead.c.webp"},"vulturehead":{"h":"assets/portraits/vulturehead.h.webp","c":"assets/portraits/vulturehead.c.webp"},"wolfhead":{"h":"assets/portraits/wolfhead.h.webp","c":"assets/portraits/wolfhead.c.webp"},"wraithhead":{"h":"assets/portraits/wraithhead.h.webp","c":"assets/portraits/wraithhead.c.webp"}});
/* ---- v243: new girls made canon (canon layer add.girls), and new images for any girl (edits.images).
   For each new girl this makes what a House has: her robes design (her look, framed like her groupmates' robes), her
   boyfriend and headmistress (her own looks if the admin gave them, otherwise drafts on a groupmate's), her House details
   for the Scene Archive's general scenes (room, bathroom, outdoor spot, title, what she calls herself, pet name,
   accent light), her place in Starting points, her portrait and pixel art, and, when she woke a sleeping House, that House
   awake on the Roll. Runs in the tail, after every wave's templates and before the art switch reads the portraits.
   add.girls[h]: {name, group, role, bio, adult, look:{pal,c,outfit}, place:{kind:"group"|"wake", lost, house},
     det:{room,bath,out,pride,role,pet,acc}, men:{man:{name,blurb,look}, head:{name,blurb,look}},
     images:{por:{h,c}, px32:{r,c}, px16:{r,c}}}
   edits.images[h]: {por, px32, px16} for any girl.
   v244: values in admin-made looks that aren't studio options become options (ACAD.CANON_OPTIONS), and the layer's log
   ({rev, date, notes, changes}) becomes the Encyclopedia's What's new page. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon||typeof TEMPLATES==="undefined")return;
  const L=ACAD.canon.layer(),ADD=(L.add&&L.add.girls)||{},IMG=(L.edits&&L.edits.images)||{};
  const clone=o=>o==null?o:JSON.parse(JSON.stringify(o));
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const grp=label=>((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).find(g=>g.label===label);
  const addKey=(label,k)=>{const g=grp(label);if(g&&!g.keys.includes(k))g.keys.push(k)};
  const setImages=(h,im)=>{if(!im)return;
    if(im.por&&im.por.h&&im.por.c){window.PORTRAITS=window.PORTRAITS||{};window.PORTRAITS[h]={h:im.por.h,c:im.por.c}}
    if(im.px32&&im.px32.r){ACAD.PIXEL=ACAD.PIXEL||{};ACAD.PIXEL[h]=clone(im.px32)}
    if(im.px16&&im.px16.r){ACAD.PIXEL16=ACAD.PIXEL16||{};ACAD.PIXEL16[h]=clone(im.px16)}
    else if(im.px32&&im.px32.r&&ACAD.PIXEL16&&!ACAD.PIXEL16[h])ACAD.PIXEL16[h]=clone(im.px32)};
  /* v246: the girl whose robes, boyfriend and headmistress a new girl's drafts start from: a groupmate from the hundred,
     else the girl her sets are modeled on, else a girl of the group her new group was based on, else the first House */
  const ADDG0=(L.add&&L.add.groups)||{};
  ACAD.canonMate=(h,a,gid)=>{const ok=x=>x&&x!==h&&!ACAD.canon.isAdded(x)&&T(x+"robes");gid=gid||(a&&a.group)||"";
    const G=id=>(ACAD.GROUPS||[]).find(z=>z.id===id);const g=G(gid)||(h&&ACAD.GROUP_OF?ACAD.GROUP_OF(h):null);
    let m=g&&g.members.find(ok);if(m)return m;
    if(a&&ok(a.model))return a.model;
    const ag=ADDG0[g?g.id:gid];if(ag&&ag.base){const b=G(ag.base);m=b&&b.members.find(ok);if(m)return m}
    return (ACAD.OLDHOUSES||ACAD.HOUSES||[]).find(ok)||""};
  const AWAKE=new Set();
  Object.entries(ADD).forEach(([h,a])=>{try{
    const mate=ACAD.canonMate(h,a);const mt=mate?T(mate+"robes"):null;
    const nm=a.name||ACAD.cap(h);
    /* v246: a girl modeled on an older girl already has robes, a boyfriend and a headmistress (canonwave246.js), made
       from her look's first outfit; her whole look goes on now */
    const waved=!!(ACAD.CANONWAVE&&ACAD.CANONWAVE.done.some(x=>x.h===h));
    if(waved&&a.look&&a.look.outfit){const tp=T(h+"robes");if(tp){tp.outfit=clone(a.look.outfit);tp.pal=clone(a.look.pal||tp.pal);tp.c=clone(a.look.c||tp.c);tp.name=nm+" robes"}}
    /* v247: her Signature look, designed in the studio */
    if(a.sigLook&&a.sigLook.outfit){const ts=T(h+"signature");if(ts){ts.outfit=Object.assign(clone(a.sigLook.outfit),{oname:"Signature"});ts.pal=clone(a.sigLook.pal||ts.pal);ts.c=clone(a.sigLook.c||ts.c);if(Array.isArray(a.sigLook.more))ts.more=clone(a.sigLook.more)}}
    /* her robes */
    if(!T(h+"robes")&&a.look&&a.look.outfit){
      TEMPLATES.push({id:h+"robes",name:nm+" robes",blurb:a.blurb||((typeof BIOS==="object"&&BIOS[h]&&BIOS[h].summary)||""),pal:clone(a.look.pal||{}),c:clone(a.look.c||{}),
        outfit:clone(a.look.outfit),more:[],out:clone(mt&&mt.out?mt.out:{framing:"cowboy shot"})});
      addKey("Academy",h+"robes")}
    /* her boyfriend and headmistress: her own looks, or drafts on her groupmate's */
    /* v246: a girl whose biography age is under 18 has no boyfriend */
    const age=(()=>{const b=(typeof BIOS==="object"&&BIOS[h])||a.bio||{};const m=/\d+/.exec(String(b.age||""));return m?+m[0]:null})();const minor=a.adult===false||(age!=null&&age<18);
    [["man","boyfriend","Academy Boyfriends"],["head","headmistress","Academy Headmistresses"]].forEach(([suf,word,label])=>{if(suf==="man"&&minor)return;
      const m=(a.men&&a.men[suf])||{};
      if(T(h+suf)){if(!waved)return;const t=T(h+suf);t.name=m.name?(suf==="head"?m.name+", Headmistress of "+nm+" House":m.name):nm+" "+word;if(m.name||m.bio)t.bio=Object.assign({},t.bio||{},m.name?{fullName:m.name}:{},m.bio||{});if(m.blurb)t.blurb=m.blurb;
        if(m.look&&m.look.outfit){t.pal=clone(m.look.pal||{});t.c=clone(m.look.c||{});t.outfit=clone(m.look.outfit);if(Array.isArray(m.look.more))t.more=clone(m.look.more)}return}const src=mate?T(mate+suf):null;if(!src&&!m.look)return;
      const t=src?clone(src):{pal:{},c:{},outfit:{items:{},details:{}},more:[],out:{framing:"full body"}};
      t.id=h+suf;t.name=m.name?(suf==="head"?m.name+", Headmistress of "+nm+" House":m.name):nm+" "+word;t.blurb=m.blurb||(m.look&&ACAD.describeFigure?ACAD.describeFigure(m.look,(m.name?m.name+", her ":"Her ")+word):"")||(m.name?m.name+", her "+word+".":"");t.bio=Object.assign(m.name?{fullName:m.name}:{},m.bio||{});
      if(t.tags)t.tags=t.tags.map(x=>x===mate?h:x);
      /* v247: a look designed for him or her replaces the draft's first outfit, face and palette; the draft's other outfits stay */
      if(m.look&&m.look.outfit){t.pal=clone(m.look.pal||{});t.c=clone(m.look.c||{});t.outfit=clone(m.look.outfit);if(Array.isArray(m.look.more))t.more=clone(m.look.more);else if(!src)t.more=[]}
      TEMPLATES.push(t);const G=((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).find(x=>x.label===label)||((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).find(x=>new RegExp(word,"i").test(x.label)&&/^Academy/.test(x.label));
      if(G&&!G.keys.includes(t.id))G.keys.push(t.id)});
    /* her House details, for the general scenes */
    const d=a.det||{};
    const WD=waved&&ACAD.WAVEDATA&&ACAD.WAVEDATA[h];
    if(typeof SISLORE==="object"&&WD){const Lw=WD.L,gw=WD.g;SISLORE[h]={touch:Lw.touch,room:Lw.room,roomL:Lw.roomL,roomF:Lw.room,out:Lw.out,role:gw.role,acc:gw.acc,g:Object.assign({},Lw.g)}}
    else if(typeof SISLORE==="object"){const pal=(a.look&&a.look.pal)||{};
      SISLORE[h]={touch:d.acc?"with "+d.acc:"",room:d.room||"",roomL:d.room||"",roomF:d.room||"",out:d.out||"",role:d.role||"",acc:d.acc||"",
        g:{id:"",fig:"",col:pal.primary||"",out:d.out||"",light:d.acc||"",room:d.room||"",bath:d.bath||""}}}
    if(ACAD.HUM&&ACAD.HUM.HD&&!WD){ACAD.HUM.HD[h]=[d.room||"",d.pride||"",d.pet||"",d.bath||""];if(ACAD.HUM.HS&&!ACAD.HUM.HS.includes(h))ACAD.HUM.HS.push(h)}
    /* the House she woke */
    if(a.place&&a.place.kind==="wake"&&a.place.house)AWAKE.add(a.place.house);
    /* her pixel art: hers, or the woken head of the House she woke */
    if(!(a.images&&a.images.px32)&&a.place&&a.place.kind==="wake"&&typeof ENC!=="undefined"){const r32=(ENC.ROLLPX||{})[a.place.house],r16=(ENC.ROLLPX16||{})[a.place.house];
      if(r32)ACAD.PIXEL[h]=clone(r32);if(r16&&ACAD.PIXEL16)ACAD.PIXEL16[h]=clone(r16)}
    setImages(h,a.images);
  }catch(e){if(window.console)console.warn("canon girl "+h,e)}});
  Object.entries(IMG).forEach(([h,im])=>setImages(h,im));
  /* v247: designed figures. edits.figures[template id] = {fullName, blurb, look:{pal,c,outfit}} for any boyfriend, headmistress
     or principal of the hundred (or a canon girl's); a new group's principal carries his look in add.groups[gid].principal.look */
  const figure=(id,f)=>{const t=T(id);if(!t||!f)return;
    if(f.look&&f.look.outfit){t.pal=clone(f.look.pal||t.pal||{});t.c=clone(f.look.c||t.c||{});t.outfit=Object.assign(clone(f.look.outfit),{oname:(t.outfit&&t.outfit.oname)||f.look.outfit.oname});if(Array.isArray(f.look.more))t.more=clone(f.look.more)}
    const old=t.bio&&t.bio.fullName;if(f.fullName)t.bio=Object.assign({},t.bio||{},{fullName:f.fullName});if(f.blurb)t.blurb=f.blurb;
    /* v259: a boyfriend's new name follows him: his own name line, his girl's biography, and the other boys' who name him.
       v260: so does a headmistress's (and her address), into the other headmistresses' and the principals' biographies too */
    if(f.fullName&&old&&old!==f.fullName&&/(man|head)$/.test(id)){const swap=s=>typeof s==="string"?s.split(old).join(f.fullName):s;t.name=swap(t.name);if(!f.blurb)t.blurb=swap(t.blurb);
      if(/head$/.test(id)&&t.bio){const w=f.fullName.trim().split(/\s+/),sur=w.length>2&&/^[a-z]/.test(w[w.length-2])?w.slice(-2).join(" "):w[w.length-1];t.bio.address="Headmistress "+sur}
      if(typeof BIOS==="object")Object.values(BIOS).forEach(b=>{if(b)Object.keys(b).forEach(k=>{b[k]=swap(b[k])})});
      (typeof TEMPLATES!=="undefined"?TEMPLATES:[]).forEach(tp=>{if(tp&&tp!==t&&/(man|head)$|^principal/.test(tp.id||"")&&tp.bio)Object.keys(tp.bio).forEach(k=>{tp.bio[k]=swap(tp.bio[k])})})}};
  Object.entries((L.edits&&L.edits.figures)||{}).forEach(([id,f])=>{try{figure(id,f)}catch(e){}});
  Object.entries(ADDG0).forEach(([gid,a])=>{const p=a&&a.principal;if(p&&p.look)try{figure("principal"+gid,{look:p.look})}catch(e){}});
  /* v246: a second banner she swears to carry (add.girls[h].banner2 = {lost, oath}), beside its champion (ENC.SWORN) */
  if(typeof ENC!=="undefined"&&ENC.ROLL)Object.entries(ADD).forEach(([h,a])=>{const b=a.banner2;if(!b||!b.lost)return;
    const lg=ENC.ROLL.find(g=>g.id===b.lost);if(!lg)return;ENC.SWORN=ENC.SWORN||{};ENC.SWORN[h]=[b.lost,b.oath||"she swore it the night she joined"];
    if(typeof BIOS==="object"){BIOS[h]=BIOS[h]||{};if(!BIOS[h].group2)BIOS[h].group2=lg.name}});
  if(AWAKE.size&&typeof ENC!=="undefined"&&ENC.isAwake){const ia=ENC.isAwake;ENC.isAwake=id=>AWAKE.has(id)||ia(id)}
  ACAD.canonAwake=()=>[...AWAKE];

  /* ---------- v245: new groups join their faction ---------- */
  const ADDG=(L.add&&L.add.groups)||{};
  if(typeof ENC!=="undefined"&&ENC.FACTIONS)Object.entries(ADDG).forEach(([gid,a])=>{const f=ENC.FACTIONS.find(x=>x.id===a.faction)||ENC.FACTIONS[0];if(f&&!f.groups.includes(gid))f.groups.push(gid)});
  /* and a group moved to the other faction */
  if(typeof ENC!=="undefined"&&ENC.FACTIONS)Object.entries((L.edits&&L.edits.groups)||{}).forEach(([gid,p])=>{if(!p||!p.faction)return;const to=ENC.FACTIONS.find(x=>x.id===p.faction);if(!to)return;
    ENC.FACTIONS.forEach(f=>{const i=f.groups.indexOf(gid);if(i>=0&&f!==to)f.groups.splice(i,1)});if(!to.groups.includes(gid))to.groups.push(gid)});

  /* ---------- v244: every value a canon girl's look uses that isn't one of the studio's options becomes one, in every
     file (listed under "Everspire" in the field's options). Looks made by admins: new girls (and their boyfriends and
     headmistresses) and looks saved to canon. ---------- */
  const OPT={};
  const addOpt=(k,v)=>{if(typeof v!=="string")return;v=v.trim();if(!v||v[0]==="@")return;(OPT[k]=OPT[k]||[]);if(!OPT[k].includes(v))OPT[k].push(v)};
  const inChar=(f,v)=>typeof CHAR!=="undefined"&&(CHAR[f]||[]).some(o=>o[0]===v);
  const inOut=(f,v)=>typeof OUTFIT!=="undefined"&&(OUTFIT[f]||[]).some(o=>o.v===v);
  const scanLook=lk=>{if(!lk)return;Object.entries(lk.c||{}).forEach(([f,v])=>{if(typeof CHAR!=="undefined"&&CHAR[f]&&!inChar(f,v))addOpt(f,v)});
    const o=lk.outfit||{};Object.entries(o.items||{}).forEach(([f,t])=>{const v=Array.isArray(t)?t[0]:t&&t.v;if(!inOut(f,v))addOpt("o:"+f,v)});
    Object.entries(o.details||{}).forEach(([f,v])=>{if(!inOut(f,v))addOpt("o:"+f,v)})};
  Object.values(ADD).forEach(a=>{scanLook(a.look);if(a.men){scanLook(a.men.man&&a.men.man.look);scanLook(a.men.head&&a.men.head.look)}});
  Object.values((L.edits&&L.edits.looks)||{}).forEach(scanLook);
  /* v245: and the hundred's own designs: robes, boyfriends, headmistresses */
  const ofTpl=t=>t?{c:t.c,outfit:t.outfit}:null;
  (ACAD.ROSTER?ACAD.ROSTER.girls():ACAD.HOUSES||[]).forEach(h=>{[(ACAD.robes&&ACAD.robes(h))||h+"robes",h+"robes",h+"man",h+"head"].forEach(id=>{const t=T(id);if(t){scanLook(ofTpl(t));(t.more||[]).forEach(m=>scanLook({outfit:m}))}})});
  ACAD.CANON_OPTIONS=OPT;
  if(Object.keys(OPT).length){
    if(typeof optionList==="function"){const ol=optionList;optionList=function(field){const r=ol.apply(this,arguments);const extra=(OPT[field]||[]).filter(v=>!r.some(o=>o.v===v)&&(typeof Policy!=="object"||Policy.optionAllowed(field,v))).map(v=>({v,g:"Everspire"}));
      if(!extra.length)return r;const i=r.findIndex(o=>o.g==="My options");return i<0?r.concat(extra):r.slice(0,i).concat(extra,r.slice(i))}}
    if(typeof customOutfit==="function"){const co=customOutfit;customOutfit=function(field){const r=co.apply(this,arguments);return r.concat((OPT["o:"+field]||[]).filter(v=>!r.includes(v)))}}}

  /* ---------- v244: What's new (the log each saved revision carries) ---------- */
  const LOG=(L.log||[]).slice().sort((a,b)=>(b.rev||0)-(a.rev||0));ACAD.canonLog=()=>LOG.slice();
  if(LOG.length&&typeof ENC!=="undefined"&&ENC.page){const E=ENC.E;
    ENC.page("whatsnew",{title:"What's new",short:"What's new",sec:"whatsnew",crumbs:[],searchText:()=>"what's new changes revisions "+LOG.map(l=>(l.notes||"")+" "+(l.changes||[]).join(" ")).join(" "),
      build:el=>{const art=E("article",{class:"enc-article"});art.append(E("h1",{class:"enc-title"},"What's new"),E("p",{class:"enc-lead"},"Everspire as it has changed, newest first."));
        const dw=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||"");return m?new Date(+m[1],+m[2]-1,+m[3]).toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"}):s};
        LOG.forEach(l=>{art.append(E("h3",{class:"enc-h"},"Revision "+l.rev,l.date?E("small",null," "+dw(l.date)):null));if(l.notes)art.append(E("p",{class:"enc-p"},l.notes));
          if((l.changes||[]).length)art.append(E("ul",{class:"enc-list"},l.changes.map(c=>E("li",null,c))))});el.append(art)}});
    if(ENC.COLLECTIONS&&!ENC.COLLECTIONS.some(c=>c.id==="whatsnew"))ENC.COLLECTIONS.push({id:"whatsnew",title:"What's new",page:"whatsnew"})}
})();

/* ---- v239: the hundred girls' painted portraits (por239data.js) sit alongside the pixel art, never in place of it: a House
   page shows her whole portrait card, and the larger heads on group pages are round portrait crops; both carry her pixel head
   as a badge. Everywhere else the pixel art is unchanged, and the 32x32 / 16x16 switch works as before. ---- */
/* ---- v234: a pixel-art size setting. Every pixel image (the hundred girls' heads, the group crests, the lost groups'
   crests, the sleeping Houses' sigils and woken heads) can be shown in the 32x32 art (v231) or the original 16x16 art. The
   choice is a button in the studio's header and in the Encyclopedia's top bar, remembered on this device. Images are
   drawn at whatever size a page asks for: crisp when shown at or above the art's own size, smoothed below it. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  const KEY="charstudio.pixelsize.v1";
  let mode=32;try{if(localStorage.getItem(KEY)==="16")mode=16}catch(e){}
  ACAD.pxSize=()=>mode;
  const POR=window.PORTRAITS||{};ACAD.portraitURL=(h,card)=>POR[h]?(card?POR[h].c:POR[h].h):"";
  /* a round portrait with her pixel head as a badge; null for anyone without a portrait */
  ACAD.portraitImg=(h,size)=>{if(!POR[h])return null;const n=size||48;const box=document.createElement("span");box.dataset.por="ring";box.className="por-ring";
    box.style.setProperty("--ps",n+"px");box.style.setProperty("--bs",(n>=60?32:24)+"px");
    const im=document.createElement("img");im.src=POR[h].h;im.alt="";im.width=128;im.height=128;im.decoding="async";box.append(im);
    const bd=ACAD.pixelImg?ACAD.pixelImg(h,n>=60?32:24):null;if(bd){bd.classList.add("por-badge");box.append(bd)}return box};
  const draw=(rows,cols)=>{const n=rows.length,cv=document.createElement("canvas");cv.width=n;cv.height=n;const x=cv.getContext("2d");
    rows.forEach((row,y)=>{for(let i=0;i<row.length;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=cols[ch]||"#f0f";x.fillRect(i,y,1,1)}});
    try{return cv.toDataURL("image/png")}catch(e){return""}};
  /* the URL makers: 32x32 as they are now, 16x16 from what was kept */
  const pick=(f32,f16)=>(...a)=>mode===16&&f16?f16(...a):f32(...a);
  if(ACAD.pixelURL&&ACAD.pixelURL16)ACAD.pixelURL=pick(ACAD.pixelURL,ACAD.pixelURL16);
  if(ACAD.crestURL&&ACAD.crestURL16)ACAD.crestURL=pick(ACAD.crestURL,ACAD.crestURL16);
  if(typeof ENC!=="undefined"){
    if(ENC.lostCrestURL&&ENC.lostCrestURL16)ENC.lostCrestURL=pick(ENC.lostCrestURL,ENC.lostCrestURL16);
    if(ENC.sigilURL&&ENC.sigilURL16)ENC.sigilURL=pick(ENC.sigilURL,ENC.sigilURL16);
    const rc={};
    const roll16=id=>{if(rc[id])return rc[id];const p=(ENC.ROLLPX16||{})[id];if(!p)return"";return rc[id]=draw(p.r,p.c)};
    if(ENC.rollIconURL)ENC.rollIconURL=pick(ENC.rollIconURL,ENC.ROLLPX16?roll16:null)}
  /* crisp at or above the art's own size, smoothed below it */
  const sharp=(im,size)=>{if(!im||!im.style)return im;const s=size||+im.getAttribute("width")||mode;im.style.imageRendering=s<mode?"auto":"";im.dataset.px=String(mode);return im};
  const wrapImg=(o,k)=>{const f=o&&o[k];if(typeof f!=="function")return;o[k]=function(a,b,c){const im=f.apply(this,arguments);const size=k==="sigil"?c:b;return sharp(im,size)}};
  wrapImg(ACAD,"pixelImg");wrapImg(ACAD,"crestImg");
  if(typeof ENC!=="undefined")["pixel","crest","rollIcon","sigil","lostCrest"].forEach(k=>wrapImg(ENC,k));
  /* the House page's big image: the whole portrait card */
  if(typeof ENC!=="undefined"&&ENC.pixel){const p0=ENC.pixel;ENC.pixelOnly=p0;
    const pimg=(src,alt,w,h)=>{const im=document.createElement("img");im.src=src;im.alt=alt;im.width=w;im.height=h;im.decoding="async";return im};
    ENC.pixel=function(h,size){const n=size||0;if(n>=40&&POR[h]){const card=n>=100;const box=document.createElement("span");box.dataset.por=card?"card":"ring";
        if(!card){box.style.setProperty("--ps",n+"px");box.style.setProperty("--bs",(n>=60?32:24)+"px")}
        box.append(pimg(card?POR[h].c:POR[h].h,ENC.HN?"Portrait of "+ENC.HN(h):"",card?400:128,card?585:128));
        const bd=p0.call(this,h,card?48:n>=60?32:24);if(bd){bd.classList.add("por-badge");box.append(bd)}return box}
      return p0.apply(this,arguments)}}
  const st=document.createElement("style");st.textContent="@media (min-width:1340px){.top-actions{flex-wrap:nowrap;flex-shrink:0}#nameInput{min-width:120px}}img.pxhead,img.enc-px{image-rendering:pixelated}img.pxhead[style*='auto'],img.enc-px[style*='auto']{image-rendering:auto!important}span[data-por]{position:relative;display:inline-block;flex:none;vertical-align:middle}span[data-por]>img:first-child{display:block;width:100%;height:100%;object-fit:cover;background:#fff;image-rendering:auto}span[data-por=ring]{width:var(--ps);height:var(--ps);margin:0}#encDlg span[data-por]{display:inline-block!important;flex:none!important;margin:0;padding:0;min-width:0}#encDlg .enc-member span[data-por]{margin:0 auto 8px}#encDlg .enc-heads span[data-por]{margin:0 auto 4px;text-decoration:none!important}#encDlg .enc-heads a{text-align:center}#encDlg svg image.por{clip-path:circle(50%);image-rendering:auto}span[data-por=ring]>img:first-child{border-radius:50%;box-shadow:0 0 0 2px var(--gc,#fff),0 3px 8px rgba(0,0,0,.18)}#encDlg span[data-por]>img:first-child{margin:0;width:100%;height:100%}#encDlg span[data-por]>img.por-badge{margin:0}#encDlg span[data-por]>img.por-badge,span[data-por]>img.por-badge{position:absolute;right:calc(var(--bs,32px)*-.36);bottom:calc(var(--bs,32px)*-.18);width:var(--bs,32px);height:var(--bs,32px);filter:drop-shadow(0 1px 2px rgba(0,0,0,.45))}#encDlg .enc-banner span[data-por=card]{width:168px;height:246px;filter:none}#encDlg .enc-banner span[data-por=card]>img:first-child{border-radius:12px;box-shadow:0 8px 22px rgba(0,0,0,.35)}#encDlg .enc-banner span[data-por=card]>img.por-badge{width:48px;height:48px;right:-14px;bottom:-10px}@media (max-width:600px){#encDlg .enc-banner span[data-por=card]{width:110px;height:161px}#encDlg .enc-banner span[data-por=card]>img.por-badge{width:36px;height:36px}}";document.head.append(st);

  /* the switch */
  const MODES=[32,16];const next=()=>MODES[(MODES.indexOf(mode)+1)%MODES.length];
  const name=(m,long)=>(m===32?"32×32":"16×16")+(long?" art":"");
  const label=long=>name(mode,long);
  const title=()=>`Pixel art is ${name(mode,true)}. Press for ${name(next(),true)}.`;
  const btns=[];
  function setMode(m){mode=m;try{localStorage.setItem(KEY,String(m))}catch(e){}
    btns.forEach(b=>{b.textContent=label(b.dataset.long==="1");b.title=title()});
    try{changed()}catch(e){}
    try{if(typeof ENC!=="undefined"&&ENC._cur&&document.getElementById("encDlg")&&document.getElementById("encDlg").open)ENC.go(ENC._cur,true)}catch(e){}
    if(typeof toast==="function")toast(`Pixel art: ${m}×${m}.`)}
  const make=(cls,long)=>{const b=document.createElement("button");b.type="button";b.className=cls;b.dataset.long=long?"1":"";b.textContent=label(long);b.setAttribute("aria-label","Pixel art size");b.title=title();
    b.addEventListener("click",()=>setMode(next()));btns.push(b);return b};
  const tb=document.getElementById("themeBtn");
  if(tb&&tb.parentNode)tb.parentNode.insertBefore(make(tb.className||"btn"),tb);
  ACAD.setPxSize=setMode;
  if(typeof ENC!=="undefined"&&ENC.go){
    const go0=ENC.go;ENC.go=function(id){const r=go0.apply(this,arguments);try{const p=ENC.resolve?ENC.resolve(id):null;ENC._cur=p&&p.id||id}catch(e){ENC._cur=id}placeEnc();return r};
    function placeEnc(){const top=document.querySelector("#encDlg .enc-top");if(!top||top.querySelector(".enc-pxbtn"))return;const x=top.querySelector(".enc-back");top.insertBefore(make("enc-x enc-pxbtn",true),x||null)}
  }
})();

/* ---- v241: the admin edition says so in the header. The public edition shows nothing. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.isAdmin||!ACAD.isAdmin())return;
  const tb=document.getElementById("themeBtn");const host=tb&&tb.parentNode;if(!host)return;
  const b=document.createElement("span");b.className="ed-badge";b.textContent="Admin edition";b.title="This copy has the canon editing tools. Publish a public edition for players.";
  host.insertBefore(b,host.firstChild);
  const st=document.createElement("style");st.textContent=".ed-badge{display:inline-flex;align-items:center;padding:0 10px;height:30px;border-radius:999px;font-size:12.5px;font-weight:600;letter-spacing:.01em;background:#3b2a5c;color:#f3ecff;white-space:nowrap;align-self:center}";document.head.append(st);
})();

/* ---- v236: everything in the Encyclopedia is canon, so nothing is labelled Canon, and the old "New lore" labels and the
   notes that explained which parts were canon or new are gone. "New lore" now means only lore a user adds; "Open" marks
   the questions left for stories. (The tags are hidden by CSS in enc232.js; this removes the explaining sentences.) ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.go)return;
  const RX=/[^.!?]*\b(?:canon|new lore)\b[^.!?]*[.!?]\s*|[^.!?]*\b(?:are|is) new\.\s*/gi;
  function clean(root){
    root.querySelectorAll(".enc-note,.enc-p,.enc-lead,.enc-facts-tag,li,small,dd").forEach(el=>{
      if(!/\b(canon|new lore|are new|is new)\b/i.test(el.textContent))return;
      const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const ns=[];while(w.nextNode())ns.push(w.currentNode);
      ns.forEach(n=>{if(n.parentNode&&n.parentNode.closest&&n.parentNode.closest(".enc-tag"))return;const t=n.nodeValue.replace(RX,"");if(t!==n.nodeValue)n.nodeValue=t});
      if(!el.textContent.trim()&&!el.querySelector("img,button,input,select"))el.remove()})}
  const go0=ENC.go;
  ENC.go=function(id){const r=go0.apply(this,arguments);try{if(ENC._cur!=="canon"){const m=document.querySelector("#encDlg main");if(m)clean(m)}}catch(e){}return r};
  ENC.cleanLore=clean;
})();

/* ---- v238: the hundred House robes designs as one consistent set of character sheets, ready for a portrait run in
   the image generator with one seed, prompt structure and resolution: every robes design is a cowboy shot, written as a young woman, in
   the same neutral standing pose, with the same style line, and with the body, hair, face and skin fields that most of the
   set describes filled in where a few designs had left them out (her own values are never changed). Her personality stays
   in her expression and overall impression. Runs last, so the robes designs' other looks are not affected. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function")return;
  const STYLE="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const POSE="standing straight, facing the viewer, arms relaxed at her sides";
  const FILL={handShape:"graceful hands",armShape:"slender arms",hairMovement:"falls naturally around her shoulders",bustWeight:"soft fullness",bustShape:"round, full shape",
    hairStyle:"loose, flowing hair",hairTexture:"silky and smooth",bangs:"wispy bangs",skinFinish:"smooth, luminous skin",heightStature:"average height",buttSize:"round, firm butt",
    pupilStyle:"round pupils",irisDetail:"bright, intricately detailed irises",lashStyle:"natural lashes",blushStyle:"soft cheek blush"};
  const OWN={salmon:{expression:"calm, composed smile",impression:"a composed, polished elegance"},crow:{expression:"sly, mischievous grin"},badger:{expression:"warm, sweet smile"}};
  const curvy=c=>/curv|hourglass|voluptuous|top-heavy|plush|soft/i.test(c.bodySoftness||"");
  const done=[];
  const sheetC=(c0,h)=>{const c=Object.assign({},c0||{});
    c.age="young woman";c.posture=POSE;
    Object.entries(FILL).forEach(([k,v])=>{if(!c[k])c[k]=v});
    if(!c.torsoShape)c.torsoShape=curvy(c)?"soft, curvy torso":"long, slender torso";
    Object.entries(OWN[h]||{}).forEach(([k,v])=>{if(!c[k])c[k]=v});return c};
  ACAD.HOUSES.forEach(h=>{const id=(ACAD.robes&&ACAD.robes(h))||h+"robes";const t=tplById(id);if(!t)return;
    t.c=sheetC(t.c,h);t.out=Object.assign({},t.out||{},{framing:"cowboy shot",must:STYLE});
    done.push(h)});
  /* v246: the same sheet for a look that isn't a House's robes yet (a new girl in the canon wizard) */
  ACAD.robesSheet=(lk,name)=>({id:"__sheet",name:name||"Her robes",pal:Object.assign({},lk.pal||{}),c:sheetC(lk.c),outfit:JSON.parse(JSON.stringify(lk.outfit||{items:{}})),more:[],
    out:{framing:"cowboy shot",must:STYLE}});
  ACAD.ROBES_SET={done,STYLE,POSE,framing:"cowboy shot"};
})();

/* ---- v242: family, and the under-18 rule.
   Family (ACAD.RELDATA.FAM, edited through the canon layer): [a, b, "blood"|"chosen", what b is to a, what a is to b].
   "blood" is blood relatives; "chosen" is step, adoptive or chosen family. Family is lore only: it never reaches a prompt,
   and it can overlap with any other relationship. Each girl's biography gains "kin" (her family, in words) for her House
   page, and the circle web draws family as its own kind of line.
   The under-18 rule: a character whose biography age is under 18 (ACAD.isMinor) is never in the Scene Archive, never
   in an explicit or lewd scene, never given explicit or lewd tags, and never given a romantic relationship. It is enforced
   here, outside the Safeguards block, by wrapping the calls the studio makes (Policy.explicitAllowed / enforce / banner /
   reason, loadStart, PAIR.applyScene, ACAD.RX.loadWith); the Safeguards block itself is untouched and still runs first. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h);
  /* ---------- ages ---------- */
  const ageFrom=b=>{if(!b)return null;const m=/(\d{1,3})/.exec(String(b.age||""));if(m)return +m[1];
    const d=/^(\d{4})-(\d{2})-(\d{2})$/.exec(b.dob||"");if(!d)return null;const now=new Date(),bd=new Date(+d[1],+d[2]-1,+d[3]);let a=now.getFullYear()-bd.getFullYear();
    if(now.getMonth()<bd.getMonth()||(now.getMonth()===bd.getMonth()&&now.getDate()<bd.getDate()))a--;return a};
  ACAD.ageOf=ageFrom;
  ACAD.isMinor=h=>{if(!h||typeof BIOS!=="object"||!BIOS[h])return false;const a=ageFrom(BIOS[h]);return a!=null&&a<18};
  const girlOfTpl=t=>{try{return t&&window.BIO_GIRL?BIO_GIRL(t):null}catch(e){return null}};
  const tplOf=id=>id&&typeof tplById==="function"?tplById(id):null;
  /* is anyone in this state under 18: character 1 by her biography (her House, or an age she was given), character 2 by hers */
  const stateMinor=st=>{if(!st)return false;const b=st.bio||{};
    const a=ageFrom(b);if(a!=null&&a<18)return true;
    const h1=ACAD.RX&&ACAD.RX.girlOfState?ACAD.RX.girlOfState(st):null;if(h1&&ACAD.isMinor(h1))return true;
    const p=st.out&&st.out.pair;if(p&&p.id){const h2=girlOfTpl(tplOf(p.id));if(h2&&ACAD.isMinor(h2))return true}
    return false};
  ACAD.stateMinor=stateMinor;
  const minorNow=()=>{try{return stateMinor(S)}catch(e){return false}};
  const NOTE="Under 18 by her biography: explicit and lewd tags are off, and intimate scenes are not available.";

  /* ---------- the studio's calls, wrapped (the Safeguards block runs first, unchanged) ---------- */
  if(typeof Policy==="object"&&Policy){
    const ea=Policy.explicitAllowed,en=Policy.enforce,bn=Policy.banner,rs=Policy.reason;
    if(ea)Policy.explicitAllowed=function(){return ea.apply(this,arguments)&&!minorNow()};
    if(bn)Policy.banner=function(){const b=bn.apply(this,arguments);return b||(minorNow()?NOTE:"")};
    if(rs)Policy.reason=function(){const r=rs.apply(this,arguments);return r||(minorNow()?NOTE:"")};
    if(en)Policy.enforce=function(){const notes=en.apply(this,arguments);
      try{if(minorNow()&&S&&S.out){let hit=false;
        if(S.out.explicit||S.out.lewdtag){S.out.explicit=false;S.out.lewdtag=false;hit=true}
        if(S.out.pair&&S.out.pair.explicit){S.out.pair=null;hit=true}
        if(hit){if(Array.isArray(notes))notes.push(NOTE)}}}catch(e){}
      return notes}}
  const intimateTpl=t=>{if(!t)return false;const o=t.out||{};return !!(o.explicit||o.lewdtag||(o.pair&&o.pair.explicit))};
  const say=m=>{if(typeof toast==="function")toast(m)};
  const refuse=who=>say(`${who} is under 18 by her biography, so this scene isn't available with her.`);
  if(typeof loadStart==="function"){const ls=loadStart;
    loadStart=function(t){if(intimateTpl(t)){const h=girlOfTpl(t);const p=t&&t.out&&t.out.pair;const h2=p&&p.id?girlOfTpl(tplOf(p.id)):null;
        if(h&&ACAD.isMinor(h))return refuse(HN(h));if(h2&&ACAD.isMinor(h2))return refuse(HN(h2))}
      return ls.apply(this,arguments)}}
  if(window.PAIR&&PAIR.applyScene){const as=PAIR.applyScene;
    PAIR.applyScene=function(t){const p=t&&t.out&&t.out.pair;if(p&&(p.explicit||(t.out&&t.out.lewdtag))){
        if(minorNow())return refuse("Your character");const h2=p.id?girlOfTpl(tplOf(p.id)):null;if(h2&&ACAD.isMinor(h2))return refuse(HN(h2))}
      return as.apply(this,arguments)}}
  if(ACAD.RX&&ACAD.RX.loadWith){const lw=ACAD.RX.loadWith;
    ACAD.RX.loadWith=function(si,vi,h){if(h&&ACAD.isMinor(h)){refuse(HN(h));return false}if(!h&&minorNow()){refuse("Your character");return false}
      return lw.apply(this,arguments)}}

  /* ---------- family: words for her House page ---------- */
  const R=ACAD.RELDATA||{};if(!R.FAM)R.FAM=[];
  ACAD.FAMOF=h=>(R.FAM||[]).filter(p=>p[0]===h||p[1]===h).map(p=>p[0]===h?{who:p[1],type:p[2],is:p[3]}:{who:p[0],type:p[2],is:p[4]});
  const TYPEW={blood:"by blood",chosen:"step, adoptive or chosen"};
  ACAD.FAMTYPES=[["blood","Blood relatives"],["chosen","Step, adoptive or chosen family"]];
  if(typeof BIOS==="object")Object.keys(BIOS).forEach(h=>{const f=ACAD.FAMOF(h);if(f.length)BIOS[h].kin=f.map(x=>`${HN(x.who)}${x.is?", her "+x.is:""} (${TYPEW[x.type]||"family"})`).join("; ")});

  /* ---------- the Encyclopedia: no Scene Archive for a girl under 18 ---------- */
  if(typeof ENC!=="undefined"){
    if(ENC.buildHouse){const bh=ENC.buildHouse;ENC.buildHouse=function(el,h){bh.apply(this,arguments);if(!ACAD.isMinor(h))return;
      el.querySelectorAll(".enc-card-archive").forEach(c=>c.remove())}}
    ENC.resolvers=ENC.resolvers||[];
    ENC.resolvers.unshift((k,v,id)=>{if(k!=="rshelf"||!ACAD.isMinor(v))return null;
      return ENC.page(id,{title:HN(v),short:HN(v),sec:"restricted",crumbs:["restricted","house:"+v],build:el=>{
        el.append(ENC.E("article",{class:"enc-article wide"},ENC.E("h1",{class:"enc-title"},HN(v)),ENC.E("p",{class:"enc-note"},`${HN(v)} is under 18 by her biography, so she has no shelf and isn't offered in the Scene Archive.`)))}})});
  }
})();

/* ---- v245: biography options and body sizes.
   Every written biography field gets an Options button: the answers the hundred girls give for that field, then a box to
   write your own at the bottom. Fields whose answers are lists (traits, likes, languages…) offer the single items, and
   picking one adds it to what is there; other fields offer whole answers, and picking one replaces it.
   Body and sizes: height, weight, bust, cup, waist, hips, butt and shoe size are suggested from the body chosen in the
   studio (height, breast size, waist, hips, butt), learned from the hundred: each body word is sorted into a size class,
   and the suggestion is the middle value of the hundred girls in that class (weight and shoe size follow height and
   bust). The suggestion is the first option of each size field, and "Fill sizes from her body" fills the empty ones.
   ACAD.bioOptions(field) · ACAD.sizeSuggest(c) · ACAD.bioPick(anchor, field, {get, set, c}). ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof BIOS!=="object")return;
  const SKIP=new Set(["fullName","nickname","dob","house","group","group2","groupRole","rivalGroup","bestFriends","friends","rivals","yuriBuddy","kin","partner"]);
  const SIZE=["height","weight","bust","cup","waist","hips","butt","shoe"];
  const girls=()=>ACAD.ROSTER?ACAD.ROSTER.girls():(ACAD.HOUSES||[]);
  const tplOf=h=>typeof tplById==="function"?(tplById((ACAD.robes&&ACAD.robes(h))||h+"robes")||tplById(h+"robes")):null;
  const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
  /* ---------- options from the hundred ---------- */
  const CACHE={};
  const splitList=v=>String(v).split(/\s*[,;]\s*|\s+and\s+(?=[A-Za-z])/).map(x=>x.trim().replace(/\.$/,"")).filter(x=>x&&x.length<60);
  function opts(f){if(CACHE[f])return CACHE[f];const vals=girls().map(h=>BIOS[h]&&BIOS[h][f]).filter(v=>typeof v==="string"&&v.trim()||typeof v==="number").map(String);
    const listy=vals.length>8&&vals.filter(v=>/,|;/.test(v)).length/vals.length>.5&&!/^(height|weight|bust|waist|hips|summary|backstory|notes)$/.test(f);
    const cnt=new Map(),put=v=>{const k=v.toLowerCase();let e=cnt.get(k);if(!e){e={v,n:0,vars:{}};cnt.set(k,e)}e.n++;e.vars[v]=(e.vars[v]||0)+1;
      /* the spelling most of the hundred use (a list's first item is capitalized only because it comes first) */
      e.v=Object.entries(e.vars).sort((x,y)=>y[1]-x[1]||(x[0]===x[0].toLowerCase()?-1:1))[0][0]};
    vals.forEach(v=>listy?splitList(v).forEach(put):put(v.trim()));
    let items=[...cnt.values()];
    const num=v=>{const m=/(\d+(?:\.\d+)?)/.exec(v);return m?+m[1]:NaN};
    if(SIZE.includes(f)&&f!=="butt"&&f!=="cup")items.sort((a,b)=>num(a.v)-num(b.v));
    else if(f==="cup"){const O=["AA","A","B","C","D","DD","E","F","G","H","I","J","K"];items.sort((a,b)=>O.indexOf(a.v)-O.indexOf(b.v))}
    else items.sort((a,b)=>b.n-a.n||a.v.localeCompare(b.v));
    return CACHE[f]={list:listy,items:items.map(x=>x.v)}}
  ACAD.bioOptions=f=>SKIP.has(f)?null:opts(f);

  /* ---------- sizes from her body ---------- */
  const CUPS=["AA","A","B","C","D","DD","E","F","G","H","I","J","K"];
  const numOf=v=>{const m=/(\d+(?:\.\d+)?)/.exec(String(v||""));return m?+m[1]:null};
  const CLASS={
    heightStature:[[/petite|tiny/,"petite"],[/very tall|towering|statuesque|extremely tall/,"vtall"],[/slightly above|above-average/,"above"],[/\btall\b/,"tall"],[/short|small/,"short"],[/average|medium/,"avg"]],
    bustSize:[[/small-to-medium|small to medium/,"sm"],[/very large|extremely|huge|enormous|massive|gigantic|very big/,"vl"],[/large|big|ample|heavy/,"l"],[/medium/,"m"],[/small|petite|flat|tiny/,"s"]],
    waistShape:[[/tiny|wasp/,"tiny"],[/narrow/,"narrow"],[/slim|slender/,"slim"],[/soft|thick|full|plush/,"soft"],[/toned|athletic|defined|firm/,"def"]],
    hipShape:[[/very wide|extremely wide|broad/,"vwide"],[/wide/,"wide"],[/slim|narrow|lean|athletic|boyish/,"slim"],[/curvy|round|full|soft/,"curvy"]]};
  const classOf=(f,v)=>{const s=String(v||"").toLowerCase();for(const [rx,k] of CLASS[f]||[])if(rx.test(s))return k;return ""};
  const med=a=>{a=a.filter(x=>x!=null&&!isNaN(x)).sort((x,y)=>x-y);if(!a.length)return null;const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2};
  let MODEL=null;
  function model(){if(MODEL)return MODEL;const rows=girls().map(h=>{const t=tplOf(h);const b=BIOS[h]||{};if(!t||!b.height)return null;const c=t.c||{};
      return{c,height:numOf(b.height),weight:numOf(b.weight),bust:numOf(b.bust),cup:CUPS.indexOf(String(b.cup||"").trim()),waist:numOf(b.waist),hips:numOf(b.hips),shoe:numOf(b.shoe)}}).filter(Boolean);
    const by=(src,tgt)=>{const m={};rows.forEach(r=>{const k=classOf(src,r.c[src]);if(!k)return;(m[k]=m[k]||[]).push(r[tgt])});const o={};Object.entries(m).forEach(([k,a])=>{o[k]=med(a)});o._=med(rows.map(r=>r[tgt]));return o};
    /* least squares for weight (height, cup) and shoe (height) */
    const fit=(xs,ys)=>{const n=xs.length;if(n<5)return null;const k=xs[0].length+1;const A=Array.from({length:k},()=>Array(k).fill(0)),B=Array(k).fill(0);
      xs.forEach((x,i)=>{const v=[1].concat(x);for(let a=0;a<k;a++){B[a]+=v[a]*ys[i];for(let b2=0;b2<k;b2++)A[a][b2]+=v[a]*v[b2]}});
      for(let i=0;i<k;i++){let p=i;for(let r=i+1;r<k;r++)if(Math.abs(A[r][i])>Math.abs(A[p][i]))p=r;[A[i],A[p]]=[A[p],A[i]];[B[i],B[p]]=[B[p],B[i]];if(!A[i][i])return null;
        for(let r=0;r<k;r++)if(r!==i){const f=A[r][i]/A[i][i];for(let c=i;c<k;c++)A[r][c]-=f*A[i][c];B[r]-=f*B[i]}}
      return B.map((v,i)=>v/A[i][i])};
    const wr=rows.filter(r=>r.height&&r.weight&&r.cup>=0),sr=rows.filter(r=>r.height&&r.shoe);
    MODEL={height:by("heightStature","height"),cup:by("bustSize","cup"),bust:by("bustSize","bust"),waist:by("waistShape","waist"),hips:by("hipShape","hips"),
      w:fit(wr.map(r=>[r.height,r.cup]),wr.map(r=>r.weight)),s:fit(sr.map(r=>[r.height]),sr.map(r=>r.shoe))};return MODEL}
  const inch=cm=>{const i=Math.round(cm/2.54*2)/2;return(i%1?Math.floor(i)+"½":String(i))};
  const ftin=cm=>{const t=Math.round(cm/2.54*2)/2,f=Math.floor(t/12),r=t-f*12;return f+"′"+(r%1?Math.floor(r)+"½":r)+"″"};
  function sizeSuggest(c){if(!c)return{};const M=model();const pick=(m,src)=>{const k=classOf(src,c[src]);return m[k]!=null?m[k]:m._};
    const o={};const hcm=pick(M.height,"heightStature");const cupI=Math.round(pick(M.cup,"bustSize"));
    if(hcm){const h0=Math.round(hcm);o.height=`${h0} cm (${ftin(h0)})`;
      if(M.w){const w=Math.round(M.w[0]+M.w[1]*h0+M.w[2]*(cupI>=0?cupI:4));o.weight=`${w} kg (${Math.round(w*2.2046)} lb)`}
      if(M.s){const s=Math.round((M.s[0]+M.s[1]*h0)*2)/2;o.shoe="US "+(s%1?Math.floor(s)+".5":s)}}
    if(cupI>=0&&CUPS[cupI])o.cup=CUPS[cupI];
    const bust=pick(M.bust,"bustSize");if(bust)o.bust=`${Math.round(bust)} cm (${inch(Math.round(bust))}″)`;
    const wa=pick(M.waist,"waistShape");if(wa)o.waist=`${Math.round(wa)} cm (${inch(Math.round(wa))}″)`;
    const hi=pick(M.hips,"hipShape");if(hi)o.hips=`${Math.round(hi)} cm (${inch(Math.round(hi))}″)`;
    if(c.buttSize)o.butt=cap(String(c.buttSize).replace(/\s*\b(butt|bottom|rear|backside)\b/i,"").replace(/\s{2,}/g," ").replace(/,\s*$/,"").trim());
    return o}
  ACAD.sizeSuggest=sizeSuggest;
  ACAD.SIZE_FIELDS=SIZE;

  /* ---------- the Options popover ---------- */
  function bioPick(anchor,f,io){const O=opts(f);if(!O||typeof openPop!=="function")return;const cur=String(io.get()||"");
    const sug=SIZE.includes(f)?sizeSuggest(io.c?io.c():null)[f]:null;
    const sections=[];if(sug)sections.push({name:"Suggested for her body",items:[{v:sug}]});
    const label=(window.BIO_FIELDS||[]).flatMap(s=>s[2]).find(x=>x[0]===f);
    if(O.items.length)sections.push({name:O.list?"From the hundred (adds to what is there)":"From the hundred",items:O.items.map(v=>({v}))});
    const apply=v=>{if(O.list&&cur.trim()){const have=splitList(cur).map(x=>x.toLowerCase());if(have.includes(v.toLowerCase()))return;io.set(cur.replace(/[\s,;.]+$/,"")+", "+v)}else io.set(v)};
    openPop(anchor,{title:label?label[1]:f,sections,searchPlaceholder:"Search every girl's answers",current:O.list?null:cur,onPick:apply,
      custom:{placeholder:"Write your own",use:t=>apply(t)}})}
  ACAD.bioPick=bioPick;

  /* ---------- the studio's Biography step ---------- */
  if(typeof RENDER==="object"&&RENDER.bio){const r0=RENDER.bio;
    RENDER.bio=function(){const f=r0.apply(this,arguments);try{decorate(f)}catch(e){}return f}}
  const curC=()=>(typeof S!=="undefined"&&S&&S.c)||{};
  function setField(el,v){el.value=v;el.dispatchEvent(new Event("input",{bubbles:true}));el.dispatchEvent(new Event("change",{bubbles:true}))}
  function decorate(root){if(!root||!root.querySelectorAll)return;
    root.querySelectorAll(".bio-f").forEach(box=>{const el=box.querySelector("input[type=text],textarea");const lab=box.querySelector("label");if(!el||!lab||!el.id||!/^bio_/.test(el.id))return;
      const f=el.id.slice(4);if(SKIP.has(f)||!opts(f))return;if(box.querySelector(".bio-opt"))return;
      const b=document.createElement("button");b.type="button";b.className="bio-opt";b.textContent="Options";b.setAttribute("aria-haspopup","dialog");b.setAttribute("aria-label",lab.textContent+": options");
      b.addEventListener("click",()=>bioPick(b,f,{get:()=>el.value,set:v=>setField(el,v),c:curC}));lab.append(b)});
    const sec=root.querySelector('details[data-sec="sizes"]');
    if(sec&&!sec.querySelector(".bio-fill")){const btn=document.createElement("button");btn.type="button";btn.className="btn sm bio-fill";btn.textContent="Fill sizes from her body";
      btn.addEventListener("click",()=>{const s=sizeSuggest(curC());let n=0;SIZE.forEach(f=>{const el=sec.querySelector("#bio_"+f);if(el&&!el.value.trim()&&s[f]){setField(el,s[f]);n++}});
        if(typeof toast==="function")toast(n?`Filled ${n} ${n===1?"size":"sizes"} from her body. Write over any you disagree with.`:"Her sizes are already filled in.")});
      const grid=sec.querySelector(".bio-grid");if(grid)grid.before(btn)}}
  const st=document.createElement("style");st.textContent=`.bio-f label{display:flex;align-items:center;gap:8px}.bio-opt{margin-left:auto;font:inherit;font-size:12px;padding:1px 8px;border-radius:999px;border:1px solid var(--rule,rgba(0,0,0,.18));background:transparent;color:var(--muted,#666);cursor:pointer}.bio-opt:hover{color:var(--ink)}.bio-fill{margin:6px 0 4px}`;
  document.head.append(st);
})();

/* v252: and once more, after the Encyclopedia has made its own lists */
if(typeof ACAD!=="undefined"&&ACAD.purgeTidy)ACAD.purgeTidy();
/* v255: descriptions that still mentioned the nude outfits removed in v252 */
if(typeof TEMPLATES!=="undefined")TEMPLATES.forEach(t=>{if(!t||typeof t.blurb!=="string"||!/nude/i.test(t.blurb))return;
  t.blurb=t.blurb.replace(/ Off duty, or nude\./g," Off duty.").replace(/ and a nude outfit\./g,".").replace(/\s*Like every house's cheer entry, no Nude outfit\./g,"").trim()});

/* ---- v261: a wardrobe for every boy of the Houses and every headmistress, as each girl has: four looks of their own.
   A boy: House robes (the consistent House-robes outfit, which "Load him" now loads), his Signature look (his own
   clothes), House regalia and Group colors, cut for a young man. A headmistress: Faculty robes (one academic gown, cut
   the same for every headmistress in her House's colors, which "Load her" now loads), her Signature look (her own
   faculty outfit), House regalia and Group colors. Each look takes face, hair and build from the boy or headmistress
   himself or herself; only the clothes change. Runs after the admin's figure edits so the looks follow them. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof START==="undefined"||typeof tplById!=="function")return;
  const HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||ACAD.cap(h),low=n=>String(n||"").replace(/^The /,"the ");
  const clone=o=>JSON.parse(JSON.stringify(o));
  const STAND={him:"standing straight, facing the viewer, arms relaxed at his sides",her:"standing straight, facing the viewer, arms relaxed at her sides"};
  START.option("posture",STAND.him,"Academy");
  const MUST="an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes";
  const mustAt=s=>`an anime style with high detail, ${String(s).replace(/^(in|on|atop) /,"")}, and particular emphasis on highly detailed skin, hair and eyes`;
  const item=(f,v,fam)=>{if(v&&typeof v==="string")START.item(f,v,"CU",fam||"costume")};
  /* a boy's pieces are tagged as his, so the studio's men's lists offer them */
  const reg=(items,male)=>Object.entries(items).forEach(([f,a])=>{const v=Array.isArray(a)?a[0]:a;item(f,v);
    if(male&&typeof OSEX==="object"&&typeof itemSexFits==="function"&&!itemSexFits(f,v,true)){OSEX[f]=OSEX[f]||{};OSEX[f][v]="m"}});
  /* what a young man doesn't wear, and what he wears instead */
  const FEM=/\b(breasts?|bust|cleavage|bras?|bralette|bikini|skirts?|lingerie|garters?|thigh-highs?|stockings|pantyhose|heels|stilettos?|pumps|corset|camisole|blouse|dress|gown|tiara|veil|choker|pearls?|lace|ribbon|bow\b|bows\b|earrings?|mary janes|ballet flats|knee socks|tights|bouquet|parasol|fan\b|clutch|purse|handbag|hair ?pin|hair ?clip|barrette|circlet|diadem|anklet|bangles?|feather boa|ruffle|frill)/i;
  const manify=(f,a,h)=>{if(!Array.isArray(a))return a;let v=String(a[0]||"");const w=a.slice();
    if(f==="corset"){w[0]=v.replace(/\bbrocade corset\b/i,"brocade waistcoat").replace(/\bcorset\b/i,"waistcoat");return w}
    if(f==="top"){w[0]=v.replace(/\bsilk blouse\b/i,"silk shirt").replace(/\bblouse\b/i,"shirt");return FEM.test(w[0])?["crisp collared button-up shirt",a[1]]:w}
    if(f==="bottom"){if(/skirt/i.test(v)){const trim=/edged in (.+?) trim/i.exec(v);w[0]=trim?`{c} tailored trousers edged in ${trim[1]} trim`:"{c} tailored trousers";w.length=2;w[1]=a[1];return w}return FEM.test(v)?["{c} tailored trousers",a[1]]:w}
    if(f==="legwear")return FEM.test(v)||/\bsocks\b/i.test(v)?["{c} polished leather knee boots",a[1]&&a[1]!=="-"?a[1]:"@primary"]:w;
    if(f==="neckAccessory")return FEM.test(v)?["{c} silk cravat with a {c2} crest pin",a[1]||"@accent",null,a[3]||"@secondary"]:w;
    if(f==="outerwear")return FEM.test(v)?["long {c} open-front robe with a high standing collar, wide sleeves and {c2} lining",a[1],null,a[3]||"@secondary"]:w;
    if(f==="headwear"||f==="earAccessory"||f==="hairAccessory"||f==="gloves"||f==="bra"||f==="waistAccessory")return FEM.test(v)?null:w;
    return FEM.test(v)?null:w};
  const manItems=(items,h)=>{const o={};Object.entries(items||{}).forEach(([f,a])=>{const m=manify(f,a,h);if(m)o[f]=m});return o};

  /* the Synth's and the Void's Houses keep no regalia of their own; their boys and headmistresses get the Academy's
     ceremonial cut in their House's colors */
  const GENREG=(h,sex)=>{const hn=String(HN(h)).toLowerCase();const it={outerwear:["long {c} ceremonial hooded robe with {c2} embroidered trim","@primary",null,"@accent"],
      corset:[sex==="m"?"{c} brocade waistcoat":"{c} brocade corset","@secondary"],top:[sex==="m"?"{c} silk shirt":"{c} silk blouse","@third"],
      bottom:[sex==="m"?"{c} tailored trousers":"long {c} pleated skirt","@primary"],legwear:[sex==="m"?"{c} polished leather knee boots":"sheer black stockings",sex==="m"?"@primary":"-"],
      neckAccessory:[sex==="m"?"{c} silk cravat with a {c2} crest pin":"{c}-and-{c2} striped necktie","@accent",null,"@secondary"],tagCharm:[hn+" crest brooch","@accent"]};
    reg(it,sex==="m");return {outfit:{oname:"House regalia",look:"costume",items:it,details:{},dcol:{}},out:{framing:"full body",must:MUST}}};
  const BOY=[],HEAD=[];
  function boy(h){const m=tplById(h+"man");if(!m||!m.bio||!m.bio.fullName)return;const n=m.bio.fullName,g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h);
    const robes=(m.more||[]).find(o=>/House robes/i.test(o.oname||""));
    const base={c:{posture:STAND.him},out:{framing:"cowboy shot",must:MUST},more:[]};
    if(robes)BOY.push(Object.assign(clone(base),{id:h+"manrobes",base:h+"man",name:`${n} in ${HN(h)} House robes`,
      blurb:`${n} of ${HN(h)} House in his House robes: ${Object.values(robes.items).map(a=>String(a[0]).replace(/\{c2?\}\s?/g,"")).slice(0,4).join(", ")}.`,
      outfit:clone(robes),tags:[h,"academy","house robes","man"]}));
    /* his Signature look is his own template: his own clothes, and the other outfits he keeps */
    const R=tplById(h+"regalia")||GENREG(h,"m");
    if(R&&R.outfit){const it=manItems(R.outfit.items,h);reg(it,true);
      BOY.push({id:h+"manregalia",base:h+"man",name:`${n} in ${HN(h)} regalia`,blurb:`${n} in his House's full regalia, the ceremonial robe his House wears on Choosing Morning, Founders' Night and at Graduation.`,
        c:{posture:STAND.him},outfit:{oname:"House regalia",look:"costume",items:it,details:clone(R.outfit.details||{}),dcol:{}},more:[],out:Object.assign({},R.out||{},{framing:"full body"}),tags:[h,"academy","house regalia","man"]})}
    const G=tplById(h+"gcolors");
    if(G&&G.outfit&&g){const it=manItems(G.outfit.items,h);reg(it,true);
      BOY.push({id:h+"mangcolors",base:h+"man",name:`${n} in ${low(g.name).replace(/^the /,"")} colors`,blurb:`${n} in ${low(g.name)}'s colors, cut for a young man.`,
        c:{posture:STAND.him},outfit:{oname:G.outfit.oname,look:G.outfit.look||"preppy",items:it,details:{},dcol:{}},more:[],out:Object.assign({},G.out||{},{framing:"cowboy shot"}),tags:[h,"academy","group colors","man"]})}}
  /* the faculty robes: one gown for every headmistress, in her House's colors */
  const FAC={top:["high-collared silk blouse","@secondary"],bottom:["long {c} pleated skirt","@primary"],
    outerwear:["long {c} academic gown with {c2} velvet facings and bell sleeves","@primary",null,"@secondary"],
    neckAccessory:["{c}-and-{c2} striped necktie","@third",null,"@primary"],legwear:["sheer black stockings","-"]};
  reg(FAC);
  function head(h){const t=tplById(h+"head");if(!t||!t.bio||!t.bio.fullName)return;const n=t.bio.fullName,g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h);
    const it=clone(FAC);it.tagCharm=[`${String(HN(h)).toLowerCase()} crest brooch`,"@accent"];item("tagCharm",it.tagCharm[0]);
    HEAD.push({id:h+"headrobes",base:h+"head",name:`${n} in faculty robes`,blurb:`${n}, Headmistress of ${HN(h)} House, in faculty robes: a long academic gown with velvet facings over a high-collared blouse and a long pleated skirt, in ${HN(h)} House's colors, with the ${HN(h)} crest brooch.`,
      c:{posture:STAND.her},outfit:{oname:"Faculty robes",look:"preppy",items:it,details:{},dcol:{}},more:[],out:{framing:"cowboy shot",must:MUST},tags:[h,"academy","faculty robes","headmistress"]});
    /* her Signature look is her own template, her individual faculty outfit */
    const R=tplById(h+"regalia")||GENREG(h,"f");
    if(R&&R.outfit)reg(R.outfit.items);
    if(R&&R.outfit)HEAD.push({id:h+"headregalia",base:h+"head",name:`${n} in ${HN(h)} regalia`,blurb:`${n} in her House's full regalia, as she wears it on Choosing Morning, Founders' Night and at Graduation.`,
      c:{posture:STAND.her},outfit:Object.assign(clone(R.outfit),{oname:"House regalia"}),more:[],out:Object.assign({},R.out||{},{framing:"full body"}),tags:[h,"academy","house regalia","headmistress"]});
    const G=tplById(h+"gcolors");
    if(G&&G.outfit&&g)reg(G.outfit.items);
    if(G&&G.outfit&&g)HEAD.push({id:h+"headgcolors",base:h+"head",name:`${n} in ${low(g.name).replace(/^the /,"")} colors`,blurb:`${n} in ${low(g.name)}'s colors.`,
      c:{posture:STAND.her},outfit:clone(G.outfit),more:[],out:Object.assign({},G.out||{},{framing:"cowboy shot"}),tags:[h,"academy","group colors","headmistress"]})}
  (ACAD.HOUSES||[]).forEach(h=>{try{boy(h);head(h)}catch(e){console.warn("wardrobe261 "+h,e)}});
  START.add("Academy Boys' Wardrobe",BOY,{after:"Academy Group Colors"});
  START.add("Academy Headmistresses' Wardrobe",HEAD,{after:"Academy Boys' Wardrobe"});
  /* not filed under the girls' looks (ACAD.CATS): these are the boys' and headmistresses' own, on their own pages */
  /* the looks a page offers, in order; the first is what Load him / Load her loads */
  ACAD.WARDROBE={boy:h=>[[h+"manrobes","House robes"],[h+"man","Signature look"],[h+"manregalia","House regalia"],[h+"mangcolors","Group colors"]].filter(([id])=>tplById(id)),
    head:h=>[[h+"headrobes","Faculty robes"],[h+"head","Signature look"],[h+"headregalia","House regalia"],[h+"headgcolors","Group colors"]].filter(([id])=>tplById(id))};
  ACAD.mainLook=(h,kind)=>{const w=ACAD.WARDROBE[kind](h);return w.length?w[0][0]:h+(kind==="boy"?"man":"head")};
  window.WARDROBE261={boys:BOY.length,heads:HEAD.length};
})();

/* ---- v254: each chapter's opening paragraph as the canon changes layer has it (edits.lore["lead.<page>"]). The World
   Overview is edited block by block instead ("world.blocks"). Every chapter and collection page with an opening takes
   part; the replaced opening is marked as new lore. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.pages||typeof ACAD==="undefined"||!ACAD.lore)return;
  /* the World Overview's list of factions, now that added and moved groups have found their factions */
  {const pw=ENC.pages.world,bl=pw&&pw.blocks;if(bl&&ENC.WORLD_FLIST&&!(ACAD.loreEdited&&ACAD.loreEdited("world.blocks"))){const b=bl.find(x=>x[0]==="list"&&/^\[\[faction:/.test(String((x[1]||[])[0]||"")));if(b)b[1]=ENC.WORLD_FLIST()}}
  ENC.LEAD_PAGES=Object.keys(ENC.pages).filter(id=>!/:/.test(id)&&id!=="world"&&typeof ENC.pages[id].build==="function");
  ENC.LEAD_PAGES.forEach(id=>{const p=ENC.pages[id];const b0=p.build;
    p.build=function(el){b0.apply(this,arguments);if(!ACAD.loreEdited||!ACAD.loreEdited("lead."+id))return;
      const lead=el.querySelector(".enc-lead");if(!lead)return;const v=ACAD.lore("lead."+id,"");
      lead.textContent="";lead.classList.remove("enc-c");lead.classList.add("enc-n");lead.append(...[].concat(ENC.rich(v)),ENC.tagEl("n"))}});
})();

/* ---- v257: a page for every boy of the Houses (boy:<house>): who he is, his story, his character, his favorites and
   family, his people (his partner, his best friend, the other boys of his group, his rivals), his student record and his
   looks in the studio. Linked from her House page, the Boys of the Houses chapter and search.
   v260: he is himself first: his House title and his role among his group's boys lead the page, his rivals are his own,
   and she is listed among his people as his partner. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.page||typeof ACAD==="undefined"||typeof tplById!=="function")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl;
  const low=n=>String(n||"").replace(/^The /,"the ");
  const boy=h=>{const t=tplById(h+"man");return t&&t.bio&&t.bio.fullName?t:null};
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  /* names of boys and girls in his text lead to their pages */
  function people(text){if(!text)return "";const out=[];let s=String(text);
    const names=[];(ACAD.HOUSES||[]).forEach(h=>{const t=boy(h);if(t)names.push([t.bio.fullName,"boy:"+h])});
    names.sort((a,b)=>b[0].length-a[0].length);
    const rx=new RegExp("("+names.map(n=>n[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")","g");
    let last=0;s.replace(rx,(m,_,i)=>{out.push(s.slice(last,i));const n=names.find(x=>x[0]===m);out.push(lnk(n[1],m));last=i+m.length;return m});out.push(s.slice(last));
    return ENC.linkNames?out.map(x=>typeof x==="string"?ENC.linkNames(x):x):out}
  const dl=rows=>E("dl",{class:"enc-facts enc-n"},rows.filter(([,v])=>v).map(([k,v])=>[E("dt",null,k),E("dd",null,v)]),E("div",{class:"enc-facts-tag"},tag("n")));
  function build(el,h){const t=boy(h);if(!t)return;const b=t.bio,g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h),c=ENC.crestCols&&g?ENC.crestCols(g.id):{field:"#3b3a58",band:"#b39b62"},ink=ENC.inkOn?ENC.inkOn(c.field):"#fff";
    const year=String(b.occupation||"").replace(/:.*/,"");
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 60%,${c.band} 170%)`,color:ink}},
      g&&ACAD.crestURL?E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL(g.id)})`}}):null,
      E("div",{class:"enc-row"},(ACAD.portraitURL&&ACAD.portraitURL(h+"man"))?E("img",{src:ACAD.portraitURL(h+"man"),alt:"Portrait of "+b.fullName,width:96,height:96,style:{borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.7)",background:"#fff"}}):(ENC.pixel?ENC.pixel(h,96):null),
        E("div",null,E("h1",null,b.fullName),E("p",{class:"kind"},(b.title?b.title+". ":"")+`${year?year.charAt(0)+year.slice(1).toLowerCase()+" of":"A student of"} ${HN(h)} House`+(b.nickname?`. Also ${b.nickname}`:"")),
          b.catchphrase?E("p",{class:"motto"},b.catchphrase):null,
          E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},HN(h)+" House"+(g?", "+g.name:"")))),
      E("div",{class:"band",style:{background:c.band}})));
    const main=E("div");
    if(b.summary)main.append(E("p",{class:"enc-lead enc-n"},b.summary,tag("n")));
    if(b.groupRole)main.append(E("h3",{class:"enc-h"},"In his House"),E("p",{class:"enc-p enc-n"},people(b.groupRole),tag("n")));
    if(b.backstory)main.append(E("h3",{class:"enc-h"},"His story"),E("p",{class:"enc-p enc-n"},people(b.backstory),tag("n")));
    main.append(E("h3",{class:"enc-h"},"Character"),dl([["Traits",b.traits],["Strengths",b.strengths],["Flaws",b.flaws],["Likes",b.likes],["Dislikes",b.dislikes],["Hobbies",b.hobbies],["Habits",b.habits],["Fears",b.fears],["Dreams",b.dreams]]));
    main.append(E("h3",{class:"enc-h"},"His people"),E("ul",{class:"enc-list enc-n"},
      E("li",null,E("b",null,"Partner. "),lnk("house:"+h,B(h).fullName||HN(h)),", the Keeper of "+HN(h)+" House."),
      b.bestFriends?E("li",null,E("b",null,"Best friend. "),...[].concat(people(b.bestFriends))):null,
      b.friends?E("li",null,E("b",null,"Friends. "),...[].concat(people(b.friends))):null,
      b.rivals?E("li",null,E("b",null,"Rivals. "),...[].concat(people(b.rivals))):null,
      E("li",{class:"enc-list-tag"},tag("n"))));
    /* v261: his wardrobe, as a girl's page has hers */
    {const W=ACAD.WARDROBE?ACAD.WARDROBE.boy(h):[];const lb=W.map(([id,l])=>ENC.loadBtn(id,l)).filter(Boolean);
     if(lb.length)main.append(E("h3",{class:"enc-h"},"Load him"),E("p",{class:"enc-note"},"His four looks. Each keeps his face, hair and build; only the clothes change."),E("div",{class:"enc-loads"},lb))}
    main.append(E("h3",{class:"enc-h"},"Favorites"),dl([["Colors",b.favColor],["Food",b.favFood],["Drink",b.favDrink],["Dessert",b.favDessert],["Subject",b.favSubject],["Music",b.favMusic],["Book or film",b.favBook],["Season",b.favSeason],["Flower",b.favFlower],["Animal",b.favAnimal],["Place",b.favPlace],["Scent",b.favScent]]));
    main.append(E("h3",{class:"enc-h"},"Family"),dl([["Mother",b.mother],["Father",b.father],["Siblings",b.siblings],["Family",b.family]]));
    if(b.notes)main.append(E("h3",{class:"enc-h"},"Overheard"),E("p",{class:"enc-p enc-n"},people(b.notes),tag("n")));
    const rec=[["Title",b.title],["Age",b.age],["Studies",String(b.occupation||"").replace(/^[^:]*:\s*/,"")],["House",HN(h)+" House"],["From",b.birthplace],["Languages",b.languages],["Height",b.height],["Pets",b.pets]].filter(([,v])=>v);
    /* v261: the portrait card, once one is uploaded */
    const pcard=ACAD.portraitURL&&ACAD.portraitURL(h+"man",true)?E("div",{class:"enc-card"},E("img",{src:ACAD.portraitURL(h+"man",true),alt:"Portrait of "+b.fullName,style:{width:"100%",height:"auto",borderRadius:"6px",display:"block"}})):null;
    const side=E("aside",{class:"enc-side"},pcard,
      E("div",{class:"enc-card"},E("h4",null,"Student record"),E("dl",null,rec.map(([k,v])=>[E("dt",null,k),E("dd",null,v)])),tag("n")),
      E("div",{class:"enc-card"},E("h4",null,"In the studio"),E("p",{class:"enc-note",style:{marginTop:0}},"Loads him in his House robes. His other looks are under Load him."),E("div",{class:"enc-loads"},ENC.loadBtn?ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"boy"):h+"man"),"Load him"):null,E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("house:"+h)},(B(h).fullName?B(h).fullName.split(/\s+/)[0]+"'s":"Her")+" page"))));
    el.append(E("div",{class:"enc-cols"},main,side))}
  const make=h=>{const t=boy(h);if(!t||ENC.pages["boy:"+h])return;const b=t.bio;
    ENC.page("boy:"+h,{title:b.fullName,short:b.fullName,sec:"boyfriends",crumbs:["boyfriends","house:"+h],kind:"Boys of the Houses",
      searchText:()=>[b.fullName,b.nickname,b.title,HN(h),b.occupation,b.groupRole,b.summary,b.backstory,b.birthplace,b.likes,b.hobbies].join(" "),
      build:el=>build(el,h)})};
  (ACAD.HOUSES||[]).forEach(make);
  ENC.boyPage=h=>{make(h);return ENC.pages["boy:"+h]?"boy:"+h:null};
})();
/* ---- v260: a page for every headmistress (head:<house>): who she is, her House (the years she kept it, the year she took
   its chair, whether it slept, how she chose the Keeper who keeps it now), her story, her character, her favorites and
   family, her record and her look in the studio. Linked from her House page, the Academy's list of headmistresses, her
   group's page and her principal's page, and found by search. ---- */
(function(){
  if(typeof ENC==="undefined"||!ENC.page||typeof ACAD==="undefined"||typeof tplById!=="function")return;
  const E=ENC.E,HN=ENC.HN,lnk=ENC.lnk,tag=ENC.tagEl;
  const low=n=>String(n||"").replace(/^The /,"the ");
  const head=h=>{const t=tplById(h+"head");return t&&t.bio&&t.bio.fullName?t:null};
  const B=h=>(typeof BIOS!=="undefined"&&BIOS[h])||{};
  const SV=h=>{const g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h);return !!(g&&g.apart)};
  /* the year each House woke, as the headmistresses' biographies have it now (an admin's change included) */
  ACAD.WOKE=ACAD.WOKE||{};(ACAD.HOUSES||[]).forEach(h=>{const t=head(h);if(t&&t.bio.woke!==undefined){if(t.bio.woke)ACAD.WOKE[h]=String(t.bio.woke);else delete ACAD.WOKE[h]}});
  /* the people her text names lead to their pages: the headmistresses, the boys and (through ENC.linkNames) the girls */
  function people(text){if(!text)return "";const s=String(text),names=[];
    (ACAD.HOUSES||[]).forEach(x=>{const a=head(x),m=tplById(x+"man");if(a)names.push([a.bio.fullName,"head:"+x]);if(m&&m.bio&&m.bio.fullName&&ENC.pages["boy:"+x])names.push([m.bio.fullName,"boy:"+x])});
    if(!names.length)return ENC.linkNames?ENC.linkNames(s):s;
    names.sort((a,b)=>b[0].length-a[0].length);
    const rx=new RegExp("("+names.map(n=>n[0].replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")","g");const out=[];let last=0;
    s.replace(rx,(m,_,i)=>{out.push(s.slice(last,i));const n=names.find(x=>x[0]===m);out.push(lnk(n[1],m));last=i+m.length;return m});out.push(s.slice(last));
    return ENC.linkNames?out.map(x=>typeof x==="string"?ENC.linkNames(x):x):out}
  const dl=rows=>E("dl",{class:"enc-facts enc-n"},rows.filter(([,v])=>v).map(([k,v])=>[E("dt",null,k),E("dd",null,v)]),E("div",{class:"enc-facts-tag"},tag("n")));
  const since=b=>String(b.headSince||"").trim();
  /* how her House stands: awake through the centuries, woke in the Great Waking, or (Synth, Void) its own story */
  function awake(h,b){if(SV(h))return "";const w=b.woke!==undefined?b.woke:(ACAD.WOKE||{})[h];
    if(w)return `Slept until ${w}; woke in the Great Waking, and she came back with it`;
    return ACAD.NEVERSLEPT&&ACAD.NEVERSLEPT.has(h)?"Awake since before the Great Waking":""}
  function build(el,h){const t=head(h);if(!t)return;const b=t.bio,g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h),c=ENC.crestCols&&g?ENC.crestCols(g.id):{field:"#3b3a58",band:"#b39b62"},ink=ENC.inkOn?ENC.inkOn(c.field):"#fff";
    const P=g&&(ACAD.PRINCIPALS||{})[g.id],girl=B(h);
    el.append(E("div",{class:"enc-banner",style:{background:`linear-gradient(135deg,${c.field} 0%,${c.field} 60%,${c.band} 170%)`,color:ink}},
      g&&ACAD.crestURL?E("div",{class:"pat",style:{backgroundImage:`url(${ACAD.crestURL(g.id)})`}}):null,
      E("div",{class:"enc-row"},(ACAD.portraitURL&&ACAD.portraitURL(h+"head"))?E("img",{src:ACAD.portraitURL(h+"head"),alt:"Portrait of "+b.fullName,width:96,height:96,style:{borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.7)",background:"#fff"}}):(ENC.pixel?ENC.pixel(h,96):null),
        E("div",null,E("h1",null,b.fullName),E("p",{class:"kind"},`Headmistress of ${HN(h)} House`+(b.address?`. Addressed as ${b.address}`:"")),
          b.catchphrase?E("p",{class:"motto"},b.catchphrase):null,
          E("a",{href:"#",class:"pill",onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},HN(h)+" House"+(g?", "+g.name:"")))),
      E("div",{class:"band",style:{background:c.band}})));
    const main=E("div");
    if(b.summary)main.append(E("p",{class:"enc-lead enc-n"},people(b.summary),tag("n")));
    main.append(E("h3",{class:"enc-h"},"Her House"),dl([["Keeper",b.keeperYears?(SV(h)?b.keeperYears:`${b.keeperYears}, as ${HN(h)}`):""],["Headmistress since",since(b)],["The House",awake(h,b)],["Teaches",b.teaches],
      ["Her Keeper",girl.fullName?[lnk("house:"+h,girl.fullName),`, ${HN(h)} of ${low(g?g.name:"")}`.replace(/ of $/,"")]:lnk("house:"+h,HN(h))],
      ["Answers to",P?[lnk("principal:"+g.id,P.full),`, principal of ${low(g.name)}`]:""]]));
    if(b.choosing)main.append(E("h3",{class:"enc-h"},"How she chose her Keeper"),E("p",{class:"enc-p enc-n"},people(b.choosing),tag("n")));
    if(b.backstory)main.append(E("h3",{class:"enc-h"},"Her story"),E("p",{class:"enc-p enc-n"},people(b.backstory),tag("n")));
    main.append(E("h3",{class:"enc-h"},"Character"),dl([["Traits",b.traits],["Strengths",b.strengths],["Flaws",b.flaws],["Likes",b.likes],["Dislikes",b.dislikes],["Hobbies",b.hobbies],["Habits",b.habits],["Fears",b.fears],["Dreams",b.dreams]]));
    if(b.friends||b.rivals)main.append(E("h3",{class:"enc-h"},"Her people"),E("ul",{class:"enc-list enc-n"},
      b.friends?E("li",null,E("b",null,"Friends. "),...[].concat(people(b.friends))):null,
      b.rivals?E("li",null,E("b",null,"Rivals. "),...[].concat(people(b.rivals))):null,E("li",{class:"enc-list-tag"},tag("n"))));
    /* v261: her wardrobe */
    {const W=ACAD.WARDROBE?ACAD.WARDROBE.head(h):[];const lb=W.map(([id,l])=>ENC.loadBtn(id,l)).filter(Boolean);
     if(lb.length)main.append(E("h3",{class:"enc-h"},"Load her"),E("p",{class:"enc-note"},"Her four looks. Each keeps her face, hair and build; only the clothes change."),E("div",{class:"enc-loads"},lb))}
    main.append(E("h3",{class:"enc-h"},"Favorites"),dl([["Colors",b.favColor],["Food",b.favFood],["Drink",b.favDrink],["Dessert",b.favDessert],["Subject",b.favSubject],["Music",b.favMusic],["Book or film",b.favBook],["Season",b.favSeason],["Flower",b.favFlower],["Animal",b.favAnimal],["Place",b.favPlace],["Scent",b.favScent]]));
    main.append(E("h3",{class:"enc-h"},"Family"),dl([["Mother",b.mother],["Father",b.father],["Siblings",b.siblings],["Family",b.family],["Status",b.status&&b.partner?`${b.status}, to ${b.partner}`:b.status]]));
    if(b.notes)main.append(E("h3",{class:"enc-h"},"Overheard"),E("p",{class:"enc-p enc-n"},people(b.notes),tag("n")));
    const rec=[["Address",b.address],["Age",b.age],["Born",b.dob&&!/^Unrecorded/.test(b.dob)?b.dob:""],["From",b.birthplace],["Languages",b.languages],["Height",b.height],
      ["House",HN(h)+" House"],["Group",g?lnk("group:"+g.id,g.name):""]].filter(([,v])=>v);
    /* v261: the portrait card, once one is uploaded */
    const pcard=ACAD.portraitURL&&ACAD.portraitURL(h+"head",true)?E("div",{class:"enc-card"},E("img",{src:ACAD.portraitURL(h+"head",true),alt:"Portrait of "+b.fullName,style:{width:"100%",height:"auto",borderRadius:"6px",display:"block"}})):null;
    const side=E("aside",{class:"enc-side"},pcard,
      E("div",{class:"enc-card"},E("h4",null,"Faculty record"),E("dl",null,rec.map(([k,v])=>[E("dt",null,k),E("dd",null,v)])),tag("n")),
      E("div",{class:"enc-card"},E("h4",null,"In the studio"),E("p",{class:"enc-note",style:{marginTop:0}},"Loads her in her faculty robes. Her other looks are under Load her."),
        E("div",{class:"enc-loads"},ENC.loadBtn?ENC.loadBtn((ACAD.mainLook?ACAD.mainLook(h,"head"):h+"head"),"Load her"):null,E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("house:"+h)},"Her Keeper's page"))));
    el.append(E("div",{class:"enc-cols"},main,side))}
  const make=h=>{const t=head(h);if(!t||ENC.pages["head:"+h])return;const b=t.bio;
    ENC.page("head:"+h,{title:b.fullName,short:b.fullName,sec:"academy",crumbs:["academy","house:"+h],kind:"Headmistresses",
      searchText:()=>[b.fullName,b.address,b.nickname,"headmistress",HN(h),b.teaches,b.summary,b.backstory,b.choosing,b.birthplace,b.keeperYears].join(" "),
      build:el=>build(el,h)})};
  (ACAD.HOUSES||[]).forEach(make);
  ENC.headPage=h=>{make(h);return ENC.pages["head:"+h]?"head:"+h:null};

  /* ---------- her group's page: their headmistresses, by name ---------- */
  const vis=gid=>{const c=ENC.crestCols?ENC.crestCols(gid):null;return c?c.band:"#b39b62"};
  (ACAD.GROUPS||[]).forEach(g=>{const p=ENC.pages["group:"+g.id];if(!p||!p.build||p.build.heads260)return;const ob=p.build;
    p.build=function(el){ob.apply(this,arguments);const mainCol=el.querySelector(".enc-cols>div");if(!mainCol)return;
      const hs=g.members.map(h=>{const t=head(h);if(!t)return null;const id=ENC.headPage(h);
        const b=E("button",{type:"button",class:"enc-chip enc-chip-px",title:"Headmistress of "+HN(h)+" House",onclick:()=>ENC.go(id||"house:"+h)});
        const im=ENC.pixel?ENC.pixel(h,18):null;if(im)b.append(im);b.append(E("span",null,t.bio.fullName));b.style.setProperty("--gc",vis(g.id));return b}).filter(Boolean);
      if(!hs.length)return;
      const hdr=E("h3",{class:"enc-h"},"Their headmistresses"),note=E("p",{class:"enc-note"},"Each was once her House's Keeper. They are all in ",lnk("academy","The Academy"),"."),row=E("div",{class:"enc-chips",style:{padding:0}},hs);
      /* before the boys, when the boys are there */
      const boysH=[...mainCol.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="Their boys");
      if(boysH)boysH.before(hdr,note,row);else mainCol.append(hdr,note,row)};
    p.build.heads260=true});

  /* ---------- the principal's page: his headmistresses lead to theirs (his biography names them) ---------- */
  /* ---------- her House's page: the headmistress card names her and leads to her page ---------- */
  const bh=ENC.buildHouse;
  if(bh)ENC.buildHouse=(el,h)=>{bh(el,h);const t=head(h);if(!t)return;
    const card=[...el.querySelectorAll(".enc-side .enc-card")].find(c=>{const x=c.querySelector("h4");return x&&x.textContent==="Her headmistress"});if(!card)return;
    const b=t.bio,id=ENC.headPage(h),p=card.querySelector("p");
    const top=E("div",null,E("p",{style:{fontSize:"15px",margin:"0 0 2px",fontWeight:600}},id?lnk(id,b.fullName):b.fullName),
      E("p",{class:"enc-note",style:{margin:"0 0 8px"}},[b.address,b.keeperYears&&!SV(h)?"Keeper "+b.keeperYears:"",since(b)?"in the chair since "+since(b).replace(/,.*$/,""):""].filter(Boolean).join("; ")+"."));
    card.querySelector("h4").after(top);
    if(p){p.textContent=String(t.blurb||"").replace(/^[^:]*:\s*/,"").replace(/ In the .* robes\.$/,"").replace(/^./,c=>c.toUpperCase())}
    if(id){const go=E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go(id)},"Read her page"),ld=card.querySelector(".enc-loads");
      if(ld)ld.append(go);else card.append(E("div",{class:"enc-loads",style:{marginTop:"10px"}},go))}
    /* who she answers to: her headmistress by name */
    const li=[...el.querySelectorAll(".enc-chain li")].find(x=>/^Her headmistress/.test(x.textContent));
    if(li){li.textContent="";li.append("Her headmistress, ",id?lnk(id,b.fullName):b.fullName)}};
})();

/* ---- v256: records. Every girl, group, faction, place, lost group and member of the faculty is a record with a stable id,
   an author and the revision it last changed in. The originals are Hummus's, at revision 0; a record added from a
   submission is credited to the player who made it. Their pages say who made them.
   ACAD.perm says who may do what: Hummus (the admin) may change and relate every record and is the only one who may make
   moderators; a moderator reviews submissions; a player changes only her own records, and a relationship with someone
   else's girl waits until that girl's author accepts it. The hosted version runs the same rules on its server. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon)return;
  const C=ACAD.canon,ADMIN="Hummus";
  const cj=v=>v===undefined?v:JSON.parse(JSON.stringify(v));
  const HN=h=>typeof ENC!=="undefined"&&ENC.HN?ENC.HN(h):((ACAD.HNAME&&ACAD.HNAME[h])||h);
  const E=()=>typeof ENC!=="undefined"?ENC:{};
  const KIND={girl:"girl",group:"group",faction:"faction",place:"place",lost:"lost group",staff:"member of the faculty"};

  /* ---------- relationships: what a layer adds or drops, part by part ---------- */
  const PAIRS=["SG","RV","FAM","FLING"];
  const pkey=(part,a,b)=>part+"|"+[a,b].sort().join("|");
  const bfPairs=m=>{const o=new Map();Object.entries(m||{}).forEach(([a,l])=>(l||[]).forEach(b=>{const k=pkey("BF",a,b);if(!o.has(k))o.set(k,["BF",a,b].concat([]))}));return o};
  let asWritten=null;const written=()=>asWritten||(asWritten=(C.data().rel)||{});
  /* the relationships as they stood before these drafts: the saved layer's, or as written */
  const prior=part=>{const be=((C.base().edits)||{}).rel||{};return be[part]!==undefined?be[part]:written()[part]};
  function relDiff(rel,before){const add=[],drop=[];before=before||prior;
    /* a couple's kind is settled the same way on both sides before comparing (v253) */
    const settled=(part,l)=>{if(part!=="SG"||!Array.isArray(l)||!ACAD.ROM||!ACAD.ROM.settle)return l;const x={SG:cj(l),RV:cj((ACAD.RELDATA||{}).RV||[])};ACAD.ROM.settle(x);return x.SG};
    Object.keys(rel||{}).forEach(part=>{const now=settled(part,rel[part]),was=settled(part,before(part));
      if(part==="BF"){const A=bfPairs(now),B=bfPairs(was);A.forEach((v,k)=>{if(!B.has(k))add.push(v)});B.forEach((v,k)=>{if(!A.has(k))drop.push(v)});return}
      if(!PAIRS.includes(part)||!Array.isArray(now))return;
      const idx=l=>{const m=new Map();(l||[]).forEach(e=>m.set(pkey(part,e[0],e[1]),e));return m};const A=idx(now),B=idx(was);
      A.forEach((e,k)=>{if(!B.has(k)||JSON.stringify(B.get(k))!==JSON.stringify(e))add.push([part].concat(cj(e)))});B.forEach((e,k)=>{if(!A.has(k))drop.push([part,e[0],e[1]])})});
    return {add,drop}}

  /* ---------- the records a layer (drafts, a change set) touches ---------- */
  function touched(d,opt){const k=new Set(),Ed=(d&&d.edits)||{},Ad=(d&&d.add)||{};const put=(kind,id)=>k.add(kind+":"+id);
    ["names","bios","roles","looks"].forEach(x=>Object.keys(Ed[x]||{}).forEach(h=>put("girl",h)));
    Object.keys(Ed.figures||{}).forEach(id=>{const p=/^principal(.+)$/.exec(id),m=/^(.+?)(man|head)$/.exec(id);if(p)put("group",p[1]);else if(m)put("girl",m[1])});
    Object.keys(Ad.girls||{}).forEach(h=>put("girl",h));
    ["groups","glooks","gextra"].forEach(x=>Object.keys(Ed[x]||{}).forEach(g=>put("group",g)));Object.keys(Ad.groups||{}).forEach(g=>put("group",g));
    Object.keys(Ed.factions||{}).forEach(f=>put("faction",f));Object.entries(Ad.factions||{}).forEach(([f,a])=>{put("faction",f);put("staff",(a&&a.dean&&a.dean.id)||("dean"+f))});
    Object.keys(Ed.staff||{}).forEach(s=>put("staff",s));Object.keys(Ed.boys||{}).forEach(h=>put("girl",h));Object.keys(Ed.heads||{}).forEach(h=>put("girl",h));
    /* v261: images: a girl's own, or her boy's or headmistress's portrait (keyed <house>man, <house>head) */
    Object.keys(Ed.images||{}).forEach(k=>{const m=/^(.+?)(man|head)$/.exec(k);put("girl",m&&(ACAD.HOUSES||[]).includes(m[1])?m[1]:k)});
    ["lost","champ"].forEach(x=>Object.keys(Ed[x]||{}).forEach(l=>put("lost",l)));Object.keys(Ad.lost||{}).forEach(l=>put("lost",l));
    Object.keys(Ed.also||{}).forEach(hid=>{const g=(E().ROLL||[]).find(x=>x.houses.some(y=>y.id===hid));if(g)put("lost",g.id)});
    Object.keys(Ed.places||{}).forEach(p=>put("place",p));Object.keys(Ad.places||{}).forEach(p=>put("place",p));
    /* relationships: both girls of every pair added, changed or dropped */
    const r=d&&d.rel&&Array.isArray(d.rel.add)?d.rel:relDiff(Ed.rel);
    (r.add||[]).concat(r.drop||[]).forEach(e=>{put("girl",e[1]);put("girl",e[2])});
    if(opt&&opt.rel)return {keys:k,rel:r};return k}

  /* ---------- the records ---------- */
  const draftKeys=()=>{try{return C.drafts()?touched(C.drafts()):new Set()}catch(e){return new Set()}};
  function list(){const out=[],M=(C.layer().meta)||{},T=draftKeys();
    const add=(kind,id,name,orig)=>{const key=kind+":"+id,m=M[key]||{};out.push({key,kind,id,name,author:m.author||ADMIN,rev:+m.rev||0,original:!!orig,draft:T.has(key)})};
    (ACAD.HOUSES||[]).forEach(h=>add("girl",h,HN(h),!C.isAdded(h)));
    (ACAD.GROUPS||[]).forEach(g=>add("group",g.id,g.name,!C.isAddedGroup(g.id)));
    (E().FACTIONS||[]).forEach(f=>add("faction",f.id,f.name,!C.isAddedFaction(f.id)));
    (E().PLACES||[]).forEach(p=>add("place",p.id,p.name,!C.isAddedPlace(p.id)));
    (E().ROLL||[]).forEach(g=>add("lost",g.id,g.name,!C.isAddedLost(g.id)));
    Object.entries(E().STAFF||{}).forEach(([k,s])=>{const f=(E().FACTIONS||[]).find(x=>x.dean===k);add("staff",k,s.name,!(f&&C.isAddedFaction(f.id)))});
    return out}
  const get=key=>list().find(r=>r.key===key)||null;
  /* every name in the world, for names that must be unique: girls (and their full names), Houses awake and asleep,
     groups, factions, places and lost groups */
  const norm=n=>String(n||"").toLowerCase().replace(/^the\s+/,"").replace(/\s+/g," ").trim();
  function names(skip){const m=new Map(),no=k=>!!(skip&&skip(k));const put=(n,what)=>{const k=norm(n);if(k&&!m.has(k))m.set(k,what)};
    list().forEach(r=>{if(!no(r.key))put(r.name,KIND[r.kind])});
    (ACAD.HOUSES||[]).forEach(h=>{if(no("girl:"+h))return;const b=(typeof BIOS!=="undefined"&&BIOS[h])||{};if(b.fullName)put(b.fullName,"girl")});
    (E().ROLL||[]).forEach(g=>{if(!no("lost:"+g.id))g.houses.forEach(x=>{if(!no("girl:"+x.id))put(x.name,"sleeping House")})});
    (E().FACTIONS||[]).forEach(f=>{if(!no("faction:"+f.id))put(f.short,"faction")});
    return m}

  /* ---------- who may do what ---------- */
  const role=u=>u===ADMIN?"admin":(((C.layer().users)||{})[u]||{}).role||"player";
  const can=(u,action,key)=>{const r=role(u);
    if(action==="promote")return r==="admin";
    if(action==="review")return r==="admin"||r==="moderator";
    if(action==="submit")return !!u;
    /* v258: only the admin changes canon. A player adds new lore; her new records are hers to change until they are
       approved; relationships with anyone else's girl wait for that girl's author (the admin's, for the originals) */
    if(action==="edit"){if(r==="admin")return true;const rec=key&&get(key);return !rec}
    if(action==="relate"){if(r==="admin")return true;const rec=key&&get(key);if(!rec)return true;return !rec.original&&rec.author===u}
    return false};
  ACAD.perm={ADMIN,role,can,users:()=>cj((C.layer().users)||{})};
  /* v258: what this file may change here and now. The admin edition changes anything; a player's copy changes only what
     she is adding herself, before she submits it */
  const mineNow=key=>{const d=C.drafts();if(!d||!d.add)return false;const m=/^(girl|group|faction|place|lost|staff):(.+)$/.exec(key||"");if(!m)return false;
    const k={girl:"girls",group:"groups",faction:"factions",place:"places",lost:"lost"}[m[1]];
    if(m[1]==="staff")return Object.values(d.add.factions||{}).some(f=>f&&f.dean&&f.dean.id===m[2])||Object.keys(d.add.factions||{}).some(f=>"dean"+f===m[2]);
    return !!(d.add[k]&&d.add[k][m[2]])};
  ACAD.mayEdit=key=>ACAD.isAdmin()?true:mineNow(key);
  ACAD.mineNow=mineNow;

  /* ---------- a saved file stamps each touched record with its revision ---------- */
  function stamp(n,d,rev){const keys=touched(d);if(!keys.size)return;n.meta=n.meta||{};
    keys.forEach(k=>{n.meta[k]=Object.assign({author:ADMIN},n.meta[k]||{},{rev})})}

  ACAD.records={list,get,owner:key=>{const r=get(key);return r?r.author:null},names,norm,touched,relDiff,pkey,stamp,KIND,
    pending:()=>cj((C.layer().pending)||[])};

  /* ---------- credits on their pages ---------- */
  const PAGE={house:"girl",boy:"girl",group:"group",faction:"faction",place:"place",lost:"lost",staff:"staff"};
  if(typeof ENC!=="undefined"&&ENC.go&&!ENC.go.credits256){const go0=ENC.go;
    ENC.go=function(id){const r=go0.apply(this,arguments);try{const m=/^([a-z]+):(.+)$/.exec(String(id||""));if(m&&PAGE[m[1]]){
      const rec=get(PAGE[m[1]]+":"+m[2]);const main=document.querySelector("#encDlg main");const body=main&&main.querySelector(".enc-body");
      const col=body&&(body.querySelector(".enc-cols > :first-child")||body);if(rec&&col&&!body.querySelector(".enc-credit"))col.append(ENC.E("p",{class:"enc-credit"},"Created by "+rec.author+"."))}}catch(e){}return r};
    ENC.go.credits256=true;
    const st=document.createElement("style");st.textContent="#encDlg .enc-credit{margin:28px 0 4px;font-size:13px;color:var(--e-muted,#6b6880)}";document.head.append(st)}
})();

/* ---- v268: a girl's description ends with her role in her group ("Leader of the Pack.", "The Trickster of the Pack."). The
   canon keeps descriptions as written, so after it is read this sentence is written again from the roles as they stand:
   a change of leader (leader268.js) moves "Leader of …" to the new leader and gives the old one her new title. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function")return;
  const R=ACAD.GROUP_ROLE||{},esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  (ACAD.GROUPS||[]).forEach(g=>{const gn=String(g.name||"").replace(/^The /,"the ");if(!gn)return;const rx=new RegExp("\\s*[^.]*\\bof "+esc(gn)+"\\.\\s*$");
    (g.members||[]).forEach(h=>{const t=tplById(ACAD.robes?ACAD.robes(h):h+"robes");if(!t||!t.blurb)return;
      const role=String(R[h]||"").split(".")[0].replace(/,.*$/,"").trim();if(!role)return;
      const tail=role==="Leader"?` Leader of ${gn}.`:` ${role} of ${gn}.`;
      const b=rx.test(t.blurb)?t.blurb.replace(rx,""):t.blurb.replace(/\s*$/,"");if(b+tail!==t.blurb)t.blurb=b+tail})})
})();

/* ---- v269: groups woken whole from the Roll of Sleeping Houses (add.groups[id].woken = its Roll id). On its group page: when
   it woke, and its Houses still asleep, waiting to be woken as its open places. On its Roll page: that it is awake now, with
   a link to it. ACAD.wokenGroup(id) gives {id, roll, year} for a group woken from the Roll. ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon||typeof ENC==="undefined"||!ENC.pages||!ENC.ROLL)return;
  const L=ACAD.canon.layer(),AG=(L.add&&L.add.groups)||{};
  const W={};Object.entries(AG).forEach(([id,a])=>{if(a&&a.woken){const roll=ENC.ROLL.find(g=>g.id===a.woken);if(roll)W[id]={id,roll,year:a.wokeYear||""}}});
  ACAD.wokenGroup=id=>W[id]||null;
  const E=(t,p,...k)=>{const el=document.createElement(t);if(p)Object.entries(p).forEach(([a,v])=>{if(v==null)return;if(a==="class")el.className=v;else if(a.startsWith("on"))el.addEventListener(a.slice(2),v);else el.setAttribute(a,v)});k.flat().forEach(c=>{if(c!=null)el.append(c.nodeType?c:document.createTextNode(String(c)))});return el};
  const wrap=(key,fn)=>{const p=ENC.pages[key];if(!p||!p.build||p.build.wake269)return;const b0=p.build;p.build=function(el){b0.apply(this,arguments);try{fn(el)}catch(e){console.warn("wake269",e)}};p.build.wake269=true};
  Object.values(W).forEach(w=>{const g=(ACAD.GROUPS||[]).find(x=>x.id===w.id);
    wrap("group:"+w.id,el=>{const main=el.querySelector(".enc-cols > div")||el;const asleep=w.roll.houses.filter(x=>!(g&&g.members.includes(x.id))&&!(ENC.isAwake&&ENC.isAwake(x.id)));
      main.append(E("h3",{class:"enc-h"},"Woken from the Roll"),
        E("p",{class:"enc-p"},`${w.roll.name} slept on the Roll of Sleeping Houses until ${w.year||"it woke"}, when ${g&&g.leader&&ENC.HN?ENC.HN(g.leader)+" woke it":"a girl woke it"}. Its last principal walked out with it. ${asleep.length?`${asleep.length===1?"One of its Houses still sleeps":"Its other Houses still sleep"}, waiting to be woken as its places:`:"Every one of its Houses is awake."}`),
        asleep.length?E("ul",{class:"enc-list"},asleep.map(x=>E("li",null,E("b",null,x.name+" House"),x.lore?" — "+x.lore:""))):null)});
    wrap("lost:"+w.roll.id,el=>{const t=el.querySelector("h1");const n=E("p",{class:"enc-note"},`${w.roll.name} is awake: `,E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go("group:"+w.id)}},"its group page"),`. Its Houses here still asleep are its open places.`);if(t&&t.parentNode)t.parentNode.insertBefore(n,t.nextSibling);else el.prepend(n)})});
})();

/* ---- v270: the girls sworn to a sleeping group's banner, when that group wakes. A girl is sworn to a group's banner if she is
   its champion (ENC.CHAMP), swore it in her canon entry (ENC.SWORN), or woke one of its Houses while it slept and carried its
   banner within a living group. When the group wakes they stay where they are, listed on its page as sworn to its banner;
   the admin can move any of them into it from her editor (Group). A girl who belongs to the group no longer carries its
   banner as a second. ACAD.swornTo(h) gives {lost, oath, why} or null. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof ENC==="undefined"||!ENC.ROLL||!ENC.pages)return;
  const L=ACAD.canon?ACAD.canon.layer():{},ADD=(L.add&&L.add.girls)||{};
  const name=id=>(ENC.ROLL.find(g=>g.id===id)||{}).name||"";
  ACAD.swornTo=h=>{const s=(ENC.SWORN||{})[h];if(s&&s[0])return {lost:s[0],oath:s[1]||"",why:"sworn"};
    const ch=Object.entries(ENC.CHAMP||{}).find(([,v])=>v[0]===h);if(ch)return {lost:ch[0],oath:ch[1][1]||"",why:"champion"};
    const a=ADD[h];if(a&&a.place&&a.place.kind==="wake"&&a.place.lost&&a.group!==a.place.lost)return {lost:a.place.lost,oath:"she woke one of its Houses while it slept",why:"woke"};
    return null};
  const HN=h=>(ENC.HN?ENC.HN(h):h);
  (ACAD.GROUPS||[]).forEach(g=>{const roll=ENC.ROLL.find(r=>r.id===g.id);if(!roll)return;
    /* her second banner is her own group now */
    g.members.forEach(h=>{if(typeof BIOS==="object"&&BIOS[h]&&BIOS[h].group2===roll.name)delete BIOS[h].group2});
    const p=ENC.pages["group:"+g.id];if(!p||!p.build||p.build.sworn270)return;const b0=p.build;
    p.build=function(el){b0.apply(this,arguments);try{
      const who=(ACAD.ROSTER?ACAD.ROSTER.girls():ACAD.HOUSES||[]).filter(h=>!g.members.includes(h)).map(h=>[h,ACAD.swornTo(h)]).filter(([,s])=>s&&s.lost===g.id);
      const side=el.querySelector(".enc-side");if(!side||!who.length)return;
      const E=ENC.E,lnk=(id,t)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},t);
      side.insertBefore(E("div",{class:"enc-card"},E("h4",null,`Sworn to its banner (${who.length})`),
        E("p",{class:"enc-note",style:{margin:"0 0 8px"}},`They swore to carry ${roll.name.replace(/^The /,"the ")}'s banner while it slept. They keep their own groups.`),
        who.map(([h,s])=>{const gl=ACAD.GROUP_OF?ACAD.GROUP_OF(h):null;return E("div",{class:"enc-person"},ENC.pixel?ENC.pixel(h,36):null,E("div",null,E("b",null,lnk("house:"+h,HN(h))),E("div",{class:"enc-note"},(gl?gl.name+". ":"")+String(s.oath).replace(/^./,c=>c.toUpperCase())+(/[.!]$/.test(s.oath)?"":"."))))})),side.children[1]||null)
    }catch(e){console.warn("sworn270",e)}};p.build.sworn270=true});
})();

/* ---- v243: the pixel editor (admin edition). Two canvases, 32x32 and 16x16, each with its own colors. Start from any
   girl's head or any woken sleeping House's head, as it is or as a shape blank (its outline kept, its colors cleared to
   one light fill). Paint, erase, fill and pick colors; undo; import a PNG; export either size as a PNG; or use both sizes
   for the character being edited. Art is kept as rows of letters and a color for each letter, like every head here.
   ACAD.pixelEditor.open({title, start32, start16, onUse(px32, px16)}). ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  /* v258: players paint their own girls' heads too */
  const h=(t,a,...k)=>{const e=document.createElement(t);if(a)for(const[x,v]of Object.entries(a)){if(v==null||v===false)continue;if(x==="class")e.className=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else if(x==="value")e.value=v;else e.setAttribute(x,v===true?"":v)}
    k.flat().forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(String(c)))});return e};
  const HN=x=>(ACAD.HNAME&&ACAD.HNAME[x])||ACAD.cap(x);
  const CH="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=?@^~";
  /* grid <-> {r,c} */
  const toGrid=(p,n)=>{const g=Array.from({length:n},()=>Array(n).fill(null));if(!p||!p.r)return g;const k=p.r.length;
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){const sy=Math.floor(y*k/n),sx=Math.floor(x*k/n);const ch=(p.r[sy]||"")[sx];g[y][x]=ch&&ch!=="."?(p.c[ch]||null):null}return g};
  const fromGrid=g=>{const map=new Map();let i=0;const r=g.map(row=>row.map(c=>{if(!c)return".";c=c.toLowerCase();if(!map.has(c)){if(i>=CH.length)return CH[CH.length-1];map.set(c,CH[i++])}return map.get(c)}).join(""));
    const c={};map.forEach((ch,col)=>{c[ch]=col});return{r,c}};
  const lum=hex=>{const m=/^#?([0-9a-f]{6})$/i.exec(hex||"");if(!m)return 1;const n=parseInt(m[1],16);return(.2126*(n>>16&255)+.7152*(n>>8&255)+.0722*(n&255))/255};
  /* a shape blank: the outline (the color most often found where the figure meets empty space) stays wherever it is;
     everything else becomes one light fill */
  const FILL="#d9d2e6";
  const blank=g=>{const n=g.length,cnt=new Map();
    for(let y=0;y<n;y++)for(let x=0;x<n;x++){const c=g[y][x];if(!c)continue;const edge=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>{const a=x+dx,b=y+dy;return a<0||b<0||a>=n||b>=n||!g[b][a]});
      if(edge)cnt.set(c,(cnt.get(c)||0)+1)}
    if(!cnt.size)return g;const line=[...cnt.entries()].sort((a,b)=>b[1]-a[1])[0][0];
    return g.map(r=>r.map(c=>!c?null:(c===line?c:FILL)))};
  /* 32 to 16: each 2x2 block becomes its most common color (empty wins only when most of the block is empty); 16 to 32 doubles */
  const shrink=g=>{const n=g.length>>1;return Array.from({length:n},(_,y)=>Array.from({length:n},(_,x)=>{const c=[g[2*y][2*x],g[2*y][2*x+1],g[2*y+1][2*x],g[2*y+1][2*x+1]];
    const filled=c.filter(Boolean);if(filled.length<2)return null;const m=new Map();filled.forEach(v=>m.set(v,(m.get(v)||0)+1));
    /* ties go to the darker color, so outlines survive */
    return[...m.entries()].sort((p,q)=>q[1]-p[1]||lum(p[0])-lum(q[0]))[0][0]}))};
  const grow=g=>Array.from({length:g.length*2},(_,y)=>Array.from({length:g.length*2},(_,x)=>g[y>>1][x>>1]));
  const urlOf=(g,scale)=>{const n=g.length,s=scale||1,cv=document.createElement("canvas");cv.width=n*s;cv.height=n*s;const x=cv.getContext("2d");
    g.forEach((row,y)=>row.forEach((c,i)=>{if(c){x.fillStyle=c;x.fillRect(i*s,y*s,s,s)}}));return cv.toDataURL("image/png")};
  /* every head there is to start from */
  function sources(){const out=[];(ACAD.GROUPS||[]).forEach(g=>out.push([g.name,g.members.filter(x=>ACAD.PIXEL&&ACAD.PIXEL[x]).map(x=>["g:"+x,HN(x)])]));
    if(typeof ENC!=="undefined"&&ENC.ROLL)ENC.ROLL.forEach(g=>{const hs=g.houses.filter(x=>(ENC.ROLLPX||{})[x.id]);if(hs.length)out.push([g.name+" (sleeping)",hs.map(x=>["r:"+x.id,x.name])])});
    return out}
  const srcArt=(id,n)=>{const [k,v]=id.split(":");if(k==="g")return n===32?ACAD.PIXEL[v]:((ACAD.PIXEL16||{})[v]||ACAD.PIXEL[v]);
    if(k==="r")return n===32?(ENC.ROLLPX||{})[v]:((ENC.ROLLPX16||{})[v]||(ENC.ROLLPX||{})[v]);return null};

  let dlg=null;
  function open(o){o=o||{};if(dlg)dlg.remove();
    const G={32:toGrid(o.start32,32),16:toGrid(o.start16||o.start32,16)};let N=32,tool="paint",color="#1d1b22";const UNDO={32:[],16:[]};
    dlg=h("dialog",{class:"adm-dlg pxe-dlg","aria-label":"Pixel art"});
    const cv=h("canvas",{class:"pxe-cv",width:448,height:448,"aria-label":"Pixel canvas"});const ctx=cv.getContext("2d");
    const sizeBtns=h("div",{class:"adm-tabs",role:"tablist"});const pal=h("div",{class:"pxe-pal"});const prev=h("div",{class:"pxe-prev"});
    const pick=h("input",{type:"color",class:"pxe-pick",value:color,"aria-label":"Color",oninput:e=>{color=e.target.value;tool=tool==="erase"||tool==="eyedrop"?"paint":tool;drawTools();drawPal()}});
    const tools=h("div",{class:"adm-actions pxe-tools"});
    function grid(){return G[N]}
    function snap(){UNDO[N].push(JSON.stringify(G[N]));if(UNDO[N].length>60)UNDO[N].shift()}
    function render(){const g=grid(),cell=448/N;ctx.clearRect(0,0,448,448);
      for(let y=0;y<N;y++)for(let x=0;x<N;x++){const c=g[y][x];ctx.fillStyle=c||((x+y)%2?"#f3f1f6":"#e6e2ec");ctx.fillRect(x*cell,y*cell,cell,cell)}
      ctx.strokeStyle="rgba(60,50,90,.12)";ctx.lineWidth=1;for(let i=1;i<N;i++){ctx.beginPath();ctx.moveTo(i*cell+.5,0);ctx.lineTo(i*cell+.5,448);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*cell+.5);ctx.lineTo(448,i*cell+.5);ctx.stroke()}
      prev.textContent="";[32,16].forEach(n=>prev.append(h("figure",null,h("img",{src:urlOf(G[n],1),width:n*2,height:n*2,alt:"",style:"image-rendering:pixelated"}),h("figcaption",null,n+"×"+n))));drawPal()}
    function drawPal(){pal.textContent="";const seen=new Set();grid().forEach(r=>r.forEach(c=>{if(c)seen.add(c.toLowerCase())}));
      [...seen].sort((a,b)=>lum(a)-lum(b)).forEach(c=>pal.append(h("button",{type:"button",class:"pxe-sw"+(c===color.toLowerCase()?" on":""),style:"background:"+c,title:c,"aria-label":"Use "+c,onclick:()=>{color=c;pick.value=c;if(tool!=="fill")tool="paint";drawTools();drawPal()}})));
      pal.append(pick)}
    function drawTools(){tools.textContent="";[["paint","Paint"],["fill","Fill"],["erase","Erase"],["eyedrop","Pick a color"]].forEach(([k,l])=>tools.append(h("button",{type:"button",class:"adm-btn sm"+(tool===k?" primary":""),"aria-pressed":tool===k?"true":"false",onclick:()=>{tool=k;drawTools()}},l)));
      tools.append(h("button",{type:"button",class:"adm-btn sm",title:N===32?"Shrink this drawing into the 16×16 canvas":"Enlarge this drawing into the 32×32 canvas",onclick:()=>{const to=N===32?16:32;UNDO[to].push(JSON.stringify(G[to]));G[to]=N===32?shrink(G[32]):grow(G[16]);N=to;drawSizes();render()}},N===32?"Make 16×16 from this":"Make 32×32 from this"),
        h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const s=UNDO[N].pop();if(s){G[N]=JSON.parse(s);render()}}},"Undo"),
        h("button",{type:"button",class:"adm-btn sm",onclick:()=>{snap();G[N]=Array.from({length:N},()=>Array(N).fill(null));render()}},"Clear"))}
    function drawSizes(){sizeBtns.textContent="";[32,16].forEach(n=>sizeBtns.append(h("button",{type:"button",role:"tab","aria-selected":n===N?"true":"false",onclick:()=>{N=n;drawSizes();render()}},n+"×"+n)))}
    const at=ev=>{const r=cv.getBoundingClientRect();const x=Math.floor((ev.clientX-r.left)/r.width*N),y=Math.floor((ev.clientY-r.top)/r.height*N);return x>=0&&y>=0&&x<N&&y<N?[x,y]:null};
    const flood=(x,y,to)=>{const g=grid(),from=g[y][x];if(from===to)return;const st=[[x,y]];while(st.length){const [a,b]=st.pop();if(a<0||b<0||a>=N||b>=N||g[b][a]!==from)continue;g[b][a]=to;st.push([a+1,b],[a-1,b],[a,b+1],[a,b-1])}};
    let down=false;
    const act=(ev,first)=>{const p=at(ev);if(!p)return;const [x,y]=p;const g=grid();
      const t=ev.buttons===2||ev.button===2?"erase":tool;
      if(t==="eyedrop"){if(g[y][x]){color=g[y][x];pick.value=color;tool="paint";drawTools();drawPal()}return}
      if(first)snap();
      if(t==="fill"){flood(x,y,color.toLowerCase());render();return}
      g[y][x]=t==="erase"?null:color.toLowerCase();render()};
    cv.addEventListener("pointerdown",ev=>{ev.preventDefault();down=true;cv.setPointerCapture(ev.pointerId);act(ev,true)});
    cv.addEventListener("pointermove",ev=>{if(down&&(tool==="paint"||tool==="erase"||ev.buttons===2))act(ev,false)});
    cv.addEventListener("pointerup",()=>{down=false});cv.addEventListener("contextmenu",ev=>ev.preventDefault());
    /* start from */
    const sel=h("select",{class:"adm-in","aria-label":"Start from"},h("option",{value:""},"Start from a head…"),sources().map(([lab,list])=>h("optgroup",{label:lab},list.map(([v,t])=>h("option",{value:v},t)))));
    const asBlank=h("input",{type:"checkbox",id:"pxeBlank"});
    const startBtn=h("button",{type:"button",class:"adm-btn sm",onclick:()=>{if(!sel.value)return;[32,16].forEach(n=>{UNDO[n].push(JSON.stringify(G[n]));let g=toGrid(srcArt(sel.value,n),n);if(asBlank.checked)g=blank(g);G[n]=g});render()}},"Start from it");
    /* import and export */
    const file=h("input",{type:"file",accept:"image/png,image/*",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;const im=new Image();im.onload=()=>{const c2=document.createElement("canvas");c2.width=N;c2.height=N;const x=c2.getContext("2d");x.imageSmoothingEnabled=false;x.drawImage(im,0,0,N,N);
        const d=x.getImageData(0,0,N,N).data;snap();G[N]=Array.from({length:N},(_,y)=>Array.from({length:N},(_,i)=>{const k=(y*N+i)*4;return d[k+3]<128?null:"#"+[d[k],d[k+1],d[k+2]].map(v=>v.toString(16).padStart(2,"0")).join("")}));render();URL.revokeObjectURL(im.src)};im.src=URL.createObjectURL(f);e.target.value=""}});
    const dl=(n)=>{const a=h("a",{href:urlOf(G[n],1),download:(o.fileBase||"pixel_head")+"_"+n+"x"+n+".png"});document.body.append(a);a.click();a.remove()};
    dlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},"Pixel art"),h("h2",null,o.title||"Her pixel head"),
        h("div",{class:"adm-row pxe-start"},sel,h("label",{class:"pxe-chk"},asBlank," Shape blank"),startBtn),
        sizeBtns,
        h("div",{class:"pxe-main"},h("div",null,cv,h("p",{class:"adm-muted"},"Right-click erases. Each size is drawn on its own; 16×16 is used when the art switch is on 16×16.")),h("div",{class:"pxe-side"},tools,h("h4",null,"Colors"),pal,h("h4",null,"Both sizes"),prev))),
      h("div",{class:"adm-foot"},h("div",{class:"adm-actions"},
        h("button",{type:"button",class:"adm-btn",onclick:()=>file.click()},"Import PNG"),file,
        h("button",{type:"button",class:"adm-btn",onclick:()=>dl(32)},"Export 32×32"),h("button",{type:"button",class:"adm-btn",onclick:()=>dl(16)},"Export 16×16"),
        h("span",{style:"flex:1"}),
        h("button",{type:"button",class:"adm-btn",onclick:()=>dlg.close()},"Cancel"),
        o.onUse?h("button",{type:"button",class:"adm-btn primary",onclick:()=>{const empty=g=>g.every(r=>r.every(c=>!c));o.onUse(empty(G[32])?null:fromGrid(G[32]),empty(G[16])?null:fromGrid(G[16]));dlg.close()}},"Use for this character"):null)));
    document.body.append(dlg);dlg.showModal();drawSizes();drawTools();render();
    return{grid:n=>G[n],set:(n,g)=>{G[n]=g;render()},use:()=>o.onUse&&o.onUse(fromGrid(G[32]),fromGrid(G[16]))}}
  /* v248: a head made from a look. A girl's head (her model's, or a groupmate's) is recolored: every pixel close to one
     of her colors (hair, highlights, skin, eyes, robes) takes the new girl's matching color, keeping its shading; outlines,
     whites and anything else stay. */
  const hx=v=>{v=String(v||"").trim();if(!v)return null;if(/^#[0-9a-f]{6}$/i.test(v))return v.toLowerCase();
    let r=null;try{r=(typeof hexFor==="function"&&hexFor(v))||(typeof Sprite!=="undefined"&&Sprite.hexFor&&Sprite.hexFor(v))||null}catch(e){}
    if(!r){const w=v.split(/[\s,-]+/).reverse().find(x=>{try{return(typeof hexFor==="function"&&hexFor(x))||(typeof Sprite!=="undefined"&&Sprite.hexFor&&Sprite.hexFor(x))}catch(e){return false}});
      if(w)try{r=(typeof hexFor==="function"&&hexFor(w))||Sprite.hexFor(w)}catch(e){}}
    return r&&/^#[0-9a-f]{6}$/i.test(r)?r.toLowerCase():null};
  const skin=v=>{let r=null;try{r=(typeof skinHex==="function"&&skinHex(v))||(typeof SKIN_HEX!=="undefined"&&SKIN_HEX[v])||null}catch(e){}return r&&/^#[0-9a-f]{6}$/i.test(r)?r.toLowerCase():hx(v)};
  const rolesOf=lk=>{if(!lk)return{};const c=lk.c||{},pal=lk.pal||{};const res=v=>String(v||"").replace(/@(\w+)(\+@\w+)*/g,(x,k)=>pal[k]||"").trim();
    return{hair:hx(res(c.hairBase)),hl:hx(res(c.hairHighlights)),under:hx(res(c.hairUnderlayer)),skin:skin(res(c.skinTone)),eye:hx(res(c.eyeOne)),
      p:hx(pal.primary),s:hx(pal.secondary),t:hx(pal.third),a:hx(pal.accent)}};
  const rgb=h=>{const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]};
  const hexOf=a=>"#"+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
  function recolor(g,from,to){const pairs=Object.keys(from).filter(k=>from[k]&&to[k]).map(k=>[rgb(from[k]),rgb(to[k])]);if(!pairs.length)return g;
    const memo=new Map();return g.map(row=>row.map(c=>{if(!c)return c;if(memo.has(c))return memo.get(c);const v=rgb(c);let best=null,bd=1e9;
      pairs.forEach(([f,t])=>{const d=Math.hypot(v[0]-f[0],v[1]-f[1],v[2]-f[2]);if(d<bd){bd=d;best=[f,t]}});
      const out=best&&bd<80?hexOf([0,1,2].map(i=>best[1][i]+(v[i]-best[0][i]))):c;memo.set(c,out);return out}))}
  function fromLook(src,look){const t=typeof tplById==="function"&&tplById(src+"robes");const p32=ACAD.PIXEL&&ACAD.PIXEL[src];if(!t||!p32||!look)return null;
    const from=rolesOf({c:ACAD.peekC?ACAD.peekC(t):t.c,pal:t.pal}),to=rolesOf(look);
    const g32=recolor(toGrid(p32,32),from,to);const p16=(ACAD.PIXEL16||{})[src];const g16=p16?recolor(toGrid(p16,16),from,to):shrink(g32);
    return{px32:fromGrid(g32),px16:fromGrid(g16)}}
  ACAD.pixelEditor={open,toGrid,fromGrid,blank,urlOf,shrink,grow,fromLook,recolor,rolesOf};
  const st=document.createElement("style");st.textContent=`
.adm-dlg.pxe-dlg{width:min(880px,calc(100vw - 32px))}
.pxe-main{display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start;margin-top:8px}
.pxe-cv{width:448px;height:448px;max-width:100%;aspect-ratio:1;border-radius:8px;border:1px solid var(--a-line);touch-action:none;cursor:crosshair;image-rendering:pixelated;display:block}
.pxe-side h4{margin:14px 0 6px}
.pxe-pal{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.pxe-sw{width:26px;height:26px;border-radius:6px;border:1px solid var(--a-line);cursor:pointer;padding:0}
.pxe-sw.on{outline:2px solid var(--a-accent);outline-offset:2px}
.pxe-pick{width:34px;height:28px;border:1px solid var(--a-line);border-radius:6px;background:none;padding:0;cursor:pointer}
.pxe-prev{display:flex;gap:14px;align-items:end}.pxe-prev figure{margin:0;text-align:center;font-size:12.5px;color:var(--a-muted)}
.pxe-prev img{display:block;background:repeating-conic-gradient(#efecf3 0 25%,#fff 0 50%) 0 0/8px 8px;border-radius:4px;margin-bottom:3px}
.pxe-start{margin:6px 0 4px}.pxe-start .adm-in{flex:1 1 220px}.pxe-chk{font-size:14px;white-space:nowrap}
@media (max-width:760px){.pxe-main{grid-template-columns:1fr}.pxe-cv{width:100%;height:auto}}`;
  document.head.append(st);
})();
/* ---- v242: the admin edition's tools.
   Admin (the header button): the unsaved changes, each with Revert; Save admin edition (a new admin file with the changes
   in it); Publish public edition (the same world as a file with no admin tools); Export and Import changes.
   Edit canon (on every House page): her identity, group and role, biography, relationships (best friends, secret
   girlfriend, rivals, family) and look. Saving writes drafts (this browser) and reloads; the page she was on reopens.
   Technical checks only: the girls named must exist, nobody is related to herself, House names stay unique, links in her
   text point to real pages, and romantic relationships are for adults (her biography age). ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon)return;
  const C=ACAD.canon;
  /* v258: the same tools serve a player's copy, for her own new lore only; the wording says so */
  const ADMIN=!!(ACAD.isAdmin&&ACAD.isAdmin());
  const PW=[["Make the studio's character canon","Add the studio's character to my lore"],["Make her canon","Add her to my lore"],["Make the group canon","Add the group to my lore"],
    ["Make the faction canon","Add the faction to my lore"],["Make the lost group canon","Add the lost group to my lore"],["Make the place canon","Add the place to my lore"],["Edit canon: ","Edit: "],["Edit canon","Edit her"],
    ["is made canon with her, when you save her.","joins your lore with her, when you save her."],["It's made canon when you save her.","It joins your lore when you save her."],["Designing for canon","Designing for my lore"],
    [" unsaved canon "," unsaved "],["A canon girl needs a House of her own","A girl needs a House of her own"]];
  const PWT=t=>{if(ADMIN||typeof t!=="string")return t;if(t==="Canon")return "Your lore";for(const [a,b] of PW)if(t.includes(a))t=t.split(a).join(b);return t};
  const h=(t,a,...k)=>{const e=document.createElement(t);if(a)for(const[x,v]of Object.entries(a)){if(v==null||v===false)continue;if(x==="class")e.className=v;else if(x.startsWith("on"))e.addEventListener(x.slice(2),v);else if(x==="value")e.value=v;else e.setAttribute(x,v===true?"":v)}
    k.flat().forEach(c=>{if(c!=null&&c!==false)e.append(c.nodeType?c:document.createTextNode(PWT(String(c))))});return e};
  const HN=x=>(ACAD.HNAME&&ACAD.HNAME[x])||ACAD.cap(x);
  /* v248: a group made from the wizard waits with her (NEWW.pendingGroup) until she is saved, with no reload */
  let pendingSrc=()=>null;
  const pendingGroup=id=>{const pg=pendingSrc();if(!pg||(id&&pg.id!==id))return null;const e=pg.entry||{};
    return{id:pg.id,name:e.name||pg.id,kind:e.kind||"",leader:"",rival:e.rival||"",members:[],motto:e.motto||"",hangout:e.hangout||"",lore:e.lore||"",pending:true}};
  const GRP=id=>(ACAD.GROUPS||[]).find(g=>g.id===id)||pendingGroup(id);
  const groupsAll=()=>(ACAD.GROUPS||[]).concat(pendingGroup()?[pendingGroup()]:[]);
  const girls=()=>ACAD.ROSTER?ACAD.ROSTER.girls():ACAD.HOUSES.slice();
  const clone=o=>JSON.parse(JSON.stringify(o));
  const REOPEN="everspire.admin.reopen";
  const say=m=>{if(typeof toast==="function")toast(m)};

  /* ---------- the biography fields an admin edits (the rest are worked out from groups and relationships) ---------- */
  const SECS=(window.BIO_FIELDS||[]);
  const DERIVED=new Set(["house","group","group2","groupRole","rivalGroup"]);
  const ROMANTIC=new Set(["status","partner"]);
  const INTIMATE=new Set(((SECS.find(s=>s[0]==="intimacy")||[0,0,[]])[2]).map(f=>f[0]));
  const FL={};SECS.forEach(s=>s[2].forEach(f=>{FL[f[0]]=f[1]}));
  const GROUNDS=[["hall","in the great hall"],["race","in the race"],["forest","in the forest"],["bakeoff","at the bake-off"],["chess","at the chess match"],["night","on the rooftops"],["ice","on the ice"],["catwalk","on the catwalk"],["storm","in the storm"]];

  /* ---------- drafts ---------- */
  const drafts=()=>C.drafts()||C.empty();
  const ensure=(o,...ks)=>{let x=o;ks.forEach(k=>{x[k]=x[k]||{};x=x[k]});return x};
  const prune=o=>{if(!o||typeof o!=="object"||Array.isArray(o))return o;Object.keys(o).forEach(k=>{const v=prune(o[k]);if(v&&typeof v==="object"&&!Array.isArray(v)&&!Object.keys(v).length)delete o[k]});return o};
  function commit(d,reopen){prune(d.edits||{});prune(d.add||{});
    /* v258: users, pending relationships, credits and approvals count as changes too, not only edits and additions */
    const any=Object.keys(d).some(k=>!["format","base","note"].includes(k)&&d[k]!=null&&(typeof d[k]!=="object"||Object.keys(d[k]).length));
    C.saveDrafts(any?d:null);try{sessionStorage.setItem(REOPEN,JSON.stringify(reopen||null))}catch(e){}location.reload()}
  const RELW={BF:"Relationships: best friends",BF_OUT:"Relationships: best-friend wording",SG:"Relationships: couples",RV:"Relationships: rivals",FAM:"Relationships: family",FLING:"Relationships: flings",SG_PENDING:"Relationships: partners to come"};
  function changes(d){const out=[],E=d.edits||{};/* d.note is the admin's notes for What's new, not a change */
    Object.keys(E.names||{}).forEach(x=>out.push({label:`${HN(x)}: House name`,path:["edits","names",x]}));
    Object.entries(E.bios||{}).forEach(([x,p])=>Object.keys(p).forEach(f=>out.push({label:`${HN(x)}: ${FL[f]||f}`,path:["edits","bios",x,f]})));
    Object.keys(E.roles||{}).forEach(x=>out.push({label:`${HN(x)}: role in her group`,path:["edits","roles",x]}));
    Object.entries(E.groups||{}).forEach(([g,p])=>Object.keys(p).forEach(f=>out.push({label:`${(GRP(g)||{name:g}).name}: ${f}`,path:["edits","groups",g,f]})));
    Object.keys(E.rel||{}).forEach(k=>out.push({label:RELW[k]||"Relationships",path:["edits","rel",k]}));
    Object.keys(E.looks||{}).forEach(x=>out.push({label:`${HN(x)}: look`,path:["edits","looks",x]}));
    Object.keys((d.add||{}).girls||{}).forEach(x=>out.push({label:`New girl: ${HN(x)}`,path:["add","girls",x]}));
    Object.entries((d.add||{}).groups||{}).forEach(([g,a])=>out.push({label:`New group: ${a.name||g}`,path:["add","groups",g]}));
    Object.keys(E.glooks||{}).forEach(g=>out.push({label:`${(GRP(g)||{name:g}).name}: colors and crest`,path:["edits","glooks",g]}));
    Object.keys(E.figures||{}).forEach(id=>{const p=/^principal(.+)$/.exec(id),m=/^(.+?)(man|head)$/.exec(id);
      out.push({label:p?`${(GRP(p[1])||{name:p[1]}).name}: principal's look`:m?`${HN(m[1])}: ${m[2]==="man"?"her partner's look":"headmistress's look"}`:id,path:["edits","figures",id]})});
    /* v261: images, a girl's own or her boy's or headmistress's portrait */
    Object.keys(E.images||{}).forEach(k=>{const m=/^(.+?)(man|head)$/.exec(k),t=m&&T(k),own=m&&(ACAD.HOUSES||[]).includes(m[1]);
      out.push({label:own?`${t&&t.bio&&t.bio.fullName?t.bio.fullName:HN(m[1])+(m[2]==="man"?"'s partner":" headmistress")}: portrait`:`${HN(k)}: portrait and pixel art`,path:["edits","images",k]})});
    Object.keys(E.gextra||{}).forEach(g=>out.push({label:`${(GRP(g)||{name:g}).name}: principal and rivalry ground`,path:["edits","gextra",g]}));
    /* v250: and the kinds the later tools add (places, history) */
    MORE.forEach(f=>{try{f(d,out)}catch(e){}});
    return out}
  const MORE=[],PANEL=[];
  const delPath=(o,p)=>{let x=o;for(let i=0;i<p.length-1;i++){x=x&&x[p[i]];if(!x)return}if(x)delete x[p[p.length-1]]};

  /* ---------- writing a file of either edition from this one ---------- */
  const ED_LINE=e=>"const EVERSPIRE_"+"EDITION=\""+e+"\";";
  /* v313: the app is files now. The canon data is its own file (js/canon.js); the single-file editions are bundled from the same files on request. */
  const canonText=L=>"const EVERSPIRE_"+"CANON="+JSON.stringify(L).replace(/</g,"\\u003c")+";\n";
  function nextLayer(){const L=C.next();const note=L.note;delete L.note;
    if(C.drafts()){const list=changes(drafts()).map(c=>c.label);if(list.length||note)L.log=(L.log||[]).concat([{rev:L.rev,date:new Date().toISOString().slice(0,10),notes:note||"",changes:list}])}
    return L}
  const buildCanon=()=>canonText(nextLayer());
  async function buildFile(edition){
    const L=nextLayer(),get=u=>fetch(u,{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error(u);return r.text()});
    const page=await get("index.html"),tags=[...page.matchAll(/<script src="([^"?]+)[^"]*"([^>]*)><\/script>/g)];
    const texts=await Promise.all(tags.map(m=>edition!=="admin"&&/data-admin/.test(m[2])?"":get(m[1])));
    let out=page;
    tags.forEach((m,i)=>{if(edition!=="admin"&&/data-admin/.test(m[2])){out=out.replace(m[0],"");return}
      let t=texts[i];if(/data-canon/.test(m[2]))t=canonText(L);if(/data-edition/.test(m[2]))t=t.replace(/(EVERSPIRE_)(EDITION=")[a-z]+(")/,(x,p,q,r)=>p+q+edition+r);
      out=out.replace(m[0],()=>"<script>"+t.replace(/<\/script/gi,"<\\/script")+"<\/script>")});
    return out}
  const fileName=edition=>{const r=C.next().rev||0;return edition==="admin"?`everspire_admin_r${r}.html`:`everspire_r${r}.html`};
  function download(name,text,type){const b=new Blob([text],{type:type||"text/html"});const a=h("a",{href:URL.createObjectURL(b),download:name});document.body.append(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000)}

  /* ---------- the Admin dialog ---------- */
  let dlg=null;
  function openAdmin(){if(!ADMIN&&ACAD.submit&&ACAD.submit.open)return ACAD.submit.open();if(dlg)dlg.remove();
    const d=drafts(),list=changes(d),st=C.stale();
    dlg=h("dialog",{class:"adm-dlg",id:"admDlg","aria-label":"Admin"});
    const close=h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>dlg.close()},"×");
    const body=h("div",{class:"adm-body"});
    body.append(h("h2",null,"Admin"),
      h("p",{class:"adm-lead"},`Changes are drafts in this browser until you save them into a file. This file is revision ${C.rev()}.`));
    if(st)body.append(h("div",{class:"adm-note"},h("b",null,"Older drafts set aside. "),`They were made for revision ${st.base||0}, before this file's changes were saved into it, so they aren't applied. `,
      h("button",{type:"button",class:"adm-btn sm",onclick:()=>{C.saveDrafts(null);openAdmin()}},"Discard them")));
    body.append(h("h3",null,list.length?`Unsaved changes (${list.length})`:"Unsaved changes"));
    if(!list.length)body.append(h("p",{class:"adm-muted"},"None. Open a girl's House page in the Encyclopedia and choose Edit canon."));
    else body.append(h("ul",{class:"adm-changes"},list.map(c=>h("li",null,h("span",null,c.label),h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const x=drafts();delPath(x,c.path);commit(x,{admin:true})}},"Revert")))));
    body.append(h("h3",null,"New girls"),h("p",{class:"adm-muted"},NEWW?`${NEWW.name||"A new girl"} is waiting to be finished.`:"Design her in the studio first. Her first outfit becomes her robes."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{dlg.close();openEditor(null,null,true)}},NEWW?"Continue her":"Make the studio's character canon")));
    body.append(h("h3",null,"Groups"),h("p",{class:"adm-muted"},"A new group joins a faction with its own colors and crest; girls join it from Edit canon or Make her canon."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{dlg.close();openGroup(null)}},"New group")));
    /* v259: the rest of the world starts here too, not only from its pages */
    {const go=(fn,...a)=>()=>{dlg.close();const f=ACAD.admin[fn];if(f)f(...a)};const W=[["faction","New faction",null],["lost","New lost group",null],["place","New place",null],["history",ADMIN?"Edit history":"Add to the history",ADMIN?undefined:{add:true}]].filter(([fn])=>ACAD.admin&&ACAD.admin[fn]);
      if(W.length&&ADMIN)body.append(h("h3",null,"The wider world"),h("p",{class:"adm-muted"},"Factions, the Roll of Sleeping Houses, places on the map and the history. Every page in the Encyclopedia also has its own Edit button."),
        h("div",{class:"adm-actions"},W.map(([fn,l,arg])=>h("button",{type:"button",class:"adm-btn",onclick:go(fn,arg)},l))))}
    const pub=h("div",{class:"adm-actions"},
      h("button",{type:"button",class:"adm-btn primary",onclick:()=>{try{download("canon.js",buildCanon(),"text/javascript");say("Canon data saved as canon.js. Put it in the site's js folder to publish these changes; these drafts are in it now.")}catch(e){say("The canon data couldn't be written.")}}},"Save canon data (for the site)"),
      h("button",{type:"button",class:"adm-btn",onclick:()=>{buildFile("admin").then(t=>{download(fileName("admin"),t);say("Single-file admin edition saved. Keep the assets folder beside it.")}).catch(()=>say("A single file can only be bundled from the site, not from a saved copy of this page."))}},"Save single-file admin edition"),
      h("button",{type:"button",class:"adm-btn",onclick:()=>{buildFile("public").then(t=>{download(fileName("public"),t);say("Single-file public edition saved, with every change above in it. Keep the assets folder beside it.")}).catch(()=>say("A single file can only be bundled from the site, not from a saved copy of this page."))}},"Save single-file public edition"));
    if(list.length){const ta=h("textarea",{class:"adm-in",rows:2,placeholder:"A line or two for players about this version (optional)"},d.note||"");
      ta.addEventListener("change",()=>{const x=drafts();x.note=ta.value.trim();if(!x.note)delete x.note;C.saveDrafts(x)});
      body.append(h("h3",null,"Notes for What's new"),h("p",{class:"adm-muted"},"Saved files list these changes on the Encyclopedia's What's new page, with your notes."),ta)}
    /* v256: sections the later tools add (submissions, waiting relationships, records, moderators) */
    PANEL.forEach(f=>{try{f(body,d)}catch(e){}});
    body.append(h("h3",null,"Files"),h("p",{class:"adm-muted"},list.length?"Each of these includes the unsaved changes above.":"Each of these carries this world exactly as it is."),pub);
    const imp=h("input",{type:"file",accept:"application/json,.json",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;f.text().then(t=>{let x;try{x=JSON.parse(t)}catch(er){return say("That file isn't a changes file.")}
        if(!x||x.format!==1)return say("That file isn't a changes file.");const cur=drafts();const m=(a,b)=>{Object.keys(b||{}).forEach(k=>{if(b[k]&&typeof b[k]==="object"&&!Array.isArray(b[k])){a[k]=a[k]&&typeof a[k]==="object"&&!Array.isArray(a[k])?a[k]:{};m(a[k],b[k])}else a[k]=b[k]})};
        m(cur,{edits:x.edits||{},add:x.add||{}});commit(cur,{admin:true})})}});
    body.append(h("h3",null,"Image prompts"),h("p",{class:"adm-muted"},"Robes portrait prompts in the same form as every girl's: one shared Undesired Content, then each girl's prompt and the file name to save her image under."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",disabled:!promptGirls(false).length,onclick:()=>downloadPrompts(false)},"New and changed girls"),h("button",{type:"button",class:"adm-btn",onclick:()=>downloadPrompts(true)},"Every girl")));
    body.append(h("h3",null,"Changes files"),h("p",{class:"adm-muted"},"Hand your drafts to another admin, or keep a copy. Importing adds a file's changes to yours."),
      h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",disabled:!list.length,onclick:()=>{const x=drafts();delete x.base;download(`everspire_changes_r${C.rev()}.json`,JSON.stringify(x,null,1),"application/json")}},"Export changes"),
        h("button",{type:"button",class:"adm-btn",onclick:()=>imp.click()},"Import changes"),imp,
        list.length?h("button",{type:"button",class:"adm-btn danger",onclick:()=>{if(confirmBox("Discard every unsaved change?"))commit(C.empty(),{admin:true})}},"Discard all"):null));
    dlg.append(close,body);document.body.append(dlg);dlg.showModal();updateBtn()}
  const confirmBox=m=>window.confirm(m);
  /* ---------- image generator robes prompts ---------- */
  function promptGirls(all){if(all)return girls();const L=C.layer();const s=new Set([...Object.keys((L.add&&L.add.girls)||{}),...Object.keys((L.edits&&L.edits.looks)||{})]);return girls().filter(x=>s.has(x))}
  function robesPrompts(list){if(typeof compose!=="function"||typeof replaceState!=="function")return null;
    const keep=JSON.stringify(S),u0=typeof UNDO!=="undefined"?UNDO.length:0,hc=typeof hooks!=="undefined"?hooks.change:null;if(hc)hooks.change=()=>{};
    const out=[];try{list.forEach(x=>{const t=typeof x==="object"?x:tplById((ACAD.robes&&ACAD.robes(x))||x+"robes")||tplById(x+"robes");if(!t)return;replaceState(stateFromTemplate(t));const r=compose();const pr=r&&r.prompt||"";
      out.push({h:typeof x==="object"?x.id:x,prompt:typeof window.withQuality==="function"?window.withQuality(pr):pr,uc:typeof negText==="function"?negText():""})})}
    finally{replaceState(JSON.parse(keep));if(typeof UNDO!=="undefined")UNDO.length=u0;if(hc)hooks.change=hc;try{hooks.change&&hooks.change()}catch(e){}}
    return out}
  function downloadPrompts(all){const list=promptGirls(all);const P=robesPrompts(list);if(!P)return say("The prompts couldn't be made here.");
    const ucs=[...new Set(P.map(p=>p.uc))],shared=ucs.length===1;const B=x=>(typeof BIOS==="object"&&BIOS[x])||{};
    const lines=[`Everspire House robes: portrait prompts (revision ${C.next().rev||0})`,"",
      `${P.length===1?"One girl":P.length+" girls"}, cowboy shots of the House robes character sheet: same pose, same style line, same quality tags.`,
      "For a consistent set: the image generator's own quality tags off, its negative prompt (Undesired Content) preset on None, then the same model, seed, resolution, sampler and step count as every portrait (seed 42, 832×1216, 28 steps, Euler Ancestral, scale 7).",
      "File names: save each image under the name shown, then upload it as her portrait (Edit canon, Images).",""].concat(shared?["UNDESIRED CONTENT (the same for every girl):",ucs[0]||"",""]:[]);
    P.forEach(p=>{const g=ACAD.GROUP_OF(p.h);lines.push(`=== ${HN(p.h)}${B(p.h).fullName?" ("+B(p.h).fullName+")":""}${g?", "+g.name:""}: save as ${p.h}.png`,p.prompt);if(!shared)lines.push("Undesired Content: "+p.uc);lines.push("")});
    download(`everspire_robes_prompts_r${C.next().rev||0}${all?"_all":""}.txt`,lines.join("\n"),"text/plain");say(`Prompts for ${P.length===1?"one girl":P.length+" girls"} saved.`)}

  /* ---------- the header button ---------- */
  let btn=null;
  function updateBtn(){if(!btn)return;const n=changes(drafts()).length;const L=ADMIN?"Admin":"My lore";btn.textContent=n?`${L} (${n})`:L;btn.title=ADMIN?(n?`${n} unsaved canon ${n===1?"change":"changes"}`:"Admin tools"):(n?`${n} ${n===1?"thing":"things"} in your lore, not yet submitted`:"Add your own girls, groups, places and lore")}
  function placeBtn(){const b0=document.querySelector(".ed-badge");btn=h("button",{type:"button",class:"btn adm-head",onclick:openAdmin});
    if(b0)b0.replaceWith(btn);else{const tb=document.getElementById("themeBtn");if(tb&&tb.parentNode)tb.parentNode.insertBefore(btn,tb)}updateBtn()}

  /* ---------- Edit canon ---------- */
  function relNow(){const R=ACAD.RELDATA||{};return{BF:clone(R.BF||{}),BF_OUT:clone(R.BF_OUT||{}),SG:clone(R.SG||[]),RV:clone(R.RV||[]),FAM:clone(R.FAM||[]),FLING:clone(R.FLING||[])}}
  function workOf(x){const b=(typeof BIOS==="object"&&BIOS[x])||{};const R=relNow();const g=ACAD.GROUP_OF(x);
    const sg=R.SG.find(p=>p[0]===x||p[1]===x);
    return{name:HN(x),bio:Object.fromEntries(Object.keys(FL).filter(f=>!DERIVED.has(f)).map(f=>[f,b[f]==null?"":String(b[f])])),
      group:g?g.id:"",role:(ACAD.GROUP_ROLE||{})[x]||"",
      bf:(R.BF[x]||[]).slice(),
      sg:sg?{who:sg[0]===x?sg[1]:sg[0],mine:sg[0]===x?sg[2]:sg[3],theirs:sg[0]===x?sg[3]:sg[2],type:sg[4]||"girlfriend"}:null,
      rv:R.RV.filter(p=>p[0]===x||p[1]===x).map(p=>p[0]===x?{who:p[1],ground:p[2],mine:p[3],theirs:p[4]}:{who:p[0],ground:p[2],mine:p[4],theirs:p[3]}),
      fm:R.FAM.filter(p=>p[0]===x||p[1]===x).map(p=>p[0]===x?{who:p[1],type:p[2],is:p[3]||"",back:p[4]||""}:{who:p[0],type:p[2],is:p[4]||"",back:p[3]||""}),
      fl:(R.FLING||[]).filter(p=>p[0]===x||p[1]===x).map(p=>p[0]===x?{who:p[1],mine:p[2]||"",theirs:p[3]||""}:{who:p[0],mine:p[3]||"",theirs:p[2]||""}),
      look:null,fig:figWork(x)}}
  /* v247: her boyfriend and headmistress as Edit canon shows them */
  function figWork(x){const L0=C.layer(),added=C.isAdded(x),am=added?((((L0.add||{}).girls||{})[x]||{}).men||{}):{};
    return Object.fromEntries(["man","head"].map(k=>{const t=T(x+k),a=am[k]||{};const nm=added?(a.name||""):((t&&t.bio&&t.bio.fullName)||""),bl=added?(a.blurb||""):((t&&t.blurb)||"");
      return[k,{name:nm,blurb:bl,name0:nm,blurb0:bl,look:null,reset:false,saved:added?!!a.look:!!((((L0.edits||{}).figures)||{})[x+k]),exists:!!t}]}))}
  const girlSelect=(x,val,onc,allowNone)=>h("select",{class:"adm-in",onchange:e=>onc(e.target.value)},allowNone?h("option",{value:""},allowNone):null,
    (ACAD.GROUPS||[]).map(g=>h("optgroup",{label:g.name},g.members.filter(y=>y!==x).map(y=>{const o=h("option",{value:y},HN(y));if(y===val)o.selected=true;return o}))));
  const ageOfWork=W=>ACAD.ageOf?ACAD.ageOf({age:W.bio.age,dob:W.bio.dob}):null;
  const minorW=W=>{const a=ageOfWork(W);return a!=null&&a<18};
  const linkProblems=t=>{const out=[];String(t||"").replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(m,id)=>{try{if(typeof ENC!=="undefined"&&ENC.resolve&&!ENC.resolve(id))out.push(id)}catch(e){out.push(id)}return m});return out};
  function checks(x,W){const P=[],all=new Set(girls());
    if(!W.name.trim())P.push("Her House name can't be empty.");
    else if(Object.entries(ACAD.HNAME||{}).some(([k,v])=>k!==x&&all.has(k)&&String(v).toLowerCase()===W.name.trim().toLowerCase()))P.push(`Another House is already called ${W.name.trim()}.`);
    const named=[...W.bf,...(W.sg?[W.sg.who]:[]),...W.rv.map(r=>r.who),...W.fm.map(f=>f.who)].filter(Boolean);
    named.forEach(y=>{if(!all.has(y))P.push(`${y} isn't a girl on the roster.`);if(y===x)P.push("She can't be in a relationship with herself.")});
    /* v245b: her full name is another girl's (usually a design started from that girl's robes, biography and all) */
    const fn=String(W.bio.fullName||"").trim().toLowerCase();if(fn){const o=girls().find(y=>y!==x&&typeof BIOS==="object"&&BIOS[y]&&String(BIOS[y].fullName||"").trim().toLowerCase()===fn);
      if(o)P.push(`Her full name, ${W.bio.fullName}, is ${HN(o)}'s. If you started from ${HN(o)}'s robes, her biography came along: empty it in the studio's Biography step, or change it here.`)}
    const dup=(arr,lab)=>{const s=new Set();arr.forEach(y=>{if(s.has(y))P.push(`${HN(y)} is listed twice as ${lab}.`);s.add(y)})};
    dup(W.bf,"a best friend");dup(W.rv.map(r=>r.who),"a rival");dup(W.fm.map(f=>f.who),"family");
    (W.fl||[]).filter(f=>f.who).forEach(f=>{if(minorW(W))P.push("Flings are for adults: her biography age is under 18.");else if(ACAD.isMinor(f.who))P.push(`Flings are for adults: ${HN(f.who)} is under 18 by her biography.`)});dup((W.fl||[]).map(f=>f.who),"a fling");
    if(W.sg&&W.sg.who){if(minorW(W))P.push("Romantic partners are for adults: her biography age is under 18.");else if(ACAD.isMinor(W.sg.who))P.push(`Romantic partners are for adults: ${HN(W.sg.who)} is under 18 by her biography.`)}
    Object.entries(W.bio).forEach(([f,v])=>linkProblems(v).forEach(id=>P.push(`${FL[f]||f}: the link to “${id}” doesn't lead to a page.`)));
    const g0=ACAD.GROUP_OF(x);if(g0&&W.group!==g0.id&&g0.leader===x)P.push(`She leads ${g0.name}. Give the group another leader before moving her.`);
    return P}
  function toDrafts(x,W){const d=drafts();ensure(d,"edits");const b=(typeof BIOS==="object"&&BIOS[x])||{};
    if(C.isAdded(x)){const a=addedEntry(d,x);const minor=minorW(W);a.name=W.name.trim();a.role=W.role;a.group=W.group||a.group;a.adult=!minor;
      a.bio=Object.assign({},a.bio||{});Object.entries(W.bio).forEach(([f,v])=>{if(minor&&(INTIMATE.has(f)||ROMANTIC.has(f)))v="";if(v)a.bio[f]=v;else delete a.bio[f]});
      if(W.look&&W.look!=="reset")a.look=W.look;
      if(W.img){a.images=Object.assign({},a.images||{});if(W.img.por)a.images.por={h:W.img.por.h,c:W.img.por.c};if(W.img.px32)a.images.px32=W.img.px32;if(W.img.px16)a.images.px16=W.img.px16}
      if(W.fig){a.men=Object.assign({},a.men||{});["man","head"].forEach(k=>{const f=W.fig[k];if(!f)return;if(k==="man"&&minor){a.men.man={name:"",blurb:"",look:null};return}
        a.men[k]=Object.assign({},a.men[k]||{},{name:String(f.name||"").trim(),blurb:String(f.blurb||"").trim()});if(f.look)a.men[k].look=f.look;if(f.reset)a.men[k].look=null})}
      relDrafts(d,x,W);return d}
    if(W.fig)["man","head"].forEach(k=>{const f=W.fig[k];if(!f)return;const id=x+k;
      if(f.reset){if(d.edits.figures)delete d.edits.figures[id];return}
      const o=Object.assign({},(d.edits.figures||{})[id]||{});if(String(f.name||"").trim()!==String(f.name0||""))o.fullName=String(f.name||"").trim();if(String(f.blurb||"").trim()!==String(f.blurb0||""))o.blurb=String(f.blurb||"").trim();if(f.look)o.look=f.look;
      if(Object.keys(o).length)ensure(d.edits,"figures")[id]=o});
    if(W.name.trim()!==HN(x))ensure(d.edits,"names")[x]=W.name.trim();
    const minor=minorW(W);
    Object.entries(W.bio).forEach(([f,v])=>{if(minor&&(INTIMATE.has(f)||ROMANTIC.has(f)))v="";const cur=b[f]==null?"":String(b[f]);if(v!==cur)ensure(d.edits,"bios",x)[f]=v});
    if(W.role!==((ACAD.GROUP_ROLE||{})[x]||""))ensure(d.edits,"roles")[x]=W.role;
    const g0=ACAD.GROUP_OF(x);if(W.group&&(!g0||W.group!==g0.id)){const gn=GRP(W.group);
      if(g0)ensure(d.edits,"groups",g0.id).members=g0.members.filter(y=>y!==x);if(gn)ensure(d.edits,"groups",gn.id).members=gn.members.concat([x])}
    relDrafts(d,x,W);
    if(W.look==="reset"){if(d.edits.looks)delete d.edits.looks[x]}else if(W.look)ensure(d.edits,"looks")[x]=W.look;
    if(W.img&&(W.img.por||W.img.px32||W.img.px16)){const im=ensure(d.edits,"images",x);if(W.img.por)im.por={h:W.img.por.h,c:W.img.por.c};if(W.img.px32)im.px32=W.img.px32;if(W.img.px16)im.px16=W.img.px16}
    return d}
  /* relationships: both sides */
  function relDrafts(d,x,W){ensure(d,"edits");
    const R0=relNow(),R=relNow();
    const before=R.BF[x]||[];R.BF[x]=W.bf.slice();
    before.filter(y=>!W.bf.includes(y)).forEach(y=>{R.BF[y]=(R.BF[y]||[]).filter(z=>z!==x);delete R.BF_OUT[y]});
    W.bf.filter(y=>!before.includes(y)).forEach(y=>{R.BF[y]=R.BF[y]||[];if(!R.BF[y].includes(x))R.BF[y].push(x);delete R.BF_OUT[y]});
    if(JSON.stringify(before)!==JSON.stringify(W.bf))delete R.BF_OUT[x];
    R.SG=R.SG.filter(p=>p[0]!==x&&p[1]!==x&&!(W.sg&&W.sg.who&&(p[0]===W.sg.who||p[1]===W.sg.who)));
    if(W.sg&&W.sg.who)R.SG.push([x,W.sg.who,W.sg.mine||"",W.sg.theirs||"",W.sg.type||"girlfriend"]);
    R.RV=R.RV.filter(p=>p[0]!==x&&p[1]!==x).concat(W.rv.filter(r=>r.who).map(r=>[x,r.who,r.ground||"hall",r.mine||"",r.theirs||""]));
    R.FAM=R.FAM.filter(p=>p[0]!==x&&p[1]!==x).concat(W.fm.filter(f=>f.who).map(f=>[x,f.who,f.type==="blood"?"blood":"chosen",f.is||"",f.back||""]));
    R.FLING=R.FLING.filter(p=>p[0]!==x&&p[1]!==x).concat((minorW(W)?[]:(W.fl||[])).filter(f=>f.who).map(f=>[x,f.who,f.mine||"",f.theirs||""]));
    /* a side that hasn't changed keeps its order and stays out of the drafts */
    const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
    const ord=(k,a,b)=>{if(Array.isArray(a)){const key=p=>JSON.stringify(p);const ka=new Set(b.map(key));return a.length===b.length&&a.every(p=>ka.has(key(p)))}return same(a,b)};
    ["BF","BF_OUT","SG","RV","FAM","FLING"].forEach(k=>{if(!ord(k,R[k],R0[k]))ensure(d.edits,"rel")[k]=R[k]});
    return d}
  /* the studio's look, as her robes design keeps it */
  function lookFromStudio(){if(typeof S==="undefined"||!S)return null;const o=(S.outfits||[])[0];if(!o)return null;
    const items={};Object.entries(o.items||{}).forEach(([f,it])=>{if(!it)return;const t=[it.v,it.c];if(it.w||it.c2)t.push(it.w||0);if(it.c2)t.push(it.c2);items[f]=t});
    const conv=o=>{const it={};Object.entries(o.items||{}).forEach(([f,x])=>{if(!x)return;const t=[x.v,x.c];if(x.w||x.c2)t.push(x.w||0);if(x.c2)t.push(x.c2);it[f]=t});return{oname:o.name,look:o.look||"",showUnder:!!o.showUnder,items:it,details:clone(o.details||{}),dcol:clone(o.dcol||{})}};
    /* v248: and the other outfits (his second look, the nude outfit, her Signature lingerie) */
    return{pal:clone(S.pal||{}),c:clone(S.c||{}),outfit:conv(o),more:(S.outfits||[]).slice(1).map(conv),from:S.name||""}}

  /* ---------- v247: design sessions. The studio holds one design at a time. To design her robes, her boyfriend, her
     headmistress, her Signature look or a group's principal, the studio puts the current design aside, loads the draft, and
     a bar at the top says who is being designed. "Use this design" takes the studio's design for them, brings the earlier
     design back and reopens the form it came from; Cancel only brings the earlier design back. A reload keeps the session
     (this browser). ---------- */
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const DSKEY="everspire.admin.design.v1",DRKEY="everspire.admin.designed.v1";
  let DS=null;try{DS=JSON.parse(localStorage.getItem(DSKEY)||"null")}catch(e){DS=null}
  const saveDS=()=>{try{if(DS)localStorage.setItem(DSKEY,JSON.stringify(DS));else localStorage.removeItem(DSKEY);return true}
    catch(e){/* a portrait's full-size source is the bulk of a saved form: drop it and try again */
      try{const w=DS&&DS.back&&DS.back.work;if(w&&w.img&&w.img.por)delete w.img.por.src;localStorage.setItem(DSKEY,JSON.stringify(DS));return true}catch(e2){return false}}};
  const takeDesigned=key=>{try{const r=JSON.parse(localStorage.getItem(DRKEY)||"null");if(r&&r.key===key){localStorage.removeItem(DRKEY);return r}}catch(e){}return null};
  function startDesign(o){if(DS){say(`Finish designing ${DS.title} first.`);return false}
    if(typeof S==="undefined"||typeof replaceState!=="function"||typeof stateFromTemplate!=="function"){say("The studio isn't ready.");return false}
    DS={kind:o.kind,key:o.key,title:o.title,who:o.who||"him",back:o.back,keep:!!o.keep,stash:o.keep?null:JSON.stringify(S)};
    if(!saveDS()){DS=null;say("This browser has no room to hold your current design aside.");return false}
    [ed,gdlg,dlg].forEach(d=>{try{if(d&&d.open)d.close()}catch(e){}});try{if(typeof ENC!=="undefined"&&ENC.close)ENC.close()}catch(e){}
    if(o.start){const t=Object.assign({more:[],out:{framing:"full body"}},clone(o.start),{name:o.title});try{replaceState(stateFromTemplate(t))}catch(e){}}
    showBar();say(`Designing ${o.title}. The studio's changes go to ${DS.who}.`);return true}
  /* v248: what looks wrong about the design for who it's for */
  function designWarnings(kind){const P=[];if(typeof S==="undefined"||!S)return P;const male=typeof isMale==="function"?isMale():S.c.sex==="male";const age=String(S.c.age||"");
    if((kind==="man"||kind==="principal")&&!male)P.push(`This design is a woman, but it's for ${kind==="man"?"her boyfriend":"a principal"}.`);
    if(kind==="principal"&&male&&!/(old|elder|mature|middle|gray|grey|senior)/i.test(age+" "+(S.c.hairBase||"")))P.push(`His age reads “${age||"not set"}”: the principals are older men.`);
    if(kind==="head"&&male)P.push("This design is a man, but it's for her headmistress.");
    if(kind==="head"&&!male&&!/(mature|middle|older|elder|milf)/i.test(age))P.push(`Her age reads “${age||"not set"}”: headmistresses are grown women (a mature woman).`);
    if((kind==="robes"||kind==="sig"||kind==="her")&&male)P.push("This design is a man, but it's for her.");
    const o=(S.outfits||[])[0];if(!o||!Object.keys(o.items||{}).length)P.push("Its first outfit is empty.");
    return P}
  /* v248: try the design in a scene: her boyfriend with her in one of her boyfriend's scenes, her headmistress in one of hers */
  function sceneFor(kind){const W0=DS.key===NEWKEY?NEWW:null;const k=W0?(W0.model||mateOf(W0)):DS.key;if(!k)return null;
    const labels=kind==="man"?["Academy First Date","Academy Slow Dance","Academy Stargazing","Academy Sweethearts"]:["Academy Headmistress Night"];
    for(const l of labels){const g=(PRESET_GROUPS.start||[]).find(x=>x.label===l);if(!g)continue;
      for(const id of g.keys){const t=T(id);if(!t)continue;const o=ACAD.peekOut?ACAD.peekOut(t):t.out;const own=t._house===k||(!t._house&&id.startsWith(k));if(!own)continue;
        if(kind==="man"&&o&&o.pair&&!o.pair.explicit&&/man$/.test(String(o.pair.id||"")))return{t,label:l,W0};if(kind==="head"&&/head/.test(id)&&!(o&&o.pair&&o.pair.explicit))return{t,label:l,W0}}}
    return null}
  function tryScene(){if(!DS||DS.preview)return;const sc=sceneFor(DS.kind);if(!sc)return say("There's no scene to try this design in yet.");
    const lk=lookFromStudio();DS.work=JSON.stringify(S);const tpl={id:"__designing",name:DS.title,pal:lk.pal,c:lk.c,outfit:lk.outfit,more:lk.more||[],out:{framing:"full body"}};
    const i=TEMPLATES.findIndex(t=>t.id==="__designing");if(i>=0)TEMPLATES[i]=tpl;else TEMPLATES.push(tpl);
    const keep=c=>Object.fromEntries(["expression","posture","impression","pose","gaze"].filter(f=>c&&c[f]).map(f=>[f,c[f]]));
    try{replaceState(stateFromTemplate(sc.t));const her=sc.W0&&sc.W0.look;
      mut(()=>{if(DS.kind==="man"){if(her){S.c=Object.assign({},clone(her.c||{}),keep(S.c));S.pal=clone(her.pal||{})}if(S.out.pair){S.out.pair.id="__designing";S.out.pair.outfit=0}}
        else{S.c=Object.assign({},clone(lk.c||{}),keep(S.c));S.pal=clone(lk.pal||{})}},"tryScene");
      try{setTab("pair");goStep("scene")}catch(e){}}catch(e){if(DS.work)try{replaceState(JSON.parse(DS.work))}catch(e2){}DS.work=null;return say("That scene couldn't be loaded.")}
    DS.preview=sc.t.name||sc.label.replace(/^Academy /,"");saveDS();showBar()}
  function backFromScene(){if(!DS||!DS.preview)return;try{replaceState(JSON.parse(DS.work))}catch(e){}DS.preview=null;DS.work=null;saveDS();try{goStep("concept")}catch(e){}showBar()}
  function endDesign(use){if(!DS)return;if(DS.preview)backFromScene();
    if(use){const w=designWarnings(DS.kind);if(w.length&&!confirmBox(w.join("\n")+"\n\nUse this design anyway?"))return}
    const ds=DS;const look=use?lookFromStudio():null;DS=null;saveDS();hideBar();
    if(ds.stash){try{replaceState(JSON.parse(ds.stash))}catch(e){}}
    if(look)try{localStorage.setItem(DRKEY,JSON.stringify({kind:ds.kind,key:ds.key,look}))}catch(e){say("The design couldn't be kept: this browser is out of room.")}
    const b=ds.back||{};
    setTimeout(()=>{try{if(b.group!==undefined)openGroup(b.group||null,{form:b.form,forNew:b.forNew,name:b.form&&b.form.name});else if(b.editor===NEWKEY)openEditor(null,b.tab,true);else if(b.editor)openEditor(b.editor,b.tab,false,b.work)}catch(e){}},50)}
  let dbar=null;
  function hideBar(){if(dbar){dbar.remove();dbar=null}}
  function showBar(){hideBar();if(!DS)return;const keep=DS.keep;
    if(DS.preview){dbar=h("div",{class:"adm-dbar",role:"region","aria-label":"Trying a design in a scene"},
        h("p",null,h("b",null,`Trying ${DS.title} in “${DS.preview}”. `),"This is a preview: nothing here is kept. Go back to keep designing."),
        h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn primary",onclick:backFromScene},"Back to designing")));document.body.prepend(dbar);return}
    const outs=(typeof S!=="undefined"&&S&&S.outfits||[]).map(o=>o.name).filter(Boolean);
    dbar=h("div",{class:"adm-dbar",role:"region","aria-label":"Designing for canon"},
      h("p",null,h("b",null,`Designing ${DS.title}. `),keep?"Change her in the studio, then go back to the wizard.":`Everything you change in the studio now goes to ${DS.who}. Your earlier design comes back after.`,
        !keep&&outs.length>1?h("small",{class:"adm-dbar-outs"},` Every outfit counts: ${outs.join(", ")}. Switch between them in the Outfit step.`):null),
      h("div",{class:"adm-actions"},(DS.kind==="man"||DS.kind==="head")?h("button",{type:"button",class:"adm-btn",onclick:tryScene},"Try in a scene"):null,
        h("button",{type:"button",class:"adm-btn primary",onclick:()=>endDesign(true)},keep?"Back to the wizard":"Use this design"),
        keep?null:h("button",{type:"button",class:"adm-btn",onclick:()=>{if(confirmBox("Stop designing and put your earlier design back? What you changed here is dropped."))endDesign(false)}},"Cancel")));
    document.body.prepend(dbar)}
  /* v248: her wording for one of her model's phrases, from her look and House details (empty when nothing fits) */
  function suggestWord(m,ph,W){const lk=W.look||{},c=lk.c||{},pal=lk.pal||{},d=W.det||{};const res=v=>String(v||"").replace(/@(\w+)(\+@\w+)*/g,(x,k)=>pal[k]||"").replace(/\s+/g," ").trim();
    const low=ph.toLowerCase(),strip=v=>String(v||"").trim().replace(/^(a|an|the)\s+/i,"");const S=(typeof SISLORE==="object"&&SISLORE[m])||{};
    const words=t=>(String(t||"").toLowerCase().match(/[a-z]{5,}/g)||[]).filter(w=>!/^(their|there|under|light|with|lit|glowing)$/.test(w));const has=t=>words(t).some(w=>low.includes(w));
    if(/\bhair\b/.test(low)){const col=res(c.hairBase);if(col)return`${col} hair`}
    if(/\beyes?\b/.test(low)){const e=res(c.eyeOne);if(e)return`${e} ${/eyes/.test(low)?"eyes":"eye"}`}
    if(/\b(bath|baths|onsen|spring|tub)\b/.test(low)&&String(d.bath||"").trim())return strip(d.bath);
    if((/\b(room|tatami|cabin|lair|loft|chamber|bedroom|den|quarters|dormitory)\b/.test(low)||has(S.room))&&String(d.room||"").trim())return strip(d.room);
    if(has(S.out)&&String(d.out||"").trim())return strip(d.out);
    const mot=String(d.mot||"").trim().toLowerCase().replace(/\s+/g,"-");
    if(mot){const sfx=/\s(embroidery|pattern|print|pocket|brooch|emblem|crest|charm|pendant|tattoo)$/.exec(low);if(sfx)return mot+sfx[0];if(/^[a-z]+(-[a-z]+)+$/.test(low))return mot}
    if(/\b(light|lantern|lanterns|glow|fire|flame|flames|moonlight|candle|candles)\b/.test(low)&&String(d.acc||"").trim())return strip(d.acc);
    /* the model's own palette colors become hers */
    const mp=((T(m+"robes")||{}).pal)||{};let out=ph,ch=false;["primary","secondary","third","accent"].forEach(k=>{const a=String(mp[k]||"").toLowerCase(),b=String(pal[k]||"");if(a&&b&&a!==b.toLowerCase()&&low.includes(a)){out=out.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),b);ch=true}});
    return ch?out:""}
  /* the starting design for a new girl's boyfriend or headmistress: her model's (or a groupmate's), the headmistress with her face */
  function draftFigure(W,k){const src=T((W.model||mateOf(W))+k);if(!src)return null;const c=ACAD.peekC?ACAD.peekC(src):src.c;
    if(k==="head"&&W.look)return{pal:clone(W.look.pal||{}),c:Object.assign(clone(W.look.c||{}),{age:"mature woman"}),outfit:clone(src.outfit),more:clone(src.more||[])};
    return{pal:clone(src.pal||{}),c:clone(c||{}),outfit:clone(src.outfit),more:clone(src.more||[])}}
  const lookOfTpl=t=>t?{pal:clone(t.pal||{}),c:clone((ACAD.peekC?ACAD.peekC(t):t.c)||{}),outfit:clone(t.outfit),more:clone(t.more||[])}:null;
  function draftNote(W,k){const mt=W.model||mateOf(W);const who=mt?HN(mt)+"'s":"a groupmate's";
    return W.model?(k==="man"?`A draft: ${who} boyfriend's face and wardrobe, with his own name. His scenes come from ${who} boyfriend's.`:`A draft: her own face grown up, in ${who} headmistress's faculty clothes.`)
      :`A draft: ${who} ${k==="man"?"boyfriend":"headmistress"}, with ${k==="man"?"his":"her"} own name.`}
  function designFigure(W,x,k){const isNew=W.isNew,F=isNew?W.men:W.fig,m=F[k];const girl=isNew?(String(W.name||"").trim()||"her"):HN(x);
    const title=`${m.name?m.name+", ":""}${girl}'s ${k==="man"?"boyfriend":"headmistress"}`;
    let start=m.look;if(!start){if(isNew)start=draftFigure(W,k);else{const t=T(x+k);start=t?lookOfTpl(t):draftFigure(Object.assign({},W,{group:(ACAD.GROUP_OF(x)||{}).id}),k)}}
    if(!start)return say("There's no draft to start from yet: choose her group or the girl her sets are modeled on first.");
    startDesign({kind:k,key:isNew?NEWKEY:x,title,who:k==="man"?"him":"her",start,back:{editor:isNew?NEWKEY:x,tab:"men",work:isNew?null:W}})}
  if(DS)setTimeout(showBar,400);

  /* ---------- v243: a new girl (Make her canon) ---------- */
  const NEWKEY="__new",NKEY="everspire.admin.newgirl.v1";let NEWW=null;
  try{const s0=localStorage.getItem(NKEY);if(s0)NEWW=JSON.parse(s0)}catch(e){}
  pendingSrc=()=>NEWW&&NEWW.pendingGroup;
  const keepNew=()=>{try{if(NEWW)localStorage.setItem(NKEY,JSON.stringify(NEWW));else localStorage.removeItem(NKEY)}catch(e){}};
  const DETF=[["room","Her room","her trophy-lined bedroom"],["bath","Her bathroom","a marble bathroom"],["out","Her outdoor spot","a harbor promenade at golden hour"],
    ["pride","Her title","the undefeated champion"],["role","What she calls herself","the champion"],["pet","Her pet name","Goldie"],["acc","Her accent light","crimson-and-gold accents"],["mot","Her emblem","a golden laurel"]];
  const slug=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"");
  const LOSTG=()=>(typeof ENC!=="undefined"&&ENC.ROLL)||[];
  const lostOf=id=>LOSTG().find(g=>g.id===id);
  function newWork(){const b=(typeof S!=="undefined"&&S&&S.bio)||{};
    const W=newWork0(b);
    /* v244: what her Biography already says about where she belongs */
    const hs=String(b.house||"").replace(/\s*\(?ward\)?$/i,"").replace(/\s+House$/i,"").trim();
    if(hs){const own=(ACAD.HOUSES||[]).find(k=>HN(k).toLowerCase()===hs.toLowerCase());
      const sl=!own&&typeof ENC!=="undefined"&&ENC.sleepingByName?ENC.sleepingByName(hs):null;
      if(own)W.wardOf=own;
      else if(sl&&sl.g&&sl.h&&!(typeof ENC!=="undefined"&&ENC.isAwake&&(ACAD.canonAwake?ACAD.canonAwake():[]).includes(sl.h.id))){W.place={kind:"wake",lost:sl.g.id,house:sl.h.id};W.name=sl.h.name;if(GRP(sl.g.kin))W.group=sl.g.kin}
      else W.name=hs.replace(/\b([a-z])/g,(m,c)=>c.toUpperCase());
      W.typed=own?"":hs.replace(/\b([a-z])/g,(m,c)=>c.toUpperCase())}
    const bgn=String(b.group||"").trim();const bg=(ACAD.GROUPS||[]).find(g=>g.name.toLowerCase()===bgn.toLowerCase());if(bg)W.group=bg.id;
    else if(bgn&&!LOSTG().some(g=>g.name.toLowerCase()===bgn.toLowerCase()))W.newGroup=bgn;
    if(b.groupRole)W.role=String(b.groupRole);
    return W}
  function newWork0(b){
    return{isNew:true,name:"",bio:Object.fromEntries(Object.keys(FL).filter(f=>!DERIVED.has(f)).map(f=>[f,b[f]==null?"":String(b[f])])),group:"",role:"",bf:[],sg:null,rv:[],fm:[],fl:[],
      look:lookFromStudio(),place:{kind:"group",lost:"",house:""},det:Object.fromEntries(DETF.map(f=>[f[0],""])),
      men:{man:{name:"",blurb:"",look:null},head:{name:"",blurb:"",look:null}},img:{}}}
  const wardNote=W=>W.wardOf?h("p",{class:"adm-note"},`Her Biography puts her in ${HN(W.wardOf)} House, which is ${HN(W.wardOf)}'s. A canon girl needs a House of her own: give her a new House name, or wake a sleeping House.`):null;
  /* v244: robes in her palette: a groupmate's robes design (its colors are palette roles, so they follow hers), with the
     groupmate's House name in it changed to hers */
  /* v246: a girl from her group, else her model, else from the group her new group was based on (ACAD.canonMate) */
  const mateOf=W=>{if(!ACAD.canonMate)return"";const pg=pendingGroup(W.group);return ACAD.canonMate("",{model:W.model||""},pg?((NEWW.pendingGroup.entry||{}).base||""):W.group)};
  /* the girl to model her sets on: one of the eighteen original Houses, taken from her group (a wave girl's model) */
  function suggestModel(gid){const M=ACAD.canonModels?ACAD.canonModels():[];const of=x=>M.includes(x)?x:(ACAD.SISTER&&M.includes(ACAD.SISTER[x])?ACAD.SISTER[x]:"");
    const g=GRP(gid);let m=g&&g.members.map(of).find(Boolean);if(m)return m;
    const ag=pendingGroup(gid)?NEWW.pendingGroup.entry:((C.layer().add||{}).groups||{})[gid];if(ag&&ag.base){const b=GRP(ag.base);m=b&&b.members.map(of).find(Boolean)}return m||""}
  /* v246: her look follows the studio's design until she is saved, unless the admin keeps it */
  function refreshLook(W){if(!W||!W.isNew||(W.look&&W.look.pin)||DS)return;const L=lookFromStudio();if(!L)return;
    if(W.look&&W.look.robesFrom&&!Object.keys((L.outfit&&L.outfit.items)||{}).length){const W2=Object.assign({},W,{look:L});const r=robesFor(W2);L.outfit=r?r.outfit:W.look.outfit;L.robesFrom=r?r.mate:W.look.robesFrom}
    W.look=L}
  function robesFor(W){if(!W.group&&!W.model)return null;const mate=mateOf(W);if(!mate)return null;
    const o=clone(tplById(mate+"robes").outfit);const nm=(W.name||"").trim();
    if(nm){const rx=new RegExp("\\b("+[HN(mate),mate].map(z=>z.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")\\b","gi");
      const sw=v=>typeof v==="string"?v.replace(rx,m=>m[0]===m[0].toLowerCase()?nm.toLowerCase():nm):v;
      Object.values(o.items||{}).forEach(t=>{if(Array.isArray(t))t[0]=sw(t[0])});Object.keys(o.details||{}).forEach(k=>{o.details[k]=sw(o.details[k])})}
    return{outfit:o,mate}}
  const emptyOutfit=W=>!W.look||!W.look.outfit||!Object.keys(W.look.outfit.items||{}).length;
  const keyOfNew=W=>W.place.kind==="wake"&&W.place.house?W.place.house:slug(W.name);
  function checksNew(W){const P=[];const k=keyOfNew(W);
    if(!W.look)P.push("Her look: use the studio's current design (Look).");
    else if(emptyOutfit(W))P.push("Her first outfit is empty: choose “Use robes in her palette” on the Look tab, or give her an outfit in the studio.");
    if(W.wardOf&&keyOfNew(W)===W.wardOf)P.push(`${HN(W.wardOf)} House already has its Keeper: give her a House of her own.`);
    if(W.place.kind==="wake"&&!W.place.house)P.push("Placement: choose the sleeping House she wakes.");
    if(!k)P.push("Identity: give her a House name.");
    else if((ACAD.HOUSES||[]).includes(k)||(typeof BIOS==="object"&&BIOS[k]))P.push(`There is already a House called ${W.name||k}.`);
    if(!W.group||!GRP(W.group))P.push("Placement: choose her group.");
    return P}
  /* edits to a girl who was added: her own entry changes, not edits on top of it */
  const addedEntry=(d,x)=>{const cur=((C.layer().add||{}).girls||{})[x];const a=ensure(d,"add","girls");a[x]=clone(Object.assign({},cur||{},a[x]||{}));return a[x]};
  function toDraftsNew(W){const x=keyOfNew(W);const d=drafts();ensure(d,"edits");const minor=minorW(W);
    if(W.pendingGroup&&W.group===W.pendingGroup.id)ensure(d,"add","groups")[W.pendingGroup.id]=clone(W.pendingGroup.entry);
    const bio={};Object.entries(W.bio).forEach(([f,v])=>{if(minor&&(INTIMATE.has(f)||ROMANTIC.has(f)))return;if(v)bio[f]=v});
    if(W.place.kind==="wake"){const g=lostOf(W.place.lost);if(g&&!bio.group2&&W.group!==g.id)bio.group2=g.name}   /* v269: not when she wakes the group itself */
    const lk=W.look?clone(W.look):W.look;if(lk)delete lk.pin;
    const a={name:W.name.trim(),group:W.group,role:W.role,bio,adult:!minor,look:lk,place:clone(W.place),det:clone(W.det),men:clone(W.men),images:clone(W.img||{})};
    if(W.model&&!minor){a.model=W.model;const wd=Object.entries(W.words||{}).map(([p,q])=>[p,String(q||"").trim()]).filter(([p,q])=>q&&q!==p);if(wd.length)a.words=wd;
      if(W.sigLook)a.sigLook=W.sigLook;if(String(W.sigName||"").trim())a.sigName=String(W.sigName).trim()}if(minor&&a.men)a.men.man={name:"",blurb:"",look:null};
    if(W.place.kind==="group"&&W.banner2&&W.banner2.lost)a.banner2={lost:W.banner2.lost,oath:String(W.banner2.oath||"").trim()};
    ensure(d,"add","girls")[x]=a;
    const W2=Object.assign({},W,{sg:minor?null:W.sg});relDrafts(d,x,W2);return{d,x}}

  function loadImg(src){return new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=src})}
  function autoCrop(im){const W=im.naturalWidth,H=im.naturalHeight,sc=Math.min(1,416/W);const w=Math.round(W*sc),hh=Math.round(H*sc);const cv=document.createElement("canvas");cv.width=w;cv.height=hh;
    const x=cv.getContext("2d");x.drawImage(im,0,0,w,hh);const d=x.getImageData(0,0,w,hh).data;const ink=(i,j)=>{const k=(j*w+i)*4;return d[k+3]>16&&Math.min(d[k],d[k+1],d[k+2])<235};
    let top=0;for(let j=0;j<hh;j++){let n=0;for(let i=0;i<w;i++)if(ink(i,j))n++;if(n>3){top=j;break}}
    const band=Math.round(hh*260/1216);let sx=0,n=0;for(let j=top;j<Math.min(hh,top+band);j++)for(let i=0;i<w;i++)if(ink(i,j)){sx+=i;n++}
    const cx=n?sx/n/w:.5,S=380/832;return{x:Math.min(Math.max(cx-S/2,0),1-S),y:Math.max(0,top/hh-12/1216),s:S}}
  async function recrop(p){const im=await loadImg(p.src);const W=im.naturalWidth,H=im.naturalHeight,c=p.crop;
    c.s=Math.min(Math.max(c.s,.15),1);c.x=Math.min(Math.max(c.x,0),1-c.s);const side=c.s*W;c.y=Math.min(Math.max(c.y,0),Math.max(0,(H-side)/H));
    const hc=document.createElement("canvas");hc.width=128;hc.height=128;const hx=hc.getContext("2d");hx.imageSmoothingQuality="high";hx.fillStyle="#fff";hx.fillRect(0,0,128,128);hx.drawImage(im,c.x*W,c.y*H,side,side,0,0,128,128);
    const ch=Math.round(400*H/W),cc=document.createElement("canvas");cc.width=400;cc.height=ch;const cx=cc.getContext("2d");cx.imageSmoothingQuality="high";cx.fillStyle="#fff";cx.fillRect(0,0,400,ch);cx.drawImage(im,0,0,400,ch);
    return{src:p.src,crop:c,h:hc.toDataURL("image/webp",.82),c:cc.toDataURL("image/webp",.8)}}
  async function portraitFrom(file){const src=await new Promise((ok,no)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=no;r.readAsDataURL(file)});
    const im=await loadImg(src);return recrop({src,crop:autoCrop(im)})}

  let ed=null;
  function openEditor(x,tab,isNew,work){if(x&&!isNew&&ACAD.mayEdit&&!ACAD.mayEdit("girl:"+x))return say("Only the admin changes what is already in Everspire. Add something new instead.");if(DS){say(`Finish designing ${DS.title} first: use the bar at the top of the studio.`);showBar();return}
    if(ed)ed.remove();const W=isNew?(NEWW=NEWW||newWork()):(work||workOf(x));if(isNew){x=NEWKEY;refreshLook(W)}if(!W.img)W.img={};
    /* v247: a design just made in the studio for her, her boyfriend, her headmistress or her Signature look */
    {const r=takeDesigned(x);if(r){const F=isNew?W.men:W.fig;if((r.kind==="man"||r.kind==="head")&&F&&F[r.kind]){F[r.kind].look=r.look;F[r.kind].reset=false}
      else if(r.kind==="robes")W.look=r.look;else if(r.kind==="her")W.look=Object.assign(r.look,W.look&&W.look.pin?{pin:true}:{});else if(r.kind==="sig")W.sigLook=r.look;if(isNew)keepNew()}}
    let cur=tab||(isNew?"look":"identity");
    ed=h("dialog",{class:"adm-dlg adm-ed",id:"canonDlg","aria-label":isNew?"Make her canon":"Edit canon: "+HN(x)});
    const tabs=isNew?[["look","Look"],["identity","Identity"],["place","Placement"],["details","House details"],["bio","Biography"],["rel","Relationships"],["men","Boyfriend and headmistress"],["images","Images"],["review","Review"]]
      :[["identity","Identity"],["group","Group"],["bio","Biography"],["rel","Relationships"],["look","Look"],["men","Boyfriend and headmistress"],["images","Images"]];
    const nav=h("div",{class:"adm-tabs",role:"tablist"});const pane=h("div",{class:"adm-pane"});{const pa=pane.append.bind(pane);pane.append=(...k)=>pa(...k.filter(z=>z!=null&&z!==false))}const msg=h("div",{class:"adm-checks",role:"alert"});
    const field=(f,lab,kind,opt)=>{const v=W.bio[f]||"";let inp;
      if(kind==="a")inp=h("textarea",{class:"adm-in",rows:3,oninput:e=>{W.bio[f]=e.target.value}},v);
      else if(kind==="s")inp=h("select",{class:"adm-in",onchange:e=>{W.bio[f]=e.target.value}},h("option",{value:""},"—"),(opt||[]).map(o=>{const e=h("option",{value:o},o);if(o===v)e.selected=true;return e}));
      else if(kind==="d")inp=h("input",{class:"adm-in",type:"date",value:v,oninput:e=>{W.bio[f]=e.target.value;draw()}});
      else inp=h("input",{class:"adm-in",type:"text",value:v,oninput:e=>{W.bio[f]=e.target.value;if(f==="age")ageNote()}});
      /* v245: every girl's answers, then write your own in the box */
      if((kind==="t"||kind==="a"||!kind)&&ACAD.bioOptions&&ACAD.bioOptions(f)){const O=ACAD.bioOptions(f);const panel=h("div",{class:"adm-opts",hidden:true});
        const cOf=()=>W.isNew?(W.look&&W.look.c):((typeof tplById==="function"&&(tplById((ACAD.robes&&ACAD.robes(x))||x+"robes")||tplById(x+"robes"))||{}).c);
        const set=val=>{W.bio[f]=val;inp.value=val;if(f==="age")ageNote()};
        const apply=val=>{const cur=String(W.bio[f]||"");if(O.list&&cur.trim()){if(cur.toLowerCase().split(/\s*[,;]\s*/).includes(val.toLowerCase()))return;set(cur.replace(/[\s,;.]+$/,"")+", "+val)}else set(val)};
        const q=h("input",{class:"adm-in",type:"search",placeholder:"Search every girl's answers"});const list=h("div",{class:"adm-chips"});
        const fill=()=>{list.textContent="";const t=q.value.trim().toLowerCase();const sug=ACAD.SIZE_FIELDS&&ACAD.SIZE_FIELDS.includes(f)&&ACAD.sizeSuggest?ACAD.sizeSuggest(cOf())[f]:null;
          if(sug&&!t)list.append(h("button",{type:"button",class:"adm-chip adm-sug",onclick:()=>apply(sug)},"Suggested: "+sug));
          O.items.filter(o=>!t||o.toLowerCase().includes(t)).slice(0,80).forEach(o=>list.append(h("button",{type:"button",class:"adm-chip",onclick:()=>apply(o)},o.length>90?o.slice(0,88)+"…":o)))};
        q.addEventListener("input",fill);
        panel.append(q,h("p",{class:"adm-muted"},O.list?"Each one you pick is added. Write your own in the box above.":"Picking one replaces the answer. Write your own in the box above."),list);
        const btn=h("button",{type:"button",class:"adm-btn sm",onclick:()=>{panel.hidden=!panel.hidden;if(!panel.hidden)fill()}},"Options");
        return h("div",{class:"adm-f","data-f":f},h("span",null,lab),h("div",null,h("div",{class:"adm-row adm-fi"},inp,btn),panel))}
      return h("label",{class:"adm-f","data-f":f},h("span",null,lab),inp)};
    /* v246: the Review tab's Add goes to the field itself */
    let focusF="";const toField=()=>{if(!focusF)return;const el=pane.querySelector(`[data-f="${focusF}"] .adm-in`);focusF="";if(el){el.scrollIntoView({block:"center"});el.focus()}};
    const ageBox=h("p",{class:"adm-note"});
    const ageNote=()=>{const m=minorW(W);ageBox.style.display=m?"":"none";ageBox.textContent=m?"Under 18: she is kept out of the Scene Archive, intimate scenes and romantic relationships. Her intimacy and romance fields are cleared when you save.":""};
    /* v248: a tick on each finished tab, and Next through them in order */
    const doneOf=k=>{if(!isNew)return false;const tr=v=>String(v||"").trim();
      switch(k){case"look":return!!W.look&&!emptyOutfit(W);case"identity":return!!(tr(W.name)&&tr(W.bio.fullName));case"place":return!!(W.group&&GRP(W.group)&&(W.place.kind!=="wake"||W.place.house));
        case"details":return DETF.some(([f])=>tr(W.det[f]));case"bio":return!!(tr(W.bio.summary)&&tr(W.bio.backstory));case"rel":return!!(W.bf.length||W.sg||W.rv.length||W.fm.length);
        case"men":return!!((minorW(W)||tr(W.men.man.name)||W.men.man.look)&&(tr(W.men.head.name)||W.men.head.look));case"images":return!!(W.img.por||W.img.px32);default:return false}};
    function draw(){pane.textContent="";nav.querySelectorAll("button").forEach(b=>{b.setAttribute("aria-selected",b.dataset.t===cur?"true":"false");const dn=doneOf(b.dataset.t);b.classList.toggle("done",dn);b.title=dn?"Done":""});
      {const i=tabs.findIndex(t=>t[0]===cur);nextBtn.hidden=!isNew||i>=tabs.length-1;if(i<tabs.length-1)nextBtn.textContent="Next: "+tabs[i+1][1]}
      if(cur==="identity"){const woke=W.isNew&&W.place.kind==="wake";
        pane.append(h("label",{class:"adm-f"},h("span",null,"House name"),h("input",{class:"adm-in",type:"text",value:W.name,disabled:woke,oninput:e=>{W.name=e.target.value;title.textContent=W.name||"New girl"}})));
        if(woke)pane.append(h("p",{class:"adm-muted"},"She is called by the name of the House she woke."));
        if(W.isNew){const wn=wardNote(W);if(wn)pane.append(wn)}
        const s=SECS.find(z=>z[0]==="identity");(s?s[2]:[]).filter(f=>!DERIVED.has(f[0])).forEach(f=>pane.append(field(f[0],f[1],f[2],f[3])));pane.append(ageBox);ageNote()}
      else if(cur==="group"){const g0=ACAD.GROUP_OF(x);
        pane.append(h("label",{class:"adm-f"},h("span",null,"Group"),h("select",{class:"adm-in",onchange:e=>{W.group=e.target.value}},(ACAD.GROUPS||[]).map(g=>{const o=h("option",{value:g.id},g.name);if(g.id===W.group)o.selected=true;return o}))),
          h("label",{class:"adm-f"},h("span",null,"Role in her group"),h("textarea",{class:"adm-in",rows:3,oninput:e=>{W.role=e.target.value}},W.role)),
          h("p",{class:"adm-muted"},"The role reads best as a short title, a full stop, then a sentence: “The Trickster. The Pack's schemer…”."+(g0&&g0.leader===x?" She leads "+g0.name+".":"")));
        /* v270: sworn to the banner of a group that has woken: she stays where she is unless she moves to it */
        {const sw=ACAD.swornTo?ACAD.swornTo(x):null;const wg=sw&&(ACAD.GROUPS||[]).find(z=>z.id===sw.lost);
          if(wg&&W.group!==wg.id)pane.append(h("div",{class:"adm-note"},h("p",{style:"margin:0 0 8px"},`She is sworn to ${wg.name.replace(/^The /,"the ")}'s banner, and ${wg.name.replace(/^The /,"the ")} has woken. She stays in ${(GRP(W.group)||g0||{name:"her group"}).name} unless you move her; her House goes with her.`),
            g0&&g0.leader===x?h("p",{class:"adm-muted",style:"margin:0 0 8px"},`She leads ${g0.name}: choose its next leader first (Change leader on its page).`):null,
            h("button",{type:"button",class:"adm-btn sm",disabled:g0&&g0.leader===x?true:null,onclick:()=>{W.group=wg.id;W.role=W.role&&/^leader\b/i.test(W.role)?W.role.replace(/^leader\b/i,"Sworn"):W.role;draw()}},`Move her to ${wg.name}`)));
          else if(wg&&W.group===wg.id&&g0&&g0.id!==wg.id)pane.append(h("p",{class:"adm-note"},`She moves to ${wg.name} when you save. Her House goes with her, and she no longer carries its banner as a second.`))}}
      else if(cur==="bio"){const minor=minorW(W);
        SECS.filter(z=>!["identity"].includes(z[0])).forEach(z=>{const fs=z[2].filter(f=>!DERIVED.has(f[0])&&!(minor&&(INTIMATE.has(f[0])||ROMANTIC.has(f[0]))));if(!fs.length)return;
          pane.append(h("h4",null,z[1]));
          if(z[0]==="sizes"&&ACAD.sizeSuggest)pane.append(h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const c=W.isNew?(W.look&&W.look.c):((typeof tplById==="function"&&(tplById((ACAD.robes&&ACAD.robes(x))||x+"robes")||tplById(x+"robes"))||{}).c);
            const sg=ACAD.sizeSuggest(c);let n=0;(ACAD.SIZE_FIELDS||[]).forEach(k=>{if(!String(W.bio[k]||"").trim()&&sg[k]){W.bio[k]=sg[k];n++}});say(n?`Filled ${n} ${n===1?"size":"sizes"} from her body.`:"Her sizes are already filled in.");draw()}},"Fill sizes from her body"));
          pane.append(...fs.map(f=>field(f[0],f[1],f[2],f[3])))});
        if(minor)pane.append(h("p",{class:"adm-note"},"Intimacy and romance fields are hidden: her biography age is under 18."))}
      else if(cur==="rel"){const minor=minorW(W);
        /* best friends */
        const bfBox=h("div",{class:"adm-chips"},W.bf.map((y,i)=>h("span",{class:"adm-chip"},HN(y),h("button",{type:"button","aria-label":"Remove "+HN(y),onclick:()=>{W.bf.splice(i,1);draw()}},"×"))));
        pane.append(h("h4",null,"Best friends"),bfBox,h("div",{class:"adm-row"},girlSelect(x,"",v=>{if(v&&!W.bf.includes(v)){W.bf.push(v);draw()}},"Add a best friend…")),
          h("p",{class:"adm-muted"},"Best friends are both ways: adding one here adds her on the other girl's side too."));
        /* v253: her partner, and what they are to each other */
        pane.append(h("h4",null,"Partner"));
        if(minor)pane.append(h("p",{class:"adm-note"},"Not available: her biography age is under 18."));
        else{pane.append(h("div",{class:"adm-row"},girlSelect(x,W.sg&&W.sg.who,v=>{W.sg=v?{who:v,mine:(W.sg&&W.sg.mine)||"",theirs:(W.sg&&W.sg.theirs)||"",type:(W.sg&&W.sg.type)||"girlfriend"}:null;draw()},"None"),
          W.sg&&W.sg.who&&ACAD.ROM?h("select",{class:"adm-in adm-romtype","aria-label":"What they are to each other",onchange:e=>{W.sg.type=e.target.value}},ACAD.ROM.girlTypes().map(t=>{const o=h("option",{value:t.id},t.label);if(t.id===(W.sg.type||"girlfriend"))o.selected=true;return o})):null));
          if(W.sg&&W.sg.who)pane.append(h("label",{class:"adm-f"},h("span",null,`What ${W.name} says about ${HN(W.sg.who)}`),h("input",{class:"adm-in",type:"text",value:W.sg.mine,oninput:e=>{W.sg.mine=e.target.value}})),
            h("label",{class:"adm-f"},h("span",null,`What ${HN(W.sg.who)} says about ${W.name}`),h("input",{class:"adm-in",type:"text",value:W.sg.theirs,oninput:e=>{W.sg.theirs=e.target.value}})),
            h("p",{class:"adm-muted"},`A girl has one partner among the girls: if ${HN(W.sg.who)} has another, that pairing ends. A secret girlfriend is hidden from everyone; a situationship is undefined on purpose.`))}
        /* rivals */
        pane.append(h("h4",null,"Rivals"));
        W.rv.forEach((r,i)=>pane.append(h("div",{class:"adm-card"},h("div",{class:"adm-row"},girlSelect(x,r.who,v=>{r.who=v},"Choose a girl…"),
            h("select",{class:"adm-in",onchange:e=>{r.ground=e.target.value}},GROUNDS.concat(GROUNDS.some(g=>g[0]===r.ground)||!r.ground?[]:[[r.ground,r.ground]]).map(([k,l])=>{const o=h("option",{value:k},l);if(k===r.ground)o.selected=true;return o})),
            h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.rv.splice(i,1);draw()}},"Remove")),
          h("label",{class:"adm-f"},h("span",null,`${W.name} on ${r.who?HN(r.who):"her"}`),h("input",{class:"adm-in",type:"text",value:r.mine||"",oninput:e=>{r.mine=e.target.value}})),
          h("label",{class:"adm-f"},h("span",null,`${r.who?HN(r.who):"She"} on ${W.name}`),h("input",{class:"adm-in",type:"text",value:r.theirs||"",oninput:e=>{r.theirs=e.target.value}})))));
        pane.append(h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.rv.push({who:"",ground:"hall",mine:"",theirs:""});draw()}},"Add a rival"));
        /* family */
        pane.append(h("h4",null,"Family"));
        W.fm.forEach((f,i)=>pane.append(h("div",{class:"adm-card"},h("div",{class:"adm-row"},girlSelect(x,f.who,v=>{f.who=v;draw()},"Choose a girl…"),
            h("select",{class:"adm-in",onchange:e=>{f.type=e.target.value}},(ACAD.FAMTYPES||[["blood","Blood relatives"],["chosen","Step, adoptive or chosen family"]]).map(([k,l])=>{const o=h("option",{value:k},l);if(k===f.type)o.selected=true;return o})),
            h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.fm.splice(i,1);draw()}},"Remove")),
          h("label",{class:"adm-f"},h("span",null,`${f.who?HN(f.who):"She"} is ${W.name}'s…`),h("input",{class:"adm-in",type:"text",placeholder:"sister, cousin, step-sister",value:f.is,oninput:e=>{f.is=e.target.value}})),
          h("label",{class:"adm-f"},h("span",null,`${W.name} is ${f.who?HN(f.who)+"'s":"her"}…`),h("input",{class:"adm-in",type:"text",placeholder:"sister, cousin, step-sister",value:f.back,oninput:e=>{f.back=e.target.value}})))));
        pane.append(h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.fm.push({who:"",type:"blood",is:"",back:""});draw()}},"Add family"),
          h("p",{class:"adm-muted"},"Family is lore. It shows on House pages and in the circle web and never reaches an image prompt."));
        /* v249: flings, for adults: lore on her House page, never a scene */
        pane.append(h("h4",null,"Flings"));W.fl=W.fl||[];
        if(minorW(W))pane.append(h("p",{class:"adm-note"},"Not available: her biography age is under 18."));
        else{W.fl.forEach((f,i)=>pane.append(h("div",{class:"adm-card"},h("div",{class:"adm-row"},girlSelect(x,f.who,v=>{f.who=v;draw()},"Choose a girl…"),
            h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.fl.splice(i,1);draw()}},"Remove")),
          h("label",{class:"adm-f"},h("span",null,`${W.name||"She"} on ${f.who?HN(f.who):"her"}`),h("input",{class:"adm-in",type:"text",placeholder:"Strictly research.",value:f.mine||"",oninput:e=>{f.mine=e.target.value}})),
          h("label",{class:"adm-f"},h("span",null,`${f.who?HN(f.who):"She"} on ${W.name||"her"}`),h("input",{class:"adm-in",type:"text",value:f.theirs||"",oninput:e=>{f.theirs=e.target.value}})))));
          pane.append(h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.fl.push({who:"",mine:"",theirs:""});draw()}},"Add a fling"),
            h("p",{class:"adm-muted"},"A fling is a secret on the side, alongside anything else: a girl can have several. It shows on both girls' House pages and is never a scene."))}}
      else if(cur==="look"&&W.isNew){
        pane.append(h("p",null,"Her look is the studio's current design: face, hair, body, palette and her first outfit, which becomes her robes. Design her in the studio first, then come back here."),
          W.look?h("p",{class:"adm-note"},W.look.pin?`Her look is kept as taken from the studio${W.look.from?" (“"+W.look.from+"”)":""}.`:`Her look follows the studio's design${W.look.from?" (“"+W.look.from+"”)":""} until you save her: change her in the studio and the change comes with her.`):h("p",{class:"adm-note"},"No look yet."),
          W.look?h("label",{class:"adm-radio"},h("input",{type:"checkbox",checked:!!W.look.pin,onchange:e=>{if(e.target.checked)W.look.pin=true;else{delete W.look.pin;refreshLook(W)}draw()}}),"Keep this look, whatever the studio shows next"):null,
          h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const L=lookFromStudio();if(!L)return say("The studio has no design to take.");const pin=W.look&&W.look.pin;W.look=L;if(pin)L.pin=true;draw()}},W.look?"Take the studio's design now":"Use the studio's current design")),
          emptyOutfit(W)&&W.look?h("div",{class:"adm-note"},h("p",{style:"margin:0 0 8px"},"Her first outfit is empty."+(W.group?"":" Choose her group in Placement to take its robes.")),
            W.group||W.model?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const r=robesFor(W);if(!r)return say("There are no robes to take.");W.look.outfit=r.outfit;W.look.robesFrom=r.mate;draw()}},"Use robes in her palette"):null):null,
          W.look&&W.look.robesFrom?h("p",{class:"adm-note"},`Robes in her palette, cut like ${HN(W.look.robesFrom)}'s.`):null,
          W.look?h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>startDesign({kind:"her",key:NEWKEY,title:String(W.name||"").trim()||"your new girl",who:"her",keep:true,start:W.look,back:{editor:NEWKEY,tab:"look"}})},"Load her into the studio")):null,
          h("p",{class:"adm-muted"},"You can close this window to work in the studio; your new girl waits here until you save her or start over."));
        /* v247: her Signature look, cut from her model's */
        if(W.model&&!minorW(W)){const ms=T(W.model+"signature");
          pane.append(h("h4",null,"Her Signature look"),h("p",{class:"adm-note"},W.sigLook?"Designed in the studio.":ms?`Cut from ${HN(W.model)}'s Signature look (“${String(ms.name||"").replace(/\s*\(.*\)$/,"")}”), on her face and palette.`:`${HN(W.model)} has no Signature look to cut hers from.`),
            ms?h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{if(!W.look)return say("She needs a look first.");const start=W.sigLook||{pal:clone(W.look.pal||{}),c:clone(W.look.c||{}),outfit:clone(ms.outfit),more:clone(ms.more||[])};
                startDesign({kind:"sig",key:NEWKEY,title:`${String(W.name||"").trim()||"her"} Signature look`,who:"her Signature look",start,back:{editor:NEWKEY,tab:"look"}})}},W.sigLook?"Design it again":"Design it in the studio"),
              W.sigLook?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.sigLook=null;draw()}},"Back to the cut from "+HN(W.model)):null):null,
            ms?h("label",{class:"adm-f"},h("span",null,"Its name"),h("input",{class:"adm-in",type:"text",placeholder:W.det&&W.det.pride?String(W.det.pride).replace(/^the\s+/i,"").replace(/\b\w/g,z=>z.toUpperCase()):"Moonlit Lodge",value:W.sigName||"",oninput:e=>{W.sigName=e.target.value}})):null)}}
      else if(cur==="place"){
        const rad=(v,l)=>h("label",{class:"adm-radio"},h("input",{type:"radio",name:"admPlace",checked:W.place.kind===v,onchange:()=>{W.place.kind=v;if(v==="group"){if(W.typed)W.name=W.typed}else{const hs=((lostOf(W.place.lost)||{houses:[]}).houses.find(z=>z.id===W.place.house));if(hs)W.name=hs.name}title.textContent=W.name||"New girl";draw()}}),l);
        pane.append(h("div",{class:"adm-row"},rad("group","Join a group"),rad("wake","Wake a sleeping House")));
        {const wn=wardNote(W);if(wn)pane.append(wn)}
        if(W.place.kind==="wake"&&W.typed&&W.typed.toLowerCase()===String(W.name).toLowerCase())pane.append(h("p",{class:"adm-note"},`${W.typed} is also a sleeping House on the Roll, so she wakes it. To make ${W.typed} a new House of her own instead, choose Join a group: the name stays.`));
        if(W.place.kind==="group"&&W.name&&typeof ENC!=="undefined"&&ENC.sleepingByName&&ENC.sleepingByName(W.name))pane.append(h("p",{class:"adm-muted"},`There is also a sleeping House called ${W.name} on the Roll. It stays asleep, and hers is a new House.`));
        {const pg=pendingGroup();if(pg)pane.append(h("div",{class:"adm-note"},h("p",{style:"margin:0 0 8px"},`${pg.name} is made canon with her, when you save her.`),
          h("button",{type:"button",class:"adm-btn sm",onclick:()=>{ed.close();openGroup(null,{form:NEWW.pendingGroup.form,forNew:true,name:pg.name})}},`Change ${pg.name}`)))}
        if(W.newGroup&&!groupsAll().some(g=>g.name.toLowerCase()===W.newGroup.toLowerCase()))pane.append(h("div",{class:"adm-note"},h("p",{style:"margin:0 0 8px"},`Her Biography names a group that doesn't exist yet: ${W.newGroup}.`),
          h("button",{type:"button",class:"adm-btn sm",onclick:()=>{ed.close();openGroup(null,{name:W.newGroup,forNew:true})}},`Create ${W.newGroup}`)));
        /* v269: found a new group for her, from her own Place step */
        if(W.place.kind==="group"&&!pendingGroup())pane.append(h("div",{class:"adm-row"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>{ed.close();openGroup(null,{forNew:true,name:""})}},"Found a new group for her"),
          h("span",{class:"adm-muted",style:"margin-left:8px"},"Her House is its first. It is forming until it has five.")));
        if(W.place.kind==="wake"){const g=lostOf(W.place.lost);
          pane.append(h("label",{class:"adm-f"},h("span",null,"Sleeping group"),h("select",{class:"adm-in",onchange:e=>{W.place.lost=e.target.value;W.place.house="";const lg=lostOf(e.target.value);if(lg&&GRP(lg.kin))W.group=lg.kin;draw()}},h("option",{value:""},"Choose…"),
              LOSTG().map(lg=>{const o=h("option",{value:lg.id},lg.name+" ("+lg.kind+")");if(lg.id===W.place.lost)o.selected=true;return o}))));
          if(g)pane.append(h("label",{class:"adm-f"},h("span",null,"The House she wakes"),h("select",{class:"adm-in",onchange:e=>{W.place.house=e.target.value;const hs=g.houses.find(z=>z.id===e.target.value);if(hs){W.name=hs.name;title.textContent=W.name}draw()}},h("option",{value:""},"Choose…"),
              g.houses.map(hs=>{const taken=(ACAD.HOUSES||[]).includes(hs.id)||(typeof ENC!=="undefined"&&ENC.isAwake&&ENC.isAwake(hs.id));const o=h("option",{value:hs.id,disabled:taken},hs.name+(taken?" (awake)":""));if(hs.id===W.place.house)o.selected=true;return o}))),
            (()=>{/* v269: carry its banner within a living group, or wake the group itself */
              const awake=(ACAD.GROUPS||[]).find(z=>z.id===g.id),pg=pendingGroup(g.id);
              if(awake){if(W.group!==g.id){W.group=g.id}return h("p",{class:"adm-note"},`${g.name} is awake: she joins it, and her House is one of its places.`)}
              const wakeIt=!!pg;const r2=(v,l)=>h("label",{class:"adm-radio"},h("input",{type:"radio",name:"admWakeHow",checked:wakeIt===v,onchange:()=>{
                if(v){ed.close();openGroup(null,{forNew:true,name:g.name,form:wakeForm(g)})}else{if(NEWW&&NEWW.pendingGroup&&NEWW.pendingGroup.id===g.id){delete NEWW.pendingGroup;if(W.group===g.id)W.group=GRP(g.kin)?g.kin:"";keepNew()}draw()}}}),l);
              return h("div",null,h("div",{class:"adm-row"},r2(false,`Carry its banner in a living group`),r2(true,`Wake ${g.name} itself`)),
                h("p",{class:"adm-muted"},wakeIt?`${g.name} wakes with her as a forming group, her House its first and she its leader. Its last principal wakes with it.`:`${g.name} sleeps on, so she joins a living group and carries ${g.name}'s banner as her second. Its kin is ${(GRP(g.kin)||{name:"another group"}).name}.`))})())}
        pane.append(h("label",{class:"adm-f"},h("span",null,"Her group"),h("select",{class:"adm-in",onchange:e=>{const was=suggestModel(W.group);W.group=e.target.value;if(W.isNew&&(W.model===undefined||W.model===was))W.model=suggestModel(W.group);draw()}},h("option",{value:""},"Choose…"),groupsAll().map(g=>{const o=h("option",{value:g.id},g.name);if(g.id===W.group)o.selected=true;return o}))),
          h("label",{class:"adm-f"},h("span",null,"Role in her group"),h("textarea",{class:"adm-in",rows:3,oninput:e=>{W.role=e.target.value}},W.role)),
          h("p",{class:"adm-muted"},"The role reads best as a short title, a full stop, then a sentence: “The Trickster. The Pack's schemer…”."));
        /* v246: her sets, modeled on one of the eighteen original girls */
        {const minor=minorW(W);const M=ACAD.canonModels?ACAD.canonModels():[];if(W.model===undefined&&W.group){W.model=suggestModel(W.group)}
          pane.append(h("h4",null,"Her wardrobe and scenes"));
          if(minor)pane.append(h("p",{class:"adm-note"},"Her biography age is under 18, so she gets her robes only: the model girls' sets include intimate scenes."));
          else pane.append(h("label",{class:"adm-f"},h("span",null,"Model her sets on"),h("select",{class:"adm-in",onchange:e=>{W.model=e.target.value;draw()}},h("option",{value:""},"Nobody (her robes only)"),
              (()=>{const grp=(lab,list)=>list.length?h("optgroup",{label:lab},list.map(m=>{const o=h("option",{value:m},HN(m)+(ACAD.modelSister&&ACAD.modelSister(m)!==m?` (cut from ${HN(ACAD.modelSister(m))})`:""));if(m===W.model)o.selected=true;return o})):null;
                const G=id=>((ACAD.GROUPS||[]).find(g=>g.id===id)||{members:[]}).members;
                const orig=M.filter(m=>(ACAD.OLDHOUSES||[]).includes(m)),syn=M.filter(m=>G("synth").includes(m)),vo=M.filter(m=>G("void").includes(m)),rest=M.filter(m=>!orig.includes(m)&&!syn.includes(m)&&!vo.includes(m));
                return [grp("The Synth (written plainly, for building on)",syn),grp("The Void (written plainly, for building on)",vo),grp("The eighteen original Houses",orig),grp("Others",rest)].filter(Boolean)})())),
            h("p",{class:"adm-muted"},W.model?`Every look set and scene set ${HN(W.model)} has is re-cut for her: ${HN(W.model)}'s outfits and scenes on her face, body and palette, with ${HN(W.model)}'s rooms, titles and pet name swapped for hers from House details. Her best friend and her partner take ${HN(W.model)}'s partners' places; a relationship she doesn't have leaves those scenes out. She gets a Signature look cut from ${HN(W.model)}'s, and her boyfriend and headmistress start from ${HN(W.model)}'s.`
              :"Choose a girl to give her a full wardrobe, scenes and a Scene Archive shelf. The Synth and the Void are written plainly, so there is almost nothing of theirs to rewrite; the eighteen original Houses bring their own flavor."))}
        if(W.place.kind==="group"&&typeof ENC!=="undefined"&&ENC.CHAMP&&LOSTG().length){const b2=W.banner2||(W.banner2={lost:"",oath:""});
          pane.append(h("h4",null,"Second banner (optional)"),h("label",{class:"adm-f"},h("span",null,"A sleeping group she'd carry"),h("select",{class:"adm-in",onchange:e=>{b2.lost=e.target.value;draw()}},h("option",{value:""},"None"),
              LOSTG().map(lg=>{const o=h("option",{value:lg.id},lg.name+" ("+lg.kind+")");if(lg.id===b2.lost)o.selected=true;return o}))),
            b2.lost?h("label",{class:"adm-f"},h("span",null,"Why she'd carry it"),h("input",{class:"adm-in",type:"text",placeholder:"she still sings its morning songs in the conservatory",value:b2.oath||"",oninput:e=>{b2.oath=e.target.value}})):null,
            h("p",{class:"adm-muted"},"She swears to carry its banner beside her own if it ever wakes, as its champion has. It shows in her House record and on the sleeping group's page."))}}
      else if(cur==="details"){pane.append(h("p",{class:"adm-muted"},W.model?`Her sets and the Scene Archive's scenes put her in these places and call her these names. Anything left empty stays as ${HN(W.model)}'s, the girl her sets are modeled on.`:"The Scene Archive's scenes and the shared scenes put her in these places and call her these names. Anything left empty uses a plain stand-in (“her bedroom”)."));
        DETF.forEach(([k,l,ph])=>pane.append(h("label",{class:"adm-f"},h("span",null,l),h("input",{class:"adm-in",type:"text",placeholder:ph,value:W.det[k]||"",oninput:e=>{W.det[k]=e.target.value}}))));
        /* v247: the model's own phrases in the scenes she's modeled on, with her wording */
        if(W.model&&ACAD.modelPhrases&&!minorW(W)){const P=ACAD.modelPhrases(W.model);W.words=W.words||{};const SUG={};P.forEach(p=>{SUG[p.from]=suggestWord(W.model,p.from,W)});
          const nSug=P.filter(p=>SUG[p.from]&&!String(W.words[p.from]||"").trim()).length;
          if(P.length){const low=String(W.name||"").trim().toLowerCase();const lst=h("div",{class:"adm-words"});let all=false;
            const fillL=()=>{lst.textContent="";(all?P:P.slice(0,15)).forEach(p=>{const auto=p.auto&&low?p.from.replace(new RegExp("\\b"+W.model+"(es|s)?\\b","gi"),low):"";const ex=p.ex[0]||["",""];
              lst.append(h("label",{class:"adm-f"},h("span",null,p.from,h("small",{class:"adm-muted"}," in "+p.n+(p.n===1?" place":" places"))),
                h("input",{class:"adm-in",type:"text",value:W.words[p.from]||"",placeholder:SUG[p.from]?`Suggested: “${SUG[p.from]}”`:auto?`Empty: “${auto}”`:`Empty: stays. ${HN(ex[0])} has “${ex[1]}”`,oninput:e=>{W.words[p.from]=e.target.value}})))});
              if(!all&&P.length>15)lst.append(h("button",{type:"button",class:"adm-btn sm",onclick:()=>{all=true;fillL()}},`Show all ${P.length}`))};
            pane.append(h("h4",null,`Words from ${HN(W.model)}'s scenes`),
              nSug?h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn sm",onclick:()=>{let n=0;P.forEach(p=>{if(SUG[p.from]&&!String(W.words[p.from]||"").trim()){W.words[p.from]=SUG[p.from];n++}});say(`${n} ${n===1?"suggestion":"suggestions"} filled in from her look and House details. Check them over.`);draw()}},`Fill in ${nSug} ${nSug===1?"suggestion":"suggestions"}`)):null,h("p",{class:"adm-muted"},`Phrases that belong to ${HN(W.model)} in the scenes she's modeled on, most used first, with what other girls modeled on ${HN(W.model)} have instead. Give her own wording for any that don't fit her.`),lst);fillL()}}}
      else if(cur==="men"){const F=W.isNew?W.men:W.fig;
        pane.append(h("p",{class:"adm-muted"},"Design them the way you designed her. The studio puts your current design aside and loads the draft; a bar at the top shows who you're designing. Choose “Use this design” there and you come back here, with your earlier design back in the studio."));
        [["man","Her boyfriend","him"],["head","Her headmistress","her"]].forEach(([k,l,pr])=>{const m=F&&F[k];if(!m)return;
          if(k==="man"&&minorW(W)){pane.append(h("h4",null,l),h("p",{class:"adm-note"},"Not available: her biography age is under 18."));return}
          const His=pr==="him"?"His":"Her";
          const status=m.reset?`Ready to save: ${pr==="him"?"his":"her"} original look comes back.`:m.look?`${His} look: designed in the studio${m.look.from?" (“"+m.look.from+"”)":""}.`:W.isNew?draftNote(W,k):m.exists===false?`${His} draft is made when she's saved.`:`${His} current look. Design ${pr} to change it.`;
          pane.append(h("h4",null,l),h("label",{class:"adm-f"},h("span",null,"Name"),h("input",{class:"adm-in",type:"text",value:m.name||"",oninput:e=>{m.name=e.target.value}})),
            h("label",{class:"adm-f"},h("span",null,"In a few words"),h("textarea",{class:"adm-in",rows:2,oninput:e=>{m.blurb=e.target.value}},m.blurb||"")),
            h("p",{class:"adm-note"},status),
            h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const lk=m.look||(W.isNew?draftFigure(W,k):lookOfTpl(T(x+k)));if(!lk||!ACAD.describeFigure)return say("There's no design to describe yet.");
              const girl=W.isNew?(String(W.name||"").trim()||"her"):HN(x);m.blurb=ACAD.describeFigure(lk,(String(m.name||"").trim()?String(m.name).trim()+", ":"")+(k==="man"?"her boyfriend":`the ${girl} headmistress`));draw()}},`Write it from ${pr==="him"?"his":"her"} design`)),
            m.look&&!String(m.blurb||"").trim()&&W.isNew?h("p",{class:"adm-muted"},`With no words of your own, ${pr==="him"?"his":"her"} description is written from the design: “${ACAD.describeFigure?ACAD.describeFigure(m.look,"…"):""}”`):null,
            m.look&&!W.isNew&&String(m.blurb||"")===String(m.blurb0||"")&&m.blurb0?h("p",{class:"adm-muted"},`The description above is still the one for ${pr==="him"?"his":"her"} old look: update it to match.`):null,
            h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>designFigure(W,x,k)},m.look?`Design ${pr} again`:`Design ${pr} in the studio`),
              m.look?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{m.look=null;draw()}},W.isNew?"Back to the draft":`Keep ${pr==="him"?"his":"her"} current look`):null,
              !W.isNew&&m.saved&&!m.look&&!m.reset?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{m.reset=true;draw()}},"Restore the original"):null,
              /* v259: his whole biography has an editor of its own, on his page */
              k==="man"&&!W.isNew&&ADMIN&&ACAD.admin.boy&&T(x+"man")&&T(x+"man").bio&&T(x+"man").bio.fullName?h("button",{type:"button",class:"adm-btn",onclick:()=>{ed.close();ACAD.admin.boy(x)}},"His biography"):null))})}
      else if(cur==="images"){const kx=W.isNew?keyOfNew(W):x;
        const por=W.img.por||(!W.isNew&&ACAD.portraitURL&&ACAD.portraitURL(x)?{h:ACAD.portraitURL(x),c:ACAD.portraitURL(x,true)}:null);
        const pinput=h("input",{type:"file",accept:"image/*",style:"display:none",onchange:e=>{const f=e.target.files[0];if(!f)return;portraitFrom(f).then(p=>{W.img.por=p;draw()}).catch(()=>say("That image couldn't be read."));e.target.value=""}});
        pane.append(h("h4",null,"Portrait"),h("p",{class:"adm-muted"},"A tall image works best (832×1216, like every portrait). The round crop is found from the top of the figure; nudge it if it misses."),
          h("div",{class:"adm-row adm-por"},por?h("img",{src:por.c,alt:"Portrait card",class:"adm-porc"}):null,por?h("img",{src:por.h,alt:"Round crop",class:"adm-porh"}):null,
            h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>pinput.click()},por?"Replace portrait":"Upload portrait"),pinput,
              W.img.por&&W.img.por.src?h("span",{class:"adm-nudge"},...[["Up",0,-1],["Down",0,1],["Left",-1,0],["Right",1,0],["Closer",0,0,-1],["Wider",0,0,1]].map(([l,dx,dy,ds])=>h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const c=W.img.por.crop;c.x+=dx*0.02;c.y+=dy*0.02;if(ds)c.s*=ds>0?1.08:0.93;recrop(W.img.por).then(p=>{W.img.por=p;draw()})}},l))):null)));
        const p32=W.img.px32||(ACAD.PIXEL||{})[kx],p16=W.img.px16||(ACAD.PIXEL16||{})[kx];
        const thumb=(p,n)=>p&&ACAD.pixelEditor?h("img",{src:ACAD.pixelEditor.urlOf(ACAD.pixelEditor.toGrid(p,n),3),width:n*3,height:n*3,alt:n+"×"+n,style:"image-rendering:pixelated"}):h("span",{class:"adm-muted"},"None yet");
        pane.append(h("h4",null,"Pixel art"),h("div",{class:"adm-row"},thumb(p32,32),thumb(p16,16),
          h("button",{type:"button",class:"adm-btn",onclick:()=>{if(!ACAD.pixelEditor)return;const woke=W.isNew&&W.place.kind==="wake"&&W.place.house&&typeof ENC!=="undefined";
            ACAD.pixelEditor.open({title:(W.name||"Her")+" pixel head",fileBase:(kx||"pixel_head"),start32:p32||(woke?(ENC.ROLLPX||{})[W.place.house]:null),start16:p16||(woke?(ENC.ROLLPX16||{})[W.place.house]:null),
              onUse:(a,b)=>{W.img.px32=a;W.img.px16=b;draw()}})}},p32?"Edit pixel art":"Draw pixel art")),
          W.isNew&&W.place.kind==="wake"?h("p",{class:"adm-muted"},"Without art of her own she takes the woken head of the House she woke."):null);
        /* v248: a head made from her look, recolored from her model's or a groupmate's */
        {const src=W.isNew?(W.model||mateOf(W)):x;const lk=W.isNew?W.look:(W.look&&W.look!=="reset"?W.look:null);
          if(src&&lk&&ACAD.pixelEditor&&ACAD.pixelEditor.fromLook&&!(W.isNew&&W.place.kind==="wake"&&!W.model))pane.append(h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const r=ACAD.pixelEditor.fromLook(src,lk);if(!r)return say("There's no head to start from.");
              W.img.px32=r.px32;W.img.px16=r.px16;say(`Pixel art made from her look, on ${HN(src)}'s head. Open the editor to touch it up.`);draw()}},W.img.px32?"Make it again from her look":"Make it from her look")),
            h("p",{class:"adm-muted"},`${HN(src)}'s head in her colors: hair, skin, eyes and robes. Then touch it up in the editor if you like.`))}
        /* v246: her portrait prompt, the same form as the hundred's */
        const pr=h("textarea",{class:"adm-in",rows:6,readonly:true,hidden:true,"aria-label":"Her image prompt"});
        pane.append(h("h4",null,"Image prompt"),h("p",{class:"adm-muted"},"Her robes portrait prompt in the same form as every girl's (a cowboy shot in the shared pose and style line), with its Undesired Content. Generate it at 832×1216 with seed 42, then upload the image as her portrait."),
          h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const lk=W.look&&W.look!=="reset"?W.look:null;const t=lk&&ACAD.robesSheet?ACAD.robesSheet(lk,(W.name||HN(x))+" robes"):(W.isNew?null:x);
            if(!t)return say("She needs a look first (Look).");const P=robesPrompts([t]);if(!P||!P[0])return say("The prompt couldn't be made here.");
            const text=P[0].prompt+"\n\nUndesired Content:\n"+P[0].uc;pr.value=text;pr.hidden=false;
            const ok=()=>say("Prompt copied, with its Undesired Content."),no=()=>{pr.focus();pr.select();say("The prompt is below: copy it from there.")};
            try{navigator.clipboard.writeText(text).then(ok,no)}catch(e){no()}}},"Copy her image prompt")),pr)}
      else if(cur==="review"){const minor=minorW(W);const rows=[];const R=(ok,l,t)=>rows.push([ok,l,t]);
        const bf=Object.keys(FL).filter(f=>!DERIVED.has(f)&&!(minor&&(INTIMATE.has(f)||ROMANTIC.has(f))));const filled=bf.filter(f=>String(W.bio[f]||"").trim()).length;
        R(!!W.look&&!emptyOutfit(W),"Her look and robes","look");
        R(!!W.model&&!minor,W.model&&!minor?`Her wardrobe, scenes and Scene Archive shelf, re-cut from ${HN(W.model)}'s`:"Her wardrobe: her robes only (choose a girl to model her sets on)","place");
        if(!minor)R(!!(W.men.man.name||W.men.man.look),"Her boyfriend: a name or a look of his own","men");R(!!(W.men.head.name||W.men.head.look),"Her headmistress: a name or a look of her own","men");
        R(filled>=Math.round(bf.length*.6),`Biography: ${filled} of ${bf.length} fields`,"bio");
        [["summary","the lead"],["backstory","Before Everspire"],["notes","Overheard"],["occupation","Studies"],["birthplace","From"],["catchphrase",""]].forEach(([f,l])=>{const id=(SECS.find(z=>z[0]==="identity")||[0,0,[]])[2].some(z=>z[0]===f);
          R(!!String(W.bio[f]||"").trim(),(FL[f]||f)+(l?` (${l} on her page)`:""),(id?"identity":"bio")+":"+f)});
        R(W.bf.length>0,"Best friends","rel");if(!minor)R(!!(W.sg&&W.sg.who),"Partner","rel");R(W.rv.length>0,"Rivals","rel");R(W.fm.length>0,"Family","rel");if(!minor)R((W.fl||[]).length>0,"Flings (optional)","rel");
        if(W.place.kind==="group")R(!!(W.banner2&&W.banner2.lost),"Second banner (optional)","place");
        if(W.model&&!minor&&ACAD.modelPhrases){const P=ACAD.modelPhrases(W.model),n=P.filter(p=>!p.auto&&!String((W.words||{})[p.from]||"").trim()).length;R(!n,n?`Words from ${HN(W.model)}'s scenes (optional): ${n} left as ${HN(W.model)}'s`:"Her own words in her scenes","details")}
        R(DETF.some(([k])=>String(W.det[k]||"").trim()),"House details: her rooms, titles and pet name","details");
        /* v248: her group, when it's new */
        {const pg=pendingGroup(W.group),ag=!pg&&C.isAddedGroup&&C.isAddedGroup(W.group)?(((C.layer().add||{}).groups||{})[W.group]):null,ge=pg?NEWW.pendingGroup.entry:ag;
          if(ge){const gn=(GRP(W.group)||{name:"Her group"}).name;const go=pg?"group:pending":"group:"+W.group;
            R(!!String(ge.lore||"").trim(),`${gn}: who they are`,go);if(ge.rival)R(!!String(ge.turf||"").trim(),`${gn}: where they clash with ${(GRP(ge.rival)||{name:"their rivals"}).name}`,go);
            R(!!(ge.principal&&ge.principal.full),`${gn}: a principal (optional)`,go);if(ge.principal&&ge.principal.full)R(!!(ge.principal.look||(pg&&NEWW.pendingGroup.form&&NEWW.pendingGroup.form.plook0)),`${gn}: his look designed (optional)`,go)}}
        R(!!W.img.por,"Portrait","images");R(!!(W.img.px32||(W.place.kind==="wake"&&W.place.house)),"Pixel art","images");
        const todo=rows.filter(r=>!r[0]).length;
        pane.append(h("p",null,todo?`What her pages will have. ${todo} ${todo===1?"thing is":"things are"} still empty: add them now, or any time later from Edit canon.`:"Everything her pages show is filled in."),
          h("ul",{class:"adm-review"},rows.map(([ok,l,t])=>h("li",{class:ok?"ok":"todo"},h("span",{class:"mk","aria-hidden":"true"},ok?"✓":"–"),h("span",null,l),ok?null:h("button",{type:"button",class:"adm-btn sm",onclick:()=>{const [tb,fd]=t.split(":");
          if(tb==="group"){ed.close();if(fd==="pending")openGroup(null,{form:NEWW.pendingGroup.form,forNew:true,name:(pendingGroup()||{}).name});else openGroup(fd);return}
          cur=tb;focusF=fd||"";draw();toField()}},"Add")))))}
      else if(cur==="look"){const has=(drafts().edits||{}).looks&&drafts().edits.looks[x];
        pane.append(h("p",null,"Her look is her robes design: face, hair, body, palette and robes. Design it in the studio: your current design is put aside while you do, and comes back after."),
          h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const t=T(x+"robes");const L=W.look&&W.look!=="reset"?W.look:t?{pal:t.pal,c:ACAD.peekC?ACAD.peekC(t):t.c,outfit:t.outfit}:null;if(!L)return say("She has no robes design.");
              startDesign({kind:"robes",key:x,title:HN(x)+"'s robes",who:"her",start:L,back:{editor:x,tab:"look",work:W}})}},W.look&&W.look!=="reset"?"Design her robes again":"Design her robes in the studio"),
            has?h("button",{type:"button",class:"adm-btn",onclick:()=>{W.look="reset";draw()}},"Restore her original look"):null),
          W.look&&W.look!=="reset"?h("p",{class:"adm-note"},"Ready to save: her robes design as you made it in the studio."):null,
          W.look==="reset"?h("p",{class:"adm-note"},"Ready to save: her robes design goes back to the original."):null,
          h("p",{class:"adm-muted"},"Her portrait and pixel art don't change with her look."))}}
    const title=h("h2",null,isNew?(W.name||"New girl"):HN(x));
    tabs.forEach(([k,l])=>nav.append(h("button",{type:"button",role:"tab","data-t":k,onclick:()=>{cur=k;draw()}},l)));
    const nextBtn=h("button",{type:"button",class:"adm-btn",onclick:()=>{const i=tabs.findIndex(t=>t[0]===cur);if(i<tabs.length-1){cur=tabs[i+1][0];draw();pane.scrollTop=0;const b=nav.querySelector(`[data-t="${cur}"]`);if(b)b.focus()}}},"Next");
    const foot=h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},nextBtn,
      isNew?h("button",{type:"button",class:"adm-btn danger",onclick:()=>{if(confirmBox("Start this new girl over?")){NEWW=null;keepNew();openEditor(null,null,true)}}},"Start over"):null,
      h("button",{type:"button",class:"adm-btn",onclick:()=>ed.close()},isNew?"Keep for later":"Cancel"),
      h("button",{type:"button",class:"adm-btn primary",onclick:()=>{if(isNew)refreshLook(W);const P=checks(x,W).concat(isNew?checksNew(W):[]);msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.map(p=>h("li",null,p))));return}
        if(isNew){const r=toDraftsNew(W);NEWW=null;keepNew();
          try{if(typeof S!=="undefined"&&S){S.bio=Object.assign({},S.bio||{},{house:r.x});const g=GRP(W.group);if(g)S.bio.group=g.name;if(typeof flushSave==="function")flushSave()}}catch(e){}
          commit(r.d,{page:"house:"+r.x})}else commit(toDrafts(x,W),{page:"house:"+x})}},isNew?"Make her canon":"Save changes")));
    ed.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>ed.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},isNew?"Make her canon":"Edit canon"),title,nav,pane),foot);
    if(isNew)ed.addEventListener("close",keepNew);
    document.body.append(ed);ed.showModal();draw()}

  /* ---------- v245: groups, new and existing ---------- */
  const crestPreview=(shape,c)=>{const p=(ACAD.CREST||{})[shape];if(!p)return null;const cv=document.createElement("canvas");cv.width=64;cv.height=64;const x=cv.getContext("2d");const col=Object.assign({o:"#1d1b22"},p.c,c||{});
    p.r.forEach((row,y)=>{for(let i=0;i<16;i++){const ch=row[i];if(ch===".")continue;x.fillStyle=col[ch]||"#f0f";x.fillRect(i*4,y*4,4,4)}});return h("img",{src:cv.toDataURL(),width:64,height:64,alt:"Crest preview",class:"adm-crest"})};
  /* v269: a sleeping group woken whole: the New group form filled from the Roll (name, kind, motto, haunt, colors, crest,
     story, faction, kin), with its last principal waking with it */
  const wakeForm=lg=>{const kin=(ACAD.GROUPS||[]).find(z=>z.id===lg.kin);const cols=(lg.words||[]).slice(0,3);while(cols.length<3)cols.push("");
    const nm=lg.name;return {name:nm,kind:lg.kind||"",motto:lg.motto||"",hangout:lg.haunt||"",lore:lg.story||"",faction:lg.faction==="dawn"||lg.faction==="dusk"?lg.faction:((typeof ENC!=="undefined"&&ENC.FACTIONS&&ENC.FACTIONS[0]||{}).id||""),
      rival:"",base:kin?kin.id:((ACAD.GROUPS||[])[0]||{}).id||"",cols,crest:(lg.emblemName||"")?`a ${lg.emblemName}`:"",shape:kin?kin.id:"",c:Object.assign({},lg.cols||{}),
      rows:typeof ENC!=="undefined"&&ENC.lostCrestRows?ENC.lostCrestRows(lg.id):null,woken:lg.id,hall:"",hang:"",
      pfull:"",ptitle:`the last principal of ${nm.replace(/^The /,"the ")}`,pblurb:`${nm}'s principal when it slept, who walked out with it the morning it woke, no more than a few years older than the day its doors closed.`}};
  ACAD.admin_wakeForm=wakeForm;
  let gdlg=null;
  function openGroup(gid,o){o=o||{};if(gid&&ACAD.mayEdit&&!ACAD.mayEdit("group:"+gid))return say("Only the admin changes what is already in Everspire. Add something new instead.");if(gdlg)gdlg.remove();const isNew=!gid;const g=gid?GRP(gid):null;const X=(gid&&ACAD.GX&&ACAD.GX[gid])||{};const CR=(gid&&ACAD.CREST&&ACAD.CREST[gid])||{};
    const fac=gid&&typeof ENC!=="undefined"&&ENC.factionOf?ENC.factionOf(gid):null;
    const base0=(ACAD.GROUPS||[])[0]||{};const BX=ACAD.GX?ACAD.GX[base0.id]||{}:{};const BC=(ACAD.CREST||{})[base0.id]||{c:{}};
    const W={name:g?g.name:(o.name||""),kind:g?g.kind:"",motto:g?g.motto:"",hangout:g?g.hangout:"",lore:g?g.lore:"",leader:g?g.leader:"",rival:g?g.rival:"",
      faction:fac?fac.id:((typeof ENC!=="undefined"&&ENC.FACTIONS&&ENC.FACTIONS[0]||{}).id||""),base:base0.id||"",
      cols:(g?X.cols:BX.cols||[]).slice(0,3),crest:g?X.crest||"":"",shape:gid||base0.id,c:Object.assign({},(g?CR.c:BC.c)||{}),hall:"",hang:""};
    /* v246: where they clash with their rivals, and a principal */
    {const P0=gid&&(ACAD.PRINCIPALS||{})[gid];W.turf=g&&g.rival?((ACAD.GTURF||{})[[gid,g.rival].sort().join("|")]||""):"";W.pfull=P0?P0.full||"":"";W.ptitle=P0?P0.title||"":"";W.pblurb=P0?P0.blurb||"":"";
      W.turf0=W.turf;W.p0=[W.pfull,W.ptitle,W.pblurb].join("\n")}
    while(W.cols.length<3)W.cols.push("");
    /* v247: back from designing the principal: the form as it was, and his new look */
    W.plook=null;if(o.form){Object.assign(W,o.form);if(o.form.plook0&&!W.plook)W.plook=o.form.plook0;delete W.plook0}{const r=takeDesigned("group:"+(gid||"new"));if(r&&r.kind==="principal")W.plook=r.look}
    gdlg=h("dialog",{class:"adm-dlg",id:"groupDlg","aria-label":isNew?"New group":"Edit group"});
    const pane=h("div",{class:"adm-pane"}),msg=h("div",{class:"adm-checks",role:"alert"});{const pa=pane.append.bind(pane);pane.append=(...k)=>pa(...k.filter(z=>z!=null&&z!==false))}
    const inp=(lab,k,ta,ph)=>h("label",{class:"adm-f"},h("span",null,lab),ta?h("textarea",{class:"adm-in",rows:3,placeholder:ph||"",oninput:e=>{W[k]=e.target.value}},W[k]):h("input",{class:"adm-in",type:"text",placeholder:ph||"",value:W[k],oninput:e=>{W[k]=e.target.value}}));
    const sel=(lab,k,opts,none)=>h("label",{class:"adm-f"},h("span",null,lab),h("select",{class:"adm-in",onchange:e=>{W[k]=e.target.value;
      if(k==="base"&&isNew){const bx=(ACAD.GX||{})[W.base]||{},bc=(ACAD.CREST||{})[W.base]||{};W.cols=(bx.cols||[]).slice(0,3);while(W.cols.length<3)W.cols.push("");W.c=Object.assign({},bc.c||{});W.shape=W.base}
      if(k==="base"||k==="shape")draw()}},none?h("option",{value:""},none):null,opts.map(([v,l])=>{const e=h("option",{value:v},l);if(v===W[k])e.selected=true;return e})));
    const groupOpts=(ACAD.GROUPS||[]).filter(z=>z.id!==gid).map(z=>[z.id,z.name]);
    function draw(){pane.textContent="";
      if(W.woken)pane.append(h("p",{class:"adm-note"},`${W.name} wakes from the Roll of Sleeping Houses with her: its name, motto, haunt, colors and sigil are its own, and its last principal wakes with it. Its other Houses stay asleep on the Roll as its open places.`));
      pane.append(inp("Name","name",false,"The Burrow"),inp("Kind","kind",false,"Burrowing animals"),inp("Motto","motto",false,"Dig deep."),inp("Hangout","hangout",false,"The old cellars under the kitchens"),inp("Who they are","lore",true));
      pane.append(sel("Faction","faction",((typeof ENC!=="undefined"&&ENC.FACTIONS)||[]).map(f=>[f.id,f.name])),sel("Rival group","rival",groupOpts,"None"),
        inp("Where they clash","turf",false,"in the great hall, fighting over the best table"),h("p",{class:"adm-muted"},"With their rivals. It reads after “They clash …” on both groups' pages and sets the rivalry scenes."));
      if(!isNew)pane.append(h("div",{class:"adm-f"},h("span",null,"Leader"),h("p",{class:"adm-muted",style:"margin:0 0 6px"},g&&g.leader?`${HN(g.leader)} leads it. A new leader takes the title Leader, and ${HN(g.leader)} a new role, so the change is made in its own step.`:"Nobody yet: the first girl to join leads it."),
        g&&g.members.length>1&&ACAD.admin&&ACAD.admin.leader?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{gdlg.close();ACAD.admin.leader(gid)}},"Change leader"):null));   /* v268 */
      if(isNew)pane.append(sel("Based on","base",groupOpts),h("p",{class:"adm-muted"},"Her scenes in the group's hall and hangout, and its Group Colors outfit, start from this group's, in the new colors. The first girl to join leads it until you choose another."));
      pane.append(h("h4",null,"Colors and crest"),h("div",{class:"adm-row adm-cols3"},...[0,1,2].map(i=>h("input",{class:"adm-in",type:"text",placeholder:["first color","second color","third color"][i],value:W.cols[i]||"",oninput:e=>{W.cols[i]=e.target.value}}))),
        inp("Crest","crest",false,"a silver burrow key"),sel("Crest shape","shape",(ACAD.GROUPS||[]).filter(z=>ACAD.CREST&&ACAD.CREST[z.id]).map(z=>{const n=z.name.replace(/^The /,"the ");return[z.id,"Like "+n+(/s$/.test(n)?"'":"'s")]})),
        h("div",{class:"adm-row adm-crestrow"},crestPreview(W.shape,W.c),...[["a","Field"],["b","Band"],["e","Mark"],["f","Highlight"]].map(([k,l])=>h("label",{class:"adm-col"},h("input",{type:"color",value:W.c[k]||"#888888",oninput:e=>{W.c[k]=e.target.value;const im=pane.querySelector(".adm-crest");if(im)im.replaceWith(crestPreview(W.shape,W.c))}}),l))));
      {const bp=(ACAD.PRINCIPALS||{})[W.base];pane.append(h("h4",null,"Principal (optional)"),inp("Name","pfull",false,"Edmund Kingsley"),inp("Title","ptitle",false,"the Sovereign"),inp("In a sentence","pblurb",true,"The group's principal: a tall old man with…"),
        h("p",{class:"adm-muted"},isNew||!(ACAD.PRINCIPALS||{})[gid]?`He answers to the faction's dean and gets a page, a place in the chain of office and his own scenes.`:"He answers to the faction's dean; his page and scenes follow these."));
        const pt=gid&&T("principal"+gid),bt=T("principal"+(isNew||!pt?W.base:gid));
        pane.append(h("p",{class:"adm-note"},W.plook?"His look: designed in the studio.":pt?"His look: his current design.":bt?`His look starts from ${bp?bp.full+", "+(GRP(W.base)||{name:"the group it's based on"}).name+"'s principal":"another principal"}. Design him to make him your own.`:"No principal to start his look from."),
          h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>{const nm=String(W.pfull||"").trim();if(!nm)return say("Give him a name first.");
              const src=W.plook||lookOfTpl(pt)||lookOfTpl(bt);if(!src)return say("There's no principal to start from.");
              const form=Object.assign({},W);delete form.plook;
              startDesign({kind:"principal",key:"group:"+(gid||"new"),title:`${nm}, principal of ${String(W.name||"").trim()||"the new group"}`,who:"him",start:src,back:{group:gid||"",form,forNew:!!o.forNew}})}},W.plook?"Design him again":"Design him in the studio"),
            W.plook?h("button",{type:"button",class:"adm-btn sm",onclick:()=>{W.plook=null;draw()}},pt?"Keep his current look":"Back to the draft"):null))}
      if(isNew)pane.append(h("h4",null,"Scene settings (optional)"),inp("Their hall, in scene words","hall",false,"in a lantern-lit cellar hall under the kitchens"),inp("Their hangout, in scene words","hang",false,"a cozy root cellar strewn with cushions"))}
    const look=()=>({cols:W.cols.map(c=>c.trim()).filter(Boolean),crest:W.crest.trim(),shape:W.shape,c:Object.assign({},W.c)});
    const saveIt=()=>{const P=[];const nm=W.name.trim();const id=gid||slug(nm.replace(/^the\s+/i,""));
      const wk=W.woken||"";   /* v269: waking a sleeping group keeps its own name and id */
      if(!nm)P.push("Give the group a name.");else if((ACAD.GROUPS||[]).some(z=>z.id!==gid&&z.name.toLowerCase()===nm.toLowerCase())||LOSTG().some(z=>z.id!==wk&&z.name.toLowerCase()===nm.toLowerCase()))P.push(`There is already a group called ${nm}.`);
      if(isNew&&id&&((ACAD.GROUPS||[]).some(z=>z.id===id)||LOSTG().some(z=>z.id===id&&z.id!==wk)))P.push("Choose a different name: that one is taken by another group's crest.");
      if(wk&&id!==wk)P.push(`A woken group keeps its name from the Roll (${(lostOf(wk)||{}).name||wk}).`);
      if(wk&&!String(W.pfull||"").trim())P.push("Name its principal: he wakes with it.");
      if(!W.faction)P.push("Choose its faction.");
      msg.textContent="";if(P.length){msg.append(h("b",null,"Fix these first"),h("ul",null,P.map(p=>h("li",null,p))));return}
      const d=drafts();
      if(isNew){const lk=look();if(W.hall.trim())lk.hall=W.hall.trim();if(W.hang.trim())lk.hang=W.hang.trim();
        if(W.woken&&Array.isArray(W.rows))lk.r=W.rows.slice();
        ensure(d,"add","groups")[id]=Object.assign({name:nm,kind:W.kind.trim(),motto:W.motto.trim(),hangout:W.hangout.trim(),lore:W.lore.trim(),faction:W.faction,rival:W.rival,base:W.base,look:lk},extra(),W.woken?{woken:W.woken,wokeYear:String(new Date().getFullYear())}:{});
        /* v248: made from the wizard, it waits with her: no reload */
        if(o.forNew&&NEWW){const entry=d.add.groups[id];delete d.add.groups[id];const form=Object.assign({},W);delete form.plook;
          NEWW.pendingGroup={id,entry,form:Object.assign(form,{plook0:W.plook||null})};NEWW.group=id;if(NEWW.model===undefined||!NEWW.model)NEWW.model=suggestModel(id);keepNew();
          gdlg.close();say(`${nm} is ready. It's made canon when you save her.`);setTimeout(()=>openEditor(null,"place",true),30);return}
        return commit(d,{page:"group:"+id})}
      if(C.isAddedGroup&&C.isAddedGroup(gid)){const a=ensure(d,"add","groups");a[gid]=Object.assign({},((C.layer().add||{}).groups||{})[gid]||{},a[gid]||{},{name:nm,kind:W.kind,motto:W.motto,hangout:W.hangout,lore:W.lore,faction:W.faction,rival:W.rival,look:Object.assign({},(((C.layer().add||{}).groups||{})[gid]||{}).look||{},look())},extra());
        if(W.leader)ensure(d.edits=d.edits||{},"groups",gid).leader=W.leader;return commit(d,{page:"group:"+gid})}
      ensure(d,"edits");const ch={};["name","kind","motto","hangout","lore","leader","rival"].forEach(k=>{if(String(W[k]||"")!==String(g[k]||""))ch[k]=W[k]});
      if(Object.keys(ch).length)Object.assign(ensure(d.edits,"groups",gid),ch);
      const lk=look();if(JSON.stringify(lk.cols)!==JSON.stringify((X.cols||[]).slice(0,3))||lk.crest!==(X.crest||"")||lk.shape!==gid||JSON.stringify(lk.c)!==JSON.stringify(CR.c||{}))ensure(d.edits,"glooks")[gid]=lk;
      if(fac&&W.faction!==fac.id)ensure(d.edits,"groups",gid).faction=W.faction;
      {const x=extra();if(String(W.turf||"").trim()!==String(W.turf0||"").trim()||[W.pfull,W.ptitle,W.pblurb].join("\n")!==W.p0)ensure(d.edits,"gextra")[gid]=Object.assign({turf:"",principal:null},x)}
      if(W.plook)ensure(d.edits,"figures")["principal"+gid]=Object.assign({},(d.edits.figures||{})["principal"+gid]||{},{look:W.plook});
      commit(d,{page:"group:"+gid})};
    function extra(){const o={};const t=String(W.turf||"").trim();if(t)o.turf=t;const f=String(W.pfull||"").trim();if(f)o.principal={full:f,title:String(W.ptitle||"").trim(),blurb:String(W.pblurb||"").trim()};
      /* a new group's principal carries his designed look; an older group's goes with the figures */
      if(f&&(isNew||(C.isAddedGroup&&C.isAddedGroup(gid)))){const prev=(((C.layer().add||{}).groups||{})[gid]||{}).principal;const lk=W.plook||(prev&&prev.look);if(lk)o.principal.look=lk}return o}
    gdlg.append(h("button",{type:"button",class:"adm-x","aria-label":"Close",onclick:()=>gdlg.close()},"×"),
      h("div",{class:"adm-body"},h("p",{class:"adm-kicker"},isNew?"New group":"Edit group"),h("h2",null,isNew?(W.name||"New group"):g.name),pane),
      h("div",{class:"adm-foot"},msg,h("div",{class:"adm-actions"},h("button",{type:"button",class:"adm-btn",onclick:()=>gdlg.close()},"Cancel"),h("button",{type:"button",class:"adm-btn primary",onclick:saveIt},isNew?"Make the group canon":"Save changes"))));
    document.body.append(gdlg);gdlg.showModal();draw()}
  /* an Edit group card on each group page */
  if(typeof ENC!=="undefined"&&ENC.pages)(ACAD.GROUPS||[]).forEach(g=>{const p=ENC.pages["group:"+g.id];if(!p||!p.build)return;const b0=p.build;
    p.build=function(el){b0.apply(this,arguments);const side=el.querySelector(".enc-side");if(!side||!(ACAD.mayEdit?ACAD.mayEdit("group:"+g.id):ADMIN))return;
      side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Change the group's name, motto, hangout, story, leader, rival, colors or crest."),
        h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openGroup(g.id)},"Edit group"))))}});

  /* v247: and an Edit card on each principal's page */
  if(typeof ENC!=="undefined"&&ENC.pages)(ACAD.GROUPS||[]).forEach(g=>{const p=ENC.pages["principal:"+g.id];if(!p||!p.build)return;const b0=p.build;
    p.build=function(el){b0.apply(this,arguments);const side=el.querySelector(".enc-side");if(!side||!(ACAD.mayEdit?ACAD.mayEdit("group:"+g.id):ADMIN))return;
      side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Change his name, title, description or look."),
        h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openGroup(g.id)},"Edit him"))))}});
  /* ---------- Edit canon on her House page ---------- */
  if(typeof ENC!=="undefined"&&ENC.buildHouse){const bh=ENC.buildHouse;ENC.buildHouse=function(el,x){bh.apply(this,arguments);const side=el.querySelector(".enc-side");if(!side||!(ACAD.mayEdit?ACAD.mayEdit("girl:"+x):ADMIN))return;
    side.prepend(h("div",{class:"enc-card adm-card-enc"},h("h4",null,"Canon"),h("p",{style:"margin:0 0 10px;font-size:14px;line-height:1.5"},"Change her identity, group, biography, relationships or look."),
      h("div",{class:"enc-loads"},h("button",{type:"button",class:"enc-load",onclick:()=>openEditor(x)},"Edit canon"))))}}

  ACAD.admin={design:{start:startDesign,end:endDesign,active:()=>DS?JSON.parse(JSON.stringify(Object.assign({},DS,{stash:!!DS.stash,work:!!DS.work}))):null,figure:designFigure,tryScene,backFromScene,warnings:designWarnings},suggestWord,open:openAdmin,group:openGroup,robesFor,robesPrompts,promptGirls,edit:openEditor,makeNew:()=>openEditor(null,null,true),newWork:()=>NEWW,setNew:w=>{NEWW=w},checksNew,toDraftsNew,keyOfNew,portraitFrom,recrop,buildFile,buildCanon,changes:()=>changes(drafts()),
    /* v250: what later admin tools build on */
    refreshBtn:()=>updateBtn(),
    kit:{admin:ADMIN,T:PWT,h,HN,GRP,clone,say,drafts,ensure,commit,linkProblems,portraitFrom,recrop,slug:s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,""),addChanges:f=>MORE.push(f),C,addPanel:f=>PANEL.push(f),changesOf:d=>changes(d),download,ROMANTIC,INTIMATE,FL,delPath,ageOfWork},checks,toDrafts,workOf,lookFromStudio,fileName};
  placeBtn();
  /* after a save, reopen where the admin was */
  let re=null;try{re=JSON.parse(sessionStorage.getItem(REOPEN)||"null");sessionStorage.removeItem(REOPEN)}catch(e){}
  if(re)setTimeout(()=>{try{if(re.page&&typeof ENC!=="undefined")ENC.open(re.page);else if(re.newgirl)openEditor(null,"place",true);else if(re.admin)openAdmin()}catch(e){}},300);

  const st=document.createElement("style");st.id="admCss242";st.textContent=`
.adm-dlg{--a-bg:#fbf9fd;--a-ink:#1d1830;--a-muted:#625b78;--a-line:#ddd6ea;--a-card:#fff;--a-accent:#3b2a5c;--a-note:#f3eefb;--a-bad:#9b2c3a;
  border:0;border-radius:14px;padding:0;width:min(720px,calc(100vw - 32px));max-height:calc(100vh - 48px);background:var(--a-bg);color:var(--a-ink);box-shadow:0 24px 60px rgba(20,12,40,.35);font-family:inherit;font-size:15px;line-height:1.5}
html[data-theme="dark"] .adm-dlg{--a-bg:#1c1a26;--a-ink:#ece8f6;--a-muted:#a9a2bd;--a-line:#363247;--a-card:#24212f;--a-accent:#b9a6e8;--a-note:#2a2540;--a-bad:#f08a96}
.adm-dlg::backdrop{background:rgba(16,12,28,.5)}
.adm-dlg[open]{display:flex;flex-direction:column}
.adm-body{padding:22px 24px 8px;overflow:auto}
.adm-body h2{margin:0 0 6px;font-size:24px}.adm-body h3{margin:20px 0 8px;font-size:16px}.adm-body h4{margin:18px 0 8px;font-size:14.5px}
.adm-kicker{margin:0;color:var(--a-muted);font-size:13px}
.adm-lead,.adm-muted{color:var(--a-muted);margin:4px 0 10px;font-size:14px}
.adm-x{position:absolute;top:10px;right:12px;border:0;background:none;font-size:24px;line-height:1;color:var(--a-muted);cursor:pointer;padding:6px}
.adm-btn{font:inherit;font-size:14px;padding:7px 14px;border-radius:8px;border:1px solid var(--a-line);background:var(--a-card);color:var(--a-ink);cursor:pointer}
.adm-btn:hover{border-color:var(--a-accent)}.adm-btn:focus-visible,.adm-in:focus-visible,.adm-tabs button:focus-visible{outline:2px solid var(--a-accent);outline-offset:2px}
.adm-btn.primary{background:var(--a-accent);border-color:var(--a-accent);color:var(--a-bg)}.adm-btn.danger{color:var(--a-bad)}.adm-btn.sm{padding:4px 10px;font-size:13px}.adm-btn[disabled]{opacity:.5;cursor:default}
.adm-actions{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.adm-changes{list-style:none;margin:0;padding:0;border:1px solid var(--a-line);border-radius:10px;background:var(--a-card)}
.adm-changes li{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 12px;border-top:1px solid var(--a-line)}.adm-changes li:first-child{border-top:0}
.adm-note{background:var(--a-note);border-radius:8px;padding:8px 12px;font-size:14px;margin:8px 0}
.adm-tabs{display:flex;flex-wrap:wrap;gap:0 4px;border-bottom:1px solid var(--a-line);margin:14px 0 6px}
.adm-tabs button{font:inherit;font-size:14px;border:0;background:none;color:var(--a-muted);padding:8px 12px;border-bottom:2px solid transparent;cursor:pointer;white-space:nowrap}
.adm-tabs button[aria-selected=true]{color:var(--a-ink);border-bottom-color:var(--a-accent);font-weight:600}
.adm-f{display:grid;grid-template-columns:180px 1fr;gap:10px;align-items:start;margin:8px 0}
.adm-f>span{font-size:13.5px;color:var(--a-muted);padding-top:7px}
.adm-in{font:inherit;font-size:14px;width:100%;box-sizing:border-box;padding:6px 9px;border-radius:7px;border:1px solid var(--a-line);background:var(--a-card);color:var(--a-ink)}
textarea.adm-in{resize:vertical}
.adm-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.adm-row .adm-in{flex:1 1 180px;width:auto}
.adm-card{border:1px solid var(--a-line);border-radius:10px;padding:10px 12px;margin:8px 0;background:var(--a-card)}
.adm-chips{display:flex;flex-wrap:wrap;gap:6px;margin:4px 0 8px}
.adm-chip{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--a-line);border-radius:999px;padding:3px 4px 3px 11px;font-size:13.5px;background:var(--a-card)}
.adm-chip button{border:0;background:none;color:var(--a-muted);font-size:16px;cursor:pointer;padding:0 5px}
.adm-foot{padding:12px 24px 18px;border-top:1px solid var(--a-line);display:flex;flex-direction:column;gap:8px}
.adm-foot .adm-actions{justify-content:flex-end}
.adm-checks{color:var(--a-bad);font-size:14px}
.adm-fi .adm-in{flex:1 1 auto}.adm-opts{border:1px solid var(--a-line);border-radius:10px;padding:8px 10px;margin:6px 0;background:var(--a-card)}.adm-opts .adm-chips{max-height:220px;overflow:auto}
.adm-opts .adm-chip{cursor:pointer;padding:3px 10px;font:inherit;font-size:13px;color:var(--a-ink)}.adm-opts .adm-chip:hover{border-color:var(--a-accent)}.adm-sug{border-color:var(--a-accent)!important;font-weight:600}
.adm-cols3 .adm-in{flex:1 1 0;min-width:0}.adm-crestrow{align-items:center;gap:14px}.adm-crest{image-rendering:pixelated;border-radius:6px;background:var(--a-card)}.adm-col{display:flex;flex-direction:column;align-items:center;font-size:12.5px;color:var(--a-muted);gap:3px}.adm-col input{width:44px;height:30px;border:1px solid var(--a-line);border-radius:6px;padding:0;background:none}
.adm-radio{display:inline-flex;gap:6px;align-items:center;font-size:14.5px;margin-right:16px}
.adm-por{align-items:flex-start;gap:14px}.adm-porc{width:120px;height:175px;object-fit:cover;border-radius:8px;border:1px solid var(--a-line);background:#fff}
.adm-porh{width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid var(--a-line);background:#fff}
.adm-nudge{display:flex;flex-wrap:wrap;gap:4px;width:100%}
.adm-dbar{position:sticky;top:0;z-index:60;display:flex;flex-wrap:wrap;gap:10px 16px;align-items:center;justify-content:space-between;padding:10px 16px;background:#2b2140;color:#f4effc;border-bottom:2px solid #8f6fd0;font-size:14.5px;line-height:1.45}
.adm-dbar p{margin:0;flex:1 1 320px}.adm-dbar .adm-actions{margin:0}.adm-dbar .adm-btn{border:1px solid #cdbbf0;background:transparent;color:#f4effc;border-radius:8px;padding:6px 12px;font:inherit;cursor:pointer}
.adm-dbar .adm-btn.primary{background:#f4effc;color:#2b2140;font-weight:600}.adm-dbar .adm-btn:focus-visible{outline:2px solid #fff;outline-offset:2px}
.adm-words .adm-f>span small{display:block;font-size:12px}.adm-dbar-outs{display:block;opacity:.85;margin-top:2px}
.adm-tabs button.done::before{content:"✓ ";color:#2e7d4f;font-weight:700}
.adm-review{list-style:none;padding:0;margin:8px 0;display:flex;flex-direction:column;gap:4px}.adm-review li{display:grid;grid-template-columns:20px 1fr auto;gap:8px;align-items:center;padding:5px 8px;border-radius:8px;font-size:14.5px}
.adm-review li.todo{background:var(--a-note)}.adm-review .mk{text-align:center;font-weight:700}.adm-review li.ok .mk{color:#2e7d4f}.adm-review li.todo .mk{color:var(--a-muted)}.adm-checks ul{margin:4px 0 0;padding-left:18px}
@media (min-width:1340px) and (max-width:1459px){.top-actions{gap:5px}.top-actions .btn{padding-left:10px;padding-right:10px}}
@media (max-width:600px){.adm-f{grid-template-columns:1fr;gap:2px}.adm-f>span{padding-top:0}.adm-body{padding:18px 16px 8px}.adm-foot{padding:12px 16px 16px}}`;
  document.head.append(st);
})();
