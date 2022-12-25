/* empty css                              */import{_ as q}from"./chunks/_plugin-vue_export-helper.1e5d64a6.js";import{o as a,c as d,a as i,t as o,n as c,r as h,b as g,d as m,F as p,e as k,f as b,g as x,w as y,h as w}from"./chunks/runtime-core.esm-bundler.f805deb3.js";const A=["href"],D={__name:"tag-item",props:{link:{type:String,required:!0},name:{type:String,required:!0}},setup(e){return(r,s)=>(a(),d("a",{href:e.link},[i("span",{class:c([e.name,"align-top","hover:underline","p-2","bg-zinc-200","dark:bg-zinc-700","dark:text-white","rounded-xl","mr-3","mb-2","mt-2","inline-block"])},o(e.name),3)],8,A))}},T=q(D,[["__scopeId","data-v-c7e62125"]]),S={__name:"tag-list",props:{tags:{type:Array,required:!0},tagData:{type:Array,required:!0}},setup(e){const r=e,s=u=>r.tagData.find(({name:l})=>l===u),t=u=>{const l=[];for(let n=0;n<u.length;n++)l.push(s(u[n]));return l};return(u,l)=>(a(!0),d(p,null,h(t(e.tags),n=>(a(),d("span",{key:n.name},[n!==void 0?(a(),g(T,{key:0,link:n.link,name:n.name},null,8,["link","name"])):m("",!0)]))),128))}},B={key:0,class:"p-4 pr-0 image-grid"},$=["href"],j=["src","alt"],z={class:"p-4 pl-4"},_=["href"],v={class:"mb-3"},f={__name:"content-card",props:{title:{type:String,required:!0},thumbnail:{type:String,required:!1,default:null},tags:{type:Array,required:!1,default:()=>[]},tagData:{type:Array,required:!1,default:()=>[]},titleLink:{type:String,required:!1,default:""},summary:{type:String,required:!1,default:""},index:{type:Number,required:!1,default:0}},setup(e){return(r,s)=>(a(),d("div",{class:c(["outer-grid","project-card","md:pt-0",e.thumbnail!==null?"pt-4":"pt-0",e.index%2===0?"dark:bg-zinc-800":"dark:bg-zinc-900",e.index%2===0?"bg-zinc-100":"bg-white","dark:text-white"])},[e.thumbnail!==null?(a(),d("div",B,[i("a",{href:e.titleLink},[i("img",{src:e.thumbnail,alt:e.title},null,8,j)],8,$)])):m("",!0),i("div",z,[k(S,{tags:e.tags,"tag-data":e.tagData},null,8,["tags","tag-data"]),i("a",{href:e.titleLink,class:"hover:underline"},[i("h2",{class:c(["font-bold","text-2xl","mb-4",e.title.search(" ")===-1?"break-all":"break-words"])},o(e.title),3)],8,_),i("p",v,o(e.summary),1),b(r.$slots,"default")])],2))}},L=["href","target"],N={__name:"project-button",props:{link:{type:String,required:!0},target:{type:String,required:!1,default:"self"},index:{type:Number,required:!1,default:0}},setup(e){return(r,s)=>(a(),d("a",{href:e.link,target:e.target,class:c(["p-3","inline-block","hover:underline",e.index%2===0?"dark:bg-zinc-900":"dark:bg-zinc-700",e.index%2===0?"bg-green-700":"bg-red-700","text-white","dark:bg-zinc-600","rounded-lg","mr-5","mb-3"])},[b(r.$slots,"default"),x(" \xBB")],10,L))}},C={class:"pb-2 text-zinc-500 dark:text-zinc-400"},F={__name:"unified-content-list",props:{content:{type:Array,required:!0},tagData:{type:Array,required:!0},startIndex:{type:Number,required:!1,default:1}},setup(e){return(r,s)=>(a(!0),d(p,null,h(e.content,(t,u)=>(a(),d("div",{key:u},[t.type==="IProject"?(a(),g(f,{key:0,title:t.title,"title-link":t.buttons.at(-1).link,summary:t.summary,thumbnail:t.thumbnail,tags:t.tags,"tag-data":e.tagData,index:u+e.startIndex},{default:y(()=>[(a(!0),d(p,null,h(t.buttons,(l,n)=>(a(),g(N,{key:n,link:l.link,target:l.target,index:n},{default:y(()=>[x(o(l.prefix)+" ",1),i("strong",null,o(l.locationName),1)]),_:2},1032,["link","target","index"]))),128))]),_:2},1032,["title","title-link","summary","thumbnail","tags","tag-data","index"])):m("",!0),t.type==="IBlogPost"?(a(),g(f,{key:1,title:t.title,"title-link":`/blog/${t.id}`,summary:t.shortDescription,tags:t.tags,"tag-data":e.tagData,index:u+e.startIndex},{default:y(()=>[i("p",C,[i("em",null,"Last updated "+o(new Date(t.gittime).toLocaleDateString("en-GB",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric",timeZone:"GMT"}))+" GMT",1)])]),_:2},1032,["title","title-link","summary","tags","tag-data","index"])):m("",!0)]))),128))}},U={class:"project-list"},V=w({props:{projects:{type:Array,required:!0},tagData:{type:Array,required:!0}},data(){return{workingArray:this.projects.map(e=>e),exposedArray:this.projects.map(e=>e),sortType:"featured"}},watch:{sortType(){switch(this.sortType){case"featured":this.workingArray=this.projects.map(e=>e);break;case"lastUpdate":this.workingArray=this.projects.map(e=>e).sort((e,r)=>new Date(r.lastUpdate).getTime()-new Date(e.lastUpdate).getTime());break}},workingArray(){for(let e=0;e<this.workingArray.length;e++)this.exposedArray[e]=this.workingArray[e]}},methods:{sortByFeatured(){this.sortType="featured"},sortByLatest(){this.sortType="lastUpdate"}}}),E=Object.assign(V,{__name:"project-list",setup(e){return(r,s)=>(a(),d("div",U,[i("a",{class:c([r.sortType==="featured"?"decoration-solid underline cursor-default":"cursor-pointer","select-none","p-4","inline-block"]),onClick:s[0]||(s[0]=(...t)=>r.sortByFeatured&&r.sortByFeatured(...t))},"Sort by featured",2),i("a",{class:c([r.sortType==="lastUpdate"?"decoration-solid underline cursor-default":"cursor-pointer","select-none","p-4","inline-block"]),onClick:s[1]||(s[1]=(...t)=>r.sortByLatest&&r.sortByLatest(...t))},"Sort by last updated",2),k(F,{content:r.exposedArray,"tag-data":r.tagData,"start-index":0},null,8,["content","tag-data"])]))}});export{E as default};
