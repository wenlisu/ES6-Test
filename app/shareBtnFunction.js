import {
    dom
} from './sub';
export default function (title, desc, shareUrl = `${window.location.href}`, imgUrl = 'http://wechat.queqianme.com/logo.png') {
    let api = dom.getApi();
    if (dom.isWX) {
        window.parent.postMessage({
            scheme: 'jsbridge',
            host: 'appInviteFriends',
            title: title,
            desc: desc,
            link: shareUrl
        }, '*');
        dom.getId("tipPrompt").className = "tipView tipViewOpen";
    } else if (dom.isIos) {
        let url = `jsbridge://appInviteFriends?title=${title}&content=${desc}&imgUrl=${encodeURIComponent(imgUrl)}&url=${encodeURIComponent(shareUrl)}`;
        var iframe = document.createElement('iframe');
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.display = 'none';
        iframe.src = url;
        document.body.appendChild(iframe);
        setTimeout(() => {
            iframe.remove();
        }, 100);
    } else if (dom.isAndroid) {
        if (api && api.indexOf('/v3/') >= 0) {
            android.webShare(title, desc, imgUrl, shareUrl);
        } else if (api && api.indexOf('/fast') >= 0 && WebViewBridge) {
            WebViewBridge.send(`jsbridge://web2React_share?title=${title}&content=${desc}&imgUrl=${imgUrl}&url=${shareUrl}`);
        }
    };
};