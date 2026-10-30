/* Everspire: the Headmaster, "after" content.
   - four pair scenes for girls who belong together (hand-written, open when both are enrolled and close to you),
   - an "afterword" scene for every girl (a second, later scene once she is very close),
   - a seasonal coda on every capstone and afterword,
   - arrivals that mention her group, and six more Desk events. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head._v||!ACAD.head.NOTICE_TYPES)return;
const H=ACAD.head,T=H.SCENE_T,V=H._v,rng=H.rngSeed,bio=H.bioOf,hash=H.hash,fill=H.fillText;
const HN=h=>fill("{n}",h);
const lc=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toLowerCase()+t.slice(1):""},first=t=>String(t||"").split(/[;,]/)[0].trim();

/* ---------- pair scenes ---------- */
const PAIRS=[
{id:"P_regent_augur",a:"regent",b:"augur",title:"An hour neither of them planned",aff:380,wing:1,p:[
`It is the Regent who asks, which is the first surprise. She stands in your study door at dusk with her halo ticking and her pocket-watch shut, and says that {b} has proposed a wager, and that she has accepted it, and that she would like you present as a witness. "Three seconds early," says {a}, with great dignity. "I am never early. I am considering it."`,
`{b} is waiting on the clock-tower balcony with Wick curled round her wrist and a single candle that gutters in the wind. "Sit," she tells you, and then, to {a}, in her soft white voice, "You will not like what I have seen." {a} lifts her chin. "I will not like it exactly on time," she says, and sits.`,
`The wager turns out to be small. {b} has seen that tonight, at some hour {a} has not scheduled, something will happen that neither of them has foreseen, and {a} has bet that nothing in her day goes unplanned. The tower clock ticks. The candle burns down a finger's width. "You are cheating," says {a}. "I am looking," says {b}. "It is not the same." You say that watching the two of them argue is the most unplanned thing you have seen all year.`,
`Then the candle goes out, and the bells do not ring. Below you the clock has stopped, for the first time in anyone's memory, one minute short of the hour. {a} goes entirely still. {b} laughs, low and delighted, and says, "There. I did not see that." For a long moment the Regent looks as if the floor has opened, and then, very slowly, she begins to smile. "A minute," she says. "Unaccounted for." She takes your hand, and then, after a visible struggle with her whole upbringing, {b}'s as well.`,
`You three sit on the balcony in the dark, saying nothing, while the stars come out over a castle that has briefly forgotten what time it is. When the clock starts again it starts a little late, and neither of them corrects it. "Noted," says {a}, quietly, leaning her head on your shoulder. "You'll see," says {b}, against the other, with her eyes shut, "not yet." She is smiling. You are not certain which of you she means.`]},
{id:"P_nightmare_reverie",a:"nightmare",b:"reverie",title:"The scare that fell asleep",aff:380,wing:1,p:[
`{a} has a plan, and she has been rehearsing it in the cloister for an hour with her bear under her arm. She is going to scare {b}. It is, she explains, in a stage whisper that carries the length of the corridor, the greatest scare of her career, because {b} has never once been frightened, and a scare that has never landed is an unfinished one. "You'll hold the lamp," she tells you. "Look scared. Be convincing."`,
`The pillow loft is dim and soft, and {b} is in the middle of it, half asleep, with Doze snoring in her lap and a jar of something that glows faintly beside her. {a} creeps up the ladder with a rattle of chains and a lunge, and shrieks "BOO" at the top of her lungs. {b} opens one eye. "Mm," she says. "Hello. Is that a dream? You are very loud."`,
`There is a long silence. {a} stands with her arms spread and her horns askew and the expression of a woman whose life's work has been stepped on by a kitten. Then {b} sits up, and pats the pillows, and says, "Was it supposed to be frightening? It was lovely. Come and sit." And {a}, who has been asking for a hug after the scare since the day she arrived, discovers she has been offered one before the scare has even ended.`,
`You sit with the two of them while the lamp burns low. {b} shows {a} the jar, which holds, she says, the dream with the whale in it, and lets her hold it to the light. {a} has gone quiet and small. "I'm afraid no one remembers who jumped out," she says. "And I'm afraid," says {b}, "of waking up for good." They look at each other across the glow, two girls afraid of opposite things, and something in the loft gently turns over and settles.`,
`In the end {a} falls asleep first, with her head in {b}'s lap and the bear in a stranglehold, and {b} is awake for the first time you have ever seen, stroking the small horns with one finger. "She is not frightening at all," she whispers. "She is the bravest person I know." You say you will remember it. "Boo," murmurs {a}, in her sleep, very softly, and {b} smiles and hushes her, and the jar goes on glowing until morning.`]},
{id:"P_sovereign_horizon",a:"sovereign",b:"horizon",title:"The watch and the well",aff:380,wing:2,p:[
`The old well court is quiet at the turn of the watch, and {a} is already there when you arrive, standing at attention beside the curb with her hands behind her back, not looking at the figure sitting on the rim with one foot in the dark. "State your business," says {a}, without turning. "Everything returns," says {b}, pleasantly, to the well. They have said it to each other, in one form or another, every night for years. You have never seen either of them smile at it.`,
`Tonight you have brought something, and you put it on the stones between them: a flask, two cups, and a deck of cards from the staff room. "A game," you say. "One game. No wards, no watch." {a} looks at the cards as at a breach in the perimeter. {b}, who has wanted one game she could win cleanly for longer than she will admit, picks up the deck and shuffles, slowly, with a dark and fascinated care.`,
`They play. {a} counts everything: cards, lines of sight, the distance to the nearest door. {b} counts nothing and wins the first hand, and the second, and then, startlingly, loses the third because she is watching {a}'s face instead of her hand. "Noted," says {a}, quietly, and her voice is not quite level. "Returned," says {b}. They stare at each other over the cards, the sentry and the edge, and for a moment the well court seems to lean in to listen.`,
`It is {b} who says it, finally, looking into the dark and not at either of you: that she is afraid there is nothing on the other side of herself, and that {a} is the only person who has ever stood at the rim all night without flinching. {a} puts down her cards. "I have calculated," she says, stiffly, "that I would not mind a century of watching you." A pause. "In the interest of the wards." {b} laughs, startled, a clear sound that rings down the well and does not come back.`,
`You sit between them as the watch changes, and nobody calls it. The stars turn over the court. {a}'s little finger finds yours on one side, and on the other {b}'s hand slides into your pocket, cold and quite deliberate, and stays there. "Everything returns," murmurs {b}. "Noted," says {a}. Neither of them moves, and the long night, for once, has nothing left to guard.`]},
{id:"P_wolf_lioness",a:"wolf",b:"lioness",title:"Pack and Pride",aff:380,wing:1,p:[
`You are not sure who started it, though you suspect both. Somewhere between the practice yard and the dining hall, {a} and {b} have settled their ancient argument by the only means either of them respects: a race, to the top of the hill, with you as judge. "Keep up," says {a}, grinning, already crouched. "Bow down," says {b}, who does not crouch for anyone, and the two of them are gone in a spray of turf.`,
`You find them at the top, side by side, flat on their backs in the grass and laughing too hard to speak. It was a tie. It was a tie by a hair, and neither will concede it, and {b} is declaring it a victory for the Pride on a technicality that no one has ever heard of. {a} is wheezing. Her hair is full of clover. She looks the happiest you have seen her.`,
`Later, with the sun going down red behind the coast and the two of them sprawled on either side of you, they get honest, the way rivals do once they've run out of breath. {a} says she leads because someone has to, and no one has ever led her. {b} says she is crowned every morning and dethroned every night in her head, and that she has never said so aloud. They look at each other, and neither of them looks away. "You could have told me," says {a}. "You could have asked," says {b}.`,
`There is a long silence in the grass. Then {b} reaches across you and tugs {a}'s sleeve, once, in a gesture that is neither challenge nor command, and {a} lets her. "A pack needs a queen," murmurs {a}, with her wolf's quick, crooked smile, and {b} snorts and says that a Pride is a kind of pack, and that she will accept the compliment. Somewhere in the argument about whose territory the hill belongs to, you realise they have each, quietly, put a hand on you, to settle the point.`,
`The stars come out. Down below, the academy lights its lamps. The two of them argue gently over who will carry you home, and in the end neither does, because you are all too comfortable. "Keep up," whispers {a}, drowsily. "Bow down," whispers {b}, and tucks closer. You stay on the hill until the grass is wet, a pack and a Pride and a headmaster in a heap, and nobody, for once, is leading.`]}];
H.PAIRS=PAIRS;
const pairOf=id=>PAIRS.find(x=>x.id===id);
const pairText=p=>p.p.map(x=>x.replace(/\{a\}/g,HN(p.a)).replace(/\{b\}/g,HN(p.b)));
const sl0=H.sceneList;
H.sceneList=(s,h)=>{const out=sl0(s,h),g=s.girls[h];if(!g)return out;const read=(s.read&&s.read[h])||{},wing=H.lvlOf(s,"headmaster");
  PAIRS.forEach(p=>{if(p.a!==h&&p.b!==h)return;const o=p.a===h?p.b:p.a,og=s.girls[o];if(!og)return;const need=[];if(g.aff<p.aff)need.push("Affection "+p.aff);if(og.aff<p.aff)need.push(HN(o)+" at "+p.aff);if(wing<p.wing)need.push("The Headmaster's study at level "+p.wing);
    out.push({id:p.id,title:p.title+" ("+HN(o)+")",heat:2,aff:p.aff,seen:!!read[p.id],ready:!need.length,need,choice:false,art:null,pair:o})});
  return out};
