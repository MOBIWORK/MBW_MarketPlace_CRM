import{bd as i,O as e,Q as s}from"./index-fd4111d0.js";const u=i("crm-organizations",()=>{let r=e({});const a=s({url:"crm.api.session.get_organizations",cache:"organizations",initialData:[],auto:!0,transform(o){for(let t of o)r[t.name]=t;return o},onError(o){o&&o.exc_type==="AuthenticationError"&&router.push("/login")}});function n(o){return r[o]}return{organizations:a,getOrganization:n}});export{u as o};
//# sourceMappingURL=organizations-47b1381a.js.map