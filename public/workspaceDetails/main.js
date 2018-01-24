
var workspotDetails = {};

var workspotId = workspotDetails.id;
console.log(workspotId)


$.ajax({
  
    method: "GET",
    url: "/spots/5a687ff06d36c3f8a80f9dc1",
    success: function(data) {
      console.log(data);
      workspotDetails = data
      renderSpotDetails()
    },
    error: function(data) {
      console.log('Error: ' + data);
    }
  });



  var renderSpotDetails = function () {
  var source = $('#details-template').html();
  var template = Handlebars.compile(source);
  console.log(workspotDetails);
  for (var i =0; i<workspotDetails.rating.length; i++) {
    workspotDetails.rating[i].star_off_1 = workspotDetails.rating[i].num == 1;
    workspotDetails.rating[i].star_off_2 = workspotDetails.rating[i].num <= 2;
    workspotDetails.rating[i].star_off_3 = workspotDetails.rating[i].num <= 3;
    workspotDetails.rating[i].star_off_4 = workspotDetails.rating[i].num <= 4;
    workspotDetails.rating[i].star_off_5 = workspotDetails.rating[i].num <= 5;

 }

var newHTML = template(workspotDetails);

$('.workspot_details').append(newHTML);

 }


