(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["product-list"],{1580:function(t,e,r){"use strict";r("f705")},"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),i=r("2d00"),o=a("species");t.exports=function(t){return i>=51||!n((function(){var e=[],r=e.constructor={};return r[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"360d":function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"c",(function(){return i})),r.d(e,"b",(function(){return o}));var n=r("a27e");function a(){return n["a"].get("/categories")}function i(t){return n["a"].get("/search",{params:t})}function o(t){return n["a"].get("/goods/detail/".concat(t))}},8418:function(t,e,r){"use strict";var n=r("a04b"),a=r("9bf2"),i=r("5c6c");t.exports=function(t,e,r){var o=n(e);o in t?a.f(t,o,i(0,r)):t[o]=r}},"96fc":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"product-list-wrap"},[r("div",{staticClass:"product-list-content"},[r("header",{staticClass:"category-header"},[r("i",{staticClass:"iconfont icon-back",on:{click:t.goBack}}),r("div",{staticClass:"header-search"},[r("i",{staticClass:"iconfont icon-search"}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.keyword,expression:"keyword"}],staticClass:"search-title",attrs:{type:"text"},domProps:{value:t.keyword},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.getSearch.apply(null,arguments)},input:function(e){e.target.composing||(t.keyword=e.target.value)}}})]),r("span",{staticClass:"search-btn",on:{click:t.getSearch}},[t._v("搜索")])]),r("van-tabs",{attrs:{type:"card",color:"#1baeae"},on:{click:t.changeTab}},[r("van-tab",{attrs:{title:"推荐",name:""}}),r("van-tab",{attrs:{title:"新品",name:"new"}}),r("van-tab",{attrs:{title:"价格",name:"price"}})],1)],1),r("van-pull-refresh",{staticClass:"product-list-refresh",on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[r("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了",offset:300},on:{load:t.onLoad},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.productList,(function(e,n){return r("div",{key:n,staticClass:"product-item",on:{click:function(r){return t.productDetail(e)}}},[r("img",{attrs:{src:t.getRealImg(e.goodsCoverImg)}}),r("div",{staticClass:"product-info"},[r("p",{staticClass:"name"},[t._v(t._s(e.goodsName))]),r("p",{staticClass:"subtitle"},[t._v(t._s(e.goodsIntro))]),r("span",{staticClass:"price"},[t._v("￥ "+t._s(e.sellingPrice))])])])})),0)],1)],1)},a=[],i=r("1da1"),o=(r("96cf"),r("99af"),r("360d")),s={data:function(){return{keyword:"",searchBtn:!1,seclectActive:!1,refreshing:!1,loading:!1,finished:!1,productList:[],totalPage:0,page:1,orderBy:""}},mounted:function(){this.$store.state.keyword&&(this.keyword=this.$store.state.keyword,this.getSearch())},methods:{init:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,n,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=t.$route.query.categoryId,r||t.keyword){e.next=5;break}return t.finished=!0,t.loading=!1,e.abrupt("return");case 5:return e.next=7,Object(o["c"])({pageNumber:t.page,goodsCategoryId:r,keyword:t.keyword,orderBy:t.orderBy});case 7:n=e.sent,a=n.data,i=n.data.list,t.productList=t.productList.concat(i),t.totalPage=a.totalPage,t.loading=!1,t.page>=a.totalPage&&(t.finished=!0);case 14:case"end":return e.stop()}}),e)})))()},goBack:function(){this.$store.commit("changeKeyword",{keyword:""}),this.$router.go(-1)},productDetail:function(t){this.$router.push({path:"product/".concat(t.goodsId)})},getSearch:function(){if(this.keyword){var t=this.keyword;this.$store.commit("changeKeyword",{keyword:t})}else this.$toast.fail("请输入关键词");this.onRefresh()},onLoad:function(){!this.refreshing&&this.page<this.totalPage&&(this.page=this.page+1),this.refreshing&&(this.productList=[],this.refreshing=!1),this.init()},onRefresh:function(){this.refreshing=!0,this.finished=!1,this.loading=!0,this.page=1,this.onLoad()},changeTab:function(t){this.orderBy=t,this.onRefresh()}}},c=s,d=(r("1580"),r("2877")),u=Object(d["a"])(c,n,a,!1,null,"a7f3c002",null);e["default"]=u.exports},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("da84"),i=r("d039"),o=r("e8b5"),s=r("861d"),c=r("7b0b"),d=r("07fa"),u=r("8418"),f=r("65f0"),l=r("1dde"),h=r("b622"),g=r("2d00"),p=h("isConcatSpreadable"),v=9007199254740991,y="Maximum allowed index exceeded",k=a.TypeError,w=g>=51||!i((function(){var t=[];return t[p]=!1,t.concat()[0]!==t})),m=l("concat"),b=function(t){if(!s(t))return!1;var e=t[p];return void 0!==e?!!e:o(t)},C=!w||!m;n({target:"Array",proto:!0,forced:C},{concat:function(t){var e,r,n,a,i,o=c(this),s=f(o,0),l=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?o:arguments[e],b(i)){if(a=d(i),l+a>v)throw k(y);for(r=0;r<a;r++,l++)r in i&&u(s,l,i[r])}else{if(l>=v)throw k(y);u(s,l++,i)}return s.length=l,s}})},f705:function(t,e,r){}}]);