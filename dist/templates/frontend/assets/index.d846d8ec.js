import{S as H,i as I,s as J,F as j,G as q,H as N,B as g,O as C,f as v,D as k,I as D,J as z,p as w,a2 as K,c as G,m as B,o as y,t as O,l as S,N as L,q as M,v as P,a7 as Q,b as R,a as U,g as V,h as W,j as X,x as A}from"./index.37b24c07.js";/* empty css                                                  */import{g as Y,a as Z}from"./Empty.svelte_svelte_type_style_lang.94e7c7a3.js";import{B as p}from"./BlockTitle.78628404.js";/* empty css                                                    */import"./Info.1218d587.js";function E(l,e,s){const t=l.slice();return t[12]=e[s],t}function x(l){let e;return{c(){e=N(l[3])},m(s,t){v(s,e,t)},p(s,t){t&8&&z(e,s[3])},d(s){s&&w(e)}}}function F(l){let e,s,t,i,o,c=l[12]+"",a,b,h,n;function _(){return l[10](l[12])}function r(...d){return l[11](l[12],...d)}return{c(){e=j("label"),s=j("input"),i=q(),o=j("span"),a=N(c),b=q(),s.disabled=l[2],s.checked=t=l[0].includes(l[12]),g(s,"type","checkbox"),g(s,"name","test"),g(s,"class","svelte-1qxcj04"),g(o,"class","ml-2 svelte-1qxcj04"),g(e,"style",l[6]),g(e,"class","svelte-1qxcj04"),C(e,"disabled",l[2]),C(e,"selected",l[0].includes(l[12]))},m(d,m){v(d,e,m),k(e,s),k(e,i),k(e,o),k(o,a),k(e,b),h||(n=[D(s,"change",_),D(s,"input",r)],h=!0)},p(d,m){l=d,m&4&&(s.disabled=l[2]),m&3&&t!==(t=l[0].includes(l[12]))&&(s.checked=t),m&2&&c!==(c=l[12]+"")&&z(a,c),m&64&&g(e,"style",l[6]),m&4&&C(e,"disabled",l[2]),m&3&&C(e,"selected",l[0].includes(l[12]))},d(d){d&&w(e),h=!1,K(n)}}}function $(l){let e,s,t,i;e=new p({props:{show_label:l[5],info:l[4],$$slots:{default:[x]},$$scope:{ctx:l}}});let o=l[1],c=[];for(let a=0;a<o.length;a+=1)c[a]=F(E(l,o,a));return{c(){G(e.$$.fragment),s=q(),t=j("div");for(let a=0;a<c.length;a+=1)c[a].c();g(t,"class","wrap svelte-1qxcj04"),g(t,"data-testid","checkbox-group")},m(a,b){B(e,a,b),v(a,s,b),v(a,t,b);for(let h=0;h<c.length;h+=1)c[h].m(t,null);i=!0},p(a,[b]){const h={};if(b&32&&(h.show_label=a[5]),b&16&&(h.info=a[4]),b&32776&&(h.$$scope={dirty:b,ctx:a}),e.$set(h),b&455){o=a[1];let n;for(n=0;n<o.length;n+=1){const _=E(a,o,n);c[n]?c[n].p(_,b):(c[n]=F(_),c[n].c(),c[n].m(t,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=o.length}},i(a){i||(y(e.$$.fragment,a),i=!0)},o(a){O(e.$$.fragment,a),i=!1},d(a){S(e,a),a&&w(s),a&&w(t),L(c,a)}}}function ee(l,e,s){let t,{value:i=[]}=e,{style:o={}}=e,{choices:c}=e,{disabled:a=!1}=e,{label:b}=e,{info:h=void 0}=e,{show_label:n}=e;const _=M(),r=u=>{i.includes(u)?i.splice(i.indexOf(u),1):i.push(u),_("change",i),s(0,i)},d=u=>r(u),m=(u,T)=>_("select",{index:c.indexOf(u),value:u,selected:T.currentTarget.checked});return l.$$set=u=>{"value"in u&&s(0,i=u.value),"style"in u&&s(9,o=u.style),"choices"in u&&s(1,c=u.choices),"disabled"in u&&s(2,a=u.disabled),"label"in u&&s(3,b=u.label),"info"in u&&s(4,h=u.info),"show_label"in u&&s(5,n=u.show_label)},l.$$.update=()=>{l.$$.dirty&512&&s(6,{item_container:t}=Y(o,["item_container"]),t)},[i,c,a,b,h,n,t,_,r,o,d,m]}class le extends H{constructor(e){super(),I(this,e,ee,$,J,{value:0,style:9,choices:1,disabled:2,label:3,info:4,show_label:5})}}function se(l){let e,s,t,i,o;const c=[l[10]];let a={};for(let n=0;n<c.length;n+=1)a=P(a,c[n]);e=new Q({props:a});function b(n){l[11](n)}let h={choices:l[4],label:l[7],info:l[8],style:l[5],show_label:l[9],disabled:l[6]==="static"};return l[0]!==void 0&&(h.value=l[0]),t=new le({props:h}),R.push(()=>U(t,"value",b)),t.$on("select",l[12]),t.$on("change",l[13]),{c(){G(e.$$.fragment),s=q(),G(t.$$.fragment)},m(n,_){B(e,n,_),v(n,s,_),B(t,n,_),o=!0},p(n,_){const r=_&1024?V(c,[W(n[10])]):{};e.$set(r);const d={};_&16&&(d.choices=n[4]),_&128&&(d.label=n[7]),_&256&&(d.info=n[8]),_&32&&(d.style=n[5]),_&512&&(d.show_label=n[9]),_&64&&(d.disabled=n[6]==="static"),!i&&_&1&&(i=!0,d.value=n[0],X(()=>i=!1)),t.$set(d)},i(n){o||(y(e.$$.fragment,n),y(t.$$.fragment,n),o=!0)},o(n){O(e.$$.fragment,n),O(t.$$.fragment,n),o=!1},d(n){S(e,n),n&&w(s),S(t,n)}}}function te(l){let e,s;return e=new Z({props:{visible:l[3],elem_id:l[1],elem_classes:l[2],type:"fieldset",disable:typeof l[5].container=="boolean"&&!l[5].container,$$slots:{default:[se]},$$scope:{ctx:l}}}),{c(){G(e.$$.fragment)},m(t,i){B(e,t,i),s=!0},p(t,[i]){const o={};i&8&&(o.visible=t[3]),i&2&&(o.elem_id=t[1]),i&4&&(o.elem_classes=t[2]),i&32&&(o.disable=typeof t[5].container=="boolean"&&!t[5].container),i&18417&&(o.$$scope={dirty:i,ctx:t}),e.$set(o)},i(t){s||(y(e.$$.fragment,t),s=!0)},o(t){O(e.$$.fragment,t),s=!1},d(t){S(e,t)}}}function ne(l,e,s){let{elem_id:t=""}=e,{elem_classes:i=[]}=e,{visible:o=!0}=e,{value:c=[]}=e,{choices:a}=e,{style:b={}}=e,{mode:h}=e,{label:n="Checkbox Group"}=e,{info:_=void 0}=e,{show_label:r}=e,{loading_status:d}=e;function m(f){c=f,s(0,c)}function u(f){A.call(this,l,f)}function T(f){A.call(this,l,f)}return l.$$set=f=>{"elem_id"in f&&s(1,t=f.elem_id),"elem_classes"in f&&s(2,i=f.elem_classes),"visible"in f&&s(3,o=f.visible),"value"in f&&s(0,c=f.value),"choices"in f&&s(4,a=f.choices),"style"in f&&s(5,b=f.style),"mode"in f&&s(6,h=f.mode),"label"in f&&s(7,n=f.label),"info"in f&&s(8,_=f.info),"show_label"in f&&s(9,r=f.show_label),"loading_status"in f&&s(10,d=f.loading_status)},[c,t,i,o,a,b,h,n,_,r,d,m,u,T]}class ae extends H{constructor(e){super(),I(this,e,ne,te,J,{elem_id:1,elem_classes:2,visible:3,value:0,choices:4,style:5,mode:6,label:7,info:8,show_label:9,loading_status:10})}}var be=ae;const he=["static","dynamic"],de=l=>({type:{payload:"Array<string>"},description:{payload:"list of selected choices"},example_data:l.choices.length?[l.choices[0]]:[]});export{be as Component,de as document,he as modes};
//# sourceMappingURL=index.d846d8ec.js.map