const rs0=H.readScene;
H.readScene=(s,h,id)=>{const p=pairOf(id);if(!p)return rs0(s,h,id);const sc=H.sceneList(s,h).find(x=>x.id===id);if(!sc)return {ok:false,msg:"No such scene."};if(!sc.ready)return {ok:false,msg:"Not yet: "+sc.need.join("; ")};
  s.read=s.read||{};const first=!(s.read[h]||{})[id];[p.a,p.b].forEach(x=>{const r=(s.read[x]=s.read[x]||{});if(!r[id]&&s.girls[x]){r[id]=1;s.girls[x].ess+=.8;s.girls[x].mood=Math.min(100,s.girls[x].mood+5)}});
  if(first){s.renown+=.5;H.note(s,"A scene with "+HN(p.a)+" and "+HN(p.b)+": "+p.title+".")}
  return {ok:true,title:p.title,heat:2,art:null,paras:pairText(p),first}};
const st0=H.sceneText;
H.sceneText=(h,id,tone,season)=>{const p=pairOf(id);if(p)return pairText(p);return st0(h,id,tone,season)};

/* ---------- afterword: a second scene per girl, once she is very close ---------- */
const dreamV=h=>{let d=lc(String(bio(h).dreams||"").split(";")[0]);if(!d)return "live a life she has not planned";d=d.replace(/^to /,"");if(/^(a|an|the|her|my|our|some) /.test(d))d="have "+d;return d};
const AS={
 vow:{title:()=>"What she asked for",open:[
  `{n} has been working up to something for days, and tonight she asks. Not for a gift, not for a place in a contest: for a small, permanent thing. She wants a standing hour, every week, that belongs only to the two of you, and she wants it written in the register in ink.`,
  `"I have a favour to ask," says {n}, and sits down across from you with the stiff care of someone who has rehearsed her request until the words wore smooth. It is a small request. It is the largest she has ever made.`,
  `{n} finds you after the lamps are lit and says, without preamble, that she would like to be in your plans. Not near them. In them. She says it to the tabletop, and her ears are scarlet.`],
  mid:[`She tells you what the hour would be: {hobby} in the afternoon light, or {food} at the corner table, or nothing at all, together, in a room with the door shut. She has thought about every version of it. She has thought, she admits, about little else.`,
  `She wants, she says, the plain ordinary shape of a life with you in it. "I want to {dreamV}," she says, quietly, and then, with a glance up, "and you, somewhere near the middle of it."`],
  you:`I'd write it in the register myself.`,beat:"promise",
  close:[`You take the pen. The hour goes in that night, in ink, and she reads it back twice, as if checking it would not change.`,`She makes you promise twice, and kisses you once to seal it, and then, being {n}, checks the register again in the morning.`]},
 letter:{title:()=>"The letter she kept",open:[
  `{n} puts a folded letter in your hand and does not let go of it at once. She wrote it, she says, the winter she arrived, when she did not know whether she would ever dare to give it to anyone. She has kept it in her pocket book ever since.`,
  `The letter is creased soft from carrying. {n} watches your face while you unfold it, and then looks away, and then looks back, and then busies herself with the window.`,
  `"Don't read it while I'm in the room," says {n}, and then, a breath later, "No, read it now. I'll never have the nerve again."`],
  mid:[`It is short, and she has written it as she speaks, with her habits in it: how she {habit}, how she is afraid of {fear}, and how, underneath, she hopes to {dreamV}. At the bottom, in a hand that wavers, she has added a line about you, and then crossed it out, and then written it again.`,
  `It says she was afraid of {fear} and that the academy felt like a place to hide. It says she did not expect anyone to look twice. The last line has been rewritten so many times the paper has worn thin.`],
  you:`Thank you for trusting me with it.`,beat:"confess",
  close:[`You fold it along its old creases and put it in your breast pocket, where she can see it go. "Keep it safe," she says, unsteadily, and that, it turns out, is a promise you can make.`,`She asks you to read her one line aloud. You do, and she hides her face against your shoulder through the whole of it.`]},
 return:{title:h=>{const p=lc(first(bio(h).favPlace));return p&&p.length<=40?"Back to "+p:"Back where it began"},open:[
  `{n} takes you back to {place}, where it began, and for a while neither of you says anything, because it is so different now. It was a place she hid in. It is a place she shares.`,
  `"Do you remember when we first came here?" asks {n}, standing in {place} in the late light, and of course you do, and she knows you do, and she asks anyway, because she wants to hear you say it.`,
  `She has been quiet all the way to {place}, and now that you are there she turns in a slow circle and says, softly, that she never expected to be sentimental about a room.`],
  mid:[`She shows you the small things that have changed: a lamp that was not there, a chair that has become hers, the carved initials she has pretended for months not to know about. She was afraid, back then, of {fear}. She does not feel quite so alone with it now.`,
  `She tells you what she thought the first time she stood there, and what she thinks now, and how little the two have in common. Wanting to {dreamV}, she says, used to be a thing she kept at the back of her mind. Lately it has come forward.`],
  you:`I'm glad it was you I found here.`,beat:"praise",
  close:[`You stay until the light has gone, and when you leave she touches the doorframe, the way you touch something you mean to come back to.`,`She takes your hand on the way out, and does not let go until the lamps of the main hall are in sight.`]},
 keep:{title:()=>"Something to keep",open:[
  `{n} presses something into your palm: small, plain, hand-made, and obviously much handled. She made it herself, over many nights, and she has not let anyone else see it.`,
  `There is a little package on your desk, wrapped in something that is clearly {color}, tied with a ribbon that has been retied three times. Under it, a note in {n}'s handwriting: "Open when I'm not in the room." She is in the room.`,
  `"It isn't much," says {n}, producing it from behind her back, "and I know you don't need it, but I wanted you to have something that was only yours."`],
  mid:[`It smells faintly of {scent}, which she says is an accident, and which you both know is not. Inside is a pressed {flower}, and a single line about {like}, and a small, absurd drawing of the two of you as she sees you.`,
  `It is a keepsake, of the kind people give each other when they hope to be remembered: something of {color}, something of {flower}, something that took patience she does not usually have.`],
  you:`I'll carry it everywhere.`,beat:"accept",
  close:[`You do, from that day on, and more than once you catch her seeing it and pretending not to.`,`She watches you put it away with the intense, anxious pride of a girl whose handiwork has found a home.`]}};
