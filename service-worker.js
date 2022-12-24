/* Qwik Service Worker */
const appBundles=[["q-06325105.js",[5,26]],["q-07a42df6.js",[5,20,28],["41hsyxcGERg","IehKY5eqGSo","JNnGT0FBAmQ","NmGSWt6M6jk","RTWlIcW015U"]],["q-154dd302.js",[5,8,10,28,34],["GuT7H0HG0to"]],["q-1c44214a.js",[5]],["q-1d4e3858.js",[]],["q-1e781b9d.js",[]],["q-1ff6b450.js",[5,28],["ceU05TscGYE","N39ca0w8E8Y"]],["q-21174753.js",[5],["pZUBmK3Ozr8"]],["q-250c5fb4.js",[5]],["q-268844fe.js",[]],["q-2842924d.js",[5]],["q-2f5610cf.js",[5],["6EDsKFGsqZ8"]],["q-2fbb0844.js",[5,8,28,34,38],["0RuWJF374SY"]],["q-32d627f2.js",[5,8,28,34,38],["ik4qA5KbeeE"]],["q-33555d94.js",[5],["qnBHP00Mw4w"]],["q-3567ef75.js",[5,9,20,26,28]],["q-360445ed.js",[5,28],["WmYC5H00wtI"]],["q-3f1c3e62.js",[5,28,38],["YvhELL0L6xI"]],["q-3fc3dc53.js",[5,28],["00bFc4tHmxA"]],["q-5403f75f.js",[5,28],["AKetNByE5TM"]],["q-5528bfab.js",[5,28],["2Eo7WCpaqI8","TxCFOy819ag"]],["q-5dfdf056.js",[5],["X6QyrpPJpcI"]],["q-6188c0bf.js",[5,38],["bKmxcZr20V0","hi5SGUEzh2A","kDiyLIuBf9c","NIhXE0XBbCQ"]],["q-74aca409.js",[5,29,34],["tsVulGJuuSY"]],["q-778b7c5d.js",[5,26,28],["zrbrqoaqXSY"]],["q-8c61a492.js",[5,26]],["q-8e5b1889.js",[]],["q-8f621584.js",[5],["60VYiJsA0cM","DHydJt2wlsc"]],["q-993d6233.js",[5],["3sccYCDd1Z0","hO3b5j0m2ZI"]],["q-9d508553.js",[]],["q-a0a212bd.js",[3,5,10,28],["j0KBEXmGiVc","P4G0jGRoS18"]],["q-c1c93bf8.js",[5]],["q-cb82480a.js",[5]],["q-cdb1a6bb.js",[5],["JKHgMZ4xLZQ","VkLNXphUh5s"]],["q-cfebed37.js",[]],["q-de1a1a5e.js",[5],["tX1hFYkswtQ"]],["q-e2afca2c.js",[5]],["q-e2e42bd3.js",[5]],["q-e35f9512.js",[5]],["q-e5c33b15.js",[5,28],["8gdLBszqbaM","EpaZ5qQ4Lg4","kzjavhDI3L0","PrXIxv2vNXY","u0YVoxt2aTY","yiXwCC0m3jY"]],["q-f3cba914.js",[5,26]],["q-fe177cf1.js",[0,5,9,26]],["q-fec074e0.js",[3,5,28,29,34],["xYL1qOwPyDI"]]];
const libraryBundleIds=[36];
const linkBundles=[[/^\/$/,[31,33,40,42]],[/^\/blog\/page\/([^/]+?)\/?$/,[31,33,41,13]],[/^\/blog\/?$/,[31,33,0,12]],[/^\/projects\/?$/,[31,33,25,23]],[/^\/blog\/([^/]+?)\/?$/,[31,33,15,2]]];
const m="QwikBuild",k=new Set,g=new Map,u=[],E=(e,n)=>n.filter(s=>!e.some(i=>s.endsWith(i[0]))),q=(e,n)=>!!n&&!v(e)&&!v(n),v=e=>{const n=e.headers.get("Cache-Control")||"";return n.includes("no-cache")||n.includes("max-age=0")},C=(e,n)=>e.some(s=>n.endsWith("/"+s[0])),U=(e,n)=>e.find(s=>s[0]===n),b=(e,n)=>n.map(s=>e[s]?e[s][0]:null),W=(e,n)=>n.map(s=>e.get(s)).filter(s=>s!=null),p=e=>{const n=new Map;for(const s of e){const i=s[2];if(i)for(const c of i)n.set(c,s[0])}return n},A=(e,n,s,i)=>new Promise((c,h)=>{const t=i.url,r=s.get(t);if(r)r.push([c,h]);else{const o=l=>{const a=s.get(t);if(a){s.delete(t);for(const[d]of a)d(l.clone())}else c(l.clone())},f=l=>{const a=s.get(t);if(a){s.delete(t);for(const[d,L]of a)L(l)}else h(l)};s.set(t,[[c,h]]),e.match(t).then(l=>{if(q(i,l))o(l);else return n(i).then(async a=>{a.ok&&await e.put(t,a.clone()),o(a)})}).catch(l=>e.match(t).then(a=>{a?o(a):f(l)}))}}),y=(e,n,s,i,c,h=!1)=>{const t=()=>{for(;u.length>0&&g.size<6;){const o=u.shift(),f=new Request(o);k.has(o)?t():(k.add(o),A(n,s,g,f).finally(t))}},r=o=>{try{const f=U(e,o);if(f){const l=b(e,f[1]),a=new URL(o,i).href,d=u.indexOf(a);d>-1?h&&(u.splice(d,1),u.unshift(a)):h?u.unshift(a):u.push(a),l.forEach(r)}}catch(f){console.error(f)}};Array.isArray(c)&&c.forEach(r),t()},w=(e,n,s,i,c,h,t)=>{try{y(e,i,c,h,b(e,n))}catch(r){console.error(r)}for(const r of t)try{for(const o of s){const[f,l]=o;if(f.test(r)){y(e,i,c,h,b(e,l));break}}}catch(o){console.error(o)}},B=(e,n,s,i)=>{try{const c=i.href.split("/"),h=c[c.length-1];c[c.length-1]="";const t=new URL(c.join("/"));y(e,n,s,t,[h],!0)}catch(c){console.error(c)}},N=(e,n,s,i)=>{const c=e.fetch.bind(e),h=p(n);e.addEventListener("fetch",t=>{const r=t.request;if(r.method==="GET"){const o=new URL(r.url);C(n,o.pathname)&&t.respondWith(e.caches.open(m).then(f=>(B(n,f,c,o),A(f,c,g,r))))}}),e.addEventListener("message",async({data:t})=>{if(t.type==="qprefetch"&&typeof t.base=="string"){const r=await e.caches.open(m),o=new URL(t.base,e.origin);Array.isArray(t.links)&&w(n,s,i,r,c,o,t.links),Array.isArray(t.bundles)&&y(n,r,c,o,t.bundles),Array.isArray(t.symbols)&&y(n,r,c,o,W(h,t.symbols))}}),e.addEventListener("activate",async()=>{try{const t=await e.caches.open(m),o=(await t.keys()).map(l=>l.url),f=E(n,o);await Promise.all(f.map(l=>t.delete(l)))}catch(t){console.error(t)}})},x=()=>{typeof self<"u"&&typeof appBundles<"u"&&N(self,appBundles,libraryBundleIds,linkBundles)};x();addEventListener("install",()=>self.skipWaiting());addEventListener("activate",()=>self.clients.claim());
