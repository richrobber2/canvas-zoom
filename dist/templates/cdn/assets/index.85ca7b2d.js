import{S as de,i as he,s as ge,F as q,B as g,O as E,f as B,I,p as M,a2 as me,G as J,E as le,x as oe,b as G,H as $,J as be,ag as sl,e as rl,D as L,a as te,o as T,c as P,m as Z,t as R,l as Q,k as W,n as X,j as ne,q as ze,A as x,V as U,y as ce,z as _e,v as il,a7 as ul,a8 as Ae,g as fl,h as ol}from"./index.7a68216a.js";import{U as cl}from"./Upload.c051b7dd.js";import{B as He}from"./Empty.svelte_svelte_type_style_lang.d7a3af78.js";/* empty css                                                    */import"./ModifyUpload.svelte_svelte_type_style_lang.e946db2d.js";import{d as _l}from"./dsv.7fe76a93.js";var je=Object.prototype.hasOwnProperty;function ae(a,e){var l,n;if(a===e)return!0;if(a&&e&&(l=a.constructor)===e.constructor){if(l===Date)return a.getTime()===e.getTime();if(l===RegExp)return a.toString()===e.toString();if(l===Array){if((n=a.length)===e.length)for(;n--&&ae(a[n],e[n]););return n===-1}if(!l||typeof a=="object"){n=0;for(l in a)if(je.call(a,l)&&++n&&!je.call(e,l)||!(l in e)||!ae(a[l],e[l]))return!1;return Object.keys(e).length===n}}return a!==a&&e!==e}function De(a){let e,l,n;return{c(){e=q("input"),g(e,"tabindex","-1"),e.value=a[0],g(e,"class","svelte-q8uklq"),E(e,"header",a[3])},m(t,r){B(t,e,r),a[7](e),l||(n=[I(e,"keydown",a[6]),I(e,"blur",a[8])],l=!0)},p(t,r){r&1&&e.value!==t[0]&&(e.value=t[0]),r&8&&E(e,"header",t[3])},d(t){t&&M(e),a[7](null),l=!1,me(n)}}}function dl(a){let e;return{c(){e=$(a[0])},m(l,n){B(l,e,n)},p(l,n){n&1&&be(e,l[0])},d(l){l&&M(e)}}}function hl(a){let e,l;return{c(){e=new sl(!1),l=rl(),e.a=l},m(n,t){e.m(a[0],n,t),B(n,l,t)},p(n,t){t&1&&e.p(n[0])},d(n){n&&M(l),n&&e.d()}}}function gl(a){let e,l,n,t,r=a[2]&&De(a);function c(i,f){return i[4]==="markdown"||i[4]==="html"?hl:dl}let d=c(a),b=d(a);return{c(){r&&r.c(),e=J(),l=q("span"),b.c(),g(l,"tabindex","-1"),g(l,"role","button"),g(l,"class","svelte-q8uklq"),E(l,"edit",a[2])},m(i,f){r&&r.m(i,f),B(i,e,f),B(i,l,f),b.m(l,null),n||(t=I(l,"dblclick",a[5]),n=!0)},p(i,[f]){i[2]?r?r.p(i,f):(r=De(i),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),d===(d=c(i))&&b?b.p(i,f):(b.d(1),b=d(i),b&&(b.c(),b.m(l,null))),f&4&&E(l,"edit",i[2])},i:le,o:le,d(i){r&&r.d(i),i&&M(e),i&&M(l),b.d(),n=!1,t()}}}function ml(a,e,l){let{edit:n}=e,{value:t=""}=e,{el:r}=e,{header:c=!1}=e,{datatype:d="str"}=e;function b(u){oe.call(this,a,u)}function i(u){oe.call(this,a,u)}function f(u){G[u?"unshift":"push"](()=>{r=u,l(1,r)})}const j=({currentTarget:u})=>{l(0,t=u.value),u.setAttribute("tabindex","-1")};return a.$$set=u=>{"edit"in u&&l(2,n=u.edit),"value"in u&&l(0,t=u.value),"el"in u&&l(1,r=u.el),"header"in u&&l(3,c=u.header),"datatype"in u&&l(4,d=u.datatype)},[t,r,n,c,d,b,i,f,j]}class Ne extends de{constructor(e){super(),he(this,e,ml,gl,ge,{edit:2,value:0,el:1,header:3,datatype:4})}}function Ee(a,e,l){const n=a.slice();return n[52]=e[l],n[54]=l,n}function Le(a,e,l){const n=a.slice();return n[55]=e[l].value,n[56]=e[l].id,n[57]=e,n[58]=l,n}function qe(a,e,l){const n=a.slice();return n[55]=e[l].value,n[56]=e[l].id,n[59]=e,n[54]=l,n}function Be(a){let e,l;return{c(){e=q("p"),l=$(a[1]),g(e,"class","svelte-8hrj8a")},m(n,t){B(n,e,t),L(e,l)},p(n,t){t[0]&2&&be(l,n[1])},d(n){n&&M(e)}}}function Me(a){let e,l;return{c(){e=q("caption"),l=$(a[1]),g(e,"class","sr-only")},m(n,t){B(n,e,t),L(e,l)},p(n,t){t[0]&2&&be(l,n[1])},d(n){n&&M(e)}}}function Te(a,e){let l,n,t,r,c,d,b,i,f,j,u,h=e[56],o,A,F;function m(S){e[30](S,e[56])}function k(){return e[31](e[56])}let p={value:e[55],edit:e[13]===e[56],header:!0};e[10][e[56]].input!==void 0&&(p.el=e[10][e[56]].input),t=new Ne({props:p}),G.push(()=>te(t,"el",m)),t.$on("keydown",e[21]),t.$on("dblclick",k);function w(){return e[32](e[54])}const C=()=>e[33](l,h),N=()=>e[33](null,h);return{key:a,first:null,c(){l=q("th"),n=q("div"),P(t.$$.fragment),c=J(),d=q("div"),b=x("svg"),i=x("path"),j=J(),g(i,"d","M4.49999 0L8.3971 6.75H0.602875L4.49999 0Z"),g(b,"width","1em"),g(b,"height","1em"),g(b,"viewBox","0 0 9 7"),g(b,"fill","none"),g(b,"xmlns","http://www.w3.org/2000/svg"),g(b,"class","svelte-8hrj8a"),g(d,"class",f="sort-button "+e[11]+" svelte-8hrj8a"),E(d,"sorted",e[12]===e[54]),E(d,"des",e[12]===e[54]&&e[11]==="des"),g(n,"class","cell-wrap svelte-8hrj8a"),g(l,"aria-sort",u=e[15](e[55],e[12],e[11])),g(l,"class","svelte-8hrj8a"),E(l,"editing",e[13]===e[56]),this.first=l},m(S,O){B(S,l,O),L(l,n),Z(t,n,null),L(n,c),L(n,d),L(d,b),L(b,i),L(l,j),C(),o=!0,A||(F=I(d,"click",w),A=!0)},p(S,O){e=S;const V={};O[0]&256&&(V.value=e[55]),O[0]&8448&&(V.edit=e[13]===e[56]),!r&&O[0]&1280&&(r=!0,V.el=e[10][e[56]].input,ne(()=>r=!1)),t.$set(V),(!o||O[0]&2048&&f!==(f="sort-button "+e[11]+" svelte-8hrj8a"))&&g(d,"class",f),O[0]&6400&&E(d,"sorted",e[12]===e[54]),O[0]&6400&&E(d,"des",e[12]===e[54]&&e[11]==="des"),(!o||O[0]&6400&&u!==(u=e[15](e[55],e[12],e[11])))&&g(l,"aria-sort",u),h!==e[56]&&(N(),h=e[56],C()),O[0]&8448&&E(l,"editing",e[13]===e[56])},i(S){o||(T(t.$$.fragment,S),o=!0)},o(S){R(t.$$.fragment,S),o=!1},d(S){S&&M(l),Q(t),N(),A=!1,F()}}}function Ce(a,e){let l,n,t,r,c,d=e[56],b,i,f;function j(w){e[34](w,e[55],e[57],e[58])}function u(w){e[35](w,e[56])}let h={edit:e[6]===e[56],datatype:Array.isArray(e[0])?e[0][e[58]]:e[0]};e[55]!==void 0&&(h.value=e[55]),e[10][e[56]].input!==void 0&&(h.el=e[10][e[56]].input),t=new Ne({props:h}),G.push(()=>te(t,"value",j)),G.push(()=>te(t,"el",u));const o=()=>e[36](l,d),A=()=>e[36](null,d);function F(){return e[37](e[56])}function m(){return e[38](e[56])}function k(){return e[39](e[56])}function p(...w){return e[40](e[54],e[58],e[56],...w)}return{key:a,first:null,c(){l=q("td"),n=q("div"),P(t.$$.fragment),g(n,"class","cell-wrap svelte-8hrj8a"),E(n,"border-transparent",e[7]!==e[56]),g(l,"tabindex","0"),g(l,"class","svelte-8hrj8a"),this.first=l},m(w,C){B(w,l,C),L(l,n),Z(t,n,null),o(),b=!0,i||(f=[I(l,"touchstart",F,{passive:!0}),I(l,"click",m),I(l,"dblclick",k),I(l,"keydown",p)],i=!0)},p(w,C){e=w;const N={};C[0]&576&&(N.edit=e[6]===e[56]),C[0]&513&&(N.datatype=Array.isArray(e[0])?e[0][e[58]]:e[0]),!r&&C[0]&512&&(r=!0,N.value=e[55],ne(()=>r=!1)),!c&&C[0]&1536&&(c=!0,N.el=e[10][e[56]].input,ne(()=>c=!1)),t.$set(N),C[0]&640&&E(n,"border-transparent",e[7]!==e[56]),d!==e[56]&&(A(),d=e[56],o())},i(w){b||(T(t.$$.fragment,w),b=!0)},o(w){R(t.$$.fragment,w),b=!1},d(w){w&&M(l),Q(t),A(),i=!1,me(f)}}}function Fe(a,e){let l,n=[],t=new Map,r,c,d=e[52];const b=i=>i[56];for(let i=0;i<d.length;i+=1){let f=Le(e,d,i),j=b(f);t.set(j,n[i]=Ce(j,f))}return{key:a,first:null,c(){l=q("tr");for(let i=0;i<n.length;i+=1)n[i].c();r=J(),g(l,"class","svelte-8hrj8a"),this.first=l},m(i,f){B(i,l,f);for(let j=0;j<n.length;j+=1)n[j].m(l,null);L(l,r),c=!0},p(i,f){e=i,f[0]&460481&&(d=e[52],W(),n=ce(n,f,b,1,e,d,t,l,_e,Ce,r,Le),X())},i(i){if(!c){for(let f=0;f<d.length;f+=1)T(n[f]);c=!0}},o(i){for(let f=0;f<n.length;f+=1)R(n[f]);c=!1},d(i){i&&M(l);for(let f=0;f<n.length;f+=1)n[f].d()}}}function bl(a){let e,l,n,t,r=[],c=new Map,d,b,i=[],f=new Map,j,u=a[1]&&a[1].length!==0&&Me(a),h=a[8];const o=m=>m[56];for(let m=0;m<h.length;m+=1){let k=qe(a,h,m),p=o(k);c.set(p,r[m]=Te(p,k))}let A=a[9];const F=m=>m[52];for(let m=0;m<A.length;m+=1){let k=Ee(a,A,m),p=F(k);f.set(p,i[m]=Fe(p,k))}return{c(){e=q("table"),u&&u.c(),l=J(),n=q("thead"),t=q("tr");for(let m=0;m<r.length;m+=1)r[m].c();d=J(),b=q("tbody");for(let m=0;m<i.length;m+=1)i[m].c();g(t,"class","svelte-8hrj8a"),g(n,"class","svelte-8hrj8a"),g(b,"class","svelte-8hrj8a"),g(e,"class","svelte-8hrj8a"),E(e,"dragging",a[14])},m(m,k){B(m,e,k),u&&u.m(e,null),L(e,l),L(e,n),L(n,t);for(let p=0;p<r.length;p+=1)r[p].m(t,null);L(e,d),L(e,b);for(let p=0;p<i.length;p+=1)i[p].m(b,null);j=!0},p(m,k){m[1]&&m[1].length!==0?u?u.p(m,k):(u=Me(m),u.c(),u.m(e,l)):u&&(u.d(1),u=null),k[0]&3718400&&(h=m[8],W(),r=ce(r,k,o,1,m,h,c,t,_e,Te,null,qe),X()),k[0]&460481&&(A=m[9],W(),i=ce(i,k,F,1,m,A,f,b,_e,Fe,null,Ee),X()),k[0]&16384&&E(e,"dragging",m[14])},i(m){if(!j){for(let k=0;k<h.length;k+=1)T(r[k]);for(let k=0;k<A.length;k+=1)T(i[k]);j=!0}},o(m){for(let k=0;k<r.length;k+=1)R(r[k]);for(let k=0;k<i.length;k+=1)R(i[k]);j=!1},d(m){m&&M(e),u&&u.d();for(let k=0;k<r.length;k+=1)r[k].d();for(let k=0;k<i.length;k+=1)i[k].d()}}}function Oe(a){let e,l,n,t=a[3][1]==="dynamic"&&Re(a),r=a[2][1]==="dynamic"&&Se(a);return{c(){e=q("div"),t&&t.c(),l=J(),r&&r.c(),g(e,"class","controls-wrap svelte-8hrj8a")},m(c,d){B(c,e,d),t&&t.m(e,null),L(e,l),r&&r.m(e,null),n=!0},p(c,d){c[3][1]==="dynamic"?t?(t.p(c,d),d[0]&8&&T(t,1)):(t=Re(c),t.c(),T(t,1),t.m(e,l)):t&&(W(),R(t,1,1,()=>{t=null}),X()),c[2][1]==="dynamic"?r?(r.p(c,d),d[0]&4&&T(r,1)):(r=Se(c),r.c(),T(r,1),r.m(e,null)):r&&(W(),R(r,1,1,()=>{r=null}),X())},i(c){n||(T(t),T(r),n=!0)},o(c){R(t),R(r),n=!1},d(c){c&&M(e),t&&t.d(),r&&r.d()}}}function Re(a){let e,l,n;return l=new He({props:{variant:"secondary",size:"sm",$$slots:{default:[pl]},$$scope:{ctx:a}}}),l.$on("click",a[43]),{c(){e=q("span"),P(l.$$.fragment),g(e,"class","button-wrap svelte-8hrj8a")},m(t,r){B(t,e,r),Z(l,e,null),n=!0},p(t,r){const c={};r[1]&536870912&&(c.$$scope={dirty:r,ctx:t}),l.$set(c)},i(t){n||(T(l.$$.fragment,t),n=!0)},o(t){R(l.$$.fragment,t),n=!1},d(t){t&&M(e),Q(l)}}}function pl(a){let e,l,n;return{c(){e=x("svg"),l=x("path"),n=$(`
						New row`),g(l,"fill","currentColor"),g(l,"d","M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10l10-10l-1.41-1.41z"),g(e,"xmlns","http://www.w3.org/2000/svg"),g(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),g(e,"aria-hidden","true"),g(e,"role","img"),g(e,"width","1em"),g(e,"height","1em"),g(e,"preserveAspectRatio","xMidYMid meet"),g(e,"viewBox","0 0 32 32"),g(e,"class","svelte-8hrj8a")},m(t,r){B(t,e,r),L(e,l),B(t,n,r)},p:le,d(t){t&&M(e),t&&M(n)}}}function Se(a){let e,l,n;return l=new He({props:{variant:"secondary",size:"sm",$$slots:{default:[wl]},$$scope:{ctx:a}}}),l.$on("click",a[23]),{c(){e=q("span"),P(l.$$.fragment),g(e,"class","button-wrap svelte-8hrj8a")},m(t,r){B(t,e,r),Z(l,e,null),n=!0},p(t,r){const c={};r[1]&536870912&&(c.$$scope={dirty:r,ctx:t}),l.$set(c)},i(t){n||(T(l.$$.fragment,t),n=!0)},o(t){R(l.$$.fragment,t),n=!1},d(t){t&&M(e),Q(l)}}}function wl(a){let e,l,n;return{c(){e=x("svg"),l=x("path"),n=$(`
						New column`),g(l,"fill","currentColor"),g(l,"d","m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"),g(e,"xmlns","http://www.w3.org/2000/svg"),g(e,"xmlns:xlink","http://www.w3.org/1999/xlink"),g(e,"aria-hidden","true"),g(e,"role","img"),g(e,"width","1em"),g(e,"height","1em"),g(e,"preserveAspectRatio","xMidYMid meet"),g(e,"viewBox","0 0 32 32"),g(e,"class","svelte-8hrj8a")},m(t,r){B(t,e,r),L(e,l),B(t,n,r)},p:le,d(t){t&&M(e),t&&M(n)}}}function kl(a){let e,l,n,t,r,c,d,b,i,f=a[1]&&a[1].length!==0&&Be(a);function j(o){a[41](o)}let u={flex:!1,center:!1,boundedheight:!1,disable_click:!0,$$slots:{default:[bl]},$$scope:{ctx:a}};a[14]!==void 0&&(u.dragging=a[14]),t=new cl({props:u}),G.push(()=>te(t,"dragging",j)),t.$on("load",a[42]);let h=a[4]&&Oe(a);return{c(){e=q("div"),f&&f.c(),l=J(),n=q("div"),P(t.$$.fragment),c=J(),h&&h.c(),g(n,"class","table-wrap scroll-hide svelte-8hrj8a"),E(n,"dragging",a[14]),E(n,"no-wrap",!a[5]),g(e,"class","svelte-8hrj8a"),E(e,"label",a[1]&&a[1].length!==0)},m(o,A){B(o,e,A),f&&f.m(e,null),L(e,l),L(e,n),Z(t,n,null),L(e,c),h&&h.m(e,null),d=!0,b||(i=[I(window,"click",a[24]),I(window,"touchstart",a[24])],b=!0)},p(o,A){o[1]&&o[1].length!==0?f?f.p(o,A):(f=Be(o),f.c(),f.m(e,l)):f&&(f.d(1),f=null);const F={};A[0]&32707|A[1]&536870912&&(F.$$scope={dirty:A,ctx:o}),!r&&A[0]&16384&&(r=!0,F.dragging=o[14],ne(()=>r=!1)),t.$set(F),A[0]&16384&&E(n,"dragging",o[14]),A[0]&32&&E(n,"no-wrap",!o[5]),o[4]?h?(h.p(o,A),A[0]&16&&T(h,1)):(h=Oe(o),h.c(),T(h,1),h.m(e,null)):h&&(W(),R(h,1,1,()=>{h=null}),X()),A[0]&2&&E(e,"label",o[1]&&o[1].length!==0)},i(o){d||(T(t.$$.fragment,o),T(h),d=!0)},o(o){R(t.$$.fragment,o),R(h),d=!1},d(o){o&&M(e),f&&f.d(),Q(t),h&&h.d(),b=!1,me(i)}}}function yl(a,e){return e.filter(l);function l(n){var t=-1;return a.split(`
`).every(r);function r(c){if(!c)return!0;var d=c.split(n).length;return t<0&&(t=d),t===d&&d>1}}}function vl(a){const e=atob(a.split(",")[1]),l=a.split(",")[0].split(":")[1].split(";")[0],n=new ArrayBuffer(e.length),t=new Uint8Array(n);for(let r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return new Blob([n],{type:l})}function Al(a,e,l){let{datatype:n}=e,{label:t=null}=e,{headers:r=[]}=e,{values:c=[[]]}=e,{col_count:d}=e,{row_count:b}=e,{editable:i=!0}=e,{wrap:f=!1}=e;const j=ze();let u=!1,h=!1,o={};function A(s){let _=s||[];if(d[1]==="fixed"&&_.length<d[0]){const y=Array(d[0]-_.length).fill("").map((v,D)=>`${D+_.length}`);_=_.concat(y)}return!_||_.length===0?Array(d[0]).fill(0).map((y,v)=>{const D=`h-${v}`;return l(10,o[D]={cell:null,input:null},o),{id:D,value:JSON.stringify(v+1)}}):_.map((y,v)=>{const D=`h-${v}`;return l(10,o[D]={cell:null,input:null},o),{id:D,value:y??""}})}function F(s){const _=s.length>0?s.length:b[0];return Array(b[1]==="fixed"||_<b[0]?b[0]:_).fill(0).map((y,v)=>Array(d[1]==="fixed"?d[0]:s[0].length).fill(0).map((D,H)=>{const K=`${v}-${H}`;return l(10,o[K]={input:null,cell:null},o),{value:s?.[v]?.[H]??"",id:K}}))}let m=A(r),k;async function p(){typeof u=="string"?(await U(),o[u]?.input?.focus()):typeof h=="string"&&(await U(),o[h]?.input?.focus())}let w=[[]],C;function N(s,_,y){if(!_)return"none";if(r[_]===s){if(y==="asc")return"ascending";if(y==="des")return"descending"}}function S(s){return w.reduce((_,y,v)=>{const D=y.reduce((H,K,ue)=>s===K.id?ue:H,-1);return D===-1?_:[v,D]},[-1,-1])}async function O(s,_){if(!i||u===s)return;if(_){const[v,D]=S(s);l(9,w[v][D].value="",w)}l(6,u=s),await U();const{input:y}=o[s];y?.focus()}async function V(s,_,y,v){let D;switch(s.key){case"ArrowRight":if(u)break;s.preventDefault(),D=w[_][y+1],l(7,h=D?D.id:h);break;case"ArrowLeft":if(u)break;s.preventDefault(),D=w[_][y-1],l(7,h=D?D.id:h);break;case"ArrowDown":if(u)break;s.preventDefault(),D=w[_+1],l(7,h=D?D[y].id:h);break;case"ArrowUp":if(u)break;s.preventDefault(),D=w[_-1],l(7,h=D?D[y].id:h);break;case"Escape":if(!i)break;s.preventDefault(),l(7,h=u),l(6,u=!1);break;case"Enter":if(!i)break;if(s.preventDefault(),s.shiftKey){re(_),await U();const[al]=S(v);l(7,h=w[al+1][y].id)}else u===v?l(6,u=!1):O(v);break;case"Backspace":if(!i)break;u||(s.preventDefault(),l(9,w[_][y].value="",w));break;case"Delete":if(!i)break;u||(s.preventDefault(),l(9,w[_][y].value="",w));break;case"Tab":let H=s.shiftKey?-1:1,K=w[_][y+H],ue=w?.[_+H]?.[H>0?0:m.length-1],fe=K||ue;fe&&(s.preventDefault(),l(7,h=fe?fe.id:h)),l(6,u=!1);break;default:(!u||u&&u!==v)&&s.key.length===1&&O(v,!0);break}}async function pe(s){u!==s&&h!==s&&(l(6,u=!1),l(7,h=s))}async function we(s,_){if(_==="edit"&&typeof s=="string"&&(await U(),o[s].input?.focus()),_==="edit"&&typeof s=="boolean"&&typeof h=="string"){let y=o[h]?.cell;await U(),y?.focus()}if(_==="select"&&typeof s=="string"){const{cell:y}=o[s];await U(),y?.focus()}}let Y,ee;function Ue(s,_){_==="asc"?l(9,w=w.sort((y,v)=>y[s].value<v[s].value?-1:1)):_==="des"&&l(9,w=w.sort((y,v)=>y[s].value>v[s].value?-1:1))}function ke(s){typeof ee!="number"||ee!==s?(l(11,Y="asc"),l(12,ee=s)):Y==="asc"?l(11,Y="des"):Y==="des"&&l(11,Y="asc"),Ue(s,Y)}let z;function ye(){if(typeof h=="string"){const s=o[h].input?.value;if(m.find(_=>_.id===h)){let _=m.find(y=>y.id===h);s&&(_.value=s)}else s&&m.push({id:h,value:s})}}async function se(s,_){!i||d[1]!=="dynamic"||u===s||(l(13,z=s),await U(),o[s].input?.focus(),_&&o[s].input?.select())}function Ie(s){if(!!i)switch(s.key){case"Escape":case"Enter":case"Tab":s.preventDefault(),l(7,h=z),l(13,z=!1),ye();break}}function re(s){b[1]==="dynamic"&&(w.splice(s?s+1:w.length,0,Array(w[0].length).fill(0).map((_,y)=>{const v=`${w.length}-${y}`;return l(10,o[v]={cell:null,input:null},o),{id:v,value:""}})),l(9,w),l(27,c),l(29,C),l(26,r))}async function Je(){if(d[1]!=="dynamic")return;for(let _=0;_<w.length;_++){const y=`${_}-${w[_].length}`;l(10,o[y]={cell:null,input:null},o),w[_].push({id:y,value:""})}const s=`h-${m.length}`;l(10,o[s]={cell:null,input:null},o),m.push({id:s,value:`Header ${m.length+1}`}),l(9,w),l(27,c),l(29,C),l(26,r),l(8,m),l(26,r),l(28,k),l(27,c),await U(),se(s,!0)}function Ke(s){typeof u=="string"&&o[u]&&o[u].cell!==s.target&&!o[u].cell?.contains(s?.target)&&l(6,u=!1),typeof z=="string"&&o[z]&&o[z].cell!==s.target&&!o[z].cell?.contains(s.target)&&(l(7,h=z),l(13,z=!1),ye(),l(13,z=!1))}function ve(s){const _=new FileReader;function y(v){if(!v?.target?.result||typeof v.target.result!="string")return;const[D]=yl(v.target.result,[",","	"]),[H,...K]=_l(D).parseRows(v.target.result);l(8,m=A(d[1]==="fixed"?H.slice(0,d[0]):H)),l(27,c=K),_.removeEventListener("loadend",y)}_.addEventListener("loadend",y),_.readAsText(s)}let ie=!1;function Ve(s,_){a.$$.not_equal(o[_].input,s)&&(o[_].input=s,l(10,o))}const Ye=s=>se(s),Ge=s=>ke(s);function Pe(s,_){G[s?"unshift":"push"](()=>{o[_].cell=s,l(10,o)})}function Ze(s,_,y,v){y[v].value=s,l(9,w),l(27,c),l(29,C),l(26,r)}function Qe(s,_){a.$$.not_equal(o[_].input,s)&&(o[_].input=s,l(10,o))}function We(s,_){G[s?"unshift":"push"](()=>{o[_].cell=s,l(10,o)})}const Xe=s=>O(s),xe=s=>pe(s),$e=s=>O(s),el=(s,_,y,v)=>V(v,s,_,y);function ll(s){ie=s,l(14,ie)}const tl=s=>ve(vl(s.detail.data)),nl=()=>re();return a.$$set=s=>{"datatype"in s&&l(0,n=s.datatype),"label"in s&&l(1,t=s.label),"headers"in s&&l(26,r=s.headers),"values"in s&&l(27,c=s.values),"col_count"in s&&l(2,d=s.col_count),"row_count"in s&&l(3,b=s.row_count),"editable"in s&&l(4,i=s.editable),"wrap"in s&&l(5,f=s.wrap)},a.$$.update=()=>{if(a.$$.dirty[0]&201326592&&(c&&!Array.isArray(c)?(l(26,r=c.headers),l(27,c=c.data.length===0?[Array(r.length).fill("")]:c.data)):c===null?l(27,c=[Array(r.length).fill("")]):(l(27,c),l(26,r))),a.$$.dirty[0]&671088640&&(ae(c,C)||(l(9,w=F(c)),l(29,C=c),p())),a.$$.dirty[0]&640&&h!==!1){const s=h.split("-"),_=parseInt(s[0]),y=parseInt(s[1]);j("select",{index:[_,y],value:w[_][y].value})}a.$$.dirty[0]&335544320&&(ae(r,k)||(l(8,m=A(r)),l(28,k=r),p())),a.$$.dirty[0]&768&&m&&j("change",{data:w.map(s=>s.map(({value:_})=>_)),headers:m.map(s=>s.value)}),a.$$.dirty[0]&64&&we(u,"edit"),a.$$.dirty[0]&128&&we(h,"select")},[n,t,d,b,i,f,u,h,m,w,o,Y,ee,z,ie,N,O,V,pe,ke,se,Ie,re,Je,Ke,ve,r,c,k,C,Ve,Ye,Ge,Pe,Ze,Qe,We,Xe,xe,$e,el,ll,tl,nl]}class jl extends de{constructor(e){super(),he(this,e,Al,kl,ge,{datatype:0,label:1,headers:26,values:27,col_count:2,row_count:3,editable:4,wrap:5},null,[-1,-1])}}function Dl(a){let e,l,n,t,r,c;const d=[a[11]];let b={};for(let i=0;i<d.length;i+=1)b=il(b,d[i]);return l=new ul({props:b}),t=new jl({props:{label:a[8],row_count:a[7],col_count:a[6],values:a[0],headers:a[1],editable:a[5]==="dynamic",wrap:a[9],datatype:a[10]}}),t.$on("change",a[13]),t.$on("select",a[14]),{c(){e=q("div"),P(l.$$.fragment),n=J(),P(t.$$.fragment),g(e,"id",a[2]),g(e,"class",r=Ae(a[3].join(" "))+" svelte-1nw9bhs"),E(e,"hide",!a[4])},m(i,f){B(i,e,f),Z(l,e,null),L(e,n),Z(t,e,null),c=!0},p(i,[f]){const j=f&2048?fl(d,[ol(i[11])]):{};l.$set(j);const u={};f&256&&(u.label=i[8]),f&128&&(u.row_count=i[7]),f&64&&(u.col_count=i[6]),f&1&&(u.values=i[0]),f&2&&(u.headers=i[1]),f&32&&(u.editable=i[5]==="dynamic"),f&512&&(u.wrap=i[9]),f&1024&&(u.datatype=i[10]),t.$set(u),(!c||f&4)&&g(e,"id",i[2]),(!c||f&8&&r!==(r=Ae(i[3].join(" "))+" svelte-1nw9bhs"))&&g(e,"class",r),f&24&&E(e,"hide",!i[4])},i(i){c||(T(l.$$.fragment,i),T(t.$$.fragment,i),c=!0)},o(i){R(l.$$.fragment,i),R(t.$$.fragment,i),c=!1},d(i){i&&M(e),Q(l),Q(t)}}}function El(a,e,l){let{headers:n=[]}=e,{elem_id:t=""}=e,{elem_classes:r=[]}=e,{visible:c=!0}=e,{value:d={data:[["","",""]],headers:["1","2","3"]}}=e,{mode:b}=e,{col_count:i}=e,{row_count:f}=e,{label:j=null}=e,{wrap:u}=e,{datatype:h}=e;const o=ze();let{loading_status:A}=e;async function F(p){l(0,d=p),await U(),o("change",p)}const m=({detail:p})=>F(p);function k(p){oe.call(this,a,p)}return a.$$set=p=>{"headers"in p&&l(1,n=p.headers),"elem_id"in p&&l(2,t=p.elem_id),"elem_classes"in p&&l(3,r=p.elem_classes),"visible"in p&&l(4,c=p.visible),"value"in p&&l(0,d=p.value),"mode"in p&&l(5,b=p.mode),"col_count"in p&&l(6,i=p.col_count),"row_count"in p&&l(7,f=p.row_count),"label"in p&&l(8,j=p.label),"wrap"in p&&l(9,u=p.wrap),"datatype"in p&&l(10,h=p.datatype),"loading_status"in p&&l(11,A=p.loading_status)},[d,n,t,r,c,b,i,f,j,u,h,A,F,m,k]}class Ll extends de{constructor(e){super(),he(this,e,El,Dl,ge,{headers:1,elem_id:2,elem_classes:3,visible:4,value:0,mode:5,col_count:6,row_count:7,label:8,wrap:9,datatype:10,loading_status:11})}}var Ol=Ll;const Rl=["static","dynamic"],Sl=a=>({type:{payload:"{ data: Array<Array<string | number>>; headers: Array<string> }"},description:{payload:"an object with an array of data and an array of headers"},example_data:a.value});export{Ol as Component,Sl as document,Rl as modes};
//# sourceMappingURL=index.85ca7b2d.js.map
