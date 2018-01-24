

var autocomplete;
var changedFunction

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13
    });
//        var card = document.getElementById('pac-card');
    var input = document.getElementById('address');

    autocomplete = new google.maps.places.Autocomplete(input);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
//        autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });


    changedFunction = function () {
        infowindow.close();
        marker.setVisible(false);

        $('#form').find('input, select, textarea').not("#address").val('')
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        fillInAddress();
        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        $('#map').css("visibility","visible");
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
        initAutocomplete();
    };
    autocomplete.addListener('place_changed', changedFunction);
}
function initAutocomplete() {
    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    let autocompletePlaces = document.getElementById('address');
    google.maps.event.addDomListener(autocompletePlaces, 'keydown', function(e) {
        if (e.keyCode == 13 && $('.pac-container:visible').length) {
            e.preventDefault();
        }
    });

}

function fillInAddress() {
    let place = autocomplete.getPlace();
    console.log(place);
    console.log($('#latitude'));
    $('#name').val(place.name);
    if (place.photos ) {
        for (i=0; place.photos.length > i && i<=10;i++) {
            $(`.photo-link:eq(${i})`).val(place.photos[i].getUrl({maxWidth:300}))
        }
    }
    $('#ggl_place_id').val(place.place_id);
    $('#website-link').val(place.website);
    $('#gmaps-link').val(place.url);
    $('#formated-address').val(place.formatted_address);
    $('#phone-number').val(place.international_phone_number);
    // Wi-Fi password info
    // Power plugs availebility
    //
    // opening_hours
    // address_components?
    $('#latitude').val(place.geometry.location.lat());
    $('#longitude').val(place.geometry.location.lng());
}

function buildPostData() {
    let photosArray = $(".photo-link").map(function () { return $(this).val() }).get();
    return {
        name: $("#name").val(),
        address: {
            text: $('#formated-address').val(),
            lat: $("#latitude").val(),
            lng: $("#longitude").val()
        },
        description: {
            // type: String,
            text: $("#description").val(),
            websiteLink: $("#website-link").val(),
            gmapsLink: $("#gmaps-link").val(),
            phoneNumber: $("#phone-number").val(),

            // hours: String,
            // coffeeCupPrice: Number,
            // hasFood: Boolean,
            // mealPriceRange: String,
            // isFree: Boolean,
            // isQuiet: Boolean,
            // isDogFriendly: Boolean,            }
        },
        photo: photosArray,
        //    TODO consider should new place poster should also be able to review it
        rating: [{num: $("#rating").val(), text: $("#review").val()}],
        ggl_place_id: $("#ggl_place_id").val(),

    }
}

$("#form").submit(function (event) {
    if (changedFunction) { changedFunction(); }

    console.log("Submit Captured!");
    // TODO validateFields();
    // TODO
    // Provide a visual spinner within the <button>Submit <img src="spinner.gif"></button> and make sure to remove it once processing is complete
    //
    // Upon submission disable the button programmatically, and visually and programmatically prevent double-submission of the form
    //
    // Provide an easily identifiable message box with clear error vs success vs further action required messages
    //
    // Take into account network and server errors which can cause unexpected results to occur, make sure to catch them
    //
    // If you need to display a different page upon success then JS can certainly handle that
    var postData = buildPostData();
    $.ajax({
        method: "POST",
        url: '/spots',
        data: postData,
        success: function (data) {
            console.log("success-", data)
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        }
    });
    event.preventDefault();
});

