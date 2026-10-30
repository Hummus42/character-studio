/* ---- v260: the headmistresses and the boys of the Houses as people in their own right.
   Every headmistress has a name, a biography and a page. Each was once her House's Keeper: the forty-four Houses that
   never slept chose her decades ago, and she came home when the House rang for her; in the fifty-six Houses that woke in
   the Great Waking she was the last Keeper before it fell asleep, and walked back out of it, unaged, the morning it woke.
   (The Synth's headmistresses are their units' elder frames; the Void's are their Daughters grown up on the Stair.)
   Every boy has a title in his House, a role of his own, a summary that is about him, and a rival of his own.
   Runs after the groups have written the rest of their biographies and before the data file reads the people. ---- */
(function(){
  if(typeof ACAD==="undefined"||typeof tplById!=="function"||typeof PEOPLE260!=="object")return;
  const P=PEOPLE260,HN=h=>(ACAD.HNAME&&ACAD.HNAME[h])||(ACAD.cap?ACAD.cap(h):h);
  const and=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];
  const low=n=>String(n||"").replace(/^The /,"the ");
  ACAD.NEVERSLEPT=new Set(P.old);
  ACAD.WOKE={};
  /* ---------- the headmistresses ---------- */
  Object.entries(P.heads).forEach(([h,bio])=>{const t=tplById(h+"head");if(!t)return;
    const look=String(t.blurb||"").replace(/^[^:]{0,140}:\s*/,"");
    const old=t.bio||{};
    t.bio=Object.assign({},old,bio,{notes:[bio.notes,old.notes].filter(Boolean).join(" "),
      occupation:`Headmistress of ${HN(h)} House since ${String(bio.headSince).replace(/,.*$/,"")}; teaches ${bio.teaches}`});
    t.name=`${bio.fullName}, Headmistress of ${HN(h)} House`;
    t.blurb=`${bio.fullName}, Headmistress of ${HN(h)} House: ${look.charAt(0).toLowerCase()+look.slice(1)}`;
    if(bio.woke)ACAD.WOKE[h]=bio.woke});
  /* each headmistress's colleagues: the other headmistresses of her group, by name */
  (ACAD.GROUPS||[]).forEach(g=>{const hs=g.members.filter(h=>{const t=tplById(h+"head");return t&&t.bio&&t.bio.fullName&&P.heads[h]});
    hs.forEach(h=>{const t=tplById(h+"head"),o=hs.filter(x=>x!==h).map(x=>`${tplById(x+"head").bio.fullName} (${HN(x)} House)`);if(o.length)t.bio.friends=`The other headmistresses of ${low(g.name)}: ${and(o)}`})});
  /* the faculty council scenes name them too */
  (ACAD.GROUPS||[]).forEach(g=>{const sc=tplById("faccouncil"+g.id);if(!sc||!sc.blurb)return;
    g.members.forEach(h=>{const t=tplById(h+"head");if(t&&t.bio&&t.bio.fullName&&P.heads[h])sc.blurb=sc.blurb.split(`the ${HN(h)} headmistress`).join(`${t.bio.fullName} of ${HN(h)} House`)})});
  /* the principals name their headmistresses */
  (ACAD.GROUPS||[]).forEach(g=>{const p=tplById("principal"+g.id);if(!p||!p.bio)return;
    const hs=g.members.map(h=>{const t=tplById(h+"head");return t&&t.bio&&t.bio.fullName?`${t.bio.fullName} of ${HN(h)} House`:null}).filter(Boolean);
    if(hs.length)p.bio.friends=`His headmistresses: ${and(hs)}`});
  /* ---------- the boys ---------- */
  const boy=h=>{const t=tplById(h+"man");return t&&t.bio&&t.bio.fullName?t:null};
  const nameOf=h=>{const t=boy(h);return t?t.bio.fullName:""};
  const YEAR=/^(\w+) year/i;
  Object.entries(P.boys).forEach(([h,b])=>{const t=boy(h);if(!t)return;const bio=t.bio;
    bio.title=b.title;bio.groupRole=`${b.title}. ${b.role}`;bio.summary=b.summary;if(b.bio)Object.assign(bio,b.bio);
    t.name=bio.fullName;
    t.blurb=String(t.blurb||"").replace(new RegExp("^"+bio.fullName.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+", [^,]+?'s boyfriend and an? "),bio.fullName+", a ").replace(/, [^,]+'s boyfriend and a /,", a ")});
  /* rivals of his own: the one he names, and anyone who names him */
  Object.keys(P.boys).forEach(h=>{const t=boy(h);if(!t)return;const own=P.boys[h].rival,out=[];
    if(own&&boy(own[0]))out.push(`${nameOf(own[0])} of ${HN(own[0])} House: ${own[1]}.`);
    Object.entries(P.boys).forEach(([x,b])=>{if(x!==h&&b.rival&&b.rival[0]===h&&(!own||own[0]!==x)&&boy(x))out.push(`${nameOf(x)} of ${HN(x)} House: ${b.rival[1]}.`)});
    t.bio.rivals=out.join(" ");
    /* the other boys of his group, by name; his best friend by his own name and House */
    const g=ACAD.GROUP_OF&&ACAD.GROUP_OF(h);
    if(g){const o=g.members.filter(x=>x!==h&&boy(x)).map(x=>`${nameOf(x)} (${HN(x)} House)`);t.bio.friends=o.length?`The other boys of ${low(g.name)}: ${and(o)}`:""}
    });
  /* "Kirin's boyfriend" anywhere in a boy's biography becomes the boy himself: "Rafe Okoro of Kirin House" ("Noah Kealoha's grin") */
  {const byName={};Object.keys(P.boys).forEach(h=>{if(boy(h))byName[HN(h)]=h});
   const esc=x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),keys=Object.keys(byName).sort((a,b)=>b.length-a.length);
   if(keys.length){const rx=new RegExp("(?<![A-Za-z])(?:([A-Z][^,;:.]{1,40}?), )?("+keys.map(esc).join("|")+")'s boyfriend('s)?","g");
     const fix=v=>typeof v==="string"?v.replace(rx,(m,who,hn,poss)=>{const x=byName[hn],n=nameOf(x);if(!n)return m;const pre=who&&who!==n?who+", ":"";return pre+(poss?n+"'s":`${n} of ${hn} House`)}):v;
     Object.keys(P.boys).forEach(h=>{const t=boy(h);if(t)Object.keys(t.bio).forEach(k=>{t.bio[k]=fix(t.bio[k])})})}}
})();
