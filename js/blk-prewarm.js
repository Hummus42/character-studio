/*OPTS-END*/
/*PREWARM-BEGIN*/
/* v308: the Roll's crests and sigils are drawn in idle time after load, so the Roll opens at once */
(function(){
  if(typeof ENC==="undefined"||!ENC.ROLL||!ENC.sigilURL)return;
  window.addEventListener("load",()=>setTimeout(()=>{
    const jobs=[];ENC.ROLL.forEach(g=>{jobs.push(()=>ENC.lostCrestURL(g.id));g.houses.forEach(h=>jobs.push(()=>ENC.sigilURL(g.id,h.name)))});
    /* one drawing per idle slice; browsers without requestIdleCallback (Safari) get one per timer tick, never a loop */
    const ric=window.requestIdleCallback||(f=>setTimeout(()=>{const t0=performance.now();f({timeRemaining:()=>Math.max(0,12-(performance.now()-t0))})},120));
    const step=d=>{try{if(jobs.length)jobs.shift()()}catch(e){jobs.length=0}if(jobs.length)ric(step,{timeout:4000})};
    ric(step,{timeout:4000})},6000));
})();
