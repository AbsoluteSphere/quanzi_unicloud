(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-quanzi_article-list"],{"4ff4":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={unicloudDb:n("960d").default,uniList:n("3e95").default,uniListItem:n("ce29").default,uniLoadMore:n("a637").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("unicloud-db",{ref:"udb",attrs:{where:"user_id==$cloudEnv_uid",orderby:"publish_date desc",collection:t.collectionList,field:"user_id,title,description,province,content,article_status,last_comment_user_id,picurls,publish_date,last_modify_date"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.data,a=(e.pagination,e.loading),u=e.hasMore,o=e.error;return[o?n("v-uni-view",[t._v(t._s(o.message))]):i?n("v-uni-view",[n("uni-list",t._l(i,(function(e,i){return n("uni-list-item",{key:i,attrs:{showArrow:!0,clickable:!0},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handleItemClick(e._id)}},scopedSlots:t._u([{key:"body",fn:function(){return[n("v-uni-text",[t._v(t._s(e.title))])]},proxy:!0}],null,!0)})})),1)],1):t._e(),n("uni-load-more",{attrs:{status:a?"loading":u?"more":"noMore"}})]}}])})],1)},u=[]},"58e9":function(t,e,n){"use strict";(function(t){n("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;t.database();var i={data:function(){return{collectionList:"quanzi_article",loadMore:{contentdown:"",contentrefresh:"",contentnomore:""}}},onPullDownRefresh:function(){this.$refs.udb.loadData({clear:!0},(function(){uni.stopPullDownRefresh()}))},onReachBottom:function(){this.$refs.udb.loadMore()},methods:{handleItemClick:function(t){uni.navigateTo({url:"/pages/detail/detail?id="+t})},fabClick:function(){var t=this;uni.navigateTo({url:"./add",events:{refreshData:function(){t.$refs.udb.loadData({clear:!0})}}})}}};e.default=i}).call(this,n("a9ff")["default"])},"796a":function(t,e,n){"use strict";n.r(e);var i=n("4ff4"),a=n("8ffc");for(var u in a)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(u);var o=n("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"445a8a66",null,!1,i["a"],void 0);e["default"]=r.exports},"8ffc":function(t,e,n){"use strict";n.r(e);var i=n("58e9"),a=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=a.a}}]);