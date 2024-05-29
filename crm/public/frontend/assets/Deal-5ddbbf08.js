import{_ as ke,a as we,A as Ie,b as ze,L as Ve,S as $e,c as De,d as Se}from"./SLASection-afa2d9b8.js";import{g as Ae,a as Ue,A as j,K as Ne,M as Ee,o as Be,r as y,z as A,d as F,e as u,f as _,j as t,l as b,i as r,p,h as s,F as P,b as x,c as z,N as L,P as q,T as Me,O as Te,W as Oe,Q as Re,n as U,D as J,R as je,t as m,v as C,S as Fe,q as V,_ as Z,V as N,X as Pe,k as ee,Y as ae,am as Le,aj as te,ab as qe}from"./index-57f524e0.js";import{I as We}from"./IndicatorIcon-42fe5203.js";import{S as Ge}from"./Fields-05088d1a.js";import{_ as Ke,a as Qe}from"./LayoutHeader-1b75ebc1.js";import{_ as Xe}from"./OrganizationModal-6f1ca8c8.js";import{s as Ye,_ as He}from"./statuses-725e45e6.js";import{C as Je}from"./ContactModal-f10d59c5.js";import{_ as Ze}from"./Link-95b990b4.js";import{_ as ea}from"./CustomActions-ca5e2014.js";import{o as aa}from"./organizations-8c40ce9c.js";import{c as se,w as ta}from"./settings-804601ba.js";import{_ as sa}from"./Tabs-844731e8.js";import"./FileUploader-46b74999.js";import"./FadedScrollableDiv-1b8a6fee.js";import"./CalendarIcon-45fafaab.js";import"./EmailTemplateModal-87305b9b.js";import"./TaskModal-c19adbc3.js";import"./DatetimePicker-9b4bd588.js";import"./EditIcon-79477f55.js";const la={key:1,class:"flex h-full overflow-hidden"},oa={class:"flex items-center justify-start gap-5 border-b p-5"},na={class:"group relative size-12"},ia={class:"flex flex-col gap-2.5 truncate"},ra={class:"truncate text-2xl font-medium"},da={class:"flex gap-1.5"},ua={key:1,class:"flex flex-1 flex-col justify-between overflow-hidden"},ma={class:"flex flex-col overflow-y-auto"},ca={key:0,class:"pr-2"},_a={key:1},pa={key:0,class:"flex min-h-20 flex-1 items-center justify-center gap-3 text-base text-gray-500"},fa={class:"flex cursor-pointer items-center justify-between gap-2 pr-1 text-base leading-5 text-gray-700"},ga=["onClick"],va={class:"truncate"},ya={class:"flex items-center"},ba={class:"flex flex-col gap-1.5 text-base text-gray-800"},ha={class:"flex items-center gap-3 pb-1.5 pl-1 pt-4"},xa={class:"flex items-center gap-3 p-1 py-1.5"},Ca={key:0,class:"mx-2 h-px border-t border-gray-200"},ka={key:2,class:"flex h-20 items-center justify-center text-base text-gray-600"},qa={__name:"Deal",props:{dealId:{type:String,required:!0}},setup(le){const{$dialog:oe,makeCall:ne}=Ae(),{organizations:ie,getOrganization:re}=aa(),{statusOptions:de,getDealStatus:ue}=Ye(),$=Ue(),f=le,l=j({url:"crm.fcrm.doctype.crm_deal.api.get_deal",params:{name:f.dealId},cache:["deal",f.dealId],onSuccess:a=>{Ne(a),Ee(a,{doc:a,$dialog:oe,router:$,updateField:w,createToast:x,deleteDoc:he,call:z})}});Be(()=>{l.data||l.fetch()});const E=y(!1),B=y(!1),M=y(!1),T=y({}),k=A(()=>{var a;return((a=l.data)==null?void 0:a.organization)&&re(l.data.organization)});function me(a,e,d){e=Array.isArray(a)?"":e,!ce(a,e)&&j({url:"frappe.client.set_value",params:{doctype:"CRM Deal",name:f.dealId,fieldname:a,value:e},auto:!0,onSuccess:()=>{l.reload(),E.value=!0,x({title:__("Deal updated"),icon:"check",iconClasses:"text-green-600"}),d==null||d()},onError:n=>{var g;x({title:__("Error updating deal"),text:__((g=n.messages)==null?void 0:g[0]),icon:"x",iconClasses:"text-red-600"})}})}function ce(a,e){var n;let d=l.data.all_fields||{};return(n=d[a])!=null&&n.reqd&&!e?(x({title:__("Error Updating Deal"),text:__("{0} is a required field",[d[a].label]),icon:"x",iconClasses:"text-red-600"}),!0):!1}const _e=A(()=>{var e;let a=[{label:__("Deals"),route:{name:"Deals"}}];return a.push({label:((e=k.value)==null?void 0:e.name)||__("Untitled"),route:{name:"Deal",params:{dealId:l.data.name}}}),a}),D=y(0),pe=A(()=>[{name:"Activity",label:__("Activity"),icon:Ie},{name:"Emails",label:__("Emails"),icon:L},{name:"Calls",label:__("Calls"),icon:q,condition:()=>se.value},{name:"Tasks",label:__("Tasks"),icon:Me},{name:"Notes",label:__("Notes"),icon:Te},{name:"WhatsApp",label:__("WhatsApp"),icon:Oe,condition:()=>ta.value}].filter(e=>e.condition?e.condition():!0)),O=A(()=>{let a=l.data;return a?fe(a.doctype_fields,h.data):[]});function fe(a,e){return a.forEach(d=>{d.name=="contacts_tab"?(delete d.fields,d.contacts=(e==null?void 0:e.map(n=>({name:n.name,full_name:n.full_name,email:n.email,mobile_no:n.mobile_no,image:n.image,is_primary:n.is_primary,opened:!1})))||[]):d.fields.forEach(n=>{n.name=="organization"&&(n.create=(g,i)=>{T.value.organization_name=g,B.value=!0,i()},n.link=g=>$.push({name:"Organization",params:{organizationId:g}}))})}),a}const R=y(!1),W=y({});function ge(a){let e=[{label:__("Delete"),icon:"trash-2",onClick:()=>ve(a)}];return a.is_primary||e.push({label:__("Set as Primary Contact"),icon:qe(Ge,{class:"h-4 w-4"}),onClick:()=>ye(a)}),e}async function G(a){await z("crm.fcrm.doctype.crm_deal.crm_deal.add_contact",{deal:f.dealId,contact:a})&&(h.reload(),x({title:__("Contact added"),icon:"check",iconClasses:"text-green-600"}))}async function ve(a){await z("crm.fcrm.doctype.crm_deal.crm_deal.remove_contact",{deal:f.dealId,contact:a})&&(h.reload(),x({title:__("Contact removed"),icon:"check",iconClasses:"text-green-600"}))}async function ye(a){await z("crm.fcrm.doctype.crm_deal.crm_deal.set_primary_contact",{deal:f.dealId,contact:a})&&(h.reload(),x({title:__("Primary contact set"),icon:"check",iconClasses:"text-green-600"}))}const h=j({url:"crm.fcrm.doctype.crm_deal.api.get_deal_contacts",params:{name:f.dealId},cache:["deal_contacts",f.dealId],auto:!0});function be(){var d;let a=(d=h.data)==null?void 0:d.find(n=>n.is_primary),e=a.mobile_no||null;if(!a){N(__("No primary contact set"));return}if(!e){N(__("No mobile number set"));return}ne(e)}function w(a,e,d){me(a,e,()=>{l.data[a]=e,d==null||d()})}async function he(a){await z("frappe.client.delete",{doctype:"CRM Deal",name:a}),$.push({name:"Deals"})}const K=y(null);function xe(){K.value.emailBox.show=!0}return(a,e)=>{const d=F("FeatherIcon"),n=F("Button"),g=F("Badge");return u(),_(P,null,[t(l).data?(u(),b(Ke,{key:0},{"left-header":r(()=>[s(t(Qe),{items:_e.value},null,8,["items"])]),"right-header":r(()=>{var i;return[t(l).data._customActions?(u(),b(ea,{key:0,actions:t(l).data._customActions},null,8,["actions"])):p("",!0),(u(),b(Re(((i=t(l).data._assignedTo)==null?void 0:i.length)==1?"Button":"div"),null,{default:r(()=>[s(He,{avatars:t(l).data._assignedTo,onClick:e[0]||(e[0]=o=>M.value=!0)},null,8,["avatars"])]),_:1})),s(t(J),{options:t(de)("deal",w)},{default:r(({open:o})=>[s(n,{label:t(l).data.status,class:U(t(ue)(t(l).data.status).colorClass)},{prefix:r(()=>[s(We)]),suffix:r(()=>[s(d,{name:o?"chevron-up":"chevron-down",class:"h-4"},null,8,["name"])]),_:2},1032,["label","class"])]),_:1},8,["options"])]}),_:1})):p("",!0),t(l).data?(u(),_("div",la,[s(t(sa),{modelValue:D.value,"onUpdate:modelValue":e[4]||(e[4]=i=>D.value=i),tabs:pe.value},{default:r(({tab:i})=>[s(ze,{ref_key:"activities",ref:K,doctype:"CRM Deal",title:i.name,reload:E.value,"onUpdate:reload":e[1]||(e[1]=o=>E.value=o),tabIndex:D.value,"onUpdate:tabIndex":e[2]||(e[2]=o=>D.value=o),modelValue:t(l),"onUpdate:modelValue":e[3]||(e[3]=o=>je(l)?l.value=o:null)},null,8,["title","reload","tabIndex","modelValue"])]),_:1},8,["modelValue","tabs"]),s(ke,{side:"right",class:"flex flex-col justify-between border-l"},{default:r(()=>{var i;return[m("div",{class:"flex h-10.5 cursor-copy items-center border-b px-5 py-2.5 text-lg font-medium",onClick:e[5]||(e[5]=o=>t(Fe)(t(l).data.name))},C(a.__(t(l).data.name)),1),m("div",oa,[s(t(V),{text:a.__("Organization logo")},{default:r(()=>{var o,S;return[m("div",na,[s(t(Z),{size:"3xl",class:"size-12",label:((o=k.value)==null?void 0:o.name)||a.__("Untitled"),image:(S=k.value)==null?void 0:S.organization_logo},null,8,["label","image"])])]}),_:1},8,["text"]),m("div",ia,[s(t(V),{text:((i=k.value)==null?void 0:i.name)||a.__("Set an organization")},{default:r(()=>{var o;return[m("div",ra,C(((o=k.value)==null?void 0:o.name)||a.__("Untitled")),1)]}),_:1},8,["text"]),m("div",da,[t(se)?(u(),b(t(V),{key:0,text:a.__("Make a call")},{default:r(()=>[s(n,{class:"h-7 w-7",onClick:be},{default:r(()=>[s(q,{class:"h-4 w-4"})]),_:1})]),_:1},8,["text"])):p("",!0),s(t(V),{text:a.__("Send an email")},{default:r(()=>[s(n,{class:"h-7 w-7"},{default:r(()=>[s(L,{class:"h-4 w-4",onClick:e[6]||(e[6]=o=>t(l).data.email?xe():t(N)(a.__("No email set")))})]),_:1})]),_:1},8,["text"]),s(t(V),{text:a.__("Go to website")},{default:r(()=>[s(n,{class:"h-7 w-7"},{default:r(()=>[s(Ve,{class:"h-4 w-4",onClick:e[7]||(e[7]=o=>t(l).data.website?t(Pe)(t(l).data.website):t(N)(a.__("No website set")))})]),_:1})]),_:1},8,["text"])])])]),t(l).data.sla_status?(u(),b($e,{key:0,modelValue:t(l).data,"onUpdate:modelValue":e[8]||(e[8]=o=>t(l).data=o),onUpdateField:w},null,8,["modelValue"])):p("",!0),O.value.length?(u(),_("div",ua,[m("div",ma,[(u(!0),_(P,null,ee(O.value,(o,S)=>(u(),_("div",{key:o.label,class:U(["flex flex-col p-3",{"border-b":S!==O.value.length-1}])},[s(ae,{"is-opened":o.opened,label:o.label},{actions:r(()=>[o.contacts?(u(),_("div",ca,[s(Ze,{value:"",doctype:"Contact",onChange:e[9]||(e[9]=v=>G(v)),onCreate:(v,I)=>{W.value={first_name:v,company_name:t(l).data.organization},R.value=!0,I()}},{target:r(({togglePopover:v})=>[s(n,{class:"h-7 px-3",variant:"ghost",icon:"plus",onClick:I=>v()},null,8,["onClick"])]),_:1},8,["onCreate"])])):p("",!0)]),default:r(()=>{var v,I,Q;return[o.fields?(u(),b(De,{key:0,fields:o.fields,modelValue:t(l).data,"onUpdate:modelValue":e[10]||(e[10]=c=>t(l).data=c),onUpdate:w},null,8,["fields","modelValue"])):(u(),_("div",_a,[(v=t(h))!=null&&v.loading&&((Q=(I=t(h))==null?void 0:I.data)==null?void 0:Q.length)==0?(u(),_("div",pa,[s(Se,{class:"h-4 w-4"}),m("span",null,C(a.__("Loading...")),1)])):o.contacts.length?(u(!0),_(P,{key:1},ee(o.contacts,(c,X)=>(u(),_("div",{key:c.name},[m("div",{class:U(["px-2 pb-2.5",[X==0?"pt-5":"pt-2.5"]])},[s(ae,{"is-opened":c.opened},{header:r(({opened:Ce,toggle:Y})=>[m("div",fa,[m("div",{class:"flex h-7 items-center gap-2 truncate",onClick:H=>Y()},[s(t(Z),{label:c.full_name,image:c.image,size:"md"},null,8,["label","image"]),m("div",va,C(c.full_name),1),c.is_primary?(u(),b(g,{key:0,class:"ml-2",variant:"outline",label:a.__("Primary"),theme:"green"},null,8,["label"])):p("",!0)],8,ga),m("div",ya,[s(t(J),{options:ge(c.name)},{default:r(()=>[s(n,{icon:"more-horizontal",class:"text-gray-600",variant:"ghost"})]),_:2},1032,["options"]),s(n,{variant:"ghost",onClick:H=>t($).push({name:"Contact",params:{contactId:c.name}})},{default:r(()=>[s(Le,{class:"h-4 w-4"})]),_:2},1032,["onClick"]),s(n,{variant:"ghost",onClick:H=>Y()},{default:r(()=>[s(d,{name:"chevron-right",class:U(["h-4 w-4 text-gray-900 transition-all duration-300 ease-in-out",{"rotate-90":Ce}])},null,8,["class"])]),_:2},1032,["onClick"])])])]),default:r(()=>[m("div",ba,[m("div",ha,[s(L,{class:"h-4 w-4"}),te(" "+C(c.email),1)]),m("div",xa,[s(q,{class:"h-4 w-4"}),te(" "+C(c.mobile_no),1)])])]),_:2},1032,["is-opened"])],2),X!=o.contacts.length-1?(u(),_("div",Ca)):p("",!0)]))),128)):(u(),_("div",ka,C(a.__("No contacts added")),1))]))]}),_:2},1032,["is-opened","label"])],2))),128))])])):p("",!0)]}),_:1})])):p("",!0),s(Xe,{modelValue:B.value,"onUpdate:modelValue":e[11]||(e[11]=i=>B.value=i),organization:T.value,"onUpdate:organization":e[12]||(e[12]=i=>T.value=i),options:{redirect:!1,afterInsert:i=>w("organization",i.name,()=>{t(ie).reload()})}},null,8,["modelValue","organization","options"]),s(Je,{modelValue:R.value,"onUpdate:modelValue":e[13]||(e[13]=i=>R.value=i),contact:W.value,options:{redirect:!1,afterInsert:i=>G(i.name)}},null,8,["modelValue","contact","options"]),t(l).data?(u(),b(we,{key:2,doc:t(l).data,modelValue:M.value,"onUpdate:modelValue":e[14]||(e[14]=i=>M.value=i),assignees:t(l).data._assignedTo,"onUpdate:assignees":e[15]||(e[15]=i=>t(l).data._assignedTo=i)},null,8,["doc","modelValue","assignees"])):p("",!0)],64)}}};export{qa as default};
//# sourceMappingURL=Deal-5ddbbf08.js.map
