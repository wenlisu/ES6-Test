"use strict";
import {
    dom
} from './sub';
async function fetchPost(postUrl, postDate) {
    try {
        let request = await fetch(postUrl, {
            method: 'post',
            headers: {
                'qqm-client': dom.qqmClient()
            },
           
            body: JSON.stringify(postDate)
        });
        let text = await request.text();
        return JSON.parse(text);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
};
async function fetchGet(getUrl) {
    try {
        let request = await fetch(getUrl, {
            method: 'GET'
        });
        let text = await request.text();
        return JSON.parse(text);
    } catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
}
export {
    fetchPost,
    fetchGet
}