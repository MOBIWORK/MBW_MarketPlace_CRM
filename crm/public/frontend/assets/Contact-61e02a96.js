import{_ as Q,g as W,y as X,a as Y,r as C,A as h,ai as ee,B as M,d as y,e as s,f as c,j as a,l as u,i as m,q as r,h as n,F as ae,c as B,a8 as te,a7 as oe,N as se,M as le,v as i,p as $,a1 as ne,Z as v,x as d,V as ie,n as k,P as re,t as ce,E as N,R as me}from"./index-80088746.js";import{_ as de,a as _e}from"./LayoutHeader-7089cfb2.js";import{F as ue}from"./FileUploader-804a7f29.js";import{_ as pe}from"./Tabs-4025ac65.js";import{C as ge,_ as fe}from"./ContactModal-419332f4.js";import{E as be}from"./EditIcon-fdcbaced.js";import{C as he}from"./CameraIcon-6e023574.js";import{_ as ye}from"./DealsListView-1f97f8b0.js";import{o as ve}from"./organizations-953e77cb.js";import{s as xe}from"./statuses-1abc44ff.js";import{c as I}from"./settings-02e35141.js";import"./Fields-ba420322.js";import"./IndicatorIcon-5582d004.js";import"./Link-39cf38cd.js";import"./EditValueModal-46e7e5c5.js";import"./DatePicker-a6ecc925.js";import"./label-f4398aab.js";import"./ListView-d2d0d480.js";const we={key:1,class:"flex h-full flex-col overflow-hidden"},Ce={class:"flex items-center justify-start gap-6 p-5"},ke={class:"group relative h-24 w-24"},Ie={class:"z-1 absolute bottom-0 left-0 right-0 flex h-14 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-3 opacity-0 duration-300 ease-in-out group-hover:opacity-100",style:{"-webkit-clip-path":"inset(12px 0 0 0)","clip-path":"inset(12px 0 0 0)"}},ze={class:"flex flex-col gap-0.5 truncate"},De={class:"truncate text-3xl font-semibold"},Ve={key:0},Ee={class:"flex items-center gap-2 text-base text-gray-700"},Fe={key:0,class:"flex items-center gap-1.5"},Me={class:""},Be={key:1,class:"text-3xl leading-[0] text-gray-600"},$e={class:""},Ne={key:3,class:"text-3xl leading-[0] text-gray-600"},Se={key:4,class:"flex items-center gap-1.5"},je={class:""},Ae={key:5,class:"text-3xl leading-[0] text-gray-600"},Pe={class:"mt-2 flex gap-1.5"},Re={key:1,class:"grid flex-1 place-items-center text-xl font-medium text-gray-500"},Ue={class:"flex flex-col items-center justify-center space-y-3"},Oe={__name:"Contact",props:{contactId:{type:String,required:!0}},setup(S){const{$dialog:j,makeCall:A}=W(),{getUser:z}=X(),{getOrganization:D}=ve(),{getDealStatus:P}=xe(),_=S,R=Y(),g=C(!1),x=C(!1),U=h(()=>{var o;let e=[{label:__("Contacts"),route:{name:"Contacts"}}];return e.push({label:(o=t.data)==null?void 0:o.full_name,route:{name:"Contact",params:{contactId:_.contactId}}}),e});function O(e){let o=e.name.split(".").pop().toLowerCase();if(!["png","jpg","jpeg"].includes(o))return __("Only PNG and JPG images are allowed")}async function V(e){await B("frappe.client.set_value",{doctype:"Contact",name:_.contactId,fieldname:"image",value:(e==null?void 0:e.file_url)||""}),t.reload()}async function T(){j({title:__("Delete contact"),message:__("Are you sure you want to delete this contact?"),actions:[{label:__("Delete"),theme:"red",variant:"solid",async onClick(e){await B("frappe.client.delete",{doctype:"Contact",name:_.contactId}),e(),R.push({name:"Contacts"})}}]})}const E=C(0),q=[{label:"Deals",icon:ee(te,{class:"h-4 w-4"}),count:h(()=>{var e;return(e=f.data)==null?void 0:e.length})}],t=M({url:"crm.api.contact.get_contact",cache:["contact",_.contactId],params:{name:_.contactId},auto:!0,transform:e=>({...e,actual_mobile_no:e.mobile_no,mobile_no:e.mobile_no})}),f=M({url:"crm.api.contact.get_linked_deals",cache:["deals",_.contactId],params:{contact:_.contactId},auto:!0}),w=h(()=>!f.data||f.data==[]?[]:f.data.map(e=>L(e))),G=h(()=>J);function L(e){var o,p;return{name:e.name,organization:{label:e.organization,logo:(o=D(e.organization))==null?void 0:o.organization_logo},annual_revenue:oe(e.annual_revenue),status:{label:e.status,color:(p=P(e.status))==null?void 0:p.iconColorClass},email:e.email,mobile_no:e.mobile_no,deal_owner:{label:e.deal_owner&&z(e.deal_owner).full_name,...e.deal_owner&&z(e.deal_owner)},modified:{label:se(e.modified,me),timeAgo:__(le(e.modified))}}}const J=[{label:__("Organization"),key:"organization",width:"11rem"},{label:__("Amount"),key:"annual_revenue",width:"9rem"},{label:__("Status"),key:"status",width:"10rem"},{label:__("Email"),key:"email",width:"12rem"},{label:__("Mobile no"),key:"mobile_no",width:"11rem"},{label:__("Deal owner"),key:"deal_owner",width:"10rem"},{label:__("Last modified"),key:"modified",width:"8rem"}];return(e,o)=>{const p=y("Button"),Z=y("FeatherIcon"),H=y("ErrorMessage"),K=y("Badge");return s(),c(ae,null,[a(t).data?(s(),u(de,{key:0},{"left-header":m(()=>[n(a(_e),{items:U.value},null,8,["items"])]),_:1})):r("",!0),a(t).data?(s(),c("div",we,[n(a(ue),{onSuccess:V,validateFile:O},{default:m(({openFileSelector:l,error:b})=>{var F;return[i("div",Ce,[i("div",ke,[n(a($),{size:"3xl",class:"h-24 w-24",label:a(t).data.full_name,image:a(t).data.image},null,8,["label","image"]),(s(),u(v(a(t).data.image?fe:"div"),ne(a(t).data.image?{options:[{icon:"upload",label:a(t).data.image?e.__("Change image"):e.__("Upload image"),onClick:l},{icon:"trash-2",label:e.__("Remove image"),onClick:()=>V("")}]}:{onClick:l},{class:"!absolute bottom-0 left-0 right-0"}),{default:m(()=>[i("div",Ie,[n(he,{class:"h-6 w-6 cursor-pointer text-white"})])]),_:2},1040))]),i("div",ze,[i("div",De,[a(t).data.salutation?(s(),c("span",Ve,d(a(t).data.salutation+". "),1)):r("",!0),i("span",null,d(a(t).data.full_name),1)]),i("div",Ee,[a(t).data.email_id?(s(),c("div",Fe,[n(ie,{class:"h-4 w-4"}),i("span",Me,d(a(t).data.email_id),1)])):r("",!0),a(t).data.email_id?(s(),c("span",Be," · ")):r("",!0),a(t).data.actual_mobile_no?(s(),u(v(a(I)?a(ce):"div"),{key:2,text:e.__("Make Call")},{default:m(()=>[i("div",{class:k(["flex items-center gap-1.5",a(I)?"cursor-pointer":""]),onClick:o[0]||(o[0]=Te=>a(I)&&a(A)(a(t).data.actual_mobile_no))},[n(re,{class:"h-4 w-4"}),i("span",$e,d(a(t).data.actual_mobile_no),1)],2)]),_:1},8,["text"])):r("",!0),a(t).data.actual_mobile_no?(s(),c("span",Ne," · ")):r("",!0),a(t).data.company_name?(s(),c("div",Se,[n(a($),{size:"xs",label:a(t).data.company_name,image:(F=a(D)(a(t).data.company_name))==null?void 0:F.organization_logo},null,8,["label","image"]),i("span",je,d(a(t).data.company_name),1)])):r("",!0),a(t).data.company_name?(s(),c("span",Ae," · ")):r("",!0),a(t).data.email_id||a(t).data.mobile_no||a(t).data.company_name?(s(),u(p,{key:6,variant:"ghost",label:e.__("More"),class:"-ml-1 cursor-pointer hover:text-gray-900",onClick:o[1]||(o[1]=()=>{x.value=!0,g.value=!0})},null,8,["label"])):r("",!0)]),i("div",Pe,[n(p,{label:e.__("Edit"),size:"sm",onClick:o[2]||(o[2]=()=>{x.value=!1,g.value=!0})},{prefix:m(()=>[n(be,{class:"h-4 w-4"})]),_:1},8,["label"]),n(p,{label:e.__("Delete"),theme:"red",size:"sm",onClick:T},{prefix:m(()=>[n(Z,{name:"trash-2",class:"h-4 w-4"})]),_:1},8,["label"])]),n(H,{message:e.__(b)},null,8,["message"])])])]}),_:1}),n(a(pe),{class:"overflow-hidden",modelValue:E.value,"onUpdate:modelValue":o[3]||(o[3]=l=>E.value=l),tabs:q},{tab:m(({tab:l,selected:b})=>[i("button",{class:k(["group flex items-center gap-2 border-b border-transparent py-2.5 text-base text-gray-600 duration-300 ease-in-out hover:border-gray-400 hover:text-gray-900",{"text-gray-900":b}])},[l.icon?(s(),u(v(l.icon),{key:0,class:"h-5"})):r("",!0),N(" "+d(e.__(l.label))+" ",1),n(K,{class:k(["group-hover:bg-gray-900",[b?"bg-gray-900":"bg-gray-600"]]),variant:"solid",theme:"gray",size:"sm"},{default:m(()=>[N(d(l.count),1)]),_:2},1032,["class"])],2)]),default:m(({tab:l})=>[l.label==="Deals"&&w.value.length?(s(),u(ye,{key:0,class:"mt-4",rows:w.value,columns:G.value,options:{selectable:!1,showTooltip:!1}},null,8,["rows","columns"])):r("",!0),w.value.length?r("",!0):(s(),c("div",Re,[i("div",Ue,[(s(),u(v(l.icon),{class:"!h-10 !w-10"})),i("div",null,d(e.__("No {0} Found",[e.__(l.label)])),1)])]))]),_:1},8,["modelValue"])])):r("",!0),n(ge,{modelValue:g.value,"onUpdate:modelValue":o[4]||(o[4]=l=>g.value=l),contact:a(t),options:{detailMode:x.value}},null,8,["modelValue","contact","options"])],64)}}},ia=Q(Oe,[["__scopeId","data-v-e940a3fb"]]);export{ia as default};
//# sourceMappingURL=Contact-61e02a96.js.map