define(['services/userServices'], function (userService) {
   var userName = ko.observable('');
   var password = ko.observable('');
   localStorage.removeItem("user");
   var login = function () {
      var tempName = userName();
      var tempPassword = password();
      if (tempName == "" || tempPassword == "")
         return;

      userService.login(tempName, tempPassword).then(
         function (result) {
            if (result && result.errorMessage) {
               $.mobile.changePage("#errMessage");
            } else {
               //{"userID":10000,"username":"test@blade.com","password":"test","createDate":"2014-02-20 00:00:00","createTime":"1970-01-01 01:01:00","userType":"1","fisrtName":"Shao","deleFlag":"N","lastName":"Blade"}
               //userService.getAuth(result.userID).then(
               //  function () {
               var data = { "userName": tempName, "password": tempPassword, "userID": result.userID };
               localStorage.setItem("user", JSON.stringify(data));
               $.mobile.changePage("#indexpage");
               //   }
               //);

            }

         }, function (error) {
            alert(JSON.stringify(error));
            $.mobile.changePage("#errMessage");
         }
      );


   };

   //public methods & Properties
   return {
      userName: userName,
      password: password,
      login: login
   };
});
