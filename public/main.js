var WorkspotLocatorApp = function () {
  var map;
  var spots = [];
  var spotsCallBack;
  let renderList;
  var markers = {};
  var getAllSpotsFromServer = function () {
    $.get({
      url: 'spots',
      dataType: "json",
      success: function (data) {
        spots = data;
        console.log(spots[0].address);
        renderMarkers();
        spotsCallBack(spots, markers);
      },
      error: function (jqXHR, textStatus, errorThrown) {

      }
    });
  }

  var renderMarkers = function () {
    for (let i = 0; i < spots.length; i++) {

      // if(isItemInMapBounds(spots[i].address)) {
      addMarker(spots[i]);

      //}
    }
  }
  //initializing the map
  function initMap(coordinate) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: coordinate,
    });
    map.addListener('bounds_changed', function () {
      // _isItemInMapBounds(coordinate);
      // Do what you want here...
      console.log(markers[0]);
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
      console.log(marker.id);
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


  var isItemInMapBounds = function (coordinate) {
    var bounds = map.getBounds();
    if (bounds.contains(coordinate)) {
      console.log("true");
    } else {
      console.log("false");
    }
    return bounds.contains(coordinate);
  }


  return {
    initMap: initMap,
    addMarker: addMarker,
    presentLocationList: presentLocationList,
    getAllSpotsFromServer: getAllSpotsFromServer,
    getSpots: getSpots,
    isItemInMapBounds: isItemInMapBounds,
  }

}

let workspot = WorkspotLocatorApp();
let coordinate = { lat: 32.053786, lng: 34.7956447 };//default location for TLV area
workspot.initMap(coordinate);
//app.addMarker(coordinate);
workspot.presentLocationList();


//app.getAllSpots();



$('.add-workspot-btn').on('click', function () {
  console.log("fvfvv");
   $('#post-container').fadeIn(250);
  
});

$('.close-add-post').on('click', function() {
  $('#post-container').fadeOut(250);

});

$(document).keyup(function(e) {
  if (e.keyCode == 27) { 
    $('#post-container').fadeOut(250);

 }
});

// $( document ).on( "pagecreate", function() {
//     // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
//     function scale( width, height, padding, border ) {
//         var scrWidth = $( window ).width() - 30,
//             scrHeight = $( window ).height() - 30,
//             ifrPadding = 2 * padding,
//             ifrBorder = 2 * border,
//             ifrWidth = width + ifrPadding + ifrBorder,
//             ifrHeight = height + ifrPadding + ifrBorder,
//             h, w;
//         if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
//             w = ifrWidth;
//             h = ifrHeight;
//         } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
//             w = scrWidth;
//             h = ( scrWidth / ifrWidth ) * ifrHeight;
//         } else {
//             h = scrHeight;
//             w = ( scrHeight / ifrHeight ) * ifrWidth;
//         }
//         return {
//             'width': w - ( ifrPadding + ifrBorder ),
//             'height': h - ( ifrPadding + ifrBorder )
//         };
//     };
   
// });












var mapBounds = function () {


  var bounds = map.getBounds();
  var areaBounds = {
    north: bounds.getNorthEast().lat(),
    south: bounds.getSouthWest().lat(),
    east: bounds.getNorthEast().lng(),
    west: bounds.getSouthWest().lng()
  };
  // var lat0 = map.getBounds().getNorthEast().lat();
  // var lng0 = map.getBounds().getNorthEast().lng();
  // var lat1 = map.getBounds().getSouthWest().lat();
  // var lng1 = map.getBounds().getSouthWest().lng();
  // console.log(map.getBounds());
  // console.log("lat0" + lat0);
  // console.log("lng0" + lng0);
  // console.log("lat1" + lat1);
  // console.log("lng1" + lng1);
  area = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    bounds: areaBounds
  });
}


