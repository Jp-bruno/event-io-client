var ut=e=>{throw TypeError(e)};var $=(e,t,i)=>t.has(e)||ut("Cannot "+i);var s=(e,t,i)=>($(e,t,"read from private field"),i?i.call(e):t.get(e)),f=(e,t,i)=>t.has(e)?ut("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),c=(e,t,i,r)=>($(e,t,"write to private field"),r?r.call(e,i):t.set(e,i),i),l=(e,t,i)=>($(e,t,"access private method"),i);import{S as Ot,z as lt,A as E,C as G,D as K,E as It,H as X,I as dt,J as xt,K as Qt,M as Tt,N as ft,Q as Rt,r as x,q as wt,p as yt,j as Ct}from"./index-BlvmEKfA.js";var m,a,V,g,w,P,Q,S,N,_,L,F,M,T,j,h,B,Y,Z,tt,et,st,it,rt,St,mt,Ft=(mt=class extends Ot{constructor(t,i){super();f(this,h);f(this,m);f(this,a);f(this,V);f(this,g);f(this,w);f(this,P);f(this,Q);f(this,S);f(this,N);f(this,_);f(this,L);f(this,F);f(this,M);f(this,T);f(this,j,new Set);this.options=i,c(this,m,t),c(this,S,null),c(this,Q,lt()),this.options.experimental_prefetchInRender||s(this,Q).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(i)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(s(this,a).addObserver(this),pt(s(this,a),this.options)?l(this,h,B).call(this):this.updateResult(),l(this,h,et).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return at(s(this,a),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return at(s(this,a),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,l(this,h,st).call(this),l(this,h,it).call(this),s(this,a).removeObserver(this)}setOptions(t,i){const r=this.options,d=s(this,a);if(this.options=s(this,m).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof E(this.options.enabled,s(this,a))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");l(this,h,rt).call(this),s(this,a).setOptions(this.options),r._defaulted&&!G(this.options,r)&&s(this,m).getQueryCache().notify({type:"observerOptionsUpdated",query:s(this,a),observer:this});const u=this.hasListeners();u&&bt(s(this,a),d,this.options,r)&&l(this,h,B).call(this),this.updateResult(i),u&&(s(this,a)!==d||E(this.options.enabled,s(this,a))!==E(r.enabled,s(this,a))||K(this.options.staleTime,s(this,a))!==K(r.staleTime,s(this,a)))&&l(this,h,Y).call(this);const n=l(this,h,Z).call(this);u&&(s(this,a)!==d||E(this.options.enabled,s(this,a))!==E(r.enabled,s(this,a))||n!==s(this,T))&&l(this,h,tt).call(this,n)}getOptimisticResult(t){const i=s(this,m).getQueryCache().build(s(this,m),t),r=this.createResult(i,t);return Dt(this,r)&&(c(this,g,r),c(this,P,this.options),c(this,w,s(this,a).state)),r}getCurrentResult(){return s(this,g)}trackResult(t,i){const r={};return Object.keys(t).forEach(d=>{Object.defineProperty(r,d,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(d),i==null||i(d),t[d])})}),r}trackProp(t){s(this,j).add(t)}getCurrentQuery(){return s(this,a)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const i=s(this,m).defaultQueryOptions(t),r=s(this,m).getQueryCache().build(s(this,m),i);return r.fetch().then(()=>this.createResult(r,i))}fetch(t){return l(this,h,B).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),s(this,g)))}createResult(t,i){var ct;const r=s(this,a),d=this.options,u=s(this,g),n=s(this,w),O=s(this,P),y=t!==r?t.state:s(this,V),{state:I}=t;let o={...I},H=!1,b;if(i._optimisticResults){const v=this.hasListeners(),D=!v&&pt(t,i),U=v&&bt(t,r,i,d);(D||U)&&(o={...o,...Tt(I.data,t.options)}),i._optimisticResults==="isRestoring"&&(o.fetchStatus="idle")}let{error:k,errorUpdatedAt:z,status:R}=o;if(i.select&&o.data!==void 0)if(u&&o.data===(n==null?void 0:n.data)&&i.select===s(this,N))b=s(this,_);else try{c(this,N,i.select),b=i.select(o.data),b=ft(u==null?void 0:u.data,b,i),c(this,_,b),c(this,S,null)}catch(v){c(this,S,v)}else b=o.data;if(i.placeholderData!==void 0&&b===void 0&&R==="pending"){let v;if(u!=null&&u.isPlaceholderData&&i.placeholderData===(O==null?void 0:O.placeholderData))v=u.data;else if(v=typeof i.placeholderData=="function"?i.placeholderData((ct=s(this,L))==null?void 0:ct.state.data,s(this,L)):i.placeholderData,i.select&&v!==void 0)try{v=i.select(v),c(this,S,null)}catch(D){c(this,S,D)}v!==void 0&&(R="success",b=ft(u==null?void 0:u.data,v,i),H=!0)}s(this,S)&&(k=s(this,S),b=s(this,_),z=Date.now(),R="error");const A=o.fetchStatus==="fetching",q=R==="pending",J=R==="error",ht=q&&A,ot=b!==void 0,C={status:R,fetchStatus:o.fetchStatus,isPending:q,isSuccess:R==="success",isError:J,isInitialLoading:ht,isLoading:ht,data:b,dataUpdatedAt:o.dataUpdatedAt,error:k,errorUpdatedAt:z,failureCount:o.fetchFailureCount,failureReason:o.fetchFailureReason,errorUpdateCount:o.errorUpdateCount,isFetched:o.dataUpdateCount>0||o.errorUpdateCount>0,isFetchedAfterMount:o.dataUpdateCount>y.dataUpdateCount||o.errorUpdateCount>y.errorUpdateCount,isFetching:A,isRefetching:A&&!q,isLoadingError:J&&!ot,isPaused:o.fetchStatus==="paused",isPlaceholderData:H,isRefetchError:J&&ot,isStale:nt(t,i),refetch:this.refetch,promise:s(this,Q)};if(this.options.experimental_prefetchInRender){const v=W=>{C.status==="error"?W.reject(C.error):C.data!==void 0&&W.resolve(C.data)},D=()=>{const W=c(this,Q,C.promise=lt());v(W)},U=s(this,Q);switch(U.status){case"pending":t.queryHash===r.queryHash&&v(U);break;case"fulfilled":(C.status==="error"||C.data!==U.value)&&D();break;case"rejected":(C.status!=="error"||C.error!==U.reason)&&D();break}}return C}updateResult(t){const i=s(this,g),r=this.createResult(s(this,a),this.options);if(c(this,w,s(this,a).state),c(this,P,this.options),s(this,w).data!==void 0&&c(this,L,s(this,a)),G(r,i))return;c(this,g,r);const d={},u=()=>{if(!i)return!0;const{notifyOnChangeProps:n}=this.options,O=typeof n=="function"?n():n;if(O==="all"||!O&&!s(this,j).size)return!0;const p=new Set(O??s(this,j));return this.options.throwOnError&&p.add("error"),Object.keys(s(this,g)).some(y=>{const I=y;return s(this,g)[I]!==i[I]&&p.has(I)})};(t==null?void 0:t.listeners)!==!1&&u()&&(d.listeners=!0),l(this,h,St).call(this,{...d,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&l(this,h,et).call(this)}},m=new WeakMap,a=new WeakMap,V=new WeakMap,g=new WeakMap,w=new WeakMap,P=new WeakMap,Q=new WeakMap,S=new WeakMap,N=new WeakMap,_=new WeakMap,L=new WeakMap,F=new WeakMap,M=new WeakMap,T=new WeakMap,j=new WeakMap,h=new WeakSet,B=function(t){l(this,h,rt).call(this);let i=s(this,a).fetch(this.options,t);return t!=null&&t.throwOnError||(i=i.catch(It)),i},Y=function(){l(this,h,st).call(this);const t=K(this.options.staleTime,s(this,a));if(X||s(this,g).isStale||!dt(t))return;const r=xt(s(this,g).dataUpdatedAt,t)+1;c(this,F,setTimeout(()=>{s(this,g).isStale||this.updateResult()},r))},Z=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(s(this,a)):this.options.refetchInterval)??!1},tt=function(t){l(this,h,it).call(this),c(this,T,t),!(X||E(this.options.enabled,s(this,a))===!1||!dt(s(this,T))||s(this,T)===0)&&c(this,M,setInterval(()=>{(this.options.refetchIntervalInBackground||Qt.isFocused())&&l(this,h,B).call(this)},s(this,T)))},et=function(){l(this,h,Y).call(this),l(this,h,tt).call(this,l(this,h,Z).call(this))},st=function(){s(this,F)&&(clearTimeout(s(this,F)),c(this,F,void 0))},it=function(){s(this,M)&&(clearInterval(s(this,M)),c(this,M,void 0))},rt=function(){const t=s(this,m).getQueryCache().build(s(this,m),this.options);if(t===s(this,a))return;const i=s(this,a);c(this,a,t),c(this,V,t.state),this.hasListeners()&&(i==null||i.removeObserver(this),t.addObserver(this))},St=function(t){Rt.batch(()=>{t.listeners&&this.listeners.forEach(i=>{i(s(this,g))}),s(this,m).getQueryCache().notify({query:s(this,a),type:"observerResultsUpdated"})})},mt);function Mt(e,t){return E(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function pt(e,t){return Mt(e,t)||e.state.data!==void 0&&at(e,t,t.refetchOnMount)}function at(e,t,i){if(E(t.enabled,e)!==!1){const r=typeof i=="function"?i(e):i;return r==="always"||r!==!1&&nt(e,t)}return!1}function bt(e,t,i,r){return(e!==t||E(r.enabled,e)===!1)&&(!i.suspense||e.state.status!=="error")&&nt(e,i)}function nt(e,t){return E(t.enabled,e)!==!1&&e.isStaleByTime(K(t.staleTime,e))}function Dt(e,t){return!G(e.getCurrentResult(),t)}var Et=x.createContext(!1),Ut=()=>x.useContext(Et);Et.Provider;function Pt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var _t=x.createContext(Pt()),Lt=()=>x.useContext(_t);function jt(e,t){return typeof e=="function"?e(...t):!!e}function vt(){}var Ht=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&(t.isReset()||(e.retryOnMount=!1))},kt=e=>{x.useEffect(()=>{e.clearReset()},[e])},zt=({result:e,errorResetBoundary:t,throwOnError:i,query:r,suspense:d})=>e.isError&&!t.isReset()&&!e.isFetching&&r&&(d&&e.data===void 0||jt(i,[e.error,r])),At=e=>{const t=e.staleTime;e.suspense&&(e.staleTime=typeof t=="function"?(...i)=>Math.max(t(...i),1e3):Math.max(t??1e3,1e3),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3)))},Bt=(e,t)=>e.isLoading&&e.isFetching&&!t,Vt=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,gt=(e,t,i)=>t.fetchOptimistic(e).catch(()=>{i.clearReset()});function Nt(e,t,i){var o,H,b,k,z;const r=wt(),d=Ut(),u=Lt(),n=r.defaultQueryOptions(e);(H=(o=r.getDefaultOptions().queries)==null?void 0:o._experimental_beforeQuery)==null||H.call(o,n),n._optimisticResults=d?"isRestoring":"optimistic",At(n),Ht(n,u),kt(u);const O=!r.getQueryCache().get(n.queryHash),[p]=x.useState(()=>new t(r,n)),y=p.getOptimisticResult(n),I=!d&&e.subscribed!==!1;if(x.useSyncExternalStore(x.useCallback(R=>{const A=I?p.subscribe(Rt.batchCalls(R)):vt;return p.updateResult(),A},[p,I]),()=>p.getCurrentResult(),()=>p.getCurrentResult()),x.useEffect(()=>{p.setOptions(n,{listeners:!1})},[n,p]),Vt(n,y))throw gt(n,p,u);if(zt({result:y,errorResetBoundary:u,throwOnError:n.throwOnError,query:r.getQueryCache().get(n.queryHash),suspense:n.suspense}))throw y.error;if((k=(b=r.getDefaultOptions().queries)==null?void 0:b._experimental_afterQuery)==null||k.call(b,n,y),n.experimental_prefetchInRender&&!X&&Bt(y,d)){const R=O?gt(n,p,u):(z=r.getQueryCache().get(n.queryHash))==null?void 0:z.promise;R==null||R.catch(vt).finally(()=>{p.updateResult()})}return n.notifyOnChangeProps?y:p.trackResult(y)}function Jt(e,t){return Nt(e,Ft)}const $t=yt(Ct.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5"}),"Place"),Gt=yt(Ct.jsx("path",{d:"M17 12h-5v5h5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1zm3 18H5V8h14z"}),"Event");export{Gt as E,$t as P,Jt as u};
