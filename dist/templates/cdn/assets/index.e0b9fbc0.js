import{S as r,i as d,s as b,c as v,m as g,o as y,t as h,l as B,T as k,H as C,f as S,J as q,p as w,x as H}from"./index.7a68216a.js";import{B as J}from"./Empty.svelte_svelte_type_style_lang.d7a3af78.js";import{X as R}from"./Blocks.1c8a32b7.js";function T(n){let t=n[7](n[4])+"",a;return{c(){a=C(t)},m(e,l){S(e,a,l)},p(e,l){l&144&&t!==(t=e[7](e[4])+"")&&q(a,t)},d(e){e&&w(a)}}}function X(n){let t,a;return t=new J({props:{variant:n[5],elem_id:n[1],elem_classes:n[2],style:n[0],visible:n[3],disabled:n[6]==="static",$$slots:{default:[T]},$$scope:{ctx:n}}}),t.$on("click",n[8]),{c(){v(t.$$.fragment)},m(e,l){g(t,e,l),a=!0},p(e,[l]){const i={};l&32&&(i.variant=e[5]),l&2&&(i.elem_id=e[1]),l&4&&(i.elem_classes=e[2]),l&1&&(i.style=e[0]),l&8&&(i.visible=e[3]),l&64&&(i.disabled=e[6]==="static"),l&656&&(i.$$scope={dirty:l,ctx:e}),t.$set(i)},i(e){a||(y(t.$$.fragment,e),a=!0)},o(e){h(t.$$.fragment,e),a=!1},d(e){B(t,e)}}}function j(n,t,a){let e;k(n,R,s=>a(7,e=s));let{style:l={}}=t,{elem_id:i=""}=t,{elem_classes:m=[]}=t,{visible:o=!0}=t,{value:u}=t,{variant:c="secondary"}=t,{mode:f="dynamic"}=t;function _(s){H.call(this,n,s)}return n.$$set=s=>{"style"in s&&a(0,l=s.style),"elem_id"in s&&a(1,i=s.elem_id),"elem_classes"in s&&a(2,m=s.elem_classes),"visible"in s&&a(3,o=s.visible),"value"in s&&a(4,u=s.value),"variant"in s&&a(5,c=s.variant),"mode"in s&&a(6,f=s.mode)},[l,i,m,o,u,c,f,e,_]}class z extends r{constructor(t){super(),d(this,t,j,X,b,{style:0,elem_id:1,elem_classes:2,visible:3,value:4,variant:5,mode:6})}}var F=z;const G=["static","dynamic"],I=n=>({type:{payload:"string"},description:{payload:"button label"},example_data:n.value||"Run"});export{F as Component,I as document,G as modes};
//# sourceMappingURL=index.e0b9fbc0.js.map
