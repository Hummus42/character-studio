/* Everspire service worker: keeps the art on the device. Pages and this file always come from the network when it is
   there (so a push shows up on the next load); everything under assets/ comes from the device first and is refreshed
   quietly in the background. */
const ART="everspire-art-v1",SHELL="everspire-shell-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{
  for(const k of await caches.keys())if(k!==ART&&k!==SHELL)await caches.delete(k);
  await self.clients.claim()})())});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  const base=new URL("./",location.href).pathname,rel=u.pathname.slice(base.length);
  if(rel.startsWith("assets/")){
    e.respondWith((async()=>{const c=await caches.open(ART),hit=await c.match(r);
      const net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res}).catch(()=>null);
      return hit||(await net)||Response.error()})());return}
  if(r.mode==="navigate"||rel===""||rel==="index.html"||rel==="sw.js"){
    e.respondWith((async()=>{const c=await caches.open(SHELL);
      try{const res=await fetch(r);if(res.ok&&r.mode==="navigate")c.put("shell",res.clone());return res}
      catch(err){return (await c.match("shell"))||Response.error()}})())}
});
