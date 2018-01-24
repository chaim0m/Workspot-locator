console.log("window");

let WorkSpostWindow = function () {

  var workspotDetails = {};

  var workspotId = workspotDetails.id;
  console.log(workspotId)

  let openDetails = function (spot) {
    // $.ajax({

    //   method: "GET",
    //   url: "/spots/5a68567dc4742276606ace6e",
    //   success: function (data) {
    //     console.log(data);
    workspotDetails = spot
    renderSpotDetails()
    //   },
    //   error: function (data) {
    //     console.log('Error: ' + data);
    //   }
    // });

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
   
  }
  return {
    openDetails: openDetails
  }
}

var workWindow = WorkSpostWindow();
console.log("addddd");
var test = parent.WorkLocatorApp();
test.setDetailsCallBack(function(spot) {
  workWindow.openDetails(spot);
});

var newHTML = template(workspotDetails);

$('.workspot_details').append(newHTML);