const ASK=Object.keys(AS);
const afterShape=h=>{const b=bio(h),av=["vow","letter"];if(b.favPlace)av.push("return");if(b.favColor||b.favFlower||b.favScent)av.push("keep");return av[Math.floor(hash(h+"|after")*av.length)]};
function afterGen(h){const R=rng(h+"|aft"),pick=a=>a[Math.floor(R()*a.length)],sh=AS[afterShape(h)],arch=H.voiceOf(h);
  const mids=sh.mid.filter(x=>!/\{habit\}/.test(x)||bio(h).habits),p=[pick(sh.open),pick(V.MANN[arch]),pick(mids.length?mids:sh.mid),'You say, "'+sh.you+'" '+pick(V.SAY[sh.beat][arch])];
  p.push(pick(V.SENSE[2])+" "+pick(V.REACT[arch][2]));p.push(R()<.5?pick(V.DREAM):pick(V.FEAR));p.push(pick(sh.close));return p.map(x=>x.replace(/{dreamV}/g,dreamV(h)))}
const afterTitle=h=>AS[afterShape(h)].title(h).replace(/^./,c=>c.toUpperCase());
ACAD.HOUSES.forEach(h=>{T.push({id:"A_"+h,only:h,t:afterTitle(h),heat:2,aff:540,wing:1,intr:"",b:[],o:[],y:[],c:[],gen:afterGen})});
T.sort((a,b)=>a.aff-b.aff);
H.SCENES.length=0;T.forEach(t=>H.SCENES.push({id:t.id,title:t.t,heat:t.heat,aff:t.aff,wing:t.wing,art:t.art||null,only:t.only||null,season:t.season||null}));
H.afterwordOf=h=>"A_"+h;

