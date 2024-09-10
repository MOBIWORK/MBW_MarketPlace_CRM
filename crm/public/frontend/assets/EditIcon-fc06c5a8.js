import{aj as U,G as h,c as $,bl as q,aq as a,dp as z,bi as D,al as oe,dq as be,dr as M,ds as Pe,dt as me,bg as Z,du as ge,dv as Se,dw as he,dx as ye,ar as I,am as W,F as J,an as G,H as ne,b5 as re,ap as we,dy as ue,as as V,au as K,bm as B,bn as F,dz as Ce,bh as Y,i as Q,ax as x,dA as _,bj as R,aU as $e,o as se,a as Ee,w as j,f as ee,u as A,r as te,e as le,g as ae,m as ke,d as ie,v as Fe,aG as _e,dl as Ie,l as xe,b as Be}from"./index-fd4111d0.js";var Ne=(u=>(u[u.Open=0]="Open",u[u.Closed=1]="Closed",u))(Ne||{});let pe=Symbol("PopoverContext");function X(u){let f=Q(pe,null);if(f===null){let b=new Error(`<${u} /> is missing a parent <${de.name} /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(b,X),b}return f}let Oe=Symbol("PopoverGroupContext");function ce(){return Q(Oe,null)}let ve=Symbol("PopoverPanelContext");function Te(){return Q(ve,null)}let de=U({name:"Popover",inheritAttrs:!1,props:{as:{type:[Object,String],default:"div"}},setup(u,{slots:f,attrs:b,expose:E}){var P;let m=h(null);E({el:m,$el:m});let l=h(1),e=h(null),w=h(null),g=h(null),c=h(null),v=$(()=>q(m)),y=$(()=>{var t,n;if(!a(e)||!a(c))return!1;for(let H of document.querySelectorAll("body > *"))if(Number(H==null?void 0:H.contains(a(e)))^Number(H==null?void 0:H.contains(a(c))))return!0;let o=z(),p=o.indexOf(a(e)),C=(p+o.length-1)%o.length,k=(p+1)%o.length,L=o[C],fe=o[k];return!((t=a(c))!=null&&t.contains(L))&&!((n=a(c))!=null&&n.contains(fe))}),d={popoverState:l,buttonId:h(null),panelId:h(null),panel:c,button:e,isPortalled:y,beforePanelSentinel:w,afterPanelSentinel:g,togglePopover(){l.value=D(l.value,{0:1,1:0})},closePopover(){l.value!==1&&(l.value=1)},close(t){d.closePopover();let n=(()=>t?t instanceof HTMLElement?t:t.value instanceof HTMLElement?a(t):a(d.button):a(d.button))();n==null||n.focus()}};oe(pe,d),be($(()=>D(l.value,{0:M.Open,1:M.Closed})));let N={buttonId:d.buttonId,panelId:d.panelId,close(){d.closePopover()}},S=ce(),O=S==null?void 0:S.registerPopover,[T,s]=Pe(),i=me({mainTreeNodeRef:S==null?void 0:S.mainTreeNodeRef,portals:T,defaultContainers:[e,c]});function r(){var t,n,o,p;return(p=S==null?void 0:S.isFocusWithinPopoverGroup())!=null?p:((t=v.value)==null?void 0:t.activeElement)&&(((n=a(e))==null?void 0:n.contains(v.value.activeElement))||((o=a(c))==null?void 0:o.contains(v.value.activeElement)))}return Z(()=>O==null?void 0:O(N)),ge((P=v.value)==null?void 0:P.defaultView,"focus",t=>{var n,o;t.target!==window&&t.target instanceof HTMLElement&&l.value===0&&(r()||e&&c&&(i.contains(t.target)||(n=a(d.beforePanelSentinel))!=null&&n.contains(t.target)||(o=a(d.afterPanelSentinel))!=null&&o.contains(t.target)||d.closePopover()))},!0),Se(i.resolveContainers,(t,n)=>{var o;d.closePopover(),he(n,ye.Loose)||(t.preventDefault(),(o=a(e))==null||o.focus())},$(()=>l.value===0)),()=>{let t={open:l.value===0,close:d.close};return I(J,[I(s,{},()=>W({theirProps:{...u,...b},ourProps:{ref:m},slot:t,slots:f,attrs:b,name:"Popover"})),I(i.MainTreeNode)])}}}),De=U({name:"PopoverButton",props:{as:{type:[Object,String],default:"button"},disabled:{type:[Boolean],default:!1},id:{type:String,default:null}},inheritAttrs:!1,setup(u,{attrs:f,slots:b,expose:E}){var P;let m=(P=u.id)!=null?P:`headlessui-popover-button-${G()}`,l=X("PopoverButton"),e=$(()=>q(l.button));E({el:l.button,$el:l.button}),ne(()=>{l.buttonId.value=m}),re(()=>{l.buttonId.value=null});let w=ce(),g=w==null?void 0:w.closeOthers,c=Te(),v=$(()=>c===null?!1:c.value===l.panelId.value),y=h(null),d=`headlessui-focus-sentinel-${G()}`;v.value||Z(()=>{l.button.value=a(y)});let N=we($(()=>({as:u.as,type:f.type})),y);function S(t){var n,o,p,C,k;if(v.value){if(l.popoverState.value===1)return;switch(t.key){case x.Space:case x.Enter:t.preventDefault(),(o=(n=t.target).click)==null||o.call(n),l.closePopover(),(p=a(l.button))==null||p.focus();break}}else switch(t.key){case x.Space:case x.Enter:t.preventDefault(),t.stopPropagation(),l.popoverState.value===1&&(g==null||g(l.buttonId.value)),l.togglePopover();break;case x.Escape:if(l.popoverState.value!==0)return g==null?void 0:g(l.buttonId.value);if(!a(l.button)||(C=e.value)!=null&&C.activeElement&&!((k=a(l.button))!=null&&k.contains(e.value.activeElement)))return;t.preventDefault(),t.stopPropagation(),l.closePopover();break}}function O(t){v.value||t.key===x.Space&&t.preventDefault()}function T(t){var n,o;u.disabled||(v.value?(l.closePopover(),(n=a(l.button))==null||n.focus()):(t.preventDefault(),t.stopPropagation(),l.popoverState.value===1&&(g==null||g(l.buttonId.value)),l.togglePopover(),(o=a(l.button))==null||o.focus()))}function s(t){t.preventDefault(),t.stopPropagation()}let i=ue();function r(){let t=a(l.panel);if(!t)return;function n(){D(i.value,{[_.Forwards]:()=>B(t,F.First),[_.Backwards]:()=>B(t,F.Last)})===R.Error&&B(z().filter(o=>o.dataset.headlessuiFocusGuard!=="true"),D(i.value,{[_.Forwards]:F.Next,[_.Backwards]:F.Previous}),{relativeTo:a(l.button)})}n()}return()=>{let t=l.popoverState.value===0,n={open:t},{...o}=u,p=v.value?{ref:y,type:N.value,onKeydown:S,onClick:T}:{ref:y,id:m,type:N.value,"aria-expanded":l.popoverState.value===0,"aria-controls":a(l.panel)?l.panelId.value:void 0,disabled:u.disabled?!0:void 0,onKeydown:S,onKeyup:O,onClick:T,onMousedown:s};return I(J,[W({ourProps:p,theirProps:{...f,...o},slot:n,attrs:f,slots:b,name:"PopoverButton"}),t&&!v.value&&l.isPortalled.value&&I(V,{id:d,features:K.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:r})])}}}),Ge=U({name:"PopoverPanel",props:{as:{type:[Object,String],default:"div"},static:{type:Boolean,default:!1},unmount:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},id:{type:String,default:null}},inheritAttrs:!1,setup(u,{attrs:f,slots:b,expose:E}){var P;let m=(P=u.id)!=null?P:`headlessui-popover-panel-${G()}`,{focus:l}=u,e=X("PopoverPanel"),w=$(()=>q(e.panel)),g=`headlessui-focus-sentinel-before-${G()}`,c=`headlessui-focus-sentinel-after-${G()}`;E({el:e.panel,$el:e.panel}),ne(()=>{e.panelId.value=m}),re(()=>{e.panelId.value=null}),oe(ve,e.panelId),Z(()=>{var s,i;if(!l||e.popoverState.value!==0||!e.panel)return;let r=(s=w.value)==null?void 0:s.activeElement;(i=a(e.panel))!=null&&i.contains(r)||B(a(e.panel),F.First)});let v=Ce(),y=$(()=>v!==null?(v.value&M.Open)===M.Open:e.popoverState.value===0);function d(s){var i,r;switch(s.key){case x.Escape:if(e.popoverState.value!==0||!a(e.panel)||w.value&&!((i=a(e.panel))!=null&&i.contains(w.value.activeElement)))return;s.preventDefault(),s.stopPropagation(),e.closePopover(),(r=a(e.button))==null||r.focus();break}}function N(s){var i,r,t,n,o;let p=s.relatedTarget;p&&a(e.panel)&&((i=a(e.panel))!=null&&i.contains(p)||(e.closePopover(),((t=(r=a(e.beforePanelSentinel))==null?void 0:r.contains)!=null&&t.call(r,p)||(o=(n=a(e.afterPanelSentinel))==null?void 0:n.contains)!=null&&o.call(n,p))&&p.focus({preventScroll:!0})))}let S=ue();function O(){let s=a(e.panel);if(!s)return;function i(){D(S.value,{[_.Forwards]:()=>{var r;B(s,F.First)===R.Error&&((r=a(e.afterPanelSentinel))==null||r.focus())},[_.Backwards]:()=>{var r;(r=a(e.button))==null||r.focus({preventScroll:!0})}})}i()}function T(){let s=a(e.panel);if(!s)return;function i(){D(S.value,{[_.Forwards]:()=>{let r=a(e.button),t=a(e.panel);if(!r)return;let n=z(),o=n.indexOf(r),p=n.slice(0,o+1),C=[...n.slice(o+1),...p];for(let k of C.slice())if(k.dataset.headlessuiFocusGuard==="true"||t!=null&&t.contains(k)){let L=C.indexOf(k);L!==-1&&C.splice(L,1)}B(C,F.First,{sorted:!1})},[_.Backwards]:()=>{var r;B(s,F.Previous)===R.Error&&((r=a(e.button))==null||r.focus())}})}i()}return()=>{let s={open:e.popoverState.value===0,close:e.close},{focus:i,...r}=u,t={ref:e.panel,id:m,onKeydown:d,onFocusout:l&&e.popoverState.value===0?N:void 0,tabIndex:-1};return W({ourProps:t,theirProps:{...f,...r},attrs:f,slot:s,slots:{...b,default:(...n)=>{var o;return[I(J,[y.value&&e.isPortalled.value&&I(V,{id:g,ref:e.beforePanelSentinel,features:K.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:O}),(o=b.default)==null?void 0:o.call(b,...n),y.value&&e.isPortalled.value&&I(V,{id:c,ref:e.afterPanelSentinel,features:K.Focusable,"data-headlessui-focus-guard":!0,as:"button",type:"button",onFocus:T})])]}},features:Y.RenderStrategy|Y.Static,visible:y.value,name:"PopoverPanel"})}}});const Ke={__name:"NestedPopover",props:{placement:{type:String,default:"bottom-start"}},setup(u){const f=u,b=h(null),E=h(null);let P=h(null);function m(){P.value?P.value.update():P.value=Ie(b.value.el,E.value.el,{placement:f.placement})}function l(){_e(()=>m())}return $e(()=>{var e;(e=P.value)==null||e.destroy()}),(e,w)=>(se(),Ee(A(de),null,{default:j(({open:g})=>[ee(A(De),{as:"div",ref_key:"reference",ref:b,onClick:l,onFocusin:l,onKeydown:l},{default:j(({open:c})=>[te(e.$slots,"target",le(ae({open:c})))]),_:2},1536),ke(ie("div",null,[ee(A(Ge),{ref_key:"popover",ref:E,static:"",class:"z-[100]"},{default:j(({open:c,close:v})=>[te(e.$slots,"body",le(ae({open:c,close:v})))]),_:2},1536)],512),[[Fe,g]])]),_:3}))}},Le={},He={width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},Me=ie("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M2.5 4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H8.5C8.77614 2.5 9 2.27614 9 2C9 1.72386 8.77614 1.5 8.5 1.5H4.5C2.84315 1.5 1.5 2.84315 1.5 4.5V11.5C1.5 13.1569 2.84315 14.5 4.5 14.5H11.5C13.1569 14.5 14.5 13.1569 14.5 11.5V7.5C14.5 7.22386 14.2761 7 14 7C13.7239 7 13.5 7.22386 13.5 7.5V11.5C13.5 12.6046 12.6046 13.5 11.5 13.5H4.5C3.39543 13.5 2.5 12.6046 2.5 11.5V4.5ZM14.1255 2.58446C14.3207 2.3892 14.3207 2.07261 14.1255 1.87735C13.9302 1.68209 13.6136 1.68209 13.4184 1.87735L6.68616 8.60954C6.4909 8.8048 6.4909 9.12139 6.68616 9.31665C6.88143 9.51191 7.19801 9.51191 7.39327 9.31665L14.1255 2.58446Z",fill:"currentColor"},null,-1),je=[Me];function Ae(u,f){return se(),Be("svg",He,je)}const Re=xe(Le,[["render",Ae]]);export{Re as E,Ke as _};
//# sourceMappingURL=EditIcon-fc06c5a8.js.map