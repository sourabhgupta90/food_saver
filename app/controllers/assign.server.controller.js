'use strict';

/**
 * Module dependencies.
 */
/*
 * 
 * we can use controller in our controller like errorHandler
 * we will use model for data
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Assign = mongoose.model('Assign'),
	//Donation = mongoose.model('Donation'),
	_ = require('lodash');

exports.create_donation = function ( dSeqNo, fSeqNo ){
	var assign = new Assign();
	// was using Date.now here whcih caused error, upon debugging found this error
	assign.created = Date.now();
	assign.donor_seq_no = dSeqNo;
	assign.food_seq_no = fSeqNo;
	assign.acceptance_method = '';
	assign.needy = [];

	assign.save(function(err) {
		if (err) {			
			console.log('error in assignment');
			console.log( err );
			//send some message here
			/*
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
			*/
		} else {			
			console.log('assignment done');
		// don't return anything, maybe send notification that donation created
		//	res.json(article);
		}
	}); 

};

/*
@todo: add needy to array when needy shows inteerest, remove needy etc.. other fns
*/

exports.add_needy = function ( ){

};

/**
 * Create a assignment
 *

exports.create = function(req, res) {
	var assign = new Assign(req.body);
	assign.donor_seq_no = req.user;

	assign.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			// don't return anything
		//	res.json(article);
		}
	}); 
};

 **
 * Show the current article
 *
exports.read = function(req, res) {
	// because of articleByID middleware req.article contains intended areticle
	res.json(req.article); 
};

**
 * Update a article
 *
exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

**
 * Delete an article
 *
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

**
 * List of Articles
 *
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

**
 * Article middleware
 *
exports.articleByID = function(req, res, next, id) {
	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err); // we are calling next with error code
		if (!article) return next(new Error('Failed to load article ' + id));
		req.article = article; // assign req.article to article found by id
		next(); // notice the next, as we know it won't be last function, user needs to do something after getting articleId
	});
};

**
 * Article authorization middleware
 *
exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next(); // call the next function
};
*/