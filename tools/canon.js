// Load and save the canon layer (js/canon.js) from node:   const C=require("./canon.js"); const st=C.load(); /* edit st.canon */ C.save(st,st.canon);
const fs=require("fs"),path=require("path");const F=path.join(__dirname,"..","js","canon.js");
exports.load=()=>{const s=fs.readFileSync(F,"utf8");const a=s.indexOf("const EVERSPIRE_CANON=");const b=s.indexOf("\n",a);const line=s.slice(a,b<0?s.length:b);const m=line.match(/^const EVERSPIRE_CANON=([\s\S]*?);?$/);const js=m[1].replace(/;$/,"");
  return {s,a,b:b<0?s.length:b,tail:line.slice(line.lastIndexOf("}")+1),canon:JSON.parse(js.slice(0,js.lastIndexOf("}")+1))}};
exports.save=(st,canon)=>{const out=st.s.slice(0,st.a)+"const EVERSPIRE_CANON="+JSON.stringify(canon).replace(/</g,"\u003c")+st.tail+st.s.slice(st.b);fs.writeFileSync(F,out);return out.length};
