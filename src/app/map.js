var buildMark = function (position, map, pin, data) {
    var mark = new google.maps.Marker({
        position: position,
        map: map,
        icon: pin
    });
    var text = "";
    data.forEach(
        function (item) {
            text += '<p>' + item.name + ': ' + item.value + '</p>';
        });
    var locationText = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<div id="bodyContent">' +
                text +
    '</div>' +
    '</div>';


    //var infoWindow = new google.maps.InfoWindow({content: '<img src="images/itmslogo.png"><br/><center>' + locationText + '</center>'});
    var infoWindow = new google.maps.InfoWindow({content: '<center>' + locationText + '</center>'});
    google.maps.event.addListener(mark, "click", function () { infoWindow.open(map, mark); });

    return mark;

}


window.drawMap = function (point, eventLocation, path) {
    if (!point || !eventLocation || !path
        || !point.location
        || !eventLocation.events
        || !path.location)
        return false;
        
    var position = new google.maps.LatLng(point.location[0].googleLatitude, point.location[0].googleLongitude);
    var theCanvas = document.getElementById("map_canvas");
    var myOptions = {
        zoom: 8,
        center: position,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(theCanvas, myOptions);

    var texts = [
                    { name: "EO/ERID/ERITN", value: point.eo + "/" + point.erID + "/" + point.erITN },
                    { name: "最新位置", value: point.location[0].latitude + ',' + point.location[0].longitude },
                    { name: "时间", value: point.location[0].timestamp },
                    { name: "速度", value: point.location[0].speed },
                    { name: "手机", value: point.location[0].username }
    ];
    buildMark(position, map, "images/endpin.png", texts);


    eventLocation.events.forEach(
        function (item) {

            var texts = [
                            { name: "事件编号", value: item.eventID },
                            { name: "时间", value: item.eventDateTime },
                            { name: "类型", value: item.eventType },
                            { name: "编码", value: item.eventCode },
                             { name: "位置", value: item.latitude + ',' + item.longitude }

            ];
            var pos = new google.maps.LatLng(item.googleLatitude, item.googleLongitude);

            buildMark(pos, map, "images/location.png", texts);
        }
        );

    var points = [];
    path.location.sort(function (a, b) {
        return a.id - b.id;
    });
    path.location.forEach(

        function (item) {
            var pos = new google.maps.LatLng(item.googleLatitude, item.googleLongitude);
            points.push(pos);
        }
        );

    drawPolyline(map, points);

    return true;
    //var locationText = '<div id="content">' +
    //                '<div id="siteNotice">' +
    //                '</div>' +
    //                '<div id="bodyContent">' +
    //                 '<p>EO/ERID/ERITN: ' + texts.EO + '/' + texts.ERID + '/' + texts.ERITN + '</p>' +
    //                '<p>最新位置: ' + texts.latitude + ',' + texts.longitude + '</p>' +
    //                '<p>时间: ' + texts.timestamp + '</p>' +
    //                '<p>速度: ' + texts.speed +
    //                '<p>手机: ' + texts.username + '</p>' +
    //                '</div>' +
    //                '</div>';


}

var polylineTimer = null;
var drawPolyline = function (map, points) {
    var lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 5,
        strokeColor: 'red'
    };
    var polyline = new google.maps.Polyline({
        path: points,
        strokeColor: 'gray',
        icons: [{
            icon: lineSymbol,
            offset: '100%'
        }]
    });
    polyline.setMap(map);
    var count = 0;
    polylineTimer = window.setInterval(function () {
        count = (count + 1) % 200;
        var icons = polyline.get('icons');
        icons[0].offset = (count / 2) + '%';
        polyline.set('icons', icons);
    }, 90);
};

var removePolyline = function () {
    if (polylineTimer)
        clearTimeout(polylineTimer);
};


var b = [{
    "eo": 81, "erID": 325, "erITN": 2, "startEventType": "NORM", "startEventCode": "EVTNA3",
    "endEventType": "NORM", "endEventCode": "EVTNA4",
    "location": [{
        "id": 898, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-07 22:13:18", "mobileTimestamp": "2014-12-07 22:12:00",
        "bearing": null, "latitude": "31.252435", "longitude": "121.460002", "googleLatitude": "31.250544162326",
        "googleLongitude": "121.46457383898", "baiduLatitude": "31.256648671935", "baiduLongitude": "121.47105676255", "errorCode": "0"
    }, {
        "id": 899, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-07 22:14:31", "mobileTimestamp": "2014-12-07 22:13:00",
        "bearing": null, "latitude": "31.252435", "longitude": "121.460002", "googleLatitude": "31.251544162326", "googleLongitude": "121.49457383898", "baiduLatitude": "31.256648671935", "baiduLongitude": "121.47105676255", "errorCode": "0"
    }, {
        "id": 900, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-07 22:18:04", "mobileTimestamp": "2014-12-07 22:17:00",
        "bearing": null, "latitude": "31.252435", "longitude": "121.460002", "googleLatitude": "31.253544162326", "googleLongitude": "121.48457383898", "baiduLatitude": "31.256648671935", "baiduLongitude": "121.47105676255", "errorCode": "0"
    }, {
        "id": 901, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-07 22:18:45", "mobileTimestamp": "2014-12-07 22:18:00",
        "bearing": null, "latitude": "31.252435", "longitude": "121.460002", "googleLatitude": "31.220544162326", "googleLongitude": "121.4857383898", "baiduLatitude": "31.256648671935", "baiduLongitude": "121.47105676255", "errorCode": "0"
    }, {
        "id": 902, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-07 22:19:45", "mobileTimestamp": "2014-12-07 22:19:00",
        "bearing": null, "latitude": "31.252435", "longitude": "121.460002", "googleLatitude": "31.260544162326",
        "googleLongitude": "121.48457383898", "baiduLatitude": "31.256648671935", "baiduLongitude": "121.47105676255", "errorCode": "0"
    }, {
        "id": 951, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-09 07:25:45", "mobileTimestamp": "2014-12-09 07:25:00",
        "bearing": null, "latitude": "31.26621", "longitude": "121.473479", "googleLatitude": "31.264290635851", "googleLongitude": "121.47801079644", "baiduLatitude": "31.270141108553", "baiduLongitude": "121.48454467893", "errorCode": "0"
    }, {
        "id": 952, "username": "135", "mobile": null, "type": null,
        "resID": null, "speed": "0.0", "timestamp": "2014-12-09 07:27:29", "mobileTimestamp": "2014-12-09 07:27:00",
        "bearing": null, "latitude": "31.266167", "longitude": "121.473495", "googleLatitude": "31.264247775608", "googleLongitude": "121.47802680122", "baiduLatitude": "31.270097980327", "baiduLongitude": "121.48456079781", "errorCode": "0"
    }], "errorMessage": "OK"
}];
