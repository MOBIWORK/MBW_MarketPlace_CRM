import{a2 as C,r as I,ab as z,ae as ue,ac as ae,z as m,b6 as F,a4 as _,o as D,w as le,b7 as oe,aa as x,a5 as E,af as ie,F as W,a6 as ne,b8 as re,a7 as M,a9 as de,b9 as H,ba as q,ah as w,bb as j,bc as ve,bd as ce,be as O,bf as k,B as K,e as A,l as R,i as B,h as Q,j as L,n as V,f as J,k as X,an as Y,ao as Z,ap as ee,t as te,Q as fe,p as pe,aj as be,v as xe,aq as me}from"./index-57f524e0.js";let ye=C({props:{onFocus:{type:Function,required:!0}},setup(e){let c=I(!0);return()=>c.value?z(ae,{as:"button",type:"button",features:ue.Focusable,onFocus(d){d.preventDefault();let f,i=50;function u(){var a;if(i--<=0){f&&cancelAnimationFrame(f);return}if((a=e.onFocus)!=null&&a.call(e)){c.value=!1,cancelAnimationFrame(f);return}f=requestAnimationFrame(u)}f=requestAnimationFrame(u)}}):null}});var ge=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(ge||{}),Ie=(e=>(e[e.Less=-1]="Less",e[e.Equal=0]="Equal",e[e.Greater=1]="Greater",e))(Ie||{});let se=Symbol("TabsContext");function N(e){let c=M(se,null);if(c===null){let d=new Error(`<${e} /> is missing a parent <TabGroup /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(d,N),d}return c}let U=Symbol("TabsSSRContext"),he=C({name:"TabGroup",emits:{change:e=>!0},props:{as:{type:[Object,String],default:"template"},selectedIndex:{type:[Number],default:null},defaultIndex:{type:[Number],default:0},vertical:{type:[Boolean],default:!1},manual:{type:[Boolean],default:!1}},inheritAttrs:!1,setup(e,{slots:c,attrs:d,emit:f}){var i;let u=I((i=e.selectedIndex)!=null?i:e.defaultIndex),a=I([]),n=I([]),y=m(()=>e.selectedIndex!==null),S=m(()=>y.value?e.selectedIndex:u.value);function g(t){var s;let v=F(o.tabs.value,x),l=F(o.panels.value,x),b=v.filter(P=>{var T;return!((T=x(P))!=null&&T.hasAttribute("disabled"))});if(t<0||t>v.length-1){let P=q(u.value===null?0:Math.sign(t-u.value),{[-1]:()=>1,0:()=>q(Math.sign(t),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0}),T=q(P,{0:()=>v.indexOf(b[0]),1:()=>v.indexOf(b[b.length-1])});T!==-1&&(u.value=T),o.tabs.value=v,o.panels.value=l}else{let P=v.slice(0,t),T=[...v.slice(t),...P].find(G=>b.includes(G));if(!T)return;let $=(s=v.indexOf(T))!=null?s:o.selectedIndex.value;$===-1&&($=o.selectedIndex.value),u.value=$,o.tabs.value=v,o.panels.value=l}}let o={selectedIndex:m(()=>{var t,s;return(s=(t=u.value)!=null?t:e.defaultIndex)!=null?s:null}),orientation:m(()=>e.vertical?"vertical":"horizontal"),activation:m(()=>e.manual?"manual":"auto"),tabs:a,panels:n,setSelectedIndex(t){S.value!==t&&f("change",t),y.value||g(t)},registerTab(t){var s;if(a.value.includes(t))return;let v=a.value[u.value];a.value.push(t),a.value=F(a.value,x);let l=(s=a.value.indexOf(v))!=null?s:u.value;l!==-1&&(u.value=l)},unregisterTab(t){let s=a.value.indexOf(t);s!==-1&&a.value.splice(s,1)},registerPanel(t){n.value.includes(t)||(n.value.push(t),n.value=F(n.value,x))},unregisterPanel(t){let s=n.value.indexOf(t);s!==-1&&n.value.splice(s,1)}};_(se,o);let r=I({tabs:[],panels:[]}),h=I(!1);D(()=>{h.value=!0}),_(U,m(()=>h.value?null:r.value));let p=m(()=>e.selectedIndex);return D(()=>{le([p],()=>{var t;return g((t=e.selectedIndex)!=null?t:e.defaultIndex)},{immediate:!0})}),oe(()=>{if(!y.value||S.value==null||o.tabs.value.length<=0)return;let t=F(o.tabs.value,x);t.some((s,v)=>x(o.tabs.value[v])!==x(s))&&o.setSelectedIndex(t.findIndex(s=>x(s)===x(o.tabs.value[S.value])))}),()=>{let t={selectedIndex:u.value};return z(W,[a.value.length<=0&&z(ye,{onFocus:()=>{for(let s of a.value){let v=x(s);if((v==null?void 0:v.tabIndex)===0)return v.focus(),!0}return!1}}),E({theirProps:{...d,...ie(e,["selectedIndex","defaultIndex","manual","vertical","onChange"])},ourProps:{},slot:t,slots:c,attrs:d,name:"TabGroup"})])}}}),Pe=C({name:"TabList",props:{as:{type:[Object,String],default:"div"}},setup(e,{attrs:c,slots:d}){let f=N("TabList");return()=>{let i={selectedIndex:f.selectedIndex.value},u={role:"tablist","aria-orientation":f.orientation.value};return E({ourProps:u,theirProps:e,slot:i,attrs:c,slots:d,name:"TabList"})}}}),Te=C({name:"Tab",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(e,{attrs:c,slots:d,expose:f}){var i;let u=(i=e.id)!=null?i:`headlessui-tabs-tab-${ne()}`,a=N("Tab"),n=I(null);f({el:n,$el:n}),D(()=>a.registerTab(n)),re(()=>a.unregisterTab(n));let y=M(U),S=m(()=>{if(y.value){let l=y.value.tabs.indexOf(u);return l===-1?y.value.tabs.push(u)-1:l}return-1}),g=m(()=>{let l=a.tabs.value.indexOf(n);return l===-1?S.value:l}),o=m(()=>g.value===a.selectedIndex.value);function r(l){var b;let P=l();if(P===j.Success&&a.activation.value==="auto"){let T=(b=ce(n))==null?void 0:b.activeElement,$=a.tabs.value.findIndex(G=>x(G)===T);$!==-1&&a.setSelectedIndex($)}return P}function h(l){let b=a.tabs.value.map(P=>x(P)).filter(Boolean);if(l.key===w.Space||l.key===w.Enter){l.preventDefault(),l.stopPropagation(),a.setSelectedIndex(g.value);return}switch(l.key){case w.Home:case w.PageUp:return l.preventDefault(),l.stopPropagation(),r(()=>O(b,k.First));case w.End:case w.PageDown:return l.preventDefault(),l.stopPropagation(),r(()=>O(b,k.Last))}if(r(()=>q(a.orientation.value,{vertical(){return l.key===w.ArrowUp?O(b,k.Previous|k.WrapAround):l.key===w.ArrowDown?O(b,k.Next|k.WrapAround):j.Error},horizontal(){return l.key===w.ArrowLeft?O(b,k.Previous|k.WrapAround):l.key===w.ArrowRight?O(b,k.Next|k.WrapAround):j.Error}}))===j.Success)return l.preventDefault()}let p=I(!1);function t(){var l;p.value||(p.value=!0,!e.disabled&&((l=x(n))==null||l.focus({preventScroll:!0}),a.setSelectedIndex(g.value),ve(()=>{p.value=!1})))}function s(l){l.preventDefault()}let v=de(m(()=>({as:e.as,type:c.type})),n);return()=>{var l;let b={selected:o.value},{...P}=e,T={ref:n,onKeydown:h,onMousedown:s,onClick:t,id:u,role:"tab",type:v.value,"aria-controls":(l=x(a.panels.value[g.value]))==null?void 0:l.id,"aria-selected":o.value,tabIndex:o.value?0:-1,disabled:e.disabled?!0:void 0};return E({ourProps:T,theirProps:P,slot:b,attrs:c,slots:d,name:"Tab"})}}}),Se=C({name:"TabPanels",props:{as:{type:[Object,String],default:"div"}},setup(e,{slots:c,attrs:d}){let f=N("TabPanels");return()=>{let i={selectedIndex:f.selectedIndex.value};return E({theirProps:e,ourProps:{},slot:i,attrs:d,slots:c,name:"TabPanels"})}}}),we=C({name:"TabPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},id:{type:String,default:null},tabIndex:{type:Number,default:0}},setup(e,{attrs:c,slots:d,expose:f}){var i;let u=(i=e.id)!=null?i:`headlessui-tabs-panel-${ne()}`,a=N("TabPanel"),n=I(null);f({el:n,$el:n}),D(()=>a.registerPanel(n)),re(()=>a.unregisterPanel(n));let y=M(U),S=m(()=>{if(y.value){let r=y.value.panels.indexOf(u);return r===-1?y.value.panels.push(u)-1:r}return-1}),g=m(()=>{let r=a.panels.value.indexOf(n);return r===-1?S.value:r}),o=m(()=>g.value===a.selectedIndex.value);return()=>{var r;let h={selected:o.value},{tabIndex:p,...t}=e,s={ref:n,id:u,role:"tabpanel","aria-labelledby":(r=x(a.tabs.value[g.value]))==null?void 0:r.id,tabIndex:o.value?p:-1};return!o.value&&e.unmount&&!e.static?z(ae,{as:"span","aria-hidden":!0,...s}):E({ourProps:s,theirProps:t,slot:h,attrs:c,slots:d,features:H.Static|H.RenderStrategy,visible:o.value,name:"TabPanel"})}}});const $e={__name:"Tabs",props:{tabs:{type:Array,required:!0},modelValue:{type:Number,default:0},tablistClass:{type:String,default:""},tabPanelClass:{type:String,default:""},options:{type:Object,default:()=>({indicatorLeft:20})}},emits:["update:modelValue"],setup(e,{emit:c}){var o;const d=e,f=c,i=m({get:()=>d.modelValue,set:r=>f("update:modelValue",r)}),u=I([]),a=I(null),n=m(()=>{var r;return(r=d.tabs)==null?void 0:r.length}),y=I((o=d.options)==null?void 0:o.indicatorLeft),S=I("");function g(r){r>=n.value&&(r=n.value-1);const h=u.value[r].el;a.value.style.width=`${h.offsetWidth}px`,y.value=h.offsetLeft}return le(i,r=>{r>=n.value&&(i.value=n.value-1),K(()=>g(r))}),D(()=>{g(i.value),K(()=>{S.value="transition-all duration-300 ease-in-out"})}),(r,h)=>(A(),R(L(he),{as:"div",class:"flex flex-1 flex-col",defaultIndex:i.value,selectedIndex:i.value,onChange:h[0]||(h[0]=p=>i.value=p)},{default:B(()=>[Q(L(Pe),{class:V(["relative flex items-center gap-7.5 overflow-x-auto border-b pl-5",e.tablistClass])},{default:B(()=>[(A(!0),J(W,null,X(e.tabs,(p,t)=>(A(),R(L(Te),{ref_for:!0,ref_key:"tabRef",ref:u,as:"template",key:t,class:"focus:outline-none focus:transition-none"},{default:B(({selected:s})=>[Y(r.$slots,"tab",Z(ee({tab:p,selected:s})),()=>[te("button",{class:V(["flex items-center gap-1.5 border-b border-transparent py-3 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900",{"text-gray-900":s}])},[p.icon?(A(),R(fe(p.icon),{key:0,class:"size-4"})):pe("",!0),be(" "+xe(p.label),1)],2)])]),_:2},1024))),128)),te("div",{ref_key:"indicator",ref:a,class:V(["absolute bottom-0 h-px bg-gray-900",S.value]),style:me({left:`${y.value}px`})},null,6)]),_:3},8,["class"]),Q(L(Se),{class:V(["flex flex-1 overflow-hidden",e.tabPanelClass])},{default:B(()=>[(A(!0),J(W,null,X(e.tabs,(p,t)=>(A(),R(L(we),{class:"flex flex-1 flex-col overflow-y-auto focus:outline-none",key:t},{default:B(()=>[Y(r.$slots,"default",Z(ee({tab:p})))]),_:2},1024))),128))]),_:3},8,["class"])]),_:3},8,["defaultIndex","selectedIndex"]))}};export{$e as _};
//# sourceMappingURL=Tabs-844731e8.js.map
