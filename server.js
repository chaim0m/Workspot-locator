var express = require('express');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var spots = require('./routes/spots');

let mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING || 'mongodb://localhost/workspotsDB',{useMongoClient:true}, function() {
    console.log("DB connection established!!!");
});

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));


app.use('/', index);
app.use('/spots', spots);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.listen(process.env.PORT || '8080', function() {
    console.log("Server Started listening for connections");
});