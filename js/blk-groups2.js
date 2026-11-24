/*GROUPS2-BEGIN*/
/* ---- v311: second and third banners. Every girl keeps her own group (her first banner: her faction, her rival group, her
   table and her Spire Cup points) and may carry up to two more (canon edits.groups2: {house: [[group, kind, oath], ...]}).
   Kinds: sworn (within her faction), and across the line between Dawn and Dusk the rare plotted ones: envoy, spy, defector
   and double agent (sworn to her own group's rivals). The extra banners show in her Biography (Second and Third banner,
   and her sworn sisters under Friends), on her House page and on each group's page, and a group's scene lineup offers
   its sworn girls beside its own. ACAD.extraGroups(h), ACAD.swornMembers(gid), ACAD.bannersOf(h). ---- */
(function(){
  if(typeof ACAD==="undefined"||!ACAD.canon||!ACAD.GROUPS)return;
  const L=ACAD.canon.layer(),RAW=(L.edits&&L.edits.groups2)||{};
  const G=id=>ACAD.GROUPS.find(g=>g.id===id),HOUSES=new Set(ACAD.HOUSES||[]);
  const home=h=>{const g=ACAD.GROUP_OF?ACAD.GROUP_OF(h):null;return g?g.id:""};
  const KIND={sworn:"Sworn",envoy:"Envoy",spy:"Spy",defector:"Defector",double:"Double agent"};
  const X={},BAD=[];
  Object.entries(RAW).forEach(([h,l])=>{(Array.isArray(l)?l:[]).forEach((e,i)=>{const [g,k,o]=e||[];
    if(!HOUSES.has(h)||!G(g)||g===home(h)||i>1){BAD.push(h+" → "+g);return}
    (X[h]=X[h]||[]).push({g,kind:KIND[k]?k:"sworn",oath:String(o||"")})})});
  ACAD.extraGroups=h=>(X[h]||[]).slice();
  ACAD.swornMembers=gid=>Object.keys(X).filter(h=>X[h].some(e=>e.g===gid));
  ACAD.bannersOf=h=>[home(h)].filter(Boolean).concat((X[h]||[]).map(e=>e.g));
  ACAD.BANNER_KINDS=KIND;ACAD.BANNERS_BAD=BAD;
  const HN=h=>(typeof ENC!=="undefined"&&ENC.HN?ENC.HN(h):(ACAD.HNAME&&ACAD.HNAME[h])||h);
  const low=s=>String(s||"").replace(/^The /,"the ");
  const kindTag=e=>e.kind==="sworn"?"":" ("+KIND[e.kind].toLowerCase()+")";

  /* a champion of a group that has woken is one of its sworn girls now, not a champion of a sleeping banner */
  const st=ACAD.swornTo;if(st)ACAD.swornTo=h=>{const s=st(h);return s&&G(s.lost)?null:s};

  /* Biographies: Second and Third banner, and her sworn sisters under Friends */
  if(typeof BIOS==="object")Object.keys(X).forEach(h=>{const b=BIOS[h];if(!b)return;
    const names=X[h].map(e=>G(e.g).name+kindTag(e));
    const sleeping=b.group2&&!ACAD.GROUPS.some(g=>g.name===b.group2)?b.group2:"";
    b.group2=names[0];b.group3=names[1]||(sleeping?sleeping+" (sleeping)":"");if(!b.group3)delete b.group3;
    const sis=X[h].map(e=>{const g=G(e.g),m=g.members.filter(x=>x!==h);return m.length?`Sworn sisters in ${low(g.name)}: ${m.map(HN).join(", ")}`:""}).filter(Boolean);
    const base=String(b.friends||"").replace(/\.?\s*Sworn sisters in [^.]*/g,"").trim();
    b.friends=[base,...sis].filter(Boolean).join(". ")});

  if(typeof ENC==="undefined"||!ENC.pages)return;
  const E=ENC.E,lnk=(id,t)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},t);
  /* v2.43: the oath's kind as a gold swallowtail ribbon in the Encyclopedia's serif small caps (was a thin outline pill) */
  if(!document.getElementById("enc-banner-kind-css")){const st=document.createElement("style");st.id="enc-banner-kind-css";
    st.textContent='.enc-banner-kind{display:inline-flex;align-items:center;font-family:var(--e-serif,"Cormorant Garamond",Georgia,serif);font-variant:small-caps;font-weight:700;font-size:13px;letter-spacing:.07em;line-height:1;padding:2px 11px 2px 6px;margin-left:7px;vertical-align:1px;color:#21170a;background:linear-gradient(180deg,#f0d283,#c39433 60%,#a97b22);clip-path:polygon(0 0,100% 0,calc(100% - 5px) 50%,100% 100%,0 100%)}';
    document.head.append(st)}
  const badge=k=>E("span",{class:"enc-banner-kind"},KIND[k]);

  /* her House page: the record and a line before her people */
  const bh=ENC.buildHouse;
  if(bh)ENC.buildHouse=(el,h)=>{bh(el,h);const ex=X[h];if(!ex||!ex.length)return;
    const rec=el.querySelector(".enc-side .enc-card dl");
    if(rec)ex.forEach((e,i)=>rec.append(E("dt",null,i?"Third banner":"Second banner"),E("dd",null,lnk("group:"+e.g,G(e.g).name),e.kind!=="sworn"?badge(e.kind):null)));
    const mainCol=el.querySelector(".enc-cols>div");if(!mainCol)return;
    const people=[...mainCol.querySelectorAll("h3.enc-h")].find(x=>x.textContent==="Her people");
    const cap=s=>s.replace(/^./,c=>c.toUpperCase()),as=k=>k==="envoy"?"an envoy":k==="double"?"a double agent":"a "+k;
    const p=E("p",{class:"enc-p"},E("b",null,ex.length>1?"Her other banners. ":"Her second banner. "),HN(h)," flies ",lnk("group:"+home(h),low((G(home(h))||{}).name||"her own group")),/s$/.test((G(home(h))||{}).name||"")?"' banner first. ":"'s banner first. ",
      ex.map((e,i)=>[i?" ":"",i?"And ":"She also carries ",lnk("group:"+e.g,low(G(e.g).name)),/s$/.test(G(e.g).name)?"' banner":"'s banner",e.kind!=="sworn"?", as "+as(e.kind):"",". ",cap(e.oath),/[.!]$/.test(e.oath)?"":"."]));
    if(people)people.before(p);else mainCol.append(p)};

  /* each group's page: the girls who carry its banner beside their own */
  ACAD.GROUPS.forEach(g=>{const pg=ENC.pages["group:"+g.id];if(!pg||!pg.build||pg.build.g2)return;const b0=pg.build;
    pg.build=function(el){b0.apply(this,arguments);try{
      const who=ACAD.swornMembers(g.id);const side=el.querySelector(".enc-side");if(!side||!who.length)return;
      side.insertBefore(E("div",{class:"enc-card"},E("h4",null,`Also of ${low(g.name)} (${who.length})`),
        E("p",{class:"enc-note",style:{margin:"0 0 8px"}},"They fly their own group's banner first and carry this one beside it."),
        who.map(h=>{const e=X[h].find(x=>x.g===g.id),hg=G(home(h));
          return E("div",{class:"enc-person"},ENC.pixel?ENC.pixel(h,36):null,E("div",null,E("b",null,lnk("house:"+h,HN(h))),badge(e.kind),
            E("div",{class:"enc-note"},(hg?hg.name+". ":"")+e.oath.replace(/^./,c=>c.toUpperCase())+(/[.!]$/.test(e.oath)?"":"."))))})),side.children[1]||null)
    }catch(err){console.warn("groups2",err)}};pg.build.g2=true});

  /* the health check: banners that point nowhere */
  const hc=ACAD.healthCheck;
  if(hc)ACAD.healthCheck=function(){const r=hc.apply(this,arguments)||[];
    if(BAD.length)r.push({area:"Groups",what:"a second or third banner that is unknown, her own group, or one too many",items:BAD});
    return r};
})();
/*GROUPS2-END*/