/* ---------- a seasonal coda for capstones and afterwords ---------- */
const CODA={
 spring:[`Outside the window the first blossom is out, and the whole academy smells of rain and new grass. It seems, for once, that nothing could go wrong.`,`Spring has come to the grounds. When she looks up at you in the soft grey light, she looks like someone who has decided to begin.`,`The windows are open, and the air coming in is thin and green and full of beginnings. {n} breathes it in, and smiles at nothing, and at you.`],
 summer:[`It is high summer, and the evening goes on and on, gold and slow, with the smell of {flower} drifting in from somewhere. Neither of you wants it to end.`,`Warm night air, open shutters, the far hum of crickets. She fans herself with whatever is nearest and leans her head on your shoulder anyway.`,`The heat of the day lingers in the stones. {n} is flushed with it, or with something else, and does not trouble to say which.`],
 autumn:[`Autumn has turned the cloister gold, and the first fires are lit. There is a ripe, smoky sweetness in the air, the particular sadness of a good season ending, and you hold on to each other against it.`,`Leaves tap at the glass. She pulls a blanket over both of you and says it is purely for warmth, which is nearly true.`,`The light is amber and the evenings come early now. {n} says it is her favourite time of year, and for once does not argue when you say it is yours as well.`],
 winter:[`Snow has begun, thin and silent, and the lamplight feels like a gift. She tucks herself against you for warmth, and neither of you pretends it is only that.`,`Frost on the panes, the stove ticking, the castle hushed. In a season built for being indoors, {n} could not have picked a better room.`,`It is the longest night of the year, or feels it, and she says she would like to spend all of it exactly where she is.`]};
