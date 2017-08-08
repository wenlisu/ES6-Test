import './xdLocalStoragePostMessageApi.min.js';
import {
  dom
} from './sub';
import {
  response,
  responseInput
} from './response';
import {
  hideSpinner
} from './storage';
import showMask from './showMask';

const tipThank = require("./imgs/2017-07-20/fail.png");
const Html = class HtmlCompent {
  constructor() {
    const editionType = dom.getParam("editionType") || null;
    let defaultOptions = {
      element: document.querySelectorAll('body')[0],
      userToken: dom.getToken(),
      api: dom.getApi(),
      rootUrlType: dom.rootUrl + (editionType == 0 ? '/v3/' : '/fast/'),
      txtPhone: dom.getId("txtTelpphone"),
      tipBtn: dom.getId('tipBtn'),
      inputBtn: dom.getId('inputBtn'),
    }
    this.options = Object.assign({}, defaultOptions)
  }
  checkOptions() {
    if (!this.options.element) {
      throw new Error('element is required')
    }
    return this
  }
  async bindEvents() {
    await setTimeout(() => this.setInit(), 1500);
    await setTimeout(() => this.monitor(), 3500);
  }
  bindInit() {
    hideSpinner();
    this.initHtml();
  }
  setInit() {
    document.ontouchmove = function (e) {
      e.preventDefault();
    };
    if (window.addEventListener) {
      window.addEventListener("storage", this.getStorage.bind(this), false);
    } else if (window.attachEvent) {
      window.attachEvent("onstorage", this.getStorage.bind(this));
    }
    this.options.userToken = dom.getToken();
    let {
      userToken
    } = this.options;
    if (!!userToken && !!userToken.userId && !!userToken.token) {
      window.removeEventListener("storage", this.getStorage.bind(this));
      hideSpinner();
      this.initHtml();
    } else {
      userToken = dom.getToken();
      if (!!userToken && !!userToken.userId && !!userToken.token) {
        window.removeEventListener("storage", this.getStorage.bind(this));
        hideSpinner();
        this.initHtml();
      }
    }
  }
  getStorage() {
    this.options.userToken = dom.getToken();
    let {
      userToken
    } = this.options;
    if (!!userToken && !!userToken.userId && !!userToken.token) {
      hideSpinner();
      this.initHtml();
    }
  }
  monitor() {
    this.options.userToken = dom.getToken();
    if (!this.options.userToken || !this.options.userToken.token || !this.options.userToken.userId) {
      hideSpinner();
      response("请重新登录", tipThank)
      return;
    }
  }
  fillPhone(options) {
    this.options.txtPhone = options.txtPhone;
    responseInput()
    this.options.txtPhone.value = "";
    this.options.txtPhone.onfocus =
      this.options.telephonePlace.onclick = () => {
        this.options.telephonePlace.hidden = true;
      }
    this.options.txtPhone.onblur = () => {
      this.options.telephonePlace.hidden = (this.value == "" ? false : true);
    }
    options.telephonePlace.hidden = (options.txtPhone.value == "" ? false : true);
    if ("\v" == "v") {
      options.txtPhone.onpropertychange = this.inputChange.bind(this);
    } else {
      options.txtPhone.addEventListener("input", this.inputChange.bind(this), false);
    }
    this.inputChange();
  }
  inputChange() {
    if (this.options.txtPhone.value && this.options.txtPhone.value.length == 11 && dom.valPhone(this.options.txtPhone.value)) {
      this.options.inputBtn.onclick = this.BindingPhoneSuccess.bind(this);
    } else {
      this.options.inputBtn.onclick = this.BindingPhoneError.bind(this)
    }
  }

}


export default Html;