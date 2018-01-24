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

  return {
    renderCards: renderCards
  }

}

let list = LocationList();

workspot.getSpots(function (spots) {
  list.renderCards(spots);
});



//list.renderCards();
