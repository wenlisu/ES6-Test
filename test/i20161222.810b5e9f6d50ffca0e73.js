webpackJsonp([1],[function(e,t,n){"use strict";var o=n(6),i=n(7);window.onload=function(){function e(e,n){t(tipSuccess,successText,e,n)}function t(e,t,n,i){document.body.style.overflow="hidden",e.className="tipView tipView--open",document.ontouchmove=function(e){e.preventDefault()},t&&(t.innerHTML=n?n:" 获得<span>5元</span>借款券"),i?o.dom.getId("tipTitle").innerHTML="恭喜您":o.dom.getId("tipTitle").innerHTML="很遗憾"}function n(){var e=document.querySelector(".tipView--open");e&&(e.className="tipView tipView--close"),document.body.style.overflow="visible",document.body.style.overflowX="hidden",document.ontouchmove=null}var r=o.dom.getId("txt_Telephone"),a=o.dom.getId("txt_Validate"),s=o.dom.getId("txt_Password"),c=(o.dom.getId("btn_getValidate"),o.dom.getId("btn_getValidateTime")),l=null,u=60,d=!1,m=o.dom.getApi();r.value=null,s.value=null,a.value=null,o.dom.getId("btn_getValidate").onclick=function(){if(!d){if(r&&""==r.value)return void e("请输入手机号",!1);var t=this;(0,i.fetchPost)((m?m:o.dom.rootUrl).replace("/fast/","/v3/")+"user/getRegisterCaptcha",{phone:r.value}).then(function(n){0==n.status?(d=!0,clearInterval(l),t.style.display="none",c.style.display="flex",l=setInterval(function(){u--,0==u?(d=!1,t.style.display="flex",c.style.display="none",u=60,c.innerHTML="重新获取"+u+"(s)",clearInterval(l)):c.innerHTML="重新获取"+u+"(s)"},1e3)):null!=n.des&&e(n.des,!1)},function(t){e("网络不太对劲啊，点击下面刷新按钮试试吧。",!1)})}},o.dom.getId("btn_Immediately").onclick=function(){return r&&""==r.value?void e("请输入手机号",!1):s&&""==s.value?void e("请输入密码",!1):a&&""==a.value?void e("请输入验证码",!1):void(0,i.fetchPost)((m?m:o.dom.rootUrl).replace("/fast/","/v3/")+"user/register",{phone:r.value,password:s.value,captcha:a.value}).then(function(t){0==t.status?(e("恭喜您，注册成功。",!0),o.dom.getId("tipBtn").onclick=function(){window.location.href="http://wechat.queqianme.com/"}):null!=t.des&&e(t.des,!1)},function(t){e("网络不太对劲啊，点击下面刷新按钮试试吧。",!1)})},o.dom.getId("tipBtn").onclick=n,o.dom.getId("wechatLogin").onclick=function(){window.location.href="http://wechat.queqianme.com/"}}},,,,,,function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=t.dom={rootUrl:"https://api.test.queqianme.com/api/app/v3/",getToken:function(){var e=localStorage.getItem("userToken");return e&&"object"!=("undefined"==typeof e?"undefined":n(e))?JSON.parse(e):e},getApi:function(){return localStorage.getItem("api")},getId:function(e){return document.getElementById(e)},getClass:function(e){return document.getElementsByClassName(e)},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!==n?decodeURI(n[2]):null},removeSelection:function(){return window.getSelection?window.getSelection().removeAllRanges():document.selection.empty()},hasClass:function(e,t){return e.className.match(new RegExp("(\\s|^)"+t+"(\\s|$)"))},addClass:function(e,t){o.hasClass(e,t)||(e.className+=" "+t)},removeClass:function(e,t){if(o.hasClass(e,t)){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ")}},toggleClass:function(e,t,n){o.hasClass(e,t)&&(o.removeClass(e,t),o.addClass(e,n))},getParam:function(e){var t="",n=!1;if(0==window.location.search.indexOf("?")&&window.location.search.indexOf("=")>1)for(var o=unescape(window.location.search).substring(1,window.location.search.length).split("&"),i=0;i<o.length&&!n;)o[i].indexOf("=")>0&&o[i].split("=")[0].toLowerCase()==e.toLowerCase()&&(t=o[i].split("=")[1],n=!0),i++;return""==t&&(t=null),t},valPhone:function(e,t,n){var o=/^1[3|4|5|7|8][0-9]\d{8}$/i;return o.test(e)},qqmfrom:function(){return o.getParam("qqmfrom")||null},qqmClient:function(){return"device=;system=;sim=;app=activity/1.0;source="+(o.qqmfrom()?o.qqmfrom():null)},isWX:/micromessenger/i.test(navigator.userAgent.toLowerCase()),isAndroid:/android/i.test(navigator.userAgent),isIos:/iphone|ipad/i.test(navigator.userAgent)}},function(e,t,n){"use strict";function o(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function o(i,r){try{var a=t[i](r),s=a.value}catch(e){return void n(e)}return a.done?void e(s):Promise.resolve(s).then(function(e){o("next",e)},function(e){o("throw",e)})}return o("next")})}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchPost=void 0;var i=(t.fetchPost=function(){var e=o(regeneratorRuntime.mark(function e(t,n){var o,r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(t,{method:"post",headers:{"qqm-client":i.dom.qqmClient()},body:JSON.stringify(n)});case 3:return o=e.sent,e.next=6,o.text();case 6:return r=e.sent,e.abrupt("return",JSON.parse(r));case 10:e.prev=10,e.t0=e.catch(0),console.log("ERROR: "+e.t0.stack);case 13:case"end":return e.stop()}},e,this,[[0,10]])}));return function(t,n){return e.apply(this,arguments)}}(),n(6))}]);