var WorkspotLocatorApp = function () {
  var map;
  function initMap(coordinate) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: coordinate,
    });
  }

  var addMarker = function (coordinate) {
    var marker = new google.maps.Marker({
      position: coordinate,
      map: map
    });
  }

  var presentLocationList = function() {
    $('#location-list').load('locationListLayout/locationList.html');
    
  }

  return {
    initMap: initMap,
    addMarker: addMarker,
    presentLocationList: presentLocationList
  }

}

let app = WorkspotLocatorApp();
let coordinate = { lat: 32.053786, lng: 34.7956447 };//default location for TLV area
app.initMap(coordinate);
app.addMarker(coordinate);
app.presentLocationList();