(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["detail"],{"0eaf":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"simple-header"},[a("i",{staticClass:"iconfont icon-back",on:{click:t.goBack}}),a("div",{staticClass:"simple-header-name"},[t._v(t._s(t.name))]),a("i",{staticClass:"iconfont icon-menu"})])},s=[],c={props:{name:{type:String,default:""},back:{type:String,default:""}},methods:{goBack:function(){this.back?this.$router.push({path:this.back}):this.$router.go(-1),this.$emit("callback")}}},i=c,o=(a("ed0b"),a("2877")),l=Object(o["a"])(i,n,s,!1,null,"123edaf7",null);e["a"]=l.exports},"606c":function(t,e,a){},c84b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("s-header",{attrs:{title:"详情"}})],1)},s=[],c=a("0eaf"),i={components:{sHeader:c["a"]}},o=i,l=a("2877"),r=Object(l["a"])(o,n,s,!1,null,null,null);e["default"]=r.exports},ed0b:function(t,e,a){"use strict";a("606c")}}]);