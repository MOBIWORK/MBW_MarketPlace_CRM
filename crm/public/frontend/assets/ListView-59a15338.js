import{a7 as v,e as l,f as c,an as f,t as u,v as L,j as t,l as m,U as k,aP as K,p as h,r as N,z as y,dd as M,ao as g,ap as C,n as x,al as U,bi as V,F as S,k as A,aq as q,i as z,Q as j,q as D,ar as P,h as R,aj as F,by as I,a$ as X,y as Q,w as Z,a4 as J}from"./index-57f524e0.js";const Y={class:"flex h-full w-full flex-col items-center justify-center text-base"},ee={class:"text-xl font-medium"},te={class:"mt-1 text-base text-gray-600"},se={__name:"ListEmptyState",setup(s){const o=v("list");return(e,r)=>(l(),c("div",Y,[f(e.$slots,"default",{},()=>[u("div",ee,L(t(o).options.emptyState.title),1),u("div",te,L(t(o).options.emptyState.description),1),t(o).options.emptyState.button?(l(),m(K,k({key:0},t(o).options.emptyState.button,{class:"mt-4"}),null,16)):h("",!0)])]))}};function B(s,o=!0){let e=o?"14px ":"",r=s.map(n=>{let i=n.width||1;return typeof i=="number"?i+"fr":i}).join(" ");return e+r}const H={left:"justify-start",start:"justify-start",center:"justify-center",middle:"justify-center",right:"justify-end",end:"justify-end"},oe={class:"truncate"},le={__name:"ListHeaderItem",props:{item:{type:Object,required:!0},debounce:{type:Number,default:1e3}},emits:["columnWidthUpdated"],setup(s,{emit:o}){const e=s,r=o,n=N(null),i=N(null),w=y(()=>{if(typeof e.item.width=="string"){const p=parseInt(e.item.width);if(e.item.width.includes("rem"))return p*16;if(e.item.width.includes("px"))return p}return i.value.offsetWidth}),a=p=>{const T=p.clientX,d=w.value,$=G=>{document.body.classList.add("select-none"),document.body.classList.add("cursor-col-resize"),n.value.style.backgroundColor="rgb(199 199 199)";let O=d+(G.clientX-T);e.item.width=`${O<50?50:O}px`,_(e.item.width)},b=()=>{document.body.classList.remove("select-none"),document.body.classList.remove("cursor-col-resize"),n.value.style.backgroundColor="",window.removeEventListener("mousemove",$),window.removeEventListener("mouseup",b)};window.addEventListener("mousemove",$),window.addEventListener("mouseup",b)},_=M(p=>{e.item.width=p,r("columnWidthUpdated")},e.debounce),W=v("list");return(p,T)=>(l(),c("div",{ref_key:"columnRef",ref:i,class:x(["group flex items-center",s.item.align?t(H)[s.item.align]:"justify-between"])},[u("div",{class:x(["flex items-center space-x-2 truncate text-sm text-gray-600",p.$attrs.class])},[f(p.$slots,"prefix",g(C({item:s.item}))),u("div",oe,L(s.item.label),1),f(p.$slots,"suffix",g(C({item:s.item})))],2),t(W).options.resizeColumn?f(p.$slots,"resizer",g(k({key:0},{item:s.item})),()=>[u("div",{class:"flex h-4 w-2 cursor-col-resize justify-center",onMousedown:a},[u("div",{ref_key:"resizer",ref:n,class:"h-full w-[2px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-gray-400"},null,512)],32)]):h("",!0)],2))}},ne={__name:"ListHeader",emits:["columnWidthUpdated"],setup(s,{emit:o}){const e=o,r=v("list");return(n,i)=>(l(),c("div",{class:"mb-2 grid items-center space-x-4 rounded bg-gray-100 p-2",style:q({gridTemplateColumns:t(B)(t(r).columns,t(r).options.selectable)})},[t(r).options.selectable?(l(),m(V,{key:0,class:"cursor-pointer duration-300",modelValue:t(r).allRowsSelected,onClick:U(t(r).toggleAllRows,["stop"])},null,8,["modelValue","onClick"])):h("",!0),f(n.$slots,"default",{},()=>[(l(!0),c(S,null,A(t(r).columns,w=>(l(),m(le,{key:w.key,item:w,onColumnWidthUpdated:a=>e("columnWidthUpdated",w)},null,8,["item","onColumnWidthUpdated"]))),128))])],4))}},re={class:"truncate text-base"},ie={__name:"ListRowItem",props:{column:{type:Object,default:{}},row:{type:Object,default:{}},item:{type:[String,Number,Object],default:""},align:{type:String,default:"left"}},setup(s){const o=s,e=y(()=>r(o.item).label||"");function r(i){return i&&typeof i=="object"?i:{label:i}}const n=v("list");return(i,w)=>(l(),m(j(t(n).options.showTooltip?t(D):"div"),k(t(n).options.showTooltip?{text:e.value}:{},{class:["flex items-center space-x-2",t(H)[s.align]]}),{default:z(()=>[f(i.$slots,"prefix",{},()=>[s.column.prefix?(l(),m(j(typeof s.column.prefix=="function"?s.column.prefix({row:s.row}):s.column.prefix),{key:0})):h("",!0)]),f(i.$slots,"default",g(C({label:e.value})),()=>{var a;return[u("div",re,L((a=s.column)!=null&&a.getLabel?s.column.getLabel({row:s.row}):e.value),1)]}),f(i.$slots,"suffix")]),_:3},16,["class"]))}},ae={key:0,class:"mx-2 h-px border-t border-gray-200"},E={__name:"ListRow",props:{row:{type:Object,required:!0}},setup(s){const o=s,e=v("list"),r=y(()=>{var i;return(i=e.value.rows)!=null&&i.length?e.value.rows[e.value.rows.length-1][e.value.rowKey]===o.row[e.value.rowKey]:!1}),n=y(()=>typeof e.value.options.rowHeight=="number"?`${e.value.options.rowHeight}px`:e.value.options.rowHeight);return(i,w)=>(l(),m(j(t(e).options.getRowRoute?"router-link":"div"),k({class:"flex cursor-pointer flex-col transition-all duration-300 ease-in-out"},{to:t(e).options.getRowRoute?t(e).options.getRowRoute(s.row):void 0,onClick:t(e).options.onRowClick?()=>t(e).options.onRowClick(s.row):void 0}),{default:z(()=>[(l(),m(j(t(e).options.getRowRoute?"template":"button"),{class:"[all:unset] hover:[all:unset]"},{default:z(()=>[u("div",{class:x(["grid items-center space-x-4 rounded px-2",t(e).selections.has(s.row[t(e).rowKey])?"bg-gray-100 hover:bg-gray-200":"hover:bg-gray-50"]),style:q({height:n.value,gridTemplateColumns:t(B)(t(e).columns,t(e).options.selectable)})},[t(e).options.selectable?(l(),m(V,{key:0,modelValue:t(e).selections.has(s.row[t(e).rowKey]),onClick:w[0]||(w[0]=U(a=>t(e).toggleRow(s.row[t(e).rowKey]),["stop"])),class:"cursor-pointer duration-300"},null,8,["modelValue"])):h("",!0),(l(!0),c(S,null,A(t(e).columns,(a,_)=>(l(),c("div",{key:a.key,class:x([t(H)[a.align],_==0?"text-gray-900":"text-gray-700"])},[f(i.$slots,"default",g(C({idx:_,column:a,item:s.row[a.key]})),()=>[t(e).slots.cell?(l(),m(j(t(e).slots.cell),g(k({key:0},{column:a,row:s.row,item:s.row[a.key],align:a.align})),null,16)):(l(),m(ie,{key:1,column:a,row:s.row,item:s.row[a.key],align:a.align},null,8,["column","row","item","align"]))])],2))),128))],6),r.value?h("",!0):(l(),c("div",ae))]),_:3}))]),_:3},16))}},ue={class:"h-full overflow-y-auto"},ce={__name:"ListRows",setup(s){const o=v("list");return(e,r)=>(l(),c("div",ue,[f(e.$slots,"default",{},()=>[(l(!0),c(S,null,A(t(o).rows,n=>(l(),m(E,{key:n[t(o).rowKey],row:n},null,8,["row"]))),128))])]))}},de={},me={xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 16 16"},fe=u("path",{fill:"currentColor",d:"M4.293 5.28h7.413a.5.5 0 0 1 .41.787l-3.707 5.295a.5.5 0 0 1-.82 0L3.884 6.067a.5.5 0 0 1 .41-.787Z"},null,-1),pe=[fe];function we(s,o){return l(),c("svg",me,pe)}const ge=P(de,[["render",we]]),ye={class:"flex items-center"},he={class:"w-full py-1.5 pr-2"},ve={key:1,class:"text-base font-medium leading-6"},be=u("div",{class:"mx-2 h-px border-t border-gray-200"},null,-1),xe={__name:"ListGroupHeader",props:{group:{type:Object,required:!0}},setup(s){const o=s,e=v("list");function r(){o.group.collapsed==null&&(o.group.collapsed=!1),o.group.collapsed=!o.group.collapsed}return(n,i)=>(l(),c(S,null,[u("div",ye,[u("button",{onClick:r,class:"ml-[3px] mr-[11px] rounded p-1 hover:bg-gray-100"},[R(ge,{class:x(["h-4 w-4 text-gray-900 transition-transform duration-200",[s.group.collapsed?"-rotate-90":""]])},null,8,["class"])]),u("div",he,[t(e).slots["group-header"]?(l(),m(j(t(e).slots["group-header"]),g(k({key:0},{group:s.group})),null,16)):(l(),c("span",ve,L(s.group.group),1))])]),be],64))}},_e={key:0,class:"mb-5 mt-2"},$e={__name:"ListGroupRows",props:{group:{type:Object,required:!0}},setup(s){const o=v("list");return(e,r)=>s.group.collapsed?h("",!0):(l(),c("div",_e,[(l(!0),c(S,null,A(s.group.rows,n=>(l(),m(E,{key:n[t(o).rowKey],row:n},null,8,["row"]))),128))]))}},Re={class:"h-full overflow-y-auto"},ke={__name:"ListGroups",setup(s){const o=v("list");return(e,r)=>(l(),c("div",Re,[(l(!0),c(S,null,A(t(o).rows,n=>(l(),c("div",{key:n.group},[R(xe,{group:n},{default:z(()=>[e.$slots["group-header"]?f(e.$slots,"group-header",g(k({key:0},{group:n}))):h("",!0)]),_:2},1032,["group"]),R($e,{group:n},null,8,["group"])]))),128))]))}},Ce={key:0,class:"absolute inset-x-0 bottom-6 mx-auto w-max text-base"},Se={class:"flex flex-1 justify-between border-r border-gray-300 text-gray-900"},je={class:"flex items-center space-x-3"},Le={class:"mr-3"},ze={class:"flex items-center space-x-1"},Ae=Object.assign({inheritAttrs:!1},{__name:"ListSelectBanner",setup(s){const o=v("list");let e=y(()=>{let r=o.value.selections.size===1?"Row":"Rows";return`${o.value.selections.size} ${r} selected`});return(r,n)=>(l(),m(I,{"enter-active-class":"duration-300 ease-out","enter-from-class":"transform opacity-0","enter-to-class":"opacity-100","leave-active-class":"duration-300 ease-in","leave-from-class":"opacity-100","leave-to-class":"transform opacity-0"},{default:z(()=>[t(o).selections.size?(l(),c("div",Ce,[u("div",{class:x(["flex min-w-[596px] items-center space-x-3 rounded-lg bg-white px-4 py-2 shadow-2xl",r.$attrs.class])},[f(r.$slots,"default",g(C({selections:t(o).selections,allRowsSelected:t(o).allRowsSelected,selectAll:()=>t(o).toggleAllRows(!0),unselectAll:()=>t(o).toggleAllRows(!1)})),()=>[u("div",Se,[u("div",je,[R(V,{modelValue:!0,disabled:!0,class:"text-gray-900"}),u("div",null,L(t(e)),1)]),u("div",Le,[f(r.$slots,"actions",g(C({selections:t(o).selections,allRowsSelected:t(o).allRowsSelected,selectAll:()=>t(o).toggleAllRows(!0),unselectAll:()=>t(o).toggleAllRows(!1)})))])]),u("div",ze,[R(K,{class:x(["w- text-gray-700",t(o).allRowsSelected?"cursor-not-allowed":""]),disabled:t(o).allRowsSelected,variant:"ghost",onClick:n[0]||(n[0]=i=>t(o).toggleAllRows(!0))},{default:z(()=>[F(" Select all ")]),_:1},8,["disabled","class"]),R(K,{icon:"x",variant:"ghost",onClick:n[1]||(n[1]=i=>t(o).toggleAllRows(!1))})])])],2)])):h("",!0)]),_:3}))}}),We={class:"relative flex w-full flex-1 flex-col overflow-x-auto"},Ke=Object.assign({inheritAttrs:!1},{__name:"ListView",props:{columns:{type:Array,default:[]},rows:{type:Array,default:[]},rowKey:{type:String,required:!0},options:{type:Object,default:()=>({getRowRoute:null,onRowClick:null,showTooltip:!0,selectable:!0,resizeColumn:!1,rowHeight:40,emptyState:{title:"No Data",description:"No data available"}})}},emits:["update:selections"],setup(s,{emit:o}){const e=s,r=X();let n=Q(new Set);const i=o;Z(n,d=>{i("update:selections",d)});let w=y(()=>{function d(b){return b===void 0?!0:b}function $(b){return b===void 0?!1:b}return{getRowRoute:e.options.getRowRoute||null,onRowClick:e.options.onRowClick||null,showTooltip:d(e.options.showTooltip),selectable:d(e.options.selectable),resizeColumn:$(e.options.resizeColumn),rowHeight:e.options.rowHeight||40,emptyState:e.options.emptyState}});const a=y(()=>e.rows.length?n.size===e.rows.length:!1),_=y(()=>w.value.selectable);let W=y(()=>e.rows.every(d=>d.group&&d.rows&&Array.isArray(d.rows)));function p(d){n.delete(d)||n.add(d)}function T(d){if(!d||a.value){n.clear();return}e.rows.forEach($=>n.add($[e.rowKey]))}return J("list",y(()=>({rowKey:e.rowKey,rows:e.rows,columns:e.columns,options:w.value,selections:n,allRowsSelected:a.value,slots:r,toggleRow:p,toggleAllRows:T}))),(d,$)=>(l(),c("div",We,[u("div",{class:x(["flex w-max min-w-full flex-col overflow-y-hidden",d.$attrs.class])},[f(d.$slots,"default",g(C({showGroupedRows:t(W),selectable:_.value})),()=>[R(ne),e.rows.length?(l(),c(S,{key:0},[t(W)?(l(),m(ke,{key:0})):(l(),m(ce,{key:1}))],64)):(l(),m(se,{key:1})),_.value?(l(),m(Ae,{key:2})):h("",!0)])],2)]))}});export{ne as _,ce as a,ie as b,E as c,Ae as d,Ke as e};
//# sourceMappingURL=ListView-59a15338.js.map
