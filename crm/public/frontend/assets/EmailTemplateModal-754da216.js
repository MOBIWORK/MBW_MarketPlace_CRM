import{z as V,B as E,G as m,E as A,s as g,o as H,a as U,w as b,d as t,j as y,t as f,f as s,u as o,U as N,aQ as I,n as M,aR as L,aO as q,_ as z,J as h,aG as O}from"./index-fd4111d0.js";const F={class:"flex flex-col gap-4"},J={class:"flex gap-4"},G={class:"flex-1"},$={class:"mb-1.5 text-sm text-gray-600"},P=t("span",{class:"text-red-500"},"*",-1),Q={class:"flex-1"},K={class:"mb-1.5 text-sm text-gray-600"},W={class:"mb-1.5 text-sm text-gray-600"},X=t("span",{class:"text-red-500"},"*",-1),Y={class:"mb-1.5 text-sm text-gray-600"},Z=t("span",{class:"text-red-500"},"*",-1),ee={class:"flex flex-col gap-2"},ae={class:"flex justify-between gap-2 overflow-hidden py-2.5 px-1"},le={class:"flex items-center overflow-x-auto"},ne={__name:"EmailTemplateModal",props:V({emailTemplate:{type:Object,default:{}}},{modelValue:{},modelModifiers:{},reloadEmailTemplates:{},reloadEmailTemplatesModifiers:{}}),emits:V(["after"],["update:modelValue","update:reloadEmailTemplates"]),setup(c,{emit:te}){const v=c,i=E(c,"modelValue"),R=E(c,"reloadEmailTemplates"),r=m(""),T=m(null),w=m(null),d=m(!1);let a=m({});async function D(){if(!C())return;const e={...v.emailTemplate},l={...a.value},u=e.name!==l.name;delete e.name,delete l.name;const p=JSON.stringify(e)!==JSON.stringify(l),_=l;if(!u&&!p){i.value=!1;return}u&&await S(),p&&await j(_),x()}async function S(){return await h("frappe.client.rename_doc",{doctype:"Email Template",old_name:v.emailTemplate.name,new_name:a.value.name})}async function j(e){return(await h("frappe.client.set_value",{doctype:"Email Template",name:a.value.name,fieldname:e})).name}async function B(){if(!C())return;(await h("frappe.client.insert",{doc:{doctype:"Email Template",...a.value}})).name&&x()}function x(e){var l;(l=R.value)==null||l.reload(),i.value=!1}function C(){return a.value.name?a.value.subject?!a.value.response||a.value.response==="<p></p>"?(r.value="Content is required",!1):!0:(r.value="Subject is required",!1):(r.value="Name is required",!1)}A(()=>i.value,e=>{e&&(d.value=!1,r.value="",O(()=>{a.value.name?T.value.el.focus():w.value.el.focus(),a.value={...v.emailTemplate},a.value.name&&(d.value=!0)}))});const k=["Paragraph",["Heading 2","Heading 3","Heading 4","Heading 5","Heading 6"],"Separator","Bold","Italic","Separator","Bullet List","Numbered List","Separator","Align Left","Align Center","Align Right","FontColor","Separator","Image","Video","Link","Blockquote","Code","Horizontal Rule",["InsertTable","AddColumnBefore","AddColumnAfter","DeleteColumn","AddRowBefore","AddRowAfter","DeleteRow","MergeCells","SplitCell","ToggleHeaderColumn","ToggleHeaderRow","ToggleHeaderCell","DeleteTable"]];return(e,l)=>{const u=g("TextInput"),p=g("ErrorMessage"),_=g("Dialog");return H(),U(_,{modelValue:i.value,"onUpdate:modelValue":l[5]||(l[5]=n=>i.value=n),options:{title:d.value?e.__(c.emailTemplate.name):e.__("Create Email Template"),size:"xl",actions:[{label:d.value?e.__("Update"):e.__("Create"),variant:"solid",onClick:()=>d.value?D():B()}]}},{"body-content":b(()=>[t("div",F,[t("div",J,[t("div",G,[t("div",$,[y(f(e.__("Email name"))+" ",1),P]),s(u,{ref_key:"nameRef",ref:w,variant:"outline",modelValue:o(a).name,"onUpdate:modelValue":l[0]||(l[0]=n=>o(a).name=n),placeholder:e.__("")},null,8,["modelValue","placeholder"])]),t("div",Q,[t("div",K,f(e.__("Doctype")),1),s(o(N),{variant:"outline",modelValue:o(a).reference_doctype,"onUpdate:modelValue":l[1]||(l[1]=n=>o(a).reference_doctype=n),options:["CRM Deal","CRM Lead"],placeholder:e.__("CRM Deal")},null,8,["modelValue","placeholder"])])]),t("div",null,[t("div",W,[y(f(e.__("Subject"))+" ",1),X]),s(u,{ref_key:"subjectRef",ref:T,variant:"outline",modelValue:o(a).subject,"onUpdate:modelValue":l[2]||(l[2]=n=>o(a).subject=n),placeholder:e.__("")},null,8,["modelValue","placeholder"])]),t("div",null,[t("div",Y,[y(f(e.__("Content"))+" ",1),Z]),s(o(q),{variant:"outline",ref:"content",class:M("rounded border border-gray-300 bg-white hover:border-gray-400 hover:shadow-sm focus:bg-white focus:border-gray-500 focus:shadow-sm focus:ring-0 focus-visible:ring-2 focus-visible:ring-gray-400 text-gray-800 transition-colors"),"editor-class":"!prose-sm max-w-none min-h-[7rem] overflow-auto py-1.5 px-2",content:o(a).response,onChange:l[3]||(l[3]=n=>o(a).response=n),"starterkit-options":{heading:{levels:[2,3,4,5,6]}}},{editor:b(({editor:n})=>[s(o(I),{class:M("max-h-[50vh] overflow-y-auto py-3"),editor:n},null,8,["editor"])]),bottom:b(()=>[t("div",ee,[t("div",ae,[t("div",le,[s(o(L),{class:"-ml-1",buttons:k})])])])]),_:1},8,["content"])]),t("div",null,[s(o(z),{modelValue:o(a).enabled,"onUpdate:modelValue":l[4]||(l[4]=n=>o(a).enabled=n),label:e.__("Enabled")},null,8,["modelValue","label"])]),s(p,{message:e.__(r.value)},null,8,["message"])])]),_:1},8,["modelValue","options"])}}};export{ne as _};
//# sourceMappingURL=EmailTemplateModal-754da216.js.map