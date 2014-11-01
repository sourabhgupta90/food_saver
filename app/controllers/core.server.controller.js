'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {               // render the index page
		user: req.user || null      // pass it req.user info   
	});
};