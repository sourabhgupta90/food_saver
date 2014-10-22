var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var methodOverride = require('method-override');

var db = require('./config/db');

/*
 * below had problem because i used routes/index instead of ./routes/index 
 * and it gave me error can't find route
 * @type type
 */
var routes = require('./routes/index');
var users = require('./routes/users');
var angular = require('./routes/ang');

//var http = require("http");

var app = express();
//var io = require('socket.io');

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// override with the X-HTTP-Method-Override header in the request, simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use('/', routes);
app.use('/users', users);

/* watch video tutotrial and create angularJS interaction app, so added angular route */
app.use('/angular', angular);

/*
app.use('/angular', function(req, res, next) {
    console.log('dir:' + __dirname );
    res.sendFile( './public/views/index.html' );
});
*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
//process.env.NODE_ENV
// commenting app.set('env', 'development'); condition

//if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        /*
         * res.render('error', ... ) gave me error failed to render error view as there was no 
         * error.js in views dir
         * Created error.js in views dir and it worked
         */
        res.render('error', {
            message: err.message,
            error: err
        });
    });
//}

// production error handler
// no stacktraces leaked to user
// commenting production error handling as it shows no errors
/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/
var port = process.env.PORT || 8888;

//server = http.createServer( app );
//io.listen( server );
//server.listen( 8888 );
app.listen( port );
console.log('Hi.. Listening on:' + port );
exports = module.exports = app;
