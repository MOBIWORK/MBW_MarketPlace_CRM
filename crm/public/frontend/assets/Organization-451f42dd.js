import{g as Y,r as x,a as ee,bb as ae,A as y,ai as R,y as oe,aM as B,d as v,e as s,f as d,j as a,l as _,i as m,q as l,h as i,$ as te,F as ne,c as F,a8 as se,a6 as ie,a7 as le,N as V,M as j,v as r,p as re,a1 as ce,Z as k,D as de,x as u,E,n as N,R as $}from"./index-80088746.js";import{_ as me,a as ue}from"./LayoutHeader-7089cfb2.js";import{F as _e}from"./FileUploader-804a7f29.js";import{_ as ge}from"./Tabs-4025ac65.js";import{_ as pe,W as fe,T as ye}from"./OrganizationModal-481f5202.js";import{_ as be}from"./DealsListView-1f97f8b0.js";import{_ as he}from"./ContactsListView-bb395309.js";import{E as ve}from"./EditIcon-fdcbaced.js";import{C as we}from"./CameraIcon-6e023574.js";import{s as ze}from"./statuses-1abc44ff.js";import"./Fields-ba420322.js";import"./IndicatorIcon-5582d004.js";import"./Link-39cf38cd.js";import"./EditValueModal-46e7e5c5.js";import"./DatePicker-a6ecc925.js";import"./label-f4398aab.js";import"./ListView-d2d0d480.js";const xe={key:1,class:"flex flex-1 flex-col overflow-hidden"},ke={class:"flex items-center justify-start gap-6 p-5"},Ce={class:"group relative h-24 w-24"},Ie={class:"z-1 absolute bottom-0 left-0 right-0 flex h-13 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-3 opacity-0 duration-300 ease-in-out group-hover:opacity-100",style:{"-webkit-clip-path":"inset(12px 0 0 0)","clip-path":"inset(12px 0 0 0)"}},Oe={class:"flex flex-col justify-center gap-0.5"},De={class:"text-3xl font-semibold text-gray-900"},Me={class:"flex items-center gap-2 text-base text-gray-700"},Re={key:0,class:"flex items-center gap-1.5"},Be={class:""},Fe={key:1,class:"text-3xl leading-[0] text-gray-600"},Ve={key:2,class:"flex items-center gap-1.5"},je={class:""},Ee={key:3,class:"text-3xl leading-[0] text-gray-600"},Ne={key:4,class:"flex items-center gap-1.5"},$e={class:""},Se={key:5,class:"text-3xl leading-[0] text-gray-600"},Ae={key:6,class:"flex items-center gap-1.5"},Le={class:""},Te={key:7,class:"text-3xl leading-[0] text-gray-600"},Ue={class:"mt-2 flex gap-1.5"},Pe={key:2,class:"grid flex-1 place-items-center text-xl font-medium text-gray-500"},qe={class:"flex flex-col items-center justify-center space-y-3"},ra={__name:"Organization",props:{organizationId:{type:String,required:!0}},setup(S){const c=S,{$dialog:A}=Y(),{getDealStatus:L}=ze(),b=x(!1),w=x(!1),T=ee(),o=ae({doctype:"CRM Organization",name:c.organizationId,cache:["organization",c.organizationId],fields:["*"],auto:!0}),U=y(()=>{let e=[{label:__("Organizations"),route:{name:"Organizations"}}];return e.push({label:c.organizationId,route:{name:"Organization",params:{organizationId:c.organizationId}}}),e});function P(e){let t=e.name.split(".").pop().toLowerCase();if(!["png","jpg","jpeg"].includes(t))return __("Only PNG and JPG images are allowed")}async function C(e){await F("frappe.client.set_value",{doctype:"CRM Organization",name:c.organizationId,fieldname:"organization_logo",value:(e==null?void 0:e.file_url)||""}),o.reload()}async function q(){A({title:__("Delete organization"),message:__("Are you sure you want to delete this organization?"),actions:[{label:__("Delete"),theme:"red",variant:"solid",async onClick(e){await F("frappe.client.delete",{doctype:"CRM Organization",name:c.organizationId}),e(),T.push({name:"Organizations"})}}]})}function G(e){return e&&e.replace(/^(?:https?:\/\/)?(?:www\.)?/i,"")}const p=x(0),W=[{label:"Deals",icon:R(se,{class:"h-4 w-4"}),count:y(()=>{var e;return(e=O.data)==null?void 0:e.length})},{label:"Contacts",icon:R(ie,{class:"h-4 w-4"}),count:y(()=>{var e;return(e=D.data)==null?void 0:e.length})}],{getUser:I}=oe(),O=B({type:"list",doctype:"CRM Deal",cache:["deals",c.organizationId],fields:["name","organization","annual_revenue","status","email","mobile_no","deal_owner","modified"],filters:{organization:c.organizationId},orderBy:"modified desc",pageLength:20,auto:!0}),D=B({type:"list",doctype:"Contact",cache:["contacts",c.organizationId],fields:["name","full_name","image","email_id","mobile_no","company_name","modified"],filters:{company_name:c.organizationId},orderBy:"modified desc",pageLength:20,auto:!0}),f=y(()=>{let e=[];return e=p.value?D:O,e.data?e.data.map(t=>p.value?Z(t):J(t)):[]}),M=y(()=>p.value===0?H:K);function J(e){var t,g;return{name:e.name,organization:{label:e.organization,logo:(t=c.organization)==null?void 0:t.organization_logo},annual_revenue:le(e.annual_revenue),status:{label:e.status,color:(g=L(e.status))==null?void 0:g.iconColorClass},email:e.email,mobile_no:e.mobile_no,deal_owner:{label:e.deal_owner&&I(e.deal_owner).full_name,...e.deal_owner&&I(e.deal_owner)},modified:{label:V(e.modified,$),timeAgo:__(j(e.modified))}}}function Z(e){var t;return{name:e.name,full_name:{label:e.full_name,image_label:e.full_name,image:e.image},email:e.email_id,mobile_no:e.mobile_no,company_name:{label:e.company_name,logo:(t=c.organization)==null?void 0:t.organization_logo},modified:{label:V(e.modified,$),timeAgo:__(j(e.modified))}}}const H=[{label:__("Organization"),key:"organization",width:"11rem"},{label:__("Amount"),key:"annual_revenue",width:"9rem"},{label:__("Status"),key:"status",width:"10rem"},{label:__("Email"),key:"email",width:"12rem"},{label:__("Mobile no"),key:"mobile_no",width:"11rem"},{label:__("Deal owner"),key:"deal_owner",width:"10rem"},{label:__("Last modified"),key:"modified",width:"8rem"}],K=[{label:__("Name"),key:"full_name",width:"17rem"},{label:__("Email"),key:"email",width:"12rem"},{label:__("Phone"),key:"mobile_no",width:"12rem"},{label:__("Organization"),key:"company_name",width:"12rem"},{label:__("Last modified"),key:"modified",width:"8rem"}];return(e,t)=>{const g=v("FeatherIcon"),z=v("Button"),Q=v("ErrorMessage"),X=v("Badge");return s(),d(ne,null,[a(o).doc?(s(),_(me,{key:0},{"left-header":m(()=>[i(a(ue),{items:U.value},null,8,["items"])]),_:1})):l("",!0),a(o).doc?(s(),d("div",xe,[i(a(_e),{onSuccess:C,validateFile:P},{default:m(({openFileSelector:n,error:h})=>[r("div",ke,[r("div",Ce,[i(a(re),{size:"3xl",image:a(o).doc.organization_logo,label:a(o).doc.name,class:"!h-24 !w-24"},null,8,["image","label"]),(s(),_(k(a(o).doc.organization_logo?a(de):"div"),ce(a(o).doc.organization_logo?{options:[{icon:"upload",label:a(o).doc.organization_logo?e.__("Change image"):e.__("Upload image"),onClick:n},{icon:"trash-2",label:e.__("Remove image"),onClick:()=>C("")}]}:{onClick:n},{class:"!absolute bottom-0 left-0 right-0"}),{default:m(()=>[r("div",Ie,[i(we,{class:"h-6 w-6 cursor-pointer text-white"})])]),_:2},1040))]),r("div",Oe,[r("div",De,u(a(o).doc.name),1),r("div",Me,[a(o).doc.website?(s(),d("div",Re,[i(fe,{class:"h-4 w-4"}),r("span",Be,u(G(a(o).doc.website)),1)])):l("",!0),a(o).doc.website?(s(),d("span",Fe," · ")):l("",!0),a(o).doc.industry?(s(),d("div",Ve,[i(g,{name:"briefcase",class:"h-4 w-4"}),r("span",je,u(a(o).doc.industry),1)])):l("",!0),a(o).doc.industry?(s(),d("span",Ee," · ")):l("",!0),a(o).doc.territory?(s(),d("div",Ne,[i(ye,{class:"h-4 w-4"}),r("span",$e,u(a(o).doc.territory),1)])):l("",!0),a(o).doc.territory?(s(),d("span",Se," · ")):l("",!0),a(o).doc.annual_revenue?(s(),d("div",Ae,[i(g,{name:"dollar-sign",class:"h-4 w-4"}),r("span",Le,u(a(o).doc.annual_revenue),1)])):l("",!0),a(o).doc.annual_revenue?(s(),d("span",Te," · ")):l("",!0),a(o).doc.website||a(o).doc.industry||a(o).doc.territory||a(o).doc.annual_revenue?(s(),_(z,{key:8,variant:"ghost",label:e.__("More"),class:"-ml-1 cursor-pointer hover:text-gray-900",onClick:t[0]||(t[0]=()=>{w.value=!0,b.value=!0})},null,8,["label"])):l("",!0)]),r("div",Ue,[i(z,{label:e.__("Edit"),size:"sm",onClick:t[1]||(t[1]=()=>{w.value=!1,b.value=!0})},{prefix:m(()=>[i(ve,{class:"h-4 w-4"})]),_:1},8,["label"]),i(z,{label:e.__("Delete"),theme:"red",size:"sm",onClick:q},{prefix:m(()=>[i(g,{name:"trash-2",class:"h-4 w-4"})]),_:1},8,["label"])]),i(Q,{class:"mt-2",message:e.__(h)},null,8,["message"])])])]),_:1}),i(a(ge),{modelValue:p.value,"onUpdate:modelValue":t[2]||(t[2]=n=>p.value=n),tabs:W},{tab:m(({tab:n,selected:h})=>[r("button",{class:N(["group flex items-center gap-2 border-b border-transparent py-2.5 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900",{"text-gray-900":h}])},[n.icon?(s(),_(k(n.icon),{key:0,class:"h-5"})):l("",!0),E(" "+u(e.__(n.label))+" ",1),i(X,{class:N(["group-hover:bg-gray-900",[h?"bg-gray-900":"bg-gray-600"]]),variant:"solid",theme:"gray",size:"sm"},{default:m(()=>[E(u(n.count),1)]),_:2},1032,["class"])],2)]),default:m(({tab:n})=>[n.label==="Deals"&&f.value.length?(s(),_(be,{key:0,class:"mt-4",rows:f.value,columns:M.value,options:{selectable:!1,showTooltip:!1}},null,8,["rows","columns"])):l("",!0),n.label==="Contacts"&&f.value.length?(s(),_(he,{key:1,class:"mt-4",rows:f.value,columns:M.value,options:{selectable:!1,showTooltip:!1}},null,8,["rows","columns"])):l("",!0),f.value.length?l("",!0):(s(),d("div",Pe,[r("div",qe,[(s(),_(k(n.icon),{class:"!h-10 !w-10"})),r("div",null,u(e.__("No {0} Found",[e.__(n.label)])),1)])]))]),_:1},8,["modelValue"])])):l("",!0),i(pe,{modelValue:b.value,"onUpdate:modelValue":t[3]||(t[3]=n=>b.value=n),organization:a(o),"onUpdate:organization":t[4]||(t[4]=n=>te(o)?o.value=n:null),options:{detailMode:w.value}},null,8,["modelValue","organization","options"])],64)}}};export{ra as default};
//# sourceMappingURL=Organization-451f42dd.js.map