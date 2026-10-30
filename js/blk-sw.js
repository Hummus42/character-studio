/*FAMSYNC-END*/
/*SW-BEGIN*/
/* v312: the art lives in assets/, and a service worker keeps what has been seen on the device. Off on localhost so a local test never serves stale art; add ?sw=1 to try it there. */
(function(){try{if(!("serviceWorker" in navigator)||!/^https?:$/.test(location.protocol))return;
  const local=/^(localhost|127.0.0.1|[::1])$/.test(location.hostname);if(local&&!/[?&]sw=1/.test(location.search))return;
  const go=()=>navigator.serviceWorker.register("sw.js").catch(()=>{});
  if(document.readyState==="complete")setTimeout(go,3000);else window.addEventListener("load",()=>setTimeout(go,3000))}catch(e){}})();
