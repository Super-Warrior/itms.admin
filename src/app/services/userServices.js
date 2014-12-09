define(['services/config'], function (config) {

    var loginUrl = config.baseUrl + "auth/loginDriver",
        init = function () {
            //driver login
            amplify.request.define('loginDriver', 'ajax', {
                url: loginUrl,
                dataType: 'json',
                type: 'POST'
            });
        },

        defferRequest = function (resourceId, option) {
            return $.Deferred(function (dfd) {
                amplify.request({
                    resourceId: resourceId,
                    data: option,
                    success: dfd.resolve,
                    error: dfd.reject
                });
            }).promise()
        },

        loginDriver = function (option) {
            return defferRequest('loginDriver', option);
        };

    init();

    return{
        loginDriver: loginDriver
    }
});