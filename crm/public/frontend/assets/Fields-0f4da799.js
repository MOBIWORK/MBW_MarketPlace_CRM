import{E as Q,_ as X}from"./EditIcon-fc06c5a8.js";import{l as W,o as i,b as h,d as u,G as j,H as Y,aG as O,s as A,m as Z,v as P,t as w,f as r,aA as K,az as N,u as v,bo as ee,a as C,w as d,M as E,k as $,A as te,O as R,F as S,x as L,n as z,j as oe,S as M,b3 as ae,af as T,aL as G,K as H}from"./index-fd4111d0.js";import{I as ne}from"./IndicatorIcon-b09272ab.js";const se={},le={width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},re=u("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM11.2909 5.98482C11.4666 5.77175 11.4363 5.45663 11.2232 5.28096C11.0101 5.1053 10.695 5.13561 10.5193 5.34868L7.07001 9.53239L5.72845 7.79857C5.55946 7.58018 5.24543 7.54012 5.02703 7.70911C4.80863 7.8781 4.76858 8.19214 4.93756 8.41053L6.66217 10.6394C6.7552 10.7596 6.89788 10.831 7.04988 10.8334C7.20188 10.8357 7.3467 10.7688 7.4434 10.6515L11.2909 5.98482Z",fill:"currentColor"},null,-1),ce=[re];function ie(n,b){return i(),h("svg",le,ce)}const ue=W(se,[["render",ie]]),de={class:"group flex w-full items-center justify-between rounded bg-transparent p-1 pl-2 text-base text-gray-800 transition-colors hover:bg-gray-200 active:bg-gray-300"},me={class:"flex items-center justify-between gap-7"},he={class:"actions flex items-center justify-center"},ve={__name:"DropdownItem",props:{option:{type:Object,default:()=>{}}},setup(n){const b=n,g=j(!1),m=j(!1),y=j(null);Y(()=>{var V;(V=b.option)!=null&&V.value||(g.value=!0,m.value=!0,O(()=>y.value.el.focus()))});const _=()=>{g.value=!g.value,g.value&&O(()=>y.value.el.focus())},f=()=>{_(),b.option.onSave(b.option,m.value),m.value=!1};return(V,x)=>{const B=A("Button"),D=A("FeatherIcon");return i(),h("div",de,[u("div",me,[Z(u("div",null,w(n.option.value),513),[[P,!g.value]]),Z(r(v(ee),{ref_key:"inputRef",ref:y,modelValue:n.option.value,"onUpdate:modelValue":x[0]||(x[0]=k=>n.option.value=k),class:"w-full",placeholder:n.option.placeholder,onBlur:K(f,["stop"]),onKeydown:x[1]||(x[1]=N(K(k=>k.target.blur(),["stop"]),["enter"]))},null,8,["modelValue","placeholder"]),[[P,g.value]]),u("div",he,[!m.value&&!n.option.selected?(i(),C(v(E),{key:0,text:"Set As Primary"},{default:d(()=>[u("div",null,[r(B,{variant:"ghost",size:"sm",class:"opacity-0 hover:bg-gray-300 group-hover:opacity-100",onClick:n.option.onClick},{default:d(()=>[r(ue)]),_:1},8,["onClick"])])]),_:1})):$("",!0),r(v(E),{text:"Edit"},{default:d(()=>[u("div",null,[r(B,{variant:"ghost",size:"sm",class:"opacity-0 hover:bg-gray-300 group-hover:opacity-100",onClick:_},{default:d(()=>[r(Q)]),_:1})])]),_:1}),r(v(E),{text:"Delete"},{default:d(()=>[u("div",null,[r(B,{variant:"ghost",icon:"x",size:"sm",class:"opacity-0 hover:bg-gray-300 group-hover:opacity-100",onClick:x[2]||(x[2]=()=>n.option.onDelete(n.option,m.value))})])]),_:1})])]),u("div",null,[n.option.selected?(i(),C(D,{key:0,name:"check",class:"text-primary-500 h-4 w-6",size:"sm"})):$("",!0)])])}}};const pe={class:"flex flex-col gap-4"},ge={class:"mb-2 text-sm text-gray-600",style:{display:"flex","justify-content":"space-between"}},ye={key:0,class:"text-red-500"},_e={key:1},fe={class:"cursor-pointer"},xe={key:3},be={class:"truncate"},we={class:"my-2 space-y-1.5 divide-y rounded-lg border border-gray-100 bg-white p-1.5 shadow-xl"},Ce={key:1},ke={class:"p-1.5 px-7 text-base text-gray-500"},$e={class:"pt-1.5"},Ve={key:4},Be={class:"w-[100px]"},Ie={key:0},Me={class:"py-1"},je={key:6},Ee={style:{display:"flex","justify-content":"space-between"},class:"mt-2"},Fe={class:"whitespace-pre-line text-sm text-red-600"},ze=["onClick"],Ae={__name:"Fields",props:{sections:Array,data:Object},setup(n){const{getUser:b}=te(),g=n;R({});const m=R({}),y=j(!1),_=R({}),f=j(""),V=(t,o)=>{},x=()=>{y.value=!y.value},B=t=>{g.data[t]=f.value,_[t]=!1,f.value="",/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/.test(g.data[t])?delete m[t]:m[t]=__("Invalid Email")},D=(t,o)=>{const c=/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/,a=/^(\+84|0)\d{9}$/;if(t!=null&&t!=""){if((o=="email"||o=="email_id")&&(c.test(t)?delete m[o]:m[o]=__("Invalid Email"),q(t)?(_[o]=!1,f.value=""):(_[o]=!0,f.value=J(t))),o=="mobile_no"||o=="actual_mobile_no"){let s=t.replace(/\s+/g,"").replace(/^(\+?84|0|84)/,"0");s.length>0&&s[0]!="0"&&(s=`0${s}`),g.data[o]=s,a.test(s)?delete m[o]:m[o]=__("Invalid phone number")}}else(o=="email"||o=="email_id")&&(delete m[o],_[o]=!1,f.value=""),(o=="mobile_no"||o=="actual_mobile_no")&&delete m[o]},k=(t,o)=>{const c=[];for(let a=0;a<=o.length;a++)c[a]=[a];for(let a=0;a<=t.length;a++)c[0][a]=a;for(let a=1;a<=o.length;a++)for(let s=1;s<=t.length;s++)o.charAt(a-1)===t.charAt(s-1)?c[a][s]=c[a-1][s-1]:c[a][s]=Math.min(c[a-1][s-1]+1,Math.min(c[a][s-1]+1,c[a-1][s]+1));return c[o.length][t.length]},q=t=>{const o=["gmail.com","yahoo.com","hotmail.com","outlook.com"],c=t.split("@");if(c.length!==2)return!0;const a=c[1];if(o.indexOf(a)>=0)return!0;{const s=["gmail.com","yahoo.com","hotmail.com","outlook.com"],e=t.split("@");if(e.length!==2)return H({title:__("Error"),text:__("Lỗi định dạng email"),icon:"x",iconClasses:"text-red-600"}),t;const l=e[1];let p=1/0,I=-1;for(let F=0;F<s.length;F++){const U=k(l,s[F]);U<p&&(p=U,I=F)}return I==-1}},J=t=>{const o=["gmail.com","yahoo.com","hotmail.com","outlook.com"],c=t.split("@");if(c.length!==2)return H({title:__("Error"),text:__("Lỗi định dạng email"),icon:"x",iconClasses:"text-red-600"}),t;const a=c[1];let s=a,e=1/0,l=-1;for(let p=0;p<o.length;p++){const I=k(a,o[p]);I<e&&(e=I,l=p,s=o[p])}return l!=-1?`${c[0]}@${s}`:t};return(t,o)=>{const c=A("FormControl"),a=A("Button");return i(),h("div",pe,[(i(!0),h(S,null,L(n.sections,s=>(i(),h("div",{key:s.section,class:z(["first:border-t-0 first:pt-0",s.hideBorder?"":"border-t pt-4"])},[u("div",{class:z(["grid gap-4",s.columns?"grid-cols-"+s.columns:"grid-cols-3"])},[(i(!0),h(S,null,L(s.fields,e=>(i(),h("div",{key:e.name},[u("div",ge,[oe(w(t.__(e.label))+" ",1),e.mandatory?(i(),h("span",ye,"*")):$("",!0),m[e.name]?(i(),h("div",_e,[r(v(E),{text:m[e.name],placement:"top"},{default:d(()=>[r(v(M),{name:"alert-triangle",class:"h-4 w-4 text-red-500"})]),_:2},1032,["text"])])):$("",!0)]),e.type==="select"?(i(),C(c,{key:0,type:"select",class:z(["form-control truncate",e.prefix?"prefix":""]),options:e.options,modelValue:n.data[e.name],"onUpdate:modelValue":l=>n.data[e.name]=l,placeholder:t.__(e.placeholder)},ae({_:2},[e.prefix?{name:"prefix",fn:d(()=>[r(ne,{class:z(e.prefix)},null,8,["class"])]),key:"0"}:void 0]),1032,["class","options","modelValue","onUpdate:modelValue","placeholder"])):e.type==="link"?(i(),C(T,{key:1,class:"form-control truncate",value:n.data[e.name],doctype:e.doctype,onChange:l=>n.data[e.name]=l,placeholder:t.__(e.placeholder),onCreate:e.create},null,8,["value","doctype","onChange","placeholder","onCreate"])):e.type==="user"?(i(),C(T,{key:2,class:"form-control truncate",value:v(b)(n.data[e.name]).full_name,doctype:e.doctype,onChange:l=>n.data[e.name]=l,placeholder:t.__(e.placeholder),hideMe:!0,hideClear:e.hidden_delete},{prefix:d(()=>[r(G,{class:"mr-2",user:n.data[e.name],size:"sm"},null,8,["user"])]),"item-prefix":d(({option:l})=>[r(G,{class:"mr-2",user:l.value,size:"sm"},null,8,["user"])]),"item-label":d(({option:l})=>[r(v(E),{text:l.value},{default:d(()=>[u("div",fe,w(v(b)(l.value).full_name),1)]),_:2},1032,["text"])]),_:2},1032,["value","doctype","onChange","placeholder","hideClear"])):e.type==="dropdown"?(i(),h("div",xe,[r(X,null,{target:d(({open:l})=>[r(a,{label:n.data[e.name],class:"truncate dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400"},{suffix:d(()=>[r(v(M),{name:l?"chevron-up":"chevron-down",class:"h-4 text-gray-600"},null,8,["name"])]),default:d(()=>[u("div",be,w(n.data[e.name]),1)]),_:2},1032,["label"])]),body:d(()=>{var l;return[u("div",we,[u("div",null,[(l=e.options)!=null&&l.length?(i(!0),h(S,{key:0},L(e.options,p=>(i(),C(ve,{key:p.name,option:p},null,8,["option"]))),128)):(i(),h("div",Ce,[u("div",ke,w(t.__("No {0} Available",[e.label])),1)]))]),u("div",$e,[r(a,{variant:"ghost",class:"w-full !justify-start",label:t.__("Create New"),onClick:p=>e.create()},{prefix:d(()=>[r(v(M),{name:"plus",class:"h-4"})]),_:2},1032,["label","onClick"])])])]}),_:2},1024)])):e.type==="dropdownNote"?(i(),h("div",Ve,[u("div",Be,[r(a,{label:t.__("Note"),class:"dropdown-button flex w-full items-center justify-between rounded border border-gray-100 bg-gray-100 px-2 py-1.5 text-base text-gray-800 placeholder-gray-500 transition-colors hover:border-gray-200 hover:bg-gray-200 focus:border-gray-500 focus:bg-white focus:shadow-sm focus:outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400",onClick:o[0]||(o[0]=l=>x())},{suffix:d(()=>[r(v(M),{name:y.value?"chevron-up":"chevron-down",class:"h-4 text-gray-600"},null,8,["name"])]),_:1},8,["label"])]),y.value?(i(),h("div",Ie,[u("div",Me,[r(c,{type:"textarea",placeholder:t.__("Write Content..."),modelValue:n.data[e.name],"onUpdate:modelValue":l=>n.data[e.name]=l},null,8,["placeholder","modelValue","onUpdate:modelValue"])])])):$("",!0)])):(i(),C(c,{key:5,type:"text",placeholder:t.__(e.placeholder),modelValue:n.data[e.name],"onUpdate:modelValue":l=>n.data[e.name]=l,class:"truncate",onFocus:l=>V(n.data[e.name],e.name),onBlur:l=>D(n.data[e.name],e.name)},null,8,["placeholder","modelValue","onUpdate:modelValue","onFocus","onBlur"])),_[e.name]?(i(),h("div",je,[u("div",Ee,[u("div",Fe,w(t.__("Correct format"))+': "'+w(f.value)+'"',1),u("div",{style:{cursor:"pointer"},onClick:l=>B(e.name)},[r(v(M),{name:"check",class:"h-4 w-4 text-red-500",style:{"font-size":"12px"}})],8,ze)])])):$("",!0)]))),128))],2)],2))),128))])}}},Le=W(Ae,[["__scopeId","data-v-fd74c2c6"]]);export{Le as F,ue as S};
//# sourceMappingURL=Fields-0f4da799.js.map