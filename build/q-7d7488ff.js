import{o as b,q as h,_ as m,j as e,l,m as k,h as x}from"./q-5a792cad.js";const f=({title:t,titleLink:o,summary:s,thumbnail:d,tags:c,tagData:p,color:i})=>{b(h(()=>m(()=>Promise.resolve().then(()=>y),void 0),"s_2fVlYUys5KM"));const u=r=>p.find(({name:n})=>n===r),g=r=>{const n=[];for(let a=0;a<r.length;a++)n.push(u(r[a]));return n};return e("div",{class:`md:pt-0 pt-4 project-card outer-grid ${i%2===0?"bg-zinc-100":"bg-white"} ${i%2===0?"dark:bg-zinc-800":"dark:bg-zinc-900"} dark:text-white`,children:[e("div",{class:"p-4 pr-0 image-grid",children:e("a",{href:o,children:e("img",{src:d,alt:t})})}),e("div",{class:"p-4 pl-4",children:[g(c).map(r=>{if(!!r)return e("a",{get href(){return r.link},target:"_blank",children:e("span",{class:[r.name,"align-top","hover:underline","p-2","bg-zinc-200","dark:bg-zinc-700","dark:text-white","rounded-xl","mr-3","mb-2","mt-2","inline-block"],children:l(r,"name")}),[k]:{href:l(r,"link")}})}),e("a",{href:o,class:"hover:underline",children:e("h2",{class:`font-bold text-2xl mb-4 ${t.search(" ")===-1?"break-all":"break-words"}`,children:t})}),e("p",{class:"mb-3",children:s}),e(x,{})]})]})},_=`.outer-grid{display:flex}.image-grid{min-width:200px;display:flex;justify-content:center;flex-direction:column;text-align:center}.image-grid img{max-height:153px;display:inline-block}.csharp{background-image:url(/build/q-f8fc8ab7.png);background-color:transparent;background-size:40px;background-repeat:no-repeat;width:40px;height:40px;color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden}.javascript{background-image:url(/build/q-b5e2eeeb.png);background-color:transparent;background-size:40px;background-repeat:no-repeat;width:40px;height:40px;color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;border-radius:0}.python{background-image:url(/build/q-4008a934.png);background-color:transparent;background-size:40px;background-repeat:no-repeat;width:40px;height:40px;color:transparent;-webkit-user-select:none;-moz-user-select:none;user-select:none;overflow:hidden;border-radius:0}@media (max-width: 768px){.outer-grid{display:block}}
`,w=_,y=Object.freeze(Object.defineProperty({__proto__:null,s_J4LUT5FW4CE:f,s_2fVlYUys5KM:w},Symbol.toStringTag,{value:"Module"}));export{w as s_2fVlYUys5KM,f as s_J4LUT5FW4CE};
