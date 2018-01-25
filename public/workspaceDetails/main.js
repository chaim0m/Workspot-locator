console.log("window");

let WorkSpostWindow = function () {
  var workspotDetails = {};

  var workspotId = workspotDetails.id;
  console.log(workspotId)

  let openDetails = function (spot) {
    workspotDetails = spot
    renderSpotDetails()
  }

  var renderSpotDetails = function () {

    var source = $('#details-template').html();
    var template = Handlebars.compile(source);
    console.log(workspotDetails);
    for (var i = 0; i < workspotDetails.rating.length; i++) {
      workspotDetails.rating[i].star_off_1 = workspotDetails.rating[i].num == 1;
      workspotDetails.rating[i].star_off_2 = workspotDetails.rating[i].num <= 2;
      workspotDetails.rating[i].star_off_3 = workspotDetails.rating[i].num <= 3;
      workspotDetails.rating[i].star_off_4 = workspotDetails.rating[i].num <= 4;
      workspotDetails.rating[i].star_off_5 = workspotDetails.rating[i].num <= 5;

    }

      var newHTML = template(workspotDetails);

      $('.workspot_details').html(newHTML);

  }
  return {
    openDetails: openDetails
  }
}

var workWindow = WorkSpostWindow();



