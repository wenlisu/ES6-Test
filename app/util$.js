import $ from 'jquery';
export var $http = {
    get: function(getUrl, getDate) {
        var getPromise = new Promise(function(resolve, reject) {
            $.ajax({
                url: getUrl,
                type: 'get',
                data: getDate,
                dataType: 'json',
                success: function(data) {
                    resolve(data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
        return getPromise;
    },
    post: function(postUrl, postDate) {
        var postPromise = new Promise(function(resolve, reject) {
            $.ajax({
                url: postUrl,
                type: 'post',
                data: postDate,
                dataType: 'json',
                success: function(data) {
                    resolve(data);
                },
                error: function(error) {
                    reject(error);
                }
            });
        });
        return postPromise;
    }
};
