(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{7785:(e,t,r)=>{Promise.resolve().then(r.bind(r,696))},696:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(1133),s=r(1321);function a(e){let{statusMessage:t}=e;return(0,n.jsx)("p",{id:"statusParagraph",style:{whiteSpace:"pre-wrap"},children:t})}function o(){return(0,n.jsx)("button",{onClick:function(){let e="Javascript is working!";"function"==typeof untar&&(e+=" Untar is loaded!"),alert(e)},children:"Test Javascript"})}function i(){return(0,n.jsx)("button",{onClick:function(){let e=indexedDB.open("testDatabase",2);e.onupgradeneeded=function(e){e.target.result.createObjectStore("testStore")},e.onsuccess=function(e){let t=e.target.result.transaction("testStore","readwrite"),r=t.objectStore("testStore"),n=Date.now();r.put(n,"currentTime"),t.oncomplete=function(){alert("IDB currentTime set to "+n)}}},children:"Set IDB currentTime"})}function u(){let e=async function(){indexedDB.open("testDatabase",2).onsuccess=function(e){e.target.result.transaction(["testStore"],"readwrite").objectStore("testStore").get("currentTime").onsuccess=function(e){alert("IDB currentTime is "+e.target.result)}}};return(0,n.jsx)("button",{onClick:e,children:"Get IDB currentTime"})}let l=function(){let[e,t]=(0,s.useState)(null),[r,l]=(0,s.useState)("No untar library loaded."),[c,f]=(0,s.useState)(null),d=function(e){let t="";return e.forEach(e=>{t+=e.name+"\n"}),t};return(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"Untar & IDB Test"}),(0,n.jsx)("input",{type:"file",onChange:e=>{let r=e.target.files[0];if("application/x-tar"!==r.type){alert("Please select a tar file");return}t(r)}}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("button",{onClick:()=>{if(null===e){alert("Please select a file first.");return}l("Untarring...");let t=new FileReader;t.onload=function(e){untar(t.result).then(function(e){f(e),console.log(e),l(e.length+" files extracted:\n"+d(e))},function(e){console.log("error handler"),l("Error: "+t.error.message)})},t.onerror=function(e){l("Error: "+t.error.message)},t.readAsArrayBuffer(e)},children:"Untar"}),(0,n.jsx)("br",{}),(0,n.jsx)(o,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(u,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(i,{})," ",(0,n.jsx)("br",{}),(0,n.jsx)(a,{statusMessage:r})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[634,775,358],()=>t(7785)),_N_E=e.O()}]);