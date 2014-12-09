define(['services/userServices'], function (userService) {
   var userName = ko.observable('');

   var login = function () {
      var name = userName();
      if (name == "") {
         $.mobile.changePage("#errMessage");
      } else {
         localStorage.setItem("userName", name);
         $.mobile.changePage("#indexpage");
      }
      //var option = { username: userName() };
      //userService.loginDriver(option).then(function (result) {
      //   if (result.errorMessage !== 'OK') {
      //      $.mobile.changePage("#errMessage");
      //   } else {
      //      $.mobile.changePage("#indexpage");
      //   }
      //});
   };

   //public methods & Properties
   return {
      userName: userName,
      login: login
   };
});
