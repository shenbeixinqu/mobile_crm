(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-check-trackdetail"],{"497a":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{_id:"",dataList:[],cklogs:[]}},onLoad:function(t){this._id=t._id,this.clueView(this._id)},methods:{closeDetail:function(){uni.navigateTo({url:"./track"})},clueView:function(t){var e=this;uni.request({url:this.$burl+"/api/customer/audit/"+t,header:{Authorization:"JWT "+getApp().globalData.token},success:function(t){200==t.data.data.status?(e.dataList=t.data.data.data,e.cklogs=t.data.data.data.cklogs):uni.showToast({title:t.data.msg,icon:"none"})},fail:function(t){}})}}};e.default=a},5590:function(t,e,i){"use strict";i.r(e);var a=i("497a"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},5957:function(t,e,i){"use strict";var a=i("c4a0"),n=i.n(a);n.a},"8ccc":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"contentk"},[i("v-uni-view",{staticClass:"contentk_top"},[i("v-uni-view",{staticClass:"leftwz"},[t._v("申请人：")]),i("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.dataList.adder))]),i("v-uni-view",{staticClass:"leftwz"},[t._v("归属体系：")]),i("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.dataList.user_tx))]),i("v-uni-view",{staticClass:"leftwz"},[t._v("客户名称：")]),i("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.dataList.company))]),i("v-uni-view",{staticClass:"leftwz"},[t._v("申请时间：")]),i("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.dataList.addtime))]),i("v-uni-view",{staticClass:"leftwz"},[t._v("申请理由：")]),i("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.dataList.remark))]),i("v-uni-view",{staticClass:"leftwz"},[t._v("审核记录：")]),t._l(t.cklogs,(function(e,a){return i("v-uni-view",{key:a,staticClass:"rightwz1"},[i("v-uni-view",[t._v("【"+t._s(e.department)+"】"+t._s(e.realname)+"于["+t._s(e.dt)+"]，"+t._s(e.result)+"，"+t._s(e.remark))])],1)}))],2),i("v-uni-view",{staticClass:"contentk_bottom"},[i("v-uni-button",{staticClass:"btn2",attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.closeDetail.apply(void 0,arguments)}}},[t._v("关闭")])],1)],1)},s=[]},c31d:function(t,e,i){"use strict";i.r(e);var a=i("8ccc"),n=i("5590");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("5957");var o,l=i("f0c5"),c=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,"df3be6ea",null,!1,a["a"],o);e["default"]=c.exports},c4a0:function(t,e,i){var a=i("c736");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("2e53a356",a,!0,{sourceMap:!1,shadowMode:!1})},c736:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-df3be6ea]{height:100%}.contentk[data-v-df3be6ea]{width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.contentk_top[data-v-df3be6ea]{width:95%;line-height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?24?%;border-bottom:none;margin-bottom:%?100?%}.leftwz[data-v-df3be6ea]{width:95%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;font-size:%?26?%;padding-top:%?10?%}.rightwz[data-v-df3be6ea]{width:95%;padding-bottom:%?10?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;color:#000;font-size:%?34?%;border-bottom:1px #e5e5e5 solid}.rightwz1[data-v-df3be6ea]{width:95%;padding-bottom:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;color:#000;font-size:%?34?%;border-bottom:1px #e5e5e5 solid}.btn1[data-v-df3be6ea]:after{border-radius:0}.contentk_bottom[data-v-df3be6ea]{width:100%;left:0;position:fixed;bottom:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.btn2[data-v-df3be6ea]{width:100%;height:%?100?%;line-height:%?100?%;font-size:%?28?%;background:#4873c1;border-radius:0;bottom:0;color:#fff}",""]),t.exports=e}}]);