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
	Food = mongoose.model('Food'),
	_ = require('lodash');

/**
 * Create a food entry
 */
exports.create = function(req, res) {
	var food = new Food(req.body);
	food.user = req.user;

	food.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(food);
		}
	}); 
};

/**
 * Show the current food
 */
exports.read = function(req, res) {
	res.json(req.food);
};

/**
 * Update a food
 */
exports.update = function(req, res) {
	var food = req.food;

	food = _.extend(food, req.body);

	food.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(food);
		}
	});
};

/**
 * Delete a food
 */
exports.delete = function(req, res) {
	var food = req.food;

	food.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(food);
		}
	});
};

/**
 * List of Food
 */
exports.list = function(req, res) {
	Food.find().sort('-created').populate('user', 'displayName').exec(function(err, food) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(food);
		}
	});
};

/**
 * Food middleware
 */
exports.foodByID = function(req, res, next, id) {
	Food.findById(id).populate('user', 'displayName').exec(function(err, food) {
		if (err) return next(err); // we are calling next with error code
		if (!food) return next(new Error('Failed to load food ' + id));
		req.food = food;
		next(); // notice the next, as we know it won't be last function, user needs to do something after getting foodId
	});
};

/**
 * Food authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.food.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next(); // call the next function
};