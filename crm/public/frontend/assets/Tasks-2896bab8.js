import{_ as G}from"./CustomActions-78928ae0.js";import{z as I,A as J,B as N,C as H,D as K,E as X,G as m,H as O,I as Q,J as W,K as Y,s as R,o as r,b as c,f as s,w as p,u as d,F as E,x as Z,a as A,M as j,X as P,d as F,t as U,k as L,a_ as ee,aY as te,L as ae,N as oe,V as se,b4 as q,b5 as le,c as ne,W as ie,a3 as ue,$ as re}from"./index-fd4111d0.js";import{_ as de,a as me}from"./LayoutHeader-4431816a.js";import{_ as ce}from"./ViewControls-fd4f1e0f.js";import{C as pe}from"./CalendarIcon-7eb5de62.js";import{_ as fe}from"./EditValueModal-3deb1bd3.js";import{_ as _e,a as ve,b as ke,c as Ce,e as ye,d as ge}from"./ListView-dc019d7b.js";import{_ as we}from"./DatePicker-808a1e66.js";import{T as be}from"./TaskModal-3d86a4d5.js";import"./EditIcon-fc06c5a8.js";import"./DatetimePicker-76bd67f8.js";import"./label-3c481436.js";const Te={key:0},Ve={class:"flex items-center gap-2 truncate text-base"},Me={key:0,class:"truncate"},he={key:0},$e={key:1},xe={key:2},Ue=["onClick"],Ae={key:1},Fe={key:2},Le=["onClick"],Se={__name:"TasksListView",props:I({rows:{type:Array,required:!0},columns:{type:Array,required:!0},options:{type:Object,default:()=>({selectable:!0,showTooltip:!0,resizeColumn:!1,totalCount:0,rowCount:0})}},{modelValue:{},modelModifiers:{},list:{},listModifiers:{}}),emits:I(["loadMore","updatePageCount","showTask","columnWidthUpdated","applyFilter","update:selections"],["update:modelValue","update:list"]),setup(_,{expose:D,emit:S}){const k=S,{getUser:M}=J(),T=N(_,"modelValue"),C=N(_,"list"),z=H(),{$dialog:l}=K();X(T,(n,a)=>{n!==a&&k("updatePageCount",n)});const w=m(!1),V=m([]),b=m(()=>{});function B(n,a){V.value=n,w.value=!0,b.value=a}function h(n,a){l({title:__("Delete"),message:__("Are you sure you want to delete {0} item(s)?",[n.size]),variant:"danger",actions:[{label:__("Delete"),variant:"solid",theme:"red",onClick:v=>{W("frappe.desk.reportview.delete_items",{items:JSON.stringify(Array.from(n)),doctype:"CRM Task"}).then(()=>{Y({title:__("Deleted successfully"),icon:"check",iconClasses:"text-green-600"}),a(),C.value.reload(),v()})}}]})}const y=m([]);function $(n,a){return[{label:__("Edit"),onClick:()=>B(n,a)},{label:__("Delete"),onClick:()=>h(n,a)}]}function x(n){let a=[];n.forEach(v=>{a.push(v)}),k("update:selections",a)}return O(()=>{var n,a,v;(n=C.value)!=null&&n.data&&(Q(C.value.data,{list:C.value,call:W,createToast:Y,$dialog:l,router:z}),y.value=((v=(a=C.value)==null?void 0:a.data)==null?void 0:v.listActions)||[])}),D({customListActions:y}),(n,a)=>{const v=R("FormControl"),i=R("Button");return r(),c(E,null,[s(d(ge),{columns:_.columns,rows:_.rows,options:{onRowClick:e=>k("showTask",e.name),selectable:_.options.selectable,showTooltip:_.options.showTooltip,resizeColumn:_.options.resizeColumn},"row-key":"name","onUpdate:selections":a[1]||(a[1]=e=>x(e))},{default:p(()=>[s(d(_e),{class:"mx-5",onColumnWidthUpdated:a[0]||(a[0]=e=>k("columnWidthUpdated"))}),s(d(ve),{id:"list-rows"},{default:p(()=>[(r(!0),c(E,null,Z(_.rows,e=>(r(),A(d(Ce),{class:"mx-5",key:e.name,row:e},{default:p(({idx:u,column:o,item:t})=>[o.key==="due_date"||o.key==="remind_task"?(r(),c("div",Te,[s(d(j),{text:d(P)(t,"ddd, MMM D, YYYY | hh:mm a")},{default:p(()=>[F("div",Ve,[s(pe),t?(r(),c("div",Me,U(d(P)(t,"D MMM, hh:mm a")),1)):L("",!0)])]),_:2},1032,["text"])])):(r(),A(d(ke),{key:1,item:t},{prefix:p(()=>[o.key==="status"?(r(),c("div",he,[s(ee,{status:t},null,8,["status"])])):o.key==="priority"?(r(),c("div",$e,[s(te,{priority:t},null,8,["priority"])])):o.key==="assigned_to"?(r(),c("div",xe,[t.full_name?(r(),A(d(ae),{key:0,class:"flex items-center",image:t.user_image,label:t.full_name,size:"sm"},null,8,["image","label"])):L("",!0)])):L("",!0)]),default:p(({label:g})=>[["modified","creation"].includes(o.key)?(r(),c("div",{key:0,class:"truncate text-base",onClick:f=>k("applyFilter",{event:f,idx:u,column:o,item:t})},[s(d(j),{text:t.label},{default:p(()=>[F("div",null,U(t.timeAgo),1)]),_:2},1032,["text"])],8,Ue)):o.type==="Check"?(r(),c("div",Ae,[s(v,{type:"checkbox",modelValue:t,disabled:!0,class:"text-gray-900"},null,8,["modelValue"])])):["modified_by","owner"].includes(o.key)?(r(),c("div",Fe,[F("div",null,U(d(M)(t).first_name),1)])):(r(),c("div",{key:3,class:"truncate text-base",onClick:f=>k("applyFilter",{event:f,idx:u,column:o,item:t})},U(n.__(g)),9,Le))]),_:2},1032,["item"]))]),_:2},1032,["row"]))),128))]),_:1}),s(d(ye),null,{actions:p(({selections:e,unselectAll:u})=>[s(d(oe),{options:$(e,u)},{default:p(()=>[s(i,{icon:"more-horizontal",variant:"ghost"})]),_:2},1032,["options"])]),_:1})]),_:1},8,["columns","rows","options"]),s(d(we),{class:"border-t px-5 py-2",modelValue:T.value,"onUpdate:modelValue":a[2]||(a[2]=e=>T.value=e),options:{rowCount:_.options.rowCount,totalCount:_.options.totalCount},onLoadMore:a[3]||(a[3]=e=>k("loadMore"))},null,8,["modelValue","options"]),s(fe,{modelValue:w.value,"onUpdate:modelValue":a[4]||(a[4]=e=>w.value=e),unselectAll:b.value,"onUpdate:unselectAll":a[5]||(a[5]=e=>b.value=e),doctype:"CRM Task",selectedValues:V.value,onReload:a[6]||(a[6]=e=>C.value.reload())},null,8,["modelValue","unselectAll","selectedValues"])],64)}}},ze={key:1,class:"flex h-full items-center justify-center"},Be={class:"flex flex-col items-center gap-3 text-xl font-medium text-gray-500"},Ge={__name:"Tasks",setup(_){const D=[{label:__("Tasks"),route:{name:"Tasks"}}],{getUser:S}=J(),{roles:k}=se(),M=m(null),T=m(!1),C=m([]),z=i=>{var u,o;let e=i.message;if(e!=null&&e!=""){let t=(o=(u=l.value)==null?void 0:u.data)==null?void 0:o.data.filter(g=>g.name==e);t.length>0&&x(t[0].name)}};O(()=>{let i=k.data;for(let e=0;e<i.length;e++)if(i[e]=="System Manager"){T.value=!0;break}setTimeout(()=>{var u,o;let e=window.location.hash.substring(1);if(e!=null&&e!=""){let t=(o=(u=l.value)==null?void 0:u.data)==null?void 0:o.data.filter(g=>g.name==e);t.length>0&&x(t[0].name)}},400),q.on("custom-event",z)}),le(()=>{q.off("custom-event",z)});const l=m({}),w=m(1),V=m(1),b=m(20),B=m(null),h=ne(()=>{var i,e,u;return(e=(i=l.value)==null?void 0:i.data)!=null&&e.data?(u=l.value)==null?void 0:u.data.data.map(o=>{var g;let t={};return(g=l.value)==null||g.data.rows.forEach(f=>{t[f]=o[f],["modified","creation"].includes(f)?t[f]={label:P(o[f],re),timeAgo:__(ie(o[f]))}:f=="assigned_to"&&(t[f]={label:o.assigned_to&&S(o.assigned_to).full_name,...o.assigned_to&&S(o.assigned_to)})}),t}):[]}),y=m(!1),$=m({name:"",title:"",description:"",assigned_to:"",due_date:"",remind_task:"",status:"Backlog",priority:"Low",reference_doctype:"CRM Lead",reference_docname:""});function x(i){var u,o;let e=(u=h.value)==null?void 0:u.find(t=>t.name===i);$.value={name:e.name,title:e.title,description:e.description,assigned_to:((o=e.assigned_to)==null?void 0:o.email)||"",due_date:e.due_date,remind_task:e.remind_task,status:e.status,priority:e.priority,reference_doctype:e.reference_doctype,reference_docname:e.reference_docname},y.value=!0}function n(){$.value={name:"",title:"",description:"",assigned_to:"",due_date:"",remind_task:"",status:"Backlog",priority:"Low",reference_doctype:"CRM Lead",reference_docname:""},y.value=!0}function a(){l.value.reload()}function v(i){C.value=i}return(i,e)=>{const u=R("FeatherIcon"),o=R("Button");return r(),c(E,null,[s(de,null,{"left-header":p(()=>[s(d(me),{items:D})]),"right-header":p(()=>{var t;return[(t=M.value)!=null&&t.customListActions?(r(),A(G,{key:0,actions:M.value.customListActions},null,8,["actions"])):L("",!0),s(o,{variant:"solid",label:i.__("Create"),onClick:n},{prefix:p(()=>[s(u,{name:"plus",class:"h-4"})]),_:1},8,["label"])]}),_:1}),s(ce,{ref_key:"viewControls",ref:B,modelValue:l.value,"onUpdate:modelValue":e[0]||(e[0]=t=>l.value=t),loadMore:w.value,"onUpdate:loadMore":e[1]||(e[1]=t=>w.value=t),resizeColumn:V.value,"onUpdate:resizeColumn":e[2]||(e[2]=t=>V.value=t),updatedPageCount:b.value,"onUpdate:updatedPageCount":e[3]||(e[3]=t=>b.value=t),doctype:"CRM Task",showElement:!0,showFuncImport:!1,showFuncConvertTaskCustomer:T.value,placeholderText:i.__("Search"),onAfterConvertTaskCustomer:e[4]||(e[4]=t=>a()),docSelect:C.value},null,8,["modelValue","loadMore","resizeColumn","updatedPageCount","showFuncConvertTaskCustomer","placeholderText","docSelect"]),l.value.data&&h.value.length?(r(),A(Se,{key:0,ref_key:"tasksListView",ref:M,modelValue:l.value.data.page_length_count,"onUpdate:modelValue":e[5]||(e[5]=t=>l.value.data.page_length_count=t),list:l.value,"onUpdate:list":e[6]||(e[6]=t=>l.value=t),rows:h.value,columns:l.value.data.columns,options:{showTooltip:!1,resizeColumn:!0,rowCount:l.value.data.row_count,totalCount:l.value.data.total_count},onLoadMore:e[7]||(e[7]=()=>w.value++),onColumnWidthUpdated:e[8]||(e[8]=()=>V.value++),onUpdatePageCount:e[9]||(e[9]=t=>b.value=t),onShowTask:x,onApplyFilter:e[10]||(e[10]=t=>B.value.applyFilter(t)),"onUpdate:selections":e[11]||(e[11]=t=>v(t))},null,8,["modelValue","list","rows","columns","options"])):l.value.data?(r(),c("div",ze,[F("div",Be,[s(ue,{class:"h-10 w-10"}),F("span",null,U(i.__("No {0} Found",[i.__("tasks")])),1),s(o,{label:i.__("Create"),onClick:e[12]||(e[12]=t=>y.value=!0)},{prefix:p(()=>[s(u,{name:"plus",class:"h-4"})]),_:1},8,["label"])])])):L("",!0),s(be,{modelValue:y.value,"onUpdate:modelValue":e[13]||(e[13]=t=>y.value=t),reloadTasks:l.value,"onUpdate:reloadTasks":e[14]||(e[14]=t=>l.value=t),task:$.value},null,8,["modelValue","reloadTasks","task"])],64)}}};export{Ge as default};
//# sourceMappingURL=Tasks-2896bab8.js.map