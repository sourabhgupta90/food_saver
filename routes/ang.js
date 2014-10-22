var express = require('express');
var path = require('path');

var router = express.Router();

var Nerd = require('../models/nerd');

/*
router.get('/', function( req, res ){ 
            res.send("hello angular");
    //res.sendFile('pages/ang.ejs');
});
*/
        // sample api route
        router.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        });

        // frontend routes =========================================================
        // route to handle all angular requests
        router.get('*', function(req, res) {
            //res.send("routed angular");
            //path.join(__dirname,
            console.log( "dir:" + __dirname );
            //TODO: SOLVE below NOT WORKING
            var indexFile = path.join(__dirname, '../public/views/index.html');
            console.log( indexFile );
            res.sendFile( indexFile ); // load our public/index.html file
        });

module.exports = router;