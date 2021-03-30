(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/movieStar"],{"141a":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o})},a77b:function(e,t,n){"use strict";var r=n("ac56"),o=n.n(r);o.a},ac56:function(e,t,n){},d068:function(e,t,n){"use strict";n.r(t);var r=n("141a"),o=n("e475");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("a77b");var c=n("2877"),u=Object(c["a"])(o["default"],r["a"],r["b"],!1,null,null,null);t["default"]=u.exports},e475:function(e,t,n){"use strict";n.r(t);var r=n("fe79"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=o.a},fe79:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={name:"movieStar",props:{score:0,isScore:0},data:function(){return{msg:"hello,vue组件！",yellowScore:0,grayScore:5}},created:function(){var e=0;null!=this.score&&void 0!=this.score&&""!=this.score&&(e=this.score),this.yellowScore=parseInt(e/2),this.grayScore=5-this.yellowScore,console.log(this.score)}};t.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/movieStar-create-component',
    {
        'components/movieStar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d068"))
        })
    },
    [['components/movieStar-create-component']]
]);                