const st1=H.sceneText;
H.sceneText=(h,id,tone,season)=>{const p=st1(h,id,tone,season);if(!p||!season||!(/^S_|^A_/.test(id)))return p;const R=rng(h+"|"+id+"|coda|"+season),a=CODA[season];if(!a)return p;
  return p.concat([fill(a[Math.floor(R()*a.length)],h).replace(/\s+/g," ").trim()])};

/* ---------- arrivals mention her group ---------- */
const GA=[g=>`She was raised among ${g}, and carries a little of it in the way she stands.`,g=>`${g} sent her, and you can tell: she looks about as if checking that the academy measures up.`,g=>`She mentions ${g} twice in the first minute, and then, seeing you notice, stops.`,g=>`There is a trace of ${g} in her manner, in the small certainties she doesn't know she has.`,g=>`"Where I come from, ${g} would never allow this," she says, looking at the cracked flagstone, and then, grudgingly, "I don't hate it."`,g=>`She wears ${g}'s colours still, and has not decided whether she is proud of it or tired of it.`];
const arr0=H.arrivalScene;
H.arrivalScene=h=>{const out=arr0(h),g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h);if(!g||!g.name)return out;const R=rng(h+"|garr"),nm=String(g.name).replace(/^The /,"the ");out.splice(Math.min(2,out.length),0,GA[Math.floor(R()*GA.length)](nm).replace(/^./,c=>c));return out};

