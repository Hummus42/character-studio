/* Everspire: the version, shown beside the title in the studio's header. Bump EV_VERSION and EV_DATE before every push.
   (It lived in game-ui.js until the games were archived on 2026-11-17: branch archive/with-games.) */
const EV_VERSION="2.80",EV_DATE="Nov 25, 2026";
window.EVERSPIRE_VERSION=EV_VERSION;
(function(){
  const put=()=>{const b=document.querySelector("header.top .brand");if(!b||b.querySelector(".ev-ver"))return;
    const s=document.createElement("span");s.className="ev-ver";s.textContent="v"+EV_VERSION;s.title="Everspire version "+EV_VERSION+" ("+EV_DATE+")";
    s.style.cssText="font-size:11px;opacity:.6;margin-left:6px;align-self:center;white-space:nowrap";b.append(s)};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",put);else put();
})();
