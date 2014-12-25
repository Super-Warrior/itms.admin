define(['services/taskServices', 'services/eventServices', 'services/staticData'], function (taskServices, eventServices, staticData) {

   var eoList = ko.observableArray();
   var selectedItem = {};
   var currentProject = null;

   taskServices.mapObservable(selectedItem);

   var refresh = function () {
      eoList.removeAll();
      taskServices.eoQuickSearch("U", currentProject.value).then(function (result) {
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
   var selectProject = function (data) {
      currentProject = data;
      refresh();
      $.mobile.changePage("#eodetail");


   };



   var mapInfo = {
      center: ko.observable(),
      markers: ko.observableArray(),
      zoom: ko.observable(8),
      polylinePoints: ko.observableArray()
   };


   var viewMap = function (data) {
      var option = { "EO": [data.eo], "ER": [data.erID], "ERITN": [data.erITN] };
      //var option = { "EO": [81], "ER": [325], "ERITN": [2] };
      localStorage.setItem("currentItem", JSON.stringify(option));

      //  taskServices.getLocation(option).then(function (result) {
      //  alert(result[0].location[0].googleLatitude + "   " + result[0].location[0].googleLongitude);
      //var position = new google.maps.LatLng(result[0].location[0].googleLatitude, result[0].location[0].googleLongitude);
      //handleMap.locate(result[0]);
      //    mapFrame.window.drawMap(result[0]);
      //mapInfo.center(position);
      //    $.mobile.changePage("#popupmap", {
      //       transition: "flip", role: "dialog", closeBtn: "left",
      //        closeBtnText: "Fermer", overlayTheme: "e"
      //    });

      //});

      $.when(
                 taskServices.getLocation(option),
                 taskServices.getEventLocation(option),
                   taskServices.getRoutePath(option)
              ).done(
              function (location, events, path) {
                 var success = false;
                 if (location && location.length && location[0].length && location[0][0]
                    && events && events.length && events[0].length && events[0][0]
                    && path && path.length && path[0].length && path[0][0]) {
                    success = mapFrame.window.drawMap(location[0][0], events[0][0], path[0][0]);

                 }
                 if (success)
                    $("#popupmap").popup("open");
                 else
                    alert("该运单目前没有运输信息。");
              }

           );
   };
   return {
      selectedItem: selectedItem,
      selectItem: selectItem,
      popForm: popForm,
      eoList: eoList,
      eventTypes: staticData.eventTypes,
      eventType: eventType,
      submit: submit,
      projects: staticData.projects,
      selectProject: selectProject,
      mapInfo: mapInfo,
      viewMap: viewMap
   };
});
