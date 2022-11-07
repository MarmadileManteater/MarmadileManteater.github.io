/* Qwik Service Worker */
const appBundles=[["q-1450e503.js",[5,12],["hA9UPaY8sNQ","mYsiJcA4IBc","skxgNVWVOT8","uVE5iM9H73c"]],["q-1d4e3858.js",[]],["q-31f1a3d3.js",[5]],["q-4870abf9.js",[5,12],["AaAlzKH0KlQ","z1nvHyEppoI"]],["q-489e7663.js",[5,9],["xYL1qOwPyDI"]],["q-5a792cad.js",[]],["q-6ba2b606.js",[5,13]],["q-7d7488ff.js",[5],["2fVlYUys5KM","J4LUT5FW4CE"]],["q-7e608f19.js",[5],["X6QyrpPJpcI"]],["q-807dcf5d.js",[]],["q-898a307d.js",[5]],["q-8ba38e13.js",[5,10],["wZdDrDfxdYQ"]],["q-8dfc0b65.js",[5],["3sccYCDd1Z0","hO3b5j0m2ZI"]],["q-8e5b1889.js",[]],["q-9e389a82.js",[5]],["q-acf04f98.js",[5],["ceU05TscGYE","N39ca0w8E8Y"]],["q-afd0a3f2.js",[5]],["q-b23f361b.js",[5,9],["tsVulGJuuSY"]],["q-c7f14ec1.js",[5],["VkLNXphUh5s"]],["q-ce7da6ef.js",[5,12,13],["zrbrqoaqXSY"]],["q-e482f2e5.js",[5,13]],["q-f4e596c7.js",[5,10],["bKmxcZr20V0","hi5SGUEzh2A","kDiyLIuBf9c","XwQ0TlQEkR4"]],["q-f6c66e92.js",[5,12],["nd8yk3KO22c"]],["q-feb0c0ba.js",[5]]];
const libraryBundleIds=[14];
const linkBundles=[[/^\/$/,[23,18,20,4]],[/^\/projects\/?$/,[23,18,6,17]]];
const m="QwikBuild",k=new Set,g=new Map,u=[],E=(e,n)=>n.filter(s=>!e.some(i=>s.endsWith(i[0]))),q=(e,n)=>!!n&&!v(e)&&!v(n),v=e=>{const n=e.headers.get("Cache-Control")||"";return n.includes("no-cache")||n.includes("max-age=0")},C=(e,n)=>e.some(s=>n.endsWith("/"+s[0])),U=(e,n)=>e.find(s=>s[0]===n),b=(e,n)=>n.map(s=>e[s]?e[s][0]:null),W=(e,n)=>n.map(s=>e.get(s)).filter(s=>s!=null),p=e=>{const n=new Map;for(const s of e){const i=s[2];if(i)for(const c of i)n.set(c,s[0])}return n},A=(e,n,s,i)=>new Promise((c,h)=>{const t=i.url,r=s.get(t);if(r)r.push([c,h]);else{const o=l=>{const a=s.get(t);if(a){s.delete(t);for(const[d]of a)d(l.clone())}else c(l.clone())},f=l=>{const a=s.get(t);if(a){s.delete(t);for(const[d,L]of a)L(l)}else h(l)};s.set(t,[[c,h]]),e.match(t).then(l=>{if(q(i,l))o(l);else return n(i).then(async a=>{a.ok&&await e.put(t,a.clone()),o(a)})}).catch(l=>e.match(t).then(a=>{a?o(a):f(l)}))}}),y=(e,n,s,i,c,h=!1)=>{const t=()=>{for(;u.length>0&&g.size<6;){const o=u.shift(),f=new Request(o);k.has(o)?t():(k.add(o),A(n,s,g,f).finally(t))}},r=o=>{try{const f=U(e,o);if(f){const l=b(e,f[1]),a=new URL(o,i).href,d=u.indexOf(a);d>-1?h&&(u.splice(d,1),u.unshift(a)):h?u.unshift(a):u.push(a),l.forEach(r)}}catch(f){console.error(f)}};Array.isArray(c)&&c.forEach(r),t()},w=(e,n,s,i,c,h,t)=>{try{y(e,i,c,h,b(e,n))}catch(r){console.error(r)}for(const r of t)try{for(const o of s){const[f,l]=o;if(f.test(r)){y(e,i,c,h,b(e,l));break}}}catch(o){console.error(o)}},B=(e,n,s,i)=>{try{const c=i.href.split("/"),h=c[c.length-1];c[c.length-1]="";const t=new URL(c.join("/"));y(e,n,s,t,[h],!0)}catch(c){console.error(c)}},N=(e,n,s,i)=>{const c=e.fetch.bind(e),h=p(n);e.addEventListener("fetch",t=>{const r=t.request;if(r.method==="GET"){const o=new URL(r.url);C(n,o.pathname)&&t.respondWith(e.caches.open(m).then(f=>(B(n,f,c,o),A(f,c,g,r))))}}),e.addEventListener("message",async({data:t})=>{if(t.type==="qprefetch"&&typeof t.base=="string"){const r=await e.caches.open(m),o=new URL(t.base,e.origin);Array.isArray(t.links)&&w(n,s,i,r,c,o,t.links),Array.isArray(t.bundles)&&y(n,r,c,o,t.bundles),Array.isArray(t.symbols)&&y(n,r,c,o,W(h,t.symbols))}}),e.addEventListener("activate",async()=>{try{const t=await e.caches.open(m),o=(await t.keys()).map(l=>l.url),f=E(n,o);await Promise.all(f.map(l=>t.delete(l)))}catch(t){console.error(t)}})},x=()=>{typeof self<"u"&&typeof appBundles<"u"&&N(self,appBundles,libraryBundleIds,linkBundles)};x();addEventListener("install",()=>self.skipWaiting());addEventListener("activate",()=>self.clients.claim());