/* ---------- more things on the Desk ---------- */
const N=H.NOTICE_TYPES,pickGirl=(s,f,seed)=>{const l=s.order.filter(h=>s.girls[h]&&f(s.girls[h],h));return l.length?l[Math.floor(hash(seed+s.day)*l.length)]:null};
N.moonwalk={pick:s=>{const h=pickGirl(s,g=>g.aff>=180,"mw");return h?{h}:null},
 text:(s,n)=>HN(n.h)+" finds you late, wrapped in a coat over her nightdress, and asks if you would walk the grounds with her while the moon is up. She says she cannot sleep. She does not say why.",
 choices:[{label:"Walk with her",fx:(s,n)=>{const g=s.girls[n.h];g.aff+=4;g.mood=Math.min(100,g.mood+8);return "You walk the whole perimeter twice, and by the end she is leaning on your arm."}},{label:"Send her back to bed, kindly",fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+2);return "She goes, a little reluctantly, with a look back from the stairs."}}]};
N.petlost={pick:s=>{const h=pickGirl(s,(g,h)=>!!bio(h).pets,"pl");return h?{h}:null},
 text:(s,n)=>{const m=/named (\w+)/.exec(bio(n.h).pets||"");return HN(n.h)+" is searching the cloisters with a lamp. "+(m?m[1]:"Her companion")+" has slipped out again, and she is trying very hard to look calm about it."},
 choices:[{label:"Help her look",fx:(s,n)=>{const g=s.girls[n.h];g.aff+=3;g.mood=Math.min(100,g.mood+9);return "You find it asleep in the laundry. She hugs the creature, and then, less formally, you."}},{label:"Send a few of the girls",fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+6);s.order.forEach(h=>{s.girls[h].ess+=.2});return "A search party of a dozen finds it in minutes. The whole dining hall hears about it."}}]};
N.sketch={pick:s=>{const h=pickGirl(s,(g,h)=>!!bio(h).hobbies&&g.aff>=90,"sk");return h?{h}:null},
 text:(s,n)=>HN(n.h)+" asks, shyly, if she may put something on the wall of the main hall: a piece of work from "+(lc(first(bio(n.h).hobbies))||"her hobby")+", the best she has done. She is already regretting asking.",
 choices:[{label:"Hang it in pride of place",fx:(s,n)=>{const g=s.girls[n.h];g.mood=Math.min(100,g.mood+12);g.ess+=1.5;s.renown+=1;return "It hangs by the great door, and she walks past it three times a day, pretending not to look."}},{label:"Suggest the library, where fewer people look",fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+5);return "She accepts gratefully, and a few brave visitors ask who did it."}}]};
N.thunder={pick:s=>s.order.length>=4?{}:null,
 text:s=>"A storm walks over the hills in the small hours and the whole academy is awake. Doors open along the corridor, one by one, and girls in nightdresses begin to drift toward the lit window of your study.",
 choices:[{label:"Hold a story hour by the fire",fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+5);s.girls[h].ess+=.5});s.renown+=1;return "You read until the thunder is only a murmur, and by dawn there are girls asleep on every cushion."}},{label:"Let them sit with the lamps lit",fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+2)});return "They whisper, and giggle, and keep each other company. No harm done."}}]};
N.gossip={pick:s=>{const h=pickGirl(s,g=>g.aff>=300,"gs");return h?{h}:null},
 text:(s,n)=>"The students have noticed how often you are seen with "+HN(n.h)+", and the corridors are full of significant glances. She has gone pink to the ears and says it is nothing, loudly, at a volume that makes it something.",
 choices:[{label:"Smile and say nothing",fx:(s,n)=>{const g=s.girls[n.h];g.aff+=3;g.mood=Math.min(100,g.mood+6);return "The rumour grows by the hour and the academy enjoys it enormously. She is secretly pleased."}},{label:"Be discreet for a day or two",fx:(s,n)=>{s.girls[n.h].mood=Math.min(100,s.girls[n.h].mood+3);return "The rumour finds something else to feed on. She gives you a look that is half relief, half reproach."}}]};
N.recital={pick:s=>s.order.length>=4?{}:null,
 text:s=>"A few of the girls want to put on a recital in the great hall, with music, poems and one very ambitious dance. They have rehearsed it in secret, which is to say, loudly, in the corridors.",
 choices:[{label:"Host it properly (50 coins)",cost:50,fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].mood=Math.min(100,s.girls[h].mood+4)});s.renown+=2;return "The hall is full, the dance goes wrong in a way everyone loves, and they take three bows."}},{label:"Let them use the cloister",fx:(s,n)=>{s.order.forEach(h=>{s.girls[h].ess+=.4});return "A smaller audience, a warmer evening, and an encore nobody planned."}}]};
})();
