console.log("main");
var WorkspotLocatorApp = function () {
  var map;
  var spots = [];
  var spotsCallBack;
  let renderList;
  var markers = {};
  let detailsCallBack;
  //let addSpotCallBack;
  var getAllSpotsFromServer = function () {
    $.get({
      url: 'spots',
      dataType: "json",
      success: function (data) {
        spots = data;
        renderMarkers();
        spotsCallBack(spots, markers);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }

  var addSpot = function(spot) {
    spots.push(spot);
    spotsCallBack(spots, markers);
    renderMarkers();
  }

  var renderMarkers = function () {
    for (let i = 0; i < spots.length; i++) {
      addMarker(spots[i]);
    }
  }
  //initializing the map
  function initMap(coordinate) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: coordinate,
    });
    map.addListener('bounds_changed', function () {
      // Do what you want here...
      spotsCallBack(spots, markers);
    });
    google.maps.event.addListenerOnce(map, 'idle', function () {
      // do something only the first time the map is loaded
      getAllSpotsFromServer();
    });
  }

  //adding new marker
  var addMarker = function (spot) {
    var marker = new google.maps.Marker({
      position: spot.address,
      map: map,
      icon: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png',
      id: spot._id
    });
    marker.addListener('click', function () {
        if (detailsCallBack) {
            detailsCallBack(spot);
            $('#spot-details-container').fadeIn(250);
        }
    });
    var infowindowContent = document.getElementById('infowindow-container');
    var infowindow = new google.maps.InfoWindow({
      content: infowindowContent,
      maxWidth: 250,
      maxHeight: 300
    });

    marker.addListener('mouseover', function () {
      let place = spots.find(function(spot) {
        return spot._id == marker.id;
      });
      infowindowContent.children['infowindow-image'].src = place.photo[0];
      infowindowContent.children['infowindow-name'].textContent = place.name;
      infowindowContent.children['infowindow-address'].textContent = place.address.text;
      infowindow.open(map, this);
    });

    marker.addListener('mouseout', function () {
      infowindow.close();
    });
    markers[spot._id] = marker;
  }

  // loading the workspots list
  var presentLocationList = function () {
    $('#location-list').load('locationListLayout/locationList.html');
  }

  var getSpots = function (callback) {
    spotsCallBack = callback;
  }

  var setDetailsCallBack = function(callback) {
    detailsCallBack = callback;
  }

  var isItemInMapBounds = function (coordinate) {
    var bounds = map.getBounds();
    return bounds.contains(coordinate);
  }

  return {
    initMap: initMap,
    addMarker: addMarker,
    addSpot: addSpot,
    presentLocationList: presentLocationList,
    getAllSpotsFromServer: getAllSpotsFromServer,
    getSpots: getSpots,
    isItemInMapBounds: isItemInMapBounds,
    setDetailsCallBack: setDetailsCallBack
  }

}

var workspot = WorkspotLocatorApp();
iFrameDetails.onload = function () {
    console.log("iFrameDetails loaded");
    workspot.setDetailsCallBack(iFrameDetails.contentWindow.workWindow.openDetails);
}
let coordinate = { lat: 32.053786, lng: 34.7956447 };//default location for TLV area
workspot.initMap(coordinate);
//app.addMarker(coordinate);
workspot.presentLocationList();
//app.getAllSpots();

$('.add-workspot-btn').on('click', function () {
  $('#post-container').fadeIn(250);
});

$('.close-add-post').on('click', function() {
  $('#post-container').fadeOut(250);
});

$('.close-details-spot').on('click', function() {
    $('#spot-details-container').fadeOut(250);
});
$(document).keyup(function(e) {
  // when clicked esk button
  if (e.keyCode == 27) { 
    $('#post-container').fadeOut(250);
    $('#spot-details-container').fadeOut(250);

    //addPostIframe.contentWindow.workWindow.resetForms();
  }
});


