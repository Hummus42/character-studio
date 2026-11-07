/* Everspire Collection: mature skins. Adult illustrated outfits for the girls (every girl on the roster is 18 or over),
   bought with gold, behind an 18+ confirmation and the Mature Content setting (Off, On).
   Art lives in assets/skins/<girl>/<skin>.webp; js/climb-mart.js lists what exists. */
(()=>{const C=ACAD.climb;
/* three nude skins per girl: the anime one, the painted Deluxe and the glistening Desire; lvl 1 = Mature Content is on */
C.MSKINS=[
 {id:"unveiled",n:"Unveiled",cost:6000,lvl:1,d:"Nothing at all.",nude:1},
 {id:"deluxe",n:"Unveiled Deluxe",cost:12000,lvl:1,d:"Nothing at all, painted in full detail.",nude:1},
 {id:"desire",n:"Unveiled Desire",cost:20000,lvl:1,d:"Nothing at all, flushed and glistening.",nude:1}];
C.MART=C.MART||new Set();
C.mskinURL=(girl,id)=>"assets/skins/"+girl+"/"+id+".webp";
C.mskinHave=(girl,id)=>C.MART.has(girl+"/"+id);
/* her mini character for the climb: a standing adult figure on a clear background */
C.mspriteURL=(girl,id)=>"assets/skins/"+girl+"/"+id+".s.webp";
C.mspriteHave=(girl,id)=>C.MART.has(girl+"/"+id+".s");
})();
