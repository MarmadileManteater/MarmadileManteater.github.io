import{A as i,d as p,t as u,T as a,_ as n,b as o,E as d,z as l,H as f}from"./q-1356a02e.js";import{H as S}from"./q-1356a02e.js";import{U as m}from"./q-5b10d14d.js";const b=({track:t})=>{const[e,s]=i();switch(t(()=>s.sortType),s.sortType){case"featured":s.projectsSorted=e.projects.map(r=>r);break;case"lastUpdate":s.projectsSorted=e.projects.map(r=>r).sort((r,_)=>new Date(_.lastUpdate).getTime()-new Date(r.lastUpdate).getTime());break}},y=()=>{const[t]=i();t.sortType="featured"},T=t=>{const e=p({projectsSorted:t.projects,sortType:"featured"});return u(a(()=>n(()=>Promise.resolve().then(()=>c),void 0),"s_NIhXE0XBbCQ",[t,e])),o("div",{class:"project-list",children:[o("a",{class:`${e.sortType==="featured"?"decoration-solid underline cursor-default":"cursor-pointer"} select-none p-4 inline-block`,onClick$:a(()=>n(()=>Promise.resolve().then(()=>c),void 0),"s_bKmxcZr20V0",[e]),children:"Sort by featured"}),o("a",{class:`${e.sortType==="lastUpdate"?"decoration-solid underline cursor-default":"cursor-pointer"} select-none p-4 inline-block`,onClick$:a(()=>n(()=>Promise.resolve().then(()=>c),void 0),"s_kDiyLIuBf9c",[e]),children:"Sort by last updated"}),o(m,{get content(){return e.projectsSorted},get tagData(){return t.tagData},startIndex:0,[d]:{content:l(e,"projectsSorted"),tagData:l(t,"tagData"),startIndex:d}},"G0_0")]})},h=()=>{const[t]=i();t.sortType="lastUpdate"},c=Object.freeze(Object.defineProperty({__proto__:null,s_NIhXE0XBbCQ:b,s_bKmxcZr20V0:y,s_hi5SGUEzh2A:T,s_kDiyLIuBf9c:h,_hW:f},Symbol.toStringTag,{value:"Module"}));export{S as _hW,b as s_NIhXE0XBbCQ,y as s_bKmxcZr20V0,T as s_hi5SGUEzh2A,h as s_kDiyLIuBf9c};
