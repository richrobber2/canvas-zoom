import{S as Z,i as x,s as $,F as D,c as S,G as R,B as b,f as y,m as z,D as re,k as J,t as p,n as M,o as m,p as w,l as L,q as _e,H as ce,J as be,V as U,b as j,e as ee,M as B,a1 as he,I as d,L as de,a2 as V,E as I,a3 as me,a4 as ge,a5 as ke,a6 as k,g as pe,h as ye,a as we,j as ve,x as G,v as Te,a7 as Ee}from"./index.a7e12ebe.js";/* empty css                                                  */import{a as Ce}from"./Empty.svelte_svelte_type_style_lang.74438aac.js";/* empty css                                                    */import{B as Be}from"./BlockTitle.31066e24.js";import{C as De}from"./Check.4a896e2c.js";import{C as He}from"./Copy.3a9e9f32.js";function Ne(n){let e;return{c(){e=ce(n[3])},m(t,a){y(t,e,a)},p(t,a){a&8&&be(e,t[3])},d(t){t&&w(e)}}}function Se(n){let e,t,a,i,l,o,c=n[6]&&n[9].show_copy_button&&W(n);return{c(){c&&c.c(),e=R(),t=D("textarea"),b(t,"data-testid","textbox"),b(t,"class","scroll-hide svelte-4xt1ch"),b(t,"placeholder",n[2]),b(t,"rows",n[1]),t.disabled=n[5]},m(s,r){c&&c.m(s,r),y(s,e,r),y(s,t,r),B(t,n[0]),n[24](t),i=!0,l||(o=[he(a=n[16].call(null,t,n[0])),d(t,"input",n[23]),d(t,"keypress",n[15]),d(t,"blur",n[12]),d(t,"select",n[14])],l=!0)},p(s,r){s[6]&&s[9].show_copy_button?c?(c.p(s,r),r&576&&m(c,1)):(c=W(s),c.c(),m(c,1),c.m(e.parentNode,e)):c&&(J(),p(c,1,1,()=>{c=null}),M()),(!i||r&4)&&b(t,"placeholder",s[2]),(!i||r&2)&&b(t,"rows",s[1]),(!i||r&32)&&(t.disabled=s[5]),a&&de(a.update)&&r&1&&a.update.call(null,s[0]),r&1&&B(t,s[0])},i(s){i||(m(c),i=!0)},o(s){p(c),i=!1},d(s){c&&c.d(s),s&&w(e),s&&w(t),n[24](null),l=!1,V(o)}}}function ze(n){let e;function t(l,o){if(l[8]==="text")return Fe;if(l[8]==="password")return Ke;if(l[8]==="email")return qe}let a=t(n),i=a&&a(n);return{c(){i&&i.c(),e=ee()},m(l,o){i&&i.m(l,o),y(l,e,o)},p(l,o){a===(a=t(l))&&i?i.p(l,o):(i&&i.d(1),i=a&&a(l),i&&(i.c(),i.m(e.parentNode,e)))},i:I,o:I,d(l){i&&i.d(l),l&&w(e)}}}function W(n){let e,t,a,i;const l=[je,Le],o=[];function c(s,r){return s[11]?0:1}return e=c(n),t=o[e]=l[e](n),{c(){t.c(),a=ee()},m(s,r){o[e].m(s,r),y(s,a,r),i=!0},p(s,r){let f=e;e=c(s),e===f?o[e].p(s,r):(J(),p(o[f],1,1,()=>{o[f]=null}),M(),t=o[e],t?t.p(s,r):(t=o[e]=l[e](s),t.c()),m(t,1),t.m(a.parentNode,a))},i(s){i||(m(t),i=!0)},o(s){p(t),i=!1},d(s){o[e].d(s),s&&w(a)}}}function Le(n){let e,t,a,i,l;return t=new He({}),{c(){e=D("button"),S(t.$$.fragment),b(e,"class","copy-text svelte-4xt1ch")},m(o,c){y(o,e,c),z(t,e,null),a=!0,i||(l=d(e,"click",n[13]),i=!0)},p:I,i(o){a||(m(t.$$.fragment,o),a=!0)},o(o){p(t.$$.fragment,o),a=!1},d(o){o&&w(e),L(t),i=!1,l()}}}function je(n){let e,t,a,i;return t=new De({}),{c(){e=D("button"),S(t.$$.fragment),b(e,"class","svelte-4xt1ch")},m(l,o){y(l,e,o),z(t,e,null),i=!0},p:I,i(l){i||(m(t.$$.fragment,l),a||me(()=>{a=ge(e,ke,{duration:300}),a.start()}),i=!0)},o(l){p(t.$$.fragment,l),i=!1},d(l){l&&w(e),L(t)}}}function qe(n){let e,t,a;return{c(){e=D("input"),b(e,"data-testid","textbox"),b(e,"type","email"),b(e,"class","scroll-hide svelte-4xt1ch"),b(e,"placeholder",n[2]),e.disabled=n[5],b(e,"autocomplete","email")},m(i,l){y(i,e,l),B(e,n[0]),n[22](e),t||(a=[d(e,"input",n[21]),d(e,"keypress",n[15]),d(e,"blur",n[12]),d(e,"select",n[14])],t=!0)},p(i,l){l&4&&b(e,"placeholder",i[2]),l&32&&(e.disabled=i[5]),l&1&&e.value!==i[0]&&B(e,i[0])},d(i){i&&w(e),n[22](null),t=!1,V(a)}}}function Ke(n){let e,t,a;return{c(){e=D("input"),b(e,"data-testid","password"),b(e,"type","password"),b(e,"class","scroll-hide svelte-4xt1ch"),b(e,"placeholder",n[2]),e.disabled=n[5],b(e,"autocomplete","")},m(i,l){y(i,e,l),B(e,n[0]),n[20](e),t||(a=[d(e,"input",n[19]),d(e,"keypress",n[15]),d(e,"blur",n[12]),d(e,"select",n[14])],t=!0)},p(i,l){l&4&&b(e,"placeholder",i[2]),l&32&&(e.disabled=i[5]),l&1&&e.value!==i[0]&&B(e,i[0])},d(i){i&&w(e),n[20](null),t=!1,V(a)}}}function Fe(n){let e,t,a;return{c(){e=D("input"),b(e,"data-testid","textbox"),b(e,"type","text"),b(e,"class","scroll-hide svelte-4xt1ch"),b(e,"placeholder",n[2]),e.disabled=n[5]},m(i,l){y(i,e,l),B(e,n[0]),n[18](e),t||(a=[d(e,"input",n[17]),d(e,"keypress",n[15]),d(e,"blur",n[12]),d(e,"select",n[14])],t=!0)},p(i,l){l&4&&b(e,"placeholder",i[2]),l&32&&(e.disabled=i[5]),l&1&&e.value!==i[0]&&B(e,i[0])},d(i){i&&w(e),n[18](null),t=!1,V(a)}}}function Ge(n){let e,t,a,i,l,o;t=new Be({props:{show_label:n[6],info:n[4],$$slots:{default:[Ne]},$$scope:{ctx:n}}});const c=[ze,Se],s=[];function r(f,g){return f[1]===1&&f[7]===1?0:1}return i=r(n),l=s[i]=c[i](n),{c(){e=D("label"),S(t.$$.fragment),a=R(),l.c(),b(e,"class","svelte-4xt1ch")},m(f,g){y(f,e,g),z(t,e,null),re(e,a),s[i].m(e,null),o=!0},p(f,[g]){const v={};g&64&&(v.show_label=f[6]),g&16&&(v.info=f[4]),g&1073741832&&(v.$$scope={dirty:g,ctx:f}),t.$set(v);let h=i;i=r(f),i===h?s[i].p(f,g):(J(),p(s[h],1,1,()=>{s[h]=null}),M(),l=s[i],l?l.p(f,g):(l=s[i]=c[i](f),l.c()),m(l,1),l.m(e,null))},i(f){o||(m(t.$$.fragment,f),m(l),o=!0)},o(f){p(t.$$.fragment,f),p(l),o=!1},d(f){f&&w(e),L(t),s[i].d()}}}function Ie(n,e,t){let{value:a=""}=e,{lines:i=1}=e,{placeholder:l="Type here..."}=e,{label:o}=e,{info:c=void 0}=e,{disabled:s=!1}=e,{show_label:r=!0}=e,{max_lines:f}=e,{type:g="text"}=e,{style:v={}}=e,h,H=!1,N;const E=_e();function Y(u){E("change",u)}function A(){E("blur")}async function O(){"clipboard"in navigator&&(await navigator.clipboard.writeText(a),P())}function P(){t(11,H=!0),N&&clearTimeout(N),N=setTimeout(()=>{t(11,H=!1)},1e3)}function Q(u){const T=u.target,K=T.value,C=[T.selectionStart,T.selectionEnd];E("select",{value:K.substring(...C),index:C})}async function _(u){await U(),(u.key==="Enter"&&u.shiftKey&&i>1||u.key==="Enter"&&!u.shiftKey&&i===1&&f>=1)&&(u.preventDefault(),E("submit"))}async function q(u){if(await U(),i===f)return;let T=f===!1?!1:f===void 0?21*11:21*(f+1),K=21*(i+1);const C=u.target;C.style.height="1px";let F;T&&C.scrollHeight>T?F=T:C.scrollHeight<K?F=K:F=C.scrollHeight,C.style.height=`${F}px`}function te(u,T){if(i!==f&&(u.style.overflowY="scroll",u.addEventListener("input",q),!!T.trim()))return q({target:u}),{destroy:()=>u.removeEventListener("input",q)}}function le(){a=this.value,t(0,a)}function ne(u){j[u?"unshift":"push"](()=>{h=u,t(10,h)})}function ie(){a=this.value,t(0,a)}function se(u){j[u?"unshift":"push"](()=>{h=u,t(10,h)})}function ae(){a=this.value,t(0,a)}function ue(u){j[u?"unshift":"push"](()=>{h=u,t(10,h)})}function fe(){a=this.value,t(0,a)}function oe(u){j[u?"unshift":"push"](()=>{h=u,t(10,h)})}return n.$$set=u=>{"value"in u&&t(0,a=u.value),"lines"in u&&t(1,i=u.lines),"placeholder"in u&&t(2,l=u.placeholder),"label"in u&&t(3,o=u.label),"info"in u&&t(4,c=u.info),"disabled"in u&&t(5,s=u.disabled),"show_label"in u&&t(6,r=u.show_label),"max_lines"in u&&t(7,f=u.max_lines),"type"in u&&t(8,g=u.type),"style"in u&&t(9,v=u.style)},n.$$.update=()=>{n.$$.dirty&1155&&h&&i!==f&&q({target:h}),n.$$.dirty&1&&Y(a)},[a,i,l,o,c,s,r,f,g,v,h,H,A,O,Q,_,te,le,ne,ie,se,ae,ue,fe,oe]}class Je extends Z{constructor(e){super(),x(this,e,Ie,Ge,$,{value:0,lines:1,placeholder:2,label:3,info:4,disabled:5,show_label:6,max_lines:7,type:8,style:9})}}function X(n){let e,t;const a=[n[12]];let i={};for(let l=0;l<a.length;l+=1)i=Te(i,a[l]);return e=new Ee({props:i}),{c(){S(e.$$.fragment)},m(l,o){z(e,l,o),t=!0},p(l,o){const c=o&4096?pe(a,[ye(l[12])]):{};e.$set(c)},i(l){t||(m(e.$$.fragment,l),t=!0)},o(l){p(e.$$.fragment,l),t=!1},d(l){L(e,l)}}}function Me(n){let e,t,a,i,l=n[12]&&X(n);function o(s){n[14](s)}let c={label:n[1],info:n[2],show_label:n[8],lines:n[6],type:n[10],max_lines:!n[9]&&n[13]==="static"?n[6]+1:n[9],placeholder:n[7],style:n[11],disabled:n[13]==="static"};return n[0]!==void 0&&(c.value=n[0]),t=new Je({props:c}),j.push(()=>we(t,"value",o)),t.$on("change",n[15]),t.$on("submit",n[16]),t.$on("blur",n[17]),t.$on("select",n[18]),{c(){l&&l.c(),e=R(),S(t.$$.fragment)},m(s,r){l&&l.m(s,r),y(s,e,r),z(t,s,r),i=!0},p(s,r){s[12]?l?(l.p(s,r),r&4096&&m(l,1)):(l=X(s),l.c(),m(l,1),l.m(e.parentNode,e)):l&&(J(),p(l,1,1,()=>{l=null}),M());const f={};r&2&&(f.label=s[1]),r&4&&(f.info=s[2]),r&256&&(f.show_label=s[8]),r&64&&(f.lines=s[6]),r&1024&&(f.type=s[10]),r&8768&&(f.max_lines=!s[9]&&s[13]==="static"?s[6]+1:s[9]),r&128&&(f.placeholder=s[7]),r&2048&&(f.style=s[11]),r&8192&&(f.disabled=s[13]==="static"),!a&&r&1&&(a=!0,f.value=s[0],ve(()=>a=!1)),t.$set(f)},i(s){i||(m(l),m(t.$$.fragment,s),i=!0)},o(s){p(l),p(t.$$.fragment,s),i=!1},d(s){l&&l.d(s),s&&w(e),L(t,s)}}}function Ve(n){let e,t;return e=new Ce({props:{visible:n[5],elem_id:n[3],elem_classes:n[4],disable:typeof n[11].container=="boolean"&&!n[11].container,$$slots:{default:[Me]},$$scope:{ctx:n}}}),{c(){S(e.$$.fragment)},m(a,i){z(e,a,i),t=!0},p(a,[i]){const l={};i&32&&(l.visible=a[5]),i&8&&(l.elem_id=a[3]),i&16&&(l.elem_classes=a[4]),i&2048&&(l.disable=typeof a[11].container=="boolean"&&!a[11].container),i&540615&&(l.$$scope={dirty:i,ctx:a}),e.$set(l)},i(a){t||(m(e.$$.fragment,a),t=!0)},o(a){p(e.$$.fragment,a),t=!1},d(a){L(e,a)}}}function Ye(n,e,t){let{label:a="Textbox"}=e,{info:i=void 0}=e,{elem_id:l=""}=e,{elem_classes:o=[]}=e,{visible:c=!0}=e,{value:s=""}=e,{lines:r}=e,{placeholder:f=""}=e,{show_label:g}=e,{max_lines:v}=e,{type:h="text"}=e,{style:H={}}=e,{loading_status:N=void 0}=e,{mode:E}=e;function Y(_){s=_,t(0,s)}function A(_){G.call(this,n,_)}function O(_){G.call(this,n,_)}function P(_){G.call(this,n,_)}function Q(_){G.call(this,n,_)}return n.$$set=_=>{"label"in _&&t(1,a=_.label),"info"in _&&t(2,i=_.info),"elem_id"in _&&t(3,l=_.elem_id),"elem_classes"in _&&t(4,o=_.elem_classes),"visible"in _&&t(5,c=_.visible),"value"in _&&t(0,s=_.value),"lines"in _&&t(6,r=_.lines),"placeholder"in _&&t(7,f=_.placeholder),"show_label"in _&&t(8,g=_.show_label),"max_lines"in _&&t(9,v=_.max_lines),"type"in _&&t(10,h=_.type),"style"in _&&t(11,H=_.style),"loading_status"in _&&t(12,N=_.loading_status),"mode"in _&&t(13,E=_.mode)},[s,a,i,l,o,c,r,f,g,v,h,H,N,E,Y,A,O,P,Q]}class Xe extends Z{constructor(e){super(),x(this,e,Ye,Ve,$,{label:1,info:2,elem_id:3,elem_classes:4,visible:5,value:0,lines:6,placeholder:7,show_label:8,max_lines:9,type:10,style:11,loading_status:12,mode:13})}get label(){return this.$$.ctx[1]}set label(e){this.$$set({label:e}),k()}get info(){return this.$$.ctx[2]}set info(e){this.$$set({info:e}),k()}get elem_id(){return this.$$.ctx[3]}set elem_id(e){this.$$set({elem_id:e}),k()}get elem_classes(){return this.$$.ctx[4]}set elem_classes(e){this.$$set({elem_classes:e}),k()}get visible(){return this.$$.ctx[5]}set visible(e){this.$$set({visible:e}),k()}get value(){return this.$$.ctx[0]}set value(e){this.$$set({value:e}),k()}get lines(){return this.$$.ctx[6]}set lines(e){this.$$set({lines:e}),k()}get placeholder(){return this.$$.ctx[7]}set placeholder(e){this.$$set({placeholder:e}),k()}get show_label(){return this.$$.ctx[8]}set show_label(e){this.$$set({show_label:e}),k()}get max_lines(){return this.$$.ctx[9]}set max_lines(e){this.$$set({max_lines:e}),k()}get type(){return this.$$.ctx[10]}set type(e){this.$$set({type:e}),k()}get style(){return this.$$.ctx[11]}set style(e){this.$$set({style:e}),k()}get loading_status(){return this.$$.ctx[12]}set loading_status(e){this.$$set({loading_status:e}),k()}get mode(){return this.$$.ctx[13]}set mode(e){this.$$set({mode:e}),k()}}export{Xe as T};
//# sourceMappingURL=Textbox.d326b7aa.js.map
