var express = require('express');
var router = express.Router();

// connect to database; i forgot it first time which gave me errors
// may be we should move it out in app.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nerds'); 

var Nerds = require('../models/nerd');

// middleware to use for all requests routed to users api
router.use(function(req, res, next) {
	// we can do logging here
	console.log('users api requested');
	next(); // make sure we go to the next routes and don't stop here
});

  router.route('/')
	// create a Nerd (accessed at POST http://localhost:8080/users)        
	.post(function(req, res) {		
                console.log("post");
		var nerd = new Nerds(); 		// create a new instance of the Nerd model
		nerd.name = req.body.name;  // set the nerd name (comes from the request)

		// save the nerd and check for errors
		nerd.save(function(err) {
			if (err){
                                console.log("error occured while interacting with database");
				res.send(err);
                        }

			res.json({ message: 'Nerd created!' });
		});		               
	})
	// get all the bears (accessed at GET http://localhost:8080/users)
	.get(function(req, res) {
                console.log("get");
		Nerds.find(function(err, nerds) {
			if (err)
				res.send(err);

			res.json(nerds);
		});
	});       

// -----------
// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/:user_id')

	// get the user with that user_id
	.get(function(req, res) {
		Nerds.findById(req.params.user_id, function(err, nerd) {
			if (err)
				res.send(err);
			res.json( nerd );
		});
	})

	// update the user with this user_id
	.put(function(req, res) {
            
            console.log( "hi" + req.params.user_id );
		Nerds.findById(req.params.user_id, function(err, nerd) {

			if (err)
				res.send(err);
                            
                        var nerd = new Nerds();
			nerd.name = req.body.name;
			nerd.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Nerd updated!' });
			});

		});
	})

	// delete the user with this user_id
	.delete(function(req, res) {
            console.log( req.params.user_id );
		Nerds.remove({                    
			_id: req.params.user_id
		}, function(err, nerd) {
			if (err)
				res.send(err);

			res.json({ message: 'Nerd Successfully deleted' });
		});
	});
// -----------
/*
router.get('/', function(req, res) {
  //res.json( { message: 'responded with a resource!' } );
   
  
});
*/

module.exports = router;
