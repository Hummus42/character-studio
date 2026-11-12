/* The House robes prompts no longer carry the sentence "She is standing straight, facing the viewer, arms relaxed at her sides."
   in the body of the prompt. It is now a Framing option in the Finish tab ("Standing, facing viewer") and the default framing
   of every girl's robes starting point, so it loads with them and can be changed or set to None like any other framing.
   Only the girls' own robes templates (<house>robes) are changed; headmistress and boy robes and every other look keep theirs. */
(function(){
"use strict";
const STAND="standing straight, facing the viewer, arms relaxed at her sides";
const DEF=/^standing straight, facing the viewer, arms relaxed at (her|his) sides$/;
window.ROBES_STAND_FRAMING=STAND;
/* the framing as it goes into the prompt (his sides for a man) */
window.framingText=function(v){return v===STAND&&typeof isMale==="function"&&isMale()?STAND.replace("her sides","his sides"):v};
const girlRobes=id=>/robes$/.test(id)&&!/(man|head)robes$/.test(id);
function fix(t){
  if(!t||t.__rp||typeof t.id!=="string"||!girlRobes(t.id))return t;
  try{
    const c=t.c;if(c&&typeof c==="object"&&DEF.test(String(c.posture||"")))delete c.posture;
    t.out=t.out||{};if(!t.out.framing||t.out.framing==="cowboy shot")t.out.framing=STAND;
    Object.defineProperty(t,"__rp",{value:1,enumerable:false});
  }catch(e){}
  return t}
const all=()=>{try{(typeof TEMPLATES!=="undefined"?TEMPLATES:[]).forEach(fix)}catch(e){}};
all();
/* templates made after this script runs are fixed the moment they are asked for */
if(typeof window.tplById==="function"){const t0=window.tplById;window.tplById=function(){return fix(t0.apply(this,arguments))}}
document.addEventListener("DOMContentLoaded",()=>setTimeout(all,0));
})();
