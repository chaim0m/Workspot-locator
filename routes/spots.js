var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/workspot', function(req, res, next) {

    res.send("Get a Work Spot From DB")
});

/* GET home page. */
router.get('/workspots', function(req, res, next) {

    res.send("Get Work Spots list From DB")
});

router.put('/workspots', function(req, res, next) {
    res.send("Put WorkSpot To DB");
});


module.exports = router;
