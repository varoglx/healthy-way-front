"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2415],{2415:(st,M,l)=>{l.r(M),l.d(M,{ion_toast:()=>B});var k=l(467),r=l(5539),O=l(464),g=l(4920),H=l(7838),w=l(4929),c=l(2478),S=l(333),v=l(3635),m=l(9986),I=l(8476),W=l(8607);l(7567),l(1970);const E=(t,e)=>Math.floor(t/2-e/2),z=(t,e)=>{const n=(0,m.c)(),o=(0,m.c)(),{position:i,top:s,bottom:d}=e,a=(0,g.g)(t).querySelector(".toast-wrapper");switch(o.addElement(a),i){case"top":o.fromTo("transform","translateY(-100%)",`translateY(${s})`);break;case"middle":const u=E(t.clientHeight,a.clientHeight);a.style.top=`${u}px`,o.fromTo("opacity",.01,1);break;default:o.fromTo("transform","translateY(100%)",`translateY(${d})`)}return n.easing("cubic-bezier(.155,1.105,.295,1.12)").duration(400).addAnimation(o)},K=(t,e)=>{const n=(0,m.c)(),o=(0,m.c)(),{position:i,top:s,bottom:d}=e,a=(0,g.g)(t).querySelector(".toast-wrapper");switch(o.addElement(a),i){case"top":o.fromTo("transform",`translateY(${s})`,"translateY(-100%)");break;case"middle":o.fromTo("opacity",.99,0);break;default:o.fromTo("transform",`translateY(${d})`,"translateY(100%)")}return n.easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(o)},U=(t,e)=>{const n=(0,m.c)(),o=(0,m.c)(),{position:i,top:s,bottom:d}=e,a=(0,g.g)(t).querySelector(".toast-wrapper");switch(o.addElement(a),i){case"top":a.style.setProperty("transform",`translateY(${s})`),o.fromTo("opacity",.01,1);break;case"middle":const u=E(t.clientHeight,a.clientHeight);a.style.top=`${u}px`,o.fromTo("opacity",.01,1);break;default:a.style.setProperty("transform",`translateY(${d})`),o.fromTo("opacity",.01,1)}return n.easing("cubic-bezier(.36,.66,.04,1)").duration(400).addAnimation(o)},F=t=>{const e=(0,m.c)(),n=(0,m.c)(),i=(0,g.g)(t).querySelector(".toast-wrapper");return n.addElement(i).fromTo("opacity",.99,0),e.easing("cubic-bezier(.36,.66,.04,1)").duration(300).addAnimation(n)},B=class{constructor(t){(0,r.r)(this,t),this.didPresent=(0,r.d)(this,"ionToastDidPresent",7),this.willPresent=(0,r.d)(this,"ionToastWillPresent",7),this.willDismiss=(0,r.d)(this,"ionToastWillDismiss",7),this.didDismiss=(0,r.d)(this,"ionToastDidDismiss",7),this.didPresentShorthand=(0,r.d)(this,"didPresent",7),this.willPresentShorthand=(0,r.d)(this,"willPresent",7),this.willDismissShorthand=(0,r.d)(this,"willDismiss",7),this.didDismissShorthand=(0,r.d)(this,"didDismiss",7),this.delegateController=(0,c.d)(this),this.lockController=(0,H.c)(),this.triggerController=(0,c.e)(),this.customHTMLEnabled=v.c.get("innerHTMLTemplatesEnabled",O.E),this.presented=!1,this.dispatchCancelHandler=e=>{if((0,c.i)(e.detail.role)){const o=this.getButtons().find(i=>"cancel"===i.role);this.callButtonHandler(o)}},this.createSwipeGesture=e=>{(this.gesture=((t,e,n)=>{const o=(0,g.g)(t).querySelector(".toast-wrapper"),i=t.clientHeight,s=o.getBoundingClientRect();let d=0;const a="middle"===t.position?.5:0,u="top"===t.position?-1:1,f=E(i,s.height),L=[{offset:0,transform:`translateY(-${f+s.height}px)`},{offset:.5,transform:"translateY(0px)"},{offset:1,transform:`translateY(${f+s.height}px)`}],p=(0,m.c)("toast-swipe-to-dismiss-animation").addElement(o).duration(100);switch(t.position){case"middle":d=i+s.height,p.keyframes(L),p.progressStart(!0,.5);break;case"top":d=s.bottom,p.keyframes([{offset:0,transform:`translateY(${e.top})`},{offset:1,transform:"translateY(-100%)"}]),p.progressStart(!0,0);break;default:d=i-s.top,p.keyframes([{offset:0,transform:`translateY(${e.bottom})`},{offset:1,transform:"translateY(100%)"}]),p.progressStart(!0,0)}const R=b=>b*u/d,T=(0,W.createGesture)({el:o,gestureName:"toast-swipe-to-dismiss",gesturePriority:c.O,direction:"y",onMove:b=>{const _=a+R(b.deltaY);p.progressStep(_)},onEnd:b=>{const _=b.velocityY,C=(b.deltaY+1e3*_)/d*u;T.enable(!1);let x=!0,D=1,y=0,P=0;if("middle"===t.position){x=C>=.25||C<=-.25,D=1,y=0;const A=o.getBoundingClientRect(),Y=A.top-f,$=(f+A.height)*(b.deltaY<=0?-1:1);p.keyframes([{offset:0,transform:`translateY(${Y}px)`},{offset:1,transform:`translateY(${x?`${$}px`:"0px"})`}]),P=$-Y}else x=C>=.5,D=x?1:0,y=R(b.deltaY),P=(x?1-y:y)*d;const tt=Math.min(Math.abs(P)/Math.abs(_),200);p.onFinish(()=>{x?(n(),p.destroy()):("middle"===t.position?p.keyframes(L).progressStart(!0,.5):p.progressStart(!0,0),T.enable(!0))},{oneTimeCallback:!0}).progressEnd(D,y,tt)}});return T})(this.el,e,()=>{this.dismiss(void 0,c.G)})).enable(!0)},this.destroySwipeGesture=()=>{const{gesture:e}=this;void 0!==e&&(e.destroy(),this.gesture=void 0)},this.prefersSwipeGesture=()=>{const{swipeGesture:e}=this;return"vertical"===e},this.revealContentToScreenReader=!1,this.overlayIndex=void 0,this.delegate=void 0,this.hasController=!1,this.color=void 0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.cssClass=void 0,this.duration=v.c.getNumber("toastDuration",0),this.header=void 0,this.layout="baseline",this.message=void 0,this.keyboardClose=!1,this.position="bottom",this.positionAnchor=void 0,this.buttons=void 0,this.translucent=!1,this.animated=!0,this.icon=void 0,this.htmlAttributes=void 0,this.swipeGesture=void 0,this.isOpen=!1,this.trigger=void 0}swipeGestureChanged(){this.destroySwipeGesture(),this.presented&&this.prefersSwipeGesture()&&this.createSwipeGesture(this.lastPresentedPosition)}onIsOpenChange(t,e){!0===t&&!1===e?this.present():!1===t&&!0===e&&this.dismiss()}triggerChanged(){const{trigger:t,el:e,triggerController:n}=this;t&&n.addClickListener(e,t)}connectedCallback(){(0,c.j)(this.el),this.triggerChanged()}disconnectedCallback(){this.triggerController.removeClickListener()}componentWillLoad(){(0,c.k)(this.el)}componentDidLoad(){!0===this.isOpen&&(0,g.r)(()=>this.present()),this.triggerChanged()}present(){var t=this;return(0,k.A)(function*(){const e=yield t.lockController.lock();yield t.delegateController.attachViewToDom();const{el:n,position:o}=t,s=function j(t,e,n,o){let i;if(i="md"===n?"top"===t?8:-8:"top"===t?10:-10,e&&I.w){!function G(t,e){null===t.offsetParent&&(0,w.p)("The positionAnchor element for ion-toast was found in the DOM, but appears to be hidden. This may lead to unexpected positioning of the toast.",e)}(e,o);const s=e.getBoundingClientRect();return"top"===t?i+=s.bottom:"bottom"===t&&(i-=I.w.innerHeight-s.top),{top:`${i}px`,bottom:`${i}px`}}return{top:`calc(${i}px + var(--ion-safe-area-top, 0px))`,bottom:`calc(${i}px - var(--ion-safe-area-bottom, 0px))`}}(o,t.getAnchorElement(),(0,v.b)(t),n);t.lastPresentedPosition=s,yield(0,c.f)(t,"toastEnter",z,U,{position:o,top:s.top,bottom:s.bottom}),t.revealContentToScreenReader=!0,t.duration>0&&(t.durationTimeout=setTimeout(()=>t.dismiss(void 0,"timeout"),t.duration)),t.prefersSwipeGesture()&&t.createSwipeGesture(s),e()})()}dismiss(t,e){var n=this;return(0,k.A)(function*(){var o,i;const s=yield n.lockController.lock(),{durationTimeout:d,position:h,lastPresentedPosition:a}=n;d&&clearTimeout(d);const u=yield(0,c.g)(n,t,e,"toastLeave",K,F,{position:h,top:null!==(o=null==a?void 0:a.top)&&void 0!==o?o:"",bottom:null!==(i=null==a?void 0:a.bottom)&&void 0!==i?i:""});return u&&(n.delegateController.removeViewFromDom(),n.revealContentToScreenReader=!1),n.lastPresentedPosition=void 0,n.destroySwipeGesture(),s(),u})()}onDidDismiss(){return(0,c.h)(this.el,"ionToastDidDismiss")}onWillDismiss(){return(0,c.h)(this.el,"ionToastWillDismiss")}getButtons(){return this.buttons?this.buttons.map(e=>"string"==typeof e?{text:e}:e):[]}getAnchorElement(){const{position:t,positionAnchor:e,el:n}=this;if(void 0!==e){if("middle"===t&&void 0!==e)return void(0,w.p)('The positionAnchor property is ignored when using position="middle".',this.el);if("string"==typeof e){const o=document.getElementById(e);return null===o?void(0,w.p)(`An anchor element with an ID of "${e}" was not found in the DOM.`,n):o}if(e instanceof HTMLElement)return e;(0,w.p)("Invalid positionAnchor value:",e,n)}}buttonClick(t){var e=this;return(0,k.A)(function*(){const n=t.role;return(0,c.i)(n)||(yield e.callButtonHandler(t))?e.dismiss(void 0,n):Promise.resolve()})()}callButtonHandler(t){return(0,k.A)(function*(){if(null!=t&&t.handler)try{if(!1===(yield(0,c.s)(t.handler)))return!1}catch(e){console.error(e)}return!0})()}renderButtons(t,e){if(0===t.length)return;const n=(0,v.b)(this);return(0,r.h)("div",{class:{"toast-button-group":!0,[`toast-button-group-${e}`]:!0}},t.map(i=>(0,r.h)("button",Object.assign({},i.htmlAttributes,{type:"button",class:J(i),tabIndex:0,onClick:()=>this.buttonClick(i),part:Q(i)}),(0,r.h)("div",{class:"toast-button-inner"},i.icon&&(0,r.h)("ion-icon",{"aria-hidden":"true",icon:i.icon,slot:void 0===i.text?"icon-only":void 0,class:"toast-button-icon"}),i.text),"md"===n&&(0,r.h)("ion-ripple-effect",{type:void 0!==i.icon&&void 0===i.text?"unbounded":"bounded"}))))}renderToastMessage(t,e=null){const{customHTMLEnabled:n,message:o}=this;return n?(0,r.h)("div",{key:t,"aria-hidden":e,class:"toast-message",part:"message",innerHTML:(0,O.a)(o)}):(0,r.h)("div",{key:t,"aria-hidden":e,class:"toast-message",part:"message"},o)}renderHeader(t,e=null){return(0,r.h)("div",{key:t,class:"toast-header","aria-hidden":e,part:"header"},this.header)}render(){const{layout:t,el:e,revealContentToScreenReader:n,header:o,message:i}=this,s=this.getButtons(),d=s.filter(f=>"start"===f.side),h=s.filter(f=>"start"!==f.side),a=(0,v.b)(this),u={"toast-wrapper":!0,[`toast-${this.position}`]:!0,[`toast-layout-${t}`]:!0};return"stacked"===t&&d.length>0&&h.length>0&&(0,w.p)("This toast is using start and end buttons with the stacked toast layout. We recommend following the best practice of using either start or end buttons with the stacked toast layout.",e),(0,r.h)(r.f,Object.assign({key:"da148788489146a20b42023fdc6401e53c044767",tabindex:"-1"},this.htmlAttributes,{style:{zIndex:`${6e4+this.overlayIndex}`},class:(0,S.c)(this.color,Object.assign(Object.assign({[a]:!0},(0,S.g)(this.cssClass)),{"overlay-hidden":!0,"toast-translucent":this.translucent})),onIonToastWillDismiss:this.dispatchCancelHandler}),(0,r.h)("div",{key:"ab0a4d783aa43ba961492b3eb8beb60a38153057",class:u},(0,r.h)("div",{key:"83e49027fd1ca6553d6910ff91befeea43576f3c",class:"toast-container",part:"container"},this.renderButtons(d,"start"),void 0!==this.icon&&(0,r.h)("ion-icon",{key:"025cb4b6b170a89548969a25bcce4ab7a3817898",class:"toast-icon",part:"icon",icon:this.icon,lazy:!1,"aria-hidden":"true"}),(0,r.h)("div",{key:"b811b4e1cbc1528c2cfb57898f5615692120f840",class:"toast-content",role:"status","aria-atomic":"true","aria-live":"polite"},!n&&void 0!==o&&this.renderHeader("oldHeader","true"),!n&&void 0!==i&&this.renderToastMessage("oldMessage","true"),n&&void 0!==o&&this.renderHeader("header"),n&&void 0!==i&&this.renderToastMessage("header")),this.renderButtons(h,"end"))))}get el(){return(0,r.i)(this)}static get watchers(){return{swipeGesture:["swipeGestureChanged"],isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}}},J=t=>({"toast-button":!0,"toast-button-icon-only":void 0!==t.icon&&void 0===t.text,[`toast-button-${t.role}`]:void 0!==t.role,"ion-focusable":!0,"ion-activatable":!0}),Q=t=>(0,c.i)(t.role)?"button cancel":"button";B.style={ios:":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:normal;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host{inset-inline-start:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}.toast-wrapper{inset-inline-start:var(--start);inset-inline-end:var(--end)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-layout-stacked .toast-container{-ms-flex-wrap:wrap;flex-wrap:wrap}.toast-layout-baseline .toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-icon{-webkit-margin-start:16px;margin-inline-start:16px}.toast-content{min-width:0}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-layout-stacked .toast-button-group{-ms-flex-pack:end;justify-content:end;width:100%}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon,.toast-button-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-50, var(--ion-background-color-step-50, #f2f2f2));--border-radius:14px;--button-color:var(--ion-color-primary, #0054e9);--color:var(--ion-color-step-850, var(--ion-text-color-step-150, #262626));--max-width:700px;--max-height:478px;--start:10px;--end:10px;font-size:clamp(14px, 0.875rem, 43.4px)}.toast-wrapper{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;z-index:10}@supports ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))){:host(.toast-translucent) .toast-wrapper{background:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px)}:host(.ion-color.toast-translucent) .toast-wrapper{background:rgba(var(--ion-color-base-rgb), 0.8)}}.toast-wrapper.toast-middle{opacity:0.01}.toast-content{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:15px;padding-bottom:15px}.toast-header{margin-bottom:2px;font-weight:500}.toast-button{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:10px;padding-bottom:10px;min-height:44px;-webkit-transition:background-color, opacity 100ms linear;transition:background-color, opacity 100ms linear;border:0;background-color:transparent;font-family:var(--ion-font-family);font-size:clamp(17px, 1.0625rem, 21.998px);font-weight:500;overflow:hidden}.toast-button.ion-activated{opacity:0.4}@media (any-hover: hover){.toast-button:hover{opacity:0.6}}",md:":host{--border-width:0;--border-style:none;--border-color:initial;--box-shadow:none;--min-width:auto;--width:auto;--min-height:auto;--height:auto;--max-height:auto;--white-space:normal;top:0;display:block;position:absolute;width:100%;height:100%;outline:none;color:var(--color);font-family:var(--ion-font-family, inherit);contain:strict;z-index:1001;pointer-events:none}:host{inset-inline-start:0}:host(.overlay-hidden){display:none}:host(.ion-color){--button-color:inherit;color:var(--ion-color-contrast)}:host(.ion-color) .toast-button-cancel{color:inherit}:host(.ion-color) .toast-wrapper{background:var(--ion-color-base)}.toast-wrapper{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}.toast-wrapper{inset-inline-start:var(--start);inset-inline-end:var(--end)}.toast-wrapper.toast-top{-webkit-transform:translate3d(0,  -100%,  0);transform:translate3d(0,  -100%,  0);top:0}.toast-wrapper.toast-bottom{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0);bottom:0}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;pointer-events:auto;height:inherit;min-height:inherit;max-height:inherit;contain:content}.toast-layout-stacked .toast-container{-ms-flex-wrap:wrap;flex-wrap:wrap}.toast-layout-baseline .toast-content{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}.toast-icon{-webkit-margin-start:16px;margin-inline-start:16px}.toast-content{min-width:0}.toast-message{-ms-flex:1;flex:1;white-space:var(--white-space)}.toast-button-group{display:-ms-flexbox;display:flex}.toast-layout-stacked .toast-button-group{-ms-flex-pack:end;justify-content:end;width:100%}.toast-button{border:0;outline:none;color:var(--button-color);z-index:0}.toast-icon,.toast-button-icon{font-size:1.4em}.toast-button-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}@media (any-hover: hover){.toast-button:hover{cursor:pointer}}:host{--background:var(--ion-color-step-800, var(--ion-background-color-step-800, #333333));--border-radius:4px;--box-shadow:0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);--button-color:var(--ion-color-primary, #0054e9);--color:var(--ion-color-step-50, var(--ion-text-color-step-950, #f2f2f2));--max-width:700px;--start:8px;--end:8px;font-size:0.875rem}.toast-wrapper{-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;margin-top:auto;margin-bottom:auto;display:block;position:absolute;opacity:0.01;z-index:10}.toast-content{-webkit-padding-start:16px;padding-inline-start:16px;-webkit-padding-end:16px;padding-inline-end:16px;padding-top:14px;padding-bottom:14px}.toast-header{margin-bottom:2px;font-weight:500;line-height:1.25rem}.toast-message{line-height:1.25rem}.toast-layout-baseline .toast-button-group-start{-webkit-margin-start:8px;margin-inline-start:8px}.toast-layout-stacked .toast-button-group-start{-webkit-margin-end:8px;margin-inline-end:8px;margin-top:8px}.toast-layout-baseline .toast-button-group-end{-webkit-margin-end:8px;margin-inline-end:8px}.toast-layout-stacked .toast-button-group-end{-webkit-margin-end:8px;margin-inline-end:8px;margin-bottom:8px}.toast-button{-webkit-padding-start:15px;padding-inline-start:15px;-webkit-padding-end:15px;padding-inline-end:15px;padding-top:10px;padding-bottom:10px;position:relative;background-color:transparent;font-family:var(--ion-font-family);font-size:0.875rem;font-weight:500;letter-spacing:0.84px;text-transform:uppercase;overflow:hidden}.toast-button-cancel{color:var(--ion-color-step-100, var(--ion-text-color-step-900, #e6e6e6))}.toast-button-icon-only{border-radius:50%;-webkit-padding-start:9px;padding-inline-start:9px;-webkit-padding-end:9px;padding-inline-end:9px;padding-top:9px;padding-bottom:9px;width:36px;height:36px}@media (any-hover: hover){.toast-button:hover{background-color:rgba(var(--ion-color-primary-rgb, 0, 84, 233), 0.08)}.toast-button-cancel:hover{background-color:rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.08)}}"}}}]);