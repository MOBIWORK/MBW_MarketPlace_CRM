import{r as g,ac as h,A as j,aa as L,ae as S,o as k,be as y,j as C,ad as E,af as O}from"./index-d53336e9.js";let i=Symbol("LabelContext");function p(){let t=O(i,null);if(t===null){let a=new Error("You used a <Label /> component, but it is not inside a parent.");throw Error.captureStackTrace&&Error.captureStackTrace(a,p),a}return t}function w({slot:t={},name:a="Label",props:o={}}={}){let e=g([]);function r(l){return e.value.push(l),()=>{let n=e.value.indexOf(l);n!==-1&&e.value.splice(n,1)}}return h(i,{register:r,slot:t,name:a,props:o}),j(()=>e.value.length>0?e.value.join(" "):void 0)}let A=L({name:"Label",props:{as:{type:[Object,String],default:"label"},passive:{type:[Boolean],default:!1},id:{type:String,default:null}},setup(t,{slots:a,attrs:o}){var e;let r=(e=t.id)!=null?e:`headlessui-label-${S()}`,l=p();return k(()=>y(l.register(r))),()=>{let{name:n="Label",slot:d={},props:c={}}=l,{passive:f,...u}=t,s={...Object.entries(c).reduce((b,[m,v])=>Object.assign(b,{[m]:C(v)}),{}),id:r};return f&&(delete s.onClick,delete s.htmlFor,delete u.onClick),E({ourProps:s,theirProps:u,slot:d,attrs:o,slots:a,name:n})}}});export{w as E,A as K};
//# sourceMappingURL=label-d6f4dae7.js.map