define(['services/taskServices', 'services/eventServices', 'services/staticData'], function (taskServices, eventServices, staticData) {

   var eoList = ko.observableArray();
   var selectedItem = {};


   taskServices.mapObservable(selectedItem);


   var refresh = function () {
      eoList.removeAll();
      taskServices.eoQuickSearch("U").then(function (result) {
         if (!result.errorMessage || result.errorMessage == "OK") {
            var arr = taskServices.organizeResult(result);
            arr.forEach(
                function (item) {
                   eoList.push(item);
                }
            );
         }
      });

   };
   refresh();
   var selectItem = function (data) {

      taskServices.mapObservable(selectedItem, data);
      $("#popupeodetail").popup("open");

   };

   var popForm = function (data) {

      taskServices.mapObservable(selectedItem, data);
      $("#popupaction").popup("open");
   };



   var submit = function (item, type) {
      var selected = type();

      if (!selected)
         return;

      var tempItem = ko.toJS(item);

      var locationInfo = localStorage.getItem("location");
      var lng = 0;
      var lat = 0;
      if (locationInfo) {
         locationInfo = JSON.parse(locationInfo);
         lng = locationInfo.lng;
         lat = locationInfo.lat;
      }

      var option = {
         createUser: 10000,
         eventType: "NORM",
         eventCode: selected,
         EO: [tempItem.eo],
         ERID: [tempItem.erID],
         ERITN: [tempItem.erITN],
         eventListener1: "",
         eventListener2: "",
         eventListener3: "",
         eventListener4: "",
         eventDateTime: "",
         memo: "",
         Lat: lat,
         Lng: lng
      };
      eventServices.createLocation(option).then(
         function (result) {
            if (!result.errorMessage || result.errorMessage == "OK") {
               $("#popupaction").popup("close");
               refresh();
            }
            else
               alert(result.errorMessage);
         }
      );

   };
   // var eventType = ko.observable(staticData.eventTypes[0].value);
   var eventType = ko.observable();

   return {
      selectedItem: selectedItem,
      selectItem: selectItem,
      popForm: popForm,
      eoList: eoList,
      eventTypes: staticData.eventTypes,
      eventType: eventType,
      submit: submit
   };
});
