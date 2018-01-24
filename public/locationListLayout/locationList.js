let listSpots;
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
        photo: spots[i].photo[0]
      }
      if (workspot.isItemInMapBounds(spots[i].address)) {

        var newHTML = template(obj);
        $cards.append(newHTML);
      }
    }
  }

  var filterSpots = function (text) {
    text = text.toLowerCase();
    let tempSpots = listSpots.filter(function (spot) {
      return spot.name.toLowerCase().startsWith(text) || spot.address.text.toLowerCase().includes(text);
    });
    renderCards(tempSpots);
  }

  return {
    renderCards: renderCards,
    filterSpots: filterSpots
  }

}

let list = LocationList();

// call back for all the spots
workspot.getSpots(function (spots) {
  listSpots = spots;
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
