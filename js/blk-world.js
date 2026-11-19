/* ---- v328: the world registry. Factions hold any number of groups, groups any number of Houses, and a House may hold
   several girls. A girl's key stays her identity everywhere (her templates, portraits, biography and relationships are
   keyed by it); her House is a record she points to. Every girl the Academy had before is the first girl of a House with
   her own key as its id. A girl who joins a living House carries add.girls[key].place={kind:"house",house:<id>}; a
   brand-new House is add.houses[id], and its first girl takes the House's id as her key.
   Girls who share a House share its crest, Roll entry, rooms, lore and headmistress (the House's Keeper); each keeps her
   own biography, looks, wardrobe, relationships and boyfriend. Loads after every file that builds girls and templates. ---- */
(function(){
  if(typeof ACAD==="undefined")return;
  /* the layer is read once (merging drafts over the base is costly; drafts change by reloading or ACAD.WORLD.refresh) */
  let LY=null;const layer=()=>LY||(LY=(ACAD.canon&&ACAD.canon.layer?ACAD.canon.layer():{})||{});
  const ADD=()=>((layer().add||{}).girls)||{};
  const ADDH=()=>((layer().add||{}).houses)||{};
  const T=id=>typeof tplById==="function"?tplById(id):null;
  const HN=h=>(typeof ENC!=="undefined"&&ENC.HN?ENC.HN(h):(ACAD.HNAME&&ACAD.HNAME[h])||h);

  /* ---------- who lives where ---------- */
  ACAD.GIRLS=ACAD.HOUSES;
  ACAD.houseOf=g=>{const a=ADD()[g],p=a&&a.place;return p&&p.kind==="house"&&p.house?p.house:g};
  ACAD.isFirstGirl=g=>ACAD.houseOf(g)===g;
  ACAD.girlsOf=house=>{const all=(ACAD.HOUSES||[]).filter(g=>ACAD.houseOf(g)===house);return all.sort((a,b)=>(a===house?-1:b===house?1:0))};
  ACAD.housemates=g=>ACAD.girlsOf(ACAD.houseOf(g)).filter(x=>x!==g);
  ACAD.primaryOf=house=>(ACAD.HOUSES||[]).includes(house)?house:(ACAD.girlsOf(house)[0]||"");
  ACAD.housesOf=gid=>{const g=(ACAD.GROUPS||[]).find(x=>x.id===gid);if(!g)return [];const seen=[];g.members.forEach(m=>{const h=ACAD.houseOf(m);if(!seen.includes(h))seen.push(h)});return seen};

  /* ---------- the House record ---------- */
  const rollEntry=house=>{const a=ADD()[house],id=a&&a.place&&a.place.kind==="wake"&&a.place.house||house;
    for(const g of (typeof ENC!=="undefined"&&ENC.ROLL)||[]){const r=(g.houses||[]).find(x=>x.id===id);if(r)return r}return null};
  ACAD.houseRec=house=>{const first=ACAD.primaryOf(house),a=ADD()[first]||{},nh=ADDH()[house]||{},r=rollEntry(house)||{};
    const g=ACAD.GROUP_OF?ACAD.GROUP_OF(first):null;
    return {id:house,name:nh.name||HN(first)||house,group:nh.group||(g&&g.id)||"",since:nh.since||r.since||"",lore:nh.lore||r.lore||"",
      det:Object.assign({},a.det||{},nh.det||{}),cols:nh.cols||null,emblem:nh.emblem||null,keeper:T(first+"head")?first+"head":"",
      girls:ACAD.girlsOf(house),added:!!ADDH()[house]}};

  /* ---------- the shared headmistress: a girl who joins a living House sees its Keeper as hers ---------- */
  function aliasHeads(){if(typeof TEMPLATES==="undefined")return;
    Object.entries(ADD()).forEach(([g,a])=>{const p=a.place;if(!p||p.kind!=="house"||!p.house||p.house===g)return;
      const keep=T(ACAD.primaryOf(p.house)+"head");if(!keep)return;const mine=T(g+"head");
      if(mine){if(mine.alias)return;/* a girl cut from a model got a headmistress of her own: she becomes the Keeper, in place, so
        every lookup that already holds this template sees the change */
        Object.keys(mine).forEach(k=>{delete mine[k]});Object.assign(mine,JSON.parse(JSON.stringify(keep)),{id:g+"head",alias:true,aliasOf:keep.id});
        ((typeof PRESET_GROUPS!=="undefined"&&PRESET_GROUPS.start)||[]).forEach(G=>{const i=G.keys.indexOf(g+"head");if(i>=0)G.keys.splice(i,1)});return}
      TEMPLATES.push(Object.assign({},keep,{id:g+"head",alias:true,aliasOf:keep.id}))})}
  aliasHeads();
  ACAD.isAlias=id=>{const t=T(id);return !!(t&&t.alias)};

  /* ---------- keys: a new girl's or House's key must never be mistaken for another's ---------- */
  ACAD.keyOk=k=>{k=String(k||"");if(!/^[a-z][a-z0-9]{2,23}$/.test(k))return "Use 3 to 24 lowercase letters or digits, starting with a letter.";
    const girls=(ACAD.HOUSES||[]);if(girls.includes(k)||ADDH()[k])return "That name is already taken.";
    if(girls.some(x=>k.startsWith(x)||x.startsWith(k)))return "Too close to another girl's key; the app tells girls apart by the start of their keys.";
    if(typeof TEMPLATES!=="undefined"&&TEMPLATES.some(t=>typeof t.id==="string"&&(t.id===k||t.id.startsWith(k)||t.id.endsWith(k))))return "Too close to an existing look's name.";
    return ""};
  ACAD.keyFrom=name=>{let b=String(name||"").toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g,"").replace(/^[0-9]+/,"").slice(0,20)||"girl";
    if(!ACAD.keyOk(b))return b;for(let i=2;i<99;i++){const k=b+"x"+i;if(!ACAD.keyOk(k))return k}return ""};

  ACAD.WORLD={v:328,refresh:()=>{LY=null}};
})();
/* v328: her page names the girls who share her House, and its Keeper */
(function(){
  if(typeof ENC==="undefined"||!ENC.buildHouse||!ENC.E||!ACAD.housemates)return;
  const E=ENC.E,HN=h=>(ENC.HN?ENC.HN(h):h),lnk=(id,t)=>E("a",{href:"#",onclick:ev=>{ev.preventDefault();ENC.go(id)}},t);
  const bh=ENC.buildHouse;
  ENC.buildHouse=function(el,h){bh.apply(this,arguments);try{const mates=ACAD.housemates(h);if(!mates.length)return;const side=el.querySelector(".enc-side");if(!side)return;
    const house=ACAD.houseOf(h),rec=ACAD.houseRec(house),first=ACAD.primaryOf(house);
    side.append(E("div",{class:"enc-card"},E("h4",null,rec.name+" House"),
      E("p",{class:"enc-note",style:{marginTop:0}},h===first?"She is its Keeper. Others share her House:":"She shares it with:"),
      E("ul",{class:"enc-list"},mates.map(x=>E("li",null,ENC.pixel?ENC.pixel(x,20):null," ",lnk("house:"+x,HN(x)),x===first?" (its Keeper)":"")))))}catch(e){console.warn("[world]",e)}};
})();
