import {
    dom
} from './sub';
const showMask = class showMaskCompent {
    constructor(options) {
        let defaultOptions = {
            message: '',
            isSuccessUrl: null,
            htmlDes:'',
            input: false,
            target: document.querySelector(".tipViewOpen"),
            successText: dom.getId("successText"),
            htmlText:dom.getId('tipHtml'),
            tipSuccess: dom.getId("tipSuccess"),
            tipTitle: dom.getId('tipTitle'),
            tipTitleImg: dom.getId("tipTitleImg"),
            tipBtn: dom.getId("tipBtn"),
            roundClose: dom.getId("roundClose") || this.tipBtn,
            roundCloseInput: dom.getId("roundCloseInput") ||this.tipBtn, 
            tipPromptCenter: dom.getId("tipPromptCenter")
        }
        this.options = Object.assign({}, defaultOptions, options)
        if (!!this.options.isSuccessUrl) {
            this.bindEvents().showTip()
        } else if (!!this.options.input) {
            this.bindEvents().showInput()
        }
    }
    bindEvents() {
        if (!!this.options.roundClose) {
            this.options.roundClose.addEventListener('click', () => {
                this.hideTip();
            })
        }
           if (!!this.options.roundCloseInput) {
            this.options.roundCloseInput.addEventListener('click', () => {
                this.hideTip();
            })
        }
        if (!!this.options.tipBtn) {
            this.options.tipBtn.addEventListener('click', () => {
                this.hideTip();
            })
        }
        if (!!this.options.tipPromptCenter) {
            this.options.tipPromptCenter.addEventListener('click', () => {
                this.hideTip();
            })
        }
        return this;
    }
    showTip() {
        document.body.style.overflow = "hidden";
        if (!(this.options.tipSuccess.className == "tipView tipViewOpen")) {
            this.options.tipSuccess.className = "tipView tipViewOpen";
        }
        if(dom.getId("tipCenter"))dom.getId("tipCenter").style.display = "-webkit-box";
        if(dom.getId("inputCenter"))dom.getId("inputCenter").style.display = "none";
        document.ontouchmove = function (e) {
            e.preventDefault();
        };
        if (!!this.options.successText) {
            this.options.successText.innerHTML = !!this.options.message ? this.options.message : "成功领取<span>5元</span>还款券";
        }
         if (!!this.options.htmlText) {
            this.options.htmlText.innerHTML = !!this.options.htmlDes ? this.options.htmlDes : " ";
        }
        this.options.tipTitleImg.src = this.options.isSuccessUrl;
    }
    showInput() {
        document.body.style.overflow = "hidden";
        if (!(this.options.tipSuccess.className == "tipView tipViewOpen")) {
            this.options.tipSuccess.className = "tipView tipViewOpen";
        }
        if(dom.getId("tipCenter"))dom.getId("tipCenter").style.display = "none";
        if(dom.getId("inputCenter"))dom.getId("inputCenter").style.display = "-webkit-box";
        document.ontouchmove = function (e) {
            e.preventDefault();
        };
    }
    /* 关闭弹窗*/
    hideTip(param = ".tipViewOpen") {
        this.options.target = document.querySelector(param);
        if (!!this.options.target) {
            dom.toggleClass(this.options.target, "tipViewOpen", "tipViewClose");
        }
        document.body.style.overflow = "visible";
        document.body.style.overflowX = "hidden";
        document.ontouchmove = null;
    }

}

export default showMask;