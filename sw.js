/* Everspire service worker: keeps the app and its art on the device so a repeat visit opens at once and works offline.
   The page and this file always come from the network when it is there (so a push shows on the next load); each js file is
   named by its content (?v=...), so it is kept on the device and fetched only when it changes; everything under assets/ is
   kept too and refreshed quietly in the background. */
const ART="everspire-art-v1",SHELL="everspire-shell-v1",CODE="everspire-code-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==ART&&k!==SHELL&&k!==CODE)await caches.delete(k);
  await self.clients.claim()})())});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const base=new URL("./",location.href).pathname,rel=u.pathname.slice(base.length);
  if(rel.startsWith("assets/")){
    e.respondWith((async()=>{const c=await caches.open(ART),hit=await c.match(r);
      const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);
      return hit||(await net)||Response.error()})());return}
  if(rel.startsWith("js/")){
    e.respondWith((async()=>{const c=await caches.open(CODE),hit=await c.match(r);if(hit)return hit;
      const res=await fetch(r);if(res.ok){for(const k of await c.keys())if(new URL(k.url).pathname===u.pathname)await c.delete(k);await c.put(r,res.clone())}return res})());return}
  if(r.mode==="navigate"||rel===""||rel==="index.html"||rel==="sw.js"){
    e.respondWith((async()=>{const c=await caches.open(SHELL);
      try{const res=await fetch(r);if(res.ok&&r.mode==="navigate")c.put("shell",res.clone());return res}
      catch(err){return (await c.match("shell"))||Response.error()}})())}
});
