(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{7892:(e,n,t)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5366)}])},5366:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>r});var l=t(5105),s=t(8101),a=t(886),i=t(7800).Buffer;function r(){let[e,n]=(0,s.useState)([]),t=async e=>{let t=e.target.files[0];if(t){if(console.log("File selected:",t.name),t.name.endsWith(".tar")){let e=new FileReader;e.onload=async e=>{let t=new Uint8Array(e.target.result),l=a.extract();l.on("entry",(e,t,l)=>{let s=[];t.on("data",e=>{s.push(e)}),t.on("end",()=>{let t=i.concat(s).toString();console.log("Extracted file: ".concat(e.name)),n(n=>[...n,{name:e.name,size:e.size,content:t}]),l()}),t.resume()}),l.on("finish",()=>{console.log("All files extracted")}),l.end(t)},e.readAsArrayBuffer(t)}else console.log("Please select a tar file.")}};return(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"Blank NextJS App 2"}),(0,l.jsx)("input",{type:"file",id:"fileInput",onChange:t}),(0,l.jsx)("div",{children:e.map((e,n)=>(0,l.jsxs)("div",{children:[(0,l.jsxs)("h3",{children:[e.name," (",e.size," bytes)"]}),(0,l.jsx)("pre",{children:e.content})]},n))})]})}},2693:()=>{}},e=>{var n=n=>e(e.s=n);e.O(0,[105,636,593,792],()=>n(7892)),_N_E=e.O()}]);