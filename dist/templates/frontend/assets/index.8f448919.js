import{S as R,i as V,s as W,A as S,B as _,f as L,D as y,E as O,p as j,F as X,G as Y,H as J,C as F,a3 as ye,ak as we,J as P,N as G,e as I,a1 as Le,L as je,q as de,r as Ee,al as Z,c as N,m as H,o as z,t as B,l as q,v as Ae,a7 as Ce,g as Me,h as Te,k as pe,n as ve}from"./index.a7e12ebe.js";import{U as ze}from"./Upload.9ce11967.js";import{M as Be}from"./ModifyUpload.0c1399d5.js";import{a as Se}from"./Empty.svelte_svelte_type_style_lang.74438aac.js";import{B as Ue}from"./BlockLabel.f1968ceb.js";import{E as Fe}from"./Empty.04a17357.js";import{g as Ne}from"./color.05a8467b.js";import{_ as K,m as Q,Z as $}from"./linear.955f0731.js";import{a as He}from"./csv.27f5436c.js";import{U as qe}from"./UploadText.a31d1eb3.js";import"./Blocks.ace4596b.js";/* empty css                                                    */import"./ModifyUpload.svelte_svelte_type_style_lang.e946db2d.js";import"./dsv.7fe76a93.js";function De(l){let e,n,t;return{c(){e=S("svg"),n=S("path"),t=S("path"),_(n,"d","M28.828 3.172a4.094 4.094 0 0 0-5.656 0L4.05 22.292A6.954 6.954 0 0 0 2 27.242V30h2.756a6.952 6.952 0 0 0 4.95-2.05L28.828 8.829a3.999 3.999 0 0 0 0-5.657zM10.91 18.26l2.829 2.829l-2.122 2.121l-2.828-2.828zm-2.619 8.276A4.966 4.966 0 0 1 4.756 28H4v-.759a4.967 4.967 0 0 1 1.464-3.535l1.91-1.91l2.829 2.828zM27.415 7.414l-12.261 12.26l-2.829-2.828l12.262-12.26a2.047 2.047 0 0 1 2.828 0a2 2 0 0 1 0 2.828z"),_(n,"fill","currentColor"),_(t,"d","M6.5 15a3.5 3.5 0 0 1-2.475-5.974l3.5-3.5a1.502 1.502 0 0 0 0-2.121a1.537 1.537 0 0 0-2.121 0L3.415 5.394L2 3.98l1.99-1.988a3.585 3.585 0 0 1 4.95 0a3.504 3.504 0 0 1 0 4.949L5.439 10.44a1.502 1.502 0 0 0 0 2.121a1.537 1.537 0 0 0 2.122 0l4.024-4.024L13 9.95l-4.025 4.024A3.475 3.475 0 0 1 6.5 15z"),_(t,"fill","currentColor"),_(e,"width","1em"),_(e,"height","1em"),_(e,"viewBox","0 0 32 32")},m(o,s){L(o,e,s),y(e,n),y(e,t)},p:O,i:O,o:O,d(o){o&&j(e)}}}class be extends R{constructor(e){super(),V(this,e,null,De,W,{})}}function x(l){let e;return Array.isArray(l)?e=l.reduce((n,{values:t})=>[...n,...t.map(({y:o})=>o)],[]):e=l.values,[Math.min(...e),Math.max(...e)]}function ee(l,e,n){const t=Object.entries(l[0]).reduce((o,s,a)=>(!e&&a===0||e&&s[0]===e?o.x.name=s[0]:(!n||n&&n.includes(s[0]))&&o.y.push({name:s[0],values:[]}),o),{x:{name:"",values:[]},y:[]});for(let o=0;o<l.length;o++){const s=Object.entries(l[o]);for(let a=0;a<s.length;a++){let[f,r]=s[a];f===t.x.name?t.x.values.push(parseFloat(r)):t.y[a-1].values.push({y:parseFloat(s[a][1]),x:parseFloat(s[0][1])})}}return t}function Oe(l){let e,n,t,o,s;return{c(){e=X("div"),n=X("span"),t=Y(),o=J(l[0]),F(n,"background",l[3]),_(n,"class","svelte-1gww5xe"),F(e,"top",l[2]-l[5]/2+"px"),F(e,"left",l[1]-l[4]-7+"px"),_(e,"class","svelte-1gww5xe"),ye(()=>l[6].call(e))},m(a,f){L(a,e,f),y(e,n),y(e,t),y(e,o),s=we(e,l[6].bind(e))},p(a,[f]){f&8&&F(n,"background",a[3]),f&1&&P(o,a[0]),f&36&&F(e,"top",a[2]-a[5]/2+"px"),f&18&&F(e,"left",a[1]-a[4]-7+"px")},i:O,o:O,d(a){a&&j(e),s()}}}function Xe(l,e,n){let{text:t}=e,{x:o}=e,{y:s}=e,{color:a}=e,f,r;function p(){f=this.offsetWidth,r=this.offsetHeight,n(4,f),n(5,r)}return l.$$set=d=>{"text"in d&&n(0,t=d.text),"x"in d&&n(1,o=d.x),"y"in d&&n(2,s=d.y),"color"in d&&n(3,a=d.color)},[t,o,s,a,f,r,p]}class Ye extends R{constructor(e){super(),V(this,e,Xe,Oe,W,{text:0,x:1,y:2,color:3})}}function Ge(l,{color:e,text:n}){let t;function o(r){return t=new Ye({props:{text:n,x:r.pageX,y:r.pageY,color:e},target:document.body}),r}function s(r){t.$set({x:r.pageX,y:r.pageY})}function a(){t.$destroy()}const f=l;return f.addEventListener("mouseover",o),f.addEventListener("mouseleave",a),f.addEventListener("mousemove",s),{destroy(){f.removeEventListener("mouseover",o),f.removeEventListener("mouseleave",a),f.removeEventListener("mousemove",s)}}}function le(l,e,n){const t=l.slice();t[16]=e[n].name,t[17]=e[n].values;const o=t[8][t[16]];return t[18]=o,t}function te(l,e,n){const t=l.slice();return t[0]=e[n].x,t[1]=e[n].y,t}function ne(l,e,n){const t=l.slice();t[16]=e[n].name,t[17]=e[n].values;const o=t[8][t[16]];return t[18]=o,t}function oe(l,e,n){const t=l.slice();return t[0]=e[n].x,t[1]=e[n].y,t}function ae(l,e,n){const t=l.slice();return t[27]=e[n],t}function se(l,e,n){const t=l.slice();return t[27]=e[n],t}function re(l,e,n){const t=l.slice();return t[16]=e[n].name,t}function ie(l){let e,n,t,o=l[16]+"",s,a;return{c(){e=X("div"),n=X("span"),t=Y(),s=J(o),a=Y(),_(n,"class","legend-box svelte-1mjxput"),F(n,"background-color",l[8][l[16]]),_(e,"class","legend-item svelte-1mjxput")},m(f,r){L(f,e,r),y(e,n),y(e,t),y(e,s),y(e,a)},p(f,r){r[0]&260&&F(n,"background-color",f[8][f[16]]),r[0]&4&&o!==(o=f[16]+"")&&P(s,o)},d(f){f&&j(e)}}}function fe(l){let e,n,t,o,s,a,f=l[27]+"",r,p,d;return{c(){e=S("line"),a=S("text"),r=J(f),_(e,"stroke-width","0.5"),_(e,"x1",n=l[5](l[27])),_(e,"x2",t=l[5](l[27])),_(e,"y1",o=l[4](l[9][0]<l[6][0]?l[9][0]:l[6][0])+10),_(e,"y2",s=l[4](l[6][1]>l[9][l[9].length-1]?l[6][1]:l[9][l[9].length-1])),_(e,"stroke","#aaa"),_(a,"class","label-text svelte-1mjxput"),_(a,"text-anchor","middle"),_(a,"x",p=l[5](l[27])),_(a,"y",d=l[4](l[9][0])+30)},m(i,h){L(i,e,h),L(i,a,h),y(a,r)},p(i,h){h[0]&1056&&n!==(n=i[5](i[27]))&&_(e,"x1",n),h[0]&1056&&t!==(t=i[5](i[27]))&&_(e,"x2",t),h[0]&592&&o!==(o=i[4](i[9][0]<i[6][0]?i[9][0]:i[6][0])+10)&&_(e,"y1",o),h[0]&592&&s!==(s=i[4](i[6][1]>i[9][i[9].length-1]?i[6][1]:i[9][i[9].length-1]))&&_(e,"y2",s),h[0]&1024&&f!==(f=i[27]+"")&&P(r,f),h[0]&1056&&p!==(p=i[5](i[27]))&&_(a,"x",p),h[0]&528&&d!==(d=i[4](i[9][0])+30)&&_(a,"y",d)},d(i){i&&j(e),i&&j(a)}}}function _e(l){let e,n,t,o,s,a,f=l[27]+"",r,p,d;return{c(){e=S("line"),a=S("text"),r=J(f),_(e,"stroke-width","0.5"),_(e,"y1",n=l[4](l[27])),_(e,"y2",t=l[4](l[27])),_(e,"x1",o=l[5](l[10][0]<l[7][0]?l[10][0]:l[7][0])-10),_(e,"x2",s=l[5](l[7][1]>l[10][l[10].length-1]?l[7][1]:l[10][l[10].length-1])),_(e,"stroke","#aaa"),_(a,"class","label-text svelte-1mjxput"),_(a,"text-anchor","end"),_(a,"y",p=l[4](l[27])+4),_(a,"x",d=l[5](l[10][0])-20)},m(i,h){L(i,e,h),L(i,a,h),y(a,r)},p(i,h){h[0]&528&&n!==(n=i[4](i[27]))&&_(e,"y1",n),h[0]&528&&t!==(t=i[4](i[27]))&&_(e,"y2",t),h[0]&1184&&o!==(o=i[5](i[10][0]<i[7][0]?i[10][0]:i[7][0])-10)&&_(e,"x1",o),h[0]&1184&&s!==(s=i[5](i[7][1]>i[10][i[10].length-1]?i[7][1]:i[10][i[10].length-1]))&&_(e,"x2",s),h[0]&512&&f!==(f=i[27]+"")&&P(r,f),h[0]&528&&p!==(p=i[4](i[27])+4)&&_(a,"y",p),h[0]&1056&&d!==(d=i[5](i[10][0])-20)&&_(a,"x",d)},d(i){i&&j(e),i&&j(a)}}}function ue(l){let e,n,t,o,s,a,f=l[6][1]+"",r,p,d;return{c(){e=S("line"),a=S("text"),r=J(f),_(e,"stroke-width","0.5"),_(e,"y1",n=l[4](l[6][1])),_(e,"y2",t=l[4](l[6][1])),_(e,"x1",o=l[5](l[10][0])),_(e,"x2",s=l[5](l[7][1])),_(e,"stroke","#aaa"),_(a,"class","label-text svelte-1mjxput"),_(a,"text-anchor","end"),_(a,"y",p=l[4](l[6][1])+4),_(a,"x",d=l[5](l[10][0])-20)},m(i,h){L(i,e,h),L(i,a,h),y(a,r)},p(i,h){h[0]&80&&n!==(n=i[4](i[6][1]))&&_(e,"y1",n),h[0]&80&&t!==(t=i[4](i[6][1]))&&_(e,"y2",t),h[0]&1056&&o!==(o=i[5](i[10][0]))&&_(e,"x1",o),h[0]&160&&s!==(s=i[5](i[7][1]))&&_(e,"x2",s),h[0]&64&&f!==(f=i[6][1]+"")&&P(r,f),h[0]&80&&p!==(p=i[4](i[6][1])+4)&&_(a,"y",p),h[0]&1056&&d!==(d=i[5](i[10][0])-20)&&_(a,"x",d)},d(i){i&&j(e),i&&j(a)}}}function ce(l){let e,n,t,o;return{c(){e=S("circle"),_(e,"r","3.5"),_(e,"cx",n=l[5](l[0])),_(e,"cy",t=l[4](l[1])),_(e,"stroke-width","1.5"),_(e,"stroke",o=l[18]),_(e,"fill","none")},m(s,a){L(s,e,a)},p(s,a){a[0]&36&&n!==(n=s[5](s[0]))&&_(e,"cx",n),a[0]&20&&t!==(t=s[4](s[1]))&&_(e,"cy",t),a[0]&260&&o!==(o=s[18])&&_(e,"stroke",o)},d(s){s&&j(e)}}}function me(l){let e,n,t,o=l[17],s=[];for(let a=0;a<o.length;a+=1)s[a]=ce(oe(l,o,a));return{c(){for(let a=0;a<s.length;a+=1)s[a].c();e=S("path"),_(e,"d",n=K().curve(Q)(l[17].map(l[13]))),_(e,"fill","none"),_(e,"stroke",t=l[18]),_(e,"stroke-width","3")},m(a,f){for(let r=0;r<s.length;r+=1)s[r].m(a,f);L(a,e,f)},p(a,f){if(f[0]&308){o=a[17];let r;for(r=0;r<o.length;r+=1){const p=oe(a,o,r);s[r]?s[r].p(p,f):(s[r]=ce(p),s[r].c(),s[r].m(e.parentNode,e))}for(;r<s.length;r+=1)s[r].d(1);s.length=o.length}f[0]&52&&n!==(n=K().curve(Q)(a[17].map(a[13])))&&_(e,"d",n),f[0]&260&&t!==(t=a[18])&&_(e,"stroke",t)},d(a){G(s,a),a&&j(e)}}}function he(l){let e,n,t,o,s,a;return{c(){e=S("circle"),_(e,"r","7"),_(e,"cx",n=l[5](l[0])),_(e,"cy",t=l[4](l[1])),_(e,"stroke","black"),_(e,"fill","black"),F(e,"cursor","pointer"),F(e,"opacity","0")},m(f,r){L(f,e,r),s||(a=Le(o=Ge.call(null,e,{color:l[18],text:`(${l[0]}, ${l[1]})`})),s=!0)},p(f,r){l=f,r[0]&36&&n!==(n=l[5](l[0]))&&_(e,"cx",n),r[0]&20&&t!==(t=l[4](l[1]))&&_(e,"cy",t),o&&je(o.update)&&r[0]&260&&o.update.call(null,{color:l[18],text:`(${l[0]}, ${l[1]})`})},d(f){f&&j(e),s=!1,a()}}}function ge(l){let e,n=l[17],t=[];for(let o=0;o<n.length;o+=1)t[o]=he(te(l,n,o));return{c(){for(let o=0;o<t.length;o+=1)t[o].c();e=I()},m(o,s){for(let a=0;a<t.length;a+=1)t[a].m(o,s);L(o,e,s)},p(o,s){if(s[0]&308){n=o[17];let a;for(a=0;a<n.length;a+=1){const f=te(o,n,a);t[a]?t[a].p(f,s):(t[a]=he(f),t[a].c(),t[a].m(e.parentNode,e))}for(;a<t.length;a+=1)t[a].d(1);t.length=n.length}},d(o){G(t,o),o&&j(e)}}}function Ie(l){let e,n,t,o,s,a,f,r,p,d,i=l[3].name+"",h,E=l[2],m=[];for(let c=0;c<E.length;c+=1)m[c]=ie(re(l,E,c));let k=l[10],v=[];for(let c=0;c<k.length;c+=1)v[c]=fe(se(l,k,c));let U=l[9],w=[];for(let c=0;c<U.length;c+=1)w[c]=_e(ae(l,U,c));let b=l[6][1]>l[9][l[9].length-1]&&ue(l),A=l[2],C=[];for(let c=0;c<A.length;c+=1)C[c]=me(ne(l,A,c));let D=l[2],g=[];for(let c=0;c<D.length;c+=1)g[c]=ge(le(l,D,c));return{c(){e=X("div"),n=X("div");for(let c=0;c<m.length;c+=1)m[c].c();t=Y(),o=S("svg"),s=S("g");for(let c=0;c<v.length;c+=1)v[c].c();a=I();for(let c=0;c<w.length;c+=1)w[c].c();f=I(),b&&b.c();for(let c=0;c<C.length;c+=1)C[c].c();r=I();for(let c=0;c<g.length;c+=1)g[c].c();p=Y(),d=X("div"),h=J(i),_(n,"class","legend svelte-1mjxput"),_(o,"class","w-full svelte-1mjxput"),_(o,"viewBox","-70 -20 700 420"),_(d,"class","main-label svelte-1mjxput"),_(e,"class","wrap svelte-1mjxput")},m(c,M){L(c,e,M),y(e,n);for(let u=0;u<m.length;u+=1)m[u].m(n,null);y(e,t),y(e,o),y(o,s);for(let u=0;u<v.length;u+=1)v[u].m(s,null);y(s,a);for(let u=0;u<w.length;u+=1)w[u].m(s,null);y(s,f),b&&b.m(s,null);for(let u=0;u<C.length;u+=1)C[u].m(o,null);y(o,r);for(let u=0;u<g.length;u+=1)g[u].m(o,null);y(e,p),y(e,d),y(d,h)},p(c,M){if(M[0]&260){E=c[2];let u;for(u=0;u<E.length;u+=1){const T=re(c,E,u);m[u]?m[u].p(T,M):(m[u]=ie(T),m[u].c(),m[u].m(n,null))}for(;u<m.length;u+=1)m[u].d(1);m.length=E.length}if(M[0]&1648){k=c[10];let u;for(u=0;u<k.length;u+=1){const T=se(c,k,u);v[u]?v[u].p(T,M):(v[u]=fe(T),v[u].c(),v[u].m(s,a))}for(;u<v.length;u+=1)v[u].d(1);v.length=k.length}if(M[0]&1712){U=c[9];let u;for(u=0;u<U.length;u+=1){const T=ae(c,U,u);w[u]?w[u].p(T,M):(w[u]=_e(T),w[u].c(),w[u].m(s,f))}for(;u<w.length;u+=1)w[u].d(1);w.length=U.length}if(c[6][1]>c[9][c[9].length-1]?b?b.p(c,M):(b=ue(c),b.c(),b.m(s,null)):b&&(b.d(1),b=null),M[0]&308){A=c[2];let u;for(u=0;u<A.length;u+=1){const T=ne(c,A,u);C[u]?C[u].p(T,M):(C[u]=me(T),C[u].c(),C[u].m(o,r))}for(;u<C.length;u+=1)C[u].d(1);C.length=A.length}if(M[0]&308){D=c[2];let u;for(u=0;u<D.length;u+=1){const T=le(c,D,u);g[u]?g[u].p(T,M):(g[u]=ge(T),g[u].c(),g[u].m(o,null))}for(;u<g.length;u+=1)g[u].d(1);g.length=D.length}M[0]&8&&i!==(i=c[3].name+"")&&P(h,i)},i:O,o:O,d(c){c&&j(e),G(m,c),G(v,c),G(w,c),b&&b.d(),G(C,c),G(g,c)}}}function Je(l,e,n){let t,o,s,a,f,r,p,d,{value:i}=e,{x:h=void 0}=e,{y:E=void 0}=e,{colors:m=[]}=e;const k=de();let v;function U(b){let A=m[b%m.length];return A&&A in Z?Z[A]?.primary:A||Z[Ne(b)].primary}Ee(()=>{k("process",{x:t,y:o})});const w=({x:b,y:A})=>[f(b),r(A)];return l.$$set=b=>{"value"in b&&n(11,i=b.value),"x"in b&&n(0,h=b.x),"y"in b&&n(1,E=b.y),"colors"in b&&n(12,m=b.colors)},l.$$.update=()=>{l.$$.dirty[0]&2051&&n(3,{x:t,y:o}=ee(typeof i=="string"?He(i):i,h,E),t,(n(2,o),n(11,i),n(0,h),n(1,E))),l.$$.dirty[0]&8&&n(7,s=x(t)),l.$$.dirty[0]&4&&n(6,a=x(o)),l.$$.dirty[0]&128&&n(5,f=$(s,[0,600]).nice()),l.$$.dirty[0]&64&&n(4,r=$(a,[350,0]).nice()),l.$$.dirty[0]&32&&n(10,p=f.ticks(8)),l.$$.dirty[0]&16&&n(9,d=r.ticks(8)),l.$$.dirty[0]&4&&n(8,v=o.reduce((b,A,C)=>({...b,[A.name]:U(C)}),{}))},[h,E,o,t,r,f,a,s,v,d,p,i,m,w]}class ke extends R{constructor(e){super(),V(this,e,Je,Ie,W,{value:11,x:0,y:1,colors:12},null,[-1,-1])}}function Pe(l){let e,n;return e=new ze({props:{filetype:"text/csv",include_file_metadata:!1,$$slots:{default:[We]},$$scope:{ctx:l}}}),e.$on("load",l[16]),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,o){const s={};o&1048576&&(s.$$scope={dirty:o,ctx:t}),e.$set(s)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function Re(l){let e,n,t,o,s;return n=new Be({}),n.$on("clear",l[14]),o=new ke({props:{value:l[11],y:l[4],x:l[5],colors:l[9]}}),o.$on("process",l[15]),{c(){e=X("div"),N(n.$$.fragment),t=Y(),N(o.$$.fragment),_(e,"class","chart svelte-etmurc")},m(a,f){L(a,e,f),H(n,e,null),y(e,t),H(o,e,null),s=!0},p(a,f){const r={};f&2048&&(r.value=a[11]),f&16&&(r.y=a[4]),f&32&&(r.x=a[5]),f&512&&(r.colors=a[9]),o.$set(r)},i(a){s||(z(n.$$.fragment,a),z(o.$$.fragment,a),s=!0)},o(a){B(n.$$.fragment,a),B(o.$$.fragment,a),s=!1},d(a){a&&j(e),q(n),q(o)}}}function Ve(l){let e,n,t,o;const s=[Ke,Ze],a=[];function f(r,p){return r[12]?0:1}return e=f(l),n=a[e]=s[e](l),{c(){n.c(),t=I()},m(r,p){a[e].m(r,p),L(r,t,p),o=!0},p(r,p){let d=e;e=f(r),e===d?a[e].p(r,p):(pe(),B(a[d],1,1,()=>{a[d]=null}),ve(),n=a[e],n?n.p(r,p):(n=a[e]=s[e](r),n.c()),z(n,1),n.m(t.parentNode,t))},i(r){o||(z(n),o=!0)},o(r){B(n),o=!1},d(r){a[e].d(r),r&&j(t)}}}function We(l){let e,n;return e=new qe({props:{type:"csv"}}),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p:O,i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function Ze(l){let e,n;return e=new Fe({props:{size:"large",unpadded_box:!0,$$slots:{default:[Qe]},$$scope:{ctx:l}}}),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,o){const s={};o&1048576&&(s.$$scope={dirty:o,ctx:t}),e.$set(s)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function Ke(l){let e,n;return e=new ke({props:{value:l[12],colors:l[9]}}),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,o){const s={};o&4096&&(s.value=t[12]),o&512&&(s.colors=t[9]),e.$set(s)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function Qe(l){let e,n;return e=new be({}),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function $e(l){let e,n,t,o,s,a,f,r;e=new Ue({props:{show_label:l[8],Icon:be,label:l[7]||"TimeSeries"}});const p=[l[10]];let d={};for(let m=0;m<p.length;m+=1)d=Ae(d,p[m]);t=new Ce({props:d});const i=[Ve,Re,Pe],h=[];function E(m,k){return m[6]==="static"?0:m[11]?1:m[0]===void 0||m[0]===null?2:-1}return~(s=E(l))&&(a=h[s]=i[s](l)),{c(){N(e.$$.fragment),n=Y(),N(t.$$.fragment),o=Y(),a&&a.c(),f=I()},m(m,k){H(e,m,k),L(m,n,k),H(t,m,k),L(m,o,k),~s&&h[s].m(m,k),L(m,f,k),r=!0},p(m,k){const v={};k&256&&(v.show_label=m[8]),k&128&&(v.label=m[7]||"TimeSeries"),e.$set(v);const U=k&1024?Me(p,[Te(m[10])]):{};t.$set(U);let w=s;s=E(m),s===w?~s&&h[s].p(m,k):(a&&(pe(),B(h[w],1,1,()=>{h[w]=null}),ve()),~s?(a=h[s],a?a.p(m,k):(a=h[s]=i[s](m),a.c()),z(a,1),a.m(f.parentNode,f)):a=null)},i(m){r||(z(e.$$.fragment,m),z(t.$$.fragment,m),z(a),r=!0)},o(m){B(e.$$.fragment,m),B(t.$$.fragment,m),B(a),r=!1},d(m){q(e,m),m&&j(n),q(t,m),m&&j(o),~s&&h[s].d(m),m&&j(f)}}}function xe(l){let e,n;return e=new Se({props:{visible:l[3],variant:l[6]==="dynamic"&&!l[11]?"dashed":"solid",padding:!1,elem_id:l[1],elem_classes:l[2],$$slots:{default:[$e]},$$scope:{ctx:l}}}),{c(){N(e.$$.fragment)},m(t,o){H(e,t,o),n=!0},p(t,[o]){const s={};o&8&&(s.visible=t[3]),o&2112&&(s.variant=t[6]==="dynamic"&&!t[11]?"dashed":"solid"),o&2&&(s.elem_id=t[1]),o&4&&(s.elem_classes=t[2]),o&1056753&&(s.$$scope={dirty:o,ctx:t}),e.$set(s)},i(t){n||(z(e.$$.fragment,t),n=!0)},o(t){B(e.$$.fragment,t),n=!1},d(t){q(e,t)}}}function el(l){return l.data.map(e=>e.reduce((n,t,o)=>({...n,[l.headers[o]]:t}),{}))}function ll(l){const e=atob(l.split(",")[1]),n=l.split(",")[0].split(":")[1].split(";")[0],t=new ArrayBuffer(e.length),o=new Uint8Array(t);for(let s=0;s<e.length;s++)o[s]=e.charCodeAt(s);return new Blob([t],{type:n})}function tl(l,e){const n=[],t=[];n.push(l.name),e.forEach(({name:o})=>n.push(o));for(let o=0;o<l.values.length;o++){let s=[];s.push(l.values[o]),e.forEach(({values:a})=>s.push(a[o].y)),t.push(s)}return{headers:n,data:t}}function nl(l,e,n){let t;const o=de();let{elem_id:s=""}=e,{elem_classes:a=[]}=e,{visible:f=!0}=e,{value:r}=e,{y:p}=e,{x:d}=e,{mode:i}=e,{label:h}=e,{show_label:E}=e,{colors:m}=e,{loading_status:k}=e,v;function U(g){const c=new FileReader;c.addEventListener("loadend",M=>{n(11,v=M.srcElement.result)}),c.readAsText(g)}function w(g){g.headers&&n(11,v=g.headers.join(",")),g.data.forEach(M=>{n(11,v=v+`
`),n(11,v=v+M.join(","))})}function b(g){return n(0,r={data:g}),g}function A({detail:g}){n(0,r=null),o("change"),o("clear")}const C=({detail:{x:g,y:c}})=>n(0,r=tl(g,c)),D=({detail:g})=>b(g);return l.$$set=g=>{"elem_id"in g&&n(1,s=g.elem_id),"elem_classes"in g&&n(2,a=g.elem_classes),"visible"in g&&n(3,f=g.visible),"value"in g&&n(0,r=g.value),"y"in g&&n(4,p=g.y),"x"in g&&n(5,d=g.x),"mode"in g&&n(6,i=g.mode),"label"in g&&n(7,h=g.label),"show_label"in g&&n(8,E=g.show_label),"colors"in g&&n(9,m=g.colors),"loading_status"in g&&n(10,k=g.loading_status)},l.$$.update=()=>{l.$$.dirty&1&&(r&&r.data&&typeof r.data=="string"?r?U(ll(r.data)):n(11,v=null):r&&r.data&&typeof r.data!="string"&&(r||n(11,v=null),w(r))),l.$$.dirty&2049&&n(11,v=r==null?null:v),l.$$.dirty&65&&n(12,t=i==="static"&&r&&el(r)),l.$$.dirty&1&&o("change")},[r,s,a,f,p,d,i,h,E,m,k,v,t,b,A,C,D]}class ol extends R{constructor(e){super(),V(this,e,nl,xe,W,{elem_id:1,elem_classes:2,visible:3,value:0,y:4,x:5,mode:6,label:7,show_label:8,colors:9,loading_status:10})}}var bl=ol;const kl=["static","dynamic"],yl=l=>({type:{payload:"{data: Array<Array<number>> | string; headers?: Array<string>;}"},description:{payload:"dataset of series"}});export{bl as Component,yl as document,kl as modes};
//# sourceMappingURL=index.8f448919.js.map
