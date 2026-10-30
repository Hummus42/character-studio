// Re-stamps every <script src="js/...?v=..."> in index.html with a hash of that file's content, so browsers and the service worker
// fetch a js file again exactly when it changes. Run it after editing anything in js/:   node tools/stamp.js
const fs=require("fs"),path=require("path"),crypto=require("crypto");
const root=path.join(__dirname,".."),F=path.join(root,"index.html");let s=fs.readFileSync(F,"utf8"),n=0,missing=[];
s=s.replace(/<script src="(js\/[^"?]+)(?:\?v=[0-9a-f]+)?"/g,(m,f)=>{const p=path.join(root,f);if(!fs.existsSync(p)){missing.push(f);return m}
  const h=crypto.createHash("sha1").update(fs.readFileSync(p)).digest("hex").slice(0,8);n++;return `<script src="${f}?v=${h}"`});
fs.writeFileSync(F,s);console.log("stamped",n,"scripts"+(missing.length?"; MISSING "+missing.join(", "):""));
