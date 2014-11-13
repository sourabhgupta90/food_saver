'use strict';

/**
 * Module dependencies.
 */
// get the controllers which are required for this route
var users = require('../../app/controllers/users.server.controller'),
	food = require('../../app/controllers/food.server.controller');

module.exports = function(app) {
	// Food Routes
	// we mainly need create, update and deletion of food item
	app.route('/food')
		.get(food.list)
		.post(users.requiresLogin, food.create);

	app.route('/food/:foodId')
		.get(food.read)
		.put(users.requiresLogin, food.hasAuthorization, food.update) //  food.hasAuthorization has next()
		.delete(users.requiresLogin, food.hasAuthorization, food.delete);

	// Finish by binding the food middleware
	app.param('foodId', food.foodByID); // food.foodByID has next()
};