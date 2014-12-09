define(['services/config'], function (config) {

   var loginUrl = config.baseUrl + "auth/login",
       authUrl = config.baseUrl + "auth/getAuth",
       init = function () {
          amplify.request.define('login', 'ajax', {
             url: loginUrl,
             dataType: 'json',
             type: 'POST'
          });

          amplify.request.define('getAuth', 'ajax', {
             url: authUrl,
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
          }).promise();
       },

       login = function (username, password) {
          var option = { username: username, password: password };
          return defferRequest('login', option);
       },
      getAuth = function (userId) {
         var option = { userID: userId };
         return defferRequest('getAuth', option);
      };

   init();

   return {
      login: login,
      getAuth: getAuth
   };
});