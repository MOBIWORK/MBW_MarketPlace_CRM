import{F as A}from"./Fields-ba420322.js";import{E as J}from"./EditIcon-fdcbaced.js";import{_ as Z,e as s,f as u,v as t,m as L,a as q,u as $,r as _,A as b,a5 as H,ai as z,H as h,w as P,d as B,l as f,i as x,x as I,h as M,q as N,j as V,F as R,k as T,Z as G,a1 as K,c as k,aD as Q}from"./index-80088746.js";const X={},Y={width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},ee=t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2.02062 7.49896C2.49506 7.49716 2.97742 7.4933 3.47006 7.48935C3.94277 7.48556 4.42495 7.48169 4.9187 7.47951C4.97589 6.3862 5.14998 5.23014 5.51484 4.17085C5.76241 3.45208 6.1023 2.76557 6.56226 2.17336C4.09972 2.77895 2.23508 4.90491 2.02062 7.49896ZM8 2.1204C7.29452 2.69277 6.79592 3.52219 6.46032 4.49652C6.13931 5.4285 5.97681 6.46734 5.92025 7.4779C6.5896 7.47899 7.28127 7.485 8 7.49989C8.7546 7.48425 9.43077 7.47841 10.0797 7.47777C10.0232 6.46725 9.86068 5.42846 9.53968 4.49651C9.20408 3.52219 8.70548 2.69277 8 2.1204ZM10.0822 8.47771C10.0279 9.50221 9.8654 10.5578 9.53968 11.5035C9.20409 12.4778 8.70548 13.3072 8.00001 13.8796C7.29453 13.3072 6.79592 12.4778 6.46032 11.5035C6.13462 10.5579 5.9721 9.5023 5.91784 8.47784C6.58355 8.47892 7.27164 8.48494 7.98959 8.49989C7.99653 8.50004 8.00347 8.50004 8.01042 8.49989C8.76493 8.48417 9.43715 8.47833 10.0822 8.47771ZM4.91661 8.47951C4.43411 8.48168 3.962 8.48548 3.49714 8.48922C2.99784 8.49323 2.50691 8.49718 2.02045 8.49899C2.2341 11.094 4.09907 13.2209 6.56227 13.8266C6.1023 13.2344 5.76241 12.5479 5.51484 11.8291C5.14541 10.7566 4.97157 9.58487 4.91661 8.47951ZM9.43774 13.8266C9.89771 13.2344 10.2376 12.5479 10.4852 11.8291C10.8545 10.7569 11.0283 9.58549 11.0834 8.48039C11.4269 8.48234 11.771 8.48511 12.1244 8.48796C12.7045 8.49264 13.3098 8.49752 13.9795 8.4993C13.7658 11.0941 11.9008 13.2209 9.43774 13.8266ZM13.9794 7.49928C13.3241 7.49751 12.7264 7.49271 12.1508 7.48809C11.7885 7.48518 11.435 7.48234 11.0814 7.48037C11.0242 6.38681 10.8501 5.23042 10.4852 4.17085C10.2376 3.45208 9.89771 2.76557 9.43774 2.17336C11.9004 2.77897 13.7651 4.90509 13.9794 7.49928ZM1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z",fill:"currentColor"},null,-1),ae=[ee];function ne(m,c){return s(),u("svg",Y,ae)}const te=Z(X,[["render",ne]]),le={},oe={xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round",class:"lucide lucide-land-plot"},se=t("path",{d:"m12 8 6-3-6-3v10"},null,-1),ie=t("path",{d:"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"},null,-1),re=t("path",{d:"m6.49 12.85 11.02 6.3"},null,-1),ue=t("path",{d:"M17.51 12.85 6.5 19.15"},null,-1),ce=[se,ie,re,ue];function de(m,c){return s(),u("svg",oe,ce)}const _e=Z(le,[["render",de]]),me={class:"bg-white px-4 pb-6 pt-5 sm:px-6"},ve={class:"mb-5 flex items-center justify-between"},pe={class:"text-2xl font-semibold leading-6 text-gray-900"},fe={class:"flex items-center gap-1"},ge={key:0,class:"flex flex-col gap-3.5"},he={class:"grid w-7 place-content-center"},Ce={key:0,class:"px-4 pb-7 pt-4 sm:px-6"},ye={class:"space-y-2"},xe={__name:"OrganizationModal",props:L({options:{type:Object,default:{redirect:!0,detailMode:!1,afterInsert:()=>{}}}},{modelValue:{},modelModifiers:{},organization:{},organizationModifiers:{}}),emits:["update:modelValue","update:organization"],setup(m){const c=m,D=q(),d=$(m,"modelValue"),C=$(m,"organization"),v=_(!1);_(null);const i=_(!1),p=_(!1);let n=_({organization_name:"",website:"",annual_revenue:"",no_of_employees:"1-10",industry:""}),g=_({});async function E(){const a={...g.value},e={...n.value},o=a.organization_name!==e.organization_name;delete a.organization_name,delete e.organization_name;const r=JSON.stringify(a)!==JSON.stringify(e),l=e;if(!o&&!r){d.value=!1;return}let w;v.value=!0,o&&(w=await F()),r&&(w=await S(l)),O({name:w},o)}async function F(){var e;const a=await k("frappe.client.rename_doc",{doctype:"CRM Organization",old_name:(e=g.value)==null?void 0:e.organization_name,new_name:n.value.organization_name});return v.value=!1,a}async function S(a){const e=await k("frappe.client.set_value",{doctype:"CRM Organization",name:n.value.name,fieldname:a});return v.value=!1,e.name}async function W(){const a=await k("frappe.client.insert",{doc:{doctype:"CRM Organization",...n.value}});v.value=!1,a.name&&O(a)}function O(a,e=!1){var o,r;a.name&&(c.options.redirect||e)?D.push({name:"Organization",params:{organizationId:a.name}}):(r=(o=C.value).reload)==null||r.call(o),d.value=!1,c.options.afterInsert&&c.options.afterInsert(a)}const y=b(()=>{let a=p.value?__(n.value.organization_name):__("New Organization"),e=i.value?"":"xl",o=i.value?[]:[{label:p.value?__("Save"):__("Create"),variant:"solid",onClick:()=>p.value?E():W()}];return{title:a,size:e,actions:o}}),j=b(()=>[{icon:H,name:"organization_name",value:n.value.organization_name},{icon:te,name:"website",value:n.value.website},{icon:_e,name:"territory",value:n.value.territory},{icon:z(h,{name:"dollar-sign",class:"h-4 w-4"}),name:"annual_revenue",value:n.value.annual_revenue},{icon:z(h,{name:"hash",class:"h-4 w-4"}),name:"no_of_employees",value:n.value.no_of_employees},{icon:z(h,{name:"briefcase",class:"h-4 w-4"}),name:"industry",value:n.value.industry}].filter(e=>e.value)),U=b(()=>[{section:"Organization Name",columns:1,fields:[{label:"Organization Name",name:"organization_name",type:"data",placeholder:__("MBW Technologies")}]},{section:"Website & Revenue",columns:2,hideBorder:!0,fields:[{label:"Website",name:"website",type:"data",placeholder:__("https://example.com")},{label:"Annual Revenue",name:"annual_revenue",type:"data",placeholder:"9,999,999"}]},{section:"Territory",columns:1,hideBorder:!0,fields:[{label:"Territory",name:"territory",type:"link",doctype:"CRM Territory",placeholder:__("VietNam")}]},{section:"No of Employees & Industry",columns:2,hideBorder:!0,fields:[{label:"No of Employees",name:"no_of_employees",type:"select",options:[{label:__("1-10"),value:"1-10"},{label:__("11-50"),value:"11-50"},{label:__("51-200"),value:"51-200"},{label:__("201-500"),value:"201-500"},{label:__("501-1000"),value:"501-1000"},{label:__("1001-5000"),value:"1001-5000"},{label:__("5001-10000"),value:"5001-10000"},{label:__("10001+"),value:"10001+"}]},{label:"Industry",name:"industry",type:"link",doctype:"CRM Industry",placeholder:__("Technology")}]}]);return P(()=>d.value,a=>{a&&(p.value=!1,i.value=c.options.detailMode,Q(()=>{var e;g.value=((e=C.value)==null?void 0:e.doc)||C.value||{},n.value={...g.value},n.value.name&&(p.value=!0)}))}),(a,e)=>{const o=B("Button"),r=B("Dialog");return s(),f(r,{modelValue:d.value,"onUpdate:modelValue":e[2]||(e[2]=l=>d.value=l),options:y.value},{body:x(()=>[t("div",me,[t("div",ve,[t("div",null,[t("h3",pe,I(a.__(y.value.title)||a.__("Untitled")),1)]),t("div",fe,[i.value?(s(),f(o,{key:0,variant:"ghost",class:"w-7",onClick:e[0]||(e[0]=l=>i.value=!1)},{default:x(()=>[M(J,{class:"h-4 w-4"})]),_:1})):N("",!0),M(o,{variant:"ghost",class:"w-7",onClick:e[1]||(e[1]=l=>d.value=!1)},{default:x(()=>[M(V(h),{name:"x",class:"h-4 w-4"})]),_:1})])]),t("div",null,[i.value?(s(),u("div",ge,[(s(!0),u(R,null,T(j.value,l=>(s(),u("div",{class:"flex h-7 items-center gap-2 text-base text-gray-800",key:l.name},[t("div",he,[(s(),f(G(l.icon)))]),t("div",null,I(l.value),1)]))),128))])):(s(),f(A,{key:1,sections:U.value,data:V(n)},null,8,["sections","data"]))])]),i.value?N("",!0):(s(),u("div",Ce,[t("div",ye,[(s(!0),u(R,null,T(y.value.actions,l=>(s(),f(o,K({class:"w-full",key:l.label},l,{label:a.__(l.label),loading:v.value}),null,16,["label","loading"]))),128))])]))]),_:1},8,["modelValue","options"])}}};export{_e as T,te as W,xe as _};
//# sourceMappingURL=OrganizationModal-481f5202.js.map