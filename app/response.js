import showMask from './showMask';
export function response(res,ImgUrl,htmlDes) {
    new showMask({
        message: `${res}`,
        isSuccessUrl: ImgUrl,
        htmlDes:`${htmlDes ? htmlDes : ''}`
    });
}
export function responseInput() {
    new showMask({
        input: true
    });
}