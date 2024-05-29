import{a9 as C,r as E,A as s,aa as F,ab as O,ac as K,ad as R,ae as q,af as I,ag as M,ah as H,o as U,w as J,ai as V,aj as Q,ak as W,al as X,am as Y,F as Z,an as ee,ao as S,ap as ae,e as w,l as k,i as g,v as $,j as y,n as m,E as z,x as B,q as D,h as te,aq as le,ar as se}from"./index-71957d41.js";import{E as re,K as ne}from"./label-847435e5.js";let L=Symbol("GroupContext"),oe=C({name:"SwitchGroup",props:{as:{type:[Object,String],default:"template"}},setup(t,{slots:f,attrs:e}){let r=E(null),i=re({name:"SwitchLabel",props:{htmlFor:s(()=>{var o;return(o=r.value)==null?void 0:o.id}),onClick(o){r.value&&(o.currentTarget.tagName==="LABEL"&&o.preventDefault(),r.value.click(),r.value.focus({preventScroll:!0}))}}}),p=F({name:"SwitchDescription"});return O(L,{switchRef:r,labelledby:i,describedby:p}),()=>K({theirProps:t,ourProps:{},slot:{},slots:f,attrs:e,name:"SwitchGroup"})}}),ie=C({name:"Switch",emits:{"update:modelValue":t=>!0},props:{as:{type:[Object,String],default:"button"},modelValue:{type:Boolean,default:void 0},defaultChecked:{type:Boolean,optional:!0},form:{type:String,optional:!0},name:{type:String,optional:!0},value:{type:String,optional:!0},id:{type:String,default:null}},inheritAttrs:!1,setup(t,{emit:f,attrs:e,slots:r,expose:i}){var p;let o=(p=t.id)!=null?p:`headlessui-switch-${R()}`,u=q(L,null),[d,v]=I(s(()=>t.modelValue),a=>f("update:modelValue",a),s(()=>t.defaultChecked));function b(){v(!d.value)}let l=E(null),n=u===null?l:u.switchRef,x=M(s(()=>({as:t.as,type:e.type})),n);i({el:n,$el:n});function j(a){a.preventDefault(),b()}function N(a){a.key===S.Space?(a.preventDefault(),b()):a.key===S.Enter&&ae(a.currentTarget)}function T(a){a.preventDefault()}let h=s(()=>{var a,c;return(c=(a=H(n))==null?void 0:a.closest)==null?void 0:c.call(a,"form")});return U(()=>{J([h],()=>{if(!h.value||t.defaultChecked===void 0)return;function a(){v(t.defaultChecked)}return h.value.addEventListener("reset",a),()=>{var c;(c=h.value)==null||c.removeEventListener("reset",a)}},{immediate:!0})}),()=>{let{name:a,value:c,form:A,...G}=t,P={checked:d.value},_={id:o,ref:n,role:"switch",type:x.value,tabIndex:0,"aria-checked":d.value,"aria-labelledby":u==null?void 0:u.labelledby.value,"aria-describedby":u==null?void 0:u.describedby.value,onClick:j,onKeyup:N,onKeypress:T};return V(Z,[a!=null&&d.value!=null?V(Q,W({features:X.Hidden,as:"input",type:"checkbox",hidden:!0,readOnly:!0,checked:d.value,form:A,name:a,value:c})):null,K({ourProps:_,theirProps:{...e,...Y(G,["modelValue","defaultChecked"])},slot:P,attrs:e,slots:r,name:"Switch"})])}}}),ue=ne,de=ee;const me=C({__name:"Switch",props:{size:{default:"sm"},label:{default:""},description:{default:""},disabled:{type:Boolean,default:!1},modelValue:{type:[Boolean,Number,String]}},emits:["change","update:modelValue"],setup(t,{emit:f}){const e=t,r=f,i=s(()=>e.label&&e.description?2:e.label?1:0),p=s(()=>["relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center","focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400","disabled:cursor-not-allowed disabled:bg-gray-200",e.modelValue?"bg-gray-900 enabled:hover:bg-gray-800 active:bg-gray-700 group-hover:enabled:bg-gray-800":"bg-gray-300 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",e.size==="md"?"h-5 w-8 border-[3px]":"h-4 w-[26px] border-2"]),o=s(()=>["pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-100 ease-in-out",e.size==="md"?"h-3.5 w-3.5":"h-3 w-3",e.size==="md"?e.modelValue?"translate-x-3":"translate-x-0":e.modelValue?"translate-x-2.5":"translate-x-0"]),u=s(()=>["font-medium leading-normal",e.disabled&&i.value===1?"text-gray-500":"text-gray-800",e.size==="md"?"text-lg":"text-base"]),d=s(()=>["max-w-xs text-p-base text-gray-700"]),v=s(()=>{const l=["flex justify-between"];return i.value===1?(l.push("group items-center space-x-3 cursor-pointer rounded focus-visible:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"),l.push(e.disabled?"cursor-not-allowed":"hover:bg-gray-200 active:bg-gray-300"),l.push(e.size==="md"?"px-3 py-1.5":"px-2.5 py-1.5")):i.value===2&&(l.push("items-start"),l.push(e.size==="md"?"space-x-3.5":"space-x-2.5")),l}),b=s(()=>["flex flex-col text-left space-y-0.5"]);return(l,n)=>(w(),k(y(oe),{as:"div",tabindex:i.value==1?0:-1,onKeyup:n[1]||(n[1]=le(se(x=>r("update:modelValue",!l.modelValue),["self"]),["space"])),class:m(v.value)},{default:g(()=>[$("span",{class:m(b.value)},[e.label?(w(),k(y(ue),{key:0,as:"span",class:m(u.value)},{default:g(()=>[z(B(e.label),1)]),_:1},8,["class"])):D("",!0),e.description?(w(),k(y(de),{key:1,as:"span",class:m(d.value)},{default:g(()=>[z(B(e.description),1)]),_:1},8,["class"])):D("",!0)],2),te(y(ie),{disabled:e.disabled,"model-value":l.modelValue,class:m(p.value),"onUpdate:modelValue":n[0]||(n[0]=x=>r("update:modelValue",!l.modelValue))},{default:g(()=>[$("span",{"aria-hidden":"true",class:m(o.value)},null,2)]),_:1},8,["disabled","model-value","class"])]),_:1},8,["tabindex","class"]))}});export{me as _};
//# sourceMappingURL=Switch.vue_vue_type_script_setup_true_lang-2ffb2d12.js.map
