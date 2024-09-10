import{l as f,aD as g,M as _,s as c,o as n,a as l,w as r,r as p,e as C,g as b,d as a,b as d,F as u,x as m,y as h,n as k}from"./index-fd4111d0.js";const v={name:"FontColor",props:["editor"],components:{Popover:g,Tooltip:_},methods:{setBackgroundColor(t){t.name!="Default"?this.editor.chain().focus().toggleHighlight({color:t.hex}).run():this.editor.chain().focus().unsetHighlight().run()},setForegroundColor(t){t.name!="Default"?this.editor.chain().focus().setColor(t.hex).run():this.editor.chain().focus().unsetColor().run()}},computed:{foregroundColors(){return[{name:"Default",hex:"#1F272E"},{name:"Yellow",hex:"#ca8a04"},{name:"Orange",hex:"#ea580c"},{name:"Red",hex:"#dc2626"},{name:"Green",hex:"#16a34a"},{name:"Blue",hex:"#1579D0"},{name:"Purple",hex:"#9333ea"},{name:"Pink",hex:"#db2777"}]},backgroundColors(){return[{name:"Default",hex:null},{name:"Yellow",hex:"#fef9c3"},{name:"Orange",hex:"#ffedd5"},{name:"Red",hex:"#fee2e2"},{name:"Green",hex:"#dcfce7"},{name:"Blue",hex:"#D3E9FC"},{name:"Purple",hex:"#f3e8ff"},{name:"Pink",hex:"#fce7f3"}]}}},y={class:"p-2"},B=a("div",{class:"text-sm text-gray-700"},"Text Color",-1),P={class:"mt-1 grid grid-cols-8 gap-1"},F=["aria-label","onClick"],D=a("div",{class:"mt-2 text-sm text-gray-700"},"Background Color",-1),w={class:"mt-1 grid grid-cols-8 gap-1"},T=["aria-label","onClick"];function $(t,z,A,E,R,o){const i=c("Tooltip"),x=c("Popover");return n(),l(x,{transition:"default"},{target:r(({togglePopover:e,isOpen:s})=>[p(t.$slots,"default",C(b({onClick:()=>e(),isActive:s})))]),"body-main":r(()=>[a("div",y,[B,a("div",P,[(n(!0),d(u,null,m(o.foregroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:"flex h-5 w-5 items-center justify-center rounded border text-base",style:h({color:e.hex}),onClick:s=>o.setForegroundColor(e)}," A ",12,F)]),_:2},1032,["text"]))),128))]),D,a("div",w,[(n(!0),d(u,null,m(o.backgroundColors,e=>(n(),l(i,{class:"flex",key:e.name,text:e.name},{default:r(()=>[a("button",{"aria-label":e.name,class:k(["flex h-5 w-5 items-center justify-center rounded border text-base text-gray-900",e.hex?"border-transparent":"border-gray-200"]),style:h({backgroundColor:e.hex}),onClick:s=>o.setBackgroundColor(e)}," A ",14,T)]),_:2},1032,["text"]))),128))])])]),_:3})}const G=f(v,[["render",$]]);export{G as default};
//# sourceMappingURL=FontColor-5c1357f9.js.map