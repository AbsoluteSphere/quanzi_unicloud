(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["uni_modules-uni-feedback-pages-opendb-feedback-detail"],{"0555":function(e,t,n){"use strict";var i=n("1539"),a=n.n(i);a.a},1084:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={unicloudDb:n("960d").default,uniLoadMore:n("a637").default,uniFilePicker:n("52b6").default,uniLink:n("ff06").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"container"},[n("unicloud-db",{ref:"udb",attrs:{options:e.options,collection:"opendb-feedback",field:"content,imgs,contact,mobile",where:e.queryWhere,getone:!0,manual:!0},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.data,a=t.loading,o=t.error;t.options;return[o?n("v-uni-view",[e._v(e._s(o.message))]):a?n("v-uni-view",[n("uni-load-more",{attrs:{contentText:e.loadMore,status:"loading"}})],1):i?n("v-uni-view",[n("v-uni-view",[n("v-uni-text",[e._v("留言内容/回复内容")]),n("v-uni-text",[e._v(e._s(i.content))])],1),n("v-uni-view",[n("v-uni-text",[e._v("图片列表")]),e._l(i.imgs,(function(e,t){return["image"==e.fileType?n("uni-file-picker",{attrs:{value:e,"file-mediatype":e.fileType,"return-type":"object",readonly:!0}}):n("uni-link",{attrs:{href:e.url,text:e.url}})]}))],2),n("v-uni-view",[n("v-uni-text",[e._v("联系人")]),n("v-uni-text",[e._v(e._s(i.contact))])],1),n("v-uni-view",[n("v-uni-text",[e._v("联系电话")]),n("v-uni-text",[e._v(e._s(i.mobile))])],1)],1):e._e()]}}])}),n("v-uni-view",{staticClass:"btns"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleUpdate.apply(void 0,arguments)}}},[e._v("修改")]),n("v-uni-button",{staticClass:"btn-delete",attrs:{type:"warn"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.handleDelete.apply(void 0,arguments)}}},[e._v("删除")])],1)],1)},o=[]},1539:function(e,t,n){var i=n("8bf0");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("523a2453",i,!0,{sourceMap:!1,shadowMode:!1})},"2ee0":function(e,t,n){"use strict";n.r(t);var i=n("1084"),a=n("af23");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("e6bc");var u=n("f0c5"),r=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"28ac2b0e",null,!1,i["a"],void 0);t["default"]=r.exports},"4bb6":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,".container[data-v-28ac2b0e]{padding:10px}.btns[data-v-28ac2b0e]{margin-top:10px;\ndisplay:flex;\nflex-direction:row}.btns uni-button[data-v-28ac2b0e]{flex:1}.btn-delete[data-v-28ac2b0e]{margin-left:10px}",""]),e.exports=t},"8bf0":function(e,t,n){var i=n("24fb");t=i(!1),t.push([e.i,"\n.uni-link[data-v-03b6d5de]{cursor:pointer}\n.uni-link--withline[data-v-03b6d5de]{text-decoration:underline}",""]),e.exports=t},"94ca0":function(e,t,n){"use strict";n.r(t);var i=n("c2ec"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},a512:function(e,t,n){"use strict";n("7a82");var i=n("4ea4").default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("5530")),o=n("ccce"),u={data:function(){return{queryWhere:"",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""},options:(0,a.default)({},o.enumConverter)}},onLoad:function(e){this._id=e.id},onReady:function(){this._id&&(this.queryWhere='_id=="'+this._id+'"')},methods:{handleUpdate:function(){var e=this;uni.navigateTo({url:"./edit?id="+this._id,events:{refreshData:function(){e.$refs.udb.loadData({clear:!0})}}})},handleDelete:function(){this.$refs.udb.remove(this._id,{success:function(e){uni.navigateTo({url:"./list"})}})}}};t.default=u},a617:function(e,t,n){var i=n("4bb6");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var a=n("4f06").default;a("59b6d2ee",i,!0,{sourceMap:!1,shadowMode:!1})},af23:function(e,t,n){"use strict";n.r(t);var i=n("a512"),a=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=a.a},c2ec:function(e,t,n){"use strict";n("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("a9e3"),n("2ca0");var i={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},download:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},computed:{isShowA:function(){return this._isH5=!0,!(!this.isMail()&&!this.isTel()||!0!==this._isH5)}},created:function(){this._isH5=null},methods:{isMail:function(){return this.href.startsWith("mailto:")},isTel:function(){return this.href.startsWith("tel:")},openURL:function(){window.open(this.href)},makePhoneCall:function(e){uni.makePhoneCall({phoneNumber:e})}}};t.default=i},df73:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.isShowA?n("a",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},attrs:{href:e.href,download:e.download}},[e._t("default",[e._v(e._s(e.text))])],2):n("v-uni-text",{staticClass:"uni-link",class:{"uni-link--withline":!0===e.showUnderLine||"true"===e.showUnderLine},style:{color:e.color,fontSize:e.fontSize+"px"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.openURL.apply(void 0,arguments)}}},[e._t("default",[e._v(e._s(e.text))])],2)},a=[]},e6bc:function(e,t,n){"use strict";var i=n("a617"),a=n.n(i);a.a},ff06:function(e,t,n){"use strict";n.r(t);var i=n("df73"),a=n("94ca0");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("0555");var u=n("f0c5"),r=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"03b6d5de",null,!1,i["a"],void 0);t["default"]=r.exports}}]);