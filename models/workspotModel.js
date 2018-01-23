var mongoose = require('mongoose');

//design the two schema below and use sub docs
//to define the relationship between posts and comments


var ratingSchema = new mongoose.Schema({
    num: Number,
    text: String
});


var addressSchema = new mongoose.Schema({
    text: String,
    longitude: Number,
    latitude: Number
});


var descriptionSchema = new mongoose.Schema({
    type: String,
    hours: String,
    websiteLink: String,
    coffeeCupPrice: Number,
    hasFood: Boolean,
    mealPriceRange: String,
    isFree: Boolean,
    isQuiet: Boolean,
    isDogFriendly: Boolean,
});
var spotSchema = new mongoose.Schema({
    name: {type:String, required:true},
    rating: [ratingSchema],
    address: addressSchema,
    photo: String,
    description: descriptionSchema,
},{usePushEach: true});

var Spot = mongoose.model('spot', spotSchema);

module.exports = Spot;
