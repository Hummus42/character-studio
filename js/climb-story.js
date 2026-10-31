/* Everspire: Climb the Spire, her story. Bond grows as a girl climbs with you (a run, a win, being freed, a new tier), and the written scenes
   the Headmaster mode already has unlock from it. Reuses the scene engine through a small stand-in state, so every scene, pair scene and afterword works. */
(function(){
"use strict";
if(typeof ACAD==="undefined"||!ACAD.climb||!ACAD.head||!ACAD.head.sceneList||!ENC.E)return;
const C=ACAD.climb,H=ACAD.head,E=ENC.E,HN=ENC.HN,U=ACAD.gameUI;
const TIER_AT=[0,60,200,500,1200];
const tierOf=(M,h)=>{const e=(M.ess||{})[h]||0;let t=0;TIER_AT.forEach((v,i)=>{if(e>=v)t=i});return t};
const wingOf=M=>Math.min(3,1+Math.floor(Object.keys(M.best||{}).length/4));

/* a stand-in for the Headmaster state, just rich enough for the scene engine */
function fake(M,h){M.bond=M.bond||{};M.read=M.read||{};const S={girls:{},rooms:{headmaster:{lvl:wingOf(M)}},read:M.read,renown:0,day:(M.runs||0)*23,log:[],order:[],muses:[],funds:0,short:[],alumnae:[],seals:0};
  Object.keys(M.free||{}).forEach(g=>{if(!M.free[g])return;S.girls[g]={aff:M.bond[g]||0,ess:0,mood:50,tier:tierOf(M,g),stats:{},trial:{},joined:0,focus:null};S.order.push(g)});
  if(!S.girls[h]){S.girls[h]={aff:M.bond[h]||0,ess:0,mood:50,tier:0,stats:{},trial:{},joined:0};S.order.push(h)}return S}
const list=(M,h)=>{try{return H.sceneList(fake(M,h),h)}catch(e){return []}};
const fresh=(M,h)=>list(M,h).filter(x=>x.ready&&!x.seen);

/* what a run earns in bond; returns what to tell the player */
function award(M,res,freed){M.bond=M.bond||{};const gain={},h=res.hero;
  gain[h]=Math.round(15+Math.min(20,res.kills/100)+(res.win?45:0));
  if(freed&&res.boss)gain[res.boss]=(gain[res.boss]||0)+100;
  const before={};Object.keys(gain).forEach(g=>before[g]=fresh(M,g).length);
  Object.keys(gain).forEach(g=>{M.bond[g]=(M.bond[g]||0)+gain[g]});
  const newly=[];Object.keys(gain).forEach(g=>{const n=fresh(M,g).length-before[g];if(n>0)newly.push({h:g,n})});
  return {gain,newly}}

/* ---------- the reader ---------- */
const css=`
#evRoot .cs-ov{position:fixed;inset:0;z-index:420;background:#05031ae6;overflow:auto;padding:14px}
#evRoot .cs-box{max-width:720px;margin:0 auto;background:var(--g-card,#14102e);border:1px solid var(--g-gold,#d8b25a);border-radius:12px;padding:14px}
#evRoot .cs-row{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:8px 0;border-top:1px solid var(--g-line,#2c2650)}
#evRoot .cs-row.lock{opacity:.5}#evRoot .cs-row small{display:block;color:var(--g-mut,#a79fc4)}
#evRoot .cs-text p{margin:.7em 0;line-height:1.6;font-size:16px}
#evRoot .cs-art{width:100%;max-height:320px;object-fit:contain;border-radius:8px;margin-bottom:8px;background:#000}`;
function injectCss(){if(!document.getElementById("csCss"))document.head.append(E("style",{id:"csCss"},css))}
function open(h,M,onClose){injectCss();const root=U.root(),ov=E("div",{class:"cs-ov"}),box=E("div",{class:"cs-box"});ov.append(box);root.append(ov);
  const close=()=>{ov.remove();if(onClose)onClose()};
  const bond=()=>(M.bond||{})[h]||0;
  const showList=()=>{box.textContent="";const L=list(M,h).slice().sort((a,b)=>a.aff-b.aff||(a.pair?1:0)-(b.pair?1:0));const nxt=L.filter(x=>!x.ready)[0];
    box.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("div",null,E("h2",{style:{margin:0}},HN(h)+"'s story"),E("div",{class:"mut"},"Bond "+bond()+(nxt?" · next scene at "+nxt.aff:" · every scene is open"))),E("button",{type:"button",onclick:close},"Close")),
      E("p",{class:"mut",style:{fontSize:"13px"}},"Bond grows each time she climbs with you: more for a win, and a lot when she joins you. Floors you clear widen what she will share."));
    L.forEach(sc=>{const row=E("div",{class:"cs-row"+(sc.ready?"":" lock")},E("div",null,E("b",null,sc.ready?sc.title:"Locked"),E("small",null,sc.ready?(sc.seen?"Read":"New")+(sc.pair?" · with "+HN(sc.pair):""):(sc.need||[]).join("; ").replace("Affection","Bond").replace("The Headmaster's study at level","Floors cleared tier"))),
      sc.ready?E("button",{type:"button",class:sc.seen?"sm":"pri sm",onclick:()=>read(sc)},sc.seen?"Read again":"Read"):null);box.append(row)});if(!L.length)box.append(E("p",{class:"mut"},"Nothing here yet."))};
  const read=sc=>{const S=fake(M,h),r=H.readScene(S,h,sc.id);if(!r||!r.ok){showList();return}
    try{localStorage.setItem("everspire.climb.v1",JSON.stringify(M))}catch(e){}
    box.textContent="";box.append(E("div",{class:"row",style:{justifyContent:"space-between"}},E("h2",{style:{margin:0}},r.title),E("button",{type:"button",onclick:showList},"Back")));
    const url=ACAD.game&&ACAD.game.sceneURL&&r.art?ACAD.game.sceneURL(h,r.art):null;if(url)box.append(E("img",{class:"cs-art",src:url,alt:"",onerror:ev=>ev.target.remove()}));
    box.append(E("div",{class:"cs-text"},...(r.paras||[]).map(p=>E("p",null,p))));};
  showList()}

C.story={list,fresh,award,open,fake,wingOf};
})();
