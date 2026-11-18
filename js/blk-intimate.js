/*INTIMATE-BEGIN*/
/* ---- v313: intimate scenes from what the canon already knows (18+, every character an adult).
   1. Her tonight: scenes built from her own Biography (favourite position, kinks, turn-ons), with her limits ruling out
      anything she has said no to.
   2. Her people: her boyfriend's favourites, her secret girlfriend, her flings, her rivals after dark, the girls of the
      group she is sworn to in secret, and her headmistress's affair.
   Every scene is one single image (never panels), and its only words are sound effects and lewd effects, so the image
   generator spends itself on the characters. Scenes are built when asked for (ACAD.intimate(h)), not stored, so they
   follow the canon as it changes. 3. Her private file: an Encyclopedia page ("intimate:<house>") behind the 18+ gate.
   ---- */
(function(){
  "use strict";
  if(typeof ACAD==="undefined"||typeof ENC==="undefined"||typeof TEMPLATES==="undefined"||typeof tplById!=="function")return;
  const HN=h=>(ENC.HN?ENC.HN(h):h),bio=h=>(typeof BIOS==="object"&&BIOS[h])||{},T=id=>tplById(id);
  const clone=o=>JSON.parse(JSON.stringify(o));
  const robesOf=h=>ACAD.robes?ACAD.robes(h):h+"robes";
  const G=id=>(ACAD.GROUPS||[]).find(g=>g.id===id),groupOf=h=>ACAD.GROUP_OF?ACAD.GROUP_OF(h):null;
  const minor=h=>!!(ACAD.isMinor&&ACAD.isMinor(h));
  const low=s=>String(s||"").toLowerCase();

  /* ---------- where it happens ---------- */
  const GROUND={hall:"the empty great hall long after the feast, candles guttering on the long tables",chess:"the chess room at midnight, the board knocked flat and pieces scattered",
    race:"the rain-soaked finish line of the meadow track at night",night:"a moonlit tower room high above the castle",catwalk:"backstage after the fashion show, among the costume racks and mirrors",
    forest:"a mossy clearing deep in the Old Wood under a full moon",bakeoff:"the Academy kitchens after hours, flour dusted over the long table",ice:"the boathouse by the frozen lake, furs spread over the boards",
    storm:"a lightning-lit storm cellar, rain hammering the hatch"};
  /* her own room, never a crowd: her House bedroom at night in her group colors */
  const room=h=>{const g=groupOf(h),X=g&&ACAD.GX&&ACAD.GX[g.id];return `her private bedroom in ${HN(h)} House at night, the door locked, lamps low`+(X&&X.words?`, the sheets and curtains in ${X.words}`:"")};

  /* ---------- her Biography, read as tags ---------- */
  const POS=[
    [/reverse cowgirl/,"she rides him reverse cowgirl, looking back over her shoulder","reverse cowgirl position, girl on top, looking back, sex, vaginal","Reverse cowgirl"],
    [/mating press/,"he folds her into a mating press","mating press, legs up, sex, vaginal","Mating press"],
    [/legs over (his )?shoulders/,"her legs over his shoulders","legs over shoulders, sex, vaginal","Legs over his shoulders"],
    [/lifted|carried|wrapped around|aerial/,"he lifts her and she wraps her legs around him","suspended congress, carrying, legs around waist, sex, vaginal","Lifted against him"],
    [/standing|one leg|split/,"standing, one leg hooked high","standing sex, leg lift, standing on one leg, sex, vaginal","Standing, one leg up"],
    [/mirror/,"in front of a tall mirror, watching themselves","mirror, reflection, sex from behind, sex, vaginal","In front of the mirror"],
    [/behind|doggy|bent over|motorcycle/,"he takes her from behind","doggystyle, sex from behind, all fours, sex, vaginal","From behind"],
    [/spoon/,"spooning, slow and close","spooning, lying on side, sex from behind, sex, vaginal","Spooning"],
    [/wrestl|pin|winning|game/,"wrestling for the top, and winning it","girl on top, straddling, pinned, wrestling, sex, vaginal","Wrestling for the top"],
    [/cowgirl|riding|on top|her terms|control|pace|teasing|reins/,"she rides him on top, setting the pace","cowgirl position, girl on top, straddling, sex, vaginal","On top"],
    [/outdoors|open sky|anywhere/,"under the open sky, on a blanket in the grass","outdoors, night sky, on grass, missionary, sex, vaginal","Under the open sky"],
    [/missionary|face to face|slow|holding hands|arms/,"face to face, slow, fingers laced","missionary, face to face, holding hands, interlocked fingers, sex, vaginal","Face to face"]];
  const posOf=s=>{const t=low(s);return (POS.find(([re])=>re.test(t))||[null,"face to face, wrapped around each other","missionary, sex, vaginal","Face to face"]).slice(1)};
  /* kinks: [match, phrase, tags, ruled out by a limit matching] */
  const KINK=[
    [/wax|candle|firelight|fire/,"hot candle wax dripping on her skin by firelight","wax play, candle, candlelight, dripping",/fire|burn|marks|hurt|pain/],
    [/rope|tied|bound|bondage|shibari/,"soft rope wound around her wrists","rope, bondage, bound wrists, shibari",/helpless|caged|tied|bound|rope/],
    [/bit|scratch|claw/,"love bites and scratch marks","biting, scratches, hickey, neck biting",/marks|rough|hurt|pain/],
    [/blindfold/,"a silk blindfold over her eyes","blindfold, silk",/helpless|blind/],
    [/collar|leash/,"a collar and leash","collar, leash",/humiliat|helpless|caged/],
    [/tease|teasing|denial|edg/,"slow teasing that keeps her on the edge","teasing, edging, trembling, fingering",/rushed|hurried/],
    [/roleplay|role-play|teacher|seduction game/,"a roleplay she planned","roleplay, costume",/serious/],
    [/worship|queen|spoil|doted|adored/,"being worshipped, kissed all over","worship, kissing body, kneeling",/x^/],
    [/dominat|overpower|pinned|strong enough|tamed/,"pinned down by someone strong enough to keep her","pinned, restrained, hand on another's wrist, sex",/helpless|rough/],
    [/giving orders|control|femdom|commands/,"she gives the orders","femdom, girl on top, dominant female, sex",/x^/],
    [/chase|caught|pounce|capture/,"caught at the end of a chase, breathless","pinned, panting, on grass, chase, sex",/rough/],
    [/wrestl|rough|sparring|competitive/,"rough, competitive, laughing as they wrestle","wrestling, rough sex, sweat, sex",/rough|marks/],
    [/outdoor|open sky|rain|under the moon/,"outside in the warm rain","outdoors, rain, wet, night, sex",/public|cold|seen/],
    [/water|sea|swim|bath/,"in warm water up to her waist","partially submerged, water, wet, sex",/cold/],
    [/risky|public|seen|caught somewhere/,"somewhere they could be seen at any moment","public indecency, risk of discovery, sex",/public|seen/],
    [/music|singing|song/,"to music only she can hear","headphones, music, sex",/x^/],
    [/slow|tender|silk|gentle|long foreplay/,"slow and tender on silk sheets","romantic, gentle, silk sheets, sex",/x^/]];
  const turnTags=s=>{const t=low(s),o=[];
    if(/kiss|eye contact/.test(t))o.push("deep kiss");if(/lift|carried/.test(t))o.push("carrying");if(/hair-pull|hair pull/.test(t))o.push("hair pull");
    if(/praise|adored|worship/.test(t))o.push("head pat");if(/sweat|heat/.test(t))o.push("sweat");if(/strong hands|waist/.test(t))o.push("hands on another's hips");
    if(/laugh/.test(t))o.push("laughing");if(/whisper/.test(t))o.push("whispering");return o};
  function kinksOf(h){const b=bio(h),lim=low(b.limits);const t=low(b.kinks);
    return KINK.filter(([re,,,no])=>re.test(t)&&!no.test(lim)).map(([,ph,tg])=>({ph,tg}))}

  /* ---------- sound and lewd effects (the only words in a scene) ---------- */
  const FX={pen:["plap plap","thrust thrust","squelch","pomf pomf"],yuri:["chu","lick lick","squish","chu ♡"],kiss:["chu ♡","mwah"],after:["♡","haa ♡"],wax:["drip drip"],rough:["thud","creak creak"]};
  const fxOf=(kind,seed)=>{const a=FX[kind]||FX.pen;let n=0;for(const ch of String(seed))n=(n*31+ch.charCodeAt(0))>>>0;return a[n%a.length]};
  const AROUSED={blushStyle:"heavy aroused blush",skinFinish:"flushed, sweat-glistening skin",nippleType:"hard and flushed with arousal",vaginaType:"flushed, swollen, and dripping wet"};
  const LEWD="motion lines, heart, steam, sweat, sound effects";

  /* ---------- one scene: always a single image, its only text a sound effect ---------- */
  const NUDE={oname:"Nude",look:"",items:{},details:{},dcol:{}};
  function scene(h,key,o){
    const id=h+"ix"+key;const have=T(id);if(have)return id;
    const base=T(o.base||robesOf(h));if(!base)return null;
    const sfx=o.sfx||fxOf(o.fxKind||"pen",id);
    const texts=[{k:"sfx",st:"lewd",t:sfx,who:"",s:`Small lewd sound effects reading "${sfx}" float around them.`}];
    const pair={id:o.partner||"",outfit:"scene",
      scene:`Setting: ${o.where}. ${o.text} ${texts[0].s} ${[...new Set([o.count,o.tags,LEWD].filter(Boolean).join(", ").split(",").map(x=>x.trim()).filter(Boolean))].join(", ")}`,
      act:o.act||"",dir:"mutual",couple:true,w1:{name:"Nude",f:{},m:{}},w2:{name:"Nude",f:{},m:{}},texts,txTags:["sound effects"],
      penis:!!o.penis,explicit:true,compact:false,fit:true,
      c1:Object.assign({expression:o.ex1||"flushed, blissful, half-lidded eyes, open mouth"},AROUSED),
      pc:{expression:o.ex2||"flushed, intent, breathing hard",posture:null},tags1:o.tags1||"",tags2:o.tags2||""};
    if(o.more)pair.more=o.more;
    const t={id,name:o.name,blurb:o.blurb,pal:clone(base.pal||{}),c:clone(base.c||{}),outfit:clone(NUDE),more:[clone(base.outfit||NUDE)],
      out:{framing:o.framing||"full body",must:(base.out&&base.out.must)||"an anime style with high detail, and particular emphasis on highly detailed skin, hair and eyes",explicit:true,lewdtag:true,pair},
      tags:["intimate","single scene","pair",h].concat(o.with?[o.with]:[]),bio:base.bio};
    TEMPLATES.push(t);return id}

  /* ---------- every intimate scene of hers ---------- */
  const CACHE={};
  ACAD.intimate=function(h){
    if(CACHE[h])return CACHE[h];if(minor(h)||!T(robesOf(h)))return CACHE[h]=[];
    const b=bio(h),out=[],add=(cat,name,make,blurb,who)=>out.push({cat,name,key:"ix."+name,x:true,blurb,who,load:()=>{const id=make();if(id)ENC.load(id);else if(typeof toast==="function")toast("That scene can't be built.")}});
    const man=T(h+"man")?h+"man":"",mb=man&&T(man).bio||{},mn=mb.fullName||(man?"her boyfriend":"");
    const where=room(h);
    /* 1. her tonight */
    if(man){
      const [ph,tg,pn]=posOf(b.favPosition);
      add("Her tonight","Her favourite: "+pn,()=>scene(h,"fav",{partner:man,penis:true,where,name:HN(h)+": her favourite",
        blurb:`${HN(h)} and ${mn}, the way she likes it best: ${low(b.favPosition)||"face to face"}.`,
        text:`The woman and ${"{partner}"}, her boyfriend, make love in her favourite position: ${ph}.`,count:"1girl, 1boy, hetero",tags:tg+(turnTags(b.turnOns).length?", "+turnTags(b.turnOns).join(", "):""),act:tg.split(",").slice(0,3).join(","),
        ex1:"flushed, blissful, half-lidded eyes, open mouth, heart-shaped pupils",fxKind:"pen"}),`From her Biography: ${b.favPosition||"face to face"}.`,man);
      kinksOf(h).slice(0,3).forEach((k,i)=>add("Her tonight","Her kink: "+k.ph.replace(/^./,c=>c.toUpperCase()),()=>scene(h,"kink"+i,{partner:man,penis:true,where:/outside|rain|grass|water/.test(k.ph)?"the Academy grounds at night":where,name:HN(h)+": "+k.ph,
        blurb:`${HN(h)} and ${mn}: ${k.ph}. From her kinks; her limits are kept.`,text:`The woman and {partner}, her boyfriend, give in to what she loves: ${k.ph}.`,count:"1girl, 1boy, hetero",tags:k.tg,act:k.tg.split(",").slice(0,3).join(","),
        fxKind:/wax/.test(k.tg)?"wax":/rough|wrestl/.test(k.tg)?"rough":"pen"}),`From her kinks: ${b.kinks||""}`,man));
      add("Her tonight","What gets her going",()=>scene(h,"fore",{partner:man,penis:false,where,name:HN(h)+": foreplay",framing:"cowboy shot",
        blurb:`Foreplay with ${mn}, built from what turns her on: ${b.turnOns||""}.`,text:`The woman and {partner}, her boyfriend, undress each other between deep kisses, his hands roaming over her as she melts into him.`,
        count:"1girl, 1boy, hetero",tags:["undressing another","deep kiss","groping","hand on another's breast"].concat(turnTags(b.turnOns)).join(", "),act:"undressing another, deep kiss, groping",fxKind:"kiss",
        ex1:"flushed, eager, half-lidded eyes, parted lips"}),`From her turn-ons: ${b.turnOns||""}`,man);
      add("Her tonight","Afterglow",()=>scene(h,"after",{partner:man,penis:false,where,name:HN(h)+": afterglow",framing:"upper body",
        blurb:`After, with ${mn}: tangled in the sheets.`,text:`Afterwards the woman lies tangled in the sheets with {partner}, her boyfriend, her head on his chest, messy-haired and glowing.`,
        count:"1girl, 1boy, hetero",tags:"after sex, lying on person, head on chest, messy hair, bed sheet, sweat, afterglow",act:"after sex, lying on person, head on chest",fxKind:"after",
        ex1:"blissful, sleepy, satisfied smile, flushed",ex2:"tender, content smile"}),"After.",man);
      /* his favourites */
      if(mb.favPosition&&!/not yet|doesn.t know|still learning|inexperienced/i.test(mb.favPosition+" "+(mb.experience||""))){const [hp,ht,hn]=posOf(mb.favPosition);
        add("With her boyfriend","His favourite: "+hn,()=>scene(h,"his",{partner:man,penis:true,where,name:HN(h)+": his favourite",
          blurb:`${mn}'s favourite, from his Biography: ${mb.favPosition||""}.`,text:`{partner}, her boyfriend, has her the way he likes best: ${hp}.`,count:"1girl, 1boy, hetero",tags:ht,act:ht.split(",").slice(0,3).join(","),fxKind:"pen"}),`From his Biography: ${mb.favPosition||""}; ${mb.kinks||""}`,man)}}
    /* 2. her people (all women; the girls stay the PC's to win) */
    const nudeAt=id=>{const t=T(id);if(!t)return 0;const i=[t.outfit].concat(t.more||[]).map(o=>o&&o.oname).indexOf("Nude");return i<0?0:i};
    const yuri=(cat,o,label,key,text,tags,where2,blurb)=>{const pid=robesOf(o);if(!T(pid)||minor(o))return;
      add(cat,label,()=>scene(h,key,{partner:pid,penis:false,where:where2||where,name:HN(h)+" and "+HN(o)+", "+cat.replace(/^Her /,"").toLowerCase(),with:o,
        blurb,text:text.replace(/\{o\}/g,HN(o)),count:"2girls, yuri",tags,act:tags.split(",").slice(0,3).join(","),fxKind:"yuri",ex2:"flushed, hungry, half-lidded eyes"}),blurb,o)};
    const R=ACAD.RELDATA||{};
    const sg=(ACAD.SGOF||{})[h];
    if(sg){const line=String(b.yuriBuddy||"").replace(/^[^.]*\.\s*/,"");
      yuri("Her secret girlfriend",sg,"Behind a locked door","sg","The woman and {partner}, her secret girlfriend, tumble onto the bed behind a locked door, kissing hungrily and fingering each other.","yuri, kissing, fingering, on bed, locked door, lying on person, breast press",null,line||`With ${HN(sg)}, in secret.`);
      yuri("Her secret girlfriend",sg,"Scissoring","sg2","The woman and {partner}, her secret girlfriend, grind against each other, legs interlocked, gasping.","yuri, tribadism, scissoring, legs interlocked, grinding",null,`With ${HN(sg)}.`);
      yuri("Her secret girlfriend",sg,"Nearly caught","sg3","The woman and {partner}, her secret girlfriend, freeze mid-kiss, tangled and naked, as the door handle starts to turn.","yuri, surprised, door, hiding, blush, kissing, nude",null,`With ${HN(sg)}, and someone at the door.`);
      if(man)add("Her secret girlfriend","Her boyfriend joins them",()=>{const pid=robesOf(sg);return scene(h,"ffm",{partner:man,penis:true,where,name:HN(h)+", "+HN(sg)+" and "+mn,with:sg,
        more:[{id:pid,outfit:nudeAt(pid),tags:"yuri, kissing, nude"}],blurb:`${HN(h)}, ${HN(sg)} and ${mn}: the secret comes out, and nobody minds.`,
        text:"The woman rides {partner}, her boyfriend, while her secret girlfriend kisses her deeply from behind, all three tangled together on the bed.",count:"2girls, 1boy, ffm threesome",
        tags:"ffm threesome, cowgirl position, girl on top, yuri, kissing, sex, vaginal",act:"ffm threesome, cowgirl position, kissing",fxKind:"pen"})},`With ${HN(sg)} and ${mn}.`,sg)}
    (R.FLING||[]).filter(p=>p[0]===h||p[1]===h).forEach((p,i)=>{const o=p[0]===h?p[1]:p[0],line=p[0]===h?p[2]:p[3];
      yuri("Her flings",o,HN(o),"fl"+i,"The woman and {partner} fall into bed together, kissing and fingering each other, a fling neither of them will admit to.","yuri, kissing, fingering, on bed, messy hair, nude",null,line)});
    ((ACAD.RIVALS||{})[h]||[]).forEach(([o,n,gr],i)=>{if(i>2)return;
      yuri("Her rivals, after dark",o,HN(o),"rv"+i,"The woman and {partner}, her rival, crash together in an angry, hungry kiss, pinning each other, the rivalry turned into something else.",
        "yuri, rivals, angry kiss, pinned, wrestling, fingering, nude",GROUND[gr]||null,`${HN(o)}: ${n||"her rival"}.`)});
    (ACAD.extraGroups?ACAD.extraGroups(h):[]).filter(e=>e.kind!=="sworn"&&e.kind!=="envoy").forEach((e,i)=>{const g=G(e.g);if(!g||!g.leader||g.leader===h)return;
      yuri("Her secret banner",g.leader,"Debriefed by "+HN(g.leader),"bn"+i,`The woman, sworn in secret to ${g.name}, is debriefed in private by {partner}, its leader, who pins her to the desk and takes her report with her fingers.`,
        "yuri, on desk, pinned, fingering, office, secret, nude",`${HN(g.leader)}'s private study after hours, the door locked, papers scattered across the desk`,`${g.name}'s leader, ${HN(g.leader)}: ${e.oath}.`)});
    /* her headmistress's affair */
    const hh=T(h+"head"),hb=hh&&hh.bio||{};
    if(hh&&hb.partner){const o=(ACAD.HOUSES||[]).find(x=>{const t=T(x+"head");return t&&t.bio&&x!==h&&t.bio.fullName&&String(hb.partner).startsWith(t.bio.fullName)});
      const nm=x=>(T(x+"head").bio&&T(x+"head").bio.fullName)||T(x+"head").name;
      if(o)add("Her headmistress",`${nm(h)} and ${nm(o)}`,()=>scene(h,"head",{base:h+"head",partner:o+"head",penis:false,where:"a headmistress's study after midnight, the door locked, papers scattered",
        name:`${nm(h)} and ${nm(o)}`,with:o,blurb:`The headmistresses' secret: ${hb.partner}.`,text:"Two headmistresses lock the study door and fall onto the chaise together, gowns half-off, kissing and fingering each other.",
        count:"2girls, yuri, mature female",tags:"yuri, mature female, kissing, fingering, chaise longue, gown, partially undressed",act:"kissing, fingering, mature female",fxKind:"yuri"}),hb.partner,o)}
    return CACHE[h]=out};

  /* ---------- 3. her private file ---------- */
  const ok18=()=>ACAD.RX_ADULT&&ACAD.RX_ADULT.ok18?ACAD.RX_ADULT.ok18():true;
  const E=ENC.E,lnk=(id,t)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},t);
  const HS=new Set(ACAD.HOUSES||[]);
  function known(h){const R=ACAD.RELDATA||{},o=[];const m=T(h+"man");if(m)o.push(["Her boyfriend",(m.bio&&m.bio.fullName)||HN(h)+"'s boyfriend",null]);
    const sg=(ACAD.SGOF||{})[h];if(sg)o.push(["Her secret girlfriend",HN(sg),sg]);
    (R.FLING||[]).filter(p=>p[0]===h||p[1]===h).forEach(p=>{const x=p[0]===h?p[1]:p[0];o.push(["A fling",HN(x),x])});return o}
  document.head.append(E("style",null,".ix-dl dt{color:var(--enc-muted,#6b6f86);font-weight:600}.ix-dl dd{margin:0}"));
  ENC.resolvers=ENC.resolvers||[];
  ENC.resolvers.push((k,v,id)=>{if(k!=="intimate"||!HS.has(v))return null;
    return ENC.page(id,{title:HN(v)+": her private file",short:"Private file",sec:"restricted",crumbs:["house:"+v],build:el=>{
      const art=E("article",{class:"enc-article wide"});el.append(art);
      art.append(E("p",{class:"enc-kicker"},lnk("house:"+v,HN(v)+" House")," · Private file"),E("h1",{class:"enc-title"},HN(v)+": her private file"));
      if(minor(v)){art.append(E("p",{class:"enc-p"},"There is no private file for her."));return}
      if(!ok18()){art.append(E("div",{class:"enc-card enc-card-dark",style:{margin:"10px 0"}},E("h4",null,"Adults only"),E("p",{style:{margin:"0 0 10px",fontSize:"14px"}},"Her private file is sexually explicit. Every character in it is an adult. Confirm you are 18 or over to read it."),
        E("button",{type:"button",class:"enc-load",onclick:()=>{try{localStorage.setItem("everspire.adult18","1")}catch(e){}el.textContent="";ENC.pages[id].build(el)}},"I am 18 or over, show it")));return}
      const DL={display:"grid",gridTemplateColumns:"minmax(8rem,11rem) 1fr",gap:"6px 16px",margin:"6px 0 14px",fontSize:"15px",lineHeight:1.5};
      const b=bio(v),dl=E("dl",{class:"enc-dl ix-dl",style:DL});
      [["Orientation",b.orientation],["Experience",b.experience],["Body count",b.bodyCount],["First time",b.firstTime],["Turn-ons",b.turnOns],["Turn-offs",b.turnOffs],
       ["Favourite position",b.favPosition],["Kinks",b.kinks],["Limits",b.limits]].forEach(([k,x])=>{if(x)dl.append(E("dt",null,k),E("dd",null,String(x)))});
      art.append(E("h3",{class:"enc-h"},"In her own words"),dl);
      const K=known(v);
      art.append(E("h3",{class:"enc-h"},"Who she has been with"),E("ul",{class:"enc-list"},K.map(([k,n,x])=>E("li",null,E("b",null,k+": "),x?lnk("house:"+x,n):n))));
      const bc=parseInt(b.bodyCount,10);
      if(!isNaN(bc))art.append(E("p",{class:"enc-p"},`She says ${bc}. Everspire knows of ${K.length} at the Academy`+(bc>K.length?`; the other ${bc-K.length} are her own business.`:bc<K.length?`, which is more than she admits to.`:", which is all of them.")));
      const m=T(v+"man"),mb=m&&m.bio||{};
      if(mb.favPosition||mb.kinks){const d2=E("dl",{class:"enc-dl ix-dl",style:DL});[["His favourite position",mb.favPosition],["His kinks",mb.kinks],["His turn-ons",mb.turnOns],["His limits",mb.limits]].forEach(([k,x])=>{if(x)d2.append(E("dt",null,k),E("dd",null,String(x)))});
        art.append(E("h3",{class:"enc-h"},"Her boyfriend, ",ENC.pages["boy:"+v]?lnk("boy:"+v,mb.fullName||""):(mb.fullName||"")),d2)}
      const xs=ACAD.intimate(v);
      if(xs.length){art.append(E("h3",{class:"enc-h"},"Her intimate scenes"),E("p",{class:"enc-note"},"Each is one single image, with sound effects as its only words. Load one into the studio."));
        const cats=new Map();xs.forEach(x=>{if(!cats.has(x.cat))cats.set(x.cat,[]);cats.get(x.cat).push(x)});
        cats.forEach((is,c)=>art.append(E("div",{class:"enc-setgrp"},E("div",{class:"gh"},c),E("div",{class:"enc-loads"},is.map(x=>E("button",{type:"button",class:"enc-load",title:x.blurb||"",onclick:()=>x.load()},x.name))))))}
    }})});
  /* her House page links to it */
  const bh=ENC.buildHouse;
  if(bh)ENC.buildHouse=function(el,h){bh.apply(this,arguments);if(minor(h))return;const side=el.querySelector(".enc-side");if(!side)return;
    side.append(E("div",{class:"enc-card"},E("h4",null,"Her private file"),E("p",{class:"enc-note",style:{marginTop:0}},"Her intimate life and her intimate scenes. Adults only."),
      E("div",{class:"enc-loads"},E("button",{type:"button",class:"enc-load",onclick:()=>ENC.go("intimate:"+h)},"Open her private file"))))};
})();
/*INTIMATE-END*/
