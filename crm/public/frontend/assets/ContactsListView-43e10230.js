import{m as x,u as $,a as S,g as W,w as j,r as y,o as I,s as O,c as A,b as M,d as z,e as l,f as u,h as s,i as r,j as n,F as D,k as J,l as v,p as F,q as C,P as G,t as H,v as K,x as B,D as Q,n as X}from"./index-71957d41.js";import{_ as Y}from"./EditValueModal-f268780e.js";import{_ as Z,a as ee,b as te,c as oe,d as ae,e as le}from"./ListView-19ae80fc.js";import{_ as se}from"./DatePicker-3268ecce.js";const ne={key:0},ie={key:1},ue={key:2},re=["onClick"],de={key:1},ce=["onClick"],ye={__name:"ContactsListView",props:x({rows:{type:Array,required:!0},columns:{type:Array,required:!0},options:{type:Object,default:()=>({selectable:!0,showTooltip:!0,resizeColumn:!1,totalCount:0,rowCount:0})}},{modelValue:{},modelModifiers:{},list:{},listModifiers:{}}),emits:x(["loadMore","updatePageCount","columnWidthUpdated","applyFilter"],["update:modelValue","update:list"]),setup(i,{expose:L,emit:U}){const p=U,f=$(i,"modelValue"),m=$(i,"list"),N=S(),{$dialog:w}=W();j(f,(t,e)=>{t!==e&&p("updatePageCount",t)});const k=y(!1),V=y([]),b=y(()=>{});function P(t,e){V.value=t,k.value=!0,b.value=e}function R(t,e){w({title:__("Delete"),message:__("Are you sure you want to delete {0} item(s)?",[t.size]),variant:"danger",actions:[{label:__("Delete"),variant:"solid",theme:"red",onClick:d=>{A("frappe.desk.reportview.delete_items",{items:JSON.stringify(Array.from(t)),doctype:"Contact"}).then(()=>{M({title:__("Deleted successfully"),icon:"check",iconClasses:"text-green-600"}),e(),m.value.reload(),d()})}}]})}const h=y([]);function T(t,e){return[{label:__("Edit"),onClick:()=>P(t,e)},{label:__("Delete"),onClick:()=>R(t,e)}]}return I(()=>{var t,e,d;(t=m.value)!=null&&t.data&&(O(m.value.data,{list:m.value,call:A,createToast:M,$dialog:w,router:N}),h.value=((d=(e=m.value)==null?void 0:e.data)==null?void 0:d.listActions)||[])}),L({customListActions:h}),(t,e)=>{const d=z("FormControl"),q=z("Button");return l(),u(D,null,[s(n(le),{class:X(t.$attrs.class),columns:i.columns,rows:i.rows,options:{getRowRoute:o=>({name:"Contact",params:{contactId:o.name}}),selectable:i.options.selectable,showTooltip:i.options.showTooltip,resizeColumn:i.options.resizeColumn},"row-key":"name"},{default:r(()=>[s(n(Z),{class:"mx-5",onColumnWidthUpdated:e[0]||(e[0]=o=>p("columnWidthUpdated"))}),s(n(ee),{id:"list-rows"},{default:r(()=>[(l(!0),u(D,null,J(i.rows,o=>(l(),v(n(oe),{class:"mx-5",key:o.name,row:o},{default:r(({idx:_,column:c,item:a})=>[s(n(te),{item:a},{prefix:r(()=>[c.key==="full_name"?(l(),u("div",ne,[a.label?(l(),v(n(F),{key:0,class:"flex items-center",image:a.image,label:a.image_label,size:"sm"},null,8,["image","label"])):C("",!0)])):c.key==="company_name"?(l(),u("div",ie,[a.label?(l(),v(n(F),{key:0,class:"flex items-center",image:a.logo,label:a.label,size:"sm"},null,8,["image","label"])):C("",!0)])):c.key==="mobile_no"?(l(),u("div",ue,[s(G,{class:"h-4 w-4"})])):C("",!0)]),default:r(({label:E})=>[["modified","creation"].includes(c.key)?(l(),u("div",{key:0,class:"truncate text-base",onClick:g=>p("applyFilter",{event:g,idx:_,column:c,item:a})},[s(n(H),{text:a.label},{default:r(()=>[K("div",null,B(a.timeAgo),1)]),_:2},1032,["text"])],8,re)):c.type==="Check"?(l(),u("div",de,[s(d,{type:"checkbox",modelValue:a,disabled:!0,class:"text-gray-900"},null,8,["modelValue"])])):(l(),u("div",{key:2,class:"truncate text-base",onClick:g=>p("applyFilter",{event:g,idx:_,column:c,item:a})},B(t.__(E)),9,ce))]),_:2},1032,["item"])]),_:2},1032,["row"]))),128))]),_:1}),s(n(ae),null,{actions:r(({selections:o,unselectAll:_})=>[s(n(Q),{options:T(o,_)},{default:r(()=>[s(q,{icon:"more-horizontal",variant:"ghost"})]),_:2},1032,["options"])]),_:1})]),_:1},8,["class","columns","rows","options"]),f.value?(l(),v(n(se),{key:0,class:"border-t px-5 py-2",modelValue:f.value,"onUpdate:modelValue":e[1]||(e[1]=o=>f.value=o),options:{rowCount:i.options.rowCount,totalCount:i.options.totalCount},onLoadMore:e[2]||(e[2]=o=>p("loadMore"))},null,8,["modelValue","options"])):C("",!0),s(Y,{modelValue:k.value,"onUpdate:modelValue":e[3]||(e[3]=o=>k.value=o),unselectAll:b.value,"onUpdate:unselectAll":e[4]||(e[4]=o=>b.value=o),doctype:"Contact",selectedValues:V.value,onReload:e[5]||(e[5]=o=>m.value.reload())},null,8,["modelValue","unselectAll","selectedValues"])],64)}}};export{ye as _};
//# sourceMappingURL=ContactsListView-43e10230.js.map
