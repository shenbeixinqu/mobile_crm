(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mydata-mydata"],{"175c":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("v-uni-view",{staticClass:"contentk"},[e("v-uni-view",{staticClass:"contentk_top",staticStyle:{"margin-bottom":"200upx"}},[e("v-uni-view",{staticClass:"leftwz"},[t._v("姓名：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.name))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("性别：")]),e("v-uni-view",{staticClass:"rightwz"},[1===t.infolist.gender?e("span",[t._v("男")]):t._e(),0===t.infolist.gender?e("span",[t._v("女")]):t._e()]),e("v-uni-view",{staticClass:"leftwz"},[t._v("出生日期：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.birthday))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("职务：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.post_name))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("工号：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.account))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("机构：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.un_name))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("部门：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.de_name))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("上级：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.super))]),e("v-uni-view",{staticClass:"leftwz"},[t._v("入职时间：")]),e("v-uni-view",{staticClass:"rightwz"},[t._v(t._s(t.infolist.entrytime))]),e("v-uni-view",{staticClass:"rightwzimg"},[e("img",{attrs:{src:t.infolist.photo,alt:""}})])],1),e("foot-part",{on:{openLogin:function(i){arguments[0]=i=t.$handleEvent(i),t.openLogin.apply(void 0,arguments)}}})],1)},s=[]},3679:function(t,i,e){"use strict";e.r(i);var n=e("e238"),a=e.n(n);for(var s in n)"default"!==s&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=a.a},"6c04":function(t,i,e){var n=e("24fb");i=n(!1),i.push([t.i,".contentk[data-v-59ab0ff4]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.rightwzimg[data-v-59ab0ff4]{width:%?200?%;height:%?300?%;position:absolute;right:%?30?%;top:%?30?%;border:#fff solid %?10?%}.rightwzimg img[data-v-59ab0ff4]{width:100%;display:block}.contentk_top[data-v-59ab0ff4]{width:95%;line-height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?24?%;border-bottom:none;margin-bottom:%?100?%}.leftwz[data-v-59ab0ff4]{width:95%;color:#666;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;font-size:%?26?%;padding-top:%?10?%}.rightwz[data-v-59ab0ff4]{width:95%;padding-bottom:%?10?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;color:#000;font-size:%?34?%;border-bottom:1px #e5e5e5 solid}",""]),t.exports=i},"6d58":function(t,i,e){"use strict";var n=e("7935"),a=e.n(n);a.a},7935:function(t,i,e){var n=e("6c04");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=e("4f06").default;a("542c337b",n,!0,{sourceMap:!1,shadowMode:!1})},ada6:function(t,i,e){"use strict";e.r(i);var n=e("175c"),a=e("3679");for(var s in a)"default"!==s&&function(t){e.d(i,t,(function(){return a[t]}))}(s);e("6d58");var o,l=e("f0c5"),r=Object(l["a"])(a["default"],n["b"],n["c"],!1,null,"59ab0ff4",null,!1,n["a"],o);i["default"]=r.exports},e238:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{infolist:[]}},onLoad:function(){this.myInfo()},methods:{fanhui:function(){uni.navigateBack()},myInfo:function(){var t=this;uni.request({url:this.$burl+"/api/user/info",header:{Authorization:"JWT "+getApp().globalData.token},success:function(i){0==i.data.rc?t.infolist=i.data.data:uni.showModal({title:"提示",conten:i.data.msg,showCancel:!1})},fail:function(t){uni.showModal({title:"提示",content:t})}})}}};i.default=n}}]);