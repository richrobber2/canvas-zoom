import{S as G,i as H,s as J,F as S,G as q,H as N,B as b,O as B,f as v,D as k,I as D,J as O,E,p as C,a2 as z,q as A,c as j,m as w,o as r,t as h,l as p,v as K,a7 as L,b as M,a as P,g as Q,h as R,k as U,n as V,j as W,x as T}from"./index.db0f7cc2.js";/* empty css                                                  */import{a as X}from"./Empty.svelte_svelte_type_style_lang.6114a566.js";import{I as Y}from"./Info.531559a0.js";/* empty css                                                    */function Z(l){let e,a,t,s,o,c,m;return{c(){e=S("label"),a=S("input"),t=q(),s=S("span"),o=N(l[2]),a.disabled=l[1],b(a,"type","checkbox"),b(a,"name","test"),b(a,"data-testid","checkbox"),b(a,"class","svelte-1ojmf70"),b(s,"class","ml-2 svelte-1ojmf70"),b(e,"class","svelte-1ojmf70"),B(e,"disabled",l[1])},m(u,i){v(u,e,i),k(e,a),a.checked=l[0],k(e,t),k(e,s),k(s,o),c||(m=[D(a,"change",l[4]),D(a,"input",l[5])],c=!0)},p(u,[i]){i&2&&(a.disabled=u[1]),i&1&&(a.checked=u[0]),i&4&&O(o,u[2]),i&2&&B(e,"disabled",u[1])},i:E,o:E,d(u){u&&C(e),c=!1,z(m)}}}function y(l,e,a){let{value:t}=e,{disabled:s=!1}=e,{label:o}=e;const c=A();function m(_){c("change",_)}function u(){t=this.checked,a(0,t)}const i=_=>c("select",{index:0,value:o,selected:_.currentTarget.checked});return l.$$set=_=>{"value"in _&&a(0,t=_.value),"disabled"in _&&a(1,s=_.disabled),"label"in _&&a(2,o=_.label)},l.$$.update=()=>{l.$$.dirty&1&&m(t)},[t,s,o,c,u,i]}class x extends G{constructor(e){super(),H(this,e,y,Z,J,{value:0,disabled:1,label:2})}}function F(l){let e,a;return e=new Y({props:{$$slots:{default:[$]},$$scope:{ctx:l}}}),{c(){j(e.$$.fragment)},m(t,s){w(e,t,s),a=!0},p(t,s){const o={};s&4128&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){a||(r(e.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),a=!1},d(t){p(e,t)}}}function $(l){let e;return{c(){e=N(l[5])},m(a,t){v(a,e,t)},p(a,t){t&32&&O(e,a[5])},d(a){a&&C(e)}}}function ee(l){let e,a,t,s,o,c;const m=[l[8]];let u={};for(let n=0;n<m.length;n+=1)u=K(u,m[n]);e=new L({props:u});let i=l[5]&&F(l);function _(n){l[9](n)}let g={label:l[4],disabled:l[6]==="static"};return l[0]!==void 0&&(g.value=l[0]),s=new x({props:g}),M.push(()=>P(s,"value",_)),s.$on("change",l[10]),s.$on("select",l[11]),{c(){j(e.$$.fragment),a=q(),i&&i.c(),t=q(),j(s.$$.fragment)},m(n,d){w(e,n,d),v(n,a,d),i&&i.m(n,d),v(n,t,d),w(s,n,d),c=!0},p(n,d){const I=d&256?Q(m,[R(n[8])]):{};e.$set(I),n[5]?i?(i.p(n,d),d&32&&r(i,1)):(i=F(n),i.c(),r(i,1),i.m(t.parentNode,t)):i&&(U(),h(i,1,1,()=>{i=null}),V());const f={};d&16&&(f.label=n[4]),d&64&&(f.disabled=n[6]==="static"),!o&&d&1&&(o=!0,f.value=n[0],W(()=>o=!1)),s.$set(f)},i(n){c||(r(e.$$.fragment,n),r(i),r(s.$$.fragment,n),c=!0)},o(n){h(e.$$.fragment,n),h(i),h(s.$$.fragment,n),c=!1},d(n){p(e,n),n&&C(a),i&&i.d(n),n&&C(t),p(s,n)}}}function ae(l){let e,a;return e=new X({props:{visible:l[3],elem_id:l[1],elem_classes:l[2],disable:typeof l[7].container=="boolean"&&!l[7].container,$$slots:{default:[ee]},$$scope:{ctx:l}}}),{c(){j(e.$$.fragment)},m(t,s){w(e,t,s),a=!0},p(t,[s]){const o={};s&8&&(o.visible=t[3]),s&2&&(o.elem_id=t[1]),s&4&&(o.elem_classes=t[2]),s&128&&(o.disable=typeof t[7].container=="boolean"&&!t[7].container),s&4465&&(o.$$scope={dirty:s,ctx:t}),e.$set(o)},i(t){a||(r(e.$$.fragment,t),a=!0)},o(t){h(e.$$.fragment,t),a=!1},d(t){p(e,t)}}}function te(l,e,a){let{elem_id:t=""}=e,{elem_classes:s=[]}=e,{visible:o=!0}=e,{value:c=!1}=e,{label:m="Checkbox"}=e,{info:u=void 0}=e,{mode:i}=e,{style:_={}}=e,{loading_status:g}=e;function n(f){c=f,a(0,c)}function d(f){T.call(this,l,f)}function I(f){T.call(this,l,f)}return l.$$set=f=>{"elem_id"in f&&a(1,t=f.elem_id),"elem_classes"in f&&a(2,s=f.elem_classes),"visible"in f&&a(3,o=f.visible),"value"in f&&a(0,c=f.value),"label"in f&&a(4,m=f.label),"info"in f&&a(5,u=f.info),"mode"in f&&a(6,i=f.mode),"style"in f&&a(7,_=f.style),"loading_status"in f&&a(8,g=f.loading_status)},[c,t,s,o,m,u,i,_,g,n,d,I]}class le extends G{constructor(e){super(),H(this,e,te,ae,J,{elem_id:1,elem_classes:2,visible:3,value:0,label:4,info:5,mode:6,style:7,loading_status:8})}}var ce=le;const ue=["static","dynamic"],_e=l=>({type:{payload:"boolean"},description:{payload:"checked status"},example_data:l.value});export{ce as Component,_e as document,ue as modes};
//# sourceMappingURL=index.643e777c.js.map
