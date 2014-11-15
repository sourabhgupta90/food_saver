'use strict';

/**
 * Module dependencies.
 */
// get the controllers which are required for this route
var users = require('../../app/controllers/users.server.controller'),
	donation = require('../../app/controllers/donation.server.controller');

module.exports = function(app) {
	// Donation Routes
	// we mainly need create, update and deletion of donation item
	app.route('/donation')
		.get(donation.list)
		.post(users.requiresLogin, donation.create);

	app.route('/donation/:donationId')
		.get(donation.read)
		.put(users.requiresLogin, donation.hasAuthorization, donation.update) //  donation.hasAuthorization has next()
		.delete(users.requiresLogin, donation.hasAuthorization, donation.delete);

	// Finish by binding the donation middleware
	app.param('donationId', donation.donationByID); // donation.donationByID has next()
};