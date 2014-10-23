var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
var User = require('./app/models/user');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})

router.route('/users')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		console.log('create users')		
		var user = new User();

                console.log('1');
		user.name = req.body.name;  // set the bears name (comes from the request)
                console.log(user);
                console.log(user.save)
		user.save(function(err) {
			console.log(err);
                       
                        if (err)
				res.send(err);

			res.json({ message: 'user created!' });
		});

		
	})

	.get(function(req, res) {
                console.log('fsdfsd');
                console.log(User);
                res.json('all is working');
                 
		//User.find(function(err, users) {
		//	if (err)
		//		res.send(err);

		//	res.json(users);
		//});
	});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

