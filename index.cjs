var ce=Object.defineProperty;var Ge=e=>ce(e,"__esModule",{value:!0});var g=(e,t)=>{Ge(e);for(var n in t)ce(e,n,{get:t[n],enumerable:!0})};g(exports,{components:()=>N,electron:()=>I,env:()=>A,fmt:()=>h,fs:()=>p,notion:()=>K,registry:()=>y,storage:()=>$,web:()=>o});var A={};g(A,{focusMenu:()=>De,focusNotion:()=>et,name:()=>Qe,notionRequire:()=>nt,reload:()=>tt,version:()=>Ye});"use strict";var le=globalThis.__enhancerElectronApi.platform,de=globalThis.__enhancerElectronApi.version,pe=globalThis.__enhancerElectronApi.focusMenu,ue=globalThis.__enhancerElectronApi.focusNotion,he=globalThis.__enhancerElectronApi.reload,fe=globalThis.__enhancerElectronApi.notionRequire;"use strict";var Qe=le,Ye=de,De=pe,et=ue,tt=he,nt=fe;var p={};g(p,{getJSON:()=>st,getText:()=>ot,isFile:()=>it,localPath:()=>rt,notionPath:()=>at});"use strict";var E=e=>`notion://www.notion.so/__notion-enhancer/${e}`,me=(e,t={})=>{if(e.startsWith("http"))return fetch(e,t).then(n=>n.json());try{return globalThis.__enhancerElectronApi.nodeRequire(`notion-enhancer/${e}`)}catch{return fetch(E(e),t).then(r=>r.json())}},ye=(e,t={})=>{if(e.startsWith("http"))return fetch(e,t).then(n=>n.text());try{let n=globalThis.__enhancerElectronApi.nodeRequire("fs"),{resolve:r}=globalThis.__enhancerElectronApi.nodeRequire("path");return n.readFileSync(r(`${__dirname}/../../${e}`))}catch{return fetch(E(e),t).then(r=>r.text())}},ge=async e=>{try{let t=globalThis.__enhancerElectronApi.nodeRequire("fs"),{resolve:n}=globalThis.__enhancerElectronApi.nodeRequire("path");if(e.startsWith("http"))await fetch(e);else try{t.existsSync(n(`${__dirname}/../../${e}`))}catch{await fetch(E(e))}return!0}catch{return!1}},ve=globalThis.__enhancerElectronApi.notionPath;"use strict";var rt=E,st=me,ot=ye,it=ge,at=ve;var $={};g($,{addChangeListener:()=>pt,db:()=>dt,get:()=>ct,removeChangeListener:()=>ut,set:()=>lt});"use strict";var F=(e,t=void 0)=>globalThis.__enhancerElectronApi.db.get(e,t),H=(e,t)=>globalThis.__enhancerElectronApi.db.set(e,t),we=(e,t=F,n=H)=>(typeof e=="string"&&(e=[e]),{get:(r=[],s=void 0)=>t([...e,...r],s),set:(r,s)=>n([...e,...r],s)}),be=e=>globalThis.__enhancerElectronApi.db.addChangeListener(e),xe=e=>globalThis.__enhancerElectronApi.db.removeChangeListener(e);"use strict";var ct=F,lt=H,dt=we,pt=be,ut=xe;var I={};g(I,{browser:()=>ht,onMessage:()=>gt,sendMessage:()=>mt,sendMessageToHost:()=>yt,webFrame:()=>ft});"use strict";var ht=globalThis.__enhancerElectronApi?.browser,ft=globalThis.__enhancerElectronApi?.webFrame,mt=(e,t)=>globalThis.__enhancerElectronApi.ipcRenderer.sendMessage(e,t),yt=(e,t)=>globalThis.__enhancerElectronApi.ipcRenderer.sendMessageToHost(e,t),gt=(e,t)=>globalThis.__enhancerElectronApi.ipcRenderer.onMessage(e,t);var K={};g(K,{create:()=>bt,get:()=>_e,getPageID:()=>M,getSpaceID:()=>S,getUserID:()=>$e,search:()=>vt,set:()=>wt,sign:()=>$t,upload:()=>xt});"use strict";var m=e=>(e?.length===32&&!e.includes("-")&&(e=e.replace(/([\d\w]{8})([\d\w]{4})([\d\w]{4})([\d\w]{4})([\d\w]{12})/,"$1-$2-$3-$4-$5")),e),$e=()=>JSON.parse(localStorage["LRU:KeyValueStore2:current-user-id"]||{}).value,M=()=>m(o.queryParams().get("p")||location.pathname.split(/(-|\/)/g).reverse()[0]),V,S=async()=>(V||(V=(await _e(M())).space_id),V),_e=async(e,t="block")=>(e=m(e),(await p.getJSON("https://www.notion.so/api/v3/getRecordValues",{headers:{"Content-Type":"application/json"},body:JSON.stringify({requests:[{table:t,id:e}]}),method:"POST"})).results[0].value),vt=async(e="",t=20,n=S())=>(n=m(await n),await p.getJSON("https://www.notion.so/api/v3/search",{headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"BlocksInSpace",query:e,spaceId:n,limit:t,filters:{isDeletedOnly:!1,excludeTemplates:!1,isNavigableOnly:!1,requireEditPermissions:!1,ancestors:[],createdBy:[],editedBy:[],lastEditedTime:{},createdTime:{}},sort:"Relevance",source:"quick_find"}),method:"POST"})),wt=async({recordID:e,recordTable:t="block",spaceID:n=S(),path:r=[]},s={})=>{n=m(await n),e=m(e);let c=await p.getJSON("https://www.notion.so/api/v3/saveTransactions",{headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:h.uuidv4(),transactions:[{id:h.uuidv4(),spaceId:n,operations:[{pointer:{table:t,id:e,spaceId:n},path:r,command:r.length?"set":"update",args:s}]}]}),method:"POST"});return c.errorId?c:!0},bt=async({recordValue:e={},recordTable:t="block"}={},{prepend:n=!1,siblingID:r=void 0,parentID:s=M(),parentTable:c="block",spaceID:a=S(),userID:i=$e()}={})=>{a=m(await a),s=m(s),r=m(r);let d=m(e?.id??h.uuidv4()),x=[],j={type:"text",id:d,version:0,created_time:new Date().getTime(),last_edited_time:new Date().getTime(),parent_id:s,parent_table:c,alive:!0,created_by_table:"notion_user",created_by_id:i,last_edited_by_table:"notion_user",last_edited_by_id:i,space_id:a,permissions:[{type:"user_permission",role:"editor",user_id:i}]};c==="space"?(s=a,j.parent_id=a,x.push("pages"),j.type="page"):c==="collection_view"?(x.push("page_sort"),j.type="page"):x.push("content");let ae=await p.getJSON("https://www.notion.so/api/v3/saveTransactions",{headers:{"Content-Type":"application/json"},body:JSON.stringify({requestId:h.uuidv4(),transactions:[{id:h.uuidv4(),spaceId:a,operations:[{pointer:{table:c,id:s,spaceId:a},path:x,command:n?"listBefore":"listAfter",args:{...r?{after:r}:{},id:d}},{pointer:{table:t,id:d,spaceId:a},path:[],command:"set",args:{...j,...e}}]}]}),method:"POST"});return ae.errorId?ae:d},xt=async(e,{pageID:t=M(),spaceID:n=S()}={})=>{n=m(await n),t=m(t);let r=await p.getJSON("https://www.notion.so/api/v3/getUploadFileUrl",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({bucket:"secure",name:e.name,contentType:e.type,record:{table:"block",id:t,spaceId:n}})});return r.errorId?r:(fetch(r.signedPutUrl,{method:"PUT",headers:{"content-type":e.type},body:e}),r.url)},$t=(e,t,n="block")=>(e.startsWith("/")&&(e=`https://notion.so${e}`),e.includes("secure.notion-static.com")&&(e=new URL(e),e=`https://www.notion.so/signed/${encodeURIComponent(e.origin+e.pathname)}?table=${n}&id=${t}`),e);var h={};g(h,{is:()=>Tt,rgbContrast:()=>At,rgbLogShade:()=>Lt,slugger:()=>_t,uuidv4:()=>jt});"use strict";var _t=(e,t=new Set)=>{e=e.replace(/\s/g,"-").replace(/[^A-Za-z0-9-_]/g,"").toLowerCase();let n=0,r=e;for(;t.has(r);)n++,r=`${e}-${n}`;return r},jt=()=>crypto?.randomUUID?crypto.randomUUID():([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),Lt=(e,t)=>{var n=parseInt,r=Math.round,[s,c,t,a]=t.split(","),i=e<0,d=i?0:e*255**2,i=i?1+e:1-e;return"rgb"+(a?"a(":"(")+r((i*n(s[3]=="a"?s.slice(5):s.slice(4))**2+d)**.5)+","+r((i*n(c)**2+d)**.5)+","+r((i*n(t)**2+d)**.5)+(a?","+a:")")},At=(e,t,n)=>Math.sqrt(.299*(e*e)+.587*(t*t)+.114*(n*n))>165.75?"rgb(0,0,0)":"rgb(255,255,255)",Et={alphanumeric:/^[\w\.-]+$/,uuid:/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,semver:/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/i,email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,url:/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,64}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i,color:/^(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)$/i};function St(e,t){let n=e.match(t);return!!(n&&n.length)}var Tt=async(e,t,{extension:n=""}={})=>{if(n=!e||!e.endsWith||e.endsWith(n),Array.isArray(t))return t.includes(e);switch(t){case"array":return Array.isArray(e);case"object":return e&&typeof e=="object"&&!Array.isArray(e);case"undefined":case"boolean":case"number":return typeof e===t&&n;case"string":return typeof e===t&&n;case"alphanumeric":case"uuid":case"semver":case"email":case"url":case"color":return typeof e=="string"&&St(e,Et[t])&&n;case"file":return typeof e=="string"&&e&&await p.isFile(e)&&n}return!1};var y={};g(y,{core:()=>Le,db:()=>Ut,enabled:()=>zt,errors:()=>Jt,get:()=>D,list:()=>Y,optionDefault:()=>Ee,optionTypes:()=>Mt,profileDB:()=>X,profileName:()=>Ae,supportedEnvs:()=>qt});"use strict";var l=async(e,t,n,r,{extension:s="",error:c=`invalid ${t} (${s?`${s} `:""}${r}): ${JSON.stringify(n)}`,optional:a=!1}={})=>{let i;for(let d of Array.isArray(r)?[r]:r.split("|"))if(d==="file"?i=n&&!n.startsWith("http")?await h.is(`repo/${e._dir}/${n}`,d,{extension:s}):!1:i=await h.is(n,d,{extension:s}),i)break;return i||a&&await h.is(n,"undefined")?!0:(c&&e._err(c),!1)},kt=async e=>(e.environments=e.environments??y.supportedEnvs,await l(e,"environments",e.environments,"array")?e.environments.map(n=>l(e,"environments.env",n,y.supportedEnvs)):!1),Ct=async e=>{if(!await l(e,"tags",e.tags,"array"))return!1;let n=["core","extension","theme","integration"];if(!e.tags.filter(i=>n.includes(i)).length)return e._err(`invalid tags (must contain at least one of 'core', 'extension', 'theme' or 'integration'):
        ${JSON.stringify(e.tags)}`),!1;let s=e.tags.includes("theme"),c=e.tags.includes("light")||e.tags.includes("dark"),a=e.tags.includes("light")&&e.tags.includes("dark");return s&&(!c||a)?(e._err(`invalid tags (themes must be either 'light' or 'dark', not neither or both):
        ${JSON.stringify(e.tags)}`),!1):e.tags.map(i=>l(e,"tags.tag",i,"string"))},Pt=async e=>await l(e,"authors",e.authors,"array")?e.authors.map(n=>[l(e,"authors.author.name",n.name,"string"),l(e,"authors.author.email",n.email,"email",{optional:!0}),l(e,"authors.author.homepage",n.homepage,"url"),l(e,"authors.author.avatar",n.avatar,"url")]):!1,Ot=async e=>{if(!await l(e,"css",e.css,"object"))return!1;let n=[];for(let r of["frame","client","menu"]){if(!e.css[r])continue;let s=await l(e,`css.${r}`,e.css[r],"array");s&&(s=e.css[r].map(c=>l(e,`css.${r}.file`,c,"file",{extension:".css"}))),n.push(s)}return n},Rt=async e=>{if(!await l(e,"js",e.js,"object"))return!1;let n=[];for(let r of["frame","client","menu"]){if(!e.js[r])continue;let s=await l(e,`js.${r}`,e.js[r],"array");s&&(s=e.js[r].map(c=>l(e,`js.${r}.file`,c,"file",{extension:".mjs"}))),n.push(s)}if(e.js.electron)if(await l(e,"js.electron",e.js.electron,"array"))for(let s of e.js.electron){if(!await l(e,"js.electron.file",s,"object")){n.push(!1);continue}n.push([l(e,"js.electron.file.source",s.source,"file",{extension:".cjs"}),l(e,"js.electron.file.target",s.target,"string",{extension:".js"})])}else n.push(!1);return n},Nt=async e=>{if(!await l(e,"options",e.options,"array"))return!1;let n=[];for(let r of e.options){let s="options.option";if(!await l(e,`${s}.type`,r.type,y.optionTypes)){n.push(!1);continue}switch(r.environments=r.environments??y.supportedEnvs,n.push([l(e,`${s}.key`,r.key,"alphanumeric"),l(e,`${s}.label`,r.label,"string"),l(e,`${s}.tooltip`,r.tooltip,"string",{optional:!0}),l(e,`${s}.environments`,r.environments,"array").then(a=>a?r.environments.map(i=>l(e,`${s}.environments.env`,i,y.supportedEnvs)):!1)]),r.type){case"toggle":n.push(l(e,`${s}.value`,r.value,"boolean"));break;case"select":{let a=await l(e,`${s}.values`,r.values,"array");a&&(a=r.values.map(i=>l(e,`${s}.values.value`,i,"string"))),n.push(a);break}case"text":case"hotkey":n.push(l(e,`${s}.value`,r.value,"string"));break;case"number":case"color":n.push(l(e,`${s}.value`,r.value,r.type));break;case"file":{let a=await l(e,`${s}.extensions`,r.extensions,"array");a&&(a=r.extensions.map(i=>l(e,`${s}.extensions.extension`,i,"string"))),n.push(a);break}}}return n};async function je(e){let t=[l(e,"name",e.name,"string"),l(e,"id",e.id,"uuid"),l(e,"version",e.version,"semver"),kt(e),l(e,"description",e.description,"string"),l(e,"preview",e.preview,"file|url",{optional:!0}),Ct(e),Pt(e),Ot(e),Rt(e),Nt(e)];do t=await Promise.all(t.flat(1/0));while(t.some(n=>Array.isArray(n)));return t.every(n=>n)}"use strict";var Le=["a6621988-551d-495a-97d8-3c568bca2e9e","0f0bf8b6-eae6-4273-b307-8fc43f2ee082","36a2ffc9-27ff-480e-84a7-c7700a7d232d"],qt=["linux","win32","darwin","extension"],Mt=["toggle","select","text","number","color","file","hotkey"],Ae=async()=>$.get(["currentprofile"],"default"),X=async()=>$.db(["profiles",await Ae()]),G,Q=[],Y=async(e=t=>!0)=>{G||(G=new Promise(async(n,r)=>{let s=[];for(let c of await p.getJSON("repo/registry.json"))try{let a={...await p.getJSON(`repo/${c}/mod.json`),_dir:c,_err:i=>Q.push({source:c,message:i})};await je(a)&&s.push(a)}catch{Q.push({source:c,message:"invalid mod.json"})}n(s)}));let t=[];for(let n of await G)await e(n)&&t.push(n);return t},Jt=async()=>(await Y(),Q),D=async e=>(await Y(t=>t.id===e))[0],zt=async e=>(await D(e)).environments.includes(A.name)?Le.includes(e)?!0:(await X()).get(["_mods",e],!1):!1,Ee=async(e,t)=>{let n=await D(e),r=n.options.find(s=>s.key===t);if(!!r)switch(r.type){case"toggle":case"text":case"number":case"color":case"hotkey":return r.value;case"select":return r.values[0];case"file":return}},Ut=async e=>{let t=await X();return $.db([e],async(n,r=void 0)=>(typeof n=="string"&&(n=[n]),n.length===2&&(r=await Ee(e,n[1])??r),t.get(n,r)),t.set)};var o={};g(o,{addDocumentObserver:()=>Xt,addHotkeyListener:()=>Vt,copyToClipboard:()=>Ht,empty:()=>Wt,escape:()=>Te,html:()=>Ce,loadStylesheet:()=>Ft,queryParams:()=>Bt,raw:()=>ke,readFromClipboard:()=>It,removeDocumentObserver:()=>Gt,removeHotkeyListener:()=>Kt,render:()=>Pe,whenReady:()=>Zt});"use strict";var Se=!1,T=[],ee,J=[],te=[],Zt=(e=[])=>new Promise((t,n)=>{function r(){let s;s=setInterval(c,100);function c(){e.every(a=>document.querySelector(a))&&(clearInterval(s),t(!0))}c()}document.readyState!=="complete"?document.addEventListener("readystatechange",s=>{document.readyState==="complete"&&r()}):r()}),Bt=()=>new URLSearchParams(window.location.search),Te=e=>e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;").replace(/\\/g,"&#x5C;"),ke=(e,...t)=>{let n=e.map(r=>r+(["string","number"].includes(typeof t[0])?t.shift():Te(JSON.stringify(t.shift(),null,2)??""))).join("");return n.includes("<pre")?n.trim():n.split(/\n/).map(r=>r.trim()).filter(r=>r.length).join(" ")},Ce=(e,...t)=>{let n=document.createRange().createContextualFragment(ke(e,...t));return n.children.length===1?n.children[0]:n.children},Pe=(e,...t)=>(t=t.map(n=>n instanceof HTMLCollection?[...n]:n).flat(1/0).filter(n=>n),e.append(...t),e),Wt=e=>{for(;e.firstChild&&e.removeChild(e.firstChild););return e},Ft=e=>{let t=Ce`<link
    rel="stylesheet"
    href="${e.startsWith("https://")?e:p.localPath(e)}"
  />`;return Pe(document.head,t),t},Ht=async e=>{try{await navigator.clipboard.writeText(e)}catch{let t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t)}},It=()=>navigator.clipboard.readText(),Oe=(e,t)=>{if(document.activeElement.nodeName==="INPUT"&&!t.listenInInput)return;t.keys.every(s=>{s=s.toLowerCase();let c={metaKey:["meta","os","win","cmd","command"],ctrlKey:["ctrl","control"],shiftKey:["shift"],altKey:["alt"]};for(let a in c)if(c[a].includes(s)&&e[a])return!0;if(s==="space"&&(s=" "),s==="plus"&&(s="+"),s===e.key.toLowerCase())return!0})&&t.callback(e)},Vt=(e,t,{listenInInput:n=!1,keydown:r=!1}={})=>{typeof e=="string"&&(e=e.split("+")),T.push({keys:e,callback:t,listenInInput:n,keydown:r}),Se||(Se=!0,document.addEventListener("keyup",s=>{for(let c of T.filter(({keydown:a})=>!a))Oe(s,c)}),document.addEventListener("keydown",s=>{for(let c of T.filter(({keydown:a})=>a))Oe(s,c)}))},Kt=e=>{T=T.filter(t=>t.callback!==e)},Xt=(e,t=[])=>{if(!ee){let n=r=>{for(;r.length;){let s=r.shift(),c=(i,d)=>i instanceof Element&&(i.matches(d)||i.matches(`${d} *`)||i.querySelector(d)),a=i=>s.target.matches(i)||s.target.matches(`${i} *`)||[...s.addedNodes].some(d=>c(d,i));for(let i of J)(!i.selectors.length||i.selectors.some(a))&&i.callback(s)}};ee=new MutationObserver((r,s)=>{te.length||requestIdleCallback(()=>n(te)),te.push(...r)}),ee.observe(document.body,{childList:!0,subtree:!0,attributes:!0})}J.push({callback:e,selectors:t})},Gt=e=>{J=J.filter(t=>t.callback!==e)};var N={};g(N,{addCornerAction:()=>Xe,addPanelView:()=>Ve,addTooltip:()=>Ne,feather:()=>qe});"use strict";var Re,u,Qt=e=>[...e.getClientRects()].reduce((t,n)=>t.some(r=>r.y===n.y)?t:[...t,n],[]).length,Yt=async(e,t,n)=>{u.style.top="0px",u.style.left="0px";let r=e.getBoundingClientRect(),{offsetWidth:s,offsetHeight:c}=u,a=6,i=r.x,d=Math.floor(r.y);if(["top","bottom"].includes(t)){t==="top"&&(d-=c+a),t==="bottom"&&(d+=r.height+a),i-=s/2-r.width/2,u.style.left=`${i}px`,u.style.top=`${d}px`;let x=()=>Qt(u.firstElementChild)>n,j=x();for(;x();)u.style.left=`${window.innerWidth-i>i?i++:i--}px`;j&&(i+=window.innerWidth-i>i?a:-a,u.style.left=`${i}px`)}return["left","right"].includes(t)&&(d-=c/2-r.height/2,t==="left"&&(i-=s+a),t==="right"&&(i+=r.width+a),u.style.left=`${i}px`,u.style.top=`${d}px`),!0},Ne=async(e,t,{delay:n=100,offsetDirection:r="bottom",maxLines:s=1}={})=>{Re||(Re=o.loadStylesheet("api/components/tooltip.css"),u=o.html`<div id="enhancer--tooltip"></div>`,o.render(document.body,u)),globalThis.markdownit||await import(p.localPath("dep/markdown-it.min.js"));let c=markdownit({linkify:!0});t instanceof Element||(t=o.html`<div style="display:inline">
      ${t.split(`
`).map(i=>c.renderInline(i)).join("<br>")}
    </div>`);let a;e.addEventListener("mouseover",async i=>{a||(a=setTimeout(async()=>{e.matches(":hover")&&u.style.display!=="block"&&(u.style.display="block",o.render(o.empty(u),t),Yt(e,r,s),await u.animate([{opacity:0},{opacity:1}],{duration:65}).finished),a=void 0},n))}),e.addEventListener("mouseout",async i=>{a=void 0,u.style.display==="block"&&!e.matches(":hover")&&(await u.animate([{opacity:1},{opacity:0}],{duration:65}).finished,u.style.display="")})};"use strict";var ne,qe=async(e,t={})=>(ne||(ne=o.html`${await p.getText("dep/feather-sprite.svg")}`),t.style=((t.style?t.style+";":"")+"stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none;").trim(),t.viewBox="0 0 24 24",`<svg ${Object.entries(t).map(([n,r])=>`${o.escape(n)}="${o.escape(r)}"`).join(" ")}>${ne.getElementById(e)?.innerHTML}</svg>`);"use strict";var k=[],Dt=o.raw`<svg viewBox="-1 -1 9 11">
    <path d="M 3.5 0L 3.98809 -0.569442L 3.5 -0.987808L 3.01191 -0.569442L 3.5 0ZM 3.5 9L 3.01191
      9.56944L 3.5 9.98781L 3.98809 9.56944L 3.5 9ZM 0.488094 3.56944L 3.98809 0.569442L 3.01191
      -0.569442L -0.488094 2.43056L 0.488094 3.56944ZM 3.01191 0.569442L 6.51191 3.56944L 7.48809
      2.43056L 3.98809 -0.569442L 3.01191 0.569442ZM -0.488094 6.56944L 3.01191 9.56944L 3.98809
      8.43056L 0.488094 5.43056L -0.488094 6.56944ZM 3.98809 9.56944L 7.48809 6.56944L 6.51191
      5.43056L 3.01191 8.43056L 3.98809 9.56944Z"></path>
  </svg>`,Me,w,z,v,_,C,L,Je,ze,re,f,Ue,U,P,Z,se,b,oe,O,B="data-enhancer-panel-pinned",W=()=>_.hasAttribute(B),R=()=>{let e=[z,v,C,_].filter(t=>t);if(W()){ie();for(let t of e)t.removeAttribute(B)}else for(let t of e)t.setAttribute(B,"true");w.set(["panel.pinned"],W())},Ze=async()=>{document.documentElement.style.setProperty("--component--panel-width",f+"px"),w.set(["panel.width"],f)},Be=e=>{e.preventDefault(),re=!0,f=ze+(Je-e.clientX),f<190&&(f=190),f>480&&(f=480),_.style.width=f+"px",C.style.width=f+"px",z.style.paddingRight=f+"px",v&&(v.style.right=f+"px")},We=e=>{_.style.width="",C.style.width="",z.style.paddingRight="",v&&(v.style.right=""),Ze(),L.style.cursor="",document.body.removeEventListener("mousemove",Be),document.body.removeEventListener("mouseup",We)},en=e=>{Je=e.clientX,ze=f,L.style.cursor="auto",document.body.addEventListener("mousemove",Be),document.body.addEventListener("mouseup",We)},tn=()=>document.body.contains(b),Fe=()=>{if(!W())return R();o.render(Ue,O),o.empty(b);for(let t of k){let n=P.contains(t.$title),r=o.render(o.html`<div class="enhancer--panel-switcher-item" tabindex="0" ${n?"data-open":""}></div>`,o.render(o.html`<span class="enhancer--panel-view-title"></span>`,t.$icon.cloneNode(!0),t.$title.cloneNode(!0)));r.addEventListener("click",()=>{Ie(t),w.set(["panel.open"],t.id)}),o.render(b,r)}let e=Z.getBoundingClientRect();o.render(o.empty(O),o.render(o.html`<div style="position: fixed; top: ${e.top}px; left: ${e.left}px;
              width: ${e.width}px; height: ${e.height}px;"></div>`,o.render(o.html`<div style="position: relative; top: 100%; pointer-events: auto;"></div>`,b))),b.querySelector("[data-open]").focus(),b.animate([{opacity:0},{opacity:1}],{duration:200}),document.addEventListener("keydown",He)},ie=()=>{document.removeEventListener("keydown",He),b.animate([{opacity:1},{opacity:0}],{duration:200}).onfinish=()=>O.remove()},He=e=>{if(tn())switch(e.key){case"Escape":ie(),e.stopPropagation();break;case"Enter":document.activeElement.click(),e.stopPropagation();break;case"ArrowUp":(e.target.previousElementSibling||e.target.parentElement.lastElementChild).focus(),e.stopPropagation();break;case"ArrowDown":(e.target.nextElementSibling||e.target.parentElement.firstElementChild).focus(),e.stopPropagation();break}},Ie=e=>{let t=k.find(({$content:n})=>document.contains(n));o.render(o.empty(P),o.render(o.html`<span class="enhancer--panel-view-title"></span>`,e.$icon,e.$title)),e.onFocus(),o.render(o.empty(se),e.$content),t&&t.onBlur()};async function nn(){await o.whenReady([".notion-frame"]),z=document.querySelector(".notion-frame"),_=o.html`<div id="enhancer--panel"></div>`,C=o.html`<div id="enhancer--panel-hover-trigger"></div>`,L=o.html`<div id="enhancer--panel-resize"><div></div></div>`,P=o.html`<div id="enhancer--panel-header-title"></div>`,Z=o.render(o.html`<div id="enhancer--panel-header"></div>`,P),se=o.html`<div id="enhancer--panel-content"></div>`,b=o.html`<div id="enhancer--panel-switcher"></div>`,oe=o.html`<div id="enhancer--panel-header-switcher" tabindex="0">
    ${Dt}
  </div>`,O=o.html`<div id="enhancer--panel-switcher-overlay-container"></div>`;let e='.notion-cursor-listener > div[style*="flex-end"]',t=()=>{document.contains(v)||(v=document.querySelector(e),W()&&v&&v.setAttribute(B,"true"))};v=document.querySelector(e),o.addDocumentObserver(t,[e]),await w.get(["panel.pinned"])&&R(),o.addHotkeyListener(await w.get(["panel.hotkey"]),R),U.addEventListener("click",r=>{r.stopPropagation(),R()}),o.render(_,o.render(Z,P,oe,U),se,L),await rn(),await sn();let n='.notion-cursor-listener > .notion-sidebar-container ~ [style^="position: absolute"]';await o.whenReady([n]),document.querySelector(n).before(C,_)}async function rn(){f=await w.get(["panel.width"],240),Ze(),L.addEventListener("mousedown",en),L.addEventListener("click",()=>{re?re=!1:R()})}async function sn(){Ue=document.querySelector(".notion-app-inner"),Z.addEventListener("click",Fe),oe.addEventListener("click",Fe),O.addEventListener("click",ie)}var Ve=async({id:e,icon:t,title:n,$content:r,onFocus:s=()=>{},onBlur:c=()=>{}})=>{Me||(Me=o.loadStylesheet("api/components/panel.css")),w||(w=await y.db("36a2ffc9-27ff-480e-84a7-c7700a7d232d")),U||(U=o.html`<div id="enhancer--panel-header-toggle" tabindex="0"><div>
      ${await N.feather("chevrons-right")}
    </div></div>`);let a={id:e,$icon:o.render(o.html`<span class="enhancer--panel-view-title-icon"></span>`,t instanceof Element?t:o.html`${t}`),$title:o.render(o.html`<span class="enhancer--panel-view-title-text"></span>`,n),$content:r,onFocus:s,onBlur:c};k.push(a),k.length===1&&await nn(),(k.length===1||await w.get(["panel.open"])===e)&&Ie(a)};"use strict";var Ke,q,Xe=async(e,t)=>{Ke||(Ke=o.loadStylesheet("api/components/corner-action.css"),q=o.html`<div id="enhancer--corner-actions"></div>`),await o.whenReady([".notion-help-button"]);let n=document.querySelector(".notion-help-button"),r=document.querySelector(".onboarding-checklist-button");r&&q.prepend(r),q.prepend(n),o.render(document.querySelector(".notion-app-inner > .notion-cursor-listener"),q);let s=o.html`<div class="enhancer--corner-action-button">${e}</div>`;return s.addEventListener("click",t),o.render(q,s),s};"use strict";"use strict";
