export var dom = {
    // rootUrl: "http://api.gaozhi.queqianme.com/api/app", //内网测试服
    // rootUrl: "http://api.gaozhi.queqianme.com/api/app/v3/", //内网测试服

    // rootUrl: "https://api.test.queqianme.com/api/app", //外网测试服
    // rootUrl: "https://api.test.queqianme.com/api/app/v3/", //外网测试服

    rootUrl: "https://api.queqianme.com/api/app", //正式服
    // rootUrl: "https://api.queqianme.com/api/app/v3/", //正式服

    // rootUrl : "http://api.gaozhi.queqianme.com/api/app/other/dianjia/",//好店家内网测试服
    on(element, eventType, selector, fn) {
        element.addEventListener(eventType, (e) => {
            let el = e.target
            while (el && !el.matches(selector)) {
                el = el.parentNode
                if (element === el) {
                    el = null
                }
            }
            if (el) {
                fn.call(el, e, el)
            }
        })
        return element
    },
    getToken() { //获取userToken
        let userToken = localStorage.getItem("userToken");
        if (userToken && typeof userToken != "object") {
            /* 将JSON字符串转换成对象*/
            return JSON.parse(userToken);
        } else {
            return userToken;
        }
        return false;
    },
    getApi: () => localStorage.getItem("api"), //获取Api
    getId: (id) => document.getElementById(id),
    getClass: (cName) => document.getElementsByClassName(cName),
    getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURI(r[2]);
        return null;
    },

    removeSelection: () => window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(),

    hasClass(elem, className) {
        if(elem == null){
            return false;
        }
        return new RegExp(' '+ className + ' ').test(' ' + elem.className + ' ');
    },
    addClass(elem, className) { //给dom添加class
        if(!this.hasClass(elem, className)){
            elem.className += ' ' + className;
        }     
    },

    removeClass(elem, className) { //给dom移除class
       let newClass = ' ' + ' ';
       if(elem != null){
           newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ')+ ' ';
       }
        if(this.hasClass(elem,className)){
            while (newClass.indexOf(' ' + className + ' ') >= 0){
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },

    toggleClass(obj, cls1, cls2) { //给dom替换class
        if (this.hasClass(obj, cls1)) {
            this.removeClass(obj, cls1);
            this.addClass(obj, cls2);
        }
    },

    getParam(paramName) { //获取参数
        let paramValue = "",
            isFound = !1;
        if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
            var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"),
                i = 0;
            while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue == "" && (paramValue = null), paramValue
    },
    valPhone(value, funLine1, funLine2) {
        var regPhone = /^1[3|4|5|7|8][0-9]\d{8}$/i;
        return regPhone.test(value);
    },
    qqmfrom: () => dom.getParam('qqmfrom') || null,
    // qqmClient : 'device=;system=;sim=;app=dianjia/1.0;source=dianjia',
    qqmClient: () => `device=;system=;sim=;app=activity/1.0;source=${dom.qqmfrom() ? dom.qqmfrom() : null}`,

    isWX: /micromessenger/i.test(navigator.userAgent.toLowerCase()),
    isAndroid: /android/i.test(navigator.userAgent),
    isIos: /iphone|ipad/i.test(navigator.userAgent)
};