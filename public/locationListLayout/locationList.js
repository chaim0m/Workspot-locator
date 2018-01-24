let listSpots;
let markers = {};
let LocationList = function () {
  let $cards = $('.workspot-list');

  function renderCards(spots) {
    $cards.empty();
    var source = $('#card-template').html();
    var template = Handlebars.compile(source);
    for (let i = 0; i < spots.length; i++) {
      let obj = {
        name: spots[i].name,
        address: spots[i].address.text,
        photo: spots[i].photo[0],
        id: spots[i]._id
      }
      if (workspot.isItemInMapBounds(spots[i].address)) {

        var newHTML = template(obj);
        $cards.append(newHTML);
      }
    }
  }

  //ugly code
  var filterSpots = function (text) {
    text = text.toLowerCase();
    let tempSpots = listSpots.filter(function (spot) {
      return spot.name.toLowerCase().startsWith(text) || spot.address.text.toLowerCase().includes(text);
    });

    let toHide = listSpots.filter(function (spot) {
      return !(spot.name.toLowerCase().startsWith(text) || spot.address.text.toLowerCase().includes(text));
    });

    for(let i=0; i < toHide.length; i++) {
      markers[toHide[i]._id].setVisible(false);
    }

    for(let i=0; i < tempSpots.length; i++) {
      markers[tempSpots[i]._id].setVisible(true);
    }

    renderCards(tempSpots);
  }

  return {
    renderCards: renderCards,
    filterSpots: filterSpots
  }

}

let list = LocationList();

// call back for all the spots
workspot.getSpots(function (spots, markersArr) {
  listSpots = spots;
  markers = markersArr;
  console.log(markers);
  list.renderCards(spots);
});


// search the spots when the input-search is changed
$('#search-list').on('input', function () {
  var input = $('#search-list').val().trim();
  if (input != '') {
    list.filterSpots(input);
  } else {
    list.filterSpots('');
  }
});

$('.workspot-list').on('mouseenter', '.list-item', function(){
  var defaultIcon = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless_hdpi.png'
 
  markers[$(this).data().id].setIcon(defaultIcon);
});

$('.workspot-list').on('mouseleave', '.list-item', function(){
  var defaultIcon = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi-dotless_hdpi.png'
 
  markers[$(this).data().id].setIcon('https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red.png');
})
