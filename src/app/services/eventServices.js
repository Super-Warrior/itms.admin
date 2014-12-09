define(['services/config', 'services/base64Services'], function (config, base64) {

   var loginUrl = config.baseUrl + "EO/EventCreateLocation",
        init = function () {
           var auth = 'Basic ' + base64.encode(config.userName + ':' + config.password);

            amplify.request.define('CreateLocation', 'ajax', {
                url: loginUrl,
                dataType: 'json',
                type: 'POST',
                beforeSend: function (data) {
                   data.setRequestHeader("Authorization", auth);
                   return true;
                }
            });
        },

        defferRequest = function (resourceId, option) {
           return $.Deferred(function(dfd) {
              amplify.request({
                 resourceId: resourceId,
                 data: option,
                 success: dfd.resolve,
                 error: dfd.reject
              });
           }).promise();
        },

        createLocation = function (option) {
           return defferRequest("CreateLocation", option);
        };
 
    init();

   return {
      "createLocation": createLocation
   };
});