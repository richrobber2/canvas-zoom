import{S as G,i as J,s as K,F as B,B as g,C as U,f as C,I as j,a9 as _e,G as E,H as Y,O as A,D as k,J as Z,p as R,a3 as ve,ah as te,N as de,e as he,o as y,k as ee,t as D,n as le,q as me,ai as se,b as ne,A as X,E as I,a as ge,c as q,m as z,M as ie,j as be,l as H,a2 as ke,v as pe,a7 as Oe,g as Ae,h as ye,x as ae}from"./index.a7e12ebe.js";/* empty css                                                  */import{a as Be}from"./Empty.svelte_svelte_type_style_lang.74438aac.js";import{B as De}from"./BlockTitle.31066e24.js";/* empty css                                                    */import"./Info.31d8a7de.js";function oe(n,e,l){const s=n.slice();return s[15]=e[l],s}function fe(n){let e,l,s,f,r,u=n[1],t=[];for(let i=0;i<u.length;i+=1)t[i]=ue(oe(n,u,i));return{c(){e=B("ul");for(let i=0;i<t.length;i+=1)t[i].c();g(e,"class","options svelte-1oas11n"),g(e,"aria-expanded",n[2]),U(e,"top",n[6],!1),U(e,"bottom",n[7],!1),U(e,"max-height",`calc(${n[8]}px - var(--window-padding))`,!1)},m(i,c){C(i,e,c);for(let a=0;a<t.length;a+=1)t[a].m(e,null);s=!0,f||(r=j(e,"mousedown",_e(n[14])),f=!0)},p(i,c){if(c&11){u=i[1];let a;for(a=0;a<u.length;a+=1){const _=oe(i,u,a);t[a]?t[a].p(_,c):(t[a]=ue(_),t[a].c(),t[a].m(e,null))}for(;a<t.length;a+=1)t[a].d(1);t.length=u.length}(!s||c&4)&&g(e,"aria-expanded",i[2]),c&64&&U(e,"top",i[6],!1),c&128&&U(e,"bottom",i[7],!1),c&256&&U(e,"max-height",`calc(${i[8]}px - var(--window-padding))`,!1)},i(i){s||(ve(()=>{l||(l=te(e,se,{duration:200,y:5},!0)),l.run(1)}),s=!0)},o(i){l||(l=te(e,se,{duration:200,y:5},!1)),l.run(0),s=!1},d(i){i&&R(e),de(t,i),i&&l&&l.end(),f=!1,r()}}}function ue(n){let e,l,s,f=n[15]+"",r,u,t,i;return{c(){e=B("li"),l=B("span"),l.textContent="\u2713",s=E(),r=Y(f),u=E(),g(l,"class","inner-item pr-1 svelte-1oas11n"),A(l,"hide",!(Array.isArray(n[0])?n[0]:[n[0]])?.includes(n[15])),g(e,"class","item svelte-1oas11n"),g(e,"role","button"),g(e,"data-value",t=n[15]),g(e,"aria-label",i=n[15]),A(e,"selected",n[0]?.includes(n[15])),A(e,"active",n[3]===n[15]),A(e,"bg-gray-100",n[3]===n[15]),A(e,"dark:bg-gray-600",n[3]===n[15])},m(c,a){C(c,e,a),k(e,l),k(e,s),k(e,r),k(e,u)},p(c,a){a&3&&A(l,"hide",!(Array.isArray(c[0])?c[0]:[c[0]])?.includes(c[15])),a&2&&f!==(f=c[15]+"")&&Z(r,f),a&2&&t!==(t=c[15])&&g(e,"data-value",t),a&2&&i!==(i=c[15])&&g(e,"aria-label",i),a&3&&A(e,"selected",c[0]?.includes(c[15])),a&10&&A(e,"active",c[3]===c[15]),a&10&&A(e,"bg-gray-100",c[3]===c[15]),a&10&&A(e,"dark:bg-gray-600",c[3]===c[15])},d(c){c&&R(e)}}}function Ce(n){let e,l,s,f,r=n[2]&&!n[4]&&fe(n);return{c(){e=B("div"),l=E(),r&&r.c(),s=he(),g(e,"class","reference")},m(u,t){C(u,e,t),n[13](e),C(u,l,t),r&&r.m(u,t),C(u,s,t),f=!0},p(u,[t]){u[2]&&!u[4]?r?(r.p(u,t),t&20&&y(r,1)):(r=fe(u),r.c(),y(r,1),r.m(s.parentNode,s)):r&&(ee(),D(r,1,1,()=>{r=null}),le())},i(u){f||(y(r),f=!0)},o(u){D(r),f=!1},d(u){u&&R(e),n[13](null),u&&R(l),r&&r.d(u),u&&R(s)}}}function Re(n,e,l){let{value:s=void 0}=e,{filtered:f}=e,{showOptions:r=!1}=e,{activeOption:u}=e,{disabled:t=!1}=e,i,c,a,_,O,h,m;const v=me();function p(w){ne[w?"unshift":"push"](()=>{_=w,l(5,_)})}const L=w=>v("change",w);return n.$$set=w=>{"value"in w&&l(0,s=w.value),"filtered"in w&&l(1,f=w.filtered),"showOptions"in w&&l(2,r=w.showOptions),"activeOption"in w&&l(3,u=w.activeOption),"disabled"in w&&l(4,t=w.disabled)},n.$$.update=()=>{n.$$.dirty&7204&&(r&&_&&(l(10,i=_.getBoundingClientRect().top),l(11,c=window.innerHeight-_.getBoundingClientRect().bottom),l(12,a=_.parentElement?.getBoundingClientRect().height||0)),c>i?(l(6,O=`${a}px`),l(8,m=c),l(7,h=null)):(l(7,h=`${a}px`),l(8,m=i-a),l(6,O=null)))},[s,f,r,u,t,_,O,h,m,v,i,c,a,p,L]}class Ee extends G{constructor(e){super(),J(this,e,Re,Ce,K,{value:0,filtered:1,showOptions:2,activeOption:3,disabled:4})}}function Me(n){let e,l;return{c(){e=X("svg"),l=X("path"),g(l,"d","M5 8l4 4 4-4z"),g(e,"class","dropdown-arrow svelte-p5edak"),g(e,"xmlns","http://www.w3.org/2000/svg"),g(e,"width","18"),g(e,"height","18"),g(e,"viewBox","0 0 18 18")},m(s,f){C(s,e,f),k(e,l)},p:I,i:I,o:I,d(s){s&&R(e)}}}class Le extends G{constructor(e){super(),J(this,e,null,Me,K,{})}}function Ne(n){let e,l;return{c(){e=X("svg"),l=X("path"),g(l,"d","M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"),g(e,"xmlns","http://www.w3.org/2000/svg"),g(e,"width","16"),g(e,"height","16"),g(e,"viewBox","0 0 24 24")},m(s,f){C(s,e,f),k(e,l)},p:I,i:I,o:I,d(s){s&&R(e)}}}class we extends G{constructor(e){super(),J(this,e,null,Ne,K,{})}}function re(n,e,l){const s=n.slice();return s[25]=e[l],s}function Se(n){let e;return{c(){e=Y(n[1])},m(l,s){C(l,e,s)},p(l,s){s&2&&Z(e,l[1])},d(l){l&&R(e)}}}function je(n){let e,l;return{c(){e=B("span"),l=Y(n[0]),g(e,"class","single-select svelte-a6vu2r")},m(s,f){C(s,e,f),k(e,l)},p(s,f){f&1&&Z(l,s[0])},i:I,o:I,d(s){s&&R(e)}}}function qe(n){let e,l,s=n[0],f=[];for(let u=0;u<s.length;u+=1)f[u]=ce(re(n,s,u));const r=u=>D(f[u],1,1,()=>{f[u]=null});return{c(){for(let u=0;u<f.length;u+=1)f[u].c();e=he()},m(u,t){for(let i=0;i<f.length;i+=1)f[i].m(u,t);C(u,e,t),l=!0},p(u,t){if(t&1033){s=u[0];let i;for(i=0;i<s.length;i+=1){const c=re(u,s,i);f[i]?(f[i].p(c,t),y(f[i],1)):(f[i]=ce(c),f[i].c(),y(f[i],1),f[i].m(e.parentNode,e))}for(ee(),i=s.length;i<f.length;i+=1)r(i);le()}},i(u){if(!l){for(let t=0;t<s.length;t+=1)y(f[t]);l=!0}},o(u){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)D(f[t]);l=!1},d(u){de(f,u),u&&R(e)}}}function ce(n){let e,l,s=n[25]+"",f,r,u,t,i,c,a,_,O;t=new we({});function h(){return n[17](n[25])}return{c(){e=B("div"),l=B("span"),f=Y(s),r=E(),u=B("div"),q(t.$$.fragment),c=E(),g(l,"class","svelte-a6vu2r"),g(u,"class","token-remove svelte-a6vu2r"),g(u,"title",i="Remove "+n[25]),A(u,"hidden",n[3]),g(e,"class","token svelte-a6vu2r")},m(m,v){C(m,e,v),k(e,l),k(l,f),k(e,r),k(e,u),z(t,u,null),k(e,c),a=!0,_||(O=j(e,"click",_e(h)),_=!0)},p(m,v){n=m,(!a||v&1)&&s!==(s=n[25]+"")&&Z(f,s),(!a||v&1&&i!==(i="Remove "+n[25]))&&g(u,"title",i),v&8&&A(u,"hidden",n[3])},i(m){a||(y(t.$$.fragment,m),a=!0)},o(m){D(t.$$.fragment,m),a=!1},d(m){m&&R(e),H(t),_=!1,O()}}}function ze(n){let e,l,s,f,r,u,t,i,c,a,_,O,h,m,v,p,L,w,d,N,F,V;l=new De({props:{show_label:n[4],info:n[2],$$slots:{default:[Se]},$$scope:{ctx:n}}});const P=[qe,je],M=[];function Q(o,b){return b&1&&(u=null),u==null&&(u=!!Array.isArray(o[0])),u?0:1}t=Q(n,-1),i=M[t]=P[t](n),m=new we({}),p=new Le({});function x(o){n[22](o)}let W={showOptions:n[8],filtered:n[7],activeOption:n[6],disabled:n[3]};return n[0]!==void 0&&(W.value=n[0]),w=new Ee({props:W}),ne.push(()=>ge(w,"value",x)),w.$on("change",n[12]),{c(){e=B("label"),q(l.$$.fragment),s=E(),f=B("div"),r=B("div"),i.c(),c=E(),a=B("div"),_=B("input"),O=E(),h=B("div"),q(m.$$.fragment),v=E(),q(p.$$.fragment),L=E(),q(w.$$.fragment),g(_,"class","border-none svelte-a6vu2r"),_.disabled=n[3],_.readOnly=n[9],g(_,"autocomplete","off"),g(h,"class","token-remove remove-all svelte-a6vu2r"),g(h,"title","Remove All"),A(h,"hide",!n[0]?.length||n[3]),g(a,"class","secondary-wrap svelte-a6vu2r"),g(r,"class","wrap-inner svelte-a6vu2r"),A(r,"showOptions",n[8]),g(f,"class","wrap svelte-a6vu2r")},m(o,b){C(o,e,b),z(l,e,null),k(e,s),k(e,f),k(f,r),M[t].m(r,null),k(r,c),k(r,a),k(a,_),ie(_,n[5]),k(a,O),k(a,h),z(m,h,null),k(a,v),z(p,a,null),k(f,L),z(w,f,null),N=!0,F||(V=[j(_,"input",n[18]),j(_,"mousedown",n[19]),j(_,"focus",n[20]),j(_,"blur",n[21]),j(_,"keyup",n[13]),j(h,"click",n[11])],F=!0)},p(o,[b]){const S={};b&16&&(S.show_label=o[4]),b&4&&(S.info=o[2]),b&268435458&&(S.$$scope={dirty:b,ctx:o}),l.$set(S);let $=t;t=Q(o,b),t===$?M[t].p(o,b):(ee(),D(M[$],1,1,()=>{M[$]=null}),le(),i=M[t],i?i.p(o,b):(i=M[t]=P[t](o),i.c()),y(i,1),i.m(r,c)),(!N||b&8)&&(_.disabled=o[3]),(!N||b&512)&&(_.readOnly=o[9]),b&32&&_.value!==o[5]&&ie(_,o[5]),b&9&&A(h,"hide",!o[0]?.length||o[3]),b&256&&A(r,"showOptions",o[8]);const T={};b&256&&(T.showOptions=o[8]),b&128&&(T.filtered=o[7]),b&64&&(T.activeOption=o[6]),b&8&&(T.disabled=o[3]),!d&&b&1&&(d=!0,T.value=o[0],be(()=>d=!1)),w.$set(T)},i(o){N||(y(l.$$.fragment,o),y(i),y(m.$$.fragment,o),y(p.$$.fragment,o),y(w.$$.fragment,o),N=!0)},o(o){D(l.$$.fragment,o),D(i),D(m.$$.fragment,o),D(p.$$.fragment,o),D(w.$$.fragment,o),N=!1},d(o){o&&R(e),H(l),M[t].d(),H(m),H(p),H(w),F=!1,ke(V)}}}function He(n,e,l){let s,f,{label:r}=e,{info:u=void 0}=e,{value:t}=e,{multiselect:i=!1}=e,{max_choices:c}=e,{choices:a}=e,{disabled:_=!1}=e,{show_label:O}=e;const h=me();let m,v,p=!1;function L(o){Array.isArray(t)&&(!c||t.length<c)&&(t.push(o),h("select",{index:a.indexOf(o),value:o,selected:!0}),h("change",t)),l(0,t)}function w(o){Array.isArray(t)&&(l(0,t=t.filter(b=>b!==o)),h("select",{index:a.indexOf(o),value:o,selected:!1}),h("change",t))}function d(o){i?l(0,t=[]):l(0,t=""),l(5,m=""),o.preventDefault(),h("change",t)}function N(o){const b=o.detail.target.dataset.value;if(l(5,m=""),b!==void 0){if(!i){l(0,t=b),l(5,m=""),l(8,p=!1),h("select",{index:a.indexOf(b),value:b,selected:!0}),h("change",t);return}t?.includes(b)?w(b):L(b)}}function F(o){if(o.key==="Enter"&&v!=null&&(i?i&&Array.isArray(t)&&(t.includes(v)?w(v):L(v),l(5,m="")):(l(0,t=v),l(5,m=""))),o.key==="ArrowUp"||o.key==="ArrowDown"){const b=o.key==="ArrowUp"?-1:1,S=s.indexOf(v)+b;l(6,v=S<0?s[s.length-1]:S===s.length?s[0]:s[S])}o.key==="Escape"&&l(8,p=!1)}const V=o=>w(o);function P(){m=this.value,l(5,m)}const M=()=>{l(8,p=!p)},Q=()=>{l(8,p=!0)},x=()=>l(8,p=!1);function W(o){t=o,l(0,t)}return n.$$set=o=>{"label"in o&&l(1,r=o.label),"info"in o&&l(2,u=o.info),"value"in o&&l(0,t=o.value),"multiselect"in o&&l(14,i=o.multiselect),"max_choices"in o&&l(15,c=o.max_choices),"choices"in o&&l(16,a=o.choices),"disabled"in o&&l(3,_=o.disabled),"show_label"in o&&l(4,O=o.show_label)},n.$$.update=()=>{n.$$.dirty&65568&&l(7,s=a.filter(o=>m?o.toLowerCase().includes(m.toLowerCase()):o)),n.$$.dirty&224&&(v&&!s.includes(v)||!v&&m)&&l(6,v=s[0]),n.$$.dirty&49153&&l(9,f=!i&&typeof t=="string"&&t.length>0||i&&Array.isArray(t)&&t.length===c),n.$$.dirty&16385&&!i&&!Array.isArray(t)&&h("change",t)},[t,r,u,_,O,m,v,s,p,f,w,d,N,F,i,c,a,V,P,M,Q,x,W]}class Ie extends G{constructor(e){super(),J(this,e,He,ze,K,{label:1,info:2,value:0,multiselect:14,max_choices:15,choices:16,disabled:3,show_label:4})}}function Te(n){let e,l,s,f,r;const u=[n[11]];let t={};for(let a=0;a<u.length;a+=1)t=pe(t,u[a]);e=new Oe({props:t});function i(a){n[13](a)}let c={choices:n[8],multiselect:n[6],max_choices:n[7],label:n[1],info:n[2],show_label:n[9],disabled:n[12]==="static"};return n[0]!==void 0&&(c.value=n[0]),s=new Ie({props:c}),ne.push(()=>ge(s,"value",i)),s.$on("change",n[14]),s.$on("select",n[15]),{c(){q(e.$$.fragment),l=E(),q(s.$$.fragment)},m(a,_){z(e,a,_),C(a,l,_),z(s,a,_),r=!0},p(a,_){const O=_&2048?Ae(u,[ye(a[11])]):{};e.$set(O);const h={};_&256&&(h.choices=a[8]),_&64&&(h.multiselect=a[6]),_&128&&(h.max_choices=a[7]),_&2&&(h.label=a[1]),_&4&&(h.info=a[2]),_&512&&(h.show_label=a[9]),_&4096&&(h.disabled=a[12]==="static"),!f&&_&1&&(f=!0,h.value=a[0],be(()=>f=!1)),s.$set(h)},i(a){r||(y(e.$$.fragment,a),y(s.$$.fragment,a),r=!0)},o(a){D(e.$$.fragment,a),D(s.$$.fragment,a),r=!1},d(a){H(e,a),a&&R(l),H(s,a)}}}function Ue(n){let e,l;return e=new Be({props:{visible:n[5],elem_id:n[3],elem_classes:n[4],disable:typeof n[10].container=="boolean"&&!n[10].container,$$slots:{default:[Te]},$$scope:{ctx:n}}}),{c(){q(e.$$.fragment)},m(s,f){z(e,s,f),l=!0},p(s,[f]){const r={};f&32&&(r.visible=s[5]),f&8&&(r.elem_id=s[3]),f&16&&(r.elem_classes=s[4]),f&1024&&(r.disable=typeof s[10].container=="boolean"&&!s[10].container),f&72647&&(r.$$scope={dirty:f,ctx:s}),e.$set(r)},i(s){l||(y(e.$$.fragment,s),l=!0)},o(s){D(e.$$.fragment,s),l=!1},d(s){H(e,s)}}}function Fe(n,e,l){let{label:s="Dropdown"}=e,{info:f=void 0}=e,{elem_id:r=""}=e,{elem_classes:u=[]}=e,{visible:t=!0}=e,{value:i}=e,{multiselect:c=!1}=e,{max_choices:a}=e,{choices:_}=e,{show_label:O}=e,{style:h={}}=e,{loading_status:m}=e,{mode:v}=e;c&&!i?i=[]:i||(i="");function p(d){i=d,l(0,i)}function L(d){ae.call(this,n,d)}function w(d){ae.call(this,n,d)}return n.$$set=d=>{"label"in d&&l(1,s=d.label),"info"in d&&l(2,f=d.info),"elem_id"in d&&l(3,r=d.elem_id),"elem_classes"in d&&l(4,u=d.elem_classes),"visible"in d&&l(5,t=d.visible),"value"in d&&l(0,i=d.value),"multiselect"in d&&l(6,c=d.multiselect),"max_choices"in d&&l(7,a=d.max_choices),"choices"in d&&l(8,_=d.choices),"show_label"in d&&l(9,O=d.show_label),"style"in d&&l(10,h=d.style),"loading_status"in d&&l(11,m=d.loading_status),"mode"in d&&l(12,v=d.mode)},[i,s,f,r,u,t,c,a,_,O,h,m,v,p,L,w]}class Ge extends G{constructor(e){super(),J(this,e,Fe,Ue,K,{label:1,info:2,elem_id:3,elem_classes:4,visible:5,value:0,multiselect:6,max_choices:7,choices:8,show_label:9,style:10,loading_status:11,mode:12})}}var Xe=Ge;const Ye=["static","dynamic"],Ze=n=>({type:{payload:"string"},description:{payload:"selected choice"},example_data:n.choices.length?n.choices[0]:""});export{Xe as Component,Ze as document,Ye as modes};
//# sourceMappingURL=index.6e4cf598.js.map
