var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// let bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));

var Spot = require('../models/workspotModel');

/* GET home page. */
router.get('/workspot/:spotID', function(req, res, next) {
    Spot.findById(req.params.spotID, function(err, spot) {
        if (err) {
            return
        }
        res.send(spot);
    });
});



router.post('/',function(req, res) {
    console.log("spots post Request Recived", req.body);
    var spot = new Spot(req.body);
    spot.save(function(err, data) {
        if (err) {
            return;
        }
        res.send(spot);
    });

});


router.get('/', function(req, res, next) {
    // res.send("ab");

    Spot.find(function(err,data) {
        if (err) {
            return;
        }
        res.send(data);
    });
});


// Gets a single item from the db for testing....
router.get('/getTest', function(req, res, next) {
    // res.send("ab");

    Spot.findOne(function(err,data) {
        if (err) {
            return;
        }
        res.send(data);
    });
});

// Adds mock object into the DB
router.get('/createTest', function(req, res, next) {
    // res.send("ab");

    var spot = new Spot ({name:"some place", rating:[{num: 4, text: "This Place is great"},{num: 7, text: "This Place is ok"}]});
    spot.address = {text:"Some Street 7, Tel Aviv", longitude:32, latitude:35};
    spot.photo = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/275px-A_small_cup_of_coffee.JPG";
    spot.description = {hasFood:true,isFree:true,isDogFriendly:false, isQuiet:false, type:"Coffee Shop",websiteLink:"https://www.google.co.il/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiTwfXCg-7YAhWHERQKHRVjAXMQFggnMAA&url=http%3A%2F%2Fwww.kafe.co.il%2F&usg=AOvVaw2sxUuHygKu22U8d2Hq1s2w", hours:"09:00-20:00 weekdays", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, commodi corporis eligendi eos in magni maiores minima molestiae necessitatibus, neque nobis odio officia provident reiciendis, sed sint soluta voluptatem voluptatibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, commodi corporis eligendi eos in magni maiores minima molestiae necessitatibus, neque nobis odio officia provident reiciendis, sed sint soluta voluptatem voluptatibus?"}
    spot.save(function(err, data) {
        res.send(err);
    });
});

module.exports = router;
