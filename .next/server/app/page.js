(()=>{var e={};e.id=974,e.ids=[974],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4984:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>d,pages:()=>c,routeModule:()=>p,tree:()=>u});var n=r(292),s=r(1979),o=r(3907),i=r.n(o),a=r(6108),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let u=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,5866)),"C:\\Users\\qwert\\Documents\\00_Coding\\sam_browser\\sam_browser_test_bare_next_js\\app\\page.js"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,5203)),"C:\\Users\\qwert\\Documents\\00_Coding\\sam_browser\\sam_browser_test_bare_next_js\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9153,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,6652,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,7885,23)),"next/dist/client/components/unauthorized-error"]}],c=["C:\\Users\\qwert\\Documents\\00_Coding\\sam_browser\\sam_browser_test_bare_next_js\\app\\page.js"],d={require:r,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},5351:(e,t,r)=>{Promise.resolve().then(r.bind(r,5866))},5615:(e,t,r)=>{Promise.resolve().then(r.bind(r,1478))},8625:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,8291,23)),Promise.resolve().then(r.t.bind(r,2831,23)),Promise.resolve().then(r.t.bind(r,3907,23)),Promise.resolve().then(r.t.bind(r,1410,23)),Promise.resolve().then(r.t.bind(r,6134,23)),Promise.resolve().then(r.t.bind(r,3202,23)),Promise.resolve().then(r.t.bind(r,3673,23))},3777:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,4231,23)),Promise.resolve().then(r.t.bind(r,4875,23)),Promise.resolve().then(r.t.bind(r,6863,23)),Promise.resolve().then(r.t.bind(r,8110,23)),Promise.resolve().then(r.t.bind(r,2794,23)),Promise.resolve().then(r.t.bind(r,4542,23)),Promise.resolve().then(r.t.bind(r,7453,23))},7221:()=>{},9077:()=>{},1478:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>b});var n=r(7120),s=r(6177);let o="/sam_browser_test_bare_next_js/out";function i({statusMessage:e}){return(0,n.jsx)("p",{id:"statusParagraph",style:{whiteSpace:"pre-wrap"},children:e})}function a(){return(0,n.jsx)("button",{onClick:function(){let e="Javascript is working!";"function"==typeof untar&&(e+=" Untar is loaded!"),alert(e)},children:"Test Javascript"})}function l(){return(0,n.jsx)("button",{onClick:function(){let e=indexedDB.open("testDatabase",2);e.onupgradeneeded=function(e){e.target.result.createObjectStore("testStore"),console.log("created object store testStore")},e.onsuccess=function(e){let t=e.target.result.transaction("testStore","readwrite"),r=t.objectStore("testStore"),n=Date.now();r.put(n,"currentTime"),t.oncomplete=function(){alert("IDB currentTime set to "+n)}}},children:"Set IDB currentTime"})}function u(){let e=async function(){indexedDB.open("testDatabase",2).onsuccess=function(e){e.target.result.transaction(["testStore"],"readwrite").objectStore("testStore").get("currentTime").onsuccess=function(e){alert("IDB currentTime is "+e.target.result)}}};return(0,n.jsx)("button",{onClick:e,children:"Get IDB currentTime"})}function c(e){let t=e.filesToStore;return(0,n.jsx)("button",{onClick:function(e){let r=indexedDB.open("fileDatabase",1);r.onupgradeneeded=function(e){e.target.result.createObjectStore("allFiles"),console.log("Created allFiles object store")},r.onsuccess=function(e){let r=e.target.result.transaction("allFiles","readwrite"),n=r.objectStore("allFiles");for(let e in t)n.put(t[e].blob,t[e].name);r.oncomplete=function(){alert(t.length+" files stored in IDB")}}},children:"Store Files in IDB"})}function d(e){return e.filesToStore,(0,n.jsx)("button",{onClick:function(){console.log("Clicked for web worker. Base Prefix: "+(o.length>0?o:"empty"));let e=o+"/worker_for_store_files_in_idb.js",t=new Worker(e);t.onmessage=function(e){console.log(e.data)},console.log(t,e),t.postMessage("park name?")},children:"Store Files in IDB With Web Worker"})}function p(e){let[t,r]=(0,s.useState)(null),[o,i]=(0,s.useState)(-1);return(0,n.jsx)("img",{onClick:function(){indexedDB.open("fileDatabase",1).onsuccess=function(e){e.target.result.transaction("allFiles","readwrite").objectStore("allFiles").getAll().onsuccess=function(e){let t=e.target.result;i((o+1)%t.length);let n=new Blob([t[o]],{type:"image/webp"});console.log({filesDotLength:t.length,indexOfCurrentImage:o,newBlob:n}),r(URL.createObjectURL(n))}}},width:100,height:100,src:t})}console.log("Base prefix: "+(o.length>0?o:"empty"));let b=function(){let[e,t]=(0,s.useState)(null),[r,o]=(0,s.useState)("Waiting for file input."),[b,f]=(0,s.useState)(null),m=function(e){let t="";return e.forEach(e=>{t+=e.name+"\n"}),t};return(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Untar & IDB Test v4"}),(0,n.jsx)("input",{type:"file",onChange:e=>{let r=e.target.files[0];if("application/x-tar"!==r.type){alert("Please select a tar file");return}t(r)}}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("button",{onClick:()=>{if(null===e){alert("Please select a file first.");return}o("Untarring...");let t=new FileReader;t.onload=function(e){untar(t.result).then(function(e){let t=[];for(let r in e){let n=new Blob([e[r].blob],{type:"image/webp"}),s={name:e[r].name,blob:n,size:e[r].size};t.push(s)}f(t),console.log(t),o(t.length+" files extracted:\n"+m(t))},function(e){console.log("error handler"),o("Error: "+t.error.message)})},t.onerror=function(e){o("Error: "+t.error.message)},t.readAsArrayBuffer(e)},children:"Untar"}),(0,n.jsx)("br",{}),(0,n.jsx)(a,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(u,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(l,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(c,{filesToStore:b})," ",(0,n.jsx)("br",{}),(0,n.jsx)(d,{filesToStore:b}),(0,n.jsx)("br",{}),(0,n.jsx)(i,{statusMessage:r}),(0,n.jsx)(p,{})]})}},5203:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o,metadata:()=>s});var n=r(532);let s={title:"UntarIDB Test",description:""};function o({children:e}){return(0,n.jsxs)("html",{lang:"en",children:[(0,n.jsx)("head",{children:(0,n.jsx)("script",{src:"/sam_browser_test_bare_next_js/out/untar.js"})}),(0,n.jsx)("body",{children:e})]})}},5866:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(9480).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\qwert\\\\Documents\\\\00_Coding\\\\sam_browser\\\\sam_browser_test_bare_next_js\\\\app\\\\page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\qwert\\Documents\\00_Coding\\sam_browser\\sam_browser_test_bare_next_js\\app\\page.js","default")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[179],()=>r(4984));module.exports=n})();