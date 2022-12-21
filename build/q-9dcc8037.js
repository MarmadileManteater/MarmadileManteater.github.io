import{h as c,m,R as a,_ as n,j as _,e as b,z as x,a as r,Q as f,d as u,S as p,X as g,y}from"./q-f7fb95b3.js";import{y as A}from"./q-f7fb95b3.js";import{a as E}from"./q-658585bb.js";import"./q-fc1cb1e7.js";const w=t=>{const[e]=c();e.video=t},I=()=>{const[t,e]=c(),o=()=>{const v=()=>{e.video.currentTime>3&&(e.video.setAttribute("data-active","true"),e.video.removeEventListener("timeupdate",v))},l=async()=>{console.warn(`Issue loading from instance '${e.server}'; attempting another . . . `);try{let s=e.server;for(;s===e.server;)s=t[Math.floor(t.length*Math.random())];e.server=s,E&&new MutationObserver((P,h)=>{e.video.play(),h.disconnect()}).observe(e.video,{attributes:!0,characterData:!1,characterDataOldValue:!1,childList:!1})}catch(s){console.error(s)}};e.video.addEventListener("error",l),e.video.addEventListener("timeupdate",v),setTimeout(()=>{e.video.currentTime==0&&l()},6e3),i(),e.video.play()},i=()=>{window.removeEventListener("click",o),window.removeEventListener("keypress",o)};window.addEventListener("click",o),window.addEventListener("keypress",o)},k=({track:t})=>{const[e]=c();t(()=>e.videoId),t(()=>e.server),t(()=>e.itag),e.videoUrl=`${e.server}/latest_version?id=${e.videoId}&itag=${e.itag}&local=true`,e.invidiousUrl=`${e.server}/watch?v=${e.videoId}`},L=`a,video{position:fixed;opacity:0;transition:opacity 1s ease}video[data-active=true]+a{opacity:1;bottom:0px;right:0px;border-radius:5px 0 0;border-top:1px solid black;border-left:1px solid black}video[data-active=true]+a span.link{display:none}@media (max-width: 1530px){video[data-active=true]+a{top:0px;left:0px;right:auto;bottom:auto;border-radius:0 0 5px;position:absolute;border-top:0;border-left:0;border-right:1px solid black;border-bottom:1px solid black}}@media (max-width: 1368px){video[data-active=true]+a{top:0px;left:0px;right:auto;bottom:auto;border-radius:0 0 5px;padding:3px;font-size:0}video[data-active=true]+a .icon{font-size:initial}video[data-active=true]+a span.link{display:inline}}video{z-index:-1;top:0;left:50%;margin-left:-50%;min-width:100%;height:100vh;max-width:initial}video[data-active=true]{opacity:1}@media (max-width: 768px){video{width:100%;height:auto}}
`,T=L,U=({videoId:t,server:e="https://invidious.namazso.eu",itag:o="22"})=>{m(a(()=>n(()=>Promise.resolve().then(()=>d),void 0),"s_JNnGT0FBAmQ"));const i=_({videoId:t,server:e,itag:o,videoUrl:"",invidiousUrl:"",video:{}});return b(a(()=>n(()=>Promise.resolve().then(()=>d),void 0),"s_NmGSWt6M6jk",[i])),x(a(()=>n(()=>Promise.resolve().then(()=>d),void 0),"s_IehKY5eqGSo",[["https://invidious.sethforprivacy.com","https://invidious.namazso.eu","https://yt.artemislena.eu"],i]),{eagerness:"visible"}),r(g,{children:[r("video",{ref:a(()=>n(()=>Promise.resolve().then(()=>d),void 0),"s_41hsyxcGERg",[i]),loop:!0,muted:!0,get src(){return i.videoUrl},children:r(f,{},"EE_0"),[u]:{src:p(i,"videoUrl")}}),r("a",{target:"_blank",get href(){return i.invidiousUrl},class:"hover:underline text-blue text-blue-600 dark:text-red-300 dark:bg-zinc-900 bg-white p-3",children:["Watch this video on ",r("span",{class:"icon link",children:"\u{1F517}"}),r("span",{class:"icon",children:"\u{1F4FA}"}),"Invidious"],[u]:{href:p(i,"invidiousUrl")}})]},"EE_1")},d=Object.freeze(Object.defineProperty({__proto__:null,s_41hsyxcGERg:w,s_IehKY5eqGSo:I,s_NmGSWt6M6jk:k,s_JNnGT0FBAmQ:T,s_RTWlIcW015U:U,_hW:y},Symbol.toStringTag,{value:"Module"}));export{A as _hW,w as s_41hsyxcGERg,I as s_IehKY5eqGSo,T as s_JNnGT0FBAmQ,k as s_NmGSWt6M6jk,U as s_RTWlIcW015U};
