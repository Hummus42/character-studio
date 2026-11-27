/* 2026-11-27 Crews (user request): lore sub-groups across Houses, e.g. the Maryland Crew and the Everspire Party.
   Data: js/data-crews.js (window.EVERSPIRE_CREWS). Adds:
   - ACAD.CREWS, ACAD.crewsOf(h)
   - Encyclopedia: an index page "crews", one page per crew "crew:<id>" (members linking to their full pages, lore, CGs with
     narration), a Crews link in the nav under Houses and Groups, and a "Her crews" card on each member's page.
   The studio drawer's Crews list lives in blk-ux.js and reads ACAD.CREWS. */
(function(){try{
  if(typeof ACAD==="undefined"||typeof ENC==="undefined"||!ENC.E||!window.EVERSPIRE_CREWS)return;
  const E=ENC.E,HN=h=>(ENC.HN?ENC.HN(h):h),lnk=(id,t)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},t);
  const CREWS=window.EVERSPIRE_CREWS.map(c=>Object.assign({},c,{members:c.members.filter(h=>ACAD.HOUSES.includes(h))}));
  ACAD.CREWS=CREWS;ACAD.crewsOf=h=>CREWS.filter(c=>c.members.includes(h));
  const css=`#encDlg .crew-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:14px;margin:14px 0 22px}
#encDlg .crew-m{display:flex;flex-direction:column;align-items:center;gap:6px;text-decoration:none;color:inherit;text-align:center;font-size:14px}
#encDlg .crew-m img{width:120px;height:175px;object-fit:cover;object-position:top;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.25)}
#encDlg .crew-m small{opacity:.75}
#encDlg .crew-cg{margin:22px 0}
#encDlg .crew-cg img{width:100%;border-radius:12px;box-shadow:0 4px 18px rgba(0,0,0,.3);display:block}
#encDlg .crew-cg h4{font-family:var(--e-serif);font-size:20px;margin:10px 0 4px}
#encDlg .crew-cg .crew-strip{display:flex;gap:6px;overflow:hidden;border-radius:12px}
#encDlg .crew-cg .crew-strip img{flex:1;min-width:0;height:220px;object-fit:cover;object-position:top;border-radius:0;box-shadow:none}
#encDlg .crew-row{display:flex;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid rgba(127,127,127,.25);text-decoration:none;color:inherit}
#encDlg .crew-row .faces{display:flex}
#encDlg .crew-row .faces img{width:44px;height:44px;border-radius:50%;margin-right:-10px;border:2px solid var(--e-bg,#1b1830);object-fit:cover}`;
  document.head.append(E("style",{id:"crewsCss"},css));
  const head=h=>E("img",{src:`assets/portraits/${h}.h.webp`,alt:HN(h),loading:"lazy"});
  const member=h=>{const b=(typeof BIOS==="object"&&BIOS[h])||{};return E("a",{href:"#",class:"crew-m",onclick:ev=>{ev.preventDefault();ENC.go("house:"+h)}},
    E("img",{src:`assets/portraits/${h}.c.webp`,alt:HN(h),loading:"lazy"}),E("b",null,HN(h)),b.fullName?E("small",null,b.fullName):null)};
  const cg=(c,x)=>{const box=E("figure",{class:"crew-cg"});const img=E("img",{src:`assets/crews/${x.img}.webp`,alt:x.title,loading:"lazy"});
    img.addEventListener("error",()=>img.replaceWith(E("div",{class:"crew-strip"},c.members.map(h=>E("img",{src:`assets/portraits/${h}.c.webp`,alt:HN(h)})))),{once:true});
    box.append(img,E("h4",null,x.title),E("p",{class:"enc-p"},x.p));return box};
  ENC.page("crews",{title:"Crews",short:"Crews",sec:"groups",crumbs:["groups"],build:el=>{
    el.append(E("article",{class:"enc-article"},E("h1",{class:"enc-title"},"Crews"),
      E("p",{class:"enc-lead"},"Some friendships ignore the Houses entirely. A crew is a circle of girls from all over the Academy, bound by where they come from or what they share."),
      CREWS.map(c=>E("a",{href:"#",class:"crew-row",onclick:ev=>{ev.preventDefault();ENC.go("crew:"+c.id)}},E("span",{class:"faces"},c.members.map(head)),
        E("span",null,E("b",null,c.name),E("br"),E("small",null,c.members.map(HN).join(", ")))))))}});
  CREWS.forEach(c=>ENC.page("crew:"+c.id,{title:c.name,short:c.short||c.name,sec:"groups",crumbs:["groups","crews"],build:el=>{
    const art=E("article",{class:"enc-article"},E("h1",{class:"enc-title"},c.name),c.also?E("p",{class:"enc-note"},"Also called "+c.also+"."):null,
      c.motto?E("p",{class:"enc-p"},E("i",null,"“"+c.motto+"”")):null,E("p",{class:"enc-lead"},c.lead),
      E("div",{class:"crew-grid"},c.members.map(member)));
    if(c.cgs&&c.cgs[0])art.append(cg(c,c.cgs[0]));
    (c.sections||[]).forEach((s,i)=>{art.append(E("h3",{class:"enc-h"},s.h),...s.p.map(t=>E("p",{class:"enc-p"},ENC.linkNames?ENC.linkNames(t):t)));
      const x=i%2===1&&c.cgs&&c.cgs[(i+1)/2];if(x)art.append(cg(c,x))});
    const used=new Set([0,...(c.sections||[]).map((s,i)=>i%2===1?(i+1)/2:-1)]);
    (c.cgs||[]).forEach((x,i)=>{if(!used.has(i))art.append(cg(c,x))});
    el.append(art)}}));
  ENC.NAV_AFTER_GROUPS=(ENC.NAV_AFTER_GROUPS||[]).concat([{page:"crews",title:"Crews"}]);
  const bh=ENC.buildHouse;
  if(bh)ENC.buildHouse=function(el,h){bh.apply(this,arguments);try{const cs=ACAD.crewsOf(h);if(!cs.length)return;const side=el.querySelector(".enc-side");if(!side)return;
    side.append(E("div",{class:"enc-card"},E("h4",null,cs.length>1?"Her crews":"Her crew"),
      ...cs.map(c=>E("p",{class:"enc-note",style:{marginTop:0}},lnk("crew:"+c.id,c.name),": ",c.members.filter(x=>x!==h).map((x,i)=>[i?", ":"",lnk("house:"+x,HN(x))]).flat()))))}catch(e){console.warn("[crews]",e)}};
}catch(e){console.warn("[crews]",e)}})();
