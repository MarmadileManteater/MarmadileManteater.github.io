import{k as d,e as j,g as P,q as c,_ as i,j as s,l as _,i as g}from"./q-35eca250.js";import{i as R}from"./q-35eca250.js";import{P as v,a as E}from"./q-c4ad94c8.js";const x=({track:t})=>{const[o,e]=d();switch(t(()=>e.sortType),e.sortType){case"featured":e.projectsSorted=o.map(r=>r);break;case"lastUpdate":e.projectsSorted=o.map(r=>r).sort((r,a)=>new Date(a.lastUpdate).getTime()-new Date(r.lastUpdate).getTime());break}},D=()=>{const[t]=d();t.sortType="featured"},L=({projects:t,tagData:o})=>{const e=j({projectsSorted:t,sortType:"featured"});return P(c(()=>i(()=>Promise.resolve().then(()=>l),void 0),"s_XwQ0TlQEkR4",[t,e])),s("div",{class:"project-list",children:[s("a",{class:`${e.sortType==="featured"?"decoration-solid underline cursor-default":"cursor-pointer"} select-none p-4 inline-block`,onClick$:c(()=>i(()=>Promise.resolve().then(()=>l),void 0),"s_bKmxcZr20V0",[e]),children:"Sort by featured"}),s("a",{class:`${e.sortType==="lastUpdate"?"decoration-solid underline cursor-default":"cursor-pointer"} select-none p-4 inline-block`,onClick$:c(()=>i(()=>Promise.resolve().then(()=>l),void 0),"s_kDiyLIuBf9c",[e]),children:"Sort by last updated"}),e.projectsSorted.map((r,a)=>{var u;const{title:m,buttons:p,summary:h,thumbnail:f,tags:T}=r,b=(u=p.at(-1))==null?void 0:u.link;return s(v,{title:m,titleLink:b,buttons:p,summary:h,thumbnail:f,tags:T,tagData:o,index:a,children:r.buttons.map((n,k)=>{const{link:y,target:S}=n;return s(E,{link:y,target:S,index:k,children:[_(n,"prefix")," ",s("strong",{children:_(n,"locationName")})]})})})})]})},w=()=>{const[t]=d();t.sortType="lastUpdate"},l=Object.freeze(Object.defineProperty({__proto__:null,s_XwQ0TlQEkR4:x,s_bKmxcZr20V0:D,s_hi5SGUEzh2A:L,s_kDiyLIuBf9c:w,_hW:g},Symbol.toStringTag,{value:"Module"}));export{R as _hW,x as s_XwQ0TlQEkR4,D as s_bKmxcZr20V0,L as s_hi5SGUEzh2A,w as s_kDiyLIuBf9c};
