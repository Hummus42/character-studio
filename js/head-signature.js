/* Everspire: the Headmaster, a signature scene for every girl who is not a group leader (the twelve leaders have hand-written ones). Each is one of six story shapes (her place,
   her craft, a shared meal, a wager, her song or her book, her people), chosen from what her bio has to give, and filled with her own place, hobby, food, music, pet or family.
   They open at affection 360. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.head||!ACAD.head._v)return;
const H=ACAD.head,T=H.SCENE_T,V=H._v,rng=H.rngSeed,bio=H.bioOf,hash=H.hash;
const lc=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toLowerCase()+t.slice(1):""},up=t=>{t=String(t||"").trim().replace(/[.!]+$/,"");return t?t.charAt(0).toUpperCase()+t.slice(1):""};
const first=t=>String(t||"").split(/[;,]/)[0].trim();

const SH={
 place:{you:"I can see why you love it.",beat:"accept",
  open:[`{n} has been promising to show you {place} for weeks, and tonight she finally does, leading you there by the sleeve with the nervous pride of someone opening a secret. It is, you realise as you arrive, the place she goes to be entirely herself.`,`"Come on," says {n}, "I want you to see {place}," and she will not say another word until you are standing in it. She watches your face the whole while, as if your first impression were an examination.`],
  close:[`You stay until the light changes, and when you leave she looks back once, as though thanking the place for letting you in.`,`On the way back she walks closer than before, and neither of you mentions it.`]},
 craft:{you:"I'm going to be terrible at this.",beat:"praise",
  open:[`{n} has decided to teach you {hobby}, on the grounds, she says, that no one should go through life without at least one thing she loves. She has laid out everything you will need on the grass, in order, like surgical instruments.`,`You find {n} at {hobby}, lost in it, and she looks up with such unguarded joy that you ask her to show you how. She is, you discover, a ferocious and patient teacher.`],
  close:[`You never do get the hang of it. She says that is fine; it means you will have to come back.`,`She keeps the thing you made, however crooked, and puts it somewhere she will see it every day.`]},
 meal:{you:"This is the best thing I've eaten all year.",beat:"tease",
  open:[`{n} cooks, or rather {n} supervises the kitchen while you cook, in a spirit of loving despotism, because she has a plan for {food}, a flask of {drink} and a firm belief that the way to a person's heart is through a small flame.`,`The table is laid for two in the corner of the kitchens, with {food} steaming on the plates and {drink} poured, and {n} standing behind her chair, pretending she has not been waiting an hour.`],
  close:[`You wash up together by candlelight, and she flicks you with the tea towel when you are not looking.`,`She falls asleep at the table with her chin on her hand, and you carry the plates away quietly, one at a time.`]},
 wager:{you:"Name your stakes, and I'll name mine.",beat:"tease",
  open:[`{n} challenges you over {hobby}, for stakes she refuses to name until she has won. The contest is close and noisy and ends in a draw that she disputes, and then, breathlessly, collects the stakes anyway.`,`"Bet you can't beat me at {hobby}," says {n}, and the stakes, she explains, are whatever the winner wants. She is grinning like a fox.`],
  close:[`The stakes, in the end, are a kiss, and a second kiss to settle who owes whom.`,`She wins by a hair, and claims her prize, and then, flushed, lets you claim yours.`]},
 song:{you:"Play it again.",beat:"ask",
  openM:[`{n} puts on some {music} in your study and holds out a hand, saying nothing, and you take it. She leads, badly and happily, around the furniture.`,`"This is what I play when I can't sleep," says {n}, and sets the needle down on some {music}, and sits on the floor with her back against your knees.`],
  openB:[`{n} curls up beside you with {book}, opens it at a page she has read a hundred times, and begins to read aloud in a voice you would follow anywhere.`,`"This is the one," says {n}, pressing {book} into your hands, open at a page worn soft from reading. "Read it aloud. I want to hear it in someone else's voice."`],
  close:[`The needle hisses in the last groove, and neither of you gets up to lift it.`,`She marks the page with a ribbon and says, "Tomorrow, the next chapter," like a promise.`]},
 people:{you:"Tell me more about them.",beat:"confess",
  openP:[`{n} takes you down to the yard, because she wants you to hear about her pet: {pet}. She talks for ten minutes without drawing breath, hands everywhere, and you realise you have not stopped smiling.`,`"I miss {pet} most of all," says {n}, sitting on the mounting block with her chin in her hands, and then tells you every detail of an animal you have never met.`],
  openF:[`{n} shows you a letter from home and tells you about her mother, {mother}, with the fond exasperation of a daughter who has never doubted she is loved.`,`"You'd like my mother," says {n}, turning a letter over in her hands, and tells you about {mother}, until the lamp has burned low.`],
  close:[`She goes quiet at the end and says, "I wanted you to know where I come from," and leans her head on your shoulder.`,`She folds the letter away with great care, and says that someday, perhaps, you could meet them.`]}};
function shapeFor(h){const b=bio(h),av=[];if(b.favPlace)av.push("place");if(b.hobbies){av.push("craft");av.push("wager")}if(b.favFood||b.favDrink)av.push("meal");if(b.favMusic||b.favBook)av.push("song");if(b.pets||b.mother)av.push("people");
  return av[Math.floor(hash(h+"|shape")*av.length)]||"place"}
function titleFor(h,shape){const b=bio(h);switch(shape){case"place":return up(b.favPlace).replace(/ (at|under|after|on|in) .*$/i,m=>m.length>22?"":m)||"Her place";case"craft":return "A lesson in "+lc(first(b.hobbies));case"meal":return up(first(b.favDrink)||first(b.favFood))+" for two";case"wager":return "A wager over "+lc(first(b.hobbies));
  case"song":return b.favMusic?"The song she plays at night":"A page she loves";case"people":return b.pets?"Meeting the family":"Her people";default:return "Her scene"}}
function gen(h){const R=rng(h+"|sig"),b=bio(h),arch=H.voiceOf(h),pick=a=>a[Math.floor(R()*a.length)],shape=shapeFor(h),S=SH[shape];
  const open=shape==="song"?(b.favMusic?S.openM:S.openB):shape==="people"?(b.pets?S.openP:S.openF):S.open;
  const p=[pick(open),pick(V.MANN[arch]),'You say, "'+S.you+'" '+pick(V.SAY[S.beat][arch])];
  p.push(R()<.5?pick(V.FEAR):pick(V.DREAM));p.push(pick(V.SENSE[2])+" "+pick(V.REACT[arch][2]));p.push(pick(S.close));return p}
ACAD.HOUSES.forEach(h=>{if(H.isLeader(h))return;const sh=shapeFor(h);T.push({id:"S_"+h,only:h,t:titleFor(h,sh),heat:2,aff:360,wing:0,intr:"",b:[],o:[],y:[],c:[],gen})});
T.sort((a,b)=>a.aff-b.aff);
H.SCENES.length=0;T.forEach(t=>H.SCENES.push({id:t.id,title:t.t,heat:t.heat,aff:t.aff,wing:t.wing,art:t.art||null,only:t.only||null,season:t.season||null}));
H.signatureOf=h=>"S_"+h;
})();
