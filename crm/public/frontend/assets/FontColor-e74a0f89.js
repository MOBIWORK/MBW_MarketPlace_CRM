import{_,ay as g,t as p,d,e as n,l,i as r,at as C,au as k,av as b,v as a,x as c,f as u,F as m,k as h,aw as f,n as v}from"./index-71957d41.js";const y={name:"FontColor",props:["editor"],components:{Popover:g,Tooltip:p},methods:{setBackgroundColor(t){t.name!="Default"?this.editor.chain().focus().toggleHighlight({color:t.hex}).run():this.editor.chain().focus().unsetHighlight().run()},setForegroundColor(t){t.name!="Default"?this.editor.chain().focus().setColor(t.hex).run():this.editor.chain().focus().unsetColor().run()}},computed:{foregroundColors(){return[{name:"Default",hex:"#1F272E"},{name:"Yellow",hex:"#ca8a04"},{name:"Orange",hex:"#ea580c"},{name:"Red",hex:"#dc2626"},{name:"Green",hex:"#16a34a"},{name:"Blue",hex:"#1579D0"},{name:"Purple",hex:"#9333ea"},{name:"Pink",hex:"#db2777"}]},backgroundColors(){return[{name:"Default",hex:null},{name:"Yellow",hex:"#fef9c3"},{name:"Orange",hex:"#ffedd5"},{name:"Red",hex:"#fee2e2"},{name:"Green",hex:"#dcfce7"},{name:"Blue",hex:"#D3E9FC"},{name:"Purple",hex:"#f3e8ff"},{name:"Pink",hex:"#fce7f3"}]}}},B={class:"p-2"},P={class:"text-sm text-gray-700"},F={class:"mt-1 grid grid-cols-8 gap-1"},D=["aria-label","onClick"],w={class:"mt-2 text-sm text-gray-700"},T={class:"mt-1 grid grid-cols-8 gap-1"},$=["aria-label","onClick"];function z(t,A,E,R,S,o){const i=d("Tooltip"),x=d("Popover");return n(),l(x,{transition:"default"},{target:r(({togglePopover:e,isOpen:s})=>[C(t.$slots,"default",k(b({onClick:()=>e(),isActive:s})))]),"body-main":r(()=>[a("div",B,[a("div",P,c(t.__("Text Color")),1),a("div",F,[(n(!0),u(m,null,h(o.foregroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:"flex h-5 w-5 items-center justify-center rounded border text-base",style:f({color:e.hex}),onClick:s=>o.setForegroundColor(e)}," A ",12,D)]),_:2},1032,["text"]))),128))]),a("div",w,c(t.__("Background Color")),1),a("div",T,[(n(!0),u(m,null,h(o.backgroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:v(["flex h-5 w-5 items-center justify-center rounded border text-base text-gray-900",e.hex?"border-transparent":"border-gray-200"]),style:f({backgroundColor:e.hex}),onClick:s=>o.setBackgroundColor(e)}," A ",14,$)]),_:2},1032,["text"]))),128))])])]),_:3})}const G=_(y,[["render",z]]);export{G as default};
//# sourceMappingURL=FontColor-e74a0f89.js.map
