import{A as $,e as m,f as y,l as x,i as S,v as b,h as p,j as d,p as k,x as D,t as B,F as L,k as A,n as M,q as R,b9 as w,z as C,aL as h,ai as I}from"./index-feedfb27.js";import{I as V}from"./IndicatorIcon-7971ae80.js";const _={class:"flex items-center gap-2 text-base"},F={class:"truncate"},E={__name:"MultipleAvatar",props:{avatars:{type:Array,default:[]},size:{type:String,default:"md"}},setup(a){const i=a,f=$(()=>i.avatars.reverse());return(g,v)=>{var o,r,l;return(o=a.avatars)!=null&&o.length?(m(),y("div",{key:0,class:M(["mr-1.5 flex cursor-pointer items-center",[((r=a.avatars)==null?void 0:r.length)>1?"flex-row-reverse":"truncate [&>div]:truncate"]])},[((l=a.avatars)==null?void 0:l.length)==1?(m(),x(d(B),{key:0,text:a.avatars[0].name},{default:S(()=>[b("div",_,[p(d(k),{shape:"circle",image:a.avatars[0].image,label:a.avatars[0].label,size:"sm"},null,8,["image","label"]),b("div",F,D(a.avatars[0].label),1)])]),_:1},8,["text"])):(m(!0),y(L,{key:1},A(f.value,n=>(m(),x(d(B),{text:n.name,key:n.name},{default:S(()=>[p(d(k),{class:"user-avatar -mr-1.5 transform ring-2 ring-white transition hover:z-10 hover:scale-110",shape:"circle",image:n.image,label:n.label,size:a.size,"data-name":n.name},null,8,["image","label","size","data-name"])]),_:2},1032,["text"]))),128))],2)):R("",!0)}}},O=w("crm-statuses",()=>{let a=C({}),i=C({}),f=C({});const g=h({doctype:"CRM Lead Status",fields:["name","color","position"],orderBy:"position asc",cache:"lead-statuses",initialData:[],auto:!0,transform(e){for(let t of e)t.colorClass=r(t.color),t.iconColorClass=r(t.color,!0),a[t.name]=t;return e}}),v=h({doctype:"CRM Deal Status",fields:["name","color","position"],orderBy:"position asc",cache:"deal-statuses",initialData:[],auto:!0,transform(e){for(let t of e)t.colorClass=r(t.color),t.iconColorClass=r(t.color,!0),i[t.name]=t;return e}}),o=h({doctype:"CRM Communication Status",fields:["name"],cache:"communication-statuses",initialData:[],auto:!0,transform(e){for(let t of e)f[t.name]=t;return e}});function r(e,t=!1){let s=`!text-${e}-600`;e=="black"?s="!text-gray-900":["gray","green"].includes(e)&&(s=`!text-${e}-700`);let c=`!bg-${e}-100 hover:!bg-${e}-200 active:!bg-${e}-300`;return[s,t?"":c]}function l(e){return e||(e=g.data[0].name),a[e]}function n(e){return e||(e=v.data[0].name),i[e]}function z(e){return e||(e=o.data[0].name),o[e]}function N(e,t){let s=e=="deal"?i:a,c=[];for(const u in s)c.push({label:__(s[u].name),value:s[u].name,icon:()=>I(V,{class:s[u].iconColorClass}),onClick:()=>{t&&t("status",s[u].name)}});return c}return{leadStatuses:g,dealStatuses:v,communicationStatuses:o,getLeadStatus:l,getDealStatus:n,getCommunicationStatus:z,statusOptions:N}});export{E as _,O as s};
//# sourceMappingURL=statuses-57928c1d.js.map