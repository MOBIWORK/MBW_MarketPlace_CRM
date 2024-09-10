import{_ as ne}from"./CustomActions-78928ae0.js";import{z as S,B as j,C as Y,D as se,E as ee,G as L,H as re,I as ie,J as N,K as P,s as U,o,b as d,f as s,w as C,u as f,F as B,x as le,a as A,L as H,k as F,M as ae,d as g,t as I,N as ue,l as te,c as oe,ar as K,S as T,ag as ce,Z as de,ai as me,a5 as pe,b3 as _e,a7 as ge,j as ve,n as X,aB as fe,b1 as Ce,be as ye,A as be,a0 as he,aT as ke,X as Le,W as we,P as xe,$ as $e}from"./index-fd4111d0.js";import{_ as Me,a as Ve}from"./LayoutHeader-4431816a.js";import{_ as Ie}from"./ViewControls-fd4f1e0f.js";import{_ as De,a as Fe,b as Ue,c as Ae,e as ze,d as Be}from"./ListView-dc019d7b.js";import{_ as Re}from"./DatePicker-808a1e66.js";import{D as Ne,_ as Pe}from"./FadedScrollableDiv-b9eabb0e.js";import{C as Te}from"./CalendarIcon-7eb5de62.js";import"./EditIcon-fc06c5a8.js";import"./DatetimePicker-76bd67f8.js";import"./label-3c481436.js";const Se={key:0},je={key:1},He=["onClick"],We={key:1,class:"truncate text-base"},Ee={key:2},Ze=["onClick"],Oe={__name:"CallLogsListView",props:S({rows:{type:Array,required:!0},columns:{type:Array,required:!0},options:{type:Object,default:()=>({selectable:!0,showTooltip:!0,resizeColumn:!1,totalCount:0,rowCount:0})}},{modelValue:{},modelModifiers:{},list:{},listModifiers:{}}),emits:S(["loadMore","updatePageCount","columnWidthUpdated","applyFilter"],["update:modelValue","update:list"]),setup(m,{expose:n,emit:w}){const p=w,x=j(m,"modelValue"),v=j(m,"list"),c=Y(),{$dialog:$}=se();ee(x,(r,l)=>{r!==l&&p("updatePageCount",r)});function y(r,l){$({title:"Delete",message:`Are you sure you want to delete ${r.size} item${r.size>1?"s":""}?`,variant:"danger",actions:[{label:"Delete",variant:"solid",theme:"red",onClick:b=>{N("frappe.desk.reportview.delete_items",{items:JSON.stringify(Array.from(r)),doctype:"CRM Call Log"}).then(()=>{P({title:"Deleted successfully",icon:"check",iconClasses:"text-green-600"}),l(),v.value.reload(),b()})}}]})}const _=L([]),M=L([]);function D(r,l){let b=[{label:"Delete",onClick:()=>y(r,l)}];return _.value.forEach(h=>{b.push({label:h.label,onClick:()=>h.onClick({list:v.value,selections:r,unselectAll:l,call:N,createToast:P,$dialog:$,router:c})})}),b}return re(()=>{var r,l,b,h,V;(r=v.value)!=null&&r.data&&(ie(v.value.data,{list:v.value,call:N,createToast:P,$dialog:$,router:c}),_.value=((b=(l=v.value)==null?void 0:l.data)==null?void 0:b.bulkActions)||[],M.value=((V=(h=v.value)==null?void 0:h.data)==null?void 0:V.listActions)||[])}),n({customListActions:M}),(r,l)=>{const b=U("FeatherIcon"),h=U("Badge"),V=U("FormControl"),k=U("Button");return o(),d(B,null,[s(f(Be),{columns:m.columns,rows:m.rows,options:{onRowClick:e=>p("showCallLog",e.name),selectable:m.options.selectable,showTooltip:m.options.showTooltip,resizeColumn:m.options.resizeColumn},"row-key":"name"},{default:C(()=>[s(f(De),{class:"mx-5",onColumnWidthUpdated:l[0]||(l[0]=e=>p("columnWidthUpdated"))}),s(f(Fe),{id:"list-rows"},{default:C(()=>[(o(!0),d(B,null,le(m.rows,e=>(o(),A(f(Ae),{class:"mx-5",key:e.name,row:e},{default:C(({idx:a,column:t,item:i})=>[s(f(Ue),{item:i},{prefix:C(()=>[["caller","receiver"].includes(t.key)?(o(),d("div",Se,[i.label?(o(),A(f(H),{key:0,class:"flex items-center",image:i.image,label:i.label,size:"sm"},null,8,["image","label"])):F("",!0)])):["type","duration"].includes(t.key)?(o(),d("div",je,[s(b,{name:i.icon,class:"h-3 w-3"},null,8,["name"])])):F("",!0)]),default:C(({label:R})=>[["modified","creation"].includes(t.key)?(o(),d("div",{key:0,class:"truncate text-base",onClick:u=>p("applyFilter",{event:u,idx:a,column:t,item:i})},[s(f(ae),{text:i.label},{default:C(()=>[g("div",null,I(i.timeAgo),1)]),_:2},1032,["text"])],8,He)):t.key==="status"?(o(),d("div",We,[s(h,{variant:"subtle",theme:i.color,size:"md",label:r.__(i.label),onClick:u=>p("applyFilter",{event:u,idx:a,column:t,item:i})},null,8,["theme","label","onClick"])])):t.type==="Check"?(o(),d("div",Ee,[s(V,{type:"checkbox",modelValue:i,disabled:!0,class:"text-gray-900"},null,8,["modelValue"])])):(o(),d("div",{key:3,class:"truncate text-base",onClick:u=>p("applyFilter",{event:u,idx:a,column:t,item:i})},I(r.__(R)),9,Ze))]),_:2},1032,["item"])]),_:2},1032,["row"]))),128))]),_:1}),s(f(ze),null,{actions:C(({selections:e,unselectAll:a})=>[s(f(ue),{options:D(e,a)},{default:C(()=>[s(k,{icon:"more-horizontal",variant:"ghost"})]),_:2},1032,["options"])]),_:1})]),_:1},8,["columns","rows","options"]),s(f(Re),{class:"border-t px-5 py-2",modelValue:x.value,"onUpdate:modelValue":l[1]||(l[1]=e=>x.value=e),options:{rowCount:m.options.rowCount,totalCount:m.options.totalCount},onLoadMore:l[2]||(l[2]=e=>p("loadMore"))},null,8,["modelValue","options"])],64)}}},Qe={},qe={width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Je=g("g",{"clip-path":"url(#clip0_3668_69185)"},[g("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M14.25 8C14.25 11.4518 11.4518 14.25 8 14.25C4.54822 14.25 1.75 11.4518 1.75 8C1.75 4.54822 4.54822 1.75 8 1.75C11.4518 1.75 14.25 4.54822 14.25 8ZM15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8ZM11.2909 5.98482C11.4666 5.77175 11.4363 5.45663 11.2232 5.28096C11.0101 5.1053 10.695 5.13561 10.5193 5.34868L7.07001 9.53239L5.72845 7.79857C5.55946 7.58018 5.24543 7.54012 5.02703 7.70911C4.80863 7.8781 4.76858 8.19214 4.93756 8.41053L6.66217 10.6394C6.7552 10.7596 6.89788 10.831 7.04988 10.8334C7.20188 10.8357 7.3467 10.7688 7.4434 10.6515L11.2909 5.98482Z",fill:"currentColor"})],-1),Ge=g("defs",null,[g("clipPath",{id:"clip0_3668_69185"},[g("rect",{width:"16",height:"16",fill:"white"})])],-1),Ke=[Je,Ge];function Xe(m,n){return o(),d("svg",qe,Ke)}const Ye=te(Qe,[["render",Xe]]);const el={class:"flex items-center gap-3"},ll={class:"text-2xl font-semibold leading-6 text-gray-900"},al={class:"flex flex-col gap-3.5"},tl={class:"grid size-7 place-content-center"},ol={class:"flex min-h-7 w-full items-center gap-2"},nl={key:0,class:"flex items-center gap-1"},sl={class:"ml-1 flex flex-col gap-1"},rl={class:"ml-1 flex flex-col gap-1"},il={key:2,class:"w-full"},ul=["src"],cl=["innerHTML"],dl=["innerHTML"],ml={key:5},pl={__name:"CallLogModal",props:S({callLog:{type:Object,default:{}}},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(m){const n=m,w=j(m,"modelValue"),p=L(!1),x=Y(),v=L(null),c=oe(()=>{var _;return[{icon:K(T,{name:n.callLog.type.icon,class:"h-3.5 w-3.5"}),name:"type",value:n.callLog.type.label+" Call"},{icon:ce,name:"receiver",value:{receiver:n.callLog.receiver,caller:n.callLog.caller}},{icon:n.callLog.reference_doctype=="CRM Lead"?de:me,name:"reference_doctype",value:n.callLog.reference_doctype=="CRM Lead"?"Lead":"Deal",link:()=>{n.callLog.reference_doctype=="CRM Lead"?x.push({name:"Lead",params:{leadId:n.callLog.reference_docname}}):x.push({name:"Deal",params:{dealId:n.callLog.reference_docname}})}},{icon:Te,name:"creation",value:n.callLog.creation.label,tooltip:n.callLog.creation.label},{icon:Ne,name:"duration",value:n.callLog.duration.label},{icon:Ye,name:"status",value:n.callLog.status.label,color:n.callLog.status.color},{icon:K(T,{name:"play-circle",class:"h-4 w-4 mt-2"}),name:"recording_url",value:n.callLog.recording_url},{icon:pe,name:"note",value:(_=v.value)==null?void 0:_.doc}].filter(M=>M.value)});function $(){N("crm.fcrm.doctype.crm_call_log.crm_call_log.create_lead_from_call_log",{call_log:n.callLog}).then(y=>{y&&x.push({name:"Lead",params:{leadId:y}})})}return ee(w,y=>{y&&(v.value=ye({doctype:"FCRM Note",name:n.callLog.note,fields:["title","content"],cache:["note",n.callLog.note],auto:!0}))}),(y,_)=>{var r;const M=U("Button"),D=U("Dialog");return o(),d(B,null,[s(D,{modelValue:w.value,"onUpdate:modelValue":_[1]||(_[1]=l=>w.value=l)},_e({"body-title":C(()=>[g("div",el,[g("h3",ll,I(y.__("Call Details")),1)])]),"body-content":C(()=>[g("div",al,[(o(!0),d(B,null,le(c.value,l=>(o(),d("div",{key:l.name,class:"flex gap-2 text-base text-gray-800"},[g("div",tl,[(o(),A(ge(l.icon)))]),g("div",ol,[l.name=="receiver"?(o(),d("div",nl,[s(f(H),{image:l.value.caller.image,label:l.value.caller.label,size:"sm"},null,8,["image","label"]),g("div",sl,I(l.value.caller.label),1),s(f(T),{name:"arrow-right",class:"mx-1 h-4 w-4 text-gray-600"}),s(f(H),{image:l.value.receiver.image,label:l.value.receiver.label,size:"sm"},null,8,["image","label"]),g("div",rl,I(l.value.receiver.label),1)])):l.tooltip?(o(),A(f(ae),{key:1,text:l.tooltip},{default:C(()=>[ve(I(l.value),1)]),_:2},1032,["text"])):l.name=="recording_url"?(o(),d("div",il,[g("audio",{class:"audio-control w-full",controls:"",src:l.value},null,8,ul)])):l.name=="note"?(o(),d("div",{key:3,class:"w-full cursor-pointer rounded border px-2 pt-1.5 text-base text-gray-700",onClick:_[0]||(_[0]=()=>p.value=!0)},[s(Pe,{class:"max-h-24 min-h-16 overflow-y-auto"},{default:C(()=>{var b,h,V,k,e;return[(b=l.value)!=null&&b.title?(o(),d("div",{key:0,class:X([(h=l.value)!=null&&h.content?"mb-1 font-bold":""]),innerHTML:(V=l.value)==null?void 0:V.title},null,10,cl)):F("",!0),(k=l.value)!=null&&k.content?(o(),d("div",{key:1,innerHTML:(e=l.value)==null?void 0:e.content},null,8,dl)):F("",!0)]}),_:2},1024)])):(o(),d("div",{key:4,class:X(l.color?`text-${l.color}-600`:"")},I(l.value),3)),l.link?(o(),d("div",ml,[s(fe,{class:"h-4 w-4 shrink-0 cursor-pointer text-gray-600 hover:text-gray-800",onClick:()=>l.link()},null,8,["onClick"])])):F("",!0)])]))),128))])]),_:2},[m.callLog.type.label=="Incoming"&&!m.callLog.reference_docname?{name:"actions",fn:C(()=>[s(M,{class:"w-full",variant:"solid",label:y.__("Create lead"),onClick:$},null,8,["label"])]),key:"0"}:void 0]),1032,["modelValue"]),s(Ce,{modelValue:p.value,"onUpdate:modelValue":_[2]||(_[2]=l=>p.value=l),note:(r=v.value)==null?void 0:r.doc},null,8,["modelValue","note"])],64)}}},_l=te(pl,[["__scopeId","data-v-c2aa0543"]]),gl={key:1,class:"flex h-full items-center justify-center"},vl={class:"flex flex-col items-center gap-3 text-xl font-medium text-gray-500"},Vl={__name:"CallLogs",setup(m){const{getUser:n}=be(),{getContact:w,getLeadContact:p}=he(),x=[{label:__("Call Logs"),route:{name:"Call Logs"}}],v=L(null),c=L({}),$=L(1),y=L(1),_=L(20),M=L(null),D=oe(()=>{var k,e,a;return(e=(k=c.value)==null?void 0:k.data)!=null&&e.data?(a=c.value)==null?void 0:a.data.data.map(t=>{var R;let i={};return(R=c.value)==null||R.data.rows.forEach(u=>{var W,E,Z,O,Q,q,J,G;i[u]=t[u];let z=t.type==="Incoming";u==="caller"?i[u]={label:z?((W=w(t.from))==null?void 0:W.full_name)||((E=p(t.from))==null?void 0:E.full_name)||"Unknown":n(t.caller).full_name,image:z?((Z=w(t.from))==null?void 0:Z.image)||((O=p(t.from))==null?void 0:O.image):n(t.caller).user_image}:u==="receiver"?i[u]={label:z?n(t.receiver).full_name:((Q=w(t.to))==null?void 0:Q.full_name)||((q=p(t.to))==null?void 0:q.full_name)||"Unknown",image:z?n(t.receiver).user_image:((J=w(t.to))==null?void 0:J.image)||((G=p(t.to))==null?void 0:G.image)}:u==="duration"?i[u]={label:ke(t.duration),icon:"clock"}:u==="type"?i[u]={label:t.type,icon:z?"phone-incoming":"phone-outgoing"}:u==="status"?i[u]={label:h[t.status],color:V[t.status]}:["modified","creation"].includes(u)&&(i[u]={label:Le(t[u],$e),timeAgo:__(we(t[u]))})}),i}):[]}),r=L(!1),l=L({name:"",caller:"",receiver:"",duration:"",type:"",status:"",from:"",to:"",note:"",recording_url:"",reference_doctype:"",reference_docname:"",creation:""});function b(k){var a;let e=(a=D.value)==null?void 0:a.find(t=>t.name===k);l.value={name:e.name,caller:e.caller,receiver:e.receiver,duration:e.duration,type:e.type,status:e.status,from:e.from,to:e.to,note:e.note,recording_url:e.recording_url,reference_doctype:e.reference_doctype,reference_docname:e.reference_docname,creation:e.creation},r.value=!0}const h={Completed:"Completed",Initiated:"Initiated",Busy:"Declined",Failed:"Failed",Queued:"Queued",Cancelled:"Cancelled",Ringing:"Ringing","No Answer":"Missed Call","In Progress":"In Progress"},V={Completed:"green",Busy:"orange",Failed:"red",Initiated:"gray",Queued:"gray",Cancelled:"gray",Ringing:"gray","No Answer":"red","In Progress":"blue"};return(k,e)=>(o(),d(B,null,[s(Me,null,{"left-header":C(()=>[s(f(Ve),{items:x})]),"right-header":C(()=>{var a;return[(a=v.value)!=null&&a.customListActions?(o(),A(ne,{key:0,actions:v.value.customListActions},null,8,["actions"])):F("",!0)]}),_:1}),s(Ie,{ref_key:"viewControls",ref:M,modelValue:c.value,"onUpdate:modelValue":e[0]||(e[0]=a=>c.value=a),loadMore:$.value,"onUpdate:loadMore":e[1]||(e[1]=a=>$.value=a),resizeColumn:y.value,"onUpdate:resizeColumn":e[2]||(e[2]=a=>y.value=a),updatedPageCount:_.value,"onUpdate:updatedPageCount":e[3]||(e[3]=a=>_.value=a),doctype:"CRM Call Log"},null,8,["modelValue","loadMore","resizeColumn","updatedPageCount"]),c.value.data&&D.value.length?(o(),A(Oe,{key:0,ref_key:"callLogsListView",ref:v,modelValue:c.value.data.page_length_count,"onUpdate:modelValue":e[4]||(e[4]=a=>c.value.data.page_length_count=a),list:c.value,"onUpdate:list":e[5]||(e[5]=a=>c.value=a),rows:D.value,columns:c.value.data.columns,options:{showTooltip:!1,resizeColumn:!0,rowCount:c.value.data.row_count,totalCount:c.value.data.total_count},onShowCallLog:b,onLoadMore:e[6]||(e[6]=()=>$.value++),onColumnWidthUpdated:e[7]||(e[7]=()=>y.value++),onUpdatePageCount:e[8]||(e[8]=a=>_.value=a),onApplyFilter:e[9]||(e[9]=a=>M.value.applyFilter(a))},null,8,["modelValue","list","rows","columns","options"])):c.value.data?(o(),d("div",gl,[g("div",vl,[s(xe,{class:"h-10 w-10"}),g("span",null,I(k.__("No {0} Found",[k.__("Logs")])),1)])])):F("",!0),s(_l,{modelValue:r.value,"onUpdate:modelValue":e[10]||(e[10]=a=>r.value=a),reloadCallLogs:c.value,"onUpdate:reloadCallLogs":e[11]||(e[11]=a=>c.value=a),callLog:l.value},null,8,["modelValue","reloadCallLogs","callLog"])],64))}};export{Vl as default};
//# sourceMappingURL=CallLogs-c298ecc2.js.map