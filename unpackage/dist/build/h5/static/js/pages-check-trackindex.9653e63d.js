(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-check-trackindex"],{"184b":function(e,t,i){"use strict";i.r(t);var n=i("d595"),a=i("98e8");for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);i("f764");var o,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"e95ce482",null,!1,n["a"],o);t["default"]=c.exports},"41c1":function(e,t,i){"use strict";i.r(t);var n=i("dab2"),a=i("713a");for(var r in a)"default"!==r&&function(e){i.d(t,e,(function(){return a[e]}))}(r);i("7d00");var o,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"7691521f",null,!1,n["a"],o);t["default"]=c.exports},"4c17":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.e-modal[data-v-7691521f],\r\n.e-modal-mask[data-v-7691521f]{position:fixed;top:0;bottom:0;left:0;right:0}.e-modal-action_animation[data-v-7691521f]{-webkit-transition:all .3s ease-in-out;transition:all .3s ease-in-out}.e-modal[data-v-7691521f]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;z-index:997}.e-modal_hidden[data-v-7691521f]{visibility:hidden;-webkit-transform:scale(0);transform:scale(0)}.e-modal_show[data-v-7691521f]{visibility:visible;-webkit-transform:scale(1);transform:scale(1)}.e-modal-container[data-v-7691521f]{background-color:#fff;border-radius:6px;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.e-modal-mask[data-v-7691521f]{visibility:hidden;z-index:996}.e-modal-mask_show[data-v-7691521f]{background:rgba(0,0,0,.6);visibility:visible}',""]),e.exports=t},"713a":function(e,t,i){"use strict";i.r(t);var n=i("fa31"),a=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},"7d00":function(e,t,i){"use strict";var n=i("aaf9"),a=i.n(n);a.a},"8ce5":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("f025"),a={data:function(){return{_id:"",dataList:[],cklogs:[],visible:!1,reason:""}},onLoad:function(e){this._id=e._id,this.clueView(this._id)},methods:{clueView:function(e){var t=this;uni.request({url:this.$burl+"/api/customer/audit/"+e,header:{Authorization:"JWT "+getApp().globalData.token},success:function(e){200==e.data.data.status?(t.dataList=e.data.data.data,t.cklogs=e.data.data.data.cklogs):uni.showToast({title:e.data.msg,icon:"none"})},fail:function(e){}})},confirm:function(){var e=this;uni.showModal({title:"提示信息",content:"您确定提交吗",success:function(t){t.confirm?uni.request({url:e.$burl+"/api/customer/audit/check/"+e._id,method:"POST",data:{act:0},header:{Authorization:"JWT "+getApp().globalData.token},success:function(e){200==e.data.data.status?uni.navigateTo({url:"./track"}):uni.showToast({title:e.data.msg,icon:"none"})},fail:function(e){uni.showModal({title:"提示",content:e})}}):t.cancel}})},cancel:function(){this.visible=!0},qx:function(){this.visible=!1},bindTextAreaBlur:function(e){this.reason=e.detail.value},formSubmit:function(e){var t=[{name:"refuseReason",checkType:"null",checkRule:"",errorMsg:"拒绝原因不能为空"}],i=e.detail.value,a=n.check(i,t);a?uni.request({url:this.$burl+"/api/customer/audit/check/"+this._id,method:"POST",data:{act:1,ckremark:this.remark},header:{Authorization:"JWT "+getApp().globalData.token},success:function(e){200==e.data.data.status?uni.navigateTo({url:"./track"}):uni.showToast({title:e.data.msg,icon:"none"})},fail:function(e){uni.showModal({title:"提示",content:e})}}):uni.showModal({title:n.error,icon:"none"})}}};t.default=a},"98e8":function(e,t,i){"use strict";i.r(t);var n=i("8ce5"),a=i.n(n);for(var r in n)"default"!==r&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=a.a},aaf9:function(e,t,i){var n=i("4c17");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("2358056e",n,!0,{sourceMap:!1,shadowMode:!1})},c0e8:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".bottombtn[data-v-e95ce482]{width:100%;position:fixed;bottom:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.btn[data-v-e95ce482]{width:50%;height:%?100?%;line-height:%?100?%;font-size:%?28?%;background:#4873c1;border-radius:0;bottom:0;color:#fff}.btn1[data-v-e95ce482]{background:#d7e8fc;color:#316fd4}[data-v-e95ce482] uni-button:after{border:none}uni-page-body[data-v-e95ce482]{height:100%}.uni-input1[data-v-e95ce482]{height:%?300?%;width:80%;margin-top:%?20?%;line-height:%?30?%;padding:%?15?% 5%;line-height:%?50?%;font-size:%?28?%;background:#fff;-webkit-box-flex:1;-webkit-flex:1;flex:1;border:1px #ddd solid;border-radius:%?10?%;color:grey}.uni-input[data-v-e95ce482]{height:%?100?%;width:93%;margin-top:%?20?%;line-height:%?10?%;padding:%?15?% %?25?%;line-height:%?50?%;font-size:%?28?%;background:#fff;-webkit-box-flex:1;-webkit-flex:1;flex:1;border:1px #ddd solid;border-radius:%?10?%;color:grey}.contentk[data-v-e95ce482]{width:100%;height:95%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-top:5%}.contentk_bottom[data-v-e95ce482]{width:100%;margin-top:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;bottom:0;position:fixed}.contentk_top[data-v-e95ce482]{width:95%;line-height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?24?%;border-bottom:none;margin-bottom:%?100?%}.leftwz[data-v-e95ce482]{width:95%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;font-size:%?26?%;padding-top:%?10?%}.rightwz[data-v-e95ce482]{width:95%;padding-bottom:%?10?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;color:#000;font-size:%?34?%;border-bottom:1px #e5e5e5 solid}.uni-btn-v[data-v-e95ce482]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;padding-top:%?30?%;padding-bottom:%?30?%}.uni-form-item[data-v-e95ce482]{display:-webkit-box;display:-webkit-flex;display:flex;width:100%;height:100px;padding:%?10?% 0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.uni-padding-wrap[data-v-e95ce482]{width:90%;padding-top:%?20?%;padding-bottom:%?20?%}",""]),e.exports=t},d1e2:function(e,t,i){var n=i("c0e8");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("1d0c263e",n,!0,{sourceMap:!1,shadowMode:!1})},d595:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}));var n={eModal:i("41c1").default},a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{staticClass:"contentk"},[i("e-modal",{attrs:{visible:e.visible},on:{"update:visible":function(t){arguments[0]=t=e.$handleEvent(t),e.visible=t}}},[i("v-uni-view",{staticClass:"uni-padding-wrap"},[i("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"uni-form-item"},[i("v-uni-view",{staticClass:"title"},[e._v("拒绝原因")]),i("v-uni-textarea",{staticClass:"uni-input",attrs:{name:"refuseReason",placeholder:"请输入拒绝原因"},on:{blur:function(t){arguments[0]=t=e.$handleEvent(t),e.bindTextAreaBlur.apply(void 0,arguments)}}})],1),i("v-uni-view",{staticClass:"uni-btn-v"},[i("v-uni-button",{staticClass:"btn btn1",attrs:{"form-type":"submit"}},[e._v("提交")]),i("v-uni-button",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.qx.apply(void 0,arguments)}}},[e._v("取消")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"contentk_top"},[i("v-uni-view",{staticClass:"leftwz"},[e._v("申请人:")]),i("v-uni-view",{staticClass:"rightwz"},[e._v(e._s(e.dataList.adder))]),i("v-uni-view",{staticClass:"leftwz"},[e._v("归属体系:")]),i("v-uni-view",{staticClass:"rightwz"},[e._v(e._s(e.dataList.user_tx))]),i("v-uni-view",{staticClass:"leftwz"},[e._v("客户名称:")]),i("v-uni-view",{staticClass:"rightwz"},[e._v(e._s(e.dataList.company))]),i("v-uni-view",{staticClass:"leftwz"},[e._v("申请时间:")]),i("v-uni-view",{staticClass:"rightwz"},[e._v(e._s(e.dataList.addtime))]),i("v-uni-view",{staticClass:"leftwz"},[e._v("申请理由:")]),i("v-uni-view",{staticClass:"rightwz"},[e._v(e._s(e.dataList.remark))]),"层审中"==e.dataList.audit_status?i("v-uni-view",{staticClass:"leftwz"},[e._v("审核记录:")]):e._e(),e._l(e.cklogs,(function(t,n){return i("v-uni-view",{key:n},[i("v-uni-view",[e._v("【"+e._s(t.department)+"】"+e._s(t.realname)+"于["+e._s(t.dt)+"]，"+e._s(t.result)+"，"+e._s(t.remark))])],1)}))],2),i("v-uni-view",{staticClass:"bottombtn"},[i("v-uni-button",{staticClass:"btn",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancel.apply(void 0,arguments)}}},[e._v("拒绝")]),i("v-uni-button",{staticClass:"btn btn1",attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.confirm.apply(void 0,arguments)}}},[e._v("同意")])],1)],1)},r=[]},dab2:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-uni-view",{on:{touchmove:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)}}},[i("v-uni-view",{staticClass:"e-modal",class:[e.visible?"e-modal_show":"e-modal_hidden",e.animation?"e-modal-action_animation":""],on:{click:function(t){if(t.target!==t.currentTarget)return null;t.stopPropagation(),arguments[0]=t=e.$handleEvent(t),e.cancel.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"e-modal-container",style:{width:e.width},on:{click:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t)}}},[e._t("default")],2)],1),i("v-uni-view",{class:["e-modal-mask",e.visible&&e.mask?"e-modal-mask_show":"",e.animation?"e-modal-action_animation":""]})],1)},r=[]},f025:function(e,t,i){i("c975"),i("a9e3"),i("4d63"),i("ac1f"),i("25f0"),i("1276"),e.exports={error:"",check:function(e,t){for(var i=0;i<t.length;i++){if(!t[i].checkType)return!0;if(!t[i].name)return!0;if(!t[i].errorMsg)return!0;if(!e[t[i].name])return this.error=t[i].errorMsg,!1;switch(t[i].checkType){case"string":var n=new RegExp("^.{"+t[i].checkRule+"}$");if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"int":n=new RegExp("^(-[1-9]|[1-9])[0-9]{"+t[i].checkRule+"}$");if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"between":if(!this.isNumber(e[t[i].name]))return this.error=t[i].errorMsg,!1;var a=t[i].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[i].name]>a[1]||e[t[i].name]<a[0])return this.error=t[i].errorMsg,!1;break;case"betweenD":n=/^-?[1-9][0-9]?$/;if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;a=t[i].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[i].name]>a[1]||e[t[i].name]<a[0])return this.error=t[i].errorMsg,!1;break;case"betweenF":n=/^-?[0-9][0-9]?.+[0-9]+$/;if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;a=t[i].checkRule.split(",");if(a[0]=Number(a[0]),a[1]=Number(a[1]),e[t[i].name]>a[1]||e[t[i].name]<a[0])return this.error=t[i].errorMsg,!1;break;case"same":if(e[t[i].name]!=t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"notsame":if(e[t[i].name]==t[i].checkRule)return this.error=t[i].errorMsg,!1;break;case"email":n=/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"phoneno":n=/^((13[0-9])|(14[5|7])|(15([0-9]))|(166)|(17[0-9])|(18[0-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"zipcode":n=/^[0-9]{6}$/;if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"reg":n=new RegExp(t[i].checkRule);if(!n.test(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"in":if(-1==t[i].checkRule.indexOf(e[t[i].name]))return this.error=t[i].errorMsg,!1;break;case"null":if(e[t[i].name].length<1)return this.error=t[i].errorMsg,!1;break}}return!0},isNumber:function(e){return e=Number(e),NaN!=e}}},f764:function(e,t,i){"use strict";var n=i("d1e2"),a=i.n(n);a.a},fa31:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{visible:{type:Boolean,default:!1},mask:{type:Boolean,default:!0},width:{type:String,default:"90%"},animation:{type:Boolean,default:!0}},methods:{cancel:function(){var e=this;this.$emit("update:visible",!1),this.$nextTick((function(){e.$emit("cancel")}))}}};t.default=n}}]);