// Makes sure every js/head-cap*.js has a script tag in index.html, placed before head-signature.js. Run, then node tools/stamp.js.
const fs=require("fs");let h=fs.readFileSync(__dirname+"/../index.html","utf8");
const files=fs.readdirSync(__dirname+"/../js").filter(f=>/^head-cap\d+\.js$/.test(f)).sort((a,b)=>parseInt(a.slice(8))-parseInt(b.slice(8)));
let add="";files.forEach(f=>{if(!h.includes('js/'+f))add+='<script src="js/'+f+'"></script>\n'});
if(add){h=h.replace(/<script src="js\/head-signature\.js/,add+'<script src="js/head-signature.js');fs.writeFileSync(__dirname+"/../index.html",h)}
console.log("capstone files:",files.join(", "),add?"(tags added)":"(tags present)");
