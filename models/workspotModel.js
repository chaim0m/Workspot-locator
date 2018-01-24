var mongoose = require('mongoose');

//design the two schema below and use sub docs
//to define the relationship between posts and comments


var ratingSchema = new mongoose.Schema({
    num: Number,
    text: String,
    created_at: Date,
    updated_at:Date,
});


var addressSchema = new mongoose.Schema({
    text: String,
    longitude: Number,
    latitude: Number
});


var descriptionSchema = new mongoose.Schema({
    type: String,
    text: String,
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
    photo: String, // TODO consider if we should switch to an array
    description: descriptionSchema,
    created_at: Date,
    updated_at: Date,

},{usePushEach: true});


function addCreatedUpdatedToSchema(schema) {
    schema.pre('save', function (next) {

        // get the current date
        var currentDate = new Date();

        // change the updated_at field to current date
        this.updated_at = currentDate;

        // if created_at doesn't exist, add to that field
        if (!this.created_at) {
            this.created_at = currentDate;
        }

        next();
    });
}

addCreatedUpdatedToSchema(spotSchema);
addCreatedUpdatedToSchema(ratingSchema);

var Spot = mongoose.model('spot', spotSchema);

module.exports = Spot;
