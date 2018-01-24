

var autocomplete;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    let autocompletePlaces = document.getElementById('address');
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(autocompletePlaces));

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);

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
    if (place.photos && place.photos[0]) {
        $('#photo-link').val(place.photos[0].getUrl({maxWidth:300}))
    }
    // Wi-Fi password info
    // Power plugs availebility
    // website
    // url - g maps link
    // place_id
    // photos [*.getUrl({maxWidth:300})]
    // opening_hours
    // international_phone_number
    // address_components?
    $('#latitude').val(place.geometry.location.lat());
    $('#longitude').val(place.geometry.location.lng());
}

function buildPostData() {
    return {
        name: $("#name").val(),
        address: {
            text: $("#address").val(),
            latitude: $("#latitude").val(),
            longitude: $("#longitude").val()
        },
        description: {
            // type: String,
            text: $("#description").val(),

            // hours: String,
            // websiteLink: String,
            // coffeeCupPrice: Number,
            // hasFood: Boolean,
            // mealPriceRange: String,
            // isFree: Boolean,
            // isQuiet: Boolean,
            // isDogFriendly: Boolean,            }
        },
        photo: $("#photo-link").val(),
        //    TODO consider should new place poster should also be able to review it
        rating: [{num: $("#rating").val(), text: $("#review").val()}],

    }
}

$("#form").submit(function (event) {
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

