import{_ as u,e as n,f as l,v as a,r,o as _,at as d,aw as m}from"./index-80088746.js";const k={},p={width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h=a("path",{d:"M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z",stroke:"currentColor","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),f=a("path",{d:"M8.00024 4.97693V8.00018L10.1666 10.1667",stroke:"currentColor","stroke-miterlimit":"10","stroke-linecap":"round","stroke-linejoin":"round"},null,-1),v=[h,f];function g(o,s){return n(),l("svg",p,v)}const x=u(k,[["render",g]]),y={__name:"FadedScrollableDiv",props:{maskHeight:{type:Number,default:20}},setup(o){const s=o,e=r(null),t=r("none");function c(){e.value.scrollHeight>e.value.clientHeight?t.value=`linear-gradient(to bottom, black calc(100% - ${s.maskHeight}px), transparent 100%);`:t.value="none"}return _(()=>c()),(i,w)=>(n(),l("div",{ref_key:"scrollableDiv",ref:e,class:"scrr",style:m(`maskImage: ${t.value}`)},[d(i.$slots,"default")],4))}};export{x as D,y as _};
//# sourceMappingURL=FadedScrollableDiv-c4fc23e4.js.map